// Spain 2 (The Spanish Empire): shared sets. Loads after es1 sets so it can reuse their helpers.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { ridge, tower, town } = X;
  const sky = (g, w, h, stops) => { const gr = g.createLinearGradient(0, 0, 0, h); for (const [o, c] of stops) gr.addColorStop(o, c); g.fillStyle = gr; g.fillRect(0, 0, w, h); };

  // ======================== THE WORLD MAP ========================
  const WLL = (lon, lat) => [640 + lon * 3.3, 330 - lat * 3.5];
  const C = {
    NAM: [[-168, 66], [-160, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 68], [-62, 60], [-55, 52], [-66, 45], [-70, 42], [-76, 38], [-81, 31], [-80, 25], [-82, 29], [-90, 30], [-97, 27], [-97, 21], [-90, 21], [-87, 15], [-83, 10], [-79, 8], [-85, 12], [-92, 15], [-105, 20], [-110, 24], [-112, 31], [-117, 33], [-124, 40], [-124, 48], [-133, 56], [-150, 60], [-165, 60]],
    GRL: [[-50, 60], [-40, 65], [-20, 70], [-20, 80], [-60, 82], [-70, 78], [-55, 70]],
    SAM: [[-79, 8], [-72, 12], [-62, 10], [-50, 0], [-35, -6], [-39, -14], [-48, -26], [-58, -34], [-65, -41], [-68, -52], [-74, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 0]],
    EUA: [[-10, 36], [-9, 43], [-2, 44], [-4, 48], [2, 51], [8, 54], [10, 58], [5, 62], [15, 69], [28, 71], [60, 70], [80, 73], [110, 76], [140, 72], [170, 68], [180, 65], [160, 60], [140, 55], [135, 45], [128, 38], [121, 31], [120, 23], [108, 21], [105, 10], [100, 13], [98, 8], [100, 3], [95, 16], [92, 22], [80, 15], [77, 8], [72, 21], [66, 25], [57, 26], [50, 30], [48, 29], [56, 24], [59, 22], [52, 16], [43, 13], [39, 20], [35, 28], [33, 31], [35, 36], [27, 37], [26, 40], [23, 36], [20, 40], [16, 38], [12, 44], [8, 44], [3, 43], [0, 39], [-2, 37], [-5, 36]],
    AFR: [[-17, 21], [-16, 12], [-8, 4], [5, 5], [9, 4], [10, -2], [13, -12], [12, -18], [15, -28], [19, -35], [26, -34], [33, -26], [35, -18], [40, -10], [40, -3], [51, 11], [43, 12], [37, 18], [33, 31], [20, 32], [10, 37], [-5, 36], [-10, 30]],
    AUS: [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [140, -38], [132, -32], [115, -34]],
    UK: [[-5, 50], [1, 51], [0, 53], [-3, 56], [-5, 58], [-6, 55], [-3, 54], [-5, 52]],
    PHL: [[120, 18], [122, 18], [126, 8], [124, 6], [121, 12]],
    JPN: [[131, 33], [135, 34], [140, 36], [142, 40], [140, 41], [138, 37], [133, 35]],
    CUB: [[-85, 22], [-80, 23], [-74, 20], [-78, 20]],
    MDG: [[44, -13], [50, -15], [47, -25], [44, -22]],
  };
  X.WLL = WLL; X.WORLD = C;
  X.wpoly = (pts) => S.poly(pts.map(q => WLL(q[0], q[1])), false);
  VP.set('world', 1280, 720, (g, w, h) => {
    g.fillStyle = '#2a1a10'; g.fillRect(0, 0, w, h);
    const pp = S.poly([[40, 30], [640, 14], [1240, 34], [1262, 360], [1240, 690], [640, 706], [36, 690], [18, 360]]);
    const pg = g.createLinearGradient(0, 0, w, h); pg.addColorStop(0, '#ecd9ac'); pg.addColorStop(1, '#d8bd88'); g.fillStyle = pg; g.fill(pp);
    g.save(); g.clip(pp);
    S.dabs(g, { x: 0, y: 0, w, h, n: 600, cols: ['#c8a46a', '#f4e4c0', '#b8925a'], r0: 20, r1: 90, sq: .6, a0: .04, a1: .12, seed: 151 });
    g.fillStyle = S.rgba('#7aa0a0', .35); g.fillRect(0, 0, w, h);
    S.strokes(g, { x: 0, y: 0, w, h, n: 1100, cols: ['#5a8a8c', '#9ac0b8'], l0: 10, l1: 30, ang: 0, jit: .15, w0: 1, w1: 3, a0: .08, a1: .2, seed: 153 });
    // a faint grid of latitude and longitude lines
    g.strokeStyle = S.rgba('#6a4a2a', .18); g.lineWidth = 1; for (let lon = -180; lon <= 180; lon += 30) { const [x] = WLL(lon, 0); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); } for (let lat = -60; lat <= 80; lat += 20) { const [, y] = WLL(0, lat); g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.strokeStyle = S.rgba('#8a3a2a', .3); g.setLineDash([6, 6]); const [, ey] = WLL(0, 0); g.beginPath(); g.moveTo(0, ey); g.lineTo(w, ey); g.stroke(); g.setLineDash([]);
    for (const k in C) { const p = X.wpoly(C[k]); g.fillStyle = '#e2c890'; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 900, cols: ['#c8a868', '#f0dca8', '#a88a54'], r0: 6, r1: 30, sq: .5, a0: .1, a1: .25, seed: 155 + k.length }); g.restore();
      g.strokeStyle = '#6a4a2a'; g.lineWidth = 2; g.stroke(p); g.strokeStyle = S.rgba('#4a7a7a', .35); g.lineWidth = 6; g.stroke(p); }
    // mountain hatching along the Andes, Rockies and Himalaya
    g.strokeStyle = S.rgba('#6a4a2a', .7); g.lineWidth = 1.4;
    const peaks = (pts) => pts.forEach(([lo, la]) => { const [x, y] = WLL(lo, la); g.beginPath(); g.moveTo(x - 5, y + 3); g.lineTo(x, y - 5); g.lineTo(x + 5, y + 3); g.stroke(); });
    peaks([[-77, 2], [-76, -6], [-74, -12], [-70, -18], [-69, -24], [-70, -30], [-71, -36], [-72, -44]]); peaks([[-115, 50], [-112, 45], [-108, 40], [-106, 35], [-120, 56]]); peaks([[80, 32], [85, 29], [90, 28], [76, 35], [70, 37]]);
    g.restore();
    g.strokeStyle = '#7a5a34'; g.lineWidth = 3; g.stroke(pp);
    g.save(); g.translate(1170, 600); g.strokeStyle = '#6a4a2a'; g.lineWidth = 1.5; g.beginPath(); g.arc(0, 0, 34, 0, TAU); g.stroke(); g.fillStyle = '#8a3a2a'; g.beginPath(); g.moveTo(0, -44); g.lineTo(6, 0); g.lineTo(0, 44); g.lineTo(-6, 0); g.fill(); g.fillStyle = '#6a4a2a'; g.beginPath(); g.moveTo(-44, 0); g.lineTo(0, 6); g.lineTo(44, 0); g.lineTo(0, -6); g.fill(); g.restore();
  });

  // ======================== POTOSI, THE RED MOUNTAIN ========================
  VP.set('potosi', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3f78b0'], [.45, '#9cc4dc'], [.7, '#e8dcc0'], [1, '#d8b88a']]);
    S.dabs(g, { x: 0, y: 30, w, h: 200, n: 500, cols: ['#ffffff', '#e8f0f6', '#c8dcec'], r0: 20, r1: 120, sq: .14, ang: -.08, jit: .1, a0: .05, a1: .16, seed: 31 });
    ridge(g, 420, 90, 260, 33, '#9aa6b0', w); ridge(g, 450, 60, 180, 35, '#8a8a84', w);
    g.fillStyle = '#a8483a'; g.beginPath(); g.moveTo(160, 520); g.bezierCurveTo(300, 360, 420, 150, 520, 140); g.bezierCurveTo(600, 140, 720, 330, 900, 520); g.closePath(); g.fill();
    const m = (x, y) => y > 150 + Math.abs(x - 520) * (x < 520 ? 1.05 : .95);
    S.dabs(g, { x: 160, y: 140, w: 740, h: 380, n: 900, cols: ['#c8604a', '#7a2a24', '#e08a5a', '#5a1e1a', '#d0a070'], r0: 4, r1: 10, sq: .4, ang: .6, a0: .15, a1: .4, seed: 37, mask: m });
    S.strokes(g, { x: 160, y: 150, w: 740, h: 370, n: 1400, cols: ['#e8946a', '#6a2420', '#f0b080', '#8a3428'], l0: 6, l1: 18, ang: 1.0, jit: .6, w0: 1, w1: 2.2, a0: .3, a1: .7, seed: 39, mask: m });
    S.dabs(g, { x: 500, y: 140, w: 400, h: 380, n: 200, cols: ['#3a1210'], r0: 20, r1: 60, sq: .5, ang: .9, a0: .06, a1: .14, seed: 41, mask: (x, y) => x > 540 && m(x, y) });
    g.save(); g.strokeStyle = S.rgba('#f2d0a0', .6); g.lineWidth = 2; for (let i = 0; i < 9; i++) { const y = 220 + i * 32; g.beginPath(); g.moveTo(520 - (y - 140) * .9, y + 10); g.quadraticCurveTo(520, y - 6, 520 + (y - 140) * .85, y + 12); g.stroke(); } g.restore();
    for (let i = 0; i < 30; i++) { const r = S.rng(i + 300), y = 200 + r() * 290, x = 520 + (r() - .5) * (y - 140) * 1.6; g.fillStyle = '#2a0e0a'; g.beginPath(); g.ellipse(x, y, 4, 5, 0, 0, TAU); g.fill(); }
    S.glow(g, 620, 200, 200, '#fff0d0', .25);
    g.fillStyle = '#c8a07a'; g.fillRect(0, 520, w, 200);
    town(g, { x: -40, y: 490, w: w + 40, h: 90, n: 130, seed: 501, scale: 1.1, wall: '#e6c8a0', wall2: '#b88a5e', shade: '#6a4a3a', roof: '#a4482c', roof2: '#6a2a1a', dark: '#3a2418', rim: '#fff4dc' });
    tower(g, 930, 560, 50, 140, '#efe0c4', '#b89e7a', '#fff8e8');
    g.fillStyle = '#efe0c4'; g.beginPath(); g.moveTo(926, 420); g.lineTo(955, 380); g.lineTo(984, 420); g.fill();
    g.strokeStyle = '#4a2a1a'; g.lineWidth = 3; g.beginPath(); g.moveTo(955, 380); g.lineTo(955, 360); g.moveTo(947, 368); g.lineTo(963, 368); g.stroke();
    const fg = g.createLinearGradient(0, 580, 0, h); fg.addColorStop(0, '#b88a5a'); fg.addColorStop(1, '#8a5e3a'); g.fillStyle = fg; g.fillRect(0, 590, w, 130);
    S.strokes(g, { x: 0, y: 590, w, h: 130, n: 900, cols: ['#d0a878', '#7a5030', '#e8c49a'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 61 });
    for (const [x, y] of [[180, 640], [230, 652], [205, 620], [1160, 650]]) { g.fillStyle = '#9a7a52'; g.beginPath(); g.ellipse(x, y, 34, 24, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#5a3a20', .5); g.beginPath(); g.ellipse(x + 10, y + 4, 22, 16, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#c8c8d0', .9); g.fillRect(x - 8, y - 22, 16, 6); }
  });

  // ======================== A GALLEON'S DECK AT SEA ========================
  VP.set('deck', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac0'], [.45, '#c8dcea'], [.55, '#f4e4c4']]);
    S.dabs(g, { x: 0, y: 40, w, h: 240, n: 400, cols: ['#ffffff', '#e8f0f6', '#c8d8e8'], r0: 20, r1: 110, sq: .2, ang: -.05, jit: .1, a0: .06, a1: .18, seed: 211 });
    const sea = g.createLinearGradient(0, 380, 0, 520); sea.addColorStop(0, '#5a8aa8'); sea.addColorStop(1, '#2a5a78'); g.fillStyle = sea; g.fillRect(0, 380, w, 140);
    S.strokes(g, { x: 0, y: 380, w, h: 140, n: 500, cols: ['#e0f0f4', '#3a6a88'], l0: 8, l1: 26, ang: 0, jit: .05, w0: 1, w1: 2, a0: .2, a1: .5, seed: 213 });
    // the rail and the deck planks in perspective
    g.fillStyle = '#6a3e22'; g.fillRect(0, 440, w, 26); g.fillStyle = '#8a5a34'; g.fillRect(0, 436, w, 8); for (let x = 20; x < w; x += 70) { g.fillStyle = '#5a321a'; g.fillRect(x, 466, 14, 60); }
    g.fillStyle = '#7a4a2a'; g.fillRect(0, 520, w, h - 520);
    for (let i = 0; i < 22; i++) { const x0 = 640 + (i - 11) * 40, x1 = 640 + (i - 11) * 130; g.strokeStyle = S.rgba('#3a1e10', .55); g.lineWidth = 2; g.beginPath(); g.moveTo(x0, 520); g.lineTo(x1, h); g.stroke(); }
    S.strokes(g, { x: 0, y: 520, w, h: 200, n: 700, cols: ['#a8744a', '#5a321a', '#c08a5a'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2.5, a0: .15, a1: .4, seed: 217 });
    // main mast and rigging
    g.fillStyle = '#5a321a'; g.fillRect(1010, 0, 30, 560); g.fillStyle = S.rgba('#ffe0b0', .35); g.fillRect(1012, 0, 6, 560);
    g.strokeStyle = S.rgba('#3a2414', .8); g.lineWidth = 2; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(1025, 40 + k * 20); g.lineTo(1280, 440 - k * 6); g.stroke(); g.beginPath(); g.moveTo(1025, 40 + k * 20); g.lineTo(760 - k * 40, 440); g.stroke(); }
    g.fillStyle = '#f0e4c8'; g.beginPath(); g.moveTo(1040, 20); g.quadraticCurveTo(1200, 120, 1180, 300); g.lineTo(1040, 300); g.fill(); g.fillStyle = S.rgba('#b8282a', .9); g.fillRect(1100, 120, 12, 70); g.fillRect(1072, 148, 68, 12);
    // coiled rope and a barrel
    g.fillStyle = '#5a321a'; g.beginPath(); g.ellipse(180, 650, 70, 36, 0, 0, TAU); g.fill(); g.fillStyle = '#7a4a24'; g.fillRect(140, 560, 80, 90); for (const y of [575, 630]) { g.fillStyle = '#3a2414'; g.fillRect(138, y, 84, 6); }
  });

  // ======================== PHILIP II'S STUDY ========================
  VP.set('study', 1280, 720, (g, w, h) => {
    g.fillStyle = '#4a4440'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < 560; y += 40) for (let x = (y / 40 % 2) * 60; x < w; x += 120) { g.fillStyle = S.mix('#5a544e', '#3a3632', S.rng(x * 7 + y + 3)()); g.fillRect(x + 2, y + 2, 116, 36); }
    // a tall window with grey light
    g.fillStyle = '#c8d0d8'; g.fillRect(140, 80, 200, 340); g.fillStyle = '#3a3430'; g.fillRect(234, 80, 12, 340); g.fillRect(140, 240, 200, 10); g.strokeStyle = '#2a2420'; g.lineWidth = 14; g.strokeRect(140, 80, 200, 340);
    // the door on the right
    g.fillStyle = '#3a2416'; g.fillRect(1000, 160, 180, 400); for (let k = 0; k < 4; k++) { g.fillStyle = '#4a3020'; g.fillRect(1014 + (k % 2) * 82, 180 + Math.floor(k / 2) * 190, 70, 170); } g.fillStyle = '#c8a050'; g.beginPath(); g.arc(1020, 380, 6, 0, TAU); g.fill();
    g.fillStyle = '#2a2420'; g.fillRect(0, 560, w, h - 560); S.strokes(g, { x: 0, y: 560, w, h: 160, n: 400, cols: ['#3a3430', '#1e1a18'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 3, a0: .2, a1: .5, seed: 231 });
    S.dabs(g, { x: 0, y: 0, w, h: 560, n: 700, cols: ['#6a625a', '#2e2a26', '#7a7068'], r0: 8, r1: 40, sq: .5, a0: .06, a1: .16, seed: 233 });
    // grey window light falling across the wall and floor
    g.save(); g.globalCompositeOperation = 'screen'; const lg = g.createLinearGradient(240, 100, 600, 700); lg.addColorStop(0, 'rgba(200,210,220,.25)'); lg.addColorStop(1, 'rgba(200,210,220,0)'); g.fillStyle = lg; g.beginPath(); g.moveTo(140, 420); g.lineTo(340, 420); g.lineTo(760, 720); g.lineTo(320, 720); g.fill(); g.restore();
    // a dark tapestry with a gold border
    g.fillStyle = '#3a1a22'; g.fillRect(440, 240, 380, 260); g.strokeStyle = '#a8843a'; g.lineWidth = 6; g.strokeRect(448, 248, 364, 244); S.dabs(g, { x: 450, y: 250, w: 360, h: 240, n: 200, cols: ['#5a2a32', '#2a1016', '#7a4a3a'], r0: 6, r1: 24, a0: .2, a1: .4, seed: 235 });
    g.fillStyle = S.rgba('#c8a050', .55); for (const [x, y] of [[500, 300], [760, 300], [500, 440], [760, 440]]) { g.beginPath(); g.moveTo(x, y - 14); g.lineTo(x + 10, y); g.lineTo(x, y + 14); g.lineTo(x - 10, y); g.fill(); }
    // a crucifix on the wall
    g.fillStyle = '#2a1a10'; g.fillRect(636, 120, 10, 90); g.fillRect(612, 146, 58, 9);
  });

  // ======================== THE OPEN OCEAN ========================
  VP.set('ocean', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a6aa8'], [.4, '#a8c8e0'], [.5, '#e8e4d0']]);
    S.dabs(g, { x: 0, y: 40, w, h: 260, n: 500, cols: ['#ffffff', '#e8f0f6', '#c8d8e8'], r0: 20, r1: 130, sq: .2, ang: -.05, jit: .1, a0: .06, a1: .2, seed: 241 });
    const sea = g.createLinearGradient(0, 360, 0, h); sea.addColorStop(0, '#6a9ab8'); sea.addColorStop(1, '#1e4a68'); g.fillStyle = sea; g.fillRect(0, 360, w, h - 360);
    S.strokes(g, { x: 0, y: 360, w, h: 360, n: 1100, cols: ['#e0f0f4', '#2a5a78', '#8ab8d0'], l0: 8, l1: 40, ang: 0, jit: .05, w0: 1, w1: 3, a0: .2, a1: .5, seed: 243 });
  });
})(window);
