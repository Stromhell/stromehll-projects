// Realistic sets, part 2 (Operation Thunderbolt, acts 0 and 3-9):
// C-130 Hercules, black Mercedes, Land Rover, Entebbe old terminal (night), the hostage hall, a night runway.
// Metres; vehicles and aircraft face +z.
import * as THREE from 'three';
import * as real from './real.js';
import { tube, wing, lathe, wheel } from './sets.js';

const { m, std, box, rbox, canvasTex } = real;
const P = Math.PI;
const shadowAll = g => { g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return g; };

// ---------- C-130H Hercules (IAF desert camouflage) ----------
// length 29.8 m, span 40.4 m, tail height 11.6 m. userData: props[], setProps(rpm[4]), ramp (rotate .rotation.x), rampOpen(a 0..1)
export function c130(o = {}) {
  const g = new THREE.Group(); g.name = 'C130';
  const camo = canvasTex(2048, 1024, c => {
    c.fillStyle = '#b39a6c'; c.fillRect(0, 0, 2048, 1024);
    const blot = (col, n, s) => { c.fillStyle = col; for (let i = 0; i < n; i++) { c.beginPath(); const x = (i * 733) % 2048, y = (i * 389) % 1024; c.ellipse(x, y, s * (1 + (i % 3) * .4), s * .55, (i % 5) * .6, 0, 7); c.fill(); } };
    blot('#7a6440', 26, 120); blot('#5f6a48', 18, 100);
    c.fillStyle = 'rgba(0,0,0,.08)'; for (let x = 0; x < 2048; x += 64) c.fillRect(x, 0, 2, 1024);
  }, { repeat: [1, 1] });
  const skin = new THREE.MeshStandardMaterial({ map: camo, roughness: .75, metalness: .1, color: o.tint ?? 0xffffff });
  const belly = std(0x8f8a7c, { rough: .7, metal: .15 }), dark = std(0x1a1b1c, { rough: .6, metal: .3 }), glass = std(0x0c1014, { rough: .08, metal: .6 });
  const Y = 2.75, R = 2.15;
  const z0 = -15.6, z1 = 14.2;
  const r = z => z > 10.5 ? R * Math.sqrt(Math.max(0, 1 - ((z - 10.5) / (z1 - 10.5)) ** 2.2)) : z < -6 ? R * (1 - ((-6 - z) / (-6 - z0)) * .8) : R;
  const yc = z => z < -6 ? Y + ((-6 - z) / (-6 - z0)) ** 1.3 * 2.2 : z > 10.5 ? Y - ((z - 10.5) / (z1 - 10.5)) ** 2 * .7 : Y;
  const zs = []; for (let z = z0; z <= z1 + 1e-6; z += .25) zs.push(z);
  const fus = m(tube(zs, r, yc, 48, 1.02), skin); g.add(fus);
  // flat belly / cargo floor fairing and wheel sponsons
  g.add(m(new THREE.CapsuleGeometry(.75, 6.5, 6, 16), belly, { pos: [2.1, 1.25, .8], rot: [P / 2, 0, 0], scale: [1, 1, 1] }));
  g.add(m(new THREE.CapsuleGeometry(.75, 6.5, 6, 16), belly, { pos: [-2.1, 1.25, .8], rot: [P / 2, 0, 0] }));
  // cockpit glazing (many small panes) on the nose top
  for (let i = -2; i <= 2; i++) g.add(m(new THREE.BoxGeometry(.62, .42, .05), glass, { pos: [i * .66, Y + 1.55 - Math.abs(i) * .08, 12.6 - Math.abs(i) * .18], rot: [-.55, i * .18, 0] }));
  // high wing on top of the fuselage, straight, slight dihedral
  const wy = Y + R + .1, dh = Math.tan(2.5 * P / 180);
  for (const s of [1, -1]) {
    const secs = [[.6, 4.9, .17], [10.6, 4.1, .15], [20.2, 2.6, .12]].map(([x, c, t]) => ({ x: s * x, y: wy + (x - .6) * dh, z: 3.4 - (x - .6) * .04, c, t }));
    g.add(m(wing(secs, { flip: s < 0 }), skin));
  }
  // four Allison T56 turboprops
  g.userData.props = [];
  const xs = [-10.4, -5.0, 5.0, 10.4];
  xs.forEach((x, i) => {
    const ny = wy + Math.abs(x) * dh - .55, nz = 3.4 + .4;
    const nac = new THREE.Group(); nac.position.set(x, ny, nz); g.add(nac);
    nac.add(m(lathe([[.0, -6.0], [.45, -5.6], [.62, -4.0], [.66, -1.5], [.58, .3], [.44, 1.2], [.0, 1.5]]), skin, { rot: [P / 2, 0, 0] }));
    nac.add(m(new THREE.BoxGeometry(.5, .35, 1.6), dark, { pos: [0, -.55, .2] }));
    const hub = new THREE.Group(); hub.position.set(0, 0, 1.75); nac.add(hub);
    hub.add(m(new THREE.ConeGeometry(.34, .9, 20), std(0x2a2b2c, { rough: .4, metal: .5 }), { rot: [P / 2, 0, 0] }));
    for (let b = 0; b < 4; b++) { const bl = new THREE.Group(); bl.rotation.z = b * P / 2; hub.add(bl); const blade = m(new THREE.BoxGeometry(.32, 2.05, .05), dark, { pos: [0, 1.15, 0], rot: [0, .35, 0] }); bl.add(blade); bl.add(m(new THREE.BoxGeometry(.34, .14, .06), std(0xd8c020, { rough: .5 }), { pos: [0, 2.1, 0], rot: [0, .35, 0] })); }
    // blurred disc shown when spinning fast
    const disc = m(new THREE.CircleGeometry(2.2, 40), new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0, depthWrite: false }), { cast: false }); disc.position.z = .05; hub.add(disc);
    g.userData.props.push({ hub, disc, angle: i });
  });
  g.userData.setProps = (t, rpm) => g.userData.props.forEach((p, i) => { const w = rpm[i] ?? 0; p.angle += 0; p.hub.rotation.z = t * w * 2 * P; p.disc.material.opacity = Math.min(.35, w / 25); });
  // tail: tall fin and stabilisers
  const ty = yc(-14) + .4;
  g.add(m(wing([{ x: 0, y: ty, z: -9.2, c: 6.4, t: .12 }, { x: 0, y: 11.4, z: -13.2, c: 3.0, t: .1 }], { vertical: true }), skin));
  for (const s of [1, -1]) g.add(m(wing([{ x: s * .4, y: ty + .2, z: -11.6, c: 4.0, t: .1 }, { x: s * 8.0, y: ty + .35, z: -13.0, c: 2.2, t: .09 }], { flip: s < 0 }), skin));
  // IAF roundel (Star of David in a circle) on the fin and rear fuselage
  const roundel = canvasTex(256, 256, c => { c.fillStyle = '#f4f4f0'; c.beginPath(); c.arc(128, 128, 120, 0, 7); c.fill(); c.strokeStyle = '#1f4fa8'; c.lineWidth = 14;
    const tri = a => { c.beginPath(); for (let k = 0; k < 3; k++) { const th = a + k * 2 * P / 3; c.lineTo(128 + Math.sin(th) * 82, 128 - Math.cos(th) * 82); } c.closePath(); c.stroke(); }; tri(0); tri(P); });
  for (const s of [1, -1]) g.add(m(new THREE.CircleGeometry(.75, 32), new THREE.MeshStandardMaterial({ map: roundel, transparent: true, roughness: .6 }), { pos: [s * (R + .04), Y + .3, -4.5], rot: [0, s * P / 2, 0], cast: false }));
  // rear cargo ramp (hinged at its forward edge) and upper door
  const ramp = new THREE.Group(); ramp.position.set(0, 1.25, -8.6); g.add(ramp);
  ramp.add(m(new THREE.BoxGeometry(3.0, .18, 4.4), belly, { pos: [0, 0, -2.2] }));
  ramp.add(m(new THREE.BoxGeometry(3.0, .02, 4.3), std(0x3a3a36, { rough: .9 }), { pos: [0, .1, -2.2] }));
  g.userData.ramp = ramp;
  g.userData.rampOpen = a => { ramp.rotation.x = -a * .27; };   // 0 closed (up), 1 resting on the ground
  ramp.rotation.x = -.27 * (o.ramp ?? 0);
  // interior glow seen through the open ramp
  const glow = new THREE.PointLight(0xff4020, 0, 12, 2); glow.position.set(0, 2.8, -4); g.add(glow); g.userData.glow = glow;
  // landing gear
  const mats = { tyre: std(0x151515, { rough: .9 }), hub: std(0x777777, { rough: .4, metal: .7 }), metal: std(0x888888, { rough: .4, metal: .7 }) };
  for (const s of [1, -1]) for (const z of [-.2, 1.9]) { const w = wheel(.6, .45, mats); w.position.set(s * 2.05, .6, z); g.add(w); }
  for (const s of [1, -1]) { const w = wheel(.42, .3, mats); w.position.set(s * .3, .42, 10.3); g.add(w); }
  g.add(m(new THREE.CylinderGeometry(.08, .08, 1.4, 8), mats.metal, { pos: [0, 1.0, 10.3] }));
  // nav lights (off by default; operation flew dark)
  g.userData.lights = [m(new THREE.SphereGeometry(.09, 8, 6), std(0xff2020, { emissive: 0xff2020, ei: 0 }), { pos: [-20.3, wy + 19.6 * dh, 3.2] }), m(new THREE.SphereGeometry(.09, 8, 6), std(0x20ff40, { emissive: 0x20ff40, ei: 0 }), { pos: [20.3, wy + 19.6 * dh, 3.2] })];
  g.userData.lights.forEach(l => g.add(l));
  return shadowAll(g);
}

