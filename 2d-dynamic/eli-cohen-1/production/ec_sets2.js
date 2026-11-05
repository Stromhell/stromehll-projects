// Eli Cohen sets, part 2: the apartment window across from Syrian army HQ, a Damascus bedroom at night, a Damascus
// square at dawn with the radio building, the foot of the Golan Heights, an import-export office, a night airfield,
// a Damascus rooftop at night with lanterns, and a Tel Aviv kitchen.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain, wood } = S.JPX;
  const { cloud, dome, minaret, bricks } = S.MGX;
  const { plaster, floorboards, tiles, win, curtain, roofs, sflag, lamp } = S.ECX;

  // Eli's window: inside the dark apartment, a big window frames the army HQ gate across the street
  VP.set('ec_hqview', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa8d8'], [.6, '#e8ecec']]);
    g.fillStyle = '#d8ccb0'; g.fillRect(200, 140, 900, 360); bricks(g, 200, 140, 900, 40, '#c8b898', 8101); for (let k = 0; k < 9; k++) { g.fillStyle = '#4a5a6a'; g.fillRect(240 + k * 96, 220, 40, 60); g.fillRect(240 + k * 96, 320, 40, 60); }
    g.fillStyle = '#b8ac90'; g.fillRect(540, 380, 220, 140); g.fillStyle = '#2a2a2a'; g.fillRect(570, 400, 160, 120); g.strokeStyle = '#6a6a6a'; g.lineWidth = 4; for (let k = 0; k < 9; k++) { g.beginPath(); g.moveTo(574 + k * 19, 400); g.lineTo(574 + k * 19, 520); g.stroke(); }
    sflag(g, 620, 150, 1.2, false); g.fillStyle = '#5a5a5a'; g.fillRect(616, 150, 4, 70);
    g.fillStyle = '#8a8a7a'; g.fillRect(480, 410, 40, 100); g.fillStyle = '#6a6a5a'; g.beginPath(); g.moveTo(474, 412); g.lineTo(500, 392); g.lineTo(526, 412); g.fill();
    g.fillStyle = '#6a6a68'; g.fillRect(0, 500, w, 60); g.strokeStyle = '#f0f0e0'; g.lineWidth = 3; g.setLineDash([30, 30]); g.beginPath(); g.moveTo(0, 530); g.lineTo(w, 530); g.stroke(); g.setLineDash([]);
    // the room: dark walls around the window, sill, curtain, a little table
    g.fillStyle = '#2a2420'; g.fillRect(0, 0, w, 90); g.fillRect(0, 0, 150, h); g.fillRect(1130, 0, 150, h); g.fillRect(0, 560, w, 160);
    g.fillStyle = '#e8dcc0'; g.fillRect(140, 80, 1000, 14); g.fillRect(140, 80, 14, 490); g.fillRect(1126, 80, 14, 490); g.fillRect(630, 80, 14, 490); g.fillStyle = '#d8c8a8'; g.fillRect(120, 560, 1040, 24);
    curtain(g, 900, 90, 230, 470, '#7a3a2a'); grain(g, w, h, 8102, .05); });

  // Damascus bedroom at night: a bed, a wardrobe, a window over the rooftops, a little table by the window
  VP.set('ec_bedroom', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#3a3a52', 8201);
    win(g, 760, 110, 240, 260, cc => { sky(cc, 1280, 720, [[0, '#0a1028'], [.5, '#1c2a4a']]); roofs(cc, 1280, 300, 40, 8202, true); cc.fillStyle = '#f0f0d8'; cc.beginPath(); cc.arc(940, 160, 16, 0, TAU); cc.fill(); }, '#5a4a3a');
    curtain(g, 720, 100, 40, 300, '#4a2a3a'); curtain(g, 1000, 100, 40, 300, '#4a2a3a');
    wood(g, 160, 170, 200, 350, '#4a3020', 8203); g.strokeStyle = S.rgba('#1a0c06', .7); g.lineWidth = 3; g.strokeRect(172, 186, 84, 320); g.strokeRect(264, 186, 84, 320); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(252, 350, 4, 0, TAU); g.arc(270, 350, 4, 0, TAU); g.fill();
    floorboards(g, 520, w, h, '#3a2a20', 8204);
    g.fillStyle = '#5a3a22'; g.fillRect(420, 430, 30, 160); g.fillStyle = '#e8e4dc'; g.fillRect(450, 470, 240, 70); g.fillStyle = '#6a2a3a'; g.fillRect(450, 500, 240, 50); g.fillStyle = '#f0ece0'; g.beginPath(); g.roundRect(458, 456, 70, 28, 10); g.fill(); g.fillStyle = '#5a3a22'; g.fillRect(450, 550, 240, 14); g.fillRect(684, 470, 10, 120);
    grain(g, w, h, 8205, .05); });

  // a Damascus square at dawn: the radio building with an antenna mast, shuttered shops, a fountain
  VP.set('ec_dsquare', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a5a8a'], [.4, '#e8a888'], [.6, '#f0d8b0'], [1, '#b8a888']]);
    roofs(g, w, 300, 40, 8301, false);
    g.fillStyle = '#d8ccb0'; g.fillRect(420, 170, 460, 280); for (let j = 0; j < 3; j++) for (let k = 0; k < 7; k++) { g.fillStyle = '#4a5a6a'; g.fillRect(450 + k * 62, 200 + j * 70, 30, 44); } g.fillStyle = '#b8ac90'; g.fillRect(590, 370, 120, 80); g.fillStyle = '#2a2a2a'; g.fillRect(610, 390, 80, 60);
    g.strokeStyle = '#5a5a5a'; g.lineWidth = 3; g.beginPath(); g.moveTo(650, 170); g.lineTo(650, 40); g.moveTo(620, 170); g.lineTo(650, 60); g.lineTo(680, 170); g.stroke(); g.fillStyle = '#c82a2a'; g.beginPath(); g.arc(650, 38, 5, 0, TAU); g.fill();
    g.fillStyle = '#c8bca0'; g.fillRect(0, 260, 380, 200); g.fillRect(920, 250, 360, 210); for (let k = 0; k < 4; k++) { g.fillStyle = '#6a5a4a'; g.fillRect(30 + k * 90, 380, 70, 80); g.fillRect(950 + k * 85, 380, 66, 80); g.fillStyle = '#4a5a6a'; g.fillRect(40 + k * 90, 290, 40, 50); g.fillRect(960 + k * 85, 280, 40, 50); }
    g.fillStyle = '#a89880'; g.fillRect(0, 460, w, 260); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 300, cols: ['#8a7a64', '#c8b8a0'], r0: 6, r1: 18, a0: .2, a1: .4, seed: 8302 });
    g.fillStyle = '#c8bca0'; g.beginPath(); g.ellipse(240, 520, 90, 22, 0, 0, TAU); g.fill(); g.fillStyle = '#5a8aa8'; g.beginPath(); g.ellipse(240, 516, 76, 16, 0, 0, TAU); g.fill();
    grain(g, w, h, 8303, .05); });

  // the foot of the Golan Heights: a dusty road, dark basalt slopes with bunkers up top, dry grass
  VP.set('ec_golan', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ac8'], [.4, '#e0e4e0'], [1, '#c8b088']]); cloud(g, 300, 110, 1, '#ffffff', 8401);
    g.fillStyle = '#5a5248'; g.beginPath(); g.moveTo(0, 360); g.lineTo(200, 200); g.lineTo(560, 170); g.lineTo(900, 150); g.lineTo(1280, 190); g.lineTo(1280, 470); g.lineTo(0, 470); g.fill(); S.dabs(g, { x: 0, y: 150, w, h: 320, n: 400, cols: ['#3a3630', '#7a7060', '#8a8a5a'], r0: 4, r1: 16, a0: .25, a1: .55, seed: 8402 });
    for (let k = 0; k < 5; k++) { const x = 300 + k * 200, y = 186 - k * 6; g.fillStyle = '#6a6a5a'; g.fillRect(x - 24, y - 10, 48, 14); g.fillStyle = '#1a1a1a'; g.fillRect(x - 14, y - 6, 28, 4); }
    g.fillStyle = '#c8a870'; g.fillRect(0, 470, w, 250); S.strokes(g, { x: 0, y: 470, w, h: 250, n: 900, cols: ['#d8b878', '#a8884a', '#8a7a3a'], l0: 8, l1: 22, ang: -Math.PI / 2, jit: .4, w0: 1, w1: 2.4, a0: .35, a1: .8, seed: 8403 });
    g.fillStyle = '#b8a07a'; g.beginPath(); g.moveTo(0, 640); g.quadraticCurveTo(640, 600, 1280, 520); g.lineTo(1280, 560); g.quadraticCurveTo(640, 650, 0, 700); g.fill();
    grain(g, w, h, 8404, .05); });

  // an import-export office: shelves of samples, stacked crates, a desk and a window with a blind
  VP.set('ec_office', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#c8b898', 8501);
    win(g, 840, 100, 260, 220, cc => { sky(cc, 1280, 720, [[0, '#7aa8d8'], [.5, '#e8ecec']]); roofs(cc, 1280, 300, 30, 8502, false); }, '#6a5a4a'); g.fillStyle = S.rgba('#d8c8a0', .8); g.fillRect(840, 100, 260, 70);
    wood(g, 100, 140, 260, 380, '#6a4a2a', 8503); for (let k = 0; k < 4; k++) { g.fillStyle = '#4a3020'; g.fillRect(100, 140 + k * 95, 260, 8); for (let j = 0; j < 5; j++) { g.fillStyle = ['#c8a060', '#8a6a4a', '#e8dcc0', '#6a8a6a'][(j + k) % 4]; g.fillRect(112 + j * 48, 160 + k * 95, 38, 64); } }
    floorboards(g, 520, w, h, '#7a5a3a', 8504); grain(g, w, h, 8505, .04); });

  // a night airfield: a propliner on the apron, runway lights, the terminal glow
  VP.set('ec_airfield', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#080c20'], [.5, '#1c2a4a'], [.62, '#3a3a5a'], [1, '#1a1a22']]);
    for (let k = 0; k < 90; k++) { const r = S.rng(8601 + k); g.fillStyle = S.rgba('#ffffff', .4 + r() * .5); g.fillRect(r() * w, r() * 360, 2, 2); }
    g.fillStyle = '#2a2a34'; g.fillRect(900, 330, 340, 110); for (let k = 0; k < 8; k++) { g.fillStyle = S.rgba('#ffd890', .8); g.fillRect(920 + k * 40, 360, 20, 30); } g.fillStyle = '#1a1a22'; g.fillRect(1180, 260, 30, 80); g.fillStyle = '#ffd890'; g.fillRect(1170, 250, 50, 20);
    g.fillStyle = '#26262e'; g.fillRect(0, 440, w, 280); for (let k = 0; k < 16; k++) { g.fillStyle = k % 2 ? '#ffd060' : '#60a0ff'; g.beginPath(); g.arc(k * 84, 470 + (k % 3), 3, 0, TAU); g.fill(); g.beginPath(); g.arc(k * 84 + 40, 660, 4, 0, TAU); g.fill(); }
    grain(g, w, h, 8602, .05); });

  // a Damascus rooftop at night: low parapet, lanterns on a string, the city lights and a minaret beyond
  VP.set('ec_roof', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a1028'], [.5, '#22305a'], [.7, '#3a3a5a']]);
    for (let k = 0; k < 120; k++) { const r = S.rng(8701 + k); g.fillStyle = S.rgba('#ffffff', .3 + r() * .5); g.fillRect(r() * w, r() * 300, 2, 2); }
    roofs(g, w, 360, 80, 8702, true); minaret(g, 980, 380, 170, '#3a3a50'); dome(g, 1100, 400, 40, '#2a3048'); minaret(g, 200, 390, 120, '#3a3a50');
    g.fillStyle = '#c8b8a0'; g.fillRect(0, 440, w, 50); g.fillStyle = '#a89880'; g.fillRect(0, 440, w, 8); g.fillStyle = '#b8a890'; g.fillRect(0, 490, w, 230); S.dabs(g, { x: 0, y: 490, w, h: 230, n: 260, cols: ['#a89878', '#c8b8a0'], r0: 6, r1: 18, a0: .2, a1: .4, seed: 8703 });
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 120); g.quadraticCurveTo(640, 220, 1280, 120); g.stroke();
    for (let k = 0; k < 13; k++) { const x = 50 + k * 98, y = 120 + 100 * (1 - Math.pow((x - 640) / 640, 2)) * .98; const col = ['#ffb040', '#ff7050', '#ffe070', '#70d0a0'][k % 4]; const gr = g.createRadialGradient(x, y + 12, 2, x, y + 12, 50); gr.addColorStop(0, S.rgba(col, .7)); gr.addColorStop(1, S.rgba(col, 0)); g.fillStyle = gr; g.fillRect(x - 50, y - 38, 100, 100); g.fillStyle = col; g.beginPath(); g.ellipse(x, y + 12, 8, 11, 0, 0, TAU); g.fill(); }
    grain(g, w, h, 8704, .05); });

  // a Tel Aviv kitchen, 1960s: tiled wall, an icebox, a stove, a table with an oilcloth
  VP.set('ec_kitchen', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#e8e4d0', 8801); for (let y = 260; y < 520; y += 30) for (let x = 0; x < w; x += 30) { g.strokeStyle = S.rgba('#8aa8b8', .5); g.lineWidth = 1; g.strokeRect(x, y, 30, 30); }
    g.fillStyle = '#f0ece0'; g.beginPath(); g.roundRect(110, 200, 150, 320, 20); g.fill(); g.strokeStyle = '#b8b0a0'; g.lineWidth = 3; g.stroke(); g.fillStyle = '#c8c0b0'; g.fillRect(230, 300, 10, 50);
    g.fillStyle = '#e8e4dc'; g.fillRect(940, 380, 200, 140); g.fillStyle = '#2a2a2a'; [980, 1040, 1100].forEach(x => { g.beginPath(); g.ellipse(x, 384, 22, 6, 0, 0, TAU); g.fill(); }); g.fillStyle = '#8a8a8a'; g.fillRect(960, 420, 160, 80);
    win(g, 520, 110, 220, 150, cc => sky(cc, 1280, 720, [[0, '#ffd8a0'], [.5, '#f0e8d8']]), '#4a7a9a');
    tiles(g, 520, w, h, '#d8d0c0', '#3a5a6a', 8802); grain(g, w, h, 8803, .04); });

  // a desktop seen from above: dark wood, a green blotter, a lamp's warm pool
  VP.set('ec_desktop', 1280, 720, (g, w, h) => {
    wood(g, 0, 0, w, h, '#5a3a22', 8901); g.fillStyle = '#2a4a3a'; g.fillRect(160, 80, 960, 560); g.fillStyle = S.rgba('#ffffff', .06); g.fillRect(160, 80, 960, 8); g.strokeStyle = '#7a5a3a'; g.lineWidth = 10; g.strokeRect(160, 80, 960, 560);
    const gr = g.createRadialGradient(640, 300, 40, 640, 360, 700); gr.addColorStop(0, S.rgba('#ffe0a0', .25)); gr.addColorStop(1, S.rgba('#000000', .35)); g.fillStyle = gr; g.fillRect(0, 0, w, h); grain(g, w, h, 8902, .05); });
})(window);
