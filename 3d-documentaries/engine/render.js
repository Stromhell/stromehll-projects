// Usage:
//   node render.js stills <shots.json> <shotModule> <outDir> [ids|act] [--sketch] [--at 0.5]
//   node render.js video  <shots.json> <shotModule> <out.mp4> <act> [--fps 30] [--vo voiceDir] [--from id]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const args = process.argv.slice(2); const flag = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : (args[i + 1] ?? true); };
const has = n => args.includes(n);
(async () => {
  const [mode, shotsFile, modFile, outp, sel] = args;
  const data = JSON.parse(fs.readFileSync(shotsFile, 'utf8'));
  const all = data.acts.flatMap(a => a.shots.map(s => ({ ...s, act: a.act, actName: a.name, period: a.period })));
  let list = all;
  if (sel && sel !== 'all') list = /^\d+$/.test(sel) ? all.filter(s => s.act === +sel) : all.filter(s => sel.split(',').includes(s.id));
  // optional VO timing file per shot: {id: seconds}
  const timing = flag('--timing') ? JSON.parse(fs.readFileSync(flag('--timing'), 'utf8')) : {};
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files', '--disable-web-security', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => { if (m.type() === 'error' || process.env.DBG) console.log('[page]', m.text()); });
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  const http = require('http'); const root = path.resolve(__dirname);
  const types = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json', '.ttf': 'font/ttf', '.png': 'image/png', '.jpg': 'image/jpeg', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.hdr': 'application/octet-stream', '.bin': 'application/octet-stream' };
  const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = u.startsWith('/@abs/') ? u.slice(5) : path.join(root, u);
    fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = `http://127.0.0.1:${srv.address().port}`;
  await page.goto(base + '/page.html?q=' + (process.env.RQ || 'full') + '&s=' + (process.env.RS || '1'));
  await page.waitForFunction(() => window.ready && window.loadShot, null, { timeout: 60000 });
  const absMod = path.resolve(modFile); const modUrl = absMod.startsWith(root) ? base + '/' + path.relative(root, absMod) : base + '/@abs' + absMod;
  const save = (b64, f) => fs.writeFileSync(f, Buffer.from(b64.split(',')[1], 'base64'));
  if (mode === 'stills') {
    fs.mkdirSync(outp, { recursive: true });
    const ats = String(flag('--at', '0.5')).split(',').map(Number);
    for (const s of list) {
      const meta = { ...s, ...(timing[s.id] ? { seconds: timing[s.id].dur, voA: timing[s.id].a, voB: timing[s.id].b } : {}) };
      try {
        const { dur, hits } = await page.evaluate(([m, me, o]) => window.loadShot(m, me, o), [modUrl, meta, { sketch: has('--sketch'), checkOverlap: true }]);
        if (hits && hits.length) console.log('OVERLAP', s.id, JSON.stringify(hits.slice(0, 8)));
        for (const a of ats) {
          const t0 = Date.now();
          const img = await page.evaluate(([t, f]) => window.frame(t, f, .9), [dur * a, has('--png') ? 'png' : 'jpeg']);
          const f = path.join(outp, `${s.id}${ats.length > 1 ? '_' + a : ''}.${has('--png') ? 'png' : 'jpg'}`); save(img, f);
          console.log('still', s.id, a, (Date.now() - t0) + 'ms');
        }
      } catch (e) { console.log('ERR', s.id, e.message.split('\n')[0]); }
    }
  } else if (mode === 'video') {
    const fps = +flag('--fps', 30), scale = flag('--scale');
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', ...(scale ? ['-vf', 'scale=' + scale] : []), '-c:v', 'libx264', '-preset', 'medium', '-crf', String(flag('--crf', 18)), '-pix_fmt', 'yuv420p', outp], { stdio: ['pipe', 'inherit', 'inherit'] });
    let n = 0; const T = Date.now();
    for (const s of list) {
      const meta = { ...s, ...(timing[s.id] ? { seconds: timing[s.id].dur, voA: timing[s.id].a, voB: timing[s.id].b } : {}) };
      const { dur } = await page.evaluate(([m, me, o]) => window.loadShot(m, me, o), [modUrl, meta, {}]);
      const frames = Math.round(dur * fps);
      for (let i = 0; i < frames; i++) {
        const img = await page.evaluate(t => window.frame(t, 'jpeg', .93), i / fps);
        const buf = Buffer.from(img.split(',')[1], 'base64');
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
        n++;
        if (n % 60 === 0) { const el = (Date.now() - T) / 1000; fs.writeFileSync(outp + '.progress.json', JSON.stringify({ shot: s.id, frames: n, fps: +(n / el).toFixed(2), at: new Date().toISOString() })); }
      }
      console.log('shot', s.id, frames, 'frames', ((Date.now() - T) / 1000).toFixed(0) + 's');
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close(); srv.close();
})();
