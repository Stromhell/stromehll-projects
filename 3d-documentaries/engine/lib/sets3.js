// Shared realistic sets for Operation Thunderbolt acts 5+: war room, offices, desk phones, city blocks.
import * as C from '../shots/tb3_common.js';
import * as S2 from './sets2.js';
const { THREE, P, real } = C;

export const rnd = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
export const WOOD = () => real.std(0x4a2e1c, { rough: .42 });
export const BLACK = () => real.std(0x111112, { rough: .3, metal: .1 });

// simple wooden chair, facing +z
export function chair(mat = WOOD()) {
  const g = new THREE.Group();
  g.add(real.box(.46, .05, .44, mat, { pos: [0, .44, 0] }));
  for (const [x, z] of [[-.2, -.19], [.2, -.19], [-.2, .19], [.2, .19]]) g.add(real.box(.04, .44, .04, mat, { pos: [x, .22, z] }));
  g.add(real.box(.46, .46, .04, mat, { pos: [0, .7, -.2] }));
  return g;
}
// 1970s rotary desk phone; returns { g, handset } (handset long axis along y)
export function rotary(color = 0x111112) {
  const g = new THREE.Group(); const m = real.std(color, { rough: .3, metal: .1 });
  g.add(real.rbox(.2, .09, .23, .03, m, { pos: [0, .045, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.055, .055, .012, 24), real.std(0xe8e4da, { rough: .4 }), { pos: [0, .095, .05], rot: [-.35, 0, 0] }));
  const handset = handsetShape(m); handset.rotation.set(0, 0, P / 2); handset.position.set(0, .12, -.03); g.add(handset);
  return { g, handset };
}
export function handsetShape(m = BLACK()) {
  const h = new THREE.Group();
  h.add(real.box(.035, .17, .03, m));
  h.add(real.rbox(.05, .05, .055, .015, m, { pos: [0, .09, .015] }));
  h.add(real.rbox(.05, .05, .055, .015, m, { pos: [0, -.09, .015] }));
  return h;
}
// paper sheets scattered on a surface at height y
export function papers(scene, n, x0, x1, z0, z1, y, seed = 3) {
  const r = rnd(seed); const m = real.std(0xefe9dc, { rough: .9 });
  for (let i = 0; i < n; i++) { const p = real.box(.21, .003, .297, m, { pos: [x0 + r() * (x1 - x0), y + i * .0005, z0 + r() * (z1 - z0)], cast: false }); p.rotation.y = r() * P; scene.add(p); }
}
// wall map of the region with Entebbe pinned
export function wallMap(w = 3.2, h = 2) {
  const t = real.canvasTex(1280, 800, (c, W, H) => {
    c.fillStyle = '#9fb3b8'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#d9cfae'; c.beginPath(); c.moveTo(0, 120); c.lineTo(520, 90); c.lineTo(700, 140); c.lineTo(820, 60); c.lineTo(1000, 40); c.lineTo(1060, 190); c.lineTo(980, 330); c.lineTo(1120, 520); c.lineTo(1050, 800); c.lineTo(0, 800); c.closePath(); c.fill();
    c.fillStyle = '#d9cfae'; c.beginPath(); c.moveTo(1040, 0); c.lineTo(1280, 0); c.lineTo(1280, 210); c.lineTo(1150, 160); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(60,50,40,.35)'; c.lineWidth = 2; for (let x = 0; x < W; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y < H; y += 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.fillStyle = '#7e9fae'; c.beginPath(); c.ellipse(700, 600, 90, 80, 0, 0, P * 2); c.fill();
    c.strokeStyle = '#b5281e'; c.lineWidth = 6; c.setLineDash([18, 12]); c.beginPath(); c.moveTo(1180, 110); c.quadraticCurveTo(980, 300, 690, 560); c.stroke(); c.setLineDash([]);
    c.fillStyle = '#b5281e'; c.beginPath(); c.arc(690, 560, 14, 0, P * 2); c.fill();
    c.fillStyle = '#2b1e16'; c.font = 'bold 40px "Oswald", sans-serif'; c.fillText('ENTEBBE', 600, 520); c.fillText('ISRAEL', 1130, 70); c.font = 'bold 30px "Oswald", sans-serif'; c.fillText('LAKE VICTORIA', 610, 690); c.fillText('UGANDA', 520, 440); c.fillText('KENYA', 860, 520);
  });
  const g = new THREE.Group();
  g.add(real.box(w + .1, h + .1, .04, real.std(0x2a1e14, { rough: .5 })));
  g.add(real.m(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .85 }), { pos: [0, 0, .025], cast: false }));
  return g;
}
// the government war room: long table, phones, papers, wall map; returns seats
export async function warRoom(k, o = {}) {
  const { scene } = k;
  await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .3 });
  await C.room(k, { w: 12, d: 9, h: 3.3, floor: 'dirty_carpet', wallColor: 0xd8ccb0 });
  C.tubes(k, [-3, 0, 3], [-1.6, 1.6], 3.3, { i: o.tubeI ?? 10, dist: 10, color: 0xfff0d8 });
  scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .9));
  const wood = WOOD();
  scene.add(real.rbox(6.4, .06, 1.5, .02, wood, { pos: [0, .75, 0] }));
  for (const x of [-2.9, 2.9]) for (const z of [-.55, .55]) scene.add(real.box(.08, .72, .08, wood, { pos: [x, .36, z] }));
  papers(scene, 18, -2.9, 2.9, -.55, .55, .795, 5);
  for (const [x, z] of [[-2.2, -.45], [.4, .5], [2.4, -.4]]) { const ph = rotary(); ph.g.position.set(x, .792, z); ph.g.rotation.y = z > 0 ? P : 0; scene.add(ph.g); }
  for (const [n, x, z, ry] of [['binder_notebook', -1.2, .3, .3], ['office_notepads', 1.4, -.35, -.2], ['cigarette_pack', -.3, -.4, .8], ['clipboard', 1.9, .35, 1.2]]) { const p = await real.prop(n); p.position.set(x, .792, z); p.rotation.y = ry; scene.add(p); }
  const map = wallMap(); map.position.set(0, 1.85, -4.47); scene.add(map);
  const clk = await real.prop('wall_clock'); clk.position.set(5.97, 2.5, 0); clk.rotation.y = -P / 2; scene.add(clk);
  const seats = [];
  for (const x of [-2.25, -.75, .75, 2.25]) for (const z of [-1.05, 1.05]) { const ch = chair(wood); ch.position.set(x, 0, z + Math.sign(z) * .08); ch.rotation.y = z > 0 ? P : 0; scene.add(ch); seats.push({ x, z, rot: z > 0 ? P : 0 }); }
  return { seats, map };
}
export const CABINET = ['tb_gen1', 'tb_off1', 'tb_cmd1', 'tb_gen2', 'tb_off2', 'tb_cmd2', 'tb_ana', 'tb_cmd3'];
export async function seatPeople(k, seats, ids, skip = []) {
  const ppl = [];
  for (let i = 0; i < seats.length; i++) { if (skip.includes(i)) continue; const s = seats[i]; const p = await k.real.human({ id: ids[i % ids.length], seed: 2000 + i }); k.real.put(k.scene, p, { pos: [s.x, 0, s.z], rot: s.rot, pose: 'sitDesk', arm: 'desk', seatH: .48, mood: 'stern' }); p.userData.driven = true; ppl.push(p); }
  return ppl;
}
export const talkAll = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sitDesk', arm: 'desk', seatH: .48, mood: o.mood ?? (i % 3 ? 'stern' : 'worried'), look: Math.sin(t * .5 + i * 1.7) * .35, nod: .15 + Math.sin(t * .7 + i) * .1, talk: o.talk !== false && (i % 3 === Math.floor(t / 1.6) % 3) }));

