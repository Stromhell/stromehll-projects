// The History of Christmas (XM) · Flurry the snowman + winter sets
import { core, props, people, maps, ui, THREE, place, interior, popIn, bubble } from './tb_common.js';
export { core, props, people, maps, ui, THREE, place, interior, popIn, bubble };
const P = Math.PI;
const { box, cyl, sph, mesh, toon, clamp, ease, seg, rng } = core;

export const SNOW = 0xf4f7ff, COAL = 0x1c1a20, CARROT = 0xf0802a, RED = 0xc8282e, GREEN = 0x2f7a3e, GOLD = 0xe8b32a, TWIG = 0x5a3a22;

// ---------------------------------------------------------------- Flurry
// Original mascot: three-ball snowman, red/green knitted scarf, green bobble beanie,
// twig arms with three-finger hands, big cartoon eyes, carrot nose.
// update(t, {pose, dist, arm, mood, look, hat})
//  pose: idle | hop (dist = metres travelled) | slide | shiver | sweat | dizzy | drum | jump
//  arm : wave | waveBoth | shrug | point | hold | up | fan | flip | none
//  mood: happy | surprised | worried | wink | shock | proud
export function flurry(o = {}) {
  const root = new THREE.Group(); root.userData.person = true;
  const body = new THREE.Group(); root.add(body);
  const snowM = toon(SNOW, { mat: { emissive: new THREE.Color(0x24324a), emissiveIntensity: .25 } });
  const b0 = mesh(new THREE.SphereGeometry(.5, 32, 22), snowM); b0.scale.set(1, .9, 1); b0.position.y = .45; body.add(b0);
  const upper = new THREE.Group(); upper.position.y = .82; body.add(upper);       // bends for squash/lean
  const b1 = mesh(new THREE.SphereGeometry(.37, 30, 20), snowM); b1.scale.set(1, .92, 1); b1.position.y = .2; upper.add(b1);
  [.32, .17, .03].forEach(y => upper.add(sph(.042, COAL, { seg: 12, pos: [0, y, Math.sqrt(Math.max(0, .37 * .37 - ((y - .2) / .92) ** 2)) - .005] })));
  [.62, .42].forEach(y => body.add(sph(.048, COAL, { seg: 12, pos: [0, y, Math.sqrt(Math.max(0, .25 - ((y - .45) / .9) ** 2)) - .005] })));
  // head
  const head = new THREE.Group(); head.position.y = .63; head.scale.setScalar(1.18); upper.add(head);
  const h = mesh(new THREE.SphereGeometry(.29, 30, 20), snowM); h.position.y = .22; head.add(h);
  const face = new THREE.Group(); face.position.y = .22; head.add(face);
  const eyes = [], pupils = [];
  for (const s of [-1, 1]) {
    const e = sph(.095, 0xffffff, { seg: 20, noOutline: true }); e.scale.set(1, 1.2, .55); e.position.set(s * .1, .07, .255); face.add(e); eyes.push(e);
    const pu = sph(.05, COAL, { seg: 16, noOutline: true }); pu.scale.set(1, 1.15, .5); pu.position.set(s * .1, .065, .3); face.add(pu); pupils.push(pu);
    const hl = sph(.016, 0xffffff, { seg: 8, noOutline: true }); hl.position.set(.02, .03, .03); pu.add(hl);
  }
  const brows = [-1, 1].map(s => { const b = mesh(new THREE.CapsuleGeometry(.014, .07, 4, 8), TWIG, { noOutline: true }); b.rotation.z = P / 2; b.position.set(s * .1, .17, .265); face.add(b); return b; });
  const nose = mesh(new THREE.ConeGeometry(.05, .34, 16), CARROT); nose.rotation.x = P / 2 + .18; nose.position.set(0, -.03, .42); face.add(nose);
  // carrot ridges
  for (let i = 1; i < 4; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(.045 * (1 - i * .22), .006, 4, 14), toon(0xc8601a)); r.position.z = .27 - i * .055; r.userData.noOutline = true; nose.add(r); r.position.set(0, -.13 + i * .06, 0); r.rotation.x = P / 2; }
  // mouth: coal smile (arc of pebbles) + an open "O" for shock
  const smile = new THREE.Group(); face.add(smile);
  for (let i = 0; i < 7; i++) { const a = (i - 3) * .3; smile.add(sph(.024, COAL, { seg: 8, noOutline: true, pos: [Math.sin(a) * .16, -.13 + (1 - Math.cos(a)) * .22, Math.sqrt(.0841 - (Math.sin(a) * .16) ** 2 - (-.13 + (1 - Math.cos(a)) * .22) ** 2) + .004] })); }
  const oMouth = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 12), toon(0x3a1a20)); oMouth.scale.set(1, 1.3, .4); oMouth.position.set(0, -.13, .255); oMouth.visible = false; face.add(oMouth);
  const cheeks = [-1, 1].map(s => { const c = new THREE.Mesh(new THREE.CircleGeometry(.045, 16), new THREE.MeshBasicMaterial({ color: 0xff9aa8, transparent: true, opacity: .55 })); c.position.set(s * .17, -.05, .245); c.rotation.y = s * .55; face.add(c); return c; });
  // beanie
  const hatG = new THREE.Group(); hatG.position.y = .47; head.add(hatG);
  const beanie = new THREE.Group(); hatG.add(beanie);
  const bh = mesh(new THREE.SphereGeometry(.27, 24, 14, 0, P * 2, 0, P / 2), GREEN); bh.scale.set(1.04, .95, 1.04); bh.position.y = -.07; beanie.add(bh);
  const cuff = mesh(new THREE.TorusGeometry(.265, .045, 10, 28), RED); cuff.rotation.x = P / 2; cuff.position.y = -.06; beanie.add(cuff);
  const bob = sph(.07, SNOW, { seg: 14, pos: [0, .2, 0] }); beanie.add(bob);
  // santa hat (hidden until asked)
  const santa = new THREE.Group(); santa.visible = false; hatG.add(santa);
  const cone = mesh(new THREE.ConeGeometry(.26, .5, 22), RED); cone.position.set(0, .17, -.02); cone.rotation.x = -.35; santa.add(cone);
  const brim = mesh(new THREE.TorusGeometry(.26, .06, 10, 28), 0xffffff); brim.rotation.x = P / 2; brim.position.y = -.06; santa.add(brim);
  santa.add(sph(.075, 0xffffff, { seg: 14, pos: [0, .36, -.2] }));
  // scarf: knitted ring with stripes + two tails
  const scarf = new THREE.Group(); scarf.position.y = .56; upper.add(scarf);
  for (let i = 0; i < 2; i++) { const r = mesh(new THREE.TorusGeometry(.25, .065, 10, 30), i ? GREEN : RED); r.rotation.x = P / 2; r.position.y = i * .06 - .03; scarf.add(r); }
  const tails = [0, 1].map(i => { const g = new THREE.Group(); g.position.set(.14 - i * .07, -.02, .2); scarf.add(g);
    for (let j = 0; j < 4; j++) g.add(box(.12, .1, .035, j % 2 ? GREEN : RED, { pos: [0, -.06 - j * .1, 0] }));
    g.add(box(.12, .015, .04, 0xffffff, { pos: [0, -.44, 0], noOutline: true })); return g; });
  // twig arms
  const mkArm = s => {
    const pivot = new THREE.Group(); pivot.position.set(s * .33, .3, 0); upper.add(pivot);
    const st = cyl(.022, .03, .55, TWIG, { seg: 8 }); st.rotation.z = -s * P / 2; st.position.x = s * .27; pivot.add(st);
    const fore = new THREE.Group(); fore.position.x = s * .54; pivot.add(fore);
    const tw = cyl(.016, .022, .26, TWIG, { seg: 7 }); tw.rotation.z = -s * P / 2; tw.position.x = s * .12; fore.add(tw);
    [-.6, 0, .6].forEach(a => { const f = cyl(.009, .013, .12, TWIG, { seg: 6 }); f.geometry.translate(0, .06, 0); f.position.x = s * .24; f.rotation.z = -s * (P / 2 + a * .5); fore.add(f); });
    const side = cyl(.012, .016, .16, TWIG, { seg: 6 }); side.geometry.translate(0, .08, 0); side.position.x = s * .3; side.rotation.z = -s * .5; pivot.add(side);
    return { pivot, fore };
  };
  const armL = mkArm(-1), armR = mkArm(1);
  core.outline(root, .018);
  root.parts = { body, upper, head, face, eyes, pupils, brows, nose, smile, oMouth, beanie, santa, scarf, tails, armL, armR, b0 };
  const st = { pose: o.pose ?? 'idle', arm: o.arm ?? 'none', mood: o.mood ?? 'happy', phase: o.phase ?? 0 };
  root.state = st;
  const blink = 3.1 + (o.seed ?? 0) % 2;
  root.update = (t, opt = {}) => {
    const pose = opt.pose ?? st.pose, arm = opt.arm ?? st.arm, mood = opt.mood ?? st.mood;
    santa.visible = !!(opt.hat === 'santa' || (opt.hat == null && st.hat === 'santa')); beanie.visible = !santa.visible;
    body.position.set(0, 0, 0); body.rotation.set(0, 0, 0); upper.rotation.set(0, 0, 0); head.rotation.set(0, 0, 0);
    body.scale.set(1, 1, 1); upper.scale.set(1, 1, 1);
    const br = Math.sin(t * 2.2 + st.phase);
    upper.scale.y = 1 + br * .012; head.position.y = .63 + br * .006;
    upper.rotation.z = Math.sin(t * 1.1 + st.phase) * .04;
    head.rotation.y = Math.sin(t * .6 + st.phase) * .12; head.rotation.z = Math.sin(t * .9) * .04;
    // tails sway
    tails.forEach((g, i) => { g.rotation.x = .15 + Math.sin(t * 2.4 + i) * .08; g.rotation.z = Math.sin(t * 1.7 + i * 2) * .1; });
    if (pose === 'hop' || pose === 'jump') {
      // one hop per .55 m: anticipation squash, stretch in the air, squash on landing
      const hopLen = .55, d = opt.dist ?? 0; const ph = (d / hopLen) % 1;
      const moving = opt.moving ?? true;
      if (moving || pose === 'jump') {
        const p = pose === 'jump' ? (opt.jp ?? ((t * 1.6) % 1)) : ph;
        const air = Math.sin(clamp(p) * P); body.position.y = air * (pose === 'jump' ? .45 : .16);
        const sq = p < .12 ? 1 - (1 - p / .12) * .14 : p > .88 ? 1 - ((p - .88) / .12) * .14 : 1 + air * .06;
        body.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq));
        body.rotation.x = .08 * air; tails.forEach(g => g.rotation.x = .15 + air * .5);
      }
    } else if (pose === 'slide') {
      body.rotation.x = .12; upper.rotation.x = .1; tails.forEach((g, i) => { g.rotation.x = 1.0 + Math.sin(t * 9 + i) * .15; });
    } else if (pose === 'shiver') {
      body.position.x = Math.sin(t * 60) * .012; upper.rotation.z = Math.sin(t * 47) * .03;
    } else if (pose === 'dizzy') {
      upper.rotation.z = Math.sin(t * 4) * .12; head.rotation.y = Math.sin(t * 6) * .3; head.rotation.z = Math.cos(t * 4) * .1;
    } else if (pose === 'lean') {
      upper.rotation.x = .25; head.rotation.x = .15;
    }
    // arms (rotation.z at shoulder: + raises the right arm, - raises left)
    const A = (pv, z, y = 0, fz = 0) => { pv.pivot.rotation.set(0, y, z); pv.fore.rotation.set(0, 0, fz); };
    const rest = .55 + Math.sin(t * 1.4 + st.phase) * .05;
    A(armL, rest, 0, .2); A(armR, -rest, 0, -.2);
    if (arm === 'wave') { A(armR, .9, 0, .5 + Math.sin(t * 9) * .45); }
    if (arm === 'waveBoth') { A(armR, .9, 0, .5 + Math.sin(t * 9) * .45); A(armL, -.9, 0, -.5 - Math.sin(t * 9 + 1) * .45); }
    if (arm === 'shrug') { A(armL, -.25, -.5, -1.1); A(armR, .25, .5, 1.1); head.rotation.z = .12; }
    if (arm === 'point') { A(armR, -.05, -.9, 0); }
    if (arm === 'hold') { A(armL, .25, -1.1, .8); A(armR, -.25, 1.1, -.8); }
    if (arm === 'up') { A(armL, -1.0, 0, -.3); A(armR, 1.0, 0, .3); }
    if (arm === 'fan') { A(armR, .2, -1.2, 1.2 + Math.sin(t * 12) * .35); }
    if (arm === 'flip') { A(armL, .1, -1.2, .9); A(armR, -.1 + Math.sin(t * 14) * .15, 1.2, -.9); }
    if (arm === 'drum') { A(armL, .35, -1.2, .7 + Math.sin(t * 22) * .25); A(armR, -.35, 1.2, -.7 - Math.sin(t * 22 + 1.6) * .25); }
    if (arm === 'watch') { A(armL, .3, -1.2, 1.2); A(armR, -.2, 1.25, -.9); head.rotation.x = .25; head.rotation.y = .3; }
    if (arm === 'throw') { const k = opt.throwK ?? 0; A(armR, .6 - k * 1.4, -.4, .3); }
    // face
    const tb = (t + (o.seed ?? 0)) % blink, bk = tb < .2 ? 1 - Math.sin(tb / .2 * P) : 1;
    const eyeOpen = mood === 'surprised' || mood === 'shock' ? 1.25 : 1;
    eyes.forEach((e, i) => { const wink = mood === 'wink' && i === 1; e.scale.set(eyeOpen, 1.2 * eyeOpen * Math.max(.06, wink ? .08 : bk), .55); pupils[i].scale.set(1, 1.15 * Math.max(.06, wink ? .05 : bk), .5); });
    const L = opt.look2 ?? [Math.sin(t * .7) * .012, 0]; pupils.forEach((p, i) => { p.position.x = (i ? .1 : -.1) + L[0]; p.position.y = .065 + L[1]; });
    const bm = { happy: [.15, 0], surprised: [0, .05], shock: [0, .07], worried: [-.35, .01], wink: [.2, 0], proud: [-.15, 0] }[mood] ?? [0, 0];
    brows.forEach((b, i) => { b.rotation.z = P / 2 + (i ? -1 : 1) * bm[0]; b.position.y = .17 + bm[1]; });
    const open = mood === 'shock' || mood === 'surprised';
    oMouth.visible = open; smile.visible = !open; oMouth.scale.set(mood === 'shock' ? 1.2 : .8, mood === 'shock' ? 1.7 : 1.1, .4);
    nose.rotation.x = P / 2 + .18 + (mood === 'shock' ? .45 : 0);
    if (opt.look != null) head.rotation.y = opt.look;
    if (opt.noseDroop) nose.rotation.x = P / 2 + opt.noseDroop;
  };
  root.update(0);
  root.scale.setScalar(o.scale ?? .85);
  return root;
}

