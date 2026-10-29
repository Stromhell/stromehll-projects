// Operation Thunderbolt · Act 6 · THREE BAD PLANS
import { core, props, people, maps, ui, THREE, mapShot, place, interior, amin, shomron, commando, popIn, warRoom, cardRow, cabin, airstrip } from './tb_common.js';
const P = Math.PI;
const lakeMap = (k, extra, o = {}) => mapShot(k, { center: [32.6, -0.4], span: [5, 3.6], k: 30, labels: [['LAKE VICTORIA', 32.8, -1.2], ['UGANDA', 32.4, 0.8], ['KENYA', 34.4, 0.2]], highlight: ['UGA'], cities: ['ENTEBBE', 'KAMPALA'], extra, ...o });
function easelSet(k) {
  interior(k, { w: 12, d: 9, h: 4, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 24 });
  const boards = [-2, 0, 2].map((x, i) => { const e = props.easel(); e.position.set(x, 0, -2.6); k.scene.add(e);
    const cover = core.box(1.32, .92, .02, 0x6a5a48, { pos: [0, 1.5, .1] }); e.add(cover); e.cover = cover;
    const lab = core.textPlane(['PLAN 1 · BOATS', 'PLAN 2 · PARACHUTES', 'PLAN 3 · AIRLINER'][i], .16, { size: 60, color: '#2b1e16' }); lab.position.set(0, 1.5, .09); e.add(lab); e.lab = lab; return e; });
  return boards;
}
export const shots = {
  // Kirya headquarters at dawn, cars arriving
  '6.1': async k => {
    core.setEnv(k, 'dawn', { fogNear: 80, fogFar: 500 }); k.scene.add(props.ground(0x8a8270, 800));
    const gb = props.govBuilding({ color: 0xd8c8a8 }); gb.position.set(0, 0, -16); k.scene.add(gb);
    const cars = [0, 1, 2].map(i => { const c = props.mercedes({ color: [0x3a3a3a, 0x6a6a5a, 0x2a2a3a][i] }); c.rotation.y = -P / 2; k.scene.add(c); return c; });
    const cam = core.camMove(k.camera, { from: [14, 2.5, 18], to: [10, 2.8, 14], look: [0, 3, -10], fov: 42 });
    return (t, u) => { cam(u, t); cars.forEach((c, i) => { const d = core.easeOut(core.seg(t, i * .9, 3 + i * .9)) * 16; c.position.set(-3 + i * 3, 0, 14 - d); c.roll(d); }); };
  },
  // Shomron at an easel with three covered boards; callout
  '6.2': async k => {
    const boards = easelSet(k);
    const s = place(k.scene, shomron(), { pos: [3.4, 0, -1.6], rot: -.8, arm: 'point' }); k.anchor = [3.4, 2.6, -1.6];
    const cam = core.camMove(k.camera, { from: [0, 1.8, 6], to: [.5, 1.75, 4.8], look: [1, 1.5, -2.4], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // boats cross Lake Victoria toward Entebbe
  '6.3': async k => lakeMap(k, async (k, map) => {
    const boats = [0, 1, 2].map(i => { const b = maps.boatIcon({ s: 3 }); k.scene.add(b); return b; });
    const a = map.proj(33.4, -1.0, .5), b = map.proj(32.5, 0.02, .5);
    return t => boats.forEach((bt, i) => { const s = core.easeInOut(core.seg(t, .5 + i * .3, 5 + i * .3)); bt.position.lerpVectors(a, b, s).add(new THREE.Vector3(i * 4 - 4, 0, i * 3)); bt.rotation.y = -2.4; bt.position.y = .5 + Math.sin(t * 3 + i) * .2; });
  }),
  // crocodile eyes rise next to the boats (no gag stamp)
  '6.4': async k => lakeMap(k, async (k, map) => {
    const boats = [0, 1, 2].map(i => { const b = maps.boatIcon({ s: 3 }); b.position.copy(map.proj(32.9, -0.5, .5)).add(new THREE.Vector3(i * 4 - 4, 0, i * 3)); b.rotation.y = -2.4; k.scene.add(b); return b; });
    const crocs = []; for (let i = 0; i < 6; i++) { const g = new THREE.Group(); g.add(core.sph(.6, 0x4a6a3a, { scale: [1.6, .6, 1] })); for (const sx of [-1, 1]) { g.add(core.sph(.28, 0xd9c84a, { pos: [sx * .4, .35, .2] })); g.add(core.sph(.13, 0x1a1a1a, { pos: [sx * .4, .42, .4] })); } core.outline(g, .04); g.position.copy(map.proj(32.9, -0.5, 0)).add(new THREE.Vector3(Math.sin(i * 2.1) * 9, 0, Math.cos(i * 2.1) * 7)); g.base = g.position.y; k.scene.add(g); crocs.push(g); }
    return t => crocs.forEach((c, i) => { const s = core.easeOut(core.seg(t, 1 + i * .3, 2 + i * .3)); c.position.y = -1 + s * 1.3; c.visible = s > 0; c.rotation.y = Math.atan2(boats[1].position.x - c.position.x, boats[1].position.z - c.position.z); });
  }, { cam: { from: [8, 40, 40], to: [6, 30, 30], look: [4, 0, 6] } }),
  // parachute icons drift down over the map
  '6.5': async k => lakeMap(k, async (k, map) => {
    const chutes = []; for (let i = 0; i < 9; i++) { const g = new THREE.Group(); const can = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 8, 0, P * 2, 0, P / 2), core.toon(0xe8e2d0)); g.add(can); for (const [x, z] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const l = core.cyl(.02, .02, 2, 0x444444); l.position.set(x * .6, -1, z * .6); l.rotation.set(z * .3, 0, -x * .3); g.add(l); } const m = commando(900 + i); m.scale.setScalar(.6); m.position.y = -3; g.add(m); core.outline(g, .03); g.position.copy(map.proj(32.44 + (i % 3 - 1) * .12, 0.05 + (Math.floor(i / 3) - 1) * .1, 30)); g.base = g.position.y; k.scene.add(g); chutes.push(g); }
    return t => chutes.forEach((c, i) => { c.position.y = c.base - core.easeOut(core.seg(t, i * .2, 6 + i * .2)) * 24; c.rotation.z = Math.sin(t + i) * .1; });
  }, { cam: { from: [0, 30, 60], to: [0, 26, 48], look: [0, 6, 0] } }),
  // cutaway civilian jet full of commandos
  '6.6': async k => {
    interior(k, { w: 8, d: 30, h: 3, sides: false, lampI: 14, bg: 0x1d1712 });
    k.scene.add(cabin(k, { len: 20, cutaway: true }));
    for (let z = -9; z < 9; z += .95) for (const x0 of [-2.1, .55]) for (let i = 0; i < 3; i++) { const c = commando(950 + Math.round(z * 10) + i, { mood: 'stern' }); c.state.pose = 'sit'; c.userData.seatY = .1; c.scale.setScalar(.82); c.position.set(x0 + i * .55, .1, z + .08); k.scene.add(c); }
    const cam = core.camMove(k.camera, { from: [6, 10, 12], to: [5, 8, 2], look: [0, 0, 3], lookTo: [0, 0, -4], fov: 45 });
    return (t, u) => cam(u, t);
  },
  // three boards; each shows NO WAY OUT (no gag X)
  '6.7': async k => {
    const boards = easelSet(k);
    boards.forEach(b => b.remove(b.cover));
    const notes = boards.map((b, i) => { const n = core.textPlane('NO WAY OUT', .18, { size: 64, color: '#c0392b' }); n.position.set(0, 1.25, .12); b.add(n); return n; });
    const cam = core.camMove(k.camera, { from: [0, 1.7, 4.6], to: [0, 1.6, 3.6], look: [0, 1.45, -2.6], fov: 42 });
    return (t, u) => { cam(u, t); notes.forEach((n, i) => popIn(n, t, 1 + i * 1.2)); };
  },
  // Shomron alone at the table, maps spread out
  '6.8': async k => {
    interior(k, { w: 12, d: 9, h: 4, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 14, window: 0x1a2236 });
    const tb = props.table(3, 1.6, { color: 0x5a3a26 }); k.scene.add(tb);
    for (let i = 0; i < 5; i++) k.scene.add(core.box(.8, .01, .6, 0xe8dcbc, { pos: [-1 + i * .5, .83 + i * .002, (i % 2 ? .3 : -.3)], rot: [0, i * .3, 0], noOutline: true }));
    const lamp = new THREE.PointLight(0xffd8a0, 14, 5); lamp.position.set(0, 2, 0); k.scene.add(lamp);
    const c = props.chair(); c.position.set(0, 0, -1.1); k.scene.add(c);
    place(k.scene, shomron({ mood: 'worried' }), { pos: [0, .02, -1.05], rot: 0, pose: 'sitDesk' });
    const cam = core.camMove(k.camera, { from: [3.2, 3, 3.6], to: [2.4, 2.6, 2.8], look: [0, 1, -.5], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // telegram slides across a table
  '6.9': async k => {
    interior(k, { w: 8, d: 6, h: 3.2, wall: 0x6a5a48, floor: 0x4a3a2c, lampI: 20 });
    const tb = props.table(2.6, 1.4, { color: 0x5a3a26 }); k.scene.add(tb);
    const tg = props.card('TELEGRAM\nWE ACCEPT.\nNEED MORE TIME.', { h: .55, cw: 800, ch: 560, size: 70, bg: '#f2e8c8', font: 'Oswald' }); tg.rotation.x = -P / 2; k.scene.add(tg);
    const cam = core.camMove(k.camera, { from: [0, 2.2, 1.4], to: [0, 1.9, 1.0], look: [0, .82, 0], fov: 40 });
    return (t, u) => { cam(u, t); const s = core.easeOut(core.seg(t, .3, 1.8)); tg.position.set(-1.6 + s * 1.6, .84, -.1); tg.rotation.z = (1 - s) * .5; };
  },
  // Amin boarding a plane, briefcase in hand
  '6.10': async k => {
    const set = airstrip(k, { env: 'day', terminal: true });
    const jet = props.airliner({ engines: 4, len: 20, stripe: 0x2a6a3a }); jet.position.set(0, 0, -4); jet.rotation.y = P / 2; k.scene.add(jet);
    const stair = new THREE.Group(); for (let i = 0; i < 10; i++) stair.add(core.box(1.4, .12, .45, 0xd8d8d0, { pos: [0, .4 * i + .2, -i * .4] })); core.outline(stair, .02); stair.position.set(-5, 0, 4.4); k.scene.add(stair);
    const a = amin({ mood: 'smug' }); k.scene.add(a); const bc = core.box(.45, .32, .12, 0x3a2a1a, { pos: [.35, .45, 0] }); a.add(bc);
    const cam = core.camMove(k.camera, { from: [3, 2, 14], to: [1, 2.6, 12], look: [-5, 2.4, 3], fov: 40 });
    return (t, u) => { cam(u, t); const s = core.seg(t, .3, k.meta.seconds - .5); const st = Math.min(9, s * 10); a.position.set(-5, Math.max(0, (st - .5) * .4), 5 - st * .4); a.rotation.y = P; a.update(t, { pose: 'walk', dist: t * 1.2, arm: 'hold' }); };
  },
  // deadline card flips 1 JULY -> 4 JULY; Amin at a microphone
  '6.11': async k => {
    interior(k, { w: 10, d: 7, h: 4, wall: 0x6a7a4a, floor: 0x5a4a3a, lampI: 22 });
    const mic = new THREE.Group(); mic.add(core.cyl(.02, .02, 1.5, 0x333333, { pos: [0, .75, 0] }), core.sph(.08, 0x222222, { pos: [0, 1.55, 0] })); core.outline(mic, .01); mic.position.set(-1, 0, .5); k.scene.add(mic);
    place(k.scene, amin({ mood: 'smug' }), { pos: [-1, 0, -.1], rot: 0 });
    const piv = new THREE.Group(); piv.position.set(1.6, 2, 0); k.scene.add(piv);
    const c1 = props.card('DEADLINE\n1 JULY', { h: 1.4, cw: 600, ch: 500, size: 90 }); piv.add(c1);
    const c2 = props.card('DEADLINE\n4 JULY', { h: 1.4, cw: 600, ch: 500, size: 90, color: '#a02a1e' }); c2.rotation.y = P; c2.position.z = -.03; piv.add(c2);
    const cam = core.camMove(k.camera, { from: [0, 1.9, 5.2], to: [.2, 1.9, 4.4], look: [.2, 1.8, 0], fov: 42 });
    return (t, u) => { cam(u, t); piv.rotation.y = core.easeInOut(core.seg(t, 1.5, 2.3)) * P; };
  },
  // blueprint unrolls on the table, SOLEL BONEH in the corner
  '6.12': async k => {
    interior(k, { w: 8, d: 6, h: 3.2, wall: 0x9a9480, floor: 0x4a3a2c, lampI: 22 });
    const tb = props.table(3.4, 2, { color: 0x5a3a26 }); k.scene.add(tb);
    const bp = props.blueprint(); bp.rotation.x = -P / 2; bp.position.set(0, .83, 0); k.scene.add(bp);
    const roll = core.cyl(.08, .08, 2.1, 0x1f4f8a, { rot: [0, 0, 0] }); roll.rotation.x = P / 2; roll.rotation.z = P / 2; k.scene.add(roll);
    const cam = core.camMove(k.camera, { from: [0, 3, 2.4], to: [0, 2.6, 1.8], look: [0, .82, 0], fov: 42 });
    return (t, u) => { cam(u, t); const s = core.easeOut(core.seg(t, .2, 2)); bp.scale.x = Math.max(.01, s); bp.position.x = -1.5 + s * 1.5; roll.position.set(-1.5 + s * 3, .9, 0); roll.rotation.y = 0; roll.visible = s < .99; };
  },
  // blueprint lines extrude into a 3D terminal model
  '6.13': async k => {
    interior(k, { w: 8, d: 6, h: 3.2, wall: 0x9a9480, floor: 0x4a3a2c, lampI: 22 });
    const tb = props.table(3.4, 2, { color: 0x5a3a26 }); k.scene.add(tb);
    const bp = props.blueprint(); bp.rotation.x = -P / 2; bp.position.set(0, .83, 0); k.scene.add(bp);
    const model = props.terminal({ len: 30 }); model.scale.setScalar(.06); model.position.set(0, .84, 0); k.scene.add(model);
    const cam = core.camMove(k.camera, { from: [1.6, 2.2, 2], to: [.9, 1.6, 1.4], look: [0, .9, 0], fov: 40 });
    return (t, u) => { cam(u, t); model.scale.y = .06 * Math.max(.01, core.easeOut(core.seg(t, .6, 2.8))); };
  },
  // night training: soldiers run through a wood and canvas mock-up
  '6.14': async k => {
    core.setEnv(k, 'night', { fogNear: 40, fogFar: 300 }); k.scene.add(props.ground(0x5a5a40, 600));
    const mock = new THREE.Group(); for (let x = -12; x <= 12; x += 3) mock.add(core.box(.2, 4, .2, 0x8a6a4a, { pos: [x, 2, 0] })); mock.add(core.box(25, .2, .2, 0x8a6a4a, { pos: [0, 4, 0] }));
    for (let x = -10.5; x <= 10.5; x += 6) mock.add(core.box(4.6, 3.6, .05, 0xd8ccb0, { pos: [x, 2, -.05] })); core.outline(mock, .02); k.scene.add(mock);
    const fl = new THREE.SpotLight(0xfff2d8, 120, 50, .7, .4); fl.position.set(0, 12, 12); fl.target.position.set(0, 0, 0); k.scene.add(fl, fl.target);
    const run = []; for (let i = 0; i < 8; i++) { const c = commando(1000 + i); k.scene.add(c); run.push(c); }
    const cam = core.camMove(k.camera, { from: [10, 2, 10], to: [6, 2, 8], look: [0, 1.2, 2], fov: 42 });
    return (t, u) => { cam(u, t); run.forEach((c, i) => { const d = t * 4 - i * 1.4; c.position.set(14 - d, 0, 2.5 + (i % 2) * .8); c.rotation.y = -P / 2; c.update(t, { pose: 'run', dist: t * 4 }); }); };
  },
  // animated plan on the map
  '6.15': async k => {
    const set = airstrip(k, { env: 'day', terminal: true, tower: true });
    // tabletop view of the whole plan as small pieces
    const planes = [0, 1, 2, 3].map(i => { const p = props.c130({ color: 0x6c6a52 }); p.scale.setScalar(.6); k.scene.add(p); return p; });
    const teams = []; for (let i = 0; i < 12; i++) { const c = commando(1100 + i); c.scale.setScalar(1.6); k.scene.add(c); teams.push(c); }
    const cam = core.camMove(k.camera, { from: [60, 120, 140], to: [30, 100, 110], look: [-40, 0, -50], fov: 40 });
    return (t, u) => { cam(u, t); const D = k.meta.seconds;
      planes.forEach((p, i) => { const land = core.easeOut(core.seg(t, i * .8, 3 + i * .8)); const leave = core.easeIn(core.seg(t, D - 3.5 + i * .3, D - .3)); p.position.set(10 + i * 8, Math.max(0, (1 - land) * 20) + leave * 30, 160 - land * 200 - leave * 160); p.rotation.y = P; p.spin(t); });
      teams.forEach((c, i) => { const s = core.easeInOut(core.seg(t, 3 + (i % 4) * .3, 6.5)); const tgt = [[-90, -80], [-60, -105], [-40, -60], [-20, -20]][i % 4]; c.position.set(14 + (tgt[0] - 14) * s + (i % 3), 0, -30 + (tgt[1] + 30) * s); c.rotation.y = Math.atan2(tgt[0] - 14, tgt[1] + 30); c.update(t, { pose: s > 0 && s < 1 ? 'run' : 'stand', dist: t * 4 }); }); };
  },
  // lightning bolt emblem flashes across the map
  '6.16': async k => mapShot(k, {
    center: [33.5, 16], span: [34, 38], labels: [['ISRAEL', 35, 31], ['UGANDA', 32.3, 1.6], ['KENYA', 38, 0.5]], highlight: ['ISR', 'UGA'], cities: ['TEL AVIV', 'ENTEBBE'],
    route: [[34.8, 31.9], [34.6, 29.6], [36.6, 24.5], [38.4, 19.5], [41.5, 13.5], [40.5, 8], [36.4, 2], [33.5, .2], [32.44, 0.05]], routeStart: .05, routeEnd: .5,
    extra: async k => t => { const x = k.overlay; const fl = t > 2.2 && t < 2.6 ? 1 - (t - 2.2) / .4 : 0; if (fl) { x.fillStyle = `rgba(240,240,255,${fl * .6})`; x.fillRect(0, 0, 1920, 1080); }
      if (t > 2.2) { const p = new Path2D(); p.moveTo(10, -80); p.lineTo(-38, 8); p.lineTo(-4, 8); p.lineTo(-20, 80); p.lineTo(40, -14); p.lineTo(6, -14); p.lineTo(24, -80); p.closePath(); x.save(); x.translate(960, 540); x.scale(3 * core.pop(t, 2.2, .3), 3 * core.pop(t, 2.2, .3)); x.fillStyle = '#e8b321'; x.strokeStyle = '#2b1e16'; x.lineWidth = 6; x.fill(p); x.stroke(p); x.restore(); } },
  }),
  // clock on the wall; through the window, planes climbing
  '6.17': async k => {
    interior(k, { w: 10, d: 7, h: 3.6, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 18 });
    const win = core.box(3, 1.6, .05, 0xf0b070, { pos: [1.4, 2, -3.47], noOutline: true, emissive: 0xf0a060, ei: .9 }); k.scene.add(win);
    const cl = props.clock(); cl.position.set(-2.2, 2.4, -3.42); k.scene.add(cl);
    const icons = [0, 1, 2, 3].map(i => { const p = maps.planeIcon({ s: .12, color: 0x2a2018 }); p.position.set(.4 + i * .5, 1.6, -3.4); p.rotation.set(0, 0, 0); k.scene.add(p); return p; });
    const cam = core.camMove(k.camera, { from: [-.5, 1.9, 3], to: [-.3, 1.9, 2.2], look: [0, 2.1, -3.4], fov: 42 });
    return (t, u) => { cam(u, t); cl.set(15, 30 + t * 4); icons.forEach((p, i) => { p.position.y = 1.4 + t * .08 + i * .05; p.position.x = .2 + i * .55 + t * .05; p.rotation.set(-P / 2, 0, -.3); }); };
  },
};
