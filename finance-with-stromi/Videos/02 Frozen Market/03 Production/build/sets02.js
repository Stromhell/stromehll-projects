/* The Frozen Market: 3D sets (three.js) for every shot. Uses engine.js helpers (TX, P3, rbox, box, cyl, plane, poster, castCard...). */
'use strict';
CH.linda = RH.character({ name: 'Linda', skin: '#efc9a4', head: { shape: 'round', w: 1, h: 1 }, hair: { style: 'bun', color: '#d8d2c8' }, top: { type: 'dress', color: '#7a4a6b', accent: '#f6ecd2', pattern: 'dots' }, legs: { color: '#efc9a4', len: 0.9, w: 0.85 }, shoes: { color: '#3a2418', sole: '#8a6a46' }, eyeSize: 1.02 });
CH.danielle = RH.character({ name: 'Danielle', skin: '#8a5a3c', hair: { style: 'curls', color: '#1e1612' }, top: { type: 'tee', color: '#5fa3a6', accent: '#3f7f82', emblem: 'none' }, legs: { color: '#5fa3a6' }, shoes: { color: '#f2efe6', sole: '#cfc8b8' }, blush: true });
CH.marcus = RH.character({ name: 'Marcus', skin: '#c48a5e', hair: { style: 'spiky', color: '#1e1612' }, hat: { type: 'none' }, top: { type: 'tee', color: '#2f4d6b', accent: '#e3c77a', emblem: 'none' }, legs: { color: '#3a3530' }, shoes: { color: '#c2372d', sole: '#e8dcc0' } });
CH.waiter = RH.character(Object.assign({}, CAST.pip, { name: 'Waiter', hat: { type: 'none' }, top: { type: 'tee', color: '#f2ead8', accent: '#c2372d', emblem: 'none' }, tie: 'bow', tieColor: '#c2372d' }));

const SETB = {}, SETS = {};
function getSet(k) { return SETS[k] || (SETS[k] = SETB[k]()); }
function scene(bg, fog) { const S = new THREE.Scene(); S.background = new THREE.Color(bg); if (fog) S.fog = new THREE.Fog(bg, fog[0], fog[1]); const C = new THREE.PerspectiveCamera(38, W / H, 0.05, 300); return { S, C }; }
const CAM = (s, p, l) => { s.C.position.set(p[0], p[1], p[2]); s.C.lookAt(l[0], l[1], l[2]); };
const camLerp = (s, k, p0, p1, l0, l1) => CAM(s, [lerp(p0[0], p1[0], k), lerp(p0[1], p1[1], k), lerp(p0[2], p1[2], k)], [lerp(l0[0], l1[0], k), lerp(l0[1], l1[1], k), lerp(l0[2], l1[2], k)]);
const card = (s, key, h) => s['c_' + key] || (s['c_' + key] = castCard(s.S, key, h));
function hideCards(s, keep) { for (const k in s) if (k.startsWith('c_') && !(keep || []).includes(k.slice(2))) s[k].hide(); }

/* ---- shared props ---- */
const P4 = {
  chalk(w, h, lines) { const T = canvasTex(Math.round(512 * w / h), 512); const g = group(box(w + 0.12, h + 0.12, 0.05, std(0x5a3a22, { roughness: 0.6 }), 0, 0, 0)); const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tmat(T.t, { roughness: 0.95 })); m.position.z = 0.03; g.add(m);
    g.userData.draw = (L, hi) => { const x = T.x, cw = T.c.width, ch = T.c.height; x.fillStyle = '#1f2b24'; x.fillRect(0, 0, cw, ch); for (let i = 0; i < 300; i++) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect(Math.random() * cw, Math.random() * ch, 3, 2); }
      L.forEach((l, i) => txt(x, l, cw / 2, ch * (0.18 + i * (0.72 / Math.max(L.length, 1))), i === hi ? ch * 0.17 : ch * 0.12, i === hi ? '#ffe9a8' : '#ece6d8')); T.t.needsUpdate = true; };
    g.userData.draw(lines || []); return g; },
  house(w, d, h, wallCol, roofCol, lit, o) { o = o || {}; const g = group(); const wm = tmat(TX.brick ? TX.wall(wallCol, null, [2, 1]) : null, { roughness: 0.9 }); wm.color = new THREE.Color(0xffffff);
    g.add(rbox(w, h, d, 0.02, std(new THREE.Color(wallCol), { roughness: 0.85 }), 0, 0, 0));
    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.78, h * 0.6, 4, 1), std(new THREE.Color(roofCol), { roughness: 0.7 })); roof.rotation.y = Math.PI / 4; roof.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); roof.position.y = h + h * 0.3; roof.castShadow = true; g.add(roof);
    const winM = lit ? basic(0xffd58a) : std(0x1d2630, { roughness: 0.2, metalness: 0.4 }); g.userData.wins = [];
    const fz = d / 2 + 0.01; for (const wx of [-w * 0.3, w * 0.3]) { const wi = box(w * 0.18, h * 0.24, 0.02, winM.clone(), wx, h * 0.62, fz, false); g.add(wi); g.userData.wins.push(wi); g.add(box(w * 0.2, 0.04, 0.06, std(0xefe4cf), wx, h * 0.48, fz + 0.02)); }
    g.add(box(w * 0.16, h * 0.42, 0.03, std(o.door || 0x5a2a1e), 0, h * 0.21, fz)); g.add(sph(0.025, std(0xc9a24a, { metalness: 0.9 }), w * 0.05, h * 0.2, fz + 0.03));
    if (lit) { const l = new THREE.PointLight(0xffc070, 3, 6); l.position.set(0, h * 0.5, d / 2 + 0.8); g.add(l); g.userData.porch = l; }
    return shadowy(g); },
  tree(h, col) { const g = group(cyl(0.08, 0.12, h * 0.45, std(0x5a3e28, { roughness: 0.9 }))); const r = RH.rng(Math.round(h * 100)); const lm = std(col || 0x34502e, { roughness: 0.8 });
    for (let i = 0; i < 6; i++) g.add(sph(h * (0.18 + r() * 0.08), lm, (r() - 0.5) * h * 0.3, h * (0.55 + r() * 0.25), (r() - 0.5) * h * 0.3)); return shadowy(g); },
  fence(n) { const g = group(); const m = std(0xe8e0cc, { roughness: 0.8 }); for (let i = 0; i < n; i++) g.add(box(0.08, 0.7, 0.03, m, i * 0.16, 0.35, 0)); g.add(box(n * 0.16, 0.05, 0.03, m, n * 0.08 - 0.08, 0.5, 0.02), box(n * 0.16, 0.05, 0.03, m, n * 0.08 - 0.08, 0.2, 0.02)); return shadowy(g); },
  table(r, col) { const m = tmat(TX.wood(col || '#5a3a26', [1, 1]), { roughness: 0.5 }); return shadowy(group(cyl(r, r, 0.04, m, 0, 0.74, 0), cyl(0.04, 0.05, 0.74, std(0x1a1a1a, { metalness: 0.6, roughness: 0.4 })), cyl(r * 0.45, r * 0.5, 0.03, std(0x1a1a1a, { metalness: 0.6 })))); },
  stool(col) { return shadowy(group(cyl(0.18, 0.18, 0.07, std(col || 0x9a2a22, { roughness: 0.4 }), 0, 0.7, 0), cyl(0.025, 0.025, 0.7, std(0xb0b0b0, { metalness: 0.9, roughness: 0.25 })), cyl(0.15, 0.17, 0.02, std(0xb0b0b0, { metalness: 0.9 })))); },
  booth(col) { const m = std(col || 0x7a2222, { roughness: 0.45 }); return shadowy(group(rbox(1.2, 0.45, 0.5, 0.05, m, 0, 0, 0), rbox(1.2, 0.7, 0.14, 0.05, m, 0, 0.42, -0.2))); },
  sign(w, h, paint, post) { const g = group(); const p = poster(w, h, paint, true); p.position.y = (post || 0) + h / 2; g.add(p); if (post) g.add(cyl(0.03, 0.03, post, std(0x333333, { metalness: 0.5 }), 0, 0, -0.02)); return g; },
  car(col, dusty) { const pm = std(col, { metalness: dusty ? 0.1 : 0.55, roughness: dusty ? 0.85 : 0.25 }), gl = std(0x1a2430, { metalness: 0.8, roughness: 0.1 }), tyre = std(0x151515, { roughness: 0.8 }), rim = std(0xc0c0c0, { metalness: 0.9, roughness: 0.2 });
    const car = group(rbox(1.8, 0.62, 4.4, 0.16, pm, 0, 0.3, 0), rbox(1.56, 0.5, 2.3, 0.18, gl, 0, 0.86, -0.15)); for (const [wx, wz] of [[-0.86, 1.35], [0.86, 1.35], [-0.86, -1.35], [0.86, -1.35]]) { const w = cyl(0.34, 0.34, 0.24, tyre, 0, -0.12, 0, 24); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.34, wz); car.add(w); const rr = cyl(0.2, 0.2, 0.25, rim, 0, -0.125, 0, 16); rr.rotation.z = Math.PI / 2; rr.position.set(wx, 0.34, wz); car.add(rr); }
    for (const hx of [-0.6, 0.6]) { car.add(box(0.32, 0.1, 0.03, basic(0xfff2d0), hx, 0.68, 2.2, false)); car.add(box(0.32, 0.1, 0.03, basic(0xb02020), hx, 0.68, -2.2, false)); } return shadowy(car); },
  loaf(sc) { const m = std(0xc98a4a, { roughness: 0.7 }); const g = group(rbox(0.22, 0.12, 0.16, 0.03, m, 0, 0, 0)); const roof = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.1, 4), std(0xa86a32, { roughness: 0.7 })); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.75); roof.position.y = 0.17; g.add(roof); g.add(box(0.05, 0.07, 0.01, std(0x6a3a1a), 0, 0.035, 0.081)); if (sc) g.scale.setScalar(sc); return shadowy(g); },
  jar(label) { const g = group(cyl(0.11, 0.11, 0.26, std(0xcfe6f0, { transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.1 })), cyl(0.1, 0.1, 0.06, std(0x8a6a46), 0, 0.26, 0)); g.userData.coins = group(); g.add(g.userData.coins);
    for (let i = 0; i < 14; i++) { const c = cyl(0.03, 0.03, 0.008, std(0xe0b84a, { metalness: 0.8, roughness: 0.3 }), (Math.random() - 0.5) * 0.12, 0.01 + i * 0.009, (Math.random() - 0.5) * 0.12, 16); g.userData.coins.add(c); }
    if (label) { const p = poster(0.16, 0.07, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); txt(x, label, w / 2, h / 2, h * 0.7); }); p.position.set(0, 0.14, 0.112); g.add(p); } return g; },
  coin(r) { const c = cyl(r || 0.05, r || 0.05, 0.012, std(0xe0b84a, { metalness: 0.85, roughness: 0.25 }), 0, 0, 0, 24); c.rotation.x = Math.PI / 2; return c; },
  chairWood() { const m = tmat(TX.wood('#6a4a30', [1, 1], 'cw'), { roughness: 0.6 }); const g = group(box(0.44, 0.05, 0.42, m, 0, 0.45, 0), box(0.44, 0.5, 0.04, m, 0, 0.72, -0.2)); for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) g.add(box(0.04, 0.45, 0.04, m, x, 0.225, z)); return shadowy(g); },
  stamp() { return shadowy(group(rbox(0.12, 0.05, 0.08, 0.01, std(0x6a2a20, { roughness: 0.5 }), 0, 0, 0), cyl(0.02, 0.025, 0.1, tmat(TX.wood('#7a5636', [1, 1], 'stamp')), 0, 0.05, 0), sph(0.04, std(0x2a1a14, { roughness: 0.4 }), 0, 0.17, 0))); },
};
/* paper tag laid in 3D (a card the camera sees) */
function tag3(S, s, w, col, bg) { const p = poster(w, w * 0.32, (x, cw, ch) => { x.fillStyle = bg || '#f3e7cc'; x.fillRect(0, 0, cw, ch); txt(x, s, cw / 2, ch / 2, ch * 0.62, col || '#1e1612'); }); S.add(p); return p; }

