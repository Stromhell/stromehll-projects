// Spain 2, act 2 sets: Tenochtitlan, the Mexican highlands, the Andes, Cajamarca, the ransom room.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill } = X;
  // a stepped temple pyramid with twin shrines on top
  const pyramid = (g, x, y, w, hh, col, sh, rim) => { const steps = 5; for (let i = 0; i < steps; i++) { const ww = w * (1 - i * .16), yy = y - i * hh / steps; g.fillStyle = col; g.fillRect(x - ww / 2, yy - hh / steps, ww, hh / steps); g.fillStyle = sh; g.fillRect(x + ww / 2 - ww * .25, yy - hh / steps, ww * .25, hh / steps); g.fillStyle = rim; g.fillRect(x - ww / 2, yy - hh / steps, ww, 2); }
    g.fillStyle = sh; g.fillRect(x - w * .06, y - hh, w * .12, hh); const tw = w * .2, ty = y - hh; for (const dx of [-w * .14, w * .14]) { g.fillStyle = dx < 0 ? '#c84a3a' : '#3a6ac8'; g.fillRect(x + dx - tw / 2, ty - tw * .9, tw, tw * .9); g.fillStyle = '#efe6d2'; g.fillRect(x + dx - tw / 2 - 2, ty - tw * .9 - 6, tw + 4, 6); g.fillStyle = '#2a1a10'; g.fillRect(x + dx - tw * .15, ty - tw * .5, tw * .3, tw * .5); } };
  X.pyramid = pyramid;
  const volcano = (g, x, y, w, hh, col, snow) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w * .08, y - hh); g.lineTo(x + w * .08, y - hh); g.lineTo(x + w / 2, y); g.fill(); g.fillStyle = snow; g.beginPath(); g.moveTo(x - w * .19, y - hh * .62); g.lineTo(x - w * .08, y - hh); g.lineTo(x + w * .08, y - hh); g.lineTo(x + w * .2, y - hh * .6); g.lineTo(x + w * .08, y - hh * .7); g.lineTo(x, y - hh * .58); g.lineTo(x - w * .1, y - hh * .7); g.fill();
    const inV = (px, py) => py < y && py > y - hh * .58 && Math.abs(px - x) < w * .08 + (py - (y - hh)) / hh * w * .42;
    S.strokes(g, { x: x - w / 2, y: y - hh, w, h: hh, n: 260, cols: ['#a0a0bc', '#6a6a88', '#b8b8d0'], l0: 4, l1: 10, ang: .15, jit: .6, w0: 1, w1: 2, a0: .08, a1: .22, seed: Math.round(x), mask: inV });
    S.dabs(g, { x: x, y: y - hh, w: w / 2, h: hh, n: 120, cols: ['#4a4a68'], r0: 10, r1: 30, sq: .5, a0: .08, a1: .18, seed: Math.round(x) + 1, mask: (px, py) => px > x + w * .02 && inV(px, py) });
    S.glow(g, x - w * .15, y - hh * .5, hh * .5, '#fff0e0', .15); };
  // ======================== TENOCHTITLAN ON ITS LAKE ========================
  VP.set('tenoch', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a88c8'], [.45, '#b8d8e8'], [.55, '#f0e8d0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 220, n: 400, cols: ['#ffffff', '#e8f0f6'], r0: 20, r1: 110, sq: .2, ang: -.05, jit: .1, a0: .06, a1: .2, seed: 411 });
    volcano(g, 1020, 330, 520, 230, '#8a8aa8', '#f4f6fa'); volcano(g, 1200, 340, 380, 170, '#7a7a98', '#eef0f6');
    hill(g, 340, 40, 160, 413, '#8a9a7a', ['#a8b890', '#6a7a5a'], w, h);
    const lake = g.createLinearGradient(0, 340, 0, h); lake.addColorStop(0, '#6aa8c0'); lake.addColorStop(1, '#2a6a88'); g.fillStyle = lake; g.fillRect(0, 340, w, h - 340);
    S.strokes(g, { x: 0, y: 340, w, h: 380, n: 900, cols: ['#e0f4f8', '#2a5a78', '#8ac8d8'], l0: 8, l1: 30, ang: 0, jit: .05, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 415 });
    // causeways
    g.fillStyle = '#d8c8a0'; g.beginPath(); g.moveTo(0, 470); g.lineTo(380, 450); g.lineTo(380, 462); g.lineTo(0, 486); g.fill(); g.beginPath(); g.moveTo(1280, 500); g.lineTo(880, 452); g.lineTo(880, 464); g.lineTo(1280, 516); g.fill(); g.beginPath(); g.moveTo(630, 720); g.lineTo(660, 480); g.lineTo(690, 480); g.lineTo(720, 720); g.fill();
    // the island city: white houses, canals, gardens
    g.fillStyle = '#c8b890'; g.beginPath(); g.ellipse(640, 440, 300, 60, 0, 0, TAU); g.fill();
    for (let i = 0; i < 260; i++) { const r = S.rng(i + 420), a = r() * TAU, rr = Math.sqrt(r()), x = 640 + Math.cos(a) * 290 * rr, y = 440 + Math.sin(a) * 52 * rr, s = .6 + (y - 390) / 100; g.fillStyle = S.mix('#f4ecd8', '#d8c8a8', r()); g.fillRect(x - 7 * s, y - 8 * s, 14 * s, 8 * s); g.fillStyle = S.rgba('#8a7a5a', .5); g.fillRect(x + 3 * s, y - 8 * s, 4 * s, 8 * s); if (r() < .25) { g.fillStyle = '#4a8a3a'; g.beginPath(); g.arc(x, y - 10 * s, 5 * s, 0, TAU); g.fill(); } }
    g.strokeStyle = S.rgba('#4a9ab8', .9); g.lineWidth = 3; for (const y of [425, 455]) { g.beginPath(); g.moveTo(380, y); g.lineTo(900, y); g.stroke(); }
    pyramid(g, 640, 430, 150, 110, '#efe6d2', '#c8b898', '#ffffff'); pyramid(g, 470, 440, 70, 50, '#e8dcc2', '#c0b090', '#ffffff'); pyramid(g, 810, 445, 80, 56, '#e8dcc2', '#c0b090', '#ffffff');
    // reeds and canoes near the shore
    for (let k = 0; k < 40; k++) { const r = S.rng(k + 460), x = r() * w, y = 640 + r() * 70; g.strokeStyle = S.rgba('#5a7a3a', .8); g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - .5) * 10, y - 30 - r() * 30); g.stroke(); }
  });
  // ======================== THE MEXICAN HIGHLANDS ========================
  VP.set('valley', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a88c8'], [.5, '#c8dce8'], [.6, '#f0e4c8']]);
    volcano(g, 380, 420, 700, 300, '#8a8aa8', '#f4f6fa'); volcano(g, 800, 430, 560, 240, '#7a7a98', '#eef0f6');
    hill(g, 440, 60, 180, 431, '#9a9a6a', ['#b8b880', '#7a7a4a'], w, h);
    hill(g, 520, 40, 220, 433, '#b8a06a', ['#d0b880', '#8a7a4a'], w, h);
    const fg = g.createLinearGradient(0, 520, 0, h); fg.addColorStop(0, '#c8aa70'); fg.addColorStop(1, '#9a7a48'); g.fillStyle = fg; g.fillRect(0, 560, w, h - 560);
    S.strokes(g, { x: 0, y: 560, w, h: 160, n: 700, cols: ['#d8c088', '#7a5a30', '#e8d4a0'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 435 });
    for (let k = 0; k < 14; k++) { const r = S.rng(k + 440), x = r() * w, y = 540 + r() * 40; g.fillStyle = '#4a7a3a'; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 7; j++) { const a = -Math.PI / 2 + (j - 3) * .35; g.lineTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30); g.lineTo(x + Math.cos(a + .17) * 6, y + Math.sin(a + .17) * 6); } g.fill(); }
  });
  // ======================== THE ANDES ========================
  VP.set('andes', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a70b8'], [.5, '#c0d8ea'], [.62, '#f0ecdc']]);
    S.dabs(g, { x: 0, y: 300, w, h: 160, n: 300, cols: ['#ffffff', '#e8f0f6'], r0: 30, r1: 140, sq: .25, a0: .08, a1: .25, seed: 451 });
    const t1 = x => 300 - 170 * Math.pow(S.fbm(x / 140, 453), 1.5) - 20 * Math.abs(Math.sin(x / 61)); g.fillStyle = '#8a90a8'; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 4) g.lineTo(x, t1(x)); g.lineTo(w, h); g.fill();
    S.dabs(g, { x: 0, y: 60, w, h: 260, n: 400, cols: ['#ffffff', '#e8eef6'], r0: 4, r1: 14, sq: .4, a0: .5, a1: .9, seed: 455, mask: (x, y) => y > t1(x) && y < t1(x) + 40 && t1(x) < 220 });
    // terraced green slopes
    const t2 = hill(g, 470, 140, 260, 457, '#6a8a4a', ['#8aaa5a', '#4a6a3a'], w, h);
    for (let j = 0; j < 9; j++) { g.strokeStyle = S.rgba('#c8d890', .55); g.lineWidth = 3; g.beginPath(); for (let x = 0; x <= w; x += 10) { const y = t2(x) + 24 + j * 26; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    // the stone road zig-zagging up
    g.strokeStyle = '#c8b898'; g.lineWidth = 10; g.lineJoin = 'round'; g.beginPath(); g.moveTo(200, 720); g.lineTo(520, 620); g.lineTo(300, 560); g.lineTo(640, 470); g.lineTo(480, 420); g.lineTo(760, 360); g.stroke();
    g.fillStyle = '#9a8a6a'; g.fillRect(0, 640, w, 80); S.dabs(g, { x: 0, y: 640, w, h: 80, n: 300, cols: ['#b8a888', '#6a5a40'], r0: 6, r1: 16, a0: .2, a1: .5, seed: 459 });
  });
  // ======================== CAJAMARCA'S SQUARE ========================
  VP.set('cajamarca', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a7ab0'], [.5, '#e8c8a0'], [.6, '#f0d8b0']]);
    hill(g, 300, 90, 200, 471, '#7a8a5a', ['#9aaa70', '#5a6a40'], w, h);
    // long low adobe halls with many doorways around the square
    for (const [x0, y, ww, hh] of [[0, 470, 560, 140], [720, 470, 560, 140]]) { g.fillStyle = '#c89a6a'; g.fillRect(x0, y - hh, ww, hh); g.fillStyle = '#a8784a'; g.fillRect(x0, y - hh, ww, 14); for (let k = 0; k < 7; k++) { g.fillStyle = '#2a1a10'; g.beginPath(); g.moveTo(x0 + 30 + k * 76, y); g.lineTo(x0 + 36 + k * 76, y - 80); g.lineTo(x0 + 70 + k * 76, y - 80); g.lineTo(x0 + 76 + k * 76, y); g.fill(); } S.dabs(g, { x: x0, y: y - hh, w: ww, h: hh, n: 200, cols: ['#d8aa7a', '#a8784a'], r0: 6, r1: 20, a0: .1, a1: .3, seed: 473 + x0 }); }
    g.fillStyle = '#d8b888'; g.fillRect(0, 470, w, h - 470); S.dabs(g, { x: 0, y: 470, w, h: 250, n: 600, cols: ['#e8c898', '#b89868', '#f0d8b0'], r0: 4, r1: 16, sq: .5, a0: .2, a1: .45, seed: 477 });
    // the platform (ushnu) in the middle
    g.fillStyle = '#a8a090'; g.fillRect(560, 400, 160, 70); g.fillStyle = '#c8c0b0'; g.fillRect(560, 400, 160, 8); g.fillStyle = '#8a8478'; g.fillRect(680, 408, 40, 62);
  });
  // ======================== THE RANSOM ROOM ========================
  VP.set('ransom', 1280, 720, (g, w, h) => {
    g.fillStyle = '#6a5a48'; g.fillRect(0, 0, w, h);
    // fitted Inca stonework
    for (let i = 0; i < 160; i++) { const r = S.rng(i + 490), x = (i % 16) * 82 + (Math.floor(i / 16) % 2) * 40 - 20, y = Math.floor(i / 16) * 58; g.fillStyle = S.mix('#8a7a64', '#5a4a3a', r()); g.beginPath(); g.moveTo(x + 4, y + 6); g.quadraticCurveTo(x + 40, y + 2 + r() * 4, x + 78, y + 6); g.quadraticCurveTo(x + 82, y + 30, x + 78, y + 54); g.quadraticCurveTo(x + 40, y + 58, x + 4, y + 54); g.quadraticCurveTo(x, y + 30, x + 4, y + 6); g.fill(); }
    // trapezoid niches
    for (const x of [240, 640, 1040]) { g.fillStyle = '#2a2018'; g.beginPath(); g.moveTo(x - 50, 400); g.lineTo(x - 36, 240); g.lineTo(x + 36, 240); g.lineTo(x + 50, 400); g.fill(); }
    g.fillStyle = '#3a2e22'; g.fillRect(0, 600, w, 120);
    // the red line high on the wall
    g.strokeStyle = '#b8282a'; g.lineWidth = 6; g.setLineDash([24, 10]); g.beginPath(); g.moveTo(0, 210); g.lineTo(w, 210); g.stroke(); g.setLineDash([]);
  });
})(window);
