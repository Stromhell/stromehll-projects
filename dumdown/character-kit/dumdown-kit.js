/*!
 * DumDown Character Kit v1
 * A code-only 2D anime character rig + background painter for the DumDown channel.
 * Works in the browser (window.DumDown) and in Node (require('./dumdown-kit.js')).
 *
 * Everything is plain SVG strings, so Claude Code can generate characters, poses,
 * expressions, backgrounds and animation frames without any drawing app.
 *
 * Coordinate system (character space, before scale):
 *   origin = pelvis, +x = viewer's right, +y = down. 1 head ≈ 62 units, body ≈ 6.6 heads.
 * Angle convention for every limb joint:
 *   0° = bone points straight down; positive angle swings the bone's end toward +x.
 *   Child angles are RELATIVE to the parent bone (forward kinematics).
 */
(function (root) {
  'use strict';

  // ───────────────────────────── basic helpers ─────────────────────────────
  const INK = '#231a24';
  let UID = 0;
  const r1 = n => Math.round(n * 10) / 10;
  const P = (x, y) => r1(x) + ',' + r1(y);
  const rad = d => d * Math.PI / 180;
  const dirv = a => [Math.sin(rad(a)), Math.cos(rad(a))];
  const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rotP = (p, a, c = [0, 0]) => { const s = Math.sin(rad(a)), k = Math.cos(rad(a)); const x = p[0] - c[0], y = p[1] - c[1]; return [c[0] + x * k - y * s, c[1] + x * s + y * k]; };

  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

  // colours: anime shadows are cool (multiply toward violet), highlights are soft
  function hx(h) { h = String(h).replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); }
  function toHex(a) { return '#' + a.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); }
  function shade(h, k = 1) { const m = [0.72, 0.68, 0.86]; return toHex(hx(h).map((v, i) => v * (1 - (1 - m[i]) * k))); }
  function light(h, k = 0.35) { return toHex(hx(h).map(v => v + (255 - v) * k)); }
  function mix(a, b, t) { const A = hx(a), B = hx(b); return toHex(A.map((v, i) => v + (B[i] - v) * t)); }

  // ───────────────────────────── path builders ─────────────────────────────
  /** Tapered capsule between joints A and B (radius ra at A, rb at B). The basic "bone skin". */
  function capsule(A, B, ra, rb) {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 0.001;
    const d = [dx / L, dy / L], n = [-d[1], d[0]];
    const a1 = add(A, n, ra), b1 = add(B, n, rb), b2 = add(B, n, -rb), a2 = add(A, n, -ra);
    return `M${P(...a1)}L${P(...b1)}A${r1(rb)} ${r1(rb)} 0 0 0 ${P(...b2)}L${P(...a2)}A${r1(ra)} ${r1(ra)} 0 0 0 ${P(...a1)}Z`;
  }
  /** Like capsule() but with a flat, cut end at B (trouser hems, sleeve ends). */
  function tube(A, B, ra, rb) {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 0.001;
    const d = [dx / L, dy / L], n = [-d[1], d[0]];
    const a1 = add(A, n, ra), b1 = add(B, n, rb), b2 = add(B, n, -rb), a2 = add(A, n, -ra);
    return `M${P(...a1)}L${P(...b1)}Q${P(...add(B, d, 2.5))} ${P(...b2)}L${P(...a2)}A${r1(ra)} ${r1(ra)} 0 0 0 ${P(...a1)}Z`;
  }
  /** Smooth Catmull-Rom path through points. */
  function smooth(pts, closed = true, k = 1) {
    const n = pts.length; if (n < 2) return '';
    const get = i => closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)];
    let d = `M${P(...pts[0])}`;
    const segs = closed ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6 * k, p1[1] + (p2[1] - p0[1]) / 6 * k];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6 * k, p2[1] - (p3[1] - p1[1]) / 6 * k];
      d += `C${P(...c1)} ${P(...c2)} ${P(...p2)}`;
    }
    return d + (closed ? 'Z' : '');
  }
  const poly = pts => 'M' + pts.map(p => P(...p)).join('L') + 'Z';
  const line = (pts, w = 1.6, col = INK, extra = '') => `<path d="M${pts.map(p => P(...p)).join('L')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const curve = (d, w = 1.6, col = INK, extra = '') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

  /**
   * Two-tone cel shading: fill the shape with the shadow colour, then paint the base colour
   * shifted toward the key light (top-left) and clipped to the shape. What is left showing is
   * a crisp shadow band on the bottom-right edge — the core look of TV anime.
   */
  function cel(d, base, o = {}) {
    const id = 'dd' + (++UID);
    const sx = (o.sx ?? 3) * (o.mir ? -1 : 1), sy = o.sy ?? 2.5;
    const sh = o.shade || shade(base);
    const sw = o.sw ?? 2.6;
    let s = `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${sh}"/>` +
      `<g clip-path="url(#${id})"><path d="${d}" fill="${base}" transform="translate(${-sx},${-sy})"/>`;
    if (o.rim) s += `<path d="${d}" fill="none" stroke="${o.rim}" stroke-width="2.2" transform="translate(${sx * 0.6},${sy * 0.6})" opacity=".55"/>`;
    s += (o.inner || '') + `</g>`;
    if (sw) s += `<path d="${d}" fill="none" stroke="${o.ink || INK}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
    return s;
  }

  // ───────────────────────────── views & skeleton ─────────────────────────────
  const VIEWS = { front: 0, threequarter: 45, side: 90, back: 180, threequarterback: 135 };
  const DEFAULT_BODY = { shoulder: 31, hip: 16, torso: 102, neck: 13, upper: 58, fore: 54, thigh: 86, shin: 84, head: 1.32, hand: 1.3 };

  /**
   * Forward kinematics. Returns every joint position for a spec + pose + view.
   * Hierarchy: pelvis → spine(chest) → neck → head
   *                     chest → shoulder.L/R → elbow → wrist → hand
   *            pelvis → hip.L/R → knee → ankle → foot
   */
  function solve(spec, pose, view) {
    const B = Object.assign({}, DEFAULT_BODY, spec.body || {});
    const yaw = typeof view === 'number' ? view : (VIEWS[view] ?? 0);
    const c = Math.cos(rad(yaw)), s = Math.sin(rad(yaw));
    pose = normPose(pose);
    const pelvis = [pose.x || 0, pose.bob || 0];
    const lean = pose.lean || 0;
    const up = [Math.sin(rad(lean)), -Math.cos(rad(lean))];
    const across = [Math.cos(rad(lean)), Math.sin(rad(lean))];
    const at = (h, x) => [pelvis[0] + up[0] * h + across[0] * x, pelvis[1] + up[1] * h + across[1] * x];
    const J = { yaw, c, s, B, lean, up, across, pelvis };
    J.chest = at(B.torso - 40, 0);
    J.neck = at(B.torso - 2, 0);
    const headUp = [Math.sin(rad(lean + (pose.tilt || 0))), -Math.cos(rad(lean + (pose.tilt || 0)))];
    J.head = add(J.neck, headUp, B.neck + 24 * B.head);
    J.headAngle = lean + (pose.tilt || 0);
    for (const side of ['L', 'R']) {
      const sg = side === 'L' ? -1 : 1;
      const a = pose[side];
      const sh = at(B.torso - 14, sg * B.shoulder * c);
      const el = add(sh, dirv(a.sh + lean * 0.3), B.upper);
      const wr = add(el, dirv(a.sh + lean * 0.3 + a.el), B.fore);
      J['sh' + side] = sh; J['el' + side] = el; J['wr' + side] = wr;
      J['handA' + side] = a.sh + lean * 0.3 + a.el + (a.wr || 0);
      J['hand' + side] = a.hand || 'relaxed';
      const lg = pose['leg' + side];
      const hp = [pelvis[0] + sg * B.hip * c, pelvis[1] + 10];
      const kn = add(hp, dirv(lg.hip), B.thigh);
      const an = add(kn, dirv(lg.hip - lg.knee), B.shin);
      J['hip' + side] = hp; J['kn' + side] = kn; J['an' + side] = an;
      J['footA' + side] = lg.hip - lg.knee + (lg.foot || 0);
    }
    return J;
  }

  function normPose(p) {
    p = p || {};
    const arm = (a, d) => Object.assign({ sh: d, el: 0, wr: 0, hand: 'relaxed' }, a || {});
    const leg = (a, d) => Object.assign({ hip: d, knee: 0, foot: 0 }, a || {});
    return Object.assign({}, p, {
      L: arm(p.L, -7), R: arm(p.R, 7),
      legL: leg(p.legL, -2), legR: leg(p.legR, 2)
    });
  }

  // ───────────────────────────── HEAD ─────────────────────────────
  const HEAD_R = 28;
  function proj3(p, yaw) { const c = Math.cos(rad(yaw)), s = Math.sin(rad(yaw)); return [p[0] * c + p[2] * s, p[1], p[2] * c - p[0] * s]; }
  function sphere(lon, lat, R = HEAD_R) { return [R * Math.cos(rad(lat)) * Math.sin(rad(lon)), -4 - R * 1.08 * Math.sin(rad(lat)), R * Math.cos(rad(lat)) * Math.cos(rad(lon))]; }
  function feat(lon, Rx, yaw) { const a = rad(lon + yaw); return { x: Math.sin(a) * Rx, z: Math.cos(a), fs: clamp(Math.cos(a), 0.5, 1) }; }

  function facePath(yaw) {
    const a = ((yaw % 360) + 360) % 360;
    if (a > 112 && a < 248) return 'M-27,-4C-27,-40 27,-40 27,-4C27,18 14,27 0,28C-14,27 -27,18 -27,-4Z';
    const t = Math.abs(Math.sin(rad(a)));
    if (t > 0.92) return 'M-25,-2C-27,-38 24,-40 25,-8C26,-2 27,2 28.5,7L25,9.5C25.5,13 24.5,17 23.5,19C22.5,23 19,27 13,29.5C6,31 0,26 -4,20C-16,17 -25,10 -25,-2Z';
    const xl = -27 + 3 * t, xr = 27 - 1 * t, cx = 16 * t;
    return `M${P(xl, -2)}C${P(xl, -37)} ${P(xr, -37)} ${P(xr, -2)}C${P(xr, 10)} ${P(cx + 12, 23)} ${P(cx, 30)}C${P(cx - 11, 28)} ${P(xl, 16)} ${P(xl, -2)}Z`;
  }

  // Hair styles are recipes for 3D "locks" on the head sphere (lon/lat in degrees).
  const HAIR_STYLES = {
    spiky: { n: 20, lat: [0, 85], len: [16, 30], w: [7.5, 11.5], droop: 0.28, bend: 0.9, bangs: 7, bangLat: 30, bangLen: [14, 22], bangW: [5, 8], bangDroop: 1.9 },
    messy: { n: 28, lat: [-10, 80], len: [10, 19], w: [6.5, 9.5], droop: 0.75, bend: 1.3, bangs: 7, bangLat: 32, bangLen: [14, 21], bangW: [4.5, 7], bangDroop: 2.1 },
    long: { n: 9, lat: [30, 85], len: [6, 10], w: [10, 13], droop: 1.2, bend: 0.8, bangs: 7, bangLat: 34, bangLen: [16, 23], bangW: [5, 7.5], bangDroop: 2.6, curtain: { n: 11, len: [80, 112], w: [13, 17] }, sides: 50 },
    bob: { n: 12, lat: [20, 80], len: [10, 16], w: [8, 11], droop: 1.4, bend: 0.6, bangs: 8, bangLat: 34, bangLen: [16, 20], bangW: [5, 6.5], bangDroop: 2.8, curtain: { n: 12, len: [34, 44], w: [11, 14] }, sides: 30 },
    cloud: { n: 0, lat: [-5, 85], len: [11, 17], w: [12, 16], droop: 0.45, bend: 1.4, round: true, bangs: 5, bangLat: 31, bangLen: [13, 19], bangW: [7, 9.5], bangDroop: 1.8 },
    buzz: { n: 30, lat: [5, 85], len: [4, 7], w: [6, 8], droop: 0.2, bend: 0.2, bangs: 0 }
  };

  function hairLocks(h) {
    const st = HAIR_STYLES[h.style] || HAIR_STYLES.spiky;
    const R = rng(h.seed || 7);
    const out = [];
    const rr = (a) => a[0] + R() * (a[1] - a[0]);
    for (let i = 0; i < st.n; i++) {
      const lon = -180 + 360 * (i + R() * 0.7) / st.n;
      const back = Math.abs(lon) > 90;
      out.push({ lon, lat: rr(st.lat), len: rr(st.len) * (h.volume || 1) * (back ? 1.08 : 1), w: rr(st.w), droop: st.droop, round: st.round, bend: (R() - 0.5) * st.bend + (lon > 0 ? 0.25 : -0.25), wave: (R() - 0.5) * 0.5, fork: R() < 0.35 ? (R() < 0.5 ? -1 : 1) : 0 });
    }
    for (let i = 0; i < st.bangs; i++) {
      const lon = -58 + 116 * (i + 0.5) / st.bangs + (R() - 0.5) * 10;
      out.push({ lon, lat: st.bangLat + R() * 10, len: rr(st.bangLen), w: rr(st.bangW), droop: st.bangDroop, round: st.round, bend: (R() - 0.5) * 0.6 + lon / 90 * 0.6, wave: (R() - 0.5) * 0.4, fork: R() < 0.3 ? (lon > 0 ? 1 : -1) : 0, bang: true });
    }
    if (st.curtain) {
      for (let i = 0; i < st.curtain.n; i++) {
        const lon = 70 + 220 * (i + R() * 0.5) / st.curtain.n;
        out.push({ lon, lat: 8 + R() * 22, len: rr(st.curtain.len) * (h.length || 1), w: rr(st.curtain.w), droop: 3.5, bend: (R() - 0.5) * 0.35, wave: (R() - 0.5) * 0.9, fork: R() < 0.45 ? (R() < 0.5 ? -1 : 1) : 0, curtain: true });
      }
      for (const sg of [-1, 1]) out.push({ lon: sg * 74, lat: 22, len: st.sides * (h.length || 1), w: 11, droop: 4, bend: sg * 0.12, wave: 0.35 * sg, fork: sg, curtain: true, side: true });
    }
    if (h.ahoge) out.push({ lon: 8, lat: 88, len: 26, w: 2.6, droop: -0.3, bend: 0.9, ahoge: true });
    if (h.streak) { const k = out.find(l => l.bang); if (k) k.streak = true; }
    return out;
  }

  /**
   * One hair lock: a tapered ribbon along a curved spine. The spine curls more toward the tip
   * (gravity + bend) with a soft S-wave, the ribbon bulges just past the root, and some locks
   * split into a forked tip. Each lock gets a lit side, a shadow side and one inner strand line.
   */
  function drawLock(L, h, yaw, mir, sway) {
    const n3 = [Math.cos(rad(L.lat)) * Math.sin(rad(L.lon)), -Math.sin(rad(L.lat)), Math.cos(rad(L.lat)) * Math.cos(rad(L.lon))];
    const base3 = sphere(L.lon, L.lat, HEAD_R - 2);
    const spread = L.curtain ? 0.28 : 1; // long hair falls straight down instead of flaring out
    let d3 = [n3[0] * spread, n3[1] + L.droop, n3[2] * spread]; const m = Math.hypot(...d3); d3 = d3.map(v => v / m);
    const tip3 = [base3[0] + d3[0] * L.len, base3[1] + d3[1] * L.len, base3[2] + d3[2] * L.len];
    const b = proj3(base3, yaw), t = proj3(tip3, yaw);
    const swy = (sway || 0) * L.len * (L.curtain ? 0.035 : 0.015);
    const B = [b[0], b[1]], T = [t[0] + swy, t[1]];
    const dx = T[0] - B[0], dy = T[1] - B[1], len = Math.hypot(dx, dy) || 0.01;
    const u = [dx / len, dy / len], p = [-u[1], u[0]];
    const w = L.w * (L.ahoge ? 1 : 1);
    const N = 7;
    const spine = [], wid = [];
    for (let i = 0; i <= N; i++) {
      const k = i / N;
      const off = (L.bend || 0) * len * 0.45 * k * k + (L.wave || 0) * len * 0.18 * Math.sin(k * Math.PI);
      spine.push(add(add(B, u, len * k), p, off));
      wid.push(L.round ? w * (k < 0.5 ? lerp(1, 1.25, k / 0.5) : lerp(1.25, 0.45, (k - 0.5) / 0.5)) : w * (k < 0.25 ? lerp(1, 1.12, k / 0.25) : 1.12 * Math.pow(1 - (k - 0.25) / 0.75, 0.85)));
    }
    const nrm = i => { const a = spine[Math.max(0, i - 1)], c = spine[Math.min(N, i + 1)]; const ex = c[0] - a[0], ey = c[1] - a[1], l = Math.hypot(ex, ey) || 1; return [-ey / l, ex / l]; };
    const left = [], right = [];
    for (let i = 0; i < N; i++) { const q = nrm(i); left.push(add(spine[i], q, wid[i])); right.push(add(spine[i], q, -wid[i])); }
    const tip = spine[N];
    const d = smooth([...left, tip, ...right.slice().reverse()], true, 0.9);
    const lightLeft = (p[0] + p[1]) * (mir ? -1 : 1) > 0;
    const half = lightLeft ? [...spine.slice(0, N), tip, ...right.slice().reverse()] : [...left, tip, ...spine.slice(0, N).reverse()];
    const shadeD = smooth(half, true, 0.9);
    const col = L.streak && h.streak ? h.streak : h.color;
    let svg = `<path d="${d}" fill="${col}"/><path d="${shadeD}" fill="${shade(col)}"/>`;
    if (L.fork && len > 14 && !L.ahoge) {
      // forked tip: a thinner sub-lock peeling off from the middle of the spine
      const s0 = spine[3], q = nrm(3), fl = len * 0.42;
      const dir = [u[0] * 0.85 + q[0] * 0.5 * L.fork, u[1] * 0.85 + q[1] * 0.5 * L.fork];
      const ft = add(s0, dir, fl), fm = add(add(s0, dir, fl * 0.5), q, L.fork * w * 0.3);
      const fw = wid[3] * 0.55;
      const fd = smooth([add(s0, q, fw), add(fm, q, fw * 0.6), ft, add(fm, q, -fw * 0.6), add(s0, q, -fw)], true, 0.9);
      svg = `<path d="${fd}" fill="${shade(col)}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>` + svg;
    }
    svg += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${L.ahoge ? 1.8 : 2}" stroke-linejoin="round"/>`;
    if (len > 16 && !L.ahoge && !L.round) svg += `<path d="${smooth(spine.slice(1, 6).map((pt, i) => add(pt, nrm(i + 1), wid[i + 1] * 0.25)), false)}" fill="none" stroke="${INK}" stroke-width=".9" opacity=".45" stroke-linecap="round"/>`;
    return { z: (b[2] + t[2]) / 2, svg, back: b[2] < 0, bang: L.bang, curtain: L.curtain };
  }

  function hairlinePts(yaw) {
    const pts = [];
    for (let lon = -112; lon <= 112; lon += 8) {
      const a = Math.abs(lon);
      const lat = a < 60 ? 27 - a * 0.05 : a < 95 ? lerp(24, -16, (a - 60) / 35) : -16;
      const p = proj3(sphere(lon, lat, HEAD_R + 0.5), yaw);
      if (p[2] > -2) pts.push([p[0], p[1]]);
    }
    return pts;
  }

  // ── eyes / brows / mouth ──
  const EXPRESSIONS = {
    neutral: { eye: { lid: 1 }, brow: { raise: 0, angle: 0 }, mouth: 'flat' },
    deadpan: { eye: { lid: 0.52 }, brow: { raise: -0.2, angle: 0 }, mouth: 'flat' },
    happy: { eye: { shape: 'happy' }, brow: { raise: 0.6, angle: -0.3 }, mouth: 'grin' },
    smile: { eye: { lid: 0.9 }, brow: { raise: 0.3, angle: 0 }, mouth: 'smile' },
    smug: { eye: { lid: 0.55, look: [0.6, 0] }, brow: { raise: 0.2, angle: 0, oneUp: true }, mouth: 'smirk' },
    angry: { eye: { lid: 0.8, tilt: 0.6, iris: 0.8 }, brow: { raise: -0.6, angle: 1 }, mouth: 'shout', fx: ['vein'] },
    shock: { eye: { lid: 1.18, iris: 0.42, noShine: true }, brow: { raise: 1.2, angle: -0.6 }, mouth: 'shout', fx: ['sweat'] },
    nervous: { eye: { lid: 0.95, iris: 0.7, look: [-0.6, 0.2] }, brow: { raise: 0.6, angle: -0.9 }, mouth: 'wavy', fx: ['sweat'] },
    sad: { eye: { lid: 0.75, look: [0, 0.4] }, brow: { raise: 0.5, angle: -1 }, mouth: 'frown', fx: ['gloom'] },
    blank: { eye: { lid: 1, blank: true }, brow: { raise: 0.4, angle: 0 }, mouth: 'o', fx: ['gloom'] },
    excited: { eye: { lid: 1.08, iris: 1.08, sparkle: true }, brow: { raise: 0.9, angle: -0.2 }, mouth: 'open', fx: ['sparkle'] },
    blink: { eye: { shape: 'closed' }, brow: { raise: 0, angle: 0 }, mouth: 'flat' },
    talk: { eye: { lid: 0.9 }, brow: { raise: 0.2, angle: 0 }, mouth: 'open' }
  };

  function resolveExpr(e) {
    if (!e) e = 'neutral';
    if (typeof e === 'string') e = { base: e };
    const b = EXPRESSIONS[e.base || 'neutral'] || EXPRESSIONS.neutral;
    return {
      eye: Object.assign({ lid: 1, tilt: 0, iris: 1, look: [0, 0] }, b.eye, e.eye || {}),
      brow: Object.assign({}, b.brow, e.brow || {}),
      mouth: e.mouth || b.mouth,
      fx: e.fx || b.fx || [],
      blush: e.blush ?? false
    };
  }

  function drawEye(cx, cy, fs, inner, ex, eyeCol) {
    const w = 9.8 * fs, h = 11.5;
    const g = (x, y) => [cx + x * inner, cy + y];
    if (ex.shape === 'closed') return curve(`M${P(...g(-w, 1))}Q${P(...g(0, 5))} ${P(...g(w, 0))}`, 3.2);
    if (ex.shape === 'happy') return curve(`M${P(...g(-w, 3))}Q${P(...g(0, -8))} ${P(...g(w, 2))}`, 3.2);
    if (ex.shape === 'x') return line([g(-w * .7, -6), g(w * .7, 6)], 2.6) + line([g(-w * .7, 6), g(w * .7, -6)], 2.6);
    const lid = ex.lid, tilt = ex.tilt || 0;
    const top = -h + (1 - lid) * 1.6 * h;
    const O = g(-w, 0.2 * h), I = g(w, 0.05 * h + tilt * 2);
    const C1 = g(-w * 0.5, top), C2 = g(w * 0.55, top + tilt * h * 0.75);
    const B1 = g(w * 0.5, h * 0.95), B2 = g(-w * 0.6, h * 0.95);
    const open = `M${P(...O)}C${P(...C1)} ${P(...C2)} ${P(...I)}C${P(...B1)} ${P(...B2)} ${P(...O)}Z`;
    const id = 'dd' + (++UID);
    const look = ex.look || [0, 0];
    const icx = cx + look[0] * w * 0.38 * (inner > 0 ? 1 : 1), icy = cy + h * 0.16 + look[1] * h * 0.22;
    const rx = w * 0.64 * ex.iris, ry = h * 0.8 * ex.iris;
    let s = `<clipPath id="${id}"><path d="${open}"/></clipPath><path d="${open}" fill="#fff"/><g clip-path="url(#${id})">`;
    s += `<path d="${open}" fill="#d9d4e6" transform="translate(0,${-h * 1.35})"/>`; // lid shadow on the eyeball
    if (!ex.blank) {
      s += `<ellipse cx="${r1(icx)}" cy="${r1(icy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${eyeCol}"/>`;
      s += `<ellipse cx="${r1(icx)}" cy="${r1(icy - ry * 0.5)}" rx="${r1(rx * 1.02)}" ry="${r1(ry * 0.55)}" fill="${shade(eyeCol, 1.5)}"/>`;
      s += `<ellipse cx="${r1(icx)}" cy="${r1(icy + ry * 0.05)}" rx="${r1(rx * 0.42)}" ry="${r1(ry * 0.5)}" fill="${INK}"/>`;
      s += `<ellipse cx="${r1(icx)}" cy="${r1(icy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="none" stroke="${INK}" stroke-width="1"/>`;
      if (!ex.noShine) {
        s += `<circle cx="${r1(icx - rx * 0.32)}" cy="${r1(icy - ry * 0.42)}" r="${r1(Math.max(1.2, w * 0.22))}" fill="#fff"/>`;
        s += `<circle cx="${r1(icx + rx * 0.35)}" cy="${r1(icy + ry * 0.4)}" r="${r1(Math.max(0.7, w * 0.1))}" fill="#fff"/>`;
      }
      if (ex.sparkle) s += star(icx + rx * 0.2, icy - ry * 0.2, 3.2, '#fff');
    }
    s += `</g>`;
    // upper lash: thick, with a flick at the outer corner. Lower lash: a short thin stroke.
    s += curve(`M${P(...O)}C${P(...C1)} ${P(...C2)} ${P(...I)}`, 3.4);
    s += line([O, g(-w - 3.2, 0.2 * h - 3.4)], 2.4);
    s += line([g(-w * 0.45, h * 0.86), g(w * 0.2, h * 0.9)], 1.1);
    if (lid < 0.8) s += curve(`M${P(...g(-w * 0.7, top - 3))}Q${P(...g(0, top - 5.5))} ${P(...g(w * 0.6, top - 2.5 + tilt * 3))}`, 1.1);
    return s;
  }
  function star(x, y, r, col) {
    const pts = []; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.32 : r; pts.push([x + Math.sin(a) * rr, y - Math.cos(a) * rr]); }
    return `<path d="${poly(pts)}" fill="${col}"/>`;
  }

  function drawMouth(mx, my, fs, type) {
    const g = (x, y) => [mx + x * fs, my + y];
    const dark = '#5b1d2c', tongue = '#e0717d';
    switch (type) {
      case 'smile': return curve(`M${P(...g(-7, -1.5))}Q${P(...g(0, 4.5))} ${P(...g(7, -1.5))}`, 2);
      case 'smirk': return curve(`M${P(...g(-5, 1.5))}Q${P(...g(3, 2))} ${P(...g(7.5, -3))}`, 2);
      case 'frown': return curve(`M${P(...g(-6, 2.5))}Q${P(...g(0, -2.5))} ${P(...g(6, 2.5))}`, 2);
      case 'wavy': return curve(`M${P(...g(-7, 0))}L${P(...g(-4.5, -2))}L${P(...g(-1.5, 1))}L${P(...g(1.5, -2))}L${P(...g(4.5, 1))}L${P(...g(7, -1))}`, 1.8);
      case 'o': return `<ellipse cx="${r1(mx)}" cy="${r1(my + 1)}" rx="${r1(3.4 * fs)}" ry="4.2" fill="${dark}" stroke="${INK}" stroke-width="1.8"/>`;
      case 'open': {
        const d = `M${P(...g(-7, 0))}Q${P(...g(0, -1.5))} ${P(...g(7, 0))}Q${P(...g(4.5, 10))} ${P(...g(0, 10))}Q${P(...g(-4.5, 10))} ${P(...g(-7, 0))}Z`;
        return `<path d="${d}" fill="${dark}"/><ellipse cx="${r1(mx)}" cy="${r1(my + 8)}" rx="${r1(4 * fs)}" ry="2.6" fill="${tongue}"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`;
      }
      case 'grin': {
        const d = `M${P(...g(-10, -1.5))}Q${P(...g(0, 1))} ${P(...g(10, -1.5))}Q${P(...g(7, 9))} ${P(...g(0, 9.5))}Q${P(...g(-7, 9))} ${P(...g(-10, -1.5))}Z`;
        let s = `<path d="${d}" fill="#fff"/>` + curve(`M${P(...g(-8.5, 3.6))}Q${P(...g(0, 5.5))} ${P(...g(8.5, 3.6))}`, 1.1);
        for (const x of [-5, -1.5, 2, 5.5]) s += line([g(x, 3.6 + Math.abs(x) * -0.05), g(x + 0.8, 1.2)], 0.9);
        return s + `<path d="${d}" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linejoin="round"/>`;
      }
      case 'shout': {
        const d = `M${P(...g(-9, -2))}Q${P(...g(0, -4.5))} ${P(...g(9, -2))}Q${P(...g(8, 14))} ${P(...g(0, 15.5))}Q${P(...g(-8, 14))} ${P(...g(-9, -2))}Z`;
        const id = 'dd' + (++UID);
        return `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${dark}"/><g clip-path="url(#${id})"><rect x="${r1(mx - 10)}" y="${r1(my - 5)}" width="20" height="5" fill="#fff"/><ellipse cx="${r1(mx)}" cy="${r1(my + 14)}" rx="${r1(6 * fs)}" ry="4.5" fill="${tongue}"/></g><path d="${d}" fill="none" stroke="${INK}" stroke-width="1.9" stroke-linejoin="round"/>`;
      }
      default: return line([g(-5, 0.5), g(4.5, -0.3)], 1.9);
    }
  }

  function drawFx(fx, yaw) {
    let s = '';
    const side = Math.sin(rad(yaw)) > 0.3 ? -1 : 1;
    if (fx.includes('sweat')) {
      const x = 27 * side, y = -14;
      s += `<path d="M${P(x, y)}C${P(x - 5, y + 9)} ${P(x - 6, y + 15)} ${P(x, y + 16)}C${P(x + 6, y + 15)} ${P(x + 5, y + 9)} ${P(x, y)}Z" fill="#9fd8ff" stroke="${INK}" stroke-width="1.6"/><path d="M${P(x - 2, y + 10)}q-0.5,3 1.5,3.5" stroke="#fff" stroke-width="1.4" fill="none"/>`;
    }
    if (fx.includes('vein')) {
      const x = -17 * side, y = -27;
      s += `<g transform="translate(${x},${y})" stroke="#e23a3a" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M-6,-2Q-2,-2 -2,-6M2,-6Q2,-2 6,-2M6,2Q2,2 2,6M-2,6Q-2,2 -6,2"/></g>`;
    }
    if (fx.includes('gloom')) {
      for (let i = 0; i < 7; i++) { const x = -20 + i * 6.5; s += line([[x, -26], [x, -8 + (i % 2) * 5]], 1.3, '#5b4a8a', 'opacity=".55"'); }
    }
    if (fx.includes('sparkle')) s += star(-34, -30, 6, '#ffd84a') + star(34, -36, 4.5, '#ffd84a') + star(38, -14, 3, '#ffd84a');
    return s;
  }

  /** Cloud hair: overlapping puffs on the head sphere, outlined only on the outside edge. */
  function cloudPuffs(h, yaw, mir, front) {
    const R = rng((h.seed || 7) + 99);
    const puffs = [];
    for (const [lat, n, r] of [[-12, 9, 12], [12, 10, 14], [38, 9, 14.5], [62, 6, 13.5], [86, 1, 13]]) {
      for (let i = 0; i < n; i++) {
        const lon = -180 + 360 * (i + 0.5 + (R() - 0.5) * 0.4) / n + lat;
        if (lat < 0 && Math.abs(((lon + 540) % 360) - 180) < 70) continue; // keep the face clear
        const q = proj3(sphere(lon, lat, HEAD_R + 3 * (h.volume || 1)), yaw);
        puffs.push({ x: q[0], y: q[1] - 2, z: q[2], r: r * (0.85 + R() * 0.3) * (h.volume || 1), lat });
      }
    }
    const sel = front ? puffs.filter(p => p.z > 4 && p.lat >= 38) : puffs;
    if (!sel.length) return '';
    const sx = mir ? -1 : 1;
    let o = '', f = '', sh = '';
    for (const p of sel) {
      o += `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(p.r + 1.4)}" fill="${INK}"/>`;
      sh += `<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(p.r)}" fill="${shade(h.color)}"/>`;
    }
    for (const p of sel) f += `<circle cx="${r1(p.x - 2.6 * sx)}" cy="${r1(p.y - 2.6)}" r="${r1(p.r * 0.86)}" fill="${h.color}"/>`;
    // little inner curls so the cloud reads as soft volume
    for (const p of sel.filter((_, i) => i % 3 === 0)) f += `<path d="M${P(p.x - p.r * 0.5, p.y + p.r * 0.2)}q${r1(p.r * 0.35)},${r1(-p.r * 0.45)} ${r1(p.r * 0.75)},${r1(-p.r * 0.15)}" fill="none" stroke="${INK}" stroke-width="1" opacity=".35" stroke-linecap="round"/>`;
    return o + sh + f;
  }
  function boltAhoge(col, yaw) {
    const x = 4 + 10 * Math.sin(rad(yaw));
    return `<path d="M${P(x - 2, -40)}L${P(x + 7, -55)}L${P(x + 2, -55)}L${P(x + 10, -70)}L${P(x - 4, -52)}L${P(x + 1, -52)}L${P(x - 6, -40)}Z" fill="${col}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  }

  function drawHead(spec, J, view, ex, mir, pose, opts) {
    const yaw = J.yaw;
    const h = spec.hair, skin = spec.skin, eyeCol = spec.eyes || '#5a3a2a';
    const E = resolveExpr(ex);
    const locks = hairLocks(h).map(L => drawLock(L, h, yaw, mir, pose.hairSway || 0));
    const backView = Math.cos(rad(yaw)) < -0.4;
    let back = '', front = '';
    const sorted = locks.slice().sort((a, b) => a.z - b.z);
    let behind = '';
    for (const L of sorted) { if (L.curtain && !backView) behind += L.svg; else if (L.back) back += L.svg; else front += L.svg; }
    if (opts && opts.layer === 'behind') return behind;
    const headEll = 'M-29,-6C-29,-44 29,-44 29,-6C29,14 18,22 0,24C-18,22 -29,14 -29,-6Z';
    let s = '';
    // 1 back hair (behind everything on the head)
    s += back + (h.style === 'cloud' ? cloudPuffs(h, yaw, mir, false) : '') + `<path d="${headEll}" fill="${h.color}"/>`;
    // 2 ears
    for (const lon of [-100, 100]) {
      const f = feat(lon, 26.5, yaw);
      if (f.z > -0.25 && !backView || backView) {
        const ew = 4.5 * clamp(Math.abs(Math.sin(rad(lon + yaw))) < 0.5 ? 1.5 : 1, 1, 1.5);
        const ed = `M${P(f.x - ew * 0.6, -6)}C${P(f.x - ew * 1.4, -9)} ${P(f.x + ew * 1.4, -9)} ${P(f.x + ew, 2)}C${P(f.x + ew * 0.8, 9)} ${P(f.x, 11)} ${P(f.x - ew * 0.4, 8)}Z`;
        s += cel(ed, skin, { sw: 2, sx: 1.5, sy: 1.5, mir });
      }
    }
    // 3 face
    const fp = facePath(yaw);
    if (!backView) {
      const fid = 'dd' + (++UID);
      s += `<clipPath id="${fid}"><path d="${fp}"/></clipPath>`;
      s += cel(fp, skin, { sx: 3, sy: 2, mir, sw: 0 });
      // hair shadow cast on the forehead
      const hl = hairlinePts(yaw);
      if (hl.length > 2) {
        const sh = hl.map(p => [p[0] + 2, p[1] + 6]);
        s += `<g clip-path="url(#${fid})"><path d="${poly([[sh[0][0] - 40, sh[0][1] + 10], ...sh, [sh[sh.length - 1][0] + 40, sh[sh.length - 1][1] + 10], [80, -90], [-80, -90]])}" fill="${shade(skin)}"/></g>`;
      }
      s += `<path d="${fp}" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`;
      // 4 features
      const eyeR = feat(-32, 22, yaw), eyeL = feat(32, 22, yaw);
      for (const [f, inner] of [[eyeR, 1], [eyeL, -1]]) if (f.z > 0.05) s += drawEye(f.x, 3, f.fs, inner, E.eye, eyeCol);
      const nose = feat(0, 26, yaw);
      if (nose.z > 0.05 && Math.abs(Math.sin(rad(yaw))) < 0.92) s += line([[nose.x + 0.5, 9], [nose.x + 2, 12.5], [nose.x, 13]], 1.3, shade(skin, 2.2));
      const mouth = feat(0, 20, yaw);
      if (mouth.z > -0.1) s += drawMouth(mouth.x, 20, Math.max(0.55, mouth.fs), E.mouth);
      if (spec.cheekMarks === 'bolt') for (const f of [eyeR, eyeL]) if (f.z > 0.15) { const cx = f.x + (f.x < feat(0, 20, yaw).x ? -5 : 5) * f.fs; s += `<path d="M${P(cx + 1.5 * f.fs, 13)}L${P(cx - 2.5 * f.fs, 17.5)}L${P(cx + 0.5 * f.fs, 17.5)}L${P(cx - 1.5 * f.fs, 22)}" fill="none" stroke="#ffc21a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`; }
      if (E.blush) for (const f of [eyeR, eyeL]) if (f.z > 0.1) for (let i = 0; i < 3; i++) s += line([[f.x - 5 + i * 3.5, 14], [f.x - 7 + i * 3.5, 17.5]], 1.2, '#e2546a');
      if (E.blush) for (const f of [eyeR, eyeL]) if (f.z > 0.1) s += `<ellipse cx="${r1(f.x)}" cy="15.5" rx="7" ry="3" fill="#ff7d8f" opacity=".35"/>`;
    } else {
      s += `<path d="${fp}" fill="${skin}" stroke="${INK}" stroke-width="2.6"/>`;
    }
    // 5 hair cap (everything above the hairline) + front locks
    const hl = hairlinePts(yaw);
    const cid = 'dd' + (++UID);
    let capClip;
    if (backView || hl.length < 3) capClip = 'M-60,-90L60,-90L60,40L-60,40Z';
    else {
      const f0 = hl[0], fN = hl[hl.length - 1];
      capClip = poly([[f0[0] - 60, f0[1] + 30], ...hl, [fN[0] + 60, fN[1] + (Math.abs(Math.sin(rad(yaw))) > 0.9 ? 0 : 30)], [90, -90], [-90, -90]]);
    }
    s += `<clipPath id="${cid}"><path d="${capClip}"/></clipPath><g clip-path="url(#${cid})">${cel(headEll, h.color, { sx: 4, sy: 5, mir, sw: 2.6 })}</g>`;
    if (!backView && hl.length > 2) s += `<path d="M${hl.map(p => P(...p)).join('L')}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    s += front;
    if (h.style === 'cloud') s += cloudPuffs(h, yaw, mir, true);
    if (h.bolt) s += boltAhoge(h.bolt, yaw);
    // hair shine
    s += curve(`M${P(-14 + 10 * Math.sin(rad(yaw)), -30)}Q${P(-6 + 10 * Math.sin(rad(yaw)), -35)} ${P(2 + 10 * Math.sin(rad(yaw)), -33)}`, 2.2, light(h.color, 0.55), 'opacity=".8"');
    // brows on top of the bangs (standard anime see-through brows)
    if (!backView) {
      const br = E.brow;
      for (const [lon, inner] of [[-32, 1], [32, -1]]) {
        const f = feat(lon, 22, yaw); if (f.z < 0.05) continue;
        const w = 9 * f.fs, y = -12 - (br.raise || 0) * 4;
        const up1 = br.oneUp && inner < 0 ? -4 : 0;
        const o = [f.x - w * inner, y + 1 + up1], i = [f.x + w * 0.8 * inner, y + (br.angle || 0) * 5 + up1];
        s += `<path d="M${P(...o)}Q${P((o[0] + i[0]) / 2, y - 2.5 + up1)} ${P(...i)}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>`;
      }
      s += drawFx(E.fx, yaw);
    }
    return s;
  }

  // ───────────────────────────── HANDS ─────────────────────────────
  // Local hand frame: wrist at (0,0), fingers point +y, thumb on +x. Mirrored for the other hand.
  const HAND_POSES = {
    relaxed: { f: [[0.86, 7], [0.9, 2], [0.86, -3], [0.8, -8]], thumb: [0.8, -38], curl: [0.25, 0.3, 0.35, 0.4] },
    open: { f: [[1, 16], [1, 4], [0.96, -8], [0.88, -20]], thumb: [1, -62] },
    fist: { fist: true, thumb: [0.7, 80] },
    point: { f: [[1.05, 4], [0.7, 0], [0.7, -4], [0.66, -8]], thumb: [0.7, 40], curl: [0, 1, 1, 1] },
    peace: { f: [[1, 14], [1, -6], [0.7, -4], [0.66, -8]], thumb: [0.7, 40], curl: [0, 0, 1, 1] },
    thumbsup: { fist: true, thumb: [1.1, 175] },
    grab: { f: [[0.9, 12], [0.92, 3], [0.9, -6], [0.82, -14]], thumb: [0.8, -20], curl: [0.6, 0.6, 0.6, 0.6] }
  };

  function drawHand(wrist, angle, poseName, mirrorX, spec, mir) {
    const hp = HAND_POSES[poseName] || HAND_POSES.relaxed;
    const glove = spec.gloves;
    const skin = spec.skin;
    const palmCol = glove ? glove.color : skin;
    const fingCol = glove && !glove.fingerless ? glove.color : skin;
    const sx = mirrorX ? -1 : 1;
    const hs = (spec.body && spec.body.hand) || DEFAULT_BODY.hand;
    const tf = `translate(${P(...wrist)}) rotate(${r1(-angle)}) scale(${r1(sx * hs * 100) / 100},${r1(hs * 100) / 100})`;
    const lm = mir !== (mirrorX); // shading direction in local frame
    let s = `<g transform="${tf}">`;
    // back-of-hand view: palm block, four fingers with two phalanges each, opposable thumb
    const fingerBase = [[6.4, 13.5], [2.1, 15], [-2.3, 14.6], [-6.4, 13]];
    const lens = [17, 19, 17.5, 14];
    const radii = [3.3, 3.4, 3.2, 2.8];
    const thumb = () => {
      const [k, a] = hp.thumb; const B0 = [8.2, 4];
      const m1 = add(B0, dirv(a), 9.5 * k), m2 = add(m1, dirv(a + (hp.fist ? 30 : -14)), 8.5 * k);
      return cel(capsule(B0, m1, 4.6, 3.8), fingCol, { sx: 1.2, sy: 1, sw: 1.8, mir: lm }) + cel(capsule(m1, m2, 3.8, 3.3), fingCol, { sx: 1.2, sy: 1, sw: 1.8, mir: lm }) +
        line([add(m2, dirv(a - 14), -2.6), add(m2, dirv(a - 14), -0.8)], 0.9, shade(fingCol, 1.6));
    };
    const palm = smooth([[-9, 0], [0, -1.5], [9, 0], [10.5, 8], [9, 15.5], [0, 17], [-9, 15.5], [-10.3, 8]]);
    if (hp.fist) {
      s += cel(palm, palmCol, { sx: 2, sy: 1.5, sw: 2.2, mir: lm });
      for (let i = 0; i < 4; i++) {
        const x = 6.6 - i * 4.4; const A = [x, 14], B2 = [x - 0.6, 20.5];
        s += cel(capsule(A, B2, 3.1, 3.3), fingCol, { sx: 1, sy: 1.2, sw: 1.8, mir: lm });
        s += line([[x - 1.6, 17.5], [x + 1.4, 17.8]], 0.9, INK, 'opacity=".55"');
      }
      s += line([[-6, 8], [-1.5, 9.5]], 1, INK, 'opacity=".5"') + line([[1, 9], [5, 8]], 1, INK, 'opacity=".5"');
      s += thumb();
    } else {
      if (hp.thumb[1] < 0) s += thumb();
      s += cel(palm, palmCol, { sx: 2, sy: 1.5, sw: 2.2, mir: lm });
      hp.f.forEach(([k, a], i) => {
        const b = fingerBase[i], L = lens[i] * k, r = radii[i];
        const curl = (hp.curl || [])[i] || 0;
        const m1 = add(b, dirv(a), L * 0.55 * (1 - curl * 0.35));
        const tip = add(m1, dirv(a * 1.15), L * 0.45 * (1 - curl * 0.75));
        s += cel(capsule(b, m1, r, r * 0.95), fingCol, { sx: 1, sy: 0.8, sw: 1.8, mir: lm });
        s += cel(capsule(m1, tip, r * 0.95, r * 0.85), fingCol, { sx: 1, sy: 0.8, sw: 1.8, mir: lm });
        s += line([add(m1, [-r * 0.7, 0]), add(m1, [r * 0.7, 0.4])], 0.8, INK, 'opacity=".45"'); // knuckle crease
        if (curl < 0.5 && (!glove || glove.fingerless)) s += line([add(tip, dirv(a * 1.15), -2.6), add(tip, dirv(a * 1.15), -0.4)], 1, shade(skin, 1.5)); // nail
      });
      s += line([[-5.5, 9.5], [-3.5, 10.5]], 1, INK, 'opacity=".5"') + line([[-1, 10.5], [1, 11]], 1, INK, 'opacity=".5"') + line([[3, 10.5], [5, 10]], 1, INK, 'opacity=".5"');
      if (hp.thumb[1] >= 0) s += thumb();
    }
    if (glove) {
      s += cel('M-9.5,-4L9.5,-4L10.5,4L-10.5,4Z', glove.cuff || shade(glove.color), { sx: 1, sy: 1, sw: 1.8, mir: lm });
      if (glove.fingerless) s += line([[-9, 14.5], [9, 14.5]], 1.4, INK, 'opacity=".6"');
    }
    return s + '</g>';
  }

  // ───────────────────────────── SHOES ─────────────────────────────
  function drawShoe(ankle, angle, view, spec, mir, side, sx) {
    const sh = spec.shoes || { color: '#e8e8ee', sole: '#d9472b' };
    const s0 = `translate(${P(...ankle)}) rotate(${r1(-angle)}) scale(${r1(sx * 1.15 * 100) / 100},1.15)`;
    const lm = mir !== (sx < 0);
    const upper = sh.type === 'boot'
      ? 'M-13,-30L5,-30Q8,-12 10,-6Q24,-2 33,2Q40,6 38,12L-15,12Q-17,-8 -13,-30Z'
      : 'M-13,-11Q-6,-15 5,-13Q9,-6 12,-4Q26,-1 34,3Q40,7 38,12L-15,12Q-17,0 -13,-11Z';
    const sole = 'M-17,10L39,10Q42,10 42,15Q42,21 36,21L-13,21Q-18,21 -18,16Q-18,10 -17,10Z';
    let s = `<g transform="${s0}">`;
    s += cel(upper, sh.color, { sx: 2.5, sy: 2, sw: 2.4, mir: lm });
    s += cel(sole, sh.sole, { sx: 1.5, sy: 1.5, sw: 2.4, mir: lm });
    s += line([[-16, 15.5], [40, 15.5]], 1, INK, 'opacity=".45"');
    s += line([[24, 0.5], [36, 6]], 1.2, INK, 'opacity=".5"'); // toe cap
    for (let i = 0; i < 3; i++) { const x = 6 + i * 5.2, y = -9 + i * 2.6; s += line([[x - 2, y - 1.5], [x + 2.5, y + 2.5]], 1.4, sh.lace || '#ffffff', ''); s += line([[x - 2, y + 2.5], [x + 2.5, y - 1.5]], 1.4, sh.lace || '#ffffff', ''); }
    if (sh.type === 'boot') for (let i = 0; i < 3; i++) s += `<circle cx="${-4 + i * 0}" cy="${-24 + i * 6}" r="1.6" fill="${sh.sole}" stroke="${INK}" stroke-width=".8"/>`;
    return s + '</g>';
  }

  // ───────────────────────────── TORSO ─────────────────────────────
  // Half-widths at each height: [y from pelvis, front-view half width, side-view front depth, side-view back depth]
  const TORSO_LEVELS = [[-110, 22, 15, 15], [-101, 39, 22, 21], [-74, 36, 26, 21], [-52, 29, 21, 19], [-24, 31, 21, 23], [0, 32, 22, 25], [16, 33, 22, 25]];
  function torsoShape(J, hem, widthK = 1, levels = TORSO_LEVELS) {
    const c2 = J.c * J.c, s2 = J.s * J.s, sgn = J.s >= 0 ? 1 : -1;
    const T = J.B.torso / 112;
    const L = [], R = [];
    for (const [y0, F, Fr, Bk] of levels) {
      const y = y0 <= 0 ? y0 * T : y0;
      if (y > hem) break;
      let xr = (F * c2 + (sgn > 0 ? Fr : Bk) * s2) * widthK, xl = -(F * c2 + (sgn > 0 ? Bk : Fr) * s2) * widthK;
      if (y0 < -100) { xr *= 0.95; xl *= 0.95; }
      const pt = x => [J.pelvis[0] + J.up[0] * -y + J.across[0] * x, J.pelvis[1] + J.up[1] * -y + J.across[1] * x];
      L.push(pt(xl)); R.unshift(pt(xr));
    }
    const yH = hem;
    const last = levels.find(l => l[0] >= hem) || levels[levels.length - 1];
    const F = last[1], Fr = last[2], Bk = last[3];
    const xr = (F * c2 + (sgn > 0 ? Fr : Bk) * s2) * widthK, xl = -(F * c2 + (sgn > 0 ? Bk : Fr) * s2) * widthK;
    const pt = x => [J.pelvis[0] + J.up[0] * -yH + J.across[0] * x, J.pelvis[1] + J.up[1] * -yH + J.across[1] * x];
    return { d: smooth([...L, pt(xl), pt(xr), ...R]), hemL: pt(xl), hemR: pt(xr), at: (y, x) => [J.pelvis[0] + J.up[0] * -y + J.across[0] * x, J.pelvis[1] + J.up[1] * -y + J.across[1] * x] };
  }

  function surfX(J, lon, R) { const a = rad(lon + J.yaw); return { x: Math.sin(a) * R, z: Math.cos(a), fs: Math.max(0.35, Math.cos(a)) }; }

  function drawTorso(spec, J, mir) {
    const top = spec.top || { type: 'tee', color: '#ffffff' };
    const hem = top.hem ?? 14;
    const T = torsoShape(J, hem);
    let s = cel(T.d, top.color, { sx: 6, sy: 3, mir, sw: 2.8, rim: top.rim });
    const back = J.c < -0.4;
    const ctr = surfX(J, 0, 22);
    // folds: two soft crease lines at the waist
    s += curve(`M${P(...T.at(-40, ctr.x - 18 * ctr.fs))}Q${P(...T.at(-34, ctr.x - 10 * ctr.fs))} ${P(...T.at(-30, ctr.x - 2 * ctr.fs))}`, 1.2, INK, 'opacity=".45"');
    s += curve(`M${P(...T.at(-62, ctr.x + 20 * ctr.fs))}Q${P(...T.at(-56, ctr.x + 12 * ctr.fs))} ${P(...T.at(-50, ctr.x + 14 * ctr.fs))}`, 1.2, INK, 'opacity=".4"');
    if (top.type === 'jacket' && !back) {
      // open jacket: shirt panel down the centre line
      const sw = 12 * ctr.fs;
      const shirt = poly([T.at(-108, ctr.x - sw * 0.9), T.at(-108, ctr.x + sw * 0.9), T.at(hem, ctr.x + sw * 1.15), T.at(hem, ctr.x - sw * 1.15)]);
      s += cel(shirt, top.shirt || '#f2f2f2', { sx: 2, sy: 2, sw: 2.2, mir });
      if (top.tie) s += cel(poly([T.at(-104, ctr.x - 3), T.at(-104, ctr.x + 3), T.at(-50, ctr.x + 4.5), T.at(-44, ctr.x), T.at(-50, ctr.x - 4.5)]), top.tie, { sx: 1, sy: 1, sw: 1.8, mir });
      s += line([T.at(-108, ctr.x - sw * 0.9), T.at(-84, ctr.x - sw * 1.6), T.at(-70, ctr.x - sw * 1.05)], 2, INK);
      s += line([T.at(-108, ctr.x + sw * 0.9), T.at(-84, ctr.x + sw * 1.6), T.at(-70, ctr.x + sw * 1.05)], 2, INK);
      if (top.accent) s += line([T.at(-96, ctr.x - sw * 2.4), T.at(-92, ctr.x - sw * 3.2)], 3, top.accent);
    }
    if (top.type === 'hoodie' && !back) {
      const pk = surfX(J, 0, 18);
      if (pk.z > 0.2) {
        const pw = 21 * pk.fs;
        const pocket = smooth([T.at(-36, pk.x - pw * 0.75), T.at(-36, pk.x + pw * 0.75), T.at(-6, pk.x + pw), T.at(-6, pk.x - pw)], true, 0.25);
        s += cel(pocket, top.color, { sx: 2.5, sy: 2.5, sw: 1.8, mir });
      }
      // drawstrings
      const ds = surfX(J, 0, 22);
      if (ds.z > 0.2) for (const o of [-6, 6]) {
        const a = T.at(-104, ds.x + o * ds.fs), b = T.at(-80 + Math.abs(o) * 0.3, ds.x + o * ds.fs * 1.2);
        s += line([a, b], 1.8, top.strings || '#ffffff') + line([b, add(b, [0, 1], 4)], 3.2, top.accent || INK);
      }
    }
    if (top.emblem && !back) {
      const em = surfX(J, 0, 22);
      if (em.z > 0.25) s += emblem(top.emblem, T.at(-72, em.x), em.fs, top.accent || '#ff6a2b', mir);
    }
    if (back && top.backPrint) s += emblem(top.backPrint, T.at(-70, 0), 1.3, top.accent || '#ff6a2b', mir);
    return s;
  }

  function emblem(kind, at, fs, col, mir) {
    const [x, y] = at;
    if (kind === 'play') {
      const r = 9;
      return `<g transform="translate(${P(x, y)}) scale(${r1(fs)},1)"><circle r="${r}" fill="${col}" stroke="${INK}" stroke-width="2"/><path d="M-3,-5L5,0L-3,5Z" fill="#fff" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
    }
    if (kind === 'reel') {
      let s = `<g transform="translate(${P(x, y)}) scale(${r1(fs)},1)"><circle r="10" fill="${col}" stroke="${INK}" stroke-width="2"/><circle r="2" fill="${INK}"/>`;
      for (let i = 0; i < 5; i++) { const a = i * 72; const p = dirv(a); s += `<circle cx="${r1(p[0] * 5.5)}" cy="${r1(p[1] * 5.5)}" r="2.2" fill="#fff" stroke="${INK}" stroke-width=".9"/>`; }
      return s + '</g>';
    }
    if (kind === 'bolt') return `<g transform="translate(${P(x, y)}) scale(${r1(fs * 1.1)},1.1)"><circle r="11" fill="${col}" stroke="${INK}" stroke-width="2"/><path d="M2,-9L-6,2H0L-3,10L6,-2H0Z" fill="#ffd23d" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/></g>`;
    if (kind === 'zz') return `<g transform="translate(${P(x, y)}) scale(${r1(fs)},1)"><path d="M-9,-7H3L-7,7H7" fill="none" stroke="${col}" stroke-width="4" stroke-linejoin="round"/><path d="M-9,-7H3L-7,7H7" fill="none" stroke="${INK}" stroke-width="1" /></g>`;
    return '';
  }

  function drawHood(spec, J, mir, layer) {
    const top = spec.top; if (!top || top.type !== 'hoodie') return '';
    const yaw = ((J.yaw % 360) + 360) % 360;
    const n = J.neck;
    const col = top.hood || top.color;
    if (layer === 'behind' && (yaw < 70 || yaw > 290)) {
      const d = smooth([add(n, [-26, 6]), add(n, [-22, -10]), add(n, [0, -14]), add(n, [22, -10]), add(n, [26, 6]), add(n, [0, 4])]);
      return cel(d, shade(col, 0.6), { sx: 2, sy: 2, sw: 2.4, mir });
    }
    if (layer === 'behind' && yaw >= 70 && yaw <= 110) {
      const d = smooth([add(n, [-28, 14]), add(n, [-30, -6]), add(n, [-14, -14]), add(n, [-2, -4]), add(n, [-6, 12])]);
      return cel(d, col, { sx: 2, sy: 2, sw: 2.4, mir });
    }
    if (layer === 'over' && yaw > 120 && yaw < 240) {
      const d = smooth([add(n, [-24, 0]), add(n, [-20, -10]), add(n, [20, -10]), add(n, [24, 0]), add(n, [14, 30]), add(n, [0, 40]), add(n, [-14, 30])]);
      return cel(d, col, { sx: 3, sy: 3, sw: 2.4, mir }) + curve(`M${P(...add(n, [-10, 4]))}Q${P(...add(n, [0, 14]))} ${P(...add(n, [10, 4]))}`, 1.2, INK, 'opacity=".5"');
    }
    return '';
  }

  // ───────────────────────────── LIMBS ─────────────────────────────
  function drawArm(spec, J, side, mir, far) {
    const top = spec.top || {};
    const skin = spec.skin;
    const sh = J['sh' + side], el = J['el' + side], wr = J['wr' + side];
    const long = top.sleeves !== 'short';
    let s = '';
    const dim = far ? 0.12 : 0;
    const sleeveCol = dim ? mix(top.color, '#2a2440', dim) : top.color;
    const skinCol = dim ? mix(skin, '#2a2440', dim) : skin;
    // forearm
    if (long) {
      s += cel(capsule(el, wr, 9, 8.2), sleeveCol, { sx: 2.5, sy: 2, mir });
      const cuffA = add(wr, [(el[0] - wr[0]) / 64, (el[1] - wr[1]) / 64], 7);
      s += cel(capsule(cuffA, wr, 8.6, 8.6), top.cuff || shade(sleeveCol, 0.6), { sx: 1.5, sy: 1.5, mir, sw: 2.2 });
    } else {
      s += cel(capsule(el, wr, 7.4, 6), skinCol, { sx: 2.5, sy: 2, mir });
      if (spec.wraps) {
        for (let i = 0; i < 5; i++) {
          const t = 0.35 + i * 0.13; const p = [lerp(el[0], wr[0], t), lerp(el[1], wr[1], t)];
          const d = [wr[0] - el[0], wr[1] - el[1]]; const L = Math.hypot(...d); const n = [-d[1] / L, d[0] / L];
          s += line([add(p, n, 7.3), add(add(p, n, -7.3), d, 0.05 / 1)], 1.1, INK, 'opacity=".6"');
        }
        const t0 = [lerp(el[0], wr[0], 0.32), lerp(el[1], wr[1], 0.32)];
        s = s.replace(/$/, '') + `<path d="${capsule(t0, wr, 7.6, 6.6)}" fill="#f4f1ea" opacity=".92" stroke="${INK}" stroke-width="1.6"/>`;
        for (let i = 0; i < 4; i++) {
          const t = 0.42 + i * 0.15; const p = [lerp(el[0], wr[0], t), lerp(el[1], wr[1], t)];
          const d = [wr[0] - el[0], wr[1] - el[1]]; const L = Math.hypot(...d); const n = [-d[1] / L, d[0] / L], u = [d[0] / L, d[1] / L];
          s += line([add(p, n, 7), add(add(p, n, -7), u, 4)], 1, INK, 'opacity=".55"');
        }
      }
    }
    // hand
    const handMirror = side === 'R' ? J.c >= -0.3 : J.c < -0.3;
    s += drawHand(wr, J['handA' + side], J['hand' + side], handMirror, spec, mir);
    // upper arm (drawn over the elbow so the sleeve edge reads)
    if (long) s += cel(capsule(sh, el, 10.5, 9.2), sleeveCol, { sx: 3, sy: 2.5, mir });
    else {
      s += cel(capsule(sh, el, 8.5, 7.4), skinCol, { sx: 3, sy: 2, mir });
      const sl = add(sh, [(el[0] - sh[0]) / J.B.upper, (el[1] - sh[1]) / J.B.upper], 34);
      s += cel(capsule(sh, sl, 12, 11), sleeveCol, { sx: 3, sy: 2.5, mir });
    }
    // elbow crease
    s += line([add(el, [-3, -2]), add(el, [2, 1])], 1.1, INK, 'opacity=".45"');
    return s;
  }

  function drawLeg(spec, J, side, mir, far) {
    const bot = spec.bottom || { color: '#2b3a55' };
    const hp = J['hip' + side], kn = J['kn' + side], an = J['an' + side];
    const col = far ? mix(bot.color, '#2a2440', 0.12) : bot.color;
    const baggy = bot.baggy;
    let s = '';
    if (!baggy) s += cel(capsule(kn, an, 10.5, 8.5), col, { sx: 3, sy: 2, mir });
    // shoe: profile points toward the facing direction in 3/4 + side, splayed outward in front/back
    const yaw = J.yaw; const sgn = side === 'L' ? -1 : 1;
    let sx;
    if (Math.abs(J.s) > 0.3) sx = (J.s > 0 ? 1 : -1) * (Math.abs(J.s) > 0.9 ? 1 : 0.85);
    else sx = sgn * 0.74 * (J.c < 0 ? -1 : 1);
    s += drawShoe(add(an, [0, 2]), J['footA' + side] - (J['footA' + side] - 0) + (J['footA' + side]), yaw, spec, mir, side, sx);
    if (baggy) {
      // baggy trousers: flared tube with a flat hem that sits on the shoe + stacked folds
      const d = [an[0] - kn[0], an[1] - kn[1]]; const L = Math.hypot(...d); const u = [d[0] / L, d[1] / L], n = [-u[1], u[0]];
      const hem = add(an, u, 3);
      s += cel(tube(kn, hem, 13, 15.5), col, { sx: 3, sy: 2, mir });
      for (const k of [16, 26]) s += curve(`M${P(...add(add(an, u, -k), n, -12))}Q${P(...add(add(an, u, -k + 5), n, 0))} ${P(...add(add(an, u, -k - 2), n, 11))}`, 1.2, INK, 'opacity=".5"');
      s += line([add(hem, n, -15), add(hem, n, 15)], 3, bot.cuff || shade(col, 0.6));
    }
    s += cel(capsule(hp, kn, 15, baggy ? 13.5 : 11.5), col, { sx: 3.5, sy: 2.5, mir });
    s += line([add(kn, [-5, -3]), add(kn, [1, 0]), add(kn, [5, -4])], 1.1, INK, 'opacity=".45"');
    if (bot.kneePad) s += cel(`M${P(...add(kn, [-9, -4]))}L${P(...add(kn, [9, -4]))}L${P(...add(kn, [7, 9]))}L${P(...add(kn, [0, 13]))}L${P(...add(kn, [-7, 9]))}Z`, bot.kneePad, { sx: 1.5, sy: 1.5, mir, sw: 2 });
    if (bot.stripe) s += line([add(hp, [6 * (side === 'L' ? -1 : 1) * J.c, 4]), add(kn, [7 * (side === 'L' ? -1 : 1) * J.c, 0])], 2.4, bot.stripe);
    return s;
  }

  function drawHips(spec, J, mir) {
    const bot = spec.bottom || { color: '#2b3a55' };
    const T = torsoShape(J, 28, 1, [[-30, 30, 18, 20], [0, 31, 19, 22], [16, 31, 20, 23], [30, 26, 18, 20]]);
    let s = cel(T.d, bot.color, { sx: 4, sy: 2, mir });
    if (spec.belt) {
      const b = torsoShape(J, -2, 1.02, [[-12, 31, 18.6, 21], [-2, 31.5, 19, 22]]);
      s += cel(b.d, spec.belt.color, { sx: 1.5, sy: 1.5, mir, sw: 2.2 });
      const c = surfX(J, 0, 19); if (c.z > 0.2) s += `<rect x="${r1(T.at(-7, c.x)[0] - 4 * c.fs)}" y="${r1(T.at(-7, c.x)[1] - 4.5)}" width="${r1(8 * c.fs)}" height="9" rx="1.5" fill="${spec.belt.buckle || '#c9c9d4'}" stroke="${INK}" stroke-width="1.6"/>`;
      if (spec.belt.pouch) for (const lon of [-62, 62]) { const p = surfX(J, lon, 31); if (p.z > -0.1) { const a = T.at(-6, p.x); s += cel(`M${P(a[0] - 6 * p.fs, a[1] - 6)}h${r1(12 * p.fs)}v14h${r1(-12 * p.fs)}Z`, spec.belt.pouch, { sx: 1.5, sy: 1.5, mir, sw: 1.8 }); } }
    }
    return s;
  }

  // ───────────────────────────── CHARACTER ─────────────────────────────
  /**
   * drawCharacter(spec, opts) → SVG <g> string
   *   opts.view   'front' | 'threequarter' | 'side' | 'back' | 'threequarterback' | number(yaw°)
   *   opts.dir    1 faces viewer-right (default), -1 mirrors to face left
   *   opts.pose   pose object (see POSES) – joints are FK angles
   *   opts.expr   expression name or {base, eye, brow, mouth, fx, blush}
   *   opts.x, opts.y  where the FEET touch the ground; opts.scale (default 1)
   */
  function drawCharacter(spec, opts = {}) {
    const view = opts.view ?? 'front';
    const pose = normPose(opts.pose || POSES.stand);
    const J = solve(spec, pose, view);
    const dir = opts.dir ?? 1, mir = dir < 0;
    const sc = (opts.scale ?? 1) * (spec.scale || 1);
    const footY = J.B.thigh + J.B.shin + 30;
    const tf = `translate(${r1(opts.x ?? 0)},${r1(opts.y ?? 0)}) scale(${r1(dir * sc * 1000) / 1000},${r1(sc * 1000) / 1000}) translate(0,${-footY})`;
    const sideOn = Math.abs(J.s) > 0.3;
    const backView = J.c < -0.4;
    // which arm/leg is nearer the camera: with yaw>0 the character's right (L in screen terms) is near
    const nearSide = J.s > 0 ? 'L' : 'R', farSide = nearSide === 'L' ? 'R' : 'L';
    let s = `<g transform="${tf}">`;
    s += `<ellipse cx="0" cy="${footY - 6}" rx="${sideOn ? 48 : 44}" ry="7" fill="#000" opacity=".14"/>`;
    // long hair hangs BEHIND the body: draw it first, at the head's transform
    const headTf = `translate(${P(...J.head)}) rotate(${r1(J.headAngle)}) scale(${r1(J.B.head)})`;
    s += `<g transform="${headTf}">${drawHead(spec, J, view, opts.expr, mir, pose, { layer: 'behind' })}</g>`;
    // long-hair back curtain sits behind the body
    const head = drawHead(spec, J, view, opts.expr, mir, pose);
    if (sideOn) {
      s += drawArm(spec, J, farSide, mir, true);
      s += drawLeg(spec, J, farSide, mir, true);
      s += drawHips(spec, J, mir);
      s += drawLeg(spec, J, nearSide, mir, false);
    } else {
      s += drawLeg(spec, J, 'L', mir, false) + drawLeg(spec, J, 'R', mir, false);
      s += drawHips(spec, J, mir);
    }
    s += drawHood(spec, J, mir, 'behind');
    s += cel(capsule(J.neck, add(J.neck, [Math.sin(rad(J.headAngle)), -Math.cos(rad(J.headAngle))], J.B.neck + 4), 7, 6.5), spec.skin, { sx: 3, sy: -4, mir, shade: shade(spec.skin, 1.3) });
    s += drawTorso(spec, J, mir);
    s += drawHood(spec, J, mir, 'over');
    if (spec.scarf) s += cel(smooth([add(J.neck, [-17, 2]), add(J.neck, [0, -6]), add(J.neck, [17, 2]), add(J.neck, [14, 12]), add(J.neck, [0, 8]), add(J.neck, [-14, 12])]), spec.scarf, { sx: 2, sy: 2, mir });
    if (sideOn) s += drawArm(spec, J, nearSide, mir, false);
    else s += drawArm(spec, J, 'L', mir, false) + drawArm(spec, J, 'R', mir, false);
    s += `<g transform="translate(${P(...J.head)}) rotate(${r1(J.headAngle)}) scale(${r1(J.B.head)})">${head}</g>`;
    if (backView && spec.hair) { /* back view hair already drawn in head */ }
    s += '</g>';
    return s;
  }

  /** Skeleton overlay (bones + pivots) for teaching and debugging rigs. */
  function drawSkeleton(spec, opts = {}) {
    const pose = normPose(opts.pose || POSES.stand);
    const J = solve(spec, pose, opts.view ?? 'front');
    const dir = opts.dir ?? 1; const sc = (opts.scale ?? 1) * (spec.scale || 1);
    const footY = J.B.thigh + J.B.shin + 30;
    const col = opts.color || '#ff3d6e';
    let s = `<g transform="translate(${r1(opts.x ?? 0)},${r1(opts.y ?? 0)}) scale(${dir * sc},${sc}) translate(0,${-footY})">`;
    const bone = (a, b) => s += `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
    bone(J.pelvis, J.chest); bone(J.chest, J.neck); bone(J.neck, J.head);
    for (const sd of ['L', 'R']) {
      const handTip = add(J['wr' + sd], dirv(J['handA' + sd]), 26);
      const footTip = add(J['an' + sd], dirv(J['footA' + sd] + 90 * (J.s < -0.3 ? -1 : 1)), 0);
      bone(J.chest, J['sh' + sd]); bone(J['sh' + sd], J['el' + sd]); bone(J['el' + sd], J['wr' + sd]); bone(J['wr' + sd], handTip);
      bone(J.pelvis, J['hip' + sd]); bone(J['hip' + sd], J['kn' + sd]); bone(J['kn' + sd], J['an' + sd]);
    }
    const dot = (p, r = 5) => s += `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r}" fill="#fff" stroke="${col}" stroke-width="2.5"/>`;
    for (const k of ['pelvis', 'chest', 'neck', 'head', 'shL', 'shR', 'elL', 'elR', 'wrL', 'wrR', 'hipL', 'hipR', 'knL', 'knR', 'anL', 'anR']) dot(J[k], k === 'pelvis' ? 7 : 5);
    return s + '</g>';
  }

  // ───────────────────────────── POSES ─────────────────────────────
  const POSES = {
    stand: { L: { sh: -8, el: 6, hand: 'relaxed' }, R: { sh: 8, el: -6, hand: 'relaxed' }, legL: { hip: -3 }, legR: { hip: 3 } },
    standSide: { L: { sh: 4, el: 14 }, R: { sh: -6, el: 12 }, legL: { hip: 2 }, legR: { hip: -4 } },
    wave: { L: { sh: -10, el: 8 }, R: { sh: 150, el: 28, wr: -10, hand: 'open' }, legL: { hip: -4 }, legR: { hip: 4 }, tilt: -5 },
    point: { L: { sh: -10, el: 8 }, R: { sh: 92, el: 4, hand: 'point' }, legL: { hip: -5 }, legR: { hip: 5 }, lean: -3 },
    shrug: { L: { sh: -40, el: -95, wr: -10, hand: 'open' }, R: { sh: 40, el: 95, wr: 10, hand: 'open' }, legL: { hip: -3 }, legR: { hip: 4 }, tilt: 8 },
    think: { L: { sh: -6, el: 70, hand: 'relaxed' }, R: { sh: 14, el: -150, wr: 10, hand: 'fist' }, legL: { hip: -2 }, legR: { hip: 6, knee: 6 }, tilt: 7 },
    fistPump: { L: { sh: -12, el: 10, hand: 'fist' }, R: { sh: 160, el: -12, hand: 'fist' }, legL: { hip: -8 }, legR: { hip: 6 }, tilt: -4 },
    hips: { L: { sh: -42, el: 70, hand: 'fist' }, R: { sh: 42, el: -70, hand: 'fist' }, legL: { hip: -6 }, legR: { hip: 6 } },
    peace: { L: { sh: -8, el: 6 }, R: { sh: 128, el: 70, hand: 'peace' }, legL: { hip: -4 }, legR: { hip: 5 }, tilt: 6 },
    thumbsUp: { L: { sh: -8, el: 6 }, R: { sh: 40, el: 75, hand: 'thumbsup' }, legL: { hip: -4 }, legR: { hip: 4 } }
  };

  // ───────────────────────────── ANIMATION ─────────────────────────────
  const ease = { inOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t };
  /** Hold every drawing for two frames at 24fps → 12 drawings/sec: the TV-anime "on twos" feel. */
  const onTwos = t => Math.floor(t * 12) / 12;

  const ANIMS = {
    /** breathing idle + automatic blinks */
    idle(t, base = POSES.stand) {
      const b = Math.sin(t * Math.PI * 2 / 3.2);
      const p = JSON.parse(JSON.stringify(base));
      p.bob = b * 1.2; p.tilt = (p.tilt || 0) + Math.sin(t * 0.9) * 2;
      p.L.sh += b * 1.5; p.R.sh -= b * 1.5; p.L.el += b * 2; p.R.el -= b * 2;
      p.hairSway = Math.sin(t * 1.3 - 0.6) * 0.6;
      const blink = (t % 3.4) < 0.14;
      return { pose: p, expr: blink ? 'blink' : null };
    },
    /** side-view walk: contact → down → passing → up, legs and arms in opposition */
    walk(t, speed = 1) {
      const ph = t * Math.PI * 2 * speed * 1.05;
      const s = Math.sin(ph), c2 = Math.cos(ph * 2);
      const kneeA = Math.max(0, Math.sin(ph + 1.2)) * 48 + 6, kneeB = Math.max(0, Math.sin(ph + Math.PI + 1.2)) * 48 + 6;
      const p = {
        bob: -c2 * 3.5 + 1, lean: 4, tilt: -2,
        legL: { hip: s * 27, knee: kneeA, foot: -Math.min(0, s) * 10 + Math.max(0, -Math.sin(ph + 1.2)) * -6 },
        legR: { hip: -s * 27, knee: kneeB, foot: -Math.min(0, -s) * 10 },
        L: { sh: -s * 24, el: 22 + Math.max(0, -s) * 18, hand: 'relaxed' },
        R: { sh: s * 24, el: 22 + Math.max(0, s) * 18, hand: 'relaxed' },
        hairSway: -1.4 - c2 * 0.8
      };
      return { pose: p, expr: (t % 2.6) < 0.12 ? 'blink' : 'smile' };
    },
    /** friendly wave with overlapping action on the forearm */
    wave(t) {
      const w = Math.sin(t * Math.PI * 2 * 1.6);
      const p = JSON.parse(JSON.stringify(POSES.wave));
      p.R.el = 28 + w * 24; p.R.wr = -10 + Math.sin(t * Math.PI * 2 * 1.6 - 0.8) * 14; p.R.sh = 150 + w * 4;
      p.bob = Math.abs(w) * -1.2; p.tilt = -5 + w * 2; p.hairSway = w * 0.8;
      return { pose: p, expr: (t % 3) < 0.12 ? { base: 'happy' } : { base: 'smile', mouth: 'grin' } };
    },
    /** narrator talking: viseme flaps on twos, hand beats on stressed syllables */
    talk(t, seed = 3) {
      const tt = onTwos(t);
      const R = rng(seed + Math.floor(tt * 12));
      const visemes = ['open', 'o', 'flat', 'open', 'smile', 'open', 'flat'];
      const mouth = (tt % 2.4) > 2.0 ? 'flat' : visemes[Math.floor(R() * visemes.length)];
      const beat = Math.sin(t * Math.PI * 2 * 0.8);
      const p = {
        L: { sh: -10, el: 8, hand: 'relaxed' }, R: { sh: 34 + beat * 10, el: -88 - beat * 10, wr: 6, hand: beat > 0.2 ? 'open' : 'relaxed' },
        legL: { hip: -3 }, legR: { hip: 4 }, tilt: Math.sin(t * 2.1) * 3, bob: Math.abs(beat) * -0.8, hairSway: Math.sin(t * 2.1 - 0.5) * 0.5
      };
      const blink = (t % 2.9) < 0.12;
      return { pose: p, expr: blink ? { base: 'blink', mouth } : { base: 'talk', mouth, brow: { raise: beat > 0.6 ? 0.7 : 0.15 } } };
    },
    /** comedy "shock take": anticipation squash → leap → hang → land. 1.8s loop */
    shock(t) {
      const T = t % 1.8;
      let bob = 0, arms = -10, el = 8, ex = 'deadpan', sway = 0, legsK = 0;
      if (T < 0.35) { const k = ease.out(T / 0.35); bob = 8 * k; legsK = 22 * k; ex = 'deadpan'; }
      else if (T < 0.55) { const k = ease.out((T - 0.35) / 0.2); bob = lerp(8, -46, k); arms = lerp(-10, -150, k); el = lerp(8, -30, k); ex = 'shock'; sway = 2.5 * k; legsK = lerp(22, 34, k); }
      else if (T < 1.0) { bob = -46 + Math.sin((T - 0.55) / 0.45 * Math.PI) * -4; arms = -150; el = -30 + Math.sin(T * 40) * 4; ex = 'shock'; sway = 2.5 - (T - 0.55) * 4; legsK = 34; }
      else if (T < 1.2) { const k = ease.in((T - 1.0) / 0.2); bob = lerp(-46, 10, k); arms = lerp(-150, -60, k); el = -20; ex = 'shock'; sway = -2 * k; legsK = lerp(34, 26, k); }
      else { const k = ease.out((T - 1.2) / 0.6); bob = lerp(10, 0, k); arms = lerp(-60, -10, k); el = lerp(-20, 8, k); ex = 'nervous'; sway = lerp(-2, 0, k); legsK = lerp(26, 0, k); }
      const p = { bob, L: { sh: arms, el: el, hand: T > 0.35 && T < 1.2 ? 'open' : 'relaxed' }, R: { sh: -arms, el: -el, hand: T > 0.35 && T < 1.2 ? 'open' : 'relaxed' }, legL: { hip: -4 - legsK * 0.4, knee: -legsK }, legR: { hip: 4 + legsK * 0.4, knee: legsK }, hairSway: sway };
      return { pose: p, expr: ex };
    }
  };

  // ───────────────────────────── BACKGROUNDS ─────────────────────────────
  function grad(id, stops, vertical = true) { return `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`; }
  function cloud(x, y, w, R, col, sh) {
    const blobs = []; const n = 5 + Math.floor(R() * 4);
    for (let i = 0; i < n; i++) blobs.push([x + (i / (n - 1) - 0.5) * w, y - Math.sin(i / (n - 1) * Math.PI) * w * 0.18 * (0.6 + R() * 0.8), w * (0.13 + R() * 0.1)]);
    let s = '';
    for (const [bx, by, r] of blobs) s += `<circle cx="${r1(bx)}" cy="${r1(by + 4)}" r="${r1(r)}" fill="${sh}"/>`;
    for (const [bx, by, r] of blobs) s += `<circle cx="${r1(bx - r * 0.12)}" cy="${r1(by - r * 0.1)}" r="${r1(r * 0.92)}" fill="${col}"/>`;
    s += `<rect x="${r1(x - w * 0.55)}" y="${r1(y)}" width="${r1(w * 1.1)}" height="${r1(w * 0.09)}" rx="${r1(w * 0.045)}" fill="${sh}"/>`;
    return s;
  }
  function windows(x, y, w, h, R, opt) {
    let s = ''; const cw = opt.cw || 9, ch = opt.ch || 12, gx = opt.gx || 6, gy = opt.gy || 8;
    for (let yy = y + gy; yy + ch < y + h; yy += ch + gy) for (let xx = x + gx; xx + cw < x + w; xx += cw + gx) {
      const lit = R() < (opt.lit ?? 0.35);
      s += `<rect x="${r1(xx)}" y="${r1(yy)}" width="${cw}" height="${ch}" fill="${lit ? opt.on : opt.off}"/>`;
    }
    return s;
  }

  const BACKGROUNDS = {
    /** Rooftop at sunset over a dense city: the classic slice-of-life anime establishing shot */
    rooftop(W, H, seed = 11) {
      const R = rng(seed); const id = 'bg' + (++UID);
      let s = `<defs>${grad(id + 's', [[0, '#3b2a6e'], [0.45, '#b4508a'], [0.75, '#ff8a5c'], [1, '#ffd38a']])}<radialGradient id="${id}g" cx=".72" cy=".62" r=".35"><stop offset="0" stop-color="#fff2c4" stop-opacity=".9"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></radialGradient></defs>`;
      s += `<rect width="${W}" height="${H}" fill="url(#${id}s)"/><rect width="${W}" height="${H}" fill="url(#${id}g)"/>`;
      s += `<circle cx="${W * 0.72}" cy="${H * 0.6}" r="${H * 0.07}" fill="#fff4cf"/>`;
      for (let i = 0; i < 6; i++) s += cloud(R() * W, H * (0.1 + R() * 0.35), 120 + R() * 220, R, mix('#ffb4a0', '#ffe2c8', R()), '#c4608e');
      // far skyline
      let x = 0; while (x < W) { const w = 30 + R() * 60, h = H * (0.12 + R() * 0.18); s += `<rect x="${r1(x)}" y="${r1(H * 0.66 - h)}" width="${r1(w + 1)}" height="${r1(h + H)}" fill="#8b4f8f"/>`; x += w; }
      // mid buildings with windows
      x = -20; while (x < W) {
        const w = 60 + R() * 90, h = H * (0.18 + R() * 0.22), y = H * 0.74 - h;
        s += `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h + H)}" fill="#5d3a78"/><rect x="${r1(x + w - 8)}" y="${r1(y)}" width="8" height="${r1(h + H)}" fill="#4a2d63"/>`;
        s += `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="3" fill="#ffb27a" opacity=".7"/>`;
        s += windows(x, y, w - 8, h, R, { on: '#ffd98a', off: '#4c2f66', lit: 0.3, cw: 7, ch: 9, gx: 6, gy: 7 });
        if (R() < 0.3) s += `<rect x="${r1(x + w * 0.4)}" y="${r1(y - 26)}" width="3" height="26" fill="#3a2350"/><circle cx="${r1(x + w * 0.4 + 1.5)}" cy="${r1(y - 27)}" r="2.5" fill="#ff4d6d"/>`;
        x += w + R() * 8;
      }
      // rooftop floor
      const fy = H * 0.78;
      s += `<rect x="0" y="${fy}" width="${W}" height="${H - fy}" fill="#8c8aa6"/>`;
      for (let i = -12; i <= 12; i++) s += line([[W / 2 + i * 30, fy], [W / 2 + i * 150, H]], 1, '#6f6c8c');
      for (let k = 1; k < 6; k++) { const yy = fy + (H - fy) * Math.pow(k / 6, 1.6); s += line([[0, yy], [W, yy]], 1, '#6f6c8c'); }
      s += `<rect x="0" y="${fy}" width="${W}" height="6" fill="#b5b0cc"/>`;
      // railing
      const ry = fy - 70;
      s += `<rect x="0" y="${r1(ry)}" width="${W}" height="6" fill="#2d2440"/><rect x="0" y="${r1(ry + 32)}" width="${W}" height="4" fill="#2d2440"/>`;
      for (let xx = 10; xx < W; xx += 46) s += `<rect x="${xx}" y="${r1(ry)}" width="5" height="72" fill="#2d2440"/><rect x="${xx}" y="${r1(ry)}" width="2" height="72" fill="#ff9d7a" opacity=".5"/>`;
      // water tank + AC unit
      const tx = W * 0.08;
      s += `<g>${cel(`M${tx},${fy - 190}h110v120h-110Z`, '#6b5b8e', { sx: -14, sy: 0, sw: 3, shade: '#3e3160' })}<path d="M${tx - 6},${fy - 190}h122l-10,-26h-102Z" fill="#4b3d72" stroke="${INK}" stroke-width="3"/>`;
      for (const lx of [tx + 8, tx + 96]) s += `<rect x="${lx}" y="${fy - 70}" width="6" height="70" fill="#2d2440"/>`;
      for (let i = 1; i < 4; i++) s += line([[tx, fy - 190 + i * 30], [tx + 110, fy - 190 + i * 30]], 1.5, '#3e3160');
      s += `</g>`;
      s += cel(`M${W - 210},${fy - 46}h120v50h-120Z`, '#cfcadf', { sx: -6, sy: -3, sw: 3, shade: '#8f89ad' });
      s += `<circle cx="${W - 150}" cy="${fy - 21}" r="17" fill="#8f89ad" stroke="${INK}" stroke-width="2.5"/>` + line([[W - 165, fy - 21], [W - 135, fy - 21]], 2) + line([[W - 150, fy - 36], [W - 150, fy - 6]], 2);
      for (let i = 0; i < 5; i++) { const bx = W * (0.3 + R() * 0.4), by = H * (0.15 + R() * 0.2); s += curve(`M${r1(bx - 6)},${r1(by)}q3,-4 6,0q3,-4 6,0`, 1.6, '#3b2a6e'); }
      return s;
    },

    /** Nerdy home-theatre room at night: the DumDown "studio" */
    room(W, H, seed = 5) {
      const R = rng(seed); const id = 'bg' + (++UID);
      const fy = H * 0.7;
      let s = `<defs>${grad(id + 'w', [[0, '#2d2a4a'], [1, '#433a63']])}<radialGradient id="${id}l" cx=".2" cy=".45" r=".45"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient><radialGradient id="${id}t" cx=".78" cy=".55" r=".4"><stop offset="0" stop-color="#7ad7ff" stop-opacity=".45"/><stop offset="1" stop-color="#7ad7ff" stop-opacity="0"/></radialGradient></defs>`;
      s += `<rect width="${W}" height="${H}" fill="url(#${id}w)"/>`;
      for (let x = 0; x < W; x += 40) s += `<rect x="${x}" y="0" width="20" height="${fy}" fill="#ffffff" opacity=".025"/>`;
      // window with night city
      const wx = W * 0.36, wy = H * 0.1, ww = W * 0.26, wh = H * 0.38;
      s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#1b1838"/>`;
      let x = wx; while (x < wx + ww) { const w = 18 + R() * 30, h = wh * (0.3 + R() * 0.5); s += `<rect x="${r1(x)}" y="${r1(wy + wh - h)}" width="${r1(Math.min(w, wx + ww - x))}" height="${r1(h)}" fill="#2b2650"/>` + windows(x, wy + wh - h, Math.min(w, wx + ww - x), h, R, { on: '#ffe08a', off: '#2b2650', lit: 0.25, cw: 3, ch: 4, gx: 4, gy: 5 }); x += w; }
      s += `<circle cx="${r1(wx + ww * 0.8)}" cy="${r1(wy + wh * 0.2)}" r="14" fill="#fff6d6"/>`;
      s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#1a1528" stroke-width="10"/><rect x="${r1(wx + ww / 2 - 3)}" y="${wy}" width="6" height="${wh}" fill="#1a1528"/>`;
      // curtains
      for (const cx0 of [wx - 40, wx + ww - 10]) { let d = `M${cx0},${wy - 20}h50`; for (let i = 0; i <= 6; i++) d += `L${r1(cx0 + 50 - (i % 2) * 6)},${r1(wy - 20 + i * (wh + 60) / 6)}`; d += `h-50Z`; s += cel(d, '#b03a5b', { sx: -5, sy: 0, sw: 2.6 }); for (let i = 1; i < 4; i++) s += line([[cx0 + i * 12, wy - 10], [cx0 + i * 12 - 2, wy + wh + 30]], 1.2, '#7a2240'); }
      // posters (original parody titles)
      const posters = [['MEGA SHARK', 'VS TAX SEASON', '#ffcf3d', '#1d3c78'], ['THE LAST', 'TOASTER', '#ff6a2b', '#2a1a3d'], ['GLORP 3', 'GLORP HARDER', '#7af0c4', '#3d1a4f']];
      posters.forEach(([a, b, c1, c2], i) => {
        const px = W * 0.05 + i * 92, py = H * 0.1 + (i % 2) * 18, pw = 76, ph = 108;
        s += `<g transform="rotate(${(R() - 0.5) * 6},${px + pw / 2},${py})"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${c2}" stroke="${INK}" stroke-width="2.5"/><circle cx="${px + pw / 2}" cy="${py + 44}" r="22" fill="${c1}"/><path d="M${px + 10},${py + 70}l${pw / 2 - 10},-38l${pw / 2 - 10},38z" fill="${shade(c2, 2)}" opacity=".8"/><text x="${px + pw / 2}" y="${py + 86}" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="11" fill="#fff">${a}</text><text x="${px + pw / 2}" y="${py + 99}" text-anchor="middle" font-family="Impact,Arial Black,sans-serif" font-size="8" fill="${c1}">${b}</text><circle cx="${px + pw / 2}" cy="${py + 4}" r="2.5" fill="#ff4d6d"/></g>`;
      });
      // shelf with tapes
      const sx0 = W * 0.68, sy0 = H * 0.16, sw0 = W * 0.28;
      for (let k = 0; k < 3; k++) {
        const yy = sy0 + k * 62;
        let tx = sx0 + 6;
        while (tx < sx0 + sw0 - 14) { const tw = 9 + R() * 7, th = 34 + R() * 16; const col = ['#ff6a2b', '#2fb6a7', '#f2d24b', '#e64b6a', '#6b78ff', '#eaeaea', '#3a3a52'][Math.floor(R() * 7)]; s += `<rect x="${r1(tx)}" y="${r1(yy + 50 - th)}" width="${r1(tw)}" height="${r1(th)}" fill="${col}" stroke="${INK}" stroke-width="1.4"/><rect x="${r1(tx + 2)}" y="${r1(yy + 50 - th + 6)}" width="${r1(tw - 4)}" height="5" fill="#fff" opacity=".7"/>`; tx += tw + 1; if (R() < 0.08) tx += 18; }
        s += `<rect x="${sx0 - 6}" y="${yy + 50}" width="${sw0 + 12}" height="9" fill="#6b4630" stroke="${INK}" stroke-width="2.4"/><rect x="${sx0 - 6}" y="${yy + 56}" width="${sw0 + 12}" height="3" fill="#4a2f22"/>`;
      }
      // floor
      s += `<rect x="0" y="${r1(fy)}" width="${W}" height="${r1(H - fy)}" fill="#6b4630"/>`;
      for (let i = -16; i <= 16; i++) s += line([[W / 2 + i * 40, fy], [W / 2 + i * 140, H]], 1.4, '#55361f');
      for (let k = 1; k < 7; k++) { const yy = fy + (H - fy) * Math.pow(k / 7, 1.5); s += line([[0, yy], [W, yy]], 1, '#5c3c24', 'opacity=".6"'); }
      s += `<rect x="0" y="${r1(fy - 10)}" width="${W}" height="12" fill="#2a2440" stroke="${INK}" stroke-width="2"/>`;
      // rug
      s += `<ellipse cx="${W * 0.45}" cy="${r1(fy + (H - fy) * 0.55)}" rx="${W * 0.32}" ry="${r1((H - fy) * 0.32)}" fill="#3d6f8a" stroke="${INK}" stroke-width="3"/><ellipse cx="${W * 0.45}" cy="${r1(fy + (H - fy) * 0.55)}" rx="${W * 0.27}" ry="${r1((H - fy) * 0.24)}" fill="none" stroke="#f2d24b" stroke-width="3" stroke-dasharray="10 8"/>`;
      // CRT TV on a stand
      const tvx = W * 0.8, tvy = fy - 10;
      s += cel(`M${tvx - 70},${tvy}h140v-14h-140Z`, '#4a2f22', { sx: -4, sy: -2, sw: 2.6 });
      s += cel(`M${tvx - 60},${tvy - 14}h120v-96h-120Z`, '#3f3d52', { sx: -6, sy: -3, sw: 3 });
      s += `<rect x="${tvx - 50}" y="${tvy - 102}" width="86" height="76" rx="10" fill="#7ad7ff" stroke="${INK}" stroke-width="2.5"/><rect x="${tvx - 50}" y="${tvy - 102}" width="86" height="76" rx="10" fill="#fff" opacity=".15"/>`;
      for (let i = 0; i < 9; i++) s += line([[tvx - 46, tvy - 96 + i * 8], [tvx + 32, tvy - 96 + i * 8]], 1, '#bff0ff', 'opacity=".5"');
      s += `<circle cx="${tvx + 46}" cy="${tvy - 80}" r="4" fill="#ff6a2b" stroke="${INK}"/><circle cx="${tvx + 46}" cy="${tvy - 66}" r="4" fill="#ccc" stroke="${INK}"/>`;
      s += `<rect width="${W}" height="${H}" fill="url(#${id}t)"/>`;
      // floor lamp
      const lx = W * 0.1;
      s += `<rect x="${lx - 2}" y="${H * 0.36}" width="5" height="${r1(fy - H * 0.36 + 18)}" fill="${INK}"/><ellipse cx="${lx}" cy="${r1(fy + 18)}" rx="22" ry="6" fill="${INK}"/><path d="M${lx - 30},${H * 0.36}L${lx - 18},${H * 0.28}h36l12,${H * 0.08}Z" fill="#ffe6a8" stroke="${INK}" stroke-width="2.6"/>`;
      s += `<rect width="${W}" height="${H}" fill="url(#${id}l)"/>`;
      // popcorn bucket
      const px = W * 0.62, py = fy + 40;
      s += `<path d="M${px - 18},${py - 34}l5,40h26l5,-40Z" fill="#fff" stroke="${INK}" stroke-width="2.4"/>`;
      for (let i = 0; i < 3; i++) s += `<path d="M${px - 14 + i * 12},${py - 34}l2,40h5l-2,-40Z" fill="#e23a3a"/>`;
      for (let i = 0; i < 7; i++) s += `<circle cx="${r1(px - 16 + R() * 32)}" cy="${r1(py - 36 - R() * 9)}" r="${r1(4 + R() * 3)}" fill="#fff4cc" stroke="${INK}" stroke-width="1.4"/>`;
      return s;
    },

    /** One-point-perspective street with power lines: unmistakable anime-town feel */
    street(W, H, seed = 21) {
      const R = rng(seed); const id = 'bg' + (++UID);
      const vx = W * 0.5, vy = H * 0.52;
      let s = `<defs>${grad(id + 's', [[0, '#4aa8ff'], [0.6, '#9ad5ff'], [1, '#e6f6ff']])}</defs><rect width="${W}" height="${H}" fill="url(#${id}s)"/>`;
      for (let i = 0; i < 5; i++) s += cloud(R() * W, H * (0.08 + R() * 0.25), 160 + R() * 240, R, '#ffffff', '#bfd9f2');
      // road + sidewalks
      s += `<path d="M${vx - 6},${vy}L${vx + 6},${vy}L${W * 0.92},${H}L${W * 0.08},${H}Z" fill="#6d6f80"/>`;
      s += `<path d="M${vx - 6},${vy}L${W * 0.08},${H}L0,${H}L0,${H * 0.98}Z" fill="#b9b3c4"/><path d="M${vx + 6},${vy}L${W * 0.92},${H}L${W},${H}L${W},${H * 0.98}Z" fill="#b9b3c4"/>`;
      for (let k = 0; k < 9; k++) { const t0 = Math.pow(k / 9, 1.8), t1 = Math.pow((k + 0.45) / 9, 1.8); const y0 = lerp(vy, H, t0), y1 = lerp(vy, H, t1); s += `<path d="M${vx - 1 - t0 * 6},${y0}L${vx + 1 + t0 * 6},${y0}L${vx + 1 + t1 * 6},${y1}L${vx - 1 - t1 * 6},${y1}Z" fill="#f4f1ea"/>`; }
      // crosswalk near camera
      for (let i = 0; i < 9; i++) { const x0 = W * 0.16 + i * W * 0.08; s += `<path d="M${x0},${H * 0.88}h${W * 0.045}l${W * 0.01},${H * 0.08}h${-W * 0.05}Z" fill="#f4f1ea" opacity=".9"/>`; }
      // buildings both sides in perspective
      for (const side of [-1, 1]) {
        for (let k = 0; k < 6; k++) {
          const t0 = k / 6, t1 = (k + 1) / 6;
          const xNear = side < 0 ? lerp(vx - 40, -60, Math.pow(t1, 1.4)) : lerp(vx + 40, W + 60, Math.pow(t1, 1.4));
          const xFar = side < 0 ? lerp(vx - 40, -60, Math.pow(t0, 1.4)) : lerp(vx + 40, W + 60, Math.pow(t0, 1.4));
          const hN = lerp(60, H * 0.9, Math.pow(t1, 1.4)) * (0.7 + R() * 0.5), hF = hN * (Math.abs(xFar - vx) / Math.abs(xNear - vx));
          const gN = lerp(vy, H * 0.98, Math.pow(t1, 1.4)), gF = lerp(vy, H * 0.98, Math.pow(t0, 1.4));
          const col = ['#f0d7b5', '#c9d6e8', '#e8c1b9', '#d8e4c6', '#efe7d6'][Math.floor(R() * 5)];
          const d = `M${r1(xFar)},${r1(gF)}L${r1(xNear)},${r1(gN)}L${r1(xNear)},${r1(gN - hN)}L${r1(xFar)},${r1(gF - hF)}Z`;
          s += `<path d="${d}" fill="${col}" stroke="${INK}" stroke-width="2"/>`;
          const rows = 3 + Math.floor(R() * 3);
          for (let r = 1; r < rows; r++) { const f = r / rows; s += line([[xFar, gF - hF * f], [xNear, gN - hN * f]], 1, shade(col, 1.2)); }
          for (let c = 1; c < 4; c++) { const f = c / 4; const xx = lerp(xFar, xNear, f), g = lerp(gF, gN, f), hh = lerp(hF, hN, f); s += line([[xx, g - hh * 0.95], [xx, g - hh * 0.12]], 1, shade(col, 1.2)); }
          if (R() < 0.6) { const f = 0.3 + R() * 0.4; const xx = lerp(xFar, xNear, f); const g = lerp(gF, gN, f), hh = lerp(hF, hN, f); const sw = Math.max(6, Math.abs(xNear - xFar) * 0.1); s += `<rect x="${r1(xx - sw / 2)}" y="${r1(g - hh * 0.8)}" width="${r1(sw)}" height="${r1(hh * 0.45)}" fill="${['#ff6a2b', '#e23a6a', '#2fb6a7', '#3a6bff'][Math.floor(R() * 4)]}" stroke="${INK}" stroke-width="1.6"/>`; }
        }
      }
      // utility poles + wires (the anime signature)
      const poles = [];
      for (let k = 1; k <= 4; k++) { const t = Math.pow(k / 4.4, 1.5); const x = lerp(vx + 26, W * 0.97, t), g = lerp(vy, H * 1.02, t), h = lerp(30, H * 1.1, t); poles.push([x, g, h, lerp(1.5, 12, t)]); }
      for (const [x, g, h, w] of poles) {
        s += `<rect x="${r1(x - w / 2)}" y="${r1(g - h)}" width="${r1(w)}" height="${r1(h)}" fill="#7d7488" stroke="${INK}" stroke-width="${r1(Math.max(1, w / 5))}"/>`;
        s += `<rect x="${r1(x - w * 3)}" y="${r1(g - h * 0.92)}" width="${r1(w * 6)}" height="${r1(Math.max(1.5, w * 0.5))}" fill="#4a4258"/>`;
        s += `<rect x="${r1(x - w * 1.2)}" y="${r1(g - h * 0.8)}" width="${r1(w * 2.4)}" height="${r1(w * 2.2)}" fill="#8b8496" stroke="${INK}" stroke-width="${r1(Math.max(.8, w / 6))}"/>`;
      }
      for (let k = 0; k < poles.length - 1; k++) {
        const [x0, g0, h0, w0] = poles[k], [x1, g1, h1, w1] = poles[k + 1];
        for (const o of [-2.6, -1, 1, 2.6]) {
          const a = [x0 + o * w0, g0 - h0 * 0.92], b = [x1 + o * w1, g1 - h1 * 0.92];
          s += curve(`M${P(...a)}Q${P((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + Math.abs(b[0] - a[0]) * 0.08)} ${P(...b)}`, 1.4, '#2b2433');
        }
      }
      { const [x1, g1, h1, w1] = poles[poles.length - 1]; for (const o of [-2.6, -1, 1, 2.6]) s += curve(`M${P(x1 + o * w1, g1 - h1 * 0.92)}Q${P(W * 0.6, H * 0.02)} ${P(-20, H * 0.12 + o * 6)}`, 1.6, '#2b2433'); }
      // vending machine
      const vmx = W * 0.12, vmy = H * 0.9;
      s += cel(`M${vmx},${vmy}h70v-150h-70Z`, '#e23a3a', { sx: -6, sy: 0, sw: 3 });
      s += `<rect x="${vmx + 8}" y="${vmy - 140}" width="54" height="66" fill="#d9f3ff" stroke="${INK}" stroke-width="2"/>`;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) s += `<rect x="${vmx + 11 + c * 13}" y="${vmy - 136 + r * 21}" width="9" height="15" rx="2" fill="${['#ff6a2b', '#2fb6a7', '#f2d24b', '#6b78ff'][(r + c) % 4]}" stroke="${INK}" stroke-width="1"/>`;
      s += `<rect x="${vmx + 10}" y="${vmy - 40}" width="50" height="16" fill="#3a2440" stroke="${INK}" stroke-width="2"/>`;
      return s;
    },

    /** Comedy reaction backdrop: focus lines + halftone (use behind a shock/punchline beat) */
    reaction(W, H, seed = 3, opt = {}) {
      const R = rng(seed);
      const c1 = opt.color || '#ff6a2b', c2 = opt.color2 || '#ffd23d';
      let s = `<rect width="${W}" height="${H}" fill="${c2}"/>`;
      const cx = W / 2, cy = H * 0.45, n = 90;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + R() * 0.03, w = 0.012 + R() * 0.025, r0 = Math.min(W, H) * (0.28 + R() * 0.12), r2 = Math.max(W, H);
        s += `<path d="M${P(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0)}L${P(cx + Math.cos(a - w) * r2, cy + Math.sin(a - w) * r2)}L${P(cx + Math.cos(a + w) * r2, cy + Math.sin(a + w) * r2)}Z" fill="${c1}"/>`;
      }
      for (let y = 0; y < H; y += 16) for (let x = (y / 16) % 2 ? 8 : 0; x < W; x += 16) {
        const d = Math.hypot(x - cx, (y - cy) * 1.4) / Math.max(W, H);
        const r = clamp((d - 0.25) * 9, 0, 5.5);
        if (r > 0.4) s += `<circle cx="${x}" cy="${y}" r="${r1(r)}" fill="${INK}" opacity=".18"/>`;
      }
      return s;
    }
  };

  function drawBackground(name, W = 1280, H = 720, seed, opt) {
    const f = BACKGROUNDS[name]; if (!f) throw new Error('Unknown background ' + name);
    return f(W, H, seed, opt);
  }

  // ───────────────────────────── CAST + GENERATOR ─────────────────────────────
  const CAST = {
    dum: {
      name: 'Dum', role: 'Deadpan narrator. Has seen every bad movie twice. Explains the plot like it personally wronged him.',
      skin: '#f6d2b8', eyes: '#3d6fb5', scale: 1,
      hair: { style: 'spiky', color: '#2c2b45', seed: 44, streak: '#ff6a2b', ahoge: false, volume: 1.05 },
      top: { type: 'hoodie', color: '#ff6a2b', accent: '#2c2b45', cuff: '#2c2b45', hood: '#e85a1f', strings: '#f4f1ea', emblem: 'play', backPrint: 'reel', hem: 16 },
      bottom: { color: '#2e5d7a', baggy: true, cuff: '#244a62' },
      shoes: { color: '#f4f1ea', sole: '#2c2b45', lace: '#ff6a2b', type: 'sneaker' },
      wraps: false, gloves: null, belt: null,
      defaultExpr: 'deadpan'
    },
    down: {
      name: 'Down', role: 'Hyper co-host. Loves every movie, especially the terrible ones. Gasps on cue.',
      skin: '#e9b892', eyes: '#c23a5c', scale: 0.95,
      body: { shoulder: 27, hip: 15, torso: 98, upper: 55, fore: 51, thigh: 84, shin: 82 },
      hair: { style: 'long', color: '#f2c14e', seed: 9, ahoge: true, length: 0.9 },
      top: { type: 'jacket', color: '#2fb6a7', shirt: '#f4f1ea', tie: '#c23a5c', accent: '#ffd23d', cuff: '#1f8478', hem: -10, sleeves: 'long' },
      bottom: { color: '#3a2f4f', baggy: false, stripe: '#ffd23d' },
      shoes: { color: '#c23a5c', sole: '#f4f1ea', lace: '#ffffff', type: 'boot' },
      belt: { color: '#2a2440', buckle: '#ffd23d', pouch: '#5b4a8a' },
      gloves: { color: '#3a2f4f', cuff: '#ffd23d', fingerless: true },
      defaultExpr: 'excited'
    }
  };

  CAST.stormi = {
    name: 'Stormi', role: 'Channel mascot. A walking thunderstorm who explains superhero movies at lightning speed and zaps every plot hole.',
    skin: '#f1c8a8', eyes: '#2fc6ff', scale: 1, cheekMarks: 'bolt',
    hair: { style: 'cloud', color: '#d3dae8', seed: 31, streak: '#ffd23d', bolt: '#ffd23d', volume: 1.05 },
    top: { type: 'hoodie', color: '#2a3990', accent: '#1b2461', cuff: '#ffd23d', hood: '#22307c', strings: '#ffd23d', emblem: 'bolt', backPrint: 'bolt', hem: 16 },
    bottom: { color: '#1d2142', baggy: true, cuff: '#ffd23d' },
    shoes: { color: '#ffd23d', sole: '#1d2142', lace: '#2a3990', type: 'sneaker' },
    gloves: { color: '#1d2142', cuff: '#ffd23d', fingerless: true },
    scarf: '#e23a3a',
    defaultExpr: 'smug'
  };

  const PALETTES = {
    hair: ['#2c2b45', '#f2c14e', '#3f8f5f', '#b8e4f2', '#c23a5c', '#7a4fd0', '#f4f1ea', '#5a3a2a', '#ff8a5c', '#1d1d24'],
    skin: ['#f6d2b8', '#e9b892', '#c98e68', '#8d5a3c', '#ffe1cc', '#a8704a'],
    eyes: ['#3d6fb5', '#c23a5c', '#3f8f5f', '#7a4fd0', '#e0a020', '#5a3a2a', '#c0392b'],
    cloth: ['#ff6a2b', '#2fb6a7', '#2c2b45', '#c23a5c', '#2e5d7a', '#ffd23d', '#3a2f4f', '#3f8f5f', '#f4f1ea', '#e64b6a', '#5b4a8a', '#1f4f46']
  };

  /** Make a brand-new on-model character from a seed (number or string). Same seed → same character. */
  function generateCharacter(seed) {
    const S = typeof seed === 'number' ? seed : hashStr(seed || Date.now());
    const R = rng(S);
    const pick = a => a[Math.floor(R() * a.length)];
    const styles = ['spiky', 'messy', 'long', 'bob', 'spiky', 'messy', 'buzz'];
    const main = pick(PALETTES.cloth); let second = pick(PALETTES.cloth); if (second === main) second = PALETTES.cloth[(PALETTES.cloth.indexOf(main) + 3) % PALETTES.cloth.length];
    const accent = pick(['#ff6a2b', '#ffd23d', '#2fb6a7', '#c23a5c', '#f4f1ea']);
    const topType = pick(['hoodie', 'jacket', 'hoodie', 'tee', 'jacket']);
    const short = R() < 0.35;
    return {
      name: 'Extra #' + (S % 1000), role: 'Generated background character',
      seed: S,
      skin: pick(PALETTES.skin), eyes: pick(PALETTES.eyes), scale: r1((0.93 + R() * 0.1) * 100) / 100,
      body: { shoulder: r1(27 + R() * 7), hip: r1(15 + R() * 2), torso: r1(96 + R() * 10), thigh: r1(82 + R() * 8), shin: r1(80 + R() * 8), upper: r1(55 + R() * 5), fore: r1(51 + R() * 5) },
      hair: { style: pick(styles), color: pick(PALETTES.hair), seed: Math.floor(R() * 999), ahoge: R() < 0.3, streak: R() < 0.2 ? accent : null, volume: r1(0.9 + R() * 0.3), length: r1(0.8 + R() * 0.4) },
      top: { type: topType, color: main, accent, shirt: '#f4f1ea', tie: R() < 0.4 ? accent : null, cuff: shade(main, 0.6), hem: topType === 'jacket' ? -10 : 14, sleeves: short ? 'short' : 'long', emblem: R() < 0.5 ? pick(['play', 'reel', 'zz']) : null },
      bottom: { color: second, baggy: R() < 0.55, kneePad: R() < 0.25 ? '#f4f1ea' : null, stripe: R() < 0.3 ? accent : null },
      shoes: { color: pick(['#f4f1ea', '#2c2b45', '#c23a5c', '#ff6a2b', '#2fb6a7']), sole: pick(['#f4f1ea', '#2c2b45', '#d9472b']), lace: '#ffffff', type: R() < 0.35 ? 'boot' : 'sneaker' },
      wraps: short && R() < 0.6,
      gloves: R() < 0.25 ? { color: pick(PALETTES.cloth), cuff: accent, fingerless: R() < 0.6 } : null,
      belt: R() < 0.4 ? { color: '#2a2440', buckle: accent, pouch: R() < 0.5 ? shade(second, 0.4) : null } : null,
      scarf: R() < 0.15 ? accent : null
    };
  }

  /** Wrap SVG content in a full <svg> document. */
  function svg(W, H, inner, bg) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ''}${inner}</svg>`;
  }

  /** One frame of an animation: returns a full <svg> string. */
  function frame(spec, anim, t, opts = {}) {
    const W = opts.W || 1280, H = opts.H || 720;
    const tt = opts.onTwos === false ? t : onTwos(t);
    const a = ANIMS[anim](tt, opts.animArg);
    const bg = opts.background ? drawBackground(opts.background, W, H, opts.bgSeed) : '';
    return svg(W, H, bg + drawCharacter(spec, { view: opts.view || 'front', dir: opts.dir, x: opts.x ?? W / 2, y: opts.y ?? H * 0.95, scale: opts.scale ?? 1.25, pose: a.pose, expr: a.expr || opts.expr || spec.defaultExpr }), opts.bg);
  }

  const api = { version: '1.0.0', INK, VIEWS, POSES, HAND_POSES, EXPRESSIONS, HAIR_STYLES, ANIMS, CAST, PALETTES, BACKGROUNDS, drawCharacter, drawSkeleton, drawHand: (spec, pose, x, y, angle = 0, mirror = false, scale = 1) => `<g transform="translate(${x},${y}) scale(${scale})">${drawHand([0, 0], angle, pose, mirror, spec, false)}</g>`, drawHead: (spec, opts = {}) => { const J = solve(spec, normPose(opts.pose), opts.view || 'front'); const mr = (opts.dir || 1) < 0, np = normPose(opts.pose); return `<g transform="translate(${opts.x || 0},${opts.y || 0}) scale(${(opts.scale || 1) * (opts.dir || 1)},${opts.scale || 1})">${drawHead(spec, J, opts.view || 'front', opts.expr, mr, np, { layer: 'behind' })}${drawHead(spec, J, opts.view || 'front', opts.expr, mr, np)}</g>`; }, drawBackground, generateCharacter, frame, svg, solve, onTwos, ease, shade, light, mix, rng };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DumDown = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