/* ---------------- SETS ---------------- */
Object.assign(SETB, {
  diner() { const { S, C } = scene(0x0b0807, [7, 16]); S.add(new THREE.AmbientLight(0x4a3628, 1.1));
    const z0 = roomShell(S, { w: 9, d: 7, h: 3.2, wall: TX.wall('#5a3226', '#4a2a20', [4, 1]), floor: TX.tile('#d8d0c0', '#2a2622', [4, 4]), right: true });
    const bar = rbox(5.5, 1.0, 0.6, 0.03, tmat(TX.wood('#4a2a1c', [3, 1]), { roughness: 0.4 }), 0.6, 0, z0 + 1.3); S.add(bar); S.add(rbox(5.7, 0.06, 0.75, 0.02, std(0xd8d0c0, { roughness: 0.2, metalness: 0.2 }), 0.6, 1.0, z0 + 1.3));
    for (let i = 0; i < 6; i++) S.add(at(P4.stool(), -1.6 + i * 0.85, 0, z0 + 1.95));
    for (let i = 0; i < 3; i++) { S.add(at(P4.booth(), -3.6, 0, z0 + 2.8 + i * 1.5, Math.PI / 2)); S.add(at(P4.table(0.38, '#3a2a20'), -2.9, 0, z0 + 2.8 + i * 1.5)); }
    const menu = P4.chalk(2.0, 1.1, ['MENU', 'HOUSE', '$417,500']); menu.position.set(0.4, 2.15, z0 + 0.04); S.add(menu); keyLight(S, 0xffe2b8, 30, [0.4, 3.1, z0 + 2.2], [0.4, 2.1, z0], 0.5, false);
    S.add(at(P3.clockWall(0.28), 2.6, 2.3, z0 + 0.03)); S.userData.clock = S.children[S.children.length - 1];
    S.add(at(P3.window(1.4, 1.2, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0d1424'); g.addColorStop(1, '#2a1c2a'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(255,200,120,${0.2 + Math.random() * 0.5})`; x.fillRect(Math.random() * w, h * 0.5 + Math.random() * h * 0.5, 6, 8); } }), 4.48, 1.6, z0 + 3.5, -Math.PI / 2));
    S.add(at(P3.pendant(0xb02a20), 0.4, 3.1, z0 + 1.6)); S.add(at(P3.pendant(0xb02a20), -2.9, 3.1, z0 + 4.3));
    const key = keyLight(S, 0xffd9a0, 55, [0.4, 3.0, z0 + 2.6], [0.4, 0.8, z0 + 1.3], 0.6); beam(S, [0.4, 3.0, z0 + 1.6], [0.4, 0, z0 + 2.2], 1.2, 0xffd9a0, 0.05);
    keyLight(S, 0xff9a60, 18, [-2.9, 3.0, z0 + 4.5], [-2.9, 0.7, z0 + 4.3], 0.6, false);
    const neon = P4.sign(1.3, 0.35, (x, w, h) => { x.fillStyle = '#120808'; x.fillRect(0, 0, w, h); x.shadowColor = '#ff4a3a'; x.shadowBlur = 20; txt(x, 'OPEN LATE', w / 2, h / 2, h * 0.65, '#ff6a5a'); }); neon.position.set(-2.2, 2.2, z0 + 0.03); S.add(neon);
    S.add(at(P3.mug(), 1.5, 1.06, z0 + 1.3)); dust(S, 0.4, 1.8, z0 + 2, 3, 2, 2, 120);
    return { S, C, z0, menu, key }; },
  street() { const { S, C } = scene(0x1b1a2a, [18, 45]); S.add(new THREE.HemisphereLight(0x6a6a9a, 0x1a1418, 0.7));
    const moon = new THREE.DirectionalLight(0x9aa8d8, 1.0); moon.position.set(-10, 14, 8); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -15, right: 15, top: 15, bottom: -15, far: 60 }); S.add(moon);
    S.add(plane(120, 120, tmat(TX.carpet('#2a3a24', [40, 40])), 0, 0, 0, -Math.PI / 2)); S.add(plane(120, 4, tmat(TX.concrete('#2a2a2e', [30, 1])), 0, 0.01, 4, -Math.PI / 2)); S.add(plane(120, 1.2, tmat(TX.concrete('#6a6460', [40, 1])), 0, 0.02, 1.6, -Math.PI / 2));
    const linda = at(P4.house(4.2, 3.4, 2.8, '#8a7058', '#3a2418', true), -6, 0, -3); const dan = at(P4.house(3.4, 3, 2.4, '#c9bc9e', '#6a5a48', true, { door: 0x2f4d6b }), 0, 0, -3);
    const apt = group(rbox(4.2, 7, 3.4, 0.03, std(0x4a4a5a, { roughness: 0.9 }), 0, 0, 0)); for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) apt.add(box(0.7, 0.8, 0.02, (i + j) % 3 ? basic(0xffd58a) : std(0x1d2630), -1.3 + i * 1.3, 0.9 + j * 1.3, 1.71, false)); at(apt, 6.5, 0, -3.4); shadowy(apt);
    S.add(linda, dan, apt); [[-9, -2], [-3.2, -1.2], [3.1, -1.5], [9.5, -2.5], [-12, -5], [12, -6]].forEach(([x, z], i) => S.add(at(P4.tree(3 + (i % 3) * 0.6), x, 0, z)));
    S.add(at(P4.fence(20), -9.2, 0, -0.8));
    for (const x of [-8, 0, 8]) { S.add(cyl(0.05, 0.06, 3.6, std(0x2a2a2a, { metalness: 0.6 }), x, 0, 2.2)); const l = new THREE.PointLight(0xffd090, 4, 9); l.position.set(x, 3.6, 2.2); S.add(l); S.add(sph(0.12, basic(0xfff0c0), x, 3.65, 2.2)); }
    const sky = poster(160, 50, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0f1028'); g.addColorStop(0.7, '#3a2a48'); g.addColorStop(1, '#8a4a40'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 120; i++) { x.fillStyle = 'rgba(255,255,240,0.6)'; x.fillRect(Math.random() * w, Math.random() * h * 0.6, 1.5, 1.5); } }, true); sky.position.set(0, 20, -40); S.add(sky);
    return { S, C, linda, dan, apt }; },
  study() { const { S, C } = scene(0x080605, [5, 12]); S.add(new THREE.AmbientLight(0x30241a, 0.5));
    const z0 = roomShell(S, { w: 6, d: 5, h: 3, wall: TX.wall('#3a2e26', '#30261f', [3, 1]), floor: TX.wood('#3a2416', [3, 3]) });
    const desk = at(P3.desk(1.8, 0.9), 0, 0, z0 + 1.2); S.add(desk); S.add(at(P3.lamp(), -0.65, 0.8, z0 + 1.0)); S.add(at(P3.shelf(1.6, 2.2, 4, 5), -2.0, 0, z0 + 0.2)); S.add(at(P3.mug(0x2f4d6b), 0.7, 0.8, z0 + 1.3));
    const news = poster(0.42, 0.56, (x, w, h) => { x.fillStyle = '#e9dfc8'; x.fillRect(0, 0, w, h); txt(x, 'THE DAILY', w / 2, h * 0.08, h * 0.06, '#1e1612'); x.fillRect(w * 0.05, h * 0.12, w * 0.9, 3); txt(x, 'HOUSING BOOM!', w / 2, h * 0.22, h * 0.09, '#1e1612'); txt(x, '2006', w / 2, h * 0.33, h * 0.07, '#8a2f3c'); x.fillStyle = 'rgba(30,22,18,0.35)'; for (let i = 0; i < 14; i++) x.fillRect(w * 0.06 + (i % 2) * w * 0.46, h * 0.42 + Math.floor(i / 2) * h * 0.07, w * 0.4, 6); });
    news.rotation.x = -Math.PI / 2; news.rotation.z = 0.1; news.position.set(-0.25, 0.805, z0 + 1.25); S.add(news);
    const folders = ['REDFIN', 'NAR', 'ICE'].map((l, i) => { const f = poster(0.3, 0.38, (x, w, h) => { x.fillStyle = ['#d9a23a', '#7a9a6a', '#c26a4a'][i]; x.fillRect(0, 0, w, h); x.fillStyle = '#f4ecd8'; x.fillRect(w * 0.1, h * 0.1, w * 0.8, h * 0.2); txt(x, l, w / 2, h * 0.2, h * 0.11); }); f.rotation.x = -Math.PI / 2; f.rotation.z = -0.1 + i * 0.12; f.position.set(0.25 + i * 0.25, 0.806 + i * 0.002, z0 + 1.2 + i * 0.05); S.add(f); return f; });
    keyLight(S, 0xffd9a0, 40, [-0.6, 2.4, z0 + 2.4], [0.1, 0.8, z0 + 1.2], 0.5); dust(S, 0, 1.4, z0 + 1.5, 2, 1.4, 1.5, 90);
    return { S, C, z0, news, folders }; },
  apartment() { const { S, C } = scene(0x0a0806, [6, 13]); S.add(new THREE.AmbientLight(0x3a2a20, 0.55));
    const z0 = roomShell(S, { w: 7, d: 5, h: 3, wall: TX.wall('#6a5240', '#5a4434', [3, 1]), floor: TX.wood('#6a4a30', [3, 3]) });
    const counter = rbox(2.2, 0.9, 0.6, 0.02, tmat(TX.wood('#3a2a20', [2, 1])), 1.6, 0, z0 + 0.35); S.add(counter); S.add(rbox(2.3, 0.05, 0.66, 0.01, std(0xd8d0c0, { roughness: 0.3 }), 1.6, 0.9, z0 + 0.35));
    const jar = at(P4.jar('HOUSE'), 1.4, 0.95, z0 + 0.4); S.add(jar);
    const ribbons = []; for (let i = 0; i < 6; i++) { const x = -2.6 + i * 0.62; S.add(box(0.04, 1.4, 0.01, std(0xc2372d), x, 1.4, z0 + 0.02, false)); const lab = poster(0.36, 0.14, (c, w, h) => { c.fillStyle = '#efe4cf'; c.fillRect(0, 0, w, h); txt(c, String(2021 + i), w / 2, h / 2, h * 0.7); }); lab.position.set(x, 2.25, z0 + 0.03); S.add(lab); ribbons.push(lab); }
    S.add(at(P3.plant(), -3.0, 0, z0 + 0.5)); S.add(at(P3.window(1.2, 1.3, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ff9a50'); g.addColorStop(1, '#4a2a40'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#2a1a20'; for (let i = 0; i < 8; i++) x.fillRect(i * w / 8, h * (0.55 + Math.random() * 0.2), w / 9, h); }), 3.4, 1.6, z0 + 2.3, -Math.PI / 2));
    keyLight(S, 0xffb070, 45, [2.8, 2.6, z0 + 2.6], [0.2, 1.0, z0 + 0.6], 0.6); dust(S, 0, 1.4, z0 + 1.5, 3, 1.4, 1.5, 90);
    return { S, C, z0, jar, ribbons }; },
  market() { const { S, C } = scene(0x1a140f, [8, 18]); S.add(new THREE.HemisphereLight(0xffd8a0, 0x2a2018, 0.8));
    S.add(plane(40, 40, tmat(TX.concrete('#5a4a3a', [10, 10])), 0, 0, 0, -Math.PI / 2)); S.add(plane(30, 6, tmat(TX.brick('#6a3a2a', [8, 2])), 0, 3, -4));
    const stall = group(rbox(3, 0.9, 1.0, 0.02, tmat(TX.wood('#7a5636', [2, 1])), 0, 0, 0)); for (const x of [-1.45, 1.45]) stall.add(box(0.08, 2.3, 0.08, std(0x5a3e24), x, 1.15, -0.4));
    const aw = canvasTex(512, 128); for (let i = 0; i < 8; i++) { aw.x.fillStyle = i % 2 ? '#c2372d' : '#efe4cf'; aw.x.fillRect(i * 64, 0, 64, 128); } aw.t.needsUpdate = true; const awn = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 1.0), tmat(aw.t, { side: THREE.DoubleSide })); awn.position.set(0, 2.25, 0); awn.rotation.x = -0.9; stall.add(awn);
    const am = std(0xb8322a, { roughness: 0.35 }); for (let r = 0; r < 4; r++) for (let i = 0; i < 12 - r * 2; i++) stall.add(sph(0.085, am, -1.0 + r * 0.17 + i * 0.17, 0.98 + r * 0.13, 0.05 - r * 0.06));
    S.add(shadowy(at(stall, 0, 0, 0))); const price = P4.sign(0.6, 0.3, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); }); price.position.set(1.1, 0.95, 0.52); S.add(price);
    const pt = canvasTex(256, 128); const pm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.3), basic(0xffffff, { map: pt.t })); pm.position.set(1.1, 1.25, 0.53); S.add(pm);
    const setPrice = s => { pt.x.fillStyle = '#efe4cf'; pt.x.fillRect(0, 0, 256, 128); txt(pt.x, s, 128, 64, 80, '#c2372d'); pt.t.needsUpdate = true; }; setPrice('$1.00');
    keyLight(S, 0xffe0b0, 40, [2, 4, 4], [0, 1, 0], 0.6); return { S, C, setPrice }; },
  maptable() { const { S, C } = scene(0x070504, [6, 14]); S.add(new THREE.AmbientLight(0x30241a, 0.6));
    S.add(plane(10, 8, tmat(TX.wood('#3a2416', [3, 3]), { roughness: 0.45 }), 0, 0, 0, -Math.PI / 2));
    const map = poster(3.2, 1.9, (x, w, h) => { x.fillStyle = '#d8c9a3'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(80,60,40,0.3)'; for (let i = 0; i < w; i += w / 8) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); }
      x.fillStyle = '#c4b285'; x.strokeStyle = '#3a2a1a'; x.lineWidth = 6; x.beginPath(); const P = [[0.05, 0.2], [0.3, 0.12], [0.6, 0.12], [0.75, 0.18], [0.88, 0.14], [0.95, 0.3], [0.88, 0.5], [0.8, 0.62], [0.78, 0.9], [0.72, 0.7], [0.6, 0.72], [0.48, 0.85], [0.4, 0.72], [0.25, 0.7], [0.1, 0.55], [0.04, 0.35]]; P.forEach((p, i) => i ? x.lineTo(p[0] * w, p[1] * h) : x.moveTo(p[0] * w, p[1] * h)); x.closePath(); x.fill(); x.stroke();
      txt(x, 'UNITED STATES', w * 0.48, h * 0.42, h * 0.06, 'rgba(60,40,20,0.45)'); });
    map.rotation.x = -Math.PI / 2; map.position.y = 0.005; S.add(map);
    // city pins: [name, u, v] in map space
    const city = (u, v) => V3((u - 0.5) * 3.2, 0, (v - 0.5) * 1.9);
    const flagM = std(0xc2372d, { roughness: 0.5, side: THREE.DoubleSide }), pole = std(0x2a2a2a, { metalness: 0.5 });
    const flags = []; const r = RH.rng(41); for (let i = 0; i < 41; i++) { const u = 0.12 + r() * 0.76, v = 0.2 + r() * 0.55; const g = group(cyl(0.006, 0.006, 0.22, pole), box(0.09, 0.055, 0.002, flagM, 0.045, 0.19, 0, false)); g.position.copy(city(u, v)); S.add(shadowy(g)); flags.push(g); }
    const arrows = {}; const mk = (name, u, v, up) => { const m = std(up ? 0x3f8a4a : 0xc2372d, { roughness: 0.4 }); const g = group(cyl(0.035, 0.035, 0.25, m), (() => { const c = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.14, 16), m); c.position.y = up ? 0.32 : -0.07; if (!up) c.rotation.x = Math.PI; c.castShadow = true; return c; })()); g.position.copy(city(u, v)); g.position.y = up ? 0 : 0.1; S.add(g); arrows[name] = g; };
    mk('SEATTLE', 0.12, 0.17, false); mk('SF', 0.07, 0.48, true); mk('AUSTIN', 0.48, 0.78, false); mk('FLORIDA', 0.8, 0.86, false); mk('CHICAGO', 0.64, 0.33, true); mk('NEW YORK', 0.86, 0.3, true);
    keyLight(S, 0xffd9a0, 60, [0.5, 4.5, 2.5], [0, 0, 0], 0.55); return { S, C, flags, arrows, city }; },
  cork() { const { S, C } = scene(0x060504, [4, 10]); S.add(new THREE.AmbientLight(0x30241a, 0.5));
    const z0 = roomShell(S, { w: 6, d: 4, h: 3, wall: TX.wall('#2a221c', null, [3, 1]), floor: TX.wood('#2a1a10', [3, 3]) });
    const cork = poster(3.2, 1.9, (x, w, h) => { x.fillStyle = '#9a7650'; x.fillRect(0, 0, w, h); for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '60,40,20' : '200,170,120'},0.25)`; x.fillRect(Math.random() * w, Math.random() * h, 2, 2); } }); cork.position.set(0, 1.6, z0 + 0.03); S.add(cork); S.add(box(3.35, 2.05, 0.04, std(0x4a2e1c), 0, 1.6, z0 + 0.01));
    keyLight(S, 0xffd9a0, 45, [0.3, 2.8, z0 + 2.4], [0, 1.6, z0], 0.55); dust(S, 0, 1.6, z0 + 1, 3, 1.5, 1.5, 70);
    const pins = []; const pin = (u, v, w, h, paint, rot) => { const p = poster(w, h, paint); p.position.set(u, v, z0 + 0.06 + pins.length * 0.002); p.rotation.z = rot || 0; S.add(p); const pn = sph(0.025, std(0xc2372d, { roughness: 0.3 }), u, v + h / 2 - 0.05, z0 + 0.08 + pins.length * 0.002); S.add(pn); p.userData.pin = pn; pins.push(p); return p; };
    return { S, C, z0, pin, pins }; },
  kitchen() { const { S, C } = scene(0x0a0705, [6, 13]); S.add(new THREE.AmbientLight(0x4a3628, 1.3));
    const z0 = roomShell(S, { w: 7, d: 5, h: 3, wall: TX.wall('#7a6a4a', '#6a5a3e', [3, 1]), floor: TX.tile('#c8bca0', '#8a7a5a', [4, 4]) });
    S.add(rbox(3.2, 0.9, 0.6, 0.02, tmat(TX.wood('#6a8a7a', [2, 1])), -1.5, 0, z0 + 0.32)); S.add(rbox(3.3, 0.05, 0.65, 0.01, std(0xe8e0d0, { roughness: 0.25 }), -1.5, 0.9, z0 + 0.32));
    S.add(rbox(3.2, 0.7, 0.35, 0.02, tmat(TX.wood('#6a8a7a', [2, 1])), -1.5, 1.6, z0 + 0.18)); S.add(at(P3.plant(), -2.6, 0.95, z0 + 0.35));
    S.add(at(P3.window(1.3, 1.0, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0b070'); g.addColorStop(1, '#6a8a6a'); x.fillStyle = g; x.fillRect(0, 0, w, h); }), 1.2, 1.7, z0 + 0.02));
    const fam = P3.frame(0.45, 0.35, (x, w, h) => { x.fillStyle = '#e8d8b8'; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) { x.fillStyle = ['#7a4a6b', '#2f4d6b', '#c2372d', '#e3c77a'][i]; x.beginPath(); x.arc(w * (0.2 + i * 0.2), h * 0.45, h * 0.13, 0, TAU); x.fill(); x.fillRect(w * (0.2 + i * 0.2) - h * 0.1, h * 0.58, h * 0.2, h * 0.3); } }); fam.position.set(2.5, 1.7, z0 + 0.03); S.add(fam);
    const table = at(P4.table(0.6, '#7a5636'), 0.3, 0, z0 + 1.9); S.add(table);
    const r1 = poster(0.22, 0.3, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, '@ 3%', w / 2, h * 0.2, h * 0.11); txt(x, '$1,686', w / 2, h * 0.5, h * 0.16, '#3f8a4a'); txt(x, 'a month', w / 2, h * 0.72, h * 0.09, '#5a4a3a'); });
    const r2 = poster(0.22, 0.3, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, '@ 7.2%', w / 2, h * 0.2, h * 0.11); txt(x, '$2,715', w / 2, h * 0.5, h * 0.16, '#c2372d'); txt(x, 'a month', w / 2, h * 0.72, h * 0.09, '#5a4a3a'); });
    [r1, r2].forEach((r, i) => { r.rotation.x = -Math.PI / 2; r.rotation.z = (i ? -1 : 1) * 0.08; r.position.set(0.1 + i * 0.32, 0.785, z0 + 1.9); S.add(r); });
    const calc = group(rbox(0.12, 0.02, 0.18, 0.005, std(0x2a2a2a, { roughness: 0.4 }), 0, 0, 0)); const cs = poster(0.09, 0.035, (x, w, h) => { x.fillStyle = '#b8d8a8'; x.fillRect(0, 0, w, h); txt(x, '+1,029', w * 0.9, h / 2, h * 0.75, '#1e1612', 'right'); }, true); cs.rotation.x = -Math.PI / 2; cs.position.set(0, 0.022, -0.05); calc.add(cs); calc.position.set(0.55, 0.78, z0 + 1.75); S.add(calc);
    const flyer = poster(0.24, 0.32, (x, w, h) => { x.fillStyle = '#f6ecd2'; x.fillRect(0, 0, w, h); x.fillStyle = '#7a9a6a'; x.fillRect(w * 0.1, h * 0.1, w * 0.8, h * 0.45); x.fillStyle = '#c2372d'; x.beginPath(); x.moveTo(w * 0.25, h * 0.35); x.lineTo(w / 2, h * 0.18); x.lineTo(w * 0.75, h * 0.35); x.fill(); x.fillStyle = '#efe4cf'; x.fillRect(w * 0.3, h * 0.35, w * 0.4, h * 0.18); txt(x, 'COTTAGE', w / 2, h * 0.68, h * 0.1); txt(x, 'near the kids', w / 2, h * 0.82, h * 0.07, '#5a4a3a'); });
    flyer.position.set(-0.5, 1.2, z0 + 1.9); S.add(flyer); const bowl = group(cyl(0.16, 0.1, 0.09, std(0xe8e0cc, { roughness: 0.3 })), sph(0.05, std(0xc2372d), -0.05, 0.11, 0), sph(0.05, std(0xe3a33a), 0.05, 0.11, 0.02), sph(0.045, std(0x7a9a3a), 0, 0.12, -0.05)); bowl.position.set(0.05, 0.78, z0 + 2.2); S.add(shadowy(bowl));
    const key = keyLight(S, 0xffd090, 45, [0.5, 2.8, z0 + 3.2], [0.3, 0.8, z0 + 1.9], 0.6); S.add(at(P3.pendant(0x7a6a4a), 0.3, 3.0, z0 + 1.9)); dust(S, 0.3, 1.5, z0 + 2, 2.5, 1.5, 1.5, 90);
    return { S, C, z0, flyer, bowl, key, r1, r2 }; },
  bakery() { const { S, C } = scene(0x0a0705, [6, 13]); S.add(new THREE.AmbientLight(0x3a2a20, 0.55));
    const z0 = roomShell(S, { w: 7, d: 5, h: 3, wall: TX.wall('#8a6a4a', '#7a5a3a', [3, 1]), floor: TX.tile('#d8c8a8', '#6a4a30', [4, 4]) });
    const loaves = []; for (let r = 0; r < 3; r++) { S.add(box(4.2, 0.04, 0.4, tmat(TX.wood('#5a3a22', [3, 1])), 0, 0.9 + r * 0.55, z0 + 0.22)); for (let i = 0; i < 12; i++) { const l = at(P4.loaf(), -1.9 + i * 0.345, 0.92 + r * 0.55, z0 + 0.24); S.add(l); loaves.push(l); } }
    S.add(rbox(3.4, 0.95, 0.6, 0.02, tmat(TX.wood('#4a2a1c', [2, 1])), 0, 0, z0 + 1.4)); S.add(rbox(3.5, 0.05, 0.66, 0.01, std(0xe8e0d0, { roughness: 0.3 }), 0, 0.95, z0 + 1.4));
    const clock = P3.clockWall(0.25); clock.position.set(2.6, 2.4, z0 + 0.03); S.add(clock);
    const sticker = poster(0.26, 0.12, (x, w, h) => { x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h); txt(x, 'SPECIAL OFFER', w / 2, h / 2, h * 0.55, '#fff'); }); sticker.visible = false; S.add(sticker);
    const neon = P4.sign(1.2, 0.3, (x, w, h) => { x.fillStyle = '#140c08'; x.fillRect(0, 0, w, h); txt(x, 'FRESH HOMES DAILY', w / 2, h / 2, h * 0.55, '#ffcf86'); }); neon.position.set(-2.4, 2.6, z0 + 0.03); S.add(neon);
    keyLight(S, 0xffd090, 50, [0.4, 2.9, z0 + 3.4], [0, 1.2, z0 + 0.5], 0.6); dust(S, 0, 1.5, z0 + 1.5, 3, 1.5, 1.5, 90);
    return { S, C, z0, loaves, clock, sticker }; },
  subdiv() { const { S, C } = scene(0x1c1e3a, [18, 55]); S.add(new THREE.HemisphereLight(0x9a9ac8, 0x2a2018, 1.5));
    const moon = new THREE.DirectionalLight(0xaab8e8, 1.1); moon.position.set(8, 16, 10); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20, far: 70 }); S.add(moon);
    S.add(plane(120, 120, tmat(TX.carpet('#3a4a2a', [40, 40])), 0, 0, 0, -Math.PI / 2)); S.add(plane(5, 120, tmat(TX.concrete('#3a3a3e', [1, 30])), 0, 0.01, 0, -Math.PI / 2));
    const flags = []; for (let side of [-1, 1]) for (let i = 0; i < 6; i++) { const h = at(P4.house(3, 3, 2.4, ['#b7a98a', '#a89a80', '#c4b89a'][i % 3], '#4a3e30', false), side * 5.5, 0, -i * 6, side < 0 ? Math.PI / 2 : -Math.PI / 2); S.add(h);
      const sg = P4.sign(0.7, 0.4, (x, w, h2) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h2); x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h2 * 0.35); txt(x, 'FOR SALE', w / 2, h2 * 0.18, h2 * 0.25, '#fff'); txt(x, 'NEW BUILD', w / 2, h2 * 0.65, h2 * 0.25); }, 0.8); sg.position.set(side * 3.2, 0, -i * 6 + 1); sg.rotation.y = side < 0 ? 0.5 : -0.5; S.add(sg); flags.push(sg); }
    for (let i = 0; i < 5; i++) { const l = new THREE.PointLight(0xffd090, 4, 10); l.position.set(i % 2 ? 2.8 : -2.8, 3.5, -i * 7); S.add(l); S.add(cyl(0.05, 0.05, 3.5, std(0x2a2a2a), i % 2 ? 2.8 : -2.8, 0, -i * 7)); }
    return { S, C, flags }; },
  lender() { const { S, C } = scene(0x070505, [5, 12]); S.add(new THREE.AmbientLight(0x2a2a30, 0.5));
    const z0 = roomShell(S, { w: 6, d: 5, h: 3, wall: TX.wall('#2f3a33', '#28322c', [3, 1]), floor: TX.carpet('#3a2a2a', [4, 4]) });
    S.add(at(P3.desk(2.0, 0.9), 0, 0, z0 + 1.4)); S.add(at(P3.lamp(0x2f5a3a), 0.75, 0.8, z0 + 1.2)); S.add(at(P3.shelf(1.4, 2.2, 4, 9), 2.1, 0, z0 + 0.2)); S.add(at(P3.chair(), 0, 0, z0 + 0.7, Math.PI));
    const pt = canvasTex(512, 220); const tagm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.26), basic(0xffffff, { map: pt.t, transparent: true })); tagm.position.set(-0.3, 1.05, z0 + 1.6); S.add(tagm);
    const setTag = (s, col) => { pt.x.clearRect(0, 0, 512, 220); pt.x.fillStyle = '#efe4cf'; pt.x.beginPath(); pt.x.moveTo(60, 0); pt.x.lineTo(512, 0); pt.x.lineTo(512, 220); pt.x.lineTo(60, 220); pt.x.lineTo(0, 110); pt.x.fill(); pt.x.fillStyle = '#1e1612'; pt.x.beginPath(); pt.x.arc(48, 110, 14, 0, TAU); pt.x.fill(); txt(pt.x, s, 290, 112, 120, col || '#1e1612'); pt.t.needsUpdate = true; }; setTag('$450,000');
    const house = at(P4.house(0.5, 0.45, 0.35, '#c9bc9e', '#6a5a48', false), -0.3, 0.8, z0 + 1.35); S.add(house);
    const env = group(box(0.3, 0.008, 0.18, std(0xd8c8a0, { roughness: 0.9 }), 0, 0, 0)); const el = poster(0.26, 0.08, (x, w, h) => { x.fillStyle = '#d8c8a0'; x.fillRect(0, 0, w, h); x.translate(w, h); x.scale(-1, -1); txt(x, 'BUYDOWN $30K', w / 2, h / 2, h * 0.6, '#8a2f3c'); }); el.rotation.set(-Math.PI / 2, 0, Math.PI); el.position.y = 0.005; env.add(el); env.position.set(0.6, 0.81, z0 + 1.7); S.add(shadowy(env));
    const doc = poster(0.3, 0.4, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'SALE', w / 2, h * 0.1, h * 0.08); }); doc.rotation.x = -Math.PI / 2; doc.position.set(-0.1, 0.806, z0 + 1.6); S.add(doc);
    const stamp = P4.stamp(); stamp.position.set(0.3, 0.81, z0 + 1.55); S.add(stamp);
    const key = keyLight(S, 0xffd9a0, 45, [-0.5, 2.6, z0 + 3], [0, 0.9, z0 + 1.4], 0.55); dust(S, 0, 1.4, z0 + 1.5, 2.5, 1.4, 1.5, 80);
    return { S, C, z0, setTag, env, doc, stamp, house, tagm }; },
  carlot() { const { S, C } = scene(0x1a1e2a, [14, 40]); S.add(new THREE.HemisphereLight(0x8a9ac8, 0x1a1a1a, 0.7));
    const sun = new THREE.DirectionalLight(0xffc890, 1.6); sun.position.set(-8, 10, 6); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, far: 50 }); S.add(sun);
    S.add(plane(80, 80, tmat(TX.concrete('#4a4a4e', [20, 20])), 0, 0, 0, -Math.PI / 2)); for (let i = -4; i <= 4; i++) S.add(box(0.08, 0.002, 5, basic(0xe8e0cc), i * 2.6, 0.005, 0, false));
    const nc = at(P4.car(0xc2372d), -1.6, 0, 0, 0.25); const oc = at(P4.car(0x6a7a6a, true), 2.2, 0, -0.4, -0.25); S.add(nc, oc);
    const bunt = group(); for (let i = 0; i < 18; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 3), std([0xc2372d, 0xe3c77a, 0x2f4d6b][i % 3], { side: THREE.DoubleSide })); f.rotation.x = Math.PI; f.position.set(-6 + i * 0.7, 3.3 - Math.sin(i / 17 * Math.PI) * 0.3, -3); bunt.add(f); } S.add(bunt);
    for (const x of [-6.2, 6.2]) S.add(cyl(0.06, 0.06, 3.5, std(0x8a8a8a, { metalness: 0.7 }), x, 0, -3));
    const office = group(rbox(5, 2.8, 3, 0.03, std(0xd8d0c0, { roughness: 0.8 }), 0, 0, 0)); office.position.set(0, 0, -8); S.add(shadowy(office));
    const board = P4.chalk(2.6, 1.3, ['MARCH: 10 SEDANS + 1 SUV', 'APRIL: 2 SUVs', 'AVG PRICE: UP!']); board.position.set(0, 1.6, -6.48); S.add(board);
    const tn = tag3(S, 'NEW: $393K', 1.1, '#fff', '#3f8a4a'), to = tag3(S, 'USED: $417K', 1.1, '#fff', '#c2372d'); tn.position.set(-1.6, 1.9, 0.5); to.position.set(2.2, 1.9, 0.1);
    return { S, C, nc, oc, board, tn, to, bunt }; },
  road() { const { S, C } = scene(0x2a2440, [20, 90]); S.add(new THREE.HemisphereLight(0xffb890, 0x2a2030, 0.9));
    const sun = new THREE.DirectionalLight(0xffa060, 1.8); sun.position.set(0, 6, -30); S.add(sun);
    S.add(plane(300, 300, tmat(TX.carpet('#6a5a3a', [60, 60])), 0, 0, 0, -Math.PI / 2)); S.add(plane(8, 300, tmat(TX.concrete('#2e2e32', [2, 60])), 0, 0.01, -100, -Math.PI / 2));
    for (let i = 0; i < 40; i++) S.add(box(0.15, 0.01, 1.5, basic(0xe8d070), 0, 0.02, -i * 5, false));
    const sky = poster(300, 80, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a2a5a'); g.addColorStop(0.6, '#c86a50'); g.addColorStop(1, '#ffb070'); x.fillStyle = g; x.fillRect(0, 0, w, h); }, true); sky.position.set(0, 30, -150); S.add(sky);
    const gantry = group(cyl(0.12, 0.12, 6, std(0x5a5a5a, { metalness: 0.6 }), -5, 0, 0), cyl(0.12, 0.12, 6, std(0x5a5a5a, { metalness: 0.6 }), 5, 0, 0), box(10.4, 0.2, 0.2, std(0x5a5a5a, { metalness: 0.6 }), 0, 6, 0));
    const sg = poster(5.2, 1.5, (x, w, h) => { x.fillStyle = '#1f6a3a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20); txt(x, 'ASKING PRICES', w / 2, h * 0.32, h * 0.22, '#fff'); txt(x, '$415K  -2.2%', w / 2, h * 0.68, h * 0.3, '#fff'); }, true); sg.position.set(0, 5.1, 0.12); gantry.add(sg); gantry.position.set(0, 0, -30); S.add(gantry);
    // car interior frame (dashboard + mirror) parented to camera
    const dash = group(rbox(3.2, 0.5, 0.8, 0.08, std(0x1a1a1e, { roughness: 0.6 }), 0, -0.95, -1.2)); const mirror = group(rbox(0.5, 0.16, 0.04, 0.02, std(0x111111), 0, 0, 0)); const mt = canvasTex(256, 80); const mm = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.13), basic(0xffffff, { map: mt.t })); mm.position.z = 0.025; mirror.add(mm); mirror.position.set(0, 0.42, -1.1); dash.add(mirror);
    mt.x.fillStyle = '#6a5a6a'; mt.x.fillRect(0, 0, 256, 80); txt(mt.x, 'SOLD: 3 MONTHS AGO', 128, 40, 30, '#fff'); mt.t.needsUpdate = true;
    const pillarM = std(0x141418); dash.add(box(0.12, 1.6, 0.12, pillarM, -1.35, -0.1, -1.0), box(0.12, 1.6, 0.12, pillarM, 1.35, -0.1, -1.0), box(3.0, 0.12, 0.12, pillarM, 0, 0.62, -1.0)); C.add(dash); S.add(C);
    return { S, C, dash, mirror }; },
  backyard() { const { S, C } = scene(0x241e36, [10, 26]); S.add(new THREE.HemisphereLight(0x8a7ab0, 0x2a2018, 0.7));
    S.add(plane(60, 60, tmat(TX.carpet('#3a5a2a', [20, 20])), 0, 0, 0, -Math.PI / 2)); S.add(at(P4.fence(40), -3.2, 0, -3)); S.add(at(P4.house(5, 4, 3, '#8a7a6a', '#3a2a20', true), 0, 0, -6.5));
    const grill = group(cyl(0.32, 0.25, 0.3, std(0x1e1e1e, { metalness: 0.6, roughness: 0.4 }), 0, 0.75, 0)); for (let i = 0; i < 3; i++) { const l = cyl(0.02, 0.02, 0.8, std(0x333333), Math.cos(i * 2.1) * 0.2, 0, Math.sin(i * 2.1) * 0.2); grill.add(l); }
    const coals = cyl(0.28, 0.28, 0.02, basic(0xff6a2a), 0, 1.04, 0); grill.add(coals); const burger = cyl(0.07, 0.07, 0.025, std(0x5a2a14), 0.05, 1.06, 0); grill.add(burger); grill.position.set(0, 0, 0); S.add(shadowy(grill));
    const gl = new THREE.PointLight(0xff8a40, 3, 3); gl.position.set(0, 1.4, 0); S.add(gl);
    const bulbs = []; for (let i = 0; i < 16; i++) { const x = -3.5 + i * 0.47, y = 2.6 - Math.sin(i / 15 * Math.PI) * 0.35; const b = sph(0.04, basic(0xffd58a), x, y, -1.5); S.add(b); bulbs.push(b); } for (let i = 0; i < 4; i++) { const l = new THREE.PointLight(0xffc070, 2, 5); l.position.set(-3 + i * 2, 2.3, -1.5); S.add(l); }
    const plate = poster(0.22, 0.22, (x, w, h) => { x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(w / 2, h / 2, w / 2, 0, TAU); x.fill(); txt(x, '+2.1%', w / 2, h * 0.35, h * 0.16, '#3f8a4a'); txt(x, '-3.4%', w / 2, h * 0.55, h * 0.16, '#c2372d'); txt(x, '= ?', w / 2, h * 0.75, h * 0.16); }); plate.rotation.x = -Math.PI / 2; const tbl = at(P4.table(0.45, '#8a6a46'), 1.5, 0, 0.4); S.add(tbl); plate.position.set(1.5, 0.785, 0.4); S.add(plate);
    keyLight(S, 0xffc890, 30, [2, 3.5, 3], [0.5, 0.9, 0], 0.6); return { S, C, burger, coals, plate }; },
  living() { const { S, C } = scene(0x0a0c10, [6, 14]); S.add(new THREE.AmbientLight(0x2a3040, 0.6));
    const z0 = roomShell(S, { w: 7, d: 5, h: 3, wall: TX.wall('#5a6a6a', '#4e5e5e', [3, 1]), floor: TX.wood('#7a5a3a', [3, 3]), right: true });
    const sofa = group(rbox(2.2, 0.45, 0.9, 0.08, std(0x8a4a3a, { roughness: 0.7 }), 0, 0, 0), rbox(2.2, 0.55, 0.22, 0.08, std(0x8a4a3a, { roughness: 0.7 }), 0, 0.4, -0.35), rbox(0.22, 0.6, 0.9, 0.08, std(0x7a3a2a), -1.1, 0, 0), rbox(0.22, 0.6, 0.9, 0.08, std(0x7a3a2a), 1.1, 0, 0)); sofa.position.set(0, 0, z0 + 0.8); S.add(shadowy(sofa));
    S.add(at(P3.frame(0.6, 0.4, (x, w, h) => { x.fillStyle = '#f0e0c0'; x.fillRect(0, 0, w, h); txt(x, 'HOME SWEET HOME', w / 2, h / 2, h * 0.2, '#7a3a2a'); }), 0, 1.85, z0 + 0.03)); S.add(at(P3.plant(), 2.3, 0, z0 + 0.5)); S.add(at(P3.lamp(0xe3c77a), -1.5, 0, z0 + 0.6));
    const wm = new THREE.MeshStandardMaterial({ color: 0x3d7fa6, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.2, emissive: 0x0a2030 }); const water = new THREE.Mesh(new THREE.PlaneGeometry(7, 5, 40, 30), wm); water.rotation.x = -Math.PI / 2; water.position.set(0, 0.02, z0 + 2.5); S.add(water);
    const pos = water.geometry.attributes.position, base = pos.array.slice(); water.userData.tick = t => { for (let i = 0; i < pos.count; i++) pos.array[i * 3 + 2] = base[i * 3 + 2] + Math.sin(t * 1.6 + base[i * 3] * 2.2) * 0.012 + Math.cos(t * 1.1 + base[i * 3 + 1] * 3) * 0.01; pos.needsUpdate = true; };
    const mug = P3.mug(0xc2372d); S.add(mug); keyLight(S, 0xbfe0ff, 40, [1, 2.8, z0 + 3.4], [0, 0.6, z0 + 1], 0.6); const fill = new THREE.PointLight(0xffc070, 1.5, 5); fill.position.set(-1.5, 1.5, z0 + 1); S.add(fill);
    return { S, C, z0, water, mug }; },
  harbour() { const { S, C } = scene(0x16243a, [14, 45]); S.add(new THREE.HemisphereLight(0x8aaad8, 0x182838, 1.6));
    const moon = new THREE.DirectionalLight(0xdfe8ff, 2.6); moon.position.set(-6, 10, -12); S.add(moon);
    const wm = new THREE.MeshStandardMaterial({ color: 0x2f6f92, roughness: 0.25, metalness: 0.3 }); const sea = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 60, 60), wm); sea.rotation.x = -Math.PI / 2; S.add(sea);
    const pos = sea.geometry.attributes.position, base = pos.array.slice(); sea.userData.tick = t => { for (let i = 0; i < pos.count; i++) pos.array[i * 3 + 2] = Math.sin(t * 0.8 + base[i * 3] * 0.6) * 0.06 + Math.cos(t * 0.6 + base[i * 3 + 1] * 0.5) * 0.05; pos.needsUpdate = true; sea.geometry.computeVertexNormals(); };
    const boats = []; const r = RH.rng(813); const bm = std(0xefe4cf, { roughness: 0.8 }), fm = std(0x5a7aa0, { roughness: 0.8 });
    for (let i = 0; i < 60; i++) { const g = group(box(0.4, 0.12, 0.18, i % 4 === 3 ? bm : fm, 0, 0, 0)); const sail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 3), bm); sail.position.y = 0.2; g.add(sail); g.position.set((r() - 0.5) * 16, 0, -r() * 14 + 2); g.rotation.y = r() * TAU; g.scale.setScalar(1.8); g.userData.sink = r(); g.userData.ph = r() * 6; S.add(shadowy(g)); boats.push(g); }
    const pier = group(); for (let i = 0; i < 10; i++) pier.add(box(2, 0.08, 0.3, tmat(TX.wood('#5a3e28', [1, 1])), 0, 0.5, i * 0.32)); for (let i = 0; i < 4; i++) pier.add(cyl(0.08, 0.08, 1.2, std(0x3a2a1a), -0.9 + (i % 2) * 1.8, -0.6, Math.floor(i / 2) * 2.8)); pier.position.set(-5, 0, 2); S.add(shadowy(pier));
    const lamp = new THREE.PointLight(0xffc070, 5, 10); lamp.position.set(-5, 2.5, 3); S.add(lamp); S.add(sph(0.1, basic(0xfff0c0), -5, 2.5, 3));
    const sky = poster(160, 50, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#05080f'); g.addColorStop(1, '#1a3048'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#f0f0d8'; x.beginPath(); x.arc(w * 0.3, h * 0.3, 18, 0, TAU); x.fill(); }, true); sky.position.set(0, 20, -40); S.add(sky);
    return { S, C, boats, sea }; },
  tabletop() { const { S, C } = scene(0x070504, [5, 12]); S.add(new THREE.AmbientLight(0x30241a, 0.5));
    const z0 = roomShell(S, { w: 6, d: 5, h: 3, wall: TX.wall('#2a221c', '#251e19', [3, 1]), floor: TX.wood('#2a1a10', [3, 3]) });
    S.add(rbox(3.0, 0.06, 1.4, 0.02, tmat(TX.wood('#5a3a26', [2, 1]), { roughness: 0.4 }), 0, 0.74, z0 + 1.4)); for (const [x, z] of [[-1.4, 0.8], [1.4, 0.8], [-1.4, 2.0], [1.4, 2.0]]) S.add(box(0.08, 0.74, 0.08, std(0x3a2416), x, 0.37, z0 + z));
    // gift box with bow + string to anvil
    const gift = group(rbox(0.36, 0.3, 0.36, 0.01, std(0xc2372d, { roughness: 0.5 }), 0, 0, 0), box(0.06, 0.305, 0.365, std(0xe3c77a, { metalness: 0.3 }), 0, 0.15, 0, true), box(0.365, 0.305, 0.06, std(0xe3c77a, { metalness: 0.3 }), 0, 0.15, 0, true));
    for (const a of [0.6, -0.6]) { const lp = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.018, 8, 20), std(0xe3c77a, { metalness: 0.3 })); lp.position.set(a * 0.08, 0.34, 0); lp.rotation.y = Math.PI / 2; lp.rotation.x = a; gift.add(lp); }
    gift.position.set(-0.7, 0.77, z0 + 1.4); S.add(shadowy(gift));
    const anvil = group(rbox(0.22, 0.08, 0.1, 0.01, std(0x3a3a3a, { metalness: 0.7, roughness: 0.4 }), 0, 0.06, 0), box(0.1, 0.06, 0.08, std(0x3a3a3a, { metalness: 0.7 }), 0, 0.03, 0)); anvil.position.set(0.9, 0.77, z0 + 1.6); S.add(shadowy(anvil));
    const curve = new THREE.CatmullRomCurve3([V3(-0.62, 1.1, z0 + 1.4), V3(-0.1, 0.9, z0 + 1.9), V3(0.5, 0.79, z0 + 1.8), V3(0.9, 0.85, z0 + 1.6)]); const str = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.006, 6), std(0xe3c77a)); S.add(str);
    const giftTag = poster(0.3, 0.12, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); txt(x, '3.5% DOWN · 0%', w / 2, h / 2, h * 0.32); }); giftTag.position.set(-0.7, 1.25, z0 + 1.55); S.add(giftTag);
    // scales
    const sc = group(cyl(0.12, 0.15, 0.04, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 })), cyl(0.015, 0.015, 0.7, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0.04, 0)); const beamS = group(box(0.9, 0.02, 0.02, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0, 0)); beamS.position.y = 0.74; sc.add(beamS);
    const pans = [-0.42, 0.42].map((x, i) => { const p = group(cyl(0.004, 0.004, 0.25, std(0x888888, { metalness: 0.9 }), 0, -0.25, 0), cyl(0.14, 0.11, 0.025, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, -0.27, 0)); p.position.x = x; beamS.add(p);
      const lab = poster(0.2, 0.08, (c, w, h) => { c.fillStyle = i ? '#c2372d' : '#3f8a4a'; c.fillRect(0, 0, w, h); txt(c, i ? 'AGAINST' : 'FOR', w / 2, h / 2, h * 0.6, '#fff'); }); lab.position.set(0, -0.36, 0.12); p.add(lab); return p; });
    sc.position.set(0.1, 0.77, z0 + 1.3); S.add(shadowy(sc)); sc.visible = false;
    // cake with candles
    const cake = group(cyl(0.3, 0.3, 0.18, std(0xf2e6d6, { roughness: 0.6 })), cyl(0.31, 0.31, 0.03, std(0xd86a7a), 0, 0.17, 0)); const flames = []; for (let i = 0; i < 40; i++) { const a = i / 40 * TAU, rr = i % 2 ? 0.24 : 0.16; cake.add(cyl(0.006, 0.006, 0.08, std(i % 3 ? 0xe3c77a : 0x5fa3a6), Math.cos(a) * rr, 0.2, Math.sin(a) * rr, 8)); const f = sph(0.012, basic(0xffb040), Math.cos(a) * rr, 0.295, Math.sin(a) * rr); f.scale.y = 1.6; f.visible = false; cake.add(f); flames.push(f); }
    cake.position.set(0, 0.77, z0 + 1.4); S.add(shadowy(cake)); cake.visible = false; const cl = new THREE.PointLight(0xffa040, 0, 3); cl.position.set(0, 1.3, z0 + 1.5); S.add(cl);
    // insurance letter + wall clock
    const letter = poster(0.32, 0.42, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'RENEWAL NOTICE', w / 2, h * 0.1, h * 0.06); txt(x, 'HOME INSURANCE', w / 2, h * 0.2, h * 0.055, '#5a4a3a'); txt(x, '+64%', w / 2, h * 0.5, h * 0.2, '#c2372d'); txt(x, 'since 2021', w / 2, h * 0.68, h * 0.07, '#5a4a3a'); }); letter.rotation.x = -Math.PI / 2; letter.position.set(-0.3, 0.805, z0 + 1.4); S.add(letter); letter.visible = false;
    const clock = P3.clockWall(0.3); clock.position.set(0.9, 1.9, z0 + 0.03); S.add(clock); keyLight(S, 0xffe2b8, 20, [0.9, 2.9, z0 + 1.6], [0.9, 1.9, z0], 0.45, false);
    const key = keyLight(S, 0xffd9a0, 50, [0.3, 2.8, z0 + 3.0], [0, 0.8, z0 + 1.4], 0.55); dust(S, 0, 1.4, z0 + 1.5, 2.5, 1.4, 1.5, 80);
    return { S, C, z0, gift, anvil, str, giftTag, sc, beamS, cake, flames, cl, letter, clock, key }; },
  bank() { const { S, C } = scene(0x080706, [7, 15]); S.add(new THREE.AmbientLight(0x30281f, 0.5));
    const z0 = roomShell(S, { w: 9, d: 5, h: 3.2, wall: TX.wall('#3a3026', '#30281f', [4, 1]), floor: TX.tile('#c8bca0', '#3a3026', [4, 4]) });
    // left half sepia 2006, right half today; a divider column
    S.add(box(0.2, 3.2, 0.4, std(0x1a1410), 0, 1.6, z0 + 0.8));
    for (const sx of [-1, 1]) { S.add(rbox(3.4, 1.05, 0.6, 0.02, tmat(TX.wood(sx < 0 ? '#7a5a36' : '#3a3e46', [2, 1])), sx * 2.3, 0, z0 + 1.2)); S.add(box(3.4, 0.05, 0.62, std(sx < 0 ? 0xc9a24a : 0x8a8a8a, { metalness: 0.7, roughness: 0.3 }), sx * 2.3, 1.07, z0 + 1.2)); }
    const confetti = []; const r = RH.rng(2006); for (let i = 0; i < 70; i++) { const p = box(0.12, 0.002, 0.16, std(0xefe4cf, { side: THREE.DoubleSide }), -2.3 + (r() - 0.5) * 3, 1 + r() * 2, z0 + 1.6 + (r() - 0.5), false); p.userData.v = [r() - 0.5, r(), r() * 6]; S.add(p); confetti.push(p); }
    const sl = poster(1.6, 0.4, (x, w, h) => { x.fillStyle = '#6b5a3a'; x.fillRect(0, 0, w, h); txt(x, 'NO INCOME? NO PROBLEM!', w / 2, h / 2, h * 0.32, '#f4ecd8'); }, true); sl.position.set(-2.3, 2.4, z0 + 0.03); S.add(sl);
    const sr = poster(1.6, 0.4, (x, w, h) => { x.fillStyle = '#24303a'; x.fillRect(0, 0, w, h); txt(x, 'PROOF OF INCOME, PLEASE', w / 2, h / 2, h * 0.3, '#e8e0cc'); }, true); sr.position.set(2.3, 2.4, z0 + 0.03); S.add(sr);
    const slip = poster(0.24, 0.3, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'PAY SLIP', w / 2, h * 0.15, h * 0.11); txt(x, '✓', w / 2, h * 0.6, h * 0.35, '#3f8a4a'); }); slip.rotation.x = -Math.PI / 2; slip.position.set(2.0, 1.1, z0 + 1.2); S.add(slip);
    const glass = group(new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 24), std(0x2a2a2a, { metalness: 0.6 })), box(0.025, 0.16, 0.02, std(0x3a2a1a), 0, -0.15, 0)); glass.position.set(2.1, 1.3, z0 + 1.3); S.add(glass);
    keyLight(S, 0xffc080, 40, [-2.3, 2.9, z0 + 3], [-2.3, 1, z0 + 1.2], 0.55); keyLight(S, 0xc8d8ff, 40, [2.3, 2.9, z0 + 3], [2.3, 1, z0 + 1.2], 0.55);
    return { S, C, z0, confetti, glass }; },
  vault() { const { S, C } = scene(0x060708, [6, 14]); S.add(new THREE.AmbientLight(0x2a3038, 0.5));
    const z0 = roomShell(S, { w: 8, d: 5, h: 3.2, wall: TX.concrete('#4a4e54', [3, 1]), floor: TX.concrete('#2a2c30', [3, 3]) });
    const door = group(cyl(1.25, 1.25, 0.3, std(0x6a7480, { metalness: 0.85, roughness: 0.3 }), 0, 0, 0, 64)); door.children[0].rotation.x = Math.PI / 2; door.children[0].position.set(0, 0, 0.15); const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.04, 12, 48), std(0xc9a24a, { metalness: 0.9, roughness: 0.25 })); wheel.position.z = 0.33; door.add(wheel); for (let i = 0; i < 3; i++) { const sp = box(0.8, 0.04, 0.04, std(0xc9a24a, { metalness: 0.9 }), 0, 0, 0.33); sp.rotation.z = i * Math.PI / 3; door.add(sp); }
    door.position.set(0, 1.5, z0 + 0.02); S.add(shadowy(door));
    const locks = ['RULES', 'FIXED', '$18T'].map((l, i) => { const g = group(rbox(0.32, 0.3, 0.12, 0.03, std(0xd9b04a, { metalness: 0.85, roughness: 0.3 }), 0, -0.15, 0)); const sh = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 8, 24, Math.PI), std(0xb0b0b0, { metalness: 0.9, roughness: 0.2 })); sh.position.y = 0.15; g.add(sh);
      const lab = poster(0.3, 0.1, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); txt(x, l, w / 2, h / 2, h * 0.7); }); lab.position.set(0, -0.32, 0.07); g.add(lab); g.position.set(-0.75 + i * 0.75, 1.5 + (i === 1 ? 0.55 : 0), z0 + 0.45); S.add(shadowy(g)); return g; });
    const crackPts = [[0.9, 0.6], [1.2, 0.45], [1.45, 0.55], [1.8, 0.3], [2.3, 0.35], [2.7, 0.15]]; const crack = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(crackPts.map(p => V3(p[0], p[1], z0 + 0.04))), 40, 0.012, 4), basic(0xefe4cf)); S.add(crack);
    const tiny = at(P4.house(0.5, 0.4, 0.4, '#c9bc9e', '#6a5a48', true), 2.9, 0, z0 + 0.6); S.add(tiny);
    keyLight(S, 0xdfe8ff, 55, [0, 3, z0 + 3.5], [0, 1.4, z0], 0.6); return { S, C, z0, locks, crack, tiny, wheel }; },
  hall() { const { S, C } = scene(0x0a0806, [7, 16]); S.add(new THREE.AmbientLight(0x3a2e24, 0.55));
    const z0 = roomShell(S, { w: 10, d: 7, h: 3.6, wall: TX.wall('#6a5240', '#5a4434', [4, 1]), floor: TX.wood('#7a5636', [4, 4]), right: true });
    const chairs = []; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; const c = at(P4.chairWood(), Math.cos(a) * 1.6, 0, z0 + 3.4 + Math.sin(a) * 1.2, -a - Math.PI / 2); S.add(c); chairs.push(c); }
    const rp = group(rbox(0.5, 0.18, 0.4, 0.03, tmat(TX.wood('#4a2a1c', [1, 1])), 0, 0.75, 0), cyl(0.18, 0.18, 0.01, std(0x111111, { roughness: 0.2 }), 0, 0.93, 0)); const horn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.35, 24, 1, true), std(0xc9a24a, { metalness: 0.8, side: THREE.DoubleSide })); horn.position.set(0.15, 1.15, -0.1); horn.rotation.z = -0.8; rp.add(horn); rp.add(at(P4.table(0.3), 0, 0, 0)); rp.position.set(3.6, 0, z0 + 1); S.add(shadowy(rp));
    S.add(at(P3.window(1.4, 1.6, (x, w, h) => { x.fillStyle = '#c86a50'; x.fillRect(0, 0, w, h); }), -2.5, 1.9, z0 + 0.02)); S.add(at(P3.window(1.4, 1.6, (x, w, h) => { x.fillStyle = '#c86a50'; x.fillRect(0, 0, w, h); }), 1.5, 1.9, z0 + 0.02));
    const banner = P4.sign(3, 0.5, (x, w, h) => { x.fillStyle = '#e3c77a'; x.fillRect(0, 0, w, h); txt(x, 'COMMUNITY GAMES NIGHT', w / 2, h / 2, h * 0.55); }); banner.position.set(-0.5, 2.9, z0 + 0.03); S.add(banner);
    const door = group(box(1.2, 2.3, 0.08, std(0x4a2a1c), 0, 1.15, 0)); door.position.set(4.95, 0, z0 + 4.5); door.rotation.y = -Math.PI / 2; S.add(door);
    keyLight(S, 0xffd090, 60, [0, 3.4, z0 + 5.5], [0, 0.6, z0 + 3.4], 0.6); S.add(at(P3.pendant(0x5a3a22), 0, 3.5, z0 + 3.4)); dust(S, 0, 1.8, z0 + 3, 4, 2, 3, 120);
    return { S, C, z0, chairs, door }; },
  club() { const { S, C } = scene(0x15162a, [14, 40]); S.add(new THREE.HemisphereLight(0x7a7ab0, 0x18141a, 0.7));
    S.add(plane(80, 80, tmat(TX.carpet('#2a3a24', [30, 30])), 0, 0, 0, -Math.PI / 2)); S.add(plane(3, 10, tmat(TX.concrete('#8a8478', [1, 4])), 0, 0.01, 2, -Math.PI / 2));
    const h = at(P4.house(6, 4, 3.4, '#e9dfc8', '#8a6a46', true), 0, 0, -3); S.add(h); S.add(at(P4.tree(4), -5, 0, -2), at(P4.tree(3.6), 5.5, 0, -2.5));
    const posts = [-1.2, 1.2].map(x => { const g = group(cyl(0.06, 0.1, 1.0, std(0xc9a24a, { metalness: 0.9, roughness: 0.25 })), sph(0.08, std(0xc9a24a, { metalness: 0.9 }), 0, 1.05, 0)); g.position.set(x, 0, 0.6); S.add(shadowy(g)); return g; });
    const rope = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(-1.2, 0.95, 0.6), V3(0, 0.6, 0.6), V3(1.2, 0.95, 0.6)]), 30, 0.035, 8), std(0xa01a2a, { roughness: 0.6 })); S.add(rope);
    const sg = P4.sign(1.5, 0.6, (x, w, h2) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, h2); x.strokeStyle = '#e3c77a'; x.lineWidth = 6; x.strokeRect(8, 8, w - 16, h2 - 16); txt(x, 'MEMBERS ONLY', w / 2, h2 * 0.36, h2 * 0.25, '#e3c77a'); txt(x, 'INCOME $228,000+', w / 2, h2 * 0.7, h2 * 0.2, '#efe4cf'); }, 1.1); sg.position.set(2.2, 0, 0.3); sg.rotation.y = -0.3; S.add(sg);
    for (const x of [-2, 2]) { const l = new THREE.PointLight(0xffd090, 4, 7); l.position.set(x, 2.8, 0.5); S.add(l); }
    return { S, C }; },
  pond() { const { S, C } = scene(0x0e141c, [10, 30]); S.add(new THREE.HemisphereLight(0xa8c8e8, 0x101820, 0.8));
    const sun = new THREE.DirectionalLight(0xd8e8ff, 1.4); sun.position.set(-5, 10, 5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); S.add(sun);
    S.add(plane(60, 60, tmat(TX.carpet('#e8eef2', [20, 20])), 0, -0.02, 0, -Math.PI / 2));
    const ice = new THREE.Mesh(new THREE.CircleGeometry(4, 64), new THREE.MeshStandardMaterial({ map: ctex('ice', 512, 512, (x, w, h, r) => { const g = x.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); g.addColorStop(0, '#dff0fa'); g.addColorStop(1, '#a8cce0'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,0.4)'; for (let i = 0; i < 60; i++) { x.beginPath(); x.moveTo(r() * w, r() * h); x.lineTo(r() * w, r() * h); x.stroke(); } }), roughness: 0.1, metalness: 0.3 })); ice.rotation.x = -Math.PI / 2; ice.receiveShadow = true; S.add(ice);
    for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; S.add(at(P4.tree(2.2 + (i % 3) * 0.5, 0x2a4a3a), Math.cos(a) * 6, 0, Math.sin(a) * 6)); }
    const labels = ['1 JOBS', '2 COSTS', '3 RATES FALL?', '4 TIME']; const cracks = [[[-2.2, -0.5], [-1.4, -0.2], [-0.9, -0.6], [-0.2, -0.3]], [[0.4, -1.4], [0.9, -0.9], [1.5, -1.2], [2.3, -0.8]], [[-1.8, 1.0], [-1.0, 0.7], [-0.4, 1.3], [0.3, 1.0]], [[0.8, 0.6], [1.4, 1.1], [2.0, 0.9], [2.6, 1.5]]].map((pts, i) => {
      const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => V3(p[0], 0.01, p[1]))), 40, 0.025, 4), basic(0x1e3a52)); S.add(m); m.visible = false; const lb = tag3(S, labels[i], 0.9); lb.position.set(pts[1][0], 0.45, pts[1][1]); lb.visible = false; m.userData.lab = lb; return m; });
    const house = at(P4.house(1.6, 1.4, 1.3, '#9a8a70', '#3a2a20', true), 4.6, 0, -2.5, -0.6); S.add(house);
    const fs = P4.sign(0.6, 0.35, (x, w, h) => { x.fillStyle = '#efe4cf'; x.fillRect(0, 0, w, h); x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h * 0.35); txt(x, 'FOR SALE', w / 2, h * 0.18, h * 0.25, '#fff'); txt(x, '1st time in 40 yrs', w / 2, h * 0.65, h * 0.18); }, 0.6); fs.position.set(3.6, 0, -1.6); fs.rotation.y = -0.5; S.add(fs);
    return { S, C, cracks, house }; },
  wallet() { return SETB.cork(); },
});
