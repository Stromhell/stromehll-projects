// Props and sets in the house 3D look: toon shading, ink outlines, no logos.
import * as THREE from 'three';
import { toon, mesh, box, cyl, sph, group, outline, textPlane, rng, INK, basic } from './core.js';

const P = Math.PI;
// ---------- ground + sets ----------
export function ground(c = 0x8a7a5a, size = 600, o = {}) {
  const g = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), toon(c));
  g.rotation.x = -P / 2; g.receiveShadow = true; g.userData.noOutline = true;
  if (o.y) g.position.y = o.y;
  return g;
}
export function runway(len = 300, w = 45, o = {}) {
  const g = new THREE.Group();
  const tar = new THREE.Mesh(new THREE.PlaneGeometry(w, len), toon(o.color ?? 0x4a4946)); tar.rotation.x = -P / 2; tar.position.y = .02; tar.receiveShadow = true; tar.userData.noOutline = true; g.add(tar);
  for (let z = -len / 2 + 8; z < len / 2; z += 14) { const m = new THREE.Mesh(new THREE.PlaneGeometry(.8, 6), basic(0xd8d4c4)); m.rotation.x = -P / 2; m.position.set(0, .04, z); m.userData.noOutline = true; g.add(m); }
  g.lamps = [];
  if (o.lamps !== false) for (let z = -len / 2; z <= len / 2; z += 12) for (const sx of [-1, 1]) {
    const l = new THREE.Mesh(new THREE.SphereGeometry(.22, 8, 6), new THREE.MeshBasicMaterial({ color: o.lampColor ?? 0xffd27a }));
    l.position.set(sx * (w / 2 + .5), .25, z); l.userData.noOutline = true; g.add(l); g.lamps.push(l);
  }
  return g;
}
// hand-placed runway lamps (soldiers place them in 8.4)
export function lamp(color = 0xffcf6a) { const g = group(cyl(.12, .16, .25, 0x2a2a2a, { pos: [0, .12, 0] })); const b = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), basic(color)); b.position.y = .3; b.userData.noOutline = true; g.add(b); g.bulb = b; return outline(g, .015); }

// ---------- aircraft ----------
// Lockheed C-130 Hercules style: high wing, 4 props, T-tail upswept, rear ramp
export function c130(o = {}) {
  const col = o.color ?? 0x6c6a52, dark = 0x3f3e30;
  const g = new THREE.Group();
  const fus = mesh(new THREE.CapsuleGeometry(2.1, 20, 8, 20), col); fus.rotation.x = P / 2; fus.scale.set(1, 1, .95); fus.position.y = 2.6; g.add(fus);
  const nose = sph(2.1, col, { pos: [0, 2.4, 12], scale: [1, .9, 1.25] }); g.add(nose);
  // cockpit windows
  for (const sx of [-.9, -.3, .3, .9]) g.add(box(.5, .35, .1, 0x1d2836, { pos: [sx, 3.75, 13.1], rot: [-.5, 0, 0], noOutline: true }));
  // wing on top
  const wing = box(40, .45, 4.2, col, { pos: [0, 4.7, 2] }); g.add(wing);
  g.props = [];
  for (const x of [-14, -7, 7, 14]) {
    const nac = cyl(.75, .7, 4.8, dark, { pos: [x, 4.3, 3.8], rot: [P / 2, 0, 0] }); g.add(nac);
    const hub = new THREE.Group(); hub.position.set(x, 4.3, 6.3);
    hub.add(sph(.4, 0x2a2a2a));
    for (let i = 0; i < 4; i++) { const b = box(.35, 4.2, .08, 0x1e1e1e, { pos: [0, 0, 0] }); b.rotation.z = i * P / 2; b.geometry.translate(0, 2.1, 0); hub.add(b); }
    g.add(hub); g.props.push(hub);
  }
  // tail
  const tailboom = mesh(new THREE.CylinderGeometry(1.4, 2.0, 7, 16), col); tailboom.rotation.x = P / 2 - .12; tailboom.position.set(0, 3.3, -13); g.add(tailboom);
  g.add(box(.45, 7.5, 4, col, { pos: [0, 7.2, -15.4], rot: [-.25, 0, 0] }));
  g.add(box(13, .35, 2.6, col, { pos: [0, 4.5, -16] }));
  // landing gear pods
  for (const sx of [-1, 1]) g.add(box(.9, 1.6, 6, dark, { pos: [sx * 2.2, 1.0, 1] }));
  for (const [x, z] of [[-1.6, 2.5], [1.6, 2.5], [-1.6, -.5], [1.6, -.5], [0, 10]]) g.add(cyl(.55, .55, .5, 0x1a1a1a, { pos: [x, .55, z], rot: [0, 0, P / 2] }));
  // rear ramp (hinged)
  const ramp = new THREE.Group(); ramp.position.set(0, 1.0, -10.5);
  const rp = box(3.4, .25, 6.5, col); rp.position.z = -3.25; ramp.add(rp); g.add(ramp); g.ramp = ramp;
  // cargo bay shown when cutaway
  outline(g, .06);
  g.spin = (t, speeds = [1, 1, 1, 1]) => g.props.forEach((h, i) => h.rotation.z = t * 28 * speeds[i]);
  g.setRamp = k => ramp.rotation.x = -k * .42; // 0 closed, 1 down to ground
  g.setRamp(o.ramp ?? 0);
  return g;
}

