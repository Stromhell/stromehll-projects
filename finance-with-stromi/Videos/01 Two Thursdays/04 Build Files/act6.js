/* ACT 6: what happens now  +  ACT 7: your wallet / ending */
function seaMesh(S, col, amp, w, d, y, z) { const g = new THREE.PlaneGeometry(w, d, 70, 50); g.rotateX(-Math.PI / 2); const m = new THREE.Mesh(g, std(col, { roughness: 0.3, metalness: 0.3 })); m.position.set(0, y, z); S.add(m);
  const b = g.attributes.position.array.slice(); m.userData.tick = t => { const a = g.attributes.position.array; for (let i = 0; i < a.length; i += 3) a[i + 1] = (Math.sin(b[i] * 0.5 + t * 1.6) * 0.5 + Math.cos(b[i + 2] * 0.7 + t * 1.2) * 0.4 + Math.sin((b[i] + b[i + 2]) * 1.3 + t * 2.4) * 0.12) * amp; g.attributes.position.needsUpdate = true; g.computeVertexNormals(); }; return m; }
function pinTool(label) { const g = group(cyl(0.008, 0.008, 0.35, std(0xdfe4e8, { metalness: 0.9, roughness: 0.2 }), 0, 0, 0), sph(0.045, std(0xc2372d, { roughness: 0.3 }), 0, 0.37, 0)); return shadowy(g); }

