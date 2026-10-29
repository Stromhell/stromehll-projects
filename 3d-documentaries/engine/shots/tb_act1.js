// Operation Thunderbolt · Act 1 · FLIGHT 139
import { core, props, people, maps, ui, THREE, mapShot, place, interior, cabin, seatPeople, bacos, bose, hijacker, popIn, glowBox, screen, bubble } from './tb_common.js';

const P = Math.PI;
function airportDay(k, o = {}) {
  core.setEnv(k, o.env ?? 'day', { fogNear: 120, fogFar: 700, shadowSize: 60 });
  k.scene.add(props.ground(0x9a9478, 1600));
  const apron = props.ground(0x8a877c, 300); apron.position.y = .01; k.scene.add(apron);
  const term = props.terminal({ color: 0xe0d8c4, len: 80 }); term.position.set(0, 0, -40); k.scene.add(term);
  const tw = props.tower(); tw.position.set(50, 0, -50); k.scene.add(tw);
}
// passenger + bag
function traveller(seed, o = {}) { const p = people.person({ outfit: o.outfit ?? ['civil1', 'civil2', 'civil3', 'civil4', 'suit', 'dress1'][seed % 6], seed, hair: [0x2b1e16, 0x5a3a22, 0x9a9a9a, 0x8a6a3a][seed % 4], mood: o.mood ?? 'calm', silhouette: o.silhouette }); return p; }
function cockpit(k, o = {}) {
  const { scene } = k;
  interior(k, { w: 4.4, d: 4, h: 2.6, wall: 0x6a6e70, floor: 0x3a3c40, lampI: 8, sides: true, bg: 0x101418 });
  // windscreen with sky
  const ws = core.box(3.6, 1.0, .05, o.sky ?? 0x8ab4e0, { pos: [0, 1.75, -1.97], noOutline: true, emissive: o.sky ?? 0x8ab4e0, ei: .9 }); scene.add(ws);
  const panel = core.box(3.8, .7, .6, 0x2a2d30, { pos: [0, 1.0, -1.6] }); scene.add(panel);
  for (let i = 0; i < 14; i++) scene.add(core.box(.16, .16, .02, i % 3 ? 0x9ad08a : 0xe8b321, { pos: [-1.5 + i * .23, 1.2, -1.29], noOutline: true, emissive: 0x9ad08a, ei: .4 }));
  const seats = [[-.7, 0], [.7, 0], [.2, 1.2]].map(([x, z]) => { const c = props.chair({ color: 0x2a2a2a }); c.position.set(x, 0, z); scene.add(c); return c; });
  const door = props.door({ color: 0x8a8e90, frame: 0x5a5e60 }); door.position.set(0, 0, 1.95); scene.add(door);
  return { door, ws };
}

