const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
// Toon Lanky: each worker page gets TLSNAP(key, opts) -> renders that character in its own tl page (lazy, one per character per worker)
const TLC = JSON.parse(fs.readFileSync(path.join(__dirname, 'tl/cast_tl.json')));
(async () => { const [outDir, list, workers = '3'] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const mk = async () => { const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
    const tlp = {}; await p.exposeFunction('TLSNAP', async (k, o) => { if (!tlp[k]) { tlp[k] = (async () => { const q = await b.newPage({ viewport: { width: 700, height: 1100 } }); const c = TLC[k];
        q.on('console', m => { if (m.type() === 'error') console.log('TLERR', k, m.text()); });
        await q.goto('file://' + path.join(__dirname, `tl/tl_${c.base}.html`) + `?n=${k}#` + encodeURIComponent(JSON.stringify(c))); await q.waitForFunction('window.TLREADY'); return q; })(); }
      const q = await tlp[k]; return q.evaluate(o => SNAP(o), o); });
    await p.goto('file://' + path.resolve(process.env.PAGE || 'page.html')); await p.evaluate(() => FILM.load()); return p; };
  const p0 = await mk(); const N = await p0.evaluate(() => FILM.frames);
  let frames = list === 'all' ? [...Array(N).keys()] : list.split(',').map(Number);
  const pages = [p0]; for (let i = 1; i < +workers; i++) pages.push(await mk());
  let next = 0; await Promise.all(pages.map(async p => { while (next < frames.length) { const f = frames[next++]; const d = await p.evaluate(f => FILM.frame(f), f); fs.writeFileSync(path.join(outDir, `f${String(f).padStart(5, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); if (f % 120 === 0) console.log('frame', f, '/', N); } }));
  await b.close(); console.log('done', frames.length); })();
