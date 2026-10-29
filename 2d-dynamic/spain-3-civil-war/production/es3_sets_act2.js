// Spain 3 sets for act 2 (the Republic, 1931-1936): a ministry office, a Madrid street, the Asturias valley, a parish church.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood } = X;
  // ======================== A MINISTRY OFFICE, 1931 ========================
  VP.set('office', 1280, 720, (g, w, h) => {
    // green damask wall
    g.fillStyle = '#4a5a44'; g.fillRect(0, 0, w, 520);
    S.dabs(g, { x: 0, y: 0, w, h: 520, n: 500, cols: ['#5a6a50', '#3a4a34'], r0: 6, r1: 22, a0: .15, a1: .3, seed: 601 });
    for (let x = 0; x < w; x += 80) for (let y = 30; y < 500; y += 90) { g.fillStyle = S.rgba('#c8d0a0', .08); g.beginPath(); g.ellipse(x + 40 + (y % 180 ? 40 : 0), y, 14, 22, 0, 0, TAU); g.fill(); }
    // dado rail and wood panelling below
    wood(g, 0, 400, w, 120, '#5a3420', 603); g.fillStyle = '#3a2214'; g.fillRect(0, 396, w, 8);
    // tall window, right, with heavy curtains
    g.fillStyle = '#c8d8e0'; g.fillRect(900, 60, 220, 330); const wg = g.createLinearGradient(900, 60, 1120, 390); wg.addColorStop(0, '#e8f0f4'); wg.addColorStop(1, '#a8b8c4'); g.fillStyle = wg; g.fillRect(906, 66, 208, 318);
    g.fillStyle = '#d8c8a8'; g.fillRect(906, 250, 208, 134); for (let i = 0; i < 8; i++) { g.fillStyle = '#b8a888'; g.fillRect(910 + i * 26, 280 - (i % 3) * 18, 20, 104 + (i % 3) * 18); }
    g.strokeStyle = '#3a2a1a'; g.lineWidth = 8; g.strokeRect(900, 60, 220, 330); g.lineWidth = 5; g.beginPath(); g.moveTo(1010, 60); g.lineTo(1010, 390); g.moveTo(900, 220); g.lineTo(1120, 220); g.stroke();
    for (const [x0, dir] of [[860, 1], [1120, -1]]) { g.fillStyle = '#7a2a24'; g.beginPath(); g.moveTo(x0, 40); g.lineTo(x0 + 70 * dir, 40); g.quadraticCurveTo(x0 + 30 * dir, 220, x0 + 60 * dir, 400); g.lineTo(x0, 400); g.fill(); S.strokes(g, { x: Math.min(x0, x0 + 70 * dir), y: 40, w: 70, h: 360, n: 60, cols: ['#9a3a30', '#4a1410'], l0: 40, l1: 120, ang: Math.PI / 2, jit: .05, w0: 2, w1: 5, a0: .2, a1: .45, seed: 605 + x0 }); }
    // bookcase, left
    wood(g, 60, 80, 300, 330, '#4a2a18', 607);
    for (let r = 0; r < 4; r++) { g.fillStyle = '#2a160c'; g.fillRect(70, 100 + r * 78, 280, 64); for (let i = 0; i < 22; i++) { const rr = S.rng(i + r * 40 + 609), bw = 8 + rr() * 6, bh = 44 + rr() * 18; g.fillStyle = ['#7a2a24', '#2a4a6a', '#3a5a2a', '#8a6a2a', '#5a3a5a'][Math.floor(rr() * 5)]; g.fillRect(74 + i * 12.6, 164 + r * 78 - bh, bw, bh); g.fillStyle = S.rgba('#ffe0a0', .3); g.fillRect(74 + i * 12.6, 164 + r * 78 - bh + 8, bw, 2); } }
    // tricolour flag on a stand and a framed portrait
    g.strokeStyle = '#2a1a0a'; g.lineWidth = 5; g.beginPath(); g.moveTo(780, 80); g.lineTo(780, 400); g.stroke();
    for (let b = 0; b < 3; b++) { g.fillStyle = ['#b8202a', '#e8b820', '#6a2a7a'][b]; g.beginPath(); g.moveTo(782, 90 + b * 30); g.quadraticCurveTo(820, 100 + b * 30, 830, 140 + b * 40); g.lineTo(830, 170 + b * 40); g.quadraticCurveTo(820, 130 + b * 30, 782, 120 + b * 30); g.fill(); }
    g.fillStyle = '#8a6a2a'; g.fillRect(500, 100, 160, 200); g.fillStyle = '#3a3428'; g.fillRect(512, 112, 136, 176); g.fillStyle = '#c8a888'; g.beginPath(); g.arc(580, 180, 34, 0, TAU); g.fill(); g.fillStyle = '#2a2a2a'; g.fillRect(540, 214, 80, 74);
    // parquet floor
    g.fillStyle = '#6a4024'; g.fillRect(0, 520, w, 200);
    for (let y = 520; y < h; y += 20) for (let x = (y / 20 % 2) * 30; x < w; x += 60) { g.fillStyle = S.mix('#7a4a2a', '#5a3018', S.rng(x * 7 + y)()); g.fillRect(x, y, 58, 18); }
    const sh = g.createLinearGradient(0, 520, 0, h); sh.addColorStop(0, 'rgba(0,0,0,.35)'); sh.addColorStop(.3, 'rgba(0,0,0,0)'); g.fillStyle = sh; g.fillRect(0, 520, w, 200);
  });
  // ======================== A MADRID STREET ========================
  VP.set('mstreet', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a8ab8'], [.3, '#c8c8c8']]);
    // apartment blocks with iron balconies and shutters
    const blocks = [[0, 80, 300, '#c8a888'], [300, 40, 340, '#d8c0a0'], [640, 100, 280, '#b8987a'], [920, 60, 360, '#d0b090']];
    for (const [x, y, bw, col] of blocks) { g.fillStyle = col; g.fillRect(x, y, bw, 520 - y); g.fillStyle = S.mix(col, '#000000', .2); g.fillRect(x, y, bw, 12);
      S.dabs(g, { x, y, w: bw, h: 520 - y, n: 80, cols: [S.mix(col, '#ffffff', .15), S.mix(col, '#000000', .15)], r0: 6, r1: 20, a0: .1, a1: .25, seed: x + 611 });
      for (let r = 0; y + 30 + r * 100 < 420; r++) for (let i = 0; i < Math.floor(bw / 80); i++) { const wx = x + 24 + i * 80, wy = y + 40 + r * 100; g.fillStyle = '#3a4a3a'; g.fillRect(wx, wy, 40, 64); g.fillStyle = '#4a6050'; for (let k = 0; k < 6; k++) g.fillRect(wx + 2, wy + 4 + k * 10, 36, 4); g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; g.strokeRect(wx - 6, wy + 50, 52, 18); for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(wx - 4 + k * 10, wy + 50); g.lineTo(wx - 4 + k * 10, wy + 68); g.stroke(); } } }
    // shop fronts at street level
    for (let i = 0; i < 6; i++) { const x = 30 + i * 210; g.fillStyle = '#2a2018'; g.fillRect(x, 430, 120, 90); g.fillStyle = '#4a3a28'; g.fillRect(x + 6, 436, 108, 50); g.fillStyle = ['#7a2a24', '#2a4a3a', '#5a4a2a'][i % 3]; g.fillRect(x - 6, 420, 132, 16); }
    // posters on the wall
    for (const [x, y, c1] of [[200, 360, '#c83a2a'], [470, 350, '#2a3a8a'], [760, 370, '#c83a2a'], [1060, 356, '#e8d8b0']]) { g.fillStyle = c1; g.fillRect(x, y, 60, 80); g.fillStyle = S.rgba('#ffffff', .6); g.fillRect(x + 6, y + 8, 48, 10); g.fillRect(x + 10, y + 50, 40, 6); }
    // pavement and cobbled road
    g.fillStyle = '#a8a098'; g.fillRect(0, 520, w, 40); g.fillStyle = '#6a6460'; g.fillRect(0, 556, w, 6);
    g.fillStyle = '#7a746c'; g.fillRect(0, 562, w, h - 562);
    for (let y = 566; y < h; y += 14) for (let x = (y % 28) / 2; x < w; x += 22) { g.fillStyle = S.mix('#8a847c', '#5a5450', S.rng(x * 3 + y * 11)()); g.beginPath(); g.ellipse(x, y, 10, 6, 0, 0, TAU); g.fill(); }
    // street lamps
    for (const x of [150, 640, 1130]) { g.fillStyle = '#1a1a1a'; g.fillRect(x - 3, 380, 6, 160); g.fillRect(x - 12, 372, 24, 10); g.fillStyle = '#f0e0b0'; g.fillRect(x - 9, 352, 18, 22); g.fillStyle = '#1a1a1a'; g.beginPath(); g.moveTo(x - 14, 352); g.lineTo(x, 340); g.lineTo(x + 14, 352); g.fill(); }
  });
  // ======================== THE ASTURIAS VALLEY ========================
  VP.set('asturias', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8aa8c8'], [.45, '#d8e0e0']]);
    S.dabs(g, { x: 0, y: 40, w, h: 200, n: 80, cols: ['#ffffff', '#c8d0d8'], r0: 30, r1: 90, sq: .4, a0: .2, a1: .45, seed: 621 });
    hill(g, 260, 140, 180, 623, '#6a7a8a', ['#7a8a9a', '#4a5a6a'], w, h);
    hill(g, 330, 120, 240, 625, '#3a6a3a', ['#4a7a3a', '#2a4a2a'], w, h);
    // the mine: headframe, sheds and a spoil heap
    g.fillStyle = '#3a3a3a'; g.beginPath(); g.moveTo(860, 420); g.lineTo(980, 300); g.lineTo(1100, 420); g.fill();
    g.strokeStyle = '#2a2018'; g.lineWidth = 6; g.beginPath(); g.moveTo(760, 420); g.lineTo(800, 250); g.lineTo(840, 420); g.moveTo(770, 360); g.lineTo(830, 360); g.moveTo(780, 300); g.lineTo(820, 300); g.stroke(); g.fillStyle = '#2a2018'; g.beginPath(); g.arc(800, 250, 18, 0, TAU); g.fill(); g.fillStyle = '#5a5a5a'; g.beginPath(); g.arc(800, 250, 12, 0, TAU); g.fill();
    for (const [x, sw] of [[600, 120], [700, 80]]) { g.fillStyle = '#8a5a3a'; g.fillRect(x, 370, sw, 50); g.fillStyle = '#5a3a2a'; g.beginPath(); g.moveTo(x - 6, 372); g.lineTo(x + sw / 2, 340); g.lineTo(x + sw + 6, 372); g.fill(); g.fillStyle = '#2a2018'; g.fillRect(x + 16, 384, 18, 24); }
    // valley floor: green meadow and a dirt road
    const fg = g.createLinearGradient(0, 420, 0, h); fg.addColorStop(0, '#5a8a3a'); fg.addColorStop(1, '#3a6a2a'); g.fillStyle = fg; g.fillRect(0, 420, w, h - 420);
    S.strokes(g, { x: 0, y: 430, w, h: 290, n: 1400, cols: ['#6a9a4a', '#3a5a2a', '#8aaa5a'], l0: 6, l1: 16, ang: -1.5, jit: .4, w0: 1, w1: 2, a0: .3, a1: .6, seed: 627 });
    g.fillStyle = '#a8906a'; g.beginPath(); g.moveTo(0, 640); g.quadraticCurveTo(640, 560, 1280, 600); g.lineTo(1280, 650); g.quadraticCurveTo(640, 610, 0, 700); g.fill();
    for (let i = 0; i < 14; i++) { const r = S.rng(i + 629), x = r() * w, y = 440 + r() * 40; g.fillStyle = '#2a4a2a'; g.beginPath(); g.moveTo(x, y - 60); g.lineTo(x - 18, y); g.lineTo(x + 18, y); g.fill(); }
  });
  // ======================== A PARISH CHURCH ON A SQUARE AT NIGHT ========================
  VP.set('parish', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0e1228'], [.5, '#2a2a48']]);
    for (let i = 0; i < 80; i++) { const r = S.rng(i + 641); g.fillStyle = S.rgba('#ffffff', .3 + r() * .5); g.fillRect(r() * w, r() * 300, 2, 2); }
    // the church: nave, bell tower, rose window, big door
    g.fillStyle = '#8a8070'; g.fillRect(420, 220, 440, 300); g.beginPath(); g.moveTo(410, 222); g.lineTo(640, 130); g.lineTo(870, 222); g.fill();
    g.fillRect(820, 90, 120, 430); g.fillStyle = '#6a6050'; g.beginPath(); g.moveTo(812, 92); g.lineTo(880, 30); g.lineTo(948, 92); g.fill(); g.fillStyle = '#2a2420'; g.beginPath(); g.arc(880, 150, 24, Math.PI, 0); g.fillRect(856, 150, 48, 30); g.fill();
    S.dabs(g, { x: 420, y: 130, w: 520, h: 390, n: 200, cols: ['#a89a88', '#6a6050'], r0: 6, r1: 20, a0: .15, a1: .3, seed: 643 });
    g.fillStyle = '#3a2a30'; g.beginPath(); g.arc(640, 260, 40, 0, TAU); g.fill(); g.strokeStyle = '#8a7a5a'; g.lineWidth = 3; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(640, 260); g.lineTo(640 + Math.cos(k * TAU / 8) * 40, 260 + Math.sin(k * TAU / 8) * 40); g.stroke(); }
    g.fillStyle = '#2a1a10'; g.beginPath(); g.moveTo(580, 520); g.lineTo(580, 400); g.arc(640, 400, 60, Math.PI, 0); g.lineTo(700, 520); g.fill();
    for (const x of [500, 760]) { g.fillStyle = '#2a2430'; g.beginPath(); g.moveTo(x - 16, 400); g.lineTo(x - 16, 330); g.arc(x, 330, 16, Math.PI, 0); g.lineTo(x + 16, 400); g.fill(); }
    // houses either side
    for (const [x, bw, col] of [[0, 220, '#5a5048'], [200, 200, '#4a4440'], [960, 320, '#544a42']]) { g.fillStyle = col; g.fillRect(x, 280, bw, 240); for (let i = 0; i < bw / 70 - .5; i++) { g.fillStyle = '#1a1a24'; g.fillRect(x + 20 + i * 70, 320, 30, 46); g.fillRect(x + 20 + i * 70, 410, 30, 46); } }
    // cobbled square
    g.fillStyle = '#3a3634'; g.fillRect(0, 520, w, h - 520);
    for (let y = 524; y < h; y += 14) for (let x = (y % 28) / 2; x < w; x += 22) { g.fillStyle = S.mix('#4a4644', '#2a2624', S.rng(x * 5 + y * 13)()); g.beginPath(); g.ellipse(x, y, 10, 6, 0, 0, TAU); g.fill(); }
  });
})(window);
// Spain 3 sets for act 3 (the coup): the Strait of Gibraltar from above.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  VP.set('strait', 1280, 720, (g, w, h) => {
    const sg = g.createLinearGradient(0, 0, 0, h); sg.addColorStop(0, '#3a6a8a'); sg.addColorStop(1, '#2a5a7a'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
    S.strokes(g, { x: 0, y: 0, w, h, n: 1400, cols: ['#5a8aaa', '#1e4a6a', '#7aaac0'], l0: 10, l1: 34, ang: 0, jit: .2, w0: 1, w1: 2.5, a0: .15, a1: .35, seed: 661 });
    // Spain at the top with the Rock, Morocco at the bottom
    const land = (pts, col, seed) => { const p = S.poly(pts); g.fillStyle = col; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 300, cols: ['#a8986a', '#6a7a4a', '#c8b888'], r0: 8, r1: 40, sq: .5, a0: .15, a1: .3, seed }); g.restore(); g.strokeStyle = S.rgba('#e8f0f0', .5); g.lineWidth = 6; g.stroke(p); };
    land([[0, 0], [1280, 0], [1280, 150], [1000, 190], [820, 170], [760, 230], [700, 240], [660, 180], [420, 200], [200, 170], [0, 210]], '#8a8a5a', 663);
    g.fillStyle = '#7a7a6a'; g.beginPath(); g.moveTo(690, 236); g.lineTo(720, 196); g.lineTo(760, 228); g.fill();
    land([[0, 720], [0, 560], [300, 520], [520, 560], [640, 520], [780, 540], [1000, 500], [1280, 540], [1280, 720]], '#a8885a', 665);
    for (let i = 0; i < 14; i++) { const r = S.rng(i + 667); g.fillStyle = S.rgba('#f0f4f4', .5); g.fillRect(r() * w, 240 + r() * 260, 30 + r() * 40, 2); }
  });
})(window);
