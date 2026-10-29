// Spain 1, acts 5-6 (The Last Kingdom, After 1492): Court of the Lions, a Nasrid hall, Santa Fe, a town square, the harbour, a shuttered room, a modern cafe, the golden sea.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { cypress, tower, town, arch, hill, sky, dome, minaret, striped } = X;
  const stucco = (g, x, y, w, h, col, seed) => { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.strokeStyle = col; g.lineWidth = 1.2; for (let yy = y; yy < y + h; yy += 18) for (let xx = x + ((yy - y) / 18 % 2) * 9; xx < x + w; xx += 18) { g.beginPath(); g.moveTo(xx, yy + 9); g.lineTo(xx + 9, yy); g.lineTo(xx + 18, yy + 9); g.lineTo(xx + 9, yy + 18); g.closePath(); g.stroke(); } g.restore(); };
  const muqarnas = (g, x, y, w, col, sh) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 8 - r * 2; i++) { const cx = x - w / 2 + (r + .5 + i) * w / 8, cy = y + r * 12; g.fillStyle = (i + r) % 2 ? col : sh; g.beginPath(); g.arc(cx, cy, w / 16, 0, Math.PI); g.fill(); } };
  X.stucco = stucco;
  const ship = (g, x, y, s, sail = '#f4ead4', cross = false) => { g.fillStyle = '#4a2a14'; g.beginPath(); g.moveTo(x - 90 * s, y - 30 * s); g.lineTo(x + 100 * s, y - 34 * s); g.quadraticCurveTo(x + 80 * s, y + 10 * s, x + 50 * s, y + 14 * s); g.lineTo(x - 60 * s, y + 14 * s); g.quadraticCurveTo(x - 86 * s, y, x - 90 * s, y - 30 * s); g.fill();
    g.fillStyle = '#6a3a1a'; g.fillRect(x - 96 * s, y - 50 * s, 40 * s, 22 * s); g.fillStyle = S.rgba('#ffe0a0', .35); g.fillRect(x - 90 * s, y - 30 * s, 190 * s, 4 * s);
    g.strokeStyle = '#2a1a0a'; g.lineWidth = 3 * s; for (const [mx, mh] of [[-40, 150], [20, 190], [70, 120]]) { g.beginPath(); g.moveTo(x + mx * s, y - 30 * s); g.lineTo(x + mx * s, y - (30 + mh) * s); g.stroke(); g.fillStyle = sail; g.beginPath(); g.moveTo(x + (mx - 32) * s, y - (30 + mh * .9) * s); g.quadraticCurveTo(x + mx * s, y - (30 + mh * .7) * s, x + (mx + 32) * s, y - (30 + mh * .9) * s); g.lineTo(x + (mx + 30) * s, y - (40 + mh * .35) * s); g.quadraticCurveTo(x + mx * s, y - (30 + mh * .2) * s, x + (mx - 30) * s, y - (40 + mh * .35) * s); g.closePath(); g.fill();
      if (cross) { g.fillStyle = '#b8282a'; g.fillRect(x + (mx - 4) * s, y - (30 + mh * .8) * s, 8 * s, mh * .38 * s); g.fillRect(x + (mx - 14) * s, y - (30 + mh * .65) * s, 28 * s, 7 * s); } } };
  X.ship = ship;

  // ======================== COURT OF THE LIONS ========================
  VP.set('lions', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.3, '#d8e4ec']]);
    // the arcade of slender columns with lacy stucco arches
    g.fillStyle = '#e8d4b0'; g.fillRect(0, 120, w, 380); stucco(g, 0, 120, w, 140, S.rgba('#a8845a', .6), 1);
    for (let i = 0; i < 12; i++) { const x = 60 + i * 106; g.fillStyle = '#5a3a28'; g.beginPath(); g.moveTo(x - 40, 480); g.lineTo(x - 40, 330); g.quadraticCurveTo(x, 270, x + 40, 330); g.lineTo(x + 40, 480); g.fill(); muqarnas(g, x, 300, 90, '#f0dcb8', '#c8a880'); g.fillStyle = '#f4ecdc'; g.fillRect(x + 46, 300, 10, 190); g.fillRect(x + 42, 300, 18, 8); }
    g.fillStyle = '#b8603a'; g.fillRect(0, 104, w, 18);
    // gravel court and the fountain on twelve lions
    g.fillStyle = '#e0ccaa'; g.fillRect(0, 490, w, h - 490); S.strokes(g, { x: 0, y: 490, w, h: 230, n: 600, cols: ['#f4e4c4', '#a88a64'], l0: 4, l1: 10, ang: 0, jit: .4, w0: 1, w1: 2, a0: .2, a1: .4, seed: 2001 });
    for (const [x0, y0, x1, y1] of [[640, 600, 0, 720], [640, 600, 1280, 720], [640, 600, 640, 490]]) { g.strokeStyle = '#7ab0c0'; g.lineWidth = 8; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
    g.fillStyle = '#d8d0c0'; g.beginPath(); g.ellipse(640, 600, 140, 34, 0, 0, TAU); g.fill(); g.fillStyle = '#8ac0d0'; g.beginPath(); g.ellipse(640, 594, 120, 26, 0, 0, TAU); g.fill();
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, x = 640 + Math.cos(a) * 110, y = 610 + Math.sin(a) * 26; if (Math.sin(a) < -.2) continue; g.fillStyle = '#c8bca8'; g.beginPath(); g.ellipse(x, y + 10, 14, 16, 0, 0, TAU); g.fill(); g.fillStyle = '#a89a84'; g.beginPath(); g.arc(x, y - 4, 9, 0, TAU); g.fill(); }
    g.fillStyle = '#e8e0d0'; g.fillRect(630, 530, 20, 60); g.beginPath(); g.ellipse(640, 530, 50, 12, 0, 0, TAU); g.fill();
  });

  // ======================== A NASRID HALL ========================
  VP.set('nasrid', 1280, 720, (g, w, h) => {
    g.fillStyle = '#c8a878'; g.fillRect(0, 0, w, h);
    stucco(g, 0, 0, w, 300, S.rgba('#7a5a34', .5), 2);
    // tile dado
    for (let y = 420; y < 560; y += 20) for (let x = 0; x < w; x += 20) { g.fillStyle = ['#2a6a7a', '#e8dcc0', '#1e4a5a', '#c8a050', '#7a2a2a'][(x / 20 + y / 20 * 2) % 5]; g.fillRect(x + 1, y + 1, 18, 18); }
    for (const x of [220, 1060]) { g.fillStyle = '#3a2418'; g.beginPath(); g.moveTo(x - 90, 560); g.lineTo(x - 90, 260); g.quadraticCurveTo(x, 170, x + 90, 260); g.lineTo(x + 90, 560); g.fill(); muqarnas(g, x, 230, 180, '#f0dcb8', '#b8986a'); }
    g.fillStyle = '#e8d4b0'; g.fillRect(560, 160, 160, 240); for (let i = 0; i < 3; i++) { g.fillStyle = '#4a7aa8'; g.fillRect(580 + i * 44, 190, 32, 80); g.fillStyle = S.rgba('#ffffff', .4); g.fillRect(580 + i * 44, 190, 8, 80); }
    g.fillStyle = '#8a6a4a'; g.fillRect(0, 560, w, h - 560); S.strokes(g, { x: 0, y: 560, w, h: 160, n: 300, cols: ['#a88a64', '#5a3e28'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2, a0: .2, a1: .4, seed: 2011 });
  });

  // ======================== SANTA FE: the stone camp-town facing Granada ========================
  VP.set('santafe', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.45, '#e8e0cc'], [.6, '#f0d0a0']]);
    // the Sierra Nevada with snow, Granada and the Alhambra small on its hill on the right
    const top = hill(g, 270, 110, 160, 2021, '#8a8aa0', ['#a8a8c0', '#6a6a88'], w, h);
    S.dabs(g, { x: 0, y: 150, w, h: 120, n: 500, cols: ['#ffffff', '#e8eef8', '#c8d0e0'], r0: 4, r1: 12, sq: .5, ang: .6, a0: .6, a1: .95, seed: 2023, mask: (x, y) => y > top(x) + 2 && y < top(x) + 22 && top(x) < 215 });
    g.fillStyle = '#b8a07a'; g.beginPath(); g.moveTo(820, 330); g.bezierCurveTo(920, 270, 1100, 260, 1280, 300); g.lineTo(1280, 360); g.lineTo(820, 360); g.fill();
    town(g, { x: 860, y: 280, w: 420, h: 60, n: 120, seed: 2025, scale: .5, wall: '#f0dcb0', wall2: '#d8b888', shade: '#9a7a5a', roof: '#c06a44', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: () => true });
    g.fillStyle = '#c8603e'; g.fillRect(1000, 262, 120, 22); for (let i = 0; i < 4; i++) g.fillRect(1000 + i * 36, 248, 14, 16);
    // the plain
    const pl = g.createLinearGradient(0, 330, 0, h); pl.addColorStop(0, '#b8a878'); pl.addColorStop(1, '#8a7a4a'); g.fillStyle = pl; g.fillRect(0, 340, w, h - 340);
    S.strokes(g, { x: 0, y: 340, w, h: 380, n: 900, cols: ['#d8c898', '#6a5a34', '#9a9a5a'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2, a0: .2, a1: .45, seed: 2027 });
    // Santa Fe: a neat walled square town of stone with a church in the middle
    g.fillStyle = '#d8c8a8'; g.beginPath(); g.moveTo(140, 470); g.lineTo(620, 440); g.lineTo(760, 500); g.lineTo(260, 540); g.closePath(); g.fill();
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const x = 200 + i * 80 + j * 30, y = 470 + j * 16 - i * 4; g.fillStyle = '#e8dcc0'; g.fillRect(x, y - 22, 46, 22); g.fillStyle = '#b8603a'; g.beginPath(); g.moveTo(x - 4, y - 22); g.lineTo(x + 23, y - 34); g.lineTo(x + 50, y - 22); g.fill(); }
    g.strokeStyle = '#a8946a'; g.lineWidth = 8; g.beginPath(); g.moveTo(140, 470); g.lineTo(620, 440); g.lineTo(760, 500); g.lineTo(260, 540); g.closePath(); g.stroke();
    tower(g, 440, 470, 34, 90, '#efe2c8', '#b8a07a', '#fff4dc'); g.fillStyle = '#c8962a'; g.fillRect(455, 368, 4, 16); g.fillRect(450, 374, 14, 4);
  });

  // ======================== A TOWN SQUARE ========================
  VP.set('square', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa0d0'], [.5, '#f0e4c8']]);
    for (let i = 0; i < 6; i++) { const x = i * 220 - 20, hh = 260 + (i % 3) * 40; g.fillStyle = ['#e8d4ac', '#f0dcb8', '#d8c094'][i % 3]; g.fillRect(x, 520 - hh, 220, hh); g.fillStyle = '#b8603a'; g.fillRect(x - 6, 520 - hh - 14, 232, 16);
      for (let k = 0; k < 3; k++) { g.fillStyle = '#5a3a24'; g.fillRect(x + 30 + k * 60, 520 - hh + 50, 26, 40); g.fillStyle = '#7a4a2a'; g.fillRect(x + 26 + k * 60, 520 - hh + 90, 34, 6); }
      g.fillStyle = '#3a2418'; g.fill(arch(x + 110, 520, 70, 100)); }
    tower(g, 1100, 300, 50, 160, '#e8d4ac', '#b8986e', '#fff4dc');
    g.fillStyle = '#c8b090'; g.fillRect(0, 520, w, h - 520);
    for (let y = 520; y < h; y += 24) for (let x = ((y - 520) / 24 % 2) * 20; x < w; x += 40) { g.fillStyle = S.mix('#d8c098', '#a88a64', S.rng(x + y * 5 + 7)()); g.fillRect(x + 1, y + 1, 38, 22); }
  });

  // ======================== THE HARBOUR ========================
  VP.set('harbour', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a8ab8'], [.5, '#f0dcc0'], [.62, '#f0b890']]);
    hill(g, 360, 40, 200, 2041, '#9a8a7a', ['#b8a898', '#6a5a4a'], w, h);
    const sea = g.createLinearGradient(0, 360, 0, h); sea.addColorStop(0, '#6a9ab0'); sea.addColorStop(1, '#2a4a5a'); g.fillStyle = sea; g.fillRect(0, 360, w, h - 360);
    S.strokes(g, { x: 0, y: 360, w, h: 360, n: 900, cols: ['#e0f0f0', '#3a6a7a'], l0: 10, l1: 30, ang: 0, jit: .05, w0: 1, w1: 2, a0: .2, a1: .5, seed: 2043 });
    // the quay
    g.fillStyle = '#b8a07a'; g.beginPath(); g.moveTo(0, 520); g.lineTo(700, 520); g.lineTo(820, 560); g.lineTo(820, 720); g.lineTo(0, 720); g.fill(); g.fillStyle = '#d8c098'; g.fillRect(0, 516, 700, 8);
    for (let x = 0; x < 700; x += 60) { g.fillStyle = S.rgba('#6a5a3a', .4); g.fillRect(x, 524, 2, 196); }
    town(g, { x: 0, y: 340, w: 600, h: 120, n: 200, seed: 2045, scale: .8, wall: '#f0dcb0', wall2: '#d8b888', shade: '#9a7a5a', roof: '#c06a44', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: () => true });
    g.fillStyle = '#d8c098'; g.fillRect(0, 420, 640, 100);
    for (let i = 0; i < 10; i++) { g.fillStyle = '#5a3a24'; g.fill(arch(40 + i * 64, 520, 40, 70)); }
  });

  // ======================== A SHUTTERED ROOM AT NIGHT ========================
  VP.set('room', 1280, 720, (g, w, h) => {
    g.fillStyle = '#3a2a22'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < 560; y += 30) for (let x = (y / 30 % 2) * 40; x < w; x += 80) { g.fillStyle = S.mix('#4a3a2e', '#2e221a', S.rng(x * 3 + y + 9)()); g.fillRect(x + 2, y + 2, 76, 26); }
    // the shuttered window
    g.fillStyle = '#1a1c2a'; g.fillRect(820, 140, 260, 260); for (let i = 0; i < 9; i++) { g.fillStyle = '#5a3a22'; g.fillRect(820, 150 + i * 28, 126, 18); g.fillRect(954, 150 + i * 28, 126, 18); } g.fillStyle = '#3a2416'; g.fillRect(946, 140, 8, 260);
    g.fillStyle = '#2a1e16'; g.fillRect(0, 560, w, h - 560); g.fillStyle = '#6a2a22'; g.fillRect(140, 590, 600, 110); for (let i = 0; i < 20; i++) { g.fillStyle = ['#c8962a', '#e8dcc0'][i % 2]; g.fillRect(150 + i * 30, 600, 12, 6); }
  });

  // ======================== A MODERN STREET CAFE ========================
  VP.set('cafe', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a90d0'], [.5, '#e8f0f4']]);
    for (let i = 0; i < 5; i++) { const x = i * 270 - 30, hh = 380 + (i % 2) * 60; g.fillStyle = ['#f4ecd8', '#f0d8b0', '#ece4d4'][i % 3]; g.fillRect(x, 560 - hh, 270, hh);
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { g.fillStyle = '#3a5a6a'; g.fillRect(x + 30 + k * 80, 560 - hh + 40 + r * 100, 44, 60); g.fillStyle = '#2a2a2a'; g.fillRect(x + 26 + k * 80, 560 - hh + 100 + r * 100, 52, 6); } }
    // cafe awning, tables and chairs
    g.fillStyle = '#b8282a'; g.fillRect(260, 360, 520, 30); for (let k = 0; k < 13; k++) { g.fillStyle = k % 2 ? '#b8282a' : '#f4ecd8'; g.beginPath(); g.moveTo(260 + k * 40, 390); g.lineTo(300 + k * 40, 390); g.lineTo(280 + k * 40, 410); g.fill(); }
    g.fillStyle = '#d8c8a8'; g.fillRect(0, 560, w, h - 560); for (let y = 560; y < h; y += 30) for (let x = ((y - 560) / 30 % 2) * 30; x < w; x += 60) { g.fillStyle = S.rgba('#a89878', .4); g.fillRect(x, y, 58, 2); }
    for (const x of [360, 640]) { g.fillStyle = '#3a3a3a'; g.fillRect(x - 3, 560, 6, 70); g.fillStyle = '#e8e8e8'; g.beginPath(); g.ellipse(x, 560, 50, 10, 0, 0, TAU); g.fill(); }
  });

  // ======================== THE GOLDEN SEA ========================
  VP.set('goldsea', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a3a6a'], [.4, '#c87a6a'], [.6, '#ffc880'], [.62, '#ffe0a0']]);
    S.glow(g, 900, 430, 360, '#ffe0a0', .6); g.fillStyle = '#fff4d0'; g.beginPath(); g.arc(900, 440, 50, 0, TAU); g.fill();
    const sea = g.createLinearGradient(0, 440, 0, h); sea.addColorStop(0, '#e8a060'); sea.addColorStop(1, '#5a3a4a'); g.fillStyle = sea; g.fillRect(0, 440, w, h - 440);
    S.strokes(g, { x: 0, y: 440, w, h: 280, n: 900, cols: ['#ffe8b0', '#8a5a5a', '#c87a5a'], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 3, a0: .2, a1: .5, seed: 2061 });
    S.strokes(g, { x: 760, y: 440, w: 280, h: 280, n: 300, cols: ['#fff4d0'], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 3, a0: .3, a1: .7, seed: 2063 });
  });
})(window);
