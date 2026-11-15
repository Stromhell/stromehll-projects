/* Finance with Stromi 05 (Escaping the Rat Race): shot functions. Each f(t, d, L) returns {scene, cam, tags, vig}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h, y) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C, y); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h, y) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z, moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C, y); return x; };
const walkZ = (s, key, x, z0_, z1, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const z = lerp(z0_, z1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; const P = moving ? (Math.abs(z1 - z0_) / (t1 - t0) > 1.9 ? RH.anim.run(t, 'front') : RH.anim.walk(t, 'front', { cps: 1.1 })) : pose(o, t, L, who); c.set(x, z, P, s.C); return z; };
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});
const ph = (L, q, dflt) => { q = q.toLowerCase(); for (const l of L) { const i = l.text.toLowerCase().indexOf(q); if (i >= 0) return l.t0 + (l.t1 - l.t0) * i / l.text.length; } return dflt == null ? 0 : dflt; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0] || { t0: 1e9, t1: 1e9 };
const RT = { bg: '#c2372d', col: '#fff' }, GT = { bg: '#3f9b5f', col: '#fff' }, YT = { bg: '#e3c77a' }, BT = { bg: '#24303a', col: '#f4efe6' };
const cl = (s, k, a, b) => camLerp(s, E(k), a[0], b[0], a[1], b[1]);
const once = (s, k, f) => s[k] || (s[k] = f(s));
const PHONE = { h: [0.32, 0.05], hand: 'fist' };
const PHN = { h: [0.32, 0.05], hand: 'fist' };
const GOLDT = { bg: '#ffd36a' };
/* ring helpers */
const RING = (s, t, o) => { o = o || {}; s.paper.visible = o.paper !== false; s.paper2.visible = !!o.paper2; s.easels.forEach(e => e.visible = !!o.easels); s.exL.intensity = o.easels ? 6 : 0; s.broom.visible = false; s.spot.intensity = 120 * (o.dim == null ? 1 : o.dim); };
/* jimmy's apartment = living3 */
const APT = (s, o) => { o = o || {}; Object.values(s.props).forEach(p => p.visible = false); s.mail.forEach(e => e.visible = false);
  const x = once(s, 'apt5', s => { const z0 = s.z0; const tv = group(rbox(1.5, 0.86, 0.06, 0.02, std(0x111111, { roughness: 0.2, metalness: 0.4 }), 0, 0, 0)); const scr = board(1.42, 0.78, (x, w, h, o) => { o = o || {}; x.fillStyle = o.bg || '#0a1420'; x.fillRect(0, 0, w, h); if (o.t) ltxt(x, o.t, w / 2, h / 2, h * 0.16, o.col || '#9fe0ff', 'center'); }, true); scr.position.z = 0.035; tv.add(scr); tv.position.set(-2.2, 1.55, z0 + 0.06); s.S.add(tv);
      const shelf = box(0.9, 0.04, 0.3, std(0x3a2a20), 2.0, 1.3, z0 + 0.15); s.S.add(shelf); for (let i = 0; i < 3; i++) s.S.add(rbox(0.22, 0.12, 0.3, 0.04, std([0xc2372d, 0xefe4cf, 0x2f4d8b][i]), 1.72 + i * 0.28, 1.38, z0 + 0.15));
      const bags = []; for (let i = 0; i < 5; i++) { const b = rbox(0.3, 0.35, 0.2, 0.02, std(i % 2 ? 0xc9a24a : 0xe8dcbe, { roughness: 0.9 }), 2.4 - i * 0.12, 0.17, z0 + 0.6 + (i % 2) * 0.25); b.rotation.y = i * 0.5; s.S.add(b); bags.push(b); }
      const subs = []; for (let i = 0; i < 6; i++) { const p = board(0.36, 0.2, (x, w, h, o) => { x.fillStyle = ['#c2372d', '#2f4d8b', '#3f9b5f', '#d9a23a', '#7a2a8a', '#24303a'][i]; x.fillRect(0, 0, w, h); ltxt(x, ['STREAM $18', 'GYM $65', 'MUSIC $12', 'COFFEE $9', 'GAMES $15', 'CLOUD $10'][i], w / 2, h / 2, h * 0.32, '#fff', 'center'); }); p.position.set(-0.9 + (i % 3) * 0.45, 2.1 + Math.floor(i / 3) * 0.26, z0 + 0.03); p.visible = false; s.S.add(p); subs.push(p); }
      const cush = rbox(0.62, 0.42, 0.22, 0.1, new THREE.MeshBasicMaterial({ color: 0x9a3a32 }), 0, 0, 0); cush.visible = false; s.S.add(cush);
      const coffee = group(rbox(0.3, 0.42, 0.28, 0.03, std(0x1a1a1a, { metalness: 0.6, roughness: 0.3 }), 0, 0, 0), cyl(0.05, 0.05, 0.08, std(0xc9a24a, { metalness: 0.9 }), 0, 0.15, 0.16)); coffee.position.set(1.3, 0.8, z0 + 1.2); coffee.visible = false; s.S.add(coffee);
      const wheel = P5.wheel(0.95); wheel.position.set(0.3, 1.05, z0 + 2.2); wheel.visible = false; s.S.add(wheel);
      const disp = group(rbox(0.4, 0.5, 0.3, 0.03, std(0x3f6b4f, { metalness: 0.4, roughness: 0.4 }), 0, 0, 0), box(0.3, 0.06, 0.02, std(0x111111), 0, 0.05, 0.16)); disp.position.set(1.6, 0.8, z0 + 2.2); disp.visible = false; s.S.add(disp);
      return { tv, scr, bags, subs, cush, coffee, wheel, disp }; });
  x.tv.visible = true; x.scr.userData.draw(o.tv || {}); x.bags.forEach(b => b.visible = o.bags !== false); x.subs.forEach((p, i) => p.visible = (o.subs || 0) > i); x.cush.visible = !!o.cush; x.coffee.visible = !!o.coffee; x.wheel.visible = !!o.wheel; x.disp.visible = !!o.wheel; return x; };
const phoneScr = (s, on) => { s.phone.userData.screen && s.phone.userData.screen.material.color.set(on ? 0x9fe0ff : 0x111a22); };
/* carla's kitchen = kitchen3 */
const KIT = (s, o) => { o = o || {}; s.stmt.visible = false; s.coin.visible = s.coin2.visible = false; s.env.visible = false;
  const x = once(s, 'kit5', s => { const { tz, ty } = s; const jar = P4.jar('RAINY DAY'); jar.scale.setScalar(1.6); jar.position.set(-1.6, 1.25, s.z0 + 0.25); s.S.add(jar); s.S.add(box(0.8, 0.04, 0.3, std(0x5a3a22), -1.6, 1.23, s.z0 + 0.2));
      const nb = P5.notebook(); flat(nb, ty + 0.004); nb.position.set(0.05, ty + 0.004, tz + 0.1); nb.scale.setScalar(1.3); s.S.add(nb);
      const ej = P4.jar('EMERGENCY'); ej.scale.setScalar(2.0); ej.position.set(0.45, ty, tz + 0.05); ej.visible = false; s.S.add(ej);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.025, 8, 48, 0.01), basic(0x3f9b5f)); ring.position.set(0.45, ty + 0.3, tz + 0.3); ring.visible = false; s.S.add(ring);
      return { jar, nb, ej, ring }; });
  x.nb.visible = o.nb !== false; x.nb.userData.draw(o.nbo || {}); x.ej.visible = !!o.ej; x.ring.visible = !!o.ej; return x; };

