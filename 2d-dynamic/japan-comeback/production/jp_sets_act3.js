// Japan act 3 sets: the chart wall, an American highway, the burnt department-store workshop, Honda's shed.
(function (G) {
  const S = G.S, VP = G.VP, J = S.JPX, TAU = Math.PI * 2, { sky, ridge, wood, tin, grain } = J;
  // graph-paper board on an office wall
  const board = (title, axes) => (g, w, h) => {
    sky(g, w, h, [[0, '#5a4a3a'], [1, '#3a2c20']]); wood(g, 0, 0, w, h, '#4a3424', 801);
    g.fillStyle = '#f4f0e0'; g.fillRect(90, 50, 1100, 580); g.strokeStyle = S.rgba('#7ab0c8', .45); g.lineWidth = 1; for (let x = 90; x <= 1190; x += 22) { g.beginPath(); g.moveTo(x, 50); g.lineTo(x, 630); g.stroke(); } for (let y = 50; y <= 630; y += 22) { g.beginPath(); g.moveTo(90, y); g.lineTo(1190, y); g.stroke(); }
    if (axes) { g.strokeStyle = '#3a3a3a'; g.lineWidth = 3; g.beginPath(); g.moveTo(160, 90); g.lineTo(160, 560); g.lineTo(1140, 560); g.stroke(); }
    g.fillStyle = '#3a2a1a'; g.fillRect(80, 40, 1120, 12); g.fillRect(80, 628, 1120, 12); S.dabs(g, { x: 90, y: 50, w: 1100, h: 580, n: 120, cols: ['#d8d0b8', '#ffffff'], r0: 10, r1: 40, a0: .05, a1: .15, seed: 803 });
    if (title) { g.font = '30px Caveat'; g.fillStyle = '#2a2a2a'; g.fillText(title, 560, 90); }
    grain(g, w, h, 805, .04);
  };
  VP.set('jp_chart', 1280, 720, board('PASSENGER CARS BUILT · 1950', true));
  VP.set('jp_board', 1280, 720, board('WHERE THE MONEY CAME FROM', false));
  VP.set('jp_gdp', 1280, 720, board('SIZE OF ECONOMY · 1968', false));
  // a wide American highway in the 1950s: desert, poles, a billboard, mesas
  VP.set('jp_highway', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a8ad0'], [.55, '#a8d0ec'], [.62, '#f0d8b0'], [1, '#d8a870']]);
    for (const [x, ww, hh, col] of [[80, 260, 80, '#b8704a'], [700, 340, 110, '#a8603e'], [1060, 220, 70, '#c07a50']]) { g.fillStyle = col; g.beginPath(); g.moveTo(x, 400); g.lineTo(x + 30, 400 - hh); g.lineTo(x + ww - 30, 400 - hh); g.lineTo(x + ww, 400); g.fill(); S.strokes(g, { x, y: 400 - hh, w: ww, h: hh, n: 60, cols: ['#8a4a2a', '#d8906a'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 3, a0: .2, a1: .4, seed: x }); }
    g.fillStyle = '#d8b07a'; g.fillRect(0, 400, w, 320); S.dabs(g, { x: 0, y: 400, w, h: 320, n: 300, cols: ['#c89a60', '#e8c890', '#a87a48'], r0: 4, r1: 20, sq: .4, a0: .2, a1: .4, seed: 811 });
    for (let i = 0; i < 30; i++) { const r = S.rng(i + 820), x = r() * w, y = 410 + r() * 120; g.fillStyle = '#7a8a4a'; g.beginPath(); g.ellipse(x, y, 8 + r() * 10, 4 + r() * 4, 0, 0, TAU); g.fill(); }
    // the highway: two lanes running across, a gravel shoulder in front
    g.fillStyle = '#5a5a5e'; g.fillRect(0, 462, w, 116); g.fillStyle = '#3a3a3e'; g.fillRect(0, 468, w, 104); g.fillStyle = '#e8e0c8'; for (let x = 0; x < w; x += 90) g.fillRect(x, 518, 50, 4); g.fillStyle = '#e8c040'; g.fillRect(0, 472, w, 3);
    S.dabs(g, { x: 0, y: 468, w, h: 104, n: 120, cols: ['#2a2a2e', '#4a4a4e'], r0: 3, r1: 12, sq: .3, a0: .2, a1: .4, seed: 833 });
    g.fillStyle = '#b89a70'; g.fillRect(0, 578, w, 142); S.dabs(g, { x: 0, y: 578, w, h: 142, n: 260, cols: ['#a08058', '#d0b088', '#8a6a48'], r0: 2, r1: 10, sq: .5, a0: .25, a1: .5, seed: 835 });
    for (let x = 40; x < w; x += 230) { g.fillStyle = '#5a3a20'; g.fillRect(x, 330, 6, 132); g.fillRect(x - 16, 338, 38, 4); } g.strokeStyle = '#2a2420'; g.lineWidth = 1; g.beginPath(); for (let x = 0; x <= w; x += 20) g.lineTo(x, 342 + 6 * Math.cos((x - 43) / 230 * TAU)); g.stroke();
    g.fillStyle = '#f4ecd8'; g.fillRect(860, 300, 260, 110); g.fillStyle = '#c82020'; g.fillRect(860, 300, 260, 26); g.fillStyle = '#1a1a1a'; g.font = 'bold 30px Oswald'; g.fillText('ROUTE 66 · MOTEL', 880, 370); g.fillStyle = '#5a3a20'; g.fillRect(900, 410, 8, 52); g.fillRect(1070, 410, 8, 52);
    grain(g, w, h, 831, .04);
  });
  // workshop inside a burnt department store (Shirokiya, Nihonbashi)
  VP.set('jp_shop', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a3430'], [1, '#1e1a18']]);
    g.fillStyle = '#6a625a'; g.fillRect(0, 0, w, 470); S.dabs(g, { x: 0, y: 0, w, h: 470, n: 400, cols: ['#2a2420', '#8a8070', '#4a4038', '#1a1614'], r0: 6, r1: 40, sq: .5, a0: .15, a1: .4, seed: 841 });
    // scorched pillars and a cracked shop sign
    for (const x of [100, 560, 1020]) { g.fillStyle = '#7a726a'; g.fillRect(x, 0, 60, 470); g.fillStyle = S.rgba('#000000', .3); g.fillRect(x + 44, 0, 16, 470); S.dabs(g, { x, y: 0, w: 60, h: 470, n: 40, cols: ['#1a1614', '#3a3430'], r0: 4, r1: 18, a0: .2, a1: .5, seed: x }); }
    g.fillStyle = '#c8b890'; g.fillRect(220, 60, 300, 50); g.fillStyle = '#3a2a1a'; g.font = 'bold 26px Oswald'; g.fillText('白木屋 · SHIROKIYA', 250, 96); g.strokeStyle = '#1a1614'; g.lineWidth = 3; g.beginPath(); g.moveTo(380, 60); g.lineTo(400, 85); g.lineTo(385, 110); g.stroke();
    // window with paper patches, light shaft
    g.fillStyle = '#c8d8d8'; g.fillRect(700, 80, 260, 200); g.fillStyle = '#e8e0c8'; for (const [x, y] of [[710, 90], [820, 160], [880, 100]]) g.fillRect(x, y, 60, 50); g.strokeStyle = '#2a2420'; g.lineWidth = 6; g.strokeRect(700, 80, 260, 200); g.beginPath(); g.moveTo(830, 80); g.lineTo(830, 280); g.moveTo(700, 180); g.lineTo(960, 180); g.stroke();
    S.beam && S.beam(g, 830, 180, 640, 560, 120, 300, '#fff4d8', .18);
    // workbench with radios, tubes, wires and a soldering iron
    wood(g, 300, 470, 680, 30, '#6a4a2a', 843); g.fillStyle = '#4a3020'; g.fillRect(320, 500, 16, 140); g.fillRect(944, 500, 16, 140);
    for (const [k, x] of [[0, 320], [1, 440], [2, 800]]) { g.fillStyle = ['#5a3a20', '#7a5a3a', '#4a4a4a', '#6a3a2a'][k]; g.fillRect(x, 410, 110, 60); g.fillStyle = '#e8d8b0'; g.beginPath(); g.arc(x + 30, 440, 16, 0, TAU); g.fill(); g.fillStyle = '#2a2420'; for (let r = 0; r < 4; r++) g.fillRect(x + 60, 424 + r * 10, 40, 4); }
    for (let k = 0; k < 6; k++) { g.fillStyle = S.rgba('#c8e0f0', .7); g.beginPath(); g.ellipse(360 + k * 24, 400, 6, 14, 0, 0, TAU); g.fill(); g.fillStyle = '#5a5a5a'; g.fillRect(354 + k * 24, 410, 12, 6); }
    g.strokeStyle = '#c83a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(320, 470); g.bezierCurveTo(400, 520, 600, 440, 700, 470); g.stroke(); g.strokeStyle = '#2a4a8a'; g.beginPath(); g.moveTo(500, 470); g.bezierCurveTo(560, 520, 800, 430, 900, 470); g.stroke();
    // floor: broken tiles
    g.fillStyle = '#5a524a'; g.fillRect(0, 470, w, h - 470); for (let y = 470; y < h; y += 40) for (let x = (y / 40 % 2) * 30; x < w; x += 60) { g.strokeStyle = S.rgba('#2a2420', .5); g.lineWidth = 1; g.strokeRect(x, y, 60, 40); }
    S.dabs(g, { x: 0, y: 470, w, h: 250, n: 200, cols: ['#2a2420', '#8a8070'], r0: 4, r1: 18, a0: .2, a1: .4, seed: 849 });
    grain(g, w, h, 851, .06);
  });
  // Honda's wooden shed by a village road
  VP.set('jp_shed', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab8e0'], [.6, '#d8e8ec'], [1, '#e8e0c8']]);
    ridge(g, w, h, 300, 60, 260, 861, '#6a9a7a'); ridge(g, w, h, 360, 40, 200, 863, '#5a8a5a');
    for (let i = 0; i < 10; i++) { const r = S.rng(i + 870), x = r() * w, y = 340 + r() * 30; g.fillStyle = '#3a6a3a'; g.beginPath(); g.ellipse(x, y, 30, 20, 0, 0, TAU); g.fill(); }
    // the shed: weathered planks, tin roof, open front with tools
    wood(g, 120, 220, 520, 260, '#7a5a3a', 865); for (let x = 120; x < 640; x += 26) { g.fillStyle = S.rgba('#000000', .2); g.fillRect(x, 220, 2, 260); }
    tin(g, 100, 190, 560, 36, '#6a6a6e', 867); g.fillStyle = '#1e1610'; g.fillRect(200, 300, 340, 180); g.fillStyle = S.rgba('#ffd8a0', .15); g.fillRect(200, 300, 340, 8);
    for (let k = 0; k < 6; k++) { g.fillStyle = '#8a8a8e'; g.fillRect(220 + k * 50, 320, 6, 40); g.fillRect(212 + k * 50, 316, 22, 6); }
    g.fillStyle = '#f4ecd8'; g.fillRect(260, 236, 220, 40); g.fillStyle = '#1a1a1a'; g.font = 'bold 22px Oswald'; g.fillText('本田技術研究所 · 1946', 270, 264);
    wood(g, 210, 420, 320, 22, '#5a3a20', 869);
    // the village road and fence
    g.fillStyle = '#c8b890'; g.beginPath(); g.moveTo(0, 520); g.lineTo(w, 480); g.lineTo(w, 720); g.lineTo(0, 720); g.fill(); S.dabs(g, { x: 0, y: 480, w, h: 240, n: 300, cols: ['#a8986a', '#e0d0a8', '#8a7a58'], r0: 3, r1: 16, sq: .4, a0: .2, a1: .45, seed: 871 });
    g.fillStyle = '#7a8a4a'; g.fillRect(0, 480, w, 40); for (let x = 680; x < w; x += 50) { g.fillStyle = '#6a4a2a'; g.fillRect(x, 440, 6, 50); } g.fillRect(680, 452, 600, 4);
    grain(g, w, h, 873, .04);
  });
})(window);
