// Operation Thunderbolt · Act 9 · HOME — realistic look (v3 engine)
// Violence only implied: distant flashes, smoke, empty places. Real people are generic figures.
import * as C from './tb3_common.js';
import * as S2 from '../lib/sets2.js';
import { rnd, rotary, starNight, rifleShape, flash, office, block } from '../lib/sets3.js';
import { shots as old } from './tb_act9.js';
const { THREE, sets, P, real } = C;

const CMD = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_gen2'];
async function apronGround(k, color = 0x8a8a88) { const g = await real.pbr('asphalt_02', { repeat: [80, 80], color }); k.scene.add(real.m(new THREE.PlaneGeometry(600, 600), g, { rot: [-P / 2, 0, 0], cast: false })); }
async function soldier(k, id, seed, pos, rot) { const p = await k.real.human({ id, seed }); k.real.put(k.scene, p, { pos, rot, mood: 'stern' }); p.userData.driven = true; C.attach(p, rifleShape(), 'Spine2', [.15, .05, -.18], [.9, 0, .3]); C.attach(p, S2.cap(0x3a4228), 'Head', [0, .15, .01]); return p; }
function smoke(scene, pos, n = 10, seed = 3) {
  const tex = real.canvasTex(128, 128, (c, W, H) => { const g = c.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(70,66,62,.8)'); g.addColorStop(1, 'rgba(70,66,62,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const r = rnd(seed); const ps = [];
  for (let i = 0; i < n; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: .7 })); s.userData = { ph: r(), dx: (r() - .5) * 2 }; scene.add(s); ps.push(s); }
  return t => ps.forEach((s, i) => { const a = (t * .12 + s.userData.ph) % 1; s.position.set(pos[0] + s.userData.dx + a * 3, pos[1] + a * 10, pos[2] + (i % 3 - 1) * .8); s.scale.setScalar(2 + a * 7); s.material.opacity = .65 * (1 - a); });
}
// ---- local helpers (lib/ is loaded live by the renders, so nothing is added there) ----
// re-aim one bone after the lib pose (same pattern as tb3_act7): x/y/z is the wanted direction in the person's frame
const CHILD = { Arm: 'ForeArm', ForeArm: 'Hand', Hand: 'HandMiddle1', Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck' };
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
// curl the finger bones into a fist (applied after p.update, which resets every bone to rest); the MakeHuman rig curls about local X, negative on the right hand (Z splays the fingers)
const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'], FX = new THREE.Vector3(1, 0, 0), FQ = new THREE.Quaternion();
function fist(p, side = 'Right', amt = 1) {
  const b = p.parts.bones;
  for (const f of FINGERS) for (let j = 1; j <= 3; j++) { const bone = b[side + 'Hand' + f + j]; if (!bone) continue; const a = (f === 'Thumb' ? (j === 1 ? .35 : .7) : (j === 1 ? 1.45 : 1.6)) * amt; bone.quaternion.multiply(FQ.setFromAxisAngle(FX, -a)); }
}
const headY = p => p.parts.bones.Head.getWorldPosition(new THREE.Vector3()).y;
// MiG-21-style jet, nose on +z, ~15 m long, matte grey, dark roundels only (no real insignia)
function migJet(o = {}) {
  const g = new THREE.Group();
  const panel = real.canvasTex(512, 512, (c, W, H) => { c.fillStyle = '#8b908c'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(40,44,42,.35)'; c.lineWidth = 2; for (let y = 0; y < H; y += 64) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } for (let x = 0; x < W; x += 128) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(0,0,0,${Math.random() * .08})`; c.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 10, 1 + Math.random() * 3); } }, { repeat: [3, 1] });
  const paint = new THREE.MeshStandardMaterial({ color: o.color ?? 0x787d78, map: panel, roughness: .9, metalness: .06 });
  const wingPaint = real.std(0x4a4f48, { rough: .95, metal: .04 });
  const dark = real.std(0x202322, { rough: .6, metal: .3 }), rubber = real.std(0x141414, { rough: .95 }), glass = real.std(0x1a2430, { rough: .18, metal: .4 });
  // fuselage: lathe profile [radius, z]
  const prof = [[.02, 7.45], [.4, 7.45], [.52, 6.6], [.62, 5.2], [.71, 3.2], [.77, 1.2], [.77, -1], [.73, -3], [.66, -5], [.57, -6.6], [.5, -7.3], [.02, -7.3]];
  const fus = real.m(new THREE.LatheGeometry(prof.map(([r, z]) => new THREE.Vector2(r, z)), 36), paint, { rot: [P / 2, 0, 0] }); g.add(fus);
  // intake ring, dark intake, shock cone, pitot boom, nozzle
  g.add(real.m(new THREE.TorusGeometry(.42, .055, 10, 36), real.std(0x6a6e6a, { rough: .5, metal: .4 }), { pos: [0, 0, 7.45] }));
  g.add(real.m(new THREE.CircleGeometry(.38, 24), dark, { pos: [0, 0, 7.42] }));
  g.add(real.m(new THREE.ConeGeometry(.26, 1.4, 20), real.std(0x9a9e9a, { rough: .7, metal: .2 }), { pos: [0, 0, 7.8], rot: [P / 2, 0, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.022, .022, 1.7, 8), dark, { pos: [0, .05, 9.2], rot: [P / 2, 0, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.46, .5, .5, 24, 1, true), real.std(0x3a3c3a, { rough: .4, metal: .7, mat: { side: THREE.DoubleSide } }), { pos: [0, 0, -7.5], rot: [P / 2, 0, 0] }));
  // canopy with windscreen frame, dorsal spine behind it
  const can = real.m(new THREE.SphereGeometry(.5, 24, 16), glass, { pos: [0, .55, 3.5], scale: [.9, .8, 2.1] }); g.add(can);
  g.add(real.m(new THREE.TorusGeometry(.47, .035, 8, 24), dark, { pos: [0, .55, 4.3], scale: [.9, .8, 1] }));
  g.add(real.m(new THREE.CylinderGeometry(.34, .3, 6.6, 16), paint, { pos: [0, .5, -.9], rot: [P / 2, 0, 0] }));
  // delta wings (one symmetric slab, y = -z in the shape)
  const ws = new THREE.Shape(); ws.moveTo(-3.7, 3.7); ws.lineTo(-3.7, 3.0); ws.lineTo(-.9, -2.2); ws.lineTo(.9, -2.2); ws.lineTo(3.7, 3.0); ws.lineTo(3.7, 3.7); ws.closePath();
  g.add(real.m(new THREE.ExtrudeGeometry(ws, { depth: .13, bevelEnabled: false }), wingPaint, { pos: [0, -.2, 0], rot: [-P / 2, 0, 0] }));
  // tailplanes
  const ts = new THREE.Shape(); ts.moveTo(-2.1, 7.2); ts.lineTo(-2.1, 6.7); ts.lineTo(-.5, 5.4); ts.lineTo(.5, 5.4); ts.lineTo(2.1, 6.7); ts.lineTo(2.1, 7.2); ts.closePath();
  g.add(real.m(new THREE.ExtrudeGeometry(ts, { depth: .1, bevelEnabled: false }), wingPaint, { pos: [0, .05, 0], rot: [-P / 2, 0, 0] }));
  // fin and ventral fin (shape x stands for z)
  const fs = new THREE.Shape(); fs.moveTo(-2.8, .4); fs.lineTo(-7.0, .4); fs.lineTo(-7.1, 2.7); fs.lineTo(-6.2, 2.7); fs.closePath();
  g.add(real.m(new THREE.ExtrudeGeometry(fs, { depth: .14, bevelEnabled: false }), wingPaint, { pos: [.07, 0, 0], rot: [0, -P / 2, 0] }));
  const vs = new THREE.Shape(); vs.moveTo(-5.4, -.45); vs.lineTo(-7.0, -.45); vs.lineTo(-7.0, -1.1); vs.lineTo(-6.2, -1.1); vs.closePath();
  g.add(real.m(new THREE.ExtrudeGeometry(vs, { depth: .1, bevelEnabled: false }), wingPaint, { pos: [.05, 0, 0], rot: [0, -P / 2, 0] }));
  // centreline drop tank on a pylon
  g.add(real.m(new THREE.BoxGeometry(.1, .35, 1.3), wingPaint, { pos: [0, -.9, .6] }));
  g.add(real.m(new THREE.CapsuleGeometry(.3, 2.4, 6, 14), paint, { pos: [0, -1.12, .6], rot: [P / 2, 0, 0] }));
  // undercarriage: nose wheel and two mains
  const wheel = (r, w, pos) => { g.add(real.m(new THREE.CylinderGeometry(r, r, w, 18), rubber, { pos, rot: [0, 0, P / 2] })); g.add(real.m(new THREE.CylinderGeometry(r * .5, r * .5, w + .02, 12), real.std(0x8a8a8a, { rough: .5, metal: .5 }), { pos, rot: [0, 0, P / 2] })); };
  g.add(real.m(new THREE.CylinderGeometry(.05, .05, .75, 8), dark, { pos: [0, -1.0, 4.2] })); wheel(.26, .16, [0, -1.3, 4.2]);
  for (const x of [-1.35, 1.35]) { g.add(real.m(new THREE.CylinderGeometry(.06, .06, 1.0, 8), dark, { pos: [x, -.72, -1.0], rot: [0, 0, x > 0 ? -.12 : .12] })); wheel(.34, .22, [x * 1.05, -1.22, -1.0]); }
  // markings: dark roundels on the wings and the fuselage sides, a dark tail band
  const mark = real.std(0x2c3034, { rough: .9 }), ring = real.std(0x4e5256, { rough: .9 });
  for (const x of [-2.3, 2.3]) { g.add(real.m(new THREE.CylinderGeometry(.42, .42, .012, 24), ring, { pos: [x, -.065, -2.55] })); g.add(real.m(new THREE.CylinderGeometry(.3, .3, .016, 24), mark, { pos: [x, -.065, -2.55] })); }
  for (const x of [-1, 1]) { g.add(real.m(new THREE.CylinderGeometry(.34, .34, .012, 24), ring, { pos: [x * .735, .05, -2.3], rot: [0, 0, P / 2] })); g.add(real.m(new THREE.CylinderGeometry(.24, .24, .016, 24), mark, { pos: [x * .735, .05, -2.3], rot: [0, 0, P / 2] })); }
  g.add(real.m(new THREE.BoxGeometry(.2, .5, .5), mark, { pos: [0, 1.9, -6.65] }));
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  g.position.y = 1.56; const w = new THREE.Group(); w.add(g); return w;
}
// matte grey pebble (memorial stones), seeded shape
function pebble(r, seed) {
  const rr = rnd(seed); const geo = new THREE.IcosahedronGeometry(r, 1); const pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) pa.setXYZ(i, pa.getX(i) * (1 + (rr() - .5) * .3), pa.getY(i) * (1 + (rr() - .5) * .3), pa.getZ(i) * (1 + (rr() - .5) * .3));
  geo.computeVertexNormals();
  const grey = [0x6e6a64, 0x7c7872, 0x8a857c, 0x615d58][Math.floor(rr() * 4)];
  const m = real.m(geo, real.std(grey, { rough: .95 }), { scale: [1 + rr() * .5, .55 + rr() * .25, 1 + rr() * .3], rot: [0, rr() * P, 0] }); return m;
}
// ground haze: open cylinder whose gradient (haze colour at the bottom, clear part way up) hides a hard seam between the ground/water and the HDRI horizon (same pattern as tb3_act7 c130Line)
function hazeBand(scene, { color = 0xc4ccd8, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
const card = (k, lines, a, cx = 960) => { if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = a; o.textAlign = 'center'; lines.forEach(([txt, y, size, col]) => { o.font = `${size}px "Anton"`; o.lineWidth = size / 5; o.strokeStyle = '#1d1712'; o.strokeText(txt, cx, y); o.fillStyle = col ?? '#f4ead3'; o.fillText(txt, cx, y); }); o.restore(); };

export const shots = {
  // the fight goes on outside: far flashes over the airport
  '9.1': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.0, shadowSize: 120 });
    await S2.runwayNight(k, { lit: true });
    S2.entebbeOld(k, { pos: [-60, 0, 80], rotY: P / 2, litRow: 0, towerLit: true });
    const fl = [[-50, 2, 50], [-45, 3, 100], [-70, 18, 112], [-40, 2, 75]].map(p => flash(scene, p, { size: 2, i: 200, dist: 40 }));
    const cam = C.dolly(camera, { pos: [25, 4, 40], look: [-60, 5, 80], fov: 42 }, { pos: [22, 5, 46], look: [-60, 5, 82], fov: 40 });
    return (t, u) => { cam(u); fl.forEach((f, i) => f(((t * 5 + i * 1.3) % 2.6) < .15 ? 1 : 0)); };
  },
  // hostages run across the apron to the Hercules, commandos either side
  '9.2': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-60, 50, 60], moonI: 1.3, shadowSize: 50 });
    await apronGround(k);
    const plane = S2.c130(); plane.position.set(0, 0, -14); plane.rotation.y = 0; scene.add(plane); plane.userData.rampOpen(1); plane.userData.glow.intensity = 30;
    const run = []; for (let i = 0; i < 10; i++) { const p = await real.human({ id: C.PAX[i], seed: 6000 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: P, mood: 'worried' }); p.userData.driven = true; run.push(p); }
    const guards = []; for (let i = 0; i < 4; i++) guards.push(await soldier(k, CMD[i], 6100 + i, [(i % 2 ? 2.2 : -2.2), 0, 2 + Math.floor(i / 2) * 6], i % 2 ? -P / 2 - .4 : P / 2 + .4));
    return (t, u) => { run.forEach((p, i) => { const z = 14 - t * 3.4 - i * 1.5; p.position.set(Math.sin(i * 2.3) * .6, 0, z); p.update(t, { pose: 'walk', dist: t * 2.2 + i * .4, mood: 'worried' }); });
      guards.forEach((p, i) => p.update(t, { arm: 'hold', mood: 'stern', look: Math.sin(t + i) * .3 }));
      camera.position.set(7, 1.8, 12 - u * 4); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(-.5, 1.4, 1 - u * 4); };
  },
  // the last of them climb the ramp (counter runs automatically)
  '9.3': async k => {
    const { real, scene, camera } = k;
    await starNight(k, { moon: [-60, 50, 60], moonI: 1.2 });
    await apronGround(k);
    const plane = S2.c130(); scene.add(plane); plane.userData.rampOpen(1); plane.userData.glow.intensity = 40;
    const ppl = []; for (let i = 0; i < 4; i++) { const p = await real.human({ id: C.PAX[(i * 3 + 1) % 10], seed: 6200 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: 0, mood: 'worried' }); p.userData.driven = true; ppl.push(p); }
    const rampY = z => z > -8.6 ? 1.25 : Math.max(0, 1.25 * (1 - (-8.6 - z) / 4.4));
    return (t, u) => { ppl.forEach((p, i) => { const zz = -18 + t * 2.4 + i * -1.4; p.position.set((i % 2 ? .4 : -.4), rampY(zz), zz); p.rotation.y = 0; p.update(t, { pose: 'walk', dist: t * 1.6 + i, mood: 'worried' }); });
      camera.position.set(3.5, 1.6, -22); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(0, 1.5, -9); };
  },
  // a row of MiGs; flashes roll down the line and smoke rises (no people)
  '9.4': async k => {
    const { scene, camera } = k;
    await starNight(k, { moon: [-50, 60, 80], moonI: 1.3, shadowSize: 80, fx: false });
    await apronGround(k, 0x9a9a96); scene.add(new THREE.HemisphereLight(0x8090b0, 0x202020, .6));
    for (const x of [-40, 0, 40]) { const fl = new THREE.SpotLight(0xffe0b0, 420, 60, .5, .6, 1.3); fl.position.set(x, 14, 20); fl.target.position.set(x, 0, 0); scene.add(fl, fl.target); }
    const jets = []; for (let i = 0; i < 11; i++) { const j = migJet(); j.position.set(-50 + i * 10, 0, 0); j.rotation.y = .5; scene.add(j); jets.push(j); }
    const fl = jets.map(j => flash(scene, [j.position.x, 2, j.position.z + 1], { size: 4, i: 400, dist: 30 }));
    const sm = jets.map((j, i) => smoke(scene, [j.position.x, 1.5, j.position.z], 6, 10 + i));
    const D = k.meta.seconds;
    const cam = C.dolly(camera, { pos: [-66, 4.5, 31], look: [-30, 2, 0], fov: 42 }, { pos: [32, 5.5, 35], look: [50, 2, 0], fov: 42 }, { ease: u => u });
    return (t, u) => { cam(u); jets.forEach((j, i) => { const at = .4 + i * (D - 1.5) / 11; fl[i](t > at && t < at + .2 ? 1 : 0); if (t > at) sm[i](t - at); }); };
  },
  '9.5': old['9.5'],
  '9.6': old['9.6'],
  '9.7': old['9.7'],
  // morning: the first Hercules lands at Ben Gurion, a crowd waits by the fence
  '9.8': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kiara_1_dawn', { sun: [80, 18, -60], sunI: 3.4, sunColor: 0xffd8a8, shadowSize: 90, envI: .9 });
    await apronGround(k, 0xb0aca0);
    const plane = S2.c130(); scene.add(plane);
    for (let x = -30; x < 30; x += 2) scene.add(real.box(.05, 1.6, .05, real.std(0x8a8a84, { metal: .6 }), { pos: [x, .8, 30] }));
    scene.add(real.box(60, 1.4, .01, real.std(0x9a9a94, { metal: .5, rough: .5, mat: { transparent: true, opacity: .35 } }), { pos: [0, .8, 30], cast: false }));
    // crowd spots: jittered along the fence but never closer than .9 m to each other (two figures used to share a spot)
    const rr = rnd(93); const spots = []; for (let i = 0; i < 18; i++) { let sp; for (let tries = 0; tries < 60; tries++) { sp = [-14 + i * 1.55 + (rr() - .5) * .7, 0, 30.9 + rr() * 1.2]; if (spots.every(q => Math.hypot(q[0] - sp[0], q[2] - sp[2]) >= .9)) break; } spots.push(sp); }
    const crowd = []; for (let i = 0; i < 18; i++) { const p = await real.human({ id: C.PAX[(i * 7) % 10], seed: 6300 + i }); real.put(scene, p, { pos: spots[i], rot: P - .5 + (rr() - .5) * .3, mood: 'worried' }); p.userData.driven = true; crowd.push(p); }
    return (t, u) => { const s = C.ease(Math.min(1, t / (k.meta.seconds * .8))); plane.position.set(-80 + s * 70, Math.max(0, 9 * (1 - s * 1.4)), 0); plane.rotation.y = P / 2; plane.rotation.x = 0; plane.userData.setProps(t, [30, 30, 30, 30]);
      crowd.forEach((p, i) => p.update(t, { arm: i % 4 === 0 && t > 2 ? 'raise' : null, mood: 'worried', look: -.4 + Math.sin(t + i) * .1 }));
      camera.position.set(4, 1.7, 36); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(plane.position.x * .5, 3, 0); };
  },
  // families run onto the tarmac and hug at the foot of the ramp
  '9.9': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kiara_1_dawn', { sun: [80, 18, -60], sunI: 3.4, sunColor: 0xffd8a8, shadowSize: 40, envI: .9 });
    await apronGround(k, 0xb0aca0);
    const plane = S2.c130(); plane.rotation.y = P; plane.position.set(0, 0, -16); scene.add(plane); plane.userData.rampOpen(1);
    const pairs = []; const spots = [[-3, 0], [-1.2, .8], [.8, -.3], [2.6, .6], [-2, 2.4], [1.6, 2.6]];
    for (let i = 0; i < spots.length; i++) { const [x, z] = spots[i];
      // each partner stands a little to their own left so the heads pass on opposite shoulders
      const a = await real.human({ id: C.PAX[(i * 2) % 10], seed: 6400 + i }); real.put(scene, a, { pos: [x - .25, 0, z - .07], rot: P / 2, arm: 'hug', mood: 'happy' }); a.userData.driven = true;
      const b = await real.human({ id: C.PAX[(i * 2 + 1) % 10], seed: 6450 + i }); real.put(scene, b, { pos: [x + .25, 0, z + .07], rot: -P / 2, arm: 'hug', mood: 'happy' }); b.userData.driven = true;
      // the taller partner's arms go over the other's shoulders, the shorter one's round the waist (the lib hug sent forearms through the shorter head)
      const tall = headY(a) >= headY(b); a.userData.over = tall; b.userData.over = !tall; pairs.push(a, b); }
    const hug = (p, t, i) => {
      p.update(t, { arm: 'hug', mood: 'happy', look: .4, nod: Math.sin(t * 2 + i) * .06 });
      const sq = .5 + Math.sin(t * 1.6 + i) * .04;
      for (const [sd, sg] of [['Left', 1], ['Right', -1]]) {
        if (p.userData.over) { aimBone(p, sd + 'Arm', sg * .35, -.5, .85); aimBone(p, sd + 'ForeArm', -sg * .95, -.12, sq); aimBone(p, sd + 'Hand', -sg * .9, -.1, .2); }
        else { aimBone(p, sd + 'Arm', sg * .3, -.8, .55); aimBone(p, sd + 'ForeArm', -sg * .95, .08, sq * .8); aimBone(p, sd + 'Hand', -sg * .9, .05, .15); }
      }
    };
    const cam = C.dolly(camera, { pos: [5, 1.7, 8], look: [0, 1.3, 1], fov: 40 }, { pos: [3.4, 1.6, 6.4], look: [0, 1.3, 1], fov: 38 });
    return (t, u) => { cam(u); pairs.forEach((p, i) => hug(p, t, i)); };
  },
  // Amin furious at his desk, fist down, map of Kenya behind
  '9.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .35 });
    await C.room(k, { w: 8, d: 6, h: 3.4, floor: 'dirty_carpet', wallColor: 0x8a9a6a });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .5));
    const key = new THREE.SpotLight(0xffe0b0, 70, 9, .55, .6, 1.3); key.position.set(-1.5, 3, 2); key.target.position.set(0, 1.3, -.8); key.castShadow = true; scene.add(key, key.target);
    const desk = await real.prop('metal_office_desk'); desk.position.set(0, 0, .2); desk.rotation.y = P; scene.add(desk);
    const ph = rotary(0x16161a); ph.g.position.set(.6, .788, .32); ph.g.rotation.y = P + .3; scene.add(ph.g);
    // desk dressing: green blotter, a stack of typed papers, a folder and a pen (the bare white phone block read as an untextured blob)
    scene.add(real.rbox(.62, .012, .42, .01, real.std(0x2d4636, { rough: .95 }), { pos: [-.15, .794, .0] }));
    const typed = real.canvasTex(512, 720, (c, W, H) => { c.fillStyle = '#ece6d6'; c.fillRect(0, 0, W, H); c.fillStyle = '#3a342c'; for (let y = 90; y < H - 60; y += 26) { const w = 120 + ((y * 37) % 260); c.fillRect(70, y, w, 5); } c.fillRect(70, 50, 200, 9); });
    const paper = new THREE.MeshStandardMaterial({ map: typed, roughness: .9 });
    for (let i = 0; i < 4; i++) scene.add(real.m(new THREE.BoxGeometry(.215, .003, .3), paper, { pos: [.26 + i * .006, .79 + i * .003, .12 - i * .004], rot: [0, (i - 1.5) * .06, 0] }));
    scene.add(real.rbox(.26, .012, .34, .004, real.std(0xb5915c, { rough: .85 }), { pos: [-.62, .794, .22], rot: [0, -.18, 0] }));
    scene.add(real.m(new THREE.CylinderGeometry(.005, .005, .15, 8), real.std(0x1a1a1a, { rough: .4, metal: .3 }), { pos: [-.1, .803, .3], rot: [0, 0, P / 2] }));
    const mt = real.canvasTex(900, 640, (c, W, H) => { c.fillStyle = '#d8ccb0'; c.fillRect(0, 0, W, H); c.fillStyle = '#b9a988'; c.beginPath(); c.moveTo(80, 120); c.lineTo(380, 90); c.lineTo(420, 380); c.lineTo(120, 420); c.fill(); c.fillStyle = '#c96a4a'; c.beginPath(); c.moveTo(420, 100); c.lineTo(820, 160); c.lineTo(760, 560); c.lineTo(440, 520); c.lineTo(420, 380); c.fill(); c.strokeStyle = '#2b1e16'; c.lineWidth = 6; c.stroke(); c.fillStyle = '#2b1e16'; c.font = 'bold 60px "Oswald", sans-serif'; c.fillText('UGANDA', 130, 280); c.fillText('KENYA', 520, 340); c.fillStyle = '#5a7a9a'; c.beginPath(); c.ellipse(330, 470, 120, 80, 0, 0, 7); c.fill(); });
    scene.add(real.m(new THREE.PlaneGeometry(2.2, 1.56), new THREE.MeshStandardMaterial({ map: mt, roughness: .9 }), { pos: [.9, 1.9, -2.95], cast: false }));
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, -.38], rot: 0, mood: 'stern' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const cam = C.dolly(camera, { pos: [1.4, 1.65, 2.6], look: [0, 1.4, -.5], fov: 38 }, { pos: [1.15, 1.5, 2.2], look: [-.1, 1.1, -.3], fov: 36 });
    // right fist raised and shaken in front of the chest, swung down at ~45% of the shot and left resting on the blotter; fingers curled throughout
    const D = k.meta.seconds, mix = (p, q, w) => p.map((v, i) => v + (q[i] - v) * w);
    const UP = [[-.25, -.55, .55], [.05, .85, .5], [.1, .9, .35]], DOWN = [[-.08, -1, .04], [0, -1, .17], [0, -.45, 1]];
    return (t, u) => { cam(u); const w = C.ease(C.seg(t, D * .42, D * .52)); const shake = w < 1 ? Math.sin(t * 9) * .08 * (1 - w) : 0; const press = w >= 1 ? Math.max(0, Math.sin((t - D * .52) * 5)) * .04 : 0;
      a.update(t, { arm: 'point', mood: 'stern', talk: Math.sin(t * 3) > 0, look: Math.sin(t * .7) * .2, nod: .05 + w * .12 });
      aimBone(a, 'Spine', 0, 1, .12 + w * .7); aimBone(a, 'Spine1', 0, 1, .05 + w * .42);
      const A = mix(UP[0], DOWN[0], w), F = mix(UP[1], DOWN[1], w), H = mix(UP[2], DOWN[2], w);
      aimBone(a, 'RightArm', A[0], A[1] + shake, A[2]); aimBone(a, 'RightForeArm', F[0] + shake, F[1] - press, F[2]); aimBone(a, 'RightHand', H[0], H[1], H[2]);
      fist(a, 'Right', 1); ph.g.position.y = .788 + (w >= 1 && press > .035 ? .006 : 0); };
  },
  '9.11': old['9.11'],
  // the empty hospital bed, the curtain half drawn
  '9.12': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x08090b, envI: .3 });
    await C.room(k, { w: 5, d: 5, h: 3, floor: 'rubber_tiles', wallColor: 0xc8ccc0 });
    scene.add(new THREE.HemisphereLight(0xdde8f0, 0x202020, .35));
    const win = new THREE.SpotLight(0xc8d8ff, 40, 9, .5, .7, 1.3); win.position.set(-2.2, 2.6, 1.5); win.target.position.set(0, .5, -.5); win.castShadow = true; scene.add(win, win.target);
    const bed = new THREE.Group(); const metal = real.std(0xb8bcbc, { metal: .7, rough: .35 });
    // woven fabric on the sheet, pillow and a folded blanket; the sheet is a draped plane with soft creases
    const sheet = await real.pbr('fabric_pattern_07', { repeat: [3, 6], color: 0xe8e8e2, rough: .95, noMap: true }), pillowM = await real.pbr('fabric_pattern_07', { repeat: [2, 1.5], color: 0xf2f2ee, rough: .95, noMap: true }), blanket = await real.pbr('fabric_pattern_07', { repeat: [3, 2], color: 0x7d93a6, rough: .95, noMap: true });
    bed.add(real.rbox(.95, .2, 2, .04, sheet, { pos: [0, .62, 0] }));
    const sg = new THREE.PlaneGeometry(1.02, 2.08, 24, 48); { const pa = sg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), y = pa.getY(i); pa.setZ(i, Math.sin(x * 11 + y * 3) * .006 + Math.sin(y * 7 - x * 5) * .008 + Math.cos(x * 23) * .003); } sg.computeVertexNormals(); }
    bed.add(real.m(sg, sheet, { pos: [0, .725, 0], rot: [-P / 2, 0, 0] }));
    bed.add(real.rbox(.6, .12, .35, .05, pillowM, { pos: [0, .785, -.75] }));
    bed.add(real.rbox(.98, .05, .7, .02, blanket, { pos: [0, .745, .55] }));
    bed.add(real.rbox(.98, .04, .18, .015, blanket, { pos: [0, .785, .3] }));
    for (const x of [-.45, .45]) for (const z of [-.95, .95]) bed.add(real.box(.04, .55, .04, metal, { pos: [x, .27, z] }));
    bed.add(real.box(1, .6, .04, metal, { pos: [0, .95, -1] }));
    bed.position.set(0, 0, -1); scene.add(bed);
    // pleated curtain: fine mesh, sin pleats that hang deeper towards the hem, fabric weave, hooks on the rail
    const cg = new THREE.PlaneGeometry(2.4, 2.4, 96, 12); const cb = cg.attributes.position.array.slice();
    const cloth = await real.pbr('fabric_pattern_07', { repeat: [4, 4], color: 0x9ab8b0, rough: .92, side: THREE.DoubleSide, noMap: true });
    const curtain = real.m(cg, cloth, { pos: [1.4, 1.4, -1], rot: [0, P / 2, 0] }); scene.add(curtain);
    scene.add(real.box(.03, .03, 3, metal, { pos: [1.4, 2.62, -1] }));
    for (let i = 0; i <= 12; i++) scene.add(real.m(new THREE.TorusGeometry(.025, .006, 6, 12), metal, { pos: [1.4, 2.6, -2.2 + i * .2], rot: [0, P / 2, 0] }));
    const cam = C.dolly(camera, { pos: [-1.2, 1.5, 2.6], look: [.2, .7, -1], fov: 40 }, { pos: [-.8, 1.4, 1.8], look: [.2, .7, -1], fov: 38 });
    return (t, u) => { cam(u); const pa = cg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = cb[i * 3], y = cb[i * 3 + 1]; const d = .6 + (1.2 - y) / 2.4 * .5; pa.array[i * 3 + 2] = (Math.sin(x * 9) * .07 + Math.sin(x * 21 + 1) * .015) * d + Math.sin(x * 3 + t * .6) * .02 * d; } pa.needsUpdate = true; cg.computeVertexNormals(); };
  },
  '9.13': old['9.13'],
  // a memorial stone with a flag; title card OPERATION YONATAN
  '9.14': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'kiara_1_dawn', { sun: [60, 20, 40], sunI: 3, sunColor: 0xffd8a8, shadowSize: 20, envI: .8 });
    const g = await real.pbr('grass_path_2', { repeat: [20, 20] }); scene.add(real.m(new THREE.PlaneGeometry(80, 80), g, { rot: [-P / 2, 0, 0], cast: false }));
    const stone = await real.pbr('concrete_floor_worn_001', { repeat: [1, 1], color: 0xd8d2c4 });
    scene.add(real.rbox(2.2, 1.2, .5, .05, stone, { pos: [0, .6, 0] })); scene.add(real.rbox(2.6, .2, .9, .04, stone, { pos: [0, .1, 0] }));
    const ft = real.canvasTex(600, 420, (c, W, H) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H); c.fillStyle = '#1f4fa8'; c.fillRect(0, 40, W, 50); c.fillRect(0, H - 90, W, 50); c.strokeStyle = '#1f4fa8'; c.lineWidth = 14; const tri = a => { c.beginPath(); for (let k = 0; k < 3; k++) { const th = a + k * 2 * P / 3; c.lineTo(W / 2 + Math.sin(th) * 80, H / 2 - Math.cos(th) * 80); } c.closePath(); c.stroke(); }; tri(0); tri(P); });
    const fg = new THREE.PlaneGeometry(1.5, 1.05, 20, 6); const fb = fg.attributes.position.array.slice();
    scene.add(real.m(fg, new THREE.MeshStandardMaterial({ map: ft, roughness: .8, side: THREE.DoubleSide }), { pos: [-1.95, 3.1, -.8] }));
    scene.add(real.m(new THREE.CylinderGeometry(.03, .03, 3.8, 10), real.std(0xc0c0c0, { metal: .8, rough: .3 }), { pos: [-2.72, 1.9, -.8] }));
    // visitors' pebbles along the top of the stone and on the plinth: matte grey, irregular (the coloured spheres read as billiard balls)
    [[-.85, 1.2, 0], [-.5, 1.2, .08], [-.1, 1.2, -.05], [.3, 1.2, .06], [.65, 1.2, -.02], [.95, 1.2, .07], [-.55, .2, .35], [.2, .2, .38], [.8, .2, .3]].forEach(([x, y, z], i) => { const s = pebble(.055 + (i % 3) * .012, 40 + i); s.position.set(x, y + .035, z); scene.add(s); });
    // engraved bronze plaque on the face of the stone
    const plq = real.canvasTex(1024, 480, (c, W, H) => { c.fillStyle = '#5a4a32'; c.fillRect(0, 0, W, H); c.strokeStyle = '#8a7650'; c.lineWidth = 10; c.strokeRect(28, 28, W - 56, H - 56); c.textAlign = 'center'; c.fillStyle = '#d9c9a0'; c.font = '600 112px "Oswald"'; c.fillText('OPERATION YONATAN', W / 2, 190); c.font = '600 72px "Oswald"'; c.fillText('ENTEBBE  ·  4 JULY 1976', W / 2, 300); c.font = '400 46px "Oswald"'; c.fillStyle = '#b8a880'; c.fillText('THE HOSTAGES CAME HOME', W / 2, 390); });
    scene.add(real.m(new THREE.PlaneGeometry(1.5, .7), new THREE.MeshStandardMaterial({ map: plq, roughness: .55, metalness: .35 }), { pos: [0, .62, .255], cast: false }));
    const cam = C.dolly(camera, { pos: [.6, 1.45, 4.4], look: [-.5, 1.15, 0], fov: 40 }, { pos: [.3, 1.5, 3.4], look: [-.5, 1.25, 0], fov: 38 });
    return (t, u) => { cam(u); const pa = fg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = fb[i * 3]; pa.array[i * 3 + 2] = Math.sin(x * 4 + t * 3) * .05 * (x + .75); } pa.needsUpdate = true;
      card(k, [['OPERATION YONATAN', 200, 92, '#e8b321'], ['4 JULY 1976', 270, 40]], C.ease(C.seg(t, k.meta.seconds * .45, k.meta.seconds * .55)), 1400); };
  },
  // a younger brother at a podium years later: generic figure, 1996
  '9.15': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0c1220, envI: .3 });
    await C.room(k, { w: 8, d: 6, h: 3.4, floor: 'dirty_carpet', wallColor: 0x2a3a5a });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x101018, .4));
    const key = new THREE.SpotLight(0xfff0d8, 80, 9, .5, .6, 1.3); key.position.set(1.5, 3.2, 2.5); key.target.position.set(0, 1.4, -.8); key.castShadow = true; scene.add(key, key.target);
    const pod = new THREE.Group(); pod.add(real.rbox(.7, 1.1, .45, .03, real.std(0x4a2e1c, { rough: .4 }), { pos: [0, .55, 0] })); pod.add(real.box(.8, .05, .55, real.std(0x4a2e1c, { rough: .4 }), { pos: [0, 1.12, -.02], rot: [.2, 0, 0] }));
    for (const x of [-.12, .12]) pod.add(real.m(new THREE.CylinderGeometry(.008, .008, .35, 6), real.std(0x111111), { pos: [x, 1.3, .1], rot: [-.5, 0, 0] }));
    pod.position.set(0, 0, -.4); scene.add(pod);
    const p = await real.human({ id: 'tb_off2', seed: 6501 }); real.put(scene, p, { pos: [0, 0, -.95], rot: 0, mood: 'stern' }); p.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-1.6, 1.5, 3], look: [0, 1.5, -.8], fov: 38 }, { pos: [-1.1, 1.5, 2.3], look: [0, 1.55, -.8], fov: 36 });
    return (t, u) => { cam(u); p.update(t, { arm: Math.sin(t * .8) > .3 ? 'point' : null, mood: 'stern', talk: Math.sin(t * 2.4) > -.2, look: Math.sin(t * .5) * .3 }); };
  },
  // four Hercules fly into the sunrise
  '9.16': async k => {
    const { scene, camera } = k;
    await real.env(k, 'kiara_1_dawn', { sun: [0, 40, -200], sunI: 3, sunColor: 0xffc890, shadowSize: 80, envI: 1 });
    // the sea far below: matte-ish water fogged into a haze band at the horizon so it never meets the HDRI mountains at a hard seam
    const HZ = 0xd6bcc4;
    scene.add(real.m(new THREE.PlaneGeometry(8000, 8000), real.std(0x2e3c4c, { rough: .6, metal: .25 }), { pos: [0, -300, -1000], rot: [-P / 2, 0, 0], cast: false }));
    scene.fog = new THREE.FogExp2(HZ, .0011);
    hazeBand(scene, { color: HZ, r: 2600, h: 1000, clear: .42, y: -320 });
    // a low sun disc with a soft glow where the specular path on the water points
    const sun = real.m(new THREE.CircleGeometry(42, 48), new THREE.MeshBasicMaterial({ color: 0xfff2d8, fog: false }), { cast: false }); scene.add(sun);
    const glowTex = real.canvasTex(256, 256, (c, W, H) => { const g = c.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, 'rgba(255,225,180,.9)'); g.addColorStop(.3, 'rgba(255,200,150,.35)'); g.addColorStop(1, 'rgba(255,190,140,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending })); glow.scale.setScalar(620); scene.add(glow);
    if (scene.userData.fx) scene.userData.fx.ao = 0;
    // the four Hercules fly high, well above the horizon and the skyline
    const ps = [0, 1, 2, 3].map(i => { const p = S2.c130(); p.rotation.y = P; p.position.set((i - 1.5) * 34, 46 + (i % 2) * 6, -i * 12); scene.add(p); return p; });
    return (t, u) => { ps.forEach((p, i) => { p.position.z = -i * 12 - t * 40; p.userData.setProps(t, [30, 30, 30, 30]); });
      camera.position.set(12, 20, 84 - t * 40); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(0, 44, -80 - t * 40);
      // sun and glow sit ~2.4 km ahead of the camera, just over the skyline (inside the 3 km far plane)
      sun.position.set(camera.position.x - 60, camera.position.y + 330, camera.position.z - 2400); glow.position.copy(sun.position).z += 6; };
  },
  // the old terminal at dawn, empty
  '9.17': async k => {
    const { scene, camera } = k;
    await real.env(k, 'kiara_1_dawn', { sun: [-80, 10, 60], sunI: 2.6, sunColor: 0xffc890, shadowSize: 120, envI: .8 });
    await apronGround(k, 0xa8a49c);
    S2.entebbeOld(k, { pos: [0, 0, 0] });
    const cam = C.dolly(camera, { pos: [-30, 2, 60], look: [0, 5, 0], fov: 44 }, { pos: [-10, 9, 48], look: [0, 4, 0], fov: 44 });
    return (t, u) => cam(u);
  },
  '9.18': old['9.18'],
};
