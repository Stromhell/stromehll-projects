// The Ides of March (Caesar) · shared cast, Roman props and sets
import { core, props, people, maps, ui, THREE, mapShot, place, interior, cardRow, popIn, bubble } from './tb_common.js';
export { core, props, people, maps, ui, THREE, mapShot, place, interior, cardRow, popIn, bubble };
const P = Math.PI;
const { box, cyl, sph, mesh, toon } = core;

Object.assign(maps.CITIES, { 'ROME': [12.5, 41.9], 'PHARSALUS': [22.38, 39.3], 'MUNDA': [-4.6, 37.3], 'PHILIPPI': [24.28, 41.01], 'ALEXANDRIA': [29.92, 31.2], 'RAVENNA': [12.2, 44.42], 'RIMINI': [12.57, 44.06], 'ALESIA': [4.5, 47.54] });

// ---------- cast (generic house-style figures) ----------
export const PURPLE = 0x6a2a6a;
export const caesar = (o = {}) => people.person({ outfit: 'toga', border: PURPLE, hat: 'laurel', mood: 'calm', seed: 101, ...o });
export const senator = (seed, o = {}) => people.person({ outfit: 'toga', border: 0x8a2a2a, seed, mood: 'stern', hair: [0x9a9a9a, 0x5a3a22, 0x2b1e16, 0xd8d8d8][seed % 4], beard: false, ...o });
export const brutus = (o = {}) => senator(111, { hair: 0x2b1e16, mood: 'worried', ...o });
export const cassius = (o = {}) => senator(112, { hair: 0x5a3a22, mood: 'stern', ...o });
export const decimus = (o = {}) => senator(113, { hair: 0x8a6a3a, mood: 'smug', ...o });
export const trebonius = (o = {}) => senator(114, { hair: 0x9a9a9a, mood: 'smug', ...o });
export const cimber = (o = {}) => senator(115, { hair: 0x2b1e16, beard: true, ...o });
export const casca = (o = {}) => senator(116, { silhouette: true, ...o });
export const antony = (o = {}) => people.person({ outfit: 'tunic', top: 0x8a3a2a, bot: 0x8a3a2a, seed: 120, hair: 0x2b1e16, mood: 'calm', scale: 1.08, ...o });
export const octavian = (o = {}) => people.person({ outfit: 'toga', border: PURPLE, seed: 121, hair: 0xb08a50, mood: 'calm', ...o });
export const lepidus = (o = {}) => senator(122, { hair: 0x9a9a9a, mood: 'calm', ...o });
export const calpurnia = (o = {}) => people.person({ outfit: 'stola', seed: 130, hair: 0x2b1e16, mood: 'worried', ...o });
export const spurinna = (o = {}) => people.person({ outfit: 'tunic', top: 0x6a5a8a, bot: 0x6a5a8a, seed: 131, hair: 0xd8d8d8, beard: true, mood: 'worried', ...o });
export const gladiator = (seed, o = {}) => people.person({ outfit: 'tunic', top: 0x7a5a3a, bot: 0x7a5a3a, seed, hair: 0x2b1e16, mood: 'stern', ...o });
export const legionary = (seed, o = {}) => people.person({ outfit: 'legion', hat: 'galea', seed, mood: 'stern', ...o });
export const citizen = (seed, o = {}) => people.person({ outfit: ['tunic', 'toga', 'stola'][seed % 3], top: [0xb8a27a, 0xf1ece0, 0x8a5a7a, 0x7a9a6a, 0xc9774a][seed % 5], bot: [0xb8a27a, 0xf1ece0, 0x8a5a7a, 0x7a9a6a, 0xc9774a][seed % 5], seed, hair: [0x2b1e16, 0x5a3a22, 0x9a9a9a, 0x8a6a3a][seed % 4], mood: 'calm', ...o });
export const tarquin = (o = {}) => people.person({ outfit: 'tunic', top: 0x4a2a5a, bot: 0x4a2a5a, hat: 'crown', seed: 140, beard: true, hair: 0x2b1e16, mood: 'stern', scale: 1.08, ...o });

