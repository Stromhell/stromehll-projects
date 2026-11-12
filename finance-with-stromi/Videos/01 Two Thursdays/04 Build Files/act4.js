/* ACT 4: the crash day (5 Nov)  +  ACT 5: the week after */
function repaint(p, paint) { const T = p.userData.T; paint(T.x, T.c.width, T.c.height); T.t.needsUpdate = true; }
function rain(S, cx, cz, sx, sz, top, n) { // falling streaks, ticked by the engine
  const g = new THREE.BufferGeometry(), p = new Float32Array(n * 6), r = RH.rng(n), D = [];
  for (let i = 0; i < n; i++) D.push([cx + (r() - 0.5) * sx, cz + (r() - 0.5) * sz, r() * top, 5 + r() * 3]);
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const L = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xbcd0e8, transparent: true, opacity: 0.45, depthWrite: false })); S.add(L);
  L.userData.tick = t => { for (let i = 0; i < n; i++) { const d = D[i]; const y = top - ((d[2] + t * d[3]) % top); p.set([d[0], y, d[1], d[0] + 0.02, y + 0.22, d[1]], i * 6); } g.attributes.position.needsUpdate = true; };
  return L;
}
function sky(S, top, bot, z, w, h, extra) { const p = poster(w || 60, h || 24, (x, ww, hh) => { const g = x.createLinearGradient(0, 0, 0, hh); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, ww, hh); if (extra) extra(x, ww, hh); }, true); p.position.set(0, (h || 24) / 2 - 2, z); p.material.fog = false; S.add(p); return p; }
function sleeveHand(col) { // off-screen person's arm: sleeve + white glove (never a real person)
  const g = group(cyl(0.07, 0.08, 0.8, std(col || 0x22262c, { roughness: 0.6 }), 0, -0.86, 0), cyl(0.085, 0.085, 0.07, std(0xf4f0e6), 0, -0.1, 0)); g.add(sph(0.085, std(0xf4f0e6, { roughness: 0.5 }), 0, 0.02, 0)); g.add(at(cyl(0.025, 0.025, 0.1, std(0xf4f0e6)), 0.05, 0.02, 0.04)); g.children[0].rotation.x = 0; return shadowy(g);
}

