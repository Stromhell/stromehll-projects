// Ancient Rome sets and props for the realistic look (Caesar film).
// Real-world sizes in metres. Materials are Poly Haven CC0 PBR sets (tools/fetch_assets.py).
import * as THREE from 'three';
import * as real from './real.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const P = Math.PI;
const rng = s => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);

// ---------- materials ----------
const MC = new Map();
export async function mats() {
  if (MC.has('m')) return MC.get('m');
  const M = {
    marble: await real.pbr('marble_01', { repeat: [1, 2], color: 0xfffbf4, rough: .45 }),
    marbleDark: await real.pbr('marble_01', { repeat: [1, 2], color: 0x8a8076, rough: .4 }),
    floor: await real.pbr('marble_tiles', { repeat: [8, 12], rough: .35 }),
    stone: await real.pbr('sandstone_blocks_08', { repeat: [4, 2], color: 0xe8dcc8 }),
    plaster: await real.pbr('plaster_grey_04', { repeat: [4, 2], color: 0xe9dfcc }),
    red: await real.pbr('painted_plaster_wall', { repeat: [3, 1.5], color: 0x9a2a20 }),
    ochre: await real.pbr('painted_plaster_wall', { repeat: [3, 1.5], color: 0xc89a52 }),
    cobble: await real.pbr('cobblestone_floor_08', { repeat: [16, 16] }),
    wood: await real.pbr('dark_wooden_planks', { repeat: [2, 2] }),
    roof: await real.pbr('roof_tiles_14', { repeat: [6, 3], color: 0xc8805a }),
    brick: await real.pbr('red_brick_03', { repeat: [6, 3] }),
    gold: new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 1, roughness: .28 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0x6e4a2a, metalness: .9, roughness: .45 }),
    purple: new THREE.MeshStandardMaterial({ color: 0x4a1a5e, roughness: .8 }),
    terracotta: new THREE.MeshStandardMaterial({ color: 0xa8583a, roughness: .8 }),
    cloth: new THREE.MeshStandardMaterial({ color: 0xd8cfbd, roughness: .9, side: THREE.DoubleSide }),
  };
  MC.set('m', M); return M;
}

// ---------- architecture ----------
// fluted column with base and capital; h total height, r shaft radius
const colGeoCache = new Map();
function flutedGeo(r, h) {
  const key = r + '_' + h; if (colGeoCache.has(key)) return colGeoCache.get(key);
  const g = new THREE.CylinderGeometry(r * .88, r, h, 96, 8, true);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i); const a = Math.atan2(v.x, v.z); const rr = Math.hypot(v.x, v.z);
    const f = 1 - .045 * Math.pow(Math.max(0, Math.cos(a * 24)), 3);
    p.setXYZ(i, Math.sin(a) * rr * f, v.y, Math.cos(a) * rr * f);
  }
  g.computeVertexNormals(); colGeoCache.set(key, g); return g;
}
export function column(M, h = 9, r = .45, o = {}) {
  const g = new THREE.Group(); const mat = o.mat ?? M.marble;
  const bh = r * .7, ch = r * 1.6, sh = h - bh - ch;
  g.add(real.box(r * 2.7, r * .25, r * 2.7, mat, { pos: [0, r * .125, 0] }));
  g.add(real.m(new THREE.TorusGeometry(r * 1.08, r * .2, 12, 48), mat, { pos: [0, r * .38, 0], rot: [P / 2, 0, 0] }));
  g.add(real.m(new THREE.TorusGeometry(r * .98, r * .14, 12, 48), mat, { pos: [0, r * .62, 0], rot: [P / 2, 0, 0] }));
  g.add(real.m(flutedGeo(r, sh), mat, { pos: [0, bh + sh / 2, 0] }));
  // capital: bell with leaf bumps (Corinthian, simplified) + abacus
  const bell = real.m(new THREE.CylinderGeometry(r * 1.25, r * .9, ch * .75, 32), mat, { pos: [0, bh + sh + ch * .375, 0] }); g.add(bell);
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * P * 2, lv = i % 2 ? .45 : .2;
    const leaf = real.m(new THREE.SphereGeometry(r * .32, 10, 8), mat, { pos: [Math.sin(a) * r * 1.0, bh + sh + ch * lv, Math.cos(a) * r * 1.0], scale: [1, 1.6, .55] });
    leaf.lookAt(leaf.position.x * 3, leaf.position.y, leaf.position.z * 3); g.add(leaf);
  }
  for (let i = 0; i < 4; i++) { const a = i / 4 * P * 2 + P / 4; g.add(real.m(new THREE.TorusGeometry(r * .22, r * .08, 8, 16), mat, { pos: [Math.sin(a) * r * 1.3, bh + sh + ch * .8, Math.cos(a) * r * 1.3], rot: [0, a, 0] })); }
  g.add(real.box(r * 2.9, r * .3, r * 2.9, mat, { pos: [0, h - r * .15, 0] }));
  g.traverse(c => { if (c.isMesh) c.userData.solid = !!o.solid; });
  if (o.pos) g.position.set(...o.pos);
  return g;
}
// entablature beam with cornice over a row of columns
export function beam(M, len, o = {}) {
  const g = new THREE.Group(); const mat = o.mat ?? M.marble;
  g.add(real.box(len, .7, 1.1, mat, { pos: [0, .35, 0] }));
  g.add(real.box(len, .6, 1.0, mat, { pos: [0, 1.0, 0] }));
  g.add(real.box(len + .2, .25, 1.4, mat, { pos: [0, 1.42, 0] }));
  // dentils
  for (let x = -len / 2 + .15; x < len / 2; x += .3) g.add(real.box(.14, .14, .14, mat, { pos: [x, 1.24, .55] }));
  return g;
}
// temple front: podium, steps, columns, pediment
export function temple(M, o = {}) {
  const g = new THREE.Group(); const n = o.cols ?? 6, sp = o.spacing ?? 3.2, ch = o.h ?? 11, w = (n - 1) * sp + 3, d = o.depth ?? 22, pod = o.podium ?? 3;
  g.add(real.box(w + 2, pod, d, M.stone, { pos: [0, pod / 2, -d / 2] }));
  for (let i = 0; i < 10; i++) g.add(real.box(w * .7, pod / 10, .4, M.marble, { pos: [0, pod / 10 * (i + .5), .4 * (10 - i) - .2] }));
  for (let i = 0; i < n; i++) g.add(column(M, ch, .65, { pos: [-(n - 1) * sp / 2 + i * sp, pod, -1.5] }));
  for (let j = 1; j < 3; j++) for (const s of [-1, 1]) g.add(column(M, ch, .65, { pos: [s * (n - 1) * sp / 2, pod, -1.5 - j * sp] }));
  const cella = real.box(w - 2, ch, d - 9, M.plaster, { pos: [0, pod + ch / 2, -d / 2 - 3.5] }); g.add(cella);
  const bm = beam(M, w + .6); bm.position.set(0, pod + ch, -1.5); g.add(bm);
  const sh = new THREE.Shape(); sh.moveTo(-w / 2 - .4, 0); sh.lineTo(w / 2 + .4, 0); sh.lineTo(0, w * .22); sh.closePath();
  const ped = real.m(new THREE.ExtrudeGeometry(sh, { depth: d - 1, bevelEnabled: false }), M.marble, { pos: [0, pod + ch + 1.55, -d + .5] }); g.add(ped);
  const roofL = real.box(w * .56, .3, d, M.roof, { pos: [-w * .24, pod + ch + 1.55 + w * .11, -d / 2], rot: [0, 0, .42] }); g.add(roofL);
  const roofR = roofL.clone(); roofR.position.x *= -1; roofR.rotation.z *= -1; g.add(roofR);
  if (o.pos) g.position.set(...o.pos); if (o.rot) g.rotation.y = o.rot;
  return g;
}
// plain town houses / insulae in the distance
export function blockHouse(M, w, h, d, o = {}) {
  const g = new THREE.Group();
  g.add(real.box(w, h, d, o.mat ?? (o.r ? M.ochre : M.plaster), { pos: [0, h / 2, 0] }));
  const roof = real.box(w + .6, .3, d + .6, M.roof, { pos: [0, h + .15, 0] }); g.add(roof);
  const dark = real.std(0x1c1610, { rough: .9 });
  for (let y = 2.5; y < h - 1; y += 3) for (let x = -w / 2 + 1.2; x < w / 2 - .8; x += 2.2) g.add(real.box(.7, 1.1, .1, dark, { pos: [x, y, d / 2 + .02] }));
  if (o.pos) g.position.set(...o.pos); if (o.rot) g.rotation.y = o.rot;
  return g;
}