// night city block: lit and dark windows
export function block(w, h, d, seed, o = {}) {
  const r = rnd(seed); const cols = Math.round(w / 2.4), rows = Math.round(h / 3.2);
  const day = o.day;
  const draw = (lit) => real.canvasTex(cols * 32, rows * 32, (c, W, H) => {
    c.fillStyle = lit ? '#000' : (o.wall ?? (day ? '#cfc6b0' : '#5a5650')); c.fillRect(0, 0, W, H);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const on = !day && r() < (o.litP ?? .35); c.fillStyle = lit ? (on ? '#ffc874' : '#000') : (day ? '#2a3440' : (on ? '#ffd890' : '#14181e')); c.fillRect(x * 32 + 8, y * 32 + 7, 16, 18); }
  });
  const map = draw(false); const seed2 = seed; const em = (r2 => { return draw(true); })(seed2);
  const mat = new THREE.MeshStandardMaterial({ map, roughness: .85, emissive: day ? 0x000000 : 0xffffff, emissiveMap: day ? null : em, emissiveIntensity: day ? 0 : 1.6 });
  const g = real.box(w, h, d, mat, { pos: [0, h / 2, 0] });
  return g;
}
export async function night(k) {
  await k.real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-40, 60, -30], sunI: 1.6, sunColor: 0xa8bcff, shadowSize: 60, bg: 0x04050b, envI: .22, exposure: 1.1 });
  k.scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, .6));
}
// an office with a desk; returns the desk top height
export async function office(k, o = {}) {
  const { scene } = k;
  await real.env(k, 'small_empty_room_1', { sun: false, bg: 0x0a0a0c, envI: .35 });
  await C.room(k, { w: 7, d: 6, h: 3.1, floor: o.floor ?? 'dirty_carpet', wallColor: o.wall ?? 0xd8ccb0 });
  scene.add(new THREE.HemisphereLight(0xfff0d8, 0x2a2420, .5));
  const desk = await real.prop('metal_office_desk'); desk.rotation.y = P; scene.add(desk);
  return .76;
}


