// Operation Thunderbolt · Act 2 · THE HIJACKERS — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import { shots as old } from './tb_act2.js';
const { THREE, sets, P } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };

// ---------- the line-up: four hijackers against a height-chart wall, each with its own spotlight ----------
async function lineup(k) {
  const { real, scene } = k;
  await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x060607, envI: .08 });
  const floor = await real.pbr('concrete_floor_worn_001', { repeat: [6, 3], color: 0x55524c, noMap: true, rough: .8 });
  scene.add(real.m(new THREE.PlaneGeometry(14, 6), floor, { rot: [-P / 2, 0, 0], pos: [0, 0, 1], cast: false }));
  const chart = real.canvasTex(2048, 512, (c, w, h) => {
    c.fillStyle = '#26282b'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(220,220,210,.5)'; c.fillStyle = 'rgba(220,220,210,.6)'; c.font = '600 22px "Liberation Sans"';
    for (let i = 0; i <= 22; i++) { const y = h - i * h / 22; c.lineWidth = i % 2 ? 1.5 : 3; c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); if (i % 2 === 0) for (let x = 40; x < w; x += 512) c.fillText(`${(i / 10).toFixed(1)} m`, x, y - 6); }
  });
  scene.add(real.m(new THREE.PlaneGeometry(10, 2.2), new THREE.MeshStandardMaterial({ map: chart, roughness: .9 }), { pos: [0, 1.1, -.9], cast: false }));
  scene.add(real.m(new THREE.PlaneGeometry(14, 4), real.std(0x1a1b1d, { rough: .95 }), { pos: [0, 2, -.95], cast: false }));
  const ids = [C.HJ.hj3, C.HJ.hj4, C.HJ.bose, C.HJ.kuhlmann], xs = [-2.4, -.8, .8, 2.4], ppl = [];
  for (let i = 0; i < 4; i++) {
    const p = await real.human({ id: ids[i], seed: 200 + i }); real.put(scene, p, { pos: [xs[i], 0, 0], rot: 0, mood: 'stern' }); p.userData.driven = true;
    const key = new THREE.SpotLight(0xfff0dc, 0, 10, .22, .55, 1.4); key.position.set(xs[i] + .4, 4.2, 3.2); key.target.position.set(xs[i], 1.3, 0); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 4;
    const rim = new THREE.SpotLight(0x9fb4ff, 70, 8, .3, .6, 1.2); rim.position.set(xs[i], 3.2, -.7); rim.target.position.set(xs[i], 1.3, .1);
    scene.add(key, key.target, rim, rim.target); p.userData.key = key; ppl.push(p);
  }
  return { ppl, xs };
}
const labelAt = (k, p, a, b, t, start) => { let [x, y] = proj(k.camera, C.headPos(p, .34)); x = Math.max(300, Math.min(1625, x)); ui.callout(k.overlay, a, b, x, y, t, start); };

// ---------- a fuel bowser ----------
function bowser() {
  const g = new THREE.Group(); const real = C.real;
  const cab = real.std(0xd8d2c0, { rough: .5 }), tank = real.std(0xc9c4b4, { rough: .35, metal: .4 }), tyre = real.std(0x151515, { rough: .9 });
  g.add(real.box(2.4, .5, 8, real.std(0x2a2a2c, { rough: .7 }), { pos: [0, .8, 0] }));
  g.add(real.rbox(2.4, 1.9, 2.0, .12, cab, { pos: [0, 1.95, 3.0] }));
  g.add(real.box(2.2, .8, .05, real.std(0x1a2028, { rough: .1, metal: .3 }), { pos: [0, 2.35, 4.01] }));
  g.add(real.m(new THREE.CylinderGeometry(1.15, 1.15, 5.4, 32), tank, { pos: [0, 2.2, -1.1], rot: [P / 2, 0, 0] }));
  g.add(real.box(2.0, .5, .05, real.std(0xc0392b, { rough: .5 }), { pos: [0, 2.2, 1.65] }));
  for (const [x, z] of [[-1.05, 2.8], [1.05, 2.8], [-1.05, -1.5], [1.05, -1.5], [-1.05, -2.8], [1.05, -2.8]]) g.add(real.m(new THREE.CylinderGeometry(.48, .48, .34, 20), tyre, { pos: [x, .48, z], rot: [0, 0, P / 2] }));
  return g;
}
// hot, hazy desert airfield (Benina, Benghazi)
async function benghazi(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, o.hdri ?? 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? [-30, 60, 40], sunI: o.sunI ?? 4.6, sunColor: o.sunColor ?? 0xffe6c0, shadowSize: 45, envI: o.envI ?? 1.0, fog: [o.fog ?? 0xe6d8bc, 80, 700], exposure: o.exposure });
  await sets.apron(k, { sign: 'BENINA · BENGHAZI' });
  const jet = await sets.a300(); scene.add(jet);
  return { jet };
}

