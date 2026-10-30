// Operation Thunderbolt · Act 2 · THE HIJACKERS
import { core, props, people, maps, ui, THREE, mapShot, place, interior, cabin, seatPeople, bacos, bose, kuhlmann, hijacker, popIn, cardRow, silhouetteDraw, screen } from './tb_common.js';
const P = Math.PI;
const sil = (label, sub) => ({ text: '', draw: (x, c) => silhouetteDraw(x, c, label, sub) });
function cockpitSimple(k, sky = 0xe8c890) {
  interior(k, { w: 4.4, d: 4, h: 2.6, wall: 0x6a6e70, floor: 0x3a3c40, lampI: 8, bg: 0x101418 });
  k.scene.add(core.box(3.6, 1.0, .05, sky, { pos: [0, 1.75, -1.97], noOutline: true, emissive: sky, ei: .9 }));
  k.scene.add(core.box(3.8, .7, .6, 0x2a2d30, { pos: [0, 1.0, -1.6] }));
  for (let i = 0; i < 14; i++) k.scene.add(core.box(.16, .16, .02, i % 3 ? 0x9ad08a : 0xe8b321, { pos: [-1.5 + i * .23, 1.2, -1.29], noOutline: true, emissive: 0x9ad08a, ei: .4 }));
  [[-.7, 0], [.7, 0]].forEach(([x, z]) => { const c = props.chair({ color: 0x2a2a2a }); c.position.set(x, 0, z); k.scene.add(c); });
}
function tarmac(k, env = 'day') {
  core.setEnv(k, env, { fogNear: 100, fogFar: 600, shadowSize: 60 });
  k.scene.add(props.ground(0xc8b48a, 1600));
  const ap = props.ground(0x9a9488, 200); ap.position.y = .01; k.scene.add(ap);
  const term = props.terminal({ color: 0xe8dcc0, len: 50 }); term.position.set(10, 0, -45); k.scene.add(term);
}

