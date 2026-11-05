// Japan act 1 sets: ration office street, black market under the rail bridge, the embassy room, a terraced rice village.
(function (G) {
  const S = G.S, VP = G.VP, J = S.JPX, TAU = Math.PI * 2, { sky, ridge, wood, tin, grain } = J;
  const roofTiles = (g, x, y, w, h, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - 14, y + h); g.lineTo(x + 8, y); g.lineTo(x + w - 8, y); g.lineTo(x + w + 14, y + h); g.fill(); for (let i = 0; i < w + 20; i += 9) { g.fillStyle = S.rgba('#000000', .25); g.fillRect(x - 10 + i, y + 2, 2, h - 2); } g.fillStyle = S.rgba('#ffffff', .15); g.fillRect(x + 8, y, w - 16, 3); };
  const machiya = (g, x, base, w, ht, seed, o = {}) => { wood(g, x, base - ht, w, ht, o.col || '#5a3e28', seed); roofTiles(g, x, base - ht - 26, w, 26, '#3a3a40');
    g.fillStyle = '#d8c8a0'; for (let k = 0; k < Math.floor(w / 40); k++) { const wx = x + 8 + k * 40; g.fillRect(wx, base - ht + 16, 30, 34); g.strokeStyle = '#3a2618'; g.lineWidth = 2; g.strokeRect(wx, base - ht + 16, 30, 34); g.beginPath(); g.moveTo(wx + 15, base - ht + 16); g.lineTo(wx + 15, base - ht + 50); g.moveTo(wx, base - ht + 33); g.lineTo(wx + 30, base - ht + 33); g.stroke(); }
    if (o.noren) { const nx = x + w / 2 - 40; for (let k = 0; k < 4; k++) { g.fillStyle = o.noren; g.fillRect(nx + k * 20, base - 70, 18, 34); } g.fillStyle = '#f4ead4'; g.font = 'bold 14px Oswald'; g.textAlign = 'center'; g.fillText(o.sign || '', nx + 40, base - 48); g.textAlign = 'left'; }
    g.fillStyle = '#1e140c'; g.fillRect(x + w / 2 - 22, base - 36, 44, 36); };

  // ======================== RATION OFFICE STREET ========================
  VP.set('jp_ration', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a8a90'], [.5, '#b0aaa0'], [1, '#6a5a50']]);
    S.dabs(g, { x: 0, y: 0, w, h: 260, n: 120, cols: ['#9a9aa0', '#c0b8b0'], r0: 30, r1: 100, sq: .4, a0: .1, a1: .25, seed: 601 });
    ridge(g, w, h, 300, 30, 120, 603, '#7a726a');
    machiya(g, 40, 470, 300, 150, 605); machiya(g, 900, 470, 340, 170, 607);
    // the ration office: a repaired timber building with a notice board and a counter window
    wood(g, 360, 300, 520, 170, '#6a4a30', 609); roofTiles(g, 360, 270, 520, 30, '#2e2e34');
    g.fillStyle = '#e8e0cc'; g.fillRect(400, 330, 150, 70); g.strokeStyle = '#3a2618'; g.lineWidth = 3; g.strokeRect(400, 330, 150, 70); g.fillStyle = '#2a1a10'; for (let k = 0; k < 5; k++) g.fillRect(412, 342 + k * 11, 100 + (k % 2) * 20, 3);
    g.fillStyle = '#1a120c'; g.fillRect(600, 340, 200, 90); g.fillStyle = '#6a4a30'; g.fillRect(590, 428, 220, 14); g.fillStyle = S.rgba('#ffd8a0', .25); g.fillRect(600, 340, 200, 6);
    g.fillStyle = '#f4ead4'; g.fillRect(560, 296, 280, 30); g.fillStyle = '#1a1a1a'; g.font = 'bold 20px Oswald'; g.textAlign = 'center'; g.fillText('配給所 · RATION OFFICE', 700, 318); g.textAlign = 'left';
    // street
    g.fillStyle = '#6a5a4a'; g.fillRect(0, 470, w, h - 470); S.dabs(g, { x: 0, y: 470, w, h: 250, n: 400, cols: ['#4a3e34', '#8a7a68', '#5a4a3a'], r0: 4, r1: 20, sq: .5, a0: .15, a1: .4, seed: 611 });
    for (let i = 0; i < 40; i++) { const r = S.rng(i + 620); g.fillStyle = S.rgba('#3a2e24', .5); g.beginPath(); g.ellipse(r() * w, 480 + r() * 240, 10 + r() * 20, 3, 0, 0, TAU); g.fill(); }
    // telegraph pole with wires
    g.fillStyle = '#3a2a1a'; g.fillRect(860, 180, 10, 300); g.fillRect(836, 200, 58, 6); g.strokeStyle = '#2a2420'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, 220); g.quadraticCurveTo(430, 250, 840, 203); g.moveTo(890, 203); g.quadraticCurveTo(1100, 230, 1280, 210); g.stroke();
    grain(g, w, h, 631, .05);
  });

  // ======================== BLACK MARKET UNDER THE RAIL BRIDGE ========================
  VP.set('jp_market', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a5048'], [1, '#2a2420']]);
    // the steel girder bridge across the top with a riveted web
    g.fillStyle = '#3a3634'; g.fillRect(0, 0, w, 150); for (let x = 0; x < w; x += 60) { g.strokeStyle = '#24201e'; g.lineWidth = 6; g.beginPath(); g.moveTo(x, 20); g.lineTo(x + 60, 130); g.moveTo(x + 60, 20); g.lineTo(x, 130); g.stroke(); }
    g.fillStyle = '#4a4644'; g.fillRect(0, 0, w, 22); g.fillRect(0, 128, w, 26); g.fillStyle = '#8a8480'; for (let x = 6; x < w; x += 14) { g.beginPath(); g.arc(x, 11, 2, 0, TAU); g.arc(x, 140, 2, 0, TAU); g.fill(); }
    g.fillStyle = '#5a5250'; g.fillRect(60, 150, 50, 330); g.fillRect(1170, 150, 50, 330); g.fillStyle = S.rgba('#000000', .3); g.fillRect(96, 150, 14, 330);
    // brick arches behind, lit by bare bulbs
    g.fillStyle = '#5a3a2a'; g.fillRect(110, 150, 1060, 330); for (let y = 150; y < 480; y += 10) for (let x = 110 + (y / 10) % 2 * 12; x < 1170; x += 24) { g.fillStyle = S.rgba('#000000', .15); g.fillRect(x, y, 23, 1); }
    for (const ax of [200, 560, 920]) { g.fillStyle = '#1a120e'; g.beginPath(); g.moveTo(ax, 480); g.lineTo(ax, 260); g.arc(ax + 130, 260, 130, Math.PI, 0); g.lineTo(ax + 260, 480); g.fill(); }
    // stalls: tarps, crates, sacks, cloth, pots
    const stall = (x, col, seed) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - 10, 300); g.lineTo(x + 230, 290); g.lineTo(x + 250, 330); g.lineTo(x - 20, 336); g.fill(); g.fillStyle = S.rgba('#000000', .25); g.fillRect(x - 20, 330, 270, 6);
      g.fillStyle = '#4a3020'; g.fillRect(x, 330, 6, 150); g.fillRect(x + 224, 326, 6, 154); wood(g, x - 10, 410, 250, 26, '#7a5a3a', seed);
      for (let k = 0; k < 5; k++) { const r = S.rng(seed + k); g.fillStyle = ['#d8c8a0', '#8a6a3a', '#c83a2a', '#3a5a7a', '#e8e0d0'][k]; g.beginPath(); g.ellipse(x + 20 + k * 46, 398, 20, 14 + r() * 6, 0, 0, TAU); g.fill(); } };
    stall(150, '#4a5a6a', 641); stall(520, '#7a4a3a', 643); stall(890, '#5a6a4a', 645);
    for (const bx of [290, 650, 1010]) { g.strokeStyle = '#2a2420'; g.lineWidth = 1; g.beginPath(); g.moveTo(bx, 150); g.lineTo(bx, 250); g.stroke(); g.fillStyle = '#fff4c0'; g.beginPath(); g.arc(bx, 256, 7, 0, TAU); g.fill(); S.glow(g, bx, 256, 220, '#ffd890', .35); }
    // ground: packed earth, puddles reflecting the bulbs
    g.fillStyle = '#4a3e34'; g.fillRect(0, 480, w, h - 480); S.dabs(g, { x: 0, y: 480, w, h: 240, n: 400, cols: ['#2a2420', '#6a5a4a', '#3a3028'], r0: 4, r1: 22, sq: .5, a0: .2, a1: .45, seed: 651 });
    for (const [px, py] of [[300, 600], [760, 650], [1060, 590]]) { g.fillStyle = S.rgba('#6a7a8a', .5); g.beginPath(); g.ellipse(px, py, 70, 12, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#fff0c0', .3); g.beginPath(); g.ellipse(px - 10, py - 2, 20, 3, 0, 0, TAU); g.fill(); }
    g.fillStyle = '#f4ead4'; g.fillRect(560, 168, 160, 26); g.fillStyle = '#1a1a1a'; g.font = 'bold 18px Oswald'; g.textAlign = 'center'; g.fillText('闇市 · BLACK MARKET', 640, 188); g.textAlign = 'left';
    grain(g, w, h, 661, .06);
  });

  // ======================== THE AMERICAN EMBASSY ROOM ========================
  VP.set('jp_embassy', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#e8e0d0'], [1, '#c8bca8']]);
    // panelled wall, tall curtained window, framed seascape, a US flag on a pole
    for (let x = 0; x < w; x += 160) { g.strokeStyle = S.rgba('#8a7a60', .6); g.lineWidth = 3; g.strokeRect(x + 14, 60, 132, 230); g.strokeRect(x + 14, 320, 132, 160); }
    g.fillStyle = '#b8ac94'; g.fillRect(0, 300, w, 12); g.fillStyle = '#a89a80'; g.fillRect(0, 0, w, 24);
    g.fillStyle = '#c8dce8'; g.fillRect(860, 70, 220, 380); g.strokeStyle = '#f4f0e8'; g.lineWidth = 8; g.strokeRect(860, 70, 220, 380); g.beginPath(); g.moveTo(970, 70); g.lineTo(970, 450); g.moveTo(860, 260); g.lineTo(1080, 260); g.stroke();
    for (const cx of [830, 1080]) { g.fillStyle = '#7a1e24'; g.beginPath(); g.moveTo(cx, 50); g.quadraticCurveTo(cx + 30, 250, cx + (cx < 900 ? 40 : -10), 470); g.lineTo(cx + (cx < 900 ? -10 : 40), 470); g.quadraticCurveTo(cx + 10, 250, cx, 50); g.fill(); g.fillStyle = S.rgba('#ffffff', .15); g.fillRect(cx + 8, 60, 4, 400); }
    S.glow(g, 970, 260, 400, '#ffffff', .35);
    g.fillStyle = '#a8842c'; g.fillRect(250, 120, 260, 160); g.fillStyle = '#5a7a8a'; g.fillRect(262, 132, 236, 136); g.fillStyle = '#3a5a6a'; g.fillRect(262, 220, 236, 48); g.fillStyle = '#e8e0d0'; g.beginPath(); g.moveTo(380, 210); g.lineTo(400, 160); g.lineTo(400, 210); g.fill();
    g.fillStyle = '#c8a040'; g.fillRect(120, 80, 6, 420); g.save(); g.translate(126, 90); for (let k = 0; k < 7; k++) { g.fillStyle = k % 2 ? '#f4f0e8' : '#b02030'; g.fillRect(0, k * 14, 90, 14); } g.fillStyle = '#2a3a7a'; g.fillRect(0, 0, 40, 42); g.restore();
    // floor: polished parquet and a rug
    const fl = g.createLinearGradient(0, 480, 0, h); fl.addColorStop(0, '#8a5a34'); fl.addColorStop(1, '#5a3a20'); g.fillStyle = fl; g.fillRect(0, 480, w, h - 480);
    for (let x = -200; x < w + 200; x += 40) { g.strokeStyle = S.rgba('#3a2010', .35); g.lineWidth = 2; g.beginPath(); g.moveTo(x, 480); g.lineTo(x + 120, h); g.stroke(); }
    g.fillStyle = '#7a2a2a'; g.beginPath(); g.moveTo(330, 560); g.lineTo(950, 560); g.lineTo(1020, 700); g.lineTo(260, 700); g.fill(); g.strokeStyle = '#c8a040'; g.lineWidth = 4; g.beginPath(); g.moveTo(350, 572); g.lineTo(930, 572); g.lineTo(990, 688); g.lineTo(290, 688); g.closePath(); g.stroke();
    grain(g, w, h, 671, .04);
  });

  // ======================== TERRACED RICE VILLAGE ========================
  VP.set('jp_village', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7ab0dc'], [.55, '#c8e0ec'], [1, '#e8f0e0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 160, n: 50, cols: ['#ffffff', '#f0f6fa'], r0: 30, r1: 80, sq: .4, a0: .25, a1: .5, seed: 681 });
    ridge(g, w, h, 230, 70, 300, 683, '#7a9ab0'); ridge(g, w, h, 290, 60, 220, 685, '#5a8a6a');
    S.strokes(g, { x: 0, y: 200, w, h: 140, n: 200, cols: ['#4a7a5a', '#6a9a7a'], l0: 10, l1: 30, ang: -1.2, jit: .3, w0: 2, w1: 4, a0: .2, a1: .4, seed: 687 });
    // terraces: stepped water mirrors catching the sky, green rice edges
    for (let r = 0; r < 7; r++) { const y0 = 330 + r * 44; g.fillStyle = r % 2 ? '#a8c8d8' : '#b8d4e0'; g.beginPath(); g.moveTo(0, y0); for (let x = 0; x <= w; x += 20) g.lineTo(x, y0 + 8 * Math.sin(x / 140 + r)); g.lineTo(w, y0 + 40); g.lineTo(0, y0 + 40); g.fill();
      for (let x = 10; x < w; x += 16) { g.fillStyle = r % 2 ? '#5a8a3a' : '#6a9a3a'; g.fillRect(x, y0 + 6 + 8 * Math.sin(x / 140 + r) + 6, 3, 14 + (x % 5)); }
      g.strokeStyle = '#6a5a3a'; g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= w; x += 20) g.lineTo(x, y0 + 40 + 8 * Math.sin(x / 140 + r + .3)); g.stroke(); }
    // thatched farmhouses (minka) and a shrine gate on the hill
    const minka = (x, y, s) => { g.fillStyle = '#c8b890'; g.fillRect(x - 60 * s, y - 50 * s, 120 * s, 50 * s); g.fillStyle = '#8a7044'; g.beginPath(); g.moveTo(x - 80 * s, y - 46 * s); g.lineTo(x - 30 * s, y - 110 * s); g.lineTo(x + 30 * s, y - 110 * s); g.lineTo(x + 80 * s, y - 46 * s); g.fill(); S.strokes(g, { x: x - 70 * s, y: y - 108 * s, w: 140 * s, h: 60 * s, n: 60, cols: ['#6a5430', '#a88a58'], l0: 6, l1: 16, ang: 1.4, jit: .2, w0: 1, w1: 2, a0: .3, a1: .5, seed: x }); g.fillStyle = '#2a1a10'; g.fillRect(x - 12 * s, y - 34 * s, 24 * s, 34 * s); };
    minka(220, 330, .9); minka(1050, 316, 1); minka(860, 300, .6);
    g.fillStyle = '#c83a2a'; g.fillRect(590, 220, 8, 50); g.fillRect(630, 220, 8, 50); g.fillRect(580, 218, 68, 8); g.fillRect(586, 232, 56, 5);
    // foreground earth bank and a low table spot
    g.fillStyle = '#7a6a48'; g.fillRect(0, 640, w, 80); S.dabs(g, { x: 0, y: 640, w, h: 80, n: 200, cols: ['#5a4a30', '#9a8a60'], r0: 4, r1: 16, a0: .2, a1: .45, seed: 691 });
    grain(g, w, h, 693, .04);
  });
})(window);
