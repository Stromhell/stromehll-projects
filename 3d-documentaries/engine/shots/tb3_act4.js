// Operation Thunderbolt · Act 4 · THE SELECTION — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
const { THREE, sets, P } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
async function hallEnv(k, o = {}) { await k.real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 }); return S2.hall(k, { lampI: o.lampI ?? 14, hemi: o.hemi ?? .9, dawn: o.dawn }); }
// people sit on top of the mattress (seatH .26: pelvis clears the .14 m cushion instead of sinking to the knee)
const MAT_SEAT = .26;
async function hostages(k, h, every = 2, mood = 'worried') {
  const ppl = [];
  for (let i = 0; i < h.mats.length; i += every) { const mt = h.mats[i]; const p = await k.real.human({ id: C.PAX[(i * 3) % 10], seed: 1000 + i }); k.real.put(k.scene, p, { pos: [mt.x, 0, mt.z], rot: mt.z > 0 ? P : 0, pose: 'sit', seatH: MAT_SEAT, arm: i % 3 ? 'lap' : 'hug', mood }); p.userData.driven = true; ppl.push(p); }
  return ppl;
}
const idle = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: MAT_SEAT, arm: i % 3 ? 'lap' : 'hug', mood: o.mood ?? 'worried', look: (o.look ?? 0) + Math.sin(t * .3 + i) * .15, nod: o.nod ?? .2 }));
function passport(color) { const g = new THREE.Group(); g.add(C.real.box(.09, .012, .125, C.real.std(color, { rough: .7 }))); g.add(C.real.box(.085, .013, .118, C.real.std(0xe8e2d0, { rough: .9 }), { pos: [.003, 0, 0] })); return g; }
// re-aim one limb bone after the lib pose (local copy of the lib's aim: direction in the person's frame)
const CHILD = { Arm: 'ForeArm', ForeArm: 'Hand' };
function aimBone(p, name, x, y, z) {
  const bones = p.parts.bones, base = name.replace(/^(Left|Right)/, ''), b0 = bones[name], c0 = bones[name.slice(0, name.length - base.length) + CHILD[base]];
  if (!b0 || !c0) return;
  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), rq = new THREE.Quaternion(), dq = new THREE.Quaternion(), wq = new THREE.Quaternion(), pq = new THREE.Quaternion();
  b0.updateWorldMatrix(true, true); b0.getWorldPosition(vA); c0.getWorldPosition(vB);
  const cur = vB.sub(vA).normalize(); p.getWorldQuaternion(rq);
  const want = new THREE.Vector3(x, y, z).normalize().applyQuaternion(rq);
  dq.setFromUnitVectors(cur, want); b0.getWorldQuaternion(wq); b0.parent.getWorldQuaternion(pq);
  b0.quaternion.copy(pq.invert().multiply(dq.multiply(wq))); b0.updateWorldMatrix(false, true);
}
// folded arms: left forearm flat against the chest, right forearm crossed in front of it, hands tucked under the opposite upper arm
function foldArms(p) {
  aimBone(p, 'LeftArm', .3, -.9, .22); aimBone(p, 'LeftForeArm', -1, .25, .12); aimBone(p, 'LeftHand', -1, .15, .05);
  aimBone(p, 'RightArm', -.34, -.82, .5); aimBone(p, 'RightForeArm', 1, .12, -.02); aimBone(p, 'RightHand', 1, .05, -.25);
}
// hands clasped in front of the belt
function claspFront(p) {
  aimBone(p, 'LeftArm', .2, -.95, .25); aimBone(p, 'LeftForeArm', -.55, -.35, .75); aimBone(p, 'LeftHand', -.6, -.3, .4);
  aimBone(p, 'RightArm', -.2, -.95, .25); aimBone(p, 'RightForeArm', .55, -.3, .75); aimBone(p, 'RightHand', .6, -.25, .4);
}
// a civilian crew member in a dark-blue airline jacket (the MakeHuman suit mesh recoloured navy)
function navyJacket(p) { p.traverse(c => { if (c.isMesh && /^clothes_(male|female)_/.test(c.name)) { c.material.map = null; c.material.color.set(0x1a2140); c.material.roughness = .8; } }); }
// ground haze: a gradient band round the horizon so the apron slab never ends in a hard edge against the night sky
function hazeBand(scene, { color = 0x2a3140, r = 150, h = 60, clear = .45, y = 0, op = .95 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = C.real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = C.real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// a road wheel: tyre with tread blocks, dished hub with bolts; axle along x, spins with rotation.x
function roadWheel(rad, w, mats) {
  const g = new THREE.Group(); const m = C.real.m;
  g.add(m(new THREE.CylinderGeometry(rad - .015, rad - .015, w, 36), mats.tyre, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.TorusGeometry(rad - w * .32, w * .3, 10, 36), mats.tyre, { rot: [0, P / 2, 0] }));
  for (let i = 0; i < 22; i++) { const a = i / 22 * P * 2; g.add(m(new THREE.BoxGeometry(w * .82, .032, .055), mats.tread, { pos: [0, Math.cos(a) * (rad - .012), Math.sin(a) * (rad - .012)], rot: [a, 0, 0] })); }
  g.add(m(new THREE.CylinderGeometry(rad * .56, rad * .56, w * .96, 28), mats.hub, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.CylinderGeometry(rad * .36, rad * .42, w * 1.02, 24), mats.hub, { rot: [0, 0, P / 2] }));
  g.add(m(new THREE.CylinderGeometry(rad * .14, rad * .14, w * 1.1, 16), mats.metal, { rot: [0, 0, P / 2] }));
  for (let i = 0; i < 5; i++) { const a = i / 5 * P * 2; g.add(m(new THREE.CylinderGeometry(.014, .014, w * 1.06, 8), mats.metal, { pos: [0, Math.cos(a) * rad * .26, Math.sin(a) * rad * .26], rot: [0, 0, P / 2] })); }
  g.userData.wheelR = rad; return g;
}
// a Ugandan ambulance, 1970s van: bevelled patient box with roof ribs, a proper cab (framed windscreen, side windows, door seams and handles,
// mirrors, wipers), round headlamps in chrome rings, grille, bumpers, red stripe and crosses, rear doors with windows and handles that open,
// a roof beacon, treaded tyres on dished hubs (userData.roll(dist) spins the wheels, userData.open(angle) swings the rear leaves).
function ambulance(o = {}) {
  const g = new THREE.Group(); const r = C.real, m = r.m;
  const white = r.std(0xe8e6de, { rough: .45 }), glass = r.std(0x0c1014, { rough: .08, metal: .6 });
  const red = r.std(0xb02a20, { rough: .5 }), chrome = r.std(0xbfc3c6, { metal: .9, rough: .25 }), dark = r.std(0x1a1a1a, { rough: .8 });
  const frame = r.std(0x2a2c2e, { rough: .6, metal: .3 }), rub = r.std(0x0e0e0f, { rough: .95 }), inner = r.std(0x9a9890, { rough: .9 });
  const cross = r.canvasTex(256, 256, c => { c.fillStyle = '#e8e6de'; c.fillRect(0, 0, 256, 256); c.fillStyle = '#c0392b'; c.fillRect(98, 40, 60, 176); c.fillRect(40, 98, 176, 60); });
  const crossMat = () => new THREE.MeshStandardMaterial({ map: cross, roughness: .6 });
  // chassis sill, patient box (bevelled), roof cap and ribs
  g.add(r.box(1.9, .18, 4.9, dark, { pos: [0, .5, 0] }));
  // the box is built from panels so the rear is a real opening: sides, roof, floor, bulkhead to the cab, rounded rear corner posts, lower valance
  for (const sx of [1, -1]) { g.add(r.rbox(.06, 1.75, 3.3, .03, white, { pos: [sx * .97, 1.45, -.75] })); g.add(m(new THREE.CylinderGeometry(.07, .07, 1.75, 12), white, { pos: [sx * .93, 1.45, -2.34] })); }
  g.add(r.rbox(2.0, .1, 3.3, .04, white, { pos: [0, 2.28, -.75] })); g.add(r.box(2.0, .06, 3.3, white, { pos: [0, .6, -.75] })); g.add(r.box(2.0, 1.75, .06, white, { pos: [0, 1.45, .88] }));
  g.add(r.box(2.0, .24, .08, white, { pos: [0, .5, -2.38] }));
  g.add(r.rbox(1.84, .08, 3.1, .03, white, { pos: [0, 2.36, -.75] }));
  for (const [w, h, x, y] of [[2.0, .06, 0, 2.3], [.08, 1.7, .97, 1.45], [.08, 1.7, -.97, 1.45]]) g.add(r.box(w, h, .05, frame, { pos: [x, y, -2.4] }));   // rear door frame
  for (let i = 0; i < 5; i++) g.add(r.box(1.8, .02, .04, frame, { pos: [0, 2.41, -2.15 + i * .7] }));
  // interior: floor, bench and a stretcher (seen through the open rear doors)
  g.add(r.box(1.8, .04, 3.1, inner, { pos: [0, .6, -.75] }));
  g.add(r.box(.5, .08, 2.6, inner, { pos: [-.6, .98, -.9] })); g.add(r.box(.5, .38, 2.6, r.std(0x8a8880, { rough: .9 }), { pos: [-.6, .77, -.9] }));
  g.add(r.box(.6, .06, 2.0, r.std(0x8a2a22, { rough: .8 }), { pos: [.45, .98, -1.0] })); for (const z of [-1.9, -.1]) g.add(r.box(.6, .3, .04, frame, { pos: [.45, .8, z] }));
  // cab: lower body, roof, bonnet lip, framed windscreen with A-pillars and wipers
  g.add(r.rbox(1.96, 1.05, 1.5, .14, white, { pos: [0, 1.12, 1.65] }));
  g.add(r.rbox(1.9, .62, 1.0, .1, white, { pos: [0, 1.9, 1.35] }));
  g.add(r.rbox(1.0, .1, .5, .04, white, { pos: [0, 1.68, 2.1] }));
  g.add(r.box(1.7, .5, .04, glass, { pos: [0, 1.88, 1.87], rot: [-.25, 0, 0] }));
  g.add(r.box(1.8, .05, .06, frame, { pos: [0, 2.13, 1.81], rot: [-.25, 0, 0] })); g.add(r.box(1.8, .05, .06, frame, { pos: [0, 1.63, 1.935], rot: [-.25, 0, 0] }));
  for (const sx of [1, -1]) g.add(r.box(.06, .56, .06, frame, { pos: [sx * .87, 1.88, 1.87], rot: [-.25, 0, 0] }));
  for (const x of [-.45, .35]) g.add(r.box(.5, .015, .02, dark, { pos: [x, 1.7, 1.96], rot: [.0, 0, .3] }));
  for (const sx of [1, -1]) {
    // cab side window with frame and quarter-light divider; box side window with frame
    g.add(r.box(.04, .45, .8, glass, { pos: [sx * .96, 1.9, 1.35] }));
    for (const [h, d, y, z] of [[.03, .86, 2.14, 1.35], [.03, .86, 1.66, 1.35], [.5, .03, 1.9, 1.77], [.5, .03, 1.9, .93], [.5, .03, 1.9, 1.5]]) g.add(r.box(.05, h, d, frame, { pos: [sx * .975, y, z] }));
    g.add(r.box(.04, .4, .9, glass, { pos: [sx * 1.01, 1.85, -.2] }));
    for (const [h, d, y, z] of [[.03, .96, 2.07, -.2], [.03, .96, 1.63, -.2], [.46, .03, 1.85, .27], [.46, .03, 1.85, -.67]]) g.add(r.box(.05, h, d, frame, { pos: [sx * 1.02, y, z] }));
    // red stripe, cab door seams, handle, fuel cap, mirror on an arm, wheel-arch lips with shadow, mudflaps
    g.add(r.box(.03, .14, 4.7, red, { pos: [sx * 1.015, 1.08, -.05] }));
    g.add(r.box(.015, 1.05, .015, dark, { pos: [sx * 1.0, 1.15, .9] })); g.add(r.box(.015, 1.05, .015, dark, { pos: [sx * 1.0, 1.15, 2.0] }));
    g.add(r.box(.03, .03, .14, chrome, { pos: [sx * 1.005, 1.3, 1.12] }));
    if (sx < 0) g.add(m(new THREE.CylinderGeometry(.05, .05, .02, 12), chrome, { pos: [sx * 1.015, 1.35, -1.9], rot: [0, 0, P / 2] }));
    g.add(r.box(.28, .025, .025, dark, { pos: [sx * 1.12, 1.78, 2.0] })); g.add(r.rbox(.05, .22, .16, .02, dark, { pos: [sx * 1.26, 1.78, 2.0] }));
    g.add(r.box(.04, .18, .12, glass, { pos: [sx * 1.24, 1.78, 1.99] }));
    for (const z of [1.55, -1.55]) {
      g.add(r.box(.06, .3, .95, dark, { pos: [sx * 1.0, .78, z] }));
      g.add(m(new THREE.TorusGeometry(.5, .025, 8, 28, P), chrome, { pos: [sx * 1.005, .4, z], rot: [0, P / 2, 0] }));
      g.add(r.box(.03, .2, .3, rub, { pos: [sx * .9, .28, z - .6] }));
    }
    // round headlamp in a chrome ring, amber indicator, tail-lamp cluster
    g.add(m(new THREE.CylinderGeometry(.15, .15, .05, 20), chrome, { pos: [sx * .66, .98, 2.42], rot: [P / 2, 0, 0] }));
    g.add(m(new THREE.CircleGeometry(.12, 20), r.std(0xfff4d0, { emissive: 0xfff4d0, ei: o.lights === false ? .2 : 1.5 }), { pos: [sx * .66, .98, 2.448], cast: false }));
    g.add(r.rbox(.18, .1, .04, .02, r.std(0xff9a20, { emissive: 0xff8a10, ei: .6 }), { pos: [sx * .78, .76, 2.42] }));
    g.add(r.rbox(.2, .09, .05, .02, r.std(0xff2020, { emissive: 0xff2020, ei: 2.5 }), { pos: [sx * .78, .55, -2.43] }));
    g.add(r.rbox(.2, .07, .05, .02, r.std(0xff9a20, { emissive: 0xff8a10, ei: .8 }), { pos: [sx * .78, .46, -2.43] }));
    // side cross
    g.add(m(new THREE.PlaneGeometry(.7, .7), crossMat(), { pos: [sx * 1.012, 1.68, -1.3], rot: [0, sx * P / 2, 0], cast: false }));
  }
  // grille with slats, chrome bumpers, number plate, rear step
  g.add(r.rbox(1.0, .32, .05, .03, dark, { pos: [0, .98, 2.41] }));
  for (let i = 0; i < 4; i++) g.add(r.box(.92, .02, .045, chrome, { pos: [0, .86 + i * .07, 2.43] }));
  g.add(r.rbox(2.08, .16, .14, .04, chrome, { pos: [0, .52, 2.46] })); g.add(r.rbox(2.08, .14, .14, .04, chrome, { pos: [0, .3, -2.48] }));
  g.add(r.box(.4, .1, .01, r.std(0xf0ecd8, { rough: .6 }), { pos: [0, .7, 2.49] }));
  g.add(r.box(1.6, .05, .34, dark, { pos: [0, .38, -2.6] }));   // rear step
  // rear doors: two leaves hinged at the outer corners, each with a window, a handle and a red cross
  const doors = [];
  for (const sx of [1, -1]) {
    const h = new THREE.Group(); h.position.set(sx * .97, 1.45, -2.4); g.add(h);
    h.add(r.rbox(.95, 1.62, .06, .03, white, { pos: [-sx * .485, 0, 0] }));
    h.add(r.box(.56, .42, .02, glass, { pos: [-sx * .485, .45, -.03] }));
    for (const [w, hh, x, y] of [[.62, .03, -sx * .485, .68], [.62, .03, -sx * .485, .22], [.03, .48, -sx * .485 + .3, .45], [.03, .48, -sx * .485 - .3, .45]]) h.add(r.box(w, hh, .04, frame, { pos: [x, y, -.03] }));
    h.add(r.box(.04, .2, .05, chrome, { pos: [-sx * .88, -.1, -.045] }));
    h.add(m(new THREE.PlaneGeometry(.48, .48), crossMat(), { pos: [-sx * .485, -.3, -.035], rot: [0, P, 0], cast: false }));
    h.add(r.box(.04, .06, .06, dark, { pos: [sx * .02, .6, -.02] })); h.add(r.box(.04, .06, .06, dark, { pos: [sx * .02, -.6, -.02] }));   // hinges
    h.userData.sx = sx; doors.push(h);
  }
  g.userData.doors = doors; g.userData.open = a => doors.forEach(h => { h.rotation.y = -h.userData.sx * a; });
  // roof beacon: chrome base, blue dome; aerial
  g.add(m(new THREE.CylinderGeometry(.11, .13, .05, 16), chrome, { pos: [0, 2.44, -.4] }));
  g.add(m(new THREE.SphereGeometry(.11, 16, 10, 0, P * 2, 0, P / 2), r.std(0x3070ff, { emissive: 0x3070ff, ei: 2, rough: .2 }), { pos: [0, 2.46, -.4] }));
  g.add(m(new THREE.CylinderGeometry(.01, .01, .5, 6), chrome, { pos: [-.6, 2.65, 1.0] }));
  // extra period detail (QA act4r3): side lettering, roof light bar with twin lamps, louvred vents, running boards, drip rails, panel rivets
  const word = r.canvasTex(512, 96, c => { c.fillStyle = '#e8e6de'; c.fillRect(0, 0, 512, 96); c.fillStyle = '#b02a20'; c.font = 'bold 64px Oswald, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AMBULANCE', 256, 50, 490); });
  for (const sx of [1, -1]) {
    g.add(m(new THREE.PlaneGeometry(1.5, .28), new THREE.MeshStandardMaterial({ map: word, roughness: .6 }), { pos: [sx * 1.013, 1.32, -1.0], rot: [0, sx * P / 2, 0], cast: false }));
    for (let i = 0; i < 6; i++) g.add(r.box(.02, .02, .3, frame, { pos: [sx * 1.005, .78 + i * .045, -2.0] }));
    g.add(r.box(.22, .04, 2.0, chrome, { pos: [sx * 1.0, .62, 0] }));
    g.add(r.box(.04, .03, 3.4, chrome, { pos: [sx * 1.0, 2.34, -.75] }));
    for (let i = 0; i < 9; i++) g.add(m(new THREE.SphereGeometry(.012, 6, 4), chrome, { pos: [sx * 1.0, 2.22, -2.25 + i * .38] }));
  }
  g.add(r.rbox(1.2, .1, .22, .04, frame, { pos: [0, 2.5, 1.45] }));
  for (const sx of [1, -1]) g.add(r.rbox(.26, .12, .2, .04, r.std(0x3070ff, { emissive: 0x3070ff, ei: 1.6, rough: .2 }), { pos: [sx * .4, 2.6, 1.45] }));
  g.add(r.rbox(.3, .1, .18, .03, r.std(0xff2020, { emissive: 0xff2020, ei: 1.2 }), { pos: [0, 2.6, 1.45] }));
  // wheels
  const wm = { tyre: r.std(0x151515, { rough: .95 }), tread: r.std(0x1e1e1e, { rough: .9 }), hub: r.std(0xcfcfcf, { metal: .7, rough: .3 }), metal: chrome };
  const wheels = [];
  for (const [x, z] of [[-.88, 1.55], [.88, 1.55], [-.88, -1.55], [.88, -1.55]]) { const w = roadWheel(.38, .26, wm); w.position.set(x, .38, z); g.add(w); wheels.push(w); }
  g.userData.wheels = wheels; g.userData.roll = dist => wheels.forEach(w => { w.rotation.x = dist / w.userData.wheelR; });
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}
async function night(k) {
  await k.real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-40, 60, -30], sunI: 2.2, sunColor: 0xa8bcff, shadowSize: 40, bg: 0x04050b, envI: .28, exposure: 1.1 });
  k.scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, .8));
}
// the a300's landing gear group (the group that holds the wheels)
const gearOf = jet => jet.children.find(c => c.isGroup && c.children.some(cc => cc.userData && cc.userData.wheelR));

