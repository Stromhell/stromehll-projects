// node render.js <act> <out.mp4> [f0] [f1]  -> renders frames f0..f1-1 of the act at 24 fps (mjpeg pipe -> x264)
const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => { const [act, out, a0, a1] = process.argv.slice(2); const fps = 24;
 const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
 await p.goto('file://' + __dirname + '/act.html?act=' + act + '#render'); await p.evaluate(() => window.ready);
 const total = await p.evaluate(() => TOTAL); const n = Math.round(total * fps); const f0 = +(a0 || 0), f1 = Math.min(n, +(a1 || n));
 const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '' + fps, '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', '' + fps, out]);
 const t0 = Date.now();
 for (let i = f0; i < f1; i++) { const d = await p.evaluate(t => { renderAt(t); return document.getElementById('out').toDataURL('image/jpeg', 0.93); }, i / fps);
  const buf = Buffer.from(d.slice(d.indexOf(',') + 1), 'base64'); if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if ((i - f0) % 240 === 0) console.log(act, 'frame', i, '/', f1, ((Date.now() - t0) / 1000).toFixed(0) + 's'); }
 ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('done', act, f1 - f0, 'frames', ((Date.now() - t0) / 1000).toFixed(0) + 's', errs.slice(0, 3).join(' | ') || 'ok'); await b.close(); })();
