// node cues.cjs NN -> prints JSON shot timeline for act NN (same timing maths as shots.js)
const fs = require('fs'), vm = require('vm');
const n = process.argv[2], VO = process.env.VO || '/tmp/dp2work/vo';
const T = JSON.parse(fs.readFileSync(`${VO}/act${n}.json`)); const win = { TIMING: T, E: {}, PROPS: {} }; win.window = win;
vm.runInNewContext(fs.readFileSync(`acts/act${n}.js`, 'utf8'), win);
const ACT = win.ACT, LEAD = .6, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.2);
const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
const SH = ACT.shots.map(s => ({ s, a: s.t0 ?? at(s.p, s.f || 0) })); SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
console.log(JSON.stringify({ dur: LEAD + total, shots: SH.map(({ s, a, b }) => ({ a: +a.toFixed(3), b: +b.toFixed(3), p: s.p, plate: s.plate, booms: (s.props || []).filter(p => p.k === 'boom').map(p => +(a + (p.t0 || 0)).toFixed(3)), shake: !!(s.cam && s.cam.shake), fx: s.fx || [], title: !!s.title,
  pops: (s.pops || []).map(p => +(a + p.at).toFixed(3)), cards: (s.cards || []).map(c => +(a + (c.at ?? .4)).toFixed(3)), big: s.big ? +(a + s.big[1]).toFixed(3) : null, fadeOut: !!s.fadeOut,
  walk: (s.chars || []).some(c => Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20), grade: s.grade ? s.grade[0] : null })) }));
