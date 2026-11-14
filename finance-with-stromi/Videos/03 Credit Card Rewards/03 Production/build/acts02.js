/* The Frozen Market: shot functions. Each f(t, d, L) returns {scene, cam, tags, post, vig}. */
'use strict';
const sp = (s, key, x, z, o, t, L, who, h) => { const c = card(s, key, h || 1.7); c.set(x, z, pose(o, t, L, who), s.C); return c; };
const walkTo = (s, key, x0, x1, z, t, t0, t1, o, L, who, h) => { const k = k01(t, t0, t1); const x = lerp(x0, x1, E(k)); const c = card(s, key, h || 1.7); const moving = t > t0 && t < t1; c.set(x, z, moving ? slidePose(t, Math.sign(x1 - x0), Math.abs(x1 - x0) / (t1 - t0), h || 1.7) : pose(o, t, L, who), s.C); return x; };
const lineAt = (L, who, n) => L.filter(l => l.who === who)[n || 0];
const T = (txt, x, y, s, o) => Object.assign({ txt, x, y, s, r: -0.03 }, o || {});

const DINER = (s, t) => { s.S.userData.clock && s.S.userData.clock.userData.set(11, 40 + t * 0.2); };
const ACTS = {};
ACTS[0] = [
  { id: 'S01', noBlurIn: true, f(t, d) { const s = getSet('diner'); hideCards(s, ['waiter']); DINER(s, t); s.menu.userData.draw(['MENU', 'HOUSE', '$417,500'], 2);
      const k = E(k01(t, 0, d)); camLerp(s, k, [-3.2, 1.6, s.z0 + 6.6], [0.2, 1.55, s.z0 + 4.4], [-1, 1.2, s.z0 + 2], [0.4, 1.6, s.z0 + 1.2]);
      sp(s, 'waiter', 1.6, s.z0 + 0.75, { view: 'q', dir: -1, expr: 'neutral', look: [-0.6, 0.4], arms: [{ h: [0.5, 0.5], hand: 'fist' }, { h: [0.55, 0.45], hand: 'open' }] }, t, null, null, 2.25);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S02', f(t, d, L) { const s = getSet('diner'); DINER(s, t + 20); const ln = lineAt(L, 'MARCUS'); const chalkT = lineAt(L, 'WAITER') ? lineAt(L, 'WAITER').t0 : d;
      s.menu.userData.draw(['MENU', 'HOUSE', t > 2.2 ? '$419,900 ↑' : '$417,500'], 2);
      CAM(s, [lerp(0.6, 0.3, k01(t, 0, d)), 1.5, s.z0 + 4.6], [0.3, 1.2, s.z0 + 1.2]);
      walkTo(s, 'marcus', -3.2, -0.7, s.z0 + 2.2, t, 0.2, 2.6, { view: 'q', dir: 1, expr: t > (ln ? ln.t0 : 99) ? 'surprised' : 'neutral', look: [0.6, 0.6] }, L, 'MARCUS', 1.75);
      sp(s, 'waiter', 1.4, s.z0 + 0.75, { view: 'q', dir: -1, expr: 'smirk', look: t > chalkT ? [-0.8, 0.3] : [0, 1] }, t, L, 'WAITER', 2.25);
      return { scene: s.S, cam: s.C, tags: [T('STILL GOING UP', 860, 110, t > 2.2 ? pop(t, 2.4) : 0, { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S03', f(t, d) { const s = getSet('study'); const k = E(k01(t, 0, d));
      if (t < d * 0.45) camLerp(s, k01(t, 0, d * 0.45), [-0.6, 1.5, s.z0 + 2.0], [-0.3, 1.15, s.z0 + 1.6], [-0.25, 0.8, s.z0 + 1.25], [-0.25, 0.8, s.z0 + 1.25]);
      else camLerp(s, k01(t, d * 0.45, d), [0.9, 1.4, s.z0 + 2.2], [0.6, 1.2, s.z0 + 1.8], [0.5, 0.8, s.z0 + 1.25], [0.5, 0.8, s.z0 + 1.25]);
      return { scene: s.S, cam: s.C, tags: [T('2008 AGAIN?', 640, 100, t < d * 0.45 ? pop(t, 3.5) : 0, { size: 50, bg: '#c2372d', col: '#fff' }), T('THE DATA', 640, 620, t > d * 0.45 ? pop(t, d * 0.45 + 0.3) : 0)] }; } },
  { id: 'S04', f(t, d) { const s = getSet('street'); const k = E(k01(t, 0, d)); camLerp(s, k, [0, 2.0, 9], [0, 2.6, 14], [0, 1.6, -3], [0, 2.2, -3]);
      [s.linda, s.dan].forEach((h, i) => { const on = t > 0.8 + i * 0.8; h.userData.porch.intensity = on ? 3 : 0; h.userData.wins.forEach(w => w.material.color.set(on ? 0xffd58a : 0x1d2630)); });
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('LINDA', 380, 560, pop(t, 0.9)), T('DANIELLE', 640, 560, pop(t, 1.7)), T('MARCUS', 905, 560, pop(t, 2.5))] }; } },
  { id: 'S05', card: 'Three People, One Market' },
  { id: 'S06', f(t, d, L) { const s = getSet('street'); hideCards(s, ['linda']); const k = E(k01(t, 0, d)); s.linda.userData.porch.intensity = 3;
      camLerp(s, k, [-6, 4.5, 5.5], [-6.6, 1.5, 3.2], [-6, 1.5, -2], [-6, 1.1, -1]);
      sp(s, 'linda', -6.3, -0.9, { view: 'front', expr: t > d - 2.5 ? 'sad' : 'smile', look: [0.3, 0.2], seed: 2 }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('LINDA, 64', 330, 110, pop(t, 6.5)), T('2.9% · 2021', 950, 110, pop(t, 8.5), { bg: '#e3c77a' }), T('NOT MOVING', 640, 620, pop(t, d - 2.3), { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S07', f(t, d) { const s = getSet('street'); hideCards(s, ['danielle']); s.dan.userData.porch.intensity = 3; const k = E(k01(t, 0, d));
      camLerp(s, k, [1.6, 0.6, 4.2], [0.8, 1.1, 2.6], [0, 1.6, -1.5], [0, 1.2, -1.5]);
      sp(s, 'danielle', 0.2, -1.0, { view: 'q', dir: 1, expr: t > d - 3 ? 'sad' : 'neutral', look: [0.4, 0.3], seed: 4 }, t, null, null, 1.68);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('DANIELLE, 34 · NURSE', 340, 110, pop(t, 0.6)), T('AUSTIN · 2023 · FHA LOAN', 920, 110, pop(t, 4.5), { bg: '#e3c77a' })] }; } },
  { id: 'S08', f(t, d) { const s = getSet('apartment'); const k = E(k01(t, 0, d)); const half = d * 0.55;
      if (t < half) camLerp(s, k01(t, 0, half), [-2.8, 1.8, s.z0 + 2.4], [0.2, 1.7, s.z0 + 2.6], [-2.8, 1.6, s.z0], [0.2, 1.4, s.z0]); else camLerp(s, E(k01(t, half, d)), [0.2, 1.5, s.z0 + 4.6], [0.6, 1.4, s.z0 + 3.9], [0.8, 1.0, s.z0 + 0.4], [0.9, 1.0, s.z0 + 0.5]);
      if (t >= half) sp(s, 'marcus', 0.35, s.z0 + 0.95, { view: 'q', dir: 1, expr: 'sad', look: [0.7, 0.2], seed: 3 }, t, null, null, 1.75); else hideCards(s);
      s.jar.userData.coins.children.forEach((c, i) => c.visible = i < 6 + Math.floor(t / d * 8));
      return { scene: s.S, cam: s.C, tags: [T('MARCUS, 38 · RENTING', 330, 110, pop(t, 0.6)), T('6 YEARS SAVING', 960, 110, pop(t, 4.2), { bg: '#e3c77a' }), T('ONE MARKET · THREE PROBLEMS', 640, 620, t > half ? pop(t, half + 2) : 0, { size: 36 })] }; } },
];
ACTS[1] = [
  { id: 'S09', card: 'The Rule That Broke' },
  { id: 'S10', f(t, d, L) { const s = getSet('market'); const w0 = lineAt(L, 'WENDELL'); const sk = w0 ? w0.t0 : d; const prices = ['$1.00', '90¢', '80¢', '70¢']; const pi = t < sk ? 0 : Math.min(3, Math.floor((t - sk) / Math.max(0.6, (w0.t1 - w0.t0) / 4)));
      s.setPrice(prices[pi]); if (t < sk) camLerp(s, E(k01(t, 0, sk)), [0, 2.6, 6.5], [0, 1.9, 5.0], [0, 1.0, 0], [0, 1.2, 0]); else CAM(s, [0.2, 1.6, 4.2], [0, 1.15, 0.5]);
      sp(s, 'wendell', -0.9, 1.0, { view: 'q', dir: 1, expr: t > sk + 1 ? 'scared' : 'happy', look: [0.7, 0.2], seed: 1 }, t, L, 'WENDELL', 1.8);
      walkTo(s, 'dot', 4, 1.3, 1.2, t, sk - 2.4, sk - 0.2, { view: 'q', dir: -1, expr: 'neutral', look: [-0.6, 0.2] }, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('SUPPLY & DEMAND', 640, 100, t < sk ? pop(t, 1.5) : 0, { size: 46 })] }; } },
  { id: 'S11', f(t, d) { const s = getSet('maptable'); const n = Math.floor(41 * k01(t, 3, 9)); s.flags.forEach((f, i) => { const k = outBack(k01(t, 3 + i * 0.146, 3.4 + i * 0.146)); f.scale.setScalar(Math.max(0.001, k)); f.visible = i < n + 1; }); Object.values(s.arrows).forEach(a => a.visible = false);
      const k = E(k01(t, 0, d)); camLerp(s, k, [0, 3.6, 1.6], [0.6, 2.5, 1.4], [0, 0, 0], [0.6, 0, 0.1]);
      return { scene: s.S, cam: s.C, tags: [T('41 OF 50 BIGGEST METROS: BUYER\'S MARKETS', 640, 90, pop(t, 6), { size: 36, bg: '#e3c77a' })] }; } },
  { id: 'S12', f(t, d) { const s = getSet('cork'); if (!s.quote) { s.quote = s.pin(0, 1.6, 1.5, 0.75, (x, w, h) => { x.fillStyle = '#f6efe0'; x.fillRect(0, 0, w, h); x.font = `${h * 0.12}px "IBM Plex Mono", monospace`; x.fillStyle = '#1e1612'; x.textAlign = 'center'; ['"A buyer\'s market', 'born out of caution,', 'not strength."'].forEach((l, i) => x.fillText(l, w / 2, h * (0.25 + i * 0.17))); txt(x, 'Asad Khan, Senior Economist, Redfin', w / 2, h * 0.85, h * 0.08, '#8a2f3c'); }, -0.02); }
      s.pins.forEach(p => p.visible = p === s.quote); s.quote.userData.pin.visible = true; const k = E(k01(t, 0, d)); camLerp(s, k, [0.4, 1.7, s.z0 + 2.6], [0, 1.62, s.z0 + 1.7], [0, 1.6, s.z0], [0, 1.6, s.z0]);
      return { scene: s.S, cam: s.C, tags: [T('BUYERS WALKED AWAY', 640, 640, pop(t, d - 4.5), { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S13', f(t, d) { const s = getSet('cork'); if (!s.chain) { const it = [['OIL ↑', -1.1, 2.1, '#e3c77a'], ['INFLATION FEARS', -0.3, 1.25, '#efe4cf'], ['BOND YIELDS ↑', 0.45, 2.05, '#efe4cf'], ['MORTGAGE 7%+', 1.15, 1.2, '#c2372d']]; s.chain = it.map(([l, x, y, c]) => s.pin(x, y, 0.95, 0.3, (cx, w, h) => { cx.fillStyle = c; cx.fillRect(0, 0, w, h); txt(cx, l, w / 2, h / 2, h * 0.3, c === '#c2372d' ? '#fff' : '#1e1612'); }, (Math.random() - 0.5) * 0.1));
        const pts = it.map(([, x, y]) => V3(x, y, s.z0 + 0.09)); s.str = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.01), 60, 0.007, 6), basic(0xc2372d)); s.S.add(s.str); }
      s.pins.forEach(p => { p.visible = s.chain.includes(p); p.userData.pin.visible = p.visible; }); s.str.visible = true;
      const kk = E(k01(t, 0, d)); CAM(s, [lerp(-0.6, 0.6, kk), 1.62, s.z0 + 3.5], [lerp(-0.45, 0.45, kk), 1.62, s.z0]);
      return { scene: s.S, cam: s.C, tags: [T('~7.2% TODAY', 1050, 620, t > d - 4 ? pop(t, d - 3.6) : 0, { bg: '#e3c77a' })] }; } },
  { id: 'S14', f(t, d) { const s = getSet('diner'); hideCards(s, ['waiter']); DINER(s, t + 60); const n = Math.min(39, Math.floor(k01(t, 4, 9) * 39)); s.menu.userData.draw(['HOUSE  $417,500', 'UP ' + n + ' MONTHS IN A ROW', '||||| '.repeat(Math.ceil(n / 5)).slice(0, Math.ceil(n * 1.2))], 0);
      const k = E(k01(t, 0, d)); camLerp(s, k, [0.4, 2.1, s.z0 + 2.4], [0.2, 1.6, s.z0 + 5.6], [0.4, 2.15, s.z0], [0.2, 1.4, s.z0 + 1]);
      sp(s, 'waiter', 1.6, s.z0 + 0.75, { view: 'q', dir: -1, expr: 'smirk', seed: 5 }, t, null, null, 2.25);
      return { scene: s.S, cam: s.C, tags: [T('SO WHY ISN\'T THE RULE WORKING?', 640, 640, pop(t, d - 9), { size: 36 })] }; } },
  { id: 'S15', card: 'Golden Handcuffs' },
  { id: 'S16', f(t, d) { const s = getSet('kitchen'); if (s.cuff) s.cuff.visible = false; hideCards(s, ['linda']); s.flyer.visible = false; const half = d * 0.45;
      if (t < half) camLerp(s, E(k01(t, 0, half)), [2.4, 1.7, s.z0 + 4.6], [1.6, 1.6, s.z0 + 3.8], [0, 1.1, s.z0 + 1.5], [0.2, 1.0, s.z0 + 1.8]); else camLerp(s, E(k01(t, half, d)), [0.3, 1.5, s.z0 + 2.5], [0.35, 1.2, s.z0 + 2.25], [0.25, 0.78, s.z0 + 1.9], [0.3, 0.78, s.z0 + 1.85]);
      sp(s, 'linda', -0.6, s.z0 + 2.2, { view: 'q', dir: 1, expr: t > half ? 'neutral' : 'smile', look: [0.7, 0.6], seed: 2 }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('FIXED FOR 30 YEARS', 330, 110, t < half ? pop(t, 6) : 0, { bg: '#e3c77a' }), T('+$1,029 A MONTH', 640, 620, t > d - 4 ? pop(t, d - 3.8) : 0, { bg: '#c2372d', col: '#fff', size: 46 })] }; } },
  { id: 'S17', f(t, d, L) { const s = getSet('kitchen'); if (s.cuff) s.cuff.visible = false; const last = lineAt(L, 'LINDA', 1); const hide = last && t > last.t1 - 0.3; s.flyer.visible = true;
      if (hide) { const kk = E(k01(t, last.t1 - 0.3, last.t1 + 0.6)); s.flyer.position.set(lerp(-0.5, 0.05, kk), lerp(1.2, 0.8, kk), s.z0 + lerp(1.9, 2.2, kk)); s.flyer.rotation.x = -Math.PI / 2 * kk; } else { s.flyer.position.set(-0.5, 1.2, s.z0 + 1.9); s.flyer.rotation.x = 0; }
      CAM(s, [0.3, 1.55, s.z0 + 4.4], [0.1, 1.05, s.z0 + 1.9]);
      sp(s, 'gus', -0.9, s.z0 + 2.0, { view: 'q', dir: 1, expr: lineAt(L, 'GUS', 1) && t > lineAt(L, 'GUS', 1).t0 ? 'surprised' : 'happy', look: [0.7, 0.2], seed: 1, arms: [{ h: [0.55, 0.15], hand: 'open' }] }, t, L, 'GUS', 1.75);
      sp(s, 'linda', 1.2, s.z0 + 2.1, { view: 'q', dir: -1, expr: 'smirk', look: [-0.7, 0.2], seed: 2 }, t, L, 'LINDA', 1.6);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S18', f(t, d) { const s = getSet('kitchen'); hideCards(s, ['linda']); s.flyer.visible = false;
      if (!s.cuff) { const gold = std(0xe0b84a, { metalness: 0.95, roughness: 0.2 }); s.cuff = group(); const ring = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.014, 10, 32), gold); s.cuff.add(ring); const cc = new THREE.CatmullRomCurve3([V3(0.075, -0.02, 0.02), V3(0.12, -0.3, 0.06), V3(0.2, -0.585, 0.05), V3(0.42, -0.59, -0.15), V3(0.58, -0.56, -0.42)], false, 'centripetal'); const NL = 26; for (let i = 0; i < NL; i++) { const u = i / (NL - 1); const l = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 16), gold); l.position.copy(cc.getPointAt(u)); l.lookAt(l.position.clone().add(cc.getTangentAt(u))); l.rotateY(Math.PI / 2); if (i % 2) l.rotateX(Math.PI / 2); s.cuff.add(l); } s.S.add(shadowy(s.cuff)); }
      s.cuff.visible = true; s.cuff.position.set(-0.3, 0.62, s.z0 + 2.35); const half = d * 0.4;
      if (t < half) camLerp(s, E(k01(t, 0, half)), [0.2, 1.0, s.z0 + 3.3], [0.8, 1.2, s.z0 + 3.7], [-0.2, 0.65, s.z0 + 2.3], [0.4, 0.8, s.z0 + 2.4]); else camLerp(s, E(k01(t, half, d)), [2.6, 1.9, s.z0 + 5.4], [1.4, 1.7, s.z0 + 4.6], [0, 1.0, s.z0 + 1.5], [0, 1.0, s.z0 + 1.6]);
      sp(s, 'linda', -0.6, s.z0 + 2.2, { view: 'q', dir: 1, expr: 'sad', look: [0.2, -0.3], seed: 2 }, t, null, null, 1.6);
      return { scene: s.S, cam: s.C, tags: [T('GOLDEN HANDCUFFS', 640, 100, t < half ? pop(t, 3.5) : 0, { size: 50, bg: '#e3c77a' }), T('4 IN 10 OWN OUTRIGHT', 330, 620, t > half ? pop(t, half + 4) : 0)] }; } },
  { id: 'S19', f(t, d) { const s = getSet('street'); hideCards(s); s.linda.userData.porch.intensity = 3; const k = E(k01(t, 0, d)); camLerp(s, k, [-6, 1.8, 9], [-6, 2.0, 6.5], [-6, 1.6, -3], [-6, 1.8, -3]);
      return { scene: s.S, cam: s.C, vig: 0.7, tags: [T('A HOUSE NEVER LISTED CAN\'T SELL FOR LESS', 640, 100, pop(t, 3), { size: 34 }), T('3% MORTGAGE: WOULD YOU MOVE?', 640, 590, t > d * 0.45 ? pop(t, d * 0.45) : 0, { size: 42, bg: '#e3c77a' }), T('TELL ME IN THE COMMENTS', 640, 660, t > d * 0.6 ? pop(t, d * 0.6) : 0, { bg: '#c2372d', col: '#fff', size: 30 })] }; } },
];
ACTS[2] = [
  { id: 'S20', card: 'The Baker Who Can\'t Wait' },
  { id: 'S21', f(t, d, L) { const s = getSet('bakery'); const g1 = lineAt(L, 'GUS', 1); s.clock.userData.set(8, 40 + t * 1.2); s.sticker.visible = g1 && t > g1.t1 - 0.2; s.sticker.position.set(0.2, 1.06, s.z0 + 1.71);
      const sk = lineAt(L, 'GUS') ? lineAt(L, 'GUS').t0 - 0.4 : d; if (t < sk) camLerp(s, E(k01(t, 0, sk)), [0, 1.9, s.z0 + 5.6], [0.2, 1.7, s.z0 + 5.0], [0, 1.4, s.z0], [0, 1.3, s.z0 + 0.5]); else CAM(s, [0.4, 1.6, s.z0 + 5.4], [0.4, 1.15, s.z0 + 1.4]);
      sp(s, 'gus', -0.9, s.z0 + 2.1, { view: 'q', dir: 1, expr: g1 && t > g1.t0 ? 'sad' : 'happy', look: [0.6, 0.2], seed: 1 }, t, L, 'GUS', 1.75);
      walkTo(s, 'dot', 3.6, 1.2, s.z0 + 2.3, t, sk - 3.2, sk - 0.4, { view: 'q', dir: -1, expr: 'neutral', look: [-0.7, 0.3], seed: 3 }, L, 'DOT', 1.55);
      return { scene: s.S, cam: s.C, tags: [T('A HOUSE = INVENTORY', 640, 100, t < sk ? pop(t, 4) : 0, { size: 46 })] }; } },
  { id: 'S22', f(t, d) { const s = getSet('subdiv'); const k = E(k01(t, 0, d)); camLerp(s, k, [0, 7, 8], [0, 3.2, -10], [0, 0, -8], [0, 1.4, -30]);
      s.flags.forEach((f, i) => f.rotation.z = Math.sin(t * 2 + i) * 0.03);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('MOST UNSOLD NEW HOMES SINCE 2009', 640, 100, pop(t, 7), { size: 38, bg: '#e3c77a' }), T('RATE BUYDOWN', 640, 620, t > d * 0.6 ? pop(t, d * 0.62) : 0, { size: 46, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S23', f(t, d) { const s = getSet('lender'); const hit = d * 0.55; s.setTag('$450,000'); const k = E(k01(t, 0, d));
      const ep = k01(t, 1.5, 4.5); s.env.position.set(lerp(1.2, 0.05, E(ep)), 0.81, s.z0 + lerp(1.9, 1.7, E(ep)));
      const sk = k01(t, hit - 0.5, hit); s.stamp.position.set(0.75 - 0.3 * sk, 0.81 + (sk > 0 && sk < 1 ? Math.sin(sk * Math.PI) * 0.25 : 0), s.z0 + lerp(1.55, 1.68, sk));
      camLerp(s, k, [-0.9, 1.5, s.z0 + 3.1], [0.4, 1.4, s.z0 + 2.9], [-0.3, 1.0, s.z0 + 1.6], [0.1, 0.9, s.z0 + 1.65]);
      return { scene: s.S, cam: s.C, tags: [T('PRICE TAG: SAME', 330, 110, pop(t, 0.6)), T('REAL PRICE: ~$420K', 950, 110, t > hit ? pop(t, hit) : 0, { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S24', f(t, d, L) { const s = getSet('carlot'); s.board.visible = false; const w0 = lineAt(L, 'WENDELL'); const sk = w0 ? w0.t0 - 0.4 : d; const n2 = L.filter(l => l.who === 'N')[1]; const after = n2 ? n2.t0 - 0.3 : d;
      s.bunt.children.forEach((f, i) => f.rotation.z = Math.sin(t * 3 + i) * 0.2);
      if (t < sk) camLerp(s, E(k01(t, 0, sk)), [-6, 2.4, 8], [0.3, 1.8, 7], [-1, 0.8, 0], [0.3, 0.9, 0]); else if (t < after) CAM(s, [0.3, 1.6, 6.2], [0.3, 1.0, 0.5]); else camLerp(s, E(k01(t, after, d)), [0.3, 1.6, 6.2], [0.3, 3.0, 9.5], [0.3, 1.0, 0.5], [0.3, 0.9, 0]);
      { sp(s, 'wendell', 0.2, 1.8, { view: 'front', expr: 'sly', look: [0, 0.3], seed: 2, arms: [{ h: [-0.8, 0.5], hand: 'point' }, { h: [0.8, 0.5], hand: 'point' }] }, t, L, 'WENDELL', 1.8); walkTo(s, 'pip', 5.5, 1.6, 2.6, t, sk - 3.5, sk - 0.4, { view: 'q', dir: -1, expr: 'surprised', look: [-0.8, 0.4], seed: 4 }, L, 'PIP', 1.5); }
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S25', card: 'The Price Tag Trick' },
  { id: 'S26', f(t, d, L) { const s = getSet('carlot'); s.board.visible = true; s.tn.visible = s.to.visible = false; const p0 = lineAt(L, 'PIP'); const sk = p0 ? p0.t0 - 0.3 : 0; const n2 = L.filter(l => l.who === 'N')[1]; const after = n2 ? n2.t0 : d;
      s.board.userData.draw(t < sk + 1.5 ? ['MARCH: 10 SEDANS + 1 SUV', 'AVG PRICE: $28,000'] : ['MARCH: 10 SEDANS + 1 SUV', 'APRIL: 0 SEDANS + 2 SUVs', 'AVG PRICE: $61,000 ↑'], t < sk + 1.5 ? 1 : 2);
      if (t < sk) camLerp(s, E(k01(t, 0, sk)), [0, 2.0, -2], [0, 1.7, -3.2], [0, 1.6, -6.5], [0, 1.6, -6.5]); else if (t < after) CAM(s, [0, 1.5, -1.2], [0, 1.25, -6.5]); else camLerp(s, E(k01(t, after, d)), [0, 1.6, -2.4], [3, 2.4, 3], [0, 1.4, -6.5], [0, 1, -3]);
      { walkTo(s, 'pip', -4.5, -1.0, -5.4, t, sk - 3, sk - 0.3, { view: 'q', dir: 1, expr: lineAt(L, 'PIP', 1) && t > lineAt(L, 'PIP', 1).t0 ? 'sad' : 'happy', look: [0.6, 0.2], seed: 3 }, L, 'PIP', 1.5); walkTo(s, 'mabel', 4.5, 1.1, -5.3, t, sk - 2.8, sk - 0.2, { view: 'q', dir: -1, expr: 'smirk', look: [-0.7, 0.3], seed: 4 }, L, 'MABEL', 1.55); }
      return { scene: s.S, cam: s.C, tags: [T('WE ONLY MEASURE WHAT SELLS', 640, 100, t < sk ? pop(t, 3) : 0, { size: 40 }), T('25%+ PAID ALL CASH', 640, 620, t > after ? pop(t, d - 5) : 0, { bg: '#e3c77a' })] }; } },
  { id: 'S27', f(t, d) { const s = getSet('maptable'); s.flags.forEach(f => f.visible = false); const order = ['AUSTIN', 'FLORIDA', 'CHICAGO', 'NEW YORK', 'SEATTLE', 'SF']; const at0 = [d * 0.32, d * 0.36, d * 0.55, d * 0.66, d * 0.76, d * 0.8];
      order.forEach((n, i) => { const a = s.arrows[n]; const k = outBack(k01(t, at0[i], at0[i] + 0.5)); a.visible = k > 0.01; a.scale.setScalar(Math.max(0.001, k) * 1.4); });
      const k = E(k01(t, 0, d)); const r = lerp(-0.3, 0.3, k); CAM(s, [Math.sin(r) * 3, 3.2, Math.cos(r) * 2.2], [0, 0, 0.1]);
      const lab = (n, txt, col) => { const p = proj(s.C, V3(s.arrows[n].position.x, 0.45, s.arrows[n].position.z)); return T(txt, p[0], p[1] - 30, s.arrows[n].visible ? pop(t, at0[order.indexOf(n)] + 0.2) * 0.7 : 0, { bg: col, col: '#fff', size: 32 }); };
      return { scene: s.S, cam: s.C, tags: [lab('AUSTIN', 'AUSTIN ↓', '#c2372d'), lab('FLORIDA', 'FLORIDA ↓', '#c2372d'), lab('CHICAGO', 'CHICAGO +6.7%', '#3f8a4a'), lab('NEW YORK', 'NEW YORK +6.2%', '#3f8a4a'), lab('SEATTLE', 'SEATTLE -2%', '#c2372d'), T('HUNDREDS OF LITTLE MARKETS', 640, 640, pop(t, 2), { size: 34 })] }; } },
  { id: 'S28', f(t, d) { const s = getSet('road'); const k = E(k01(t, 0, d)); const z = lerp(10, -22, k); s.C.position.set(-1.2, 1.2, z); s.C.lookAt(-1.2, 1.4 + (t < d * 0.3 ? 0.35 : 0), z - 20); const mir = t < d * 0.3; s.mirror.scale.setScalar(mir ? 1.8 : 1); s.mirror.position.set(mir ? 0 : 0, mir ? 0.15 : 0.42, -1.1);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [T('REAR-VIEW: SOLD PRICES', 640, 560, mir ? pop(t, 1) : 0, { size: 36 }), T('WINDSHIELD: ASKING PRICES', 640, 640, !mir ? pop(t, d * 0.3 + 0.3) : 0, { size: 36, bg: '#e3c77a' }), T('12 MONTHS DOWN IN A ROW', 330, 110, t > d * 0.6 ? pop(t, d * 0.6) : 0, { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S29', f(t, d) { const s = getSet('diner'); hideCards(s, ['waiter']); DINER(s, t + 90); const hit = 7.5; s.menu.userData.draw(t < hit ? ['REDFIN SALE PRICE', 'OCT 2025: $389,900', 'OCT 2026: ?'] : ['REDFIN SALE PRICE', 'OCT 2025: $389,900', 'OCT 2026: $389,601'], 2);
      const shake = t > hit && t < hit + 0.35 ? Math.sin(t * 90) * 0.02 : 0; const k = E(k01(t, 0, d)); camLerp(s, k, [0.4, 2.1, s.z0 + 3.4], [0.4, 2.15, s.z0 + 2.2], [0.4 + shake, 2.15, s.z0], [0.4 + shake, 2.15, s.z0]);
      return { scene: s.S, cam: s.C, post: X => { if (t > hit) { const kk = outBack(k01(t, hit, hit + 0.25)); X.save(); X.translate(640, 580); X.rotate(-0.08); X.scale((2.4 - 1.4 * kk) * 0.8, (2.4 - 1.4 * kk) * 0.8); X.globalAlpha = Math.min(1, kk * 1.5); X.strokeStyle = '#c2372d'; X.lineWidth = 9; X.strokeRect(-330, -58, 660, 116); X.font = `78px ${HAND}`; X.fillStyle = '#c2372d'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('FIRST DROP IN 3 YEARS', 0, 4); X.restore(); } },
        tags: [T('SEATTLE · SAN JOSE · AUSTIN: -4 TO -5%', 640, 684, t > d * 0.6 ? pop(t, d * 0.6) : 0, { size: 32 })] }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('backyard'); const g0 = lineAt(L, 'GUS'); const sk = g0 ? g0.t0 - 0.4 : d; const ns = L.filter(l => l.who === 'N'); const after = ns[1] ? ns[1].t0 : d;
      s.coals.material.color.setHSL(0.05, 1, 0.5 + 0.08 * Math.sin(t * 7)); const burnt = t > after - 1.5; s.burger.material.color.set(burnt ? 0x1a0d08 : 0x5a2a14);
      if (t < sk) camLerp(s, E(k01(t, 0, sk)), [0, 3.5, 7], [0.5, 2.2, 5], [0, 1.4, -3], [0.4, 1.0, 0]); else if (t < after) CAM(s, [0.6, 1.6, 4.6], [0.5, 1.0, 0]); else camLerp(s, E(k01(t, after, d)), [1.5, 1.5, 1.6], [1.5, 1.15, 0.85], [1.5, 0.78, 0.4], [1.5, 0.78, 0.4]);
      { walkTo(s, 'gus', -5, -0.7, 0.6, t, sk - 3.5, sk - 0.4, { view: 'q', dir: 1, expr: lineAt(L, 'GUS', 1) && t > lineAt(L, 'GUS', 1).t0 ? 'surprised' : 'grin', look: [0.7, 0.2], seed: 1 }, L, 'GUS', 1.75); walkTo(s, 'mabel', 5.5, 1.4, 1.2, t, sk - 3.2, sk - 0.2, { view: 'q', dir: -1, expr: 'smirk', look: [-0.7, 0.3], seed: 2 }, L, 'MABEL', 1.55); }
      return { scene: s.S, cam: s.C, tags: [T('REAL PRICES: DOWN 15 MONTHS IN A ROW', 640, 100, t < sk ? pop(t, sk - 6) : 0, { size: 34, bg: '#e3c77a' })] }; } },
];
ACTS[3] = [
  { id: 'S31', card: 'Underwater' },
  { id: 'S32', f(t, d) { const s = getSet('living'); const lv = lerp(0.02, 1.15, E(k01(t, 1, d - 2))); s.water.position.y = lv; s.mug.position.set(0.25, Math.max(lv + 0.05, 1.25), s.z0 + 1.0);
      const k = E(k01(t, 0, d)); camLerp(s, k, [0, 1.5, s.z0 + 4.8], [0, 1.4, s.z0 + 3.6], [0, 1.0, s.z0 + 0.8], [0, 1.1, s.z0 + 0.9]);
      sp(s, 'danielle', 0, s.z0 + 1.62, { view: 'front', expr: 'sad', look: [0, 0.3], seed: 3, arms: [null, { h: [0.4, 0.5], hand: 'fist' }] }, t, null, null, 1.68);
      return { scene: s.S, cam: s.C, tags: [T('OWES MORE THAN IT\'S WORTH', 640, 100, pop(t, 5), { size: 40 }), T('BRING CASH JUST TO LEAVE', 640, 640, t > d * 0.6 ? pop(t, d * 0.62) : 0, { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S33', f(t, d, L) { const s = getSet('lender'); s.tagm.visible = false; s.house.visible = false; s.env.visible = false; if (!s.owe) { s.owe = poster(0.3, 0.4, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'CLOSING STATEMENT', w / 2, h * 0.1, h * 0.065); txt(x, 'YOU OWE', w / 2, h * 0.45, h * 0.1); txt(x, '$19,000', w / 2, h * 0.62, h * 0.15, '#c2372d'); }); s.S.add(s.owe); }
      const d0 = lineAt(L, 'DANIELLE'); s.owe.position.set(0.55, 1.15, s.z0 + 1.95); s.owe.visible = true;
      CAM(s, [0.1, 1.7, s.z0 + 5.9], [0.1, 1.3, s.z0 + 1.6]);
      sp(s, 'wendell', -0.9, s.z0 + 2.0, { view: 'q', dir: 1, expr: 'grin', look: [0.7, 0.2], seed: 2 }, t, L, 'WENDELL', 1.8);
      sp(s, 'danielle', 1.1, s.z0 + 2.15, { view: 'q', dir: -1, expr: d0 && t > d0.t0 ? 'surprised' : 'happy', look: [-0.6, 0.1], seed: 3 }, t, L, 'DANIELLE', 1.68);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S34', f(t, d) { const s = getSet('harbour'); s.boats.forEach((b, i) => { const sink = b.userData.sink; b.position.y = -0.04 - (i % 4 !== 3 ? sink * 0.12 * k01(t, 3, 10) : 0) + Math.sin(t * 1.2 + b.userData.ph) * 0.03; b.rotation.z = Math.sin(t + b.userData.ph) * 0.12; });
      const k = E(k01(t, 0, d)); camLerp(s, k, [-4, 4.5, 8], [3, 2.2, 5], [0, 0, -4], [0, 0.2, -5]);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('813,000 UNDERWATER (+44%)', 640, 100, pop(t, 4), { size: 42, bg: '#e3c77a' }), T('TEXAS + FLORIDA = 39%', 330, 620, pop(t, d * 0.32)), T('3 IN 4: FHA OR VA', 950, 620, pop(t, d * 0.4))] }; } },
  { id: 'S35', f(t, d) { const s = getSet('tabletop'); s.sc.visible = false; s.cake.visible = false; s.letter.visible = false; s.cl.intensity = 0; [s.gift, s.anvil, s.str, s.giftTag].forEach(o => o.visible = true);
      const half = d * 0.55; if (t < half) camLerp(s, E(k01(t, 0, half)), [-1.4, 1.5, s.z0 + 3.8], [-0.9, 1.3, s.z0 + 2.9], [-0.7, 1.0, s.z0 + 1.4], [-0.7, 1.0, s.z0 + 1.4]); else camLerp(s, E(k01(t, half, d)), [-0.5, 1.6, s.z0 + 3.6], [0.5, 1.5, s.z0 + 3.4], [-0.1, 0.9, s.z0 + 1.5], [0.3, 0.9, s.z0 + 1.5]);
      s.gift.rotation.y = Math.sin(t * 0.5) * 0.1;
      return { scene: s.S, cam: s.C, tags: [T('ZILLOW: 0% DOWN PAYMENT LOAN', 640, 100, t < half ? pop(t, 3) : 0, { size: 38 }), T('SELL / MOVE / REFI IN 5 YRS = REPAY ALL', 640, 640, t > half ? pop(t, half + 0.3) : 0, { size: 32, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S36', f(t, d) { const s = getSet('tabletop'); [s.gift, s.anvil, s.str, s.giftTag].forEach(o => o.visible = false); s.sc.visible = true; s.cake.visible = false; s.letter.visible = false;
      const tilt = t < d * 0.45 ? 0.18 * E(k01(t, 1, 3)) : 0.18 - 0.4 * E(k01(t, d * 0.45, d * 0.45 + 2)); s.beamS.rotation.z = tilt; s.beamS.children.slice(1).forEach(p => p.rotation.z = -tilt);
      const k = E(k01(t, 0, d)); camLerp(s, k, [-0.6, 1.45, s.z0 + 2.6], [0.6, 1.4, s.z0 + 2.6], [0.1, 1.2, s.z0 + 1.3], [0.1, 1.2, s.z0 + 1.3]);
      return { scene: s.S, cam: s.C, tags: [T('FOR: KNOCKS DOWN THE LUMP-SUM WALL', 330, 110, t < d * 0.45 ? pop(t, 2) : 0, { size: 28, bg: '#3f8a4a', col: '#fff' }), T('AGAINST: NO CUSHION AT ALL', 950, 110, t > d * 0.45 ? pop(t, d * 0.45 + 0.5) : 0, { size: 28, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S37', card: 'Is This 2008?' },
  { id: 'S38', f(t, d) { const s = getSet('bank'); s.confetti.forEach((p, i) => { const v = p.userData.v; const tt = (t * 0.5 + v[2]) % 3; p.position.y = 3 - tt; p.rotation.set(t * v[0] * 4, t * v[1] * 3, 0); });
      const k = E(k01(t, 0, d)); const half = d * 0.3; if (t < half) camLerp(s, E(k01(t, 0, half)), [0, 1.9, s.z0 + 6.6], [0, 1.85, s.z0 + 5.9], [0, 1.65, s.z0], [0, 1.65, s.z0]); else camLerp(s, E(k01(t, half, d)), [-2.3, 1.7, s.z0 + 4], [-2.3, 1.6, s.z0 + 3.4], [-2.3, 1.3, s.z0 + 1], [-2.3, 1.3, s.z0 + 1]);
      sp(s, 'wendell', -2.3, s.z0 + 0.6, { view: 'front', expr: 'grin', seed: 1, arms: [{ h: [-0.9, -0.6], hand: 'open' }, { h: [0.9, -0.6], hand: 'open' }] }, t, null, null, 1.8);
      sp(s, 'mabel', 1.8, s.z0 + 1.75, { view: 'front', expr: 'neutral', seed: 2, look: [-0.3, 0.6] }, t, null, null, 1.55);
      return { scene: s.S, cam: s.C, post: X => { X.save(); X.globalCompositeOperation = 'multiply'; X.fillStyle = 'rgba(200,160,110,0.35)'; X.fillRect(0, 0, t < half ? 640 : 1280, 720); X.restore(); },
        tags: [T('2006', 320, 90, pop(t, 0.5), { size: 56 }), T('TODAY', 960, 90, t < half ? pop(t, 1) : 0, { size: 56 }), T('MOSTLY, NO', 640, 640, t < half ? pop(t, 1.5) : 0, { size: 44, bg: '#3f8a4a', col: '#fff' })] }; } },
  { id: 'S39', f(t, d) { const s = getSet('vault'); const at0 = [d * 0.05, d * 0.2, d * 0.35]; s.locks.forEach((l, i) => { const kk = outBack(k01(t, at0[i], at0[i] + 0.6)); l.scale.setScalar(Math.max(0.001, kk)); }); s.wheel.rotation.z = t * 0.3;
      const ck = k01(t, d * 0.62, d * 0.72); s.crack.visible = ck > 0; s.crack.scale.x = Math.max(0.01, ck); s.tiny.visible = t > d * 0.7;
      const k = E(k01(t, 0, d)); if (t < d * 0.6) camLerp(s, E(k01(t, 0, d * 0.6)), [0, 1.6, s.z0 + 5], [0, 1.6, s.z0 + 3.6], [0, 1.6, s.z0], [0, 1.6, s.z0]); else camLerp(s, E(k01(t, d * 0.6, d)), [0.6, 1.4, s.z0 + 3.4], [2.5, 0.9, s.z0 + 2.4], [1.2, 0.8, s.z0], [2.8, 0.3, s.z0 + 0.5]);
      return { scene: s.S, cam: s.C, tags: [T('$18 TRILLION IN EQUITY', 640, 640, t > d * 0.35 && t < d * 0.6 ? pop(t, d * 0.37) : 0, { size: 42, bg: '#e3c77a' }), T('THE CRACK: NEWEST OWNERS', 640, 100, t > d * 0.68 ? pop(t, d * 0.7) : 0, { size: 38, bg: '#c2372d', col: '#fff' })] }; } },
];
ACTS[4] = [
  { id: 'S40', card: 'Musical Chairs' },
  { id: 'S41', f(t, d, L) { const s = getSet('hall'); hideCards(s, ['linda', 'marcus', 'gus', 'mabel']); const m0 = lineAt(L, 'MARCUS'); const sk = m0 ? m0.t0 - 2.5 : d;
      s.chairs.forEach((c, i) => c.visible = i % 2 === 0); const occ = [['linda', 1.6], ['gus', 1.75], ['mabel', 1.55]]; occ.forEach(([k, h], i) => { const a = (i * 2 + 1) / 6 * TAU; const c = card(s, k, h); const P = pose({ view: 'front', expr: 'smile', seed: i, look: [0, 0.4] }, t, L, k.toUpperCase()); c.set(Math.cos(a) * 1.6, s.z0 + 3.4 + Math.sin(a) * 1.2, P, s.C, 0); });
      const ang = t * 0.9; const mx = Math.cos(ang) * 2.7, mz = s.z0 + 3.4 + Math.sin(ang) * 2.0; const mc = card(s, 'marcus', 1.75); const moving = t > sk - 3; mc.set(moving ? mx : 0, moving ? mz : s.z0 + 5, moving ? slidePose(t, Math.sin(ang) > 0 ? -1 : 1, 1.8, 1.75) : pose({ view: 'q', expr: 'neutral' }, t), s.C);
      const k = E(k01(t, 0, d)); if (t < sk) camLerp(s, E(k01(t, 0, sk)), [0, 3.2, s.z0 + 9], [0, 2.4, s.z0 + 7.6], [0, 0.6, s.z0 + 3.4], [0, 0.8, s.z0 + 3.4]); else CAM(s, [lerp(1.5, -1.0, k01(t, sk, d)), 1.8, s.z0 + 7.2], [0, 0.9, s.z0 + 3.4]);
      return { scene: s.S, cam: s.C, tags: [T('NOT AN EXPLOSION. A FREEZE.', 640, 100, t > sk - 4 && t < sk + 1 ? pop(t, sk - 3.8) : 0, { size: 42 })] }; } },
  { id: 'S42', f(t, d) { const s = getSet('tabletop'); [s.gift, s.anvil, s.str, s.giftTag, s.sc, s.letter].forEach(o => o.visible = false); s.cake.visible = true; const n = Math.floor(40 * k01(t, 1, 7)); s.flames.forEach((f, i) => { f.visible = i < n; f.scale.y = 1.6 + 0.3 * Math.sin(t * 12 + i); }); s.cl.intensity = 2.5 * n / 40; s.key.intensity = lerp(50, 20, n / 40);
      const k = E(k01(t, 0, d)); camLerp(s, k, [0, 1.25, s.z0 + 2.2], [0.8, 1.8, s.z0 + 3.4], [0, 1.0, s.z0 + 1.4], [0, 0.9, s.z0 + 1.4]);
      return { scene: s.S, cam: s.C, tags: [T('FIRST-TIME BUYER: AGE 40', 330, 110, pop(t, 7), { bg: '#e3c77a' }), T('REPEAT BUYER: 62', 950, 110, pop(t, d * 0.5)), T('RECORD: 1 IN 10 PAID ALL CASH', 640, 640, pop(t, d * 0.72), { bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S43', f(t, d) { const s = getSet('club'); const k = E(k01(t, 0, d)); camLerp(s, k, [-3.5, 0.9, 6.5], [-0.8, 1.2, 5], [0, 1.6, -1], [0.6, 1.4, 0]);
      sp(s, 'gus', 1.5, 0.9, { view: 'q', dir: -1, expr: 'frown', look: [-0.8, 0.2], seed: 1, arms: [{ h: [0.4, 0.3], hand: 'fist' }, { h: [-0.3, 0.3], hand: 'fist' }] }, t, null, null, 1.8);
      sp(s, 'marcus', -1.7, 2.0, { view: 'q', dir: 1, expr: 'sad', look: [0.6, 0.3], seed: 2 }, t, null, null, 1.75); sp(s, 'danielle', -2.6, 2.6, { view: 'q', dir: 1, expr: 'neutral', look: [0.6, 0.3], seed: 3 }, t, null, null, 1.68);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('LA 15% · ORANGE 15% · SAN DIEGO 16%', 640, 100, pop(t, 7), { size: 29 }), T('CAN AFFORD A MEDIAN HOME', 640, 160, pop(t, 7.5), { size: 28, bg: '#e3c77a' })] }; } },
  { id: 'S44', f(t, d) { const s = getSet('tabletop'); [s.gift, s.anvil, s.str, s.giftTag, s.sc, s.cake].forEach(o => o.visible = false); s.cl.intensity = 0; s.key.intensity = 50; s.letter.visible = true; const stop = d * 0.55; s.clock.userData.set(4, t < stop ? t * 6 : stop * 6);
      const half = d * 0.4; if (t < half) camLerp(s, E(k01(t, 0, half)), [-0.3, 1.5, s.z0 + 2.2], [-0.3, 1.15, s.z0 + 1.8], [-0.3, 0.78, s.z0 + 1.45], [-0.3, 0.78, s.z0 + 1.4]); else camLerp(s, E(k01(t, half, d)), [0.5, 1.8, s.z0 + 1.9], [0.8, 1.9, s.z0 + 1.2], [0.9, 1.9, s.z0], [0.9, 1.9, s.z0]);
      return { scene: s.S, cam: s.C, tags: [T('NO RESET?', 640, 640, t > d * 0.55 ? pop(t, d * 0.56) : 0, { size: 52, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S45', card: 'What Thaws the Ice' },
  { id: 'S46', f(t, d) { const s = getSet('pond'); const at0 = [d * 0.12, d * 0.72]; s.cracks.forEach((c, i) => { const v = i < 2 && t > at0[i]; c.visible = v; c.scale.setScalar(v ? Math.max(0.01, k01(t, at0[i], at0[i] + 0.6)) : 0.01); c.userData.lab.visible = v; c.userData.lab.lookAt(s.C.position); });
      const k = E(k01(t, 0, d)); const a = lerp(-0.4, 0.4, k); CAM(s, [Math.sin(a) * 7, 6, Math.cos(a) * 7], [0, 0, 0]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [] }; } },
  { id: 'S47', f(t, d, L) { const s = getSet('hall'); const l0 = lineAt(L, 'LINDA'); const burst = l0 ? l0.t0 - 3.5 : d * 0.3; hideCards(s); s.chairs.forEach(c => c.visible = true);
      ['linda', 'danielle'].forEach((k, i) => { const c = card(s, k, k === 'linda' ? 1.6 : 1.68); c.set(-3.4 + i * 0.75, s.z0 + 1.6, pose({ view: 'q', dir: 1, expr: t > burst ? 'surprised' : 'neutral', look: [0.7, 0.2], seed: i }, t, L, k.toUpperCase()), s.C); });
      if (!s.crowd) s.crowd = ['marcus', 'pip', 'dot', 'wendell', 'mabel', 'gus'].map(k => castCard(s.S, k, k === 'pip' ? 1.5 : 1.7)); s.door.rotation.y = -Math.PI / 2 + (t > burst ? -1.3 * E(k01(t, burst, burst + 0.3)) : 0);
      s.crowd.forEach((c, i) => { if (t < burst + i * 0.18) return c.hide(); const tt = t - burst - i * 0.18; const x = lerp(4.7, -0.5 + (i % 3) * 0.6, k01(tt, 0, 2.2)), z = s.z0 + 4.5 - (i % 3) * 0.3 - Math.floor(i / 3) * 0.6 - k01(tt, 0, 2.2) * 1.2; c.set(x, z, tt < 2.2 ? slidePose(t + i, -1, 2.6, 1.75) : pose({ view: 'q', expr: 'scared', seed: i }, t), s.C); });
      CAM(s, [0.4, 2.0, s.z0 + 8.4], [0.5, 1.0, s.z0 + 3.2]);
      return { scene: s.S, cam: s.C, tags: [T('RATES FALL = STAMPEDE?', 640, 100, t > burst ? pop(t, burst + 0.6) : pop(t, 0.6), { size: 46, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S48', f(t, d) { const s = getSet('pond'); s.cracks.forEach((c, i) => { const at0 = i < 2 ? -1 : i === 2 ? 0.3 : d * 0.15; const v = t > at0; c.visible = v; c.scale.setScalar(v ? Math.max(0.01, k01(t, at0, at0 + 0.6)) : 0.01); c.userData.lab.visible = v; c.userData.lab.lookAt(s.C.position); });
      const half = d * 0.3; if (t < half) camLerp(s, E(k01(t, 0, half)), [2.2, 1.4, 1.2], [3.0, 1.3, 0.2], [4.6, 1.0, -2.5], [4.4, 0.9, -2.2]); else camLerp(s, E(k01(t, half, d)), [0, 9, 6], [0, 11, 3], [0, 0, 0], [0, 0, 0]);
      return { scene: s.S, cam: s.C, vig: 0.6, tags: [T('NOT ENOUGH AFFORDABLE HOMES', 640, 640, t > d * 0.8 ? pop(t, d * 0.82) : 0, { size: 44, bg: '#e3c77a' })] }; } },
];
ACTS[5] = [
  { id: 'S49', card: 'Your Wallet', sub: 'four questions' },
  { id: 'S50', f(t, d) { const s = getSet('wallet'); if (!s.q) { const Q = [['1. YOUR CITY,', 'NOT THE COUNTRY'], ['2. THE WHOLE BILL,', 'NOT JUST THE LOAN'], ['3. PRICE WITHOUT', 'THE BUYDOWN'], ['4. READ THE', 'EXIT RULES']]; s.q = Q.map((q, i) => s.pin(-0.78 + (i % 2) * 1.56, 2.05 - Math.floor(i / 2) * 0.85, 1.35, 0.62, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(194,55,45,0.4)'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, h * 0.28); x.lineTo(w, h * 0.28); x.stroke(); txt(x, q[0], w / 2, h * 0.45, h * 0.17); txt(x, q[1], w / 2, h * 0.7, h * 0.17, '#5a4a3a'); }, (i % 2 ? 1 : -1) * 0.02)); }
      s.pins.forEach(p => { p.visible = s.q.includes(p); p.userData.pin.visible = p.visible; }); const at0 = [d * 0.12, d * 0.36, d * 0.6, d * 0.76]; s.q.forEach((p, i) => { const kk = outBack(k01(t, at0[i], at0[i] + 0.5)); p.scale.setScalar(Math.max(0.001, kk)); p.userData.pin.visible = kk > 0.5; });
      let i = 0; while (i < 3 && t > at0[i + 1]) i++; const q = s.q[i].position; const prev = s.q[Math.max(0, i - 1)].position; const kk = E(k01(t, at0[i], at0[i] + 0.8)); const tx = t < at0[0] ? 0 : lerp(prev.x, q.x, kk), ty = t < at0[0] ? 1.6 : lerp(prev.y, q.y, kk);
      CAM(s, [tx * 0.7, ty, s.z0 + (t < at0[0] ? 3.2 : 2.0)], [tx, ty, s.z0]);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S51', f(t, d) { const s = getSet('street'); hideCards(s, ['linda', 'danielle', 'marcus']); s.linda.userData.porch.intensity = 3; s.dan.userData.porch.intensity = 3; const k = E(k01(t, 0, d)); camLerp(s, k, [0, 2.6, 14], [0, 2.0, 9.5], [0, 2.2, -3], [0, 1.6, -3]);
      sp(s, 'linda', -6, -0.9, { view: 'front', expr: 'smile', seed: 1 }, t, null, null, 1.6); sp(s, 'danielle', 0.4, -1.0, { view: 'front', expr: 'sad', seed: 2 }, t, null, null, 1.68); sp(s, 'marcus', 6.5, -1.3, { view: 'front', expr: 'neutral', seed: 3 }, t, null, null, 1.75);
      return { scene: s.S, cam: s.C, vig: 0.65, tags: [T('STILL AT 2.9%', 330, 560, pop(t, 3)), T('STILL UNDERWATER', 640, 620, pop(t, d * 0.45), { bg: '#5fa3a6', col: '#fff' }), T('STILL RENTING', 950, 560, pop(t, d * 0.7))] }; } },
  { id: 'S52', noBlurOut: true, f(t, d, L) { const s = getSet('diner'); DINER(s, t + 120); const w0 = lineAt(L, 'WAITER'); const low = t > 0.6; s.menu.userData.draw(['MENU', 'HOUSE', low ? '$409,000 ↓' : '$419,900'], 2);
      const k = E(k01(t, 0, d)); if (t < (w0 ? w0.t1 + 0.6 : 3)) CAM(s, [0.4, 1.5, s.z0 + 4.6], [0.3, 1.2, s.z0 + 1.2]); else camLerp(s, E(k01(t, w0 ? w0.t1 + 0.6 : 3, d)), [0.4, 1.5, s.z0 + 4.6], [-1.5, 2.4, s.z0 + 7.4], [0.3, 1.2, s.z0 + 1.2], [0.2, 1.4, s.z0 + 1]);
      sp(s, 'marcus', -0.7, s.z0 + 2.2, { view: 'q', dir: 1, expr: low ? 'happy' : 'surprised', look: [0.6, 0.6], seed: 2 }, t, L, 'MARCUS', 1.75);
      sp(s, 'waiter', 1.4, s.z0 + 0.75, { view: 'q', dir: -1, expr: 'smirk', look: [-0.8, 0.3], seed: 3 }, t, L, 'WAITER', 2.25);
      return { scene: s.S, cam: s.C, tags: [T('WHERE YOU LIVE: FALLING OR CLIMBING?', 640, 100, t > d - 7 ? pop(t, d - 6.5) : 0, { size: 38 }), T('TELL ME YOUR CITY', 640, 640, t > d - 5 ? pop(t, d - 4.5) : 0, { size: 44, bg: '#c2372d', col: '#fff' })] }; } },
  { id: 'S53', card: '' },
];
