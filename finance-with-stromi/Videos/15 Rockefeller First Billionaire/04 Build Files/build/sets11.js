/* Finance with Stromi 11 (The Ten-Year Orchard): cast + crow characters + 6 sets.
   New: orchard11 (two trees, fence, barn chalkboard, year counter, see-saw, sprinkler), nursery11 (greenhouse, three soil beds).
   Dressed from earlier sets: gameshow11 (stage), diner11 (diner + grill line), apartment11 (apartment10), office94 (office3, sepia). */
'use strict';
CH.nadia = RH.character({ name: 'Nadia', skin: '#c8875a', head: { shape: 'round', w: 1.0, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', hair: { style: 'bun', color: '#1e1612', ribbon: '#c2372d' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.96, h: 1.0 }, top: { type: 'tee', color: '#f2ead8', accent: '#c2372d', emblem: 'none' }, legs: { color: '#24303a', len: 0.98, w: 0.85 }, shoes: { color: '#1e1612', sole: '#8a8a8a' }, blush: true });
CH.nadiaH = RH.character({ name: 'Nadia', skin: '#c8875a', head: { shape: 'round', w: 1.0, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', hair: { style: 'bun', color: '#1e1612', ribbon: '#f2c83a' }, hat: { type: 'cap', color: '#e3c77a' }, body: { shape: 'slim', w: 0.96, h: 1.0 }, top: { type: 'dress', color: '#3f9b5f', accent: '#f6ecd2', pattern: 'dots' }, legs: { color: '#c8875a', len: 0.98, w: 0.82 }, shoes: { color: '#f2c83a', sole: '#e8dcc0' }, blush: true });
CH.oscar = RH.character({ name: 'Oscar', skin: '#c8875a', head: { shape: 'bean', w: 0.98, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', hair: { style: 'spiky', color: '#1e1612' }, hat: { type: 'cap', color: '#3f6bb0' }, body: { shape: 'slim', w: 0.94, h: 1.02 }, top: { type: 'tee', color: '#f2c83a', accent: '#24303a', emblem: 'bolt' }, legs: { color: '#5a6a8a', len: 1.02, w: 0.88 }, shoes: { color: '#f4efe6', sole: '#c2372d' } });
CH.barb = RH.character({ name: 'Barb', skin: '#efd0b0', head: { shape: 'long', w: 0.95, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'bulb', hair: { style: 'curls', color: '#e8e4dc' }, hat: { type: 'none' }, body: { shape: 'pear', w: 1.0, h: 0.95 }, top: { type: 'overalls', color: '#5a7a9a', accent: '#c2372d' }, legs: { color: '#5a7a9a', len: 0.88, w: 0.95 }, shoes: { color: '#5a3a24', sole: '#8a6a46' } });
CH.chet = RH.character({ name: 'Chet', skin: '#f0c9a4', head: { shape: 'long', w: 0.95, h: 1.05 }, ears: 'big', eyes: 'pie', nose: 'long', hair: { style: 'slick', color: '#e3b53a' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.95, h: 1.05 }, top: { type: 'tux', color: '#7a1a22', accent: '#f4efe6' }, legs: { color: '#1e1612', len: 1.05, w: 0.85 }, tie: 'bow', tieColor: '#f2c83a', shoes: { color: '#1e1612', sole: '#c9a24a' } });
CH.newcook = RH.character({ name: 'Rosa', skin: '#efc193', head: { shape: 'round', w: 1.02, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', freckles: true, hair: { style: 'braids', color: '#6b3b20', ribbon: '#5fa3a6' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.94, h: 0.98 }, top: { type: 'tee', color: '#f2ead8', accent: '#5fa3a6', emblem: 'none' }, legs: { color: '#24303a', len: 0.96, w: 0.85 }, shoes: { color: '#1e1612', sole: '#8a8a8a' }, blush: true });
CH.stromi = CH.stromi || RH.character({ name: 'Stromi', skin: '#f4ead6', blush: true, hair: { style: 'tuft', color: '#1e1612' }, hat: { type: 'bowler', color: '#1e1612', band: '#d9a23a' }, top: { type: 'tux', color: '#3f6b4f', accent: '#f6ecd2' }, tie: 'bow', tieColor: '#d9a23a', legs: { color: '#24303a' }, shoes: { color: '#2a1d17', sole: '#d9a23a' }, eyeSize: 1.08 });
CH.pip11 = RH.character(Object.assign({}, CAST.pip, { name: 'Pip' }));
CH.dot11 = RH.character(Object.assign({}, CAST.dot, { name: 'Dot' }));

const RED11 = '#c2372d', GRN11 = '#3f9b5f', YEL11 = '#f2c83a', BLU11 = '#3f6bb0';

/* ================= CROWS (rubber-hose crows on camera-facing cards) =================
   o: {tag:'INFLATION'|'TAXES'|'FEES', mouth, blink, peck:0..1, flap:0..1, dir, look:[x,y], fly:bool, t} */
function drawCrow(c, o, cx, by, S) {
  const ink = '#14110f', T = o.t || 0; c.lineCap = 'round'; c.lineJoin = 'round';
  const hop = o.fly ? 0 : Math.max(0, Math.sin(T * 3.1)) * 4 * S; const bodyY = by - 150 * S - hop - (o.fly ? 120 * S : 0);
  const pk = o.peck || 0;
  // legs
  if (!o.fly) for (const sd of [-1, 1]) { c.strokeStyle = '#e3a33a'; c.lineWidth = 9 * S; c.beginPath(); c.moveTo(cx + sd * 22 * S, bodyY + 60 * S); c.lineTo(cx + sd * 26 * S, by - 12 * S); c.stroke();
    for (const f of [-1, 0, 1]) { c.beginPath(); c.moveTo(cx + sd * 26 * S, by - 12 * S); c.lineTo(cx + sd * 26 * S + f * 20 * S + 8 * S, by - 4 * S); c.stroke(); } }
  // tail
  c.fillStyle = ink; c.beginPath(); c.moveTo(cx - 70 * S, bodyY + 20 * S); c.lineTo(cx - 150 * S, bodyY + 60 * S); c.lineTo(cx - 140 * S, bodyY + 20 * S); c.lineTo(cx - 155 * S, bodyY - 5 * S); c.closePath(); c.fill();
  // body
  const g = c.createRadialGradient(cx - 20 * S, bodyY - 30 * S, 10 * S, cx, bodyY, 110 * S); g.addColorStop(0, '#3a3440'); g.addColorStop(1, ink);
  c.fillStyle = g; c.beginPath(); c.ellipse(cx, bodyY, 85 * S, 70 * S, -0.15, 0, TAU); c.fill();
  // wing (flaps)
  const fl = o.fly ? Math.sin(T * 14) : (o.flap || 0) * Math.sin(T * 12);
  c.save(); c.translate(cx - 10 * S, bodyY - 10 * S); c.rotate(-0.3 - fl * 0.7); c.fillStyle = '#26222a'; c.beginPath(); c.ellipse(-30 * S, 0, 75 * S, 32 * S, 0.2, 0, TAU); c.fill();
  c.strokeStyle = '#4a4450'; c.lineWidth = 4 * S; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-90 * S + i * 22 * S, 8 * S); c.lineTo(-70 * S + i * 22 * S, 22 * S); c.stroke(); } c.restore();
  // head
  const hx = cx + 70 * S + pk * 30 * S, hy = bodyY - 70 * S + pk * 60 * S;
  c.fillStyle = ink; c.beginPath(); c.arc(hx, hy, 52 * S, 0, TAU); c.fill();
  // beak
  const open = o.mouth && o.mouth !== 'M' ? 0.35 : 0.06;
  c.fillStyle = '#e3a33a'; c.strokeStyle = ink; c.lineWidth = 4 * S;
  c.beginPath(); c.moveTo(hx + 38 * S, hy - 8 * S); c.lineTo(hx + 110 * S, hy + 2 * S - open * 10 * S); c.lineTo(hx + 40 * S, hy + 6 * S); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(hx + 40 * S, hy + 8 * S); c.lineTo(hx + 96 * S, hy + 12 * S + open * 40 * S); c.lineTo(hx + 36 * S, hy + 22 * S); c.closePath(); c.fill(); c.stroke();
  // pie eye
  const lx = (o.look || [0, 0])[0], ly = (o.look || [0, 0])[1];
  c.fillStyle = '#fbf8f0'; c.beginPath(); c.ellipse(hx + 12 * S, hy - 12 * S, 22 * S, o.blink ? 3 * S : 26 * S, 0, 0, TAU); c.fill();
  if (!o.blink) { c.fillStyle = ink; c.beginPath(); c.ellipse(hx + 16 * S + lx * 6 * S, hy - 10 * S + ly * 6 * S, 9 * S, 14 * S, 0, 0, TAU); c.fill(); c.fillStyle = '#fbf8f0'; c.beginPath(); c.moveTo(hx + 16 * S + lx * 6 * S, hy - 10 * S); c.lineTo(hx + 26 * S, hy - 26 * S); c.lineTo(hx + 10 * S, hy - 24 * S); c.fill(); }
  // brow (sly)
  c.strokeStyle = '#5a5460'; c.lineWidth = 6 * S; c.beginPath(); c.moveTo(hx - 8 * S, hy - 44 * S); c.lineTo(hx + 34 * S, hy - 34 * S); c.stroke();
  // name tag on a string
  if (o.tag) { c.strokeStyle = '#d8cbb0'; c.lineWidth = 3 * S; c.beginPath(); c.moveTo(cx + 30 * S, bodyY - 40 * S); c.lineTo(cx + 10 * S, bodyY + 20 * S); c.stroke();
    c.save(); c.translate(cx + 10 * S, bodyY + 40 * S); c.rotate(-0.08 + Math.sin(T * 2) * 0.05); const fs = 30 * S; c.font = `${fs}px ${HAND}`; const w = c.measureText(o.tag).width + 26 * S;
    c.fillStyle = '#f3e7cc'; c.fillRect(-w / 2, -fs * 0.8, w, fs * 1.6); c.strokeStyle = ink; c.lineWidth = 3 * S; c.strokeRect(-w / 2, -fs * 0.8, w, fs * 1.6); c.fillStyle = o.tagCol || RED11; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.tag, 0, 2 * S); c.restore(); }
}
function crowCard(scene, key, height) {
  const T = canvasTex(512, 512); const g = new THREE.PlaneGeometry(height, height); g.translate(0, height / 2 - height * 0.02, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: T.t, transparent: true, alphaTest: 0.05, color: 0xf2ead8, side: THREE.DoubleSide }));
  scene.add(m); m.userData.card = true;
  return { mesh: m, key, set(x, z, o, cam, y) { m.visible = true; m.position.set(x, y || 0, z); T.x.clearRect(0, 0, 512, 512); T.x.save(); if ((o.dir || 1) < 0) { T.x.translate(512, 0); T.x.scale(-1, 1); } drawCrow(T.x, o, 230, 500, 1.15); T.x.restore(); T.t.needsUpdate = true; }, hide() { m.visible = false; } };
}
const crowOf = (s, key, h) => s['c_' + key] || (s['c_' + key] = crowCard(s.S, key, h));

/* ================= props ================= */
const P11 = {
  apple(r, col) { const g = group(sph(r, std(col || 0xc2372d, { roughness: 0.35 }))); g.add(cyl(0.006, 0.006, r * 0.6, std(0x5a3e28), 0, r * 0.8, 0)); const lf = new THREE.Mesh(new THREE.SphereGeometry(r * 0.4, 8, 6), std(0x4f8a3a)); lf.scale.set(1, 0.25, 0.5); lf.position.set(r * 0.3, r * 1.2, 0); g.add(lf); return g; },
  /* growing apple tree: grow(k 0..1), fruit(n of 24 visible), pecked(i) shrinks fruit */
  appleTree(seed, big) { const g = group(); const bark = std(0x6a4a2a, { roughness: 0.95 }); const trunk = cyl(0.07, 0.11, 1, bark); g.add(trunk);
    const leaf = std(0x3f7a32, { roughness: 0.7 }), leaf2 = std(0x5a9a3f, { roughness: 0.7 }); const r = RH.rng(seed || 7); const canopy = group(); g.add(canopy);
    const brs = []; for (let i = 0; i < 5; i++) { const b = cyl(0.025, 0.04, 0.6, bark); const a = i / 5 * TAU + r(); b.rotation.set(Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9); b.position.set(0, -0.25, 0); canopy.add(b); brs.push(b); }
    for (let i = 0; i < 46; i++) { const a = r() * TAU, e = r() * 1.2 - 0.3, rr = 0.3 + r() * 0.42; const m = new THREE.Mesh(new THREE.SphereGeometry(0.16 + r() * 0.08, 12, 8), i % 3 ? leaf : leaf2); m.scale.set(1, 0.75, 1); m.position.set(Math.cos(a) * rr * Math.cos(e), Math.sin(e) * rr * 0.75, Math.sin(a) * rr * Math.cos(e)); m.castShadow = true; canopy.add(m); }
    const fruit = []; for (let i = 0; i < 24; i++) { const a = r() * TAU, e = r() * 1.0 - 0.45, rr = 0.62 + r() * 0.12; const f = P11.apple(0.055); f.position.set(Math.cos(a) * rr * Math.cos(e), Math.sin(e) * rr * 0.7, Math.sin(a) * rr * Math.cos(e)); f.userData.base = f.position.clone(); canopy.add(f); fruit.push(f); }
    g.userData.grow = k => { const h = 0.35 + k * (big ? 2.4 : 2.0); trunk.scale.set(0.35 + k * 1.1, h, 0.35 + k * 1.1); trunk.position.y = h / 2; canopy.position.y = h + 0.1; canopy.scale.setScalar(0.12 + k * 1.15); };
    g.userData.fruit = (n, sz) => fruit.forEach((f, i) => { f.visible = i < n; f.scale.setScalar(sz && sz[i] != null ? sz[i] : 1); });
    g.userData.fruitPos = i => fruit[i].getWorldPosition(new THREE.Vector3());
    g.userData.sway = (t, a) => { canopy.rotation.z = Math.sin(t * 0.9) * 0.02 * (a || 1); canopy.rotation.x = Math.sin(t * 0.7 + 1) * 0.015 * (a || 1); };
    g.userData.grow(1); g.userData.fruit(24); return shadowy(g); },
  sprinkler() { const brass = std(0xc9a24a, { metalness: 0.85, roughness: 0.3 }); const g = group(cyl(0.12, 0.14, 0.05, brass), cyl(0.02, 0.02, 0.35, brass, 0, 0.05, 0)); const head = group(box(0.4, 0.03, 0.04, brass, 0, 0, 0)); head.position.y = 0.42; g.add(head);
    const dial = poster(0.16, 0.16, (x, w, h) => { x.fillStyle = '#efe4cf'; x.beginPath(); x.arc(w / 2, h / 2, w / 2, 0, TAU); x.fill(); x.strokeStyle = '#1e1612'; x.lineWidth = 6; x.stroke(); txt(x, 'PAYDAY', w / 2, h * 0.38, h * 0.18, '#c2372d'); txt(x, 'TIMER', w / 2, h * 0.66, h * 0.14); }); dial.position.set(0, 0.22, 0.03); g.add(dial);
    const sprayG = new THREE.BufferGeometry(); const n = 160, pp = new Float32Array(n * 3); sprayG.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    const spray = new THREE.Points(sprayG, new THREE.PointsMaterial({ color: 0xbfe6ff, size: 0.03, transparent: true, opacity: 0.8, depthWrite: false })); g.add(spray);
    g.userData.head = head; g.userData.spray = (t, on, ang) => { spray.visible = on > 0.01; head.rotation.y = ang; if (!spray.visible) return; for (let i = 0; i < n; i++) { const f = ((t * 1.2 + i / n) % 1); const a = ang + (i % 2 ? 0 : Math.PI) + Math.sin(i) * 0.15; const d = f * 1.6 * on; pp[i * 3] = Math.cos(a) * d; pp[i * 3 + 1] = 0.45 + f * 1.1 - f * f * 1.4; pp[i * 3 + 2] = -Math.sin(a) * d; } sprayG.attributes.position.needsUpdate = true; };
    return shadowy(g); },
  car() { const red = std(0xc2372d, { metalness: 0.6, roughness: 0.25 }); const g = group(rbox(2.2, 0.45, 1.0, 0.12, red, 0, 0.25, 0), rbox(1.1, 0.4, 0.9, 0.12, std(0x9fd0e8, { metalness: 0.3, roughness: 0.1 }), -0.15, 0.66, 0)); const ws = [];
    for (const [x, z] of [[-0.7, 0.5], [0.7, 0.5], [-0.7, -0.5], [0.7, -0.5]]) { const w = cyl(0.2, 0.2, 0.14, std(0x141414), 0, 0, 0); w.rotation.x = Math.PI / 2; w.position.set(x, 0.2, z); g.add(w); ws.push(w); }
    g.add(box(0.06, 0.08, 0.2, basic(0xfff0c0), 1.1, 0.42, 0.3), box(0.06, 0.08, 0.2, basic(0xfff0c0), 1.1, 0.42, -0.3)); return shadowy(g); },
  seesaw() { const wood = tmat(TX.wood('#8a6440', [1, 1], 'ss'), { roughness: 0.7 }); const g = group(cyl(0.12, 0.2, 0.45, std(0x5a3e24))); const beam = group(rbox(3.0, 0.08, 0.3, 0.02, wood, 0, -0.04, 0)); beam.position.y = 0.48; g.add(beam); g.userData.beam = beam; return shadowy(g); },
  sack(label, col) { const g = group(); const m = std(col || 0xb8864a, { roughness: 0.95 }); const b = sph(0.28, m, 0, 0.28, 0); b.scale.set(1, 1.1, 0.85); g.add(b); g.add(cyl(0.06, 0.1, 0.12, m, 0, 0.56, 0));
    const tg = poster(0.42, 0.18, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); x.strokeStyle = '#1e1612'; x.lineWidth = 5; x.strokeRect(3, 3, w - 6, h - 6); txt(x, label, w / 2, h / 2, h * 0.55); }); tg.position.set(0, 0.3, 0.25); g.add(tg); return shadowy(g); },
  lantern() { const g = group(cyl(0.005, 0.005, 0.3, std(0x111111), 0, 0, 0), box(0.16, 0.22, 0.16, std(0x1e1e1e, { metalness: 0.6 }), 0, -0.22, 0)); g.add(at(sph(0.05, basic(0xffe0a0)), 0, -0.11, 0)); return g; },
  bed(w, d) { const wood = tmat(TX.wood('#6a4a2a', [2, 1], 'bed' + w), { roughness: 0.8 }); const g = group(rbox(w, 0.4, d, 0.02, wood, 0, 0, 0)); g.add(box(w - 0.1, 0.04, d - 0.1, tmat(TX.carpet('#3a2416', [3, 2])), 0, 0.39, 0)); return shadowy(g); },
  bush(seed, col) { const g = group(); const lm = std(col || 0x3f7a32, { roughness: 0.7 }); const r = RH.rng(seed); const trunk = cyl(0.03, 0.05, 0.4, std(0x6a4a2a)); g.add(trunk); const cn = group(); g.add(cn);
    for (let i = 0; i < 22; i++) { const a = r() * TAU, rr = r() * 0.35, y = 0.1 + r() * 0.45; const m = new THREE.Mesh(new THREE.SphereGeometry(0.12 + r() * 0.06, 10, 7), lm); m.position.set(Math.cos(a) * rr, y, Math.sin(a) * rr); m.castShadow = true; cn.add(m); }
    const fr = []; for (let i = 0; i < 12; i++) { const f = P11.apple(0.04); const a = i / 12 * TAU, rr = 0.33; f.position.set(Math.cos(a) * rr, 0.2 + (i % 4) * 0.12, Math.sin(a) * rr); cn.add(f); fr.push(f); }
    g.userData.grow = (k, h) => { trunk.scale.y = 0.3 + k * h; trunk.position.y = (0.3 + k * h) * 0.2; cn.position.y = (0.3 + k * h) * 0.4; cn.scale.set(0.1 + k * 1.0, 0.1 + k * h, 0.1 + k * 1.0); };
    g.userData.fruit = n => fr.forEach((f, i) => f.visible = i < n); g.userData.grow(0, 1); g.userData.fruit(0); return shadowy(g); },
};

/* ================= SETS ================= */
Object.assign(SETB, {
  /* ---------- THE NUMBER: game show on the stage set ---------- */
  gameshow11() { const s = SETB.stage(); const { S } = s; const z0 = s.z0, sy = s.stageY;
    s.banner.userData.draw({ t: 'THE NUMBER', s: 'HOW MUCH A MONTH TO RETIRE IN 10 YEARS?', bg: '#f2c83a', col: '#7a1a22', col2: '#1e1612' });
    // chasing bulbs around the banner
    const bulbs = []; const bw = 4.6, bh = 1.1, bz = z0 + 0.16; for (let i = 0; i < 40; i++) { const f = i / 40; let x, y; const per = 2 * (bw + bh), d = f * per;
      if (d < bw) { x = -bw / 2 + d; y = bh / 2; } else if (d < bw + bh) { x = bw / 2; y = bh / 2 - (d - bw); } else if (d < 2 * bw + bh) { x = bw / 2 - (d - bw - bh); y = -bh / 2; } else { x = -bw / 2; y = -bh / 2 + (d - 2 * bw - bh); }
      const b = sph(0.045, basic(0xfff0b0), x, 3.2 + y, bz); S.add(b); bulbs.push(b); }
    const bulbGrp = group(); bulbGrp.userData.tick = t => bulbs.forEach((b, i) => b.material.color.setHex(((i + Math.floor(t * 8)) % 4) ? 0xfff0b0 : 0x5a4020)); S.add(bulbGrp);
    // podiums with buzzers
    const pods = []; for (let i = 0; i < 3; i++) { const x = 0.4 + i * 1.15; const pg = group(rbox(0.8, 0.72, 0.5, 0.04, std([0x3f6bb0, 0x3f9b5f, 0xc2372d][i], { roughness: 0.4 }), 0, 0, 0), rbox(0.86, 0.06, 0.56, 0.02, std(0xc9a24a, { metalness: 0.8, roughness: 0.3 }), 0, 0.72, 0));
      const bz2 = sph(0.09, std(0xff3a2a, { roughness: 0.2, emissive: 0x400000 }), 0, 0.79, 0); bz2.scale.y = 0.6; pg.add(bz2); pg.userData.buzz = bz2;
      const nm = poster(0.6, 0.3, (x2, w, h) => { x2.fillStyle = '#f3e7cc'; x2.fillRect(0, 0, w, h); txt(x2, ['PIP', 'DOT', 'NADIA'][i], w / 2, h / 2, h * 0.6, '#1e1612'); }); nm.position.set(0, 0.42, 0.255); pg.add(nm); pg.userData.nm = nm;
      pg.position.set(x, sy, z0 + 1.9); S.add(shadowy(pg)); pods.push(pg); }
    s.wheel.position.x = 4.1; // move the wheel off the scoreboard
    // scoreboard (lit), left side
    const score = board(1.6, 0.9, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); x.strokeStyle = '#f2c83a'; x.lineWidth = 14; x.strokeRect(10, 10, w - 20, h - 20);
      for (let i = 0; i < 26; i++) { x.fillStyle = (i + (o.ph || 0)) % 3 ? '#5a4020' : '#fff0b0'; x.beginPath(); x.arc(30 + i * (w - 60) / 25, 28, 7, 0, TAU); x.fill(); x.beginPath(); x.arc(30 + i * (w - 60) / 25, h - 28, 7, 0, TAU); x.fill(); }
      ltxt(x, o.top || 'YOUR NUMBER', w / 2, h * 0.28, h * 0.12, '#f2c83a', 'center'); ltxt(x, o.big || '$ ? ? ? ?', w / 2, h * 0.58, h * 0.3, o.col || '#fbf8f0', 'center'); ltxt(x, o.sub || 'A MONTH', w / 2, h * 0.84, h * 0.1, '#a8998a', 'center'); }, true);
    score.position.set(-2.5, 1.95 + sy, z0 + 0.5); S.add(score);
    // countdown clock (lit) right
    const clockB = board(0.8, 0.5, (x, w, h, o) => { o = o || {}; x.fillStyle = '#1a0a0a'; x.fillRect(0, 0, w, h); ltxt(x, o.v || '0:10', w / 2, h / 2, h * 0.6, '#ff5a3a', 'center'); }, true); clockB.position.set(2.7, 2.6 + sy, z0 + 0.5); clockB.visible = false; S.add(clockB);
    // golden envelope prop (held near Chet's hand; positioned per shot)
    const env = board(0.34, 0.22, (x, w, h, o) => { o = o || {}; const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#fff0a8'); g.addColorStop(0.5, '#e3b53a'); g.addColorStop(1, '#b8862a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = '#7a4a1a'; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6); if (!o.open) { x.beginPath(); x.moveTo(0, 0); x.lineTo(w / 2, h * 0.6); x.lineTo(w, 0); x.stroke(); x.fillStyle = '#c2372d'; x.beginPath(); x.arc(w / 2, h * 0.6, h * 0.12, 0, TAU); x.fill(); } else { x.fillStyle = '#fbf8f0'; x.fillRect(w * 0.1, h * 0.15, w * 0.8, h * 0.7); ltxt(x, '$5,200', w / 2, h / 2, h * 0.32, '#c2372d', 'center'); } }, true);
    env.visible = false; S.add(env);
    // extra colour washes so the stage reads 'TV'
    const w1 = new THREE.SpotLight(0xff4aa0, 14, 14, 0.5, 0.7, 1.4); w1.position.set(-4, 5, z0 + 6); w1.target.position.set(-1, sy, z0 + 1.5); S.add(w1, w1.target);
    const w2 = new THREE.SpotLight(0x4ab0ff, 14, 14, 0.5, 0.7, 1.4); w2.position.set(4, 5, z0 + 6); w2.target.position.set(1.5, sy, z0 + 1.5); S.add(w2, w2.target);
    const hostL = keyLight(S, 0xfff0d8, 40, [0, 5, z0 + 6], [-0.9, sy + 1, z0 + 1.9], 0.35);
    return Object.assign(s, { pods, score, clockB, env, bulbs, hostL, SY: sy, PZ: z0 + 1.9, HX: -1.1 });
  },

  /* ---------- DINER: counter + back grill line ---------- */
  diner11() { const s = SETB.diner(); const { S } = s; const z0 = s.z0;
    s.menu.visible = false;
    // grill line along back wall (behind the counter)
    const steel = std(0x9aa0a6, { metalness: 0.85, roughness: 0.35 }), dark = std(0x1a1a1a, { metalness: 0.6, roughness: 0.5 });
    const grill = group(rbox(2.4, 0.9, 0.7, 0.02, steel, 0, 0, 0)); const top = box(2.3, 0.04, 0.62, std(0x2a2422, { metalness: 0.7, roughness: 0.25 }), 0, 0.92, 0); grill.add(top);
    for (let i = 0; i < 6; i++) grill.add(box(0.05, 0.05, 0.05, dark, -0.9 + i * 0.36, 0.5, 0.36));
    const eggs = []; for (let i = 0; i < 5; i++) { const e = group(cyl(0.07, 0.07, 0.008, std(0xfbf8f0, { roughness: 0.4 })), at(sph(0.03, std(0xf2b43a, { roughness: 0.2 })), 0, 0.01, 0)); e.children[1].scale.y = 0.5; e.position.set(-0.7 + i * 0.3, 0.945, (i % 2) * 0.12 - 0.06); grill.add(e); eggs.push(e); }
    grill.position.set(0.6, 0, z0 + 0.4); S.add(shadowy(grill));
    const hood = group(rbox(2.6, 0.5, 0.8, 0.03, steel, 0, 0, 0)); hood.position.set(0.6, 2.35, z0 + 0.45); S.add(shadowy(hood));
    const flameL = new THREE.PointLight(0xff8a3a, 3, 3.5); flameL.position.set(0.6, 1.2, z0 + 0.9); S.add(flameL);
    const smoke = dust(S, 0.6, 1.6, z0 + 0.6, 2.2, 1.0, 0.6, 140, 0xbcb0a0);
    // ticket rail with orders + sticky note
    const rail = board(2.2, 0.32, (x, w, h, o) => { o = o || {}; x.fillStyle = '#8a8f96'; x.fillRect(0, h * 0.05, w, h * 0.08); for (let i = 0; i < 9; i++) { const xx = 30 + i * (w - 60) / 8.6; x.fillStyle = '#fbf6e8'; x.save(); x.translate(xx, h * 0.12); x.rotate(Math.sin(i * 3.1) * 0.06); x.fillRect(-36, 0, 72, h * 0.84); x.fillStyle = '#c2372d'; x.fillRect(-36, 0, 72, 6); x.fillStyle = '#5a5a5a'; for (let k = 0; k < 4; k++) x.fillRect(-26, 20 + k * 18, 40 + (k * 13 % 20), 4); x.restore(); }
      if (o.note) { x.save(); x.translate(w * 0.52, h * 0.55); x.rotate(-0.06); x.fillStyle = '#f7e36a'; x.fillRect(-60, -46, 120, 96); ltxt(x, o.note, 0, 4, 30, '#1e1612', 'center'); x.restore(); } }, false);
    rail.position.set(0.6, 2.06, z0 + 0.84); S.add(rail);
    // pass shelf + heat lamps
    for (let i = 0; i < 3; i++) { const lp = group(cyl(0.004, 0.004, 0.3, std(0x111111), 0, 0, 0), cyl(0.1, 0.06, 0.1, std(0x7a1a22, { metalness: 0.4 }), 0, -0.1, 0)); lp.position.set(-0.2 + i * 0.8, 2.3, z0 + 1.0); S.add(lp); const hl = new THREE.PointLight(0xff9a50, 1.2, 1.6); hl.position.set(-0.2 + i * 0.8, 1.85, z0 + 1.0); S.add(hl); }
    // menu board (used for the levers), right of the hood
    const menu2 = board(1.5, 1.0, (x, w, h, o) => { o = o || {}; x.fillStyle = '#1f2b24'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a6440'; x.lineWidth = 22; x.strokeRect(0, 0, w, h);
      ltxt(x, o.title || "TODAY'S SPECIALS", w / 2, h * 0.13, h * 0.09, '#ffe9a8', 'center'); (o.rows || [['Eggs any style', '$4'], ['Short stack', '$5'], ['Coffee', '$1']]).forEach((r, i) => { const hi = o.hi === i; ltxt(x, r[0], w * 0.07, h * (0.32 + i * 0.2), h * (hi ? 0.085 : 0.075), hi ? '#ffe9a8' : '#ece6d8'); ltxt(x, r[1], w * 0.93, h * (0.32 + i * 0.2), h * (hi ? 0.085 : 0.075), hi ? '#ffe9a8' : '#ece6d8', 'right'); }); });
    menu2.position.set(-2.4, 1.55, z0 + 0.05); S.add(menu2); const mL = new THREE.PointLight(0xffe2b8, 2.6, 3.2); mL.position.set(-2.6, 2.4, z0 + 1.1); S.add(mL);
    S.add(rbox(5.5, 0.28, 0.32, 0.02, tmat(TX.wood('#3a2416', [3, 1], 'plat')), 0.6, 0, z0 + 0.9)); // cook's step behind the counter
    // three wooden levers on the counter
    const levers = []; ['SPEND', 'TIME', 'EARN'].forEach((nm, i) => { const g = group(rbox(0.22, 0.08, 0.14, 0.01, std(0x5a3a22), 0, 0, 0)); const arm = group(cyl(0.015, 0.015, 0.34, std(0x8a6440), 0, 0, 0), at(sph(0.04, std(0xc2372d, { roughness: 0.3 })), 0, 0.36, 0)); arm.position.y = 0.06; g.add(arm); g.userData.arm = arm;
      const lb = poster(0.22, 0.07, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); txt(x, nm, w / 2, h / 2, h * 0.7); }); lb.position.set(0, 0.04, 0.075); g.add(lb); g.position.set(0.1 + i * 0.35, 1.03, z0 + 1.2); g.visible = false; S.add(shadowy(g)); levers.push(g); });
    // framed sticky note on the wall (ending)
    const framed = P3.frame(0.3, 0.3, (x, w, h) => { x.fillStyle = '#f7e36a'; x.fillRect(0, 0, w, h); txt(x, 'OUT BY 42', w / 2, h / 2, h * 0.2); }); framed.position.set(-1.6, 1.9, z0 + 0.04); framed.visible = false; S.add(framed);
    // coffee + fries props on the counter
    const fries = group(box(0.12, 0.1, 0.08, std(0xc2372d), 0, 0, 0)); for (let i = 0; i < 8; i++) fries.add(box(0.012, 0.12, 0.012, std(0xf2c83a), -0.04 + (i % 4) * 0.025, 0.08, (i < 4 ? -0.015 : 0.015))); fries.position.set(-0.6, 1.04, z0 + 1.45); S.add(shadowy(fries));
    const cof = P3.mug(0xefe4cf); cof.position.set(1.6, 1.03, z0 + 1.45); S.add(cof);
    const clock = S.userData.clock; if (clock && clock.userData.set) clock.userData.set(4, 0);
    return Object.assign(s, { grill, eggs, rail, flameL, menu2, levers, framed, fries, cof, BZ: z0 + 0.95, CZ: z0 + 1.3, FZ: z0 + 2.05 });
  },

  /* ---------- NADIA'S APARTMENT (from apartment10) ---------- */
  apartment11() { const s = SETB.apartment10(); const { S } = s; ['jar', 'jar2', 'lm'].forEach(k => { if (s[k]) s[k].visible = false; }); s.jar.userData.coins.forEach(c => c.visible = false);
    const TY = s.TY, TZ = s.TZ, TX0 = s.TX;
    const shoebox = group(rbox(0.34, 0.14, 0.22, 0.01, std(0xe8a33a, { roughness: 0.8 }), 0, 0, 0)); const lid = rbox(0.36, 0.03, 0.24, 0.01, std(0xd99a32), 0, 0, 0); lid.position.set(0.22, 0, 0.05); lid.rotation.y = 0.4; shoebox.add(lid);
    shoebox.position.set(TX0 - 0.4, TY, TZ - 0.08); S.add(shadowy(shoebox));
    const piles = []; const pc = ['RENT', 'FOOD', 'BUS', 'HEALTH', 'PHONE', 'JOYS']; for (let i = 0; i < 6; i++) { const p = P3.papers(4 + i % 3, 11 + i); p.position.set(TX0 - 0.35 + (i % 3) * 0.28, TY, TZ + 0.05 + Math.floor(i / 3) * 0.2); p.scale.set(0.55, 1, 0.55); p.visible = false; S.add(p); piles.push(p); }
    const tape = board(0.07, 1.2, (x, w, h, o) => { o = o || {}; x.fillStyle = '#fbf8f0'; x.fillRect(0, 0, w, h); x.fillStyle = '#5a5a5a'; for (let i = 0; i < 26; i++) ltxt(x, ['1,450', '420', '86', '380', '65', '210', '389'][i % 7], w * 0.9, h * (0.03 + i * 0.037), w * 0.22, '#5a5a5a', 'right'); });
    tape.rotation.x = -Math.PI / 2; tape.position.set(TX0 + 0.25, TY + 0.003, TZ + 0.3); tape.visible = false; S.add(tape);
    const card11 = board(0.3, 0.2, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#fbf6e8'); x.strokeStyle = '#c2372d'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, h * 0.16); x.lineTo(w, h * 0.16); x.stroke(); x.strokeStyle = '#9fc0e0'; x.lineWidth = 2; for (let i = 2; i < 9; i++) { x.beginPath(); x.moveTo(0, i * h / 9); x.lineTo(w, i * h / 9); x.stroke(); }
      ltxt(x, 'OUT BY 42: THE CARD', w / 2, h * 0.08, h * 0.08, '#c2372d', 'center'); const L = ['1. my real monthly number', '2. x25 (or ~x28)', '3. after inflation; shoo fees+tax', '4. pull spend / time / earn', '5. sprinkler on payday'];
      for (let i = 0; i < (o.n || 0); i++) ltxt(x, L[i], w * 0.05, h * (0.27 + i * 0.14), h * 0.085, '#24303a'); });
    flat(card11, TY + 0.004); card11.position.set(TX0 + 0.02, TY + 0.004, TZ + 0.12); card11.visible = false; S.add(card11);
    return Object.assign(s, { shoebox, piles, PC: pc, tape, card11 });
  },

  /* ---------- 1994 PLANNER OFFICE (office3, sepia in post) ---------- */
  office94() { const s = SETB.office3(); const { S } = s; ['ledger', 'mag', 'coinA', 'coinB', 'dials', 'sign', 'mail', 'ccard'].forEach(k => { if (s[k]) s[k].visible = false; }); const z0 = s.z0;
    const scroll = board(3.2, 1.3, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#f1e6c8'); const yrs = []; for (let y = 1926; y <= 1976; y += 2) yrs.push(y); const off = (o.off || 0);
      x.save(); x.beginPath(); x.rect(0, 0, w, h); x.clip(); yrs.forEach((y, i) => { const xx = 80 + i * 150 - off; if (xx < -100 || xx > w + 100) return; const storm = o.storm && y >= 1965 && y <= 1968; x.fillStyle = storm ? '#7a8088' : '#e8d8b0'; x.fillRect(xx - 60, h * 0.18, 120, h * 0.52); x.strokeStyle = '#5a4020'; x.lineWidth = 3; x.strokeRect(xx - 60, h * 0.18, 120, h * 0.52);
        ltxt(x, '' + y, xx, h * 0.3, h * 0.1, '#3a2a18', 'center'); x.strokeStyle = storm ? '#c2372d' : '#3f6b4f'; x.lineWidth = 4; x.beginPath(); for (let k = 0; k <= 10; k++) { const v = Math.sin(y * 0.7 + k * 1.3) * 0.3 + (storm ? -k * 0.06 : k * 0.04); x.lineTo(xx - 50 + k * 10, h * 0.55 - v * h * 0.25); } x.stroke(); });
      x.restore(); x.fillStyle = '#5a3a1a'; x.fillRect(0, 0, w, 14); x.fillRect(0, h - 14, w, 14); ltxt(x, 'EVERY 30-YEAR RETIREMENT SINCE 1926', w / 2, h * 0.86, h * 0.08, '#3a2a18', 'center'); });
    scroll.position.set(0, 1.75, z0 + 0.14); S.add(scroll); const scL = new THREE.PointLight(0xffe2b8, 5, 6); scL.position.set(0, 2.6, z0 + 2.2); S.add(scL);
    const gauge = board(0.9, 0.9, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#f1e6c8'); x.strokeStyle = '#3a2a18'; x.lineWidth = 8; x.beginPath(); x.arc(w / 2, h * 0.62, w * 0.36, Math.PI, 0); x.stroke();
      for (let i = 0; i <= 8; i++) { const a = Math.PI + i / 8 * Math.PI; x.beginPath(); x.moveTo(w / 2 + Math.cos(a) * w * 0.3, h * 0.62 + Math.sin(a) * w * 0.3); x.lineTo(w / 2 + Math.cos(a) * w * 0.36, h * 0.62 + Math.sin(a) * w * 0.36); x.stroke(); ltxt(x, i + '%', w / 2 + Math.cos(a) * w * 0.44, h * 0.62 + Math.sin(a) * w * 0.44, h * 0.06, '#3a2a18', 'center'); }
      const v = o.v == null ? 8 : o.v; const a = Math.PI + v / 8 * Math.PI; x.strokeStyle = '#c2372d'; x.lineWidth = 10; x.beginPath(); x.moveTo(w / 2, h * 0.62); x.lineTo(w / 2 + Math.cos(a) * w * 0.32, h * 0.62 + Math.sin(a) * w * 0.32); x.stroke();
      ltxt(x, 'WORST START', w / 2, h * 0.12, h * 0.08, '#3a2a18', 'center'); ltxt(x, o.lab || '', w / 2, h * 0.84, h * 0.11, '#c2372d', 'center'); });
    gauge.position.set(2.2, 1.45, z0 + 0.6); gauge.rotation.y = -0.35; gauge.visible = false; S.add(gauge);
    const comp = group(rbox(0.5, 0.42, 0.45, 0.02, std(0xd8d0b8, { roughness: 0.6 }), 0, 0, 0), rbox(0.6, 0.06, 0.25, 0.01, std(0xd8d0b8), 0, -0.05, 0.35)); const scr = poster(0.38, 0.28, (x, w, h) => { x.fillStyle = '#0a1a0a'; x.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) ltxt(x, ['RUN 1926..1976', 'WITHDRAW 4.0%', '+ INFLATION', 'YEARS LASTED: 30+', 'RESULT: OK', '>_'][i], 12, 20 + i * 36, 24, '#5aff7a'); }, true); scr.position.set(0, 0.22, 0.226); comp.add(scr);
    comp.position.set(-1.4, s.ty || 0.8, z0 + 1.5); S.add(shadowy(comp));
    const stamp = board(0.9, 0.36, (x, w, h) => { x.clearRect(0, 0, w, h); x.strokeStyle = '#c2372d'; x.lineWidth = 12; x.strokeRect(8, 8, w - 16, h - 16); ltxt(x, '4% RULE', w / 2, h / 2, h * 0.55, '#c2372d', 'center'); }); stamp.material.transparent = true; stamp.position.set(0, 1.75, z0 + 0.17); stamp.visible = false; S.add(stamp);
    return Object.assign(s, { scroll, gauge, stamp, comp });
  },

  /* ---------- THE ORCHARD: dusk (or night) yard, barn, two apple trees ---------- */
  orchard11() { const { S, C } = scene(0x3a2a40, [16, 50]); const sky = skyDome(S, '#3a3a7a', '#f0a070');
    const hemi = new THREE.HemisphereLight(0xffd8b8, 0x2a3020, 0.9); S.add(hemi); const amb = new THREE.AmbientLight(0x4a3a4a, 0.5); S.add(amb);
    const sunL = new THREE.DirectionalLight(0xffc890, 2.4); sunL.position.set(-6, 7, 5); sunL.castShadow = true; sunL.shadow.mapSize.set(2048, 2048); const sc = sunL.shadow.camera; sc.left = -9; sc.right = 9; sc.top = 9; sc.bottom = -9; sunL.shadow.bias = -0.0006; S.add(sunL);
    S.add(plane(80, 80, tmat(TX.carpet('#4a6a2a', [30, 30]), { roughness: 0.95 }), 0, 0, 0, -Math.PI / 2));
    // dirt patch for Nadia's tree
    const dirt = new THREE.Mesh(new THREE.CircleGeometry(0.9, 40), tmat(TX.carpet('#5a3a22', [2, 2]))); dirt.rotation.x = -Math.PI / 2; dirt.position.set(1.2, 0.01, 0.4); dirt.receiveShadow = true; S.add(dirt);
    // grass tufts
    const gm = std(0x5a8a32, { roughness: 0.9, side: THREE.DoubleSide }); const r = RH.rng(5); for (let i = 0; i < 160; i++) { const tf = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.18 + r() * 0.12, 4), gm); tf.position.set((r() - 0.5) * 18, 0.08, (r() - 0.5) * 12 - 1); S.add(tf); }
    // fence + barn
    S.add(at(P4.fence(40), -6, 0, -3.2)); const barn = P4.house(4.2, 3.2, 3.2, '#8a2a22', '#3a2420', true); at(barn, -4.2, 0, -5.4); S.add(barn);
    const chalk = P4.chalk(1.6, 1.0, []); chalk.position.set(-4.2, 1.7, -3.75); S.add(chalk);
    for (const [tx, tz, th] of [[7.5, -6, 4.5], [-8.5, -8, 5], [9, -11, 5.5], [3, -12, 4.5], [-1.5, -10, 5.2]]) { const t = P4.tree(th, 0x3f6a32); t.position.set(tx, 0, tz); S.add(t); }
    // Barb's big old tree (left) and Nadia's tree (right)
    const bigTree = P11.appleTree(3, true); bigTree.position.set(-1.6, 0, -1.2); bigTree.scale.setScalar(1.35); S.add(bigTree);
    const tree = P11.appleTree(9, false); tree.position.set(1.2, 0, 0.4); S.add(tree);
    // crates, watering can, fence post with sign, year counter board on the fence
    const crate = P3.crate('APPLES', 2); crate.position.set(-2.8, 0, 0.2); crate.scale.setScalar(0.7); S.add(crate);
    const can = group(cyl(0.12, 0.14, 0.25, std(0x3f8a6a, { metalness: 0.4 })), at(cyl(0.015, 0.02, 0.3, std(0x3f8a6a, { metalness: 0.4 })), 0.18, 0.15, 0)); can.children[1].rotation.z = -0.9; can.position.set(2.2, 0, 1.2); S.add(shadowy(can));
    const canTag = poster(0.2, 0.08, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); txt(x, 'PAYCHECK', w / 2, h / 2, h * 0.65); }); canTag.position.set(0, 0.14, 0.142); can.add(canTag);
    const post = group(box(0.16, 1.3, 0.16, tmat(TX.wood('#7a5a3a', [1, 2], 'post')), 0, 0.65, 0)); const carve = board(0.15, 0.6, (x, w, h, o) => { o = o || {}; x.fillStyle = '#8a6a46'; x.fillRect(0, 0, w, h); for (let i = 0; i < 20; i++) { x.fillStyle = 'rgba(60,40,20,0.3)'; x.fillRect(0, i * h / 20, w, 3); } if (o.a) { x.save(); x.translate(w / 2, h * 0.3); x.rotate(-Math.PI / 2); ltxt(x, 'x 25', 0, 0, w * 0.5, '#2a1a0a', 'center'); x.restore(); } if (o.b) { x.save(); x.translate(w / 2, h * 0.72); x.rotate(-Math.PI / 2); ltxt(x, 'x 28-30', 0, 0, w * 0.42, '#2a1a0a', 'center'); x.restore(); } });
    carve.position.set(0, 0.85, 0.081); post.add(carve); post.position.set(-2.4, 0, 1.4); S.add(shadowy(post));
    const year = board(0.9, 0.42, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#efe4cf'); x.strokeStyle = '#1e1612'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); ltxt(x, 'YEAR', w / 2, h * 0.27, h * 0.2, '#5a4020', 'center'); ltxt(x, '' + (o.y || 1), w / 2, h * 0.66, h * 0.46, '#c2372d', 'center'); }); year.position.set(3.2, 1.15, -3.12); S.add(year);
    // stacked bars on the fence (blue YOU PUT IN, gold TREE GREW)
    const bars = board(1.6, 1.0, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#efe4cf'); x.strokeStyle = '#1e1612'; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6); const n = o.n || 0, data = o.data || [];
      for (let i = 0; i < 10; i++) { const d = data[i]; if (!d || i >= n) continue; const bx = 40 + i * (w - 80) / 10, bw = (w - 80) / 10 - 10, base = h - 70, sc = (h - 140) / 120000; x.fillStyle = BLU11; x.fillRect(bx, base - d[0] * sc, bw, d[0] * sc); x.fillStyle = '#e3b53a'; x.fillRect(bx, base - (d[0] + d[1]) * sc, bw, d[1] * sc); ltxt(x, '' + (i + 1), bx + bw / 2, base + 22, 22, '#1e1612', 'center'); }
      x.fillStyle = BLU11; x.fillRect(40, 18, 26, 22); ltxt(x, 'YOU PUT IN', 74, 30, 24, '#1e1612'); x.fillStyle = '#e3b53a'; x.fillRect(w / 2 + 10, 18, 26, 22); ltxt(x, 'THE TREE GREW', w / 2 + 44, 30, 24, '#1e1612'); }); bars.position.set(-0.2, 1.4, -3.12); bars.visible = false; S.add(bars);
    // see-saw with two sacks
    const ss = P11.seesaw(); ss.position.set(0.0, 0, 1.0); ss.visible = false; S.add(ss); const sackA = P11.sack('$62,400', 0x6a8ab0), sackB = P11.sack('$58,400', 0xe3b53a); sackA.position.set(-1.25, 0.04, 0); sackB.position.set(1.25, 0.04, 0); ss.userData.beam.add(sackA, sackB);
    // sprinkler + car + bridge sign + lantern
    const spr = P11.sprinkler(); spr.position.set(1.9, 0, 0.9); spr.visible = false; S.add(spr);
    const car = P11.car(); car.position.set(4.2, 0, 1.0); car.rotation.y = -0.4; car.visible = false; S.add(car);
    const hose = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 30, Math.PI * 1.4), std(0x3f9b5f)); hose.rotation.x = -Math.PI / 2; hose.position.set(3.0, 0.03, 1.2); hose.visible = false; S.add(hose);
    const sign = board(1.3, 0.55, (x, w, h) => { paperBg(x, w, h, '#efe4cf'); x.strokeStyle = '#5a3a22'; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); ltxt(x, 'VIDEO 10:', w / 2, h * 0.32, h * 0.2, '#5a4020', 'center'); ltxt(x, 'SAVING INTO INVESTING', w / 2, h * 0.66, h * 0.17, '#3f6b4f', 'center'); });
    const signG = group(box(0.08, 1.4, 0.08, std(0x5a3a22), -0.5, 0.7, 0), box(0.08, 1.4, 0.08, std(0x5a3a22), 0.5, 0.7, 0)); sign.position.set(0, 1.25, 0.05); signG.add(sign); signG.position.set(4.6, 0, -1.5); signG.visible = false; S.add(shadowy(signG));
    const rope = group(); for (let i = 0; i < 6; i++) rope.add(box(0.5, 0.04, 0.22, std(0x8a6440), 4.6 + 0.0, 0.3, -2.0 - i * 0.3)); rope.visible = false; S.add(rope);
    const lant = P11.lantern(); lant.position.set(1.6, 2.55, 0.5); lant.visible = false; S.add(lant); const lantL = new THREE.PointLight(0xffd08a, 0, 4); lantL.position.set(1.6, 2.3, 0.5); S.add(lantL);
    const moon = sph(0.6, basic(0xf4efe6), -12, 12, -30); moon.visible = false; S.add(moon);
    const dayCol = new THREE.Color(0x3a2a40), nightCol = new THREE.Color(0x0e1020);
    const setNight = n => { sunL.intensity = n ? 0.25 : 2.4; hemi.intensity = n ? 0.25 : 0.9; amb.intensity = n ? 0.35 : 0.5; moon.visible = !!n; sky.material.color.set(n ? 0x2a3050 : 0xffffff); S.fog.color.copy(n ? nightCol : dayCol); S.background = n ? nightCol : dayCol; };
    return { S, C, tree, bigTree, crate, can, post, carve, year, bars, ss, sackA, sackB, spr, car, hose, signG, rope, lant, lantL, chalk, setNight, TX: 1.2, TZ: 0.4 };
  },

  /* ---------- BARB'S GREENHOUSE: three soil beds ---------- */
  nursery11() { const { S, C } = scene(0x1c2a20, [10, 26]); S.add(new THREE.HemisphereLight(0xe8f8e0, 0x2a2018, 1.0)); S.add(new THREE.AmbientLight(0x4a5a4a, 0.6));
    S.add(plane(20, 14, tmat(TX.tile('#8a7a6a', '#7a6a5a', [6, 5]), { roughness: 0.9 }), 0, 0, -2, -Math.PI / 2));
    // glass + white frames
    const frame = std(0xe8ece8, { roughness: 0.5 }); const glass = new THREE.MeshStandardMaterial({ color: 0xcfe8e0, transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false });
    const zb = -4.5; S.add(plane(12, 4, glass, 0, 2, zb)); for (let i = 0; i <= 12; i++) S.add(box(0.06, 4, 0.06, frame, -6 + i, 2, zb)); for (let j = 0; j <= 4; j++) S.add(box(12, 0.06, 0.06, frame, 0, j, zb));
    for (const sx of [-1, 1]) { S.add(plane(9, 4, glass, sx * 6, 2, zb + 4.5, 0, sx * -Math.PI / 2)); for (let i = 0; i <= 9; i++) S.add(box(0.06, 4, 0.06, frame, sx * 6, 2, zb + i)); }
    for (let i = 0; i <= 12; i++) { const rf = box(0.05, 0.05, 9, frame, -6 + i, 4.05, zb + 4.5); S.add(rf); }
    const outside = poster(14, 6, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#8ab8d8'); g.addColorStop(0.6, '#d8e8c8'); g.addColorStop(1, '#5a8a3a'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 12; i++) { x.fillStyle = '#3f6a32'; x.beginPath(); x.arc(i * w / 11, h * 0.68, 40 + (i * 37 % 30), 0, TAU); x.fill(); } }, true); outside.position.set(0, 2.5, zb - 0.6); S.add(outside);
    const sunL = new THREE.DirectionalLight(0xfff0d0, 2.6); sunL.position.set(4, 8, 4); sunL.castShadow = true; sunL.shadow.mapSize.set(2048, 2048); const sc = sunL.shadow.camera; sc.left = -8; sc.right = 8; sc.top = 8; sc.bottom = -8; S.add(sunL);
    // hanging pots + shelf of seedlings
    for (let i = 0; i < 5; i++) { const p = at(P3.plant(), -4 + i * 2, 3.0, zb + 0.6); p.scale.setScalar(0.6); S.add(p); S.add(box(0.005, 0.6, 0.005, std(0x333333), -4 + i * 2, 3.55, zb + 0.6)); }
    const shelf = group(rbox(5, 0.05, 0.4, 0.01, tmat(TX.wood('#6a4a2a', [3, 1], 'gsh')), 0, 0.9, 0)); for (let i = 0; i < 14; i++) { const sp2 = P6.sapling(); sp2.position.set(-2.3 + i * 0.35, 0.95, 0); shelf.add(sp2); shelf.add(cyl(0.06, 0.05, 0.08, std(0x8a4a2a), -2.3 + i * 0.35, 0.95, 0)); } shelf.position.set(0, 0, zb + 0.4); S.add(shadowy(shelf));
    // three beds with signs + bushes
    const beds = [], bushes = [], signs = []; const lab = [['SAFE SOIL', '2% REAL'], ['MIXED SOIL', '4% REAL'], ['STOCK SOIL', '7% REAL']]; const cols = [0x6a8a4a, 0x4f8a3a, 0x3f7a32];
    for (let i = 0; i < 3; i++) { const x = -2.6 + i * 2.6; const b = P11.bed(2.0, 1.2); b.position.set(x, 0, -1.2); S.add(b); beds.push(b); const bu = P11.bush(20 + i, cols[i]); bu.position.set(x, 0.4, -1.2); S.add(bu); bushes.push(bu);
      const sg = board(0.9, 0.42, (cx, w, h, o) => { o = o || {}; paperBg(cx, w, h, '#efe4cf'); cx.strokeStyle = '#3a2a18'; cx.lineWidth = 8; cx.strokeRect(4, 4, w - 8, h - 8); ltxt(cx, lab[i][0], w / 2, h * 0.32, h * 0.2, '#3a2a18', 'center'); ltxt(cx, o.v || lab[i][1], w / 2, h * 0.7, h * 0.24, o.v ? '#3f6b4f' : '#c2372d', 'center'); });
      sg.position.set(x, 0.25, -0.58); S.add(sg); signs.push(sg); }
    // goal line board behind the beds
    const goal = board(8.2, 2.6, (x, w, h, o) => { o = o || {}; x.clearRect(0, 0, w, h); if (!o.on) return; x.strokeStyle = '#c2372d'; x.lineWidth = 10; x.setLineDash([30, 18]); x.beginPath(); x.moveTo(0, h * 0.12); x.lineTo(w, h * 0.12); x.stroke(); x.setLineDash([]); x.fillStyle = '#c2372d'; x.fillRect(w * 0.36, 0, w * 0.28, h * 0.1); ltxt(x, '$900,000 GOAL', w / 2, h * 0.05, h * 0.075, '#fff', 'center'); }); goal.material.transparent = true; goal.position.set(0, 2.05, -1.9); S.add(goal);
    const seed = group(rbox(0.3, 0.38, 0.12, 0.03, std(0xd8c8a0, { roughness: 0.9 }), 0, 0, 0)); const st = poster(0.26, 0.2, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); txt(x, '$1,500', w / 2, h * 0.36, h * 0.3, '#3f6b4f'); txt(x, 'A MONTH', w / 2, h * 0.72, h * 0.22); }); st.position.set(0, 0.2, 0.062); seed.add(st); seed.position.set(0, 0, 0); seed.visible = false; S.add(shadowy(seed));
    keyLight(S, 0xfff0d8, 22, [0, 5, 4], [0, 0.6, -1.2], 0.7, false);
    return { S, C, beds, bushes, signs, goal, seed, BZ: -1.2 };
  },
});
