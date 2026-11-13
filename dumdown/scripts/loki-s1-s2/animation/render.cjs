const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const [outDir, list, workers = '3'] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const mk = async () => { const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); }); await p.goto('file://' + path.resolve(process.env.PAGE || 'page.html')); await p.evaluate(() => FILM.load()); return p; };
  const p0 = await mk(); const N = await p0.evaluate(() => FILM.frames);
  let frames = list === 'all' ? [...Array(N).keys()] : list.split(',').map(Number);
  const pages = [p0]; for (let i = 1; i < +workers; i++) pages.push(await mk());
  let next = 0; await Promise.all(pages.map(async p => { while (next < frames.length) { const f = frames[next++]; const d = await p.evaluate(f => FILM.frame(f), f); fs.writeFileSync(path.join(outDir, `f${String(f).padStart(5, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64')); if (f % 120 === 0) console.log('frame', f, '/', N); } }));
  await b.close(); console.log('done', frames.length); })();
