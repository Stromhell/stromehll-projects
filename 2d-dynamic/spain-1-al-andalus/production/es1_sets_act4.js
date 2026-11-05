// Spain 1, act 4 (The Kingdom Breaks): the bell road, the parley hill, Valencia's walls, the pass at Las Navas.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { cypress, tower, town, arch, hill, sky, dome, minaret } = X;
  const olive = (g, x, y, s, seed) => { g.fillStyle = '#5a4a3a'; g.beginPath(); g.moveTo(x - 4 * s, y); g.quadraticCurveTo(x - 8 * s, y - 20 * s, x - 2 * s, y - 34 * s); g.lineTo(x + 4 * s, y - 34 * s); g.quadraticCurveTo(x + 2 * s, y - 16 * s, x + 6 * s, y); g.fill();
    S.dabs(g, { x: x - 36 * s, y: y - 76 * s, w: 72 * s, h: 50 * s, n: 50, cols: ['#7a8a5a', '#5a6a42', '#9aa878', '#4a5a38'], r0: 5 * s, r1: 12 * s, sq: .6, a0: .7, a1: 1, seed, mask: (px, py) => (px - x) ** 2 / (36 * s) ** 2 + (py - y + 50 * s) ** 2 / (24 * s) ** 2 < 1 }); };
  X.olive = olive;

  // ======================== THE DUSTY ROAD (bells carried south) ========================
  VP.set('road', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa0c8'], [.45, '#f0e0c0'], [.6, '#f4c890']]);
    hill(g, 300, 50, 220, 1801, '#b8a07a', ['#d0b88a', '#8a7a5a'], w, h);
    hill(g, 360, 40, 160, 1803, '#c8a870', ['#e0c088', '#9a7a4a'], w, h);
    g.fillStyle = '#d8b880'; g.fillRect(0, 380, w, h - 380);
    S.strokes(g, { x: 0, y: 380, w, h: 340, n: 1000, cols: ['#f0d8a0', '#a8865a', '#c8a870'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 1805 });
    // the road running diagonally toward the horizon
    g.fillStyle = '#e8cc98'; g.beginPath(); g.moveTo(-100, 720); g.bezierCurveTo(300, 560, 700, 450, 1280, 400); g.lineTo(1280, 420); g.bezierCurveTo(760, 490, 420, 640, 260, 720); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 400, w, h: 320, n: 300, cols: ['#c8a870', '#f8e4b8'], l0: 10, l1: 30, ang: -.3, jit: .1, w0: 1, w1: 2, a0: .2, a1: .4, seed: 1807 });
    for (let i = 0; i < 12; i++) { const r = S.rng(i + 1810); olive(g, r() * w, 400 + r() * 40 + (i % 2) * 220, .7 + (i % 2) * .5, 1820 + i); }
  });

  // ======================== THE PARLEY HILL ========================
  VP.set('parley', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a90c0'], [.5, '#e8e0c8'], [.65, '#f0d0a0']]);
    hill(g, 320, 60, 200, 1831, '#a8a07a', ['#c8bc90', '#7a7a5a'], w, h);
    // the meadow in front
    g.fillStyle = '#b8b07a'; g.beginPath(); g.moveTo(0, 520); g.bezierCurveTo(300, 500, 600, 530, 1280, 520); g.lineTo(1280, 720); g.lineTo(0, 720); g.fill();
    S.strokes(g, { x: 0, y: 500, w: 1280, h: 220, n: 700, cols: ['#d8d098', '#7a7a4a', '#9aa060'], l0: 6, l1: 16, ang: 1.3, jit: .3, w0: 1, w1: 2, a0: .3, a1: .6, seed: 1835 });
    // a far hill with a watching king and his tent, on the right
    g.fillStyle = '#9a9a6a'; g.beginPath(); g.moveTo(800, 720); g.bezierCurveTo(900, 380, 1100, 350, 1280, 380); g.lineTo(1280, 720); g.fill();
    S.dabs(g, { x: 800, y: 350, w: 480, h: 370, n: 300, cols: ['#b8b080', '#7a7a4a', '#c8c094'], r0: 6, r1: 18, sq: .5, a0: .2, a1: .45, seed: 1833, mask: (x, y) => y > 370 + Math.max(0, 1050 - x) * .3 });
    g.fillStyle = '#e8dcc2'; g.beginPath(); g.moveTo(1040, 380); g.lineTo(1090, 320); g.lineTo(1140, 380); g.fill(); g.fillStyle = '#c8402a'; g.fillRect(1086, 300, 4, 22);
    for (let i = 0; i < 5; i++) olive(g, 60 + i * 170, 520, .9, 1840 + i);
  });

  // ======================== VALENCIA: walls by the sea ========================
  VP.set('valencia', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a7ab8'], [.55, '#f0d8b0'], [.65, '#f0b080']]);
    // the sea on the right
    g.fillStyle = '#4a8aa8'; g.fillRect(780, 380, 500, 120); S.strokes(g, { x: 780, y: 380, w: 500, h: 120, n: 300, cols: ['#c8e8f0', '#2a5a7a'], l0: 10, l1: 30, ang: 0, jit: .05, w0: 1, w1: 2, a0: .2, a1: .5, seed: 1851 });
    // the city walls with towers and the town behind
    town(g, { x: 80, y: 250, w: 760, h: 110, n: 300, seed: 1853, scale: .8, wall: '#f0dcb0', wall2: '#d8b888', shade: '#9a7a5a', roof: '#c06a44', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: () => true });
    minaret(g, 440, 300, 22, 130, '#f0dcb4', '#c8a880');
    g.fillStyle = '#d8b888'; g.fillRect(60, 330, 800, 130); for (let i = 0; i < 40; i++) { g.fillStyle = '#d8b888'; g.fillRect(60 + i * 20, 318, 12, 14); }
    for (const x of [60, 260, 460, 660, 840]) tower(g, x, 470, 56, 190, '#e8d0a4', '#b8986e', '#fff4dc');
    g.fillStyle = '#2a1a10'; g.fill(arch(360, 460, 70, 100));
    // the plain in front
    const pl = g.createLinearGradient(0, 460, 0, h); pl.addColorStop(0, '#c8a870'); pl.addColorStop(1, '#9a7a48'); g.fillStyle = pl; g.fillRect(0, 460, w, h - 460);
    S.strokes(g, { x: 0, y: 460, w, h: 260, n: 800, cols: ['#e0c890', '#7a5a34'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 1855 });
    for (let i = 0; i < 6; i++) cypress(g, 900 + i * 60, 500, 34, '#3a5a2a', '#d8c070');
  });

  // ======================== THE PASS at Las Navas de Tolosa ========================
  VP.set('pass', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a7aa8'], [.5, '#e0d8c0'], [.7, '#e8c090']]);
    hill(g, 220, 120, 140, 1861, '#8a8478', ['#a8a090', '#5a564e'], w, h);
    // the two sides of the pass
    g.fillStyle = '#7a6a52'; g.beginPath(); g.moveTo(0, 720); g.lineTo(0, 220); g.bezierCurveTo(200, 260, 360, 340, 440, 480); g.lineTo(380, 720); g.fill();
    g.fillStyle = '#6a5a46'; g.beginPath(); g.moveTo(w, 720); g.lineTo(w, 200); g.bezierCurveTo(1080, 260, 920, 360, 860, 480); g.lineTo(920, 720); g.fill();
    S.dabs(g, { x: 0, y: 200, w, h: 520, n: 700, cols: ['#9a8a6a', '#4a3e30', '#6a7a4a'], r0: 8, r1: 22, sq: .5, ang: .9, a0: .2, a1: .45, seed: 1863, mask: (x, y) => x < 440 - (720 - y) * .3 || x > 860 + (720 - y) * .3 });
    // the valley floor
    const fl = g.createLinearGradient(0, 420, 0, h); fl.addColorStop(0, '#c8a878'); fl.addColorStop(1, '#8a6a42'); g.fillStyle = fl; g.beginPath(); g.moveTo(380, 720); g.lineTo(440, 480); g.bezierCurveTo(560, 430, 740, 430, 860, 480); g.lineTo(920, 720); g.fill();
    for (let i = 0; i < 20; i++) { const r = S.rng(i + 1870), x = 300 + r() * 700, y = 470 + r() * 240; S.dabs(g, { x: x - 14, y: y - 10, w: 28, h: 20, n: 8, cols: ['#5a6a3a', '#7a7a4a'], r0: 3, r1: 8, sq: .7, a0: .5, a1: .9, seed: i + 1880 }); }
  });
})(window);
