/* Finance with Stromi: hybrid engine (three.js 3D sets + rubber-hose 2D cast cards).
   Shared by every act. Everything is code: textures are painted on canvases, no stock assets. */
'use strict';
const W = 1280, H = 720;
const OUT = document.getElementById('out'), X = OUT.getContext('2d');
const HAND = '"Caveat Brush", "Comic Sans MS", cursive';
const E = RH.ease, lerp = RH.lerp, clamp = RH.clamp;
const k01 = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const outBack = t => { t = clamp(t, 0, 1); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const TAU = Math.PI * 2;
const CH = {}; for (const k in CAST) CH[k] = RH.character(CAST[k]);
CH.janitor = RH.character({ name: 'Janitor', skin: '#d9a073', hair: { style: 'bald' }, hat: { type: 'cap', color: '#4f5a63' }, top: { type: 'overalls', color: '#4f5a63', accent: '#b58a5a' }, legs: { color: '#4f5a63' }, nose: 'bulb' });
CH.cook = RH.character({ name: 'Cook', skin: '#efc193', hair: { style: 'slick', color: '#6b3b20' }, top: { type: 'tee', color: '#f2ead8', accent: '#c2372d', emblem: 'none' }, legs: { color: '#24303a' }, body: { shape: 'barrel' } });
CH.clerk = RH.character({ name: 'Clerk', skin: '#8e5a38', hair: { style: 'curls', color: '#1e1612' }, hat: { type: 'none' }, top: { type: 'tee', color: '#7a8a92', accent: '#24303a', emblem: 'none' }, legs: { color: '#24303a' }, tie: 'bow', tieColor: '#c2372d' });

const R = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
R.setSize(W, H); R.setPixelRatio(1); R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.45;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

/* ---------------- painted textures (detail, so nothing reads low-poly) ---------------- */
const TEXC = {};
function ctex(key, w, h, paint, rep) {
  if (TEXC[key]) return TEXC[key];
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); paint(x, w, h, RH.rng(key.length * 7 + w));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); }
  TEXC[key] = t; return t;
}
function noise(x, w, h, r, col, n, s, a) { x.fillStyle = col; for (let i = 0; i < n; i++) { x.globalAlpha = a * (0.4 + r()); x.fillRect(r() * w, r() * h, s * (0.5 + r()), s * (0.5 + r())); } x.globalAlpha = 1; }
const TX = {
  wood: (base, rep, key) => ctex('wood' + base + (key || ''), 512, 512, (x, w, h, r) => {
    x.fillStyle = base; x.fillRect(0, 0, w, h); const pl = 6;
    for (let p = 0; p < pl; p++) { const y0 = p * h / pl; x.fillStyle = RH.mix(base, p % 2 ? '#000000' : '#ffffff', 0.04 + r() * 0.05); x.fillRect(0, y0, w, h / pl);
      x.strokeStyle = 'rgba(30,15,5,0.35)'; x.lineWidth = 1; for (let g = 0; g < 9; g++) { x.beginPath(); const yy = y0 + r() * h / pl; x.moveTo(0, yy); for (let xx = 0; xx <= w; xx += 32) x.lineTo(xx, yy + Math.sin(xx * 0.02 + g) * 3 * r()); x.stroke(); }
      x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillRect(0, y0, w, 2); const j = r() * w; x.fillRect(j, y0, 2, h / pl); }
    noise(x, w, h, r, '#000', 900, 2, 0.06);
  }, rep),
  wall: (base, stripe, rep) => ctex('wall' + base + stripe, 512, 512, (x, w, h, r) => {
    x.fillStyle = base; x.fillRect(0, 0, w, h);
    if (stripe) { x.fillStyle = stripe; for (let i = 0; i < w; i += 64) { x.globalAlpha = 0.5; x.fillRect(i, 0, 22, h); x.globalAlpha = 0.25; x.fillRect(i + 30, 0, 4, h); } x.globalAlpha = 1; }
    for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.beginPath(); x.arc(r() * w, r() * h, 20 + r() * 60, 0, TAU); x.fill(); }
    noise(x, w, h, r, '#000', 1500, 2, 0.05);
  }, rep),
  brick: (base, rep) => ctex('brick' + base, 512, 512, (x, w, h, r) => {
    x.fillStyle = '#3a332e'; x.fillRect(0, 0, w, h); const bh = 32, bw = 96;
    for (let row = 0; row < h / bh; row++) for (let col = -1; col < w / bw + 1; col++) { const ox = (row % 2) * bw / 2; x.fillStyle = RH.mix(base, r() < 0.5 ? '#000000' : '#ffffff', r() * 0.18); x.fillRect(col * bw + ox + 3, row * bh + 3, bw - 6, bh - 6); }
    noise(x, w, h, r, '#000', 2500, 2, 0.12);
  }, rep),
  tile: (a, b, rep) => ctex('tile' + a + b, 512, 512, (x, w, h, r) => {
    const n = 8, s = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = (i + j) % 2 ? a : b; x.fillRect(i * s, j * s, s, s); }
    x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 2; for (let i = 0; i <= n; i++) { x.beginPath(); x.moveTo(i * s, 0); x.lineTo(i * s, h); x.stroke(); x.beginPath(); x.moveTo(0, i * s); x.lineTo(w, i * s); x.stroke(); }
    noise(x, w, h, r, '#000', 1200, 3, 0.05);
  }, rep),
  carpet: (base, rep) => ctex('carpet' + base, 256, 256, (x, w, h, r) => { x.fillStyle = base; x.fillRect(0, 0, w, h); noise(x, w, h, r, '#000', 4000, 1.5, 0.12); noise(x, w, h, r, '#fff', 2000, 1.5, 0.05); }, rep),
  concrete: (base, rep) => ctex('conc' + base, 512, 512, (x, w, h, r) => { x.fillStyle = base; x.fillRect(0, 0, w, h); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(0,0,0,${0.03 * r()})`; x.beginPath(); x.arc(r() * w, r() * h, 10 + r() * 80, 0, TAU); x.fill(); } noise(x, w, h, r, '#000', 3000, 2, 0.08); x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 2; x.strokeRect(0, 0, w, h); }, rep),
  paperDoc: (title, lines, key) => ctex('doc' + title + (key || ''), 512, 680, (x, w, h, r) => {
    x.fillStyle = '#f4ecd8'; x.fillRect(0, 0, w, h); noise(x, w, h, r, '#7a5a3a', 400, 3, 0.05);
    x.fillStyle = '#1e1612'; x.font = `48px ${HAND}`; x.textAlign = 'center'; x.fillText(title, w / 2, 80);
    x.font = `30px ${HAND}`; x.textAlign = 'left'; (lines || []).forEach((l, i) => x.fillText(l, 40, 150 + i * 46));
    x.strokeStyle = 'rgba(30,22,18,0.25)'; x.lineWidth = 2; for (let y = 150 + (lines || []).length * 46; y < h - 40; y += 30) { x.beginPath(); x.moveTo(40, y); x.lineTo(w - 40 - r() * 80, y); x.stroke(); }
  }),
};
const std = (c, o) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.75, metalness: 0 }, o || {}));
const tmat = (map, o) => new THREE.MeshStandardMaterial(Object.assign({ map, roughness: 0.8 }, o || {}));
const basic = (c, o) => new THREE.MeshBasicMaterial(Object.assign({ color: c }, o || {}));

/* ---------------- geometry helpers ---------------- */
function shadowy(m, cast, recv) { m.traverse(o => { if (o.isMesh) { o.castShadow = cast !== false; o.receiveShadow = recv !== false; } }); return m; }
function box(w, h, d, m, x, y, z, sh) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x || 0, y || 0, z || 0); if (sh !== false) { b.castShadow = true; b.receiveShadow = true; } return b; }
/* bevelled box: rounded edges catch the light, kills the low-poly look. y = bottom. */
const RBG = {};
function rbox(w, h, d, r, m, x, y, z) {
  const key = [w, h, d, r].join(',');
  if (!RBG[key]) { const bs = r * 0.6; w -= 2 * bs; h -= 2 * bs; const s = new THREE.Shape(); const rw = w / 2 - r, rh = h / 2 - r; s.moveTo(-rw, -h / 2); s.lineTo(rw, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -rh); s.lineTo(w / 2, rh); s.quadraticCurveTo(w / 2, h / 2, rw, h / 2); s.lineTo(-rw, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, rh); s.lineTo(-w / 2, -rh); s.quadraticCurveTo(-w / 2, -h / 2, -rw, -h / 2);
    const g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.001, d - 2 * r), bevelEnabled: true, bevelThickness: r, bevelSize: r * 0.6, bevelSegments: 3, curveSegments: 6 }); g.translate(0, h / 2 + bs, -(d - 2 * r) / 2); RBG[key] = g; w += 2 * bs; h += 2 * bs; }
  const b = new THREE.Mesh(RBG[key], m); b.position.set(x || 0, y || 0, z || 0); b.castShadow = b.receiveShadow = true; return b;
}
function cyl(rt, rb, h, m, x, y, z, seg) { const c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 32), m); c.position.set(x || 0, (y || 0) + h / 2, z || 0); c.castShadow = c.receiveShadow = true; return c; }
function sph(r, m, x, y, z) { const s = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20), m); s.position.set(x || 0, y || 0, z || 0); s.castShadow = s.receiveShadow = true; return s; }
function plane(w, h, m, x, y, z, rx, ry) { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.set(x || 0, y || 0, z || 0); p.rotation.set(rx || 0, ry || 0, 0); p.receiveShadow = true; return p; }
function group(...a) { const g = new THREE.Group(); a.forEach(o => o && g.add(o)); return g; }
function at(o, x, y, z, ry, s) { o.position.set(x, y, z); if (ry) o.rotation.y = ry; if (s) o.scale.setScalar(s); return o; }

/* ---------------- canvas planes (posters, screens, boards) ---------------- */
function canvasTex(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, x: c.getContext('2d'), t }; }
function poster(w, h, paint, lit) { const T = canvasTex(Math.round(256 * w / Math.max(w, h)) * 2, Math.round(256 * h / Math.max(w, h)) * 2); paint(T.x, T.c.width, T.c.height); T.t.needsUpdate = true; const m = lit ? basic(0xffffff, { map: T.t }) : tmat(T.t, { roughness: 0.9 }); const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.receiveShadow = !lit; p.userData.T = T; return p; }
function txt(x, s, px, py, size, col, align) { x.save(); x.font = `${size}px ${HAND}`; const mw = x.canvas.width * 0.92; const w = x.measureText(s).width; if (w > mw && (align || "center") === "center") x.font = `${size * mw / w}px ${HAND}`; x.fillStyle = col || "#1e1612"; x.textAlign = align || "center"; x.textBaseline = "middle"; x.fillText(s, px, py); x.restore(); }

/* ---------------- room shell with trims ---------------- */
function roomShell(S, o) {
  o = Object.assign({ w: 10, d: 8, h: 3.4, floor: TX.wood('#5a3a26', [3, 3]), wall: TX.wall('#3b302a', '#2e2520', [4, 1]), trim: 0x2a1c14, back: true, left: true, right: false, ceil: true }, o);
  const fm = tmat(o.floor, { roughness: 0.55 }); const wm = tmat(o.wall, { roughness: 0.95 }); const tm = std(o.trim, { roughness: 0.5 });
  S.add(plane(o.w, o.d, fm, 0, 0, -o.d / 2 + 2, -Math.PI / 2));
  const z0 = -o.d + 2;
  if (o.back) { S.add(plane(o.w, o.h, wm, 0, o.h / 2, z0)); S.add(box(o.w, 0.14, 0.04, tm, 0, 0.07, z0 + 0.02)); S.add(box(o.w, 0.1, 0.06, tm, 0, o.h - 0.05, z0 + 0.03)); S.add(box(o.w, 0.05, 0.03, tm, 0, 0.95, z0 + 0.015)); }
  if (o.left) { S.add(plane(o.d, o.h, wm, -o.w / 2, o.h / 2, z0 + o.d / 2, 0, Math.PI / 2)); S.add(box(0.04, 0.14, o.d, tm, -o.w / 2 + 0.02, 0.07, z0 + o.d / 2)); }
  if (o.right) { S.add(plane(o.d, o.h, wm, o.w / 2, o.h / 2, z0 + o.d / 2, 0, -Math.PI / 2)); S.add(box(0.04, 0.14, o.d, tm, o.w / 2 - 0.02, 0.07, z0 + o.d / 2)); }
  if (o.ceil) S.add(plane(o.w, o.d, std(0x0c0a09), 0, o.h, z0 + o.d / 2, Math.PI / 2));
  return z0;
}
function keyLight(S, col, inten, pos, tgt, angle, cast) {
  const l = new THREE.SpotLight(col, inten, 16, angle || 0.5, 0.6, 1.4); l.position.set(...pos); l.target.position.set(...tgt);
  if (cast !== false) { l.castShadow = true; l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.0008; l.shadow.radius = 4; }
  S.add(l); S.add(l.target); return l;
}
function beam(S, pos, tgt, r, col, op) { // fake volumetric cone
  const len = V3(...pos).distanceTo(V3(...tgt)); const g = new THREE.ConeGeometry(r, len, 40, 1, true); g.translate(0, -len / 2, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: col || 0xffe2b0, transparent: true, opacity: op || 0.06, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  m.position.set(...pos); m.lookAt(...tgt); m.rotateX(-Math.PI / 2); S.add(m); return m;
}
function dust(S, cx, cy, cz, sx, sy, sz, n, col) { // floating motes in the light
  const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3), r = RH.rng(n + Math.round(cx * 10));
  for (let i = 0; i < n; i++) { p[i * 3] = cx + (r() - 0.5) * sx; p[i * 3 + 1] = cy + (r() - 0.5) * sy; p[i * 3 + 2] = cz + (r() - 0.5) * sz; }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3)); const base = p.slice();
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: col || 0xffe8c0, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  S.add(pts); pts.userData.tick = t => { for (let i = 0; i < n; i++) { p[i * 3] = base[i * 3] + Math.sin(t * 0.3 + i) * 0.05; p[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 0.2 + i * 1.7) * 0.06; } g.attributes.position.needsUpdate = true; }; return pts;
}

/* ---------------- detailed props (all sit on y=0 unless noted; sizes in metres) ---------------- */
const P3 = {
  desk(w, d, wood) { const m = tmat(TX.wood(wood || '#5a3a26', [1, 1]), { roughness: 0.5 }), dk = std(0x2a1a10, { roughness: 0.6 }), brass = std(0xc9a24a, { metalness: 0.9, roughness: 0.3 });
    const g = group(rbox(w, 0.06, d, 0.015, m, 0, 0.74, 0));
    g.add(rbox(0.42, 0.7, d - 0.06, 0.01, m, -w / 2 + 0.24, 0.02, 0)); g.add(rbox(0.42, 0.7, d - 0.06, 0.01, m, w / 2 - 0.24, 0.02, 0));
    for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) { g.add(box(0.36, 0.2, 0.01, dk, sx * (w / 2 - 0.24), 0.14 + i * 0.22, d / 2 - 0.02)); g.add(box(0.08, 0.02, 0.02, brass, sx * (w / 2 - 0.24), 0.17 + i * 0.22, d / 2 + 0.005)); }
    g.add(box(w - 0.9, 0.5, 0.02, m, 0, 0.24, -d / 2 + 0.05)); g.userData.top = 0.8; return shadowy(g); },
  lamp(shadeCol) { const brass = std(0xc9a24a, { metalness: 0.9, roughness: 0.3 }); const g = group(cyl(0.09, 0.11, 0.03, brass), cyl(0.012, 0.012, 0.36, brass, 0, 0.03, 0));
    const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.16, 0.14, 32, 1, true), std(shadeCol || 0x2f5a3a, { side: THREE.DoubleSide, metalness: 0.2, roughness: 0.4 })); sh.position.y = 0.4; sh.castShadow = true; g.add(sh);
    g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 10), basic(0xfff1c8)), 0, 0.37, 0)); return g; },
  books(n, seed) { const r = RH.rng(seed || 3), g = group(); let x = 0; const cols = [0x7a2d22, 0x2f4d6b, 0x3f6b4f, 0xd9a23a, 0x6b3f5e, 0x24303a, 0x8a6a46];
    for (let i = 0; i < n; i++) { const w = 0.03 + r() * 0.03, h = 0.2 + r() * 0.08; const b = box(w, h, 0.16, std(cols[Math.floor(r() * cols.length)], { roughness: 0.7 }), x + w / 2, h / 2, 0); if (r() < 0.12) { b.rotation.z = 0.25; b.position.y += 0.01; b.position.x += 0.02; } g.add(b); x += w + 0.004; } g.userData.w = x; return g; },
  shelf(w, h, rows, seed) { const m = tmat(TX.wood('#4a2e1c', [1, 2]), { roughness: 0.6 }); const g = group(box(w, h, 0.04, m, 0, h / 2, -0.16), box(0.04, h, 0.34, m, -w / 2, h / 2, 0), box(0.04, h, 0.34, m, w / 2, h / 2, 0));
    for (let i = 0; i <= rows; i++) { const y = 0.05 + i * (h - 0.1) / rows; g.add(box(w, 0.03, 0.34, m, 0, y, 0)); if (i < rows) { const b = P3.books(Math.floor(w / 0.05), (seed || 1) + i); b.position.set(-w / 2 + 0.04, y + 0.015, 0); g.add(b); } } return shadowy(g); },
  chair(col) { const m = std(col || 0x3b2418, { roughness: 0.55 }), leg = std(0x1a1a1a, { metalness: 0.5, roughness: 0.4 });
    const g = group(rbox(0.5, 0.08, 0.5, 0.03, m, 0, 0.45, 0), rbox(0.5, 0.6, 0.08, 0.03, m, 0, 0.53, -0.22), cyl(0.03, 0.03, 0.4, leg, 0, 0.05, 0));
    for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; g.add(box(0.03, 0.03, 0.3, leg, Math.sin(a) * 0.15, 0.04, Math.cos(a) * 0.15)).rotation; g.children[g.children.length - 1].rotation.y = a; } return shadowy(g); },
  jacket() { const m = std(0x16110f, { roughness: 0.35, metalness: 0.1 }); const g = group(rbox(0.52, 0.55, 0.06, 0.025, m, 0, 0.6, -0.17)); g.add(rbox(0.12, 0.45, 0.07, 0.03, m, -0.3, 0.55, -0.16)); g.add(rbox(0.12, 0.45, 0.07, 0.03, m, 0.3, 0.55, -0.16)); g.children.slice(1).forEach((c, i) => c.rotation.z = i ? -0.15 : 0.15); g.add(box(0.02, 0.3, 0.01, std(0x5c5550, { metalness: 0.8 }), 0.0, 0.75, -0.135)); return shadowy(g); },
  phone(glow) { const g = group(rbox(0.08, 0.012, 0.16, 0.004, std(0x111111, { roughness: 0.2, metalness: 0.5 }), 0, 0, 0)); const sc = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.145), basic(glow ? 0x9fe0ff : 0x111a22)); sc.rotation.x = -Math.PI / 2; sc.position.y = 0.0135; g.add(sc); g.userData.screen = sc; return g; },
  mug(col) { return group(cyl(0.04, 0.035, 0.1, std(col || 0xe8e0cc, { roughness: 0.3 })), at(new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.007, 8, 16), std(col || 0xe8e0cc)), 0.045, 0.055, 0)); },
  papers(n, seed) { const r = RH.rng(seed || 2), g = group(); for (let i = 0; i < n; i++) { const p = box(0.21, 0.002, 0.29, std(0xf0e8d6, { roughness: 0.95 }), (r() - 0.5) * 0.06, 0.002 * i + 0.001, (r() - 0.5) * 0.06); p.rotation.y = (r() - 0.5) * 0.4; g.add(p); } return g; },
  plant() { const pot = cyl(0.13, 0.1, 0.26, std(0x8a4a2a, { roughness: 0.8 })); const g = group(pot); const lm = std(0x2f5a2f, { roughness: 0.6, side: THREE.DoubleSide }); const r = RH.rng(9);
    for (let i = 0; i < 14; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), lm); l.scale.set(0.5, 1.6, 0.18); const a = i / 14 * TAU; l.position.set(Math.cos(a) * 0.08, 0.42 + r() * 0.2, Math.sin(a) * 0.08); l.rotation.set(Math.sin(a) * 0.6, a, Math.cos(a) * 0.6); l.castShadow = true; g.add(l); } return g; },
  window(w, h, paint) { const g = group(); const p = poster(w, h, paint, true); p.position.z = -0.02; g.add(p); const fm = std(0x1a1512, { roughness: 0.5 });
    g.add(box(w + 0.16, 0.08, 0.1, fm, 0, h / 2 + 0.04, 0), box(w + 0.16, 0.1, 0.16, fm, 0, -h / 2 - 0.05, 0.03), box(0.08, h, 0.1, fm, -w / 2 - 0.04, 0, 0), box(0.08, h, 0.1, fm, w / 2 + 0.04, 0, 0), box(0.04, h, 0.05, fm, 0, 0, 0), box(w, 0.04, 0.05, fm, 0, 0, 0)); return g; },
  frame(w, h, paint) { const g = group(box(w + 0.08, h + 0.08, 0.04, std(0x6a4a20, { metalness: 0.4, roughness: 0.4 }), 0, 0, 0)); const p = poster(w, h, paint); p.position.z = 0.021; g.add(p); return g; },
  crate(label, seed) { const m = tmat(TX.wood('#8a6440', [1, 1], 'crate' + (seed || 0)), { roughness: 0.8 }); const g = group(rbox(0.8, 0.6, 0.6, 0.01, m, 0, 0, 0)); const dk = std(0x5a3e24); g.add(box(0.82, 0.06, 0.62, dk, 0, 0.08, 0), box(0.82, 0.06, 0.62, dk, 0, 0.52, 0));
    if (label) { const p = poster(0.5, 0.2, (x, w, h) => { x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, w, h); txt(x, label, w / 2, h / 2, h * 0.7, '#1e1612'); }); p.material.transparent = true; p.position.set(0, 0.3, 0.302); g.add(p); } return shadowy(g); },
  clockWall(r) { const g = group(); const face = cyl(r, r, 0.06, std(0xefe4cf, { roughness: 0.6 })); face.rotation.x = Math.PI / 2; face.position.set(0, 0, 0.03); g.add(face); const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 12, 48), std(0x2a2a2a, { metalness: 0.7, roughness: 0.3 })); rim.position.z = 0.06; g.add(rim);
    const ink = std(0x111111); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; const tk = box(0.02, r * 0.12, 0.01, ink, Math.sin(a) * r * 0.86, Math.cos(a) * r * 0.86, 0.065, false); tk.rotation.z = -a; g.add(tk); }
    const hh = box(0.03, r * 0.5, 0.01, ink, 0, 0, 0.07, false), mh = box(0.02, r * 0.78, 0.01, ink, 0, 0, 0.075, false); hh.geometry.translate(0, r * 0.25, 0); mh.geometry.translate(0, r * 0.39, 0); g.add(hh, mh);
    g.userData.set = (h, m) => { hh.rotation.z = -((h % 12) + m / 60) / 12 * TAU; mh.rotation.z = -m / 60 * TAU; }; return g; },
  radiator() { const m = std(0x8a8a82, { metalness: 0.6, roughness: 0.4 }); const g = group(); for (let i = 0; i < 12; i++) g.add(rbox(0.05, 0.6, 0.14, 0.02, m, -0.33 + i * 0.06, 0.08, 0)); g.add(box(0.75, 0.04, 0.1, m, 0, 0.12, 0), box(0.75, 0.04, 0.1, m, 0, 0.64, 0)); return shadowy(g); },
  pendant(col) { const g = group(cyl(0.004, 0.004, 1.0, std(0x111111), 0, 0, 0)); const sh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.18, 32, 1, true), std(col || 0x2a3a2a, { side: THREE.DoubleSide, metalness: 0.4 })); sh.position.y = -0.05; g.add(sh); g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 10), basic(0xfff0c8)), 0, -0.12, 0)); return g; },
  monitor(paint) { const g = group(box(0.18, 0.02, 0.14, std(0x222222), 0, 0.01, 0), box(0.04, 0.3, 0.03, std(0x222222), 0, 0.17, -0.03)); const sc = poster(0.62, 0.38, paint, true); sc.position.set(0, 0.45, 0.012); g.add(rbox(0.66, 0.42, 0.04, 0.01, std(0x151515, { roughness: 0.3 }), 0, 0.24, -0.01), sc); g.userData.screen = sc; return shadowy(g); },
};

/* ---------------- 2D cast on camera-facing cards ---------------- */
function castCard(scene, key, height, tint) {
  height *= 1.38; // the drawn figure fills ~70% of the card, so this makes the 'height' arg the real figure height
  const T = canvasTex(512, 768);
  const g = new THREE.PlaneGeometry(height * 512 / 768, height); g.translate(0, height / 2 - height * 0.02, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: T.t, transparent: true, alphaTest: 0.05, color: tint || 0xf2ead8, side: THREE.DoubleSide }));
  const sh = new THREE.Mesh(new THREE.CircleGeometry(height * 0.25, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5, depthWrite: false }));
  sh.rotation.x = -Math.PI / 2; sh.scale.set(1, 0.45, 1); scene.add(m); scene.add(sh);
  m.userData.card = true;
  const card = { mesh: m, shadow: sh, key, set(x, z, P, cam, y) { y = y || 0; m.visible = sh.visible = true; m.position.set(x, y, z); sh.position.set(x, y + 0.012, z); if (cam) m.rotation.y = Math.atan2(cam.position.x - x, cam.position.z - z);
      T.x.clearRect(0, 0, 512, 768); RH.draw(T.x, CH[key], P, 256, 742, 1.95, { noShadow: true }); T.t.needsUpdate = true; }, hide() { m.visible = sh.visible = false; } };
  return card;
}
/* locomotion: slide + 2-frame leg wiggle + bounce (locked style) */
function slidePose(t, dir, v, h) { // real walk cycle; cadence matched to ground speed v (m/s) for a figure h metres tall
  v = v || 0.9; h = h || 1.6; const cps = clamp(v / (0.8 * h), 0.55, 1.6); const P = v > 1.9 ? RH.anim.run(t, 'side') : RH.anim.walk(t, 'side', { cps }); P.dir = dir || 1; return P; }
const MOUTH = ['M', 'open', 'E', 'O', 'smile', 'open', 'E', 'M', 'O', 'open'];
function speaking(lines, who, t) { return lines.some(l => l.who === who && t >= l.t0 && t <= l.t1); }
/* pose helper: base view + expr + talking mouth + gentle idle so nobody freezes */
function pose(o, t, lines, who) {
  const P = o.anim ? RH.anim[o.anim](t, o.view) : RH.stand(o.view || 'q');
  if (!o.anim) { const b = Math.abs(Math.sin(t * 1.6)); P.bob = -0.03 * b; P.tilt = 0.04 * Math.sin(t * 0.9); }
  P.face.blink = RH.blinkAt(t + (o.seed || 0));
  if (o.expr) P.face.expr = o.expr; if (o.look) P.face.look = o.look; if (o.dir) P.dir = o.dir; if (o.lean) P.lean = o.lean;
  if (o.arms) o.arms.forEach((a, i) => { if (a) P.arms[i] = Object.assign({}, a); });
  if (lines && who && speaking(lines, who, t)) { P.face.mouth = MOUTH[Math.floor(t * 9) % MOUTH.length]; P.face.browLift = Math.max(0, Math.sin(t * 4)); if (o.talkArm !== false) { const a = P.arms[1]; P.arms[1] = { h: [0.6 + 0.15 * Math.sin(t * 2.3), 0.65 + 0.15 * Math.sin(t * 3.1)], hand: Math.sin(t * 1.3) > 0.2 ? 'point' : 'open' }; } }
  return P;
}

/* ---------------- compositing ---------------- */
function tag(c, o) { if (!o.s || o.s <= 0.01) return; c.save(); c.translate(o.x, o.y); c.rotate(o.r || 0); c.scale(o.s, o.s); c.font = `${o.size || 40}px ${HAND}`; const w = c.measureText(o.txt).width + 44, h = (o.size || 40) * 1.5;
  c.fillStyle = 'rgba(0,0,0,0.35)'; c.fillRect(-w / 2 + 5, -h / 2 + 7, w, h); c.fillStyle = o.bg || '#f3e7cc'; c.fillRect(-w / 2, -h / 2, w, h);
  c.fillStyle = 'rgba(120,90,60,0.12)'; c.fillRect(-w / 2, h / 2 - 6, w, 6); c.fillStyle = o.col || '#1e1612'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.txt, 0, 3); c.restore(); }
function vignette(c, k) { const g = c.createRadialGradient(W / 2, H * 0.52, H * 0.3, W / 2, H / 2, W * 0.72); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${k})`); c.fillStyle = g; c.fillRect(0, 0, W, H); }
function blackCard(txtS, t, d, sub) { X.fillStyle = '#060504'; X.fillRect(0, 0, W, H); const a = Math.min(k01(t, 0.15, 0.6), 1 - k01(t, d - 0.45, d)); X.save(); X.globalAlpha = a; X.font = `72px ${HAND}`; X.fillStyle = '#f4efe6'; X.textAlign = 'center'; X.textBaseline = 'middle'; const s = 0.96 + 0.04 * E(k01(t, 0, d)); X.translate(W / 2, H / 2); X.scale(s, s); X.fillText(txtS, 0, sub ? -18 : 0); if (sub) { X.font = `30px ${HAND}`; X.fillStyle = '#a8998a'; X.fillText(sub, 0, 48); } X.restore(); RH.film(X, W, H, t, 0.35); }
function proj(cam, v) { const p = v.clone().project(cam); return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H]; }
const pop = (t, a) => outBack(k01(t, a, a + 0.45));

