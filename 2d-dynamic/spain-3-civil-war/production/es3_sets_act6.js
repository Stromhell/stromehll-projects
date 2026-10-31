// Spain 3 sets for act 6 (the transition, 1975-1992): a hospital room and the 1992 Olympic stadium at night.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky } = X;
  VP.set('hospital', 1280, 720, (g, w, h) => {
    g.fillStyle = '#c8ccc0'; g.fillRect(0, 0, w, 520); S.dabs(g, { x: 0, y: 0, w, h: 520, n: 200, cols: ['#d8dcd0', '#a8aca0'], r0: 10, r1: 40, a0: .15, a1: .3, seed: 901 });
    g.fillStyle = '#8a9a88'; g.fillRect(0, 380, w, 140);
    // window with drawn curtains
    g.fillStyle = '#e8ecf0'; g.fillRect(820, 80, 260, 260); for (const [x0, dir] of [[820, 1], [1080, -1]]) { g.fillStyle = '#9a8a6a'; g.beginPath(); g.moveTo(x0, 70); g.lineTo(x0 + 130 * dir, 70); g.quadraticCurveTo(x0 + 110 * dir, 220, x0 + 130 * dir, 350); g.lineTo(x0, 350); g.fill(); S.strokes(g, { x: Math.min(x0, x0 + 130 * dir), y: 70, w: 130, h: 280, n: 60, cols: ['#b8a888', '#6a5a3a'], l0: 40, l1: 120, ang: Math.PI / 2, jit: .05, w0: 2, w1: 5, a0: .2, a1: .45, seed: 903 + x0 }); }
    // the bed and a drip stand
    g.fillStyle = '#d8d8d4'; g.fillRect(260, 430, 520, 90); g.fillStyle = '#f0f0ec'; g.fillRect(250, 400, 540, 40); g.fillStyle = '#e8e8e4'; g.beginPath(); g.ellipse(310, 400, 50, 18, 0, 0, TAU); g.fill(); g.fillStyle = '#5a5a5a'; g.fillRect(250, 350, 10, 170); g.fillRect(780, 380, 10, 140);
    g.strokeStyle = '#8a8a8a'; g.lineWidth = 3; g.beginPath(); g.moveTo(200, 520); g.lineTo(200, 200); g.lineTo(240, 200); g.stroke(); g.fillStyle = S.rgba('#e0f0f8', .8); g.fillRect(226, 206, 24, 40);
    g.fillStyle = '#9a9a8a'; g.fillRect(0, 520, w, h - 520); for (let x = 0; x < w; x += 60) for (let y = 520; y < h; y += 60) { g.fillStyle = (x + y) / 60 % 2 ? '#a8a898' : '#8a8a7a'; g.fillRect(x, y, 60, 60); }
  });
  VP.set('olympic', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a0e24'], [.55, '#2a2a4a'], [.7, '#4a3a5a']]);
    for (let i = 0; i < 60; i++) { const r = S.rng(i + 911); g.fillStyle = S.rgba('#ffffff', .2 + r() * .4); g.fillRect(r() * w, r() * 280, 2, 2); }
    // Montjuïc stadium: the long classical facade with arches
    g.fillStyle = '#c8b898'; g.fillRect(140, 330, 1000, 200); g.fillStyle = '#a8987a'; g.fillRect(140, 330, 1000, 18);
    for (let i = 0; i < 16; i++) { const x = 180 + i * 60; g.fillStyle = '#2a2430'; g.beginPath(); g.moveTo(x, 520); g.lineTo(x, 420); g.arc(x + 20, 420, 20, Math.PI, 0); g.lineTo(x + 40, 520); g.fill(); }
    g.fillStyle = '#e8d8b8'; g.fillRect(560, 250, 160, 90); g.fillStyle = '#8a7a5a'; g.fillRect(560, 250, 160, 10);
    // the floodlights
    for (const x of [200, 1080]) { g.fillStyle = '#3a3a44'; g.fillRect(x - 4, 180, 8, 160); g.fillStyle = '#f4f0d8'; g.fillRect(x - 30, 170, 60, 20); }
    g.fillStyle = '#2a2a30'; g.fillRect(0, 530, w, h - 530); g.fillStyle = '#3a3a40'; g.fillRect(0, 530, w, 10);
  });
})(window);