export const shots = {
  // Ben Gurion, morning sun, Airbus at the gate
  '1.1': async k => {
    airportDay(k, { env: 'dawn' });
    const jet = props.airliner({ engines: 2 }); jet.position.set(-10, 0, -8); jet.rotation.y = P / 2; k.scene.add(jet);
    const cam = core.camMove(k.camera, { from: [10, 70, 60], to: [18, 6, 34], look: [-10, 2, -8], lookTo: [-10, 3, -10], fov: 40 });
    const crew = [0, 1, 2].map(i => place(k.scene, traveller(i + 3), { pos: [6 + i * 1.2, 0, 6 - i], rot: -1.2, pose: 'walk' }));
    crew.forEach(c => c.userData.driven = true);
    return (t, u) => { cam(u, t); crew.forEach((c, i) => { c.position.x = 6 + i * 1.2 - t * 1.1; c.update(t, { dist: t * 1.2 }); }); };
  },
  // departure board flips to AF 139 PARIS VIA ATHENS
  '1.2': async k => {
    interior(k, { w: 14, d: 8, h: 5, wall: 0xcfc4a8, lampI: 30 });
    const rows = ['TWA 811   NEW YORK', 'EL AL 315   LONDON', 'AF 139   PARIS VIA ATHENS', 'OA 302   ROME'];
    const board = new THREE.Group(); board.position.set(0, 2.6, -3.9); k.scene.add(board);
    board.add(core.box(7.6, 3.2, .2, 0x1d1d1f, { pos: [0, 0, -.1] }));
    const flaps = rows.map((r, i) => { const pl = core.textPlane(r, .48, { size: 80, color: i === 2 ? '#ffd24a' : '#f2efe6', font: 'Oswald', weight: 600 }); pl.position.set(0, 1.05 - i * .7, .02); board.add(pl); return pl; });
    const ppl = [0, 1, 2, 3].map(i => place(k.scene, traveller(10 + i), { pos: [-3 + i * 1.9, 0, -.5 + (i % 2) * .8], rot: P + (i - 1.5) * .15 }));
    const cam = core.camMove(k.camera, { from: [0, 1.8, 7], to: [0, 2.3, 3.4], look: [0, 2.2, -3.9], lookTo: [0, 2.0, -3.9], fov: 40 });
    return (t, u) => { cam(u, t); flaps.forEach((f, i) => { const s = core.clamp((t - .4 - i * .25) / .3); f.scale.y = Math.max(.02, Math.abs(Math.cos(s * P * 2))) * (s >= 1 ? 1 : 1); }); };
  },
  // map Tel Aviv -> Athens
  '1.3': async k => mapShot(k, {
    center: [29, 34.5], span: [22, 16], k: 6, labels: [['GREECE', 22, 39.5], ['TURKEY', 33, 39], ['ISRAEL', 35.5, 30.5], ['EGYPT', 29, 28.5], ['CYPRUS', 33.2, 35.4]],
    highlight: ['ISR'], cities: ['TEL AVIV', 'ATHENS'], route: [[34.78, 32.08], [31, 33.6], [27, 35.6], [23.73, 37.98]], plane: true,
  }),
  // cabin interior, passengers settling in
  '1.4': async k => {
    interior(k, { w: 8, d: 16, h: 3, sides: false, lampI: 18, bg: 0x2a2620 });
    const cb = cabin(k, { len: 14 }); k.scene.add(cb);
    let seed = 1;
    for (let z = -6; z < 6; z += .95) for (const [x0, n] of [[-2.1, 3], [.55, 3]]) {
      const ps = seatPeople(k, null, n, seed++); ps.forEach((p, i) => { if ((seed * 7 + i) % 5 === 0) return; p.position.set(x0 + i * .55, .12, z + .08); k.scene.add(p); });
    }
    const paper = props.newspaper('WEATHER: SUNNY'); paper.scale.setScalar(.25); paper.position.set(.85, 1.05, 1.0); paper.rotation.x = -.6; k.scene.add(paper);
    const cam = core.camMove(k.camera, { from: [-.9, 1.7, 7], to: [-.6, 1.6, 2], look: [0, 1.1, -4], fov: 50 });
    return (t, u) => cam(u, t);
  },
  // plane at Athens gate, counters OFF 38 ON 58
  '1.5': async k => {
    airportDay(k);
    const jet = props.airliner({ engines: 2 }); jet.position.set(0, 0, -6); jet.rotation.y = P / 2; k.scene.add(jet);
    const off = [], on = [];
    for (let i = 0; i < 6; i++) { off.push(place(k.scene, traveller(20 + i), { pos: [4 + i * 1.2, 0, 2], rot: -P / 2, pose: 'walk' })); on.push(place(k.scene, traveller(30 + i), { pos: [-4 - i * 1.2, 0, 4], rot: P / 2, pose: 'walk' })); }
    [...off, ...on].forEach(p => p.userData.driven = true);
    const cam = core.camMove(k.camera, { from: [0, 8, 30], to: [0, 6, 22], look: [0, 2, 0], fov: 42 });
    return (t, u) => {
      cam(u, t);
      off.forEach((p, i) => { p.position.x = 4 + i * 1.2 + t * 1.2; p.update(t, { dist: t * 1.2 }); });
      on.forEach((p, i) => { p.position.x = -14 - i * 1.2 + t * 1.2; p.update(t, { dist: t * 1.2 }); });
      ui.tally(k.overlay, 'OFF', Math.round(38 * core.ease(core.seg(t, 1.5, 4))), 560, 140, t, 1.2);
      ui.tally(k.overlay, 'ON', Math.round(58 * core.ease(core.seg(t, 3, 6))), 1360, 140, t, 2.6);
    };
  },
  // security desk: detector arch with dead red light, empty chair at the X-ray monitor
  '1.6': async k => {
    interior(k, { w: 10, d: 8, h: 3.6, wall: 0xbfb8a4, floor: 0x9a917e, lampI: 16 });
    const arch = new THREE.Group(); arch.add(core.box(.18, 2.3, .4, 0x8a8a80, { pos: [-.55, 1.15, 0] }), core.box(.18, 2.3, .4, 0x8a8a80, { pos: [.55, 1.15, 0] }), core.box(1.3, .25, .4, 0x8a8a80, { pos: [0, 2.35, 0] }));
    const lampOff = core.sph(.07, 0x5a1a1a, { pos: [0, 2.55, .1] }); arch.add(lampOff); core.outline(arch, .02); arch.position.set(-1.6, 0, -1); k.scene.add(arch);
    const belt = core.box(3, .8, .8, 0x5a5a58, { pos: [1.4, .4, -1] }); k.scene.add(belt);
    const xr = core.box(1.2, 1.1, 1.1, 0x9a9a90, { pos: [1.4, 1.2, -1] }); k.scene.add(xr);
    const mon = core.box(.7, .55, .1, 0x2b2b2b, { pos: [2.9, 1.5, .1], rot: [0, -.6, 0] }); k.scene.add(mon);
    k.scene.add(core.box(.6, .45, .02, 0x6aa0a8, { pos: [2.86, 1.5, .16], rot: [0, -.6, 0], noOutline: true, emissive: 0x4a8a90, ei: .7 }));
    const ch = props.chair({ color: 0x3a3a48 }); ch.position.set(3.4, 0, .9); ch.rotation.y = -2.2; k.scene.add(ch);
    k.scene.add(props.table(1.2, .7, { color: 0x6a6a60 })).position.set(3, 0, .3);
    const cam = core.camMove(k.camera, { from: [-1, 1.8, 6], to: [2.2, 1.5, 3.4], look: [1.8, 1.1, 0], lookTo: [3.2, 1, .7], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // four figures carry bags past the empty X-ray desk; bags glow red
  '1.7': async k => {
    interior(k, { w: 14, d: 8, h: 3.6, wall: 0xbfb8a4, floor: 0x9a917e, lampI: 16 });
    k.scene.add(core.box(3, .8, .8, 0x5a5a58, { pos: [0, .4, -2.4] }));
    const ch = props.chair({ color: 0x3a3a48 }); ch.position.set(2, 0, -3.3); k.scene.add(ch);
    const four = [0, 1, 2, 3].map(i => { const h = traveller(40 + i, { outfit: ['suit', 'civil4', 'grey', 'dress2'][i] }); place(k.scene, h, { pos: [-6 - i * 1.4, 0, -.6 + (i % 2) * .7], rot: P / 2, pose: 'walk', arm: null }); h.userData.driven = true;
      const bag = core.box(.5, .35, .2, 0x5a3a2a, { pos: [.32, .5, .1] }); h.add(bag); const gl = glowBox(.56, .4, .26, 0xd02a2a); gl.position.copy(bag.position); h.add(gl); h.glow = gl; return h; });
    const cam = core.camMove(k.camera, { from: [-6, 1.6, 6], to: [3, 1.6, 6], look: [-6, 1, -.3], lookTo: [3, 1, -.3], fov: 42 });
    return (t, u) => { cam(u, t); four.forEach((h, i) => { h.position.x = -6 - i * 1.4 + t * 1.25; h.update(t, { dist: t * 1.25, pose: 'walk' }); h.glow.material.opacity = .25 + .25 * Math.sin(t * 5 + i); }); };
  },
  // cutaway cabin, two highlighted in first class, two in economy
  '1.8': async k => {
    interior(k, { w: 8, d: 30, h: 3, sides: false, lampI: 14, bg: 0x1d1712 });
    const cb = cabin(k, { len: 24, cutaway: true }); k.scene.add(cb);
    const marks = [];
    let seed = 5;
    for (let z = -11; z < 11; z += .95) for (const x0 of [-2.1, .55]) { seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); k.scene.add(p); if ((z > 8.5 && z < 9.6 && x0 < 0 && i === 2) || (z > 7.5 && z < 8.6 && x0 > 0 && i === 0) || (z > -6.5 && z < -5.4 && i === 1)) marks.push(p); }); }
    const rings = marks.slice(0, 4).map(p => { const r = new THREE.Mesh(new THREE.TorusGeometry(.45, .04, 8, 30), new THREE.MeshBasicMaterial({ color: 0xd02a2a })); r.rotation.x = P / 2; r.position.copy(p.position).add(new THREE.Vector3(0, 1.75, 0)); r.userData.noOutline = true; k.scene.add(r); return r; });
    const cam = core.camMove(k.camera, { from: [6, 12, 14], to: [4, 10, -2], look: [0, 0, 6], lookTo: [0, 0, -4], fov: 45 });
    return (t, u) => { cam(u, t); rings.forEach((r, i) => popIn(r, t, 1 + i * .5)); };
  },
  '1.9': async k => mapShot(k, {
    center: [21, 38.5], span: [18, 12], k: 7, labels: [['GREECE', 22.3, 39.6], ['ITALY', 16.5, 40.5], ['ALBANIA', 20, 41]],
    cities: ['ATHENS'], route: [[23.73, 37.98], [22.6, 38.2], [20.5, 38.6], [17.5, 39.6], [14.5, 41.5]], plane: true,
  }),
  // silhouettes stand in the first class aisle, weapons as dark shapes only
  '1.10': async k => {
    interior(k, { w: 8, d: 16, h: 3, sides: false, lampI: 12, bg: 0x1d1712 });
    k.scene.add(cabin(k, { len: 14 }));
    let seed = 30; for (let z = -6; z < 4; z += .95) for (const x0 of [-2.1, .55]) seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); p.setMood('worried'); k.scene.add(p); });
    const h1 = place(k.scene, hijacker(61), { pos: [-.15, 0, -5.4], rot: 0, arm: 'point' }), h2 = place(k.scene, hijacker(62), { pos: [.25, 0, -6.4], rot: 0, arm: 'raise' });
    const cam = core.camMove(k.camera, { from: [0, 1.6, 6], to: [0, 1.5, 1], look: [0, 1.3, -6], fov: 44 });
    return (t, u) => cam(u, t);
  },
  // split frame: panic at the front, calm at the back
  '1.11': async k => {
    interior(k, { w: 8, d: 30, h: 3, sides: false, lampI: 14, bg: 0x1d1712 });
    k.scene.add(cabin(k, { len: 26 }));
    const front = [], back = [];
    let seed = 70; for (let z = -12; z < 12; z += .95) for (const x0 of [-2.1, .55]) seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); k.scene.add(p); (z < -3 ? front : back).push(p); });
    front.forEach(p => { p.setMood('surprised'); p.state.arm = 'raise'; });
    const reader = back[back.length - 5]; const np = props.newspaper('MARKETS CALM'); np.scale.setScalar(.25); np.position.set(0, 1.1, .35); reader.add(np);
    const cam = core.camMove(k.camera, { from: [3.2, 2.2, -10], to: [3.2, 2.2, 9], look: [0, 1, -10], lookTo: [0, 1, 9], fov: 42 });
    return (t, u) => { cam(u, t); front.forEach((p, i) => p.update(t, { pose: 'sit', arm: 'raise', mood: 'surprised' })); };
  },
  // cockpit, three crew figures; callout on the captain
  '1.12': async k => {
    cockpit(k);
    const b = place(k.scene, bacos(), { pos: [-.7, .02, .05], rot: P, pose: 'sitDesk' }); b.userData.seatY = .02;
    const co = place(k.scene, people.person({ outfit: 'pilot', hat: 'pilot', seed: 33 }), { pos: [.7, .02, .05], rot: P, pose: 'sitDesk' });
    const fe = place(k.scene, people.person({ outfit: 'pilot', seed: 34, hair: 0x5a3a22 }), { pos: [.2, .02, 1.25], rot: P - .4, pose: 'sit' });
    k.anchor = [-.7, 2.3, .05];
    const cam = core.camMove(k.camera, { from: [-1.5, 1.45, -1.3], to: [-1.1, 1.45, -1.35], look: [-.65, 1.45, .1], fov: 48 });
    return (t, u) => cam(u, t);
  },
  // engineer stands, unlatches the cockpit door
  '1.13': async k => {
    const { door } = cockpit(k);
    const b = place(k.scene, bacos({ mood: 'worried' }), { pos: [-.7, .02, .05], rot: P, pose: 'sitDesk' });
    const fe = place(k.scene, people.person({ outfit: 'pilot', seed: 34, hair: 0x5a3a22 }), { pos: [.2, 0, 1.3], rot: 0 });
    const cam = core.camMove(k.camera, { from: [-1.1, 1.6, -1.2], to: [-.9, 1.6, -.9], look: [.1, 1.2, 1.6], fov: 46 });
    return (t, u) => { cam(u, t); const s = core.seg(t, .4, 1.6); fe.update(t, { pose: s < 1 ? 'stand' : 'stand', arm: t > 2 ? 'point' : null }); door.setOpen(core.easeInOut(core.seg(t, 2.6, 3.6)) * .12); };
  },
  // door opens on a silhouette with a raised dark shape; cut before contact
  '1.14': async k => {
    const { door } = cockpit(k);
    const fe = place(k.scene, people.person({ outfit: 'pilot', seed: 34, hair: 0x5a3a22, mood: 'surprised' }), { pos: [.15, 0, 1.25], rot: 0 });
    const out = new THREE.Group(); out.position.set(0, 0, 3); k.scene.add(out);
    const back = new THREE.PointLight(0xfff2d8, 30, 8); back.position.set(0, 2, 4.5); k.scene.add(back);
    const h = place(k.scene, hijacker(61), { pos: [.1, 0, 2.8], rot: P, arm: 'point' });
    const cam = core.camMove(k.camera, { from: [-.6, 1.5, -.8], to: [-.4, 1.55, -.2], look: [.1, 1.4, 2.6], fov: 44, e: core.easeOut });
    k.meta.black = false;
    return (t, u) => { cam(u, t); door.setOpen(core.easeOut(core.seg(t, .3, 1.1))); };
  },
  // Böse in the co-pilot seat; callout
  '1.15': async k => {
    cockpit(k, { sky: 0xa8c8e8 });
    const b = place(k.scene, bacos({ mood: 'worried' }), { pos: [-.7, .02, .05], rot: P, pose: 'sitDesk' });
    const bo = place(k.scene, bose(), { pos: [.7, .02, .05], rot: P + .3, pose: 'sit' });
    k.anchor = [.7, 2.35, .05];
    const cam = core.camMove(k.camera, { from: [1.6, 1.45, -1.2], to: [1.0, 1.45, -1.35], look: [.65, 1.45, .1], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // Böse points at the compass; heading needle swings west -> south
  '1.16': async k => {
    cockpit(k, { sky: 0xa8c8e8 });
    const bo = place(k.scene, bose(), { pos: [.7, .02, .05], rot: P + .3, pose: 'sit', arm: 'point' });
    const g = props.gauge(''); g.position.set(-.2, 1.25, -1.28); g.scale.setScalar(.55); k.scene.add(g);
    const labels = [['N', 0, .23], ['W', -.23, 0], ['S', 0, -.23], ['E', .23, 0]].map(([s, x, y]) => { const p = core.textPlane(s, .08, { size: 50, color: '#f4ead3' }); p.position.set(-.2 + x * .55, 1.25 + y * .55, -1.21); k.scene.add(p); });
    const cam = core.camMove(k.camera, { from: [-.1, 1.4, -.1], to: [-.15, 1.32, -.45], look: [-.2, 1.25, -1.3], fov: 40 });
    return (t, u) => { cam(u, t); const k2 = core.easeInOut(core.seg(t, 1, 3.6)); g.needle.rotation.z = P / 2 + k2 * P / 2; };
  },
  // two hijackers at the back of economy; 3:00 stopwatch runs down
  '1.17': async k => {
    interior(k, { w: 8, d: 30, h: 3, sides: false, lampI: 14, bg: 0x1d1712 });
    k.scene.add(cabin(k, { len: 26, cutaway: true }));
    let seed = 90; for (let z = -12; z < 9; z += .95) for (const x0 of [-2.1, .55]) seatPeople(k, null, 3, seed++).forEach((p, i) => { p.position.set(x0 + i * .55, .12, z + .08); p.setMood('worried'); k.scene.add(p); });
    place(k.scene, hijacker(63), { pos: [-.1, 0, 10.5], rot: P, arm: 'point' }); place(k.scene, hijacker(64), { pos: [.3, 0, 11.5], rot: P });
    const cam = core.camMove(k.camera, { from: [5, 11, -14], to: [4, 9, 2], look: [0, 0, -4], lookTo: [0, 0, 8], fov: 45 });
    return (t, u) => { cam(u, t); const left = Math.max(0, 180 - core.seg(t, .5, k.meta.seconds - .3) * 180); const m = Math.floor(left / 60), s = Math.floor(left % 60); ui.tally(k.overlay, '', `${m}:${String(s).padStart(2, '0')}`, 1700, 140, t, .3); };
  },
  // Böse with the cabin microphone; waveform icon over the cabin
  '1.18': async k => {
    cockpit(k, { sky: 0xa8c8e8 });
    const bo = place(k.scene, bose(), { pos: [.7, .02, .05], rot: P + .6, pose: 'sit', arm: 'mic' });
    const mic = core.sph(.07, 0x1a1a1a); bo.parts.armR.end.add(mic);
    const cam = core.camMove(k.camera, { from: [1.9, 1.45, -1.3], to: [1.3, 1.45, -1.35], look: [.7, 1.45, .1], fov: 44 });
    return (t, u) => { cam(u, t); const x = k.overlay; x.save(); x.translate(1420, 330); x.strokeStyle = '#fbf6ea'; x.lineWidth = 10; x.lineCap = 'round'; for (let i = 0; i < 9; i++) { const h = (20 + 60 * Math.abs(Math.sin(t * 7 + i * 1.3))) * core.clamp((t - .6) * 3); x.beginPath(); x.moveTo(i * 26 - 104, -h); x.lineTo(i * 26 - 104, h); x.stroke(); } x.restore(); };
  },
  // newspapers spin in and stack
  '1.19': async k => {
    interior(k, { w: 12, d: 8, h: 4, wall: 0x3a2e24, floor: 0x5a4636, lampI: 30 });
    const heads = [['AIR FRANCE JET HIJACKED', '246 PASSENGERS AND 12 CREW'], ['HIJACKERS TAKE JET SOUTH', 'FLIGHT FROM TEL AVIV'], ['246 HOSTAGES', 'WHERE IS FLIGHT 139?']];
    const ps = heads.map(([h, s], i) => { const n = props.newspaper(h, s); n.position.set((i - 1) * .5, 1.6, -1 + i * .05); k.scene.add(n); return n; });
    const cam = core.camMove(k.camera, { from: [0, 1.7, 4.4], to: [0, 1.65, 3.4], look: [0, 1.6, -1], fov: 40 });
    return (t, u) => { cam(u, t); ps.forEach((n, i) => { const s = core.easeOut(core.seg(t, .3 + i * .9, 1.0 + i * .9)); n.rotation.z = (1 - s) * 6 + (i - 1) * .12; n.scale.setScalar(Math.max(.001, s)); n.visible = s > 0; }); };
  },
};
