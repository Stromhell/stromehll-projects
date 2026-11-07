// The History of Christmas · Act 4 · SANTA
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, avoid, village, snowfall, snowGround, pine, xmasTree, cottage, sign, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { man, hat, beard, cape, trim, santaMan, animal, desert, stoneHouse, waterPlane, calendar, coinBag, interiorRoom, shopWindow, northPole, sleigh, forest, broom, gift, fire } from './xm_sets.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
const nicholas = () => { const p = man({ outfit: 'stola', top: 0xf2efe6, bot: 0xf2efe6, seed: 801, hair: 0xe8e8e8, skin: 0xe8b090, mood: 'calm', smile: true }); hat(p, 'mitre'); beard(p, 0xf2f2ee, 1.25); cape(p, 0xa8222a);
  const staff = core.group(core.cyl(.025, .025, 2, GOLD, { pos: [0, 1, 0] }), core.mesh(new THREE.TorusGeometry(.12, .02, 6, 14, P * 1.4), GOLD, { pos: [-.08, 2.05, 0] })); core.outline(staff, .01); p.staff = staff; return p; };
const kid = (s) => people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2'][s % 6], seed: 830 + s, scale: .62, hair: [0x2b1e16, 0x8a6a3a, 0xb08a50, 0x5a3a22][s % 4], mood: 'calm', smile: true });
export const shots = {
  '4.1': async k => {
    const v = village(k, { houses: [[0, -6, 0], [-9, -9, .3], [9, -9, -.3]], lamps: [[-4, 2]], string: false });
    const spot = new THREE.SpotLight(0xfff2d0, 0, 30, .22, .4); spot.position.set(4, 12, 6); spot.target.position.set(1.25, 5.2, -6.7); k.scene.add(spot, spot.target);
    const beam = glowSprite(0xfff2d0, 1, .0); beam.scale.set(2.4, 2.4, 1); beam.position.set(1.25, 5.6, -6.6); k.scene.add(beam);
    const f = fl(k, [-1.2, 0, 1.2], .3); const bucket = core.cyl(.24, .2, .4, 0x6a7a8a, { pos: [-.6, .2, 1.6] }); core.outline(bucket, .012); k.scene.add(bucket);
    const cam = core.camMove(k.camera, { from: [-1, 1.6, 7], to: [.4, 3.2, 3], look: [-.6, 1.2, 1], lookTo: [1.25, 4.8, -6.7], fov: 46 });
    const T = k.meta.seconds * .5;
    return (t, u) => { cam(u, t); v.update(t); const on = t > T ? 1 : 0; spot.intensity = on * 800; beam.material.opacity = on * .55;
      f.update(t, { arm: t < T ? 'drum' : 'up', mood: t < T ? 'happy' : 'surprised' }); ui.slam(k.overlay, 'SANTA CLAUS', t, T + .1, { size: 150, y: 300 }); };
  },
  '4.2': async k => {
    desert(k, { env: 'day', white: true, houses: 14, townZ: -12, palms: 4, star: false }); waterPlane(k, { z: -150, color: 0x2a8ac0 });
    const n = nicholas(); k.scene.add(n); k.scene.add(n.staff);
    const birds = []; for (let i = 0; i < 4; i++) { const b = core.group(core.box(.5, .04, .12, 0xf2f2ee), core.box(.5, .04, .12, 0xf2f2ee)); b.children[0].position.x = -.25; b.children[1].position.x = .25; k.scene.add(b); birds.push(b); }
    const L = 1.15 * k.meta.seconds;
    const cam = core.camMove(k.camera, { from: [-6, 1.6, 5], to: [-6 + L, 1.6, 5], look: [-5, 1.3, -1], lookTo: [-5 + L, 1.3, -1], fov: 42, e: x => x });
    return (t, u) => { cam(u, t); walkPath(n, [-6.5, 0, -1], [-6.5 + L, 0, -1], 0, k.meta.seconds, t, { mood: 'calm' }); n.updateMatrixWorld(); const h = new THREE.Vector3(); n.parts.armR.end.getWorldPosition(h); n.staff.position.set(h.x, 0, h.z + .05);
      birds.forEach((b, i) => { b.position.set(-8 + u * L * 1.4 + i * 2, 7 + Math.sin(t * 2 + i) * .5, -8 - i); b.children[0].rotation.z = Math.sin(t * 9 + i) * .5; b.children[1].rotation.z = -Math.sin(t * 9 + i) * .5; }); };
  },
  '4.3': async k => {
    desert(k, { env: 'night', white: true, town: false, palms: 2, star: false });
    const h = stoneHouse({ w: 6, h: 3.4, d: 4, color: 0xd8d0c0 }); h.position.set(0, 0, -2); k.scene.add(h); const win = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1), new THREE.MeshBasicMaterial({ color: 0xd89040 })); win.position.set(1.2, 1.7, .03); k.scene.add(win);
    const kids = [0, 1, 2].map(i => { const p = kid(i); p.position.set(.6 + i * .6, 0, .7); p.rotation.y = -.3; k.scene.add(p); return p; });
    const room = { position: new THREE.Vector3(), intensity: 0 }; room.position.set(1.2, 1.7, -.6); 
    const n = nicholas(); n.position.set(-1.6, 0, 1.2); n.rotation.y = 1.1; k.scene.add(n);
    const bag = coinBag(); k.scene.add(bag);
    const cam = core.camMove(k.camera, { from: [-3.4, 1.8, 8.5], to: [-1.6, 1.7, 7], look: [-.2, 1.3, 0], lookTo: [.4, 1.2, 0], fov: 44 });
    const T = k.meta.seconds * .35;
    return (t, u) => { cam(u, t); n.update(t, { arm: t < T + .2 ? 'point' : 'none', look: 0 }); n.updateMatrixWorld(); const hp = new THREE.Vector3(); n.parts.armR.end.getWorldPosition(hp);
      const fk = ease(seg(t, T, T + .9)); const dst = new THREE.Vector3(1.2, 1.7, -.3); bag.position.lerpVectors(hp, dst, fk); bag.position.y += Math.sin(fk * P) * .6; bag.visible = fk < 1;
      const cheer = t > T + 1; room.intensity = cheer ? 6 : 3; win.material.color.setHex(cheer ? 0xf0b050 : 0xd89040);
      kids.forEach((p, i) => { const up = easeOut(seg(t, T + 1 + i * .25, T + 1.5 + i * .25)); p.visible = up > 0; p.position.z = lerp(-.4, .9, up); p.update(t, { arm: cheer ? 'raise' : 'none', mood: 'calm' }); }); };
  },
  '4.4': async k => {
    const R = interiorRoom(k, { w: 10, d: 7, h: 4, wall: 0xc8b898, floor: 0x7a5a3e, fireplace: true, fpPos: [-3, 0, -3.24] });
    const c1 = calendar('6\nDECEMBER', { head: 'ST NICHOLAS', size: 120 }); const c2 = calendar('25\nDECEMBER', { head: 'CHRISTMAS', size: 120 });
    [c1, c2].forEach(c => { c.scale.setScalar(1.5); k.scene.add(c); });
    const cam = core.camMove(k.camera, { from: [-.6, 2.1, 2.6], to: [.6, 2.1, 2.6], look: [-.6, 2.1, -3], lookTo: [.6, 2.1, -3], fov: 44 });
    return (t, u) => { cam(u, t); R.update(t); const kk = ease(seg(t, .6, k.meta.seconds - .8)); c1.position.set(-1.3 + kk * 2.6, 2.1, -3.4); c2.position.set(1.3, 2.1, -3.4); c2.visible = kk > .02; c1.visible = kk < .98; c1.rotation.z = Math.sin(kk * P) * .15; c2.scale.setScalar(1.5 * Math.max(.01, easeOut(seg(kk, .4, 1)))); };
  },
  '4.5': async k => {
    k.scene.background = new THREE.Color(0x2a1e18); k.scene.add(new THREE.HemisphereLight(0xfff0d8, 0x3a2a1a, 2.2)); const dl = new THREE.DirectionalLight(0xffffff, 2); dl.position.set(3, 5, 6); k.scene.add(dl);
    const np = props.newspaper('DUTCH FAMILIES HONOUR SINTERKLAAS', 'NEW YORK, DECEMBER 1773'); np.scale.setScalar(1.3); k.scene.add(np);
    const w1 = sign('SINTERKLAAS', .55, { color: '#ffe08a', size: 140 }); const w2 = sign('SANTA CLAUS', .65, { color: '#ff5050', size: 140 }); [w1, w2].forEach(w => { w.position.set(0, -1.5, .5); k.scene.add(w); });
    const f = fl(k, [2.6, -2.1, -.6], -.4);
    const cam = core.camMove(k.camera, { from: [0, -.3, 6.2], to: [0, -.4, 5.4], look: [0, -.4, 0], fov: 42 });
    const T = k.meta.seconds * .6;
    return (t, u) => { cam(u, t); const sp = easeOut(seg(t, 0, 1.2)); np.rotation.z = (1 - sp) * P * 3; np.scale.setScalar(1.3 * Math.max(.02, sp)); np.position.set(-.4, .5 + (1 - sp) * 2, 0);
      const sq = seg(t, T, T + 1.2); w1.visible = sq < .5 && t > T - 1.5; w1.scale.set(Math.max(.05, 1 - sq * 1.6), 1, 1); w1.material.opacity = clamp((t - (T - 1.5)) / .3);
      w2.visible = sq >= .5; w2.scale.setScalar(Math.max(.05, easeOut(seg(sq, .5, 1)) * (1 + Math.sin(t * 6) * .02)));
      f.update(t, { mood: t > T ? 'surprised' : 'happy', arm: t > T + 1.2 ? 'up' : 'none', look: -.3 }); };
  },
  '4.6': async k => {
    const v = village(k, { houses: [[-14, -8, .4], [14, -8, -.4]], lamps: [[-3.5, 1.6], [6, 1.6]], string: false });
    const sw = shopWindow(); sw.position.set(0, 0, -4); k.scene.add(sw);
    const santa = santaMan({ mood: 'calm' }); santa.position.set(-.6, .62, -3.6); santa.rotation.y = 0; k.scene.add(santa); santa.userData.auto = false;
    const tr = xmasTree(1.8); tr.position.set(-2.2, .62, -3.7); k.scene.add(tr);
    const q = []; for (let i = 0; i < 14; i++) { const p = kid(i); p.position.set(-5 + i * .95, 0, -1.2 + (i % 2) * .3); p.rotation.y = -P / 2 + .5; k.scene.add(p); q.push(p); }
    const cam = core.camMove(k.camera, { from: [8, 1.4, 4], to: [-3, 1.5, 4.2], look: [5, 1, -2], lookTo: [-1, 2.2, -3.5], fov: 48 });
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); santa.update(t * .2); q.forEach((p, i) => p.update(t + i, { arm: i % 4 === 0 ? 'point' : 'none', look: Math.sin(t + i) * .3 })); };
  },
  '4.7': async k => {
    const R = interiorRoom(k, { w: 10, d: 8, h: 4.5, wall: 0x6a5a7a, floor: 0x5a4a5a, window: false, lampI: 6 });
    const sp = new THREE.SpotLight(0xffffff, 300, 20, .5, .5); sp.position.set(0, 7, 3); sp.target.position.set(0, 1, 0); k.scene.add(sp, sp.target);
    const s = santaMan(); s.userData.auto = false; s.position.set(0, 0, 0); k.scene.add(s);
    const coatM = []; s.parts.torso.traverse(m => m.material && coatM.push(m)); [s.parts.armL, s.parts.armR, s.parts.legL, s.parts.legR].forEach(l => l.pivot.traverse(m => { if (m.isMesh && !m.userData.isOutline && m.material.color && m.material.color.getHex() !== 0xffffff) coatM.push(m); }));
    s.parts.body.children.forEach(m => { if (m.isMesh && m.material && m.material.color && m.material.color.getHex() === RED) coatM.push(m); });
    const f = fl(k, [1.8, 0, .8], -.6);
    const cols = [0x2f7a3e, 0x2a5ab0, 0xf2f2ee, RED];
    const cam = core.camMove(k.camera, { from: [-3, 1.6, 4.5], to: [2.5, 1.6, 4.8], look: [.4, 1.2, 0], fov: 42 });
    return (t, u) => { cam(u, t); const i = Math.min(3, Math.floor(u * 4.4)); const c = new THREE.Color(cols[i]); coatM.forEach(m => { m.material = m.material.clone(); m.material.color.copy(c); });
      s.update(t, { arm: i === 3 ? 'raise' : 'none' }); f.update(t, { pose: 'dizzy', mood: i === 3 ? 'happy' : 'surprised' }); };
  },
  '4.8': async k => {
    const N = northPole(k, { env: 'night' }); k.scene.add(N.pole); N.pole.position.set(-3, 0, -3);
    const sl = sleigh(); sl.position.set(1.5, 0, -1); sl.rotation.y = -P / 2; k.scene.add(sl);
    const deer = []; for (let i = 0; i < 4; i++) { const d = animal('reindeer'); d.position.set(-1.2 + (i % 2 ? .8 : -.8) * 0 + (i % 2 ? .7 : -.7), 0, 0); k.scene.add(d); deer.push(d); }
    deer.forEach((d, i) => { d.position.set(4.2 + Math.floor(i / 2) * 2.2, 0, -1 + (i % 2 ? .75 : -.75)); d.rotation.y = P / 2; });
    const f = fl(k, [4.2, 0, 1.2], P * .9);
    const cam = core.camMove(k.camera, { from: [0, 8, 12], to: [2, 1.7, 7], look: [-3, 3, -3], lookTo: [3.2, 1.0, -.6], fov: 46 });
    return (t, u) => { cam(u, t); N.update(t); deer.forEach((d, i) => d.idle(t + i)); f.update(t, { arm: t > 2 ? 'point' : 'none', mood: 'happy', look: .4 }); };
  },
  '4.9': async k => {
    const v = village(k, { env: 'night' });
    const ck = people.person({ outfit: 'dress2', top: 0xf6f2ea, bot: 0xf6f2ea, seed: 850, hair: 0xe8c060, scale: .78, mood: 'calm', smile: true }); ck.userData.auto = false; k.scene.add(ck);
    for (const s of [-1, 1]) { const w = core.mesh(new THREE.SphereGeometry(.35, 16, 10), 0xffffff, { scale: [.25, 1, .6], pos: [s * .25, 1.15, -.25], rot: [0, 0, s * .5] }); ck.add(w); } const glow = glowSprite(0xffe8a0, 3, .55); glow.position.y = 1.1; ck.add(glow); const gl = new THREE.PointLight(0xffe0a0, 6, 8); gl.position.y = 1.2; ck.add(gl);
    const g = gift({ s: .3 }); k.scene.add(g);
    const cam = core.camMove(k.camera, { from: [0, 1.8, 9], to: [0, 2.6, 6], look: [0, 3, 0], lookTo: [0, 3.2, 0], fov: 44 });
    return (t, u) => { cam(u, t); v.update(t); ck.position.set(-3 + u * 6, 3 + Math.sin(t * 1.5) * .25, -1); ck.rotation.y = P / 2 - .6; ck.update(t, { arm: 'hold' });
      ck.updateMatrixWorld(); const h = new THREE.Vector3(); ck.parts.armR.end.getWorldPosition(h); g.position.copy(h).add(new THREE.Vector3(.0, -.15, .15)); };
  },
  '4.10': async k => {
    core.setEnv(k, 'night', { fogNear: 25, fogFar: 110, shadowSize: 40 }); snowGround(k, { flat: 60 });
    const L0 = 2.2 * k.meta.seconds; const r = core.rng(41); const sf = snowfall(k, { r: 20, center: [L0 / 2, 0, 0] });
    for (let i = 0; i < 46; i++) { const pn = pine(2.5 + r() * 3); pn.position.set(-10 + r() * (L0 + 24), 0, -5 - r() * 22); k.scene.add(pn); }
    const F = { update: t => sf.update(t) };
    const sl = sleigh({ color: 0x8a5a2a }); sl.scale.setScalar(.7); k.scene.add(sl);
    const elf = people.person({ outfit: 'tunic', top: 0x6a5a3a, bot: 0x4a3a2a, seed: 860, scale: .6, mood: 'calm', smile: true }); hat(elf, 'elf'); beard(elf, 0xf2f2ee, 1.1); elf.userData.seatY = 0; k.scene.add(elf);
    const goats = [0, 1].map(() => { const g = animal('goat'); k.scene.add(g); return g; });
    const reins = goats.map(() => { const m = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, 1, 4), core.toon(0x3a2a1a)); k.scene.add(m); return m; });
    const L = 2.2 * k.meta.seconds;
    const cam = core.camMove(k.camera, { from: [-2.6, 1.7, 6], to: [-2.6 + L, 1.7, 6], look: [-3, .7, 0], lookTo: [-3 + L, .7, 0], fov: 44, e: x => x });
    return (t, u) => { cam(u, t); F.update(t); const x = -4 + u * L; sl.position.set(x, 0, 0); sl.rotation.y = 0;
      elf.position.set(x - .3, .33 - .0, 0); elf.rotation.y = P / 2; elf.update(t, { pose: 'sit', arm: 'hold' }); elf.position.y = .33 - .25;
      goats.forEach((g, i) => { g.position.set(x + 2.2, 0, i ? .35 : -.35); g.rotation.y = P / 2; g.walk(u * L * 1.1 + i * .3, t); });
      elf.updateMatrixWorld(); const h = new THREE.Vector3(); elf.parts.armR.end.getWorldPosition(h);
      reins.forEach((r, i) => { const b = new THREE.Vector3(x + 2.5, .8, i ? .35 : -.35); r.position.copy(h).add(b).multiplyScalar(.5); r.scale.y = h.distanceTo(b); r.lookAt(b); r.rotateX(P / 2); }); };
  },
  '4.11': async k => {
    const v = village(k, { houses: [[0, -4, 0], [-9, -8, .3], [9, -8, -.3]], lamps: [[-4, 1]], string: false });
    const goat = man({ outfit: 'tunic', top: 0x5a4030, bot: 0x4a3020, seed: 870, mood: 'stern' }); hat(goat, 'horns'); hat(goat, 'fur'); goat.position.set(0, 0, -1.4); k.scene.add(goat); goat.userData.auto = false;
    const s = santaMan(); s.position.set(0, 0, -1.4); s.userData.auto = false; k.scene.add(s);
    const puff = glowSprite(0xffffff, 3, 0); puff.material.blending = THREE.NormalBlending; puff.position.set(0, 1.2, -1); k.scene.add(puff);
    const tr = xmasTree(2.4); tr.position.set(-2.6, 0, .2); k.scene.add(tr);
    const f = fl(k, [2.2, 0, 1.0], -.6);
    const cam = core.camMove(k.camera, { from: [-.4, 1.5, 6], to: [.2, 1.45, 4.6], look: [.6, 1.2, -.5], fov: 42 });
    const T = k.meta.seconds * .5;
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); const pk = seg(t, T - .2, T + .5); puff.material.opacity = Math.sin(pk * P) * .95; puff.scale.setScalar(2 + pk * 3);
      goat.visible = t < T + .1; s.visible = t >= T + .1; goat.update(t, { arm: 'raise', mood: 'stern' }); s.update(t, { arm: 'raise' });
      const hide = t < T + .3; f.position.x = hide ? 2.6 : lerp(2.6, 1.9, ease(seg(t, T + .3, T + .8))); f.update(t, { mood: hide ? 'worried' : 'happy', pose: hide ? 'shiver' : 'jump', jp: seg(t, T + .8, T + 1.4) % 1 }); };
  },
  '4.12': async k => {
    const v = village(k, { env: 'night', houses: [[-8, -6, .2], [0, -4, 0], [8, -6, -.2], [-14, 2, .9], [14, 2, -.9]] });
    const moon = glowSprite(0xfff4d0, 14, .95); moon.position.set(-20, 26, -60); k.scene.add(moon); k.scene.add(new THREE.Mesh(new THREE.CircleGeometry(3, 32), new THREE.MeshBasicMaterial({ color: 0xfff6dc, fog: false }))).children.at(-1).position.set(-20, 26, -60);
    const w = people.person({ outfit: 'dress1', top: 0x3a2a3a, bot: 0x3a2a3a, seed: 880, hair: 0x8a8a8a, mood: 'calm', smile: true }); hat(w, 'witch'); w.userData.auto = false; k.scene.add(w);
    const br = broom(); k.scene.add(br); const tg = gift({ s: .3, color: GREEN }); k.scene.add(tg);
    const ch = new THREE.Vector3(1.25, 6.0, -4.7);
    k.camera.fov = 44; k.camera.updateProjectionMatrix(); const cp = new THREE.Vector3(), lk = new THREE.Vector3();
    return (t, u) => { v.update(t); const fly = ease(seg(t, 0, k.meta.seconds * .75)); const dive = ease(seg(t, k.meta.seconds * .75, k.meta.seconds - .3));
      const p = new THREE.Vector3(lerp(-14, ch.x, fly), lerp(9.5, ch.y + 2, fly) - dive * 2.2 + Math.sin(t * 2) * .2 * (1 - dive), lerp(-10, ch.z, fly));
      br.position.copy(p); br.rotation.set(0, -.5 * (1 - fly), dive * -1.2); w.position.set(p.x - .1, p.y - .1 - .45, p.z); w.rotation.y = P / 2 - .5 * (1 - fly); w.update(t, { pose: 'sit', arm: 'hold' }); w.position.y = p.y - .1 - .92; w.scale.setScalar(1 - dive * .4);
      tg.position.set(p.x - .5, p.y + .05, p.z);
      const want = new THREE.Vector3(p.x + 3.2, p.y + .6 + dive * 1.2, p.z + 5.2 - fly * .8); if (t === 0 || !cp.lengthSq()) cp.copy(want); cp.lerp(want, .2); k.camera.position.copy(cp); lk.lerp(p, t === 0 || !lk.lengthSq() ? 1 : .25); k.camera.lookAt(lk); const vis = dive < .95; [w, br, tg].forEach(o => o.visible = vis); };
  },
};
