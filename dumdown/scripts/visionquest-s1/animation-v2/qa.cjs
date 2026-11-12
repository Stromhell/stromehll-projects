const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const out = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); }); p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.goto('file://' + path.resolve('' + (process.env.PAGE || 'page_ep1.html') + '')); await p.evaluate(() => FILM.load());
  const shots = await p.evaluate(() => FILM.shots); const fr = []; const ex = (process.argv[3] || '').split(',').filter(Boolean).map(Number);
  if (ex.length) fr.push(...ex); else shots.forEach(([a, b]) => fr.push(Math.round((a + (b - a) * .7) * 24)));
  fs.mkdirSync(out, { recursive: true }); for (const f of fr) { const d = await p.evaluate(f => FILM.frame(f), f); fs.writeFileSync(`${out}/q${String(f).padStart(5, '0')}.jpg`, Buffer.from(d.split(',')[1], 'base64')); }
  console.log(fr.join(',')); await b.close(); })();
