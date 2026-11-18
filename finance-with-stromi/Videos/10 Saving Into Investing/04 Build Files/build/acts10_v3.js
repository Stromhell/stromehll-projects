/* Finance with Stromi 10 (The Waiting Room): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig, post}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkX = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; c.set(x, z, mv ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0) * 1.3, h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const walkZ = (s, key, x, z0, z1, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const z = lerp(z0, z1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; const P = mv ? RH.anim.walk(t, 'front', { cps: 1.1 }) : pose(o, t, L, who); c.set(x, z, P, s.C); return z; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03, size: 34 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(clamp(k, 0, 1)), a[0], b[0], a[1], b[1]);
const POINT = { h: [0.75, 0.95], hand: 'open' }, UP = { h: [0.35, 1.25], hand: 'open' }, HOLD = { h: [0.4, 0.55], hand: 'fist' }, CHIN = { h: [0.25, 1.05], hand: 'fist' }, CHEER = { h: [0.45, 1.45], hand: 'fist' }, WAVE = { h: [0.55, 1.35], hand: 'wave' }, SHRUG = { h: [0.55, 0.9], hand: 'open' };
const fadeOut = (t, d, a) => x => { const f = k01(t, d - a, d); if (f > 0) { x.save(); x.globalAlpha = f; x.fillStyle = '#060504'; x.fillRect(0, 0, W, H); x.restore(); } };
const flash = (t, a, col) => x => { const f = Math.max(0, 1 - Math.abs(t - a) / 0.25); if (f > 0) { x.save(); x.globalAlpha = 0.35 * f; x.fillStyle = col || '#fff'; x.fillRect(0, 0, W, H); x.restore(); } };
const shake = (s, t, a, amt) => { const k = Math.max(0, 1 - Math.abs(t - a) / 0.5) * (amt || 0.04); s.C.position.x += Math.sin(t * 60) * k; s.C.position.y += Math.cos(t * 53) * k; };
const posts = (...f) => x => f.forEach(g => g && g(x));
const span = (t, a, b) => pop(t, a) * (1 - k01(t, b - 0.35, b)); // tag that pops at a and leaves at b
/* coin character: who = voice key that animates its mouth */
const cn = (s, key, x, z, o, t, L, who, h, y) => { const c = coinOf(s, key, h || 0.55); const talking = who && L && speaking(L, who, t); const oo = Object.assign({ t, blink: !talking && RH.blinkAt(t + (o.seed || 0)) > 0.5 }, o); if (talking) { oo.mouth = MOUTH[Math.floor(t * 9) % MOUTH.length]; if (oo.mouth === 'M' || oo.mouth === 'smile') oo.mouth = 'E'; if (!o.arms) oo.arms = [null, 'talk']; } c.set(x, z, oo, s.C, y); return c; };
const hideCoins = (s, keep) => hideCards(s, keep);

/* ---------- set helpers ---------- */
const APT = (s, t, o) => { o = o || {}; if (s.rfill) s.rfill.intensity = 0; { const q = o.note != null ? s.lmAway : s.lmHome; s.lm.position.x = q[0]; s.lm.position.z = q[1]; } const pk = JSON.stringify(o.ph || {}); if (s._ph !== pk) { s.phone.userData.sc.userData.draw(o.ph || {}); s._ph = pk; }
  const fk = JSON.stringify(o.fb || {}); if (s._fb !== fk) { s.fb.userData.draw(o.fb || {}); s._fb = fk; }
  s.night.intensity = o.night ? 1.2 : 0; s.ll.intensity = o.night ? 2.2 : 1.6; s.note.visible = o.note != null; if (o.note != null && s._n !== o.note) { s.note.userData.draw({ n: o.note }); s._n = o.note; }
  s.jar2.visible = !!o.jar2; const jl = o.jar2 ? 'RAINY DAY' : 'SAVINGS'; if (s._jl !== jl) { s.jar.userData.label.userData.draw({ t: jl }); s._jl = jl; }
  s.phone.position.y = s.TY + 0.007 + (o.buzz ? Math.abs(Math.sin(t * 50)) * 0.006 : 0); s.phone.rotation.y = 0.3 + (o.buzz ? Math.sin(t * 43) * 0.06 : 0);
  s.spill.forEach(c => c.visible = false); s.jar.userData.coins.forEach((c, i) => c.visible = true); };
const WR = (s, t, o) => { o = o || {}; s.tray.visible = !!o.tray; s.hy.visible = !!o.hy; s.hyL.intensity = o.hy ? 3 : 0; s.scis.visible = false; if (o.rate && s._r !== o.rate) { s.tsc.userData.draw({ r: o.rate }); s._r = o.rate; } };
const seatCoins = (s, t, L, o) => { o = o || {}; const MET = ['gold', 'copper', 'gold', 'silver', 'gold', 'copper', 'gold', 'silver', 'copper', 'gold'];
  const use = o.seats || [0, 1, 3, 4, 6, 7, 9, 10, 13, 14]; use.forEach((si, i) => { const [x, z] = s.seats[si]; const snip = o.snip ? o.snip(i, x) : 0; cn(s, 'seat' + i, x, z + 0.06, { metal: MET[i % MET.length], sit: true, expr: o.expr || (i % 3 ? 'sleepy' : 'neutral'), look: [Math.sin(t * 0.4 + i) * 0.6, 0.2], squash: snip * 0.12, seed: i * 1.3, arms: [null, null] }, t, L, o.voice && o.voice[i], 0.5, 0.44); }); };
const BR = (s, t, o) => { o = o || {}; s.phones.forEach((p, i) => { const st = typeof o.ph === 'function' ? o.ph(i) : (o.ph || {}); const k = JSON.stringify(st); if (p._k !== k) { p.userData.draw(st); p._k = k; } }); };
const POR = (s, t, o) => { o = o || {}; s.can.position.y = lerp(-0.2, 0.2, o.can || 0) + (o.can > 0 && o.can < 1 ? Math.sin(t * 30) * 0.01 : 0); s.scale.visible = !!o.scale; s.beam.rotation.z = o.tilt || 0; s.pans[0].position.y = 0.45 - Math.sin(o.tilt || 0) * 0.38; s.pans[1].position.y = 0.45 + Math.sin(o.tilt || 0) * 0.38; s.letter.visible = !!o.letter; };
const ST = (s, t, o) => { o = o || {}; s.storm(o.storm || 0, t); s.shopDraw(o.shops || {}); s.finish.visible = !!o.finish; s.turtle.visible = !!o.turtle; s.deed.visible = !!o.deed;
  s.trucks.forEach((tr, i) => { tr.visible = o.trucks !== false; const v = o.storm ? 0 : 1.6; const z = ((-8 - i * 8 + t * v * (i % 2 ? 1 : -1)) % 30 + 30) % 30 - 26; tr.position.z = z; tr.userData.wh.forEach(w => w.rotation.y = t * v * 4 * (i % 2 ? 1 : -1)); }); };
