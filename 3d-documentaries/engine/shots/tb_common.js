// Shared sets, cast and shot builders for Operation Thunderbolt.
import * as THREE from 'three';
import * as core from '../lib/core.js';
import * as props from '../lib/props.js';
import * as people from '../lib/people.js';
import * as maps from '../lib/maps.js';
import * as ui from '../lib/ui.js';

// ---------- cast (generic house-style figures, no real faces) ----------
export const yoni = () => people.person({ outfit: 'olive', hat: 'cap', hatColor: 0x575c37, mood: 'calm', seed: 11, hair: 0x2b1e16 });
export const commando = (seed, o = {}) => people.person({ outfit: 'olive', hat: o.hat ?? 'helmet', hatColor: 0x4f5432, mood: o.mood ?? 'stern', seed, ...o });
export const hijacker = (seed, o = {}) => people.person({ outfit: 'dark', silhouette: o.silhouette ?? true, seed, mood: 'stern', ...o });
export const bose = (o = {}) => people.person({ outfit: 'dark', hair: 0x8a6a3a, mood: 'stern', seed: 21, glasses: false, ...o });
export const kuhlmann = (o = {}) => people.person({ outfit: 'dress2', hair: 0x8a6a3a, mood: 'stern', seed: 22, top: 0x3a3a48, bot: 0x3a3a48, ...o });
export const bacos = (o = {}) => people.person({ outfit: 'pilot', hat: 'pilot', mood: 'calm', seed: 31, moustache: true, hair: 0x9a9a9a, ...o });
export const amin = (o = {}) => people.person({ outfit: 'amin', hat: 'peaked', hatColor: 0x5e683c, mood: 'smug', seed: 41, skin: 0xf7f3ea, scale: 1.12, ...o });
export const rabin = (o = {}) => people.person({ outfit: 'suit', mood: 'stern', seed: 51, hair: 0xb8b0a0, ...o });
export const peres = (o = {}) => people.person({ outfit: 'grey', mood: 'worried', seed: 52, hair: 0x5a4a3a, ...o });
export const shomron = (o = {}) => people.person({ outfit: 'olive', hat: 'beret', hatColor: 0x7a2a2a, mood: 'stern', seed: 53, ...o });
export const barlev = (o = {}) => people.person({ outfit: 'suit', mood: 'calm', seed: 54, moustache: true, hair: 0x2b1e16, ...o });
export const ugSoldier = (seed, o = {}) => people.person({ outfit: 'khaki', hat: 'cap', hatColor: 0x7a6a4a, mood: 'stern', seed, ...o });

// ---------- Entebbe airfield ----------
export function airstrip(k, o = {}) {
  const { scene } = k;
  const env = core.setEnv(k, o.env ?? (o.night ? 'night' : 'day'), { fogNear: 90, fogFar: 650, shadowSize: 70 });
  scene.add(props.ground(o.night ? 0x5a6650 : 0x7d8a52, 1600));
  const rw = props.runway(500, 45, { lamps: o.lamps ?? !o.night, lampColor: 0xffcf6a }); rw.position.set(0, 0, -40); scene.add(rw);
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(140, 80), core.toon(o.night ? 0x55554e : 0x8a877c)); apron.rotation.x = -Math.PI / 2; apron.position.set(-80, .01, -60); apron.userData.noOutline = true; scene.add(apron);
  let term, tw;
  if (o.terminal) { term = props.terminal({ lit: o.night ? ((x, y) => (Math.sin(x * 7) > .5 && y < 3)) : null }); term.position.set(-90, 0, -90); term.rotation.y = .3; scene.add(term); }
  if (o.tower) { tw = props.tower({ lit: o.night }); tw.position.set(-60, 0, -110); scene.add(tw); }
  const trees = props.treeLine(50, { spread: 700, depth: 30, seed: 6 }); trees.position.set(0, 0, -190); scene.add(trees);
  // Lake Victoria shimmer beyond
  const lake = new THREE.Mesh(new THREE.PlaneGeometry(2000, 600), core.toon(o.night ? 0x1a2236 : 0x6f8fa0)); lake.rotation.x = -Math.PI / 2; lake.position.set(0, .005, 520); lake.userData.noOutline = true; scene.add(lake);
  return { env, rw, term, tw };
}

