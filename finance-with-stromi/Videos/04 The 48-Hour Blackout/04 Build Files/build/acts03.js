/* Finance with Stromi 03: shot functions. Each f(t, d, L) returns {scene, cam, tags, vig}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z, moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C); return x; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0];
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' };
const cl = (s, k, a, b) => camLerp(s, E(k), a[0], b[0], a[1], b[1]);
const ACTS = {};

/* =============== ACT 0: COLD OPEN =============== */
ACTS[0] = [
  { id: 'S01', noBlurIn: true, f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jo']); const { tz, ty } = s; s.stmt.userData.draw({}); s.coin2.visible = false;
      // the $2 coin rolls in and spins on the statement; Jo appears on the cut (already there) and pockets it at the end
      const kr = k01(t, 0.3, 2.2), x = lerp(0.9, 0.12, E(kr)); s.coin.position.set(x, ty + 0.04 - 0.03 * kr, tz + 0.25); s.coin.rotation.set(kr < 1 ? Math.PI / 2 : lerp(Math.PI / 2, 0, E(k01(t, 2.2, 3.4))), t * (kr < 1 ? 9 : 2), 0);
      const grab = k01(t, d - 2.2, d - 1.2); if (grab > 0) s.coin.position.y = ty + 0.01 + grab * 0.6;
      s.coin.visible = grab < 0.95;
      cl(s, k01(t, 0, d), [[0.5, 1.15, tz + 0.75], [0.1, ty + 0.03, tz + 0.2]], [[-0.2, 1.5, tz + 1.6], [0, 0.95, tz - 0.2]]);
      sp(s, 'jo', 0.1, tz - 1.15, { view: 'front', expr: t > d - 2.4 ? 'happy' : 'neutral', look: [0.1, -0.6], arms: [null, grab > 0 ? { h: [0.5, 0.2 + grab * 0.4], hand: 'grab' } : null] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T('+$2.00', 980, 130, pop(t, 1.0), GT), T('INTEREST: $0', 300, 620, pop(t, ph(L, 'no interest')), YT), T('...AGAIN?', 980, 620, pop(t, ph(L, 'again')), RT)] }; } },
  { id: 'S02', f(t, d, L) { const s = getSet('vault3'); const z = s.z0 + 3.2; s.piles.forEach(p => p.visible = false); s.labs.forEach(p => p.visible = false); s.big.visible = true;
      const k = E(k01(t, 0.5, 6)); s.counter.userData.draw({ t: '$' + (47.5 * k).toFixed(1) + ' BILLION' });
      cl(s, k01(t, 0, d), [[0, 0.6, z + 3.4], [0, 0.9, z]], [[1.4, 3.2, z + 5.8], [0, 1.6, z - 1]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('REWARDS · 2024', 640, 100, pop(t, 0.6), YT), T('THE STORE FEE?', 1000, 600, pop(t, ph(L, 'fees stores pay')), RT)] }; } },
  { id: 'S03', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); const b = lineAt(L, 'BANKER'); const bt = b ? b.t0 : d;
      s.ledger.userData.draw({ title: 'CARD PROFITS', rows: [['Paying side', t > ph(L, 'slightly unprofitable') ? '-' : '?', REDC], ['Lending side', '???']] }); s.mail.visible = false; s.ccard.visible = false;
      if (t < bt - 0.2) cl(s, k01(t, 0, bt), [[0.6, 1.25, s.dz + 0.9], [0.15, 0.8, s.dz + 0.1]], [[0.2, 1.05, s.dz + 0.55], [0.15, 0.8, s.dz + 0.1]]);
      else cl(s, k01(t, bt - 0.2, d), [[0.2, 1.55, s.dz + 2.0], [0, 1.4, s.dz - 0.6]], [[0.1, 1.5, s.dz + 1.6], [0, 1.45, s.dz - 0.6]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: t > bt ? 'sly' : 'neutral', look: [0, -0.3], arms: [{ h: [0.4, 0.55], hand: 'point' }, null] }, t, L, 'BANKER', 1.9);
      return { scene: s.S, cam: s.C, tags: [T('FEDERAL RESERVE STUDY', 640, 96, pop(t, 0.8), YT), T('SLIGHTLY UNPROFITABLE', 640, 620, t < bt ? pop(t, ph(L, 'slightly unprofitable')) : 0, RT)] }; } },
  { id: 'S04', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); s.ccard.visible = true; s.ledger.userData.draw({ title: 'CUSTOMER #4,118,207', rows: [['Pays in full', 'YES', GRNC], ['Interest paid', '$0']] });
      s.mag.position.set(0.55 - 0.1 * Math.sin(t), 0.95, s.dz + 0.32); s.mag.rotation.set(-0.9, 0, 0);
      cl(s, k01(t, 0, d), [[0.3, 1.6, s.dz + 2.6], [0, 1.3, s.dz - 0.3]], [[0.5, 1.15, s.dz + 0.9], [0.45, 0.95, s.dz]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'q', dir: 1, expr: 'sly', look: [0.6, -0.6], arms: [{ h: [0.75, 0.35], hand: 'grab' }, null] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, tags: [T('HOW YOUR BANK SEES YOU', 640, 620, pop(t, ph(L, 'the way your bank')), YT)] }; } },
  { id: 'S05', card: 'Two Dollars Back', sub: 'How the bank sees your card' },
];