// wide-body twin jet (A300-like) or 4-engine 707-like; plain livery, no logos
export function airliner(o = {}) {
  const four = o.engines === 4, len = o.len ?? (four ? 22 : 26), col = o.color ?? 0xeeeeea;
  const g = new THREE.Group();
  const fus = mesh(new THREE.CapsuleGeometry(1.9, len, 8, 22), col); fus.rotation.x = P / 2; fus.position.y = 3; g.add(fus);
  g.add(box(.05, .5, len * .9, o.stripe ?? 0x2f6fe0, { pos: [1.92, 3.2, 0], noOutline: true })); g.add(box(.05, .5, len * .9, o.stripe ?? 0x2f6fe0, { pos: [-1.92, 3.2, 0], noOutline: true }));
  for (let z = -len / 2 + 3; z < len / 2 - 2; z += 1.2) for (const sx of [-1, 1]) g.add(box(.05, .32, .32, 0x223044, { pos: [sx * 1.93, 3.75, z], noOutline: true }));
  g.add(box(1.6, .45, .1, 0x1d2836, { pos: [0, 3.9, len / 2 + 1.6], rot: [-.6, 0, 0], noOutline: true }));
  const span = four ? 34 : 36;
  const wingG = new THREE.Group(); wingG.position.set(0, 2.2, 0);
  for (const sx of [-1, 1]) { const w = box(span / 2, .35, 4.5, col); w.position.set(sx * span / 4, 0, 0); w.rotation.y = -sx * .35; wingG.add(w); }
  g.add(wingG);
  const engX = four ? [-12, -6.5, 6.5, 12] : [-6.5, 6.5];
  for (const x of engX) { g.add(cyl(.85, .75, 3.6, 0xc8c8c4, { pos: [x, 1.2, 2.4 - Math.abs(x) * .3], rot: [P / 2, 0, 0] })); g.add(cyl(.62, .62, .1, 0x222222, { pos: [x, 1.2, 4.2 - Math.abs(x) * .3], rot: [P / 2, 0, 0], noOutline: true })); }
  g.add(box(.4, 6, 4.5, o.tail ?? col, { pos: [0, 6.5, -len / 2 - 1], rot: [-.35, 0, 0] }));
  g.add(box(11, .3, 2.6, col, { pos: [0, 3.6, -len / 2 - 1.2] }));
  for (const [x, z] of [[-2.4, -1], [2.4, -1], [0, len / 2 - 1]]) g.add(cyl(.55, .55, .5, 0x1a1a1a, { pos: [x, .55, z], rot: [0, 0, P / 2] }));
  outline(g, .06);
  return g;
}
// MiG-21 style fighter, small, delta wing
export function mig(o = {}) {
  const col = o.color ?? 0x8a8f8a; const g = new THREE.Group();
  const f = mesh(new THREE.CylinderGeometry(.6, .8, 11, 14), col); f.rotation.x = P / 2; f.position.y = 1.6; g.add(f);
  const n = mesh(new THREE.ConeGeometry(.6, 2.2, 14), col); n.rotation.x = P / 2; n.position.set(0, 1.6, 6.6); g.add(n);
  const shape = new THREE.Shape(); shape.moveTo(0, 2); shape.lineTo(3.6, -2.5); shape.lineTo(-3.6, -2.5); shape.lineTo(0, 2);
  const wg = mesh(new THREE.ExtrudeGeometry(shape, { depth: .15, bevelEnabled: false }), col); wg.rotation.x = -P / 2; wg.position.set(0, 1.4, -1); g.add(wg);
  g.add(box(.15, 2.4, 2.2, col, { pos: [0, 2.8, -4.5], rot: [-.4, 0, 0] }));
  g.add(sph(.45, 0x2a3a4a, { pos: [0, 2.2, 2.8], scale: [1, .8, 2] }));
  for (const [x, z] of [[-1.2, -1], [1.2, -1], [0, 4]]) g.add(cyl(.3, .3, .25, 0x1a1a1a, { pos: [x, .3, z], rot: [0, 0, P / 2] }));
  return outline(g, .04);
}

