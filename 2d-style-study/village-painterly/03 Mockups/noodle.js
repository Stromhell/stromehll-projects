// Noodle anatomy, copied from Pushpam's "Tala" reference sheets (abzhakim) and his written breakdown.
// Exactly 3 heads tall: head = top third, neck + torso = middle third, legs + shoes = bottom third.
// Wide, bottom-heavy head; big round eyes that touch; ears low at cheek level; very thin neck;
// narrow trapezoid t-shirt; thin uniform noodle arms and legs with no joints, bending in C and S curves;
// chunky flat-soled high-top shoes for weight. Applied here to Raju, the village boy.
(function (G) {
  const S = G.S, D = S.D, TAU = S.TAU;
  const INK = '#3a3036';
  const RAJU = {
    skin: ['#c98f66', '#9a6448'], hair: ['#3a2c2c', '#1f1719'], shirt: ['#ece0c8', '#bba98a'], trim: '#c0603e',
    pants: ['#6f8fa6', '#4d6a80'], shoe: ['#d9d3c9', '#a39c92'], sole: '#f6f2ea', blush: '#e0786a', box: ['#a7a2a8', '#6f6a74'],
  };
  const LIGHT = [1, -.6];
  const cel = (c, p, pair, h, o = {}) => S.cel(c, p, Object.assign({
    base: pair[0], shade: pair[1], rim: S.mix(pair[0], '#fff6e6', .5), L: LIGHT, sw: h * .07, rw: Math.max(1.2, h * .012),
    ink: INK, lw: Math.max(1.6, h * .024),
  }, o));
  const quad = (a, b, e, n = 26) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n, m = 1 - t; o.push([m * m * a[0] + 2 * m * t * b[0] + t * t * e[0], m * m * a[1] + 2 * m * t * b[1] + t * t * e[1]]); } return o; };
  const lumps = (L, g = 0) => { const p = new Path2D(); for (const q of L) p.ellipse(q[0], q[1], q[2] + g, q[3] + g, q[4] || 0, 0, TAU); p.bb = S.bbOf(L.map(q => [q[0], q[1]])); const r = Math.max(...L.map(q => Math.max(q[2], q[3]))); p.bb = [p.bb[0] - r, p.bb[1] - r, p.bb[2] + r, p.bb[3] + r]; return p; };
  const lumpCel = (c, L, pair, h) => { const lw = Math.max(1.6, h * .024); c.save(); c.fillStyle = INK; c.fill(lumps(L, lw)); c.restore(); cel(c, lumps(L), pair, h, { ink: false }); };
  const P = (h, pts) => S.poly(pts.map(q => [q[0] * h, q[1] * h]));

  // ---------- head (centre origin, h = one head) ----------
  // yaw: 0 front, .45 three-quarter, 1 side. back: 0 none, 1 three-quarter back, 2 back.
  const head = (c, h, f, yaw, back) => {
    const k = RAJU, X = v => v * h;
    const shape = new Path2D();
    shape.moveTo(0, X(-.43));
    shape.bezierCurveTo(X(.3), X(-.43), X(.48), X(-.28), X(.48), X(-.02));
    shape.bezierCurveTo(X(.48), X(.2), X(.36), X(.42), 0, X(.42));
    shape.bezierCurveTo(X(-.36), X(.42), X(-.48), X(.2), X(-.48), X(-.02));
    shape.bezierCurveTo(X(-.48), X(-.28), X(-.3), X(-.43), 0, X(-.43));
    shape.closePath(); shape.bb = [X(-.48), X(-.43), X(.48), X(.42)];
    const fx = X(.27) * yaw;
    // ears sit low, level with the cheeks
    const ears = [];
    if (back === 2) ears.push(X(-.47), X(.47)); else if (back === 1) ears.push(X(.3)); else { ears.push(X(-.47 + .38 * yaw)); if (yaw < .25) ears.push(X(.47)); }
    const ear = ex => { const p = S.ell(ex, X(.09), X(.085), X(.1)); cel(c, p, k.skin, h, { swk: .4, over: c2 => { c2.strokeStyle = S.rgba(k.skin[1], 1); c2.lineWidth = X(.02); c2.beginPath(); c2.arc(ex, X(.09), X(.045), -1.2, 1.2, ex > 0 ? false : true); c2.stroke(); } }); };
    const earsBehind = back === 0 && yaw < .25;
    if (earsBehind) ears.forEach(ear);
    cel(c, shape, k.skin, h, { over: c2 => {
      if (back) return;
      c2.fillStyle = S.rgba(k.blush, .35);
      const cx = [fx - X(.2) * (1 - yaw * .4), fx + X(.2) * (1 - yaw * .7)];
      cx.forEach((x, i) => { if (i === 1 && yaw > .85) return; c2.beginPath(); c2.ellipse(x, X(.15), X(.08) * (i ? 1 - yaw * .5 : 1), X(.05), 0, 0, TAU); c2.fill(); });
      c2.fillStyle = S.rgba(k.skin[1], .8);
      cx.forEach((x, i) => { if (i === 1 && yaw > .85) return; for (let j = 0; j < 3; j++) { c2.beginPath(); c2.arc(x - X(.04) + j * X(.035), X(.13 + (j % 2) * .025), X(.01), 0, TAU); c2.fill(); } });
    } });
    if (!earsBehind) ears.forEach(ear);
    if (!back) {
      // side-view nose bump
      if (yaw > .85) cel(c, S.ell(X(.48), X(.05), X(.055), X(.045)), k.skin, h, { swk: .3 });
      // big round eyes that touch
      const er = X(.105), ey = X(-.03), look = f.look || [0, 0];
      const eyes = yaw > .85 ? [[X(.34), .6]] : [[fx - er * (1 - yaw * .3), 1], [fx + er * (1 - yaw * .5), 1 - yaw * .45]];
      for (const [x, sx] of eyes) {
        const rx = er * sx, open = S.clamp(1 - (f.blink || 0)) * (1 - (f.squint || 0) * .5);
        if (f.happy) { c.save(); c.strokeStyle = INK; c.lineWidth = X(.028); c.lineCap = 'round'; c.beginPath(); c.moveTo(x - rx * .8, ey + er * .2); c.quadraticCurveTo(x, ey - er * .7, x + rx * .8, ey + er * .2); c.stroke(); c.restore(); continue; }
        const eye = S.ell(x, ey, rx, er);
        c.save(); c.fillStyle = '#fbf8f2'; c.fill(eye); c.clip(eye);
        c.fillStyle = '#2a1d1a'; c.beginPath(); c.ellipse(x + look[0] * rx * .35 + yaw * rx * .2, ey + look[1] * er * .35, rx * .45, er * .45, 0, 0, TAU); c.fill();
        c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x + look[0] * rx * .35 + rx * .18, ey - er * .2 + look[1] * er * .3, er * .14, 0, TAU); c.fill();
        // lid: skin comes down from the top for blink, squint, sad
        const lid = 1 - open + (f.lid || 0);
        if (lid > .02) { c.fillStyle = k.skin[0]; c.fillRect(x - rx * 1.2, ey - er * 1.2, rx * 2.4, er * 2.2 * Math.min(1, lid)); c.strokeStyle = INK; c.lineWidth = X(.022); c.beginPath(); c.moveTo(x - rx, ey - er + er * 2.2 * Math.min(1, lid)); c.lineTo(x + rx, ey - er + er * 2.2 * Math.min(1, lid)); c.stroke(); }
        c.restore();
        c.save(); c.strokeStyle = INK; c.lineWidth = X(.024); c.stroke(eye); c.restore();
      }
      // brows: short arcs
      c.save(); c.strokeStyle = S.mix(k.hair[0], '#000', .2); c.lineWidth = X(.032); c.lineCap = 'round';
      for (const [x, sx] of eyes) {
        const sd = eyes.length === 1 ? -1 : (x < fx ? -1 : 1), w = er * .75 * sx;
        const by = ey - er * 1.35 - (f.raise || 0) * X(.05);
        const yi = by + (f.angry || 0) * X(.05) - (f.worry || 0) * X(.05), yo = by - (f.angry || 0) * X(.02) + (f.worry || 0) * X(.02);
        c.beginPath(); c.moveTo(x + sd * w, yo); c.quadraticCurveTo(x, by - X(.035), x - sd * w, yi); c.stroke();
      }
      c.restore();
      // tiny nose just below the eye line
      if (yaw <= .85) { c.save(); c.strokeStyle = S.rgba(INK, .8); c.lineWidth = X(.02); c.lineCap = 'round'; const nx = fx + X(.03) + yaw * X(.12); c.beginPath(); c.arc(nx, X(.08), X(.03), .3, 2.6); c.stroke(); c.restore(); }
      // wide mouth
      const mx = fx + yaw * X(.1), my = X(.22), mw = X(.2) * (1 - yaw * .35), sm = f.smile ?? .4, op = f.open || 0;
      c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
      if (op > .05) {
        const m = new Path2D(); m.moveTo(mx - mw / 2, my - sm * X(.03)); m.quadraticCurveTo(mx, my - X(.01), mx + mw / 2, my - sm * X(.03)); m.quadraticCurveTo(mx, my + op * X(.2) + Math.max(0, sm) * X(.04), mx - mw / 2, my - sm * X(.03)); m.closePath();
        c.fillStyle = '#5a1f1c'; c.fill(m); c.save(); c.clip(m); c.fillStyle = '#d65c55'; c.beginPath(); c.ellipse(mx, my + op * X(.19), mw * .35, op * X(.08), 0, 0, TAU); c.fill(); c.fillStyle = '#fbf6ee'; c.fillRect(mx - mw, my - X(.08), mw * 2, X(.08) + op * X(.025)); c.restore();
        c.strokeStyle = INK; c.lineWidth = X(.024); c.stroke(m);
      } else { c.strokeStyle = INK; c.lineWidth = X(.026); c.beginPath(); c.moveTo(mx - mw / 2, my - sm * X(.04)); c.quadraticCurveTo(mx, my + sm * X(.06), mx + mw / 2, my - sm * X(.04)); c.stroke(); }
      c.restore();
    }
    // hair: big swept mop with an upward flip at the front and two tufts on top
    if (back) {
      cel(c, P(h, [[-.52, .1], [-.55, -.2], [-.42, -.48], [-.1, -.6], [.25, -.56], [.5, -.4], [.56, -.12], [.52, .12], [.3, .22], [0, .25], [-.3, .22]]), k.hair, h, { over: c2 => { c2.strokeStyle = S.rgba(k.hair[1], .9); c2.lineWidth = X(.016); for (let i = 0; i < 6; i++) { const x0 = X(-.3 + i * .12); c2.beginPath(); c2.moveTo(x0 * .6, X(-.5)); c2.quadraticCurveTo(x0, X(-.15), x0 * 1.05, X(.18)); c2.stroke(); } } });
    } else {
      const sh = yaw * .1, hl = .3 * yaw;
      const pts = [[-.52 - sh, .02], [-.55 - sh, -.25], [-.4 - sh, -.5], [-.1 - sh, -.6], [.22 - sh * .5, -.57], [.47, -.42], [.6, -.24], [.68, -.12],
        [.46 + hl * .2, -.18], [.3 + hl, -.27], [.08 + hl, -.22], [-.1 + hl * .8, -.27], [-.3 + hl * .4, -.2], [-.42 + hl * .2, -.06]];
      cel(c, P(h, pts), k.hair, h, { over: c2 => { c2.strokeStyle = S.rgba(k.hair[1], .9); c2.lineWidth = X(.016); c2.lineCap = 'round'; for (let i = 0; i < 4; i++) { c2.beginPath(); c2.moveTo(X(-.35 + i * .2 - sh), X(-.5)); c2.quadraticCurveTo(X(-.2 + i * .22), X(-.38), X(-.05 + i * .2 + hl * .5), X(-.25)); c2.stroke(); } } });
    }
    // tufts
    c.save(); c.strokeStyle = INK; c.fillStyle = k.hair[0]; c.lineWidth = X(.022); c.lineCap = 'round';
    for (const [x0, a] of [[-.06, -1.9], [.06, -1.2]]) { const t = new Path2D(); t.moveTo(X(x0 - .03), X(-.57)); t.quadraticCurveTo(X(x0) + Math.cos(a) * X(.1), X(-.62) + Math.sin(a) * X(.12), X(x0) + Math.cos(a) * X(.16), X(-.6) + Math.sin(a) * X(.14)); t.quadraticCurveTo(X(x0 + .02), X(-.62), X(x0 + .04), X(-.57)); c.fill(t); c.stroke(t); }
    c.restore();
  };

  // ---------- shoe: chunky flat-soled high-top ----------
  const SIDE = [[-.1, -.17], [.06, -.17], [.08, -.06], [.3, -.05], [.41, .0], [.41, .07], [-.13, .07], [-.13, -.04]];
  const FRONT = [[-.11, -.17], [.11, -.17], [.12, -.06], [.15, -.03], [.16, .02], [.15, .07], [-.15, .07], [-.16, -.02]];
  const shoe = (c, h, x, y, d, f, rot) => {
    const pts = SIDE.map((p, i) => [S.lerp(FRONT[i][0], p[0], f) * d * h, S.lerp(FRONT[i][1], p[1], f) * h]);
    c.save(); c.translate(x, y); c.rotate(rot * D);
    cel(c, S.poly(pts), RAJU.shoe, h, { swk: .5, over: c2 => {
      c2.fillStyle = RAJU.sole; c2.fillRect(-h, h * .035, 2 * h, h);
      c2.strokeStyle = INK; c2.lineWidth = h * .018; c2.beginPath(); c2.moveTo(-h, h * .035); c2.lineTo(h, h * .035); c2.stroke();
      c2.strokeStyle = S.rgba(RAJU.shoe[1], .9); c2.lineWidth = h * .014; for (let i = 0; i < 3; i++) { c2.beginPath(); c2.moveTo(-.05 * h * d, (-.13 + i * .04) * h); c2.lineTo(.05 * h * d, (-.12 + i * .04) * h); c2.stroke(); }
    } });
    c.restore();
  };
  // ---------- hand: small mitten with a thumb ----------
  const hand = (c, h, p, a, open) => {
    const dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx, r = h * .065;
    const q = (s, t) => [p[0] + dx * s * h + nx * t * h, p[1] + dy * s * h + ny * t * h];
    const palm = q(.04, 0), fing = q(.1, 0), th = q(.05, .055 + (open || 0) * .02);
    lumpCel(c, [[palm[0], palm[1], r, r * .9, a], [fing[0], fing[1], r * 1.05, r * .75, a], [th[0], th[1], r * .55, r * .35, a + .9]], RAJU.skin, h);
  };

  // ---------- full body ----------
  // pose (all in head units h, y down): legs are in the hip frame, arms in the tilted torso frame.
  const STAND = { lift: 0, tilt: 0, htilt: 0, legL: [[-.1, .55], [-.11, 1.11]], legR: [[.1, .55], [.11, 1.11]], armL: [[-.33, -.3], [-.34, .06]], armR: [[.33, -.3], [.34, .06]], footL: 0, footR: 0 };
  S.noodle = (c, x, ground, h, pose, f, view) => {
    const p = Object.assign({}, STAND, pose), v = Object.assign({ yaw: .3, back: 0, ws: .9, d: 1, sf: .5 }, view);
    const ws = v.ws, k = RAJU;
    const hip = [x, ground - (1.18 + p.lift) * h];
    const H = h;
    // legs: thin parallel noodles, no knees, into big shoes
    const leg = (L, sx, foot) => {
      const r = [hip[0] + sx * .09 * ws * H, hip[1]], cc = [hip[0] + L[0][0] * ws * H, hip[1] + L[0][1] * H], e = [hip[0] + L[1][0] * ws * H, hip[1] + L[1][1] * H];
      const pts = quad(r, cc, e);
      cel(c, S.tube(pts, H * .095), k.pants, H, { swk: .45 });
      shoe(c, H, e[0], e[1], v.d, v.sf, foot);
    };
    leg(p.legL, -1, p.footL); leg(p.legR, 1, p.footR);
    c.save(); c.translate(hip[0], hip[1]); c.rotate(p.tilt * D);
    const sh = s => [s * .19 * ws * H, -.64 * H];
    const arm = (A, s) => {
      const r = sh(s), cc = [A[0][0] * ws * H, A[0][1] * H], e = [A[1][0] * ws * H, A[1][1] * H];
      const pts = quad(r, cc, e), last = pts[pts.length - 2], a = Math.atan2(e[1] - last[1], e[0] - last[0]);
      hand(c, H, e, a, 0);
      cel(c, S.tube(pts, H * .075), k.skin, H, { swk: .4 });
      const sl = pts.slice(0, 8); cel(c, S.tube(sl, H * .13), k.shirt, H, { swk: .4 });
    };
    arm(p.armL, -1);
    // neck: very thin
    cel(c, S.tube([[0, -.66 * H], [0, -.82 * H]], H * .09), [S.mix(k.skin[0], k.skin[1], .3), k.skin[1]], H, { swk: .3 });
    // torso: narrow loose t-shirt, shoulders narrower than the head, zig-zag trim at the hem
    const tw = ws;
    const shirt = P(H, [[-.12 * tw, -.72], [.12 * tw, -.72], [.2 * tw, -.66], [.24 * tw, -.4], [.27 * tw, .02], [.27 * tw, .1], [-.27 * tw, .1], [-.27 * tw, .02], [-.24 * tw, -.4], [-.2 * tw, -.66]]);
    cel(c, shirt, k.shirt, H, { over: c2 => {
      c2.strokeStyle = k.trim; c2.lineWidth = H * .02; c2.lineJoin = 'round'; c2.beginPath();
      for (let i = 0; i <= 8; i++) { const xx = (-.26 + i * .065) * tw * H, yy = (i % 2 ? -.02 : .03) * H; i ? c2.lineTo(xx, yy) : c2.moveTo(xx, yy); } c2.stroke();
      if (!v.back) {
        c2.strokeStyle = S.rgba(INK, .7); c2.lineWidth = H * .016; c2.beginPath(); c2.moveTo(-.09 * tw * H, -.71 * H); c2.quadraticCurveTo(0, -.6 * H, .09 * tw * H, -.71 * H); c2.stroke();
        // black thread with a small pendant
        c2.strokeStyle = '#2b2226'; c2.lineWidth = H * .008; c2.beginPath(); c2.moveTo(-.07 * tw * H, -.7 * H); c2.quadraticCurveTo(v.yaw * .05 * H, -.5 * H, .07 * tw * H, -.7 * H); c2.stroke();
        c2.fillStyle = '#c99a3a'; c2.strokeStyle = INK; c2.lineWidth = 1; c2.beginPath(); c2.arc(v.yaw * .05 * H, -.5 * H, H * .028, 0, TAU); c2.fill(); c2.stroke();
      }
    } });
    arm(p.armR, 1);
    // head
    c.save(); c.translate(0, -1.22 * H); c.rotate(p.htilt * D);
    head(c, H, f, v.yaw, v.back);
    c.restore();
    c.restore();
  };

  // ---------- scenes ----------
  const W = 1280, HH = 720;
  const paper = S.off(W, HH, g => { g.fillStyle = '#ececee'; g.fillRect(0, 0, W, HH); S.dabs(g, { x: 0, y: 0, w: W, h: HH, n: 260, cols: ['#e4e3e8', '#f3f2f5', '#dedce3'], r0: 30, r1: 90, sq: .5, a0: .15, a1: .35, seed: 33 }); });
  const dust = (c, x, y, w) => { c.save(); const g = c.createRadialGradient(x, y, 0, x, y, w); g.addColorStop(0, 'rgba(120,80,50,.35)'); g.addColorStop(1, 'rgba(120,80,50,0)'); c.fillStyle = g; c.scale(1, .2); c.beginPath(); c.arc(x, y / .2, w, 0, TAU); c.fill(); c.restore(); };
  const title = (c, a, b) => { S.label(c, a, 48, 64, 34, '#2c3550', 'left', 'Yatra One, serif'); S.label(c, b, 50, 98, 18, '#9a4a8a', 'left'); };

  S.SCENES['noodle-lineup'] = {
    dur: 12,
    draw(c, t) {
      c.drawImage(paper, 0, 0); title(c, 'Raju: character line-up', 'Noodle anatomy copied from the Tala sheets: exactly 3 heads tall');
      const G = 640, h = 150;
      // proportion grid: three equal head units
      c.save(); c.strokeStyle = '#2c3550'; c.lineWidth = 3; c.beginPath(); c.moveTo(66, G - 3 * h * .985); c.lineTo(52, G - 3 * h * .985); c.lineTo(52, G); c.lineTo(66, G); for (let i = 1; i < 3; i++) { c.moveTo(52, G - i * h * .985); c.lineTo(66, G - i * h * .985); } c.stroke();
      c.strokeStyle = 'rgba(200,90,90,.35)'; c.lineWidth = 1; for (let i = 0; i <= 3; i++) { c.beginPath(); c.moveTo(70, G - i * h * .985); c.lineTo(1230, G - i * h * .985); c.stroke(); } c.restore();
      const views = [['Front', { yaw: 0, ws: 1, sf: 0, d: 1 }], ['3/4 Front', { yaw: .45, ws: .85, sf: .55, d: 1 }], ['Side', { yaw: 1, ws: .55, sf: 1, d: 1 }], ['3/4 Back', { yaw: 1, back: 1, ws: .85, sf: .5, d: -1 }], ['Back', { yaw: 0, back: 2, ws: 1, sf: 0, d: 1 }]];
      views.forEach(([n, v], i) => {
        const x = 200 + i * 225, b = Math.sin(t * 1.6 + i) * .01;
        dust(c, x, G + 4, 90);
        const sideArm = v.yaw > .9 ? { armL: [[-.05, -.3], [-.02, .06]], armR: [[.08, -.3], [.06, .06]], legL: [[-.03, .55], [-.04, 1.11]], legR: [[.05, .55], [.06, 1.11]] } : {};
        S.noodle(c, x, G, h, Object.assign({ lift: b, htilt: Math.sin(t * .7 + i) * 2 }, sideArm), { blink: S.blinkAt(t, i), smile: .45 }, v);
        S.label(c, n, x, G + 40, 18, '#2c3550');
      });
    }
  };

  // six action poses; arms and legs bend in C and S curves, never at a corner
  const POSES = [
    ['Defeated', { lift: -.56, tilt: 16, htilt: 12, legL: [[.42, -.05], [.32, .55]], legR: [[.5, -.02], [.42, .55]], armL: [[-.28, -.25], [-.22, .1]], armR: [[.55, -.05], [.32, -.92]], footL: 0, footR: 0 }, { smile: -.6, worry: 1, lid: .35, look: [0, .6] }, { box: true }],
    ['Come on!', { legL: [[-.2, .55], [-.27, 1.1]], legR: [[.2, .55], [.27, 1.1]], armL: [[-.42, -.35], [-.66, -.08]], armR: [[.42, -.35], [.66, -.08]], footL: -6, footR: 6 }, { open: 1, raise: 1, smile: -.2 }, { burst: true, view: { yaw: .15, ws: .95, sf: .3 } }],
    ['Leaping', { lift: .55, tilt: 12, htilt: -8, legL: [[-.15, .7], [-.62, .4]], legR: [[.4, .2], [.35, .78]], armL: [[-.35, -.95], [-.55, -1.38]], armR: [[.35, -.95], [.6, -1.32]], footL: -70, footR: 18 }, { smile: 1, open: .7, happy: 1 }, { lines: true }],
    ['Swaying', { tilt: -10, htilt: -10, legL: [[-.05, .55], [.02, 1.11]], legR: [[.38, .55], [.08, .95]], armL: [[-.48, -.62], [-.58, -1.05]], armR: [[.45, -.55], [.52, -.98]], footL: 0, footR: -40 }, { smile: 1, open: .5, happy: 1 }, { wave: true }],
    ['Ready for Action', { lift: -.2, tilt: 20, htilt: -12, legL: [[-.38, .4], [-.62, .91]], legR: [[.4, .25], [.52, .91]], armL: [[-.45, -.3], [-.72, -.05]], armR: [[.48, -.3], [.74, .0]], footL: -12, footR: 8 }, { angry: 1, smile: -.3, squint: .4, look: [.5, 0] }, {}],
    ['Dancing', { tilt: -8, htilt: 8, legL: [[-.05, .55], [-.05, 1.11]], legR: [[.42, .3], [.86, .22]], armL: [[-.4, -.78], [-.72, -.98]], armR: [[.42, -.78], [.72, -.98]], footL: 0, footR: -85 }, { smile: .8, look: [.4, -.2] }, { notes: true }],
  ];
  S.SCENES['noodle-poses'] = {
    dur: 12,
    draw(c, t) {
      c.drawImage(paper, 0, 0); title(c, 'Raju: character poses', 'Same anatomy in action: limbs bend in C and S curves, no joints');
      const h = 76;
      POSES.forEach(([n, pose, face, fx], i) => {
        const cx = 230 + (i % 3) * 410, G = 360 + Math.floor(i / 3) * 295;
        const s = Math.sin(t * 2 + i), s2 = Math.sin(t * 4 + i);
        const pz = JSON.parse(JSON.stringify(pose));
        // small life in each pose
        if (fx.wave) { pz.armL[1][0] += s * .1; pz.armR[1][0] -= s * .1; pz.tilt += s * 4; }
        if (i === 2) pz.lift += Math.abs(Math.sin(t * 2)) * .12;
        if (i === 5) { pz.legR[1][1] += s * .08; pz.armL[1][1] += s * .08; pz.armR[1][1] -= s * .08; }
        if (i === 1) { pz.armL[1][1] += s2 * .03; pz.armR[1][1] += s2 * .03; }
        if (i === 0) pz.htilt += s * 2;
        dust(c, cx, G + 4, 80);
        if (fx.box) { const bx = cx + h * .02, by = G - h * .6; cel(c, S.poly([[bx - h * .42, by], [bx + h * .42, by], [bx + h * .45, G], [bx - h * .45, G]]), RAJU.box, h, { over: c2 => { c2.fillStyle = 'rgba(255,255,255,.35)'; c2.beginPath(); c2.arc(bx - h * .15, by + h * .32, h * .08, 0, TAU); c2.fill(); } }); }
        if (fx.burst) { c.save(); c.strokeStyle = 'rgba(60,50,60,.45)'; c.lineWidth = 2; c.lineCap = 'round'; for (let j = 0; j < 12; j++) { const a = j / 12 * TAU, r0 = h * (1.05 + .05 * s2), r1 = r0 + h * .3; c.beginPath(); c.moveTo(cx + Math.cos(a) * r0, G - h * 1.5 + Math.sin(a) * r0); c.lineTo(cx + Math.cos(a) * r1, G - h * 1.5 + Math.sin(a) * r1); c.stroke(); } c.restore(); }
        if (fx.lines) { c.save(); c.strokeStyle = 'rgba(160,60,80,.6)'; c.lineWidth = 2; for (let j = 0; j < 3; j++) { c.beginPath(); c.moveTo(cx - h * .1 + j * 8, G - h * .9); c.quadraticCurveTo(cx - h * .2 + j * 8, G - h * .5, cx - h * .1 + j * 8, G - h * .25); c.stroke(); } c.restore(); }
        if (fx.notes) { c.save(); c.fillStyle = '#b05a6a'; c.font = `${h * .32}px serif`; c.fillText('♪', cx + h * .5, G - h * 3 + Math.sin(t * 2) * 6); c.fillText('♫', cx + h * .8, G - h * 2.6 + Math.sin(t * 2 + 1) * 6); c.restore(); }
        S.noodle(c, cx, G, h, pz, Object.assign({ blink: S.blinkAt(t, i) }, face), Object.assign({ yaw: .35, ws: .9, sf: .5, d: 1 }, fx.view || {}));
        S.label(c, n, cx, G + 30, 17, '#2c3550');
      });
    }
  };
})(window);
