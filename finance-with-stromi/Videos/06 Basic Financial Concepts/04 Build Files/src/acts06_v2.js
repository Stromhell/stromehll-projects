/* Finance with Stromi 06 (10 Money Concepts Nobody Explains): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z, moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(clamp(k, 0, 1)), a[0], b[0], a[1], b[1]);
const once = (s, k, f) => s[k] || (s[k] = f(s));
const POINT = { h: [0.75, 0.95], hand: 'open' }, UP = { h: [0.35, 1.25], hand: 'open' }, HOLD = { h: [0.4, 0.55], hand: 'fist' }, CHIN = { h: [0.25, 1.05], hand: 'fist' }, WAVE = { h: [0.55, 1.35], hand: 'wave' };
const exprBy = (t, L, who, n, a, b) => (t > lineAt(L, who, n).t0 ? a : b);
/* ---------- kitchen helper ---------- */
const KIT = (s, o) => { o = o || {}; s.tin.visible = !!o.tin; s.cards.forEach((c, i) => c.visible = (o.cards || 0) > i); s.cups.forEach(c => c.visible = !!o.cups); s.cashTin.visible = !!o.cashTin; s.oldCard.visible = !!o.oldCard; s.receipt.visible = !!o.receipt; s.coins.forEach(c => c.visible = false); s.stub.visible = o.stub !== false; s.pl.intensity = o.pl || 9;
  if (o.stubO) s.stub.userData.draw(o.stubO); if (o.phone) s.phone.userData.sc.userData.draw(o.phone); s.cal.userData.draw(o.cal || {}); };
const kz = s => s.iz - 0.15; // where people stand behind the island
const KW = (s, k, a, b) => cl(s, k, a || [[0, 1.5, s.iz + 4.3], [0, 1.1, s.iz - 0.3]], b || [[0, 1.45, s.iz + 3.7], [0, 1.1, s.iz - 0.3]]);
const two = (s, t, L, ot, on) => { sp(s, 'theo', -1.55, kz(s), Object.assign({ view: 'q', dir: 1, seed: 1 }, ot || {}), t, L, 'THEO', 1.65); sp(s, 'nana', 1.5, kz(s), Object.assign({ view: 'q', dir: -1, seed: 2 }, on || {}), t, L, 'NANA', 1.5); };