// ---------------------------------------------------------------- winter kit
export function snowGround(k, o = {}) {
  const size = o.size ?? 400;
  const g = new THREE.PlaneGeometry(size, size, 120, 120); const r = rng(o.seed ?? 4); const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); const dd = Math.hypot(x - (o.clearX ?? 0), y + (o.clearZ ?? 0));
    pos.setZ(i, (Math.sin(x * .21) * Math.cos(y * .17) * .18 + Math.sin(x * .07 + y * .05) * .3) * clamp((dd - (o.flat ?? 8)) / 10)); }
  g.computeVertexNormals();
  const m = mesh(g, o.color ?? 0xc8d0e4, { cast: false, noOutline: true, mat: { emissive: new THREE.Color(o.glow ?? 0x1a2238), emissiveIntensity: .12 } });
  m.rotation.x = -P / 2; k.scene.add(m); return m;
}
export function pine(h = 5, o = {}) {
  const g = new THREE.Group(); const r = rng(o.seed ?? 1);
  g.add(cyl(.12 * h / 5, .18 * h / 5, h * .2, 0x4a2e1c, { pos: [0, h * .1, 0], seg: 8 }));
  const n = 4;
  for (let i = 0; i < n; i++) {
    const w = h * (.36 - i * .07), y = h * (.2 + i * .19);
    g.add(mesh(new THREE.ConeGeometry(w, h * .34, 10), o.color ?? 0x1f5a3a, { pos: [0, y + h * .12, 0], rot: [0, r() * P, 0] }));
    if (o.snow !== false) g.add(mesh(new THREE.ConeGeometry(w * .72, h * .14, 10), SNOW, { pos: [0, y + h * .23, 0], rot: [0, r() * P, 0], noOutline: true }));
  }
  return g;
}
// decorated tree: baubles, star, light bulbs that twinkle (call g.update(t))
export function xmasTree(h = 4, o = {}) {
  const g = pine(h, { snow: false, color: 0x1e6a3a, seed: o.seed });
  const r = rng(o.seed ?? 7); const lights = [];
  const cols = o.colors ?? [RED, GOLD, 0x3a7ad8, 0xffffff, 0xe85aa8];
  for (let i = 0; i < (o.n ?? 46); i++) {
    const y = h * (.25 + r() * .66); const rad = h * .34 * (1 - (y / h - .2) / .85) + .05; const a = r() * P * 2;
    const c = cols[i % cols.length];
    const isLight = i % 2 === 0;
    const b = new THREE.Mesh(new THREE.SphereGeometry(isLight ? h * .016 : h * .03, 12, 8), isLight ? new THREE.MeshBasicMaterial({ color: c }) : toon(c, { mat: { emissive: new THREE.Color(c), emissiveIntensity: .25 } }));
    b.position.set(Math.cos(a) * rad, y, Math.sin(a) * rad); b.userData.noOutline = true; g.add(b); if (isLight) lights.push(b);
  }
  if (o.candles) for (let i = 0; i < 14; i++) { const y = h * (.3 + r() * .55); const rad = h * .34 * (1 - (y / h - .2) / .85) + .02; const a = r() * P * 2; const c = props.candle(); c.scale.setScalar(.35); c.position.set(Math.cos(a) * rad, y, Math.sin(a) * rad); g.add(c); }
  const star = mesh(starGeo(h * .09), GOLD, { mat: { emissive: new THREE.Color(GOLD), emissiveIntensity: .8 } }); star.position.y = h * 1.04; g.add(star); g.star = star;
  if (o.lit !== false) { const pl = new THREE.PointLight(0xffd29a, (o.glow ?? 6), h * 3); pl.position.y = h * .5; g.add(pl); }
  g.update = t => { lights.forEach((l, i) => { const on = .55 + .45 * Math.sin(t * 2.4 + i * 1.7); l.material.color.setHex(cols[(i * 2) % cols.length]).multiplyScalar(.5 + on * .7); }); star.rotation.y = t * .6; };
  return g;
}
export function starGeo(r) {
  const s = new THREE.Shape(); for (let i = 0; i < 10; i++) { const a = i / 10 * P * 2 + P / 2, rr = i % 2 ? r * .45 : r; s[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rr, Math.sin(a) * rr); }
  const g = new THREE.ExtrudeGeometry(s, { depth: r * .3, bevelEnabled: true, bevelSize: r * .06, bevelThickness: r * .06, bevelSegments: 1 }); g.center(); return g;
}
// cottage: walls, snowy pitched roof, chimney, warm windows, door, optional wreath
export function cottage(o = {}) {
  const w = o.w ?? 5, d = o.d ?? 4.5, h = o.h ?? 3.2; const r = rng(o.seed ?? 2);
  const wall = o.wall ?? [0xc9a27a, 0xb8735a, 0xd8c8a8, 0x8a9ab0][(o.seed ?? 0) % 4];
  const g = new THREE.Group();
  g.add(box(w, h, d, wall, { pos: [0, h / 2, 0] }));
  // timber trim
  for (const x of [-w / 2 + .08, w / 2 - .08]) g.add(box(.16, h, .16, 0x4a2e1c, { pos: [x, h / 2, d / 2 + .02], noOutline: true }));
  const roofH = h * .55;
  const shape = new THREE.Shape(); shape.moveTo(-w / 2 - .4, 0); shape.lineTo(0, roofH); shape.lineTo(w / 2 + .4, 0); shape.lineTo(-w / 2 - .4, 0);
  const roof = mesh(new THREE.ExtrudeGeometry(shape, { depth: d + .6, bevelEnabled: false }), o.roof ?? 0x6a3a2a); roof.position.set(0, h, -d / 2 - .3); g.add(roof);
  const sr = mesh(new THREE.ExtrudeGeometry(shape, { depth: d + .7, bevelEnabled: false }), SNOW, { noOutline: true }); sr.scale.set(1.02, 1.0, 1); sr.position.set(0, h + .12, -d / 2 - .35); g.add(sr);
  g.add(box(.6, 1.6, .6, 0x7a4a3a, { pos: [w * .25, h + roofH * .6, -d * .15] })); g.add(box(.7, .18, .7, SNOW, { pos: [w * .25, h + roofH * .6 + .82, -d * .15], noOutline: true }));
  const winM = new THREE.MeshBasicMaterial({ color: 0xffc46a });
  const wins = [];
  for (const x of [-w * .28, w * .28]) {
    const wn = new THREE.Mesh(new THREE.PlaneGeometry(.9, 1), winM.clone()); wn.position.set(x, h * .55, d / 2 + .015); g.add(wn); wins.push(wn);
    g.add(box(1.06, .1, .12, 0xf2efe6, { pos: [x, h * .55 - .55, d / 2 + .05], noOutline: true }));
    g.add(box(.06, 1, .03, 0x4a2e1c, { pos: [x, h * .55, d / 2 + .03], noOutline: true })); g.add(box(.9, .06, .03, 0x4a2e1c, { pos: [x, h * .55, d / 2 + .03], noOutline: true }));
    g.add(box(1.0, .12, .3, SNOW, { pos: [x, h * .55 - .5, d / 2 + .12], noOutline: true }));
  }
  g.add(box(1, 1.9, .08, o.door ?? [0x2f5a3a, 0x8a2a2a, 0x3a4a7a][(o.seed ?? 0) % 3], { pos: [0, .95, d / 2 + .04] }));
  if (o.wreath !== false) { const wr = mesh(new THREE.TorusGeometry(.22, .07, 8, 18), GREEN, { pos: [0, 1.55, d / 2 + .12] }); g.add(wr); g.add(sph(.05, RED, { pos: [0, 1.35, d / 2 + .16], noOutline: true })); }
  if (o.lights !== false) { const cols = [RED, GOLD, 0x3a7ad8, GREEN, 0xffffff]; const bulbs = [];
    for (let i = 0; i < 18; i++) { const x = -w / 2 - .3 + i / 17 * (w + .6); const b = new THREE.Mesh(new THREE.SphereGeometry(.07, 8, 6), new THREE.MeshBasicMaterial({ color: cols[i % 5] })); b.position.set(x, h - .05 - Math.sin(i / 17 * P * 3) ** 2 * .12, d / 2 + .32); g.add(b); bulbs.push(b); }
    g.bulbs = bulbs; }
  if (o.light !== false) { const pl = new THREE.PointLight(0xffb060, 3, 9); pl.position.set(0, 1.6, d / 2 + 1.5); g.add(pl); }
  g.update = t => { (g.bulbs || []).forEach((b, i) => b.visible = Math.sin(t * 3 + i * 1.3) > -.6); wins.forEach((wn, i) => wn.material.color.setHSL(.1, 1, .6 + Math.sin(t * 6 + i) * .02)); };
  return g;
}
export function lampPost(o = {}) {
  const g = new THREE.Group();
  g.add(cyl(.07, .1, 3.4, 0x1e2228, { pos: [0, 1.7, 0], seg: 10 }));
  g.add(box(.4, .5, .4, 0x1e2228, { pos: [0, 3.55, 0] }));
  const gl = new THREE.Mesh(new THREE.BoxGeometry(.3, .38, .3), new THREE.MeshBasicMaterial({ color: 0xffd890 })); gl.position.y = 3.55; g.add(gl);
  g.add(cyl(.0, .3, .25, 0x1e2228, { pos: [0, 3.92, 0], seg: 4 }));
  const pl = new THREE.PointLight(0xffc878, o.i ?? 5, 12); pl.position.y = 3.3; g.add(pl);
  return g;
}
// falling snow: deterministic in t; call .update(t)
export function snowfall(k, o = {}) {
  const n = o.n ?? 1600, R = o.r ?? 30, H = o.h ?? 18, c = o.center ?? [0, 0, 0]; const r = rng(o.seed ?? 3);
  const base = new Float32Array(n * 4); const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { base[i * 4] = (r() - .5) * 2 * R; base[i * 4 + 1] = r() * H; base[i * 4 + 2] = (r() - .5) * 2 * R; base[i * 4 + 3] = .6 + r() * .8; }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const tc = document.createElement('canvas'); tc.width = tc.height = 32; const x = tc.getContext('2d'); const gr = x.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 32, 32);
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: o.size ?? .09, map: new THREE.CanvasTexture(tc), transparent: true, depthWrite: false, color: 0xffffff, opacity: o.opacity ?? .9 }));
  pts.position.set(...c); pts.frustumCulled = false; k.scene.add(pts);
  pts.update = t => { for (let i = 0; i < n; i++) { const s = base[i * 4 + 3]; const y = ((base[i * 4 + 1] - t * s * (o.speed ?? 1.1)) % H + H) % H;
      pos[i * 3] = base[i * 4] + Math.sin(t * .8 * s + i) * .4; pos[i * 3 + 1] = y; pos[i * 3 + 2] = base[i * 4 + 2] + Math.cos(t * .6 * s + i) * .3; }
    g.attributes.position.needsUpdate = true; };
  pts.update(0); return pts;
}
// string of bulbs between two points with sag
export function bulbString(a, b, o = {}) {
  const g = new THREE.Group(); const n = o.n ?? 16; const cols = o.colors ?? [RED, GOLD, 0x3a7ad8, GREEN, 0xffffff]; const bulbs = [];
  const pts = []; for (let i = 0; i <= 20; i++) { const u = i / 20; pts.push(new THREE.Vector3(core.lerp(a[0], b[0], u), core.lerp(a[1], b[1], u) - Math.sin(u * P) * (o.sag ?? .6), core.lerp(a[2], b[2], u))); }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, .012, 4), new THREE.MeshBasicMaterial({ color: 0x1a1a1a })));
  for (let i = 1; i < n; i++) { const u = i / n; const p = new THREE.Vector3(core.lerp(a[0], b[0], u), core.lerp(a[1], b[1], u) - Math.sin(u * P) * (o.sag ?? .6) - .05, core.lerp(a[2], b[2], u));
    const m = new THREE.Mesh(new THREE.SphereGeometry(o.r ?? .06, 8, 6), new THREE.MeshBasicMaterial({ color: cols[i % cols.length] })); m.position.copy(p); g.add(m); bulbs.push(m); }
  g.update = t => bulbs.forEach((b, i) => b.visible = Math.sin(t * 2.6 + i * 2.1) > -.7);
  return g;
}
// snowy village set (night or dusk): ring of cottages, pines, lamps, string lights, snowfall
export function village(k, o = {}) {
  core.setEnv(k, o.env ?? 'night', { fogNear: 30, fogFar: 160, shadowSize: 30, sunPos: [-20, 40, 25], fill: .8, ...(o.envO || {}) });
  snowGround(k, { flat: o.flat ?? 10 });
  const ups = [];
  const houses = o.houses ?? [[-9, -10, .25], [0, -14, 0], [9, -11, -.3], [-15, -2, .9], [15, -1, -.9], [-17, 8, 1.4], [17, 9, -1.4]];
  houses.forEach(([x, z, ry], i) => { const c = cottage({ seed: i, w: 5 + (i % 2), h: 3 + (i % 3) * .3 }); c.position.set(x, 0, z); c.rotation.y = ry; k.scene.add(c); ups.push(c); });
  const r = rng(12);
  for (let i = 0; i < (o.pines ?? 40); i++) { const a = r() * P * 2, d = 24 + r() * 40; const p = pine(4 + r() * 6, { seed: i }); p.position.set(Math.cos(a) * d, 0, Math.sin(a) * d - 8); k.scene.add(p); }
  (o.lamps ?? [[-5, -4], [5, -5], [-8, 4], [8, 4]]).forEach(([x, z]) => { const l = lampPost(); l.position.set(x, 0, z); k.scene.add(l); });
  if (o.string !== false) { const s1 = bulbString([-9, 3.3, -7], [9, 3.4, -8], { sag: .9, n: 22 }); k.scene.add(s1); ups.push(s1); }
  const sf = o.snow === false ? null : snowfall(k, { center: o.snowCenter ?? [0, 0, 0], r: o.snowR ?? 22 }); if (sf) ups.push(sf);
  return { update: t => ups.forEach(u => u.update(t)) };
}
// generic "mood" particle sparkle / glow helpers
export function glowSprite(color = 0xffe6a0, size = 2, opacity = .8) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.3, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.setScalar(size); return s;
}
// thin 3D sign / card helper
export const sign = (text, h, o = {}) => core.textPlane(text, h, { color: o.color ?? '#fff', stroke: o.stroke ?? '#2b1e16', size: o.size ?? 120, ...o });

// walk a person (or animal) from a to b between t0 and t1; stands still outside that window
export function walkPath(p, a, b, t0, t1, t, o = {}) {
  const k = clamp((t - t0) / (t1 - t0)); const e = o.linear ? k : k; const dx = b[0] - a[0], dz = b[2] - a[2]; const L = Math.hypot(dx, dz);
  p.position.set(a[0] + dx * e, a[1] ?? 0, a[2] + dz * e); p.rotation.y = Math.atan2(dx, dz) + (o.rotOff ?? 0);
  const moving = t > t0 && t < t1; const d = L * e;
  if (p.walk) { moving ? p.walk(d, t) : p.idle && p.idle(t); return d; }
  p.update(t, { pose: moving ? (o.run ? 'run' : 'walk') : (o.endPose ?? 'stand'), dist: d, arm: o.arm, mood: o.mood, look: o.look });
  return d;
}
// make a figure the subtitles avoid without auto-updating it
export const avoid = o => { o.userData.person = true; o.userData.auto = false; return o; };