// ---------- vehicles ----------
const wheelMats = () => ({ tyre: std(0x111111, { rough: .9 }), hub: std(0xb8bcc0, { rough: .3, metal: .85 }), metal: std(0xb8bcc0, { rough: .3, metal: .85 }) });
// black Mercedes saloon (1970s, generic)
export function mercedes(o = {}) {
  const g = new THREE.Group(); const paint = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0x0a0a0c, roughness: .22, metalness: .5, clearcoat: 1, clearcoatRoughness: .08 });
  const chrome = std(0xd8dade, { rough: .12, metal: 1 }), glass = new THREE.MeshPhysicalMaterial({ color: 0x0a0d10, roughness: .05, metalness: .2, transparent: true, opacity: .75 });
  g.add(rbox(1.78, .62, 4.75, .12, paint, { pos: [0, .62, 0] }));
  g.add(rbox(1.6, .5, 2.4, .14, glass, { pos: [0, 1.17, -.25] }));
  g.add(rbox(1.58, .06, 2.2, .03, paint, { pos: [0, 1.43, -.25] }));
  for (const x of [-.8, .8]) g.add(box(.05, .45, .06, paint, { pos: [x, 1.18, .9] }));
  g.add(box(.9, .4, .06, chrome, { pos: [0, .66, 2.38] }));                         // grille
  for (let i = 0; i < 7; i++) g.add(box(.02, .34, .03, std(0x222222), { pos: [-.36 + i * .12, .66, 2.41] }));
  for (const x of [-.6, .6]) { g.add(m(new THREE.CircleGeometry(.11, 20), std(0xffffff, { emissive: 0xfff2d0, ei: o.lights ? 3 : 0 }), { pos: [x, .7, 2.385] })); }
  g.add(box(1.8, .1, .12, chrome, { pos: [0, .38, 2.42] })); g.add(box(1.8, .1, .12, chrome, { pos: [0, .38, -2.42] }));
  // star mascot stand-in (generic ornament)
  g.add(m(new THREE.CylinderGeometry(.015, .015, .1, 6), chrome, { pos: [0, 1.0, 2.25] }));
  // pennant flags on the front wings
  if (o.flags) for (const x of [-.75, .75]) { g.add(m(new THREE.CylinderGeometry(.008, .008, .5, 6), chrome, { pos: [x, 1.15, 2.1] })); g.add(m(new THREE.PlaneGeometry(.26, .16), new THREE.MeshStandardMaterial({ map: o.flagTex ?? null, color: o.flagTex ? 0xffffff : 0xd8c040, side: THREE.DoubleSide }), { pos: [x, 1.32, 1.97], rot: [0, P / 2, 0], cast: false })); }
  const wm = wheelMats(); for (const [x, z] of [[-.78, 1.45], [.78, 1.45], [-.78, -1.45], [.78, -1.45]]) { const w = wheel(.36, .22, wm); w.position.set(x, .36, z); g.add(w); }
  return shadowAll(g);
}
// Land Rover Series (olive)
export function landrover(o = {}) {
  const g = new THREE.Group(); const paint = std(o.color ?? 0x4a5236, { rough: .7, metal: .15 }), glass = std(0x0c1014, { rough: .1, metal: .5 }), canvas = std(0x6a6448, { rough: .95 });
  g.add(box(1.68, .7, 4.1, paint, { pos: [0, .9, 0] }));
  g.add(box(1.6, .8, 1.0, paint, { pos: [0, 1.5, .55] }));
  g.add(box(1.5, .5, .04, glass, { pos: [0, 1.65, 1.07] }));
  g.add(box(1.68, .9, 2.0, canvas, { pos: [0, 1.6, -1.05] }));
  g.add(box(1.4, .5, .06, std(0x222222), { pos: [0, .9, 2.06] }));
  for (const x of [-.6, .6]) g.add(m(new THREE.CircleGeometry(.1, 16), std(0xffffff, { emissive: 0xfff2d0, ei: o.lights ? 3 : 0 }), { pos: [x, .95, 2.095] }));
  const wm = wheelMats(); wm.hub = std(0x4a5236, { rough: .7 });
  for (const [x, z] of [[-.75, 1.3], [.75, 1.3], [-.75, -1.3], [.75, -1.3]]) { const w = wheel(.42, .26, wm); w.position.set(x, .42, z); g.add(w); }
  const sp = wheel(.42, .26, wm); sp.position.set(0, 1.2, 1.25); sp.rotation.set(P / 2, 0, 0); g.add(sp);
  return shadowAll(g);
}