/* ---------------- timeline ---------------- */
// ACT = { shots: [{id, f(t, d, lines) -> {scene, cam, tags}} or {id, card}], timing }
let TL = [], TOTAL = 0;
function buildTimeline(list, timing) { TL = []; let a = 0; for (const s of list) { const tm = timing[s.id]; const d = s.dur || tm.dur; TL.push(Object.assign({ start: a, d, lines: tm ? tm.lines : [] }, s)); a += d; } TOTAL = a; window.TOTAL = TOTAL; window.SHOTLIST = TL.map(s => ({ id: s.id, start: s.start, d: s.d })); }
function frame(t) {
  let i = 0; while (i < TL.length - 1 && t >= TL[i].start + TL[i].d) i++;
  const s = TL[i], lt = t - s.start;
  if (frame.last !== i) { const p = TL[frame.last]; if (p && p.after) p.after(); if (s.before) s.before(); frame.last = i; }
  if (s.card !== undefined) { if (s.card) blackCard(s.card, lt, s.d, s.sub); else { X.fillStyle = '#060504'; X.fillRect(0, 0, W, H); } return; }
  const r = s.f(lt, s.d, s.lines) || {};
  if (r.scene) r.scene.traverse(o => { if (o.userData.tick) o.userData.tick(t); if (o.userData.card && o.visible && r.cam) o.rotation.y = Math.atan2(r.cam.position.x - o.position.x, r.cam.position.z - o.position.z); });
  if (r.scene) R.render(r.scene, r.cam);
  const blur = Math.max(s.noBlurIn ? 0 : 10 * (1 - k01(lt, 0, 0.4)), s.noBlurOut ? 0 : 10 * k01(lt, s.d - 0.32, s.d));
  X.save(); X.fillStyle = '#000'; X.fillRect(0, 0, W, H); if (blur > 0.3) X.filter = `blur(${blur.toFixed(1)}px)`; X.drawImage(R.domElement, 0, 0); X.restore();
  if (r.post) r.post(X);
  (r.tags || []).forEach(o => tag(X, o)); vignette(X, r.vig == null ? 0.8 : r.vig); RH.film(X, W, H, t, 0.28);
}
window.renderAt = frame;
window.ready = window.__fontReady.then(() => true);
function preview() { if (/render/.test(location.hash)) return; const t0 = performance.now(); (function loop(now) { frame(((now - t0) / 1000) % TOTAL); requestAnimationFrame(loop); })(t0); }
