// The History of Christmas (XM) · cast helpers, animals, props and period sets
import { core, props, people, THREE, ui, SNOW, COAL, RED, GREEN, GOLD, TWIG, pine, xmasTree, snowGround, snowfall, cottage, lampPost, glowSprite, starGeo, bulbString } from './xm_common.js';
const P = Math.PI;
const { box, cyl, sph, mesh, toon, clamp, ease, seg, rng, lerp } = core;

// ---------------------------------------------------------------- people + costume extras
// seated figure helper: root height so thighs rest on a seat of height h
export const seatRoot = h => h - .68;
export function man(o = {}) { return people.person({ outfit: 'tunic', seed: 1, mood: 'calm', ...o }); }
export function hat(p, type, col) {
  const h = p.parts.head; const g = new THREE.Group(); h.add(g);
  if (type === 'mitre') { g.add(mesh(new THREE.ConeGeometry(.2, .55, 4), col ?? 0xb0242a, { pos: [0, .5, 0], rot: [0, P / 4, 0], scale: [1, 1, .55] })); g.add(box(.05, .5, .13, GOLD, { pos: [0, .48, 0], noOutline: true })); g.add(cyl(.27, .27, .08, GOLD, { pos: [0, .25, 0] })); }
  if (type === 'santa') { g.add(mesh(new THREE.ConeGeometry(.28, .55, 18), RED, { pos: [0, .43, -.05], rot: [-.4, 0, 0] })); g.add(mesh(new THREE.TorusGeometry(.28, .06, 8, 24), 0xffffff, { pos: [0, .2, 0], rot: [P / 2, 0, 0] })); g.add(sph(.08, 0xffffff, { pos: [0, .62, -.28] })); }
  if (type === 'crown') { g.add(cyl(.26, .25, .12, GOLD, { pos: [0, .3, 0] })); for (let i = 0; i < 6; i++) { const a = i / 6 * P * 2; g.add(mesh(new THREE.ConeGeometry(.05, .14, 4), GOLD, { pos: [Math.cos(a) * .24, .42, Math.sin(a) * .24] })); } g.add(sph(.035, RED, { pos: [0, .3, .26], noOutline: true })); }
  if (type === 'turban') { const t = sph(.33, col ?? 0x6a3a8a, { seg: 20 }); t.scale.set(1.05, .7, 1.05); t.position.y = .18; g.add(t); g.add(sph(.05, GOLD, { pos: [0, .25, .32], noOutline: true })); }
  if (type === 'witch') { g.add(mesh(new THREE.ConeGeometry(.24, .7, 16), 0x2a2030, { pos: [0, .55, -.05], rot: [-.25, 0, .1] })); g.add(cyl(.48, .48, .03, 0x2a2030, { pos: [0, .24, 0] })); }
  if (type === 'elf') { g.add(mesh(new THREE.ConeGeometry(.29, .6, 16), col ?? RED, { pos: [0, .45, 0], rot: [-.15, 0, 0] })); g.add(sph(.07, 0xffffff, { pos: [0, .74, -.1] })); }
  if (type === 'puritan') { g.add(cyl(.22, .26, .45, 0x1a1a1e, { pos: [0, .44, 0] })); g.add(cyl(.5, .5, .03, 0x1a1a1e, { pos: [0, .22, 0] })); g.add(box(.3, .06, .02, 0xb8a050, { pos: [0, .3, .25], noOutline: true })); }
  if (type === 'hood') { const hd = mesh(new THREE.SphereGeometry(.345, 20, 14, P * .78, P * 1.44), col ?? 0xeeeae0); hd.material = toon(col ?? 0xeeeae0, { mat: { side: THREE.DoubleSide } }); hd.position.set(0, .03, -.02); g.add(hd); }
  if (type === 'veil') { const v = mesh(new THREE.SphereGeometry(.34, 20, 14, P * .78, P * 1.44), col ?? 0x3a5aa8); v.material = toon(col ?? 0x3a5aa8, { mat: { side: THREE.DoubleSide } }); v.position.set(0, .03, -.02); g.add(v); g.add(cyl(.22, .3, .45, col ?? 0x3a5aa8, { pos: [0, -.32, -.16] })); }
  if (type === 'horns') { for (const s of [-1, 1]) { const hr = mesh(new THREE.TorusGeometry(.16, .045, 6, 12, P * 1.1), 0xd8c8a0, { pos: [s * .2, .3, -.05], rot: [0, s * P / 2, s * .3] }); g.add(hr); } }
  if (type === 'tricorn') { g.add(cyl(.38, .38, .05, 0x1a1a1e, { pos: [0, .24, 0] })); g.add(cyl(.22, .26, .2, 0x1a1a1e, { pos: [0, .34, 0] })); }
  if (type === 'tiara') { g.add(mesh(new THREE.TorusGeometry(.24, .025, 6, 20, P), GOLD, { pos: [0, .25, .05], rot: [-.3, 0, 0] })); }
  if (type === 'helmet') { const hm = sph(.33, 0x8a8a90, { seg: 20 }); hm.scale.set(1.05, .6, 1.05); hm.position.y = .17; g.add(hm); g.add(box(.04, .16, .05, 0x8a8a90, { pos: [0, .08, .31] })); }
  if (type === 'fur') { const f = sph(.33, 0x7a5a3a, { seg: 18 }); f.scale.set(1.05, .6, 1.05); f.position.y = .16; g.add(f); }
  core.outline(g, .018);
  return g;
}
export function beard(p, col = 0xf4f4f0, big = 1) { const b = sph(.22 * big, col, { scale: [1, .75, .7], pos: [0, -.2, .05] }); p.parts.head.add(b); core.outline(b, .015); return b; }
export function cape(p, col) { const c = cyl(.24, .42, .95, col, { pos: [0, .95, -.06], seg: 18 }); p.parts.body.add(c); core.outline(c, .015); return c; }
export function trim(p, col = 0xffffff) { const b = cyl(.3, .3, .06, col, { pos: [0, .64, 0] }); p.parts.body.add(b); const f = box(.09, .5, .02, col, { pos: [0, .98, .19], noOutline: true }); p.parts.body.add(f); return b; }
export const santaMan = (o = {}) => { const p = people.person({ outfit: 'tunic', top: o.coat ?? RED, bot: o.coat ?? RED, seed: 70, mood: 'calm', smile: true, scale: 1.08, skin: 0xf2b896, ...o }); hat(p, o.hatType ?? 'santa'); beard(p, 0xf4f4f0, 1.2); trim(p); p.parts.head.add(sph(.05, 0xe0605a, { pos: [0, -.03, .3], noOutline: true })); for (const sx of [-1, 1]) p.parts.head.add(sph(.045, 0xf08a80, { pos: [sx * .17, -.04, .24], scale: [1, .7, .4], noOutline: true })); return p; };

