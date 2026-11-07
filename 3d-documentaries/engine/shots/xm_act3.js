// The History of Christmas · Act 3 · OLDER THAN CHRISTMAS
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, avoid, village, snowfall, snowGround, pine, xmasTree, cottage, bulbString, sign, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { man, hat, beard, forest, fire, mistletoe, longhall, logProp, feastTable, interiorRoom, gift, roast, candleRow, domeChurch, churchInterior, cribScene, bauble } from './xm_sets.js';
import { column, citizen } from './cae_common.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
const villager = (s, o = {}) => { const p = man({ outfit: ['tunic', 'stola'][s % 2], top: [0x7a5a3a, 0x8a3a2a, 0x4a5a3a, 0x6a4a6a, 0x9a7a4a][s % 5], bot: [0x5a4a3a, 0x6a3a2a, 0x3a4a2a][s % 3], seed: 600 + s, hair: [0x5a3a22, 0xb08a50, 0x2b1e16, 0x9a6a3a][s % 4], beard: s % 3 === 0, mood: 'calm', smile: true, ...o }); hat(p, 'fur'); return p; };
function oak(o = {}) { const g = new THREE.Group(); const B = 0x4a3424; g.add(core.cyl(.35, .5, 4, B, { pos: [0, 2, 0], seg: 10 }));
  const r = core.rng(o.seed ?? 4); for (let i = 0; i < 9; i++) { const a = i / 9 * P * 2; const br = core.cyl(.08, .18, 3, B, { seg: 6 }); br.geometry.translate(0, 1.5, 0); br.position.set(0, 3.2 + r() * 1.2, 0); br.rotation.set(Math.cos(a) * .9, 0, Math.sin(a) * .9); g.add(br); }
  for (let i = 0; i < 10; i++) g.add(core.sph(.9 + r() * .4, 0x3a5a2a, { pos: [(r() - .5) * 5, 5.2 + r() * 1.8, (r() - .5) * 5], scale: [1, .7, 1] }));
  return core.outline(g, .03); }
