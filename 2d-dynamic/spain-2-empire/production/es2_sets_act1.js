// Spain 2, act 1 sets: a Caribbean beach.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const sky = (g, w, h, stops) => { const gr = g.createLinearGradient(0, 0, 0, h); for (const [o, c] of stops) gr.addColorStop(o, c); g.fillStyle = gr; g.fillRect(0, 0, w, h); };
  const palm = (g, x, y, hh, lean, seed) => { const r = S.rng(seed); g.strokeStyle = '#6a4a2a'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + lean * .3, y - hh * .6, x + lean, y - hh); g.stroke();
    g.strokeStyle = S.rgba('#c89a6a', .6); g.lineWidth = 3; for (let k = 0; k < 8; k++) { const t = k / 8, px = x + lean * t * t, py = y - hh * t; g.beginPath(); g.moveTo(px - 5, py); g.lineTo(px + 5, py - 2); g.stroke(); }
    const tx = x + lean, ty = y - hh; for (let k = 0; k < 9; k++) { const a = -Math.PI + k / 8 * Math.PI + (r() - .5) * .3, L = 90 + r() * 50; g.fillStyle = k % 2 ? '#2f7a3a' : '#3e9a48'; g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(tx + Math.cos(a) * L * .6, ty + Math.sin(a) * L * .6 - 30, tx + Math.cos(a) * L, ty + Math.sin(a) * L * .5 + 40); g.quadraticCurveTo(tx + Math.cos(a) * L * .5, ty + Math.sin(a) * L * .3 - 6, tx, ty); g.fill(); }
    g.fillStyle = '#5a3a1a'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(tx - 8 + k * 8, ty + 8, 7, 0, TAU); g.fill(); } };
  X.palm = palm;
  VP.set('caribbean', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a8ad0'], [.45, '#a8e0f0'], [.52, '#fff4dc']]);
    S.dabs(g, { x: 0, y: 40, w, h: 240, n: 400, cols: ['#ffffff', '#e8f6fc'], r0: 20, r1: 120, sq: .25, ang: -.05, jit: .1, a0: .08, a1: .25, seed: 311 });
    const sea = g.createLinearGradient(0, 370, 0, 520); sea.addColorStop(0, '#2a9ab8'); sea.addColorStop(1, '#5ad8d0'); g.fillStyle = sea; g.fillRect(0, 370, w, 160);
    S.strokes(g, { x: 0, y: 370, w, h: 160, n: 600, cols: ['#e8fcff', '#1a7a98'], l0: 8, l1: 28, ang: 0, jit: .05, w0: 1, w1: 2, a0: .2, a1: .5, seed: 313 });
    // surf line and sand
    g.fillStyle = '#f0e2b8'; g.beginPath(); g.moveTo(0, 520); for (let x = 0; x <= w; x += 40) g.lineTo(x, 512 + Math.sin(x * .02) * 8); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    g.strokeStyle = S.rgba('#ffffff', .8); g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= w; x += 40) { const y = 512 + Math.sin(x * .02) * 8; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    S.dabs(g, { x: 0, y: 520, w, h: 200, n: 600, cols: ['#e8d4a0', '#fff4d0', '#c8b080'], r0: 4, r1: 18, sq: .5, a0: .15, a1: .4, seed: 317 });
    // treeline jungle on the right
    S.dabs(g, { x: 820, y: 330, w: 460, h: 220, n: 500, cols: ['#2f6a3a', '#1e4a28', '#4a8a48', '#6aa858'], r0: 12, r1: 40, sq: .7, a0: .5, a1: .9, seed: 319, mask: (x, y) => y > 520 - (x - 820) * .5 });
    for (const [x, y, hh, l, s] of [[1000, 540, 260, -60, 1], [1120, 560, 300, -90, 2], [1220, 540, 240, -40, 3], [80, 560, 220, 50, 4]]) palm(g, x, y, hh, l, s);
  });
})(window);