export const shots = {
  // a hijacker at a table, reading names from a stack of passports
  '4.1': async k => {
    const { real, scene, camera } = k;
    const h = await hallEnv(k);
    const ppl = await hostages(k, h, 3);
    const desk = await real.prop('metal_office_desk'); desk.position.set(0, 0, 0); desk.rotation.y = P; scene.add(desk);
    // the prop's fine perforated-metal maps alias into a dotted moiré on the top at this distance: plain painted steel instead, with papers and a pen for detail
    const steel = real.std(0x6e6a5e, { rough: .58, metal: .25 });
    desk.traverse(c => { if (c.isMesh) c.material = steel; });
    const paper = real.std(0xe9e4d4, { rough: .95 });
    for (let i = 0; i < 4; i++) scene.add(real.box(.21, .003, .3, paper, { pos: [-.45 + i * .05, .782 + i * .003, -.05 + (i % 2) * .08], rot: [0, (i - 1.5) * .12, 0] }));
    scene.add(real.box(.21, .003, .3, paper, { pos: [.05, .782, .18], rot: [0, -.3, 0] }));
    scene.add(real.m(new THREE.CylinderGeometry(.005, .005, .15, 8), real.std(0x1a1c22, { rough: .35 }), { pos: [-.15, .786, .2], rot: [0, 0, P / 2] }));
    const b = await real.human({ id: C.HJ.bose, seed: 81 }); real.put(scene, b, { pos: [0, 0, -.75], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern' }); b.userData.driven = true;
    const chair = await real.prop('plastic_monobloc_chair_01'); chair.position.set(0, 0, -.85); scene.add(chair);
    const cols = [0x1f3a8a, 0x7a1e1e, 0x1e5a2e, 0x2a2a2a];
    for (let i = 0; i < 14; i++) { const pp = passport(cols[i % 4]); pp.position.set(.35, .77 + i * .013, -.1); pp.rotation.y = (i % 3) * .08; scene.add(pp); }
    const open = passport(0x1f3a8a); C.attach(b, open, 'RightHand', [0, -.04, .06], [P / 2.4, 0, 0]);
    const lamp = new THREE.SpotLight(0xffe0b0, 40, 6, .5, .6, 1.4); lamp.position.set(.3, 2.6, .6); lamp.target.position.set(0, .8, -.3); lamp.castShadow = true; scene.add(lamp, lamp.target);
    const cam = C.dolly(camera, { pos: [1.8, 1.5, 2.6], look: [0, 1.0, -.5], fov: 42 }, { pos: [1.0, 1.4, 1.6], look: [0, 1.15, -.6], fov: 38 });
    return (t, u) => { cam(u); b.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern', talk: Math.sin(t * 1.4) > -.3, nod: .35 }); idle(ppl, t, { look: .5 }); };
  },
  // Israeli and Jewish passengers led through a doorway into a second room
  '4.2': async k => {
    const { real, scene, camera } = k;
    const h = await hallEnv(k);
    // partition wall across the hall at z -2 with a double doorway centred on x 2 (clear of the columns at x 0 and 4); the second room behind it is darker
    const DX = 2, OW = 2.2;
    const wall = real.std(0xcfc4a8, { rough: .9 });
    scene.add(real.box(DX - OW / 2 + 12, 4.4, .25, wall, { pos: [(DX - OW / 2 - 12) / 2, 2.2, -2] }));
    scene.add(real.box(12 - DX - OW / 2, 4.4, .25, wall, { pos: [(DX + OW / 2 + 12) / 2, 2.2, -2] }));
    scene.add(real.box(OW, 1.9, .25, wall, { pos: [DX, 3.45, -2] }));
    // dark wood frame, both door leaves thrown open flat against the near face of the wall, brass handles, panelled
    const wood = real.std(0x7a5436, { rough: .62 }), panel = real.std(0x5e3e26, { rough: .7 }), brass = real.std(0xc9a24a, { metal: .8, rough: .35 });
    for (const x of [DX - OW / 2 - .05, DX + OW / 2 + .05]) scene.add(real.box(.1, 2.5, .32, wood, { pos: [x, 1.25, -2] }));
    scene.add(real.box(OW + .2, .1, .32, wood, { pos: [DX, 2.55, -2] }));
    for (const s of [-1, 1]) {
      const cx = DX + s * (OW / 2 + .53); scene.add(real.box(1.06, 2.42, .05, wood, { pos: [cx, 1.22, -1.845] }));
      for (const y of [.6, 1.75]) scene.add(real.box(.8, .9, .015, panel, { pos: [cx, y, -1.812] }));
      scene.add(real.box(.03, .03, .14, brass, { pos: [cx + s * .45, 1.05, -1.8] })); scene.add(real.box(.06, .06, .02, brass, { pos: [cx + s * .45, 1.05, -1.815] }));
      for (const y of [.3, 2.1]) scene.add(real.box(.03, .08, .06, wood, { pos: [DX + s * (OW / 2 + .02), y, -1.85] }));   // hinges
    }
    // the aisle through the doorway is clear of beds; the second-room row behind the door moves a metre back (and the back row a little, so they do not stack)
    h.group.children.forEach(c => { const x = c.position.x, z = c.position.z; if (Math.abs(x - DX) < 1.05 && (z > .5 || z < -2.4)) c.visible = false;
      else if (Math.abs(x - DX) < 3.4 && z < -2.4 && z > -4.6) c.position.z -= 1.0; else if (Math.abs(x - DX) < 3.4 && z <= -4.6 && z > -6.4) c.position.z -= .6; });
    const lineX = i => DX + Math.sin(i * 2.1) * .15, lineZ = (i, t) => 3.3 - i * 1.25 - t * .9;
    const line = [];
    for (let i = 0; i < 9; i++) { const p = await real.human({ id: C.PAX[(i * 7) % 10], seed: 1100 + i }); real.put(scene, p, { pos: [lineX(i), 0, lineZ(i, 0)], rot: P, mood: 'worried' }); p.userData.driven = true; line.push(p); }
    const g = await real.human({ id: C.HJ.kuhlmann, seed: 82 }); real.put(scene, g, { pos: [DX + 1.25, 0, -.8], rot: -P / 2 - .4, mood: 'stern' }); g.userData.driven = true; C.attach(g, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    // camera on the aisle side of the column at (4, 2.33), angled on the doorway
    const cam = C.dolly(camera, { pos: [DX + 1.0, 1.7, 5.2], look: [DX + .3, 1.2, -2], fov: 42 }, { pos: [DX + .8, 1.65, 3.6], look: [DX + .3, 1.2, -2.5], fov: 40 });
    return (t, u) => { cam(u);
      line.forEach((p, i) => { const z = lineZ(i, t); p.visible = z > -4.5; p.position.set(lineX(i), 0, z); p.update(t, { pose: 'walk', dist: t * .9 + i * .4, mood: 'worried' }); });
      g.update(t, { arm: 'point', mood: 'stern', look: .2 }); };
  },
  // an elderly man looks down at his sleeve; the memory of Europe thirty years before
  '4.3': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await hallEnv(k, { lampI: 8, hemi: .5 });
    const m = await real.human({ id: 'tb_pa10', seed: 1200 }); real.put(scene, m, { pos: [0, 0, 0], rot: 0, pose: 'sit', seatH: .45, mood: 'sad' }); m.userData.driven = true;
    const chair = await real.prop('plastic_monobloc_chair_01'); chair.position.set(0, 0, -.1); scene.add(chair);
    const key = new THREE.SpotLight(0xffd8a8, 50, 6, .45, .7, 1.4); key.position.set(1.2, 2.6, 1.6); key.target.position.set(0, 1.0, 0); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [.9, 1.35, 1.9], look: [0, 1.05, 0], fov: 34 }, { pos: [.6, 1.3, 1.3], look: [0, 1.0, 0], fov: 30 });
    return (t, u) => { cam(u); m.update(t, { pose: 'sit', seatH: .45, arm: 'hold', mood: 'sad', nod: .2 + .5 * C.ease(C.seg(t, .6, 2.2)), look: -.15 });
      // his left forearm rests along the chair's armrest (upper arm hanging, forearm level, hand draped over the front), clear of the plastic
      aimBone(m, 'LeftArm', .22, -1, .08); aimBone(m, 'LeftForeArm', .06, .02, 1); aimBone(m, 'LeftHand', .02, -.35, 1);
      aimBone(m, 'RightArm', -.22, -1, .08); aimBone(m, 'RightForeArm', -.06, .02, 1); aimBone(m, 'RightHand', -.02, -.35, 1);
      const o = k.overlay; o.save(); o.fillStyle = 'rgba(112,72,30,.16)'; o.fillRect(0, 0, 1920, 1080);
      const g = o.createRadialGradient(960, 540, 300, 960, 540, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,12,4,.75)'); o.fillStyle = g; o.fillRect(0, 0, 1920, 1080); o.restore(); };
  },
  // Dora Bloch, 75, helped into an ambulance
  '4.4': async k => {
    const { real, scene, camera } = k;
    await night(k);
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -14], lit: [2, 3, 4, 5, 6], wall: 0xc8bca4 });
    hazeBand(scene);
    // the ambulance waits with its rear doors open and the interior lit; its rear step is at world x 4.3, z 2
    const amb = ambulance(); amb.position.set(6.8, 0, 2); amb.rotation.y = P / 2 + .5; scene.add(amb); amb.userData.open(P * .78);   // rear at (4.7, 3.2), facing the camera
    const cabin = new THREE.PointLight(0xffe8c0, 6, 5, 2); cabin.position.set(0, 2.1, -1.2); amb.add(cabin);
    const flood = new THREE.SpotLight(0xfff0d0, 200, 40, .6, .5, 1.3); flood.position.set(-4, 7, 6); flood.target.position.set(3, 0, 2); flood.castShadow = true; scene.add(flood, flood.target);
    const A = new THREE.Vector3(-1.9, 0, 1.5), B = new THREE.Vector3(3.75, 0, 3.55), dir = B.clone().sub(A), LEN = dir.length(); dir.normalize();
    const heading = Math.atan2(dir.x, dir.z), side = new THREE.Vector3(dir.z, 0, -dir.x);
    const d = await real.human({ id: 'tb_pa2', seed: 1300 }); real.put(scene, d, { pos: A.toArray(), rot: heading, mood: 'sad' }); d.userData.driven = true;
    const s1 = await real.human({ id: 'tb_ug1', seed: 1301 }); real.put(scene, s1, { pos: A.clone().addScaledVector(dir, -1.5).addScaledVector(side, -.35).toArray(), rot: heading }); s1.userData.driven = true;
    const s2 = await real.human({ id: 'tb_ug3', seed: 1302 }); real.put(scene, s2, { pos: [3.25, 0, 1.95], rot: .3 }); s2.userData.driven = true;   // waits by the far door leaf, faces her
    const cam = C.dolly(camera, { pos: [-1, 1.7, 9], look: [.7, 1.2, 2.3], fov: 40 }, { pos: [.4, 1.6, 7.4], look: [3.0, 1.2, 3.0], fov: 38 });
    return (t, u) => { cam(u);
      const w = C.ease(C.seg(t, .2, 5.4)); d.position.copy(A).addScaledVector(dir, w * LEN); const ws = C.ease(C.seg(t, .2, 5.0)) * (LEN - .6) / LEN; s1.position.copy(A).addScaledVector(dir, ws * LEN - 1.5).addScaledVector(side, -.35); /* the escort trails ~1.5 m behind on the camera-left and stops short of the step (QA act4r4) */
      d.update(t, { pose: w < 1 ? 'walk' : 'idle', dist: w * LEN * .7, mood: 'sad' }); s1.update(t, { pose: ws * LEN < LEN - .61 ? 'walk' : 'idle', dist: ws * LEN * .7 });
      s2.update(t, { arm: w > .7 ? 'point' : null, look: -.2 });   // the second soldier at the doors reaches out a hand as she arrives
      k.anchor = C.headPos(d, .35); };
  },
  // the ambulance drives off into the dark
  '4.5': async k => {
    const { scene, camera } = k;
    await night(k);
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -14], lit: [2, 3, 4, 5, 6], wall: 0xc8bca4 });
    hazeBand(scene);
    const amb = ambulance(); scene.add(amb);
    const beacon = new THREE.PointLight(0x3070ff, 0, 10, 2); beacon.position.set(0, 2.7, -.4); amb.add(beacon);
    // fill that travels with the van (apron floods / its own lamps) so it never sinks into the dark (QA act4r3)
    const fill = new THREE.SpotLight(0xfff0d8, 160, 30, .55, .6, 1.2); fill.position.set(-3, 7, 5); scene.add(fill, fill.target);
    const lampL = new THREE.SpotLight(0xfff4d0, 40, 25, .4, .5, 1.3); lampL.position.set(0, 1, 2.5); lampL.target.position.set(0, 0, 12); amb.add(lampL, lampL.target);
    const tail = new THREE.PointLight(0xff3020, 3, 4, 2); tail.position.set(0, .6, -2.8); amb.add(tail);
    const cam = C.dolly(camera, { pos: [-4, 1.6, 6], look: [3, 1.2, 0], fov: 40 }, { pos: [-4, 1.6, 6], look: [15, 1.4, -2], fov: 40 });
    return (t, u) => { cam(u); const a = C.seg(t, .3, k.meta.seconds); amb.position.set(6.8 + a * a * 11, 0, 2 - a * a * 5); amb.rotation.y = P / 2 + .4 * a; amb.userData.roll(a * a * 12.1); beacon.intensity = Math.sin(t * 9) > 0 ? 12 : 2;
      fill.position.set(amb.position.x - 6, 7, amb.position.z + 6); fill.target.position.copy(amb.position); };
  },
  // released groups walk to a waiting jet
  '4.6': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-50, 55, 40], sunI: 4.2, sunColor: 0xfff0d8, shadowSize: 50, envI: 1, fog: [0xd8dde2, 120, 900] });
    await sets.apron(k, { sign: 'ENTEBBE', terminalPos: [-30, 0, -62] });   // terminal shifted left so the sign sits inside the frame
    const jet = await sets.a300(); jet.position.set(0, 0, 0); scene.add(jet);
    const d = jet.userData.doorL1; const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st);
    // boarding steps up the truck's outer side onto the deck (the lib stair starts from the 1.1 m deck)
    const SX = st.position.x + 1.15, DECK = 1.1, stepM = real.std(0x6a6c70, { rough: .7, metal: .4 }), rail = real.std(0xb8bcc0, { metal: .8, rough: .3 });
    for (let i = 1; i <= 4; i++) scene.add(real.box(.32, .05, 1.3, stepM, { pos: [SX + 1.3 - i * .3, i * DECK / 4, d.z] }));
    for (const z of [-.66, .66]) { scene.add(real.m(new THREE.CylinderGeometry(.02, .02, 1.5, 8), rail, { pos: [SX + .65, DECK / 2 + .95, d.z + z], rot: [0, 0, P / 2 - Math.atan2(DECK, 1.2)] })); for (const x of [SX + 1.2, SX + .1]) scene.add(real.m(new THREE.CylinderGeometry(.02, .02, .95, 6), rail, { pos: [x, (x > SX + .6 ? .1 : DECK) + .48, d.z + z] })); }
    // the path: across the apron to the boarding steps, up onto the deck, along it, up the main stair to the door
    const A = [34, 26], B = [SX + 1.4, d.z], L1 = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const topX = st.position.x + st.userData.top.x, stFoot = st.position.x - .2;
    const L2 = 1.4, L3 = stFoot - (SX - .1), L4 = stFoot - (topX + .6), L5 = 1.2;
    const seg = (s, a, b) => Math.min(1, Math.max(0, (s - a) / (b - a)));
    const at = s => {   // path distance (horizontal) -> [x, y, z, heading], or null past the door
      if (s < L1) { const f = s / L1; return [A[0] + (B[0] - A[0]) * f, 0, A[1] + (B[1] - A[1]) * f, Math.atan2(B[0] - A[0], B[1] - A[1])]; }
      let s2 = s - L1; if (s2 < L2) return [B[0] - s2, DECK * seg(s2, .1, 1.3), d.z, -P / 2];
      s2 -= L2; if (s2 < L3) return [SX - .1 - s2, DECK, d.z, -P / 2];
      s2 -= L3; if (s2 < L4) return [stFoot - s2, DECK + (d.y - DECK) * (s2 / L4), d.z, -P / 2];
      s2 -= L4; if (s2 < L5) return [topX + .6 - s2, d.y, d.z, -P / 2];
      return null;
    };
    const SPEED = 1.15, GAP = 1.7, head0 = L1 + L2 + L3 + 1.6;   // the first walker is already on the stair at t 0, the queue trails back along the approach
    const sOf = (i, t) => head0 - i * GAP + t * SPEED;
    const walkers = [];
    for (let i = 0; i < 14; i++) { const p = await real.human({ id: C.PAX[i % 10], seed: 1400 + i }); const q = at(sOf(i, 0)) ?? [0, 0, 0, 0]; real.put(scene, p, { pos: [q[0], q[1], q[2]], rot: q[3], mood: i % 3 ? 'calm' : 'happy' }); p.userData.driven = true; walkers.push(p); }
    const cam = C.dolly(camera, { pos: [36, 3, 40], look: [10, 2, 18], fov: 40 }, { pos: [30, 2.6, 34], look: [8, 2, 20], fov: 40 });
    return (t, u) => { cam(u);
      walkers.forEach((p, i) => { const s = sOf(i, t), q = at(s); p.visible = !!q; if (!q) return; p.position.set(q[0], q[1], q[2]); p.rotation.y = q[3]; p.update(t, { pose: 'walk', dist: s, mood: i % 3 ? 'calm' : 'happy', nod: s > L1 + L2 + L3 ? -.1 : 0 }); }); };
  },
  // Captain Bacos refuses to leave: he stands in front of his crew
  '4.7': async k => {
    const { real, scene, camera } = k;
    await hallEnv(k, { lampI: 12 });
    // clear floor for the line-up: take out the mattresses under and just behind the crew so every foot stands on the tiles (QA act4r3)
    const drop = []; scene.traverse(c => { if (c.isGroup && c.children.length === 2 && c.position.y === 0 && c.position.x > -6 && c.position.x < 9 && c.position.z < 1 && c.position.z > -6.6 && c.children[0].isMesh && c.children[0].position.y === .07) drop.push(c); });
    drop.forEach(c => c.parent.remove(c));
    const floorFill = new THREE.SpotLight(0xffe0b0, 110, 16, .8, .6, 1); floorFill.position.set(2, 4, 3.5); floorFill.target.position.set(2, 0, -1.6); scene.add(floorFill, floorFill.target);   // lights the tiles so every pair of feet reads on the floor
    const crew = [];
    // eleven crew behind him (twelve with Bacos) in two staggered rows, nobody directly behind him; the three in civilian suits wear dark-blue jackets
    const ids = [C.CREW.copilot, C.CREW.engineer, C.CREW.steward, 'tb_pa7', C.CREW.steward, 'tb_pa3', C.CREW.copilot, C.CREW.engineer, C.CREW.steward, 'tb_pa8', C.CREW.steward];
    const spots = [[-3.1, -1.6], [-1.9, -1.6], [-.7, -1.6], [.7, -1.6], [1.9, -1.6], [3.1, -1.6], [-2.98, -2.9], [-1.55, -2.9], [1.55, -2.9], [2.98, -2.9], [4.4, -2.9]];
    for (let i = 0; i < ids.length; i++) { const p = await real.human({ id: ids[i], seed: 1500 + i }); if (/^tb_pa/.test(ids[i])) navyJacket(p); real.put(scene, p, { pos: [2 + spots[i][0], 0, spots[i][1]], rot: 0, mood: 'calm' }); p.userData.driven = true; crew.push(p); }
    const b = await real.human({ id: C.CREW.bacos, seed: 40 }); real.put(scene, b, { pos: [2, 0, 0], rot: 0, mood: 'stern' }); b.userData.driven = true;
    const key = new THREE.SpotLight(0xffe0b0, 80, 10, .5, .6, 1.3); key.position.set(3.5, 4, 3); key.target.position.set(2, 1.2, -.8); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [2, 1.5, 6], look: [2, 1.4, -1], fov: 40 }, { pos: [2, 1.55, 4.2], look: [2, 1.5, -.8], fov: 38 });
    return (t, u) => { cam(u); b.update(t, { arm: null, mood: 'stern', look: Math.sin(t * .3) * .05 }); foldArms(b);
      crew.forEach((p, i) => { p.update(t, { mood: 'calm', look: Math.sin(t * .4 + i) * .1, arm: null }); if (i % 4 === 0) foldArms(p); else if (i % 4 === 2) claspFront(p); }); };
  },
  // the hall with the 106 who are left
  '4.8': async k => {
    const { real, scene, camera } = k;
    const h = await hallEnv(k, { lampI: 12 });
    const ppl = await hostages(k, h, 2, 'sad');
    const cam = C.dolly(camera, { pos: [-h.w / 2 + 1.5, 3.4, 5.5], look: [2, .4, -1], fov: 46 }, { pos: [-h.w / 2 + 4, 3.0, 5.5], look: [5, .4, -1], fov: 46 }, { ease: u => u });
    return (t, u) => { cam(u); idle(ppl, t, { mood: 'sad', nod: .35 }); };
  },
  // the plane to Paris climbs away; the hijackers' plan gets a red X
  '4.9': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-60, 12, -40], sunI: 3, sunColor: 0xffb070, shadowSize: 60, envI: .8 });
    const jet = await sets.a300(); scene.add(jet);
    const gear = gearOf(jet);
    const cam = C.dolly(camera, { pos: [40, -6, -20], look: [0, 0, 40], fov: 40 }, { pos: [40, -6, -20], look: [0, 30, 160], fov: 40 });
    return (t, u) => { cam(u); jet.position.set(0, t * 7, 20 + t * 26); jet.rotation.x = -.18;
      // gear up: the legs slide into the belly over the first seconds of the climb, then the bays are closed
      if (gear) { const r = C.ease(C.seg(t, .8, 3.2)); gear.position.y = r * 2.3; gear.visible = r < 1; }
      ui.used.push([1240, 200, 1720, 400]);   // keep the caption off the sign (QA act4r3)
      const s = C.ease(C.seg(t, k.meta.seconds - 2.6, k.meta.seconds - 2.2)); if (s > 0) { const o = k.overlay; o.save(); o.translate(1480, 300); o.rotate(-.06);
        o.fillStyle = 'rgba(29,23,18,.9)'; o.beginPath(); o.roundRect(-210, -70, 420, 140, 10); o.fill(); o.strokeStyle = '#e8b321'; o.lineWidth = 4; o.stroke();
        o.fillStyle = '#f4ead3'; o.font = '52px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText("HIJACKERS' PLAN", 0, 2);
        o.scale(1 + (1 - s) * .8, 1 + (1 - s) * .8); o.strokeStyle = '#d2232a'; o.lineWidth = 22; o.lineCap = 'round'; o.globalAlpha = s; o.beginPath(); o.moveTo(-170, -80); o.lineTo(170, 80); o.moveTo(170, -80); o.lineTo(-170, 80); o.stroke(); o.restore(); } };
  },
};
