// Village painterly style: mockup scenes. Each scene: { dur, init(), draw(c, t) }.
(function (G) {
  const S = G.S, D = S.D, W = S.W, H = S.H;
  const SC = S.SCENES = {};
  const lerp = S.lerp, ss = S.ss, seg = S.seg;

  // keyframes: list of [time, {params}], smooth between neighbours, numbers only
  S.keys = (t, K) => {
    if (t <= K[0][0]) return Object.assign({}, K[0][1]);
    for (let i = 0; i < K.length - 1; i++) {
      const [t0, a] = K[i], [t1, b] = K[i + 1];
      if (t <= t1) {
        const u = ss((t - t0) / (t1 - t0)), o = {};
        for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
          const va = a[k] ?? 0, vb = b[k] ?? 0;
          o[k] = Array.isArray(va) || Array.isArray(vb) ? [lerp((va || [0, 0])[0], (vb || [0, 0])[0], u), lerp((va || [0, 0])[1], (vb || [0, 0])[1], u)] : lerp(va, vb, u);
        }
        return o;
      }
    }
    return Object.assign({}, K[K.length - 1][1]);
  };

  // ---------- background props ----------
  const palm = (g, x, y, h, lean, col, rim, seed, detail = 1) => {
    const r = S.rng(seed);
    const top = [x + lean * h, y - h];
    const mid = [x + lean * h * .35 + h * .05, y - h * .5];
    const trunk = S.tube(S.bez([x, y], mid, top, 18, .6), [h * .045, h * .028]);
    g.fillStyle = col; g.fill(trunk);
    if (detail) { g.save(); g.clip(trunk); g.strokeStyle = S.rgba(rim, .5); g.lineWidth = 1.2; for (let i = 0; i < 18; i++) { const p = S.bez([x, y], mid, top, 18, .6)[i]; g.beginPath(); g.moveTo(p[0] - h * .03, p[1]); g.lineTo(p[0] + h * .03, p[1] - 3); g.stroke(); } g.restore(); }
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = (-170 + i * (340 / (n - 1)) + (r() - .5) * 20) * D, len = h * (.38 + r() * .14);
      const droop = h * (.16 + r() * .12);
      const end = [top[0] + Math.cos(a) * len, top[1] + Math.sin(a) * len * .55 + droop];
      const ctrl = [top[0] + Math.cos(a) * len * .5, top[1] + Math.sin(a) * len * .5 - h * .08];
      const pts = S.bez(top, ctrl, end, 14, .4);
      g.fillStyle = col; g.fill(S.tube(pts, q => h * .03 * Math.sin(Math.PI * (.1 + q * .85))));
      // leaflets hang under gravity: long thin blades that droop from the rib
      g.fillStyle = col;
      for (let j = 1; j < pts.length; j++) {
        for (let m = 0; m < 3; m++) {
          const k = j - 1 + m / 3, i0 = Math.floor(k), fr = k - i0, p = [lerp(pts[i0][0], pts[i0 + 1][0], fr), lerp(pts[i0][1], pts[i0 + 1][1], fr)];
          const q = pts[i0 + 1], tx = q[0] - pts[i0][0], ty = q[1] - pts[i0][1], l = Math.hypot(tx, ty) || 1;
          const L = h * (.13 - .07 * k / pts.length) * (.8 + r() * .4);
          for (const sgn of [-1, 1]) {
            const vx = -ty / l * sgn * .45 + tx / l * .35, vy = tx / l * sgn * .45 + ty / l * .35 + .75;
            const e = [p[0] + vx * L, p[1] + vy * L], w = Math.max(.8, h * .006);
            g.beginPath(); g.moveTo(p[0] - w * ty / l, p[1] + w * tx / l); g.quadraticCurveTo(p[0] + vx * L * .5 + w, p[1] + vy * L * .4, e[0], e[1]); g.quadraticCurveTo(p[0] + vx * L * .5 - w, p[1] + vy * L * .5, p[0] + w * ty / l, p[1] - w * tx / l); g.fill();
          }
        }
      }
      if (detail) { g.strokeStyle = S.rgba(rim, .55); g.lineWidth = 1.5; g.beginPath(); pts.forEach((p, k) => k ? g.lineTo(p[0], p[1] - 1) : g.moveTo(p[0], p[1] - 1)); g.stroke(); }
    }
  };
  const hut = (g, x, y, w, h, P, seed) => {
    // P: {wall, wallSh, roof, roofSh, straw:[..], dark, rim}
    const r = S.rng(seed), wh = h * .55, rx = w * .14;
    // walls
    const wall = S.poly([[x, y], [x, y - wh], [x + w, y - wh], [x + w, y]], false);
    g.fillStyle = P.wall; g.fill(wall);
    g.save(); g.clip(wall);
    S.dabs(g, { x, y: y - wh, w, h: wh, n: 60, cols: [P.wallSh, P.wall, P.rim], r0: w * .03, r1: w * .09, a0: .08, a1: .25, seed });
    g.fillStyle = S.rgba(P.wallSh, .7); g.fillRect(x + w * .62, y - wh, w * .38, wh); // side wall in shadow
    g.fillStyle = S.rgba('#000000', .25); g.fillRect(x, y - wh, w, wh * .22); // eave shadow
    g.fillStyle = P.dark; g.fillRect(x + w * .2, y - wh * .68, w * .16, wh * .68); // door
    g.fillRect(x + w * .44, y - wh * .66, w * .1, wh * .2);
    g.restore();
    // roof
    const roof = S.poly([[x - rx, y - wh + h * .04], [x + w * .25, y - h], [x + w * .78, y - h * 1.02], [x + w + rx, y - wh + h * .02], [x + w * .5, y - wh - h * .02]], false);
    g.fillStyle = P.roof; g.fill(roof);
    g.save(); g.clip(roof);
    S.strokes(g, { x: x - rx, y: y - h * 1.05, w: w + rx * 2, h: h * .5, n: 260, cols: P.straw, l0: h * .1, l1: h * .25, ang: 1.45, jit: .5, w0: 1, w1: 2.6, a0: .35, a1: .8, seed: seed + 1 });
    const gr = g.createLinearGradient(0, y - h, 0, y - wh); gr.addColorStop(0, S.rgba(P.rim, .25)); gr.addColorStop(1, S.rgba(P.roofSh, .45)); g.fillStyle = gr; g.fill(roof);
    g.restore();
    // ragged eave
    g.strokeStyle = P.roofSh; g.lineWidth = 2;
    for (let i = 0; i < 40; i++) { const px = x - rx + (w + rx * 2) * i / 40; g.beginPath(); g.moveTo(px, y - wh + h * .02); g.lineTo(px + (r() - .5) * 4, y - wh + h * (.05 + r() * .05)); g.stroke(); }
    g.strokeStyle = S.rgba(P.rim, .8); g.lineWidth = 2.2; g.beginPath(); g.moveTo(x + w * .25, y - h); g.lineTo(x + w * .78, y - h * 1.02); g.stroke();
  };
  const hay = (g, x, y, w, h, cols, seed) => {
    const p = new Path2D(); p.moveTo(x - w / 2, y); p.bezierCurveTo(x - w * .5, y - h * .8, x - w * .2, y - h, x, y - h); p.bezierCurveTo(x + w * .25, y - h, x + w * .5, y - h * .7, x + w / 2, y); p.closePath();
    g.fillStyle = cols[0]; g.fill(p); g.save(); g.clip(p);
    S.strokes(g, { x: x - w / 2, y: y - h, w, h, n: 120, cols, l0: h * .15, l1: h * .35, ang: 1.6, jit: .9, w0: 1, w1: 2.4, a0: .3, a1: .7, seed });
    g.fillStyle = S.rgba('#5a3410', .35); g.fillRect(x, y - h, w / 2, h); g.restore();
  };

  // ======================================================================
  // 1. GOLDEN HOUR RUN  (refs 8 and 9)
  // ======================================================================
  SC.run = {
    dur: 8,
    init() {
      if (this.sky) return;
      const PW = this.PW = 2560;
      this.sky = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, 0, H);
        gr.addColorStop(0, '#93c2b6'); gr.addColorStop(.32, '#cdd8a4'); gr.addColorStop(.55, '#f2d48c'); gr.addColorStop(.72, '#f5bf70'); gr.addColorStop(1, '#e3a25a');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: -100, y: 10, w: W + 200, h: 330, n: 260, cols: ['#fff3cf', '#f9dc9a', '#bcd8c4', '#f6c98a'], r0: 40, r1: 140, sq: .16, ang: -.1, jit: .15, a0: .05, a1: .17, seed: 11 });
        S.glow(g, 330, 210, 420, '#fff0c0', .55);
        S.glow(g, 330, 210, 120, '#fffbe8', .9);
        g.fillStyle = '#fffdf2'; g.beginPath(); g.arc(330, 210, 34, 0, S.TAU); g.fill();
      });
      const far = this.far = S.off(PW, H, g => {
        // three hazy ranges of hills, lighter (more haze) the further they are
        const ranges = [[360, '#e2bd7c', 60, 3], [400, '#cfae6a', 70, 5], [440, '#b99f5f', 50, 9]];
        for (const [y0, col, amp, sd] of ranges) {
          g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
          for (let x = 0; x <= PW; x += 16) g.lineTo(x, y0 - amp * S.fbm(x / 260 + (x >= PW ? 0 : 0), sd) - 20 * Math.sin(x / PW * S.TAU * 3));
          g.lineTo(PW, H); g.closePath(); g.fill();
          S.dabs(g, { x: 0, y: y0 - amp - 20, w: PW, h: amp + 60, n: 300, cols: [S.mix(col, '#fff0c8', .25), S.mix(col, '#8a7a48', .15)], r0: 14, r1: 40, sq: .6, a0: .1, a1: .3, seed: sd + 20, mask: (x, y) => y > y0 - amp * S.fbm(x / 260, sd) - 20 * Math.sin(x / PW * S.TAU * 3) });
        }
        for (let i = 0; i < 16; i++) { const x = 60 + i * 160 + (i % 3) * 30; palm(g, x, 455 + (i % 2) * 8, 150 + (i % 4) * 25, (i % 2 ? .12 : -.08), S.rgba('#9a8a52', .75), '#f0d8a0', 100 + i, 0); }
      });
      const mid = this.mid = S.off(PW, H, g => {
        // tree line and palms with backlit edges
        g.fillStyle = '#8f8a4c';
        g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= PW; x += 12) g.lineTo(x, 520 - 40 * S.fbm(x / 90, 31)); g.lineTo(PW, H); g.closePath(); g.fill();
        S.dabs(g, { x: 0, y: 450, w: PW, h: 120, n: 600, cols: ['#a49a55', '#7a7740', '#c9b56e', '#6f6e3a'], r0: 8, r1: 26, sq: .7, a0: .25, a1: .6, seed: 33, mask: (x, y) => y > 512 - 40 * S.fbm(x / 90, 31) });
        const P = { wall: '#d6b98d', wallSh: '#a3845e', roof: '#c79a4a', roofSh: '#7a5524', straw: ['#e8c174', '#b88a3e', '#f3d792', '#8f6630'], dark: '#4a3424', rim: '#ffe2a8' };
        hut(g, 420, 560, 260, 200, P, 41); hut(g, 1500, 556, 200, 160, P, 43); hut(g, 2150, 562, 240, 190, P, 47);
        hay(g, 860, 566, 150, 90, ['#d9a94e', '#b68336', '#f0cc7a'], 51); hay(g, 1260, 568, 110, 70, ['#d9a94e', '#b68336', '#f0cc7a'], 53); hay(g, 1900, 566, 140, 80, ['#d9a94e', '#b68336', '#f0cc7a'], 57);
        for (const [x, h, l] of [[250, 330, .1], [760, 300, -.12], [1080, 360, .06], [1700, 320, -.08], [2400, 340, .1]]) palm(g, x, 540, h, l, '#6d6838', '#ffe0a0', x, 1);
      });
      const ground = this.ground = S.off(PW, H, g => {
        const gr = g.createLinearGradient(0, 540, 0, H); gr.addColorStop(0, '#d8a548'); gr.addColorStop(1, '#b8812f');
        g.fillStyle = gr; g.fillRect(0, 540, PW, H - 540);
        S.strokes(g, { x: 0, y: 545, w: PW, h: 90, n: 2200, cols: ['#f1cf7c', '#c08a35', '#e7b65a', '#9a6a26'], l0: 8, l1: 22, ang: -1.5, jit: .5, w0: 1, w1: 2, a0: .3, a1: .7, seed: 61 });
        // dirt path
        g.fillStyle = '#e4b673'; g.beginPath(); g.moveTo(0, 612); for (let x = 0; x <= PW; x += 20) g.lineTo(x, 610 + 6 * Math.sin(x / PW * S.TAU * 2)); g.lineTo(PW, 700); for (let x = PW; x >= 0; x -= 20) g.lineTo(x, 700 + 5 * Math.sin(x / PW * S.TAU * 3)); g.closePath(); g.fill();
        S.dabs(g, { x: 0, y: 615, w: PW, h: 80, n: 500, cols: ['#f2cf92', '#c99a5c', '#ebc283', '#b5844a'], r0: 6, r1: 22, sq: .35, a0: .15, a1: .4, seed: 63 });
        S.strokes(g, { x: 0, y: 696, w: PW, h: 24, n: 1500, cols: ['#e3b04e', '#a9762a', '#f3d48a'], l0: 10, l1: 30, ang: -1.5, jit: .6, w0: 1.2, w1: 2.6, a0: .5, a1: .9, seed: 65 });
      });
      this.cloud = S.off(PW, 300, g => S.dabs(g, { x: 0, y: 30, w: PW, h: 200, n: 120, cols: ['#fff6da', '#fbe2a8'], r0: 50, r1: 160, sq: .14, ang: -.06, jit: .1, a0: .05, a1: .12, seed: 71 }));
    },
    draw(c, t) {
      this.init();
      const PW = this.PW, wrap = (img, speed, y = 0) => { const o = ((t * speed) % PW + PW) % PW; c.drawImage(img, -o, y); c.drawImage(img, PW - o, y); };
      c.save();
      const camX = (S.fbm(t * .4, 3) - .5) * 6, camY = (S.fbm(t * .4, 9) - .5) * 4;
      c.translate(camX, camY); c.translate(-10, -6); c.scale(1.016, 1.016);
      c.drawImage(this.sky, 0, 0);
      wrap(this.cloud, 5);
      // god rays from the sun
      for (let i = 0; i < 5; i++) S.beam(c, 330, 210, 330 + 1100 * Math.cos((18 + i * 9) * D), 210 + 1100 * Math.sin((18 + i * 9) * D), 8, 60 + i * 12, '#fff2c4', .1 + .05 * Math.sin(t * .8 + i));
      wrap(this.far, 12); wrap(this.mid, 48); wrap(this.ground, 160);
      // birds
      for (let i = 0; i < 4; i++) {
        const bx = ((140 + i * 230 + t * (36 + i * 6)) % 1500) - 100, by = 120 + i * 26 + Math.sin(t * 1.3 + i) * 8, fl = Math.sin(t * 9 + i * 2);
        c.strokeStyle = S.rgba('#5a4a3a', .7); c.lineWidth = 2; c.lineCap = 'round';
        c.beginPath(); c.moveTo(bx - 9, by - 4 * fl); c.quadraticCurveTo(bx - 4, by - 3, bx, by); c.quadraticCurveTo(bx + 4, by - 3, bx + 9, by - 4 * fl); c.stroke();
      }
      // character
      const ch = S.CAST.boy, u = 104, X = 560, GY = 688;
      const p = (t * 1.5) % 1;
      const pose = S.run(p, 1);
      const sh = Math.abs(Math.cos(p * S.TAU * 2));
      // long shadow falls forward and right (sun behind, upper left)
      c.save(); c.globalAlpha = .28; c.fillStyle = '#6a3a18'; c.beginPath(); c.ellipse(X + 90, GY + 4, 160 - sh * 16, 13, 0, 0, S.TAU); c.fill(); c.restore();
      // dust puffs from each foot strike
      for (let k = 0; k < 6; k++) {
        const tk = Math.floor(t * 3 - k) / 3, age = t - tk; if (age < 0 || age > 1.6) continue;
        const dx = X - 10 - age * 160, rr = 10 + age * 26;
        c.save(); c.globalAlpha = .28 * (1 - age / 1.6); c.fillStyle = '#f4d7a0'; S.blob(c, dx, GY - 6 - age * 14, rr, .55, 0, S.rng(Math.floor(tk * 3) + 5)); c.restore();
      }
      const paperHold = (wr, a2) => {
        c.save(); c.translate(wr[0], wr[1]); c.rotate(-a2 + Math.PI / 2 + .3 + Math.sin(t * 9) * .08);
        const flap = Math.sin(t * 11) * 3;
        const pp = S.poly([[2, -12], [34, -16 + flap], [38, 10 + flap], [4, 14]], false);
        S.cel(c, pp, { base: '#f6f1e2', shade: '#c9c3ae', rim: '#ffffff', L: [-1, -.4], sw: 6, rw: 2, ink: '#6a5a48', lw: 1.2 });
        c.strokeStyle = 'rgba(90,80,70,.5)'; c.lineWidth = 1; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(9, -6 + i * 6); c.lineTo(30, -8 + i * 6 + flap * .5); c.stroke(); }
        c.restore();
      };
      const blink = S.blinkAt(t, 2);
      S.person(c, ch, X, GY, u, Object.assign(pose, { holdN: paperHold }), { blink, smile: .75, open: .45 + .1 * Math.sin(p * S.TAU * 2), look: [.5, -.1], raise: .3, turn: -.15, time: t }, S.LIGHT.golden);
      // foreground grass, fastest layer, sways
      const r = S.rng(81), o = (t * 240) % PW;
      c.lineCap = 'round';
      for (let i = 0; i < 700; i++) {
        let x = r() * PW - o; if (x < -40) x += PW; const y = 705 + r() * 40, h = 30 + r() * 80, ci = Math.floor(r() * 5), lw = 2 + r() * 3; if (x > W + 40) continue;
        const col = ['#d7a040', '#b07526', '#f2cf7a', '#8f5f20', '#c48a34'][ci], sway = Math.sin(t * 2.2 + x * .02) * 8 + 10;
        c.fillStyle = col; c.beginPath(); c.moveTo(x - lw, y); c.quadraticCurveTo(x + sway * .3, y - h * .5, x + sway, y - h); c.quadraticCurveTo(x + sway * .3 + lw * .3, y - h * .5, x + lw, y); c.fill();
      }
      // dark foliage framing the bottom corners (near the lens, out of focus)
      const leaf = (x0, y0, sgn, sd) => {
        const rr = S.rng(sd); c.save(); c.filter = 'blur(2px)';
        for (let i = 0; i < 9; i++) {
          const a = (-90 + sgn * (10 + i * 12) + Math.sin(t * 1.4 + i) * 3) * D, len = 120 + rr() * 90, b = [x0 + Math.cos(a) * len, y0 + Math.sin(a) * len];
          const p = S.tube(S.bez([x0, y0], [x0 + Math.cos(a) * len * .5 + sgn * 20, y0 + Math.sin(a) * len * .5 - 10], b, 12, .5), q => 34 * Math.sin(Math.PI * (.08 + q * .9)));
          S.cel(c, p, { base: i % 2 ? '#3f5a2a' : '#4d6a30', shade: '#26391b', rim: '#c9b45a', L: [-1, -.4], sw: 10, rw: 2.5, ink: false });
        }
        c.restore();
      };
      leaf(-20, H + 20, 1, 3); leaf(W + 20, H + 30, -1, 4);
      // floating dust in the light
      const dr = S.rng(91);
      for (let i = 0; i < 40; i++) { const x = (dr() * W + t * (8 + dr() * 10)) % W, y = 150 + dr() * 450 + Math.sin(t * .8 + i) * 12; c.fillStyle = S.rgba('#fff4d0', .25 + .35 * Math.sin(t * 1.5 + i) ** 2); c.beginPath(); c.arc(x, y, 1 + dr() * 2, 0, S.TAU); c.fill(); }
      c.restore();
      S.grade(c, '#ffb347', .22); S.vignette(c, .35, '#3a1a06'); S.grain(c, .08);
    }
  };

  // ======================================================================
  // 2. MOONLIT ROOM  (ref 4: father awake at night, cool window light)
  // ======================================================================
  SC.moon = {
    dur: 8,
    init() {
      if (this.bg) return;
      this.bg = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#22384a'); gr.addColorStop(.6, '#2f4c60'); gr.addColorStop(1, '#1b2c3a');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 0, w: W, h: H, n: 700, cols: ['#3d5f75', '#2a4456', '#4a6e80', '#1f3444', '#36586a'], r0: 20, r1: 70, sq: .5, a0: .06, a1: .2, seed: 201 });
        // window: outside night with moonlit leaves
        const wx = 880, wy = 70, ww = 300, wh = 400;
        g.fillStyle = '#1d3c4a'; g.fillRect(wx, wy, ww, wh);
        S.glow(g, wx + 220, wy + 60, 260, '#bfe3f0', .55);
        S.dabs(g, { x: wx - 20, y: wy, w: ww + 40, h: wh, n: 260, cols: ['#2d5b5e', '#3f7470', '#1d4044', '#5d9a92'], r0: 10, r1: 30, sq: .55, a0: .5, a1: .9, seed: 203, mask: (x, y) => x > wx && x < wx + ww && y > wy && y < wy + wh && (S.noise(x / 50, 2) + S.noise(y / 50, 5)) > .8 });
        S.dabs(g, { x: wx, y: wy, w: ww, h: wh, n: 90, cols: ['#a8dcd4', '#c9efe6'], r0: 4, r1: 10, sq: .5, a0: .4, a1: .8, seed: 205, mask: (x, y) => (S.noise(x / 50, 2) + S.noise(y / 50, 5)) > .9 });
        // frame and bars
        g.fillStyle = '#3a2a22'; [[wx - 18, wy - 18, ww + 36, 22], [wx - 18, wy + wh - 4, ww + 36, 26], [wx - 18, wy - 18, 22, wh + 40], [wx + ww - 4, wy - 18, 22, wh + 40], [wx + ww / 2 - 7, wy, 14, wh]].forEach(r => g.fillRect(...r));
        g.fillStyle = '#6f8fa0'; [[wx - 18, wy - 18, ww + 36, 3], [wx + ww / 2 - 7, wy, 3, wh]].forEach(r => g.fillRect(...r));
        for (let i = 1; i < 4; i++) { g.fillStyle = '#2e2019'; g.fillRect(wx, wy + i * wh / 4 - 4, ww, 8); }
        // curtain on the left of the window
        const cur = new Path2D(); cur.moveTo(wx - 70, 40); cur.bezierCurveTo(wx - 30, 200, wx - 90, 380, wx - 40, 560); cur.lineTo(wx - 140, 560); cur.bezierCurveTo(wx - 170, 380, wx - 110, 200, wx - 150, 40); cur.closePath();
        S.cel(g, cur, { base: '#557587', shade: '#2c4555', rim: '#a9d0e2', L: [1, -.2], sw: 40, rw: 4, ink: '#1a2a34', lw: 1.5 });
        g.strokeStyle = 'rgba(30,50,62,.6)'; g.lineWidth = 6; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(wx - 130 + i * 30, 50); g.bezierCurveTo(wx - 100 + i * 25, 220, wx - 140 + i * 30, 380, wx - 110 + i * 30, 550); g.stroke(); }
        // shelf with a small clay lamp, left
        g.fillStyle = '#3a2a22'; g.fillRect(70, 300, 200, 14);
        const pot = S.ell(130, 285, 26, 18); S.cel(g, pot, { base: '#8a5536', shade: '#4a2a1c', rim: '#e0a070', L: [1, -.5], sw: 10, ink: '#2a160c', lw: 1.5 });
        const jar = S.poly([[200, 300], [192, 262], [205, 245], [230, 245], [242, 262], [236, 300]]); S.cel(g, jar, { base: '#6d5a48', shade: '#3a2c22', rim: '#a8c0c8', L: [1, -.4], sw: 10, ink: '#1e140e', lw: 1.5 });
        // headboard
        const hb = S.poly([[40, 300], [60, 270], [560, 262], [590, 290], [590, 560], [40, 560]], false);
        S.cel(g, hb, { base: '#4f382b', shade: '#2e1f17', rim: '#8fb1c4', L: [1, -.3], sw: 30, rw: 3, ink: '#1a100b', lw: 2 });
        S.strokes(g, { x: 50, y: 280, w: 530, h: 270, n: 140, cols: ['#3e2b20', '#5d4333'], l0: 30, l1: 90, ang: 0, jit: .05, w0: 1, w1: 2, a0: .3, a1: .6, seed: 207, mask: (x, y) => y > 290 });
      });
    },
    draw(c, t) {
      this.init();
      const k = S.keys(t, [
        [0, { look: [-.2, -.6], worry: .3, tilt: -4, turn: -.1, blink: 0 }],
        [1.6, { look: [-.2, -.6], worry: .35, tilt: -4, turn: -.1 }],
        [2.4, { look: [.8, -.2], worry: .4, tilt: -3, turn: -.1 }],
        [3.6, { look: [.9, -.1], worry: .7, tilt: 3, turn: .25, angry: .1 }],
        [5.2, { look: [.9, .1], worry: .75, tilt: 4, turn: .25 }],
        [6.2, { look: [.3, .5], worry: .5, tilt: 0, turn: .05, blink: .85 }],
        [7.2, { look: [-.2, -.5], worry: .35, tilt: -4, turn: -.1, blink: 0 }],
        [8, { look: [-.2, -.6], worry: .3, tilt: -4, turn: -.1, blink: 0 }],
      ]);
      const blink = Math.max(k.blink, S.blinkAt(t, 1) * (t < 5.5 ? 1 : 0));
      const breath = Math.sin(t / 8 * S.TAU * 2) * .5 + .5;
      const zoom = 1 + .04 * ss(t / 8);
      c.save(); c.translate(W * .4, H * .5); c.scale(zoom, zoom); c.translate(-W * .4, -H * .5);
      c.drawImage(this.bg, 0, 0);
      // window light patch on the back wall with swaying leaf shadows
      c.save();
      const patch = S.poly([[560, 120], [800, 90], [820, 470], [590, 520]], false);
      c.clip(patch); c.fillStyle = 'rgba(160,205,225,.18)'; c.fill(patch);
      const lr = S.rng(211);
      for (let i = 0; i < 26; i++) { const x = 560 + lr() * 260 + Math.sin(t * 1.1 + i) * 6, y = 90 + lr() * 420 + Math.cos(t * .9 + i) * 4; c.fillStyle = 'rgba(20,40,52,.35)'; S.blob(c, x, y, 10 + lr() * 18, .6, lr() * 3, lr); }
      for (let i = 1; i < 4; i++) { c.fillStyle = 'rgba(20,36,48,.35)'; c.beginPath(); c.moveTo(560, 120 + i * 100); c.lineTo(820, 90 + i * 95); c.lineTo(820, 100 + i * 95); c.lineTo(560, 132 + i * 100); c.fill(); }
      c.restore();
      // pillow
      const pil = S.poly([[40, 330], [70, 170], [240, 120], [430, 150], [500, 220], [480, 380], [300, 430], [80, 420]]);
      S.cel(c, pil, { base: '#a9bccb', shade: '#5f7787', rim: '#e4f3ff', L: [1, -.3], sw: 40, rw: 4, ink: '#2e3e4a', lw: 1.6, over: c2 => { c2.strokeStyle = 'rgba(70,90,105,.5)'; c2.lineWidth = 3; c2.beginPath(); c2.moveTo(110, 200); c2.quadraticCurveTo(190, 240, 210, 330); c2.stroke(); c2.beginPath(); c2.moveTo(420, 180); c2.quadraticCurveTo(410, 250, 460, 330); c2.stroke(); } });
      // the father, half sitting against the pillow; blanket goes over his body, his arm rests on top
      const ch = S.CAST.father, u = 175;
      const blanket = c2 => {
        const by = 470 - breath * 7;
        const bl = new Path2D(); bl.moveTo(-40, by - 20); bl.bezierCurveTo(150, by - 70, 330, by - 40, 470, by - 10 - breath * 4); bl.bezierCurveTo(700, by + 40, 900, by + 50, 1320, by + 60); bl.lineTo(1320, 760); bl.lineTo(-40, 760); bl.closePath();
        bl.bb = [-40, by - 60, 1320, 760];
        S.cel(c2, bl, { base: '#6f93a6', shade: '#34505f', rim: '#d5ecf7', L: [1, -.5], sw: 30, rw: 5, ink: '#1c2c36', lw: 2, over: c3 => {
          c3.strokeStyle = 'rgba(30,50,62,.55)'; c3.lineWidth = 8; c3.lineCap = 'round';
          [[300, by + 40, 420, by + 140], [620, by - 10, 560, by + 140], [820, by - 20, 900, by + 150], [1050, by, 1000, by + 160]].forEach(([a, b, cc, d]) => { c3.beginPath(); c3.moveTo(a, b); c3.quadraticCurveTo((a + cc) / 2 + 30, (b + d) / 2, cc, d); c3.stroke(); });
          c3.strokeStyle = 'rgba(210,235,248,.35)'; c3.lineWidth = 4; [[640, by - 20, 590, by + 120], [840, by - 30, 930, by + 130]].forEach(([a, b, cc, d]) => { c3.beginPath(); c3.moveTo(a, b); c3.quadraticCurveTo((a + cc) / 2 + 30, (b + d) / 2, cc, d); c3.stroke(); });
        } });
      };
      S.person(c, ch, 440, 640, u, {
        sitY: breath * .02, lean: -32, tilt: k.tilt + 26, hipN: 85, hipF: 85, kneeN: 5, kneeF: 5, hideLegs: 1,
        shN: 62 + breath * 2, elN: 55, shF: 40, elF: 40, beforeNear: blanket,
      }, { blink, look: k.look, worry: k.worry, angry: k.angry || 0, turn: k.turn, smile: -.25, time: t }, Object.assign({}, S.LIGHT.moon, { rw: .05, tint: '#b8d4e6', tintA: .25 }));
      // moon beam with drifting dust
      S.beam(c, 1010, 80, 420, 640, 120, 330, '#bfe2f2', .16);
      const dr = S.rng(221);
      for (let i = 0; i < 50; i++) {
        const u0 = (dr() + t * (.01 + dr() * .015)) % 1, x = lerp(1000, 430, u0) + (dr() - .5) * 360 * u0 + Math.sin(t + i) * 8, y = lerp(90, 640, u0) + Math.cos(t * .7 + i) * 8;
        c.fillStyle = S.rgba('#dff4ff', .15 + .4 * Math.sin(t * 1.3 + i * 2) ** 2); c.beginPath(); c.arc(x, y, .8 + dr() * 1.8, 0, S.TAU); c.fill();
      }
      // lamp flame: tiny warm accent against the cool room
      const fl = .8 + .2 * S.fbm(t * 6, 3);
      S.glow(c, 130, 262, 90 * fl, '#ffb35a', .5);
      c.fillStyle = '#ffe9a8'; c.beginPath(); c.ellipse(130, 266 - 4 * fl, 4, 9 * fl, Math.sin(t * 5) * .1, 0, S.TAU); c.fill();
      c.restore();
      S.grade(c, '#3a6f9c', .25); S.vignette(c, .6, '#05101a'); S.grain(c, .08);
    }
  };

  // ======================================================================
  // 3. FIRELIGHT HUT  (ref 7: boy stirring a pot, flame light, smoke)
  // ======================================================================
  SC.fire = {
    dur: 8,
    init() {
      if (this.bg) return;
      this.sil = document.createElement('canvas'); this.sil.width = W; this.sil.height = H;
      this.bg = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#16302f'); gr.addColorStop(.6, '#2b4d4a'); gr.addColorStop(1, '#203634');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 0, w: W, h: 560, n: 800, cols: ['#3a615c', '#24423f', '#46706a', '#1b3331', '#557f75'], r0: 18, r1: 60, sq: .6, a0: .06, a1: .2, seed: 301 });
        // roof underside: poles and thatch
        g.fillStyle = '#2a1a10'; g.fillRect(0, 0, W, 40);
        S.strokes(g, { x: 0, y: 0, w: W, h: 60, n: 500, cols: ['#4a3018', '#6a4520', '#2a1a0c', '#8a6030'], l0: 20, l1: 50, ang: 1.5, jit: .6, w0: 1, w1: 3, a0: .5, a1: .9, seed: 303 });
        g.fillStyle = '#3a2416'; g.fillRect(0, 40, W, 12); g.fillRect(90, 0, 26, 600); g.fillRect(1170, 0, 26, 600);
        // floor
        const fg = g.createLinearGradient(0, 540, 0, H); fg.addColorStop(0, '#4a3a2a'); fg.addColorStop(1, '#2a2018');
        g.fillStyle = fg; g.fillRect(0, 540, W, H - 540);
        S.dabs(g, { x: 0, y: 540, w: W, h: 180, n: 400, cols: ['#5a4632', '#3a2c20', '#6a5440'], r0: 10, r1: 40, sq: .3, a0: .1, a1: .3, seed: 305 });
        // clay pots along the wall
        const potP = { base: '#8f5a38', shade: '#4a2c1c', rim: '#d89a68', L: [-1, -.2], sw: 22, rw: 3, ink: '#24140c', lw: 1.6 };
        [[180, 545, 70, 60], [250, 555, 46, 40], [990, 548, 80, 70], [1080, 556, 54, 46], [1130, 560, 40, 34]].forEach(([x, y, w, h]) => {
          const p = new Path2D(); p.moveTo(x - w * .3, y - h); p.bezierCurveTo(x - w * .9, y - h * .8, x - w * .9, y, x - w * .3, y); p.lineTo(x + w * .3, y); p.bezierCurveTo(x + w * .9, y, x + w * .9, y - h * .8, x + w * .3, y - h); p.closePath(); p.bb = [x - w, y - h, x + w, y];
          S.cel(g, p, Object.assign({}, potP, { L: [x < 640 ? 1 : -1, -.2] }));
          g.fillStyle = '#2a170e'; g.beginPath(); g.ellipse(x, y - h, w * .3, h * .08, 0, 0, S.TAU); g.fill();
        });
        // stone hearth
        [[455, 560, 34, 22], [530, 562, 36, 22], [490, 568, 40, 18]].forEach(([x, y, w, h], i) => S.cel(g, S.ell(x, y, w, h), { base: '#6a6258', shade: '#2e2a26', rim: '#e0a060', L: [0, -1], sw: 10, ink: '#1a1612', lw: 1.5 }));
      });
    },
    draw(c, t) {
      this.init();
      const fl = .82 + .18 * S.fbm(t * 7, 4), fl2 = .85 + .15 * S.fbm(t * 5 + 3, 8);
      const FX = 492, FY = 556;
      const k = S.keys(t, [
        [0, { look: [.7, .8], smile: .15, turn: 0, tilt: 8, raise: 0 }],
        [4.4, { look: [.7, .8], smile: .2, turn: 0, tilt: 8 }],
        [5.2, { look: [-.4, -.1], smile: .8, turn: -.45, tilt: -2, raise: .5 }],
        [6.8, { look: [-.4, -.1], smile: .85, turn: -.45, tilt: -2, raise: .45 }],
        [7.6, { look: [.7, .8], smile: .15, turn: 0, tilt: 8, raise: 0 }],
        [8, { look: [.7, .8], smile: .15, turn: 0, tilt: 8 }],
      ]);
      const stir = t * 2.4;
      const zoom = 1.0 + .05 * Math.sin(t / 8 * S.TAU);
      c.save(); c.translate(560, 420); c.scale(zoom, zoom); c.translate(-560, -420);
      c.drawImage(this.bg, 0, 0);
      // warm light on wall and floor
      S.glow(c, FX, FY - 40, 560 * fl, '#ff8a2a', .32 * fl);
      S.glow(c, FX, FY, 260 * fl2, '#ffb04a', .3);
      const ch = S.CAST.boy, u = 112, KX = 715, GY = 690;
      const pose = { face: -1, lean: 16, tilt: k.tilt, hipN: 4, hipF: -2, kneeN: 6, kneeF: 4, shN: 58 + 10 * Math.sin(stir), elN: 30 + 14 * Math.cos(stir), shF: 30, elF: 70, bob: .01 * Math.sin(stir * 2) };
      // giant cast shadow of the boy on the back wall, thrown by the low fire
      const g2 = this.sil.getContext('2d'); g2.setTransform(1, 0, 0, 1, 0, 0); g2.clearRect(0, 0, W, H);
      S.FLAGS.flat = 1; S.person(g2, ch, KX, GY, u, Object.assign({}, pose), { look: k.look }, S.LIGHT.fire); S.FLAGS.flat = 0;
      g2.globalCompositeOperation = 'source-in'; g2.fillStyle = '#0b1716'; g2.fillRect(0, 0, W, H); g2.globalCompositeOperation = 'source-over';
      c.save(); c.globalAlpha = .5 * fl; c.translate(KX, GY - 40); c.transform(1.3, 0, -.2, 1.22 + .03 * Math.sin(t * 7), 0, 0); c.translate(-KX + 50 + 5 * Math.sin(t * 6), -GY + 10); c.filter = 'blur(2px)'; c.drawImage(this.sil, 0, 0); c.restore();
      // pot on the fire
      const potP = S.poly([[430, 520], [440, 470], [470, 452], [520, 452], [548, 470], [556, 520], [530, 548], [460, 548]]);
      S.cel(c, potP, { base: '#3a3230', shade: '#151110', rim: '#ff9a40', L: [0, 1], sw: 20, rw: 5, ink: '#0c0806', lw: 1.6 });
      c.fillStyle = '#5a4030'; c.beginPath(); c.ellipse(495, 455, 44, 9, 0, 0, S.TAU); c.fill(); c.fillStyle = '#c99a5a'; c.beginPath(); c.ellipse(495, 456, 38, 6, 0, 0, S.TAU); c.fill();
      // flames
      c.save(); c.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 7; i++) {
        const ox = (i - 3) * 13, hgt = (52 + 26 * S.fbm(t * 4 + i * 1.7, i)) * fl, sway = (S.fbm(t * 3 + i, i + 9) - .5) * 26;
        for (const [col, sc, a] of [['#ff5a1a', 1, .55], ['#ffa63a', .72, .7], ['#fff0a0', .4, .9]]) {
          const w = 16 * sc, h = hgt * sc, bx = FX + ox, by = FY - 2;
          c.fillStyle = S.rgba(col, a); c.beginPath(); c.moveTo(bx - w, by); c.bezierCurveTo(bx - w, by - h * .5, bx + sway * .4, by - h * .7, bx + sway, by - h); c.bezierCurveTo(bx + sway * .3 + w * .3, by - h * .6, bx + w, by - h * .4, bx + w, by); c.closePath(); c.fill();
        }
      }
      c.restore();
      // sparks
      const sr = S.rng(331);
      for (let i = 0; i < 18; i++) { const per = 1.4 + sr() * 1.2, ph = (t / per + sr()) % 1, x = FX + (sr() - .5) * 60 + Math.sin(t * 3 + i) * 14 * ph, y = FY - 30 - ph * 260; c.fillStyle = S.rgba('#ffd27a', (1 - ph) * .9); c.beginPath(); c.arc(x, y, 1.6 * (1 - ph) + .5, 0, S.TAU); c.fill(); }
      // steam from the pot
      c.save(); c.globalCompositeOperation = 'screen';
      for (let i = 0; i < 12; i++) { const per = 3.5, ph = (t / per + i / 12) % 1, x = 495 + Math.sin(ph * 5 + i) * 30 * ph + ph * 40, y = 450 - ph * 330, r = 14 + ph * 60; c.globalAlpha = .16 * Math.sin(Math.PI * ph); c.fillStyle = '#a8c4be'; S.blob(c, x, y, r, .8, ph * 3, S.rng(i + 400)); }
      c.restore();
      // the boy, stirring with a ladle; fire on his face
      const Lt = Object.assign({}, S.LIGHT.fire, { rimA: .7 + .25 * fl, tintA: .14 + .1 * fl });
      const ladle = (wr, a2) => {
        // handle from the fist down into the pot, pointing to a spot that circles
        const tip = [495 + 22 * Math.cos(stir), 462 + 5 * Math.sin(stir)];
        const loc = [(KX - tip[0]), tip[1] - GY]; // into flipped local space
        c.save(); c.strokeStyle = '#2a1a10'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(wr[0], wr[1]); c.lineTo(loc[0], loc[1]); c.stroke();
        c.strokeStyle = '#8a6040'; c.lineWidth = 4; c.beginPath(); c.moveTo(wr[0], wr[1]); c.lineTo(loc[0], loc[1]); c.stroke(); c.restore();
      };
      S.contact(c, KX, GY + 2, 90, .45, '#0a0605');
      S.person(c, ch, KX, GY, u, Object.assign({}, pose, { holdN: ladle }), { look: k.look, smile: k.smile, turn: k.turn, raise: k.raise, blink: S.blinkAt(t, 4), time: t }, Lt);
      c.restore();
      S.grade(c, '#ff9a40', .18 * fl); S.vignette(c, .65, '#050808'); S.grain(c, .09);
    }
  };

  // ======================================================================
  // 4. EXPRESSION CLOSE-UP  (ref 6: mother, worry to tears to relief)
  // ======================================================================
  SC.face = {
    dur: 9,
    init() {
      if (this.bg) return;
      this.bg = S.off(W, H, g => {
        g.fillStyle = '#1f302f'; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 0, w: W, h: H, n: 600, cols: ['#2c4442', '#1a2928', '#3a5552', '#263a38'], r0: 20, r1: 80, sq: .6, a0: .08, a1: .25, seed: 401 });
        // wooden door at the left
        const d = S.poly([[60, 0], [330, 0], [330, H], [60, H]], false);
        S.cel(g, d, { base: '#3a2a20', shade: '#21160f', rim: '#7a5a40', L: [1, 0], sw: 60, rw: 4, ink: '#120a06', lw: 2 });
        g.strokeStyle = 'rgba(15,8,4,.6)'; g.lineWidth = 4; g.strokeRect(95, 60, 200, 260); g.strokeRect(95, 380, 200, 300);
        S.strokes(g, { x: 70, y: 0, w: 250, h: H, n: 200, cols: ['#4a3628', '#2a1c14'], l0: 40, l1: 120, ang: 1.57, jit: .03, w0: 1, w1: 2, a0: .3, a1: .6, seed: 403 });
        // warm doorway light on the right
        const gr = g.createLinearGradient(W, 0, 600, 0); gr.addColorStop(0, 'rgba(255,170,90,.75)'); gr.addColorStop(.5, 'rgba(255,140,60,.25)'); gr.addColorStop(1, 'rgba(255,140,60,0)');
        g.globalCompositeOperation = 'screen'; g.fillStyle = gr; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
        g.strokeStyle = 'rgba(120,60,40,.35)'; g.lineWidth = 2; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(1000 + i * 30, 300 + i * 40); g.quadraticCurveTo(1050 + i * 20, 340 + i * 30, 1030 + i * 25, 420 + i * 30); g.stroke(); }
      });
    },
    draw(c, t) {
      this.init();
      const k = S.keys(t, [
        [0, { worry: .55, smile: -.35, look: [-.3, .5], tilt: 6, tears: .0, streak: 0, squint: 0, raise: 0, blink: 0 }],
        [1.4, { worry: .85, smile: -.5, look: [-.2, .6], tilt: 8, tears: .3 }],
        [2.4, { worry: 1, smile: -.6, look: [.0, .5], tilt: 9, tears: 1, squint: .3, streak: 0 }],
        [2.9, { worry: 1, smile: -.6, look: [.0, .5], tilt: 10, tears: .8, squint: .5, blink: .95, streak: .25 }],
        [4.0, { worry: .95, smile: -.55, look: [.0, .5], tilt: 9, tears: .6, squint: .3, blink: .95, streak: 1 }],
        [4.8, { worry: .6, smile: -.2, look: [.3, .2], tilt: 4, tears: .5, squint: .1, blink: 0, streak: 1 }],
        [6.0, { worry: .35, smile: .45, look: [.6, -.25], tilt: -2, tears: .4, raise: .25, streak: 1 }],
        [7.6, { worry: .3, smile: .55, look: [.6, -.25], tilt: -3, tears: .3, raise: .2, streak: .9 }],
        [8.4, { worry: .5, smile: -.3, look: [-.3, .5], tilt: 6, tears: 0, streak: 0 }],
        [9, { worry: .55, smile: -.35, look: [-.3, .5], tilt: 6, tears: 0, streak: 0 }],
      ]);
      const blink = Math.max(k.blink, t > 5 && t < 8 ? S.blinkAt(t, 3) : 0);
      const breath = Math.sin(t * 1.4) * .5 + .5;
      c.drawImage(this.bg, 0, 0);
      const ch = S.CAST.mother, u = 430;
      S.person(c, ch, 580, 2620 + breath * 5 - (t > 3.8 && t < 4.8 ? 8 * Math.sin((t - 3.8) * Math.PI) : 0), u, { lean: 4, tilt: k.tilt, shN: 6, shF: -2, elN: 10, elF: 10 },
        { worry: k.worry, smile: k.smile, look: k.look, tears: k.tears, streak: k.streak, squint: k.squint, raise: k.raise, blink, time: t, sway: Math.sin(t * 1.2) * .06, turn: -.15 }, S.LIGHT.door);
      // dust in the doorway light
      const dr = S.rng(411);
      for (let i = 0; i < 40; i++) { const x = 760 + dr() * 520 + Math.sin(t * .5 + i) * 20, y = (dr() * H - t * (6 + dr() * 6) + H) % H; c.fillStyle = S.rgba('#ffd9a0', .1 + .35 * Math.sin(t + i) ** 2); c.beginPath(); c.arc(x, y, 1 + dr() * 2, 0, S.TAU); c.fill(); }
      S.grade(c, '#ff9a50', .12); S.vignette(c, .55, '#060a0a'); S.grain(c, .08);
    }
  };

  // ======================================================================
  // TEACHING CANVASES
  // ======================================================================
  const paper = g => {
    g.fillStyle = '#efe2c6'; g.fillRect(0, 0, W, H);
    S.dabs(g, { x: 0, y: 0, w: W, h: H, n: 500, cols: ['#e6d5b2', '#f6ecd6', '#dcc8a2'], r0: 20, r1: 80, sq: .5, a0: .1, a1: .3, seed: 501 });
  };
  const label = (c, txt, x, y, px = 18, col = '#4a3020', align = 'center', font = 'Hind, sans-serif') => { c.save(); c.font = `600 ${px}px ${font}`; c.fillStyle = col; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(txt, x, y); c.restore(); };
  S.label = label;

  // Cast lineup with head-height guides
  SC.cast = {
    dur: 12,
    init() { if (!this.bg) this.bg = S.off(W, H, paper); },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const GY = 630, hu = 86;
      c.save(); c.strokeStyle = 'rgba(90,60,40,.22)'; c.lineWidth = 1; c.setLineDash([6, 6]);
      for (let i = 0; i <= 7; i++) { c.beginPath(); c.moveTo(40, GY - i * hu); c.lineTo(W - 40, GY - i * hu); c.stroke(); if (i) label(c, i + '', 26, GY - i * hu + hu / 2, 14, 'rgba(90,60,40,.6)', 'center', 'IBM Plex Mono, monospace'); }
      c.restore();
      const order = ['boy', 'youth', 'mother', 'father', 'elder'], xs = [150, 380, 640, 900, 1130];
      order.forEach((n, i) => {
        const ch = S.CAST[n], u = hu;
        const idle = S.idle(t, i * 1.7);
        S.contact(c, xs[i], GY + 2, 70, .25);
        S.person(c, ch, xs[i], GY, ch.build === 'kid' ? u * .82 : u, idle, { blink: S.blinkAt(t, i), smile: [.5, .3, .15, .1, .35][i], look: [Math.sin(t * .4 + i) * .4, 0], time: t, sway: Math.sin(t + i) * .04 }, S.LIGHT.studio);
        label(c, ch.name, xs[i], GY + 34, 22, '#3a2416', 'center', 'Yatra One, serif');
        label(c, ch.role, xs[i], GY + 60, 15, '#6a4a34');
      });
    }
  };

  // Expression sheet: the boy in eight moods
  SC.faces = {
    dur: 8,
    init() { if (!this.bg) this.bg = S.off(W, H, paper); },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const E = [
        ['Neutral', {}], ['Happy', { smile: .8, squint: .25, raise: .2 }], ['Laughing', { smile: 1, open: .9, squint: .6, raise: .3, wide: 1 }], ['Surprised', { open: .7, raise: 1, look: [0, -.2] }],
        ['Worried', { worry: 1, smile: -.4, look: [-.4, .3] }], ['Sad, tears', { worry: .8, smile: -.6, look: [-.2, .7], tears: 1, streak: .8, squint: .2 }], ['Angry', { angry: 1, smile: -.5, open: .25, squint: .3 }], ['Thinking', { look: [.6, -.8], smile: -.1, raise: .5, worry: .2 }],
      ];
      E.forEach(([name, f], i) => {
        const cx = 160 + (i % 4) * 320, cy = 175 + Math.floor(i / 4) * 340;
        c.save(); c.translate(cx, cy + Math.sin(t * 1.5 + i) * 2); c.rotate((Math.sin(t * .8 + i) * 2 + (f.tilt || 0)) * D);
        S.head(c, S.CAST.boy, 210, Object.assign({ blink: name === 'Laughing' ? 0 : S.blinkAt(t, i) * (1 - (f.squint || 0)), time: t }, f, { open: (f.open || 0) * (name === 'Laughing' ? .85 + .15 * Math.sin(t * 14) : 1) }), S.LIGHT.studio);
        c.restore();
        label(c, name, cx, cy + 150, 20, '#3a2416', 'center', 'Yatra One, serif');
      });
    }
  };

  // Shading recipe: the same head built up in five passes, under a light that moves
  SC.recipe = {
    dur: 10,
    init() { if (!this.bg) this.bg = S.off(W, H, paper); },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const ang = (-30 + 50 * Math.sin(t / 10 * S.TAU)) * D;
      const Lt = Object.assign({}, S.LIGHT.studio, { L: [Math.cos(ang), Math.sin(ang) - .3], sw: .28, rw: .045, rim: '#ffe2b0', rimA: .7 });
      const steps = [['1  Flat colour', { flat: 1 }], ['2  Shadow side', { noRim: 1, noInk: 1, noVol: 1 }], ['3  Rim light', { noInk: 1, noVol: 1 }], ['4  Thin warm line', { noVol: 1 }], ['5  Volume + grain', {}]];
      steps.forEach(([name, fl], i) => {
        const cx = 135 + i * 252, cy = 330;
        S.FLAGS = fl; c.save(); c.translate(cx, cy); S.head(c, S.CAST.father, 190, { blink: S.blinkAt(t, i), time: t, smile: .1 }, Lt); c.restore(); S.FLAGS = {};
        label(c, name, cx, 500, 19, '#3a2416', 'center', 'Yatra One, serif');
      });
      // light direction dial
      c.save(); c.translate(640, 610); c.strokeStyle = 'rgba(90,60,40,.4)'; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, 40, 0, S.TAU); c.stroke();
      const lx = Lt.L[0], ly = Lt.L[1], n = Math.hypot(lx, ly); c.fillStyle = '#e9a23b'; c.beginPath(); c.arc(lx / n * 40, ly / n * 40, 9, 0, S.TAU); c.fill(); c.restore();
      label(c, 'light moves, the shadow crescent and rim follow it', 640, 680, 16, '#6a4a34');
      c.save(); S.grain(c, .05); c.restore();
    }
  };

  // Motion: run cycle with onion skin and the four key poses
  SC.motion = {
    dur: 4,
    init() { if (!this.bg) this.bg = S.off(W, H, paper); },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const ch = S.CAST.youth, u = 74, GY = 600;
      c.strokeStyle = 'rgba(90,60,40,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(40, GY); c.lineTo(500, GY); c.moveTo(560, GY); c.lineTo(1240, GY); c.stroke();
      const p = (t * .9) % 1;
      for (let j = 3; j >= 1; j--) { c.save(); c.globalAlpha = .12; S.person(c, ch, 260 - j * 26, GY, u, S.run((p - j * .06 + 1) % 1), { smile: .3 }, S.LIGHT.studio); c.restore(); }
      S.person(c, ch, 260, GY, u, S.run(p), { smile: .3, blink: S.blinkAt(t, 1) }, S.LIGHT.studio);
      label(c, 'Run cycle, 0.9 cycles per second', 270, 650, 18, '#3a2416', 'center', 'Yatra One, serif');
      const keysP = [['Contact', .0], ['Down', .12], ['Passing', .25], ['Up', .38]];
      keysP.forEach(([n, ph], i) => { const x = 650 + i * 165; S.person(c, ch, x, GY, u * .9, S.run(ph), { smile: .3 }, S.LIGHT.studio); label(c, n, x + 10, 650, 17, '#3a2416', 'center', 'Yatra One, serif'); });
      label(c, 'knees bend forward only, elbows bend back only, every joint is a soft curve', 900, 690, 15, '#6a4a34');
    }
  };
})(window);
