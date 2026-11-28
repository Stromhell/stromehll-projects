// Script 5 v2 renderer: frame-exact capture via window.seek (30 fps) -> scNN.mp4 + scNN.cues.json (sound cues).
// usage: node render.js OUTDIR [--still t1,t2] [--scale 0.5] [scene numbers...]
const {chromium} = require('playwright');
const {spawn} = require('child_process');
const fs = require('fs'), path = require('path');
const FPS = 30, a = process.argv.slice(2), out = a[0];
let frac = null, still = null, scale = 1, only = [];
for (let i = 1; i < a.length; i++) { if (a[i] === '--still') still = a[++i].split(',').map(Number); else if (a[i] === '--frac') frac = a[++i].split(',').map(Number); else if (a[i] === '--scale') scale = +a[++i]; else only.push(+a[i]); }
const plan = JSON.parse(fs.readFileSync(path.join(__dirname, 'plan.json')));
fs.mkdirSync(out, {recursive: true});
(async () => {
  const b = await chromium.launch({args: ['--allow-file-access-from-files']});
  const todo = plan.filter(p => !only.length || only.includes(p.n));
  const worker = async () => {
    const p = await b.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: scale});
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('  [sc]', m.text()); });
    p.on('pageerror', e => console.log('  [pageerror]', e.message));
    while (todo.length) {
      const sc = todo.shift(), tag = 'sc' + String(sc.n).padStart(2, '0');
      await p.goto('file://' + path.join(__dirname, 'pages', sc.file));
      await p.waitForFunction(() => window.ready === true, null, {timeout: 20000});
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(300);
      fs.writeFileSync(path.join(out, tag + '.cues.json'), JSON.stringify(await p.evaluate(() => window.CUES)));
      if (still || frac) {
        for (const t of (still || frac.map(f => +(f * sc.dur).toFixed(2)))) { await p.evaluate(t => window.seek(t), t); await p.screenshot({path: path.join(out, `${tag}_${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 85}); }
        continue;
      }
      const n = Math.round((sc.dur + (sc.tail || 0)) * FPS);
      const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
        '-vf', 'scale=1920:1080', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), path.join(out, tag + '.mp4')]);
      for (let i = 0; i < n; i++) {
        await p.evaluate(t => window.seek(t), i / FPS);
        const buf = await p.screenshot({type: 'jpeg', quality: 92});
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      ff.stdin.end(); await new Promise(r => ff.on('close', r));
      console.log('scene', sc.n, n, 'frames');
    }
    await p.close();
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  await b.close();
})();
