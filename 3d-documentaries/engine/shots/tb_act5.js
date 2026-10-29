// Operation Thunderbolt · Act 5 · THE WAR ROOM
import { core, props, people, maps, ui, THREE, mapShot, place, interior, amin, rabin, peres, barlev, popIn, warRoom, bubble, hijacker, hall } from './tb_common.js';
const P = Math.PI;
function office(k, o = {}) {
  interior(k, { w: 8, d: 7, h: 3.4, wall: o.wall ?? 0xb8ae94, floor: 0x5a4a3a, lampI: 22, bg: 0x1a1612, window: o.window ?? 0x1a2236, winX: 2 });
  const desk = props.table(1.8, .9, { color: 0x5a3a26 }); k.scene.add(desk);
  const c = props.chair(); c.position.set(0, 0, -.8); k.scene.add(c);
  return desk;
}
export const shots = {
  // night in Tel Aviv, a lit government building
  '5.1': async k => {
    core.setEnv(k, 'night', { fogNear: 80, fogFar: 500 }); k.scene.add(props.ground(0x4a5048, 800));
    const gb = props.govBuilding({ night: true }); gb.position.set(0, 0, -20); k.scene.add(gb);
    for (let i = 0; i < 6; i++) { const b = props.govBuilding({ night: true, seed: i + 10 }); b.scale.set(.5, .6 + (i % 3) * .3, .6); b.position.set(-70 + i * 28, 0, -60 - (i % 2) * 20); k.scene.add(b); }
    for (let i = 0; i < 8; i++) { const l = new THREE.PointLight(0xffd890, 10, 14); l.position.set(-18 + i * 5, 4, -10); k.scene.add(l); }
    const cam = core.camMove(k.camera, { from: [0, 2, 36], to: [0, 6, 26], look: [0, 8, -20], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // war room, figures around a long table
  '5.2': async k => {
    warRoom(k, { night: true });
    const cam = core.camMove(k.camera, { from: [-6, 3.4, 5], to: [-3.5, 2.8, 4], look: [0, 1, 0], fov: 44 });
    return (t, u) => cam(u, t);
  },
  // analyst pins photos and drawings to a wall board
  '5.3': async k => {
    interior(k, { w: 10, d: 7, h: 3.6, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 24 });
    const board = core.box(4.6, 2.2, .08, 0xb89a6a, { pos: [0, 1.9, -3.4] }); k.scene.add(board);
    const pins = []; const items = ['ENTEBBE', 'HALL', 'TOWER', 'RUNWAY', 'DOOR', 'GUARDS'];
    items.forEach((s, i) => { const c = props.card(s, { h: .5, cw: 500, ch: 380, size: 70 }); c.position.set(-1.8 + (i % 3) * 1.8, 2.4 - Math.floor(i / 3) * .9, -3.34); c.rotation.z = (i % 2 ? .06 : -.05); k.scene.add(c); pins.push(c); });
    const an = place(k.scene, people.person({ outfit: 'olive', seed: 720, mood: 'stern', hair: 0x2b1e16, glasses: true }), { pos: [1.5, 0, -2.4], rot: P - .3, arm: 'point' });
    const cam = core.camMove(k.camera, { from: [-2, 1.8, 3], to: [-1.2, 1.8, 2], look: [0, 1.9, -3.4], fov: 42 });
    return (t, u) => { cam(u, t); pins.forEach((c, i) => popIn(c, t, .3 + i * .45)); };
  },
  // map: line from Tel Aviv to Paris
  '5.4': async k => mapShot(k, {
    center: [19, 41], span: [40, 24], k: 4, labels: [['FRANCE', 2.5, 46.5], ['ITALY', 12.5, 43], ['ISRAEL', 36, 30.4], ['GREECE', 22.3, 39.6], ['TURKEY', 34, 39]],
    highlight: ['ISR', 'FRA'], cities: ['TEL AVIV', 'PARIS'], route: [[34.78, 32.08], [27, 37], [16, 43], [8, 46.5], [2.35, 48.86]], plane: true,
  }),
  // interview room in Paris; a released hostage draws a sketch of the hall
  '5.5': async k => {
    const desk = office(k, { window: 0x9ab8d0 });
    const paper = core.box(.6, .01, .45, 0xf2eee4, { pos: [0, .83, .05], noOutline: true }); k.scene.add(paper);
    const lines = new THREE.Group(); lines.position.set(0, .845, .05); k.scene.add(lines);
    for (let i = 0; i < 8; i++) { const l = core.box(i < 4 ? .5 : .02, .005, i < 4 ? .01 : .35, 0x2b1e16, { pos: [i < 4 ? 0 : -.24 + (i - 4) * .16, 0, i < 4 ? -.17 + i * .11 : 0], noOutline: true }); lines.add(l); }
    const h = place(k.scene, people.person({ outfit: 'civil3', seed: 730, mood: 'calm', hair: 0x5a3a22 }), { pos: [0, .02, -.75], rot: 0, pose: 'sitDesk' });
    const c2 = props.chair(); c2.position.set(.3, 0, 1.2); c2.rotation.y = P; k.scene.add(c2);
    const ag = place(k.scene, people.person({ outfit: 'suit', seed: 731, mood: 'stern', hair: 0x2b1e16 }), { pos: [.3, .02, 1.15], rot: P, pose: 'sitDesk' });
    const cam = core.camMove(k.camera, { from: [1.8, 1.9, .8], to: [1.3, 1.8, .5], look: [0, .9, .05], fov: 42 });
    return (t, u) => { cam(u, t); lines.children.forEach((l, i) => l.visible = t > .5 + i * .45); };
  },
  // phones connect between Washington and Cairo
  '5.6': async k => mapShot(k, {
    center: [8, 34], span: [70, 36], k: 2.6, labels: [['EGYPT', 29.5, 26.5], ['ISRAEL', 35.6, 31.2]], highlight: ['EGY', 'ISR'],
    cities: [['WASHINGTON', { label: true }], 'CAIRO'], route: [[-12, 40], [5, 42], [20, 37], [31.24, 30.04]], routeColor: 0x7aa0d8, plane: false,
    extra: async (k, map) => { const ph = [map.proj(-12, 40, 2), map.proj(31.24, 30.04, 2)].map(p => { const f = props.phone({ color: 0x2a2a2a }); f.scale.setScalar(12); f.position.copy(p); k.scene.add(f); return f; }); return t => ph.forEach((f, i) => { popIn(f, t, .3 + i * 1.6, 12); f.rotation.z = Math.sin(t * 20) * .05 * (t % 1 < .5 ? 1 : 0); }); },
  }),
  // an envoy at the terminal door; the door stays shut
  '5.7': async k => {
    core.setEnv(k, 'day', { fogNear: 80, fogFar: 400 }); k.scene.add(props.ground(0x9a9478, 600));
    const term = props.terminal({ len: 40 }); term.position.set(0, 0, -7); k.scene.add(term);
    const d = props.door({ color: 0x6a5a48 }); d.position.set(0, 0, .2); d.scale.setScalar(1.3); k.scene.add(d);
    const e = place(k.scene, people.person({ outfit: 'suit', seed: 740, mood: 'worried', hair: 0x2b1e16, moustache: true }), { pos: [.2, 0, 2.2], rot: P, arm: 'raise' });
    const cam = core.camMove(k.camera, { from: [3, 1.8, 7], to: [2.2, 1.7, 5.6], look: [0, 1.5, .5], fov: 40 });
    return (t, u) => { cam(u, t); e.update(t, { arm: t % 1.6 < .4 ? 'point' : null }); };
  },
  // Bar-Lev at a desk with a rotary phone; callout
  '5.8': async k => {
    office(k); const ph = props.phone(); ph.position.set(.5, .82, .1); k.scene.add(ph);
    const b = place(k.scene, barlev(), { pos: [0, .02, -.75], rot: 0, pose: 'sitDesk', arm: 'phone' });
    k.anchor = [0, 2.4, -.75];
    const cam = core.camMove(k.camera, { from: [1.6, 1.5, 2.4], to: [1.1, 1.5, 1.9], look: [0, 1.3, -.6], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // a golden medal spins in a thought bubble over the phone
  '5.9': async k => {
    office(k); const ph = props.phone(); ph.position.set(.5, .82, .1); k.scene.add(ph);
    const b = place(k.scene, barlev(), { pos: [0, .02, -.75], rot: 0, pose: 'sitDesk', arm: 'phone' });
    const bub = bubble('', { thought: true, w: 2 }); bub.position.set(-.9, 2.7, -.6); k.scene.add(bub);
    const medal = new THREE.Group(); medal.add(core.cyl(.32, .32, .06, 0xe8b321, { rot: [P / 2, 0, 0], seg: 32 })); medal.add(core.box(.18, .4, .02, 0x2f6fe0, { pos: [0, .38, -.02] })); core.outline(medal, .02); medal.position.set(-.9, 2.78, -.5); k.scene.add(medal);
    k.chipPos = [960, 900];
    const cam = core.camMove(k.camera, { from: [1.4, 1.8, 3], to: [1, 1.9, 2.4], look: [-.3, 1.9, -.6], fov: 42 });
    return (t, u) => { cam(u, t); popIn(bub, t, .4, 1); popIn(medal, t, .7, 1); medal.rotation.y = t * 2; bub.lookAt(k.camera.position); };
  },
  // Amin on the other end of the line, shrugging
  '5.10': async k => {
    interior(k, { w: 9, d: 7, h: 3.6, wall: 0x6a7a4a, floor: 0x5a4a3a, lampI: 22 });
    const desk = props.table(2.2, 1, { color: 0x6a4a2a }); k.scene.add(desk); const ph = props.phone({ color: 0xd8d0b8 }); ph.position.set(.6, .82, .1); k.scene.add(ph);
    const ug = props.flag(['#111111', '#f4c400', '#d21f1f', '#111111', '#f4c400', '#d21f1f'], { pole: 2.6 }); ug.position.set(-2, 0, -2.6); k.scene.add(ug);
    const a = place(k.scene, amin({ mood: 'smug' }), { pos: [0, 0, -1], rot: 0, arm: 'phone' });
    const cam = core.camMove(k.camera, { from: [-1.2, 1.9, 3.4], to: [-.8, 1.9, 2.8], look: [0, 1.7, -1], fov: 40 });
    return (t, u) => { cam(u, t); ug.wave(t); a.update(t, { arm: t > 2 && t < 3.5 ? 'raise' : 'phone' }); };
  },
  // crowd with placards outside a government building
  '5.11': async k => {
    core.setEnv(k, 'day', { fogNear: 80, fogFar: 500 }); k.scene.add(props.ground(0x9a9480, 800));
    const gb = props.govBuilding(); gb.position.set(0, 0, -12); k.scene.add(gb);
    const crowd = people.crowd(28, { cols: 7, face: P, seed: 9, mood: 'worried' }); crowd.position.set(0, 0, 0); k.scene.add(crowd);
    crowd.people.forEach((p, i) => { if (i % 3) return; const sign = props.card(['BRING THEM HOME', 'SAVE OUR FAMILIES', 'DO SOMETHING'][i % 3], { h: .6, cw: 700, ch: 380, size: 70 }); sign.position.set(0, 2.6, 0); p.add(sign); p.state.arm = 'raise'; });
    const cam = core.camMove(k.camera, { from: [8, 4, 14], to: [5, 3.4, 11], look: [0, 1.8, -4], fov: 42 });
    return (t, u) => { cam(u, t); crowd.people.forEach((p, i) => { p.position.z += Math.sin(t * 2 + i) * .002; }); };
  },
  // TV set showing family members; placard
  '5.12': async k => {
    interior(k, { w: 8, d: 6, h: 3.2, wall: 0xc8b890, floor: 0x6a5440, lampI: 12 });
    const t1 = props.tv(); t1.scale.setScalar(1.6); k.scene.add(t1);
    const scr = props.card('BRING THEM HOME', { h: .85, cw: 800, ch: 600, size: 90, bg: '#cfd8dc', draw: (x, c) => { for (let i = 0; i < 3; i++) { x.fillStyle = '#f7f3ea'; x.beginPath(); x.arc(200 + i * 200, 420, 70, 0, P * 2); x.fill(); x.strokeStyle = '#2b1e16'; x.lineWidth = 8; x.stroke(); x.fillStyle = '#2b1e16'; x.fillRect(178 + i * 200, 410, 10, 18); x.fillRect(212 + i * 200, 410, 10, 18); } } });
    scr.position.set(-.08, 1.47, .6); k.scene.add(scr);
    const sofa = core.box(2.4, .5, .9, 0x7a4a3a, { pos: [0, .25, 3] }); k.scene.add(sofa);
    const cam = core.camMove(k.camera, { from: [0, 1.6, 4.6], to: [0, 1.55, 3.4], look: [0, 1.45, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // Rabin at the head of the table; callout
  '5.13': async k => {
    warRoom(k, { n: 6 });
    const r = place(k.scene, rabin(), { pos: [3.6, 0, 0], rot: -P / 2 }); k.anchor = [3.6, 2.6, 0];
    const cam = core.camMove(k.camera, { from: [-.5, 1.9, 2.6], to: [.4, 1.85, 2.2], look: [3.6, 1.6, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // Peres stands across the table; callout
  '5.14': async k => {
    warRoom(k, { n: 6 });
    place(k.scene, rabin(), { pos: [3.6, 0, 0], rot: -P / 2 });
    const pe = place(k.scene, peres(), { pos: [-3.6, 0, 0], rot: P / 2, arm: 'point' }); k.anchor = [-3.6, 2.6, 0];
    const cam = core.camMove(k.camera, { from: [.5, 1.9, 2.6], to: [-.4, 1.85, 2.2], look: [-3.6, 1.6, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // both men look at an empty map on the table
  '5.15': async k => {
    interior(k, { w: 12, d: 9, h: 4, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 20 });
    const tb = props.table(3, 1.6, { color: 0x5a3a26 }); k.scene.add(tb);
    const mp = core.box(2.2, .01, 1.2, 0xe8dcbc, { pos: [0, .83, 0], noOutline: true }); k.scene.add(mp);
    place(k.scene, rabin(), { pos: [-.8, 0, -1.3], rot: .3 }); place(k.scene, peres(), { pos: [.8, 0, -1.3], rot: -.3 });
    const cam = core.camMove(k.camera, { from: [0, 3.2, 2.6], to: [0, 2.8, 2.0], look: [0, .9, -.3], fov: 42 });
    return (t, u) => cam(u, t);
  },
};