// ---------- vehicles ----------
export function mercedes(o = {}) {
  const col = o.color ?? 0x15161a; const g = new THREE.Group();
  g.add(box(4.8, .7, 1.9, col, { pos: [0, .75, 0] }));
  // open cabin: roof on pillars with see-through glass, so people inside show
  g.add(box(2.4, .08, 1.75, col, { pos: [-.25, 2.0, 0] }));
  for (const [x, z] of [[1.0, .84], [1.0, -.84], [-.25, .84], [-.25, -.84], [-1.4, .84], [-1.4, -.84]]) g.add(box(.08, .9, .07, col, { pos: [x, 1.55, z], rot: [0, 0, x > .5 ? -.4 : x < -1 ? .35 : 0] }));
  const glass = new THREE.MeshBasicMaterial({ color: 0x9ab4d0, transparent: true, opacity: .16, depthWrite: false });
  for (const sx of [-1, 1]) { const gp = new THREE.Mesh(new THREE.PlaneGeometry(2.3, .84), glass); gp.position.set(-.2, 1.55, sx * .88); gp.userData.noOutline = true; g.add(gp); }
  g.add(box(4.8, .05, 1.85, 0x3a2a22, { pos: [0, 1.1, 0], noOutline: true })); // seats level
  for (const x of [.2, -.9]) g.add(box(.5, .5, 1.6, 0x5a3a2a, { pos: [x - .2, 1.2, 0] })); // seat backs
  g.add(box(.08, .35, 1.2, 0xbfbfbf, { pos: [2.42, .8, 0] })); // grille
  for (const z of [-.6, .6]) { const h = new THREE.Mesh(new THREE.CircleGeometry(.17, 14), new THREE.MeshBasicMaterial({ color: o.lights ? 0xfff2c8 : 0x777777 })); h.position.set(2.44, .85, z); h.rotation.y = P / 2; h.userData.noOutline = true; g.add(h); }
  g.wheels = [];
  for (const [x, z] of [[1.5, .95], [1.5, -.95], [-1.5, .95], [-1.5, -.95]]) { const w = cyl(.38, .38, .28, 0x111111, { pos: [x, .38, z], rot: [P / 2, 0, 0] }); g.add(w); g.wheels.push(w); }
  if (o.flags) for (const z of [-.7, .7]) { g.add(cyl(.02, .02, .5, 0x999999, { pos: [2.2, 1.35, z] })); g.add(box(.02, .28, .4, o.flagColor ?? 0x6b7a3a, { pos: [2.2, 1.5, z + .2], noOutline: true })); }
  outline(g, .03);
  g.roll = d => g.wheels.forEach(w => w.rotation.y = d / .38);
  return g;
}
export function landRover(o = {}) {
  const col = o.color ?? 0x6b6e4a; const g = new THREE.Group();
  g.add(box(4, 1.0, 1.8, col, { pos: [0, .95, 0] }));
  g.add(box(.6, .5, 1.7, 0x24303c, { pos: [.5, 1.7, 0], noOutline: true }));
  for (const sx of [-1, 1]) g.add(cyl(.025, .025, .9, 0x333333, { pos: [.5, 1.9, sx * .8] }));
  g.wheels = [];
  for (const [x, z] of [[1.3, .9], [1.3, -.9], [-1.3, .9], [-1.3, -.9]]) { const w = cyl(.42, .42, .32, 0x111111, { pos: [x, .42, z], rot: [P / 2, 0, 0] }); g.add(w); g.wheels.push(w); }
  g.add(cyl(.02, .02, 1.6, 0x444444, { pos: [-1.6, 2.1, .6] }));
  outline(g, .03); g.roll = d => g.wheels.forEach(w => w.rotation.y = d / .42);
  return g;
}
export function truck(o = {}) {
  const col = o.color ?? 0x5d6440; const g = new THREE.Group();
  g.add(box(1.9, 1.7, 2.2, col, { pos: [2.6, 1.4, 0] }));
  g.add(box(4.2, .4, 2.2, 0x3a3a30, { pos: [-.5, .8, 0] }));
  g.add(box(4.2, 1.9, 2.2, o.back ?? 0x7a7a58, { pos: [-.5, 1.95, 0] }));
  if (o.tank) { g.children.pop(); g.add(cyl(1, 1, 4.2, o.back ?? 0xd8d0b8, { pos: [-.5, 2, 0], rot: [0, 0, P / 2] })); }
  if (o.cross) { g.add(box(.02, .9, .3, 0xc8302a, { pos: [-.5, 2.1, 1.11], noOutline: true })); g.add(box(.02, .3, .9, 0xc8302a, { pos: [-.5, 2.1, 1.11], noOutline: true })); }
  g.wheels = [];
  for (const [x, z] of [[2.4, 1.05], [2.4, -1.05], [-1.6, 1.05], [-1.6, -1.05]]) { const w = cyl(.45, .45, .3, 0x111111, { pos: [x, .45, z], rot: [P / 2, 0, 0] }); g.add(w); g.wheels.push(w); }
  outline(g, .03); g.roll = d => g.wheels.forEach(w => w.rotation.y = d / .45);
  return g;
}

