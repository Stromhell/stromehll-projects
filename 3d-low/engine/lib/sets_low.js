// Cartoon sets for the 3D low line. Every set is real geometry (hollow rooms with a
// doorway, furnished interiors, see-through windows) built from toon primitives, and
// every solid piece is registered with the overlap checker (qa.solid).
import * as THREE from 'three';
import { toon, mesh, box, cyl, sph, group, outline, textPlane, rng, INK, setEnv } from './core.js';
import * as props from './props.js';
import { solid } from './qa.js';
const P = Math.PI;

// Floor plan helper: a set returns { group, lanes: {name: [[x,z],...]}, floorY } so shots walk people along lanes.
export function lanePath(pts) {
  // returns f(dist) -> {pos:[x,0,z], rot} along a polyline, plus total length
  const segs = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const dx = pts[i][0] - pts[i - 1][0], dz = pts[i][1] - pts[i - 1][1]; const l = Math.hypot(dx, dz); segs.push({ a: pts[i - 1], dx, dz, l, s: L }); L += l; }
  const f = d => { d = Math.max(0, Math.min(L, d)); let g = segs[segs.length - 1]; for (const s of segs) if (d <= s.s + s.l) { g = s; break; }
    const k = (d - g.s) / g.l; return { pos: [g.a[0] + g.dx * k, 0, g.a[1] + g.dz * k], rot: Math.atan2(g.dx, g.dz) }; };
  f.total = L; return f;
}