// QA r2: the stock airstair read as a flat white box with black window slabs. A full shot-local stair truck instead, modelled
// like act 4's ambulance: bevelled cab with see-through tinted glass (seats, dash, wheel inside), framed screen, wipers, grille slats,
// chrome-ringed headlamps, bumper, door seams and handles, mirrors, beacon; a panelled chassis with a checker-plate deck, hatches,
// stabiliser jacks, treaded tyres on dished hubs under arch lips; the stair itself with nosed treads, boxed stringers, posts and rails,
// and a railed top platform. Same local frame and userData.top as sets.airstair so the walking paths are unchanged.
function roadWheel(rad, w, mats) {
  const g = new THREE.Group(); const m = C.real.m;
  g.add(m(new THREE.CylinderGeometry(rad - .015, rad - .015, w, 36), mats.tyre, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.TorusGeometry(rad - w * .32, w * .3, 10, 36), mats.tyre, { rot: [0, P / 2, 0] }));
  for (let i = 0; i < 22; i++) { const a = i / 22 * P * 2; g.add(m(new THREE.BoxGeometry(w * .82, .032, .055), mats.tread, { pos: [0, Math.cos(a) * (rad - .012), Math.sin(a) * (rad - .012)], rot: [a, 0, 0] })); }
  g.add(m(new THREE.CylinderGeometry(rad * .56, rad * .56, w * .96, 28), mats.hub, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.CylinderGeometry(rad * .36, rad * .42, w * 1.02, 24), mats.hub, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.CylinderGeometry(rad * .14, rad * .14, w * 1.1, 16), mats.metal, { rot: [0, 0, P / 2] }));
  for (let i = 0; i < 5; i++) { const a = i / 5 * P * 2; g.add(m(new THREE.CylinderGeometry(.014, .014, w * 1.06, 8), mats.metal, { pos: [0, Math.cos(a) * rad * .26, Math.sin(a) * rad * .26], rot: [0, 0, P / 2] })); }
  return g;
}
async function stairTruck(h = 4.0) {
  const g = new THREE.Group(); const r = C.real, m = r.m;
  const grime = r.canvasTex(64, 256, (c, w, hh) => { const gr = c.createLinearGradient(0, 0, 0, hh); gr.addColorStop(0, '#f2efe6'); gr.addColorStop(.6, '#e4e0d4'); gr.addColorStop(1, '#a8a296'); c.fillStyle = gr; c.fillRect(0, 0, w, hh); });
  const white = r.std(0xffffff, { rough: .42, mat: { map: grime } }), frame = r.std(0x26292c, { rough: .6, metal: .3 }), dark = r.std(0x18191b, { rough: .8 });
  const chrome = r.std(0xc4c8cb, { metal: .9, rough: .22 }), rub = r.std(0x0e0e0f, { rough: .95 }), stripe = r.std(0x1f3f8a, { rough: .5 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x2c3c4a, roughness: .04, metalness: .35, transparent: true, opacity: .78, envMapIntensity: 2.2, clearcoat: 1 });
  const seat = r.std(0x2a2a2e, { rough: .85 }), grey = r.std(0x6a6c70, { rough: .7, metal: .4 }), seam = r.std(0x3a3a38, { rough: .6 });
  const plate = await r.pbr('metal_plate', { repeat: [2, 6], color: 0x8a8d92, metal: .85, rough: .45, noMap: true });
  const tread = await r.pbr('rubber_tiles', { repeat: [.4, 3], color: 0x3a3c40, noMap: true, rough: .9 });
  const len = h / Math.tan(38 * P / 180);
  // ---- chassis: dark frame rail, panelled white body, checker-plate deck, side skirts with hatches, stripe ----
  g.add(r.box(2.2, .26, 7.3, frame, { pos: [0, .42, 0] }));
  g.add(r.rbox(2.3, .5, 6.0, .06, white, { pos: [0, .8, -.6] }));
  g.add(m(new THREE.BoxGeometry(2.2, .04, 5.9), plate, { pos: [0, 1.07, -.6] }));
  for (const sx of [1, -1]) {
    g.add(r.box(.03, .14, 5.9, stripe, { pos: [sx * 1.155, .9, -.6] }));
    for (const z of [-3.0, -1.8, -.4, .8]) g.add(r.box(.03, .46, .02, seam, { pos: [sx * 1.16, .8, z] }));
    // hatch with recessed outline and latch
    for (const [hh, d, y, z] of [[.02, .9, 1.0, -1.1], [.02, .9, .62, -1.1], [.4, .02, .81, -.66], [.4, .02, .81, -1.54]]) g.add(r.box(.03, hh, d, seam, { pos: [sx * 1.16, y, z] }));
    g.add(r.box(.03, .05, .12, chrome, { pos: [sx * 1.165, .8, -.75] }));
    // deck edge rail and kick plate
    g.add(r.box(.05, .06, 5.9, chrome, { pos: [sx * 1.13, 1.1, -.6] }));
    // stabiliser jacks at the rear corners
    g.add(m(new THREE.CylinderGeometry(.07, .07, .7, 12), chrome, { pos: [sx * .95, .4, -3.45] }));
    g.add(m(new THREE.CylinderGeometry(.18, .2, .05, 16), dark, { pos: [sx * .95, .03, -3.45] }));
    g.add(r.box(.2, .3, .2, frame, { pos: [sx * .95, .7, -3.45] }));
    // wheel arches: dark well, chrome lip, mudflap
    for (const z of [2.6, -2.6]) {
      g.add(m(new THREE.CircleGeometry(.57, 28, 0, P), dark, { pos: [sx * 1.158, .45, z], rot: [0, sx * P / 2, 0], cast: false }));
      g.add(m(new THREE.TorusGeometry(.57, .03, 8, 28, P), chrome, { pos: [sx * 1.16, .45, z], rot: [0, P / 2, 0] }));
      g.add(r.box(.03, .26, .34, rub, { pos: [sx * 1.08, .27, z - .72] }));
    }
    // rear lamps and reflectors
    g.add(r.rbox(.22, .12, .05, .02, r.std(0xff2020, { emissive: 0xff2020, ei: 1.2 }), { pos: [sx * .85, .82, -3.62] }));
    g.add(r.rbox(.22, .08, .05, .02, r.std(0xff9a20, { emissive: 0xff8a10, ei: .6 }), { pos: [sx * .85, .68, -3.62] }));
  }
  // hazard-striped rear bumper
  const haz = r.canvasTex(256, 32, (c, w, hh) => { c.fillStyle = '#e8b321'; c.fillRect(0, 0, w, hh); c.fillStyle = '#151515'; for (let x = -32; x < w; x += 32) { c.beginPath(); c.moveTo(x, hh); c.lineTo(x + 16, 0); c.lineTo(x + 32, 0); c.lineTo(x + 16, hh); c.fill(); } });
  g.add(r.box(2.3, .16, .1, new THREE.MeshStandardMaterial({ map: haz, roughness: .6 }), { pos: [0, .5, -3.66] }));
  // ---- cab ----
  g.add(r.rbox(2.24, .9, 1.8, .1, white, { pos: [0, 1.4, 3.0] }));                        // lower body
  for (const sx of [1, -1]) for (const z of [2.12, 3.88]) g.add(r.box(.12, .84, .12, white, { pos: [sx * 1.04, 2.24, z] })); // pillars
  g.add(r.box(.1, .78, .1, white, { pos: [1.04, 2.24, 3.0] })); g.add(r.box(.1, .78, .1, white, { pos: [-1.04, 2.24, 3.0] })); // B-pillars
  g.add(r.rbox(2.26, .14, 1.9, .05, white, { pos: [0, 2.68, 3.0] }));                      // roof
  g.add(r.rbox(2.0, .05, 1.6, .02, frame, { pos: [0, 2.77, 3.0] }));                       // roof rail
  g.add(r.box(1.98, .74, .03, glass, { pos: [0, 2.24, 3.89] }));                            // windscreen
  g.add(r.box(1.98, .74, .03, glass, { pos: [0, 2.24, 2.11] }));                            // rear screen
  for (const sx of [1, -1]) for (const z of [2.56, 3.44]) g.add(r.box(.03, .74, .8, glass, { pos: [sx * 1.04, 2.24, z] }));
  for (const [w, hh, y] of [[2.1, .06, 2.62], [2.1, .07, 1.86]]) { g.add(r.box(w, hh, .05, frame, { pos: [0, y, 3.9] })); g.add(r.box(w, hh, .05, frame, { pos: [0, y, 2.1] })); }
  for (const sx of [1, -1]) for (const y of [2.62, 1.86]) g.add(r.box(.05, .06, 1.8, frame, { pos: [sx * 1.06, y, 3.0] }));
  for (const zz of [3.905, 2.095]) { for (const x of [-.99, .99]) g.add(r.box(.04, .74, .03, rub, { pos: [x, 2.24, zz] })); for (const y of [2.6, 1.88]) g.add(r.box(1.98, .035, .03, rub, { pos: [0, y, zz] })); }
  for (const sx of [1, -1]) for (const z of [2.56, 3.44]) { for (const dz of [-.4, .4]) g.add(r.box(.035, .74, .03, rub, { pos: [sx * 1.055, 2.24, z + dz] })); for (const y of [2.6, 1.88]) g.add(r.box(.035, .03, .8, rub, { pos: [sx * 1.055, y, z] })); }
  g.add(r.box(2.2, .02, .02, seam, { pos: [0, 1.62, 3.91] }));   // bonnet crease
  // interior: dash, wheel, two seats with headrests
  g.add(r.box(1.9, .25, .4, dark, { pos: [0, 1.95, 3.6] }));
  g.add(m(new THREE.TorusGeometry(.18, .025, 8, 24), dark, { pos: [.45, 2.1, 3.35], rot: [-.9, 0, 0] }));
  for (const x of [-.45, .45]) { g.add(r.rbox(.5, .62, .12, .04, seat, { pos: [x, 2.1, 2.7], rot: [-.12, 0, 0] })); g.add(r.rbox(.28, .18, .1, .04, seat, { pos: [x, 2.5, 2.65] })); }
  // wipers, grille with slats, headlamps, indicators, bumper, plate
  for (const x of [-.45, .4]) g.add(r.box(.62, .018, .02, dark, { pos: [x, 1.95, 3.93], rot: [0, 0, .28] }));
  g.add(r.rbox(1.1, .4, .05, .03, dark, { pos: [0, 1.42, 3.91] }));
  for (let i = 0; i < 5; i++) g.add(r.box(1.0, .022, .045, chrome, { pos: [0, 1.27 + i * .075, 3.94] }));
  for (const sx of [1, -1]) {
    g.add(m(new THREE.CylinderGeometry(.16, .16, .05, 24), chrome, { pos: [sx * .78, 1.42, 3.91], rot: [P / 2, 0, 0] }));
    g.add(m(new THREE.CircleGeometry(.125, 24), r.std(0xfff4d0, { emissive: 0xfff4d0, ei: .9 }), { pos: [sx * .78, 1.42, 3.94], cast: false }));
    g.add(r.rbox(.2, .1, .04, .02, r.std(0xff9a20, { emissive: 0xff8a10, ei: .5 }), { pos: [sx * .78, 1.15, 3.91] }));
    // door seams, handle, step, mirror on an arm
    g.add(r.box(.012, 1.5, .012, seam, { pos: [sx * 1.122, 1.75, 2.22] })); g.add(r.box(.012, 1.5, .012, seam, { pos: [sx * 1.122, 1.75, 3.78] }));
    g.add(r.box(.012, .012, 1.55, seam, { pos: [sx * 1.122, 1.0, 3.0] }));
    g.add(r.box(.03, .04, .16, chrome, { pos: [sx * 1.13, 1.7, 2.45] }));
    g.add(r.box(.3, .05, .5, frame, { pos: [sx * 1.05, .62, 3.0] }));
    g.add(r.box(.32, .025, .025, frame, { pos: [sx * 1.25, 2.3, 3.85] })); g.add(r.rbox(.06, .3, .18, .02, frame, { pos: [sx * 1.42, 2.3, 3.85] }));
    g.add(r.box(.02, .24, .13, glass, { pos: [sx * 1.39, 2.3, 3.85] }));
  }
  g.add(r.rbox(2.36, .18, .16, .05, chrome, { pos: [0, .9, 3.98] }));
  g.add(r.box(.5, .12, .01, r.std(0xf0ecd8, { rough: .6 }), { pos: [0, 1.05, 3.93] }));
  g.add(m(new THREE.CylinderGeometry(.09, .11, .06, 14), chrome, { pos: [0, 2.8, 3.0] }));
  g.add(m(new THREE.SphereGeometry(.1, 14, 8, 0, P * 2, 0, P / 2), r.std(0xffa020, { emissive: 0xff9010, ei: 1.2, rough: .2 }), { pos: [0, 2.83, 3.0] }));
  // wheels
  const wm = { tyre: r.std(0x161616, { rough: .9 }), tread: r.std(0x0c0c0c, { rough: .95 }), hub: r.std(0xb0b4b8, { metal: .75, rough: .3 }), metal: chrome };
  for (const [x, z] of [[-1.0, 2.6], [1.0, 2.6], [-1.0, -2.6], [1.0, -2.6]]) { const w = roadWheel(.45, .32, wm); w.position.set(x, .45, z); g.add(w); }
  // ---- the stair: climbs toward -x from the deck ----
  const st = new THREE.Group(); st.position.set(-.2, 1.1, 0); g.add(st);
  const n = Math.round(h / .19), rise = h - 1.1, ang = Math.atan2(rise, len), L2 = Math.hypot(len, rise);
  for (let i = 0; i < n; i++) {
    const x = -i * len / n, y = (i + 1) * rise / n;
    st.add(m(new THREE.BoxGeometry(.3, .05, 1.3), tread, { pos: [x, y, 0] }));
    st.add(r.box(.04, .06, 1.3, chrome, { pos: [x + .15, y + .005, 0] }));          // nosing
    st.add(r.box(.012, .19, 1.26, grey, { pos: [x + .14, y - .1, 0] }));            // riser
  }
  for (const z of [-.68, .68]) {
    st.add(r.rbox(L2 + .3, .34, .08, .03, white, { pos: [-len / 2, rise / 2 - .05, z], rot: [0, 0, -ang] }));
    st.add(r.box(L2, .03, .1, stripe, { pos: [-len / 2, rise / 2 - .05, z * 1.07], rot: [0, 0, -ang] }));
    st.add(m(new THREE.CylinderGeometry(.03, .03, L2, 10), chrome, { pos: [-len / 2, rise / 2 + .95, z], rot: [0, 0, P / 2 - ang] }));
    st.add(m(new THREE.CylinderGeometry(.02, .02, L2, 8), chrome, { pos: [-len / 2, rise / 2 + .5, z], rot: [0, 0, P / 2 - ang] }));
    for (let i = 0; i <= 6; i++) st.add(m(new THREE.CylinderGeometry(.024, .024, .95, 8), chrome, { pos: [-i * len / 6, i * rise / 6 + .48, z] }));
  }
  // under-stair support struts down to the deck
  for (const z of [-.5, .5]) st.add(r.box(.1, rise * .55, .1, frame, { pos: [-len * .55, rise * .27, z] }));
  // top platform with plate, toe board and a rail on the open sides
  st.add(m(new THREE.BoxGeometry(1.4, .08, 1.5), plate, { pos: [-len - .6, rise, 0] }));
  st.add(r.box(1.4, .14, .04, white, { pos: [-len - .6, rise - .1, .75] })); st.add(r.box(1.4, .14, .04, white, { pos: [-len - .6, rise - .1, -.75] }));
  for (const z of [-.75, .75]) { st.add(m(new THREE.CylinderGeometry(.03, .03, 1.4, 10), chrome, { pos: [-len - .6, rise + .95, z], rot: [0, 0, P / 2] })); for (const x of [-len - .05, -len - 1.25]) st.add(m(new THREE.CylinderGeometry(.024, .024, .95, 8), chrome, { pos: [x, rise + .48, z] })); }
  st.add(m(new THREE.CylinderGeometry(.1, .1, rise + 1.1, 12), frame, { pos: [-len - .6, (rise - 1.1) / 2, 0] }));   // telescopic leg under the platform
  g.userData.top = new THREE.Vector3(-.2 - len - .6, h, 0);
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}
async function stairsAt(jet, scene) { const d = jet.userData.doorL1; const st = await stairTruck(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st); return st; }