// ---------- airfield at night ----------
// runway(k, {len}) dark asphalt runway along z with edge lights (lit or dark) and grass either side
export async function runwayNight(k, o = {}) {
  const { scene } = k; const len = o.len ?? 1200;
  const asphalt = await real.pbr('asphalt_02', { repeat: [6, len / 20], color: 0x3a3a3c, noMap: true, rough: .9 });
  scene.add(m(new THREE.PlaneGeometry(45, len), asphalt, { rot: [-P / 2, 0, 0], cast: false }));
  const grass = await real.pbr('grass_path_2', { repeat: [200, 200] });
  scene.add(m(new THREE.PlaneGeometry(3000, 3000), grass, { rot: [-P / 2, 0, 0], pos: [0, -.03, 0], cast: false }));
  for (let z = -len / 2; z < len / 2; z += 30) scene.add(box(.9, .01, 12, std(0xd8d8d0, { rough: .8 }), { pos: [0, .01, z], cast: false }));
  const lights = [];
  for (let z = -len / 2; z < len / 2; z += 60) for (const x of [-23, 23]) { const l = m(new THREE.SphereGeometry(.12, 8, 6), std(0xfff0c0, { emissive: 0xfff0c0, ei: o.lit ? 4 : 0 }), { pos: [x, .3, z], cast: false }); scene.add(l); lights.push(l); }
  return { lights };
}

