/* Finance with Stromi 08 (Everybody's All In): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig, post}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkX = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; c.set(x, z, mv ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0) * 1.3, h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const walkXZ = (s, key, a, b, t, t0, t1, o, L, who, h, y) => { const k = E(k01(t, t0, t1)); const x = lerp(a[0], b[0], k), z = lerp(a[1], b[1], k); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; const dist = Math.hypot(b[0] - a[0], b[1] - a[1]); c.set(x, z, mv ? slidePose(t, Math.sign(b[0] - a[0]) || 1, dist / (t1 - t0) * 1.3, h || 1.7) : pose(o, t, L, who), s.C, y); return [x, z]; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03, size: 34 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(clamp(k, 0, 1)), a[0], b[0], a[1], b[1]);
const POINT = { h: [0.75, 0.95], hand: 'open' }, UP = { h: [0.35, 1.25], hand: 'open' }, HOLD = { h: [0.4, 0.55], hand: 'fist' }, CHIN = { h: [0.25, 1.05], hand: 'fist' }, CHEER = { h: [0.45, 1.45], hand: 'fist' }, WAVE = { h: [0.55, 1.35], hand: 'wave' };
const ex = (t, L, who, n, a, b) => (t > lineAt(L, who, n).t0 ? a : b);
const fadeOut = (t, d, a) => x => { const f = k01(t, d - a, d); if (f > 0) { x.save(); x.globalAlpha = f; x.fillStyle = '#060504'; x.fillRect(0, 0, W, H); x.restore(); } };
/* ---------- diner helpers ---------- */
const CZ8 = -4.25, CUST = -2.95, BEH = -4.95; // customers' z, behind-counter z
const DIN = (s, t, o) => { o = o || {}; const tk = o.tick || { l1: 'MILLBROOK MKT', l2: 'S&P 500  UP', l3: 'OPEN' }; const key = JSON.stringify(tk) + Math.ceil((o.scr || 0) * 20);
  if (s._tk !== key) { s.tick.userData.draw(Object.assign({}, tk, { scr: o.scr || 0 })); s._tk = key; }
  s.bell.rotation.z = (o.ring || 0) * Math.sin(t * 22) * 0.35; s.bell.rotation.x = (o.ring || 0) * Math.sin(t * 17) * 0.1;
  s.cigar.userData.lid.rotation.x = -1.9 * (o.cigar || 0); s.napkins.forEach((n, i) => n.visible = (o.napkins || 0) > i); s.suitcase.visible = !!o.suit; s.doorPiv.rotation.y = -Math.PI / 2 + (o.door || 0) * 1.2;
  const red = !!o.red; if (s._red !== red) { s.phones.forEach(p => p.userData.sc.userData.draw({ red })); s._red = red; } s.clock.userData.set(o.hr || 7, o.mn || 15); };
const clack = (t, t0) => t < t0 ? 0 : 1 - k01(t, t0, t0 + 1.1); // scramble amount while the board flips
const ringAmt = (t, t0, d) => (t > t0 && t < t0 + (d || 2.2)) ? 1 - (t - t0) / (d || 2.2) : 0;
const WIDE = s => [[0, 1.85, 1.6], [0, 1.6, -5.5]];
const regulars = (s, t, L, o) => { o = o || {};
  if (o.hank !== false) sp(s, 'hank', -1.35, CUST, Object.assign({ view: 'q', dir: 1, seed: 1 }, o.h || {}), t, L, 'HANK', 1.75);
  if (o.jules !== false) sp(s, 'jules', 0.45, CUST, Object.assign({ view: 'q', dir: -1, seed: 2 }, o.j || {}), t, L, 'JULES', 1.7);
  if (o.rosa !== false) sp(s, 'rosa', 2.55, BEH, Object.assign({ view: 'front', seed: 3 }, o.r || {}), t, L, 'ROSA', 1.6, 0.15);
  if (o.gus) sp(s, 'gus8', 4.6, BEH - 0.3, Object.assign({ view: 'q', dir: -1, seed: 4 }, o.g || {}), t, L, 'GUS', 1.75); };

