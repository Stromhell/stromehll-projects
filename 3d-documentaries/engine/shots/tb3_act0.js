// Operation Thunderbolt · Act 0 · COLD OPEN — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act0.js';
import { mapShot } from './tb_common.js';
const { THREE, P, real, sets } = C;
// QA act0r2: shared helpers copied from act 8 (caption band, overlay tick, detailed Mercedes)
const capTop = () => ui.used.push([0, 840, 1920, 1080]);
const capBottom = () => ui.used.push([0, 0, 1920, 260]);
// a frame that draws nothing on the 2D overlay comes back with the previous frame's overlay (stills, headless GL); one invisible draw per frame keeps it clean
const tick = k => { const o = k.overlay; if (!o) return; o.save(); o.setTransform(1, 0, 0, 1, 0, 0); o.globalAlpha = .004; o.fillStyle = '#000'; o.fillRect(0, 0, 2, 2); o.restore(); };
// 1970s Mercedes saloon for the close shots (QA act8r1 #6/#7): recessed headlamp housings with chrome rings and glass, a 3-D grille with the star,
// bevelled chrome bumpers with overriders, dark wheel arches and wheels that stand proud of the body so they read (and spin: sets.wheel sets wheelR)
function mercHero(o = {}) {
  const g = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: o.color ?? 0x0a0a0c, roughness: .22, metalness: .5, clearcoat: 1, clearcoatRoughness: .08 });
  const chrome = real.std(0xd8dade, { rough: .12, metal: 1 }), dark = real.std(0x151516, { rough: .85 }), rubber = real.std(0x0c0c0c, { rough: .95 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0a0d10, roughness: .05, metalness: .2, transparent: true, opacity: .75 });
  g.add(real.rbox(1.78, .48, 4.75, .09, paint, { pos: [0, .74, 0] }));                 // body .50–.98
  g.add(real.rbox(1.72, .1, 4.55, .03, dark, { pos: [0, .47, 0] }));                   // sill line
  g.add(real.box(1.5, .06, 4.1, dark, { pos: [0, .42, 0], cast: false }));              // floor pan
  g.add(real.rbox(1.6, .5, 2.4, .14, glass, { pos: [0, 1.21, -.25] }));                 // glasshouse
  g.add(real.rbox(1.58, .06, 2.2, .03, paint, { pos: [0, 1.47, -.25] }));               // roof
  for (const x of [-.8, .8]) { g.add(real.box(.05, .48, .07, paint, { pos: [x, 1.21, .9] })); g.add(real.box(.05, .48, .09, paint, { pos: [x, 1.21, -1.4] })); }
  for (const x of [-.9, .9]) { g.add(real.box(.015, .02, 4.4, chrome, { pos: [x, .985, 0] })); g.add(real.box(.015, .02, 2.3, chrome, { pos: [x * .9, 1.455, -.25] })); }
  for (const x of [-.895, .895]) for (const z of [.1, -1.0]) { g.add(real.box(.01, .4, .012, dark, { pos: [x, .74, z] })); g.add(real.box(.02, .025, .12, chrome, { pos: [x, .86, z - .22] })); }
  // wheel arches + wheels (r .34, outer face 2 cm proud of the body)
  const wm = { tyre: real.std(0x111111, { rough: .9 }), hub: real.std(0xc8ccd0, { rough: .25, metal: .9 }), metal: chrome };
  for (const [x, z] of [[-.8, 1.45], [.8, 1.45], [-.8, -1.45], [.8, -1.45]]) {
    const w = sets.wheel(.34, .22, wm); w.position.set(x, .34, z); g.add(w);
    w.add(real.m(new THREE.TorusGeometry(.17, .012, 8, 32), chrome));
    for (let i = 0; i < 5; i++) { const a = i * P * 2 / 5; w.add(real.m(new THREE.CylinderGeometry(.014, .014, .23, 8), dark, { pos: [Math.cos(a) * .1, Math.sin(a) * .1, 0], rot: [P / 2, 0, 0] })); }
    for (let i = 0; i < 16; i++) { const a = i * P * 2 / 16; w.add(real.m(new THREE.BoxGeometry(.05, .04, .2), rubber, { pos: [Math.cos(a) * .33, Math.sin(a) * .33, 0], rot: [0, 0, a] })); }
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, Math.sign(x) * P / 2, 0], cast: false }));   // arch
    g.add(real.m(new THREE.CircleGeometry(.43, 24, 0, P), dark, { pos: [x * 1.12, .36, z], rot: [0, -Math.sign(x) * P / 2, 0], cast: false }));
  }
  // nose: grille frame + bars + star, headlamp housings, bumpers with rubber strip and overriders
  const zf = 2.375;
  g.add(real.box(.9, .36, .03, dark, { pos: [0, .74, zf - .02] }));
  for (const y of [.56, .92]) g.add(real.box(.94, .03, .06, chrome, { pos: [0, y, zf + .01] }));
  for (const x of [-.46, .46]) g.add(real.box(.03, .39, .06, chrome, { pos: [x, .74, zf + .01] }));
  for (let i = 0; i < 9; i++) g.add(real.box(.014, .33, .04, chrome, { pos: [-.4 + i * .1, .74, zf + .01] }));
  g.add(real.box(.86, .02, .045, chrome, { pos: [0, .74, zf + .015] }));
  const star = new THREE.Group(); star.position.set(0, 1.08, 2.22); g.add(star);
  star.add(real.m(new THREE.TorusGeometry(.055, .006, 8, 24), chrome));
  for (let i = 0; i < 3; i++) { const a = P / 2 + i * P * 2 / 3; star.add(real.box(.008, .055, .008, chrome, { pos: [Math.cos(a) * .027, Math.sin(a) * .027, 0], rot: [0, 0, a - P / 2] })); }
  g.add(real.m(new THREE.CylinderGeometry(.01, .014, .12, 8), chrome, { pos: [0, .99, 2.22] }));
  for (const x of [-.6, .6]) {
    g.add(real.m(new THREE.CylinderGeometry(.15, .15, .1, 24), dark, { pos: [x, .74, zf - .03], rot: [P / 2, 0, 0] }));      // housing
    g.add(real.m(new THREE.CylinderGeometry(.12, .1, .06, 24), real.std(0xb8bcc0, { rough: .2, metal: .9 }), { pos: [x, .74, zf - .01], rot: [P / 2, 0, 0] }));  // reflector bowl
    g.add(real.m(new THREE.SphereGeometry(.06, 14, 10), real.std(0xffffff, { emissive: 0xfff2d0, ei: o.lights ? 3 : .15, rough: .3 }), { pos: [x, .74, zf + .01], cast: false }));    // bulb
    g.add(real.m(new THREE.SphereGeometry(.13, 20, 14, 0, P * 2, 0, P / 2), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, metalness: 0, transparent: true, opacity: .3, transmission: 0 }), { pos: [x, .74, zf + .005], rot: [P / 2, 0, 0], cast: false }));   // glass dome
    g.add(real.m(new THREE.TorusGeometry(.145, .016, 8, 32), chrome, { pos: [x, .74, zf + .02] }));                      // chrome ring
    g.add(real.box(.14, .06, .03, real.std(0xe0a040, { emissive: 0xd08020, ei: o.lights ? .6 : .1 }), { pos: [x * 1.25, .52, zf - .01] }));   // indicator
  }
  for (const [z, sg] of [[2.42, 1], [-2.42, -1]]) {
    g.add(real.rbox(1.84, .11, .14, .03, chrome, { pos: [0, .45, z] }));
    g.add(real.box(1.84, .03, .145, rubber, { pos: [0, .45, z] }));
    for (const x of [-.56, .56]) g.add(real.rbox(.08, .17, .1, .02, chrome, { pos: [x, .47, z + sg * .03] }));
    g.add(real.box(1.6, .05, .05, chrome, { pos: [0, .39, z - sg * .02] }));
  }
  for (const x of [-.72, .72]) g.add(real.box(.22, .09, .03, real.std(0x8a1a12, { emissive: 0x600000, ei: .5 }), { pos: [x, .74, -2.385] }));   // tail lamps
  g.add(real.box(.24, .02, .14, chrome, { pos: [0, 1.0, 2.0] }));   // bonnet ridge chrome
  for (const x of [-.86, .86]) { g.add(real.box(.03, .1, .05, dark, { pos: [x * 1.02, 1.1, .95] })); g.add(real.box(.06, .08, .1, chrome, { pos: [x * 1.06, 1.15, .95] })); }   // mirrors
  if (o.flags) for (const x of [-.75, .75]) { g.add(real.m(new THREE.CylinderGeometry(.008, .008, .5, 6), chrome, { pos: [x, 1.2, 2.1] })); g.add(real.m(new THREE.PlaneGeometry(.26, .16), new THREE.MeshStandardMaterial({ map: o.flagTex ?? null, color: o.flagTex ? 0xffffff : 0xd8c040, side: THREE.DoubleSide }), { pos: [x, 1.37, 1.97], rot: [0, P / 2, 0], cast: false })); }
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return g;
}