const ACTS = {};
/* ======================= ACT 0: COLD OPEN ======================= */
ACTS[0] = [
  { id: 'S01', noBlurIn: true, f(t, d, L) { const s = getSet('ring'); hideCards(s); RING(s, t, { dim: 0.4 + 0.6 * k01(t, 0, 2.5) });
      const fall = k01(t, 1.0, 4.0); s.paper.position.set(0.2 + Math.sin(t * 2) * 0.3 * (1 - fall), lerp(4.5, 0.62, E(fall)), 0.4); s.paper.rotation.set(fall < 1 ? -Math.PI / 2 + Math.sin(t * 3) * 0.6 * (1 - fall) : -Math.PI / 2, 0, 0.25 + t * 0.4 * (1 - fall));
      const k = k01(t, 0, d); if (t < 4.5) cl(s, k01(t, 0, 4.5), [[0, 5.5, 10], [0, 1.4, 0]], [[0, 3.6, 5.2], [0.2, 0.6, 0.3]]); else cl(s, k01(t, 4.5, d), [[0.1, 2.1, 1.9], [0.2, 0.62, 0.4]], [[0.2, 1.5, 1.4], [0.2, 0.62, 0.4]]);
      return { scene: s.S, cam: s.C, tags: [T('AUGUST 2003', 260, 100, pop(t, ph(L, 'august')), BT), T('~$300M EARNED', 300, 600, pop(t, ph(L, 'three hundred')), GT), T('~$23M OWED', 980, 600, pop(t, ph(L, 'twenty-three')), RT)] }; } },
  { id: 'S02', f(t, d, L) { const s = getSet('ring'); hideCards(s, ['pip', 'dot']); RING(s, t); const d0 = lineAt(L, 'DOT').t0;
      s.paper.position.set(0.2, 0.62, 0.4); s.paper.rotation.set(-Math.PI / 2, 0, 0.25); const pk = 0;
      s.broom.visible = false; s.broom.position.set(2.36, 0.66, 3.9); s.broom.rotation.set(0, 0, 0.06 + Math.sin(t * 1.5) * 0.015);
      if (t < d0 - 0.5) cl(s, k01(t, 0, d0), [[3.5, 1.9, 8], [1.0, 1.0, 3]], [[2.4, 1.7, 6.6], [1.4, 1.0, 3.4]]); else cl(s, k01(t, d0 - 0.5, d), [[1.5, 1.55, 6.0], [1.5, 1.15, 3.4]], [[1.5, 1.5, 5.6], [1.5, 1.15, 3.4]]);
      sp(s, 'pip', 2.1, 3.6, { view: 'q', dir: -1, expr: lineAt(L, 'PIP', 1).t0 < t ? 'sad' : 'neutral', look: [-0.6, 0.1], arms: [null, { h: [0.3, 0.3], hand: 'grab' }], seed: 3 }, t, L, 'PIP', 1.5);
      walkTo(s, 'dot', -0.6, 0.9, 3.6, t, 0.3, d0 - 1.2, { view: 'q', dir: 1, expr: t > d0 ? 'surprised' : 'neutral', look: [0.6, 0.2], arms: [pk > 0.5 ? { h: [0.35, 0.5], hand: 'grab' } : null, null] }, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('$300M IN', 280, 110, pop(t, ph(L, 'three hundred million in')), GT), T('< $0 LEFT', 1000, 110, pop(t, ph(L, 'less than zero')), RT)] }; } },
  { id: 'S03', f(t, d, L) { const s = getSet('street'); hideCards(s); const k = E(k01(t, 0, d)); camLerp(s, k, [0, 2.6, 14], [0, 2.1, 9], [0, 2.2, -3], [0, 1.7, -3]);
      return { scene: s.S, cam: s.C, tags: [T('A RAISE?', 250, 160, pop(t, ph(L, 'a raise')), YT), T('A SIDE HUSTLE?', 640, 120, pop(t, ph(L, 'side hustle')), YT), T('A LUCKY BREAK?', 1030, 160, pop(t, ph(L, 'lucky break')), YT), T('WHAT HAPPENS AFTER IT ARRIVES', 640, 620, pop(t, ph(L, 'after it arrives')), RT)] }; } },
  { id: 'S04', noBlurOut: false, f(t, d, L) { const s = getSet('street'); hideCards(s); const k = E(k01(t, 0, d)); camLerp(s, k, [0, 2.1, 9], [0.6, 2.4, 4.6], [0, 1.7, -3], [0.6, 2.2, -3]);
      return { scene: s.S, cam: s.C, tags: [T('$105,000 A YEAR', 330, 140, pop(t, ph(L, 'six figures')), GT), T('CHECKING: $11.40', 950, 140, pop(t, ph(L, 'eleven dollars')), RT), T('DENVER · 11:58 PM', 640, 620, pop(t, ph(L, 'denver')), BT)] }; } },
  { id: 'S05', card: 'Escaping the Rat Race', sub: 'What school skipped' },
];
/* ======================= ACT 1: THE SIX-FIGURE BROKE ======================= */
ACTS[1] = [
  { id: 'S06', card: '1. The Six-Figure Broke' },
  { id: 'S07', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: 'SPORTS', bg: '#123a20', col: '#9fe0a0' } }); phoneScr(s, true); const j = lineAt(L, 'JIMMY').t0;
      if (t < j - 0.4) cl(s, k01(t, 0, j), [[-1.5, 1.8, s.z0 + 5.6], [0, 1.2, s.z0 + 0.6]], [[0.2, 1.6, s.z0 + 4.4], [0.3, 1.2, s.z0 + 1]]); else cl(s, k01(t, j - 0.4, d), [[0.6, 1.5, s.z0 + 4.4], [0.4, 1.2, s.z0 + 1.6]], [[0.5, 1.5, s.z0 + 4.0], [0.4, 1.2, s.z0 + 1.6]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'front', expr: t > j ? 'grin' : 'neutral', look: [0.3, 0.3], arms: [PHN, null], seed: 1 }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('JIMMY, 29 · SALES REP', 300, 100, pop(t, 0.8), YT), T('2025 PAY: $105,000', 980, 100, pop(t, ph(L, 'hundred and five')), GT), T('CHECKING: $11.40', 980, 620, pop(t, ph(L, 'forty cents')), RT)] }; } },
  { id: 'S08', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['carla']); const x = KIT(s); const z = s.tz - 0.7;
      cl(s, k01(t, 0, d), [[-1.6, 1.7, s.tz + 3.6], [-0.8, 1.2, s.z0 + 0.4]], [[0.2, 1.45, s.tz + 2.4], [0, 1.1, s.tz - 0.4]]);
      sp(s, 'carla', -0.2, z, { view: 'q', dir: 1, expr: 'happy', look: [0.4, 0.5], seed: 2, arms: [{ h: [0.3, 0.3], hand: 'open' }, null] }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('CARLA, 52 · SHIFT LEAD', 320, 100, pop(t, 0.8), YT), T('PAY: ~$48,000', 960, 100, pop(t, ph(L, 'less than half')), BT), T('SAVED: 6 MONTHS OF BILLS', 900, 620, pop(t, ph(L, 'six months')), GT)] }; } },
  { id: 'S09', f(t, d, L) { const s = getSet('vault3'); hideCards(s, ['mabel', 'jimmy']); s.piles.forEach(p => p.visible = false); s.labs.forEach(p => p.visible = false); s.big.visible = true; const z = s.z0 + 6.2; const m = lineAt(L, 'MABEL').t0;
      const v = 1.29 * E(k01(t, 1.0, ph(L, 'a new record', 6))); s.counter.userData.draw({ t: '$' + v.toFixed(2) + ' TRILLION' });
      if (t < m - 0.5) cl(s, k01(t, 0, m), [[0, 3.2, s.z0 + 11], [0, 2.4, s.z0]], [[0, 2.4, s.z0 + 8.4], [0, 2.2, s.z0]]); else cl(s, k01(t, m - 0.5, d), [[0.4, 1.6, z + 3.2], [0.2, 1.2, z]], [[0.3, 1.55, z + 2.8], [0.2, 1.2, z]]);
      if (t > m - 0.6) { sp(s, 'mabel', -0.6, z, { view: 'q', dir: 1, expr: 'smile', look: [0.5, 0.2], seed: 4 }, t, L, 'MABEL', 1.65); sp(s, 'jimmy', 0.8, z, { view: 'q', dir: -1, expr: t > lineAt(L, 'JIMMY').t0 ? 'sly' : 'neutral', look: [-0.5, 0.2], arms: [null, { h: [0.7, 0.8], hand: 'open' }] }, t, L, 'JIMMY', 1.72); }
      return { scene: s.S, cam: s.C, tags: [T('NY FED · Q3 2026', 300, 110, pop(t, ph(L, 'new york fed')), BT), T('NEW RECORD', 980, 110, pop(t, ph(L, 'new record')), RT), T('+$22B IN 3 MONTHS', 980, 190, pop(t, ph(L, 'twenty-two billion')), YT), T('~$10K PER HOUSEHOLD', 640, 620, t < m - 0.5 ? pop(t, ph(L, 'ten thousand')) : 0, GOLDT)] }; } },
  { id: 'S10', f(t, d, L) { const s = getSet('survey'); hideCards(s); s.old.visible = false; const a = ph(L, 'sixty-three'), b = ph(L, 'four in ten');
      s.chart.userData.draw({ title: 'SAY THEY LIVE PAYCHECK TO PAYCHECK', jars: [{ pct: 63, label: 'ALL AMERICANS', k: E(k01(t, a, a + 1.2)) }, { pct: 41, label: '$100K-$250K A YEAR', col: '#d9a23a', k: E(k01(t, b - 1.5, b)) }], foot: 'CNBC / SurveyMonkey, July 2026' });
      cl(s, k01(t, 0, d), [[-1.2, 1.7, s.z0 + 5.2], [0, 1.75, s.z0]], [[0.6, 1.75, s.z0 + 3.6], [0, 1.75, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('EVEN SIX FIGURES', 1000, 620, pop(t, ph(L, 'strange part')), RT)] }; } },
  { id: 'S11', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['jimmy', 'carla']); const z = s.z0 + 1.6; const ls = L.map(l => l.t0);
      const sh = i => i % 2 ? [[0.0, 1.5, z + 2.6], [-0.2, 1.25, z]] : [[0.6, 1.5, z + 2.6], [0.4, 1.25, z]]; const idx = Math.max(0, ls.filter(x => x <= t + 0.2).length - 1); const c = idx === 0 ? [[0.2, 1.6, z + 3.8], [0.1, 1.2, z]] : sh(idx); cl(s, 0.5, c, c);
      sp(s, 'jimmy', -0.55, z, { view: 'q', dir: 1, expr: idx >= 4 ? 'sad' : idx === 2 ? 'grin' : 'neutral', look: [0.5, 0.2], arms: [idx === 0 ? { h: [0.25, 0.3], hand: 'open' } : null, null], seed: 1 }, t, L, 'JIMMY', 1.72);
      sp(s, 'carla', 0.65, z, { view: 'q', dir: -1, expr: idx === 3 ? 'surprised' : 'smirk', look: [-0.5, 0.25], seed: 2 }, t, L, 'CARLA', 1.6);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S12', f(t, d, L) { const s = getSet('breakroom'); hideCards(s, ['jimmy', 'carla']); const z = s.z0 + 1.6; cl(s, k01(t, 0, d), [[0.1, 1.6, z + 3.4], [0.05, 1.3, z]], [[0.1, 2.2, z + 5.6], [0.05, 1.3, z]]);
      const sw = ph(L, 'if earning more'); sp(s, 'jimmy', -0.55, z, { view: 'front', expr: 'neutral', look: [0, 0.2], seed: 1 }, t, null, null, 1.72); sp(s, 'carla', 0.65, z, { view: 'front', expr: 'smile', look: [0, 0.2], seed: 2 }, t, null, null, 1.6);
      const pre = t < sw; return { scene: s.S, cam: s.C, tags: [T(pre ? 'PAY $105,000' : 'SAVED $0', 470, 140, pop(t, pre ? 0.3 : sw), pre ? GT : RT), T(pre ? 'PAY $48,000' : 'SAVED $14,000', 820, 140, pop(t, pre ? 0.6 : sw + 0.3), pre ? BT : GT), T('WHAT IS MONEY?', 640, 620, pop(t, ph(L, 'what is money')), YT)] }; } },
];
/* ======================= ACT 2: WHAT MONEY REALLY IS ======================= */
ACTS[2] = [
  { id: 'S13', card: '2. What Money Really Is' },
  { id: 'S14', f(t, d, L) { const s = getSet('market'); hideCards(s, ['wendell', 'dot']); s.setPrice('10 = 1 CUT'); const w0 = lineAt(L, 'WENDELL').t0;
      if (t < w0 - 0.3) camLerp(s, E(k01(t, 0, w0)), [0, 2.6, 6.5], [0, 1.9, 5.0], [0, 1.0, 0], [0, 1.2, 0]); else CAM(s, [0.3, 1.6, 4.9], [0.25, 1.15, 0.6]);
      sp(s, 'wendell', -0.8, 1.0, { view: 'q', dir: 1, expr: t > lineAt(L, 'DOT', 2).t0 ? 'scared' : 'happy', look: [0.6, 0.2], seed: 1 }, t, L, 'WENDELL', 1.8);
      walkTo(s, 'dot', 4.2, 1.2, 1.2, t, w0 - 2.6, w0 - 0.3, { view: 'q', dir: -1, expr: t > lineAt(L, 'DOT', 2).t0 ? 'sly' : 'neutral', look: [-0.6, 0.2], arms: [{ h: [0.5, 0.6], hand: 'fist' }, null] }, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('BARTER', 640, 100, pop(t, 1.0), YT), T('NO CHICKENS REQUIRED', 640, 620, t < w0 ? pop(t, ph(L, 'chickens')) : 0, BT)] }; } },
  { id: 'S15', f(t, d, L) { const s = getSet('market'); hideCards(s, ['wendell', 'dot']); s.setPrice('$1.00'); const cx = once(s, 'coin5', s => { const c = P4.coin(0.07); s.S.add(c); return c; });
      const k = E(k01(t, 7.0, 7.8)); cx.visible = true; cx.position.set(-0.35, 1.05, 1.15); cx.rotation.set(Math.PI / 2, 0, 0);
      cl(s, k01(t, 0, d), [[0.3, 1.6, 4.9], [0.25, 1.15, 0.6]], [[1.6, 1.8, 6.2], [0.6, 1.1, 0.6]]);
      sp(s, 'wendell', -0.8, 1.0, { view: 'q', dir: 1, expr: 'happy', look: [0.6, 0.2], arms: [null, { h: [0.7, 0.5], hand: 'open' }], seed: 1 }, t, null, null, 1.8);
      walkTo(s, 'dot', 1.2, 4.5, 1.2, t, 3.2, 6.5, { view: 'q', dir: -1, expr: 'happy', look: [-0.5, 0.2], arms: [t > 6.4 && t < 7.4 ? { h: [-0.5, 0.45], hand: 'open' } : null, null] }, null, null, 1.55);
      return { scene: s.S, cam: s.C, tags: [T('MONEY = A RECEIPT FOR VALUE', 640, 110, pop(t, ph(L, 'receipt for value')), GOLDT), T('$20 = "WORTH IT TO ME"', 330, 620, pop(t, ph(L, 'twenty dollars')), YT), T('YOUR HOURS = THEIR VALUE', 950, 620, pop(t, ph(L, 'your boss')), GT)] }; } },
  { id: 'S16', f(t, d, L) { const s = getSet('cork'); hideCards(s);
      const n = once(s, 'n5', s => ({ a: s.pin(-0.6, 1.75, 1.1, 0.5, (x, w, h) => { x.fillStyle = '#ffe14a'; x.fillRect(0, 0, w, h); txt(x, 'MONEY = VALUE', w / 2, h / 2, h * 0.32); }, 0.03), b: s.pin(0.5, 1.05, 1.6, 0.42, (x, w, h) => { x.fillStyle = '#f6efe0'; x.fillRect(0, 0, w, h); txt(x, '"money is the root of all evil"', w / 2, h / 2, h * 0.2); }, -0.02),
        fix: s.pin(0.15, 1.38, 0.9, 0.22, (x, w, h) => { x.clearRect(0, 0, w, h); txt(x, 'THE LOVE OF', w / 2, h / 2, h * 0.6, '#c2372d'); }, -0.08) }));
      n.fix.visible = t > ph(L, 'the love of money'); n.fix.scale.setScalar(t > ph(L, 'the love of money') ? outBack(k01(t, ph(L, 'the love of money'), ph(L, 'the love of money') + 0.5)) : 0.01);
      cl(s, k01(t, 0, d), [[-0.8, 1.7, s.z0 + 3.0], [-0.4, 1.6, s.z0]], [[0.4, 1.4, s.z0 + 2.4], [0.3, 1.25, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('1 TIMOTHY 6:10', 1040, 620, pop(t, ph(L, 'from the bible')), BT), T('TWO WORDS, BIG DIFFERENCE', 330, 620, pop(t, ph(L, 'two words')), RT)] }; } },
  { id: 'S17', f(t, d, L) { const s = getSet('diner'); hideCards(s, ['gus', 'dot']); s.menu.userData.draw(['TODAY', 'PIE', '$4'], 1); const z = s.z0 + 3.0; const n0 = lineAt(L, 'N').t0;
      const mag = once(s, 'mag5', s => { const m = board(0.3, 0.4, (x, w, h) => { paperBg(x, w, h, '#f4e8c8'); ltxt(x, 'FRIDGE KING', w / 2, h * 0.12, h * 0.09, REDC, 'center'); x.fillStyle = '#9ac0d0'; x.fillRect(w * 0.25, h * 0.25, w * 0.5, h * 0.55); x.fillStyle = '#1e1612'; x.beginPath(); x.arc(w / 2, h * 0.4, w * 0.12, 0, TAU); x.fill(); ltxt(x, 'BILLIONAIRE!', w / 2, h * 0.9, h * 0.07, INK, 'center'); }); s.S.add(m); return m; });
      mag.visible = false;
      if (t < n0 - 0.3) { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.7, 1.45, z + 2.0], [-0.3, 1.25, z]] : [[0.5, 1.45, z + 2.0], [0.1, 1.25, z]]; cl(s, 0.5, c, c); } else cl(s, k01(t, n0 - 0.3, d), [[0, 1.6, z + 3], [0, 1.2, z]], [[0, 2.0, z + 4.2], [0, 1.4, z - 1]]);
      sp(s, 'gus', -0.65, z, { view: 'q', dir: 1, expr: 'sly', look: [0.4, 0.3], arms: [{ h: [0.4, 0.55], hand: 'grab' }, null], seed: 3 }, t, L, 'GUS', 1.75);
      sp(s, 'dot', 0.55, z, { view: 'q', dir: -1, expr: 'frown', look: [-0.4, 0.3], seed: 2 }, t, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('WHO LOST?', 400, 620, pop(t, ph(L, 'who lost')), RT), T('WHAT DID THEY MAKE?', 900, 620, pop(t, ph(L, 'what they made')), GT)] }; } },
  { id: 'S18', f(t, d, L) { const s = getSet('diner'); hideCards(s, ['hacker', 'cook']); s.menu.userData.draw(['TODAY', 'PIE', '$4'], 1); const z = s.z0 + 3.0;
      cl(s, k01(t, 0, d), [[0, 1.55, z + 3.2], [0, 1.2, z]], [[0, 1.5, z + 2.6], [0, 1.2, z]]);
      sp(s, 'hacker', -0.8, z, { view: 'q', dir: 1, expr: 'sly', look: [0.3, 0.2], seed: 5, arms: [{ h: [0.6, 0.6], hand: 'open' }, null] }, t, null, null, 1.7);
      sp(s, 'cook', 0.8, z, { view: 'q', dir: -1, expr: 'happy', look: [-0.3, 0.2], seed: 6, arms: [null, { h: [0.5, 0.45], hand: 'grab' }] }, t, null, null, 1.7);
      return { scene: s.S, cam: s.C, tags: [T('SCAMMER: "TRUST ME"', 330, 120, pop(t, ph(L, 'scammers')), RT), T('BAKER: REAL BREAD', 950, 120, pop(t, ph(L, 'scammers') + 0.6), GT), T('MONEY = A TOOL (LIKE A HAMMER)', 640, 620, pop(t, ph(L, 'hammer')), YT), T('IT BUYS OPTIONS', 640, 200, pop(t, ph(L, 'options')), GOLDT)] }; } },
  { id: 'S19', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: 'SPORTS', bg: '#123a20', col: '#9fe0a0' } }); phoneScr(s, true); const j = lineAt(L, 'JIMMY').t0;
      cl(s, k01(t, 0, d), [[0.5, 1.5, s.z0 + 4.4], [0.4, 1.2, s.z0 + 1.8]], [[0.4, 1.45, s.z0 + 3.9], [0.4, 1.2, s.z0 + 1.8]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'front', expr: t > j ? 'smirk' : 'neutral', look: [0, 0], arms: [PHN, null], seed: 1 }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('CHECKING: $11.40', 1000, 110, pop(t, 0.4), RT), T("WHAT'S YOUR RELATIONSHIP WITH MONEY?", 640, 620, pop(t, ph(L, 'relationship')), YT)] }; } },
];
/* ======================= ACT 3: MONEY IN, MONEY OUT ======================= */
const TUB = (s, t, a, b) => { s.tubA.userData.set(a[0], a[1], a[2], t); s.tubB.visible = !!b; if (b) s.tubB.userData.set(b[0], b[1], b[2], t); };
ACTS[3] = [
  { id: 'S20', card: '3. Money In, Money Out' },
  { id: 'S21', f(t, d, L) { const s = getSet('tub'); hideCards(s); s.tubA.position.x = 0; s.tree.visible = s.pipe.visible = s.plug.visible = false; s.tubA.userData.lab.userData.draw({ t: 'NET WORTH' });
      const tp = ph(L, 'the tap'), dr = ph(L, 'the drain'), wl = ph(L, 'the water');
      TUB(s, t, [0.5 + 0.35 * k01(t, tp, wl) - 0.2 * k01(t, dr, wl), t > tp ? 0.6 : 0, t > dr ? 0.6 : 0], null);
      cl(s, k01(t, 0, d), [[0, 2.8, s.z0 + 5.0], [0, 0.6, s.z0 + 2]], [[0.5, 2.3, s.z0 + 3.9], [0, 0.6, s.z0 + 2]]);
      return { scene: s.S, cam: s.C, tags: [T('TAP = WHAT YOU PRODUCE (WORK)', 360, 110, pop(t, tp), GT), T('DRAIN = WHAT YOU CONSUME', 920, 110, pop(t, dr), RT), T('WATER = NET WORTH', 640, 620, pop(t, wl), GOLDT), T('OWN − OWE', 640, 545, pop(t, ph(L, 'minus')), YT)] }; } },
  { id: 'S22', f(t, d, L) { const s = getSet('tub'); hideCards(s, ['jimmy', 'carla']); s.tree.visible = s.pipe.visible = s.plug.visible = false; s.tubA.position.x = -1.05; s.tubB.position.x = 1.05;
      s.tubA.userData.lab.userData.draw({ t: "JIMMY'S TUB", bg: '#24303a', col: '#f4efe6' }); s.tubB.userData.lab.userData.draw({ t: "CARLA'S TUB", bg: '#3f9b5f', col: '#fff' });
      TUB(s, t, [0.12 + 0.04 * Math.sin(t * 2), 1.0, 3.0], [0.8 + 0.05 * k01(t, 0, d), 0.25, 0.1]); const j = lineAt(L, 'JIMMY').t0;
      if (t < j - 0.3) cl(s, k01(t, 0, j), [[0, 3.2, s.z0 + 6.6], [0, 0.5, s.z0 + 2]], [[0, 2.9, s.z0 + 6.1], [0, 0.5, s.z0 + 2]]); else cl(s, k01(t, j - 0.3, d), [[0, 1.7, s.z0 + 6.6], [0, 1.0, s.z0 + 2.6]], [[0, 1.65, s.z0 + 6.2], [0, 1.0, s.z0 + 2.6]]);
      if (t > j - 0.5) { sp(s, 'jimmy', -1.05, s.z0 + 3.0, { view: 'q', dir: 1, expr: 'grin', look: [0.3, 0.2], arms: [null, { h: [-0.6, 0.6], hand: 'point' }], seed: 1 }, t, L, 'JIMMY', 1.72); sp(s, 'carla', 1.05, s.z0 + 3.0, { view: 'q', dir: -1, expr: 'smirk', look: [-0.4, 0.5], seed: 2 }, t, L, 'CARLA', 1.6); }
      return { scene: s.S, cam: s.C, tags: [T('FIRE HOSE IN', 260, 110, pop(t, ph(L, 'fire hose')), GT), T('MANHOLE DRAIN', 260, 190, pop(t, ph(L, 'manhole')), RT), T('GARDEN HOSE IN', 1010, 110, pop(t, ph(L, 'garden hose')), GT), T('STRAW DRAIN', 1010, 190, pop(t, ph(L, 'a straw')), YT)] }; } },
  { id: 'S23', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['carla']); KIT(s); const { tz, ty } = s;
      cl(s, k01(t, 0, d), [[0.8, 1.7, tz + 3.0], [-0.2, 1.1, tz - 0.4]], [[0.2, 1.5, tz + 2.0], [-0.1, 1.05, tz - 0.3]]);
      sp(s, 'carla', -0.5, tz - 0.7, { view: 'q', dir: 1, expr: 'neutral', look: [0.4, 0.6], seed: 2 }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('EVERY PAYCHECK SINCE YOUR FIRST JOB', 640, 110, pop(t, ph(L, 'every paycheck')), YT), T('HOW MUCH IS STILL WITH YOU?', 640, 620, pop(t, ph(L, 'still with you')), RT)] }; } },
  { id: 'S24', f(t, d, L) { const s = getSet('survey'); hideCards(s); s.old.visible = true; s.chart.userData.draw({ title: '2026: STILL PAYCHECK TO PAYCHECK', jars: [{ pct: 63, label: 'ALL AMERICANS' }, { pct: 41, label: '$100K-$250K', col: '#d9a23a' }], foot: 'CNBC / SurveyMonkey, July 2026' });
      const a = ph(L, 'almost a decade'); if (t < a) cl(s, k01(t, 0, a), [[-3.0, 1.7, s.z0 + 2.6], [-3.0, 1.7, s.z0]], [[-2.8, 1.65, s.z0 + 2.0], [-3.0, 1.7, s.z0]]); else cl(s, k01(t, a, d), [[-1.5, 1.7, s.z0 + 4.2], [-1.2, 1.7, s.z0]], [[0, 1.75, s.z0 + 4.6], [-0.4, 1.7, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('CAREERBUILDER · 2017', 640, 100, pop(t, ph(L, 'twenty seventeen')), BT), T('THE TAP ISN\'T THE PROBLEM', 640, 620, pop(t, ph(L, "problem isn't")), RT)] }; } },
];
/* ======================= ACT 4: THE LEAK ======================= */
ACTS[4] = [
  { id: 'S25', card: '4. The Leak' },
  { id: 'S26', f(t, d, L) { const s = getSet('carlot'); hideCards(s, ['wendell', 'jimmy']); s.board.visible = false; s.tn.visible = s.to.visible = false; s.bunt.children.forEach((f, i) => f.rotation.z = Math.sin(t * 3 + i) * 0.2); const w0 = lineAt(L, 'WENDELL').t0;
      if (t < w0 - 0.3) camLerp(s, E(k01(t, 0, w0)), [-6, 2.4, 8], [0.3, 1.8, 7], [-1, 0.8, 0], [0.3, 0.9, 0]); else { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[1.4, 1.55, 5.2], [0.9, 1.15, 1.8]] : [[0.0, 1.55, 5.2], [0.6, 1.15, 1.8]]; cl(s, 0.5, c, c); }
      sp(s, 'wendell', 0.2, 1.8, { view: 'q', dir: 1, expr: 'sly', look: [0.5, 0.3], arms: [{ h: [-0.8, 0.5], hand: 'open' }, { h: [0.8, 0.5], hand: 'open' }], seed: 2 }, t, L, 'WENDELL', 1.8);
      walkTo(s, 'jimmy', 5.5, 1.5, 1.9, t, w0 - 3.0, w0 - 0.4, { view: 'q', dir: -1, expr: t > lineAt(L, 'WENDELL', 2).t0 ? 'surprised' : 'grin', look: [-0.6, 0.3] }, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [T('RAISE: +$10,000/YR', 300, 110, pop(t, ph(L, 'ten thousand')), GT), T('72 MONTHS', 980, 110, pop(t, ph(L, 'seventy-two')), RT), T('"LOW MONTHLY PAYMENT"', 980, 620, pop(t, lineAt(L, 'WENDELL', 3).t0), YT)] }; } },
  { id: 'S27', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); const n = Math.min(6, Math.floor(k01(t, ph(L, 'one more subscription') - 2.5, d - 1) * 7)); const tvk = k01(t, 1.0, 2.0);
      const x = APT(s, { tv: { t: 'BIGGER TV', bg: '#1a2a4a' }, subs: 0, coffee: t > ph(L, 'nicer car') }); x.tv.scale.setScalar(lerp(1, 1.35, E(tvk))); phoneScr(s, false);
      cl(s, k01(t, 0, d), [[0.0, 1.8, s.z0 + 5.6], [0, 1.4, s.z0]], [[0.3, 1.7, s.z0 + 4.2], [0, 1.6, s.z0]]);
      sp(s, 'jimmy', 0.6, s.z0 + 2.0, { view: 'q', dir: -1, expr: 'happy', look: [-0.4, 0.3], seed: 1 }, t, null, null, 1.72);
      return { scene: s.S, cam: s.C, tags: [T('LIFESTYLE CREEP', 640, 100, pop(t, ph(L, 'lifestyle creep')), RT), T('RAISE: GONE', 1000, 200, pop(t, ph(L, 'disappears')), RT), T('EARN MORE → NEED MORE', 300, 620, pop(t, ph(L, 'need to earn')), YT), T('+' + n + ' SUBSCRIPTIONS', 300, 200, n > 0 ? 1 : 0, GT)] }; } },
  { id: 'S28', f(t, d, L) { const s = getSet('ring'); hideCards(s); RING(s, t, { easels: true, dim: 0.8 });
      cl(s, k01(t, 0, d), [[-2.6, 1.6, 7.2], [-1.6, 1.2, 3.9]], [[2.0, 1.55, 6.8], [1.6, 1.2, 3.9]]);
      return { scene: s.S, cam: s.C, tags: [T('BAD DEALS · LAWSUITS · TAXES', 640, 100, pop(t, ph(L, 'bad deals')), BT), T('IRS: $13M+', 1040, 180, pop(t, ph(L, 'thirteen million')), RT)] }; } },
  { id: 'S29', f(t, d, L) { const s = getSet('ring'); hideCards(s, ['pip', 'dot']); RING(s, t, { easels: true, dim: 0.8 });
      const i = L.filter(l => l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.2, 1.45, 6.4], [-0.5, 1.15, 4.6]] : [[0.4, 1.45, 6.4], [0.1, 1.15, 4.6]]; cl(s, 0.5, c, c);
      sp(s, 'dot', -0.6, 4.7, { view: 'q', dir: 1, expr: 'surprised', look: [0.3, 0.4], seed: 2 }, t, L, 'DOT', 1.55); sp(s, 'pip', 0.5, 4.7, { view: 'q', dir: -1, expr: i >= 4 ? 'grin' : 'neutral', look: [-0.3, 0.4], seed: 3 }, t, L, 'PIP', 1.5);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('ring'); hideCards(s); RING(s, t, { dim: lerp(1, 0.55, k01(t, 0, d)) }); s.paper.position.set(0.2, 0.62, 0.4); s.paper.rotation.set(-Math.PI / 2, 0, 0.25);
      cl(s, k01(t, 0, d), [[0, 3.6, 5.6], [0.2, 0.62, 0.4]], [[0.2, 1.6, 1.6], [0.2, 0.62, 0.4]]);
      return { scene: s.S, cam: s.C, tags: [T('LOTTERY WINNERS · ATHLETES · POP STARS', 640, 100, pop(t, ph(L, 'lottery')), YT), T("YOU CAN'T OUT-EARN A GROWING DRAIN", 640, 620, pop(t, ph(L, "can't out-earn")), RT)] }; } },
];
/* ======================= ACT 5: THE REAL RAT RACE ======================= */
ACTS[5] = [
  { id: 'S31', card: '5. The Real Rat Race' },
  { id: 'S32', f(t, d, L) { const s = getSet('stage'); hideCards(s, ['guru', 'dot']); s.banner.userData.draw({}); s.wheel.userData.rot.rotation.z = -t * 2.5; const g0 = lineAt(L, 'GUS').t0;
      const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; if (t < g0 - 0.3) cl(s, k01(t, 0, g0), [[0, 2.2, s.z0 + 9], [0, 2.4, s.z0]], [[0.6, 1.8, s.z0 + 6.4], [0, 1.8, s.z0 + 1]]); else { const c = [1, 3, 5].includes(i) ? [[0.6, 1.6, s.z0 + 6.6], [1.0, 1.3, s.z0 + 4.4]] : [[0.4, 1.8, s.z0 + 5.4], [0.2, 1.7, s.z0 + 1.6]]; cl(s, 0.5, c, c); }
      sp(s, 'guru', 0.2, s.stageZ, { view: 'front', expr: [3, 5].includes(i) ? 'sly' : 'grin', look: [0.2, 0.1], arms: [{ h: [-0.8, 0.7], hand: 'point' }, null], seed: 1 }, t, L, 'GUS', 1.75, s.stageY);
      sp(s, 'dot', 1.0, s.z0 + 4.4, { view: 'qback', dir: -1, expr: 'neutral', look: [-0.2, 0.4], seed: 2 }, t, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('RAT RACE = ENDLESS, POINTLESS RACE', 640, 620, t < g0 ? pop(t, ph(L, 'endless')) : 0, YT)] }; } },
  { id: 'S33', f(t, d, L) { const s = getSet('stage'); hideCards(s, ['guru']); const tr = k01(t, 0.6, 1.6); s.banner.userData.draw(tr > 0.5 ? { t: 'THE JOB IS NOT THE TRAP', s: '', bg: '#efe4cf' } : {}); s.banner.rotation.z = Math.sin(tr * Math.PI) * 0.2; s.wheel.userData.rot.rotation.z = -t * 1.2;
      cl(s, k01(t, 0, d), [[0.5, 2.0, s.z0 + 5.8], [0.5, 2.6, s.z0]], [[0.5, 1.7, s.z0 + 7.6], [0.5, 2.2, s.z0]]);
      sp(s, 'guru', 2.2, s.stageZ, { view: 'q', dir: -1, expr: 'scared', look: [-0.5, 0.6], seed: 1 }, t, null, null, 1.75, s.stageY);
      return { scene: s.S, cam: s.C, tags: [T('LOVE IT', 220, 620, pop(t, ph(L, 'love their work')), GT), T('FINE WITH IT', 470, 620, pop(t, ph(L, 'happy with it')), GT), T('FUNDS A DREAM', 740, 620, pop(t, ph(L, 'fund something')), GT)] }; } },
  { id: 'S34', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); const x = APT(s, { wheel: true, tv: { t: '' } }); phoneScr(s, false); x.wheel.userData.rot.rotation.z = -t * 3;
      const c = card(s, 'jimmy', 1.2); const P = RH.anim.run(t, 'side'); P.dir = 1; P.face.expr = 'sad'; c.set(0.3, s.z0 + 2.2, P, s.C, 0.15);
      const bill = once(s, 'bill5', s => { const b = board(0.18, 0.08, (x, w, h) => { x.fillStyle = '#7fb07a'; x.fillRect(0, 0, w, h); ltxt(x, '$', w / 2, h / 2, h * 0.7, '#1e3a1e', 'center'); }); s.S.add(b); return b; }); const u = (t * 0.8) % 1; bill.position.set(1.6, lerp(1.1, 0.82, u), s.z0 + 2.2 + u * 0.4); bill.rotation.x = -u * 1.4;
      cl(s, k01(t, 0, d), [[0.2, 1.4, s.z0 + 5.4], [0.6, 1.0, s.z0 + 2.2]], [[1.0, 1.3, s.z0 + 4.4], [0.7, 1.0, s.z0 + 2.2]]);
      return { scene: s.S, cam: s.C, tags: [T('1 PAYCHECK FROM ZERO', 320, 110, pop(t, ph(L, 'one paycheck')), RT), T('LAYOFF', 300, 620, pop(t, ph(L, 'layoff')), BT), T('HOSPITAL', 640, 620, pop(t, ph(L, 'hospital')), BT), T('DEAD CAR', 980, 620, pop(t, ph(L, "won't start")), BT)] }; } },
  { id: 'S35', f(t, d, L) { const s = getSet('garage3'); hideCards(s, ['ray', 'jimmy']); s.car.position.set(-1.2, 0, -0.2); s.bill.visible = false;
      s.smoke.forEach((p, i) => { const u = (t * 0.4 + i / 10) % 1; p.visible = true; p.position.set(0.8 + u * 0.4, 0.8 + u * 2.2, -0.2 + Math.sin(i) * 0.3); p.scale.setScalar(0.5 + u * 1.5); p.material.opacity = 0.3 * (1 - u); });
      const r1 = lineAt(L, 'RAY', 1).t0; const inv = once(s, 'inv5', s => { const b = board(0.3, 0.45, (x, w, h) => { paperBg(x, w, h); ltxt(x, 'INVOICE', w / 2, h * 0.08, h * 0.07, INK, 'center'); ['Belt', 'Pump', 'Labor', 'Fluids', 'Misc'].forEach((a, i) => ltxt(x, a, w * 0.1, h * (0.22 + i * 0.1), h * 0.055)); ltxt(x, 'TOTAL', w * 0.1, h * 0.8, h * 0.07); ltxt(x, '$1,400', w * 0.9, h * 0.8, h * 0.1, REDC, 'right'); }); s.S.add(b); return b; });
      inv.visible = t > r1 - 0.3; inv.position.set(0.3, 1.15, 1.55); inv.scale.setScalar(t > r1 - 0.3 ? outBack(k01(t, r1 - 0.3, r1 + 0.2)) : 0.01);
      const i = L.filter(l => l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.3, 1.5, 3.8], [0.0, 1.2, 1.4]] : [[0.6, 1.5, 3.8], [0.3, 1.2, 1.4]]; cl(s, 0.5, c, c);
      sp(s, 'ray', 0.75, 1.4, { view: 'q', dir: -1, expr: i >= 2 ? 'frown' : 'happy', look: [-0.5, 0.2], arms: [null, { h: [0.6, 0.4], hand: 'grab' }], seed: 4 }, t, L, 'RAY', 1.6);
      sp(s, 'jimmy', -0.3, 1.5, { view: 'q', dir: 1, expr: i >= 3 ? 'scared' : 'neutral', look: [0.5, 0.2], seed: 1 }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S36', f(t, d, L) { const s = getSet('survey'); hideCards(s); s.old.visible = false; const a = ph(L, 'sixty-three');
      s.chart.userData.draw({ title: 'SURPRISE $400 BILL: PAY WITH CASH?', jars: [{ pct: 63, label: 'YES', col: '#3f9b5f', k: E(k01(t, a, a + 1.2)) }, { pct: 37, label: "NO: BORROW / SELL / CAN'T", col: '#c2372d', k: E(k01(t, ph(L, 'more than a third'), ph(L, 'more than a third') + 1.2)) }], foot: 'Federal Reserve SHED, May 2026' });
      cl(s, k01(t, 0, d), [[1.2, 1.7, s.z0 + 5.0], [0, 1.75, s.z0]], [[-0.4, 1.75, s.z0 + 3.6], [0, 1.75, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('1 IN 3 ADULTS', 1040, 620, pop(t, ph(L, 'more than a third')), RT)] }; } },
  { id: 'S37', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: '' } }); phoneScr(s, true); s.props.cal.visible = false;
      const q = once(s, 'q5', s => { const b = board(0.5, 0.3, (x, w, h) => { paperBg(x, w, h, '#fbf6ea'); ltxt(x, '"The things you own', w / 2, h * 0.3, h * 0.12, INK, 'center'); ltxt(x, 'end up owning you."', w / 2, h * 0.52, h * 0.12, INK, 'center'); ltxt(x, 'Tyler Durden, Fight Club', w / 2, h * 0.8, h * 0.08, REDC, 'center'); }); b.position.set(-1.2, 1.6, s.z0 + 0.04); s.S.add(b); return b; });
      const qt = ph(L, 'the things you own'); cl(s, k01(t, 0, qt), [[0.6, 1.45, s.z0 + 4.4], [0.3, 1.25, s.z0 + 1.6]], [[0.5, 1.45, s.z0 + 4.0], [0.3, 1.25, s.z0 + 1.6]]); if (t > qt - 0.4) cl(s, k01(t, qt - 0.4, d), [[-0.5, 1.6, s.z0 + 2.2], [-1.2, 1.6, s.z0]], [[-1.15, 1.6, s.z0 + 1.0], [-1.2, 1.6, s.z0]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'front', expr: 'sad', look: [0, 0.4], arms: [PHN, null], seed: 1 }, t, null, null, 1.72);
      return { scene: s.S, cam: s.C, vig: 0.9, tags: [T('JOB = LIFELINE, NOT A CHOICE', 640, 110, t < qt ? pop(t, ph(L, 'lifeline')) : 0, RT)] }; } },
  { id: 'S38', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['carla', 'dot']); const x = KIT(s); const c0 = lineAt(L, 'CARLA').t0;
      const tk = k01(t, c0, c0 + 1.5); x.jar.position.y = 1.25 + 0.0 * tk;
      if (t < c0 - 0.3) cl(s, k01(t, 0, c0), [[-1.6, 1.7, s.tz + 3.4], [-1.4, 1.2, s.z0 + 0.3]], [[-0.6, 1.5, s.tz + 2.6], [-0.4, 1.2, s.tz - 0.6]]); else { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.6, 1.45, s.tz + 1.8], [-0.4, 1.2, s.tz - 0.7]] : [[0.4, 1.45, s.tz + 1.8], [0.4, 1.15, s.tz - 0.7]]; cl(s, 0.5, c, c); }
      sp(s, 'carla', -0.45, s.tz - 0.7, { view: 'q', dir: 1, expr: 'smile', look: [0.5, 0.2], arms: [{ h: [0.3, 0.45], hand: 'grab' }, null], seed: 2 }, t, L, 'CARLA', 1.6);
      if (t > c0 - 0.6) sp(s, 'dot', 0.6, s.tz - 0.6, { view: 'q', dir: -1, expr: 'surprised', look: [-0.5, 0.3], seed: 3 }, t, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('ANNOYING, NOT A CRISIS', 640, 110, t < c0 ? pop(t, ph(L, 'annoying')) : 0, GT), T('NOT HER SALARY. HER CUSHION.', 640, 620, t < c0 ? pop(t, ph(L, 'cushion')) : 0, GOLDT)] }; } },
];
/* ======================= ACT 6: THE OSTRICH ======================= */
ACTS[6] = [
  { id: 'S39', card: '6. The Ostrich' },
  { id: 'S40', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: '' } }); phoneScr(s, false); const reach = Math.sin(Math.max(0, t - 2) * 1.6) > 0.6;
      cl(s, k01(t, 0, d), [[0.8, 1.6, s.z0 + 4.4], [0.9, 0.9, s.z0 + 1.3]], [[0.9, 1.4, s.z0 + 3.2], [1.0, 0.9, s.z0 + 1.3]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'q', dir: 1, expr: 'scared', look: [0.6, 0.6], arms: [null, reach ? { h: [0.8, 0.2], hand: 'open' } : null], seed: 1 }, t, null, null, 1.72);
      return { scene: s.S, cam: s.C, tags: [T('STEP 1: LOOK', 640, 100, pop(t, ph(L, 'look.')), YT), T('HOUSING · TRANSPORT · FOOD · BILLS · FUN · DEBT', 640, 620, pop(t, ph(L, 'housing')), BT)] }; } },
  { id: 'S41', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy', 'dot']); const x = APT(s, { tv: { t: '' }, cush: false }); phoneScr(s, false); const dk = lineAt(L, 'DOT').t0;
      
      const i = L.filter(l => l.t0 <= t + 0.1).length; const c = i % 2 ? [[0.0, 1.5, s.z0 + 3.6], [0.4, 1.1, s.z0 + 1.8]] : [[1.2, 1.5, s.z0 + 3.4], [1.0, 1.1, s.z0 + 1.8]]; cl(s, 0.5, c, c);
      const jc = sp(s, 'jimmy', 0.35, s.z0 + 1.55, { view: 'qback', dir: -1, expr: 'scared', arms: [null, null], seed: 1 }, t, L, 'JIMMY', 1.72);
      walkTo(s, 'dot', 3.0, 1.5, s.z0 + 2.3, t, dk - 2.2, dk - 0.3, { view: 'q', dir: -1, expr: 'surprised', look: [-0.6, 0.3], arms: [{ h: [0.4, 0.4], hand: 'grab' }, null] }, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S42', f(t, d, L) { const s = getSet('study'); hideCards(s);
      const o = once(s, 'ost5', s => { const g = group(); const tray = rbox(0.5, 0.06, 0.35, 0.01, std(0x5a3a22), 0, 0, 0); const sand = box(0.46, 0.02, 0.31, std(0xe0c890, { roughness: 1 }), 0, 0.068, 0); g.add(tray, sand); const body = sph(0.08, std(0x2a2420, { roughness: 0.8 }), 0, 0.2, 0); body.scale.set(1.3, 0.9, 1); g.add(body); const tail = sph(0.05, std(0xefe4cf), -0.11, 0.24, 0); g.add(tail);
          const neck = cyl(0.012, 0.012, 0.18, std(0xd8a088), 0, 0, 0); neck.position.set(0.1, 0.13, 0); neck.rotation.z = -0.9; g.add(neck); for (const z of [-0.03, 0.03]) g.add(cyl(0.008, 0.008, 0.12, std(0xd8a088), 0, 0.06, z)); g.position.set(0.3, 0.8, s.z0 + 1.3); s.S.add(shadowy(g)); return g; });
      cl(s, k01(t, 0, d), [[0.9, 1.4, s.z0 + 2.8], [0.3, 0.9, s.z0 + 1.3]], [[0.5, 1.1, s.z0 + 1.9], [0.3, 0.88, s.z0 + 1.3]]);
      return { scene: s.S, cam: s.C, tags: [T('THE OSTRICH EFFECT', 640, 100, pop(t, ph(L, 'ostrich effect')), YT), T('MARKET UP → WE LOOK', 330, 620, pop(t, ph(L, 'when the market is up')), GT), T('MARKET DOWN → WE HIDE', 950, 620, pop(t, ph(L, "when it's down")), RT)] }; } },
  { id: 'S43', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['carla', 'dot']); const c0 = lineAt(L, 'CARLA').t0; KIT(s, { nbo: t > c0 ? { hi: 'TAKEOUT' } : {} }); const { tz, ty } = s;
      if (t < c0 - 0.3) cl(s, k01(t, 0, c0), [[-0.6, 1.7, tz + 2.6], [-0.2, 1.1, tz - 0.4]], [[0.0, 1.5, tz + 1.9], [0, 1.1, tz - 0.3]]); else if (t < c0 + 2.2) cl(s, k01(t, c0 - 0.3, c0 + 2.2), [[0.05, ty + 0.65, tz + 0.35], [0.05, ty, tz + 0.1]], [[0.05, ty + 0.5, tz + 0.3], [0.05, ty, tz + 0.1]]); else { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[0.5, 1.45, tz + 1.8], [0.5, 1.15, tz - 0.7]] : [[-0.5, 1.45, tz + 1.8], [-0.4, 1.2, tz - 0.7]]; cl(s, 0.5, c, c); }
      sp(s, 'carla', -0.45, tz - 0.7, { view: 'q', dir: 1, expr: t > c0 ? 'surprised' : 'neutral', look: [0.4, 0.6], seed: 2 }, t, L, 'CARLA', 1.6);
      if (t > c0 + 1.5) sp(s, 'dot', 0.6, tz - 0.6, { view: 'q', dir: -1, expr: 'grin', look: [-0.5, 0.3], seed: 3 }, t, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('20 MINUTES A MONTH', 640, 110, t < c0 ? pop(t, ph(L, 'twenty minutes')) : 0, GT)] }; } },
  { id: 'S44', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: '' } }); phoneScr(s, true);
      cl(s, k01(t, 0, d), [[0.4, 1.5, s.z0 + 4.4], [0.4, 1.25, s.z0 + 1.8]], [[0.4, 1.5, s.z0 + 3.6], [0.4, 1.3, s.z0 + 1.8]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'front', expr: t > 2 ? 'neutral' : 'scared', look: [0, 0.5], arms: [PHN, null], seed: 1 }, t, null, null, 1.72);
      return { scene: s.S, cam: s.C, tags: [T("YOU CAN'T FIX A LEAK YOU WON'T LOOK AT", 640, 620, pop(t, ph(L, "can't fix")), YT)] }; } },
];
/* ======================= ACT 7: THE PLAN + WALLET + END ======================= */
ACTS[7] = [
  { id: 'S45', card: '7. The Plan School Skipped' },
  { id: 'S46', f(t, d, L) { const s = getSet('classroom'); hideCards(s, ['mabel', 'jimmy']); s.chalk.userData.draw(['x² + 5x + 6 = 0', 'Fe  Cu  Na  K', '1066 · 1492 · 1776']); const n0 = lineAt(L, 'N').t0; const dz = s.desks[1].position;
      if (t < n0 - 0.3) { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.6, 1.5, dz.z + 2.2], [-1.0, 1.2, dz.z]] : [[1.2, 1.6, s.z0 + 4.2], [1.9, 1.4, s.z0 + 1.9]]; cl(s, 0.5, c, c); } else cl(s, k01(t, n0 - 0.3, d), [[0.6, 1.9, s.z0 + 7.4], [0, 1.4, s.z0]], [[0.2, 1.8, s.z0 + 6.4], [0, 1.45, s.z0]]);
      sp(s, 'mabel', 1.9, s.z0 + 1.9, { view: 'q', dir: -1, expr: 'neutral', look: [-0.5, 0.2], arms: [{ h: [-0.7, 0.7], hand: 'point' }, null], seed: 4 }, t, L, 'MABEL', 1.65);
      sp(s, 'jimmy', dz.x, dz.z + 0.55, { view: 'q', dir: 1, expr: 'neutral', look: [0.5, 0.5], arms: [null, { h: [0.2, 1.0], hand: 'open' }], seed: 1 }, t, L, 'JIMMY', 1.3);
      return { scene: s.S, cam: s.C, tags: [T('~30 STATES NOW REQUIRE A MONEY CLASS', 640, 620, pop(t, ph(L, 'thirty')), GT), T('THE COURSE: 5 STEPS', 640, 100, pop(t, ph(L, 'five steps')), YT)] }; } },
  { id: 'S47', f(t, d, L) { const s = getSet('classroom'); hideCards(s, ['mabel']); const a = ph(L, 'two.'); s.chalk.userData.draw(t < a ? ['1. TRACK IT'] : ['1. TRACK IT', '2. GIVE EVERY DOLLAR A JOB', 'SPEND < EARN'], t < a ? 0 : 1);
      cl(s, k01(t, 0, d), [[0.6, 1.7, s.z0 + 4.2], [0, 1.65, s.z0]], [[-0.3, 1.65, s.z0 + 3.2], [0, 1.65, s.z0]]);
      sp(s, 'mabel', 2.0, s.z0 + 1.0, { view: 'q', dir: -1, expr: 'smile', look: [-0.6, 0.3], arms: [{ h: [-0.9, 0.9], hand: 'grab' }, null], seed: 4 }, t, null, null, 1.65);
      return { scene: s.S, cam: s.C, tags: [T('A BUDGET = A PLAN FOR EVERY DOLLAR', 640, 620, pop(t, ph(L, 'all a budget is')), YT), T('THE GAP = YOUR FUTURE', 640, 540, pop(t, ph(L, 'the gap')), GOLDT)] }; } },
  { id: 'S48', f(t, d, L) { const s = getSet('kitchen3'); hideCards(s, ['carla']); const x = KIT(s, { ej: true, nb: false }); const k = k01(t, 1.0, d - 1); x.ring.geometry.dispose(); x.ring.geometry = new THREE.TorusGeometry(0.2, 0.018, 8, 48, Math.max(0.01, TAU * k));
      x.ej.userData.coins.children.forEach((c, i) => c.visible = i / 14 < k);
      cl(s, k01(t, 0, d), [[0.3, 1.55, s.tz + 2.9], [-0.1, 1.05, s.tz - 0.2]], [[0.0, 1.4, s.tz + 2.4], [-0.1, 1.05, s.tz - 0.2]]);
      sp(s, 'carla', -0.6, s.tz - 0.6, { view: 'q', dir: 1, expr: 'happy', look: [0.6, 0.4], arms: [null, { h: [0.6, 0.4], hand: 'open' }], seed: 2 }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('3. BUILD A CUSHION', 640, 100, pop(t, ph(L, 'three.')), YT), T('START: $1,000', 320, 620, pop(t, ph(L, 'thousand dollars')), GT), T('GOAL: 3-6 MONTHS', 960, 620, pop(t, ph(L, 'three to six')), GT), T('MONTHS: ' + Math.max(1, Math.round(6 * k)), 640, 180, pop(t, 1.2), BT)] }; } },
  { id: 'S49', f(t, d, L) { const s = getSet('survey'); hideCards(s, ['mabel', 'jimmy']); s.old.visible = false; const m0 = lineAt(L, 'MABEL').t0;
      s.chart.userData.draw({ title: 'AVERAGE CARD APR (ACCOUNTS PAYING INTEREST)', jars: [{ pct: 22, label: 'CARD INTEREST: 22.36%', col: '#c2372d' }], foot: 'Federal Reserve G.19, Q3 2026' });
      const ch = once(s, 'chain5', s => { const g = group(); for (let i = 0; i < 10; i++) { const l = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.022, 8, 20), std(i % 2 ? 0xe0a33a : 0xd9533f, { roughness: 0.8 })); l.position.set(-0.75 + i * 0.15, 0, 0); l.rotation.y = i % 2 ? Math.PI / 2 : 0; g.add(l); } s.S.add(g); return g; });
      ch.position.set(0.15, 1.2, s.z0 + 2.6); ch.visible = false; const cut = Math.floor(k01(t, 1.0, m0) * 10); ch.children.forEach((l, i) => { l.visible = i >= cut; });
      if (t < m0 - 0.3) cl(s, k01(t, 0, m0), [[0, 1.8, s.z0 + 5.6], [0, 1.6, s.z0]], [[0.3, 1.6, s.z0 + 5.6], [0.2, 1.4, s.z0 + 1]]); else { const i = L.filter(l => l.who !== 'N' && l.t0 <= t + 0.1).length; const c = i % 2 ? [[-0.4, 1.5, s.z0 + 5.4], [-0.5, 1.2, s.z0 + 2.6]] : [[0.9, 1.5, s.z0 + 5.4], [0.6, 1.2, s.z0 + 2.6]]; cl(s, 0.5, c, c); }
      sp(s, 'jimmy', 0.75, s.z0 + 2.6, { view: 'q', dir: -1, expr: 'grit', look: [-0.6, 0.1], arms: [{ h: [-0.4, 0.4], hand: 'grab' }, null], seed: 1 }, t, L, 'JIMMY', 1.72);
      sp(s, 'mabel', -0.7, s.z0 + 2.6, { view: 'q', dir: 1, expr: t > lineAt(L, 'MABEL', 1).t0 ? 'surprised' : 'neutral', look: [0.5, 0.2], seed: 4 }, t, L, 'MABEL', 1.65);
      return { scene: s.S, cam: s.C, tags: [T('4. KILL EXPENSIVE DEBT', 640, 100, pop(t, ph(L, 'four.')), YT), T('PAYING IT OFF = A 22% RETURN', 640, 620, t < m0 ? pop(t, ph(L, 'best returns')) : 0, GT)] }; } },
  { id: 'S50', f(t, d, L) { const s = getSet('tub'); hideCards(s); s.tubA.position.x = -0.5; s.tubB.visible = false; s.tubA.userData.lab.userData.draw({ t: 'NET WORTH' }); const pl = ph(L, 'fix the drain'), op = ph(L, 'open the tap');
      const plugged = t > 1.0; s.plug.visible = plugged; s.plug.position.set(0.05, 0.3, s.z0 + 2.0); const lvl = 0.35 + 0.55 * k01(t, 1.5, d);
      s.tubA.userData.set(lvl, t > op ? 1.0 : 0.45, plugged ? 0 : 1.2, t); const tk = k01(t, ph(L, 'put the gap to work'), d); s.pipe.visible = s.tree.visible = tk > 0; s.tree.scale.setScalar(0.2 + 0.9 * E(tk)); s.pipe.position.set(0.7, 0.3, s.z0 + 2.0);
      cl(s, k01(t, 0, d), [[-0.4, 2.8, s.z0 + 5.0], [-0.2, 0.6, s.z0 + 2]], [[0.6, 2.3, s.z0 + 4.4], [0.4, 0.6, s.z0 + 2]]);
      return { scene: s.S, cam: s.C, tags: [T('5. GROW THE TAP', 640, 100, pop(t, ph(L, 'and five')), YT), T('RAISE → ≥ HALF TO SAVINGS', 340, 620, pop(t, ph(L, 'at least half')), GT), T('FIX THE DRAIN. THEN OPEN THE TAP.', 900, 620, pop(t, pl), GOLDT)] }; } },
  { id: 'S51', card: 'Your Wallet', sub: 'Four questions' },
  { id: 'S52', f(t, d, L) { const s = getSet('cork'); hideCards(s); const qs = [['1. HOW MANY WEEKS COULD YOU LAST?', ph(L, 'one.')], ['2. SPENT ON THINGS YOU FORGOT?', ph(L, 'two.')], ['3. YOUR WORST INTEREST RATE?', ph(L, 'three.')], ['4. WHERE DID YOUR LAST RAISE GO?', ph(L, 'and four')]];
      const P = once(s, 'q52', s => qs.map(([q], i) => s.pin([-0.7, 0.6, -0.6, 0.65][i], [2.05, 1.85, 1.2, 1.05][i], 1.25, 0.42, (x, w, h) => { x.fillStyle = ['#ffe14a', '#f6efe0', '#9fe0a0', '#ffb0a0'][i]; x.fillRect(0, 0, w, h); txt(x, q, w / 2, h / 2, h * 0.17); }, [0.04, -0.03, -0.05, 0.03][i])));
      P.forEach((p, i) => { const k = k01(t, qs[i][1] - 0.2, qs[i][1] + 0.3); p.visible = k > 0; p.scale.setScalar(Math.max(0.01, outBack(k))); });
      cl(s, k01(t, 0, d), [[0, 1.6, s.z0 + 3.6], [0, 1.55, s.z0]], [[0, 1.55, s.z0 + 2.9], [0, 1.55, s.z0]]);
      return { scene: s.S, cam: s.C, tags: [T('START WITH THE ONE THAT HURTS', 640, 640, pop(t, ph(L, 'head in the couch')), RT)] }; } },
  { id: 'S53', f(t, d, L) { const s = getSet('living3'); hideCards(s, ['jimmy']); APT(s, { tv: { t: 'NOT TODAY: $500', bg: '#123a20', col: '#9fe0a0' }, bags: false }); phoneScr(s, true);
      const i = L.filter(l => l.t0 <= t + 0.1).length; cl(s, k01(t, 0, d), [[0.7, 1.6, s.z0 + 4.8], [0.4, 1.25, s.z0 + 1.6]], [[0.5, 1.5, s.z0 + 4.1], [0.4, 1.25, s.z0 + 1.6]]);
      sp(s, 'jimmy', 0.4, s.z0 + 1.8, { view: 'front', expr: i >= 3 ? 'grin' : 'happy', look: [0, 0.3], arms: [PHN, i >= 3 ? { h: [0.7, 0.9], hand: 'fist' } : null], seed: 1 }, t, L, 'JIMMY', 1.72);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('PAYDAY: +$3,050', 320, 110, pop(t, 0.4), GT), T('→ NOT TODAY ACCOUNT: $500', 940, 110, pop(t, ph(L, 'five hundred')), GOLDT), T('CARLA (VIDEO CALL)', 1000, 620, pop(t, lineAt(L, 'CARLA').t0 - 0.2), BT)] }; } },
  { id: 'S54', f(t, d, L) { const s = getSet('ring'); hideCards(s); RING(s, t, { paper2: t > 2.0, dim: 0.9 }); s.paper.position.set(0.2, 0.62, 0.4); s.paper.rotation.set(-Math.PI / 2, 0, 0.25);
      const sl = k01(t, 1.6, 2.6); s.paper2.position.set(lerp(-1.2, 0.35, E(sl)), 0.625, 0.5);
      cl(s, k01(t, 0, d), [[0.2, 2.0, 1.8], [0.25, 0.62, 0.45]], [[0, 4.0, 6.2], [0, 0.8, 0]]);
      return { scene: s.S, cam: s.C, tags: [T("IT'S NOT WHAT COMES IN.", 640, 100, pop(t, ph(L, "it's not what comes in")), YT), T("IT'S WHAT STAYS.", 640, 620, pop(t, ph(L, "it's what stays")), GOLDT)] }; } },
  { id: 'S55', noBlurOut: true, f(t, d, L) { const s = getSet('ring'); hideCards(s); RING(s, t, { dim: lerp(0.9, 0.6, k01(t, 0, d)) });
      cl(s, k01(t, 0, d), [[0, 4.0, 6.2], [0, 0.8, 0]], [[0.4, 4.6, 7.4], [0, 0.8, 0]]);
      const end = d - 5.2; return { scene: s.S, cam: s.C, vig: 0.85, tags: [T("I'M STROMI", 640, 100, t < end ? pop(t, 0.3) : 0, GOLDT), T('WHICH STEP ARE YOU STARTING WITH?', 640, 620, t < end ? pop(t, ph(L, 'tell me')) : 0, YT)] }; } },
];