// ---------------------------------------------------------------- animals (one rig, many species)
export function animal(kind = 'donkey', o = {}) {
  const S = { donkey: { col: 0x8a8a8e, L: 1.3, H: .8, leg: .7, neck: .55, head: .45, ears: .3 },
    camel: { col: 0xc8a06a, L: 1.8, H: 1.2, leg: 1.3, neck: 1.0, head: .5, ears: .08, hump: true },
    sheep: { col: 0xf0ece0, L: .9, H: .55, leg: .4, neck: .2, head: .3, ears: .12, wool: true, headCol: 0x2a2420 },
    ox: { col: 0x8a5a3a, L: 1.7, H: .95, leg: .75, neck: .35, head: .55, ears: .15, horns: true },
    reindeer: { col: 0x8a5a3a, L: 1.4, H: .75, leg: .9, neck: .55, head: .45, ears: .15, antlers: true },
    goat: { col: 0xd8d0c0, L: .95, H: .55, leg: .5, neck: .35, head: .32, ears: .12, horns: true, goatee: true } }[kind];
  const c = o.color ?? S.col; const g = new THREE.Group();
  const bodyY = S.leg + S.H / 2;
  const bodyM = mesh(new THREE.CapsuleGeometry(S.H / 2, S.L - S.H, 6, 14), c); bodyM.rotation.x = P / 2; bodyM.position.y = bodyY; g.add(bodyM);
  if (S.wool) for (let i = 0; i < 9; i++) g.add(sph(S.H * .38, c, { pos: [(i % 3 - 1) * S.H * .32, bodyY + (i % 2) * .08 + .05, (Math.floor(i / 3) - 1) * S.L * .3] }));
  if (S.hump) g.add(sph(S.H * .45, c, { pos: [0, bodyY + S.H * .45, -.1], scale: [1, .9, 1.2] }));
  const neck = new THREE.Group(); neck.position.set(0, bodyY + S.H * .25, S.L / 2 - S.H * .1); g.add(neck);
  const nk = cyl(S.H * .17, S.H * .26, S.neck, c, { seg: 10 }); nk.position.y = S.neck / 2; neck.add(nk); neck.rotation.x = kind === 'camel' ? .35 : .55;
  const head = new THREE.Group(); head.position.y = S.neck; neck.add(head);
  const hd = mesh(new THREE.CapsuleGeometry(S.head * .32, S.head * .6, 5, 10), S.headCol ?? c); hd.rotation.x = P / 2 - .6; hd.position.z = S.head * .3; head.add(hd); head.rotation.x = -.5;
  for (const s of [-1, 1]) { const e = sph(.035, COAL, { noOutline: true, pos: [s * S.head * .3, S.head * .18, S.head * .25] }); head.add(e);
    const ear = mesh(new THREE.ConeGeometry(.05, S.ears, 6), S.headCol ?? c, { pos: [s * S.head * .25, S.head * .3 + S.ears / 2, 0], rot: [0, 0, -s * .5] }); head.add(ear); }
  if (kind === 'reindeer') head.add(sph(.06, 0xd8282e, { pos: [0, -.05, S.head * .8], noOutline: true }));
  if (S.horns) for (const s of [-1, 1]) head.add(mesh(new THREE.ConeGeometry(.04, .3, 6), 0xe8dcc0, { pos: [s * .12, S.head * .45, -.02], rot: [-.5, 0, -s * .5] }));
  if (S.antlers) for (const s of [-1, 1]) { const a = new THREE.Group(); a.position.set(s * .1, S.head * .4, 0); head.add(a);
    a.add(cyl(.025, .035, .45, 0x6a4a2a, { pos: [s * .08, .2, 0], rot: [0, 0, -s * .4], seg: 6 }));
    for (let i = 0; i < 3; i++) a.add(cyl(.018, .025, .2, 0x6a4a2a, { pos: [s * (.06 + i * .06), .12 + i * .12, .05], rot: [.6, 0, -s * (.2 + i * .3)], seg: 5 })); }
  if (S.goatee) head.add(mesh(new THREE.ConeGeometry(.04, .12, 6), 0xbab0a0, { pos: [0, -.1, S.head * .55], rot: [P, 0, 0] }));
  const legs = [[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([x, z], i) => { const p = new THREE.Group(); p.position.set(x * S.H * .28, S.leg, z * (S.L / 2 - S.H * .25)); g.add(p);
    p.add(cyl(S.H * .1, S.H * .08, S.leg, c, { pos: [0, -S.leg / 2, 0], seg: 8 })); p.add(cyl(S.H * .1, S.H * .1, .06, 0x2a2420, { pos: [0, -S.leg + .03, 0], seg: 8 })); return p; });
  const tail = cyl(.025, .015, S.H * .5, c, { pos: [0, bodyY + S.H * .1, -S.L / 2 - .05], rot: [.6, 0, 0], seg: 5 }); g.add(tail);
  core.outline(g, .018);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(S.L * .55, 20), new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: .25, depthWrite: false })); sh.rotation.x = -P / 2; sh.position.y = .015; sh.scale.set(.6, 1, 1); g.add(sh);
  const stride = S.leg * 1.3;
  g.walk = (d, t = 0) => { const ph = d / stride * P * 2; legs.forEach((l, i) => l.rotation.x = Math.sin(ph + (i === 0 || i === 3 ? 0 : P)) * .4); bodyM.position.y = bodyY + Math.abs(Math.cos(ph)) * .03; head.rotation.x = -.5 + Math.sin(ph * 2) * .05; tail.rotation.z = Math.sin(t * 3) * .2; };
  g.idle = t => { legs.forEach(l => l.rotation.x = 0); head.rotation.x = -.5 + Math.sin(t * .8) * .08; head.rotation.y = Math.sin(t * .5) * .2; tail.rotation.z = Math.sin(t * 2.5) * .3; bodyM.scale.y = 1 + Math.sin(t * 2) * .01; };
  g.seat = new THREE.Vector3(0, bodyY + S.H / 2, -.05); g.S = S;
  if (o.scale) g.scale.setScalar(o.scale);
  return g;
}