export const shots = {
  '3.1': async k => {
    const F = forest(k, { env: 'night', r0: 10 }); const fi = fire({ s: 1.6, i: 18 }); k.scene.add(fi);
    const ring = []; for (let i = 0; i < 9; i++) { const p = villager(i); k.scene.add(p); ring.push(p); }
    const cam = core.camMove(k.camera, { from: [8, 3, 8], to: [-8, 2.4, 7], look: [0, 1.2, 0], fov: 44 });
    const R0 = 4.2;
    return (t, u) => { cam(u, t); F.update(t); fi.update(t);
      ring.forEach((p, i) => { const a = i / ring.length * P * 2 + t * .28; p.position.set(Math.cos(a) * R0, 0, Math.sin(a) * R0); p.rotation.y = -a; p.update(t, { pose: 'walk', dist: t * .28 * R0, arm: i % 2 ? 'raise' : 'none', mood: 'calm' }); }); };
  },
  '3.2': async k => {
    const F = forest(k, { env: 'night', r0: 12, envO: { sunI: 2 } }); const o = oak(); o.position.set(-2, 0, -2); k.scene.add(o);
    const d = man({ outfit: 'stola', top: 0xeeeae0, bot: 0xeeeae0, seed: 640, beard: true, hair: 0xd8d8d8, mood: 'calm' }); hat(d, 'hood', 0xf2efe6); beard(d, 0xe8e8e8, 1.3); d.position.set(-1.2, 0, -.6); d.rotation.y = .5; k.scene.add(d);
    const sickle = core.mesh(new THREE.TorusGeometry(.18, .02, 6, 16, P * 1.2), 0xd8b040); k.scene.add(sickle);
    const ms = mistletoe(); ms.scale.setScalar(2); ms.position.set(1.4, 2.25, .4); k.scene.add(ms);
    const ivy = []; for (let i = 0; i < 14; i++) { const l = core.mesh(new THREE.SphereGeometry(.12, 6, 4), 0x2a6a2a, { scale: [1, .3, 1.2], noOutline: true }); l.position.set(-2 + Math.cos(i) * .52, .4 + i * .22, -2 + Math.sin(i) * .52); k.scene.add(l); ivy.push(l); }
    const f = fl(k, [1.4, 0, .4], -.3);
    const cam = core.camMove(k.camera, { from: [2.6, 1.5, 6.8], to: [1.8, 1.5, 5.0], look: [0, 1.9, -.5], lookTo: [.6, 1.8, 0], fov: 46 });
    const T = k.meta.seconds * .5;
    return (t, u) => { cam(u, t); F.update(t); d.update(t, { arm: 'raise', look: 0 }); d.updateMatrixWorld(); const h = new THREE.Vector3(); d.parts.armR.end.getWorldPosition(h); sickle.position.copy(h); sickle.rotation.z = Math.sin(t * 4) * .4;
      ms.rotation.y = Math.sin(t * .8) * .2; f.update(t, { mood: t > T ? 'wink' : 'happy', look: t > T ? Math.sin(t * 3) * .5 : 0, arm: t > T ? 'shrug' : 'none' }); f.parts.face.children.forEach(c => { if (c.geometry && c.geometry.type === 'CircleGeometry') c.material.opacity = t > T ? .95 : .55; }); };
  },
  '3.3': async k => {
    const F = forest(k, { env: 'night', r0: 16, clearZ: 6 }); const h = longhall(); h.position.set(0, 0, -10); h.rotation.y = .2; k.scene.add(h);
    const glow = new THREE.PointLight(0xffa050, 10, 10); glow.position.set(1.6, 1.4, -1.6); k.scene.add(glow);
    for (const x of [-1.6, 1.6]) { const tch = fire({ s: .3, i: 3 }); tch.position.set(x + .8, 1.6, -1.4); k.scene.add(tch); }
    const cam = core.camMove(k.camera, { from: [6, 12, 14], to: [3, 2.2, 6], look: [0, 3, -10], lookTo: [1.5, 1.6, -2], fov: 44 });
    return (t, u) => { cam(u, t); F.update(t); h.update(t); };
  },
  '3.4': async k => {
    const F = forest(k, { env: 'night', r0: 18, clearZ: 8 }); const h = longhall(); h.position.set(0, 0, -16); k.scene.add(h);
    const dg = new THREE.PointLight(0xffa050, 14, 12); dg.position.set(0, 1.4, -7); k.scene.add(dg);
    const dsp = glowSprite(0xffb060, 3, .7); dsp.position.set(0, 1.1, -7.7); k.scene.add(dsp);
    const lg = logProp(4.5, .45); k.scene.add(lg);
    const pullers = [0, 1, 2, 3].map(i => { const p = villager(10 + i); k.scene.add(p); return p; });
    const ropes = pullers.map(() => { const m = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, 1, 5), core.toon(0xc8a870)); k.scene.add(m); return m; });
    const L = 1.0 * k.meta.seconds;
    const cam = core.camMove(k.camera, { from: [6, 1.6, 6], to: [5, 1.6, 6 - L], look: [0, 1, 4], lookTo: [0, 1, 4 - L], fov: 44, e: x => x });
    return (t, u) => { cam(u, t); F.update(t); h.update(t); const z0 = 6 - u * L;
      lg.position.set(0, .45, z0 + 3.2); lg.rotation.y = P / 2;
      pullers.forEach((p, i) => { const x = (i % 2 ? 1 : -1) * (.6 + Math.floor(i / 2) * .5), z = z0 - Math.floor(i / 2) * 1.2; p.position.set(x, 0, z); p.rotation.y = P; p.update(t, { pose: 'walk', dist: u * L + i * .2, arm: 'hold', mood: 'stern' });
        const a = new THREE.Vector3(x * .6, 1.0, z + .3), b = new THREE.Vector3(0, .5, z0 + 1.0); const r = ropes[i]; r.position.copy(a).add(b).multiplyScalar(.5); r.scale.y = a.distanceTo(b); r.lookAt(b); r.rotateX(P / 2); }); };
  },
  '3.5': async k => {
    const R = interiorRoom(k, { w: 12, d: 8, h: 4.2, wall: 0xa84a32, floor: 0xc8b08a, window: false, lampI: 6 });
    for (let i = 0; i < 4; i++) { const c = column(4.2, .25, 0xe8dcc0); c.position.set(-4.5 + i * 3, 0, -3.6); k.scene.add(c); }
    const tb = feastTable(5); tb.position.set(0, 0, -.6); k.scene.add(tb);
    const seats = []; [[-1.8, -1.55, 0], [-.6, -1.55, 0], [.6, -1.55, 0], [1.8, -1.55, 0], [-1.2, .35, P], [1.2, .35, P]].forEach(([x, z, ry], i) => { const p = citizen(700 + i); p.userData.seatY = -.25; p.position.set(x, -.25, z); p.rotation.y = ry; k.scene.add(p); k.scene.add(core.box(.6, .45, .45, 0x6a4a2e, { pos: [x, .22, z + (ry ? .05 : -.05)] })); seats.push(p); });
    const gf = gift({ s: .28, color: 0x3a7ad8 }); k.scene.add(gf);
    const cam = core.camMove(k.camera, { from: [-4.2, 3.2, 3.6], to: [3.0, 3.0, 3.2], look: [-1, .9, -.8], lookTo: [1, .9, -.8], fov: 42 });
    return (t, u) => { cam(u, t); R.update(t); seats.forEach((p, i) => p.update(t + i, { pose: 'sitDesk', nod: i % 2 === 0, look: Math.sin(t + i) * .3 }));
      const kk = ease(seg((t % 3.2), .6, 2.0)); const A = new THREE.Vector3(-.6, 1.0, -1.1), B = new THREE.Vector3(1.2, 1.0, -.1); gf.position.lerpVectors(A, B, kk); gf.position.y += Math.sin(kk * P) * .4; gf.rotation.y = kk * 2; };
  },
  '3.6': async k => {
    const v = village(k, { snowR: 16 });
    const singers = [0, 1, 2, 3].map(i => { const p = villager(20 + i, { mood: 'calm' }); k.scene.add(p); return p; });
    const pole = core.group(core.cyl(.03, .03, 2.2, 0x5a3a22, { pos: [0, 1.1, 0] })); const stM = core.mesh(new (await import('./xm_common.js')).starGeo(.3), GOLD, { mat: { emissive: new THREE.Color(GOLD), emissiveIntensity: .9 } }); stM.position.y = 2.3; pole.add(stM); const sl = new THREE.PointLight(0xffd070, 4, 6); sl.position.y = 2.3; pole.add(sl); k.scene.add(pole);
    const f = fl(k, [0, 0, 0]);
    const notes = []; for (let i = 0; i < 8; i++) { const n = sign(i % 2 ? '♪' : '♫', .4, { color: '#ffe08a', size: 120 }); k.scene.add(n); notes.push(n); }
    const L = .9 * k.meta.seconds;
    const cam = core.camMove(k.camera, { from: [-10, 1.6, 6.5], to: [-10 + L, 1.6, 6.5], look: [-9.5, 1.2, 0], lookTo: [-9.5 + L, 1.2, 0], fov: 44, e: x => x });
    return (t, u) => { cam(u, t); v.update(t); const x0 = -7 + u * L;
      singers.forEach((p, i) => { p.position.set(x0 - i * 1.1, 0, 0); p.rotation.y = P / 2; p.update(t, { pose: 'walk', dist: u * L, arm: i === 0 ? 'hold' : 'none', mood: 'calm' }); });
      pole.position.set(x0 + .5, 0, .25); pole.rotation.z = Math.sin(t * 2) * .03;
      f.position.set(x0 - 4.6, 0, .2); f.rotation.y = P / 2; f.update(t, { pose: 'hop', dist: u * L, mood: 'happy' });
      notes.forEach((n, i) => { const ph = (t * .45 + i / 8) % 1; n.position.set(x0 - (i % 5) * 1.1 + Math.sin(t * 2 + i) * .2, 2.0 + ph * 1.8, 0); n.material.opacity = 1 - ph; n.lookAt(k.camera.position); }); };
  },
  '3.7': async k => {
    const v = village(k, { env: 'dusk', houses: [[-8, -6, .4], [0, -10, 0], [8, -6, -.4], [-12, 2, 1.2], [12, 2, -1.2]], lamps: [], string: false });
    const tr = xmasTree(5.5, { candles: true, colors: [0xc8282e, 0xd83a2a, 0xe8b32a], n: 30 }); tr.position.set(0, 0, -1); k.scene.add(tr);
    const ppl = [0, 1, 2, 3, 4].map(i => { const p = villager(30 + i); const a = -1.2 + i * .6; p.position.set(Math.sin(a) * 4, 0, -1 + Math.cos(a) * 4); p.rotation.y = a + P; k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [0, 1.6, 11], to: [0, 5.5, 9.5], look: [0, 1.5, -1], lookTo: [0, 4.2, -1], fov: 44 });
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); ppl.forEach((p, i) => p.update(t + i, { arm: i === 2 ? 'point' : 'none', mood: 'calm' })); };
  },
  '3.8': async k => {
    core.setEnv(k, 'dusk', { fogNear: 60, fogFar: 300, shadowSize: 40 });
    k.scene.add(props.ground(0xc8c0b0, 600)); const ch = domeChurch(); ch.position.set(0, 0, -36); k.scene.add(ch);
    const ob = core.group(core.box(1.2, 14, 1.2, 0xd8d0c0, { pos: [0, 7, 0] }), core.mesh(new THREE.ConeGeometry(.9, 2, 4), 0xd8d0c0, { pos: [0, 15, 0], rot: [0, P / 4, 0] })); ob.position.set(-9, 0, -14); core.outline(ob, .03); k.scene.add(ob);
    const tr = xmasTree(14, { n: 140, glow: 14 }); tr.position.set(5, 0, -16); k.scene.add(tr);
    const crowd = people.crowd(18, { seed: 8, mood: 'calm', dx: 1.3, dz: 1.3, face: P }); crowd.position.set(2, 0, -4); k.scene.add(crowd);
    const f = fl(k, [-1.9, 0, 5.6], .5);
    const cam = core.camMove(k.camera, { from: [-3.6, 1.5, 9.5], to: [-3.2, 1.3, 8.6], look: [1, 3.2, -10], lookTo: [3, 8, -16], fov: 52 });
    return (t, u) => { cam(u, t); const up = easeOut(seg(t, .3, 2.6)); tr.rotation.x = -(1 - up) * P / 2.2; tr.update(t); crowd.update(t, { arm: up > .9 ? 'raise' : 'none' });
      f.update(t, { arm: t > 3 ? 'watch' : 'none', mood: t > 3 ? 'proud' : 'surprised' }); };
  },
  '3.9': async k => {
    const C = churchInterior(k); const cr = cribScene(); cr.position.set(0, .45, -2.2); k.scene.add(cr); k.scene.add(core.box(2, .45, 1.2, 0x5a3a22, { pos: [0, .22, -2.2] }));
    const fr = man({ outfit: 'stola', top: 0x6a4a2e, bot: 0x6a4a2e, seed: 660, mood: 'calm', smile: true }); hat(fr, 'hood', 0x5a3a24); fr.position.set(1.4, 0, -1.4); fr.rotation.y = -1.2; k.scene.add(fr);
    const lamb = core.group(core.sph(.07, 0xf2efe6, { scale: [1.4, 1, 1] }), core.sph(.04, 0xf2efe6, { pos: [.09, .04, 0] })); core.outline(lamb, .008); k.scene.add(lamb);
    const cam = core.camMove(k.camera, { from: [-1.5, 1.6, 3.2], to: [-.6, 1.3, 1.2], look: [.2, .8, -2], fov: 42 });
    return (t, u) => { cam(u, t); C.update(t); const kk = ease(seg(t, 1, 3.2)); fr.update(t, { arm: kk < 1 ? 'hold' : 'none', look: .2 }); fr.parts.body.rotation.x = Math.sin(kk * P) * .25;
      fr.updateMatrixWorld(); const h = new THREE.Vector3(); fr.parts.armR.end.getWorldPosition(h); const dst = new THREE.Vector3(.35, .62, -1.95); lamb.position.lerpVectors(h, dst, kk); };
  },
  '3.10': async k => {
    k.scene.background = new THREE.Color(0x0e1a14); k.scene.add(new THREE.HemisphereLight(0xffffff, 0x223322, 1.5)); const dl = new THREE.DirectionalLight(0xffffff, 2); dl.position.set(-3, 5, 6); k.scene.add(dl);
    const bokeh = []; const r = core.rng(2); for (let i = 0; i < 40; i++) { const b = glowSprite([0xffd060, 0xff6060, 0x60ff90][i % 3], .5 + r(), .35); b.position.set((r() - .5) * 18, (r() - .5) * 9, -6 - r() * 4); k.scene.add(b); bokeh.push(b); }
    const cols = [0xc8282e, 0x2f8a4e, 0xe8b32a]; const labels = ['BLOOD OF CHRIST', 'ETERNAL LIFE', 'GIFTS OF THE MAGI'];
    const bs = cols.map((c, i) => { const g = new THREE.Group(); const b = bauble(c, .8); b.position.y = -1; g.add(b); const rib = core.box(.03, 4, .01, GOLD, { pos: [0, 1.2, 0], noOutline: true }); g.add(rib);
      const lb = sign(labels[i], .5, { size: 90 }); lb.position.set(0, -2.25, .3); g.add(lb); g.lb = lb; g.b = b; g.position.set(-3 + i * 3, 0, 0); k.scene.add(g); return g; });
    const cam = core.camMove(k.camera, { from: [-2, 0, 8], to: [2, -.3, 7.5], look: [-1, -.6, 0], lookTo: [1, -.6, 0], fov: 42 });
    const span = (k.meta.seconds - 1) / 3.2;
    return (t, u) => { cam(u, t); bs.forEach((g, i) => { const d = easeOut(seg(t, .2 + i * span * .9, 1.0 + i * span * .9)); g.position.y = 4 * (1 - d); g.rotation.z = Math.sin(t * 1.6 + i) * .06 * d; const lit = t > .9 + i * span * .9;
      g.b.ball.material.emissiveIntensity = lit ? .45 + Math.sin(t * 4) * .05 : .05; g.lb.material.opacity = lit ? 1 : 0; });
      bokeh.forEach((b, i) => b.material.opacity = .25 + Math.sin(t * 1.5 + i) * .1); };
  },
  '3.11': async k => {
    const v = village(k, { snowR: 14 }); const f = fl(k, [0, 0, 0]);
    const tr = xmasTree(2.6); k.scene.add(tr);
    const reg = core.group(core.box(.6, .35, .45, 0xb89040, { pos: [0, .9, 0] }), core.box(.5, .2, .1, 0x8a6a2a, { pos: [0, 1.15, -.12], rot: [-.5, 0, 0] }), core.box(.7, .9, .5, 0x5a3a22, { pos: [0, .45, 0] })); core.outline(reg, .012); reg.position.set(1.6, 0, -.3); k.scene.add(reg);
    const cam = core.camMove(k.camera, { from: [.2, 1.5, 4.4], to: [0, 1.45, 3.4], look: [.2, 1.25, 0], fov: 42 });
    const T = k.meta.seconds * .3;
    return (t, u) => { cam(u, t); v.update(t); tr.update(t);
      const hk = ease(seg(t, T, T + .6)); const S = f.parts.santa; S.visible = hk > 0; f.parts.beanie.visible = hk < .85; S.position.y = (1 - hk) * .9; f.update(t, { mood: t > T + .8 ? 'wink' : 'happy', hat: hk > 0 ? 'santa' : 'beanie', arm: hk > 0 && hk < 1 ? 'up' : 'none' });
      if (hk > 0) { S.visible = true; f.parts.beanie.visible = hk < .85; }
      const tk = easeOut(seg(t, T + 1.2, T + 1.9)); tr.position.set(lerp(-6, -1.6, tk), 0, -.3); tr.visible = tk > 0; };
  },
};
