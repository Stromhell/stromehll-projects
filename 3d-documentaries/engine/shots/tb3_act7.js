// Operation Thunderbolt · Act 7 · FOUR HERCULES — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { rnd, WOOD, chair, papers, night, holdInterior, seatSoldiers, idleSit } from '../lib/sets3.js';
import { shots as old } from './tb_act7.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
const CMD = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_gen2', 'tb_cmd2', 'tb_cmd1', 'tb_cmd3', 'tb_gen1'];
function label(o, text, x, y, a = 1) { o.save(); o.globalAlpha = a; o.font = '40px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; const w = o.measureText(text).width + 36; o.fillStyle = 'rgba(29,23,18,.9)'; o.beginPath(); o.roundRect(x - w / 2, y - 30, w, 60, 8); o.fill(); o.strokeStyle = '#e8b321'; o.lineWidth = 3; o.stroke(); o.fillStyle = '#f4ead3'; o.fillText(text, x, y + 2); o.restore(); }
// a whiteboard strapped to a cargo pallet, with a sketch and an arrow to a target
function briefBoard(target) {
  const g = new THREE.Group();
  const t = real.canvasTex(900, 600, (c, W, H) => { c.fillStyle = '#efeae0'; c.fillRect(0, 0, W, H); c.strokeStyle = '#1d1712'; c.lineWidth = 6; c.strokeRect(60, 330, 480, 140); c.strokeRect(620, 120, 200, 120); c.fillStyle = '#1d1712'; c.font = 'bold 40px "Oswald", sans-serif'; c.fillText('OLD TERMINAL', 90, 420);
    c.fillStyle = '#c0281e'; c.font = 'bold 70px "Oswald", sans-serif'; c.fillText(target, 60, 90); c.strokeStyle = '#c0281e'; c.lineWidth = 12; c.beginPath(); c.moveTo(150, 560); c.quadraticCurveTo(500, 520, 700, 260); c.stroke(); c.beginPath(); c.moveTo(700, 260); c.lineTo(660, 300); c.moveTo(700, 260); c.lineTo(705, 315); c.stroke(); });
  g.add(real.box(1.5, 1.0, .04, real.std(0x2a2a2a, { rough: .5 }), { pos: [0, 1.3, 0] }));
  g.add(real.m(new THREE.PlaneGeometry(1.4, .93), new THREE.MeshStandardMaterial({ map: t, roughness: .7 }), { pos: [0, 1.3, .025], cast: false }));
  g.add(real.box(1.6, .8, 1.1, real.std(0x5a5a4a, { rough: .8 }), { pos: [0, .4, -.6] }));
  return g;
}
// field stretcher: canvas between two carry poles that stand proud of it, two straps across, a folded blanket and a small pillow (QA r3 #9: read as shelves with pillows)
function stretcher() { const g = new THREE.Group(); const tube = real.std(0xa8a8a0, { metal: .8, rough: .3 });
  g.add(real.box(.56, .05, 1.95, real.std(0x5a6a48, { rough: .9 }), { pos: [0, 0, 0] }));
  for (const x of [-.33, .33]) { g.add(real.m(new THREE.CylinderGeometry(.024, .024, 2.35, 10), tube, { pos: [x, .03, 0], rot: [P / 2, 0, 0] })); for (const z of [-1.17, 1.17]) g.add(real.m(new THREE.SphereGeometry(.03, 8, 6), real.std(0x1a1a18, { rough: .8 }), { pos: [x, .03, z] })); }
  for (const z of [-.5, .4]) g.add(real.box(.68, .018, .07, real.std(0x2a2620, { rough: .9 }), { pos: [0, .035, z], cast: false }));
  g.add(real.rbox(.42, .08, .46, .025, real.std(0x6a7458, { rough: .95 }), { pos: [0, .065, .6] }));
  g.add(real.box(.38, .035, .28, real.std(0xe0ddd2, { rough: .9 }), { pos: [0, .042, -.78] }));
  return g; }
async function c130Line(k, o = {}) {
  const { scene } = k;
  const ground = await real.pbr('concrete_floor_worn_001', { repeat: [60, 60], color: o.groundColor ?? 0xb0aca0 }); scene.add(real.m(new THREE.PlaneGeometry(400, 400), ground, { rot: [-P / 2, 0, 0], cast: false }));
  // far ground out to the horizon, so a high camera never sees the slab's edge against the sky
  const farG = o.flatFar ? real.std(o.groundColor ?? 0xb0aca0, { rough: .95 }) : await real.pbr('concrete_floor_worn_001', { repeat: [500, 500], color: o.groundColor ?? 0xb0aca0 }); scene.add(real.m(new THREE.PlaneGeometry(9000, 9000), farG, { pos: [0, -.03, 0], rot: [-P / 2, 0, 0], cast: false }));
  scene.fog = new THREE.FogExp2(o.fog ?? 0xc4ccd8, o.fogD ?? .005);
  hazeBand(scene, { color: o.fog ?? 0xc4ccd8 });
  if (scene.userData.fx) scene.userData.fx.ao = 0; // GTAO draws pale halos round the propellers against the far ground in these wide shots // far ground melts into the horizon haze instead of ending in a hard edge
  return [0, 1, 2, 3].map(i => { const p = S2.c130(); p.position.set(-54 + i * 36, 0, 0); scene.add(p); return p; });
}

// ground haze: a big open cylinder whose gradient (fog colour at the bottom, clear ~25% up) hides the seam between the unfogged HDRI sky and the fogged ground
function hazeBand(scene, { color = 0xc4ccd8, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// seated soldiers with hands resting on the knees (local version of idleSit: re-aims the forearms after the lib pose)
const CHILD = { Arm: 'ForeArm', ForeArm: 'Hand', Hand: 'HandMiddle1', UpLeg: 'Leg', Leg: 'Foot', Foot: 'ToeBase', Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck' };
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
const kneeIdle = (ppl, t, o = {}) => ppl.forEach((p, i) => {
  p.update(t, { pose: 'sit', seatH: .45, arm: 'lap', mood: o.mood ?? 'stern', look: Math.sin(t * .45 + p.userData.ph) * .25, nod: .15 + Math.sin(t * .3 + i) * .1 });
  for (const [sd, sg] of [['Left', 1], ['Right', -1]]) { aimBone(p, sd + 'Arm', sg * .12, -1, .12); aimBone(p, sd + 'ForeArm', -sg * .08, -.42, 1); }
});
// a red-webbing bench with a faintly lit strip so the seated soldiers visibly sit on something; seats at ~.9 m pitch from z0 (far) towards z1
function benchSeats(scene, z0, z1, pitch = .9) {
  const web = real.std(0x4a3226, { rough: .95, emissive: 0x301008, ei: .6 }), spots = [];
  for (const s of [-1, 1]) {
    scene.add(real.box(.5, .08, z1 - z0 + .5, web, { pos: [s * 1.3, .41, (z0 + z1) / 2], cast: false }));
    scene.add(real.box(.04, .04, z1 - z0 + .5, real.std(0x9a9a94, { metal: .8, rough: .35 }), { pos: [s * 1.06, .38, (z0 + z1) / 2], cast: false }));
    const l = new THREE.PointLight(0xff8a60, .8, 2, 1.5); l.position.set(s * 1.3, .2, (z0 + z1) / 2); scene.add(l);   // under the bench, short throw: no orange streaks by hands/knees (QA r3 #3)
    for (let z = z0; z <= z1 + .01; z += pitch) spots.push({ x: s * 1.3, z, rot: -s * P / 2 });
  }
  return spots;
}
const mapDown = (inner, dzK, pull) => async k => { const f = await inner(k); return (t, u) => { f(t, u); const c = k.camera; c.position.multiplyScalar(pull); c.position.z += c.position.y * dzK; }; };
// steer the auto caption to one band for the whole shot (act 8 pattern): block the bottom so it stays at the top, or the top so it stays at the bottom
const capTop = () => ui.used.push([0, 840, 1920, 1080]);
const capBottom = () => ui.used.push([0, 0, 1920, 260]);
// standing task poses, applied after p.update() (QA r3 #4/#8): all through aimBone so they work on any rig
const footY = p => { const v = new THREE.Vector3(); return Math.min(p.parts.bones.LeftFoot.getWorldPosition(v).y, p.parts.bones.RightFoot.getWorldPosition(v).y); };
// deep crouch, hands forward at knee height (at a pump / a wheel); the body is dropped so the feet stay on the floor
function crouch(p, reach = 1) {
  const f0 = footY(p);
  aimBone(p, 'Spine', 0, 1, .6); aimBone(p, 'Spine1', 0, 1, .5); aimBone(p, 'Spine2', 0, 1, .25);
  for (const [sd, sg] of [['Left', 1], ['Right', -1]]) { aimBone(p, sd + 'UpLeg', sg * .12, -.3, 1); aimBone(p, sd + 'Leg', sg * .04, -1, -.5); aimBone(p, sd + 'Foot', 0, -.3, 1);
    aimBone(p, sd + 'Arm', sg * .2, -.55, .8 * reach); aimBone(p, sd + 'ForeArm', -sg * .15, -.35, 1); aimBone(p, sd + 'Hand', -sg * .1, -.3, 1); }
  p.parts.obj.position.y -= footY(p) - f0;
}
// one hand (left) down on the frame of the pump beside him, slight lean that way
function leanOnFrame(p) { aimBone(p, 'Spine', .1, 1, .05); aimBone(p, 'Spine1', .1, 1, .05); aimBone(p, 'LeftArm', .8, -.6, .2); aimBone(p, 'LeftForeArm', .7, -.72, .25); aimBone(p, 'LeftHand', .6, -.8, .25); }
function hipsHands(p) { for (const [sd, sg] of [['Left', 1], ['Right', -1]]) { aimBone(p, sd + 'Arm', sg * .8, -.65, .05); aimBone(p, sd + 'ForeArm', -sg * .95, -.3, .35); aimBone(p, sd + 'Hand', -sg * .9, -.2, .45); } }
function foldArms(p) {
  aimBone(p, 'LeftArm', .3, -.9, .22); aimBone(p, 'LeftForeArm', -1, .25, .12); aimBone(p, 'LeftHand', -1, .15, .05);
  aimBone(p, 'RightArm', -.34, -.82, .5); aimBone(p, 'RightForeArm', 1, .12, -.02); aimBone(p, 'RightHand', 1, .05, -.25);
}
// right arm straight down, slightly out, for a thing carried in the hand
function carryRight(p) { aimBone(p, 'RightArm', -.3, -1, .05); aimBone(p, 'RightForeArm', -.15, -1, .15); aimBone(p, 'RightHand', -.1, -1, .2); }
// hose coil carried in the right hand (loop hangs below the hand)
function hoseCoil() { const g = new THREE.Group(); const rub = real.std(0x1a1a18, { rough: .75 }); for (let i = 0; i < 3; i++) g.add(real.m(new THREE.TorusGeometry(.2 - i * .015, .03, 8, 28), rub, { pos: [0, -.2, i * .04 - .04] })); g.add(real.m(new THREE.CylinderGeometry(.03, .03, .16, 10), real.std(0xb8b4a8, { metal: .7, rough: .35 }), { pos: [.17, -.3, .06], rot: [0, 0, .4] })); return g; }
// small red medical bag with a white cross and a carry handle
function medBag() { const g = new THREE.Group(); g.add(real.rbox(.3, .2, .13, .03, real.std(0x8a1e1a, { rough: .6 }), { pos: [0, -.14, 0] })); g.add(real.box(.11, .03, .01, real.std(0xf4f0e8, { rough: .6 }), { pos: [0, -.14, .07], cast: false })); g.add(real.box(.03, .11, .01, real.std(0xf4f0e8, { rough: .6 }), { pos: [0, -.14, .07], cast: false })); g.add(real.m(new THREE.TorusGeometry(.06, .01, 6, 16, P), real.std(0x2a1a14, { rough: .7 }), { pos: [0, -.04, 0] })); return g; }
// 1970s Mercedes saloon for the hold shots (QA r3 #1: the lib car read as a black mirror slab). Act 8's mercHero body with a dark-grey
// satin paint (roughness .5), lighter glass with chrome surrounds, roof line, sill, pillars, wheels proud of the body
function mercHero(o = {}) {
  const g = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0x30343a, roughness: o.rough ?? .45, metalness: .25, clearcoat: .5, clearcoatRoughness: .25 });
  const paint2 = paint.clone(); paint2.side = THREE.DoubleSide;
  const chrome = real.std(0xd8dade, { rough: .15, metal: 1 }), dark = real.std(0x151516, { rough: .85 }), rubber = real.std(0x0c0c0c, { rough: .95 });
  // QA r5: tinted, reflective glass panes (opaque, so the cabin reads as glass set in a painted body, not a see-through fish tank)
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x1e252c, roughness: .04, metalness: .35, clearcoat: 1, clearcoatRoughness: .02, side: THREE.DoubleSide });
  g.add(real.rbox(1.78, .48, 4.75, .09, paint, { pos: [0, .74, 0] }));                 // body .50–.98
  g.add(real.rbox(1.72, .1, 4.55, .03, dark, { pos: [0, .47, 0] }));                   // sill line
  g.add(real.box(1.5, .06, 4.1, dark, { pos: [0, .42, 0], cast: false }));              // floor pan
  // QA r5 greenhouse: painted side frames with A/B/C pillars, separate front + rear door glass, raked windscreen and rear window, rounded roof with drip rails
  const shp = (pts, mat, x, off = 0) => { const s = new THREE.Shape(); pts.forEach(([z, y], i) => i ? s.lineTo(-z, y) : s.moveTo(-z, y)); const m = real.m(new THREE.ShapeGeometry(s), mat, { pos: [x, 0, 0], rot: [0, P / 2, 0] }); return m; };
  for (const sx of [-1, 1]) {
    g.add(shp([[.9, .97], [.34, 1.44], [-1.02, 1.44], [-1.52, .97]], paint2, sx * .765));                         // side frame (pillars)
    const gx = sx * .772;
    g.add(shp([[.76, 1.0], [.36, 1.36], [-.3, 1.36], [-.3, 1.0]], glass, gx));                                   // front door glass
    g.add(shp([[-.4, 1.0], [-.4, 1.36], [-.98, 1.36], [-1.2, 1.0]], glass, gx));                                 // rear door glass
    g.add(real.box(.012, .018, 1.15, chrome, { pos: [sx * .776, 1.37, -.31] }));                                 // window top chrome
    g.add(real.box(.012, .018, 1.98, chrome, { pos: [sx * .776, .995, -.2] }));                                  // window sill chrome
    g.add(real.box(.025, .03, 1.62, chrome, { pos: [sx * .76, 1.445, -.34] }));                                  // drip rail
  }
  const screen = (z0, z1, w) => { const L = Math.hypot(1.43 - .99, z1 - z0); const m = real.box(w, L, .012, glass, { pos: [0, (1.43 + .99) / 2, (z0 + z1) / 2] }); m.rotation.x = Math.atan2(z1 - z0, 1.43 - .99) * -1; return m; };
  { const ws = screen(.9, .34, 1.48); ws.rotation.x = -Math.atan2(.56, .44); g.add(ws); const ws2 = real.box(1.52, .025, .02, chrome, { pos: [0, .995, .89] }); g.add(ws2); }
  { const rs = screen(-1.52, -1.02, 1.48); rs.rotation.x = Math.atan2(.5, .44); g.add(rs); g.add(real.box(1.52, .025, .02, chrome, { pos: [0, .995, -1.51] })); }
  g.add(real.rbox(1.54, .1, 1.42, .05, paint, { pos: [0, 1.44, -.34] }));                                         // roof, rounded edges
  g.add(real.rbox(1.4, .04, 1.25, .02, paint, { pos: [0, 1.495, -.34] }));                                        // roof crown
  for (const x of [-.8, .8]) g.add(real.box(.05, .1, .05, paint, { pos: [x, 1.0, .88] }));                       // A-pillar feet
  for (const x of [-.895, .895]) for (const z of [.1, -1.0]) { g.add(real.box(.01, .4, .012, dark, { pos: [x, .74, z] })); g.add(real.box(.02, .025, .12, chrome, { pos: [x, .86, z - .22] })); }
  for (const x of [-.9, .9]) g.add(real.box(.015, .02, 4.4, chrome, { pos: [x, .72, 0] }));                      // side trim strip
  const wm = { tyre: real.std(0x111111, { rough: .9 }), hub: real.std(0xc8ccd0, { rough: .25, metal: .9 }), metal: chrome };
  for (const [x, z] of [[-.8, 1.45], [.8, 1.45], [-.8, -1.45], [.8, -1.45]]) {
    const w = sets.wheel(.34, .22, wm); w.position.set(x, .34, z); g.add(w);
    w.add(real.m(new THREE.TorusGeometry(.17, .012, 8, 32), chrome));
    for (let i = 0; i < 5; i++) { const a = i * P * 2 / 5; w.add(real.m(new THREE.CylinderGeometry(.014, .014, .23, 8), dark, { pos: [Math.cos(a) * .1, Math.sin(a) * .1, 0], rot: [P / 2, 0, 0] })); }
    for (let i = 0; i < 16; i++) { const a = i * P * 2 / 16; w.add(real.m(new THREE.BoxGeometry(.03, .015, .19), rubber, { pos: [Math.cos(a) * .335, Math.sin(a) * .335, 0], rot: [0, 0, a] })); }
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, Math.sign(x) * P / 2, 0], cast: false }));
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, -Math.sign(x) * P / 2, 0], cast: false }));
  }
  // nose ported from act 0 (QA act0r3): grille + shell + star on stem, bonnet panel with shut lines, cowl, wipers, headlamp brows
  const zf = 2.375;
  g.add(real.box(.9, .36, .03, dark, { pos: [0, .74, zf - .02] }));
  for (const y of [.56, .92]) g.add(real.box(.94, .03, .06, chrome, { pos: [0, y, zf + .01] }));
  for (const x of [-.46, .46]) g.add(real.box(.03, .39, .06, chrome, { pos: [x, .74, zf + .01] }));
  for (let i = 0; i < 9; i++) g.add(real.box(.014, .33, .04, chrome, { pos: [-.4 + i * .1, .74, zf + .01] }));
  g.add(real.box(.86, .02, .045, chrome, { pos: [0, .74, zf + .015] }));
  g.add(real.rbox(1.42, .035, 1.5, .015, paint, { pos: [0, .995, 1.55] }));
  g.add(real.rbox(.5, .025, 1.45, .012, paint, { pos: [0, 1.018, 1.57] }));
  for (const x of [-.25, .25]) g.add(real.box(.012, .01, 1.42, dark, { pos: [x, 1.027, 1.57] }));
  for (const x of [-.72, .72]) g.add(real.box(.01, .012, 1.52, dark, { pos: [x, 1.0, 1.55] }));
  g.add(real.box(1.44, .012, .01, dark, { pos: [0, 1.0, .8] }));
  g.add(real.box(1.5, .02, .14, dark, { pos: [0, .995, .87] }));
  for (let i = 0; i < 10; i++) g.add(real.box(.1, .006, .1, real.std(0x050506, { rough: .9 }), { pos: [-.63 + i * .14, 1.007, .87] }));
  for (const [x, r] of [[-.35, .2], [.3, .2]]) { const w = new THREE.Group(); w.position.set(x, 1.02, .9); w.rotation.y = r; g.add(w); w.add(real.box(.55, .015, .02, dark, { pos: [0, .005, 0] })); w.add(real.box(.5, .025, .008, rubber, { pos: [0, .0, .012] })); w.add(real.m(new THREE.CylinderGeometry(.02, .02, .03, 10), chrome, { pos: [.28, 0, 0] })); }
  g.add(real.rbox(1.0, .1, .16, .03, chrome, { pos: [0, .985, zf - .04] }));
  g.add(real.rbox(.92, .05, .1, .02, dark, { pos: [0, 1.0, zf - .16] }));
  for (const x of [-.6, .6]) g.add(real.rbox(.34, .05, .14, .02, chrome, { pos: [x, .9, zf - .06] }));
  const star = new THREE.Group(); star.position.set(0, 1.13, zf - .04); g.add(star);
  star.add(real.m(new THREE.TorusGeometry(.055, .008, 8, 24), chrome));
  for (let i = 0; i < 3; i++) { const a = P / 2 + i * P * 2 / 3; star.add(real.box(.016, .055, .016, chrome, { pos: [Math.cos(a) * .027, Math.sin(a) * .027, 0], rot: [0, 0, a - P / 2] })); }
  g.add(real.m(new THREE.CylinderGeometry(.012, .02, .1, 10), chrome, { pos: [0, 1.06, zf - .04] }));
  for (const x of [-.6, .6]) {
    g.add(real.m(new THREE.CylinderGeometry(.15, .15, .1, 24), dark, { pos: [x, .74, zf - .03], rot: [P / 2, 0, 0] }));
    g.add(real.m(new THREE.CylinderGeometry(.12, .1, .06, 24), real.std(0xb8bcc0, { rough: .2, metal: .9 }), { pos: [x, .74, zf - .01], rot: [P / 2, 0, 0] }));
    g.add(real.m(new THREE.SphereGeometry(.06, 14, 10), real.std(0xffffff, { emissive: 0xfff2d0, ei: o.lights ? 3 : .15, rough: .3 }), { pos: [x, .74, zf + .01], cast: false }));
    g.add(real.m(new THREE.SphereGeometry(.13, 20, 14, 0, P * 2, 0, P / 2), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, metalness: 0, transparent: true, opacity: .3 }), { pos: [x, .74, zf + .005], rot: [P / 2, 0, 0], cast: false }));
    g.add(real.m(new THREE.TorusGeometry(.145, .016, 8, 32), chrome, { pos: [x, .74, zf + .02] }));
    g.add(real.box(.14, .06, .03, real.std(0xe0a040, { emissive: 0xd08020, ei: .1 }), { pos: [x * 1.25, .52, zf - .01] }));
  }
  for (const [z, sg] of [[2.42, 1], [-2.42, -1]]) {
    g.add(real.rbox(1.84, .11, .14, .03, chrome, { pos: [0, .45, z] }));
    g.add(real.box(1.84, .03, .145, rubber, { pos: [0, .45, z] }));
    for (const x of [-.56, .56]) g.add(real.rbox(.08, .17, .1, .02, chrome, { pos: [x, .47, z + sg * .03] }));
    g.add(real.box(1.6, .05, .05, chrome, { pos: [0, .39, z - sg * .02] }));
  }
  for (const x of [-.72, .72]) g.add(real.box(.22, .09, .03, real.std(o.tail ?? 0x8a1a12, { emissive: 0x600000, ei: o.tailEi ?? .3 }), { pos: [x, .74, -2.385] }));
  g.add(real.box(1.0, .015, .6, chrome, { pos: [0, .99, -1.9] }));   // boot-lid chrome strip
  for (const x of [-.86, .86]) { g.add(real.box(.03, .1, .05, dark, { pos: [x * 1.02, 1.1, .95] })); g.add(real.box(.06, .08, .1, chrome, { pos: [x * 1.06, 1.15, .95] })); }
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return g;
}
// low warm fill beside a car so its flanks and roof never go to a black plane
function carFill(scene, car, i = 2.5) { for (const x of [-1.25, 1.25]) { const l = new THREE.PointLight(0xfff0dc, i, 4, 1.6); l.position.set(car.position.x + x, 1.2, car.position.z + .4); scene.add(l); } const top = new THREE.PointLight(0xfff0dc, i * .5, 3.5, 1.6); top.position.set(car.position.x, 2.3, car.position.z - .4); scene.add(top); }
// procedural wood grain for the lib chairs/table (no wood PBR in assets)
function woodTex(seed = 3) { return real.canvasTex(512, 512, (c, W, H) => { const r = rnd(seed); c.fillStyle = '#6a4426'; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 120; i++) { c.strokeStyle = `rgba(${18 + r() * 30 | 0},${8 + r() * 16 | 0},${4 + r() * 8 | 0},${.2 + r() * .4})`; c.lineWidth = .8 + r() * 3; c.beginPath(); const x = r() * W; c.moveTo(x, 0); c.bezierCurveTo(x + (r() - .5) * 50, H * .33, x + (r() - .5) * 50, H * .66, x + (r() - .5) * 30, H); c.stroke(); }
  c.fillStyle = 'rgba(255,215,160,.07)'; for (let i = 0; i < 60; i++) c.fillRect(r() * W, r() * H, 2 + r() * 4, 20 + r() * 140); }); }