// C-130 cargo hold seen from inside: metal floor, quilted walls, ribs, webbing seats, dim lamps.
// holdInterior(k, {len, red, seats:[z0,z1]}) -> {seatSpots:[{x,z,rot}], len}
export async function holdInterior(k, o = {}) {
  const { scene } = k; const len = o.len ?? 13, R = 1.95, cy = .95;
  await real.env(k, 'hangar_interior', { sun: false, bg: 0x050505, envI: .12 });
  const floor = await real.pbr('metal_plate', { repeat: [2, len / 1.5], color: 0x8a8a84 });
  scene.add(real.m(new THREE.PlaneGeometry(3.3, len), floor, { rot: [-P / 2, 0, 0], cast: false }));
  for (const x of [-1, -.35, .35, 1]) scene.add(real.box(.06, .02, len, real.std(0x3a3a38, { metal: .7, rough: .4 }), { pos: [x, .01, 0], cast: false }));
  const quilt = real.canvasTex(512, 512, (c, W, H) => { c.fillStyle = '#6f7564'; c.fillRect(0, 0, W, H); c.strokeStyle = 'rgba(30,34,26,.55)'; c.lineWidth = 6; for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(i * W / 4, 0); c.lineTo(i * W / 4, H); c.stroke(); c.beginPath(); c.moveTo(0, i * H / 4); c.lineTo(W, i * H / 4); c.stroke(); } c.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 16; i++) c.fillRect((i % 4) * W / 4 + 10, Math.floor(i / 4) * H / 4 + 10, W / 4 - 40, 14); }, { repeat: [10, len / 1.2] });
  const wall = real.m(new THREE.CylinderGeometry(R, R, len, 40, 1, true), new THREE.MeshStandardMaterial({ map: quilt, roughness: .9, side: THREE.BackSide }), { pos: [0, cy, 0], rot: [P / 2, 0, 0], cast: false }); scene.add(wall);
  const rib = real.std(0x4a4e44, { rough: .6, metal: .3 });
  for (let z = -len / 2 + .5; z < len / 2; z += 1) scene.add(real.m(new THREE.TorusGeometry(R - .05, .05, 6, 40), rib, { pos: [0, cy, z], cast: false }));
  const bulk = real.std(0x5a5e52, { rough: .8 });
  scene.add(real.m(new THREE.CircleGeometry(R, 40), bulk, { pos: [0, cy, -len / 2], cast: false }));
  scene.add(real.box(.8, 1.9, .05, real.std(0x3a3e36, { rough: .6 }), { pos: [-.9, .95, -len / 2 + .03] }));
  const rampM = real.std(0x4a4e44, { rough: .7, metal: .3 });
  let ramp = null;
  if (!o.open) { ramp = real.box(3, 2.6, .08, rampM, { pos: [0, 1.25, len / 2 + .2] }); ramp.rotation.x = -.35; scene.add(ramp);
  scene.add(real.m(new THREE.CircleGeometry(R, 40), bulk, { pos: [0, cy, len / 2 + .9], rot: [0, P, 0], cast: false })); }
  // lamps along the ceiling
  const col = o.red ? 0xff5a3a : 0xffe0b0;
  for (let z = -len / 2 + 1.5; z < len / 2; z += 3) { scene.add(real.box(.4, .05, .15, real.std(0x222222, { emissive: col, ei: 2 }), { pos: [0, cy + R - .12, z], cast: false })); real.lamp(scene, [0, cy + R - .4, z], { i: o.lampI ?? (o.red ? 5 : 7), dist: 6, color: col }); }
  scene.add(new THREE.HemisphereLight(o.red ? 0xff8a6a : 0xfff0d8, 0x101010, o.hemi ?? .35));
  // red webbing bench seats along the walls
  const seatSpots = [];
  const [z0, z1] = Array.isArray(o.seats) ? o.seats : [-len / 2 + .8, len / 2 - 1];
  const web = real.std(0x8a2a22, { rough: .95 }), tube = real.std(0x8a8a84, { metal: .8, rough: .35 });
  if (o.seats !== false) for (const s of [-1, 1]) {
    scene.add(real.box(.42, .04, z1 - z0, web, { pos: [s * 1.3, .45, (z0 + z1) / 2] }));
    scene.add(real.box(.03, .03, z1 - z0, tube, { pos: [s * 1.1, .44, (z0 + z1) / 2] }));
    scene.add(real.box(.02, .55, z1 - z0, web, { pos: [s * 1.55, .8, (z0 + z1) / 2] }));
    for (let z = z0 + .3; z < z1; z += .62) seatSpots.push({ x: s * 1.28, z, rot: -s * P / 2 });
  }
  return { seatSpots, len, ramp };
}
export async function seatSoldiers(k, spots, ids, o = {}) {
  const ppl = [];
  for (let i = 0; i < spots.length; i++) { if (o.every && i % o.every) continue; const s = spots[i]; const p = await k.real.human({ id: ids[i % ids.length], seed: (o.seed ?? 4000) + i }); k.real.put(k.scene, p, { pos: [s.x, 0, s.z], rot: s.rot, pose: 'sit', seatH: .45, arm: 'lap', mood: o.mood ?? 'stern' }); p.userData.driven = true; p.userData.ph = i * 1.3; ppl.push(p); }
  return ppl;
}
export const idleSit = (ppl, t, o = {}) => ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .45, arm: 'lap', mood: o.mood ?? 'stern', look: Math.sin(t * .45 + p.userData.ph) * .25, nod: .15 + Math.sin(t * .3 + i) * .1 }));

