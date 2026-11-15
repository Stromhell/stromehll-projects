// acting.js: character acting layer for the DumDown kit (Agatha rework, 15 Nov 2026).
// Replaces the one-gesture talk loop and the frozen idle with a seeded gesture library:
// beat gestures that change every 1.2-2.4 s with eased transitions (anticipation + settle),
// weight shifts, head nods, and explicit poses that are acted INTO and later relaxed OUT of.
(function () {
const D = window.DumDown, P0 = D.POSES;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, u) => a + (b - a) * u;
const out3 = u => 1 - Math.pow(1 - clamp(u), 3), io = u => { u = clamp(u); return u * u * (3 - 2 * u); };
// overshoot ease for gesture landings (popOver-like: peaks ~1.06 at t .7)
const land = u => { u = clamp(u); const k = 1.2; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rnd(seed, i) { let x = (seed ^ Math.imul(i + 1, 0x9e3779b1)) >>> 0; x ^= x >>> 15; x = Math.imul(x, 0x2c1b3c6d); x ^= x >>> 12; x = Math.imul(x, 0x297a2d39); x ^= x >>> 15; return (x >>> 0) / 4294967296; }

const A = (sh, el, hand = 'relaxed', wr = 0) => ({ sh, el, wr, hand });
// gesture library: L / R arm targets (+ optional tilt/lean). Angles: 0 = arm down, + = outward/up for R.
const G = {
  rest: { L: A(-8, 6), R: A(8, -6) },
  palmsUp: { L: A(-24, -78, 'open', -12), R: A(24, 78, 'open', 12), tilt: 3 },
  explainR: { L: A(-9, 8), R: A(28, 88, 'open', 14), lean: -1 },
  explainL: { L: A(-28, -88, 'open', -14), R: A(9, -8), lean: 1 },
  pointOut: { L: A(-10, 8), R: A(86, 6, 'point'), lean: -3 },
  selfTap: { L: A(-8, 6), R: A(18, -128, 'open', 20), tilt: -3 },
  count: { L: A(-16, -112, 'point', -8), R: A(22, -96, 'point', 10), tilt: 4 },
  hipTalk: { L: A(-42, 70, 'fist'), R: A(32, 84, 'open', 10) },
  chop: { L: A(-9, 8), R: A(40, 62, 'open', 30), beat: 1.6 },
  shrugSmall: { L: A(-34, -86, 'open', -10), R: A(34, 86, 'open', 10), tilt: 7 },
  chin: { L: A(-6, 70), R: A(14, -150, 'fist', 10), tilt: 6 },
  wide: { L: A(-58, -40, 'open', -10), R: A(58, 40, 'open', 10), tilt: -2 },
  fistBeat: { L: A(-9, 8), R: A(30, 100, 'fist'), beat: 2.2 },
  hips: { L: A(-42, 70, 'fist'), R: A(42, -70, 'fist') },
  oneHip: { L: A(-42, 70, 'fist'), R: A(9, -6) },
  clasp: { L: A(-14, 52, 'relaxed'), R: A(14, -52, 'relaxed') },
};
const TALK = ['explainR', 'palmsUp', 'hipTalk', 'pointOut', 'explainL', 'count', 'selfTap', 'chop', 'shrugSmall', 'wide', 'fistBeat', 'explainR', 'chin'];
const IDLE = ['rest', 'oneHip', 'clasp', 'rest', 'hips', 'oneHip', 'rest', 'clasp'];

function lerpArm(a, b, u) { return { sh: lerp(a.sh, b.sh, u), el: lerp(a.el, b.el, u), wr: lerp(a.wr || 0, b.wr || 0, u), hand: u < .5 ? (a.hand || 'relaxed') : (b.hand || 'relaxed') }; }
function lerpPose(a, b, u) {
  const L = k => Object.assign({ hip: 0, knee: 0, foot: 0 }, k || {});
  const la = L(a.legL), lb = L(b.legL), ra = L(a.legR), rb = L(b.legR), cu = clamp(u);
  return { L: lerpArm(a.L || G.rest.L, b.L || G.rest.L, u), R: lerpArm(a.R || G.rest.R, b.R || G.rest.R, u),
    legL: { hip: lerp(la.hip, lb.hip, cu), knee: lerp(la.knee, lb.knee, cu), foot: lerp(la.foot, lb.foot, cu) },
    legR: { hip: lerp(ra.hip, rb.hip, cu), knee: lerp(ra.knee, rb.knee, cu), foot: lerp(ra.foot, rb.foot, cu) },
    tilt: lerp(a.tilt || 0, b.tilt || 0, u), lean: lerp(a.lean || 0, b.lean || 0, u), bob: lerp(a.bob || 0, b.bob || 0, u), hairSway: lerp(a.hairSway || 0, b.hairSway || 0, u) };
}
// segment timeline: seeded durations, returns [index, local u within segment, segStart]
function segAt(t, seed, lo, hi) { let s = 0, i = 0; const t0 = -rnd(seed, 999) * lo; let a = t0; while (true) { const d = lo + rnd(seed, i) * (hi - lo); if (t < a + d || i > 4000) return [i, (t - a) / d, a, d]; a += d; i++; } }
function full(g, i, seed) { const legs = i % 2 ? { legL: { hip: -6 }, legR: { hip: 2, knee: 4 } } : { legL: { hip: -2, knee: 4 }, legR: { hip: 6 } }; return Object.assign({}, legs, G[g] || g); }
// gesture-cycle pose at time t; TR = transition length
function cycle(t, seed, list, lo, hi, TR = .38) {
  const [i, , a] = segAt(t, seed, lo, hi), pick = j => list[Math.floor(rnd(seed + 7, j) * list.length)];
  let gi = pick(i), gp = pick(i - 1); if (gi === gp) gi = list[(list.indexOf(gi) + 1) % list.length];
  const u = (t - a) / TR, pose = lerpPose(full(gp, i - 1, seed), full(gi, i, seed), u < 1 ? land(u) : 1);
  return { pose, g: G[gi] || {}, segU: u };
}
const breathe = (p, t) => { const b = Math.sin(t * Math.PI * 2 / 3.4); p.bob = (p.bob || 0) + b * 1.1; p.L.sh += b * 1.2; p.R.sh -= b * 1.2; return p; };

const VIS = ['open', 'o', 'flat', 'open', 'smile', 'open', 'flat'];
function mouthAt(t, seed) { const tt = Math.floor(t * 12) / 12, R = rnd(seed, Math.floor(tt * 12)); return (tt % 2.4) > 2.05 ? 'flat' : VIS[Math.floor(R * VIS.length)]; }

// talk: gesture cycle + beat + nods. base = explicit pose (held for `hold` s, then relaxed into gestures)
function talk(t, seed = 3, base = null, hold = 2.4) {
  let { pose, g } = cycle(t, seed, TALK, 1.25, 2.3);
  const bf = g.beat || 1.4, beat = Math.sin(t * Math.PI * 2 * bf);
  if (g !== G.rest) { pose.R.el += (pose.R.el >= 0 ? 1 : -1) * beat * 7; if (g === G.palmsUp || g === G.wide || g === G.shrugSmall) pose.L.el -= (pose.L.el >= 0 ? 1 : -1) * beat * 6; }
  if (base) { const k = io((t - hold) / .45); pose = lerpPose(base, pose, k); }
  const nod = Math.max(0, Math.sin(t * 2.6 + seed)) ** 6 * 4;
  pose.tilt = (pose.tilt || 0) + Math.sin(t * 1.9 + seed) * 2.5; pose.bob = (pose.bob || 0) - Math.abs(beat) * .8 + nod * .3; pose.hairSway = Math.sin(t * 2.1 - .5) * .6;
  breathe(pose, t);
  const mouth = mouthAt(t, seed), blink = ((t + seed % 7 * .3) % 3.1) < .12;
  return { pose, expr: blink ? { base: 'blink', mouth } : { base: 'talk', mouth, brow: { raise: beat > .6 ? .7 : .15 } } };
}
// idle: weight shifts and slow pose changes; explicit poses are acted into (anticipation) and kept alive
function idle(t, base = P0.stand, seed = 5) {
  let pose;
  if (!base || base === P0.stand) pose = cycle(t, seed, IDLE, 2.6, 4.8, .55).pose;
  else { const into = clamp(t / .4); pose = lerpPose(G.rest, JSON.parse(JSON.stringify(base)), into < 1 ? land(into) : 1); if (base.tilt == null) pose.tilt = 0; }
  breathe(pose, t);
  pose.tilt = (pose.tilt || 0) + Math.sin(t * .9 + seed) * 1.8; pose.hairSway = Math.sin(t * 1.3 - .6) * .5;
  const look = Math.sin(t * .37 + seed) > .92 ? 3 : 0; pose.tilt += look;
  return { pose, expr: ((t + seed % 5 * .4) % 3.4) < .14 ? 'blink' : null };
}
// instrument rigs: the prop is anchored to the torso; the hands go to fixed points on it
const PLAY = {
  guitar: t => { const s = Math.sin(t * Math.PI * 2 * 3.2); return { L: A(-48, -62, 'grab', -20), R: A(30, -78 + s * 14, 'fist', 10 + s * 12), legL: { hip: -8 }, legR: { hip: 8, knee: 6 }, lean: 2, tilt: Math.sin(t * 4) * 3, bob: Math.abs(s) * -2 }; },
  cymbals: t => { const k = Math.abs(Math.sin(t * Math.PI * 1.6)); return { L: A(-40 - k * 30, -70 + k * 20, 'fist'), R: A(40 + k * 30, 70 - k * 20, 'fist'), legL: { hip: -6 }, legR: { hip: 6 }, bob: -k * 3 }; },
  mic: t => ({ L: A(-9, 8), R: A(22, -112, 'fist', 6), tilt: Math.sin(t * 3) * 3 }),
  drink: t => { const k = Math.max(0, Math.sin(t * .8)) ** 4; return { L: A(-9, 8), R: A(18 + k * 10, -96 - k * 30, 'grab', 4) }; },
  hold: t => ({ L: A(-9, 8), R: A(24, -84, 'grab', 10) }),
  show: t => ({ L: A(-9, 8), R: A(40, 70, 'grab', -20) }),
};
D.ACTING = { G, talk, idle, PLAY, hash, lerpPose };
D.ANIMS.talk = (t, seed = 3) => talk(t, seed);
D.ANIMS.idle = (t, base, seed) => idle(t, base, seed ?? 5);
})();
