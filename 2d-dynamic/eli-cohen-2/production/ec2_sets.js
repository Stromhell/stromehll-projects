// Eli Cohen 2 sets (Village Painterly), 1963-2025: a Golan bunker above the Sea of Galilee, the Jordan headwaters works,
// a Damascus ministry office, a night street by the Indian embassy, the embassy radio room, the inside of a direction-
// finding van, a prison corridor, a military courtroom, a cell, Marjeh Square at dawn, a bare patch of ground, a 1960s
// airport gate, a street with a sign, and an archive room.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain, wood } = S.JPX;
  const { cloud, dome, minaret, bricks } = S.MGX;
  const { plaster, floorboards, tiles, win, curtain, roofs, lamp } = S.ECX;
  // Syrian flag from March 1963: red, white, black with three green stars
  const sflag63 = (g, x, y, s) => { [['#c82a2a', 0], ['#f0f0f0', 1], ['#1a1a1a', 2]].forEach(([c, i]) => { g.fillStyle = c; g.fillRect(x, y + i * 14 * s, 66 * s, 14 * s); }); g.fillStyle = '#2a8a3a'; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(x + (16 + i * 17) * s, y + 21 * s, 3.5 * s, 0, TAU); g.fill(); } };
  const bunker = (g, x, y, s) => { g.fillStyle = '#8a8478'; g.beginPath(); g.moveTo(x - 90 * s, y); g.lineTo(x - 80 * s, y - 60 * s); g.quadraticCurveTo(x, y - 80 * s, x + 80 * s, y - 60 * s); g.lineTo(x + 90 * s, y); g.fill(); g.fillStyle = '#1a1a1a'; g.fillRect(x - 40 * s, y - 46 * s, 80 * s, 10 * s); S.dabs(g, { x: x - 90 * s, y: y - 80 * s, w: 180 * s, h: 80 * s, n: 30, cols: ['#6a6458', '#a8a498'], r0: 3, r1: 8, a0: .3, a1: .5, seed: Math.round(x) });
    for (let k = 0; k < 9; k++) { g.fillStyle = S.mix('#b8a070', '#8a7448', k % 2); g.beginPath(); g.ellipse(x - 120 * s + k * 30 * s, y - 6 * s, 16 * s, 9 * s, 0, 0, TAU); g.fill(); } };
  const EC2X = { sflag63, bunker }; S.EC2X = EC2X;

  // a bunker on the Golan: dark basalt, sandbags, a concrete pillbox; far below, the Sea of Galilee and green fields
  VP.set('ec2_bunker', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ac8'], [.35, '#d8e4e8'], [1, '#c8b890']]); cloud(g, 300, 90, 1, '#ffffff', 9201);
    g.fillStyle = '#7aa070'; g.fillRect(0, 300, w, 120); for (let k = 0; k < 14; k++) { g.fillStyle = k % 2 ? '#8ab05a' : '#a8b858'; g.fillRect(k * 92, 330 + (k % 3) * 20, 80, 30); } g.fillStyle = '#5a9ac0'; g.beginPath(); g.ellipse(360, 330, 200, 26, 0, 0, TAU); g.fill();
    g.fillStyle = '#4a4440'; g.beginPath(); g.moveTo(0, 420); g.quadraticCurveTo(400, 380, 820, 400); g.quadraticCurveTo(1080, 410, 1280, 380); g.lineTo(w, h); g.lineTo(0, h); g.fill(); S.dabs(g, { x: 0, y: 380, w, h: 340, n: 500, cols: ['#2a2622', '#6a6458', '#8a8a5a', '#a89a6a'], r0: 4, r1: 16, a0: .3, a1: .6, seed: 9202 });
    bunker(g, 860, 470, 1.6); g.strokeStyle = '#2a2a2a'; g.lineWidth = 6; g.beginPath(); g.moveTo(860, 400); g.lineTo(760, 390); g.stroke();
    for (let k = 0; k < 14; k++) { g.fillStyle = S.mix('#b8a070', '#8a7448', k % 2); g.beginPath(); g.ellipse(40 + k * 34, 520 - (k % 2) * 10, 20, 11, 0, 0, TAU); g.fill(); }
    grain(g, w, h, 9203, .05); });

  // the Jordan headwaters works: a stream from a hillside spring, raw earth cut for a canal, hills
  VP.set('ec2_headwaters', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ac8'], [.4, '#e0e8e8'], [1, '#c8b890']]); cloud(g, 900, 110, 1.1, '#ffffff', 9301);
    ridge(g, w, h, 280, 60, 260, 9302, '#8a9a7a'); ridge(g, w, h, 340, 40, 200, 9303, '#7a8a5a');
    g.fillStyle = '#8aa060'; g.fillRect(0, 380, w, 340); S.strokes(g, { x: 0, y: 380, w, h: 340, n: 700, cols: ['#a8c070', '#6a8a3a'], l0: 8, l1: 20, ang: -Math.PI / 2, jit: .4, w0: 1, w1: 2.2, a0: .3, a1: .7, seed: 9304 });
    g.fillStyle = '#5a9ac0'; g.beginPath(); g.moveTo(180, 380); g.quadraticCurveTo(260, 520, 200, 720); g.lineTo(320, 720); g.quadraticCurveTo(330, 520, 210, 380); g.fill(); g.strokeStyle = S.rgba('#ffffff', .5); g.lineWidth = 2; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(230 + k * 6, 420 + k * 36); g.lineTo(250 + k * 6, 430 + k * 36); g.stroke(); }
    g.fillStyle = '#a8764a'; g.beginPath(); g.moveTo(420, 470); g.lineTo(1280, 430); g.lineTo(1280, 500); g.lineTo(440, 520); g.fill(); g.fillStyle = '#7a5434'; g.beginPath(); g.moveTo(440, 490); g.lineTo(1280, 455); g.lineTo(1280, 470); g.lineTo(440, 505); g.fill();
    for (let k = 0; k < 6; k++) { g.fillStyle = '#9a6a40'; g.beginPath(); g.ellipse(520 + k * 130, 440 - k * 6, 40, 16, 0, Math.PI, 0); g.fill(); }
    grain(g, w, h, 9305, .05); });

  // a Damascus ministry office: wood panels, a flag, a desk with a nameplate, armchairs
  VP.set('ec2_ministry', 1280, 720, (g, w, h) => {
    wood(g, 0, 0, w, 520, '#6a4a2a', 9401); for (let k = 0; k < 6; k++) { g.strokeStyle = S.rgba('#3a2412', .6); g.lineWidth = 3; g.strokeRect(30 + k * 210, 60, 180, 300); }
    win(g, 860, 80, 240, 260, cc => sky(cc, 1280, 720, [[0, '#7aa8d8'], [.5, '#e8ecec']]), '#e8dcc0'); curtain(g, 820, 70, 40, 300, '#7a2a2a'); curtain(g, 1100, 70, 40, 300, '#7a2a2a');
    g.fillStyle = '#5a5a5a'; g.fillRect(180, 100, 4, 300); sflag63(g, 184, 100, 1.4);
    g.fillStyle = '#8a6a3a'; g.fillRect(420, 120, 130, 160); g.fillStyle = '#c8b898'; g.fillRect(430, 130, 110, 140);
    tiles(g, 520, w, h, '#8a3a2a', '#6a2a1a', 9402); grain(g, w, h, 9403, .05); });

  // night street: Eli's apartment block, the Indian embassy with its flag, street lamps
  VP.set('ec2_nightst', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a1028'], [.6, '#22305a']]); for (let k = 0; k < 80; k++) { const r = S.rng(9501 + k); g.fillStyle = S.rgba('#ffffff', .4 + r() * .4); g.fillRect(r() * w, r() * 200, 2, 2); }
    roofs(g, w, 260, 30, 9502, true);
    g.fillStyle = '#2a2a3a'; g.fillRect(80, 140, 420, 340); for (let j = 0; j < 4; j++) for (let k = 0; k < 6; k++) { g.fillStyle = (j * 6 + k) % 5 === 2 ? S.rgba('#ffd890', .85) : '#1a1a28'; g.fillRect(110 + k * 64, 170 + j * 74, 34, 44); }
    g.fillStyle = '#3a3a48'; g.fillRect(720, 200, 480, 280); for (let k = 0; k < 6; k++) { g.fillStyle = '#1a1a28'; g.fillRect(750 + k * 74, 240, 40, 60); g.fillRect(750 + k * 74, 340, 40, 60); }
    g.fillStyle = '#5a5a5a'; g.fillRect(956, 120, 4, 90); [['#ff9933', 0], ['#ffffff', 1], ['#138808', 2]].forEach(([c, i]) => { g.fillStyle = c; g.fillRect(960, 120 + i * 12, 60, 12); }); g.strokeStyle = '#000080'; g.lineWidth = 1.5; g.beginPath(); g.arc(990, 138, 5, 0, TAU); g.stroke();
    g.fillStyle = '#2a2a30'; g.fillRect(0, 480, w, 240); g.fillStyle = '#3a3a40'; g.fillRect(0, 480, w, 30);
    [300, 640, 1100].forEach(x => { g.fillStyle = '#1a1a1a'; g.fillRect(x - 3, 330, 6, 160); const gr = g.createRadialGradient(x, 330, 4, x, 400, 180); gr.addColorStop(0, S.rgba('#ffd890', .6)); gr.addColorStop(1, S.rgba('#ffd890', 0)); g.fillStyle = gr; g.fillRect(x - 180, 300, 360, 420); g.fillStyle = '#fff0c0'; g.beginPath(); g.arc(x, 330, 8, 0, TAU); g.fill(); });
    grain(g, w, h, 9503, .05); });

  // the embassy radio room: a desk with a radio set, a map, a fan, a window at night
  VP.set('ec2_radio', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#d8ccb0', 9601); win(g, 900, 110, 220, 220, cc => sky(cc, 1280, 720, [[0, '#0a1028'], [.5, '#22305a']]), '#5a4a3a');
    g.fillStyle = '#e8dcb8'; g.fillRect(140, 120, 300, 200); g.strokeStyle = '#3a6ab0'; g.lineWidth = 2; g.beginPath(); g.moveTo(170, 160); g.quadraticCurveTo(260, 250, 400, 220); g.stroke();
    floorboards(g, 520, w, h, '#6a5a4a', 9602); lamp(g, 640, 160); grain(g, w, h, 9603, .05); });

  // inside the direction-finding van: dark metal walls, a glowing dial panel, cables
  VP.set('ec2_van', 1280, 720, (g, w, h) => {
    g.fillStyle = '#1a1e22'; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 80) { g.fillStyle = S.rgba('#ffffff', .04); g.fillRect(x, 0, 4, h); }
    g.fillStyle = '#2a3038'; g.fillRect(340, 120, 600, 320); g.strokeStyle = '#4a5260'; g.lineWidth = 4; g.strokeRect(340, 120, 600, 320);
    for (let k = 0; k < 8; k++) { g.fillStyle = k % 3 ? '#3a8a4a' : '#c8a040'; g.beginPath(); g.arc(380 + k * 70, 400, 6, 0, TAU); g.fill(); }
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 5; g.beginPath(); g.moveTo(940, 200); g.bezierCurveTo(1100, 180, 1100, 60, 1280, 40); g.stroke();
    g.fillStyle = '#2a2a2e'; g.fillRect(0, 560, w, 160); grain(g, w, h, 9701, .06); });

  // prison corridor: dim green walls, a row of closed doors, a bare bulb
  VP.set('ec2_corridor', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, h, '#4a5448', 9801); g.fillStyle = '#3a4238'; g.beginPath(); g.moveTo(0, 0); g.lineTo(520, 260); g.lineTo(760, 260); g.lineTo(1280, 0); g.fill();
    g.fillStyle = '#2a3028'; g.beginPath(); g.moveTo(0, h); g.lineTo(520, 460); g.lineTo(760, 460); g.lineTo(1280, h); g.fill(); g.fillStyle = '#1a1e1a'; g.fillRect(520, 260, 240, 200);
    [[120, 1], [330, .7], [1050, 1], [880, .7]].forEach(([x, s]) => { g.fillStyle = '#3a2a1e'; g.fillRect(x - 50 * s, 380 - 260 * s * .5, 100 * s, 300 * s); g.fillStyle = '#1a1a1a'; g.fillRect(x - 20 * s, 380 - 110 * s, 40 * s, 14 * s); });
    lamp(g, 640, 120, '#e8e0a0'); grain(g, w, h, 9802, .07); });

  // a military courtroom: a long table with green cloth, the flag, a portrait frame, benches
  VP.set('ec2_court', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#c8bca0', 9901); g.fillStyle = '#5a5a5a'; g.fillRect(620, 70, 4, 220); sflag63(g, 624, 70, 1.6);
    g.fillStyle = '#6a5a3a'; g.fillRect(380, 90, 160, 190); g.fillStyle = '#8a8a7a'; g.fillRect(392, 102, 136, 166);
    g.fillStyle = '#7a5a3a'; g.fillRect(760, 90, 160, 190); g.fillStyle = '#a8a088'; g.fillRect(772, 102, 136, 166);
    floorboards(g, 520, w, h, '#5a4232', 9902);
    g.fillStyle = '#2a4a2a'; g.fillRect(260, 400, 760, 110); g.fillStyle = '#1a3a1a'; g.fillRect(260, 480, 760, 30); g.fillStyle = '#4a3020'; g.fillRect(260, 392, 760, 12);
    grain(g, w, h, 9903, .05); });

  // a cell: rough wall, a high barred window, a cot and a small lamp
  VP.set('ec2_cell', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 540, '#5a5448', 10001); g.fillStyle = '#1a2038'; g.fillRect(820, 100, 140, 100); g.fillStyle = '#2a2a2a'; for (let k = 0; k < 5; k++) g.fillRect(828 + k * 30, 100, 6, 100);
    g.fillStyle = '#3a342c'; g.fillRect(0, 540, w, 180); S.dabs(g, { x: 0, y: 540, w, h: 180, n: 120, cols: ['#2a2620', '#4a443a'], r0: 6, r1: 20, a0: .3, a1: .5, seed: 10002 });
    g.fillStyle = '#5a5248'; g.fillRect(140, 470, 340, 20); g.fillStyle = '#7a7266'; g.fillRect(150, 450, 320, 24); g.fillStyle = '#3a3228'; g.fillRect(150, 490, 10, 80); g.fillRect(460, 490, 10, 80);
    grain(g, w, h, 10003, .08); });

  // Marjeh Square at dawn: old facades, the memorial column with its bronze top, a pale sky
  VP.set('ec2_marjeh', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a5070'], [.35, '#c8a0a0'], [.55, '#e8d0b8'], [1, '#8a8070']]);
    roofs(g, w, 300, 30, 10101, false); for (let k = 0; k < 5; k++) { const x = k * 270; g.fillStyle = S.mix('#b8ac98', '#a89c88', k % 2); g.fillRect(x, 200, 260, 280); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { g.fillStyle = '#4a4a58'; g.fillRect(x + 20 + i * 60, 230 + j * 70, 26, 40); } }
    g.fillStyle = '#8a8478'; g.fillRect(620, 120, 40, 360); g.fillStyle = '#5a6a58'; g.fillRect(610, 100, 60, 26); g.fillStyle = '#6a7a64'; g.beginPath(); g.arc(640, 96, 20, Math.PI, 0); g.fill();
    g.fillStyle = '#8a8070'; g.fillRect(0, 480, w, 240); S.dabs(g, { x: 0, y: 480, w, h: 240, n: 300, cols: ['#6a6458', '#a89c88'], r0: 6, r1: 18, a0: .2, a1: .4, seed: 10102 });
    g.fillStyle = S.rgba('#e8d8c8', .25); g.fillRect(0, 0, w, h); grain(g, w, h, 10103, .05); });

  // a bare patch of ground: dry earth, stones, a low wall and a lone tree
  VP.set('ec2_ground', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ab8'], [.5, '#d8d8d0'], [1, '#b8a888']]);
    ridge(g, w, h, 330, 30, 300, 10201, '#a8a098'); g.fillStyle = '#b8a07a'; g.fillRect(0, 380, w, 340); S.dabs(g, { x: 0, y: 380, w, h: 340, n: 400, cols: ['#8a7454', '#c8b08a', '#7a7a5a'], r0: 4, r1: 14, a0: .3, a1: .6, seed: 10202 });
    bricks(g, 0, 340, 520, 46, '#c8b898', 10203); g.strokeStyle = '#5a4a3a'; g.lineWidth = 8; g.beginPath(); g.moveTo(1060, 400); g.lineTo(1050, 220); g.stroke(); for (let k = 0; k < 8; k++) { g.fillStyle = S.mix('#5a6a3a', '#8a9a5a', k / 8); g.beginPath(); g.arc(1040 + (k % 3) * 24 - 24, 200 - (k % 4) * 18, 40, 0, TAU); g.fill(); }
    grain(g, w, h, 10204, .05); });

  // a 1960s airport gate: big windows onto the apron, a propliner outside, a departures board
  VP.set('ec2_airport', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#d8d4c8', 10301); g.fillStyle = '#9ab8d0'; g.fillRect(80, 80, 1120, 300); for (let k = 0; k <= 8; k++) { g.fillStyle = '#5a5a5a'; g.fillRect(80 + k * 140, 80, 8, 300); } g.fillStyle = '#5a5a5a'; g.fillRect(80, 220, 1120, 6);
    g.save(); g.beginPath(); g.rect(80, 80, 1120, 300); g.clip(); g.fillStyle = '#7a7a78'; g.fillRect(80, 320, 1120, 60); S.ecPlane(g, 700, 330, .9, -1, 0, 0); g.restore();
    g.fillStyle = '#1a1a1a'; g.fillRect(500, 20, 280, 50); g.fillStyle = '#f0e0a0'; g.font = '22px Oswald'; g.fillText('ROME · PARIS · ZÜRICH', 520, 54);
    tiles(g, 520, w, h, '#c8c0b0', '#a8a090', 10302); grain(g, w, h, 10303, .04); });

  // an archive room: shelves of grey boxes, a long table under a lamp
  VP.set('ec2_archive', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#b8b4a8', 10401); for (let r = 0; r < 4; r++) { g.fillStyle = '#5a5248'; g.fillRect(60, 100 + r * 100, 1160, 8); for (let k = 0; k < 20; k++) { g.fillStyle = S.mix('#8a8a82', '#a8a49a', (k + r) % 2); g.fillRect(70 + k * 57, 40 + r * 100, 50, 60); g.fillStyle = '#e8e4dc'; g.fillRect(84 + k * 57, 56 + r * 100, 22, 10); } }
    floorboards(g, 520, w, h, '#5a4a3a', 10402); lamp(g, 640, 200); grain(g, w, h, 10403, .05); });
})(window);