// ---------- the Curia of Pompey (interior) ----------
// Hall 18 m wide (x), 30 m long (z). Doors at z=+15, Pompey's statue at z=-13, the golden chair on a dais at z=-10.6.
// Tiered stone benches along both long walls (x = ±5.2 .. ±8.4), three tiers, each 0.45 m high, 1.05 m deep.
// sun: big windows high in the +x wall throw shafts of light across the floor.
export const CURIA = { chair: [0, .45, -10.6], statue: [0, 0, -13.2], door: [0, 0, 15], tiers: [5.4, 6.45, 7.5], tierH: .45, seatH: .45 };
export async function curia(k, o = {}) {
  const { scene } = k; const M = await mats(); const g = new THREE.Group(); scene.add(g);
  const W = 18, L = 30, H = 15;
  await real.env(k, o.hdri ?? 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? [40, 34, -6], sunI: o.sunI ?? 5.2, sunColor: o.sunColor ?? 0xffe2b0, shadowSize: 22, envI: o.envI ?? .16, bg: 0x0a0806, exposure: o.exposure ?? 1.0, target: [0, 0, 0] });
  scene.userData.fx = { ao: 1.4, aoRadius: .8, bloom: .35, bloomThreshold: .85 };
  g.add(real.m(new THREE.PlaneGeometry(W, L), M.floor, { rot: [-P / 2, 0, 0], cast: false }));
  // walls: left/back/front solid; right (+x) wall with three tall window openings
  const wallMat = M.plaster;
  g.add(real.box(.8, H, L, wallMat, { pos: [-W / 2 - .4, H / 2, 0] }));
  g.add(real.box(W, H, .8, wallMat, { pos: [0, H / 2, -L / 2 - .4] }));
  // front wall with the door opening (4 m wide, 7 m tall)
  for (const s of [-1, 1]) g.add(real.box(W / 2 - 2, H, .8, wallMat, { pos: [s * (W / 4 + 1), H / 2, L / 2 + .4] }));
  g.add(real.box(4, H - 7, .8, wallMat, { pos: [0, 7 + (H - 7) / 2, L / 2 + .4] }));
  const winZ = [-9, -1, 7], winY = [8.5, 13];
  g.add(real.box(.8, winY[0], L, wallMat, { pos: [W / 2 + .4, winY[0] / 2, 0] }));
  g.add(real.box(.8, H - winY[1], L, wallMat, { pos: [W / 2 + .4, (H + winY[1]) / 2, 0] }));
  let z0 = -L / 2;
  for (const wz of winZ) { const a = wz - 1.4; if (a > z0) g.add(real.box(.8, winY[1] - winY[0], a - z0, wallMat, { pos: [W / 2 + .4, (winY[0] + winY[1]) / 2, (a + z0) / 2] })); z0 = wz + 1.4; }
  g.add(real.box(.8, winY[1] - winY[0], L / 2 - z0, wallMat, { pos: [W / 2 + .4, (winY[0] + winY[1]) / 2, (L / 2 + z0) / 2] }));
  // coffered ceiling (dark wood beams)
  g.add(real.box(W + 2, .4, L + 2, M.wood, { pos: [0, H + .2, 0] }));
  for (let z = -L / 2 + 1.5; z < L / 2; z += 3) g.add(real.box(W, .5, .35, M.wood, { pos: [0, H - .25, z] }));
  // marble wainscot and pilasters
  for (const s of [-1, 1]) g.add(real.box(.12, 1.2, L, M.marbleDark, { pos: [s * (W / 2 - .06), .6, 0] }));
  for (let z = -L / 2 + 3; z < L / 2 - 1; z += 4) for (const s of [-1, 1]) g.add(real.box(.5, H - .5, .9, M.marble, { pos: [s * (W / 2 - .25), (H - .5) / 2, z] }));
  // two rows of columns inside the benches
  for (let z = -11; z <= 11; z += 4.4) for (const s of [-1, 1]) g.add(column(M, H - .5, .42, { pos: [s * 4.6, 0, z], solid: true }));
  for (const s of [-1, 1]) { const b = beam(M, 24); b.position.set(s * 4.6, H - 2, 0); b.rotation.y = P / 2; b.scale.y = .9; g.add(b); }
  // tiered benches on both sides (stone steps with wooden seats)
  const seats = [];
  for (const s of [-1, 1]) for (let i = 0; i < 3; i++) {
    const x = s * (CURIA.tiers[i] + .5); const h = CURIA.tierH * (i + 1);
    g.add(real.box(1.05, h, 22, M.stone, { pos: [x, h / 2, -.5] }));
    g.add(real.box(.55, .08, 22, M.wood, { pos: [x + s * .18, h + .04, -.5] }));
    for (let z = -10.5; z <= 9.5; z += .95) seats.push({ x: x + s * .12, z, y: h, side: s, tier: i, rot: s > 0 ? -P / 2 : P / 2 });
  }
  // dais, golden chair, statue of Pompey
  g.add(real.box(5, .45, 3.2, M.marbleDark, { pos: [0, .225, -10.8] }));
  g.add(real.box(5.4, .2, 3.6, M.marble, { pos: [0, .1, -10.8] }));
  const chair = sella(M); chair.position.set(...CURIA.chair); g.add(chair);
  let statue = null;
  if (o.statue !== false) { statue = await pompeyStatue(k, { pos: CURIA.statue }); }
  // bronze doors (two leaves, animatable via doors.set(u))
  const doors = doorPair(M, 4, 7); doors.group.position.set(0, 0, L / 2); g.add(doors.group);
  // sun shafts through the windows (soft additive beams)
  if (o.shafts !== false) for (const wz of winZ) g.add(shaft([W / 2, (winY[0] + winY[1]) / 2, wz], o.sun ?? [40, 34, -6], 2.6, 4.2, 26, o.shaftI ?? .12));
  // warm bounce so faces in shadow still read
  real.lamp(scene, [0, 6, -6], { i: o.fill ?? 160, dist: 26, color: 0xffd9a8 });
  real.lamp(scene, [0, 6, 8], { i: (o.fill ?? 14) * .7, dist: 26, color: 0xffd9a8 });
  return { group: g, M, seats, chair, statue, doors, W, L, H };
}
// a soft volumetric light shaft from a window, along the sun direction
export function shaft(from, sun, w, h, len, op = .07) {
  const dir = new THREE.Vector3(...sun).normalize().negate();
  const geo = new THREE.BoxGeometry(w, h, len); geo.translate(0, 0, len / 2);
  const mat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { op: { value: op }, len: { value: len }, wh: { value: new THREE.Vector2(w, h) } },
    vertexShader: 'varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'uniform float op; uniform float len; uniform vec2 wh; varying vec3 vP; void main(){ float f=1.-vP.z/len; float e=smoothstep(0.,.35,f); float sx=1.-smoothstep(.15,.5,abs(vP.x)/wh.x); float sy=1.-smoothstep(.15,.5,abs(vP.y)/wh.y); gl_FragColor=vec4(vec3(1.,.86,.62)*op*f*e*sx*sy,1.); }' });
  const m = new THREE.Mesh(geo, mat); m.position.set(...from); m.lookAt(m.position.clone().add(dir)); m.castShadow = m.receiveShadow = false; m.userData.noOverlap = true;
  return m;
}
export function doorPair(M, w, h) {
  const group = new THREE.Group(); const leaves = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group(); pivot.position.set(s * w / 2, 0, 0);
    const leaf = real.box(w / 2, h, .18, M.bronze, { pos: [-s * w / 4, h / 2, 0] }); pivot.add(leaf);
    for (let y = 1; y < h - .5; y += 1.6) for (const x of [.3, .7]) pivot.add(real.m(new THREE.SphereGeometry(.07, 10, 8), M.gold, { pos: [-s * w / 2 * x, y, .11] }));
    group.add(pivot); leaves.push([pivot, s]);
  }
  // open: 0 closed .. 1 fully open (inwards)
  const set = u => leaves.forEach(([p, s]) => { p.rotation.y = s * u * 1.4; });
  set(0); return { group, set };
}
// curule chair (sella curulis): gilded X legs, purple cushion
export function sella(M) {
  const g = new THREE.Group();
  for (const z of [-.24, .24]) for (const s of [-1, 1]) {
    const leg = real.m(new THREE.TorusGeometry(.42, .035, 10, 40, P * .62), M.gold, { pos: [0, .02, z], rot: [0, 0, s > 0 ? P * .19 : P * .81] });
    leg.position.y = s > 0 ? .02 : .02; g.add(leg);
  }
  g.add(real.rbox(.7, .1, .6, .03, M.gold, { pos: [0, .5, 0] }));
  g.add(real.rbox(.66, .1, .56, .04, M.purple, { pos: [0, .59, 0] }));
  for (const z of [-.24, .24]) g.add(real.m(new THREE.CylinderGeometry(.03, .03, .6, 12), M.gold, { pos: [0, .46, z], rot: [0, 0, P / 2] }));
  g.traverse(c => { if (c.isMesh) c.userData.solid = false; });
  return g;
}

