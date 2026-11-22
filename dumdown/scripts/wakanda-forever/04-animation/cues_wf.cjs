// node cues_si.cjs NN -> JSON shot timeline for act NN with every word cue resolved (same maths as shots.js)
const fs = require('fs'), vm = require('vm');
const n = process.argv[2], VO = process.env.VO || '/tmp/wfwork/timing';
const T = JSON.parse(fs.readFileSync(`${VO}/act${n}.json`)); const win = { TIMING: T, E: {}, PROPS: {} }; win.window = win;
vm.createContext(win); vm.runInContext(fs.readFileSync('am_help.js', 'utf8'), win); vm.runInContext('var TK = window.TK, GS = window.GS, GT = window.GT, GP = window.GP, DUR = window.DUR;', win); vm.runInContext(fs.readFileSync(`acts_wf/act${n}.js`, 'utf8'), win);
const ACT = win.ACT, LEAD = .6, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.2);
const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
const norm = x => x.toLowerCase().replace(/[^a-z0-9' -]/g, '');
const wordAt = (p, w, nth = 0) => { const ch = (T.chunks || [])[p]; const ww = norm(w); if (ch) { let k = 0; for (const [cs, cd, tx] of ch) { const nn = norm(tx); let i = -1, from = 0; while ((i = nn.indexOf(ww, from)) >= 0) { if (k++ === nth) return LEAD + starts[p] + cs + cd * (i / Math.max(1, nn.length)); from = i + 1; } } }
  console.error(`act${n} word not found: p${p} "${w}"`); return LEAD + starts[p]; };
const SH = ACT.shots.map(s => ({ s, a: s.t0 ?? at(s.p, s.f || 0) })); SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
const W = (q, s) => q.at != null ? null : wordAt(q.p ?? s.p, q.w ?? q.tw, q.n || 0) + (q.d || 0);
const r3 = x => +x.toFixed(3);
const meter = (ACT.meterEv || []).map(e => r3(e.at != null ? e.at : wordAt(e.p, e.w, 0)));
console.log(JSON.stringify({ dur: LEAD + total, meter, shots: SH.map(({ s, a, b }) => ({ a: r3(a), b: r3(b), p: s.p, plate: s.plate, shake: !!(s.cam && s.cam.shake), fx: s.fx || [], title: !!s.title,
  pops: (s.pops || []).map(p => r3(p.w ? W(p, s) : a + (p.at || 0))), cards: (s.cards || []).map(c => r3(c.w ? W(c, s) : a + (c.at ?? .4))),
  props: (s.props || []).filter(p => p.tw || p.t0).map(p => [p.k, r3(p.tw ? W(p, s) : a + p.t0)]),
  acts: [].concat(...(s.chars || []).map(c => (c.acts || []).map(q => [q.a, r3(q.at != null ? a + q.at : W(q, s))]))),
  walk: (s.chars || []).some(c => Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20), run: (s.chars || []).some(c => c.anim === 'run'), limp: (s.chars || []).some(c => c.anim === 'limp') })) }));
