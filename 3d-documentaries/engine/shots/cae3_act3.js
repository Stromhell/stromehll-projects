// The Ides of March · Act 3 · THE PLOT — realistic look
import * as C from './cae3_common.js';
import { calendarTex } from './cae3_act2.js';
const { THREE, rome, P, real, REG } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;
const PL = rome.PLACES;

// table-top model scenes share this: a lamp-lit table in the dark domus, top-down camera
async function tableTop(k, o = {}) {
  const d = await rome.domus(k, { room: 'none', night: true }); k.exposure = o.exposure ?? .9;
  k.scene.add(real.box(2.4, .08, 1.6, d.M.wood, { pos: [0, .9, 0] })); for (const x of [-1.05, 1.05]) for (const z of [-.65, .65]) k.scene.add(real.box(.08, .9, .08, d.M.wood, { pos: [x, .45, z] }));
  for (const [x, z] of [[-1.1, -.7], [1.1, -.7]]) rome.oilLamp(k.scene, [x, .97, z], { i: o.lampI ?? .8, shadow: true });
  rome.key(k.scene, [.4, 3.2, .6], [0, .9, 0], { i: o.keyI ?? 13, angle: .5, soft: .5 });
  return d;
}
function bridgeModel(M) {
  const g = new THREE.Group(); const st = M.stone;
  g.add(real.box(1.3, .03, .16, st, { pos: [0, .2, 0] }));
  for (const x of [-.45, 0, .45]) g.add(real.box(.07, .2, .16, st, { pos: [x, .1, 0] }));
  for (const x of [-.65, .65]) g.add(real.box(.12, .2, .16, st, { pos: [x, .1, 0] }));
  const w = real.m(new THREE.PlaneGeometry(1.6, .9), real.std(0x2a4a5a, { rough: .2, metal: .1 }), { rot: [-P / 2, 0, 0], pos: [0, .005, 0], cast: false }); g.add(w);
  return g;
}
function tinyMen(n, color = 0x3a2a20) { const g = new THREE.Group(); const m = real.std(color, { rough: .8 }); for (let i = 0; i < n; i++) { const f = new THREE.Group(); f.add(real.m(new THREE.CylinderGeometry(.008, .011, .05, 8), m, { pos: [0, .025, 0] })); f.add(real.m(new THREE.SphereGeometry(.008, 8, 6), m, { pos: [0, .058, 0] })); f.position.set((i % 4) * .05 - .08, 0, Math.floor(i / 4) * .05 - .03); g.add(f); } return g; }
function arenaModel(M) {
  // table model of a Roman amphitheatre: oval arcaded facade in three storeys, stepped seating bowl, sand floor
  const g = new THREE.Group(), RX = .55, RZ = .42, N = 40, st = M.stone, tr = M.travertine ?? M.stone;
  const ring = (rx, rz, y, h, th) => { const m = real.m(new THREE.CylinderGeometry(1, 1, h, 64, 1, true), tr, { pos: [0, y, 0] }); m.scale.set(rx, 1, rz); m.material = tr.clone(); m.material.side = THREE.DoubleSide; return m; };
  for (let j = 0; j < 3; j++) {
    const y0 = j * .075, h = .075;
    for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2; const pier = real.box(.018, h * .78, .03, tr, { pos: [Math.cos(a) * RX, y0 + h * .39, Math.sin(a) * RZ] }); pier.rotation.y = -a; g.add(pier); }
    g.add(ring(RX, RZ, y0 + h * .88, h * .24));
  }
  g.add(ring(RX, RZ, .24, .04)); // attic
  for (let i = 0; i < 6; i++) { const r = 1 - i * .085; const tier = real.m(new THREE.CylinderGeometry(1, 1, .03, 64, 1, true), st, { pos: [0, .21 - i * .034, 0] }); tier.scale.set(RX * .95 * r, 1, RZ * .95 * r); tier.material = st.clone(); tier.material.side = THREE.DoubleSide; g.add(tier);
    const top = real.m(new THREE.RingGeometry(r - .085, r, 64), st, { pos: [0, .225 - i * .034, 0], rot: [-Math.PI / 2, 0, 0] }); top.scale.set(RX * .95, RZ * .95, 1); top.material = st.clone(); top.material.side = THREE.DoubleSide; g.add(top); }
  const sand = real.m(new THREE.CylinderGeometry(1, 1, .02, 48), real.std(0xc8a870, { rough: 1 }), { pos: [0, .01, 0] }); sand.scale.set(RX * .46, 1, RZ * .46); g.add(sand);
  const pod = real.m(new THREE.CylinderGeometry(1, 1, .03, 48, 1, true), st, { pos: [0, .025, 0] }); pod.scale.set(RX * .47, 1, RZ * .47); pod.material = st.clone(); pod.material.side = THREE.DoubleSide; g.add(pod);
  return g;
}

