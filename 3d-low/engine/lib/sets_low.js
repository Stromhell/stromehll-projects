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
  // lit corridor behind the doorway so nobody walks into a black void
  const cor = new THREE.Group();
  const cfl = new THREE.Mesh(new THREE.PlaneGeometry(4, 5), toon(0x9a8a70)); cfl.rotation.x = -P / 2; cfl.position.set(doorX, 0, -d / 2 - 2.5); cfl.receiveShadow = true; cfl.userData.noOutline = true; cor.add(cfl);
  for (let z = 0; z < 5; z += .5) cor.add(box(4, .004, .03, 0x7a6a54, { pos: [doorX, .004, -d / 2 - z], noOutline: true, cast: false }));   // floor tile lines give depth
  const runner = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 5), toon(0x7a3a2e)); runner.rotation.x = -P / 2; runner.position.set(doorX, .006, -d / 2 - 2.5); runner.userData.noOutline = true; cor.add(runner);
  const cwall = new THREE.Mesh(new THREE.BoxGeometry(4, h, .12), toon(0xb8a888)); cwall.position.set(doorX, h / 2, -d / 2 - 5); cwall.receiveShadow = true; cor.add(cwall);
  for (const sx of [-1, 1]) { const sw = new THREE.Mesh(new THREE.BoxGeometry(.12, h, 5), toon(0xd2c4a4)); sw.position.set(doorX + sx * 2, h / 2, -d / 2 - 2.5); sw.receiveShadow = true; cor.add(sw);
    const sc = new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe0a0 })); sc.position.set(doorX + sx * 1.9, 2.0, -d / 2 - 2.5); sc.userData.noOutline = true; cor.add(sc); }
  const cceil = new THREE.Mesh(new THREE.BoxGeometry(4.2, .12, 5), toon(0xe0d4bc)); cceil.position.set(doorX, h + .06, -d / 2 - 2.5); cor.add(cceil);
  for (let i = 0; i < 2; i++) { const pic = outline(group(box(.6, .45, .04, 0x4a3a2a), box(.5, .36, .02, [0x8aa0c8, 0xa88a5a][i], { pos: [0, 0, .03], noOutline: true })), .01); pic.position.set(doorX - .9 + i * 1.8, 1.7, -d / 2 - 4.9); cor.add(pic); }
  const cl = new THREE.PointLight(0xffe0b0, 14, 9); cl.position.set(doorX, 2.6, -d / 2 - 2.2); cor.add(cl);
  const dl = new THREE.PointLight(0xffe6c4, 10, 6); dl.position.set(doorX, 2.4, -d / 2 + 1.0); cor.add(dl);   // doorway light so a figure in the door is lit and outlined
  g.add(cor);
  // side walls (the camera side stays open), window on the left wall
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(w + .3, .12, d + .3), toon(0xe8dcc4)); ceil.position.set(0, h + .06, 0); g.add(ceil);
  g.add(box(w, .14, .1, 0x6a5a44, { pos: [0, h - .07, -d / 2 + .1], noOutline: true }));
  const wl = new THREE.Mesh(new THREE.BoxGeometry(.12, h, d), wallM); wl.position.set(-w / 2, h / 2, 0); wl.receiveShadow = true; g.add(solid(wl, 'left wall'));
  const wr = new THREE.Mesh(new THREE.BoxGeometry(.12, h, d), wallM); wr.position.set(w / 2, h / 2, 0); wr.receiveShadow = true; g.add(solid(wr, 'right wall'));
  const win = group(box(.16, 1.5, 2.2, 0xf4efe2, { pos: [-w / 2, 1.7, -.6], noOutline: true, cast: false }), box(.18, 1.6, .08, 0x5a4a34, { pos: [-w / 2, 1.7, -.6] }), box(.18, .08, 2.3, 0x5a4a34, { pos: [-w / 2, 1.7, -.6] }));
  win.children[0].material = new THREE.MeshBasicMaterial({ color: 0xfff4d6 }); g.add(outline(win, .015));
  // warm window light
  const wlight = new THREE.SpotLight(0xffe9c0, 40, 14, .7, .6, 1.2); wlight.position.set(-w / 2 + .2, 2.2, -.6); wlight.target.position.set(1.5, 0, 0); wlight.castShadow = true; wlight.shadow.mapSize.set(1024, 1024); g.add(wlight, wlight.target);
  // skirting, wainscot panels and a picture rail so no wall is a plain slab
  g.add(box(w, .18, .06, 0x6a5a44, { pos: [0, .09, -d / 2 + .09], noOutline: true }));
  for (const sx of [-1, 1]) g.add(box(.06, .18, d, 0x6a5a44, { pos: [sx * (w / 2 - .09), .09, 0], noOutline: true }));
  const panelM = toon(o.panel ?? 0xc9b894);
  for (let x = -w / 2 + .3; x < w / 2 - .5; x += 1.1) { if (Math.abs(x + .55 - doorX) < 1.0) continue; const pn = new THREE.Mesh(new THREE.BoxGeometry(.9, .8, .03), panelM); pn.position.set(x + .45, .65, -d / 2 + .08); pn.receiveShadow = true; g.add(pn); }
  for (let z = -d / 2 + .3; z < d / 2 - .5; z += 1.1) for (const sx of [-1, 1]) { const pn = new THREE.Mesh(new THREE.BoxGeometry(.03, .8, .9), panelM); pn.position.set(sx * (w / 2 - .08), .65, z + .45); pn.receiveShadow = true; g.add(pn); }
  g.add(box(w, .05, .04, 0x6a5a44, { pos: [0, 1.12, -d / 2 + .08], noOutline: true })); g.add(box(w, .05, .04, 0x6a5a44, { pos: [0, 2.5, -d / 2 + .08], noOutline: true }));
  for (const sx of [-1, 1]) { g.add(box(.04, .05, d, 0x6a5a44, { pos: [sx * (w / 2 - .08), 1.12, 0], noOutline: true })); g.add(box(.04, .05, d, 0x6a5a44, { pos: [sx * (w / 2 - .08), 2.5, 0], noOutline: true })); }
  // desk + chair + visitor chair
  const desk = props.table(2.2, 1.0, { color: o.desk ?? 0x6a4a30 }); desk.position.set(-1.0, 0, -1.2); g.add(solid(desk, 'desk'));
  // desk front panel with drawers and brass handles (the camera side)
  desk.add(box(2.0, .62, .06, 0x5e4028, { pos: [0, .42, .44] }));
  for (let i = 0; i < 3; i++) { desk.add(box(.5, .18, .02, 0x6a4a30, { pos: [-.65 + i * .65, .58 - (i === 1 ? 0 : 0), .48], noOutline: true })); desk.add(box(.12, .03, .02, 0xd9b13b, { pos: [-.65 + i * .65, .58, .5], noOutline: true })); }
  const chair = props.chair(); chair.position.set(-1.0, 0, -1.95); g.add(solid(chair, 'desk chair'));
  const chair2 = props.chair({ color: 0x4a3a2a }); chair2.position.set(-1.0, 0, .0); chair2.rotation.y = P; g.add(solid(chair2, 'visitor chair'));
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
  const clk = props.clock(); clk.set(7, 5); clk.position.set(.55, 2.2, -d / 2 + .1); g.add(clk);
  // rug and plant
  const rug = new THREE.Mesh(new THREE.CircleGeometry(1.3, 32), toon(o.rug ?? 0x7a4a3a)); rug.rotation.x = -P / 2; rug.position.set(1.4, .006, .4); rug.receiveShadow = true; rug.userData.noOutline = true; g.add(rug);
  const rugRing = new THREE.Mesh(new THREE.RingGeometry(1.05, 1.18, 32), toon(0xc9a96a)); rugRing.rotation.x = -P / 2; rugRing.position.set(1.4, .009, .4); rugRing.userData.noOutline = true; g.add(rugRing);
  const plant = outline(group(cyl(.2, .16, .35, 0xb5651d, { pos: [0, .18, 0] }), sph(.38, 0x3f7a3a, { pos: [0, .7, 0], scale: [1, 1.2, 1] }), sph(.26, 0x4f8f44, { pos: [.2, .9, .1] }), sph(.22, 0x366a30, { pos: [-.2, .85, -.1] })), .015); plant.position.set(-w / 2 + .6, 0, -d / 2 + .6); g.add(solid(plant, 'plant'));
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
  // asphalt with a canvas texture: speckle, tyre marks, panel joints
  const ac = document.createElement('canvas'); ac.width = ac.height = 2048; const ax = ac.getContext('2d'); const ar = rng(21);
  ax.fillStyle = '#4a4d54'; ax.fillRect(0, 0, 2048, 2048);
  for (let i = 0; i < 40000; i++) { const v = 58 + Math.floor(ar() * 34); ax.fillStyle = `rgb(${v},${v + 2},${v + 6})`; ax.fillRect(ar() * 2048, ar() * 2048, 2 + ar() * 3, 2 + ar() * 3); }
  ax.strokeStyle = 'rgba(0,0,0,.35)'; ax.lineWidth = 3; for (let i = 0; i <= 8; i++) { ax.beginPath(); ax.moveTo(i * 256, 0); ax.lineTo(i * 256, 2048); ax.stroke(); ax.beginPath(); ax.moveTo(0, i * 256); ax.lineTo(2048, i * 256); ax.stroke(); }
  ax.strokeStyle = 'rgba(0,0,0,.18)'; ax.lineWidth = 18; for (let i = 0; i < 12; i++) { ax.beginPath(); ax.moveTo(ar() * 2048, ar() * 2048); ax.bezierCurveTo(ar() * 2048, ar() * 2048, ar() * 2048, ar() * 2048, ar() * 2048, ar() * 2048); ax.stroke(); }
  const atex = new THREE.CanvasTexture(ac); atex.wrapS = atex.wrapT = THREE.RepeatWrapping; atex.repeat.set(14, 14); atex.colorSpace = THREE.SRGBColorSpace; atex.anisotropy = 8;
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.MeshToonMaterial({ map: atex })); gnd.rotation.x = -P / 2; gnd.receiveShadow = true; gnd.userData.noOutline = true; g.add(gnd);
  // distant city skyline with lit windows and a warm horizon glow
  const sky = new THREE.Group(); const sr = rng(31);
  for (let i = -30; i <= 30; i++) { const hgt = 6 + sr() * 30, wd = 6 + sr() * 8; const b = box(wd, hgt, 8, 0x141a2a, { pos: [i * 11 + sr() * 4, hgt / 2, -260 - sr() * 60], noOutline: true, cast: false }); sky.add(b);
    for (let y = 2; y < hgt - 1; y += 2.2) for (let x = -wd / 2 + 1; x < wd / 2 - .5; x += 1.6) if (sr() < .45) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(.9, 1.1), new THREE.MeshBasicMaterial({ color: sr() < .5 ? 0xffd27a : 0xcfe0ff, fog: false })); wn.position.set(b.position.x + x, y, b.position.z + 4.05); wn.userData.noOutline = true; sky.add(wn); } }
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1400, 90), new THREE.MeshBasicMaterial({ color: 0x5a4a6a, transparent: true, opacity: .55, fog: false })); glow.position.set(0, 30, -340); glow.userData.noOutline = true; sky.add(glow);
  g.add(sky);
  // apron markings
  for (let i = -4; i <= 4; i++) g.add(box(.35, .01, 60, 0xd8c060, { pos: [i * 14, .01, 0], noOutline: true, cast: false }));
  g.add(box(140, .01, .35, 0xd8c060, { pos: [0, .01, -30], noOutline: true, cast: false }));
  for (let i = -3; i <= 3; i++) { g.add(box(10, .012, .25, 0xf2f2ee, { pos: [i * 14 + 7, .012, 14], noOutline: true, cast: false })); g.add(box(.25, .012, 16, 0xf2f2ee, { pos: [i * 14 + 2, .012, 6], noOutline: true, cast: false }));
    const num = textPlane('A' + (12 + i), 2.2, { size: 120, color: '#f2f2ee', stroke: '#4a4d54', strokeW: 4 }); num.rotation.x = -P / 2; num.position.set(i * 14 + 7, .02, 11); g.add(num); }
  for (let z = -26; z < 60; z += 6) g.add(box(.3, .012, 3, 0x6ac04a, { pos: [-30, .012, z], noOutline: true, cast: false }));   // green taxi centreline lights
  const term = props.terminal({ len: 90 }); term.position.set(0, 0, -70); g.add(solid(term, 'terminal'));
  const tw = props.tower(); tw.position.set(-55, 0, -60); g.add(solid(tw, 'tower'));
  for (let i = -3; i <= 3; i++) {
    const post = outline(group(cyl(.22, .3, .6, 0x2a2a2a, { pos: [0, .3, 0] }), cyl(.12, .16, 11, 0x3a3a3a, { pos: [0, 5.8, 0] }), box(2.6, .3, .5, 0x3a3a3a, { pos: [0, 11.3, 0] })), .03); post.position.set(i * 22, 0, -38); g.add(post);
    for (const sx of [-1, 1]) { const bulb = new THREE.Mesh(new THREE.BoxGeometry(.9, .25, .4), new THREE.MeshBasicMaterial({ color: 0xffd27a })); bulb.position.set(i * 22 + sx * .8, 11.1, -38); bulb.userData.noOutline = true; g.add(bulb); }
    const pl = new THREE.PointLight(0xffcf6a, 90, 70, 1.6); pl.position.set(i * 22, 10.5, -36); g.add(pl);
    const pool = new THREE.Mesh(new THREE.CircleGeometry(9, 40), new THREE.MeshBasicMaterial({ color: 0x6a5a3a, transparent: true, opacity: .28, depthWrite: false })); pool.rotation.x = -P / 2; pool.position.set(i * 22, .02, -34); pool.userData.noOutline = true; g.add(pool);
  }
  const jet = props.airliner({ color: 0xf2f2ee, stripe: o.stripe ?? 0xc0392b, tail: o.tail ?? 0xc0392b }); jet.position.set(o.jetX ?? 6, 0, -8); jet.rotation.y = o.jetRot ?? .35; g.add(solid(jet, 'airliner'));
  // cabin window glow and a contact shadow under the fuselage
  const jsh = new THREE.Mesh(new THREE.PlaneGeometry(8, 30), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .35, depthWrite: false })); jsh.rotation.x = -P / 2; jsh.rotation.z = -(o.jetRot ?? .35); jsh.position.set(jet.position.x, .03, jet.position.z); jsh.userData.noOutline = true; g.add(jsh);
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
  const fl = new THREE.Mesh(new THREE.CircleGeometry(30, 48), toon(o.floor ?? 0x3a322c)); fl.rotation.x = -P / 2; fl.receiveShadow = true; fl.userData.noOutline = true; g.add(fl);
  // warm key spot on the subject, cool rim behind it, a soft pool of light on the floor
  const key = new THREE.SpotLight(0xffe2b8, 60, 30, .6, .5, 1); key.position.set(4, 7, 7); key.castShadow = true; g.add(key);
  const rim = new THREE.SpotLight(0x8aa0e0, 25, 40, .9, .5, 1); rim.position.set(-6, 8, -6); g.add(rim);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(60, 20), toon(0x2e2622)); back.position.set(0, 10, -6); back.receiveShadow = true; back.userData.noOutline = true; g.add(back);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(4.5, 48), new THREE.MeshBasicMaterial({ color: 0x5a4a3c })); pool.rotation.x = -P / 2; pool.position.y = .005; pool.userData.noOutline = true; g.add(pool);
  scene.add(g);
  return { group: g, floorY: 0 };
}
