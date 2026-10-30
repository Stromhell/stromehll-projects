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
    grain(g, w, h, 2207, .04);
  });

  // ===== London street, 1850s: brick terraces, gas lamps, Parliament's clock tower in the haze, cobbles
  VP.set('sz_london', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9aa0a8'], [.6, '#c8c4b8'], [1, '#8a8478']]);
    g.fillStyle = S.rgba('#6a6a70', .6); g.fillRect(1000, 110, 60, 260); g.beginPath(); g.moveTo(992, 110); g.lineTo(1030, 40); g.lineTo(1068, 110); g.fill(); g.fillStyle = S.rgba('#d8d0b0', .7); g.beginPath(); g.arc(1030, 150, 18, 0, TAU); g.fill();
    g.fillStyle = S.rgba('#7a7a80', .5); g.fillRect(820, 220, 420, 150); for (let k = 0; k < 14; k++) g.fillRect(826 + k * 30, 200, 8, 24);
    for (let b = 0; b < 4; b++) { const x = b * 230 - 20, top = 90 + (b % 2) * 30; g.fillStyle = ['#8a4a34', '#7a4030', '#94543a', '#6e3a2a'][b]; g.fillRect(x, top, 230, 420 - top + 60);
      S.dabs(g, { x, y: top, w: 230, h: 400, n: 120, cols: ['#5a2a1a', '#b07050'], r0: 2, r1: 6, sq: .4, a0: .15, a1: .3, seed: 2300 + b });
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const wx = x + 26 + k * 70, wy = top + 30 + r * 90; g.fillStyle = '#e8e0cc'; g.fillRect(wx - 4, wy - 4, 48, 66); g.fillStyle = r === 2 && k === 1 ? '#3a2a1a' : '#3a4a5a'; g.fillRect(wx, wy, 40, 58); g.fillStyle = S.rgba('#ffe0a0', b % 2 ? .25 : 0); g.fillRect(wx, wy, 40, 58); g.fillStyle = '#e8e0cc'; g.fillRect(wx + 18, wy, 4, 58); g.fillRect(wx, wy + 27, 40, 4); }
      g.fillStyle = '#2a2a2a'; g.fillRect(x + 90, 420, 50, 60); g.fillStyle = '#e8e0cc'; g.fillRect(x, top - 10, 230, 12); g.fillStyle = '#3a2a24'; g.fillRect(x + 30, top - 40, 30, 32); g.fillRect(x + 160, top - 50, 26, 42); }
    g.fillStyle = '#7a7470'; g.fillRect(0, 480, w, 40); g.fillStyle = '#5a5450'; g.fillRect(0, 516, w, 6);
    g.fillStyle = '#6a645c'; g.fillRect(0, 522, w, 198); for (let r = 0; r < 12; r++) for (let k = 0; k < 40; k++) { const rr = S.rng(2400 + r * 41 + k)(); g.fillStyle = S.rgba(rr > .5 ? '#8a847a' : '#4a4640', .5); g.beginPath(); g.ellipse(k * 34 + (r % 2) * 17, 530 + r * 16, 14, 6, 0, 0, TAU); g.fill(); }
    for (const x of [120, 700, 1180]) { g.fillStyle = '#1e1e1e'; g.fillRect(x - 4, 330, 8, 160); g.fillRect(x - 12, 486, 24, 6); g.fillStyle = '#2a2a2a'; g.beginPath(); g.moveTo(x - 16, 330); g.lineTo(x + 16, 330); g.lineTo(x + 10, 296); g.lineTo(x - 10, 296); g.fill(); g.fillStyle = S.rgba('#ffe8a0', .6); g.fillRect(x - 9, 302, 18, 24); }
    S.dabs(g, { x: 0, y: 0, w, h: 500, n: 120, cols: ['#c8c4b8', '#9a9a9a'], r0: 30, r1: 90, a0: .05, a1: .12, seed: 2450 });
    grain(g, w, h, 2460, .05);
  });
})(window);