export const shots = {
  // 3.1 sixty dark figures fill the hall; crane up and back
  '3.1': async k => {
    const cu = await rome.curia(k, { statue: false, shaftI: .14, sunI: 2.2 }); k.exposure = .6;
    const ppl = []; let i = 0;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { const x = -3.9 + c * 1.1 + (r % 2) * .4, z = 4 - r * 1.5; ppl.push(await C.person(k, C.SEN[(r * 8 + c) % C.SEN.length], { pos: [x, 0, z], rot: (c - 3.5) * -.04, seed: 600 + i++ })); }
    rome.key(k.scene, [0, 6, -9], [0, 1.5, 0], { i: 220, angle: .6, color: 0xffd8a8 });
    const cam = C.dolly(k.camera, { pos: [0, 1.8, 8.5], look: [0, 1.5, 0], fov: 42 }, { pos: [0, 6.5, 12.5], look: [0, 1, -1], fov: 46 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => p.update(t, { mood: 'stern', look: Math.sin(i * 1.7) * .2 })); };
  },
  // 3.2 a senator holds an empty silver plate; push in
  '3.2': async k => {
    const d = await rome.domus(k, { room: 'dining' });
    const sn = await C.person(k, 'cae_sen6', { pos: [0, 0, 2.3], rot: 0 });
    const plate = real.m(new THREE.CylinderGeometry(.16, .12, .02, 40), real.std(0xb8b4ac, { metal: .9, rough: .45 }));
    C.attach(sn, plate, 'RightHand', [0, -.05, .1], [0, 0, 0]);
    rome.key(k.scene, [1.5, 3, 5], [0, 1.4, 2.3], { i: 60 }); k.exposure = .75;
    const cam = C.dolly(k.camera, { pos: [.3, 1.5, 5.4], look: [0, 1.3, 2.3], fov: 38 }, { pos: [.15, 1.5, 3.9], look: [0, 1.35, 2.3], fov: 32 });
    return (t, u) => { cam(u); sn.update(t, { arm: 'hold', mood: 'sad', look: -.25 + Math.sin(t * .4) * .08 }); };
  },
  // 3.3 Caesar hands a pardon scroll to a former enemy; PARDONED stamp; lateral dolly
  '3.3': async k => {
    await rome.forum(k, { sun: [-25, 20, 18], trees: false });
    const cz = await C.person(k, 'cae_caesar', { pos: [-.8, 0, 5], rot: P / 2, laurel: true });
    const en = await C.person(k, 'cae_cassius', { pos: [.8, 0, 5], rot: -P / 2 });
    const others = []; for (let i = 0; i < 3; i++) others.push(await C.person(k, C.SEN[i + 2], { pos: [1.8 + i * .9, 0, 4 - i * .7], rot: -P / 2 - .3, seed: 640 + i }));
    const sc = rome.scroll({ seal: true }); const hs = C.holdBoth(k, cz, sc, { fwd: .09, tilt: 0 });
    rome.key(k.scene, [0, 4, 9], [0, 1.5, 5], { i: 120 });
    const cam = C.dolly(k.camera, { pos: [-2.2, 1.6, 9.2], look: [-.3, 1.4, 5], fov: 36 }, { pos: [1.4, 1.6, 9.0], look: [.3, 1.4, 5], fov: 36 });
    return (t, u) => { cam(u); cz.update(t, { arm: 'hold', mood: 'calm', look: 0 }); hs(); en.update(t, { arm: t > 2 ? 'hold' : null, mood: 'neutral' }); others.forEach(p => p.update(t, { mood: 'stern' }));
      C.stamp(k.overlay, t, k.meta.seconds * .6, { text: 'PARDONED', x: 1460, y: 300 }); };
  },
  // 3.4 a senator reads REPUBLIC scratched in a wax tablet; slow push
  '3.4': async k => {
    await rome.courtyard(k, { trees: false });
    const sn = await C.person(k, 'cae_sen2', { pos: [0, 0, 2], rot: .15 });
    const tb = rome.waxTablet('REPUBLIC', { both: true, rotZ: P }); const ht = C.holdBoth(k, sn, tb, { fwd: .1, tilt: .6 });
    rome.key(k.scene, [2, 3.5, 5], [0, 1.5, 2], { i: 120 });
    const cam = C.dolly(k.camera, { pos: [.9, 1.75, 4.4], look: [0, 1.35, 2], fov: 36 }, { pos: [.4, 1.6, 3.4], look: [0, 1.35, 2], fov: 38 });
    return (t, u) => { cam(u); sn.update(t, { arm: 'hold', mood: 'stern', look: -.35 }); ht(); };
  },
  // 3.5 rich senators at a banquet frown at Caesar's statue; crane over the table
  '3.5': async k => {
    const d = await rome.domus(k, { room: 'dining', lampI: .5 }); k.exposure = .55;
    const st = await rome.statueOf(k, 'cae_caesar', { pos: [0, 0, -3.7], arm: 'raise', scale: .8, plinth: 1.2 });
    const ppl = [];
    for (const [id, x, z, r] of [['cae_sen1', 0, -1.98, 0], ['cae_sen4', -1.98, -.4, P / 2], ['cae_sen7', -1.98, .6, P / 2], ['cae_sen10', 1.98, -.4, -P / 2], ['cae_sen3', 1.98, .6, -P / 2]]) ppl.push(await C.person(k, id, { pos: [x, 0, z], rot: r, pose: 'sit', seatH: .66, seed: 700 + ppl.length }));
    const cam = C.dolly(k.camera, { pos: [0, 1.6, 4.2], look: [0, .9, -.5], fov: 44 }, { pos: [0, 4.0, 2.6], look: [0, .9, -1.8], fov: 46 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .66, mood: 'angry', look: i ? (i < 3 ? -.5 : .5) : 0, talk: Math.floor(t / 2) % 5 === i })); };
  },
  // 3.6 Brutus and Cassius step forward from the group; push in
  '3.6': async k => {
    k.calloutPos = [1400, 300];
    await rome.courtyard(k, { trees: false });
    const br = await C.person(k, 'cae_brutus', { pos: [-.55, 0, 1], rot: P });
    const ca = await C.person(k, 'cae_cassius', { pos: [.55, 0, 1], rot: P });
    const bg = []; for (let i = 0; i < 6; i++) bg.push(await C.person(k, C.SEN[i + 3], { pos: [-2.5 + i, 0, -1.4 - (i % 2) * .6], rot: P, seed: 720 + i }));
    rome.key(k.scene, [-2, 3.5, 6], [0, 1.6, 2], { i: 130 });
    const cam = C.dolly(k.camera, { pos: [0, 1.65, 7], look: [0, 1.5, 0], fov: 40 }, { pos: [0, 1.65, 4.6], look: [0, 1.6, 1.5], fov: 34 });
    return (t, u) => { cam(u); const s = ease(seg(t, .3, 2.2)) * 1.4; br.position.z = 1 + s; ca.position.z = 1 + s;
      br.rotation.y = 0; ca.rotation.y = 0;
      br.update(t, { pose: s < 1.38 ? 'walk' : 'idle', dist: s, mood: 'stern', look: .1 }); ca.update(t, { pose: s < 1.38 ? 'walk' : 'idle', dist: s, mood: 'stern', look: -.1 });
      bg.forEach(p => p.update(t, { mood: 'stern' })); };
  },
  // 3.7 top-down: a city map and three wax tablets; push
  '3.7': async k => {
    await tableTop(k);
    const map = real.m(new THREE.PlaneGeometry(1.1, .8), new THREE.MeshStandardMaterial({ map: real.canvasTex(1024, 744, (c, W, H) => {
      c.fillStyle = '#e2d2ac'; c.fillRect(0, 0, W, H); c.strokeStyle = '#6a4a2a'; c.lineWidth = 4;
      c.fillStyle = '#9ab0b8'; c.beginPath(); c.moveTo(80, 0); c.bezierCurveTo(260, 260, 140, 480, 300, H); c.lineTo(370, H); c.bezierCurveTo(210, 480, 330, 260, 150, 0); c.fill();
      c.strokeStyle = '#7a5a3a'; c.lineWidth = 3; for (let i = 0; i < 40; i++) { c.strokeRect(380 + (i % 8) * 70, 80 + Math.floor(i / 8) * 110, 50, 70); }
      c.fillStyle = '#3a2412'; c.font = 'italic 40px "Liberation Serif"'; c.fillText('ROMA', 720, 60); c.font = '28px "Liberation Serif"'; c.fillText('Via Sacra', 560, 700); c.fillText('Tiberis', 90, 420);
    }), roughness: .9 }), { rot: [-P / 2, 0, 0], pos: [0, .945, 0], cast: false }); k.scene.add(map);
    const tabs = ['VIA SACRA', 'PONS', 'LUDI'].map((w, i) => { const t = rome.waxTablet(w); t.position.set(-.7 + i * .7, .945, .5); t.rotation.y = (i - 1) * .12; k.scene.add(t); return t; });
    const cam = C.dolly(k.camera, { pos: [0, 2.9, .9], look: [0, .9, .1], fov: 44 }, { pos: [0, 2.1, .7], look: [0, .9, .2], fov: 42 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); };
  },
  // 3.8 Plan one: the Via Sacra, busy street; red X stamps
  '3.8': async k => {
    await rome.forum(k, { sun: [-25, 22, 18], trees: false });
    const ppl = []; for (let i = 0; i < 18; i++) { const p = await C.person(k, C.CIT[i % 8], { pos: [-4 + (i % 6) * 1.6, 0, -4 + Math.floor(i / 6) * 3], rot: i % 2 ? P / 2 : -P / 2, seed: 760 + i }); p.userData.d = i % 2 ? 1 : -1; ppl.push(p); }
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, 1.5], rot: 0, laurel: true });
    const cam = C.dolly(k.camera, { pos: [0, 2.4, 10], look: [0, 1.3, 0], fov: 40 }, { pos: [0, 2.0, 7], look: [0, 1.4, 0], fov: 38 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => { const x0 = -4 + (i % 6) * 1.6; p.position.x = x0 + p.userData.d * t * .8; p.update(t, { pose: 'walk', dist: t * .8 + i, mood: 'neutral' }); });
      cz.position.z = 1.5 + t * .6; cz.update(t, { pose: 'walk', dist: t * .6, mood: 'calm' });
      C.stamp(k.overlay, t, k.meta.seconds * .7); };
  },
  // 3.9 Plan two: a tiny bridge model with tiny men below; X
  '3.9': async k => {
    const d = await tableTop(k);
    const br = bridgeModel(d.M); br.position.set(0, .945, 0); k.scene.add(br); rome.key(k.scene, [.3, 1.12, 1.7], [0, 1.0, 0], { i: 16, angle: .45, soft: .5 }); k.scene.add(real.box(1.6, .005, .5, real.std(0x2a4a5a, { rough: .15 }), { pos: [0, .948, 0] }));
    const men = tinyMen(8); men.position.set(-.05, .95, .3); k.scene.add(men);
    const tiny = tinyMen(1, 0xd8cfc0); tiny.position.set(0, 1.175, 0); k.scene.add(tiny);
    const cam = C.dolly(k.camera, { pos: [.3, 1.45, 1.5], look: [0, 1.05, 0], fov: 40 }, { pos: [.2, 1.3, 1.1], look: [0, 1.05, 0], fov: 38 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); C.stamp(k.overlay, t, k.meta.seconds * .7); };
  },
  // 3.10 Plan three: arena model; X
  '3.10': async k => {
    const d = await tableTop(k);
    const ar = arenaModel(d.M); ar.position.set(0, .945, 0); k.scene.add(ar);
    const men = tinyMen(6, 0x7a5a3a); men.position.set(0, .965, 0); k.scene.add(men);
    rome.key(k.scene, [1.2, 2.2, 1.6], [0, 1.0, 0], { i: 22 }); // warm light across the arcades so the colosseum reads
    const cam = C.dolly(k.camera, { pos: [.95, 1.5, 1.25], look: [0, 1.0, 0], fov: 38 }, { pos: [.55, 1.32, .9], look: [0, 1.0, 0], fov: 36 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); C.stamp(k.overlay, t, k.meta.seconds * .6); };
  },
  // 3.11 the calendar for MARTIUS, the 15th circled in red; push in on the circle
  '3.11': async k => {
    const d = await rome.domus(k, { room: 'study' });
    const pg = new THREE.Mesh(new THREE.PlaneGeometry(.64, .8), new THREE.MeshStandardMaterial({ map: calendarTex('MARTIUS', 'the Ides fall on the 15th', { circle: 15 }), roughness: .8 }));
    pg.position.set(0, 1.8, -4.42); k.scene.add(pg); k.scene.add(real.box(.74, .9, .03, d.M.wood, { pos: [0, 1.8, -4.45] }));
    rome.key(k.scene, [.6, 2.8, -2.4], [0, 1.8, -4.4], { i: 18, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.8, -2.8], look: [0, 1.8, -4.4], fov: 38 }, { pos: [-.04, 1.79, -3.85], look: [-.06, 1.77, -4.4], fov: 34 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); };
  },
  // 3.12 MAP: arrows from Rome to Dacia and Parthia
  '3.12': async k => C.mapShot(k, { center: [30, 41], span: [44, 22], size: 3.6, cam: [{ pos: [-1.0, 2.3, 1.0], look: [-.9, .9, -.1], fov: 40 }, { pos: [.6, 2.3, 1.0], look: [.6, .9, -.1], fov: 40 }] }, (m, t) => {
    const D = k.meta.seconds;
    m.dot(...PL.ROME); m.label('ROMA', 12.5, 41.0, 64);
    m.region(REG.dacia, '#3a3a5a', seg(t, .5, 1.5)); m.label('DACIA', 24.5, 46.5, 80, seg(t, .5, 1.5), { italic: true });
    m.region(REG.parthia, '#3a3a5a', seg(t, 1.5, 2.5)); m.label('PARTHIA', 50, 34.5, 80, seg(t, 1.5, 2.5), { italic: true });
    m.route([PL.ROME, [16, 43.5], [20, 45.2], [24, 46]], ease(seg(t, .8, D * .5)), '#8a1a12', 10, true);
    m.route([PL.ROME, [18, 39.5], [26, 38.5], [35, 37.5], [44, 34.5], [49, 34]], ease(seg(t, 1.6, D * .85)), '#8a1a12', 10, true);
  }),
  // 3.13 Caesar at the head of his army, sun behind; slow push
  '3.13': async k => {
    await rome.field(k, { sun: [0, 6, -40], sunI: 4.5, sunColor: 0xffc080, ground: 'forest_ground_04' }); await rome.mats();
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, 0], rot: 0, laurel: true }); rome.legionary(cz, { shield: false });
    const army = []; for (let i = 0; i < 18; i++) { const p = await C.person(k, C.LEG[i % 3], { pos: [(i % 6 - 2.5) * 1.3, 0, -2.5 - Math.floor(i / 6) * 1.8], rot: 0, seed: 800 + i }); rome.legionary(p, {}); army.push(p); }
    const aq = rome.aquila(); aq.position.set(-1.6, 0, -1.8); k.scene.add(aq);
    rome.key(k.scene, [2, 3, 6], [0, 1.6, 0], { i: 120, color: 0xffd0a0 });
    const cam = C.dolly(k.camera, { pos: [.6, 1.2, 6.5], look: [0, 1.7, 0], fov: 40 }, { pos: [.4, 1.35, 4.2], look: [0, 1.75, 0], fov: 36 });
    return (t, u) => { cam(u); cz.update(t, { mood: 'calm', look: Math.sin(t * .3) * .1 }); army.forEach(p => p.update(t, { mood: 'stern' })); };
  },
  // 3.14 the Senate door with a sign: no weapons (crossed-out sword); push in
  '3.14': async k => {
    await rome.courtyard(k, { trees: false });
    const sign = real.m(new THREE.PlaneGeometry(.9, .9), new THREE.MeshStandardMaterial({ map: real.canvasTex(512, 512, (c, W, H) => {
      c.fillStyle = '#e4d8c0'; c.fillRect(0, 0, W, H); c.strokeStyle = '#4a3420'; c.lineWidth = 14; c.strokeRect(14, 14, W - 28, H - 28);
      c.save(); c.translate(W / 2, H / 2); c.rotate(-.7); c.fillStyle = '#3a3a40'; c.fillRect(-18, -170, 36, 260); c.fillRect(-70, 80, 140, 22); c.fillStyle = '#5a3a20'; c.fillRect(-14, 102, 28, 70); c.restore();
      c.strokeStyle = '#b3140e'; c.lineWidth = 34; c.beginPath(); c.arc(W / 2, H / 2, 200, 0, 7); c.stroke(); c.beginPath(); c.moveTo(W / 2 - 140, H / 2 - 140); c.lineTo(W / 2 + 140, H / 2 + 140); c.stroke();
    }), roughness: .7 }), { pos: [2.6, 2.6, -24.8], cast: false }); k.scene.add(sign);
    rome.key(k.scene, [2.6, 4, -20], [2.6, 2.6, -24.8], { i: 80 });
    const cam = C.dolly(k.camera, { pos: [1.2, 2.6, -14], look: [1.2, 2.4, -24.8], fov: 42 }, { pos: [2.4, 2.6, -22.6], look: [2.6, 2.6, -24.8], fov: 36 });
    return (t, u) => { cam(u); };
  },
  // 3.15 nervous senators glance at each other; lateral dolly along the benches
  '3.15': async k => {
    const cu = await rome.curia(k, { shaftI: .1 });
    const ppl = await C.fillBenches(k, cu, { zMin: -6, zMax: 8 });
    const cam = C.dolly(k.camera, { pos: [-1.5, 1.6, 6], look: [-6.4, 1.1, 4], fov: 40 }, { pos: [-1.5, 1.6, -3], look: [-6.4, 1.1, -5], fov: 40 });
    return (t, u) => { cam(u); ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .5, arm: 'lap', mood: i % 3 ? 'worried' : 'stern', look: Math.sin(t * 1.3 + i * 2.1) * .6 })); };
  },
};
