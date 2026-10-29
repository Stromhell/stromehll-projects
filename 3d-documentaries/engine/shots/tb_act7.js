// Operation Thunderbolt · Act 7 · FOUR HERCULES
import { core, props, people, maps, ui, THREE, mapShot, place, interior, commando, hijacker, yoni, convoy, popIn, airstrip, cardRow } from './tb_common.js';
const P = Math.PI;
const ROUTE = [[34.33, 27.92], [35.2, 25.5], [37.2, 22], [38.8, 18.5], [41.2, 14], [40.4, 9], [37.6, 4], [34.5, .4], [33.2, -.3], [32.44, 0.05]];
const bigMap = (k, cfg) => mapShot(k, { center: [35, 14], span: [26, 32], labels: [['EGYPT', 30, 26], ['SUDAN', 30.5, 15], ['SAUDI ARABIA', 44, 23], ['ETHIOPIA', 39.5, 8.5], ['KENYA', 38, 0.5], ['UGANDA', 32.3, 1.6], ['ISRAEL', 35.2, 31.5]], highlight: ['ISR', 'UGA', 'KEN'], ...cfg });
// cutaway Hercules with cargo
async function cutaway(k, fill) {
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 20, sunPos: [8, 16, 10] }); k.scene.background = new THREE.Color(0x1d1712);
  const hold = new THREE.Group(); k.scene.add(hold);
  const floor = core.box(3.4, .2, 16, 0x5a5848, { pos: [0, 0, 0] }); hold.add(floor);
  const shell = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 16, 28, 1, true, P, P * .5), core.toon(0x6c6a52, { mat: { side: THREE.DoubleSide } })); shell.rotation.x = P / 2; shell.position.y = 1.1; shell.userData.noOutline = true; hold.add(shell);
  for (let z = -7; z <= 7; z += 1.6) { const rib = new THREE.Mesh(new THREE.TorusGeometry(2.3, .05, 6, 24, P * .5), core.toon(0x4a4838)); rib.position.set(0, 1.1, z); rib.rotation.z = P / 2; hold.add(rib); }
  const ramp = core.box(3.2, .15, 3, 0x6c6a52, { pos: [0, -.5, -9.3], rot: [-.35, 0, 0] }); hold.add(ramp);
  await fill(hold);
  const cam = core.camMove(k.camera, { from: [5.2, 4.6, 6.5], to: [4.2, 3.8, 4], look: [0, .9, 0], lookTo: [0, .9, -1.5], fov: 44 });
  return (t, u) => cam(u, t);
}
function seatedRow(hold, n, z0, seed, o = {}) { for (let i = 0; i < n; i++) { const c = commando(seed + i, o); c.state.pose = 'sit'; c.userData.seatY = .4; c.scale.setScalar(.85); const side = i % 2 ? 1 : -1; c.position.set(side * 1.35, .4, z0 + Math.floor(i / 2) * .8); c.rotation.y = -side * P / 2; hold.add(c); } }