// Entebbe old terminal (1950s, two storeys, control tower at one end), seen at night: one row of windows lit.
// entebbeOld(k, {pos, lit:[indexes], wall}) -> {group, windows[]}
export function entebbeOld(k, o = {}) {
  const g = new THREE.Group(); g.position.set(...(o.pos ?? [0, 0, 0])); g.rotation.y = o.rotY ?? 0; k.scene.add(g);
  const wall = std(o.wall ?? 0xb8ae98, { rough: .9 }), trim = std(0x8a826e, { rough: .85 }), dark = std(0x0a0a0c, { rough: .4, metal: .3 });
  const W = 70, D = 16;
  g.add(box(W, 7.2, D, wall, { pos: [0, 3.6, 0] }));
  g.add(box(W + .6, .5, D + .6, trim, { pos: [0, 7.4, 0] }));
  g.add(box(W, .3, 3, trim, { pos: [0, 3.6, D / 2 + 1.5] }));                       // canopy along the apron side
  for (let x = -W / 2 + 3; x <= W / 2 - 3; x += 6) g.add(box(.35, 3.6, .35, trim, { pos: [x, 1.8, D / 2 + 2.8] }));
  const windows = [];
  for (let row = 0; row < 2; row++) for (let x = -W / 2 + 2.5; x < W / 2 - 2; x += 3) {
    const lit = (o.lit ?? []).includes(windows.length) || (o.litRow === row);
    const mat = lit ? std(0xffc070, { emissive: 0xffb050, ei: 2.2 }) : dark;
    const w = box(2.0, row ? 1.5 : 2.2, .08, mat, { pos: [x, row ? 5.4 : 1.7, D / 2 + .05], cast: false }); g.add(w); windows.push(w);
  }
  // control tower block at the east end
  g.add(box(6, 6, 6, wall, { pos: [W / 2 - 4, 10.2, -2] }));
  g.add(box(7, 2.4, 7, std(0x1a2028, { rough: .1, metal: .5 }), { pos: [W / 2 - 4, 14.4, -2] }));
  g.add(box(7.6, .4, 7.6, trim, { pos: [W / 2 - 4, 15.8, -2] }));
  if (o.towerLit) { const tl = new THREE.PointLight(0xffd8a0, 30, 20, 2); tl.position.set(W / 2 - 4, 14.4, -2); g.add(tl); }
  return { group: shadowAll(g), windows, W, D };
}

