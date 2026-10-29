// Operation Thunderbolt · Act 9 · HOME — realistic look (v3 engine)
// Violence only implied: distant flashes, smoke, empty places. Real people are generic figures.
import * as C from './tb3_common.js';
import * as S2 from '../lib/sets2.js';
import { mig } from '../lib/props.js';
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
const card = (k, lines, a) => { if (a <= 0) return; const o = k.overlay; o.save(); o.globalAlpha = a; o.textAlign = 'center'; lines.forEach(([txt, y, size, col]) => { o.font = `${size}px "Anton"`; o.lineWidth = size / 5; o.strokeStyle = '#1d1712'; o.strokeText(txt, 960, y); o.fillStyle = col ?? '#f4ead3'; o.fillText(txt, 960, y); }); o.restore(); };

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
    await starNight(k, { moon: [-50, 60, 80], moonI: 2.2, shadowSize: 80, fx: false });
    await apronGround(k, 0x9a9a96); scene.add(new THREE.HemisphereLight(0x8090b0, 0x202020, .6));
    for (const x of [-40, 0, 40]) { const fl = new THREE.SpotLight(0xffe0b0, 600, 60, .5, .6, 1.3); fl.position.set(x, 14, 20); fl.target.position.set(x, 0, 0); scene.add(fl, fl.target); }
    const metal = real.std(0x7a807a, { metal: .6, rough: .45 });
    const jets = []; for (let i = 0; i < 11; i++) { const j = mig(); j.traverse(c => { if (c.isMesh) { c.material = metal; c.castShadow = true; } }); j.position.set(-50 + i * 10, 0, 0); j.rotation.y = .5; scene.add(j); jets.push(j); }
    const fl = jets.map(j => flash(scene, [j.position.x, 2, j.position.z + 1], { size: 4, i: 400, dist: 30 }));
    const sm = jets.map((j, i) => smoke(scene, [j.position.x, 1.5, j.position.z], 6, 10 + i));
    const D = k.meta.seconds;
    const cam = C.dolly(camera, { pos: [-62, 4, 26], look: [-30, 2, 0], fov: 42 }, { pos: [30, 5, 30], look: [50, 2, 0], fov: 42 }, { ease: u => u });
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
    const crowd = []; for (let i = 0; i < 18; i++) { const p = await real.human({ id: C.PAX[(i * 7) % 10], seed: 6300 + i }); real.put(scene, p, { pos: [-14 + i * 1.6 + (i % 2) * .4, 0, 31 + (i % 3) * .7], rot: P - .5, mood: 'worried' }); p.userData.driven = true; crowd.push(p); }
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
      const a = await real.human({ id: C.PAX[(i * 2) % 10], seed: 6400 + i }); real.put(scene, a, { pos: [x - .22, 0, z], rot: P / 2, arm: 'hug', mood: 'happy' }); a.userData.driven = true;
      const b = await real.human({ id: C.PAX[(i * 2 + 1) % 10], seed: 6450 + i }); real.put(scene, b, { pos: [x + .22, 0, z], rot: -P / 2, arm: 'hug', mood: 'happy' }); b.userData.driven = true; pairs.push(a, b); }
    const cam = C.dolly(camera, { pos: [5, 1.7, 8], look: [0, 1.3, 1], fov: 40 }, { pos: [3.4, 1.6, 6.4], look: [0, 1.3, 1], fov: 38 });
    return (t, u) => { cam(u); pairs.forEach((p, i) => p.update(t, { arm: 'hug', mood: 'happy', nod: Math.sin(t * 2 + i) * .08 })); };
  },
  // Amin furious at his desk, fist down, map of Kenya behind
  '9.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .35 });
    await C.room(k, { w: 8, d: 6, h: 3.4, floor: 'dirty_carpet', wallColor: 0x8a9a6a });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .5));
    const key = new THREE.SpotLight(0xffe0b0, 70, 9, .55, .6, 1.3); key.position.set(-1.5, 3, 2); key.target.position.set(0, 1.3, -.8); key.castShadow = true; scene.add(key, key.target);
    const desk = await real.prop('metal_office_desk'); desk.position.set(0, 0, .2); desk.rotation.y = P; scene.add(desk);
    const ph = rotary(0xd8d0b8); ph.g.position.set(.5, .76, .25); ph.g.rotation.y = P; scene.add(ph.g);
    const mt = real.canvasTex(900, 640, (c, W, H) => { c.fillStyle = '#d8ccb0'; c.fillRect(0, 0, W, H); c.fillStyle = '#b9a988'; c.beginPath(); c.moveTo(80, 120); c.lineTo(380, 90); c.lineTo(420, 380); c.lineTo(120, 420); c.fill(); c.fillStyle = '#c96a4a'; c.beginPath(); c.moveTo(420, 100); c.lineTo(820, 160); c.lineTo(760, 560); c.lineTo(440, 520); c.lineTo(420, 380); c.fill(); c.strokeStyle = '#2b1e16'; c.lineWidth = 6; c.stroke(); c.fillStyle = '#2b1e16'; c.font = 'bold 60px "Oswald", sans-serif'; c.fillText('UGANDA', 130, 280); c.fillText('KENYA', 520, 340); c.fillStyle = '#5a7a9a'; c.beginPath(); c.ellipse(330, 470, 120, 80, 0, 0, 7); c.fill(); });
    scene.add(real.m(new THREE.PlaneGeometry(2.2, 1.56), new THREE.MeshStandardMaterial({ map: mt, roughness: .9 }), { pos: [.9, 1.9, -2.95], cast: false }));
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, -.6], rot: 0, mood: 'stern' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const cam = C.dolly(camera, { pos: [1.4, 1.65, 2.6], look: [0, 1.4, -.6], fov: 38 }, { pos: [1.0, 1.6, 2.0], look: [0, 1.45, -.6], fov: 36 });
    return (t, u) => { cam(u); const hit = Math.max(0, Math.sin(t * 2.4)); a.update(t, { arm: hit > .6 ? 'desk' : 'point', mood: 'stern', talk: Math.sin(t * 3) > 0, look: Math.sin(t * .7) * .2, nod: hit * .1 }); ph.g.position.y = .76 + (hit > .95 ? .01 : 0); };
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
    bed.add(real.rbox(.95, .2, 2, .04, real.std(0xeeeeea, { rough: .9 }), { pos: [0, .62, 0] }));
    bed.add(real.rbox(.6, .12, .35, .05, real.std(0xf4f4f0, { rough: .95 }), { pos: [0, .78, -.75] }));
    bed.add(real.box(.98, .02, 1.2, real.std(0xd8dce0, { rough: .9 }), { pos: [0, .73, .35] }));
    for (const x of [-.45, .45]) for (const z of [-.95, .95]) bed.add(real.box(.04, .55, .04, metal, { pos: [x, .27, z] }));
    bed.add(real.box(1, .6, .04, metal, { pos: [0, .95, -1] }));
    bed.position.set(0, 0, -1); scene.add(bed);
    const cg = new THREE.PlaneGeometry(2.4, 2.4, 30, 4); const cb = cg.attributes.position.array.slice();
    const curtain = real.m(cg, real.std(0x9ab8b0, { rough: .9, mat: { side: THREE.DoubleSide } }), { pos: [1.4, 1.4, -1], rot: [0, P / 2, 0] }); scene.add(curtain);
    scene.add(real.box(.03, .03, 3, metal, { pos: [1.4, 2.62, -1] }));
    const cam = C.dolly(camera, { pos: [-1.2, 1.5, 2.6], look: [.2, .7, -1], fov: 40 }, { pos: [-.8, 1.4, 1.8], look: [.2, .7, -1], fov: 38 });
    return (t, u) => { cam(u); const pa = cg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = cb[i * 3]; pa.array[i * 3 + 2] = Math.sin(x * 9) * .06 + Math.sin(x * 3 + t * .6) * .02; } pa.needsUpdate = true; };
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
    for (let i = 0; i < 5; i++) { const f = new THREE.Group(); f.add(real.m(new THREE.SphereGeometry(.07, 10, 8), real.std([0xd8302a, 0xf2f0e8, 0xf4c400][i % 3], { rough: .7 }), { pos: [0, .07, 0] })); f.position.set(-.6 + i * .3, .2, .5); scene.add(f); }
    const cam = C.dolly(camera, { pos: [.6, 1.3, 4.4], look: [-.5, 1.3, 0], fov: 40 }, { pos: [.3, 1.4, 3.4], look: [-.5, 1.5, 0], fov: 38 });
    return (t, u) => { cam(u); const pa = fg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = fb[i * 3]; pa.array[i * 3 + 2] = Math.sin(x * 4 + t * 3) * .05 * (x + .75); } pa.needsUpdate = true;
      card(k, [['OPERATION YONATAN', 200, 92, '#e8b321'], ['4 JULY 1976', 270, 40]], C.ease(C.seg(t, k.meta.seconds * .45, k.meta.seconds * .55))); };
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
    await real.env(k, 'kiara_1_dawn', { sun: [0, 6, -200], sunI: 3, sunColor: 0xffc890, shadowSize: 80, envI: 1 });
    scene.add(real.m(new THREE.PlaneGeometry(4000, 4000), real.std(0x3a4a5a, { rough: .2, metal: .5 }), { pos: [0, -300, 0], rot: [-P / 2, 0, 0], cast: false }));
    const ps = [0, 1, 2, 3].map(i => { const p = S2.c130(); p.rotation.y = P; p.position.set((i - 1.5) * 34, (i % 2) * 6, -i * 12); scene.add(p); return p; });
    return (t, u) => { ps.forEach((p, i) => { p.position.z = -i * 12 - t * 40; p.userData.setProps(t, [30, 30, 30, 30]); });
      camera.position.set(10, 14, 60 - t * 40); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(0, 4, -80 - t * 40); };
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