// Office / study: hollow room with a working door in the back wall, a desk, chairs, a window with
// light coming through, shelves and small props so no wall is plain.
export function office(k, o = {}) {
  const { scene } = k; const w = o.w ?? 7, d = o.d ?? 6, h = o.h ?? 3.1;
  setEnv(k, o.sky ?? 'interior', { noFog: true, shadowSize: 12, sunPos: o.sunPos ?? [4, 6, 5] });
  const g = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), toon(o.floor ?? 0x8a6a48)); floor.rotation.x = -P / 2; floor.receiveShadow = true; floor.userData.noOutline = true; g.add(floor);
  // floor boards
  for (let x = -w / 2; x < w / 2; x += .6) g.add(box(.02, .005, d, 0x6a4e34, { pos: [x, .003, 0], noOutline: true, cast: false }));
  const wallM = toon(o.wall ?? 0xd8ccb0);
  // back wall with a doorway cut out: two panels + lintel
  const doorX = o.doorX ?? 1.8, dw = 1.4;
  const left = new THREE.Mesh(new THREE.BoxGeometry((doorX - dw / 2) + w / 2, h, .12), wallM); left.position.set((-w / 2 + doorX - dw / 2) / 2, h / 2, -d / 2); left.receiveShadow = true; g.add(solid(left, 'back wall L'));
  const right = new THREE.Mesh(new THREE.BoxGeometry(w / 2 - doorX - dw / 2, h, .12), wallM); right.position.set((doorX + dw / 2 + w / 2) / 2, h / 2, -d / 2); right.receiveShadow = true; g.add(solid(right, 'back wall R'));
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(dw, h - 2.4, .12), wallM); lintel.position.set(doorX, 2.4 + (h - 2.4) / 2, -d / 2); g.add(lintel);
  const door = props.door({ color: o.doorColor ?? 0x8a6a48 }); door.position.set(doorX, 0, -d / 2); g.add(door); solid(door.leaf, 'door leaf');
  // side walls (the camera side stays open), window on the left wall
  const wl = new THREE.Mesh(new THREE.BoxGeometry(.12, h, d), wallM); wl.position.set(-w / 2, h / 2, 0); wl.receiveShadow = true; g.add(solid(wl, 'left wall'));
  const wr = new THREE.Mesh(new THREE.BoxGeometry(.12, h, d), wallM); wr.position.set(w / 2, h / 2, 0); wr.receiveShadow = true; g.add(solid(wr, 'right wall'));
  const win = group(box(.16, 1.5, 2.2, 0xf4efe2, { pos: [-w / 2, 1.7, -.6], noOutline: true, cast: false }), box(.18, 1.6, .08, 0x5a4a34, { pos: [-w / 2, 1.7, -.6] }), box(.18, .08, 2.3, 0x5a4a34, { pos: [-w / 2, 1.7, -.6] }));
  win.children[0].material = new THREE.MeshBasicMaterial({ color: 0xfff4d6 }); g.add(outline(win, .015));
  // warm window light
  const wlight = new THREE.SpotLight(0xffe9c0, 40, 14, .7, .6, 1.2); wlight.position.set(-w / 2 + .2, 2.2, -.6); wlight.target.position.set(1.5, 0, 0); wlight.castShadow = true; wlight.shadow.mapSize.set(1024, 1024); g.add(wlight, wlight.target);
  // skirting + ceiling cornice
  g.add(box(w, .18, .06, 0x6a5a44, { pos: [0, .09, -d / 2 + .09], noOutline: true }));
  // desk + chair + visitor chair
  const desk = props.table(2.2, 1.0, { color: o.desk ?? 0x6a4a30 }); desk.position.set(-1.0, 0, -1.2); g.add(solid(desk, 'desk'));
  const chair = props.chair(); chair.position.set(-1.0, 0, -1.95); g.add(solid(chair, 'desk chair'));
  const chair2 = props.chair({ color: 0x4a3a2a }); chair2.position.set(-1.0, 0, -.35); chair2.rotation.y = P; g.add(solid(chair2, 'visitor chair'));
  // desk props: lamp, papers, phone, books
  g.add(props.phone({ color: 0x1a1a1a }).translateX(-1.7).translateY(.82).translateZ(-1.4));
  const lamp = outline(group(cyl(.12, .14, .03, 0x2a2a2a, { pos: [0, .82, 0] }), cyl(.015, .015, .45, 0x2a2a2a, { pos: [0, 1.05, 0] }), cyl(.16, .08, .16, 0x2f6b4a, { pos: [0, 1.3, 0] })), .012); lamp.position.set(-.3, 0, -1.5); g.add(lamp);
  const lampLight = new THREE.PointLight(0xffd080, 6, 4); lampLight.position.set(-.3, 1.25, -1.5); g.add(lampLight);
  for (let i = 0; i < 4; i++) g.add(box(.3, .004, .4, 0xf6f1e4, { pos: [-1.1 + i * .12, .82 + i * .005, -1.1 - i * .03], rot: [0, (i - 1.5) * .12, 0], noOutline: true, cast: false }));
  // bookshelf on the right wall
  const shelf = new THREE.Group(); const cols = [0x8a2a2a, 0x2a4a7a, 0x6a7a3a, 0xd8b04a, 0x5a3a6a, 0x3a3a3a];
  shelf.add(box(.35, 2.2, 1.6, 0x5a3e2a, { pos: [0, 1.1, 0] }));
  for (let r = 0; r < 4; r++) { shelf.add(box(.33, .03, 1.5, 0x8a6a48, { pos: [-.02, .3 + r * .5, 0], noOutline: true })); const rr = rng(r + 5); let z = -.7; while (z < .7) { const bw = .06 + rr() * .08, bh = .28 + rr() * .14; shelf.add(box(.26, bh, bw, cols[Math.floor(rr() * cols.length)], { pos: [-.03, .3 + r * .5 + bh / 2 + .02, z + bw / 2], noOutline: true })); z += bw + .01; } }
  shelf.position.set(w / 2 - .22, 0, -1.2); g.add(solid(outline(shelf, .012), 'bookshelf'));
  // picture frames and a clock on the back wall
  const pic = outline(group(box(.9, .6, .04, 0x4a3a2a, { pos: [0, 0, 0] }), box(.78, .48, .02, 0x8aa0c8, { pos: [0, 0, .03], noOutline: true })), .01); pic.position.set(-1.6, 1.9, -d / 2 + .08); g.add(pic);
  const clk = props.clock(); clk.position.set(-.2, 2.3, -d / 2 + .1); g.add(clk);
  // rug and plant
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.3, 32), toon(o.rug ?? 0x9a4a3a)); rug.rotation.x = -P / 2; rug.position.set(1.4, .006, .4); rug.receiveShadow = true; rug.userData.noOutline = true; g.add(rug);
  const plant = outline(group(cyl(.2, .16, .35, 0xb5651d, { pos: [0, .18, 0] }), sph(.38, 0x3f7a3a, { pos: [0, .7, 0], scale: [1, 1.2, 1] }), sph(.26, 0x4f8f44, { pos: [.2, .9, .1] }), sph(.22, 0x366a30, { pos: [-.2, .85, -.1] })), .015); plant.position.set(w / 2 - .6, 0, d / 2 - .8); g.add(solid(plant, 'plant'));
  scene.add(g);
  const lanes = { enter: [[doorX, -d / 2 - 1.2], [doorX, -d / 2 + .6], [.6, -.2]], toDesk: [[.6, -.2], [-1.0, -.35]] };
  return { group: g, door, desk, chair, chair2, lanes, w, d, h, floorY: 0 };
}

