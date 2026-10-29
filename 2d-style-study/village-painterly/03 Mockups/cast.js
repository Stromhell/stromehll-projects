// Village painterly style: character rig.
// Natural proportions (kid 5 heads, adults 6.2 to 6.8 heads), warm brown skin, three-tone cel shading
// (shadow crescent + lit tone + thin rim), thin warm-brown line, expressive eyes and thick brows.
// Joints bend one way only and always as a soft curve: knees forward, elbows back.
(function (G) {
  const S = G.S, D = S.D;
  const INK = '#3a1d14';

  const SKIN = {
    deep: { base: '#9a5e3e', shade: '#5e3424', rim: '#e7a575' },
    mid: { base: '#b77a50', shade: '#7c4631', rim: '#f2b783' },
    light: { base: '#c98f62', shade: '#8a553b', rim: '#f8c896' },
  };
  const HAIR = { black: { base: '#2a1f24', shade: '#120c10', rim: '#7a7486' }, white: { base: '#e9e4dc', shade: '#a39c94', rim: '#ffffff' } };

  const CAST = S.CAST = {
    boy: { name: 'Raju', role: 'Village boy, 10', heads: 5, build: 'kid', skin: SKIN.mid, hair: 'curly', hairCol: HAIR.black, shirt: ['#eee6d3', '#a9a596'], pants: ['#5b8fae', '#365f7c'], rolled: true, bare: true, eye: 1.25 },
    youth: { name: 'Arjun', role: 'Young man, 20', heads: 6.6, build: 'man', skin: SKIN.light, hair: 'neat', hairCol: HAIR.black, shirt: ['#eef2f2', '#a9b7bf'], pants: ['#3f6b8c', '#24435c'], shoes: ['#6b4129', '#3b2116'], bag: ['#7a4a2a', '#4a2a17'], eye: 1 },
    father: { name: 'Gopal', role: 'Father, 45', heads: 6.8, build: 'broad', skin: SKIN.deep, hair: 'swept', hairCol: HAIR.black, mustache: true, shirt: ['#e3ebee', '#9aa9b2'], pants: ['#ece4d0', '#b0a58c'], mundu: true, eye: .95 },
    mother: { name: 'Lakshmi', role: 'Mother, 40', heads: 6.4, build: 'woman', skin: SKIN.mid, hair: 'bun', hairCol: HAIR.black, shirt: ['#b9773d', '#7a4622'], pants: ['#b9773d', '#7a4622'], dupatta: ['#8f2f22', '#561a14'], long: true, earring: true, bangles: true, eye: 1.05 },
    elder: { name: 'Dada', role: 'Grandfather, 75', heads: 6.2, build: 'elder', skin: SKIN.deep, hair: 'elder', hairCol: HAIR.white, beard: true, glasses: true, shirt: ['#ddd0ad', '#a08f6a'], pants: ['#efe9da', '#b3aa96'], mundu: true, stoop: 8, eye: .9 },
  };

  const BUILD = {
    kid: { legs: 1.95, torso: 1.4, neck: .12, up: .74, fore: .66, sh: .46, hip: .3, legW: [.42, .3], armW: [.28, .22], foot: .4 },
    man: { legs: 2.8, torso: 2.0, neck: .16, up: 1.08, fore: .98, sh: .72, hip: .42, legW: [.62, .38], armW: [.34, .25], foot: .58 },
    broad: { legs: 2.75, torso: 2.1, neck: .14, up: 1.08, fore: 1.0, sh: .82, hip: .5, legW: [.68, .42], armW: [.38, .28], foot: .6 },
    woman: { legs: 2.65, torso: 1.9, neck: .2, up: 1.0, fore: .92, sh: .6, hip: .48, legW: [.58, .34], armW: [.33, .24], foot: .5 },
    elder: { legs: 2.55, torso: 1.95, neck: .12, up: 1.0, fore: .92, sh: .64, hip: .44, legW: [.54, .34], armW: [.32, .24], foot: .55 },
  };
  S.BUILD = BUILD;

  // Light: L is the direction the light comes FROM (screen space). amb tints the shadows (sky/room colour).
  S.LIGHT = {
    studio: { L: [1, -.6], amb: '#5a4a6a', ambA: .18, rim: '#fff0d6', rimA: .5, tint: '#ffffff', tintA: 0, sw: .16 },
    golden: { L: [-1, -.35], amb: '#7a4a30', ambA: .12, rim: '#ffe6a8', rimA: .9, tint: '#ffcf8a', tintA: .12, sw: .26, rw: .055 },
    moon: { L: [1, -.25], amb: '#2f4f6e', ambA: .45, rim: '#cfe6ff', rimA: .55, tint: '#9fc2dc', tintA: .32, sw: .32 },
    fire: { L: [-1, .15], amb: '#20474c', ambA: .42, rim: '#ffc36b', rimA: .9, tint: '#ffab55', tintA: .2, sw: .38, rw: .05 },
    door: { L: [1, -.1], amb: '#2a3f3d', ambA: .4, rim: '#ffcf8f', rimA: .8, tint: '#ffb066', tintA: .16, sw: .34, rw: .04 },
  };

  // palette for a [base, shade] pair (or skin-like object) under a light
  const tone = (pair, Lt, dark = 0) => {
    const b = Array.isArray(pair) ? pair[0] : pair.base, s = Array.isArray(pair) ? pair[1] : pair.shade;
    let base = S.mix(b, Lt.tint, Lt.tintA), shade = S.mix(s, Lt.amb, Lt.ambA);
    if (dark) { base = S.mix(base, shade, dark); shade = S.mix(shade, '#000000', dark * .25); }
    const rim = S.mix(base, Lt.rim, Lt.rimA);
    return { base, shade, rim };
  };
  S.tone = tone;
  const inkOf = t => S.mix(t.shade, '#160a06', .62);
  S.inkOf = inkOf;
  const celT = (c, p, t, Lt, u, o = {}) => S.cel(c, p, Object.assign({ base: t.base, shade: t.shade, rim: t.rim, L: Lt.L, sw: (o.swu ?? Lt.sw) * u * (o.swk ?? 1), rw: Math.max(1.4, u * (Lt.rw ?? .03)), ink: inkOf(t), lw: Math.max(1.1, u * .017) }, o));

  const dir = a => [Math.sin(a), Math.cos(a)];
  const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];

  // union of circles/ellipses with a clean outer line (outline by dilation)
  const lumps = (L, grow = 0) => { const p = new Path2D(); for (const q of L) p.ellipse(q[0], q[1], q[2] + grow, (q[3] ?? q[2]) + grow, q[4] || 0, 0, S.TAU); return p; };
  const lumpCel = (c, L, t, Lt, u, o = {}) => {
    const lw = Math.max(1.1, u * .017);
    c.save(); c.fillStyle = inkOf(t); c.fill(lumps(L, lw)); c.restore();
    celT(c, lumps(L), t, Lt, u, Object.assign({ ink: false }, o));
  };

  // ---------------- head ----------------
  const headPath = (u, ch) => {
    const k = ch.build === 'kid', jw = ch.build === 'broad' ? 1.06 : ch.build === 'woman' ? .94 : 1;
    const p = new Path2D(), X = v => v * u, Y = v => v * u;
    if (k) {
      p.moveTo(X(-.04), Y(-.54));
      p.bezierCurveTo(X(.26), Y(-.55), X(.42), Y(-.34), X(.41), Y(-.08));
      p.bezierCurveTo(X(.41), Y(.06), X(.42), Y(.16), X(.38), Y(.28));
      p.bezierCurveTo(X(.32), Y(.42), X(.22), Y(.5), X(.1), Y(.5));
      p.bezierCurveTo(X(-.04), Y(.5), X(-.18), Y(.42), X(-.28), Y(.3));
      p.bezierCurveTo(X(-.42), Y(.16), X(-.47), Y(-.02), X(-.45), Y(-.2));
      p.bezierCurveTo(X(-.42), Y(-.42), X(-.26), Y(-.55), X(-.04), Y(-.54));
    } else {
      p.moveTo(X(-.05), Y(-.53));
      p.bezierCurveTo(X(.22), Y(-.55), X(.36), Y(-.37), X(.37), Y(-.14));
      p.bezierCurveTo(X(.38), Y(-.04), X(.4), Y(.04), X(.39 * jw), Y(.14));
      p.bezierCurveTo(X(.37 * jw), Y(.32), X(.3 * jw), Y(.47), X(.13), Y(.54));
      p.bezierCurveTo(X(.02), Y(.58), X(-.12), Y(.5), X(-.22 * jw), Y(.38));
      p.bezierCurveTo(X(-.34 * jw), Y(.24), X(-.43), Y(.02), X(-.42), Y(-.17));
      p.bezierCurveTo(X(-.4), Y(-.41), X(-.26), Y(-.53), X(-.05), Y(-.53));
    }
    p.closePath(); return p;
  };

  const CAPS = {
    neat: [[.31, -.3], [.38, -.42], [.26, -.58], [.0, -.62], [-.3, -.56], [-.46, -.32], [-.46, -.04], [-.37, .1], [-.25, .06], [-.2, .12], [-.14, .09], [-.15, -.12], [.04, -.29], [.2, -.29]],
    swept: [[.33, -.28], [.4, -.43], [.26, -.61], [-.05, -.65], [-.36, -.58], [-.5, -.32], [-.49, -.01], [-.39, .14], [-.25, .08], [-.2, .13], [-.14, .1], [-.15, -.12], [.06, -.3], [.22, -.28]],
    bun: [[.33, -.28], [.36, -.42], [.18, -.58], [-.08, -.6], [-.34, -.52], [-.47, -.3], [-.46, -.02], [-.36, .12], [-.24, .06], [-.15, .1], [-.13, -.1], [.05, -.29], [.2, -.29]],
    elder: [[-.36, -.2], [-.44, -.1], [-.45, .05], [-.38, .14], [-.3, .08], [-.24, .1], [-.22, .0], [-.3, -.1]],
  };
  const capPath = (ch, u) => { const pts = CAPS[ch.hair]; if (!pts) return null; return S.poly(pts.map(q => [q[0] * u, q[1] * u])); };
  const hairLumps = (ch, u, back) => {
    const r = S.rng(ch.name.length * 31 + (back ? 7 : 0)), L = [];
    const arc = (cx, cy, R, a0, a1, n, r0, r1, sq = 1) => { for (let i = 0; i < n; i++) { const a = S.lerp(a0, a1, i / (n - 1)) * D, rr = S.lerp(r0, r1, r()); L.push([(cx + Math.cos(a) * R) * u, (cy + Math.sin(a) * R) * u, rr * u, rr * u * sq, a]); } };
    switch (ch.hair) {
      case 'curly':
        arc(-.05, -.08, .41, 155, 318, 14, .09, .125);
        arc(-.06, -.16, .3, 190, 300, 5, .12, .15);
        L.push([.16 * u, -.44 * u, .12 * u, .08 * u, .4], [.29 * u, -.34 * u, .08 * u, .06 * u, .9], [-.23 * u, .0 * u, .07 * u, .12 * u, 0]);
        break;
      case 'bun':
        if (!ch.dupatta) L.push([-.5 * u, -.12 * u, .17 * u, .16 * u, 0]);
        break;
    }
    return L;
  };

  // brow: thick tapered stroke. inner end is toward the face centre (+x).
  const brow = (c, x, y, w, u, raise, worry, angry, col, flip) => {
    const t = u * .055;
    const xi = x + w / 2 * flip, xo = x - w / 2 * flip;
    const yi = y - raise * u * .05 - worry * u * .06 + angry * u * .05, yo = y - raise * u * .05 + worry * u * .01 - angry * u * .02;
    const cy = (yi + yo) / 2 - u * .035 * (1 - worry * .6);
    const pts = S.bez([xo, yo], [x, cy], [xi, yi], 12, .5);
    c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = u * .012;
    const p = S.tube(pts, q => t * (.55 + .7 * Math.sin(Math.PI * (.25 + q * .6))));
    c.fill(p); c.restore();
  };

  // eye: almond with iris, highlight, heavy upper lid line
  const eye = (c, x, y, w, h, f, u, near, Lt, skinT) => {
    const open = h * S.clamp(1 - (f.blink || 0)) * (1 - (f.squint || 0) * .45);
    const lw = Math.max(1.4, u * .028);
    const top = (p) => { p.moveTo(x - w / 2, y + h * .1); p.bezierCurveTo(x - w * .25, y - open * 1.05, x + w * .25, y - open * 1.15, x + w / 2, y - open * .15); };
    if (open > h * .12) {
      const a = new Path2D(); top(a); a.bezierCurveTo(x + w * .25, y + open * .75, x - w * .2, y + open * .8, x - w / 2, y + h * .1); a.closePath();
      c.save(); c.fillStyle = '#f3ede2'; c.fill(a); c.clip(a);
      const ir = h * .78, ix = x + (f.look?.[0] || 0) * w * .24 + (near ? 0 : w * .05), iy = y + (f.look?.[1] || 0) * h * .25 + h * .05;
      c.fillStyle = '#3b2216'; c.beginPath(); c.arc(ix, iy, ir, 0, S.TAU); c.fill();
      c.fillStyle = '#5e3a24'; c.beginPath(); c.arc(ix, iy + ir * .25, ir * .6, 0, S.TAU); c.fill();
      c.fillStyle = '#120806'; c.beginPath(); c.arc(ix, iy, ir * .48, 0, S.TAU); c.fill();
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(ix + ir * .32, iy - ir * .35, ir * .24, 0, S.TAU); c.fill();
      c.globalAlpha = .6; c.beginPath(); c.arc(ix - ir * .3, iy + ir * .35, ir * .1, 0, S.TAU); c.fill(); c.globalAlpha = 1;
      // lid shadow on the eyeball
      c.fillStyle = 'rgba(70,30,20,.28)'; c.beginPath(); c.ellipse(x, y - open * .95, w * .7, open * .55, 0, 0, S.TAU); c.fill();
      // tears pooling
      if (f.tears > 0) { c.fillStyle = `rgba(210,235,245,${.55 * f.tears})`; c.beginPath(); c.ellipse(x, y + open * .55, w * .45, open * .3 * f.tears, 0, 0, S.TAU); c.fill(); }
      c.restore();
      // lower lid hint
      c.save(); c.strokeStyle = S.rgba(INK, .55); c.lineWidth = lw * .45; c.lineCap = 'round';
      c.beginPath(); c.moveTo(x - w * .25, y + open * .72); c.quadraticCurveTo(x + w * .1, y + open * .9, x + w * .4, y + open * .45); c.stroke(); c.restore();
    }
    // upper lid line (always), thicker in the middle, with a small lash flick at the outer corner
    c.save(); c.strokeStyle = INK; c.lineCap = 'round'; c.lineWidth = lw;
    const l = new Path2D(); if (open > h * .12) top(l); else { l.moveTo(x - w / 2, y + h * .1); l.quadraticCurveTo(x, y + h * (.35 + (f.squint || 0) * .1), x + w / 2, y); }
    c.stroke(l);
    const oc = near ? [x - w / 2, y + h * .1] : [x + w / 2, y - open * .15];
    c.lineWidth = lw * .8; c.beginPath(); c.moveTo(oc[0], oc[1]); c.lineTo(oc[0] + (near ? -1 : 1) * w * .12, oc[1] - h * .25); c.stroke();
    // crease above lid
    if (open > h * .3) { c.strokeStyle = S.rgba(skinT.shade, .9); c.lineWidth = lw * .5; c.beginPath(); c.moveTo(x - w * .35, y - open * 1.1 - h * .2); c.quadraticCurveTo(x, y - open * 1.35 - h * .25, x + w * .35, y - open * .9 - h * .2); c.stroke(); }
    c.restore();
  };

  // Draw head at origin, facing right. f: face params.
  S.head = (c, ch, u, f, Lt) => {
    const sk = tone(ch.skin, Lt), hr = tone(ch.hairCol, Lt);
    const turn = f.turn || 0; // -1 more frontal .. +1 profile
    const fx = turn * .06 * u;
    const hp = headPath(u, ch);
    const kid = ch.build === 'kid', es = ch.eye || 1;

    // back hair (bun) and dupatta back
    if (false) {
      const dt = tone(ch.dupatta, Lt), sway = (f.sway || 0) * u;
      const back = S.poly([[-.66 * u + sway * .3, .95 * u], [-.6 * u, .2 * u], [-.52 * u, -.42 * u], [-.2 * u, -.66 * u], [-.2 * u, -.3 * u], [-.34 * u, .2 * u], [-.3 * u, .7 * u], [-.2 * u + sway, 1.0 * u]]);
      celT(c, back, dt, Lt, u, { swk: .9 });
    }
    // ear goes under the hair but over the head shape
    celT(c, hp, sk, Lt, u, {
      soft: Math.max(1, u * .025), over: c2 => {
        // warm blush on cheek and nose
        c2.fillStyle = S.rgba('#d0603f', kid ? .22 : .12); c2.beginPath(); c2.ellipse(.13 * u + fx, .18 * u, .1 * u, .06 * u, 0, 0, S.TAU); c2.fill();
        // jaw / under-chin occlusion
        c2.fillStyle = S.rgba(sk.shade, .45); c2.beginPath(); c2.ellipse(-.02 * u, .62 * u, .32 * u, .14 * u, -.2, 0, S.TAU); c2.fill();
      }
    });
    // hair shadow on forehead
    const HL = hairLumps(ch, u), CP = capPath(ch, u);
    const n = Math.hypot(Lt.L[0], Lt.L[1]);
    S.cast(c, hp, CP || lumps(HL), -Lt.L[0] / n * u * .04, u * .05, sk.shade, .55);

    // ear
    const ex = -.16 * u + fx * .5, ey = .06 * u;
    const ear = S.poly([[ex - .02 * u, ey - .1 * u], [ex - .1 * u, ey - .1 * u], [ex - .12 * u, ey + .04 * u], [ex - .04 * u, ey + .13 * u], [ex + .02 * u, ey + .06 * u]]);
    celT(c, ear, sk, Lt, u, { swk: .5 });
    c.save(); c.strokeStyle = S.rgba(sk.shade, 1); c.lineWidth = u * .016; c.lineCap = 'round'; c.beginPath(); c.moveTo(ex - .06 * u, ey - .05 * u); c.quadraticCurveTo(ex - .09 * u, ey + .02 * u, ex - .04 * u, ey + .07 * u); c.stroke(); c.restore();
    if (ch.earring) { const sw = Math.sin((f.time || 0) * 3) * .03 * u; c.save(); c.fillStyle = '#e2b24a'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(ex - .05 * u + sw, ey + .17 * u, .028 * u, 0, S.TAU); c.fill(); c.stroke(); c.restore(); }

    // eyes
    const eyY = (kid ? .04 : .0) * u, ew = (kid ? .16 : .155) * u * es, eh = (kid ? .068 : .062) * u * es;
    const nearX = .06 * u + fx, farX = .29 * u + fx * 1.5;
    eye(c, nearX, eyY, ew, eh, f, u, true, Lt, sk);
    eye(c, farX, eyY - .005 * u, ew * (.72 - turn * .2), eh * .98, f, u, false, Lt, sk);
    // brows
    const hc = hr.base === undefined ? '#1a1214' : S.mix(ch.hairCol.base, '#000000', ch.hair === 'elder' ? .1 : .2);
    const by = eyY - (kid ? .13 : .11) * u - (f.squint || 0) * .02 * u;
    brow(c, nearX - .01 * u, by, ew * 1.25, u, f.raise || 0, f.worry || 0, f.angry || 0, ch.hair === 'elder' ? '#d9d2c8' : hc, 1);
    brow(c, farX + .01 * u, by + .005 * u, ew * .95, u, f.raise || 0, f.worry || 0, f.angry || 0, ch.hair === 'elder' ? '#d9d2c8' : hc, -1);

    // nose: 3/4 view, bridge from between the eyes, rounded tip past the cheek line
    const nx = fx * 1.3;
    const nk = kid ? .8 : ch.build === 'woman' ? .7 : .9;
    c.save(); c.translate(.27 * u + nx, .02 * u); c.scale(nk, nk); c.translate(-(.27 * u + nx), -.02 * u);
    const nose = new Path2D();
    const big = kid ? .85 : ch.build === 'woman' ? .82 : 1;
    nose.moveTo(.28 * u + nx, .02 * u);
    nose.bezierCurveTo(.32 * u + nx, .08 * u, (.37 + .04 * big) * u + nx, .1 * u, (.4 + .03 * big) * u + nx, .16 * u);
    nose.bezierCurveTo((.44 + .03 * big) * u + nx, .22 * u, .39 * u + nx, .255 * u, .33 * u + nx, .24 * u);
    nose.bezierCurveTo(.3 * u + nx, .25 * u, .25 * u + nx, .24 * u, .25 * u + nx, .2 * u);
    nose.bezierCurveTo(.25 * u + nx, .15 * u, .27 * u + nx, .1 * u, .28 * u + nx, .02 * u);
    celT(c, nose, sk, Lt, u, { ink: false, swk: .45 });
    c.save(); c.strokeStyle = INK; c.lineCap = 'round'; c.lineWidth = Math.max(1.2, u * .02);
    c.beginPath(); c.moveTo(.36 * u + nx, .11 * u); c.bezierCurveTo((.4 + .03 * big) * u + nx, .14 * u, (.44 + .03 * big) * u + nx, .2 * u, .4 * u + nx, .24 * u); c.quadraticCurveTo(.37 * u + nx, .255 * u, .34 * u + nx, .245 * u); c.stroke();
    c.lineWidth = Math.max(1, u * .014); c.strokeStyle = S.rgba(INK, .7); c.beginPath(); c.moveTo(.29 * u + nx, .215 * u); c.quadraticCurveTo(.27 * u + nx, .24 * u, .3 * u + nx, .25 * u); c.stroke();
    c.fillStyle = S.rgba('#2a120c', .8); c.beginPath(); c.ellipse(.335 * u + nx, .225 * u, .022 * u, .01 * u, .2, 0, S.TAU); c.fill();
    c.restore(); c.restore();

    // mouth
    const mx = .25 * u + fx * 1.2, my = (kid ? .34 : .35) * u, mw = (.15 + (f.wide || 0) * .04) * u, sm = f.smile || 0, op = f.open || 0;
    const L0 = [mx - mw * .55, my - sm * .045 * u], R0 = [mx + mw * .45, my - sm * .035 * u - .005 * u];
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    if (op > .05) {
      const m = new Path2D(); m.moveTo(L0[0], L0[1]); m.quadraticCurveTo(mx, my + sm * .02 * u - op * .01 * u, R0[0], R0[1]); m.quadraticCurveTo(mx + mw * .05, my + op * .16 * u + sm * .03 * u, L0[0], L0[1]); m.closePath();
      c.fillStyle = '#5a1d18'; c.fill(m); c.save(); c.clip(m);
      c.fillStyle = '#f4ece0'; c.fillRect(mx - mw, my - .1 * u, mw * 2, .1 * u + op * .035 * u + sm * .01 * u);
      c.fillStyle = '#c4544a'; c.beginPath(); c.ellipse(mx, my + op * .15 * u, mw * .4, op * .06 * u, 0, 0, S.TAU); c.fill();
      c.restore(); c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .02); c.stroke(m);
    } else {
      c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .022);
      c.beginPath(); c.moveTo(L0[0], L0[1]); c.quadraticCurveTo(mx, my + sm * .05 * u + (sm < 0 ? sm * .02 * u : 0), R0[0], R0[1]); c.stroke();
      // lower lip shading
      c.strokeStyle = S.rgba(sk.shade, .9); c.lineWidth = u * .016; c.beginPath(); c.moveTo(mx - mw * .2, my + .045 * u + sm * .02 * u); c.quadraticCurveTo(mx, my + .06 * u + sm * .02 * u, mx + mw * .2, my + .04 * u + sm * .02 * u); c.stroke();
    }
    // smile line / cheek
    if (sm > .2) { c.strokeStyle = S.rgba(sk.shade, .9 * sm); c.lineWidth = u * .014; c.beginPath(); c.moveTo(L0[0] - .02 * u, L0[1] - .07 * u); c.quadraticCurveTo(L0[0] - .05 * u, L0[1] - .01 * u, L0[0] - .01 * u, L0[1] + .03 * u); c.stroke(); }
    c.restore();
    // wrinkles for older faces
    if (ch.build === 'elder' || ch.build === 'broad') {
      c.save(); c.strokeStyle = S.rgba(sk.shade, ch.build === 'elder' ? .9 : .5); c.lineWidth = u * .012; c.lineCap = 'round';
      c.beginPath(); c.moveTo(.22 * u + nx, .2 * u); c.quadraticCurveTo(.16 * u + nx, .28 * u, .17 * u + nx, .36 * u); c.stroke();
      c.beginPath(); c.moveTo(.0 * u, -.2 * u); c.quadraticCurveTo(.15 * u, -.23 * u, .28 * u, -.2 * u); c.stroke();
      if (ch.build === 'elder') { c.beginPath(); c.moveTo(-.04 * u, .1 * u); c.lineTo(-.08 * u, .06 * u); c.moveTo(.4 * u, .05 * u); c.lineTo(.44 * u, .02 * u); c.stroke(); }
      c.restore();
    }
    // tears running down
    if (f.streak > 0) {
      c.save(); c.strokeStyle = 'rgba(225,240,248,.75)'; c.lineWidth = u * .012; c.lineCap = 'round';
      const sx = nearX + ew * .1, sy = eyY + eh * 1.2, len = f.streak * .32 * u;
      c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo(sx - .02 * u, sy + len * .5, sx + .01 * u, sy + len); c.stroke();
      c.fillStyle = 'rgba(235,248,255,.85)'; c.beginPath(); c.ellipse(sx + .01 * u, sy + len + .012 * u, .012 * u, .018 * u, 0, 0, S.TAU); c.fill(); c.restore();
    }
    // mustache / beard
    if (ch.mustache) {
      const m = S.poly([[.12 * u + nx, .33 * u], [.18 * u + nx, .26 * u], [.3 * u + nx, .25 * u], [.42 * u + nx, .28 * u], [.42 * u + nx, .35 * u], [.33 * u + nx, .31 * u], [.22 * u + nx, .33 * u], [.15 * u + nx, .38 * u]]);
      celT(c, m, hr, Lt, u, { swk: .4 });
    }
    if (ch.beard) {
      const b = S.poly([[-.2 * u, .22 * u], [-.06 * u, .36 * u], [.12 * u, .36 * u], [.24 * u, .3 * u], [.36 * u, .29 * u], [.38 * u, .4 * u], [.25 * u, .62 * u], [.08 * u, .7 * u], [-.08 * u, .58 * u], [-.2 * u, .4 * u]]);
      celT(c, b, hr, Lt, u, { swk: .6 });
      c.save(); c.strokeStyle = INK; c.lineWidth = u * .018; c.beginPath(); c.moveTo(mx - mw * .4, my + .01 * u); c.quadraticCurveTo(mx, my + .03 * u + sm * .04 * u, mx + mw * .4, my); c.stroke(); c.restore();
      c.save(); c.strokeStyle = S.rgba(hr.shade, .8); c.lineWidth = u * .01; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(-.05 * u + i * .06 * u, .42 * u); c.quadraticCurveTo(-.03 * u + i * .06 * u, .52 * u, -.02 * u + i * .055 * u, .6 * u); c.stroke(); } c.restore();
    }

    // front hair; curly hair is clipped to a hairline so the forehead and brows stay clear
    if (HL.length) {
      c.save();
      if (ch.hair === 'curly') { const hl = new Path2D(); [[-.7, .5], [-.32, .22], [-.22, -.04], [-.08, -.2], [.12, -.3], [.32, -.33], [.7, -.42], [.7, -1.2], [-.7, -1.2]].forEach((q, i) => i ? hl.lineTo(q[0] * u, q[1] * u) : hl.moveTo(q[0] * u, q[1] * u)); hl.closePath(); c.clip(hl); }
      lumpCel(c, HL, hr, Lt, u, { swk: .8 });
      c.restore();
      if (ch.hair === 'curly') lumpCel(c, [[.22 * u, -.31 * u, .075 * u, .055 * u, .3], [.08 * u, -.28 * u, .07 * u, .05 * u, .2], [-.06 * u, -.21 * u, .065 * u, .05 * u, .6]], hr, Lt, u, { swk: .5 });
    }
    if (CP) celT(c, CP, hr, Lt, u, {
      swk: .8, over: c2 => {
        // strands follow the flow of the hair, light on the lit side
        const r = S.rng(5); c2.lineCap = 'round';
        for (let i = 0; i < 14; i++) {
          const a0 = (195 + r() * 140) * D, R0 = (.2 + r() * .3) * u;
          c2.strokeStyle = r() < .5 ? S.rgba(hr.rim, .35) : S.rgba(hr.shade, .6); c2.lineWidth = u * (.008 + r() * .01);
          c2.beginPath(); c2.arc(-.05 * u, -.05 * u, R0 + .15 * u, a0, a0 + .35 + r() * .4); c2.stroke();
        }
      }
    });
    if (ch.hair === 'curly') {
      c.save(); c.strokeStyle = S.rgba(hr.rim, .5); c.lineWidth = u * .012; c.lineCap = 'round';
      const rr = S.rng(17); for (let i = 0; i < 9; i++) { const a = (205 + rr() * 110) * D, R0 = (.2 + rr() * .2) * u, x0 = -.05 * u + Math.cos(a) * R0, y0 = -.1 * u + Math.sin(a) * R0; c.beginPath(); c.arc(x0, y0, .05 * u, a - 1.2, a + .4); c.stroke(); }
      c.restore();
    }
    if (ch.dupatta) {
      const dt = tone(ch.dupatta, Lt);
      const sw2 = (f.sway || 0) * u;
      const band = S.poly([[-.62 * u + sw2, .95 * u], [-.6 * u, .1 * u], [-.54 * u, -.4 * u], [-.22 * u, -.66 * u], [.18 * u, -.64 * u], [.4 * u, -.44 * u], [.3 * u, -.42 * u], [.06 * u, -.46 * u], [-.18 * u, -.36 * u], [-.3 * u, -.1 * u], [-.28 * u, .3 * u], [-.2 * u + sw2 * .5, .9 * u]]);
      celT(c, band, dt, Lt, u, { swk: .7, over: c2 => { c2.strokeStyle = S.rgba(dt.shade, .6); c2.lineWidth = u * .025; c2.lineCap = 'round'; for (let i = 0; i < 3; i++) { c2.beginPath(); c2.moveTo((-.2 - i * .1) * u, (-.5 + i * .05) * u); c2.quadraticCurveTo((-.5 - i * .03) * u, (.1) * u, (-.45 + i * .06) * u + sw2, .9 * u); c2.stroke(); } } });
      c.save(); c.strokeStyle = S.rgba('#e2a64a', .85); c.lineWidth = u * .018; c.beginPath(); c.moveTo(.4 * u, -.44 * u); c.quadraticCurveTo(.1 * u, -.5 * u, -.18 * u, -.37 * u); c.quadraticCurveTo(-.31 * u, -.1 * u, -.28 * u, .3 * u); c.quadraticCurveTo(-.26 * u, .6 * u, -.2 * u + sw2 * .5, .9 * u); c.stroke(); c.restore();
    }
    if (ch.glasses) {
      c.save(); c.strokeStyle = '#4a3020'; c.lineWidth = u * .02;
      c.beginPath(); c.ellipse(nearX, eyY + .01 * u, ew * .7, eh * 2, 0, 0, S.TAU); c.stroke();
      c.beginPath(); c.ellipse(farX, eyY, ew * .5, eh * 1.9, 0, 0, S.TAU); c.stroke();
      c.beginPath(); c.moveTo(nearX + ew * .7, eyY); c.quadraticCurveTo((nearX + farX) / 2, eyY - .03 * u, farX - ew * .5, eyY); c.stroke();
      c.beginPath(); c.moveTo(nearX - ew * .7, eyY); c.lineTo(-.15 * u, eyY + .02 * u); c.stroke();
      c.globalAlpha = .18; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(nearX + ew * .2, eyY - eh * .6, ew * .25, eh * .5, -.5, 0, S.TAU); c.fill();
      c.restore();
    }
  };

  // hand: a soft mitten with a thumb, pointing along angle a
  const hand = (c, p, a, u, sz, sk, Lt, open = 0) => {
    const d = dir(a), n = [d[1], -d[0]];
    const ctr = add(p, d, sz * .45);
    const L = [[ctr[0], ctr[1], sz * .48, sz * .36, Math.atan2(d[1], d[0])]];
    for (let i = 0; i < 4; i++) { const q = add(add(ctr, d, sz * (.3 + open * .25)), n, sz * (-.27 + i * .18)); L.push([q[0], q[1], sz * .14, sz * .14, 0]); }
    const th = add(add(p, d, sz * .35), n, sz * .42); L.push([th[0], th[1], sz * .18, sz * .12, Math.atan2(d[1], d[0]) + .8]);
    lumpCel(c, L, sk, Lt, u, { swk: .35 });
  };

  S.hand = (c, p, a, u, sz, pair, Lt, open) => hand(c, p, a, u, sz, tone(pair, Lt), Lt, open);
  // ---------------- full figure ----------------
  // pose: { face:1|-1, lean, tilt, hipN, hipF, kneeN, kneeF, shN, shF, elN, elF, bob, footN, footF, sit:{y} }
  S.person = (c, ch, x, y, u, pose, f, Lt0) => {
    const B = BUILD[ch.build], P = Object.assign({ face: 1, lean: 0, tilt: 0, hipN: 0, hipF: 0, kneeN: 2, kneeF: 2, shN: 4, shF: -4, elN: 10, elF: 10, bob: 0, footN: 0, footF: 0 }, pose);
    const Lt = Object.assign({}, Lt0, { L: [Lt0.L[0] * P.face, Lt0.L[1]] });
    c.save(); c.translate(x, y); c.scale(P.face, 1);
    const sk = tone(ch.skin, Lt), skD = tone(ch.skin, Lt, .35);
    const thigh = B.legs * .5 * u, shin = B.legs * .5 * u - B.foot * .2 * u;
    const leg = (hipX, a1d, bend) => { const a1 = a1d * D, a2 = (a1d - Math.max(0, bend)) * D; return { a1, a2, d: thigh * Math.cos(a1) + shin * Math.cos(a2) }; };
    const lN = leg(0, P.hipN, P.kneeN), lF = leg(0, P.hipF, P.kneeF);
    const hipY = P.sitY != null ? P.sitY * u : -(Math.max(lN.d, lF.d) + B.foot * .16 * u) + P.bob * u;
    const lean = (P.lean + (ch.stoop || 0)) * D;
    const Hc = [0, hipY];
    const T = B.torso * u;
    const up = [Math.sin(lean), -Math.cos(lean)], rt = [-up[1], up[0]];
    const at = (a, b) => [Hc[0] + rt[0] * a + up[0] * b, Hc[1] + rt[1] * a + up[1] * b];
    const Sc = at(0, T);
    const shN = at(-B.sh * .72 * u, T * .93), shF = at(B.sh * .5 * u, T * .95);
    const hipN = at(-B.hip * .55 * u, 0), hipF = at(B.hip * .6 * u, 0);

    const pantsT = tone(ch.pants, Lt), pantsD = tone(ch.pants, Lt, .35), shirtT = tone(ch.shirt, Lt), shirtD = tone(ch.shirt, Lt, .35);
    const shoesT = ch.shoes && tone(ch.shoes, Lt), shoesD = ch.shoes && tone(ch.shoes, Lt, .35);

    const drawLeg = (hp, l, far, footA) => {
      const kn = add(hp, dir(l.a1), thigh), an = add(kn, dir(l.a2), shin);
      const pt = far ? pantsD : pantsT, st = far ? skD : sk;
      const legW = u => B.legW[0] * u;
      if (ch.mundu && !ch.rolled) {
        // wrapped cloth: legs drawn as one soft tube to the shin, feet below
        celT(c, S.limb(hp, kn, an, [B.legW[0] * u * 1.05, B.legW[1] * u * 1.3], .45), pt, Lt, u);
      } else if (ch.rolled) {
        const mid = [S.lerp(kn[0], an[0], .45), S.lerp(kn[1], an[1], .45)];
        celT(c, S.limb(kn, [S.lerp(kn[0], an[0], .5), S.lerp(kn[1], an[1], .5)], an, [B.legW[1] * u * 1.05, B.legW[1] * u * .85], .2), st, Lt, u);
        celT(c, S.limb(hp, kn, mid, [B.legW[0] * u, B.legW[1] * u * 1.35], .45), pt, Lt, u);
      } else {
        celT(c, S.limb(hp, kn, an, [B.legW[0] * u, B.legW[1] * u], .45), pt, Lt, u);
      }
      // foot
      const fa = l.a2 + (90 + footA) * D; // perpendicular to the shin, toes forward; footA > 0 lifts the toes
      const toe = add(an, dir(fa), B.foot * u);
      if (ch.shoes) celT(c, S.tube([add(an, dir(fa), -B.foot * .1 * u), add(an, [0, B.foot * .08 * u]), add(toe, [0, -B.foot * .05 * u])], q => B.foot * u * (.62 - .14 * q)), far ? shoesD : shoesT, Lt, u, { swk: .5 });
      else celT(c, S.tube([add(an, dir(fa), -B.foot * .06 * u), add(an, [0, B.foot * .06 * u]), add(toe, [0, -B.foot * .02 * u])], q => B.foot * u * (.44 - .14 * q)), st, Lt, u, { swk: .5 });
      if (ch.rolled) { const cuff = [S.lerp(kn[0], an[0], .45), S.lerp(kn[1], an[1], .45)]; celT(c, S.ell(cuff[0], cuff[1], B.legW[1] * u * .78, B.legW[1] * u * .3, l.a2 * -1), pt, Lt, u, { swk: .3 }); }
    };
    const drawArm = (sh, a1d, eld, far, holdFn) => {
      const a1 = a1d * D, a2 = (a1d + Math.max(0, eld)) * D;
      const el = add(sh, dir(a1), B.up * u), wr = add(el, dir(a2), B.fore * u);
      const st = far ? skD : sk, sht = far ? shirtD : shirtT;
      // forearm skin, then sleeve over upper arm (rolled sleeves) or full sleeve
      if (ch.long) celT(c, S.limb(sh, el, wr, [B.armW[0] * u * 1.05, B.armW[1] * u * 1.05], .5), sht, Lt, u);
      else {
        celT(c, S.limb(sh, el, wr, [B.armW[0] * u * .85, B.armW[1] * u * .9], .5), st, Lt, u);
        const cuffP = add(sh, dir(a1), B.up * u * (ch.build === 'kid' ? .6 : .8));
        celT(c, S.limb(sh, add(sh, dir(a1), B.up * u * .45), cuffP, [B.armW[0] * u * 1.12, B.armW[0] * u * 1.05], .1), sht, Lt, u);
      }
      if (ch.bangles && !far) { c.save(); const bp = add(wr, dir(a2), -B.fore * u * .08); c.translate(bp[0], bp[1]); c.rotate(-a2); c.strokeStyle = '#e0b04a'; c.lineWidth = u * .025; c.beginPath(); c.ellipse(0, 0, B.armW[1] * u * .55, u * .03, 0, 0, S.TAU); c.stroke(); c.restore(); }
      if (holdFn) holdFn(wr, a2);
      hand(c, wr, a2, u, (ch.build === 'kid' ? .3 : .36) * u, st, Lt, 0);
      return { el, wr, a2 };
    };

    // far arm
    const arms = {};
    if (ch.bag) { const bt = tone(ch.bag, Lt); celT(c, S.poly([at(-B.sh * 1.25 * u, T * .9), at(-B.sh * .5 * u, T * .95), at(-B.sh * .45 * u, T * .3), at(-B.sh * 1.3 * u, T * .3)]), bt, Lt, u); }
    arms.far = drawArm(shF, P.shF + P.lean + (ch.stoop || 0) * .5, P.elF, true, P.holdF);
    if (!P.hideLegs) { drawLeg(hipF, lF, true, P.footF); drawLeg(hipN, lN, false, P.footN); }

    // torso
    const sh = B.sh * u, hip = B.hip * u, belly = ch.build === 'broad' ? .14 * u : ch.build === 'kid' ? .06 * u : 0;
    const hem = ch.long ? -1.25 * u : ch.build === 'kid' ? -.2 * u : -.2 * u;
    const tor = S.poly([
      at(-sh * .85, T * .9), at(-sh * .3, T * 1.03), at(.0, T * 1.06), at(.22 * u, T * 1.03), at(sh * .62, T * .93),
      at(sh * .7 + belly * .5, T * .62), at(hip * .95 + belly, T * .3), at(hip * 1.1 + (ch.long ? .2 * u : 0), hem), at(-hip * .2, hem - .06 * u), at(-hip * 1.15 - (ch.long ? .15 * u : 0), hem + .04 * u), at(-sh * .9, T * .45)
    ]);
    if (ch.mundu || !ch.long) { const pel = S.ell(Hc[0], Hc[1] + .02 * u, hip * 1.25, .3 * u, lean); celT(c, pel, pantsT, Lt, u); }
    celT(c, tor, shirtT, Lt, u, {
      over: c2 => {
        // painterly folds
        c2.strokeStyle = S.rgba(shirtT.shade, .55); c2.lineWidth = u * .03; c2.lineCap = 'round';
        const f1 = at(-sh * .2, T * .55), f2 = at(sh * .2, T * .25), f3 = at(-sh * .4, T * .25), f4 = at(0, T * .02);
        c2.beginPath(); c2.moveTo(f1[0], f1[1]); c2.quadraticCurveTo((f1[0] + f2[0]) / 2 + .05 * u, (f1[1] + f2[1]) / 2, f2[0], f2[1]); c2.stroke();
        c2.beginPath(); c2.moveTo(f3[0], f3[1]); c2.quadraticCurveTo(f3[0] + .1 * u, f3[1] + .2 * u, f4[0], f4[1]); c2.stroke();
        if (!ch.long) { c2.fillStyle = S.rgba(shirtT.shade, .5); const bt = at(-sh, T * .02); c2.beginPath(); c2.ellipse(bt[0] + sh * .7, bt[1], sh * 1.2, .12 * u, lean, 0, S.TAU); c2.fill(); }
      }
    });
    // collar / neckline
    const nb = at(.05 * u, T * 1.0);
    c.save(); c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .02); c.lineCap = 'round';
    const v1 = at(-.12 * u, T * 1.02), v2 = at(.1 * u, T * .78), v3 = at(.24 * u, T * 1.0);
    if (!ch.long) {
      c.fillStyle = shirtT.rim; const col = S.poly([v1, at(-.22 * u, T * .9), at(.0, T * .82), v2], false); c.fill(col); c.stroke(col);
      const col2 = S.poly([v3, at(.3 * u, T * .9), at(.16 * u, T * .82), v2], false); c.fillStyle = shirtT.base; c.fill(col2); c.stroke(col2);
      c.strokeStyle = S.rgba(INK, .5); c.beginPath(); c.moveTo(v2[0], v2[1]); const bb = at(.12 * u, hem + .05 * u); c.lineTo(bb[0], bb[1]); c.stroke();
    }
    c.restore();
    // neck + head
    const tilt = (P.tilt + P.lean * .4) * D;
    const nk0 = at(.04 * u, T * .98), hd = add(nk0, [Math.sin(lean + tilt), -Math.cos(lean + tilt)], (B.neck + .5) * u);
    celT(c, S.limb(nk0, [S.lerp(nk0[0], hd[0], .5), S.lerp(nk0[1], hd[1], .5)], hd, [B.sh * .42 * u, B.sh * .38 * u], 0), sk, Lt, u, { swk: 1.2 });
    // V neck skin
    if (!ch.long) { c.save(); c.fillStyle = sk.shade; const vv = S.poly([v1, v2, v3], false); c.fill(vv); c.restore(); }
    if (ch.dupatta) {
      const dt = tone(ch.dupatta, Lt);
      const drape = S.poly([at(-sh * 1.0, T * 1.02), at(sh * .3, T * 1.0), at(sh * .7, T * .7), at(sh * .2, T * .2), at(-sh * .2, -.1 * u), at(-sh * 1.05, T * .1)]);
      celT(c, drape, dt, Lt, u, { over: c2 => { c2.strokeStyle = S.rgba(dt.shade, .7); c2.lineWidth = u * .03; for (let i = 0; i < 3; i++) { const a = at(-sh * (.6 - i * .3), T * .95), b = at(sh * (.2 - i * .25), T * .2); c2.beginPath(); c2.moveTo(a[0], a[1]); c2.quadraticCurveTo(a[0] + .2 * u, (a[1] + b[1]) / 2, b[0], b[1]); c2.stroke(); } } });
    }
    c.save(); c.translate(hd[0], hd[1]); c.rotate(lean + tilt);
    S.head(c, ch, u, f, Lt);
    c.restore();
    if (ch.bag) { const bt = tone(ch.bag, Lt); celT(c, S.tube([at(-sh * .55, T * 1.0), at(sh * .05, T * .6), at(sh * .55, T * .05)], u * .08), bt, Lt, u, { swk: .3 }); }
    if (P.beforeNear) { c.save(); c.scale(P.face, 1); c.translate(-x, -y); P.beforeNear(c); c.restore(); }
    arms.near = drawArm(shN, P.shN + P.lean + (ch.stoop || 0) * .5, P.elN, false, P.holdN);
    c.restore();
    return { hipY, arms };
  };

  // simple ground contact shadow
  S.contact = (c, x, y, w, a = .35, col = '#2a160c') => { c.save(); c.globalAlpha = a; const g = c.createRadialGradient(x, y, 0, x, y, w); g.addColorStop(0, col); g.addColorStop(1, S.rgba(col, 0)); c.fillStyle = g; c.scale(1, .22); c.beginPath(); c.arc(x, y / .22, w, 0, S.TAU); c.fill(); c.restore(); };

  // idle and blink helpers
  S.blinkAt = (t, seed = 0) => { const period = 3.1 + (seed % 3) * .7, ph = ((t + seed * 1.3) % period) / period * period; return ph < .16 ? Math.sin(ph / .16 * Math.PI) : 0; };
  S.idle = (t, seed = 0) => ({ shN: -4 + Math.sin(t * 1.1 + seed) * 1.5, shF: 6 + Math.sin(t * 1.1 + seed + .5) * 1.5, elN: 12 + Math.sin(t * .9 + seed) * 3, elF: 10, bob: Math.sin(t * 1.6 + seed) * .012, tilt: Math.sin(t * .7 + seed) * 2.5, lean: Math.sin(t * .5 + seed) * 1 });
  // Run cycle, phase p 0..1. Knees bend forward only, elbows back only.
  S.run = (p, k = 1) => {
    const a = p * S.TAU, b = a + Math.PI;
    const thigh = q => 12 + 42 * Math.sin(q) * k;
    const knee = q => 18 + 70 * S.clamp(.5 + .5 * Math.sin(q + 1.6)) * k + 10;
    return { hipN: thigh(a), hipF: thigh(b), kneeN: knee(a), kneeF: knee(b), shN: -38 * Math.sin(a) * k, shF: -38 * Math.sin(b) * k, elN: 72 + 18 * Math.sin(a), elF: 72 + 18 * Math.sin(b), bob: .1 * Math.cos(2 * a) * k + .05, lean: 9 * k, footN: 5 + 20 * Math.sin(a + .5), footF: 5 + 20 * Math.sin(b + .5), tilt: -3 + 2 * Math.cos(2 * a) };
  };
})(window);
