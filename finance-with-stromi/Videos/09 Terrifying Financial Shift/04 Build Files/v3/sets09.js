/* Finance with Stromi 09 (The Rubber Band, yen carry trade): cast + 7 sets.
   New: tokyo9 (lending-window street), band9 (Pacific map table + rubber band), margin9 (broker back office).
   Dressed from earlier sets: kitchen9 (kitchen), wall9 (trading), capitol9 (hearing), vault9 (vault3). */
'use strict';
CH.nora = RH.character({ name: 'Nora', skin: '#e8b48a', head: { shape: 'round', w: 1.0, h: 1.02 }, ears: 'round', eyes: 'pie', nose: 'button', freckles: true, hair: { style: 'bun', color: '#8a4a2a', ribbon: '#e3c77a' }, hat: { type: 'none' }, body: { shape: 'pear', w: 0.98, h: 1.0 }, top: { type: 'dress', color: '#c87a9a', accent: '#f6ecd2', pattern: 'dots' }, legs: { color: '#e8b48a', len: 0.92, w: 0.85 }, shoes: { color: '#5a2a3a', sole: '#e8dcc0' }, blush: true });
CH.chet = RH.character({ name: 'Chet', skin: '#f0cfa8', head: { shape: 'long', w: 0.92, h: 1.05 }, ears: 'round', eyes: 'pie', nose: 'long', hair: { style: 'slick', color: '#d9b04a' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.95, h: 1.06 }, top: { type: 'tux', color: '#2f4d6b', accent: '#f4efe6' }, legs: { color: '#2f4d6b', len: 1.12, w: 0.9 }, tie: 'bow', tieColor: '#c2372d', shoes: { color: '#1e1612', sole: '#c2372d' } });
CH.hana = RH.character({ name: 'Hana', skin: '#f2d2b0', head: { shape: 'round', w: 0.98, h: 1.0 }, ears: 'round', eyes: 'pie', nose: 'button', hair: { style: 'bun', color: '#1e1612', ribbon: '#c2372d' }, hat: { type: 'none' }, body: { shape: 'slim', w: 0.95, h: 1.0 }, top: { type: 'dress', color: '#3f6a8a', accent: '#f4efe6', pattern: 'none' }, legs: { color: '#f2d2b0', len: 0.9, w: 0.82 }, shoes: { color: '#2a1d17', sole: '#e8dcc0' }, blush: true });
CH.kenji = RH.character({ name: 'Kenji', skin: '#e6c39c', head: { shape: 'bean', w: 1.02, h: 0.98 }, ears: 'big', eyes: 'pie', nose: 'bulb', hair: { style: 'bald', color: '#d8d4cc' }, hat: { type: 'none' }, body: { shape: 'barrel', w: 1.0, h: 0.95 }, top: { type: 'tux', color: '#4a4a4a', accent: '#e8e0cc' }, legs: { color: '#3a3a3a', len: 0.85, w: 1.0 }, tie: 'bow', tieColor: '#2f4d6b', shoes: { color: '#1e1612', sole: '#555555' } });
CH.brick = RH.character({ name: 'Brick', skin: '#9a6a48', head: { shape: 'bean', w: 1.15, h: 0.95 }, ears: 'big', eyes: 'dot', nose: 'bulb', hair: { style: 'bald', color: '#1e1612' }, hat: { type: 'bowler', color: '#1e1612', band: '#c2372d' }, body: { shape: 'barrel', w: 1.25, h: 1.1 }, top: { type: 'tux', color: '#3a3530', accent: '#d8d0c0' }, legs: { color: '#3a3530', len: 0.95, w: 1.3 }, shoes: { color: '#1e1612', sole: '#555555' } });
CH.pip9 = RH.character(Object.assign({}, CAST.pip, { name: 'Pip' }));
CH.dot9 = RH.character(Object.assign({}, CAST.dot, { name: 'Dot' }));
CH.gus9 = RH.character(Object.assign({}, CAST.gus, { name: 'Gus' }));

