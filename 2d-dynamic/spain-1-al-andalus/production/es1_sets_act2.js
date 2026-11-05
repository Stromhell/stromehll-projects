// Spain 1, act 2 (The Prince Who Swam): Damascus at night, the Euphrates, the Roman bridge at Cordoba, the Great Mosque.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { cypress, tower, town, arch, hill, sky } = X;
  const dome = (g, x, y, r, col, sh, rim) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - r, y); g.bezierCurveTo(x - r, y - r * 1.1, x - r * .2, y - r * 1.25, x, y - r * 1.5); g.bezierCurveTo(x + r * .2, y - r * 1.25, x + r, y - r * 1.1, x + r, y); g.closePath(); g.fill();
    g.fillStyle = sh; g.beginPath(); g.moveTo(x + r * .1, y - r * 1.3); g.bezierCurveTo(x + r * .5, y - r * 1.1, x + r, y - r * .9, x + r, y); g.lineTo(x + r * .2, y); g.closePath(); g.fill(); if (rim) { g.strokeStyle = rim; g.lineWidth = 2; g.beginPath(); g.moveTo(x - r, y - 2); g.bezierCurveTo(x - r, y - r * 1.1, x - r * .2, y - r * 1.25, x, y - r * 1.5); g.stroke(); } };
  const minaret = (g, x, y, w, h, col, sh) => { g.fillStyle = col; g.fillRect(x - w / 2, y - h, w, h); g.fillStyle = sh; g.fillRect(x, y - h, w / 2, h); g.fillStyle = col; g.fillRect(x - w * .7, y - h * .78, w * 1.4, h * .05); g.fillRect(x - w * .35, y - h * 1.1, w * .7, h * .1); dome(g, x, y - h * 1.1, w * .4, col, sh); };
  X.dome = dome; X.minaret = minaret;

  // ======================== DAMASCUS AT NIGHT ========================
  VP.set('damascus', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0e1430'], [.5, '#28304e'], [.8, '#4a3a4a'], [1, '#2a2028']]);
    for (let i = 0; i < 140; i++) { const r = S.rng(i + 1400); g.fillStyle = S.rgba('#fff8e0', .3 + r() * .5); g.beginPath(); g.arc(r() * w, r() * 300, .6 + r() * 1.2, 0, TAU); g.fill(); }
    g.fillStyle = '#f0e8c8'; g.beginPath(); g.arc(1040, 110, 34, 0, TAU); g.fill(); S.glow(g, 1040, 110, 160, '#c8d0f0', .25);
    // the skyline: domes and minarets in moonlight
    town(g, { x: 0, y: 330, w, h: 120, n: 300, seed: 1401, scale: .8, wall: '#4a4a62', wall2: '#3a3a52', shade: '#24243a', roof: '#3a3450', roof2: '#2a2440', dark: '#14141e', rim: '#9aa0c8', mask: () => true });
    dome(g, 300, 330, 80, '#5a6080', '#3a3e5a', '#a8b0d8'); minaret(g, 180, 360, 26, 220, '#5a5e7a', '#3a3e5a'); minaret(g, 430, 360, 22, 180, '#5a5e7a', '#3a3e5a');
    // the palace wall and broken gate in front
    g.fillStyle = '#6a5a5a'; g.fillRect(0, 380, w, 230); for (let y = 390; y < 610; y += 26) for (let x = (y / 26 % 2) * 30; x < w; x += 60) { g.fillStyle = S.rgba(S.mix('#7a6a6a', '#4a3e42', S.rng(x + y * 3)()), .6); g.fillRect(x + 2, y + 2, 56, 22); }
    for (let i = 0; i < 32; i++) { g.fillStyle = '#6a5a5a'; g.fillRect(i * 40, 366, 24, 16); }
    g.fillStyle = '#120c10'; g.fill(X.arch(800, 610, 200, 250)); g.lineWidth = 10; g.strokeStyle = '#a89a8a'; g.stroke(X.arch(800, 610, 216, 262));
    // smashed door leaves on the ground
    g.fillStyle = '#3a2416'; g.save(); g.translate(700, 640); g.rotate(-.25); g.fillRect(0, -20, 110, 20); g.restore(); g.save(); g.translate(860, 650); g.rotate(.18); g.fillRect(0, -18, 100, 18); g.restore();
    const st = g.createLinearGradient(0, 610, 0, h); st.addColorStop(0, '#4a3e3e'); st.addColorStop(1, '#221a1c'); g.fillStyle = st; g.fillRect(0, 610, w, h - 610);
    S.strokes(g, { x: 0, y: 610, w, h: 110, n: 400, cols: ['#6a5a5a', '#1a1214'], l0: 8, l1: 24, ang: 0, jit: .2, w0: 1, w1: 2.4, a0: .2, a1: .4, seed: 1403 });
  });

  // ======================== THE EUPHRATES ========================
  VP.RIVER_Y = 430;
  VP.set('river', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ac0'], [.35, '#e8d8b8'], [.5, '#f0c890']]);
    hill(g, 300, 40, 220, 1411, '#b8a07a', ['#d0b88a', '#8a7a5a'], w, h);
    // far bank with palms
    g.fillStyle = '#a8946a'; g.fillRect(0, 330, w, 40);
    for (let i = 0; i < 18; i++) { const r = S.rng(i + 1412), x = r() * w, y = 340, hh = 40 + r() * 40; g.strokeStyle = '#6a5030'; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 6, y - hh / 2, x + 2, y - hh); g.stroke(); g.fillStyle = '#4a6a3a'; for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .5; g.beginPath(); g.ellipse(x + 2 + Math.cos(a) * 14, y - hh + Math.sin(a) * 6 + 4, 16, 4, a, 0, TAU); g.fill(); } }
    // the river
    const rv = g.createLinearGradient(0, 360, 0, 620); rv.addColorStop(0, '#8ab0b0'); rv.addColorStop(1, '#3a6a72'); g.fillStyle = rv; g.fillRect(0, 360, w, 260);
    S.strokes(g, { x: 0, y: 360, w, h: 260, n: 900, cols: ['#d8f0e8', '#5a8a90', '#2a4a52'], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 3, a0: .15, a1: .4, seed: 1415 });
    // near bank: mud and reeds
    g.fillStyle = '#8a6a44'; g.beginPath(); g.moveTo(0, 600); g.bezierCurveTo(300, 580, 700, 610, w, 590); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 590, w, h: 130, n: 600, cols: ['#a8885a', '#5a4028'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 1417 });
    for (let i = 0; i < 60; i++) { const r = S.rng(i + 1420), x = r() * w, y = 600 + r() * 20; g.strokeStyle = S.rgba(r() < .5 ? '#6a7a3a' : '#9a9a5a', .8); g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 4, y - 30, x + 8 * (r() - .3), y - 50 - r() * 30); g.stroke(); }
  });

  // ======================== CORDOBA: the Roman bridge ========================
  VP.set('bridge', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.55, '#e8e4d0'], [1, '#f0d4a0']]);
    S.dabs(g, { x: 0, y: 20, w, h: 200, n: 300, cols: ['#ffffff', '#e0e8f0'], r0: 30, r1: 110, sq: .18, a0: .05, a1: .14, seed: 1431 });
    hill(g, 300, 40, 200, 1433, '#9aa6a0', ['#b4bcb0', '#7a8678'], w, h);
    // the city on the far bank: roofs, palms and a big mosque roof (still early, no great mosque yet)
    town(g, { x: 0, y: 290, w, h: 120, n: 320, seed: 1435, scale: .85, wall: '#f0dcb0', wall2: '#d8b888', shade: '#9a7a5a', roof: '#c06a44', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: () => true });
    tower(g, 980, 320, 34, 110, '#f0dcb0', '#b89a72', '#fff4dc');
    for (let i = 0; i < 10; i++) cypress(g, 60 + i * 130, 410, 40 + (i % 3) * 12, '#3a5a2a', '#d8c070');
    // the Guadalquivir
    const rv = g.createLinearGradient(0, 420, 0, h); rv.addColorStop(0, '#9ab8b0'); rv.addColorStop(1, '#4a7a7a'); g.fillStyle = rv; g.fillRect(0, 420, w, h - 420);
    S.strokes(g, { x: 0, y: 420, w, h: 300, n: 700, cols: ['#e0f0e8', '#5a8a8a'], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 3, a0: .15, a1: .4, seed: 1437 });
    // the bridge: a long deck on arches running across the frame
    g.fillStyle = '#d8b888'; g.fillRect(0, 500, w, 36); g.fillStyle = '#e8cc9c'; g.fillRect(0, 492, w, 10);
    for (let i = 0; i < 9; i++) { const x = 70 + i * 145; g.fillStyle = '#c8a678'; g.fillRect(x - 60, 536, 120, 120); g.fillStyle = '#2a3e40'; g.beginPath(); g.moveTo(x - 46, 660); g.lineTo(x - 46, 584); g.arc(x, 584, 46, Math.PI, 0); g.lineTo(x + 46, 660); g.fill(); g.fillStyle = '#b89668'; g.beginPath(); g.moveTo(x + 60, 640); g.lineTo(x + 84, 600); g.lineTo(x + 84, 660); g.fill(); }
    g.fillStyle = S.rgba('#fff0cc', .5); g.fillRect(0, 492, w, 3);
    S.strokes(g, { x: 0, y: 492, w, h: 160, n: 500, cols: ['#f0d8a8', '#8a6a48'], l0: 6, l1: 16, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .4, seed: 1439, mask: (x, y) => y < 540 });
    // reflections
    g.fillStyle = S.rgba('#c8a678', .25); g.fillRect(0, 660, w, 40);
  });

  // ======================== THE GREAT MOSQUE: a forest of striped arches ========================
  const stripedArch = (g, x, y, w, h, k, light) => { // a bay: column, horseshoe arch, pier, upper round arch, all red and cream voussoirs
    const r = w / 2, cy = y - h * .52, cu = cy - r * .95, cw = w * .1, pw = w * .15;
    const stone = S.mix('#d8c49c', '#2a1e18', k), stoneSh = S.mix('#a8906a', '#1a120e', k);
    for (const px of [x - r, x + r]) { g.fillStyle = stone; g.fillRect(px - cw / 2, cy + r * .45, cw, y - cy - r * .45); g.fillStyle = stoneSh; g.fillRect(px, cy + r * .45, cw / 2, y - cy - r * .45);
      g.fillStyle = stone; g.fillRect(px - pw / 2, cu, pw, cy - cu + r * .5); g.fillStyle = stoneSh; g.fillRect(px + pw * .1, cu, pw * .4, cy - cu + r * .5);
      g.fillStyle = S.mix('#ecdcb4', '#2a1e18', k); g.fillRect(px - pw * .65, cy + r * .4, pw * 1.3, r * .1); }
    for (const [cc, a0s, span, rr] of [[cy, .83, 1.34, r * .9], [cu, 1, 1, r * .88]]) { const n = 13;
      for (let i = 0; i < n; i++) { const a0 = Math.PI * (a0s + i * span / n), a1 = Math.PI * (a0s + (i + 1) * span / n);
        g.fillStyle = S.mix(i % 2 ? '#ecdcb4' : '#a8302a', '#1e1410', k * .85); g.beginPath(); g.arc(x, cc, rr, a0, a1, false); g.arc(x, cc, rr * .72, a1, a0, true); g.closePath(); g.fill(); } }
    if (light) { g.strokeStyle = S.rgba('#fff0c8', .4 * (1 - k)); g.lineWidth = 2; g.beginPath(); g.arc(x, cy, r * .9, Math.PI * 1.05, Math.PI * 1.45); g.stroke(); }
  };
  VP.set('mezquita', 1280, 720, (g, w, h) => {
    g.fillStyle = '#1a1210'; g.fillRect(0, 0, w, h);
    const fl = g.createLinearGradient(0, 330, 0, h); fl.addColorStop(0, '#1a1210'); fl.addColorStop(1, '#5a4636'); g.fillStyle = fl; g.fillRect(0, 330, w, h - 330);
    S.strokes(g, { x: 0, y: 400, w, h: 320, n: 500, cols: ['#7a6450', '#2a1e16'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2.4, a0: .15, a1: .35, seed: 1441 });
    // rows of arches receding to a vanishing point at (640, 300)
    const vx = 640, vy = 300;
    for (let row = 9; row >= 0; row--) { const s = Math.pow(.74, row), k = Math.min(1, row / 9 * 1.1), aw = 300 * s, ah = 640 * s, base = vy + 400 * s;
      for (let col = -6; col <= 6; col++) { const x = vx + (col + .5) * aw; if (x < -aw || x > w + aw) continue; stripedArch(g, x, base, aw, ah, k, row < 3); }
    }
    S.glow(g, vx, vy, 200, '#ffd090', .12);
  });
})(window);
