// The Ides of March · Act 2 · THE WORD "KING" — realistic look
import * as C from './cae3_common.js';
const { THREE, rome, P, real } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;

function crown(M) {
  const g = new THREE.Group();
  g.add(real.m(new THREE.CylinderGeometry(.13, .12, .07, 40, 1, true), M.gold, { pos: [0, .035, 0] }));
  for (let i = 0; i < 10; i++) { const a = i / 10 * P * 2; const sp = real.m(new THREE.ConeGeometry(.022, .09, 4), M.gold, { pos: [Math.sin(a) * .125, .11, Math.cos(a) * .125] }); g.add(sp);
    g.add(real.m(new THREE.SphereGeometry(.014, 10, 8), real.std(i % 2 ? 0x9a1020 : 0x103a9a, { rough: .15, metal: .1 }), { pos: [Math.sin(a) * .13, .04, Math.cos(a) * .13] })); }
  g.traverse(c => c.isMesh && (c.material.side = THREE.DoubleSide));
  return g;
}
function cushion(M) { return real.rbox(.5, .12, .5, .06, real.std(0x3a0f2e, { rough: .85 }), {}); }
function calendarTex(month, sub, o = {}) {
  return real.canvasTex(1024, 1280, (c, W, H) => {
    c.fillStyle = '#e6d8b8'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 3000; i++) { c.fillStyle = `rgba(120,90,50,${Math.random() * .05})`; c.fillRect(Math.random() * W, Math.random() * H, 2 + Math.random() * 20, 1 + Math.random() * 3); }
    c.strokeStyle = '#6a4a2a'; c.lineWidth = 8; c.strokeRect(30, 30, W - 60, H - 60);
    c.fillStyle = '#3a2412'; c.textAlign = 'center'; c.font = '700 150px "Liberation Serif"'; c.fillText(month, W / 2, 230);
    c.font = 'italic 54px "Liberation Serif"'; c.fillStyle = '#7a4a2a'; c.fillText(sub, W / 2, 310);
    c.font = '600 52px "Liberation Serif"'; c.fillStyle = '#3a2412';
    for (let d = 0; d < 31; d++) { const x = 130 + (d % 7) * 128, y = 450 + Math.floor(d / 7) * 160; c.fillText(String(d + 1), x, y); if (o.circle === d + 1) { c.strokeStyle = '#a01810'; c.lineWidth = 9; c.beginPath(); c.ellipse(x, y - 18, 62, 52, -.1, 0, 7); c.stroke(); } }
  });
}
export { calendarTex };

