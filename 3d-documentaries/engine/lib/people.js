// House-style 3D figures: big round white head, ink outline, small body,
// white mitten hands, ink-oval eyes, lens brows by mood, one-stroke mouth.
// Every figure breathes, sways and blinks on its own timer; walks follow the
// house walk cycle (legs ±26°, arms opposite, two bobs per stride, 3° lean).
import * as THREE from 'three';
import { toon, mesh, sph, cyl, box, group, outline, INK, rng, clamp, ease } from './core.js';

const SKIN = 0xf7f3ea;
const OUTFITS = {
  olive:   { top: 0x6b7044, bot: 0x575c37, shoe: 0x3a2a1e },   // IDF olive
  khaki:   { top: 0xa08a5a, bot: 0x8a754a, shoe: 0x3a2a1e },   // Ugandan soldier
  suit:    { top: 0x2f3442, bot: 0x2a2e3a, shoe: 0x1e1712, tie: 0x8a2a2a },
  grey:    { top: 0x6f7378, bot: 0x55585c, shoe: 0x1e1712, tie: 0x334466 },
  pilot:   { top: 0xf2f2ee, bot: 0x26324a, shoe: 0x1e1712, tie: 0x26324a },
  civil1:  { top: 0xc9774a, bot: 0x4c5a78, shoe: 0x3a2a1e },
  civil2:  { top: 0x7a9a6a, bot: 0x6a5a48, shoe: 0x3a2a1e },
  civil3:  { top: 0xd8c27a, bot: 0x5a4a6a, shoe: 0x3a2a1e },
  civil4:  { top: 0x8aa0c8, bot: 0x3d3d48, shoe: 0x3a2a1e },
  dress1:  { top: 0xb0506a, bot: 0xb0506a, shoe: 0x5a2a2a, dress: true },
  dress2:  { top: 0x5a7aa0, bot: 0x5a7aa0, shoe: 0x3a2a1e, dress: true },
  medic:   { top: 0xe8ecea, bot: 0x6b7044, shoe: 0x3a2a1e },
  amin:    { top: 0x6f7a4a, bot: 0x5e683c, shoe: 0x1e1712, medals: true },
  dark:    { top: 0x2a2b33, bot: 0x22232a, shoe: 0x15151a },   // hijacker
  // Rome
  toga:    { top: 0xf1ece0, bot: 0xf1ece0, shoe: 0x6a4a2a, dress: true, toga: true },
  tunic:   { top: 0xb8a27a, bot: 0xb8a27a, shoe: 0x6a4a2a, dress: true },
  legion:  { top: 0xa8322a, bot: 0xa8322a, shoe: 0x5a3a1e, dress: true, armour: true },
  stola:   { top: 0x8a5a7a, bot: 0x8a5a7a, shoe: 0x6a4a2a, dress: true, toga: true },
};
const SIL = 0x15131a;

// eyebrow tilt by mood: [inner angle, height]
const MOODS = { calm: [0, .0], stern: [-.38, -.012], worried: [.42, .01], smug: [-.15, .0], sad: [.3, -.005], surprised: [0, .03] };