// a single webbing bench on one wall (s = -1 left, +1 right) in olive; returns seat spots
function sideBench(scene, s, z0, z1, pitch = .7) {
  const web = real.std(0x5a6448, { rough: .95 }), tube = real.std(0x8a8a84, { metal: .8, rough: .35 }), zc = (z0 + z1) / 2, L = z1 - z0;
  scene.add(real.box(.42, .04, L, web, { pos: [s * 1.3, .45, zc] })); scene.add(real.box(.03, .03, L, tube, { pos: [s * 1.1, .44, zc] })); scene.add(real.box(.02, .55, L, web, { pos: [s * 1.55, .8, zc] }));
  for (const x of [s * 1.12, s * 1.48]) for (const z of [z0 + .1, z1 - .1]) scene.add(real.m(new THREE.CylinderGeometry(.015, .015, .44, 8), tube, { pos: [x, .22, z] }));
  const spots = []; for (let z = z0 + .35; z <= z1 - .3; z += pitch) spots.push({ x: s * 1.28, z, rot: -s * P / 2 }); return spots;
}
// turn the hold's ceiling lamp panels down (QA r3 #8: blown out top-left in 7.4)
const dimLamps = (scene, ei = .6) => scene.traverse(c => { if (c.isMesh && c.material.emissiveIntensity === 2 && c.geometry.parameters?.width === .4) c.material.emissiveIntensity = ei; });