// ---------------------------------------------------------------- props
export function calendar(text, o = {}) {
  const g = new THREE.Group(); const w = o.w ?? 1.2, h = o.h ?? 1.4;
  const page = (txt, top) => props.card(txt, { h, cw: 600, ch: 700, size: o.size ?? 150, bg: '#fbf6ea', draw: (x, c) => { x.fillStyle = top ?? '#c8282e'; x.fillRect(0, 0, 600, 150); x.fillStyle = '#fff'; x.font = '64px "Anton"'; x.textAlign = 'center'; x.fillText(o.head ?? 'CALENDAR', 300, 100); } });
  const back = box(w * 1.04, h * 1.02, .04, 0x5a3a22, { pos: [0, 0, -.03] }); g.add(back);
  const front = page(text); front.position.z = .005; g.add(front); g.front = front;
  for (let i = 0; i < 5; i++) g.add(mesh(new THREE.TorusGeometry(.04, .012, 5, 10), 0x8a8a8a, { pos: [-w * .36 + i * w * .18, h / 2 - .02, .01], noOutline: true }));
  g.setText = (txt, top) => { g.remove(g.front); const f = page(txt, top); f.position.z = .006; g.add(f); g.front = f; };
  return g;
}
export function book(o = {}) {
  const g = new THREE.Group(); const w = o.w ?? 1, d = o.d ?? .7;
  const cover = o.cover ?? 0x6a2a2a;
  const L = new THREE.Group(), R = new THREE.Group(); g.add(L, R);
  L.add(box(w / 2, .03, d, cover, { pos: [-w / 4, 0, 0] })); R.add(box(w / 2, .03, d, cover, { pos: [w / 4, 0, 0] }));
  const pg = (txt) => props.card(txt, { h: d * .9, cw: 500, ch: 700, size: o.size ?? 48, bg: '#d8c8a0', font: 'Anton' });
  const lp = pg(o.left ?? ''); lp.rotation.x = -P / 2; lp.position.set(-w / 4, .05, 0); lp.scale.set(.66, 1, 1); L.add(lp);
  const rp = pg(o.right ?? ''); rp.rotation.x = -P / 2; rp.position.set(w / 4, .05, 0); rp.scale.set(.66, 1, 1); R.add(rp);
  L.add(box(w / 2 * .94, .05, d * .94, 0xc8b890, { pos: [-w / 4, .02, 0], noOutline: true })); R.add(box(w / 2 * .94, .05, d * .94, 0xc8b890, { pos: [w / 4, .02, 0], noOutline: true }));
  const flips = []; for (let i = 0; i < 4; i++) { const f = new THREE.Group(); const pp = box(w / 2 * .92, .006, d * .9, 0xfaf2dc, { pos: [w / 4, 0, 0], noOutline: true }); f.add(pp); f.position.y = .05; f.visible = false; g.add(f); flips.push(f); }
  g.open = k => { L.rotation.z = (1 - k) * P / 2 * .98; R.rotation.z = -(1 - k) * P / 2 * .98; };
  g.flip = (t, speed = 3) => flips.forEach((f, i) => { const ph = ((t * speed + i / 4) % 1); f.visible = speed > 0; f.rotation.z = ph * P; });
  return g;
}
export function sled(o = {}) {
  const g = new THREE.Group();
  g.add(box(.7, .08, 1.5, RED, { pos: [0, .32, 0] }));
  for (const s of [-1, 1]) { g.add(box(.05, .3, .05, 0x5a3a22, { pos: [s * .3, .17, .5] })); g.add(box(.05, .3, .05, 0x5a3a22, { pos: [s * .3, .17, -.5] }));
    const run = new THREE.Mesh(new THREE.TorusGeometry(.18, .025, 6, 14, P), toon(0xb8b8c0)); run.position.set(s * .3, .2, .78); run.rotation.y = P / 2; g.add(run);
    g.add(box(.05, .05, 1.6, 0xb8b8c0, { pos: [s * .3, .03, 0] })); }
  g.add(box(.7, .3, .06, RED, { pos: [0, .45, -.72] }));
  return core.outline(g, .015);
}
export function mug(o = {}) {
  const g = new THREE.Group(); g.add(cyl(.09, .08, .2, o.color ?? RED, { pos: [0, .1, 0] })); g.add(cyl(.08, .08, .01, 0x5a3020, { pos: [0, .19, 0], noOutline: true }));
  const hd = new THREE.Mesh(new THREE.TorusGeometry(.055, .015, 6, 12), toon(o.color ?? RED)); hd.position.set(.1, .1, 0); g.add(hd);
  core.outline(g, .01);
  const steam = []; for (let i = 0; i < 3; i++) { const s = glowSprite(0xffffff, .14, .35); s.position.set(0, .25 + i * .1, 0); g.add(s); steam.push(s); }
  g.update = t => steam.forEach((s, i) => { const ph = (t * .6 + i / 3) % 1; s.position.set(Math.sin(t * 2 + i) * .03, .22 + ph * .35, 0); s.material.opacity = .35 * (1 - ph); s.scale.setScalar(.1 + ph * .15); });
  return g;
}
export function gift(o = {}) {
  const s = o.s ?? .4, col = o.color ?? RED, rib = o.ribbon ?? GOLD; const g = new THREE.Group();
  g.add(box(s, s * .8, s, col, { pos: [0, s * .4, 0] })); g.add(box(s * 1.02, s * .82, s * .14, rib, { pos: [0, s * .4, 0], noOutline: true })); g.add(box(s * .14, s * .82, s * 1.02, rib, { pos: [0, s * .4, 0], noOutline: true }));
  for (const r of [-.6, .6]) g.add(mesh(new THREE.TorusGeometry(s * .14, s * .04, 6, 12), rib, { pos: [r * s * .2, s * .86, 0], rot: [0, 0, r], noOutline: true }));
  return core.outline(g, .012);
}
export function bauble(col, r = .5) { const g = new THREE.Group(); const b = sph(r, col, { seg: 28, mat: { emissive: new THREE.Color(col), emissiveIntensity: .1 } }); g.add(b); g.add(cyl(r * .22, r * .22, r * .2, GOLD, { pos: [0, r * 1.02, 0] })); g.add(mesh(new THREE.TorusGeometry(r * .1, r * .03, 6, 12), GOLD, { pos: [0, r * 1.18, 0] }));
  const hl = sph(r * .18, 0xffffff, { pos: [-r * .4, r * .45, r * .7], noOutline: true }); hl.material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .6 }); g.add(hl); g.ball = b; return core.outline(g, .02); }
