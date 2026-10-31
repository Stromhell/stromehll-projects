// 2D dynamic line: Spain trilogy style frames in the locked Village Painterly look.
// Uses the village-cast rig (engine.js + cast.js) unchanged; only costumes, headwear and backgrounds are new.
(function (G) {
  const S = G.S, W = S.W, H = S.H, D = S.D, TAU = S.TAU;
  const SC = S.SCENES;
  const tone = S.tone;
  const SK = { olive: { base: '#c08a5e', shade: '#83533a', rim: '#f6c896' }, fair: { base: '#d9a27a', shade: '#9a6248', rim: '#ffd6b0' }, andean: { base: '#a8693f', shade: '#663a24', rim: '#eaa775' } };
  const HR = { black: { base: '#2a1f24', shade: '#120c10', rim: '#7a7486' }, brown: { base: '#4a2e1e', shade: '#24140c', rim: '#9a7a62' }, grey: { base: '#8c8580', shade: '#55504c', rim: '#d8d2cc' } };

  // ---------- headwear (head units; head centre at 0,0, 3/4 view faces +x) ----------
  const P = (pts, u) => S.poly(pts.map(q => [q[0] * u, q[1] * u]));
  const turban = (col, band) => (c, u, f, Lt, k) => {
    const t = k.tone(col, Lt), b = k.tone(band, Lt);
    const sh = k.front ? [[-.66, -.1], [-.74, -.5], [-.5, -.9], [0, -1.0], [.5, -.9], [.74, -.5], [.66, -.1], [.34, -.26], [0, -.3], [-.34, -.26]]
      : [[-.68, .02], [-.72, -.46], [-.42, -.86], [.08, -.94], [.52, -.8], [.68, -.42], [.56, -.08], [.26, -.2], [-.1, -.22], [-.46, -.14]];
    k.celT(c, P(sh, u), t, Lt, u, { swk: .8, over: c2 => {
      c2.lineCap = 'round';
      for (let i = 0; i < 5; i++) { // diagonal wraps
        c2.strokeStyle = S.rgba(t.shade, .55); c2.lineWidth = u * .028;
        c2.beginPath(); c2.moveTo(-.62 * u, (-.42 - i * .13) * u); c2.quadraticCurveTo(0, (-.6 - i * .1) * u, .62 * u, (-.5 - i * .1 + (k.front ? 0 : .05)) * u); c2.stroke();
        c2.strokeStyle = S.rgba(t.rim, .35); c2.lineWidth = u * .012;
        c2.beginPath(); c2.moveTo(-.55 * u, (-.46 - i * .13) * u); c2.quadraticCurveTo(0, (-.64 - i * .1) * u, .55 * u, (-.54 - i * .1) * u); c2.stroke();
      }
    } });
    // jewel band at the front
    const jx = k.front ? 0 : .3;
    k.celT(c, P([[jx - .08, -.4], [jx, -.54], [jx + .08, -.4], [jx, -.3]], u), b, Lt, u, { swk: .4 });
  };
  const morion = (c, u, f, Lt, k) => {
    const st = k.tone({ base: '#9aa3a8', shade: '#4d5559', rim: '#f2f6f8' }, Lt);
    const brim = k.front ? [[-.86, -.26], [-.62, -.36], [0, -.4], [.62, -.36], [.86, -.26], [.72, -.18], [0, -.24], [-.72, -.18]]
      : [[-.9, -.5], [-.64, -.3], [0, -.24], [.54, -.28], [.88, -.52], [.82, -.3], [.42, -.14], [0, -.1], [-.52, -.16], [-.86, -.3]];
    k.celT(c, P(brim, u), st, Lt, u, { swk: .6 });
    k.celT(c, P([[-.56, -.26], [-.54, -.58], [-.26, -.78], [.26, -.78], [.54, -.58], [.56, -.26]], u), st, Lt, u, { swk: .7, over: c2 => {
      c2.fillStyle = S.rgba('#ffffff', .35); c2.beginPath(); c2.ellipse(-.16 * u, -.56 * u, .08 * u, .14 * u, -.3, 0, TAU); c2.fill();
    } });
    k.celT(c, P([[-.44, -.66], [-.3, -.98], [0, -1.1], [.3, -.98], [.44, -.66], [0, -.74]], u), st, Lt, u, { swk: .5 }); // comb (crest)
    c.save(); c.fillStyle = '#c93c2a'; c.beginPath(); c.ellipse(.4 * u, -.86 * u, .06 * u, .2 * u, .6, 0, TAU); c.fill(); c.restore(); // plume
  };
  const beret = col => (c, u, f, Lt, k) => {
    const t = k.tone(col, Lt);
    c.save(); c.translate(0, -.5 * u); c.rotate(k.front ? 0 : -.12);
    k.celT(c, S.poly([[-.66 * u, .06 * u], [-.6 * u, -.14 * u], [-.2 * u, -.26 * u], [.3 * u, -.24 * u], [.66 * u, -.06 * u], [.6 * u, .1 * u], [0, .14 * u]]), t, Lt, u, { swk: .6 });
    c.strokeStyle = S.rgba(t.shade, 1); c.lineWidth = u * .03; c.lineCap = 'round'; c.beginPath(); c.moveTo(.02 * u, -.25 * u); c.lineTo(.04 * u, -.34 * u); c.stroke();
    c.restore();
  };
  const chullo = col => (c, u, f, Lt, k) => { // Andean knit cap with ear flaps
    const t = k.tone(col, Lt);
    const sh = k.front ? [[-.62, -.04], [-.66, -.56], [-.34, -.86], [.34, -.86], [.66, -.56], [.62, -.04], [.54, .3], [.44, -.12], [-.44, -.12], [-.54, .3]]
      : [[-.64, -.1], [-.64, -.6], [-.24, -.9], [.3, -.84], [.6, -.52], [.54, -.22], [-.2, -.2], [-.38, .26], [-.56, .3]];
    k.celT(c, P(sh, u), t, Lt, u, { swk: .7, over: c2 => {
      for (let i = 0; i < 4; i++) { c2.strokeStyle = ['#f2d36b', '#2f6f8f', '#ffffff', '#2f6f8f'][i]; c2.lineWidth = u * .045; c2.beginPath(); c2.moveTo(-.7 * u, (-.24 - i * .1) * u); c2.lineTo(.7 * u, (-.24 - i * .1) * u); c2.stroke(); }
    } });
  };

  // ---------- costumes ----------
  const CH = S.SPAIN = {
    boabdil: { name: 'Boabdil', role: 'Last sultan of Granada', build: 'man', skin: SK.olive, hair: 'neat', hairCol: HR.black, mustache: true, beard: false, shirt: ['#2f6b4a', '#173a28'], pants: ['#e8dcc2', '#a89a7c'], mundu: true, eye: 1, headwear: turban({ base: '#f1ead8', shade: '#a99c82', rim: '#ffffff' }, { base: '#2f8a5a', shade: '#15402a', rim: '#9ef0c0' }) },
    aisha: { name: 'Aisha', role: "Boabdil's mother", build: 'woman', skin: SK.olive, hair: 'bun', hairCol: HR.black, shirt: ['#3c2a3a', '#1e141e'], pants: ['#3c2a3a', '#1e141e'], dupatta: ['#2a1d2c', '#120a14'], long: true, eye: 1 },
    officer: { name: 'Officer', role: 'Spanish mine official', build: 'broad', skin: SK.fair, hair: 'swept', hairCol: HR.brown, mustache: true, shirt: ['#8a2a22', '#4a1410'], pants: ['#3a3430', '#1c1814'], shoes: ['#3b2116', '#1e100a'], eye: .95, headwear: morion },
    miner: { name: 'Miner', role: 'Mita labourer', build: 'man', skin: SK.andean, hair: 'neat', hairCol: HR.black, shirt: ['#8e5a34', '#55321a'], pants: ['#6e5a44', '#3e3020'], bare: true, rolled: true, stoop: 10, eye: 1, headwear: chullo({ base: '#b8322a', shade: '#6a1612', rim: '#ff9a7a' }) },
    farmer: { name: 'Farmer', role: 'Basque farmer', build: 'broad', skin: SK.fair, hair: 'swept', hairCol: HR.grey, mustache: true, shirt: ['#e8e4da', '#a8a294'], pants: ['#2c3440', '#161a22'], shoes: ['#3b2116', '#1e100a'], eye: .95, headwear: beret({ base: '#1f2530', shade: '#0b0e14', rim: '#6a7a90' }) },
    seller: { name: 'Seller', role: 'Market seller', build: 'woman', skin: SK.fair, hair: 'bun', hairCol: HR.brown, shirt: ['#2c3a5a', '#141c30'], pants: ['#3a3a3a', '#1a1a1a'], dupatta: ['#8a2a2a', '#4a1212'], long: true, eye: 1.05 },
    girl: { name: 'Girl', role: 'Market child', build: 'kid', skin: SK.fair, hair: 'curly', hairCol: HR.brown, shirt: ['#e9d9a8', '#b0a070'], pants: ['#a33b2e', '#5e1a12'], eye: 1.25 },
  };

  const crisp = (g, pts) => { g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); };
  const ridge = (g, y0, amp, freq, seed, col, w = W) => { g.fillStyle = col; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= w; x += 8) g.lineTo(x, y0 - amp * S.fbm(x / freq, seed)); g.lineTo(w, H); g.closePath(); g.fill(); };
  const cypress = (g, x, y, h, col, rim) => {
    const r = S.rng(x | 0); g.fillStyle = col;
    g.beginPath(); g.moveTo(x, y - h); g.bezierCurveTo(x + h * .14, y - h * .7, x + h * .12, y - h * .2, x + h * .04, y); g.lineTo(x - h * .04, y); g.bezierCurveTo(x - h * .12, y - h * .2, x - h * .14, y - h * .7, x, y - h); g.fill();
    S.strokes(g, { x: x - h * .1, y: y - h * .95, w: h * .2, h: h * .9, n: 40, cols: [rim, S.mix(col, '#000000', .3)], l0: h * .04, l1: h * .09, ang: -1.2, jit: .8, w0: 1, w1: 2, a0: .2, a1: .5, seed: r() * 999, mask: (px, py) => Math.abs(px - x) < h * .12 * Math.sin(Math.PI * (y - py) / h) });
  };
  const tower = (g, x, y, w, h, wall, sh, rim) => {
    g.fillStyle = wall; g.fillRect(x, y - h, w, h);
    g.fillStyle = sh; g.fillRect(x + w * .62, y - h, w * .38, h);
    for (let i = 0; i < 4; i++) { g.fillStyle = wall; g.fillRect(x + i * w / 4, y - h - w * .1, w / 8, w * .1); }
    g.fillStyle = S.rgba(rim, .55); g.fillRect(x, y - h, w * .1, h);
    g.fillStyle = S.rgba('#2a120a', .5); for (let i = 0; i < 2; i++) g.fillRect(x + w * (.25 + i * .3), y - h * .7, w * .08, h * .14);
  };

  // small painted houses, back to front, each with a lit wall, a shaded side, a tiled roof, windows and a door
  const town = (g, o) => {
    const r = S.rng(o.seed), L = [];
    for (let i = 0; i < o.n; i++) { const x = o.x + r() * o.w, y = o.y + r() * o.h; if (o.mask && !o.mask(x, y)) continue; L.push([x, y, r()]); }
    L.sort((a, b) => a[1] - b[1]);
    for (const [x, y, q] of L) {
      const k = o.scale * (.7 + (y - o.y) / o.h * .6), w = (18 + q * 20) * k, h = (12 + q * 10) * k, d = w * .45;
      const wall = S.mix(o.wall, o.wall2, q), roof = S.mix(o.roof, o.roof2, (q * 7) % 1);
      g.fillStyle = wall; g.fillRect(x, y - h, w, h);
      g.fillStyle = S.mix(wall, o.shade, .55); g.beginPath(); g.moveTo(x + w, y - h); g.lineTo(x + w + d, y - h - d * .25); g.lineTo(x + w + d, y - d * .25); g.lineTo(x + w, y); g.closePath(); g.fill();
      g.fillStyle = roof; g.beginPath(); g.moveTo(x - 2 * k, y - h); g.lineTo(x + d * .6, y - h - d * .7); g.lineTo(x + w + d + 1 * k, y - h - d * .7 - d * .25); g.lineTo(x + w + 2 * k, y - h); g.closePath(); g.fill();
      g.strokeStyle = S.rgba(S.mix(roof, '#000000', .4), .6); g.lineWidth = Math.max(.6, k * .7);
      for (let j = 1; j < 4; j++) { const f = j / 4; g.beginPath(); g.moveTo(x - 2 * k + f * d * .6, y - h - f * d * .7); g.lineTo(x + w + 2 * k + f * (d - 1), y - h - f * (d * .7 + d * .25)); g.stroke(); }
      g.fillStyle = S.rgba(o.rim, .5); g.fillRect(x, y - h, w * .12, h);
      g.fillStyle = o.dark; if (q > .3) g.fillRect(x + w * .2, y - h * .62, w * .14, h * .3); if (q > .55) g.fillRect(x + w * .58, y - h * .62, w * .14, h * .3); g.fillRect(x + w * .4, y - h * .5, w * .16, h * .5);
      g.fillStyle = S.rgba('#000000', .22); g.fillRect(x, y - h, w, h * .14);
    }
  };

  // helpers shared with the act pages (2d-dynamic/shared/vp.js)
  S.SPX = { P, turban, morion, beret, chullo, SK, HR, crisp, ridge, cypress, tower, town };

  // ======================================================================
  // ES1 style frame: the Moor's last sigh. Granada at sunset from a rocky pass.
  // ======================================================================
  SC['es1-sigh'] = {
    dur: 8,
    init() {
      if (this.bg) return;
      this.bg = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#6d5a8e'); gr.addColorStop(.35, '#e08a6a'); gr.addColorStop(.55, '#f6c27a'); gr.addColorStop(1, '#e9a35e');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 40, w: W, h: 260, n: 600, cols: ['#ffd9a8', '#f2a88a', '#b98ab0', '#ffe9c4'], r0: 30, r1: 160, sq: .12, ang: -.05, jit: .1, a0: .03, a1: .1, seed: 3 });
        S.glow(g, 300, 330, 380, '#ffe2a0', .6); S.glow(g, 300, 330, 90, '#fff6dc', .9);
        // Sierra Nevada: jagged snowy far range
        { const top = x => 300 - 150 * Math.pow(S.fbm(x / 130, 5), 1.7) * 1.5 - 18 * Math.abs(Math.sin(x / 47));
          g.fillStyle = '#a98aa8'; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 4) g.lineTo(x, top(x)); g.lineTo(W, H); g.closePath(); g.fill();
          // lit faces on the sun side of each slope
          S.strokes(g, { x: 0, y: 120, w: W, h: 200, n: 700, cols: ['#c8a4bc', '#8a6c8c', '#b494b0'], l0: 10, l1: 30, ang: .5, jit: 1.2, w0: 2, w1: 5, a0: .06, a1: .16, seed: 6, mask: (x, y) => y > top(x) + 4 });
          // snow caps only on the high peaks
          g.fillStyle = '#fbeef2'; g.beginPath();
          for (let x = 0; x <= W; x += 4) { const y = top(x); if (y < 250) { g.moveTo(x, y); g.lineTo(x + 4, top(x + 4)); g.lineTo(x + 4, Math.min(top(x + 4) + (250 - top(x + 4)) * .55, 250)); g.lineTo(x, Math.min(y + (250 - y) * .55, 250)); } }
          g.fill();
          S.strokes(g, { x: 0, y: 120, w: W, h: 140, n: 500, cols: ['#d8bcd0', '#ffffff'], l0: 4, l1: 12, ang: 1.2, jit: .5, w0: 1, w1: 2, a0: .3, a1: .7, seed: 7, mask: (x, y) => top(x) < 250 && y > top(x) && y < Math.min(top(x) + (250 - top(x)) * .55, 250) });
          S.glow(g, 300, 260, 300, '#ffd0c0', .25); }
        ridge(g, 360, 70, 160, 9, '#9a7690');
        // the Alhambra hill
        g.fillStyle = '#8a5a4a'; g.beginPath(); g.moveTo(0, H); g.lineTo(0, 430); g.bezierCurveTo(150, 400, 260, 380, 420, 384); g.bezierCurveTo(560, 388, 700, 420, 820, 470); g.lineTo(820, H); g.closePath(); g.fill();
        S.dabs(g, { x: 0, y: 370, w: 820, h: 140, n: 400, cols: ['#a86a4c', '#6a3e34', '#c8865a', '#5a6a3a'], r0: 6, r1: 20, sq: .6, a0: .2, a1: .5, seed: 11 });
        // walls and towers of the Alhambra glowing red-gold
        const wall = '#c8684a', sh = '#7a3a30', rim = '#ffd2a0';
        g.fillStyle = wall; crisp(g, [[90, 400], [600, 394], [600, 412], [90, 418]]); g.fill();
        for (let i = 0; i < 26; i++) { g.fillStyle = wall; g.fillRect(90 + i * 20, 388, 10, 8); }
        tower(g, 120, 404, 54, 70, wall, sh, rim); tower(g, 250, 400, 40, 48, wall, sh, rim); tower(g, 340, 398, 70, 96, wall, sh, rim);
        tower(g, 470, 398, 46, 56, wall, sh, rim); tower(g, 560, 398, 60, 74, wall, sh, rim);
        S.glow(g, 340, 340, 260, '#ffb070', .35);
        // white city of Granada below
        town(g, { x: 360, y: 450, w: 560, h: 120, n: 150, seed: 51, scale: .8, wall: '#f6e6cc', wall2: '#e8c8a4', shade: '#8a5a5a', roof: '#b8584a', roof2: '#8a3a32', dark: '#4a2a28', rim: '#fff0d0', mask: (x, y) => y > 455 + (x - 360) * .04 });
        // olive groves and terraced fields on the near slope
        g.fillStyle = '#8a6a48'; g.beginPath(); g.moveTo(0, 560); g.bezierCurveTo(200, 540, 420, 560, 620, 600); g.lineTo(620, H); g.lineTo(0, H); g.closePath(); g.fill();
        for (let j = 0; j < 6; j++) { g.strokeStyle = S.rgba('#c8a070', .5); g.lineWidth = 2; g.beginPath(); g.moveTo(0, 580 + j * 24); g.quadraticCurveTo(300, 568 + j * 26, 620, 610 + j * 20); g.stroke(); }
        for (let i = 0; i < 70; i++) { const r = S.rng(i + 900), x = r() * 600, y = 572 + r() * 140; S.dabs(g, { x: x - 12, y: y - 18, w: 24, h: 18, n: 10, cols: ['#6a7a4a', '#8a9a62', '#4a5a34', '#b8c088'], r0: 4, r1: 8, sq: .7, a0: .5, a1: .9, seed: i + 950 }); g.fillStyle = '#4a3020'; g.fillRect(x - 1, y - 2, 2, 6); }
        for (let i = 0; i < 14; i++) cypress(g, 60 + i * 52 + (i % 3) * 9, 430 + (i % 2) * 6, 60 + (i % 4) * 14, '#3a4a2a', '#c8a060');
        // haze over the valley
        const hz = g.createLinearGradient(0, 420, 0, 600); hz.addColorStop(0, 'rgba(255,200,150,0)'); hz.addColorStop(1, 'rgba(255,190,140,.45)'); g.fillStyle = hz; g.fillRect(0, 420, W, 180);
        // foreground: the rocky pass
        g.fillStyle = '#6a4232'; g.beginPath(); g.moveTo(560, H); g.lineTo(600, 620); g.bezierCurveTo(700, 560, 820, 548, 960, 560); g.bezierCurveTo(1100, 570, 1200, 540, W, 520); g.lineTo(W, H); g.closePath(); g.fill();
        S.dabs(g, { x: 560, y: 520, w: 720, h: 200, n: 500, cols: ['#8a5a40', '#4a2a20', '#b07a52', '#3a2018', '#c8925e'], r0: 8, r1: 26, sq: .55, ang: -.2, a0: .3, a1: .7, seed: 21, mask: (x, y) => y > 560 - (x - 600) * .02 });
        S.strokes(g, { x: 600, y: 560, w: 680, h: 160, n: 500, cols: ['#c8a060', '#8a7040', '#e0c080'], l0: 6, l1: 16, ang: -1.5, jit: .8, w0: 1, w1: 2, a0: .3, a1: .7, seed: 23 });
        // big rock on the right
        g.fillStyle = '#5a3628'; crisp(g, [[1130, 600], [1150, 470], [1210, 430], [1280, 440], [W, 640]]); g.fill();
        S.dabs(g, { x: 1130, y: 430, w: 150, h: 200, n: 120, cols: ['#7a4a36', '#3a2018', '#ffb880'], r0: 8, r1: 22, sq: .5, a0: .2, a1: .5, seed: 27, mask: (x, y) => x > 1150 - (y - 470) * .1 });
        g.fillStyle = S.rgba('#ffd0a0', .6); g.fillRect(1150, 470, 6, 130);
      });
    },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const Lt = S.LIGHT.golden;
      const sway = Math.sin(t * 1.2) * .05;
      S.contact(c, 870, 646, 70, .35); S.contact(c, 990, 640, 80, .35);
      // mother stands behind, stern; Boabdil turns back toward the city
      S.person(c, CH.aisha, 990, 640, 62, Object.assign(S.idle(t, 2), { face: -1, elN: 30, elF: 20 }), { blink: S.blinkAt(t, 3), angry: .35, look: [-.6, 0], time: t, sway }, Lt);
      S.person(c, CH.boabdil, 870, 646, 66, Object.assign(S.idle(t, 0), { face: -1, tilt: -6, lean: 4 }), { blink: S.blinkAt(t, 1), worry: .8, look: [-.8, .1], time: t, sway }, Lt);
      S.glow(c, 300, 330, 500, '#ffb070', .12);
      S.grade(c, '#ffb070', .12); S.vignette(c, .4); S.grain(c, .06);
    }
  };

  // ======================================================================
  // ES2 style frame: Potosi, the red mountain of silver.
  // ======================================================================
  SC['es2-potosi'] = {
    dur: 8,
    init() {
      if (this.bg) return;
      this.bg = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#3f78b0'); gr.addColorStop(.45, '#9cc4dc'); gr.addColorStop(.7, '#e8dcc0'); gr.addColorStop(1, '#d8b88a');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 30, w: W, h: 200, n: 500, cols: ['#ffffff', '#e8f0f6', '#c8dcec'], r0: 20, r1: 120, sq: .14, ang: -.08, jit: .1, a0: .05, a1: .16, seed: 31 });
        ridge(g, 420, 90, 260, 33, '#9aa6b0');
        ridge(g, 450, 60, 180, 35, '#8a8a84');
        // Cerro Rico: a big red cone, scarred with mine paths
        g.fillStyle = '#a8483a'; g.beginPath(); g.moveTo(160, 520); g.bezierCurveTo(300, 360, 420, 150, 520, 140); g.bezierCurveTo(600, 140, 720, 330, 900, 520); g.closePath(); g.fill();
        S.dabs(g, { x: 160, y: 140, w: 740, h: 380, n: 900, cols: ['#c8604a', '#7a2a24', '#e08a5a', '#5a1e1a', '#d0a070'], r0: 4, r1: 10, sq: .4, ang: .6, a0: .15, a1: .4, seed: 37, mask: (x, y) => y > 140 + Math.abs(x - 520) * (x < 520 ? 1.05 : .95) });
        S.strokes(g, { x: 160, y: 150, w: 740, h: 370, n: 1400, cols: ['#e8946a', '#6a2420', '#f0b080', '#8a3428'], l0: 6, l1: 18, ang: 1.0, jit: .6, w0: 1, w1: 2.2, a0: .3, a1: .7, seed: 39, mask: (x, y) => y > 150 + Math.abs(x - 520) * (x < 520 ? 1.05 : .95) });
        S.dabs(g, { x: 500, y: 140, w: 400, h: 380, n: 200, cols: ['#3a1210'], r0: 20, r1: 60, sq: .5, ang: .9, a0: .06, a1: .14, seed: 41, mask: (x, y) => x > 540 && y > 150 + Math.abs(x - 520) * .95 });
        g.save(); g.strokeStyle = S.rgba('#f2d0a0', .6); g.lineWidth = 2; for (let i = 0; i < 9; i++) { const y = 220 + i * 32; g.beginPath(); g.moveTo(520 - (y - 140) * .9, y + 10); g.quadraticCurveTo(520, y - 6, 520 + (y - 140) * .85, y + 12); g.stroke(); } g.restore();
        for (let i = 0; i < 30; i++) { const r = S.rng(i + 300), y = 200 + r() * 290, x = 520 + (r() - .5) * (y - 140) * 1.6; g.fillStyle = '#2a0e0a'; g.beginPath(); g.ellipse(x, y, 4, 5, 0, 0, TAU); g.fill(); }
        S.glow(g, 620, 200, 200, '#fff0d0', .25);
        // smelter smoke
        for (let i = 0; i < 6; i++) S.dabs(g, { x: 260 + i * 110, y: 340 - i * 10, w: 60, h: 180, n: 60, cols: ['#c8c0b4', '#e8e0d4', '#9a928a'], r0: 24, r1: 60, sq: .9, a0: .04, a1: .1, seed: 40 + i });
        // the town: adobe houses, a church tower
        g.fillStyle = '#c8a07a'; g.fillRect(0, 520, W, 200);
        town(g, { x: -40, y: 490, w: W + 40, h: 90, n: 130, seed: 501, scale: 1.1, wall: '#e6c8a0', wall2: '#b88a5e', shade: '#6a4a3a', roof: '#a4482c', roof2: '#6a2a1a', dark: '#3a2418', rim: '#fff4dc' });
        tower(g, 930, 560, 50, 140, '#efe0c4', '#b89e7a', '#fff8e8');
        g.fillStyle = '#efe0c4'; g.beginPath(); g.moveTo(926, 420); g.lineTo(955, 380); g.lineTo(984, 420); g.fill();
        g.strokeStyle = '#4a2a1a'; g.lineWidth = 3; g.beginPath(); g.moveTo(955, 380); g.lineTo(955, 360); g.moveTo(947, 368); g.lineTo(963, 368); g.stroke();
        // foreground: a dirt road with ore sacks
        const fg = g.createLinearGradient(0, 580, 0, H); fg.addColorStop(0, '#b88a5a'); fg.addColorStop(1, '#8a5e3a'); g.fillStyle = fg; g.fillRect(0, 590, W, 130);
        S.strokes(g, { x: 0, y: 590, w: W, h: 130, n: 900, cols: ['#d0a878', '#7a5030', '#e8c49a'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 61 });
        for (const [x, y] of [[180, 640], [230, 652], [205, 620], [1160, 650]]) { g.fillStyle = '#9a7a52'; g.beginPath(); g.ellipse(x, y, 34, 24, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#5a3a20', .5); g.beginPath(); g.ellipse(x + 10, y + 4, 22, 16, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#c8c8d0', .9); g.fillRect(x - 8, y - 22, 16, 6); }
      });
    },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const Lt = S.LIGHT.studio;
      S.contact(c, 560, 668, 80, .35); S.contact(c, 760, 664, 80, .35);
      { const x = 548, y = 668 - 62 * 4.2 + Math.sin(t * 1.6 + 1) * .7; c.save(); const sk = S.tone({ base: '#a08060', shade: '#5a4028', rim: '#e8c89a' }, Lt); S.cel(c, S.poly([[x - 52, y - 30], [x - 10, y - 56], [x + 6, y - 20], [x - 4, y + 60], [x - 50, y + 70], [x - 70, y + 20]]), { base: sk.base, shade: sk.shade, rim: sk.rim, L: Lt.L, sw: 14, rw: 2, ink: '#3a1d14', lw: 1.6 }); c.restore(); }
      S.person(c, CH.miner, 560, 668, 62, Object.assign(S.idle(t, 1), { face: 1, elN: 20, elF: 40, shN: -10, shF: 10 }), { blink: S.blinkAt(t, 2), worry: .6, look: [.5, .2], time: t }, Lt);
      S.person(c, CH.officer, 760, 664, 64, Object.assign(S.idle(t, 3), { face: -1, elN: 20, elF: 80 }), { blink: S.blinkAt(t, 4), angry: .4, look: [-.6, 0], time: t }, Lt);
      S.grade(c, '#ffe6b0', .1); S.vignette(c, .35); S.grain(c, .06);
    }
  };

  // ======================================================================
  // ES3 style frame: Guernica, market day, 26 April 1937, minutes before.
  // ======================================================================
  SC['es3-guernica'] = {
    dur: 8,
    init() {
      if (this.bg) return;
      this.bg = S.off(W, H, g => {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#7aa8c8'); gr.addColorStop(.5, '#d8e4dc'); gr.addColorStop(1, '#f0e2c0');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        S.dabs(g, { x: 0, y: 20, w: W, h: 220, n: 500, cols: ['#ffffff', '#eef2f0', '#c8d8e0'], r0: 20, r1: 130, sq: .14, ang: -.06, jit: .1, a0: .05, a1: .16, seed: 71 });
        // green Basque hills
        ridge(g, 300, 80, 220, 73, '#7a9a7a'); ridge(g, 340, 60, 160, 75, '#5f8a5a');
        S.dabs(g, { x: 0, y: 230, w: W, h: 160, n: 500, cols: ['#8ab06a', '#4a7a44', '#a8c880', '#3a6a3a'], r0: 6, r1: 18, sq: .6, a0: .2, a1: .5, seed: 77, mask: (x, y) => y > 340 - 60 * S.fbm(x / 160, 75) });
        // three planes over the far hills (tiny, ominous)
        // houses: white walls, red roofs, wooden balconies
        const house = (x, w, h, roof) => {
          const y = 560; g.fillStyle = '#f0e8d8'; g.fillRect(x, y - h, w, h);
          S.dabs(g, { x, y: y - h, w, h, n: 40, cols: ['#d8cebc', '#fff8ec', '#c8b8a0'], r0: 6, r1: 18, a0: .1, a1: .25, seed: x });
          g.fillStyle = S.rgba('#8a7a64', .35); g.fillRect(x + w * .7, y - h, w * .3, h);
          g.fillStyle = roof; g.beginPath(); g.moveTo(x - 10, y - h); g.lineTo(x + w / 2, y - h - w * .28); g.lineTo(x + w + 10, y - h); g.closePath(); g.fill();
          S.strokes(g, { x: x - 10, y: y - h - w * .28, w: w + 20, h: w * .28, n: 60, cols: ['#c85a3a', '#8a2a1a', '#e07a52'], l0: 6, l1: 14, ang: 0, jit: .1, w0: 1, w1: 2, a0: .3, a1: .6, seed: x + 1, mask: (px, py) => py > y - h - w * .28 + Math.abs(px - x - w / 2) * .56 });
          for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) { const wx = x + w * (.15 + k * .28), wy = y - h + 30 + r * 70; g.fillStyle = '#3a5a4a'; g.fillRect(wx, wy, w * .14, 34); g.fillStyle = '#2a1a10'; g.fillRect(wx + 3, wy + 3, w * .14 - 6, 28); }
          g.fillStyle = '#6a3e24'; g.fillRect(x + w * .08, y - h + 66, w * .84, 6); for (let k = 0; k < 14; k++) g.fillRect(x + w * .08 + k * w * .06, y - h + 72, 3, 22); g.fillRect(x + w * .08, y - h + 92, w * .84, 4);
          g.fillStyle = '#4a2e1c'; g.fillRect(x + w * .4, y - 70, w * .2, 70);
        };
        house(20, 220, 230, '#b8503a'); house(270, 180, 200, '#a8483a'); house(880, 200, 220, '#b85a3a'); house(1100, 200, 250, '#a04030');
        // church tower behind the square
        tower(g, 600, 400, 80, 200, '#d8ccb4', '#a49478', '#fff4dc');
        g.fillStyle = '#7a4a3a'; g.beginPath(); g.moveTo(596, 200); g.lineTo(640, 150); g.lineTo(684, 200); g.fill();
        // square: cobbles in warm afternoon light
        const sq = g.createLinearGradient(0, 560, 0, H); sq.addColorStop(0, '#c8b896'); sq.addColorStop(1, '#a8906a'); g.fillStyle = sq; g.fillRect(0, 560, W, 160);
        S.dabs(g, { x: 0, y: 560, w: W, h: 160, n: 900, cols: ['#d8c8a4', '#9a8460', '#e8dcc0', '#8a7454'], r0: 4, r1: 10, sq: .6, a0: .3, a1: .6, seed: 81 });
        // market stall with striped awning and produce
        const sx = 380, sy = 600;
        g.fillStyle = '#6a4a2a'; g.fillRect(sx, sy - 120, 8, 120); g.fillRect(sx + 300, sy - 120, 8, 120);
        for (let k = 0; k < 10; k++) { g.fillStyle = k % 2 ? '#f0e8d8' : '#3a6a5a'; g.beginPath(); g.moveTo(sx - 10 + k * 33, sy - 150); g.lineTo(sx - 10 + (k + 1) * 33, sy - 150); g.lineTo(sx - 4 + (k + 1) * 33, sy - 118); g.lineTo(sx - 4 + k * 33, sy - 118); g.closePath(); g.fill(); }
        g.fillStyle = '#8a5a32'; g.fillRect(sx - 10, sy - 50, 330, 18);
        for (let k = 0; k < 18; k++) { const r = S.rng(k + 90); g.fillStyle = ['#e0562a', '#f0c040', '#6a9a3a', '#b82a2a'][k % 4]; g.beginPath(); g.arc(sx + 10 + k * 17, sy - 56 - r() * 6, 8, 0, TAU); g.fill(); }
        g.fillStyle = S.rgba('#000000', .18); g.fillRect(sx - 10, sy - 32, 330, 40);
      });
    },
    draw(c, t) {
      this.init(); c.drawImage(this.bg, 0, 0);
      const Lt = S.LIGHT.golden;
      // the planes drift closer over the hills
      c.save(); c.fillStyle = 'rgba(42,42,48,.9)'; const dx = -t * 12; for (const [x, y] of [[1010, 170], [1050, 158], [1090, 176]]) { c.fillRect(x + dx - 12, y - 1.5, 24, 3); c.fillRect(x + dx - 3, y - 6, 4, 12); c.fillRect(x + dx + 9, y - 4, 3, 8); } c.restore();
      S.contact(c, 470, 676, 70, .3); S.contact(c, 640, 672, 50, .3); S.contact(c, 820, 680, 80, .3);
      S.person(c, CH.seller, 470, 676, 60, Object.assign(S.idle(t, 1), { face: 1, elN: 50, elF: 40 }), { blink: S.blinkAt(t, 1), smile: .4, look: [.5, 0], time: t }, Lt);
      S.person(c, CH.girl, 640, 672, 50, Object.assign(S.idle(t, 2), { face: 1 }), { blink: S.blinkAt(t, 2), raise: .5, look: [.6, -.8], time: t }, Lt);
      S.person(c, CH.farmer, 820, 680, 62, Object.assign(S.idle(t, 3), { face: -1, elN: 30 }), { blink: S.blinkAt(t, 3), smile: .3, look: [-.4, 0], time: t }, Lt);
      S.grade(c, '#ffe2a8', .12); S.vignette(c, .35); S.grain(c, .06);
    }
  };
})(window);