export const shots = {
  '2.1': async k => cardRow(k, [sil('HIJACKER 1', '?'), sil('HIJACKER 2', '?'), sil('HIJACKER 3', '?'), sil('HIJACKER 4', '?')]),
  '2.2': async k => { k.calloutPos = [960, 260]; return cardRow(k, [sil('PALESTINIAN', 'PFLP-EO'), sil('PALESTINIAN', 'PFLP-EO')], { w: 3.4 }); },
  '2.3': async k => { k.calloutPos = [1340, 250]; return cardRow(k, [sil('WILFRIED BÖSE', 'REVOLUTIONARY CELLS'), sil('BRIGITTE KUHLMANN', 'REVOLUTIONARY CELLS')], { w: 3.4 }); },
  // map with prison icons; Israel glows brightest
  '2.4': async k => mapShot(k, {
    center: [24, 30], span: [52, 40], k: 3, labels: [['ISRAEL', 37.2, 29.4], ['FRANCE', 2.5, 46.5], ['W. GERMANY', 9.5, 51], ['KENYA', 38, 0.5]],  // SWITZERLAND drawn smaller in extra()
    highlight: ['ISR'],
    extra: async (k, map) => {
      const spots = [[35, 32.8, 1.1], [2.3, 48.4, .9], [9.5, 52.2, .9], [8.2, 48.2, .8], [37.5, 2.4, .8]];
      { const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 256; const cx = cv.getContext('2d'); cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.font = '120px "Anton"'; cx.fillStyle = 'rgba(43,30,22,.72)'; cx.fillText('SWITZERLAND', 512, 128);
        const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 16; const pl = new THREE.Mesh(new THREE.PlaneGeometry(20, 5), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthWrite: false }));
        pl.rotation.x = -P / 2; pl.position.copy(map.proj(9.8, 45.9, .15)); pl.userData.noOutline = true; k.scene.add(pl); }
      const locks = spots.map(([lo, la, s], i) => { const g = new THREE.Group(); g.add(core.box(1.6, 1.3, .5, 0x5a5a5a, { pos: [0, .7, 0] })); const sh = new THREE.Mesh(new THREE.TorusGeometry(.5, .14, 8, 20, P), core.toon(0x9a9a9a)); sh.position.y = 1.35; g.add(sh); core.outline(g, .05); g.position.copy(map.proj(lo, la, .3)); g.base = s * 1.5; k.scene.add(g); return g; });
      const glow = new THREE.PointLight(0xffd070, 0, 30); glow.position.copy(map.proj(35, 31.6, 4)); k.scene.add(glow);
      return (t) => { locks.forEach((l, i) => popIn(l, t, .4 + i * .45, l.base)); glow.intensity = core.ease(core.seg(t, 3, 4)) * 300; };
    },
    cam: { from: [-30, 95, 60], to: [20, 85, 40], look: [-10, 0, -10], lookTo: [20, 0, 0] },
  }),
  // plane icon on one side of a scale, prison padlocks on the other
  '2.5': async k => {
    interior(k, { w: 10, d: 8, h: 4, wall: 0x3a2e24, floor: 0x4a3a2c, lampI: 30 });
    const beam = new THREE.Group(); beam.position.set(0, 2.4, 0); k.scene.add(beam);
    beam.add(core.box(4, .12, .2, 0x8a6a3a));
    const post = core.cyl(.08, .14, 2.4, 0x8a6a3a, { pos: [0, 1.2, 0] }); k.scene.add(post);
    const pans = [-1.8, 1.8].map(x => { const p = new THREE.Group(); p.position.set(x, 0, 0); p.add(core.cyl(.7, .5, .12, 0xb08a4a, { pos: [0, -.9, 0] })); p.add(core.cyl(.01, .01, .9, 0x444444, { pos: [0, -.45, 0] })); beam.add(p); return p; });
    const plane = maps.planeIcon({ s: .5, color: 0xeeeeea }); plane.position.set(0, -.7, 0); pans[0].add(plane);
    for (let i = 0; i < 5; i++) { const l = new THREE.Group(); l.add(core.box(.25, .2, .1, 0x5a5a5a)); const sh = new THREE.Mesh(new THREE.TorusGeometry(.08, .025, 6, 12, P), core.toon(0x9a9a9a)); sh.position.y = .1; l.add(sh); l.position.set(-.3 + (i % 3) * .3, -.7 + Math.floor(i / 3) * .25, 0); pans[1].add(l); }
    core.outline(beam, .02);
    const cam = core.camMove(k.camera, { from: [0, 2, 6], to: [0, 1.9, 5], look: [0, 1.7, 0], fov: 40 });
    return (t, u) => { cam(u, t); const a = Math.sin(t * .8) * .06 + core.ease(core.seg(t, 1, 5)) * .12; beam.rotation.z = a; pans.forEach(p => p.rotation.z = -a); };
  },
  // plane icon reaching Benghazi; fuel gauge needle near empty
  '2.6': async k => mapShot(k, {
    center: [21, 35], span: [20, 14], k: 6, labels: [['LIBYA', 19, 30.5], ['GREECE', 22.3, 39.6], ['CRETE', 25, 35.6]],
    cities: ['ATHENS', 'BENGHAZI'], route: [[19, 38.6], [20, 36], [20.07, 32.12]], plane: true,
    extra: async (k, map) => { const g = props.gauge('FUEL'); g.scale.setScalar(5); g.rotation.x = -P / 2 + .7; g.position.copy(map.proj(28.5, 32.5, 3)); k.scene.add(g); return t => g.set(.35 - core.ease(core.seg(t, .5, 4)) * .3); },
  }),
  // cockpit radio exchange, tower silhouette through the window
  '2.7': async k => {
    cockpitSimple(k, 0xe8b880);
    const tw = props.tower({ color: 0x3a2e24 }); tw.position.set(4, -14, -40); tw.scale.setScalar(.6); k.scene.add(tw);
    const b = place(k.scene, bacos({ mood: 'stern' }), { pos: [-.7, .02, .05], rot: P - .3, pose: 'sitDesk', arm: 'phone' });
    const bo = place(k.scene, bose(), { pos: [.7, .02, .05], rot: P + .3, pose: 'sit' });
    const cam = core.camMove(k.camera, { from: [-1.6, 1.5, 1.6], to: [-1.3, 1.5, 1.2], look: [-.5, 1.5, -1.8], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // plane on hot tarmac, hijackers chat with officials, trays passed into the cabin
  '2.8': async k => {
    tarmac(k);
    const jet = props.airliner({ engines: 2 }); jet.rotation.y = P / 2; k.scene.add(jet);
    const stair = new THREE.Group(); stair.add(core.box(1.4, 4, 4, 0xd8d8d0, { pos: [0, 2, 0], rot: [.6, 0, 0] })); core.outline(stair, .03); stair.position.set(-6, 0, 4.6); k.scene.add(stair);
    const offs = [0, 1, 2].map(i => place(k.scene, people.person({ outfit: 'khaki', hat: 'peaked', hatColor: 0x5a6a3a, seed: 80 + i }), { pos: [-2 + i * 1.1, 0, 8], rot: -2.6 }));
    const hj = [0, 1].map(i => place(k.scene, hijacker(65 + i, { silhouette: false }), { pos: [-3.6 + i, 0, 9.3], rot: .6 }));
    const truck = props.truck({ back: 0xe8e2d0 }); truck.position.set(-10, 0, 6); truck.rotation.y = -.3; k.scene.add(truck);
    const cam = core.camMove(k.camera, { from: [12, 26, 30], to: [6, 4, 20], look: [-3, 2, 4], lookTo: [-3, 1.5, 6], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // a woman helped down the stairs; chip
  '2.9': async k => {
    tarmac(k);
    const jet = props.airliner({ engines: 2 }); jet.rotation.y = P / 2; jet.position.set(0, 0, -2); k.scene.add(jet);
    const stair = new THREE.Group(); for (let i = 0; i < 10; i++) stair.add(core.box(1.4, .12, .45, 0xd8d8d0, { pos: [0, .4 * i + .2, -i * .4] })); stair.add(core.box(.06, 4.5, 4.4, 0xb8b8b0, { pos: [.72, 2.6, -1.8], rot: [-.78, 0, 0] })); core.outline(stair, .02); stair.position.set(-6, 0, 6.2); k.scene.add(stair);
    const w = place(k.scene, people.person({ outfit: 'dress1', hair: 0x5a3a22, seed: 91, mood: 'worried' }), { pos: [-6, 0, 6.6], rot: 0 });
    const helper = place(k.scene, people.person({ outfit: 'civil4', seed: 92 }), { pos: [-6.6, 0, 7.2], rot: .3, arm: 'hold' });
    const cam = core.camMove(k.camera, { from: [-1, 2.4, 14], to: [-2.5, 2.2, 12], look: [-6, 1.6, 6], fov: 40 });
    return (t, u) => { cam(u, t); };
  },
  // fuel truck pulls away, jet takes off at dusk
  '2.10': async k => {
    tarmac(k, 'dusk');
    const rw = props.runway(500, 40); rw.position.set(0, 0, 0); rw.rotation.y = P / 2; k.scene.add(rw);
    const jet = props.airliner({ engines: 2 }); jet.rotation.y = -P / 2; jet.position.set(40, 0, 0); k.scene.add(jet);
    const tr = props.truck({ tank: true, back: 0xd8d0b8 }); tr.position.set(30, 0, 18); k.scene.add(tr);
    const cam = core.camMove(k.camera, { from: [-20, 1.2, 36], to: [-24, 1.4, 34], look: [20, 3, 0], lookTo: [-30, 12, 0], fov: 40 });
    return (t, u) => { cam(u, t); tr.position.x = 30 + core.easeIn(core.seg(t, 0, 3)) * 20; tr.roll(tr.position.x); const r = core.easeIn(core.seg(t, 1, k.meta.seconds)); jet.position.x = 40 - r * 90; jet.position.y = Math.max(0, (r - .55) * 40); jet.rotation.z = Math.max(0, r - .55) * -.0; jet.rotation.x = 0; jet.rotation.order = 'YXZ'; jet.rotation.x = -Math.max(0, (r - .5)) * .25; };
  },
  // heading needle swings south again
  '2.11': async k => {
    cockpitSimple(k, 0x6a5a8a);
    const g = props.gauge(''); g.position.set(-.2, 1.25, -1.28); g.scale.setScalar(.55); k.scene.add(g);
    [['N', 0, .23], ['W', -.23, 0], ['S', 0, -.23], ['E', .23, 0]].forEach(([s, x, y]) => { const p = core.textPlane(s, .08, { size: 50, color: '#f4ead3' }); p.position.set(-.2 + x * .55, 1.25 + y * .55, -1.21); k.scene.add(p); });
    const cam = core.camMove(k.camera, { from: [-.1, 1.4, -.1], to: [-.15, 1.32, -.45], look: [-.2, 1.25, -1.3], fov: 40 });
    return (t, u) => { cam(u, t); g.needle.rotation.z = P / 4 + core.easeInOut(core.seg(t, .8, 3)) * P * .75; };
  },
  // passengers' faces, worried brows, a hand gripping an armrest
  '2.12': async k => {
    interior(k, { w: 8, d: 16, h: 3, sides: false, lampI: 10, bg: 0x1d1712 });
    k.scene.add(cabin(k, { len: 14 }));
    let seed = 120; const ps = [];
    for (let z = -6; z < 6; z += .95) for (const x0 of [-2.1, .55]) seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); p.setMood('worried'); p.rotation.y = P; k.scene.add(p); ps.push(p); });
    const cam = core.camMove(k.camera, { from: [-2.2, 1.45, -3.6], to: [1.2, 1.45, -3.6], look: [-1.6, 1.3, -1], lookTo: [1.6, 1.3, -1], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // dark cabin, reading lights going off one by one
  '2.13': async k => {
    core.setEnv(k, 'dark', { noFog: true, shadowSize: 12 }); k.scene.background = new THREE.Color(0x07090f);
    k.scene.add(cabin(k, { len: 14, night: true }));
    let seed = 140; for (let z = -6; z < 6; z += .95) for (const x0 of [-2.1, .55]) seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); p.setMood('sad'); k.scene.add(p); });
    const lights = []; for (let i = 0; i < 8; i++) { const l = new THREE.SpotLight(0xffe0a0, 14, 4, .5, .6); l.position.set(i % 2 ? 1.1 : -1.5, 2.4, -5 + i * 1.4); l.target.position.set(l.position.x, 0, l.position.z); k.scene.add(l, l.target); lights.push(l); }
    const cam = core.camMove(k.camera, { from: [-.1, 1.6, 7], to: [-.1, 1.5, 3], look: [0, 1.1, -5], fov: 48 });
    return (t, u) => { cam(u, t); lights.forEach((l, i) => l.intensity = t > 1 + (7 - i) * .45 ? 0 : 14); };
  },
};
