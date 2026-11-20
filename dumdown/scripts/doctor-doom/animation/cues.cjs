// node cues.cjs NAME -> JSON shot timeline for mixing (same timing maths as film.js)
const fs = require('fs'), vm = require('vm'); const n = process.argv[2];
const T = JSON.parse(fs.readFileSync(`/tmp/ddwork/vo/${n}.json`)); const win = { TIMING: T, E: {}, PROPS: {}, Math }; win.window = win;
vm.runInNewContext(fs.readFileSync(`acts/${n}.js`, 'utf8'), win);
const ACT = win.ACT, LEAD = .6, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.0);
const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
const SH = ACT.shots.map(s => ({ s, a: s.t0 ?? at(s.p, s.f || 0) })); SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
let mood = null; const r = v => +v.toFixed(3);
console.log(JSON.stringify({ dur: LEAD + total, paraEnd: T.durs.map((d, i) => r(LEAD + starts[i] + d)), shots: SH.map(({ s, a, b }) => { mood = s.mood || mood; return { a: r(a), b: r(b), p: s.p, set: s.set, mood,
  booms: (s.props || []).filter(p => p.k === 'boom').map(p => r(a + (p.kt ? p.kt[0] : 0))), shake: !!(s.cam && s.cam.shake), fx: (s.fx || []).map(f => Array.isArray(f) ? f[0] : f),
  pops: (s.pops || []).map(p => r(a + p.at)), cards: (s.cards || []).map(c => r(a + (c.at ?? .6))), labels: (s.labels || []).map(l => r(a + (l.at ?? .5))), big: s.big ? r(a + s.big[1]) : null,
  flash: [].concat(s.flash ?? []).map(f => r(a + f)), shakeAt: (s.shakeAt || []).map(x => r(a + x[0])),
  walk: (s.chars || []).some(c => Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20 && (c.y == null || !Array.isArray(c.y) || Math.abs(c.y[1] - c.y[0]) < 200) && !c.noShadow), sfx: (s.sfx || []).map(([nm, tt, g]) => [nm, r(a + tt), g ?? .6]) }; }) }));
