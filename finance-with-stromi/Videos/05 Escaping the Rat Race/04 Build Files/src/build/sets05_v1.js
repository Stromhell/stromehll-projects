/* Finance with Stromi 05 (Escaping the Rat Race): cast tweaks + new 3D sets. Needs engine.js + sets02.js + sets03.js + sets04.js. */
'use strict';
/* ---------- cast (all made up) ---------- */
CH.jimmy = RH.character({ name: 'Jimmy', skin: '#e8b890', hair: { style: 'tuft', color: '#6a3e1e' }, top: { type: 'tux', color: '#2f3d52', accent: '#e8e4dc' }, legs: { color: '#2f3d52', len: 1.1 }, tie: 'long', tieColor: '#c2372d', shoes: { color: '#2a1d17', sole: '#8a6a46' } });
CH.ray = RH.character({ name: 'Ray', skin: '#e3b48e', head: { shape: 'bean', w: 1, h: 1 }, nose: 'bulb', hair: { style: 'bald', color: '#cfc8bc' }, hat: { type: 'cap', color: '#2f4d6b' }, body: { shape: 'pear', w: 1.05, h: 1 }, top: { type: 'overalls', color: '#3a5a7a', accent: '#d8d0c0' }, legs: { color: '#3a5a7a' }, shoes: { color: '#2a1d17', sole: '#8a6a46' } });
CH.guru = RH.character(Object.assign({}, CAST.gus, { name: 'Guru', top: { type: 'tux', color: '#7a2a8a', accent: '#ffd36a' }, tie: 'bow', tieColor: '#ffd36a' }));