// ---------- buildings ----------
// old Entebbe terminal: two storeys, long, flat roof, small tower on top
export function terminal(o = {}) {
  const g = new THREE.Group(), L = o.len ?? 60, col = o.color ?? 0xd8cdb0, trim = 0x8a7a5a;
  g.add(box(L, 8, 14, col, { pos: [0, 4, 0] }));
  g.add(box(L + 1, .6, 15, trim, { pos: [0, 8.2, 0] }));
  g.add(box(L * .9, .4, 3, trim, { pos: [0, 3.4, 8.2] })); // canopy
  for (let x = -L / 2 + 3; x < L / 2 - 1; x += 3.2) for (const y of [2, 5.8]) {
    const lit = o.lit && o.lit(x, y);
    g.add(box(1.8, 1.6, .1, lit ? 0xffd890 : 0x2c3440, { pos: [x, y, 7.05], noOutline: true, ...(lit ? { emissive: 0xffc070, ei: .9 } : {}) }));
  }
  g.add(box(4, 5, 4, col, { pos: [L / 2 - 6, 10.5, 0] })); g.add(box(5, 2, 5, 0x3a4a52, { pos: [L / 2 - 6, 14, 0] }));
  return outline(g, .05);
}
export function tower(o = {}) {
  const g = new THREE.Group(); const col = o.color ?? 0xd0c6aa;
  g.add(cyl(2.2, 2.6, 22, col, { pos: [0, 11, 0], seg: 12 }));
  g.add(cyl(4, 3.4, 3.4, 0x2c3a44, { pos: [0, 23.5, 0], seg: 12 }));
  if (o.lit) g.add(cyl(3.9, 3.3, 2.2, 0xffd890, { pos: [0, 23.5, 0], seg: 12, emissive: 0xffc070, ei: 1, noOutline: true }));
  g.add(cyl(4.4, 4.4, .5, col, { pos: [0, 25.4, 0], seg: 12 }));
  return outline(g, .05);
}
export function govBuilding(o = {}) {
  const g = new THREE.Group(); const col = o.color ?? 0xcfc4a8;
  g.add(box(40, 18, 14, col, { pos: [0, 9, 0] }));
  const r = rng(o.seed ?? 4);
  for (let x = -18; x <= 18; x += 3) for (let y = 3; y < 17; y += 3.4) { const lit = o.night && r() < .45; g.add(box(1.6, 2, .1, lit ? 0xffd890 : 0x2c3440, { pos: [x, y, 7.05], noOutline: true, ...(lit ? { emissive: 0xffc070, ei: .9 } : {}) })); }
  g.add(box(8, 5, 2, 0x8a7a5a, { pos: [0, 2.5, 7.5] }));
  return outline(g, .05);
}
export function palm(o = {}) {
  const g = new THREE.Group(); const h = o.h ?? 7;
  const tr = cyl(.18, .28, h, 0x7a5a3a, { pos: [0, h / 2, 0] }); tr.rotation.z = .08; g.add(tr);
  for (let i = 0; i < 7; i++) { const l = box(3.2, .06, .7, 0x4a7a3a, { pos: [0, h, 0] }); l.geometry.translate(1.6, 0, 0); l.rotation.set(0, i / 7 * P * 2, -.35); g.add(l); }
  return outline(g, .03);
}
export function treeLine(n = 20, o = {}) { const g = new THREE.Group(); const r = rng(o.seed ?? 9); for (let i = 0; i < n; i++) { const p = palm({ h: 5 + r() * 4 }); p.position.set((r() - .5) * (o.spread ?? 200), 0, (r() - .5) * (o.depth ?? 20)); g.add(p); } return g; }