// The hostage hall: long room, old terminal interior, mattresses on the floor, columns, high windows.
// hall(k, {w, d, lampI}) -> {group, mats:[{x,z}]}
export async function hall(k, o = {}) {
  const { scene } = k; const w = o.w ?? 24, d = o.d ?? 14, h = 4.4;
  const g = new THREE.Group(); scene.add(g);
  const floor = await real.pbr('rubber_tiles', { repeat: [w / 2, d / 2], color: 0x9a9284 });
  g.add(m(new THREE.PlaneGeometry(w, d), floor, { rot: [-P / 2, 0, 0], cast: false }));
  const wall = await real.pbr('plastered_wall_04', { repeat: [w / 3, 2], color: 0xcfc4a8 });
  for (const [x, z, ry, len] of [[0, -d / 2, 0, w], [-w / 2, 0, P / 2, d], [w / 2, 0, -P / 2, d], [0, d / 2, P, w]]) g.add(m(new THREE.PlaneGeometry(len, h), wall, { pos: [x, h / 2, z], rot: [0, ry, 0], cast: false }));
  g.add(m(new THREE.PlaneGeometry(w, d), std(0xbdb6a6, { rough: .95 }), { pos: [0, h, 0], rot: [P / 2, 0, 0], cast: false }));
  for (let x = -w / 2 + 4; x < w / 2; x += 4) for (const z of [-d / 6, d / 6]) g.add(box(.45, h, .45, std(0xb4aa92, { rough: .9 }), { pos: [x, h / 2, z] }));
  // high windows on the back wall (dark outside or dawn)
  for (let x = -w / 2 + 2; x < w / 2 - 1; x += 3) g.add(box(2.2, 1.1, .05, std(o.dawn ? 0x8aa0c0 : 0x0c1018, { emissive: o.dawn ? 0x6a80a0 : 0x000000, ei: o.dawn ? .8 : 0 }), { pos: [x, h - .9, -d / 2 + .03], cast: false }));
  // mattresses
  const mats = []; const mm = std(0xd8d0bc, { rough: .95 }), stripe = std(0x7a8aa8, { rough: .95 });
  for (let x = -w / 2 + 1.6; x < w / 2 - 1; x += 1.3) for (const z of [-d / 2 + 1.6, -d / 2 + 3.9, d / 2 - 3.9, d / 2 - 1.6]) {
    if (((x * 7 + z * 3) | 0) % 5 === 0) continue;
    const mt = new THREE.Group(); mt.position.set(x, 0, z); mt.rotation.y = ((x * 13) % 1) * .2 - .1; g.add(mt);
    mt.add(rbox(.85, .14, 1.9, .05, mm, { pos: [0, .07, 0] })); mt.add(box(.86, .02, .2, stripe, { pos: [0, .145, -.6] }));
    mats.push({ x, z, rot: mt.rotation.y });
  }
  // dim bulbs
  for (let x = -w / 2 + 4; x < w / 2; x += 8) real.lamp(scene, [x, h - .4, 0], { i: o.lampI ?? 5, dist: 12, color: 0xffd8a0, shadow: false });
  scene.add(new THREE.HemisphereLight(0xfff0d8, 0x40382c, o.hemi ?? .5));
  return { group: g, mats, w, d, h };
}

// soldier's cap / beret attached to a head bone
export function cap(color = 0x3a4228, beret = false) {
  const g = new THREE.Group(); const mt = std(color, { rough: .85 });
  if (beret) { const b = m(new THREE.SphereGeometry(.12, 16, 10, 0, P * 2, 0, P / 2), mt); b.scale.set(1.05, .45, 1.1); b.rotation.z = -.25; g.add(b); }
  else { g.add(m(new THREE.CylinderGeometry(.105, .11, .09, 20), mt)); g.add(m(new THREE.CylinderGeometry(.08, .08, .015, 20, 1, false, -P / 2, P), mt, { pos: [0, -.035, .08], scale: [1, 1, 1.4] })); }
  return shadowAll(g);
}
