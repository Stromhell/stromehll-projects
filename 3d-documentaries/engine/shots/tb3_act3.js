// Operation Thunderbolt · Act 3 · IDI AMIN'S AIRPORT — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
import { shots as old } from './tb_act3.js';
const { THREE, sets, P } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
const UG = ['tb_ug1', 'tb_ug2', 'tb_ug3'];
// rifles are only ever dark shapes, carried slung or held low
function rifleShape() { const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ color: 0x101010, roughness: .6, metalness: .3 }); g.add(new THREE.Mesh(new THREE.BoxGeometry(.04, .07, .95), mt)); const st = new THREE.Mesh(new THREE.BoxGeometry(.04, .12, .25), mt); st.position.set(0, -.03, -.5); g.add(st); g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g; }
async function soldier(k, i, pos, rot, o = {}) {
  const p = await k.real.human({ id: UG[i % 3], seed: 600 + i }); k.real.put(k.scene, p, { pos, rot, mood: o.mood ?? 'stern' }); p.userData.driven = true;
  C.attach(p, S2.cap(0x4a4630, i % 2 === 0), 'Head', [0, .14, .01]);
  if (o.rifle !== false) C.attach(p, rifleShape(), 'Spine2', [.12, .05, -.18], [.9, 0, .3]);
  return p;
}
async function night(k, o = {}) {
  const { real, scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: o.moon ?? [-40, 60, -30], sunI: o.moonI ?? 2.4, sunColor: 0xa8bcff, shadowSize: o.shadowSize ?? 50, bg: 0x04050b, envI: o.envI ?? .28, exposure: 1.1 });
  scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, o.hemi ?? .8));
}
function flood(scene, pos, target, i = 400) { const s = new THREE.SpotLight(0xfff2d8, i, 120, .5, .5, 1.3); s.position.set(...pos); s.target.position.set(...target); s.castShadow = true; s.shadow.mapSize.set(2048, 2048); s.shadow.radius = 4; scene.add(s, s.target);
  const pole = C.real.m(new THREE.CylinderGeometry(.12, .16, pos[1], 8), C.real.std(0x3a3a3a)); pole.position.set(pos[0], pos[1] / 2, pos[2]); scene.add(pole);
  const head = C.real.m(new THREE.BoxGeometry(1.2, .6, .4), C.real.std(0xffffff, { emissive: 0xfff2d8, ei: 3 })); head.position.set(...pos); head.lookAt(...target); scene.add(head); return s; }
async function hostagesOnMats(k, h, every = 2) {
  const ppl = [];
  for (let i = 0; i < h.mats.length; i += every) { const mt = h.mats[i]; const p = await k.real.human({ id: C.PAX[(i * 3) % 10], seed: 700 + i }); k.real.put(k.scene, p, { pos: [mt.x, 0, mt.z], rot: mt.z > 0 ? P : 0, pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: 'worried' }); p.userData.driven = true; ppl.push(p); }
  return ppl;
}
const idleMats = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: o.mood ?? 'worried', look: (o.look ?? 0) + Math.sin(t * .3 + i) * .15, nod: o.nod ?? .2 }));