/* ---------- props ---------- */
const P5 = {
  news(head, sub, date) { return board(0.62, 0.86, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#ece4d0'); ltxt(x, o.mast || 'THE DAILY LEDGER', w / 2, h * 0.06, h * 0.05, INK, 'center'); x.fillStyle = INK; x.fillRect(w * 0.05, h * 0.1, w * 0.9, 4); ltxt(x, o.date || date || '', w / 2, h * 0.13, h * 0.025, '#5a4a3a', 'center');
      const H = (o.head || head || '').split('|'); H.forEach((l, i) => ltxt(x, l, w / 2, h * (0.22 + i * 0.075), h * 0.068, INK, 'center'));
      ltxt(x, o.sub || sub || '', w / 2, h * (0.24 + H.length * 0.075), h * 0.03, '#3a2a20', 'center');
      x.fillStyle = '#b8ad96'; x.fillRect(w * 0.08, h * 0.5, w * 0.4, h * 0.3); for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(30,22,18,0.35)'; x.fillRect(w * 0.53, h * (0.5 + i * 0.022), w * (0.3 + (i * 37 % 10) / 100), 3); x.fillRect(w * 0.08, h * (0.83 + (i % 6) * 0.022), w * 0.84, 3); } }); },
  wheel(r) { const g = group(); const m = std(0xb8bcc4, { metalness: 0.8, roughness: 0.3 }); const rot = new THREE.Group(); g.add(rot);
    for (const z of [-0.35, 0.35]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 10, 48), m); ring.position.z = z; rot.add(ring); for (let i = 0; i < 6; i++) { const sp = box(0.02, r * 2, 0.02, m, 0, 0, z, true); sp.rotation.z = i / 6 * Math.PI; rot.add(sp); } }
    for (let i = 0; i < 28; i++) { const a = i / 28 * TAU; const b = cyl(0.012, 0.012, 0.7, m, 0, 0, 0, 6); b.rotation.x = Math.PI / 2; b.position.set(Math.cos(a) * r, Math.sin(a) * r, 0); rot.add(b); }
    const st = std(0x5a4a3a, { roughness: 0.6 }); g.add(box(0.08, r + 0.1, 0.08, st, 0, -(r + 0.1) / 2, -0.45), box(0.08, r + 0.1, 0.08, st, 0, -(r + 0.1) / 2, 0.45), box(1.2, 0.06, 1.0, st, 0, -r - 0.07, 0));
    g.userData.rot = rot; return shadowy(g); },
  tub(label) { const g = group(); const enamel = std(0xf0ece2, { roughness: 0.25 }), brass = std(0xc9a24a, { metalness: 0.9, roughness: 0.3 });
    const outer = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.36, 0.62, 40, 1, true), std(0xf0ece2, { roughness: 0.25, side: THREE.DoubleSide })); outer.scale.set(2.0, 1, 1); outer.position.y = 0.55; g.add(outer);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 10, 48), enamel); rim.rotation.x = Math.PI / 2; rim.scale.set(2.0, 1, 1); rim.position.y = 0.86; g.add(rim);
    const bot = new THREE.Mesh(new THREE.CircleGeometry(0.36, 40), enamel); bot.rotation.x = -Math.PI / 2; bot.scale.set(2.0, 1, 1); bot.position.y = 0.25; g.add(bot);
    for (const [fx, fz] of [[-0.55, -0.22], [0.55, -0.22], [-0.55, 0.22], [0.55, 0.22]]) g.add(sph(0.06, brass, fx, 0.2, fz), cyl(0.03, 0.05, 0.2, brass, fx, 0.0, fz));
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.38, 40), std(0x2a86c8, { transparent: true, opacity: 0.92, roughness: 0.05, metalness: 0.1, emissive: 0x0a2a48 })); water.rotation.x = -Math.PI / 2; water.scale.set(2.0, 1, 1); g.add(water);
    const tapM = std(0xd9a23a, { metalness: 0.9, roughness: 0.25 }); const tap = group(cyl(0.035, 0.035, 0.5, tapM, 0, 0, 0), box(0.25, 0.05, 0.05, tapM, 0.1, 0.5, 0)); tap.position.set(-0.78, 0.85, 0); g.add(tap);
    const stream = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0x9fd8f0, transparent: true, opacity: 0.7, depthWrite: false })); stream.position.set(-0.58, 0.9, 0); g.add(stream);
    const swirl = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 24, Math.PI * 1.5), std(0x1a3a4a, { transparent: true, opacity: 0.8 })); swirl.rotation.x = -Math.PI / 2; swirl.position.set(0.55, 0.27, 0); g.add(swirl);
    const lab = board(0.9, 0.2, (x, w, h, o) => { o = o || {}; x.fillStyle = o.bg || '#efe4cf'; x.fillRect(0, 0, w, h); ltxt(x, o.t || label || '', w / 2, h / 2, h * 0.55, o.col || INK, 'center'); }); lab.position.set(0, 1.2, 0); g.add(lab);
    // level 0..1, flow (stream radius 0..1), drain (swirl size 0..3)
    g.userData.set = (level, flow, drain, t) => { water.position.y = 0.27 + 0.55 * clamp(level, 0, 1); const f = Math.max(0.001, flow); stream.scale.set(0.012 + 0.07 * f, Math.max(0.01, 0.9 - water.position.y + 0.3), 0.012 + 0.07 * f); stream.position.y = (0.9 + water.position.y) / 2 + 0.03;
      stream.visible = flow > 0.02; swirl.scale.setScalar(0.6 + drain * 1.6); swirl.position.y = water.position.y + 0.005; swirl.rotation.z = -(t || 0) * (2 + drain * 4); swirl.visible = drain > 0.02 && level > 0.03; };
    g.userData.lab = lab; g.userData.set(0.5, 0.5, 0.5, 0); return shadowy(g); },
  easel(paint) { const g = group(); const w = std(0x5a3a22, { roughness: 0.7 }); for (const x of [-0.35, 0.35]) { const l = box(0.05, 1.6, 0.05, w, x, 0.8, 0); l.rotation.z = x > 0 ? -0.12 : 0.12; g.add(l); } const back = box(0.05, 1.7, 0.05, w, 0, 0.8, -0.35); back.rotation.x = -0.25; g.add(back);
    const p = board(0.8, 0.6, paint); p.position.set(0, 1.25, 0.05); g.add(p); g.add(box(0.9, 0.04, 0.12, w, 0, 0.92, 0.06)); g.userData.p = p; return shadowy(g); },
  notebook() { return board(0.34, 0.24, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#fbf6ea'); x.strokeStyle = 'rgba(80,110,160,0.35)'; x.lineWidth = 2; for (let i = 1; i < 12; i++) { x.beginPath(); x.moveTo(0, h * i / 12); x.lineTo(w, h * i / 12); x.stroke(); } x.strokeStyle = 'rgba(194,55,45,0.5)'; x.beginPath(); x.moveTo(w * 0.12, 0); x.lineTo(w * 0.12, h); x.stroke();
      const rows = o.rows || [['RENT', '$850'], ['FOOD', '$320'], ['GAS', '$140'], ['BILLS', '$210'], ['TAKEOUT', '$410'], ['SAVE', '$300']]; rows.forEach(([a, b], i) => { ltxt(x, a, w * 0.16, h * (0.14 + i * 0.13), h * 0.08, INK); ltxt(x, b, w * 0.9, h * (0.14 + i * 0.13), h * 0.08, a === o.hi ? REDC : INK, 'right'); if (a === o.hi) { x.strokeStyle = REDC; x.lineWidth = 5; x.beginPath(); x.ellipse(w * 0.55, h * (0.14 + i * 0.13), w * 0.42, h * 0.07, 0, 0, TAU); x.stroke(); } }); }); },
};

