/* Finance with Stromi 09 (The Rubber Band): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig, post}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkX = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const mv = t > t0 && t < t1; c.set(x, z, mv ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0) * 1.3, h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03, size: 34 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(clamp(k, 0, 1)), a[0], b[0], a[1], b[1]);
const POINT = { h: [0.75, 0.95], hand: 'open' }, UP = { h: [0.35, 1.25], hand: 'open' }, HOLD = { h: [0.4, 0.55], hand: 'fist' }, CHIN = { h: [0.25, 1.05], hand: 'fist' }, CHEER = { h: [0.45, 1.45], hand: 'fist' }, WAVE = { h: [0.55, 1.35], hand: 'wave' }, SHRUG = { h: [0.55, 0.9], hand: 'open' };
const ex = (t, L, who, n, a, b) => (t > lineAt(L, who, n).t0 ? a : b);
const fadeOut = (t, d, a) => x => { const f = k01(t, d - a, d); if (f > 0) { x.save(); x.globalAlpha = f; x.fillStyle = '#060504'; x.fillRect(0, 0, W, H); x.restore(); } };
const flash = (t, a, col) => x => { const f = Math.max(0, 1 - Math.abs(t - a) / 0.25); if (f > 0) { x.save(); x.globalAlpha = 0.35 * f; x.fillStyle = col || '#fff'; x.fillRect(0, 0, W, H); x.restore(); } };
const shake = (s, t, a, amt) => { const k = Math.max(0, 1 - Math.abs(t - a) / 0.5) * (amt || 0.04); s.C.position.x += Math.sin(t * 60) * k; s.C.position.y += Math.cos(t * 53) * k; };

/* ---------- set helpers ---------- */
const KIT = (s, t, o) => { o = o || {}; const key = JSON.stringify(o.ph || {}); if (s._ph !== key) { s.phone.userData.sc.userData.draw(o.ph || {}); s._ph = key; } s.cat.userData.tail.rotation.z = 0.9 + 0.25 * Math.sin(t * 2.2);
  s.letter.visible = !!o.letters; s.letter2.visible = !!o.letters; s.note.visible = o.note !== undefined; s.fruit.visible = true; if (o.note && s._n !== o.note) { s.note.userData.draw({ n: o.note }); s._n = o.note; }
  if (o.cal && s._cal !== o.cal.d) { s.cal.userData.draw(o.cal); s._cal = o.cal.d; } s.clock.userData.set(o.hr || 6, o.mn || 2); };
const TOK9 = (s, t, o) => { o = o || {}; s.dial.userData.set(o.dial || 0, o.dialTxt); const k = JSON.stringify(o.board || 0); if (s._b !== k) { s.sb.userData.draw(o.board || { rows: [['NIKKEI 225', '+0.3%', '#3f9b5f'], ['TOPIX', '+0.2%', '#3f9b5f'], ['USD/JPY', '155.10']] }); s._b = k; }
  if (o.year && s._y !== o.year) { s.cal.userData.draw({ y: o.year }); s._y = o.year; } s.sign2.visible = !!o.bonds; s.pump.visible = s.meter.visible = !!o.energy; s.ptag.visible = !!o.ptag;
  if (o.energy) { const v = Math.round(o.energy); if (s._e !== v) { s.pd.userData.draw({ v: 150 + v }); s.md.userData.draw({ v: 9000 + v * 40 }); s.ptag.userData.draw({ t: YEN + (300 + v * 3) }); s._e = v; } }
  s.queue.forEach((q, i) => q.visible = i < (o.queue || 0)); s.kettle.rotation.z = o.pour ? -0.5 * o.pour : 0; };
const WAL = (s, t, o) => { o = o || {}; const k = JSON.stringify(o.tick || 0); if (s._tk !== k) { s.ticker.userData.draw(o.tick || { title: 'NEW YORK · NYSE · NASDAQ', clock: '09:31:00', rows: [['S&P 500', '+0.4%'], ['NASDAQ', '+0.6%'], ['10Y UST', '4.2%'], ['USD/JPY', '155.1']] }); s._tk = k; }
  const g = JSON.stringify(o.gap || 0); if (s._g !== g) { s.gap.userData.draw(o.gap || {}); s._g = g; } s.hot.visible = !!o.hot; s.hot.rotation.z = o.ring ? Math.sin(t * 40) * 0.08 : 0;
  const bl = o.warn ? (Math.sin(t * (o.warn > 1 ? 14 : 5)) > 0 ? 1 : 0.15) : 0.15; s.bulb.material.color.setRGB(bl, 0.2 * bl, 0.15 * bl); s.wlight.intensity = o.warn ? bl * 3 : 0; };
const MAR = (s, t, o) => { o = o || {}; s.big.forEach((c, i) => c.visible = i < (o.coins || 0)); s.bigL.visible = (o.coins || 0) > 0; if (s._n !== (o.chalk || 0)) { s.chalk.userData.draw({ n: o.chalk || 0 }); s._n = o.chalk || 0; }
  s.dpiv.rotation.y = Math.PI / 2 - (o.door || 0) * 1.3; s.ft.visible = !!o.sale; if (o.price && s._p !== o.price) { s.price.userData.draw({ v: o.price }); s._p = o.price; } s.own.scale.y = o.ownScale == null ? 1 : Math.max(0.01, o.ownScale); s.own.visible = (o.ownScale == null || o.ownScale > 0.02); };
const nPrice = (t, a, b) => Math.round(lerp(100, 42, k01(t, a, b)) + Math.sin(t * 9) * 1.5 * k01(t, a, b));

