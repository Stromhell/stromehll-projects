// Japan acts 4-5 sets: the Diet press room, a school lab and gate, a station platform, a home, a post office;
// then the 1964 stadium, rebuilt Hiroshima, an export port and the city at night.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2, { sky, ridge, wood, tin, grain } = S.JPX;
  const shoji = (g, x, y, w, h) => { g.fillStyle = '#ece2c8'; g.fillRect(x, y, w, h); g.strokeStyle = '#5a3a22'; g.lineWidth = 3; for (let i = x; i <= x + w; i += w / 4) { g.beginPath(); g.moveTo(i, y); g.lineTo(i, y + h); g.stroke(); } for (let j = y; j <= y + h; j += h / 6) { g.beginPath(); g.moveTo(x, j); g.lineTo(x + w, j); g.stroke(); } g.lineWidth = 6; g.strokeRect(x, y, w, h); };
  const floorBoards = (g, y, w, h, col, seed) => { const fl = g.createLinearGradient(0, y, 0, h); fl.addColorStop(0, col); fl.addColorStop(1, S.mix(col, '#000000', .35)); g.fillStyle = fl; g.fillRect(0, y, w, h - y); for (let x = -200; x < w + 200; x += 46) { g.strokeStyle = S.rgba('#2a1a10', .3); g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (x - w / 2) * .5, h); g.stroke(); } S.dabs(g, { x: 0, y, w, h: h - y, n: 160, cols: ['#2a1a10', '#d8b080'], r0: 4, r1: 20, sq: .3, a0: .05, a1: .15, seed }); };

  // press room: curtain, rising-sun-free neutral backdrop, a wooden podium; the chart is drawn by the page
  VP.set('jp_podium', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a2a2a'], [1, '#2a1c1a']]);
    for (let x = 0; x < w; x += 36) { const gr = g.createLinearGradient(x, 0, x + 36, 0); gr.addColorStop(0, '#5a1e22'); gr.addColorStop(.5, '#8a2e30'); gr.addColorStop(1, '#4a1a1c'); g.fillStyle = gr; g.fillRect(x, 0, 36, 480); }
    g.fillStyle = '#c8a040'; g.fillRect(0, 20, w, 8); S.glow(g, 640, 200, 600, '#ffe0b0', .25);
    g.fillStyle = '#f4ecd8'; g.fillRect(760, 90, 420, 300); g.strokeStyle = '#3a2a1a'; g.lineWidth = 8; g.strokeRect(760, 90, 420, 300);
    g.strokeStyle = S.rgba('#7ab0c8', .4); g.lineWidth = 1; for (let x = 780; x < 1170; x += 30) { g.beginPath(); g.moveTo(x, 110); g.lineTo(x, 370); g.stroke(); } for (let y = 110; y < 380; y += 30) { g.beginPath(); g.moveTo(770, y); g.lineTo(1170, y); g.stroke(); }
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.beginPath(); g.moveTo(800, 120); g.lineTo(800, 350); g.lineTo(1150, 350); g.stroke();
    floorBoards(g, 480, w, h, '#7a5232', 901);
    grain(g, w, h, 903, .04);
  });
  // school lab with a window onto a playground
  VP.set('jp_lab', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#d8d0b8'], [1, '#b8ae94']]);
    g.fillStyle = '#c8bc9c'; g.fillRect(0, 300, w, 180); S.dabs(g, { x: 0, y: 0, w, h: 480, n: 160, cols: ['#a89a78', '#e8e0c8'], r0: 10, r1: 50, a0: .05, a1: .15, seed: 911 });
    g.fillStyle = '#2a4a3a'; g.fillRect(80, 80, 520, 200); g.strokeStyle = '#8a6a3a'; g.lineWidth = 10; g.strokeRect(80, 80, 520, 200); g.strokeStyle = S.rgba('#ffffff', .75); g.lineWidth = 3; g.font = '34px Caveat'; g.fillStyle = S.rgba('#ffffff', .8); g.fillText('H₂O    2H₂ + O₂ → 2H₂O', 120, 150); g.fillText('F = m × a', 140, 220); g.beginPath(); g.arc(470, 190, 50, 0, TAU); g.stroke();
    for (const x of [700, 960]) { g.fillStyle = '#c8dce4'; g.fillRect(x, 70, 220, 220); g.strokeStyle = '#6a5a40'; g.lineWidth = 8; g.strokeRect(x, 70, 220, 220); g.beginPath(); g.moveTo(x + 110, 70); g.lineTo(x + 110, 290); g.moveTo(x, 180); g.lineTo(x + 220, 180); g.stroke(); g.fillStyle = '#7aa05a'; g.fillRect(x + 4, 230, 212, 56); }
    // shelves of glassware
    wood(g, 80, 300, 1120, 14, '#7a5232', 913); for (let k = 0; k < 24; k++) { const x = 100 + k * 46, col = ['#a8d0c0', '#e8c8a0', '#c8a8d8', '#a8c8e8'][k % 4]; g.fillStyle = S.rgba(col, .8); g.beginPath(); if (k % 2) { g.moveTo(x, 300); g.lineTo(x + 8, 270); g.lineTo(x + 8, 252); g.lineTo(x + 16, 252); g.lineTo(x + 16, 270); g.lineTo(x + 24, 300); } else g.rect(x + 4, 262, 14, 38); g.fill(); }
    floorBoards(g, 480, w, h, '#8a6a48', 915);
    grain(g, w, h, 917, .04);
  });
  // a school gate, cherry trees, a wooden school building
  VP.set('jp_gate', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab8e0'], [.6, '#d8e8f0'], [1, '#e8e0c8']]);
    wood(g, 180, 150, 920, 300, '#a88a5a', 921); tin(g, 160, 120, 960, 40, '#5a6a7a', 923);
    for (let r = 0; r < 2; r++) for (let k = 0; k < 9; k++) { const x = 220 + k * 98, y = 190 + r * 120; g.fillStyle = '#d8e8ec'; g.fillRect(x, y, 70, 80); g.strokeStyle = '#4a3020'; g.lineWidth = 3; g.strokeRect(x, y, 70, 80); g.beginPath(); g.moveTo(x + 35, y); g.lineTo(x + 35, y + 80); g.stroke(); }
    g.fillStyle = '#f4ecd8'; g.fillRect(560, 132, 160, 22); g.fillStyle = '#2a2a2a'; g.font = 'bold 16px Oswald'; g.textAlign = 'center'; g.fillText('第一高等学校', 640, 149); g.textAlign = 'left';
    for (const x of [90, 1190]) { g.fillStyle = '#5a3a2a'; g.fillRect(x - 8, 220, 16, 240); for (let k = 0; k < 40; k++) { const r = S.rng(k + x)(); const a = r * TAU, d = 30 + S.rng(k * 3 + x)() * 90; g.fillStyle = ['#f4c8d0', '#f0b0c0', '#fcdce4'][k % 3]; g.beginPath(); g.arc(x + Math.cos(a) * d, 220 + Math.sin(a) * d * .6, 18 + (k % 5) * 4, 0, TAU); g.fill(); } }
    g.fillStyle = '#b8b0a0'; g.fillRect(0, 450, w, 270); S.dabs(g, { x: 0, y: 450, w, h: 270, n: 300, cols: ['#a8a090', '#d0c8b8', '#8a8478'], r0: 3, r1: 14, sq: .4, a0: .2, a1: .45, seed: 925 });
    for (const x of [400, 840]) { g.fillStyle = '#8a8478'; g.fillRect(x, 330, 40, 130); g.fillStyle = '#6a645a'; g.fillRect(x - 6, 322, 52, 14); }
    for (let k = 0; k < 30; k++) { const r = S.rng(k + 930); g.fillStyle = '#f4c8d0'; g.beginPath(); g.ellipse(r() * w, 460 + r() * 240, 4, 2, r() * 3, 0, TAU); g.fill(); }
    grain(g, w, h, 931, .04);
  });
  // a country station platform: wooden canopy, rice fields beyond; the train is drawn by the page
  VP.set('jp_platform', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9ac0e0'], [.6, '#e0e8e0'], [1, '#e8dcc0']]);
    ridge(g, w, h, 300, 60, 260, 941, '#7a9a8a'); g.fillStyle = '#9ab86a'; g.fillRect(0, 300, w, 120); for (let y = 310; y < 420; y += 14) { g.strokeStyle = S.rgba('#6a8a4a', .5); g.lineWidth = 2; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.fillStyle = '#5a5a5e'; g.fillRect(0, 410, w, 70); g.fillStyle = '#8a8a8e'; g.fillRect(0, 430, w, 5); g.fillRect(0, 462, w, 5); for (let x = 0; x < w; x += 30) { g.fillStyle = '#4a3a2a'; g.fillRect(x, 428, 14, 42); }
    g.fillStyle = '#c8bca8'; g.fillRect(0, 480, w, 240); g.fillStyle = '#e8e0d0'; g.fillRect(0, 480, w, 10); g.fillStyle = '#e8c040'; g.fillRect(0, 492, w, 4);
    S.dabs(g, { x: 0, y: 496, w, h: 224, n: 260, cols: ['#a89a88', '#e0d8c8'], r0: 3, r1: 14, sq: .4, a0: .15, a1: .35, seed: 943 });
    for (let x = 60; x < w; x += 300) { g.fillStyle = '#5a3a22'; g.fillRect(x, 120, 14, 370); } tin(g, 0, 90, w, 40, '#6a4a3a', 945); g.fillStyle = S.rgba('#000000', .15); g.fillRect(0, 130, w, 20);
    g.fillStyle = '#f4ecd8'; g.fillRect(520, 150, 240, 50); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.strokeRect(520, 150, 240, 50); g.fillStyle = '#1a1a1a'; g.font = 'bold 26px Oswald'; g.textAlign = 'center'; g.fillText('みずさわ · MIZUSAWA', 640, 186); g.textAlign = 'left';
    grain(g, w, h, 947, .04);
  });
  // a small family room: tatami, low table, shoji, the daruma shelf
  VP.set('jp_home', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a3628'], [1, '#2a1c14']]);
    shoji(g, 120, 60, 560, 380); S.glow(g, 400, 250, 500, '#ffe0a8', .35);
    wood(g, 760, 60, 380, 380, '#6a4a2e', 951); wood(g, 790, 210, 320, 14, '#8a6a42', 953);
    g.fillStyle = '#c8a8a0'; g.fillRect(820, 110, 80, 96); g.fillStyle = '#e8e0d0'; g.fillRect(828, 118, 64, 80); g.fillStyle = '#4a4a4a'; g.font = '12px Oswald'; g.fillText('家族', 845, 162);
    g.fillStyle = '#c8b878'; g.fillRect(0, 440, w, 280); for (let x = 0; x < w; x += 320) { g.strokeStyle = '#3a4a2a'; g.lineWidth = 4; g.strokeRect(x, 440, 320, 280); } S.strokes(g, { x: 0, y: 440, w, h: 280, n: 500, cols: ['#a89858', '#e0d098'], l0: 30, l1: 90, ang: 0, jit: .02, w0: 1, w1: 2, a0: .15, a1: .35, seed: 955 });
    grain(g, w, h, 957, .04);
  });
  // a post office: savings counter with a window and posters
  VP.set('jp_post', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#e0d8c0'], [1, '#c8bca0']]);
    g.fillStyle = '#c84020'; g.fillRect(0, 40, w, 50); g.fillStyle = '#f4ecd8'; g.font = 'bold 32px Oswald'; g.textAlign = 'center'; g.fillText('〒 郵便局 · POST OFFICE SAVINGS', 640, 78); g.textAlign = 'left';
    for (const [x, t] of [[120, '貯金'], [1000, 'SAVE']]) { g.fillStyle = '#f4ecd8'; g.fillRect(x, 130, 160, 200); g.strokeStyle = '#8a6a3a'; g.lineWidth = 4; g.strokeRect(x, 130, 160, 200); g.fillStyle = '#c84020'; g.font = 'bold 44px Oswald'; g.textAlign = 'center'; g.fillText(t, x + 80, 220); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(x + 80, 280, 26, 0, TAU); g.fill(); g.textAlign = 'left'; }
    wood(g, 300, 120, 680, 260, '#8a6a42', 961); for (let k = 0; k < 3; k++) { const x = 340 + k * 220; g.fillStyle = '#c8d8d8'; g.fillRect(x, 160, 160, 140); g.strokeStyle = '#4a3020'; g.lineWidth = 4; g.strokeRect(x, 160, 160, 140); g.fillStyle = '#4a3020'; g.fillRect(x + 50, 290, 60, 10); }
    wood(g, 0, 380, w, 100, '#6a4a2a', 963); g.fillStyle = S.rgba('#ffe0b0', .3); g.fillRect(0, 380, w, 4);
    floorBoards(g, 480, w, h, '#8a7a5a', 965);
    grain(g, w, h, 967, .04);
  });

  // ======================== ACT 5: 1964 ========================
  VP.set('jp_stadium', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a90d8'], [1, '#c8e0f0']]);
    for (let r = 0; r < 9; r++) { const y = 120 + r * 34; g.fillStyle = r % 2 ? '#7a7a80' : '#8a8a90'; g.beginPath(); g.moveTo(0, y); g.quadraticCurveTo(640, y - 70, w, y); g.lineTo(w, y + 34); g.quadraticCurveTo(640, y - 36, 0, y + 34); g.fill(); for (let k = 0; k < 90; k++) { const x = (k + r * .5) * 14.4, yy = y + 14 - 70 * (1 - Math.pow((x - 640) / 640, 2)) * .5 + 8; g.fillStyle = ['#e8d8c8', '#c84030', '#3a5aa0', '#f0c040', '#2a2a2a', '#ffffff'][(k * 7 + r * 3) % 6]; g.fillRect(x, yy, 7, 8); } }
    g.fillStyle = '#c84a2a'; g.beginPath(); g.moveTo(0, 440); g.quadraticCurveTo(640, 400, w, 440); g.lineTo(w, 720); g.lineTo(0, 720); g.fill();
    g.fillStyle = '#4a8a3a'; g.beginPath(); g.ellipse(640, 640, 560, 150, 0, Math.PI, TAU); g.fill(); g.strokeStyle = '#f4ecd8'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(640, 680, 600 + k * 30, 190 + k * 18, 0, Math.PI, TAU); g.stroke(); }
    S.dabs(g, { x: 0, y: 440, w, h: 280, n: 200, cols: ['#a83a1a', '#d85a3a'], r0: 3, r1: 14, sq: .4, a0: .15, a1: .3, seed: 971 });
    g.fillStyle = '#4a4a50'; g.fillRect(1080, 40, 10, 140); g.fillStyle = '#6a6a70'; g.beginPath(); g.moveTo(1050, 40); g.lineTo(1120, 40); g.lineTo(1100, 70); g.lineTo(1070, 70); g.fill();
    grain(g, w, h, 973, .04);
  });
  VP.set('jp_hiroshima', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab8e0'], [.6, '#e0ecf0'], [1, '#e8e0c8']]);
    ridge(g, w, h, 280, 60, 240, 981, '#8aa8b0');
    for (let k = 0; k < 14; k++) { const x = k * 96, hh = 80 + S.rng(k + 983)() * 120; g.fillStyle = ['#d8d0c0', '#c8c0b0', '#e0d8c8'][k % 3]; g.fillRect(x, 330 - hh, 84, hh); g.fillStyle = S.rgba('#5a7a8a', .6); for (let r = 0; r < hh / 22 - 1; r++) for (let c = 0; c < 4; c++) g.fillRect(x + 8 + c * 19, 340 - hh + r * 22, 12, 12); }
    // the A-Bomb Dome: broken walls and the bare steel dome
    g.fillStyle = '#b8a890'; g.fillRect(820, 240, 200, 120); g.fillStyle = '#8a7a64'; for (let k = 0; k < 6; k++) g.fillRect(830 + k * 32, 260, 16, 28); g.fillStyle = '#e0d8c8'; g.beginPath(); g.moveTo(820, 240); g.lineTo(840, 220); g.lineTo(880, 236); g.lineTo(930, 214); g.lineTo(980, 232); g.lineTo(1020, 240); g.fill();
    g.strokeStyle = '#4a4440'; g.lineWidth = 3; g.beginPath(); g.arc(920, 214, 46, Math.PI, TAU); g.stroke(); for (let k = 0; k < 7; k++) { const a = Math.PI + k * Math.PI / 6; g.beginPath(); g.moveTo(920, 214); g.lineTo(920 + Math.cos(a) * 46, 214 + Math.sin(a) * 46); g.stroke(); }
    g.fillStyle = '#7aa05a'; g.fillRect(0, 360, w, 360); S.dabs(g, { x: 0, y: 360, w, h: 360, n: 300, cols: ['#5a8a3a', '#9ac06a'], r0: 4, r1: 18, sq: .5, a0: .2, a1: .4, seed: 985 });
    g.fillStyle = '#d8ccb0'; g.beginPath(); g.moveTo(560, 720); g.lineTo(720, 720); g.lineTo(660, 360); g.lineTo(620, 360); g.fill();
    g.fillStyle = '#7ab0d0'; g.fillRect(0, 352, w, 12);
    for (const x of [140, 300, 980, 1160]) { g.fillStyle = '#5a3a2a'; g.fillRect(x - 6, 380, 12, 120); for (let k = 0; k < 30; k++) { const a = S.rng(k + x)() * TAU, d = 20 + S.rng(k * 5 + x)() * 60; g.fillStyle = ['#f4c8d0', '#f0b0c0', '#fcdce4'][k % 3]; g.beginPath(); g.arc(x + Math.cos(a) * d, 380 + Math.sin(a) * d * .6, 14 + (k % 4) * 3, 0, TAU); g.fill(); } }
    grain(g, w, h, 987, .04);
  });
  VP.set('jp_port', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa8d0'], [.6, '#d0e0e8'], [1, '#e8dcc8']]);
    g.fillStyle = '#4a7a9a'; g.fillRect(0, 260, w, 100); for (let k = 0; k < 30; k++) { g.strokeStyle = S.rgba('#ffffff', .3); g.lineWidth = 2; const x = (k * 97) % w, y = 270 + (k * 13) % 80; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30, y); g.stroke(); }
    // car carrier ship
    g.fillStyle = '#e8e4dc'; g.fillRect(520, 140, 600, 130); g.fillStyle = '#2a3a5a'; g.fillRect(520, 240, 600, 30); g.fillStyle = '#c82020'; g.fillRect(520, 232, 600, 8); for (let k = 0; k < 14; k++) { g.fillStyle = '#9ab0c0'; g.fillRect(540 + k * 40, 160, 20, 12); }
    g.fillStyle = '#1a1a1a'; g.font = 'bold 22px Oswald'; g.fillText('NIPPON EXPORT', 560, 220);
    for (const x of [140, 380]) { g.strokeStyle = '#c84a2a'; g.lineWidth = 8; g.beginPath(); g.moveTo(x, 360); g.lineTo(x, 80); g.lineTo(x + 140, 80); g.stroke(); g.lineWidth = 2; g.beginPath(); g.moveTo(x + 120, 80); g.lineTo(x + 120, 200); g.stroke(); }
    g.fillStyle = '#9a948a'; g.fillRect(0, 360, w, 360); S.dabs(g, { x: 0, y: 360, w, h: 360, n: 200, cols: ['#7a746a', '#b8b0a4'], r0: 3, r1: 14, sq: .4, a0: .15, a1: .3, seed: 991 }); g.fillStyle = '#e8c040'; for (let y = 400; y < 720; y += 80) g.fillRect(0, y, w, 3);
    grain(g, w, h, 993, .04);
  });
  // a family room at night, window onto the lit city and a bridge
  VP.set('jp_window', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a1430'], [.6, '#2a3a6a'], [1, '#5a4a6a']]);
    for (let k = 0; k < 40; k++) { const x = k * 32, hh = 60 + S.rng(k + 995)() * 220; g.fillStyle = '#141a2e'; g.fillRect(x, 470 - hh, 30, hh); for (let r = 0; r < hh / 14 - 1; r++) for (let c = 0; c < 3; c++) if (S.rng(k * 31 + r * 7 + c)() > .45) { g.fillStyle = S.rgba(['#ffd870', '#fff0c0', '#a8d0ff'][(k + r) % 3], .85); g.fillRect(x + 4 + c * 9, 476 - hh + r * 14, 5, 7); } }
    g.fillStyle = '#ff3a3a'; g.beginPath(); g.arc(700, 160, 4, 0, TAU); g.fill(); g.strokeStyle = '#c84020'; g.lineWidth = 4; g.beginPath(); g.moveTo(700, 160); g.lineTo(670, 470); g.moveTo(700, 160); g.lineTo(730, 470); g.stroke();
    g.strokeStyle = '#3a3a4a'; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 520); g.lineTo(w, 500); g.stroke(); for (let x = 0; x < w; x += 80) { g.lineWidth = 3; g.beginPath(); g.moveTo(x, 520 - x / w * 20); g.lineTo(x, 600); g.stroke(); }
    g.fillStyle = '#0a0e1a'; g.fillRect(0, 600, w, 120); for (let k = 0; k < 60; k++) { g.fillStyle = S.rgba('#ffd870', .5); g.fillRect((k * 53) % w, 620 + (k * 17) % 90, 3, 3); }
    grain(g, w, h, 997, .03);
  });
})(window);