// black Mercedes + two Land Rovers; drive(d) moves it d metres along -z (or dir)
export function convoy(k, o = {}) {
  const g = new THREE.Group();
  const merc = props.mercedes({ flags: true, color: o.mercColor ?? 0x15161a }); merc.rotation.y = -Math.PI / 2;
  const lr1 = props.landRover(), lr2 = props.landRover(); lr1.rotation.y = lr2.rotation.y = -Math.PI / 2;
  merc.position.set(0, 0, 0); lr1.position.set(0, 0, 7); lr2.position.set(0, 0, 13.5);
  g.add(merc, lr1, lr2); g.cars = [merc, lr1, lr2];
  if (o.crew !== false) {
    // soldiers riding in the Land Rovers (upper bodies visible)
    [lr1, lr2].forEach((lr, j) => { for (let i = 0; i < 3; i++) { const c = commando(200 + j * 10 + i); c.userData.seatY = .55; c.state.pose = 'sit'; c.scale.setScalar(.85); c.position.set(-.8 + i * .7, .55, (i % 2 ? .35 : -.35)); c.rotation.y = Math.PI / 2; lr.add(c); } });
  }
  g.drive = (d, oo = {}) => { g.cars.forEach((c, i) => { c.position.z = [0, 7, 13.5][i] - d; c.roll(d); c.position.y = Math.sin(d * 3 + i) * .015; }); };
  return g;
}

// ---------- generic map shot ----------
// cfg: center, span, labels, highlight, faces, cities[], route[[lon,lat]...], cam{from,to,look,lookTo}, tally[label,value,suffix], plane, extra(fn)
export async function mapShot(k, cfg) {
  const { scene, camera, meta } = k;
  core.setEnv(k, cfg.dark ? 'dark' : 'day', { noFog: true, shadowSize: 120, sunPos: [30, 90, 40] });
  scene.background = new THREE.Color(cfg.dark ? 0x10141c : 0x3a2c22);
  const map = await maps.parchment({ center: cfg.center, span: cfg.span, k: cfg.k ?? 4, labels: cfg.labels, highlight: cfg.highlight, faces: cfg.faces, dark: cfg.dark, hlColor: cfg.hlColor });
  scene.add(map);
  const dots = (cfg.cities ?? []).map(c => typeof c === 'string' ? map.city(c) : map.city(c[0], c[1]));
  const rib = cfg.route ? maps.ribbon(map, cfg.route, { color: cfg.routeColor ?? 0xd9a42b }) : null; if (rib) scene.add(rib);
  const ic = cfg.plane ? maps.planeIcon({ s: cfg.iconScale ?? 2.2 }) : null; if (ic) scene.add(ic);
  const extra = cfg.extra ? await cfg.extra(k, map) : null;
  const [MW, MH] = map.size; const fit = Math.max(MW / 1.78, MH) * .5 / Math.tan(20 * Math.PI / 180);
  const c = cfg.cam ?? { from: [0, fit * .95, fit * .45], to: [0, fit * .72, fit * .3], look: [0, 0, 0], lookTo: [0, 0, -fit * .05] };
  const cam = core.camMove(camera, { fov: 40, ...c, drift: .2 });
  const dur = meta.seconds;
  const r0 = cfg.routeStart ?? .12, r1 = cfg.routeEnd ?? .82;
  return (t, u) => {
    cam(u, t);
    dots.forEach((d, i) => { const s = core.pop(t, .2 + i * .25, .3); d.scale.setScalar(Math.max(.001, s)); if (d.label) d.label.scale.setScalar(Math.max(.001, s)); });
    const rk = core.easeInOut(core.seg(t, dur * r0, dur * r1));
    if (rib) rib.set(rk);
    if (ic && rib) { const kk = Math.max(.002, Math.min(.998, rk)); const p = rib.curve.getPointAt(kk); const tg = rib.curve.getTangentAt(kk); ic.position.copy(p).add(new THREE.Vector3(0, 1.4, 0)); ic.lookAt(p.clone().add(tg).add(new THREE.Vector3(0, 1.4, 0))); ic.visible = rk > .005; }
    if (cfg.tally) k.ownTally = true;
  if (cfg.tally) { const [lab, val, suf] = cfg.tally; const v = Math.round(val * rk); ui.tally(k.overlay, lab, v.toLocaleString('en-US') + (suf ?? ''), 960, 120, t, .3); }
    if (extra) extra(t, u, rk);
  };
}