export function person(o = {}) {
  const r = rng(o.seed ?? 1);
  const sil = !!o.silhouette;
  const fit = OUTFITS[o.outfit ?? 'civil1'];
  const top = sil ? SIL : (o.top ?? fit.top), bot = sil ? SIL : (o.bot ?? fit.bot);
  const skin = sil ? SIL : (o.skin ?? SKIN);
  const near = c => sil ? SIL : new THREE.Color(c).offsetHSL(0, 0, .05).getHex();
  const far = c => sil ? SIL : new THREE.Color(c).offsetHSL(0, 0, -.07).getHex();
  const s = o.scale ?? 1;
  const root = new THREE.Group(); root.scale.setScalar(s);
  const body = new THREE.Group(); root.add(body);       // bobs and leans
  // torso
  const torsoH = .56, hipY = .72;
  const torso = mesh(new THREE.CapsuleGeometry(.2, torsoH - .3, 6, 16), top);
  torso.scale.set(1, 1, .78); torso.position.y = hipY + torsoH / 2 - .02; body.add(torso);
  if (fit.dress && !sil) { const sk = cyl(.17, .3, .42, top, { seg: 18 }); sk.position.y = hipY - .1; body.add(sk); }
  if (fit.tie && !sil && !o.noTie) {
    const shirt = box(.12, .3, .02, 0xf2efe6, { pos: [0, hipY + .34, .165] }); body.add(shirt);
    body.add(box(.045, .24, .02, fit.tie, { pos: [0, hipY + .31, .178] }));
  }
  if (fit.medals && !sil) {
    for (let i = 0; i < 6; i++) body.add(cyl(.022, .022, .015, [0xd9b13b, 0xb33a2a, 0x2f6fe0][i % 3], { pos: [-.12 + (i % 3) * .045, hipY + .42 - Math.floor(i / 3) * .055, .155], rot: [Math.PI / 2, 0, 0], seg: 10 }));
  }
  if (fit.toga && !sil) {   // draped sash over the left shoulder, purple border for magistrates
    const sash = cyl(.215, .215, .14, o.drape ?? new THREE.Color(top).offsetHSL(0, 0, -.06).getHex(), { pos: [0, hipY + .3, 0], rot: [0, 0, .75], scale: [1, 1, .82], seg: 18 }); body.add(sash);
    if (o.border) { const b = cyl(.222, .222, .035, o.border, { pos: [-.05, hipY + .25, 0], rot: [0, 0, .75], scale: [1, 1, .84], seg: 18 }); body.add(b); body.add(cyl(.305, .305, .04, o.border, { pos: [0, hipY - .3, 0], seg: 18 })); }
  }
  if (fit.armour && !sil) { body.add(cyl(.212, .205, .3, 0x9a8a6a, { pos: [0, hipY + .32, 0], scale: [1, 1, .82] })); for (let i = 0; i < 3; i++) body.add(cyl(.214, .214, .025, 0x6a5a3a, { pos: [0, hipY + .22 + i * .08, 0], scale: [1, 1, .83] })); }
  if (o.outfit === 'medic' && !sil) body.add(box(.1, .1, .01, 0xc8302a, { pos: [-.08, hipY + .4, .16] }));
  // belt for uniforms
  if (['olive', 'khaki', 'amin'].includes(o.outfit) && !sil) body.add(cyl(.205, .205, .05, 0x3b2a1a, { pos: [0, hipY + .04, 0], scale: [1, 1, .8] }));
  // head
  const headR = .3;
  const head = new THREE.Group(); head.position.y = hipY + torsoH + headR * .82; body.add(head);
  const skull = sph(headR, skin, { seg: 32, seg2: 24 }); head.add(skull);
  const face = new THREE.Group(); face.position.z = headR * .93; head.add(face);
  const inkM = toon(sil ? SIL : INK);
  const eyes = [];
  if (!sil || o.silEyes) {
    for (const sx of [-1, 1]) {
      const e = mesh(new THREE.SphereGeometry(.034, 12, 10), sil ? toon(0xf0e8d0) : inkM, { noOutline: true, cast: false });
      e.scale.set(.8, 1.25, .45); e.position.set(sx * .095, .03, 0); face.add(e); eyes.push(e);
    }
  }
  const brows = [];
  if (!sil) {
    for (const sx of [-1, 1]) {
      const g = new THREE.SphereGeometry(.05, 12, 6); const b = mesh(g, inkM, { noOutline: true, cast: false });
      b.scale.set(1.15, .22, .3); b.position.set(sx * .1, .115, -.008); face.add(b); brows.push(b);
    }
    // mouth: single stroke, slight curve
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-.055, -.085, 0), new THREE.Vector3(0, o.smile ? -.11 : -.095, .01), new THREE.Vector3(.055, -.085, 0));
    const mouth = mesh(new THREE.TubeGeometry(curve, 8, .009, 5), inkM, { noOutline: true, cast: false }); mouth.position.z = -.02; face.add(mouth);
    if (o.moustache) face.add(mesh(new THREE.CapsuleGeometry(.025, .09, 4, 8), toon(o.hair ?? 0x2b1e16), { pos: [0, -.045, 0], rot: [0, 0, Math.PI / 2], noOutline: true }));
    if (o.glasses) for (const sx of [-1, 1]) { const ring = mesh(new THREE.TorusGeometry(.05, .007, 6, 18), inkM, { noOutline: true }); ring.position.set(sx * .095, .03, .01); face.add(ring); }
    if (o.beard) { const bd = sph(.2, o.hair ?? 0x2b1e16, { scale: [1, .55, .7], pos: [0, -.17, -.12] }); head.add(bd); }
  }
  // gentle face fit to the sphere
  face.children.forEach(c => { const p = c.position; p.z += -(p.x * p.x + p.y * p.y) * 1.3; });
  // hair / hats
  if (o.hair && !sil && !o.hat) { const h = sph(headR * 1.02, o.hair, { seg: 24 }); h.scale.set(1, .55, 1); h.position.set(0, .12, -.03); head.add(h); }
  if (o.bald === false && !o.hair) {}
  const hatCol = sil ? SIL : (o.hatColor ?? 0x575c37);
  if (o.hat === 'cap') { head.add(cyl(.27, .3, .14, hatCol, { pos: [0, .23, 0] })); head.add(cyl(.2, .2, .02, hatCol, { pos: [0, .17, .2], scale: [1, 1, .6] })); }
  if (o.hat === 'beret') { const b = sph(.3, sil ? SIL : (o.hatColor ?? 0x7a2a2a), { seg: 20 }); b.scale.set(1.05, .32, 1.05); b.position.set(.04, .24, 0); b.rotation.z = -.18; head.add(b); }
  if (o.hat === 'pilot') { head.add(cyl(.3, .29, .1, sil ? SIL : 0x1e2a44, { pos: [0, .25, 0] })); head.add(box(.22, .02, .12, sil ? SIL : 0x111111, { pos: [0, .2, .22] })); head.add(box(.08, .05, .01, sil ? SIL : 0xd9b13b, { pos: [0, .27, .3] })); }
  if (o.hat === 'peaked') { head.add(cyl(.33, .28, .12, hatCol, { pos: [0, .27, 0] })); head.add(box(.24, .02, .14, sil ? SIL : 0x1a1a14, { pos: [0, .2, .22] })); if (!sil) head.add(box(.09, .06, .01, 0xd9b13b, { pos: [0, .29, .32] })); }
  if (o.hat === 'kippah' && !sil) { const k = sph(.15, 0x22304a, { seg: 16 }); k.scale.set(1, .3, 1); k.position.set(0, .29, -.03); head.add(k); }
  if (o.hat === 'laurel' && !sil) { const l = new THREE.Mesh(new THREE.TorusGeometry(.26, .035, 6, 24, Math.PI * 1.6), toon(0x5a8a3a)); l.rotation.set(Math.PI / 2 - .25, 0, Math.PI * .7); l.position.set(0, .17, -.02); head.add(l); for (let i = 0; i < 9; i++) { const a = Math.PI * .7 + i * .18 - .1; const lf = sph(.05, 0x6a9a44, { scale: [1, .5, 1.6] }); lf.position.set(Math.cos(a) * .27, .18 + Math.sin(i) * .01, -Math.sin(a) * .27 - .02); head.add(lf); } }
  if (o.hat === 'crown' && !sil) { head.add(cyl(.25, .25, .1, 0xd9b13b, { pos: [0, .3, 0] })); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; head.add(box(.06, .1, .03, 0xd9b13b, { pos: [Math.cos(a) * .24, .38, Math.sin(a) * .24], rot: [0, -a, 0] })); } }
  if (o.hat === 'galea') { const h = sph(.33, sil ? SIL : 0x9a8a6a, { seg: 22 }); h.scale.set(1, .7, 1); h.position.y = .1; head.add(h); if (!sil) head.add(box(.06, .16, .4, o.hatColor ?? 0xa8322a, { pos: [0, .38, 0] })); }
  if (o.hat === 'helmet') { const h = sph(.33, hatCol, { seg: 22 }); h.scale.set(1, .7, 1); h.position.y = .1; head.add(h); }
  if (o.hat === 'scarf' && !sil) { const h = sph(.32, o.hatColor ?? 0x9a4a6a, { seg: 22 }); h.scale.set(1.02, .9, 1.02); h.position.set(0, .03, -.05); head.add(h); }
  // limbs: pivot groups so they swing from shoulder / hip
  function limb(len, rad, col, x, y, isArm, nearSide) {
    const pivot = new THREE.Group(); pivot.position.set(x, y, 0);
    const c = nearSide ? near(col) : far(col);
    const upper = mesh(new THREE.CapsuleGeometry(rad, len * .5 - rad, 4, 10), c); upper.position.y = -len * .25; pivot.add(upper);
    const knee = new THREE.Group(); knee.position.y = -len * .5; pivot.add(knee);
    const lower = mesh(new THREE.CapsuleGeometry(rad * .92, len * .5 - rad, 4, 10), c); lower.position.y = -len * .25; knee.add(lower);
    let end;
    if (isArm) { end = sph(.07, sil ? SIL : 0xffffff, { seg: 14 }); end.scale.set(1, 1.1, .9); end.position.y = -len * .5 - .02; }
    else { end = box(.13, .07, .22, sil ? SIL : fit.shoe); end.position.set(0, -len * .5 - .01, .04); }
    knee.add(end);
    return { pivot, knee, end };
  }
  const legL = limb(.68, .07, bot, -.1, hipY, false, false), legR = limb(.68, .07, bot, .1, hipY, false, true);
  const armL = limb(.56, .058, top, -.25, hipY + torsoH - .06, true, false), armR = limb(.56, .058, top, .25, hipY + torsoH - .06, true, true);
  // far side behind the body slightly
  legL.pivot.position.z = -.01; armL.pivot.position.z = -.02;
  root.add(legL.pivot, legR.pivot); body.add(armL.pivot, armR.pivot);
  outline(root, .022);
  // contact shadow (soft dark disc)
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(.36, 24), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .28, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = .012; shadow.userData.noOutline = true; root.add(shadow);

  const blinkPeriod = 2.6 + r() * 2.8, blinkPhase = r() * 5, swayPhase = r() * 6;
  const mood = o.mood ?? 'calm';
  const st = { walk: 0, run: false, sit: false, pose: o.pose ?? 'stand', mood, phase: r() * 6 };
  function setMood(m) {
    const [ang, dy] = MOODS[m] || MOODS.calm;
    brows.forEach((b, i) => { const sx = i ? 1 : -1; b.rotation.z = -sx * ang; b.position.y = .115 + dy; });
  }
  setMood(mood);
  // stride: distance per cycle for the given leg swing (so feet don't slide)
  const stride = 2 * .68 * Math.sin(26 * Math.PI / 180) * 2;

  root.userData.person = true;
  root.state = st;
  root.parts = { head, body, armL, armR, legL, legR, eyes, brows, torso };
  root.setMood = m => { st.mood = m; setMood(m); };
  // update(t, dist) — dist is distance walked so far (for foot-locked walk)
  root.update = (t, opt = {}) => {
    const pose = opt.pose ?? st.pose;
    // blink: ease shut and open over 0.28 s
    const bt = ((t + blinkPhase) % blinkPeriod);
    const bk = bt < .28 ? 1 - Math.sin(bt / .28 * Math.PI) : 1;
    eyes.forEach(e => e.scale.y = 1.25 * Math.max(.08, bk));
    if (opt.mood && opt.mood !== st.mood) root.setMood(opt.mood);
    // reset
    for (const l of [legL, legR, armL, armR]) { l.pivot.rotation.set(0, 0, 0); l.knee.rotation.set(0, 0, 0); }
    body.position.set(0, 0, 0); body.rotation.set(0, 0, 0); head.rotation.set(0, 0, 0);
    armL.pivot.rotation.z = -.12; armR.pivot.rotation.z = .12;
    const breathe = Math.sin(t * 1.9 + swayPhase);
    torso.scale.y = 1 + breathe * .012;
    if (pose === 'walk' || pose === 'run') {
      const run = pose === 'run';
      const dist = opt.dist ?? t * (run ? 3 : 1.2);
      const ph = (dist / (stride * (run ? 1.35 : 1))) * Math.PI * 2 + st.phase;
      const A = (run ? 40 : 26) * Math.PI / 180;
      const sw = Math.sin(ph);
      legL.pivot.rotation.x = sw * A; legR.pivot.rotation.x = -sw * A;
      // knees bend only during the swing (leg moving forward)
      legL.knee.rotation.x = Math.max(0, Math.cos(ph)) * (run ? 1.1 : .55);
      legR.knee.rotation.x = Math.max(0, -Math.cos(ph)) * (run ? 1.1 : .55);
      // each arm swings opposite the leg on its own side
      armL.pivot.rotation.x = -sw * A * .8; armR.pivot.rotation.x = sw * A * .8;
      if (run) { armL.knee.rotation.x = -1.1; armR.knee.rotation.x = -1.1; }
      body.position.y = Math.abs(Math.cos(ph)) * (run ? .06 : .035) - .02;  // two bobs per stride
      body.rotation.x = (run ? 9 : 3) * Math.PI / 180;
    } else if (pose === 'sit' || pose === 'sitDesk') {
      legL.pivot.rotation.x = legR.pivot.rotation.x = -Math.PI / 2;
      legL.knee.rotation.x = legR.knee.rotation.x = Math.PI / 2;
      body.position.y = -.0; root.position.y = root.userData.seatY ?? root.position.y;
      if (pose === 'sitDesk') { armL.pivot.rotation.x = armR.pivot.rotation.x = -.9; armL.knee.rotation.x = armR.knee.rotation.x = -.5; }
      body.rotation.x = Math.sin(t * .8 + swayPhase) * .02;
    } else if (pose === 'lie') {
      // lying on a mattress (hostages)
      root.rotation.x = -Math.PI / 2 + .02; body.rotation.z = 0;
      head.rotation.x = .25; armL.pivot.rotation.z = -.35; armR.pivot.rotation.z = .35;
      torso.scale.y = 1 + breathe * .02;
    } else {
      // stand: breathe + sway
      body.rotation.z = Math.sin(t * .9 + swayPhase) * .018;
      body.position.y = breathe * .006;
      head.rotation.y = Math.sin(t * .45 + swayPhase) * .12;
      armL.pivot.rotation.x = Math.sin(t * 1.1 + swayPhase) * .04; armR.pivot.rotation.x = -Math.sin(t * 1.1 + swayPhase) * .04;
    }
    // arm overrides
    const arm = opt.arm ?? st.arm;
    if (arm === 'point') { armR.pivot.rotation.x = -1.45; armR.pivot.rotation.z = .05; }
    if (arm === 'raise') { armR.pivot.rotation.x = -2.6; armL.pivot.rotation.x = -2.6; }
    if (arm === 'wave') { armR.pivot.rotation.x = -2.5; armR.pivot.rotation.z = .3 + Math.sin(t * 8) * .35; }
    if (arm === 'hold') { armL.pivot.rotation.x = armR.pivot.rotation.x = -1.0; armL.knee.rotation.x = armR.knee.rotation.x = -.9; }
    if (arm === 'phone') { armR.pivot.rotation.x = -1.2; armR.pivot.rotation.z = .5; armR.knee.rotation.x = -2.2; }
    if (arm === 'folded') { armL.pivot.rotation.x = armR.pivot.rotation.x = -.7; armL.knee.rotation.x = armR.knee.rotation.x = -1.9; armL.pivot.rotation.z = .35; armR.pivot.rotation.z = -.35; }
    if (arm === 'mic') { armR.pivot.rotation.x = -1.3; armR.knee.rotation.x = -1.6; }
    if (arm === 'hug') { armL.pivot.rotation.x = armR.pivot.rotation.x = -1.4; armL.pivot.rotation.z = .6; armR.pivot.rotation.z = -.6; armL.knee.rotation.x = armR.knee.rotation.x = -.8; }
    if (opt.look != null) head.rotation.y = opt.look;
    if (opt.nod) head.rotation.x = Math.sin(t * 3) * .08;
  };
  root.update(0);
  return root;
}

