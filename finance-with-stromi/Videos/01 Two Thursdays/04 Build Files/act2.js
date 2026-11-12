/* ACT 2: four cracks + ACT 3: the ballot box */
function flutter(S, n, cx, cz, sx, sz, top, cols, size, seed) { // instanced falling paper / confetti
  const g = new THREE.PlaneGeometry(size[0], size[1]); const m = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.9 });
  const im = new THREE.InstancedMesh(g, m, n); const r = RH.rng(seed || 5), D = [], col = new THREE.Color();
  for (let i = 0; i < n; i++) { D.push({ x: cx + (r() - 0.5) * sx, z: cz + (r() - 0.5) * sz, ph: r() * 10, sp: 0.35 + r() * 0.4, a: r() * 6, b: r() * 6 }); col.set(cols[i % cols.length]); im.setColorAt(i, col); }
  im.castShadow = true; S.add(im); im.visible = false; const mt = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  return { im, at(t) { im.visible = true; for (let i = 0; i < n; i++) { const d = D[i]; const y = top - ((t * d.sp + d.ph) % (top + 0.2)); const yy = Math.max(0.01, y);
    e.set(y > 0.02 ? d.a + t * 2 : -Math.PI / 2, d.b + t * (y > 0.02 ? 1.5 : 0), 0); q.setFromEuler(e); mt.compose(V3(d.x + Math.sin(t * 1.3 + d.ph) * 0.2 * (y > 0.02 ? 1 : 0), yy, d.z), q, V3(1, 1, 1)); im.setMatrixAt(i, mt); } im.instanceMatrix.needsUpdate = true; } };
}
Object.assign(SETB, {
  bank() {
    const { S, C } = scene(0x060504, [7, 16]);
    S.add(new THREE.AmbientLight(0x2a2a20, 0.7)); S.add(at(new THREE.PointLight(0xffc890, 4, 10, 1.5), 2.5, 2.2, 1.5));
    const z0 = roomShell(S, { w: 8, d: 6, h: 3.2, floor: TX.carpet('#4a1e22', [5, 5]), wall: TX.wood('#4a2e1c', [3, 1], 'panel'), left: true, right: true });
    const desk = P3.desk(2.2, 1.0, '#3a2414'); desk.position.set(0, 0, -0.9); S.add(desk);
    const lamp = P3.lamp(0x2f6a3a); lamp.position.set(-0.75, 0.8, -1.05); S.add(lamp);
    keyLight(S, 0xffe0a0, 30, [-0.75, 1.25, -1.05], [0, 0.8, -0.8], 0.9);
    S.add(at(P3.shelf(1.8, 2.4, 6, 14), -2.6, 0, z0 + 0.25)); S.add(at(P3.shelf(1.8, 2.4, 6, 17), 2.6, 0, z0 + 0.25));
    const safe = rbox(0.9, 1.1, 0.7, 0.04, std(0x2a2a2e, { metalness: 0.7, roughness: 0.35 }), 0, 0, z0 + 0.4); S.add(safe); S.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 12, 32), std(0xc9a24a, { metalness: 0.9 })), 0, 0.6, z0 + 0.76));
    S.add(at(P3.frame(0.9, 0.6, (x, w, h) => { x.fillStyle = '#6b3f5e'; x.fillRect(0, 0, w, h); txt(x, 'IN GOLD WE TRUST', w / 2, h / 2, h * 0.16, '#e3c77a'); }), 0, 2.2, z0 + 0.03));
    // envelope + catalogue on the desk
    const env = rbox(0.3, 0.05, 0.18, 0.01, std(0xd9c79a, { roughness: 0.8 }), 0, 0, 0); S.add(env);
    const cat = canvasTex(512, 360); const catM = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.3), [std(0xc2372d), std(0xc2372d), tmat(cat.t), std(0xc2372d), std(0xc2372d), std(0xc2372d)]); catM.castShadow = true; S.add(catM);
    function drawCat(page) { const x = cat.x; x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, 512, 360); txt(x, 'CATALOGUE  p.' + page, 256, 40, 34); x.fillStyle = '#15402a'; x.fillRect(156, 90, 200, 200); x.fillStyle = '#9aa0a6'; x.fillRect(206, 140, 100, 100); txt(x, 'NVIDIA CHIP', 256, 320, 36, '#c2372d'); cat.t.needsUpdate = true; }
    return { S, C, env, catM, drawCat, z0 };
  },
  pawn() {
    const { S, C } = scene(0x070504, [6, 14]);
    S.add(new THREE.AmbientLight(0x30261a, 0.7)); S.add(at(new THREE.PointLight(0xffc070, 4, 9, 1.5), -2, 2.2, 1.2));
    const z0 = roomShell(S, { w: 7, d: 5, h: 3, floor: TX.wood('#3a281c', [3, 3]), wall: TX.brick('#6a3a2a', [3, 1.5]) });
    S.add(rbox(4, 0.95, 0.8, 0.02, tmat(TX.wood('#5a3a26', [2, 1], 'counter')), 0, 0, -0.6)); S.add(box(4.1, 0.05, 0.9, std(0x2a1c14, { roughness: 0.3 }), 0, 0.97, -0.6));
    const glassM = std(0xaaccdd, { transparent: true, opacity: 0.18, roughness: 0.05 }); S.add(box(3.8, 0.4, 0.7, glassM, 0, 1.2, -0.6, false));
    // pawned junk on the back shelves
    for (let row = 0; row < 3; row++) { S.add(box(4.5, 0.04, 0.4, std(0x3a281c), 0, 1.0 + row * 0.6, z0 + 0.22)); const r = RH.rng(row + 5); for (let i = 0; i < 7; i++) { const x = -2 + i * 0.62 + r() * 0.1, y = 1.02 + row * 0.6; const k = Math.floor(r() * 4);
      if (k === 0) S.add(cyl(0.12, 0.12, 0.25, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), x, y, z0 + 0.25)); else if (k === 1) S.add(rbox(0.36, 0.26, 0.2, 0.03, std(0x3a3a3a, { metalness: 0.4 }), x, y, z0 + 0.25)); else if (k === 2) S.add(sph(0.11, std(0x8a2f3c, { roughness: 0.3 }), x, y + 0.11, z0 + 0.25)); else S.add(at(P3.books(5, i + row), x - 0.12, y, z0 + 0.25)); } }
    const sign = poster(1.8, 0.5, (x, w, h) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, h); txt(x, 'WE BUY CHIPS', w / 2, h / 2, h * 0.6, '#e3c77a'); }, true); sign.position.set(0, 2.65, z0 + 0.04); S.add(sign);
    // the used chip on the counter + price tag on a string
    const chip = group(rbox(0.4, 0.04, 0.4, 0.01, std(0x15402a, { roughness: 0.4 }), 0, 0, 0), rbox(0.24, 0.03, 0.24, 0.01, std(0x9aa0a6, { metalness: 0.9, roughness: 0.25 }), 0, 0.04, 0)); chip.position.set(-0.3, 0.995, -0.45); S.add(shadowy(chip));
    const tagT = canvasTex(256, 160); const tagM = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.2), tmat(tagT.t, { side: THREE.DoubleSide })); tagM.position.set(0.25, 1.06, -0.3); tagM.rotation.x = -1.2; tagM.castShadow = true; S.add(tagM);
    function price(v, struck) { const x = tagT.x; x.fillStyle = '#f2e6c8'; x.fillRect(0, 0, 256, 160); x.beginPath(); x.arc(30, 80, 10, 0, TAU); x.fillStyle = '#3a281c'; x.fill(); txt(x, v, 140, 80, 64, '#1e1612'); if (struck) { x.strokeStyle = '#c2372d'; x.lineWidth = 8; x.beginPath(); x.moveTo(60, 90); x.lineTo(240, 70); x.stroke(); } tagT.t.needsUpdate = true; }
    const news = poster(0.6, 0.8, (x, w, h) => { x.fillStyle = '#e9dfc8'; x.fillRect(0, 0, w, h); txt(x, 'DAILY LEDGER', w / 2, h * 0.08, h * 0.06); txt(x, 'BURRY:', w / 2, h * 0.2, h * 0.09, '#c2372d'); txt(x, 'SERVERS DON\'T', w / 2, h * 0.3, h * 0.06); txt(x, 'LAST THAT LONG', w / 2, h * 0.37, h * 0.06); x.fillStyle = 'rgba(30,22,18,0.3)'; for (let i = 0; i < 12; i++) x.fillRect(w * 0.08, h * 0.45 + i * h * 0.04, w * 0.84, h * 0.012); });
    news.position.set(1.4, 1.0, -0.45); news.rotation.x = -Math.PI / 2; news.rotation.z = -0.25; S.add(news);
    const bell = group(cyl(0.07, 0.09, 0.02, std(0x2a2a2a)), at(new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 10, 0, TAU, 0, Math.PI / 2), std(0xc9a24a, { metalness: 0.9, roughness: 0.25 })), 0, 0.02, 0)); bell.position.set(-1.4, 0.995, -0.4); S.add(shadowy(bell));
    keyLight(S, 0xffd9a0, 55, [0, 3, 0.8], [0, 1, -0.5], 0.55);
    dust(S, 0, 1.6, -0.3, 3, 1.5, 1.5, 120);
    return { S, C, chip, price, tagM, z0 };
  },
  ballot() {
    const { S, C } = scene(0x070504, [7, 16]);
    S.add(new THREE.AmbientLight(0x2e281e, 0.7)); S.add(at(new THREE.PointLight(0xffd090, 4, 10, 1.5), 2, 2.3, 1.5));
    const z0 = roomShell(S, { w: 10, d: 6, h: 3.2, floor: TX.wood('#4a3220', [4, 4], 'hall'), wall: TX.wall('#4a4232', '#3e372a', [5, 1]), left: true, right: true });
    const tbl = group(rbox(6.4, 0.06, 0.9, 0.015, tmat(TX.wood('#6b4a33', [3, 1], 'long')), 0, 0.74, 0)); for (const x of [-3, -1, 1, 3]) for (const z of [-0.38, 0.38]) tbl.add(cyl(0.035, 0.03, 0.74, std(0x3a2414), x, 0, z)); tbl.position.set(0, 0, -1.0); S.add(shadowy(tbl));
    const boxes = [];
    for (let i = 0; i < 8; i++) { const nd = i === 7; const g = group(rbox(0.5, 0.42, 0.4, 0.02, std(nd ? 0x3f6b4f : 0xd9b46a, { roughness: 0.6 }), 0, 0, 0), box(0.28, 0.01, 0.04, std(0x1e1612), 0, 0.425, 0, false));
      const lb = poster(0.36, 0.14, (x, w, h) => { x.fillStyle = '#f2ead8'; x.fillRect(0, 0, w, h); txt(x, nd ? 'HARWOOD, ND' : 'OHIO #' + (i + 1), w / 2, h / 2, h * 0.55); }); lb.position.set(0, 0.24, 0.201); g.add(lb);
      const res = poster(0.34, 0.18, (x, w, h) => { x.clearRect(0, 0, w, h); x.strokeStyle = nd ? '#2f8a46' : '#c2281e'; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); txt(x, nd ? 'YES' : 'NO', w / 2, h / 2, h * 0.7, nd ? '#2f8a46' : '#c2281e'); }); res.material.transparent = true; res.material.alphaTest = 0.1; res.material.needsUpdate = true; res.position.set(0, 0.426, 0.02); res.rotation.x = -Math.PI / 2; res.visible = false; g.add(res);
      g.position.set(-2.8 + i * 0.8, 0.77, -1.0); S.add(shadowy(g)); boxes.push({ g, res }); }
    const stamp = group(rbox(0.16, 0.08, 0.1, 0.01, std(0x6a1c18), 0, 0, 0), cyl(0.02, 0.025, 0.1, std(0xc9a24a, { metalness: 0.9 }), 0, 0.08, 0), sph(0.04, std(0x2a1a12), 0, 0.2, 0)); S.add(shadowy(stamp));
    const flags = poster(1.6, 1.0, (x, w, h) => { x.fillStyle = '#2f4d6b'; x.fillRect(0, 0, w, h); for (let i = 0; i < 7; i++) { x.fillStyle = i % 2 ? '#f2ead8' : '#c2372d'; x.fillRect(w * 0.4, i * h / 7, w * 0.6, h / 7); } x.fillStyle = '#f2ead8'; for (let i = 0; i < 20; i++) x.fillRect(10 + (i % 5) * w * 0.07, 10 + Math.floor(i / 5) * h * 0.1, 6, 6); });
    flags.position.set(-3.2, 2.0, z0 + 0.03); S.add(flags);
    S.add(at(P3.frame(0.9, 0.6, (x, w, h) => { x.fillStyle = '#f2ead8'; x.fillRect(0, 0, w, h); txt(x, 'VOTE HERE', w / 2, h / 2, h * 0.3, '#2f4d6b'); }), 2.6, 2.0, z0 + 0.03));
    const bulb = P3.pendant(0x3a3a2a); bulb.position.set(0, 3.2, -0.8); S.add(bulb);
    keyLight(S, 0xffe0a0, 70, [0, 3.05, -0.8], [0, 0.7, -0.9], 0.75);
    dust(S, 0, 1.8, -0.8, 6, 2, 2, 160);
    return { S, C, boxes, stamp, z0 };
  },
  site() {
    const { S, C } = scene(0x0b1016, [10, 40]);
    S.add(new THREE.HemisphereLight(0x5a6a90, 0x2a2018, 1.4)); S.add(new THREE.AmbientLight(0x303848, 0.8));
    S.add(plane(80, 80, tmat(TX.concrete('#4a4038', [16, 16])), 0, 0, 0, -Math.PI / 2));
    // half-built data center: steel frame + finished section with lit server windows
    const steel = std(0x8a6a3a, { metalness: 0.7, roughness: 0.4 });
    for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) S.add(box(0.15, 4.5, 0.15, steel, -6 + i * 2, 2.25, -10 - j * 2));
    for (let j = 0; j < 3; j++) S.add(box(10.3, 0.15, 0.15, steel, -1, 4.5, -10 - j * 2)), S.add(box(10.3, 0.15, 0.15, steel, -1, 2.3, -10 - j * 2));
    for (let i = 0; i < 6; i++) S.add(box(0.15, 0.15, 4.2, steel, -6 + i * 2, 4.5, -12));
    const fin = box(6, 4.6, 4.2, std(0x2a3640, { roughness: 0.5, metalness: 0.3 }), 7, 2.3, -12); S.add(fin); for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) S.add(box(0.36, 0.22, 0.02, basic(0x7fe0a8), 4.6 + i * 0.52, 0.8 + j * 0.9, -9.88, false));
    S.add(at(new THREE.PointLight(0x7fe0a8, 6, 10, 1.5), 7, 2, -8));
    // crane
    const crane = group(box(0.5, 12, 0.5, std(0xd9a23a, { metalness: 0.4 }), 0, 6, 0), box(12, 0.5, 0.5, std(0xd9a23a, { metalness: 0.4 }), 3, 12, 0), cyl(0.02, 0.02, 6, std(0x222222), 7.5, 6, 0)); crane.position.set(-8, 0, -16); S.add(shadowy(crane));
    // plank table with blueprints + floodlight tower
    const tbl = group(rbox(2.4, 0.08, 1.0, 0.01, tmat(TX.wood('#8a6440', [2, 1], 'plank')), 0, 0.8, 0)); for (const x of [-1, 1]) tbl.add(box(0.08, 0.8, 0.9, std(0x5a3e24), x, 0.4, 0)); tbl.position.set(0, 0, 0); S.add(shadowy(tbl));
    const bp = poster(1.8, 0.8, (x, w, h) => { x.fillStyle = '#1f4a7a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#cfe3ff'; x.lineWidth = 2; for (let i = 0; i < 12; i++) x.strokeRect(20 + i * 30, 30 + (i % 3) * 30, 60, 40); txt(x, '$1 TRILLION', w * 0.62, h * 0.55, h * 0.22, '#e8f2ff'); });
    bp.rotation.x = -Math.PI / 2; bp.position.set(0, 0.882, 0); S.add(bp);
    const note = poster(0.34, 0.26, (x, w, h) => { x.fillStyle = '#f2e27a'; x.fillRect(0, 0, w, h); txt(x, 'IF THEY LET', w / 2, h * 0.38, h * 0.18); txt(x, 'YOU BUILD IT', w / 2, h * 0.66, h * 0.18); }); note.rotation.x = -Math.PI / 2; note.position.set(0.6, 0.887, 0.15); S.add(note);
    const tower = group(box(0.12, 5, 0.12, std(0x555555, { metalness: 0.6 }), 0, 2.5, 0), rbox(0.9, 0.5, 0.25, 0.04, std(0x333333), 0, 5, 0), box(0.7, 0.35, 0.02, basic(0xffffff), 0, 5.25, 0.14, false)); tower.position.set(3.5, 0, 1.5); tower.rotation.y = -2.4; S.add(shadowy(tower));
    keyLight(S, 0xe8f0ff, 160, [3.5, 5.2, 1.5], [0, 0.5, -0.5], 0.6);
    for (let i = 0; i < 6; i++) S.add(cyl(0.18, 0.25, 0.5, std(0xe0742c, { roughness: 0.5 }), -3 + i * 1.3, 0, 2.2)); // traffic cones
    const sky = poster(80, 30, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0a0f1a'); g.addColorStop(1, '#2a3550'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 100; i++) { x.fillStyle = '#fff'; x.globalAlpha = Math.random() * 0.7; x.fillRect(Math.random() * w, Math.random() * h * 0.6, 1.5, 1.5); } x.globalAlpha = 1; }, true); sky.position.set(0, 12, -30); S.add(sky);
    return { S, C, note };
  },
});

