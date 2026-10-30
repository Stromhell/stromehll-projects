// Spain 3 act 6 detail upgrade (30 Oct): richer hospital room, civic plaza facade and Montjuic stadium. Loaded after es3_sets_act6.js.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, wood } = X;
  const line = (g, a, b, c2, d) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); };
  VP.set('hospital', 1280, 720, (g, w, h) => {
    g.fillStyle = '#c8ccc0'; g.fillRect(0, 0, w, 520); S.dabs(g, { x: 0, y: 0, w, h: 520, n: 300, cols: ['#d8dcd0', '#a8aca0', '#c0c4b8'], r0: 8, r1: 34, a0: .15, a1: .3, seed: 901 });
    g.fillStyle = '#8a9a88'; g.fillRect(0, 380, w, 140); for (let x = 0; x < w; x += 40) { g.fillStyle = S.rgba('#ffffff', .08); g.fillRect(x, 380, 38, 140); g.strokeStyle = S.rgba('#5a6a58', .4); g.lineWidth = 1; line(g, x, 380, x, 520); } g.fillStyle = '#6a7a68'; g.fillRect(0, 376, w, 6);
    // window with blinds and drawn curtains, city lights beyond
    g.fillStyle = '#2a3448'; g.fillRect(820, 80, 260, 260); for (let k = 0; k < 18; k++) { const r = S.rng(k + 902); g.fillStyle = S.rgba('#ffd890', .6); g.fillRect(830 + r() * 240, 220 + r() * 110, 4, 5); } g.strokeStyle = S.rgba('#e8ecf0', .5); g.lineWidth = 2; for (let y = 90; y < 200; y += 10) line(g, 820, y, 1080, y);
    g.strokeStyle = '#e8ecf0'; g.lineWidth = 6; g.strokeRect(820, 80, 260, 260); line(g, 950, 80, 950, 340);
    for (const [x0, dir] of [[820, 1], [1080, -1]]) { g.fillStyle = '#9a8a6a'; g.beginPath(); g.moveTo(x0, 70); g.lineTo(x0 + 110 * dir, 70); g.quadraticCurveTo(x0 + 90 * dir, 220, x0 + 110 * dir, 350); g.lineTo(x0, 350); g.fill(); S.strokes(g, { x: Math.min(x0, x0 + 110 * dir), y: 70, w: 110, h: 280, n: 70, cols: ['#b8a888', '#6a5a3a'], l0: 40, l1: 120, ang: Math.PI / 2, jit: .05, w0: 2, w1: 5, a0: .2, a1: .45, seed: 903 + x0 }); }
    // crucifix, wall clock, chart board, cabinet with flowers
    g.fillStyle = '#4a2a14'; g.fillRect(516, 100, 8, 60); g.fillRect(500, 116, 40, 7); g.fillStyle = '#f0ece0'; g.beginPath(); g.arc(660, 120, 24, 0, TAU); g.fill(); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.beginPath(); g.arc(660, 120, 24, 0, TAU); g.stroke(); line(g, 660, 120, 660, 104); line(g, 660, 120, 672, 126);
    g.fillStyle = '#e8e4d8'; g.fillRect(380, 200, 70, 90); g.strokeStyle = '#7a7a7a'; g.lineWidth = 1; for (let k = 0; k < 6; k++) line(g, 388, 216 + k * 12, 442, 216 + k * 12); g.strokeStyle = '#c83a2a'; g.lineWidth = 1.5; g.beginPath(); for (let k = 0; k < 8; k++) g.lineTo(390 + k * 7, 260 - S.noise(k, 7) * 30); g.stroke();
    wood(g, 900, 400, 120, 120, '#d8d4c8', 905); g.strokeStyle = '#9a9a8a'; g.lineWidth = 2; g.strokeRect(906, 420, 108, 44); g.strokeRect(906, 470, 108, 44); g.fillStyle = '#8aa0b0'; g.fillRect(940, 360, 22, 40); S.dabs(g, { x: 918, y: 320, w: 70, h: 50, n: 30, cols: ['#e8e8f0', '#d84a5a', '#f0d040', '#4a8a3a'], r0: 4, r1: 8, a0: .85, a1: 1, seed: 906 });
    // iron bed with frame, folded sheets, pillow; drip stand and a monitor trolley
    g.strokeStyle = '#6a6a6a'; g.lineWidth = 6; g.strokeRect(254, 350, 10, 170); g.beginPath(); g.moveTo(258, 350); g.quadraticCurveTo(300, 330, 340, 352); g.stroke(); for (let k = 0; k < 4; k++) line(g, 270 + k * 16, 354, 270 + k * 16, 400);
    g.fillStyle = '#d8d8d4'; g.fillRect(260, 430, 520, 90); g.fillStyle = '#f0f0ec'; g.fillRect(250, 400, 540, 40); g.fillStyle = '#b8c4cc'; g.fillRect(420, 396, 360, 48); g.fillStyle = S.rgba('#000000', .1); for (let k = 0; k < 6; k++) g.fillRect(430 + k * 58, 396, 3, 48); g.fillStyle = '#e8e8e4'; g.beginPath(); g.ellipse(316, 396, 54, 20, 0, 0, TAU); g.fill();
    g.fillStyle = '#5a5a5a'; g.fillRect(780, 380, 10, 140); for (const wx of [270, 770]) { g.fillStyle = '#2a2a2a'; g.beginPath(); g.arc(wx, 524, 8, 0, TAU); g.fill(); }
    g.strokeStyle = '#8a8a8a'; g.lineWidth = 3; line(g, 200, 520, 200, 200); line(g, 186, 200, 240, 200); line(g, 180, 520, 220, 520); g.fillStyle = S.rgba('#e0f0f8', .85); g.fillRect(226, 206, 24, 40); g.strokeStyle = S.rgba('#a8b8c0', .8); g.lineWidth = 1.5; g.beginPath(); g.moveTo(238, 246); g.quadraticCurveTo(250, 330, 320, 410); g.stroke();
    g.fillStyle = '#a8a8a0'; g.fillRect(60, 420, 90, 100); g.fillStyle = '#1a2a1a'; g.fillRect(70, 380, 70, 50); g.strokeStyle = '#4ad84a'; g.lineWidth = 2; g.beginPath(); for (let x = 0; x < 64; x += 4) g.lineTo(73 + x, 405 - (x % 16 === 8 ? 14 : 0)); g.stroke();
    g.fillStyle = '#9a9a8a'; g.fillRect(0, 520, w, h - 520); for (let x = 0; x < w; x += 60) for (let y = 520; y < h; y += 60) { g.fillStyle = (x + y) / 60 % 2 ? '#a8a898' : '#8a8a7a'; g.fillRect(x, y, 60, 60); g.fillStyle = S.rgba('#ffffff', .06); g.fillRect(x + 4, y + 4, 26, 10); }
    const ao = g.createLinearGradient(0, 520, 0, 560); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 520, w, 40);
  });
  VP.set('plaza', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa8d8'], [.4, '#e8e0d0']]);
    S.dabs(g, { x: 0, y: 10, w, h: 100, n: 30, cols: ['#ffffff'], r0: 20, r1: 60, sq: .3, a0: .3, a1: .6, seed: 580 });
    g.fillStyle = '#d8b898'; g.fillRect(0, 140, w, 380); S.dabs(g, { x: 0, y: 140, w, h: 380, n: 400, cols: ['#e8c8a8', '#b8987a', '#c8a888'], r0: 4, r1: 16, a0: .12, a1: .3, seed: 582 });
    g.strokeStyle = S.rgba('#8a6a4a', .3); g.lineWidth = 1; for (let y = 156; y < 520; y += 16) line(g, 0, y, w, y);
    g.fillStyle = '#e8d0b0'; g.fillRect(0, 130, w, 16); g.fillStyle = '#9a7a5a'; for (let x = 0; x < w; x += 14) g.fillRect(x, 146, 8, 8); g.fillStyle = S.rgba('#000000', .2); g.fillRect(0, 154, w, 8);
    for (let x = 18; x < w; x += 104) { g.fillStyle = '#e0c4a4'; g.fillRect(x - 10, 160, 12, 360); g.fillStyle = S.rgba('#000000', .12); g.fillRect(x - 2, 160, 4, 360); }
    // clock tower with flag
    g.fillStyle = '#e0c4a4'; g.fillRect(560, 40, 160, 120); S.dabs(g, { x: 560, y: 40, w: 160, h: 120, n: 40, cols: ['#f0d4b4', '#c0a484'], r0: 4, r1: 10, a0: .2, a1: .4, seed: 583 }); g.fillStyle = '#c8a888'; g.fillRect(556, 150, 168, 10);
    g.fillStyle = '#2a2a2a'; g.beginPath(); g.arc(640, 100, 43, 0, TAU); g.fill(); g.fillStyle = '#f4f0e4'; g.beginPath(); g.arc(640, 100, 40, 0, TAU); g.fill(); g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; line(g, 640 + Math.cos(a) * 32, 100 + Math.sin(a) * 32, 640 + Math.cos(a) * 37, 100 + Math.sin(a) * 37); } g.lineWidth = 3; line(g, 640, 100, 640, 72); line(g, 640, 100, 660, 108);
    g.fillStyle = '#5a6068'; g.beginPath(); g.moveTo(552, 40); g.lineTo(640, 0); g.lineTo(728, 40); g.fill();
    for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) { const x = 40 + i * 104, y = 190 + r * 110; if (r === 1 && i >= 5 && i <= 6) continue;
      g.fillStyle = '#f0dcc0'; g.fillRect(x - 6, y - 6, 56, 82); g.fillStyle = '#c8a888'; g.beginPath(); g.moveTo(x - 10, y - 6); g.lineTo(x + 22, y - 20); g.lineTo(x + 54, y - 6); g.fill();
      const gl = g.createLinearGradient(x, y, x + 44, y + 70); gl.addColorStop(0, '#7a8a9a'); gl.addColorStop(1, '#2a3440'); g.fillStyle = '#4a3a30'; g.fillRect(x, y, 44, 70); g.fillStyle = gl; g.fillRect(x + 4, y + 4, 36, 50); g.strokeStyle = '#e8dcc8'; g.lineWidth = 2; line(g, x + 22, y + 4, x + 22, y + 54); line(g, x + 4, y + 28, x + 40, y + 28);
      g.fillStyle = S.rgba('#000000', .2); g.fillRect(x - 6, y + 72, 56, 6); g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.strokeRect(x - 6, y + 56, 56, 14); for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(x - 4 + k * 10, y + 56); g.bezierCurveTo(x + k * 10, y + 60, x - 8 + k * 10, y + 66, x - 4 + k * 10, y + 70); g.stroke(); } }
    // the main balcony in the middle with flags
    g.fillStyle = '#3a2a20'; g.fillRect(540, 280, 200, 120); g.fillStyle = '#e8d0b0'; g.fillRect(530, 270, 220, 12); g.fillStyle = '#a8987a'; g.fillRect(510, 390, 260, 16); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.strokeRect(516, 350, 248, 40); for (let k = 0; k < 13; k++) { g.beginPath(); g.moveTo(520 + k * 20, 350); g.lineTo(520 + k * 20, 390); g.stroke(); }
    for (const fx of [500, 780]) { g.strokeStyle = '#3a2a1a'; g.lineWidth = 3; line(g, fx, 360, fx + (fx < 640 ? -30 : 30), 300); for (let b = 0; b < 3; b++) { g.fillStyle = ['#c8202a', '#f0c020', '#c8202a'][b]; g.beginPath(); g.moveTo(fx + (fx < 640 ? -30 : 30), 300 + b * 9); g.lineTo(fx + (fx < 640 ? -80 : 80), 304 + b * 9); g.lineTo(fx + (fx < 640 ? -80 : 80), 313 + b * 9); g.lineTo(fx + (fx < 640 ? -30 : 30), 309 + b * 9); g.fill(); } }
    g.fillStyle = '#a89070'; g.fillRect(0, 500, w, 20); g.fillStyle = '#c8b8a0'; g.fillRect(0, 520, w, h - 520); S.dabs(g, { x: 0, y: 520, w, h: 200, n: 800, cols: ['#d8c8b0', '#a89880', '#b8a890'], r0: 3, r1: 10, a0: .2, a1: .45, seed: 581 });
    for (let x = 0; x < w; x += 64) { g.strokeStyle = S.rgba('#8a7a62', .4); g.lineWidth = 1; line(g, x, 520, x - 50, h); } const ao = g.createLinearGradient(0, 520, 0, 560); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 520, w, 40);
  });
  VP.set('olympic', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a0e24'], [.55, '#2a2a4a'], [.7, '#4a3a5a']]);
    for (let i = 0; i < 90; i++) { const r = S.rng(i + 911); g.fillStyle = S.rgba('#ffffff', .2 + r() * .5); g.fillRect(r() * w, r() * 280, 2, 2); }
    // Montjuic hill silhouette with trees, the stadium's classical facade, sculptures and the cauldron
    g.fillStyle = '#1a1e2a'; g.beginPath(); g.moveTo(0, 360); g.quadraticCurveTo(300, 280, 640, 300); g.quadraticCurveTo(1000, 280, 1280, 350); g.lineTo(1280, 540); g.lineTo(0, 540); g.fill(); S.dabs(g, { x: 0, y: 280, w, h: 80, n: 200, cols: ['#141822', '#202634'], r0: 6, r1: 14, sq: .8, a0: .8, a1: 1, seed: 912, mask: (px, py) => py > 300 });
    const fc = g.createLinearGradient(0, 330, 0, 530); fc.addColorStop(0, '#e0d0b0'); fc.addColorStop(1, '#a8987a'); g.fillStyle = fc; g.fillRect(140, 330, 1000, 200); S.dabs(g, { x: 140, y: 330, w: 1000, h: 200, n: 300, cols: ['#f0e0c0', '#b8a888', '#c8b898'], r0: 4, r1: 14, a0: .15, a1: .3, seed: 913 });
    g.strokeStyle = S.rgba('#7a6a4a', .35); g.lineWidth = 1; for (let y = 350; y < 530; y += 14) line(g, 140, y, 1140, y);
    g.fillStyle = '#f0e0c0'; g.fillRect(130, 322, 1020, 16); g.fillStyle = '#8a7a5a'; for (let x = 134; x < 1146; x += 14) g.fillRect(x, 338, 8, 6); g.fillStyle = S.rgba('#000000', .25); g.fillRect(140, 344, 1000, 6);
    for (let i = 0; i < 16; i++) { const x = 180 + i * 60; g.fillStyle = '#e8d8b8'; g.fillRect(x - 8, 380, 6, 140); g.fillStyle = '#ffd890'; g.globalAlpha = .25; g.beginPath(); g.moveTo(x, 520); g.lineTo(x, 420); g.arc(x + 20, 420, 20, Math.PI, 0); g.lineTo(x + 40, 520); g.fill(); g.globalAlpha = 1; g.fillStyle = '#2a2430'; g.beginPath(); g.moveTo(x + 3, 520); g.lineTo(x + 3, 422); g.arc(x + 20, 422, 17, Math.PI, 0); g.lineTo(x + 37, 520); g.fill(); g.fillStyle = S.rgba('#ffd890', .2); g.fillRect(x + 6, 470, 28, 50); }
    // central pavilion with the Olympic rings and a bronze rider sculpture on each side
    g.fillStyle = '#efdfbf'; g.fillRect(560, 250, 160, 90); g.fillStyle = '#8a7a5a'; g.fillRect(556, 246, 168, 10); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; for (const [rx, ry, col] of [[604, 290, '#2a6ac8'], [640, 290, '#1a1a1a'], [676, 290, '#c82a2a'], [622, 304, '#e8b820'], [658, 304, '#2a9a4a']]) { g.strokeStyle = col; g.beginPath(); g.arc(rx, ry, 14, 0, TAU); g.stroke(); }
    for (const sx of [470, 810]) { g.fillStyle = '#3a3428'; g.fillRect(sx - 20, 290, 40, 40); g.fillStyle = '#5a4a32'; g.beginPath(); g.ellipse(sx, 278, 22, 10, 0, 0, TAU); g.fill(); g.fillRect(sx - 4, 254, 8, 22); g.beginPath(); g.arc(sx, 250, 6, 0, TAU); g.fill(); }
    // the cauldron
    g.fillStyle = '#4a4a52'; g.fillRect(1000, 220, 10, 110); g.fillStyle = '#5a5a62'; g.beginPath(); g.moveTo(980, 222); g.lineTo(1030, 222); g.lineTo(1018, 240); g.lineTo(992, 240); g.fill(); VP.glow ? 0 : 0;
    for (const x of [200, 1080]) { g.fillStyle = '#3a3a44'; g.fillRect(x - 4, 180, 8, 160); g.fillStyle = '#1a1a22'; g.fillRect(x - 32, 166, 64, 26); for (let k = 0; k < 6; k++) { g.fillStyle = '#f4f0d8'; g.fillRect(x - 28 + k * 10, 170, 8, 8); g.fillRect(x - 28 + k * 10, 180, 8, 8); } }
    g.fillStyle = '#2a2a30'; g.fillRect(0, 530, w, h - 530); g.fillStyle = '#3a3a40'; g.fillRect(0, 530, w, 10);
  });
})(window);