// moonlit night: dark sky with stars, cool moon key light, very low ambient
async function night(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: o.moon ?? [-40, 60, -30], sunI: (o.moonI ?? 1.1) * 2.6, sunColor: 0xa8bcff, shadowSize: o.shadowSize ?? 40, bg: 0x03040a, envI: o.envI ?? .3, exposure: 1.1 });
  scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, o.hemi ?? .9));
  // star field on a big sphere (inside the camera's 3000 m far plane, or it is culled and the sky stays black)
  const stars = real.canvasTex(4096, 2048, (c, w, h) => { c.fillStyle = '#02030a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 5000; i++) { const x = (i * 7919) % w, y = (i * 104729) % (h * .55); const a = .35 + ((i * 31) % 70) / 100; c.fillStyle = `rgba(230,236,255,${a})`; const sz = (i % 13 === 0) ? 4 : (i % 3 === 0 ? 2.6 : 1.8); c.fillRect(x, y, sz, sz); } });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2500, 48, 24), new THREE.MeshBasicMaterial({ map: stars, side: THREE.BackSide, depthWrite: false, fog: false }));
  sky.renderOrder = -1; scene.add(sky);
  if (o.moonDisc) { const d = new THREE.Vector3(...(o.moon ?? [-40, 60, -30])).normalize().multiplyScalar(2200); scene.add(real.m(new THREE.SphereGeometry(16, 24, 16), new THREE.MeshBasicMaterial({ color: 0xf6f1e2, fog: false }), { pos: d.toArray(), cast: false })); }
  // ground haze: hides the hard seam between the black sky and the moonlit ground/cloud deck (colours here are read as linear, so keep them very dark)
  if (o.haze !== false) { scene.fog = new THREE.Fog(o.hazeColor ?? 0x04050c, o.fogNear ?? 100, o.fogFar ?? 700); hazeBand(scene, { color: o.hazeColor ?? 0x04050c, y: o.hazeY ?? 0, h: o.hazeH ?? 400, clear: o.hazeClear ?? .25, r: o.hazeR ?? 1500 }); }
}
// a big open cylinder whose gradient (haze colour at the bottom, clear part-way up) sits behind everything at the horizon
function hazeBand(scene, { color = 0x0c1018, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = C.real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = C.real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// cloud deck below the formation, lit by the moon
function cloudDeck(k, y = -300, o = {}) {
  const tex = C.real.canvasTex(2048, 2048, (c, w, h) => { c.fillStyle = '#23252b'; c.fillRect(0, 0, w, h); for (let i = 0; i < 900; i++) { const x = (i * 7919) % w, yy = (i * 6271) % h, r = 30 + (i * 37) % 120; const g = c.createRadialGradient(x, yy, 0, x, yy, r); g.addColorStop(0, 'rgba(190,196,210,.45)'); g.addColorStop(1, 'rgba(170,176,190,0)'); c.fillStyle = g; if (o.wrap) { c.save(); for (const dx of [-w, 0, w]) for (const dy of [-h, 0, h]) { c.setTransform(1, 0, 0, 1, dx, dy); c.fillRect(x - r, yy - r, r * 2, r * 2); } c.restore(); } else c.fillRect(x - r, yy - r, r * 2, r * 2); } }, { repeat: [6, 6] });   // o.wrap (QA act0r2): blobs wrap round the tile edges so the repeat shows no seam line
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), new THREE.MeshStandardMaterial({ map: tex, roughness: 1, color: 0x8a90a0 }));
  deck.rotation.x = -P / 2; deck.position.y = y; deck.receiveShadow = false; k.scene.add(deck); return deck;
}
const boltPath = () => { const p = new Path2D(); p.moveTo(10, -80); p.lineTo(-38, 8); p.lineTo(-4, 8); p.lineTo(-20, 80); p.lineTo(40, -14); p.lineTo(6, -14); p.lineTo(24, -80); p.closePath(); return p; };
// night cars: the Mercedes' clearcoat mirrors the HDRI sky and reads light grey, so damp the environment reflections
const darkCar = c => { c.traverse(o => { if (o.isMesh && o.material && 'envMapIntensity' in o.material) o.material.envMapIntensity = .12; }); return c; };
// recolour a cast member's suit (MakeHuman clothes mesh) into a plain uniform colour
function dress(p, color, o = {}) { p.traverse(c => { if (c.isMesh && /clothes_male|clothes_female|casualsuit/i.test(c.name)) { c.material = c.material.clone(); c.material.map = null; c.material.color.set(color); c.material.roughness = o.rough ?? .85; } }); return p; }
// re-aim one limb bone after the lib pose (same method as the lib: aim bone->child direction in the character's own space)
const CHILD = { Arm: 'ForeArm', ForeArm: 'Hand', UpLeg: 'Leg', Leg: 'Foot', Foot: 'ToeBase' };
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
// sitting on the floor (mattress): knees up or legs stretched out, feet resting on the bed instead of through it
function floorLegs(p, style) {
  for (const [sd, sg] of [['Left', 1], ['Right', -1]]) {
    if (style === 'knees') { aimBone(p, sd + 'UpLeg', sg * .12, .55, 1); aimBone(p, sd + 'Leg', sg * .04, -1, .3); aimBone(p, sd + 'Foot', 0, -.15, 1); }
    else if (style === 'cross') { aimBone(p, sd + 'UpLeg', sg * .9, -.05, .55); aimBone(p, sd + 'Leg', -sg * .9, -.08, .35); aimBone(p, sd + 'Foot', -sg * .3, -.1, 1); }
    else { aimBone(p, sd + 'UpLeg', sg * .12, -.02, 1); aimBone(p, sd + 'Leg', sg * .05, -.1, 1); aimBone(p, sd + 'Foot', 0, .75, .65); }
  }
}

// a convoy: black Mercedes + two Land Rovers, each with a commando team inside (dark shapes through the glass); no lights
async function convoy(k, o = {}) {
  const { real, scene } = k;
  const cars = [S2.mercedes({ flags: true }), S2.landrover(), S2.landrover()];
  cars.forEach((c, i) => { darkCar(c); c.position.z = -i * 6; scene.add(c); });
  if (o.crew !== false) for (const [ci, x, z] of [[0, -.4, .2], [0, .4, .2], [0, -.4, -.9], [1, -.4, .5], [1, .4, .5], [2, -.4, .5], [2, .4, .5]]) {
    const p = await real.human({ id: ['tb_yoni', 'tb_cmd1', 'tb_cmd2', 'tb_cmd3'][(ci * 3 + Math.round(x * 5) + 10) % 4], seed: 300 + ci * 10 + z * 10 });
    real.put(scene, p, { pos: [x, .15, z], pose: 'sit', seatH: .45 }); p.userData.driven = true; scene.remove(p); cars[ci].add(p); p.userData.car = cars[ci];
    dress(p, ci ? 0x3e4630 : 0x2a2d2a);
  }
  return cars;
}

// QA act0r2: Land Rover rear/side detail (spare wheel, tailgate, hinges, jerry cans, canvas hoops and straps, plate, tow hitch, step)
function roverDetail(c) {
  const steel = real.std(0x8a8c88, { rough: .35, metal: .8 }), dark = real.std(0x1a1c18, { rough: .8 }), olive = real.std(0x56603e, { rough: .7, metal: .15 }), can = real.std(0x3e4a2c, { rough: .6, metal: .3 });
  const wm = { tyre: real.std(0x111111, { rough: .9 }), hub: real.std(0x6a7058, { rough: .5, metal: .4 }), metal: steel };
  const sp = sets.wheel(.36, .2, wm); sp.rotation.y = P / 2; sp.position.set(0, 1.0, -2.14); c.add(sp);
  for (let i = 0; i < 14; i++) { const a = i * P * 2 / 14; sp.add(real.m(new THREE.BoxGeometry(.05, .04, .2), dark, { pos: [Math.cos(a) * .35, Math.sin(a) * .35, 0], rot: [0, 0, a] })); }
  c.add(real.box(1.5, .5, .03, olive, { pos: [0, .95, -2.035] }));                         // tailgate panel
  for (const x of [-.6, .6]) { c.add(real.box(.12, .04, .04, steel, { pos: [x, 1.12, -2.06] })); c.add(real.box(.12, .04, .04, steel, { pos: [x, .78, -2.06] })); }  // hinges
  c.add(real.box(.5, .18, .02, real.std(0xd8d2b8, { rough: .7 }), { pos: [.45, .66, -2.07] }));   // plate
  c.add(real.box(.12, .12, .2, steel, { pos: [0, .45, -2.15] }));                                  // tow hitch
  c.add(real.box(.5, .04, .18, steel, { pos: [-.45, .42, -2.1] }));                               // step
  for (const x of [-.86, .86]) for (const z of [-1.7, -1.25]) { c.add(real.rbox(.14, .45, .32, .02, can, { pos: [x, 1.05, z] })); c.add(real.box(.15, .03, .1, steel, { pos: [x, 1.29, z] })); }  // jerry cans
  for (const z of [-1.9, -1.1, -.3]) c.add(real.m(new THREE.TorusGeometry(.8, .025, 6, 24, P), dark, { pos: [0, 1.25, z], cast: false }));       // tilt hoops
  for (const x of [-.82, .82]) c.add(real.box(.02, .02, 2.2, dark, { pos: [x, 1.32, -1.0] }));    // tie-down rope
  c.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return c;
}
// QA act0r2: moonlit key on a moving subject (a spot that follows a target)
function keySpot(scene, color, I, pos, tgt) { const l = new THREE.SpotLight(color, I, 0, .5, .6, 0); l.position.set(...pos); l.target.position.set(...tgt); scene.add(l, l.target); return l; }

export const shots = {
  // four Hercules in a row over moonlit cloud tops, all lights off, stars above
  '0.1': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-200, 300, -150], moonI: 1.4, shadowSize: 120, hemi: 1.1, moonDisc: true, haze: false });
    cloudDeck(k, -260);
    scene.fog = new THREE.Fog(0x05060e, 300, 2400);
    hazeBand(scene, { color: 0x05060e, y: -262, h: 500, clear: .22, r: 2300 });
    const planes = [];
    for (let i = 0; i < 4; i++) { const p = S2.c130(); p.position.set(-i * 32, i * 6, -i * 70); scene.add(p); planes.push(p); }
    const cam = C.dolly(camera, { pos: [48, 16, 40], look: [-18, 6, -50], fov: 42 }, { pos: [44, 13, 30], look: [-22, 8, -55], fov: 40 });
    return (t, u) => { cam(u); planes.forEach((p, i) => { p.position.z = -i * 70 + t * 2; p.position.y = i * 6 + Math.sin(t * .6 + i) * .4; p.rotation.z = Math.sin(t * .4 + i) * .02; p.userData.setProps(t, [18, 18, 18, 18]); }); };
  },
  // parchment map (label for Israel offset into the sea so the plane icon and counter do not hide it)
  '0.2': async k => mapShot(k, {
    center: [33.5, 16], span: [34, 38], labels: [['ISRAEL', 31.9, 30.7], ['EGYPT', 29.5, 26], ['SUDAN', 30, 15], ['ETHIOPIA', 39.5, 8.5], ['UGANDA', 32.3, 1.6], ['KENYA', 38, 0.5], ['SAUDI ARABIA', 44, 24]],
    highlight: ['ISR', 'UGA'], faces: [[35.2, 30.6, 'stern'], [32.6, 2.4, 'smug']],
    cities: ['TEL AVIV', 'ENTEBBE'],
    route: [[34.8, 31.9], [34.6, 29.6], [36.6, 24.5], [38.4, 19.5], [41.5, 13.5], [40.5, 8], [36.4, 2], [33.5, .2], [32.44, 0.05]],
    tally: ['', 4000, ' KM'], plane: true,
  }).then(f => (t, u) => { f(t, u); ui.used.push([600, 840, 1320, 1080], [0, 0, 1920, 260]); }),   // QA act0r2: caption off the map centre (UGANDA/KENYA) and the top tally: goes bottom-left
  // from ahead of the left wing, all four engines in frame: the outboard pair spools down and stops, the inboard pair keeps turning
  '0.3': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-60, 80, 40], moonI: 1.6, shadowSize: 400, hemi: 1.1, haze: false });   // QA act0r2: shadow box covers the whole deck (its edge was the dark strip)
    cloudDeck(k, -120, { wrap: true });   // QA act0r2: seamless tiles (the tile seam was the dark strip at the left)
    scene.fog = new THREE.Fog(0x05060e, 200, 1800);
    hazeBand(scene, { color: 0x05060e, y: -122, h: 360, clear: .25, r: 1700 });
    const p = S2.c130({ tint: 0xa09684 }); scene.add(p);
    // QA act0r2: rim light from behind/above to pick out the nacelles and fuselage, a cool fill from the camera side, panel-line texture on the skin
    const rim = new THREE.DirectionalLight(0xb8c8ff, 4.5); rim.position.set(30, 40, -60); scene.add(rim);
    const fillL = new THREE.DirectionalLight(0x8090c0, 1.2); fillL.position.set(-30, 10, 40); scene.add(fillL);
    const skin = real.canvasTex(1024, 1024, (c, w, h) => { c.fillStyle = '#b8b0a0'; c.fillRect(0, 0, w, h); c.strokeStyle = 'rgba(40,36,30,.55)'; c.lineWidth = 2; for (let x = 0; x < w; x += 64) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); } for (let y = 0; y < h; y += 128) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); } c.fillStyle = 'rgba(30,26,20,.5)'; for (let x = 0; x < w; x += 64) for (let y = 4; y < h; y += 16) c.fillRect(x - 1, y, 2, 2); for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(${i % 2 ? 60 : 200},${i % 2 ? 54 : 190},${i % 2 ? 44 : 170},.08)`; c.fillRect((i * 7919) % w, (i * 104729) % h, 40 + i % 60, 20 + i % 30); } }, { repeat: [4, 2] });
    scene.traverse(o => { if (o.isLight) o.castShadow = false; });   // QA act0r2: no moon shadow map over the open cloud deck   // QA act0r2: the wing's shadow on the cloud deck read as a hard dark strip at the left edge
    p.traverse(o => { if (o.isMesh && o.material && o.material.isMeshStandardMaterial && !o.material.map && !o.material.transparent) { const c = o.material.color; if (c.r > .25 && Math.abs(c.r - c.b) < .25) { o.material = o.material.clone(); o.material.map = skin; o.material.needsUpdate = true; } } });
    const dur = k.meta.seconds;
    const cam = C.dolly(camera, { pos: [-17, 7.2, 24], look: [-2.5, 5.0, 3], fov: 44 }, { pos: [-13.5, 6.6, 18.5], look: [-4, 5.0, 3.5], fov: 40 });
    // the propeller angle is the integral of the spin rate, so spooling down looks continuous in any frame
    const off = t => 1 - C.ease(C.seg(t, .9, dur - 1.0));
    const turned = t => { let s = 0; const n = 60; for (let i = 0; i < n; i++) s += off((i + .5) / n * t); return s / n * t; };
    return (t, u) => { cam(u);
      const a = turned(t);
      p.userData.props.forEach((pr, i) => { const stop = i === 0 || i === 3; pr.spin(stop ? 18 * a : 18 * t + i * .3, stop ? 18 * off(t) : 18); pr.disc.material.opacity *= .45; });   // QA act0r2: softer blur discs
      p.position.y = Math.sin(t * .7) * .15; tick(k); };
  },
  // still rolling, the ramp opens and the black Mercedes drives out first, the two Land Rovers after it
  '0.4': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moon: [60, 70, -40], moonI: 1.25, shadowSize: 50, hemi: 1.4, fogNear: 60, fogFar: 380 });
    await S2.runwayNight(k, { lit: false });
    const plane = S2.c130({ gear: true }); scene.add(plane); plane.userData.glow.intensity = 0;
    const cars = await convoy(k);
    // QA act0r2: detailed lead Mercedes (crew stays), detailed Land Rovers, and key lights on the ramp and the vehicles
    { const lead = cars[0]; lead.children.slice().forEach(c => { if (c.userData.person || c.isLight || c.isSkinnedMesh) return; let hasP = false; c.traverse(o => { if (o.isSkinnedMesh) hasP = true; }); if (!hasP && (c.isMesh || c.isGroup)) c.visible = false; }); lead.add(darkCar(mercHero({ flags: true }))); }
    roverDetail(cars[1]); roverDetail(cars[2]);
    keySpot(scene, 0xb0c0ff, 2.2, [14, 14, -44], [0, 0, -16]);
    const rampL = new THREE.PointLight(0xffc890, 30, 14, 1.6); rampL.position.set(0, 4, -8); scene.add(rampL);
    const dur = k.meta.seconds;
    const { floorY, rampAngle: ra0, rampHingeZ: hz, rampLen: L } = plane.userData;
    // height of the deck/ramp/ground under a point at plane-relative z (ramp fully open)
    const hAt = z => z > hz ? floorY : z > hz - L * Math.cos(ra0) ? Math.max(0, floorY - (hz - z) * Math.tan(ra0)) : 0;
    const cam = C.dolly(camera, { pos: [9, 2.3, -32], look: [0, 2.3, -8], fov: 40 }, { pos: [7.5, 1.8, -30], look: [-.5, 1.2, -17], fov: 42 });
    return (t, u) => { cam(u);
      const roll = 1 - C.ease(C.seg(t, 0, 3.2)); plane.position.z = 4 * (t < 3.2 ? t - t * t / 6.4 : 1.6);   // decelerating to a stop
      const ra = C.ease(C.seg(t, .2, 1.9)); plane.userData.rampOpen(ra); plane.userData.glow.intensity = 25 * ra;
      plane.userData.setProps(t, [6, 6, 12 * roll + 4, 12 * roll + 4]);
      cars.forEach((c, i) => { const s = C.seg(t, 1.7 + i * 1.6, 7.7 + i * 1.6); const zr = -3 - i * 0 - s * 28;   // plane-relative centre
        const hf = hAt(zr - 1.4), hb = hAt(zr + 1.4);
        c.position.set(i === 0 ? 0 : (i === 1 ? -.15 : .15), (hf + hb) / 2 + .02, plane.position.z + zr); c.rotation.y = P; c.rotation.x = -Math.atan2(hb - hf, 2.8); c.visible = s > 0 || i === 0; });
      rampL.position.z = plane.position.z - 9; ui.dateTag(k.overlay, 'ENTEBBE · 23:01', t); };
  },
  // inside the old terminal: hostages sitting on mattresses, waiting
  '0.5': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .12 });
    const h = await S2.hall(k, { lampI: 16, hemi: 1.1, tidy: true });
    // QA act0r2: textured plaster on the columns, plus luggage and folded blankets by the beds
    const fillH = new THREE.PointLight(0xffd8a0, 18, 9, 1.4); fillH.position.set(-2, 3.2, -3.4); scene.add(fillH);
    const colM = await real.pbr('plastered_wall_04', { repeat: [.4, 3], color: 0xcabd9c });
    scene.traverse(o => { if (o.isMesh && o.geometry?.parameters?.height === 4.4 && o.geometry.parameters.width === .45) o.material = colM; });
    const bagCols = [0x5a3a24, 0x2a3a52, 0x6a5a3a, 0x3a2a22, 0x7a2a22], blanket = [0x6a3a2a, 0x3a4a6a, 0x5a5a3a];
    h.mats.forEach((mt, i) => { const side = i % 2 ? 1 : -1, cx = mt.x + side * .62, cz = mt.z + (i % 3 - 1) * .4;
      if (i % 2 === 0) { const b = real.rbox(.36, .26, .52, .03, real.std(bagCols[i % 5], { rough: .7 }), { pos: [cx, .13, cz], rot: [0, (i * .7) % 1, 0] }); scene.add(b); scene.add(real.box(.14, .03, .03, real.std(0x222018), { pos: [cx, .275, cz] })); }
      else { scene.add(real.rbox(.6, .08, .4, .03, real.std(blanket[i % 3], { rough: 1 }), { pos: [mt.x, .18, mt.z + .55 * (mt.z > 0 ? 1 : -1)], rot: [0, mt.rot, 0] })); } });
    const ppl = [], styles = ['knees', 'stretch', 'cross'];
    for (let i = 0; i < h.mats.length; i += 2) { const mt = h.mats[i]; const p = await real.human({ id: C.PAX[(i * 3) % 10], seed: 400 + i }); real.put(scene, p, { pos: [mt.x, .14, mt.z], rot: (mt.z > 0 ? P : 0) + mt.rot, pose: 'sit', seatH: 0, arm: i % 3 ? 'lap' : 'hug', mood: 'sad' }); p.userData.driven = true; p.userData.legs = styles[(i / 2 | 0) % 3]; ppl.push(p); }
    const cam = C.dolly(camera, { pos: [-2.6, 1.45, -.5], look: [-2.2, .4, -5.6], fov: 46 }, { pos: [-1.6, 1.4, -.7], look: [-1.4, .4, -5.6], fov: 44 }, { ease: u => u });   // QA act0r2: in the aisle, closer to the hostages, clear of the columns
    return (t, u) => { cam(u); ppl.forEach((p, i) => { p.update(t, { pose: 'sit', seatH: 0, arm: i % 3 ? 'lap' : 'hug', mood: 'sad', look: Math.sin(t * .3 + i) * .2, nod: .3 }); floorLegs(p, p.userData.legs); });
      tick(k); ui.tally(k.overlay, 'HOSTAGES', Math.round(106 * C.ease(C.seg(t, .6, 2.6))), 960, 130, t, .5); };
  },
  // Yoni in the Mercedes: olive uniform and cap, calm, eyes ahead; the driver beside him; his name
  '0.6': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moon: [-50, 45, -60], moonI: .7, hemi: 1.0 });
    await S2.runwayNight(k);
    const car = darkCar(mercHero({ flags: true })); scene.add(car);   // QA act0r2: detailed Mercedes, tall glasshouse (roof at 1.47 m)
    const y = await real.human({ id: 'tb_yoni', seed: 501 }); real.put(scene, y, { pos: [.42, .02, .1], pose: 'sit', seatH: .45, arm: 'lap', mood: 'calm' }); y.userData.driven = true;
    dress(y, 0x4a5230); C.attach(y, S2.cap(0x3a4228), 'Head', [0, .14, .01]);
    const dr = await real.human({ id: 'tb_cmd3', seed: 502 }); real.put(scene, dr, { pos: [-.42, .02, .1], pose: 'sitDesk', arm: 'desk', seatH: .45, mood: 'stern' }); dr.userData.driven = true;
    dress(dr, 0x2c3036); C.attach(dr, S2.cap(0x2a3020, true), 'Head', [0, .12, 0]);
    // the two are in a car, not on the floor: keep the subtitle in its usual place at the bottom (no person boxes to dodge)
    y.userData.person = false; dr.userData.person = false;
    // dashboard glow aimed back at the faces (a spot, so nothing leaks through the bonnet) plus a soft cabin fill
    const dash = new THREE.SpotLight(0xffb070, 6, 2.2, .8, .5, 1.5); dash.position.set(0, 1.08, .8); dash.target.position.set(0, 1.35, -.4); scene.add(dash, dash.target);
    scene.add(real.box(1.5, .22, .55, real.std(0x15161a, { rough: .8 }), { pos: [0, .9, .75] }));   // dashboard slab under the glow
    const fill = new THREE.PointLight(0x8aa0d0, 2.0, 2.4, 1.6); fill.position.set(0, 1.3, -.35); scene.add(fill);
    const face = new THREE.SpotLight(0xffe0c0, 14, 6, .35, .6, 1.2); face.position.set(.3, 1.4, 3.0); face.target.position.set(0, 1.2, .1); scene.add(face, face.target);   // QA act0r2: soft fill on the faces   // inside the cabin, below the roof
    const cam = C.dolly(camera, { pos: [.9, 1.3, 3.6], look: [.1, 1.18, .1], fov: 32 }, { pos: [.65, 1.28, 3.1], look: [.15, 1.2, .1], fov: 30 });
    return (t, u) => { cam(u); y.update(t, { pose: 'sit', seatH: .45, arm: 'lap', mood: 'calm', look: Math.sin(t * .4) * .05 }); dr.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .45, mood: 'stern', look: Math.sin(t * .6 + 2) * .12 });
      // callout top-right, with a leader line down to Yoni's head
      const x = k.overlay; camera.updateMatrixWorld(); const v = new THREE.Vector3(...C.headPos(y, 0)).project(camera); const hx = (v.x + 1) * 960, hy = (1 - v.y) * 540 + 34;   // QA act0r2: leader ends on Yoni's face
      const cx = 1440, cy = 235; const s = Math.min(1, Math.max(0, (t - 1.2) / .3));
      if (s > 0) { x.save(); x.globalAlpha = s; x.strokeStyle = '#fbf6ea'; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, cy + 16); x.lineTo(hx, hy - 34); x.stroke(); x.fillStyle = '#fbf6ea'; x.beginPath(); x.arc(hx, hy - 34, 7, 0, 7); x.fill(); x.restore(); }
      tick(k); ui.callout(x, 'YONATAN "YONI" NETANYAHU', 'COMMANDER, 30', cx, cy, t, 1.2); };
  },
  // the convoy rolls toward the old terminal, headlights off, tower ahead; the camera rises to reveal the airport
  '0.7': async k => {
    const { scene, camera } = k;
    await night(k, { moon: [-60, 50, -50], moonI: 1.3, shadowSize: 60, hemi: 1.4, fogNear: 80, fogFar: 520, hazeColor: 0x0a0c16, hazeH: 260, hazeClear: .3, hazeR: 600 });   // QA act0r2: haze band nearer and taller to blend the ground/sky seam
    await S2.runwayNight(k);
    S2.entebbeOld(k, { pos: [10, 0, 220], rotY: P, lit: [3, 4, 9, 30], towerLit: true });
    const cars = await convoy(k, { crew: false });
    roverDetail(cars[1]); roverDetail(cars[2]);
    const key = keySpot(scene, 0xb0c0ff, 1.6, [-10, 12, -20], [0, 0, 0]);
    // distant low hills on the horizon so the runway does not end on a hard line
    for (let i = 0; i < 14; i++) { const a = (i / 14) * P * 2; scene.add(real.m(new THREE.SphereGeometry(60 + (i * 37) % 50, 16, 8, 0, P * 2, 0, P / 2), real.std(0x0a0c12, { rough: 1 }), { pos: [Math.sin(a) * 520, -10, Math.cos(a) * 520], scale: [2.2, .22 + (i % 3) * .06, 1], cast: false })); }
    const dur = k.meta.seconds;
    const A = new THREE.Vector3(2.6, 1.5, -16), B = new THREE.Vector3(2.2, 1.8, 2), LA = new THREE.Vector3(0, 1.2, 30), LB = new THREE.Vector3(0, 2.5, 120), RISE = new THREE.Vector3(3, 17, -24), RL = new THREE.Vector3(0, 3, 60), L = new THREE.Vector3();
    camera.fov = 42; camera.updateProjectionMatrix();
    return (t, u) => {
      const e1 = u, e2 = C.ease(C.seg(t, dur * .5, dur));
      camera.position.lerpVectors(A, B, e1).addScaledVector(RISE, e2); L.lerpVectors(LA, LB, e1).addScaledVector(RL, e2); camera.lookAt(L);
      cars.forEach((c, i) => { c.position.set((i - 1) * .3, 0, -i * 8 + t * 4.2 + 8); c.rotation.y = 0; }); key.target.position.copy(cars[1].position); key.position.set(-10, 12, cars[1].position.z - 20); tick(k); };
  },
  // title
  '0.8': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await night(k, { moonI: .8 });
    await S2.runwayNight(k);
    S2.entebbeOld(k, { pos: [10, 0, 220], rotY: P, lit: [3, 4], towerLit: true });
    const cam = C.dolly(camera, { pos: [0, 5, -40], look: [0, 4, 100], fov: 42 }, { pos: [0, 4.5, -30], look: [0, 4, 100], fov: 42 });
    const bolt = boltPath();
    return (t, u) => { cam(u); const x = k.overlay;
      const fl = t > .35 && t < .55 ? 1 - (t - .35) / .2 : 0;
      if (fl > 0) { x.fillStyle = `rgba(230,235,255,${fl * .55})`; x.fillRect(0, 0, 1920, 1080); }
      ui.slam(x, 'OPERATION THUNDERBOLT', t, .4, { size: 150, y: 520, sub: 'ENTEBBE · 4 JULY 1976' });
      if (t > .4) { x.save(); x.globalAlpha = Math.min(1, (t - .4) / .2); x.translate(960, 330); x.scale(1.2, 1.2); x.fillStyle = '#e8b321'; x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.fill(bolt); x.stroke(bolt); x.restore(); } };
  },
};