// ---------- statues ----------
// any cast member turned into a marble (or bronze) statue on a plinth, frozen in a pose
export async function statueOf(k, id, o = {}) {
  const M = await mats();
  const p = await real.human({ id, seed: o.seed ?? 9 });
  const mat = (o.bronze ? M.bronze : M.marble).clone(); if (!o.bronze) { mat.color.set(o.color ?? 0xece6dc); mat.roughness = .38; }
  p.traverse(c => { if (c.isMesh) { const m2 = mat.clone(); if (c.material.alphaTest || c.material.transparent) { m2.alphaTest = .5; m2.alphaMap = c.material.map; } c.material = m2; } });
  const s = o.scale ?? 1.25; p.scale.setScalar(s);
  const g = new THREE.Group(); g.add(p);
  const ph = o.plinth ?? 1.7;
  g.add(real.box(1.5, ph, 1.5, M.marbleDark, { pos: [0, ph / 2, 0] }));
  g.add(real.box(1.75, .18, 1.75, M.marble, { pos: [0, ph + .09, 0] }));
  g.add(real.box(1.75, .18, 1.75, M.marble, { pos: [0, .09, 0] }));
  p.position.y = ph + .18; p.userData.auto = false; p.userData.statue = true; p.userData.person = false;
  p.update(0, { pose: 'idle', arm: o.arm ?? 'point', mood: 'stern', look: 0 });
  if (o.pos) g.position.set(...o.pos); if (o.rot !== undefined) g.rotation.y = o.rot;
  k.scene.add(g); g.userData.figure = p;
  return g;
}
export const pompeyStatue = (k, o = {}) => statueOf(k, 'cae_pompey', { arm: 'raise', ...o });

// ---------- small props ----------
// laurel wreath on a person's head
export function laurel(p, o = {}) {
  const head = p.parts.bones.Head; if (!head) return null;
  const g = new THREE.Group(); const mat = new THREE.MeshStandardMaterial({ color: o.gold ? 0xc9a03a : 0x3a4a22, roughness: o.gold ? .3 : .5, metalness: o.gold ? .9 : 0 });
  const leaf = new THREE.SphereGeometry(.018, 8, 6); leaf.scale(1, .35, 2.2);
  const geos = [];
  for (const s of [-1, 1]) for (let i = 0; i < 11; i++) {
    const a = s * (.25 + i * .24);
    const m = new THREE.Matrix4().makeRotationY(a).multiply(new THREE.Matrix4().makeTranslation(0, 0, .098)).multiply(new THREE.Matrix4().makeRotationX(-.5 + (i % 2) * .5)).multiply(new THREE.Matrix4().makeRotationY(s * .9));
    geos.push(leaf.clone().applyMatrix4(m));
  }
  const mesh = new THREE.Mesh(mergeGeometries(geos), mat); mesh.castShadow = true; g.add(mesh);
  const s = 1 / p.parts.obj.scale.x; g.scale.setScalar(s * (o.size ?? 1)); g.position.set(0, (o.up ?? .115) * s, (o.fwd ?? -.005) * s); g.rotation.x = o.tilt ?? .18;
  head.add(g); return g;
}
export function scroll(o = {}) {
  const g = new THREE.Group(); const paper = new THREE.MeshStandardMaterial({ color: 0xe9dcbc, roughness: .9 });
  g.add(real.m(new THREE.CylinderGeometry(.03, .03, o.w ?? .26, 20), paper, { rot: [0, 0, P / 2] }));
  for (const s of [-1, 1]) g.add(real.m(new THREE.CylinderGeometry(.012, .012, .03, 10), real.std(0x5a3a22, { rough: .6 }), { pos: [s * ((o.w ?? .26) / 2 + .015), 0, 0], rot: [0, 0, P / 2] }));
  if (o.seal) g.add(real.m(new THREE.CylinderGeometry(.014, .014, .006, 16), real.std(0x8a1a12, { rough: .5 }), { pos: [0, 0, .032], rot: [P / 2, 0, 0] }));
  return g;
}
// open scroll with writing (canvas), for close-ups
export function openScroll(lines, o = {}) {
  const t = real.canvasTex(1024, 512, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, '#cdb88c'); gr.addColorStop(.1, '#ead9b4'); gr.addColorStop(.9, '#ead9b4'); gr.addColorStop(1, '#cdb88c');
    c.fillStyle = gr; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(80,50,20,.08)'; for (let i = 0; i < 400; i++) c.fillRect(Math.random() * w, Math.random() * h, 3, 1);
    c.fillStyle = o.ink ?? '#2a1a10'; c.textAlign = 'center'; c.font = `${o.font ?? 'bold 78px "Liberation Serif"'}`;
    lines.forEach((l, i) => c.fillText(l, w / 2, h / 2 - (lines.length - 1) * 50 + i * 100 + 26));
  });
  const g = new THREE.Group(); const mat = new THREE.MeshStandardMaterial({ map: t, roughness: .85, side: THREE.DoubleSide });
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(1, .5, 20, 1), mat); sheet.receiveShadow = true; g.add(sheet);
  for (const s of [-1, 1]) g.add(real.m(new THREE.CylinderGeometry(.04, .04, .56, 16), new THREE.MeshStandardMaterial({ color: 0xd8c49a, roughness: .8 }), { pos: [s * .52, 0, .02] }));
  return g;
}
// wax tablet (two wooden leaves), optional text scratched in
export function waxTablet(text, o = {}) {
  const g = new THREE.Group(); const wood = real.std(0x6a4426, { rough: .7 });
  const t = real.canvasTex(512, 384, (c, w, h) => { c.fillStyle = '#2b2116'; c.fillRect(0, 0, w, h); c.fillStyle = '#c9a66a'; c.font = 'bold 64px "Liberation Serif"'; c.textAlign = 'center'; (text || '').split('\n').forEach((l, i, a) => c.fillText(l, w / 2, h / 2 + 22 - (a.length - 1) * 36 + i * 72)); });
  g.add(real.box(.32, .02, .24, wood, { pos: [0, .01, 0] }));
  g.add(real.m(new THREE.PlaneGeometry(.28, .2), new THREE.MeshStandardMaterial({ map: t, roughness: .35 }), { pos: [0, .021, 0], rot: [-P / 2, 0, 0], cast: false }));
  if (o.both) g.add(real.m(new THREE.PlaneGeometry(.28, .2), new THREE.MeshStandardMaterial({ map: t, roughness: .35 }), { pos: [0, -.001, 0], rot: [P / 2, 0, o.rotZ ?? 0], cast: false }));
  if (o.open) g.add(real.box(.32, .02, .24, wood, { pos: [0, .01, -.25] }));
  return g;
}
export function stylus() { const g = new THREE.Group(); g.add(real.m(new THREE.CylinderGeometry(.004, .002, .14, 8), real.std(0x8a7a5a, { metal: .7, rough: .4 }), { rot: [0, 0, P / 2] })); return g; }
// dagger only ever as a sheathed dark shape
export function daggerShape() { const g = new THREE.Group(); const m = real.std(0x1a1410, { rough: .5 }); g.add(real.box(.035, .22, .015, m)); g.add(real.box(.08, .015, .02, m, { pos: [0, .11, 0] })); g.add(real.box(.025, .09, .025, m, { pos: [0, .16, 0] })); return g; }
export function tabletBox(M, o = {}) {
  const g = new THREE.Group(); g.add(real.box(.55, .28, .38, M.wood, { pos: [0, .14, 0] }));
  const lid = new THREE.Group(); lid.position.set(0, .28, -.19); lid.add(real.box(.57, .04, .4, M.wood, { pos: [0, .02, .2] })); g.add(lid); g.userData.lid = lid;
  for (const x of [-.22, .22]) g.add(real.box(.04, .3, .4, M.bronze, { pos: [x, .15, 0] }));
  return g;
}
// Roman terracotta oil lamp with a live flame (point light)
export function oilLamp(scene, pos, o = {}) {
  const g = new THREE.Group(); const tc = real.std(0xa8583a, { rough: .8 });
  const body = real.m(new THREE.SphereGeometry(.06, 16, 10), tc); body.scale.set(1, .45, 1.3); g.add(body);
  g.add(real.m(new THREE.CylinderGeometry(.018, .022, .05, 10), tc, { pos: [0, 0, .08], rot: [P / 2, 0, 0] }));
  const fl = new THREE.Mesh(new THREE.SphereGeometry(.014, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffc070 })); fl.scale.set(1, 2.2, 1); fl.position.set(0, .03, .1); g.add(fl);
  g.position.set(...pos); scene.add(g);
  const l = real.lamp(scene, [pos[0], pos[1] + .15, pos[2] + .1], { i: (o.i ?? 2.2) * 8, dist: o.dist ?? 6, color: 0xffb060, shadow: !!o.shadow });
  const base = l.intensity; const ph = Math.random() * 9;
  g.userData.flicker = t => { const f = 1 + Math.sin(t * 13 + ph) * .06 + Math.sin(t * 29 + ph * 2) * .04; l.intensity = base * f; fl.scale.y = 2.2 * f; };
  return g;
}
// standing bronze brazier with fire
export function brazier(scene, pos, o = {}) {
  const M = MC.get('m'); const g = new THREE.Group();
  for (let i = 0; i < 3; i++) { const a = i / 3 * P * 2; g.add(real.m(new THREE.CylinderGeometry(.02, .02, 1.1, 8), M.bronze, { pos: [Math.sin(a) * .18, .55, Math.cos(a) * .18], rot: [Math.cos(a) * .2, 0, -Math.sin(a) * .2] })); }
  g.add(real.m(new THREE.CylinderGeometry(.32, .16, .18, 24), M.bronze, { pos: [0, 1.12, 0] }));
  const fl = new THREE.Mesh(new THREE.ConeGeometry(.2, .45, 12), new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: .85 })); fl.position.y = 1.4; g.add(fl);
  g.position.set(...pos); scene.add(g);
  const l = real.lamp(scene, [pos[0], pos[1] + 1.6, pos[2]], { i: (o.i ?? 10) * 6, dist: o.dist ?? 10, color: 0xff9a40, shadow: o.shadow ?? true });
  const base = l.intensity, ph = Math.random() * 9;
  g.userData.flicker = t => { const f = 1 + Math.sin(t * 11 + ph) * .08 + Math.sin(t * 23 + ph) * .05; l.intensity = base * f; fl.scale.set(1, f, 1); };
  return g;
}
export const flickerAll = (scene, t) => scene.traverse(o => o.userData.flicker && o.userData.flicker(t));

