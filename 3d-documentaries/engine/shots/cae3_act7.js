// The Ides of March · Act 7 · AFTER CAESAR — realistic look
import * as C from './cae3_common.js';
import * as ui from '../lib/ui.js';
import { shots as A2 } from './cae3_act2.js';
import { shots as A3 } from './cae3_act3.js';
import { shots as A5 } from './cae3_act5.js';
const { THREE, rome, P, real } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;
const PL = rome.PLACES;

function mask() {
  const t = real.canvasTex(512, 640, (c, W, H) => { c.clearRect(0, 0, W, H); });
  const g = new THREE.Group(); const m = real.std(0xc9bc9f, { rough: .55 });
  const face = real.m(new THREE.SphereGeometry(.13, 32, 20, P * .08, P * .84, P * .18, P * .62), m); face.scale.set(1, 1.3, .9); face.material = m.clone(); face.material.side = THREE.DoubleSide; g.add(face);
  const dark = real.std(0x0a0806, { rough: 1 });
  for (const s of [-1, 1]) g.add(real.m(new THREE.SphereGeometry(.02, 12, 8), dark, { pos: [s * .045, .03, .112] }));
  g.add(real.box(.05, .008, .01, dark, { pos: [0, -.075, .108] }));
  g.add(real.m(new THREE.ConeGeometry(.016, .05, 8), m, { pos: [0, -.015, .125], rot: [.3, 0, 0] }));
  return g;
}