// ---------- props ----------
export function column(h = 6, r = .4, col = 0xece4d2) {
  const g = new THREE.Group();
  g.add(cyl(r, r * 1.08, h, col, { pos: [0, h / 2, 0], seg: 20 }));
  for (let i = 0; i < 10; i++) { const a = i / 10 * P * 2; g.add(box(.05, h * .94, .05, new THREE.Color(col).offsetHSL(0, 0, -.08).getHex(), { pos: [Math.cos(a) * r * 1.01, h / 2, Math.sin(a) * r * 1.01], noOutline: true })); }
  g.add(box(r * 2.6, .3, r * 2.6, col, { pos: [0, h + .15, 0] })); g.add(box(r * 2.6, .25, r * 2.6, col, { pos: [0, .12, 0] }));
  return g;
}
export function steps(n = 8, w = 10, run = .5, rise = .25, col = 0xe2d8c2) { const g = new THREE.Group(); for (let i = 0; i < n; i++) g.add(box(w, rise, run * (n - i), col, { pos: [0, rise * (i + .5), -run * i / 2] })); return g; }
export function goldChair() {
  const g = new THREE.Group(); const G = 0xd9a42b;
  g.add(box(1.1, .12, .9, G, { pos: [0, .9, 0] })); g.add(box(1.1, 1.3, .12, G, { pos: [0, 1.6, -.4] }));
  for (const x of [-.48, .48]) { g.add(box(.12, .9, .12, G, { pos: [x, .45, .38] })); g.add(box(.12, .9, .12, G, { pos: [x, .45, -.38] })); g.add(box(.12, .1, .85, G, { pos: [x, 1.25, 0] })); }
  g.add(box(1.6, .4, 1.4, 0xd8ccb4, { pos: [0, .2 - .4, 0] }));   // dais below
  g.seatY = .96; return g;
}
export function statue(fig, o = {}) {   // marble version of any figure, on a plinth
  const g = new THREE.Group(); const M = o.color ?? 0xdedad0;
  fig.traverse(m => { if (m.isMesh && m.material && !m.userData.noOutline && m.material.color) m.material = toon(M); });
  fig.position.y = o.plinth ?? 1.2; fig.scale.setScalar(o.scale ?? 1.6); g.add(fig);
  g.add(box(1.4, o.plinth ?? 1.2, 1.4, 0xcfc6b2, { pos: [0, (o.plinth ?? 1.2) / 2, 0] }));
  g.fig = fig; return g;
}
export function bench(len = 8, col = 0xbfb39a) { return box(len, .45, .7, col, { pos: [0, .225, 0] }); }
export function scroll(text = '', o = {}) {
  const g = new THREE.Group(); const w = o.w ?? 1.2;
  const sheet = props.card(text, { h: w * .7, cw: 800, ch: 560, size: o.size ?? 80, bg: '#efe2c0', color: o.color ?? '#2b1e16', font: o.font, draw: o.draw, sub: o.sub });
  g.add(sheet); for (const y of [w * .36, -w * .36]) g.add(cyl(.05, .05, w * 1.05, 0x8a5a2a, { pos: [0, y, .02], rot: [0, 0, P / 2] }));
  g.sheet = sheet; return g;
}
export function tablet(text, o = {}) { return props.card(text, { h: o.h ?? .7, cw: 700, ch: 500, size: o.size ?? 80, bg: '#c8a04a', color: '#2b1e16', draw: (x, c) => { x.fillStyle = '#5a3a1a'; x.fillRect(0, 0, 700, 24); x.fillRect(0, 476, 700, 24); x.fillRect(0, 0, 24, 500); x.fillRect(676, 0, 24, 500); } }); }
export function horse(col = 0x6a4a2e) {
  const g = new THREE.Group();
  g.add(box(.8, .75, 2, col, { pos: [0, 1.45, 0] }));
  const neck = box(.4, 1, .45, col, { pos: [0, 2.05, .95], rot: [-.55, 0, 0] }); g.add(neck);
  g.add(box(.36, .38, .8, col, { pos: [0, 2.45, 1.35], rot: [.35, 0, 0] }));
  g.add(box(.08, .7, .5, 0x2a1e14, { pos: [0, 2.2, .7], rot: [-.55, 0, 0] }));   // mane
  const legs = [[-.28, .8], [.28, .8], [-.28, -.8], [.28, -.8]].map(([x, z]) => { const p = new THREE.Group(); p.position.set(x, 1.15, z); p.add(cyl(.09, .07, 1.15, col, { pos: [0, -.575, 0] })); g.add(p); return p; });
  g.add(cyl(.05, .02, .9, 0x2a1e14, { pos: [0, 1.5, -1.3], rot: [.6, 0, 0] }));   // tail
  g.add(box(.85, .1, .8, 0xa8322a, { pos: [0, 1.86, -.1] }));   // saddle cloth
  core.outline(g, .02);
  g.walk = d => legs.forEach((l, i) => l.rotation.x = Math.sin(d * 2.4 + (i % 2 ? P : 0) + (i > 1 ? P / 2 : 0)) * .45);
  g.seat = new THREE.Vector3(0, 1.95, -.1); return g;
}
export function ride(h, fig) { fig.state.pose = 'sit'; fig.userData.seatY = 1.95; fig.position.copy(h.seat); h.add(fig); return fig; }
export function altar(smoke = true) { const g = new THREE.Group(); g.add(box(1.2, 1, .8, 0xcfc6b2, { pos: [0, .5, 0] })); g.add(box(1.4, .15, 1, 0xbfb6a2, { pos: [0, 1.07, 0] })); if (smoke) { const s = props.smoke({ color: 0xbab4aa, n: 8, h: 4, size: .9 }); s.position.y = 1.15; g.add(s); g.smoke = s; } return g; }
export function hourglass() { const g = new THREE.Group(); g.add(box(.7, .08, .7, 0x6a4a2a, { pos: [0, .04, 0] })); g.add(box(.7, .08, .7, 0x6a4a2a, { pos: [0, 1.36, 0] })); const gl = toon(0xd8e8f0, { mat: { transparent: true, opacity: .45 } }); g.add(mesh(new THREE.ConeGeometry(.28, .62, 20), gl, { pos: [0, .39, 0], rot: [P, 0, 0] })); g.add(mesh(new THREE.ConeGeometry(.28, .62, 20), gl, { pos: [0, 1.01, 0] })); const top = mesh(new THREE.ConeGeometry(.22, .4, 20), 0xd9b066, { pos: [0, 1.0, 0] }), bot = mesh(new THREE.ConeGeometry(.22, .4, 20), 0xd9b066, { pos: [0, .3, 0] }); g.add(top, bot); g.sand = k => { top.scale.setScalar(Math.max(.01, 1 - k)); bot.scale.setScalar(Math.max(.01, k)); }; return g; }
export function goblet() { const g = new THREE.Group(); g.add(cyl(.1, .06, .16, 0xd9a42b, { pos: [0, .3, 0] })); g.add(cyl(.015, .015, .2, 0xd9a42b, { pos: [0, .12, 0] })); g.add(cyl(.07, .07, .02, 0xd9a42b, { pos: [0, .01, 0] })); return g; }
export function chest(open = 1) { const g = new THREE.Group(); g.add(box(1.2, .6, .7, 0x6a4a2a, { pos: [0, .3, 0] })); const lid = new THREE.Group(); lid.position.set(0, .6, -.35); lid.add(box(1.2, .12, .7, 0x5a3a1e, { pos: [0, .06, .35] })); lid.rotation.x = -open * 1.6; g.add(lid); const coins = new THREE.Group(); for (let i = 0; i < 40; i++) coins.add(cyl(.06, .06, .02, 0xe8b321, { pos: [(i % 8 - 3.5) * .13, .6 + Math.floor(i / 8) * .015, ((i * 7) % 5 - 2) * .11], rot: [.3 * Math.sin(i), 0, .3 * Math.cos(i)], noOutline: true })); g.add(coins); g.lid = lid; return g; }
export function crownCushion() { const g = new THREE.Group(); g.add(box(.8, .2, .8, 0x7a2a3a, { pos: [0, 1.1, 0] })); g.add(box(.5, 1, .5, 0xcfc6b2, { pos: [0, .5, 0] })); const c = cyl(.22, .22, .12, 0xd9b13b, { pos: [0, 1.28, 0], seg: 20 }); g.add(c); for (let i = 0; i < 8; i++) { const a = i / 8 * P * 2; g.add(box(.05, .12, .03, 0xd9b13b, { pos: [Math.cos(a) * .21, 1.38, Math.sin(a) * .21], rot: [0, -a, 0] })); } return g; }
export function scales() { const g = new THREE.Group(); g.add(cyl(.05, .05, 2, 0x8a6a3a, { pos: [0, 1, 0] })); const beam = new THREE.Group(); beam.position.y = 2; beam.add(box(2.4, .06, .06, 0x8a6a3a)); g.add(beam); const pans = [-1.15, 1.15].map(x => { const p = new THREE.Group(); p.add(cyl(.4, .3, .06, 0xb8902a, { pos: [0, -.9, 0] })); p.add(cyl(.01, .01, .9, 0x555555, { pos: [0, -.45, 0] })); p.position.x = x; beam.add(p); return p; }); g.tilt = a => { beam.rotation.z = a; pans.forEach(p => p.rotation.z = -a); }; g.pans = pans; return g; }
export function mask(col = 0xf1ece0) { const g = new THREE.Group(); const f = sph(.36, col, { scale: [1, 1.15, .45] }); g.add(f); for (const x of [-.12, .12]) g.add(mesh(new THREE.CircleGeometry(.06, 16), core.basic(0x111111), { pos: [x, .06, .17] })); g.add(box(.18, .03, .02, 0x6a2a2a, { pos: [0, -.14, .16], noOutline: true })); return g; }
export function calendarCard(month, opts = {}) { return props.card('', { h: opts.h ?? 1.8, cw: 900, ch: 900, bg: '#efe2c0', draw: (x) => { x.fillStyle = '#2b1e16'; x.textAlign = 'center'; x.font = '110px Anton'; x.fillText(month, 450, 150); x.font = '54px Oswald'; for (let d = 1; d <= 31; d++) { const c = (d - 1) % 7, r = Math.floor((d - 1) / 7); const cx = 120 + c * 110, cy = 300 + r * 115; x.fillStyle = '#2b1e16'; x.fillText(String(d), cx, cy); if (opts.circle === d) { x.strokeStyle = '#b8321f'; x.lineWidth = 10; x.beginPath(); x.arc(cx, cy - 18, 46, 0, P * 2); x.stroke(); } } } }); }
export function laurelEmblem(size = 1) { const g = new THREE.Group(); for (const s of [-1, 1]) for (let i = 0; i < 9; i++) { const a = -P / 2 + s * (.3 + i * .27); const l = sph(.12 * size, 0x6a9a44, { scale: [1, .45, 2] }); l.position.set(Math.cos(a) * size, Math.sin(a) * size + size, 0); l.rotation.z = a + P / 2; g.add(l); } return g; }

