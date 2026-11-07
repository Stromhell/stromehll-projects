// The History of Christmas · Act 1 · THE FIRST STORY
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, avoid, RED, GREEN, GOLD } from './xm_common.js';
import { desert, stable, animal, man, hat, beard, book, interiorRoom, lantern, gift } from './xm_sets.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
const joseph = () => { const p = man({ top: 0x8a6a3a, bot: 0x8a6a3a, seed: 301, hair: 0x3a2a1e, beard: true, mood: 'calm' }); hat(p, 'hood', 0x6a5232); return p; };
const mary = () => { const p = people.person({ outfit: 'stola', top: 0x3a5aa8, bot: 0x3a5aa8, seed: 302, mood: 'calm', smile: true }); hat(p, 'veil', 0x6a8ad0); return p; };
const shepherd = (s) => { const p = man({ top: [0x9a8a6a, 0x7a6a4a, 0xa89878][s % 3], bot: 0x7a6a4a, seed: 310 + s, beard: s % 2 === 0, hair: 0x2b1e16 }); hat(p, 'hood', [0xc8b898, 0x8a7a5a, 0xb0a080][s % 3]); return p; };
const king = (s) => { const p = people.person({ outfit: 'stola', top: [0x6a2a8a, 0x2a5a3a, 0x8a2a2a][s], bot: [0x6a2a8a, 0x2a5a3a, 0x8a2a2a][s], seed: 320 + s, skin: [0xf7f3ea, 0xe8d4b8, 0xc89a70][s], beard: s !== 1, hair: [0xd8d8d8, 0x2b1e16, 0x2b1e16][s] }); hat(p, s === 1 ? 'turban' : 'crown', 0xc8a040); return p; };
export { joseph, mary, shepherd, king };
export const shots = {
  '1.1': async k => {
    const D = desert(k, { env: 'night', starPos: [0, 60, -110] });
    const cam = core.camMove(k.camera, { from: [0, 30, 20], to: [0, 3, 14], look: [0, 60, -110], lookTo: [0, 3, -26], fov: 48, e: core.easeInOut });
    return (t, u) => { cam(u, t); D.update(t); };
  },
  '1.2': async k => {
    const R = interiorRoom(k, { w: 8, d: 6, h: 3.6, wall: 0x7a5a3e, floor: 0x5a4030, lampI: 4, window: false });
    const lamp = lantern(); lamp.position.set(-1.1, 0, -.9); k.scene.add(lamp); const pl = new THREE.PointLight(0xffb060, 2.5, 6); pl.position.set(-.9, 1.4, -.3); k.scene.add(pl);
    const stand = core.group(core.box(.12, .9, .12, 0x5a3a22, { pos: [0, .45, 0] }), core.box(1.2, .06, .8, 0x5a3a22, { pos: [0, .92, 0], rot: [-.35, 0, 0] })); core.outline(stand, .015); k.scene.add(stand);
    const b = book({ left: 'THE\nGOSPELS', right: 'HISTORIANS:\nA REAL\nPERSON', size: 70, cover: 0x6a2a2a }); b.position.set(0, .99, .03); b.rotation.x = -.35 + .0; k.scene.add(b);
    const f = fl(k, [.15, 0, -1.7]);
    const cam = core.camMove(k.camera, { from: [.5, 1.5, 2.9], to: [.35, 1.45, 2.0], look: [0, 1.2, -.6], fov: 40 });
    return (t, u) => { cam(u, t); R.update(t); b.open(ease(seg(t, .3, 1.4))); const peek = easeOut(seg(t, 1.6, 2.4));
      f.position.y = -.45 + peek * .45; f.update(t, { mood: 'happy', pose: 'lean', look: Math.sin(t * 2.2) * .12 }); f.parts.head.rotation.x = .25 + Math.sin(t * 3) * .07 * (t > 3 ? 1 : 0); };
  },
  '1.3': async k => {
    desert(k, { env: 'dusk', town: false, palms: 10, star: false, envO: { sunPos: [-80, 22, 30], sun: 0xffc89a, sunI: 1.0, amb: 0xd8b8c8, ambI: .9, fog: 0x8a6a7a } });
    const j = joseph(); const m = mary(); const d = animal('donkey'); const f = fl(k, [0, 0, 0]);
    const pack = core.group(core.box(.5, .4, .7, 0x8a6a4a, { pos: [-.45, 0, 0] }), core.box(.5, .4, .7, 0x6a4a3a, { pos: [.45, 0, 0] })); core.outline(pack, .015); pack.position.copy(d.seat).add(new THREE.Vector3(0, -.15, 0)); d.add(pack);
    [j, m].forEach(p => k.scene.add(p)); k.scene.add(d);
    const L = 2.6 * k.meta.seconds / 7;
    const cam = core.camMove(k.camera, { from: [-9, 1.5, 7], to: [-9 + L * 1.05, 1.5, 7], look: [-8, 1.1, 0], lookTo: [-8 + L, 1.1, 0], fov: 40, e: x => x });
    return (t, u) => { cam(u, t); const x0 = -11, x1 = x0 + L + 2;
      walkPath(d, [x0 + 2.6, 0, 0], [x1 + 2.6, 0, 0], 0, k.meta.seconds, t);
      walkPath(j, [x0 + 4.2, 0, .3], [x1 + 4.2, 0, .3], 0, k.meta.seconds, t, { arm: 'hold' });
      walkPath(m, [x0 + .6, 0, 1.4], [x1 + .6, 0, 1.4], 0, k.meta.seconds, t);
      const df = walkPath(f, [x0 - 1.3, 0, 1.0], [x1 - 1.3, 0, 1.0], 0, k.meta.seconds, t); f.update(t, { pose: 'hop', dist: df, mood: 'happy' }); };
  },
  '1.4': async k => {
    const S = stable(k);
    const m = mary(), j = joseph(); m.userData.seatY = -.32; j.userData.seatY = -.32;
    for (const [p, x, ry] of [[m, -1.3, .9], [j, 1.35, -.9]]) { const bale = core.box(.8, .36, .6, 0xd0a848, { pos: [x, .18, -1.0] }); core.outline(bale, .015); k.scene.add(bale); p.position.set(x, -.32, -1.0); p.rotation.y = ry; p.state.pose = 'sit'; p.state.arm = 'lap'; k.scene.add(p); }
    const ox = animal('ox'); ox.position.set(2.6, 0, -2.8); ox.rotation.y = -2.2; k.scene.add(ox);
    const dk = animal('donkey'); dk.position.set(-2.8, 0, -2.6); dk.rotation.y = 2.3; k.scene.add(dk);
    const cam = core.camMove(k.camera, { from: [0, 1.9, 5.5], to: [0, 1.5, 2.6], look: [0, .9, -1.2], fov: 42 });
    return (t, u) => { cam(u, t); S.update(t); ox.idle(t); dk.idle(t + 1); m.update(t, { pose: 'sit', look: -.5 }); j.update(t, { pose: 'sit', look: .5 }); };
  },
  '1.5': async k => {
    const D = desert(k, { env: 'night', town: false, palms: 2, starPos: [30, 50, -100] });
    const angel = new THREE.Group(); const ag = glowSprite(0xfff2c8, 7, .85); angel.add(ag); const core2 = glowSprite(0xffffff, 2.2, 1); angel.add(core2);
    for (const s of [-1, 1]) { const w = glowSprite(0xffffff, 1, .5); w.scale.set(3, 1.2, 1); w.position.set(s * 1.4, .4, 0); angel.add(w); }
    angel.position.set(-2, 9, -10); k.scene.add(angel); const al = new THREE.PointLight(0xfff0c0, 0, 30); al.position.copy(angel.position); k.scene.add(al);
    const sh = [0, 1, 2].map(i => { const p = shepherd(i); p.position.set(-3 + i * 2.2, 0, -2 - (i % 2) * .8); p.rotation.y = P + (i - 1) * .3; k.scene.add(p); return p; });
    const r = core.rng(4); const sheep = []; for (let i = 0; i < 8; i++) { const s = animal('sheep'); s.position.set(-6 + (i % 4) * 2.4 + r() * .6, 0, .6 + Math.floor(i / 4) * 1.6 + r() * .4); s.rotation.y = r() * 6; k.scene.add(s); sheep.push(s); }
    const kings = [0, 1, 2].map(i => { const p = king(i); k.scene.add(p); return p; }); const camels = [0, 1, 2].map(() => { const c = animal('camel'); k.scene.add(c); return c; });
    const cam = core.camMove(k.camera, { from: [1, 1.6, 9], to: [1, 3.5, 8], look: [-1, 2, -4], lookTo: [6, 9, -30], fov: 46 });
    return (t, u) => { cam(u, t); D.update(t); const glow = ease(seg(t, .4, 1.6)); angel.visible = glow > .01; angel.scale.setScalar(Math.max(.01, glow)); al.intensity = glow * 40; angel.position.y = 9 + Math.sin(t * 1.3) * .3;
      sh.forEach((p, i) => p.update(t, { arm: i === 1 && t > 1.5 ? 'raise' : (i === 0 ? 'point' : 'none'), mood: 'surprised', look: 0 }));
      sheep.forEach((s, i) => s.idle(t + i));
      kings.forEach((p, i) => { const z = -28 - i * 3.6; walkPath(p, [-14 + i * 0, 0, z - 1.2], [4, 0, z - 1.2], 0, k.meta.seconds * 1.6, t); walkPath(camels[i], [-15.8, 0, z], [2.2, 0, z], 0, k.meta.seconds * 1.6, t); }); };
  },
  '1.6': async k => {
    const R = interiorRoom(k, { w: 8, d: 6, h: 3.6, wall: 0x7a5a3e, floor: 0x5a4030, lampI: 6, window: false });
    const tbl = props.table(1.6, 1, { color: 0x5a3a22 }); tbl.position.set(0, 0, -.2); k.scene.add(tbl);
    const b = book({ left: '...', right: 'NO DATE?', size: 90, w: 1.4, d: .9 }); b.position.set(0, .84, -.2); b.open(1); k.scene.add(b);
    const f = fl(k, [0, 0, -1.4]);
    const cam = core.camMove(k.camera, { from: [.3, 1.8, 2.6], to: [.2, 1.6, 1.6], look: [0, 1.1, -.6], fov: 42 });
    const T = k.meta.seconds * .62;
    return (t, u) => { cam(u, t); R.update(t); b.flip(t, t < T ? 3.2 : 0);
      f.update(t, { arm: t < T ? 'flip' : 'shrug', mood: t < T ? 'worried' : 'surprised', pose: t < T ? 'lean' : 'idle' }); };
  },
};