// ---------- interiors ----------
export function room(w, d, h, o = {}) {
  const g = new THREE.Group();
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(w, d), toon(o.floor ?? 0x8a7458)); fl.rotation.x = -P / 2; fl.receiveShadow = true; fl.userData.noOutline = true; g.add(fl);
  const wm = toon(o.wall ?? 0xd8ccb0);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wm); back.position.set(0, h / 2, -d / 2); back.receiveShadow = true; back.userData.noOutline = true; g.add(back);
  if (o.sides !== false) for (const sx of [-1, 1]) { const s = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wm); s.position.set(sx * w / 2, h / 2, 0); s.rotation.y = -sx * P / 2; s.receiveShadow = true; s.userData.noOutline = true; g.add(s); }
  g.add(box(w, .25, .1, o.trim ?? 0x6a5a44, { pos: [0, .12, -d / 2 + .06], noOutline: true }));
  return g;
}
export function table(w = 2, d = 1, o = {}) {
  const g = new THREE.Group(), h = o.h ?? .78, col = o.color ?? 0x7a5236;
  g.add(box(w, .08, d, col, { pos: [0, h, 0] }));
  for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) g.add(box(.08, h, .08, col, { pos: [x * (w / 2 - .1), h / 2, z * (d / 2 - .1)] }));
  return outline(g, .02);
}
export function chair(o = {}) {
  const g = new THREE.Group(), col = o.color ?? 0x5a3e2a;
  g.add(box(.5, .06, .5, col, { pos: [0, .46, 0] })); g.add(box(.5, .6, .06, col, { pos: [0, .78, -.22] }));
  for (const [x, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) g.add(box(.05, .46, .05, col, { pos: [x * .2, .23, z * .2] }));
  return outline(g, .015);
}
export function seatRow(o = {}) { // aircraft seats, 3 abreast
  const g = new THREE.Group(); const col = o.color ?? 0x4a5a7a;
  for (let i = 0; i < (o.n ?? 3); i++) { const x = i * .55; g.add(box(.5, .12, .5, col, { pos: [x, .45, 0] })); g.add(box(.5, .75, .12, col, { pos: [x, .85, -.24] })); g.add(box(.3, .12, .04, 0xf0ece0, { pos: [x, 1.15, -.28], noOutline: true })); }
  return outline(g, .015);
}
export function mattress(o = {}) { const g = group(box(.9, .14, 1.95, o.color ?? 0xd8d0b8, { pos: [0, .07, 0] }), box(.6, .1, .3, 0xf2eee4, { pos: [0, .17, -.75] })); return outline(g, .015); }
export function door(o = {}) {
  const g = new THREE.Group(); const fr = o.frame ?? 0x6a5a44;
  g.add(box(.12, 2.3, .15, fr, { pos: [-.62, 1.15, 0] })); g.add(box(.12, 2.3, .15, fr, { pos: [.62, 1.15, 0] })); g.add(box(1.36, .14, .15, fr, { pos: [0, 2.35, 0] }));
  const hinge = new THREE.Group(); hinge.position.set(-.56, 0, 0); const leaf = box(1.12, 2.24, .06, o.color ?? 0x8a6a48); leaf.position.set(.56, 1.12, 0); hinge.add(leaf);
  hinge.add(sph(.05, 0xd9b13b, { pos: [1.0, 1.1, .06] })); g.add(hinge); g.leaf = hinge;
  g.setOpen = k => hinge.rotation.y = -k * 1.6;
  return outline(g, .015);
}
export function phone(o = {}) { const g = group(box(.26, .1, .22, o.color ?? 0x1a1a1a, { pos: [0, .05, 0] }), cyl(.07, .07, .02, 0xd8d0b8, { pos: [0, .11, .03], noOutline: true }), box(.3, .06, .07, o.color ?? 0x1a1a1a, { pos: [0, .14, -.06] })); return outline(g, .01); }
export function easel(o = {}) {
  const g = new THREE.Group();
  for (const sx of [-1, 1]) { const l = box(.06, 2, .06, 0x6a4a2a, { pos: [sx * .5, 1, 0] }); l.rotation.z = sx * .12; g.add(l); }
  const board = box(1.3, .9, .05, o.color ?? 0xece4d0, { pos: [0, 1.5, .05] }); g.add(board); g.board = board;
  return outline(g, .015);
}
export function tv(o = {}) { const g = group(box(1.1, .85, .7, 0x5a3e2a, { pos: [0, .9, 0] }), box(.85, .62, .02, 0x9ab0b8, { pos: [-.05, .92, .36], noOutline: true, emissive: 0x8aa0a8, ei: .5 }), box(.08, .45, .08, 0x3a2a1a, { pos: [-.4, .22, 0] }), box(.08, .45, .08, 0x3a2a1a, { pos: [.4, .22, 0] })); return outline(g, .015); }
export function clock(o = {}) {
  const g = new THREE.Group(); g.add(cyl(.5, .5, .08, 0xf2eee4, { rot: [P / 2, 0, 0], seg: 32 })); g.add(mesh(new THREE.TorusGeometry(.5, .05, 8, 32), 0x3a2a1a));
  const hh = box(.05, .26, .02, INK, { noOutline: true }); hh.geometry.translate(0, .13, 0); hh.position.z = .06; g.add(hh);
  const mh = box(.035, .4, .02, INK, { noOutline: true }); mh.geometry.translate(0, .2, 0); mh.position.z = .07; g.add(mh);
  g.set = (h, m) => { hh.rotation.z = -(h % 12 + m / 60) / 12 * P * 2; mh.rotation.z = -m / 60 * P * 2; };
  return g;
}
export function candle() { const g = group(cyl(.06, .06, .5, 0xf2ead8, { pos: [0, .25, 0] })); const f = new THREE.Mesh(new THREE.SphereGeometry(.05, 10, 8), basic(0xffc860)); f.scale.y = 1.8; f.position.y = .58; f.userData.noOutline = true; g.add(f); g.flame = f; const pl = new THREE.PointLight(0xffb050, 1.2, 4); pl.position.y = .7; g.add(pl); g.light = pl; return g; }
export function flag(colors, o = {}) {
  const g = new THREE.Group(); g.add(cyl(.04, .04, o.pole ?? 3, 0x9a9a9a, { pos: [0, (o.pole ?? 3) / 2, 0] }));
  const c = document.createElement('canvas'); c.width = 240; c.height = 160; const x = c.getContext('2d');
  colors.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, i * 160 / colors.length, 240, 160 / colors.length); });
  if (o.draw) o.draw(x);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const geo = new THREE.PlaneGeometry(1.5, 1, 12, 4);
  const cloth = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ map: t, side: THREE.DoubleSide })); cloth.position.set(.77, (o.pole ?? 3) - .55, 0); cloth.userData.noOutline = true; g.add(cloth);
  const base = geo.attributes.position.array.slice();
  g.wave = tm => { const a = geo.attributes.position; for (let i = 0; i < a.count; i++) { const X = base[i * 3]; a.array[i * 3 + 2] = Math.sin(X * 3 + tm * 4) * .08 * (X + .75); } a.needsUpdate = true; };
  return g;
}
// newspaper with a headline; returns a plane
export function newspaper(head, sub = '') {
  const c = document.createElement('canvas'); c.width = 600; c.height = 800; const x = c.getContext('2d');
  x.fillStyle = '#efe8d6'; x.fillRect(0, 0, 600, 800);
  x.fillStyle = '#2b1e16'; x.font = '40px "Anton"'; x.textAlign = 'center'; x.fillText('THE DAILY NEWS', 300, 60); x.fillRect(30, 80, 540, 4);
  x.font = '64px "Anton"'; const words = head.split(' '); let line = '', y = 160;
  for (const w of words) { if (x.measureText(line + w).width > 520) { x.fillText(line, 300, y); y += 72; line = ''; } line += w + ' '; } x.fillText(line, 300, y);
  x.font = '28px "Oswald"'; x.fillText(sub, 300, y + 56);
  x.fillStyle = '#b8b0a0'; for (let i = 0; i < 14; i++) x.fillRect(40 + (i % 2) * 275, y + 100 + Math.floor(i / 2) * 50, 245, 14);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2), new THREE.MeshToonMaterial({ map: t, side: THREE.DoubleSide })); m.userData.noOutline = true; m.castShadow = true;
  return m;
}
// generic paper card (for photos, documents, telegram)
export function card(text, o = {}) {
  const c = document.createElement('canvas'); c.width = o.cw ?? 800; c.height = o.ch ?? 500; const x = c.getContext('2d');
  x.fillStyle = o.bg ?? '#efe6cf'; x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = '#2b1e16'; x.lineWidth = 10; x.strokeRect(5, 5, c.width - 10, c.height - 10);
  x.fillStyle = o.color ?? '#2b1e16'; x.textAlign = 'center'; x.textBaseline = 'middle';
  const lines = String(text).split('\n'); const fs = o.size ?? 70;
  lines.forEach((l, i) => { x.font = `${i && o.sub ? '600 ' + fs * .6 + 'px "Oswald"' : fs + 'px "' + (o.font ?? 'Anton') + '"'}`; x.fillText(l, c.width / 2, c.height / 2 + (i - (lines.length - 1) / 2) * fs * 1.2); });
  if (o.draw) o.draw(x, c);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const h = o.h ?? 1, m = new THREE.Mesh(new THREE.BoxGeometry(h * c.width / c.height, h, .02), [0, 0, 0, 0, 1, 0].map(f => f ? new THREE.MeshToonMaterial({ map: t }) : toon(0xd8ccb0)));
  m.castShadow = true; return outline(m, .01);
}
export function blueprint(o = {}) {
  const c = document.createElement('canvas'); c.width = 1200; c.height = 800; const x = c.getContext('2d');
  x.fillStyle = '#1f4f8a'; x.fillRect(0, 0, 1200, 800); x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 4;
  x.strokeRect(150, 250, 900, 300); for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(150 + i * 150, 250); x.lineTo(150 + i * 150, 550); x.stroke(); }
  x.strokeRect(820, 150, 160, 100); x.lineWidth = 2; for (let i = 0; i < 30; i++) { x.beginPath(); x.moveTo(0, i * 28); x.lineTo(1200, i * 28); x.strokeStyle = 'rgba(255,255,255,.08)'; x.stroke(); }
  x.fillStyle = '#fff'; x.font = '44px "Anton"'; x.textAlign = 'right'; x.fillText(o.label ?? 'SOLEL BONEH', 1160, 760);
  x.font = '30px "Oswald"'; x.textAlign = 'left'; x.fillText('OLD TERMINAL · ENTEBBE', 40, 60);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), new THREE.MeshToonMaterial({ map: t, side: THREE.DoubleSide })); m.userData.noOutline = true; m.receiveShadow = true; return m;
}
export function gauge(label, o = {}) {
  const g = new THREE.Group(); g.add(cyl(.6, .6, .1, 0x2b2b2b, { rot: [P / 2, 0, 0], seg: 32 }));
  const face = textPlane(label, .18, { size: 40, color: '#f4ead3' }); face.position.set(0, -.28, .07); g.add(face);
  const n = box(.04, .5, .02, o.needle ?? 0xd9452b, { noOutline: true }); n.geometry.translate(0, .22, 0); n.position.z = .08; g.add(n); g.needle = n;
  for (let i = 0; i <= 8; i++) { const tk = box(.02, .08, .01, 0xf4ead3, { noOutline: true }); const a = -P * .75 + i / 8 * P * 1.5; tk.position.set(Math.sin(a) * .5, Math.cos(a) * .5, .07); tk.rotation.z = -a; g.add(tk); }
  g.set = k => n.rotation.z = P * .75 - k * P * 1.5;
  return outline(g, .02);
}
export function stretcher() { return outline(group(box(.6, .08, 2, 0x6b7044, { pos: [0, .5, 0] }), ...[[-.3, -1], [.3, -1], [-.3, 1], [.3, 1]].map(([x, z]) => box(.04, .5, .04, 0x888888, { pos: [x, .25, z * .9] }))), .015); }
export function podium() { return outline(group(box(1, 1.15, .7, 0x5a3e2a, { pos: [0, .58, 0] }), cyl(.015, .015, .4, 0x333333, { pos: [0, 1.35, .2] }), sph(.05, 0x222222, { pos: [0, 1.55, .25] })), .02); }
export function hospitalBed() { return outline(group(box(1, .15, 2.1, 0xf0ece4, { pos: [0, .7, 0] }), box(1, .5, .08, 0xbfc6c8, { pos: [0, .95, -1.05] }), box(.6, .1, .35, 0xffffff, { pos: [0, .82, -.8] }), ...[[-.45, -1], [.45, -1], [-.45, 1], [.45, 1]].map(([x, z]) => box(.05, .65, .05, 0x999999, { pos: [x, .32, z] }))), .015); }
export function curtain(w = 2.4, h = 2.4, col = 0xa8c0b8) { const g = new THREE.Group(); const geo = new THREE.PlaneGeometry(w, h, 24, 1); const a = geo.attributes.position; for (let i = 0; i < a.count; i++) a.setZ(i, Math.sin(a.getX(i) * 9) * .06); geo.computeVertexNormals(); const m = new THREE.Mesh(geo, new THREE.MeshToonMaterial({ color: col, side: THREE.DoubleSide })); m.position.y = h / 2; m.userData.noOutline = true; g.add(m); return g; }
export function megaphone() { const g = new THREE.Group(); const c = mesh(new THREE.CylinderGeometry(.18, .05, .45, 14, 1, true), toon(0xd8d0b8, { mat: { side: THREE.DoubleSide } })); c.rotation.x = P / 2; g.add(c); return g; }
export function radio() { return outline(group(box(.5, .35, .3, 0x4a5236, { pos: [0, .18, 0] }), cyl(.01, .01, .9, 0x222222, { pos: [.18, .8, 0] }), box(.12, .08, .02, 0x9ad08a, { pos: [-.1, .25, .16], noOutline: true, emissive: 0x7ac06a, ei: .8 })), .012); }
export function passports(n = 8) { const g = new THREE.Group(); const cols = [0x2a3a6a, 0x6a2a2a, 0x2a5a3a, 0x4a3a2a]; for (let i = 0; i < n; i++) g.add(box(.16, .02, .22, cols[i % 4], { pos: [(i % 2) * .02, .02 * i, 0], rot: [0, i * .15, 0] })); return outline(g, .006); }
export function stars(n = 400, spread = 200) { const r = rng(11), pts = []; for (let i = 0; i < n; i++) pts.push((r() - .5) * spread, r() * spread * .5, -spread * .5 - r() * 50); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false })); }
// cloud tops: soft white blobs
export function clouds(n = 40, o = {}) { const g = new THREE.Group(); const r = rng(o.seed ?? 5); const m = toon(o.color ?? 0x8a94b8); for (let i = 0; i < n; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(4 + r() * 6, 12, 8), m); s.scale.y = .35; s.position.set((r() - .5) * (o.w ?? 300), (o.y ?? -20) + r() * 3, (r() - .5) * (o.d ?? 300)); s.userData.noOutline = true; g.add(s); } return g; }
// muzzle flash / light flash: a star sprite that can be pulsed
export function flash(color = 0xfff0b0, size = 1) { const s = new THREE.Mesh(new THREE.OctahedronGeometry(size * .5, 0), new THREE.MeshBasicMaterial({ color, transparent: true })); s.scale.set(1, 1, .2); s.userData.noOutline = true; const l = new THREE.PointLight(color, 0, 30 * size); s.add(l); s.pulse = k => { s.visible = k > .01; s.material.opacity = k; s.scale.set(k * 1.5, k * 1.5, .2); l.intensity = k * 40; }; s.pulse(0); return s; }
export function smoke(o = {}) { const g = new THREE.Group(); const r = rng(o.seed ?? 2); const m = new THREE.MeshToonMaterial({ color: o.color ?? 0x5a5a5a, transparent: true, opacity: .75 }); for (let i = 0; i < (o.n ?? 12); i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), m); s.userData = { ph: r(), dx: (r() - .5) * 2, noOutline: true }; g.add(s); } g.update = t => g.children.forEach(s => { const k = (t * .25 + s.userData.ph) % 1; s.position.set(s.userData.dx * k * 3, k * (o.h ?? 10), 0); s.scale.setScalar(.6 + k * (o.size ?? 3)); }); g.update(0); return g; }
