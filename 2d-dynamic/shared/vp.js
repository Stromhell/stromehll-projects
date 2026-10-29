// Village Painterly bridge for the KIT timeline (2D dynamic line).
// Shots are drawn on the 1280x720 "stage" of the Village Painterly rig (engine.js + cast.js),
// scaled into KIT's 1920x1080 canvas with an eased camera. Adds: cached 2x painted sets,
// cast shadows that follow the light, a horse rig, riders, and moving-light helpers.
// Load order: vp/engine.js, vp/cast.js, vp/scenes.js, vp/spain.js, kit.js, vp.js, timing.js, act code.
(function (G) {
  const S = G.S, K = G.KIT, E = K.E, TAU = Math.PI * 2, D = Math.PI / 180;
  const VP = {}, SW = 1280, SH = 720, BASE = 1920 / SW;

  // ---------- painted sets, cached at 2x so the camera can push in ----------
  VP.sets = {};
  VP.set = (name, w, h, fn) => { VP.sets[name] = { w, h, fn, img: null }; };
  VP.bg = name => { const s = VP.sets[name]; if (!s.img) s.img = S.off(s.w * 2, s.h * 2, g => { g.scale(2, 2); s.fn(g, s.w, s.h); }); return s; };

  // ---------- camera ----------
  // cam = { z:[z0,z1], x:[cx0,cx1], y:[cy0,cy1], ease, shake } in stage coords (cx,cy = stage point at screen centre).
  VP.cam = (c, cam = {}, u = 0, w = SW, h = SH, lt = 0) => {
    const e = (cam.ease || E.sine)(K.clamp(u));
    const z = K.lerp(cam.z?.[0] ?? 1, cam.z?.[1] ?? cam.z?.[0] ?? 1, e), sc = Math.max(BASE * z, 1920 / w, 1080 / h);
    let cx = K.lerp(cam.x?.[0] ?? w / 2, cam.x?.[1] ?? cam.x?.[0] ?? w / 2, e), cy = K.lerp(cam.y?.[0] ?? h / 2, cam.y?.[1] ?? cam.y?.[0] ?? h / 2, e);
    if (cam.drift) { cx += Math.sin(lt * .31) * cam.drift; cy += Math.sin(lt * .23 + 1) * cam.drift * .6; }
    if (cam.shake) { cx += (S.noise(lt * 9, 3) - .5) * cam.shake; cy += (S.noise(lt * 9, 7) - .5) * cam.shake; }
    cx = K.clamp(cx, 960 / sc, w - 960 / sc); cy = K.clamp(cy, 540 / sc, h - 540 / sc);
    c.setTransform(sc, 0, 0, sc, 960 - cx * sc, 540 - cy * sc);
    return { sc, cx, cy };
  };
  VP.drawSet = (c, name) => { const s = VP.bg(name); c.drawImage(s.img, 0, 0, s.w, s.h); return s; };

  // ---------- cast shadows ----------
  // The figure is drawn once into a mask, flattened onto the ground along the light, blurred, then the figure itself.
  // sh = { k: sideways length per unit height (+ = to the right), sy: height kept (+ = falls behind, - = toward camera), a, blur, col }
  const shc = document.createElement('canvas'); shc.width = 1920; shc.height = 1080; const shx = shc.getContext('2d');
  VP.figure = (c, foot, sh, draw) => {
    if (sh && sh.a > 0) {
      const m = c.getTransform();
      shx.setTransform(1, 0, 0, 1, 0, 0); shx.clearRect(0, 0, 1920, 1080); shx.setTransform(m); shx.save(); draw(shx); shx.restore();
      shx.setTransform(1, 0, 0, 1, 0, 0); shx.globalCompositeOperation = 'source-in'; shx.fillStyle = sh.col || '#1c0f08'; shx.fillRect(0, 0, 1920, 1080); shx.globalCompositeOperation = 'source-over';
      const fy = m.d * foot[1] + m.f;
      c.save(); c.setTransform(1, 0, -sh.k, sh.sy, sh.k * fy, fy * (1 - sh.sy)); c.globalAlpha = sh.a; c.filter = `blur(${(sh.blur ?? 3) * m.d / BASE}px)`; c.drawImage(shc, 0, 0); c.restore();
    }
    c.save(); draw(c); c.restore();
  };
  // Shadow thrown onto a wall behind the figure: the silhouette slid along the light, clipped to the wall.
  VP.wallShadow = (c, dx, dy, a, blur, draw, clip) => {
    const m = c.getTransform();
    shx.setTransform(1, 0, 0, 1, 0, 0); shx.clearRect(0, 0, 1920, 1080); shx.setTransform(m); shx.save(); draw(shx); shx.restore();
    shx.setTransform(1, 0, 0, 1, 0, 0); shx.globalCompositeOperation = 'source-in'; shx.fillStyle = '#1c0f08'; shx.fillRect(0, 0, 1920, 1080); shx.globalCompositeOperation = 'source-over';
    c.save(); if (clip) c.clip(clip); c.setTransform(1, 0, 0, 1, dx * m.a, dy * m.d); c.globalAlpha = a; c.filter = `blur(${blur * m.a / BASE}px)`; c.drawImage(shc, 0, 0); c.restore();
  };
  // Shadow settings from a light: low sun = long shadows. dir = -1 light from the left (shadow to the right).
  VP.shadowOf = (Lt, len = 1.2, a = .38, sy = .16) => ({ k: -Math.sign(Lt.L[0] || 1) * len, sy, a, blur: 3 });

  // ---------- moving light ----------
  // A light preset that changes inside the shot: the key swings by `swing` degrees and the rim breathes.
  VP.light = (name, t = 0, o = {}) => {
    const b = Object.assign({}, S.LIGHT[name] || S.LIGHT.studio, o.set || {});
    const a = Math.atan2(b.L[1], b.L[0]) + (o.swing || 0) * D * Math.sin(t * (o.speed || .35) + (o.ph || 0));
    const r = Math.hypot(b.L[0], b.L[1]);
    return Object.assign(b, { L: [Math.cos(a) * r, Math.sin(a) * r], rimA: Math.min(1, b.rimA * (1 + (o.breathe || 0) * Math.sin(t * 1.3 + (o.ph || 0)))) });
  };
  VP.flicker = (t, seed = 0) => .55 + .25 * S.noise(t * 7, seed) + .2 * S.noise(t * 17, seed + 5);
  VP.glow = (c, x, y, r, col, a = 1, op = 'lighter') => S.glow(c, x, y, r, col, a, op);
  // drifting cloud shadows over the ground (multiply)
  VP.clouds = (c, t, o = {}) => {
    const n = o.n ?? 4, w = o.w ?? SW, y0 = o.y0 ?? 380, y1 = o.y1 ?? SH, sp = o.speed ?? 14;
    c.save(); c.globalCompositeOperation = 'multiply';
    for (let i = 0; i < n; i++) { const r = S.rng(i * 17 + (o.seed || 0)); const rx = 220 + r() * 260, ry = rx * .28, x = ((r() * (w + 600) + t * sp * (.7 + r() * .6)) % (w + 600)) - 300, y = y0 + r() * (y1 - y0);
      const g = c.createRadialGradient(x, y, 0, x, y, rx); g.addColorStop(0, S.rgba(o.col || '#5a4a6a', o.a ?? .35)); g.addColorStop(1, S.rgba(o.col || '#5a4a6a', 0));
      c.fillStyle = g; c.save(); c.translate(x, y); c.scale(1, ry / rx); c.translate(-x, -y); c.beginPath(); c.arc(x, y, rx, 0, TAU); c.fill(); c.restore(); }
    c.restore();
  };
  // light shafts fanning from a source, slowly turning
  VP.rays = (c, x, y, t, o = {}) => {
    const n = o.n ?? 7, len = o.len ?? 900, col = o.col || '#ffe2a8';
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) { const a = (o.ang ?? 0.6) + (i - n / 2) * (o.spread ?? .09) + Math.sin(t * .2 + i) * .02, al = (o.a ?? .06) * (.6 + .4 * Math.sin(t * .7 + i * 1.7));
      const x1 = x + Math.cos(a) * len, y1 = y + Math.sin(a) * len; S.beam(c, x, y, x1, y1, 4, o.w1 ?? 120, col, al); }
    c.restore();
  };
  // dust and pollen catching the light
  VP.motes = (c, t, x, y, w, h, o = {}) => {
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let k = 0; k < (o.n ?? 40); k++) { const r = S.rng(k + 300), px = x + ((r() * w + t * (4 + r() * 8)) % w), py = y + ((r() * h + Math.sin(t * .6 + k) * 14 - t * (o.rise ?? 2)) % h + h) % h;
      c.fillStyle = S.rgba(o.col || '#fff0c8', (o.a ?? .5) * (.4 + .6 * Math.abs(Math.sin(t * 1.5 + k)))); c.beginPath(); c.arc(px, py, (o.r ?? 1.4) * (.6 + r()), 0, TAU); c.fill(); }
    c.restore();
  };
  // breath / steam puffs rising from (x,y)
  VP.breath = (c, x, y, t, o = {}) => {
    c.save();
    for (let k = 0; k < 6; k++) { const life = ((t * (o.rate ?? .45) + k / 6) % 1), px = x + (o.dir ?? 1) * life * (o.dx ?? 40) + Math.sin(life * 6 + k) * 4, py = y - life * (o.rise ?? 30), r = 3 + life * (o.size ?? 16);
      const g = c.createRadialGradient(px, py, 0, px, py, r); g.addColorStop(0, S.rgba(o.col || '#f4ece4', (1 - life) * (o.a ?? .35))); g.addColorStop(1, S.rgba(o.col || '#f4ece4', 0)); c.fillStyle = g; c.beginPath(); c.arc(px, py, r, 0, TAU); c.fill(); }
    c.restore();
  };
  // a pole with a cloth banner that waves in the wind; drop 0..1 lowers it down the pole
  VP.banner = (c, x, y, h, w, col, t, o = {}) => {
    const drop = o.drop || 0, top = y - h + drop * (h - w * .7), bh = w * .62, wind = o.wind ?? 1;
    c.save(); c.strokeStyle = o.pole || '#3a2618'; c.lineWidth = o.pw ?? 2.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - h); c.stroke();
    const pts = []; for (let i = 0; i <= 10; i++) { const q = i / 10, wv = Math.sin(t * 4 * wind - q * 5 + (o.ph || 0)) * q * w * .09 * wind; pts.push([x + q * w * (o.dir ?? 1), top + wv]); }
    const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (const q of pts) p.lineTo(q[0], q[1]); for (let i = 10; i >= 0; i--) p.lineTo(pts[i][0], pts[i][1] + bh * (1 - i / 10 * .15)); p.closePath();
    const Lt = o.Lt || S.LIGHT.golden; const tn = S.tone(Array.isArray(col) ? col : [col, S.mix(col, '#000000', .45)], Lt);
    c.fillStyle = tn.base; c.fill(p);
    // folds: light and dark bands that travel with the wave
    c.save(); c.clip(p); for (let i = 0; i < 10; i++) { const q = i / 10, s = Math.sin(t * 4 * wind - q * 5 + (o.ph || 0) + 1.2); c.fillStyle = s > 0 ? S.rgba(tn.rim, .35 * s) : S.rgba(tn.shade, -.45 * s); c.fillRect(x + q * w * (o.dir ?? 1), top - 40, w * .1 * (o.dir ?? 1), bh + 80); } c.restore();
    c.lineWidth = 1.2; c.strokeStyle = S.inkOf(tn); c.stroke(p);
    if (o.emblem) o.emblem(c, pts[5][0], pts[5][1] + bh * .5, bh);
    c.fillStyle = '#d8b060'; c.beginPath(); c.arc(x, y - h - 2, o.pw ?? 2.4, 0, TAU); c.fill();
    c.restore();
  };

  // ---------- horse ----------
  // Side view, facing +x when face = 1. (x, y) = ground under the barrel; h = height at the withers.
  // o = { face, ph: walk phase (cycles), walk: 0..1 stride, col: [base, shade], mane, headUp: -1..1, graze, t, tack: {cloth:[b,s], trim} }
  const ik = (A, F, l1, l2, side) => { const dx = F[0] - A[0], dy = F[1] - A[1]; let d = Math.hypot(dx, dy); d = Math.min(d, l1 + l2 - .01); const a = Math.atan2(dy, dx), b = Math.acos(K.clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)); const ang = a + side * b; return [A[0] + Math.cos(ang) * l1, A[1] + Math.sin(ang) * l1]; };
  VP.horse = (c, x, y, h, o = {}, Lt0 = S.LIGHT.golden) => {
    const face = o.face ?? 1, t = o.t || 0, walk = o.walk ?? 0, ph = o.ph ?? 0;
    const Lt = Object.assign({}, Lt0, { L: [Lt0.L[0] * face, Lt0.L[1]] });
    const col = o.col || ['#3a302c', '#151010'], body = S.tone(col, Lt), far = S.tone(col, Lt, .45), hair = S.tone(o.mane || ['#1a1414', '#070505'], Lt);
    const u = h, bob = -walk * .018 * h * Math.cos(ph * TAU * 2) + Math.sin(t * 1.4) * .004 * h;
    const P = (a, b) => [a * u, b * u + bob];
    const cel = (p, tn, k = 1) => S.cel(c, p, { base: tn.base, shade: tn.shade, rim: tn.rim, L: Lt.L, sw: (Lt.sw || .2) * u * .22 * k, rw: Math.max(1.2, u * .012), ink: S.inkOf(tn), lw: Math.max(1, u * .009) });
    c.save(); c.translate(x, y); c.scale(face, 1);
    // legs: hoof path from a walk cycle, knee by two-bone IK (front knees fold forward, hocks point back)
    const leg = (q, front, tn) => {
      q = ((q % 1) + 1) % 1; const s = .2 * u * walk, st = .62;
      let hx, lift = 0; if (q < st) hx = K.lerp(s, -s, q / st); else { const v = (q - st) / (1 - st); hx = K.lerp(-s, s, E.sine(v)); lift = Math.sin(v * Math.PI) * walk; }
      if (o.graze && front) hx += .02 * u;
      const A = front ? P(.4, -.64) : P(-.42, -.68), rest = front ? .42 * u : -.45 * u;
      const fet = [rest + hx, -.075 * u - lift * .1 * u];
      const l1 = (front ? .29 : .33) * u, l2 = (front ? .28 : .29) * u;
      const B = ik(A, fet, l1, l2, front ? -1 : 1);
      const kneeK = front ? 1 : 1.1, pts = S.joint(A, B, fet, 18, .3);
      const p = S.tube(pts, q2 => u * (q2 < pts.kq ? K.lerp(front ? .13 : .2, front ? .06 : .075, Math.pow(q2 / pts.kq, .7)) : K.lerp(.055, .045, (q2 - pts.kq) / (1 - pts.kq))));
      cel(p, tn, .6);
      // pastern + hoof
      const tilt = lift * .5 * (front ? 1 : .6);
      c.save(); c.translate(fet[0], fet[1]); c.rotate(-tilt);
      const hp = S.poly([[-.035 * u, -.01 * u], [.04 * u, -.01 * u], [.07 * u, .07 * u], [-.05 * u, .075 * u]], false); cel(hp, S.tone(['#4a3a30', '#1e1612'], Lt), .3);
      c.restore();
    };
    leg(ph + .75, true, far); leg(ph + .5, false, far);
    // tail
    const sw = Math.sin(t * 1.7) * .03 * u + walk * Math.sin(ph * TAU) * .02 * u;
    { const tp = S.poly([P(-.52, -.98), P(-.6, -.95), [-.67 * u + sw, -.78 * u + bob], [-.71 * u + sw * 1.6, -.56 * u + bob], [-.73 * u + sw * 2.2, -.4 * u + bob], [-.63 * u + sw * 2, -.42 * u + bob], [-.6 * u + sw * 1.2, -.62 * u + bob], P(-.55, -.86)]);
      cel(tp, hair, .6); c.save(); c.clip(tp); c.strokeStyle = S.rgba(hair.rim, .35); c.lineWidth = u * .008; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(-.57 * u, -.92 * u + bob); c.quadraticCurveTo(-.64 * u + sw, -.7 * u + bob, -.62 * u - i * .018 * u + sw * 2, -.4 * u + bob); c.stroke(); } c.restore(); }
    leg(ph + .25, true, body); leg(ph, false, body);
    // neck and head
    const hu = o.headUp ?? 0, gz = o.graze ? 1 : 0, nod = walk * Math.sin(ph * TAU * 2) * .02 * u + Math.sin(t * .9) * .008 * u;
    const hb = gz ? P(.8, -.5) : [(.63 + hu * .04) * u, (-1.33 - hu * .08) * u + bob + nod];
    const neck = S.tube2([P(.4, -.86), [K.lerp(.4 * u, hb[0], .5) + .02 * u, K.lerp(-.86 * u, hb[1], .5) - .04 * u * (1 - gz)], hb], q => u * K.lerp(.15, .075, q), q => u * K.lerp(.16, .07, q));
    cel(neck, body, 1);
    // barrel, chest and rump
    const bp = S.poly([P(.36, -1.03), P(.5, -.95), P(.57, -.8), P(.53, -.62), P(.36, -.52), P(.1, -.49), P(-.2, -.51), P(-.42, -.57), P(-.56, -.72), P(-.57, -.9), P(-.45, -1.0), P(-.15, -.95), P(.12, -.98)]);
    cel(bp, body, 1.2);
    // mane along the top of the neck
    c.save(); c.strokeStyle = hair.base; c.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const q = i / 8, mx = K.lerp(.33 * u, hb[0], q) - .05 * u, my = K.lerp(-1.0 * u, hb[1] - .06 * u, q), wv = Math.sin(t * 3 + i) * .012 * u;
      c.lineWidth = u * .04; c.beginPath(); c.moveTo(mx, my); c.quadraticCurveTo(mx - .045 * u + wv, my + .05 * u, mx - .06 * u + wv, my + .1 * u); c.stroke(); }
    c.restore();
    c.save(); c.translate(hb[0], hb[1]); c.rotate((gz ? 80 : 42 - hu * 12) * D); c.scale(.82, .82);
    const head = S.poly([[-.07 * u, -.07 * u], [.08 * u, -.1 * u], [.24 * u, -.05 * u], [.42 * u, .03 * u], [.49 * u, .1 * u], [.47 * u, .17 * u], [.37 * u, .19 * u], [.19 * u, .13 * u], [.02 * u, .11 * u], [-.09 * u, .05 * u]]);
    cel(head, body, .9);
    cel(S.poly([[-.04 * u, -.06 * u], [-.03 * u, -.2 * u], [.04 * u, -.08 * u]]), body, .4);
    c.fillStyle = '#0a0606'; c.beginPath(); c.ellipse(.1 * u, -.02 * u, .022 * u, .016 * u, .3, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,240,220,.8)'; c.beginPath(); c.arc(.105 * u, -.027 * u, .006 * u, 0, TAU); c.fill();
    c.fillStyle = S.rgba(body.shade, .9); c.beginPath(); c.ellipse(.44 * u, .12 * u, .018 * u, .012 * u, .5, 0, TAU); c.fill();
    // bridle
    if (o.tack) { c.strokeStyle = o.tack.strap || '#2a1a10'; c.lineWidth = u * .016; c.beginPath(); c.moveTo(.0, -.07 * u); c.lineTo(.06 * u, .11 * u); c.moveTo(.3 * u, .0); c.lineTo(.36 * u, .17 * u); c.moveTo(.06 * u, .02 * u); c.lineTo(.33 * u, .06 * u); c.stroke(); }
    VP._muzzle = c.getTransform().transformPoint({ x: .48 * u, y: .14 * u });
    c.restore();
    // forelock
    c.save(); c.strokeStyle = hair.base; c.lineWidth = u * .04; c.lineCap = 'round'; c.beginPath(); c.moveTo(hb[0], hb[1] - .06 * u); c.quadraticCurveTo(hb[0] + .08 * u, hb[1] - .02 * u, hb[0] + .1 * u, hb[1] + .06 * u); c.stroke(); c.restore();
    // saddle cloth and saddle
    if (o.tack) {
      const cl = S.tone(o.tack.cloth || ['#2f6b4a', '#173a28'], Lt);
      cel(S.poly([P(-.08, -.98), P(.3, -1.02), P(.32, -.72), P(-.1, -.72)], false), cl, .5);
      if (o.tack.trim) { c.fillStyle = o.tack.trim; c.fillRect(-.1 * u, -.755 * u + bob, .42 * u, .03 * u); }
      cel(S.poly([P(-.04, -.98), P(0, -1.07), P(.12, -1.01), P(.22, -1.02), P(.27, -1.09), P(.29, -.97)]), S.tone(['#5a3420', '#2a160c'], Lt), .4);
      if (o.tack.reins && !gz) { c.strokeStyle = '#2a1a10'; c.lineWidth = u * .014; c.beginPath(); const m = c.getTransform().inverse().transformPoint(VP._muzzle); c.moveTo(m.x - .06 * u, m.y - .02 * u); c.quadraticCurveTo(.4 * u, -1.0 * u, (o.tack.handX ?? .2) * u, (o.tack.handY ?? -1.25) * u); c.stroke(); }
    }
    const seat = c.getTransform().transformPoint({ x: .13 * u, y: -1.03 * u + bob });
    c.restore();
    const inv = c.getTransform().inverse();
    return { seat: inv.transformPoint(seat), muzzle: inv.transformPoint(VP._muzzle) };
  };
  // A rider on a horse: the body from cast.js with its legs hidden, plus the near leg over the barrel.
  // u = rider unit (person scale), h = horse withers height (about 5u).
  VP.rider = (c, ch, x, y, u, h, ho = {}, po = {}, f = {}, Lt = S.LIGHT.golden) => {
    const face = ho.face ?? 1, r = VP.horse(c, x, y, h, ho, Lt), sx = r.seat.x, sy = r.seat.y + .1 * u;
    const pose = Object.assign({ face, sitY: 0, hideLegs: true, lean: 2, shN: 18, elN: 70, shF: 12, elF: 60 }, po);
    S.person(c, ch, sx, sy, u, pose, f, Lt);
    // near leg: thigh forward over the barrel, shin down, foot in the stirrup
    const lt2 = Object.assign({}, Lt, { L: [Lt.L[0] * face, Lt.L[1]] });
    const tn = S.tone(ch.pants || ['#e8dcc2', '#a89a7c'], lt2), boot = S.tone(ch.shoes || ['#3b2116', '#1e100a'], lt2);
    c.save(); c.translate(sx, sy); c.scale(face, 1);
    const hip = [.05 * u, -.1 * u], kn = [.95 * u, .55 * u], ft = [.65 * u, 2.0 * u];
    const pts = S.joint(hip, kn, ft, 18, .3);
    S.cel(c, S.tube(pts, q => u * K.lerp(.7, .36, q)), { base: tn.base, shade: tn.shade, rim: tn.rim, L: lt2.L, sw: u * .12, rw: Math.max(1.2, u * .03), ink: S.inkOf(tn), lw: Math.max(1, u * .017) });
    S.cel(c, S.poly([[ft[0] - .25 * u, ft[1] - .1 * u], [ft[0] + .4 * u, ft[1] - .05 * u], [ft[0] + .42 * u, ft[1] + .14 * u], [ft[0] - .22 * u, ft[1] + .16 * u]]), { base: boot.base, shade: boot.shade, rim: boot.rim, L: lt2.L, sw: u * .06, rw: 1.2, ink: S.inkOf(boot), lw: Math.max(1, u * .017) });
    c.strokeStyle = '#2a1a10'; c.lineWidth = u * .04; c.beginPath(); c.moveTo(ft[0] - .2 * u, ft[1] + .2 * u); c.lineTo(ft[0] + .3 * u, ft[1] + .2 * u); c.stroke();
    c.restore();
    return r;
  };

  // ---------- shot builder ----------
  // window.SHOTS[i] = { set, cam, draw(c, lt, u, S, cam) in stage coords, over(c, lt, u, S) in screen coords,
  //                     sfx:[[t|phrase, name, gain]], bed, sub, init(S), xfade, inSfx }
  VP.beds = [];
  VP.at = (S, phrase, dflt = 0) => { const t = K.W(phrase, S.vo_start - .05); return t == null || t > S.end ? dflt : t - S.start; };
  VP.build = () => {
    const T = G.TIMING, SHOTS = G.SHOTS; K.setWords(T.words);
    T.shots.forEach((Sh, i) => {
      const Dd = SHOTS[i] || {}; Sh.D = Dd; Sh.vo_start = Sh.vo_start ?? Sh.start; if (Dd.init) Dd.init(Sh);
      const sc = K.scene('s' + (i + 1), Sh.start, Sh.end, (c, lt, t, u) => {
        const set = Dd.set ? VP.sets[Dd.set] : null;
        const cam = typeof Dd.cam === 'function' ? VP.cam(c, Dd.cam(lt, u, Sh), 0, set?.w ?? SW, set?.h ?? SH, lt) : VP.cam(c, Dd.cam || {}, Dd.camU ? Dd.camU(lt, u, Sh) : u, set?.w ?? SW, set?.h ?? SH, lt);
        if (Dd.set) VP.drawSet(c, Dd.set);
        if (Dd.draw) { c.save(); Dd.draw(c, lt, u, Sh, cam); c.restore(); }
        K.screen(c);
        for (const L of Dd.over || []) { c.save(); L(c, lt, u, Sh); c.restore(); }
      }, { whoosh: false, xfade: Dd.xfade });
      if (Dd.inSfx !== false && i > 0) K.cue(Sh.start + .1, Dd.inSfx || 'whoosh_soft', .45);
      for (const [when, name, gain] of Dd.sfx || []) { const tt = typeof when === 'string' ? VP.at(Sh, when, 0) : when; K.cue(Sh.start + tt, name, gain ?? 1); }
      if (Dd.bed) { const list = Array.isArray(Dd.bed[0]) ? Dd.bed : [Dd.bed]; for (const [n, g] of list) VP.beds.push({ start: Sh.start, end: Sh.end + .8, name: n, gain: g ?? 1 }); }
      if (Dd.sub) K.SUBPOS[sc.id] = Dd.sub;
    });
    K.dur = T.dur; G.KIT_BEDS = VP.beds;
  };
  G.VP = VP;
})(window);
