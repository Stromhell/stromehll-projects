// Detailed realistic sets: Airbus A300 (Air France, 1976), its cabin and flight deck, an airport apron.
// Everything is built in metres. Aircraft axes: nose points +z, right wing +x, up +y.
import { rng } from './core.js';
import * as THREE from 'three';
import * as real from './real.js';

const { m, std, canvasTex } = real;
const P = Math.PI;

// ---------- geometry helpers ----------
// tube along z: rings of radius r(z) centred at (0, yc(z)); uv.x = along length, uv.y = around (0 top, .5 bottom)
function tube(zs, r, yc, seg = 64, sx = 1, a0 = 0, a1 = P * 2) {
  const pos = [], uv = [], idx = [];
  const z0 = zs[0], z1 = zs[zs.length - 1];
  zs.forEach((z, i) => {
    for (let j = 0; j <= seg; j++) {
      const th = a0 + j / seg * (a1 - a0); const rr = r(z);
      pos.push(Math.sin(th) * rr * sx, yc(z) + Math.cos(th) * rr, z);
      uv.push((z - z0) / (z1 - z0), 1 - j / seg);
    }
    if (i) for (let j = 0; j < seg; j++) { const a = (i - 1) * (seg + 1) + j, b = a + seg + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals(); return g;
}
// airfoil section (closed loop, chord along +z from leading edge 0 to trailing edge -1), thickness t
function airfoil(t, n = 18) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const x = (1 - Math.cos(i / n * P)) / 2; const y = 5 * t * (.2969 * Math.sqrt(x) - .126 * x - .3516 * x * x + .2843 * x ** 3 - .1036 * x ** 4); pts.push([x, y]); }
  const up = pts, lo = pts.slice(1, -1).reverse().map(([x, y]) => [x, -y]);
  return [...up, ...lo];
}
// loft airfoil sections: secs = [{x,y,z (leading edge), c (chord), t, twist}] spanning along x (or y for a fin with vertical:true)
function wing(secs, o = {}) {
  const pos = [], uv = [], idx = []; const af = airfoil(.12, o.n ?? 16); const n = af.length;
  secs.forEach((s, i) => {
    const t = (s.t ?? .12) / .12;
    af.forEach(([x, y], j) => {
      const zz = s.z - x * s.c, yy = y * s.c * t;
      if (o.vertical) pos.push(s.x + yy, s.y, zz); else pos.push(s.x, s.y + yy, zz);
      uv.push(i / (secs.length - 1), j / n);
    });
    if (i) for (let j = 0; j < n; j++) { const a = (i - 1) * n + j, b = i * n + j, a1 = (i - 1) * n + (j + 1) % n, b1 = i * n + (j + 1) % n; o.flip ? idx.push(a, a1, b, b, a1, b1) : idx.push(a, b, a1, b, b1, a1); }
  });
  // tip cap
  const last = (secs.length - 1) * n; for (let j = 1; j < n - 1; j++) o.flip ? idx.push(last + j + 1, last + j, last) : idx.push(last, last + j, last + j + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals(); return g;
}
const lathe = (prof, seg = 48) => new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), seg);
function wheel(r, w, mats) {
  const g = new THREE.Group();
  const tyre = m(new THREE.TorusGeometry(r - w * .35, w * .42, 14, 32), mats.tyre); tyre.scale.z = 1.25; g.add(tyre);
  const hub = m(new THREE.CylinderGeometry(r * .55, r * .55, w * .9, 24), mats.hub, { rot: [P / 2, 0, 0] }); g.add(hub);
  const cap = m(new THREE.CylinderGeometry(r * .2, r * .25, w * 1.0, 12), mats.metal, { rot: [P / 2, 0, 0] }); g.add(cap);
  g.rotation.y = P / 2; g.userData.wheelR = r; return g;
}

