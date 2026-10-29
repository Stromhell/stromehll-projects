// Operation Thunderbolt · Act 6 · THREE BAD PLANS — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { rnd, WOOD, chair, papers, warRoom, block, night } from '../lib/sets3.js';
import { shots as old } from './tb_act6.js';
const { THREE, sets, P, real } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
const CMD = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_yoni', 'tb_gen2', 'tb_gen1'];
function rifleShape() { const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ color: 0x101010, roughness: .6, metalness: .3 }); g.add(new THREE.Mesh(new THREE.BoxGeometry(.04, .07, .95), mt)); const st = new THREE.Mesh(new THREE.BoxGeometry(.04, .12, .25), mt); st.position.set(0, -.03, -.5); g.add(st); g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g; }

// plan sketches for the three easel boards
function planTex(i) {
  return real.canvasTex(1040, 720, (c, W, H) => {
    c.fillStyle = '#f2ede0'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#1d1712'; c.font = 'bold 64px "Oswald", sans-serif'; c.fillText(['PLAN 1 · BOATS', 'PLAN 2 · PARACHUTES', 'PLAN 3 · AIRLINER'][i], 40, 86);
    c.strokeStyle = '#1d1712'; c.lineWidth = 6;
    if (i === 0) { c.fillStyle = '#9fb7c4'; c.beginPath(); c.ellipse(560, 420, 380, 210, -.2, 0, P * 2); c.fill(); c.stroke(); c.setLineDash([22, 14]); c.strokeStyle = '#1d4f8a'; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(860 - k * 30, 560 + k * 20); c.quadraticCurveTo(640, 420, 330 + k * 20, 260); c.stroke(); } c.setLineDash([]); c.fillStyle = '#b5281e'; c.beginPath(); c.arc(320, 250, 18, 0, P * 2); c.fill(); }
    if (i === 1) { c.strokeRect(120, 560, 800, 60); for (let k = 0; k < 5; k++) { const x = 220 + k * 150, y = 220 + (k % 2) * 90; c.beginPath(); c.arc(x, y, 50, P, 0); c.stroke(); c.beginPath(); c.moveTo(x - 50, y); c.lineTo(x, y + 90); c.lineTo(x + 50, y); c.stroke(); } }
    if (i === 2) { c.beginPath(); c.moveTo(150, 420); c.lineTo(860, 380); c.lineTo(920, 400); c.lineTo(860, 430); c.lineTo(150, 460); c.closePath(); c.stroke(); c.beginPath(); c.moveTo(480, 400); c.lineTo(380, 250); c.lineTo(440, 250); c.lineTo(600, 395); c.stroke(); for (let k = 0; k < 9; k++) { c.beginPath(); c.arc(260 + k * 62, 418, 10, 0, P * 2); c.stroke(); } }
  });
}
function easel(i) {
  const g = new THREE.Group(); const w = WOOD();
  for (const s of [-1, 1]) { const l = real.box(.05, 2.0, .05, w, { pos: [s * .55, 1.0, 0] }); l.rotation.z = s * .08; g.add(l); }
  const back = real.box(.05, 2.0, .05, w, { pos: [0, .95, -.45] }); back.rotation.x = .25; g.add(back);
  g.add(real.box(1.3, .05, .1, w, { pos: [0, 1.0, .05] }));
  const board = real.m(new THREE.PlaneGeometry(1.3, .9), new THREE.MeshStandardMaterial({ map: planTex(i), roughness: .9 }), { pos: [0, 1.48, .06] }); g.add(board);
  g.add(real.box(1.36, .96, .03, real.std(0x2a2018, { rough: .6 }), { pos: [0, 1.48, .035] }));
  const cover = real.box(1.38, .98, .02, real.std(0x5a4a3a, { rough: .95 }), { pos: [0, 1.48, .085] }); g.add(cover); g.userData.cover = cover;
  return g;
}
async function easelRoom(k, o = {}) {
  const { scene } = k;
  await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .3 });
  await C.room(k, { w: 12, d: 9, h: 3.4, floor: 'dirty_carpet', wallColor: 0xcfc4a6 });
  C.tubes(k, [-3, 0, 3], [-1.5, 1.5], 3.4, { i: 9, dist: 10, color: 0xfff0d8 });
  scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .8));
  return [-2, 0, 2].map((x, i) => { const e = easel(i); e.position.set(x, 0, -2.6); scene.add(e); return e; });
}
function stampTex(text) { return real.canvasTex(800, 260, (c, W, H) => { c.clearRect(0, 0, W, H); c.strokeStyle = '#c0281e'; c.lineWidth = 16; c.strokeRect(14, 14, W - 28, H - 28); c.fillStyle = '#c0281e'; c.font = 'bold 120px "Oswald", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, W / 2, H / 2 + 6); }); }
function deskTop(scene, w = 3, d = 2) { const t = real.rbox(w, .06, d, .02, real.std(0x4a2e1c, { rough: .55 }), { pos: [0, .75, 0] }); scene.add(t); return .793; }

export const shots = {
  // 1 July, dawn: cars arrive at army headquarters in Tel Aviv
  '6.1': async k => {
    const { scene, camera } = k;
    await real.env(k, 'kiara_1_dawn', { sun: [60, 18, -40], sunI: 2.8, sunColor: 0xffc890, shadowSize: 50, envI: .8 });
    const ground = await real.pbr('asphalt_02', { repeat: [30, 30] }); scene.add(real.m(new THREE.PlaneGeometry(200, 200), ground, { rot: [-P / 2, 0, 0], cast: false }));
    const gb = block(40, 16, 14, 21, { day: true, wall: '#d8ccb0' }); gb.position.set(0, 0, -20); scene.add(gb);
    for (let i = 0; i < 4; i++) { const b = block(24, 10 + i * 4, 14, 50 + i, { day: true, wall: '#c8bea4' }); b.position.set(-60 + i * 40, 0, -55); scene.add(b); }
    for (let i = 0; i < 6; i++) { const l = await real.prop('street_lamp_01'); l.position.set(-15 + i * 6, 0, -9); scene.add(l); }
    const cars = [S2.mercedes({}), S2.mercedes({}), S2.landrover()]; cars.forEach(c => { c.rotation.y = P; scene.add(c); });
    const cam = C.dolly(camera, { pos: [16, 12, 20], look: [0, 3, -12], fov: 42 }, { pos: [12, 3.2, 14], look: [0, 2.2, -8], fov: 42 });
    return (t, u) => { cam(u); cars.forEach((c, i) => { const d = (1 - Math.pow(1 - C.seg(t, i * .9, 3.6 + i * .9), 2)) * 24; c.position.set(-4 + i * 4, 0, 18 - d); }); };
  },
  // Brigadier General Dan Shomron and three covered plans
  '6.2': async k => {
    const { real, scene, camera } = k;
    const boards = await easelRoom(k);
    const s = await real.human({ id: 'tb_shomron', seed: 3001 }); real.put(scene, s, { pos: [3.3, 0, -1.7], rot: -.95, mood: 'stern' }); s.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-.4, 1.75, 5.4], look: [.8, 1.5, -2.4], fov: 42 }, { pos: [.6, 1.7, 4.2], look: [1.4, 1.5, -2.2], fov: 40 });
    return (t, u) => { cam(u); s.update(t, { mood: 'stern', arm: t > 1.2 ? 'point' : null, talk: Math.sin(t * 1.7) > -.2, look: -.25 }); k.anchor = C.headPos(s, .4); };
  },
  '6.3': old['6.3'],
  // Lake Victoria at night: the boats far out, and eyes at the waterline
  '6.4': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-60, 40, -80], sunI: 1.5, sunColor: 0xa8bcff, shadowSize: 30, bg: 0x04060c, envI: .25, exposure: 1.1 });
    scene.add(new THREE.HemisphereLight(0x6a7aa8, 0x101418, 1.1));
    const rim = new THREE.SpotLight(0xb8c8ff, 30, 12, .3, .6, 1.2); rim.position.set(-3, 3, -2); rim.target.position.set(1.2, 0, 4); scene.add(rim, rim.target);
    const moon = real.m(new THREE.SphereGeometry(6, 24, 16), new THREE.MeshBasicMaterial({ color: 0xe8ecff }), { pos: [-180, 120, -400], cast: false }); scene.add(moon);
    const wg = new THREE.PlaneGeometry(400, 400, 120, 120); wg.rotateX(-P / 2);
    const water = real.m(wg, real.std(0x0c161c, { rough: .12, metal: .55 }), { cast: false }); scene.add(water);
    const base = wg.attributes.position.array.slice();
    const boats = [0, 1, 2].map(i => { const b = new THREE.Group(); b.add(real.rbox(1.6, .45, 4.2, .2, real.std(0x15181a, { rough: .7 }), { pos: [0, .2, 0] })); for (let j = 0; j < 4; j++) b.add(real.box(.4, .7, .35, real.std(0x101214, { rough: .9 }), { pos: [(j % 2 - .5) * .6, .7, -1 + j * .6] })); b.position.set(-14 + i * 7, 0, -60 - i * 6); b.rotation.y = .5; scene.add(b); return b; });
    // crocodile head: only the brow ridge, eyes and nostrils above the water
    const croc = new THREE.Group(); const skin = real.std(0x1c2216, { rough: .85 });
    const head = real.m(new THREE.SphereGeometry(.5, 24, 12), skin); head.scale.set(.55, .22, 1.8); croc.add(head);
    for (const s of [-1, 1]) { croc.add(real.m(new THREE.SphereGeometry(.09, 16, 10), skin, { pos: [s * .14, .1, .35] })); croc.add(real.m(new THREE.SphereGeometry(.035, 12, 8), real.std(0xd8b050, { rough: .2, emissive: 0xb08a30, ei: 1.4 }), { pos: [s * .14, .15, .42] })); }
    for (const s of [-1, 1]) croc.add(real.m(new THREE.SphereGeometry(.035, 10, 8), skin, { pos: [s * .04, .07, -.82] }));
    croc.position.set(1.2, -.25, 4); croc.rotation.y = P - .3; scene.add(croc);
    const cam = C.dolly(camera, { pos: [3.0, .6, 7.2], look: [-4, .2, -40], fov: 40 }, { pos: [2.2, .45, 5.9], look: [1.1, .05, 3.6], fov: 34 });
    const dur = k.meta.seconds;
    return (t, u) => { cam(u);
      const pa = wg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = base[i * 3], z = base[i * 3 + 2]; pa.array[i * 3 + 1] = Math.sin(x * .35 + t * 1.3) * .05 + Math.sin(z * .5 - t * 1.1) * .04; } pa.needsUpdate = true; wg.computeVertexNormals();
      croc.position.y = -.25 + C.ease(C.seg(t, .8, 2.2)) * .2; croc.position.z = 4 - t * .08;
      boats.forEach((b, i) => { b.position.y = Math.sin(t * 1.2 + i) * .06; });
      const s = C.ease(C.seg(t, dur - 1.6, dur - 1.3)); if (s > 0) { const o = k.overlay; o.save(); o.globalAlpha = s; o.translate(1420, 230); o.rotate(-.07); o.scale(1 + (1 - s) * .5, 1 + (1 - s) * .5); o.strokeStyle = '#d2232a'; o.lineWidth = 10; o.strokeRect(-260, -70, 520, 140); o.fillStyle = '#d2232a'; o.font = '64px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('PLAN 1 REJECTED', 0, 4); o.restore(); } };
  },
  // plan two: paratroopers over the airport at night
  '6.5': async k => {
    const { real, scene, camera } = k;
    await night(k);
    await S2.runwayNight(k, { lit: true, grass: 0x6a7a58 });
    S2.entebbeOld(k, { pos: [-60, 0, -40], rotY: P / 2, litRow: 0, towerLit: true });
    const canopy = real.std(0xa8a488, { rough: .8, mat: { side: THREE.DoubleSide } });
    const chutes = [];
    for (let i = 0; i < 12; i++) { const g = new THREE.Group(); g.add(real.m(new THREE.SphereGeometry(3.2, 20, 8, 0, P * 2, 0, P / 2.6), canopy)); for (let j = 0; j < 6; j++) { const a = j / 6 * P * 2; const l = real.box(.02, 4.2, .02, real.std(0x111111), { pos: [Math.cos(a) * 1.4, -1.4, Math.sin(a) * 1.4] }); l.rotation.set(Math.sin(a) * .35, 0, -Math.cos(a) * .35); g.add(l); }
      const body = real.rbox(.45, 1.7, .35, .15, real.std(0x15170f, { rough: .9 }), { pos: [0, -4.2, 0] }); g.add(body);
      g.position.set(-25 + (i % 4) * 9 + (i * 7 % 3), 160 - Math.floor(i / 4) * 18, -20 + Math.floor(i / 4) * 14 + (i % 3) * 3); g.userData.y0 = g.position.y; scene.add(g); chutes.push(g); }
    return (t, u) => { camera.position.set(34, 205 - t * 7, 58); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(-12, 40, -12); chutes.forEach((c, i) => { c.position.y = c.userData.y0 - t * 9; c.rotation.z = Math.sin(t * .8 + i) * .08; c.rotation.y = t * .1 + i; }); };
  },
  // plan three: commandos hidden inside a passenger jet
  '6.6': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x0a0c10, envI: .4 });
    const cb = await sets.cabin(k, { len: 14, lampI: 8, hemi: 1.1 });
    const ppl = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 9 === 2), pick: (s, i) => CMD[(s.row * 3 + s.col) % CMD.length], mood: 'stern', arm: 'lap' });
    const cam = C.dolly(camera, { pos: [0, 1.65, 6.6], look: [0, 1.15, -4], fov: 50 }, { pos: [0, 1.6, 3.6], look: [0, 1.1, -5], fov: 50 });
    return (t, u) => { cam(u); C.idleSeated(ppl, t); };
  },
  // all three plans get in; none get out
  '6.7': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    const boards = await easelRoom(k);
    const st = stampTex('NO WAY OUT');
    const stamps = boards.map((b, i) => { b.remove(b.userData.cover); const s = real.m(new THREE.PlaneGeometry(1.1, .36), new THREE.MeshStandardMaterial({ map: st, transparent: true, roughness: .8 }), { pos: [0, 1.42, .075], rot: [0, 0, -.12 + i * .06], cast: false }); s.visible = false; b.add(s); return s; });
    const cam = C.dolly(camera, { pos: [-3.2, 1.6, 2.4], look: [-2, 1.45, -2.6], fov: 42 }, { pos: [3.2, 1.6, 2.4], look: [2, 1.45, -2.6], fov: 42 }, { ease: u => u });
    return (t, u) => { cam(u); stamps.forEach((s, i) => { const a = C.seg(t, 1.6 + i * 2, 1.8 + i * 2); s.visible = a > 0; s.scale.setScalar(1 + (1 - a) * .4); }); };
  },
  // Shomron alone at the table, maps spread out
  '6.8': async k => {
    const { real, scene, camera } = k;
    const w = await warRoom(k, { tubeI: 3 });
    const s = await real.human({ id: 'tb_shomron', seed: 3001 }); real.put(scene, s, { pos: [.75, 0, -1.05], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern' }); s.userData.driven = true;
    const pool = new THREE.SpotLight(0xffe0b0, 40, 7, .55, .6, 1.3); pool.position.set(.6, 3.1, .4); pool.target.position.set(.75, .8, -.4); pool.castShadow = true; scene.add(pool, pool.target);
    const cam = C.dolly(camera, { pos: [3.4, 1.9, 3.4], look: [.75, 1.0, -.7], fov: 40 }, { pos: [2.4, 1.7, 2.3], look: [.75, 1.1, -.8], fov: 36 });
    return (t, u) => { cam(u); s.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern', nod: .45, look: Math.sin(t * .4) * .2 }); };
  },
  // the telegram: WE ACCEPT. NEED MORE TIME.
  '6.9': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .25 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .35));
    const top = deskTop(scene, 3, 2);
    const lamp = new THREE.SpotLight(0xffe2b8, 11, 5, .6, .6, 1.3); lamp.position.set(-.4, 2.2, .3); lamp.target.position.set(0, top, 0); lamp.castShadow = true; scene.add(lamp, lamp.target);
    papers(scene, 5, -1.2, 1.2, -.8, .8, top + .001, 17);
    const tt = real.canvasTex(1000, 700, (c, W, H) => { c.fillStyle = '#efe4c4'; c.fillRect(0, 0, W, H); c.fillStyle = '#1d1712'; c.font = 'bold 70px "Oswald", sans-serif'; c.fillText('TELEGRAM', 50, 100); c.fillRect(50, 120, W - 100, 5);
      c.font = 'bold 40px "Courier New", monospace'; c.fillText('TO: THE HIJACKERS, ENTEBBE', 60, 200); c.fillText('VIA: FRENCH GOVERNMENT', 60, 250); c.font = 'bold 74px "Courier New", monospace'; c.fillText('WE ACCEPT.', 60, 390); c.fillText('NEED MORE TIME.', 60, 480); c.font = 'bold 36px "Courier New", monospace'; c.fillText('1 JULY 1976', 60, 620); });
    const tg = real.m(new THREE.PlaneGeometry(.42, .294), new THREE.MeshStandardMaterial({ map: tt, roughness: .9 }), { rot: [-P / 2, 0, 0], cast: false }); scene.add(tg);
    const cam = C.dolly(camera, { pos: [.0, 1.25, .75], look: [0, top, -.02], fov: 40 }, { pos: [0, 1.0, .42], look: [0, top, -.03], fov: 38 });
    return (t, u) => { cam(u); const s = C.ease(C.seg(t, .2, 1.6)); tg.position.set((1 - s) * -.9, top + .004, (1 - s) * .3); tg.rotation.z = (1 - s) * .6; };
  },
  // Amin, briefcase in hand, walks out to his plane for Mauritius
  '6.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'qwantani_puresky', { sun: [-50, 55, 40], sunI: 4, sunColor: 0xfff0d8, shadowSize: 30, envI: 1, fog: [0xd8dde2, 120, 900] });
    await sets.apron(k, { sign: 'ENTEBBE' });
    const jet = await sets.a300({ plain: true }); scene.add(jet);
    const d = jet.userData.doorL1; const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st);
    const foot = d.x + .7 + 12.2;
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [foot + 12, 0, d.z + .3], rot: -P / 2, mood: 'smug' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const bc = new THREE.Group(); bc.add(real.rbox(.45, .33, .1, .02, real.std(0x3a2414, { rough: .4 }))); bc.add(real.box(.12, .03, .02, real.std(0x222222), { pos: [0, .19, 0] })); C.attach(a, bc, 'RightHand', [0, -.2, .02], [0, 0, P / 2]);
    const aide = await real.human({ id: 'tb_ug1', seed: 3101 }); real.put(scene, aide, { pos: [foot + 14, 0, d.z - 1.1], rot: -P / 2 }); aide.userData.driven = true;
    const W = t => Math.min(10.5, t * 1.35);
    return (t, u) => { const x = foot + 12 - W(t); a.position.x = x; aide.position.x = x + 2.2; const moving = W(t) < 10.5;
      a.update(t, { pose: moving ? 'walk' : 'idle', dist: W(t), mood: 'smug', look: .1 }); aide.update(t, { pose: moving ? 'walk' : 'idle', dist: W(t) + .5 });
      camera.position.set(x + 2.5, 1.6, d.z + 6.5); camera.fov = 40; camera.updateProjectionMatrix(); camera.lookAt(x - 1.5, 1.5, d.z); };
  },
  // the deadline moves to 4 July; Amin takes the credit on the radio
  '6.11': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .3 });
    await C.room(k, { w: 6, d: 5, h: 3, floor: 'dirty_carpet', wallColor: 0x6a7058 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .45));
    const key = new THREE.SpotLight(0xffe0b0, 60, 7, .5, .6, 1.3); key.position.set(1.4, 2.6, 1.8); key.target.position.set(0, 1.3, -.8); key.castShadow = true; scene.add(key, key.target);
    const desk = await real.prop('metal_office_desk'); desk.rotation.y = P; scene.add(desk);
    const mic = new THREE.Group(); const metal = real.std(0x8a8a8a, { metal: .9, rough: .3 });
    mic.add(real.m(new THREE.CylinderGeometry(.08, .1, .03, 20), metal)); mic.add(real.m(new THREE.CylinderGeometry(.012, .012, .32, 10), metal, { pos: [0, .17, 0] }));
    const cap = real.m(new THREE.CylinderGeometry(.04, .04, .16, 16), real.std(0x2a2a2a, { metal: .6, rough: .35 }), { pos: [0, .38, .03], rot: [.5, 0, 0] }); mic.add(cap);
    mic.position.set(-.05, .76, .05); scene.add(mic);
    const oa = real.canvasTex(400, 120, (c, W, H) => { c.fillStyle = '#ff3020'; c.fillRect(0, 0, W, H); c.fillStyle = '#fff4e8'; c.font = 'bold 84px "Oswald", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ON AIR', W / 2, H / 2 + 4); });
    scene.add(real.box(.74, .24, .05, real.std(0x1a1a1a), { pos: [-.95, 2.1, -2.49] })); scene.add(real.m(new THREE.PlaneGeometry(.66, .2), new THREE.MeshStandardMaterial({ map: oa, emissiveMap: oa, emissive: 0xffffff, emissiveIntensity: 1.4 }), { pos: [-.95, 2.1, -2.46], cast: false }));
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, -.75], rot: 0, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'smug' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const cam = C.dolly(camera, { pos: [-1.4, 1.45, 2.2], look: [0, 1.35, -.7], fov: 40 }, { pos: [-1.0, 1.4, 1.6], look: [0, 1.4, -.75], fov: 36 });
    return (t, u) => { cam(u); a.update(t, { pose: 'sitDesk', arm: t > 2.5 && t < 3.6 ? 'hold' : 'desk', seatH: .48, mood: 'smug', talk: Math.sin(t * 1.8) > -.3, look: .1 });
      const o = k.overlay; const s = C.ease(C.seg(t, .2, .6)); if (s <= 0) return;
      const f = C.seg(t, 1.3, 1.9); const sy = Math.abs(Math.cos(f * P)); const date = f < .5 ? '1 JULY' : '4 JULY';
      o.save(); o.globalAlpha = s; o.translate(1500, 300); o.fillStyle = 'rgba(29,23,18,.92)'; o.beginPath(); o.roundRect(-230, -150, 460, 300, 14); o.fill(); o.strokeStyle = '#e8b321'; o.lineWidth = 4; o.stroke();
      o.fillStyle = '#e8b321'; o.font = '44px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('DEADLINE', 0, -95);
      o.scale(1, Math.max(.02, sy)); o.fillStyle = '#f4ead3'; o.beginPath(); o.roundRect(-190, -60, 380, 150, 10); o.fill(); o.fillStyle = f < .5 ? '#1d1712' : '#c0281e'; o.font = '92px "Anton"'; o.fillText(date, 0, 18); o.restore(); };
  },
  // Solel Boneh's blueprint of the old terminal unrolls on the table
  '6.12': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .3 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .45));
    const top = deskTop(scene, 3.2, 2);
    const lamp = new THREE.SpotLight(0xffe8c8, 40, 5, .7, .6, 1.3); lamp.position.set(0, 2.3, .4); lamp.target.position.set(0, top, 0); lamp.castShadow = true; scene.add(lamp, lamp.target);
    const bp = real.canvasTex(1600, 1000, (c, W, H) => { c.fillStyle = '#1d4f8a'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 2; for (let x = 0; x < W; x += 50) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 50) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      c.strokeStyle = '#eaf2ff'; c.lineWidth = 6; c.strokeRect(120, 220, 1200, 420); [400, 700, 1000].forEach(x => { c.beginPath(); c.moveTo(x, 220); c.lineTo(x, 640); c.stroke(); }); c.beginPath(); c.moveTo(120, 430); c.lineTo(400, 430); c.stroke(); c.strokeRect(1180, 120, 140, 100);
      for (let x = 160; x < 1300; x += 80) { c.beginPath(); c.moveTo(x, 640); c.lineTo(x + 40, 640); c.lineWidth = 12; c.stroke(); c.lineWidth = 6; }
      c.fillStyle = '#eaf2ff'; c.font = 'bold 40px "Oswald", sans-serif'; c.fillText('OLD TERMINAL · ENTEBBE', 120, 120); c.font = '30px "Oswald", sans-serif'; c.fillText('MAIN HALL', 470, 440); c.fillText('VIP LOUNGE', 150, 340); c.fillText('TOWER', 1190, 180);
      c.strokeRect(1180, 780, 380, 180); c.font = 'bold 44px "Oswald", sans-serif'; c.fillText('SOLEL BONEH', 1210, 850); c.font = '28px "Oswald", sans-serif'; c.fillText('ARCHITECTS & ENGINEERS', 1210, 900); c.fillText('SHEET 1 / 14', 1210, 940); });
    bp.wrapS = THREE.ClampToEdgeWrapping;
    const W = 1.6, Hh = 1.0, x0 = -.8;
    const sheet = real.m(new THREE.PlaneGeometry(1, Hh), new THREE.MeshStandardMaterial({ map: bp, roughness: .85 }), { rot: [-P / 2, 0, 0], cast: false }); scene.add(sheet);
    const roll = real.m(new THREE.CylinderGeometry(.04, .04, Hh, 20), real.std(0x2a5a96, { rough: .8 }), { rot: [P / 2, 0, 0] }); scene.add(roll);
    const cam = C.dolly(camera, { pos: [.1, 1.7, 1.25], look: [0, top, -.05], fov: 44 }, { pos: [.35, 1.35, .7], look: [.3, top, .05], fov: 40 });
    return (t, u) => { cam(u); const s = Math.max(.01, C.ease(C.seg(t, .3, 2.6))); sheet.scale.x = W * s; sheet.position.set(x0 + W * s / 2, top + .002, 0); bp.repeat.set(s, 1); bp.offset.x = 0; roll.position.set(x0 + W * s + .04, top + .04, 0); roll.rotation.y = 0; roll.visible = s < .995; };
  },
  // the blueprint lines rise into a model of the terminal
  '6.13': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x040507, envI: .2 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .3));
    const top = deskTop(scene, 3.2, 2);
    const bp = real.m(new THREE.PlaneGeometry(1.6, 1), real.std(0x1d4f8a, { rough: .85, emissive: 0x0a2850, ei: .4 }), { pos: [0, top + .002, 0], rot: [-P / 2, 0, 0], cast: false }); scene.add(bp);
    const model = new THREE.Group(); model.position.set(0, top + .003, 0); scene.add(model);
    const mat = new THREE.MeshStandardMaterial({ color: 0xcfe4ff, roughness: .3, transparent: true, opacity: .35, emissive: 0x3a7ad0, emissiveIntensity: .5 });
    const lineM = new THREE.LineBasicMaterial({ color: 0xbfe0ff });
    const part = (w, h, d, x, z) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); const e = new THREE.LineSegments(new THREE.EdgesGeometry(b.geometry), lineM); g.add(b, e); g.position.set(x, h / 2, z); model.add(g); return g; };
    part(1.2, .12, .34, 0, 0); part(1.22, .02, .4, 0, .02); part(.14, .16, .14, .5, -.05); part(.18, .05, .18, .5, -.05).position.y = .26;
    for (let i = 0; i < 6; i++) part(.025, .1, .025, -.5 + i * .2, .2);
    const glow = new THREE.PointLight(0x6aaaff, 3, 3, 2); glow.position.set(0, top + .4, 0); scene.add(glow);
    return (t, u) => { const s = C.ease(C.seg(t, .2, 2.6)); model.scale.set(1, Math.max(.001, s), 1);
      const a = -.6 + u * 1.4; camera.position.set(Math.sin(a) * 1.3, top + .5 + .15 * (1 - u), Math.cos(a) * 1.3); camera.fov = 38; camera.updateProjectionMatrix(); camera.lookAt(0, top + .08, 0); };
  },
  // night training: commandos run through a wood-and-canvas copy of the terminal
  '6.14': async k => {
    const { real, scene, camera } = k;
    await night(k);
    const grass = await real.pbr('grass_path_2', { repeat: [60, 60] }); scene.add(real.m(new THREE.PlaneGeometry(300, 300), grass, { rot: [-P / 2, 0, 0], cast: false }));
    const wood = real.std(0x6a5034, { rough: .8 }), canvas = real.std(0xc8bca0, { rough: .95, mat: { side: THREE.DoubleSide } });
    for (let x = -12; x <= 12; x += 3) { scene.add(real.box(.15, 3.2, .15, wood, { pos: [x, 1.6, -3] })); if (x < 12 && Math.abs(x) % 6 !== 0) scene.add(real.m(new THREE.PlaneGeometry(3, 3), canvas, { pos: [x + 1.5, 1.5, -3] })); }
    scene.add(real.box(24.2, .15, .15, wood, { pos: [0, 3.2, -3] }));
    for (const x of [-14, 14]) { const l = new THREE.SpotLight(0xfff0d0, 400, 60, .5, .5, 1.3); l.position.set(x, 8, 6); l.target.position.set(0, 0, -2); l.castShadow = true; scene.add(l, l.target); }
    const men = [];
    for (let i = 0; i < 6; i++) { const p = await real.human({ id: CMD[i], seed: 3200 + i }); real.put(scene, p, { pos: [-16 - i * 1.6, 0, 0], rot: P / 2, mood: 'stern' }); p.userData.driven = true; C.attach(p, rifleShape(), 'Spine2', [.15, .05, -.18], [.9, 0, .3]); men.push(p); }
    const run = 3.4;
    return (t, u) => { men.forEach((p, i) => { const x = -16 - i * 1.6 + t * run; const door = [-6, 0, 6].find(dx => x > dx - 1 && x < dx + 1.5);
        p.position.set(x, 0, door !== undefined && i % 2 ? -.6 : 0); p.update(t, { pose: 'walk', dist: t * run * .55 + i, mood: 'stern' }); });
      const cx = -14 + t * run; camera.position.set(cx + 1.5, 1.5, 7); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(cx + 1, 1.2, -1); };
  },
  // the final plan: four planes land, teams fan out, everyone flies home
  '6.15': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await night(k);
    await S2.runwayNight(k, { lit: true, grass: 0x6a7a58 });
    S2.entebbeOld(k, { pos: [-70, 0, -60], rotY: P / 2, litRow: 0, towerLit: true });
    for (let i = 0; i < 7; i++) { const m = real.rbox(9, 2.2, 13, .6, real.std(0x6a6e64, { rough: .6, metal: .3 }), { pos: [-55 + (i % 4) * 0, 1.6, 60 + i * 16] }); scene.add(m); }
    const planes = [0, 1, 2, 3].map(() => { const p = S2.c130(); scene.add(p); return p; });
    const D = k.meta.seconds;
    const targets = [['TERMINAL', [-62, 4, -60]], ['TOWER', [-62, 14, -95]], ['MiG FIGHTERS', [-55, 2, 100]], ['RUNWAY', [10, 0, 160]]];
    return (t, u) => { camera.position.set(140, 190, 140 - u * 30); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(-20, 0, 0);
      planes.forEach((p, i) => { const land = C.ease(C.seg(t, i * .7, 3 + i * .7)); const leave = C.ease(C.seg(t, D - 2.6 + i * .2, D)); const z = -500 + land * (480 - i * 38) + leave * 600; p.position.set(i % 2 ? 6 : -6, Math.max(0, (1 - land) * 60) + leave * 50, z); p.rotation.x = -(1 - land) * .05 - leave * .15; p.userData.setProps(t, [18, 18, 18, 18]); });
      const o = k.overlay; targets.forEach(([lab, v], i) => { const s = C.ease(C.seg(t, 3.6 + i * .8, 4.6 + i * .8)) * (1 - C.seg(t, D - 2.6, D - 2)); if (s <= 0) return; const p0 = proj(camera, [planes[i].position.x, 0, planes[i].position.z]), p1 = proj(camera, v);
        const x = p0[0] + (p1[0] - p0[0]) * s, y = p0[1] + (p1[1] - p0[1]) * s; o.save(); o.strokeStyle = '#e8b321'; o.fillStyle = '#e8b321'; o.lineWidth = 8; o.lineCap = 'round'; o.beginPath(); o.moveTo(...p0); o.lineTo(x, y); o.stroke();
        const a = Math.atan2(y - p0[1], x - p0[0]); o.translate(x, y); o.rotate(a); o.beginPath(); o.moveTo(10, 0); o.lineTo(-18, -14); o.lineTo(-18, 14); o.closePath(); o.fill(); o.restore();
        if (s > .9) { o.save(); o.font = '34px "Anton"'; o.textAlign = 'center'; o.lineWidth = 7; o.strokeStyle = '#1d1712'; o.strokeText(lab, x, y - 30); o.fillStyle = '#f4ead3'; o.fillText(lab, x, y - 30); o.restore(); } }); };
  },
  '6.16': old['6.16'],
  // 3 July: the cabinet approves, and the planes are already in the air
  '6.17': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x060607, envI: .3 });
    await C.room(k, { w: 8, d: 6, h: 3.3, floor: 'dirty_carpet', wallColor: 0xb8ae94 });
    scene.add(new THREE.HemisphereLight(0xffd8b0, 0x1a1612, .45));
    const wc = document.createElement('canvas'); wc.width = 900; wc.height = 500; const cx = wc.getContext('2d'); const wt = new THREE.CanvasTexture(wc); wt.colorSpace = THREE.SRGBColorSpace;
    const win = real.m(new THREE.PlaneGeometry(2.6, 1.45), new THREE.MeshStandardMaterial({ map: wt, emissiveMap: wt, emissive: 0xffffff, emissiveIntensity: 1.2 }), { pos: [1.2, 1.85, -2.98], cast: false }); scene.add(win);
    const frame = real.std(0x3a2a1c, { rough: .6 }); for (const [w, h, x, y] of [[2.7, .07, 1.2, 2.6], [2.7, .07, 1.2, 1.1], [.07, 1.5, -.1, 1.85], [.07, 1.5, 2.5, 1.85], [.05, 1.45, 1.2, 1.85]]) scene.add(real.box(w, h, .06, frame, { pos: [x, y, -2.95] }));
    const sun = new THREE.SpotLight(0xffb070, 50, 9, .6, .7, 1.2); sun.position.set(1.2, 2, -2.6); sun.target.position.set(-.5, .5, 2); sun.castShadow = true; scene.add(sun, sun.target);
    const clk = await real.prop('wall_clock'); clk.position.set(-1.9, 2.3, -2.97); scene.add(clk);
    const cam = C.dolly(camera, { pos: [.2, 1.8, 3.0], look: [0, 2.0, -3], fov: 42 }, { pos: [-1.2, 2.1, .6], look: [-1.9, 2.3, -3], fov: 34 });
    return (t, u) => { cam(u);
      const g = cx.createLinearGradient(0, 0, 0, 500); g.addColorStop(0, '#3a4a6a'); g.addColorStop(.6, '#d88a50'); g.addColorStop(1, '#f0b070'); cx.fillStyle = g; cx.fillRect(0, 0, 900, 500);
      cx.fillStyle = '#2a2018'; cx.fillRect(0, 440, 900, 60);
      for (let i = 0; i < 4; i++) { const x = 150 + i * 160 + t * 30, y = 380 - i * 40 - t * 22; cx.save(); cx.translate(x, y); cx.rotate(-.25); cx.fillStyle = '#1d1712'; cx.fillRect(-26, -4, 52, 8); cx.fillRect(-6, -26, 10, 52); cx.fillRect(-26, -10, 6, 20); cx.restore(); }
      wt.needsUpdate = true; };
  },
};