/* jar chart painter for survey boards: o = {title, jars:[{pct, label, col}], foot} */
function paintJars(x, w, h, o) { o = o || {}; paperBg(x, w, h, '#efe4cf'); ltxt(x, o.title || '', w / 2, h * 0.1, h * 0.075, INK, 'center'); const J = o.jars || []; const n = J.length;
  J.forEach((j, i) => { const cx = w * (i + 0.5) / n, jw = w * 0.22, jh = h * 0.52, top = h * 0.22; const k = clamp(j.k == null ? 1 : j.k, 0, 1);
    x.fillStyle = 'rgba(160,200,215,0.25)'; x.fillRect(cx - jw / 2, top, jw, jh); const fh = jh * j.pct / 100 * k; x.fillStyle = j.col || REDC; x.fillRect(cx - jw / 2, top + jh - fh, jw, fh);
    x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(cx - jw / 2, top, jw, jh); x.fillStyle = '#8a6a46'; x.fillRect(cx - jw / 2 - 8, top - 22, jw + 16, 22);
    ltxt(x, Math.round(j.pct * k) + '%', cx, top + jh * 0.3, h * 0.12, INK, 'center'); ltxt(x, j.label || '', cx, top + jh + h * 0.08, h * 0.05, INK, 'center'); });
  if (o.foot) ltxt(x, o.foot, w / 2, h * 0.94, h * 0.04, '#5a4a3a', 'center'); }

