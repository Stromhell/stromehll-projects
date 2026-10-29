// Caesar · Act 7 · THE MASK
import { core, props, people, maps, ui, THREE, mapShot, place, interior, curia, forum, caesar, senator, antony, octavian, lepidus, citizen, statue, mask, laurelEmblem, popIn } from './cae_common.js';
const P = Math.PI;
export const shots = {
  '7.1': async k => {
    const cu = curia(k, { senators: false }); k.scene.traverse(o => { if (o.isPointLight) o.intensity *= .5; });
    const cam = core.camMove(k.camera, { from: [0, 1.8, cu.chairPos.z + 12], to: [0, 1.6, cu.chairPos.z + 5], look: [0, 1.2, cu.chairPos.z], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '7.2': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    place(k.scene, octavian(), { pos: [-1.5, 0, 0], rot: .2 }); place(k.scene, antony(), { pos: [0, 0, -.2], rot: 0 }); place(k.scene, lepidus(), { pos: [1.5, 0, 0], rot: -.2 });
    k.anchor = [0, 2.8, 0];
    const cam = core.camMove(k.camera, { from: [0, 6, 7], to: [0, 1.8, 5], look: [0, 1.4, 0], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '7.3': async k => mapShot(k, { center: [18, 40], span: [20, 12], hlColor: '#b8402e', labels: [['ITALY', 12.5, 43], ['GREECE', 22, 39.3], ['MACEDONIA', 22.5, 41.5]], highlight: ['ITA', 'GRC'], cities: ['ROME', 'PHILIPPI'],
    extra: async (k, map) => { const a = maps.ribbon(map, [[19, 41.2], [22, 41], [24.1, 41]], { color: 0xb8321f }), b = maps.ribbon(map, [[27, 41.5], [25.5, 41.1], [24.4, 41]], { color: 0x2b1e16 }); k.scene.add(a, b); const f = props.flash(0xffd890, 2); f.position.copy(map.proj(24.28, 41.01, 1)); k.scene.add(f); return (t, u, rk) => { a.set(rk); b.set(rk); f.pulse(rk > .95 ? Math.max(0, 1 - ((t * 2) % 1) * 2) : 0); }; } }),
  '7.4': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 10 }); k.scene.background = new THREE.Color(0x15100e);
    k.scene.add(core.box(8, .4, 4, 0x6a4a2a, { pos: [0, .2, 0] }));
    const sp = new THREE.SpotLight(0xffe8b0, 160, 14, .35, .4); sp.position.set(0, 8, 3); sp.target.position.set(0, 0, 0); k.scene.add(sp, sp.target);
    const fs = [octavian(), antony(), lepidus()].map((f, i) => place(k.scene, f, { pos: [-1.6 + i * 1.6, .4, 0], rot: 0 }));
    const cam = core.camMove(k.camera, { from: [0, 1.8, 7], to: [0, 1.8, 5.4], look: [0, 1.4, 0], fov: 40 });
    return (t, u) => { cam(u, t); [1, 2].forEach((i, j) => { const r = core.ease(core.seg(t, 1 + j * 1.2, 2.2 + j * 1.2)); fs[i].visible = r < .98; fs[i].scale.setScalar(Math.max(.01, 1 - r)); }); };
  },
  '7.5': async k => {
    forum(k, { env: 'day', templeZ: -14 });
    const o = place(k.scene, octavian({ hat: 'laurel', mood: 'calm' }), { pos: [0, 0, 0], rot: 0 });
    const cam = core.camMove(k.camera, { from: [0, 1.8, 4.4], to: [0, 1.75, 3.4], look: [0, 1.6, 0], fov: 40 });
    return (t, u) => { cam(u, t); ui.slam(k.overlay, 'AUGUSTUS', t, .6, { size: 140, y: 880, sub: 'FIRST EMPEROR OF ROME' }); };
  },
  '7.6': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    const st = statue(caesar()); st.position.set(0, 0, -3); k.scene.add(st);
    place(k.scene, octavian({ hat: 'laurel' }), { pos: [.8, 0, 0], rot: P - .3 });
    const cam = core.camMove(k.camera, { from: [2.6, 1.8, 2.6], to: [2, 1.9, 1.6], look: [0, 2.2, -2.4], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '7.7': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    const c = place(k.scene, caesar({ mood: 'calm' }), { pos: [-4, 0, 0], rot: P / 2, arm: 'hold' });
    for (let i = 0; i < 5; i++) place(k.scene, senator(1400 + i, { mood: 'smug' }), { pos: [-2.6 + i * 1.3, 0, -.2], rot: -P / 2 + .3 });
    const pm = statue(senator(150, { hair: 0x2b1e16 })); pm.position.set(4.6, 0, -2.6); k.scene.add(pm);
    const cam = core.camMove(k.camera, { from: [-4, 1.8, 5.6], to: [4, 1.8, 5.6], look: [-3, 1.4, 0], lookTo: [4, 1.8, -1], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '7.8': async k => {
    const cu = curia(k, { senators: false }); k.scene.traverse(o => { if (o.isPointLight) o.intensity *= .6; });
    const cam = core.camMove(k.camera, { from: [-1, 1.8, cu.chairPos.z + 6], to: [-1.8, 2.6, cu.chairPos.z + 3.6], look: [-1.6, 2, cu.chairPos.z - .6], fov: 42 });
    return (t, u) => cam(u, t);
  },
  '7.9': async k => {
    forum(k, { env: 'day', templeZ: -20 });
    place(k.scene, caesar({ mood: 'smug' }), { pos: [0, 0, 0], rot: 0 });
    for (let i = 0; i < 6; i++) { const a = i / 6 * P * 2; const s = statue(caesar()); s.scale.setScalar(.7); s.position.set(Math.sin(a) * 4, 0, Math.cos(a) * 4); s.rotation.y = a + P; k.scene.add(s); }
    return (t, u) => { const a = u * 1.4; k.camera.position.set(Math.sin(a) * 7.5, 3, Math.cos(a) * 7.5); k.camera.lookAt(0, 1.4, 0); };
  },
  '7.10': async k => {
    interior(k, { w: 6, d: 5, h: 3.4, wall: 0x7a4a3a, floor: 0x5a4030, lampI: 12 });
    const o = place(k.scene, octavian({ hat: 'laurel' }), { pos: [0, 0, -.6], rot: 0 });
    const m = mask(); k.scene.add(m);
    const cam = core.camMove(k.camera, { from: [0, 1.7, 2.6], to: [0, 1.62, 1.4], look: [0, 1.6, -.6], fov: 38 });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, .6, k.meta.seconds * .7)); m.position.set(0, 2.8 - r * 1.2, -.6 + .3); };
  },
  '7.11': async k => {
    forum(k, { env: 'day', templeZ: -16 });
    const o = place(k.scene, octavian({ hat: 'laurel' }), { pos: [0, 1.8, -6], rot: 0 });
    const m = mask(); m.position.set(0, 1.8 + 1.6, -6 + .3); k.scene.add(m);
    const cr = []; for (let i = 0; i < 24; i++) cr.push(place(k.scene, citizen(1420 + i), { pos: [-6 + (i % 8) * 1.7, 0, 0 + Math.floor(i / 8) * 1.8], rot: P }));
    const cam = core.camMove(k.camera, { from: [0, 2, 8], to: [0, 9, 12], look: [0, 2, -4], fov: 46 });
    return (t, u) => { cam(u, t); cr.forEach((p, i) => p.parts.body.rotation.x = core.ease(core.seg(t, .5 + (i % 8) * .1, 1.5 + (i % 8) * .1)) * .5); };
  },
  '7.12': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x15120e);
    const t1 = core.textPlane('THE IDES OF MARCH', .7, { size: 110, color: '#e8b321', stroke: '#2b1e16', strokeW: 16, font: 'Anton' }); t1.position.set(0, 1.1, 0); k.scene.add(t1);
    const btn = props.card('SUBSCRIBE', { h: .7, cw: 700, ch: 200, size: 110, bg: '#c8302a', color: '#fff' }); btn.position.set(0, -.6, 0); k.scene.add(btn);
    const cam = core.camMove(k.camera, { from: [0, .3, 6], to: [0, .3, 5.4], look: [0, .3, 0], fov: 42 });
    return (t, u) => { cam(u, t); popIn(btn, t, 1.2); };
  },
};