// ---------- sets ----------
// Curia of Pompey: marble hall, tiered benches on both sides, Caesar's golden chair at the far end under Pompey's statue
export function curia(k, o = {}) {
  const { scene } = k;
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 24, sunPos: [6, 18, 10], fill: .5 });
  scene.background = new THREE.Color(0x1d1712);
  const W = 16, D = 26, H = 9;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), toon(0xd8cdb6)); floor.rotation.x = -P / 2; floor.userData.noOutline = true; scene.add(floor);
  for (let i = 0; i < 6; i++) { const t = box(W * .9, .01, .06, 0xbfb39a, { pos: [0, .005, -D / 2 + 3 + i * 4], noOutline: true }); scene.add(t); }
  for (const s of [-1, 1]) {
    scene.add(box(.4, H, D, 0xcfc2a6, { pos: [s * W / 2, H / 2, 0], noOutline: true }));
    for (let r = 0; r < 3; r++) { const b = box(1.1, .45 + r * .45, D - 6, 0xbfb39a, { pos: [s * (W / 2 - 1 - r * 1.1) , (.45 + r * .45) / 2, 1] }); scene.add(b); }
    for (let z = -D / 2 + 2; z < D / 2; z += 4) { const c = column(H - .6, .35); c.position.set(s * (W / 2 - 4.2), 0, z); scene.add(c); }
  }
  scene.add(box(W, H, .4, 0xc8bba0, { pos: [0, H / 2, -D / 2] }));
  const chair = goldChair(); chair.position.set(0, .4, -D / 2 + 3.2); scene.add(chair);
  const pompey = statue(senator(150, { mood: 'stern', hair: 0x2b1e16 })); pompey.position.set(-3.2, 0, -D / 2 + 1.4); scene.add(pompey);
  const l1 = new THREE.PointLight(0xfff0d8, 12, 30); l1.position.set(0, H - 1, -4); scene.add(l1);
  const l2 = new THREE.PointLight(0xffe0b0, 7, 20); l2.position.set(0, 4, -D / 2 + 4); scene.add(l2);
  // senators on the benches
  const sen = [];
  if (o.senators !== false) for (let i = 0; i < (o.n ?? 28); i++) { const s = i % 2 ? 1 : -1, r = Math.floor(i / 2) % 3, z = -D / 2 + 6 + Math.floor(i / 6) * 3.2 + (r % 2) * .8; const p = senator(300 + i, { mood: o.mood ?? 'stern' }); p.state.pose = 'sit'; p.userData.seatY = .45 + r * .45; p.position.set(s * (W / 2 - 1 - r * 1.1), .45 + r * .45, z); p.rotation.y = -s * P / 2; scene.add(p); sen.push(p); }
  return { chair, pompey, sen, W, D, H, chairPos: new THREE.Vector3(0, .4, -D / 2 + 3.2) };
}
// Roman street / forum: paved ground, columns, temple front, warm light
export function forum(k, o = {}) {
  const { scene } = k;
  core.setEnv(k, o.env ?? 'day', { fogNear: 60, fogFar: 300, shadowSize: 50 });
  scene.add(props.ground(0xcfc2a0, 600));
  for (let x = -40; x <= 40; x += 2.5) scene.add(box(2.4, .02, 60, x % 5 ? 0xc2b494 : 0xd0c4a4, { pos: [x, .01, -10], noOutline: true }));
  const temple = new THREE.Group();
  temple.add(steps(6, 18, .6, .3)); for (let i = 0; i < 6; i++) { const c = column(7, .45); c.position.set(-7.5 + i * 3, 1.8, -2); temple.add(c); }
  temple.add(box(19, 1.2, 4, 0xe2d8c2, { pos: [0, 9.4, -2] }));
  const ped = new THREE.Mesh(new THREE.ConeGeometry(10.5, 2.4, 3), toon(0xe2d8c2)); ped.rotation.set(0, P / 2, 0); ped.scale.set(.25, 1, 1); ped.position.set(0, 11.2, -2); temple.add(ped);
  temple.add(box(18, 10, .4, 0xb8a888, { pos: [0, 5, -6] }));
  temple.position.set(o.templeX ?? 0, 0, o.templeZ ?? -30); scene.add(temple);
  for (const s of [-1, 1]) for (let z = -20; z < 20; z += 4) { const c = column(5, .3); c.position.set(s * 12, 0, z); scene.add(c); }
  return { temple };
}
// a dark room lit by candles, for the plotters
export function candleRoom(k, o = {}) {
  const r = interior(k, { w: 10, d: 8, h: 3.6, wall: 0x5a4a38, floor: 0x3a2e24, lampI: o.lampI ?? 6, bg: 0x0c0a08 });
  const tb = props.table(2.6, 1.4, { color: 0x4a3020 }); k.scene.add(tb);
  const cs = [-.8, 0, .8].map(x => { const c = props.candle(); c.position.set(x, .8, (x ? .2 : -.2)); k.scene.add(c); return c; });
  return { tb, cs };
}
export const rome = { column, steps, goldChair, statue, bench, scroll, tablet, horse, ride, altar, hourglass, goblet, chest, crownCushion, scales, mask, calendarCard, laurelEmblem };
