// lists shots where the horn allowance pushes the camera so far that the face would drop low (close-ups)
const fs = require('fs'), vm = require('vm'); const C = require('./cast.cjs').C;
const val = (v, u) => Array.isArray(v) ? v[0] + (v[1] - v[0]) * u : v;
for (const n of process.argv.slice(2)) { const win = { TIMING: { durs: [1], gap: .4 }, E: {}, PROPS: {} }; win.window = win; vm.runInNewContext(fs.readFileSync(`acts/act${n}.js`, 'utf8'), win);
  win.ACT.shots.forEach((s, i) => { if (s.noHeadFit) return; const cm = s.cam || {}; for (const u of [0, 1]) { const z = val(cm.z ?? 1, u), y0 = val(cm.y ?? 720, u); let y = y0;
    for (const c of s.chars || []) { const a = (C[c.c] || {}).acc || {}, hs = a.hornStyle, hx = a.horns ? (hs === 'huge' ? 230 : hs === 'small' ? 70 : hs === 'broken' ? 90 : 150) : 0; const sc = val(c.s ?? 1.4, u), cy = val(c.y, u), lim = (165 - 540) / (z * .75); let need = cy - (410 + hx) * sc - lim; if (y0 - need > .3 * 720 / z) need = cy - 410 * sc - lim; if (y > need) y = Math.max(need, 720 / z); }
    if (y0 - y > 0.2 * 720 / z) console.log(n, i, u, Math.round(y0 - y), (s.chars || []).map(c => c.c).join(',')); } }); }
