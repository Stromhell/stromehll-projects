// find arm angles putting a wrist at a head-relative target (fy: forehead param), for a spec/view/dir
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage();
  await p.goto('file://' + path.resolve('page_gag02.html'));
  const r = await p.evaluate(([spec, view, dir, side, fy, dx, dy, sh0, sh1]) => { const D = window.DumDown, C = window.CAST; const sp = C[spec];
    const base = { L: { sh: -8, el: 6 }, R: { sh: 8, el: -6 }, legL: { hip: -3 }, legR: { hip: 3 } };
    const o = { view, dir, x: 0, y: 0, scale: 1 }; const f = D.forehead(sp, { ...o, pose: base, fy });
    let best = null; const sg = side === 'R' ? 1 : -1;
    for (let sh = sh0; sh <= sh1; sh += 3) for (let el = -170; el <= 170; el += 3) { const pose = JSON.parse(JSON.stringify(base)); pose[side] = { sh: sh * sg, el: el * sg };
      const w = D.wrist(sp, { ...o, pose }, side); const d = Math.hypot(w.x - (f.x + dx * f.sc), w.y - (f.y + dy * f.sc)); if (!best || d < best.d) best = { sh: sh * sg, el: el * sg, d, w, f }; }
    return best; }, process.argv.slice(2).map((v, i) => i < 2 || i === 3 ? v : +v));
  console.log(JSON.stringify(r)); await b.close(); })();