/* =============== ACT 1: THE TOLL AT THE REGISTER =============== */
const STORE = (s, o) => { s.ptag.visible = !!o.tag; s.arm.visible = !!o.arm; s.scr.userData.draw({ total: o.total || '$100.00' }); s.tscr.userData.draw({ ok: !!o.ok }); };
ACTS[1] = [
  { id: 'S06', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo', 'cashier']); const c = lineAt(L, 'CASHIER'), tap = ph(L, 'You tap'); const cz = s.cz;
      STORE(s, { total: t > 3.5 ? '$100.00' : '$' + (100 * E(k01(t, 0.8, 3.5))).toFixed(2), ok: t > tap + 0.6 }); s.cart.position.set(-2.4 + 0.0, 0, cz + 1.1);
      if (t < tap) cl(s, k01(t, 0, tap), [[-2, 1.8, cz + 6], [0, 1.0, cz]], [[0.4, 1.6, cz + 4.2], [0.6, 1.0, cz]]); else cl(s, k01(t, tap, d), [[1.9, 1.4, cz + 1.2], [1.45, 1.06, cz + 0.32]], [[1.75, 1.3, cz + 0.85], [1.45, 1.06, cz + 0.32]]);
      const jx = walkTo(s, 'jo', -1.4, 1.15, cz + 0.85, t, 0.2, 3.0, { view: 'q', dir: 1, expr: 'happy', look: [0.5, 0], arms: [null, t > tap ? { h: [0.75, 0.55], hand: 'grab' } : null] }, L, 'JO', 1.62);
      sp(s, 'cashier', 0.2, cz - 0.75, { view: 'front', expr: 'happy', look: [0, 0.2] }, t, L, 'CASHIER', 1.6);
      return { scene: s.S, cam: s.C, tags: [T('SATURDAY · $100', 640, 96, pop(t, 0.6), YT), T('2% BACK = $2', 640, 620, pop(t, ph(L, 'two percent back')), GT)] }; } },
  { id: 'S07', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jo']); const ring = k01(t, ph(L, 'Interest charged'), ph(L, 'Interest charged') + 1.2); s.coin.visible = false;
      s.stmt.userData.draw({ ring: t > ph(L, 'Keep an eye') ? 1 : ring }); const drop = k01(t, 0.2, 0.9); s.env.position.y = s.ty + 0.003 + (1 - E(drop)) * 0.8;
      if (t < 4) cl(s, k01(t, 0, 4), [[0.2, 1.9, s.tz + 1.4], [0, 0.8, s.tz]], [[0.1, 1.25, s.tz + 0.6], [0.05, 0.8, s.tz + 0.1]]);
      else cl(s, k01(t, 4, d), [[0.1, 1.25, s.tz + 0.6], [0.05, 0.8, s.tz + 0.1]], [[0.12, 1.06, s.tz + 0.35], [0.08, 0.8, s.tz + 0.1]]);
      return { scene: s.S, cam: s.C, vig: 0.75, tags: [T('A FEW WEEKS LATER', 640, 96, pop(t, 0.4), YT), T('THE LINE NOBODY READS', 640, 625, pop(t, ph(L, 'most people never read')), RT), T('WATCH THIS LINE', 1010, 360, pop(t, ph(L, 'Keep an eye')), RT)] }; } },
  { id: 'S08', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo', 'cashier']); const cz = s.cz; STORE(s, { ok: true, arm: true });
      const up = 0.5 + 0.5 * Math.sin(Math.min(t, 6) * 1.2); s.arm.rotation.z = E(k01(t, 1, 2.2)) * 1.2;
      if (t < d * 0.5) cl(s, k01(t, 0, d * 0.5), [[1.85, 1.3, cz + 0.95], [1.5, 1.08, cz + 0.36]], [[1.95, 1.45, cz + 1.4], [1.4, 1.05, cz + 0.2]]); else cl(s, k01(t, d * 0.5, d), [[2.6, 1.7, cz + 2.8], [0.9, 1.1, cz]], [[0.8, 1.8, cz + 3.6], [0.9, 1.1, cz]]);
      sp(s, 'jo', 1.15, cz + 0.85, { view: 'q', dir: 1, expr: 'neutral', look: [0.6, -0.3] }, t, null, null, 1.62); sp(s, 'cashier', 0.2, cz - 0.75, { view: 'front', expr: 'neutral' }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('THE STORE PAYS A FEE', 330, 96, pop(t, ph(L, 'the store pays')), YT), T('~2.25% · ≈ $2.25', 960, 620, pop(t, ph(L, 'two and a quarter')), RT)] }; } },
  { id: 'S09', f(t, d, L) { const s = getSet('store'); hideCards(s, ['gus']); const g = lineAt(L, 'GUS'); const gt = g ? g.t0 : d; const cz = s.cz; STORE(s, {});
      if (t < gt - 0.3) cl(s, k01(t, 0, gt), [[4.5, 2.4, s.z0 + 4.5], [4.5, 2.6, s.z0]], [[2.5, 2.2, s.z0 + 5], [3.5, 2.4, s.z0]]); else cl(s, k01(t, gt - 0.3, d), [[-2.6, 1.5, cz + 3.6], [-2.6, 1.1, cz + 1.2]], [[-2.4, 1.4, cz + 3.0], [-2.6, 1.1, cz + 1.2]]);
      if (t >= gt - 0.3) sp(s, 'gus', -2.6, cz + 1.0, { view: 'front', expr: 'sad', look: [0, 0.3], arms: [{ h: [0.3, 0.8], hand: 'open' }, null] }, t, L, 'GUS', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('BIG CHAIN: LOWER FEE', 960, 110, t < gt ? pop(t, 0.5) : 0, GT), T('SMALL SHOP: HIGHER FEE', 330, 110, pop(t, ph(L, 'Small shops')), RT)] }; } },
  { id: 'S10', f(t, d, L) { const s = getSet('tollroad'); hideCards(s, []); s.grid.visible = false; s.truck.position.set(-12, 0, 0.6);
      const k = E(k01(t, 1.2, 3.5)); s.piles.forEach((p, i) => { p.visible = true; const dx = [1.6, 0, -1.6][i] * k, sc = [0.95, 0.08, 0.22][i]; p.position.set(dx, 0, 1.4); p.scale.set(1, lerp(1, sc * 3, k), 1); });
      cl(s, k01(t, 0, d), [[0, 2.2, 6], [0, 0.4, 1.2]], [[0, 3.6, 7.5], [0, 0.6, 0.6]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('YOUR BANK ~$1.90', 880, 430, pop(t, 3.4), GT), T('NETWORK', 640, 520, pop(t, 3.7), YT), T("STORE'S BANK", 400, 430, pop(t, 4.0), YT), T('JUST 3 PLAYERS', 640, 100, pop(t, ph(L, 'just three')), RT)] }; } },
  { id: 'S11', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); const b = lineAt(L, 'BANKER'); const bt = b ? b.t0 : d; s.ccard.visible = false;
      s.coinA.position.set(-0.25, s.ty + 0.05 + (t > 1.5 ? 0 : (1.5 - t) * 0.6), s.dz + 0.35); s.coinB.visible = false; s.ledger.userData.draw({ title: 'INCOME', rows: [['Interchange', t > ph(L, 'interchange') ? '+$1.90' : '', GRNC]] });
      cl(s, k01(t, 0, d), [[-0.6, 1.3, s.dz + 1.4], [-0.1, 0.9, s.dz]], [[0.4, 1.55, s.dz + 2.4], [0, 1.3, s.dz - 0.4]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: t > bt ? 'sly' : 'happy', look: [-0.3, -0.5], arms: [{ h: [0.55, 0.3], hand: 'grab' }, null] }, t, L, 'BANKER', 1.9);
      return { scene: s.S, cam: s.C, tags: [T('$1.90 → YOUR BANK', 640, 96, pop(t, 1.5), GT), T('"INTERCHANGE"', 640, 620, pop(t, ph(L, "It's called")), YT)] }; } },
  { id: 'S12', f(t, d, L) { const s = getSet('tollroad'); hideCards(s, ['dot']); s.piles.forEach(p => p.visible = false); s.grid.visible = false;
      const k = k01(t, 1.0, d - 1.0); const x = lerp(-7, 7, k); s.truck.position.set(x, 0, 0.6); s.truck.userData.roll(x); const near = Math.max(0, 1 - Math.abs(x) / 2.2); s.booth.userData.arm.rotation.z = near * 1.3;
      cl(s, k01(t, 0, d), [[-3, 3.2, 11], [-2, 1.2, -1]], [[3, 2.6, 9], [2, 1.2, -1]]);
      sp(s, 'dot', 1.3, -1.6, { view: 'front', expr: near > 0.3 ? 'happy' : 'neutral', look: [-Math.sign(x) * 0.5, 0], arms: [{ h: [0.9, 0.7], hand: near > 0.3 ? 'wave' : 'relax' }, null] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('THE CARD NETWORK', 640, 96, pop(t, ph(L, 'card network')), YT), T('~14¢ TOLL', 980, 600, pop(t, ph(L, 'fourteen cents')), RT)] }; } },
  { id: 'S13', f(t, d, L) { const s = getSet('marble'); hideCards(s, []); s.bars.visible = false; s.ropes.visible = false; s.signT.visible = s.signR.visible = false; s.stage.visible = false; s.easel.visible = false; s.peds.forEach(p => p.visible = false);
      const rep = ph(L, 'annual report'); const v = 40 * E(k01(t, ph(L, 'forty billion'), ph(L, 'forty billion') + 1.6));
      if (t < rep) s.bd.userData.draw({ lines: [['VISA · FY2025', 0.13, '#efe4cf'], ['$' + v.toFixed(0) + ' BILLION', 0.24], ['NET REVENUE', 0.12, '#efe4cf']] });
      else s.bd.userData.draw({ lines: [["DOESN'T ISSUE CARDS", 0.14, t > rep + 1.4 ? '#ffd36a' : '#555'], ["DOESN'T EXTEND CREDIT", 0.14, t > rep + 2.6 ? '#ffd36a' : '#555'], ["DOESN'T SET YOUR RATES", 0.14, t > rep + 3.8 ? '#ffd36a' : '#555']] });
      cl(s, k01(t, 0, d), [[0, 1.2, s.z0 + 9], [0, 2.4, s.z0]], [[0, 2.6, s.z0 + 5.5], [0, 3.2, s.z0]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('IS THE NETWORK PAYING?', 640, 640, pop(t, 0.5) * (t < rep ? 1 : 0), YT), T('ITS OWN ANNUAL REPORT', 640, 640, t > rep ? pop(t, rep) : 0, RT)] }; } },
  { id: 'S14', f(t, d, L) { const s = getSet('tollroad'); hideCards(s, ['dot', 'wendell']); s.piles.forEach(p => p.visible = false); s.grid.visible = false;
      const x = lerp(-3, 8, k01(t, 1.6, d)); s.truck.position.set(x, 0, 0.6); s.truck.userData.roll(x); s.booth.userData.arm.rotation.z = 1.3;
      cl(s, k01(t, 0, d), [[1.6, 1.4, 3.2], [1.3, 1.2, -1.6]], [[4, 6.5, 12], [3, 1, -2]]);
      sp(s, 'dot', 1.3, -1.6, { view: 'front', expr: 'happy', arms: [{ h: [0.9, 0.7], hand: 'wave' }, null] }, t, L, 'NETWORK', 1.6);
      sp(s, 'wendell', 6.2, -0.4, { view: 'q', dir: -1, expr: 'sly', arms: [{ h: [0.6, 0.6], hand: 'open' }, null] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('NETWORK = THE ROAD', 330, 96, pop(t, ph(L, 'runs the road')), YT), T('YOUR BANK = BIGGEST TOLL', 940, 96, pop(t, ph(L, 'biggest toll')), RT), T('PAYS YOUR $2', 940, 620, pop(t, ph(L, 'paying for your')), GT)] }; } },
  { id: 'S15', f(t, d, L) { const s = getSet('europe'); hideCards(s, []); s.cafeSign.userData.draw({ t: 'CAFÉ DU PORT' }); s.flag.userData.draw({}); s.cal.visible = false; s.arm.rotation.z = 0;
      s.boats.forEach((b, i) => { b.position.y = -0.25 + 0.05 * Math.sin(t * 1.3 + i); b.rotation.z = 0.04 * Math.sin(t + i); });
      cl(s, k01(t, 0, d), [[-6, 3.5, 12], [0, 1.2, 0]], [[-1.2, 1.3, 3.4], [-0.8, 0.85, 1.6]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('EUROPEAN UNION', 330, 96, pop(t, 0.8), YT), T('CAP: 0.3% BY LAW', 940, 96, pop(t, ph(L, 'capped by law')), RT), T('$100 → 30¢', 640, 620, pop(t, ph(L, 'thirty cents')), YT)] }; } },
  { id: 'S16', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, []); s.stmt.userData.draw({}); const { tz, ty } = s;
      s.coin.visible = s.coin2.visible = true; s.coin.position.set(-0.08, ty + 0.006, tz + 0.2); s.coin.rotation.set(0, t, 0); s.coin.scale.setScalar(1); s.coin2.scale.setScalar(0.55); s.coin2.position.set(0.12, ty + 0.006 + Math.max(0, 0.3 - t * 0.3), tz + 0.2); s.coin2.rotation.set(0, -t, 0);
      cl(s, k01(t, 0, d), [[0, 1.1, tz + 0.6], [0.02, ty, tz + 0.2]], [[0.05, 0.95, tz + 0.45], [0.02, ty, tz + 0.2]]);
      return { scene: s.S, cam: s.C, tags: [T('30¢ IN', 840, 300, pop(t, 0.6), RT), T('$2 BACK', 430, 300, pop(t, 1.2), GT), T('REMEMBER THIS', 640, 620, pop(t, ph(L, 'Keep that')), YT)] }; } },
  { id: 'S17', card: 'The Person Behind You' },
];

