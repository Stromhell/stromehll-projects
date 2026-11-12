/* ACT 0: cold open + ACT 1: the seven-slice pie */
Object.assign(SETB, {
  calendar() {
    const { S, C } = scene(0x0a0705, [5, 12]);
    S.add(new THREE.AmbientLight(0x3a2a20, 0.6));
    const z0 = roomShell(S, { w: 6, d: 4, h: 3, wall: TX.wall('#4a3a2a', '#40321f', [3, 1]), floor: TX.wood('#4a2e1c', [3, 3]) });
    S.add(box(1.3, 1.5, 0.03, std(0x3a281c), 0, 1.7, z0 + 0.02));
    const pages = canvasTex(512, 600); const pg = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.4), tmat(pages.t, { roughness: 0.9 })); pg.position.set(0, 1.7, z0 + 0.04); S.add(pg);
    const flip = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), tmat(pages.t, { roughness: 0.9, side: THREE.DoubleSide })); flip.position.set(0, 2.3, z0 + 0.06); S.add(flip);
    function draw(month, day, dow) { const x = pages.x; x.fillStyle = '#f2ead8'; x.fillRect(0, 0, 512, 600); x.fillStyle = '#c2372d'; x.fillRect(0, 0, 512, 120); txt(x, month, 256, 62, 70, '#fff'); txt(x, dow, 256, 210, 60, '#5a4632'); txt(x, day, 256, 380, 230, '#1e1612'); x.fillStyle = '#1e1612'; for (let i = 0; i < 6; i++) x.fillRect(60 + i * 75, 10, 16, 30); pages.t.needsUpdate = true; }
    S.add(at(P3.plant(), -1.7, 0, z0 + 0.4)); S.add(at(P3.radiator(), 1.6, 0, z0 + 0.1));
    S.add(at(P3.frame(0.5, 0.4, (x, w, h) => { x.fillStyle = '#2f4d6b'; x.fillRect(0, 0, w, h); txt(x, '$', w / 2, h / 2, h * 0.6, '#e3c77a'); }), -1.6, 1.8, z0 + 0.03));
    keyLight(S, 0xffd9a0, 45, [0.5, 2.8, z0 + 2.5], [0, 1.7, z0], 0.45);
    dust(S, 0, 1.6, z0 + 1, 2, 1.5, 1.5, 100);
    return { S, C, flip, draw, z0 };
  },
  hq() {
    const { S, C } = scene(0xf0a060, [30, 90]);
    S.add(new THREE.HemisphereLight(0xffd0a0, 0x3a2a20, 0.9));
    const sun = new THREE.DirectionalLight(0xffb070, 2.2); sun.position.set(-20, 12, 10); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, far: 80 }); S.add(sun);
    S.add(plane(200, 200, tmat(TX.concrete('#8a7a6a', [30, 30])), 0, 0, 0, -Math.PI / 2));
    S.add(plane(160, 8, tmat(TX.concrete('#3a3634', [40, 2])), 0, 0.01, 8, -Math.PI / 2));
    // glass HQ: stepped glass blocks with mullions (generic building, no real logo)
    const glass = tmat(ctex('glassfacade', 512, 512, (x, w, h, r) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9fc0d8'); g.addColorStop(1, '#f0b880'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) { x.fillStyle = r() < 0.3 ? 'rgba(255,230,180,0.55)' : 'rgba(30,50,70,0.25)'; x.fillRect(i * 32 + 2, j * 32 + 2, 28, 28); } }, [2, 2]), { roughness: 0.2, metalness: 0.1 }), mull = std(0x2a2a2a, { metalness: 0.6 });
    [[0, 0, 26, 9, 14], [-12, -4, 14, 7, 10], [12, -3, 14, 6, 10]].forEach(([x, z, w, h, d]) => { S.add(box(w, h, d, glass, x, h / 2, z - 10)); for (let i = 0; i <= w; i += 1.5) S.add(box(0.08, h, 0.1, mull, x - w / 2 + i, h / 2, z - 10 + d / 2 + 0.05, false)); for (let j = 0; j <= h; j += 1.5) S.add(box(w, 0.08, 0.1, mull, x, j, z - 10 + d / 2 + 0.05, false)); });
    S.add(box(26.4, 0.4, 14.4, std(0xd9cdb4), 0, 9.2, -10));
    // palms
    const trunk = std(0x7a5a3a, { roughness: 0.9 }), leaf = std(0x3f6b3f, { side: THREE.DoubleSide });
    for (let i = 0; i < 8; i++) { const x = -21 + i * 6, z = 4; const g = group(cyl(0.18, 0.28, 6, trunk)); for (let k = 0; k < 9; k++) { const l = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6), leaf); l.scale.set(1.8, 0.12, 0.45); const a = k / 9 * TAU; l.position.set(Math.cos(a) * 1.4, 6 - 0.3, Math.sin(a) * 1.4); l.rotation.set(0, -a, -0.35); l.castShadow = true; g.add(l); } at(g, x, 0, z); S.add(shadowy(g)); }
    for (let i = 0; i < 6; i++) { const pm = std([0xb8352a, 0x2f4d6b, 0xe3c77a, 0x3f3f3f, 0xe8e0cc, 0x6b3f5e][i], { metalness: 0.5, roughness: 0.3 }), gl = std(0x1a2430, { metalness: 0.8, roughness: 0.1 }), tyre = std(0x151515, { roughness: 0.8 }), rim = std(0xc0c4c8, { metalness: 0.9, roughness: 0.25 });
      const car = group(rbox(1.8, 0.62, 4.4, 0.16, pm, 0, 0.3, 0), rbox(1.56, 0.5, 2.3, 0.18, gl, 0, 0.86, -0.15)); for (const [wx, wz] of [[-0.86, 1.35], [0.86, 1.35], [-0.86, -1.35], [0.86, -1.35]]) { const w = cyl(0.34, 0.34, 0.24, tyre, 0, -0.12, 0, 24); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.34, wz); car.add(w); const r = cyl(0.2, 0.2, 0.26, rim, 0, -0.13, 0, 16); r.rotation.z = Math.PI / 2; r.position.set(wx, 0.34, wz); car.add(r); }
      for (const hx of [-0.6, 0.6]) { car.add(box(0.32, 0.1, 0.03, basic(0xfff2d0), hx, 0.68, 2.2, false)); car.add(box(0.32, 0.1, 0.03, basic(0xb02020), hx, 0.68, -2.2, false)); } car.position.set(-14 + i * 5.5, 0, 9 + (i % 2) * 1.2); S.add(shadowy(car)); }
    return { S, C };
  },
  dollar() {
    const { S, C } = scene(0x060403, [6, 14]);
    S.add(new THREE.AmbientLight(0x30241a, 0.5));
    S.add(plane(8, 6, tmat(TX.wood('#4a2e1c', [2, 2]), { roughness: 0.45 }), 0, 0, 0, -Math.PI / 2));
    const bill = canvasTex(1024, 440); const b = bill.x; b.fillStyle = '#b8c9a4'; b.fillRect(0, 0, 1024, 440); b.strokeStyle = '#2f4d3a'; b.lineWidth = 8; b.strokeRect(20, 20, 984, 400); b.lineWidth = 2; b.strokeRect(40, 40, 944, 360);
    for (let i = 0; i < 40; i++) { b.strokeStyle = 'rgba(47,77,58,0.25)'; b.beginPath(); b.arc(512, 220, 40 + i * 6, 0, TAU); b.stroke(); } b.fillStyle = '#b8c9a4'; b.beginPath(); b.ellipse(512, 220, 120, 150, 0, 0, TAU); b.fill(); b.stroke();
    txt(b, '$1', 512, 220, 130, '#2f4d3a'); txt(b, 'ONE DOLLAR', 512, 380, 40, '#2f4d3a'); txt(b, '1', 90, 90, 70, '#2f4d3a'); txt(b, '1', 934, 350, 70, '#2f4d3a'); b.setLineDash([16, 12]); b.strokeStyle = '#c2372d'; b.lineWidth = 6; b.beginPath(); b.moveTo(942, 0); b.lineTo(942, 440); b.stroke(); bill.t.needsUpdate = true;
    const main = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.004, 0.99), tmat(bill.t, { roughness: 0.85 })); main.position.set(0, 0.003, 0); main.castShadow = main.receiveShadow = true;
    // the 8-cent strip is its own piece so it can slide away
    const g = new THREE.Group(); g.add(main); g.rotation.y = -0.06; S.add(g);
    const stripT = canvasTex(80, 440); stripT.x.drawImage(bill.c, 944, 0, 80, 440, 0, 0, 80, 440); stripT.t.needsUpdate = true; const strip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.004, 0.99), tmat(stripT.t)); strip.castShadow = true; g.add(strip);
    main.scale.x = 1; // keep full bill; strip sits over the right end
    strip.position.set(1.06, 0.006, 0);
    // scissors
    const steel = std(0xb0b0b0, { metalness: 0.95, roughness: 0.2 }), handle = std(0xc2372d, { roughness: 0.4 }); const sc = new THREE.Group();
    const bsh = new THREE.Shape(); bsh.moveTo(0, -0.04); bsh.quadraticCurveTo(0.3, -0.03, 0.52, 0); bsh.lineTo(0, 0.012); bsh.lineTo(0, -0.04); const bg = new THREE.ExtrudeGeometry(bsh, { depth: 0.008, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 1 }); bg.rotateX(-Math.PI / 2); const bl1 = new THREE.Mesh(bg, steel), bl2 = new THREE.Mesh(bg, steel); bl2.scale.z = -1; bl2.position.y = 0.012; sc.add(cyl(0.014, 0.014, 0.03, std(0x555555, { metalness: 0.9 }), 0, -0.005, 0)); const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 10, 24), handle), h2 = h1.clone(); h1.rotation.x = h2.rotation.x = Math.PI / 2; h1.position.set(-0.08, 0, 0.05); h2.position.set(-0.08, 0.014, -0.05); sc.add(bl1, bl2, h1, h2); shadowy(sc); S.add(sc);
    S.add(at(P3.mug(0x2f4d6b), -1.6, 0, -0.9)); S.add(at(P3.papers(5, 21), 1.7, 0, -1.0)); const pen = cyl(0.008, 0.008, 0.16, std(0x1e1612)); pen.rotation.z = Math.PI / 2; pen.position.set(-1.3, 0.008, 0.7); S.add(pen);
    keyLight(S, 0xffd9a0, 60, [-0.6, 3.2, 1.0], [0, 0, 0], 0.55);
    return { S, C, strip, sc, g };
  },
  receipt() {
    const { S, C } = scene(0x070504, [8, 20]);
    S.add(new THREE.AmbientLight(0x30241a, 0.55));
    const stepM = tmat(TX.wood('#3a281c', [1, 1]), { roughness: 0.6 }); const N = 12;
    for (let i = 0; i < N; i++) S.add(box(4, 0.25, 0.4, stepM, 0, 0.125 + (N - 1 - i) * 0.25, -i * 0.4 + 2));
    for (let i = 0; i < N; i++) S.add(box(4, (N - 1 - i) * 0.25 + 0.001, 0.4, std(0x1e1610), 0, ((N - 1 - i) * 0.25) / 2, -i * 0.4 + 2));
    S.add(plane(12, 14, tmat(TX.wall('#2a2320', null, [4, 2])), 0, 4, 4.5, 0, Math.PI)); S.add(plane(20, 20, tmat(TX.tile('#2a2420', '#221c19', [8, 8])), 0, 0, 0, -Math.PI / 2));
    for (const sx of [-2.05, 2.05]) for (let i = 0; i < N; i += 2) S.add(cyl(0.025, 0.025, 0.9, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), sx, 0.25 + (N - 1 - i) * 0.25, -i * 0.4 + 2));
    // the receipt: a long canvas ribbon following the steps (built as segments)
    const rc = canvasTex(256, 2048); const x = rc.x; x.fillStyle = '#f6f0e2'; x.fillRect(0, 0, 256, 2048); x.fillStyle = '#1e1612'; x.font = `34px ${HAND}`; x.textAlign = 'center';
    const rows = [['RECEIPT', ''], ['NVIDIA CHIPS', '$$$$'], ['DATA CENTERS', '$$$'], ['POWER', '$$'], ['LAND', '$'], ['COOLING', '$'], ['2026 TOTAL', '$700B'], ['2027 TOTAL', '$1T+'], ['NVIDIA QTR', '$96B'], ['(2X A YEAR AGO)', '']];
    rows.forEach((r, i) => { const y = (i + 1) * 176.3 + 60; x.save(); x.translate(128, y); x.rotate(Math.PI); x.textAlign = 'left'; x.fillText(r[0], -110, 12); x.textAlign = 'right'; x.fillText(r[1], 110, 12); x.restore(); x.fillStyle = 'rgba(30,22,18,0.3)'; x.fillRect(18, y - 40, 220, 2); x.fillStyle = '#1e1612'; }); rc.t.needsUpdate = true;
    const rib = new THREE.Group(); S.add(rib);
    const segs = []; let v = 0; // tread then riser alternately
    for (let i = 0; i < N; i++) { const y = 0.25 + (N - 1 - i) * 0.25 + 0.003, z = -i * 0.4 + 2; segs.push({ a: [z + 0.2, y], b: [z - 0.2, y], hor: true }); if (i < N - 1) segs.push({ a: [z - 0.2, y], b: [z - 0.2, y - 0.25], hor: false }); }
    const total = segs.reduce((s, q) => s + Math.hypot(q.b[0] - q.a[0], q.b[1] - q.a[1]), 0);
    segs.forEach(q => { const len = Math.hypot(q.b[0] - q.a[0], q.b[1] - q.a[1]); const g = new THREE.PlaneGeometry(1.5, len); const uv = g.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setY(k, 1 - (v + (1 - uv.getY(k)) * len) / total); const m = new THREE.Mesh(g, tmat(rc.t, { roughness: 0.9, side: THREE.DoubleSide })); m.receiveShadow = true;
      if (q.hor) { m.rotation.x = -Math.PI / 2; m.position.set(0, q.a[1], (q.a[0] + q.b[0]) / 2); } else { m.position.set(0, (q.a[1] + q.b[1]) / 2, q.a[0] + 0.004); }
      m.userData.v0 = v / total; m.userData.v1 = (v + len) / total; v += len; rib.add(m); });
    // reveal top-down by distance along the ribbon (order fixed above: segs reversed = top first)
    const printer = rbox(1.0, 0.35, 0.5, 0.05, std(0x2a2a2a, { roughness: 0.4 }), 0, 0.25 + (N - 1) * 0.25, 2.1); S.add(printer); S.add(at(new THREE.PointLight(0xffd0a0, 6, 12, 1.4), 0, 4, -2));
    keyLight(S, 0xffd9a0, 70, [1.5, 6, 3], [0, 1.5, -1], 0.5);
    dust(S, 0, 2, 0, 3, 3, 4, 150);
    return { S, C, rib, top: [0.25 + (N - 1) * 0.25, 2] };
  },
});