const workers = (s, t, n, o) => { o = o || {}; for (let i = 0; i < n; i++) { const sd = i % 2 ? 1 : -1; const v = 0.9 + (i % 3) * 0.2; const z = ((3 - i * 3.3 - t * v * (o.run ? 2.5 : 1)) % 22 + 22) % 22 - 18; const x = sd * (3.4 + (i % 3) * 0.25);
  cn(s, 'w' + i, x, z, { metal: ['gold', 'copper', 'silver'][i % 3], hat: 'hard', walk: t * 1.6 * v, dir: 1, expr: o.run ? 'scared' : 'happy', arms: o.run ? ['up', 'up'] : [null, 'hold'], seed: i }, t, null, null, 0.6); } };
const BRG = (s, t, o) => { o = o || {}; s.sway(t, o.wind || 0.5); s.lit(o.lit == null ? 1 : o.lit); s.door.visible = !!o.door; s.stop.visible = !!o.door; const bk = o.press ? 'p' : 'n'; if (s._bw !== bk) { s.bwin.userData.draw({ press: !!o.press }); s._bw = bk; } };
const onBridge = (s, x) => (Math.abs(x) <= s.GAP ? s.sag(x) + 0.1 : 0.12);

const ACTS = {};
/* ============ ACT 0: COLD OPEN ============ */
ACTS[0] = [
  { id: 'S01', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'pip10']); const w = lineAt(L, 'WREN').t0, thx = ph(L, 'thank you'); const buzz = t > thx + 0.8 && t < w;
      APT(s, t, { night: 1, buzz, ph: { amt: '$0.08', l2: 'Balance $10,000.00' } }); s.lm.userData.tape.scale.z = 1 + 2 * k01(t, 2, 5);
      if (t < thx) cl(s, k01(t, 0, thx), [[2.4, 1.9, 2.4], [-0.2, 1.0, -1.4]], [[1.6, 1.55, 1.0], [0.25, 0.9, -1.25]]); else cl(s, k01(t, thx, d), [[1.4, 1.45, 1.35], [0.65, 0.9, -1.25]], [[1.25, 1.4, 1.15], [0.65, 0.88, -1.25]]);
      sp(s, 'wren', 1.3, -1.3, { view: 'q', dir: -1, expr: t > w ? 'surprised' : (buzz ? 'neutral' : 'happy'), arms: [HOLD, t > w ? SHRUG : HOLD], look: t > thx ? [-0.5, 0.6] : [-0.4, 0.4] }, t, L, 'WREN', 1.6);
      sp(s, 'pip10', -0.95, -1.45, { view: 'q', dir: 1, expr: 'surprised', arms: [null, null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('11 YEARS OF SAVING', 640, 80, span(t, ph(L, 'eleven years'), ph(L, 'ten thousand')), YT), T('$10,000 IN THE BANK', 640, 80, span(t, ph(L, 'ten thousand'), thx + 0.5), GT), T('INTEREST PAID: $0.08', 640, 80, pop(t, w - 0.3), RT)] }; } },
  { id: 'S02', f(t, d, L) { const s = getSet('waitroom10'); hideCards(s); WR(s, t, { rate: '0.01%' }); const dm = lineAt(L, 'DIME').t0;
      seatCoins(s, t, L, { seats: [0, 1, 2, 3, 5, 6, 7, 8, 9, 12] });
      const [cx, cz] = [2.4, s.cz + 3.75]; cn(s, 'dime', cx - 0.45, cz + 0.1, { metal: 'silver', scuff: true, expr: t > lineAt(L, 'DIME', 1).t0 ? 'sly' : 'sleepy', arms: ['cards', 'cards'], dir: 1 }, t, L, 'DIME', 0.6);
      cn(s, 'cdot', cx + 0.45, cz + 0.05, { metal: 'gold', expr: 'surprised', arms: ['cards', null], dir: -1 }, t, L, 'DOT', 0.55); cn(s, 'cgus', cx + 0.05, cz - 0.42, { metal: 'copper', expr: 'sleepy', arms: ['cards', 'cards'] }, t, L, 'GUS', 0.55);
      if (t < dm) cl(s, k01(t, 0, dm), [[-3.5, 1.4, 1.6], [-1.5, 0.6, -3.0]], [[0.8, 1.5, 1.6], [1.8, 0.6, -1.6]]); else cl(s, k01(t, dm, d), [[2.0, 1.15, 0.9], [2.4, 0.55, -1.25]], [[2.3, 1.05, 0.6], [2.4, 0.55, -1.25]]);
      return { scene: s.S, cam: s.C, tags: [T('NOW SERVING: 0.01%', 640, 80, span(t, ph(L, 'waiting room') - 0.5, dm), RT)] }; } },
  { id: 'S03', f(t, d, L) { const s = getSet('bridge10'); hideCards(s); BRG(s, t, { wind: 1.0 });
      cl(s, k01(t, 0, d), [[-1.2, 2.0, 6.0], [-4.6, 1.3, -2.0]], [[0.2, 2.4, 9.5], [0.4, 0.2, -2.0]]);
      return { scene: s.S, cam: s.C, tags: [T('MARKET STREET: WHERE MONEY WORKS', 900, 90, span(t, ph(L, 'across the canyon'), d - 4)), T('5 PLANKS = 5 STEPS', 640, 90, pop(t, ph(L, 'one plank')), YT)] }; } },
  { id: 'S04', card: 'The Waiting Room', sub: 'Saving into investing, one plank at a time' },
];
/* ============ ACT 1: THE WAITING ROOM ============ */
ACTS[1] = [
  { id: 'S05', card: '1. The Waiting Room' },
  { id: 'S06', f(t, d, L) { const s = getSet('waitroom10'); hideCards(s, ['mort', 'wren']); const m = lineAt(L, 'MORT').t0; WR(s, t, { tray: t > m - 0.5, rate: '0.01%' }); seatCoins(s, t, L, { seats: [3, 4, 9, 10, 15, 16] });
      s.tray.position.z = s.cz + lerp(-0.1, 0.35, E(k01(t, m - 0.5, m + 0.6)));
      if (t < m) cl(s, k01(t, 0, m), [[1.8, 1.7, -1.2], [-1.45, 1.6, -5.0]], [[0.2, 1.5, -2.4], [-1.45, 1.4, -5.0]]); else cl(s, k01(t, m, d), [[0.8, 1.55, -2.0], [-1.3, 1.2, -5.0]], [[0.6, 1.5, -2.2], [-1.3, 1.15, -5.0]]);
      sp(s, 'mort', -1.45, s.cz - 0.55, { view: 'front', expr: t > lineAt(L, 'MORT', 1).t0 ? 'happy' : 'neutral', arms: [t > m - 0.5 && t < m + 1.5 ? POINT : null, null] }, t, L, 'MORT', 1.7);
      sp(s, 'wren', -0.6, s.cz + 0.75, { view: 'q', dir: -1, expr: t > lineAt(L, 'WREN').t0 ? 'sly' : 'neutral', arms: [null, null], look: [-0.4, 0] }, t, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('BIG BANKS: ~0.01%', 640, 80, span(t, ph(L, 'hundredth'), ph(L, 'one dollar a year')), RT), T('$10,000 → ~$1 A YEAR', 640, 80, span(t, ph(L, 'one dollar a year'), ph(L, 'national average')), RT), T('US AVERAGE: ~0.38%', 640, 80, span(t, ph(L, 'national average'), m), YT)] }; } },
  { id: 'S07', f(t, d, L) { const s = getSet('waitroom10'); hideCards(s, ['infl']); WR(s, t, { rate: '0.01%' });
      const ix = lerp(-4.6, 4.2, k01(t, 0.8, d - 3.5)), iz = s.cz + 3.2; walkX(s, 'infl', -4.6, 4.2, iz, t, 0.8, d - 3.5, { view: 'q', dir: 1, expr: 'sly', arms: [null, null] }, L, null, 2.0);
      seatCoins(s, t, L, { seats: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15], snip: (i, x) => Math.max(0, 1 - Math.abs(ix - x) / 0.35), voice: { 0: 'DIME', 3: 'GUS' } });
      s.scis.visible = true; s.scis.position.set(ix + 0.35, 1.15, iz + 0.15); s.scis.children[0].rotation.z = 0.2 + Math.abs(Math.sin(t * 8)) * 0.3; s.scis.children[1].rotation.z = -0.2 - Math.abs(Math.sin(t * 8)) * 0.3;
      cl(s, k01(t, 0, d), [[-3.4, 1.7, 1.4], [-1.2, 0.9, -2.0]], [[2.6, 1.6, 1.0], [1.2, 0.9, -2.0]]);
      return { scene: s.S, cam: s.C, tags: [T('INFLATION', 640, 76, span(t, ph(L, 'second visitor'), ph(L, 'three point seven')), BT), T('PRICES: +3.7% IN A YEAR', 640, 76, span(t, ph(L, 'three point seven'), ph(L, 'grocery store')), RT), T('SAME $10,000. BUYS LESS.', 640, 76, span(t, ph(L, 'grocery store'), d), RT)] }; } },
  { id: 'S08', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren']); const a = ph(L, 'at one percent'), b = ph(L, 'now imagine'), e = ph(L, 'about sixty-seven'); const k = t < b ? k01(t, a, b - 0.3) : k01(t, b + 3, e + 0.5);
      APT(s, t, { fb: { mode: 'jars', k: Math.round(k * 19) / 19 } });
      cl(s, k01(t, 0, d), [[-1.3, 1.5, -0.3], [-2.55, 1.15, -2.2]], [[-1.75, 1.35, -0.85], [-2.45, 1.15, -2.2]]);
      sp(s, 'wren', -3.1, -1.85, { view: 'q', dir: -1, expr: t > e ? 'surprised' : 'neutral', arms: [POINT, null], look: [-0.8, 0.2] }, t, L, '', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('SAME MONEY. SAME 20 YEARS.', 640, 70, pop(t, ph(L, 'same money')), YT)] }; } },
  { id: 'S09', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'pip10']); APT(s, t, {}); const w = lineAt(L, 'WREN').t0;
      const nsp = Math.floor(k01(t, 1.5, ph(L, 'most of the work')) * 14); s.spill.forEach((c, i) => { if (i >= nsp) return; c.visible = true; const a = i * 2.4; const f = k01(t, 1.5 + i * 0.45, 2.1 + i * 0.45); c.position.set(s.jar.position.x + Math.cos(a) * 0.08 * f + (i % 4) * 0.03 * f, s.TY + 0.3 * (1 - f) * f * 4 + 0.006 + (i % 3) * 0.008 * (1 - f) + 0.004, s.jar.position.z + Math.sin(a) * 0.06 * f + 0.12 * f); c.rotation.x = f * 3; });
      s.jar.userData.coins.forEach((c, i) => { c.position.y = 0.005 + Math.floor(i / 4) * 0.012 + k01(t, 0.8, 4) * Math.floor(i / 4) * 0.035; });
      if (t < w) cl(s, k01(t, 0, w), [[0.5, 1.25, 0.2], [-0.1, 0.85, -1.15]], [[0.3, 1.2, 0.0], [-0.1, 0.85, -1.15]]); else cl(s, k01(t, w, d), [[1.6, 1.45, 0.8], [0.3, 0.95, -1.3]], [[1.4, 1.4, 0.6], [0.3, 0.95, -1.3]]);
      sp(s, 'wren', 1.3, -1.3, { view: 'q', dir: -1, expr: t > w ? 'surprised' : 'happy', arms: [t > 4 && t < w ? UP : HOLD, t > w ? SHRUG : null], look: [-0.5, 0.5] }, t, L, 'WREN', 1.6);
      sp(s, 'pip10', -0.95, -1.45, { view: 'q', dir: 1, expr: 'sly', arms: [null, null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('COMPOUNDING: MONEY MAKES MONEY', 640, 76, span(t, ph(L, 'compounding') - 0.3, w), GT)] }; } },
  { id: 'S10', f(t, d, L) { const s = getSet('street10'); hideCards(s); ST(s, t, {}); workers(s, t, 6);
      cl(s, k01(t, 0, d), [[0, 3.2, 6], [0, 1.4, -10]], [[0.6, 1.6, -12], [0, 1.3, -26]]);
      return { scene: s.S, cam: s.C, tags: [T('~10% A YEAR = LONG-RUN AVERAGE, NOT A PROMISE', 640, 76, span(t, ph(L, 'ten percent is'), ph(L, 'two thousand eight')), YT), T('2008: -37%', 380, 150, pop(t, ph(L, 'two thousand eight')), RT), T('2023: +26%', 900, 150, pop(t, ph(L, 'twenty twenty-three')), GT)] }; } },
];
/* ============ ACT 2: WHY WE STAY SEATED ============ */
ACTS[2] = [
  { id: 'S11', card: '2. Why We Stay Seated' },
  { id: 'S12', f(t, d, L) { const s = getSet('porch10'); hideCards(s, ['abe', 'wren']); const a = lineAt(L, 'ABE').t0; POR(s, t, { can: k01(t, a - 2.5, a - 0.3) });
      if (t < a) cl(s, k01(t, 0, a), [[1.8, 2.2, 4.0], [-1.6, 0.6, -0.6]], [[0.0, 1.4, 2.2], [-1.9, 0.5, -0.4]]); else cl(s, k01(t, a, d), [[-0.2, 1.4, 2.6], [-1.1, 0.8, -0.2]], [[-0.4, 1.35, 2.3], [-1.1, 0.8, -0.2]]);
      sp(s, 'abe', -1.55, 0.05, { view: 'q', dir: -1, expr: t > lineAt(L, 'ABE', 1).t0 ? 'sly' : 'happy', arms: [t > a - 2.5 && t < a + 2 ? HOLD : null, null], look: [-0.4, 0.6] }, t, L, 'ABE', 1.5);
      sp(s, 'wren', -0.35, 0.35, { view: 'q', dir: -1, expr: 'neutral', arms: [null, null], look: [-0.7, 0.1] }, t, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('THE FOLGERS FUND: 40 YEARS IN A CAN', 640, 76, span(t, a, d), YT)] }; } },
  { id: 'S13', f(t, d, L) { const s = getSet('porch10'); hideCards(s, ['abe', 'dot10']); const tw = ph(L, 'twice as bad'); POR(s, t, { can: 1, scale: 1, tilt: -0.35 * E(k01(t, tw - 0.5, tw + 0.6)) - (t > tw + 0.6 ? Math.sin(t * 3) * 0.02 : 0) });
      cl(s, k01(t, 0, d), [[0.7, 1.6, -1.0], [-2.3, 0.95, -2.7]], [[0.4, 1.55, -1.3], [-2.3, 0.95, -2.7]]);
      sp(s, 'abe', -2.9, s.dz + 0.25, { view: 'q', dir: 1, expr: t > tw ? 'scared' : 'neutral', arms: [t > tw ? UP : null, null], look: [0.5, 0.5] }, t, L, 'ABE', 1.5, s.DY);
      sp(s, 'dot10', -1.6, s.dz - 1.0, { view: 'q', dir: -1, expr: 'sly', arms: [null, null] }, t, L, 'DOT', 1.4, s.DY);
      return { scene: s.S, cam: s.C, tags: [T('LOSE $100', 420, 110, pop(t, ph(L, 'losing money')), RT), T('WIN $100', 860, 110, pop(t, ph(L, 'winning the same') - 0.2), GT), T('LOSSES FEEL ~2× AS STRONG', 640, 70, pop(t, tw), YT)] }; } },
  { id: 'S14', f(t, d, L) { const s = getSet('breakroom10'); hideCards(s, ['rico', 'wren']); const r = lineAt(L, 'RICO').t0, w = lineAt(L, 'WREN').t0, r2 = lineAt(L, 'RICO', 1).t0;
      BR(s, t, { ph: i => ({ up: t > r2 ? -1 : (Math.sin(t * 2 + i) > 0 ? 1 : -1), seed: Math.floor(t * 3) % 5, v: t > r2 ? '-$420' : undefined }) });
      cl(s, k01(t, 0, d), [[1.8, 1.6, 1.8], [-0.1, 1.0, -1.6]], [[1.1, 1.5, 1.3], [-0.1, 1.0, -1.6]]);
      sp(s, 'rico', -0.75, -1.15, { view: 'q', dir: 1, expr: t > r2 ? 'sad' : 'happy', arms: [CHEER, t > r2 ? CHIN : null] }, t, L, 'RICO', 1.7);
      walkX(s, 'wren', 2.6, 1.0, -0.9, t, 0.4, 2.8, { view: 'q', dir: -1, expr: t > w ? 'sly' : 'neutral', arms: [null, null] }, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('+$400 BEFORE LUNCH', 640, 76, span(t, r + 1.5, r2), GT), T('AFTER LUNCH: ...', 640, 76, pop(t, r2), RT)] }; } },
  { id: 'S15', f(t, d, L) { const s = getSet('breakroom10'); hideCards(s, ['wren']); BR(s, t, { ph: i => ({ up: Math.sin(t * 1.5 + i) > 0 ? 1 : -1, seed: Math.floor(t * 2) % 5 }) });
      cl(s, k01(t, 0, d), [[0.4, 1.6, 0.9], [3.4, 1.4, -1.5]], [[1.0, 1.6, 0.5], [3.6, 1.45, -1.4]]);
      sp(s, 'wren', 2.9, -2.4, { view: 'q', dir: 1, expr: 'neutral', arms: [CHIN, null], look: [0.6, 0.3] }, t, L, '', 1.6);
      const bub = pop(t, 1.0) * (1 - k01(t, ph(L, "it isn't") , ph(L, "it isn't") + 0.5));
      const post = x => { if (bub < 0.02) return; x.save(); x.globalAlpha = Math.min(1, bub); x.translate(330, 230); x.scale(bub, bub); x.fillStyle = '#f4efe6'; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 170, 120, 0, 0, TAU); x.fill(); x.stroke(); [[140, 120, 20], [175, 160, 12]].forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, TAU); x.fill(); x.stroke(); });
        x.fillStyle = '#c2372d'; x.fillRect(-80, -70, 160, 140); x.strokeRect(-80, -70, 160, 140); for (let i = 0; i < 3; i++) { x.fillStyle = '#fff'; x.fillRect(-66 + i * 46, -40, 40, 56); x.strokeRect(-66 + i * 46, -40, 40, 56); x.font = `30px ${HAND}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(['7', '$', '7'][(i + Math.floor(t * 6)) % 3], -46 + i * 46, -2); } x.fillStyle = '#e3c77a'; x.fillRect(-60, -64, 120, 18); x.font = `16px ${HAND}`; x.fillStyle = INK; x.fillText('"INVESTING"', 0, -55); x.strokeStyle = INK; x.beginPath(); x.moveTo(80, -20); x.lineTo(110, -50); x.stroke(); x.restore(); };
      return { scene: s.S, cam: s.C, post, tags: [T('INVESTING ≠ GAMBLING', 900, 90, pop(t, ph(L, "it isn't")), GT), T('SLOW. BORING. ON PURPOSE.', 900, 150, pop(t, ph(L, 'slow, boring')), YT)] }; } },
];
/* ============ ACT 3: PLANKS ONE AND TWO ============ */
ACTS[3] = [
  { id: 'S16', card: '3. Plank One: The Cushion' },
  { id: 'S17', f(t, d, L) { const s = getSet('bridge10'); hideCards(s, ['wren', 'dime']); BRG(s, t, { wind: 0.8 }); const w = lineAt(L, 'WREN').t0;
      const x = walkX(s, 'wren', -4.4, -2.35, 0.05, t, 0.3, 3.2, { view: 'q', dir: 1, expr: t > w ? 'happy' : 'neutral', arms: [null, null], look: [0.5, -0.3] }, L, 'WREN', 1.6, 0); s['c_wren'].mesh.position.y = onBridge(s, x) - 0.05; s['c_wren'].shadow.position.y = onBridge(s, x) - 0.04;
      cn(s, 'dime', x + 0.28, 0.12, { metal: 'silver', scuff: true, expr: 'neutral', arms: [null, null], noShadow: true }, t, L, 'DIME', 0.32, onBridge(s, x) + 1.12);
      cl(s, k01(t, 0, d), [[-5.6, 1.8, 3.4], [-2.6, 0.6, 0]], [[-3.6, 1.4, 2.5], [-2.3, 0.6, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('3-6 MONTHS OF REAL COSTS', 900, 80, span(t, ph(L, 'three to six'), w), YT), T('$2,400 × 3 = $7,200', 900, 80, span(t, lineAt(L, 'DIME').t0, d), GT), T('× 6 = $14,400', 900, 140, span(t, lineAt(L, 'DIME').t0 + 0.8, d), GT)] }; } },
  { id: 'S18', f(t, d, L) { const s = getSet('street10'); hideCards(s, ['runner']); const sk = k01(t, 0, 1.5); ST(s, t, { storm: sk, shops: i => ({ lit: 0.3, sale: i < 6 }) });
      const z = lerp(-4, 2.5, k01(t, 1.5, d - 1)); cn(s, 'runner', -1.2 + Math.sin(t * 3) * 0.3, z, { metal: 'copper', walk: t * 3.2, expr: 'scared', arms: ['up', 'hold'], dir: 1 }, t, null, null, 0.65);
      cl(s, k01(t, 0, d), [[0.5, 1.4, 4.5], [-1, 0.8, -4]], [[0.8, 1.3, 5.2], [-1, 0.6, 0]]);
      const e = ph(L, 'the car dies'); return { scene: s.S, cam: s.C, post: flash(t, 3.0), tags: [T('CAR DIES', 300, 90, pop(t, e), RT), T('JOB GOES', 640, 90, pop(t, ph(L, 'the job goes')), RT), T('MARKET DOWN', 980, 90, pop(t, ph(L, 'market is down')), RT), T('= SELLING AT THE BOTTOM', 640, 160, span(t, ph(L, 'at the bottom'), ph(L, 'cushion means')), BT), T('THE CUSHION PICKS THE DAY, NOT LIFE', 640, 160, pop(t, ph(L, 'cushion means')), GT)] }; } },
  { id: 'S19', f(t, d, L) { const s = getSet('waitroom10'); hideCards(s, ['mort', 'wren']); const m = lineAt(L, 'MORT').t0, w = lineAt(L, 'WREN').t0; WR(s, t, { hy: 1, rate: '0.01%' });
      if (t < m) cl(s, k01(t, 0, m), [[-1.6, 1.8, 1.4], [2.6, 1.3, -3.0]], [[0.2, 1.6, 0.8], [3.8, 1.3, -2.6]]); else cl(s, k01(t, m, d), [[0.4, 1.6, -0.6], [-0.4, 1.2, -4.6]], [[0.6, 1.55, -0.2], [0.8, 1.2, -4.0]]);
      sp(s, 'mort', -1.45, s.cz - 0.55, { view: 'front', expr: t > m ? 'sad' : 'neutral', arms: [t > m ? WAVE : null, null] }, t, L, 'MORT', 1.7);
      walkX(s, 'wren', -0.6, 3.6, s.cz + 1.4, t, Math.max(m - 3.5, 1.0), d - 0.8, { view: 'q', dir: t > w ? -1 : 1, expr: 'happy', arms: [HOLD, t > w ? WAVE : null] }, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('HIGH-YIELD SAVINGS: ~4-4.5%', 640, 76, span(t, ph(L, 'high-yield'), ph(L, 'on nine thousand')), GT), T('FDIC INSURED TO $250,000', 640, 140, span(t, ph(L, 'deposit insurance'), m), YT), T('$9,000: ~$390/YR vs ~$0.90', 640, 76, span(t, ph(L, 'on nine thousand'), m + 0.5), GT)] }; } },
  { id: 'S20', card: '4. Plank Two: Two Pockets' },
  { id: 'S21', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'dime']); APT(s, t, { jar2: t > 2 }); const w = lineAt(L, 'WREN').t0;
      if (t < w) cl(s, k01(t, 0, w), [[1.8, 1.6, 1.2], [0.1, 0.9, -1.3]], [[1.3, 1.4, 0.9], [0.3, 0.85, -1.3]]); else cl(s, k01(t, w, d), [[0.5, 1.15, 0.0], [0.05, 0.85, -1.25]], [[0.4, 1.1, -0.1], [0.05, 0.85, -1.25]]);
      sp(s, 'wren', 1.3, -1.35, { view: 'q', dir: -1, expr: t > lineAt(L, 'WREN', 1).t0 ? 'sly' : 'happy', arms: [HOLD, null], look: [-0.6, 0.5] }, t, L, 'WREN', 1.6);
      cn(s, 'dime', 0.42, s.TZ - 0.15, { metal: 'silver', scuff: true, expr: t > lineAt(L, 'WREN', 1).t0 + 0.6 ? 'happy' : 'surprised', hat: t > lineAt(L, 'WREN', 1).t0 + 1.2 ? 'hard' : null, arms: [null, null] }, t, L, 'DIME', 0.3, s.TY);
      return { scene: s.S, cam: s.C, tags: [T('RAINY DAY = THE CUSHION', 360, 80, pop(t, ph(L, 'rainy-day pocket')), BT), T('SOMEDAY = 5+ YEARS AWAY', 920, 80, pop(t, ph(L, 'someday pocket')), GT)] }; } },
  { id: 'S22', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'pip10']); const p = lineAt(L, 'PIP').t0; const rain = t > ph(L, 'look at the rainy');
      APT(s, t, { jar2: 1, ph: rain ? { bank: 'RAINY DAY POCKET', l1: 'CUSHION', amt: '$9,000', col: '#3f9b5f', l2: 'Rent covered: 3.75 months' } : { bank: 'SOMEDAY POCKET', l1: 'TODAY', amt: '-4.1%', col: '#c2372d', l2: 'Index fund' } });
      if (t < p) cl(s, k01(t, 0, p), [[0.55, 1.05, -0.75], [0.45, 0.8, -1.2]], [[0.5, 1.0, -0.85], [0.45, 0.8, -1.2]]); else cl(s, k01(t, p, d), [[1.9, 1.5, 0.9], [0.2, 1.0, -1.3]], [[1.7, 1.45, 0.7], [0.2, 1.0, -1.3]]);
      sp(s, 'wren', 1.3, -1.3, { view: 'q', dir: -1, expr: 'sly', arms: [HOLD, null], look: [-0.5, 0.4] }, t, L, 'WREN', 1.6);
      sp(s, 'pip10', -0.95, -1.45, { view: 'q', dir: 1, expr: 'scared', arms: [UP, null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('A NUMBER, NOT AN EMERGENCY', 640, 76, span(t, ph(L, 'becomes a number'), p), YT)] }; } },
];
/* ============ ACT 4: PLANK THREE ============ */
ACTS[4] = [
  { id: 'S23', card: '5. Plank Three: Start Tiny' },
  { id: 'S24', f(t, d, L) { const s = getSet('bridge10'); hideCards(s, ['wren', 'dime']); BRG(s, t, { wind: 0.9 }); const w = lineAt(L, 'WREN').t0, st = lineAt(L, 'DIME', 1).t0;
      const x = lerp(-1.2, -0.15, E(k01(t, st + 0.4, st + 1.6))); sp(s, 'wren', x, 0.05, { view: 'q', dir: 1, expr: t > st + 1.6 ? 'happy' : 'scared', arms: [t < st ? SHRUG : null, null], look: [0.4, -0.7] }, t, L, 'WREN', 1.6, onBridge(s, x) - 0.05);
      cn(s, 'dime', x + 0.28, 0.12, { metal: 'silver', scuff: true, expr: 'sly', arms: [null, t > st ? 'point' : null], noShadow: true }, t, L, 'DIME', 0.32, onBridge(s, x) + 1.12);
      cl(s, k01(t, 0, d), [[-2.4, 1.5, 2.9], [-0.6, 0.6, 0]], [[-1.4, 1.5, 2.7], [-0.2, 0.6, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('MOST BIG BROKERS: $0 MINIMUM', 640, 76, span(t, ph(L, 'no account minimum'), ph(L, 'first goal')), YT), T('SLICES OF A SHARE FROM A FEW $', 640, 140, span(t, ph(L, 'slice of a share'), w), GT), T('GOAL: GET USED TO IT', 640, 76, span(t, ph(L, 'first goal'), w), BT), T('$50', 900, 150, pop(t, lineAt(L, 'WREN', 1).t0), GT)] }; } },
  { id: 'S25', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'pip10']); APT(s, t, {}); s.rfill.intensity = 2.4; const p = lineAt(L, 'PIP').t0;
      if (t < p) cl(s, k01(t, 0, p), [[3.1, 1.65, 1.7], [1.2, 1.0, -2.0]], [[2.8, 1.5, 1.3], [1.3, 0.95, -1.9]]); else cl(s, k01(t, p, d), [[2.9, 1.45, 1.5], [1.4, 0.8, -1.8]], [[3.0, 1.45, 1.4], [1.4, 0.8, -1.8]]);
      sp(s, 'wren', 2.0, -1.45, { view: 'front', expr: t > lineAt(L, 'WREN').t0 ? 'sly' : 'sleepy', arms: [null, null] }, t, L, 'WREN', 1.6, -0.25);
      sp(s, 'pip10', 1.25, -1.6, { view: 'q', dir: 1, expr: 'surprised', arms: [null, null] }, t, L, 'PIP', 1.1);
      const amt = t > ph(L, 'three hundred') ? '$300' : t > ph(L, 'a hundred') ? '$100' : '$50'; const hops = [];
      for (let i = 0; i < 4; i++) { const t0 = 2 + i * 2.6; if (t > t0 && t < t0 + 1.4) { const k = k01(t, t0, t0 + 1.4); hops.push(T('PAYDAY → +' + amt, lerp(220, 1000, k), 250 - Math.sin(k * Math.PI) * 120, 1, GT)); } }
      return { scene: s.S, cam: s.C, tags: [T('AUTOMATIC, EVERY PAYDAY', 640, 76, span(t, ph(L, 'automatic'), p), YT), ...hops, T('$50 → $100 → $300 A MONTH', 640, 140, pop(t, ph(L, 'three hundred')), GT)] }; } },
  { id: 'S26', f(t, d, L) { const s = getSet('breakroom10'); hideCards(s, ['rico', 'wren']); const r2 = lineAt(L, 'RICO', 1).t0; BR(s, t, { ph: i => i === 1 ? { t: 'DOGCOIN', up: t > lineAt(L, 'WREN').t0 ? -1 : 1, v: t > lineAt(L, 'WREN').t0 ? '-71%' : '+900%', seed: 2 } : { up: 1, seed: i } });
      cl(s, k01(t, 0, d), [[-0.1, 1.5, 2.4], [-0.1, 1.0, -1.5]], [[0.2, 1.55, 2.7], [0.0, 1.0, -1.4]]);
      sp(s, 'rico', -0.8, -1.05, { view: 'q', dir: 1, expr: t > r2 ? 'scared' : 'happy', arms: [POINT, null] }, t, L, 'RICO', 1.7);
      sp(s, 'wren', 0.85, -0.95, { view: 'q', dir: -1, expr: t > lineAt(L, 'WREN', 1).t0 ? 'sly' : 'neutral', arms: [HOLD, null] }, t, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('LAST WEEK: 10×', 640, 76, span(t, 0.8, lineAt(L, 'WREN').t0 + 0.5), GT), T('THIS WEEK: "RESTING"', 640, 76, pop(t, r2 + 0.4), RT)] }; } },
  { id: 'S27', f(t, d, L) { const s = getSet('bridge10'); hideCards(s, ['gus10']); BRG(s, t, { wind: 0.6, door: 1 });
      cl(s, k01(t, 0, d), [[-1.5, 1.8, 6.3], [-3.9, 1.0, 1.5]], [[-2.1, 1.6, 5.5], [-3.8, 1.0, 1.6]]);
      sp(s, 'gus10', -3.1, 2.0, { view: 'q', dir: -1, expr: 'sly', arms: [UP, null] }, t, L, '', 1.7, 0.12);
      return { scene: s.S, cam: s.C, tags: [T('CARD DEBT ~22% APR: PAY IT FIRST', 640, 76, span(t, ph(L, 'twenty-plus'), ph(L, 'full order')), RT), T('THE FULL ORDER: ITS OWN VIDEO', 640, 76, pop(t, ph(L, 'full order')), YT)] }; } },
];
/* ============ ACT 5: PLANK FOUR ============ */
ACTS[5] = [
  { id: 'S28', card: '6. Plank Four: Buy the Whole Street' },
  { id: 'S29', f(t, d, L) { const s = getSet('street10'); hideCards(s, ['wren', 'gus10']); ST(s, t, { trucks: false, }); workers(s, t, 4); const g = lineAt(L, 'GUS').t0;
      cl(s, k01(t, 0, d), [[0.0, 2.6, 4.6], [0.4, 1.0, -1.5]], [[0.4, 1.8, 3.8], [0.6, 1.0, -1.0]]);
      const spin = t < g ? Math.sin(t * 4) : 1; sp(s, 'wren', 0, -1.0, { view: spin > 0 ? 'q' : 'front', dir: spin > 0 ? 1 : -1, expr: t > g ? 'surprised' : 'scared', arms: [t < g ? UP : null, t < g ? UP : null] }, t, L, 'WREN', 1.6, 0);
      sp(s, 'gus10', 1.6, -0.4, { view: 'q', dir: -1, expr: 'happy', arms: [t > g ? WAVE : null, null] }, t, L, 'GUS', 1.7, 0.12);
      const tp = []; if (t < g + 1) for (let i = 0; i < 5; i++) tp.push(T('TOP PICK!', [180, 420, 860, 1100, 640][i], [140, 240, 200, 120, 90][i], pop(t, 0.6 + i * 0.7) * (1 - k01(t, g, g + 0.6)), [RT, YT, GT, BT, RT][i]));
      return { scene: s.S, cam: s.C, tags: tp.concat([T("YOU DON'T HAVE TO PICK", 640, 90, pop(t, g + 1.2), GT)]) }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('street10'); const a = ph(L, "that's an index fund"), b = ph(L, 'cheapest of them'); const un = k01(t, 0.5, a + 3); ST(s, t, { trucks: false,  deed: 1, shops: i => ({ yours: i < Math.floor(un * 20) }) });
      s.deed.scale.set(1, Math.max(0.01, un), 1); s.deed.position.z = 1.5 - 15 * un; hideCards(s, ['wren', 'gus10']); workers(s, t, 4);
      if (t < b) cl(s, k01(t, 0, b), [[0.4, 2.0, 4.8], [0.3, 0.6, -1]], [[0, 4.8, 6.0], [0, 0, -14]]); else cl(s, k01(t, b, d), [[0.3, 1.65, 4.6], [0.3, 1.0, 0.6]], [[0.15, 1.6, 4.3], [0.3, 1.0, 0.6]]);
      sp(s, 'wren', -0.35, 0.6, { view: 'q', dir: 1, expr: 'surprised', arms: [HOLD, HOLD], look: [0.3, 0.6] }, t, L, '', 1.6, 0);
      sp(s, 'gus10', 1.0, 0.9, { view: 'q', dir: -1, expr: 'happy', arms: [POINT, null] }, t, L, '', 1.7, 0);
      return { scene: s.S, cam: s.C, tags: [T('INDEX FUND = A SLICE OF THE WHOLE STREET', 640, 76, span(t, a, ph(L, 'five hundred of')), YT), T('S&P 500 FUND ≈ 500 BIG US COMPANIES', 640, 76, span(t, ph(L, 'five hundred of'), ph(L, 'total market')), GT), T('TOTAL MARKET FUND: THOUSANDS', 640, 76, span(t, ph(L, 'total market'), b), GT), T('FEES: ~3¢ PER $100 A YEAR', 640, 76, pop(t, b + 0.5), YT)] }; } },
  { id: 'S31', f(t, d, L) { const s = getSet('street10'); hideCards(s, ['mgrA', 'mgrB', 'mgrC']); ST(s, t, { trucks: false, finish: 1, turtle: 1 }); const k = k01(t, 0.5, d - 1.5);
      const tz = lerp(4.5, -6.6, k); s.turtle.position.set(-0.7, 0.0, tz); s.turtle.userData.legs.forEach((l, i) => l.position.y = Math.max(0, Math.sin(t * 6 + i * 1.6)) * 0.04);
      ['mgrA', 'mgrB', 'mgrC'].forEach((m, i) => { const ph2 = t * 1.3 + i * 2.1; const zz = tz + 1.0 + Math.sin(ph2) * 0.8 + i * 0.6; const xx = 0.7 + i * 0.6 + Math.cos(ph2 * 1.3) * 0.5; card(s, m, 1.7).set(xx, zz, slidePose(t + i, Math.cos(ph2) > 0 ? -1 : 1, 2.4, 1.7), s.C, 0); });
      { const cp = [[-1.3, 2.0, tz - 3.0], [0.4, 0.5, tz + 1.4]]; cl(s, 0, cp, cp); }
      return { scene: s.S, cam: s.C, tags: [T('~9 IN 10 PRO-PICKED FUNDS TRAIL THE INDEX (15 YRS)', 640, 76, pop(t, ph(L, 'nine in ten')), YT), T('SOURCE: S&P SPIVA SCORECARD', 640, 130, pop(t, ph(L, 'nine in ten') + 0.5), BT)] }; } },
  { id: 'S32', f(t, d, L) { const s = getSet('porch10'); hideCards(s, ['abe', 'dot10']); POR(s, t, { can: 1, letter: 1 }); const a = lineAt(L, 'ABE').t0;
      if (t < a) cl(s, k01(t, 0, a), [[3.4, 1.6, 0.4], [2.0, 0.95, -2.5]], [[2.6, 1.3, -1.4], [2.0, 0.95, -2.5]]); else cl(s, k01(t, a, d), [[0.6, 1.6, 1.4], [1.4, 1.0, -2.5]], [[0.8, 1.55, 1.2], [1.4, 1.0, -2.5]]);
      sp(s, 'abe', 1.3, s.dz + 0.1, { view: 'q', dir: 1, expr: t > a ? 'surprised' : 'sleepy', arms: [HOLD, HOLD], look: [0.5, 0.4] }, t, L, 'ABE', 1.5, s.DY);
      sp(s, 'dot10', 0.2, s.dz + 0.4, { view: 'q', dir: 1, expr: 'happy', arms: [null, null] }, t, L, 'DOT', 1.4, s.DY);
      return { scene: s.S, cam: s.C, tags: [T("BUFFETT'S 2013 SHAREHOLDER LETTER", 640, 76, span(t, ph(L, 'letter to shareholders'), a), YT), T('"90%... very low-cost S&P 500 index fund"', 640, 140, span(t, ph(L, 'ninety percent'), a + 1), BT)] }; } },
];
/* ============ ACT 6: PLANK FIVE ============ */
ACTS[6] = [
  { id: 'S33', card: '7. Plank Five: Keep Walking' },
  { id: 'S34', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'dime']); const a = ph(L, 'say wren invests'), b = ph(L, 'only put in'); APT(s, t, { fb: { mode: 'towers', k: Math.round(k01(t, a + 1, b) * 25) / 25 } }); const dm = lineAt(L, 'DIME').t0;
      if (t < dm) cl(s, k01(t, 0, dm), [[-1.2, 1.5, 0.4], [-2.6, 1.15, -2.2]], [[-1.5, 1.45, 0.0], [-2.55, 1.15, -2.2]]); else cl(s, k01(t, dm, d), [[-1.0, 1.45, -0.1], [-2.2, 1.0, -2.0]], [[-0.9, 1.4, 0.0], [-2.2, 1.0, -2.0]]);
      sp(s, 'wren', -3.1, -1.85, { view: 'q', dir: -1, expr: t > b ? 'happy' : 'neutral', arms: [POINT, null], look: [-0.8, 0.2] }, t, L, 'WREN', 1.6);
      cn(s, 'dime', -1.55, -1.75, { metal: 'silver', scuff: true, hat: 'hard', expr: t > dm ? 'surprised' : 'happy', arms: [null, null] }, t, L, 'DIME', 0.45, 0);
      return { scene: s.S, cam: s.C, tags: [T('$90,000 PUT IN', 260, 110, pop(t, b), YT), T('~$195,000 = MONEY HER MONEY MADE', 640, 70, pop(t, ph(L, 'other hundred')), GT)] }; } },
  { id: 'S35', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren']); APT(s, t, { fb: { mode: 'towers', k: 1, late: Math.round(k01(t, ph(L, 'waits ten years'), ph(L, 'hundred and four') + 0.5) * 15) / 15 } });
      cl(s, k01(t, 0, d), [[-1.5, 1.45, 0.0], [-2.55, 1.15, -2.2]], [[-1.2, 1.5, 0.4], [-2.6, 1.15, -2.2]]);
      sp(s, 'wren', -3.1, -1.85, { view: 'q', dir: -1, expr: t > ph(L, 'nearly two thirds') ? 'surprised' : 'neutral', arms: [CHIN, null], look: [-0.8, 0.2] }, t, L, '', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('WAITING 1/3 OF THE TIME COST ~2/3 OF THE MONEY', 640, 70, pop(t, ph(L, 'nearly two thirds')), RT)] }; } },
  { id: 'S36', f(t, d, L) { const s = getSet('sale10'); hideCards(s, ['wren']); ST(s, t, { trucks: false,  storm: k01(t, 0, 2), shops: i => ({ lit: 0.4, sale: true }) }); workers(s, t, 6, { run: 1 });
      const z = walkZ(s, 'wren', 0.3, -4.0, 0.6, t, 2.0, d - 3, { view: 'front', expr: 'sly', arms: [HOLD, HOLD] }, L, null, 1.6);
      cl(s, k01(t, 0, d), [[0.4, 1.9, 6.5], [0, 1.0, -4]], [[0.7, 1.7, 3.4], [0, 1.0, -6]]);
      return { scene: s.S, cam: s.C, post: flash(t, 2.6), tags: [T('2007-09: -57%', 360, 80, pop(t, ph(L, 'more than half')), RT), T('2020: -34% IN ~1 MONTH', 920, 80, pop(t, ph(L, 'twenty twenty')), RT)] }; } },
  { id: 'S37', f(t, d, L) { const s = getSet('sale10'); hideCards(s, ['wren', 'rico']); ST(s, t, { trucks: false,  storm: 0.8, shops: i => ({ lit: 0.4, sale: true }) });
      const m1 = ph(L, 'month one'), m2 = ph(L, 'month two'), m3 = ph(L, 'month three'), r = lineAt(L, 'RICO').t0; const sh = (t > m1 ? 3 : 0) + (t > m2 ? 6 : 0) + (t > m3 ? 3 : 0);
      cl(s, k01(t, 0, d), [[1.6, 1.6, 4.4], [-0.6, 1.2, -1.2]], [[1.3, 1.6, 4.0], [-0.3, 1.2, -1.2]]);
      sp(s, 'wren', 0.6, 0.0, { view: 'q', dir: -1, expr: t > r ? 'sly' : 'happy', arms: [HOLD, HOLD] }, t, L, 'WREN', 1.6, 0);
      if (t > r - 1.5) sp(s, 'rico', 1.9, 0.4, { view: 'q', dir: -1, expr: 'surprised', arms: [UP, null] }, t, L, 'RICO', 1.7, 0);
      const tagP = (i, a, lbl, sub, opt) => T(lbl + '  ' + sub, 300, 110 + i * 70, pop(t, a), opt);
      return { scene: s.S, cam: s.C, tags: [tagP(0, m1, 'MONTH 1: $100', '→ 3 SHARES', YT), tagP(1, m2, 'MONTH 2: $50', '→ 6 SHARES', RT), tagP(2, m3, 'MONTH 3: $100', '→ 3 SHARES', YT), T('PUT IN $900 → 12 SHARES = $1,200', 640, 360, pop(t, ph(L, 'twelve shares')), GT), T('SHARES: ' + sh, 1060, 80, sh ? 1 : 0, BT)] }; } },
  { id: 'S38', f(t, d, L) { const s = getSet('bridge10'); hideCards(s, ['wren']); BRG(s, t, { wind: 2.2, lit: k01(t, 1, d - 1) });
      const x = lerp(1.5, 2.8, k01(t, 0.5, d - 0.5)); sp(s, 'wren', x, 0.05, { anim: 'walk', view: 'side', dir: 1, expr: 'neutral' }, t, L, '', 1.6, onBridge(s, x) - 0.05);
      cl(s, k01(t, 0, d), [[-0.6, 1.4, 3.6], [1.8, 0.6, 0]], [[0.8, 1.3, 3.2], [3.0, 0.8, -1]]); shake(s, t, 2.0, 0.02);
      return { scene: s.S, cam: s.C, tags: [T('AFTER 2009: ~4 YEARS BACK TO THE OLD HIGH', 640, 76, span(t, ph(L, 'some recoveries'), ph(L, "that's exactly")), YT), T('CUSHION + 5-YEAR RULE = KEEP WALKING', 640, 76, pop(t, ph(L, "that's exactly")), GT)] }; } },
];
/* ============ ACT 7: YOUR WALLET + ENDING ============ */
ACTS[7] = [
  { id: 'S39', card: 'Your Wallet' },
  { id: 'S40', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['stromi']); const marks = ['one.', 'two.', 'three.', 'four.', 'five.'].map(w => ph(L, w, 1e9)); const n = marks.filter(m => t > m).length;
      APT(s, t, { note: n, fb: { mode: 'plan', n } });
      if (t < marks[0]) cl(s, k01(t, 0, marks[0]), [[1.8, 1.7, 1.2], [0.1, 0.9, -1.2]], [[0.9, 1.4, 0.0], [0.15, 0.8, -1.05]]); else cl(s, k01(t, marks[0], d), [[0.65, 1.35, -0.1], [0.2, 0.8, -1.05]], [[0.55, 1.3, -0.2], [0.2, 0.8, -1.05]]);
      const so = pop(t, 1.2); card(s, 'stromi', 0.28).set(s.TX + 0.42, s.TZ + 0.2, pose({ view: 'front', expr: 'happy', arms: [n > 0 ? POINT : WAVE, null] }, t), s.C, s.TY - 0.4 + 0.4 * so);
      const lab = ['CUSHION: 3-6 MONTHS', 'HIGH-YIELD, INSURED', 'RAINY DAY / SOMEDAY', 'START TINY, AUTOMATIC', 'WHOLE STREET, KEEP WALKING'];
      return { scene: s.S, cam: s.C, tags: [T('NOT PERSONAL ADVICE', 640, 70, span(t, 0.5, marks[0]), BT), ...lab.map((s2, i) => T((i + 1) + '. ' + s2, 230, 92 + i * 50, pop(t, marks[i]), { size: 28, bg: '#efe4cf' }))] }; } },
  { id: 'S41', f(t, d, L) { const s = getSet('bridge10'); hideCards(s, ['dime']); BRG(s, t, { wind: 0.4, press: 1 }); const dt = lineAt(L, 'DOT').t0;
      cn(s, 'dime', 4.1, 0.4, { metal: 'silver', scuff: true, hat: 'hard', expr: 'happy', arms: ['wave', t > dt ? 'point' : null], dir: -1 }, t, L, 'DIME', 0.6, 0.12);
      if (t < dt) cl(s, k01(t, 0, dt), [[5.6, 1.2, 2.6], [3.6, 0.5, 0]], [[5.2, 1.1, 2.2], [3.8, 0.5, 0]]); else cl(s, k01(t, dt, d), [[-2.2, 2.0, 4.6], [-5.8, 1.5, -1.6]], [[-2.6, 1.9, 4.0], [-5.8, 1.5, -1.7]]);
      return { scene: s.S, cam: s.C, tags: [T("THE BRIDGE HAS A CUSHION", 640, 640, pop(t, lineAt(L, 'DIME', 1).t0 + 0.6), GT)] }; } },
  { id: 'S42', f(t, d, L) { const s = getSet('apartment10'); hideCards(s, ['wren', 'cousin', 'pip10']); const w = lineAt(L, 'WREN').t0; sp(s, 'pip10', -0.7, -1.45, { view: 'q', dir: 1, expr: 'sly', arms: [null, null] }, t, L, 'PIP', 1.1); APT(s, t, { buzz: t > ph(L, 'first thank you') && t < w, ph: { amt: '$0.08', l2: "June's first savings" } });
      if (t < w) cl(s, k01(t, 0, w), [[2.3, 1.85, 2.7], [0.2, 0.9, -1.2]], [[1.5, 1.6, 1.95], [0.5, 0.9, -1.3]]); else cl(s, k01(t, w, d), [[1.4, 1.6, 1.9], [0.5, 0.9, -1.3]], [[1.25, 1.55, 1.75], [0.5, 0.9, -1.3]]);
      sp(s, 'cousin', -0.35, -0.7, { view: 'q', dir: -1, expr: t > w ? 'surprised' : 'happy', arms: [HOLD, null], look: [-0.5, 0.5] }, t, L, '', 1.15);
      walkX(s, 'wren', 2.4, 1.35, -1.6, t, 0.8, 3.5, { view: 'q', dir: -1, expr: t > lineAt(L, 'WREN', 1).t0 ? 'happy' : 'sly', arms: [t > lineAt(L, 'WREN', 1).t0 ? POINT : null, null] }, L, 'WREN', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('INTEREST PAID: $0.08', 640, 76, span(t, ph(L, 'first thank you') + 0.5, d - 0.4), RT)] }; } },
  { id: 'S43', card: 'General education, not financial advice', sub: "Investing has risk. Past returns don't promise future ones.", dur: 4.5 },
  { id: 'S44', dur: 6.0, noBlurOut: true, f(t, d, L) { const s = getSet('bridge10'); hideCards(s); BRG(s, t, { wind: 0.3 }); cl(s, k01(t, 0, d), [[0.2, 2.2, 9.0], [0.3, 0.3, -2]], [[0.2, 2.6, 10.5], [0.3, 0.4, -2]]); return { scene: s.S, cam: s.C, post: fadeOut(t, d, 1.5), tags: [] }; } },
];