/* =============== ACT 2: THE PERSON BEHIND YOU =============== */
ACTS[2] = [
  { id: 'S18', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo', 'cashier']); const cz = s.cz; STORE(s, { tag: t > ph(L, 'price tag'), ok: true }); const pt = ph(L, 'price tag');
      s.ptag.scale.setScalar(Math.max(0.01, outBack(k01(t, pt, pt + 0.5))));
      if (t < pt) cl(s, k01(t, 0, pt), [[0.3, 1.8, cz + 4.4], [0.2, 1.1, cz]], [[0.3, 1.6, cz + 3.0], [0, 1.1, cz]]); else cl(s, k01(t, pt, d), [[-0.4, 1.45, cz + 1.3], [-0.6, 1.3, cz + 0.05]], [[-0.55, 1.42, cz + 0.85], [-0.6, 1.35, cz + 0.05]]);
      sp(s, 'jo', 0.2, cz + 0.85, { view: 'q', dir: -1, expr: 'neutral', look: [-0.6, 0.2], arms: [null, { h: [0.6, 0.5], hand: 'point' }] }, t, null, null, 1.62); sp(s, 'cashier', 0.2, cz - 0.75, { view: 'front' }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('WHO BORE THE COST?', 640, 96, pop(t, ph(L, 'who did bear')), RT), T('SET WEEKS AGO', 960, 620, pop(t, ph(L, 'weeks ago')), YT)] }; } },
  { id: 'S19', f(t, d, L) { const s = getSet('store'); hideCards(s, ['gus']); const cz = s.cz; STORE(s, { tag: true }); s.ptag.scale.setScalar(1);
      const up = k01(t, ph(L, 'show up in prices'), ph(L, 'show up in prices') + 2); s.ptag.userData.draw({ p: '$' + (4.99 + 0.1 * E(up)).toFixed(2) });
      if (t < d * 0.55) cl(s, k01(t, 0, d * 0.55), [[-3.6, 1.7, cz + 4.4], [-1.6, 1.3, cz + 0.5]], [[-2.0, 1.7, cz + 4.2], [-1.2, 1.3, cz + 0.5]]); else cl(s, k01(t, d * 0.55, d), [[-0.5, 1.5, cz + 1.0], [-0.6, 1.4, cz + 0.05]], [[-0.55, 1.45, cz + 0.8], [-0.6, 1.45, cz + 0.05]]);
      if (t < d * 0.55) sp(s, 'gus', -1.9, cz + 0.9, { view: 'q', dir: 1, expr: 'neutral', look: [0.5, 0], arms: [null, { h: [0.7, 0.8], hand: 'point' }] }, t, null, null, 1.55);
      return { scene: s.S, cam: s.C, tags: [T('RENT', 300, 120, pop(t, ph(L, 'like rent')), YT), T('ELECTRICITY', 520, 120, pop(t, ph(L, 'electricity')), YT), T('CARD FEES ~2%', 790, 120, pop(t, 0.6), RT), T('A LITTLE HIGHER FOR EVERYONE', 640, 620, pop(t, ph(L, 'a little higher')), RT)] }; } },
  { id: 'S20', f(t, d, L) { const s = getSet('diner'); hideCards(s, ['gus']); s.menu.userData.draw(t > 2.5 ? ['PAY BY CARD', '+3% SURCHARGE', 'CASH: -3%'] : ['MENU', 'COFFEE $3', 'PIE $5'], t > 2.5 ? 1 : 2);
      CAM(s, [lerp(0.8, 0.2, k01(t, 0, d)), 1.5, s.z0 + lerp(4.8, 3.6, E(k01(t, 0, d)))], [0.35, 1.5, s.z0 + 1.0]);
      sp(s, 'gus', 1.5, s.z0 + 0.85, { view: 'q', dir: -1, expr: t > 2.5 ? 'happy' : 'neutral', look: [-0.7, 0.6], arms: [{ h: [0.4, 0.9], hand: 'point' }, null] }, t, null, null, 1.55);
      return { scene: s.S, cam: s.C, tags: [T('SURCHARGE', 330, 110, pop(t, ph(L, 'surcharge')), RT), T('CASH DISCOUNT', 960, 110, pop(t, ph(L, 'discount for cash')), GT), T('STATE LAW + NETWORK RULES', 640, 625, pop(t, ph(L, 'state laws')), YT)] }; } },
  { id: 'S21', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo', 'cashier', 'ray', 'student']); const cz = s.cz; STORE(s, { tag: true, ok: true }); s.ptag.userData.draw({ p: '$5.09' }); s.ptag.scale.setScalar(1); const r = lineAt(L, 'RAY'); const rt = r ? r.t0 : d;
      const behind = ph(L, 'behind you');
      if (t < behind) cl(s, k01(t, 0, behind), [[0.4, 1.5, cz + 2.6], [0.6, 1.2, cz + 0.6]], [[0.0, 1.5, cz + 3.4], [0.3, 1.2, cz + 0.8]]); else if (t < rt - 0.3) cl(s, k01(t, behind, rt), [[-3.5, 1.6, cz + 4.5], [-0.8, 1.1, cz + 1.2]], [[1.6, 1.6, cz + 5.5], [-0.6, 1.1, cz + 1.2]]); else cl(s, k01(t, rt - 0.3, d), [[-0.4, 1.4, cz + 3.2], [-0.4, 1.2, cz + 1.3]], [[-0.4, 1.35, cz + 2.8], [-0.4, 1.25, cz + 1.3]]);
      sp(s, 'jo', 1.15, cz + 0.85, { view: 'q', dir: 1, expr: 'happy' }, t, null, null, 1.62); sp(s, 'cashier', 0.2, cz - 0.75, { view: 'front' }, t, null, null, 1.6);
      sp(s, 'ray', -0.4, cz + 1.35, { view: 'front', expr: t > rt ? 'angry' : 'neutral', look: [0.5, 0], arms: [{ h: [0.55, 0.5], hand: 'grab' }, null] }, t, L, 'RAY', 1.55); sp(s, 'student', -1.5, cz + 1.6, { view: 'q', dir: 1, expr: t > rt ? 'surprised' : 'neutral', arms: [null, { h: [0.6, 0.5], hand: 'grab' }] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('CASH', 470, 300, t > behind ? pop(t, ph(L, 'Someone paying cash')) : 0, GT), T('DEBIT', 300, 280, t > behind ? pop(t, ph(L, 'debit card')) : 0, { bg: '#5fa3a6', col: '#fff' }), T('SAME PRICE · NO $2', 640, 620, pop(t, ph(L, 'same price')), RT)] }; } },
  { id: 'S22', f(t, d, L) { const s = getSet('desk3'); s.jars.visible = s.chute.visible = true; s.pie.visible = false; s.doc.userData.draw({ org: 'NBER WORKING PAPER', band: '#6b3f5e', title: 'Who Pays for Card Rewards?', date: 'APRIL 2026', rows: [['Cash + debit → credit', REDC], ['~$30 billion a year', REDC]], hi: t > ph(L, 'thirty billion') ? 2 : 0 });
      s.fly.forEach((c, i) => { const u = ((t * 0.6 + i / 8) % 1); c.visible = t > 2; c.position.set(lerp(-0.45, 0.45, u), s.ty + 0.5 + Math.sin(u * Math.PI) * 0.08, s.dz - 0.13); c.rotation.set(Math.PI / 2, 0, t * 4 + i); });
      cl(s, k01(t, 0, d), [[0.05, 1.75, s.dz + 1.3], [0.05, 0.85, s.dz]], [[0.0, 1.6, s.dz + 1.7], [0, 1.0, s.dz - 0.15]]);
      return { scene: s.S, cam: s.C, tags: [T('CASH & DEBIT → CREDIT', 640, 96, pop(t, ph(L, 'move about')), YT)] }; } },
  { id: 'S23', f(t, d, L) { const s = getSet('store'); hideCards(s, ['ray', 'student']); const cz = s.cz; STORE(s, {});
      cl(s, k01(t, 0, d), [[-1.0, 1.6, cz + 5.2], [-0.9, 1.1, cz + 1.4]], [[-0.8, 1.5, cz + 4.4], [-1.0, 1.1, cz + 1.4]]);
      sp(s, 'ray', -0.4, cz + 1.35, { view: 'q', dir: -1, expr: 'sad', look: [-0.6, 0] }, t, null, null, 1.55); sp(s, 'student', -1.5, cz + 1.6, { view: 'q', dir: 1, expr: t > ph(L, 'debit card users') ? 'surprised' : 'neutral', look: [0.6, 0], arms: [null, { h: [0.6, 0.7], hand: 'grab' }] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('THE USUAL STORY', 640, 96, pop(t, 0.5), YT), T('DEBIT PAYS A SHARE TOO', 640, 620, pop(t, ph(L, 'debit card users')), RT)] }; } },
  { id: 'S24', f(t, d, L) { const s = getSet('town3'); s.stack.visible = false; s.fly.forEach(c => c.visible = false); const t1 = ph(L, 'Travel'), t2 = ph(L, 'Grocery stores'), t3 = ph(L, 'big grocery chains');
      s.glows.airport.material.opacity = s.glows.mall.material.opacity = 0.35 * k01(t, t1, t1 + 1); s.glows.grocery.material.opacity = s.glows.gas.material.opacity = 0.35 * k01(t, t2, t2 + 1);
      if (t < t3) cl(s, k01(t, 0, t3), [[0, 3.4, 3.4], [0, 0, 0]], [[-0.6, 2.2, 2.4], [-0.2, 0, -0.2]]); else cl(s, k01(t, t3, d), [[1.6, 1.4, 2.0], [1.3, 0.1, 0.6]], [[1.4, 1.0, 1.5], [1.3, 0.1, 0.6]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('TRAVEL + RETAIL: CREDIT', 330, 96, pop(t, t1), YT), T('GROCERY + GAS: CASH & DEBIT', 930, 96, pop(t, t2), GT), T('BIG GROCER: LOWER FEES', 640, 620, pop(t, t3), YT)] }; } },
  { id: 'S25', f(t, d, L) { const s = getSet('town3'); Object.values(s.glows).forEach(g => g.material.opacity = 0); s.stack.visible = true; const sh = ph(L, 'a quarter smaller'); s.stack.scale.set(1, lerp(1, 0.75, E(k01(t, sh, sh + 1.5))), 1);
      const fl = ph(L, 'higher-income households'); s.fly.forEach((c, i) => { const u = (t * 0.35 + i / 24) % 1; c.visible = t > fl; const a = V3(1.3, 0.1, 0.1), b = V3(-1.4, 0.1, 0.6); c.position.set(lerp(a.x, b.x, u), 0.12 + Math.sin(u * Math.PI) * 0.5, lerp(a.z, b.z, u)); c.rotation.set(t * 3 + i, 0, 0); });
      if (t < fl) cl(s, k01(t, 0, fl), [[0.4, 0.9, 2.6], [0, 0.3, 1.15]], [[0.2, 0.7, 2.1], [0, 0.25, 1.15]]); else cl(s, k01(t, fl, d), [[0, 3.0, 3.2], [0, 0, 0.2]], [[0.4, 2.6, 2.6], [-0.2, 0, 0.2]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('~1/4 SMALLER', 640, 96, pop(t, sh), YT), T('STILL LARGE', 960, 620, pop(t, ph(L, 'still large')), RT), T('LOWER → HIGHER INCOME', 640, 96, t > fl ? pop(t, fl) : 0, RT)] }; } },
  { id: 'S26', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); s.ccard.visible = false; s.coinB.visible = true; const ss = ph(L, 'suspiciously');
      s.coinA.position.set(-0.25, s.ty + 0.05, s.dz + 0.35); s.coinB.position.set(0.05, s.ty + 0.05, s.dz + 0.35); s.coinA.rotation.set(Math.PI / 2, 0, t * 0.5); s.coinB.rotation.set(Math.PI / 2, 0, -t * 0.5); s.ledger.userData.draw({ title: 'PER $100', rows: [['Bank slice', '$1.90', GRNC], ['Your reward', '$2.00', REDC]] });
      if (t < ph(L, 'something odd')) cl(s, k01(t, 0, ph(L, 'something odd')), [[0.3, 1.6, s.dz + 2.6], [0, 1.3, s.dz - 0.3]], [[0.2, 1.5, s.dz + 2.0], [0, 1.2, s.dz - 0.2]]); else cl(s, k01(t, ph(L, 'something odd'), d), [[-0.1, 1.15, s.dz + 0.9], [-0.1, 0.86, s.dz + 0.3]], [[-0.1, 1.0, s.dz + 0.7], [-0.1, 0.86, s.dz + 0.3]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: t > ss ? 'surprised' : 'neutral', look: [0, -0.6] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, tags: [T('$1.90 IN', 400, 120, pop(t, ph(L, 'about a dollar ninety')), GT), T('$2.00 OUT', 880, 120, pop(t, ph(L, 'reward was two')), RT), T('SUSPICIOUSLY CLOSE', 640, 620, pop(t, ss), YT)] }; } },
  { id: 'S27', f(t, d, L) { const s = getSet('desk3'); s.jars.visible = s.chute.visible = s.pie.visible = false; s.fly.forEach(c => c.visible = false); s.doc.userData.draw({ org: 'BANK LEDGER', band: '#24303a', title: 'Purchase side only', date: '', rows: [['Interchange ... ?'], ['Rewards ... ?'], ['Profit ... ?']], hi: Math.floor(t / 2.5) % 3 + 1 });
      s.mag.position.set(lerp(-0.1, 0.25, 0.5 + 0.5 * Math.sin(t * 0.8)), s.ty + 0.06, s.dz + lerp(0.05, 0.2, 0.5 + 0.5 * Math.sin(t * 0.5)));
      cl(s, k01(t, 0, d), [[0.05, 1.5, s.dz + 0.8], [0.05, 0.8, s.dz + 0.1]], [[0.1, 1.15, s.dz + 0.45], [0.05, 0.8, s.dz + 0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('DOES THE BANK PROFIT?', 640, 96, pop(t, ph(L, 'whether the bank')), RT)] }; } },
  { id: 'S28', card: 'Two Businesses, One Card' },
];

