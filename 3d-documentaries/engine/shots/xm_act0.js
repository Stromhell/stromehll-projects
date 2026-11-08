// The History of Christmas · Act 0 · CHRISTMAS EVE
import { core, THREE, ui, props, flurry, village, xmasTree, snowGround, snowfall, pine, glowSprite, sign, popIn, bubble, cottage, bulbString, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { globe, calendar, mistletoe, roast, book, sled, mug, lantern, gift, forest, stoneHouse } from './xm_sets.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0, o = {}) => { const f = flurry(o); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
// snow puff burst: little snowballs flying out from a point, starting at t0
function puff(k, at, t0, n = 18) {
  const g = new THREE.Group(); const r = core.rng(5); const bits = [];
  for (let i = 0; i < n; i++) { const b = core.sph(.06 + r() * .05, SNOW, { noOutline: true }); g.add(b); bits.push([b, (r() - .5) * 3, 1.5 + r() * 2.5, (r() - .5) * 3]); }
  g.position.set(...at); k.scene.add(g);
  return t => bits.forEach(([b, vx, vy, vz]) => { const tt = t - t0; b.visible = tt > 0 && tt < 1.4; const T = Math.max(0, tt); b.position.set(vx * T, Math.max(0, vy * T - 4.9 * T * T), vz * T); });
}
export const shots = {
  '0.1': async k => {
    const v = village(k);
    const f = fl(k, [0, -1.9, 0]);
    const drift = core.sph(1.25, SNOW, { seg: 28 }); drift.scale.set(1.1, .42, 1); k.scene.add(drift);
    const pf = puff(k, [0, .5, 0], 1.0);
    const tree = xmasTree(5); tree.position.set(5.5, 0, -7); k.scene.add(tree);
    const cam = core.camMove(k.camera, { from: [2.4, 1.6, 9], to: [1.4, 1.35, 4.6], look: [0, .9, 0], lookTo: [0, 1.15, 0], fov: 42 });
    return (t, u) => { cam(u, t); v.update(t); tree.update(t); pf(t);
      const rise = easeOut(seg(t, .8, 2.0)); f.position.y = -1.9 * (1 - rise);
      drift.scale.set(1.1 + rise * .15, .42 * (1 - rise * .75), 1 + rise * .15);
      f.update(t, { mood: t < 2.8 ? 'surprised' : 'happy', pose: t > 2.1 && t < 2.8 ? 'shiver' : 'idle', arm: t > 2.9 ? 'up' : 'none' }); };
  },
  '0.2': async k => {
    const v = village(k);
    const f = fl(k, [0, 0, -3]);
    const b = bubble('HELLO, FUTURE!', { size: 80, w: 1.9 }); b.position.set(1.5, 2.4, -1); b.userData.person = true; b.userData.auto = false; k.scene.add(b);
    const tree = xmasTree(5); tree.position.set(-5, 0, -7); k.scene.add(tree);
    const cam = core.camMove(k.camera, { from: [3.5, 1.5, 5], to: [-1.2, 1.4, 4.4], look: [0, 1.1, -1.5], lookTo: [0, 1.2, -.6], fov: 40 });
    return (t, u) => { cam(u, t); v.update(t); tree.update(t);
      const hop = ease(seg(t, .3, 2.6)); const d = hop * 2.4; f.position.z = -3 + d;
      f.update(t, { pose: hop > 0 && hop < 1 ? 'hop' : 'idle', dist: d, arm: t > 2.6 ? 'wave' : 'none', mood: 'happy' });
      const bs = easeOut(seg(t, k.meta.seconds * .55, k.meta.seconds * .55 + .4)); b.visible = bs > 0; b.scale.setScalar(Math.max(.001, bs)); b.position.y = 2.3 + bs * .2 + Math.sin(t * 2) * .03; b.lookAt(k.camera.position); };
  },
  '0.3': async k => {
    const G = globe(k);
    const cam = core.camMove(k.camera, { from: [0, 2, 22], to: [0, 1.2, 14], look: [0, 0, 0], fov: 40, drift: .02 });
    return (t, u) => { cam(u, t); G.update(t); };
  },
  '0.4': async k => {
    core.setEnv(k, 'night', { fogNear: 30, fogFar: 120, shadowSize: 30, sunI: 1.4 });
    snowGround(k, { flat: 30 });
    const ups = [];
    // a street of dark-timber shops with grey tiled roofs, red paper lanterns strung across
    for (let i = 0; i < 7; i++) for (const s of [-1, 1]) {
      const h = new THREE.Group(); const W = 4.2; const ht = 3.4 + (i % 3) * .5;
      h.add(core.box(W, ht, 4, [0x4a3424, 0x5a3a28, 0x3e2e22][i % 3], { pos: [0, ht / 2, 0] }));
      h.add(core.box(W + 1, .3, 5.2, 0x3a3e48, { pos: [0, ht + .15, 0] })); h.add(core.box(W + .4, .6, 4.4, 0x4a4e58, { pos: [0, ht + .55, 0] }));
      h.add(core.box(W + 1.04, .12, 5.24, SNOW, { pos: [0, ht + .33, 0], noOutline: true })); h.add(core.box(W + .44, .12, 4.44, SNOW, { pos: [0, ht + .9, 0], noOutline: true }));
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshBasicMaterial({ color: 0xffe0a8 })); sh.position.set(0, 1.4, 2.01); h.add(sh);
      for (let j = 0; j < 4; j++) h.add(core.box(.05, 1.6, .03, 0x2a1e16, { pos: [-.9 + j * .6, 1.4, 2.03], noOutline: true }));
      h.position.set(s * 6.5, 0, -i * 5.2 + 6); h.rotation.y = -s * P / 2; core.outline(h, .02); k.scene.add(h);
    }
    for (let i = 0; i < 6; i++) { const z = -i * 5.2 + 6; const s = bulbString([-5, 3.6, z], [5, 3.6, z - 1], { n: 8, colors: [0xff4030], r: .0001, sag: .5 }); k.scene.add(s);
      for (let j = 1; j < 6; j++) { const L = lantern(0xd83a2a); L.position.set(-5 + j * 10 / 6, 3.0 - Math.sin(j / 6 * P) * .5, z - j / 6); k.scene.add(L); ups.push({ update: t => L.rotation.z = Math.sin(t * 1.6 + j) * .08 }); } }
    const tree = xmasTree(8, { n: 90, glow: 10 }); tree.position.set(0, 0, -26); k.scene.add(tree); ups.push(tree);
    ups.push(snowfall(k, { r: 14, center: [0, 0, -4] }));
    const f = fl(k, [-2, 0, 2]);
    const cam = core.camMove(k.camera, { from: [-4.2, 1.6, 8], to: [-3.2, 1.7, -3], look: [-1.5, 1.1, 1], lookTo: [0, 2.2, -16], fov: 44 });
    return (t, u) => { cam(u, t); ups.forEach(x => x.update(t)); const d = ease(u) * 11; f.position.set(-1.6 + Math.sin(u * P) * .6, 0, 2 - d); f.rotation.y = P + Math.sin(u * P) * .2;
      f.update(t, { pose: 'slide', mood: 'happy', arm: 'up' }); };
  },
  '0.5': async k => {
    const v = village(k, { snowR: 14 });
    const f = fl(k, [0, 0, 0]);
    const c = calendar('DEC\n25', { head: 'DECEMBER', size: 190 }); c.scale.setScalar(.55); k.scene.add(c);
    const q = calendar('?', { head: 'REALLY?', size: 380 }); q.scale.setScalar(.55); k.scene.add(q);
    const cam = core.camMove(k.camera, { from: [-.4, 1.4, 4.6], to: [-.2, 1.35, 3.6], look: [.3, 1.15, 0], fov: 40 });
    return (t, u) => { cam(u, t); v.update(t);
      const T = k.meta.seconds * .5; const fk = ease(seg(t, T, T + .5));
      // he holds the page out in front at chest height; it spins over to reveal the question mark
      for (const [o, base] of [[c, 0], [q, P]]) { o.position.set(.62, .98, .5); o.rotation.y = base + fk * P; o.visible = Math.cos(o.rotation.y) > 0; }
      f.update(t, { arm: 'hold', mood: t > T + .3 ? 'shock' : 'happy', look: 0, pose: t > T + .3 && t < T + .9 ? 'jump' : 'idle', jp: seg(t, T + .3, T + .9) }); };
  },
  '0.6': async k => {
    const v = village(k, { snowR: 14 });
    const f = fl(k, [0, 0, 0]);
    const tree = xmasTree(2.4); const ms = mistletoe(); const bk = book({ cover: 0x8a1a2a }); const rs = roast(.45);
    const items = [[tree, [-1.9, 0, -.6]], [ms, [-1.0, 2.3, .6]], [bk, [1.5, 1.2, .3]], [rs, [1.9, .0, -.3]]];
    bk.open(.0); bk.rotation.x = P / 2.3;
    const stand = core.box(.7, .9, .7, 0x6a4a2e, { pos: [1.9, .45, -.3] }); k.scene.add(stand);
    items.forEach(([o]) => k.scene.add(o));
    const cam = core.camMove(k.camera, { from: [-2.5, 1.6, 5.2], to: [2.3, 1.5, 5.0], look: [0, 1.1, 0], fov: 42 });
    const T0 = k.meta.voA ?? .35, span = (k.meta.seconds - 1.6) / 4;
    return (t, u) => { cam(u, t); v.update(t); tree.update(t);
      items.forEach(([o, p], i) => { const kk = easeOut(seg(t, T0 + i * span, T0 + i * span + .5)); const from = [p[0] * 3.5, p[1] + (i === 1 ? 3 : 0), p[2] - 3];
        o.position.set(lerp(from[0], p[0], kk), lerp(from[1], p[1] + (i === 3 ? .9 : 0), kk), lerp(from[2], p[2], kk)); o.visible = kk > 0; });
      stand.visible = t > T0 + 3 * span; stand.scale.y = Math.max(.01, easeOut(seg(t, T0 + 3 * span - .2, T0 + 3 * span + .3)));
      const shock = t > T0 + 2.2 * span;
      f.update(t, { mood: shock ? 'shock' : 'surprised', noseDroop: shock ? .5 * ease(seg(t, T0 + 2.2 * span, T0 + 2.2 * span + .4)) : 0, look: Math.sin(t * .9) * .5 }); };
  },
  '0.7': async k => {
    core.setEnv(k, 'night', { fogNear: 25, fogFar: 100, shadowSize: 40 }); snowGround(k, { flat: 70 });
    const r = core.rng(17); for (let i = 0; i < 110; i++) { const side = i % 2 ? 1 : -1; const pn = pine(3 + r() * 4, { seed: i }); pn.position.set(side * (6 + r() * 16), 0, 6 - r() * 62); k.scene.add(pn); }
    const sf = snowfall(k, { r: 16, center: [0, 0, -20] }); const F = { update: t => sf.update(t) };
    const f = fl(k, [0, 0, 0]); const s = sled(); k.scene.add(s); const m = mug(); k.scene.add(m);
    const cam = core.camMove(k.camera, { from: [2.4, 1.2, -3.6], to: [2.4, 1.2, -45.6], look: [0, .9, 0], lookTo: [0, .9, -42], fov: 46, e: x => x, drift: .08 });
    return (t, u) => { F.update(t); const z = -u * 42; s.position.set(Math.sin(u * 7) * .5, 0, z); s.rotation.y = P + Math.cos(u * 7) * .1;
      cam(u, t);
      f.position.set(s.position.x, .38, z + .05); f.rotation.y = s.rotation.y; f.update(t, { pose: 'slide', mood: 'happy', arm: 'none' });
      // the mug rides in his right twig hand
      f.updateMatrixWorld(); const hand = new THREE.Vector3(); f.parts.armR.fore.getWorldPosition(hand); m.position.copy(hand).add(new THREE.Vector3(0, -.12, 0)); m.update(t);
      ui.slam(k.overlay, 'THE HISTORY OF CHRISTMAS', t, k.meta.seconds - 2.2, { size: 120, y: 200 }); };
  },
};