const RED9 = '#c2372d', GRN9 = '#3f9b5f', YEL9 = '#f2c83a', NAVY9 = '#24303a';
const YEN = '¥';
/* small shared props */
const P9 = {
  cat(col) { const m = std(col || 0xe0904a, { roughness: 0.8 }), dk = std(0x2a1a10); const g = group(sph(0.11, m, 0, 0.11, 0), sph(0.075, m, 0.12, 0.2, 0)); g.children[0].scale.set(1.5, 0.9, 0.9);
    for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 4), m); e.position.set(0.12, 0.29, s * 0.04); g.add(e); g.add(sph(0.012, dk, 0.185, 0.215, s * 0.03)); }
    const tail = cyl(0.015, 0.02, 0.22, m, 0, 0, 0); tail.position.set(-0.16, 0.12, 0); tail.rotation.z = 0.9; g.add(tail); g.userData.tail = tail; return shadowy(g); },
  phone(draw) { const g = group(rbox(0.09, 0.012, 0.17, 0.008, std(0x111111, { roughness: 0.3 }), 0, 0, 0)); const sc = board(0.08, 0.155, draw, true); flat(sc, 0.0135); g.add(sc); g.userData.sc = sc; return shadowy(g); },
  suitcase(col, label) { const m = std(col, { roughness: 0.5 }); const g = group(rbox(0.5, 0.36, 0.14, 0.03, m, 0, 0.18, 0), box(0.14, 0.03, 0.03, std(0x1a1a1a), 0, 0.38, 0)); const l = board(0.3, 0.12, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, label, w / 2, h / 2, h * 0.6, INK, 'center'); }); l.position.set(0, 0.2, 0.071); g.add(l); return shadowy(g); },
  lantern(col) { const g = group(cyl(0.004, 0.004, 0.3, std(0x111111), 0, 0.28, 0)); const b = sph(0.16, basic(col || 0xe8503a), 0, 0.12, 0); b.scale.set(1, 1.25, 1); g.add(b, cyl(0.1, 0.1, 0.03, std(0x1a1a1a), 0, 0.33, 0), cyl(0.1, 0.1, 0.03, std(0x1a1a1a), 0, -0.08, 0)); return g; },
  vending() { const g = group(rbox(0.9, 1.8, 0.7, 0.03, std(0xe8e8e8, { roughness: 0.3 }), 0, 0, 0)); const f = board(0.8, 1.0, (x, w, h) => { x.fillStyle = '#d8eef8'; x.fillRect(0, 0, w, h); const C = ['#c2372d', '#3f9b5f', '#2f4d6b', '#e3a33a', '#7a4a6b']; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { x.fillStyle = C[(r + c) % 5]; x.fillRect(w * (0.06 + c * 0.155), h * (0.06 + r * 0.24), w * 0.1, h * 0.16); x.fillStyle = '#fff'; x.fillRect(w * (0.06 + c * 0.155), h * (0.24 + r * 0.24), w * 0.1, h * 0.03); } }, true); f.position.set(0, 1.25, 0.36); g.add(f, box(0.6, 0.18, 0.02, std(0x222222), 0, 0.35, 0.36)); const l = new THREE.PointLight(0xd8eeff, 1.2, 2.2); l.position.set(0, 1.2, 0.8); g.add(l); return shadowy(g); },
  pole(h) { const g = group(cyl(0.07, 0.09, h, std(0x6a5a4a, { roughness: 0.9 }), 0, 0, 0), box(1.2, 0.06, 0.06, std(0x4a3a2a), 0, h - 0.4, 0), box(0.8, 0.06, 0.06, std(0x4a3a2a), 0, h - 0.8, 0)); return shadowy(g); },
  ladder(h) { const m = std(0xb88a4a, { roughness: 0.7 }); const g = group(box(0.05, h, 0.05, m, -0.22, h / 2, 0), box(0.05, h, 0.05, m, 0.22, h / 2, 0)); for (let y = 0.3; y < h; y += 0.32) g.add(box(0.44, 0.04, 0.04, m, 0, y, 0)); return shadowy(g); },
  crate(label, col, w) { w = w || 0.6; const g = group(rbox(w, 0.42, 0.42, 0.02, tmat(TX.wood(col || '#6a8a4a', [1, 1], 'cr' + (col || 'g')), { roughness: 0.7 }), 0, 0, 0)); const l = board(w * 0.8, 0.18, (x, cw, ch) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, cw, ch); ltxt(x, label, cw / 2, ch / 2, ch * 0.55, INK, 'center'); }); l.position.set(0, 0.21, 0.212); g.add(l); return shadowy(g); },
  trolley() { const m = std(0x8a8f96, { metalness: 0.8, roughness: 0.35 }); const g = group(box(0.9, 0.04, 0.55, m, 0, 0.25, 0), box(0.04, 0.8, 0.04, m, -0.43, 0.65, -0.25), box(0.04, 0.8, 0.04, m, -0.43, 0.65, 0.25), box(0.04, 0.04, 0.55, m, -0.43, 1.05, 0)); for (const [x, z] of [[-0.38, -0.22], [0.38, -0.22], [-0.38, 0.22], [0.38, 0.22]]) { const w = cyl(0.07, 0.07, 0.04, std(0x1a1a1a), 0, 0, 0); w.rotation.x = Math.PI / 2; w.position.set(x, 0.07, z); g.add(w); } return shadowy(g); },
  folder(label) { const g = group(rbox(0.34, 0.06, 0.26, 0.01, std(0x2f4d6b, { roughness: 0.7 }), 0, 0, 0)); const l = board(0.28, 0.12, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, label, w / 2, h / 2, h * 0.38, INK, 'center'); }); flat(l, 0.062); g.add(l); return shadowy(g); },
};
/* the brass rate dial: o.set(v) where v in percent (0..1.5) */
function rateDial() { const brass = std(0xc9a24a, { metalness: 0.9, roughness: 0.28 }); const g = group(cyl(0.22, 0.28, 0.08, brass, 0, 0, 0), cyl(0.05, 0.06, 1.0, brass, 0, 0.08, 0));
  const face = board(0.9, 0.9, (x, w, h, o) => { o = o || {}; x.fillStyle = '#efe4cf'; x.beginPath(); x.arc(w / 2, h / 2, w * 0.48, 0, TAU); x.fill(); x.lineWidth = w * 0.03; x.strokeStyle = '#8a6a2a'; x.stroke();
    for (let i = 0; i <= 10; i++) { const a = Math.PI * (0.8 + 1.4 * i / 10); const r1 = w * 0.42, r0 = w * (i % 5 ? 0.37 : 0.33); x.strokeStyle = INK; x.lineWidth = i % 5 ? 3 : 6; x.beginPath(); x.moveTo(w / 2 + Math.cos(a) * r0, h / 2 + Math.sin(a) * r0); x.lineTo(w / 2 + Math.cos(a) * r1, h / 2 + Math.sin(a) * r1); x.stroke(); }
    [['0', 0], ['0.5', 5], ['1%', 10]].forEach(([s, i]) => { const a = Math.PI * (0.8 + 1.4 * i / 10); ltxt(x, s, w / 2 + Math.cos(a) * w * 0.26, h / 2 + Math.sin(a) * w * 0.26, h * 0.07, INK, 'center'); });
    ltxt(x, 'INTEREST', w / 2, h * 0.68, h * 0.07, '#7a2a1a', 'center'); ltxt(x, (o.v == null ? '0' : o.v) + '%', w / 2, h * 0.8, h * 0.1, INK, 'center'); });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.04, 10, 48), brass); const head = group(face, ring); face.position.z = 0.01; head.position.set(0, 1.35, 0); g.add(head);
  const needle = group(box(0.03, 0.36, 0.015, std(0xc2372d), 0, 0.16, 0)); needle.position.set(0, 1.35, 0.03); g.add(needle, sph(0.04, brass, 0, 1.35, 0.04));
  const knob = cyl(0.12, 0.12, 0.08, std(0x5a3a22, { roughness: 0.5 }), 0, 0, 0); knob.rotation.x = Math.PI / 2; knob.position.set(0.55, 1.35, 0.02); g.add(knob, box(0.12, 0.04, 0.04, brass, 0.47, 1.35, 0.02));
  let lastV = null; g.userData.set = (v, txt) => { needle.rotation.z = -(-Math.PI * 0.7 + Math.PI * 1.4 * clamp(v, 0, 1)) + Math.PI; knob.rotation.z = v * 6; const k = txt || (Math.round(v * 100) / 100).toString(); if (k !== lastV) { face.userData.draw({ v: k }); lastV = k; } };
  g.userData.set(0); return shadowy(g); }
/* the station stock board (big lit flip board): draw({rows:[[name, val, col]], title}) */
function stockBoard(w, h) { return board(w, h, (x, cw, ch, o) => { o = o || {}; x.fillStyle = '#07090c'; x.fillRect(0, 0, cw, ch); x.strokeStyle = '#3a3a3a'; x.lineWidth = 8; x.strokeRect(4, 4, cw - 8, ch - 8); ltxt(x, o.title || 'TOKYO MARKETS', cw * 0.04, ch * 0.12, ch * 0.09, '#ffcc4a');
  (o.rows || []).forEach((r, i) => { const y = ch * (0.32 + i * 0.2); ltxt(x, r[0], cw * 0.04, y, ch * 0.12, '#e8e2d0'); ltxt(x, r[1], cw * 0.96, y, ch * (r[3] || 0.12), r[2] || '#e8e2d0', 'right'); x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(cw * 0.02, y + ch * 0.08, cw * 0.96, 2); }); }, true); }
/* street backdrop painting: dusk Tokyo shopfronts */
function tokyoBack(x, w, h, seed) { const r = RH.rng(seed || 5); const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a2a5a'); g.addColorStop(0.6, '#d8805a'); g.addColorStop(1, '#f0b070'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 22; i++) { const bw = w * (0.04 + r() * 0.06), bh = h * (0.3 + r() * 0.6), bx = r() * w; x.fillStyle = `rgb(${30 + r() * 30},${28 + r() * 20},${50 + r() * 30})`; x.fillRect(bx, h - bh, bw, bh); for (let k = 0; k < 30; k++) { if (r() < 0.45) { x.fillStyle = r() < 0.5 ? '#ffd88a' : '#ffeec8'; x.fillRect(bx + 4 + r() * (bw - 10), h - bh + 6 + r() * (bh - 12), 5, 7); } } }
  x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(w * 0.82, h * 0.2, h * 0.04, 0, TAU); x.fill(); }