const ACTS = {};
/* ======================= ACT 0: COLD OPEN ======================= */
ACTS[0] = [
  { id: 'E01', noBlurIn: true, f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['hank', 'jules', 'rosa']); const rec = ph(L, 'when the stock market hits'), hk = lineAt(L, 'HANK').t0;
      const tk = t < rec + 1.5 ? { l1: 'MILLBROOK MKT', l2: 'S&P 500  UP', l3: '7:15 AM' } : { l1: 'RECORD HIGH', l2: 'S&P 500  UP', l3: 'DING DING' }; DIN(s, t, { tick: tk, scr: clack(t, rec + 1.5), ring: Math.max(ringAmt(t, ph(L, 'the bell rings'), 2), ringAmt(t, hk - 1.6, 2.5)), hr: 7, mn: 15 });
      if (t < rec) cl(s, k01(t, 0, rec), [[-5.6, 1.6, 0.8], [-3.5, 1.4, -6]], [[-1.0, 1.75, 1.0], [0, 1.9, -6]]); else if (t < hk) cl(s, k01(t, rec, hk), [[0, 1.9, -1.6], [0, 2.7, -9]], [[0.6, 2.0, -2.4], [0.8, 2.75, -9]]); else cl(s, k01(t, hk, d), WIDE(s)[0] && [[-0.4, 1.7, 1.0], [0, 1.4, -5]], [[0.2, 1.6, 0.4], [0.3, 1.35, -5]]);
      const cheer = t > hk - 1.6; regulars(s, t, L, { h: { expr: cheer ? 'happy' : 'neutral', arms: [null, cheer ? CHEER : null] }, j: { expr: cheer ? 'laugh' : 'happy', arms: [cheer ? CHEER : null, null] }, r: { expr: t > lineAt(L, 'ROSA').t0 ? 'sly' : 'neutral', arms: [HOLD, null] } });
      return { scene: s.S, cam: s.C, tags: [T('MILLBROOK · 7:15 AM', 240, 80, pop(t, 0.8), BT), T('RECORD = DING', 1040, 80, pop(t, ph(L, 'the bell rings')), YT)] }; } },
  { id: 'E02', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['hank', 'jules', 'rosa', 'gus8']); DIN(s, t, { tick: { l1: 'RECORD HIGH', l2: 'S&P 500  UP', l3: 'TOP 7 = 1/3' }, hr: 7, mn: 17 }); const g = lineAt(L, 'GUS').t0;
      cl(s, k01(t, 0, g - 0.5), [[-3.8, 1.75, -0.4], [-1.0, 1.2, -4.1]], [[2.0, 1.75, -0.6], [3.8, 1.3, -4.6]]); if (t > g - 0.5) cl(s, k01(t, g - 0.5, d), [[3.2, 1.75, -0.6], [4.4, 1.55, -5.2]], [[3.4, 1.75, -0.9], [4.4, 1.55, -5.2]]);
      regulars(s, t, L, { h: { expr: 'happy', look: [0, 0.6] }, j: { expr: 'happy', look: [0, 0.6] }, r: { expr: 'neutral' } }); walkX(s, 'gus8', 6.6, 4.6, BEH - 0.3, t, 4, 7.5, { view: 'q', dir: -1, expr: t > g ? 'sly' : 'happy', arms: [null, t > g ? UP : null] }, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('7 COMPANIES ≈ 1/3 OF THE S&P 500', 640, 80, pop(t, ph(L, 'seven companies')), YT), T('PRICIEST SINCE THE DOT-COM TOP', 640, 132, pop(t, ph(L, 'only been this pricey')), RT)] }; } },
  { id: 'E03', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['rosa', 'hank', 'jules']); const tilt = ph(L, 'and that number'); const r = lineAt(L, 'ROSA').t0;
      DIN(s, t, { tick: t < tilt + 0.6 ? { l1: 'RECORD HIGH', l2: 'S&P 500  UP', l3: '' } : { l1: '34%', l2: 'OF ALL WE OWN', l3: 'IS IN STOCKS' }, scr: clack(t, tilt + 0.6), cigar: E(k01(t, 2.5, 4)), hr: 7, mn: 20, col: '#ff5a4a' });
      if (t < tilt) cl(s, k01(t, 0, tilt), [[2.2, 1.55, -2.6], [2.5, 1.2, -4.6]], [[2.4, 1.5, -3.1], [2.5, 1.15, -4.6]]); else if (t < r) cl(s, k01(t, tilt, tilt + 2.5), [[2.4, 1.5, -3.1], [2.5, 1.15, -4.6]], [[0.6, 2.1, -4.0], [0, 2.75, -9]]); else cl(s, k01(t, r, d), [[1.6, 1.55, -2.0], [2.5, 1.35, -4.9]], [[1.9, 1.5, -2.5], [2.5, 1.35, -4.9]]);
      regulars(s, t, L, { r: { expr: t > r ? 'sly' : 'neutral', look: [0, 0.7], arms: [HOLD, null] }, h: { expr: 'happy', look: [0, 0.6] }, j: { expr: 'happy', look: [0, 0.6] } });
      return { scene: s.S, cam: s.C, tags: [T('THE ONLY ONE NOT ON A PHONE', 640, 80, pop(t, 1.0) * (1 - k01(t, tilt - 0.3, tilt)), BT)] }; } },
  { id: 'E04', card: "Everybody's All In", sub: 'Why the next crash hits more than stocks' },
];
/* ======================= ACT 1: THE NUMBER ======================= */
const PIE0 = [22, 6, 12, 2, 16, 42], PIE1 = [20, 5, 11, 2, 34, 28];
ACTS[1] = [
  { id: 'E05', card: '1. The Number Nobody Watches' },
  { id: 'E06', f(t, d, L) { const s = getSet('pie8'); hideCards(s); const g = k01(t, ph(L, 'thirty-four cents'), ph(L, 'thirty-four cents') + 4); const fr = PIE0.map((v, i) => lerp(v, PIE1[i], E(g))); const hl = [0, 0, 0, 0, 0.06 * k01(t, ph(L, 'thirty-four'), ph(L, 'thirty-four') + 1) * (1 - k01(t, ph(L, 'twice as much') - 0.5, ph(L, 'twice as much'))), 0];
      if (ph(L, 'twice as much') < t) { hl[0] = 0.08; hl[4] = 0.08; } s.setPie(fr, hl); s.wedges.forEach(w => w.position.y = s.PY); s.wedges[4].userData.lab.userData.draw({ t: g > 0.5 ? 'STOCKS 34¢' : 'STOCKS' });
      if (t < ph(L, 'according to')) cl(s, k01(t, 0, ph(L, 'according to')), [[2.4, 2.6, s.tz + 2.6], [0, 1.1, s.tz]], [[1.2, 2.3, s.tz + 1.9], [0, 1.1, s.tz]]); else cl(s, k01(t, ph(L, 'according to'), d), [[0.6, 2.2, s.tz + 1.5], [0, 1.1, s.tz - 0.05]], [[-0.8, 2.4, s.tz + 1.6], [0, 1.1, s.tz]]);
      return { scene: s.S, cam: s.C, tags: [T('HOUSES · CARS · CASH · CRYPTO · STOCKS', 640, 80, pop(t, ph(L, 'the houses')), YT), T('34¢ OF EVERY $1 IN STOCKS (FED, RECORD)', 640, 132, pop(t, ph(L, 'thirty-four cents')), GT), T('LONG-RUN AVG ≈ 16¢', 640, 184, pop(t, ph(L, 'long-run average')), BT), T('STOCKS ≈ 2× HOME EQUITY', 640, 236, pop(t, ph(L, 'twice as much')), RT)] }; } },
  { id: 'E07', f(t, d, L) { const s = getSet('pie8'); hideCards(s, ['dot8', 'hank']); const lift = 0.1 * k01(t, 0.8, 2.2); s.setPie(PIE1, [0, 0, 0, 0, lift, 0]); s.wedges.forEach(w => w.position.y = s.PY); s.wedges[4].rotation.y = 0.04 * Math.sin(t * 9) * k01(t, 2, 3) * (1 - k01(t, 3.5, 4.5)); s.wedges[4].userData.lab.userData.draw({ t: 'STOCKS 34¢' });
      s.server.position.set(lerp(-0.6, -0.3, E(k01(t, 0.3, 1.6))), s.PY + 0.115, s.tz + 0.25); s.server.rotation.set(0, 0.6, Math.sin(t * 9) * 0.1 * k01(t, 2, 3));
      cl(s, k01(t, 0, d), [[-0.4, 1.75, s.tz + 4.4], [-0.1, 1.0, s.tz]], [[0.3, 1.7, s.tz + 4.0], [0, 1.0, s.tz]]);
      sp(s, 'dot8', -1.35, s.tz + 0.95, { view: 'q', dir: 1, expr: t < 3 ? 'scared' : 'neutral', arms: [{ h: [0.75, 0.9], hand: 'fist' }, { h: [0.7, 1.0], hand: 'fist' }], lean: 0.12 * Math.sin(t * 9) * k01(t, 2, 3.2) }, t, L, 'DOT', 1.2);
      sp(s, 'hank', 1.45, s.tz + 0.95, { view: 'q', dir: -1, expr: ex(t, L, 'HANK', 1, 'sly', 'happy'), arms: [null, null] }, t, L, 'HANK', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('EXTRA-LARGE STOCK SLICE', 640, 80, pop(t, 0.6), GT)] }; } },
  { id: 'E08', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['rosa', 'jules']); DIN(s, t, { tick: { l1: 'RECORD HIGH', l2: '', l3: '' }, hr: 7, mn: 30 }); const yrs = ['1968', '2000', '2021'].map(y => ph(L, 'in ' + y)); const r = lineAt(L, 'ROSA').t0;
      const fx = [-4.7, -4.0, -3.3]; const at = yrs.filter(v => t > v).length - 1; const tx = at < 0 ? -4.0 : fx[at];
      if (t < r) { const k = k01(t, 0, r); cl(s, k, [[-2.2, 1.95, -5.9], [-4.0, 1.95, -9]], [[-4.6, 1.95, -6.4], [-3.6, 1.95, -9]]); s.C.position.x = lerp(s.C.position.x, tx, 0.35); s.C.lookAt(tx * 0.9 - 0.4, 1.96, -9); }
      else cl(s, k01(t, r, d), [[-3.0, 1.6, -2.2], [-3.4, 1.55, -6.5]], [[-2.6, 1.55, -2.6], [-3.4, 1.55, -6.5]]);
      sp(s, 'rosa', -3.9, -7.6, { view: 'q', dir: -1, expr: 'sad', look: [-0.6, -0.3], arms: [null, t > r ? POINT : null] }, t, L, 'ROSA', 1.6); sp(s, 'jules', -2.5, -6.9, { view: 'q', dir: -1, expr: ex(t, L, 'JULES', 0, 'surprised', 'neutral') }, t, L, 'JULES', 1.7);
      const T1 = [T('1968: 21¢ → STOCKS −1/3 IN ~18 MO', 640, 80, pop(t, yrs[0]), YT), T('2000: 27¢ → NEARLY −1/2 IN 2.5 YRS', 640, 132, pop(t, yrs[1]), YT), T('2021: 29¢ → ABOUT −1/4 IN 9 MO', 640, 184, pop(t, yrs[2]), YT)].map(o => (o.s *= 1 - k01(t, r - 0.4, r), o));
      return { scene: s.S, cam: s.C, tags: T1 }; } },
];
/* ======================= ACT 2: NOBODY DECIDED ======================= */
ACTS[2] = [
  { id: 'E09', card: '2. Nobody Decided This' },
  { id: 'E10', f(t, d, L) { const s = getSet('porch8'); hideCards(s, ['hank']); s.night(false); s.env.visible = false; s.certs.visible = false; s.rule.visible = false; s.winTick.userData.draw({}); s.wl.intensity = 0;
      const g = k01(t, ph(L, 'in 2009'), ph(L, 'until it was') + 2); s.tree.userData.grow(E(g)); const yr = Math.round(lerp(2009, 2026, g)); if (s._yr !== yr) { s.potSign.userData.draw({ y: yr }); s._yr = yr; }
      const h = lineAt(L, 'HANK').t0; if (t < h) cl(s, k01(t, 0, h), [[6.5, 1.0, s.dz + 7.5], [3.2, 1.0, s.dz + 3]], [[7.5, 2.6, s.dz + 9.5], [2.2, 2.2, s.dz + 1.5]]); else cl(s, k01(t, h, d), [[4.8, 1.8, s.dz + 7.5], [1.0, 1.6, s.dz + 1.2]], [[4.4, 1.8, s.dz + 7.0], [1.0, 1.6, s.dz + 1.2]]);
      walkXZ(s, 'hank', [-1.2, s.dz + 4.6], [1.6, s.dz + 4.4], t, 3, 7, { view: 'q', dir: 1, expr: t > h ? 'sad' : 'surprised', look: [0.4, -0.6], arms: [null, t > h ? CHIN : null] }, L, 'HANK', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('STOCKS HOUSEHOLDS OWN', 640, 80, pop(t, ph(L, 'in 2009')), BT), T('2009: ~$9 TRILLION', 300, 132, pop(t, ph(L, 'nine trillion')), YT), T('2026: ~$74 TRILLION', 980, 132, pop(t, ph(L, 'seventy-four trillion')), GT), T('~2× SINCE END-2022', 640, 184, pop(t, ph(L, 'roughly doubled')), RT)] }; } },
  { id: 'E11', f(t, d, L) { const s = getSet('factory8'); hideCards(s, ['pip8', 'gus8']); FAC(s, t); s.rcpt.visible = false; s.form.userData.draw({}); const p = lineAt(L, 'PIP').t0;
      if (t < ph(L, 'twenty years ago')) cl(s, k01(t, 0, ph(L, 'twenty years ago')), [[-5.0, 2.0, 0.2], [-2, 1.0, s.CZ]], [[1.5, 2.6, -0.8], [3.6, 1.6, s.CZ - 0.6]]); else if (t < p) cl(s, k01(t, ph(L, 'twenty years ago'), p), [[1.5, 2.6, -0.8], [3.6, 1.6, s.CZ - 0.6]], [[-0.4, 1.9, 2.0], [0, 1.4, -3]]); else cl(s, k01(t, p, d), [[-1.6, 1.5, 1.9], [-1.6, 1.0, -1.4]], [[-1.4, 1.45, 1.6], [-1.6, 1.0, -1.4]]);
      sp(s, 'pip8', -2.2, -1.1, { view: 'q', dir: 1, expr: ex(t, L, 'PIP', 1, 'sly', 'happy'), arms: [null, t > p ? POINT : null] }, t, L, 'PIP', 1.15); walkX(s, 'gus8', -5.0, -0.9, -0.85, t, p - 4, p - 0.6, { view: 'q', dir: -1, expr: ex(t, L, 'PIP', 1, 'surprised', 'neutral') }, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('~80% OF RETIREMENT CONTRIBUTIONS → STOCKS', 640, 80, pop(t, ph(L, 'eighty percent')), GT), T('BUYS EVERY PAYDAY, ANY PRICE', 640, 132, pop(t, ph(L, 'every single payday')), YT), T('PENSION PROTECTION ACT (2006)', 640, 184, pop(t, ph(L, 'pension protection')), BT), T('6 IN 10 PLANS AUTO-ENROLL (VANGUARD)', 640, 236, pop(t, ph(L, 'six in ten')), RT)].map(o => (o.s *= 1 - k01(t, p - 0.5, p), o)) }; } },
  { id: 'E12', f(t, d, L) { const s = getSet('factory8'); hideCards(s, ['pip8', 'gus8']); FAC(s, t); const st = lineAt(L, 'PIP').t0 + 0.3; const [dx, dzz, DT] = s.desk;
      const sk = k01(t, st, st + 0.5); s.stamp.position.set(dx + 0.35 - 0.4 * E(sk), DT + 0.12 * Math.sin(Math.PI * sk), dzz + 0.1); s.form.userData.draw({ st: t > st + 0.35 }); const ur = E(k01(t, lineAt(L, 'PIP', 1).t0 - 0.5, lineAt(L, 'PIP', 1).t0 + 1.6));
      s.rcpt.visible = ur > 0.01; s.rcpt.scale.y = Math.max(0.01, ur); s.rcpt.position.set(dx + 0.55, DT - 0.7 * ur + 0.0, dzz + 0.42); s.rcpt.scale.y = ur * 0.57; s.rcpt.rotation.set(0, 0, 0);
      if (t < lineAt(L, 'GUS', 1).t0) cl(s, k01(t, 0, lineAt(L, 'GUS', 1).t0), [[-1.4, 1.6, 2.2], [-1.7, 0.95, -1.4]], [[-1.6, 1.5, 1.7], [-1.8, 0.95, -1.4]]); else cl(s, k01(t, lineAt(L, 'GUS', 1).t0, d), [[-1.0, 1.6, 2.6], [-1.4, 1.0, -1.3]], [[-0.8, 1.65, 2.9], [-1.4, 1.0, -1.3]]);
      sp(s, 'pip8', -2.2, -1.1, { view: 'q', dir: 1, expr: ex(t, L, 'PIP', 1, 'sly', 'happy'), arms: [null, t > st && t < st + 0.6 ? { h: [0.6, 0.4], hand: 'fist' } : null] }, t, L, 'PIP', 1.15); sp(s, 'gus8', -0.9, -0.85, { view: 'q', dir: -1, expr: ex(t, L, 'GUS', 1, 'surprised', 'neutral'), arms: [t > lineAt(L, 'GUS', 1).t0 ? UP : null, null] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('ENROLLED (BY DEFAULT)', 640, 80, pop(t, st + 0.3), RT)] }; } },
];
function FAC(s, t) { s.beltT.offset.x = -t * 0.5; s.rollers.forEach(r => r.rotation.y = 0); s.rollers.forEach(r => r.rotation.z = 0); s.rollers.forEach(r => { r.rotation.x = Math.PI / 2; r.rotation.y = -t * 8; });
  const span = s.X1 - s.X0 + 0.6; s.envs.forEach((e, i) => { const x = s.X0 + ((t * 0.55 + i * span / s.envs.length) % span); e.position.set(x, s.CY + 0.002, s.CZ + (i % 2 ? 0.08 : -0.08)); e.visible = x < s.X1 - 0.15; });
  const cyc = (t * 0.55 % (span / s.envs.length)) / (span / s.envs.length); const toH = E(clamp((cyc - 0.15) / 0.35, 0, 1)) * (1 - E(clamp((cyc - 0.6) / 0.35, 0, 1)));
  s.setArm(lerp(1.27, 2.23, toH), lerp(0.75, 0.55, toH), lerp(1.25, 1.1, toH)); s.arm.claw.rotation.z = -(s.arm.up.rotation.z + s.arm.fore.rotation.z) + Math.PI; s.held.visible = cyc > 0.12 && cyc < 0.55; s.clk.userData.set(9, (t * 2) % 60); }