// heading dial drawn on a canvas, shared by 2.11
function headingDial() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 512; const cx = cv.getContext('2d');
  const draw = h => {
    cx.fillStyle = '#0b0c0d'; cx.fillRect(0, 0, 512, 512);
    cx.save(); cx.translate(256, 256); cx.rotate(-h * P / 180); cx.strokeStyle = '#eee'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
    for (let d = 0; d < 360; d += 5) { cx.save(); cx.rotate(d * P / 180); cx.lineWidth = d % 30 ? 2 : 4; cx.beginPath(); cx.moveTo(0, -220); cx.lineTo(0, d % 10 ? -205 : -192); cx.stroke();
      if (d % 30 === 0) { cx.font = '600 44px "Liberation Sans"'; const lab = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' }[d] ?? String(d / 10); cx.fillStyle = isNaN(lab) ? '#ffd24a' : '#eee'; cx.fillText(lab, 0, -160); } cx.restore(); }
    cx.restore(); cx.fillStyle = '#ff9a1a'; cx.beginPath(); cx.moveTo(256, 30); cx.lineTo(242, 64); cx.lineTo(270, 64); cx.fill();
    cx.strokeStyle = '#ff9a1a'; cx.lineWidth = 5; cx.beginPath(); cx.moveTo(256, 300); cx.lineTo(256, 210); cx.moveTo(216, 260); cx.lineTo(296, 260); cx.stroke();
  };
  const show = (o, t, h, x = 1640, y = 560) => { draw(h); o.save(); o.globalAlpha = C.ease(C.seg(t, .5, 1.0)); o.fillStyle = 'rgba(10,10,12,.8)'; o.beginPath(); o.arc(x, y, 250, 0, 7); o.fill(); o.beginPath(); o.arc(x, y, 230, 0, 7); o.clip(); o.drawImage(cv, x - 230, y - 230, 460, 460); o.restore(); };
  return { show };
}
async function cockpitPair(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x101010, envI: .55 });
  await sets.flightDeck(k, { sky: o.sky ?? 0xd8c8a8 });
  const cpt = await real.human({ id: C.CREW.bacos, seed: 40 }), b = await real.human({ id: C.HJ.bose, seed: 81 });
  real.put(scene, cpt, { pos: [.55, 0, .12], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried' });
  real.put(scene, b, { pos: [-.55, 0, .12], rot: .2, pose: 'sit', seatH: .5, mood: 'stern' });
  C.attach(b, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
  [cpt, b].forEach(p => p.userData.driven = true);
  return { cpt, b };
}

export const shots = {
  // "Who are these four people?" — four silhouettes, rim light only
  '2.1': async k => {
    const { camera } = k; k.noAutoOverlay = true;
    const { ppl } = await lineup(k);
    // QA r2: figures were tiny and near black -> camera ~40% closer, keys lifted so faces and clothes read (still low-key)
    const cam = C.dolly(camera, { pos: [0, 1.5, 5.9], look: [0, 1.2, 0], fov: 40 }, { pos: [0, 1.48, 5.05], look: [0, 1.25, 0], fov: 40 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => { p.update(t, { mood: 'stern', look: Math.sin(t * .3 + i) * .05 }); p.userData.key.intensity = 75; });
      const o = k.overlay; ppl.forEach((p, i) => { const [x, y] = proj(camera, C.headPos(p, .5)); o.save(); o.globalAlpha = C.ease(C.seg(t, .8 + i * .35, 1.2 + i * .35)); o.fillStyle = '#e8b321'; o.font = '88px "Anton"'; o.textAlign = 'center'; o.fillText('?', x, y); o.restore(); }); };
  },
  // the two Palestinians step into the light
  '2.2': async k => {
    const { camera } = k; k.noAutoOverlay = true;
    const { ppl } = await lineup(k);
    const cam = C.dolly(camera, { pos: [0, 1.6, 6.5], look: [0, 1.25, 0], fov: 40 }, { pos: [-1.6, 1.6, 4.4], look: [-1.6, 1.3, 0], fov: 40 });
    return (t, u) => { cam(u);
      ppl.forEach((p, i) => { p.update(t, { mood: 'stern', look: Math.sin(t * .3 + i) * .05 }); p.userData.key.intensity = i < 2 ? 140 * C.ease(C.seg(t, .4, 1.2)) : 0; });
      labelAt(k, ppl[0], 'PALESTINIAN', 'PFLP-EO', t, 1.4); labelAt(k, ppl[1], 'PALESTINIAN', 'PFLP-EO', t, 1.7); };
  },
  // Böse and Kuhlmann
  '2.3': async k => {
    const { camera } = k; k.noAutoOverlay = true;
    const { ppl } = await lineup(k);
    const cam = C.dolly(camera, { pos: [-1.6, 1.6, 4.4], look: [-1.6, 1.3, 0], fov: 40 }, { pos: [1.6, 1.6, 4.2], look: [1.6, 1.3, 0], fov: 40 });
    return (t, u) => { cam(u);
      ppl.forEach((p, i) => { p.update(t, { mood: 'stern', look: Math.sin(t * .3 + i) * .05 }); p.userData.key.intensity = i >= 2 ? 140 * C.ease(C.seg(t, .6, 1.4)) : 140 * (1 - C.ease(C.seg(t, .2, 1.0))); });
      // QA r2: the two labels overlapped while the pan was still moving -> both follow their heads but are kept a fixed minimum
      // screen distance apart (pushed apart around their midpoint, clamped to frame), and Kuhlmann's pops in later
      let [xb, yb] = proj(camera, C.headPos(ppl[2], .34)), [xk, yk] = proj(camera, C.headPos(ppl[3], .34)); const GAP = 470;
      if (xk - xb < GAP) { const mid = (xb + xk) / 2; xb = mid - GAP / 2; xk = mid + GAP / 2; }
      xk = Math.min(1660, Math.max(xk, 260 + GAP)); xb = Math.max(260, Math.min(xb, xk - GAP));
      ui.callout(k.overlay, 'WILFRIED BÖSE', 'REVOLUTIONARY CELLS', xb, yb, t, 1.8); ui.callout(k.overlay, 'BRIGITTE KUHLMANN', 'REVOLUTIONARY CELLS', xk, yk, t, 3.0); };
  },
  // QA r2: black corners past the map edge -> same shot, camera pulled in along its view ray each frame so the map fills the frame
  '2.4': async k => {
    const f = await old['2.4'](k); const cam = k.camera, dir = new THREE.Vector3();
    return (t, u) => { f(t, u); cam.getWorldDirection(dir); if (dir.y < -.05) { const d = -cam.position.y / dir.y; cam.position.addScaledVector(dir, d * .3); cam.updateMatrixWorld(); } };
  },
  // QA r2: pans floated with no strings, low detail, the plane was a white blob -> a brass balance scale on a wooden base:
  // turned column with collars, bevelled beam with end hooks, three link chains per pan to a lathed dish, normal-mapped brass,
  // the engine's A300 as a desk model on one pan and steel padlocks on the other
  '2.5': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070504, envI: .55 });
    const brass = await real.pbr('metal_plate', { repeat: [2, 2], color: 0xc8963c, metal: 1, rough: .32, noMap: true, normal: .35 });
    const brassD = await real.pbr('metal_plate', { repeat: [1, 1], color: 0x9a6e2a, metal: 1, rough: .4, noMap: true, normal: .5 });
    const wood = real.std(0x2a160c, { rough: .55, mat: { map: real.canvasTex(512, 512, (c, w, h) => { c.fillStyle = '#7a4a2a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 90; i++) { c.strokeStyle = `rgba(${40 + (i * 13) % 30},${20 + (i * 7) % 15},8,${.2 + (i % 5) * .08})`; c.lineWidth = 1 + (i % 4); c.beginPath(); const y = (i * 37) % h; c.moveTo(0, y); c.bezierCurveTo(w * .3, y + 8, w * .6, y - 10, w, y + 4); c.stroke(); } }) } });
    wood.color.set(0xffffff);
    const lathe = (pts, mat, o) => real.m(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 48), mat, o);
    // table and backdrop
    scene.add(real.m(new THREE.BoxGeometry(7, .08, 3.5), wood, { pos: [0, -.04, 0] }));
    scene.add(real.m(new THREE.PlaneGeometry(14, 8), real.std(0x1a120c, { rough: .95 }), { pos: [0, 3, -2.5], cast: false }));
    // base: stepped wooden plinth with a brass foot
    scene.add(real.rbox(1.5, .14, .9, .04, wood, { pos: [0, .07, 0] })); scene.add(real.rbox(1.2, .1, .7, .03, wood, { pos: [0, .19, 0] }));
    scene.add(lathe([[0, 0], [.32, 0], [.32, .04], [.26, .08], [.2, .1], [.12, .16], [.1, .2], [0, .2]], brass, { pos: [0, .24, 0] }));
    // column with collars and a finial
    scene.add(lathe([[0, 0], [.07, 0], [.06, .1], [.045, .2], [.04, 1.6], [.06, 1.62], [.06, 1.66], [.04, 1.7], [.04, 1.85], [0, 1.85]], brass, { pos: [0, .44, 0] }));
    for (const y of [.62, 1.2]) scene.add(real.m(new THREE.TorusGeometry(.05, .014, 10, 24), brassD, { pos: [0, y, 0], rot: [P / 2, 0, 0] }));
    scene.add(lathe([[0, 0], [.05, .02], [.07, .08], [.05, .14], [.015, .22], [0, .26]], brass, { pos: [0, 2.32, 0] }));
    // beam pivots at y=2.25
    const beam = new THREE.Group(); beam.position.set(0, 2.25, 0); scene.add(beam);
    beam.add(real.rbox(3.7, .09, .1, .03, brass, {})); beam.add(real.rbox(1.0, .16, .12, .04, brass, {}));
    beam.add(real.m(new THREE.CylinderGeometry(.075, .075, .2, 24), brassD, { rot: [P / 2, 0, 0] }));
    beam.add(real.m(new THREE.ConeGeometry(.03, .35, 12), brass, { pos: [0, .25, 0] }));
    for (const s of [1, -1]) { beam.add(real.m(new THREE.SphereGeometry(.065, 20, 14), brass, { pos: [s * 1.85, 0, 0] })); for (let i = 1; i < 4; i++) beam.add(real.m(new THREE.TorusGeometry(.055, .008, 6, 20), brassD, { pos: [s * (1.85 - i * .38), 0, 0], rot: [0, P / 2, 0] })); }
    // pans hang from hooks at the beam ends; three chains each from the hook ring to the rim
    const chainLink = new THREE.TorusGeometry(.016, .0045, 6, 12);
    const chain = (g, a, b) => { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), n = Math.round(A.distanceTo(B) / .026); const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
      for (let i = 0; i <= n; i++) { const lk = new THREE.Mesh(chainLink, brassD); lk.position.lerpVectors(A, B, i / n); lk.quaternion.copy(q); lk.rotateY(i % 2 ? P / 2 : 0); lk.rotateX(P / 2); lk.castShadow = true; g.add(lk); } };
    const DROP = 1.05, RIM = .6;
    const pans = [-1.85, 1.85].map(x => { const p = new THREE.Group(); p.position.set(x, 0, 0); beam.add(p);
      p.add(real.m(new THREE.TorusGeometry(.045, .012, 8, 20), brassD, { pos: [0, -.08, 0] }));
      p.add(real.m(new THREE.CylinderGeometry(.012, .012, .1, 8), brassD, { pos: [0, -.03, 0] }));
      for (let i = 0; i < 3; i++) { const a = i / 3 * P * 2 + P / 6; chain(p, [0, -.12, 0], [Math.cos(a) * RIM, -DROP + .04, Math.sin(a) * RIM]); }
      p.add(lathe([[0, 0], [.4, .015], [.56, .06], [.64, .12], [.66, .14], [.64, .145], [.55, .085], [.4, .04], [0, .028]], brass, { pos: [0, -DROP - .06, 0] }));
      p.add(real.m(new THREE.TorusGeometry(.65, .012, 8, 48), brassD, { pos: [0, -DROP + .08, 0], rot: [P / 2, 0, 0] }));
      return p; });
    // the airliner (engine A300) as a desk model, ~0.62 m long
    const jet = await sets.a300(); jet.scale.setScalar(.0165); jet.rotation.y = -P / 2 + .5; jet.position.set(0, -DROP - .02, 0); pans[0].add(jet);
    // padlocks: steel body, chrome shackle, keyhole
    const steel = real.std(0x5a5c60, { metal: .85, rough: .35 }), shk = real.std(0xc8ccd0, { metal: .95, rough: .2 }), key = real.std(0x101010);
    for (let i = 0; i < 5; i++) { const l = new THREE.Group();
      l.add(real.rbox(.22, .18, .09, .025, steel, { pos: [0, .09, 0] })); l.add(real.m(new THREE.TorusGeometry(.068, .016, 10, 20, P), shk, { pos: [0, .18, 0] }));
      for (const sx of [1, -1]) l.add(real.m(new THREE.CylinderGeometry(.016, .016, .04, 10), shk, { pos: [sx * .068, .18, 0] }));
      l.add(real.m(new THREE.CylinderGeometry(.012, .012, .01, 10), key, { pos: [0, .08, .047], rot: [P / 2, 0, 0] }));
      l.position.set(-.28 + (i % 3) * .28, -DROP - .02 + Math.floor(i / 3) * .2, (i % 2) * .08 - .04 - Math.floor(i / 3) * .05); l.rotation.y = (i - 2) * .15; pans[1].add(l); }
    // lights: warm key from the front left, cool rim, a soft top fill
    const key1 = new THREE.SpotLight(0xffe2b8, 160, 14, .5, .6, 1.4); key1.position.set(-2.5, 4.2, 4); key1.target.position.set(0, 1.4, 0); key1.castShadow = true; key1.shadow.mapSize.set(2048, 2048); key1.shadow.radius = 4;
    const rim = new THREE.SpotLight(0x9fb4ff, 90, 12, .5, .6, 1.3); rim.position.set(2.5, 3.5, -2.2); rim.target.position.set(0, 1.6, 0);
    scene.add(key1, key1.target, rim, rim.target, new THREE.HemisphereLight(0xffe8d0, 0x201810, .5));
    const cam = C.dolly(camera, { pos: [0, 1.95, 5.6], look: [0, 1.45, 0], fov: 40 }, { pos: [.3, 1.85, 4.6], look: [0, 1.4, 0], fov: 40 });
    return (t, u) => { cam(u); const a = Math.sin(t * .8) * .05 + C.ease(C.seg(t, 1, 5)) * .12; beam.rotation.z = a; pans.forEach(p => p.rotation.z = -a + Math.sin(t * 1.3) * .01); };
  },
  '2.6': old['2.6'],
  // "Land here or crash" — Bacos on the radio, the Benina tower through the windscreen
  '2.7': async k => {
    const { real, scene, camera } = k;
    const { cpt, b } = await cockpitPair(k, { sky: 0xe6d2a8 });
    // control tower silhouette on the horizon, seen through the windows
    const tw = new THREE.Group(); tw.position.set(-2.6, 0, 40); scene.add(tw);
    tw.add(real.m(new THREE.CylinderGeometry(.9, 1.2, 9, 12), real.std(0x6a6458, { rough: .9 }), { pos: [0, 4.5, 0] }));
    tw.add(real.m(new THREE.CylinderGeometry(2.0, 1.6, 1.8, 12), real.std(0x3a3a38, { rough: .4, metal: .3 }), { pos: [0, 9.9, 0] }));
    // QA: grey hair showed through the front of the cap -> seat the cap higher/forward, a touch larger
    { const hb = cpt.parts.bones.Head; const cap = hb && hb.children.find(c => c.isGroup && c.children.length >= 5); if (cap) { const sc = cpt.parts.obj.scale.x; cap.position.y += .004 / sc; cap.position.z += .03 / sc; cap.rotation.x = .12; cap.scale.multiplyScalar(1.1); } }
    // headset mic on the captain
    const mic = new THREE.Mesh(new THREE.CapsuleGeometry(.012, .05, 4, 8), real.std(0x111111)); C.attach(cpt, mic, 'Head', [.06, -.08, .1], [0, 0, P / 2.5]);
    const cam = C.dolly(camera, { pos: [1.15, 1.45, .95], look: [.4, 1.25, .1], fov: 46 }, { pos: [1.0, 1.42, .8], look: [.45, 1.3, .12], fov: 40 });
    return (t, u) => { cam(u);
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried', look: .1, talk: t > .6 && t < 4.4 });
      b.update(t, { pose: 'sit', seatH: .5, arm: 'point', mood: 'stern', look: .6 });
      C.waveform(k.overlay, t, 420, 250, 300, t > .6 && t < 4.4); };
  },
  // on the ground at Benghazi: hijackers stretch their legs and talk with Libyan officials; trays go aboard
  '2.8': async k => {
    const { real, scene, camera } = k;
    const { jet } = await benghazi(k);
    const st = await stairsAt(jet, scene); const d = jet.userData.doorL1;
    const bx = d.x + 9, bz = d.z - 1;
    const ppl = [];
    const put = async (id, seed, pos, rot, o = {}) => { const p = await real.human({ id, seed }); real.put(scene, p, { pos, rot, mood: o.mood ?? 'calm' }); p.userData.driven = true; p.userData.o = o; ppl.push(p); return p; };
    await put(C.HJ.bose, 81, [bx + .3, 0, bz], -P / 2 + .2, { talk: true });
    await put(C.HJ.kuhlmann, 82, [bx + .5, 0, bz + 1.1], -P / 2 - .3);
    await put('tb_pa7', 220, [bx + 1.5, 0, bz + .2], P / 2 + .2, { talk: true, mood: 'happy' });
    await put('tb_pa10', 221, [bx + 1.6, 0, bz + 1.2], P / 2 - .2, { mood: 'calm' });
    // a caterer carries trays up the stairs
    const cat = await put('tb_pa8', 222, [d.x + 12.5, 0, d.z + 3.0], -P / 2, { walk: true });
    const tray = new THREE.Group(); for (let i = 0; i < 3; i++) tray.add(real.box(.45, .05, .32, real.std(0xd8d8d0, { rough: .4 }), { pos: [0, i * .06, 0] }));
    C.attach(cat, tray, 'RightHand', [0, -.05, .15]);
    const truck = new THREE.Group(); { // catering truck: cab, box body, windows, stripe, lamps, wheels
      const wh = real.std(0xece8dc, { rough: .5 }), gl = real.std(0x0c1014, { rough: .08, metal: .6 }), dk = real.std(0x1a1a1a, { rough: .8 }), ch = real.std(0xbfc3c6, { metal: .9, rough: .25 });
      truck.add(real.rbox(2.2, 2.0, 3.2, .1, wh, { pos: [0, 1.75, -.6] })); truck.add(real.rbox(2.1, 1.25, 1.4, .12, wh, { pos: [0, 1.2, 1.75] }));
      truck.add(real.box(1.8, .5, .04, gl, { pos: [0, 1.55, 2.46] })); for (const sx of [1, -1]) { truck.add(real.box(.04, .45, .8, gl, { pos: [sx * 1.06, 1.55, 1.75] })); truck.add(real.box(.03, .18, 3.2, real.std(0x1d3a8a, { rough: .5 }), { pos: [sx * 1.105, 1.3, -.6] })); truck.add(real.box(.25, .15, .04, real.std(0xfff4d0, { emissive: 0xfff4d0, ei: 1 }), { pos: [sx * .72, .95, 2.46] })); }
      truck.add(real.box(2.24, .16, .12, ch, { pos: [0, .55, 2.5] })); truck.add(real.box(.9, .28, .04, dk, { pos: [0, .95, 2.46] }));
      const wm = { tyre: real.std(0x111111, { rough: .9 }), hub: real.std(0xcfcfcf, { metal: .7, rough: .3 }), metal: ch };
      for (const [x, z] of [[-.95, 1.6], [.95, 1.6], [-.95, -1.4], [.95, -1.4]]) { const w = sets.wheel(.4, .28, wm); w.position.set(x, .4, z); truck.add(w); }
      truck.traverse(c => { if (c.isMesh) c.castShadow = true; }); } truck.position.set(d.x + 15, 0, d.z + 5); scene.add(truck);
    const cam = C.orbit(camera, [bx + .8, 1.2, bz + .6], 6.5, 2.0, .45, .9, 38, [bx + .2, 1.6, bz + .4]);
    return (t, u) => { cam(u);
      ppl.forEach((p, i) => {
        if (p === cat) { const w = C.seg(t, 0, 5.5); p.position.x = d.x + 12.5 - w * 3.4; p.position.z = d.z + 3.0; p.update(t, { pose: w < 1 ? 'walk' : 'idle', dist: w * 3.4, arm: 'hold' }); return; }
        p.update(t, { mood: p.userData.o.mood ?? 'calm', talk: p.userData.o.talk && Math.sin(t * 1.3 + i) > 0, look: Math.sin(t * .5 + i) * .15, arm: i === 2 && t > 2 && t < 3.5 ? 'point' : null });
      }); };
  },
  // one passenger is let go: a young woman is helped down the stairs
  '2.9': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    const { jet } = await benghazi(k);
    await stairsAt(jet, scene);
    const d = jet.userData.doorL1;
    const sx0 = d.x + .9, sx1 = d.x + 6.1, y0 = d.y;     // top of the stairs, then the truck deck, then the ground (stairs descend toward +x)
    const w = await real.human({ id: 'tb_pa9', seed: 230 }); real.put(scene, w, { pos: [sx0, y0, d.z], rot: P / 2, mood: 'worried' }); w.userData.driven = true;
    const s = await real.human({ id: C.CREW.steward, seed: 231 }); real.put(scene, s, { pos: [sx0 - .5, y0, d.z + .35], rot: P / 2, mood: 'worried' }); s.userData.driven = true;
    const off = await real.human({ id: 'tb_pa7', seed: 232 }); real.put(scene, off, { pos: [sx1 + 2.2, 0, d.z - .4], rot: -P / 2, mood: 'calm' }); off.userData.driven = true;
    const cam = C.dolly(camera, { pos: [sx1 + 7, 2.2, d.z + 8], look: [sx0 + 2.5, y0 * .6, d.z], fov: 40 }, { pos: [sx1 + 5.5, 1.8, d.z + 6], look: [sx1 - .5, 1.2, d.z], fov: 40 });
    const stairY = x => x < d.x + 6.25 ? C.lerp(y0, 1.25, C.seg(x, sx0, d.x + 6.25)) : C.lerp(1.25, 0, C.seg(x, d.x + 6.25, d.x + 7.2));
    return (t, u) => { cam(u);
      const a = C.ease(C.seg(t, .3, 5.0)); const x = C.lerp(sx0, sx1, a);
      w.position.set(x, stairY(x), d.z); w.update(t, { pose: a < 1 ? 'walk' : 'idle', dist: a * 6, mood: 'worried', arm: 'cover' });
      const xs = Math.max(sx0 - .5, x - .55); s.position.set(xs, stairY(xs), d.z + .35); s.update(t, { pose: a < 1 ? 'walk' : 'idle', dist: a * 6, arm: 'hug', mood: 'worried' });
      off.update(t, { look: -.2 });
      ui.chip(k.overlay, 'HER CLAIM AT THE TIME', 960, 230, t, 1.2); };
  },
  // full tank, the bowser pulls away and the jet leaves at dusk
  '2.10': async k => {
    const { real, scene, camera } = k;
    const { jet } = await benghazi(k, { hdri: 'industrial_sunset_puresky', sun: [-60, 12, -40], sunI: 3.2, sunColor: 0xffb070, envI: .8, fog: 0xc8906a });
    // QA: apron ended in a hard edge against the sky -> huge desert plane under it + exponential haze, no AO halos
    scene.add(real.m(new THREE.PlaneGeometry(12000, 12000), real.std(0xa89c8c, { rough: 1 }), { rot: [-P / 2, 0, 0], pos: [0, -.04, 0], cast: false }));
    scene.fog = new THREE.FogExp2(0xbdb6b2, .004);
    { const cv = document.createElement('canvas'); cv.width = cv.height = 512; const cx = cv.getContext('2d'); const gr = cx.createRadialGradient(256, 256, 0, 256, 256, 256);
      gr.addColorStop(0, 'rgba(196,202,210,0)'); gr.addColorStop(.015, 'rgba(196,202,210,0)'); gr.addColorStop(.07, 'rgba(196,202,210,.65)'); gr.addColorStop(.16, 'rgba(196,202,210,1)'); gr.addColorStop(1, 'rgba(196,202,210,1)'); cx.fillStyle = gr; cx.fillRect(0, 0, 512, 512);
      const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
      const hz = new THREE.Mesh(new THREE.PlaneGeometry(12000, 12000), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false, fog: false })); hz.rotation.x = -P / 2; hz.position.y = .06; hz.renderOrder = 2; hz.castShadow = false; scene.add(hz); }
    // QA r2: tarmac still met the sky in a hard line -> a far ring of low airfield buildings, hangars and masts, a scrub/palm
    // treeline behind them and a haze band over the seam, all in the fog colour family
    { const rnd = i => { const x = Math.sin(i * 127.1 + 3.7) * 43758.5453; return x - Math.floor(x); };
      const bm = [0x6a5e54, 0x7a6c60, 0x5c544e].map(c => real.std(c, { rough: .95 }));
      for (let i = 0; i < 70; i++) { const a = i / 70 * P * 2 + rnd(i) * .05, r = 260 + rnd(i + 9) * 160, w = 12 + rnd(i + 3) * 40, h = 4 + rnd(i + 5) * 10, d = 10 + rnd(i + 7) * 20;
        const b = real.box(w, h, d, bm[i % 3], { pos: [Math.cos(a) * r, h / 2, Math.sin(a) * r], cast: false }); b.rotation.y = -a; scene.add(b);
        if (i % 5 === 0) { const hg = real.m(new THREE.CylinderGeometry(14, 14, w + 10, 20, 1, false, 0, P), bm[(i + 1) % 3], { pos: [Math.cos(a) * (r + 30), 0, Math.sin(a) * (r + 30)], rot: [0, -a, P / 2], cast: false }); hg.rotation.set(P / 2, 0, 0); hg.rotation.z = -a; scene.add(hg); }
        if (i % 9 === 0) scene.add(real.m(new THREE.CylinderGeometry(.6, .9, 30, 8), bm[2], { pos: [Math.cos(a) * (r - 20), 15, Math.sin(a) * (r - 20)], cast: false })); }
      const tl = real.canvasTex(2048, 128, (c, W, H) => { c.clearRect(0, 0, W, H); c.fillStyle = '#4a4636';
        for (let i = 0; i < 380; i++) { const x = (i * 157.3) % W, r = 8 + ((i * 37) % 16), y = H - 18 - ((i * 53) % 30); c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
        for (let i = 0; i < 40; i++) { const x = (i * 263.7) % W; c.fillRect(x, 30, 4, H - 30); for (let f = 0; f < 6; f++) { c.beginPath(); c.ellipse(x + Math.cos(f) * 14, 30 + Math.sin(f) * 4, 18, 4, f, 0, 7); c.fill(); } }
        c.fillRect(0, H - 22, W, 22); });
      const tm = new THREE.MeshStandardMaterial({ map: tl, transparent: true, alphaTest: .5, roughness: 1, side: THREE.DoubleSide });
      for (let i = 0; i < 12; i++) { const a = i / 12 * P * 2, r = 520; const pl = real.m(new THREE.PlaneGeometry(2 * r * Math.tan(P / 12) + 20, 22), tm, { pos: [Math.cos(a) * r, 10.6, Math.sin(a) * r], cast: false }); pl.rotation.y = -a - P / 2; scene.add(pl); }
      const css = '#' + new THREE.Color(0x8c8680).getHexString();
      const ht = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.06, css); g.addColorStop(.22, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
      const band = real.m(new THREE.CylinderGeometry(1500, 1500, 400, 64, 1, true), new THREE.MeshBasicMaterial({ map: ht, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false }), { pos: [0, 200, 0], cast: false }); band.renderOrder = -1; scene.add(band); }
    scene.userData.fx = scene.userData.fx || {}; scene.userData.fx.ao = 0;
    const tr = bowser(); tr.position.set(12, 0, 2); tr.rotation.y = P * .9; scene.add(tr);
    const cam = C.dolly(camera, { pos: [30, 3, 42], look: [4, 3, 6], fov: 38 }, { pos: [36, 3.5, 30], look: [2, 5, 26], fov: 42 });
    const dur = k.meta.seconds;
    return (t, u) => { cam(u);
      const a = C.seg(t, .2, 2.8); tr.position.set(12 + a * 6, 0, 2 - a * 14);
      const r = C.seg(t, 2.0, dur); const z = 26 * r * r + 2 * r; jet.position.z = z;
      const rot = C.ease(C.seg(t, dur - 2.2, dur)); jet.rotation.x = -.16 * rot; jet.position.y = 3.5 * rot * rot; };
  },
  // "Fly south. To Uganda." — the heading turns again
  '2.11': async k => {
    const { camera } = k;
    const { cpt, b } = await cockpitPair(k, { sky: 0x2a3550 });
    const dial = headingDial();
    const cam = C.dolly(camera, { pos: [.05, 1.5, -.9], look: [-.45, 1.15, .4], fov: 46 }, { pos: [-.05, 1.45, -.55], look: [-.45, 1.2, .4], fov: 42 });
    return (t, u) => { cam(u); dial.show(k.overlay, t, 330 - 150 * C.ease(C.seg(t, 1.4, 4.2)));
      b.update(t, { pose: 'sit', seatH: .5, arm: t > .8 ? 'point' : null, mood: 'stern', look: .6, talk: t > 1 && t < 3 });
      cpt.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .5, mood: 'worried', look: -.25 }); };
  },
  // the word "Uganda" reaches the cabin: worried faces, a hand grips the armrest
  '2.12': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x101010, envI: .3 });
    const cb = await sets.cabin(k, { len: 10, lampI: 4, hemi: .6 });
    const pax = await C.fillCabin(k, cb, { mood: 'worried', skip: s => (s.row + s.col) % 5 === 0 });
    const over = {}; pax.forEach((p, i) => over[p.uuid] = { mood: 'worried', look: i % 2 ? .4 : -.3, arm: i % 4 === 0 ? 'cover' : 'lap' });
    const cam = C.dolly(camera, { pos: [1.11, 1.62, 4.4], look: [1.5, 1.0, 1.2], fov: 46 }, { pos: [1.11, 1.6, 3.0], look: [1.7, 1.0, -.2], fov: 42 });
    return (t, u) => { cam(u); C.idleSeated(pax, t, over); };
  },
  // night over Africa: reading lights go off one by one
  '2.13': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x05060a, envI: .1 });
    // QA r2: too dark, a blown-out head right at the lens -> more cabin fill, softer reading lights aimed at laps (not crowns),
    // camera low in the aisle at the front, the three nearest rows left empty so no head comes near the lens; faces lit from in front so no head comes near the lens
    const cb = await sets.cabin(k, { len: 12, lampI: 2.2, hemi: .42, sky: 0x0a1020 });
    const pax = await C.fillCabin(k, cb, { mood: 'sad', skip: s => s.row >= 10 || (s.row * 3 + s.col) % 5 === 0 });
    const lights = pax.filter((p, i) => i % 3 === 0).map((p, i) => { const s = p.userData.seat; const l = new THREE.SpotLight(0xffe2a8, 3.5, 3, .4, .7, 1.5); l.position.set(s.x, 2.15, s.z + .45); l.target.position.set(s.x, .8, s.z + .05); scene.add(l, l.target); l.userData.off = 1 + i * .45; return l; });
    const cam = C.dolly(camera, { pos: [-1.08, 1.74, 5.7], look: [-.8, 1.2, -4], fov: 44 }, { pos: [-1.08, 1.72, 5.2], look: [-.75, 1.15, -5], fov: 44 }, { ease: u => u });
    return (t, u) => { cam(u); C.idleSeated(pax, t, {}); lights.forEach(l => l.intensity = 3.5 * (1 - C.seg(t, l.userData.off, l.userData.off + .15))); };
  },
};