// ---------- livery ----------
const L = { z0: -27.2, z1: 26.4 }; // fuselage extent
const AF_BLUE = '#0b2a6f', AF_RED = '#d2232a';
function livery(plain = false) {
  const W = 8192, H = 2048;
  const zx = z => (z - L.z0) / (L.z1 - L.z0) * W;   // fuselage z -> canvas x
  const ty = th => th / (P * 2) * H;                 // angle from top -> canvas y
  const diffuse = canvasTex(W, H, (c) => {
    c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, W, H);
    // subtle panel lines
    c.strokeStyle = 'rgba(0,0,0,.10)'; c.lineWidth = 2;
    for (let z = L.z0 + 1; z < L.z1; z += 0.53) { c.beginPath(); c.moveTo(zx(z), 0); c.lineTo(zx(z), H); c.stroke(); }
    for (const th of [.35, .9, 1.4, 1.75, 2.2, 2.6, 3.68, 4.08, 4.53, 4.88, 5.38, 5.93]) { c.beginPath(); c.moveTo(0, ty(th)); c.lineTo(W, ty(th)); c.stroke(); }
    // grey belly (bare metal look)
    const g = c.createLinearGradient(0, ty(P * .68), 0, ty(P * .76)); g.addColorStop(0, '#f2f2ee'); g.addColorStop(1, '#a9adb2');
    c.fillStyle = g; c.fillRect(0, ty(P * .68), W, ty(P * .08)); c.fillStyle = '#a9adb2'; c.fillRect(0, ty(P * .76), W, ty(P * .48));
    const g2 = c.createLinearGradient(0, ty(P * 1.24), 0, ty(P * 1.32)); g2.addColorStop(0, '#a9adb2'); g2.addColorStop(1, '#f2f2ee');
    c.fillStyle = g2; c.fillRect(0, ty(P * 1.24), W, ty(P * .08));
    for (const side of [1, -1]) {
      const thW = side > 0 ? P / 2 - .2 : P * 1.5 + .2;  // window line angle on each side
      const y = ty(thW);
      // passenger windows
      c.fillStyle = '#1b2430';
      for (let z = -15.5; z < 18.6; z += .533) {
        if (Math.abs(z - 15.2) < .7 || Math.abs(z + 1.2) < .55 || Math.abs(z - 4.3) < .55 || Math.abs(z + 14.6) < .7) continue;
        const x = zx(z); c.beginPath(); c.roundRect(x - 13, y - 22, 26, 40, 11); c.fill();
      }
      // doors
      c.strokeStyle = 'rgba(40,40,40,.65)'; c.lineWidth = 4;
      for (const [z, w] of [[20.3, 1.07], [-1.2, .8], [4.3, .8], [-16.9, 1.07]]) { const x = zx(z); c.beginPath(); c.roundRect(x - w / 2 * W / (L.z1 - L.z0), y - 70, w * W / (L.z1 - L.z0), 220, 16); c.stroke(); }
      // cockpit windscreen
      c.fillStyle = '#121a24';
      c.save(); c.translate(zx(23.9), ty(side > 0 ? P / 2 - .55 : P * 1.5 + .55));
      c.beginPath(); c.moveTo(-60, -30 * side); c.lineTo(70, -24 * side); c.lineTo(90, 26 * side); c.lineTo(-56, 30 * side); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(-140, -28 * side); c.lineTo(-76, -30 * side); c.lineTo(-72, 30 * side); c.lineTo(-136, 22 * side); c.closePath(); c.fill(); c.restore();
      // titles: AIR FRANCE in blue, registration near the tail
      const text = (s, z, th, px, col, font = 'bold') => {
        c.save(); c.translate(zx(z), ty(th));
        if (side > 0) c.scale(-1, 1); else c.scale(1, -1);
        c.fillStyle = col; c.font = `${font} ${px}px "Liberation Sans", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText(s, 0, 0); c.restore();
      };
      if (!plain) text('AIR FRANCE', 9.5, side > 0 ? P / 2 - .52 : P * 1.5 + .52, 150, AF_BLUE, 'italic bold');
      if (!plain) text('F-BVGG', -20.5, side > 0 ? P / 2 - .05 : P * 1.5 + .05, 70, '#333');
      // small tricolour flag near the front door
      if (!plain) { c.save(); c.translate(zx(17.5), ty(side > 0 ? P / 2 - .55 : P * 1.5 + .55));
      [AF_BLUE, '#ffffff', AF_RED].forEach((col, i) => { c.fillStyle = col; c.fillRect((side > 0 ? 1 - i : i - 1) * 18 - 9, -12, 18, 24); }); c.restore(); }
    }
    // nose cone radome slightly darker
    c.fillStyle = 'rgba(30,30,30,.12)'; c.fillRect(zx(25.4), 0, W - zx(25.4), H);
  });
  const rough = canvasTex(1024, 256, (c, w, h) => { c.fillStyle = '#5a5a5a'; c.fillRect(0, 0, w, h); c.fillStyle = '#7a7a7a'; c.fillRect(0, h * .34, w, h * .32); });
  return { diffuse, rough };
}
function tailTex(plain = false) {
  return canvasTex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); if (plain) return;
    // uv.x = span (root 0 -> tip 1), uv.y = around the airfoil; both faces share the stripes
    // stripes slant back: the span position shifts with the chord position (0 leading edge .. 1 trailing edge)
    for (let y = 0; y < h; y++) {
      const v = y / h, ch = v < .5 ? v * 2 : (1 - v) * 2;
      const off = ch * .32;
      for (const [x0, x1, col] of [[.22, .36, AF_BLUE], [.36, .44, '#f2f2ee'], [.44, .58, AF_RED]]) { c.fillStyle = col; c.fillRect((x0 + off) * w, y, (x1 - x0) * w, 1); }
    }
  });
}

// ---------- the aircraft ----------
export async function a300(o = {}) {
  const g = new THREE.Group(); g.name = 'A300';
  const liv = livery(o.plain);
  const paint = new THREE.MeshPhysicalMaterial({ map: liv.diffuse, roughness: .32, metalness: .05, clearcoat: .6, clearcoatRoughness: .15 });
  const white = new THREE.MeshPhysicalMaterial({ color: 0xefefea, roughness: .35, metalness: .05, clearcoat: .5, clearcoatRoughness: .2 });
  const alu = new THREE.MeshStandardMaterial({ color: 0xc4c8cc, roughness: .32, metalness: .85 });
  const grey = new THREE.MeshStandardMaterial({ color: 0x9a9fa5, roughness: .45, metalness: .5 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1c1d20, roughness: .5, metalness: .3 });
  const mats = { tyre: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: .9 }), hub: new THREE.MeshStandardMaterial({ color: 0xb8bcc0, roughness: .35, metalness: .8 }), metal: alu };
  const Y = 4.85, R = 2.82;
  // fuselage radius / centre-line profile
  const r = z => {
    if (z > 18.5) { const u = (z - 18.5) / (L.z1 - 18.5); return R * Math.sqrt(Math.max(0, 1 - u ** 2.1)) * (1 - .05 * u); }
    if (z < -12) { const u = (-12 - z) / (-12 - L.z0); return R * (1 - u * .86) ** 1.05; }
    return R;
  };
  const yc = z => { if (z > 18.5) { const u = (z - 18.5) / (L.z1 - 18.5); return Y - u * u * .9; } if (z < -12) { const u = (-12 - z) / (-12 - L.z0); return Y + u ** 1.4 * 1.9; } return Y; };
  const zs = []; for (let z = L.z0; z <= L.z1 + 1e-6; z += .25) zs.push(z); zs[zs.length - 1] = L.z1;
  g.add(m(tube(zs, r, yc, 72), paint));
  // nose tip and tail cap
  g.add(m(new THREE.SphereGeometry(.12, 12, 8), white, { pos: [0, yc(L.z1), L.z1] }));
  // wings: root at z≈4 (leading edge), sweep 28°, dihedral 5°, span 44.8 m
  const wingMat = new THREE.MeshPhysicalMaterial({ color: 0xc9ccd0, roughness: .38, metalness: .55, clearcoat: .2 });
  const sw = Math.tan(28 * P / 180), dh = Math.tan(5 * P / 180);
  for (const s of [1, -1]) {
    const secs = [[1.4, 10.5, .15], [5.5, 8.4, .13], [10, 5.6, .11], [22.4, 2.4, .09]].map(([x, c, t]) => ({ x: s * x, y: Y - 1.65 + (x - 1.4) * dh, z: 5.0 - (x - 1.4) * sw, c, t }));
    g.add(m(wing(secs, { flip: s < 0 }), wingMat));
    // flap track fairings
    for (const x of [5.5, 9, 12.5, 16]) { const z = 5 - (x - 1.4) * sw; const c = x < 10 ? 8.4 - (x - 5.5) * .62 : 5.6 - (x - 10) * .26; g.add(m(new THREE.CapsuleGeometry(.16, 1.6, 4, 10), grey, { pos: [s * x, Y - 1.95 + (x - 1.4) * dh, z - c + .3], rot: [P / 2, 0, 0] })); }
    // engine: CF6-50 nacelle under the wing at 9.3 m span
    const ex = s * 9.3, ez = 5 - (9.3 - 1.4) * sw + 4.2, ey = Y - 1.65 + (9.3 - 1.4) * dh - 2.1;
    const nac = new THREE.Group(); nac.position.set(ex, ey, ez); g.add(nac);
    const prof = [[1.0, 0], [1.28, .15], [1.36, .6], [1.38, 1.6], [1.3, 3.2], [1.06, 4.4], [.86, 5.2], [.8, 5.25]];
    const shell = m(lathe(prof), white, { rot: [-P / 2, 0, 0] }); shell.material = white.clone(); shell.material.side = THREE.DoubleSide; nac.add(shell);
    nac.add(m(new THREE.TorusGeometry(1.14, .13, 12, 40), alu, { pos: [0, 0, 0] }));
    const core = m(lathe([[.0, 4.2], [.62, 4.5], [.64, 6.1], [.45, 6.9], [.0, 7.2]]), grey, { rot: [-P / 2, 0, 0] }); nac.add(core);
    // fan face: spinner + blades
    nac.add(m(new THREE.ConeGeometry(.36, .7, 24), dark, { pos: [0, 0, -.45], rot: [-P / 2, 0, 0] }));
    for (let i = 0; i < 38; i++) { const b = m(new THREE.BoxGeometry(.06, .82, .22), dark, { rot: [0, .5, i / 38 * P * 2] }); b.position.set(Math.sin(i / 38 * P * 2) * -.6, Math.cos(i / 38 * P * 2) * .6, -.75); b.rotation.order = 'ZYX'; b.rotation.set(0, .5, i / 38 * P * 2); nac.add(b); }
    nac.add(m(new THREE.CircleGeometry(1.0, 40), new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: 1 }), { pos: [0, 0, -1.1], rot: [0, P, 0] }));
    // pylon
    const py = m(wing([{ x: 0, y: 0, z: 0, c: 6.4, t: .14 }, { x: 0, y: 1.6, z: -1.2, c: 5.4, t: .14 }], { vertical: false, n: 10 }), white);
    py.rotation.z = s * P / 2; py.position.set(ex, ey + .95, ez - .2); py.scale.set(1, 1, 1); g.add(py);
  }
  // horizontal stabiliser and fin
  for (const s of [1, -1]) {
    const secs = [[.5, 5.4, .1], [8.0, 2.0, .09]].map(([x, c, t]) => ({ x: s * x, y: yc(-22) + .3 + (x - .5) * .1, z: -19.6 - (x - .5) * .62, c, t }));
    g.add(m(wing(secs, { flip: s < 0 }), white));
  }
  const fin = m(wing([{ x: 0, y: yc(-18) + 1.6, z: -15.4, c: 9.4, t: .1 }, { x: 0, y: yc(-18) + 9.6, z: -22.2, c: 4.0, t: .09 }], { vertical: true }),
    new THREE.MeshPhysicalMaterial({ map: tailTex(o.plain), roughness: .32, clearcoat: .6, clearcoatRoughness: .15 }));
  g.add(fin);
  // belly fairing (wing-body)
  g.add(m(new THREE.CapsuleGeometry(1.9, 9, 6, 24), grey, { pos: [0, Y - 2.05, 1.4], rot: [P / 2, 0, 0], scale: [1.15, 1, .55] }));
  // landing gear
  const gear = new THREE.Group(); g.add(gear);
  const strut = (x, y0, y1, z, rad = .14) => gear.add(m(new THREE.CylinderGeometry(rad, rad, y1 - y0, 12), alu, { pos: [x, (y0 + y1) / 2, z] }));
  // nose gear (2 wheels) at z=21
  strut(0, .55, Y - 1.8, 20.9, .12);
  for (const s of [1, -1]) { const w = wheel(.56, .38, mats); w.position.set(s * .32, .56, 20.9); gear.add(w); }
  // main gear: two 4-wheel bogies at x=±4.8, z≈0.4
  for (const s of [1, -1]) {
    strut(s * 4.8, .62, Y - 1.4, .4, .2);
    gear.add(m(new THREE.BoxGeometry(.24, .22, 2.0), alu, { pos: [s * 4.8, .62, .4] }));
    for (const dz of [-.72, .72]) for (const dx of [-.5, .5]) { const w = wheel(.62, .44, mats); w.position.set(s * 4.8 + dx, .62, .4 + dz); gear.add(w); }
    // gear doors
    gear.add(m(new THREE.BoxGeometry(.05, 1.6, 1.8), grey, { pos: [s * 4.15, 2.2, .4] }));
  }
  // wing / nav lights and beacon
  g.add(m(new THREE.SphereGeometry(.12, 10, 8), std(0xff2a2a, { emissive: 0xff2a2a, ei: 2 }), { pos: [0, Y + R + .05, 2] }));
  g.add(m(new THREE.SphereGeometry(.1, 10, 8), std(0x30ff60, { emissive: 0x30ff60, ei: 2 }), { pos: [22.4, Y - 1.65 + 21 * dh, 5 - 21 * sw - 1.2] }));
  g.add(m(new THREE.SphereGeometry(.1, 10, 8), std(0xff3030, { emissive: 0xff3030, ei: 2 }), { pos: [-22.4, Y - 1.65 + 21 * dh, 5 - 21 * sw - 1.2] }));
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; c.userData.solid = false; } });
  g.userData.doorL1 = new THREE.Vector3(R * .98, Y - 1.0, 20.3); // left side of the aircraft is +x // floor sill of the front left door
  g.userData.Y = Y;
  return g;
}

// ---------- ground equipment ----------
export function airstair(h = 4.0, o = {}) {
  const g = new THREE.Group();
  const body = std(o.color ?? 0xe8e4d8, { rough: .5 }), rail = new THREE.MeshStandardMaterial({ color: 0xb8bcc0, metalness: .8, roughness: .3 }), tyre = std(0x151515, { rough: .9 });
  const len = h / Math.tan(38 * P / 180);
  // truck chassis along +z, stairs climb toward -x (the aircraft side)
  g.add(m(new THREE.BoxGeometry(2.3, .7, 7.2), body, { pos: [0, .75, 0] }));
  g.add(m(new THREE.BoxGeometry(2.2, 1.5, 1.8), body, { pos: [0, 1.55, 3.0] }));
  g.add(m(new THREE.BoxGeometry(2.0, .8, .05), std(0x1a2028, { rough: .1, metal: .2 }), { pos: [0, 1.85, 3.91] }));
  // detail pass: dark chassis rail, cab side windows, door seams, a livery stripe, bumper, lights, mudguards and hubs
  const dark = std(0x2b2e31, { rough: .7, metal: .3 }), glass = std(0x1a2028, { rough: .1, metal: .2 }), stripe = std(o.stripe ?? 0x1f3f8a, { rough: .5 });
  g.add(m(new THREE.BoxGeometry(2.36, .22, 7.3), dark, { pos: [0, .38, 0] }));
  for (const x of [-1.11, 1.11]) {
    g.add(m(new THREE.BoxGeometry(.04, .55, 1.1), glass, { pos: [x, 1.9, 3.0] }));
    g.add(m(new THREE.BoxGeometry(.03, 1.3, .03), dark, { pos: [x * 1.005, 1.5, 2.35] }));
    g.add(m(new THREE.BoxGeometry(.03, .18, 7.0), stripe, { pos: [x * 1.04, .95, 0] }));
    for (const z of [2.6, -2.6]) g.add(m(new THREE.BoxGeometry(.25, .12, 1.15), dark, { pos: [x * .95, .93, z] }));
  }
  g.add(m(new THREE.BoxGeometry(2.4, .25, .2), dark, { pos: [0, .55, 3.98] }));
  for (const x of [-.8, .8]) g.add(m(new THREE.CylinderGeometry(.11, .11, .05, 16), std(0xfff3d0, { emissive: 0xfff0c0, ei: .6 }), { pos: [x, .95, 3.93], rot: [P / 2, 0, 0] }));
  g.add(m(new THREE.BoxGeometry(2.25, .06, 1.85), dark, { pos: [0, 2.33, 3.0] }));
  const wm = { tyre, hub: std(0x8a8c90, { rough: .4, metal: .6 }), metal: rail };
  for (const [x, z] of [[-1, 2.6], [1, 2.6], [-1, -2.6], [1, -2.6]]) { const w = wheel(.42, .3, wm); w.position.set(x, .42, z); g.add(w); }
  const st = new THREE.Group(); st.position.set(-.2, 1.1, 0); g.add(st);
  const n = Math.round(h / .19);
  for (let i = 0; i < n; i++) st.add(m(new THREE.BoxGeometry(1.3, .05, .3), std(0x6a6c70, { rough: .7, metal: .4 }), { pos: [-i * len / n, (i + 1) * (h - 1.1) / n, 0] }));
  for (const z of [-.68, .68]) {
    const L2 = Math.hypot(len, h - 1.1);
    st.add(m(new THREE.BoxGeometry(L2, .3, .06), body, { pos: [-len / 2, (h - 1.1) / 2, z], rot: [0, 0, -Math.atan2(h - 1.1, len)] }));
    st.add(m(new THREE.CylinderGeometry(.03, .03, L2, 8), rail, { pos: [-len / 2, (h - 1.1) / 2 + .95, z], rot: [0, 0, P / 2 - Math.atan2(h - 1.1, len)] }));
    for (let i = 0; i <= 6; i++) st.add(m(new THREE.CylinderGeometry(.02, .02, .95, 6), rail, { pos: [-i * len / 6, i * (h - 1.1) / 6 + .48, z] }));
  }
  // platform at the top
  st.add(m(new THREE.BoxGeometry(1.4, .08, 1.5), std(0x6a6c70, { rough: .7, metal: .4 }), { pos: [-len - .6, h - 1.1, 0] }));
  g.userData.top = new THREE.Vector3(-.2 - len - .6, h, 0);
  return g;
}
export function cone() {
  const g = new THREE.Group();
  g.add(m(new THREE.ConeGeometry(.17, .7, 24, 1, true), std(0xff5a14, { rough: .6 }), { pos: [0, .38, 0] }));
  g.add(m(new THREE.CylinderGeometry(.115, .14, .1, 24, 1, true), std(0xf4f4f0, { rough: .4 }), { pos: [0, .45, 0] }));
  g.add(m(new THREE.BoxGeometry(.42, .04, .42), std(0x1b1b1b, { rough: .8 }), { pos: [0, .02, 0] }));
  return g;
}
export function baggageCart(o = {}) {
  const g = new THREE.Group(); const c = std(o.color ?? 0x8a8f60, { rough: .7, metal: .3 }), tyre = std(0x161616, { rough: .9 });
  g.add(m(new THREE.BoxGeometry(1.5, .12, 2.6), c, { pos: [0, .55, 0] }));
  for (const x of [-.72, .72]) g.add(m(new THREE.BoxGeometry(.05, 1.3, 2.6), c, { pos: [x, 1.25, 0] }));
  g.add(m(new THREE.BoxGeometry(1.6, .06, 2.7), c, { pos: [0, 1.92, 0] }));
  for (const [x, z] of [[-.6, .9], [.6, .9], [-.6, -.9], [.6, -.9]]) g.add(m(new THREE.CylinderGeometry(.25, .25, .16, 16), tyre, { pos: [x, .25, z], rot: [0, 0, P / 2] }));
  return g;
}
export function tug(o = {}) {
  const g = new THREE.Group(); const c = std(o.color ?? 0xd9b02a, { rough: .55, metal: .2 }), tyre = std(0x161616, { rough: .9 });
  g.add(m(new THREE.BoxGeometry(1.4, .7, 2.4), c, { pos: [0, .7, 0] }));
  g.add(m(new THREE.BoxGeometry(1.2, .08, 1.0), std(0x2a2a2a), { pos: [0, 1.75, -.4] }));
  for (const x of [-.55, .55]) g.add(m(new THREE.CylinderGeometry(.03, .03, .8, 6), std(0x2a2a2a), { pos: [x, 1.4, -.4] }));
  g.add(m(new THREE.BoxGeometry(.5, .5, .4), std(0x3a3a3a), { pos: [0, 1.25, -.6] }));
  for (const [x, z] of [[-.68, .8], [.68, .8], [-.68, -.8], [.68, -.8]]) g.add(m(new THREE.CylinderGeometry(.33, .33, .25, 18), tyre, { pos: [x, .33, z], rot: [0, 0, P / 2] }));
  return g;
}

// ---------- airport apron ----------
// apron(k, {hdri, sun, terminal:true}) builds ground, markings, a 1970s terminal and a control tower
export async function apron(k, o = {}) {
  const { scene } = k;
  // apron concrete: 7.5 m slabs with slightly different tones, tyre marks and oil stains (canvas, tiles every 60 m)
  const slab = real.canvasTex(2048, 2048, (c, w, h) => { const r = rng(7); for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const v = 160 + Math.floor(r() * 22); c.fillStyle = `rgb(${v},${v - 3},${v - 9})`; c.fillRect(i * 256, j * 256, 256, 256); }
    for (let n = 0; n < 900; n++) { c.fillStyle = `rgba(60,58,52,${r() * .08})`; c.beginPath(); c.arc(r() * w, r() * h, 2 + r() * 30, 0, 7); c.fill(); }
    for (let n = 0; n < 14; n++) { c.fillStyle = `rgba(30,28,24,${.12 + r() * .15})`; c.beginPath(); c.ellipse(r() * w, r() * h, 20 + r() * 60, 10 + r() * 30, r() * 3, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(40,38,34,.18)'; c.lineWidth = 14; for (let n = 0; n < 6; n++) { c.beginPath(); const y = r() * h; c.moveTo(0, y); c.bezierCurveTo(w * .3, y + r() * 200 - 100, w * .6, y + r() * 200 - 100, w, y + r() * 200 - 100); c.stroke(); } });
  slab.wrapS = slab.wrapT = THREE.RepeatWrapping; slab.repeat.set(400 / 60, 400 / 60); slab.anisotropy = 8;
  const concrete = new THREE.MeshStandardMaterial({ map: slab, roughness: .93, metalness: 0 });
  const ground = m(new THREE.PlaneGeometry(400, 400), concrete, { rot: [-P / 2, 0, 0], cast: false }); scene.add(ground);
  const grass = await real.pbr('grass_path_2', { repeat: [200, 40] });
  const gr = m(new THREE.PlaneGeometry(2000, 600), grass, { rot: [-P / 2, 0, 0], pos: [0, -.02, 440], cast: false }); scene.add(gr);
  const gr2 = gr.clone(); gr2.position.z = -500; scene.add(gr2);
  // painted markings: lead-in line, stop bars, stand number
  const marks = real.canvasTex(2048, 2048, (c, w, h) => {
    c.clearRect(0, 0, w, h);
    c.strokeStyle = 'rgba(240,196,40,.92)'; c.lineWidth = 9;
    c.beginPath(); c.moveTo(w / 2, h); c.lineTo(w / 2, h * .2); c.stroke();             // lead-in line along the aircraft centre
    c.beginPath(); c.arc(w / 2 - 520, h, 520, -P / 2, 0); c.stroke();
    for (const y of [.22, .26, .3]) { c.beginPath(); c.moveTo(w / 2 - 60, h * y); c.lineTo(w / 2 + 60, h * y); c.stroke(); }
    c.fillStyle = 'rgba(240,196,40,.9)'; c.font = 'bold 150px "Liberation Sans"'; c.textAlign = 'center'; c.fillText('4', w / 2 + 300, h * .16);
  });
  const mk = m(new THREE.PlaneGeometry(70, 70), new THREE.MeshStandardMaterial({ map: marks, transparent: true, roughness: .8, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }), { rot: [-P / 2, 0, 0], pos: [0, .01, 0], cast: false });
  scene.add(mk);
  // expansion joints
  const jm = new THREE.MeshBasicMaterial({ color: 0x3a3a38, transparent: true, opacity: .35 });
  for (let x = -100; x <= 100; x += 7.5) scene.add(m(new THREE.PlaneGeometry(.06, 200), jm, { rot: [-P / 2, 0, 0], pos: [x, .005, 0], cast: false, receive: false }));
  for (let z = -100; z <= 100; z += 7.5) scene.add(m(new THREE.PlaneGeometry(200, .06), jm, { rot: [-P / 2, 0, 0], pos: [0, .005, z], cast: false, receive: false }));
  if (o.terminal !== false) await terminal(k, o.terminalPos ?? [0, 0, -62], o);
  return { ground };
}
async function terminal(k, pos, o = {}) {
  const { scene } = k;
  const g = new THREE.Group(); g.position.set(...pos); scene.add(g);
  const wall = await real.pbr('plastered_wall_04', { repeat: [24, 2], color: 0xe6dcc8 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x2a3540, roughness: .05, metalness: .9, envMapIntensity: 1.2 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x3a3a3c, roughness: .4, metalness: .7 });
  const len = 140;
  g.add(m(new THREE.BoxGeometry(len, 9, 20), wall, { pos: [0, 4.5, -10] }));
  // long glazed band with mullions
  g.add(m(new THREE.BoxGeometry(len - 2, 4.2, .2), glass, { pos: [0, 5.4, .05] }));
  for (let x = -len / 2 + 1; x <= len / 2 - 1; x += 2.4) g.add(m(new THREE.BoxGeometry(.14, 4.3, .3), frame, { pos: [x, 5.4, .12] }));
  g.add(m(new THREE.BoxGeometry(len + 2, .9, 2.2), wall, { pos: [0, 9.3, -.2] }));        // roof overhang
  g.add(m(new THREE.BoxGeometry(len, 3.2, .2), wall, { pos: [0, 1.6, .05] }));
  for (let x = -len / 2 + 6; x < len / 2; x += 12) g.add(m(new THREE.BoxGeometry(2.4, 2.6, .25), glass, { pos: [x, 1.3, .15] })); // ground floor doors
  // sign
  const sign = real.canvasTex(2048, 256, (c, w, h) => { c.fillStyle = '#e8dfcc'; c.fillRect(0, 0, w, h); c.fillStyle = '#1d3b6e'; c.font = 'bold 150px "Liberation Sans"'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.sign ?? 'BEN GURION AIRPORT', w / 2, h / 2 + 6); });
  g.add(m(new THREE.PlaneGeometry(24, 3), new THREE.MeshStandardMaterial({ map: sign, roughness: .7 }), { pos: [0, 9.3, 1.12] }));
  // control tower
  const tw = new THREE.Group(); tw.position.set(48, 0, -12); g.add(tw);
  tw.add(m(new THREE.CylinderGeometry(2.6, 3.0, 28, 24), wall, { pos: [0, 14, 0] }));
  tw.add(m(new THREE.CylinderGeometry(5.2, 3.8, 1.2, 8), wall, { pos: [0, 28.6, 0] }));
  tw.add(m(new THREE.CylinderGeometry(5.0, 5.2, 3.4, 8, 1, true), glass, { pos: [0, 30.9, 0] }));
  tw.add(m(new THREE.CylinderGeometry(5.6, 5.0, .7, 8), frame, { pos: [0, 32.9, 0] }));
  tw.add(m(new THREE.CylinderGeometry(.08, .08, 4, 6), frame, { pos: [0, 35, 0] }));
  // rooftop plant, flag poles
  for (let x = -50; x <= 50; x += 25) g.add(m(new THREE.BoxGeometry(4, 1.6, 3), std(0x9a9a96, { rough: .8, metal: .3 }), { pos: [x, 10.5, -10] }));
  // light poles along the apron edge
  for (let x = -60; x <= 60; x += 30) {
    const lp = new THREE.Group(); lp.position.set(x, 0, 14); g.add(lp);
    lp.add(m(new THREE.CylinderGeometry(.18, .3, 22, 10), frame, { pos: [0, 11, 0] }));
    lp.add(m(new THREE.BoxGeometry(3, .6, .8), frame, { pos: [0, 22.2, 0] }));
  }
  return g;
}

// ---------- A300 cabin interior (2-4-2 economy) ----------
// cabin(k, {len, rows, fill}) returns {seats:[{x,z,row,col}], group}
export async function cabin(k, o = {}) {
  const { scene } = k;
  const g = new THREE.Group(); scene.add(g);
  const len = o.len ?? 16, R = 2.64, Y = 1.35; // interior radius, floor at y=0, centre 1.35 above floor
  const wallTex = real.canvasTex(4096, 1024, (c, w, h) => {
    // uv.x along length, uv.y around (0 top .. 1 top). Cream sidewall panels with window reveals.
    c.fillStyle = '#e9e3d6'; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(0,0,0,.08)'; c.lineWidth = 3;
    for (let x = 0; x < w; x += w / len * 1.6) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
  });
  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: .7, side: THREE.BackSide });
  const zs = []; for (let z = -len / 2; z <= len / 2 + 1e-6; z += len / 24) zs.push(z);
  const cut = !!o.cutaway;  // cutaway: no roof, so a high camera can look down into the cabin
  const walls = m(cut ? tube(zs, () => R, () => Y, 48, 1, P / 2 - .25, P * 1.5 + .25) : tube(zs, () => R, () => Y, 72), wallMat, { cast: false }); g.add(walls);
  if (cut) { const rim = std(0x8a8e92, { rough: .5, metal: .6 }); for (const s of [1, -1]) g.add(m(new THREE.BoxGeometry(.12, .08, len), rim, { pos: [s * R * Math.cos(.25), Y + R * Math.sin(.25), 0] })); }
  // end bulkheads
  if (!cut) for (const z of [-len / 2, len / 2]) g.add(m(new THREE.CircleGeometry(R, 48), std(0xd8d0c0, { rough: .7 }), { pos: [0, Y, z], rot: [0, z > 0 ? P : 0, 0], cast: false }));
  // carpet
  const carpet = await real.pbr('dirty_carpet', { repeat: [3, len / 1.5], color: 0x6a6a8a });
  const fl = m(new THREE.PlaneGeometry(4.6, len), carpet, { rot: [-P / 2, 0, 0], pos: [0, 0, 0] }); g.add(fl);
  // aisle runner
  g.add(m(new THREE.PlaneGeometry(.5, len), std(0x3a3e58, { rough: .95 }), { rot: [-P / 2, 0, 0], pos: [-.55, .004, 0] }));
  g.add(m(new THREE.PlaneGeometry(.5, len), std(0x3a3e58, { rough: .95 }), { rot: [-P / 2, 0, 0], pos: [.55, .004, 0] }));
  // windows: a bright pane outside each row on both sides (sky), with a reveal frame
  const sky = new THREE.MeshBasicMaterial({ color: o.sky ?? 0xcfe2f2 });
  const reveal = std(0xd8d2c4, { rough: .6 });
  const rows = Math.floor(len / .86);
  for (let i = 0; i < rows; i++) {
    const z = -len / 2 + .5 + i * .86;
    for (const s of [1, -1]) {
      const a = -.06; const x = s * Math.cos(a) * (R - .02), y = Y + Math.sin(a) * (R - .02);
      const fr = real.rbox(.3, .42, .08, .1, reveal, { pos: [x, y, z] }); fr.rotation.y = s * P / 2; fr.rotation.x = 0; fr.rotation.z = 0; g.add(fr);
      const pane = m(new THREE.PlaneGeometry(.22, .33), sky, { pos: [x - s * .045, y, z], cast: false }); pane.rotation.y = -s * P / 2; g.add(pane);
      // outside light through the window
    }
  }
  // overhead bins: side bins over the window seats, centre bins over the middle block
  const binMat = new THREE.MeshPhysicalMaterial({ color: 0xece6d8, roughness: .45, clearcoat: .3 });
  if (!cut) for (const s of [1, -1]) {
    const bin = real.rbox(.9, .5, len, .12, binMat, { pos: [s * 1.95, 2.05, 0] }); bin.rotation.z = s * .35; g.add(bin);
    g.add(m(new THREE.BoxGeometry(.04, .03, len), std(0x9a8f7a, { rough: .5, metal: .3 }), { pos: [s * 1.55, 1.82, 0] }));
  }
  if (!cut) g.add(real.rbox(1.6, .45, len, .12, binMat, { pos: [0, 2.28, 0] }));
  // drop ceiling between the bins
  if (!cut) g.add(m(new THREE.CylinderGeometry(3.2, 3.2, len, 48, 1, true, P - .52, 1.04), new THREE.MeshStandardMaterial({ color: 0xeee9de, roughness: .7, side: THREE.BackSide }), { rot: [P / 2, 0, 0], pos: [0, -.5, 0], cast: false }));
  // ceiling light strips
  if (!cut) for (const s of [1, -1]) g.add(m(new THREE.BoxGeometry(.08, .03, len), new THREE.MeshBasicMaterial({ color: 0xfff1d8 }), { pos: [s * 1.0, 2.62, 0], cast: false }));
  // seats
  const fabric = await real.pbr('fabric_pattern_07', { repeat: [2, 2], color: o.seatColor ?? 0x4a5a8a, noMap: true });
  const cover = std(0xf2efe6, { rough: .8 });
  const arm = std(0x5a5a5e, { rough: .5, metal: .3 });
  const seats = [];
  const colsX = [-1.98, -1.5, -.72, -.24, .24, .72, 1.5, 1.98];
  // first class at the front (+z end): 2-2-2, wider leather-look seats, more legroom, behind a curtain
  const nFirst = o.first ?? 0, fRows = [];
  const firstMat = nFirst ? await real.pbr('leather_red_03', { repeat: [1, 1], color: 0x8a6a4a, noMap: true, rough: .55 }) : null;
  const ecoRows = Math.floor((len - nFirst * 1.05 - (nFirst ? .6 : 0) - .4) / .86);
  const layout = [];
  for (let i = 0; i < ecoRows; i++) layout.push({ z: -len / 2 + .9 + i * .86, cols: colsX, w: .46, mat: fabric, cls: 'eco' });
  for (let i = 0; i < nFirst; i++) layout.push({ z: len / 2 - .9 - (nFirst - 1 - i) * 1.05, cols: [-1.8, -1.2, -.32, .32, 1.2, 1.8], w: .56, mat: firstMat, cls: 'first' });
  if (nFirst) { const cz = len / 2 - .9 - nFirst * 1.05 + .2; const cur = real.canvasTex(64, 256, (c, w, h) => { c.fillStyle = '#2c3a66'; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,0,.25)'; for (let x = 0; x < w; x += 8) c.fillRect(x, 0, 3, h); });
    for (const x of [-1.11, 1.11]) g.add(m(new THREE.PlaneGeometry(.5, 1.9), new THREE.MeshStandardMaterial({ map: cur, roughness: .9, side: THREE.DoubleSide }), { pos: [x + (x > 0 ? .2 : -.2), 1.05, cz], cast: true })); }
  layout.forEach((rw, i) => {
    const z = rw.z;
    rw.cols.forEach((x, c) => {
      const sg = new THREE.Group(); sg.position.set(x, 0, z); g.add(sg);
      const fabric = rw.mat, W = rw.w;
      sg.add(real.rbox(W, .14, .48, .05, fabric, { pos: [0, .44, .02] }));
      const back = real.rbox(W, .72, .14, .05, fabric, { pos: [0, .84, -.24] }); back.rotation.x = -.12; sg.add(back);
      const hd = real.rbox(.36, .16, .02, .01, cover, { pos: [0, 1.12, -.165] }); hd.rotation.x = -.12; sg.add(hd);
      sg.add(m(new THREE.BoxGeometry(.04, .06, .44), arm, { pos: [.25, .62, -.02] }));
      sg.add(m(new THREE.BoxGeometry(.04, .38, .04), arm, { pos: [-.15, .19, .0] }));
      sg.add(m(new THREE.BoxGeometry(.04, .38, .04), arm, { pos: [.15, .19, .0] }));
      seats.push({ x, z: z + .02, row: i, col: c, cls: rw.cls, group: sg });
    });
  });
  // lights inside
  for (let z = -len / 2 + 1.5; z < len / 2; z += 3) real.lamp(scene, [0, 2.4, z], { i: o.lampI ?? 9, dist: 7, color: 0xffecd2, shadow: false });
  const hemi = new THREE.HemisphereLight(0xfff6ea, 0x4a4038, o.hemi ?? .8); scene.add(hemi);
  return { group: g, seats, Y, R, aisles: nFirst ? [-.76, .76] : [-1.11, 1.11], ecoAisles: [-1.11, 1.11] };
}

// ---------- A300 flight deck ----------
function gaugeTex() {
  return canvasTex(2048, 1024, (c, w, h) => {
    c.fillStyle = '#26292c'; c.fillRect(0, 0, w, h);
    const gauge = (x, y, r, kind) => {
      c.fillStyle = '#0b0c0d'; c.beginPath(); c.arc(x, y, r, 0, P * 2); c.fill();
      c.strokeStyle = '#8a8c8e'; c.lineWidth = r * .08; c.beginPath(); c.arc(x, y, r * .98, 0, P * 2); c.stroke();
      if (kind === 'adi') { c.save(); c.beginPath(); c.arc(x, y, r * .86, 0, P * 2); c.clip(); c.fillStyle = '#3a78c0'; c.fillRect(x - r, y - r, r * 2, r); c.fillStyle = '#7a5530'; c.fillRect(x - r, y, r * 2, r); c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r, y); c.stroke(); c.restore(); c.strokeStyle = '#ffcc00'; c.lineWidth = 6; c.beginPath(); c.moveTo(x - r * .5, y); c.lineTo(x - r * .15, y); c.moveTo(x + r * .15, y); c.lineTo(x + r * .5, y); c.stroke(); return; }
      c.strokeStyle = '#e8e8e2'; c.lineWidth = 2;
      for (let i = 0; i < 24; i++) { const a = i / 24 * P * 2; const r0 = i % 2 ? r * .74 : r * .66; c.beginPath(); c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r * .84, y + Math.sin(a) * r * .84); c.stroke(); }
      const a = (x * 7 + y * 3) % 6; c.strokeStyle = '#f2f2ee'; c.lineWidth = r * .07; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7); c.stroke();
      c.fillStyle = '#c8c8c0'; c.beginPath(); c.arc(x, y, r * .08, 0, P * 2); c.fill();
    };
    // captain / first officer panels, centre engine stack
    for (const cx of [380, 1668]) { gauge(cx - 180, 300, 90); gauge(cx, 300, 120, 'adi'); gauge(cx + 180, 300, 90); gauge(cx - 180, 540, 90); gauge(cx, 560, 120); gauge(cx + 180, 540, 90); }
    for (let r = 0; r < 5; r++) for (let i = 0; i < 2; i++) gauge(924 + i * 200, 180 + r * 150, 62);
    // annunciator lights
    for (let i = 0; i < 16; i++) { c.fillStyle = ['#2a2d20', '#d8a020', '#2a2d20', '#20c040'][i % 4]; c.fillRect(160 + i * 110, 820, 80, 34); }
    // switches
    c.fillStyle = '#b8b8b0'; for (let i = 0; i < 40; i++) c.fillRect(120 + i * 46, 920, 10, 40);
  });
}
function overheadTex() {
  return canvasTex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#2c2f33'; c.fillRect(0, 0, w, h);
    for (let y = 40; y < h; y += 120) { c.fillStyle = '#3a3e43'; c.fillRect(30, y, w - 60, 100); for (let x = 60; x < w - 60; x += 56) { c.fillStyle = '#d0d0c8'; c.fillRect(x, y + 30, 8, 36); c.fillStyle = ['#1a1d20', '#c89020', '#1a1d20', '#1a1d20', '#30b050'][(x + y) % 5]; c.fillRect(x + 16, y + 34, 26, 16); } }
  });
}
export async function flightDeck(k, o = {}) {
  const { scene } = k;
  const g = new THREE.Group(); scene.add(g);
  const panelGrey = std(0x3c4044, { rough: .6, metal: .2 }), dark = std(0x1e2023, { rough: .55, metal: .3 }), lining = std(0x8c9094, { rough: .75 });
  // shell: cylinder sector narrowing to the nose (+z forward = windows)
  const lin = canvasTex(1024, 512, (c, w, h) => { c.fillStyle = '#7e8286'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for (let x = 0; x < w; x += 128) { c.strokeRect(x + 6, 6, 116, h / 2 - 12); c.strokeRect(x + 6, h / 2 + 6, 116, h / 2 - 12); } c.fillStyle = 'rgba(255,255,255,.25)'; for (let x = 0; x < w; x += 32) for (let y = 0; y < h; y += 128) c.fillRect(x, y + 2, 3, 3); });
  g.add(m(new THREE.CylinderGeometry(2.2, 2.4, 3.6, 40, 1, true, 0, P * 2), new THREE.MeshStandardMaterial({ map: lin, color: 0xb0b4b8, roughness: .8, side: THREE.BackSide }), { rot: [P / 2, 0, 0], pos: [0, 1.1, -.2], cast: false }));
  // side consoles with circuit-breaker panels
  const cbT = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#2a2d31'; c.fillRect(0, 0, w, h); for (let y = 16; y < h; y += 26) for (let x = 12; x < w; x += 22) { c.fillStyle = '#0d0e10'; c.beginPath(); c.arc(x, y, 7, 0, P * 2); c.fill(); c.fillStyle = '#d8d8d0'; c.fillRect(x - 2, y - 2, 4, 4); } });
  for (const s of [1, -1]) { const cb = m(new THREE.PlaneGeometry(1.2, .6), new THREE.MeshStandardMaterial({ map: cbT, roughness: .5 }), { pos: [s * 1.62, 1.75, .4], rot: [0, -s * P / 2 + s * .2, 0] }); g.add(cb); g.add(real.rbox(.35, .5, 1.6, .05, panelGrey, { pos: [s * 1.25, .55, .55] })); }
  const hemi = new THREE.HemisphereLight(0xe8f0ff, 0x4a4640, o.hemi ?? 2.2); scene.add(hemi);
  g.add(m(new THREE.PlaneGeometry(4.4, 4), (await real.pbr('rubber_tiles', { repeat: [3, 3], color: 0x3a3a3a })), { rot: [-P / 2, 0, 0], pos: [0, 0, 0] }));
  // sky backdrop seen through the windscreen (gradient, a little haze at the horizon)
  const skyT = canvasTex(64, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#6f9fd6'); gr.addColorStop(.55, '#b9d3ec'); gr.addColorStop(.62, '#dfe6ea'); gr.addColorStop(.66, '#9a9486'); gr.addColorStop(1, '#6f6a5e'); c.fillStyle = gr; c.fillRect(0, 0, w, h); });
  g.add(m(new THREE.PlaneGeometry(40, 20), new THREE.MeshBasicMaterial({ map: skyT, fog: false }), { pos: [0, 2.2, 9], rot: [0, P, 0], cast: false, receive: false }));
  // front bulkhead with the window openings cut out (alpha mask), so only the windows show sky
  const holes = canvasTex(1024, 512, (c, w, h) => {
    c.fillStyle = '#8c9094'; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(0,0,0,.18)'; for (let x = 0; x < w; x += 64) c.fillRect(x, 0, 2, h);
    c.globalCompositeOperation = 'destination-out'; c.fillStyle = '#000';
    const quad = (pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x * w, y * h) : c.moveTo(x * w, y * h)); c.closePath(); c.fill(); };
    quad([[.40, .30], [.495, .26], [.495, .58], [.40, .58]]); quad([[.505, .26], [.60, .30], [.60, .58], [.505, .58]]);
    quad([[.24, .36], [.385, .31], [.385, .58], [.26, .58]]); quad([[.615, .31], [.76, .36], [.74, .58], [.615, .58]]);
    quad([[.12, .42], [.225, .38], [.235, .56], [.14, .56]]); quad([[.775, .38], [.88, .42], [.86, .56], [.765, .56]]);
  });
  g.add(m(new THREE.PlaneGeometry(4.6, 2.3), new THREE.MeshStandardMaterial({ map: holes, alphaTest: .5, roughness: .8, side: THREE.DoubleSide }), { pos: [0, 1.45, 1.78], rot: [0, P, 0], cast: false }));
  g.add(m(new THREE.PlaneGeometry(4.6, 1.4), new THREE.MeshStandardMaterial({ map: lin, color: 0xb0b4b8, roughness: .8, side: THREE.DoubleSide }), { pos: [0, 3.25, 1.7], rot: [0, P, 0], cast: false }));
  const frameMat = dark;
  const wsz = 1.62;
  // glareshield + main instrument panel with gauges
  g.add(real.rbox(3.2, .16, .5, .06, dark, { pos: [0, 1.36, wsz - .55] }));
  const gp = m(new THREE.PlaneGeometry(3.0, 1.0), new THREE.MeshStandardMaterial({ map: gaugeTex(), roughness: .45, metalness: .1, emissive: 0xffffff, emissiveMap: gaugeTex(), emissiveIntensity: .12 }), { pos: [0, .86, wsz - .74] });
  gp.rotation.set(-.12, P, 0); g.add(gp);
  g.add(m(new THREE.BoxGeometry(3.1, 1.05, .12), panelGrey, { pos: [0, .86, wsz - .67], rot: [-.12, 0, 0] }));
  // centre pedestal with throttles
  g.add(real.rbox(.6, .55, 1.3, .05, panelGrey, { pos: [0, .52, .6] }));
  for (const x of [-.12, .12]) { g.add(m(new THREE.CylinderGeometry(.015, .015, .26, 8), std(0xc8c8c0, { metal: .8, rough: .3 }), { pos: [x, .9, .75], rot: [.5, 0, 0] })); g.add(m(new THREE.BoxGeometry(.08, .05, .05), std(0x1a1a1a), { pos: [x, 1.01, .82] })); }
  // overhead panel
  const ov = m(new THREE.PlaneGeometry(1.1, 1.3), new THREE.MeshStandardMaterial({ map: overheadTex(), roughness: .5, emissive: 0xffffff, emissiveMap: overheadTex(), emissiveIntensity: .08 }), { pos: [0, 2.32, .4], rot: [P / 2 + .25, 0, 0] });
  g.add(ov);
  // flight engineer station on the right side wall
  const fe = m(new THREE.PlaneGeometry(1.4, .9), new THREE.MeshStandardMaterial({ map: gaugeTex(), roughness: .45, emissive: 0xffffff, emissiveMap: gaugeTex(), emissiveIntensity: .1 }), { pos: [-1.72, 1.2, -1.0], rot: [0, P / 2, 0] });
  g.add(fe); g.add(m(new THREE.BoxGeometry(.5, .08, 1.4), panelGrey, { pos: [-1.5, .78, -1.0] }));
  // control columns (yokes)
  for (const x of [-.55, .55]) {
    g.add(m(new THREE.CylinderGeometry(.035, .035, .62, 10), dark, { pos: [x, .55, wsz - 1.05], rot: [-.2, 0, 0] }));
    const yk = m(new THREE.TorusGeometry(.14, .022, 8, 20, P), dark, { pos: [x, .88, wsz - 1.12], rot: [0, 0, P] }); g.add(yk);
  }
  // crew seats: sheepskin covers typical of the period
  const seatMat = await real.pbr('leather_red_03', { color: 0x4a3c30, noMap: true, repeat: [1, 1] });
  const fleece = std(0xcfc3a8, { rough: 1 });
  const seats = [];
  for (const [x, z, ry] of [[.55, .1, 0], [-.55, .1, 0], [-1.05, -1.0, -P / 2 + .3]]) {
    const s = new THREE.Group(); s.position.set(x, 0, z); s.rotation.y = ry; g.add(s);
    s.add(m(new THREE.CylinderGeometry(.06, .1, .35, 10), dark, { pos: [0, .17, 0] }));
    s.add(real.rbox(.52, .12, .5, .05, fleece, { pos: [0, .45, 0] }));
    const bk = real.rbox(.5, .78, .12, .05, seatMat, { pos: [0, .9, -.28] }); bk.rotation.x = -.15; s.add(bk);
    s.add(m(new THREE.BoxGeometry(.06, .06, .4), dark, { pos: [.3, .66, -.02] })); s.add(m(new THREE.BoxGeometry(.06, .06, .4), dark, { pos: [-.3, .66, -.02] }));
    seats.push({ x, z, ry, group: s });
  }
  // cockpit door behind
  const door = new THREE.Group(); door.position.set(-.5, 0, -1.9); g.add(door);
  const leaf = real.rbox(.8, 1.95, .05, .02, std(0x6a6e72, { rough: .6 }), { pos: [.4, .98, 0] }); door.add(leaf);
  door.add(m(new THREE.CylinderGeometry(.02, .02, .14, 8), std(0xc8c8c0, { metal: .8, rough: .3 }), { pos: [.72, 1.0, .05], rot: [P / 2, 0, 0] }));
  door.setOpen = a => { door.rotation.y = -a * 1.4; };
  g.door = door;
  // light: soft daylight from the windscreen plus dim panel glow
  const day = new THREE.DirectionalLight(0xfff4e2, o.dayI ?? 2.2); day.position.set(.8, 4, 6); day.target.position.set(0, .8, 0); day.castShadow = true;
  Object.assign(day.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: .5, far: 20 }); day.shadow.mapSize.set(2048, 2048); day.shadow.radius = 4; day.shadow.bias = -.0005;
  scene.add(day, day.target);
  real.lamp(scene, [0, 2.1, -.6], { i: 3, dist: 5, color: 0xffe2c0 });
  real.lamp(scene, [0, 1.6, 1.2], { i: 2, dist: 3, color: 0xdfe8ff });
  return { group: g, seats, door };
}

export { tube, wing, lathe, wheel };
