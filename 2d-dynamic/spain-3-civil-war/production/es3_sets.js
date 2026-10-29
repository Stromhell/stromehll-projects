// Spain 3 sets: 20th-century Spain. Cold open (1981) and act 1 (1898-1931).
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill } = X;
  const wood = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); S.strokes(g, { x, y, w, h, n: Math.round(w * h / 300), cols: [S.mix(base, '#000000', .25), S.mix(base, '#ffffff', .15)], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 2, a0: .15, a1: .35, seed }); };
  X.wood = wood;
  // ======================== THE CONGRESS CHAMBER ========================
  VP.set('cortes', 1280, 720, (g, w, h) => {
    g.fillStyle = '#3a2418'; g.fillRect(0, 0, w, h);
    // coffered ceiling band with gilded rosettes
    g.fillStyle = '#4a2c1a'; g.fillRect(0, 0, w, 40);
    for (let x = 0; x < w; x += 64) { g.fillStyle = '#3a2012'; g.fillRect(x + 6, 6, 52, 28); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(x + 32, 20, 6, 0, TAU); g.fill(); g.fillStyle = S.rgba('#fff0c0', .35); g.beginPath(); g.arc(x + 30, 18, 2, 0, TAU); g.fill(); }
    // panelled back wall
    wood(g, 0, 40, w, 300, '#6a3e24', 501);
    S.dabs(g, { x: 0, y: 40, w, h: 300, n: 260, cols: ['#7a4a2c', '#4a2814', '#8a5a34'], r0: 6, r1: 22, a0: .08, a1: .2, seed: 509 });
    // gilded frieze with a running key pattern
    g.fillStyle = '#c8a040'; g.fillRect(0, 40, w, 20); g.fillStyle = '#8a6a20'; for (let x = 0; x < w; x += 24) { g.fillRect(x + 4, 44, 10, 4); g.fillRect(x + 4, 44, 4, 10); g.fillRect(x + 10, 50, 10, 4); }
    g.fillStyle = S.rgba('#fff0c0', .4); g.fillRect(0, 40, w, 2);
    // pilasters with capitals, and between them gilt-framed oil paintings and bronze sconces
    const paint = (x, y, pw, ph, seed) => {
      g.fillStyle = '#a8842c'; g.fillRect(x - 6, y - 6, pw + 12, ph + 12); g.fillStyle = '#e0c060'; g.fillRect(x - 6, y - 6, pw + 12, 2); g.fillStyle = '#5a4210'; g.fillRect(x - 6, y + ph + 4, pw + 12, 2);
      const sk = g.createLinearGradient(0, y, 0, y + ph); sk.addColorStop(0, '#4a4a3a'); sk.addColorStop(.6, '#6a5a3a'); sk.addColorStop(1, '#2a2418'); g.fillStyle = sk; g.fillRect(x, y, pw, ph);
      S.dabs(g, { x, y, w: pw, h: ph, n: 40, cols: ['#8a7a4a', '#3a3424', '#a08a5a', '#5a2a1a'], r0: 2, r1: 7, a0: .3, a1: .6, seed });
      g.fillStyle = S.rgba('#1a140c', .6); g.beginPath(); g.moveTo(x, y + ph * .7); for (let i = 0; i <= 6; i++) g.lineTo(x + i * pw / 6, y + ph * (.62 + .1 * Math.sin(i * 1.7 + seed))); g.lineTo(x + pw, y + ph); g.lineTo(x, y + ph); g.fill();
    };
    for (let x = 40, i = 0; x < w; x += 160, i++) {
      g.fillStyle = '#4a2a18'; g.fillRect(x, 70, 22, 270); g.fillStyle = S.rgba('#ffd8a0', .22); g.fillRect(x, 70, 4, 270); g.fillStyle = S.rgba('#1a0c04', .35); g.fillRect(x + 18, 70, 4, 270);
      g.fillStyle = '#b8902c'; g.fillRect(x - 6, 64, 34, 10); g.fillRect(x - 4, 330, 30, 10);
      if (x + 40 < 470 || x + 40 > 800) { paint(x + 44, 110, 82, 110, 510 + i); g.strokeStyle = S.rgba('#2a160c', .7); g.lineWidth = 3; g.strokeRect(x + 40, 250, 90, 70); g.strokeStyle = S.rgba('#ffd8a0', .15); g.lineWidth = 1; g.strokeRect(x + 44, 254, 82, 62); }
      // sconce
      g.fillStyle = '#8a6a2a'; g.fillRect(x + 6, 150, 10, 24); g.fillStyle = '#ffe8b0'; g.beginPath(); g.ellipse(x + 11, 144, 8, 10, 0, 0, TAU); g.fill(); S.glow(g, x + 11, 146, 70, '#ffd890', .35);
    }
    // red velvet drapes and the coat of arms behind the president's bench
    for (const sx of [455, 825]) { const dg = g.createLinearGradient(sx - 30, 0, sx + 30, 0); dg.addColorStop(0, '#5a0e0e'); dg.addColorStop(.5, '#9a2020'); dg.addColorStop(1, '#4a0a0a'); g.fillStyle = dg; g.beginPath(); g.moveTo(sx - 30, 60); g.lineTo(sx + 30, 60); g.quadraticCurveTo(sx + 20, 200, sx + 34, 330); g.lineTo(sx - 34, 330); g.quadraticCurveTo(sx - 20, 200, sx - 30, 60); g.fill(); for (let k = -2; k <= 2; k++) { g.strokeStyle = S.rgba('#2a0404', .35); g.lineWidth = 2; g.beginPath(); g.moveTo(sx + k * 10, 64); g.quadraticCurveTo(sx + k * 8, 200, sx + k * 12, 328); g.stroke(); } }
    g.fillStyle = '#7a1a1a'; g.fillRect(500, 64, 280, 120); S.dabs(g, { x: 500, y: 64, w: 280, h: 120, n: 60, cols: ['#9a2a2a', '#5a0e0e'], r0: 4, r1: 12, a0: .2, a1: .4, seed: 530 });
    g.fillStyle = '#c8a040'; g.beginPath(); g.moveTo(612, 84); g.lineTo(668, 84); g.lineTo(668, 136); g.quadraticCurveTo(640, 166, 612, 136); g.closePath(); g.fill(); g.fillStyle = '#b8202a'; g.fillRect(618, 90, 22, 22); g.fillStyle = '#e8b820'; g.fillRect(640, 90, 22, 22); g.fillStyle = '#e8b820'; g.fillRect(618, 112, 22, 22); g.fillStyle = '#b8202a'; g.fillRect(640, 112, 22, 22);
    g.fillStyle = '#d8b040'; g.beginPath(); g.moveTo(618, 84); g.lineTo(626, 70); g.lineTo(640, 78); g.lineTo(654, 70); g.lineTo(662, 84); g.fill();
    // the president's bench (upper) with high-backed chairs, and the speaker's rostrum (lower)
    for (let k = 0; k < 5; k++) { const cx = 520 + k * 60; g.fillStyle = '#5a1010'; g.beginPath(); g.roundRect(cx, 150, 36, 50, [10, 10, 0, 0]); g.fill(); g.fillStyle = '#c8a040'; g.fillRect(cx + 14, 146, 8, 6); }
    wood(g, 470, 200, 340, 40, '#5a301c', 502); g.fillStyle = '#7a1a1a'; g.fillRect(470, 200, 340, 8); g.fillStyle = '#c8a040'; g.fillRect(470, 208, 340, 3);
    wood(g, 490, 236, 300, 104, '#5a301c', 503); g.fillStyle = '#c8a040'; g.fillRect(490, 236, 300, 6);
    for (let k = 0; k < 5; k++) { g.strokeStyle = S.rgba('#2a160c', .6); g.lineWidth = 2; g.strokeRect(500 + k * 58, 256, 48, 70); g.fillStyle = S.rgba('#ffd8a0', .12); g.fillRect(502 + k * 58, 258, 44, 3); }
    g.fillStyle = '#4a2a18'; g.fillRect(610, 300, 60, 40); g.fillStyle = '#c8a040'; g.fillRect(606, 296, 68, 6); g.fillStyle = '#222'; g.fillRect(638, 276, 3, 22); g.beginPath(); g.arc(640, 274, 4, 0, TAU); g.fill();
    // floor of the chamber: patterned red carpet (the tiers and benches are drawn per shot)
    g.fillStyle = '#6a1e1e'; g.fillRect(0, 340, w, h - 340);
    S.dabs(g, { x: 0, y: 340, w, h: 380, n: 500, cols: ['#7a2a2a', '#4a1212', '#8a3030'], r0: 5, r1: 18, a0: .12, a1: .28, seed: 505 });
    for (let y = 360; y < h; y += 40) for (let x = (y / 40 % 2) * 30; x < w; x += 60) { g.fillStyle = S.rgba('#c8a040', .12); g.beginPath(); g.moveTo(x, y - 6); g.lineTo(x + 6, y); g.lineTo(x, y + 6); g.lineTo(x - 6, y); g.fill(); }
    g.fillStyle = S.rgba('#1a0604', .45); g.fillRect(0, 340, w, 10);
    S.glow(g, 640, 0, 700, '#ffe8c0', .15);
  });
  // ======================== A 1981 LIVING ROOM ========================
  VP.set('living', 1280, 720, (g, w, h) => {
    g.fillStyle = '#c8a878'; g.fillRect(0, 0, w, 520); for (let x = 0; x < w; x += 40) { g.fillStyle = S.rgba('#8a6a40', .25); g.fillRect(x, 0, 14, 520); }
    for (let i = 0; i < 300; i++) { const r = S.rng(i + 520); g.fillStyle = S.rgba('#6a4a2a', .2); g.beginPath(); g.arc(r() * w, r() * 520, 3 + r() * 3, 0, TAU); g.fill(); }
    // window at night with net curtains
    g.fillStyle = '#141a30'; g.fillRect(860, 110, 260, 240); g.fillStyle = '#e8e0c8'; g.fillRect(850, 100, 280, 10); g.fillStyle = S.rgba('#f0ece0', .35); g.fillRect(860, 110, 90, 240); g.fillRect(1030, 110, 90, 240);
    for (let k = 0; k < 6; k++) { g.fillStyle = '#ffd890'; g.fillRect(900 + k * 30, 260 + (k % 3) * 20, 6, 8); }
    g.fillStyle = '#6a4a30'; g.fillRect(0, 520, w, h - 520); S.strokes(g, { x: 0, y: 520, w, h: 200, n: 500, cols: ['#7a5a3a', '#4a3020'], l0: 30, l1: 90, ang: 0, jit: .02, w0: 2, w1: 4, a0: .2, a1: .4, seed: 523 });
    // patterned rug
    g.fillStyle = '#8a3a2a'; g.beginPath(); g.ellipse(560, 640, 360, 50, 0, 0, TAU); g.fill(); g.strokeStyle = '#d8a040'; g.lineWidth = 4; g.beginPath(); g.ellipse(560, 640, 320, 40, 0, 0, TAU); g.stroke();
    // sideboard with the TV, a lamp
    wood(g, 120, 400, 260, 130, '#5a3a22', 525); g.strokeStyle = S.rgba('#2a1a0c', .7); g.lineWidth = 2; g.strokeRect(132, 420, 112, 100); g.strokeRect(256, 420, 112, 100); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(236, 470, 4, 0, TAU); g.arc(264, 470, 4, 0, TAU); g.fill(); g.fillStyle = S.rgba('#ffd8a0', .18); g.fillRect(120, 400, 260, 3); g.fillStyle = '#3a2414'; g.fillRect(130, 530, 12, 14); g.fillRect(358, 530, 12, 14);
    // wall clock, framed wedding photo, a shelf with plates, and a potted plant
    g.fillStyle = '#5a3a22'; g.beginPath(); g.arc(560, 170, 34, 0, TAU); g.fill(); g.fillStyle = '#f0e8d4'; g.beginPath(); g.arc(560, 170, 27, 0, TAU); g.fill(); g.strokeStyle = '#2a1a0c'; g.lineWidth = 3; g.beginPath(); g.moveTo(560, 170); g.lineTo(560, 150); g.moveTo(560, 170); g.lineTo(574, 176); g.stroke();
    g.fillStyle = '#a8842c'; g.fillRect(660, 140, 90, 110); g.fillStyle = '#c8b898'; g.fillRect(668, 148, 74, 94); g.fillStyle = '#5a4a3a'; g.beginPath(); g.arc(692, 186, 10, 0, TAU); g.arc(718, 184, 10, 0, TAU); g.fill(); g.fillRect(682, 196, 20, 40); g.fillStyle = '#f0ece0'; g.fillRect(708, 194, 22, 42);
    g.fillStyle = '#5a3a22'; g.fillRect(420, 280, 160, 10); for (let k = 0; k < 4; k++) { g.fillStyle = ['#e8e0c8', '#7a9ac0', '#e8e0c8', '#c06a4a'][k]; g.beginPath(); g.arc(442 + k * 38, 262, 16, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#2a1a0c', .4); g.lineWidth = 2; g.stroke(); }
    g.fillStyle = '#8a4a2a'; g.beginPath(); g.moveTo(452, 560); g.lineTo(492, 560); g.lineTo(486, 610); g.lineTo(458, 610); g.fill(); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .28; g.strokeStyle = k % 2 ? '#3a6a2a' : '#4a8a3a'; g.lineWidth = 6; g.beginPath(); g.moveTo(472, 562); g.quadraticCurveTo(472 + Math.cos(a) * 30, 540 + Math.sin(a) * 30, 472 + Math.cos(a) * 60, 560 + Math.sin(a) * 70); g.stroke(); } g.fillStyle = '#2a2a2a'; g.fillRect(150, 300, 200, 110); g.fillStyle = '#4a4a4a'; g.fillRect(156, 306, 188, 98); g.fillStyle = '#1a2a2a'; g.fillRect(166, 314, 140, 82); g.fillStyle = '#888'; g.fillRect(318, 320, 14, 14); g.fillRect(318, 344, 14, 14);
    g.strokeStyle = '#888'; g.lineWidth = 2; g.beginPath(); g.moveTo(250, 300); g.lineTo(210, 250); g.moveTo(250, 300); g.lineTo(290, 250); g.stroke();
    g.fillStyle = '#e8c890'; g.beginPath(); g.moveTo(1150, 380); g.lineTo(1210, 380); g.lineTo(1230, 440); g.lineTo(1130, 440); g.fill(); g.fillStyle = '#4a3020'; g.fillRect(1176, 440, 8, 120); g.fillRect(1150, 556, 60, 8);
    // the sofa
    g.fillStyle = '#6a7a4a'; g.beginPath(); g.roundRect(560, 470, 460, 100, 20); g.fill(); g.fillStyle = '#7a8a5a'; g.beginPath(); g.roundRect(580, 520, 420, 60, 14); g.fill(); g.fillStyle = '#5a6a3a'; g.fillRect(560, 560, 460, 40); g.fillStyle = '#3a2a1a'; g.fillRect(575, 600, 16, 20); g.fillRect(990, 600, 16, 20);
  });
  // ======================== THE TV STUDIO ========================
  VP.set('studio', 1280, 720, (g, w, h) => {
    g.fillStyle = '#1a1820'; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 26) { g.fillStyle = S.mix('#3a2a3a', '#241a24', (x / 26) % 2); g.fillRect(x, 0, 26, 560); }
    // the flag and a portrait behind the desk
    g.fillStyle = '#b8202a'; g.fillRect(860, 120, 120, 300); g.fillStyle = '#e8b820'; g.fillRect(860, 195, 120, 150); g.fillStyle = '#5a3a1a'; g.fillRect(916, 100, 6, 360);
    wood(g, 300, 150, 200, 240, '#6a4a2a', 531); g.fillStyle = '#3a3a40'; g.fillRect(320, 170, 160, 200);
    // desk
    wood(g, 380, 520, 520, 200, '#4a2a18', 533); g.fillStyle = '#c8a040'; g.fillRect(380, 520, 520, 6);
    S.glow(g, 640, 300, 500, '#ffe8c0', .12);
  });
  // ======================== A WALL FOR THE CRACKED FLAG ========================
  VP.set('flagwall', 1280, 720, (g, w, h) => {
    g.fillStyle = '#4a4440'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 180; i++) { const r = S.rng(i + 540), x = (i % 18) * 74 + (Math.floor(i / 18) % 2) * 37 - 20, y = Math.floor(i / 18) * 74; g.fillStyle = S.mix('#5a5450', '#3a3430', r()); g.fillRect(x + 3, y + 3, 68, 68); }
    S.dabs(g, { x: 0, y: 0, w, h, n: 600, cols: ['#6a6460', '#2a2420'], r0: 6, r1: 30, a0: .06, a1: .15, seed: 541 });
  });
  // ======================== HILL ABOVE A TOWN AT DUSK ========================
  VP.set('hilltown', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2440'], [.45, '#a84a3a'], [.62, '#f0a050']]);
    S.dabs(g, { x: 0, y: 60, w, h: 300, n: 300, cols: ['#4a3050', '#c8604a'], r0: 20, r1: 120, sq: .2, a0: .08, a1: .2, seed: 551 });
    hill(g, 470, 60, 220, 553, '#4a3040', ['#5a3a48', '#3a2030'], w, h);
    for (let i = 0; i < 70; i++) { const r = S.rng(i + 555), x = 500 + r() * 700, y = 470 + r() * 50, s = 10 + r() * 18; g.fillStyle = S.mix('#3a2a30', '#5a3a3a', r()); g.fillRect(x, y - s, s * 1.4, s); g.fillStyle = '#2a1a20'; g.beginPath(); g.moveTo(x - 2, y - s); g.lineTo(x + s * .7, y - s * 1.5); g.lineTo(x + s * 1.4 + 2, y - s); g.fill(); }
    g.fillStyle = '#5a3a40'; g.fillRect(820, 380, 30, 110); g.beginPath(); g.moveTo(816, 380); g.lineTo(835, 350); g.lineTo(854, 380); g.fill();
    const fg = hill(g, 600, 160, 400, 557, '#1e1418', null, w, h);
  });
  // ======================== AN ANDALUSIAN ESTATE ========================
  VP.set('estate', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.5, '#f0e0c0'], [.6, '#f4e4c4']]);
    hill(g, 360, 50, 260, 561, '#c8a878', ['#d8b888', '#a88858'], w, h);
    // white cortijo with a tiled roof
    g.fillStyle = '#f2ece0'; g.fillRect(860, 270, 280, 110); g.fillStyle = '#b85a3a'; g.beginPath(); g.moveTo(850, 272); g.lineTo(1000, 230); g.lineTo(1150, 272); g.fill(); for (const x of [890, 960, 1040, 1100]) { g.fillStyle = '#4a3020'; g.fillRect(x, 310, 22, 34); }
    // rows of olive trees and the stubble field
    const fg = g.createLinearGradient(0, 380, 0, h); fg.addColorStop(0, '#d8b878'); fg.addColorStop(1, '#a8884a'); g.fillStyle = fg; g.fillRect(0, 380, w, h - 380);
    S.strokes(g, { x: 0, y: 400, w, h: 320, n: 1600, cols: ['#e8d098', '#8a6a3a', '#c8a868'], l0: 6, l1: 16, ang: -1.4, jit: .4, w0: 1, w1: 2, a0: .3, a1: .6, seed: 563 });
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 40 + i * 150 + r * 50, y = 400 + r * 22, s = .6 + r * .2; g.fillStyle = '#5a4a30'; g.fillRect(x - 3 * s, y - 20 * s, 6 * s, 20 * s); S.dabs(g, { x: x - 30 * s, y: y - 50 * s, w: 60 * s, h: 34 * s, n: 30, cols: ['#6a7a4a', '#8a9a6a', '#4a5a3a'], r0: 6 * s, r1: 14 * s, a0: .6, a1: .9, seed: i + r * 17 + 565 }); }
  });
  // ======================== A DESERT OUTPOST IN MOROCCO ========================
  VP.set('outpost', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa0c8'], [.5, '#f0dcb0'], [.62, '#f4d8a8']]);
    hill(g, 380, 90, 200, 571, '#b88a5a', ['#c89a6a', '#9a6a3a'], w, h);
    hill(g, 440, 60, 300, 573, '#d8aa70', ['#e8ba80', '#b88a50'], w, h);
    // mud-brick fort with a flagpole
    g.fillStyle = '#c89a6a'; g.fillRect(760, 300, 300, 140); g.fillStyle = '#a87a4a'; g.fillRect(760, 300, 300, 10); for (let x = 760; x < 1060; x += 24) g.fillRect(x, 288, 12, 14);
    g.fillStyle = '#c89a6a'; g.fillRect(730, 260, 60, 180); g.fillRect(1030, 260, 60, 180); g.fillStyle = '#3a2418'; g.fillRect(880, 370, 60, 70);
    const fg = g.createLinearGradient(0, 440, 0, h); fg.addColorStop(0, '#e8c088'); fg.addColorStop(1, '#c89858'); g.fillStyle = fg; g.fillRect(0, 440, w, h - 440);
    S.strokes(g, { x: 0, y: 440, w, h: 280, n: 900, cols: ['#f0d098', '#a87a4a'], l0: 20, l1: 60, ang: .05, jit: .1, w0: 1, w1: 2.5, a0: .2, a1: .45, seed: 575 });
  });
  // ======================== A MADRID BALCONY OVER A SQUARE ========================
  VP.set('plaza', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa8d8'], [.4, '#e8e0d0']]);
    // a long civic facade with balconies and a clock tower
    g.fillStyle = '#d8b898'; g.fillRect(0, 140, w, 380); g.fillStyle = '#b8987a'; g.fillRect(0, 140, w, 14);
    g.fillStyle = '#e0c4a4'; g.fillRect(560, 40, 160, 120); g.fillStyle = '#f4f0e4'; g.beginPath(); g.arc(640, 100, 40, 0, TAU); g.fill(); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.beginPath(); g.moveTo(640, 100); g.lineTo(640, 72); g.moveTo(640, 100); g.lineTo(660, 108); g.stroke(); g.fillStyle = '#5a6068'; g.beginPath(); g.moveTo(552, 40); g.lineTo(640, 0); g.lineTo(728, 40); g.fill();
    for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) { const x = 40 + i * 104, y = 190 + r * 110; if (r === 1 && i >= 5 && i <= 6) continue; g.fillStyle = '#4a3a30'; g.fillRect(x, y, 44, 70); g.fillStyle = '#6a7a8a'; g.fillRect(x + 4, y + 4, 36, 30); g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.strokeRect(x - 6, y + 56, 56, 14); for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(x - 4 + k * 10, y + 56); g.lineTo(x - 4 + k * 10, y + 70); g.stroke(); } }
    // the main balcony in the middle
    g.fillStyle = '#3a2a20'; g.fillRect(540, 280, 200, 120); g.fillStyle = '#a8987a'; g.fillRect(510, 390, 260, 16); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.strokeRect(516, 350, 248, 40); for (let k = 0; k < 13; k++) { g.beginPath(); g.moveTo(520 + k * 20, 350); g.lineTo(520 + k * 20, 390); g.stroke(); }
    g.fillStyle = '#c8b8a0'; g.fillRect(0, 520, w, h - 520); S.dabs(g, { x: 0, y: 520, w, h: 200, n: 500, cols: ['#d8c8b0', '#a89880'], r0: 4, r1: 12, a0: .2, a1: .45, seed: 581 });
  });
})(window);
