// node events.js -> /home/user/work/audio/events.json {act: {shots:[{id,start,d,card}], pops:[t...]}}
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } }); const out = {};
 for (let a = 0; a < 7; a++) { await p.goto('file://' + __dirname + '/act.html?act=' + a + '#render'); await p.evaluate(() => window.ready);
  out[a] = await p.evaluate(() => { const shots = TL.map(s => ({ id: s.id, start: s.start, d: s.d, card: s.card !== undefined })); const seen = new Set(), pops = [];
   MG.beats().forEach(b => pops.push(b.t0));
   for (const s of TL) { if (s.card !== undefined) continue; for (let lt = 0; lt < s.d; lt += 1 / 12) { const r = s.f(lt, s.d, s.lines) || {}; (r.tags || []).forEach(o => { const k = s.id + o.txt; if (o.s > 0.05 && !seen.has(k)) { seen.add(k); pops.push(s.start + lt); } }); } }
   return { shots, pops: pops.sort((x, y) => x - y) }; }); console.log(a, out[a].shots.length, out[a].pops.length); }
 fs.writeFileSync('/home/user/work/audio/events.json', JSON.stringify(out)); await b.close(); })();
