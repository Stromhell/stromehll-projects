// Caesar · Act 1 · TOO POWERFUL
import { core, props, people, maps, ui, THREE, mapShot, place, interior, curia, forum, caesar, senator, legionary, citizen, horse, ride, steps, chest, scroll, goldChair, popIn } from './cae_common.js';
const P = Math.PI;
const MED = { hlColor: '#b8402e', center: [12, 42], span: [34, 22], labels: [['ITALY', 12.5, 43.2], ['GAUL', 2.5, 46.8], ['HISPANIA', -4, 40], ['GREECE', 22, 39.3], ['EGYPT', 29, 27], ['AFRICA', 9, 33.5]] };
const GAUL = ['FRA', 'BEL', 'CHE', 'LUX'];
const ROMAN = ['ITA', 'ESP', 'PRT', 'GRC', 'TUN', 'ALB', 'MKD', 'HRV', 'SVN', 'MNE', 'BIH', 'TUR', 'SYR', 'LBN', 'ISR'];
// a flat letter icon
const letter = () => { const c = props.card('', { h: 1.4, cw: 400, ch: 280, bg: '#efe2c0', draw: x => { x.strokeStyle = '#2b1e16'; x.lineWidth = 12; x.beginPath(); x.moveTo(10, 10); x.lineTo(200, 160); x.lineTo(390, 10); x.stroke(); x.fillStyle = '#b8321f'; x.beginPath(); x.arc(200, 170, 34, 0, P * 2); x.fill(); } }); c.rotation.x = -P / 2 + .5; return c; };