export const shots = {
  // at Entebbe the hijackers relax upstairs, playing cards
  '7.1': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .3 });
    await C.room(k, { w: 8, d: 6, h: 3.2, floor: 'rubber_tiles', wallColor: 0xcfc4a8 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .6));
    const wood = new THREE.MeshStandardMaterial({ map: woodTex(3), roughness: .5 });
    const lamp = new THREE.SpotLight(0xffd8a0, 45, 6, .7, .6, 1.3); lamp.position.set(0, 2.6, 0); lamp.target.position.set(0, .75, 0); lamp.castShadow = true; scene.add(lamp, lamp.target);
    scene.add(real.m(new THREE.CylinderGeometry(.55, .55, .04, 32), wood, { pos: [0, .74, 0] })); scene.add(real.m(new THREE.CylinderGeometry(.06, .2, .72, 16), wood, { pos: [0, .36, 0] }));
    const cardT = real.canvasTex(128, 180, (c, W, H) => { c.fillStyle = '#f4f0e6'; c.fillRect(0, 0, W, H); c.strokeStyle = '#8a1e1a'; c.lineWidth = 6; c.strokeRect(10, 10, W - 20, H - 20); });
    const r = rnd(5); for (let i = 0; i < 14; i++) { const cd = real.m(new THREE.PlaneGeometry(.063, .088), new THREE.MeshStandardMaterial({ map: cardT, roughness: .6 }), { pos: [(r() - .5) * .45, .762 + i * .0004, (r() - .5) * .45], rot: [-P / 2, 0, r() * P], cast: false }); scene.add(cd); }
    const ids = [C.HJ.bose, C.HJ.hj3, C.HJ.kuhlmann, C.HJ.hj4]; const ppl = [];
    for (let i = 0; i < 4; i++) { const a = i / 4 * P * 2 + P / 4; const x = Math.sin(a) * .85, z = Math.cos(a) * .85; const ch = chair(wood); ch.position.set(x * 1.08, 0, z * 1.08); ch.rotation.y = a + P; scene.add(ch);
      const p = await real.human({ id: ids[i], seed: 4100 + i }); real.put(scene, p, { pos: [x, 0, z], rot: a + P, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: i % 2 ? 'happy' : 'smug' }); p.userData.driven = true; ppl.push(p); }
    const cam = C.dolly(camera, { pos: [2.2, 2.7, 2.6], look: [0, .8, 0], fov: 40 }, { pos: [1.6, 2.4, 1.8], look: [0, .8, 0], fov: 38 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => p.update(t, { pose: 'sitDesk', arm: (t + i) % 3.2 < .5 ? 'point' : 'desk', seatH: .48, mood: i % 2 ? 'happy' : 'smug', talk: Math.sin(t * 1.5 + i * 2) > .4, look: Math.sin(t * .5 + i) * .3 })); };
  },
  // four C-130 Hercules lined up at an Israeli airbase at sunset
  '7.2': async k => {
    const { scene, camera } = k;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-80, 14, -40], sunI: 3.2, sunColor: 0xffb070, shadowSize: 90, envI: .9 });
    const ps = await c130Line(k);
    const cam = C.dolly(camera, { pos: [-70, 4, 42], look: [-40, 5, 0], fov: 40 }, { pos: [40, 4, 42], look: [60, 5, 0], fov: 40 }, { ease: u => u });
    return (t, u) => { cam(u); ps.forEach((p, i) => p.userData.setProps(t, [i === 0 ? 4 : 0, 0, 0, 0])); };
  },
  // a short landing on a dirt strip, dust everywhere
  '7.3': async k => {
    const { scene, camera } = k;
    await real.env(k, 'qwantani_puresky', { sun: [-50, 50, 40], sunI: 4, sunColor: 0xfff0d8, shadowSize: 60, envI: 1, fog: [0xd8d0c0, 150, 1200], fx: false });
    const grass = await real.pbr('grass_path_2', { repeat: [120, 120], color: 0xc0b080 }); scene.add(real.m(new THREE.PlaneGeometry(2000, 2000), grass, { rot: [-P / 2, 0, 0], cast: false }));
    // dirt strip: tinted PBR with its own ragged alpha mask so the edge against the grass is broken and soft (QA r3 #5)
    const dirt = await real.pbr('grass_path_2', { repeat: [9, 180], color: 0x8a6646, rough: 1 });
    const mask = real.canvasTex(256, 1024, (c, W, H) => { const r = rnd(33); c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.fillStyle = '#fff'; c.fillRect(W * .22, 0, W * .56, H);
      for (let i = 0; i < 520; i++) { const y = r() * H, left = i % 2 === 0, x = left ? W * .22 - r() * W * .16 : W * .78 + r() * W * .16, rad = 4 + r() * 18; c.globalAlpha = .35 + r() * .65; c.beginPath(); c.ellipse(x, y, rad, rad * (1.5 + r() * 2.5), 0, 0, P * 2); c.fill(); }
      c.globalAlpha = 1; c.fillStyle = '#000'; for (let i = 0; i < 50; i++) { const y = r() * H, x = W * .24 + r() * W * .52; c.beginPath(); c.ellipse(x, y, 1.5 + r() * 4, 5 + r() * 12, 0, 0, P * 2); c.fill(); } }, { repeat: [1, 22] });
    mask.colorSpace = THREE.NoColorSpace; dirt.alphaMap = mask; dirt.transparent = true;
    scene.add(real.m(new THREE.PlaneGeometry(46, 900), dirt, { pos: [0, .02, 0], rot: [-P / 2, 0, 0], cast: false }));
    const p = S2.c130(); scene.add(p);
    const dustT = real.canvasTex(128, 128, (c, W, H) => { const g = c.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(190,160,120,.8)'); g.addColorStop(1, 'rgba(190,160,120,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
    const puffs = []; for (let i = 0; i < 70; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustT, transparent: true, depthWrite: false, opacity: 0 })); scene.add(s); puffs.push({ s, born: 1e9 }); }
    const T = 1.6; let next = 0;
    const zAt = t => t < T ? -260 + t * 70 : -260 + T * 70 + (t - T) * 70 * Math.max(0, 1 - (t - T) / 4.5) ** .6 * .8;
    return (t, u) => { const z = zAt(t), y = t < T ? (T - t) * 9 : 0; p.position.set(0, y, z); p.rotation.x = t < T ? -.06 : 0; p.userData.setProps(t, [18, 18, 18, 18]);
      if (t > T) { while (next < puffs.length && next < (t - T) * 18) { puffs[next].born = t; puffs[next].pos = [(Math.random() - .5) * 10, 1, z - 6 - Math.random() * 6]; next++; } }
      puffs.forEach(q => { const a = t - q.born; if (a < 0 || a > 4) { q.s.material.opacity = 0; return; } q.s.position.set(q.pos[0] * (1 + a), 1 + a * 2.2, q.pos[2] - a * 2); q.s.scale.setScalar(4 + a * 9); q.s.material.opacity = .55 * (1 - a / 4); });
      camera.position.set(38, 3, z + 30); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(0, y + 3, z); };
  },
  // inside the hold: a Mercedes, two Land Rovers and soldiers, ramp at the back
  '7.4': async k => {
    const { real, scene, camera } = k;
    const h = await holdInterior(k, { seats: false, len: 15 });
    dimLamps(scene);
    const cars = [S2.landrover(), S2.landrover(), mercHero()]; cars.forEach((c, i) => { c.position.set(0, 0, -4.8 + i * 4.8); scene.add(c); });
    carFill(scene, cars[2]);
    for (const z of [-4.8, 0, 4.8]) { const l = new THREE.PointLight(0xffe0b0, 6, 7, 1.6); l.position.set(0, 1.5, z - 1.2); scene.add(l); }
    const ppl = [];
    for (let i = 0; i < 6; i++) { const p = await real.human({ id: CMD[i], seed: 4300 + i }); real.put(scene, p, { pos: [(i % 2 ? 1.5 : -1.7), 0, -5 + Math.floor(i / 2) * 4.2], rot: (i % 2 ? -1 : 1) * P / 2, mood: 'stern' }); p.userData.driven = true; ppl.push(p); }
    const cam = C.dolly(camera, { pos: [.5, 2.6, 7.1], look: [0, .5, -4], fov: 54 }, { pos: [-.5, 2.55, 6.2], look: [0, .6, -5], fov: 54 });
    // six different stances: one crouched at the Land Rover's wheel, one with folded arms, one hugging, one hands on hips (QA r3 #8)
    return (t, u) => { cam(u); capTop(); ppl.forEach((p, i) => { p.update(t, { mood: 'stern', look: Math.sin(t * .5 + i) * .2, arm: i === 2 ? 'hug' : null }); if (i === 3) crouch(p); else if (i === 4) foldArms(p); else if (i === 1) hipsHands(p); }); };
  },
  '7.5': mapDown(old['7.5'], .2, 1.06),
  '7.6': mapDown(old['7.6'], .2, 1.06),
  // the fuel team: ten soldiers with portable pumps and hoses
  '7.7': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'hangar_interior', { sun: [10, 30, 20], sunI: 1.4, shadowSize: 15, envI: .6 });
    const floor = await real.pbr('concrete_floor_worn_001', { repeat: [30, 30] }); scene.add(real.m(new THREE.PlaneGeometry(120, 120), floor, { rot: [-P / 2, 0, 0], cast: false }));
    // soften the join between the photographic backdrop and the 3D floor: dark gradient band ringing the floor edge
    { const dk = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, 'rgba(14,12,10,1)'); g.addColorStop(.25, 'rgba(14,12,10,.85)'); g.addColorStop(.7, 'rgba(14,12,10,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
      const band = real.m(new THREE.CylinderGeometry(18, 18, 7, 48, 1, true), new THREE.MeshBasicMaterial({ map: dk, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false }), { pos: [0, 3.5, 0], cast: false }); band.renderOrder = -1; scene.add(band); }
    const pump = () => { const g = new THREE.Group(); const red = real.std(0xb8302a, { rough: .45 }), steel = real.std(0x8a8a86, { metal: .8, rough: .35 }), blk = real.std(0x151515, { rough: .6 });
      g.add(real.rbox(.7, .5, .45, .05, red, { pos: [0, .3, 0] }));
      // tubular carry frame, louvred engine cover, fuel cap, gauge, pull-start and a data plate, so it reads as a field fuel pump
      for (const [x, z] of [[-.38, -.25], [.38, -.25], [-.38, .25], [.38, .25]]) g.add(real.m(new THREE.CylinderGeometry(.018, .018, .62, 8), steel, { pos: [x, .36, z] }));
      for (const z of [-.25, .25]) g.add(real.m(new THREE.CylinderGeometry(.018, .018, .78, 8), steel, { pos: [0, .67, z], rot: [0, 0, P / 2] }));
      for (let i = 0; i < 5; i++) g.add(real.box(.4, .025, .02, blk, { pos: [-.08, .2 + i * .045, .235], cast: false }));
      g.add(real.m(new THREE.CylinderGeometry(.05, .05, .04, 16), blk, { pos: [-.2, .57, 0] }));
      g.add(real.m(new THREE.CylinderGeometry(.045, .045, .02, 20), real.std(0xe8e4d8, { rough: .4 }), { pos: [.24, .4, .232], rot: [P / 2, 0, 0] }));
      g.add(real.m(new THREE.TorusGeometry(.04, .012, 6, 16), blk, { pos: [.3, .2, .235] }), real.box(.14, .07, .01, real.std(0xd8d0b0, { metal: .5 }), { pos: [.18, .22, .236], cast: false })); g.add(real.box(.8, .05, .55, real.std(0x333333, { metal: .7 }), { pos: [0, .04, 0] })); g.add(real.m(new THREE.CylinderGeometry(.08, .08, .3, 16), real.std(0x777777, { metal: .8, rough: .3 }), { pos: [.2, .65, 0] }));
      g.add(real.m(new THREE.TorusGeometry(.32, .04, 8, 28), real.std(0x111111, { rough: .7 }), { pos: [.75, .05, -.45], rot: [-P / 2, 0, 0] })); g.add(real.m(new THREE.TorusGeometry(.24, .04, 8, 28), real.std(0x111111, { rough: .7 }), { pos: [.75, .13, -.45], rot: [-P / 2, 0, 0] })); return g; };
    // ten men, four of them busy (crouched at a pump, hand on a carry frame, hands on hips, hose coil in hand), the rest jittered so it is no line-up (QA r3 #4)
    const TASK = ['idle', 'crouch', 'idle', 'lean', 'fold', 'idle', 'hips', 'idle', 'coil', 'idle'], jr = rnd(77);
    const ppl = [];
    for (let i = 0; i < 10; i++) { const x = (i < 5 ? -4.4 + i * 2.2 : -3.3 + (i - 5) * 2.0) + (jr() - .5) * .5, z = -1 - Math.floor(i / 5) * 2.4 + (jr() - .5) * .4, task = TASK[i];
      const p = await real.human({ id: CMD[i % CMD.length], seed: 4400 + i });
      const pos = task === 'crouch' ? [x + .05, 0, z + .4] : task === 'lean' ? [x + .2, 0, z + .3] : [x, 0, z], rot = task === 'crouch' ? P / 2 : task === 'lean' ? .45 : .1 + (jr() - .5) * .7;
      real.put(scene, p, { pos, rot, mood: 'stern' }); p.userData.driven = true; p.userData.task = task; ppl.push(p);
      if (task === 'coil') C.attach(p, hoseCoil(), 'RightHand', [0, -.06, 0]);
      const pm = pump(); pm.position.set(x + .75, 0, z + .4); scene.add(pm); }
    const cam = C.dolly(camera, { pos: [0, 2.2, 8], look: [0, 1.1, -2], fov: 42 }, { pos: [0, 1.9, 6.2], look: [0, 1.15, -2], fov: 40 });
    const TASKF = { crouch: p => crouch(p, .9), lean: leanOnFrame, hips: hipsHands, fold: foldArms, coil: carryRight };
    return (t, u) => { cam(u); ppl.forEach((p, i) => { p.update(t, { mood: 'stern', arm: null, look: Math.sin(t * .4 + i) * .2 }); TASKF[p.userData.task]?.(p); }); };
  },
  // Sharm el-Sheikh: the four planes take off one by one over the sea
  '7.8': async k => {
    const { scene, camera } = k;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-70, 22, -60], sunI: 3.4, sunColor: 0xffc890, shadowSize: 80, envI: .9 });
    const sand = await real.pbr('grass_path_2', { repeat: [80, 80], color: 0xc8a878 }); scene.add(real.m(new THREE.PlaneGeometry(1200, 1200), sand, { pos: [0, -.05, -300], rot: [-P / 2, 0, 0], cast: false }));
    const asphalt = await real.pbr('asphalt_02', { repeat: [4, 60] }); scene.add(real.m(new THREE.PlaneGeometry(45, 1200), asphalt, { pos: [0, 0, -300], rot: [-P / 2, 0, 0], cast: false }));
    scene.add(real.m(new THREE.PlaneGeometry(4000, 3000), real.std(0x1a3a52, { rough: .08, metal: .6 }), { pos: [0, -.4, 1800], rot: [-P / 2, 0, 0], cast: false }));
    const ps = [0, 1, 2, 3].map(() => { const p = S2.c130(); p.userData.lights.forEach(l => l.visible = false); scene.add(p); return p; });   // unlit nav spheres sit just past the wingtip (QA r3 #6): hidden, the planes fly dark
    return (t, u) => { ps.forEach((p, i) => { const tt = Math.max(0, t - i * 1.4); const v = 8 + tt * 14; const z = -160 + tt * (8 + tt * 7); const y = Math.max(0, (z + 30) * .12); p.position.set(0, y, z); p.rotation.x = -Math.min(.14, Math.max(0, (z + 30) * .004)); p.userData.setProps(t, [18, 18, 18, 18]); p.visible = true; });
      camera.position.set(-38, 2, 50); camera.fov = 44; camera.updateProjectionMatrix(); const lp = ps[0].position; const f = C.ease(C.seg(t, 3.2, 5.4)); const o0 = [lp.x * .6, 4 + lp.y * .7, Math.min(60, lp.z) * .7 - 10]; camera.lookAt(C.lerp(o0[0], lp.x, f), C.lerp(o0[1], lp.y + 3, f), C.lerp(o0[2], lp.z, f)); };
  },
  // two Boeing 707s high above: the flying hospital and the flying command post
  '7.9': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-60, 30, -40], sunI: 3, sunColor: 0xffd8a8, shadowSize: 120, envI: 1, fx: false });
    const cloudT = real.canvasTex(256, 256, (c, W, H) => { const g = c.createRadialGradient(128, 128, 10, 128, 128, 126); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
    const r = rnd(9); for (let i = 0; i < 90; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudT, transparent: true, depthWrite: false, opacity: .8, color: 0xf2eee8 })); s.position.set((r() - .5) * 900, -20 + r() * 25, -200 + (r() - .5) * 900); s.scale.setScalar(60 + r() * 90); scene.add(s); }
    const herc = [0, 1, 2, 3].map(i => { const p = S2.c130(); p.position.set(-30 + i * 22, -60, -60 - i * 30); scene.add(p); return p; });
    const jets = [0, 1].map(i => { const j = new THREE.Group(); sets.a300({ plain: true }).then(m => j.add(m)); j.position.set(-40 + i * 80, 140 + i * 20, -220 - i * 60); scene.add(j); return j; });
    await new Promise(res => setTimeout(res, 50));
    const cam = C.dolly(camera, { pos: [60, -70, 60], look: [0, -50, -80], fov: 46 }, { pos: [60, 60, 80], look: [0, 120, -220], fov: 46 });
    return (t, u) => { cam(u); herc.forEach((p, i) => { p.position.z = -60 - i * 30 + t * 3; p.userData.setProps(t, [18, 18, 18, 18]); }); jets.forEach((j, i) => { j.position.z = -220 - i * 60 + t * 4; });
      const a = C.ease(C.seg(t, 4, 5)); if (a > 0) jets.forEach((j, i) => { const [x, y] = proj(camera, [j.position.x, j.position.y + 12, j.position.z]); label(k.overlay, i ? 'FLYING COMMAND POST' : 'FLYING HOSPITAL', x, y - 40, a); }); };
  },
  '7.10': old['7.10'],
  '7.11': old['7.11'],
  // each plane has its own job: four numbered Hercules at dusk
  '7.12': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-80, 14, -40], sunI: 3, sunColor: 0xff9a60, shadowSize: 90, envI: .6 });
    const ps = await c130Line(k, { groundColor: 0x8a867c, fog: 0x9cb4d8, fogD: .0045, flatFar: true });
    const cam = C.dolly(camera, { pos: [0, 24, 100], look: [0, 6, 0], fov: 46 }, { pos: [0, 20, 90], look: [0, 6, 0], fov: 46 });
    return (t, u) => { cam(u); ps.forEach((p, i) => { const a = C.seg(t, .2 + i * .4, .4 + i * .4); if (a <= 0) return; const [x, y] = proj(camera, [p.position.x, 16, p.position.z]); const o = k.overlay;
      o.save(); o.translate(x, y); o.scale(1, Math.max(.05, a)); o.fillStyle = '#e8b321'; o.strokeStyle = '#1d1712'; o.lineWidth = 6; o.beginPath(); o.arc(0, 0, 54, 0, P * 2); o.fill(); o.stroke(); o.fillStyle = '#1d1712'; o.font = '64px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(String(i + 1), 0, 4); o.restore(); }); };
  },
  // plane one: the assault team and the convoy; Yoni at the front
  '7.13': async k => {
    const { real, scene, camera } = k;
    // QA r5: red cabin lamps cut ~60% (lampI 10 -> 4, hemi .7 -> .3); a neutral/cool key + rim over the car so it reads as a black satin Mercedes with chrome
    const h = await holdInterior(k, { seats: [-7.6, -5.8], len: 16, red: true, lampI: 4, hemi: .3 });
    const ys = new THREE.SpotLight(0xffd8c0, 14, 6, .6, .6, 1.3); ys.position.set(-1.6, 2.4, .9); ys.target.position.set(-1.2, 1.4, -.6); scene.add(ys, ys.target);
    // low 3/4 front view: the Mercedes sits angled (nose toward the left wall), Land Rover behind the camera
    const merc = mercHero({ color: 0x2c2f34, rough: .35 }); merc.position.set(.05, 0, -3.1); merc.rotation.y = -.36; scene.add(merc);
    merc.traverse(c => { if (c.isMesh && c.material && 'envMapIntensity' in c.material) c.material.envMapIntensity = 1.2; });
    const lr = S2.landrover(); lr.position.set(0, 0, 6.2); scene.add(lr);
    { const key = new THREE.SpotLight(0xdfe8ff, 40, 8, .75, .6, 1.4); key.position.set(1.0, 2.8, -1.0); key.target.position.set(0, .8, -2.6); scene.add(key, key.target);
      const rim = new THREE.SpotLight(0xe8eeff, 22, 8, .7, .6, 1.4); rim.position.set(-1.2, 2.7, -6.0); rim.target.position.set(0, .9, -2.8); scene.add(rim, rim.target);
      const fl = new THREE.PointLight(0xe6ecf4, 3, 4, 1.6); fl.position.set(1.2, 1.0, -.6); scene.add(fl);
      const gk = new THREE.SpotLight(0xd8e2f0, 30, 7, .45, .7, 1.4); gk.position.set(1.6, 2.3, .4); gk.target.position.set(0, 1.25, -3.2); scene.add(gk, gk.target);   // glasshouse: makes pillars vs glass read
      const sd = new THREE.SpotLight(0xdce6f4, 45, 6, .7, .8, 1.4); sd.position.set(1.7, 1.7, -.9); sd.target.position.set(.4, .9, -3.6); scene.add(sd.target); scene.add(sd);   // cool side light: door seams, side glass, sill chrome
      const af = new THREE.PointLight(0xffe8d8, 6, 5, 1.6); af.position.set(0, 2.2, -6.4); scene.add(af); }   // the seated team aft of the car
    const ppl = await seatSoldiers(k, h.seatSpots, CMD, { seed: 4500 });
    // Yoni stands at the front left of the car (>= .5 m clear of the bumper), briefing toward camera
    const y = await real.human({ id: 'tb_yoni', seed: 4599 }); real.put(scene, y, { pos: [-1.1, 0, -.05], rot: .7, mood: 'stern' }); y.userData.driven = true;
    const cam = C.dolly(camera, { pos: [1.4, 1.25, 2.6], look: [-.55, .9, -3.0], fov: 46 }, { pos: [1.35, 1.15, 2.1], look: [-.5, .9, -3.1], fov: 44 });
    return (t, u) => { cam(u); idleSit(ppl, t); y.update(t, { mood: 'stern', arm: t > 2 && t < 4 ? 'point' : null, talk: Math.sin(t * 1.6) > 0, look: Math.sin(t * .5) * .3 }); };
  },
  // a family photo of two brothers (generic, no likeness)
  '7.14': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .3 });
    await C.room(k, { w: 5, d: 4, h: 3, floor: 'dirty_carpet', wallColor: 0xc8b890 });
    scene.add(new THREE.HemisphereLight(0xffe8c8, 0x1a1612, .5));
    const lamp = new THREE.SpotLight(0xffd8a8, 25, 5, .5, .7, 1.3); lamp.position.set(.8, 2.2, 1.4); lamp.target.position.set(0, 1.0, -1.6); lamp.castShadow = true; scene.add(lamp, lamp.target);
    scene.add(real.box(2.4, .05, .5, WOOD(), { pos: [0, .8, -1.72] })); scene.add(real.box(2.4, .8, .48, real.std(0x3a2a1c, { rough: .6 }), { pos: [0, .4, -1.73] }));
    const ph = real.canvasTex(600, 760, (c, W, H) => { c.filter = 'blur(5px)'; c.fillStyle = '#d8c8a0'; c.fillRect(0, 0, W, H); const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#b8a27a'); g.addColorStop(1, '#8a7452'); c.fillStyle = g; c.fillRect(30, 30, W - 60, H - 60);
      for (const [x, s, col] of [[210, 1, '#4a4a32'], [400, .9, '#3a3a44']]) { c.fillStyle = col; c.beginPath(); c.ellipse(x, 300 - (1 - s) * 30, 58 * s, 72 * s, 0, 0, P * 2); c.fill(); c.beginPath(); c.moveTo(x - 110 * s, 730); c.quadraticCurveTo(x - 110 * s, 400, x, 390 - (1 - s) * 30); c.quadraticCurveTo(x + 110 * s, 400, x + 110 * s, 730); c.fill(); }
      c.filter = 'none'; c.fillStyle = 'rgba(255,240,210,.15)'; c.fillRect(30, 30, W - 60, H - 60); c.strokeStyle = '#f2ead8'; c.lineWidth = 30; c.strokeRect(15, 15, W - 30, H - 30); });
    const frame = new THREE.Group(); frame.add(real.box(.36, .45, .03, real.std(0x5a3a20, { rough: .4 }))); frame.add(real.m(new THREE.PlaneGeometry(.3, .38), new THREE.MeshStandardMaterial({ map: ph, roughness: .5 }), { pos: [0, 0, .017], cast: false }));
    const back = real.box(.05, .4, .03, real.std(0x3a2a1c), { pos: [0, -.03, -.1] }); back.rotation.x = .4; frame.add(back);
    frame.position.set(0, 1.05, -1.65); frame.rotation.x = -.12; scene.add(frame);
    const cam = C.dolly(camera, { pos: [.3, 1.35, .4], look: [0, 1.05, -1.65], fov: 36 }, { pos: [.1, 1.2, -.6], look: [0, 1.05, -1.65], fov: 32 });
    return (t, u) => cam(u);
  },
  // plane two: the team to take the new terminal and hold off the army
  '7.15': async k => {
    const { real, scene, camera } = k;
    const h = await holdInterior(k, { len: 14, red: true, seats: false });
    const ppl = await seatSoldiers(k, benchSeats(scene, -4.4, .6, .9), CMD, { seed: 4600 });
    const b = briefBoard('NEW TERMINAL'); b.position.set(0, 0, -5.2); scene.add(b);
    const cam = C.dolly(camera, { pos: [-.4, 1.7, 5.5], look: [0, 1.1, -5], fov: 50 }, { pos: [.4, 1.7, 2.5], look: [0, 1.2, -5.2], fov: 46 });
    return (t, u) => { cam(u); kneeIdle(ppl, t); };
  },
  // plane three: the team for Uganda's fighter jets
  '7.16': async k => {
    const { real, scene, camera } = k;
    const h = await holdInterior(k, { len: 14, red: true, seats: false });
    const ppl = await seatSoldiers(k, benchSeats(scene, -4.4, -2.8, .8), CMD, { seed: 4700 });
    const b = briefBoard('MiG LINE'); b.position.set(0, 0, -5.2); scene.add(b);
    const cam = C.dolly(camera, { pos: [0, 1.75, 1.5], look: [0, 1.3, -5.2], fov: 46 }, { pos: [0, 1.5, -1.3], look: [0, 1.3, -5.2], fov: 42 });
    return (t, u) => { cam(u); capTop(); kneeIdle(ppl, t); };
  },
  // plane four: stretchers and doctors for the hostages
  '7.17': async k => {
    const { real, scene, camera } = k;
    const h = await holdInterior(k, { len: 14, seats: false });
    // stretcher racks: two bays on the left, the far bay on the right; the near right side is a bench so the seated medics are in clear view (QA r3 #9)
    for (const [x, z] of [[-.95, -1.4], [-.95, 1.1], [.95, -1.4]]) for (let j = 0; j < 3; j++) { const s = stretcher(); s.position.set(x, .3 + j * .55, z); scene.add(s); }
    const post = real.std(0x9a9a94, { metal: .8, rough: .3 });
    for (const x of [-1.3, -.6]) for (const z of [-2.6, -.2, 2.4]) scene.add(real.box(.04, 1.6, .04, post, { pos: [x, .8, z] }));
    for (const x of [.6, 1.3]) for (const z of [-2.6, -.2]) scene.add(real.box(.04, 1.6, .04, post, { pos: [x, .8, z] }));
    const ppl = await seatSoldiers(k, sideBench(scene, 1, .2, 2.6), ['tb_medic', 'tb_cmd2', 'tb_medic'], { seed: 4800, mood: 'calm' });
    const m = await real.human({ id: 'tb_medic', seed: 4899 }); real.put(scene, m, { pos: [-.15, 0, 1.6], rot: P, mood: 'calm' }); m.userData.driven = true;
    C.attach(m, medBag(), 'RightHand', [0, -.08, 0]);   // med bag carried in the right hand, arm down (QA r3 #2: hands held air)
    const bag = real.rbox(.45, .3, .25, .04, real.std(0x8a1e1a, { rough: .6 }), { pos: [-.3, .15, 2.4] }); scene.add(bag);
    return (t, u) => { idleSit(ppl, t, { mood: 'calm' }); m.update(t, { mood: 'calm', arm: null, look: Math.sin(t * .6) * .3 }); carryRight(m);
      const a = .4 + u * .5; camera.position.set(Math.sin(a) * 1.2, 1.75, 5.2 - u * .6); camera.fov = 50; camera.updateProjectionMatrix(); camera.lookAt(0, 1.0, -1); };
  },
};
