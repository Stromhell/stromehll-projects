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
    boy: { notes: ['Big round head, short legs, knobbly knees', 'Curly mop clipped above the brows', 'Kurta to mid-thigh, pants rolled below the knee'], name: 'Raju', role: 'Village boy, 10', heads: 5, build: 'kid', skin: SKIN.mid, hair: 'curly', hairCol: HAIR.black, shirt: ['#eee6d3', '#a9a596'], pants: ['#5b8fae', '#365f7c'], rolled: true, bare: true, eye: 1.25 },
    youth: { notes: ['Long legs, slim waist, shoulders 1.5 heads wide', 'Shirt untucked, sleeves to mid-upper-arm', 'Satchel strap crosses the chest'], name: 'Arjun', role: 'Young man, 20', heads: 6.6, build: 'man', skin: SKIN.light, hair: 'neat', hairCol: HAIR.black, shirt: ['#eef2f2', '#a9b7bf'], pants: ['#3f6b8c', '#24435c'], shoes: ['#6b4129', '#3b2116'], bag: ['#7a4a2a', '#4a2a17'], eye: 1 },
    father: { notes: ['Broad chest and a little belly', 'Thick moustache, strong jaw, forehead lines', 'Mundu falls in straight folds to the ankle'], name: 'Gopal', role: 'Father, 45', heads: 6.8, build: 'broad', skin: SKIN.deep, hair: 'swept', hairCol: HAIR.black, mustache: true, shirt: ['#e3ebee', '#9aa9b2'], pants: ['#ece4d0', '#b0a58c'], mundu: true, eye: .95 },
    mother: { notes: ['Soft shoulders, wider hips, narrow waist', 'Dupatta frames the face and falls over one shoulder', 'Long kurta over loose salwar, bangles'], name: 'Lakshmi', role: 'Mother, 40', heads: 6.4, build: 'woman', skin: SKIN.mid, hair: 'bun', hairCol: HAIR.black, shirt: ['#b9773d', '#7a4622'], pants: ['#b9773d', '#7a4622'], dupatta: ['#8f2f22', '#561a14'], long: true, earring: true, bangles: true, eye: 1.05 },
    elder: { notes: ['Stooped 8 degrees, thin arms', 'White side hair, beard, round glasses', 'Moves slower: half the idle speed'], name: 'Dada', role: 'Grandfather, 75', heads: 6.2, build: 'elder', skin: SKIN.deep, hair: 'elder', hairCol: HAIR.white, beard: true, glasses: true, shirt: ['#ddd0ad', '#a08f6a'], pants: ['#efe9da', '#b3aa96'], mundu: true, stoop: 8, eye: .9 },
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

    // nose: 3/4 view. A straight bridge from between the eyes, a neat rounded tip that just breaks the
    // cheek line, a small nostril wing and one nostril. Shading on the bridge side, a highlight on the tip.
    const nx = fx * 1.3;
    const nk = kid ? .82 : ch.build === 'woman' ? .78 : ch.build === 'broad' ? 1 : .92;
    // the nose sits a little lower so its bridge starts below the eye line and never covers the far eye
    const ndy = .07 * u;
    c.save(); c.translate(.3 * u + nx, .1 * u + ndy); c.scale(nk, nk); c.translate(-(.3 * u + nx), -.1 * u - ndy);
    const N = (x, y) => [x * u + nx, y * u + ndy];
    const nose = S.poly([N(.27, -.02), N(.31, .03), N(.36, .1), N(.405, .165), N(.41, .2), N(.385, .228), N(.34, .232), N(.3, .225), N(.265, .2), N(.27, .15), N(.275, .08)]);
    celT(c, nose, sk, Lt, u, { ink: false, swk: .35, rim: sk.base, vol: false });
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    // bridge shadow on the side away from the light
    c.strokeStyle = S.rgba(sk.shade, .55); c.lineWidth = u * .03; c.beginPath(); c.moveTo(...N(.255, .0)); c.quadraticCurveTo(...N(.26, .1), ...N(.27, .16)); c.stroke();
    // front edge and tip
    c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .018);
    c.beginPath(); c.moveTo(...N(.35, .085)); c.lineTo(...N(.395, .15)); c.quadraticCurveTo(...N(.425, .2), ...N(.39, .226)); c.quadraticCurveTo(...N(.365, .238), ...N(.345, .228)); c.stroke();
    // nostril wing: a short c-curve
    c.lineWidth = Math.max(1, u * .014); c.strokeStyle = S.rgba(INK, .75);
    c.beginPath(); c.moveTo(...N(.3, .17)); c.quadraticCurveTo(...N(.275, .2), ...N(.3, .224)); c.stroke();
    // nostril and tip highlight
    c.fillStyle = S.rgba('#2a120c', .75); c.beginPath(); c.ellipse(...N(.335, .222), .02 * u, .009 * u, .25, 0, S.TAU); c.fill();
    c.fillStyle = S.rgba('#fff3e0', .55); c.beginPath(); c.ellipse(...N(.385, .175), .016 * u, .011 * u, -.6, 0, S.TAU); c.fill();
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

  // ---------------- anatomy ----------------
  // Half-width profiles in head units, along the limb from root (q=0) to end (q=1).
  // "back" is the side behind the limb (hamstring/calf, triceps), "front" the side in front (quad/shin, biceps).
  const PF = S.prof;
  // No pinch at the knee or elbow: one smooth taper from root to end, so joints never show.
  const ANAT = {
    legBack: PF([[0, .2], [1, .1]]),
    legFront: PF([[0, .19], [1, .1]]),
    jeansBack: PF([[0, .22], [1, .17]]),
    jeansFront: PF([[0, .21], [1, .165]]),
    salwarBack: PF([[0, .27], [.85, .23], [1, .13]]),
    salwarFront: PF([[0, .26], [.85, .22], [1, .12]]),
    armBack: PF([[0, .12], [1, .085]]),
    armFront: PF([[0, .115], [1, .082]]),
  };
  const BW = { kid: .74, man: 1, broad: 1.13, woman: .86, elder: .9 };

  // hand: palm with four fingers and a thumb, pointing along angle a (relaxed, slightly curled)
  // Detailed relaxed hand, back of the hand toward us: palm, four separate fingers of different lengths
  // (middle longest, little shortest) each gently curled with a knuckle crease and nail, and a thumb in front.
  // Every finger gets its own ink pass, so a thin dark line always separates it from the one behind.
  const hand = (c, p, a, u, sz, sk, Lt, open = 0, fist = 0) => {
    const d = dir(a), n = [d[1], -d[0]];
    const H = (x, y) => add(add(p, d, x * sz), n, y * sz);
    const lw = Math.max(1, u * .014), ink = inkOf(sk);
    sk = Object.assign({}, sk, { base: S.mix(sk.base, sk.shade, .3) });
    const curl = .55 - open * .5 + fist * .6;
    const stroke = (pts, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); if (pts.length === 3) c.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]); else c.lineTo(pts[1][0], pts[1][1]); c.stroke(); };
    c.save();
    // palm / back of hand
    const palm = S.poly([H(.02, -.14), H(.02, .1), H(.2, .17), H(.44, .15), H(.48, .02), H(.46, -.15), H(.24, -.18)]);
    c.lineWidth = lw * 2; c.strokeStyle = ink; c.lineJoin = 'round'; c.stroke(palm);
    c.fillStyle = sk.base; c.fill(palm);
    // fingers from the far side (little finger) to the near side (index)
    const F = [[-.12, .3, .075], [-.04, .38, .085], [.045, .41, .088], [.13, .36, .085]];
    F.forEach(([y, len, w], i) => {
      const b = H(.42, y), m = H(.42 + len * .6, y + curl * .02), e = H(.42 + len * (1 - curl * .25), y + curl * len * .4);
      const fw = w * sz;
      stroke([b, m, e], fw + lw * 2, ink);
      stroke([b, m, e], fw, i < 2 ? S.mix(sk.base, sk.shade, .25) : sk.base);
      // knuckle crease and nail
      c.strokeStyle = S.rgba(sk.shade, .9); c.lineWidth = lw * .7; c.beginPath(); const k = H(.42 + len * .45, y - w * .3), k2 = H(.42 + len * .45, y + w * .3); c.moveTo(k[0], k[1]); c.lineTo(k2[0], k2[1]); c.stroke();
      c.fillStyle = S.rgba(S.mix(sk.base, '#ffffff', .35), .8); c.beginPath(); c.arc(e[0] - d[0] * fw * .2, e[1] - d[1] * fw * .2, fw * .28, 0, S.TAU); c.fill();
    });
    // back-of-hand tendons and shading on the far side
    c.strokeStyle = S.rgba(sk.shade, .5); c.lineWidth = lw * .7;
    for (const y of [-.06, .02, .1]) { const q0 = H(.12, y * .6), q1 = H(.4, y); c.beginPath(); c.moveTo(q0[0], q0[1]); c.lineTo(q1[0], q1[1]); c.stroke(); }
    // thumb in front, pointing down and slightly forward
    const t0 = H(.14, .14), t1 = H(.32, .24 + open * .06), t2 = H(.44, .22 - curl * .04 + open * .08);
    stroke([t0, t1, t2], .1 * sz + lw * 2, ink); stroke([t0, t1, t2], .1 * sz, sk.base);
    c.fillStyle = S.rgba(S.mix(sk.base, '#ffffff', .35), .8); c.beginPath(); c.arc(t2[0], t2[1], .03 * sz, 0, S.TAU); c.fill();
    c.restore();
  };
  S.hand = (c, p, a, u, sz, pair, Lt, open) => hand(c, p, a, u, sz, tone(pair, Lt), Lt, open);

  // foot in profile: heel, ankle, instep, toes. fa = direction the toes point.
  const foot = (c, an, fa, len, u, t, Lt, shoe) => {
    const d = dir(fa), dn = [-d[1], d[0]];
    // dn points toward the sole when the foot points forward on flat ground
    const P = (x, y) => add(add(an, d, x * len), dn, y * len);
    const pts = shoe
      ? [P(-.22, .05), P(-.22, -.2), P(0, -.3), P(.25, -.25), P(.55, -.18), P(.8, -.1), P(.93, .05), P(.87, .23), P(.4, .27), P(-.17, .26)]
      : [P(-.18, .02), P(-.14, -.2), P(.1, -.22), P(.4, -.14), P(.7, -.08), P(.87, .03), P(.84, .17), P(.5, .19), P(.2, .15), P(-.15, .18)];
    celT(c, S.poly(pts), t, Lt, u, { swk: .35 });
    if (shoe) { c.save(); c.strokeStyle = S.rgba(t.shade, .9); c.lineWidth = u * .02; const a = P(-.18, .16), b = P(.86, .14); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); const l0 = P(.1, -.14), l1 = P(.32, -.08); c.lineWidth = u * .012; c.beginPath(); c.moveTo(l0[0], l0[1]); c.lineTo(l1[0], l1[1]); c.stroke(); c.restore(); }
    else { c.save(); c.strokeStyle = S.rgba(t.shade, .8); c.lineWidth = u * .008; for (let i = 0; i < 3; i++) { const a = P(.7 + i * .05, .02), b = P(.72 + i * .05, .1); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); } c.restore(); }
  };

  // ---------------- full figure ----------------
  // pose: { face:1|-1, lean, tilt, hipN, hipF, kneeN, kneeF, shN, shF, elN, elF, bob, footN, footF, sitY, hideLegs }
  S.person = (c, ch, x, y, u, pose, f, Lt0) => {
    const B = BUILD[ch.build], P = Object.assign({ face: 1, lean: 0, tilt: 0, hipN: 0, hipF: 0, kneeN: 2, kneeF: 2, shN: 4, shF: -4, elN: 10, elF: 10, bob: 0, footN: 0, footF: 0 }, pose);
    const Lt = Object.assign({}, Lt0, { L: [Lt0.L[0] * P.face, Lt0.L[1]] });
    const bw = BW[ch.build], fem = ch.build === 'woman', kid = ch.build === 'kid';
    c.save(); c.translate(x, y); c.scale(P.face, 1);
    const sk = tone(ch.skin, Lt), skD = tone(ch.skin, Lt, .35);
    const footH = .13 * u;
    const thigh = B.legs * .5 * u, shin = B.legs * .5 * u - footH;
    const leg = (a1d, bend) => { const a1 = a1d * D, a2 = (a1d - Math.max(0, bend)) * D; return { a1, a2, d: thigh * Math.cos(a1) + shin * Math.cos(a2) }; };
    const lN = leg(P.hipN, P.kneeN), lF = leg(P.hipF, P.kneeF);
    const hipY = P.sitY != null ? P.sitY * u : -(Math.max(lN.d, lF.d) + footH) + P.bob * u;
    const lean = (P.lean + (ch.stoop || 0)) * D;
    const Hc = [0, hipY], T = B.torso * u;
    const up = [Math.sin(lean), -Math.cos(lean)], rt = [-up[1], up[0]];
    const at = (a, b) => [Hc[0] + rt[0] * a + up[0] * b, Hc[1] + rt[1] * a + up[1] * b];
    const W = v => v * u * bw;                       // width scaled by build
    const shN = at(-W(.3), T - .24 * u), shF = at(W(.28), T - .22 * u);
    const hipN = at(-W(.21), .02 * u), hipF = at(W(.24), .0);

    const pantsT = tone(ch.pants, Lt), pantsD = tone(ch.pants, Lt, .35), shirtT = tone(ch.shirt, Lt), shirtD = tone(ch.shirt, Lt, .35);
    const shoesT = ch.shoes && tone(ch.shoes, Lt), shoesD = ch.shoes && tone(ch.shoes, Lt, .35);
    const sub = (pts, q0, q1) => pts.filter((_, i) => { const q = i / (pts.length - 1); return q >= q0 - 1e-6 && q <= q1 + 1e-6; });
    const rescale = (fn, q0, q1) => q => fn(q0 + q * (q1 - q0));
    const SC = (fn, k) => q => fn(q) * u * k;

    const drawLeg = (hp, l, far, footA) => {
      const kn = add(hp, dir(l.a1), thigh), an = add(kn, dir(l.a2), shin);
      const pts = S.joint(hp, kn, an, 30, .7);
      const pt = far ? pantsD : pantsT, st = far ? skD : sk;
      const k = bw * (fem ? 1.05 : 1);
      // bare leg underneath (seen below rolled pants, or for bare legs)
      const bare = S.tube2(pts, SC(ANAT.legBack, k), SC(ANAT.legFront, k));
      if (ch.rolled) {
        celT(c, S.tube2(sub(pts, .55, 1), SC(rescale(ANAT.legBack, .55, 1), k), SC(rescale(ANAT.legFront, .55, 1), k)), st, Lt, u);
        const pq = .68, top = sub(pts, 0, pq);
        celT(c, S.tube2(top, SC(rescale(ANAT.jeansBack, 0, pq), k), SC(rescale(ANAT.jeansFront, 0, pq), k)), pt, Lt, u, {
          
        });
        const cp = pts[Math.round(pq * (pts.length - 1))];
        celT(c, S.ell(cp[0], cp[1], .22 * u * k, .07 * u * k, -l.a2), pt, Lt, u, { swk: .3 });
      } else if (fem) {
        celT(c, S.tube2(pts, SC(ANAT.salwarBack, k), SC(ANAT.salwarFront, k)), pt, Lt, u);
      } else if (!ch.mundu) {
        celT(c, S.tube2(pts, SC(ANAT.jeansBack, k), SC(ANAT.jeansFront, k)), pt, Lt, u);
      } else {
        celT(c, bare, st, Lt, u); // mundu covers this, but the shin shows when the cloth swings
      }
      const fa = l.a2 + (90 + footA) * D;
      foot(c, an, fa, (kid ? .5 : fem ? .54 : .6) * u, u, ch.shoes ? (far ? shoesD : shoesT) : st, Lt, !!ch.shoes);
      return { kn, an };
    };
    // fabric folds behind the knee and at the crotch
    const folds = (c2, pts, t, u, q1) => {
      c2.strokeStyle = S.rgba(t.shade, .6); c2.lineWidth = u * .022; c2.lineCap = 'round';
      const kIdx = Math.round(pts.length * .5 / q1);
      for (const [i, len, side] of [[Math.min(pts.length - 2, kIdx), .14, 1], [Math.min(pts.length - 2, kIdx + 2), .1, -1], [3, .12, 1]]) {
        if (i >= pts.length - 1) continue;
        const p = pts[i], q = pts[i + 1], tx = q[0] - p[0], ty = q[1] - p[1], l = Math.hypot(tx, ty) || 1, nx = -ty / l, ny = tx / l;
        const a = [p[0] + nx * u * .12 * side, p[1] + ny * u * .12 * side], b = [a[0] - nx * u * len * side + tx / l * u * .05, a[1] - ny * u * len * side + ty / l * u * .05];
        c2.beginPath(); c2.moveTo(a[0], a[1]); c2.quadraticCurveTo((a[0] + b[0]) / 2 + tx / l * u * .04, (a[1] + b[1]) / 2 + ty / l * u * .04, b[0], b[1]); c2.stroke();
      }
    };
    const drawArm = (sh, a1d, eld, far, holdFn) => {
      const a1 = a1d * D, a2 = (a1d + Math.max(0, eld)) * D;
      const el = add(sh, dir(a1), B.up * u), wr = add(el, dir(a2), B.fore * u);
      const pts = S.joint(sh, el, wr, 30, .7);
      const st = far ? skD : sk, sht = far ? shirtD : shirtT, k = bw * (fem ? .9 : 1);
      if (holdFn) holdFn(wr, a2);
      hand(c, add(wr, dir(a2), -.08 * u), a2, u, (kid ? .5 : fem ? .54 : .62) * u, st, Lt, 0, holdFn ? .6 : 0);
      if (ch.long) {
        celT(c, S.tube2(pts, q => (ANAT.armBack(q) + .03) * u * k, q => (ANAT.armFront(q) + .03) * u * k), sht, Lt, u);
      } else {
        celT(c, S.tube2(pts, SC(ANAT.armBack, k), SC(ANAT.armFront, k)), st, Lt, u);
        const sq = kid ? .28 : .32, top = sub(pts, 0, sq);
        celT(c, S.tube2(top, q => (ANAT.armBack(q * sq) + .03 + .01 * q) * u * k, q => (ANAT.armFront(q * sq) + .03 + .01 * q) * u * k), sht, Lt, u);
      }
      if (ch.bangles && !far) { c.save(); const bp = add(wr, dir(a2), -B.fore * u * .1); c.translate(bp[0], bp[1]); c.rotate(-a2); c.strokeStyle = '#e0b04a'; c.lineWidth = u * .022; for (let i = 0; i < 2; i++) { c.beginPath(); c.ellipse(0, i * u * .035, .1 * u, u * .028, 0, 0, S.TAU); c.stroke(); } c.restore(); }
      return { el, wr, a2 };
    };

    const arms = {};
    if (ch.bag) { const bt = tone(ch.bag, Lt); celT(c, S.poly([at(-W(.75), T - .3 * u), at(-W(.3), T - .2 * u), at(-W(.28), T * .3), at(-W(.8), T * .32)]), bt, Lt, u); }
    arms.far = drawArm(shF, P.shF + P.lean + (ch.stoop || 0) * .5, P.elF, true, P.holdF);
    if (!P.hideLegs) { drawLeg(hipF, lF, true, P.footF); drawLeg(hipN, lN, false, P.footN); }

    // mundu: wrapped cloth from waist to ankle, one shape around both legs
    if (ch.mundu && !P.hideLegs) {
      const kN = add(hipN, dir(lN.a1), thigh), kF = add(hipF, dir(lF.a1), thigh);
      const aN = add(kN, dir(lN.a2), shin), aF = add(kF, dir(lF.a2), shin);
      const hemY = Math.max(aN[1], aF[1]) - .25 * u;
      const md = S.poly([at(-W(.44), .25 * u), at(W(.4), .25 * u), [Math.max(kN[0], kF[0]) + W(.32), Math.min(kN[1], kF[1])], [Math.max(aN[0], aF[0]) + W(.3), hemY], [(aN[0] + aF[0]) / 2, hemY + .06 * u], [Math.min(aN[0], aF[0]) - W(.3), hemY], [Math.min(kN[0], kF[0]) - W(.34), Math.min(kN[1], kF[1])]]);
      celT(c, md, pantsT, Lt, u, { over: c2 => { c2.strokeStyle = S.rgba(pantsT.shade, .55); c2.lineWidth = u * .025; c2.lineCap = 'round'; const k0 = at(W(.1), 0); for (let i = 0; i < 4; i++) { c2.beginPath(); c2.moveTo(k0[0] + (i - 1.5) * W(.12), k0[1]); c2.quadraticCurveTo(k0[0] + (i - 1.5) * W(.2), (k0[1] + hemY) / 2, k0[0] + (i - 1.5) * W(.24), hemY); c2.stroke(); } c2.strokeStyle = S.rgba('#8a6a3a', .6); c2.lineWidth = u * .03; c2.beginPath(); c2.moveTo(Math.min(aN[0], aF[0]) - W(.3), hemY - .05 * u); c2.lineTo(Math.max(aN[0], aF[0]) + W(.3), hemY - .05 * u); c2.stroke(); } });
    }

    // torso: neck, trapezius, shoulder blade, waist, buttock at the back; collarbone, chest, ribs, belly at the front
    const belly = ch.build === 'broad' ? .07 : ch.build === 'kid' ? .03 : ch.build === 'elder' ? .04 : 0;
    const chest = fem ? .06 : 0, waistIn = fem ? .05 : 0, hipOut = fem ? .07 : 0;
    const hemB = ch.long ? -1.3 * u : kid ? -.55 * u : -.32 * u;
    const flare = ch.long ? .25 : kid ? .08 : .04;
    const shirtPath = S.poly([
      at(-W(.14), T + .04 * u), at(-W(.42), T - .12 * u), at(-W(.5), T - .42 * u), at(-W(.43 - waistIn), T * .42), at(-W(.42 + hipOut), T * .12),
      at(-W(.47 + hipOut + flare), hemB + .04 * u), at(W(.05), hemB - .02 * u), at(W(.4 + hipOut + belly + flare), hemB),
      at(W(.39 + belly + hipOut * .6), T * .16), at(W(.36 - waistIn + belly), T * .36), at(W(.43 + chest), T - .48 * u), at(W(.36), T - .1 * u), at(W(.15), T + .03 * u),
    ]);
    // pants top / hips under the shirt
    if (!ch.long && !ch.mundu && !P.hideLegs) celT(c, S.poly([at(-W(.44), T * .2), at(-W(.48), -.18 * u), at(-W(.1), -.3 * u), at(W(.36), -.2 * u), at(W(.4), T * .2)]), pantsT, Lt, u);
    celT(c, shirtPath, shirtT, Lt, u, {
      over: c2 => {
        c2.strokeStyle = S.rgba(shirtT.shade, .5); c2.lineWidth = u * .025; c2.lineCap = 'round';
        const L2 = (a, b, cc) => { c2.beginPath(); c2.moveTo(a[0], a[1]); c2.quadraticCurveTo(b[0], b[1], cc[0], cc[1]); c2.stroke(); };
        L2(at(-W(.3), T - .5 * u), at(-W(.05), T * .55), at(W(.18), T * .32));          // fold from shoulder blade to waist
        L2(at(-W(.38), T * .3), at(-W(.2), T * .1), at(-W(.05), hemB + .2 * u));         // fold across the hip
        L2(at(W(.32), T - .5 * u), at(W(.36), T * .6), at(W(.3), T * .45));             // under-chest crease
        if (fem) L2(at(W(.1), T - .3 * u), at(W(.4), T - .55 * u), at(W(.42), T - .7 * u));
        // soft shadow under the chest and on the belly side
        c2.fillStyle = S.rgba(shirtT.shade, .25); const cc = at(W(.2), T * .42); c2.beginPath(); c2.ellipse(cc[0], cc[1], W(.3), .14 * u, lean, 0, S.TAU); c2.fill();
      }
    });
    // shirt details: collar and placket
    const v1 = at(-W(.1), T + .02 * u), v2 = at(W(.12), T - .32 * u), v3 = at(W(.17), T + .0 * u);
    if (!ch.long) {
      c.save(); c.strokeStyle = inkOf(shirtT); c.lineWidth = Math.max(1.1, u * .016); c.lineJoin = 'round';
      c.fillStyle = shirtT.shade; c.fill(S.poly([v1, v2, v3], false));
      c.fillStyle = shirtT.rim; const col = S.poly([v1, at(-W(.24), T - .1 * u), at(W(.02), T - .24 * u), v2], false); c.fill(col); c.stroke(col);
      c.fillStyle = shirtT.base; const col2 = S.poly([v3, at(W(.3), T - .12 * u), at(W(.18), T - .22 * u), v2], false); c.fill(col2); c.stroke(col2);
      c.strokeStyle = S.rgba(inkOf(shirtT), .45); c.beginPath(); c.moveTo(v2[0], v2[1]); const bb = at(W(.16), hemB + .04 * u); c.lineTo(bb[0], bb[1]); c.stroke();
      c.fillStyle = S.rgba(inkOf(shirtT), .5); for (let i = 1; i < 4; i++) { const bp = at(W(.14 + i * .006), T - .32 * u - i * (T * .26)); c.beginPath(); c.arc(bp[0], bp[1], u * .014, 0, S.TAU); c.fill(); }
      c.restore();
    } else {
      c.save(); c.strokeStyle = inkOf(shirtT); c.lineWidth = Math.max(1.1, u * .016); const n0 = at(-W(.1), T + .02 * u), n1 = at(W(.06), T - .22 * u), n2 = at(W(.16), T); c.fillStyle = sk.shade; const nk = S.poly([n0, n1, n2], false); c.fill(nk); c.stroke(nk); c.restore();
    }
    // neck: sits on the trapezius, slightly forward
    const tilt = (P.tilt + P.lean * .4) * D;
    const nk0 = at(W(.02), T - .06 * u), hd = add(nk0, [Math.sin(lean + tilt), -Math.cos(lean + tilt)], (B.neck + .47) * u);
    const nw = (kid ? .17 : fem ? .16 : ch.build === 'broad' ? .22 : .19) * u;
    celT(c, S.tube2([nk0, [S.lerp(nk0[0], hd[0], .5), S.lerp(nk0[1], hd[1], .5)], hd], () => nw * 1.05, () => nw), sk, Lt, u, { swk: 1.1, over: c2 => { c2.strokeStyle = S.rgba(sk.shade, .7); c2.lineWidth = u * .014; const a = add(nk0, rt, nw * .3), b = add(a, up, .25 * u); c2.beginPath(); c2.moveTo(a[0], a[1]); c2.quadraticCurveTo(a[0] + .05 * u, (a[1] + b[1]) / 2, b[0], b[1]); c2.stroke(); } });
    if (ch.dupatta) {
      const dt = tone(ch.dupatta, Lt);
      const drape = S.poly([at(-W(.5), T + .02 * u), at(W(.15), T + .02 * u), at(W(.46), T - .3 * u), at(W(.42), T * .35), at(W(.05), -.2 * u), at(-W(.45), -.1 * u), at(-W(.55), T * .5)]);
      celT(c, drape, dt, Lt, u, { over: c2 => { c2.strokeStyle = S.rgba(dt.shade, .7); c2.lineWidth = u * .03; for (let i = 0; i < 4; i++) { const a = at(-W(.4 - i * .2), T - .05 * u), b = at(W(.3 - i * .2), T * .1); c2.beginPath(); c2.moveTo(a[0], a[1]); c2.quadraticCurveTo(a[0] + .3 * u, (a[1] + b[1]) / 2, b[0], b[1]); c2.stroke(); } c2.strokeStyle = S.rgba('#e2a64a', .8); c2.lineWidth = u * .025; const e0 = at(W(.42), T * .35), e1 = at(W(.05), -.2 * u); c2.beginPath(); c2.moveTo(e0[0], e0[1]); c2.lineTo(e1[0], e1[1]); c2.stroke(); } });
    }
    c.save(); c.translate(hd[0], hd[1]); c.rotate(lean + tilt);
    S.head(c, ch, u, f, Lt);
    c.restore();
    if (ch.bag) { const bt = tone(ch.bag, Lt); celT(c, S.tube([at(-W(.3), T - .05 * u), at(W(.05), T * .55), at(W(.38), T * .05)], u * .07), bt, Lt, u, { swk: .3 }); }
    if (P.beforeNear) { c.save(); c.scale(P.face, 1); c.translate(-x, -y); P.beforeNear(c); c.restore(); }
    arms.near = drawArm(shN, P.shN + P.lean + (ch.stoop || 0) * .5, P.elN, false, P.holdN);
    c.restore();
    return { hipY, arms };
  };

  // simple ground contact shadow
  S.contact = (c, x, y, w, a = .35, col = '#2a160c') => { c.save(); c.globalAlpha = a; const g = c.createRadialGradient(x, y, 0, x, y, w); g.addColorStop(0, col); g.addColorStop(1, S.rgba(col, 0)); c.fillStyle = g; c.scale(1, .22); c.beginPath(); c.arc(x, y / .22, w, 0, S.TAU); c.fill(); c.restore(); };

  // idle and blink helpers
  S.blinkAt = (t, seed = 0) => { const period = 3.1 + (seed % 3) * .7, ph = ((t + seed * 1.3) % period) / period * period; return ph < .16 ? Math.sin(ph / .16 * Math.PI) : 0; };
  S.idle = (t, seed = 0) => ({ shN: -1 + Math.sin(t * 1.1 + seed) * 1, shF: 2 + Math.sin(t * 1.1 + seed + .5) * 1, elN: 6 + Math.sin(t * .9 + seed) * 2, elF: 5, bob: Math.sin(t * 1.6 + seed) * .012, tilt: Math.sin(t * .7 + seed) * 2.5, lean: Math.sin(t * .5 + seed) * 1 });
  // Run cycle, phase p 0..1. Knees bend forward only, elbows back only.
  S.run = (p, k = 1) => {
    const a = p * S.TAU, b = a + Math.PI;
    const thigh = q => 12 + 42 * Math.sin(q) * k;
    const knee = q => 18 + 70 * S.clamp(.5 + .5 * Math.sin(q + 1.6)) * k + 10;
    return { hipN: thigh(a), hipF: thigh(b), kneeN: knee(a), kneeF: knee(b), shN: -38 * Math.sin(a) * k, shF: -38 * Math.sin(b) * k, elN: 72 + 18 * Math.sin(a), elF: 72 + 18 * Math.sin(b), bob: .1 * Math.cos(2 * a) * k + .05, lean: 9 * k, footN: 5 + 20 * Math.sin(a + .5), footF: 5 + 20 * Math.sin(b + .5), tilt: -3 + 2 * Math.cos(2 * a) };
  };

  // ======================================================================
  // TURNAROUND: front and back views (the 3/4 views come from S.person)
  // Built from Pushpam's turnaround refs: limbs are simple tubes with a gentle taper,
  // arms hang close to the body, the clothes give the silhouette, feet are short and round.
  // ======================================================================
  const HF = {
    // symmetric head, facing the viewer
    shape: (u, ch) => {
      const k = ch.build === 'kid', jw = ch.build === 'broad' ? 1.07 : ch.build === 'woman' ? .93 : 1;
      const X = v => v * u, p = new Path2D();
      const hw = k ? .44 : .4, cy = k ? .5 : .56, jx = (k ? .3 : .3) * jw, jy = k ? .32 : .34;
      p.moveTo(0, X(-.54));
      p.bezierCurveTo(X(hw * .62), X(-.54), X(hw), X(-.36), X(hw), X(-.08));
      p.bezierCurveTo(X(hw), X(.1), X(jx + .06), X(jy - .04), X(jx), X(jy + .04));
      p.bezierCurveTo(X(jx * .7), X(cy - .04), X(.12), X(cy), 0, X(cy));
      p.bezierCurveTo(X(-.12), X(cy), X(-jx * .7), X(cy - .04), X(-jx), X(jy + .04));
      p.bezierCurveTo(X(-jx - .06), X(jy - .04), X(-hw), X(.1), X(-hw), X(-.08));
      p.bezierCurveTo(X(-hw), X(-.36), X(-hw * .62), X(-.54), 0, X(-.54));
      p.closePath(); p.bb = [-hw * u, -.54 * u, hw * u, cy * u]; return p;
    },
    cap: { // front hairline caps (x, y in head units); mirrored where symmetric
      neat: [[-.45, -.02], [-.47, -.3], [-.33, -.58], [-.02, -.66], [.3, -.6], [.47, -.34], [.45, -.02], [.4, -.1], [.36, -.28], [.16, -.34], [-.06, -.28], [-.24, -.3], [-.38, -.24], [-.41, -.08]],
      swept: [[-.47, 0], [-.5, -.32], [-.36, -.62], [-.02, -.72], [.34, -.64], [.5, -.36], [.47, 0], [.42, -.08], [.38, -.3], [.18, -.36], [.0, -.3], [-.2, -.34], [-.38, -.26], [-.43, -.06]],
      bun: [[-.44, .02], [-.46, -.3], [-.32, -.56], [0, -.62], [.32, -.56], [.46, -.3], [.44, .02], [.4, -.06], [.36, -.26], [.16, -.34], [0, -.4], [-.16, -.34], [-.36, -.26], [-.4, -.06]],
    },
    capBack: {
      neat: [[-.46, .14], [-.48, -.3], [-.33, -.58], [0, -.66], [.33, -.58], [.48, -.3], [.46, .14], [.3, .3], [0, .34], [-.3, .3]],
      swept: [[-.48, .14], [-.5, -.32], [-.36, -.62], [0, -.72], [.36, -.62], [.5, -.32], [.48, .14], [.3, .3], [0, .34], [-.3, .3]],
      bun: [[-.45, .1], [-.47, -.3], [-.32, -.56], [0, -.62], [.32, -.56], [.47, -.3], [.45, .1], [.28, .28], [0, .32], [-.28, .28]],
    },
  };
  const poly = (pts, u, sx = 1) => S.poly(pts.map(q => [q[0] * u * sx, q[1] * u]));

  S.headFront = (c, ch, u, f, Lt, back) => {
    const sk = tone(ch.skin, Lt), hr = tone(ch.hairCol, Lt), kid = ch.build === 'kid', es = ch.eye || 1;
    const hp = HF.shape(u, ch);
    // dupatta hood sits behind the head
    if (ch.dupatta) { const dt = tone(ch.dupatta, Lt); celT(c, poly([[-.56, .7], [-.58, .0], [-.46, -.5], [0, -.7], [.46, -.5], [.58, 0], [.56, .7], [.3, .62], [-.3, .62]], u), dt, Lt, u, { swk: .9 }); }
    // ears behind the head outline
    for (const s of [-1, 1]) { const ex = s * (kid ? .43 : .39) * u; celT(c, S.ell(ex, .06 * u, .075 * u, .12 * u, 0), sk, Lt, u, { swk: .5 }); }
    celT(c, hp, sk, Lt, u, { soft: Math.max(1, u * .025), over: c2 => {
      if (back) return;
      c2.fillStyle = S.rgba('#d0603f', kid ? .22 : .12);
      for (const s of [-1, 1]) { c2.beginPath(); c2.ellipse(s * .22 * u, .2 * u, .09 * u, .055 * u, 0, 0, S.TAU); c2.fill(); }
      c2.fillStyle = S.rgba(sk.shade, .4); c2.beginPath(); c2.ellipse(0, .6 * u, .3 * u, .12 * u, 0, 0, S.TAU); c2.fill();
    } });
    if (ch.earring && !back) for (const s of [-1, 1]) { c.save(); c.fillStyle = '#e2b24a'; c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.arc(s * .4 * u, .2 * u, .028 * u, 0, S.TAU); c.fill(); c.stroke(); c.restore(); }

    if (!back) {
      const eyY = (kid ? .05 : .01) * u, ew = (kid ? .15 : .14) * u * es, eh = (kid ? .066 : .058) * u * es, ex = (kid ? .18 : .16) * u;
      eye(c, -ex, eyY, ew, eh, f, u, true, Lt, sk);
      eye(c, ex, eyY, ew, eh, f, u, false, Lt, sk);
      const hc = S.mix(ch.hairCol.base, '#000000', ch.hair === 'elder' ? .1 : .2), by = eyY - (kid ? .12 : .1) * u - (f.squint || 0) * .02 * u;
      brow(c, -ex - .01 * u, by, ew * 1.2, u, f.raise || 0, f.worry || 0, f.angry || 0, ch.hair === 'elder' ? '#d9d2c8' : hc, 1);
      brow(c, ex + .01 * u, by, ew * 1.2, u, f.raise || 0, f.worry || 0, f.angry || 0, ch.hair === 'elder' ? '#d9d2c8' : hc, -1);
      // nose, front: soft bridge shadow on the side away from the light, a rounded tip with a highlight,
      // two small nostril wings and two nostrils
      const ny = (kid ? .24 : .26) * u, nk = kid ? .8 : ch.build === 'woman' ? .78 : ch.build === 'broad' ? 1.05 : .92, sL = Lt.L[0] >= 0 ? -1 : 1;
      c.save(); c.lineCap = 'round';
      c.strokeStyle = S.rgba(sk.shade, .5); c.lineWidth = u * .03; c.beginPath(); c.moveTo(sL * .035 * u, eyY + .07 * u); c.quadraticCurveTo(sL * .045 * u * nk, ny - .06 * u, sL * .05 * u * nk, ny - .02 * u); c.stroke();
      c.fillStyle = S.rgba(sk.shade, .35); c.beginPath(); c.ellipse(0, ny + .01 * u, .05 * u * nk, .025 * u, 0, 0, S.TAU); c.fill();
      c.strokeStyle = INK; c.lineWidth = Math.max(1.1, u * .016);
      for (const s2 of [-1, 1]) { c.beginPath(); c.moveTo(s2 * .045 * u * nk, ny - .035 * u); c.quadraticCurveTo(s2 * .075 * u * nk, ny + .005 * u, s2 * .04 * u * nk, ny + .025 * u); c.stroke(); }
      c.strokeStyle = S.rgba(INK, .6); c.beginPath(); c.moveTo(-.025 * u * nk, ny + .03 * u); c.quadraticCurveTo(0, ny + .042 * u, .025 * u * nk, ny + .03 * u); c.stroke();
      c.fillStyle = S.rgba('#2a120c', .75); for (const s2 of [-1, 1]) { c.beginPath(); c.ellipse(s2 * .022 * u * nk, ny + .02 * u, .014 * u, .008 * u, s2 * .3, 0, S.TAU); c.fill(); }
      c.fillStyle = S.rgba('#fff3e0', .5); c.beginPath(); c.ellipse(-sL * .008 * u, ny - .015 * u, .014 * u, .01 * u, 0, 0, S.TAU); c.fill();
      c.restore();
      // mouth
      const my = (kid ? .34 : .37) * u, mw = .15 * u * (kid ? .9 : 1), sm = f.smile || 0, op = f.open || 0;
      c.save(); c.lineCap = 'round';
      if (op > .05) {
        const m = new Path2D(); m.moveTo(-mw / 2, my - sm * .03 * u); m.quadraticCurveTo(0, my - op * .01 * u, mw / 2, my - sm * .03 * u); m.quadraticCurveTo(0, my + op * .16 * u, -mw / 2, my - sm * .03 * u); m.closePath();
        c.fillStyle = '#5a1d18'; c.fill(m); c.save(); c.clip(m); c.fillStyle = '#f4ece0'; c.fillRect(-mw, my - .1 * u, mw * 2, .1 * u + op * .035 * u); c.restore();
        c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .02); c.stroke(m);
      } else {
        c.strokeStyle = INK; c.lineWidth = Math.max(1.2, u * .022); c.beginPath(); c.moveTo(-mw / 2, my - sm * .04 * u); c.quadraticCurveTo(0, my + sm * .05 * u, mw / 2, my - sm * .04 * u); c.stroke();
        c.strokeStyle = S.rgba(sk.shade, .9); c.lineWidth = u * .016; c.beginPath(); c.moveTo(-mw * .22, my + .05 * u); c.quadraticCurveTo(0, my + .065 * u, mw * .22, my + .05 * u); c.stroke();
      }
      c.restore();
      if (ch.build === 'elder' || ch.build === 'broad') { c.save(); c.strokeStyle = S.rgba(sk.shade, ch.build === 'elder' ? .9 : .5); c.lineWidth = u * .012; c.lineCap = 'round'; c.beginPath(); c.moveTo(-.14 * u, -.2 * u); c.quadraticCurveTo(0, -.23 * u, .14 * u, -.2 * u); c.stroke(); for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * .09 * u, ny); c.quadraticCurveTo(s * .14 * u, my - .02 * u, s * .12 * u, my + .04 * u); c.stroke(); } c.restore(); }
      if (f.streak > 0) { c.save(); c.strokeStyle = 'rgba(225,240,248,.75)'; c.lineWidth = u * .012; c.beginPath(); c.moveTo(-ex, eyY + eh * 1.2); c.quadraticCurveTo(-ex - .02 * u, eyY + .2 * u, -ex + .01 * u, eyY + eh + f.streak * .3 * u); c.stroke(); c.restore(); }
      if (ch.mustache) celT(c, poly([[-.2, .34], [-.14, .27], [0, .26], [.14, .27], [.2, .34], [.12, .32], [0, .31], [-.12, .32]], u), hr, Lt, u, { swk: .4 });
      if (ch.beard) celT(c, poly([[-.33, .2], [-.2, .36], [0, .3], [.2, .36], [.33, .2], [.3, .42], [.14, .62], [0, .68], [-.14, .62], [-.3, .42]], u), hr, Lt, u, { swk: .6, over: c2 => { c2.strokeStyle = INK; c2.lineWidth = u * .018; c2.beginPath(); c2.moveTo(-.06 * u, my + .02 * u); c2.quadraticCurveTo(0, my + .04 * u, .06 * u, my + .02 * u); c2.stroke(); } });
      if (ch.glasses) { c.save(); c.strokeStyle = '#4a3020'; c.lineWidth = Math.max(1.2, u * .016); for (const s of [-1, 1]) { c.beginPath(); c.arc(s * ex, eyY, .085 * u, 0, S.TAU); c.stroke(); } c.beginPath(); c.moveTo(-ex + .085 * u, eyY); c.quadraticCurveTo(0, eyY - .03 * u, ex - .085 * u, eyY); c.stroke(); c.restore(); }
    }
    // hair
    if (ch.hair === 'curly') {
      const r = S.rng(77), L = [];
      const n = back ? 22 : 15, a0 = back ? -10 : 175, a1 = back ? 370 : 365 - 0;
      for (let i = 0; i < n; i++) { const a = S.lerp(a0, a1, i / (n - 1)) * D, rr = S.lerp(.1, .14, r()); L.push([Math.cos(a) * .42 * u, (-.1 + Math.sin(a) * .44) * u, rr * u, rr * u * .9, a]); }
      L.push([0, -.22 * u, .3 * u, .26 * u, 0]);
      if (back) L.push([0, .05 * u, .38 * u, .3 * u, 0]);
      c.save(); if (!back) { const hl = new Path2D(); [[-.7, .3], [-.38, .0], [-.3, -.26], [-.1, -.3], [.1, -.32], [.3, -.26], [.38, 0], [.7, .3], [.7, -1.2], [-.7, -1.2]].forEach((q, i) => i ? hl.lineTo(q[0] * u, q[1] * u) : hl.moveTo(q[0] * u, q[1] * u)); hl.closePath(); c.clip(hl); }
      lumpCel(c, L, hr, Lt, u, { swk: .8 }); c.restore();
      if (!back) lumpCel(c, [[-.18 * u, -.3 * u, .08 * u, .06 * u, .3], [0, -.33 * u, .08 * u, .06 * u, 0], [.17 * u, -.3 * u, .08 * u, .06 * u, -.3]], hr, Lt, u, { swk: .5 });
    } else if (ch.hair === 'elder') {
      for (const s of [-1, 1]) celT(c, poly([[.3, -.2], [.42, -.22], [.47, -.02], [.44, .14], [.36, .12], [.33, -.04]], u, s), hr, Lt, u, { swk: .6 });
      if (back) celT(c, poly([[-.43, -.04], [-.22, .14], [0, .19], [.22, .14], [.43, -.04], [.4, .2], [.22, .34], [0, .38], [-.22, .34], [-.4, .2]], u), hr, Lt, u, { swk: .5, over: c2 => { c2.strokeStyle = S.rgba(hr.shade, .8); c2.lineWidth = u * .012; for (let k = 0; k < 7; k++) { const x0 = (-.3 + k * .1) * u; c2.beginPath(); c2.moveTo(x0, .2 * u); c2.lineTo(x0 * 1.05, .32 * u); c2.stroke(); } } });
    } else {
      const pts = (back ? HF.capBack : HF.cap)[ch.hair];
      if (pts) celT(c, poly(pts, u), hr, Lt, u, { swk: .8, over: c2 => { c2.strokeStyle = S.rgba(hr.rim, .35); c2.lineWidth = u * .012; c2.lineCap = 'round'; for (let i = 0; i < 5; i++) { const x0 = (-.3 + i * .15) * u; c2.beginPath(); c2.moveTo(x0, -.58 * u); c2.quadraticCurveTo(x0 * 1.1 + .04 * u, -.45 * u, x0 * 1.15, -.32 * u); c2.stroke(); } } });
      if (ch.hair === 'bun' && back && !ch.dupatta) lumpCel(c, [[0, .02 * u, .17 * u, .15 * u, 0]], hr, Lt, u);
    }
    // dupatta crown over the hair, gold edge
    if (ch.dupatta) {
      const dt = tone(ch.dupatta, Lt);
      const crown = back ? [[-.56, .62], [-.58, 0], [-.46, -.5], [0, -.7], [.46, -.5], [.58, 0], [.56, .62], [0, .66]]
        : [[-.52, .2], [-.52, -.3], [-.36, -.6], [0, -.7], [.36, -.6], [.52, -.3], [.52, .2], [.44, .1], [.42, -.28], [.24, -.46], [0, -.5], [-.24, -.46], [-.42, -.28], [-.44, .1]];
      celT(c, poly(crown, u), dt, Lt, u, { swk: .7, over: c2 => { if (back) return; c2.strokeStyle = '#d9a640'; c2.lineWidth = u * .03; c2.beginPath(); c2.moveTo(-.46 * u, .1 * u); c2.quadraticCurveTo(-.44 * u, -.44 * u, 0, -.52 * u); c2.quadraticCurveTo(.44 * u, -.44 * u, .46 * u, .1 * u); c2.stroke(); } });
    }
  };

  // full figure, front or back. Feet on (x, y), u = head unit.
  S.personFront = (c, ch, x, y, u, f, Lt0, back = false, t = 0) => {
    const B = BUILD[ch.build], bw = BW[ch.build], fem = ch.build === 'woman', kid = ch.build === 'kid';
    const Lt = back ? Object.assign({}, Lt0, { L: [-Lt0.L[0], Lt0.L[1]] }) : Lt0;
    const sk = tone(ch.skin, Lt), skD = tone(ch.skin, Lt, .3), shirtT = tone(ch.shirt, Lt), pantsT = tone(ch.pants, Lt);
    const bob = Math.sin(t * 1.6) * .012 * u;
    const footH = .13 * u, legLen = B.legs * u - footH;
    const hipY = -legLen - footH + bob, T = B.torso * u, neckY = hipY - T;
    const shW = B.sh * u * (fem ? .95 : .9), hpW = B.hip * u * (fem ? 1.1 : .95);
    const SCw = (fn, k) => q => fn(q) * u * k;
    c.save(); c.translate(x, y);

    // legs
    const legX = hpW * .5;
    const legPts = s => { const h = [s * legX, hipY], k = [s * legX * 1.04, hipY + legLen * .5], a = [s * legX * 1.08, -footH]; return S.joint(h, k, a, 30, .7); };
    const footF = s => { const ax = s * legX * 1.08, len = (kid ? .5 : fem ? .54 : .6) * u, w = (kid ? .2 : .22) * u;
      const sh = !!ch.shoes, ft = sh ? tone(ch.shoes, Lt) : sk;
      const pts = back ? [[-w * .8, -footH * .9], [w * .8, -footH * .9], [w, -footH * .2], [w * .9, 0], [-w * .9, 0], [-w, -footH * .2]]
        : [[-w * .75, -footH * 1.1], [w * .75, -footH * 1.1], [w * 1.05, -footH * .4], [w * 1.15, -footH * .05], [w * .3, len * .08], [-w * .3, len * .08], [-w * 1.15, -footH * .05], [-w * 1.05, -footH * .4]];
      celT(c, S.poly(pts.map(p => [ax + p[0] + s * w * .15, p[1]])), ft, Lt, u, { swk: .35, over: c2 => { if (sh && !back) { c2.strokeStyle = S.rgba(ft.shade, .9); c2.lineWidth = u * .02; c2.beginPath(); c2.moveTo(ax - w + s * w * .15, -footH * .1); c2.lineTo(ax + w + s * w * .15, -footH * .1); c2.stroke(); } } });
    };
    for (const s of [-1, 1]) {
      const pts = legPts(s), k = bw * (fem ? 1.05 : 1);
      if (ch.rolled) {
        const sub = pts.slice(Math.round(pts.length * .55));
        celT(c, S.tube2(sub, q => ANAT.legBack(.55 + q * .45) * u * k, q => ANAT.legFront(.55 + q * .45) * u * k), sk, Lt, u);
        const top = pts.slice(0, Math.round(pts.length * .68) + 1);
        celT(c, S.tube2(top, q => ANAT.jeansBack(q * .68) * u * k * 1.05, q => ANAT.jeansFront(q * .68) * u * k * 1.05), pantsT, Lt, u);
        const cp = top[top.length - 1]; celT(c, S.ell(cp[0], cp[1], .22 * u * k, .07 * u * k, 0), pantsT, Lt, u, { swk: .3 });
      } else if (ch.mundu) {
        celT(c, S.tube2(pts, SCw(ANAT.legBack, k * .9), SCw(ANAT.legFront, k * .9)), sk, Lt, u);
      } else if (fem) {
        celT(c, S.tube2(pts, SCw(ANAT.salwarBack, k), SCw(ANAT.salwarFront, k)), pantsT, Lt, u);
      } else {
        celT(c, S.tube2(pts, SCw(ANAT.jeansBack, k), SCw(ANAT.jeansFront, k)), pantsT, Lt, u);
      }
      footF(s);
    }
    // mundu: one wrapped cloth from waist to ankle
    if (ch.mundu) {
      const hem = -footH - .28 * u, top = hipY - .1 * u;
      const md = S.poly([[-hpW * 1.08, top], [hpW * 1.08, top], [hpW * 1.22, hipY + legLen * .45], [hpW * 1.2, hem], [0, hem + .04 * u], [-hpW * 1.2, hem], [-hpW * 1.22, hipY + legLen * .45]]);
      celT(c, md, pantsT, Lt, u, { over: c2 => { c2.strokeStyle = S.rgba(pantsT.shade, .55); c2.lineWidth = u * .022; c2.lineCap = 'round'; for (let i = 0; i < 5; i++) { const x0 = (-.5 + i * .25) * hpW; c2.beginPath(); c2.moveTo(x0 * .8, top + .3 * u); c2.quadraticCurveTo(x0 * 1.05, (top + hem) / 2, x0 * 1.15, hem); c2.stroke(); } c2.strokeStyle = S.rgba('#8a6a3a', .6); c2.lineWidth = u * .03; c2.beginPath(); c2.moveTo(-hpW * 1.2, hem - .05 * u); c2.lineTo(hpW * 1.2, hem - .05 * u); c2.stroke(); if (!back) { c2.strokeStyle = S.rgba(pantsT.shade, .8); c2.beginPath(); c2.moveTo(hpW * .3, top); c2.quadraticCurveTo(hpW * .4, (top + hem) / 2, hpW * .25, hem); c2.stroke(); } } });
    }

    // arms hang close to the body with a slight outward angle; long sleeve for a kurta
    const arm = s => {
      const sh = [s * (shW - .13 * u * bw), neckY + .3 * u], sway = Math.sin(t * .9 + s) * .02 * u;
      const el = [sh[0] + s * .1 * u + sway, sh[1] + B.up * u], wr = [el[0] + s * .02 * u + sway * 1.5, el[1] + B.fore * u];
      const pts = S.joint(sh, el, wr, 30, .7), k = bw * (fem ? .9 : 1);
      c.save(); c.translate(wr[0], wr[1]); c.scale(-s, 1);
      hand(c, [0, -.08 * u], 0, u, (kid ? .5 : fem ? .54 : .62) * u, sk, Object.assign({}, Lt, { L: [Lt.L[0] * -s, Lt.L[1]] }), 0, 0);
      c.restore();
      celT(c, S.tube2(pts, SCw(ANAT.armBack, k), SCw(ANAT.armFront, k)), sk, Lt, u);
      if (ch.long) celT(c, S.tube2(pts.slice(0, Math.round(pts.length * .92)), q => (ANAT.armBack(q) + .04) * u * k, q => (ANAT.armFront(q) + .04) * u * k), shirtT, Lt, u);
      else { const sq = kid ? .28 : .32, top = pts.slice(0, Math.round(pts.length * sq) + 1); celT(c, S.tube2(top, q => (ANAT.armBack(q * sq) + .035) * u * k, q => (ANAT.armFront(q * sq) + .035) * u * k), shirtT, Lt, u); }
      if (ch.bangles) { c.save(); c.strokeStyle = '#e0b04a'; c.lineWidth = u * .022; for (let i = 0; i < 2; i++) { c.beginPath(); c.ellipse(wr[0], wr[1] - .1 * u + i * .035 * u, .1 * u, .028 * u, 0, 0, S.TAU); c.stroke(); } c.restore(); }
    };
    for (const s of [-1, 1]) arm(s);

    // neck
    const nw = (kid ? .15 : fem ? .14 : ch.build === 'broad' ? .19 : .16) * u, headY = neckY - (B.neck + .47) * u;
    celT(c, S.poly([[-nw, headY + .3 * u], [nw, headY + .3 * u], [nw * 1.1, neckY + .1 * u], [-nw * 1.1, neckY + .1 * u]], false), skD, Lt, u, { swk: .3 });

    // torso: shoulder, chest, waist, hip, hem. Men widest at the shoulder, the mother at the hip.
    const belly = ch.build === 'broad' ? .06 : 0, waistIn = fem ? .1 : .03, hipOut = fem ? .08 : 0;
    const hemY = hipY + (ch.long ? 1.3 : kid ? .55 : .32) * u, flare = ch.long ? .22 : kid ? .06 : .03;
    const half = [[nw * 1.1, neckY - .02 * u], [shW * .78, neckY + .12 * u], [shW, neckY + .32 * u], [shW * .93, neckY + .75 * u], [hpW * (1 - waistIn) + belly * u, hipY - T * .4], [hpW * (1.02 + hipOut) + belly * u, hipY - .05 * u], [hpW * (1.05 + hipOut) + flare * u, hemY]];
    const torso = [...half, ...half.slice().reverse().map(p => [-p[0], p[1]])];
    if (!ch.long && !ch.mundu) celT(c, S.poly([[-hpW * 1.02, hipY - .25 * u], [hpW * 1.02, hipY - .25 * u], [hpW * 1.04, hipY + .3 * u], [0, hipY + .34 * u], [-hpW * 1.04, hipY + .3 * u]]), pantsT, Lt, u);
    celT(c, S.poly(torso), shirtT, Lt, u, { over: c2 => {
      c2.strokeStyle = S.rgba(shirtT.shade, .5); c2.lineWidth = u * .022; c2.lineCap = 'round';
      for (const s of [-1, 1]) { c2.beginPath(); c2.moveTo(s * shW * .8, neckY + .7 * u); c2.quadraticCurveTo(s * shW * .55, hipY - T * .45, s * hpW * .7, hipY - T * .25); c2.stroke(); }
      if (!back) {
        // collar and placket
        c2.strokeStyle = S.rgba(inkOf(shirtT), .8); c2.lineWidth = u * .02;
        c2.beginPath(); c2.moveTo(-nw * 1.3, neckY - .02 * u); c2.lineTo(0, neckY + (fem ? .3 : .22) * u); c2.lineTo(nw * 1.3, neckY - .02 * u); c2.stroke();
        if (!fem) { c2.strokeStyle = S.rgba(shirtT.shade, .8); c2.beginPath(); c2.moveTo(0, neckY + .22 * u); c2.lineTo(0, hemY - .05 * u); c2.stroke(); c2.fillStyle = S.rgba(inkOf(shirtT), .6); for (let i = 0; i < 4; i++) { c2.beginPath(); c2.arc(.03 * u, neckY + (.4 + i * .4) * u, .022 * u, 0, S.TAU); c2.fill(); } }
      } else { c2.strokeStyle = S.rgba(shirtT.shade, .7); c2.lineWidth = u * .02; c2.beginPath(); c2.moveTo(-nw * 1.3, neckY + .02 * u); c2.quadraticCurveTo(0, neckY + .08 * u, nw * 1.3, neckY + .02 * u); c2.stroke(); }
    } });
    // dupatta over both shoulders, hanging in front (or down the back)
    if (ch.dupatta) {
      const dt = tone(ch.dupatta, Lt);
      if (back) celT(c, S.poly([[-shW * .85, neckY], [shW * .85, neckY], [shW * .9, neckY + 1.6 * u], [0, neckY + 1.75 * u], [-shW * .9, neckY + 1.6 * u]]), dt, Lt, u, { swk: .8 });
      else for (const s of [-1, 1]) celT(c, S.poly([[s * nw * 1.2, neckY - .05 * u], [s * shW * .95, neckY + .1 * u], [s * shW * .85, neckY + 1.9 * u], [s * shW * .45, neckY + 1.95 * u], [s * shW * .4, neckY + .5 * u]]), dt, Lt, u, { swk: .8, over: c2 => { c2.strokeStyle = '#d9a640'; c2.lineWidth = u * .03; c2.beginPath(); c2.moveTo(s * shW * .42, neckY + .5 * u); c2.lineTo(s * shW * .47, neckY + 1.93 * u); c2.stroke(); } });
    }
    if (ch.bag) {
      const bt = tone(ch.bag, Lt), s = back ? 1 : -1;
      celT(c, S.tube([[s * -shW * .7, neckY + .08 * u], [0, hipY - T * .45], [s * hpW * 1.05, hipY - .05 * u]], u * .06), bt, Lt, u, { swk: .3 });
      celT(c, S.poly([[s * hpW * .7, hipY - .25 * u], [s * hpW * 1.45, hipY - .2 * u], [s * hpW * 1.45, hipY + .45 * u], [s * hpW * .75, hipY + .45 * u]]), bt, Lt, u, { swk: .4 });
    }
    // head
    c.save(); c.translate(0, headY + (ch.stoop ? .06 * u : 0)); c.rotate(Math.sin(t * .7) * 1.5 * D);
    S.headFront(c, ch, u, f, Lt, back);
    c.restore();
    c.restore();
  };
})(window);