// ---------- exteriors ----------
// the Forum: cobbled square, temples, colonnades, town in the distance
export async function forum(k, o = {}) {
  const { scene } = k; const M = await mats(); const g = new THREE.Group(); scene.add(g);
  await real.env(k, o.hdri ?? 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? [-30, 26, 18], sunI: o.sunI ?? 4.6, sunColor: o.sunColor ?? 0xffe2b8, shadowSize: 40, envI: o.envI ?? .7, fog: [o.fog ?? 0xd8cbb4, 60, 260], exposure: o.exposure });
  scene.userData.fx = { ao: 1.2, aoRadius: .7, bloom: .25 };
  const ground = real.m(new THREE.PlaneGeometry(200, 200), M.cobble, { rot: [-P / 2, 0, 0], cast: false });
  M.cobble.map && M.cobble.map.repeat.set(60, 60); M.cobble.normalMap && M.cobble.normalMap.repeat.set(60, 60); if (M.cobble.roughnessMap) M.cobble.roughnessMap.repeat.set(60, 60);
  g.add(ground);
  g.add(temple(M, { pos: [0, 0, -28], cols: 6 }));
  g.add(temple(M, { pos: [-30, 0, -6], rot: P / 2, cols: 6, h: 10 }));
  g.add(temple(M, { pos: [30, 0, -10], rot: -P / 2, cols: 4, h: 9 }));
  // colonnades along the sides
  for (const s of [-1, 1]) {
    for (let z = -16; z <= 24; z += 3.6) g.add(column(M, 7, .4, { pos: [s * 18, 0, z] }));
    const b = beam(M, 42); b.position.set(s * 18, 7, 4); b.rotation.y = P / 2; g.add(b);
    g.add(real.box(6, 8.4, 42, M.ochre, { pos: [s * 22, 4.2, 4] }));
  }
  // honorary column + statues on plinths
  g.add(column(M, 12, .55, { pos: [-8, 0, -12] }));
  const r = rng(7);
  for (let i = 0; i < 26; i++) { const a = r() * P * 2, d = 70 + r() * 60; g.add(blockHouse(M, 8 + r() * 10, 8 + r() * 14, 8 + r() * 8, { pos: [Math.sin(a) * d, 0, Math.cos(a) * d - 20], rot: r() * P, r: r() < .5 })); }
  return { group: g, M };
}
// porticus courtyard outside the Curia (colonnade, plane trees, steps up to the Curia door)
export async function courtyard(k, o = {}) {
  const { scene } = k; const M = await mats(); const g = new THREE.Group(); scene.add(g);
  await real.env(k, o.hdri ?? 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? [-25, 22, 30], sunI: o.sunI ?? 4.4, sunColor: o.sunColor ?? 0xffdcae, shadowSize: 36, envI: o.envI ?? .6, fog: [0xd8cbb4, 50, 200], exposure: o.exposure });
  scene.userData.fx = { ao: 1.2, aoRadius: .7, bloom: .25 };
  g.add(real.m(new THREE.PlaneGeometry(140, 140), await real.pbr('stone_tiles_02', { repeat: [40, 40], color: 0xe8dcc8 }), { rot: [-P / 2, 0, 0], cast: false }));
  // Curia front: steps (z -20 .. -16), wall with the door at z=-22
  for (let i = 0; i < 8; i++) g.add(real.box(16, .2, .45, M.marble, { pos: [0, .1 + i * .2, -16 - i * .45 - .225] }));
  g.add(real.box(18, 1.6, 6, M.stone, { pos: [0, .8, -22.6] }));
  // front wall with the door opening (4.4 m wide, 7.4 m tall, sill at 1.6)
  for (const s of [-1, 1]) g.add(real.box(8.8, 14, 1, M.plaster, { pos: [s * 6.6, 8.6, -25.4] }));
  g.add(real.box(4.4, 14 - 9 + 1.6, 1, M.plaster, { pos: [0, 9 + (15.6 - 9) / 2, -25.4] }));
  for (let i = 0; i < 6; i++) g.add(column(M, 10, .5, { pos: [-7.5 + i * 3, 1.6, -20.6] }));
  const bm = beam(M, 18); bm.position.set(0, 11.6, -20.6); g.add(bm);
  const doors = doorPair(M, 4, 7); doors.group.position.set(0, 1.6, -24.85); g.add(doors.group);
  if (o.interior !== true) g.add(real.box(4.4, 7.4, .2, real.std(0x050403, { rough: 1 }), { pos: [0, 1.6 + 3.7, -26.1] }));
  // colonnade around the courtyard
  for (const s of [-1, 1]) {
    for (let z = -14; z <= 22; z += 3.6) g.add(column(M, 6, .36, { pos: [s * 12, 0, z], solid: true }));
    const b = beam(M, 38); b.position.set(s * 12, 6, 4); b.rotation.y = P / 2; g.add(b);
    g.add(real.box(5, 7.5, 38, M.ochre, { pos: [s * 16, 3.75, 4] }));
  }
  // plane trees in rows + hedges
  const trees = [];
  if (o.trees !== false) for (const s of [-1, 1]) for (let z = -8; z <= 18; z += 8.5) { try { const t = await real.prop('island_tree_01', { scale: 1.6 }); t.position.set(s * 6.5, 0, z); t.rotation.y = z; g.add(t); trees.push(t); } catch (e) {} }
  return { group: g, M, doors };
}

