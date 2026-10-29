// Caesar · Act 3 · THE CONSPIRACY (no gag stamps: rejected plans are turned face down)
import { core, props, people, maps, ui, THREE, mapShot, place, interior, curia, forum, caesar, senator, brutus, cassius, legionary, horse, ride, statue, scroll, tablet, calendarCard, candleRoom, goblet, popIn } from './cae_common.js';
const P = Math.PI;
// a model on a table that gets turned over / covered when rejected
function rejected(k, build, label) {
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 8, sunPos: [3, 8, 5] }); k.scene.background = new THREE.Color(0x15100e);
  const tb = props.table(3, 2, { color: 0x4a3020 }); k.scene.add(tb);
  const m = new THREE.Group(); m.position.y = .82; k.scene.add(m); build(m);
  const cloth = core.box(2.6, .02, 1.7, 0x3a2a22, { pos: [0, 1.6, 0] }); k.scene.add(cloth);
  const tg = tablet(label, { h: .5, size: 70 }); tg.position.set(1.1, .84, .7); tg.rotation.x = -P / 2 + .2; k.scene.add(tg);
  const cam = core.camMove(k.camera, { from: [0, 2.6, 2.6], to: [0, 2.2, 2], look: [0, .9, 0], fov: 42 });
  return (t, u) => { cam(u, t); const D = k.meta.seconds; const f = core.ease(core.seg(t, D * .6, D * .6 + .8)); cloth.position.y = 1.6 - f * .72; cloth.visible = f > 0; cloth.scale.y = 1; tg.rotation.y = f * P; };
}
export const shots = {
  '3.1': async k => {
    candleRoom(k, { lampI: 3 }); k.scene.children.filter(o => o.isMesh && o.geometry?.type === 'BoxGeometry').length;
    for (let i = 0; i < 40; i++) place(k.scene, senator(900 + i, { silhouette: true }), { pos: [-4 + (i % 10) * .9, 0, -3.4 + Math.floor(i / 10) * .9 + (i % 2) * .2], rot: 0 });
    k.ownTally = true;
    const cam = core.camMove(k.camera, { from: [0, 1.6, 3], to: [0, 4.2, 5.4], look: [0, 1, -2], fov: 46 });
    return (t, u) => { cam(u, t); ui.tally(k.overlay, 'CONSPIRATORS', '60+', 960, 110, t, .4); };
  },
  '3.2': async k => {
    interior(k, { w: 6, d: 5, h: 3.4, wall: 0xcfc2a6, floor: 0x8a7a5a, lampI: 14 });
    const s = place(k.scene, senator(950, { mood: 'sad' }), { pos: [0, 0, -.6], rot: 0, arm: 'hold' });
    const plate = core.cyl(.32, .28, .04, 0xd9b13b, { pos: [0, 1.0, -.2] }); k.scene.add(plate);
    const cam = core.camMove(k.camera, { from: [.6, 1.6, 2.6], to: [.4, 1.5, 1.6], look: [0, 1.25, -.4], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '3.3': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    const c = place(k.scene, caesar({ mood: 'smug' }), { pos: [-2, 0, 0], rot: P / 2, arm: 'hold' });
    const en = [0, 1, 2].map(i => place(k.scene, senator(960 + i, { mood: i ? 'worried' : 'surprised' }), { pos: [0 + i * 1.4, 0, -.2 + i * .3], rot: -P / 2, arm: i === 0 ? 'hold' : undefined }));
    const sc = scroll('PARDONED', { w: .9, size: 120, color: '#b8321f' }); sc.position.set(-.9, 1.3, 0); sc.rotation.y = P / 2; k.scene.add(sc);
    const cam = core.camMove(k.camera, { from: [-2, 1.7, 5.6], to: [2, 1.7, 5.6], look: [-1, 1.3, 0], lookTo: [1.5, 1.3, 0], fov: 42 });
    return (t, u) => { cam(u, t); popIn(sc, t, 1.2); };
  },
  '3.4': async k => {
    interior(k, { w: 6, d: 5, h: 3.4, wall: 0xcfc2a6, floor: 0x8a7a5a, lampI: 14 });
    const s = place(k.scene, senator(970, { mood: 'stern' }), { pos: [0, 0, -.8], rot: 0, arm: 'hold' });
    const tb = tablet('REPUBLIC', { h: .5, size: 110 }); tb.position.set(0, 1.25, -.35); tb.rotation.x = -.25; k.scene.add(tb);
    const cam = core.camMove(k.camera, { from: [0, 1.6, 2.6], to: [0, 1.5, 1.4], look: [0, 1.3, -.4], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '3.5': async k => {
    interior(k, { w: 12, d: 8, h: 4, wall: 0x8a4a3a, floor: 0x5a4030, lampI: 16 });
    const tb = props.table(5, 1.6, { color: 0x5a3a26 }); k.scene.add(tb);
    for (let i = 0; i < 6; i++) { const g = goblet(); g.position.set(-2 + i * .8, .8, (i % 2 ? .4 : -.4)); k.scene.add(g); }
    for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1; place(k.scene, senator(980 + i, { mood: 'stern' }), { pos: [-2 + Math.floor(i / 2) * 2, 0, s * 1.3], rot: s > 0 ? P : 0, pose: 'sitDesk' }); }
    const st = statue(caesar()); st.position.set(0, 0, -3.4); st.scale.setScalar(.8); k.scene.add(st);
    const cam = core.camMove(k.camera, { from: [5, 4.6, 4], to: [3, 3.8, 3.4], look: [0, .8, 0], lookTo: [0, 1.6, -2.4], fov: 44 });
    return (t, u) => cam(u, t);
  },
  '3.6': async k => {
    candleRoom(k, { lampI: 9 });
    const b = place(k.scene, brutus(), { pos: [-.7, 0, 1.4], rot: 0 }), c = place(k.scene, cassius(), { pos: [.7, 0, 1.4], rot: 0 });
    k.anchor = [0, 2.6, 1.4];
    const cam = core.camMove(k.camera, { from: [0, 1.7, 5.4], to: [0, 1.6, 4], look: [0, 1.5, 1.4], fov: 40 });
    return (t, u) => { cam(u, t); [b, c].forEach((p, i) => { const r = core.ease(core.seg(t, .3 + i * .4, 1.3 + i * .4)); p.position.z = .6 + r * .8; p.update(t, { pose: r < 1 ? 'walk' : 'stand', dist: r }); }); };
  },
  '3.7': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 8, sunPos: [3, 8, 5] }); k.scene.background = new THREE.Color(0x15100e);
    const tb = props.table(3, 2, { color: 0x4a3020 }); k.scene.add(tb);
    const mp = props.card('ROMA', { h: 1.4, cw: 1000, ch: 700, size: 70, bg: '#e8dcbc', draw: x => { x.strokeStyle = '#6a4a2a'; x.lineWidth = 6; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(60 + i * 80, 60); x.lineTo(80 + i * 70, 640); x.stroke(); } x.strokeStyle = '#3a7ab0'; x.lineWidth = 30; x.beginPath(); x.moveTo(700, 0); x.bezierCurveTo(620, 300, 800, 400, 720, 700); x.stroke(); } });
    mp.rotation.x = -P / 2; mp.position.set(-.3, .83, 0); k.scene.add(mp);
    ['VIA SACRA', 'BRIDGE', 'GAMES'].forEach((s, i) => { const t = tablet(s, { h: .32, size: 80 }); t.rotation.x = -P / 2; t.position.set(1.05, .84, -.6 + i * .6); k.scene.add(t); });
    const cam = core.camMove(k.camera, { from: [0, 4.6, .4], to: [0, 3.4, .3], look: [0, .8, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '3.8': async k => rejected(k, m => { for (let i = 0; i < 8; i++) m.add(core.box(.3, .3 + (i % 3) * .1, .3, 0xd8ccb0, { pos: [-1 + i * .3, .15, -.4] })); m.add(core.box(2.4, .01, .4, 0xb8a888, { pos: [0, .005, .1] })); }, 'VIA SACRA'),
  '3.9': async k => rejected(k, m => { m.add(core.box(2.2, .06, .4, 0xb8a888, { pos: [0, .3, 0] })); for (const x of [-.8, 0, .8]) m.add(core.box(.1, .3, .4, 0xb8a888, { pos: [x, .15, 0] })); m.add(core.box(2.6, .01, .9, 0x3a7ab0, { pos: [0, .005, 0] })); }, 'BRIDGE'),
  '3.10': async k => rejected(k, m => { const a = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, .35, 32, 1, true), core.toon(0xd8ccb0, { mat: { side: THREE.DoubleSide } })); a.scale.z = .7; a.position.y = .17; m.add(a); m.add(core.cyl(.75, .75, .01, 0xc8b080, { pos: [0, .01, 0], scale: [1, 1, .7] })); }, 'GAMES'),
  '3.11': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x2a2018);
    const c = calendarCard('MARTIUS', { circle: 15 }); k.scene.add(c);
    const cam = core.camMove(k.camera, { from: [0, 0, 3.6], to: [.2, -.3, 2.2], look: [0, 0, 0], lookTo: [.2, -.2, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '3.12': async k => mapShot(k, { center: [28, 42], span: [44, 24], hlColor: '#b8402e', labels: [['ROME', 12.5, 41.9], ['DACIA', 25, 46], ['PARTHIA', 50, 34]], highlight: ['ITA', 'FRA', 'ESP', 'GRC', 'TUR'], cities: ['ROME'],
    extra: async (k, map) => { const r1 = maps.ribbon(map, [[12.5, 41.9], [18, 44], [25, 46]], { color: 0xb8321f }), r2 = maps.ribbon(map, [[12.5, 41.9], [24, 38], [38, 37], [50, 34]], { color: 0xb8321f }); k.scene.add(r1, r2); return (t, u, rk) => { r1.set(rk); r2.set(rk); }; } }),
  '3.13': async k => {
    core.setEnv(k, 'dusk', { fogNear: 40, fogFar: 300, shadowSize: 40 }); k.scene.add(props.ground(0xa89060, 600));
    const h = horse(0xe8e2d4); h.position.set(0, 0, 0); k.scene.add(h); ride(h, caesar());
    for (let i = 0; i < 24; i++) place(k.scene, legionary(1000 + i), { pos: [-5 + (i % 6) * 2, 0, -4 - Math.floor(i / 6) * 2], rot: 0 });
    const cam = core.camMove(k.camera, { from: [2.5, 1.6, 7], to: [1.8, 1.8, 5], look: [0, 2.4, 0], fov: 42 });
    return (t, u) => { cam(u, t); h.walk(t * .5); };
  },
  '3.14': async k => {
    forum(k, { env: 'day', templeZ: -10 });
    const sign = props.card('', { h: 1, cw: 600, ch: 600, bg: '#efe2c0', draw: x => { x.fillStyle = '#6a6a6a'; x.save(); x.translate(300, 300); x.rotate(-.8); x.fillRect(-20, -200, 40, 340); x.fillRect(-80, 100, 160, 30); x.restore(); x.strokeStyle = '#b8321f'; x.lineWidth = 34; x.beginPath(); x.arc(300, 300, 230, 0, P * 2); x.stroke(); x.beginPath(); x.moveTo(140, 140); x.lineTo(460, 460); x.stroke(); } });
    sign.position.set(4, 3.2, -9.4); k.scene.add(sign);
    const cam = core.camMove(k.camera, { from: [4, 2.4, 0], to: [4, 3, -6], look: [4, 3, -9.4], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '3.15': async k => {
    const cu = curia(k, { n: 30, mood: 'worried' });
    const cam = core.camMove(k.camera, { from: [-5.2, 2.8, 13.5], to: [-5.2, 2.6, 10], look: [-6, 1.2, -6], fov: 44 });
    return (t, u) => { cam(u, t); cu.sen.forEach((s, i) => { s.parts.head.rotation.y = Math.sin(t * 1.2 + i * 1.7) * .5; }); };
  },
};
