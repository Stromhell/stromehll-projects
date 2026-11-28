// Script 5 v9 renderer: one page (pages/film.html), one clock. 4 workers each render a contiguous frame range, then they are joined.
// usage: node render_film.js OUTDIR [--still t1,t2,...] [--scale 0.5]   -> OUTDIR/video.mp4 + scNN.cues.json
const {chromium} = require('playwright');
const {spawn, execFileSync} = require('child_process');
const fs = require('fs'), path = require('path');
const FPS = 30, a = process.argv.slice(2), out = a[0];
let still = null, scale = 1, SUB = 1, FROM = 0, TO = null;
for (let i = 1; i < a.length; i++) { if (a[i] === '--still') still = a[++i].split(',').map(Number); else if (a[i] === '--scale') scale = +a[++i]; else if (a[i] === '--sub') SUB = +a[++i]; else if (a[i] === '--from') FROM = +a[++i]; else if (a[i] === '--to') TO = +a[++i]; }
fs.mkdirSync(out, {recursive: true});
const page = 'file://' + path.join(__dirname, 'pages', 'film.html');
(async () => {
  const b = await chromium.launch({args: ['--allow-file-access-from-files', '--run-all-compositor-stages-before-draw', '--disable-checker-imaging', '--disable-new-content-rendering-timeout', '--disable-partial-raster']});
  const open = async () => {
    const p = await b.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: scale});
    p.on('pageerror', e => console.log('  [pageerror]', e.message));
    await p.goto(page); await p.waitForFunction(() => window.ready === true, null, {timeout: 120000});
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400); return p;
  };
  const p0 = await open();
  const cues = await p0.evaluate(() => window.CUESBY), dur = await p0.evaluate(() => window.DURATION);
  for (const [n, c] of Object.entries(cues)) fs.writeFileSync(path.join(out, 'sc' + String(n).padStart(2, '0') + '.cues.json'), JSON.stringify(c));
  if (still) {
    for (const t of still) { await p0.evaluate(t => new Promise(r => { window.seek(t); requestAnimationFrame(() => requestAnimationFrame(r)); }), t); await p0.screenshot({path: path.join(out, `f_${t.toFixed(2).padStart(7, '0')}.jpg`), type: 'jpeg', quality: 85}); }
    await b.close(); return;
  }
  const F0 = Math.round(FROM * FPS), N = Math.round((TO ?? dur) * FPS) - F0, K = 4, parts = [];
  const work = async (k, p) => {
    const i0 = F0 + Math.floor(N * k / K), i1 = F0 + Math.floor(N * (k + 1) / K), f = path.join(out, `part${k}.mp4`); parts[k] = f;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-',
      '-vf', (SUB > 1 ? `tmix=frames=${SUB},select='not(mod(n-${SUB - 1}\\,${SUB}))',setpts=N/(${FPS}*TB),` : '') + 'scale=1920:1080:flags=lanczos', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), f]);
    // warm up a little before the range so anything time-dependent has been passed through
    // warm up: the first captures after a big jump can miss tiles, so paint the start of the range twice and throw it away
    for (const w of [1, .3, 0]) { await p.evaluate(t => window.seek(t), Math.max(0, i0 / FPS - w)); await p.screenshot({type: 'jpeg', quality: 50, timeout: 180000}); await p.waitForTimeout(250); }
    for (let i = i0; i < i1; i++) {
      // v9 motion blur: SUB sub-frames across a 180 degree shutter, averaged into one frame
      for (let s = 0; s < SUB; s++) {
        await p.evaluate(t => new Promise(r => { window.seek(t); requestAnimationFrame(() => r()); }), i / FPS + s * .5 / FPS / SUB);
        const buf = await p.screenshot({type: 'jpeg', quality: 96, timeout: 180000});
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      if ((i - i0) % 600 === 0) console.log(`  worker ${k}: frame ${i}/${i1}`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    console.log('part', k, i1 - i0, 'frames');
  };
  const pages = [p0, await open(), await open(), await open()];
  await Promise.all(pages.map((p, k) => work(k, p)));
  fs.writeFileSync(path.join(out, 'parts.txt'), parts.map(f => `file '${f}'`).join('\n'));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(out, 'parts.txt'), '-c', 'copy', path.join(out, 'video.mp4')]);
  console.log('video', N, 'frames');
  await b.close();
})();