// ---------- quick interior helpers ----------
export function cabin(k, o = {}) {
  // cutaway airliner cabin: floor, seat rows, curved wall behind
  const g = new THREE.Group(); const len = o.len ?? 14;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(5.2, len), core.toon(0x5a5048)); floor.rotation.x = -Math.PI / 2; floor.userData.noOutline = true; g.add(floor);
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 2.9, len, 32, 1, true, Math.PI * .5, Math.PI), core.toon(0xe8e2d4, { mat: { side: THREE.BackSide } }));
  wall.rotation.x = Math.PI / 2; wall.rotation.z = Math.PI / 2; wall.position.y = 1.2; wall.userData.noOutline = true; g.add(wall);
  for (let z = -len / 2 + 1; z < len / 2 - .5; z += .95) {
    for (const x of [-2.1, .55]) { const r = props.seatRow({ n: 3, color: o.seat ?? 0x4a5a7a }); r.position.set(x, 0, z); g.add(r); }
    for (const x of [-2.55, 2.55]) { const w = core.box(.05, .35, .3, 0x9ab0c8, { pos: [x * .99, 1.3, z], noOutline: true, emissive: o.night ? 0x223044 : 0x9ab0c8, ei: o.night ? .2 : .6 }); g.add(w); }
  }
  if (!o.cutaway) g.add(core.box(5.2, .08, len, 0xd8d2c4, { pos: [0, 2.55, 0], noOutline: true }));
  else { wall.geometry.dispose(); wall.geometry = new THREE.CylinderGeometry(2.9, 2.9, len, 32, 1, true, Math.PI * .5, Math.PI * .5); }
  return g;
}
export function seatPeople(k, row, n, seed) { const ps = []; for (let i = 0; i < n; i++) { const p = people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2'][(seed + i) % 6], seed: seed * 10 + i, mood: 'calm', hair: [0x2b1e16, 0x5a3a22, 0x9a9a9a][i % 3] }); p.userData.seatY = .1; p.state.pose = 'sit'; p.scale.setScalar(.82); ps.push(p); } return ps; }

export { core, props, people, maps, ui, THREE };

// ---------- generic helpers for character scenes ----------
export function place(scene, fig, o = {}) {
  if (o.pos) fig.position.set(...o.pos);
  if (o.rot != null) fig.rotation.y = o.rot;
  if (o.pose) fig.state.pose = o.pose;
  if (o.pose === 'sit' || o.pose === 'sitDesk') fig.userData.seatY = o.pos ? o.pos[1] : 0;
  if (o.arm) fig.state.arm = o.arm;
  if (o.mood) fig.setMood(o.mood);
  if (o.scale) fig.scale.setScalar(o.scale);
  scene.add(fig); return fig;
}
// interior box with warm practical light
export function interior(k, o = {}) {
  const { scene } = k;
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 12, sunPos: o.sunPos ?? [4, 9, 8], fill: o.fill ?? .6 });
  scene.background = new THREE.Color(o.bg ?? 0x2a2018);
  const r = props.room(o.w ?? 12, o.d ?? 9, o.h ?? 4, { wall: o.wall ?? 0xd8ccb0, floor: o.floor ?? 0x8a7458, sides: o.sides });
  scene.add(r);
  if (o.lamp !== false) { const l = new THREE.PointLight(o.lampColor ?? 0xfff0dc, (o.lampI ?? 25) * .45, 18); l.position.set(0, (o.h ?? 4) - .4, 0); scene.add(l); }
  if (o.window) { const w = core.box(2.4, 1.4, .05, o.window, { pos: [o.winX ?? 3, 2.2, -(o.d ?? 9) / 2 + .03], noOutline: true, emissive: o.window, ei: .8 }); scene.add(w); }
  return r;
}
// screen-space anchor of a 3D point
export function screen(k, x, y, z) { const v = new THREE.Vector3(x, y, z).project(k.camera); return [(v.x + 1) * 960, (1 - v.y) * 540]; }
// cards on a dark backdrop that flip in one by one; cards: [{text, sub, color, draw}]
export function cardRow(k, cards, o = {}) {
  const { scene, camera } = k;
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 10, sunPos: [2, 6, 10] });
  scene.background = new THREE.Color(o.bg ?? 0x1d1712);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), core.toon(o.wall ?? 0x2e241c)); back.position.z = -1; back.userData.noOutline = true; scene.add(back);
  const n = cards.length, w = o.w ?? Math.min(3.2, 12 / n);
  const objs = cards.map((c, i) => {
    const cd = props.card(c.text, { h: o.h ?? w * 1.3, cw: 600, ch: 780, size: c.size ?? 64, sub: true, bg: c.bg ?? '#efe6cf', color: c.color, draw: c.draw });
    const piv = new THREE.Group(); piv.position.set((i - (n - 1) / 2) * (w + .5), 0, 0); piv.add(cd); scene.add(piv); return piv;
  });
  const cam = core.camMove(camera, { from: [0, .2, o.dist ?? 11], to: [0, .1, (o.dist ?? 11) - 1.2], look: [0, 0, 0], fov: 40 });
  return (t, u) => { cam(u, t); objs.forEach((p, i) => { const s = core.clamp((t - (o.start ?? .2) - i * (o.gap ?? .35)) / .45); p.rotation.y = (1 - core.easeOut(s)) * Math.PI / 2; p.visible = s > 0; }); };
}
// silhouette figure card drawing (generic, no face)
export function silhouetteDraw(x, c, label, sub) {
  x.fillStyle = '#2b2b33'; x.beginPath(); x.arc(c.width / 2, 300, 120, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.ellipse(c.width / 2, 560, 170, 140, 0, Math.PI, 0); x.fill(); x.fillRect(c.width / 2 - 170, 555, 340, 60);
  x.fillStyle = '#efe6cf'; x.fillRect(0, 640, c.width, 140);
  x.fillStyle = '#2b1e16'; x.font = '60px Anton'; x.textAlign = 'center'; x.fillText(label, c.width / 2, 690);
  if (sub) { x.fillStyle = '#c0392b'; x.font = '600 34px Oswald'; x.fillText(sub, c.width / 2, 745); }
}
// little 3D speech/thought bubble with text
export function bubble(text, o = {}) {
  const c = document.createElement('canvas'); c.width = 900; c.height = 420; const x = c.getContext('2d');
  x.fillStyle = '#fbf6ea'; x.strokeStyle = '#2b1e16'; x.lineWidth = 12;
  x.beginPath(); x.roundRect(20, 20, 860, 300, 120); x.fill(); x.stroke();
  x.beginPath(); if (o.thought) { [[200, 360, 30], [140, 395, 18]].forEach(([a, b, r]) => { x.moveTo(a + r, b); x.arc(a, b, r, 0, Math.PI * 2); }); x.fill(); x.stroke(); }
  else { x.moveTo(200, 314); x.lineTo(150, 410); x.lineTo(290, 314); x.fill(); x.stroke(); x.fillRect(190, 300, 110, 20); }
  x.fillStyle = '#2b1e16'; x.font = `${o.size ?? 90}px Anton`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (text) x.fillText(text, 450, 170);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(o.w ?? 2.4, (o.w ?? 2.4) * 420 / 900), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide })); m.userData.noOutline = true; return m;
}
// popping scale helper
export function popIn(obj, t, start, base = 1) { const s = core.pop(t, start, .3); obj.visible = s > .001; obj.scale.setScalar(Math.max(.001, s * base)); }
// glowing x-ray tint box
export function glowBox(w, h, d, color) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .45 })); m.userData.noOutline = true; return m; }