/* ======================= ACT 3: THE LOOP ======================= */
ACTS[3] = [
  { id: 'E13', card: '3. The Loop' },
  { id: 'E14', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['jules', 'rosa']); DIN(s, t, { tick: { l1: 'RECORD HIGH', l2: 'JULES +40%', l3: '' }, hr: 8, mn: 5 }); const j = lineAt(L, 'JULES').t0;
      s.jPhone.userData.sc.userData.draw({ v: t > ph(L, 'worth more on a screen') ? '+40%' : '+12%' });
      if (t < j) cl(s, k01(t, 0, j), [[-3.6, 1.7, -1.6], [-6.4, 0.9, -4.1]], [[-4.4, 1.6, -2.2], [-6.3, 0.95, -4.1]]); else cl(s, k01(t, j, d), [[-2.4, 1.65, -1.0], [-5.4, 1.3, -4.3]], [[-2.7, 1.62, -1.3], [-5.4, 1.3, -4.3]]);
      sp(s, 'jules', -5.75, -4.55, { view: 'q', dir: 1, expr: ex(t, L, 'JULES', 1, 'sad', 'happy'), arms: [null, t > j && t < lineAt(L, 'ROSA').t0 ? UP : null] }, t, L, 'JULES', 1.7);
      walkXZ(s, 'rosa', [-2.6, -3.3], [-4.9, -5.25], t, j - 3.5, j - 0.8, { view: 'q', dir: -1, expr: ex(t, L, 'ROSA', 0, 'sly', 'neutral'), arms: [null, t > lineAt(L, 'ROSA').t0 ? POINT : null] }, L, 'ROSA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('THE WEALTH EFFECT', 640, 80, pop(t, ph(L, 'wealth effect')), YT), T('SAME PAY. BIGGER NUMBER ON A SCREEN.', 640, 132, pop(t, ph(L, "you don't earn")), BT)].map(o => (o.s *= 1 - k01(t, j - 0.4, j), o)) }; } },
  { id: 'E15', f(t, d, L) { const s = getSet('loop8'); hideCards(s, ['hank', 'jules', 'gus8']); const hi = [ph(L, 'rising stocks'), ph(L, 'spending becomes'), ph(L, 'sales become'), ph(L, 'and profits')].filter(v => t > v).length; if (s._hi !== hi) { s.loopB.userData.draw({ hi }); s._hi = hi; }
      const v = 2.1; s.wheel.rotation.z = t * v / s.WR; LOOPRUN(s, t, v); MACH(s, t, 0);
      if (t < ph(L, 'a study')) cl(s, k01(t, 0, ph(L, 'a study')), [[s.WX + 4.5, 2.4, 3.0], [s.WX, 2.4, -6]], [[s.WX + 1.5, 1.6, 0.4], [s.WX, 1.4, -5]]); else cl(s, k01(t, ph(L, 'a study'), d), [[s.WX + 1.8, 1.4, -0.6], [s.WX, 1.2, -5]], [[s.WX + 4.0, 2.8, 2.6], [s.WX + 0.6, 2.2, -6]]);
      return { scene: s.S, cam: s.C, tags: [T('ATLANTA FED: SPENDING NOW >4× AS SENSITIVE TO STOCKS AS IN 1990', 640, 80, pop(t, ph(L, 'atlanta fed')), YT), T('−25% STOCKS → REAL SPENDING BELOW ZERO', 640, 132, pop(t, ph(L, 'twenty-five percent')), RT), T('CONSUMER SPENDING ≈ 2/3 OF GDP', 640, 184, pop(t, ph(L, 'two thirds')), BT)] }; } },
  { id: 'E16', f(t, d, L) { const s = getSet('loop8'); hideCards(s, ['hank', 'jules', 'gus8']); s.loopB.userData.draw({ stop: true, hi: 0 }); s._hi = -1; const stop = 0.3; const w0 = 0; s.wheel.rotation.z = (s._wz || 0) + 0.25 * (1 - Math.exp(-t * 6)); MACH(s, t, 0);
      const tum = k01(t, 0.35, 1.4); const out = [[-1.3, 0.6], [0.0, 0.9], [1.1, 0.7]]; ['hank', 'jules', 'gus8'].forEach((k, i) => { const x0 = s.WX + [-0.4, 0.2, -0.05][i], z0 = s.WZ + [0.55, 0, -0.55][i]; const x = lerp(x0, s.WX + out[i][0] + 0.8, E(tum)), z = lerp(z0, s.WZ + 2.2 + out[i][1] * 0.6, E(tum)), y = lerp(0.42, 0, E(k01(t, 0.6, 1.4))) + 0.25 * Math.sin(Math.PI * tum);
        const P = pose({ view: 'front', expr: i === 0 ? 'scared' : 'sad', seed: i }, t, L, ['HANK', 'JULES', 'GUS'][i]); if (t < 1.6) { P.tilt = (i - 1) * 0.5 * Math.sin(Math.PI * tum); P.squash = 1 - 0.15 * Math.sin(Math.PI * tum); } card(s, k, 1.75).set(x, z, P, s.C, y); });
      cl(s, k01(t, 0, d), [[s.WX + 0.8, 1.5, 1.8], [s.WX + 0.5, 0.9, -3.4]], [[s.WX + 1.0, 1.4, 1.4], [s.WX + 0.5, 0.9, -3.4]]);
      return { scene: s.S, cam: s.C, tags: [T('THE WHEEL ONLY NEEDS TO SLOW DOWN', 640, 80, pop(t, lineAt(L, 'GUS').t0), BT)] }; } },
  { id: 'E17', f(t, d, L) { const s = getSet('townhall8'); hideCards(s, ['bea', 'rosa']); const fall = k01(t, lineAt(L, 'BEA', 1).t0, lineAt(L, 'BEA', 1).t0 + 1.2); const shelf = k01(t, lineAt(L, 'BEA', 2).t0, lineAt(L, 'BEA', 2).t0 + 0.8);
      s.setCG(1 - 0.45 * E(fall) - 0.25 * E(shelf)); s.lib.scale.set(1, 1 - 0.75 * E(shelf), 1); const b = lineAt(L, 'BEA').t0;
      if (t < b) cl(s, k01(t, 0, b), [[0, 2.1, 1.0], [0, 2.4, -8]], [[-1.6, 2.4, -2.0], [0.2, 2.7, -8.5]]); else if (t < lineAt(L, 'BEA', 2).t0) cl(s, k01(t, b, lineAt(L, 'BEA', 2).t0), [[2.0, 2.2, 0.6], [-0.3, 1.5, -6]], [[2.4, 2.2, 0.2], [-0.3, 1.5, -6]]); else cl(s, k01(t, lineAt(L, 'BEA', 2).t0, d), [[3.0, 1.6, -2.6], [4.4, 1.2, -6.5]], [[2.6, 1.7, -2.0], [3.6, 1.2, -6.4]]);
      sp(s, 'bea', -0.45, s.DZ + 0.2, { view: 'q', dir: 1, expr: t > lineAt(L, 'BEA', 1).t0 ? 'sly' : 'happy', arms: [null, t > b && t < lineAt(L, 'ROSA').t0 ? UP : null] }, t, L, 'BEA', 1.6, s.DY);
      sp(s, 'rosa', -1.0, -3.0, { view: 'q', dir: -1, expr: ex(t, L, 'ROSA', 1, 'sly', 'neutral'), arms: [null, t > lineAt(L, 'ROSA').t0 && t < lineAt(L, 'BEA', 1).t0 ? POINT : null] }, t, L, 'ROSA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T("CALIFORNIA'S BUDGET OFFICE (MAY 2026)", 640, 80, pop(t, ph(L, "california's")), BT), T('STOCKS −20%+ ALL YEAR → $15–20B LESS REVENUE', 640, 132, pop(t, ph(L, 'fifteen to twenty')), RT), T('…WITHOUT A RECESSION', 640, 184, pop(t, ph(L, "that's without")), YT)].map(o => (o.s *= 1 - k01(t, b - 0.4, b), o)) }; } },
];
function LOOPRUN(s, t, v) { ['hank', 'jules', 'gus8'].forEach((k, i) => { const P = slidePose(t + i * 0.37, 1, v * 1.3, 1.75); P.dir = 1; P.face.expr = i === 1 ? 'happy' : 'neutral'; card(s, k, 1.75).set(s.WX + [-0.4, 0.2, -0.05][i], s.WZ + [0.55, 0, -0.55][i], P, s.C, 0.42); }); s._wz = s.wheel.rotation.z; }
function MACH(s, t, run) { const ph = run ? (t * 0.55) % 1 : 0.5; const sw = run ? Math.sin(ph * TAU) : 0; s.setShovel(0, sw * 0.95, sw * 0.5); s.sh.scoop.rotation.z = -(sw * 0.95 + sw * 0.5);
  const n = s.bars.length; const shift = run ? Math.floor(t * 0.55) % 6 : 0; s.bars.forEach((b, i) => { const left = i < n / 2 + (run ? shift * (run > 0 ? -2 : 2) : 0); const j = left ? i : n - 1 - i; const bx = left ? s.MX - 1.9 : s.MX + 1.9; b.position.set(bx - 0.5 + (j % 4) * 0.32, 0.6 + Math.floor(j / 12) * 0.085, s.MZ - 0.4 + (Math.floor(j / 4) % 3) * 0.32); b.rotation.y = (j % 3) * 0.05; }); }
/* ======================= ACT 4: THE HERD ======================= */
const OFF = (s, o) => { const k = JSON.stringify(o); if (s._sc !== k || o.live) { s.scr.userData.draw(o); s._sc = k; } };
ACTS[4] = [
  { id: 'E18', card: '4. The Herd' },
  { id: 'E19', f(t, d, L) { const s = getSet('office8'); hideCards(s, ['pell']); s.pop.visible = false; const v = lerp(4.6, 3.9, E(k01(t, ph(L, 'three point nine') - 1.0, ph(L, 'three point nine') + 0.6))); OFF(s, { mode: 'fms', v: Math.round(v * 10) / 10, ai: t > ph(L, 'in july') });
      if (t < ph(L, 'by the bank')) cl(s, k01(t, 0, ph(L, 'by the bank')), [[3.5, 2.0, 1.2], [-6.9, 1.7, -3.6]], [[0.0, 1.8, -1.0], [-6.9, 1.75, -3.6]]); else cl(s, k01(t, ph(L, 'by the bank'), d), [[-0.4, 1.75, 0.2], [-6.9, 1.6, -3.8]], [[-1.4, 1.75, -0.4], [-6.9, 1.75, -3.4]]);
      sp(s, 'pell', -4.6, -1.9, { view: 'q', dir: -1, expr: t > ph(L, 'in july') ? 'sad' : 'neutral', look: [-0.8, -0.1], arms: [null, t > ph(L, 'by the bank') ? POINT : null] }, t, L, null, 1.8);
      return { scene: s.S, cam: s.C, tags: [T('BANK OF AMERICA GLOBAL FUND MANAGER SURVEY', 640, 80, pop(t, ph(L, 'bank of america')), BT)] }; } },
  { id: 'E20', f(t, d, L) { const s = getSet('office8'); hideCards(s, ['pell']); s.pop.visible = false; OFF(s, { mode: 'boss', t, live: true, talk: speaking(L, 'BOSS', t), expr: ex(t, L, 'BOSS', 2, 'happy', 'sly') });
      const P = lineAt(L, 'PELL').t0, B = lineAt(L, 'BOSS').t0; const g = s.dg; s.pig.position.y = 0.0;
      if (t < B) cl(s, k01(t, 0, B), [[-0.9, 1.6, -1.2], [-3.4, 1.5, -2.6]], [[-1.2, 1.6, -1.6], [-3.4, 1.5, -2.6]]); else cl(s, k01(t, B, d), [[1.2, 1.8, 0.6], [-5.6, 1.6, -3.4]], [[0.4, 1.7, 0.0], [-5.6, 1.6, -3.4]]);
      sp(s, 'pell', -3.4, -2.6, { view: 'q', dir: -1, expr: ex(t, L, 'PELL', 2, 'scared', ex(t, L, 'PELL', 1, 'sad', 'neutral')), arms: [HOLD, null] }, t, L, 'PELL', 1.8);
      const pg = s.pig; pg.visible = true; return { scene: s.S, cam: s.C, tags: [T('FIRED IF YOU’RE RIGHT TOO EARLY', 640, 80, pop(t, lineAt(L, 'BOSS', 1).t0 + 0.5), RT)] }; } },
  { id: 'E21', f(t, d, L) { const s = getSet('office8'); hideCards(s, ['pell']); s.pop.visible = false; const qk = k01(t, ph(L, 'he wrote') - 0.2, ph(L, 'he wrote') + 6); OFF(s, { mode: t < ph(L, 'he wrote') - 0.3 ? 'fms' : 'keynes', k: Math.round(qk * 30) / 30, v: 3.9 });
      s.book.position.x = lerp(1.4, 0.4, E(k01(t, 0.4, 2.0))); s.book.rotation.y = lerp(0.6, 0.1, E(k01(t, 0.4, 2.0)));
      if (t < ph(L, 'he wrote')) cl(s, k01(t, 0, ph(L, 'he wrote')), [[1.6, 1.45, -2.3], [1.2, 0.8, -3.3]], [[1.3, 1.25, -2.7], [1.15, 0.82, -3.3]]); else if (t < ph(L, 'if you lose')) cl(s, k01(t, ph(L, 'he wrote'), ph(L, 'if you lose')), [[-2.0, 1.75, -1.4], [-6.9, 1.75, -3.6]], [[-3.6, 1.75, -2.4], [-6.9, 1.75, -3.6]]); else cl(s, k01(t, ph(L, 'if you lose'), d), [[0.4, 1.6, -0.3], [-2.4, 1.4, -2.8]], [[0.0, 1.6, -0.6], [-2.4, 1.4, -2.8]]);
      sp(s, 'pell', -2.4, -2.8, { view: 'q', dir: 1, expr: t > ph(L, "you don't") ? 'sad' : 'neutral', arms: [null, null] }, t, L, null, 1.8);
      return { scene: s.S, cam: s.C, tags: [T('J. M. KEYNES · 1936', 640, 80, pop(t, ph(L, 'john maynard')), BT)] }; } },
  { id: 'E22', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['annika', 'rosa', 'hank']); const a = lineAt(L, 'ANNIKA').t0; const op = k01(t, 0.6, 1.4) * (1 - k01(t, 4.6, 5.6)); DIN(s, t, { tick: { l1: 'RECORD HIGH', l2: 'FOREIGN BUYING', l3: 'RECORD' }, suit: true, door: E(op), hr: 9, mn: 10 });
      const [ax] = walkXZ(s, 'annika', [7.0, -2.2], [1.35, CUST], t, 1.2, 6.5, { view: 'q', dir: -1, expr: ex(t, L, 'ANNIKA', 1, 'surprised', 'happy'), arms: [null, t > a ? POINT : null] }, L, 'ANNIKA', 1.7);
      const az = lerp(-2.2, CUST, E(k01(t, 1.2, 6.5))); s.suitcase.position.set(ax + 0.42, 0, az + 0.15); s.suitcase.rotation.y = -0.3;
      if (t < a) { cl(s, k01(t, 0, a), [[3.0, 1.8, 2.0], [6.5, 1.3, -2.2]], [[0.8, 1.8, 1.3], [1.6, 1.3, -3.6]]); s.C.lookAt(ax, 1.3, lerp(-2.2, CUST, E(k01(t, 1.2, 6.5))) - 0.6); } else cl(s, k01(t, a, d), [[1.2, 1.7, 0.5], [1.9, 1.35, -4.0]], [[1.5, 1.7, 0.2], [1.9, 1.35, -4.0]]);
      sp(s, 'rosa', 2.55, BEH, { view: 'front', expr: ex(t, L, 'ROSA', 0, 'sly', 'neutral'), arms: [HOLD, null] }, t, L, 'ROSA', 1.6, 0.15); sp(s, 'hank', -1.35, CUST, { view: 'q', dir: 1, expr: 'neutral', look: [0.8, 0] }, t, L, 'HANK', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('FOREIGNERS OWN ~$22T OF US STOCKS (~1/5)', 640, 80, pop(t, ph(L, 'twenty-two trillion')), YT), T('US ≈ 2/3 OF THE GLOBAL INDEX', 640, 132, pop(t, ph(L, 'two thirds')), BT), T('Q2 2026: RECORD FOREIGN BUYING', 640, 184, pop(t, ph(L, 'between march')), GT)].map(o => (o.s *= 1 - k01(t, a - 0.4, a), o)) }; } },
];
/* ======================= ACT 5: BORROWED CHIPS ======================= */
const PORCH = (s, night) => { s.night(night); s.winTick.userData.draw({}); s.wl.intensity = 0; s.rule.visible = false; s.tree.userData.grow(1); if (s._yr !== 2026) { s.potSign.userData.draw({ y: 2026 }); s._yr = 2026; } };
ACTS[5] = [
  { id: 'E23', card: '5. Borrowed Chips' },
  { id: 'E24', f(t, d, L) { const s = getSet('porch8'); hideCards(s, ['hank', 'broker']); PORCH(s, true); const hand = ph(L, 'margin debt,'); const take = ph(L, 'borrowing has surged');
      const ek = E(k01(t, hand - 1.2, hand + 0.4)); s.env.visible = t > 2.5; s.env.position.set(lerp(0.5, -1.62, ek), s.TT + 0.3 * Math.sin(Math.PI * ek) * (ek < 1 ? 1 : 0) + (ek < 0.02 ? 0.55 : 0) * 0, s.dz + 0.3); if (ek < 0.02) s.env.position.y = s.DY + 0.95;
      const bx = walkX(s, 'broker', 4.6, 0.7, s.dz + 0.15, t, 0.8, 4.2, { view: 'q', dir: -1, expr: 'happy', arms: [t < hand ? { h: [0.75, 0.55], hand: 'fist' } : null, null] }, L, null, 1.7, s.DY);
      if (t < hand - 1.2) s.env.position.set(bx - 0.28, s.DY + 0.95, s.dz + 0.2);
      const ck = E(k01(t, take - 1.0, take + 0.3)); s.certs.visible = true; const bx2 = t > take + 1.0 ? walkX(s, 'broker', 0.7, 4.8, s.dz + 0.15, t, take + 1.0, take + 4.5, { view: 'q', dir: 1, expr: 'sly' }, L, null, 1.7, s.DY) : bx; if (ck > 0) s.certs.position.set(lerp(2.0, bx2 + 0.28, ck), lerp(s.TT + 0.002, s.DY + 0.9, ck), s.dz + 0.25 - 0.05 * ck); else s.certs.position.set(2.0, s.TT + 0.002, s.dz + 0.25);
      sp(s, 'hank', -1.0, s.dz + 0.1, { view: 'q', dir: 1, expr: ex(t, L, 'N', 1, 'surprised', 'happy') }, t, L, null, 1.75, s.DY);
      if (t < take) cl(s, k01(t, 0, take), [[0.6, 1.6, s.dz + 4.6], [0, 1.3, s.dz]], [[-0.2, 1.55, s.dz + 3.4], [-0.2, 1.3, s.dz]]); else cl(s, k01(t, take, d), [[0.9, 1.6, s.dz + 4.8], [0.6, 1.3, s.dz]], [[1.2, 1.65, s.dz + 5.2], [0.9, 1.3, s.dz]]);
      return { scene: s.S, cam: s.C, tags: [T('MARGIN DEBT: RECORD ~$1.5 TRILLION (JUNE, FINRA)', 640, 80, pop(t, ph(L, 'one and a half')), RT), T('5× THE DOT-COM PEAK', 640, 132, pop(t, ph(L, 'five times')), YT), T('SURGED BEFORE: 2000 · 2008 · 2021', 640, 184, pop(t, ph(L, 'borrowing has surged')), BT)] }; } },
  { id: 'E25', f(t, d, L) { const s = getSet('porch8'); hideCards(s, ['hank']); PORCH(s, true); s.certs.visible = false; s.env.visible = true; s.env.position.set(-1.62, s.TT, s.dz + 0.3);
      const red = t > 1.0; s.winTick.userData.draw({ red }); s.wl.intensity = red ? 3 + Math.sin(t * 3) : 0; const ring = ph(L, 'when the gap') + 1.5, h = lineAt(L, 'HANK').t0;
      const rng = t > ring && t < h - 0.2; s.phone.userData.hs.position.set(0, 0.13 + (rng ? Math.abs(Math.sin(t * 30)) * 0.02 : 0), -0.04); s.phone.rotation.y = 0.4 + (rng ? Math.sin(t * 40) * 0.05 : 0);
      if (t > h - 0.2) { s.phone.userData.hs.visible = false; } else s.phone.userData.hs.visible = true;
      if (t < ph(L, 'when the stock falls')) cl(s, k01(t, 0, ph(L, 'when the stock falls')), [[-2.4, 1.9, s.dz + 2.4], [-2.4, 1.8, s.HZ]], [[-2.2, 1.7, s.dz + 1.9], [-2.4, 1.75, s.HZ]]); else if (t < h) cl(s, k01(t, ph(L, 'when the stock falls'), h), [[-2.2, 1.35, s.dz + 0.95], [-1.85, 0.95, s.dz + 0.2]], [[-2.15, 1.25, s.dz + 0.8], [-1.85, 0.95, s.dz + 0.2]]); else cl(s, k01(t, h, d), [[-0.6, 1.7, s.dz + 2.6], [-1.2, 1.6, s.dz]], [[-0.9, 1.7, s.dz + 2.2], [-1.2, 1.6, s.dz]]);
      const hk = card(s, 'hank', 1.75); const P = pose({ view: 'q', dir: -1, expr: ex(t, L, 'HANK', 2, 'scared', ex(t, L, 'HANK', 1, 'happy', 'neutral')), arms: [null, t > h - 0.2 ? { h: [0.25, 1.15], hand: 'fist' } : null] }, t, L, 'HANK'); hk.set(-1.2, s.dz + 0.05, P, s.C, s.DY);
      return { scene: s.S, cam: s.C, tags: [T('LOAN STAYS · COLLATERAL SHRINKS', 640, 80, pop(t, ph(L, 'the collateral shrinks')), BT), T('MARGIN CALL: CASH BY A DEADLINE, OR THEY SELL', 640, 132, pop(t, ph(L, 'margin call')), RT)].map(o => (o.s *= 1 - k01(t, h - 0.4, h), o)) }; } },
  { id: 'E26', f(t, d, L) { const s = getSet('porch8'); hideCards(s); PORCH(s, true); s.certs.visible = false; s.env.visible = true; s.env.position.set(-1.62, s.TT, s.dz + 0.3); s.rule.visible = true; flat(s.rule, s.TT + 0.003); s.rule.position.set(2.0, s.TT + 0.003, s.dz + 0.25); s.rule.rotation.z = 0.15;
      const hi = [ph(L, "doesn't have to warn"), ph(L, "doesn't have to let you")].filter(v => t > v).length; if (s._rh !== hi) { s.rule.userData.draw({ hi }); s._rh = hi; } s.winTick.userData.draw({ red: true }); s.wl.intensity = 3;
      cl(s, k01(t, 0, d), [[2.45, 1.45, s.dz + 0.85], [2.0, s.TT, s.dz + 0.22]], [[2.2, 1.18, s.dz + 0.55], [2.0, s.TT, s.dz + 0.24]]);
      return { scene: s.S, cam: s.C, vig: 0.9, tags: [T('FINRA: NO WARNING REQUIRED', 640, 80, pop(t, ph(L, "doesn't have to warn")), RT), T('THEY PICK WHAT TO SELL', 640, 132, pop(t, ph(L, "doesn't have to let you")), RT)] }; } },
  { id: 'E27', f(t, d, L) { const s = getSet('office8'); hideCards(s, ['pell']); s.pop.visible = false; const cr = k01(t, ph(L, 'then the chip'), ph(L, 'then the chip') + 4); OFF(s, { mode: 'reel', k: Math.round(k01(t, 1.5, ph(L, 'like royalty') + 1) * 40) / 40, crash: Math.round(cr * 30) / 30, t, live: true });
      cl(s, k01(t, 0, d), [[-3.0, 1.8, -1.6], [-6.9, 1.75, -3.6]], [[-4.6, 1.78, -2.4], [-6.9, 1.75, -3.6]]);
      return { scene: s.S, cam: s.C, tags: [T('WILDFIRE CAPITAL IS MADE UP', 640, 80, pop(t, 0.8), BT), T('4:1 LEVERAGE ON ONE IDEA', 640, 132, pop(t, ph(L, 'four dollars')) * (1 - cr), YT), T('THE LOAN WAS DUE TODAY', 640, 132, pop(t, ph(L, 'because the loan')), RT)] }; } },
  { id: 'E28', f(t, d, L) { const s = getSet('office8'); hideCards(s, ['pell']); s.pop.visible = true; OFF(s, { mode: 'boss', t, live: true, talk: speaking(L, 'BOSS', t), expr: ex(t, L, 'BOSS', 2, 'scared', 'sad') });
      if (t < lineAt(L, 'PELL').t0) cl(s, k01(t, 0, lineAt(L, 'PELL').t0), [[-2.6, 1.7, -1.4], [-6.9, 1.7, -3.6]], [[-3.4, 1.7, -1.9], [-6.9, 1.7, -3.6]]); else cl(s, k01(t, lineAt(L, 'PELL').t0, d), [[2.2, 1.65, -0.2], [0.4, 1.35, -3.1]], [[2.0, 1.6, -0.5], [0.4, 1.35, -3.1]]);
      sp(s, 'pell', 0.4, -2.75, { view: 'q', dir: -1, expr: ex(t, L, 'PELL', 1, 'scared', 'neutral'), arms: [{ h: [0.55, 0.7], hand: 'fist' }, null] }, t, L, 'PELL', 1.8);
      return { scene: s.S, cam: s.C, tags: [T('SAME STOCKS = THE NEXT MARGIN CALL', 640, 80, pop(t, lineAt(L, 'BOSS', 2).t0 + 0.6), RT)] }; } },
  { id: 'E29', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['hank', 'rosa']); const m = ph(L, 'margin debt across'); DIN(s, t, { tick: t < m ? { l1: 'CHIPS  DOWN', l2: 'MARGIN CALLS', l3: 'JULY' } : { l1: 'MARGIN DEBT', l2: '-$85B IN ONE MO', l3: 'RECORD DROP' }, scr: Math.max(clack(t, 1.0), clack(t, m)), red: true, hr: 6, mn: 50, col: '#ff5a4a' });
      if (t < m) cl(s, k01(t, 0, m), [[0, 2.1, -4.6], [0, 2.7, -9]], [[0.4, 2.0, -5.3], [0, 2.72, -9]]); else cl(s, k01(t, m, d), [[-0.6, 1.75, 0.6], [-0.6, 1.4, -5]], [[-1.0, 1.7, 0.1], [-1.0, 1.35, -4.5]]);
      sp(s, 'hank', -1.35, CUST, { view: 'q', dir: 1, expr: 'sad', look: [0.3, -0.6], arms: [{ h: [0.55, 0.55], hand: 'fist' }, null], lean: -0.05 }, t, L, null, 1.75); sp(s, 'rosa', 0.0, BEH, { view: 'front', expr: 'sad' }, t, L, null, 1.6, 0.15);
      return { scene: s.S, cam: s.C, tags: [T('JULY: −$85B, BIGGEST ONE-MONTH DROP (IN DOLLARS)', 640, 80, pop(t, ph(L, 'eighty-five')), RT)] }; } },
];
/* ======================= ACT 6: DOMINOES ======================= */
ACTS[6] = [
  { id: 'E30', card: '6. The Dominoes' },
  { id: 'E31', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['jules', 'rosa']); DIN(s, t, { tick: { l1: 'CHIPZ  +2%', l2: 'CHIPZ 3X  +6%', l3: 'LEVERAGED ETF' }, hr: 10, mn: 0 }); const j = lineAt(L, 'JULES').t0;
      const dn = t > ph(L, 'much of their money') - 1; s.jPhone.userData.sc.userData.draw({ t: 'CHIPZ 3X', v: dn ? '-6%' : '+6%', c: dn ? '#ff5a4a' : '#3fd08a', l2: 'CHIPZ ' + (dn ? '-2%' : '+2%'), l3: '3× THE DAY' });
      if (t < j) cl(s, k01(t, 0, j), [[-5.1, 1.35, -3.1], [-6.3, 0.78, -3.95]], [[-5.6, 1.2, -3.4], [-6.3, 0.77, -3.95]]); else cl(s, k01(t, j, d), [[-2.4, 1.65, -1.0], [-5.4, 1.3, -4.3]], [[-2.7, 1.62, -1.3], [-5.4, 1.3, -4.3]]);
      sp(s, 'jules', -5.75, -4.55, { view: 'q', dir: 1, expr: ex(t, L, 'JULES', 1, 'sly', 'happy'), arms: [null, t > j && t < lineAt(L, 'ROSA').t0 ? UP : null] }, t, L, 'JULES', 1.7); sp(s, 'rosa', -4.9, -5.25, { view: 'q', dir: -1, expr: ex(t, L, 'ROSA', 0, 'sly', 'neutral') }, t, L, 'ROSA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('2× OR 3× THE DAILY MOVE', 640, 80, pop(t, ph(L, 'two or three')), YT), T('700+ LEVERAGED ETFs (JUNE 2026), 2× A YEAR EARLIER', 640, 132, pop(t, ph(L, 'seven hundred')), RT)].map(o => (o.s *= 1 - k01(t, j - 0.4, j), o)) }; } },
  { id: 'E32', f(t, d, L) { const s = getSet('loop8'); hideCards(s); s.wheel.rotation.z = 0.3; const mv = Math.sin(t * 0.55 * TAU / 2) * 1.0 + Math.sin(t * 1.3) * 0.3; const v = Math.round(mv * 10) / 10; if (s._mv !== v) { s.meter.userData.draw({ v }); s._mv = v; } MACH(s, t, 1);
      if (s._sl !== 1) { s.shLab.userData.draw({ t: '$9B PER 1% MOVE' }); s._sl = 1; } s.loopB.userData.draw({ hi: 0, stop: true });
      if (t < ph(L, 'they buy')) cl(s, k01(t, 0, ph(L, 'they buy')), [[s.MX + 3.5, 2.4, 1.2], [s.MX, 1.6, s.MZ]], [[s.MX + 1.0, 2.0, -1.0], [s.MX, 1.5, s.MZ]]); else cl(s, k01(t, ph(L, 'they buy'), d), [[s.MX - 2.2, 1.7, -1.6], [s.MX, 1.6, s.MZ]], [[s.MX + 0.4, 3.0, 0.2], [s.MX, 2.6, s.MZ - 1]]);
      return { scene: s.S, cam: s.C, tags: [T('REBALANCE EVERY DAY', 330, 80, pop(t, ph(L, 'rebalance every day')), BT), T('NOMURA: ~$9B TRADED PER 1% MOVE', 330, 132, pop(t, ph(L, 'nine billion')), YT), T('RISING → BUY · FALLING → SELL', 330, 184, pop(t, ph(L, 'they buy')), RT)] }; } },
  { id: 'E33', f(t, d, L) { const s = getSet('domino8'); hideCards(s); s.duster.visible = false; const push = ph(L, 'just a first push'); const wob = k01(t, push, push + 0.6) * (1 - k01(t, push + 1.6, push + 3)); s.dom.forEach((dm, i) => { dm.rotation.x = i === 0 ? -0.09 * Math.sin(Math.PI * wob) : 0; });
      if (t < ph(L, 'what starts it')) cl(s, k01(t, 0, ph(L, 'what starts it')), [[4.0, 2.4, 6.0], [0, 1.4, 0]], [[2.6, 1.6, -9.0], [0, 1.4, -2]]); else cl(s, k01(t, ph(L, 'what starts it'), d), [[-3.6, 3.4, -10.5], [0, 1.0, -3]], [[2.2, 1.5, 5.0], [0, 1.4, 1.8]]);
      return { scene: s.S, cam: s.C, tags: [T('LIQUIDATION CASCADE', 640, 80, pop(t, ph(L, 'liquidation cascade')), RT), T('FALL → FORCED SELLING → LOWER → MORE CALLS', 640, 132, pop(t, ph(L, 'prices fall')), YT), T('10-YR TREASURY >5%: HIGHEST SINCE 2007', 640, 184, pop(t, ph(L, 'ten-year')), BT)] }; } },
  { id: 'E34', f(t, d, L) { const s = getSet('domino8'); hideCards(s, ['dot8', 'gus8']); s.dom.forEach(dm => dm.rotation.x = 0); const sn = lineAt(L, 'GUS', 1).t0 + 0.6; const tt = Math.min(t, sn);
      const [dx, dz] = walkXZ(s, 'dot8', [1.1, 2.6], [1.1, -3.4], tt, 0.2, sn, { view: 'q', dir: -1, expr: t > sn - 0.5 ? 'scared' : 'happy' }, L, 'DOT', 1.2); s.duster.visible = true; s.duster.position.set(dx - 0.3, 0.75 + 0.05 * Math.sin(t * 10), dz);
      sp(s, 'gus8', 2.6, 1.0, { view: 'q', dir: -1, expr: ex(t, L, 'GUS', 0, 'scared', 'neutral'), arms: [null, t > lineAt(L, 'GUS').t0 ? UP : null] }, t, L, 'GUS', 1.75);
      cl(s, k01(t, 0, sn), [[4.4, 1.7, 6.8], [1.0, 1.0, 0]], [[3.4, 1.4, 1.0], [0.8, 1.1, -3.2]]); if (t > sn) { const k = k01(t, sn, d); cl(s, 1, [[3.4, 1.4, 1.0], [0.8, 1.1, -3.2]], [[3.4, 1.4, 1.0], [0.8, 1.1, -3.2]]); }
      const fr = t > sn; return { scene: s.S, cam: s.C, vig: fr ? 1.0 : 0.8, post: x => { if (fr) { const f = 1 - k01(t, sn, sn + 0.25); x.save(); x.fillStyle = `rgba(255,255,255,${0.6 * f})`; x.fillRect(0, 0, W, H); x.restore(); } }, tags: [T('A-A-A…', 640, 80, pop(t, lineAt(L, 'DOT', 1).t0 + 0.6) * (fr ? 0 : 1), YT), T('ACHOO!  (FREEZE)', 640, 80, pop(t, sn), RT)] }; } },
];
/* ======================= ACT 7: YOUR WALLET + ENDING ======================= */
ACTS[7] = [
  { id: 'E35', card: 'Your Wallet' },
  { id: 'E36', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['rosa', 'hank', 'jules']); const nums = ['one.', 'two.', 'three.', 'four.', 'five.'].map(n => ph(L, n)); const nv = nums.filter(v => t > v).length; DIN(s, t, { tick: { l1: 'CLOSED', l2: 'SEE YOU AT 7', l3: '' }, napkins: nv, hr: 21, mn: 0 });
      if (t < nums[0]) cl(s, k01(t, 0, nums[0]), [[0, 2.2, 1.8], [0, 1.4, -5]], [[0, 2.0, 0.4], [0, 1.2, -4.3]]); else { const i = clamp(nv - 1, 0, 4); const nx = -2.7 + i * 1.35, px = i ? -2.7 + (i - 1) * 1.35 : 0; const k = E(k01(t, nums[i], nums[i] + 1.2)); const cx = lerp(px, nx, k); s.C.position.set(cx, lerp(i ? 1.5 : 2.0, 1.5, k), lerp(i ? -3.35 : 0.4, -3.35, k)); s.C.lookAt(cx, 1.04, -4.13); }
      walkX(s, 'rosa', 3.2, 1.4, BEH, t, 0.4, 3.4, { view: 'front', expr: 'happy', arms: [t > nums[0] - 2 ? POINT : null, null] }, L, null, 1.6, 0.15); walkX(s, 'hank', -6.0, -1.35, CUST, t, 0.6, 4.6, { view: 'q', dir: 1, expr: 'neutral', look: [0, 0.7] }, L, null, 1.75); walkX(s, 'jules', 6.5, 0.45, CUST, t, 1.0, 5.4, { view: 'q', dir: -1, expr: 'neutral', look: [0, 0.7] }, L, null, 1.7);
      return { scene: s.S, cam: s.C, tags: [T('NOT ADVICE · NOBODY KNOWS WHEN', 640, 80, pop(t, ph(L, "this isn't advice")) * (1 - k01(t, nums[0] - 0.3, nums[0])), BT), T(['1 · KNOW YOUR NUMBER', '2 · LOOK INSIDE YOUR TARGET-DATE FUND', '3 · REAL CASH FOR REAL EMERGENCIES', '4 · CAREFUL BORROWING AGAINST STOCKS', '5 · LEVERAGED ETFs ARE FOR SINGLE DAYS'][clamp(nv - 1, 0, 4)], 640, 80, nv ? pop(t, nums[clamp(nv - 1, 0, 4)]) : 0, nv === 5 ? RT : GT)] }; } },
  { id: 'E37', f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['rosa', 'hank', 'jules']); DIN(s, t, { tick: { l1: 'CLOSED', l2: 'SEE YOU AT 7', l3: '' }, napkins: 5, hr: 21, mn: 5, cigar: t > lineAt(L, 'ROSA', 1).t0 ? 1 : 0 }); const jdel = k01(t, 0.2, 1.0);
      s.jPhone.position.set(-6.3, 0.772, -3.95); if (t < lineAt(L, 'HANK').t0) cl(s, k01(t, 0, lineAt(L, 'HANK').t0), [[0.0, 1.75, 0.9], [0.4, 1.4, -4.2]], [[0.4, 1.75, 0.6], [0.6, 1.4, -4.2]]); else cl(s, k01(t, lineAt(L, 'HANK').t0, d), [[1.4, 1.75, 0.6], [1.2, 1.4, -4.4]], [[1.7, 1.7, 0.3], [1.4, 1.4, -4.4]]);
      regulars(s, t, L, { h: { expr: 'happy', arms: [null, null] }, j: { expr: ex(t, L, 'ROSA', 0, 'happy', 'neutral') }, r: { expr: 'happy', arms: [t > lineAt(L, 'ROSA', 1).t0 ? HOLD : null, null] } }); card(s, 'rosa', 1.6).mesh.position.x = 1.4; card(s, 'rosa', 1.6).shadow.position.x = 1.4;
      return { scene: s.S, cam: s.C, tags: [T('3X APP: DELETED', 640, 80, pop(t, 0.5) * (1 - k01(t, 4.5, 5)), BT), T('SOME STOCKS · SOME CASH · NONE BORROWED', 640, 80, pop(t, lineAt(L, 'ROSA', 1).t0 + 0.5), GT)] }; } },
  { id: 'E38', noBlurOut: true, f(t, d, L) { const s = getSet('diner8'); hideCards(s, ['rosa', 'hank', 'jules', 'gus8']); const rec = 2.0; const r = lineAt(L, 'ROSA').t0;
      DIN(s, t, { tick: t < rec ? { l1: 'MILLBROOK MKT', l2: 'S&P 500  UP', l3: '7:15 AM' } : { l1: 'RECORD HIGH', l2: 'S&P 500  UP', l3: 'DING DING' }, scr: clack(t, rec), ring: ringAmt(t, rec + 0.8, 3), cigar: E(k01(t, 6, 7.5)), hr: 7, mn: 15 });
      if (t < r) cl(s, k01(t, 0, r), [[0, 2.0, -3.4], [0, 2.7, -9]], [[0.6, 1.8, 1.4], [0.4, 1.5, -5.5]]); else cl(s, k01(t, r, d - 3), [[2.0, 1.6, -2.6], [2.5, 1.45, -4.95]], [[2.2, 1.55, -3.0], [2.5, 1.45, -4.95]]);
      const ch = t > rec + 0.8 && t < r - 2; regulars(s, t, L, { gus: true, h: { expr: ch ? 'laugh' : 'happy', arms: [null, ch ? CHEER : null] }, j: { expr: ch ? 'laugh' : 'happy', arms: [ch ? CHEER : null, null] }, g: { expr: 'happy', arms: [null, ch ? CHEER : null] }, r: { expr: t > r - 1 ? 'happy' : 'sly', look: t > r - 1 ? [0, 0] : [0, 0.6], arms: [HOLD, null] } });
      return { scene: s.S, cam: s.C, post: fadeOut(t, d, 2.0), tags: [T('STILL RINGING', 640, 80, pop(t, rec + 1) * (1 - k01(t, r - 1, r)), YT)] }; } },
];