/* =============== ACT 3: TWO BUSINESSES =============== */
ACTS[3] = [
  { id: 'S29', f(t, d, L) { const s = getSet('archive'); hideCards(s, ['mabel', 'econ2', 'econ3']); const m = lineAt(L, 'MABEL'); const mt = m ? m.t0 : d; s.cork.userData.draw({});
      const tx = lerp(-4.5, 2.4, E(k01(t, 0.5, 4.5))); s.trolley.position.set(tx, 0, s.tz + 1.0);
      if (t < mt - 0.3) cl(s, k01(t, 0, mt), [[-3, 1.7, s.tz + 4.5], [0, 1.2, s.tz]], [[2.4, 1.9, s.tz + 4.2], [0.5, 1.2, s.tz - 0.4]]); else cl(s, k01(t, mt - 0.3, d), [[-0.8, 1.5, s.tz + 2.2], [-0.8, 1.35, s.tz - 0.8]], [[-0.8, 1.45, s.tz + 1.8], [-0.8, 1.4, s.tz - 0.8]]);
      walkTo(s, 'econ2', -5, 1.6, s.tz + 1.0, t, 0.5, 4.5, { view: 'q', dir: -1, expr: 'happy' }, null, null, 1.65);
      sp(s, 'mabel', -0.8, s.tz - 0.85, { view: 'front', expr: t > mt ? 'happy' : 'neutral', arms: [null, t > mt ? { h: [0.7, 0.8], hand: 'point' } : null] }, t, L, 'MABEL', 1.6); sp(s, 'econ3', 0.4, s.tz - 0.9, { view: 'q', dir: -1, expr: 'neutral', look: [-0.5, 0] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('FEDERAL RESERVE · 2022', 640, 96, pop(t, 0.7), YT), T('13 BANKS · 2014-2021', 960, 620, pop(t, ph(L, 'thirteen')), YT), T("THE BANKS' OWN NUMBERS", 330, 620, pop(t, ph(L, "banks' own")), GT)] }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['cardL', 'cardR', 'labL', 'labR', 'saw']); const cut = k01(t, 1.0, 3.6), sep = E(k01(t, 3.6, 5));
      P.cardL.position.set(-0.225 - 0.25 * sep, 0, 0); P.cardR.position.set(0.225 + 0.25 * sep, 0, 0); P.cardL.rotation.y = 0.08 * sep; P.cardR.rotation.y = -0.08 * sep;
      P.saw.position.set(0, 0.07, lerp(-0.45, 0.45, cut) + 0.02 * Math.sin(t * 30) * (cut > 0 && cut < 1 ? 1 : 0)); P.saw.rotation.y = Math.PI / 2; P.saw.visible = cut < 1;
      P.labL.position.set(-0.5, 0.01, 0.42); flat(P.labL, 0.01); P.labR.position.set(0.5, 0.01, 0.42); flat(P.labR, 0.01); P.labL.visible = t > ph(L, 'One job is paying'); P.labR.visible = t > ph(L, 'other job is lending');
      cl(s, k01(t, 0, d), [[0, 1.3, 0.9], [0, 0, 0]], [[0.3, 0.9, 1.25], [0, 0, 0.05]]);
      return { scene: s.S, cam: s.C, tags: [T('2 BUSINESSES · 1 PIECE OF PLASTIC', 640, 96, pop(t, ph(L, 'two businesses')), YT)] }; } },
  { id: 'S31', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['jars', 'clock', 'cardL']); P.cardL.position.set(0, 0, 0.55); P.cardL.rotation.y = 0;
      P.jars.children.forEach((j, i) => { const on = t > ph(L, ['interchange', 'annual fees', 'rewards', 'fraud', 'covering your'][i]); j.scale.setScalar(on ? 1.25 * outBack(k01(t, ph(L, ['interchange', 'annual fees', 'rewards', 'fraud', 'covering your'][i]), ph(L, ['interchange', 'annual fees', 'rewards', 'fraud', 'covering your'][i]) + 0.4)) : 0.001); });
      P.clock.position.set(0.85, 0.5, -0.5); P.clock.userData.set(t * 2, (t * 40) % 60);
      if (t < ph(L, 'easy to miss')) cl(s, k01(t, 0, ph(L, 'easy to miss')), [[0, 1.2, 1.3], [0, 0.1, -0.1]], [[0.3, 1.0, 1.1], [0, 0.15, -0.1]]); else cl(s, k01(t, ph(L, 'easy to miss'), d), [[0.9, 0.7, 0.6], [0.85, 0.45, -0.5]], [[0.95, 0.6, 0.35], [0.85, 0.45, -0.5]]);
      return { scene: s.S, cam: s.C, tags: [T('IN', 380, 110, pop(t, ph(L, 'earns interchange')), GT), T('OUT', 860, 110, pop(t, ph(L, 'It pays for')), RT), T('A FREE LOAN UNTIL THE DUE DATE', 640, 620, pop(t, ph(L, 'lending you that')), YT)] }; } },
  { id: 'S32', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['scale', 'panL', 'panR', 'water']); const r = ph(L, 'Then came the rewards'); const tilt = t < r ? 0.12 * E(k01(t, 1, 3)) : lerp(0.12, -0.22, E(k01(t, r, r + 1.5)));
      P.scale.userData.tilt(tilt); P.panR.visible = t > r; P.water.position.set(0, lerp(-0.1, 0.32, E(k01(t, ph(L, 'underwater'), ph(L, 'underwater') + 2))), -0.1);
      cl(s, k01(t, 0, d), [[0, 1.3, 1.8], [0, 0.7, -0.1]], [[0.4, 0.95, 1.4], [0, 0.6, -0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('$1.30 IN', 330, 120, pop(t, ph(L, 'a dollar thirty')), GT), T('$1.50 OUT', 950, 120, pop(t, r + 0.5), RT), T('SLIGHTLY UNDERWATER', 640, 620, pop(t, ph(L, 'underwater')), RT)] }; } },
  { id: 'S33', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['track']); const hot = ph(L, 'heated up'); const sp0 = t < hot ? 0.25 : 0.25 + 0.8 * k01(t, hot, hot + 3);
      P.racers.forEach((c, i) => { const a = -(t * sp0 + i * 0.6 + (t > hot ? (t - hot) * 0.25 * i : 0)); c.position.set(Math.cos(a) * 0.85 * 1.5, 0.006, Math.sin(a) * 0.85); c.rotation.y = -a; c.children[1].scale.setScalar(1 + (t > hot ? 0.8 * k01(t, hot, hot + 6) : 0)); c.children[1].rotation.y = t * 3; });
      const m = ph(L, 'minus four');
      if (t < d * 0.5) cl(s, k01(t, 0, d * 0.5), [[0, 2.6, 2.2], [0, 0, 0]], [[1.8, 1.0, 1.6], [0.5, 0, 0]]); else cl(s, k01(t, d * 0.5, d), [[-1.8, 0.8, 1.4], [0, 0.05, 0]], [[0, 2.8, 2.6], [0, 0, 0]]);
      return { scene: s.S, cam: s.C, vig: 0.75, tags: [T('THE REWARD RACE', 640, 96, pop(t, hot), RT), T('REWARDS +25% (2015-2020)', 330, 620, pop(t, ph(L, 'a quarter more')), YT), T('PAYING SIDE: ≈ -4% OF PROFITS', 900, 620, pop(t, m), RT)] }; } },
  { id: 'S34', f(t, d, L) { const s = getSet('marble'); hideCards(s, []); s.bars.visible = t > ph(L, 'fifteen percent') - 1; s.bd.visible = !s.bars.visible; s.ropes.visible = false; s.signT.visible = s.signR.visible = false; s.stage.visible = false; s.easel.visible = false;
      s.bars.userData.draw({ k: k01(t, ph(L, 'fifteen percent'), ph(L, 'sixty percent') + 1.2) }); s.bd.userData.draw({ lines: [['HIGH-REWARD', 0.16, '#efe4cf'], ['PREMIUM CARDS', 0.2]] });
      s.peds.forEach((p, i) => { p.visible = true; p.userData.card.rotation.z = t * 0.6 + i; p.userData.card.position.y = 1.25 + 0.04 * Math.sin(t * 2 + i); });
      const cf = ph(L, 'CFPB'); if (t < cf) cl(s, k01(t, 0, cf), [[-3, 1.4, s.z0 + 7.5], [0, 1.5, s.z0 + 2]], [[0, 1.7, s.z0 + 8.5], [0, 2.0, s.z0]]); else cl(s, k01(t, cf, d), [[2.6, 1.5, s.z0 + 4.2], [1.6, 1.3, s.z0 + 2.4]], [[1.2, 1.5, s.z0 + 3.8], [0.4, 1.3, s.z0 + 2.4]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('CHARGE STORES MORE', 330, 96, pop(t, ph(L, 'charge stores more')), RT), T('REWARD RATE 1.4% → 1.6%', 900, 620, pop(t, cf), YT)] }; } },
  { id: 'S35', f(t, d, L) { const s = getSet('store'); hideCards(s, []); const cz = s.cz; STORE(s, { ok: true }); const sch = ph(L, 'fee schedule');
      if (t < ph(L, 'Compare Europe')) cl(s, k01(t, 0, ph(L, 'Compare Europe')), [[1.2, 1.6, cz + 2.6], [1.3, 1.1, cz]], [[1.7, 1.25, cz + 1.0], [1.45, 1.06, cz + 0.32]]); else cl(s, k01(t, ph(L, 'Compare Europe'), d), [[1.9, 1.35, cz + 1.0], [1.45, 1.06, cz + 0.32]], [[2.2, 1.8, cz + 2.2], [1.2, 1.1, cz]]);
      return { scene: s.S, cam: s.C, tags: [T('PREMIUM CARD AT BIG GROCER: $1.45', 640, 96, pop(t, sch), YT), T('REWARD: $2.00', 330, 620, pop(t, ph(L, 'reward was two')), GT), T('EUROPE: 30¢', 960, 620, pop(t, ph(L, 'Compare Europe')), RT)] }; } },
  { id: 'S36', f(t, d, L) { const s = getSet('desk3'); s.jars.visible = s.chute.visible = false; s.fly.forEach(c => c.visible = false); s.pie.visible = true; s.pie.rotation.y = t * 0.3;
      s.pie.children[0].position.set(0, 0.03, 0); const out = E(k01(t, ph(L, 'eighty-six'), ph(L, 'eighty-six') + 1.2)); s.pie.children[0].position.x = 0.08 * out;
      s.doc.userData.draw({ org: '2025 STUDY', band: '#3f6b4f', title: 'Where interchange goes', date: '', rows: [['~86% back as rewards', GRNC], ['Lending drives profit', REDC]], hi: t > ph(L, 'Lending is') ? 2 : t > ph(L, 'eighty-six') ? 1 : 0 });
      cl(s, k01(t, 0, d), [[0.5, 1.4, s.dz + 0.9], [0.3, 0.8, s.dz + 0.1]], [[0.2, 1.15, s.dz + 0.6], [0.3, 0.8, s.dz + 0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('~86% → REWARDS', 960, 110, pop(t, ph(L, 'eighty-six')), GT), T('LENDING DRIVES PROFIT', 640, 620, pop(t, ph(L, 'Lending is')), RT)] }; } },
  { id: 'S37', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); s.ccard.visible = false; s.coinB.visible = false; s.coinA.position.y = -1; const inn = ph(L, 'innocent'), str = ph(L, 'What the data');
      s.dials[0].rotation.y = t > inn ? Math.sin((t - inn) * 1.5) * 0.9 : 0; s.dials[1].rotation.y = t > ph(L, 'price of borrowing') ? -1.2 * E(k01(t, ph(L, 'price of borrowing'), ph(L, 'price of borrowing') + 1)) : 0;
      s.ledger.userData.draw({ title: 'PAYING SIDE', rows: [['Earn', '$1.30', GRNC], ['Pay out', '$1.50', REDC], ['Again', t > str ? 'AND AGAIN' : '', REDC]] });
      if (t < inn) cl(s, k01(t, 0, inn), [[-1.5, 1.7, s.dz + 2.8], [0, 1.2, s.dz - 0.4]], [[1.5, 1.7, s.dz + 2.8], [0, 1.2, s.dz - 0.4]]); else if (t < str) cl(s, k01(t, inn, str), [[0.9, 1.2, s.dz + 0.7], [0.68, 0.8, s.dz - 0.2]], [[0.75, 1.1, s.dz + 0.55], [0.68, 0.8, s.dz - 0.2]]); else cl(s, k01(t, str, d), [[0.2, 1.3, s.dz + 0.9], [0.15, 0.8, s.dz + 0.1]], [[0.2, 1.6, s.dz + 2.2], [0, 1.3, s.dz - 0.5]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: t > inn ? 'sly' : 'neutral', look: [0.4, -0.5], arms: [{ h: [0.65, 0.35], hand: 'grab' }, t > inn ? { h: [0.65, 0.35], hand: 'grab' } : null] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, tags: [T('AVERAGES', 260, 110, pop(t, ph(L, 'averages')), YT), T('MANY BANKS · MANY YEARS', 640, 110, pop(t, ph(L, 'many banks')), YT), T('DATA END 2021', 1010, 110, pop(t, ph(L, 'data end')), YT), T('ON PURPOSE', 640, 620, pop(t, ph(L, 'on purpose')), RT)] }; } },
  { id: 'S38', card: 'The Line Nobody Reads' },
];