// moonlit night with a star dome (same look as the cold open)
export async function starNight(k, o = {}) {
  const { scene } = k;
  await real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: o.moon ?? [-40, 60, -30], sunI: (o.moonI ?? 1.1) * 2.6, sunColor: 0xa8bcff, shadowSize: o.shadowSize ?? 40, bg: 0x03040a, envI: o.envI ?? .3, exposure: 1.1, fx: o.fx });
  scene.add(new THREE.HemisphereLight(0x5a70a8, 0x141820, o.hemi ?? .9));
  const stars = real.canvasTex(4096, 2048, (c, w, h) => { c.fillStyle = '#02030a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 4000; i++) { const x = (i * 7919) % w, y = (i * 104729) % (h * .55); const a = .3 + ((i * 31) % 70) / 100; c.fillStyle = `rgba(230,236,255,${a})`; c.fillRect(x, y, (i % 11 === 0) ? 3 : 1.6, (i % 11 === 0) ? 3 : 1.6); } });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(4000, 48, 24), new THREE.MeshBasicMaterial({ map: stars, side: THREE.BackSide, depthWrite: false, fog: false }));
  sky.renderOrder = -1; scene.add(sky);
}
// black Mercedes + two Land Rovers, optional commando teams inside and working headlights
export async function convoy(k, o = {}) {
  const { scene } = k;
  const cars = [S2.mercedes({ flags: true, lights: o.lights, flagTex: o.flagTex }), S2.landrover({ lights: o.lights }), S2.landrover({ lights: o.lights })];
  cars.forEach(c => scene.add(c));
  if (o.lights) cars.forEach(c => { const l = new THREE.SpotLight(0xfff0d0, 120, 60, .45, .5, 1.4); l.position.set(0, .8, 2.3); l.target.position.set(0, 0, 20); l.castShadow = true; c.add(l, l.target); });
  if (o.crew !== false) for (const [ci, x, z] of [[0, -.4, .2], [0, .4, .2], [0, -.4, -.9], [1, -.4, .5], [1, .4, .5], [2, -.4, .5], [2, .4, .5]]) {
    const p = await k.real.human({ id: ['tb_yoni', 'tb_cmd1', 'tb_cmd2', 'tb_cmd3'][(ci * 3 + Math.round(x * 5) + 10) % 4], seed: 300 + ci * 10 + z * 10 });
    k.real.put(scene, p, { pos: [x, .15, z], pose: 'sit', seatH: .45 }); p.userData.driven = true; scene.remove(p); cars[ci].add(p);
  }
  return cars;
}
export function rifleShape() { const g = new THREE.Group(); const mt = new THREE.MeshStandardMaterial({ color: 0x101010, roughness: .6, metalness: .3 }); g.add(new THREE.Mesh(new THREE.BoxGeometry(.04, .07, .95), mt)); const st = new THREE.Mesh(new THREE.BoxGeometry(.04, .12, .25), mt); st.position.set(0, -.03, -.5); g.add(st); g.traverse(c => { if (c.isMesh) c.castShadow = true; }); return g; }
// brief white flash sprite + light (muzzle flash seen far away, no detail)
export function flash(scene, pos, o = {}) {
  const t = real.canvasTex(128, 128, (c) => { const g = c.createRadialGradient(64, 64, 2, 64, 64, 62); g.addColorStop(0, 'rgba(255,250,230,1)'); g.addColorStop(.3, 'rgba(255,220,150,.6)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(0, 0, 128, 128); });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); s.position.set(...pos); s.scale.setScalar(o.size ?? 1); s.visible = false; scene.add(s);
  const l = new THREE.PointLight(0xffe0b0, 0, o.dist ?? 20, 2); l.position.set(...pos); scene.add(l);
  return on => { s.visible = !!on; l.intensity = on ? (o.i ?? 60) * on : 0; };
}