// old terminal main hall: long room, mattresses, high windows, doors
export function hall(k, o = {}) {
  const { scene } = k;
  interior(k, { w: 22, d: 14, h: 5, wall: o.wall ?? 0xcfc2a0, floor: 0x8a7a60, lampI: o.lampI ?? 30, bg: 0x1d1712, sunPos: [6, 10, 6] });
  for (let x = -9; x <= 9; x += 3) scene.add(core.box(2, 1.2, .06, o.night ? 0x1a2236 : 0x9ab8d0, { pos: [x, 3.7, -6.97], noOutline: true, emissive: o.night ? 0x1a2236 : 0x9ab8d0, ei: .6 }));
  for (let x = -8; x <= 8; x += 4) scene.add(core.box(.4, 5, .4, 0xb8aa88, { pos: [x, 2.5, -2] }));
  const mats = [];
  if (o.mattresses !== false) for (let i = 0; i < (o.nMat ?? 18); i++) { const m = props.mattress({ color: [0xd8d0b8, 0xc8b8a0, 0xb8c0c8][i % 3] }); m.position.set(-8 + (i % 9) * 2, 0, 1 + Math.floor(i / 9) * 2.6); m.rotation.y = (i % 2 ? .08 : -.06); scene.add(m); mats.push(m); }
  const d1 = props.door(); d1.position.set(-10.9, 0, 3); d1.rotation.y = P2; scene.add(d1);
  const d2 = props.door(); d2.position.set(10.9, 0, 3); d2.rotation.y = -P2; scene.add(d2);
  return { mats, d1, d2 };
}
const P2 = Math.PI / 2;
// hostages sitting/lying on mattresses
export function hostages(k, mats, o = {}) {
  const ps = []; const r = core.rng(o.seed ?? 7);
  mats.forEach((m, i) => { if (r() < (o.skip ?? .15)) return; const p = people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2', 'suit', 'grey'][i % 8], seed: (o.seed ?? 7) * 50 + i, mood: o.mood ?? 'worried', hair: [0x2b1e16, 0x5a3a22, 0x9a9a9a, 0x8a6a3a][i % 4], hat: (i % 7 === 0 ? 'kippah' : undefined) });
    const lie = o.lie || (o.mixed && r() < .4);
    if (lie) { p.state.pose = 'lie'; p.position.set(m.position.x, .26, m.position.z + .3); }
    else { p.state.pose = 'sit'; p.userData.seatY = .1; p.position.set(m.position.x, .1, m.position.z); p.rotation.y = (r() - .5) * 1.2 + (o.face ?? 0); }
    k.scene.add(p); ps.push(p); });
  return ps;
}