/* =============== ACT 4: THE LENDING SIDE =============== */
ACTS[4] = [
  { id: 'S39', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jo']); Object.values(s.props).forEach(p => p.visible = false);
      s.mail.forEach((e, i) => { const t0 = 0.6 + i * 0.55; e.visible = t > t0; const k = E(k01(t, t0, t0 + 0.5)); e.position.set(2.6 - (i % 5) * 0.12, lerp(1.0, 0.004 + i * 0.005, k), s.z0 + 0.25 + k * (0.3 + (i % 4) * 0.12)); e.rotation.set(0, i * 0.7, 0); });
      s.phone.userData.screen.material.color.set(Math.sin(t * 8) > 0 && t > 2 ? 0x9fe0ff : 0x3a6a8a);
      cl(s, k01(t, 0, d), [[0.5, 1.6, s.z0 + 5.2], [0.8, 1.0, s.z0 + 0.8]], [[1.6, 1.4, s.z0 + 3.4], [2.2, 0.6, s.z0 + 0.6]]);
      sp(s, 'jo', 0.5, s.z0 + 1.7, { view: 'q', dir: 1, expr: t > 4 ? 'surprised' : 'neutral', look: [0.7, 0.4] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T("YOU'RE PRE-APPROVED!", 900, 110, pop(t, 1.2), RT), T('A LOAN, NO QUESTIONS ASKED', 640, 620, pop(t, ph(L, 'a loan you can')), YT)] }; } },
  { id: 'S40', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, []); s.coin.visible = s.coin2.visible = false; const gp = ph(L, 'grace period'), un = ph(L, 'Leave part');
      s.cal.userData.draw({ title: 'DECEMBER', grace: t > ph(L, 'by the due date') ? [1, 25] : null, late: t > un ? 25 : null, marks: { 1: 'statement', 25: 'DUE' } });
      if (t < un) cl(s, k01(t, 0, un), [[1.8, 1.5, s.z0 + 2.6], [2.6, 1.3, s.z0 + 0.76]], [[2.4, 1.4, s.z0 + 1.7], [2.6, 1.35, s.z0 + 0.76]]); else cl(s, k01(t, un, d), [[2.4, 1.4, s.z0 + 1.7], [2.6, 1.35, s.z0 + 0.76]], [[0.3, 1.3, s.tz + 0.7], [0.05, 0.8, s.tz + 0.1]]);
      s.stmt.userData.draw({ ring: t > ph(L, 'the line on your') ? 1 : 0 });
      return { scene: s.S, cam: s.C, tags: [T('GRACE PERIOD = NO INTEREST', 640, 96, pop(t, gp), GT), T('UNPAID? INTEREST RUNS', 640, 620, pop(t, un), RT)] }; } },
  { id: 'S41', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['pie', 'crumb']); P.pie.rotation.y = t * 0.25; P.pie.children.forEach((m, i) => m.position.set(0, 0.04, 0)); const l = ph(L, 'eighty percent'), f = ph(L, 'late fees'), n = ph(L, 'slightly negative');
      P.pie.children[0].scale.setScalar(t > l ? 1 : 0.001); P.pie.children[1].scale.setScalar(t > f ? 1 : 0.001); P.pie.children[2].visible = false; P.crumb.visible = t > n; P.crumb.position.set(0.85, 0.015 + 0.01 * Math.sin(t * 5), 0.3);
      cl(s, k01(t, 0, d), [[0, 1.6, 1.4], [0, 0, 0]], [[0.6, 1.0, 1.3], [0.2, 0, 0.1]]);
      return { scene: s.S, cam: s.C, tags: [T('LENDING ~80%', 330, 110, pop(t, l), { bg: '#2f4d6b', col: '#fff' }), T('FEES ~15%', 950, 110, pop(t, f), RT), T('PAYING: SLIGHTLY NEGATIVE', 900, 620, pop(t, n), GT)] }; } },
  { id: 'S42', f(t, d, L) { const s = getSet('marble'); hideCards(s, ['jo', 'ray', 'student', 'econ2', 'gus', 'mabel']); s.bars.visible = false; s.bd.visible = true; s.peds.forEach(p => p.visible = false); s.ropes.visible = true; s.signT.visible = s.signR.visible = true; s.stage.visible = false; s.easel.visible = false;
      const h = ph(L, 'about half'); s.bd.userData.draw({ lines: [['ACTIVE ACCOUNTS', 0.14, '#efe4cf'], [t > h ? '~HALF CARRY A BALANCE' : 'PAY IN FULL OR CARRY?', 0.15], ['CFPB · 2024', 0.12, '#efe4cf']] });
      const keys = ['jo', 'ray', 'student', 'econ2', 'gus', 'mabel']; keys.forEach((k, i) => { const toR = i % 2 === 1; const k2 = toR ? E(k01(t, h + i * 0.3, h + 1.5 + i * 0.3)) : 0; const x = lerp(-2.2 + (i % 3) * 0.5 - 0.6, 1.4 + (i % 3) * 0.55, k2); const moving = toR && t > h + i * 0.3 && t < h + 1.5 + i * 0.3;
        const c = card(s, k, [1.62, 1.55, 1.6, 1.65, 1.55, 1.6][i]); c.set(x, s.z0 + 5.0 + (i < 3 ? 0 : 0.3) + i * 0.02, moving ? slidePose(t, 1, 1.6, 1.6) : pose({ view: 'front', expr: 'neutral', seed: i }, t, null, null), s.C); });
      cl(s, k01(t, 0, d), [[0, 2.4, s.z0 + 11], [0, 1.5, s.z0 + 4]], [[0, 2.0, s.z0 + 9], [0, 1.6, s.z0 + 4]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('PAY IN FULL', 330, 620, pop(t, ph(L, 'transactors')), GT), T('CARRY A BALANCE', 950, 620, pop(t, ph(L, 'revolvers')), RT)] }; } },
  { id: 'S43', f(t, d, L) { const s = getSet('vault3'); s.big.visible = false; const z = s.z0 + 3.4; const a = ph(L, 'hundred and sixty'), b = ph(L, 'thirty-one'), c = ph(L, 'side by side');
      s.piles[0].visible = t > a - 0.5; s.piles[1].visible = t > b - 0.5; s.piles[2].visible = t > c; s.piles[0].scale.setScalar(Math.max(0.01, E(k01(t, a - 0.5, a + 1)))); s.piles[1].scale.setScalar(Math.max(0.01, E(k01(t, b - 0.5, b + 1)))); s.piles[2].scale.setScalar(Math.max(0.01, E(k01(t, c, c + 1.2))));
      s.labs[0].visible = t > a; s.labs[1].visible = t > b; s.labs[2].visible = t > c; s.labs[0].userData.draw({ t: '$160B INTEREST', bg: '#2f4d6b', col: '#fff' }); s.labs[1].userData.draw({ t: '$31.3B FEES', bg: REDC, col: '#fff' }); s.labs[2].userData.draw({ t: '$47.5B REWARDS', bg: '#3f9b5f', col: '#fff' });
      s.counter.userData.draw({ t: t < a ? '2024' : t < ph(L, 'Careful') ? 'INTEREST CHARGED' : t < c ? 'NOT PROFIT' : 'SAME YEAR' });
      const cf = ph(L, 'Careful'); if (t < cf) cl(s, k01(t, 0, cf), [[-3, 2.2, z + 6], [-1.5, 1.0, z]], [[1, 2.6, z + 6.5], [0, 1.0, z]]); else if (t < c) cl(s, k01(t, cf, c), [[-3.1, 1.2, z + 3.2], [-3.1, 1.2, z]], [[-2.4, 1.6, z + 4], [-2.4, 1.2, z]]); else cl(s, k01(t, c, d), [[0, 2.0, z + 7], [0, 1.2, z]], [[0, 2.6, z + 8], [0, 1.0, z]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('MOSTLY LATE FEES', 640, 620, t < cf && t > b + 1 ? pop(t, b + 1) : 0, RT), T('INTEREST CHARGED ≠ PROFIT', 640, 620, t > cf && t < c ? pop(t, cf) : 0, YT)] }; } },
  { id: 'S44', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); s.ccard.visible = true; s.coinA.position.y = -1; s.coinB.position.y = -1; const fl = ph(L, 'Two percent back'); const k = E(k01(t, fl, fl + 1.2));
      s.ccard.position.set(0.3, s.ty + 0.01 + Math.sin(k * Math.PI) * 0.25, s.dz + 0.3); s.ccard.rotation.set(0, 0, k * Math.PI);
      if (t < fl) cl(s, k01(t, 0, fl), [[0.3, 1.6, s.dz + 2.6], [0, 1.3, s.dz - 0.3]], [[0.4, 1.4, s.dz + 1.6], [0.2, 1.0, s.dz]]); else cl(s, k01(t, fl, d), [[0.35, 1.3, s.dz + 0.85], [0.3, 0.85, s.dz + 0.3]], [[0.35, 1.15, s.dz + 0.7], [0.3, 0.85, s.dz + 0.3]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: 'sly', arms: [{ h: [0.6, 0.35], hand: 'grab' }, null] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, tags: [T('~22% A YEAR · Q3 2026', 960, 96, pop(t, ph(L, 'twenty-two percent a year in')), RT), T('2% BACK', 330, 620, pop(t, fl), GT), T('22% OWED', 950, 620, pop(t, ph(L, 'on what you owe')), RT)] }; } },
  { id: 'S45', f(t, d, L) { const s = getSet('archive'); hideCards(s, ['mabel', 'econ3']); s.trolley.position.set(3.4, 0, s.tz + 1.4); const b0 = ph(L, "hadn't carried");
      s.cork.userData.draw({ title: 'WHO PAYS THE INTEREST', k: k01(t, b0, d - 3), bars: [{ v: 0.4 / 0.72, lab: 'NEVER REVOLVED: PURCHASES', txt: '40%', col: GRNC }, { v: 0.1 / 0.72, lab: 'ALWAYS REVOLVED: PURCHASES', txt: '<10%', col: '#5fa3a6' }, { v: 1, lab: 'ALWAYS REVOLVED: INTEREST', txt: '>70%', col: REDC }] });
      if (t < b0) cl(s, k01(t, 0, b0), [[1.8, 1.6, s.tz + 3], [0, 1.4, s.tz - 1]], [[-1.4, 1.7, s.tz + 3.2], [0, 1.5, s.tz - 1]]); else cl(s, k01(t, b0, d), [[0, 1.9, s.z0 + 3.6], [0, 1.85, s.z0]], [[0, 1.85, s.z0 + 2.9], [0, 1.85, s.z0]]);
      if (t < b0) { sp(s, 'mabel', -1.4, s.z0 + 0.9, { view: 'q', dir: 1, expr: 'neutral', arms: [null, { h: [0.8, 0.9], hand: 'point' }] }, t, null, null, 1.6); sp(s, 'econ3', 1.4, s.z0 + 0.9, { view: 'q', dir: -1, expr: 'surprised' }, t, null, null, 1.6); } else hideCards(s, []);
      return { scene: s.S, cam: s.C, tags: [T('BORROWERS PAY MOST OF THE REVENUE', 640, 96, t < b0 ? pop(t, ph(L, 'majority')) : 0, RT)] }; } },
  { id: 'S46', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['cardL', 'cardR', 'labL', 'labR', 'stack', 'icoins']); P.cardL.position.set(-0.5, 0, 0); P.cardR.position.set(0.5, 0, 0); P.cardL.rotation.y = P.cardR.rotation.y = 0; flat(P.labL, 0.01); flat(P.labR, 0.01); P.labL.position.set(-0.5, 0.01, 0.42); P.labR.position.set(0.5, 0.01, 0.42);
      const k = E(k01(t, 0.5, 2.5)); P.stack.position.set(-0.5, 0.02 + (1 - k) * 0.6, 0); P.cardL.position.y = -0.01 * k;
      const ic = ph(L, 'most of the interest'); P.icoins.forEach((c, i) => { const u = k01(t, ic + i * 0.12, ic + i * 0.12 + 0.6); c.visible = u > 0; c.position.set(0.5 + ((i * 37) % 7 - 3) * 0.03, 0.02 + i * 0.006 + (1 - E(u)) * 0.6, ((i * 53) % 5 - 2) * 0.04); });
      cl(s, k01(t, 0, d), [[0, 1.2, 1.1], [0, 0.05, 0]], [[0, 0.9, 1.0], [0, 0.05, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('MOST SPENDING', 330, 110, pop(t, 1), YT), T('MOST INTEREST', 950, 110, pop(t, ic), RT)] }; } },
  { id: 'S47', f(t, d, L) { const s = getSet('town3'); s.stack.visible = false; Object.values(s.glows).forEach(g => g.material.opacity = 0); const fb = ph(L, 'fifteen billion');
      s.fly.forEach((c, i) => { const u = (t * 0.3 + i / 24) % 1; c.visible = t > fb - 2; c.position.set(lerp(1.3, -1.4, u), 0.12 + Math.sin(u * Math.PI) * 0.6, lerp(0.4, 0.6, u)); c.rotation.set(t * 3 + i, 0, 0); });
      s.houses.forEach((h, i) => h.position.y = 0.06 + (i < 11 && t > fb ? 0.01 * Math.sin(t * 3 + i) : 0));
      if (t < fb) cl(s, k01(t, 0, fb), [[0, 3.6, 3.4], [0, 0, 0]], [[0, 2.4, 2.6], [0, 0, 0.2]]); else cl(s, k01(t, fb, d), [[1.8, 1.2, 2.2], [0, 0.1, 0.4]], [[-1.8, 1.4, 2.4], [-0.5, 0.1, 0.4]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('FED + IMF', 640, 96, pop(t, ph(L, 'International Monetary')), YT), T('~$15B/YR: POORER → RICHER AREAS', 640, 620, pop(t, fb), RT), T("DIFFERENT METHOD · DON'T ADD", 640, 96, t > ph(L, 'Different method') ? pop(t, ph(L, 'Different method')) : 0, YT)] }; } },
  { id: 'S48', f(t, d, L) { const s = getSet('office3'); hideCards(s, ['wendell']); s.ccard.visible = false; s.coinA.position.y = -1; s.coinB.position.y = -1; const q = ph(L, 'quote');
      s.ledger.userData.draw({ title: 'CFPB REPORT', rows: [['Funds balances for all'], ['Earns interest from revolvers', REDC], ['"...operations as a whole"', t > q ? GRNC : '#bbb']] });
      if (t < q) cl(s, k01(t, 0, q), [[-1.2, 1.6, s.dz + 2.6], [0, 1.3, s.dz - 0.3]], [[0.2, 1.3, s.dz + 1.0], [0.15, 0.85, s.dz + 0.1]]); else cl(s, k01(t, q, d), [[0.2, 1.2, s.dz + 0.75], [0.15, 0.8, s.dz + 0.1]], [[0.6, 1.8, s.dz + 3.4], [0, 1.4, s.dz - 0.5]]);
      sp(s, 'wendell', 0, s.dz - 0.75, { view: 'front', expr: 'neutral', arms: [{ h: [0.5, 0.4], hand: 'point' }, null] }, t, null, null, 1.9);
      return { scene: s.S, cam: s.C, tags: [T('THE WHOLE CARD COVERS THE GAP', 640, 96, pop(t, ph(L, 'covered by the whole')), YT), T('"CREDIT CARD OPERATIONS AS A WHOLE"', 640, 620, pop(t, q + 0.5), GT)] }; } },
  { id: 'S49', f(t, d, L) { const s = getSet('tollroad'); hideCards(s, ['jo']); s.piles.forEach(p => p.visible = false); s.truck.position.set(-20, 0, 0); s.grid.visible = t > ph(L, 'millions') - 2; s.grid.material.opacity = 0.9 * k01(t, ph(L, 'millions') - 2, ph(L, 'millions'));
      const up = ph(L, 'The bank sees'); if (t < up) cl(s, k01(t, 0, up), [[0, 1.4, 4.5], [0, 1.2, 1]], [[0, 2.0, 6], [0, 1.2, 0]]); else cl(s, k01(t, up, d), [[0, 2.0, 6], [0, 1.2, 0]], [[0, 26, 18], [0, 0, -14]]);
      sp(s, 'jo', 0, 1.2, { view: 'front', expr: 'happy', look: [0, 0.3] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('YOU: ONE CARD', 330, 96, t < up ? pop(t, ph(L, 'You see')) : 0, GT), T('THE BANK: THE PORTFOLIO', 640, 96, t > up ? pop(t, up) : 0, YT), T("THEY'RE A MIX", 640, 620, pop(t, ph(L, 'a mix')), RT)] }; } },
  { id: 'S50', card: 'The Line Moves' },
];

