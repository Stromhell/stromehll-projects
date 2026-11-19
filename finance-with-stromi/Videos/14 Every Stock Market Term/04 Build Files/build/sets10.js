/* Finance with Stromi 10 (The Waiting Room: saving into investing): cast + coin characters + 7 sets.
   New: bridge10 (canyon + five-plank rope bridge), street10/sale10 (Market Street, fair or storm).
   Dressed from earlier sets: apartment10 (kitchen), waitroom10 (bank6), breakroom10 (breakroom), porch10 (porch8). */
'use strict';
CH.wren = RH.character({ name: 'Wren', skin: '#f0c9a4', head: { shape: 'round', w: 1.0, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', freckles: true, hair: { style: 'bun', color: '#5a3020', ribbon: '#3f9b5f' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.96, h: 1.0 }, top: { type: 'tee', color: '#5fa3a6', accent: '#f4efe6' }, legs: { color: '#5fa3a6', len: 0.98, w: 0.85 }, shoes: { color: '#f4efe6', sole: '#8a8a8a' }, blush: true });
CH.mort = RH.character({ name: 'Mort', skin: '#efd8b8', head: { shape: 'long', w: 0.9, h: 1.04 }, ears: 'big', eyes: 'pie', nose: 'long', hair: { style: 'slick', color: '#8a8a82' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.92, h: 1.02 }, top: { type: 'tux', color: '#5a4a3a', accent: '#f4efe6' }, legs: { color: '#3a3028', len: 1.0, w: 0.85 }, tie: 'bow', tieColor: '#7a1a22', shoes: { color: '#1e1612', sole: '#555555' } });
CH.abe = RH.character({ name: 'Grandpa Abe', skin: '#e8c4a0', head: { shape: 'bean', w: 1.0, h: 0.98 }, ears: 'big', eyes: 'pie', nose: 'bulb', hair: { style: 'tuft', color: '#e8e4dc' }, hat: { type: 'cap', color: '#7a6a4a' }, body: { shape: 'barrel', w: 1.02, h: 0.95 }, top: { type: 'overalls', color: '#6a7a8a', accent: '#c2372d' }, legs: { color: '#6a7a8a', len: 0.85, w: 1.0 }, shoes: { color: '#3a2418', sole: '#8a6a46' } });
CH.rico = RH.character({ name: 'Rico', skin: '#c48a5c', head: { shape: 'round', w: 0.98, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', hair: { style: 'spiky', color: '#1e1612' }, hat: { type: 'cap', color: '#c2372d' }, body: { shape: 'slim', w: 0.96, h: 1.02 }, top: { type: 'tee', color: '#7a4a9a', accent: '#f2c83a', emblem: 'bolt' }, legs: { color: '#24303a', len: 1.02, w: 0.88 }, shoes: { color: '#f2c83a', sole: '#f4efe6' } });
CH.infl = RH.character({ name: 'Inflation', skin: '#b8b0c8', head: { shape: 'long', w: 0.86, h: 1.1 }, ears: 'none', eyes: 'pie', nose: 'long', hair: { style: 'slick', color: '#1e1612' }, hat: { type: 'top', color: '#1e1612', band: '#7a1a22' }, body: { shape: 'slim', w: 0.85, h: 1.15 }, top: { type: 'tux', color: '#24202a', accent: '#5a5260' }, legs: { color: '#24202a', len: 1.3, w: 0.8 }, shoes: { color: '#1e1612', sole: '#3a3a3a' } });
CH.cousin = RH.character({ name: 'June', skin: '#f0c9a4', head: { shape: 'round', w: 1.04, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', freckles: true, hair: { style: 'braids', color: '#5a3020', ribbon: '#e3c77a' }, hat: { type: 'none' }, body: { shape: 'pear', w: 0.95, h: 0.92 }, top: { type: 'dress', color: '#e3a33a', accent: '#f6ecd2', pattern: 'dots' }, legs: { color: '#f0c9a4', len: 0.8, w: 0.8 }, shoes: { color: '#c2372d', sole: '#e8dcc0' }, eyeSize: 1.1, blush: true });
CH.stromi = RH.character({ name: 'Stromi', skin: '#f4ead6', blush: true, hair: { style: 'tuft', color: '#1e1612' }, hat: { type: 'bowler', color: '#1e1612', band: '#d9a23a' }, top: { type: 'tux', color: '#3f6b4f', accent: '#f6ecd2' }, tie: 'bow', tieColor: '#d9a23a', legs: { color: '#24303a' }, shoes: { color: '#2a1d17', sole: '#d9a23a' }, eyeSize: 1.08 });
['mgrA', 'mgrB', 'mgrC'].forEach((k, i) => CH[k] = RH.character({ name: 'Manager', skin: ['#efd8b8', '#c48a5c', '#e8b48a'][i], head: { shape: ['long', 'round', 'bean'][i], w: 0.95, h: 1.02 }, ears: 'round', eyes: 'pie', nose: ['long', 'button', 'bulb'][i], hair: { style: ['slick', 'curls', 'bald'][i], color: '#1e1612' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.95, h: 1.02 }, top: { type: 'tux', color: ['#24303a', '#4a2a3a', '#2a3a2a'][i], accent: '#f4efe6' }, legs: { color: '#24303a', len: 1.05, w: 0.88 }, tie: 'bow', tieColor: '#d9a23a', shoes: { color: '#1e1612', sole: '#c9a24a' } }));
CH.pip10 = RH.character(Object.assign({}, CAST.pip, { name: 'Pip' }));
CH.dot10 = RH.character(Object.assign({}, CAST.dot, { name: 'Dot' }));
CH.gus10 = RH.character(Object.assign({}, CAST.gus, { name: 'Gus' }));

const RED10 = '#c2372d', GRN10 = '#3f9b5f', YEL10 = '#f2c83a', TEAL10 = '#5fa3a6';

/* ================= COIN CHARACTERS (rubber-hose coins on camera-facing cards) =================
   o: {metal:'silver'|'gold'|'copper', mouth, expr:'neutral|happy|sad|surprised|sly|sleepy|scared', arms:[l,r] each 'wave'|'up'|'hold'|'point'|'cards'|'down'|null,
       walk: phase or null, hat:'hard'|null, scuff:bool, look:[x,y], dir, sit:bool, squash } */
const COINC = { silver: ['#f4f6f8', '#b8bec6', '#7a828c'], gold: ['#fff0a8', '#e3b53a', '#9a6a1a'], copper: ['#ffd0a8', '#c8743a', '#7a3a1a'] };
function drawCoin(c, o, cx, by, S) {
  const k = COINC[o.metal || 'gold'], R = 120 * S, ink = '#1e1612', lw = 9 * S; const sit = !!o.sit;
  const legL = sit ? 70 * S : 150 * S; const cy = by - legL - R * 0.92 + (o.bob || 0) * S;
  const ph = o.walk == null ? 0 : o.walk;
  c.lineCap = 'round'; c.lineJoin = 'round';
  // legs + shoes
  for (const sd of [-1, 1]) { const sw = o.walk == null ? 0 : Math.sin(ph * TAU + (sd > 0 ? Math.PI : 0)) * 0.5; const hx = cx + sd * R * 0.38, hy = cy + R * 0.82;
    let fx, fy; if (sit) { fx = hx + sd * 10 * S + R * 0.5; fy = by - 8 * S; } else { fx = hx + Math.sin(sw) * legL * 0.6; fy = by - 10 * S - Math.max(0, Math.cos(ph * TAU + (sd > 0 ? Math.PI : 0))) * (o.walk == null ? 0 : 16 * S); }
    c.strokeStyle = ink; c.lineWidth = 20 * S; c.beginPath(); c.moveTo(hx, hy); c.quadraticCurveTo((hx + fx) / 2 + sd * 14 * S, (hy + fy) / 2, fx, fy); c.stroke();
    c.fillStyle = ink; c.beginPath(); c.ellipse(fx + (o.dir || 1) * 22 * S, fy + 2 * S, 42 * S, 22 * S, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.ellipse(fx + (o.dir || 1) * 32 * S, fy - 6 * S, 14 * S, 6 * S, -0.3, 0, TAU); c.fill(); }
  // arms (drawn behind body for 'down', in front otherwise)
  const arm = (sd, a) => { const sx = cx + sd * R * 0.95, sy = cy + R * 0.1; let ex, ey, hand = 'open';
    const T = (o.t || 0);
    if (a === 'wave') { ex = sx + sd * 70 * S; ey = sy - 150 * S + Math.sin(T * 9) * 12 * S; hand = 'wave'; }
    else if (a === 'up') { ex = sx + sd * 60 * S; ey = sy - 160 * S; }
    else if (a === 'hold') { ex = cx + sd * R * 0.5; ey = cy + R * 0.55; hand = 'fist'; }
    else if (a === 'point') { ex = sx + sd * 140 * S; ey = sy - 40 * S; hand = 'point'; }
    else if (a === 'cards') { ex = cx + sd * R * 0.35; ey = cy + R * 0.75; hand = 'cards'; }
    else if (a === 'talk') { ex = sx + sd * 95 * S; ey = sy - 50 * S + Math.sin(T * 3.1) * 25 * S; }
    else { ex = sx + sd * 40 * S; ey = sy + 110 * S + Math.sin(T * 1.7 + sd) * 4 * S; }
    c.strokeStyle = ink; c.lineWidth = 16 * S; c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo((sx + ex) / 2 + sd * 24 * S, (sy + ey) / 2 + 10 * S, ex, ey); c.stroke();
    // white 4-digit glove
    c.fillStyle = '#fbf8f0'; c.strokeStyle = ink; c.lineWidth = 5 * S; c.beginPath(); c.arc(ex, ey, 26 * S, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(ex - sd * 4 * S, ey + 24 * S, 22 * S, 9 * S, 0, 0, TAU); c.fill(); c.stroke();
    if (hand === 'point') { c.beginPath(); c.ellipse(ex + sd * 34 * S, ey - 2 * S, 18 * S, 8 * S, 0, 0, TAU); c.fill(); c.stroke(); }
    else if (hand === 'wave' || hand === 'open') { for (let f = -1; f <= 1; f++) { c.beginPath(); c.ellipse(ex + f * 12 * S, ey - 26 * S, 7 * S, 13 * S, f * 0.25, 0, TAU); c.fill(); c.stroke(); } }
    else { c.beginPath(); c.moveTo(ex - 12 * S, ey - 4 * S); c.lineTo(ex + 12 * S, ey - 4 * S); c.stroke(); }
    if (hand === 'cards') { for (let q = 0; q < 3; q++) { c.save(); c.translate(ex + sd * 10 * S, ey - 30 * S); c.rotate(sd * (-0.4 + q * 0.35)); c.fillStyle = '#fbf8f0'; c.fillRect(-14 * S, -48 * S, 28 * S, 40 * S); c.strokeRect(-14 * S, -48 * S, 28 * S, 40 * S); c.fillStyle = q === 1 ? RED10 : ink; c.font = `${18 * S}px ${HAND}`; c.textAlign = 'center'; c.fillText(q === 1 ? '♥' : '♠', 0, -24 * S); c.restore(); } }
  };
  const A = o.arms || [null, null];
  // body: rim + face
  const g = c.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R * 1.05); g.addColorStop(0, k[0]); g.addColorStop(0.6, k[1]); g.addColorStop(1, k[2]);
  c.save(); c.translate(cx, cy); c.scale(1 + (o.squash || 0), 1 - (o.squash || 0)); c.translate(-cx, -cy);
  c.fillStyle = k[2]; c.beginPath(); c.ellipse(cx + 10 * S, cy + 6 * S, R, R * 1.02, 0, 0, TAU); c.fill();
  c.fillStyle = g; c.strokeStyle = ink; c.lineWidth = lw; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fill(); c.stroke();
  c.strokeStyle = k[2]; c.lineWidth = 5 * S; c.setLineDash([4 * S, 7 * S]); c.beginPath(); c.arc(cx, cy, R * 0.86, 0, TAU); c.stroke(); c.setLineDash([]);
  c.fillStyle = 'rgba(255,255,255,0.45)'; c.beginPath(); c.ellipse(cx - R * 0.45, cy - R * 0.5, R * 0.22, R * 0.1, -0.6, 0, TAU); c.fill();
  if (o.scuff) { c.strokeStyle = k[2]; c.lineWidth = 4 * S; [[0.3, 0.4, 0.55, 0.3], [0.45, 0.55, 0.6, 0.62], [-0.6, 0.35, -0.42, 0.5]].forEach(([a, b, e, f]) => { c.beginPath(); c.moveTo(cx + a * R, cy + b * R); c.lineTo(cx + e * R, cy + f * R); c.stroke(); }); }
  if (o.label) { c.fillStyle = k[2]; c.font = `${30 * S}px ${HAND}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.label, cx, cy + R * 0.62); }
  // face
  const ex = o.expr || 'neutral', lk = o.look || [0, 0], blink = o.blink;
  for (const sd of [-1, 1]) { const x = cx + sd * R * 0.3, y = cy - R * 0.18; const eh = (ex === 'surprised' || ex === 'scared' ? 44 : 38) * S, ew = 24 * S;
    if (ex === 'happy' || blink) { c.strokeStyle = ink; c.lineWidth = 7 * S; c.beginPath(); c.arc(x, y + 6 * S, 18 * S, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); continue; }
    c.fillStyle = '#fbf8f0'; c.strokeStyle = ink; c.lineWidth = 6 * S; c.beginPath(); c.ellipse(x, y, ew, eh, 0, 0, TAU); c.fill(); c.stroke();
    const px = x + lk[0] * 8 * S, py = y + 6 * S + lk[1] * 8 * S; c.fillStyle = ink; c.beginPath(); c.ellipse(px, py, 13 * S, 24 * S, 0, 0, TAU); c.fill();
    c.fillStyle = '#fbf8f0'; c.beginPath(); c.moveTo(px, py - 6 * S); c.arc(px, py - 6 * S, 12 * S, -2.2, -1.2); c.closePath(); c.fill();
    if (ex === 'sleepy' || ex === 'sly') { c.fillStyle = k[1]; c.fillRect(x - ew - 4 * S, y - eh - 4 * S, ew * 2 + 8 * S, eh * (ex === 'sleepy' ? 1.1 : 0.85)); c.strokeStyle = ink; c.lineWidth = 6 * S; c.beginPath(); c.moveTo(x - ew, y - eh * (ex === 'sleepy' ? -0.1 : 0.15)); c.lineTo(x + ew, y - eh * (ex === 'sleepy' ? -0.1 : 0.15)); c.stroke(); }
    // brows
    const bt = ex === 'sad' || ex === 'scared' ? sd * 0.35 : ex === 'angry' ? -sd * 0.35 : 0; c.strokeStyle = ink; c.lineWidth = 7 * S; c.beginPath(); c.moveTo(x - 20 * S, y - eh - 12 * S + bt * 20 * S); c.lineTo(x + 20 * S, y - eh - 12 * S - bt * 20 * S); c.stroke(); }
  const mx = cx, my = cy + R * 0.32, m = o.mouth || ({ happy: 'grin', sad: 'frown', surprised: 'O', scared: 'wavy', sly: 'smirk', sleepy: 'flat' }[ex] || 'smile');
  c.strokeStyle = ink; c.lineWidth = 7 * S; c.fillStyle = '#5a1a14';
  if (m === 'open' || m === 'O' || m === 'E') { c.beginPath(); c.ellipse(mx, my, (m === 'O' ? 16 : m === 'E' ? 30 : 26) * S, (m === 'O' ? 22 : m === 'E' ? 12 : 20) * S, 0, 0, TAU); c.fill(); c.stroke(); c.fillStyle = '#e8705a'; c.beginPath(); c.ellipse(mx, my + 8 * S, 12 * S, 6 * S, 0, 0, TAU); c.fill(); }
  else if (m === 'grin') { c.beginPath(); c.moveTo(mx - 40 * S, my - 6 * S); c.quadraticCurveTo(mx, my + 44 * S, mx + 40 * S, my - 6 * S); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#fbf8f0'; c.fillRect(mx - 26 * S, my - 4 * S, 52 * S, 9 * S); }
  else if (m === 'frown') { c.beginPath(); c.arc(mx, my + 26 * S, 30 * S, Math.PI * 1.2, Math.PI * 1.8); c.stroke(); }
  else if (m === 'wavy') { c.beginPath(); for (let i = 0; i <= 8; i++) c.lineTo(mx - 32 * S + i * 8 * S, my + (i % 2 ? 6 : -6) * S); c.stroke(); }
  else if (m === 'smirk') { c.beginPath(); c.moveTo(mx - 26 * S, my + 4 * S); c.quadraticCurveTo(mx + 6 * S, my + 14 * S, mx + 30 * S, my - 10 * S); c.stroke(); }
  else if (m === 'flat' || m === 'M') { c.beginPath(); c.moveTo(mx - 24 * S, my + 4 * S); c.lineTo(mx + 24 * S, my + 4 * S); c.stroke(); }
  else { c.beginPath(); c.arc(mx, my - 12 * S, 30 * S, Math.PI * 0.2, Math.PI * 0.8); c.stroke(); }
  if (o.hat === 'hard') { c.fillStyle = YEL10; c.strokeStyle = ink; c.lineWidth = 7 * S; c.beginPath(); c.ellipse(cx, cy - R * 0.86, R * 0.78, 18 * S, 0, 0, TAU); c.fill(); c.stroke(); c.beginPath(); c.arc(cx, cy - R * 0.86, R * 0.58, Math.PI, 0); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx, cy - R * 1.44); c.lineTo(cx, cy - R * 0.9); c.stroke(); }
  c.restore();
  A.forEach((a, i) => arm(i ? 1 : -1, a));
}
function coinCard(scene, key, height) {
  const T = canvasTex(512, 768); const g = new THREE.PlaneGeometry(height * 512 / 768, height); g.translate(0, height / 2 - height * 0.02, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: T.t, transparent: true, alphaTest: 0.05, color: 0xf2ead8, side: THREE.DoubleSide }));
  const sh = new THREE.Mesh(new THREE.CircleGeometry(height * 0.2, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45, depthWrite: false }));
  sh.rotation.x = -Math.PI / 2; sh.scale.set(1, 0.45, 1); scene.add(m); scene.add(sh); m.userData.card = true;
  return { mesh: m, shadow: sh, key, set(x, z, o, cam, y) { y = y || 0; m.visible = sh.visible = true; m.position.set(x, y, z); sh.position.set(x, y + 0.012, z); sh.visible = !o.noShadow; T.x.clearRect(0, 0, 512, 768); T.x.save(); if ((o.dir || 1) < 0) { T.x.translate(512, 0); T.x.scale(-1, 1); } drawCoin(T.x, o, 256, 742, 1.15); T.x.restore(); T.t.needsUpdate = true; }, hide() { m.visible = sh.visible = false; } };
}
const coinOf = (s, key, h) => s['c_' + key] || (s['c_' + key] = coinCard(s.S, key, h));

/* ================= small shared props ================= */
const P10 = {
  jar(label) { const g = group(); const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.26, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0xcfe8ee, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false })); glass.position.y = 0.13; g.add(glass);
    g.add(cyl(0.115, 0.115, 0.04, std(0xc9a24a, { metalness: 0.8, roughness: 0.3 }), 0, 0.26, 0)); const coins = []; for (let i = 0; i < 16; i++) { const c = cyl(0.03, 0.03, 0.008, std(i % 3 ? 0xd9a23a : 0xb8bec6, { metalness: 0.8, roughness: 0.3 }), (i % 4 - 1.5) * 0.045, 0.005 + Math.floor(i / 4) * 0.012, ((i * 7) % 3 - 1) * 0.04); c.rotation.z = (i % 5) * 0.1; g.add(c); coins.push(c); }
    const l = board(0.15, 0.06, (x, w, h, o) => { x.fillStyle = '#111'; x.fillRect(0, 0, w, h); ltxt(x, (o && o.t) || label || 'SAVINGS', w / 2, h / 2, h * 0.55, '#f4efe6', 'center'); }); l.position.set(0, 0.13, 0.112); g.add(l); g.userData.label = l; g.userData.coins = coins; return shadowy(g); },
  labelMaker() { const g = group(rbox(0.1, 0.05, 0.2, 0.02, std(0x3f9b5f, { roughness: 0.4 }), 0, 0, 0), box(0.07, 0.005, 0.06, std(0x111111), 0, 0.052, 0.04)); for (let i = 0; i < 9; i++) g.add(box(0.014, 0.008, 0.014, std(0xe8e0cc), -0.025 + (i % 3) * 0.025, 0.052, -0.02 - Math.floor(i / 3) * 0.025)); const tape = box(0.04, 0.002, 0.08, std(0x111111), 0, 0.02, 0.13); g.add(tape); g.userData.tape = tape; return shadowy(g); },
  phone(draw) { const g = group(rbox(0.09, 0.012, 0.17, 0.008, std(0x111111, { roughness: 0.3 }), 0, 0, 0)); const sc = board(0.08, 0.155, draw, true); flat(sc, 0.0135); g.add(sc); g.userData.sc = sc; return shadowy(g); },
  chair(col) { const m = std(col || 0xe07a3a, { roughness: 0.45 }), leg = std(0x2a2a2a, { metalness: 0.6, roughness: 0.4 }); const g = group(rbox(0.46, 0.05, 0.44, 0.03, m, 0, 0.44, 0), rbox(0.46, 0.42, 0.05, 0.03, m, 0, 0.5, -0.21));
    for (const [x, z] of [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]]) g.add(box(0.025, 0.44, 0.025, leg, x, 0.22, z)); return shadowy(g); },
  can(lbl) { const g = group(cyl(0.11, 0.11, 0.24, std(0xb83a2a, { metalness: 0.6, roughness: 0.45 }), 0, 0, 0), cyl(0.115, 0.115, 0.02, std(0x5a5a5a, { metalness: 0.8, roughness: 0.4 }), 0, 0.24, 0)); const l = board(0.2, 0.1, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, lbl || 'THE FOLGERS FUND', w / 2, h / 2, h * 0.3, INK, 'center'); }); l.position.set(0, 0.12, 0.112); g.add(l); return shadowy(g); },
  turtle() { const g = group(); const shell = sph(0.32, std(0x4a7a3a, { roughness: 0.6 }), 0, 0.22, 0); shell.scale.set(1.25, 0.65, 1); g.add(shell); const skin = std(0x8aa85a, { roughness: 0.7 }); g.add(sph(0.12, skin, 0.46, 0.25, 0));
    const legs = []; for (const [x, z] of [[0.25, 0.2], [-0.25, 0.2], [0.25, -0.2], [-0.25, -0.2]]) { const l = cyl(0.06, 0.06, 0.14, skin, x, 0, z); legs.push(l); g.add(l); } g.add(sph(0.022, std(0x111111), 0.55, 0.3, 0.07), sph(0.022, std(0x111111), 0.55, 0.3, -0.07));
    const sash = board(0.5, 0.12, (x, w, h) => { x.fillStyle = RED10; x.fillRect(0, 0, w, h); ltxt(x, 'S&P 500', w / 2, h / 2, h * 0.62, '#fff', 'center'); }); sash.position.set(0, 0.3, 0.33); g.add(sash); g.userData.legs = legs; return shadowy(g); },
  truck(col, lbl) { const g = group(rbox(1.6, 1.0, 0.9, 0.04, std(col || 0xe8e0cc, { roughness: 0.5 }), -0.3, 0.3, 0), rbox(0.6, 0.75, 0.9, 0.06, std(0x2f4d6b, { roughness: 0.4 }), 0.8, 0.3, 0), box(0.3, 0.3, 0.86, std(0x9fd0e8, { roughness: 0.1 }), 1.0, 0.75, 0)); const wh = []; for (const [x, z] of [[-0.7, 0.46], [0.75, 0.46], [-0.7, -0.46], [0.75, -0.46]]) { const w = cyl(0.17, 0.17, 0.1, std(0x1a1a1a), 0, 0, 0); w.rotation.x = Math.PI / 2; w.position.set(x, 0.17, z); g.add(w); wh.push(w); }
    const l = board(1.2, 0.4, (x, w, h) => { x.fillStyle = '#f4efe6'; x.fillRect(0, 0, w, h); ltxt(x, lbl || 'FRESH BREAD', w / 2, h / 2, h * 0.5, RED10, 'center'); }); l.position.set(-0.3, 0.85, 0.456); g.add(l); g.userData.wh = wh; return shadowy(g); },
};
/* fridge whiteboard: modes 'jars' {k: 0..1 year progress}, 'towers' {k, late}, 'plan' {n} */
function fridgeBoard(w, h) { return board(w, h, (x, cw, ch, o) => { o = o || {}; x.fillStyle = '#f6f8f6'; x.fillRect(0, 0, cw, ch); x.strokeStyle = '#c8cec8'; x.lineWidth = 10; x.strokeRect(5, 5, cw - 10, ch - 10);
  const mk = (s, px, py, sz, col, al) => ltxt(x, s, px, py, sz, col || '#24303a', al || 'center');
  if (o.mode === 'jars') { const yr = Math.round(1 + (o.k || 0) * 19); mk('YEAR ' + yr, cw / 2, ch * 0.08, ch * 0.06, '#24303a');
    const jar = (jx, rate, col) => { const v = 10000 * Math.pow(1 + rate, yr), fill = Math.min(1, (v - 10000) / 57275); const jw = cw * 0.34, jh = ch * 0.55, jy = ch * 0.25; x.strokeStyle = '#24303a'; x.lineWidth = 8; x.strokeRect(jx - jw / 2, jy, jw, jh); x.fillStyle = col; const fh = jh * (0.12 + 0.88 * fill); x.fillRect(jx - jw / 2 + 6, jy + jh - fh, jw - 12, fh - 4);
      mk((rate * 100) + '% A YEAR', jx, jy - ch * 0.04, ch * 0.05, '#24303a'); mk('$' + Math.round(v).toLocaleString('en-US'), jx, jy + jh + ch * 0.07, ch * 0.065, rate > 0.05 ? GRN10 : '#7a828c'); };
    jar(cw * 0.27, 0.01, '#b8bec6'); jar(cw * 0.73, 0.10, '#7ac48a'); }
  else if (o.mode === 'towers') { const K = o.k || 0; mk('$300 A MONTH, 8% A YEAR', cw / 2, ch * 0.08, ch * 0.05); const base = ch * 0.88; x.strokeStyle = '#24303a'; x.lineWidth = 6; x.beginPath(); x.moveTo(cw * 0.06, base); x.lineTo(cw * 0.94, base); x.stroke();
    const yrs = Math.round(K * 25); for (let i = 0; i < 25; i++) { if (i >= yrs) break; const r = 0.08 / 12, n = (i + 1) * 12, v = 300 * (Math.pow(1 + r, n) - 1) / r, put = 300 * n; const bx = cw * (0.08 + i * 0.034), bw = cw * 0.026; const hv = (v / 285308) * ch * 0.66, hp = (put / 285308) * ch * 0.66; x.fillStyle = GRN10; x.fillRect(bx, base - hv, bw, hv); x.fillStyle = '#e3b53a'; x.fillRect(bx, base - hp, bw, hp); }
    if (yrs >= 25) { mk('~$285,000', cw * 0.78, ch * 0.16, ch * 0.07, GRN10); mk('$90,000 PUT IN', cw * 0.78, ch * 0.24, ch * 0.045, '#9a6a1a'); }
    if (o.late) { const n2 = Math.round(o.late * 15); for (let i = 0; i < n2; i++) { const r = 0.08 / 12, n = (i + 1) * 12, v = 300 * (Math.pow(1 + r, n) - 1) / r; const bx = cw * (0.08 + (i + 10) * 0.034) + cw * 0.009, bw = cw * 0.012; const hv = (v / 285308) * ch * 0.66; x.fillStyle = RED10; x.fillRect(bx, base - hv, bw, hv); } if (n2 >= 15) mk('START 10 YRS LATE: ~$104,000', cw * 0.5, ch * 0.33, ch * 0.05, RED10); }
    mk('YEAR 1', cw * 0.1, ch * 0.94, ch * 0.035); mk('YEAR 25', cw * 0.9, ch * 0.94, ch * 0.035); }
  else if (o.mode === 'plan') { mk("WREN'S PLAN", cw / 2, ch * 0.08, ch * 0.065, RED10); ['1. REAL NUMBER: $2,400/MO', '2. CUSHION 3-6 MO, HIGH-YIELD', '3. RAINY DAY / SOMEDAY', '4. START TINY, AUTOMATIC', '5. WHOLE STREET + KEEP WALKING'].forEach((s, i) => { if (i < (o.n || 0)) mk(s, cw * 0.06, ch * (0.22 + i * 0.15), ch * 0.05, '#24303a', 'left'); }); }
  else { mk('GROCERIES', cw * 0.5, ch * 0.2, ch * 0.06); mk('- eggs  - rice  - floss', cw * 0.5, ch * 0.32, ch * 0.045); }
}); }

Object.assign(SETB, {
  /* ================= WREN'S APARTMENT (dressed from 'kitchen'): fridge whiteboard, jar, label maker, phone, couch, calendar ================= */
  apartment10() { const s = SETB.kitchen(); const { S } = s; const z0 = s.z0; ['flyer', 'bowl', 'key', 'r1', 'r2'].forEach(k => { if (s[k]) s[k].visible = false; });
    const TY = 0.785, TX0 = 0.15, TZ = z0 + 1.9; S.children.forEach(o => { if (Math.abs(o.position.x - 0.55) < 0.01 && Math.abs(o.position.z - (z0 + 1.75)) < 0.01) o.visible = false; });
    const jar = P10.jar('SAVINGS'); jar.position.set(TX0 - 0.25, TY, TZ - 0.05); S.add(jar);
    const jar2 = P10.jar('SOMEDAY'); jar2.position.set(TX0 + 0.05, TY, TZ - 0.12); S.add(jar2); jar2.visible = false; jar2.userData.coins.forEach(c => c.visible = false);
    const spill = []; for (let i = 0; i < 14; i++) { const c = cyl(0.03, 0.03, 0.008, std(i % 2 ? 0xd9a23a : 0xe3b53a, { metalness: 0.8, roughness: 0.3 }), 0, 0, 0); c.visible = false; S.add(c); spill.push(c); }
    const lm = P10.labelMaker(); lm.position.set(TX0 + 0.12, TY + 0.025, TZ + 0.12); lm.rotation.y = -0.4; S.add(lm);
    const phone = P10.phone((x, w, h, o) => { o = o || {}; x.fillStyle = o.lit === false ? '#0b0d10' : '#f4f6f8'; x.fillRect(0, 0, w, h); if (o.lit === false) return; x.fillStyle = '#24303a'; x.fillRect(0, 0, w, h * 0.16); ltxt(x, o.bank || 'BIG MARBLE BANK', w / 2, h * 0.08, h * 0.05, '#e3c77a', 'center');
      ltxt(x, o.l1 || 'INTEREST PAID', w / 2, h * 0.34, h * 0.07, '#24303a', 'center'); ltxt(x, o.amt || '$0.08', w / 2, h * 0.52, h * 0.16, o.col || RED10, 'center'); ltxt(x, o.l2 || 'Balance $10,000.00', w / 2, h * 0.72, h * 0.055, '#5a5a5a', 'center'); }); phone.position.set(TX0 + 0.3, TY + 0.007, TZ - 0.1); phone.rotation.y = 0.3; S.add(phone);
    const note = board(0.21, 0.28, (x, w, h, o) => { paperBg(x, w, h, '#fbf6e8'); x.strokeStyle = '#9fc0e0'; x.lineWidth = 3; for (let i = 1; i < 12; i++) { x.beginPath(); x.moveTo(0, i * h / 12); x.lineTo(w, i * h / 12); x.stroke(); } const n = (o && o.n) || 0; for (let i = 0; i < n; i++) ltxt(x, (i + 1) + '.  ' + ['cushion', 'high-yield', '2 pockets', 'auto $', 'whole street'][i], w * 0.1, h * (0.15 + i * 0.16), h * 0.09, '#24303a'); });
    flat(note, TY + 0.004); note.position.set(TX0 + 0.05, TY + 0.004, TZ + 0.18); note.visible = false; S.add(note);
    // fridge with whiteboard door, left of the back wall
    const FX = -2.3, FZ = z0 + 0.42; const fr = group(rbox(0.82, 1.85, 0.72, 0.05, std(0xe8ece8, { roughness: 0.3, metalness: 0.1 }), 0, 0, 0), box(0.04, 0.5, 0.05, std(0x8a8f96, { metalness: 0.8 }), 0.34, 1.35, 0.38)); fr.position.set(FX, 0, FZ); S.add(shadowy(fr));
    const cl2 = new THREE.PointLight(0xffd9a8, 2.2, 4.5); cl2.position.set(1.7, 2.0, -0.9); S.add(cl2); const fl = new THREE.PointLight(0xfff0d8, 2.6, 4); fl.position.set(FX + 0.7, 2.1, FZ + 1.3); S.add(fl); const fb = fridgeBoard(0.66, 0.9); fb.position.set(FX - 0.04, 1.2, FZ + 0.365); S.add(fb); fb.userData.draw({});
    for (let i = 0; i < 4; i++) S.add(sph(0.02, std([0xc2372d, 0xe3c77a, 0x3f9b5f, 0x2f4d6b][i]), FX - 0.3 + i * 0.18, 1.67, FZ + 0.37));
    // payday calendar on back wall
    const cal = board(0.55, 0.62, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f6efe0'; x.fillRect(0, 0, w, h); x.fillStyle = RED10; x.fillRect(0, 0, w, h * 0.16); ltxt(x, o.m || 'NOVEMBER', w / 2, h * 0.08, h * 0.08, '#fff', 'center');
      for (let i = 0; i < 30; i++) { const cx = w * (0.1 + (i % 7) * 0.13), cy = h * (0.27 + Math.floor(i / 7) * 0.15); ltxt(x, '' + (i + 1), cx, cy, h * 0.05, '#24303a', 'center'); if (i === 14 || i === 29) { x.strokeStyle = GRN10; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, h * 0.05, 0, TAU); x.stroke(); } } }); cal.position.set(1.6, 1.55, z0 + 0.03); S.add(cal);
    // little couch at right
    const cm = std(0x6a4a6b, { roughness: 0.8 }); const couch = group(rbox(1.7, 0.42, 0.8, 0.08, cm, 0, 0.12, 0), rbox(1.7, 0.55, 0.22, 0.08, cm, 0, 0.42, -0.32), rbox(0.2, 0.3, 0.8, 0.06, cm, -0.78, 0.45, 0), rbox(0.2, 0.3, 0.8, 0.06, cm, 0.78, 0.45, 0), rbox(0.45, 0.3, 0.12, 0.05, std(0xe3c77a), -0.45, 0.62, -0.18)); couch.position.set(2.4, 0, z0 + 1.0); couch.rotation.y = -0.25; S.add(shadowy(couch));
    const lamp = P3.lamp(0xe3c77a); lamp.position.set(TX0 - 0.55, TY, TZ - 0.25); S.add(lamp); const ll = new THREE.PointLight(0xffd8a0, 1.6, 2.6); ll.position.set(TX0 - 0.55, TY + 0.45, TZ - 0.1); S.add(ll);
    const night = new THREE.PointLight(0x9ab0e8, 0, 6); night.position.set(1.4, 2.2, z0 + 0.6); S.add(night);
    return Object.assign(s, { TY, TX: TX0, TZ, jar, jar2, spill, lm, phone, note, fb, fridge: fr, FX, FZ, cal, couch, night, ll });
  },

  /* ================= BANK WAITING ROOM (dressed from bank6): plastic chairs, ticket machine, plaque, card table ================= */
  waitroom10() { const s = SETB.bank6(); const { S } = s; const z0 = s.z0, cz = s.cz; if (s.money) s.money.visible = false; if (s.jet) s.jet.visible = false;
    const sg = board(4.25, 0.58, (x, w, h) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c9a24a'; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, 'BIG MARBLE BANK', w / 2, h / 2, h * 0.5, '#e3c77a', 'center'); }); sg.position.set(-0.6, 3.5, z0 + 0.06); S.add(sg);
    const plaque = board(1.3, 0.5, (x, w, h, o) => { o = o || {}; x.fillStyle = '#2a1a10'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c9a24a'; x.lineWidth = 6; x.strokeRect(5, 5, w - 10, h - 10); ltxt(x, 'STANDARD SAVINGS', w / 2, h * 0.32, h * 0.18, '#e3c77a', 'center'); ltxt(x, o.r || '0.01% APY', w / 2, h * 0.7, h * 0.3, '#f4efe6', 'center'); }); plaque.position.set(-1.45, 2.55, z0 + 0.06); S.add(plaque);
    const chairs = [], seats = []; const cols = [0xe07a3a, 0xd8603a, 0xe0a03a];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { const ch = P10.chair(cols[(i + r) % 3]); const x = -3.6 + i * 0.75 + (i > 2 ? 0.5 : 0), z = cz + 2.6 + r * 1.15; ch.position.set(x, 0, z); S.add(ch); chairs.push(ch); seats.push([x, z]); }
    const tm = group(cyl(0.04, 0.05, 1.0, std(0x2a2a2a, { metalness: 0.6 }), 0, 0, 0), rbox(0.42, 0.5, 0.3, 0.03, std(0xc2372d, { roughness: 0.4 }), 0, 1.0, 0)); const tsc = board(0.32, 0.22, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); ltxt(x, 'NOW SERVING', w / 2, h * 0.24, h * 0.16, '#ffcc4a', 'center'); ltxt(x, o.r || '0.01%', w / 2, h * 0.64, h * 0.36, '#ff6a4a', 'center'); }, true); tsc.position.set(0, 1.32, 0.152); tm.add(tsc);
    const tick = box(0.08, 0.002, 0.1, std(0xf4efe6), 0, 1.08, 0.16); tick.rotation.x = 0.4; tm.add(tick); tm.position.set(3.6, 0, cz + 2.0); S.add(shadowy(tm));
    const ctab = group(cyl(0.35, 0.35, 0.03, std(0x2a5a3a, { roughness: 0.8 }), 0, 0.5, 0), cyl(0.03, 0.03, 0.5, std(0x2a2a2a))); for (let i = 0; i < 6; i++) { const c = box(0.06, 0.002, 0.09, std(0xfbf8f0), Math.cos(i) * 0.18, 0.535, Math.sin(i * 2) * 0.15); c.rotation.y = i; ctab.add(c); } ctab.position.set(2.4, 0, cz + 3.75); S.add(shadowy(ctab));
    const tray = group(rbox(0.36, 0.04, 0.26, 0.02, std(0x7a1a22, { roughness: 0.9 }), 0, 0, 0)); const penny = cyl(0.04, 0.04, 0.008, std(0xc8743a, { metalness: 0.8, roughness: 0.3 }), 0, 0.045, 0); tray.add(penny); tray.position.set(-1.4, 0.96, cz + 0.25); S.add(shadowy(tray)); tray.visible = false;
    const hy = board(1.2, 0.7, (x, w, h) => { x.fillStyle = '#e8f8ee'; x.fillRect(0, 0, w, h); x.strokeStyle = GRN10; x.lineWidth = 10; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, 'HIGH-YIELD SAVINGS', w / 2, h * 0.28, h * 0.13, GRN10, 'center'); ltxt(x, '4.3% APY', w / 2, h * 0.55, h * 0.24, '#24303a', 'center'); ltxt(x, 'FDIC INSURED  ACROSS THE STREET  >', w / 2, h * 0.82, h * 0.08, '#24303a', 'center'); }, true); hy.position.set(4.6, 1.6, cz + 2.6); hy.rotation.y = -Math.PI / 2; S.add(hy); hy.visible = false;
    const hyL = new THREE.PointLight(0xc8ffd8, 0, 5); hyL.position.set(4.0, 1.8, cz + 2.6); S.add(hyL);
    const scis = group(box(0.03, 0.2, 0.01, std(0xc8ccd0, { metalness: 0.9, roughness: 0.2 }), -0.02, 0.1, 0), box(0.03, 0.2, 0.01, std(0xc8ccd0, { metalness: 0.9, roughness: 0.2 }), 0.02, 0.1, 0)); scis.children[0].rotation.z = 0.2; scis.children[1].rotation.z = -0.2; scis.visible = false; S.add(scis);
    keyLight(S, 0xffe8c8, 20, [0, 3.9, cz + 5.5], [0, 0.5, cz + 3.2], 0.7, true); dust(S, 0, 2, cz + 3, 8, 2.5, 4, 70);
    return Object.assign(s, { sg, plaque, chairs, seats, tsc, tm, ctab, tray, hy, hyL, scis });
  },

  /* ================= CLINIC BREAK ROOM (dressed from breakroom): Rico's three phones, tooth poster, window to the bridge ================= */
  breakroom10() { const s = SETB.breakroom(); const { S } = s; const z0 = s.z0, tz = s.tz;
    const tooth = board(0.6, 0.8, (x, w, h) => { x.fillStyle = '#e8f4f8'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.strokeStyle = '#24303a'; x.lineWidth = 8; x.beginPath(); x.moveTo(w * 0.25, h * 0.2); x.quadraticCurveTo(w * 0.5, h * 0.1, w * 0.75, h * 0.2); x.lineTo(w * 0.7, h * 0.62); x.lineTo(w * 0.6, h * 0.5); x.lineTo(w * 0.5, h * 0.66); x.lineTo(w * 0.4, h * 0.5); x.lineTo(w * 0.3, h * 0.62); x.closePath(); x.fill(); x.stroke(); ltxt(x, 'FLOSS DAILY!', w / 2, h * 0.84, h * 0.09, '#2f4d6b', 'center'); }); tooth.position.set(1.4, 1.6, z0 + 0.03); S.add(tooth);
    const win = P3.window(1.3, 1.0, (x, w, h, o) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f0b070'); g.addColorStop(1, '#6a4a5a'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#3a2a2a'; x.fillRect(0, h * 0.65, w * 0.3, h); x.fillRect(w * 0.7, h * 0.62, w, h); x.strokeStyle = '#2a1a10'; x.lineWidth = 4; x.beginPath(); x.moveTo(w * 0.3, h * 0.66); x.quadraticCurveTo(w * 0.5, h * 0.78, w * 0.7, h * 0.63); x.stroke(); for (let i = 1; i < 6; i++) { const px = w * (0.3 + i * 0.067); x.fillStyle = '#6a4a2a'; x.fillRect(px - 4, h * 0.66 + Math.sin(i / 6 * Math.PI) * h * 0.1, 8, 6); } for (let i = 0; i < 8; i++) { x.fillStyle = '#ffd88a'; x.fillRect(w * (0.74 + (i % 4) * 0.06), h * (0.5 + Math.floor(i / 4) * 0.06), 8, 10); } });
    win.position.set(3.95, 1.6, tz + 0.3); win.rotation.y = -Math.PI / 2; S.add(win);
    const P = []; for (let i = 0; i < 3; i++) { const ph = board(0.13, 0.24, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); const up = o.up == null ? (i % 2 ? -1 : 1) : o.up; x.strokeStyle = up > 0 ? '#3fdb7f' : '#ff4a3a'; x.lineWidth = 6; x.beginPath(); for (let k = 0; k <= 12; k++) { const y = h * (0.6 - up * k * 0.03 + Math.sin(k * 1.7 + i + (o.seed || 0)) * 0.06); k ? x.lineTo(w * k / 12, y) : x.moveTo(0, y); } x.stroke(); ltxt(x, o.t || ['0DTE CALLS', 'DOGCOIN', 'OPTIONS'][i], w / 2, h * 0.1, h * 0.08, '#ffcc4a', 'center'); ltxt(x, o.v || (up > 0 ? '+$400' : '-$380'), w / 2, h * 0.88, h * 0.12, up > 0 ? '#3fdb7f' : '#ff4a3a', 'center'); }, true);
      const g = group(rbox(0.15, 0.27, 0.012, 0.01, std(0x111111), 0, 0, 0)); ph.position.z = 0.008; g.add(ph); g.position.set(-0.35 + i * 0.2, 0.92, tz - 0.25); g.rotation.x = -0.25; S.add(g); P.push(ph); }
    const cm = P8.coffeeMachine ? P8.coffeeMachine() : null; if (cm) { cm.position.set(-0.75, 0.77, tz - 0.3); S.add(cm); }
    const mug = P3.mug(0xe8e0cc); mug.position.set(0.35, 0.77, tz + 0.2); S.add(mug);
    return Object.assign(s, { phones: P, win, tooth, mug });
  },

  /* ================= GRANDPA ABE'S PORCH (dressed from porch8): flower bed + coffee can, scale, framed letter ================= */
  porch10() { const s = SETB.porch8(); const { S } = s; ['certs', 'tree', 'potSign', 'phone', 'env', 'rule'].forEach(k => { if (s[k]) s[k].visible = false; }); if (s.night) s.night(false);
    const dz = s.dz, DY = s.DY;
    const bed = group(rbox(2.2, 0.18, 0.9, 0.04, std(0x3a2418, { roughness: 1 }), 0, 0, 0)); for (let i = 0; i < 9; i++) { const f = group(cyl(0.008, 0.008, 0.3, std(0x3f6b3a), 0, 0, 0), sph(0.05, std([0xe3c77a, 0xc2372d, 0xe8a0c0][i % 3]), 0, 0.32, 0)); f.position.set(-0.95 + i * 0.24, 0.16, (i % 2 ? 0.2 : -0.2)); bed.add(f); } bed.position.set(-2.2, 0, dz + 2.3); S.add(shadowy(bed));
    const can = P10.can(); can.position.set(-2.2, -0.2, dz + 2.3); S.add(can);
    const scale = group(cyl(0.12, 0.16, 0.05, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0, 0), cyl(0.02, 0.02, 0.55, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0.05, 0)); const beam10 = group(box(0.8, 0.025, 0.025, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0, 0)); beam10.position.y = 0.62; scale.add(beam10);
    const pans = []; for (const sd of [-1, 1]) { const p = group(cyl(0.13, 0.1, 0.025, std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }), 0, 0, 0)); p.position.set(sd * 0.38, 0.45, 0); scale.add(p); pans.push(p); }
    const lostC = cyl(0.05, 0.05, 0.01, std(0xc2372d), 0, 0.03, 0); pans[0].add(lostC); const won = [cyl(0.05, 0.05, 0.01, std(0x3f9b5f), -0.03, 0.03, 0), cyl(0.05, 0.05, 0.01, std(0x3f9b5f), 0.04, 0.042, 0)]; won.forEach(w => pans[1].add(w));
    scale.position.set(-1.8, s.TT || (DY + 0.65), dz + 0.25); S.add(shadowy(scale)); scale.visible = false;
    const letter = P3.frame(0.3, 0.38, (x, w, h) => { paperBg(x, w, h, '#f6efe0'); ltxt(x, 'ADVICE TO MY WIFE', w / 2, h * 0.18, h * 0.07, INK, 'center'); ltxt(x, '90% in a very', w / 2, h * 0.42, h * 0.08, INK, 'center'); ltxt(x, 'low-cost S&P 500', w / 2, h * 0.55, h * 0.08, RED10, 'center'); ltxt(x, 'index fund', w / 2, h * 0.68, h * 0.08, INK, 'center'); ltxt(x, '- W.B., 2013 letter', w / 2, h * 0.86, h * 0.06, '#5a5a5a', 'center'); });
    letter.position.set(2.0, (s.TT || DY + 0.65) + 0.2, dz + 0.2); letter.rotation.x = -0.25; S.add(letter); letter.visible = false;
    const sun = new THREE.DirectionalLight(0xffb070, 1.4); sun.position.set(-6, 5, 6); S.add(sun);
    return Object.assign(s, { bed, can, scale, beam: beam10, pans, letter, sun });
  },

  /* ================= MARKET STREET: two rows of shops along a street into depth; storm + sale mode ================= */
  street10() { const { S, C } = scene(0x2a2238, [18, 46]); const sky = skyDome(S, '#3a3a6a', '#f0a070'); S.add(new THREE.HemisphereLight(0xffe0c0, 0x2a2030, 0.8)); const amb = new THREE.AmbientLight(0x5a4a4a, 0.5); S.add(amb);
    const asph = ctex('asph10', 512, 512, (x, w, h, r) => { x.fillStyle = '#4a4648'; x.fillRect(0, 0, w, h); for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '30,30,34' : '110,104,100'},${0.15 + r() * 0.25})`; x.fillRect(r() * w, r() * h, 2, 2); } x.fillStyle = '#e8d890'; for (let y = 0; y < h; y += 128) x.fillRect(w / 2 - 6, y, 12, 64); }, [1, 12]);
    S.add(plane(5, 80, tmat(asph, { roughness: 0.9 }), 0, 0, -30, -Math.PI / 2));
    const walk = ctex('walk10', 256, 256, (x, w, h) => { x.fillStyle = '#b8b0a4'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a8278'; x.lineWidth = 3; x.strokeRect(0, 0, w, h); }, [2, 30]);
    for (const sd of [-1, 1]) S.add(box(2.4, 0.12, 80, tmat(walk, { roughness: 0.85 }), sd * 3.7, 0.06, -30));
    const NAMES = ['BAKERY', 'PHONES', 'PHARMACY', 'CAR PLANT', 'SIGN SHOP', 'GROCER', 'SHOES', 'CAFE', 'SOFTWARE', 'TOYS', 'BOOKS', 'POWER CO.', 'AIRLINE', 'BANK', 'CHIPS', 'BURGERS', 'HARDWARE', 'TV & FILM', 'PAINT', 'TIRES'];
    const COL = [0xb8785a, 0x6a7a8a, 0x9a8a70, 0x7a5a4a, 0x8a9a7a, 0xa88a6a, 0x6a5a7a, 0x9a6a5a];
    const shops = [];
    for (let i = 0; i < 20; i++) { const sd = i % 2 ? 1 : -1, zi = Math.floor(i / 2), z = 1.5 - zi * 3.4; const g = group(); const h = 3.6 + (i * 37 % 5) * 0.35;
      g.add(rbox(3.3, h, 1.0, 0.02, std(COL[i % 8], { roughness: 0.85 }), 0, 0, 0)); g.add(box(3.4, 0.2, 1.1, std(0x3a2a20), 0, h, 0));
      const win = board(2.2, 1.2, (x, w, hh, o) => { o = o || {}; const lit = o.lit == null ? 1 : o.lit; const gg = x.createLinearGradient(0, 0, 0, hh); gg.addColorStop(0, lit ? '#ffe0a0' : '#3a3a4a'); gg.addColorStop(1, lit ? '#e8a060' : '#2a2a34'); x.fillStyle = gg; x.fillRect(0, 0, w, hh); x.fillStyle = 'rgba(60,40,30,0.5)'; for (let k = 1; k < 3; k++) x.fillRect(k * w / 3 - 3, 0, 6, hh);
        if (o.sale) { x.save(); x.translate(w / 2, hh / 2); x.rotate(-0.12); x.fillStyle = RED10; x.fillRect(-w * 0.42, -hh * 0.22, w * 0.84, hh * 0.44); ltxt(x, 'HALF PRICE', 0, 0, hh * 0.26, '#fff', 'center'); x.restore(); }
        if (o.yours) { x.save(); x.translate(w * 0.75, hh * 0.3); x.rotate(0.2); x.strokeStyle = RED10; x.lineWidth = 10; x.strokeRect(-w * 0.2, -hh * 0.14, w * 0.4, hh * 0.28); ltxt(x, 'YOURS', 0, 0, hh * 0.18, RED10, 'center'); x.restore(); } }, true);
      win.position.set(0, 1.4, 0.505); g.add(win); win.userData.draw({});
      const sign = board(2.8, 0.5, (x, w, hh) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, hh); ltxt(x, NAMES[i], w / 2, hh / 2, hh * 0.55, '#ffe0a0', 'center'); }, true); sign.position.set(0, 2.55, 0.52); g.add(sign);
      const awn = box(3.0, 0.06, 0.9, std([0xc2372d, 0x2f4d6b, 0x3f6a4a, 0xe3a33a][i % 4], { roughness: 0.7 }), 0, 2.2, 0.85); awn.rotation.x = 0.25; g.add(awn);
      g.add(box(0.8, 1.9, 0.04, std(0x3a2418), 1.15, 0.95, 0.51));
      g.position.set(sd * 5.4, 0.12, z); g.rotation.y = -sd * Math.PI / 2; S.add(shadowy(g)); shops.push({ g, win, sd, z });
      if (zi < 6) { const l = new THREE.PointLight(0xffc880, 2.2, 5); l.position.set(sd * 4.3, 2.2, z); S.add(l); shops[i].light = l; } }
    // lamp posts
    for (let i = 0; i < 6; i++) for (const sd of [-1, 1]) { const z = -1 - i * 6.8; S.add(cyl(0.05, 0.06, 3.6, std(0x2a2a2a, { metalness: 0.5 }), sd * 2.7, 0.12, z)); S.add(sph(0.14, basic(0xffe0a0), sd * 2.7, 3.8, z)); }
    // trucks
    const trucks = [P10.truck(0xe8e0cc, 'FRESH BREAD'), P10.truck(0x8ab0c8, 'PHONE PARTS'), P10.truck(0xe3c77a, 'MEDICINE')]; trucks.forEach((t, i) => { t.rotation.y = Math.PI / 2 * (i % 2 ? 1 : -1); t.position.set(i % 2 ? 1.6 : -1.6, 0, -8 - i * 8); S.add(t); });
    // finish line + turtle race props
    const finish = group(cyl(0.05, 0.05, 2.4, std(0xe8e0cc), -2.3, 0.12, 0), cyl(0.05, 0.05, 2.4, std(0xe8e0cc), 2.3, 0.12, 0)); const ban = board(4.6, 0.5, (x, w, h) => { for (let i = 0; i < 24; i++) for (let j = 0; j < 3; j++) { x.fillStyle = (i + j) % 2 ? '#111' : '#f4efe6'; x.fillRect(i * w / 24, j * h / 3 * 0.6, w / 24, h / 5); } ltxt(x, 'FINISH: 15 YEARS', w / 2, h * 0.75, h * 0.38, RED10, 'center'); }); ban.position.set(0, 2.3, 0); finish.add(ban); finish.position.set(0, 0, -6); S.add(finish); finish.visible = false;
    const turtle = P10.turtle(); turtle.rotation.y = Math.PI / 2; S.add(turtle); turtle.visible = false;
    // deed strip that unrolls down the street
    const deed = board(1.2, 30, (x, w, h) => { paperBg(x, w, h, '#f3e7cc'); x.strokeStyle = '#9a6a1a'; x.lineWidth = 6; x.strokeRect(6, 6, w - 12, h - 12); for (let i = 0; i < 12; i++) ltxt(x, 'ONE SLICE OF EVERY SHOP', w / 2, h * (0.04 + i * 0.08), w * 0.07, INK, 'center'); }); flat(deed, 0.135); deed.position.set(0, 0.135, 1.5); S.add(deed); deed.visible = false;
    // storm: rain + clouds
    const rn = 1600, rg = new THREE.BufferGeometry(), rp = new Float32Array(rn * 6), rr = RH.rng(77), rb = [];
    for (let i = 0; i < rn; i++) { const x = (rr() - 0.5) * 12, y = rr() * 8, z = 3 - rr() * 30; rb.push([x, y, z]); rp.set([x, y, z, x - 0.03, y - 0.35, z], i * 6); }
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3)); const rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xaabbd8, transparent: true, opacity: 0.45 })); S.add(rain); rain.visible = false;
    rain.userData.tick = t => { if (!rain.visible) return; for (let i = 0; i < rn; i++) { const [x, y0, z] = rb[i]; const y = ((y0 - t * 9) % 8 + 8) % 8; rp[i * 6 + 1] = y; rp[i * 6 + 4] = y - 0.35; } rg.attributes.position.needsUpdate = true; };
    const flashL = new THREE.PointLight(0xe8eeff, 0, 60); flashL.position.set(0, 12, -6); S.add(flashL);
    const key = keyLight(S, 0xffe0b8, 22, [4, 7, 5], [0, 1, -6], 0.7, true);
    const storm = (k, t) => { const c = new THREE.Color(0x2a2238).lerp(new THREE.Color(0x15181f), k); S.background = c; S.fog.color = c; sky.material.color.setRGB(1 - 0.75 * k, 1 - 0.72 * k, 1 - 0.6 * k); amb.intensity = 0.5 - 0.25 * k; key.intensity = 22 * (1 - 0.6 * k); rain.visible = k > 0.15; rain.material.opacity = 0.5 * k; const fl = k > 0.5 ? Math.max(0, Math.sin(t * 1.3) > 0.985 ? 1 : 0) : 0; flashL.intensity = fl * 80; };
    const shopDraw = (o) => shops.forEach((sh, i) => { const key = JSON.stringify(typeof o === 'function' ? o(i) : o); if (sh._k !== key) { sh.win.userData.draw(typeof o === 'function' ? o(i) : o); sh._k = key; } });
    return { S, C, shops, trucks, finish, turtle, deed, rain, storm, shopDraw, sky };
  },
  sale10() { return getSet('street10'); },

  /* ================= CANYON + FIVE-PLANK ROPE BRIDGE: bank on the left cliff, Market Street on the right ================= */
  bridge10() { const { S, C } = scene(0x2a2240, [14, 60]); const sky = skyDome(S, '#2a2a5a', '#f0a070'); S.add(new THREE.HemisphereLight(0xffd8b8, 0x2a2030, 0.8)); S.add(new THREE.AmbientLight(0x4a3a4a, 0.45));
    const rock = ctex('rock10', 512, 512, (x, w, h, r) => { x.fillStyle = '#7a5a48'; x.fillRect(0, 0, w, h); for (let i = 0; i < 1800; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '50,34,28' : '150,118,96'},${0.2 + r() * 0.3})`; x.fillRect(r() * w, r() * h, 3 + r() * 8, 2 + r() * 4); } x.strokeStyle = 'rgba(40,26,20,0.6)'; x.lineWidth = 3; for (let i = 0; i < 18; i++) { x.beginPath(); x.moveTo(r() * w, 0); x.lineTo(r() * w, h); x.stroke(); } }, [3, 6]);
    const grass = ctex('grass10', 256, 256, (x, w, h, r) => { x.fillStyle = '#4a6a3a'; x.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '40,70,30' : '110,140,70'},0.5)`; x.fillRect(r() * w, r() * h, 2, 4); } }, [6, 6]);
    const GAP = 3.2; for (const sd of [-1, 1]) { const cl = box(20, 30, 14, tmat(rock, { roughness: 0.95 }), sd * (GAP + 10), -15, -3); S.add(cl); S.add(box(20, 0.12, 14, tmat(grass, { roughness: 0.95 }), sd * (GAP + 10), 0.06, -3)); }
    const deep = poster(7, 30, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#5a4a6a'); g.addColorStop(0.08, '#2a2034'); g.addColorStop(1, '#050408'); x.fillStyle = g; x.fillRect(0, 0, w, h); }, true); deep.position.set(0, -15.2, -9.9); S.add(deep); const back = plane(7, 12, tmat(rock, { roughness: 1, color: 0x4a3a48 }), 0, -6, -9.95); S.add(back); const haze = poster(7, 12, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(120,100,130,0.15)'); g.addColorStop(0.5, 'rgba(30,24,40,0.7)'); g.addColorStop(1, 'rgba(5,4,8,1)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }, true); haze.material.transparent = true; haze.material.depthWrite = false; haze.position.set(0, -6, -9.9); S.add(haze);
    for (const sd of [-1, 1]) { const far = box(12, 6, 4, tmat(rock, { roughness: 0.95 }), sd * (GAP + 6), -3, -14); S.add(far); }
    // bank on the left cliff
    const marble = std(0xe8e0d0, { roughness: 0.5 }); const bank = group(rbox(5, 3.4, 3, 0.03, marble, 0, 0, 0), box(5.4, 0.3, 3.3, std(0xd8d0c0), 0, 3.4, 0)); const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 3.1, 1.0, 3, 1), std(0xe0d8c8)); ped.rotation.set(Math.PI / 2, 0, Math.PI / 6); ped.scale.set(1, 0.55, 0.9); ped.position.set(0, 4.15, 1.4); bank.add(ped);
    for (let i = 0; i < 5; i++) bank.add(cyl(0.16, 0.18, 3.0, std(0xf2ece0, { roughness: 0.4 }), -2 + i * 1.0, 0.15, 1.65));
    const bsign = board(3.2, 0.42, (x, w, h) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, h); ltxt(x, 'BIG MARBLE BANK', w / 2, h / 2, h * 0.55, '#e3c77a', 'center'); }); bsign.position.set(0, 3.2, 1.82); bank.add(bsign);
    const bwin = board(1.4, 1.0, (x, w, h, o) => { o = o || {}; const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffe8b0'); g.addColorStop(1, '#e8b070'); x.fillStyle = g; x.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) { const cx = w * (0.15 + i * 0.14), cy = h * (o.press ? 0.45 : 0.62); x.fillStyle = i % 3 ? '#e3b53a' : '#b8bec6'; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, h * 0.11, 0, TAU); x.fill(); x.stroke(); x.fillStyle = '#fbf8f0'; for (const s of [-1, 1]) { x.beginPath(); x.ellipse(cx + s * h * 0.035, cy - h * 0.02, h * 0.022, h * 0.04, 0, 0, TAU); x.fill(); x.stroke(); } if (!o.press) { x.fillStyle = '#e07a3a'; x.fillRect(cx - h * 0.1, cy + h * 0.1, h * 0.2, h * 0.06); } }
      x.strokeStyle = '#2a1a10'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8); x.fillRect(w / 2 - 3, 0, 6, h); }, true); bwin.position.set(1.2, 1.5, 1.52); bank.add(bwin); bwin.userData.draw({});
    bank.add(box(1.0, 2.0, 0.06, std(0x3a2416), -1.2, 1.0, 1.52)); bank.position.set(-7.6, 0.12, -2.5); bank.rotation.y = 0.5; S.add(shadowy(bank));
    const bl = new THREE.PointLight(0xffd8a0, 4, 6); bl.position.set(-5.8, 1.8, -0.6); S.add(bl);
    // Market Street skyline + shopfront row on the right cliff
    const mk = group(); const mkWins = [];
    for (let i = 0; i < 7; i++) { const h = 2.6 + (i * 53 % 5) * 0.5, w = 1.8; const b = rbox(w, h, 1.4, 0.02, std([0x9a6a5a, 0x6a7a8a, 0xa88a6a, 0x7a5a6a][i % 4], { roughness: 0.85 }), 0, 0, 0); b.position.set(i * 1.9, 0, -(i % 2) * 1.2); mk.add(b);
      const wn = board(w * 0.8, h * 0.6, (x, ww, hh, o) => { o = o || {}; const f = o.lit == null ? 1 : o.lit; for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const on = ((r * 3 + c + i) * 0.137) % 1 < f; x.fillStyle = on ? '#ffd88a' : '#2a2a34'; x.fillRect(ww * (0.08 + c * 0.31), hh * (0.06 + r * 0.24), ww * 0.22, hh * 0.16); } }, true); wn.position.set(i * 1.9, h * 0.5, -(i % 2) * 1.2 + 0.71); mk.add(wn); mkWins.push(wn); wn.userData.draw({}); }
    const msign = board(3.6, 0.5, (x, w, h) => { x.fillStyle = '#1e1612'; x.fillRect(0, 0, w, h); ltxt(x, 'MARKET STREET', w / 2, h / 2, h * 0.6, '#ffe0a0', 'center'); }, true); msign.position.set(2.0, 3.7, 1.0); mk.add(msign);
    mk.position.set(5.2, 0.12, -4.2); mk.rotation.y = -0.35; S.add(shadowy(mk)); const ml = new THREE.PointLight(0xffc880, 6, 10); ml.position.set(6, 2.5, -1.5); S.add(ml);
    // bridge: posts, ropes, five planks
    const sag = x => -0.42 * (1 - (x / GAP) * (x / GAP)); const BW = 1.0;
    const bridge = group(); const wood = tmat(TX.wood('#8a6440', [1, 1], 'plank10'), { roughness: 0.8 }), dk = std(0x4a3020, { roughness: 0.8 });
    for (const sx of [-GAP, GAP]) for (const sz of [-BW / 2, BW / 2]) S.add(cyl(0.08, 0.1, 1.3, dk, sx, 0.1, sz));
    const ropeM = std(0xc8a870, { roughness: 0.9 }); const ropes = [];
    for (const sz of [-BW / 2, BW / 2]) for (const yoff of [0, 1.0]) { const pts = []; for (let i = 0; i <= 16; i++) { const x = -GAP + i / 16 * GAP * 2; pts.push(V3(x, sag(x) * (yoff ? 0.8 : 1) + 0.08 + yoff + (yoff ? 0.3 * (Math.abs(x) / GAP) : 0), sz)); } const r = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.025, 6), ropeM); bridge.add(r); ropes.push(r); }
    for (let i = 0; i <= 12; i++) { const x = -GAP + i / 12 * GAP * 2; for (const sz of [-BW / 2, BW / 2]) { const y0 = sag(x) + 0.08, y1 = sag(x) * 0.8 + 1.08 + 0.3 * Math.abs(x) / GAP; const v = cyl(0.01, 0.01, y1 - y0, ropeM, x, y0, sz); bridge.add(v); } }
    // filler slats between the five hero planks
    const PX = [-2.3, -1.2, -0.15, 0.85, 2.15]; for (let i = 0; i <= 22; i++) { const x = -GAP + 0.15 + i * (GAP * 2 - 0.3) / 22; if (PX.some((p, k) => Math.abs(x - p) < (k === 4 ? 0.7 : 0.32))) continue; const sl = box(0.16, 0.04, BW * 0.95, wood, x, sag(x) + 0.06, 0); sl.rotation.z = Math.atan(0.84 * x / (GAP * GAP)); bridge.add(sl); }
    const planks = [];
    const lbl = (txtS, col, w, h) => { const b = board(w, h, (x, cw, ch) => { x.fillStyle = col || '#f3e7cc'; x.fillRect(0, 0, cw, ch); ltxt(x, txtS, cw / 2, ch / 2, ch * 0.55, INK, 'center'); }); return b; };
    { const x = PX[0]; const g = group(rbox(0.5, 0.16, BW * 0.95, 0.07, std(0xe8a0b0, { roughness: 0.95 }), 0, 0, 0)); for (const sz of [-0.3, 0, 0.3]) g.add(sph(0.03, std(0xc87a8a), 0, 0.16, sz)); const l = lbl('1 CUSHION', '#fbe8ee', 0.42, 0.1); flat(l, 0.17); g.add(l); g.position.set(x, sag(x) + 0.02, 0); bridge.add(g); planks.push(g); }
    { const x = PX[1]; const g = group(box(0.45, 0.05, BW * 0.95, wood, 0, 0.02, 0)); const p1 = lbl('RAINY DAY', '#8ab0d8', 0.4, 0.2), p2 = lbl('SOMEDAY', '#9ad0a0', 0.4, 0.2); flat(p1, 0.05); flat(p2, 0.05); p1.position.z = -0.22; p2.position.z = 0.22; p1.rotation.z = p2.rotation.z = Math.PI / 2; g.add(p1, p2); g.position.set(x, sag(x) + 0.04, 0); bridge.add(g); planks.push(g); }
    { const x = PX[2]; const g = group(box(0.22, 0.05, 0.3, wood, 0, 0.02, 0)); const l = lbl('MIN. $0', '#f3e7cc', 0.2, 0.08); flat(l, 0.05); l.rotation.z = Math.PI / 2; g.add(l); g.position.set(x, sag(x) + 0.04, 0); bridge.add(g); planks.push(g); }
    { const x = PX[3]; const g = group(box(0.5, 0.05, BW * 0.95, tmat(TX.wood('#c8a870', [1, 1], 'deedp'), { roughness: 0.8 }), 0, 0.02, 0)); const l = lbl('WHOLE STREET', '#f3e7cc', 0.85, 0.16); flat(l, 0.05); l.rotation.z = Math.PI / 2; g.add(l); g.position.set(x, sag(x) + 0.04, 0); bridge.add(g); planks.push(g); }
    { const x = PX[4]; const g = group(box(1.4, 0.05, BW * 0.95, wood, 0, 0.02, 0)); const l = lbl('5  KEEP WALKING', '#f3e7cc', 0.9, 0.16); flat(l, 0.05); l.rotation.z = Math.PI / 2; g.add(l); g.position.set(x, sag(x) + 0.04, 0); g.rotation.z = Math.atan(0.84 * x / (GAP * GAP)); bridge.add(g); planks.push(g); }
    S.add(bridge); shadowy(bridge);
    // side door + STOP sign (credit card debt aside), hidden by default
    const door = group(box(0.08, 2.0, 0.08, dk, -0.5, 1.0, 0), box(0.08, 2.0, 0.08, dk, 0.5, 1.0, 0), box(1.08, 0.1, 0.1, dk, 0, 2.0, 0), box(0.92, 1.9, 0.04, std(0x7a1a22, { roughness: 0.6 }), 0, 0.95, 0)); const dsg = board(0.9, 0.5, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); x.strokeStyle = RED10; x.lineWidth = 8; x.strokeRect(5, 5, w - 10, h - 10); ltxt(x, 'CREDIT CARD DEBT', w / 2, h * 0.33, h * 0.17, INK, 'center'); ltxt(x, '22% APR', w / 2, h * 0.7, h * 0.3, RED10, 'center'); }); dsg.position.set(0, 1.35, 0.03); door.add(dsg);
    door.position.set(-4.8, 0.12, 1.4); door.rotation.y = 0.6; S.add(shadowy(door)); door.visible = false;
    const stop = group(cyl(0.025, 0.025, 1.2, std(0x8a8a8a, { metalness: 0.6 }), 0, 0, 0)); const oct = new THREE.Mesh(new THREE.CircleGeometry(0.28, 8), basic(0xc2372d)); oct.position.y = 1.3; oct.rotation.z = Math.PI / 8; stop.add(oct); const st = board(0.4, 0.14, (x, w, h) => { x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h); ltxt(x, 'STOP', w / 2, h / 2, h * 0.8, '#fff', 'center'); }, true); st.material.transparent = true; st.position.set(0, 1.3, 0.01); stop.add(st); stop.position.set(-4.0, 0.12, 1.9); S.add(stop); stop.visible = false;
    // wind dust + key light
    const wind = dust(S, 0, 1.2, 0, 10, 3, 4, 120, 0xffe8c0);
    keyLight(S, 0xffe0b8, 26, [-3, 6, 6], [0, 0, -1], 0.8, true); keyLight(S, 0xffb880, 10, [6, 3, 4], [3, 0.5, -2], 0.6, false);
    const sway = (t, amp) => { bridge.rotation.x = Math.sin(t * 1.4) * 0.03 * amp; bridge.position.y = Math.sin(t * 1.1) * 0.02 * amp; };
    const lit = f => { const k = Math.round(f * 20); if (S._lit !== k) { mkWins.forEach(w => w.userData.draw({ lit: f })); S._lit = k; } };
    return { S, C, sky, GAP, sag, PX, bridge, planks, bank, bwin, door, stop, sway, lit, mk };
  },
});
