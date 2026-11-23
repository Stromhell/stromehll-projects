// node shotrev.cjs NN -> /tmp/wfwork/shotrev/aNN_sKK_{0,1}.jpg : frames at 25% and 85% of every shot
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const n = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } }); await p.goto('file://' + path.resolve(`page_act${n}.html`)); await p.evaluate(() => FILM.load());
  const sh = await p.evaluate(() => FILM.shots); const out = [];
  for (let i = 0; i < sh.length; i++) { const [a, bb] = sh[i]; for (const [k, u] of [[0, .25], [1, .85]]) { const f = Math.round((a + (bb - a) * u) * 24); const d = await p.evaluate(f => FILM.frame(f), f); fs.writeFileSync(`/tmp/wfwork/shotrev/a${n}_s${String(i).padStart(2, '0')}_${k}.jpg`, Buffer.from(d.split(',')[1], 'base64')); } out.push([i, +a.toFixed(1), +bb.toFixed(1)]); }
  console.log(JSON.stringify(out)); await b.close(); })();
