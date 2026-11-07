// The History of Christmas · Act 6 · EVERYONE'S WINTER
import { core, THREE, ui, props, people, flurry, glowSprite, walkPath, village, snowfall, snowGround, pine, xmasTree, cottage, sign, starGeo, RED, GREEN, GOLD, SNOW } from './xm_common.js';
import { man, hat, animal, menorah, kinara, lantern, crescent, logProp, bell, gift, interiorRoom, fireworks, seatRoot, signBoard } from './xm_sets.js';
const P = Math.PI, { ease, seg, clamp, easeOut, lerp } = core;
const fl = (k, pos, rot = 0) => { const f = flurry(); f.userData.driven = true; f.position.set(...pos); f.rotation.y = rot; k.scene.add(f); return f; };
const folk = (s, o = {}) => people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2'][s % 6], seed: 600 + s, hair: [0x2b1e16, 0x8a6a3a, 0xb08a50, 0x5a3a22, 0x1a1a1a][s % 5], skin: [undefined, 0xe8c8a8, 0xc89a70, 0x8a5a3a, undefined][s % 5], mood: 'calm', smile: true, ...o });
// a crowd ringed around a point, facing it
function crowd(k, n, c, r0, r1, seed = 1) { const r = core.rng(seed); const ps = []; for (let i = 0; i < n; i++) { const a = i / n * P * 2 + r() * .3, d = r0 + r() * (r1 - r0); const p = folk(i + seed * 10, i % 4 === 3 ? { scale: .65 } : {}); p.userData.auto = false; p.position.set(c[0] + Math.cos(a) * d, 0, c[2] + Math.sin(a) * d); p.rotation.y = Math.atan2(c[0] - p.position.x, c[2] - p.position.z); k.scene.add(p); ps.push(p); } return ps; }
export const shots = {
  '6.1': async k => {
    const v = village(k, { env: 'night' });
    const tr = xmasTree(7, { n: 90 }); tr.position.set(0, 0, -6); k.scene.add(tr);
    const ps = crowd(k, 22, [0, 0, -6], 4, 8, 1);
    const walkers = [0, 1, 2, 3].map(i => { const p = folk(40 + i); k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [0, 12, 16], to: [1.5, 2.2, 9], look: [0, 2, -6], lookTo: [0, 2.8, -6], fov: 46 });
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); ps.forEach((p, i) => p.update(t + i, { arm: i % 5 === 0 ? 'point' : 'none', look: Math.sin(t * .7 + i) * .3 }));
      walkers.forEach((p, i) => walkPath(p, [-12 + i * 2, 0, 3 - i * 1.5], [12 - i * 2, 0, 2 - i * 1.5], 0, k.meta.seconds * 1.3, t + i)); };
  },
  '6.2': async k => {
    const R = interiorRoom(k, { w: 8, d: 6, h: 4, wall: 0x3a4a6a, floor: 0x4a3a2a, winX: 0, winColor: 0x1a2a50, lampI: 1.2, sunI: .25, bg: 0x0a0e18 });
    const sill = core.box(2.4, .12, .5, 0xf2efe6, { pos: [0, 1.1, -2.75] }); k.scene.add(sill);
    const m = menorah(); m.scale.setScalar(1.15); m.position.set(0, 1.16, -2.7); k.scene.add(m);
    const frost = []; const r = core.rng(3); for (let i = 0; i < 40; i++) { const s = glowSprite(0xdfe8ff, .25 + r() * .3, .35); s.position.set((r() - .5) * 1.6, 1.3 + r() * 1.9, -2.96); k.scene.add(s); frost.push(s); }
    const sf = snowfall(k, { r: 4, center: [0, 0, -5] });
    const cam = core.camMove(k.camera, { from: [0, 1.75, 2.0], to: [0, 1.65, .6], look: [0, 1.6, -2.7], fov: 40 });
    const T0 = k.meta.voA ?? .35;
    return (t, u) => { cam(u, t); R.update(t); sf.update(t); m.row.light(clamp((t - T0) / (k.meta.seconds * .8)), t); };
  },
  '6.3': async k => {
    core.setEnv(k, 'night', { fogNear: 30, fogFar: 100, shadowSize: 16 });
    k.scene.add(core.mesh(new THREE.PlaneGeometry(60, 40), 0xb8a888, { rot: [-P / 2, 0, 0], noOutline: true, cast: false }));
    const cr = crescent(2.2); cr.position.set(6, 12, -30); cr.rotation.z = -.5; k.scene.add(cr); const cg = glowSprite(0xfff2c0, 9, .4); cg.position.copy(cr.position); k.scene.add(cg);
    const wall = core.box(18, 3.2, .5, 0xa88a68, { pos: [0, 1.6, -5] }); k.scene.add(wall); for (const x of [-6, 0, 6]) k.scene.add(core.mesh(new THREE.TorusGeometry(1, .15, 6, 16, P), 0xc8a878, { pos: [x, 2.2, -4.7] }));
    const tb = props.table(3.6, 1.3, { color: 0x6a4a2e }); k.scene.add(tb); k.scene.add(core.box(3.5, .02, 1.25, 0x2a6a5a, { pos: [0, .83, 0], noOutline: true }));
    for (let i = 0; i < 5; i++) { const d = core.group(core.cyl(.22, .16, .06, 0xe8d8b8, { pos: [0, .03, 0] }), core.sph(.12, [0xc8802a, 0x8a3a1a, 0xe8c040][i % 3], { pos: [0, .1, 0], scale: [1, .6, 1] })); core.outline(d, .008); d.position.set(-1.4 + i * .7, .84, 0); k.scene.add(d); }
    const ps = []; [[-1, -.95, 0], [0, -.95, 0], [1, -.95, 0], [-1, .95, P], [0, .95, P], [1, .95, P]].forEach(([x, z, ry], i) => { const p = folk(70 + i, i === 2 || i === 5 ? { scale: .66 } : {}); p.userData.auto = false; p.position.set(x, seatRoot(.45), z); p.rotation.y = ry; k.scene.add(p); ps.push(p); k.scene.add(core.box(.45, .45, .45, 0x6a4a2e, { pos: [x, .225, z * 1.15] })); });
    const ups = []; for (let i = 0; i < 7; i++) { const L = lantern([0xe8b040, 0xd84a3a, 0x3aa86a, 0x3a7ad8][i % 4]); L.position.set(-3 + i, 2.9 - Math.sin(i / 6 * P) * .4, -1); k.scene.add(L); ups.push(t => L.rotation.z = Math.sin(t * 1.4 + i) * .1); }
    k.scene.add(core.cyl(.008, .008, 6.2, 0x3a2a1a, { pos: [0, 3.3, -1], rot: [0, 0, P / 2] }));
    const pl = new THREE.PointLight(0xffc070, 3, 9); pl.position.set(0, 2.6, 0); k.scene.add(pl);
    const cam = core.camMove(k.camera, { from: [-5.2, 2.0, 2.6], to: [-3.6, 1.8, 1.4], look: [0, 1.2, 0], lookTo: [.2, 1.3, -.2], fov: 46 });
    return (t, u) => { cam(u, t); ups.forEach(f => f(t)); ps.forEach((p, i) => p.update(t + i, { pose: 'sit', nod: true, arm: Math.floor(t + i) % 4 === 0 ? 'point' : 'none' })); };
  },
  '6.4': async k => {
    const R = interiorRoom(k, { w: 8, d: 6, h: 4, wall: 0x8a5a3a, floor: 0x5a3a24, window: false, lampI: 1.5, sunI: .3, bg: 0x140c08 });
    const tb = props.table(2.4, 1.2, { color: 0x4a2e1e }); k.scene.add(tb);
    const mat = core.box(1.6, .02, .6, 0xc8a030, { pos: [0, .84, 0], noOutline: true }); k.scene.add(mat); for (let i = 0; i < 8; i++) k.scene.add(core.box(.16, .021, .6, [RED, 0x1a1a1a, GREEN][i % 3], { pos: [-.7 + i * .2, .845, 0], noOutline: true }));
    const kn = kinara(); kn.scale.setScalar(1.2); kn.position.set(0, .86, 0); k.scene.add(kn);
    for (const [x, c] of [[-.95, 0xd8a040], [.95, 0x8a5a2a]]) { const cup = core.cyl(.09, .06, .25, c, { pos: [x, .97, .1] }); core.outline(cup, .01); k.scene.add(cup); }
    const cam = core.camMove(k.camera, { from: [0, 1.9, 3.8], to: [0, 1.55, 2.5], look: [0, 1.12, 0], fov: 40 });
    const T0 = k.meta.voA ?? .35;
    return (t, u) => { cam(u, t); R.update(t); kn.row.light(clamp((t - T0) / (k.meta.seconds * .75)), t); };
  },
  '6.5': async k => {
    const v = village(k, { env: 'night' });
    const tr = xmasTree(9, { n: 130, glow: 12 }); tr.position.set(0, 0, -6); k.scene.add(tr);
    const ps = crowd(k, 26, [0, 0, -6], 4.2, 8.5, 3);
    const f = fl(k, [.8, 0, -1.2], P + .1);
    const cam = core.camMove(k.camera, { from: [2.2, 1.4, 4], to: [1.2, 9.5, 6], look: [.4, 1.4, -2], lookTo: [0, 8.5, -6], fov: 46 });
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); ps.forEach((p, i) => p.update(t + i, { arm: Math.floor(t * 1.2 + i) % 3 === 0 ? 'raise' : 'none' })); f.update(t, { arm: 'waveBoth', mood: 'happy', pose: 'hop', dist: t * .8 % 2 }); f.position.z = -1.2; };
  },
  '6.6': async k => {
    const v = village(k, { env: 'night', snowR: 12 });
    const f = fl(k, [0, 0, 0]);
    const tr = xmasTree(1.4, { n: 20 }); const lg = logProp(1.2, .18); const st = new THREE.Group(); { const m = core.mesh(starGeo(.35), GOLD, { mat: { emissive: new THREE.Color(GOLD), emissiveIntensity: .4 } }); st.add(m); st.add(glowSprite(0xffe08a, 1.6, .5)); }
    const hatG = core.group(core.mesh(new THREE.ConeGeometry(.3, .6, 18), RED, { pos: [0, .3, 0] }), core.mesh(new THREE.TorusGeometry(.3, .07, 8, 22), 0xffffff, { rot: [P / 2, 0, 0] }), core.sph(.09, 0xffffff, { pos: [0, .62, 0] })); core.outline(hatG, .012);
    const items = [tr, lg, st, hatG]; items.forEach(o => k.scene.add(o));
    const S = k.meta.seconds, T0 = (k.meta.voA ?? .35) + 2.6, span = (S - T0 - 1) / 4;
    const cam = core.camMove(k.camera, { from: [0, 1.6, 6], to: [0, 1.7, 5], look: [0, 1.1, 0], fov: 44 });
    return (t, u) => { cam(u, t); v.update(t);
      items.forEach((o, i) => { const on = easeOut(seg(t, T0 + i * span, T0 + i * span + .5)); const a = t * 1.1 + i * P / 2; o.visible = on > 0; o.scale.setScalar(Math.max(.01, on)); o.position.set(Math.cos(a) * 1.7 * on, (i === 0 ? 0 : 1.1) + Math.sin(t * 2 + i) * .1, Math.sin(a) * 1.7 * on); if (i === 1 || i === 3) o.rotation.y = t; });
      f.update(t, { mood: 'happy', look: Math.sin(t * 1.1) * .6, arm: t > T0 + 3.5 * span ? 'up' : 'none' }); };
  },
  '6.7': async k => {
    const v = village(k, { env: 'night', snowR: 12 });
    const f = fl(k, [-1.2, 0, 0], .4);
    const b = core.group(core.sph(.26, GOLD, { pos: [0, .62, 0], seg: 20 }), core.cyl(.26, .5, .62, GOLD, { pos: [0, .32, 0], seg: 24 }), core.mesh(new THREE.TorusGeometry(.5, .06, 8, 28), GOLD, { rot: [P / 2, 0, 0] }), core.sph(.1, 0x8a5a1a, { pos: [0, -.08, 0] }), core.mesh(new THREE.TorusGeometry(.08, .025, 6, 14), GOLD, { pos: [0, .92, 0] })); core.outline(b, .012); b.scale.setScalar(1.5); k.scene.add(b);
    const btn = signBoard('SUBSCRIBE', { h: .55, size: 110, bg: '#c8282e', color: '#ffffff' }); k.scene.add(btn);
    const glow = glowSprite(0xffe08a, 4, .5); k.scene.add(glow); const bl = new THREE.PointLight(0xffe0a0, 14, 6); k.scene.add(bl); b.traverse(m => { if (m.isMesh && m.material.emissive) { m.material = m.material.clone(); m.material.emissiveIntensity = .55; m.material.side = THREE.DoubleSide; } });
    const cam = core.camMove(k.camera, { from: [0, 2.0, 6.6], to: [.2, 2.1, 5.4], look: [.4, 1.6, 0], fov: 44 });
    const S = k.meta.seconds;
    return (t, u) => { cam(u, t); v.update(t); const sw = easeOut(seg(t, .3, 1.3)); const ring = t > S * .6 ? Math.sin((t - S * .6) * 14) * .25 * Math.exp(-(t - S * .6) * 1.5) : 0;
      b.position.set(lerp(5, 1.4, sw), 2.3, 0); b.rotation.z = (1 - sw) * .6 + Math.sin(t * 2) * .06 + ring; glow.position.set(b.position.x, 1.9, -.2); bl.position.set(b.position.x - .4, 2.2, 1.6); glow.material.opacity = .3 + (ring !== 0 ? .4 : 0);
      btn.position.set(b.position.x, .9, .1); btn.scale.setScalar(Math.max(.01, easeOut(seg(t, 1, 1.5))) * (1 + Math.abs(ring) * .4));
      f.update(t, { arm: t > 1.2 ? 'point' : 'none', mood: 'happy', look: .3, pose: t > S * .6 && t < S * .6 + .7 ? 'jump' : 'idle', jp: seg(t, S * .6, S * .6 + .7) }); };
  },
  '6.8': async k => {
    const v = village(k, { env: 'night' });
    const tr = xmasTree(7, { n: 100, glow: 10 }); tr.position.set(0, 0, -10); k.scene.add(tr);
    const fw = fireworks(k, { at: [[-8, 13, -24, .6], [6, 15, -26, 1.4], [0, 18, -32, 2.2], [-11, 16, -30, 3.0], [10, 13, -24, 3.6], [-3, 14, -22, 4.3]] });
    const f = fl(k, [0, 0, 0]);
    const deer = [0, 1].map(i => { const d = animal('reindeer'); d.position.set(i ? 2.1 : -2.1, 0, -.6); d.rotation.y = i ? -.5 : .5; k.scene.add(d); return d; });
    const ps = crowd(k, 14, [0, 0, -10], 5, 7, 5);
    const S = k.meta.seconds;
    const cam = core.camMove(k.camera, { from: [0, 1.5, 4.6], to: [0, 4.2, 12], look: [0, 1.2, 0], lookTo: [0, 6, -14], fov: 48 });
    return (t, u) => { cam(u, t); v.update(t); tr.update(t); fw.update(t); deer.forEach((d, i) => d.idle(t + i)); ps.forEach((p, i) => p.update(t + i, { arm: Math.floor(t * 1.5 + i) % 2 ? 'raise' : 'wave' }));
      f.update(t, { arm: 'waveBoth', mood: 'happy', hat: 'santa', pose: 'jump', jp: (t * .9) % 1 });
      ui.slam(k.overlay, 'HAPPY CHRISTMAS!', t, Math.max(.5, S - 3.4), { size: 150, y: 300 }); };
  },
};