Object.assign(SETB, {
  ship() { // storm at sea: wheel, mast, rain, lightning
    const { S, C } = scene(0x05070b, [10, 30]);
    const amb = new THREE.AmbientLight(0x304058, 0.9); S.add(amb); const flash = new THREE.DirectionalLight(0xdfe8ff, 0); flash.position.set(-4, 8, -6); S.add(flash);
    sky(S, '#04060a', '#1a2230', -24, 100, 40, (x, w, h) => { const r = RH.rng(12); for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(40,48,64,${0.3 + r() * 0.4})`; x.beginPath(); x.ellipse(r() * w, r() * h * 0.6, 60 + r() * 140, 20 + r() * 40, 0, 0, TAU); x.fill(); } });
    seaMesh(S, 0x1a2a3a, 1.0, 80, 60, -1.2, -12);
    const ship = new THREE.Group(); S.add(ship); const dm = tmat(TX.wood('#5a3e24', [6, 3], 'shipdeck'), { roughness: 0.6 });
    ship.add(box(7, 0.25, 4.5, dm, 0, -0.125, -0.6)); const hull = std(0x2a1a10, { roughness: 0.6 }); ship.add(box(7.2, 0.6, 0.15, hull, 0, 0.3, -2.9), box(0.15, 0.6, 4.6, hull, -3.55, 0.3, -0.6));
    const mast = cyl(0.12, 0.15, 6, tmat(TX.wood('#6a4a2c', [1, 4], 'mast')), -1.8, 0, -1.8); ship.add(mast); ship.add(at(box(3, 0.08, 0.08, std(0x4a2e1c), 0, 0, 0), -1.8, 4.2, -1.8));
    const sail = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6, 8, 8), std(0x9a8a70, { side: THREE.DoubleSide, roughness: 0.9 })); sail.position.set(-1.8, 2.85, -1.7); ship.add(sail);
    const wheel = new THREE.Group(); wheel.position.set(0.9, 1.15, -1.1); ship.add(wheel); const wm = std(0x6a4024, { roughness: 0.45 }); wheel.add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 10, 40), wm)); for (let i = 0; i < 8; i++) { const sp = box(0.035, 1.1, 0.035, wm, 0, 0, 0); sp.rotation.z = i / 8 * Math.PI; wheel.add(sp); } wheel.add(cyl(0.08, 0.08, 0.12, std(0xc9a24a, { metalness: 0.8 }), 0, -0.06, 0)); wheel.children[wheel.children.length - 1].rotation.x = Math.PI / 2; shadowy(wheel);
    ship.add(box(0.2, 1.1, 0.2, wm, 0.9, 0.55, -1.25)); // wheel stand
    for (let i = 0; i < 3; i++) ship.add(at(cyl(0.25, 0.25, 0.6, std(0x5a3e24, { roughness: 0.7 })), 2.2 + i * 0.4, 0, -2.2 + (i % 2) * 0.4)); // barrels
    const lan = group(box(0.18, 0.28, 0.18, std(0x2a2a2a, { metalness: 0.5 }), 0, 0, 0), sph(0.06, basic(0xffd890), 0, 0.14, 0)); lan.position.set(0.9, 1.9, -1.3); ship.add(lan); const ll = new THREE.PointLight(0xffc070, 3, 5, 1.6); ll.position.set(0.9, 2.0, -1.2); ship.add(ll);
    keyLight(S, 0xb0c4e8, 40, [2, 6, 3], [0.5, 0.5, -1], 0.7); rain(S, 0, -1, 12, 8, 6, 1100); shadowy(ship);
    ship.userData.tick = t => { ship.rotation.z = Math.sin(t * 0.9) * 0.07; ship.rotation.x = Math.sin(t * 0.7 + 1) * 0.03; ship.position.y = Math.sin(t * 1.1) * 0.12; sail.position.z = -1.7 + Math.sin(t * 3) * 0.04; };
    return { S, C, ship, wheel, flash, amb };
  },
  rates() { // a rate gauge and a scaffold model that hangs on borrowed money
    const { S, C } = scene(0x080706, [7, 16]);
    S.add(new THREE.AmbientLight(0x30302a, 0.8)); S.add(at(new THREE.PointLight(0xffd0a0, 4, 9, 1.5), -1, 2.4, 1.5));
    const z0 = roomShell(S, { w: 8, d: 6, h: 3.2, floor: TX.wood('#3a2a1c', [3, 3]), wall: TX.wall('#2f3a44', '#26303a', [4, 1]), left: true });
    const tbl = P3.desk(2.4, 1.0, '#4a2e1c'); tbl.position.set(0.6, 0, -0.9); S.add(tbl);
    const model = group(); const st = std(0x8a6a3a, { metalness: 0.7, roughness: 0.4 }); for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) model.add(box(0.03, 0.5, 0.03, st, -0.45 + i * 0.3, 0.25, -0.15 + j * 0.3)); model.add(box(0.95, 0.03, 0.33, st, 0, 0.5, 0), box(0.95, 0.03, 0.33, st, 0, 0.26, 0)); model.add(box(0.3, 0.5, 0.33, std(0x2a3640), 0.6, 0.25, 0)); model.position.set(0.3, 0.805, -0.9); S.add(shadowy(model));
    const loan = poster(0.4, 0.28, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'LOAN', w / 2, h * 0.3, h * 0.22, '#c2372d'); txt(x, 'rate: ___%', w / 2, h * 0.68, h * 0.16); }); loan.rotation.x = -Math.PI / 2; loan.position.set(1.4, 0.82, -0.75); S.add(loan);
    const dial = poster(1.5, 1.5, (x, w, h) => { x.fillStyle = '#efe4cf'; x.beginPath(); x.arc(w / 2, h / 2, w * 0.48, 0, TAU); x.fill(); x.lineWidth = w * 0.06; [['#3f9b5f', Math.PI, Math.PI * 1.4], ['#d9a23a', Math.PI * 1.4, Math.PI * 1.7], ['#c2372d', Math.PI * 1.7, TAU]].forEach(([c, a, b]) => { x.strokeStyle = c; x.beginPath(); x.arc(w / 2, h / 2, w * 0.38, a, b); x.stroke(); }); txt(x, 'INTEREST RATES', w / 2, h * 0.72, h * 0.08); });
    dial.position.set(-1.6, 1.9, z0 + 0.05); S.add(dial); S.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.04, 12, 48), std(0x2a2a2a, { metalness: 0.7 })), -1.6, 1.9, z0 + 0.06));
    const needle = box(0.05, 0.58, 0.02, std(0x1e1612), 0, 0, 0, false); needle.geometry.translate(0, 0.28, 0); needle.position.set(-1.6, 1.9, z0 + 0.09); S.add(needle);
    keyLight(S, 0xffe0b0, 50, [0.6, 3.0, 1.0], [0.3, 0.8, -0.9], 0.7); dust(S, 0, 1.5, -0.5, 4, 2, 2, 120);
    return { S, C, needle, model, z0 };
  },
  split() { // one wall, two rooms: a bright SALE on the left, a quiet retirement desk on the right
    const { S, C } = scene(0x070605, [8, 18]);
    S.add(new THREE.AmbientLight(0x30281f, 0.7));
    const z0 = roomShell(S, { w: 8, d: 5, h: 3.0, floor: TX.wood('#4a3424', [3, 3]), wall: TX.wall('#5a4a38', '#4a3c2c', [4, 1]), left: true, right: true });
    S.add(box(0.12, 3.0, 4.5, std(0x2a1c14), 0, 1.5, z0 + 2.2));
    S.add(at(poster(2.2, 0.7, (x, w, h) => { x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h); txt(x, 'SALE  -10%', w / 2, h / 2, h * 0.6, '#fff'); }, true), -2.0, 2.3, z0 + 0.05));
    for (let i = 0; i < 3; i++) { const sh = P3.shelf(1.0, 1.6, 4, 20 + i); sh.position.set(-3.2 + i * 1.1, 0, z0 + 0.25); S.add(sh); }
    S.add(at(new THREE.PointLight(0xffe0b0, 6, 6, 1.5), -2, 2.6, 0)); keyLight(S, 0xfff0d0, 50, [-2, 2.9, 1.2], [-2, 0.5, -0.8], 0.8);
    const desk = P3.desk(1.6, 0.8, '#3a2414'); desk.position.set(2.0, 0, -0.9); S.add(desk); const lamp = P3.lamp(0x2f5a3a); lamp.position.set(1.5, 0.8, -1.05); S.add(lamp);
    S.add(at(poster(1.0, 0.7, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); txt(x, 'RETIRE IN:', w / 2, h * 0.3, h * 0.16); txt(x, '1 YEAR', w / 2, h * 0.62, h * 0.22, '#c2372d'); }), 2.2, 1.9, z0 + 0.05));
    const stmt = poster(0.21, 0.29, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, '401(k)', w / 2, h * 0.12, h * 0.1); txt(x, '-0.7%', w / 2, h * 0.5, h * 0.14, '#c2372d'); }); stmt.rotation.x = -Math.PI / 2; stmt.position.set(2.2, 0.815, -0.7); S.add(stmt);
    keyLight(S, 0xffc890, 22, [1.5, 1.4, -1.0], [2.2, 0.8, -0.7], 0.9);
    return { S, C, z0 };
  },
});

const ACT6 = [
  { id: 'S36', card: 'What Happens Now', sub: 'Five things to watch' },
  { id: 'S37', f(t, d) { const s = getSet('cork'); s.items.visible = false; if (!s.g37) { s.g37 = new THREE.Group(); s.S.add(s.g37);
        s.c37 = [['WHAT TO WATCH', '', 0, 2.5, 0, '#e3c77a'], ['1  TUE 17 NOV', 'NVIDIA EARNINGS', -1.25, 2.05, -0.05], ['2  LEADERSHIP', '"clearing event" or a big loss?', -0.42, 2.0, 0.04], ['3  CHINA', '600,000 CHIPS STILL WAITING', 0.42, 2.05, -0.03], ['4  RATES', 'hot inflation = hikes?', 1.25, 2.0, 0.05], ['5  WASHINGTON', 'NEW CONGRESS IN JANUARY', -0.7, 1.3, 0.03], ['+1  ANTHROPIC: 19 NOV', 'STARTS TRADING; NVIDIA PLANS $10B', 0.65, 1.3, -0.04, '#f2e27a']].map(([h, sub, x, y, rz, bg], i) => {
          const p = poster(i ? 0.78 : 1.2, i ? 0.52 : 0.3, (c, w, hh) => { c.fillStyle = bg || '#efe4cf'; c.fillRect(0, 0, w, hh); txt(c, h, w / 2, hh * (sub ? 0.25 : 0.5), hh * (sub ? 0.15 : 0.5), '#1e1612'); if (sub) { txt(c, sub, w / 2, hh * 0.52, hh * 0.09, '#3a2a20'); c.fillStyle = 'rgba(30,22,18,0.25)'; for (let k = 0; k < 3; k++) c.fillRect(w * 0.1, hh * 0.68 + k * hh * 0.08, w * 0.8, hh * 0.02); } });
          p.position.set(x, y, s.boardZ + 0.004 + i * 0.001); p.rotation.z = rz; p.castShadow = true; s.g37.add(p); const pin = sph(0.022, std(0xc2372d, { roughness: 0.3 }), x, y + (i ? 0.23 : 0.12), s.boardZ + 0.03); s.g37.add(pin); return { p, pin }; });
        const a = s.c37[6].p.position; s.loop = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 8, 48), std(0x3f9b5f)); s.loop.position.set(a.x, a.y, s.boardZ + 0.03); s.loop.scale.set(1, 0.65, 1); s.g37.add(s.loop); }
      s.g37.visible = true; const times = [0.2, 4.6, 11.8, 20.2, 25.1, 26.6, 30.8]; s.c37.forEach((c, i) => { const v = t > times[i]; c.p.visible = c.pin.visible = v; c.p.scale.setScalar(v ? outBack(k01(t, times[i], times[i] + 0.35)) : 1); }); s.loop.visible = t > 41.4; s.loop.rotation.z = t * 0.6;
      const foc = [[0, 2.2, 3.2], [-1.25, 2.0, 1.7], [-0.42, 2.0, 1.7], [0.42, 2.0, 1.7], [1.25, 2.0, 1.7], [-0.7, 1.3, 1.7], [0.65, 1.3, 1.6], [0, 1.8, 3.0]]; const fi = t < 4.6 ? 0 : t < 11.8 ? 1 : t < 20.2 ? 2 : t < 25.1 ? 3 : t < 26.6 ? 4 : t < 30.8 ? 5 : t < 41.4 ? 6 : 7;
      const tg = foc[fi]; s.fx = lerp(s.fx == null ? tg[0] : s.fx, tg[0], 0.07); s.fy = lerp(s.fy == null ? tg[1] : s.fy, tg[1], 0.07); s.fz = lerp(s.fz == null ? tg[2] : s.fz, tg[2], 0.07);
      s.C.position.set(s.fx * 0.85, s.fy - 0.15, s.z0 + s.fz); s.C.lookAt(s.fx, s.fy - 0.05, s.z0);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'THE MONEY CIRCLE, IN PUBLIC', x: 640, y: 630, s: t > 41.6 ? pop(t, 41.6) : 0, r: -0.02, bg: '#3f9b5f', col: '#fff' }] }; }, after() { const s = getSet('cork'); if (s.g37) s.g37.visible = false; } },
  { id: 'S38', f(t, d, L) { const s = getSet('ship'); const gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6)), dot = s.dot || (s.dot = castCard(s.S, 'dot', 1.6));
      const fl = (Math.floor(t * 10) % 37 === 0 || (t > 5.3 && t < 5.45)) ? 1 : 0; s.flash.intensity = fl * 4; s.amb.intensity = 0.9 + fl * 1.5;
      s.wheel.rotation.z = Math.sin(t * 1.4) * 0.6; const yy = s.ship.position.y;
      dot.set(1.6, -1.0, pose({ view: 'q', dir: -1, expr: speaking(L, 'DOT', t) ? 'sly' : 'neutral', seed: 3, look: [-0.8, 0.1], arms: [{ h: [-0.9, 0.05], hand: 'fist' }, null] }, t, L, 'DOT'), s.C, yy);
      gus.set(-0.6, -0.2, pose({ view: 'q', dir: 1, expr: speaking(L, 'GUS', t) ? 'scared' : 'surprised', seed: 5, look: [0.8, 0.2], lean: Math.sin(t * 0.9) * 0.1 }, t, L, 'GUS'), s.C, yy);
      s.C.position.set(Math.sin(t * 0.6) * 0.2, 1.6 + yy * 0.5, 3.6); s.C.lookAt(0.1, 1.1 + yy * 0.5, -1.0);
      return { scene: s.S, cam: s.C, tags: [] }; } },
  { id: 'S39', f(t, d) { const s = getSet('rates'); const k = E(k01(t, 0.5, 5)); s.needle.rotation.z = lerp(1.0, -0.8, k) + Math.sin(t * 20) * 0.015;
      s.model.position.y = 0.805 - (t > 6 ? 0.02 * Math.abs(Math.sin(t * 8)) : 0);
      const c = E(k01(t, 0, d)); s.C.position.set(lerp(-1.4, 0.6, c), lerp(1.8, 1.5, c), lerp(3.4, 2.2, c)); s.C.lookAt(lerp(-1.2, 0.6, c), lerp(1.7, 0.95, c), -1.2);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'HOT INFLATION = RATE HIKES?', x: 640, y: 90, s: pop(t, 1.2), r: -0.03, bg: '#c2372d', col: '#fff' }, { txt: 'HIGHER RATES = PRICIER LOANS', x: 640, y: 620, s: pop(t, 5.2), r: 0.02, bg: '#e3c77a' }, { txt: 'THE BUILD-OUT RUNS ON BORROWED MONEY', x: 640, y: 160, s: pop(t, 8.2), r: 0.02, size: 30 }] }; } },
];

const ACT7 = [
  { id: 'S40', card: 'Your Wallet', sub: 'Why this reaches you' },
  { id: 'S41', f(t, d) { const s = getSet('kitchen'); s.dc.visible = false; s.dcl.intensity = 0; s.key.color.set(0xffd090); if (s.pipN) s.pipN.hide(); if (s.pip) s.pip.hide(); if (s.wl) s.wl.intensity = 0; s.drawWin(false, false);
      const mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.55));
      if (!s.stmt) { s.stmt = poster(0.3, 0.4, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'MY 401(k)', w / 2, h * 0.1, h * 0.07); txt(x, 'INDEX FUND', w / 2, h * 0.18, h * 0.05, '#5a4a3a'); txt(x, '$100,000', w / 2, h * 0.38, h * 0.1); txt(x, '- $700', w / 2, h * 0.58, h * 0.11, '#c2372d'); txt(x, '(illustration)', w / 2, h * 0.72, h * 0.05, '#5a4a3a'); x.fillStyle = 'rgba(30,22,18,0.3)'; for (let i = 0; i < 4; i++) x.fillRect(w * 0.1, h * 0.8 + i * h * 0.04, w * 0.8, h * 0.012); }); s.stmt.rotation.x = -Math.PI / 2; s.stmt.position.set(0.62, 0.81, -0.35); s.stmt.rotation.z = -0.2; s.S.add(s.stmt); }
      s.stmt.visible = true; const big = s.wedges[0]; const dip = t > 11.9 && t < 19.6 ? E(k01(t, 13, 14.5)) : t >= 19.6 ? 1 : 0; big.scale.y = 1 - 0.1 * dip; big.position.y = 0.065 - 0.0035 * dip; s.wedges.forEach((w, i) => { if (i) w.position.y = 0.065; });
      if (t > 11.9) mab.hide(); else mab.set(-0.95, -0.15, pose({ view: 'q', dir: 1, expr: t > 19.6 ? 'sad' : 'neutral', seed: 2, look: [0.8, 0.6] }, t), s.C);
      const k = E(k01(t, 0, d)); if (t < 11.9) { s.C.position.set(lerp(-0.6, -0.2, k), 2.0, lerp(3.4, 3.0, k)); s.C.lookAt(-0.1, 0.9, -0.5); } else { s.C.position.set(0.5, 1.75, 1.3); s.C.lookAt(0.3, 0.8, -0.45); }
      return { scene: s.S, cam: s.C, tags: [{ txt: '~70 MILLION AMERICANS SAVE IN A 401(k)', x: 640, y: 90, s: t < 11.9 ? pop(t, 4.5) : 0, r: -0.02, size: 32 }, { txt: '7% OF YOUR FUND', x: 330, y: 120, s: t >= 11.9 ? pop(t, 12.2) : 0, r: -0.04, bg: '#e3c77a' }, { txt: 'x  -10%  =  -0.7%', x: 920, y: 120, s: t >= 11.9 ? pop(t, 15) : 0, r: 0.03, bg: '#c2372d', col: '#fff' }, { txt: '$100K  ->  about -$700', x: 640, y: 620, s: pop(t, 19.8), r: -0.02, size: 40 }, { txt: 'ONE HEADLINE. ONE MORNING.', x: 640, y: 680, s: t > 23.7 ? pop(t, 23.7) * 0.8 : 0, r: 0.01, size: 30, bg: '#efe4cf' }] }; }, after() { const s = getSet('kitchen'); if (s.stmt) s.stmt.visible = false; s.wedges[0].scale.y = 1; if (s.mab) s.mab.hide(); } },
  { id: 'S42', f(t, d) { const s = getSet('site'); s.note.visible = true; const gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6)), cook = s.cook2 || (s.cook2 = castCard(s.S, 'cook', 1.7)); if (s.wen) s.wen.hide(); if (s.clerk) s.clerk.hide();
      gus.set(-1.65, 0.8, pose({ view: 'q', dir: 1, expr: t > 11.4 ? 'sad' : 'neutral', seed: 4, look: [0.6, -0.4] }, t), s.C); cook.set(1.65, 0.85, pose({ view: 'q', dir: -1, expr: t > 11.4 ? 'sad' : 'neutral', seed: 7, look: [-0.6, -0.4] }, t), s.C);
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-3.5, 0.5, k), lerp(2.4, 1.9, k), lerp(6.5, 5.6, k)); s.C.lookAt(lerp(-1, 0.3, k), lerp(2.2, 1.2, k), lerp(-6, -2, k));
      return { scene: s.S, cam: s.C, tags: [{ txt: 'LENDERS: INSURERS + PENSION FUNDS', x: 640, y: 90, s: pop(t, 2), r: -0.02, size: 34 }, { txt: 'YOUR RETIREMENT, LENDING TO A HALF-BUILT BUILDING', x: 640, y: 160, s: pop(t, 6.9), r: 0.02, size: 28, bg: '#e3c77a' }, { txt: 'ELECTRICIANS · BUILDERS · DINERS: HIT FIRST', x: 640, y: 630, s: pop(t, 11.6), r: -0.02, size: 30, bg: '#c2372d', col: '#fff' }] }; }, after() { const s = getSet('site'); if (s.gus) s.gus.hide(); if (s.cook2) s.cook2.hide(); } },
  { id: 'S43', f(t, d, L) { const s = getSet('split'); const pip = s.pip || (s.pip = castCard(s.S, 'pip', 1.5)), wen = s.wen || (s.wen = castCard(s.S, 'wendell', 1.8));
      pip.set(-2.0, -0.2, (() => { const P = pose({ view: 'front', expr: 'laugh', seed: 8, arms: [{ h: [-0.95, -0.9], hand: 'open' }, { h: [0.95, -0.9], hand: 'open' }] }, t, L, 'PIP'); P.bob = -0.18 * Math.abs(Math.sin(t * 5)); return P; })(), s.C);
      wen.set(1.95, -0.25, pose({ view: 'front', expr: 'sad', seed: 3, look: [0, 0.6] }, t, L, 'WENDELL'), s.C);
      const k = E(k01(t, 0, d)); s.C.position.set(0, 1.6, lerp(4.8, 4.3, k)); s.C.lookAt(0, 1.1, -1);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'AGE 25: A SALE', x: 330, y: 620, s: t > 3.4 ? pop(t, 3.6) : 0, r: -0.04, bg: '#3f9b5f', col: '#fff' }, { txt: 'ABOUT TO RETIRE: A LONG WEEK', x: 950, y: 620, s: t > 3.4 ? pop(t, 6) : 0, r: 0.03, size: 32 }, { txt: 'NOT FINANCIAL ADVICE', x: 640, y: 90, s: t > 9 ? pop(t, 9.5) : 0, r: -0.02, bg: '#efe4cf', size: 34 }] }; } },
  { id: 'S44', f(t, d) { const s = getSet('stage'); s.cracks.forEach(c => c.visible = true); s.chunk.visible = false; s.tapes.forEach(x => x.visible = t > 9.1);
      if (!s.bub) { s.bub = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 32), new THREE.MeshStandardMaterial({ color: 0xbfe0ff, transparent: true, opacity: 0.3, roughness: 0.05, metalness: 0.5, emissive: 0x203040, depthWrite: false })); s.bub.position.set(0, 2.7, 0); s.S.add(s.bub);
        s.pins = ['VOTERS', 'WASHINGTON', 'BEIJING', ''].map((lb, i) => { const g = new THREE.Group(); const h = sleeveHand([0x5a6a8a, 0x8a4a3a, 0x4a6a4a, 0x16110f][i]); if (i === 3) h.children.slice(2).forEach(c => c.visible = false); g.add(h); if (i < 3) { const p = pinTool(); p.position.set(0, 0.04, 0); p.rotation.z = -Math.PI / 2; p.position.x = 0.08; g.add(p); } s.S.add(g); g.visible = false; return g; }); }
      s.bub.visible = true; s.bub.scale.setScalar(1 + Math.sin(t * 1.3) * 0.02); s.coinsAt(4 + t, 0.8);
      const T = [10.4, 13.4, 15.4, 17.1]; const P = [[-2.0, 3.2, 0.3, 0], [2.0, 3.4, 0.2, Math.PI], [-1.9, 2.0, 0.6, 0], [2.0, 2.1, 0.5, Math.PI]];
      s.pins.forEach((g, i) => { const v = t > T[i]; g.visible = v; const k = E(k01(t, T[i], T[i] + 0.8)); const [x, y, z, ry] = P[i]; const out = Math.sign(x) * (1 - k) * 2.5; g.position.set(x + out, y, z); g.rotation.set(0, ry, 0); g.children[0].rotation.z = 1.45; });
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-1.5, 0, k), lerp(2.3, 2.6, k), lerp(5.6, 5.4, k)); s.C.lookAt(0, 2.3, 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'NOT YET', x: 640, y: 90, s: t < 9 ? pop(t, 2.6) : 0, r: -0.03, size: 46 }, { txt: 'POPS WHEN THE MONEY STOPS', x: 640, y: 630, s: t < 9 ? pop(t, 5.5) : 0, r: 0.02, bg: '#e3c77a' }, { txt: 'VOTERS', x: 260, y: 170, s: t > 10.4 ? pop(t, 10.6) : 0, r: -0.05 }, { txt: 'WASHINGTON', x: 1020, y: 160, s: t > 13.4 ? pop(t, 13.6) : 0, r: 0.05 }, { txt: 'BEIJING', x: 260, y: 470, s: t > 15.4 ? pop(t, 15.6) : 0, r: -0.04 }, { txt: 'NO CEO', x: 1020, y: 470, s: t > 17.1 ? pop(t, 17.3) : 0, r: 0.04, bg: '#c2372d', col: '#fff' }, { txt: 'THU 5: THE MARKET NOTICED THE PIN', x: 640, y: 630, s: t > 21.8 && t < 25.3 ? pop(t, 21.9) : 0, r: -0.02, size: 32 }, { txt: 'THU 12: HOW MANY HANDS ARE ON IT', x: 640, y: 630, s: t > 25.3 ? pop(t, 25.4) : 0, r: 0.02, size: 32, bg: '#e3c77a' }] }; }, after() { const s = getSet('stage'); if (s.bub) { s.bub.visible = false; s.pins.forEach(g => g.visible = false); } s.coins.visible = false; s.tapes.forEach(x => x.visible = false); } },
  { id: 'S45', noBlurOut: true, f(t, d) { const s = getSet('office'); if (s.jan) s.jan.hide(); s.doc.visible = false; s.jacket.position.set(0, 0.45, -1.45);
      if (!s.mic) { s.mic = group(cyl(0.07, 0.08, 0.02, std(0x222222, { metalness: 0.6 })), cyl(0.01, 0.01, 0.25, std(0x888888, { metalness: 0.9 }), 0, 0.02, 0), sph(0.045, std(0x333333, { roughness: 0.6 }), 0, 0.3, 0)); s.mic.position.set(0.3, 0.805, -0.5); shadowy(s.mic); s.S.add(s.mic); }
      s.mic.visible = true; const off = t > d - 1.6; s.lamp.intensity = off ? 0 : (s.lamp.userData.i0 || (s.lamp.userData.i0 = s.lamp.intensity));
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(0.9, 0.25, k), lerp(1.6, 1.25, k), lerp(3.4, 1.7, k)); s.C.lookAt(0.1, 0.85, -0.9);
      return { scene: s.S, cam: s.C, vig: off ? 1.2 : 0.9, tags: [{ txt: 'NEXT TUESDAY: EARNINGS', x: 640, y: 90, s: t < d - 1.6 ? pop(t, 1) : 0, r: -0.02 }, { txt: 'FIRST TIME IN 33 YEARS: A NEW VOICE', x: 640, y: 630, s: t > 5 && t < d - 1.6 ? pop(t, 5.2) : 0, r: 0.02, bg: '#e3c77a', size: 32 }] }; }, after() { const s = getSet('office'); if (s.mic) s.mic.visible = false; if (s.lamp.userData.i0) s.lamp.intensity = s.lamp.userData.i0; } },
  { id: 'S46', card: '' },
];