export const shots = {
  // 7.1 the empty golden chair in a silent hall (Act 2 shot again)
  '7.1': k => A2['2.6'](k),
  // 7.2 Octavian, Mark Antony and Lepidus side by side; crane down
  '7.2': async k => {
    k.calloutPos = [960, 250];
    await rome.forum(k, { trees: false, sun: [-25, 16, 18] });
    const tri = []; for (const [i, id] of ['cae_antony', 'cae_octavian', 'cae_lepidus'].entries()) tri.push(await C.person(k, id, { pos: [(i - 1) * 1.1, 0, 4], rot: (1 - i) * .12, seed: 1300 + i }));
    rome.key(k.scene, [2, 5, 10], [0, 1.6, 4], { i: 130 });
    const cam = C.dolly(k.camera, { pos: [0, 5.5, 10.5], look: [0, 1.4, 4], fov: 40 }, { pos: [0, 1.75, 8.6], look: [0, 1.55, 4], fov: 36 });
    return (t, u) => { cam(u); tri.forEach((p, i) => p.update(t, { mood: 'stern', look: (i - 1) * -.15 })); };
  },
  // 7.3 MAP: the armies meet at Philippi, 42 BC
  '7.3': async k => C.mapShot(k, { center: [20, 41], span: [22, 12], size: 3.4, cam: [{ pos: [0, 3, 1.4], look: [0, .9, -.1], fov: 40 }, { pos: [.7, 2.1, .7], look: [.75, .9, -.12], fov: 38 }] }, (m, t) => {
    const D = k.meta.seconds;
    m.dot(...PL.ROME); m.label('ROMA', 12.5, 41.0, 60); m.label('MACEDONIA', 22.5, 40.2, 70, 1, { italic: true });
    m.route([PL.ROME, [16, 41], PL.BRUNDISIUM, [20, 40.5], [22.8, 40.8], PL.PHILIPPI], ease(seg(t, .4, D * .55)), '#8a1a12', 9, true);
    m.route([[28, 39.5], [26.5, 40.3], [25, 40.8], PL.PHILIPPI], ease(seg(t, .4, D * .55)), '#2a3a6a', 9, true);
    m.dot(...PL.PHILIPPI, 18, '#7a1a12', seg(t, D * .55, D * .6)); m.label('PHILIPPI · 42 BC', 24.3, 41.6, 64, seg(t, D * .55, D * .6));
    if (t > D * .6) m.cross(...PL.PHILIPPI, 34, seg(t, D * .6, D * .65), '#8a1a12');
  }),
  // 7.4 the last figure standing on a dark stage as the others fade
  '7.4': async k => {
    const cu = await rome.curia(k, { statue: false, shafts: false, sunI: .2 }); k.exposure = .8;
    const ids = ['cae_brutus', 'cae_cassius', 'cae_octavian', 'cae_antony', 'cae_lepidus'];
    const ppl = [], keys = []; for (let i = 0; i < 5; i++) { ppl.push(await C.person(k, ids[i], { pos: [(i - 2) * 1.3, 0, -2], rot: 0, seed: 1320 + i })); keys.push(rome.key(k.scene, [(i - 2) * 1.3, 5, 0], [(i - 2) * 1.3, 1.2, -2], { i: 120, angle: .22, soft: .4 })); }
    const cam = C.dolly(k.camera, { pos: [0, 1.7, 5], look: [0, 1.4, -2], fov: 46 }, { pos: [0, 1.65, 3.4], look: [0, 1.5, -2], fov: 40 });
    const D = k.meta.seconds; const out = [0, 1, 4, 3];
    return (t, u) => { cam(u); out.forEach((j, n) => { const f = 1 - seg(t, .5 + n * D * .15, .9 + n * D * .15); if (keys[j]) keys[j].intensity = 120 * f; ppl[j].visible = f > .02; }); ppl.forEach(p => p.update(t, { mood: 'stern' })); };
  },
  // 7.5 Octavian crowned with laurel; title AUGUSTUS
  '7.5': async k => {
    k.noAutoOverlay = true;
    const cu = await rome.curia(k, { shaftI: .1 });
    const oc = await C.person(k, 'cae_octavian', { pos: [0, .45, -9.6], rot: 0, laurel: { gold: true } });
    rome.key(k.scene, [1, 4, -6], [0, 1.9, -9.6], { i: 55 });
    const cam = C.dolly(k.camera, { pos: [0, 1.95, -6.2], look: [0, 2.0, -9.6], fov: 34 }, { pos: [0, 2.0, -7.3], look: [0, 2.05, -9.6], fov: 30 });
    return (t, u) => { cam(u); oc.update(t, { mood: 'calm' }); const x = k.overlay; x.fillStyle = `rgba(0,0,0,${.2 * C.ease(seg(t, 1.2, 2.8))})`; x.fillRect(0, 0, 1920, 1080); ui.slam(x, 'AUGUSTUS', t, 2.2, { size: 170, y: 860, sub: '27 BC · FIRST EMPEROR OF ROME' }); };
  },
  // 7.6 Augustus looks at Caesar's statue; slow push
  '7.6': async k => {
    await rome.forum(k, { trees: false, sun: [-25, 16, 18] });
    await rome.statueOf(k, 'cae_caesar', { pos: [0, 0, 2], arm: 'raise', rot: .2 });
    const oc = await C.person(k, 'cae_octavian', { pos: [1.4, 0, 5], rot: P + .35, laurel: { gold: true } });
    const cam = C.dolly(k.camera, { pos: [3.4, 1.8, 8.4], look: [.8, 2.0, 3.5], fov: 44 }, { pos: [2.8, 1.85, 7.4], look: [.6, 2.2, 3.2], fov: 40 });
    return (t, u) => { cam(u); oc.update(t, { mood: 'stern', look: -.1 }); };
  },
  // 7.7 Caesar hands pardons to men who later joined the plot (Act 3 shot again)
  '7.7': k => A3['3.3'](k),
  // 7.8 the statue of Pompey over the empty chair (Act 5 shot again)
  '7.8': k => A5['5.13'](k),
  // 7.9 Caesar in purple surrounded by statues of himself; orbit
  '7.9': async k => {
    await rome.forum(k, { trees: false, sun: [-25, 18, 18] });
    for (let i = 0; i < 5; i++) { const a = i / 5 * P * 2; await rome.statueOf(k, 'cae_caesar', { pos: [Math.sin(a) * 4.5, 0, 4 + Math.cos(a) * 4.5], rot: a + P, arm: ['raise', 'point', 'raise', 'point', 'raise'][i], seed: 9 + i }); }
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, 4], rot: 0, laurel: true });
    cz.traverse(c => { if (c.isMesh && c.material && c.material.name && /wool|tunic/i.test(c.material.name)) { c.material = c.material.clone(); c.material.color.set(0x6a1a5a); } });
    const orb = C.orbit(k.camera, [0, 1.8, 4], 3.2, 1.6, -.4, .6, 46, [0, 1.9, 4]);
    return (t, u) => { orb(u); cz.update(t, { mood: 'smug', look: Math.sin(t * .4) * .3 }); };
  },
  // 7.10 a senator's theatre mask is lowered over Augustus's face
  '7.10': async k => {
    const cu = await rome.curia(k, { shaftI: .08 }); k.exposure = .9;
    const oc = await C.person(k, 'cae_octavian', { pos: [0, .45, -9.6], rot: 0, laurel: { gold: true } });
    const mk = mask(); mk.scale.setScalar(.85); k.scene.add(mk);
    rome.key(k.scene, [1, 3.5, -6.5], [0, 2.0, -9.6], { i: 30 });
    const cam = C.dolly(k.camera, { pos: [.3, 2.05, -7.4], look: [0, 2.05, -9.6], fov: 32 }, { pos: [.15, 2.08, -8.3], look: [0, 2.08, -9.6], fov: 28 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); oc.update(t, { mood: 'calm', look: 0 }); const [hx, hy, hz] = C.headPos(oc, .1); const e = ease(seg(t, D * .2, D * .7)); mk.position.set(hx, hy + (1 - e) * .6, hz + .07); };
  },
  // 7.11 Augustus in the mask on the steps, the crowd salutes; slow crane up
  '7.11': async k => {
    await rome.forum(k, { trees: false, sun: [-25, 14, 18] });
    const oc = await C.person(k, 'cae_octavian', { pos: [0, 1.6, -20.6], rot: 0, laurel: { gold: true } });
    const mk = mask(); mk.scale.setScalar(.85); k.scene.add(mk);
    const crowd = []; for (let i = 0; i < 24; i++) crowd.push(await C.person(k, [...C.CIT, ...C.SEN][i % 18], { pos: [-5 + (i % 8) * 1.4, 0, -14 + Math.floor(i / 8) * 2], rot: P, seed: 1400 + i }));
    const cam = C.dolly(k.camera, { pos: [2, 1.6, -7.5], look: [0, 2.6, -18], fov: 44 }, { pos: [2, 7.5, -4.5], look: [0, 1.5, -16], fov: 48 });
    return (t, u) => { cam(u); oc.update(t, { mood: 'calm', arm: 'raise' }); const [hx, hy, hz] = C.headPos(oc, .1); mk.position.set(hx, hy, hz + .07); crowd.forEach((p, i) => p.update(t, { arm: Math.sin(t * 1.5 + i) > -.2 ? 'raise' : null, mood: 'happy' })); };
  },
  // 7.12 end card: Stormi Explain Everything, subscribe
  '7.12': async k => {
    k.noAutoOverlay = true;
    const cu = await rome.curia(k, { shaftI: .12 }); k.exposure = .7;
    const cam = C.dolly(k.camera, { pos: [0, 4, 10], look: [0, 4, -12], fov: 46 }, { pos: [0, 3.9, 8.5], look: [0, 4.1, -12], fov: 44 });
    return (t, u) => { cam(u); const x = k.overlay; x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(0, 0, 1920, 1080);
      const a = ease(seg(t, .2, .9)); x.save(); x.globalAlpha = a; x.translate(0, (1 - a) * 60);
      rome.laurelEmblem(x, 960, 360, 1.6, .9);
      x.textAlign = 'center'; x.fillStyle = '#f4ead6'; x.font = '700 76px "Oswald", "Liberation Sans"'; x.fillText('STORMI EXPLAIN EVERYTHING', 960, 560);
      x.font = '400 40px "Oswald", "Liberation Sans"'; x.fillStyle = '#d8c8a8'; x.fillText('More true stories, told properly', 960, 625);
      const b = ease(seg(t, 1, 1.5)), pulse = 1 + Math.sin(t * 4) * .03 * b; x.translate(960, 760); x.scale(pulse, pulse); x.globalAlpha = a * b;
      x.fillStyle = '#d61f1f'; x.beginPath(); x.roundRect(-210, -52, 420, 104, 52); x.fill(); x.fillStyle = '#fff'; x.font = '700 50px "Oswald", "Liberation Sans"'; x.fillText('SUBSCRIBE', 0, 18); x.restore(); };
  },
};