// a crowd placed on a grid with jitter; returns group with .update(t)
export function crowd(n, o = {}) {
  const g = new THREE.Group(); const r = rng(o.seed ?? 3);
  const outfits = o.outfits ?? ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2', 'suit', 'grey'];
  const hairs = [0x2b1e16, 0x5a3a22, 0x8a6a3a, 0x9a9a9a, null];
  const cols = o.cols ?? Math.ceil(Math.sqrt(n));
  const people = [];
  for (let i = 0; i < n; i++) {
    const p = person({ outfit: outfits[Math.floor(r() * outfits.length)], hair: hairs[Math.floor(r() * hairs.length)] ?? undefined, seed: (o.seed ?? 3) * 100 + i, mood: o.mood ?? 'worried', silhouette: o.silhouette, scale: o.scale ?? 1, glasses: r() < .15, moustache: r() < .2 });
    const cx = i % cols, cz = Math.floor(i / cols);
    p.position.set((cx - (cols - 1) / 2) * (o.dx ?? .9) + (r() - .5) * (o.jit ?? .3), 0, -cz * (o.dz ?? .9) + (r() - .5) * (o.jit ?? .3));
    p.rotation.y = (o.face ?? 0) + (r() - .5) * (o.turn ?? .4);
    g.add(p); people.push(p);
  }
  g.people = people;
  g.update = (t, opt = {}) => people.forEach((p, i) => p.update(t + i * .37, opt));
  return g;
}