export const shots = {
  '1.1': async k => {
    const cu = curia(k, { n: 0, senators: false });
    const yc = place(k.scene, people.person({ outfit: 'toga', seed: 102, hair: 0x2b1e16, mood: 'calm' }), { pos: [0, 0, cu.chairPos.z + 3], rot: 0 });
    const cam = core.camMove(k.camera, { from: [0, 2.4, cu.chairPos.z + 9], to: [0, 1.8, cu.chairPos.z + 6], look: [0, 1.4, cu.chairPos.z + 2], fov: 40 });
    return (t, u) => { cam(u, t); popIn(yc, t, .4 * k.meta.seconds, 1); };
  },
  '1.2': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x2a2018);
    const titles = ['QUAESTOR', 'AEDILE', 'PRAETOR', 'GOVERNOR', 'CONSUL'];
    titles.forEach((s, i) => { const st = core.box(3, .5, 1.4, 0xe2d8c2, { pos: [0, .25 + i * .5, -i * 1.4] }); k.scene.add(st); for (let j = i; j < titles.length; j++) {} const l = core.textPlane(s, .32, { size: 90, color: i === 4 ? '#b8321f' : '#2b1e16' }); l.position.set(0, .51 + i * .5, -i * 1.4 + .71); k.scene.add(l); });
    for (let i = 0; i < 5; i++) k.scene.add(core.box(3, .5 * i + .01, 1.4, 0xd8ccb4, { pos: [0, (.5 * i) / 2, -i * 1.4] }));
    const c = place(k.scene, people.person({ outfit: 'toga', border: 0x6a2a6a, seed: 102, hair: 0x2b1e16 }), { pos: [0, .5, 0], rot: P });
    const cam = core.camMove(k.camera, { from: [4, 1.2, 4], to: [4, 4.4, -1], look: [0, 1.2, -1], lookTo: [0, 3, -5], fov: 44 });
    return (t, u) => { cam(u, t); const s = core.clamp(t / (k.meta.seconds * .9)) * 4; const i = Math.floor(s), f = s - i; c.position.set(0, .5 + Math.min(4, i + core.ease(f)) * .5, -Math.min(4, s) * 1.4); c.update(t, { pose: s < 4 ? 'walk' : 'stand', arm: s >= 4 ? 'raise' : undefined, dist: s * 1.4 }); };
  },
  '1.3': async k => mapShot(k, { ...MED, highlight: ['ITA'], extra: async (k, map) => {
    const tint = await maps.parchment({ center: MED.center, span: MED.span, k: 4, highlight: ['ITA', ...GAUL], hlColor: '#b8402e', labels: MED.labels }); tint.position.y = .02; tint.visible = false; k.scene.add(tint);
    return (t, u) => { tint.visible = t > k.meta.seconds * .35; ui.chip(k.overlay, 'GAUL CONQUERED · 58 TO 50 BC', 960, 120, t, k.meta.seconds * .4, '#a8322a'); }; } }),
  '1.4': async k => {
    core.setEnv(k, 'day', { fogNear: 60, fogFar: 300, shadowSize: 50 }); k.scene.add(props.ground(0x9a9a6a, 600));
    const L = []; for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) L.push(place(k.scene, legionary(500 + r * 12 + i), { pos: [-13 + i * 2.2, 0, -r * 2], rot: 0 }));
    const c = place(k.scene, caesar(), { pos: [0, 0, 3], rot: P });
    const std = new THREE.Group(); std.add(core.cyl(.05, .05, 4, 0x8a6a3a, { pos: [0, 2, 0] })); std.add(core.box(.8, 1, .05, 0xa8322a, { pos: [0, 3.3, 0] })); std.position.set(9, 0, 6); k.scene.add(std);
    const cam = core.camMove(k.camera, { from: [-14, 2, 9], to: [12, 2, 9], look: [-13, 1.2, -1], lookTo: [11, 1.2, -1], fov: 44 });
    return (t, u) => { cam(u, t); L.forEach((p, i) => { const turn = core.ease(core.seg(t, .4 + (i % 12) * .18, .9 + (i % 12) * .18)); p.rotation.y = turn * .35 * Math.sign(-p.position.x || 1); p.update(t + i, { arm: turn > .5 ? 'raise' : undefined }); }); };
  },
  '1.5': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    const ch = chest(1); ch.position.set(0, 0, 2); k.scene.add(ch);
    const crowd = []; for (let i = 0; i < 30; i++) crowd.push(place(k.scene, citizen(600 + i, { mood: 'calm' }), { pos: [-7 + (i % 10) * 1.5, 0, -3 - Math.floor(i / 10) * 1.6], rot: 0 }));
    const coins = []; for (let i = 0; i < 18; i++) { const c = core.cyl(.08, .08, .02, 0xe8b321, { noOutline: true }); k.scene.add(c); coins.push(c); }
    const cam = core.camMove(k.camera, { from: [0, 1.4, 8], to: [0, 1.6, 4.4], look: [0, 1, 0], lookTo: [0, 1.6, -6], fov: 46 });
    return (t, u) => { cam(u, t); coins.forEach((c, i) => { const ph = (t * .8 + i / 18) % 1; c.position.set(Math.sin(i) * .4, 3 - ph * 2.4, 2 + Math.cos(i) * .2); c.rotation.x = t * 5 + i; }); crowd.forEach((p, i) => p.update(t + i, { arm: Math.sin(t * 3 + i) > 0 ? 'raise' : 'wave' })); };
  },
  '1.6': async k => {
    interior(k, { w: 8, d: 6, h: 4, wall: 0xcfc2a6, floor: 0x9a8a6a, lampI: 10, window: 0x9ab8d0, winX: 0 });
    const s = place(k.scene, senator(160, { mood: 'stern', hair: 0xd8d8d8 }), { pos: [.4, 0, -.6], rot: P - .3 });
    const cam = core.camMove(k.camera, { from: [-.9, 1.75, -2.5], to: [-.5, 1.7, -2.1], look: [.4, 1.6, -.6], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '1.7': async k => mapShot(k, { ...MED, highlight: ['ITA', ...GAUL], cities: ['ROME'], route: [[12.5, 41.9], [10, 44.5], [6, 46.5], [4.5, 47.5]], routeColor: 0xb8321f,
    extra: async (k, map) => { const l = letter(); k.scene.add(l); return (t, u, rk) => { const p = map.proj(12.5 + (4.5 - 12.5) * rk, 41.9 + (47.5 - 41.9) * rk, 2.5); l.position.copy(p); }; } }),
  '1.8': async k => {
    interior(k, { w: 12, d: 9, h: 5, wall: 0xcfc2a6, floor: 0x9a8a6a, lampI: 16 });
    const b = core.box(2.4, .45, .7, 0x6a4a2a, { pos: [0, .225, -1] }); k.scene.add(b);
    const pros = [0, 1, 2].map(i => place(k.scene, senator(170 + i, { mood: 'smug' }), { pos: [-3 + i * 1.1, 0, 1.8], rot: P - .5 + i * .2, arm: i === 1 ? 'folded' : undefined }));
    const cam = core.camMove(k.camera, { from: [4.5, 1.9, 5], to: [3.6, 1.7, 4], look: [-1, .9, 0], fov: 44 });
    return (t, u) => cam(u, t);
  },
  '1.9': async k => mapShot(k, { center: [12, 44], span: [6, 4], k: 4, labels: [['ITALY', 12.6, 43], ['GAUL (CISALPINE)', 10.5, 45.2]], highlight: ['ITA'], cities: ['RAVENNA', 'RIMINI', 'ROME'],
    extra: async (k, map) => { const pts = [[12.0, 44.1], [12.3, 44.05], [12.5, 44.0]].map(([a, b]) => map.proj(a, b, .15)); const curve = new THREE.CatmullRomCurve3(pts); const riv = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, .7, 8), core.toon(0x3a7ab0)); riv.userData.noOutline = true; k.scene.add(riv);
      const leg = maps.pin(0xa8322a); leg.scale.setScalar(.6); k.scene.add(leg);
      return (t, u) => { const r = core.ease(core.seg(t, 1.2, k.meta.seconds - 1)); leg.position.copy(map.proj(12.15 + r * .25, 44.35 - r * .55, 0)); }; } }),
  '1.10': async k => {
    core.setEnv(k, 'dawn', { fogNear: 20, fogFar: 120, shadowSize: 30 }); k.scene.add(props.ground(0x6a7a4a, 400));
    const water = new THREE.Mesh(new THREE.PlaneGeometry(400, 10), core.toon(0x4a7a9a, { mat: { transparent: true, opacity: .85 } })); water.rotation.x = -P / 2; water.position.y = .35; water.userData.noOutline = true; k.scene.add(water);
    const h = horse(0xe8e2d4); k.scene.add(h); ride(h, caesar());
    const legion = []; for (let i = 0; i < 16; i++) legion.push(place(k.scene, legionary(700 + i), { pos: [0, 0, 0] }));
    const cam = core.camMove(k.camera, { from: [3.5, .5, 4], to: [3, .6, 2], look: [0, 2.2, -2], fov: 46 });
    return (t, u) => { cam(u, t); const d = t * .9; h.position.set(0, 0, -2 + d * .4); h.rotation.y = 0; h.walk(d); legion.forEach((p, i) => { p.position.set(-3 + (i % 4) * 2, 0, -6 - Math.floor(i / 4) * 2 + d * .4); p.update(t + i, { pose: 'walk', dist: d }); }); };
  },
  '1.11': async k => mapShot(k, { ...MED, highlight: ['ITA', ...GAUL, 'ESP'], cities: ['PHARSALUS', 'ALEXANDRIA'], route: [[22.38, 39.3], [24, 36], [27, 33], [29.92, 31.2]], routeColor: 0x2b1e16,
    extra: async (k, map) => { const b = maps.boatIcon({ s: 1.6 }); k.scene.add(b); const f = props.flash(0xffd890, 2); f.position.copy(map.proj(22.38, 39.3, 1)); k.scene.add(f); return (t, u, rk) => { f.pulse(t < 1.5 ? Math.max(0, 1 - Math.abs(t - .8) * 2) : 0); b.position.copy(map.proj(22.38 + (29.92 - 22.38) * rk, 39.3 + (31.2 - 39.3) * rk, .6)); b.visible = rk < .97; }; } }),
  '1.12': async k => mapShot(k, { ...MED, highlight: ['ITA', ...GAUL, 'ESP', 'PRT', 'GRC', 'TUN', 'ALB', 'MKD', 'TUR', 'SYR', 'EGY'], cities: ['MUNDA', 'ROME'],
    hlColor: '#b8402e' }),
  '1.13': async k => {
    const cu = curia(k, { n: 22 });
    cu.sen.forEach(s => s.state.arm = 'raise');
    const sc = scroll('DICTATOR\nPERPETUO', { w: 2.4, size: 110 }); sc.position.set(0, 3, cu.chairPos.z + 3.5); k.scene.add(sc);
    const cam = core.camMove(k.camera, { from: [0, 3, cu.chairPos.z + 12], to: [0, 3, cu.chairPos.z + 7], look: [0, 2.8, cu.chairPos.z + 3.5], fov: 44 });
    return (t, u) => { cam(u, t); sc.sheet.scale.y = Math.max(.02, core.ease(core.seg(t, .5, 2))); };
  },
};