const ACTS = {};
/* ======================= ACT 0: COLD OPEN ======================= */
ACTS[0] = [
  { id: 'B01', noBlurIn: true, f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { stubO: { hi: 0 } }); const th = lineAt(L, 'THEO').t0;
      if (t < th - 0.4) cl(s, k01(t, 0, th), [[-2.4, 1.6, s.iz + 4.6], [-0.4, 1.2, s.iz - 0.6]], [[-0.9, 1.45, s.iz + 3.2], [-0.2, 1.15, s.iz - 0.5]]); else cl(s, k01(t, th - 0.4, d), [[-1.1, 1.4, s.iz + 2.1], [-1.5, 1.2, kz(s)]], [[-1.15, 1.38, s.iz + 1.8], [-1.5, 1.2, kz(s)]]);
      walkTo(s, 'theo', -3.6, -1.55, kz(s), t, 1.2, th - 1.0, { view: 'q', dir: 1, expr: 'happy', arms: [null, t > th - 1 ? UP : null] }, L, 'THEO', 1.65);
      sp(s, 'nana', 1.5, kz(s), { view: 'q', dir: -1, expr: t > th ? 'happy' : 'neutral', look: [-0.5, 0], seed: 2 }, t, L, 'NANA', 1.5);
      return { scene: s.S, cam: s.C, tags: [T('FRIDAY · 9:15 PM', 230, 90, pop(t, 0.6), BT), T('FIRST REAL PAYCHECK', 990, 100, pop(t, ph(L, 'first real job')), YT), T('$2,000', 640, 600, pop(t, ph(L, 'two thousand dollars')), GT)] }; } },
  { id: 'B02', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { phone: { l1: 'DEPOSIT', l2: '$1,631.00' } }); const q = lineAt(L, 'THEO').t0, n2 = lineAt(L, 'NANA', 1).t0;
      s.phone.position.x = lerp(0.62, 0.0, E(k01(t, 0.4, 1.6))); if (t < q) cl(s, k01(t, 0, q), [[0.1, 1.5, s.iz + 0.9], [0.1, 0.93, s.iz + 0.1]], [[0.0, 1.32, s.iz + 0.62], [0.0, 0.93, s.iz + 0.12]]); else if (t < n2) KW(s, k01(t, q, n2), [[-0.9, 1.4, s.iz + 2.3], [-1.35, 1.15, kz(s)]], [[-0.8, 1.38, s.iz + 2.1], [-1.3, 1.15, kz(s)]]); else KW(s, k01(t, n2, d), [[0.9, 1.38, s.iz + 2.2], [1.35, 1.1, kz(s)]], [[0.85, 1.36, s.iz + 2.0], [1.35, 1.1, kz(s)]]);
      two(s, t, L, { expr: t > q ? 'surprised' : 'happy', arms: [t > q ? UP : null, null] }, { expr: t > n2 ? 'sly' : 'neutral', arms: [null, t < q ? POINT : null] });
      return { scene: s.S, cam: s.C, tags: [T('GROSS $2,000', 280, 110, pop(t, 0.4), GT), T('LANDED $1,631', 1000, 110, pop(t, 1.2), RT), T('-$369 ?!', 640, 610, pop(t, ph(L, 'three hundred and sixty-nine')), RT)] }; } },
  { id: 'B03', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); const fan = k01(t, ph(L, 'ten ideas'), ph(L, 'and time') + 0.6); KIT(s, { tin: true, cards: Math.floor(fan * 10.99) });
      if (t < ph(L, 'ten ideas')) KW(s, k01(t, 0, ph(L, 'ten ideas')), [[0.8, 1.55, s.iz + 4.4], [0, 1.15, s.iz - 0.3]], [[0.4, 1.5, s.iz + 3.8], [0, 1.15, s.iz - 0.3]]); else cl(s, k01(t, ph(L, 'ten ideas'), d), [[0, 1.75, s.iz + 1.3], [0, 0.93, s.iz + 0.05]], [[0, 1.6, s.iz + 1.05], [0, 0.93, s.iz + 0.05]]);
      two(s, t, L, { expr: 'surprised', look: [0.3, -0.5] }, { expr: 'sly', arms: [null, HOLD] });
      const LBL = ['TAXES', 'BANKS', 'INTEREST', 'INFLATION', 'RECESSIONS', 'CREDIT SCORES', 'MONEY', 'INVESTING', 'VALUE', 'TIME']; const tags = [T('41 YEARS BEHIND A BANK COUNTER', 640, 90, pop(t, ph(L, 'forty-one')) * (1 - k01(t, ph(L, 'ten ideas') - 0.3, ph(L, 'ten ideas'))), BT)];
      LBL.forEach((w, i) => tags.push(T(w, 160 + (i % 5) * 240, i < 5 ? 110 : 610, pop(t, ph(L, w.split(' ')[0].toLowerCase().replace('money', 'money itself'), 99)), i % 2 ? YT : GT)));
      return { scene: s.S, cam: s.C, tags }; } },
  { id: 'B04', card: '10 Money Concepts', sub: 'Nobody explains' },
];
/* ======================= ACT 1: TAXES ======================= */
ACTS[1] = [
  { id: 'B05', card: '1. Taxes' },
  { id: 'B06', f(t, d, L) { const s = getSet('nana6'); hideCards(s); const hi = [ph(L, 'social security'), ph(L, 'medicare, one'), ph(L, 'federal income'), ph(L, 'his state')].filter(v => t > v).length; KIT(s, { stubO: { hi } });
      cl(s, k01(t, 0, d), [[-0.3, 1.25, s.iz + 0.62], [-0.25, 0.93, s.iz + 0.14]], [[-0.25, 1.12, s.iz + 0.46], [-0.25, 0.93, s.iz + 0.15]]);
      return { scene: s.S, cam: s.C, vig: 0.9, tags: [T('SOCIAL SECURITY 6.2% = $124', 300, 120, pop(t, ph(L, 'social security')), RT), T('MEDICARE 1.45% = $29', 980, 120, pop(t, ph(L, 'medicare, one')), RT), T('= FICA (7.65%)', 640, 210, pop(t, ph(L, 'called fica')), BT), T('FEDERAL ~$156', 330, 610, pop(t, ph(L, 'federal income')), RT), T('STATE ~$60', 960, 610, pop(t, ph(L, 'his state')), RT)] }; } },
  { id: 'B07', f(t, d, L) { const s = getSet('town6'); hideCards(s); const ty = s.ty;
      const bk = k01(t, ph(L, 'roads'), d); s.bus.position.x = lerp(-1.7, 1.7, bk); s.bus.userData.w.forEach(w => w.rotation.y = 0); s.bus.userData.w.forEach(w => w.rotation.z = -bk * 40);
      const fk = k01(t, ph(L, 'firefighters'), ph(L, 'firefighters') + 3.5); s.truck.position.z = lerp(0.72, 0.42, E(k01(fk, 0, 0.3))); s.truck.rotation.y = lerp(Math.PI / 2, 0, E(k01(fk, 0.2, 0.45))); s.truck.position.x = lerp(-1.25, 0.4, E(k01(fk, 0.4, 1))); s.truck.userData.w.forEach(w => w.rotation.z = -fk * 25);
      s.patch.visible = t > ph(L, 'roads') + 0.6; card(s, 'pipWork', 0.2).hide();
      const old = sp(s, 'nana', 1.15, 0.86, { view: 'front', expr: t > ph(L, 'retirees') ? 'happy' : 'neutral', arms: [null, t > ph(L, 'retirees') ? WAVE : null] }, t, [], null, 0.19, ty);
      cl(s, k01(t, 0, d), [[-1.2, 1.9, 2.4], [0, ty, 0]], [[0.8, 1.35, 1.7], [0.5, ty + 0.05, 0.3]]);
      return { scene: s.S, cam: s.C, tags: [T('INCOME TAX: money you earn', 300, 100, pop(t, ph(L, 'income tax')), YT), T('SALES TAX: money you spend', 640, 160, pop(t, ph(L, 'sales tax')), YT), T('CAPITAL GAINS: money your money earns', 940, 100, pop(t, ph(L, 'capital gains')), YT), T('ROADS · TEACHERS · FIREFIGHTERS', 640, 620, pop(t, ph(L, 'builds roads')), GT)] }; } },
  { id: 'B08', f(t, d, L) { const s = getSet('town6'); hideCards(s, ['pipWork']); const ty = s.ty; s.patch.visible = true; s.bus.position.x = 1.7; s.truck.position.set(0.4, ty, 0.42); s.truck.rotation.y = 0;
      const th = lineAt(L, 'THEO').t0; sp(s, 'pipWork', 0.66, 0.5, { view: 'front', expr: t > lineAt(L, 'PIP', 2).t0 ? 'sly' : 'happy', look: [0, 0.8], arms: [t < th ? { h: [0.4, 0.2], hand: 'open' } : null, null] }, t, L, 'PIP', 0.2, ty);
      if (t < th) cl(s, k01(t, 0, th), [[0.66, ty + 0.14, 0.95], [0.6, ty + 0.06, 0.4]], [[0.7, ty + 0.12, 0.8], [0.6, ty + 0.06, 0.4]]); else cl(s, k01(t, th, d), [[0.7, ty + 0.03, 0.78], [0.64, ty + 0.13, 0.5]], [[0.69, ty + 0.025, 0.72], [0.64, ty + 0.14, 0.5]]);
      const giant = t > th; return { scene: s.S, cam: s.C, tags: [T('YOUR 4 INCHES', 640, 600, pop(t, ph(L, 'four inches')), GT), T('$156', 1040, 120, pop(t, ph(L, 'hundred and fifty-six')), RT)], post: giant ? (x) => { x.save(); x.globalAlpha = 0.85 * k01(t, th, th + 0.6); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, 0, W, 60); x.restore(); } : null }; } },
  { id: 'B09', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { cal: { month: 'APRIL', circle: t > ph(L, 'every spring') ? 15 : 0 } }); const th = lineAt(L, 'THEO').t0;
      if (t < th) cl(s, k01(t, 0, th), [[-2.1, 1.65, s.z0 + 2.4], [-2.95, 1.55, s.z0]], [[-2.4, 1.6, s.z0 + 1.5], [-2.95, 1.55, s.z0]]); else KW(s, k01(t, th, d));
      two(s, t, L, { expr: t > th ? 'happy' : 'neutral' }, { expr: t > lineAt(L, 'NANA').t0 ? 'sly' : 'neutral', arms: [null, t > lineAt(L, 'NANA').t0 ? POINT : null] });
      return { scene: s.S, cam: s.C, tags: [T('WITHHOLDING = A GUESS', 640, 100, pop(t, ph(L, 'withholding')), YT), T('PAID TOO MUCH -> REFUND', 330, 600, pop(t, ph(L, 'paid too much')), GT), T('TOO LITTLE -> YOU OWE', 950, 600, pop(t, ph(L, 'paid too little')), RT), T('0% LOAN TO THE GOVERNMENT', 640, 160, pop(t, ph(L, 'at zero percent')), BT)] }; } },
];
/* ======================= ACT 2: BANKS ======================= */
ACTS[2] = [
  { id: 'B10', card: '2. Banks' },
  { id: 'B11', f(t, d, L) { const s = getSet('bank6'); hideCards(s, ['theo', 'mabel']); const cz = s.cz; s.jet.visible = false; s.backL.intensity = 0;
      const hand = ph(L, 'not what happens'); s.money.visible = true; const mk = k01(t, hand, hand + 2.4); s.money.position.set(lerp(0.3, 3.4, E(mk)), mk > 0.55 ? lerp(0.97, 1.0, k01(mk, 0.55, 1)) : 0.97, lerp(cz + 0.2, s.z0 + 0.6, E(k01(mk, 0.45, 1)))); s.money.visible = mk < 0.98;
      walkTo(s, 'theo', -4.5, -0.25, cz + 0.85, t, 0.3, 3.6, { view: 'q', dir: 1, expr: 'happy', arms: [null, t < hand ? HOLD : null] }, L, null, 1.65);
      sp(s, 'mabel', 0.7, cz - 0.55, { view: 'q', dir: -1, expr: 'happy', seed: 4 }, t, L, null, 1.55);
      cl(s, k01(t, 0, d), [[-2.4, 1.8, cz + 5.5], [-0.6, 1.3, cz]], [[1.2, 1.7, cz + 4.6], [0.9, 1.25, cz - 0.4]]);
      return { scene: s.S, cam: s.C, tags: [T('$1,000 DEPOSIT', 300, 110, pop(t, ph(L, 'thousand dollars')), GT), T('NOT A SAFE', 640, 610, pop(t, ph(L, 'not a safe')), RT), T('A MATCHMAKER', 980, 110, pop(t, ph(L, 'matchmaker')), YT)] }; } },
  { id: 'B12', f(t, d, L) { const s = getSet('bank6'); hideCards(s, ['theo', 'wendell', 'mabel']); const cz = s.cz; s.jet.visible = true; s.backL.intensity = 6; s.money.visible = false;
      const w0 = lineAt(L, 'WENDELL').t0; sp(s, 'wendell', 3.5, cz + 0.75, { view: 'q', dir: -1, expr: t > w0 ? 'sly' : 'happy', arms: [t > ph(L, 'keeps the difference') - 1 ? HOLD : null, null] }, t, L, 'WENDELL', 1.8);
      sp(s, 'theo', -0.2, cz + 0.85, { view: 'q', dir: 1, expr: t > lineAt(L, 'THEO').t0 ? 'scared' : 'neutral', arms: [t > lineAt(L, 'THEO').t0 ? POINT : null, null] }, t, L, 'THEO', 1.65);
      sp(s, 'mabel', -1.4, cz - 0.6, { view: 'q', dir: 1, expr: 'neutral', seed: 4 }, t, L, null, 1.55);
      if (t < w0) cl(s, k01(t, 0, w0), [[1.6, 1.7, cz + 4.6], [3.7, 1.0, cz + 0.4]], [[2.3, 1.6, cz + 3.6], [3.8, 1.0, cz + 0.4]]); else cl(s, k01(t, w0, d), [[1.2, 1.6, cz + 4.8], [1.6, 1.15, cz + 0.4]], [[1.0, 1.55, cz + 4.5], [1.5, 1.15, cz + 0.4]]);
      return { scene: s.S, cam: s.C, tags: [T('KEEPS A SLICE', 300, 110, pop(t, ph(L, 'keeps a slice')), YT), T('LENDS THE REST', 640, 160, pop(t, ph(L, 'lends most')), YT), T('PAYS YOU A LITTLE', 330, 600, pop(t, ph(L, 'pays you a little')), GT), T('CHARGES THEM A LOT', 950, 600, pop(t, ph(L, 'a lot more')), RT), T('THE GAP = PROFIT', 980, 110, pop(t, ph(L, 'that gap')), BT)] }; } },
  { id: 'B13', f(t, d, L) { const s = getSet('street'); hideCards(s); const bb = once(s, 'bank06', s => { const b = bankBuilding('SAVINGS BANK', '#c9bc9e'); b.position.set(5.5, 0, -3.4); s.S.add(b); return b; });
      const Q = ['jimmy', 'linda', 'ray', 'marcus', 'mabel', 'danielle', 'clerk', 'cook', 'gus', 'dot', 'janitor', 'pip']; Q.forEach((k, i) => { const z = 1.2 + i * 0.75, x = 4.3 - (i % 2) * 0.25; sp(s, k, x, z, { view: 'q', dir: 1, expr: i % 3 ? 'scared' : 'neutral', look: [0.6, 0], seed: i * 1.3, arms: [i % 4 === 0 ? { h: [0.3, 0.6], hand: 'fist' } : null, null] }, t, [], null, 1.5 + (i % 3) * 0.12); });
      const h2 = ph(L, 'march twenty twenty-three'); cl(s, k01(t, 0, d), [[-1.5, 2.2, 13], [4.6, 1.6, -2]], [[0.8, 1.9, 9.5], [4.8, 1.5, -2]]);
      return { scene: s.S, cam: s.C, tags: [T('BANK RUN', 640, 100, pop(t, ph(L, 'bank run')), RT), T('SEPT 2008 · WASHINGTON MUTUAL', 360, 170, pop(t, ph(L, 'september two thousand eight')) * (1 - k01(t, h2 - 0.3, h2)), BT), T('$16.7B OUT IN 10 DAYS', 360, 240, pop(t, ph(L, 'sixteen point seven')) * (1 - k01(t, h2 - 0.3, h2)), RT), T('MARCH 2023 · SILICON VALLEY BANK', 900, 170, pop(t, h2), BT), T('CLOSED NEXT MORNING', 640, 620, pop(t, ph(L, 'closed the next')), RT)] }; } },
  { id: 'B14', f(t, d, L) { const s = getSet('vault'); hideCards(s, ['theo', 'nana']); s.tiny.visible = false; s.crack && (s.crack.visible = false); s.locks.forEach(l => l.visible = false);
      const shield = once(s, 'fdic', s => { const b = board(1.3, 1.3, (x, w, h) => { x.fillStyle = '#c9a24a'; x.beginPath(); x.moveTo(w / 2, 4); x.lineTo(w - 6, h * 0.18); x.lineTo(w - 10, h * 0.6); x.lineTo(w / 2, h - 4); x.lineTo(10, h * 0.6); x.lineTo(6, h * 0.18); x.closePath(); x.fill(); x.strokeStyle = '#1e1612'; x.lineWidth = 10; x.stroke(); ltxt(x, 'FDIC', w / 2, h * 0.32, h * 0.16, '#1e1612', 'center'); ltxt(x, '$250,000', w / 2, h * 0.52, h * 0.13, '#1e1612', 'center'); ltxt(x, 'per depositor · per bank', w / 2, h * 0.68, h * 0.06, '#3a2a20', 'center'); ltxt(x, 'per account type', w / 2, h * 0.76, h * 0.06, '#3a2a20', 'center'); }); b.material.transparent = true; b.position.set(0, 1.85, s.z0 + 0.75); s.S.add(b); return b; });
      const st = ph(L, 'insured by the fdic'); const k = E(k01(t, st, st + 0.5)); shield.scale.setScalar(Math.max(0.001, lerp(2.2, 1, k))); shield.visible = t > st; shield.material.opacity = k01(t, st, st + 0.3);
      const th = lineAt(L, 'THEO').t0; if (t < th) cl(s, k01(t, 0, th), [[0, 1.6, s.z0 + 5], [0, 1.6, s.z0]], [[0, 1.6, s.z0 + 3.4], [0, 1.6, s.z0]]); else cl(s, k01(t, th, d), [[1.2, 1.55, s.z0 + 5.0], [0.15, 1.35, s.z0 + 1.6]], [[1.0, 1.52, s.z0 + 4.7], [0.15, 1.35, s.z0 + 1.6]]);
      sp(s, 'theo', -0.5, s.z0 + 1.8, { view: 'q', dir: 1, expr: t > lineAt(L, 'THEO', 1).t0 ? 'happy' : 'neutral', arms: [t > lineAt(L, 'THEO', 1).t0 ? UP : null, null] }, t, L, 'THEO', 1.65); sp(s, 'nana', 0.8, s.z0 + 1.8, { view: 'q', dir: -1, expr: 'sly' }, t, L, 'NANA', 1.5);
      return { scene: s.S, cam: s.C, tags: [T('SINCE 1934', 330, 110, pop(t, ph(L, 'nineteen thirty-four')), BT), T('NOT ONE CENT OF INSURED MONEY LOST', 640, 620, pop(t, ph(L, 'single cent')), GT)] }; } },
];
/* ======================= ACT 3: INTEREST ======================= */
ACTS[3] = [
  { id: 'B15', card: '3. Interest' },
  { id: 'B16', f(t, d, L) { const s = getSet('lender'); hideCards(s, ['gus', 'theo']); s.house.visible = false; s.env && (s.env.visible = false); s.doc && (s.doc.visible = false); s.tagm.visible = t > ph(L, 'compound'); if (s.tagm.visible) once(s, 'tg6', s => (s.setTag('INTEREST ON INTEREST', '#c2372d'), 1));
      sp(s, 'gus', 1.3, s.z0 + 1.25, { view: 'front', expr: 'sly', arms: [null, t > ph(L, 'simple interest') ? POINT : null] }, t, L, null, 1.6); sp(s, 'theo', -1.3, s.z0 + 2.35, { view: 'q', dir: 1, expr: 'neutral', look: [0.6, 0.1], arms: [HOLD, null] }, t, L, null, 1.65);
      cl(s, k01(t, 0, d), [[-1.2, 1.6, s.z0 + 5.3], [0, 1.1, s.z0 + 1.5]], [[0.5, 1.55, s.z0 + 4.7], [0.2, 1.1, s.z0 + 1.5]]);
      return { scene: s.S, cam: s.C, tags: [T('INTEREST = RENT FOR MONEY', 640, 100, pop(t, ph(L, 'rent for money')), YT), T('SIMPLE: on what you started with', 330, 600, pop(t, ph(L, 'simple interest')), BT), T('COMPOUND: on everything so far', 950, 600, pop(t, ph(L, 'compound interest')), RT)] }; } },
  { id: 'B17', f(t, d, L) { const s = getSet('lender'); hideCards(s, ['gus', 'theo']); s.house.visible = false; s.tagm.visible = false;
      const pile = once(s, 'pile6', s => { const a = []; for (let i = 0; i < 14; i++) { const p = board(0.3, 0.2, (x, w, h, o) => { paperBg(x, w, h, '#fbf6ea'); ltxt(x, 'STATEMENT', w / 2, h * 0.2, h * 0.14, INK, 'center'); ltxt(x, (o && o.v) || '', w / 2, h * 0.6, h * 0.3, REDC, 'center'); }); p.userData.draw({ v: '$' + Math.round(1000 * Math.pow(1.0186, i * 5)) }); p.position.set(-0.75, 0.82 + i * 0.012, s.z0 + 1.5); p.rotation.set(-Math.PI / 2, 0, (i % 3 - 1) * 0.1); p.visible = false; s.S.add(p); a.push(p); } return a; });
      const st = ph(L, 'only pays'); pile.forEach((p, i) => p.visible = t > st + i * 0.35);
      const g0 = lineAt(L, 'GUS').t0; sp(s, 'gus', 1.3, s.z0 + 1.25, { view: 'front', expr: t > lineAt(L, 'GUS', 1).t0 ? 'sly' : 'happy', arms: [null, t > g0 ? POINT : null] }, t, L, 'GUS', 1.6);
      sp(s, 'theo', -1.3, s.z0 + 2.35, { view: 'q', dir: 1, expr: t > lineAt(L, 'GUS', 1).t0 ? 'scared' : 'happy', look: [0.6, 0.1] }, t, L, 'THEO', 1.65);
      if (t < g0) cl(s, k01(t, 0, g0), [[-0.2, 1.5, s.z0 + 2.9], [-0.7, 0.9, s.z0 + 1.5]], [[-0.4, 1.35, s.z0 + 2.5], [-0.7, 0.95, s.z0 + 1.5]]); else cl(s, k01(t, g0, d), [[-0.4, 1.6, s.z0 + 4.9], [0, 1.15, s.z0 + 1.5]], [[-0.2, 1.58, s.z0 + 4.6], [0, 1.15, s.z0 + 1.5]]);
      return { scene: s.S, cam: s.C, tags: [T('~22% A YEAR', 300, 100, pop(t, ph(L, 'twenty-two percent')), RT), T('$1,000 LAPTOP', 980, 100, pop(t, ph(L, 'thousand-dollar laptop')), YT), T('$25 MINIMUM', 640, 612, pop(t, ph(L, 'twenty-five dollar')), BT), T('~6 YEARS TO PAY OFF', 640, 672, pop(t, ph(L, 'six years')), RT)] }; } },
  { id: 'B18', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { stub: false });
      const st = ph(L, 'flip it'); const gen = Math.floor(k01(t, st + 0.6, ph(L, 'same maths')) * 5.99); const n = Math.pow(2, gen);
      s.coins.forEach((c, i) => { c.visible = i < Math.min(32, n); const col = i % 8, row = Math.floor(i / 8); const born = st + 0.6 + (i ? Math.floor(Math.log2(i)) + 1 : 0) * (ph(L, 'same maths') - st - 0.6) / 6; const k = outBack(k01(t, born, born + 0.4)); c.position.set(-0.7 + col * 0.2, s.ty + 0.006, s.iz - 0.25 + row * 0.15); c.scale.setScalar(Math.max(0.01, k)); c.rotation.set(0, 0, 0); });
      const nl = lineAt(L, 'NANA').t0; if (t < nl) cl(s, k01(t, 0, nl), [[0, 1.6, s.iz + 1.4], [0, 0.93, s.iz - 0.05]], [[0.1, 1.35, s.iz + 1.0], [0, 0.93, s.iz - 0.05]]); else KW(s, k01(t, nl, d));
      two(s, t, L, { expr: t > lineAt(L, 'THEO').t0 ? 'happy' : 'surprised' }, { expr: 'sly', arms: [null, t > nl ? UP : null] });
      return { scene: s.S, cam: s.C, tags: [T('7% A YEAR', 300, 100, pop(t, ph(L, 'seven percent a year')), GT), T('DOUBLES ~EVERY 10 YEARS', 640, 160, pop(t, ph(L, 'doubles')), GT), T('$100 -> ~$1,500 IN 40 YEARS', 640, 610, pop(t, ph(L, 'forty years')), GT)] }; } },
];
/* ======================= ACT 4: INFLATION ======================= */
const STORE6 = s => once(s, 'st6', s => { const bag = P6.chips(false); bag.position.set(-0.2, 0.93, s.cz + 0.05); s.S.add(bag); const air = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.06), basic(0xffffff, { transparent: true, opacity: 0.0 })); s.S.add(air); return { bag }; });
ACTS[4] = [
  { id: 'B19', card: '4. Inflation' },
  { id: 'B20', f(t, d, L) { const s = getSet('store'); hideCards(s, ['theo', 'dot']); STORE6(s); s.arm.visible = false; const d0 = lineAt(L, 'DOT').t0;
      sp(s, 'dot', 0.6, s.cz - 0.65, { view: 'q', dir: -1, expr: 'sly', arms: [null, t > lineAt(L, 'DOT', 1).t0 ? UP : null] }, t, L, 'DOT', 1.55); sp(s, 'theo', -0.6, s.cz + 0.75, { view: 'q', dir: 1, expr: t > lineAt(L, 'THEO', 1).t0 ? 'surprised' : 'neutral', look: [0.5, -0.4], arms: [t < d0 ? POINT : null, null] }, t, L, 'THEO', 1.65);
      cl(s, k01(t, 0, d), [[-1.6, 1.6, s.cz + 3.4], [0, 1.15, s.cz]], [[-0.4, 1.4, s.cz + 2.3], [-0.1, 1.1, s.cz]]);
      const flip = t > lineAt(L, 'THEO', 1).t0; return { scene: s.S, cam: s.C, tags: [T(flip ? '$4.79' : '$3.99', 640, 120, pop(t, 0.6), flip ? RT : YT), T('NOW 20% AIR', 640, 610, pop(t, ph(L, 'premium air')), RT)] }; } },
  { id: 'B21', f(t, d, L) { const s = getSet('store'); hideCards(s); STORE6(s); s.arm.visible = false;
      cl(s, k01(t, 0, d), [[-2, 1.8, s.cz + 6], [0, 1.2, s.cz - 1.5]], [[0.4, 1.6, s.cz + 4.2], [0.4, 1.3, s.cz - 2]]);
      const up = Math.floor(k01(t, 0.5, d - 1) * 12); return { scene: s.S, cam: s.C, tags: [T('MILK $' + (3.49 + up * 0.04).toFixed(2), 230, 300, pop(t, 0.5), YT), T('BREAD $' + (2.99 + up * 0.05).toFixed(2), 1050, 300, pop(t, 0.9), YT), T('SAME $5 BILL, LESS STUFF', 640, 100, pop(t, ph(L, 'five-dollar bill')), BT), T('PRICES ~+30% SINCE EARLY 2020', 640, 560, pop(t, ph(L, 'since early')), RT), T('LATEST: 3.7% A YEAR (SEPT)', 640, 630, pop(t, ph(L, 'three point seven')), RT)] }; } },
  { id: 'B22', f(t, d, L) { const s = getSet('stage'); hideCards(s, ['mabel', 'wendell', 'gus', 'dot', 'pip', 'linda', 'marcus']); s.wheel.visible = false; once(s, 'bn6', s => (s.banner.userData.draw({ t: 'TONIGHT: ONE TV', s: 'HIGHEST BID WINS', bg: '#ffd36a' }), 1));
      const tv = once(s, 'tv6', s => { const ped = rbox(0.6, 1.0, 0.6, 0.02, std(0x1e1a18), 0.6, s.stageY, s.stageZ); s.S.add(ped); const tv = P6.tv(); tv.position.set(0.6, s.stageY + 1.0, s.stageZ); s.S.add(tv); return tv; });
      const m0 = lineAt(L, 'MABEL').t0; sp(s, 'mabel', -1.0, s.stageZ, { view: 'q', dir: 1, expr: 'happy', arms: [null, t > m0 ? WAVE : null] }, t, L, 'MABEL', 1.55, s.stageY);
      ['wendell', 'gus', 'dot', 'pip', 'linda', 'marcus'].forEach((k, i) => sp(s, k, -2.5 + i * 1.0, s.z0 + 3.2 + (i % 2) * 0.45, { view: 'qback', dir: i % 2 ? -1 : 1, expr: 'happy', arms: [null, (t > m0 && (Math.floor(t * 1.5) + i) % 3 === 0) ? WAVE : null], seed: i }, t, [], null, 1.5 + (i % 3) * 0.12));
      if (t < m0) cl(s, k01(t, 0, m0), [[0, 2.9, s.z0 + 9], [0, 1.5, s.z0 + 1.5]], [[0.3, 2.7, s.z0 + 7.6], [0, 1.5, s.z0 + 1.5]]); else if (t < ph(L, 'sometimes it costs')) cl(s, k01(t, m0, ph(L, 'sometimes it costs')), [[-0.2, 2.5, s.z0 + 5.4], [-0.2, 1.45, s.stageZ]], [[0.2, 2.45, s.z0 + 5.0], [0.2, 1.45, s.stageZ]]); else cl(s, k01(t, ph(L, 'sometimes it costs'), d), [[1.5, 2.9, s.z0 + 8], [0, 1.5, s.z0 + 1.5]], [[-1.0, 3.0, s.z0 + 8.4], [0, 1.5, s.z0 + 1.5]]);
      const pr = t > ph(L, 'eight hundred') ? '$800' : t > ph(L, 'six fifty') ? '$650' : '$500'; return { scene: s.S, cam: s.C, tags: [T(pr, 1060, 220, pop(t, m0), t > ph(L, 'eight hundred') ? RT : YT), T('TOO MUCH MONEY, TOO FEW THINGS', 640, 610, pop(t, ph(L, 'lots of money')) * (1 - k01(t, ph(L, 'sometimes it costs') - 0.3, ph(L, 'sometimes it costs'))), BT), T('COSTS GO UP', 300, 610, pop(t, ph(L, 'costs more to make')), YT), T('EXPECTATIONS', 640, 610, pop(t, ph(L, 'expect prices')), YT), T('FED TARGET: ~2% A YEAR', 980, 610, pop(t, ph(L, 'two percent')), GT)] }; } },
  { id: 'B23', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { cashTin: t > lineAt(L, 'THEO').t0 - 0.5, stub: false }); const th = lineAt(L, 'THEO').t0;
      if (t < th) KW(s, k01(t, 0, th), [[1.2, 1.5, s.iz + 3.4], [0, 1.15, s.iz - 0.4]], [[0.4, 1.42, s.iz + 2.8], [0, 1.15, s.iz - 0.4]]); else cl(s, k01(t, th, d), [[0.2, 1.55, s.iz + 1.4], [0.05, 0.98, s.iz - 0.1]], [[0.1, 1.45, s.iz + 1.2], [0.05, 1.0, s.iz - 0.2]]);
      two(s, t, L, { expr: t > lineAt(L, 'NANA').t0 ? 'sad' : 'happy', look: [0.4, -0.4] }, { expr: 'sly', arms: [null, t > th ? POINT : null] });
      return { scene: s.S, cam: s.C, tags: [T('RAISE RATES ->', 330, 100, pop(t, ph(L, 'raise it')), YT), T('BORROWING COSTS MORE', 640, 160, pop(t, ph(L, 'more expensive')), RT), T('PRICES COOL', 980, 100, pop(t, ph(L, 'cool down')), GT), T('LOSING TO INFLATION SINCE 1996', 640, 620, pop(t, ph(L, 'losing a fight')), RT)] }; } },
];
/* ======================= ACT 5: RECESSIONS ======================= */
ACTS[5] = [
  { id: 'B24', card: '5. Recessions' },
  { id: 'B25', f(t, d, L) { const s = getSet('party6'); hideCards(s, ['wendell', 'gus', 'dot', 'pip', 'mabel', 'linda', 'marcus']); s.mood(0); s.dsign.userData.draw({ t: 'BOOM!' });
      sp(s, 'gus', 0, s.z0 + 0.95, { anim: 'talk', view: 'front', expr: 'happy', arms: [WAVE, null] }, t, [], null, 1.6, 0.3);
      [['wendell', -1.2, 2.9], ['dot', 0.4, 2.7], ['pip', 1.4, 3.3], ['mabel', -0.3, 3.6], ['linda', 1.9, 2.5], ['marcus', -2.0, 3.4]].forEach(([k, x, z], i) => { const b = Math.abs(Math.sin(t * 4.2 + i)); const P = pose({ view: i % 2 ? 'q' : 'front', dir: i % 2 ? 1 : -1, expr: 'happy', arms: [{ h: [0.4 + 0.3 * b, 1.0 + 0.3 * b], hand: 'open' }, { h: [0.5, 1.1 - 0.3 * b], hand: 'open' }], seed: i }, t, [], null); P.bob = -0.08 * b; card(s, k, 1.55).set(x + Math.sin(t * 2 + i) * 0.12, s.z0 + z, P, s.C); });
      const fl = ph(L, 'lights flicker'); if (t > fl) { s.mood(Math.floor(t * 8) % 2 ? 0 : 1); }
      cl(s, k01(t, 0, d), [[-2.5, 1.5, s.z0 + 8], [0, 1.3, s.z0 + 2.5]], [[1.8, 1.7, s.z0 + 6.6], [0, 1.3, s.z0 + 2.5]]);
      return { scene: s.S, cam: s.C, tags: [T('BOOM', 300, 110, pop(t, ph(L, 'in the boom')), GT), T('EVERYONE HIRING', 640, 610, pop(t, ph(L, 'hiring')), YT), T('EVERYONE SPENDING', 980, 110, pop(t, ph(L, 'spending')), YT)] }; } },
  { id: 'B26', f(t, d, L) { const s = getSet('party6'); hideCards(s, ['wendell', 'gus', 'dot', 'pip', 'mabel']); s.mood(1); s.dsign.userData.draw({ t: 'bust.' });
      const g0 = lineAt(L, 'GUS').t0; sp(s, 'wendell', -4.0, s.z0 + 3.0, { view: 'q', dir: -1, expr: 'scared', arms: [{ h: [0.32, 0.6], hand: 'fist' }, null] }, t, L, 'WENDELL', 1.8); sp(s, 'gus', -3.0, s.z0 + 3.4, { view: 'q', dir: -1, expr: 'sly' }, t, L, 'GUS', 1.6);
      ['dot', 'pip', 'mabel'].forEach((k, i) => sp(s, k, -0.6 + i * 0.9, s.z0 + 3.0 + i * 0.3, { view: 'front', expr: 'sad', seed: i }, t, [], null, 1.5));
      if (t < ph(L, 'spending drops')) cl(s, k01(t, 0, ph(L, 'spending drops')), [[-2.0, 1.6, s.z0 + 6.0], [-3.6, 1.3, s.z0 + 3]], [[-2.5, 1.55, s.z0 + 5.4], [-3.6, 1.3, s.z0 + 3]]); else cl(s, k01(t, ph(L, 'spending drops'), d), [[0, 2.4, s.z0 + 8.5], [0, 1.2, s.z0 + 2.5]], [[0, 2.0, s.z0 + 7.4], [0, 1.2, s.z0 + 2.5]]);
      return { scene: s.S, cam: s.C, tags: [T('BUST', 980, 110, pop(t, 0.5), RT), T('LESS SPENDING', 280, 600, pop(t, ph(L, 'spending drops')), RT), T('LAYOFFS', 640, 600, pop(t, ph(L, 'lay people off')), RT), T('EVEN LESS SPENDING', 990, 600, pop(t, ph(L, 'even less')), RT)] }; } },
  { id: 'B27', f(t, d, L) { const s = getSet('cork'); hideCards(s);
      const cs = once(s, 'cards6', s => { const mk = (txt, sub, col) => board(0.9, 0.55, (x, w, h, o) => { paperBg(x, w, h, '#fbf6ea'); x.fillStyle = col; x.fillRect(0, 0, w, h * 0.16); ltxt(x, txt, w / 2, h * 0.42, h * 0.13, INK, 'center'); ltxt(x, sub, w / 2, h * 0.68, h * 0.09, '#5a4a3a', 'center'); if (o && o.stamp) { x.save(); x.translate(w / 2, h / 2); x.rotate(-0.2); x.strokeStyle = REDC; x.lineWidth = 8; x.strokeRect(-w * 0.36, -h * 0.13, w * 0.72, h * 0.26); ltxt(x, o.stamp, 0, 0, h * 0.13, REDC, 'center'); x.restore(); } });
        const a = mk('2 QUARTERS OF FALLING GDP?', 'what you usually hear', '#d9a23a'), b = mk('NBER DECIDES', 'big drop · whole economy · months', '#2f4d6b'), c = mk('DEC 2007 - JUN 2009', 'the Great Recession', '#6b3f5e'), e = mk('FEB - APR 2020', '2 months · shortest ever', '#c2372d');
        [[a, -1.05, 1.95], [b, 0.05, 1.85], [c, -0.55, 1.2], [e, 0.6, 1.15]].forEach(([p, x, y], i) => { p.position.set(x, y, s.z0 + 0.07 + i * 0.002); p.rotation.z = (i % 2 ? 1 : -1) * 0.04; s.S.add(p); }); return [a, b, c, e]; });
      cs[0].userData.draw(t > ph(L, 'handy rule') ? { stamp: 'RULE OF THUMB' } : {}); cs[0].visible = true; cs[1].visible = t > ph(L, 'national bureau') - 0.4; cs[2].visible = t > ph(L, 'great recession') - 0.3; cs[3].visible = t > ph(L, 'covid') - 0.3;
      const fo = t < ph(L, 'national bureau') ? [-1.05, 1.95] : t < ph(L, 'great recession') ? [0.05, 1.85] : t < ph(L, 'covid') ? [-0.55, 1.2] : [0.6, 1.15]; const k = Math.min(1, (t % 100) * 0.1);
      CAM(s, [fo[0] * 0.7 + Math.sin(t * 0.3) * 0.05, fo[1] * 0.85 + 0.25, s.z0 + 2.4 - k * 0.2], [fo[0] * 0.85, fo[1] * 0.92, s.z0]);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'B28', f(t, d, L) { const s = getSet('party6'); hideCards(s, ['mabel', 'pip', 'gus', 'dot', 'wendell']); const k = k01(t, 0.3, 3); s.mood(2); s.blinds.userData.draw({ day: true, open: E(k) }); s.dsign.userData.draw({ t: 'RECOVERY' });
      walkTo(s, 'mabel', 1.6, 2.6, s.z0 + 1.2, t, 0.2, 1.6, { view: 'qback', dir: 1, expr: 'happy', arms: [null, UP] }, L, null, 1.55);
      sp(s, 'pip', -1.0, s.z0 + 3.2 + Math.sin(t * 0.8) * 0.05, { view: 'q', dir: 1, expr: 'neutral', arms: [{ h: [0.35, 0.5], hand: 'fist' }, { h: [0.4, 0.3], hand: 'fist' }] }, t, [], null, 1.5);
      sp(s, 'gus', 0, s.z0 + 0.95, { view: 'front', expr: 'happy', arms: [null, t > ph(L, 'party restarts') ? WAVE : null] }, t, [], null, 1.6, 0.3);
      ['dot', 'wendell'].forEach((kk, i) => { if (t > ph(L, 'spending again')) walkTo(s, kk, -5 + i * 0.3, -2.4 + i * 1.4, s.z0 + 3.6 - i * 0.4, t, ph(L, 'spending again'), ph(L, 'spending again') + 2.2, { view: 'q', dir: 1, expr: 'happy' }, [], null, kk === 'wendell' ? 1.8 : 1.55); else card(s, kk, 1.55).hide(); });
      cl(s, k01(t, 0, d), [[0, 1.8, s.z0 + 8.5], [0.4, 1.4, s.z0 + 2]], [[-0.8, 1.6, s.z0 + 6.8], [0.2, 1.4, s.z0 + 2]]);
      return { scene: s.S, cam: s.C, tags: [T('RECOVERY', 640, 100, pop(t, 0.6), GT), T('LOWER RATES', 300, 600, pop(t, ph(L, 'cut interest')), GT), T('GOVERNMENT HELP', 640, 600, pop(t, ph(L, 'send out help')), GT), T('SAVE MONTHS OF BILLS FIRST', 980, 600, pop(t, ph(L, 'few months')), YT)] }; } },
];
/* ======================= ACT 6: CREDIT SCORES ======================= */
ACTS[6] = [
  { id: 'B29', card: '6. Credit Scores' },
  { id: 'B30', f(t, d, L) { const s = getSet('office6'); hideCards(s, ['mabel', 'theo']); const v = t < ph(L, 'national average') ? lerp(300, 850, 0.5 + 0.5 * Math.sin(t * 1.2)) : 714; s.dial.userData.draw({ v: Math.round(v), label: t > ph(L, 'national average') ? 'AVG 714' : '' }); s.report.userData.draw({ score: t > lineAt(L, 'MABEL', 1).t0 ? 'SCORE: no history' : 'SCORE: ?' });
      const m0 = lineAt(L, 'MABEL').t0; sp(s, 'mabel', 0.25, s.dz - 0.65, { view: 'front', expr: t > lineAt(L, 'MABEL', 1).t0 ? 'sly' : 'neutral', look: [0, -0.4] }, t, L, 'MABEL', 1.55); sp(s, 'theo', -1.3, s.dz + 1.0, { view: 'q', dir: 1, expr: t > m0 ? 'scared' : 'neutral', arms: [t > lineAt(L, 'THEO').t0 ? UP : null, null] }, t, L, 'THEO', 1.65);
      if (t < m0) cl(s, k01(t, 0, m0), [[0, 2.25, s.dz + 3.6], [0, 1.5, s.z0]], [[0, 2.2, s.dz + 2.6], [0, 1.55, s.z0]]); else cl(s, k01(t, m0, d), [[-1.6, 1.55, s.dz + 3.1], [-0.4, 1.2, s.dz]], [[-1.2, 1.5, s.dz + 2.8], [-0.4, 1.2, s.dz]]);
      return { scene: s.S, cam: s.C, tags: [T('300 - 850', 300, 110, pop(t, ph(L, 'three hundred to')), YT), T('NOT WEALTH. TRUST.', 980, 110, pop(t, ph(L, 'how rich')), BT), T('LANDLORDS · LENDERS · PHONE COMPANIES', 640, 620, pop(t, ph(L, 'landlords')), YT)] }; } },
  { id: 'B31', f(t, d, L) { const s = getSet('office6'); hideCards(s); s.dial.userData.draw({ v: Math.round(lerp(640, 760, k01(t, ph(L, 'never pay late'), d))) });
      const pie = once(s, 'pie6', s => { const b = board(1.3, 1.3, (x, w, h, o) => { o = o || {}; x.clearRect(0, 0, w, h); const P = [[35, '#3f9b5f', 'PAYMENT HISTORY'], [30, '#2f6b8a', 'AMOUNTS OWED'], [15, '#d9a23a', 'LENGTH'], [10, '#6b3f5e', 'NEW CREDIT'], [10, '#c2372d', 'MIX']]; let a = -Math.PI / 2; P.forEach(([v, c, lb], i) => { if ((o.n || 0) <= i) return; const b2 = a + v / 100 * TAU; x.fillStyle = c; x.beginPath(); x.moveTo(w / 2, h / 2); x.arc(w / 2, h / 2, w * 0.42, a, b2); x.closePath(); x.fill(); x.strokeStyle = '#fbf6ea'; x.lineWidth = 6; x.stroke(); const m = (a + b2) / 2; ltxt(x, v + '%', w / 2 + Math.cos(m) * w * 0.27, h / 2 + Math.sin(m) * h * 0.27, h * 0.07, '#fff', 'center'); a = b2; }); }); b.material.transparent = true; b.position.set(0.1, 1.38, s.dz + 0.15); b.rotation.x = -0.2; s.S.add(b); return b; });
      const n = [ph(L, 'payment history'), ph(L, 'how much you owe'), ph(L, 'how long'), ph(L, 'new applications'), ph(L, 'the mix')].filter(v => t > v).length; pie.userData.draw({ n }); pie.visible = true;
      cl(s, k01(t, 0, d), [[0.1, 1.5, s.dz + 1.9], [0.1, 1.3, s.dz]], [[0.3, 1.45, s.dz + 1.55], [0.1, 1.3, s.dz]]);
      return { scene: s.S, cam: s.C, tags: [T('PAYMENT HISTORY 35%', 230, 140, pop(t, ph(L, 'payment history')), GT), T('AMOUNTS OWED 30%', 230, 230, pop(t, ph(L, 'how much you owe')), BT), T('LENGTH 15%', 1060, 140, pop(t, ph(L, 'how long')), YT), T('NEW CREDIT 10%', 1060, 230, pop(t, ph(L, 'new applications')), YT), T('MIX 10%', 1060, 320, pop(t, ph(L, 'the mix')), RT), T('AUTOPAY THE MINIMUM · KEEP BALANCES LOW', 640, 630, pop(t, ph(L, 'autopay')), GT)] }; } },
  { id: 'B32', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { oldCard: true, stub: false, cups: true });
      if (t < lineAt(L, 'NANA').t0) cl(s, k01(t, 0, lineAt(L, 'NANA').t0), [[0.3, 1.4, s.iz + 0.9], [0.15, 0.93, s.iz + 0.25]], [[0.2, 1.25, s.iz + 0.7], [0.15, 0.93, s.iz + 0.25]]); else KW(s, k01(t, lineAt(L, 'NANA').t0, d));
      two(s, t, L, { expr: t > lineAt(L, 'THEO', 1).t0 ? 'sly' : 'neutral', arms: [t > lineAt(L, 'THEO', 1).t0 ? POINT : null, null] }, { expr: t > lineAt(L, 'NANA', 1).t0 ? 'sly' : 'happy', arms: [null, t > lineAt(L, 'NANA', 1).t0 ? POINT : HOLD] });
      return { scene: s.S, cam: s.C, tags: [T('OPENED 1986', 640, 110, pop(t, 0.6), YT), T('OLD ACCOUNTS HELP', 640, 610, pop(t, ph(L, 'loves old')), GT)] }; } },
];
/* ======================= ACT 7: WHAT MONEY IS ======================= */
ACTS[7] = [
  { id: 'B33', card: '7. What Money Is' },
  { id: 'B34', f(t, d, L) { const s = getSet('island6'); hideCards(s, ['islander']); const rk = k01(t, 1.0, ph(L, 'everyone just') + 1); const rx = lerp(-3.5, 1.4, E(rk)); s.roll.position.set(rx, 0.74, 1.0); s.roll.rotation.set(0, 0, -(rx + 3.5) / 0.75);
      walkTo(s, 'islander', -4.4, 0.6, 1.5, t, 1.0, ph(L, 'everyone just') + 1, { view: 'q', dir: 1, expr: 'happy' }, L, null, 1.6);
      cl(s, k01(t, 0, d), [[-6, 2.6, 9], [-2, 1.4, -1]], [[1.2, 1.7, 7.0], [0.6, 1.3, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('YAP · PACIFIC OCEAN', 300, 100, pop(t, ph(L, 'island of yap')), BT), T('RAI: STONE MONEY', 980, 100, pop(t, ph(L, 'called rai')), YT), T('OWNERSHIP = WHAT EVERYONE REMEMBERS', 640, 620, pop(t, ph(L, 'remembered who')), GT)] }; } },
  { id: 'B35', f(t, d, L) { const s = getSet('island6'); hideCards(s, ['islander', 'dotIsle']); s.roll.position.set(1.4, 0.74, 1.0);
      const d0 = lineAt(L, 'DOT').t0; sp(s, 'dotIsle', -0.6, 2.4, { view: t < d0 ? 'qback' : 'q', dir: 1, expr: t > lineAt(L, 'DOT', 2).t0 ? 'surprised' : 'neutral', arms: [t < d0 ? POINT : null, null] }, t, L, 'DOT', 1.55); sp(s, 'islander', 0.6, 2.6, { view: 'q', dir: -1, expr: 'sly', arms: [null, t > lineAt(L, 'PIP', 1).t0 ? POINT : null] }, t, L, 'PIP', 1.6);
      if (t < d0) cl(s, k01(t, 0, d0), [[0, 2.6, -9], [1.5, -1.5, -15]], [[0.6, 1.6, -11.8], [1.5, -1.6, -15]]); else cl(s, k01(t, d0, d), [[0, 1.6, 6.4], [0, 1.25, 2.4]], [[0, 1.5, 5.4], [0, 1.25, 2.4]]);
      return { scene: s.S, cam: s.C, tags: [T('STILL COUNTED AS MONEY', 640, 110, pop(t, ph(L, 'kept counting')) * (1 - k01(t, d0 - 0.3, d0)), YT), T('NUMBERS ON A SCREEN', 640, 620, pop(t, ph(L, 'numbers on a screen')), BT)] }; } },
  { id: 'B36', f(t, d, L) { const s = getSet('marble'); hideCards(s); s.easel.visible = false; s.peds.forEach(p => p.visible = false);
      const o = once(s, 'mon6', s => { const ped = (x) => { const p = rbox(0.8, 1.0, 0.8, 0.02, std(0x1e1a18, { roughness: 0.4 }), x, 0, s.z0 + 3.0); s.S.add(p); return p; }; ped(-0.8); ped(0.8);
        const bill = board(0.62, 0.27, (x, w, h) => { x.fillStyle = '#c8d8b8'; x.fillRect(0, 0, w, h); x.strokeStyle = '#2f5a3a'; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, '1', w * 0.1, h * 0.25, h * 0.25, '#2f5a3a', 'center'); ltxt(x, 'ONE DOLLAR', w / 2, h * 0.75, h * 0.16, '#2f5a3a', 'center'); x.fillStyle = '#9ab08a'; x.beginPath(); x.ellipse(w / 2, h * 0.42, w * 0.1, h * 0.26, 0, 0, TAU); x.fill(); }); bill.position.set(-0.8, 1.25, s.z0 + 3.0); bill.rotation.x = -0.3; s.S.add(bill);
        const gold = rbox(0.42, 0.15, 0.2, 0.02, std(0xe0b84a, { metalness: 0.95, roughness: 0.2 }), 0.8, 1.0, s.z0 + 3.0); s.S.add(gold); const glass = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.5), std(0xdfe8ff, { transparent: true, opacity: 0.18, roughness: 0.05 })); glass.position.set(0.8, 1.26, s.z0 + 3.0); s.S.add(glass);
        const chain = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 16), std(0xc9a24a, { metalness: 0.9 })); chain.position.set(0, 1.2, s.z0 + 3.0); s.S.add(chain); return { bill, gold, glass, chain }; });
      const cut = ph(L, 'cut that link'); o.gold.position.x = lerp(0.8, 3.5, E(k01(t, cut + 0.3, cut + 2.2))); o.glass.position.x = o.gold.position.x; o.chain.visible = t < cut + 0.3;
      s.bd.userData.draw({ lines: [] });
      cl(s, k01(t, 0, d), [[0, 1.6, s.z0 + 7.6], [0, 1.3, s.z0 + 3]], [[0.2, 1.5, s.z0 + 5.2], [0, 1.2, s.z0 + 3]]);
      return { scene: s.S, cam: s.C, tags: [T('AUG 15, 1971', 640, 100, pop(t, ph(L, 'august nineteen')), BT), T('BACKED BY: TRUST', 640, 170, pop(t, ph(L, 'one thing: trust')), GT), T('TOO MUCH -> PRICES RUN', 330, 610, pop(t, ph(L, 'print too much')), RT), T('TOO LITTLE -> ECONOMY CHOKES', 950, 610, pop(t, ph(L, 'too little')), RT)] }; } },
];
/* ======================= ACT 8: INVESTING ======================= */
ACTS[8] = [
  { id: 'B37', card: '8. Investing' },
  { id: 'B38', f(t, d, L) { const s = getSet('orchard6'); hideCards(s, ['theo', 'nana']); s.extras.forEach(e => e.visible = false); s.sap.scale.setScalar(0.01);
      walkTo(s, 'theo', -3, -0.6, 2.4, t, 0.3, 2.6, { view: 'q', dir: 1, expr: 'happy', arms: [HOLD, null] }, L, null, 1.65); sp(s, 'nana', 0.8, 2.3, { view: 'q', dir: -1, expr: 'happy', arms: [null, HOLD] }, t, L, null, 1.5);
      cl(s, k01(t, 0, d), [[-1, 2.4, 9], [0, 1.2, 0]], [[0.2, 1.7, 6.6], [0, 1.2, 1.5]]);
      return { scene: s.S, cam: s.C, tags: [T('INFLATION SHRINKS STILL MONEY', 640, 100, pop(t, ph(L, 'inflation slowly')), RT), T('HOURS -> MONEY', 330, 610, pop(t, ph(L, 'trading your hours')), YT), T('MONEY -> A SHARE OF GROWTH', 950, 610, pop(t, ph(L, 'trade money')), GT)] }; } },
  { id: 'B39', f(t, d, L) { const s = getSet('orchard6'); hideCards(s); const P = ['stocks', 'bonds', 'funds', 'real estate']; s.extras.forEach((e, i) => { const tt = ph(L, P[i] + ':'); e.visible = t > tt; if (e.visible) e.scale.setScalar(Math.max(0.01, outBack(k01(t, tt, tt + 0.5)))); });
      const f = P.filter(p => t > ph(L, p + ':')).length - 1; const x = f < 0 ? -2.4 : -2.4 + f * 1.6; const cx = s.C.position.x; CAM(s, [lerp(cx || -3, x * 0.85, 0.06), 1.45, 2.5], [lerp(cx || -3, x * 0.85, 0.06) * 1.0, 1.15, 0]);
      return { scene: s.S, cam: s.C, tags: [T('STOCKS', 220, 110, pop(t, ph(L, 'stocks:')), GT), T('BONDS', 520, 110, pop(t, ph(L, 'bonds:')), BT), T('FUNDS', 790, 110, pop(t, ph(L, 'funds:')), YT), T('REAL ESTATE', 1070, 110, pop(t, ph(L, 'real estate:')), RT), T('ONE BAD APPLE CAN\'T SINK YOU', 640, 620, pop(t, ph(L, 'bad apple')), GT)] }; } },
  { id: 'B40', f(t, d, L) { const s = getSet('orchard6'); hideCards(s, ['theo', 'pip']); s.extras.forEach(e => e.visible = false); s.sap.scale.setScalar(Math.max(0.01, 0.15 * k01(t, 0.5, 1.2)));
      const p0 = lineAt(L, 'PIP').t0; sp(s, 'theo', -0.15, 2.5, { view: 'q', dir: 1, expr: t > lineAt(L, 'PIP', 1).t0 ? 'sad' : 'neutral', look: [0.4, -0.6], arms: [null, CHIN] }, t, L, 'THEO', 1.65);
      const px = walkTo(s, 'pip', -4.0, 2.6, 3.0, t, p0 - 1.6, d - 0.3, { view: 'q', dir: 1, expr: 'sly' }, L, 'PIP', 1.5); s.wb.position.set(px + 0.55, 0, 3.0); s.wb.userData.wheel.rotation.y = 0; s.wb.userData.wheel.rotation.z = -px * 3;
      cl(s, k01(t, 0, d), [[0.9, 1.3, 4.6], [0.1, 0.8, 2.3]], [[0.5, 1.4, 5.2], [0, 0.9, 2.4]]);
      return { scene: s.S, cam: s.C, tags: [T('DAY 1', 300, 110, pop(t, 0.5), YT), T('STILL DAY 1', 980, 110, pop(t, lineAt(L, 'THEO', 1).t0), YT)] }; } },
  { id: 'B41', f(t, d, L) { const s = getSet('trading'); hideCards(s);
      const bd = once(s, 'chart6', s => { const b = screenB(4.6, 1.3, (x, w, h, o) => { o = o || {}; x.fillStyle = '#07090c'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 2; for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0, h * i / 5); x.lineTo(w, h * i / 5); x.stroke(); }
          const pts = []; const N = 200, prog = o.p == null ? 1 : o.p; for (let i = 0; i <= N * prog; i++) { const u = i / N; let v = 0.12 + u * 0.72 + Math.sin(u * 40) * 0.015; const dip = (c, wd, dp) => { const z = (u - c) / wd; return z > -1 && z < 1.6 ? -dp * Math.max(0, 1 - Math.abs(z < 0 ? z : z / 1.6)) : 0; }; v += dip(0.18, 0.04, 0.12) + dip(0.48, 0.035, 0.2) + dip(0.82, 0.015, 0.12); pts.push([u * w, h - v * h]); }
          x.strokeStyle = '#3fdc7f'; x.lineWidth = 11; x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.stroke(); [[0.18, '2000'], [0.48, '2008'], [0.82, '2020']].forEach(([u, lb]) => { if (u < prog) ltxt(x, lb, u * w, h * 0.93, h * 0.07, '#ff6a5a', 'center'); });
          const last = pts[pts.length - 1]; if (last && o.rider) { x.fillStyle = '#ffd36a'; x.beginPath(); x.arc(last[0], last[1] - 14, 12, 0, TAU); x.fill(); ltxt(x, 'THEO', last[0], last[1] - 40, h * 0.06, '#ffd36a', 'center'); } }); b.position.set(0, 2.53, s.z0 + 0.12); s.S.add(b); return b; }); s.ticker.userData.draw && s.ticker.userData.draw({ title: 'US STOCKS · LONG RUN · 1990-2026', clock: ' ' });
      once(s, 'tl6', s => { const l = new THREE.PointLight(0xffe8c8, 16, 16, 1.2); l.position.set(0, 3.2, s.z0 + 4.5); s.S.add(l); s.S.add(new THREE.HemisphereLight(0xffe8c8, 0x3a2a1c, 0.8)); const l2 = new THREE.PointLight(0xffd0a0, 8, 10, 1.2); l2.position.set(-3, 1.6, s.z0 + 2.5); s.S.add(l2); return l; }); bd.userData.draw({ p: k01(t, 0.3, ph(L, 'bigger danger')), rider: true });
      cl(s, k01(t, 0, d), [[-1.0, 2.2, s.z0 + 5.8], [0, 2.65, s.z0]], [[0.2, 2.4, s.z0 + 4.9], [0, 2.7, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('~7% A YEAR AFTER INFLATION (LONG-RUN AVG)', 640, 620, pop(t, ph(L, 'roughly seven')), GT), T('THE REAL DANGER: NEVER STARTING', 640, 100, pop(t, ph(L, 'never starting')), RT)] }; } },
];
/* ======================= ACT 9: VALUE ======================= */
ACTS[9] = [
  { id: 'B42', card: '9. Value' },
  { id: 'B43', f(t, d, L) { const s = getSet('desert6'); hideCards(s, ['wendell', 'dot']); s.sign.userData.draw({ t: t > lineAt(L, 'DOT').t0 ? 'WATER: 2 DIAMONDS' : 'WATER', c: t > lineAt(L, 'DOT').t0 ? REDC : INK }); s.rain.visible = false; s.cloud.position.x = -12;
      const w0 = lineAt(L, 'WENDELL').t0; sp(s, 'dot', 0.2, -0.75, { view: 'front', expr: t > lineAt(L, 'DOT', 1).t0 ? 'sly' : 'happy', arms: [null, t > lineAt(L, 'DOT').t0 ? UP : null] }, t, L, 'DOT', 1.55);
      const wx = walkTo(s, 'wendell', -5.5, -1.5, 0.9, t, 0.4, Math.max(2, w0 - 0.6), { view: 'q', dir: 1, expr: t > lineAt(L, 'WENDELL', 1).t0 ? 'scared' : 'sad', arms: [HOLD, null] }, L, 'WENDELL', 1.8);
      s.bag.visible = true; s.bag.position.set(wx + 0.28, 0.75, 1.05); s.dia.forEach((dd, i) => { dd.visible = t > lineAt(L, 'DOT').t0; dd.position.set(-0.5 + i * 0.18, 1.05, 0.1); dd.rotation.y = t * 2; });
      if (t < w0) cl(s, k01(t, 0, w0), [[-2, 1.8, 8.5], [0, 1.2, 0]], [[-1, 1.6, 6.5], [-0.5, 1.2, 0]]); else cl(s, k01(t, w0, d), [[-0.8, 1.6, 4.4], [-0.6, 1.3, 0.2]], [[-0.4, 1.55, 3.9], [-0.6, 1.3, 0.2]]);
      return { scene: s.S, cam: s.C, post: x => { x.save(); x.globalAlpha = 0.06; x.fillStyle = '#ffd890'; x.fillRect(0, 0, W, H); x.restore(); }, tags: [T('WATER: keeps you alive', 300, 110, pop(t, ph(L, 'water keeps')) * (1 - k01(t, w0 - 0.3, w0)), GT), T('DIAMONDS: don\'t', 980, 110, pop(t, ph(L, 'diamonds don')) * (1 - k01(t, w0 - 0.3, w0)), YT), T('PRICE = HOW BADLY YOU WANT THE NEXT ONE', 640, 620, pop(t, ph(L, 'next one')) * (1 - k01(t, w0 - 0.3, w0)), BT)] }; } },
  { id: 'B44', f(t, d, L) { const s = getSet('desert6'); hideCards(s, ['dot', 'wendell']); const rk = k01(t, 0.4, 4); s.cloud.position.x = lerp(-8, 0, E(rk)); s.rain.visible = rk > 0.6 && t < ph(L, 'surgeon'); s.bag.visible = false; s.dia.forEach(dd => dd.visible = false);
      s.sign.userData.draw(rk < 0.75 ? { t: 'WATER: 2 DIAMONDS', c: REDC } : { t: 'WATER: 1 PEBBLE', c: GRN });
      sp(s, 'dot', 0.2, -0.75, { view: 'front', expr: rk > 0.75 ? 'sad' : 'sly', look: [0, 0.6] }, t, [], null, 1.55); sp(s, 'wendell', -1.5, 0.9, { view: 'q', dir: 1, expr: rk > 0.75 ? 'happy' : 'sad', arms: [rk > 0.75 ? WAVE : null, null] }, t, [], null, 1.8);
      cl(s, k01(t, 0, d), [[0, 2.2, 7.5], [0, 1.6, 0]], [[1.6, 1.7, 6.0], [-0.3, 1.3, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('PAY = VALUE + HOW HARD TO REPLACE', 640, 100, pop(t, ph(L, 'proportion')), GT), T('SURGEON vs CASHIER: fewer can do it', 640, 170, pop(t, ph(L, 'surgeon')), YT), T('BRANDS: belief = price', 640, 240, pop(t, ph(L, 'a brand')), YT), T('WHAT PROBLEM CAN I SOLVE?', 640, 620, pop(t, ph(L, 'what problem')), BT)] }; } },
];
/* ======================= ACT 10: TIME ======================= */
const CLK = (s, gsp) => s.S.userData.gsp(gsp);
ACTS[10] = [
  { id: 'B45', card: '10. Time' },
  { id: 'B46', f(t, d, L) { const s = getSet('clock6'); hideCards(s, ['pip', 'gus']); CLK(s, 1); s.setFill(s.jarA, s.fillA, 0.05 * k01(t, ph(L, 'two hundred dollars'), ph(L, 'he stops'))); s.setFill(s.jarB, s.fillB, 0.0);
      sp(s, 'pip', -1.45, s.bz - 0.1, { view: 'q', dir: 1, expr: t > ph(L, 'he stops') ? 'sly' : 'happy', arms: [null, t > ph(L, 'he stops') ? UP : null] }, t, [], null, 1.5, s.by); const gx = walkTo(s, 'gus', 4.5, 1.45, s.bz - 0.1, t, ph(L, 'gus starts') - 0.4, ph(L, 'gus starts') + 1.6, { view: 'q', dir: -1, expr: 'happy' }, [], null, 1.6, s.by); if (t < ph(L, 'gus starts') - 0.4) card(s, 'gus', 1.6).hide();
      if (t < ph(L, 'gus starts')) cl(s, k01(t, 0, ph(L, 'gus starts')), [[-2.5, 3.6, s.bz + 4.5], [-1.0, 2.8, s.bz]], [[-1.3, 3.2, s.bz + 3.2], [-1.0, 2.7, s.bz]]); else cl(s, k01(t, ph(L, 'gus starts'), d), [[2.0, 3.4, s.bz + 4.0], [1.0, 2.8, s.bz]], [[0, 3.6, s.bz + 5.4], [0, 3.0, s.bz]]);
      return { scene: s.S, cam: s.C, tags: [T('PIP: STARTS AT 25', 300, 100, pop(t, ph(L, 'twenty-five')), GT), T('$200/MONTH · 7%', 300, 170, pop(t, ph(L, 'two hundred dollars')), YT), T('STOPS AT 35', 300, 240, pop(t, ph(L, 'he stops')), RT), T('GUS: 35 -> 65', 980, 100, pop(t, ph(L, 'gus starts')), BT), T('$200/MONTH · 30 YEARS', 980, 170, pop(t, ph(L, 'thirty years')), YT)] }; } },
  { id: 'B47', f(t, d, L) { const s = getSet('clock6'); hideCards(s, ['pip', 'gus']); const k = E(k01(t, 0.5, ph(L, 'about two hundred and eighty-one') + 0.4)); CLK(s, lerp(1, 18, k01(t, 0.5, 2)) * (1 - k01(t, ph(L, 'the man who'), ph(L, 'the man who') + 1)) + 1);
      s.setFill(s.jarA, s.fillA, lerp(0.05, 1, k)); s.setFill(s.jarB, s.fillB, lerp(0.0, 0.87, k));
      const g0 = lineAt(L, 'GUS').t0; sp(s, 'pip', -1.45, s.bz - 0.1, { view: 'q', dir: 1, expr: t > lineAt(L, 'PIP').t0 ? 'sly' : 'happy' }, t, L, 'PIP', 1.5, s.by); sp(s, 'gus', 1.45, s.bz - 0.1, { view: 'q', dir: -1, expr: t > g0 ? 'surprised' : 'happy', arms: [t > g0 ? UP : null, null] }, t, L, 'GUS', 1.6, s.by);
      if (t < g0) cl(s, k01(t, 0, g0), [[0, 3.2, s.bz + 5.4], [0, 2.75, s.bz]], [[0, 3.1, s.bz + 4.8], [0, 2.75, s.bz]]); else cl(s, k01(t, g0, d), [[0, 3.2, s.bz + 5.2], [0, 2.9, s.bz]], [[0, 3.2, s.bz + 5.0], [0, 2.9, s.bz]]);
      return { scene: s.S, cam: s.C, tags: [T('PIP PUT IN $24,000', 300, 100, pop(t, ph(L, 'twenty-four thousand')), YT), T('GUS PUT IN $72,000', 980, 100, pop(t, ph(L, 'seventy-two')), YT), T('AT 65: ~$281,000', 300, 170, pop(t, ph(L, 'two hundred and eighty-one')), GT), T('AT 65: ~$244,000', 980, 170, pop(t, ph(L, 'two hundred and forty-four')), GT), T('10 EXTRA YEARS TO COMPOUND', 640, 620, pop(t, ph(L, 'ten extra years')), GT)] }; } },
  { id: 'B48', f(t, d, L) { const s = getSet('clock6'); hideCards(s, ['theo']); CLK(s, 1.2); s.setFill(s.jarA, s.fillA, 1); s.setFill(s.jarB, s.fillB, 0.87);
      sp(s, 'theo', 0.4, s.z0 + 5.6, { view: 'qback', dir: -1, expr: 'neutral', look: [0, 0.8] }, t, [], null, 1.65);
      cl(s, k01(t, 0, d), [[0.6, 4.6, s.z0 + 2.6], [0, 4.6, s.z0]], [[1.8, 1.5, s.z0 + 9.2], [0, 3.4, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('1 HOUR = 1 PAYCHECK', 330, 110, pop(t, ph(L, 'an hour for')), YT), T('INVESTING FLIPS IT', 950, 110, pop(t, ph(L, 'flips that')), GT), T('AT 22: THE MOST TIME HE\'LL EVER HAVE', 640, 620, pop(t, ph(L, 'most time')), GT)] }; } },
];
/* ======================= ACT 11: YOUR WALLET + ENDING ======================= */
ACTS[11] = [
  { id: 'B49', card: 'Your Wallet' },
  { id: 'B50', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { cards: 10, stubO: { plan: true }, cups: true, pl: 7 }); s.clock.userData.set(11, 50);
      const steps = ['know where', 'insured bank', 'kill any debt', 'on time', 'low-cost'];
      cl(s, k01(t, 0, d * 0.55), [[0, 1.8, s.iz + 1.4], [0, 0.93, s.iz + 0.05]], [[0, 1.6, s.iz + 1.1], [0, 0.93, s.iz + 0.05]]); if (t > d * 0.55) KW(s, k01(t, d * 0.55, d));
      two(s, t, L, { expr: 'happy', look: [0.2, -0.5] }, { expr: 'happy' });
      const lab = ['1 KNOW YOUR PAYCHECK', '2 INSURED BANK + A FEW MONTHS SAVED', '3 KILL 20% DEBT', '4 PAY ON TIME (AUTOPAY)', '5 LOW-COST BROAD FUND, EARLY']; const tags = lab.map((l, i) => T(l, i % 2 ? 900 : 380, 120 + Math.floor(i / 2) * 80 + (i === 4 ? 0 : 0), pop(t, ph(L, steps[i])) * (1 - k01(t, d * 0.55 - 0.3, d * 0.55)), i === 2 ? RT : i === 4 ? GT : YT));
      tags.push(T('INFLATION vs MONEY THAT SITS · TIME FOR MONEY THAT MOVES', 640, 620, pop(t, ph(L, 'inflation is working')), BT)); return { scene: s.S, cam: s.C, tags }; } },
  { id: 'B51', f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { cards: 10, stubO: { plan: true }, cups: true, phone: { l1: 'AUTOPAY ON ✓', l2: '$100 -> FUND', c: '#2f4d6b', l3: 'every month' } }); s.clock.userData.set(11, 52); s.phone.position.x = -0.35;
      KW(s, k01(t, 0, d), [[-0.4, 1.5, s.iz + 3.9], [0, 1.1, s.iz - 0.3]], [[0.2, 1.45, s.iz + 3.4], [0, 1.1, s.iz - 0.3]]);
      two(s, t, L, { expr: t > lineAt(L, 'THEO', 1).t0 ? 'sly' : 'happy', arms: [t < lineAt(L, 'NANA').t0 ? UP : null, null] }, { expr: t > lineAt(L, 'NANA', 1).t0 ? 'sly' : 'happy', arms: [null, t > lineAt(L, 'NANA', 1).t0 ? POINT : null] });
      return { scene: s.S, cam: s.C, tags: [T('$100/MONTH -> FUND', 330, 110, pop(t, ph(L, 'a hundred dollars')), GT), T('AUTOPAY ON', 950, 110, pop(t, ph(L, 'autopay on')), GT)] }; } },
  { id: 'B52', noBlurOut: true, f(t, d, L) { const s = getSet('nana6'); hideCards(s, ['theo', 'nana']); KIT(s, { cards: 10, stubO: { plan: true }, cups: true, receipt: t > 0.6 }); s.clock.userData.set(11, 55); s.receipt.position.x = lerp(0.62, 0.15, E(k01(t, 0.6, 1.6)));
      const n0 = lineAt(L, 'N').t0; const fade = k01(t, d - 5.0, d - 3.4);
      if (t < lineAt(L, 'NANA', 1).t0) cl(s, k01(t, 0, lineAt(L, 'NANA', 1).t0), [[0.3, 1.4, s.iz + 0.9], [0.2, 0.93, s.iz + 0.1]], [[0.2, 1.3, s.iz + 0.75], [0.2, 0.93, s.iz + 0.1]]); else if (t < n0) KW(s, k01(t, lineAt(L, 'NANA', 1).t0, n0)); else cl(s, k01(t, n0, d - 4), [[0, 1.42, s.iz + 2.6], [0, 1.1, s.iz - 0.4]], [[0, 2.0, s.iz + 6.2], [0, 1.2, s.iz - 0.6]]);
      two(s, t, L, { expr: t > lineAt(L, 'THEO').t0 && t < n0 ? 'surprised' : 'happy', arms: [t > lineAt(L, 'THEO').t0 && t < n0 ? UP : null, null] }, { expr: 'sly', arms: [null, t < lineAt(L, 'NANA', 1).t1 ? POINT : null] });
      return { scene: s.S, cam: s.C, post: x => { if (fade > 0) { x.save(); x.globalAlpha = fade; x.fillStyle = '#060504'; x.fillRect(0, 0, W, H); x.restore(); } }, tags: [T('$12', 640, 110, pop(t, ph(L, 'twelve dollars')) * (1 - fade), RT), T('$2,000 -> $1,631', 640, 600, pop(t, ph(L, 'two thousand dollars.')) * (1 - fade), BT), T('EVERY DOLLAR, EXPLAINED', 640, 660, pop(t, ph(L, 'exactly where')) * (1 - fade), GT)] }; } },
];
