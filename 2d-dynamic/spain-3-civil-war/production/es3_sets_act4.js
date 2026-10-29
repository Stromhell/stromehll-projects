// Spain 3 sets for act 4 (the war, 1936-1939): war room, train, Guernica, Picasso's studio, Barcelona, a trench, the Pyrenees.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood } = X;
  const cobbles = (g, y0, w, h, a, b, seed) => { g.fillStyle = b; g.fillRect(0, y0, w, h - y0); for (let y = y0 + 4; y < h; y += 14) for (let x = (y % 28) / 2; x < w; x += 22) { g.fillStyle = S.mix(a, b, S.rng(x * 3 + y * 11 + seed)()); g.beginPath(); g.ellipse(x, y, 10, 6, 0, 0, TAU); g.fill(); } };
  X.cobbles = cobbles;
  // ======================== A DARK WAR ROOM WITH A CHESSBOARD OF SPAIN ========================
  VP.set('chess', 1280, 720, (g, w, h) => {
    g.fillStyle = '#16120e'; g.fillRect(0, 0, w, h);
    const lg = g.createRadialGradient(640, 420, 40, 640, 420, 700); lg.addColorStop(0, '#3a2a1c'); lg.addColorStop(1, '#0a0806'); g.fillStyle = lg; g.fillRect(0, 0, w, h);
    // the table and the board in perspective
    g.fillStyle = '#3a2214'; g.beginPath(); g.moveTo(160, 470); g.lineTo(1120, 470); g.lineTo(1280, 720); g.lineTo(0, 720); g.fill();
    S.strokes(g, { x: 0, y: 470, w, h: 250, n: 400, cols: ['#5a3420', '#22140a'], l0: 30, l1: 90, ang: 0, jit: .05, w0: 1, w1: 3, a0: .2, a1: .4, seed: 701 });
    const B = (u, v) => [640 + (u - .5) * (520 + v * 360), 500 + v * 170];
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const p = [B(i / 8, j / 8), B((i + 1) / 8, j / 8), B((i + 1) / 8, (j + 1) / 8), B(i / 8, (j + 1) / 8)]; g.fillStyle = (i + j) % 2 ? '#d8c8a0' : '#5a3a24'; g.beginPath(); p.forEach((q, n) => n ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); g.fill(); }
    // outline of Spain painted over the board
    g.save(); g.globalAlpha = .35; g.strokeStyle = '#8a1a1a'; g.lineWidth = 4; g.beginPath(); [[.15, .1], [.7, .08], [.88, .3], [.75, .6], [.6, .95], [.3, .92], [.12, .7], [.1, .3]].forEach((q, i) => { const p = B(q[0], q[1]); i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); }); g.closePath(); g.stroke(); g.restore();
  });
  // ======================== A TRAIN CROSSING THE COUNTRYSIDE ========================
  VP.set('rail', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ac0'], [.5, '#e8dcc0']]);
    hill(g, 380, 60, 200, 711, '#8a8a6a', ['#9a9a7a', '#6a6a4a'], w, h);
    hill(g, 440, 50, 300, 713, '#a89a5a', ['#b8aa6a', '#887a3a'], w, h);
    const fg = g.createLinearGradient(0, 470, 0, h); fg.addColorStop(0, '#9a8a4a'); fg.addColorStop(1, '#6a5a2a'); g.fillStyle = fg; g.fillRect(0, 470, w, h - 470);
    S.strokes(g, { x: 0, y: 480, w, h: 240, n: 900, cols: ['#b8a868', '#5a4a24'], l0: 6, l1: 18, ang: -1.4, jit: .4, w0: 1, w1: 2, a0: .3, a1: .55, seed: 715 });
    // embankment and track
    g.fillStyle = '#8a7a6a'; g.fillRect(0, 590, w, 40); g.fillStyle = '#5a4a3a'; for (let x = 0; x < w; x += 24) g.fillRect(x, 600, 12, 22); g.fillStyle = '#3a3a3a'; g.fillRect(0, 598, w, 4); g.fillRect(0, 616, w, 4);
    for (const x of [120, 520, 920]) { g.fillStyle = '#3a2a1a'; g.fillRect(x, 470, 6, 120); g.strokeStyle = '#2a2a2a'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, 480); g.quadraticCurveTo(x + 200, 500, x + 400, 480); g.stroke(); }
  });
  // ======================== GUERNICA ON MARKET DAY ========================
  VP.set('guernica', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab0d8'], [.45, '#e8eee8']]);
    hill(g, 300, 80, 220, 721, '#4a7a4a', ['#5a8a5a', '#3a5a3a'], w, h);
    hill(g, 360, 60, 280, 723, '#3a6a3a', ['#4a7a3a', '#2a4a2a'], w, h);
    // Basque houses: white walls, red shutters and timber, wide roofs
    for (const [x, y, bw, bh] of [[0, 280, 260, 240], [240, 300, 220, 220], [820, 290, 230, 230], [1030, 270, 250, 250]]) { g.fillStyle = '#f0ece0'; g.fillRect(x, y, bw, bh); g.fillStyle = '#9a3a2a'; g.beginPath(); g.moveTo(x - 14, y + 4); g.lineTo(x + bw / 2, y - 50); g.lineTo(x + bw + 14, y + 4); g.fill(); g.strokeStyle = '#5a3a24'; g.lineWidth = 5; g.beginPath(); g.moveTo(x, y + 60); g.lineTo(x + bw, y + 60); g.moveTo(x + bw / 2, y - 40); g.lineTo(x + bw / 2, y + 60); g.stroke();
      for (let i = 0; i < Math.floor(bw / 70); i++) { const wx = x + 24 + i * 70; for (const wy of [y + 90, y + 160]) { g.fillStyle = '#3a3a4a'; g.fillRect(wx, wy, 30, 40); g.fillStyle = '#b8302a'; g.fillRect(wx - 12, wy, 10, 40); g.fillRect(wx + 32, wy, 10, 40); } } }
    // church tower in the back
    g.fillStyle = '#c8bca8'; g.fillRect(600, 160, 80, 200); g.fillStyle = '#8a7a6a'; g.beginPath(); g.moveTo(592, 162); g.lineTo(640, 100); g.lineTo(688, 162); g.fill(); g.fillStyle = '#2a2420'; g.beginPath(); g.arc(640, 210, 16, Math.PI, 0); g.fillRect(624, 210, 32, 20); g.fill();
    cobbles(g, 520, w, h, '#a89888', '#6a5a4a', 7);
  });
  // ======================== PICASSO'S PARIS STUDIO ========================
  VP.set('atelier', 1280, 720, (g, w, h) => {
    g.fillStyle = '#d8cfc0'; g.fillRect(0, 0, w, h);
    S.dabs(g, { x: 0, y: 0, w, h: 520, n: 300, cols: ['#e8e0d0', '#b8ad9c'], r0: 10, r1: 40, a0: .15, a1: .3, seed: 731 });
    // exposed beams and a skylight
    for (let x = 0; x < w; x += 200) { wood(g, x, 0, 30, 520, '#6a4a2a', 733 + x); }
    g.fillStyle = '#e8f0f4'; g.fillRect(940, 0, 260, 90); g.strokeStyle = '#4a3a2a'; g.lineWidth = 4; g.strokeRect(940, 0, 260, 90);
    // the huge grey canvas
    g.fillStyle = '#4a3a2a'; g.fillRect(140, 90, 1000, 440); g.fillStyle = '#9a9a96'; g.fillRect(150, 100, 980, 420);
    S.dabs(g, { x: 150, y: 100, w: 980, h: 420, n: 260, cols: ['#e8e8e4', '#2a2a2a', '#7a7a76'], r0: 10, r1: 50, sq: .4, a0: .15, a1: .35, seed: 735 });
    g.strokeStyle = S.rgba('#1a1a1a', .6); g.lineWidth = 4; for (const [a, b, c2, d] of [[200, 480, 420, 180], [420, 180, 640, 460], [700, 140, 820, 300], [860, 480, 1080, 160], [980, 240, 1100, 300]]) { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); }
    // floor boards
    g.fillStyle = '#8a6a4a'; g.fillRect(0, 530, w, h - 530); for (let y = 530; y < h; y += 26) { g.fillStyle = S.rgba('#3a2414', .5); g.fillRect(0, y, w, 2); }
    S.dabs(g, { x: 0, y: 540, w, h: 180, n: 80, cols: ['#e8e8e4', '#2a2a2a'], r0: 2, r1: 6, a0: .3, a1: .6, seed: 737 });
  });
  // ======================== BARCELONA: A BARRICADED STREET ========================
  VP.set('barcelona', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ac0'], [.3, '#d8d0c0']]);
    // modernista facades with curved balconies
    for (const [x, y, bw, col] of [[0, 60, 330, '#d8b890'], [330, 30, 300, '#c8a8a0'], [630, 70, 320, '#e0c8a0'], [950, 40, 330, '#c8b090']]) { g.fillStyle = col; g.fillRect(x, y, bw, 500 - y); S.dabs(g, { x, y, w: bw, h: 500 - y, n: 60, cols: [S.mix(col, '#ffffff', .2), S.mix(col, '#000000', .2)], r0: 6, r1: 20, a0: .1, a1: .25, seed: x + 741 });
      g.fillStyle = S.mix(col, '#000000', .25); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + bw / 2, y - 30, x + bw, y); g.fill();
      for (let r = 0; y + 40 + r * 100 < 420; r++) for (let i = 0; i < 3; i++) { const wx = x + 40 + i * 100, wy = y + 50 + r * 100; g.fillStyle = '#2a3a3a'; g.beginPath(); g.moveTo(wx, wy + 60); g.lineTo(wx, wy + 12); g.quadraticCurveTo(wx + 22, wy - 6, wx + 44, wy + 12); g.lineTo(wx + 44, wy + 60); g.fill(); g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; g.beginPath(); g.ellipse(wx + 22, wy + 62, 34, 8, 0, 0, Math.PI); g.stroke(); } }
    cobbles(g, 500, w, h, '#a8a098', '#6a645c', 9);
    // the barricade: sandbags, cobbles and a cart
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 380 + i * 58 + (r % 2) * 29, y = 600 - r * 26; g.fillStyle = S.mix('#b8a888', '#8a7a5a', S.rng(i + r * 9 + 743)()); g.beginPath(); g.ellipse(x, y, 30, 15, 0, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#5a4a2a', .6); g.lineWidth = 2; g.stroke(); }
    wood(g, 820, 520, 120, 60, '#6a4a2a', 745); g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(840, 590, 22, 0, TAU); g.arc(920, 590, 22, 0, TAU); g.fill();
  });
  // ======================== A TRENCH ON THE ARAGON FRONT AT DAWN ========================
  VP.set('trench', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a4a6a'], [.35, '#c88a6a'], [.5, '#f0c890']]);
    hill(g, 300, 40, 300, 751, '#5a5a6a', ['#6a6a7a', '#3a3a4a'], w, h);
    // no man's land with wire
    g.fillStyle = '#6a5a44'; g.fillRect(0, 340, w, 120); S.strokes(g, { x: 0, y: 340, w, h: 120, n: 500, cols: ['#8a7a5a', '#4a3a2a'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2, a0: .3, a1: .55, seed: 753 });
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 1.2; for (let x = 0; x < w; x += 6) { g.beginPath(); g.arc(x, 360 + Math.sin(x * .1) * 4, 8, 0, Math.PI * 1.6); g.stroke(); } for (let x = 30; x < w; x += 120) { g.fillStyle = '#3a2a1a'; g.fillRect(x, 340, 5, 30); }
    // parapet: sandbags along the top, earth wall and duckboards below
    g.fillStyle = '#5a4a34'; g.fillRect(0, 440, w, 280); S.strokes(g, { x: 0, y: 440, w, h: 280, n: 700, cols: ['#6a5a3a', '#3a2a1a'], l0: 10, l1: 40, ang: .1, jit: .3, w0: 1, w1: 3, a0: .2, a1: .45, seed: 755 });
    for (let i = 0; i < 24; i++) { const x = i * 56 + (i % 2) * 10, y = 448; g.fillStyle = S.mix('#a8987a', '#7a6a4a', S.rng(i + 757)()); g.beginPath(); g.ellipse(x, y, 32, 14, 0, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#4a3a1a', .5); g.lineWidth = 2; g.stroke(); }
    for (let x = 0; x < w; x += 30) { wood(g, x, 680, 26, 12, '#6a4a2a', 759 + x); }
  });
  // ======================== THE PYRENEES IN SNOW ========================
  VP.set('pyrenees', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a96a8'], [.5, '#d8dce4']]);
    const peak = (pts, col, sn) => { g.fillStyle = col; g.fill(S.poly(pts)); g.save(); g.clip(S.poly(pts)); g.fillStyle = sn; g.fillRect(0, 0, w, Math.min(...pts.map(p => p[1])) + 70); g.restore(); };
    peak([[0, 360], [220, 160], [420, 330], [620, 120], [860, 320], [1060, 170], [1280, 340], [1280, 720], [0, 720]], '#6a7488', '#f0f4f8');
    peak([[0, 460], [300, 300], [560, 440], [840, 280], [1280, 470], [1280, 720], [0, 720]], '#8a94a4', '#f4f6fa');
    g.fillStyle = '#eef2f6'; g.beginPath(); g.moveTo(0, 520); g.quadraticCurveTo(640, 430, 1280, 520); g.lineTo(1280, 720); g.lineTo(0, 720); g.fill();
    S.dabs(g, { x: 0, y: 440, w, h: 280, n: 300, cols: ['#ffffff', '#c8d0dc'], r0: 8, r1: 30, sq: .3, a0: .2, a1: .45, seed: 761 });
    // the trail winding up to a pass
    g.strokeStyle = S.rgba('#8a8a94', .6); g.lineWidth = 10; g.beginPath(); g.moveTo(-20, 680); g.quadraticCurveTo(400, 600, 560, 520); g.quadraticCurveTo(720, 450, 840, 300); g.stroke();
    for (let i = 0; i < 18; i++) { const r = S.rng(i + 763), x = r() * w, y = 480 + r() * 200; g.fillStyle = '#2a3a2a'; g.beginPath(); g.moveTo(x, y - 50); g.lineTo(x - 14, y); g.lineTo(x + 14, y); g.fill(); g.fillStyle = '#f4f6fa'; g.beginPath(); g.moveTo(x, y - 50); g.lineTo(x - 7, y - 26); g.lineTo(x + 7, y - 26); g.fill(); }
  });
})(window);
