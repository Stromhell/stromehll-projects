// Operation Thunderbolt · Act 6 · THREE BAD PLANS — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { rnd, WOOD, chair, papers, warRoom, block, night, rotary } from '../lib/sets3.js';
import { shots as old } from './tb_act6.js';
import * as TB from './tb_common.js';
const { THREE, sets, P, real } = C;

// ground haze: open cylinder with a fog-coloured gradient that hides the seam between the HDRI sky and the fogged ground (same pattern as act 7 c130Line)
function hazeBand(scene, { color = 0xc4ccd8, r = 1500, h = 400, clear = .25, y = 0, op = 1 } = {}) {
  const css = '#' + new THREE.Color(color).getHexString();
  const tex = real.canvasTex(8, 256, (c, W, H) => { const g = c.createLinearGradient(0, H, 0, 0); g.addColorStop(0, css); g.addColorStop(.35 * clear, css); g.addColorStop(clear, css + '00'); g.addColorStop(1, css + '00'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.BackSide, depthWrite: false, fog: false, opacity: op });
  const band = real.m(new THREE.CylinderGeometry(r, r, h, 64, 1, true), m, { pos: [0, y + h / 2, 0], cast: false }); band.renderOrder = -1; scene.add(band); return band;
}
// low-poly street tree: trunk + foliage lumps
function tree(h = 6, seed = 1) {
  const r = rnd(seed); const g = new THREE.Group();
  g.add(real.m(new THREE.CylinderGeometry(.12, .2, h * .5, 8), real.std(0x4a3828, { rough: .9 }), { pos: [0, h * .25, 0] }));
  const leaf = real.std(0x2e4a26, { rough: .95 });
  for (let i = 0; i < 4; i++) { const s = h * (.2 + r() * .12); g.add(real.m(new THREE.IcosahedronGeometry(s, 1), leaf, { pos: [(r() - .5) * h * .25, h * .5 + i * h * .12, (r() - .5) * h * .25] })); }
  return g;
}
// delta-wing fighter silhouette for the far parking pads (the MiG shape of tb3_act9 in plain dark metal)
function migJet(col = 0x6a6e64) {
  const g = new THREE.Group(); const mt = real.std(col, { rough: .55, metal: .4 });
  g.add(real.m(new THREE.CylinderGeometry(.6, .8, 11, 14), mt, { pos: [0, 1.6, 0], rot: [P / 2, 0, 0] }));
  g.add(real.m(new THREE.ConeGeometry(.6, 2.2, 14), mt, { pos: [0, 1.6, 6.6], rot: [P / 2, 0, 0] }));
  const shape = new THREE.Shape(); shape.moveTo(0, 2); shape.lineTo(3.6, -2.5); shape.lineTo(-3.6, -2.5); shape.lineTo(0, 2);
  g.add(real.m(new THREE.ExtrudeGeometry(shape, { depth: .15, bevelEnabled: false }), mt, { pos: [0, 1.4, -1], rot: [-P / 2, 0, 0] }));
  g.add(real.box(.15, 2.4, 2.2, mt, { pos: [0, 2.8, -4.5], rot: [-.4, 0, 0] }));
  g.add(real.m(new THREE.SphereGeometry(.45, 12, 8), real.std(0x1a2430, { rough: .2, metal: .5 }), { pos: [0, 2.2, 2.8], scale: [1, .8, 2] }));
  for (const [x, z] of [[-1.2, -1], [1.2, -1], [0, 4]]) g.add(real.m(new THREE.CylinderGeometry(.3, .3, .25, 12), real.std(0x1a1a1a), { pos: [x, .3, z], rot: [0, 0, P / 2] }));
  return g;
}
// Solel Boneh blueprint sheet (shared by 6.12 and the 6.13 model floor): 1600x1000 px = 1.6 x 1.0 m, so x = px/1000 - .8, z = py/1000 - .5
function blueprintTex() {
  return real.canvasTex(1600, 1000, (c, W, H) => { c.fillStyle = '#1d4f8a'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 2; for (let x = 0; x < W; x += 50) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 50) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.strokeStyle = '#eaf2ff'; c.lineWidth = 6; c.strokeRect(120, 220, 1200, 420); [400, 700, 1000].forEach(x => { c.beginPath(); c.moveTo(x, 220); c.lineTo(x, 640); c.stroke(); }); c.beginPath(); c.moveTo(120, 430); c.lineTo(400, 430); c.stroke(); c.strokeRect(1180, 120, 140, 100);
    for (let x = 160; x < 1300; x += 80) { c.beginPath(); c.moveTo(x, 640); c.lineTo(x + 40, 640); c.lineWidth = 12; c.stroke(); c.lineWidth = 6; }
    c.fillStyle = '#eaf2ff'; c.font = 'bold 40px "Oswald", sans-serif'; c.fillText('OLD TERMINAL · ENTEBBE', 120, 120); c.font = '30px "Oswald", sans-serif'; c.fillText('MAIN HALL', 470, 440); c.fillText('VIP LOUNGE', 150, 340); c.fillText('TOWER', 1190, 180);
    c.strokeRect(1180, 780, 380, 180); c.font = 'bold 44px "Oswald", sans-serif'; c.fillText('SOLEL BONEH', 1210, 850); c.font = '28px "Oswald", sans-serif'; c.fillText('ARCHITECTS & ENGINEERS', 1210, 900); c.fillText('SHEET 1 / 14', 1210, 940); });
}
// keep the subtitle out of a screen band this frame: ui.used is the list runtime's subtitle placement avoids, cleared every frame
const keepClear = (x0, y0, x1, y1) => { ui.used.push([x0, y0, x1, y1]); };
// Lake Victoria map (the old act's lakeMap with the lake label moved up and right, clear of the caption band)
const lakeMap = (k, extra, o = {}) => TB.mapShot(k, { center: [32.6, -0.4], span: [5, 3.6], k: 30, labels: [['LAKE VICTORIA', 33.75, -0.45], ['UGANDA', 31.5, 1.0], ['KENYA', 34.5, 0.3]], highlight: ['UGA'], cities: ['ENTEBBE', 'KAMPALA'], extra, ...o });
// a flat ink leader line laid on a map between two lon/lat points
function leader(map, a, b, color = 0x2b1e16, w = .35) {
  const p = map.proj(a[0], a[1], .3), q = map.proj(b[0], b[1], .3); const d = q.clone().sub(p); const len = d.length();
  const m = real.m(new THREE.BoxGeometry(len, .08, w), new THREE.MeshBasicMaterial({ color }), { cast: false }); m.position.copy(p).add(q).multiplyScalar(.5); m.rotation.y = -Math.atan2(d.z, d.x); return m;
}

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
    scene.add(new THREE.HemisphereLight(0xc8b0c0, 0x2a2430, .5));
    // dawn haze: fogged ground out to the horizon, and a haze band to soften the hard mountain/sky edge of the HDRI
    scene.fog = new THREE.FogExp2(0xb8a4ac, .0045); hazeBand(scene, { color: 0xb8a4ac, r: 1500, h: 420, clear: .22 });
    const ground = await real.pbr('asphalt_02', { repeat: [30, 30] }); scene.add(real.m(new THREE.PlaneGeometry(200, 200), ground, { rot: [-P / 2, 0, 0], cast: false }));
    scene.add(real.m(new THREE.PlaneGeometry(4000, 4000), real.std(0x6a6462, { rough: .95 }), { pos: [0, -.03, 0], rot: [-P / 2, 0, 0], cast: false }));
    // headquarters block: facade from sets3.block, plus a raised forecourt, kerbs, entrance steps, canopy on piers, signboard, flagpole and roof masts
    const gb = block(40, 16, 14, 21, { day: true, wall: '#d8ccb0' }); gb.position.set(0, 0, -20); scene.add(gb);
    const conc = real.std(0xb4aca0, { rough: .9 }), kerb = real.std(0xd8d2c6, { rough: .8 }), dark = real.std(0x3a3c3e, { rough: .6, metal: .3 });
    scene.add(real.box(56, .16, 5, conc, { pos: [0, .08, -10.6] }));                       // pavement in front of the facade
    scene.add(real.box(56, .18, .25, kerb, { pos: [0, .09, -8.1] }));                      // kerb line
    for (let i = 0; i < 3; i++) scene.add(real.box(9, .12 + i * .12, .9, conc, { pos: [0, .06 + i * .06, -12.9 + i * .9 - .9] })); // entrance steps
    scene.add(real.box(10, .35, 5, real.std(0xe4dccb, { rough: .7 }), { pos: [0, 4.3, -10.6] }));  // entrance canopy
    scene.add(real.box(10.2, .12, 5.2, dark, { pos: [0, 4.52, -10.6] }));
    for (const x of [-4.2, 4.2]) scene.add(real.m(new THREE.CylinderGeometry(.22, .22, 4.2, 12), conc, { pos: [x, 2.1, -8.5] }));  // canopy piers
    scene.add(real.box(5, 3.2, .3, real.std(0x6a5a40, { rough: .2, metal: .3, emissive: 0xffc070, ei: .7 }), { pos: [0, 1.7, -12.95] }));   // glazed entrance, lobby lit
    real.lamp(scene, [0, 3.6, -11.5], { i: 14, dist: 10, color: 0xffd8a0 });
    for (const x of [-1.25, 0, 1.25]) scene.add(real.box(.1, 3.2, .34, dark, { pos: [x, 1.7, -12.95] }));
    const signTex = real.canvasTex(1024, 192, (c, W, H) => { c.fillStyle = '#1d3f6a'; c.fillRect(0, 0, W, H); c.fillStyle = '#f0e8d0'; c.font = 'bold 78px Oswald, sans-serif'; c.textAlign = 'center'; c.fillText('GENERAL STAFF HEADQUARTERS', W / 2, 124); });
    scene.add(real.m(new THREE.PlaneGeometry(7.2, 1.35), new THREE.MeshStandardMaterial({ map: signTex, roughness: .7 }), { pos: [0, 5.4, -12.85], cast: false }));
    scene.add(real.m(new THREE.CylinderGeometry(.06, .09, 12, 8), real.std(0xd0d0d0, { metal: .8, rough: .3 }), { pos: [-8, 6, -9.5] }));          // flagpole
    const flagTex = real.canvasTex(256, 176, (c, W, H) => { c.fillStyle = '#eef0f4'; c.fillRect(0, 0, W, H); c.fillStyle = '#2b55a8'; c.fillRect(0, 22, W, 30); c.fillRect(0, H - 52, W, 30); }); // generic blue-and-white pennant
    scene.add(real.m(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshStandardMaterial({ map: flagTex, roughness: .9, side: THREE.DoubleSide }), { pos: [-7.1, 11.3, -9.5], rot: [0, .3, 0] }));
    for (const x of [-14, 12]) scene.add(real.m(new THREE.CylinderGeometry(.05, .08, 6, 6), dark, { pos: [x, 19.2, -22] }));                       // roof masts
    // parking bays painted on the forecourt
    for (let i = 0; i < 8; i++) scene.add(real.box(.12, .01, 5.5, real.std(0xe8e4d8, { rough: .9 }), { pos: [-16 + i * 4.6, .006, 3], cast: false }));
    scene.add(real.box(40, .01, .14, real.std(0xe8e4d8, { rough: .9 }), { pos: [0, .006, 5.8], cast: false }));
    for (let i = 0; i < 4; i++) { const b = block(24, 10 + i * 4, 14, 50 + i, { day: true, wall: '#c8bea4' }); b.position.set(-60 + i * 40, 0, -55); scene.add(b); }
    for (let i = 0; i < 6; i++) { const l = await real.prop('street_lamp_01'); l.position.set(-15 + i * 6, 0, -9); scene.add(l); }
    [-28, -23, -18, 18, 23, 28].forEach((x, i) => { const tr = tree(6 + (i % 3), 70 + i); tr.position.set(x, 0, -9.5 + (i % 2) * .4); scene.add(tr); });
    for (let i = 0; i < 5; i++) { const tr = tree(7, 90 + i); tr.position.set(26 + i * 5, 0, 6 - i * 3); scene.add(tr); }
    const cars = [S2.mercedes({ color: 0x2a2c32, lights: true }), S2.mercedes({ color: 0x4a4c48, lights: true }), S2.landrover({ lights: true })]; cars.forEach(c => { c.rotation.y = P; scene.add(c); });
    const cam = C.dolly(camera, { pos: [16, 12, 20], look: [0, 3, -12], fov: 42 }, { pos: [12, 3.2, 14], look: [0, 2.2, -8], fov: 42 });
    // each car rolls up and stops in its own painted bay, short of the kerb
    return (t, u) => { cam(u); cars.forEach((c, i) => { const d = (1 - Math.pow(1 - C.seg(t, i * .9, 3.6 + i * .9), 2)) * 22; c.position.set([-4.5, .1, 4.7][i], 0, 25 - d); }); };
  },
  // Brigadier General Dan Shomron and three covered plans
  '6.2': async k => {
    const { real, scene, camera } = k;
    const boards = await easelRoom(k);
    const s = await real.human({ id: 'tb_shomron', seed: 3001 }); real.put(scene, s, { pos: [3.3, 0, -1.7], rot: -.95, mood: 'stern' }); s.userData.driven = true;
    // framed so Shomron's feet stay above the bottom caption band for the whole push-in (the subtitle otherwise flips to the top mid-shot)
    const cam = C.dolly(camera, { pos: [-.4, 1.75, 5.4], look: [.8, 1.3, -2.4], fov: 42 }, { pos: [.6, 1.7, 4.5], look: [1.4, 1.15, -2.2], fov: 40 });
    return (t, u) => { cam(u); s.update(t, { mood: 'stern', arm: t > 1.2 ? 'point' : null, talk: Math.sin(t * 1.7) > -.2, look: -.25 }); k.anchor = C.headPos(s, .4); };
  },
  // boats cross Lake Victoria toward Entebbe (old act's shot; the lake label now sits up and to the right, clear of the caption band)
  '6.3': async k => lakeMap(k, async (k, map) => {
    const boats = [0, 1, 2].map(i => { const b = TB.maps.boatIcon({ s: 3 }); k.scene.add(b); return b; });
    const a = map.proj(33.4, -1.0, .5), b = map.proj(32.5, 0.02, .5);
    return t => boats.forEach((bt, i) => { const s = TB.core.easeInOut(TB.core.seg(t, .5 + i * .3, 5 + i * .3)); bt.position.lerpVectors(a, b, s).add(new THREE.Vector3(i * 4 - 4, 0, i * 3)); bt.rotation.y = -2.4; bt.position.y = .5 + Math.sin(t * 3 + i) * .2; });
  }),
  // Lake Victoria at night: the boats far out, and eyes at the waterline
  '6.4': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    // bright moon and a strong blue fill so the water, the boats and the crocodile read from the first frame
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-60, 40, -80], sunI: .5, sunColor: 0xb8c8ff, shadowSize: 30, bg: 0x0a1020, envI: .3, exposure: 1.25 });
    scene.add(new THREE.HemisphereLight(0x8898c8, 0x202a3a, 4.2));
    const rim = new THREE.SpotLight(0xb8c8ff, 16, 14, .35, .6, 1.2); rim.position.set(-3, 3, -2); rim.target.position.set(1.2, 0, 4); scene.add(rim, rim.target);
    const fill = new THREE.PointLight(0x90a8e0, 5, 14, 1.6); fill.position.set(3, 2.5, 7); scene.add(fill);
    const moon = real.m(new THREE.SphereGeometry(9, 24, 16), new THREE.MeshBasicMaterial({ color: 0xf4f6ff, fog: false }), { pos: [-180, 120, -400], cast: false }); scene.add(moon);
    const glow = real.m(new THREE.SphereGeometry(18, 24, 16), new THREE.MeshBasicMaterial({ color: 0x8090c0, transparent: true, opacity: .1, depthWrite: false, fog: false }), { pos: [-180, 120, -400], cast: false }); scene.add(glow);
    scene.fog = new THREE.FogExp2(0x0a1020, .006);
    const wg = new THREE.PlaneGeometry(400, 400, 120, 120); wg.rotateX(-P / 2);
    const water = real.m(wg, real.std(0x1a2838, { rough: .92, metal: 0 }), { cast: false }); scene.add(water);   // matte water: the dim 'moon' sun gives only a faint sheen
    // the moon path is drawn explicitly: a narrow additive strip of broken glitter from under the moon to the foreground
    // texture v=1 is the near end: sparse short flecks there, a denser brighter band toward the horizon
    const gt = real.canvasTex(64, 4096, gx => { const r = rnd(7); for (let y = 0; y < 4096; y++) { const l = y / 4096, near = Math.min(1, l * 4);   // l = 0 at the lens, 1 under the moon
      const cw = 8 + l * 24; gx.fillStyle = `rgba(190,205,255,${(near * (.1 + .45 * l)).toFixed(3)})`; gx.fillRect(32 - cw / 2 + (r() - .5) * 6, y, cw, 1);           // soft continuous core, fading out near the lens
      if (r() < .08 + l * .7) { const w = 4 + r() * 8 + l * 26, h = 1 + Math.floor(r() * 3); gx.fillStyle = `rgba(222,230,255,${((.2 + .8 * near) * (.4 + r() * .6)).toFixed(3)})`; gx.fillRect(32 - w / 2 + (r() - .5) * 16, y, w, h); } } });   // broken glitter: sparse glints near, a dense band far out
    // a trapezoid: .9 m wide at the lens, ~20 m wide under the moon, so on screen it stays a slim path all the way out
    const gl = 420, gg = new THREE.PlaneGeometry(.9, gl, 1, 40); gg.rotateX(-P / 2); gg.translate(0, 0, gl / 2);
    { const pa = gg.attributes.position; for (let i = 0; i < pa.count; i++) pa.setX(i, pa.getX(i) * (1 + pa.getZ(i) / gl * 22)); pa.needsUpdate = true; }
    const glit = real.m(gg, new THREE.MeshBasicMaterial({ map: gt, color: 0xd0dcff, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }), { pos: [1.5, .11, 4], cast: false });
    glit.lookAt(-180, .11, -400); scene.add(glit);
    const base = wg.attributes.position.array.slice();
    // open boats: planked hull with a gunwale rail, thwarts, an outboard on the transom and seated men in dark kit
    const boats = [0, 1, 2].map(i => { const b = new THREE.Group(); const hull = real.std(0x2a3034, { rough: .6 }), rail = real.std(0x4a4036, { rough: .7 }), kit = real.std(0x14181a, { rough: .9 }), skinM = real.std(0x7a6048, { rough: .8 });
      b.add(real.rbox(1.6, .5, 4.4, .22, hull, { pos: [0, .22, 0] }));
      b.add(real.m(new THREE.ConeGeometry(.8, 1.2, 4), hull, { pos: [0, .3, 2.6], rot: [P / 2, P / 4, 0], scale: [1, 1, .55] }));           // bow
      for (const s of [-1, 1]) b.add(real.box(.08, .08, 4.4, rail, { pos: [s * .8, .5, 0] }));                                              // gunwale
      b.add(real.box(1.6, .08, .08, rail, { pos: [0, .5, -2.2] }));
      for (let j = 0; j < 3; j++) b.add(real.box(1.5, .05, .25, rail, { pos: [0, .38, -1.4 + j * 1.1] }));                               // thwarts
      b.add(real.box(.3, .45, .3, kit, { pos: [0, .65, -2.35] })); b.add(real.m(new THREE.CylinderGeometry(.04, .04, .6, 8), kit, { pos: [0, .15, -2.4] })); // outboard
      for (let j = 0; j < 5; j++) { const x = (j % 2 - .5) * .7, z = -1.5 + j * .62; b.add(real.rbox(.42, .7, .36, .1, kit, { pos: [x, .72, z] })); b.add(real.m(new THREE.SphereGeometry(.13, 12, 10), skinM, { pos: [x, 1.18, z] })); b.add(real.rbox(.3, .12, .3, .05, kit, { pos: [x, 1.25, z] })); }
      b.position.set(-11 + i * 6.5, 0, -30 - i * 6); b.rotation.y = .5; scene.add(b); return b; });
    // crocodile: long snout, brow ridges with eyes, nostril bumps, a line of scutes along the back and a tapering tail
    const croc = new THREE.Group(); const skin = real.std(0x26381a, { rough: .97, metal: 0 }), belly = real.std(0x344622, { rough: .95, metal: 0 }), back = real.std(0x1a2610, { rough: 1, metal: 0 });
    const head = real.m(new THREE.SphereGeometry(.5, 24, 12), skin); head.scale.set(.5, .2, 1.1); croc.add(head);
    const snout = real.m(new THREE.CylinderGeometry(.16, .24, 1.0, 10), belly, { pos: [0, -.02, -.9], rot: [P / 2, 0, 0], scale: [1.3, 1, .55] }); croc.add(snout);
    for (const s of [-1, 1]) { croc.add(real.m(new THREE.SphereGeometry(.1, 16, 10), skin, { pos: [s * .15, .1, .25] })); croc.add(real.m(new THREE.SphereGeometry(.04, 12, 8), real.std(0xd8b050, { rough: .2, emissive: 0xb08a30, ei: 1.6 }), { pos: [s * .15, .15, .32] })); }
    for (const s of [-1, 1]) croc.add(real.m(new THREE.SphereGeometry(.035, 10, 8), skin, { pos: [s * .05, .08, -1.36] }));
    const body = real.m(new THREE.SphereGeometry(.5, 20, 12), back, { pos: [0, -.08, 1.3], scale: [.75, .3, 1.8] }); croc.add(body);
    for (let i = 0; i < 9; i++) { const z = .5 + i * .22; for (const s of [-.45, .45]) croc.add(real.m(new THREE.ConeGeometry(.028, .065, 4), back, { pos: [s * (.28 - i * .012), .06, z] })); }
    const tail = real.m(new THREE.CylinderGeometry(.04, .2, 1.8, 8), back, { pos: [0, -.05, 3.1], rot: [P / 2, 0, 0], scale: [1.2, 1, .7] }); croc.add(tail);
    for (let i = 0; i < 6; i++) croc.add(real.m(new THREE.ConeGeometry(.03, .09 - i * .01, 4), skin, { pos: [0, .07 - i * .012, 2.4 + i * .28] }));
    croc.scale.setScalar(.85); croc.position.set(.5, -.3, 2.4); croc.rotation.y = P - .95; scene.add(croc);   // side-on to the lens, 3.5 m off, so snout, back and tail all read
    const cam = C.dolly(camera, { pos: [3.0, .6, 7.2], look: [-4, .2, -40], fov: 40 }, { pos: [2.3, .8, 5.9], look: [.4, -.05, 2.4], fov: 34 });
    const dur = k.meta.seconds;
    return (t, u) => { cam(u);
      const pa = wg.attributes.position; for (let i = 0; i < pa.count; i++) { const x = base[i * 3], z = base[i * 3 + 2]; pa.array[i * 3 + 1] = Math.sin(x * .35 + t * 1.3) * .05 + Math.sin(z * .5 - t * 1.1) * .04; } pa.needsUpdate = true; wg.computeVertexNormals();
      croc.position.y = -.3 + C.ease(C.seg(t, .8, 2.2)) * .36; croc.position.z = 2.4 - t * .05; tail.rotation.y = Math.sin(t * 1.5) * .15;
      boats.forEach((b, i) => { b.position.y = Math.sin(t * 1.2 + i) * .06; b.rotation.z = Math.sin(t * 1.0 + i) * .03; });
      const s = C.ease(C.seg(t, dur - 1.6, dur - 1.3)); if (s > 0) { const o = k.overlay; o.save(); o.globalAlpha = s; o.translate(1420, 230); o.rotate(-.07); o.scale(1 + (1 - s) * .5, 1 + (1 - s) * .5); o.strokeStyle = '#d2232a'; o.lineWidth = 10; o.strokeRect(-260, -70, 520, 140); o.fillStyle = '#d2232a'; o.font = '64px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('PLAN 1 REJECTED', 0, 4); o.restore(); } };
  },
  // plan two: paratroopers over the airport at night
  '6.5': async k => {
    const { real, scene, camera } = k;
    await night(k);
    await S2.runwayNight(k, { lit: true, grass: 0x6a7a58 });
    S2.entebbeOld(k, { pos: [-60, 0, -40], rotY: P / 2, litRow: 0, towerLit: true });
    const canopy = real.std(0xc8c4a8, { rough: .8, mat: { side: THREE.DoubleSide } });
    const moonD = new THREE.DirectionalLight(0x9ab0e0, 1.2); moonD.position.set(40, 80, 60); scene.add(moonD);
    const chutes = [];
    // canopy with gores, a ring of heavy shroud lines (thick enough to read from 100 m), and a jumper with pack and legs below; the stick drops over the grass east of the terminal, never over its roof
    for (let i = 0; i < 12; i++) { const g = new THREE.Group(); g.add(real.m(new THREE.SphereGeometry(3.2, 20, 8, 0, P * 2, 0, P / 2.6), canopy));
      for (let j = 0; j < 12; j++) { const a = j / 12 * P * 2; g.add(real.box(.04, 3.3, .04, real.std(0x6a5a40, { rough: .9 }), { pos: [Math.cos(a) * 3.28, -.9, Math.sin(a) * 3.28], rot: [0, -a, 0] })); }
      for (let j = 0; j < 8; j++) { const a = j / 8 * P * 2; const l = real.box(.07, 4.4, .07, real.std(0xe8e4d8, { rough: .9 }), { pos: [Math.cos(a) * 1.4, -1.6, Math.sin(a) * 1.4] }); l.rotation.set(Math.sin(a) * .5, 0, -Math.cos(a) * .5); g.add(l); }
      const kit = real.std(0x2a2c20, { rough: .9 }); g.add(real.rbox(.6, 1.0, .45, .12, kit, { pos: [0, -4.3, 0] })); g.add(real.rbox(.5, .5, .3, .1, real.std(0x3a3828, { rough: .9 }), { pos: [0, -4.4, -.35] }));
      g.add(real.m(new THREE.SphereGeometry(.24, 12, 10), real.std(0x4a4a3a, { rough: .7 }), { pos: [0, -3.65, 0] }));
      for (const s of [-1, 1]) { g.add(real.box(.22, .9, .22, kit, { pos: [s * .16, -5.2, .1], rot: [.3, 0, 0] })); g.add(real.box(.18, .8, .18, kit, { pos: [s * .42, -4.1, .25], rot: [-.5, 0, s * .4] })); }
      g.position.set(14 + (i % 4) * 9 + (i * 7 % 3), 160 - Math.floor(i / 4) * 18, -2 + Math.floor(i / 4) * 14 + (i % 3) * 3); g.userData.y0 = g.position.y; scene.add(g); chutes.push(g); }
    return (t, u) => { camera.position.set(34, 205 - t * 7, 58); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(-12, 40, -12); chutes.forEach((c, i) => { c.position.y = c.userData.y0 - t * 9; c.rotation.z = Math.sin(t * .8 + i) * .08; c.rotation.y = t * .1 + i; }); };
  },
  // plan three: commandos hidden inside a passenger jet
  '6.6': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: false, bg: 0x0a0c10, envI: .4 });
    const cb = await sets.cabin(k, { len: 14, lampI: 8, hemi: 1.1 });
    // eight different heads spread across the rows, with varied arms, caps on some, and each man's own lean and glance
    const CAST = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_yoni', 'tb_medic', 'tb_off1', 'tb_off2', 'tb_gen2'];
    const ppl = await C.fillCabin(k, cb, { skip: s => ((s.row * 5 + s.col * 3) % 9 === 2), pick: (s, i) => CAST[(s.row * 5 + s.col * 3 + i) % CAST.length], mood: 'stern', arm: 'lap' });
    const over = {};
    ppl.forEach((p, i) => { const v = (i * 7) % 5; over[p.uuid] = { arm: ['lap', 'hold', 'lap', 'lap', 'hold'][v], look: [0, .35, -.3, .15, -.15][v], nod: [0, .3, -.15, .2, .05][v], mood: v === 3 ? 'calm' : 'stern' };
      p.rotation.y += [0, .12, -.1, .06, -.14][v]; p.rotation.z = [0, .04, -.03, 0, .02][v];
      if (i % 3 === 1) C.attach(p, S2.cap(0x3a4228), 'Head', [0, .15, .01]); });
    const cam = C.dolly(camera, { pos: [0, 1.65, 6.6], look: [0, 1.15, -4], fov: 50 }, { pos: [0, 1.6, 3.6], look: [0, 1.1, -5], fov: 50 });
    return (t, u) => { cam(u); C.idleSeated(ppl, t, over); };
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
    papers(scene, 7, -1.2, 1.2, -.8, .8, top + .001, 17);
    // dressed table: telephone, notepads, a pencil and a glass, so the opening frame is not an empty slab
    const ph = rotary(); ph.g.position.set(-.4, top, -.3); ph.g.rotation.y = .4; scene.add(ph.g);
    const pads = await real.prop('office_notepads'); pads.position.set(.4, top, -.28); pads.rotation.y = -.5; scene.add(pads);
    scene.add(real.m(new THREE.CylinderGeometry(.004, .004, .18, 6), real.std(0xd8b040, { rough: .5 }), { pos: [.3, top + .004, .25], rot: [0, .9, P / 2] }));
    scene.add(real.m(new THREE.CylinderGeometry(.035, .03, .09, 16), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, transmission: .9, thickness: .02, transparent: true, opacity: .6 }), { pos: [.45, top + .045, .3] }));
    const tt = real.canvasTex(1000, 700, (c, W, H) => { c.fillStyle = '#efe4c4'; c.fillRect(0, 0, W, H); c.fillStyle = '#1d1712'; c.font = 'bold 70px "Oswald", sans-serif'; c.fillText('TELEGRAM', 50, 100); c.fillRect(50, 120, W - 100, 5);
      c.font = 'bold 40px "Courier New", monospace'; c.fillText('TO: THE HIJACKERS, ENTEBBE', 60, 200); c.fillText('VIA: FRENCH GOVERNMENT', 60, 250); c.font = 'bold 74px "Courier New", monospace'; c.fillText('WE ACCEPT.', 60, 390); c.fillText('NEED MORE TIME.', 60, 480); c.font = 'bold 36px "Courier New", monospace'; c.fillText('1 JULY 1976', 60, 620); });
    const tg = real.m(new THREE.PlaneGeometry(.42, .294), new THREE.MeshStandardMaterial({ map: tt, roughness: .9 }), { rot: [-P / 2, 0, 0], cast: false }); scene.add(tg);
    const cam = C.dolly(camera, { pos: [.0, 1.25, .75], look: [0, top, -.02], fov: 40 }, { pos: [0, 1.0, .42], look: [0, top, -.03], fov: 38 });
    return (t, u) => { cam(u); const s = C.ease(C.seg(t, .0, 1.2)); tg.position.set((1 - s) * -.9, top + .004, (1 - s) * .3); tg.rotation.z = (1 - s) * .6; };
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
    // briefcase in the left hand: he walks toward -x with the camera on his +z side, so the left hand is the one the camera sees
    const bc = new THREE.Group(); bc.add(real.rbox(.45, .33, .1, .02, real.std(0x3a2414, { rough: .4 }))); bc.add(real.box(.12, .03, .02, real.std(0x222222), { pos: [0, .19, 0] })); for (const x of [-.17, .17]) bc.add(real.box(.03, .33, .11, real.std(0x8a7a40, { metal: .8, rough: .3 }), { pos: [x, 0, 0] })); C.attach(a, bc, 'LeftHand', [0, -.2, .02], [0, 0, -P / 2]);
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
    // push-in ends on the title block (blueprint x .38..76, z .28..46), framed in the middle of the picture so the caption band never covers it
    const cam = C.dolly(camera, { pos: [.1, 1.7, 1.25], look: [0, top, -.05], fov: 44 }, { pos: [.42, 1.3, .95], look: [.44, top, .3], fov: 40 });
    return (t, u) => { cam(u); const s = Math.max(.01, C.ease(C.seg(t, .3, 2.6))); sheet.scale.x = W * s; sheet.position.set(x0 + W * s / 2, top + .002, 0); bp.repeat.set(s, 1); bp.offset.x = 0; roll.position.set(x0 + W * s + .04, top + .04, 0); roll.rotation.y = 0; roll.visible = s < .995; };
  },
  // the blueprint lines rise into a model of the terminal
  '6.13': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x040507, envI: .2 });
    scene.add(new THREE.HemisphereLight(0xfff0d8, 0x1a1612, .3));
    const top = deskTop(scene, 3.2, 2);
    // the model rises straight off the 6.12 sheet: every wall is extruded from its blueprint outline (x = px/1000 - .8, z = py/1000 - .5)
    const bpt = blueprintTex(); const bp = real.m(new THREE.PlaneGeometry(1.6, 1), new THREE.MeshStandardMaterial({ map: bpt, roughness: .85, emissive: 0xffffff, emissiveMap: bpt, emissiveIntensity: .35 }), { pos: [0, top + .002, 0], rot: [-P / 2, 0, 0], cast: false }); scene.add(bp);
    const model = new THREE.Group(); model.position.set(0, top + .003, 0); scene.add(model);
    const mat = new THREE.MeshStandardMaterial({ color: 0xcfe4ff, roughness: .3, transparent: true, opacity: .3, emissive: 0x3a7ad0, emissiveIntensity: .5, depthWrite: false });
    const lineM = new THREE.LineBasicMaterial({ color: 0xbfe0ff });
    const part = (w, h, d, x, z) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); const e = new THREE.LineSegments(new THREE.EdgesGeometry(b.geometry), lineM); g.add(b, e); g.position.set(x, h / 2, z); model.add(g); return g; };
    const X = px => px / 1000 - .8, Z = py => py / 1000 - .5, H = .12, T = .012;
    // main block outline 120..1320 x 220..640: floor slab, four outer walls
    part(1.2 + T, .006, .42 + T, X(720), Z(430));
    part(1.2, H, T, X(720), Z(220)); part(1.2, H, T, X(720), Z(640)); part(T, H, .42, X(120), Z(430)); part(T, H, .42, X(1320), Z(430));
    // interior partitions: the three cross walls at 400/700/1000 and the VIP lounge wall at y 430
    for (const px of [400, 700, 1000]) part(T, H, .42, X(px), Z(430));
    part(.28, H, T, X(260), Z(430));
    // roof slab, then the tower on its own outline 1180..1320 x 120..220, butted against the main block's north wall
    part(1.2 + T, .006, .42 + T, X(720), Z(430)).position.y = H + .003;
    part(.14, .3, .1, X(1250), Z(170)); part(.17, .05, .13, X(1250), Z(170)).position.y = .31; part(.19, .01, .15, X(1250), Z(170)).position.y = .36;
    // canopy posts along the apron edge (the heavy ticks at y 640)
    for (let px = 180; px < 1300; px += 80) part(.016, .09, .016, X(px), Z(660));
    part(1.18, .006, .06, X(730), Z(660)).position.y = .09;
    const glow = new THREE.PointLight(0x6aaaff, 3, 3, 2); glow.position.set(0, top + .4, 0); scene.add(glow);
    return (t, u) => { const s = C.ease(C.seg(t, .2, 2.6)); model.scale.set(1, Math.max(.001, s), 1);
      const a = -.6 + u * 1.4; camera.position.set(Math.sin(a) * 1.3, top + .5 + .15 * (1 - u), Math.cos(a) * 1.3); camera.fov = 38; camera.updateProjectionMatrix(); camera.lookAt(0, top + .08, 0); };
  },
  // night training: commandos run through a wood-and-canvas copy of the terminal
  '6.14': async k => {
    const { real, scene, camera } = k;
    await night(k);
    // night ground haze and a faint glow along the horizon, so the sky is not a hard black wall behind the mock-up
    scene.fog = new THREE.FogExp2(0x0c1220, .007); hazeBand(scene, { color: 0x1a2340, r: 700, h: 160, clear: .28 });
    const grass = await real.pbr('grass_path_2', { repeat: [60, 60] }); scene.add(real.m(new THREE.PlaneGeometry(300, 300), grass, { rot: [-P / 2, 0, 0], cast: false }));
    scene.add(real.m(new THREE.PlaneGeometry(3000, 3000), real.std(0x2a2e22, { rough: .95 }), { pos: [0, -.03, 0], rot: [-P / 2, 0, 0], cast: false }));
    const wood = real.std(0x6a5034, { rough: .8 }), canvas = real.std(0xc8bca0, { rough: .95, mat: { side: THREE.DoubleSide } });
    for (let x = -12; x <= 12; x += 3) { scene.add(real.box(.15, 3.2, .15, wood, { pos: [x, 1.6, -3] })); if (x < 12 && Math.abs(x) % 6 !== 0) scene.add(real.m(new THREE.PlaneGeometry(3, 3), canvas, { pos: [x + 1.5, 1.5, -3] })); }
    scene.add(real.box(24.2, .15, .15, wood, { pos: [0, 3.2, -3] }));
    for (const x of [-14, 14]) { const l = new THREE.SpotLight(0xfff0d0, 400, 60, .5, .5, 1.3); l.position.set(x, 8, 6); l.target.position.set(0, 0, -2); l.castShadow = true; scene.add(l, l.target); }
    const men = [];
    // six different faces; each rifle is a dark shape held in the hands (two-hand carry, as the act 8 sentries), caps on half of them
    const RUN = ['tb_cmd1', 'tb_cmd2', 'tb_cmd3', 'tb_yoni', 'tb_medic', 'tb_off1'];
    for (let i = 0; i < 6; i++) { const p = await real.human({ id: RUN[i], seed: 3200 + i }); real.put(scene, p, { pos: [-16 - i * 1.6, 0, 0], rot: P / 2, mood: 'stern', arm: 'hold' }); p.userData.driven = true; C.attach(p, rifleShape(), 'RightHand', [0, -.02, .25], [0, 0, 0]); if (i % 2) C.attach(p, S2.cap(0x3a4228), 'Head', [0, .15, .01]); men.push(p); }
    const run = 3.4;
    return (t, u) => { men.forEach((p, i) => { const sp = run * (1 + ((i * 7) % 5 - 2) * .025); const x = -16 - i * 1.6 + t * sp; const door = [-6, 0, 6].find(dx => x > dx - 1 && x < dx + 1.5);
        p.position.set(x, 0, door !== undefined && i % 2 ? -.6 : 0); p.update(t, { pose: 'run', dist: t * sp * .55 + i * .53, arm: 'hold', mood: 'stern', look: Math.sin(t * .9 + i * 2) * .15 }); });
      const cx = -14 + t * run; camera.position.set(cx + 1.5, 1.5, 7); camera.fov = 44; camera.updateProjectionMatrix(); camera.lookAt(cx + 1, 1.2, -1); };
  },
  // the final plan: four planes land, teams fan out, everyone flies home
  '6.15': async k => {
    const { scene, camera } = k; k.noAutoOverlay = true;
    await night(k);
    await S2.runwayNight(k, { lit: true, grass: 0x6a7a58 });
    S2.entebbeOld(k, { pos: [-70, 0, -60], rotY: P / 2, litRow: 0, towerLit: true });
    // fighter line: dark concrete pads with a delta-wing jet parked on each, so the MiG arrow has something to point at
    for (let i = 0; i < 7; i++) { scene.add(real.box(14, .08, 14, real.std(0x3a3c3a, { rough: .9 }), { pos: [-55, .02, 56 + i * 16], cast: false })); if (i < 5) { const j = migJet(); j.position.set(-55, 0, 56 + i * 16); j.rotation.y = P / 2 + .15 + (i % 2) * .1; scene.add(j); } }
    const planes = [0, 1, 2, 3].map(() => { const p = S2.c130(); scene.add(p); return p; });
    const D = k.meta.seconds;
    const targets = [['TERMINAL', [-62, 4, -60]], ['TOWER', [-62, 14, -95]], ['MiG FIGHTERS', [-55, 2, 88]], ['RUNWAY', [10, 0, 160]]];
    return (t, u) => { camera.position.set(140, 190, 140 - u * 30); camera.fov = 42; camera.updateProjectionMatrix(); camera.lookAt(-20, 0, 0);
      planes.forEach((p, i) => { const land = C.ease(C.seg(t, i * .7, 3 + i * .7)); const leave = C.ease(C.seg(t, D - 2.6 + i * .2, D)); const z = -500 + land * (480 - i * 38) + leave * 600; p.position.set(i % 2 ? 6 : -6, Math.max(0, (1 - land) * 60) + leave * 50, z); p.rotation.x = -(1 - land) * .05 - leave * .15; p.userData.setProps(t, [18, 18, 18, 18]); });
      const o = k.overlay; targets.forEach(([lab, v], i) => { const s = C.ease(C.seg(t, 3.6 + i * .8, 4.6 + i * .8)) * (1 - C.seg(t, D - 2.6, D - 2)); if (s <= 0) return; const p0 = proj(camera, [planes[i].position.x, 0, planes[i].position.z]), p1 = proj(camera, v);
        const x = p0[0] + (p1[0] - p0[0]) * s, y = p0[1] + (p1[1] - p0[1]) * s; o.save(); o.strokeStyle = '#e8b321'; o.fillStyle = '#e8b321'; o.lineWidth = 8; o.lineCap = 'round'; o.beginPath(); o.moveTo(...p0); o.lineTo(x, y); o.stroke();
        const a = Math.atan2(y - p0[1], x - p0[0]); o.translate(x, y); o.rotate(a); o.beginPath(); o.moveTo(10, 0); o.lineTo(-18, -14); o.lineTo(-18, 14); o.closePath(); o.fill(); o.restore();
        if (s > .9) { o.save(); o.font = '34px "Anton"'; o.textAlign = 'center'; o.lineWidth = 7; o.strokeStyle = '#1d1712'; o.strokeText(lab, x, y - 30); o.fillStyle = '#f4ead3'; o.fillText(lab, x, y - 30); o.restore(); } }); };
  },
  // lightning bolt emblem flashes across the map (old act's shot; ISRAEL label offset right with a leader line so the polygon, dot and route no longer cover it; the map sits higher so UGANDA clears the caption band)
  '6.16': async k => TB.mapShot(k, {
    center: [33.5, 16], span: [34, 38], labels: [['ISRAEL', 40.2, 31.6], ['UGANDA', 30.7, 3.3], ['KENYA', 38.6, 2.6]], highlight: ['ISR', 'UGA'], cities: ['TEL AVIV', 'ENTEBBE'],
    route: [[34.8, 31.9], [34.6, 29.6], [36.6, 24.5], [38.4, 19.5], [41.5, 13.5], [40.5, 8], [36.4, 2], [33.5, .2], [32.44, 0.05]], routeStart: .05, routeEnd: .5,
    cam: { from: [0, 236, 112], to: [0, 212, 98], look: [0, 0, 22], lookTo: [0, 0, 26] },
    extra: async (k, map) => { k.scene.add(leader(map, [37.8, 31.6], [35.6, 31.3]));
      return t => { const x = k.overlay; const fl = t > 2.2 && t < 2.6 ? 1 - (t - 2.2) / .4 : 0; if (fl) { x.fillStyle = `rgba(240,240,255,${fl * .6})`; x.fillRect(0, 0, 1920, 1080); }
        if (t > 2.2) { const p = new Path2D(); p.moveTo(10, -80); p.lineTo(-38, 8); p.lineTo(-4, 8); p.lineTo(-20, 80); p.lineTo(40, -14); p.lineTo(6, -14); p.lineTo(24, -80); p.closePath(); x.save(); x.translate(1020, 540); x.scale(3 * TB.core.pop(t, 2.2, .3), 3 * TB.core.pop(t, 2.2, .3)); x.fillStyle = '#e8b321'; x.strokeStyle = '#2b1e16'; x.lineWidth = 6; x.fill(p); x.stroke(p); x.restore(); } }; },
  }),
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
      // four C-130 silhouettes climbing away in loose trail, each banking a little differently: fuselage, swept wing with four nacelles, tailplane and fin
      for (let i = 0; i < 4; i++) { const x = 150 + i * 160 + t * 30, y = 380 - i * 40 - t * 22; const s = .95 - i * .08; cx.save(); cx.translate(x, y); cx.rotate(-.3 + Math.sin(t * .6 + i * 1.3) * .12 + (i % 2 ? .1 : -.08)); cx.scale(s, s * .78); cx.fillStyle = '#1d1712';
        cx.beginPath(); cx.ellipse(0, 0, 30, 5.5, 0, 0, P * 2); cx.fill();                                   // fuselage
        cx.beginPath(); cx.moveTo(8, -2); cx.lineTo(-2, -38); cx.lineTo(-10, -38); cx.lineTo(-9, -2); cx.lineTo(-10, 38); cx.lineTo(-2, 38); cx.closePath(); cx.fill();   // wing
        cx.beginPath(); cx.moveTo(-22, -1); cx.lineTo(-29, -13); cx.lineTo(-33, -13); cx.lineTo(-32, 13); cx.lineTo(-29, 13); cx.lineTo(-22, 1); cx.closePath(); cx.fill(); // tailplane
        cx.fillRect(-34, -3, 9, 6); cx.beginPath(); cx.moveTo(-24, -2); cx.lineTo(-34, -16); cx.lineTo(-36, -2); cx.closePath(); cx.fill();                                 // fin
        for (const w of [-30, -17, 17, 30]) { cx.fillRect(-4, w - 2.2, 16, 4.4); cx.beginPath(); cx.arc(12, w, 2.6, 0, P * 2); cx.fill(); }                             // nacelles
        cx.restore(); }
      wt.needsUpdate = true; };
  },
};
