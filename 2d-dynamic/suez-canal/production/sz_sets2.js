// Suez sets for acts 2-6 (Ottoman map room, French camp, London office, tent, night camp, palace, ceremony, Cairo square)
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, wood, grain } = S.JPX; const Z = S.SZ;
  const tiles = (g, x, y, w, h, c1, c2, sz, seed) => { for (let yy = y; yy < y + h; yy += sz) for (let xx = x; xx < x + w; xx += sz) { const r = S.rng(seed + xx * 7 + yy)(); g.fillStyle = r > .5 ? c1 : c2; g.fillRect(xx, yy, sz - 2, sz - 2); g.fillStyle = S.rgba('#ffffff', .15); g.beginPath(); g.arc(xx + sz / 2 - 1, yy + sz / 2 - 1, sz * .22, 0, TAU); g.fill(); } };
  const arch = (g, x, y, w, h, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.quadraticCurveTo(x, y, x + w / 2, y - w * .1); g.quadraticCurveTo(x + w, y, x + w, y + w / 2); g.lineTo(x + w, y + h); g.fill(); };
  const carpet = (g, x, y, w, h, c1, c2, seed) => { g.fillStyle = c1; g.fillRect(x, y, w, h); g.strokeStyle = c2; g.lineWidth = 6; g.strokeRect(x + 12, y + 8, w - 24, h - 16); for (let k = 0; k < 12; k++) { g.fillStyle = S.rgba(c2, .6); g.beginPath(); g.ellipse(x + 40 + k * (w - 80) / 11, y + h / 2, 10, 6, 0, 0, TAU); g.fill(); } S.dabs(g, { x, y, w, h, n: 80, cols: ['#000000', '#ffffff'], r0: 4, r1: 12, a0: .03, a1: .08, seed }); };
  S.SZS = { tiles, arch, carpet };

  // ===== Ottoman map room, Istanbul 1568: arches, Iznik tiles, a low table, windows onto the Bosphorus
  VP.set('sz_maproom', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a2a24'], [1, '#5a4030']]);
    tiles(g, 0, 60, w, 380, '#2a5a8a', '#e8e4dc', 32, 2101);
    g.fillStyle = S.rgba('#1a1210', .35); g.fillRect(0, 60, w, 380);
    for (const x of [90, 520, 950]) { arch(g, x, 90, 240, 320, '#c8b48a'); arch(g, x + 14, 104, 212, 306, '#8ab0c8');
      const gr = g.createLinearGradient(0, 120, 0, 410); gr.addColorStop(0, '#a8c8e0'); gr.addColorStop(1, '#e8dcc0'); g.fillStyle = gr; arch(g, x + 14, 104, 212, 306, gr);
      g.fillStyle = '#6a7a8a'; g.fillRect(x + 14, 320, 212, 30); for (let k = 0; k < 4; k++) { g.fillStyle = '#8a8a9a'; g.beginPath(); g.moveTo(x + 30 + k * 50, 320); g.lineTo(x + 40 + k * 50, 270 - k * 6); g.lineTo(x + 50 + k * 50, 320); g.fill(); g.fillRect(x + 36 + k * 50, 260 - k * 6, 4, 14); }
      g.strokeStyle = '#5a4430'; g.lineWidth = 4; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x + 14 + k * 53, 120); g.lineTo(x + 14 + k * 53, 410); g.stroke(); } }
    g.fillStyle = '#7a5434'; g.fillRect(0, 0, w, 64); g.fillStyle = '#c8a040'; g.fillRect(0, 56, w, 8);
    for (let k = 0; k < 20; k++) { g.fillStyle = '#5a3a20'; g.fillRect(k * 66, 8, 50, 40); }
    g.fillStyle = '#6a4a2e'; g.fillRect(0, 440, w, 280); carpet(g, 140, 520, 1000, 200, '#8a2a2a', '#d8a850', 2103);
    S.glow(g, 640, 250, 600, '#fff0c8', .2);
    grain(g, w, h, 2105, .05);
  });

  // ===== French army camp in the desert, 1798: tents, tricolours, a cannon
  VP.set('sz_camp', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab4d8'], [.5, '#f0e0bc'], [1, '#d8b07a']]);
    ridge(g, w, h, 330, 30, 260, 2201, '#d8b07a'); ridge(g, w, h, 380, 20, 200, 2203, '#c89a62');
    Z.sand(g, 400, w, h, '#d8b07a', '#b08250', 2205);
    for (const [x, y, s] of [[150, 420, 1], [380, 400, .8], [930, 405, .85], [1150, 425, 1]]) { g.fillStyle = '#e8e0cc'; g.beginPath(); g.moveTo(x - 80 * s, y); g.lineTo(x, y - 90 * s); g.lineTo(x + 80 * s, y); g.fill(); g.fillStyle = '#c8bca4'; g.beginPath(); g.moveTo(x, y - 90 * s); g.lineTo(x + 80 * s, y); g.lineTo(x + 20 * s, y); g.fill(); g.fillStyle = '#5a4a3a'; g.beginPath(); g.moveTo(x - 14 * s, y); g.lineTo(x, y - 40 * s); g.lineTo(x + 14 * s, y); g.fill();
      g.strokeStyle = '#5a3a1e'; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y - 90 * s); g.lineTo(x, y - 130 * s); g.stroke(); [['#2a4a9a', 0], ['#f4f0e8', 1], ['#c82a2a', 2]].forEach(([col, i]) => { g.fillStyle = col; g.fillRect(x + i * 12 * s, y - 130 * s, 12 * s, 22 * s); }); }
    g.fillStyle = '#3a3a3a'; g.beginPath(); g.ellipse(640, 470, 70, 14, -.1, 0, TAU); g.fill(); for (const x of [600, 690]) { g.strokeStyle = '#5a3a1e'; g.lineWidth = 5; g.beginPath(); g.arc(x, 480, 22, 0, TAU); g.stroke(); }
    grain(g, w, h, 2207, .04);
  });
})(window);
