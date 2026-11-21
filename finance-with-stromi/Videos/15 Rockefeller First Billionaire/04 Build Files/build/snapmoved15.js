// node snapmoved15.js acts outdir -> one frame per moved tag (mid-life) for eyeballing
const { chromium } = require('playwright');
(async () => { const [acts, out] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  for (const a of acts.split(',')) { await p.goto('file://' + __dirname + '/act15.html?act=' + a + '#render'); await p.evaluate(() => window.ready);
    const list = await p.evaluate(() => { const L = []; for (const s of TL) { if (s.card !== undefined) continue; const pl = planTags(s); s._tp = pl; if (!pl) continue;
      for (const n of Object.keys(pl)) { const ts = []; for (let lt = 0.05; lt < s.d; lt += 0.25) { const r = s.f(lt, s.d, s.lines) || {}; if ((r.tags || []).some(o => o.txt === n && o.s > 0.9)) ts.push(lt); } if (ts.length) L.push([s.id, n, s.start + ts[Math.floor(ts.length / 2)]]); } } return L; });
    for (const [id, n, t] of list) { await p.evaluate(t => renderAt(t), t); await p.screenshot({ path: `${out}/a${a}_${id}_${n.replace(/[^A-Za-z0-9]/g, '').slice(0, 20)}.jpg`, type: 'jpeg', quality: 60 }); }
    console.log('act', a, list.length); }
  await b.close(); })();
