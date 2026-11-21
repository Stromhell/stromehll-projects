// actions.js: keyed ACTING layer for DumDown (video 11, Pushpam rule 1, 21 Nov 2026).
// Every verb a character does in the VO is a keyed action: ANTICIPATION -> ACTION (with overshoot) -> SETTLE,
// timed so the contact/peak frame lands on the spoken word. Built on the classic 12 principles (anticipation,
// follow-through, slow-in/slow-out, arcs, exaggeration) using pose-to-pose keys with eased in-betweens on twos.
// Shot usage: chars: [{ c: 'eyepatch', ..., acts: [{ a: 'punch', w: 'punch' }, { a: 'wince', at: 2.1 }] }]
//   w = a word in the shot's VO paragraph (the peak lands on that word), at = seconds into the shot.
(function () {
const D = window.DumDown;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, u) => a + (b - a) * u;
const io = u => { u = clamp(u); return u * u * (3 - 2 * u); };
const back = u => { u = clamp(u); const k = 1.6; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); }; // overshoot landing
const A = (sh, el, hand = 'relaxed', wr = 0) => ({ sh, el, wr, hand });
const REST = { L: A(-8, 6), R: A(8, -6), legL: { hip: -3, knee: 0 }, legR: { hip: 3, knee: 0 }, tilt: 0, lean: 0, bob: 0 };
const CROUCH = { legL: { hip: -18, knee: 42 }, legR: { hip: 18, knee: 42 }, bob: 34 };
const M = (...o) => Object.assign({}, REST, ...o);
// Each action: list of keys [t (s, relative to the hit), pose, body {dx, dy, rot}, ease ('io'|'back'|'snap')] + expr + hold
const ACT = {
  punch: { expr: 'angry', keys: [[-.42, REST], [-.12, M({ R: A(30, -128, 'fist'), L: A(-30, 60, 'fist'), lean: -10, tilt: -4 }), { dx: -18 }], [0, M({ R: A(94, 2, 'fist'), L: A(-24, 90, 'fist'), lean: 14, tilt: 4, legL: { hip: -14, knee: 10 }, legR: { hip: 16, knee: 4 } }), { dx: 46 }, 'snap'], [.28, M({ R: A(90, 8, 'fist'), L: A(-24, 90, 'fist'), lean: 10 }), { dx: 40 }], [.75, REST, { dx: 0 }]] },
  grab: { expr: 'angry', keys: [[-.4, REST], [-.12, M({ R: A(40, -60, 'open'), lean: -6 })], [0, M({ R: A(88, 10, 'open'), L: A(-70, 10, 'open'), lean: 12 }), { dx: 50 }, 'snap'], [.2, M({ R: A(70, -40, 'fist'), L: A(-60, -30, 'fist'), lean: 6 }), { dx: 40 }], [.9, M({ R: A(50, -70, 'fist'), L: A(-50, 70, 'fist') }), { dx: 30 }]] },
  point: { expr: 'smug', keys: [[-.35, REST], [-.1, M({ R: A(50, -40, 'fist'), lean: -4 })], [0, M({ R: A(92, 4, 'point'), lean: 6, tilt: 3 }), {}, 'back'], [1.4, M({ R: A(90, 6, 'point'), lean: 4 })], [1.9, REST]] },
  pointHold: { expr: 'angry', keys: [[-.35, REST], [-.1, M({ R: A(50, -40, 'fist'), lean: -4 })], [0, M({ R: A(92, 4, 'point'), lean: 8 }), {}, 'back'], [9, M({ R: A(90, 6, 'point'), lean: 6 })]] },
  hug: { expr: 'happy', keys: [[-.5, REST], [-.15, M({ L: A(-80, -10, 'open'), R: A(80, 10, 'open'), tilt: -4 })], [0, M({ L: A(-40, -110, 'open'), R: A(40, 110, 'open'), lean: 10, tilt: 6 }), { dx: 40 }, 'back'], [1.6, M({ L: A(-40, -110, 'open'), R: A(40, 110, 'open'), lean: 8, tilt: 8 }), { dx: 40 }], [2.2, REST]] },
  pat: { expr: 'smile', keys: [[-.4, REST], [-.1, M({ R: A(80, -70, 'open') })], [0, M({ R: A(78, -40, 'open') }), {}, 'snap'], [.2, M({ R: A(82, -76, 'open') })], [.4, M({ R: A(78, -40, 'open') }), {}, 'snap'], [1.0, REST]] },
  toss: { expr: 'deadpan', keys: [[-.45, REST], [-.15, M({ R: A(150, -70, 'grab'), lean: -8 })], [0, M({ R: A(70, 10, 'open'), lean: 10 }), { dx: 20 }, 'snap'], [.35, M({ R: A(50, 20, 'open'), lean: 6 })], [.9, REST]] },
  flip: { expr: 'angry', keys: [[-.4, REST], [-.12, M(CROUCH, { L: A(-30, 20, 'open'), R: A(30, -20, 'open'), lean: 10 })], [0, M({ L: A(-160, -20, 'open'), R: A(160, 20, 'open'), lean: -8, bob: -20 }), {}, 'snap'], [.5, M({ L: A(-120, -10, 'open'), R: A(120, 10, 'open') })], [1.0, REST]] },
  dive: { expr: 'shock', keys: [[-.45, REST], [-.15, M(CROUCH, { L: A(-40, 20), R: A(40, -20), lean: 16 })], [0, M({ L: A(-150, 0, 'open'), R: A(150, 0, 'open'), legL: { hip: -30, knee: 10 }, legR: { hip: 20, knee: 20 } }), { dx: 240, dy: -120, rot: 70 }, 'snap'], [.35, M({ L: A(-150, 0, 'open'), R: A(150, 0, 'open') }), { dx: 420, dy: 40, rot: 88 }], [.9, M(CROUCH, { L: A(-60, 40), R: A(60, -40) }), { dx: 460, dy: 0, rot: 0 }], [1.4, REST, { dx: 460 }]] },
  duck: { expr: 'shock', keys: [[-.3, REST], [0, M(CROUCH, { L: A(-120, -120, 'open'), R: A(120, 120, 'open'), lean: 14, bob: 60 }), {}, 'snap'], [.9, M(CROUCH, { L: A(-120, -120, 'open'), R: A(120, 120, 'open'), lean: 14, bob: 60 })], [1.4, REST]] },
  rollBad: { expr: 'shock', keys: [[-.3, REST], [0, M(CROUCH, { lean: 30, bob: 50 }), { rot: 40 }], [.45, M(CROUCH, { bob: 70 }), { dx: 160, dy: 40, rot: 200 }], [.8, M(CROUCH, { bob: 60, L: A(-20, 60), R: A(60, -150, 'grab') }), { dx: 220, dy: 30, rot: 360 }], [1.6, M({ R: A(40, -40, 'grab'), legR: { hip: 10, knee: 30 }, tilt: 8, bob: 10 }), { dx: 220, rot: 360 }]] },
  wince: { expr: 'shock', keys: [[-.15, REST], [0, M({ legR: { hip: 6, knee: 34 }, R: A(30, -40, 'grab'), lean: 12, tilt: 10, bob: 18 }), { dy: 0 }, 'snap'], [.6, M({ legR: { hip: 6, knee: 24 }, R: A(30, -40, 'grab'), lean: 8, tilt: 6, bob: 12 })], [1.2, REST]] },
  fall: { expr: 'shock', keys: [[-.3, REST], [0, M(CROUCH, { L: A(-90, 30, 'open'), R: A(90, -30, 'open'), tilt: -10 }), { rot: -20 }, 'snap'], [.45, M({ L: A(-140, 0, 'open'), R: A(140, 0, 'open') }), { dy: 40, rot: -82 }], [1.6, M({ L: A(-140, 0, 'open'), R: A(140, 0, 'open') }), { dy: 40, rot: -86 }]] },
  slump: { expr: 'sad', keys: [[-.4, REST], [0, M(CROUCH, { L: A(-14, 20), R: A(14, -20), tilt: 14, lean: 10, bob: 60 }), {}, 'io'], [9, M(CROUCH, { L: A(-14, 20), R: A(14, -20), tilt: 16, lean: 12, bob: 66 })]] },
  kneelHold: { expr: 'sad', keys: [[-.6, REST], [0, M(CROUCH, { L: A(-60, -90, 'open'), R: A(60, 90, 'open'), lean: 16, bob: 90, tilt: 8 }), {}, 'io'], [9, M(CROUCH, { L: A(-60, -96, 'open'), R: A(60, 96, 'open'), lean: 18, bob: 92, tilt: 10 })]] },
  raise: { expr: 'angry', keys: [[-.3, REST], [-.08, M({ R: A(40, -60, 'fist'), lean: -4 })], [0, M({ R: A(120, 10, 'open'), lean: 4 }), {}, 'back'], [1.8, M({ R: A(118, 14, 'open') })], [2.3, REST]] },
  powerUp: { expr: 'angry', keys: [[-.6, REST], [-.2, M(CROUCH, { L: A(-30, 90, 'fist'), R: A(30, -90, 'fist'), lean: 8 })], [0, M({ L: A(-140, -10, 'fist'), R: A(140, 10, 'fist'), legL: { hip: -14 }, legR: { hip: 14 }, bob: -10 }), {}, 'snap'], [9, M({ L: A(-130, -14, 'fist'), R: A(130, 14, 'fist'), legL: { hip: -14 }, legR: { hip: 14 } })]], shake: 4 },
  scream: { expr: 'shock', keys: [[-.2, REST], [0, M({ L: A(-70, -20, 'open'), R: A(70, 20, 'open'), tilt: -8, lean: -10 }), {}, 'snap'], [9, M({ L: A(-74, -24, 'open'), R: A(74, 24, 'open'), tilt: -6, lean: -8 })]], shake: 6 },
  smash: { expr: 'angry', keys: [[-.5, REST], [-.15, M({ L: A(-160, -40, 'fist'), R: A(160, 40, 'fist'), lean: -10, bob: -10 })], [0, M(CROUCH, { L: A(-60, 10, 'fist'), R: A(60, -10, 'fist'), lean: 22 }), { dx: 60 }, 'snap'], [.5, M(CROUCH, { L: A(-60, 10, 'fist'), R: A(60, -10, 'fist'), lean: 18 }), { dx: 60 }], [1.1, REST, { dx: 60 }]] },
  block: { expr: 'angry', keys: [[-.25, REST], [0, M({ L: A(-80, -120, 'fist'), R: A(80, 120, 'fist'), lean: -8, legL: { hip: -14, knee: 14 } }), { dx: -30 }, 'snap'], [.7, M({ L: A(-80, -120, 'fist'), R: A(80, 120, 'fist'), lean: -4 }), { dx: -30 }], [1.2, REST, { dx: -30 }]] },
  hitBack: { expr: 'shock', keys: [[-.05, REST], [0, M({ L: A(-80, 20, 'open'), R: A(80, -20, 'open'), lean: -22, tilt: -14 }), { dx: -120, dy: -20, rot: -14 }, 'snap'], [.5, M(CROUCH, { lean: -10 }), { dx: -200, rot: -6 }], [1.2, REST, { dx: -200 }]] },
  stride: { expr: 'smug', keys: [[-.3, REST], [0, M({ lean: 4, tilt: -3, L: A(-14, 8, 'fist'), R: A(14, -8, 'fist') }), {}, 'back'], [9, M({ lean: 4, L: A(-14, 8, 'fist'), R: A(14, -8, 'fist') })]] },
  holdUp1: { expr: 'smug', keys: [[-.3, REST], [0, M({ R: A(60, -100, 'point'), tilt: 4 }), {}, 'back'], [1.2, M({ R: A(60, -100, 'point') })], [1.5, REST]] },
  holdUp2: { expr: 'smug', keys: [[-.3, REST], [0, M({ R: A(60, -100, 'peace'), tilt: -4 }), {}, 'back'], [1.2, M({ R: A(60, -100, 'peace') })], [1.5, REST]] },
  sip: { expr: 'smile', keys: [[-.5, REST], [0, M({ R: A(24, -120, 'grab'), tilt: -6 }), {}, 'io'], [1.2, M({ R: A(24, -124, 'grab'), tilt: -8 })], [1.8, M({ R: A(24, -84, 'grab') })]] },
  rubEye: { expr: 'nervous', keys: [[-.4, REST], [0, M({ R: A(28, -150, 'open'), tilt: 8, lean: 6 }), {}, 'io'], [1.4, M({ R: A(30, -146, 'open'), tilt: 10 })], [1.9, REST]] },
  facepalm: { expr: 'nervous', keys: [[-.35, REST], [0, M({ R: A(34, -154, 'open'), tilt: 14, lean: 10 }), {}, 'snap'], [1.6, M({ R: A(34, -156, 'open'), tilt: 16, lean: 10 })], [2.1, REST]] },
  shrug: { expr: 'deadpan', keys: [[-.3, REST], [0, M({ L: A(-40, -95, 'open', -10), R: A(40, 95, 'open', 10), tilt: 8, bob: -6 }), {}, 'back'], [1.2, M({ L: A(-40, -95, 'open'), R: A(40, 95, 'open'), tilt: 8 })], [1.6, REST]] },
  plop: { expr: 'smug', keys: [[-.4, REST], [-.12, M({ lean: -6, bob: -8 })], [0, M(CROUCH, { legL: { hip: -80, knee: 90 }, legR: { hip: -76, knee: 86 }, L: A(-30, 40), R: A(30, -40), bob: 90, lean: -10 }), {}, 'snap'], [9, M(CROUCH, { legL: { hip: -80, knee: 90 }, legR: { hip: -76, knee: 86 }, L: A(-40, 70, 'relaxed'), R: A(40, -70, 'relaxed'), bob: 92, lean: -12 })]] },
  sit: { expr: 'deadpan', keys: [[-.4, REST], [0, M({ legL: { hip: -80, knee: 90 }, legR: { hip: -76, knee: 86 }, L: A(-30, 70), R: A(30, -70), bob: 92 }), {}, 'io'], [9, M({ legL: { hip: -80, knee: 90 }, legR: { hip: -76, knee: 86 }, L: A(-30, 70), R: A(30, -70), bob: 92 })]] },
  sitS: { expr: 'deadpan', keys: [[-.4, REST], [0, M({ legL: { hip: 80, knee: -90 }, legR: { hip: 76, knee: -86 }, L: A(-30, 70), R: A(30, -70), bob: 92 }), {}, 'io'], [9, M({ legL: { hip: 80, knee: -90 }, legR: { hip: 76, knee: -86 }, L: A(-30, 70), R: A(30, -70), bob: 92 })]] },
  dance: { expr: 'happy', loop: t => M({ L: A(-40 + Math.sin(t * 4) * 20, -60), R: A(40 + Math.sin(t * 4) * 20, 60), tilt: Math.sin(t * 2) * 8, bob: Math.abs(Math.sin(t * 2)) * 8, legL: { hip: -6 + Math.sin(t * 2) * 6 }, legR: { hip: 6 + Math.sin(t * 2) * 6 } }) },
  run: { expr: 'nervous', run: true },
  limp: { expr: 'nervous', limp: true },
  tossFolder: { expr: 'deadpan', keys: [[-.4, REST], [-.12, M({ R: A(60, -110, 'grab'), lean: -4 })], [0, M({ R: A(80, 20, 'open'), lean: 10 }), {}, 'snap'], [.5, M({ R: A(60, 10, 'open'), lean: 6 })], [1.0, REST]] },
  openCase: { expr: 'deadpan', keys: [[-.4, REST], [0, M({ L: A(-50, -40, 'grab'), R: A(50, 40, 'grab'), lean: 10, bob: 6 }), {}, 'io'], [1.4, M({ L: A(-80, -20, 'open'), R: A(80, 20, 'open'), lean: 6 })], [1.9, REST]] },
  movePiece: { expr: 'smug', keys: [[-.4, REST], [0, M({ R: A(60, 30, 'grab'), lean: 14, bob: 10 }), {}, 'io'], [.5, M({ R: A(66, 24, 'grab'), lean: 14, bob: 10 })], [1.0, REST]] },
  fire: { expr: 'angry', keys: [[-.3, REST], [-.08, M({ R: A(70, -20, 'open'), lean: -2 })], [0, M({ R: A(92, 0, 'open'), L: A(-10, 8), lean: 8 }), {}, 'snap'], [.15, M({ R: A(100, -6, 'open'), lean: -4 }), { dx: -12 }], [.9, REST]] },
  morph: { expr: 'smug', keys: [[-.2, REST], [0, M({ tilt: 12, bob: -6 }), {}, 'snap'], [.25, M({ tilt: -10 })], [.5, REST]], shake: 5 },
  freeze: { expr: 'shock', keys: [[-.12, REST], [0, M({ L: A(-60, -100, 'open'), R: A(60, 100, 'open'), bob: -10, lean: -6 }), {}, 'snap'], [9, M({ L: A(-60, -100, 'open'), R: A(60, 100, 'open'), bob: -8, lean: -6 })]] },
};
function lerpArm(a, b, u) { return { sh: lerp(a.sh, b.sh, u), el: lerp(a.el, b.el, u), wr: lerp(a.wr || 0, b.wr || 0, u), hand: u < .5 ? (a.hand || 'relaxed') : (b.hand || 'relaxed') }; }
function lerpLeg(a, b, u) { a = Object.assign({ hip: 0, knee: 0, foot: 0 }, a); b = Object.assign({ hip: 0, knee: 0, foot: 0 }, b); return { hip: lerp(a.hip, b.hip, u), knee: lerp(a.knee, b.knee, u), foot: lerp(a.foot, b.foot, u) }; }
function lerpP(a, b, u) { return { L: lerpArm(a.L || REST.L, b.L || REST.L, u), R: lerpArm(a.R || REST.R, b.R || REST.R, u), legL: lerpLeg(a.legL, b.legL, u), legR: lerpLeg(a.legR, b.legR, u), tilt: lerp(a.tilt || 0, b.tilt || 0, u), lean: lerp(a.lean || 0, b.lean || 0, u), bob: lerp(a.bob || 0, b.bob || 0, u), hairSway: lerp(a.hairSway || 0, b.hairSway || 0, u) }; }
const EZ = { io, back, snap: u => 1 - Math.pow(1 - clamp(u), 4) };
// evaluate one action at rt = time relative to its hit; REST keys stand for the live base pose (talk/idle),
// so the character acts INTO the action and settles back OUT of it into its own gestures.
function carry(K, i) { const o = { dx: 0, dy: 0, rot: 0 }; for (let j = 0; j <= i; j++) if (K[j][2]) Object.assign(o, K[j][2]); return o; }
function evalAct(name, rt, t, base) {
  const A_ = ACT[name]; if (!A_ || A_.run || A_.limp) return null;
  if (A_.loop) return rt >= 0 ? { pose: A_.loop(t), body: {}, expr: A_.expr } : null;
  const K = A_.keys, t0 = K[0][0], t1 = K[K.length - 1][0], P = p => p === REST ? base : p;
  if (rt < t0) return null;
  if (rt >= t1) { const L = K[K.length - 1]; const b = carry(K, K.length - 1); return { pose: P(L[1]), body: b, expr: L[1] === REST ? null : A_.expr }; }
  let i = 0; while (i < K.length - 2 && rt > K[i + 1][0]) i++;
  const [ta, pa] = K[i], [tb, pb, bb, ez] = K[i + 1]; const u = (EZ[ez] || io)((rt - ta) / (tb - ta));
  const ba_ = carry(K, i), bb_ = Object.assign({}, ba_, bb || {});
  const body = { dx: lerp(ba_.dx, bb_.dx, u), dy: lerp(ba_.dy, bb_.dy, u), rot: lerp(ba_.rot, bb_.rot, u) };
  if (A_.shake && rt > 0) body.dx += Math.sin(t * 60) * A_.shake;
  return { pose: lerpP(P(pa), P(pb), u), body, expr: rt > t0 + .08 && (rt < t1 - .15 || K[K.length - 1][1] !== REST) ? A_.expr : null };
}
// combine: base pose (talk/idle) + list of [name, hitTime] at shot-local time lt (later actions win)
function apply(base, acts, lt) {
  let pose = base, body = { dx: 0, dy: 0, rot: 0 }, expr = null;
  for (const [name, hit] of acts) { const r = evalAct(name, lt - hit, lt, pose); if (!r) continue; pose = r.pose; body.dx += r.body.dx || 0; body.dy += r.body.dy || 0; body.rot += r.body.rot || 0; if (r.expr) expr = r.expr; }
  return { pose, body, expr };
}
D.ACT = { ACT, apply, evalAct, REST, lerpP };
// faster cartoon run (on twos) and a limp walk for the old spy
D.ANIMS.run = t => { const w = D.ANIMS.walk(t * 1.7); const p = w.pose; p.lean = 14; p.L.sh *= 1.8; p.R.sh *= 1.8; p.L.el = 70 + Math.abs(p.L.el); p.R.el = -(70 + Math.abs(p.R.el)); p.L.hand = p.R.hand = 'fist'; p.legL.hip *= 1.5; p.legR.hip *= 1.5; p.bob = (p.bob || 0) * 1.8; return { pose: p, expr: 'nervous' }; };
D.ANIMS.limp = t => { const w = D.ANIMS.walk(t * .8); const p = w.pose; const k = Math.max(0, Math.sin(t * Math.PI * 2 * .84)); p.bob = (p.bob || 0) + k * 8; p.tilt = -4 + k * 6; p.legR.knee = Math.min(p.legR.knee, 10); return { pose: p, expr: 'deadpan' }; };
})();