// ---------- domestic interiors (Caesar's house) ----------
// room: 'bed' | 'dining' | 'atrium' | 'study'; size 9 x 9, 4.6 m high, Pompeian red walls with painted panels
export async function domus(k, o = {}) {
  const { scene } = k; const M = await mats(); const g = new THREE.Group(); scene.add(g);
  const night = !!o.night;
  await real.env(k, night ? 'dikhololo_night' : 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? (night ? [-20, 30, -10] : [-20, 14, 12]), sunI: o.sunI ?? (night ? 1.2 : 3.6), sunColor: night ? 0x8aa0d8 : 0xffd8a8, shadowSize: 10, envI: o.envI ?? (night ? .08 : .25), bg: 0x050404, exposure: o.exposure ?? 1 });
  scene.userData.fx = { ao: 1.4, aoRadius: .6, bloom: .4, bloomThreshold: .8 };
  const W = o.w ?? 9, D = o.d ?? 9, H = 4.6;
  g.add(real.m(new THREE.PlaneGeometry(W, D), await real.pbr('floor_tiles_06', { repeat: [4, 4], color: 0xd8c8b0 }), { rot: [-P / 2, 0, 0], cast: false }));
  // walls: dark dado, red panels, ochre frieze
  const walls = [[0, -D / 2, 0, W], [-W / 2, 0, P / 2, D], [W / 2, 0, -P / 2, D]];
  for (const [x, z, ry, len] of walls) {
    const w = new THREE.Group(); w.position.set(x, 0, z); w.rotation.y = ry; g.add(w);
    if (ry === -P / 2 && o.window !== false) {
      // window wall (shutters): opening 1.6 x 2 at y 1.4..3.4
      w.add(real.box((len - 1.6) / 2, H, .3, M.red, { pos: [-(len + 1.6) / 4, H / 2, -.15] }));
      w.add(real.box((len - 1.6) / 2, H, .3, M.red, { pos: [(len + 1.6) / 4, H / 2, -.15] }));
      w.add(real.box(1.6, 1.4, .3, M.red, { pos: [0, .7, -.15] })); w.add(real.box(1.6, H - 3.4, .3, M.red, { pos: [0, 3.4 + (H - 3.4) / 2, -.15] }));
      const sh = []; for (const s of [-1, 1]) { const pv = new THREE.Group(); pv.position.set(s * .8, 1.4, .02); pv.add(real.box(.8, 2, .05, M.wood, { pos: [-s * .4, 1, 0] })); w.add(pv); sh.push([pv, s]); }
      g.userData.shutters = u => sh.forEach(([pv, s]) => pv.rotation.y = -s * u * 1.9);
      g.userData.shutters(o.shutters ?? 0);
    } else w.add(real.box(len, H, .3, M.red, { pos: [0, H / 2, -.15] }));
    w.add(real.box(len, 1, .02, real.std(0x1a1210, { rough: .7 }), { pos: [0, .5, .01], cast: false }));
    w.add(real.box(len, .5, .02, M.ochre, { pos: [0, H - .5, .01], cast: false }));
    for (let x2 = -len / 2 + 1.2; x2 < len / 2 - .6; x2 += 2.2) w.add(real.box(.06, 2.4, .02, M.ochre, { pos: [x2, 2.3, .012], cast: false }));
  }
  g.add(real.box(W, .3, D, M.wood, { pos: [0, H + .15, 0] }));
  const lamps = [];
  if (o.room === 'bed') {
    const bed = new THREE.Group(); bed.add(real.box(2.2, .5, 1.2, M.wood, { pos: [0, .25, 0] })); bed.add(real.rbox(2.1, .22, 1.1, .08, M.cloth, { pos: [0, .6, 0] }));
    bed.add(real.rbox(.5, .16, .9, .06, real.std(0x6a2a3a, { rough: .9 }), { pos: [-.8, .78, 0] }));
    for (const x of [-1.05, 1.05]) for (const z of [-.55, .55]) bed.add(real.m(new THREE.CylinderGeometry(.04, .05, .7, 12), M.bronze, { pos: [x, .35, z] }));
    bed.position.set(-1.4, 0, -2.6); g.add(bed); g.userData.bed = bed;
    // hanging curtain by the window (moves in the wind)
    const cg = new THREE.PlaneGeometry(1.3, 2.6, 12, 16); const cur = new THREE.Mesh(cg, new THREE.MeshStandardMaterial({ color: 0xd9c8a8, roughness: .9, side: THREE.DoubleSide, transparent: true, opacity: .92 }));
    cur.position.set(W / 2 - .35, 2.4, 1.6); cur.rotation.y = -P / 2; cur.castShadow = true; g.add(cur);
    const base = cg.attributes.position.array.slice();
    g.userData.wind = (t, s) => { const a = cg.attributes.position; for (let i = 0; i < a.count; i++) { const x = base[i * 3], y = base[i * 3 + 1]; const f = (1.3 - y) / 2.6; a.setZ(i, s * f * (.6 + Math.sin(t * 6 + x * 4 + y * 2) * .25)); } a.needsUpdate = true; cg.computeVertexNormals(); };
    lamps.push(oilLamp(scene, [1.6, 1.04, -3.6], { i: 6, dist: 9, shadow: true })); lamps.push(oilLamp(scene, [-3.6, 1.04, 1.5], { i: 4, dist: 8 })); g.add(real.box(.5, 1, .5, M.marble, { pos: [-3.6, .5, 1.5] })); g.add(real.box(.5, 1, .5, M.marble, { pos: [1.6, .5, -3.6] }));
  }
  if (o.room === 'dining') {
    // triclinium: three couches round a low table
    const couch = (x, z, ry) => { const c = new THREE.Group(); c.add(real.box(2.4, .55, 1.1, M.wood, { pos: [0, .275, 0] })); c.add(real.rbox(2.3, .18, 1.0, .07, real.std(0x7a2a2a, { rough: .9 }), { pos: [0, .64, 0] })); c.position.set(x, 0, z); c.rotation.y = ry; g.add(c); return c; };
    couch(0, -2.4, 0); couch(-2.4, 0, P / 2); couch(2.4, 0, -P / 2);
    g.add(real.m(new THREE.CylinderGeometry(.75, .75, .06, 40), M.marble, { pos: [0, .62, 0] })); g.add(real.m(new THREE.CylinderGeometry(.08, .14, .6, 16), M.bronze, { pos: [0, .3, 0] }));
    try { const gb = await real.prop('brass_goblets'); gb.position.set(.2, .65, .1); g.add(gb); const bowl = await real.prop('wooden_bowl_01'); bowl.position.set(-.25, .65, -.15); g.add(bowl); } catch (e) {}
    for (const [x, z] of [[-.4, .3], [.45, -.3], [0, .55]]) lamps.push(oilLamp(scene, [x, .67, z], { i: 2.0 }));
    for (const [x, z] of [[-3.6, -3.6], [3.6, -3.6]]) { brazier(scene, [x, 0, z], { i: 6 }); }
  }
  if (o.room === 'study' || o.room === 'meeting') {
    g.add(real.box(2.4, .08, 1.3, M.wood, { pos: [0, .9, 0] })); for (const x of [-1.05, 1.05]) for (const z of [-.5, .5]) g.add(real.box(.08, .9, .08, M.wood, { pos: [x, .45, z] }));
    for (const [x, z] of [[-.6, .2], [.7, -.2]]) lamps.push(oilLamp(scene, [x, .95, z], { i: 2.6, shadow: true }));
  }
  return { group: g, M, lamps, W, D, H };
}