// war room: long table with maps and phones, generals around it
export function warRoom(k, o = {}) {
  const { scene } = k;
  interior(k, { w: 14, d: 10, h: 4, wall: 0x9a9480, floor: 0x5a4a3a, lampI: 26, bg: 0x1a1612, window: o.night ? 0x1a2236 : null, winX: 4 });
  const tb = props.table(6, 2.2, { color: 0x5a3a26 }); scene.add(tb);
  const mp = maps.inkMapPlane ? null : null;
  for (let i = 0; i < 4; i++) { const m = core.box(1.2, .01, .8, [0xe8dcbc, 0xd8ccb0][i % 2], { pos: [-2.2 + i * 1.5, .83, (i % 2 ? .3 : -.3)], rot: [0, (i - 1.5) * .2, 0], noOutline: true }); scene.add(m); }
  for (const x of [-2.6, 2.4]) { const ph = props.phone(); ph.position.set(x, .82, .75); scene.add(ph); }
  const seats = [];
  for (let i = 0; i < (o.n ?? 8); i++) { const side = i % 2 ? 1 : -1, x = -2.4 + Math.floor(i / 2) * 1.6; const c = props.chair(); c.position.set(x, 0, side * 1.5); c.rotation.y = side > 0 ? P2 * 2 : 0; scene.add(c); seats.push([x, side]); }
  const ppl = seats.map(([x, side], i) => place(scene, people.person({ outfit: ['olive', 'suit', 'olive', 'grey', 'olive', 'suit', 'olive', 'grey'][i % 8], hat: i % 3 === 0 ? 'beret' : undefined, hatColor: 0x7a2a2a, seed: 700 + i, mood: i % 2 ? 'stern' : 'worried', hair: [0x2b1e16, 0x9a9a9a, 0x5a3a22][i % 3] }), { pos: [x, .02, side * 1.45], rot: side > 0 ? Math.PI : 0, pose: 'sitDesk' }));
  return { tb, ppl };
}