export const shots = {
  // hijackers playing cards upstairs in the terminal
  '7.1': async k => {
    interior(k, { w: 8, d: 6, h: 3, wall: 0xcfc2a0, floor: 0x8a7a60, lampI: 22, window: 0x9ab8d0 });
    const tb = props.table(1.4, 1); k.scene.add(tb);
    for (let i = 0; i < 6; i++) k.scene.add(core.box(.12, .005, .17, 0xf2eee4, { pos: [-.4 + i * .16, .825, Math.sin(i) * .15], rot: [0, i, 0], noOutline: true }));
    [[0, -.85, 0], [.95, 0, -P / 2], [-.95, 0, P / 2]].forEach(([x, z, r], i) => { const c = props.chair(); c.position.set(x, 0, z); c.rotation.y = r; k.scene.add(c); place(k.scene, hijacker(1200 + i, { silhouette: false, mood: 'smug' }), { pos: [x, .02, z], rot: r, pose: 'sitDesk' }); });
    const cam = core.camMove(k.camera, { from: [1.8, 1.9, 2.6], to: [1.2, 1.7, 2], look: [0, .9, 0], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // four C-130s lined up at sunset
  '7.2': async k => {
    core.setEnv(k, 'dusk', { fogNear: 120, fogFar: 700, shadowSize: 80 }); k.scene.add(props.ground(0xb8a070, 1600));
    const rw = props.runway(400, 50, { lamps: false }); rw.rotation.y = P / 2; k.scene.add(rw);
    const pl = [0, 1, 2, 3].map(i => { const p = props.c130(); p.position.set(-45 + i * 30, 0, -10); p.rotation.y = .5; k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [-70, 4, 30], to: [-50, 5, 34], look: [-20, 4, -10], lookTo: [10, 4, -10], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // C-130 short landing on a dirt strip, dust cloud
  '7.3': async k => {
    core.setEnv(k, 'day', { fogNear: 120, fogFar: 700, shadowSize: 60 }); k.scene.add(props.ground(0xc8a878, 1600));
    const p = props.c130(); p.rotation.y = P; k.scene.add(p);
    const dust = props.smoke({ color: 0xd8c8a8, n: 14, h: 3, size: 1.6 }); k.scene.add(dust);
    const cam = core.camMove(k.camera, { from: [40, 3, -10], to: [36, 3.5, -16], look: [0, 3, 10], lookTo: [0, 2, -20], fov: 42 });
    return (t, u) => { cam(u, t); const r = core.easeOut(core.seg(t, 0, k.meta.seconds)); p.position.set(0, Math.max(0, 10 * (1 - r * 2)), 80 - r * 100); p.spin(t); dust.position.copy(p.position).add(new THREE.Vector3(0, 0, -10)); dust.visible = r > .5; dust.update(t); };
  },
  // cutaway showing the Mercedes, Land Rovers and soldiers
  '7.4': async k => cutaway(k, async hold => { const cv = convoy(k, { crew: false }); cv.scale.setScalar(.6); cv.position.set(0, .1, -1.6); hold.add(cv); seatedRow(hold, 10, -6.5, 1300); }),
  // map: fuel gauge running down to empty before Israel
  '7.5': async k => bigMap(k, { cities: ['SHARM EL-SHEIKH', 'ENTEBBE'], route: ROUTE, plane: true,
    extra: async (k, map) => { const g = props.gauge('FUEL'); g.scale.setScalar(8); g.rotation.x = -P / 2 + .7; g.position.copy(map.proj(45, 6, 5)); k.scene.add(g); return (t, u, rk) => g.set(.95 - core.ease(core.seg(t, .5, k.meta.seconds - 1)) * .95); } }),
  // Nairobi glows; handshake icon
  '7.6': async k => bigMap(k, { cities: ['ENTEBBE', 'NAIROBI'], route: [[32.44, 0.05], [34.5, -.6], [36.82, -1.29]], routeColor: 0x7ac06a,
    extra: async (k, map) => { const l = new THREE.PointLight(0x9ae08a, 0, 40); l.position.copy(map.proj(36.82, -1.29, 6)); k.scene.add(l); return t => { l.intensity = core.ease(core.seg(t, 1.5, 3)) * 600; ui.chip(k.overlay, 'SECRET DEAL WITH KENYA', 960, 900, t, 2, '#2f7a3a'); }; },
  }),
  // ten soldiers with fuel pumps and hoses
  '7.7': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 12 }); k.scene.background = new THREE.Color(0x2a241c);
    k.scene.add(props.ground(0x6a6450, 60));
    for (let i = 0; i < 10; i++) { const c = place(k.scene, commando(1400 + i, { hat: 'cap' }), { pos: [-4.5 + (i % 5) * 2.2, 0, -1 - Math.floor(i / 5) * 2.2], rot: .1 });
      const pump = core.box(.6, .5, .4, 0xc8302a, { pos: [-4.5 + (i % 5) * 2.2 + .6, .25, -.6 - Math.floor(i / 5) * 2.2] }); k.scene.add(pump);
      const hose = new THREE.Mesh(new THREE.TorusGeometry(.35, .05, 6, 18), core.toon(0x1a1a1a)); hose.rotation.x = P / 2; hose.position.set(pump.position.x + .6, .06, pump.position.z); k.scene.add(hose); }
    const cam = core.camMove(k.camera, { from: [0, 3, 8], to: [0, 2.6, 6.4], look: [0, 1, -2], fov: 44 });
    return (t, u) => cam(u, t);
  },
  // planes take off one by one over the sea
  '7.8': async k => {
    core.setEnv(k, 'dusk', { fogNear: 150, fogFar: 900, shadowSize: 80 });
    const sea = props.ground(0x3a5a7a, 3000); k.scene.add(sea);
    const land = props.ground(0xc8a878, 400); land.position.set(0, .05, 160); k.scene.add(land);
    const pl = [0, 1, 2, 3].map(i => { const p = props.c130(); p.rotation.y = P; k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [60, 6, -40], to: [50, 10, -60], look: [0, 10, 40], lookTo: [0, 20, -80], fov: 42 });
    return (t, u) => { cam(u, t); pl.forEach((p, i) => { const r = core.easeIn(core.seg(t, i * 1.2, i * 1.2 + 5)); p.position.set(i * 3 - 5, 2 + r * 40, 120 - r * 200); p.rotation.x = -r * .15; p.spin(t + i); }); };
  },
  // two 707s high above the C-130s; labels
  '7.9': async k => {
    core.setEnv(k, 'dusk', { fogNear: 200, fogFar: 1200 }); k.scene.add(props.clouds(50, { y: -50, w: 900, d: 900, color: 0xb08a90 }));
    const low = [0, 1, 2, 3].map(i => { const p = props.c130(); p.position.set(i * 22 - 33, 0, -i * 10); p.rotation.y = P; k.scene.add(p); return p; });
    const hi = [0, 1].map(i => { const p = props.airliner({ engines: 4, len: 22, stripe: 0x2f6fe0 }); p.position.set(i * 50 - 25, 40, -60); p.rotation.y = P; k.scene.add(p); return p; });
    const labs = ['HOSPITAL', 'COMMAND'].map((s, i) => { const l = core.textPlane(s, 4, { size: 90, color: '#fff', stroke: '#2b1e16', strokeW: 16 }); l.position.copy(hi[i].position).add(new THREE.Vector3(0, 10, 0)); k.scene.add(l); return l; });
    const cam = core.camMove(k.camera, { from: [0, 6, 90], to: [0, 10, 76], look: [0, 18, -30], fov: 44 });
    return (t, u) => { cam(u, t); low.forEach((p, i) => { p.spin(t + i); p.position.z = -i * 10 - t * 2; }); hi.forEach(p => p.position.z = -60 - t * 2); labs.forEach((l, i) => { l.position.z = -60 - t * 2; l.lookAt(k.camera.position); popIn(l, t, 1 + i * 1.2, 1); }); };
  },
  // route dips; radar circles sweep and miss
  '7.10': async k => bigMap(k, { cities: ['SHARM EL-SHEIKH'], route: ROUTE.slice(0, 6), plane: true,
    extra: async (k, map) => { const rs = [[31.24, 30.04], [32.55, 15.5], [42, 20]].map(([lo, la]) => { const r = maps.radar(14); r.position.copy(map.proj(lo, la, .3)); k.scene.add(r); return r; }); return t => rs.forEach((r, i) => { const s = ((t * .4 + i * .3) % 1); r.scale.setScalar(.2 + s); r.material.opacity = 1 - s; }); } }),
  '7.11': async k => bigMap(k, { cities: ['ENTEBBE', 'NAIROBI'], route: ROUTE.slice(4), plane: true, cam: { from: [4, 60, 70], to: [2, 46, 50], look: [2, 0, 12], lookTo: [0, 0, 20] } }),
  // four plane icons numbered 1 to 4
  '7.12': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 12, sunPos: [2, 8, 8] }); k.scene.background = new THREE.Color(0x1d1712);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), core.toon(0x2e241c)); back.position.z = -1; back.userData.noOutline = true; k.scene.add(back);
    const ps = [0, 1, 2, 3].map(i => { const g = new THREE.Group(); const p = maps.planeIcon({ s: 1.1, color: 0x9a9a7a }); p.rotation.x = -P / 2; g.add(p); const n = core.textPlane(String(i + 1), 1, { size: 120, color: '#e8b321', stroke: '#2b1e16', strokeW: 18 }); n.position.y = -1.8; g.add(n); g.position.set(-5.4 + i * 3.6, .4, 0); k.scene.add(g); return g; });
    const cam = core.camMove(k.camera, { from: [0, 0, 13], to: [0, 0, 11.5], look: [0, 0, 0], fov: 42 });
    return (t, u) => { cam(u, t); ps.forEach((g, i) => popIn(g, t, .3 + i * .35)); };
  },
  // cutaway of plane one: the convoy and the 29 men
  '7.13': async k => cutaway(k, async hold => { const cv = convoy(k, { crew: false }); cv.scale.setScalar(.6); cv.position.set(0, .1, -1.6); hold.add(cv); seatedRow(hold, 12, -6.5, 1500); const y = yoni(); y.state.pose = 'sit'; y.userData.seatY = .4; y.scale.setScalar(.85); y.position.set(-1.35, .4, -7.3); y.rotation.y = P / 2; hold.add(y); }),
  // two brothers in a family photo frame (generic figures)
  '7.14': async k => {
    interior(k, { w: 6, d: 5, h: 3, wall: 0xb8a888, floor: 0x5a4a3a, lampI: 16 });
    const frame = props.card('', { h: 1.6, cw: 800, ch: 1000, bg: '#d8c8a0', draw: (x, c) => { x.fillStyle = '#b8a070'; x.fillRect(40, 40, 720, 920); for (const [cx, sc, col] of [[290, 1, '#6b7044'], [520, .86, '#4c5a78']]) { x.fillStyle = col; x.fillRect(cx - 90 * sc, 600 - 0, 180 * sc, 360); x.fillStyle = '#f7f3ea'; x.beginPath(); x.arc(cx, 470 - (1 - sc) * 120, 110 * sc, 0, P * 2); x.fill(); x.lineWidth = 10; x.strokeStyle = '#2b1e16'; x.stroke(); x.fillStyle = '#2b1e16'; x.fillRect(cx - 35 * sc, 460 - (1 - sc) * 120, 12, 22); x.fillRect(cx + 23 * sc, 460 - (1 - sc) * 120, 12, 22); } x.fillStyle = '#2b1e16'; x.font = '50px Anton'; x.textAlign = 'center'; x.fillText('YONI · BENJAMIN', 400, 920); } });
    frame.position.set(0, 1.6, -2.45); k.scene.add(frame);
    const cam = core.camMove(k.camera, { from: [0, 1.6, 2.4], to: [0, 1.6, 1.4], look: [0, 1.6, -2.45], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // plane two: soldiers with flags pointing to the new terminal
  '7.15': async k => cutaway(k, async hold => { seatedRow(hold, 16, -6.5, 1600); const sign = props.card('→ NEW TERMINAL', { h: .7, cw: 900, ch: 300, size: 90 }); sign.position.set(0, 2.2, -1); hold.add(sign); }),
  // plane three: map arrow to the MiG line
  '7.16': async k => cutaway(k, async hold => { seatedRow(hold, 14, -6.5, 1700); const sign = props.card('→ MiG LINE', { h: .7, cw: 900, ch: 300, size: 90 }); sign.position.set(0, 2.2, -1); hold.add(sign); }),
  // plane four: stretchers and a medic
  '7.17': async k => cutaway(k, async hold => { for (let i = 0; i < 6; i++) { const s = props.stretcher(); s.position.set(i % 2 ? .8 : -.8, .1, -5 + Math.floor(i / 2) * 3); hold.add(s); } const m = commando(1800, { outfit: 'medic', hat: undefined, mood: 'calm' }); m.position.set(0, .1, 2); hold.add(m); }),
};