/* ---------------- shots ---------------- */
const ACT0 = [
  { id: 'S01', f(t, d) { const s = getSet('stage'); s.cracks.forEach((c, i) => c.visible = i < 1); s.chunk.visible = false; s.tapes.forEach(x => x.visible = false); s.coinsAt(Math.max(0, t - 1.2));
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-3.5, -1.2, k), lerp(3.2, 2.0, k), lerp(8.5, 3.6, k)); s.C.lookAt(0, 1.2, 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: '$400,000,000,000', x: 330, y: 110, s: pop(t, 1.6), r: -0.04, size: 44 }] }; } },
  { id: 'S02', f(t, d) { const s = getSet('stage'); s.coinsAt(5 + t * 1.6);
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(2.8, 2.6, k), lerp(1.9, 1.15, k), lerp(2.4, 3.2, k)); s.C.lookAt(lerp(0.6, 0.9, k), lerp(1.3, 0.55, k), 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: '$50 MILLION / SECOND', x: 860, y: 110, s: pop(t, 0.8), r: 0.04, size: 40 }, { txt: 'DID NOTHING WRONG', x: 380, y: 600, s: pop(t, 5.2), r: -0.03, size: 34, bg: '#e3c77a' }] }; } },
  { id: 'S03', f(t, d, L) { const s = getSet('office'); s.doc.visible = false; const jan = s.jan || (s.jan = castCard(s.S, 'janitor', 1.7));
      const ring = t > 1.0 && Math.floor(t * 3) % 2 === 0; s.phone.userData.screen.material.color.set(ring ? 0x9fe0ff : 0x112233);
      const enterEnd = 2.6; const x = lerp(3.4, 1.55, k01(t, 0.6, enterEnd));
      const P = t < enterEnd ? slidePose(t, -1, 0.93, 1.7) : pose({ view: 'q', dir: -1, expr: t > 5.8 ? 'scared' : 'surprised', look: t > 5.8 ? [-1, 0.3] : [-1, 0.1] }, t, L, 'JANITOR');
      s.C.position.set(lerp(0.6, 0.35, k01(t, 0, d)), 1.45, lerp(4.6, 4.2, k01(t, 0, d))); s.C.lookAt(0.2, 0.9, -0.8);
      jan.set(t > 5.9 ? x + (t - 5.9) * 1.2 : x, 0.6, P, s.C);
      const pp = proj(s.C, V3(0.35, 0.85, -0.45));
      return { scene: s.S, cam: s.C, tags: [{ txt: '400 MISSED CALLS', x: pp[0], y: pp[1] - 70, s: t > 1.0 ? pop(t, 1.0) * 0.7 : 0, r: -0.05, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S04', f(t, d) { const s = getSet('stage'); s.coins.visible = false; s.cracks.forEach((c, i) => c.visible = i < (t > 4 ? 2 : 1));
      const a = lerp(-0.6, 0.8, t / d); s.C.position.set(Math.sin(a) * 4.2, 2.4, Math.cos(a) * 4.2); s.C.lookAt(0, 1.2, 0);
      const tags = [{ txt: 'WHY DID IT CRASH?', x: 300, y: 130, s: pop(t, 0.6), r: -0.05 }, { txt: 'AI BUBBLE?', x: 980, y: 170, s: pop(t, 2.2), r: 0.05, bg: '#e3c77a' }, { txt: 'YOUR 401(k)?', x: 640, y: 610, s: pop(t, 9.5), r: -0.02, bg: '#c2372d', col: '#fff' }];
      return { scene: s.S, cam: s.C, tags: t < d - 3.4 ? tags : [], post: X => { const ct = t - (d - 3.4); if (ct > 0) { X.save(); X.globalAlpha = k01(ct, 0, 0.35); X.fillStyle = '#060504'; X.fillRect(0, 0, W, H); X.globalAlpha = Math.min(k01(ct, 0.3, 0.8), 1 - k01(ct, 3.0, 3.4)); X.font = `76px ${HAND}`; X.fillStyle = '#f4efe6'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('Two Thursdays.', W / 2, H / 2 - 16); X.font = `30px ${HAND}`; X.fillStyle = '#a8998a'; X.fillText('5 November  ·  12 November', W / 2, H / 2 + 50); X.restore(); } } }; } },
  { id: 'S05', f(t, d) {
      if (t < 3.2) { const s = getSet('calendar'); const ph = k01(t, 0.3, 2.6); const steps = ['NOVEMBER|12|THURSDAY', 'NOVEMBER|5|THURSDAY', 'OCTOBER|29|THURSDAY', 'OCTOBER|6|TUESDAY']; const i = Math.min(3, Math.floor(ph * 4)), f = (ph * 4) % 1;
        const cur = steps[i].split('|'); s.draw(cur[0], cur[1], cur[2]); s.flip.visible = i < 3 && f > 0.05; s.flip.position.y = 2.3 - f * 2.4; s.flip.position.z = s.z0 + 0.06 + f * 0.8; s.flip.rotation.z = f * 0.9; s.flip.rotation.x = -f * 1.2;
        s.C.position.set(0.3, 1.75, s.z0 + 3.4 - t * 0.15); s.C.lookAt(0, 1.7, s.z0); return { scene: s.S, cam: s.C }; }
      const s = getSet('hq'); const k = E(k01(t, 3.2, d)); s.C.position.set(lerp(-14, -6, k), lerp(2.0, 3.5, k), 22); s.C.lookAt(0, 4, -8);
      return { scene: s.S, cam: s.C, vig: 0.55, tags: [{ txt: 'SANTA CLARA, CALIFORNIA', x: 640, y: 620, s: pop(t, 3.6), r: -0.02 }] }; } },
];
const ACT1 = [
  { id: 'S06', card: 'The Seven-Slice Pie' },
  { id: 'S07', f(t, d) { const s = getSet('dollar');
      const cut = k01(t, 9.5, 10.6), slide = E(k01(t, 10.8, 12.5)); s.sc.position.set(0.97, 0.03, lerp(-0.8, 0.45, cut)); s.sc.rotation.y = -Math.PI / 2 - 0.06; s.sc.children[1].rotation.y = 0.25 * Math.sin(t * 12) * (cut > 0 && cut < 1 ? 1 : 0); s.sc.visible = t > 8.8 && t < 13;
      s.strip.position.set(1.06 + slide * 0.5, 0.006, slide * 0.2); s.strip.rotation.y = slide * 0.3;
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(0.2, 0.6, k), lerp(3.2, 2.2, k), lerp(1.6, 1.0, k)); s.C.lookAt(lerp(0, 0.6, k), 0, 0);
      const sp = proj(s.C, V3(1.4, 0.05, 0.1));
      return { scene: s.S, cam: s.C, tags: [{ txt: '$5.4 TRILLION', x: 260, y: 110, s: pop(t, 3.0), r: -0.04 }, { txt: '8¢ OF EVERY $1', x: sp[0], y: sp[1] - 120, s: pop(t, 12.3), r: 0.05, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S08', f(t, d, L) { const s = getSet('kitchen'); s.dc.visible = false; s.dcl.intensity = 0; s.key.color.set(0xffd090);
      const mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.55)), pip = s.pip || (s.pip = castCard(s.S, 'pip', 1.5));
      const sk = L.find(l => l.who === 'MABEL'); const skitT = sk ? sk.t0 - 0.6 : d;
      const look = t > skitT;
      s.wedges.forEach((w, i) => { w.position.y = 0.065 + (look ? 0.03 * Math.max(0, Math.sin((t - skitT) * 3 - i * 0.4)) : 0); });
      const k = E(k01(t, 0, d)); if (!look) { s.C.position.set(lerp(-0.4, 0.2, k), lerp(2.6, 2.2, k), lerp(3.4, 2.6, k)); s.C.lookAt(0, 0.8, -0.5); } else { s.C.position.set(0, 1.9, 3.4); s.C.lookAt(0, 0.95, -0.5); }
      const salad = L.filter(l => l.who === 'MABEL')[1];
      mab.set(-1.75, -0.3, pose({ view: 'q', expr: salad && t > salad.t0 - 0.2 ? 'sad' : 'happy', look: [0.7, 0.4], arms: [null, salad && t > salad.t0 ? { h: [0.8, 1.0], hand: 'open' } : { h: [0.9, 0.7], hand: 'open' }], seed: 1 }, t, L, 'MABEL'), s.C);
      pip.set(1.75, -0.3, pose({ view: 'q', dir: -1, expr: 'surprised', look: [-0.8, 0.5], seed: 2 }, t, L, 'PIP'), s.C);
      const pp = proj(s.C, V3(0, 1.25, -0.5));
      return { scene: s.S, cam: s.C, tags: [{ txt: 'MY INDEX FUND', x: pp[0], y: pp[1] - 90, s: pop(t, 1.0) * 0.8, r: -0.03 }, { txt: '7 COMPANIES = 1/3', x: 640, y: 620, s: pop(t, 12.5), r: 0.02, bg: '#e3c77a' }] }; } },
  { id: 'S09', f(t, d) { const s = getSet('receipt'); const rev = E(k01(t, 4, d - 6));
      s.rib.children.forEach(m => m.visible = m.userData.v0 <= rev * 1.0001);
      const zf = lerp(1.8, -2.4, rev), yf = lerp(3.0, 0.3, rev);
      s.C.position.set(1.3, yf + 1.5, zf - 2.0); s.C.lookAt(0, yf - 0.2, zf + 0.5);
      return { scene: s.S, cam: s.C, tags: [{ txt: '$700B THIS YEAR', x: 300, y: 120, s: pop(t, 10.5), r: -0.04 }, { txt: '$1 TRILLION+ NEXT YEAR', x: 900, y: 170, s: pop(t, 14), r: 0.04, bg: '#e3c77a' }, { txt: 'NVIDIA: $96B IN 3 MONTHS', x: 640, y: 610, s: pop(t, 20), r: -0.02 }, { txt: 'CRACKS...', x: 1050, y: 560, s: pop(t, d - 3.5), r: 0.06, bg: '#c2372d', col: '#fff' }] }; } },
];