const ACTS = {};
/* ============ ACT 0: COLD OPEN ============ */
ACTS[0] = [
  { id: 'Y01', f(t, d, L) { const s = getSet('kitchen9'); hideCards(s, ['nora']); const n = lineAt(L, 'NORA').t0; const red = t > 3.2; KIT(s, t, { ph: { mode: red ? 'red' : 'green', bal: red ? '$' + Math.round(lerp(84210, 78990, k01(t, 3.2, n))).toLocaleString('en-US') : '$84,210', chg: red ? '-' + lerp(0.4, 6.2, k01(t, 3.2, n)).toFixed(1) + '% today' : '+0.4% today' }, cal: { m: 'AUGUST', d: '5', y: '2024' }, hr: 6, mn: 2 });
      const sp2 = k01(t, 6, 6.6); s.spoon.position.set(-0.05 - sp2 * 0.2, s.TY + 0.005 - 0.75 * sp2 * sp2, s.TZ - 0.05 + sp2 * 0.1); s.spoon.rotation.z = sp2 * 4; s.cat.rotation.y = 0.4 + 0.5 * k01(t, 5.6, 6.2);
      if (t < n - 1) cl(s, k01(t, 0, n - 1), [[1.6, 1.6, 0.8], [0.4, 1.0, -1.2]], [[0.9, 1.35, -0.2], [0.1, 0.85, -0.95]]); else cl(s, k01(t, n - 1, d), [[0.15, 1.15, -0.45], [0.05, 0.78, -0.9]], [[0.12, 1.05, -0.55], [0.05, 0.78, -0.9]]);
      sp(s, 'nora', 0.9, -1.25, { view: 'q', dir: -1, expr: t > n ? 'surprised' : (red ? 'scared' : 'sleepy'), arms: [HOLD, t > n ? UP : null], look: [-0.4, 0.4] }, t, L, 'NORA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('OHIO · MON 5 AUG 2024 · 6:02 AM', 640, 80, pop(t, 0.5) * (1 - k01(t, 7, 7.5)), BT), T('401(k): -6.2% BEFORE COFFEE', 640, 80, pop(t, 8) * (1 - k01(t, n - 0.6, n - 0.2)), RT)] }; } },
  { id: 'Y02', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['hana', 'chet']); const crash = ph(L, 'twelve point four'); const fall = k01(t, 1.0, crash);
      TOK9(s, t, { board: { title: 'TOKYO · MON 5 AUG 2024', rows: [['NIKKEI 225', '-' + (12.4 * fall).toFixed(1) + '%', '#ff5a4a', 0.16], ['TOPIX', '-' + (12.2 * fall).toFixed(1) + '%', '#ff5a4a'], ['USD/JPY', (147 - 5 * fall).toFixed(1)]] }, dial: 0.25 });
      cl(s, k01(t, 0, d * 0.55), [[-1.2, 2.2, 1.5], [-4.2, 3.0, -5]], [[-2.6, 2.8, -1.4], [-4.2, 3.1, -5]]); if (t > d * 0.55) cl(s, k01(t, d * 0.55, d), [[-2.6, 2.8, -1.4], [-4.2, 3.1, -5]], [[0.5, 1.8, 2.6], [-1.5, 1.6, -4]]); shake(s, t, crash, 0.03);
      sp(s, 'hana', 0.6, -3.75, { view: 'q', dir: -1, expr: t > crash ? 'surprised' : 'neutral', look: [-0.6, 0.4], arms: [HOLD, null] }, t, L, '', 1.6, 0.35);
      sp(s, 'chet', 2.1, -2.3, { view: 'q', dir: -1, expr: t > crash ? 'scared' : 'neutral', look: [-0.7, 0.5], arms: [t > crash ? UP : null, null] }, t, L, '', 1.8);
      return { scene: s.S, cam: s.C, post: flash(t, crash), tags: [T('TOKYO · SAME MOMENT', 640, 80, pop(t, 0.4) * (1 - k01(t, 5, 5.5)), BT), T('NO WAR · NO QUAKE · NO PANDEMIC', 640, 80, pop(t, ph(L, 'no war')) * (1 - k01(t, ph(L, 'the trigger') - 0.3, ph(L, 'the trigger'))), YT), T('THE TRIGGER: A TINY RATE CHANGE', 640, 80, pop(t, ph(L, 'the trigger')), RT)] }; } },
  { id: 'Y03', f(t, d, L) { const s = getSet('band9'); hideCards(s, ['chet', 'dot9']); const snap = ph(L, 'snapped back'), again = ph(L, 'stretched again'); const c = lineAt(L, 'CHET').t0;
      const st = t < snap ? lerp(0.6, 1, k01(t, 0, snap)) : (t < again ? lerp(1, 0.25, k01(t, snap, snap + 0.5)) : lerp(0.25, 1, E(k01(t, again - 0.3, again + 1.5)))); s.bandSet(st, 0, t < snap ? 0.15 + 0.5 * k01(t, snap - 2, snap) : (t > again ? 0.25 : 0), t);
      s.towers.forEach((g, i) => s.topple(i, (t > snap && t < again) ? k01(t, snap + 0.1 * i, snap + 0.6 + 0.1 * i) : 0));
      cl(s, k01(t, 0, d), [[0, 3.6, 3.4], [0, 0.9, -0.8]], [[0.6, 2.3, 2.0], [0.3, 1.0, -0.9]]); if (Math.abs(t - snap) < 0.5) shake(s, t, snap, 0.05);
      sp(s, 'chet', 2.9, -2.1, { view: 'q', dir: -1, expr: 'sly', arms: [null, SHRUG] }, t, L, 'CHET', 1.8);
      sp(s, 'dot9', -2.7, -2.0, { view: 'q', dir: 1, expr: t > lineAt(L, 'DOT').t0 ? 'angry' : 'neutral', arms: [null, t > lineAt(L, 'DOT').t0 ? POINT : null] }, t, L, 'DOT', 1.2);
      return { scene: s.S, cam: s.C, post: flash(t, snap, '#ffd8c0'), tags: [T('THE RUBBER BAND', 640, 80, pop(t, 0.6) * (1 - k01(t, snap - 0.5, snap)), YT), T('SNAP: 5 AUG 2024', 640, 80, pop(t, snap) * (1 - k01(t, again - 0.4, again)), RT), T('STRETCHED AGAIN · 2026', 640, 80, pop(t, again) * (1 - k01(t, c - 0.4, c)), RT)] }; } },
  { id: 'Y04', card: 'The Rubber Band', sub: "The money trick that crashed Japan in a day, and why it's back" },
];
/* ============ ACT 1: FREE MONEY ============ */
ACTS[1] = [
  { id: 'Y05', card: '1. Free Money' },
  { id: 'Y06', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['hana', 'kenji', 'pip9']); const h = lineAt(L, 'HANA').t0; const yrs = ['2016', '2016', '2019', '2022'];
      TOK9(s, t, { dial: 0, year: t < ph(L, 'twenty sixteen') ? '2010' : '2016' }); s.dial.userData.set(t > ph(L, 'below zero') && t < h ? -0.0 : 0, t > ph(L, 'below zero') && t < h ? '-0.1' : '0');
      if (t < h) cl(s, k01(t, 0, h), [[0, 2.0, 4.0], [0, 1.4, -3.6]], [[-0.4, 1.7, 1.6], [-0.2, 1.3, -3.6]]); else cl(s, k01(t, h, d), [[1.8, 1.55, -0.6], [0.2, 1.3, -3.6]], [[1.3, 1.5, -1.0], [0.4, 1.3, -3.6]]);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: 1, expr: 'happy', arms: [t > h ? POINT : HOLD, null] }, t, L, 'HANA', 1.6, 0.35);
      sp(s, 'kenji', -1.25, -3.05, { view: 'q', dir: 1, expr: 'sleepy', arms: [HOLD, HOLD] }, t, L, 'KENJI', 1.45);
      walkX(s, 'pip9', 3.5, 1.4, -2.55, t, h - 2.5, h - 0.3, { view: 'q', dir: -1, expr: ex(t, L, 'PIP', 1, 'surprised', 'neutral'), arms: [null, null] }, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('JAPAN: ~30 YEARS OF ALMOST-ZERO RATES', 640, 80, pop(t, 0.8) * (1 - k01(t, ph(L, 'twenty sixteen') - 0.3, ph(L, 'twenty sixteen'))), BT), T('2016: BELOW ZERO (-0.1%)', 640, 80, pop(t, ph(L, 'twenty sixteen')) * (1 - k01(t, h - 0.5, h)), RT), T('CHEAPEST MONEY ON EARTH', 640, 80, pop(t, ph(L, 'cheapest')) * (1 - k01(t, h - 0.5, h)), YT)] }; } },
  { id: 'Y07', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['hana', 'kenji']); const yrs = ['2016', '2019', '2022', '2024']; const yi = Math.min(3, Math.floor(t / (d / 4)));
      TOK9(s, t, { dial: 0, year: yrs[yi] }); const tug = Math.max(0, Math.sin(t * 7)) * k01(t, 0.3, 1.2) * (1 - k01(t, 2.2, 2.6));
      cl(s, k01(t, 0, d), [[-0.2, 1.5, -0.8], [-1.4, 1.2, -3.2]], [[-0.6, 1.4, -1.3], [-1.3, 1.1, -3.2]]);
      sp(s, 'kenji', -1.25, -3.05, { view: 'q', dir: -1, expr: t > lineAt(L, 'KENJI', 1).t0 ? 'sleepy' : (tug > 0.2 ? 'angry' : 'neutral'), arms: [{ h: [0.75, 1.15 + 0.1 * tug], hand: 'fist' }, t > lineAt(L, 'KENJI', 1).t0 ? HOLD : { h: [0.7, 1.1], hand: 'fist' }], lean: -0.1 * tug }, t, L, 'KENJI', 1.45);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: -1, expr: 'happy', look: [-0.6, 0], arms: [HOLD, null] }, t, L, 'HANA', 1.6, 0.35);
      return { scene: s.S, cam: s.C, tags: [T(yrs[yi], 1080, 150, pop(t, yi * d / 4), YT), T('THE DIAL DOESN\'T MOVE', 640, 80, pop(t, 0.5), BT)] }; } },
  { id: 'Y08', f(t, d, L) { const s = getSet('wall9'); hideCards(s, ['chet']); const sw = ph(L, 'swaps it'), buys = ph(L, 'buys american'), c = lineAt(L, 'CHET').t0;
      WAL(s, t, { tick: { title: 'NEW YORK', clock: '10:02:11', rows: [['U.S. BONDS', '4.4%'], ['BIG TECH', 'UP'], ['S&P 500', 'UP'], ['USD/JPY', '155.1']] } });
      const cx = t < sw ? lerp(-3.5, 2.6, E(k01(t, 0.4, sw - 0.3))) : (t < buys ? 2.6 : lerp(2.6, 0.2, E(k01(t, buys, buys + 2.4))));
      s.caseY.visible = t < sw + 0.4; s.caseD.visible = t >= sw + 0.4 && t < buys + 2.6; s.caseY.position.set(cx + 0.35, 0.45, -1.45); s.caseD.position.set(cx + 0.35, 0.45, -1.45);
      const mv = (t > 0.4 && t < sw - 0.3) || (t > buys && t < buys + 2.4); const c1 = card(s, 'chet', 1.8); c1.set(cx, -1.6, mv ? slidePose(t, t < sw ? 1 : -1, 1.5, 1.8) : pose({ view: 'q', dir: 1, expr: t > c ? 'sly' : 'happy', arms: [HOLD, t > c ? POINT : null] }, t, L, 'CHET'), s.C);
      cl(s, k01(t, 0, d), [[0, 2.0, 3.6], [0.6, 1.4, -2.5]], [[1.8, 1.7, 1.6], [1.4, 1.3, -2.5]]);
      return { scene: s.S, cam: s.C, tags: [T('BORROW YEN AT ~0%', 640, 80, pop(t, 1) * (1 - k01(t, sw - 0.3, sw)), RT), T(YEN + ' → $', 640, 80, pop(t, sw) * (1 - k01(t, buys - 0.3, buys)), YT), T('BUY: US BONDS 4-5% · BIG TECH', 640, 80, pop(t, buys) * (1 - k01(t, ph(L, 'carry trade') - 0.4, ph(L, 'carry trade'))), GT), T('= THE CARRY TRADE', 640, 80, pop(t, ph(L, 'carry trade')), YT)] }; } },
  { id: 'Y09', f(t, d, L) { const s = getSet('band9'); hideCards(s, ['dot9', 'gus9']); const dt = lineAt(L, 'DOT').t0; s.bandSet(lerp(0.3, 1, E(k01(t, 0.5, dt))), 0, 0.08, t); s.towers.forEach((g, i) => s.topple(i, 0));
      cl(s, k01(t, 0, d), [[-1.5, 2.4, 1.8], [0, 0.95, -0.8]], [[1.2, 2.0, 1.4], [0.3, 0.95, -0.9]]);
      sp(s, 'dot9', -2.2, -1.6, { view: 'q', dir: 1, expr: t > dt ? 'surprised' : 'neutral', arms: [{ h: [0.8, 0.85], hand: 'fist' }, null] }, t, L, 'DOT', 1.2);
      sp(s, 'gus9', 2.3, -1.8, { view: 'q', dir: -1, expr: ex(t, L, 'GUS', 1, 'sly', 'neutral'), arms: [null, t > lineAt(L, 'GUS', 1).t0 ? { h: [0.55, 0.85], hand: 'pinch' } : null] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('HEDGE FUNDS · BANKS · TRADERS', 640, 80, pop(t, 0.8) * (1 - k01(t, ph(L, 'nobody knows') - 0.3, ph(L, 'nobody knows'))), BT), T('SIZE: NOBODY KNOWS', 640, 80, pop(t, ph(L, 'nobody knows')) * (1 - k01(t, dt - 0.4, dt)), YT)] }; } },
  { id: 'Y10', f(t, d, L) { const s = getSet('wall9'); hideCards(s, ['chet', 'pip9']); const p = lineAt(L, 'PIP').t0, c = lineAt(L, 'CHET').t0; const jump = ph(L, 'the day the yen jumps');
      WAL(s, t, { warn: t > jump ? 2 : 1, tick: { title: 'NEW YORK', clock: '14:20:05', rows: [['USD/JPY', (155 - (t > jump ? 3 * k01(t, jump, jump + 1) : 0)).toFixed(1)], ['PROFIT', '+$' + Math.round(1000 + t * 40)], ['YEN RISK', t > jump ? 'HIGH' : 'low'], ['', '']] } });
      if (t < p - 0.5) cl(s, k01(t, 0, p - 0.5), [[0.1, 1.35, -1.0], [-0.4, 0.95, -2.6]], [[-0.4, 1.2, -1.6], [-0.8, 0.85, -2.8]]); else cl(s, k01(t, p - 0.5, d), [[1.5, 1.6, 1.4], [0, 1.1, -2]], [[1.2, 1.5, 1.0], [0, 1.1, -2]]);
      sp(s, 'chet', 0.5, -1.65, { view: 'q', dir: -1, expr: t > c ? 'sly' : 'happy', arms: [t > c ? SHRUG : null, null] }, t, L, 'CHET', 1.8);
      sp(s, 'pip9', -1.6, -1.4, { view: 'q', dir: 1, expr: 'surprised', arms: [null, t > p ? POINT : null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('BORROWED YEN = OWES YEN', 640, 80, pop(t, 1) * (1 - k01(t, jump - 0.4, jump)), BT), T('YEN JUMPS → TRICK BITES', 640, 80, pop(t, jump) * (1 - k01(t, p - 0.4, p)), RT)] }; } },
];
/* ============ ACT 2: THE MULTIPLIER ============ */
ACTS[2] = [
  { id: 'Y11', card: '2. The Multiplier' },
  { id: 'Y12', f(t, d, L) { const s = getSet('margin9'); hideCards(s, ['chet']); const ten = ph(L, 'ten to one'); const c = lineAt(L, 'CHET').t0; const n = Math.round(10 * k01(t, ten, ten + 2));
      MAR(s, t, { coins: n }); s.coinL.userData.draw({ t: 'YOU: $1,000' }); if (n > 0 && s._bl !== n) { s.bigL.userData.draw({ t: 'POSITION: $' + (n * 1000).toLocaleString('en-US') }); s._bl = n; }
      cl(s, k01(t, 0, d), [[0.5, 1.9, 2.0], [-0.6, 1.2, -2.4]], [[-0.3, 1.55, 0.2], [-0.4, 1.1, -2.4]]);
      sp(s, 'chet', -1.9, -1.65, { view: 'q', dir: 1, expr: t > c ? 'love' : 'happy', arms: [t > c ? CHEER : null, null] }, t, L, 'CHET', 1.8);
      return { scene: s.S, cam: s.C, tags: [T('LEVERAGE = BORROWING ON TOP', 640, 80, pop(t, 0.8) * (1 - k01(t, ten - 0.4, ten)), BT), T('$1,000 CONTROLS $10,000', 640, 80, pop(t, ten + 1), YT)] }; } },
  { id: 'Y13', f(t, d, L) { const s = getSet('margin9'); hideCards(s); const a = ph(L, 'rises five'), b = ph(L, 'works the same way'), c = ph(L, 'ten percent drop'); const n = t < a ? 0 : t < b ? 1 : t < c ? 2 : 3;
      MAR(s, t, { coins: 10, chalk: n, ownScale: t < b ? 1 : t < c ? 0.5 : 1 - k01(t, c, c + 0.8) }); if (s._bl !== 'P') { s.bigL.userData.draw({ t: 'POSITION: $10,000' }); s._bl = 'P'; }
      if (t < c - 1.5) cl(s, k01(t, 0, c - 1.5), [[1.6, 1.9, -0.8], [3.2, 1.9, -4]], [[2.2, 1.95, -1.6], [3.2, 1.9, -4]]); else cl(s, k01(t, c - 1.5, d), [[-0.6, 1.5, -1.0], [-1.0, 1.1, -2.2]], [[-0.9, 1.35, -1.4], [-1.0, 1.1, -2.2]]);
      return { scene: s.S, cam: s.C, tags: [T('+5% → +50% FOR YOU', 640, 80, pop(t, a + 0.5) * (1 - k01(t, b - 0.3, b)), GT), T('-5% → -50%', 640, 80, pop(t, b + 1) * (1 - k01(t, c - 0.3, c)), RT), T('-10% → ALL GONE', 640, 80, pop(t, c + 0.3), RT)] }; } },
  { id: 'Y14', f(t, d, L) { const s = getSet('margin9'); hideCards(s, ['chet', 'brick']); const b0 = lineAt(L, 'BRICK').t0; MAR(s, t, { coins: 10, door: E(k01(t, 0.2, 1.2)), ownScale: 0 });
      const bx = walkX(s, 'brick', -5.0, -3.2, -0.5, t, 0.8, b0 - 0.2, { view: 'q', dir: 1, expr: 'neutral', arms: [{ h: [0.6, 1.0], hand: 'fist' }, null] }, L, 'BRICK', 2.2);
      cl(s, k01(t, 0, d), [[0.8, 1.7, 2.4], [-2.6, 1.3, -1.2]], [[0.3, 1.6, 1.4], [-2.4, 1.3, -1.3]]);
      sp(s, 'chet', -1.6, -1.65, { view: 'q', dir: -1, expr: t > lineAt(L, 'BRICK', 2).t0 ? 'scared' : 'surprised', arms: [t > lineAt(L, 'CHET', 1).t0 ? UP : null, null] }, t, L, 'CHET', 1.8);
      return { scene: s.S, cam: s.C, tags: [T('MARGIN CALL', 640, 80, pop(t, b0), RT)] }; } },
  { id: 'Y15', f(t, d, L) { const s = getSet('margin9'); hideCards(s, ['brick']); const loop = ph(L, 'selling pushes'); MAR(s, t, { coins: 0, sale: true, ownScale: 0, price: nPrice(t, 2, d - 1) });
      s.certs.forEach((c, i) => c.visible = t < 2 + i * 1.6 || i > 5); s.sale.userData.draw({ t: t > loop ? 'EVERYTHING MUST GO' : 'FIRE SALE' });
      cl(s, k01(t, 0, d), [[0.6, 1.8, 2.6], [3.0, 1.1, -0.6]], [[1.4, 1.9, 2.6], [3.2, 1.4, -0.6]]);
      sp(s, 'brick', 3.2, -1.2, { view: 'q', dir: 1, expr: 'neutral', arms: [{ h: [0.7, 0.8 + 0.1 * Math.sin(t * 3)], hand: 'open' }, null] }, t, L, '', 2.2);
      return { scene: s.S, cam: s.C, tags: [T('SOLD FOR YOU · FAST · ANY PRICE', 640, 80, pop(t, 0.6) * (1 - k01(t, loop - 0.4, loop)), RT), T('SELL → LOWER → MORE CALLS → SELL', 640, 80, pop(t, loop), YT)] }; } },
];
/* ============ ACT 3: BLACK MONDAY ============ */
ACTS[3] = [
  { id: 'Y16', card: '3. Black Monday, Tokyo Edition' },
  { id: 'Y17', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['kenji', 'hana']); const nudge = ph(L, 'quarter of one percent'); const k = lineAt(L, 'KENJI').t0;
      const v = t < ph(L, 'march') ? 0 : t < nudge ? 0.1 : lerp(0.1, 0.25, E(k01(t, nudge, nudge + 1.2))); TOK9(s, t, { dial: v, dialTxt: t < ph(L, 'march') ? '-0.1' : (t < nudge ? '0.1' : '0.25'), year: '2024' });
      if (t < k) cl(s, k01(t, 0, k), [[-0.4, 1.9, 0.4], [-1.6, 1.4, -3.2]], [[-1.0, 1.55, -1.4], [-1.65, 1.4, -3.2]]); else cl(s, k01(t, k, d), [[0.6, 1.6, 0.2], [-0.4, 1.3, -3.4]], [[0.3, 1.5, -0.3], [-0.4, 1.3, -3.4]]);
      const eff = Math.max(0, Math.sin(t * 6)) * k01(t, nudge - 1.5, nudge) * (1 - k01(t, nudge, nudge + 0.3));
      sp(s, 'kenji', -1.25, -3.05, { view: 'q', dir: -1, expr: t > lineAt(L, 'KENJI', 1).t0 ? 'angry' : (t > nudge ? 'happy' : 'neutral'), arms: [{ h: [0.75, 1.15 + 0.1 * eff], hand: 'fist' }, t > lineAt(L, 'KENJI', 1).t0 ? UP : null], lean: -0.12 * eff }, t, L, 'KENJI', 1.45);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: -1, expr: t > nudge ? 'surprised' : 'neutral', arms: [HOLD, null], look: [-0.7, 0] }, t, L, 'HANA', 1.6, 0.35);
      return { scene: s.S, cam: s.C, tags: [T('MAR 2024: NEGATIVE RATES END', 640, 80, pop(t, ph(L, 'march')) * (1 - k01(t, nudge - 0.3, nudge)), BT), T('31 JUL 2024: → 0.25%', 640, 80, pop(t, nudge) * (1 - k01(t, k - 0.4, k)), YT)] }; } },
  { id: 'Y18', f(t, d, L) { const s = getSet('wall9'); hideCards(s, ['chet', 'pip9']); const fri = ph(L, 'friday'), bet = ph(L, 'traders suddenly'), c = lineAt(L, 'CHET').t0; const g = k01(t, bet, c - 1);
      WAL(s, t, { warn: t > bet ? 2 : 1, gap: { us: 5.33 - 0.9 * g, jp: 0.1 + 0.15 * g }, tick: { title: 'FRI 2 AUG 2024 · JOBS REPORT', clock: '08:30:00', rows: [['UNEMPLOYMENT', t > fri + 1 ? '4.3%' : '...'], ['FED CUT ODDS', t > bet ? 'HIGH' : 'low'], ['USD/JPY', (147 - 3 * g).toFixed(1)], ['YEN', t > bet ? 'UP' : '']] } });
      if (t < c - 1) cl(s, k01(t, 0, c - 1), [[-0.6, 2.2, -1.2], [0, 2.6, -5]], [[0.4, 2.3, -2.0], [0, 2.7, -5]]); else cl(s, k01(t, c - 1, d), [[1.6, 1.6, 1.2], [0, 1.1, -2]], [[1.0, 1.5, 0.6], [0, 1.1, -2]]);
      sp(s, 'chet', 0.5, -1.65, { view: 'q', dir: -1, expr: t > c ? 'scared' : 'surprised', arms: [t > c ? SHRUG : null, null] }, t, L, 'CHET', 1.8);
      sp(s, 'pip9', -1.6, -1.4, { view: 'q', dir: 1, expr: 'sly', arms: [null, null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('JAPAN UP · U.S. EXPECTED DOWN', 640, 80, pop(t, bet + 1) * (1 - k01(t, c - 0.5, c)), YT), T('THE GAP SHRINKS', 640, 80, pop(t, c), RT)] }; } },
  { id: 'Y19', f(t, d, L) { const s = getSet('band9'); hideCards(s, []); const snap = ph(L, 'the band snapped'), yn = ph(L, 'the yen shot up'), r = ph(L, 'one hundred sixty-two');
      const st = t < snap ? lerp(1, 0.75, k01(t, 0, snap)) : lerp(0.75, 0.15, E(k01(t, snap, snap + 0.6))); s.bandSet(st, t > snap ? k01(t, snap, snap + 0.6) * 0.5 : 0, 0.3 * k01(t, yn, yn + 1), t);
      s.towers.forEach((g, i) => s.topple(i, k01(t, yn + i * 0.7, yn + 0.8 + i * 0.7)));
      cl(s, k01(t, 0, d), [[2.4, 2.6, 2.4], [0.8, 0.95, -0.8]], [[-1.6, 2.2, 2.0], [-0.4, 0.95, -0.8]]); shake(s, t, snap, 0.05);
      return { scene: s.S, cam: s.C, post: flash(t, snap, '#ffd8c0'), tags: [T('SELL STOCKS · SELL CRYPTO · BUY YEN', 640, 80, pop(t, 0.6) * (1 - k01(t, r - 0.3, r)), RT), T('$1 = ' + YEN + '162 → ' + YEN + '142', 640, 80, pop(t, r) * (1 - k01(t, snap - 0.3, snap)), YT), T('SNAP', 640, 80, pop(t, snap), RT)] }; } },
  { id: 'Y20', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['kenji', 'hana']); const k = lineAt(L, 'KENJI').t0; const v = ph(L, 'vix'), sp5 = ph(L, 'three percent'), bt = ph(L, 'bitcoin');
      TOK9(s, t, { dial: 0.25, dialTxt: '0.25', year: '2024', board: { title: 'MON 5 AUG 2024 · CLOSE', rows: [['NIKKEI 225', '-12.4%', '#ff5a4a', 0.16], ['VIX (U.S.)', t > v ? '~65' : '..', '#ff5a4a'], ['S&P 500', t > sp5 ? '-3.0%' : '..', '#ff5a4a'], ['BITCOIN', t > bt ? 'WAY DOWN' : '..', '#ff5a4a']] } });
      if (t < k) cl(s, k01(t, 0, k), [[-2.6, 3.0, -1.2], [-4.2, 3.0, -5]], [[-3.0, 3.0, -2.2], [-4.2, 3.0, -5]]); else cl(s, k01(t, k, d), [[0.2, 1.6, 0.0], [-0.6, 1.3, -3.4]], [[-0.1, 1.5, -0.5], [-0.6, 1.3, -3.4]]);
      const fan = Math.sin(t * 20) * 0.15;
      sp(s, 'kenji', -1.25, -3.05, { view: 'q', dir: 1, expr: 'scared', arms: [{ h: [0.55, 1.2 + fan], hand: 'open' }, null] }, t, L, 'KENJI', 1.45);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: -1, expr: 'sly', arms: [HOLD, null], look: [-0.7, 0] }, t, L, 'HANA', 1.6, 0.35);
      return { scene: s.S, cam: s.C, tags: [T('TRILLIONS GONE (ON PAPER) IN HOURS', 640, 80, pop(t, ph(L, 'trillions')) * (1 - k01(t, k - 0.4, k)), RT)] }; } },
  { id: 'Y21', f(t, d, L) { const s = getSet('kitchen9'); hideCards(s, ['nora']); const tw = ph(L, 'the twist'), n = lineAt(L, 'NORA').t0, n2 = lineAt(L, 'N', 1).t0;
      KIT(s, t, { ph: t < tw + 2 ? { mode: 'red', bal: '$78,990', chg: '-6.2%' } : { mode: 'green', bal: '$83,870', chg: '+10% NIKKEI · BOUNCE' }, cal: { m: 'AUGUST', d: '6', y: '2024' }, hr: 7, mn: 10 });
      s.cat.position.set(-0.45, s.TY + 0.02, s.TZ + 0.15); s.cat.rotation.y = 1.2; s.cat.scale.setScalar(0.85);
      if (t < n) cl(s, k01(t, 0, n), [[0.15, 1.15, -0.45], [0.05, 0.78, -0.9]], [[0.9, 1.45, 0.2], [0.4, 1.0, -1.1]]); else cl(s, k01(t, n, d), [[1.6, 1.6, 0.8], [0.6, 1.1, -1.2]], [[1.2, 1.5, 0.5], [0.6, 1.1, -1.2]]);
      if (t < n) hideCards(s); else sp(s, 'nora', 0.9, -1.25, { view: 'q', dir: -1, expr: t > n ? 'happy' : 'scared', arms: [t < tw + 2 ? { h: [0.3, 1.25], hand: 'open' } : HOLD, t > n ? SHRUG : null], look: [-0.3, 0.3] }, t, L, 'NORA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('TUESDAY: NIKKEI +10%', 640, 80, pop(t, tw + 1) * (1 - k01(t, n - 0.4, n)), GT), T('THE SCARY PART: HOW LITTLE IT TOOK', 640, 80, pop(t, ph(L, 'the scary part')), YT)] }; } },
];
/* ============ ACT 4: STRETCHED AGAIN ============ */
ACTS[4] = [
  { id: 'Y22', card: '4. Stretched Again' },
  { id: 'Y23', f(t, d, L) { const s = getSet('band9'); hideCards(s, ['chet', 'brick']); const c = lineAt(L, 'CHET').t0, b = lineAt(L, 'BRICK').t0; s.bandSet(lerp(0.2, 1, E(k01(t, 1, c - 2))), 0, 0.06, t); s.towers.forEach((g, i) => s.topple(i, 1 - k01(t, 0.5 + i * 0.4, 1.5 + i * 0.4)));
      cl(s, k01(t, 0, d), [[0, 3.4, 3.0], [0, 0.9, -0.8]], [[-0.8, 2.2, 1.8], [0.2, 1.0, -1.0]]);
      sp(s, 'chet', 2.9, -2.1, { view: 'q', dir: -1, expr: 'laugh', arms: [t > c ? CHEER : null, null] }, t, L, 'CHET', 1.8);
      sp(s, 'brick', -3.0, -2.4, { view: 'q', dir: 1, expr: 'neutral', arms: [null, null] }, t, L, 'BRICK', 2.2);
      return { scene: s.S, cam: s.C, tags: [T('BOJ: 1% BY JUNE 2026', 640, 80, pop(t, ph(L, 'one percent')) * (1 - k01(t, ph(L, 'as of march') - 0.3, ph(L, 'as of march'))), BT), T('YEN BORROWING ABROAD: RECORD (JEFFERIES/BIS)', 640, 80, pop(t, ph(L, 'as of march')) * (1 - k01(t, c - 0.4, c)), RT)] }; } },
  { id: 'Y24', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['hana', 'gus9']); const h = lineAt(L, 'HANA').t0; TOK9(s, t, { dial: 1, dialTxt: '1.0', year: '2026', energy: 60 * k01(t, ph(L, 'expensive fuel'), h), ptag: true, board: { title: 'JULY 2026', rows: [['USD/JPY', (158 + 6 * k01(t, 1, ph(L, 'forty years'))).toFixed(1), '#ff5a4a', 0.16], ['YEN', '40-YR LOW', '#ff5a4a'], ['ENERGY IMPORTS', '~87%']] } });
      if (t < h - 1) cl(s, k01(t, 0, h - 1), [[-1.0, 2.4, -0.4], [-4.2, 3.0, -5]], [[1.8, 1.7, -0.2], [3.2, 1.0, -3.0]]); else cl(s, k01(t, h - 1, d), [[1.4, 1.6, 0.4], [0.8, 1.25, -3.6]], [[1.0, 1.6, 0.0], [0.8, 1.25, -3.6]]);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: 1, expr: 'sad', arms: [HOLD, null] }, t, L, 'HANA', 1.6, 0.35);
      sp(s, 'gus9', 2.3, -2.9, { view: 'q', dir: -1, expr: 'sad', arms: [null, null] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('YEN TOO WEAK', 640, 80, pop(t, 0.6) * (1 - k01(t, ph(L, 'imports') - 0.3, ph(L, 'imports'))), RT), T('JAPAN IMPORTS ~9/10 OF ITS ENERGY', 640, 80, pop(t, ph(L, 'imports')) * (1 - k01(t, h - 0.4, h)), YT)] }; } },
  { id: 'Y25', f(t, d, L) { const s = getSet('vault9'); hideCards(s, ['pip9', 'gus9']); const p = lineAt(L, 'PIP').t0, m = ph(L, 'in may alone'); s.dollars.forEach(c => c.visible = false); s.golds.forEach(g => g.visible = false); s.labD.visible = s.labG.visible = false; s.safe.visible = true; s.safe.position.set(0.2, 0, -4.6);
      s.tFolders.forEach((tr, i) => { tr.visible = true; tr.position.set(lerp(0.9 + i * 0.4, 3.0 + i * 0.8, E(k01(t, 1.5 + i * 1.2, m + 1 + i))), 0, -3.6 + i * 0.7); });
      if (s._c !== 'J') { s.counter.userData.draw({ t: 'JAPAN MOF' }); s._c = 'J'; }
      cl(s, k01(t, 0, d), [[-0.6, 2.0, 2.2], [-0.2, 1.0, -3.6]], [[0.6, 1.9, 2.0], [0.4, 1.0, -3.6]]);
      sp(s, 'pip9', -1.6, -2.3, { view: 'q', dir: 1, expr: t > p ? 'surprised' : 'neutral', arms: [null, t > p ? POINT : null] }, t, L, 'PIP', 1.1);
      sp(s, 'gus9', -2.3, -3.0, { view: 'q', dir: 1, expr: ex(t, L, 'GUS', 1, 'sly', 'neutral'), arms: [null, null] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('APR-MAY 2026: ' + YEN + '11.7 TRILLION SPENT ON YEN', 640, 80, pop(t, 1) * (1 - k01(t, m - 0.3, m)), BT), T('JAPAN\'S U.S. TREASURIES: -$66.7B IN MAY', 640, 80, pop(t, m) * (1 - k01(t, p - 0.4, p)), RT)] }; } },
  { id: 'Y26', f(t, d, L) { const s = getSet('wall9'); hideCards(s, ['chet', 'brick']); const j = ph(L, 'july thirty-first'), c = lineAt(L, 'CHET').t0, b = lineAt(L, 'BRICK').t0;
      WAL(s, t, { hot: true, ring: t < c && t > 0.5, tick: { title: '31 JULY 2026 · JOINT INTERVENTION', clock: '11:04:00', rows: [['JAPAN', 'BUYS YEN'], ['U.S. TREASURY', t > j ? 'BUYS YEN' : '...'], ['FIRST SINCE', '1998'], ['USD/JPY', (164 - 4 * k01(t, j, j + 3)).toFixed(1)]] } });
      if (t < c - 1) cl(s, k01(t, 0, c - 1), [[0.9, 1.25, -1.6], [0.55, 0.85, -2.75]], [[0.2, 2.4, 1.6], [0, 2.6, -5]]); else cl(s, k01(t, c - 1, d), [[1.6, 1.6, 1.2], [-0.4, 1.2, -2]], [[1.1, 1.5, 0.6], [-0.4, 1.2, -2]]);
      if (t >= c - 1) sp(s, 'chet', 0.5, -1.65, { view: 'q', dir: -1, expr: 'surprised', arms: [UP, null] }, t, L, 'CHET', 1.8); else card(s, 'chet').mesh.visible = card(s, 'chet').shadow.visible = false;
      walkX(s, 'brick', -4.0, -1.7, -1.5, t, c - 2.2, c - 0.2, { view: 'q', dir: 1, expr: 'neutral', arms: [null, t > b ? POINT : null] }, L, 'BRICK', 2.2);
      return { scene: s.S, cam: s.C, tags: [T('U.S. SHARE: ~$0.5B (SMALL)', 640, 80, pop(t, ph(L, 'america\'s share')) * (1 - k01(t, ph(L, 'the signal') - 0.3, ph(L, 'the signal'))), YT), T('SIGNAL: DON\'T SELL MORE TREASURIES', 640, 80, pop(t, ph(L, 'washington did not')) * (1 - k01(t, c - 0.4, c)), RT)] }; } },
  { id: 'Y27', f(t, d, L) { const s = getSet('band9'); hideCards(s, ['dot9', 'gus9']); const dt = lineAt(L, 'DOT').t0; s.bandSet(lerp(1, 0.8, k01(t, 1, 3)), 0, 0.45 * (0.5 + 0.5 * Math.sin(t * 1.3)), t); s.towers.forEach((g, i) => { s.topple(i, 0); g.rotation.z = 0.06 * Math.sin(t * 6 + i); });
      cl(s, k01(t, 0, d), [[1.6, 2.2, 1.6], [0.2, 0.95, -0.8]], [[-0.4, 2.0, 1.2], [0, 1.0, -1.0]]);
      sp(s, 'dot9', -2.75, -1.6, { view: 'q', dir: 1, expr: 'scared', arms: [UP, null] }, t, L, 'DOT', 1.2);
      sp(s, 'gus9', 2.9, -2.0, { view: 'q', dir: -1, expr: 'sly', arms: [null, null] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('8 SEP 2026: $1 = ' + YEN + '152.89', 640, 80, pop(t, 1) * (1 - k01(t, ph(L, 'state street') - 0.3, ph(L, 'state street'))), RT), T('"NO LONGER A FREE LUNCH" (STATE STREET, VIA REUTERS)', 640, 80, pop(t, ph(L, 'state street')) * (1 - k01(t, dt - 0.4, dt)), YT)] }; } },
];
/* ============ ACT 5: AMERICA'S BILL ============ */
ACTS[5] = [
  { id: 'Y28', card: "5. America's Bill" },
  { id: 'Y29', f(t, d, L) { const s = getSet('capitol9'); hideCards(s, ['pip9', 'gus9']); const p = lineAt(L, 'PIP').t0; s.lad.visible = true; const v = 39998000000000 + t * 2300000000 * 6; if (s._v !== Math.floor(t * 8)) { s.clock.userData.draw({ v }); s._v = Math.floor(t * 8); }
      if (t < p) cl(s, k01(t, 0, p), [[0, 1.8, 2.4], [0, 3.6, -6]], [[0.4, 2.6, -1.0], [0.4, 3.7, -6]]); else cl(s, k01(t, p, d), [[3.8, 2.4, -3.6], [2.3, 2.6, -7.2]], [[3.3, 2.5, -4.2], [2.3, 2.8, -7.2]]);
      sp(s, 'pip9', 2.4, -6.95, { view: 'q', dir: -1, expr: t > p ? 'surprised' : 'neutral', arms: [{ h: [0.6, 1.4], hand: 'open' }, { h: [0.4, 1.2], hand: 'fist' }] }, t, L, 'PIP', 1.1, 1.3);
      sp(s, 'gus9', 3.6, -5.6, { view: 'q', dir: -1, expr: 'sly', arms: [null, HOLD] }, t, L, 'GUS', 1.75);
      return { scene: s.S, cam: s.C, tags: [T('AUG 2026: DEBT PASSES $40 TRILLION', 640, 80, pop(t, 0.6) * (1 - k01(t, ph(L, 'deficit') - 0.3, ph(L, 'deficit'))), RT), T('DEFICIT ~$2T · INTEREST >$1T', 640, 80, pop(t, ph(L, 'deficit')) * (1 - k01(t, p - 0.4, p)), YT)] }; } },
  { id: 'Y30', f(t, d, L) { const s = getSet('capitol9'); hideCards(s); s.easel.visible = true; s.easel.position.set(-1.0, 0, -4.6); const dbl = ph(L, 'about double'), bor = ph(L, 'to cover the gap'), ten = ph(L, 'ten-year'); if (s._b3 !== (t > dbl ? 2 : 1)) { s.b3.userData.draw({ bar: t > dbl ? 1 : 0 }); s._b3 = t > dbl ? 2 : 1; }
      if (s._v !== 'F') { s.clock.userData.draw({ v: 40100000000000 }); s._v = 'F'; }
      if (t < bor) cl(s, k01(t, 0, bor), [[-0.2, 1.8, -1.2], [-1.0, 1.5, -4.6]], [[-0.6, 1.75, -1.8], [-1.0, 1.5, -4.6]]); else cl(s, k01(t, bor, d), [[0, 1.8, 2.4], [0, 3.4, -6]], [[0.3, 2.2, 0.6], [0, 3.6, -6]]);
      return { scene: s.S, cam: s.C, tags: [T('PLAN: 3% · NOW: ~6% OF GDP', 640, 80, pop(t, dbl), RT), T('BIG BUYERS STEP BACK → HIGHER YIELDS', 640, 80, pop(t, bor + 1) * (1 - k01(t, ten - 0.4, ten)), YT), T('10-YR >5% (LATE SEP 2026) · 30-YR >5.5%', 640, 80, pop(t, ten), RT)] }; } },
  { id: 'Y31', f(t, d, L) { const s = getSet('tokyo9'); hideCards(s, ['hana', 'gus9', 'kenji']); const h = lineAt(L, 'HANA').t0; TOK9(s, t, { dial: 1, dialTxt: '1.25', year: '2026', bonds: t > 1.5, queue: Math.round(4 * k01(t, 3, h)), board: { title: 'SEPT 2026', rows: [['JAPAN 10-YR', '3.0%', '#3f9b5f', 0.16], ['FIRST SINCE', '1996'], ['U.S. 10-YR', '5.1%']] } });
      if (t < h) cl(s, k01(t, 0, h), [[0.6, 1.6, -0.6], [1.3, 0.8, -3.2]], [[1.4, 2.0, 1.4], [0.6, 1.2, -3.4]]); else cl(s, k01(t, h, d), [[2.6, 1.6, 0.8], [0.8, 1.2, -3.4]], [[2.2, 1.6, 0.4], [0.8, 1.2, -3.4]]);
      sp(s, 'hana', 0.55, -3.75, { view: 'q', dir: 1, expr: 'happy', arms: [HOLD, t > h ? POINT : null] }, t, L, 'HANA', 1.6, 0.35);
      sp(s, 'gus9', 1.8, -2.75, { view: 'q', dir: -1, expr: ex(t, L, 'GUS', 1, 'laugh', 'neutral'), arms: [null, null] }, t, L, 'GUS', 1.75);
      sp(s, 'kenji', -1.25, -3.05, { view: 'q', dir: 1, expr: 'happy', arms: [{ h: [0.75, 1.0], hand: 'point' }, null] }, t, L, '', 1.45);
      return { scene: s.S, cam: s.C, tags: [T('JAPAN 10-YR > 3% (FIRST SINCE 1996)', 640, 80, pop(t, ph(L, 'three percent')) * (1 - k01(t, h - 0.4, h)), GT), T('MONEY CAN STAY HOME', 640, 80, pop(t, ph(L, 'earn something at home')) * (1 - k01(t, h - 0.4, h)), YT)] }; } },
  { id: 'Y32', f(t, d, L) { const s = getSet('kitchen9'); hideCards(s, ['nora']); const n = lineAt(L, 'NORA').t0; KIT(s, t, { letters: true, ph: { mode: 'red', bal: '$81,340', chg: '-1.8% today' }, cal: { m: 'OCTOBER', d: '2', y: '2026' }, hr: 19, mn: 40 });
      s.cat.position.set(-0.25, s.TY, s.TZ - 0.25); s.cat.rotation.y = 0.6; s.cat.scale.setScalar(0.85);
      if (t < n) cl(s, k01(t, 0, n), [[0.5, 1.4, -0.3], [0.3, 0.77, -1.05]], [[0.2, 1.3, -0.5], [0.25, 0.77, -1.05]]); else cl(s, k01(t, n, d), [[1.6, 1.6, 0.8], [0.6, 1.1, -1.2]], [[1.2, 1.5, 0.4], [0.6, 1.1, -1.2]]);
      sp(s, 'nora', 0.95, -1.25, { view: 'q', dir: -1, expr: t > n ? 'sad' : 'surprised', arms: [HOLD, t > n ? SHRUG : null] }, t, L, 'NORA', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('YIELDS UP → MORTGAGES · CAR LOANS · CARDS UP', 640, 80, pop(t, ph(L, 'mortgages')) * (1 - k01(t, ph(L, 'a fast unwind') - 0.3, ph(L, 'a fast unwind'))), RT), T('FAST UNWIND = STOCKS AND BONDS SOLD TOGETHER', 640, 80, pop(t, ph(L, 'a fast unwind')) * (1 - k01(t, n - 0.4, n)), YT)] }; } },
];
/* ============ ACT 6: DOLLARS AND GOLD ============ */
ACTS[6] = [
  { id: 'Y33', card: '6. Dollars and Gold' },
  { id: 'Y34', f(t, d, L) { const s = getSet('vault9'); hideCards(s); s.safe.visible = false; s.tFolders.forEach(tr => tr.visible = false); s.labD.visible = s.labG.visible = true; const tod = ph(L, 'today'), gld = ph(L, 'gold made up'), sv = ph(L, 'in a twenty twenty-six survey');
      const kd = 1 - 0.65 * k01(t, 1, tod + 1), kg = 0.15 + 0.85 * k01(t, gld - 2, gld + 2); s.setStacks(kd, kg); const ds = Math.round(lerp(72, 57, k01(t, 1, tod + 1)));
      if (s._ld !== ds) { s.labD.userData.draw({ t: 'DOLLARS ' + ds + '%' }); s._ld = ds; } const gl = t > gld ? 'GOLD 27% vs TREASURIES 22%' : 'GOLD'; if (s._lg !== gl) { s.labG.userData.draw({ t: t > gld ? 'GOLD 27%' : 'GOLD' }); s._lg = gl; }
      if (s._c !== 'R') { s.counter.userData.draw({ t: ' ' }); s._c = 'R'; }
      cl(s, k01(t, 0, d), [[-2.6, 2.2, 2.6], [-1.0, 1.4, -3.0]], [[2.4, 2.0, 2.2], [1.0, 1.0, -3.0]]);
      return { scene: s.S, cam: s.C, tags: [T('DOLLAR SHARE: ~72% (2001) → ~57% (IMF, Q2 2026)', 640, 80, pop(t, tod) * (1 - k01(t, gld - 0.5, gld)), YT), T('END-2025: GOLD 27% · TREASURIES 22% (ECB)', 640, 80, pop(t, gld) * (1 - k01(t, ph(L, 'to be fair') - 0.3, ph(L, 'to be fair'))), YT), T('MOSTLY THE GOLD PRICE', 640, 80, pop(t, ph(L, 'to be fair')) * (1 - k01(t, sv - 0.4, sv)), BT), T('RECORD 45% PLAN TO ADD GOLD (WGC 2026)', 640, 80, pop(t, sv + 1), GT)] }; } },
  { id: 'Y35', f(t, d, L) { const s = getSet('vault9'); hideCards(s, ['dot9', 'brick', 'chet']); s.setStacks(0.35, 1); const c = lineAt(L, 'CHET').t0;
      cl(s, k01(t, 0, d), [[1.6, 1.8, 2.0], [1.6, 0.9, -2.6]], [[1.0, 1.7, 1.4], [1.6, 0.9, -2.6]]);
      sp(s, 'dot9', 1.0, -2.2, { view: 'q', dir: 1, expr: 'happy', arms: [{ h: [0.75, 0.6 + 0.1 * Math.sin(t * 8)], hand: 'fist' }, null] }, t, L, 'DOT', 1.2);
      sp(s, 'brick', 3.2, -2.6, { view: 'q', dir: -1, expr: 'neutral', arms: [HOLD, HOLD] }, t, L, 'BRICK', 2.2);
      walkX(s, 'chet', 4.6, 2.2, -1.6, t, 0, c - 0.2, { view: 'q', dir: -1, expr: ex(t, L, 'CHET', 1, 'sad', 'sly'), arms: [null, t > c ? POINT : null] }, L, 'CHET', 1.8);
      return { scene: s.S, cam: s.C, tags: [T('GOLD: NO INTEREST · NO MARGIN CALL', 640, 80, pop(t, lineAt(L, 'BRICK').t0 + 0.4), YT)] }; } },
  { id: 'Y36', f(t, d, L) { const s = getSet('band9'); hideCards(s); s.bandSet(1, 0, 0.12 + 0.1 * Math.sin(t * 0.8), t); s.towers.forEach((g, i) => s.topple(i, 0)); const nk = ph(L, 'nobody knows');
      s.lights.forEach((b, i) => { b.visible = t > 1 + i * 1.2; const p = i === 0 ? s.TOK : i === 1 ? s.NYC : V3(s.mx(0.8), s.TH, s.mz(0.62)); b.position.set(p.x, p.y + 0.35 + 0.02 * Math.sin(t * 3 + i), p.z); b.material.color.setHSL(0.12, 1, 0.5 + 0.25 * Math.sin(t * 4 + i)); });
      cl(s, k01(t, 0, d), [[0, 4.2, 3.4], [0, 0.9, -0.8]], [[0, 2.0, 1.6], [0, 0.95, -0.8]]);
      return { scene: s.S, cam: s.C, tags: [T('TOKYO', 330, 160, pop(t, 1), BT), T('NEW YORK', 960, 160, pop(t, 2.2), BT), T('YOUR 401(k)', 760, 640, pop(t, 3.4), YT), T('CRASH? NOBODY KNOWS', 640, 80, pop(t, nk) * (1 - k01(t, ph(L, 'the danger') - 0.3, ph(L, 'the danger'))), YT), T('DANGER = LEVERAGE + CROWDING', 640, 80, pop(t, ph(L, 'the danger')), RT)] }; } },
];
/* ============ ACT 7: YOUR WALLET + ENDING ============ */
ACTS[7] = [
  { id: 'Y37', card: 'Your Wallet' },
  { id: 'Y38', f(t, d, L) { const s = getSet('kitchen9'); hideCards(s, ['nora']); const marks = ['one.', 'two.', 'three.', 'four.', 'and five'].map(w => ph(L, w, 1e9)); const n = marks.filter(m => t > m).length;
      KIT(s, t, { note: String(n), ph: { mode: 'green', bal: '$86,020' }, cal: { m: 'NOVEMBER', d: '29', y: '2026' }, hr: 20, mn: 15 }); s.cat.position.set(-0.45, s.TY + 0.02, s.TZ + 0.15); s.cat.rotation.y = 1.2; s.cat.scale.setScalar(0.85);
      if (t < marks[0]) cl(s, k01(t, 0, marks[0]), [[2.0, 1.7, 1.3], [0.4, 1.0, -1.2]], [[0.9, 1.4, -0.1], [0.3, 0.85, -1.05]]); else cl(s, k01(t, marks[0], d), [[0.12, 1.32, -0.62], [0.3, 0.77, -1.08]], [[0.18, 1.2, -0.72], [0.3, 0.77, -1.08]]);
      sp(s, 'nora', 0.95, -1.25, { view: 'q', dir: -1, expr: 'happy', arms: [{ h: [0.6, 0.65], hand: 'pinch' }, null], look: [-0.4, 0.5] }, t, L, '', 1.6);
      const items = ['KNOW WHAT YOU OWN', 'CASH FOR EMERGENCIES', 'CAREFUL WITH LEVERAGE', 'CHECK VARIABLE RATES', 'DON\'T PANIC-SELL']; const tg = [T('NOT FINANCIAL ADVICE', 640, 80, pop(t, 0.5) * (1 - k01(t, marks[0] - 0.4, marks[0])), BT)];
      if (n > 0) tg.push(T((n) + '. ' + items[n - 1], 640, 80, pop(t, marks[n - 1]), n === 3 ? RT : YT)); return { scene: s.S, cam: s.C, tags: tg }; } },
  { id: 'Y39', f(t, d, L) { const s = getSet('kitchen9'); hideCards(s, ['nora', 'pip9']); const fold = 1.2; KIT(s, t, { note: '5', ph: t < fold ? { mode: 'green', bal: '$86,020' } : { folder: true }, cal: { m: 'NOVEMBER', d: '29', y: '2026' }, hr: 20, mn: 18 });
      s.cat.position.set(-0.45, s.TY + 0.02, s.TZ + 0.15); s.cat.rotation.y = 1.2 + 0.3 * Math.sin(t * 0.7); s.cat.scale.setScalar(0.85);
      cl(s, k01(t, 0, d), [[1.4, 1.55, 0.6], [0.4, 1.0, -1.2]], [[0.8, 1.5, 0.3], [0.3, 1.0, -1.2]]);
      sp(s, 'nora', 0.95, -1.25, { view: 'q', dir: -1, expr: ex(t, L, 'NORA', 1, 'laugh', 'happy'), arms: [HOLD, t > lineAt(L, 'NORA', 1).t0 ? SHRUG : null] }, t, L, 'NORA', 1.6);
      sp(s, 'pip9', -0.55, -1.5, { view: 'q', dir: 1, expr: 'surprised', arms: [null, null] }, t, L, 'PIP', 1.1);
      return { scene: s.S, cam: s.C, tags: [T('APP MOVED: "ONCE A MONTH"', 640, 80, pop(t, fold + 0.3) * (1 - k01(t, 4, 4.5)), YT)] }; } },
  { id: 'Y40', noBlurOut: true, get dur() { return TIMING.Y40.dur + 5.5; }, f(t, d, L) { const clean = t > d - 5.5; const s = getSet('band9'); hideCards(s, ['kenji', 'chet']); const k = lineAt(L, 'KENJI').t0, ev = lineAt(L, 'EVERYONE').t0; const tight = ph(L, 'stretched again');
      s.bandSet(lerp(0.6, 1, k01(t, 0, tight + 1)), 0, 0.05 + 0.3 * k01(t, ev, ev + 0.5), t); s.towers.forEach((g, i) => s.topple(i, 0)); s.lights.forEach(b => b.visible = false);
      if (t < k) cl(s, k01(t, 0, k), [[0, 3.8, 3.4], [0, 0.9, -0.8]], [[-1.0, 2.0, 1.4], [-0.6, 1.0, -1.2]]); else cl(s, k01(t, k, d - 3), [[-1.6, 1.8, 0.8], [-1.8, 1.1, -1.8]], [[0, 2.8, 2.6], [0, 0.9, -0.8]]);
      if (clean) hideCards(s); else sp(s, 'kenji', -2.75, -1.7, { view: 'q', dir: 1, expr: t > k ? 'sly' : 'sleepy', arms: [t > k ? POINT : HOLD, null] }, t, L, 'KENJI', 1.45);
      if (!clean) sp(s, 'chet', 2.9, -2.1, { view: 'q', dir: -1, expr: t > ev ? 'scared' : 'sly', arms: [t > ev ? UP : { h: [0.8, 1.0], hand: 'fist' }, null] }, t, L, 'EVERYONE', 1.8);
      return { scene: s.S, cam: s.C, post: fadeOut(t, d, 1.2), tags: [T('NOTHING HAPPENS IN SUMMER...', 640, 80, pop(t, ph(L, 'nothing happens')) * (1 - k01(t, k - 0.4, k)), YT)] }; } },
];