Object.assign(SETB, {
  customs() { // rainy harbour checkpoint at night, crates of chips waiting
    const { S, C } = scene(0x070a10, [9, 22]);
    S.add(new THREE.AmbientLight(0x30405a, 0.9)); const moon = new THREE.DirectionalLight(0x7088c0, 0.6); moon.position.set(-3, 6, 2); S.add(moon);
    sky(S, '#060912', '#1c2a40', -14, 60, 20, (x, w, h) => { const r = RH.rng(31); for (let i = 0; i < 40; i++) { const bx = r() * w, bw = 20 + r() * 60, bh = 40 + r() * h * 0.5; x.fillStyle = '#0d1420'; x.fillRect(bx, h - bh, bw, bh); x.fillStyle = 'rgba(255,210,140,0.5)'; for (let k = 0; k < 14; k++) if (r() > 0.5) x.fillRect(bx + 4 + r() * (bw - 8), h - bh + 6 + r() * (bh - 12), 3, 4); } });
    const ground = plane(30, 20, tmat(TX.concrete('#3a3e44', [8, 6]), { roughness: 0.25, metalness: 0.2 }), 0, 0, -3, -Math.PI / 2); S.add(ground);
    for (let i = 0; i < 6; i++) { const pd = plane(0.9 + i % 3 * 0.4, 0.5 + i % 2 * 0.3, std(0x0a0f18, { roughness: 0.02, metalness: 0.9, transparent: true, opacity: 0.8 }), -3 + i * 1.3, 0.004, 0.5 - (i % 3) * 0.8, -Math.PI / 2); S.add(pd); }
    // booth
    const bm = std(0xd9d2c0, { roughness: 0.6 }), rm = std(0xc2372d, { roughness: 0.5 });
    const booth = group(rbox(1.6, 0.9, 1.4, 0.03, bm, 0, 0, 0), rbox(1.7, 0.12, 1.5, 0.03, rm, 0, 2.2, 0), box(0.08, 1.3, 0.08, bm, -0.76, 1.55, 0.66), box(0.08, 1.3, 0.08, bm, 0.76, 1.55, 0.66), box(1.6, 1.3, 0.05, bm, 0, 1.55, -0.68), box(0.05, 1.3, 1.4, bm, -0.78, 1.55, 0), box(0.05, 1.3, 1.4, bm, 0.78, 1.55, 0));
    booth.add(at(poster(1.3, 0.28, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'CUSTOMS  ·  ENTRY', w / 2, h / 2, h * 0.55, '#c2372d'); }, true), 0, 2.08, 0.76));
    booth.add(at(new THREE.Mesh(new THREE.PlaneGeometry(1.44, 1.24), new THREE.MeshStandardMaterial({ color: 0x9fc0d8, transparent: true, opacity: 0.12, roughness: 0.05, metalness: 0.3 })), 0, 1.55, 0.7));
    booth.position.set(1.4, 0, -1.6); S.add(shadowy(booth));
    S.add(at(new THREE.PointLight(0xffe0a8, 3, 3, 1.6), 1.4, 2.0, -1.4));
    // barrier arm
    const post = cyl(0.08, 0.1, 1.0, std(0x2a2a2a, { metalness: 0.5 }), 2.4, 0, -0.3); S.add(post);
    const arm = new THREE.Group(); arm.position.set(2.4, 0.95, -0.3); S.add(arm); for (let i = 0; i < 8; i++) arm.add(box(0.4, 0.07, 0.07, std(i % 2 ? 0xc2372d : 0xf4ecd8, { roughness: 0.5 }), 0.2 + i * 0.4, 0, 0));
    // crates of chips under a tarp, stacked properly (each sits on the one below)
    const crates = group(); const cl = (x, y, z, s) => { const c = P3.crate('H200', s); c.position.set(x, y, z); crates.add(c); };
    cl(-0.85, 0, 0, 1); cl(0, 0, 0, 2); cl(0.85, 0, 0, 3); cl(-0.42, 0.6, 0, 4); cl(0.42, 0.6, 0, 5); cl(0, 1.2, 0, 6); cl(-0.85, 0, -0.65, 7); cl(0.85, 0, -0.65, 8);
    for (const [x, y] of [[-0.85, 0.3], [0, 0.3], [0.85, 0.3], [-0.42, 0.9], [0.42, 0.9], [0, 1.5]]) crates.add(at(poster(0.5, 0.3, (c, w, h) => { c.fillStyle = '#f4ecd8'; c.fillRect(0, 0, w, h); txt(c, 'H200', w / 2, h * 0.42, h * 0.45, '#15402a'); txt(c, 'NVIDIA', w / 2, h * 0.8, h * 0.2, '#3a2a20'); }), x, y, 0.305));
    crates.position.set(-1.6, 0, -1.3); S.add(crates);
    const lamp = group(cyl(0.05, 0.07, 3.6, std(0x1e2228, { metalness: 0.6 })), box(0.7, 0.05, 0.05, std(0x1e2228), 0.3, 3.55, 0), box(0.3, 0.08, 0.18, std(0x1e2228), 0.6, 3.5, 0)); lamp.position.set(-3.4, 0, -0.4); S.add(shadowy(lamp));
    keyLight(S, 0xffe2b0, 60, [-2.8, 3.4, -0.4], [-1.2, 0, -1.0], 0.75); beam(S, [-2.8, 3.42, -0.4], [-1.4, 0, -1.0], 1.5, 0xffe2b0, 0.05);
    S.add(at(P3.window(1.2, 0.8, (x, w, h) => { x.fillStyle = '#1a2230'; x.fillRect(0, 0, w, h); txt(x, '600,000', w / 2, h * 0.4, h * 0.3, '#e3c77a'); txt(x, 'WAITING', w / 2, h * 0.72, h * 0.18, '#e8e0cc'); }), -1.6, 2.6, -3.0));
    rain(S, 0, -1, 12, 8, 6, 900);
    return { S, C, booth, arm, crates };
  },
  insure() { // the crash-insurance counter: a queue and a fear gauge
    const { S, C } = scene(0x080706, [8, 18]);
    S.add(new THREE.AmbientLight(0x3a3228, 0.8)); S.add(at(new THREE.PointLight(0xffd0a0, 4, 10, 1.5), 0, 2.6, 1.5));
    const z0 = roomShell(S, { w: 10, d: 7, h: 3.2, floor: TX.tile('#d8cfb8', '#3a3026', [8, 8]), wall: TX.wall('#3f4a3a', '#33402f', [5, 1]), left: true, right: true });
    const counter = group(rbox(3.4, 1.05, 0.7, 0.03, tmat(TX.wood('#5a3a26', [2, 1])), 0, 0, 0), box(3.5, 0.05, 0.8, std(0xe8e0cc, { roughness: 0.3 }), 0, 1.07, 0)); counter.position.set(2.0, 0, -1.6); S.add(shadowy(counter));
    for (let i = 0; i < 4; i++) S.add(box(0.03, 0.9, 0.03, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0.5 + i, 1.55, -1.3));
    S.add(at(poster(2.6, 0.45, (x, w, h) => { x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h); txt(x, 'CRASH INSURANCE', w / 2, h / 2, h * 0.6, '#f4ecd8'); }, true), 2.0, 2.65, z0 + 0.05));
    // fear gauge (big dial) on the wall
    const dial = poster(1.6, 1.6, (x, w, h) => { x.fillStyle = '#efe4cf'; x.beginPath(); x.arc(w / 2, h / 2, w * 0.48, 0, TAU); x.fill(); x.lineWidth = w * 0.06; [['#3f9b5f', Math.PI, Math.PI * 1.4], ['#d9a23a', Math.PI * 1.4, Math.PI * 1.7], ['#c2372d', Math.PI * 1.7, TAU]].forEach(([c, a, b]) => { x.strokeStyle = c; x.beginPath(); x.arc(w / 2, h / 2, w * 0.38, a, b); x.stroke(); }); txt(x, 'VIX', w / 2, h * 0.7, h * 0.14); txt(x, 'FEAR GAUGE', w / 2, h * 0.84, h * 0.08, '#5a4a3a'); });
    dial.position.set(-1.6, 1.9, z0 + 0.05); S.add(dial); S.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.04, 12, 48), std(0x2a2a2a, { metalness: 0.7 })), -1.6, 1.9, z0 + 0.06));
    const needle = box(0.05, 0.62, 0.02, std(0x1e1612), 0, 0, 0, false); needle.geometry.translate(0, 0.3, 0); needle.position.set(-1.6, 1.9, z0 + 0.09); S.add(needle);
    S.add(sph(0.06, std(0x1e1612, { metalness: 0.6 }), -1.6, 1.9, z0 + 0.1));
    const rope = []; for (let i = 0; i < 5; i++) { S.add(cyl(0.03, 0.05, 0.9, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), -2.6 + i * 1.0, 0, 0.3)); }
    for (let i = 0; i < 4; i++) { const rp = box(1.0, 0.04, 0.04, std(0x8a2f3c, { roughness: 0.5 }), -2.1 + i * 1.0, 0.8, 0.3); S.add(rp); rope.push(rp); }
    keyLight(S, 0xffe0b0, 50, [1, 3.0, 1.5], [0, 0.6, -0.6], 0.8); dust(S, 0, 1.5, -0.5, 6, 2, 2, 140);
    return { S, C, needle, z0 };
  },
  yacht() { // golden-hour deck at sea
    const { S, C } = scene(0xf0a868, [14, 40]);
    S.add(new THREE.HemisphereLight(0xffd8a8, 0x2a3a5a, 1.0)); const sun = new THREE.DirectionalLight(0xffc080, 2.2); sun.position.set(-6, 4, -8); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); sun.shadow.camera.left = -6; sun.shadow.camera.right = 6; sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6; S.add(sun);
    sky(S, '#6a5a8a', '#e08a4a', -30, 220, 40, (x, w, h) => { const r = RH.rng(8); for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(${200 + r() * 55 | 0},${120 + r() * 60 | 0},${110 + r() * 40 | 0},${0.25 + r() * 0.3})`; x.beginPath(); x.ellipse(r() * w, h * (0.15 + r() * 0.5), 40 + r() * 120, 6 + r() * 14, 0, 0, TAU); x.fill(); } const g = x.createRadialGradient(w * 0.3, h * 0.84, 2, w * 0.3, h * 0.84, w * 0.08); g.addColorStop(0, 'rgba(255,240,190,1)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); });
    const sg = new THREE.PlaneGeometry(80, 60, 70, 50); sg.rotateX(-Math.PI / 2); const sea = new THREE.Mesh(sg, std(0x2a5a7a, { roughness: 0.25, metalness: 0.3 })); sea.position.set(0, -0.6, -10); S.add(sea);
    const base = sg.attributes.position.array.slice(); sea.userData.tick = t => { const a = sg.attributes.position.array; for (let i = 0; i < a.length; i += 3) a[i + 1] = Math.sin(base[i] * 0.6 + t * 1.2) * 0.12 + Math.cos(base[i + 2] * 0.8 + t * 0.9) * 0.1; sg.attributes.position.needsUpdate = true; sg.computeVertexNormals(); };
    const deck = new THREE.Group(); S.add(deck);
    const dm = tmat(TX.wood('#a0703c', [6, 3], 'deck'), { roughness: 0.45 }); deck.add(rbox(7, 0.2, 4.2, 0.06, std(0xf4f0e6, { roughness: 0.3 }), 0, -0.2, -0.6)); deck.add(box(6.8, 0.02, 4.0, dm, 0, 0.01, -0.6));
    const ch = std(0xdfe4e8, { metalness: 0.9, roughness: 0.2 }); for (let i = 0; i < 9; i++) deck.add(cyl(0.02, 0.02, 0.9, ch, -3.3 + i * 0.82, 0, -2.6)); deck.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 6.6, 12), ch), 0, 0.9, -2.6)).children; const rail = deck.children[deck.children.length - 1]; rail.rotation.z = Math.PI / 2;
    // loungers, champagne bucket, cabin
    for (const x of [-1.8, -0.6]) { const l = group(rbox(0.6, 0.12, 1.6, 0.03, std(0xf4ecd8), 0, 0.25, 0), box(0.04, 0.26, 0.04, ch, -0.26, 0.13, 0.7), box(0.04, 0.26, 0.04, ch, 0.26, 0.13, 0.7), box(0.04, 0.26, 0.04, ch, -0.26, 0.13, -0.7), box(0.04, 0.26, 0.04, ch, 0.26, 0.13, -0.7)); const back = rbox(0.6, 0.6, 0.1, 0.03, std(0xf4ecd8), 0, 0.3, -0.72); back.rotation.x = -0.5; l.add(back); l.position.set(x, 0, -1.2); deck.add(shadowy(l)); }
    const bucket = group(cyl(0.12, 0.1, 0.25, ch), cyl(0.035, 0.035, 0.35, std(0x1e4a2a, { roughness: 0.2 }), 0, 0.15, 0)); bucket.position.set(-1.2, 0.0, -0.1); deck.add(shadowy(bucket));
    const cabin = group(rbox(2.4, 1.6, 2.0, 0.08, std(0xf4f0e6, { roughness: 0.3 }), 0, 0, 0), box(2.2, 0.5, 0.02, std(0x203040, { roughness: 0.05, metalness: 0.6 }), 0, 1.05, 1.01)); cabin.position.set(2.4, 0, -1.4); deck.add(shadowy(cabin));
    deck.add(at(poster(1.0, 0.7, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'PORTFOLIO', w / 2, h * 0.15, h * 0.13); ['NVDA', 'AVGO', 'MSFT', 'META'].forEach((n, i) => { txt(x, n, w * 0.3, h * (0.35 + i * 0.15), h * 0.11); txt(x, '+' + (60 + i * 17) + '%', w * 0.72, h * (0.35 + i * 0.15), h * 0.11, '#3f9b5f'); }); }), 2.4, 1.0, -0.39));
    deck.userData.tick = t => { deck.rotation.z = Math.sin(t * 0.7) * 0.012; deck.position.y = Math.sin(t * 0.9) * 0.03; };
    return { S, C, deck };
  },
  coaster() { // night fairground rollercoaster: Fri up, Mon up-up, Tue drop
    const { S, C } = scene(0x0a0812, [14, 34]);
    S.add(new THREE.AmbientLight(0x40385a, 1.0)); const ml = new THREE.DirectionalLight(0x8090d0, 0.8); ml.position.set(-4, 8, 6); ml.castShadow = true; ml.shadow.mapSize.set(1024, 1024); ml.shadow.camera.left = -12; ml.shadow.camera.right = 12; ml.shadow.camera.top = 10; ml.shadow.camera.bottom = -10; S.add(ml);
    sky(S, '#06040e', '#2a2040', -24, 120, 40, (x, w, h) => { const r = RH.rng(5); x.fillStyle = '#fff'; for (let i = 0; i < 160; i++) x.fillRect(r() * w, r() * h * 0.7, 1.5, 1.5); });
    S.add(plane(60, 40, tmat(TX.concrete('#2a2830', [10, 8])), 0, 0, -6, -Math.PI / 2));
    const pts = [[-9, 1.0], [-6, 1.6], [-4, 3.0], [-2.5, 2.2], [-1, 3.6], [1, 5.6], [2.5, 4.2], [4, 2.0], [5.5, 0.8], [7.5, 0.6], [10, 0.6]].map(([x, y]) => V3(x, y, -2));
    const curve = new THREE.CatmullRomCurve3(pts); const rm = std(0xc2372d, { metalness: 0.5, roughness: 0.35 }), sm = std(0x5a5a62, { metalness: 0.6, roughness: 0.5 });
    for (const dz of [-0.35, 0.35]) { const off = new THREE.CatmullRomCurve3(pts.map(p => V3(p.x, p.y, p.z + dz))); const m = new THREE.Mesh(new THREE.TubeGeometry(off, 300, 0.05, 8), rm); m.castShadow = true; S.add(m); }
    for (let i = 0; i <= 120; i++) { const u = i / 120, p = curve.getPointAt(u), tg = curve.getTangentAt(u); const tie = box(0.06, 0.04, 0.8, std(0x3a281c), p.x, p.y - 0.05, p.z); tie.rotation.z = Math.atan2(tg.y, tg.x); S.add(tie); if (i % 6 === 0) { S.add(cyl(0.05, 0.06, p.y - 0.05, sm, p.x, 0, p.z - 0.35)); S.add(cyl(0.05, 0.06, p.y - 0.05, sm, p.x, 0, p.z + 0.35)); } }
    const cart = group(rbox(1.2, 0.45, 0.9, 0.06, std(0x3f6b8a, { roughness: 0.35, metalness: 0.3 }), 0, 0, 0), box(1.25, 0.08, 0.95, std(0xe3c77a, { metalness: 0.8, roughness: 0.3 }), 0, 0.42, 0)); S.add(shadowy(cart));
    // fairground lights + signs
    const bulbs = []; for (let i = 0; i < 40; i++) { const p = curve.getPointAt(i / 40); const b = sph(0.06, basic(0xffe08a), p.x, p.y + 0.15, p.z - 0.45); b.castShadow = false; S.add(b); bulbs.push(b); }
    const sign = (txt0, x, y, col) => { const p = poster(1.5, 0.5, (c, w, h) => { c.fillStyle = col; c.fillRect(0, 0, w, h); txt(c, txt0, w / 2, h / 2, h * 0.55, '#fff'); }, true); p.position.set(x, y, -2.9); S.add(p); };
    sign('FRI', -4, 3.9, '#3f9b5f'); sign('MON', 1, 6.4, '#3f9b5f'); sign('TUE', 4.6, 3.2, '#c2372d');
    S.add(at(new THREE.PointLight(0xff9ab0, 6, 10, 1.6), 1, 5, 1)); keyLight(S, 0xffe0b0, 60, [0, 9, 4], [1, 2, -2], 0.7);
    return { S, C, curve, cart, bulbs };
  },
  capitol() { // a domed hall at dusk and a giant brake lever
    const { S, C } = scene(0x2a2234, [16, 44]);
    S.add(new THREE.HemisphereLight(0xffc8a0, 0x302840, 0.9)); const sun = new THREE.DirectionalLight(0xffb070, 2.0); sun.position.set(6, 5, 4); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); sun.shadow.camera.left = -8; sun.shadow.camera.right = 8; sun.shadow.camera.top = 8; sun.shadow.camera.bottom = -8; S.add(sun);
    sky(S, '#2a2050', '#f0906a', -30, 120, 40);
    S.add(plane(60, 40, tmat(TX.concrete('#8a8478', [10, 8])), 0, 0, -6, -Math.PI / 2));
    const mar = std(0xe8e2d4, { roughness: 0.5 }); const hall = new THREE.Group(); hall.position.set(0, 0, -12); S.add(hall);
    for (let i = 0; i < 4; i++) hall.add(box(12 - i * 0.6, 0.25, 3 - i * 0.2, mar, 0, 0.125 + i * 0.25, 2.2 - i * 0.1));
    hall.add(box(10, 3.5, 3, mar, 0, 2.75, 0)); for (let i = 0; i < 10; i++) hall.add(cyl(0.2, 0.22, 3.4, mar, -4.5 + i, 1.0, 1.7, 20)); hall.add(box(10.4, 0.4, 0.8, mar, 0, 4.6, 1.7));
    const pedi = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 2.6, 1.1, 3, 1), mar); pedi.rotation.set(Math.PI / 2, 0, 0); pedi.scale.set(1.9, 1, 0.5); pedi.position.set(0, 5.3, 1.7); pedi.rotation.set(0, 0, 0); hall.add(cyl(2.2, 2.4, 1.6, mar, 0, 4.5, 0, 48)); for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; hall.add(cyl(0.08, 0.08, 1.4, mar, Math.sin(a) * 2.3, 4.6, Math.cos(a) * 2.3, 10)); }
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.2, 48, 24, 0, TAU, 0, Math.PI / 2), mar); dome.position.set(0, 6.1, 0); hall.add(dome); hall.add(cyl(0.3, 0.35, 0.9, mar, 0, 8.25, 0)); hall.add(sph(0.18, std(0xc9a24a, { metalness: 0.9 }), 0, 9.25, 0)); shadowy(hall);
    for (let i = 0; i < 40; i++) { const w = sph(0.05, basic(0xffd890), -4.5 + (i % 10), 1.4 + Math.floor(i / 10) * 0.6, 1.4); hall.add(w); }
    // brake lever on a plinth in the foreground
    const plinth = rbox(1.4, 0.9, 1.0, 0.05, std(0x3a3a40, { metalness: 0.4, roughness: 0.5 }), 0, 0, 0); plinth.position.set(0, 0, 0); S.add(plinth);
    S.add(at(poster(1.0, 0.25, (x, w, h) => { x.fillStyle = '#e3c77a'; x.fillRect(0, 0, w, h); txt(x, 'THE BRAKE', w / 2, h / 2, h * 0.6, '#1e1612'); }), 0, 0.55, 0.51));
    const lever = new THREE.Group(); lever.position.set(0, 0.9, 0); S.add(lever); lever.add(cyl(0.05, 0.05, 1.5, std(0xb0b4b8, { metalness: 0.9, roughness: 0.2 }))); lever.add(sph(0.14, std(0xc2372d, { roughness: 0.3 }), 0, 1.55, 0)); shadowy(lever);
    const slot = box(0.14, 0.04, 0.8, std(0x111111), 0, 0.91, 0); S.add(slot);
    const hands = [0, 1, 2].map(i => { const h = sleeveHand([0x5a6a8a, 0x8a4a3a, 0x4a6a4a][i]); S.add(h); h.visible = false; return h; });
    return { S, C, lever, hands };
  },
  doorstep() { // quiet porch, papers land one by one (serious beat: no jokes)
    const { S, C } = scene(0x0b0c10, [6, 14]);
    S.add(new THREE.AmbientLight(0x404858, 0.8));
    const z0 = roomShell(S, { w: 6, d: 5, h: 3.2, floor: TX.wood('#5a4a3a', [3, 3]), wall: TX.brick('#5a3a2e', [3, 1.5]), left: false, ceil: false });
    const door = group(rbox(1.1, 2.2, 0.08, 0.02, std(0x2a3a4a, { roughness: 0.4 }), 0, 0, 0)); for (let i = 0; i < 4; i++) door.add(box(0.38, 0.8, 0.02, std(0x24323f), i % 2 ? 0.24 : -0.24, i < 2 ? 0.4 : 1.3, 0.05)); door.add(sph(0.04, std(0xc9a24a, { metalness: 0.9 }), 0.42, 1.05, 0.08)); door.position.set(0, 0, z0 + 0.05); S.add(shadowy(door));
    S.add(box(1.4, 0.1, 0.12, std(0x3a2a20), 0, 2.25, z0 + 0.06)); S.add(at(rbox(1.0, 0.03, 0.6, 0.01, tmat(TX.carpet('#6a4a2a', [1, 1]))), 0, 0, z0 + 0.6));
    S.add(at(P3.plant(), -1.0, 0, z0 + 0.4)); S.add(at(P3.plant(), 1.0, 0, z0 + 0.4));
    const lamp = group(box(0.2, 0.3, 0.2, std(0x1e1e1e, { metalness: 0.5 }), 0, 0, 0), sph(0.07, basic(0xffe0a0), 0, 0.15, 0)); lamp.position.set(0.85, 1.9, z0 + 0.15); S.add(lamp);
    keyLight(S, 0xffe0b0, 30, [0.85, 2.0, z0 + 0.3], [0, 0, z0 + 1.2], 0.9);
    const heads = [['SUNDAY', 'CEO APOLOGISES', 'denies sharing any secrets'], ['TUESDAY', 'BOARD HIRES OUTSIDE LAW FIRM', 'investigation begins'], ['WEDNESDAY', 'SECOND RELATIONSHIP REPORTED', 'New York Times']];
    const papers = heads.map(([d, h, s], i) => { const p = group(); const top = poster(0.42, 0.3, (x, w, hh) => { x.fillStyle = '#e8e2d4'; x.fillRect(0, 0, w, hh); txt(x, d, w / 2, hh * 0.12, hh * 0.08, '#5a4a3a'); txt(x, h, w / 2, hh * 0.32, hh * 0.1, '#1e1612'); txt(x, s, w / 2, hh * 0.48, hh * 0.07, '#3a2a20'); x.fillStyle = 'rgba(30,22,18,0.3)'; for (let k = 0; k < 6; k++) x.fillRect(w * 0.08, hh * 0.6 + k * hh * 0.06, w * 0.84, hh * 0.02); }); top.rotation.x = -Math.PI / 2; top.position.y = 0.022; p.add(top, box(0.42, 0.02, 0.3, std(0xd8d0c0), 0, 0.01, 0)); p.position.set(-0.45 + i * 0.45, 0.03, z0 + 0.65 + (i % 2) * 0.1); p.rotation.y = (i - 1) * 0.25; S.add(shadowy(p)); p.visible = false; return p; });
    const report = group(); const rp = poster(0.42, 0.3, (x, w, hh) => { x.fillStyle = '#e8e2d4'; x.fillRect(0, 0, w, hh); txt(x, 'REPORT', w / 2, hh * 0.12, hh * 0.08, '#5a4a3a'); txt(x, 'U.S. INTEL: SPY SUSPICION', w / 2, hh * 0.32, hh * 0.1); txt(x, 'about a businesswoman', w / 2, hh * 0.48, hh * 0.07, '#3a2a20'); }); rp.rotation.x = -Math.PI / 2; rp.position.y = 0.022; report.add(rp, box(0.42, 0.02, 0.3, std(0xd8d0c0), 0, 0.01, 0)); report.position.set(0.2, 0.01, z0 + 1.15); report.rotation.y = 0.15; S.add(shadowy(report));
    rain(S, 0, z0 + 2.6, 6, 1.5, 3.2, 300);
    return { S, C, papers, report, z0 };
  },
});

const ACT4 = [
  { id: 'S21', card: 'Thursday, 5 November', sub: 'The crash' },
  { id: 'S22', f(t, d, L) { const s = getSet('customs'); const gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6)), dot = s.dot || (s.dot = castCard(s.S, 'dot', 1.6));
      const sk = L.find(l => l.who === 'GUS'); const skT = sk ? sk.t0 - 0.3 : d;
      s.arm.rotation.z = 0; dot.set(1.4, -1.7, pose({ view: 'front', expr: t > skT ? 'sly' : 'sleepy', seed: 4, arms: [null, { h: [0.6, 0.8], hand: 'relax' }] }, t, L, 'DOT'), s.C, 0.35);
      gus.set(lerp(-1.0, 0.2, k01(t, skT - 1.5, skT)), -0.2, t > skT - 1.5 && t < skT ? slidePose(t, 1, 0.8, 1.6) : pose({ view: 'q', dir: 1, expr: speaking(L, 'DOT', t) ? 'sad' : 'happy', seed: 5, look: [0.8, 0.2], arms: [{ h: [-0.6, 0.4], hand: 'point' }, null] }, t, L, 'GUS'), s.C);
      if (t < skT) { const k = E(k01(t, 0, skT)); s.C.position.set(lerp(-4.2, -1.6, k), lerp(2.8, 1.7, k), lerp(5.5, 3.6, k)); s.C.lookAt(lerp(-1.6, -0.6, k), 1.0, -1.3); } else { s.C.position.set(0.4, 1.5, 2.9); s.C.lookAt(0.6, 1.05, -1.0); }
      const cp = proj(s.C, V3(-1.6, 1.9, -1.3));
      return { scene: s.S, cam: s.C, tags: [{ txt: '~600,000 H200 CHIPS', x: cp[0], y: Math.max(80, cp[1] - 60), s: t < skT ? pop(t, 3) : 0, r: -0.03, size: 38 }, { txt: 'WASHINGTON: OK', x: 300, y: 600, s: t < skT ? pop(t, 9) : 0, r: -0.04, bg: '#3f9b5f', col: '#fff' }, { txt: 'BEIJING: ...', x: 980, y: 600, s: t < skT ? pop(t, 12.5) : 0, r: 0.04, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S23', f(t, d) { const s = getSet('stage'); s.coins.visible = false; s.cracks.forEach(c => c.visible = true); s.chunk.visible = false; s.tapes.forEach(x => x.visible = false);
      const m = t < 9 ? 30 + t * 0.7 : 35 + (t - 9) * 6.6; s.wallClock.userData.set(t < 9 ? 9 : 9 + Math.floor((30 + (t - 9) * 6.6) / 60), (30 + (t < 9 ? t * 0.7 : (t - 9) * 6.6 + 6)) % 60);
      const k = E(k01(t, 0, d)); const z0 = s.z0;
      if (t < 9) { s.C.position.set(0, 4.0, z0 + lerp(3.4, 2.8, k)); s.C.lookAt(0, 4.0, z0); } else { const k2 = E(k01(t, 9, 12.5)); s.C.position.set(lerp(0, -2.6, k2), lerp(4.0, 2.4, k2), lerp(z0 + 2.8, 4.8, k2)); s.C.lookAt(0, lerp(4, 1.3, k2), lerp(z0, 0, k2)); }
      if (s.coinsAt) { s.coinsAt(Math.max(0, t - 10) * 1.4); }
      return { scene: s.S, cam: s.C, tags: [{ txt: '9:30 AM  NEW YORK', x: 640, y: 90, s: t < 9 ? pop(t, 0.5) : 0, r: -0.02 }, { txt: 'NASDAQ: WEDNESDAY GAINS GONE', x: 640, y: 620, s: t < 9 ? pop(t, 3.5) : 0, r: 0.02, bg: '#c2372d', col: '#fff', size: 34 }, { txt: '10:35  S&P 500: -$2 TRILLION', x: 640, y: 100, s: t > 9 ? pop(t, 10.5) : 0, r: -0.03, bg: '#c2372d', col: '#fff' }, { txt: 'NVIDIA ALONE: $400B+', x: 640, y: 620, s: t > 9 ? pop(t, 14.5) : 0, r: 0.03, size: 38 }] }; }, after() { const s = getSet('stage'); s.coins.visible = false; s.wallClock.userData.set(9, 30); } },
  { id: 'S24', f(t, d) { const s = getSet('insure'); const q = s.q || (s.q = ['pip', 'mabel', 'gus', 'cook', 'clerk', 'janitor'].map((k, i) => castCard(s.S, k, 1.5 + (i % 3) * 0.08)));
      const vix = clamp(t / (d - 2), 0, 1); s.needle.rotation.z = lerp(1.25, -1.1, E(vix)) + Math.sin(t * 30) * 0.02 * vix;
      q.forEach((c, i) => { const x = 1.0 - i * 0.98 + Math.sin(t * 2 + i) * 0.03; const enter = i * 0.6; const xx = lerp(-3.2, x, k01(t, enter, enter + 2.8)); c.set(xx, -0.3 - (i % 2) * 0.25, t < enter + 2.8 ? slidePose(t + i * 0.37, 1, (x + 3.2) / 2.8, 1.55) : pose({ view: 'q', dir: 1, expr: i % 2 ? 'scared' : 'surprised', seed: i, look: [0.9, 0] }, t), s.C); });
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-1.4, -0.8, k), 1.75, lerp(5.6, 4.8, k)); s.C.lookAt(lerp(-0.9, -0.7, k), 1.2, -1.2);
      return { scene: s.S, cam: s.C, tags: [{ txt: '11:17 AM', x: 210, y: 90, s: pop(t, 0.4), r: -0.04 }, { txt: 'VIX: FEAR GAUGE ROCKETING', x: 760, y: 90, s: pop(t, 2), r: 0.03, bg: '#c2372d', col: '#fff', size: 36 }, { txt: '= PRICE OF CRASH INSURANCE', x: 640, y: 630, s: pop(t, 5.5), r: -0.02, bg: '#e3c77a', size: 34 }] }; } },
  { id: 'S25', f(t, d, L) { const s = getSet('cubicle'); const mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.55)); const sk = L.find(l => l.who === 'MABEL'); const skT = sk ? sk.t0 : d;
      const flip = t > skT ? Math.floor((t - skT) * 2.5) % 2 : 0;
      if (s.phState !== flip + (t > skT ? 2 : 0)) { s.phState = flip + (t > skT ? 2 : 0); repaint(s.ph, (x, w, h) => { x.fillStyle = '#0a0c10'; x.fillRect(0, 0, w, h); if (t > skT) { x.fillStyle = flip ? '#c2372d' : '#3f9b5f'; x.fillRect(w * 0.1, h * 0.35, w * 0.8, h * 0.3); txt(x, flip ? 'SELL' : 'BUY', w / 2, h / 2, h * 0.16, '#fff'); } else { x.strokeStyle = '#ff5a4a'; x.lineWidth = 6; x.beginPath(); x.moveTo(10, h * 0.25); for (let i = 0; i < 10; i++) x.lineTo(10 + i * (w - 20) / 9, h * 0.25 + i * h * 0.06 + (i % 2) * 10); x.stroke(); txt(x, '-358M', w / 2, h * 0.88, h * 0.1, '#ff9a8a'); } }); }
      s.glow.intensity = 1.2; s.glow.position.set(0.25, 1.35, -0.2);
      mab.set(0.0, -0.4, pose({ view: 'front', expr: t > skT ? 'scared' : 'sad', seed: 2, look: [0.6, 0.5], arms: [null, { h: [0.7, 0.2], hand: 'relax' }] }, t, L, 'MABEL'), s.C);
      s.ph.position.set(0.36, 1.0, -0.28); s.ph.rotation.set(0, -0.3, 0);
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(1.4, 0.9, k), 1.45, lerp(3.4, 2.3, k)); s.C.lookAt(0.2, 1.1, -0.6);
      return { scene: s.S, cam: s.C, tags: [{ txt: '2:58 PM', x: 220, y: 90, s: pop(t, 0.4), r: -0.04 }, { txt: 'SMALL INVESTORS: -$358M NET', x: 700, y: 90, s: pop(t, 1.8), r: 0.03, bg: '#c2372d', col: '#fff', size: 36 }, { txt: 'MOST SINCE MARCH 2020', x: 640, y: 630, s: t < skT ? pop(t, 6.5) : 0, r: -0.02, bg: '#e3c77a', size: 34 }] }; }, after() { const s = getSet('cubicle'); s.glow.intensity = 0; } },
  { id: 'S26', f(t, d, L) { const s = getSet('yacht'); const wen = s.wen || (s.wen = castCard(s.S, 'wendell', 1.8)), gus = s.gus || (s.gus = castCard(s.S, 'gus', 1.6));
      const sk = L.find(l => l.who === 'WENDELL'); const skT = sk ? sk.t0 - 0.3 : d; const yy = s.deck.position.y;
      wen.set(0.6, -0.3, pose({ view: 'q', dir: 1, expr: 'sly', seed: 3, look: [0.7, 0], arms: [null, { h: [0.95, 0.3], hand: 'open' }] }, t, L, 'WENDELL'), s.C, yy);
      gus.set(1.7, 0.1, pose({ view: 'q', dir: -1, expr: speaking(L, 'GUS', t) ? 'surprised' : 'neutral', seed: 6, look: [-0.8, 0.3] }, t, L, 'GUS'), s.C, yy);
      if (t < skT) { const k = E(k01(t, 0, skT)); s.C.position.set(lerp(-5, -2.2, k), lerp(3.2, 1.8, k), lerp(6, 3.8, k)); s.C.lookAt(lerp(0, 0.8, k), 1.1, -0.8); } else { s.C.position.set(1.0, 1.5, 3.8); s.C.lookAt(1.1, 1.0, -0.4); }
      return { scene: s.S, cam: s.C, tags: [{ txt: 'NOMURA: HEDGE FUNDS SOLD', x: 640, y: 90, s: t < skT ? pop(t, 3) : 0, r: -0.03, size: 38 }, { txt: 'GREAT YEAR, LOCK IT IN', x: 640, y: 630, s: t < skT ? pop(t, 7.5) : 0, r: 0.03, bg: '#e3c77a' }] }; } },
  { id: 'S27', f(t, d) { const s = getSet('stage'); s.cracks.forEach(c => c.visible = true); s.tapes.forEach(x => x.visible = false);
      if (!s.bell) { const b = new THREE.Group(); const bm = std(0xc9a24a, { metalness: 0.9, roughness: 0.25 }); const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.42, 0.55, 40, 1, true), Object.assign(bm.clone(), { side: THREE.DoubleSide })); cup.position.y = -0.4; b.add(cup, sph(0.07, bm, 0, -0.1, 0), cyl(0.015, 0.015, 0.12, bm, 0, -0.12, 0)); b.add(sph(0.06, std(0x2a2a2a, { metalness: 0.7 }), 0, -0.68, 0)); b.position.set(-2.2, 3.3, -1.0); shadowy(b); s.S.add(b); s.bell = b; }
      s.bell.visible = true; s.bell.rotation.z = t < 1.5 ? Math.sin(t * 14) * 0.45 * (1 - t / 1.5) : 0;
      const fall = k01(t, d - 9, d - 7.6); s.chunk.visible = t > d - 9; s.chunk.position.set(0.55 + fall * 0.5, 1.4 - 1.35 * fall * fall, 0.4); s.chunk.rotation.set(fall * 2, fall * 3, fall);
      s.coinsAt(3 + t * 1.2, 1.5);
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-3.2, 2.6, k), lerp(2.6, 1.9, k), lerp(5.0, 4.0, k)); s.C.lookAt(0, 1.2, 0);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'DOW -1,833', x: 300, y: 100, s: pop(t, 2.2), r: -0.04, bg: '#c2372d', col: '#fff', size: 46 }, { txt: 'S&P 500: -4%+', x: 960, y: 100, s: pop(t, 4.2), r: 0.04, bg: '#c2372d', col: '#fff' }, { txt: 'WORST 2ND DAY AFTER A MIDTERM IN ~100 YEARS', x: 640, y: 180, s: pop(t, 6.5), r: -0.01, size: 28, bg: '#e3c77a' }, { txt: 'CHIP INDEX -12%', x: 300, y: 620, s: pop(t, 11), r: -0.03 }, { txt: 'FEAR DID IT.', x: 960, y: 620, s: pop(t, d - 2.5), r: 0.04, size: 48 }] }; }, after() { const s = getSet('stage'); if (s.bell) s.bell.visible = false; s.chunk.visible = false; s.coins.visible = false; } },
];

const ACT5 = [
  { id: 'S28', card: 'The Week After', sub: '6 to 12 November' },
  { id: 'S29', f(t, d) { const s = getSet('coaster'); const pip = s.pip || (s.pip = castCard(s.S, 'pip', 1.0)), mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.0));
      const u = clamp(0.05 + 0.88 * (t < d - 6 ? 0.62 * t / (d - 6) : 0.62 + 0.38 * E(k01(t, d - 6, d - 1))), 0, 0.98); const p = s.curve.getPointAt(u), tg = s.curve.getTangentAt(u);
      s.cart.position.copy(p); s.cart.rotation.z = Math.atan2(tg.y, tg.x); const drop = tg.y < -0.3;
      const ride = (c, o, ex) => { const P = pose({ view: 'front', expr: drop ? 'scared' : ex, seed: o > 0 ? 1 : 2, arms: drop ? [{ h: [-0.95, -0.9], hand: 'open' }, { h: [0.95, -0.9], hand: 'open' }] : [{ h: [-0.95, -0.9], hand: 'open' }, null] }, t); c.set(p.x + tg.x * o, p.z + 0.05, P, s.C, p.y + tg.y * o + 0.05); };
      ride(pip, 0.3, 'laugh'); ride(mab, -0.3, 'happy');
      s.bulbs.forEach((b, i) => b.material.color.set((Math.floor(t * 4) + i) % 3 ? 0xffe08a : 0xff8a6a));
      s.C.position.set(p.x - 0.6, p.y + 0.9, 2.6); s.C.lookAt(p.x + 0.5, p.y + 0.5, -2);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'FRI: TECH BOUNCES A LITTLE', x: 640, y: 90, s: u < 0.35 ? pop(t, 3.5) : 0, r: -0.03 }, { txt: 'MON: DOW +1,100+', x: 640, y: 90, s: u >= 0.35 && u < 0.58 ? pop(t, 7) : 0, r: 0.03, bg: '#3f9b5f', col: '#fff' }, { txt: 'TUE: INFLATION HOT', x: 640, y: 90, s: u >= 0.58 ? 1 : 0, r: -0.03, bg: '#c2372d', col: '#fff' }, { txt: 'RATE HIKE BETS', x: 640, y: 630, s: t > d - 4 ? pop(t, d - 4) : 0, r: 0.02, bg: '#e3c77a' }] }; } },
  { id: 'S30', f(t, d, L) { const s = getSet('diner'); s.plates.forEach(p => p.visible = true); const dot = s.dot || (s.dot = castCard(s.S, 'dot', 1.6)), cook = s.cook || (s.cook = castCard(s.S, 'cook', 1.7));
      const bt = s.board.userData.T; const x = bt.x; x.fillStyle = '#1f2a22'; x.fillRect(0, 0, bt.c.width, bt.c.height); txt(x, 'COREWEAVE · ORDERS', bt.c.width / 2, 40, 36, '#e3c77a'); const n = Math.floor(clamp((t - 2) * 2, 0, 11)); for (let i = 0; i < n; i++) txt(x, `ORDER #${1001 + i} .......... ${['$$$', '$$', '$$$$'][i % 3]}`, bt.c.width / 2, 86 + i * 24, 20, '#e8f0d8'); if (t > 9) txt(x, 'WAITING: $132B', bt.c.width / 2, bt.c.height - 36, 42, '#ff9a8a'); bt.t.needsUpdate = true;
      const late = L.filter(l => l.who === 'N')[1]; const lateT = late ? late.t0 : d;
      dot.set(0.5, -0.5, pose({ view: 'q', expr: 'sly', look: [0.8, 0], seed: 3, arms: [null, { h: [0.95, 0.2], hand: 'point' }] }, t, L, 'DOT'), s.C);
      cook.set(2.0, -0.6, pose({ view: 'q', dir: -1, expr: speaking(L, 'COOK', t) ? 'surprised' : 'neutral', look: [-0.8, 0.2], seed: 4 }, t, L, 'COOK'), s.C);
      const k = E(k01(t, 0, d)); if (t < lateT) { s.C.position.set(lerp(-1.6, -0.8, k), 1.5, lerp(4.4, 3.6, k)); s.C.lookAt(lerp(1.4, 1.2, k), 1.3, -1.4); } else { cook.hide(); dot.hide(); s.C.position.set(2.8, 1.8, 1.4); s.C.lookAt(2.6, 1.9, -2.4); }
      return { scene: s.S, cam: s.C, tags: [{ txt: 'REVENUE +168%', x: 300, y: 100, s: t < lateT ? pop(t, 4) : 0, r: -0.04, bg: '#3f9b5f', col: '#fff' }, { txt: 'WED: NVDA +~3%', x: 640, y: 110, s: t > lateT ? pop(t, lateT + 0.5) : 0, r: 0.03, bg: '#3f9b5f', col: '#fff', size: 44 }, { txt: 'WORST OVER?', x: 640, y: 620, s: t > lateT + 3 ? pop(t, lateT + 3) : 0, r: -0.03, bg: '#e3c77a' }] }; } },
  { id: 'S31', f(t, d) { const s = getSet('capitol'); const n = t < 7 ? 1 : t < 13 ? 2 : 3; const pull = clamp((t - 4) / (d - 4), 0, 1);
      s.lever.rotation.x = lerp(-0.25, 0.35, E(pull));
      s.hands.forEach((h, i) => { const on = i < n; h.visible = on; const ang = s.lever.rotation.x; const tip = V3(0, 0.9 + Math.cos(ang) * (1.1 + i * 0.15), Math.sin(ang) * (1.1 + i * 0.15)); const inK = E(k01(t, [1, 7, 13][i], [1, 7, 13][i] + 1)); h.position.set(tip.x + [0.18, -0.18, 0.12][i] + (1 - inK) * [3, -3, 3][i], tip.y, tip.z + 0.05); h.rotation.z = [1.25, -1.25, 1.1][i]; });
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-1.8, -1.2, k), lerp(1.8, 1.5, k), lerp(4.2, 3.4, k)); s.C.lookAt(0, lerp(2.4, 1.6, k), -2);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'FIRST SENATE REPUBLICAN: PAUSE NEW DATA CENTERS', x: 640, y: 90, s: pop(t, 2), r: -0.02, size: 28 }, { txt: 'PROBE: CHIP EXPORTS TO CHINA', x: 640, y: 150, s: pop(t, 8), r: 0.02, size: 30, bg: '#e3c77a' }, { txt: 'STILL NO LAW', x: 640, y: 620, s: pop(t, 14), r: -0.03, bg: '#c2372d', col: '#fff' }] }; } },
  { id: 'S32', f(t, d) { const s = getSet('doorstep'); const times = [11.5, 18, 23]; s.papers.forEach((p, i) => { const v = t > times[i]; p.visible = v; const k = k01(t, times[i], times[i] + 0.5); p.position.y = 0.03 + (1 - E(k)) * 0.8; });
      s.report.visible = true; const k = E(k01(t, 0, d)); s.C.position.set(lerp(0.4, 0.1, k), lerp(1.6, 1.25, k), s.z0 + lerp(2.9, 2.3, k)); s.C.lookAt(0, 0.1, s.z0 + 0.85);
      return { scene: s.S, cam: s.C, vig: 1.0, tags: [{ txt: 'REPORT: U.S. INTEL SUSPECTED SPYING', x: 640, y: 90, s: t < 11.5 ? pop(t, 1.5) : 0, r: -0.02, size: 32 }, { txt: 'SUN: CEO APOLOGISES, DENIES SHARING SECRETS', x: 640, y: 90, s: t > 11.5 && t < 18 ? pop(t, 11.7) : 0, r: 0.02, size: 30 }, { txt: 'TUE: BOARD HIRES OUTSIDE LAW FIRM', x: 640, y: 90, s: t > 18 && t < 23 ? pop(t, 18.2) : 0, r: -0.02, size: 32 }, { txt: 'WED: NYT REPORTS A SECOND RELATIONSHIP', x: 640, y: 90, s: t > 23 ? pop(t, 23.2) : 0, r: 0.02, size: 30 }] }; } },
  { id: 'S33', f(t, d) { const s = getSet('office'); if (s.jan) s.jan.hide(); s.doc.visible = true; s.phone.userData.screen.material.color.set(0x112233);
      repaint(s.doc, (x, w, h) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); txt(x, 'FORM 8-K', w / 2, h * 0.1, h * 0.07); txt(x, '12 NOV', w / 2, h * 0.18, h * 0.05, '#5a4a3a'); txt(x, 'CEO RESIGNS', w / 2, h * 0.3, h * 0.07, '#c2372d'); txt(x, 'EFFECTIVE', w / 2, h * 0.38, h * 0.05); txt(x, 'IMMEDIATELY', w / 2, h * 0.44, h * 0.05); x.fillStyle = 'rgba(30,22,18,0.35)'; for (let i = 0; i < 7; i++) x.fillRect(w * 0.1, h * 0.54 + i * h * 0.055, w * 0.8, h * 0.015); });
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(1.6, 0.2, k), lerp(1.9, 1.35, k), lerp(3.6, 0.9, k)); s.C.lookAt(lerp(0, 0.05, k), lerp(0.9, 0.8, k), lerp(-1.0, -0.55, k));
      return { scene: s.S, cam: s.C, tags: [{ txt: 'THU 12 NOV · ONE WEEK LATER', x: 640, y: 90, s: pop(t, 1.5), r: -0.02, size: 34 }, { txt: '33 YEARS', x: 250, y: 200, s: pop(t, 9), r: -0.05, bg: '#e3c77a' }, { txt: 'INTERIM CEO: THE CFO', x: 1000, y: 200, s: pop(t, 15), r: 0.04, size: 32 }, { txt: 'NVDA -10%+ AT OPEN', x: 360, y: 620, s: pop(t, 19), r: -0.03, bg: '#c2372d', col: '#fff' }, { txt: '~$2T LOST SINCE OCTOBER', x: 920, y: 620, s: pop(t, 23), r: 0.03, bg: '#c2372d', col: '#fff', size: 32 }] }; }, after() { getSet('office').doc.visible = false; } },
  { id: 'S34', f(t, d, L) { const s = getSet('office'); const jan = s.jan || (s.jan = castCard(s.S, 'janitor', 1.7)); s.doc.visible = true;
      if (!s.badges) { const mk = (w, c) => { const p = poster(0.12, 0.17, (x, ww, hh) => { x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, ww, hh); x.fillStyle = c; x.fillRect(0, 0, ww, hh * 0.25); txt(x, w, ww / 2, hh * 0.6, hh * 0.24); }); p.rotation.x = -Math.PI / 2; s.S.add(p); return p; }; s.badges = [mk('CFO', '#2f4d6b'), mk('CEO', '#c2372d')]; s.hand = sleeveHand(0x5a6a8a); s.S.add(s.hand); }
      const by = 0.815; s.badges[0].visible = true; s.badges[0].position.set(0.45, by, -0.3);
      const pin = E(k01(t, 1.6, 2.8)); s.badges[1].visible = true; s.badges[1].position.set(lerp(1.6, 0.62, pin), by + (1 - pin) * 0.25, -0.3);
      const out = E(k01(t, 3.0, 4.2)); s.hand.visible = t > 1.2 && t < 4.3; s.hand.position.set(s.badges[1].position.x + 0.1 + out * 1.6, s.badges[1].position.y + 0.08, -0.3); s.hand.rotation.set(0, 0, 1.45);
      jan.set(-0.35, 0.15, pose({ view: 'q', dir: 1, expr: speaking(L, 'VOICE', t) ? 'surprised' : 'neutral', seed: 2, look: [0.9, 0.3], arms: [null, t > 3.4 ? { h: [0.9, 0.1], hand: 'point' } : null] }, t, L, 'JANITOR'), s.C);
      s.C.position.set(0.9, 1.55, 2.2); s.C.lookAt(0.3, 0.95, -0.4); const bp = proj(s.C, V3(0.53, 0.82, -0.3));
      return { scene: s.S, cam: s.C, tags: [{ txt: 'CFO + INTERIM CEO', x: bp[0] + 40, y: bp[1] - 80, s: t > 2.8 ? pop(t, 2.8) : 0, r: 0.03, bg: '#e3c77a', size: 34 }] }; }, after() { const s = getSet('office'); if (s.badges) s.badges.forEach(b => b.visible = false); if (s.hand) s.hand.visible = false; s.doc.visible = false; } },
  { id: 'S35', f(t, d) { const s = getSet('cubicle'); const mab = s.mab || (s.mab = castCard(s.S, 'mabel', 1.55));
      if (!s.buyPainted) { s.buyPainted = 1; s.phState = -1; repaint(s.ph, (x, w, h) => { x.fillStyle = '#0a0c10'; x.fillRect(0, 0, w, h); x.fillStyle = '#3f9b5f'; x.fillRect(w * 0.1, h * 0.35, w * 0.8, h * 0.3); txt(x, 'BUY', w / 2, h / 2, h * 0.16, '#fff'); txt(x, 'NVDA', w / 2, h * 0.2, h * 0.09, '#e8e0cc'); }); }
      s.glow.intensity = 1.2; s.glow.position.set(0.25, 1.35, -0.2); s.ph.position.set(0.36, 1.0, -0.28); s.ph.rotation.set(0, -0.3, 0);
      mab.set(0.0, -0.4, pose({ view: 'front', expr: t > 6 ? 'laugh' : 'sly', seed: 2, look: [0.6, 0.4], arms: [null, { h: [0.7, 0.2], hand: 'relax' }] }, t), s.C);
      const k = E(k01(t, 0, d)); s.C.position.set(lerp(-0.6, 0.4, k), 1.4, lerp(2.6, 2.2, k)); s.C.lookAt(0.2, 1.15, -0.6);
      return { scene: s.S, cam: s.C, tags: [{ txt: 'A WEEK AGO: SELLING', x: 330, y: 100, s: pop(t, 3), r: -0.04, bg: '#c2372d', col: '#fff', size: 34 }, { txt: 'FIRST 30 MIN: +$111M NVDA', x: 760, y: 180, s: pop(t, 6.5), r: 0.03, bg: '#3f9b5f', col: '#fff', size: 36 }, { txt: '40x A NORMAL OPEN', x: 640, y: 630, s: pop(t, 11), r: -0.02, bg: '#e3c77a' }] }; }, after() { const s = getSet('cubicle'); s.glow.intensity = 0; s.buyPainted = 0; } },
];