Object.assign(SETB, {
  ring() { const { S, C } = scene(0x050404, [14, 30]); S.add(new THREE.AmbientLight(0x2a2228, 0.5));
    S.add(plane(40, 40, tmat(TX.concrete('#2a2624', [12, 12])), 0, 0, 0, -Math.PI / 2));
    const mat = canvasTex(1024, 1024); mat.x.fillStyle = '#d8d0c0'; mat.x.fillRect(0, 0, 1024, 1024); mat.x.fillStyle = 'rgba(0,0,0,0.05)'; for (let i = 0; i < 400; i++) mat.x.fillRect(Math.random() * 1024, Math.random() * 1024, 6, 6); mat.x.strokeStyle = '#a8322a'; mat.x.lineWidth = 18; mat.x.beginPath(); mat.x.arc(512, 512, 180, 0, TAU); mat.x.stroke(); txt(mat.x, 'IRON', 512, 512, 110, 'rgba(168,50,42,0.5)'); mat.t.needsUpdate = true;
    const plat = rbox(6, 0.6, 6, 0.03, std(0x1e2a44, { roughness: 0.6 }), 0, 0, 0); S.add(shadowy(plat)); const top = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), tmat(mat.t, { roughness: 0.8 })); top.rotation.x = -Math.PI / 2; top.position.y = 0.605; top.receiveShadow = true; S.add(top);
    const postM = std(0xc9a24a, { metalness: 0.8, roughness: 0.3 }), padM = std(0xa8322a, { roughness: 0.5 }); const P = [[-2.9, -2.9], [2.9, -2.9], [2.9, 2.9], [-2.9, 2.9]];
    P.forEach(([x, z]) => { S.add(cyl(0.07, 0.07, 1.5, postM, x, 0.6, z)); S.add(rbox(0.22, 0.6, 0.22, 0.05, padM, x, 1.2, z)); });
    const ropeCols = [0xc2372d, 0xefe4cf, 0x2f4d8b]; for (let i = 0; i < 4; i++) { const [ax, az] = P[i], [bx, bz] = P[(i + 1) % 4]; for (let k = 0; k < 3; k++) { const len = Math.hypot(bx - ax, bz - az); const r = cyl(0.028, 0.028, len, std(ropeCols[k], { roughness: 0.5 }), 0, 0, 0, 10); r.rotation.z = Math.PI / 2; r.rotation.y = -Math.atan2(bz - az, bx - ax); r.position.set((ax + bx) / 2, 0.95 + k * 0.32, (az + bz) / 2); S.add(r); } }
    for (const side of [-1]) for (let row = 0; row < 4; row++) for (let i = 0; i < 12; i++) { const seat = rbox(0.5, 0.45, 0.5, 0.03, std(0x3a1e22, { roughness: 0.7 }), (i - 5.5) * 0.7, 0.2 + row * 0.5, side * (5.2 + row * 0.8)); S.add(seat); }
    for (let i = 0; i < 8; i++) S.add(rbox(0.5, 0.45, 0.5, 0.03, std(0x3a1e22), -5.4 - (i % 2) * 0.8, 0.2 + Math.floor(i / 2) * 0.5, (i % 4 - 1.5) * 1.6));
    const spot = keyLight(S, 0xfff0d8, 120, [0, 9, 0.4], [0, 0.6, 0], 0.42, true); beam(S, [0, 9, 0.4], [0, 0.6, 0], 2.4, 0xfff2d8, 0.05); dust(S, 0, 3, 0, 5, 5, 5, 160);
    const rim = new THREE.PointLight(0x6a7aff, 6, 14); rim.position.set(-6, 4, -6); S.add(rim);
    const paper = P5.news('TYSON FILES|FOR BANKRUPTCY', 'Ex-champion lists ~$23 million in debts', 'AUGUST 2003'); flat(paper, 0.62); paper.position.set(0.2, 0.62, 0.4); paper.rotation.z = 0.25; S.add(paper);
    const paper2 = P5.news('TYSON RETURNS|AT 58', 'Reported ~$20 million payday', 'NOVEMBER 2024'); flat(paper2, 0.625); paper2.position.set(0.35, 0.625, 0.5); paper2.rotation.z = -0.15; paper2.visible = false; S.add(paper2);
    const ex = [['MANSIONS', (x, w, h) => { x.fillStyle = '#3a4a5a'; x.fillRect(0, 0, w, h); x.fillStyle = '#efe4cf'; x.fillRect(w * 0.15, h * 0.45, w * 0.7, h * 0.4); x.beginPath(); x.moveTo(w * 0.1, h * 0.47); x.lineTo(w / 2, h * 0.18); x.lineTo(w * 0.9, h * 0.47); x.fill(); x.fillStyle = '#2a2a3a'; for (let i = 0; i < 5; i++) x.fillRect(w * (0.2 + i * 0.13), h * 0.55, w * 0.07, h * 0.12); }],
      ['PET TIGERS', (x, w, h) => { x.fillStyle = '#d9a23a'; x.fillRect(0, 0, w, h); x.fillStyle = '#1e1612'; x.beginPath(); x.ellipse(w * 0.5, h * 0.62, w * 0.3, h * 0.17, 0, 0, TAU); x.fill(); x.beginPath(); x.arc(w * 0.78, h * 0.42, h * 0.13, 0, TAU); x.fill(); for (let i = 0; i < 4; i++) x.fillRect(w * (0.28 + i * 0.13), h * 0.7, w * 0.05, h * 0.2); x.fillStyle = '#d9a23a'; for (let i = 0; i < 6; i++) x.fillRect(w * (0.3 + i * 0.07), h * 0.5, w * 0.02, h * 0.2); }],
      ['CARS', (x, w, h) => { x.fillStyle = '#5a2a2a'; x.fillRect(0, 0, w, h); for (let i = 0; i < 3; i++) { x.fillStyle = ['#c2372d', '#efe4cf', '#2f4d8b'][i]; x.fillRect(w * 0.08, h * (0.18 + i * 0.26), w * 0.84, h * 0.13); x.fillStyle = '#111'; x.beginPath(); x.arc(w * 0.25, h * (0.32 + i * 0.26), h * 0.05, 0, TAU); x.arc(w * 0.75, h * (0.32 + i * 0.26), h * 0.05, 0, TAU); x.fill(); } }],
      ['THE BILLS', (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); for (let i = 0; i < 9; i++) { x.save(); x.translate(w * (0.25 + (i % 3) * 0.25), h * (0.3 + Math.floor(i / 3) * 0.22)); x.rotate((i % 4 - 1.5) * 0.15); x.fillStyle = '#fbf6ea'; x.fillRect(-w * 0.12, -h * 0.1, w * 0.24, h * 0.2); x.strokeStyle = '#c2372d'; x.lineWidth = 4; x.strokeRect(-w * 0.12, -h * 0.1, w * 0.24, h * 0.2); x.fillStyle = '#c2372d'; x.font = `${h * 0.06}px ${HAND}`; x.textAlign = 'center'; x.fillText('DUE', 0, 6); x.restore(); } }]];
    const easels = ex.map(([lab, paint], i) => { const e = P5.easel((x, w, h) => { paint(x, w, h * 0.82); x.fillStyle = '#1e1612'; x.fillRect(0, h * 0.82, w, h * 0.18); ltxt(x, lab, w / 2, h * 0.91, h * 0.11, '#efe4cf', 'center'); }); e.position.set(-2.4 + i * 1.6, 0, 3.9); e.visible = false; S.add(e); return e; });
    const exL = new THREE.PointLight(0xffe0b0, 0, 7); exL.position.set(0, 2.6, 5.6); S.add(exL);
    const broom = group(cyl(0.015, 0.015, 1.3, std(0x8a6a46), 0, 0, 0), rbox(0.3, 0.12, 0.08, 0.02, std(0xc9a24a, { roughness: 0.9 }), 0, -0.02, 0)); broom.visible = false; S.add(broom);
    return { S, C, z0: 0, paper, paper2, easels, broom, spot, exL }; },

  classroom() { const { S, C } = scene(0x0d0b09, [9, 18]); S.add(new THREE.AmbientLight(0x4a3a2a, 0.75)); S.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2018, 0.45));
    const z0 = roomShell(S, { w: 9, d: 8, h: 3.2, wall: TX.wall('#7a8a6a', '#6a7a5a', [4, 1]), floor: TX.tile('#b8a888', '#8a7a62', [6, 6]), trim: 0x5a3a26 });
    const chalk = P4.chalk(3.4, 1.3, ['x² + 5x + 6 = 0', 'Fe  Cu  Na  K', '1066 · 1492 · 1776']); chalk.position.set(0, 1.65, z0 + 0.05); S.add(chalk); S.add(box(3.4, 0.05, 0.12, std(0x5a3a22), 0, 0.98, z0 + 0.1));
    const abc = poster(6.5, 0.3, (x, w, h) => { const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for (let i = 0; i < 26; i++) { x.fillStyle = ['#c2372d', '#2f4d6b', '#3f9b5f', '#d9a23a'][i % 4]; x.fillRect(i * w / 26 + 2, 0, w / 26 - 4, h); txt(x, L[i], i * w / 26 + w / 52, h / 2, h * 0.7, '#fff'); } }); abc.position.set(0, 2.7, z0 + 0.03); S.add(abc);
    const clk = P3.clockWall(0.25); clk.position.set(2.6, 2.3, z0 + 0.03); clk.userData.set(9, 5); S.add(clk);
    S.add(at(P3.window(1.3, 1.4, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9ac8e8'); g.addColorStop(1, '#e8d8a8'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#5a8a4a'; x.fillRect(0, h * 0.7, w, h * 0.3); }), -4.45, 1.7, z0 + 2.4, Math.PI / 2));
    const tdesk = at(P3.desk(1.6, 0.8), 2.6, 0, z0 + 1.4); S.add(tdesk); S.add(at(P3.books(6, 4), 2.2, 0.8, z0 + 1.3), at(P3.mug(0xc2372d), 3.0, 0.8, z0 + 1.4)); const apple = sph(0.06, std(0xc2372d, { roughness: 0.4 }), 2.7, 0.86, z0 + 1.5); S.add(apple);
    const dm = tmat(TX.wood('#9a7650', [1, 1], 'sd'), { roughness: 0.5 }), leg = std(0x3a3a3a, { metalness: 0.6 }); const desks = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const g = group(rbox(0.6, 0.04, 0.45, 0.01, dm, 0, 0.58, 0), box(0.03, 0.58, 0.03, leg, -0.26, 0.29, -0.18), box(0.03, 0.58, 0.03, leg, 0.26, 0.29, -0.18), box(0.03, 0.58, 0.03, leg, -0.26, 0.29, 0.18), box(0.03, 0.58, 0.03, leg, 0.26, 0.29, 0.18), rbox(0.42, 0.04, 0.38, 0.01, dm, 0, 0.36, 0.42), box(0.4, 0.36, 0.03, dm, 0, 0.55, 0.62)); g.position.set(-2.3 + c * 1.25, 0, z0 + 3.2 + r * 1.3); S.add(shadowy(g)); desks.push(g); }
    keyLight(S, 0xfff0d0, 32, [-1.5, 3.0, z0 + 4], [0, 1.0, z0 + 2], 0.7, true); dust(S, 0, 1.6, z0 + 3, 6, 2, 4, 90);
    return { S, C, z0, chalk, desks, clk }; },

  tub() { const { S, C } = scene(0x080706, [7, 15]); S.add(new THREE.AmbientLight(0x3a3430, 0.6));
    const z0 = roomShell(S, { w: 8, d: 6, h: 3.0, wall: TX.tile('#d8e0dc', '#9aa8a4', [8, 4]), floor: TX.tile('#3a4a5a', '#2a3440', [8, 6]), trim: 0x2a2a2a });
    S.add(at(P3.window(1.0, 1.1, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a3a6a'); g.addColorStop(1, '#6a4a6a'); x.fillStyle = g; x.fillRect(0, 0, w, h); }), -2.6, 1.9, z0 + 0.04));
    S.add(at(P3.plant(), 3.2, 0, z0 + 0.5)); const towel = box(0.5, 0.8, 0.03, std(0xc2372d, { roughness: 0.9 }), 2.4, 1.4, z0 + 0.05); S.add(towel); S.add(box(0.7, 0.04, 0.06, std(0xc9a24a, { metalness: 0.9 }), 2.4, 1.82, z0 + 0.06));
    const tubA = P5.tub('MONEY IN · MONEY OUT'); tubA.position.set(0, 0, z0 + 2.0); S.add(tubA);
    const tubB = P5.tub("CARLA'S TUB"); tubB.position.set(1.4, 0, z0 + 2.0); tubB.visible = false; S.add(tubB);
    const tree = P4.tree(0.9, 0x3f7f3f); tree.position.set(1.6, 0, z0 + 2.2); tree.visible = false; S.add(tree); const pipe = cyl(0.03, 0.03, 0.8, std(0xd9a23a, { metalness: 0.9 }), 0, 0, 0); pipe.rotation.z = Math.PI / 2; pipe.position.set(1.0, 0.3, z0 + 2.0); pipe.visible = false; S.add(pipe);
    const plug = cyl(0.07, 0.07, 0.03, std(0x111111), 0, 0, 0); plug.visible = false; S.add(plug);
    keyLight(S, 0xffe8c8, 40, [0.5, 2.9, z0 + 3.8], [0.4, 0.6, z0 + 2.0], 0.6, true); beam(S, [0.5, 2.9, z0 + 3.0], [0.4, 0.6, z0 + 2.0], 1.0, 0xffe2b0, 0.04); dust(S, 0.4, 1.4, z0 + 2.2, 3, 1.6, 2, 70);
    return { S, C, z0, tubA, tubB, tree, pipe, plug }; },

  stage() { const { S, C } = scene(0x0a0608, [12, 26]); S.add(new THREE.AmbientLight(0x3a2a3a, 0.55));
    const z0 = roomShell(S, { w: 12, d: 10, h: 4.5, wall: TX.wall('#3a1e3a', '#2e182e', [5, 1]), floor: TX.carpet ? TX.carpet('#5a1e22', [6, 6]) : TX.wood('#3a2416', [4, 4]), right: true, trim: 0xc9a24a });
    const stg = rbox(7, 0.5, 2.6, 0.03, tmat(TX.wood('#4a2a1a', [3, 1], 'stg')), 0, 0, z0 + 1.3); S.add(shadowy(stg));
    const curtain = poster(10, 4.3, (x, w, h) => { for (let i = 0; i < 40; i++) { const g = x.createLinearGradient(i * w / 40, 0, (i + 1) * w / 40, 0); g.addColorStop(0, '#5a0e14'); g.addColorStop(0.5, '#a8222a'); g.addColorStop(1, '#5a0e14'); x.fillStyle = g; x.fillRect(i * w / 40, 0, w / 40 + 1, h); } }); curtain.position.set(0, 2.15, z0 + 0.04); S.add(curtain);
    const banner = board(4.4, 0.9, (x, w, h, o) => { o = o || {}; x.fillStyle = o.bg || '#ffd36a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#1e1612'; x.lineWidth = 10; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, o.t || 'ESCAPE THE RAT RACE MASTERCLASS', w / 2, h * 0.36, h * 0.24, o.col || '#1e1612', 'center'); ltxt(x, o.s == null ? 'ONLY $1,997' : o.s, w / 2, h * 0.74, h * 0.2, o.col2 || '#c2372d', 'center'); }, true);
    banner.position.set(0, 3.2, z0 + 0.12); S.add(banner);
    const wheel = P5.wheel(0.9); wheel.position.set(-2.4, 1.5, z0 + 0.8); S.add(wheel);
    const pod = group(rbox(0.6, 1.1, 0.4, 0.03, std(0x1e1612, { roughness: 0.4 }), 0, 0, 0), box(0.5, 0.2, 0.02, std(0xffd36a), 0, 0.75, 0.21)); pod.position.set(1.4, 0.5, z0 + 1.8); S.add(shadowy(pod));
    const chairs = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const c = at(P4.chairWood(), (i - 3) * 1.0, 0, z0 + 4.4 + r * 1.2, Math.PI); S.add(c); chairs.push(c); }
    const sp1 = keyLight(S, 0xffe0f0, 70, [0, 4.3, z0 + 5], [0, 1.2, z0 + 1.3], 0.5, true); beam(S, [0, 4.3, z0 + 5], [0, 1.2, z0 + 1.3], 1.4, 0xffd8e8, 0.04);
    for (const x of [-3.5, 3.5]) { const l = new THREE.PointLight(x < 0 ? 0xff40a0 : 0x40c0ff, 4, 8); l.position.set(x, 3.5, z0 + 2); S.add(l); }
    dust(S, 0, 2, z0 + 2.5, 7, 3, 4, 120);
    return { S, C, z0, banner, wheel, chairs, stageY: 0.5, stageZ: z0 + 1.6 }; },

  survey() { const { S, C } = scene(0x0b0908, [9, 18]); S.add(new THREE.AmbientLight(0x3a3028, 0.6));
    const z0 = roomShell(S, { w: 9, d: 7, h: 3.2, wall: TX.wall('#4a5a52', '#3e4c45', [4, 1]), floor: TX.wood('#4a3020', [3, 3]) });
    const frame = box(3.5, 2.0, 0.06, std(0x5a3a22, { roughness: 0.6 }), 0, 1.75, z0 + 0.04); S.add(frame);
    const chart = board(3.3, 1.8, (x, w, h, o) => paintJars(x, w, h, o)); chart.position.set(0, 1.75, z0 + 0.08); S.add(chart);
    const old = board(1.1, 1.4, (x, w, h, o) => { paperBg(x, w, h, '#e4cf96'); ltxt(x, '2017 SURVEY', w / 2, h * 0.1, h * 0.07, '#5a4a3a', 'center'); ltxt(x, '78%', w / 2, h * 0.35, h * 0.2, REDC, 'center'); ltxt(x, 'paycheck to paycheck', w / 2, h * 0.52, h * 0.055, INK, 'center'); ltxt(x, '1 in 10', w / 2, h * 0.7, h * 0.13, REDC, 'center'); ltxt(x, 'earning $100K+', w / 2, h * 0.84, h * 0.055, INK, 'center'); });
    old.position.set(-3.0, 1.7, z0 + 0.05); old.rotation.z = 0.04; old.visible = false; S.add(old);
    S.add(at(P3.desk(1.8, 0.8), 2.6, 0, z0 + 2.4), at(P3.lamp(0x2f5a3a), 2.2, 0.8, z0 + 2.3), at(P3.papers(6, 3), 2.8, 0.8, z0 + 2.4), at(P3.plant(), -3.8, 0, z0 + 0.6));
    const clk = P3.clockWall(0.22); clk.position.set(3.2, 2.5, z0 + 0.03); clk.userData.set(10, 10); S.add(clk);
    keyLight(S, 0xffe8c8, 38, [0, 3.0, z0 + 4], [0, 1.7, z0], 0.55, true); beam(S, [0, 3.1, z0 + 3], [0, 1.6, z0 + 0.3], 1.3, 0xffe2b0, 0.035); dust(S, 0, 1.7, z0 + 1.5, 5, 2, 2, 80);
    return { S, C, z0, chart, old }; },
});