export const shots = {
  // 2.1 a golden crown on a purple cushion, the hall dark behind; slow push
  '2.1': async k => {
    const cu = await rome.curia(k, { shaftI: .05, sunI: 1.4 });
    const M = cu.M; const ped = real.m(new THREE.CylinderGeometry(.35, .4, 1.1, 32), M.marble, { pos: [0, .55, 2] }); k.scene.add(ped);
    const cs = cushion(M); cs.position.set(0, 1.16, 2); k.scene.add(cs);
    const cr = crown(M); cr.position.set(0, 1.22, 2); k.scene.add(cr);
    rome.key(k.scene, [1.2, 3.6, 3.6], [0, 1.25, 2], { i: 70, angle: .32, soft: .6 });
    rome.key(k.scene, [-2.5, 1.6, .5], [0, 1.25, 2], { i: 60, color: 0x88a0d0, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.5, 4.6], look: [0, 1.2, 2], fov: 34 }, { pos: [0, 1.38, 3.0], look: [0, 1.24, 2], fov: 30 });
    return (t, u) => { cam(u); cr.rotation.y = t * .12; };
  },
  // 2.2 Tarquin on his throne, guards either side; crane down
  '2.2': async k => {
    k.calloutPos = [1380, 330];
    const cu = await rome.curia(k, { statue: false, shaftI: .06, sunI: 1.6 });
    const M = cu.M;
    k.scene.add(real.box(3, .5, 2.4, M.marble, { pos: [0, .25, -9.8] }));
    const th = new THREE.Group(); th.add(real.box(1.1, .5, .8, M.gold, { pos: [0, .25, 0] })); th.add(real.box(1.1, 1.5, .12, M.gold, { pos: [0, 1.0, -.38] })); th.add(real.rbox(1, .1, .7, .04, M.purple, { pos: [0, .53, 0] }));
    for (const x of [-.55, .55]) th.add(real.box(.1, .75, .8, M.gold, { pos: [x, .5, 0] }));
    th.position.set(0, .5, -10); k.scene.add(th);
    const tq = await C.person(k, 'cae_tarquin', { pos: [0, 1.0, -9.8], pose: 'sit', seatH: .55 });
    C.attach(tq, crown(M), 'Head', [0, .14, 0], [0, 0, 0]).scale.setScalar(.85);
    const gd = []; for (const x of [-2.2, 2.2]) { const p = await C.person(k, 'cae_leg' + (x > 0 ? 1 : 2), { pos: [x, .5, -9.6], rot: 0, seed: x > 0 ? 3 : 4 }); rome.legionary(p, { shieldX: x > 0 ? -.36 : .36 }); gd.push(p); }
    rome.key(k.scene, [2, 5, -5], [0, 1.6, -9.8], { i: 220, angle: .4 });
    rome.key(k.scene, [-3, 2.5, -7], [0, 1.7, -9.8], { i: 70, color: 0xffa060, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 4.8, -4.6], look: [0, 1.4, -10], fov: 40 }, { pos: [0, 1.75, -6.4], look: [0, 1.7, -10], fov: 34 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); tq.update(t, { pose: 'sit', seatH: .55, mood: 'angry', look: Math.sin(t * .4) * .15 }); gd.forEach(p => p.update(t, { mood: 'stern' })); };
  },
  // 2.3 509 BC: the crowd drives Tarquin out through the city gate; tracking
  '2.3': async k => {
    await rome.forum(k, { sun: [-30, 12, -10], sunI: 3.4, trees: false });
    const M = await rome.mats();
    const gate = new THREE.Group(); gate.add(real.box(6, 8, 2.5, M.stone, { pos: [-5, 4, 0] })); gate.add(real.box(6, 8, 2.5, M.stone, { pos: [5, 4, 0] })); gate.add(real.box(4, 2.6, 2.5, M.stone, { pos: [0, 6.7, 0] }));
    gate.add(real.box(30, 6, 2, M.stone, { pos: [-23, 3, 0] })); gate.add(real.box(30, 6, 2, M.stone, { pos: [23, 3, 0] })); gate.position.set(0, 0, -14); k.scene.add(gate);
    const tq = await C.person(k, 'cae_tarquin', { pos: [0, 0, -5], rot: P });
    const crowd = []; for (let i = 0; i < 14; i++) { const p = await C.person(k, C.CIT[i % 8], { pos: [-3.2 + (i % 5) * 1.6, 0, -2 + Math.floor(i / 5) * 1.5], rot: P, seed: 400 + i }); crowd.push(p); }
    const cam = C.dolly(k.camera, { pos: [7.5, 3.2, -1], look: [0, 1.2, -6], fov: 42 }, { pos: [6.5, 3.4, -6], look: [0, 1.2, -11], fov: 42 });
    return (t, u) => { cam(u); const d = t * .85;
      tq.position.set(1.2, 0, -5 - d * 1.15); tq.rotation.y = 0; tq.update(t, { pose: 'walk', dist: d * 1.15, mood: 'angry', look: Math.sin(t) * .3 }); tq.rotation.y = P;
      crowd.forEach((p, i) => { const z0 = -2 + Math.floor(i / 5) * 1.5; p.position.z = z0 - d; p.update(t, { pose: 'walk', dist: d + i * .2, arm: (i % 3 === 0) ? 'point' : (i % 3 === 1 ? 'raise' : null), mood: 'angry', talk: true }); }); };
  },
  // 2.4 Caesar in royal purple beside a new statue of himself; orbit
  '2.4': async k => {
    await rome.forum(k, { sun: [-25, 18, 16], trees: false });
    const st = await rome.statueOf(k, 'cae_caesar', { pos: [0, 0, 6], arm: 'raise', rot: .3 });
    const cz = await C.person(k, 'cae_caesar', { pos: [1.6, 0, 7.3], rot: -.6, laurel: true });
    const toga = []; cz.traverse(c => { if (c.isMesh && c.material && c.material.name && /wool|tunic/i.test(c.material.name)) toga.push(c); });
    toga.forEach(c => { c.material = c.material.clone(); c.material.color.set(0x6a1a5a); });
    rome.key(k.scene, [5, 6, 12], [1, 2, 6], { i: 140 });
    const orb = C.orbit(k.camera, [.8, 2.0, 6.6], 6.2, 2.0, .35, -.45, 40);
    return (t, u) => { orb(u); cz.update(t, { mood: 'calm', look: -.2 }); };
  },
  // 2.5 calendar flips QUINTILIS -> IULIUS -> JULY
  '2.5': async k => {
    const d = await rome.domus(k, { room: 'study' });
    const pages = [['QUINTILIS', 'the fifth month'], ['IULIUS', 'renamed for Julius Caesar, 44 BC'], ['JULY', 'still called it today']].map(([m, s]) => calendarTex(m, s));
    const mk = tex => { const m = new THREE.Mesh(new THREE.PlaneGeometry(.64, .8), new THREE.MeshStandardMaterial({ map: tex, roughness: .8, side: THREE.DoubleSide })); m.castShadow = true; return m; };
    const board = real.box(.74, .9, .03, d.M.wood, { pos: [0, 1.8, -4.45] }); k.scene.add(board);
    const pg = pages.map((tx, i) => { const piv = new THREE.Group(); piv.position.set(0, 2.2, -4.42 + (2 - i) * .004); const m = mk(tx); m.position.y = -.4; piv.add(m); k.scene.add(piv); return piv; });
    rome.key(k.scene, [.6, 2.8, -2.4], [0, 1.8, -4.4], { i: 18, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.82, -2.6], look: [0, 1.8, -4.4], fov: 38 }, { pos: [0, 1.8, -3.0], look: [0, 1.8, -4.4], fov: 36 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); pg[0].rotation.x = -P * .95 * ease(seg(t, D * .3, D * .3 + .7)); pg[1].rotation.x = -P * .95 * ease(seg(t, D * .62, D * .62 + .7)); };
  },
  // 2.6 the golden chair gleams in the empty Senate (callback to Act 0); slow push
  '2.6': async k => {
    const cu = await rome.curia(k, { shaftI: .1 });
    rome.key(k.scene, [0, 5, -6], [0, .6, -10.6], { i: 300, angle: .3, soft: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.5, -3], look: [0, .7, -10.6], fov: 36 }, { pos: [0, 1.15, -7.4], look: [0, .65, -10.6], fov: 32 });
    return (t, u) => { cam(u); };
  },
  // 2.7 shadowy togas meeting by candlelight; push through the smoke
  '2.7': async k => {
    const d = await rome.domus(k, { room: 'meeting', night: true, shutters: true });
    const ids = ['cae_cassius', 'cae_brutus', 'cae_casca', 'cae_cimber', 'cae_trebonius'];
    const pos = [[-.6, -1.0, 0], [.6, -1.0, 0], [-1.75, 0, P / 2], [1.75, 0, -P / 2], [0, -1.75, 0]];
    const ppl = []; for (let i = 0; i < ids.length; i++) ppl.push(await C.person(k, ids[i], { pos: [pos[i][0], 0, pos[i][1]], rot: pos[i][2], seed: 500 + i }));
    k.exposure = .5; rome.key(k.scene, [-2, 3, 2.5], [0, 1.5, 0], { i: 3.2, color: 0xffa860, angle: .6 }); rome.key(k.scene, [2.5, 2.2, -2], [0, 1.6, 0], { i: 3, color: 0x6a80c0, angle: .6 });
    const sc = document.createElement('canvas'); sc.width = sc.height = 256; { const c = sc.getContext('2d'); const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(200,190,170,.35)'); g.addColorStop(1, 'rgba(200,190,170,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 256); } const smoke = new THREE.CanvasTexture(sc);
    const puffs = []; for (let i = 0; i < 0; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smoke, transparent: true, depthWrite: false, opacity: .5 })); s.scale.setScalar(1.2); k.scene.add(s); puffs.push(s); }
    const cam = C.dolly(k.camera, { pos: [.2, 1.7, 4.2], look: [0, 1.3, 0], fov: 40 }, { pos: [.1, 1.55, 2.4], look: [0, 1.3, -.2], fov: 36 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t);
      puffs.forEach((s, i) => { const f = (t * .12 + i / 6) % 1; s.position.set(Math.sin(i * 2 + t * .2) * .6, 1.0 + f * 1.6, 1.4 - i * .1); s.material.opacity = .45 * Math.sin(f * P); });
      ppl.forEach((p, i) => p.update(t, { mood: 'stern', talk: Math.floor(t / 2.2) % 5 === i, look: Math.sin(t * .3 + i) * .25, arm: i === 0 && t > 3 ? 'point' : null })); };
  },
};