export const shots = {
  // Amin, lit from below like a statue; medals on his chest
  '3.1': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x060505, envI: .1 });
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const gold = real.std(0xd4a640, { metal: 1, rough: .25 }), rib = [0xc0392b, 0x2a6a3a, 0xe8b321, 0x1f4fa8];
    for (let i = 0; i < 8; i++) { const md = new THREE.Group(); md.add(real.box(.035, .02, .006, real.std(rib[i % 4]), { pos: [0, .02, 0] })); md.add(real.m(new THREE.CylinderGeometry(.013, .013, .005, 12), gold, { pos: [0, -.008, 0], rot: [P / 2, 0, 0] })); C.attach(a, md, 'Spine2', [-.12 + (i % 4) * .042, .06 - Math.floor(i / 4) * .06, .13]); }
    const under = new THREE.SpotLight(0xffd8a8, 40, 8, .45, .6, 1.3); under.position.set(0, .2, 1.6); under.target.position.set(0, 1.6, 0); under.castShadow = true; scene.add(under, under.target);
    const rim = new THREE.SpotLight(0x8aa0ff, 60, 8, .4, .6, 1.2); rim.position.set(-1.5, 3, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
    scene.add(real.m(new THREE.PlaneGeometry(8, 6), real.std(0x1a1614, { rough: .95 }), { pos: [0, 3, -2.5], cast: false }));
    const cam = C.dolly(camera, { pos: [0, 1.1, 4.6], look: [0, 1.55, 0], fov: 34 }, { pos: [0, 1.2, 3.3], look: [0, 1.62, 0], fov: 32 });
    return (t, u) => { cam(u); a.update(t, { mood: 'smug', look: Math.sin(t * .3) * .08 }); const [x, y] = proj(camera, C.headPos(a, .4)); ui.callout(k.overlay, 'IDI AMIN', 'PRESIDENT OF UGANDA', Math.min(1500, x + 420), Math.max(240, y + 60), t, .9); };
  },
  // the real-look Amin, newspaper front pages from 1972-76 circling him
  '3.2': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'brown_photostudio_02', { sun: false, bg: 0x070606, envI: .18 });
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [0, 0, 0], mood: 'smug' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .2, -.01]);
    const gold = real.std(0xd4a640, { metal: 1, rough: .25 }), rib = [0xc0392b, 0x2a6a3a, 0xe8b321, 0x1f4fa8];
    for (let i = 0; i < 8; i++) { const md = new THREE.Group(); md.add(real.box(.035, .02, .006, real.std(rib[i % 4]), { pos: [0, .02, 0] })); md.add(real.m(new THREE.CylinderGeometry(.013, .013, .005, 12), gold, { pos: [0, -.008, 0], rot: [P / 2, 0, 0] })); C.attach(a, md, 'Spine2', [-.12 + (i % 4) * .042, .06 - Math.floor(i / 4) * .06, .13]); }
    const heads = [['THE DAILY NEWS', 'AMIN EXPELS UGANDA\'S ASIANS', '90 DAYS TO LEAVE', 'AUG 1972'], ['WORLD TRIBUNE', 'UGANDA BREAKS WITH ISRAEL', 'Advisers ordered out', 'MAR 1972'],
      ['THE EVENING POST', 'BRITAIN CUTS AID TO UGANDA', 'Relations at new low', 'DEC 1972'], ['AFRICA HERALD', 'AMIN NAMED PRESIDENT FOR LIFE', 'Kampala parade', 'JUNE 1976']];
    const papers = heads.map(([mast, h1, h2, dt], i) => {
      const tex = real.canvasTex(800, 1040, c => { c.fillStyle = '#ece4d0'; c.fillRect(0, 0, 800, 1040); c.fillStyle = '#1a1612'; c.font = 'bold 64px "Times New Roman", serif'; c.textAlign = 'center'; c.fillText(mast, 400, 90);
        c.fillRect(40, 110, 720, 4); c.font = '22px serif'; c.fillText(dt + '  ·  PRICE 10 CENTS', 400, 140); c.fillRect(40, 155, 720, 2);
        c.font = 'bold 76px Anton, Oswald, sans-serif'; const words = h1.split(' '); let line = '', y = 250; for (const w of words) { if ((line + w).length > 14) { c.fillText(line.trim(), 400, y); y += 84; line = ''; } line += w + ' '; } c.fillText(line.trim(), 400, y);
        c.font = 'italic 34px serif'; c.fillText(h2, 400, y + 60); c.fillStyle = '#8a8274'; c.fillRect(60, y + 100, 330, 300);
        c.fillStyle = '#3a342c'; for (let r = 0; r < 26; r++) { c.fillRect(420, y + 100 + r * 12, 320, 4); if (y + 420 + r * 12 < 1000) c.fillRect(60, y + 420 + r * 12, 680, 4); }
        c.fillStyle = 'rgba(120,100,60,.15)'; for (let q = 0; q < 60; q++) c.fillRect((q * 131) % 800, (q * 293) % 1040, 40, 3); });
      const pl = real.m(new THREE.PlaneGeometry(.62, .8), new THREE.MeshStandardMaterial({ map: tex, roughness: .85, side: THREE.DoubleSide }), { cast: true }); scene.add(pl); return pl; });
    const key = new THREE.SpotLight(0xffe2c0, 70, 10, .5, .5, 1.3); key.position.set(1.6, 3.2, 2.4); key.target.position.set(0, 1.4, 0); key.castShadow = true; scene.add(key, key.target);
    const rim = new THREE.SpotLight(0x8aa0ff, 60, 8, .4, .6, 1.2); rim.position.set(-1.5, 3, -2); rim.target.position.set(0, 1.5, 0); scene.add(rim, rim.target);
    scene.add(real.m(new THREE.PlaneGeometry(30, 30), real.std(0x141210, { rough: .9 }), { rot: [-P / 2, 0, 0], cast: false }));
    const cam = C.orbit(camera, [0, 1.4, 0], 3.6, 1.55, -.35, .35, 38, [0, 1.45, 0]);
    return (t, u) => { cam(u); a.update(t, { mood: 'smug', look: Math.sin(t * .3) * .1, talk: false });
      papers.forEach((pl, i) => { const ang = t * .45 + i * P / 2, r = 1.55, y = 1.05 + i * .22 + Math.sin(t * .8 + i) * .05; pl.position.set(Math.sin(ang) * r, y, -.35 - Math.abs(Math.cos(ang)) * 1.1); /* papers sweep behind and beside Amin, never in front of him */ pl.lookAt(camera.position); pl.rotateZ(Math.sin(t + i) * .08); }); };
  },
  '3.3': old['3.3'],
  '3.4': old['3.4'],
  // 03:15, Flight 139 touches down at Entebbe with its landing lights on
  '3.5': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 1.6 });
    await S2.runwayNight(k, { lit: true, len: 1600 });
    const jet = await sets.a300(); scene.add(jet);
    const ll = new THREE.SpotLight(0xfff6e0, 900, 260, .22, .4, 1.2); ll.position.set(0, 2.2, 22); ll.target.position.set(0, 0, 80); jet.add(ll, ll.target);
    const dur = k.meta.seconds;
    camera.fov = 34; camera.updateProjectionMatrix(); camera.position.set(34, 1.6, 10);
    return (t, u) => {
      const s = t / dur; const z = -260 + s * 330; const h = Math.max(0, 22 * (1 - s / .55)); const flare = C.ease(C.seg(s, .35, .55));
      jet.position.set(0, h, z); jet.rotation.x = -.05 - .05 * flare + (h <= 0 ? .1 * C.seg(s, .55, .75) : 0); camera.lookAt(0, h + 4, z + 4); };
  },
  // the control tower, one window lit; nobody argues
  '3.6': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 2.4, hemi: 1.3 });
    await S2.runwayNight(k, { lit: true });
    const t0 = S2.entebbeOld(k, { pos: [0, 0, 0], lit: [...Array(48).keys()].filter(i => i % 4 === 1), towerLit: true, wall: 0xd0c8b4 });
    // apron floodlight washing the tower face, sodium lamps along the terminal
    flood(scene, [t0.W / 2 + 14, 14, 24], [t0.W / 2 - 4, 10, 0], 520);
    for (const x of [-20, 0, 20]) { const l = new THREE.PointLight(0xffb060, 40, 18, 2); l.position.set(x, 5, 12); scene.add(l); }
    // a figure at the tower glass
    const p = await real.human({ id: 'tb_ug2', seed: 830 }); real.put(scene, p, { pos: [t0.W / 2 - 4, 13.2, 1.2], rot: 0 }); p.userData.driven = true;
    const cam = C.dolly(camera, { pos: [20, 2, 40], look: [31, 12, -2], fov: 40 }, { pos: [26, 3, 26], look: [31, 13.5, -2], fov: 34 });
    return (t, u) => { cam(u); p.update(t, { look: Math.sin(t * .4) * .3 }); };
  },
  // soldiers and trucks ring the jet under floodlights
  '3.7': async k => {
    const { real, scene, camera } = k;
    await night(k, { moonI: 1.0 });
    await sets.apron(k, { sign: 'ENTEBBE' });
    const jet = await sets.a300(); scene.add(jet);
    flood(scene, [30, 16, 40], [0, 2, 10]); flood(scene, [-30, 16, 30], [0, 2, 5], 300);
    const ring = []; let i = 0;
    for (let a = 0; a < P * 2; a += P / 8) { const x = Math.sin(a) * 16, z = 4 + Math.cos(a) * 30; if (Math.abs(x) < 7 && Math.abs(z - 4) < 26) continue; ring.push(await soldier(k, i, [x, 0, z], a + P)); i++; }
    const lr1 = S2.landrover(); lr1.position.set(18, 0, 26); lr1.rotation.y = -2.4; scene.add(lr1);
    const lr2 = S2.landrover(); lr2.position.set(-17, 0, 12); lr2.rotation.y = 2.0; scene.add(lr2);
    const cam = C.dolly(camera, { pos: [46, 26, 70], look: [0, 2, 6], fov: 40 }, { pos: [34, 9, 52], look: [0, 2, 8], fov: 42 });
    return (t, u) => { cam(u); ring.forEach((p, j) => p.update(t, { look: Math.sin(t * .4 + j) * .2 })); };
  },
  '3.8': old['3.8'],
  '3.9': old['3.9'],
  // in the old terminal, three more men step out of the shadows
  '3.10': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .1 });
    await S2.hall(k, { lampI: 8, hemi: .4 });
    const four = [], three = [];
    for (const [i, id] of [C.HJ.bose, C.HJ.kuhlmann, C.HJ.hj3, C.HJ.hj4].entries()) { const p = await real.human({ id, seed: 840 + i }); real.put(scene, p, { pos: [-3 + i * 1.2, 0, 1.2], rot: P, mood: 'stern' }); p.userData.driven = true; four.push(p); }
    for (const [i, id] of ['tb_pa3', 'tb_pa8', 'tb_cmd2'].entries()) { const p = await real.human({ id, seed: 850 + i }); real.put(scene, p, { pos: [2.2 + i * 1.3, 0, -4.5], rot: P * .9, mood: 'stern' }); p.userData.driven = true; three.push(p); }
    const key = new THREE.SpotLight(0xffe0b0, 0, 12, .5, .6, 1.3); key.position.set(4, 4, 0); key.target.position.set(3.5, 1, -2); scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [0, 1.7, 7.5], look: [1, 1.3, -2], fov: 44 }, { pos: [1.2, 1.6, 6], look: [2.8, 1.3, -2], fov: 40 });
    return (t, u) => { cam(u); four.forEach((p, i) => p.update(t, { mood: 'stern', look: .4 }));
      three.forEach((p, i) => { const w = C.seg(t, .8 + i * .3, 3.2 + i * .3); p.position.z = -4.5 + w * 3.2; p.update(t, { pose: w > 0 && w < 1 ? 'walk' : 'idle', dist: w * 3.2, mood: 'stern' }); });
      key.intensity = 80 * C.ease(C.seg(t, .6, 1.6)); };
  },
  // dawn: the passengers walk in a line from the jet to the old terminal, guarded on both sides
  '3.11': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'industrial_sunset_puresky', { sun: [-80, 14, 40], sunI: 2.6, sunColor: 0xffb880, shadowSize: 60, envI: .7, fog: [0xc8a088, 160, 1100] });
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -70], wall: 0xc8bca4 });
    const jet = await sets.a300(); jet.position.set(28, 0, 40); jet.rotation.y = -P / 2 - .3; scene.add(jet);
    const line = [];
    for (let i = 0; i < 16; i++) { const p = await real.human({ id: C.PAX[i % 10], seed: 900 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: P, mood: 'worried' }); p.userData.driven = true; p.userData.k = i; line.push(p); }
    const guards = [];
    for (let i = 0; i < 6; i++) guards.push(await soldier(k, i, [(i % 2 ? 3.2 : -3.2), 0, 10 - Math.floor(i / 2) * 14], i % 2 ? -P / 2 : P / 2));
    const hj = await real.human({ id: C.HJ.bose, seed: 950 }); real.put(scene, hj, { pos: [1.6, 0, -2], rot: P }); hj.userData.driven = true; C.attach(hj, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    const cam = C.dolly(camera, { pos: [14, 6, 26], look: [0, 1, -12], fov: 40 }, { pos: [10, 3.5, 10], look: [-1, 1.2, -24], fov: 40 }, { ease: u => u });
    return (t, u) => { cam(u);
      line.forEach((p, i) => { const z = 24 - i * 2.1 - t * 1.1; p.position.set(Math.sin(i * 1.7) * .35, 0, z); p.update(t, { pose: 'walk', dist: t * 1.1 + i * .3, mood: 'worried', arm: i % 5 === 0 ? 'hold' : null }); });
      hj.position.z = -2 - t * 1.1; hj.update(t, { pose: 'walk', dist: t * 1.1, mood: 'stern' });
      guards.forEach((g, i) => g.update(t, { look: i % 2 ? .3 : -.3 })); };
  },
  // the main hall: mattresses, hostages, Ugandan soldiers at the doors
  '3.12': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 14, hemi: .9 });
    const ppl = await hostagesOnMats(k, h, 2);
    const g1 = await soldier(k, 0, [-h.w / 2 + 1.2, 0, 0], P / 2), g2 = await soldier(k, 1, [h.w / 2 - 1.2, 0, .8], -P / 2);
    // door frames behind the guards
    for (const x of [-h.w / 2 + .02, h.w / 2 - .02]) scene.add(real.box(.05, 2.4, 1.4, real.std(0x2a2620), { pos: [x, 1.2, .4], cast: false }));
    const cam = C.dolly(camera, { pos: [-h.w / 2 + 3, 2.6, 5], look: [2, .6, -2], fov: 46 }, { pos: [-h.w / 2 + 6, 2.2, 3.5], look: [5, .8, -2], fov: 44 });
    return (t, u) => { cam(u); idleMats(ppl, t); g1.update(t, { look: Math.sin(t * .4) * .3 }); g2.update(t, { look: Math.sin(t * .35 + 1) * .3 }); };
  },
  // Amin arrives and speaks: "I am here to help"
  '3.13': async k => {
    const { real, scene, camera } = k; k.noAutoOverlay = true;
    await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 });
    const h = await S2.hall(k, { lampI: 14, hemi: .9 });
    const ppl = await hostagesOnMats(k, h, 3);
    const a = await real.human({ id: 'tb_amin', seed: 801 }); real.put(scene, a, { pos: [-h.w / 2 + 2.2, 0, 0], rot: P / 2, mood: 'happy' }); a.userData.driven = true;
    C.attach(a, S2.cap(0x3a4428), 'Head', [0, .15, .01]);
    const g = await soldier(k, 2, [-h.w / 2 + 1.4, 0, 1.4], P / 2);
    const sp = new THREE.SpotLight(0xffe0b0, 60, 8, .35, .6, 1.3); sp.position.set(-h.w / 2 + 4.5, 3.8, 1.5); sp.target.position.set(-h.w / 2 + 2.2, 1.4, 0); scene.add(sp, sp.target);
    const cam = C.dolly(camera, { pos: [-4.5, 1.5, 1.6], look: [-h.w / 2 + 2.2, 1.55, 0], fov: 40 }, { pos: [-6, 1.55, 1.2], look: [-h.w / 2 + 2.2, 1.6, 0], fov: 38 });
    return (t, u) => { cam(u); idleMats(ppl, t, { look: -.6, nod: -.3 });
      a.update(t, { mood: 'happy', talk: t > .5, arm: t > 1.2 && t < 3.2 ? 'raise' : null, look: Math.sin(t * .5) * .2 }); g.update(t, {});
      const [x, y] = proj(camera, C.headPos(a, .45));
      const s = C.ease(C.seg(t, 1.0, 1.4)); if (s > 0) { const o = k.overlay; o.save(); o.translate(Math.min(1560, x + 260), Math.max(200, y - 40)); o.scale(s, s);
        o.fillStyle = '#fbf6ea'; o.strokeStyle = '#2b1e16'; o.lineWidth = 5; o.beginPath(); o.roundRect(-230, -60, 460, 110, 30); o.fill(); o.stroke();
        o.beginPath(); o.moveTo(-200, 40); o.lineTo(-260, 90); o.lineTo(-150, 48); o.fill(); o.fillStyle = '#2b1e16'; o.font = '46px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText('"I AM HERE TO HELP"', 0, -5); o.restore(); } };
  },
  '3.14': old['3.14'],
  '3.15': old['3.15'],
};