// Night airport apron: tarmac with markings, a terminal block with lit windows, a tower,
// apron lamps, an airliner, baggage carts. Deep set so the camera can push in.
export function apron(k, o = {}) {
  const { scene } = k;
  setEnv(k, o.sky ?? 'night', { shadowSize: 80, fogNear: 80, fogFar: 500 });
  const g = new THREE.Group();
  g.add(props.ground(0x3a3c40, 900));
  // apron markings
  for (let i = -4; i <= 4; i++) g.add(box(.35, .01, 60, 0xd8c060, { pos: [i * 14, .01, 0], noOutline: true, cast: false }));
  g.add(box(140, .01, .35, 0xd8c060, { pos: [0, .01, -30], noOutline: true, cast: false }));
  const term = props.terminal({ len: 90 }); term.position.set(0, 0, -70); g.add(solid(term, 'terminal'));
  const tw = props.tower(); tw.position.set(-55, 0, -60); g.add(solid(tw, 'tower'));
  for (let i = -3; i <= 3; i++) { const l = props.lamp(); l.scale.setScalar(6); l.position.set(i * 22, 0, -38); g.add(l); const pl = new THREE.PointLight(0xffcf6a, 60, 60); pl.position.set(i * 22, 9, -36); g.add(pl); }
  const jet = props.airliner({ color: 0xf2f2ee, stripe: o.stripe ?? 0xc0392b, tail: o.tail ?? 0xc0392b }); jet.position.set(o.jetX ?? 6, 0, -8); jet.rotation.y = o.jetRot ?? .35; g.add(solid(jet, 'airliner'));
  // baggage carts
  for (let i = 0; i < 3; i++) { const c = outline(group(box(1.6, .5, .9, 0x6a7a8a, { pos: [0, .55, 0] }), box(1.4, .6, .8, 0x8a8a7a, { pos: [0, 1.1, 0] }), cyl(.18, .18, .1, 0x1a1a1a, { pos: [.5, .18, .45], rot: [P / 2, 0, 0] }), cyl(.18, .18, .1, 0x1a1a1a, { pos: [-.5, .18, .45], rot: [P / 2, 0, 0] })), .02); c.position.set(-14 + i * 2, 0, 4 + i * .3); c.rotation.y = .2; g.add(solid(c, 'cart' + i)); }
  scene.add(g);
  return { group: g, jet, floorY: 0 };
}

// A plain dark stage for data cards and title shots: dark floor, gradient sky, a rim light.
export function stage(k, o = {}) {
  const { scene } = k;
  setEnv(k, o.sky ?? 'dark', { noFog: true, shadowSize: 20, amb: 0xc8b8a0, ambI: .5, sun: 0xffe6c0, sunI: 1.1, sunPos: [6, 10, 8] });
  const g = new THREE.Group();
  const fl = new THREE.Mesh(new THREE.CircleGeometry(30, 48), toon(o.floor ?? 0x2a2420)); fl.rotation.x = -P / 2; fl.receiveShadow = true; fl.userData.noOutline = true; g.add(fl);
  // warm key spot on the subject, cool rim behind it, a soft pool of light on the floor
  const key = new THREE.SpotLight(0xffe2b8, 60, 30, .6, .5, 1); key.position.set(4, 7, 7); key.castShadow = true; g.add(key);
  const rim = new THREE.SpotLight(0x8aa0e0, 25, 40, .9, .5, 1); rim.position.set(-6, 8, -6); g.add(rim);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(4, 48), new THREE.MeshBasicMaterial({ color: 0x3a3028 })); pool.rotation.x = -P / 2; pool.position.y = .005; pool.userData.noOutline = true; g.add(pool);
  scene.add(g);
  return { group: g, floorY: 0 };
}
