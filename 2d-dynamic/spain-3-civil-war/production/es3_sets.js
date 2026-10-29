// Spain 3 sets: 20th-century Spain. Cold open (1981) and act 1 (1898-1931).
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill } = X;
  const wood = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); S.strokes(g, { x, y, w, h, n: Math.round(w * h / 300), cols: [S.mix(base, '#000000', .25), S.mix(base, '#ffffff', .15)], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 2, a0: .15, a1: .35, seed }); };
  X.wood = wood;
  // ======================== THE CONGRESS CHAMBER ========================
  VP.set('cortes', 1280, 720, (g, w, h) => {
    g.fillStyle = '#3a2418'; g.fillRect(0, 0, w, h);
    // panelled back wall with pilasters and a gilded frieze
    wood(g, 0, 0, w, 330, '#6a3e24', 501);
    for (let x = 40; x < w; x += 160) { g.fillStyle = '#4a2a18'; g.fillRect(x, 60, 22, 270); g.fillStyle = S.rgba('#ffd8a0', .2); g.fillRect(x, 60, 4, 270); g.strokeStyle = S.rgba('#2a160c', .7); g.lineWidth = 3; g.strokeRect(x + 40, 100, 90, 180); }
    g.fillStyle = '#c8a040'; g.fillRect(0, 40, w, 18); for (let x = 0; x < w; x += 24) { g.fillStyle = '#8a6a20'; g.fillRect(x + 4, 44, 10, 10); }
    // the rostrum and president's bench
    wood(g, 470, 230, 340, 110, '#5a301c', 503); g.fillStyle = '#c8a040'; g.fillRect(470, 230, 340, 8); g.fillStyle = '#7a1a1a'; g.fillRect(560, 180, 160, 50);
    g.fillStyle = '#4a2a18'; g.fillRect(610, 300, 60, 60); g.fillStyle = '#c8a040'; g.fillRect(606, 296, 68, 6);
    // the floor of the chamber: carpet and the steps of the tiers (benches are drawn per shot, in front of the deputies)
    g.fillStyle = '#6a1e1e'; g.fillRect(0, 340, w, h - 340); S.dabs(g, { x: 0, y: 340, w, h: 380, n: 400, cols: ['#7a2a2a', '#4a1212'], r0: 6, r1: 20, a0: .15, a1: .3, seed: 505 });
    for (let r = 0; r < 5; r++) { const y = 400 + r * 70; g.fillStyle = '#4a2a18'; g.fillRect(0, y - 6, w, 10); }
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
    wood(g, 120, 400, 260, 130, '#5a3a22', 525); g.fillStyle = '#2a2a2a'; g.fillRect(150, 300, 200, 110); g.fillStyle = '#4a4a4a'; g.fillRect(156, 306, 188, 98); g.fillStyle = '#1a2a2a'; g.fillRect(166, 314, 140, 82); g.fillStyle = '#888'; g.fillRect(318, 320, 14, 14); g.fillRect(318, 344, 14, 14);
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
