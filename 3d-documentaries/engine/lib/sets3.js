// Shared realistic sets for Operation Thunderbolt acts 5+: war room, offices, desk phones, city blocks.
import * as C from '../shots/tb3_common.js';
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