// ---------- maps: painted map on a table, lit by lamps ----------
let MED = null;
async function med() { if (!MED) MED = await (await fetch(new URL('../data/med.json', import.meta.url))).json(); return MED; }
export const PLACES = {
  ROME: [12.5, 41.9], RAVENNA: [12.2, 44.4], RUBICON: [12.4, 44.07], 'PHARSALUS': [22.4, 39.3], ALEXANDRIA: [29.9, 31.2], PELUSIUM: [32.5, 31.0],
  MUNDA: [-4.9, 37.4], PHILIPPI: [24.3, 41.0], DACIA: [24.5, 45.8], PARTHIA: [47.5, 34.0], GAUL: [2.5, 46.8], ALESIA: [4.5, 47.5], BRUNDISIUM: [17.9, 40.6],
};
// map(k, {center:[lon,lat], span:[w,h] degrees, size: metres wide, regions:[{name, poly:[[lon,lat]...], color, fill:0..1}], labels:[[text, lon, lat, size]]})
export async function paperMap(o = {}) {
  const d = await med();
  const [lon0, lat0] = o.center ?? [14, 40], span = o.span ?? [40, 24];
  const cosl = Math.cos(lat0 * P / 180); const Wm = o.size ?? 4, Hm = Wm * span[1] / (span[0] * cosl);
  const cw = 3072, ch = Math.round(cw * Hm / Wm);
  const px = (lon, lat) => [((lon - lon0) / span[0] + .5) * cw, (.5 - (lat - lat0) / span[1]) * ch];
  const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d');
  // aged paper sea
  x.fillStyle = '#b8b29a'; x.fillRect(0, 0, cw, ch);
  const r = rng(5);
  for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${60 + r() * 40},${50 + r() * 30},${30},${r() * .05})`; x.fillRect(r() * cw, r() * ch, 2 + r() * 30, 1 + r() * 3); }
  // land
  const path = poly => { x.beginPath(); poly.forEach(([lo, la], i) => { const [X, Y] = px(lo, la); i ? x.lineTo(X, Y) : x.moveTo(X, Y); }); x.closePath(); };
  // land mask, then the coastline from a dilated mask (no modern borders)
  const mk = document.createElement('canvas'); mk.width = cw; mk.height = ch; const mx = mk.getContext('2d');
  mx.fillStyle = '#000'; mx.strokeStyle = '#000'; mx.lineWidth = 2; for (const p of d.land) { mx.beginPath(); p.forEach(([lo, la], i) => { const [X, Y] = px(lo, la); i ? mx.lineTo(X, Y) : mx.moveTo(X, Y); }); mx.closePath(); mx.fill(); mx.stroke(); }
  const tint = (col) => { const t = document.createElement('canvas'); t.width = cw; t.height = ch; const tx = t.getContext('2d'); tx.drawImage(mk, 0, 0); tx.globalCompositeOperation = 'source-in'; tx.fillStyle = col; tx.fillRect(0, 0, cw, ch); return t; };
  const halo = tint('rgba(90,80,60,.10)'); for (const rr of [22, 14]) for (let a = 0; a < 16; a++) x.drawImage(halo, Math.cos(a / 16 * P * 2) * rr, Math.sin(a / 16 * P * 2) * rr);
  const ink = tint('#4a3420'); for (let a = 0; a < 12; a++) x.drawImage(ink, Math.cos(a / 12 * P * 2) * 3.2, Math.sin(a / 12 * P * 2) * 3.2);
  x.drawImage(tint('#e4d6b0'), 0, 0);
  // relief texture on land
  for (let i = 0; i < 6000; i++) { x.fillStyle = `rgba(110,85,50,${r() * .06})`; x.beginPath(); x.arc(r() * cw, r() * ch, 2 + r() * 6, 0, 7); x.fill(); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  // overlay canvas for animated regions/labels drawn each frame
  const oc = document.createElement('canvas'); oc.width = cw; oc.height = ch; const ox = oc.getContext('2d');
  const otex = new THREE.CanvasTexture(oc); otex.colorSpace = THREE.SRGBColorSpace; otex.anisotropy = 8;
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.PlaneGeometry(Wm, Hm, 64, 32), new THREE.MeshStandardMaterial({ map: tex, roughness: .92 }));
  // paper curls a little at the edges
  const pa = base.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { const X = pa.getX(i) / (Wm / 2), Y = pa.getY(i) / (Hm / 2); pa.setZ(i, (Math.pow(Math.abs(X), 8) + Math.pow(Math.abs(Y), 8)) * .03); } base.geometry.computeVertexNormals();
  base.rotation.x = -P / 2; base.receiveShadow = true; g.add(base);
  const top = new THREE.Mesh(base.geometry, new THREE.MeshStandardMaterial({ map: otex, transparent: true, roughness: .85, polygonOffset: true, polygonOffsetFactor: -2 }));
  top.rotation.x = -P / 2; top.position.y = .002; top.receiveShadow = true; g.add(top);
  const to3 = (lon, lat, y = 0) => { const [X, Y] = px(lon, lat); return new THREE.Vector3((X / cw - .5) * Wm, y, (Y / ch - .5) * Hm); };
  const api = {
    group: g, to3, Wm, Hm, ctx: ox, px,
    clear() { ox.clearRect(0, 0, cw, ch); },
    region(poly, color, a = 1, outline = true) { if (a <= 0) return; if (!api._rc) { api._rc = document.createElement('canvas'); api._rc.width = cw; api._rc.height = ch; } const rc = api._rc, rx = rc.getContext('2d'); rx.clearRect(0, 0, cw, ch); rx.save(); rx.globalAlpha = a * .62; rx.fillStyle = color; rx.beginPath(); poly.forEach(([lo, la], i) => { const [X, Y] = px(lo, la); i ? rx.lineTo(X, Y) : rx.moveTo(X, Y); }); rx.closePath(); rx.fill(); if (outline) { rx.globalAlpha = a; rx.setLineDash([14, 10]); rx.strokeStyle = color; rx.lineWidth = 6; rx.stroke(); } rx.restore(); rx.globalCompositeOperation = 'destination-in'; rx.drawImage(mk, 0, 0); rx.globalCompositeOperation = 'source-over'; ox.drawImage(rc, 0, 0); },
    _regionOld(poly, color, a = 1, outline = true) { if (a <= 0) return; ox.save(); ox.globalAlpha = a * .62; ox.fillStyle = color; ox.beginPath(); poly.forEach(([lo, la], i) => { const [X, Y] = px(lo, la); i ? ox.lineTo(X, Y) : ox.moveTo(X, Y); }); ox.closePath(); ox.fill(); if (outline) { ox.globalAlpha = a; ox.setLineDash([14, 10]); ox.strokeStyle = color; ox.lineWidth = 6; ox.stroke(); } ox.restore(); },
    label(text, lon, lat, size = 60, a = 1, o2 = {}) { if (a <= 0) return; const [X, Y] = px(lon, lat); ox.save(); ox.globalAlpha = a; ox.font = `${o2.italic ? 'italic ' : ''}${o2.weight ?? 600} ${size}px "Liberation Serif"`; ox.textAlign = 'center'; ox.textBaseline = 'middle'; ox.lineWidth = size * .12; ox.strokeStyle = 'rgba(236,224,196,.85)'; ox.strokeText(text, X, Y); ox.fillStyle = o2.color ?? '#3a2414'; ox.fillText(text, X, Y); ox.restore(); },
    dot(lon, lat, rr = 16, color = '#7a1a12', a = 1) { if (a <= 0) return; const [X, Y] = px(lon, lat); ox.save(); ox.globalAlpha = a; ox.fillStyle = color; ox.beginPath(); ox.arc(X, Y, rr, 0, 7); ox.fill(); ox.lineWidth = 4; ox.strokeStyle = '#2a1a10'; ox.stroke(); ox.restore(); },
    // inked route that draws on: u 0..1
    route(pts, u, color = '#7a1a12', w = 10, dash = false) { if (u <= 0) return; const P2 = pts.map(([lo, la]) => px(lo, la)); let L = 0; const seg = []; for (let i = 1; i < P2.length; i++) { const l = Math.hypot(P2[i][0] - P2[i - 1][0], P2[i][1] - P2[i - 1][1]); seg.push(l); L += l; }
      let left = L * Math.min(1, u); ox.save(); ox.strokeStyle = color; ox.lineWidth = w; ox.lineCap = 'round'; if (dash) ox.setLineDash([w * 2.4, w * 1.6]); ox.beginPath(); ox.moveTo(...P2[0]); let end = P2[0], dir = [1, 0];
      for (let i = 1; i < P2.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]); end = [P2[i - 1][0] + (P2[i][0] - P2[i - 1][0]) * f, P2[i - 1][1] + (P2[i][1] - P2[i - 1][1]) * f]; dir = [P2[i][0] - P2[i - 1][0], P2[i][1] - P2[i - 1][1]]; ox.lineTo(...end); left -= seg[i - 1]; }
      ox.stroke(); ox.setLineDash([]); const a = Math.atan2(dir[1], dir[0]); ox.fillStyle = color; ox.beginPath(); ox.moveTo(end[0] + Math.cos(a) * w * 3, end[1] + Math.sin(a) * w * 3); ox.lineTo(end[0] + Math.cos(a + 2.4) * w * 2.6, end[1] + Math.sin(a + 2.4) * w * 2.6); ox.lineTo(end[0] + Math.cos(a - 2.4) * w * 2.6, end[1] + Math.sin(a - 2.4) * w * 2.6); ox.fill(); ox.restore(); },
    cross(lon, lat, s = 40, a = 1, color = '#1a1210') { if (a <= 0) return; const [X, Y] = px(lon, lat); ox.save(); ox.globalAlpha = a; ox.strokeStyle = color; ox.lineWidth = s * .28; ox.lineCap = 'round'; ox.beginPath(); ox.moveTo(X - s, Y - s); ox.lineTo(X + s, Y + s); ox.moveTo(X + s, Y - s); ox.lineTo(X - s, Y + s); ox.stroke(); ox.restore(); },
    commit() { otex.needsUpdate = true; },
  };
  return api;
}
// war-room table under lamps with the map on it
export async function mapTable(k, o = {}) {
  const { scene } = k; const M = await mats();
  await real.env(k, 'brown_photostudio_02', { sun: o.sun ?? [3, 9, 4], sunI: o.sunI ?? 1.6, sunColor: 0xffd6a0, shadowSize: 5, envI: .05, bg: 0x060504, exposure: o.exposure ?? 1.0 });
  scene.userData.fx = { ao: 1.2, aoRadius: .4, bloom: .3, bloomThreshold: .85 };
  const map = await paperMap(o); scene.add(map.group); map.group.position.y = .905;
  const tw = map.Wm + .7, td = map.Hm + .7;
  scene.add(real.box(tw, .1, td, M.wood, { pos: [0, .85, 0] }));
  for (const x of [-tw / 2 + .2, tw / 2 - .2]) for (const z of [-td / 2 + .2, td / 2 - .2]) scene.add(real.box(.14, .8, .14, M.wood, { pos: [x, .4, z] }));
  scene.add(real.m(new THREE.PlaneGeometry(40, 40), await real.pbr('floor_tiles_06', { repeat: [10, 10], color: 0x6a5a48 }), { rot: [-P / 2, 0, 0], cast: false }));
  const lamps = [];
  for (const [x, z] of o.lamps ?? [[-map.Wm / 2 - .12, -map.Hm / 2 - .12], [map.Wm / 2 + .12, map.Hm / 2 + .12], [map.Wm / 2 + .12, -map.Hm / 2 - .12]]) lamps.push(oilLamp(scene, [x, .92, z], { i: 3.2, dist: 7, shadow: true }));
  return { map, lamps, M };
}
// legion token / figurine for the map (bronze eagle standard on a base)
export function legionToken(M, o = {}) {
  const g = new THREE.Group(); const mat = o.color ? real.std(o.color, { rough: .5, metal: .5 }) : M.bronze;
  g.add(real.m(new THREE.CylinderGeometry(.05, .06, .025, 20), mat, { pos: [0, .0125, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.005, .005, .2, 8), mat, { pos: [0, .11, 0] }));
  g.add(real.box(.06, .045, .006, real.std(o.flag ?? 0x8a1a12, { rough: .8 }), { pos: [.03, .17, 0] }));
  g.add(real.m(new THREE.SphereGeometry(.014, 10, 8), M.gold, { pos: [0, .215, 0] }));
  g.scale.setScalar(o.s ?? 1); return g;
}

// dramatic key light (spot) for a subject: key(scene, from, target, {i, color, angle, soft})
export function key(scene, from, target, o = {}) {
  const s = new THREE.SpotLight(o.color ?? 0xffe0b8, o.i ?? 120, o.dist ?? 0, o.angle ?? .35, o.soft ?? .6, 2);
  s.position.set(...from); s.target.position.set(...target); s.castShadow = o.shadow ?? true; s.shadow.mapSize.set(2048, 2048); s.shadow.bias = -.0004; s.shadow.radius = 5;
  scene.add(s, s.target); return s;
}
// gladiator helmet (bronze, broad brim, crest), held or worn
export function helmet(o = {}) {
  const M = MC.get('m'); const g = new THREE.Group();
  const dome = real.m(new THREE.SphereGeometry(.13, 24, 14, 0, P * 2, 0, P * .55), M.bronze); dome.scale.set(1, 1.1, 1.15); g.add(dome);
  g.add(real.m(new THREE.CylinderGeometry(.2, .21, .015, 32), M.bronze, { pos: [0, .005, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.11, .12, .16, 24, 1, true), real.std(0x3a2a1a, { metal: .8, rough: .4 }), { pos: [0, -.06, 0] }));
  const crest = real.box(.02, .07, .26, real.std(o.crest ?? 0x8a1a12, { rough: .9 }), { pos: [0, .16, 0] }); g.add(crest);
  return g;
}
// title emblem: golden laurel ring drawn on the overlay
export function laurelEmblem(x, cx, cy, s, a = 1) {
  if (a <= 0) return; x.save(); x.globalAlpha = a; x.translate(cx, cy); x.scale(s, s);
  x.strokeStyle = '#2b1e16'; x.fillStyle = '#d9a441'; x.lineWidth = 3;
  for (const sd of [-1, 1]) for (let i = 0; i < 9; i++) { const ang = P / 2 + sd * (.35 + i * .27); const r = 70; x.save(); x.translate(Math.cos(ang) * r, Math.sin(ang) * r); x.rotate(ang + sd * 1.1); x.beginPath(); x.ellipse(0, 0, 9, 20, 0, 0, 7); x.fill(); x.stroke(); x.restore(); }
  x.restore();
}

// ---------- army kit ----------
// legionary armour on a person: segmented cuirass bands, shoulder plates, helmet with cheek guards, curved shield, belt
export function legionary(p, o = {}) {
  const M = MC.get('m'); const B = p.parts.bones; const s = 1 / p.parts.obj.scale.x;
  const steel = new THREE.MeshStandardMaterial({ color: 0x8a8a86, metalness: .85, roughness: .35 });
  const leather = real.std(0x4a2e1a, { rough: .7 });
  const sp = B.Spine1 || B.Spine; const sp2 = B.Spine2 || sp;
  if (sp) {
    const torso = new THREE.Group();
    for (let i = 0; i < 4; i++) { const band = real.m(new THREE.CylinderGeometry(.165 - i * .004, .17 - i * .004, .055, 28, 1, true), steel, { pos: [0, -.06 + i * .06, .01] }); band.scale.set(1.12, 1, .82); band.material = steel.clone(); band.material.side = THREE.DoubleSide; torso.add(band); }
    torso.scale.setScalar(s); sp.add(torso);
  }
  for (const side of ['Left', 'Right']) { const sh = B[side + 'Arm']; if (!sh) continue; const pl = new THREE.Group(); for (let i = 0; i < 3; i++) { const c = real.m(new THREE.SphereGeometry(.085 - i * .008, 16, 8, 0, P * 2, 0, P * .5), steel, { pos: [0, .02 - i * .04, 0] }); c.material = steel; pl.add(c); } pl.scale.setScalar(s); sh.add(pl); }
  const hd = B.Head; if (hd) { const h = new THREE.Group(); const dome = real.m(new THREE.SphereGeometry(.118, 24, 12, 0, P * 2, 0, P * .55), M.bronze); dome.scale.set(1, 1.05, 1.12); h.add(dome);
    h.add(real.m(new THREE.CylinderGeometry(.13, .14, .012, 24, 1, false, P * .6, P * .8), M.bronze, { pos: [0, -.01, -.02] })); // neck guard
    for (const sx of [-1, 1]) h.add(real.box(.012, .08, .06, M.bronze, { pos: [sx * .1, -.06, .04] }));
    if (o.crest) h.add(real.box(.02, .06, .2, real.std(0x8a1a12, { rough: .9 }), { pos: [0, .14, 0] }));
    h.scale.setScalar(s); h.position.set(0, .13 * s, .005 * s); hd.add(h); }
  const hips = B.Hips; if (hips) { const belt = real.m(new THREE.TorusGeometry(.16, .015, 8, 28), leather, { rot: [P / 2, 0, 0] }); belt.scale.set(1.1, .85, 1); belt.scale.multiplyScalar(s); belt.position.y = .08 * s; hips.add(belt);
    for (let i = -2; i <= 2; i++) { const st = real.box(.02, .16, .01, leather, { pos: [i * .035 * s, -.02 * s, .15 * s] }); st.scale.setScalar(s); hips.add(st); } }
  if (o.shield !== false) { const g = new THREE.Group(); const geo = new THREE.CylinderGeometry(.55, .55, 1.05, 24, 1, true, -.55, 1.1); const sh = new THREE.Mesh(geo, real.std(o.shieldColor ?? 0x8a1f16, { rough: .6 })); sh.castShadow = true; sh.material.side = THREE.DoubleSide; g.add(sh);
    g.add(real.m(new THREE.SphereGeometry(.07, 16, 8, 0, P * 2, 0, P / 2), M.bronze, { pos: [0, 0, .55], rot: [P / 2, 0, 0] }));
    g.position.set(0, 0, -.55); const holder = new THREE.Group(); holder.add(g); holder.position.set(o.shieldX ?? .36, .72, .16); holder.rotation.set(0, .35, 0); p.add(holder); }
  return p;
}
// eagle standard (aquila) on a pole
export function aquila(o = {}) {
  const M = MC.get('m'); const g = new THREE.Group();
  g.add(real.m(new THREE.CylinderGeometry(.02, .02, 2.6, 10), real.std(0x4a3020, { rough: .6 }), { pos: [0, 1.3, 0] }));
  const e = new THREE.Group(); e.position.y = 2.7; g.add(e);
  e.add(real.m(new THREE.SphereGeometry(.06, 12, 8), M.gold, { scale: [1, 1.3, 1.6] }));
  for (const s of [-1, 1]) { const w = real.m(new THREE.BoxGeometry(.22, .1, .02), M.gold, { pos: [s * .13, .07, 0], rot: [0, 0, s * .5] }); e.add(w); }
  e.add(real.box(.16, .04, .1, M.gold, { pos: [0, -.12, 0] }));
  g.add(real.box(.4, .3, .01, real.std(0x8a1a12, { rough: .9 }), { pos: [0, 2.2, .02] }));
  return g;
}
// open field with grass and distant hills
export async function field(k, o = {}) {
  const { scene } = k;
  await real.env(k, o.hdri ?? 'kloofendal_48d_partly_cloudy_puresky', { sun: o.sun ?? [-30, 20, 20], sunI: o.sunI ?? 4.4, sunColor: o.sunColor ?? 0xffe0b0, shadowSize: o.shadowSize ?? 30, envI: o.envI ?? .7, fog: [o.fog ?? 0xc8c0b0, o.fogNear ?? 40, o.fogFar ?? 260], exposure: o.exposure });
  scene.userData.fx = { ao: 1, aoRadius: .6, bloom: .25 };
  const gm = await real.pbr(o.ground ?? 'forest_ground_04', { repeat: [80, 80] });
  scene.add(real.m(new THREE.PlaneGeometry(400, 400), gm, { rot: [-P / 2, 0, 0], cast: false }));
  const hill = real.std(0x5a6040, { rough: 1 }); const r = rng(3);
  for (let i = 0; i < 14; i++) { const a = r() * P * 2, d = 160 + r() * 60; const h = real.m(new THREE.SphereGeometry(30 + r() * 40, 24, 12), hill, { pos: [Math.sin(a) * d, -18, Math.cos(a) * d], cast: false }); h.scale.y = .5; scene.add(h); }
  return {};
}
// shallow river: dark reflective water with moving ripples
export async function river(k, o = {}) {
  const nor = await real.tex('tex/coast_sand_rocks_02/nor.jpg');
  const n = nor ? nor.clone() : null; if (n) { n.wrapS = n.wrapT = THREE.RepeatWrapping; n.repeat.set(30, 30); n.needsUpdate = true; }
  const mat = new THREE.MeshStandardMaterial({ color: o.color ?? 0x2a3830, metalness: .1, roughness: .08, normalMap: n, normalScale: new THREE.Vector2(.25, .25), transparent: true, opacity: .9 });
  const w = real.m(new THREE.PlaneGeometry(o.w ?? 40, o.l ?? 200), mat, { rot: [-P / 2, 0, o.rot ?? 0], pos: o.pos ?? [0, .25, 0], cast: false });
  k.scene.add(w); w.userData.flow = t => { if (n) n.offset.set(t * .01, t * .04); };
  return w;
}
// gold coins pouring into a chest (instanced)
export function coinStream(scene, from, to, n = 160) {
  const M = MC.get('m'); const geo = new THREE.CylinderGeometry(.012, .012, .003, 16);
  const im = new THREE.InstancedMesh(geo, M.gold, n); im.castShadow = true; scene.add(im);
  const r = rng(11); const seeds = Array.from({ length: n }, () => [r(), r(), r(), r()]); const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
  im.userData.tick = t => { for (let i = 0; i < n; i++) { const [a, b, c, d] = seeds[i]; const ph = ((t * .9 + a * 3) % 1.2) / 1.2; v.set(from[0] + (b - .5) * .12 + (to[0] - from[0]) * ph, from[1] + (to[1] - from[1]) * ph * ph, from[2] + (c - .5) * .12 + (to[2] - from[2]) * ph); e.set(t * 7 * d + a * 9, t * 5 + b * 9, c * 9); q.setFromEuler(e); m4.compose(v, q, one); im.setMatrixAt(i, m4); } im.instanceMatrix.needsUpdate = true; };
  return im;
}
// a carved inscription plate (canvas text on marble)
export function inscription(text, w, h, o = {}) {
  const t = real.canvasTex(1024, Math.round(1024 * h / w), (c, W, H) => { c.fillStyle = o.bg ?? '#d8d0c2'; c.fillRect(0, 0, W, H); c.font = `600 ${o.px ?? Math.round(H * .55)}px "Liberation Serif"`; c.textAlign = 'center'; c.textBaseline = 'middle'; { let f = o.px ?? Math.round(H * .55); while (f > 10) { c.font = `600 ${f}px "Liberation Serif"`; if (c.measureText(text).width < W * .9) break; f -= 4; } } c.fillStyle = 'rgba(255,255,255,.5)'; c.fillText(text, W / 2 + 2, H / 2 + 3); c.fillStyle = o.ink ?? '#3a2a1a'; c.fillText(text, W / 2, H / 2); });
  return real.m(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: .5 }), { cast: false });
}
// ship token for maps
export function shipToken(o = {}) { const g = new THREE.Group(); const w = real.std(0x5a3a20, { rough: .6 }); const hull = real.m(new THREE.SphereGeometry(.06, 16, 8, 0, P * 2, P / 2, P / 2), w); hull.scale.set(.6, .5, 1.8); g.add(hull); g.add(real.m(new THREE.CylinderGeometry(.003, .003, .14, 6), w, { pos: [0, .07, 0] })); g.add(real.box(.09, .07, .003, real.std(o.sail ?? 0xd8cdb4, { rough: .9 }), { pos: [0, .09, 0], rot: [0, P / 2, 0] })); g.scale.setScalar(o.s ?? 1); return g; }
