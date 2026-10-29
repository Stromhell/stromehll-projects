// Caesar · Act 4 · THE TRAP
import { core, props, people, ui, THREE, place, interior, curia, forum, caesar, senator, decimus, trebonius, antony, gladiator, scroll, scales, popIn } from './cae_common.js';
const P = Math.PI;
const crate = () => { const g = new THREE.Group(); g.add(core.box(.9, .45, .55, 0x7a5a3a, { pos: [0, .225, 0] })); const lid = new THREE.Group(); lid.position.set(0, .45, -.275); lid.add(core.box(.92, .06, .57, 0x6a4a2a, { pos: [0, .03, .285] })); g.add(lid); g.lid = lid; return g; };
export const shots = {
  '4.1': async k => {
    forum(k, { env: 'dawn', templeZ: -16 });
    const sv = [0, 1, 2].map(i => { const p = place(k.scene, people.person({ outfit: 'tunic', seed: 1100 + i, hair: 0x2b1e16 }), { pos: [0, 0, 0], arm: 'hold' }); const c = crate(); c.scale.setScalar(.7); c.position.set(0, 1.0, .35); p.add(c); return p; });
    const cam = core.camMove(k.camera, { from: [3, 9, 6], to: [2, 3, 4], look: [0, 1, -3], lookTo: [0, 1.4, -10], fov: 44 });
    return (t, u) => { cam(u, t); sv.forEach((p, i) => { const d = t * 1.1 - i * 1.6; p.position.set(-1 + i, 0, 2 - d); p.rotation.y = P; p.update(t + i, { pose: 'walk', dist: d }); }); };
  },
  '4.2': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 6 }); k.scene.background = new THREE.Color(0x15100e); k.scene.add(props.ground(0x5a4a3a, 20));
    const c = crate(); k.scene.add(c);
    const glint = core.box(.5, .02, .05, 0xf0f0f0, { pos: [0, .44, .05], emissive: 0xffffff, ei: 1.5, noOutline: true }); k.scene.add(glint);
    const cam = core.camMove(k.camera, { from: [0, 1, 1.6], to: [0, .85, 1.1], look: [0, .4, 0], fov: 40 });
    return (t, u) => { cam(u, t); const o = Math.sin(core.clamp(t / (k.meta.seconds * .8)) * P) * .35; c.lid.rotation.x = -o; glint.visible = o > .12; };
  },
  '4.3': async k => {
    interior(k, { w: 6, d: 5, h: 3.4, wall: 0xcfc2a6, floor: 0x8a7a5a, lampI: 12 });
    const s = place(k.scene, senator(1110, { mood: 'stern' }), { pos: [0, 0, -.4], rot: 0, arm: 'hold' });
    const sh = core.box(.05, .32, .02, 0x2b2b2b, { pos: [.12, 1.05, -.18], noOutline: true }); k.scene.add(sh);
    const cam = core.camMove(k.camera, { from: [.5, 1.5, 2.2], to: [.3, 1.4, 1.4], look: [0, 1.15, -.4], fov: 40 });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, k.meta.seconds * .35, k.meta.seconds * .6)); sh.scale.y = Math.max(.01, 1 - r); sh.position.y = 1.05 - r * .15; };
  },
  '4.4': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const g = []; for (let i = 0; i < 8; i++) g.push(place(k.scene, gladiator(1120 + i), { pos: [0, 0, 0] }));
    const ex = [[-11, -8], [11, -8], [-11, 6], [11, 6], [0, 12], [-6, 12], [6, 12], [0, -12]];
    return (t, u) => { k.camera.position.set(0, 24, 2); k.camera.up.set(0, 0, -1); k.camera.lookAt(0, 0, 0); k.camera.fov = 40; k.camera.updateProjectionMatrix(); const r = core.ease(core.seg(t, .3, k.meta.seconds * .8)); g.forEach((p, i) => { const [x, z] = ex[i]; p.position.set(x * r, 0, -2 + (z + 2) * r); p.rotation.y = Math.atan2(x, z); p.update(t + i, { pose: r < 1 ? 'walk' : 'stand', dist: r * 10 }); }); };
  },
  '4.5': async k => {
    interior(k, { w: 6, d: 5, h: 3.4, wall: 0xcfc2a6, floor: 0x8a7a5a, lampI: 14 });
    const d = place(k.scene, decimus(), { pos: [0, 0, -.6], rot: 0, arm: 'hold' });
    const sc = scroll('TESTAMENTUM', { w: .7, size: 80 }); sc.position.set(0, 1.25, -.2); k.scene.add(sc);
    k.anchor = [0, 2.4, -.6];
    const cam = core.camMove(k.camera, { from: [.5, 1.6, 2.6], to: [.2, 1.4, 1.4], look: [0, 1.3, -.4], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '4.6': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    const c = place(k.scene, caesar({ mood: 'calm', smile: true }), { pos: [-.45, 0, 0], rot: .5, arm: 'hug' });
    const d = place(k.scene, decimus({ smile: true }), { pos: [.45, 0, 0], rot: -.5 });
    return (t, u) => { const a = -.5 + u * 1; k.camera.position.set(Math.sin(a) * 4, 1.8, Math.cos(a) * 4); k.camera.lookAt(0, 1.4, 0); c.update(t, { nod: Math.sin(t * 4) * .4 }); d.update(t, { nod: Math.sin(t * 4 + 1) * .4 }); };
  },
  '4.7': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const a = place(k.scene, antony(), { pos: [0, 0, 0] }), tr = place(k.scene, trebonius(), { pos: [0, 0, 0], arm: 'point' });
    k.anchor = [0, 2.6, -2];
    const cam = core.camMove(k.camera, { from: [5, 1.8, 2], to: [7, 1.8, -1], look: [1, 1.3, -2], lookTo: [4, 1.3, -4], fov: 42 });
    return (t, u) => { cam(u, t); const d = t * .8; a.position.set(-1 + d * .8, 0, -2 - d * .4); tr.position.set(-.2 + d * .8, 0, -1.6 - d * .4); a.rotation.y = tr.rotation.y = 2; a.update(t, { pose: 'walk', dist: d }); tr.update(t, { pose: 'walk', dist: d }); };
  },
  '4.8': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const a = place(k.scene, antony(), { pos: [0, 0, -9], rot: 0 });
    const doors = [-1, 1].map(s => { const d = core.box(2, 5, .2, 0x5a3a22); d.geometry.translate(-s, 2.5, 0); d.position.set(s * 2, 0, -14); k.scene.add(d); return d; });
    const cam = core.camMove(k.camera, { from: [1.2, 1.9, -5.5], to: [.6, 2, -8], look: [0, 1.6, -14], fov: 42 });
    return (t, u) => { cam(u, t); doors.forEach((d, i) => d.rotation.y = (i ? 1 : -1) * (1 - core.ease(core.seg(t, 1, k.meta.seconds - 1))) * 1.3); };
  },
  '4.9': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 8 }); k.scene.background = new THREE.Color(0x2a2018);
    const sc = scales(); k.scene.add(sc);
    const one = antony(); one.scale.setScalar(.35); one.position.y = -.88; sc.pans[0].add(one);
    const two = [0, 1].map(i => { const p = senator(1130 + i); p.scale.setScalar(.35); p.position.set(-.15 + i * .3, -.88, 0); sc.pans[1].add(p); return p; });
    const cam = core.camMove(k.camera, { from: [0, 1.6, 4.6], to: [0, 1.6, 4], look: [0, 1.4, 0], fov: 40 });
    return (t, u) => { cam(u, t); sc.tilt(core.ease(core.seg(t, 1, 3)) * .22 + Math.sin(t * 2) * .01); };
  },
  '4.10': async k => {
    const cu = curia(k, { n: 34 });
    place(k.scene, caesar(), { pos: [cu.chairPos.x, cu.chairPos.y + .96, cu.chairPos.z + .1], rot: 0, pose: 'sit' });
    const cam = core.camMove(k.camera, { from: [0, 2.4, 11], to: [0, 9, 13], look: [0, 1, -2], lookTo: [0, 0, -4], fov: 46 });
    return (t, u) => cam(u, t);
  },
};
