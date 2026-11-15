/* Finance with Stromi 07 (The Billion-Dollar Sick Day): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig}. All-new cast + sets (sets07.js). */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z + (s.zoff || 0), pose(o, t, L, who), s.C, y); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z + (s.zoff || 0), moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C); return x; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0.5 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const nth = (L, n) => L[n] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' }, PT = { bg: '#6b4fa0', col: '#fff' };
const ZA = { office7: -4.5, bedroom7: -3.5, bakery7: -3.5, barn7: -4.5, nurse7: -3.5, shop7: -3.5, kitchen7: -3.5, seesaw7: -4 };
const gs = k => { const s = getSet(k); if (s.zoff == null) s.zoff = ZA[k] != null ? s.z0 - ZA[k] : 0; return s; };
const zo = (v, s) => [v[0], v[1], v[2] + s.zoff];
const cl = (s, k, a, b) => camLerp(s, E(k), zo(a[0], s), zo(b[0], s), zo(a[1], s), zo(b[1], s));
const once = (s, k, f) => s[k] || (s[k] = f(s));
const PHN = { h: [0.32, 0.05], hand: 'fist' }, EAR = { h: [0.22, 0.95], hand: 'fist' };
const HT = { dev: 1.75, rita: 1.68, priya: 1.62, benny: 1.55, tasha: 1.64, otis: 1.82, kai: 1.66, lou: 1.5 };
/* trailer insert on an in-set screen: max 4.5 s of footage per insert (Pushpam: never more than 5 s) */
const CREDIT = 'Footage: Rockstar Games trailer';
const clip = (scr, key, t, t0) => { const lt = t - t0; const on = lt >= 0 && lt < 4.5; scr.userData.draw(on ? vidFrame(key, lt) : null, on ? CREDIT : null); return on; };
/* office helpers */
const OFF = (s, o) => { o = o || {}; s.chat.userData.draw({ grey: o.grey || 0, msg: o.msg }); s.cal.visible = !!o.cal; if (o.cal) s.cal.userData.draw({ mark: o.mark }); s.clk.userData.set(o.h || 9, o.m == null ? 2 : o.m); };
const BAK = (s, o) => { o = o || {}; s.tags.forEach(t => t.visible = false); s.slice.visible = !!o.slice; s.jar.userData.set(o.jar == null ? 0.1 : o.jar); };

