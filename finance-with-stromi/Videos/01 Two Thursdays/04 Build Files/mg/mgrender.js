// node mgrender.js <act> stills <base.mp4> t1 t2 ...  -> /home/user/work/stills/mg{act}_{t}.png (overlay on the act's frame)
// node mgrender.js <act> video <base.mp4> <out.mp4>   -> base video with motion graphics composited
const { chromium } = require('playwright'); const { spawn, execFileSync } = require('child_process'); const fs = require('fs');
(async () => {
  const [act, mode, base] = process.argv.slice(2, 5); const fps = 24;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + __dirname + '/mg.html'); await p.evaluate(() => window.ready); const nb = await p.evaluate(a => setAct(a), act);
  const grab = async t => { const any = await p.evaluate(t => mgAt(t), t); return any ? Buffer.from((await p.evaluate(() => document.getElementById('mg').toDataURL('image/png'))).split(',')[1], 'base64') : null; };
  if (mode === 'stills') {
    for (const s of process.argv.slice(5)) { const t = +s; const png = await grab(t); const o = `/home/user/work/stills/mg${act}_${s}.png`;
      if (png) fs.writeFileSync('/tmp/mg_ov.png', png); else fs.copyFileSync(__dirname + '/blank.png', '/tmp/mg_ov.png');
      execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', '' + t, '-i', base, '-i', '/tmp/mg_ov.png', '-filter_complex', 'overlay', '-frames:v', '1', o]); }
    console.log('beats', nb, errs.join('\n') || 'ok'); await b.close(); return;
  }
  const out = process.argv[5]; const dur = +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', base]).toString(); const n = Math.round(dur * fps);
  const blank = await (async () => { await p.evaluate(() => { const c = document.getElementById('mg'); c.getContext('2d').clearRect(0, 0, 1280, 720); }); return Buffer.from((await p.evaluate(() => document.getElementById('mg').toDataURL('image/png'))).split(',')[1], 'base64'); })();
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-i', base, '-f', 'image2pipe', '-framerate', '' + fps, '-c:v', 'png', '-i', '-', '-filter_complex', '[0:v][1:v]overlay=eof_action=pass:shortest=0[v]', '-map', '[v]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', '' + fps, out]);
  const t0 = Date.now();
  for (let i = 0; i < n; i++) { const png = (await grab(i / fps)) || blank; if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 480 === 0) console.log('frame', i, '/', n, ((Date.now() - t0) / 1000).toFixed(0) + 's'); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', n, 'frames', errs.join('\n') || 'ok'); await b.close();
})();
