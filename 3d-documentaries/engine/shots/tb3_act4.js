// Operation Thunderbolt · Act 4 · THE SELECTION — realistic look (v3 engine)
import * as C from './tb3_common.js';
import * as ui from '../lib/ui.js';
import * as S2 from '../lib/sets2.js';
const { THREE, sets, P } = C;

const proj = (cam, v) => { cam.updateMatrixWorld(); const p = new THREE.Vector3(...v).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
async function hallEnv(k, o = {}) { await k.real.env(k, 'small_empty_room_1', { sun: false, bg: 0x05060a, envI: .15 }); return S2.hall(k, { lampI: o.lampI ?? 14, hemi: o.hemi ?? .9, dawn: o.dawn }); }
async function hostages(k, h, every = 2, mood = 'worried') {
  const ppl = [];
  for (let i = 0; i < h.mats.length; i += every) { const mt = h.mats[i]; const p = await k.real.human({ id: C.PAX[(i * 3) % 10], seed: 1000 + i }); k.real.put(k.scene, p, { pos: [mt.x, 0, mt.z], rot: mt.z > 0 ? P : 0, pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood }); p.userData.driven = true; ppl.push(p); }
  return ppl;
}
const idle = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .16, arm: i % 3 ? 'lap' : 'hug', mood: o.mood ?? 'worried', look: (o.look ?? 0) + Math.sin(t * .3 + i) * .15, nod: o.nod ?? .2 }));
function passport(color) { const g = new THREE.Group(); g.add(C.real.box(.09, .012, .125, C.real.std(color, { rough: .7 }))); g.add(C.real.box(.085, .013, .118, C.real.std(0xe8e2d0, { rough: .9 }), { pos: [.003, 0, 0] })); return g; }
// a Ugandan ambulance (generic white van with a red cross)
function ambulance() {
  const g = new THREE.Group(); const r = C.real; const white = r.std(0xe8e6de, { rough: .5 }), glass = r.std(0x0c1014, { rough: .1, metal: .5 });
  g.add(r.rbox(2.0, 1.9, 4.8, .15, white, { pos: [0, 1.35, 0] }));
  g.add(r.box(1.8, .6, .05, glass, { pos: [0, 1.9, 2.41] }));
  const cross = r.canvasTex(256, 256, c => { c.fillStyle = '#e8e6de'; c.fillRect(0, 0, 256, 256); c.fillStyle = '#c0392b'; c.fillRect(98, 40, 60, 176); c.fillRect(40, 98, 176, 60); });
  for (const s of [1, -1]) g.add(r.m(new THREE.PlaneGeometry(.8, .8), new THREE.MeshStandardMaterial({ map: cross, roughness: .6 }), { pos: [s * 1.01, 1.5, -.6], rot: [0, s * P / 2, 0], cast: false }));
  g.add(r.m(new THREE.PlaneGeometry(.8, .8), new THREE.MeshStandardMaterial({ map: cross, roughness: .6 }), { pos: [0, 1.6, -2.41], rot: [0, P, 0], cast: false }));
  for (const x of [-.8, .8]) g.add(r.box(.15, .2, .05, r.std(0xff2020, { emissive: 0xff2020, ei: 2.5 }), { pos: [x, .8, -2.42] }));
  g.add(r.box(.5, .12, .25, r.std(0x3070ff, { emissive: 0x3070ff, ei: 2 }), { pos: [0, 2.35, 1.6] }));
  const wm = { tyre: r.std(0x111111, { rough: .9 }), hub: r.std(0x999999, { metal: .7, rough: .3 }), metal: r.std(0x999999, { metal: .7 }) };
  for (const [x, z] of [[-.9, 1.6], [.9, 1.6], [-.9, -1.5], [.9, -1.5]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(.38, .38, .25, 20), wm.tyre); w.rotation.z = P / 2; w.position.set(x, .38, z); g.add(w); }
  g.traverse(c => { if (c.isMesh) c.castShadow = true; });
  return g;
}
async function night(k) {
  await k.real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-40, 60, -30], sunI: 2.2, sunColor: 0xa8bcff, shadowSize: 40, bg: 0x04050b, envI: .28, exposure: 1.1 });
  k.scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, .8));
}

