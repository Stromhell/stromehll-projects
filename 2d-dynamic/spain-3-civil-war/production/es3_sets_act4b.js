// Spain 3 act 4 detail upgrade (30 Oct): richer rail landscape, Guernica, Barcelona, trench and Pyrenees sets. Loaded after es3_sets_act4.js and replaces those sets.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood, cobbles } = X;
  const line = (g, a, b, c2, d) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); };
  const tree = (g, x, y, s, cols, seed) => { g.fillStyle = '#4a3420'; g.fillRect(x - 2.5 * s, y - 14 * s, 5 * s, 14 * s); S.dabs(g, { x: x - 18 * s, y: y - 40 * s, w: 36 * s, h: 30 * s, n: 30, cols, r0: 4 * s, r1: 8 * s, sq: .8, a0: .8, a1: 1, seed }); };
  const tiles = (g, x0, y0, x1, y1, col, seed) => { S.strokes(g, { x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0), n: 80, cols: [S.mix(col, '#000000', .3), S.mix(col, '#ffffff', .15)], l0: 6, l1: 12, ang: 0, jit: .1, w0: 1.5, w1: 2.5, a0: .3, a1: .6, seed }); };
  // ======================== RAILWAY THROUGH THE CATALAN COUNTRYSIDE ========================
  VP.set('rail', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ac0'], [.5, '#e8dcc0']]);
    S.dabs(g, { x: 0, y: 40, w, h: 180, n: 60, cols: ['#ffffff', '#f0e8d8'], r0: 30, r1: 80, sq: .35, a0: .15, a1: .35, seed: 709 });
    hill(g, 380, 60, 200, 711, '#8a8a6a', ['#9a9a7a', '#6a6a4a'], w, h);
    S.dabs(g, { x: 0, y: 320, w, h: 80, n: 160, cols: ['#6a7a4a', '#5a6a3a'], r0: 3, r1: 6, sq: .8, a0: .6, a1: .9, seed: 712, mask: (px, py) => S.fbm(px / 60, 9) > .5 });
    hill(g, 440, 50, 300, 713, '#a89a5a', ['#b8aa6a', '#887a3a'], w, h);
    // farmhouse (masia) and cypresses on the rise
    { const x = 860, y = 430; g.fillStyle = '#e8dcc0'; g.fillRect(x, y - 50, 110, 50); g.fillStyle = '#c8b898'; g.fillRect(x + 70, y - 50, 40, 50); g.fillStyle = '#a84a32'; g.beginPath(); g.moveTo(x - 6, y - 50); g.lineTo(x + 55, y - 74); g.lineTo(x + 116, y - 50); g.fill(); tiles(g, x - 4, y - 74, x + 114, y - 50, '#a84a32', 714); g.fillStyle = '#3a2a1e'; g.fillRect(x + 20, y - 36, 12, 16); g.fillRect(x + 48, y - 28, 16, 28); g.fillRect(x + 82, y - 36, 12, 16); X.cypress(g, x - 20, y, 70, '#2a4a2a', '#5a7a3a'); X.cypress(g, x + 132, y, 60, '#2a4a2a', '#5a7a3a'); }
    // olive groves in rows
    for (let r = 0; r < 3; r++) for (let i = 0; i < 14; i++) { const x = i * 96 + r * 30 + 20, y = 470 + r * 26, s = .7 + r * .18; if (x > 820 && x < 1000 && r === 0) continue; tree(g, x, y, s, ['#7a8a5a', '#5a6a3a', '#9aa070'], 716 + i + r * 20); }
    const fg = g.createLinearGradient(0, 470, 0, h); fg.addColorStop(0, '#9a8a4a'); fg.addColorStop(1, '#6a5a2a'); g.fillStyle = fg; g.fillRect(0, 540, w, h - 540);
    S.strokes(g, { x: 0, y: 540, w, h: 180, n: 900, cols: ['#b8a868', '#5a4a24', '#8a7a3a'], l0: 6, l1: 18, ang: -1.4, jit: .4, w0: 1, w1: 2, a0: .3, a1: .55, seed: 715 });
    // ballast embankment, sleepers, rails, telegraph poles
    g.fillStyle = '#8a7a6a'; g.beginPath(); g.moveTo(0, 580); g.lineTo(w, 580); g.lineTo(w, 640); g.lineTo(0, 640); g.fill(); S.dabs(g, { x: 0, y: 580, w, h: 60, n: 900, cols: ['#a89888', '#6a5a4a', '#9a8a7a'], r0: 1.5, r1: 3.5, a0: .6, a1: 1, seed: 717 });
    g.fillStyle = '#5a4a3a'; for (let x = 0; x < w; x += 22) g.fillRect(x, 598, 13, 24); g.fillStyle = '#9a9a9a'; g.fillRect(0, 596, w, 3); g.fillRect(0, 614, w, 3); g.fillStyle = '#3a3a3a'; g.fillRect(0, 599, w, 2); g.fillRect(0, 617, w, 2);
    for (const x of [120, 520, 920]) { g.fillStyle = '#3a2a1a'; g.fillRect(x, 440, 6, 150); g.fillRect(x - 16, 448, 38, 4); g.fillRect(x - 12, 462, 30, 4); g.fillStyle = '#e8e8e0'; for (const dx of [-14, -4, 8, 18]) g.fillRect(x + dx, 444, 3, 4); g.strokeStyle = '#2a2a2a'; g.lineWidth = 1; for (const yy of [448, 462]) { g.beginPath(); g.moveTo(x, yy); g.quadraticCurveTo(x + 200, yy + 18, x + 400, yy); g.stroke(); } }
  });
  // ======================== GUERNICA ON MARKET DAY ========================
  VP.set('guernica', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab0d8'], [.45, '#e8eee8']]);
    S.dabs(g, { x: 0, y: 30, w, h: 160, n: 50, cols: ['#ffffff', '#e8eef4'], r0: 30, r1: 80, sq: .35, a0: .2, a1: .45, seed: 719 });
    hill(g, 300, 80, 220, 721, '#4a7a4a', ['#5a8a5a', '#3a5a3a'], w, h);
    S.dabs(g, { x: 0, y: 220, w, h: 140, n: 400, cols: ['#2a4a2a', '#3a5a32', '#4a6a3a'], r0: 5, r1: 11, sq: .8, a0: .6, a1: .95, seed: 722, mask: (px, py) => S.fbm(px / 90, 3) > .45 });
    hill(g, 360, 60, 280, 723, '#3a6a3a', ['#4a7a3a', '#2a4a2a'], w, h);
    // church tower: stone courses, belfry arches, clock
    g.fillStyle = '#c8bca8'; g.fillRect(600, 160, 80, 220); g.fillStyle = '#a89c88'; g.fillRect(650, 160, 30, 220); g.strokeStyle = S.rgba('#7a6e5a', .5); g.lineWidth = 1; for (let y = 172; y < 380; y += 12) line(g, 600, y, 680, y);
    g.fillStyle = '#8a7a6a'; g.beginPath(); g.moveTo(592, 162); g.lineTo(640, 100); g.lineTo(688, 162); g.fill(); tiles(g, 600, 110, 680, 160, '#8a7a6a', 724);
    g.fillStyle = '#2a2420'; for (const bx of [610, 646]) { g.beginPath(); g.arc(bx + 12, 196, 12, Math.PI, 0); g.fillRect(bx, 196, 24, 22); g.fill(); } g.fillStyle = '#f0ece0'; g.beginPath(); g.arc(640, 250, 12, 0, TAU); g.fill(); g.strokeStyle = '#2a2420'; g.lineWidth = 2; line(g, 640, 250, 640, 242); line(g, 640, 250, 646, 252);
    // Basque caserio houses: whitewash, timber frames, wooden balconies, flower boxes, tiled roofs
    for (const [x, y, bw, bh, sd] of [[0, 280, 260, 240, 1], [240, 300, 220, 220, 2], [820, 290, 230, 230, 3], [1030, 270, 250, 250, 4]]) {
      g.fillStyle = '#f0ece0'; g.fillRect(x, y, bw, bh); S.dabs(g, { x, y, w: bw, h: bh, n: 80, cols: ['#ffffff', '#d8d0c0', '#e8e0d0'], r0: 4, r1: 14, a0: .15, a1: .35, seed: 725 + sd });
      g.fillStyle = S.rgba('#000000', .08); g.fillRect(x + bw * .7, y, bw * .3, bh);
      g.fillStyle = '#9a3a2a'; g.beginPath(); g.moveTo(x - 18, y + 6); g.lineTo(x + bw / 2, y - 52); g.lineTo(x + bw + 18, y + 6); g.fill(); tiles(g, x - 10, y - 46, x + bw + 10, y + 2, '#9a3a2a', 727 + sd); g.fillStyle = S.rgba('#000000', .3); g.fillRect(x, y + 4, bw, 8);
      g.strokeStyle = '#5a3a24'; g.lineWidth = 5; line(g, x, y + 70, x + bw, y + 70); line(g, x + 4, y, x + 4, y + bh); line(g, x + bw - 4, y, x + bw - 4, y + bh); g.lineWidth = 3; for (let k = 1; k < 4; k++) line(g, x + k * bw / 4, y + 4, x + k * bw / 4, y + 70); line(g, x + 8, y + 8, x + bw / 4, y + 66); line(g, x + bw - 8, y + 8, x + bw * .75, y + 66);
      for (let i = 0; i < Math.floor(bw / 70); i++) { const wx = x + 24 + i * 70; for (const [wy, bal] of [[y + 90, true], [y + 160, false]]) { g.fillStyle = '#2a3440'; g.fillRect(wx, wy, 30, 40); g.fillStyle = S.rgba('#a8c0d8', .3); g.fillRect(wx + 2, wy + 2, 10, 18); g.strokeStyle = '#e8e0d0'; g.lineWidth = 1.5; line(g, wx + 15, wy, wx + 15, wy + 40); g.fillStyle = '#b8302a'; g.fillRect(wx - 12, wy, 10, 40); g.fillRect(wx + 32, wy, 10, 40); g.fillStyle = '#7a1e18'; for (let k = 0; k < 5; k++) { g.fillRect(wx - 11, wy + 3 + k * 8, 8, 2); g.fillRect(wx + 33, wy + 3 + k * 8, 8, 2); }
        if (bal) { wood(g, wx - 14, wy + 40, 58, 6, '#5a3a24', wx + wy); g.strokeStyle = '#5a3a24'; g.lineWidth = 2; for (let k = 0; k < 7; k++) line(g, wx - 12 + k * 9, wy + 26, wx - 12 + k * 9, wy + 40); line(g, wx - 14, wy + 26, wx + 44, wy + 26); S.dabs(g, { x: wx - 12, y: wy + 18, w: 54, h: 10, n: 16, cols: ['#c83a4a', '#e8a8b8', '#3a7a3a'], r0: 2, r1: 4, a0: .8, a1: 1, seed: wx * 3 + wy }); } } }
      g.fillStyle = '#4a2a18'; g.fillRect(x + bw / 2 - 18, y + bh - 60, 36, 60); g.beginPath(); g.arc(x + bw / 2, y + bh - 60, 18, Math.PI, 0); g.fill(); g.fillStyle = S.rgba('#000000', .2); g.fillRect(x, y + bh - 10, bw, 10);
    }
    cobbles(g, 520, w, h, '#a89888', '#6a5a4a', 7);
    const ao = g.createLinearGradient(0, 520, 0, 560); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 520, w, 40);
  });
  // ======================== BARCELONA, 1937: MODERNISTA FACADES AND A BARRICADE ========================
  VP.set('barcelona', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ac0'], [.3, '#d8d0c0']]);
    for (const [x, y, bw, col] of [[0, 60, 330, '#d8b890'], [330, 30, 300, '#c8a8a0'], [630, 70, 320, '#e0c8a0'], [950, 40, 330, '#c8b090']]) {
      const bg = g.createLinearGradient(x, 0, x + bw, 0); bg.addColorStop(0, S.mix(col, '#ffffff', .1)); bg.addColorStop(1, S.mix(col, '#000000', .1)); g.fillStyle = bg; g.fillRect(x, y, bw, 500 - y);
      S.dabs(g, { x, y, w: bw, h: 500 - y, n: 200, cols: [S.mix(col, '#ffffff', .2), S.mix(col, '#000000', .2), S.mix(col, '#a06040', .2)], r0: 4, r1: 14, a0: .1, a1: .25, seed: x + 741 });
      // wavy modernista crown with mosaic
      g.fillStyle = S.mix(col, '#000000', .25); g.beginPath(); g.moveTo(x, y + 10); g.quadraticCurveTo(x + bw * .25, y - 30, x + bw / 2, y - 10); g.quadraticCurveTo(x + bw * .75, y - 34, x + bw, y + 10); g.lineTo(x + bw, y + 22); g.lineTo(x, y + 22); g.fill();
      S.dabs(g, { x, y: y - 20, w: bw, h: 40, n: 120, cols: ['#2a7a8a', '#e8c040', '#c83a3a', '#f0f0f0', '#3a6aa8'], r0: 2, r1: 4, sq: .9, a0: .7, a1: 1, seed: x + 751, mask: (px, py) => py > y - 8 && py < y + 20 });
      for (let r = 0; y + 40 + r * 100 < 420; r++) { g.fillStyle = S.mix(col, '#ffffff', .2); g.fillRect(x, y + 128 + r * 100, bw, 4);
        for (let i = 0; i < 3; i++) { const wx = x + 40 + i * 100, wy = y + 50 + r * 100;
          g.fillStyle = S.mix(col, '#ffffff', .3); g.beginPath(); g.moveTo(wx - 8, wy + 64); g.lineTo(wx - 8, wy + 10); g.quadraticCurveTo(wx + 22, wy - 16, wx + 52, wy + 10); g.lineTo(wx + 52, wy + 64); g.fill();
          const gl = g.createLinearGradient(wx, wy, wx + 44, wy + 60); gl.addColorStop(0, '#5a6a72'); gl.addColorStop(1, '#1e2a30'); g.fillStyle = gl; g.beginPath(); g.moveTo(wx, wy + 60); g.lineTo(wx, wy + 12); g.quadraticCurveTo(wx + 22, wy - 6, wx + 44, wy + 12); g.lineTo(wx + 44, wy + 60); g.fill();
          g.fillStyle = '#4a6a5a'; g.fillRect(wx - 16, wy + 8, 12, 52); g.fillRect(wx + 48, wy + 8, 12, 52);
          // curved wrought-iron balcony
          g.fillStyle = S.rgba('#000000', .25); g.beginPath(); g.ellipse(wx + 22, wy + 70, 34, 6, 0, 0, TAU); g.fill(); g.fillStyle = S.mix(col, '#ffffff', .1); g.beginPath(); g.ellipse(wx + 22, wy + 64, 34, 6, 0, 0, TAU); g.fill();
          g.strokeStyle = '#1a1a1a'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(wx + 22, wy + 46, 32, 6, 0, 0, Math.PI); g.stroke(); for (let k = 0; k < 9; k++) { const bx = wx - 8 + k * 7.5; g.beginPath(); g.moveTo(bx, wy + 48); g.bezierCurveTo(bx + 5, wy + 52, bx - 5, wy + 58, bx, wy + 64); g.stroke(); }
          if ((i + r) % 3 === 0) { g.fillStyle = '#c8202a'; g.fillRect(wx + 8, wy + 46, 30, 18); g.fillStyle = '#1a1a1a'; g.beginPath(); g.moveTo(wx + 8, wy + 64); g.lineTo(wx + 38, wy + 46); g.lineTo(wx + 38, wy + 64); g.fill(); }
        } }
      g.fillStyle = S.mix(col, '#000000', .3); g.fillRect(x, 440, bw, 60); g.fillStyle = '#2a2018'; for (let i = 0; i < 3; i++) { g.fillRect(x + 30 + i * 100, 450, 60, 50); g.fillStyle = S.rgba('#ffd890', .15); g.fillRect(x + 34 + i * 100, 454, 52, 26); g.fillStyle = '#2a2018'; }
      g.fillStyle = S.mix(col, '#000000', .2); g.fillRect(x + bw - 6, y, 6, 500 - y);
    }
    // posters pasted at street level
    for (const [x, tx, c1] of [[60, 'C.N.T.', '#c8202a'], [500, 'P.O.U.M.', '#c8202a'], [780, 'P.S.U.C.', '#c83a2a'], [1110, 'NO PASARÁN', '#e8d8b0']]) { g.fillStyle = c1; g.fillRect(x, 380, 70, 52); g.fillStyle = c1 === '#e8d8b0' ? '#2a2a2a' : '#f0e8d8'; g.font = 'bold 11px Georgia'; g.textAlign = 'center'; g.fillText(tx, x + 35, 400); g.fillRect(x + 12, 412, 46, 3); }
    cobbles(g, 500, w, h, '#a8a098', '#6a645c', 9);
    const ao = g.createLinearGradient(0, 500, 0, 540); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 500, w, 40);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 380 + i * 58 + (r % 2) * 29, y = 600 - r * 26; g.fillStyle = S.mix('#b8a888', '#8a7a5a', S.rng(i + r * 9 + 743)()); g.beginPath(); g.ellipse(x, y, 30, 15, 0, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#5a4a2a', .6); g.lineWidth = 2; g.stroke(); g.beginPath(); g.moveTo(x - 6, y - 14); g.lineTo(x - 6, y + 14); g.stroke(); g.fillStyle = S.rgba('#ffffff', .15); g.beginPath(); g.ellipse(x - 8, y - 6, 14, 4, 0, 0, TAU); g.fill(); }
    wood(g, 820, 520, 120, 60, '#6a4a2a', 745); for (const cx of [840, 920]) { g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(cx, 590, 22, 0, TAU); g.fill(); g.strokeStyle = '#7a5a3a'; g.lineWidth = 2; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; line(g, cx, 590, cx + Math.cos(a) * 18, 590 + Math.sin(a) * 18); } }
  });
  // ======================== A TRENCH ON THE ARAGON FRONT AT DAWN ========================
  VP.set('trench', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a4a6a'], [.35, '#c88a6a'], [.5, '#f0c890']]);
    S.dabs(g, { x: 0, y: 80, w, h: 140, n: 40, cols: ['#e8a880', '#a8788a'], r0: 30, r1: 80, sq: .25, a0: .15, a1: .35, seed: 749 });
    hill(g, 300, 40, 300, 751, '#5a5a6a', ['#6a6a7a', '#3a3a4a'], w, h);
    // a shelled village on the far ridge
    for (let i = 0; i < 8; i++) { const r = S.rng(i + 752), x = 760 + i * 46, y = 300 - (i % 3) * 6, bh = 18 + r() * 22; g.fillStyle = '#6a5a5a'; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - bh); g.lineTo(x + 14, y - bh + 8 * r()); g.lineTo(x + 26, y - bh - 6 * r()); g.lineTo(x + 38, y); g.fill(); g.fillStyle = '#2a2224'; g.fillRect(x + 10, y - bh + 10, 6, 8); }
    g.fillStyle = '#6a5a44'; g.fillRect(0, 300, w, 160); S.strokes(g, { x: 0, y: 300, w, h: 160, n: 800, cols: ['#8a7a5a', '#4a3a2a', '#7a6a4a'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2, a0: .3, a1: .55, seed: 753 });
    for (let i = 0; i < 12; i++) { const r = S.rng(i + 754), x = r() * w, y = 330 + r() * 100, s = 10 + r() * 18; g.fillStyle = '#3a2e22'; g.beginPath(); g.ellipse(x, y, s * 1.6, s * .4, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#a8987a', .5); g.beginPath(); g.ellipse(x, y - s * .2, s * 1.9, s * .3, 0, Math.PI, TAU); g.fill(); }
    for (let x = 30; x < w; x += 110) { g.fillStyle = '#3a2a1a'; g.fillRect(x, 334, 5, 36); g.save(); g.translate(x + 2, 334); g.rotate(.2); g.fillRect(-2, -4, 4, 8); g.restore(); }
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 1.2; for (let x = 0; x < w; x += 6) { g.beginPath(); g.arc(x, 352 + Math.sin(x * .1) * 4, 8, 0, Math.PI * 1.6); g.stroke(); } for (let x = 0; x < w; x += 14) { g.fillStyle = '#2a2a2a'; g.fillRect(x, 340 + Math.sin(x * .07) * 3, 3, 2); }
    g.fillStyle = '#5a4a34'; g.fillRect(0, 440, w, 280); S.strokes(g, { x: 0, y: 440, w, h: 280, n: 1200, cols: ['#6a5a3a', '#3a2a1a', '#7a6a4a'], l0: 10, l1: 40, ang: .1, jit: .3, w0: 1, w1: 3, a0: .2, a1: .45, seed: 755 });
    // revetment planks and posts on the trench wall
    for (let x = 0; x < w; x += 130) { wood(g, x, 500, 8, 170, '#4a3420', 756 + x); } for (let y = 520; y < 660; y += 34) { g.strokeStyle = S.rgba('#2a1a0a', .5); g.lineWidth = 2; line(g, 0, y, w, y); }
    for (let row = 0; row < 2; row++) for (let i = 0; i < 25; i++) { const x = i * 54 + (row % 2) * 27 - 10, y = 456 - row * 18; g.fillStyle = S.mix('#a8987a', '#7a6a4a', S.rng(i + row * 30 + 757)()); g.beginPath(); g.ellipse(x, y, 30, 13, 0, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#4a3a1a', .5); g.lineWidth = 2; g.stroke(); g.beginPath(); g.moveTo(x - 10, y - 12); g.lineTo(x - 10, y + 12); g.stroke(); g.fillStyle = S.rgba('#ffffff', .12); g.beginPath(); g.ellipse(x - 6, y - 5, 14, 4, 0, 0, TAU); g.fill(); }
    // ammunition crates and a firing step
    for (const [cx, cy] of [[180, 640], [1060, 636]]) { wood(g, cx, cy, 70, 34, '#6a5a32', cx); g.fillStyle = '#2a2a1a'; g.font = 'bold 9px Georgia'; g.textAlign = 'center'; g.fillText('7,92', cx + 35, cy + 20); g.strokeStyle = '#3a2a1a'; g.lineWidth = 2; g.strokeRect(cx, cy, 70, 34); }
    wood(g, 0, 620, w, 14, '#5a4028', 761);
    for (let x = 0; x < w; x += 30) wood(g, x, 680, 26, 12, '#6a4a2a', 759 + x);
  });
  // ======================== THE PYRENEES IN SNOW ========================
  VP.set('pyrenees', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a96a8'], [.5, '#d8dce4']]);
    S.dabs(g, { x: 0, y: 20, w, h: 200, n: 60, cols: ['#c8ccd8', '#a8b0c0'], r0: 30, r1: 90, sq: .35, a0: .2, a1: .4, seed: 760 });
    const rng = (y0, amp, fr, sd, col, snowC, rock) => { const top = x => y0 - amp * S.fbm(x / fr, sd) - amp * .35 * Math.abs(Math.sin(x / (fr * .6) + sd)); g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 5) g.lineTo(x, top(x)); g.lineTo(w, h); g.fill();
      S.strokes(g, { x: 0, y: y0 - amp * 1.4, w, h: amp * 2, n: 700, cols: [rock, S.mix(col, '#000000', .25)], l0: 8, l1: 26, ang: 1.15, jit: .4, w0: 1, w1: 2.5, a0: .3, a1: .6, seed: sd + 1, mask: (px, py) => py > top(px) + 6 });
      S.dabs(g, { x: 0, y: y0 - amp * 1.4, w, h: amp * 1.6, n: 1400, cols: [snowC, '#ffffff', '#dfe6f0'], r0: 2, r1: 6, sq: .3, ang: .4, a0: .6, a1: 1, seed: sd + 2, mask: (px, py) => py > top(px) && py < top(px) + 22 + 40 * S.noise(px / 30, sd) }); };
    rng(300, 150, 160, 762, '#5a6478', '#f0f4f8', '#7a8498');
    const hz = g.createLinearGradient(0, 160, 0, 420); hz.addColorStop(0, 'rgba(220,226,236,0)'); hz.addColorStop(1, 'rgba(220,226,236,.5)'); g.fillStyle = hz; g.fillRect(0, 160, w, 260);
    rng(440, 110, 220, 764, '#7a8498', '#f4f6fa', '#9aa4b4');
    g.fillStyle = '#eef2f6'; g.beginPath(); g.moveTo(0, 520); g.quadraticCurveTo(640, 430, 1280, 520); g.lineTo(1280, 720); g.lineTo(0, 720); g.fill();
    S.dabs(g, { x: 0, y: 440, w, h: 280, n: 500, cols: ['#ffffff', '#c8d0dc', '#dde4ee'], r0: 8, r1: 30, sq: .3, a0: .2, a1: .45, seed: 761 });
    // trodden trail winding up to the pass
    g.strokeStyle = S.rgba('#8a8a94', .55); g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-20, 690); g.quadraticCurveTo(400, 610, 560, 520); g.quadraticCurveTo(720, 450, 840, 300); g.stroke(); g.strokeStyle = S.rgba('#5a5a64', .3); g.lineWidth = 4; g.stroke();
    // snowy firs at varied scale
    for (let i = 0; i < 26; i++) { const r = S.rng(i + 763), x = r() * w, y = 470 + r() * 220, s = .6 + (y - 470) / 220 * .9; if (Math.abs(y - (690 - (x + 20) * .3)) < 30 && x < 560) continue; g.fillStyle = '#4a3a2a'; g.fillRect(x - 3 * s, y - 10 * s, 6 * s, 10 * s); for (let k = 0; k < 4; k++) { const ty = y - 10 * s - k * 16 * s, tw = (26 - k * 5) * s; g.fillStyle = '#1e3226'; g.beginPath(); g.moveTo(x, ty - 22 * s); g.lineTo(x - tw, ty); g.lineTo(x + tw, ty); g.fill(); g.fillStyle = '#f4f6fa'; g.beginPath(); g.moveTo(x, ty - 22 * s); g.lineTo(x - tw * .7, ty - 6 * s); g.quadraticCurveTo(x, ty - 2 * s, x + tw * .5, ty - 8 * s); g.fill(); } }
  });
})(window);
