// Caesar · Act 6 · THE WARNINGS
import { core, props, people, ui, THREE, place, interior, curia, forum, caesar, senator, decimus, calpurnia, spurinna, citizen, altar, hourglass, goblet, calendarCard, scroll, bubble, popIn } from './cae_common.js';
const P = Math.PI;
const house = (k, o = {}) => interior(k, { w: 9, d: 7, h: 3.6, wall: o.wall ?? 0xb8604a, floor: 0x8a6a4a, lampI: o.lampI ?? 16, window: o.window, bg: 0x15100e });
export const shots = {
  '6.1': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 6 }); k.scene.background = new THREE.Color(0x15100e);
    const h = hourglass(); k.scene.add(h);
    const cam = core.camMove(k.camera, { from: [0, .8, 3], to: [0, .75, 2.2], look: [0, .7, 0], fov: 40 });
    return (t, u) => { cam(u, t); h.sand(1 - core.clamp(t / k.meta.seconds)); h.rotation.y = t * .1; };
  },
  '6.2': async k => {
    forum(k, { env: 'dusk', templeZ: -14 });
    const al = altar(); al.position.set(0, 0, -2); k.scene.add(al);
    const sp = place(k.scene, spurinna(), { pos: [1.4, 0, -1.4], rot: -1, arm: 'point' });
    const q = core.textPlane('?', .9, { size: 200, color: '#b8321f', stroke: '#2b1e16', strokeW: 18 }); q.position.set(0, 3.4, -2); k.scene.add(q);
    k.anchor = [1.4, 2.6, -1.4];
    const cam = core.camMove(k.camera, { from: [2, 1.8, 4.4], to: [1.6, 1.7, 2.6], look: [.8, 1.5, -1.6], fov: 42 });
    return (t, u) => { cam(u, t); al.smoke.update(t); popIn(q, t, 1.5); q.lookAt(k.camera.position); };
  },
  '6.3': async k => {
    house(k, { wall: 0xcfc2a6 });
    const cal = calendarCard('MARTIUS', { circle: 15, h: 1.6 }); cal.position.set(0, 1.7, -3.45); k.scene.add(cal);
    place(k.scene, spurinna(), { pos: [-1.3, 0, -2.6], rot: .4, arm: 'point' });
    const cam = core.camMove(k.camera, { from: [.6, 1.7, 1.6], to: [.3, 1.6, -.6], look: [0, 1.5, -3.4], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '6.4': async k => {
    house(k, { lampI: 12 });
    const tb = props.table(2.6, 1.4, { color: 0x5a3a26 }); k.scene.add(tb);
    for (let i = 0; i < 5; i++) { const g = goblet(); g.position.set(-1 + i * .5, .8, (i % 2 ? .3 : -.3)); k.scene.add(g); }
    place(k.scene, caesar({ mood: 'calm' }), { pos: [0, 0, -1.1], rot: 0, pose: 'sitDesk', arm: 'raise' });
    [[-1.6, 0, P / 2], [1.6, 0, -P / 2], [-.7, 1.1, P], [.7, 1.1, P]].forEach(([x, z, r], i) => place(k.scene, senator(1300 + i, { mood: 'calm' }), { pos: [x, 0, z], rot: r, pose: 'sitDesk' }));
    return (t, u) => { const a = .4 + u * 1.2; k.camera.position.set(Math.sin(a) * 4.4, 2.4, Math.cos(a) * 4.4); k.camera.lookAt(0, 1, -.2); };
  },
  '6.5': async k => {
    house(k, { wall: 0x6a5a6a, lampI: 5, window: 0x1a2236 });
    const bed = props.hospitalBed(); bed.position.set(-1.4, 0, -1.6); k.scene.add(bed);
    const sh = [-1, 1].map(s => { const d = core.box(1.2, 1.4, .06, 0x6a4a2a); d.geometry.translate(-s * .6, 0, 0); d.position.set(3 + s * 1.2, 2.2, -3.42); k.scene.add(d); return d; });
    const cur = props.curtain(1.4, 2.2, 0xd8d0c0); cur.position.set(1.6, 0, -3.3); k.scene.add(cur);
    const cam = core.camMove(k.camera, { from: [0, 1.7, 3], to: [.8, 1.8, .6], look: [2.6, 2, -3.4], fov: 44, e: core.easeOut });
    return (t, u) => { cam(u, t); const r = core.easeOut(core.seg(t, .4, 1)); sh.forEach((d, i) => d.rotation.y = (i ? -1 : 1) * r * 1.6); cur.rotation.x = -r * .35 * (1 + Math.sin(t * 7) * .3); };
  },
  '6.6': async k => {
    house(k, { lampI: 10, window: 0xe8b890 });
    const c = place(k.scene, caesar({ hat: undefined, hair: 0x5a4a3a }), { pos: [.75, 0, -1.1], rot: -.5 });
    const ca = place(k.scene, calpurnia(), { pos: [-.35, 0, -.5], rot: .9, arm: 'hug' });
    const cam = core.camMove(k.camera, { from: [-2.6, 1.8, 2.4], to: [-2.1, 1.75, 1.8], look: [.2, 1.5, -.8], fov: 40 });
    k.anchor = [-.35, 2.4, -.5];
    return (t, u) => cam(u, t);
  },
  '6.7': async k => {
    forum(k, { env: 'dawn', templeZ: -14 });
    const al = altar(); al.position.set(0, 0, -2); k.scene.add(al);
    const pr = [0, 1, 2, 3].map(i => place(k.scene, people.person({ outfit: 'toga', top: 0xd8d0c0, bot: 0xd8d0c0, seed: 1310 + i, hat: 'scarf', hatColor: 0xd8d0c0, mood: 'worried' }), { pos: [-2.2 + i * 1.5, 0, -.6], rot: P / 8 * (i - 1.5) * -1 }));
    const cam = core.camMove(k.camera, { from: [-4, 1.7, 3.4], to: [4, 1.7, 3.4], look: [-1, 1.4, -1], lookTo: [1, 1.4, -1], fov: 42 });
    return (t, u) => { cam(u, t); al.smoke.update(t); pr.forEach((p, i) => p.parts.head.rotation.y = Math.sin(t * 5 + i) * .35); };
  },
  '6.8': async k => {
    house(k, { lampI: 14 });
    const ch = props.chair(); ch.position.set(0, 0, -1); k.scene.add(ch);
    const c = place(k.scene, caesar({ mood: 'sad' }), { pos: [0, .02, -.95], rot: 0, pose: 'sitDesk' });
    const lau = c.parts.head.children.filter(o => o.geometry?.type === 'TorusGeometry' || (o.geometry?.type === 'SphereGeometry' && o.scale.z > 1.5));
    const cam = core.camMove(k.camera, { from: [.4, 1.6, 2.4], to: [.2, 1.5, 1.4], look: [0, 1.4, -.9], fov: 40 });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, k.meta.seconds * .5, k.meta.seconds * .8)); lau.forEach(o => o.visible = r < .5); c.state.arm = r > .1 && r < .9 ? 'raise' : undefined; };
  },
  '6.9': async k => {
    house(k, { lampI: 14, window: 0xe8d8b0 });
    const d = place(k.scene, decimus(), { pos: [0, 0, -2.6], rot: 0, arm: 'point' });
    const door = core.box(1.8, 2.8, .1, 0x2a1e14, { pos: [0, 1.4, -3.42], noOutline: true }); k.scene.add(door);
    const cam = core.camMove(k.camera, { from: [.4, 1.6, 1.8], to: [.2, 1.55, .2], look: [0, 1.5, -2.6], fov: 40 });
    return (t, u) => { cam(u, t); d.update(t, { arm: Math.sin(t * 2.2) > 0 ? 'point' : 'raise' }); };
  },
  '6.10': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const cr = []; for (let i = 0; i < 9; i++) cr.push(place(k.scene, citizen(1320 + i, { mood: i % 2 ? 'smug' : 'surprised' }), { pos: [-4 + (i % 5) * 2, 0, -1 - Math.floor(i / 5) * 2], rot: (i % 2 ? .4 : -.4) }));
    const txt = ['AFRAID OF A DREAM?', 'A KING WHO HIDES?', 'HIS WIFE RULES HIM?', 'THE GODS SAID NO?'];
    const bs = txt.map((s, i) => { const b = bubble(s, { w: 2.6, size: 70 }); b.position.copy(cr[i * 2].position).add(new THREE.Vector3(0, 2.9, 0)); k.scene.add(b); return b; });
    const cam = core.camMove(k.camera, { from: [0, 2.4, 9], to: [0, 2.6, 7.6], look: [0, 1.9, -1.6], fov: 46 });
    return (t, u) => { cam(u, t); bs.forEach((b, i) => { popIn(b, t, .4 + i * .7); b.lookAt(k.camera.position); }); };
  },
  '6.11': async k => {
    forum(k, { env: 'day', templeZ: -24 });
    const c = place(k.scene, caesar(), { pos: [0, 0, 0] });
    const cam = core.camMove(k.camera, { from: [.8, 1.9, 5], to: [.8, 1.9, -6], look: [0, 1.5, 0], lookTo: [0, 2, -16], fov: 44 });
    return (t, u) => { cam(u, t); const d = t * 1.4; c.position.set(0, 0, 2 - d); c.rotation.y = P; c.update(t, { pose: 'walk', dist: d }); };
  },
  '6.12': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    for (let i = 0; i < 14; i++) place(k.scene, citizen(1340 + i), { pos: [-6 + (i % 7) * 2, 0, -2.5 - Math.floor(i / 7) * 2 + (i % 2) * .5], rot: (i % 3) - 1 });
    const c = place(k.scene, caesar(), { pos: [-.5, 0, 0], rot: P / 2, arm: 'hold' });
    const ar = place(k.scene, people.person({ outfit: 'tunic', top: 0x7a6a9a, bot: 0x7a6a9a, seed: 1360, hair: 0xd8d8d8, beard: true, mood: 'worried' }), { pos: [.5, 0, 0], rot: -P / 2, arm: 'hold' });
    const sc = scroll('', { w: .45 }); sc.position.set(0, 1.15, .1); sc.rotation.y = P / 2; k.scene.add(sc);
    k.anchor = [.5, 2.5, 0];
    const cam = core.camMove(k.camera, { from: [0, 1.7, 4.4], to: [0, 1.4, 2], look: [0, 1.2, 0], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '6.13': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const c = place(k.scene, caesar(), { pos: [0, 0, -9], rot: P, arm: 'hold' });
    const sc = scroll('', { w: .45 }); sc.position.set(.3, 1.1, -9.3); k.scene.add(sc);
    const doors = [-1, 1].map(s => { const d = core.box(2, 5, .2, 0x5a3a22); d.geometry.translate(-s, 2.5, 0); d.position.set(s * 2, 0, -14); k.scene.add(d); return d; });
    const cam = core.camMove(k.camera, { from: [1, 1.6, -6], to: [.5, 1.8, -10], look: [.2, 1.2, -9.3], lookTo: [0, 2, -14], fov: 42 });
    return (t, u) => { cam(u, t); const d = core.ease(core.seg(t, .5, k.meta.seconds * .5)) * 4; c.position.z = -9 - d; c.update(t, { pose: d < 4 && d > 0 ? 'walk' : 'stand', dist: d }); sc.position.z = c.position.z - .3; sc.visible = d < 3.5; doors.forEach((dd, i) => dd.rotation.y = (i ? 1 : -1) * (1 - core.ease(core.seg(t, k.meta.seconds * .55, k.meta.seconds - .3))) * 1.3); };
  },
};