const ACTS = {};
/* ======================= ACT 0: COLD OPEN ======================= */
ACTS[0] = [
  { id: 'G01', noBlurIn: true, f(t, d, L) { const s = gs('office7'); hideCards(s); const g = Math.floor(k01(t, 2.5, d - 1) * 8); OFF(s, { grey: g });
      if (t < 3.2) cl(s, k01(t, 0, 3.2), [[-1.2, 2.5, 0.2], [-1.2, 2.45, -4.5]], [[-1.0, 2.3, -2.4], [-1.2, 2.4, -4.5]]); else cl(s, k01(t, 3.2, d), [[0.9, 1.9, -2.2], [1.7, 1.75, -4.5]], [[1.5, 1.8, -3.0], [1.7, 1.75, -4.5]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('THU 19 NOV · 9:02 AM', 300, 110, pop(t, 0.6), BT), T('GREEN → GREY', 980, 620, pop(t, ph(L, 'turning grey')), RT)] }; } },
  { id: 'G02', f(t, d, L) { const r0 = lineAt(L, 'RITA').t0, d1 = lineAt(L, 'DEV', 1).t0, r1 = lineAt(L, 'RITA', 1).t0; const inOffice = (t > r0 - 0.15 && t < d1 - 0.15) || t > r1 - 0.15;
      if (!inOffice) { const s = gs('bedroom7'); hideCards(s, ['dev']); s.tv.userData.draw(null);
        cl(s, k01(t, 0, d), [[1.3, 1.55, 2.6], [0.2, 1.2, -1.2]], [[0.9, 1.5, 2.0], [0.25, 1.25, -1.2]]);
        sp(s, 'dev', 0.3, -0.75, { view: 'front', expr: t > d1 ? 'sly' : 'sad', look: [0.2, 0.1], arms: [EAR, t > d1 ? null : { h: [0.4, 0.75], hand: 'open' }], talkArm: false, seed: 2 }, t, L, 'DEV', HT.dev);
        return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('DEV · "SICK"', 980, 110, pop(t, 0.3), PT), T('GAME BOX ALREADY OPEN', 330, 620, pop(t, ph(L, 'sudden', 5)), YT)] }; }
      const s = gs('office7'); hideCards(s, ['rita']); OFF(s, { grey: 4, cal: false });
      cl(s, k01(t, r0, d), [[-1.6, 1.65, 1.0], [-2.6, 1.45, -1.6]], [[-1.9, 1.6, 0.4], [-2.6, 1.45, -1.6]]);
      sp(s, 'rita', -2.6, -1.6, { view: 'q', dir: 1, expr: t > r1 ? 'smirk' : 'frown', look: [0.3, 0.1], arms: [EAR, null], seed: 5 }, t, L, 'RITA', HT.rita);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('RITA · HIS BOSS', 330, 110, pop(t, r0), BT), T('CALENDAR: "FLU" · BOOKED IN JUNE', 900, 620, pop(t, ph(L, 'since june', r1 + 1)), RT)] }; } },
  { id: 'G03', f(t, d, L) { const s = gs('office7'); hideCards(s); OFF(s, { grey: 8 });
      cl(s, k01(t, 0, d), [[0, 2.6, 3.6], [0, 1.2, -2.5]], [[1.2, 2.1, 0.2], [1.6, 1.6, -4.5]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('~1.5 MILLION "SICK"', 320, 110, pop(t, ph(L, 'million and a half')), RT), T('~$1B LOST WORK', 320, 190, pop(t, ph(L, 'billion dollars in lost')), RT), T('THE BIGGER BET →', 980, 620, pop(t, ph(L, 'bet almost everything')), YT)] }; } },
  { id: 'G04', f(t, d, L) { const s = gs('skyline7'); hideCards(s); s.pend.rotation.z = Math.sin(t * 0.9) * 0.08;
      cl(s, k01(t, 0, d), [[-6, 14, 40], [4, 30, -16]], [[2, 26, 26], [8, 44, -16]]);
      return { scene: s.S, cam: s.C, vig: 0.4, tags: [T('WHO GETS PAID?', 300, 620, pop(t, ph(L, 'who actually')), YT), T('WHAT IT TEACHES YOUR WALLET', 900, 620, pop(t, ph(L, 'your own money')), GT)] }; } },
  { id: 'G05', card: 'The Billion-Dollar Sick Day', sub: 'Who really gets paid when a country calls in sick' },
];
/* ======================= ACT 1: THE EIGHT-YEAR CAKE ======================= */
ACTS[1] = [
  { id: 'G06', card: '1. The Eight-Year Cake' },
  { id: 'G07', f(t, d, L) { const s = gs('bakery7'); hideCards(s, ['benny', 'tasha']); BAK(s, { jar: 0.15 }); const c0 = lineAt(L, 'TASHA').t0; const on = clip(s.tv, 'i1', t, 1.0);
      if (t < c0 - 0.3) cl(s, k01(t, 0, c0), [[1.6, 2.1, 0.4], [2.2, 1.8, -3.5]], [[0.2, 2.2, 2.4], [-0.6, 1.9, -1.6]]); else cl(s, k01(t, c0 - 0.3, d), [[0.2, 1.75, 3.2], [0.3, 1.45, -1.2]], [[0.1, 1.7, 2.6], [0.3, 1.45, -1.2]]);
      sp(s, 'benny', 0.45, -1.95, { view: 'q', dir: -1, expr: t > lineAt(L, 'BENNY', 1).t0 ? 'smirk' : 'smile', look: [-0.6, 0.1], seed: 1 }, t, L, 'BENNY', HT.benny, 0.32);
      walkTo(s, 'tasha', 2.6, 0.75, -0.35, t, c0 - 3.2, c0 - 0.6, { view: 'q', dir: -1, expr: t > lineAt(L, 'TASHA', 1).t0 ? 'frown' : 'neutral', look: [-0.5, 0.2], seed: 4 }, L, 'TASHA', HT.tasha);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('ROCKSTAR GAMES', 300, 110, pop(t, ph(L, 'rockstar games')), BT), T('OWNED BY TAKE-TWO (TTWO)', 330, 190, pop(t, ph(L, 'take-two interactive')), YT), T('COST: NEVER DISCLOSED', 980, 620, pop(t, ph(L, 'never said')), RT)] }; } },
  { id: 'G08', f(t, d, L) { const s = gs('bakery7'); hideCards(s); const steps = ['twenty twenty,', 'five hundred million', 'eight hundred million', 'over a billion', 'one and a half', 'nearly two', 'two point three five']; const lv = [0.1, 0.19, 0.21, 0.34, 0.45, 0.64, 0.8, 1.0];
      let n = 0; steps.forEach((q, i) => { if (t > ph(L, q, 1e9)) n = i + 1; }); BAK(s, { jar: lv[n] }); s.tv.userData.draw(null);
      if (t < ph(L, 'twenty twenty,', 8)) cl(s, k01(t, 0, ph(L, 'twenty twenty,', 8)), [[-3.0, 2.1, 1.6], [-1.4, 1.6, -3.25]], [[-2.6, 1.85, -0.4], [-1.4, 1.7, -3.25]]); else cl(s, k01(t, ph(L, 'twenty twenty,', 8), d), [[-2.5, 1.8, -0.9], [-1.4, 1.75, -3.25]], [[-2.3, 1.75, -1.6], [-1.4, 1.75, -3.25]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('DEV COSTS = ASSET, NOT LOSS', 330, 110, pop(t, ph(L, 'balance sheet')), YT), T('"PAYS US BACK LATER"', 950, 110, pop(t, ph(L, 'pay us back')), BT)] }; } },
  { id: 'G09', f(t, d, L) { const s = gs('bakery7'); hideCards(s); BAK(s, { jar: 1 }); s.tv.userData.draw(null);
      cl(s, k01(t, 0, d), [[-0.9, 3.4, 0.6], [-0.9, 2.6, -1.15]], [[-0.4, 1.4, 1.6], [-0.9, 1.6, -1.15]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('GTA VI: $1–2B (OUTSIDE EST.)', 330, 110, pop(t, ph(L, 'between one and two')), RT), T('GTA V (2013): ~$265M', 950, 620, pop(t, ph(L, 'two hundred and sixty-five')), GT)] }; } },
  { id: 'G10', f(t, d, L) { const s = gs('bakery7'); hideCards(s, ['benny', 'tasha']); const n0 = lineAt(L, 'N').t0; BAK(s, { jar: 1, slice: t > 0.3 }); s.tv.userData.draw(null);
      if (t < n0 - 0.2) cl(s, k01(t, 0, n0), [[0.4, 1.55, 2.6], [0.5, 1.3, -1.2]], [[0.35, 1.5, 2.1], [0.5, 1.3, -1.2]]); else cl(s, k01(t, n0 - 0.2, d), [[0.45, 1.5, 2.1], [0.4, 1.3, -1.2]], [[-0.4, 2.6, 3.4], [-0.9, 1.9, -1.2]]);
      sp(s, 'benny', 0.45, -1.95, { view: 'q', dir: -1, expr: 'grin', look: [-0.5, 0.1], seed: 1 }, t, L, 'BENNY', HT.benny, 0.32);
      sp(s, 'tasha', 0.95, -0.45, { view: 'q', dir: -1, expr: t > lineAt(L, 'TASHA').t0 ? 'surprised' : 'neutral', look: [-0.4, 0.3], seed: 4 }, t, L, 'TASHA', HT.tasha);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('$80 A SLICE', 980, 110, pop(t, 0.5), RT), T('~8 YEARS · A DOZEN STUDIOS', 330, 620, pop(t, ph(L, 'a dozen studios')), YT)] }; } },
];
/* ======================= ACT 2: THE GOOSE ======================= */
const FARM = (s, o) => { o = o || {}; s.eggs.forEach((e, i) => e.visible = i < (o.eggs || 0)); s.charts.visible = !!o.charts; if (o.charts) s.charts.userData.draw({ two: o.two }); s.paper.visible = false; };
ACTS[2] = [
  { id: 'G11', card: "2. The Goose That Wouldn't Stop" },
  { id: 'G12', f(t, d, L) { const s = gs('farm7'); hideCards(s); const ne = Math.floor(lerp(2, 40, k01(t, ph(L, 'refused to stop'), d - 1))); FARM(s, { eggs: ne }); s.goose.userData.head.position.y = 0.68 + Math.sin(t * 3) * 0.015;
      cl(s, k01(t, 0, d), [[-3, 2.6, 7], [0, 0.8, 0.6]], [[0.6, 1.2, 3.4], [0.3, 0.45, 1.0]]);
      return { scene: s.S, cam: s.C, vig: 0.4, tags: [T('GTA V · SEPT 2013', 300, 110, pop(t, ph(L, 'september twenty thirteen')), BT), T('$1B IN 3 DAYS', 980, 110, pop(t, ph(L, 'billion dollars in sales')), GT), T('3 CONSOLE GENERATIONS', 330, 620, pop(t, ph(L, 'three generations')), YT)] }; } },
  { id: 'G13', f(t, d, L) { const s = gs('farm7'); hideCards(s, ['otis', 'tasha']); FARM(s, { eggs: 40 });
      cl(s, k01(t, 0, d), [[0.2, 1.6, 5.2], [0.2, 1.1, 0.6]], [[0.2, 1.55, 4.4], [0.2, 1.15, 0.6]]);
      sp(s, 'otis', -1.9, 0.7, { view: 'q', dir: 1, expr: t > lineAt(L, 'OTIS', 1).t0 ? 'sly' : 'happy', look: [0.4, 0.1], seed: 2 }, t, L, 'OTIS', HT.otis);
      sp(s, 'tasha', 2.3, 0.6, { view: 'q', dir: -1, expr: 'neutral', look: [-0.5, 0.2], seed: 6 }, t, L, 'TASHA', HT.tasha);
      return { scene: s.S, cam: s.C, vig: 0.45, tags: [T('OTIS · THE FARMER', 300, 110, pop(t, 0.3), BT), T('13 YEARS · SAME GOOSE', 980, 110, pop(t, 0.8), GT)] }; } },
  { id: 'G14', f(t, d, L) { const s = gs('barn7'); hideCards(s); const wd = ph(L, 'write-downs', d * 0.45); const n = t < wd ? 36 : Math.floor(lerp(36, 6, k01(t, wd, d - 1)));
      s.chicks.forEach((c, i) => { c.visible = true; c.userData.sc.userData.draw(i % 5 === 0 && t > wd); c.rotation.z = i >= n ? Math.min(1.4, (t - wd) * 0.6 * ((i % 4) + 1) / 3) : 0; });
      const op = k01(t, 0, 2.2); s.doorL.rotation.y = -E(op) * 1.6; s.doorR.rotation.y = E(op) * 1.6;
      if (t < wd) cl(s, k01(t, 0, wd), [[0, 1.8, 3.2], [0, 1.2, -4]], [[0, 1.6, 0.8], [0, 1.2, -4]]); else cl(s, k01(t, wd, d), [[1.4, 1.5, -1.4], [0.8, 1.1, -3.9]], [[-1.2, 1.4, -2.0], [-1.0, 1.1, -3.9]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('ZYNGA · 2022 · ~$12.7B', 330, 110, pop(t, ph(L, 'zynga')), YT), T('TTWO STOCK −13% THAT DAY', 950, 110, pop(t, ph(L, 'thirteen percent')), RT), T('~$8.5B LOST IN 3 YEARS', 640, 620, pop(t, ph(L, 'eight and a half')), RT)] }; } },
  { id: 'G15', f(t, d, L) { const s = gs('barn7'); hideCards(s, ['otis']); s.chicks.forEach((c, i) => { c.rotation.z = i % 6 ? 1.3 : 0; c.userData.sc.userData.draw(false); }); s.doorL.rotation.y = -1.6; s.doorR.rotation.y = 1.6;
      cl(s, k01(t, 0, d), [[0.9, 1.6, 2.0], [0.6, 1.35, -0.6]], [[0.8, 1.6, 1.4], [0.6, 1.4, -0.6]]);
      sp(s, 'otis', 0.6, -0.6, { view: 'front', expr: 'sad', look: [0, -0.2], arms: [{ h: [0.4, 0.9], hand: 'open' }, null], seed: 2 }, t, L, 'OTIS', HT.otis);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('THE SECOND GOOSE', 980, 620, pop(t, 0.3), RT)] }; } },
  { id: 'G16', f(t, d, L) { const s = gs('farm7'); hideCards(s); FARM(s, { eggs: 12, charts: true, two: t > ph(L, 'much smaller slice', 6) });
      cl(s, k01(t, 0, d), [[3.2, 2.3, 2.6], [3.2, 2.2, -4]], [[3.2, 2.1, 0.9], [3.2, 2.2, -4]]);
      return { scene: s.S, cam: s.C, vig: 0.45, tags: [T('THE OLD GOOSE MUST DELIVER', 640, 620, pop(t, ph(L, 'biggest egg')), YT)] }; } },
];
/* ======================= ACT 3: SEVEN PERCENT IN A DAY ======================= */
const NUR = (s, k, o) => { s.calChart.userData.draw({ k }); s.phone.userData.draw(o || {}); };
ACTS[3] = [
  { id: 'G17', card: '3. Seven Percent in a Day' },
  { id: 'G18', f(t, d, L) { const s = gs('nurse7'); hideCards(s, ['priya']); NUR(s, 0.3, { t: 'TTWO', s: 'HOLD' });
      walkTo(s, 'priya', 3.3, 1.3, -0.4, t, 0.4, 3.6, { view: 'front', expr: 'smile', look: [0, 0.1], seed: 3 }, L, 'PRIYA', HT.priya);
      cl(s, k01(t, 0, d), [[0.4, 1.7, 3.2], [1.4, 1.1, -1.0]], [[0.9, 1.55, 1.9], [1.3, 1.2, -0.6]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('PRIYA · NIGHT-SHIFT NURSE, 38', 330, 110, pop(t, ph(L, 'night-shift')), BT), T('MADE-UP PEOPLE · REAL NUMBERS', 950, 620, pop(t, ph(L, 'made up')), YT), T('OWNS TTWO SHARES', 980, 110, pop(t, ph(L, 'take-two shares')), GT)] }; } },
  { id: 'G19', f(t, d, L) { const s = gs('nurse7'); hideCards(s, ['priya']); const dr = ph(L, 'seven to eight', 6); NUR(s, t < dr ? 0.35 : 0.5, t < dr ? { t: 'TTWO' } : { t: 'TTWO', s: '−7%', bg: '#2a0f0f' });
      if (t < lineAt(L, 'PRIYA').t0 - 0.3) cl(s, k01(t, 0, d * 0.7), [[-0.4, 2.2, -1.6], [-0.4, 1.7, -3.5]], [[0.2, 1.7, -0.6], [-0.3, 1.7, -3.5]]); else cl(s, k01(t, lineAt(L, 'PRIYA').t0 - 0.3, d), [[1.7, 1.55, 2.5], [1.3, 1.2, -0.5]], [[1.55, 1.5, 2.1], [1.3, 1.2, -0.5]]);
      sp(s, 'priya', 1.3, -0.5, { view: 'front', expr: t > dr ? 'scared' : 'neutral', look: [-0.3, -0.2], arms: [PHN, null], seed: 3 }, t, L, 'PRIYA', HT.priya);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('DEC 2023: "2025"', 300, 110, pop(t, ph(L, 'december')), BT), T('MAY 2025 → MAY 2026', 330, 190, pop(t, ph(L, 'pushed the game')), YT), T('TTWO −7 TO 8%', 980, 110, pop(t, dr), RT)] }; } },
  { id: 'G20', f(t, d, L) { const s = gs('nurse7'); hideCards(s, ['priya']); const dr = ph(L, 'eight percent', 4); NUR(s, t < dr ? 0.55 : 1, t < dr ? { t: 'TTWO' } : { t: 'TTWO', s: '−8%', bg: '#2a0f0f' });
      cl(s, k01(t, 0, d), [[0.8, 1.9, 3.0], [-0.3, 1.7, -3.5]], [[1.7, 1.55, 2.4], [1.3, 1.2, -0.5]]);
      sp(s, 'priya', 1.3, -0.5, { view: 'front', expr: t > lineAt(L, 'PRIYA').t0 ? 'frown' : 'scared', look: [0, -0.3], arms: [PHN, null], seed: 3 }, t, L, 'PRIYA', HT.priya);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('NOV 2025 → 19 NOV 2026', 330, 110, pop(t, ph(L, 'moved again')), YT), T('TTWO −8%', 980, 110, pop(t, dr), RT)] }; } },
  { id: 'G21', f(t, d, L) { const s = gs('nurse7'); hideCards(s, ['priya']); NUR(s, 1, { t: 'TTWO', s: '−8%', bg: '#2a0f0f' }); s.nood.rotation.y = t * 0.2;
      cl(s, k01(t, 0, d), [[1.6, 1.55, 2.3], [1.3, 1.2, -0.5]], [[-0.2, 3.0, 2.6], [0, 0.9, -1.4]]);
      sp(s, 'priya', 1.3, -0.5, { view: 'front', expr: 'sad', look: [-0.3, -0.4], seed: 3 }, t, L, 'PRIYA', HT.priya);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('~10% OF VALUE IN A DAY', 330, 110, pop(t, ph(L, 'close to a tenth')), RT), T('ONLY THE DATE CHANGED', 950, 620, pop(t, ph(L, 'date on a calendar')), YT)] }; } },
];
/* ======================= ACT 4: THE $8 BILLION PROMISE ======================= */
ACTS[4] = [
  { id: 'G22', card: '4. The $8 Billion Promise' },
  { id: 'G23', f(t, d, L) { const s = gs('rope7'); hideCards(s); s.news.visible = false; const wob = t > ph(L, 'eighteen percent', 1e9) ? 0.22 : 0.07; s.vg.rotation.z = Math.sin(t * 1.7) * wob;
      cl(s, k01(t, 0, d), [[-5, 23, 3], [-1.5, 23, -8]], [[4, 23.5, 2], [1, 23, -8]]);
      return { scene: s.S, cam: s.C, vig: 0.5, tags: [T('FORECAST: $8.0–8.2B NET BOOKINGS', 640, 110, pop(t, ph(L, 'eight to eight point two')), GT), T('LAST YEAR: $6.72B', 300, 620, pop(t, ph(L, 'six point seven two')), BT), T('Q2: −18% → ~$1.6B', 980, 620, pop(t, ph(L, 'eighteen percent')), RT)] }; } },
  { id: 'G24', f(t, d, L) { const s = gs('rope7'); hideCards(s); s.vg.rotation.z = Math.sin(t * 1.2) * 0.04; s.news.visible = t > 0.6; s.news.position.set(Math.sin(t * 1.3) * 1.2, 27 - (t - 0.6) * 0.9, -4); s.news.rotation.set(-0.2 + Math.sin(t * 2) * 0.2, 0, Math.sin(t * 1.1) * 0.5);
      cl(s, k01(t, 0, d), [[0, 22, 4], [0, 21, -6]], [[0, 23.5, 7], [0, 23, -8]]);
      return { scene: s.S, cam: s.C, vig: 0.5, tags: [T('9 NOV: FORECAST HELD', 300, 620, pop(t, ph(L, 'held its line')), GT), T('STOCK ↑', 980, 620, pop(t, ph(L, 'stock went up')), GT)] }; } },
  { id: 'G25', f(t, d, L) { const s = gs('shop7'); hideCards(s, ['kai', 'dev']); s.rs.userData.draw(t > lineAt(L, 'DEV', 1).t0 ? '$99.99' : '$79.99'); s.drawer.position.z = t > lineAt(L, 'DEV', 1).t1 ? 0.22 : 0; s.tv.userData.draw(null);
      cl(s, k01(t, 0, d), [[1.0, 1.7, 3.2], [1.1, 1.3, -1.2]], [[1.2, 1.65, 2.7], [1.15, 1.3, -1.2]]);
      sp(s, 'kai', 1.65, -1.85, { view: 'q', dir: -1, expr: 'smirk', look: [-0.5, 0], seed: 2 }, t, L, 'KAI', HT.kai, 0.28);
      sp(s, 'dev', 0.55, -0.15, { view: 'q', dir: 1, expr: t > lineAt(L, 'DEV', 1).t0 ? 'grin' : 'neutral', look: [0.5, 0.1], seed: 1 }, t, L, 'DEV', HT.dev);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('STANDARD $80', 300, 110, pop(t, 0.4), YT), T('ULTIMATE $100', 980, 110, pop(t, lineAt(L, 'KAI', 1).t0), RT)] }; } },
  { id: 'G26', f(t, d, L) { const s = gs('shop7'); hideCards(s); s.drawer.position.z = 0; s.rs.userData.draw('$99.99'); const on = clip(s.tv, 'i2', t, 0.4);
      if (t < 4.9) cl(s, k01(t, 0, 4.9), [[2.4, 2.0, -1.3], [2.4, 2.0, -3.5]], [[2.2, 1.95, -1.0], [2.4, 2.0, -3.5]]); else cl(s, k01(t, 4.9, d), [[-0.4, 1.9, 1.6], [-2.0, 1.2, -3.2]], [[0.4, 2.2, 2.6], [-1.0, 1.2, -3.2]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('~90% PICKED THE $100 EDITION', 330, 110, t > 4.6 ? pop(t, Math.max(4.7, ph(L, 'ninety percent'))) : 0, RT), T('USUALLY ~1 IN 5', 980, 110, t > 4.6 ? pop(t, Math.max(5, ph(L, 'one sale in five'))) : 0, BT), T('~10M PRE-ORDERS ≈ $1B (SENSOR TOWER EST.)', 640, 620, pop(t, ph(L, 'ten million')), GT)] }; } },
];
/* ======================= ACT 5: THE $80 GAME IS CHEAP ======================= */
ACTS[5] = [
  { id: 'G27', card: '5. The $80 Game Is Cheap' },
  { id: 'G28', f(t, d, L) { const s = gs('kitchen7'); hideCards(s); s.scale.visible = false; const a = ph(L, 'sixty dollars', 4), b = ph(L, 'eighty-six', 9); s.calc.userData.scr.userData.draw(t < a ? '80' : t < b ? '60 × 1.43' : '86');
      cl(s, k01(t, 0, d), [[0.3, 1.75, 1.5], [-0.15, 0.78, -0.85]], [[0.0, 1.2, 0.05], [-0.15, 0.78, -0.85]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('2013: $60', 300, 110, pop(t, a), BT), T('= ~$86 TODAY (CPI)', 980, 110, pop(t, b), GT), T('$80 IS CHEAPER IN REAL MONEY', 640, 620, pop(t, ph(L, 'a little cheaper')), YT)] }; } },
  { id: 'G29', f(t, d, L) { const s = gs('kitchen7'); hideCards(s, ['dev', 'tasha']); s.scale.visible = false; s.calc.userData.scr.userData.draw(t > ph(L, 'eight hundred', 9) ? '800' : t > ph(L, 'six hundred and fifty', 6) ? '650' : '80');
      cl(s, k01(t, 0, d), [[0.2, 1.7, 3.0], [0.2, 1.2, -0.9]], [[0.2, 1.65, 2.6], [0.2, 1.2, -0.9]]);
      sp(s, 'tasha', 1.55, -0.3, { view: 'q', dir: -1, expr: 'smirk', look: [-0.5, 0], seed: 4 }, t, L, 'TASHA', HT.tasha);
      sp(s, 'dev', -1.15, -0.3, { view: 'q', dir: 1, expr: t > lineAt(L, 'DEV', 1).t0 ? 'sly' : t > ph(L, 'six hundred and fifty', 1e9) ? 'scared' : 'neutral', look: [0.5, 0], seed: 1 }, t, L, 'DEV', HT.dev);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('PS5: $500 → $650', 330, 110, pop(t, ph(L, 'six hundred and fifty')), RT), T('XBOX: $500 → $800', 950, 110, pop(t, ph(L, 'eight hundred')), RT)] }; } },
  { id: 'G30', f(t, d, L) { const s = gs('kitchen7'); hideCards(s); s.scale.visible = true; const sk = k01(t, ph(L, 'expensive part', 5), ph(L, 'expensive part', 5) + 1.5); s.scale.userData.tilt(lerp(0.25, -0.3, E(sk)));
      cl(s, k01(t, 0, d), [[1.2, 1.5, 0.6], [2.4, 0.95, -2.1]], [[2.0, 1.3, -0.6], [2.4, 0.95, -2.1]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('GAMES ← → THE BOX', 640, 110, pop(t, ph(L, 'sold the box')), YT), T('AUG: FEWEST HARDWARE UNITS SINCE 2013', 640, 620, pop(t, ph(L, 'in august')), RT), T('AVG PRICE: RECORD HIGH', 640, 540, pop(t, ph(L, 'hit a record')), RT)] }; } },
];
/* ======================= ACT 6: THE BILLION-DOLLAR SICK DAY ======================= */
const QUO = (s, lines, who, k) => s.q.userData.draw(lines, who, k);
ACTS[6] = [
  { id: 'G31', card: '6. The Billion-Dollar Sick Day' },
  { id: 'G32', f(t, d, L) { const s = gs('quote7'); hideCards(s); QUO(s, ['~1.5 million US workers', '× ~$70,000 output a year', '≈ ~$1 billion of lost work'], 'José García Montalvo, economist (Barcelona) · estimate', k01(t, ph(L, 'put a number'), d - 1.5));
      cl(s, k01(t, 0, d), [[0.6, 1.4, 0.6], [0, 1.65, -2]], [[0, 1.7, -0.3], [0, 1.7, -2]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [] }; } },
  { id: 'G33', f(t, d, L) { const s = gs('office7'); hideCards(s); OFF(s, { grey: 8, cal: true, mark: t > ph(L, 'thanksgiving', 5) });
      cl(s, k01(t, 0, d), [[0.5, 1.6, -0.1], [0.2, 0.79, -1.05]], [[0.2, 1.3, -0.5], [0.2, 0.79, -1.05]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('THU: "SICK"', 260, 110, pop(t, ph(L, 'sick thursday')), RT), T('FRI: "WHILE I\'M AT IT"', 640, 110, pop(t, ph(L, 'friday')), RT), T('+ 4-DAY WEEKEND', 1020, 110, pop(t, ph(L, 'four-day')), YT)] }; } },
  { id: 'G34', f(t, d, L) { const s = gs('office7'); hideCards(s, ['rita', 'lou']); OFF(s, { grey: 8 }); const last = lineAt(L, 'RITA', 3).t0;
      if (t < last - 0.3) cl(s, k01(t, 0, last), [[0, 2.0, 4.6], [0, 1.2, -1.6]], [[0, 1.85, 3.8], [0, 1.2, -1.6]]); else cl(s, k01(t, last - 0.3, d), [[-1.9, 1.6, 0.4], [-2.6, 1.45, -1.6]], [[-2.1, 1.55, -0.1], [-2.6, 1.45, -1.6]]);
      sp(s, 'rita', -2.6, -1.6, { view: 'q', dir: 1, expr: t > last ? 'frown' : 'neutral', look: [0.5, 0], arms: [{ h: [0.5, 0.2], hand: 'open' }, null], seed: 5 }, t, L, 'RITA', HT.rita);
      sp(s, 'lou', 2.6, -1.6, { view: 'q', dir: -1, expr: 'smile', look: [-0.5, 0.1], arms: [{ h: [0.3, 0.45], hand: 'grab' }, null], seed: 7 }, t, L, 'LOU', HT.lou);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('9 CHAIRS · 2 PEOPLE', 640, 110, pop(t, 0.6), YT), T('JESS LIVES IN OHIO', 980, 620, pop(t, last + 0.3), RT)] }; } },
  { id: 'G35', f(t, d, L) { const s = gs('seesaw7'); hideCards(s); const third = ph(L, 'and third', d * 0.5); const drops = [ph(L, 'eighty or a hundred', 1e9), ph(L, 'plus pizza', 1e9), ph(L, 'energy drinks', 1e9), ph(L, 'energy drinks', 1e9) + 0.3, ph(L, 'energy drinks', 1e9) + 0.6];
      s.items.forEach((it, i) => { const k = k01(t, drops[i], drops[i] + 0.6); it.visible = t > drops[i]; it.position.y = (i >= 2 ? 0.19 : 0.05) + (1 - E(k)) * 2.5; });
      const nIn = s.items.filter(i => i.visible).length; s.beamG.rotation.z = lerp(0.16, -0.05, Math.min(1, nIn / 4)) + Math.sin(t * 2) * 0.01;
      if (t < third) cl(s, k01(t, 0, third), [[0, 2.6, 4.4], [0, 1.6, -4]], [[-1.0, 1.6, 2.4], [-1.2, 0.9, -1]]); else cl(s, k01(t, third, d), [[1.6, 1.5, 2.2], [1.6, 1.0, -1]], [[0, 2.2, 3.8], [0, 1.1, -1]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('ESTIMATE, NOT A STUDY', 300, 110, pop(t, ph(L, 'back-of-the-envelope')), YT), T('IT MOVES: OFFICES → LIVING ROOMS', 640, 620, pop(t, ph(L, 'from offices')), YT)] }; } },
];
/* ======================= ACT 7: LAUNCH WEEK (placeholders until real numbers) ======================= */
ACTS[7] = [
  { id: 'G36', card: '7. Launch Week' },
  { id: 'G37', f(t, d, L) { const s = gs('bakery7'); hideCards(s); BAK(s, { jar: lerp(1, 0.4, k01(t, 5, d)) }); const on = clip(s.tv, 'i3', t, 0.3);
      if (t < 4.9) cl(s, k01(t, 0, 4.9), [[2.2, 2.0, -1.4], [2.2, 1.75, -3.5]], [[2.1, 1.95, -1.1], [2.2, 1.75, -3.5]]); else cl(s, k01(t, 4.9, d), [[-0.4, 3.0, 2.6], [-0.9, 2.0, -1.2]], [[-0.9, 1.8, 0.6], [-1.7, 1.5, -3.2]]);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('LAUNCH SALES: [FILL]', 330, 110, t > 4.6 ? pop(t, 4.8) : 0, GT), T('GTA V: $1B IN 3 DAYS', 980, 620, pop(t, 5.4), BT)] }; } },
  { id: 'G38', f(t, d, L) { const s = gs('nurse7'); hideCards(s, ['priya']); NUR(s, 1, { t: 'TTWO', s: '[MOVE]', bg: '#10241a', c: '#9fe0a0' });
      cl(s, k01(t, 0, d), [[1.7, 1.55, 2.5], [1.3, 1.2, -0.5]], [[1.55, 1.5, 2.1], [1.3, 1.2, -0.5]]);
      sp(s, 'priya', 1.3, -0.5, { view: 'front', expr: 'surprised', look: [0, -0.2], arms: [PHN, null], seed: 3 }, t, L, 'PRIYA', HT.priya);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('TTWO: [18 NOV → LATEST]', 980, 110, pop(t, 0.4), YT)] }; } },
  { id: 'G39', f(t, d, L) { const s = gs('rope7'); hideCards(s); s.news.visible = false; s.vg.rotation.z = Math.sin(t * 1.4) * 0.05;
      cl(s, k01(t, 0, d), [[4, 23.5, 4], [1, 23, -8]], [[-4, 24.5, 6], [0, 23.5, -8]]);
      return { scene: s.S, cam: s.C, vig: 0.5, tags: [T('BUY THE RUMOUR, SELL THE NEWS?', 640, 620, pop(t, 0.8), YT)] }; } },
];
/* ======================= ACT 8: YOUR WALLET + ENDING ======================= */
const CORK = (s, n) => { const P = once(s, 'pins7', s => [
    s.pin(-1.0, 1.75, 0.85, 0.62, (x, w, h) => { paperBg(x, w, h, '#fbf6ea'); ltxt(x, '1', w * 0.12, h * 0.2, h * 0.24, REDC, 'center'); ltxt(x, 'ONE THING?', w * 0.56, h * 0.22, h * 0.13, INK, 'center'); ltxt(x, 'spread the risk', w / 2, h * 0.55, h * 0.11, '#2f4d6b', 'center'); ltxt(x, '(index funds)', w / 2, h * 0.75, h * 0.09, '#5a4a3a', 'center'); }, -0.05),
    s.pin(0.0, 1.8, 0.85, 0.62, (x, w, h) => { paperBg(x, w, h, '#fbf6ea'); ltxt(x, '2', w * 0.12, h * 0.2, h * 0.24, REDC, 'center'); ltxt(x, 'PRICED IN', w * 0.56, h * 0.22, h * 0.13, INK, 'center'); ltxt(x, 'good news is', w / 2, h * 0.55, h * 0.11, '#2f4d6b', 'center'); ltxt(x, 'usually known', w / 2, h * 0.75, h * 0.11, '#2f4d6b', 'center'); }, 0.04),
    s.pin(1.0, 1.72, 0.85, 0.62, (x, w, h) => { paperBg(x, w, h, '#fbf6ea'); ltxt(x, '3', w * 0.12, h * 0.2, h * 0.24, REDC, 'center'); ltxt(x, '+$20 NUDGE', w * 0.56, h * 0.22, h * 0.13, INK, 'center'); ltxt(x, 'set a fun budget', w / 2, h * 0.55, h * 0.11, '#2f4d6b', 'center'); ltxt(x, 'BEFORE the shop', w / 2, h * 0.75, h * 0.1, REDC, 'center'); }, -0.03)]);
  P.forEach((p, i) => { p.visible = i < n; p.userData.pin.visible = i < n; }); return P; };