Object.assign(SETB, {
  /* ================= NORA'S KITCHEN (dressed from 'kitchen'): phone with 401(k) app, cat, coffee, letters, notebook ================= */
  kitchen9() { const s = SETB.kitchen(); const { S } = s; const z0 = s.z0; ['flyer', 'r1', 'r2', 'bowl'].forEach(k => { if (s[k]) s[k].visible = false; });
    const TZ = z0 + 1.9, TY = 0.785;
    { const w = new THREE.Vector3(); S.children.forEach(o => { o.getWorldPosition(w); if (o.type === 'Group' && Math.abs(w.x - 0.55) < 0.1 && Math.abs(w.z - (z0 + 1.75)) < 0.1) o.visible = false; }); }
    const phone = P9.phone((x, w, h, o) => { o = o || {}; x.fillStyle = '#f4f4f0'; x.fillRect(0, 0, w, h); x.fillStyle = '#2f4d6b'; x.fillRect(0, 0, w, h * 0.14); ltxt(x, 'MY 401(k)', w / 2, h * 0.07, h * 0.06, '#fff', 'center');
      const red = o.mode === 'red', col = red ? RED9 : GRN9; ltxt(x, o.bal || '$84,210', w / 2, h * 0.28, h * 0.11, INK, 'center'); ltxt(x, o.chg || (red ? '-6.2% today' : '+0.4% today'), w / 2, h * 0.38, h * 0.06, col, 'center');
      x.strokeStyle = col; x.lineWidth = 8; x.beginPath(); for (let i = 0; i <= 20; i++) { const k = i / 20; const y = red ? h * (0.5 + 0.28 * Math.pow(k, 1.6)) + Math.sin(i * 1.7) * h * 0.015 : h * (0.75 - 0.2 * k) + Math.sin(i * 1.9) * h * 0.02; i ? x.lineTo(w * (0.08 + 0.84 * k), y) : x.moveTo(w * 0.08, y); } x.stroke();
      if (o.folder) { x.fillStyle = 'rgba(30,30,40,0.92)'; x.fillRect(0, 0, w, h); x.fillStyle = '#e8e2d0'; x.fillRect(w * 0.18, h * 0.3, w * 0.64, h * 0.36); ltxt(x, 'ONCE A', w / 2, h * 0.42, h * 0.07, INK, 'center'); ltxt(x, 'MONTH', w / 2, h * 0.52, h * 0.07, INK, 'center'); } });
    phone.position.set(0.05, TY, TZ + 0.22); phone.rotation.y = 0.2; S.add(phone);
    const mug = at(P3.mug(0xf2ead8), 0.45, TY, TZ + 0.2); S.add(mug);
    const cat = P9.cat(); cat.position.set(0.6, TY, TZ - 0.15); cat.rotation.y = 0.4; S.add(cat);
    const spoon = box(0.12, 0.008, 0.02, std(0xc8c8c8, { metalness: 0.9, roughness: 0.2 }), 0, 0, 0); spoon.position.set(-0.05, TY + 0.005, TZ - 0.05); S.add(spoon);
    const letter = board(0.24, 0.32, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#f6efe0'); x.fillStyle = '#2f4d6b'; x.fillRect(0, 0, w, h * 0.12); ltxt(x, o.title || 'MORTGAGE RENEWAL', w / 2, h * 0.06, h * 0.05, '#fff', 'center');
      ltxt(x, 'new rate', w * 0.1, h * 0.3, h * 0.06, '#5a4a3a'); ltxt(x, o.rate || '7.1%', w * 0.9, h * 0.3, h * 0.09, RED9, 'right'); x.strokeStyle = RED9; x.lineWidth = 5; x.beginPath(); x.ellipse(w * 0.75, h * 0.3, w * 0.2, h * 0.07, 0, 0, TAU); x.stroke();
      x.strokeStyle = 'rgba(30,22,18,0.25)'; x.lineWidth = 2; for (let y = h * 0.45; y < h * 0.92; y += h * 0.05) { x.beginPath(); x.moveTo(w * 0.1, y); x.lineTo(w * 0.9, y); x.stroke(); } });
    flat(letter, TY + 0.003); letter.position.set(0.55, TY + 0.003, TZ - 0.12); letter.rotation.z = -0.2; letter.visible = false; S.add(letter);
    const letter2 = board(0.22, 0.28, (x, w, h) => { paperBg(x, w, h, '#f6efe0'); x.fillStyle = '#7a4a6b'; x.fillRect(0, 0, w, h * 0.12); ltxt(x, 'CAR LOAN QUOTE', w / 2, h * 0.06, h * 0.06, '#fff', 'center'); ltxt(x, 'APR', w * 0.1, h * 0.32, h * 0.07, '#5a4a3a'); ltxt(x, '9.4%', w * 0.9, h * 0.32, h * 0.1, RED9, 'right'); x.strokeStyle = RED9; x.lineWidth = 5; x.beginPath(); x.ellipse(w * 0.76, h * 0.32, w * 0.2, h * 0.08, 0, 0, TAU); x.stroke(); });
    flat(letter2, TY + 0.004); letter2.position.set(-0.05, TY + 0.004, TZ - 0.02); letter2.rotation.z = 0.25; letter2.visible = false; S.add(letter2);
    const note = board(0.26, 0.34, (x, w, h, o) => { o = o || {}; paperBg(x, w, h, '#fbf6e8'); x.strokeStyle = 'rgba(80,120,180,0.35)'; x.lineWidth = 2; for (let y = h * 0.12; y < h; y += h * 0.07) { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }
      const L = ['1. Know what you own', '2. Cash for emergencies', '3. Careful with leverage', '4. Check variable rates', '5. Don\'t panic-sell']; L.slice(0, o.n || 0).forEach((l, i) => ltxt(x, l, w * 0.06, h * (0.16 + i * 0.14), h * 0.062, INK)); });
    flat(note, TY + 0.003); note.position.set(0.3, TY + 0.003, TZ + 0.05); note.visible = false; S.add(note);
    const fruit = group(); fruit.add(cyl(0.11, 0.08, 0.06, std(0xe8e0cc, { roughness: 0.3 })), sph(0.05, std(0xe3a33a), 0.02, 0.07, 0)); fruit.position.set(0.38, TY, TZ - 0.42); S.add(shadowy(fruit)); fruit.visible = false;
    const clock = P3.clockWall(0.22); clock.position.set(-1.2, 2.3, z0 + 0.04); S.add(clock);
    const cal = board(0.4, 0.5, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f6efe0'; x.fillRect(0, 0, w, h); x.fillStyle = RED9; x.fillRect(0, 0, w, h * 0.22); ltxt(x, o.m || 'AUGUST', w / 2, h * 0.11, h * 0.1, '#fff', 'center'); ltxt(x, o.d || '5', w / 2, h * 0.55, h * 0.32, INK, 'center'); ltxt(x, o.y || '2024', w / 2, h * 0.85, h * 0.1, '#5a4a3a', 'center'); });
    cal.position.set(2.3, 1.8, z0 + 0.03); S.add(cal);
    const morning = new THREE.PointLight(0xffd8a0, 2.2, 5); morning.position.set(1.2, 1.9, z0 + 0.8); S.add(morning);
    return Object.assign(s, { TZ, TY, phone, mug, cat, spoon, letter, letter2, note, fruit, clock, cal });
  },

  /* ================= TOKYO LENDING-WINDOW STREET: wooden kiosk 'LOANS 0%', brass rate dial, station stock board, lanterns, vending machine ================= */
  tokyo9() { const { S, C } = scene(0x2a2240, [16, 40]); skyDome(S, '#2a2a5a', '#e89a6a'); S.add(new THREE.HemisphereLight(0xffd8b8, 0x2a2030, 0.75)); S.add(new THREE.AmbientLight(0x4a3a4a, 0.5));
    const asph = ctex('asph9', 512, 512, (x, w, h, r) => { x.fillStyle = '#4a4648'; x.fillRect(0, 0, w, h); for (let i = 0; i < 3000; i++) { x.fillStyle = `rgba(${r() < 0.5 ? '30,30,34' : '110,104,100'},${0.15 + r() * 0.25})`; x.fillRect(r() * w, r() * h, 2, 2); } }, [10, 10]);
    S.add(plane(40, 30, tmat(asph, { roughness: 0.9 }), 0, 0, -6, -Math.PI / 2));
    const walk = ctex('walk9', 512, 256, (x, w, h, r) => { x.fillStyle = '#b8b0a4'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a8278'; x.lineWidth = 3; for (let i = 0; i < w; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } x.beginPath(); x.moveTo(0, h / 2); x.lineTo(w, h / 2); x.stroke(); }, [8, 2]);
    S.add(box(22, 0.1, 3.4, tmat(walk, { roughness: 0.85 }), 0, 0.05, -4.3));
    const back = poster(40, 14, (x, w, h) => tokyoBack(x, w, h, 5), true); back.position.set(0, 6.5, -16); S.add(back);
    // shopfront row behind the kiosk
    const wood = tmat(TX.wood('#6a4428', [2, 1], 'tk9'), { roughness: 0.6 }), dark = tmat(TX.wood('#3a2418', [2, 1], 'tk9d'), { roughness: 0.6 });
    for (let i = -3; i <= 3; i++) { const fx = i * 3.2; const col = [0x8a8278, 0x6a5a4a, 0x9a8a70, 0x7a6a5a][(i + 3) % 4]; S.add(rbox(3.1, 4.2, 0.6, 0.02, std(col, { roughness: 0.85 }), fx, 0, -6.4));
      const win = poster(2.2, 1.1, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#ffd890'); g.addColorStop(1, '#e8a060'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(60,40,30,0.5)'; for (let k = 1; k < 4; k++) x.fillRect(k * w / 4 - 2, 0, 4, h); }, true); win.position.set(fx, 2.9, -6.08); S.add(win);
      const awn = box(2.8, 0.06, 0.9, std([0xc2372d, 0x2f4d6b, 0x3f6a4a][(i + 3) % 3], { roughness: 0.7 }), fx, 2.25, -5.7); awn.rotation.x = 0.25; S.add(awn); }
    // kiosk
    const KX = 0.6, KZ = -3.6; const kiosk = group(rbox(2.4, 1.0, 0.9, 0.02, wood, 0, 0, 0), rbox(2.5, 0.06, 1.0, 0.01, dark, 0, 1.0, 0.02), box(0.08, 2.4, 0.08, dark, -1.18, 0, 0.42), box(0.08, 2.4, 0.08, dark, 1.18, 0, 0.42), box(2.6, 0.12, 1.2, dark, 0, 2.4, 0.1));
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 1.7, 0.6, 4, 1), std(0x2a2a2a, { roughness: 0.6 })); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.55); roof.position.set(0, 2.75, 0.1); kiosk.add(roof);
    kiosk.add(box(2.4, 2.2, 0.06, dark, 0, 1.1, -0.45));
    const noren = board(2.2, 0.55, (x, w, h) => { for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#2f4d6b' : '#26405a'; x.fillRect(i * w / 5 + 2, 0, w / 5 - 4, h); } ltxt(x, 'YEN LENDING', w / 2, h * 0.5, h * 0.42, '#f4efe6', 'center'); }); noren.position.set(0, 2.05, 0.47); kiosk.add(noren);
    const sign = board(1.0, 0.5, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); x.strokeStyle = INK; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, o.l1 || 'LOANS', w / 2, h * 0.32, h * 0.24, INK, 'center'); ltxt(x, o.l2 || '0%', w / 2, h * 0.7, h * 0.38, o.col || RED9, 'center'); });
    sign.position.set(-0.7, 0.55, 0.475); kiosk.add(sign);
    const sign2 = board(0.9, 0.5, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); x.strokeStyle = INK; x.lineWidth = 8; x.strokeRect(6, 6, w - 12, h - 12); ltxt(x, 'JAPAN BONDS', w / 2, h * 0.32, h * 0.2, INK, 'center'); ltxt(x, '3%', w / 2, h * 0.7, h * 0.36, GRN9, 'center'); }); sign2.position.set(0.7, 0.55, 0.475); sign2.visible = false; kiosk.add(sign2);
    const cal = board(0.45, 0.55, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f6efe0'; x.fillRect(0, 0, w, h); x.fillStyle = RED9; x.fillRect(0, 0, w, h * 0.25); ltxt(x, 'YEAR', w / 2, h * 0.12, h * 0.12, '#fff', 'center'); ltxt(x, o.y || '2016', w / 2, h * 0.6, h * 0.26, INK, 'center'); }); cal.position.set(0.85, 1.65, -0.41); kiosk.add(cal);
    const kettle = group(sph(0.1, std(0x3a3a3a, { metalness: 0.6, roughness: 0.3 }), 0, 0.1, 0), cyl(0.012, 0.02, 0.12, std(0x3a3a3a), 0.11, 0.12, 0)); kettle.children[0].scale.set(1, 0.85, 1); kettle.children[1].rotation.z = -0.9; kettle.position.set(0.55, 1.03, 0.2); kiosk.add(kettle);
    const cup = cyl(0.04, 0.035, 0.07, std(0xe8e0cc, { roughness: 0.4 }), 0.25, 1.03, 0.25); kiosk.add(cup);
    const ptag = board(0.36, 0.14, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, o.t || YEN + '300', w / 2, h / 2, h * 0.6, RED9, 'center'); }); ptag.position.set(0.55, 1.28, 0.28); ptag.visible = false; kiosk.add(ptag);
    kiosk.position.set(KX, 0.1, KZ); S.add(shadowy(kiosk));
    const kl = new THREE.PointLight(0xffd8a0, 4, 4.5); kl.position.set(KX, 2.2, KZ + 0.9); S.add(kl);
    // dial on a little stand, left of kiosk
    const dial = rateDial(); dial.position.set(-1.7, 0.1, KZ + 0.4); S.add(dial);
    // station stock board on a pillar, far left
    const pil = rbox(0.4, 4.4, 0.4, 0.02, std(0x7a7a7a, { roughness: 0.7 }), -4.2, 0, -5.2); S.add(pil);
    const sb = stockBoard(2.8, 1.5); sb.position.set(-4.2, 3.2, -4.95); S.add(sb, box(2.95, 1.65, 0.08, std(0x111111), -4.2, 3.2, -5.0));
    sb.userData.draw({ rows: [['NIKKEI 225', '+0.3%', GRN9], ['TOPIX', '+0.2%', GRN9], ['USD/JPY', '155.10']] });
    // lanterns, vending, poles, wires
    for (let i = -2; i <= 3; i++) { const l = P9.lantern(0xe8503a); l.position.set(i * 1.6 + 0.6, 2.75, -4.9); S.add(l); }
    const vend = P9.vending(); vend.position.set(3.4, 0.1, -4.6); S.add(vend);
    for (const px of [-6.5, 6.5]) S.add(at(P9.pole(6), px, 0, -4.9));
    const wire = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(-6.5, 5.6, -4.9), V3(0, 4.9, -4.9), V3(6.5, 5.6, -4.9)]), 30, 0.012, 4), std(0x111111)); S.add(wire);
    // energy props for Y24 (pump + meter), hidden by default
    const pump = group(rbox(0.6, 1.5, 0.4, 0.04, std(0xc2372d, { roughness: 0.5 }), 0, 0, 0)); const pd = board(0.44, 0.34, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); ltxt(x, 'FUEL', w / 2, h * 0.2, h * 0.14, '#ffcc4a', 'center'); ltxt(x, YEN + (o.v || 160), w / 2, h * 0.62, h * 0.32, '#ff7a4a', 'center'); }, true); pd.position.set(0, 1.12, 0.205); pump.add(pd); pump.position.set(3.2, 0.1, -2.8); pump.rotation.y = -0.5; S.add(shadowy(pump)); pump.visible = false;
    const meter = group(rbox(0.5, 0.6, 0.18, 0.03, std(0xd8d8d0, { roughness: 0.5 }), 0, 0, 0)); const md = board(0.38, 0.22, (x, w, h, o) => { o = o || {}; x.fillStyle = '#d8eef8'; x.fillRect(0, 0, w, h); ltxt(x, 'POWER', w / 2, h * 0.22, h * 0.18, INK, 'center'); ltxt(x, YEN + (o.v || 9800), w / 2, h * 0.65, h * 0.35, RED9, 'center'); }); md.position.set(0, 0.35, 0.095); meter.add(md); meter.position.set(-3.0, 1.2, -6.08); S.add(meter); meter.visible = false;
    const queue = []; for (let i = 0; i < 4; i++) { const q = at(P9.suitcase(0x7a5a3a, YEN), 1.9 + i * 0.55, 0.1, -2.6, 0); q.visible = false; S.add(q); queue.push(q); }
    keyLight(S, 0xffe0b8, 26, [2.5, 4.8, 2.5], [0.4, 1, KZ], 0.6, true); keyLight(S, 0xffc890, 12, [-4, 4, 0], [-2.5, 1, KZ], 0.5, false); dust(S, 0, 2, -3.5, 8, 2.5, 3, 60);
    return { S, C, KX, KZ, kiosk, sign, sign2, cal, kettle, cup, ptag, dial, sb, pump, pd, meter, md, queue };
  },

  /* ================= PACIFIC MAP TABLE + RUBBER BAND ================= */
  band9() { const { S, C } = scene(0x0d0a08, [10, 24]); S.add(new THREE.AmbientLight(0x4a3a2c, 0.55)); S.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2018, 0.45));
    const z0 = roomShell(S, { w: 12, d: 9, h: 3.8, wall: TX.wall('#3a3a44', '#2e2e36', [5, 1]), floor: TX.wood('#3a2a1e', [5, 4]), right: true });
    const TZ = z0 + 4.2, TH = 0.92, TW = 4.6, TD = 2.6;
    const tw = tmat(TX.wood('#4a2e1c', [2, 1], 'mt9'), { roughness: 0.5 }); S.add(rbox(TW + 0.3, 0.12, TD + 0.3, 0.03, tw, 0, TH - 0.12, TZ)); for (const [x, z] of [[-TW / 2, -TD / 2], [TW / 2, -TD / 2], [-TW / 2, TD / 2], [TW / 2, TD / 2]]) S.add(box(0.14, TH - 0.12, 0.14, tw, x, (TH - 0.12) / 2, TZ + z));
    // map: Pacific-centred, Japan left, North America right
    const MAPW = TW, MAPD = TD; const map = board(MAPW, MAPD, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9cc2c8'); g.addColorStop(1, '#7fa8b2'); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 2; for (let i = 1; i < 12; i++) { x.beginPath(); x.moveTo(i * w / 12, 0); x.lineTo(i * w / 12, h); x.stroke(); } for (let i = 1; i < 7; i++) { x.beginPath(); x.moveTo(0, i * h / 7); x.lineTo(w, i * h / 7); x.stroke(); }
      const land = (pts, col) => { x.fillStyle = col || '#e8d8a8'; x.strokeStyle = '#6a5a3a'; x.lineWidth = 5; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a * w, b * h) : x.moveTo(a * w, b * h)); x.closePath(); x.fill(); x.stroke(); };
      land([[0, 0.05], [0.12, 0.08], [0.16, 0.2], [0.1, 0.36], [0.13, 0.5], [0.06, 0.62], [0, 0.6]]); // Asia coast
      land([[0.17, 0.3], [0.2, 0.26], [0.22, 0.33], [0.2, 0.44], [0.17, 0.52], [0.14, 0.5], [0.17, 0.42]], '#f0dcae'); // Japan
      land([[0.215, 0.18], [0.24, 0.16], [0.245, 0.24], [0.225, 0.26]], '#f0dcae');
      land([[0.66, 0.0], [0.86, 0.02], [1, 0.0], [1, 0.75], [0.95, 0.72], [0.9, 0.62], [0.8, 0.68], [0.74, 0.6], [0.7, 0.45], [0.68, 0.3], [0.62, 0.16]]); // North America
      land([[0.82, 0.78], [0.86, 0.74], [0.9, 0.8], [0.88, 1], [0.8, 1]]);
      ltxt(x, 'PACIFIC OCEAN', w * 0.45, h * 0.62, h * 0.06, 'rgba(30,50,70,0.6)', 'center'); ltxt(x, 'JAPAN', w * 0.2, h * 0.58, h * 0.05, INK, 'center'); ltxt(x, 'U.S.A.', w * 0.84, h * 0.4, h * 0.07, INK, 'center');
      x.fillStyle = 'rgba(80,60,30,0.08)'; for (let i = 0; i < 200; i++) x.fillRect((i * 97) % w, (i * 61) % h, 4, 3); });
    flat(map, TH + 0.002); map.position.z = TZ; S.add(map);
    const mx = (u) => -MAPW / 2 + u * MAPW, mz = (v) => TZ - MAPD / 2 + v * MAPD;
    const TOK = V3(mx(0.2), TH, mz(0.38)), NYC = V3(mx(0.93), TH, mz(0.42));
    const pin = (p, col, lab) => { const g = group(cyl(0.015, 0.015, 0.3, std(0x888888, { metalness: 0.9 }), 0, 0, 0), sph(0.06, std(col, { roughness: 0.3 }), 0, 0.3, 0)); g.position.copy(p); S.add(shadowy(g)); const t = board(0.7, 0.18, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(2, 2, w - 4, h - 4); ltxt(x, lab, w / 2, h / 2, h * 0.55, INK, 'center'); }); t.position.set(p.x, TH + 0.5, p.z); S.add(t); return t; };
    const tTok = pin(TOK, 0xc2372d, 'TOKYO'), tNy = pin(NYC, 0x2f4d6b, 'NEW YORK');
    // rubber band: a tube from Tokyo to New York; bandSet(stretch 0..1, snap 0..1, twang amp, t)
    const bandM = std(0xc8322a, { roughness: 0.45 }); let bandMesh = null;
    const bandSet = (st, snap, tw, t) => { st = clamp(st, 0, 1); snap = clamp(snap || 0, 0, 1); const len = lerp(0.35, 1, st) * (1 - snap * 0.9); const end = V3(lerp(TOK.x, NYC.x, len), TH + 0.3, lerp(TOK.z, NYC.z, len)); const n = 9, pts = [];
      for (let i = 0; i <= n; i++) { const k = i / n; const wob = (tw || 0) * Math.sin(k * Math.PI) * Math.sin((t || 0) * 30 + k * 6) * 0.12 + snap * Math.sin(k * Math.PI * 3 + (t || 0) * 40) * 0.08 * (1 - snap); pts.push(V3(lerp(TOK.x, end.x, k), TH + 0.3 + Math.sin(k * Math.PI) * 0.08 * (1 - st) + wob * 0.5, lerp(TOK.z, end.z, k) + wob)); }
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, lerp(0.05, 0.022, st), 8); if (bandMesh) { bandMesh.geometry.dispose(); bandMesh.geometry = geo; } else { bandMesh = new THREE.Mesh(geo, bandM); bandMesh.castShadow = true; S.add(bandMesh); } return end; };
    bandSet(0.2, 0, 0, 0);
    // model towers that topple: NY stocks, Tokyo stocks, bitcoin
    const tower = (lab, col, n) => { const g = group(); for (let i = 0; i < n; i++) g.add(rbox(0.22, 0.1, 0.22, 0.01, std(i % 2 ? col : 0xf2ead8, { roughness: 0.5 }), 0, i * 0.1, 0)); const t = board(0.42, 0.14, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, lab, w / 2, h / 2, h * 0.6, INK, 'center'); }); t.position.set(0, n * 0.1 + 0.12, 0); g.add(t); g.userData.t = t; return shadowy(g); };
    const towers = [tower('S&P 500', 0x3f9b5f, 7), tower('NASDAQ', 0x2f4d6b, 8), tower('NIKKEI', 0xc2372d, 6), tower('BITCOIN', 0xe3a33a, 5)];
    const TP = [[mx(0.8), mz(0.6)], [mx(0.88), mz(0.66)], [mx(0.26), mz(0.66)], [mx(0.55), mz(0.8)]]; towers.forEach((g, i) => { g.position.set(TP[i][0], TH, TP[i][1]); S.add(g); });
    const topple = (i, k) => { const g = towers[i]; g.rotation.z = (i === 2 ? 1 : -1) * 1.45 * E(clamp(k, 0, 1)); g.position.y = TH + 0.05 * Math.sin(Math.PI * clamp(k, 0, 1)); };
    // tape measure (Dot) + little lights for Y36
    const lights = ['TOKYO', 'NEW YORK', 'YOUR 401(k)'].map((l, i) => { const b = sph(0.05, basic(0xffd36a), 0, 0, 0); S.add(b); b.visible = false; return b; });
    const hats = P8.goldBar ? null : null;
    const lampG = P3.pendant(0x2a3a2a); lampG.position.set(0, 3.4, TZ); S.add(lampG);
    const wallMap = P3.frame(2.2, 1.2, (x, w, h) => { x.fillStyle = '#e8d8b0'; x.fillRect(0, 0, w, h); x.strokeStyle = '#6a5a3a'; x.lineWidth = 4; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(w / 2, h * 1.3, w * (0.2 + i * 0.08), Math.PI * 1.15, Math.PI * 1.85); x.stroke(); } ltxt(x, 'CURRENTS OF MONEY', w / 2, h * 0.12, h * 0.1, INK, 'center'); }); wallMap.position.set(-2.6, 2.2, z0 + 0.04); S.add(wallMap);
    const clk = P3.clockWall(0.28); clk.position.set(2.8, 2.5, z0 + 0.04); S.add(clk);
    S.add(at(P3.shelf ? P3.shelf() : group(), 4.2, 0, z0 + 0.3)); S.add(at(P3.plant(), -4.5, 0, z0 + 0.6));
    keyLight(S, 0xffe2b8, 46, [0, 3.6, TZ + 1.0], [0, TH, TZ], 0.75, true); for (const sx of [-1, 1]) { const fl = new THREE.PointLight(0xffd8a8, 2.4, 4.5, 1.7); fl.position.set(sx * 3.0, 2.0, TZ - 0.6); S.add(fl); } beam(S, [0, 3.6, TZ], [0, TH, TZ], 1.6, 0xffe2b0, 0.03); dust(S, 0, 1.8, TZ, 5, 1.5, 3, 80);
    return { S, C, z0, TZ, TH, TOK, NYC, bandSet, towers, topple, lights, mx, mz, tTok, tNy, clk };
  },

  /* ================= NEW YORK TRADING FLOOR (dressed from 'trading'): FX booth, suitcases, hotline, yen light, rate-gap board ================= */
  wall9() { const s = SETB.trading(); const { S } = s; const z0 = s.z0;
    const booth = group(rbox(1.4, 1.1, 0.7, 0.03, tmat(TX.wood('#2f4d6b', [1, 1], 'fx9'), { roughness: 0.5 }), 0, 0, 0), box(1.5, 0.06, 0.8, std(0xc9a24a, { metalness: 0.8, roughness: 0.3 }), 0, 1.1, 0), box(0.06, 1.0, 0.06, std(0xc9a24a, { metalness: 0.8 }), -0.68, 1.1, 0.3), box(0.06, 1.0, 0.06, std(0xc9a24a, { metalness: 0.8 }), 0.68, 1.1, 0.3));
    const bs = board(1.4, 0.36, (x, w, h) => { x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h); ltxt(x, YEN + '  ⇄  $   EXCHANGE', w / 2, h / 2, h * 0.5, '#f4efe6', 'center'); }, true); bs.position.set(0, 2.15, 0.3); booth.add(bs);
    booth.position.set(4.6, 0, z0 + 3.4); booth.rotation.y = -0.5; S.add(shadowy(booth));
    const caseY = at(P9.suitcase(0x8a2a22, YEN + ' YEN'), 0, 0, 0), caseD = at(P9.suitcase(0x3f6a4a, '$ DOLLARS'), 0, 0, 0); S.add(caseY, caseD); caseY.visible = caseD.visible = false;
    const hot = group(rbox(0.22, 0.09, 0.2, 0.03, std(0xc2372d, { roughness: 0.3 }), 0, 0, 0), rbox(0.24, 0.05, 0.07, 0.02, std(0xc2372d, { roughness: 0.3 }), 0, 0.1, 0)); const hl = board(0.2, 0.06, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, 'WASHINGTON', w / 2, h / 2, h * 0.6, INK, 'center'); }); hl.position.set(0, 0.05, 0.101); hot.add(hl); hot.position.set(0.55, 0.8, z0 + 2.75); S.add(shadowy(hot)); hot.visible = false;
    const warn = group(cyl(0.05, 0.06, 0.04, std(0x222222), 0, 0, 0)); const bulb = sph(0.05, basic(0xff3a2a), 0, 0.05, 0); warn.add(bulb); const wl = board(0.18, 0.06, (x, w, h) => { x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, 'YEN', w / 2, h / 2, h * 0.7, INK, 'center'); }); wl.position.set(0, -0.01, 0.07); warn.add(wl); warn.position.set(-0.8, 0.8, z0 + 2.8); S.add(warn); const wlight = new THREE.PointLight(0xff3a2a, 0, 1.2); wlight.position.set(-0.8, 0.95, z0 + 2.9); S.add(wlight);
    const gap = board(1.6, 1.1, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); ltxt(x, 'THE GAP', w / 2, h * 0.1, h * 0.09, '#ffcc4a', 'center'); const us = o.us == null ? 5.3 : o.us, jp = o.jp == null ? 0.1 : o.jp; const base = h * 0.85, sc = h * 0.11;
      x.fillStyle = '#3f6aa8'; x.fillRect(w * 0.18, base - us * sc, w * 0.24, us * sc); x.fillStyle = '#c2372d'; x.fillRect(w * 0.58, base - Math.max(jp, 0.05) * sc, w * 0.24, Math.max(jp, 0.05) * sc);
      ltxt(x, 'U.S. ' + us.toFixed(2) + '%', w * 0.3, base + h * 0.07, h * 0.06, '#e8e2d0', 'center'); ltxt(x, 'JAPAN ' + jp.toFixed(2) + '%', w * 0.7, base + h * 0.07, h * 0.06, '#e8e2d0', 'center');
      x.strokeStyle = '#ffcc4a'; x.setLineDash([10, 8]); x.lineWidth = 4; x.beginPath(); x.moveTo(w * 0.3, base - us * sc); x.lineTo(w * 0.7, base - us * sc); x.moveTo(w * 0.7, base - us * sc); x.lineTo(w * 0.7, base - Math.max(jp, 0.05) * sc); x.stroke(); x.setLineDash([]); ltxt(x, (us - jp).toFixed(1) + ' pts', w * 0.86, base - (us + jp) / 2 * sc, h * 0.06, '#ffcc4a', 'center'); }, true);
    gap.position.set(-4.6, 2.4, z0 + 0.05); S.add(gap, box(1.7, 1.2, 0.05, std(0x111111), -4.6, 2.4, z0 + 0.02));
    const chair = P2chair(); chair.position.set(0, 0, z0 + 3.4); chair.rotation.y = Math.PI; S.add(chair); chair.visible = false;
    return Object.assign(s, { booth, caseY, caseD, hot, warn, bulb, wlight, gap, chair });
  },

  /* ================= BROKER BACK OFFICE: velvet ropes, counter with coin stacks, 10 TO 1 sign, chalkboard math, door, fire-sale table ================= */
  margin9() { const { S, C } = scene(0x0d0a08, [10, 22]); S.add(new THREE.AmbientLight(0x4a3a2c, 0.6)); S.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2018, 0.4));
    const z0 = roomShell(S, { w: 11, d: 8, h: 3.6, wall: TX.wall('#5a2a2a', '#4a2222', [4, 1]), floor: TX.tile('#e8e0d0', '#2a2622', [6, 6]), right: true, trim: 0x2a1c14 });
    const wd = tmat(TX.wood('#4a2e1c', [3, 1], 'brk9'), { roughness: 0.45 }); const CZ = z0 + 1.6;
    S.add(rbox(4.4, 1.05, 0.7, 0.02, wd, -0.6, 0, CZ), rbox(4.5, 0.06, 0.8, 0.01, std(0x2a2a2a, { metalness: 0.5, roughness: 0.3 }), -0.6, 1.05, CZ));
    S.add(box(4.4, 1.3, 0.04, std(0xc9a24a, { metalness: 0.8, roughness: 0.35, transparent: true, opacity: 0.25 }), -0.6, 1.75, CZ - 0.1));
    for (let i = 0; i < 5; i++) S.add(box(0.03, 1.3, 0.03, std(0xc9a24a, { metalness: 0.9 }), -2.7 + i * 1.05, 1.75, CZ - 0.08));
    const sign = board(1.4, 0.6, (x, w, h) => { x.fillStyle = '#1a1410'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c9a24a'; x.lineWidth = 10; x.strokeRect(8, 8, w - 16, h - 16); ltxt(x, 'LEVERAGE', w / 2, h * 0.3, h * 0.2, '#e3c77a', 'center'); ltxt(x, '10 TO 1', w / 2, h * 0.68, h * 0.34, '#f4efe6', 'center'); }, true); sign.position.set(-0.6, 2.85, z0 + 0.04); S.add(sign);
    const own = coinStack(1, 0.12, 0xe0b84a); own.position.set(-1.0, 1.08, CZ + 0.25); S.add(own);
    const big = []; for (let i = 0; i < 10; i++) { const c = coinStack(1, 0.12, 0xd8b050); c.position.set(-0.4 + (i % 5) * 0.28, 1.08 + Math.floor(i / 5) * 0.0, CZ + 0.15 + Math.floor(i / 5) * 0.28); c.visible = false; S.add(c); big.push(c); }
    const coinL = board(0.5, 0.16, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, o.t || 'YOU: $1,000', w / 2, h / 2, h * 0.55, INK, 'center'); }); coinL.position.set(-1.0, 1.4, CZ + 0.3); S.add(coinL);
    const bigL = board(0.7, 0.16, (x, w, h, o) => { o = o || {}; x.fillStyle = '#f3e7cc'; x.fillRect(0, 0, w, h); ltxt(x, o.t || 'POSITION: $10,000', w / 2, h / 2, h * 0.5, INK, 'center'); }); bigL.position.set(0.15, 1.45, CZ + 0.3); bigL.visible = false; S.add(bigL);
    // chalkboard math
    const chalk = board(2.2, 1.4, (x, w, h, o) => { o = o || {}; x.fillStyle = '#1f2b24'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a6a46'; x.lineWidth = 16; x.strokeRect(8, 8, w - 16, h - 16); for (let i = 0; i < 300; i++) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect((i * 97) % w, (i * 53) % h, 3, 2); }
      ltxt(x, '$1,000 controls $10,000', w / 2, h * 0.14, h * 0.08, '#ece6d8', 'center');
      const rows = [['price +5%', '+$500', 'you +50%', '#9ae0a0'], ['price -5%', '-$500', 'you -50%', '#ff9a8a'], ['price -10%', '-$1,000', 'GONE', '#ff6a5a']];
      rows.slice(0, o.n || 0).forEach((r, i) => { const y = h * (0.38 + i * 0.2); ltxt(x, r[0], w * 0.08, y, h * 0.085, '#ece6d8'); ltxt(x, r[1], w * 0.52, y, h * 0.085, '#ece6d8', 'center'); ltxt(x, r[2], w * 0.92, y, h * 0.095, r[3], 'right'); }); });
    chalk.position.set(3.2, 1.9, z0 + 0.04); S.add(chalk, box(2.3, 1.5, 0.04, std(0x5a3a22), 3.2, 1.9, z0 + 0.01)); chalk.userData.draw({ n: 0 });
    // door (left wall) that opens
    const dpiv = group(); const door = rbox(1.0, 2.2, 0.06, 0.01, tmat(TX.wood('#3a2418', [1, 2], 'dr9'), { roughness: 0.5 }), 0.5, 0, 0); dpiv.add(door, sph(0.04, std(0xc9a24a, { metalness: 0.9 }), 0.88, 1.05, 0.05)); dpiv.position.set(-5.47, 0, z0 + 3.6); dpiv.rotation.y = Math.PI / 2; S.add(shadowy(dpiv));
    S.add(box(0.06, 2.35, 1.15, std(0x2a1c14), -5.47, 1.17, z0 + 3.1));
    // velvet ropes
    for (let i = 0; i < 4; i++) S.add(at(stanchion(1.0), -3 + i * 1.2, 0, z0 + 3.0)); for (let i = 0; i < 3; i++) S.add(rope(-3 + i * 1.2, -1.8 + i * 1.2, 0.9, z0 + 3.0, 0x8a1a2a));
    // fire-sale folding table (right)
    const ft = group(box(1.6, 0.04, 0.7, std(0xd8d0c0, { roughness: 0.6 }), 0, 0.74, 0)); for (const [a, b] of [[-0.75, -0.3], [0.75, -0.3], [-0.75, 0.3], [0.75, 0.3]]) ft.add(box(0.03, 0.74, 0.03, std(0x555555, { metalness: 0.6 }), a, 0.37, b));
    const certs = []; for (let i = 0; i < 6; i++) { const c = P9.folder(['NVDA', 'AAPL', 'MSFT', 'BTC', 'META', 'AMZN'][i]); c.position.set(-0.55 + (i % 3) * 0.55, 0.77 + Math.floor(i / 3) * 0.06, -0.1 + Math.floor(i / 3) * 0.2); ft.add(c); certs.push(c); }
    const sale = board(1.0, 0.36, (x, w, h, o) => { o = o || {}; x.fillStyle = '#c2372d'; x.fillRect(0, 0, w, h); ltxt(x, o.t || 'FIRE SALE', w / 2, h / 2, h * 0.55, '#fff', 'center'); }); sale.position.set(0, 1.25, -0.34); ft.add(sale, box(0.03, 0.5, 0.03, std(0x555555), -0.5, 1.0, -0.34), box(0.03, 0.5, 0.03, std(0x555555), 0.5, 1.0, -0.34));
    ft.position.set(3.0, 0, z0 + 3.5); ft.visible = false; S.add(shadowy(ft));
    const price = board(1.1, 0.7, (x, w, h, o) => { o = o || {}; x.fillStyle = '#0b0d10'; x.fillRect(0, 0, w, h); ltxt(x, 'PRICE', w / 2, h * 0.18, h * 0.14, '#ffcc4a', 'center'); ltxt(x, '$' + (o.v || 100), w / 2, h * 0.6, h * 0.36, o.v && o.v < 100 ? '#ff5a4a' : '#9ae0a0', 'center'); }, true); price.position.set(4.6, 2.4, z0 + 4.2); price.rotation.y = -Math.PI / 2; S.add(price, box(0.04, 0.8, 1.2, std(0x111111), 5.46, 2.4, z0 + 4.2));
    S.add(at(P3.clockWall(0.25), -3.6, 2.8, z0 + 0.04)); S.add(at(P3.plant(), -4.9, 0, z0 + 0.5));
    for (let i = 0; i < 3; i++) { const p = P3.pendant(0x2a3a2a); p.position.set(-2 + i * 2, 3.5, CZ + 1); S.add(p); }
    keyLight(S, 0xffe2b8, 40, [0, 3.5, z0 + 5], [0, 1, CZ], 0.75, true); keyLight(S, 0xffe2b8, 20, [3, 3.4, z0 + 3], [3, 1.6, z0], 0.5, false); dust(S, 0, 1.8, z0 + 3, 6, 2, 3, 70);
    return { S, C, z0, CZ, own, big, coinL, bigL, chalk, dpiv, ft, certs, sale, price };
  },

  /* ================= WASHINGTON DEBT-CLOCK HALL (dressed from 'hearing') ================= */
  capitol9() { const s = SETB.hearing(); const { S } = s; const z0 = s.z0;
    const clock = board(5.0, 1.0, (x, w, h, o) => { o = o || {}; x.fillStyle = '#07090c'; x.fillRect(0, 0, w, h); x.strokeStyle = '#c9a24a'; x.lineWidth = 10; x.strokeRect(5, 5, w - 10, h - 10); ltxt(x, 'U.S. NATIONAL DEBT', w / 2, h * 0.2, h * 0.13, '#ffcc4a', 'center');
      const v = o.v || 39998000000000; const str = '$' + Math.floor(v).toLocaleString('en-US'); ltxt(x, str, w / 2, h * 0.62, h * 0.42, '#ff6a4a', 'center'); }, true);
    clock.position.set(0, 3.75, z0 + 0.06); S.add(clock, box(5.2, 1.15, 0.06, std(0x111111), 0, 3.75, z0 + 0.02));
    const lad = P9.ladder(2.6); lad.position.set(2.4, 0, z0 + 0.9); lad.rotation.x = -0.12; S.add(lad); lad.visible = false;
    const b3 = board(1.8, 1.2, (x, w, h, o) => { o = o || {}; x.fillStyle = '#1f2b24'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a6a46'; x.lineWidth = 14; x.strokeRect(7, 7, w - 14, h - 14); ltxt(x, 'THE 3-3-3 PLAN', w / 2, h * 0.12, h * 0.1, '#ffe9a8', 'center');
      [['3% GROWTH', 0.3], ['3% DEFICIT', 0.5], ['+3M BARRELS', 0.7]].forEach(([l, y]) => ltxt(x, l, w * 0.08, h * y, h * 0.085, '#ece6d8'));
      if (o.bar) { const k = o.bar; x.fillStyle = '#9ae0a0'; x.fillRect(w * 0.62, h * 0.9 - h * 0.25, w * 0.1, h * 0.25); x.fillStyle = '#ff7a6a'; x.fillRect(w * 0.78, h * 0.9 - h * 0.5 * k, w * 0.1, h * 0.5 * k); ltxt(x, 'GOAL', w * 0.67, h * 0.95, h * 0.05, '#ece6d8', 'center'); ltxt(x, 'NOW ~6%', w * 0.83, h * 0.95, h * 0.05, '#ff9a8a', 'center'); } });
    const easel = group(box(0.05, 2.0, 0.05, std(0x5a3a22), -0.7, 1.0, 0), box(0.05, 2.0, 0.05, std(0x5a3a22), 0.7, 1.0, 0), box(1.6, 0.05, 0.1, std(0x5a3a22), 0, 0.9, 0.04)); b3.position.set(0, 1.6, 0.05); easel.add(b3); easel.position.set(-3.0, 0, z0 + 4.0); easel.rotation.y = 0.35; S.add(shadowy(easel)); easel.visible = false;
    return Object.assign(s, { clock, lad, b3, easel });
  },

  /* ================= CENTRAL-BANK VAULT (dressed from 'vault3'): dollar crates vs gold bars, Treasury folders + trolleys ================= */
  vault9() { const s = SETB.vault3(); const { S } = s; const z0 = s.z0; s.big.visible = false; s.piles.forEach(p => p.visible = false);
    const dollars = [], golds = []; const BX = -1.6, GX = 1.6, BZ = z0 + 3.0;
    for (let i = 0; i < 18; i++) { const c = P9.crate('$ USD', '#4a7a4a', 0.7); c.position.set(BX + ((i % 3) - 1) * 0.72, 0.21 + Math.floor(i / 3) * 0.43, BZ); S.add(c); dollars.push(c); }
    for (let i = 0; i < 60; i++) { const g = P8.goldBar(1.6); const row = Math.floor(i / 6), col = i % 6; g.position.set(GX + (col - 2.5) * 0.46, Math.floor(i / 12) * 0.1, BZ + (row % 2) * 0.26); S.add(g); golds.push(g); }
    const labD = board(1.4, 0.36, (x, w, h, o) => { o = o || {}; x.fillStyle = '#3f6a4a'; x.fillRect(0, 0, w, h); ltxt(x, o.t || 'DOLLARS 72%', w / 2, h / 2, h * 0.5, '#fff', 'center'); }); labD.position.set(BX, 3.3, BZ); S.add(labD);
    const labG = board(1.4, 0.36, (x, w, h, o) => { o = o || {}; x.fillStyle = '#c9a24a'; x.fillRect(0, 0, w, h); ltxt(x, o.t || 'GOLD', w / 2, h / 2, h * 0.5, INK, 'center'); }); labG.position.set(GX, 3.3, BZ); S.add(labG);
    const setStacks = (kd, kg) => { const nd = Math.round(lerp(6, 18, clamp(kd, 0, 1))); dollars.forEach((c, i) => c.visible = i < nd); const ng = Math.round(lerp(6, 60, clamp(kg, 0, 1))); golds.forEach((g, i) => g.visible = i < ng); };
    setStacks(1, 0.2);
    const tFolders = []; for (let i = 0; i < 2; i++) { const tr = P9.trolley(); for (let k = 0; k < 6; k++) { const f = P9.folder('US TREASURIES'); f.position.set(-0.2 + (k % 2) * 0.4, 0.3 + Math.floor(k / 2) * 0.07, 0); tr.add(f); } tr.position.set(-4 + i * 1.2, 0, z0 + 4.2); tr.visible = false; S.add(tr); tFolders.push(tr); }
    const safe = group(rbox(1.4, 1.8, 0.8, 0.04, std(0x6a6f76, { metalness: 0.8, roughness: 0.35 }), 0, 0, 0)); for (let r = 0; r < 3; r++) { const f = P9.folder('US TREASURIES'); f.rotation.x = Math.PI / 2; f.position.set(0, 0.4 + r * 0.45, 0.41); safe.add(f); } safe.position.set(-4.4, 0, z0 + 2.2); safe.visible = false; S.add(shadowy(safe));
    s.counter.userData.draw({ t: 'RESERVES VAULT' });
    return Object.assign(s, { dollars, golds, labD, labG, setStacks, tFolders, safe, BX, GX, BZ });
  },
});