export function candleRow(n, len, o = {}) {
  const g = new THREE.Group(); const flames = [];
  for (let i = 0; i < n; i++) { const x = n > 1 ? -len / 2 + i * len / (n - 1) : 0; const col = o.cols ? o.cols[i] : 0xf2ead8; const h = o.h ?? .3;
    g.add(cyl(.035, .035, h, col, { pos: [x, (o.y ?? 0) + h / 2 + (o.lift ? o.lift(i) : 0), 0] }));
    const f = new THREE.Group(); f.position.set(x, (o.y ?? 0) + h + .05 + (o.lift ? o.lift(i) : 0), 0); g.add(f);
    const fl = new THREE.Mesh(new THREE.SphereGeometry(.03, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffc040 })); fl.scale.set(.7, 1.6, .7); f.add(fl); f.add(glowSprite(0xffb040, .35, .7)); f.visible = false; flames.push(f); }
  g.flames = flames; const pl = new THREE.PointLight(0xffb060, 0, 6); pl.position.y = .8; g.add(pl);
  g.light = (k, t) => { const on = Math.round(k * n); flames.forEach((f, i) => { f.visible = i < on; f.scale.setScalar(1 + Math.sin(t * 13 + i) * .1); }); pl.intensity = on * (o.glow ?? .5); };
  return g;
}
export function menorah() {
  const g = new THREE.Group(); const G = 0xd8a830;
  g.add(cyl(.12, .16, .06, G, { pos: [0, .03, 0] })); g.add(cyl(.025, .025, .5, G, { pos: [0, .3, 0] }));
  for (let i = 1; i <= 4; i++) { const arc = new THREE.Mesh(new THREE.TorusGeometry(i * .085, .014, 5, 20, P), toon(G)); arc.rotation.z = P; arc.position.y = .5; g.add(arc); }
  g.add(box(.8, .03, .04, G, { pos: [0, .5, 0] }));
  const row = candleRow(9, .68, { y: .51, h: .14, lift: i => (i === 4 ? .08 : 0), glow: .35 }); g.add(row); g.row = row;
  return core.outline(g, .01), g;
}
export function kinara() {
  const g = new THREE.Group(); g.add(box(.9, .1, .18, 0x5a3a22, { pos: [0, .05, 0] }));
  for (let i = 0; i < 7; i++) g.add(cyl(.04, .05, .1, 0x5a3a22, { pos: [-.39 + i * .13, .14 - Math.abs(i - 3) * .0, 0] }));
  const cols = [RED, RED, RED, 0x1a1a1a, GREEN, GREEN, GREEN];
  const row = candleRow(7, .78, { y: .19, h: .3, cols, lift: i => (3 - Math.abs(i - 3)) * .03, glow: .35 }); g.add(row); g.row = row; return g;
}
export function lantern(col = 0xe8b040) {
  const g = new THREE.Group(); g.add(cyl(.12, .14, .3, col, { pos: [0, .15, 0], seg: 8 })); g.add(mesh(new THREE.ConeGeometry(.15, .15, 8), col, { pos: [0, .37, 0] }));
  const gl = glowSprite(0xffc060, .8, .7); gl.position.y = .15; g.add(gl); core.outline(g, .01); return g;
}
export function crescent(r = 2) { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#fff2c0'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(180, 100, 108, 0, 7); x.fill();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), new THREE.MeshBasicMaterial({ map: tex, transparent: true, fog: false, depthWrite: false })); }
export function roast(s = .4) { const g = new THREE.Group(); g.add(cyl(s * 1.2, s * 1.1, .05, 0xd8d0c0, { pos: [0, .025, 0] })); const m = sph(s * .7, 0x9a5a2a, { scale: [1.3, .7, .9], pos: [0, s * .45, 0] }); g.add(m); g.add(cyl(.03, .03, s * .8, 0xf2ead8, { pos: [s * .9, s * .5, 0], rot: [0, 0, P / 2.6] })); for (let i = 0; i < 4; i++) g.add(sph(s * .14, [GREEN, RED, 0xe89a30, GREEN][i], { pos: [Math.cos(i * 1.6) * s * .95, s * .12, Math.sin(i * 1.6) * s * .85], noOutline: true })); return core.outline(g, .012); }
export function mistletoe() { const g = new THREE.Group(); for (let i = 0; i < 9; i++) { const l = mesh(new THREE.SphereGeometry(.09, 8, 6), 0x5a8a3a, { scale: [.5, .2, 1.3] }); l.position.set(Math.cos(i * .7) * .12, -i * .02, Math.sin(i * .7) * .12); l.rotation.y = i * .7; g.add(l); } for (let i = 0; i < 6; i++) g.add(sph(.03, 0xf4f4ee, { pos: [Math.cos(i) * .06, -.08, Math.sin(i) * .06], noOutline: true })); g.add(box(.08, .06, .02, RED, { pos: [0, .06, 0] })); g.add(cyl(.004, .004, 1.5, 0x2a2a2a, { pos: [0, .8, 0], noOutline: true })); return core.outline(g, .01); }
export function logProp(len = 4, r = .4) { const g = new THREE.Group(); const l = cyl(r, r * 1.05, len, 0x6a4a2e, { seg: 14, rot: [0, 0, P / 2] }); g.add(l); for (const s of [-1, 1]) g.add(cyl(r * .92, r * .92, .02, 0xc8a070, { pos: [s * len / 2, 0, 0], rot: [0, 0, P / 2], noOutline: true })); g.add(box(.1, .3, .1, 0x4a3a1e, { pos: [.6, r, 0], rot: [0, 0, .4] })); return core.outline(g, .015); }
export function fire(o = {}) {
  const g = new THREE.Group(); const s = o.s ?? 1;
  for (let i = 0; i < 5; i++) g.add(cyl(.06 * s, .08 * s, .8 * s, 0x4a2e1c, { pos: [0, .08 * s, 0], rot: [P / 2 - .3, i * 1.25, 0], seg: 6 }));
  const flames = []; for (let i = 0; i < 6; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(.18 * s * (1 - i * .1), .7 * s * (1 - i * .08), 8), new THREE.MeshBasicMaterial({ color: [0xffd040, 0xff9a20, 0xff6a10][i % 3], transparent: true, opacity: .9 })); f.position.set(Math.cos(i * 2.2) * .1 * s, .35 * s, Math.sin(i * 2.2) * .1 * s); g.add(f); flames.push(f); }
  const glow = glowSprite(0xff9a40, 3 * s, .6); glow.position.y = .5 * s; g.add(glow);
  const pl = new THREE.PointLight(0xff9a50, (o.i ?? 12) * s, 14 * s); pl.position.y = 1 * s; g.add(pl);
  g.update = t => { flames.forEach((f, i) => { const k = 1 + Math.sin(t * (9 + i) + i * 2) * .18; f.scale.set(1, k, 1); f.rotation.z = Math.sin(t * 5 + i) * .12; }); pl.intensity = (o.i ?? 12) * s * (.85 + Math.sin(t * 17) * .08 + Math.sin(t * 7) * .07); };
  return g;
}
export function bell(col = GOLD) { const g = new THREE.Group(); const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push(new THREE.Vector2(.08 + Math.pow(u, 2.2) * .42, .6 - u * .6)); } g.add(mesh(new THREE.LatheGeometry(pts, 24), col, { mat: { emissive: new THREE.Color(col), emissiveIntensity: .2 } })); g.add(sph(.08, 0x8a6a1a, { pos: [0, -.04, 0] })); g.add(mesh(new THREE.TorusGeometry(.07, .025, 6, 12), col, { pos: [0, .66, 0] })); return core.outline(g, .015); }
export function broom() { const g = new THREE.Group(); g.add(cyl(.025, .03, 1.8, 0x6a4a2a, { rot: [0, 0, P / 2], seg: 6 })); const b = mesh(new THREE.ConeGeometry(.22, .6, 10), 0xc8a050, { pos: [-1.1, 0, 0], rot: [0, 0, -P / 2] }); g.add(b); return core.outline(g, .012); }
export function coinBag() { const g = new THREE.Group(); g.add(sph(.15, 0x8a6a3a, { scale: [1, 1.1, 1], pos: [0, .15, 0] })); g.add(cyl(.05, .08, .08, 0x8a6a3a, { pos: [0, .31, 0] })); g.add(cyl(.06, .06, .02, GOLD, { pos: [0, .3, 0], noOutline: true })); return core.outline(g, .01); }
export function frame(w, h, draw) {
  const g = new THREE.Group(); const tex = new THREE.CanvasTexture((() => { const c = document.createElement('canvas'); c.width = 800; c.height = Math.round(800 * h / w); draw(c.getContext('2d'), c); return c; })()); tex.colorSpace = THREE.SRGBColorSpace;
  const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex })); g.add(pic);
  const G = 0xc8a040; for (const [x, y, ww, hh] of [[0, h / 2 + .06, w + .24, .12], [0, -h / 2 - .06, w + .24, .12], [-w / 2 - .06, 0, .12, h], [w / 2 + .06, 0, .12, h]]) g.add(box(ww, hh, .08, G, { pos: [x, y, .02] }));
  return g;
}
export function signBoard(text, o = {}) { const g = new THREE.Group(); const c = props.card(text, { h: o.h ?? .6, cw: 700, ch: 320, size: o.size ?? 110, bg: o.bg ?? '#efe2c0', color: o.color ?? '#8a1a1a' }); c.position.z = .03; g.add(c); g.add(box((o.h ?? .6) * 700 / 320 + .08, (o.h ?? .6) + .08, .05, 0x5a3a22)); return g; }
export function fireworks(k, o = {}) {
  const bursts = (o.at ?? [[-6, 12, -20, 1], [5, 14, -24, 2], [0, 16, -30, 3.2], [-9, 15, -26, 4.1], [8, 12, -22, 5]]).map(([x, y, z, t0], j) => {
    const n = 80, pos = new Float32Array(n * 3), dir = []; const r = rng(j + 9);
    for (let i = 0; i < n; i++) { const a = r() * P * 2, b = Math.acos(2 * r() - 1); dir.push([Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)]); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: [0xffd040, 0xff4060, 0x60c0ff, 0x80ff80, 0xffffff][j % 5], size: .35, transparent: true, fog: false, depthWrite: false, blending: THREE.AdditiveBlending });
    const p = new THREE.Points(g, m); p.position.set(x, y, z); p.frustumCulled = false; k.scene.add(p);
    return { p, pos, dir, t0, g, m };
  });
  return { update: t => bursts.forEach(b => { const tt = ((t - b.t0) % 3.4 + 3.4) % 3.4; const on = t >= b.t0; const rr = ease(clamp(tt / 1.2)) * 5;
    b.dir.forEach((d, i) => { b.pos[i * 3] = d[0] * rr; b.pos[i * 3 + 1] = d[1] * rr - tt * tt * .5; b.pos[i * 3 + 2] = d[2] * rr; }); b.g.attributes.position.needsUpdate = true; b.m.opacity = on ? clamp(1.6 - tt / 1.4) : 0; }) };
}