/* =============== ACT 5: THE MOVING LINE =============== */
ACTS[5] = [
  { id: 'S51', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, []); s.coin.visible = s.coin2.visible = false; const tp = ph(L, 'two fixed teams');
      s.stmt.userData.draw({ ring: t > ph(L, 'That blank line') ? 0.5 + 0.5 * Math.sin(t * 3) : 0 });
      if (t < tp) cl(s, k01(t, 0, tp), [[0.1, 1.4, s.tz + 0.8], [0.05, 0.8, s.tz + 0.1]], [[0.12, 1.08, s.tz + 0.38], [0.08, 0.8, s.tz + 0.1]]); else cl(s, k01(t, tp, d), [[0.12, 1.08, s.tz + 0.38], [0.08, 0.8, s.tz + 0.1]], [[-1.2, 2.2, s.tz + 3.2], [0, 0.6, s.tz]]);
      return { scene: s.S, cam: s.C, tags: [T('PAY IN FULL', 330, 110, pop(t, tp), GT), T('CARRY A BALANCE', 950, 110, pop(t, tp + 0.6), RT), T('THE LINE MOVES', 640, 620, pop(t, ph(L, 'line between them')), YT)] }; } },
  { id: 'S52', f(t, d, L) { const s = getSet('marble'); hideCards(s, ['jo', 'ray', 'student', 'econ2', 'gus']); s.bars.visible = false; s.bd.visible = true; s.peds.forEach(p => p.visible = false); s.ropes.visible = false; s.signT.visible = s.signR.visible = false; s.stage.visible = true; s.easel.visible = false;
      const q = ph(L, 'About a quarter'); s.bd.userData.draw({ lines: [['PAST 12 MONTHS', 0.14, '#efe4cf'], [t > q ? 'IN-BETWEENERS: >1/3 OF PURCHASES' : '1 IN 5 ALWAYS · 1 IN 5 NEVER', 0.12], ['FED STUDY', 0.11, '#efe4cf']] });
      const keys = ['jo', 'ray', 'student', 'econ2', 'gus']; keys.forEach((k, i) => { const c = card(s, k, [1.62, 1.55, 1.6, 1.65, 1.55][i]); c.set(-2.4 + i * 1.2, s.z0 + 2.3, pose({ view: 'front', expr: i === 0 ? 'happy' : i === 4 ? 'sad' : 'neutral', seed: i }, t, null, null), s.C, 0.4); });
      const tint = (k, col) => card(s, k).mesh.material.color.set(col); tint('jo', t > ph(L, 'never had') ? 0xcff2d6 : 0xf2ead8); tint('gus', t > ph(L, 'every single month') ? 0xffc8c0 : 0xf2ead8);
      ['ray', 'student', 'econ2'].forEach((k, i) => tint(k, t > q ? (Math.floor(t * 0.8 + i) % 2 ? 0xffc8c0 : 0xcff2d6) : 0xf2ead8));
      cl(s, k01(t, 0, d), [[0, 1.8, s.z0 + 8.5], [0, 1.4, s.z0 + 2]], [[0, 1.6, s.z0 + 7], [0, 1.4, s.z0 + 2]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('ALWAYS: 1 IN 5', 950, 620, pop(t, ph(L, 'every single month')), RT), T('NEVER: 1 IN 5', 330, 620, pop(t, ph(L, 'never had')), GT), T('SOMETIMES: ~1/4', 640, 620, t > q ? pop(t, q) : 0, YT)] }; } },
  { id: 'S53', f(t, d, L) { const s = getSet('archive'); hideCards(s, []); s.trolley.position.set(3.4, 0, s.tz + 1.4); const b4 = ph(L, 'By twenty twenty-four');
      s.cork.userData.draw({ title: 'ACCOUNTS CARRYING A BALANCE', k: t < b4 ? 0.5 * k01(t, ph(L, 'forty-five') - 0.5, ph(L, 'forty-five') + 1) : 0.5 + 0.5 * k01(t, b4, b4 + 1.2), bars: [{ v: 0.45 / 0.62, lab: 'END 2021', txt: '~45%', col: '#5fa3a6' }, { v: 0.5 / 0.62, lab: '2024', txt: '~50%', col: REDC }] });
      const ns = ph(L, 'not necessarily'); if (t < ns) cl(s, k01(t, 0, ns), [[-1.2, 1.9, s.z0 + 3.8], [0, 1.85, s.z0]], [[0.6, 1.9, s.z0 + 3.0], [0, 1.85, s.z0]]); else cl(s, k01(t, ns, d), [[0.6, 1.9, s.z0 + 3.0], [0, 1.85, s.z0]], [[0, 1.8, s.tz + 3.2], [0, 1.3, s.z0]]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('IT MOVES WITH THE ECONOMY', 640, 620, pop(t, ph(L, 'moves with')), YT), T('"NOT NECESSARILY STATIC"', 640, 620, t > ns ? pop(t, ns) : 0, GT)] }; } },
  { id: 'S54', f(t, d, L) { const s = getSet('garage3'); hideCards(s, ['jo', 'mech']); const g = lineAt(L, 'GUS'); const gt = g ? g.t0 : d; const stop = 2.6;
      const cx = lerp(-9, -1.2, E(k01(t, 0, stop))); s.car.position.set(cx, Math.max(0, 0.02 * Math.sin(t * 30) * (t > stop - 0.6 && t < stop ? 1 : 0)), -0.2);
      s.smoke.forEach((p, i) => { const u = ((t - stop) * 0.4 + i / 10) % 1; p.visible = t > stop - 0.4; p.position.set(cx + 2.0 + u * 0.4, 0.8 + u * 2.2, -0.2 + Math.sin(i) * 0.3); p.scale.setScalar(0.5 + u * 1.5); p.material.opacity = 0.35 * (1 - u); });
      if (t < gt - 0.3) cl(s, k01(t, 0, gt), [[2, 1.6, 7.5], [-2, 0.8, 0]], [[0.5, 1.5, 6], [-0.5, 1.0, 0]]); else cl(s, k01(t, gt - 0.3, d), [[0.2, 1.5, 4.2], [0.2, 1.2, 1.4]], [[0.2, 1.45, 3.7], [0.2, 1.2, 1.4]]);
      if (t > stop + 0.2) walkTo(s, 'jo', -2.2, -0.5, 1.4, t, stop + 0.2, stop + 2.4, { view: 'q', dir: 1, expr: t > gt ? 'sad' : 'surprised', look: [0.6, 0] }, L, 'JO', 1.62);
      walkTo(s, 'mech', 4.5, 1.0, 1.4, t, 2.6, 5.2, { view: 'q', dir: -1, expr: 'neutral', arms: [t > gt ? { h: [0.7, 0.6], hand: 'grab' } : null, null] }, L, 'GUS', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('REPAIR: $1,200', 640, 96, pop(t, ph(L, 'Twelve hundred')), RT), T('ON THE CARD', 950, 620, pop(t, lineAt(L, 'JO') ? lineAt(L, 'JO').t0 : d), YT)] }; } },
  { id: 'S55', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jo']); s.coin.visible = s.coin2.visible = false; const nx = ph(L, 'The next statement'), j = lineAt(L, 'JO'), jt = j ? j.t0 : d;
      s.stmt.userData.draw(t < nx ? { month: 'DECEMBER', rows: [['Car repair', '$1,200.00'], ['Payment', '-$200.00'], ['Carried', '$1,000.00']] } : { month: 'JANUARY', rows: [['Carried', '$1,000.00'], ['Groceries', '$100.00'], ['Cash back', '-$2.00']], interest: t > ph(L, 'about nineteen') ? '$19.00' : '', ring: t > ph(L, 'has a number') ? 1 : 0 });
      if (t < jt - 0.3) cl(s, k01(t, 0, jt), [[0.1, 1.35, s.tz + 0.7], [0.05, 0.8, s.tz + 0.1]], [[0.15, 1.05, s.tz + 0.35], [0.1, 0.8, s.tz + 0.12]]); else cl(s, k01(t, jt - 0.3, d), [[0.3, 1.5, s.tz + 1.4], [0, 1.2, s.tz - 1.1]], [[0.2, 1.45, s.tz + 1.0], [0, 1.25, s.tz - 1.1]]);
      sp(s, 'jo', 0.05, s.tz - 1.15, { view: 'front', expr: 'sad', look: [0, -0.6] }, t, L, 'JO', 1.62);
      return { scene: s.S, cam: s.C, tags: [T('PAID $200 · CARRIED $1,000', 640, 96, pop(t, ph(L, 'pay two hundred')), YT), T('~22%/YR → ~$19/MONTH', 950, 620, pop(t, ph(L, 'about nineteen')), RT)] }; } },
  { id: 'S56', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo', 'cashier']); const cz = s.cz; STORE(s, { ok: t > 2 }); const off = ph(L, 'pay it off');
      cl(s, k01(t, 0, d), [[2.6, 1.6, cz + 3.4], [0.9, 1.1, cz + 0.4]], [[0.2, 1.7, cz + 3.8], [0.9, 1.1, cz + 0.4]]);
      sp(s, 'jo', 1.15, cz + 0.85, { view: 'q', dir: 1, expr: t > off ? 'happy' : 'neutral', arms: [null, { h: [0.75, 0.55], hand: 'grab' }] }, t, null, null, 1.62); sp(s, 'cashier', 0.2, cz - 0.75, { view: 'front', expr: 'happy' }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('STILL 2% BACK', 330, 110, pop(t, ph(L, 'same two percent')), GT), T('+ A LOAN', 950, 110, pop(t, ph(L, 'now a loan')), RT), T('PAID OFF · LINE BLANK', 640, 620, pop(t, off), GT)] }; } },
  { id: 'S57', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jo']); s.mail.forEach(e => e.visible = false); const a = ph(L, 'A repair'), b = ph(L, 'A gap'), c = ph(L, 'A medical');
      s.props.bill.visible = t > a; s.props.cal.visible = t > b; s.props.bag.visible = t > c;
      if (t < a) cl(s, k01(t, 0, a), [[0.4, 1.6, s.z0 + 5.2], [0, 1.0, s.z0 + 1]], [[0.2, 1.5, s.z0 + 4.4], [0, 1.0, s.z0 + 1]]); else if (t < c + 2.5) cl(s, k01(t, a, c + 2.5), [[-0.2, 1.2, s.z0 + 2.4], [-0.2, 0.6, s.z0 + 1.3]], [[1.1, 1.4, s.z0 + 2.3], [0.9, 1.1, s.z0 + 0.6]]); else cl(s, k01(t, c + 2.5, d), [[0.6, 1.5, s.z0 + 4.2], [0.2, 1.1, s.z0 + 1]], [[0.4, 1.7, s.z0 + 5.0], [0.2, 1.1, s.z0 + 1]]);
      sp(s, 'jo', -2.0, s.z0 + 2.1, { view: 'q', dir: 1, expr: 'neutral', look: [0.3, 0.3] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T('AN ILLUSTRATION, NOT A PREDICTION', 640, 96, pop(t, 0.6), YT), T('NOT CARELESSNESS', 640, 620, pop(t, ph(L, 'careless')), GT)] }; } },
  { id: 'S58', f(t, d, L) { const s = getSet('store'); hideCards(s, ['jo']); const cz = s.cz; STORE(s, {}); s.ptag.visible = false; s.promo.visible = true;
      cl(s, k01(t, 0, d), [[-0.4, 1.7, s.z0 + 5.2], [-1.9, 1.9, s.z0]], [[-0.9, 1.6, s.z0 + 4.4], [-1.7, 1.7, s.z0 + 0.6]]);
      sp(s, 'jo', -1.4, s.z0 + 1.7, { view: 'q', dir: 1, expr: t > ph(L, 'thirty cents') ? 'surprised' : 'love', look: [0.6, 0.6] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T('TOP REASON TO PICK A CARD', 640, 620, pop(t, ph(L, 'top reasons')), YT), T('30¢?', 330, 110, pop(t, ph(L, 'thirty cents')), YT)] }; } },
  { id: 'S59', card: 'When the Toll Shrinks' },
];

