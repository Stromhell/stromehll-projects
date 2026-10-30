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

// QA: stairs truck read blocky (flat window, flat disc wheels). Local detail pass added on top of sets.airstair.
function detailStairsTruck(st) {
  const real = C.real, m = real.m;
  const dk = real.std(0x1b1d1f, { rough: .6, metal: .3 }), rub = real.std(0x0e0e0f, { rough: .95 }), alu = real.std(0xb9bcc0, { rough: .3, metal: .85 }), body = real.std(0xe8e4d8, { rough: .5 });
  const bolt = real.std(0x9a9da0, { rough: .35, metal: .8 }), red = real.std(0x8a1414, { rough: .4, emissive: 0x401010, ei: .4 }), amber = real.std(0xffb030, { rough: .3, emissive: 0xffa020, ei: .5 });
  const g = new THREE.Group(); st.add(g);
  for (const sx of [-1, 1]) {
    for (const z of [2.6, -2.6]) {
      // wheel arch: half-shell + raised lip over the wheel, thick tyre ring, hub with bolts
      g.add(m(new THREE.CylinderGeometry(.55, .55, .02, 28), dk, { pos: [sx * 1.156, .42, z], rot: [0, 0, P / 2] }));
      g.add(m(new THREE.TorusGeometry(.56, .035, 8, 28, P), alu, { pos: [sx * 1.15, .42, z], rot: [0, P / 2, 0] }));
      g.add(m(new THREE.TorusGeometry(.33, .1, 12, 32), rub, { pos: [sx * 1.0, .42, z], rot: [0, P / 2, 0] }));
      g.add(m(new THREE.CylinderGeometry(.4, .4, .3, 32), rub, { pos: [sx * 1.0, .42, z], rot: [0, 0, P / 2] }));
      g.add(m(new THREE.CylinderGeometry(.2, .2, .03, 24), bolt, { pos: [sx * 1.165, .42, z], rot: [0, 0, P / 2] }));
      g.add(m(new THREE.CylinderGeometry(.07, .07, .05, 16), alu, { pos: [sx * 1.18, .42, z], rot: [0, 0, P / 2] }));
      for (let i = 0; i < 6; i++) { const a = i * P / 3; g.add(m(new THREE.CylinderGeometry(.018, .018, .04, 8), alu, { pos: [sx * 1.18, .42 + Math.sin(a) * .13, z + Math.cos(a) * .13], rot: [0, 0, P / 2] })); }
    }
    // mudflap + door seams / handle on the cab, mirrors on arms
    g.add(m(new THREE.BoxGeometry(.03, .22, .35), rub, { pos: [sx * 1.13, .3, 1.9] }));
    g.add(m(new THREE.BoxGeometry(.012, 1.3, .015), dk, { pos: [sx * 1.108, 1.5, 3.5] }));
    g.add(m(new THREE.BoxGeometry(.012, .015, 1.15), dk, { pos: [sx * 1.108, 1.0, 2.9] }));
    g.add(m(new THREE.BoxGeometry(.03, .04, .14), alu, { pos: [sx * 1.12, 1.6, 2.5] }));
    g.add(m(new THREE.BoxGeometry(.3, .02, .02), dk, { pos: [sx * 1.25, 2.1, 3.55] }));
    g.add(real.rbox(.05, .26, .16, .02, dk, { pos: [sx * 1.4, 2.1, 3.55] }));
    // side window frame
    for (const [w, h, d, y, z] of [[.03, .035, 1.2, 2.17, 3.0], [.03, .035, 1.2, 1.63, 3.0], [.03, .6, .035, 1.9, 3.58], [.03, .6, .035, 1.9, 2.42]]) g.add(m(new THREE.BoxGeometry(w, h, d), dk, { pos: [sx * 1.11, y, z] }));
    // front/rear lights, front indicators
    g.add(real.rbox(.3, .14, .05, .02, amber, { pos: [sx * .98, .62, 3.96] }));
    g.add(real.rbox(.16, .2, .05, .02, red, { pos: [sx * 1.02, .9, -3.66] }));
  }
  // windscreen frame + wiper + grille + bumper lip, roof beacon
  for (const [w, h, y, x] of [[2.1, .05, 2.27, 0], [2.1, .05, 1.43, 0], [.05, .88, 1.85, -1.03], [.05, .88, 1.85, 1.03], [.05, .88, 1.85, 0]]) g.add(m(new THREE.BoxGeometry(w, h, .05), dk, { pos: [x, y, 3.92] }));
  g.add(m(new THREE.BoxGeometry(.6, .02, .02), dk, { pos: [-.4, 1.5, 3.95], rot: [0, 0, .12] }));
  g.add(real.rbox(1.0, .34, .06, .03, dk, { pos: [0, .95, 3.94] }));
  for (let i = 0; i < 5; i++) g.add(m(new THREE.BoxGeometry(.9, .015, .02), alu, { pos: [0, .84 + i * .06, 3.98] }));
  g.add(real.rbox(2.3, .12, .12, .04, alu, { pos: [0, .5, 4.02] }));
  g.add(m(new THREE.CylinderGeometry(.08, .1, .1, 12), amber, { pos: [.7, 2.41, 3.0] }));
  // slightly bevelled cab roof cap
  g.add(real.rbox(2.2, .1, 1.9, .04, body, { pos: [0, 2.36, 3.0] }));
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
}
function stairsAt(jet, scene) { const d = jet.userData.doorL1; const st = sets.airstair(d.y + .02); st.position.set(d.x + .7 + 5.75, 0, d.z); detailStairsTruck(st); scene.add(st); return st; }

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
    const cam = C.dolly(camera, { pos: [0, 1.6, 9], look: [0, 1.2, 0], fov: 40 }, { pos: [0, 1.55, 6.5], look: [0, 1.25, 0], fov: 40 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => { p.update(t, { mood: 'stern', look: Math.sin(t * .3 + i) * .05 }); p.userData.key.intensity = 10; });
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
      labelAt(k, ppl[2], 'WILFRIED BÖSE', 'REVOLUTIONARY CELLS', t, 1.8); labelAt(k, ppl[3], 'BRIGITTE KUHLMANN', 'REVOLUTIONARY CELLS', t, 2.4); };
  },
  '2.4': old['2.4'],
  '2.5': old['2.5'],
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
    const st = stairsAt(jet, scene); const d = jet.userData.doorL1;
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
    stairsAt(jet, scene);
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
    const cb = await sets.cabin(k, { len: 12, lampI: .8, hemi: .16, sky: 0x0a1020 });
    const pax = await C.fillCabin(k, cb, { mood: 'sad', skip: s => (s.row * 3 + s.col) % 5 === 0 });
    const lights = pax.filter((p, i) => i % 3 === 0).map((p, i) => { const s = p.userData.seat; const l = new THREE.SpotLight(0xffe2a8, 9, 3, .35, .6, 1.5); l.position.set(s.x, 2.0, s.z + .2); l.target.position.set(s.x, .9, s.z + .1); scene.add(l, l.target); l.userData.off = 1 + i * .45; return l; });
    const cam = C.dolly(camera, { pos: [-.6, 1.65, 5.8], look: [-.6, 1.0, -4], fov: 46 }, { pos: [-.6, 1.6, 4], look: [-.6, 1.0, -5], fov: 46 }, { ease: u => u });
    return (t, u) => { cam(u); C.idleSeated(pax, t, {}); lights.forEach(l => l.intensity = 9 * (1 - C.seg(t, l.userData.off, l.userData.off + .15))); };
  },
};
