// Thunderbolts* additions to the DumDown kit: action poses + action animations (Pushpam 19 Nov: action poses, characters interact with the scene)
(function () {
const D = window.DumDown, P = D.POSES, A = D.ANIMS, on2 = D.onTwos;
const cp = o => { const r = JSON.parse(JSON.stringify(o)); r.bob = 0; return r; };
Object.assign(P, {
  punch:   { L: { sh: -40, el: 80, hand: 'fist' }, R: { sh: 92, el: 2, hand: 'fist' }, legL: { hip: 28, knee: 22 }, legR: { hip: -24, knee: 8 }, lean: 10, tilt: -2 },
  kick:    { L: { sh: -60, el: 50, hand: 'fist' }, R: { sh: 50, el: 70, hand: 'fist' }, legL: { hip: -6, knee: 8 }, legR: { hip: 88, knee: 4, foot: 10 }, lean: -12 },
  jump:    { L: { sh: -150, el: -20, hand: 'open' }, R: { sh: 150, el: 20, hand: 'open' }, legL: { hip: 60, knee: 90 }, legR: { hip: 20, knee: 70 }, lean: 6, bob: -10 },
  crouch:  { L: { sh: 30, el: 60, hand: 'fist' }, R: { sh: 50, el: 70, hand: 'fist' }, legL: { hip: 75, knee: 120 }, legR: { hip: 40, knee: 110 }, lean: 18, bob: 70 },
  climb:   { L: { sh: -172, el: 6, hand: 'fist' }, R: { sh: 160, el: -24, hand: 'fist' }, legL: { hip: 50, knee: 70 }, legR: { hip: -4, knee: 6 }, tilt: 3 },
  sit:     { L: { sh: 18, el: 40, hand: 'relaxed' }, R: { sh: 24, el: 44, hand: 'relaxed' }, legL: { hip: 88, knee: 88 }, legR: { hip: 84, knee: 84 }, bob: 89, lean: -2 },
  fly:     { L: { sh: -20, el: 10, hand: 'fist' }, R: { sh: 176, el: 0, hand: 'fist' }, legL: { hip: -10, knee: 6 }, legR: { hip: -22, knee: 14 }, lean: 0 },
  block:   { L: { sh: 70, el: 110, hand: 'fist' }, R: { sh: 60, el: 120, hand: 'fist' }, legL: { hip: 24, knee: 16 }, legR: { hip: -20, knee: 6 }, lean: 4 },
  aim:     { L: { sh: 84, el: 4, hand: 'point' }, R: { sh: 88, el: 0, hand: 'point' }, legL: { hip: 18, knee: 10 }, legR: { hip: -18, knee: 4 }, lean: 4 },
  lift:    { L: { sh: -166, el: -8, hand: 'open' }, R: { sh: 166, el: 8, hand: 'open' }, legL: { hip: -22, knee: 26 }, legR: { hip: 22, knee: 26 }, bob: 10 },
  hug:     { L: { sh: 64, el: 24, hand: 'open' }, R: { sh: 64, el: 24, hand: 'open' }, legL: { hip: 6 }, legR: { hip: -4 }, lean: 6, tilt: 6 },
  cower:   { L: { sh: -150, el: -110, hand: 'open' }, R: { sh: 150, el: 110, hand: 'open' }, legL: { hip: 40, knee: 70 }, legR: { hip: 20, knee: 60 }, bob: 18, tilt: 8 },
  fallBack:{ L: { sh: -120, el: -30, hand: 'open' }, R: { sh: 130, el: 30, hand: 'open' }, legL: { hip: 40, knee: 20 }, legR: { hip: 10, knee: 30 }, lean: -24 },
  hang:    { L: { sh: -174, el: 0, hand: 'fist' }, R: { sh: 40, el: 30, hand: 'open' }, legL: { hip: 10, knee: 16 }, legR: { hip: -8, knee: 10 }, tilt: 4 },
  armsCross:{ L: { sh: 32, el: 112, hand: 'fist' }, R: { sh: -28, el: -112, hand: 'fist' }, legL: { hip: -6 }, legR: { hip: 6 } },
  shield:  { L: { sh: 80, el: 40, hand: 'fist' }, R: { sh: -10, el: 30, hand: 'fist' }, legL: { hip: 26, knee: 20 }, legR: { hip: -22, knee: 8 }, lean: 8 },
  reach:   { L: { sh: -14, el: 10 }, R: { sh: 110, el: 4, hand: 'open' }, legL: { hip: 14, knee: 6 }, legR: { hip: -14 }, lean: 10 },
  drive:   { L: { sh: 60, el: 40, hand: 'fist' }, R: { sh: 64, el: 36, hand: 'fist' }, legL: { hip: 88, knee: 80 }, legR: { hip: 84, knee: 84 }, bob: 84 },
  facepalm:{ L: { sh: -8, el: 6 }, R: { sh: 24, el: -150, wr: 6, hand: 'open' }, legL: { hip: -3 }, legR: { hip: 3 }, tilt: 10 },
});
const mixP = (a, b, k) => { const o = cp(a); for (const s of ['L', 'R', 'legL', 'legR']) for (const j in b[s] || {}) if (typeof b[s][j] === 'number') o[s][j] = (a[s]?.[j] || 0) * (1 - k) + b[s][j] * k; else o[s][j] = b[s][j];
  for (const j of ['lean', 'tilt', 'bob']) o[j] = (a[j] || 0) * (1 - k) + (b[j] || 0) * k; return o; };
Object.assign(A, {
  run(t) { const ph = t * Math.PI * 2 * 1.7, s = Math.sin(ph), c2 = Math.cos(ph * 2);
    return { pose: { bob: -c2 * 7 + 2, lean: 14, tilt: -4, legL: { hip: s * 48, knee: (Math.max(0, -Math.sin(ph + .9)) * 95 + 10) }, legR: { hip: -s * 48, knee: (Math.max(0, Math.sin(ph + .9)) * 95 + 10) },
      L: { sh: -s * 55, el: 80, hand: 'fist' }, R: { sh: s * 55, el: 80, hand: 'fist' }, hairSway: -2.2 }, expr: 'angry' }; },
  punchCombo(t) { const T = t % .9, k = T < .25 ? T / .25 : T < .45 ? 1 : 1 - (T - .45) / .45; const alt = Math.floor(t / .9) % 2;
    const a = P.block, b = alt ? P.punch : P.kick; return { pose: mixP(a, b, Math.max(0, Math.min(1, k))), expr: 'angry' }; },
  climbUp(t) { const k = (Math.sin(t * Math.PI * 2 * .8) + 1) / 2; const a = P.climb, b = cp(P.climb); b.L = cp(P.climb.R); b.L.sh = -P.climb.R.sh; b.L.el = -P.climb.R.el; b.R = cp(P.climb.L); b.R.sh = -P.climb.L.sh; b.R.el = -P.climb.L.el; b.legL = cp(P.climb.legR); b.legR = cp(P.climb.legL);
    return { pose: mixP(a, b, k), expr: 'angry' }; },
  flyHover(t) { const p = cp(P.fly); p.bob = Math.sin(t * 2.4) * 8; p.L.sh += Math.sin(t * 2.4) * 4; p.legR.hip += Math.sin(t * 2.4 + 1) * 6; p.hairSway = -1.8; return { pose: p, expr: 'neutral' }; },
  struggle(t) { const p = cp(P.lift); const w = Math.sin(t * 9); p.tilt = w * 3; p.bob = 10 + Math.abs(w) * 3; return { pose: p, expr: 'angry' }; },
  sitTalk(t) { const r = A.talk(t); const p = cp(P.sit); p.R = r.pose.R; p.tilt = r.pose.tilt; return { pose: p, expr: r.expr }; },
  driveTalk(t) { const r = A.talk(t); const p = cp(P.drive); p.R.sh = 64 + Math.sin(t * 1.3) * 8; p.tilt = r.pose.tilt; return { pose: p, expr: r.expr }; },
  hugSway(t) { const p = cp(P.hug); p.tilt = 6 + Math.sin(t * 1.6) * 3; return { pose: p, expr: 'happy' }; },
  cowerShake(t) { const p = cp(P.cower); p.tilt = 8 + Math.sin(t * 22) * 2; return { pose: p, expr: 'shock' }; },
  dodge(t) { const T = t % 1.4, k = T < .3 ? T / .3 : T < .8 ? 1 : 1 - (T - .8) / .6; return { pose: mixP(P.stand, P.crouch, Math.max(0, Math.min(1, k))), expr: 'angry' }; },
  aimHold(t) { const p = cp(P.aim); p.L.sh += Math.sin(t * 5) * 1.5; p.R.sh += Math.sin(t * 5) * 1.5; return { pose: p, expr: 'angry' }; },
});
// rotation + squash support for figures: wrap drawCharacter output (rot degrees around the hip point, o.rot / o.flipY)
const dc = D.drawCharacter; D.drawCharacter = (spec, o = {}) => { const s = dc(spec, o); if (!o.rot) return s; const sc = (o.scale ?? 1) * (spec.scale || 1); return `<g transform="rotate(${o.rot} ${o.x ?? 0} ${(o.y ?? 0) - 260 * sc})">${s}</g>`; };
})();