export const shots = {
  // a hijacker at a table, reading names from a stack of passports
  '4.1': async k => {
    const { real, scene, camera } = k;
    const h = await hallEnv(k);
    const ppl = await hostages(k, h, 3);
    const desk = await real.prop('metal_office_desk'); desk.position.set(0, 0, 0); desk.rotation.y = P; scene.add(desk);
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
    // partition wall with an opening at x 0 (the second room is behind it, darker)
    const wall = real.std(0xcfc4a8, { rough: .9 });
    scene.add(real.box(9, 4.4, .25, wall, { pos: [-5.6, 2.2, -2] })); scene.add(real.box(9, 4.4, .25, wall, { pos: [5.6, 2.2, -2] })); scene.add(real.box(2.2, 1.9, .25, wall, { pos: [0, 3.45, -2] }));
    const line = [];
    for (let i = 0; i < 9; i++) { const p = await real.human({ id: C.PAX[(i * 7) % 10], seed: 1100 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: P, mood: 'worried' }); p.userData.driven = true; line.push(p); }
    const g = await real.human({ id: C.HJ.kuhlmann, seed: 82 }); real.put(scene, g, { pos: [1.4, 0, -1.2], rot: -P / 2 - .4, mood: 'stern' }); g.userData.driven = true; C.attach(g, C.pistolShape(), 'RightHand', [0, -.08, .05], [P / 2, 0, 0]);
    const cam = C.dolly(camera, { pos: [3.5, 1.7, 5.5], look: [0, 1.2, -2], fov: 42 }, { pos: [2.6, 1.65, 3.8], look: [0, 1.2, -2.5], fov: 40 });
    return (t, u) => { cam(u);
      line.forEach((p, i) => { const z = 4 - i * 1.25 - t * .9; p.visible = z > -4.5; p.position.set(Math.sin(i * 2.1) * .2, 0, z); p.update(t, { pose: 'walk', dist: t * .9 + i * .4, mood: 'worried' }); });
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
      const o = k.overlay; o.save(); o.fillStyle = 'rgba(112,72,30,.16)'; o.fillRect(0, 0, 1920, 1080);
      const g = o.createRadialGradient(960, 540, 300, 960, 540, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,12,4,.75)'); o.fillStyle = g; o.fillRect(0, 0, 1920, 1080); o.restore(); };
  },
  // Dora Bloch, 75, helped into an ambulance
  '4.4': async k => {
    const { real, scene, camera } = k;
    await night(k);
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -14], lit: [2, 3, 4, 5, 6], wall: 0xc8bca4 });
    const amb = ambulance(); amb.position.set(6.8, 0, 2); amb.rotation.y = P / 2; scene.add(amb);
    const flood = new THREE.SpotLight(0xfff0d0, 200, 40, .6, .5, 1.3); flood.position.set(-4, 7, 6); flood.target.position.set(3, 0, 2); flood.castShadow = true; scene.add(flood, flood.target);
    const d = await real.human({ id: 'tb_pa2', seed: 1300 }); real.put(scene, d, { pos: [-2, 0, 2.3], rot: P / 2, mood: 'sad' }); d.userData.driven = true;
    const s1 = await real.human({ id: 'tb_ug1', seed: 1301 }); real.put(scene, s1, { pos: [-2.2, 0, 3.05], rot: P / 2 }); s1.userData.driven = true;
    const s2 = await real.human({ id: 'tb_ug3', seed: 1302 }); real.put(scene, s2, { pos: [3.6, 0, .4], rot: -P / 2 - .3 }); s2.userData.driven = true;
    const cam = C.dolly(camera, { pos: [-1, 1.7, 9], look: [1.2, 1.2, 2], fov: 40 }, { pos: [.2, 1.6, 7], look: [1.6, 1.2, 2], fov: 38 });
    return (t, u) => { cam(u);
      const w = C.ease(C.seg(t, .2, 4.0)); d.position.x = -2 + w * 2.1; s1.position.x = -2.2 + w * 1.9;
      d.update(t, { pose: w < 1 ? 'walk' : 'idle', dist: w * 2.6 * .7, mood: 'sad', arm: 'cover' }); s1.update(t, { pose: w < 1 ? 'walk' : 'idle', dist: w * 2.4 * .7, arm: 'hug' }); s2.update(t, { look: -.4 });
      k.anchor = C.headPos(d, .35); };
  },
  // the ambulance drives off into the dark
  '4.5': async k => {
    const { scene, camera } = k;
    await night(k);
    await sets.apron(k, { terminal: false });
    S2.entebbeOld(k, { pos: [0, 0, -14], lit: [2, 3, 4, 5, 6], wall: 0xc8bca4 });
    const amb = ambulance(); scene.add(amb);
    const beacon = new THREE.PointLight(0x3070ff, 0, 10, 2); beacon.position.set(0, 2.6, 1.6); amb.add(beacon);
    const cam = C.dolly(camera, { pos: [-4, 1.6, 6], look: [3, 1.2, 0], fov: 40 }, { pos: [-4, 1.6, 6], look: [12, 1.6, -6], fov: 40 });
    return (t, u) => { cam(u); const a = C.seg(t, .3, k.meta.seconds); amb.position.set(6.8 + a * a * 40, 0, 2 - a * a * 18); amb.rotation.y = P / 2 + .4 * a; beacon.intensity = Math.sin(t * 9) > 0 ? 12 : 2; };
  },
  // released groups walk to a waiting jet
  '4.6': async k => {
    const { real, scene, camera } = k;
    await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-50, 55, 40], sunI: 4.2, sunColor: 0xfff0d8, shadowSize: 50, envI: 1, fog: [0xd8dde2, 120, 900] });
    await sets.apron(k, { sign: 'ENTEBBE' });
    const jet = await sets.a300(); jet.position.set(0, 0, 0); scene.add(jet);
    const d = jet.userData.doorL1; const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); scene.add(st);
    const walkers = [];
    for (let i = 0; i < 14; i++) { const p = await real.human({ id: C.PAX[i % 10], seed: 1400 + i }); real.put(scene, p, { pos: [0, 0, 0], rot: -P / 2 - .25, mood: i % 3 ? 'calm' : 'happy' }); p.userData.driven = true; walkers.push(p); }
    const cam = C.dolly(camera, { pos: [36, 3, 40], look: [10, 2, 18], fov: 40 }, { pos: [30, 2.6, 34], look: [8, 2, 20], fov: 40 });
    return (t, u) => { cam(u);
      walkers.forEach((p, i) => { const s0 = i * 1.4; const x = 34 - i * 1.6 - t * 1.25, z = 26 + (i % 3) * .9 - (t * 1.25) * .25; p.position.set(Math.max(d.x + 8, x), 0, z); p.update(t, { pose: x > d.x + 8 ? 'walk' : 'idle', dist: t * 1.25 + s0, mood: i % 3 ? 'calm' : 'happy' }); }); };
  },
  // Captain Bacos refuses to leave: he stands in front of his crew
  '4.7': async k => {
    const { real, scene, camera } = k;
    await hallEnv(k, { lampI: 12 });
    const crew = [];
    const ids = [C.CREW.copilot, C.CREW.engineer, C.CREW.steward, 'tb_pa7', C.CREW.steward, 'tb_pa3', C.CREW.copilot, C.CREW.engineer, C.CREW.steward, 'tb_pa8', C.CREW.steward];
    for (let i = 0; i < ids.length; i++) { const p = await real.human({ id: ids[i], seed: 1500 + i }); real.put(scene, p, { pos: [-1.6 + (i % 6) * 1.3 + (i >= 6 ? .65 : 0) - 1.25, 0, -1.6 - (i >= 6 ? 1.2 : 0)], rot: 0, mood: 'calm' }); p.userData.driven = true; crew.push(p); }
    const b = await real.human({ id: C.CREW.bacos, seed: 40 }); real.put(scene, b, { pos: [2, 0, 0], rot: 0, mood: 'stern' }); b.userData.driven = true;
    const key = new THREE.SpotLight(0xffe0b0, 80, 10, .5, .6, 1.3); key.position.set(3.5, 4, 3); key.target.position.set(2, 1.2, -.8); key.castShadow = true; scene.add(key, key.target);
    const cam = C.dolly(camera, { pos: [2, 1.5, 6], look: [2, 1.4, -1], fov: 40 }, { pos: [2, 1.55, 4.2], look: [2, 1.5, -.8], fov: 38 });
    return (t, u) => { cam(u); b.update(t, { arm: 'hug', mood: 'stern', look: Math.sin(t * .3) * .05 }); crew.forEach((p, i) => p.update(t, { mood: 'calm', look: Math.sin(t * .4 + i) * .1, arm: i % 4 === 0 ? 'hug' : null })); };
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
    const cam = C.dolly(camera, { pos: [40, -6, -20], look: [0, 0, 40], fov: 40 }, { pos: [40, -6, -20], look: [0, 30, 160], fov: 40 });
    return (t, u) => { cam(u); jet.position.set(0, t * 7, 20 + t * 26); jet.rotation.x = -.18;
      const s = C.ease(C.seg(t, k.meta.seconds - 2.6, k.meta.seconds - 2.2)); if (s > 0) { const o = k.overlay; o.save(); o.translate(1480, 300); o.rotate(-.06);
        o.fillStyle = 'rgba(29,23,18,.9)'; o.beginPath(); o.roundRect(-210, -70, 420, 140, 10); o.fill(); o.strokeStyle = '#e8b321'; o.lineWidth = 4; o.stroke();
        o.fillStyle = '#f4ead3'; o.font = '52px "Anton"'; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText("HIJACKERS' PLAN", 0, 2);
        o.scale(1 + (1 - s) * .8, 1 + (1 - s) * .8); o.strokeStyle = '#d2232a'; o.lineWidth = 22; o.lineCap = 'round'; o.globalAlpha = s; o.beginPath(); o.moveTo(-170, -80); o.lineTo(170, 80); o.moveTo(170, -80); o.lineTo(-170, 80); o.stroke(); o.restore(); } };
  },
};