// ---------------------------------------------------------------- sets
export function sandGround(k, o = {}) {
  const g = new THREE.PlaneGeometry(500, 500, 120, 120); const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); const d = Math.hypot(x, y + (o.clearZ ?? 0)); pos.setZ(i, (Math.sin(x * .05) * 2.2 + Math.cos(y * .04 + x * .02) * 1.6) * clamp((d - (o.flat ?? 14)) / 25)); }
  g.computeVertexNormals(); const m = mesh(g, o.color ?? 0xd8b880, { cast: false, noOutline: true }); m.rotation.x = -P / 2; k.scene.add(m); return m;
}
export function stoneHouse(o = {}) {
  const g = new THREE.Group(); const w = o.w ?? 4, h = o.h ?? 3, d = o.d ?? 4; const col = o.color ?? 0xd8c8a0;
  g.add(box(w, h, d, col, { pos: [0, h / 2, 0] })); g.add(box(w + .2, .2, d + .2, new THREE.Color(col).offsetHSL(0, 0, -.08).getHex(), { pos: [0, h + .1, 0] }));
  g.add(box(.9, 1.7, .05, 0x3a2a1e, { pos: [-w * .2, .85, d / 2 + .02], noOutline: true }));
  const wm = new THREE.MeshBasicMaterial({ color: o.lit ? 0xffb050 : 0x2a2018 }); const wi = new THREE.Mesh(new THREE.PlaneGeometry(.6, .6), wm); wi.position.set(w * .22, h * .62, d / 2 + .02); g.add(wi);
  return g;
}
export function desert(k, o = {}) {
  const env = o.env ?? 'night';
  core.setEnv(k, env, { fogNear: 40, fogFar: 260, shadowSize: 30, ...(env === 'night' ? { sunI: 1.6, ambI: 1.6, sunPos: [-20, 40, 30] } : {}), ...(o.envO || {}) });
  sandGround(k, { color: env === 'night' ? 0x9a8a78 : 0xd8b880, flat: o.flat ?? 14 });
  const ups = [];
  if (o.town !== false) { const r = rng(5); for (let i = 0; i < (o.houses ?? 14); i++) { const x = (o.townX ?? 0) + (i % 7 - 3) * 5.2 + r() * 1.5, z = (o.townZ ?? -26) - Math.floor(i / 7) * 6 - r() * 2; const hs = stoneHouse({ w: 3.5 + r() * 2, h: 2.6 + r() * 2, d: 3.5 + r(), color: o.white ? 0xf2efe6 : [0xd8c8a0, 0xcab890, 0xe0d0b0][i % 3], lit: env === 'night' && i % 3 === 0 }); hs.position.set(x, 0, z); k.scene.add(hs); } }
  const r = rng(8); for (let i = 0; i < (o.palms ?? 6); i++) { const p = props.palm(); p.position.set((r() - .5) * 50, 0, -14 - r() * 20); p.scale.setScalar(1.2 + r() * .4); k.scene.add(p); }
  let star = null;
  if (o.star !== false) { star = new THREE.Group(); const core_ = glowSprite(0xffffff, 6, 1); const halo = glowSprite(0xbfd8ff, 22, .55); star.add(halo, core_);
    for (let i = 0; i < 4; i++) { const ray = glowSprite(0xffffff, 1, .8); ray.scale.set(i % 2 ? 1.2 : 26, i % 2 ? 26 : 1.2, 1); star.add(ray); }
    star.position.set(...(o.starPos ?? [6, 55, -120])); k.scene.add(star); ups.push({ update: t => star.children.forEach((c, i) => { if (i > 1) c.material.opacity = .55 + Math.sin(t * 2 + i) * .2; }) }); }
  return { star, update: t => ups.forEach(u => u.update(t)) };
}
export function stable(k, o = {}) {
  core.setEnv(k, 'night', { noFog: true, shadowSize: 10, sunI: .5, ambI: .9, sunPos: [6, 10, 12] });
  const g = new THREE.Group(); k.scene.add(g); const W = 0x7a5432, D = 0x5a3a22;
  sandGround(k, { color: 0x6a5a48, flat: 30 });
  g.add(box(9, .05, 6, 0xc8a050, { pos: [0, .03, -1], noOutline: true }));     // straw floor
  g.add(box(9, 3.6, .2, W, { pos: [0, 1.8, -4] }));
  for (const s of [-1, 1]) g.add(box(.2, 3.6, 6, W, { pos: [s * 4.5, 1.8, -1] }));
  for (let i = 0; i < 9; i++) g.add(box(.06, 3.5, .05, D, { pos: [-4 + i, 1.8, -3.88], noOutline: true }));
  const roof = box(10, .2, 7.2, D, { pos: [0, 3.9, -1], rot: [.12, 0, 0] }); g.add(roof); g.add(box(10, .3, 7.4, 0xc8a050, { pos: [0, 4.1, -1], rot: [.12, 0, 0] }));
  for (const x of [-4.4, 4.4]) g.add(box(.3, 3.8, .3, D, { pos: [x, 1.9, 2] }));
  const manger = new THREE.Group(); manger.add(box(1.3, .5, .7, D, { pos: [0, .55, 0] })); for (const [x, z] of [[-.55, .25], [.55, .25], [-.55, -.25], [.55, -.25]]) manger.add(box(.08, .5, .08, D, { pos: [x, .25, z] })); manger.add(box(1.25, .1, .65, 0xe0b850, { pos: [0, .82, 0], noOutline: true }));
  const baby = new THREE.Group(); baby.add(sph(.22, 0xf2ece0, { scale: [1.6, .7, .8], pos: [0, .9, 0] })); baby.add(sph(.13, 0xf7f3ea, { pos: [.33, .95, 0] })); baby.add(glowSprite(0xffe8b0, 1.6, .55)); baby.children[2].position.set(0, 1.0, 0); manger.add(baby);
  core.outline(manger, .015); manger.position.set(0, 0, -1.2); g.add(manger);
  for (let i = 0; i < 6; i++) { const b = box(.9, .5, .6, 0xd0a848, { pos: [3.6, .25 + (i % 2) * .5, -3.3 + Math.floor(i / 2) * .62 - .2] }); g.add(b); }
  const lan = lantern(0x3a2a1e); lan.position.set(-2.4, 2.6, -3.8); g.add(lan);
  const pl = new THREE.PointLight(0xffb060, 8, 14); pl.position.set(-1.5, 2.6, -1); pl.castShadow = true; k.scene.add(pl);
  const pl2 = new THREE.PointLight(0xffe0b0, 1.5, 4); pl2.position.set(0, 1.4, -1); k.scene.add(pl2);
  core.outline(g, .015);
  return { manger, update: t => { pl.intensity = 8 + Math.sin(t * 9) * .6; } };
}
export function forest(k, o = {}) {
  core.setEnv(k, o.env ?? 'night', { fogNear: 25, fogFar: 140, shadowSize: 24, sunPos: o.sunPos ?? [-20, 40, 25], fill: .8, ...(o.envO || {}) });
  snowGround(k, { flat: o.flat ?? 9, clearX: o.clearX ?? 0, clearZ: o.clearZ ?? 0 });
  const r = rng(o.seed ?? 21);
  for (let i = 0; i < (o.n ?? 60); i++) { const a = r() * P * 2, d = (o.r0 ?? 11) + r() * 40; const p = pine(4 + r() * 7, { seed: i }); p.position.set(Math.cos(a) * d + (o.clearX ?? 0), 0, Math.sin(a) * d - (o.clearZ ?? 0)); k.scene.add(p); }
  const ups = [];
  if (o.snow !== false) ups.push(snowfall(k, { r: 18, center: [o.clearX ?? 0, 0, -(o.clearZ ?? 0)] }));
  return { update: t => ups.forEach(u => u.update(t)) };
}
export function longhall(o = {}) {
  const g = new THREE.Group(); const L = o.L ?? 16, W = o.W ?? 7, H = o.H ?? 3; const wood = 0x6a4a2e;
  g.add(box(W, H, L, wood, { pos: [0, H / 2, 0] }));
  for (let i = 0; i < 14; i++) g.add(box(.05, H, .1, 0x4a3420, { pos: [W / 2 + .03, H / 2, -L / 2 + .6 + i * 1.15], noOutline: true }));
  for (const s of [-1, 1]) { const rf = box(W * .72, .3, L + 1, 0x5a3a24, { pos: [s * W * .27, H + 1.2, 0], rot: [0, 0, -s * .62] }); g.add(rf); const sn = box(W * .72, .2, L + 1.1, SNOW, { pos: [s * W * .27, H + 1.42, 0], rot: [0, 0, -s * .62], noOutline: true }); g.add(sn); }
  for (const z of [L / 2 + .3, -L / 2 - .3]) { for (const s of [-1, 1]) { const dr = box(.15, 1.6, .15, 0x4a3420, { pos: [s * .35, H + 2.6, z], rot: [0, 0, s * .5] }); g.add(dr); } g.add(sph(.18, 0x4a3420, { pos: [0, H + 3.2, z] })); }
  g.add(box(1.4, 2.2, .1, 0x3a2414, { pos: [0, 1.1, L / 2 + .03] }));
  const smoke = []; for (let i = 0; i < 6; i++) { const s = glowSprite(0x9a9aa8, 1.5, .25); s.material.blending = THREE.NormalBlending; g.add(s); smoke.push(s); }
  g.update = t => smoke.forEach((s, i) => { const ph = (t * .15 + i / 6) % 1; s.position.set(Math.sin(t * .5 + i) * .4, H + 2.4 + ph * 5, 0); s.material.opacity = .35 * (1 - ph); s.scale.setScalar(1 + ph * 3); });
  core.outline(g, .02); return g;
}
export function hallInterior(k, o = {}) {
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 14, sunPos: [3, 9, 6], fill: .5, sunI: .6 });
  k.scene.background = new THREE.Color(0x1a120c);
  const g = new THREE.Group(); k.scene.add(g); const L = o.L ?? 18, W = o.W ?? 9, H = o.H ?? 6;
  g.add(mesh(new THREE.PlaneGeometry(W, L), o.floor ?? 0x6a5040, { rot: [-P / 2, 0, 0], noOutline: true, cast: false }));
  const wall = o.wall ?? 0x7a5a3e;
  for (const s of [-1, 1]) g.add(mesh(new THREE.PlaneGeometry(L, H), wall, { pos: [s * W / 2, H / 2, 0], rot: [0, -s * P / 2, 0], noOutline: true, cast: false }));
  g.add(mesh(new THREE.PlaneGeometry(W, H), wall, { pos: [0, H / 2, -L / 2], noOutline: true, cast: false }));
  for (let i = 0; i < 7; i++) { const z = -L / 2 + 1.5 + i * (L - 3) / 6; for (const s of [-1, 1]) g.add(box(.3, H, .3, 0x4a3420, { pos: [s * (W / 2 - .2), H / 2, z] })); g.add(box(W, .3, .3, 0x4a3420, { pos: [0, H - .2, z] })); }
  const ups = [];
  if (o.hearth !== false) { g.add(box(3, 2.4, .8, 0x6a6a6a, { pos: [0, 1.2, -L / 2 + .4] })); g.add(box(1.8, 1.3, .2, 0x1a1210, { pos: [0, .75, -L / 2 + .75], noOutline: true })); const f = fire({ s: .8, i: 10 }); f.position.set(0, .15, -L / 2 + 1.0); g.add(f); ups.push(f); }
  if (o.banners !== false) [-1, 1].forEach((s, i) => { for (let j = 0; j < 3; j++) g.add(box(.9, 2, .04, [RED, GREEN, 0x2a3a8a][(i + j) % 3], { pos: [s * (W / 2 - .05), H * .6, -L / 2 + 3 + j * 4.5], rot: [0, -s * P / 2, 0] })); });
  for (let i = 0; i < 4; i++) { const pl = new THREE.PointLight(0xffb060, 5, 10); pl.position.set(i % 2 ? 3 : -3, 3.4, -L / 2 + 3 + i * 3.5); g.add(pl); const tch = new THREE.Group(); tch.add(cyl(.05, .06, .5, 0x3a2a1a)); const fl = glowSprite(0xffa040, .8, .9); fl.position.y = .35; tch.add(fl); tch.position.set((i % 2 ? 1 : -1) * (W / 2 - .3), 3.3, -L / 2 + 3 + i * 3.5); g.add(tch); }
  return { g, L, W, H, update: t => ups.forEach(u => u.update(t)) };
}
export function feastTable(len, o = {}) {
  const g = new THREE.Group(); const t = props.table(len, 1.4, { color: 0x6a4a2e }); g.add(t);
  g.add(box(len - .2, .02, 1.3, o.cloth ?? 0xe8dcc0, { pos: [0, .83, 0], noOutline: true }));
  const r = rng(o.seed ?? 3); for (let i = 0; i < Math.floor(len / 1.1); i++) { const x = -len / 2 + .6 + i * 1.1; const it = i % 3 === 0 ? roast(.3) : i % 3 === 1 ? candleRow(1, 0, { h: .25 }) : core.group(cyl(.18, .14, .1, 0xc8a040, { pos: [0, .05, 0] }), sph(.08, RED, { pos: [0, .14, 0], noOutline: true }), sph(.08, GREEN, { pos: [.08, .14, .05], noOutline: true })); it.position.set(x, .84, (r() - .5) * .3); g.add(it); if (it.light) it.light(1, 0); }
  return g;
}
export function benchRow(len) { return box(len, .45, .45, 0x5a3a24, { pos: [0, .225, 0] }); }
export function domeChurch(o = {}) {
  const g = new THREE.Group(); const C = o.color ?? 0xe8dcc8;
  g.add(box(30, 14, 8, C, { pos: [0, 7, 0] }));
  for (let i = 0; i < 8; i++) g.add(cyl(.6, .65, 11, 0xf2ead8, { pos: [-12.25 + i * 3.5, 5.5, 4.5], seg: 14 }));
  g.add(box(31, 1.6, 1.4, 0xf2ead8, { pos: [0, 11.8, 4.5] }));
  const tri = new THREE.Shape(); tri.moveTo(-9, 0); tri.lineTo(0, 4); tri.lineTo(9, 0); tri.lineTo(-9, 0); g.add(mesh(new THREE.ExtrudeGeometry(tri, { depth: 1, bevelEnabled: false }), 0xf2ead8, { pos: [0, 12.6, 4] }));
  g.add(cyl(9, 9, 7, C, { pos: [0, 18, -10], seg: 32 }));
  g.add(mesh(new THREE.SphereGeometry(9.2, 32, 16, 0, P * 2, 0, P / 2), 0x8aa0a8, { pos: [0, 21.5, -10] }));
  g.add(cyl(1.2, 1.4, 3, C, { pos: [0, 32, -10] })); g.add(mesh(new THREE.ConeGeometry(1.2, 2, 12), 0x8aa0a8, { pos: [0, 34.5, -10] }));
  const wm = new THREE.MeshBasicMaterial({ color: 0xffc06a }); for (let i = 0; i < 6; i++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.4), wm); w.position.set(-10 + i * 4, 8, 4.02); g.add(w); }
  core.outline(g, .05); return g;
}
export function churchInterior(k, o = {}) {
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 10, sunPos: [3, 8, 6], sunI: .35, fill: .35 });
  k.scene.background = new THREE.Color(0x120c08);
  const g = new THREE.Group(); k.scene.add(g); const stone = 0x8a8070;
  g.add(mesh(new THREE.PlaneGeometry(16, 16), 0x6a6050, { rot: [-P / 2, 0, 0], noOutline: true, cast: false }));
  g.add(mesh(new THREE.PlaneGeometry(16, 8), stone, { pos: [0, 4, -5], noOutline: true, cast: false }));
  for (const s of [-1, 1]) g.add(mesh(new THREE.PlaneGeometry(16, 8), stone, { pos: [s * 6, 4, 0], rot: [0, -s * P / 2, 0], noOutline: true, cast: false }));
  for (const x of [-3.5, 0, 3.5]) { const a = new THREE.Mesh(new THREE.TorusGeometry(1.4, .18, 8, 20, P), toon(0x6a6050)); a.position.set(x, 3.4, -4.9); g.add(a); g.add(box(.36, 3.4, .36, 0x6a6050, { pos: [x - 1.4, 1.7, -4.9] })); g.add(box(.36, 3.4, .36, 0x6a6050, { pos: [x + 1.4, 1.7, -4.9] })); }
  const win = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.6), new THREE.MeshBasicMaterial({ color: 0x6a8ad8 })); win.position.set(0, 3.2, -4.95); g.add(win);
  const ups = []; for (const [x, z] of [[-1.6, -2.4], [1.6, -2.4], [-2.6, -1], [2.6, -1]]) { const c = candleRow(1, 0, { h: 1.0 }); c.position.set(x, 0, z); c.light(1, 0); g.add(c); ups.push(c); g.add(cyl(.12, .2, .05, GOLD, { pos: [x, .03, z] })); }
  const pl = new THREE.PointLight(0xffb060, 10, 12); pl.position.set(0, 2.2, -1); g.add(pl);
  return { g, update: t => { ups.forEach(c => c.light(1, t)); pl.intensity = 10 + Math.sin(t * 11) * .5; } };
}
export function cribScene() {
  const g = new THREE.Group(); g.add(box(1.6, .1, 1, 0x6a4a2e, { pos: [0, .05, 0] }));
  g.add(box(1.6, .9, .05, 0x7a5432, { pos: [0, .5, -.48] })); g.add(box(1.8, .06, 1.1, 0x5a3a22, { pos: [0, .96, -.1], rot: [.25, 0, 0] }));
  const fig = (col, x, z, h = .38) => { const f = new THREE.Group(); f.add(cyl(.06, .1, h, col, { pos: [0, h / 2, 0] })); f.add(sph(.06, 0xf7f3ea, { pos: [0, h + .05, 0] })); f.position.set(x, .1, z); g.add(f); return f; };
  fig(0x3a5aa8, -.35, -.1); fig(0x8a6a3a, .35, -.1, .42); g.add(box(.26, .1, .14, 0xd0a848, { pos: [0, .16, .05] }));
  return core.outline(g, .01);
}
export function northPole(k, o = {}) {
  core.setEnv(k, o.env ?? 'dusk', { fogNear: 40, fogFar: 200, shadowSize: 26, sunPos: [-60, 16, -40], ...(o.envO || {}) });
  snowGround(k, { flat: 12, color: 0xdde6f4 });
  const pole = new THREE.Group(); pole.add(cyl(.18, .18, 4, 0xffffff, { pos: [0, 2, 0] })); for (let i = 0; i < 8; i++) { const st = cyl(.185, .185, .25, RED, { pos: [0, .3 + i * .5, 0], noOutline: true }); st.rotation.z = .2; pole.add(st); } pole.add(sph(.32, GOLD, { pos: [0, 4.2, 0] }));
  const sg = signBoard('NORTH POLE', { h: .5, size: 100 }); sg.position.set(0, 3.1, .25); pole.add(sg); core.outline(pole, .02);
  const r = rng(33); for (let i = 0; i < 9; i++) { const ice = mesh(new THREE.ConeGeometry(2 + r() * 3, 3 + r() * 8, 5), 0xc8dcf0, { pos: [(r() - .5) * 120, 0, -40 - r() * 50], rot: [0, r() * 3, 0] }); k.scene.add(ice); }
  const aurora = new THREE.Mesh(new THREE.PlaneGeometry(260, 40, 60, 1), new THREE.MeshBasicMaterial({ color: 0x40ffb0, transparent: true, opacity: .18, side: THREE.DoubleSide, fog: false, blending: THREE.AdditiveBlending, depthWrite: false })); aurora.position.set(0, 60, -150); k.scene.add(aurora);
  const ap = aurora.geometry.attributes.position; const a0 = Float32Array.from(ap.array);
  const sf = snowfall(k, { r: 18, n: 900 });
  return { pole, update: t => { for (let i = 0; i < ap.count; i++) ap.setY(i, a0[i * 3 + 1] + Math.sin(a0[i * 3] * .03 + t * .8) * 6); ap.needsUpdate = true; sf.update(t); } };
}
export function sleigh(o = {}) {
  const g = new THREE.Group(); const C = o.color ?? RED;
  const shape = new THREE.Shape(); shape.moveTo(-1.2, 0); shape.lineTo(1.0, 0); shape.quadraticCurveTo(1.6, 0, 1.5, .9); shape.lineTo(1.1, .7); shape.lineTo(-.6, .7); shape.quadraticCurveTo(-1.1, 1.4, -1.4, 1.2); shape.lineTo(-1.2, 0);
  const side = new THREE.ExtrudeGeometry(shape, { depth: .08, bevelEnabled: false });
  for (const s of [-1, 1]) g.add(mesh(side, C, { pos: [0, .35, s * .6 - .04] }));
  g.add(box(2.4, .08, 1.2, C, { pos: [0, .45, 0] })); g.add(box(.7, .5, 1.1, 0x2a5a3a, { pos: [-.8, .75, 0] }));
  for (const s of [-1, 1]) { g.add(box(2.8, .06, .06, GOLD, { pos: [.1, .03, s * .55] })); const c = new THREE.Mesh(new THREE.TorusGeometry(.3, .03, 6, 12, P), toon(GOLD)); c.position.set(1.5, .33, s * .55); c.rotation.z = -P / 2; g.add(c); for (const x of [-.7, .7]) g.add(box(.05, .35, .05, GOLD, { pos: [x, .2, s * .55] })); }
  for (let i = 0; i < 3; i++) g.add(gift({ s: .35, color: [GREEN, 0x3a7ad8, GOLD][i], ribbon: i === 2 ? RED : GOLD, }).translateX(-.9 + i * .1).translateY(1).translateZ(-.3 + i * .3));
  g.rotation.y = 0; return core.outline(g, .018);
}
export function globe(k) {
  k.scene.background = new THREE.Color(0x02040c);
  const amb = new THREE.AmbientLight(0x8090c0, 1.4); k.scene.add(amb);
  const sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(-30, 10, 20); k.scene.add(sun);
  const g = new THREE.Group(); k.scene.add(g);
  const earth = new THREE.Mesh(new THREE.SphereGeometry(5, 64, 48), new THREE.MeshToonMaterial({ color: 0x2a5ab8, emissive: new THREE.Color(0x0a1a40) })); g.add(earth);
  const atm = glowSprite(0x4a8aff, 14, .35); k.scene.add(atm);
  const r = rng(77); const lights = []; const pts = [];
  for (let i = 0; i < 700; i++) { const u = r() * 2 - 1, a = r() * P * 2; const lat = Math.asin(u); if (Math.abs(lat) > 1.15) continue;
    if (Math.sin(a * 3 + lat * 4) + Math.cos(a * 2 - lat * 3) < -.2) continue;
    pts.push([Math.cos(lat) * Math.cos(a) * 5.03, u * 5.03, Math.cos(lat) * Math.sin(a) * 5.03, r()]); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pts.flatMap(p => p.slice(0, 3)), 3));
  const col = new Float32Array(pts.length * 3); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pm = new THREE.PointsMaterial({ size: .22, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }); const P2 = new THREE.Points(geo, pm); g.add(P2);
  const stars = props.stars(800, 600); k.scene.add(stars);
  return { g, update: t => { g.rotation.y = t * .08; pts.forEach((p, i) => { const on = clamp((t * 1.4 - p[3] * 4) * 2); const c = new THREE.Color().setHSL(.1 + (i % 5) * .02, 1, .45 * on + Math.sin(t * 3 + i) * .05 * on); col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }); geo.attributes.color.needsUpdate = true; } };
}
export function parlour(k, o = {}) {
  const r = interiorRoom(k, { w: 11, d: 9, h: 4.4, wall: o.wall ?? 0x5a7a6a, floor: 0x6a4a30, ...o });
  return r;
}
export function interiorRoom(k, o = {}) {
  core.setEnv(k, 'interior', { noFog: true, shadowSize: 12, sunPos: o.sunPos ?? [4, 9, 8], fill: o.fill ?? .5, sunI: o.sunI ?? .7 });
  k.scene.background = new THREE.Color(o.bg ?? 0x2a2018);
  const g = new THREE.Group(); k.scene.add(g); const w = o.w ?? 12, d = o.d ?? 9, h = o.h ?? 4;
  g.add(props.room(w, d, h, { wall: o.wall ?? 0xd8ccb0, floor: o.floor ?? 0x8a7458, sides: o.sides }));
  // wainscot + skirting + picture rail
  g.add(box(w, 1.1, .06, new THREE.Color(o.wall ?? 0xd8ccb0).offsetHSL(0, 0, -.12).getHex(), { pos: [0, .55, -d / 2 + .04], noOutline: true }));
  g.add(box(w, .08, .08, 0x5a3a22, { pos: [0, 1.12, -d / 2 + .06], noOutline: true })); g.add(box(w, .08, .08, 0x5a3a22, { pos: [0, h - .5, -d / 2 + .06], noOutline: true }));
  const ups = [];
  if (o.fireplace) { const fp = new THREE.Group(); fp.add(box(2.2, 1.5, .5, o.fpColor ?? 0xe8e0d0, { pos: [0, .75, 0] })); fp.add(box(1.3, 1.0, .1, 0x1a1210, { pos: [0, .5, .22], noOutline: true })); fp.add(box(2.5, .12, .7, 0x5a3a22, { pos: [0, 1.56, .05] })); const f = fire({ s: .5, i: 7 }); f.position.set(0, .05, .1); fp.add(f); ups.push(f);
    for (let i = 0; i < 3; i++) { const sk = box(.25, .45, .06, [RED, GREEN, RED][i], { pos: [-.6 + i * .6, 1.25, .3] }); fp.add(sk); } core.outline(fp, .015); fp.position.set(...(o.fpPos ?? [-3, 0, -d / 2 + .26])); g.add(fp); }
  if (o.window !== false) { const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2), new THREE.MeshBasicMaterial({ color: o.winColor ?? 0x24386a })); wn.position.set(o.winX ?? 3, 2.2, -d / 2 + .02); g.add(wn); g.add(box(1.8, .1, .2, 0xf2efe6, { pos: [o.winX ?? 3, 1.15, -d / 2 + .1] })); g.add(box(.06, 2, .05, 0xf2efe6, { pos: [o.winX ?? 3, 2.2, -d / 2 + .04], noOutline: true })); g.add(box(1.6, .06, .05, 0xf2efe6, { pos: [o.winX ?? 3, 2.2, -d / 2 + .04], noOutline: true })); }
  const pl = new THREE.PointLight(0xffe2b8, o.lampI ?? 5, 16); pl.position.set(0, h - .6, 0); g.add(pl);
  return { g, w, d, h, update: t => ups.forEach(u => u.update(t)) };
}
export function shopWindow(o = {}) {
  const g = new THREE.Group(); const w = 7, h = 4.5;
  g.add(box(w, h, .4, 0x5a2a2a, { pos: [0, h / 2, 0] }));
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.6), new THREE.MeshBasicMaterial({ color: 0xffd08a })); glass.position.set(-.6, 1.9, .21); g.add(glass);
  g.add(box(4.6, .12, .3, 0x3a1a1a, { pos: [-.6, .55, .3] })); g.add(box(1.2, 2.6, .05, 0x2a3a2a, { pos: [2.5, 1.3, .21] }));
  const sg = core.textPlane('TOY EMPORIUM', .55, { color: '#f2d28a', stroke: '#2b1e16', size: 90 }); sg.position.set(0, 3.8, .22); g.add(sg);
  core.outline(g, .02); return g;
}
export function waterPlane(k, o = {}) { const m = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), toon(o.color ?? 0x2a7ab0)); m.rotation.x = -P / 2; m.position.set(0, o.y ?? -.2, o.z ?? -120); m.userData.noOutline = true; k.scene.add(m); return m; }