ACTS[8] = [
  { id: 'G40', card: 'Your Wallet' },
  { id: 'G41', f(t, d, L) { const s = gs('cork7'); hideCards(s); const a = [nth(L, 1).t0, nth(L, 2).t0, nth(L, 3).t0]; const n = a.filter(x => t > x - 0.2).length; CORK(s, n);
      const foc = n === 0 ? [[0, 1.7, 1.6], [0, 1.6, -2]] : [[[-1.0, 1.75, -0.7], [-1.0, 1.75, -2]], [[0, 1.8, -0.7], [0, 1.8, -2]], [[1.0, 1.72, -0.7], [1.0, 1.72, -2]]][n - 1]; const t0 = n === 0 ? 0 : a[n - 1] - 0.2, t1 = n < 3 ? a[n] - 0.2 : d;
      cl(s, k01(t, t0, Math.min(t1, t0 + 2.5)), n === 0 ? [[0, 2.0, 2.4], [0, 1.6, -2]] : [[foc[0][0] * 0.4, 1.7, 0.9], [foc[0][0] * 0.4, 1.7, -2]], foc);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('THIS ISN\'T A STOCK TIP', 640, 620, pop(t, ph(L, "that's not a tip")), BT)] }; } },
  { id: 'G42', f(t, d, L) { const s = gs('shop7'); hideCards(s, ['dev', 'tasha']); s.rs.userData.draw('$99.99'); s.tv.userData.draw(null); s.drawer.position.z = 0.22; const n0 = lineAt(L, 'N').t0;
      if (t < n0 - 0.2) cl(s, k01(t, 0, n0), [[0.6, 1.65, 2.4], [0.6, 1.3, -0.4]], [[0.6, 1.6, 1.9], [0.6, 1.3, -0.4]]); else cl(s, k01(t, n0 - 0.2, d), [[0.6, 1.6, 1.9], [0.6, 1.3, -0.4]], [[0, 2.2, 3.6], [0, 1.2, -1.4]]);
      sp(s, 'dev', 0.15, -0.3, { view: 'q', dir: 1, expr: t > lineAt(L, 'DEV', 1).t0 ? 'scared' : 'grin', look: [0.5, 0], arms: [{ h: [0.4, 0.4], hand: 'grab' }, null], seed: 1 }, t, L, 'DEV', HT.dev);
      sp(s, 'tasha', 1.05, -0.2, { view: 'q', dir: -1, expr: 'frown', look: [-0.5, 0.1], seed: 4 }, t, L, 'TASHA', HT.tasha);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('BONUS 4: A FAKE SICK DAY ISN\'T FREE', 640, 110, pop(t, ph(L, 'bonus fourth')), YT), T('PTO · REPUTATION · RITA', 640, 620, pop(t, ph(L, 'paid time off')), RT)] }; } },
  { id: 'G43', f(t, d, L) { const s = gs('office7'); hideCards(s, ['rita', 'dev']); const g = Math.max(0, 8 - Math.floor(k01(t, 0.5, 4) * 8)); OFF(s, { grey: g, h: 9, m: 2 }); const r0 = lineAt(L, 'RITA').t0;
      if (t < r0 - 0.3) cl(s, k01(t, 0, r0), [[0.9, 1.9, -2.2], [1.7, 1.75, -4.5]], [[1.3, 1.85, -2.8], [1.7, 1.75, -4.5]]); else cl(s, k01(t, r0 - 0.3, d), [[-0.6, 1.75, 2.6], [-1.4, 1.35, -1.6]], [[-0.8, 1.7, 2.0], [-1.4, 1.35, -1.6]]);
      sp(s, 'rita', -2.6, -1.6, { view: 'q', dir: 1, expr: t > lineAt(L, 'RITA', 1).t0 ? 'smirk' : 'neutral', look: [0.5, 0], seed: 5 }, t, L, 'RITA', HT.rita);
      walkTo(s, 'dev', 0.8, -0.6, -2.7, t, r0 - 1.8, r0 + 0.2, { view: 'q', dir: -1, expr: t > lineAt(L, 'RITA', 1).t0 + 1.2 ? 'scared' : 'grin', look: [-0.5, 0], seed: 1 }, L, 'DEV', HT.dev);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('FRI · 9:02 AM', 300, 110, pop(t, 0.4), BT), T('GREY → GREEN', 980, 110, pop(t, ph(L, 'turning green')), GT)] }; } },
  { id: 'G44', f(t, d, L) { const s = gs('office7'); hideCards(s); OFF(s, { grey: 0 });
      cl(s, k01(t, 0, d), [[0, 1.9, 2.6], [0, 1.2, -2]], [[0, 3.2, 5.6], [0, 1.4, -3]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('1 GAME · 8 YEARS · ~$2.35B IN THE JAR', 640, 110, pop(t, 0.5), YT), T('DAY OFF, OR IN THE MEETING? ↓', 640, 620, pop(t, ph(L, 'did you take')), GT)] }; } },
  { id: 'G45', dur: 6.0, noBlurOut: true, f(t, d, L) { const s = gs('office7'); hideCards(s); OFF(s, { grey: 0 });
      cl(s, k01(t, 0, d), [[0, 3.2, 5.6], [0, 1.4, -3]], [[0, 3.4, 6.2], [0, 1.45, -3]]);
      return { scene: s.S, cam: s.C, vig: 0.8, tags: [] }; } },
];