const ACT2 = [
  { id: 'S10', card: 'Four Cracks' },
  { id: 'S11', f(t, d, L) { const s = getSet('bank'); const wen = s.wen || (s.wen = castCard(s.S, 'wendell', 1.8)), gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6));
      const sk = L.find(l => l.who === 'WENDELL'); const skT = sk ? sk.t0 - 0.4 : 0; const gift = k01(t, skT, skT + 0.8);
      s.env.position.set(lerp(-0.6, 0.55, E(gift)), 0.805, -0.75); s.catM.position.set(0.05, 0.81, -0.65); const pg = 1 + Math.floor(Math.max(0, t - skT - 3) * 2.2) % 9; s.drawCat(pg);
      const wide = t < skT; if (wide) { s.C.position.set(0.0, 2.2, 3.6); s.C.lookAt(0, 0.9, -0.9); } else { const k = E(k01(t, skT, d)); s.C.position.set(lerp(-1.2, -0.8, k), 1.6, lerp(2.5, 1.9, k)); s.C.lookAt(0.4, 1.1, -0.8); }
      wen.set(-0.5, -1.75, pose({ view: 'front', expr: 'sly', seed: 1, arms: [null, { h: [0.95, 0.5], hand: 'open' }] }, t, L, 'WENDELL'), s.C);
      gus.set(1.6, -0.2, pose({ view: 'q', dir: -1, expr: t > (L[4] ? L[4].t0 - 0.3 : d) ? 'sleepy' : 'happy', look: [-0.8, 0.5], seed: 2 }, t, L, 'GUS'), s.C);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'CRACK 1: THE MONEY CIRCLE', x: 640, y: 80, s: pop(t, 0.5), r: -0.02 }, { txt: '$6.3B BACKSTOP', x: 1040, y: 200, s: wide ? pop(t, 7.5) : 0, r: 0.05, bg: '#e3c77a' }] }; } },
  { id: 'S12', f(t, d) { const s = getSet('pawn'); const steps = ['$30,000', '$20,000', '$12,000?']; const i = Math.min(2, Math.floor(k01(t, 8, 22) * 3)); s.price(steps[i], false);
      const k = E(k01(t, 0, d)); if (t < 22) { s.C.position.set(lerp(-0.2, 0.35, k), lerp(1.75, 1.5, k), lerp(1.5, 0.8, k)); s.C.lookAt(0.0, 1.0, -0.45); } else { s.C.position.set(lerp(1.8, 1.45, t / d), lerp(1.7, 1.5, t / d), lerp(1.0, 0.7, t / d)); s.C.lookAt(1.2, 1.0, -0.45); }
      return { scene: s.S, cam: s.C, tags: [{ txt: 'CRACK 2: CHIPS AS COLLATERAL', x: 640, y: 80, s: pop(t, 0.5), r: -0.02 }, { txt: 'OWED $5 FOR EVERY $1', x: 330, y: 610, s: t < 22 ? pop(t, 6) : 0, r: -0.03, bg: '#c2372d', col: '#fff' }, { txt: 'WHAT IS A USED CHIP WORTH?', x: 640, y: 620, s: t > 31 ? pop(t, 31) : 0, r: 0.02, bg: '#e3c77a' }] }; } },
  { id: 'S13', f(t, d, L) { const s = getSet('diner'); s.plates.forEach((p, i) => p.visible = true); const dot = s.dot || (s.dot = castCard(s.S, 'dot', 1.6)), cook = s.cook || (s.cook = castCard(s.S, 'cook', 1.7));
      const bt = s.board.userData.T; const x = bt.x; x.fillStyle = '#1f2a22'; x.fillRect(0, 0, bt.c.width, bt.c.height); txt(x, 'THE TAB', bt.c.width / 2, 40, 40, '#e3c77a'); const lines = Math.floor(clamp(t * 1.2, 0, 12)); for (let i = 0; i < lines; i++) txt(x, `TABLE ${1 + i % 3} .......... ${['$$$', '$$', '$$$$'][i % 3]}`, bt.c.width / 2, 90 + i * 30, 24, '#e8f0d8'); if (t > 8) txt(x, 'TOTAL: $63B', bt.c.width / 2, bt.c.height - 36, 44, '#ff9a8a'); bt.t.needsUpdate = true;
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-2.4, -1.2, k), 1.45, lerp(4.4, 3.8, k)); s.C.lookAt(lerp(0.6, 0.2, k), 1.1, -1.4);
      dot.set(0.5, -0.5, pose({ view: 'q', expr: 'sly', look: [0.8, 0], seed: 3 }, t, L, 'DOT'), s.C);
      cook.set(-1.1, -0.3, pose({ view: 'q', expr: L.find(l => l.who === 'COOK' && t > l.t0) ? 'surprised' : 'neutral', look: [0.8, 0.2], seed: 4 }, t, L, 'COOK'), s.C);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'CRACK 3: WHO PAYS?', x: 640, y: 80, s: pop(t, 0.5), r: -0.02 }, { txt: '3 BUYERS = 2 OF EVERY 5 DOLLARS', x: 640, y: 620, s: t > 7 && t < (L[1] ? L[1].t0 : d) ? pop(t, 7) : 0, r: 0.02, bg: '#e3c77a' }] }; } },
  { id: 'S14', f(t, d, L) { const s = getSet('kitchen'); s.dc.visible = false; s.dcl.intensity = 0; s.key.color.set(0x9fb0d0); if (!s.wl) { s.wl = new THREE.PointLight(0x7fe0a8, 0, 6, 1.5); s.wl.position.set(1.2, 1.7, s.z0 + 0.8); s.S.add(s.wl); }
      const pip = s.pipN || (s.pipN = castCard(s.S, 'pip', 1.5)); if (s.mab) s.mab.hide(); if (s.pip) s.pip.hide();
      const dcL = L.find(l => l.who === 'DC'); const blink = dcL && t > dcL.t0 && t < dcL.t1 ? (Math.floor(t * 6) % 2) : 1; s.drawWin(true, !!blink); s.wl.intensity = blink ? 3 : 0.5;
      const sk = L.find(l => l.who === 'PIP'); const close = sk && t > sk.t0 - 0.5;
      if (!close) { const k = E(k01(t, 0, sk ? sk.t0 : d)); s.C.position.set(lerp(-2.6, -2.0, k), 1.5, lerp(4.4, 3.6, k)); s.C.lookAt(-0.2, 1.05, -1.5); } else { s.C.position.set(-2.8, 1.4, 2.4); s.C.lookAt(-0.4, 1.1, -1.5); }
      pip.set(-1.75, -0.6, pose({ view: 'q', expr: 'angry', look: [0.7, -0.2], seed: 5, arms: [{ h: [-0.5, 0.6], hand: 'fist' }, { h: [0.95, 0.35], hand: 'open' }] }, t, L, 'PIP'), s.C);
      const wp = proj(s.C, V3(1.2, 2.5, s.z0));
      return { scene: s.S, cam: s.C, tags: [{ txt: 'CRACK 4: THE PLUG', x: 640, y: 80, s: pop(t, 0.5), r: -0.02 }, { txt: '~7 YEARS TO PLUG IN', x: 300, y: 600, s: !close ? pop(t, 8) : 0, r: -0.03 }, { txt: '+$25-30 A MONTH', x: 960, y: 600, s: !close ? pop(t, 15) : 0, r: 0.03, bg: '#c2372d', col: '#fff' }, { txt: 'HI, NEIGHBOUR!', x: wp[0], y: wp[1], s: dcL && t > dcL.t0 ? pop(t, dcL.t0) : 0, r: 0.04, bg: '#7fe0a8' }] }; } },
  { id: 'S15', f(t, d) { const s = getSet('stage'); s.coins.visible = false; s.cracks.forEach(c => c.visible = true); s.chunk.visible = false; s.tapes.forEach(x => x.visible = false);
      const fp = s.fp || (s.fp = flutter(s.S, 160, 0, 0, 9, 7, 6, ['#efe4cf', '#d9cdb4', '#ff8a7a'], [0.18, 0.06], 12)); fp.at(t);
      const a = lerp(0.9, -0.5, t / d); s.C.position.set(Math.sin(a) * 4.6, lerp(3.4, 2.6, t / d), Math.cos(a) * 4.6); s.C.lookAt(0, 1.3, 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'GOOGLE: WORST DAY EVER', x: 320, y: 110, s: pop(t, 2.5), r: -0.04 }, { txt: 'CHIPS: BEAR MARKET', x: 960, y: 160, s: pop(t, 5), r: 0.04, bg: '#e3c77a' }, { txt: '-$5 TRILLION IN 4 WEEKS', x: 640, y: 610, s: pop(t, 9), r: -0.02, bg: '#c2372d', col: '#fff' }] }; }, after() { const s = getSet('stage'); if (s.fp) s.fp.im.visible = false; } },
];
const ACT3 = [
  { id: 'S16', card: 'The Ballot Box' },
  { id: 'S17', f(t, d, L) { const s = getSet('ballot'); const gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6));
      const sk = L.find(l => l.who === 'GUS'); const t0 = sk ? sk.t0 : d - 3, t1 = sk ? sk.t1 : d;
      const n = t < t0 - 1 ? 0 : Math.min(8, Math.floor((t - (t0 - 1)) / ((t1 - t0 + 1) / 8)) + 1);
      s.boxes.forEach((b, i) => b.res.visible = i < n);
      const cur = Math.min(7, Math.max(0, n - 1)); const bx = -2.8 + cur * 0.8;
      s.stamp.position.set(bx, 0.77 + 0.43 + (n > 0 ? Math.abs(Math.sin((t - t0) * 7)) * 0.25 : 0.4), -1.0); s.stamp.visible = n > 0 && n < 9;
      const gx = n > 0 ? bx + 0.45 : -2.35; gus.set(gx, -0.3, pose({ view: 'front', expr: n >= 8 ? 'surprised' : 'sleepy', seed: 6, arms: [null, { h: [0.6, -0.1], hand: 'fist' }] }, t, L, 'GUS'), s.C);
      if (n === 0) { const k = E(k01(t, 0, t0)); s.C.position.set(lerp(-4, -1.5, k), 2.4, 3.2); s.C.lookAt(lerp(-2, 0, k), 0.9, -1); } else { s.C.position.set(gx + 0.6, 1.5, 2.4); s.C.lookAt(gx - 0.3, 0.95, -1.0); }
      return { scene: s.S, cam: s.C, tags: [{ txt: '41 LOCAL VOTES', x: 300, y: 100, s: n === 0 ? pop(t, 6) : 0, r: -0.04 }, { txt: '40 SAID NO', x: 980, y: 140, s: n === 0 ? pop(t, 12) : 0, r: 0.04, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S18', f(t, d) { const s = getSet('cork'); const it = s.items; if (!s.c18) { s.c18 = [['BROWN WINS OHIO', '"I DO NOT WORK FOR DATA CENTERS"', -1.1, 2.15, -0.06], ['HINOJOSA BEATS ABBOTT', 'PROMISED DATA CENTER BAN', 0, 2.25, 0.04], ['SANDERS', '"NATIONAL DATA CENTER MORATORIUM NOW"', 1.1, 2.12, -0.03], ['YOUR POWER BILL', '+$25-30 / MONTH', 0, 1.25, 0.05]].map(([h, sub, x, y, rz], i) => { const p = poster(0.85, 0.6, (c, w, hh) => { c.fillStyle = i === 3 ? '#f4ecd8' : '#e9dfc8'; c.fillRect(0, 0, w, hh); txt(c, h, w / 2, hh * 0.18, hh * 0.13, i === 3 ? '#c2372d' : '#1e1612'); txt(c, sub, w / 2, hh * 0.42, hh * 0.075, '#3a2a20'); c.fillStyle = 'rgba(30,22,18,0.3)'; for (let k = 0; k < 6; k++) c.fillRect(w * 0.08, hh * 0.55 + k * hh * 0.06, w * 0.84, hh * 0.02); }); p.position.set(x, y, s.boardZ + 0.004 + i * 0.001); p.rotation.z = rz; p.castShadow = true; it.add(p);
        const pin = sph(0.022, std(0xc2372d, { roughness: 0.3 }), x, y + 0.26, s.boardZ + 0.03); it.add(pin); return { p, pin }; });
        s.str = []; for (let i = 0; i < 3; i++) { const a = s.c18[i].p.position, b = s.c18[3].p.position; const len = Math.hypot(a.x - b.x, a.y - b.y); const st = box(len, 0.008, 0.006, std(0xc2281e), (a.x + b.x) / 2, (a.y + b.y) / 2 + 0.1, s.boardZ + 0.02, false); st.rotation.z = Math.atan2(a.y - b.y, a.x - b.x); it.add(st); s.str.push(st); } }
      it.visible = true; const times = [0.3, 6, 11, 16.5]; s.c18.forEach((c, i) => { const v = t > times[i]; c.p.visible = c.pin.visible = v; c.p.scale.setScalar(v ? outBack(k01(t, times[i], times[i] + 0.35)) : 1); }); s.str.forEach((st, i) => st.visible = t > 17 + i * 0.4);
      const foc = [[-1.1, 2.15], [-1.1, 2.15], [0, 2.25], [1.1, 2.12], [0, 1.6]]; const fi = t < 6 ? 0 : t < 11 ? 2 : t < 16.5 ? 3 : 4; const tgt = foc[fi]; const cx = s.cx == null ? tgt[0] : s.cx; s.cx = lerp(cx, tgt[0], 0.08); s.cy = lerp(s.cy == null ? tgt[1] : s.cy, tgt[1], 0.08);
      s.C.position.set(s.cx * 0.8, s.cy - 0.2, s.z0 + (fi === 4 ? 3.2 : 2.0)); s.C.lookAt(s.cx, s.cy - 0.05, s.z0);
      return { scene: s.S, cam: s.C, tags: [{ txt: '56% SAID AI MATTERED', x: 640, y: 630, s: t > 18 ? pop(t, 18) : 0, r: -0.02, bg: '#e3c77a' }] }; }, after() { const s = getSet('cork'); s.items.visible = false; } },
  { id: 'S19', f(t, d, L) { const s = getSet('site'); const wen = s.wen || (s.wen = castCard(s.S, 'wendell', 1.8)), clerk = s.clerk || (s.clerk = castCard(s.S, 'clerk', 1.5));
      const sk = L.find(l => l.who === 'WENDELL'); const st = sk ? sk.t0 - 2.2 : d; s.note.visible = t > st + 1.2;
      const cx = t < st ? 4 : t < st + 1.2 ? lerp(4, 1.3, E(k01(t, st, st + 1.2))) : lerp(1.3, 4.5, E(k01(t, st + 1.6, st + 3.2)));
      if (t > st - 0.5 && t < st + 3.4) clerk.set(cx, 0.9, (t < st + 1.2 || t > st + 1.6) ? slidePose(t, t < st + 1.2 ? -1 : 1, 2.2, 1.5) : pose({ view: 'q', dir: -1, expr: 'happy' }, t), s.C); else clerk.hide();
      if (t < st) { const k = E(k01(t, 0, st)); s.C.position.set(lerp(-6, -2.5, k), lerp(5, 2.6, k), lerp(9, 4.5, k)); s.C.lookAt(lerp(2, 0, k), lerp(3, 0.9, k), lerp(-10, 0, k)); } else { s.C.position.set(-0.9, 1.75, 3.0); s.C.lookAt(-0.8, 1.1, 0); }
      wen.set(-1.6, 0.3, pose({ view: 'q', expr: sk && t > sk.t0 ? 'sad' : 'happy', look: [0.8, 0.5], seed: 7, arms: [null, { h: [0.95, 0.5], hand: 'open' }] }, t, L, 'WENDELL'), s.C);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'LAND + POWER + PERMIT', x: 640, y: 100, s: t < st ? pop(t, 5) : 0, r: -0.02 }, { txt: 'ALL LOCAL', x: 980, y: 170, s: t < st ? pop(t, 8.5) : 0, r: 0.05, bg: '#e3c77a' }, { txt: 'NO LAW PASSED. NOT ONE.', x: 640, y: 620, s: sk && t > sk.t1 + 0.3 ? pop(t, sk.t1 + 0.3) : 0, r: -0.02, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S20', f(t, d) { const s = getSet('stage'); s.coins.visible = false; s.cracks.forEach((c, i) => c.visible = i < 4); if (s.fp) s.fp.im.visible = false;
      const cf = s.cf || (s.cf = flutter(s.S, 220, 0, 0, 10, 8, 5, ['#c2372d', '#d9a23a', '#4f7f86', '#efe4cf', '#3f9b5f'], [0.07, 0.04], 33)); cf.at(t * 0.8);
      const pip = s.pip || (s.pip = castCard(s.S, 'pip', 1.5)), mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.55));
      pip.set(-1.5, 1.6, (() => { const P = pose({ view: 'front', expr: 'laugh', seed: 8, arms: [{ h: [-0.95, -0.9], hand: 'open' }, { h: [0.95, -0.9], hand: 'open' }] }, t); P.bob = -0.25 * Math.abs(Math.sin(t * 5)); return P; })(), s.C);
      mab.set(1.5, 1.6, (() => { const P = pose({ view: 'front', expr: 'happy', seed: 9, arms: [{ h: [-0.95, -0.9], hand: 'open' }, { h: [0.95, -0.9], hand: 'open' }] }, t); P.bob = -0.25 * Math.abs(Math.sin(t * 5 + 1)); return P; })(), s.C);
      const k = E(k01(t, 0, d)); s.C.position.set(Math.sin(t * 3) * 0.05, 1.9 + Math.sin(t * 4) * 0.04, lerp(6.2, 5.2, k)); s.C.lookAt(0, 1.05, 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'DOW +1,569', x: 640, y: 110, s: pop(t, 1.2), r: -0.03, bg: '#3f9b5f', col: '#fff', size: 48 }, { txt: 'OIL DOWN', x: 300, y: 600, s: pop(t, 4), r: -0.04 }, { txt: '...NEW CONGRESS?', x: 1000, y: 600, s: pop(t, d - 4), r: 0.04, bg: '#e3c77a' }] }; }, after() { const s = getSet('stage'); if (s.cf) s.cf.im.visible = false; if (s.pip) s.pip.hide(); if (s.mab) s.mab.hide(); } },
];