/* =============== ACT 6: THE CAP + ENDING =============== */
ACTS[6] = [
  { id: 'S60', f(t, d, L) { const s = getSet('europe'); hideCards(s, []); s.flag.visible = true; const au = ph(L, 'Australia'); s.flag.userData.draw({ au: t > au }); s.cafeSign.userData.draw({ t: t > au ? 'HARBOUR CAFE · SYDNEY' : 'CAFÉ DU PORT' }); s.cal.visible = t > ph(L, 'October first'); s.cal.userData.draw({});
      s.sea.position.y = -0.3; s.boats.forEach((b, i) => { b.position.y = -0.25 + 0.05 * Math.sin(t * 1.3 + i); });
      const dr = ph(L, 'dropped'); s.arm.rotation.z = t > dr ? lerp(0.5, 0, E(k01(t, dr, dr + 1.5))) : 0.5;
      if (t < au) cl(s, k01(t, 0, au), [[-6, 3, 11], [0, 1.4, 0]], [[0, 2.4, 9], [0, 1.4, 0]]); else cl(s, k01(t, au, d), [[2, 2.0, 7], [1.5, 1.4, -1.5]], [[-0.8, 1.2, 2.7], [-0.8, 0.82, 1.6]]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('EU: 0.3% SINCE 2015', 330, 96, pop(t, ph(L, 'since twenty fifteen')), YT), T('AUSTRALIA: 0.8% → 0.3%', 950, 96, pop(t, dr), RT), T('$100 → 30¢', 640, 620, pop(t, ph(L, 'thirty cents for')), YT)] }; } },
  { id: 'S61', f(t, d, L) { const s = getSet('table3'); const P = s.P; s.show(['cups']); const k = E(k01(t, 1, 4)); P.fillA.scale.set(1, Math.max(0.01, k), 1); P.fillB.scale.set(1, Math.max(0.01, E(k01(t, ph(L, 'thirty-cent'), ph(L, 'thirty-cent') + 1))), 1);
      cl(s, k01(t, 0, d), [[-0.2, 1.0, 1.9], [0, 0.18, 0]], [[0.2, 0.8, 1.5], [0.05, 0.15, 0]]);
      return { scene: s.S, cam: s.C, tags: [T('US: ~1.9% FEE → ~1.5% REWARDS', 640, 96, pop(t, 0.8), GT), T('30¢ FEE → VERY LITTLE', 640, 620, pop(t, ph(L, 'thirty-cent')), RT)] }; } },
  { id: 'S62', f(t, d, L) { const s = getSet('marble'); hideCards(s, ['wendell', 'gus']); s.bars.visible = false; s.bd.visible = true; s.peds.forEach(p => p.visible = false); s.ropes.visible = false; s.signT.visible = s.signR.visible = false; s.stage.visible = false; s.easel.visible = true; const st = ph(L, 'still pending');
      s.bd.userData.draw({ lines: [['US LAW', 0.12, '#efe4cf'], ['DEBIT: CAPPED (BIG BANKS)', 0.12], [t > ph(L, 'but not credit') ? 'CREDIT: NOT CAPPED' : '', 0.12, '#ff8a7a']] });
      s.scroll.userData.draw({ rows: [t > ph(L, 'tenth') ? '-0.1 pt for 5 years' : '', t > ph(L, 'one point two five') ? 'Standard cards: 1.25% cap' : '', t > ph(L, 'one point two five') ? '   for 8 years' : '', t > ph(L, 'thirty-eight') ? 'Est. value ~$38 billion' : '', t > ph(L, 'Large retailers') ? 'Retailers object' : ''], stamp: t > st ? outBack(k01(t, st, st + 0.5)) : 0 });
      if (t < ph(L, 'A settlement')) cl(s, k01(t, 0, ph(L, 'A settlement')), [[0, 2.0, s.z0 + 8], [0, 2.8, s.z0]], [[0, 2.4, s.z0 + 6], [0, 3.2, s.z0]]); else cl(s, k01(t, ph(L, 'A settlement'), d), [[2.0, 1.9, s.z0 + 9.5], [1.4, 1.6, s.z0 + 3.2]], [[1.9, 1.8, s.z0 + 8.2], [1.5, 1.6, s.z0 + 3.2]]);
      sp(s, 'wendell', -0.6, s.z0 + 3.6, { view: 'q', dir: 1, expr: 'neutral', look: [0.6, 0] }, t, null, null, 1.9); sp(s, 'gus', 4.0, s.z0 + 3.6, { view: 'q', dir: -1, expr: t > ph(L, 'Large retailers') ? 'angry' : 'neutral', arms: [{ h: [0.6, 0.9], hand: 'point' }, null] }, t, null, null, 1.55);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('BIG FEE = BIG REWARD', 640, 620, pop(t, ph(L, 'The reward is big')), YT)] }; } },
  { id: 'S63', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jo']); s.coin.visible = s.coin2.visible = false; const sw = ph(L, 'Somewhere else'); s.stmt.userData.draw({});
      if (t < sw) cl(s, k01(t, 0, sw), [[0.1, 1.2, s.tz + 0.55], [0.05, 0.8, s.tz + 0.1]], [[0.3, 1.6, s.tz + 1.6], [0, 1.0, s.tz - 0.2]]); else cl(s, k01(t, sw, d), [[0.3, 1.6, s.tz + 1.6], [0, 1.0, s.tz - 0.2]], [[-1.6, 1.8, s.tz + 2.9], [-1.6, 1.7, s.z0]]);
      sp(s, 'jo', 0.1, s.tz - 1.15, { view: 'front', expr: 'neutral', look: [0, -0.5] }, t, null, null, 1.62);
      return { scene: s.S, cam: s.C, tags: [T("A STORE'S FEE", 330, 110, pop(t, ph(L, "store's fee")), YT), T('A HIGHER PRICE TAG', 950, 110, pop(t, ph(L, 'price tag')), YT), T('A RED LINE IN A LEDGER', 330, 620, pop(t, ph(L, 'red line')), RT), T("STATEMENTS THAT AREN'T BLANK", 950, 620, pop(t, ph(L, "isn't blank")), RT)] }; } },
  { id: 'S64', noBlurOut: true, f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['jo']); s.coin2.visible = false; s.stmt.userData.draw({}); const { tz, ty } = s; const fl = k01(t, 0.6, 1.8);
      s.coin.visible = true; s.coin.position.set(0.1, ty + 0.01 + Math.sin(fl * Math.PI) * 0.45, tz + 0.3); s.coin.rotation.set(fl * 14, 0, 0);
      cl(s, k01(t, 0, 5), [[0.4, 1.4, tz + 1.2], [0.05, 0.9, tz]], [[0.2, 1.5, tz + 1.8], [0, 1.1, tz - 0.4]]);
      sp(s, 'jo', 0.1, tz - 1.15, { view: 'front', expr: t > 2 ? 'happy' : 'neutral', look: [0, -0.3] }, t, null, null, 1.62);
      const fade = k01(t, d - 6.2, d - 5.4);
      return { scene: s.S, cam: s.C, tags: [], post: c => { if (fade > 0) { c.fillStyle = `rgba(6,5,4,${fade})`; c.fillRect(0, 0, W, H); } } }; } },
];
