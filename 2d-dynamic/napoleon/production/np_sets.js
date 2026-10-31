// Napoleon sets (Village Painterly): Neman crossing at dawn, Brienne dormitory, Paris 1789, night bay (Toulon/Aboukir),
// Notre-Dame, frozen Austerlitz fields, parchment, Moscow, Berezina, Waterloo ridge, Saint Helena, Longwood, the last bedroom.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, wood, grain } = S.JPX;
  const mist = (g, w, y, hgt, col, a, seed) => { for (let k = 0; k < 7; k++) { const r = S.rng(seed + k); g.fillStyle = S.rgba(col, a * (.5 + r() * .5)); g.beginPath(); g.ellipse(r() * w, y + (r() - .5) * hgt, 220 + r() * 260, hgt * (.3 + r() * .3), 0, 0, TAU); g.fill(); } };
  const tree = (g, x, y, s, col, seed) => { const r = S.rng(seed); g.fillStyle = S.mix(col, '#000000', .35); g.fillRect(x - 3 * s, y - 30 * s, 6 * s, 30 * s);
    for (let k = 0; k < 6; k++) { g.fillStyle = S.mix(col, k % 2 ? '#ffffff' : '#000000', .12 * r()); g.beginPath(); g.arc(x + (r() - .5) * 30 * s, y - 40 * s - r() * 30 * s, (14 + r() * 10) * s, 0, TAU); g.fill(); } };
  const bare = (g, x, y, s, col) => { g.strokeStyle = col; g.lineCap = 'round'; const br = (x0, y0, a, l, wd, d) => { if (d > 4 || l < 4) return; const x1 = x0 + Math.cos(a) * l, y1 = y0 + Math.sin(a) * l; g.lineWidth = wd; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); br(x1, y1, a - .45, l * .72, wd * .65, d + 1); br(x1, y1, a + .4, l * .7, wd * .65, d + 1); }; br(x, y, -Math.PI / 2, 40 * s, 6 * s, 0); };
  const fir = (g, x, y, s, col) => { g.fillStyle = col; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(x - (26 - k * 5) * s, y - k * 16 * s); g.lineTo(x, y - (34 + k * 16) * s); g.lineTo(x + (26 - k * 5) * s, y - k * 16 * s); g.fill(); } g.fillStyle = S.rgba('#ffffff', .55); for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(x - (20 - k * 5) * s, y - k * 16 * s - 2); g.lineTo(x, y - (30 + k * 16) * s); g.lineTo(x - 4 * s, y - k * 16 * s - 6); g.fill(); } };
  const gothicArch = (g, x, y, w, h, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w * .6); g.quadraticCurveTo(x, y, x + w / 2, y - w * .3); g.quadraticCurveTo(x + w, y, x + w, y + w * .6); g.lineTo(x + w, y + h); g.fill(); };
  const water = (g, w, y0, y1, c0, c1, seed) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(0, y0, w, y1 - y0);
    for (let k = 0; k < 140; k++) { const r = S.rng(seed + k), y = y0 + r() * (y1 - y0), l = 20 + r() * 60 * (y - y0) / (y1 - y0 + 1); g.fillStyle = S.rgba('#ffffff', .05 + r() * .08); g.fillRect(r() * w, y, l, 2); } };
  S.NPX = { mist, tree, bare, fir, gothicArch, water };

  // ===== the River Neman at dawn, June 1812: two pontoon bridges, forest on the far bank
  VP.set('np_neman', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a7aa8'], [.32, '#e8a888'], [.5, '#f8d8a8'], [1, '#c8a878']]);
    S.glow(g, 900, 330, 320, '#ffe0a0', .4);
    ridge(g, w, h, 350, 18, 120, 3001, '#5a6a5a'); for (let k = 0; k < 40; k++) tree(g, k * 33 + (k % 3) * 6, 372, .7, '#3a5040', 3002 + k);
    g.fillStyle = '#6a7a50'; g.fillRect(0, 372, w, 16);
    water(g, w, 386, 540, '#d8b898', '#5a7088', 3010);
    g.fillStyle = S.rgba('#ffe8b8', .35); g.fillRect(820, 392, 160, 4); g.fillRect(780, 410, 240, 3);
    // near bank, grass and mud
    g.fillStyle = '#7a7a48'; g.beginPath(); g.moveTo(0, 540); for (let x = 0; x <= w; x += 20) g.lineTo(x, 532 + 8 * Math.sin(x * .02)); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 540, w, h: 180, n: 300, cols: ['#5a6a38', '#9a9a5a', '#6a5a3a'], r0: 4, r1: 18, a0: .2, a1: .5, seed: 3011 });
    // two pontoon bridges in perspective
    for (const [xn, xf] of [[300, 470], [900, 760]]) { for (let i = 0; i < 9; i++) { const q = i / 8, x = S.lerp(xf, xn, q), y = S.lerp(392, 540, q), s = .4 + q * .7; g.fillStyle = '#4a3a2a'; g.beginPath(); g.ellipse(x, y + 6 * s, 34 * s, 7 * s, 0, 0, TAU); g.fill(); }
      g.fillStyle = '#9a7a52'; g.beginPath(); g.moveTo(xf - 16, 390); g.lineTo(xf + 16, 390); g.lineTo(xn + 48, 542); g.lineTo(xn - 48, 542); g.fill();
      g.strokeStyle = S.rgba('#5a4028', .6); g.lineWidth = 1.5; for (let i = 0; i < 26; i++) { const q = i / 25, y = S.lerp(390, 542, q * q), hw = S.lerp(16, 48, q * q), x = S.lerp(xf, xn, q * q); g.beginPath(); g.moveTo(x - hw, y); g.lineTo(x + hw, y); g.stroke(); } }
    grain(g, w, h, 3019, .05);
  });

  // ===== the dormitory at Brienne, 1779: stone walls, beams, a row of narrow beds, tall window
  VP.set('np_dorm', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a8478'], [1, '#6a6458']]);
    S.dabs(g, { x: 0, y: 0, w, h: 480, n: 500, cols: ['#a8a090', '#5a5448', '#c8c0b0'], r0: 8, r1: 30, a0: .08, a1: .22, seed: 3101 });
    for (let x = 0; x < w; x += 80) { g.strokeStyle = S.rgba('#3a342a', .25); g.lineWidth = 2; for (let y = 40; y < 480; y += 40) { g.beginPath(); g.moveTo(x + (y / 40 % 2) * 40, y); g.lineTo(x + (y / 40 % 2) * 40 + 80, y); g.stroke(); } }
    wood(g, 0, 0, w, 40, '#4a3424', 3102); for (let x = 60; x < w; x += 220) wood(g, x, 0, 26, 60, '#3a2818', 3103 + x);
    // window
    g.fillStyle = '#5a4a3a'; g.fillRect(1010, 80, 170, 280); const gw = g.createLinearGradient(0, 90, 0, 350); gw.addColorStop(0, '#c8dcec'); gw.addColorStop(1, '#f0ecd8'); g.fillStyle = gw; g.fillRect(1022, 92, 146, 256);
    g.strokeStyle = '#4a3a2a'; g.lineWidth = 6; g.beginPath(); g.moveTo(1095, 92); g.lineTo(1095, 348); g.moveTo(1022, 220); g.lineTo(1168, 220); g.stroke();
    S.glow(g, 1000, 420, 380, '#fff4d8', .25);
    g.fillStyle = S.rgba('#fff4d8', .12); g.beginPath(); g.moveTo(1022, 348); g.lineTo(1168, 348); g.lineTo(980, 700); g.lineTo(700, 700); g.fill();
    wood(g, 0, 480, w, 240, '#7a5a3a', 3104); g.strokeStyle = S.rgba('#3a2818', .35); g.lineWidth = 2; for (let y = 500; y < h; y += 34) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    // beds along the back wall
    for (const x of [60, 300, 540, 780]) { wood(g, x, 400, 200, 70, '#5a3a24', 3110 + x); g.fillStyle = '#e8e4d8'; g.fillRect(x + 6, 392, 188, 22); g.fillStyle = '#8a7a6a'; g.fillRect(x + 6, 414, 188, 34); g.fillStyle = '#f4f0e4'; g.beginPath(); g.ellipse(x + 30, 392, 22, 10, 0, 0, TAU); g.fill(); wood(g, x, 360, 10, 120, '#4a2e1c', 3120 + x); wood(g, x + 190, 380, 10, 100, '#4a2e1c', 3130 + x); }
    grain(g, w, h, 3139, .05);
  });

  // ===== Paris 1789: tall stone townhouses, slate mansards, tricolour cockade banners, cobbles, an empty plinth
  VP.set('np_paris', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8aa8c8'], [.5, '#d8d4c8'], [1, '#b8b0a0']]);
    for (let k = 0; k < 6; k++) { const r = S.rng(3201 + k); g.fillStyle = S.rgba('#ffffff', .4); g.beginPath(); g.ellipse(r() * w, 40 + r() * 80, 120, 24, 0, 0, TAU); g.fill(); }
    const cols = ['#e0d4b8', '#d0c4a8', '#e8dcc4', '#c8bca0', '#dccfb2'];
    for (let i = 0; i < 6; i++) { const x = i * 216 - 10, top = 120 + (i % 2) * 24, col = cols[i % 5];
      g.fillStyle = '#5a6070'; g.beginPath(); g.moveTo(x, top); g.lineTo(x + 20, top - 50); g.lineTo(x + 196, top - 50); g.lineTo(x + 216, top); g.fill();
      for (let d = 0; d < 3; d++) { g.fillStyle = '#6a7080'; g.fillRect(x + 40 + d * 60, top - 44, 26, 36); g.fillStyle = '#2a3040'; g.fillRect(x + 45 + d * 60, top - 36, 16, 24); }
      g.fillStyle = col; g.fillRect(x, top, 216, 440 - top);
      S.dabs(g, { x, y: top, w: 216, h: 440 - top, n: 60, cols: ['#ffffff', '#8a7a5a'], r0: 6, r1: 20, a0: .05, a1: .14, seed: 3210 + i });
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const wx = x + 30 + k * 62, wy = top + 26 + r * 84; g.fillStyle = '#3a4050'; g.fillRect(wx, wy, 34, 58); g.fillStyle = S.rgba('#a8c0d8', .5); g.fillRect(wx + 3, wy + 3, 13, 24); g.fillStyle = '#2a2a30'; g.fillRect(wx - 4, wy + 56, 42, 4); g.strokeStyle = '#2a2a30'; g.lineWidth = 2; for (let b = 0; b < 5; b++) { g.beginPath(); g.moveTo(wx - 2 + b * 9, wy + 46); g.lineTo(wx - 2 + b * 9, wy + 58); g.stroke(); } }
      g.fillStyle = '#3a2a1e'; g.fillRect(x + 90, 370, 40, 70); g.fillStyle = S.mix(col, '#000000', .15); g.fillRect(x, 430, 216, 10);
      if (i % 2 === 0) { const fx = x + 170, fy = top + 30; g.strokeStyle = '#3a2a1e'; g.lineWidth = 3; g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx + 40, fy - 20); g.stroke(); [['#2a4a9a', 0], ['#f4f0e8', 1], ['#c82a2a', 2]].forEach(([c2, j]) => { g.fillStyle = c2; g.fillRect(fx + 6 + j * 12, fy - 12 + j * -6, 12, 70); }); } }
    g.fillStyle = '#9a9488'; g.fillRect(0, 440, w, 280);
    for (let y = 446; y < h; y += 16) for (let x = (y / 16 % 2) * 14; x < w; x += 28) { g.fillStyle = S.rgba(S.rng(x * 3 + y)() > .5 ? '#7a7468' : '#b0aa9c', .6); g.beginPath(); g.ellipse(x, y, 12, 6, 0, 0, TAU); g.fill(); }
    // the empty royal plinth
    g.fillStyle = '#c8bca0'; g.fillRect(560, 400, 160, 160); g.fillStyle = '#a89c80'; g.fillRect(548, 390, 184, 16); g.fillRect(548, 556, 184, 16);
    grain(g, w, h, 3229, .05);
  });

  // ===== a harbour bay at night: a hill on the left to stand on, a fort and town lights across the water, moon
  VP.set('np_bay', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0e1430'], [.5, '#2a3058'], [1, '#3a3a5a']]);
    for (let k = 0; k < 90; k++) { const r = S.rng(3301 + k); g.fillStyle = S.rgba('#ffffff', .3 + r() * .6); g.fillRect(r() * w, r() * 300, 2, 2); }
    g.fillStyle = '#f0ecd8'; g.beginPath(); g.arc(1080, 110, 30, 0, TAU); g.fill(); S.glow(g, 1080, 110, 140, '#d8d8f0', .3);
    ridge(g, w, h, 360, 30, 160, 3302, '#1a2038');
    g.fillStyle = '#20243a'; g.fillRect(760, 330, 300, 46); for (let k = 0; k < 10; k++) g.fillRect(760 + k * 30, 318, 16, 14);
    for (let k = 0; k < 30; k++) { const r = S.rng(3310 + k); g.fillStyle = S.rgba('#ffc870', .6 + r() * .4); g.fillRect(620 + r() * 600, 340 + r() * 30, 3, 3); }
    water(g, w, 376, h, '#2a3458', '#0e1428', 3320);
    for (let k = 0; k < 30; k++) { const r = S.rng(3330 + k); g.fillStyle = S.rgba('#f0ecd8', .2 + r() * .2); g.fillRect(1020 + r() * 120, 390 + k * 9, 30 + r() * 40, 2); }
    // the hill in the foreground left
    g.fillStyle = '#1e2418'; g.beginPath(); g.moveTo(0, 470); g.quadraticCurveTo(240, 440, 470, 560); g.quadraticCurveTo(560, 640, 620, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 470, w: 560, h: 250, n: 200, cols: ['#2a3420', '#141a10', '#3a4428'], r0: 4, r1: 16, a0: .3, a1: .6, seed: 3340 });
    grain(g, w, h, 3349, .04);
  });

  // ===== Notre-Dame, 1804: gothic arcade, glowing rose window, candles, red carpet up to the altar
  VP.set('np_notredame', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2420'], [1, '#4a3e34']]);
    S.dabs(g, { x: 0, y: 0, w, h: 480, n: 400, cols: ['#6a5e50', '#3a3028', '#8a7a68'], r0: 8, r1: 30, a0: .1, a1: .25, seed: 3401 });
    // rose window
    g.save(); g.translate(640, 150); const rg = g.createRadialGradient(0, 0, 10, 0, 0, 110); rg.addColorStop(0, '#f8e0a0'); rg.addColorStop(.5, '#8a4ac8'); rg.addColorStop(1, '#2a3a9a'); g.fillStyle = rg; g.beginPath(); g.arc(0, 0, 110, 0, TAU); g.fill();
    g.strokeStyle = '#2a2018'; g.lineWidth = 5; for (let k = 0; k < 12; k++) { g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(k / 12 * TAU) * 110, Math.sin(k / 12 * TAU) * 110); g.stroke(); } g.beginPath(); g.arc(0, 0, 40, 0, TAU); g.arc(0, 0, 76, 0, TAU); g.stroke(); g.restore();
    S.glow(g, 640, 150, 300, '#c8a0f0', .3);
    // arcades with pointed arches and lancet windows
    for (const x of [30, 250, 870, 1090]) { gothicArch(g, x, 140, 160, 340, '#1a1612'); gothicArch(g, x + 50, 170, 60, 120, '#5a7ab8'); g.fillStyle = S.rgba('#e8c870', .3); g.fillRect(x + 76, 200, 8, 90); }
    for (const x of [20, 230, 420, 840, 1030, 1240]) { g.fillStyle = '#8a7a66'; g.fillRect(x - 14, 60, 28, 420); g.fillStyle = S.rgba('#ffffff', .12); g.fillRect(x - 10, 60, 6, 420); g.fillStyle = '#6a5a48'; g.fillRect(x - 20, 470, 40, 14); }
    // floor, carpet, altar steps
    g.fillStyle = '#5a4a3a'; g.fillRect(0, 480, w, 240);
    for (let y = 484; y < h; y += 30) for (let x = (y / 30 % 2) * 30; x < w; x += 60) { g.fillStyle = S.rgba('#3a3028', .35); g.fillRect(x, y, 58, 28); }
    g.fillStyle = '#9a1e24'; g.beginPath(); g.moveTo(560, 480); g.lineTo(720, 480); g.lineTo(820, h); g.lineTo(460, h); g.fill(); g.strokeStyle = '#d8a840'; g.lineWidth = 4; g.stroke();
    g.fillStyle = '#c8b898'; g.fillRect(500, 440, 280, 40); g.fillStyle = '#a89878'; g.fillRect(480, 468, 320, 16);
    S.glow(g, 640, 430, 420, '#ffd890', .25);
    grain(g, w, h, 3419, .05);
  });

  // ===== Austerlitz at dawn, 2 Dec 1805: frosted fields, the Pratzen heights on the right, a small hill on the left, fog
  VP.set('np_frost', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a9ab8'], [.4, '#e8c8b8'], [.55, '#f8e8d0'], [1, '#c8ccd0']]);
    S.glow(g, 300, 300, 260, '#fff0c0', .5);
    ridge(g, w, h, 330, 16, 140, 3501, '#8a90a0');
    g.fillStyle = '#b8bcc4'; g.beginPath(); g.moveTo(560, 420); g.quadraticCurveTo(900, 250, 1280, 270); g.lineTo(1280, h); g.lineTo(560, h); g.fill();
    S.dabs(g, { x: 600, y: 280, w: 680, h: 200, n: 140, cols: ['#e8ecf0', '#8a9098', '#a8aeb8'], r0: 6, r1: 20, a0: .2, a1: .4, seed: 3502 });
    g.fillStyle = '#c8ccd2'; g.fillRect(0, 430, w, 290);
    g.fillStyle = '#a8aeb8'; g.beginPath(); g.moveTo(0, 520); g.quadraticCurveTo(200, 430, 420, 520); g.lineTo(420, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 430, w, h: 290, n: 500, cols: ['#f4f6f8', '#8a909a', '#b8bcc4', '#7a7a6a'], r0: 3, r1: 14, a0: .25, a1: .55, seed: 3503 });
    for (const [x, y, s] of [[480, 450, .8], [520, 446, .6], [1150, 300, .6], [100, 470, .9]]) bare(g, x, y, s, '#4a4a50');
    mist(g, w, 440, 60, '#ffffff', .25, 3510);
    grain(g, w, h, 3519, .04);
  });

  // ===== parchment on a dark table, for battle maps
  VP.set('np_parch', 1280, 720, (g, w, h) => {
    wood(g, 0, 0, w, h, '#3a2618', 3601);
    g.fillStyle = S.rgba('#000000', .4); g.fillRect(84, 64, 1124, 612);
    g.fillStyle = '#e8d8b0'; g.beginPath(); g.moveTo(70, 50); g.lineTo(1200, 56); g.lineTo(1212, 660); g.lineTo(76, 668); g.closePath(); g.fill();
    S.dabs(g, { x: 70, y: 50, w: 1140, h: 620, n: 300, cols: ['#c8a870', '#f8ecd0', '#a8885a'], r0: 10, r1: 50, a0: .05, a1: .15, seed: 3602 });
    g.strokeStyle = S.rgba('#8a6a3a', .5); g.lineWidth = 3; g.strokeRect(96, 76, 1092, 568);
    grain(g, w, h, 3609, .04);
  });

  // ===== Moscow from the Sparrow Hills, Sept 1812: domes and towers below an evening sky
  VP.set('np_moscow', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2a48'], [.45, '#8a5a6a'], [.6, '#e8a070'], [1, '#5a4040']]);
    ridge(g, w, h, 400, 14, 160, 3701, '#4a3a40');
    const dome = (x, y, r, col) => { g.fillStyle = '#3a2a30'; g.fillRect(x - r * .8, y, r * 1.6, 70); g.fillStyle = col; g.beginPath(); g.moveTo(x - r, y); g.quadraticCurveTo(x - r * 1.1, y - r * 1.2, x, y - r * 1.8); g.quadraticCurveTo(x + r * 1.1, y - r * 1.2, x + r, y); g.fill(); g.strokeStyle = '#d8b040'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - r * 1.8); g.lineTo(x, y - r * 2.4); g.moveTo(x - 6, y - r * 2.2); g.lineTo(x + 6, y - r * 2.2); g.stroke(); };
    for (let k = 0; k < 26; k++) { const r = S.rng(3710 + k); g.fillStyle = S.mix('#3a2a30', '#6a4a50', r()); g.fillRect(k * 50 - 10, 380 + r() * 20, 46, 80); }
    [[300, 370, 18, '#2a6a4a'], [420, 360, 22, '#d8b040'], [470, 372, 14, '#3a5aa0'], [640, 340, 32, '#d8b040'], [700, 362, 18, '#c8402a'], [820, 366, 20, '#2a6a4a'], [960, 376, 16, '#d8b040']].forEach(a => dome(...a));
    g.fillStyle = '#3a2a30'; g.fillRect(552, 250, 26, 140); g.beginPath(); g.moveTo(548, 250); g.lineTo(565, 196); g.lineTo(582, 250); g.fill();
    g.fillStyle = '#8a3a2a'; g.fillRect(150, 420, 1000, 20); for (let k = 0; k < 34; k++) g.fillRect(150 + k * 30, 410, 16, 12);
    g.fillStyle = '#3a3a28'; g.beginPath(); g.moveTo(0, 520); g.quadraticCurveTo(400, 470, 760, 540); g.quadraticCurveTo(1000, 580, 1280, 560); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 500, w, h: 220, n: 260, cols: ['#4a4a30', '#2a2a1a', '#6a5a3a'], r0: 4, r1: 16, a0: .3, a1: .6, seed: 3720 });
    grain(g, w, h, 3729, .05);
  });

  // ===== the Berezina, Nov 1812: icy river, a broken trestle bridge, snowy banks, black firs
  VP.set('np_berezina', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a808a'], [.6, '#c8ccd0'], [1, '#a8aeb4']]);
    for (let k = 0; k < 30; k++) fir(g, k * 46 + (k % 2) * 12, 330, .8 + (k % 3) * .15, '#2a3430');
    g.fillStyle = '#e8ecf0'; g.fillRect(0, 330, w, 30);
    water(g, w, 360, 520, '#6a7a88', '#3a4a58', 3801);
    for (let k = 0; k < 40; k++) { const r = S.rng(3810 + k); g.fillStyle = S.rgba('#f0f4f8', .7); g.beginPath(); g.ellipse(r() * w, 370 + r() * 140, 20 + r() * 40, 5 + r() * 6, 0, 0, TAU); g.fill(); }
    // trestle bridge from left bank to the far bank, broken in the middle
    g.strokeStyle = '#4a3a2a'; g.lineWidth = 5; for (let k = 0; k < 12; k++) { if (k === 6 || k === 7) continue; const x = 140 + k * 90; g.beginPath(); g.moveTo(x - 14, 470 - k * 8); g.lineTo(x, 400 - k * 6); g.lineTo(x + 14, 470 - k * 8); g.stroke(); }
    g.fillStyle = '#6a5038'; g.fillRect(100, 392, 560, 12); g.fillRect(860, 352, 380, 12); g.save(); g.translate(660, 398); g.rotate(.35); g.fillRect(0, 0, 120, 10); g.restore();
    g.fillStyle = '#e8ecf0'; g.beginPath(); g.moveTo(0, 520); for (let x = 0; x <= w; x += 20) g.lineTo(x, 514 + 6 * Math.sin(x * .03)); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 520, w, h: 200, n: 260, cols: ['#ffffff', '#a8b0b8', '#c8ccd2'], r0: 4, r1: 18, a0: .3, a1: .6, seed: 3820 });
    grain(g, w, h, 3829, .04);
  });

  // ===== Waterloo, 18 June 1815: grey sky, a ridge of trampled wheat, a farm, the wood where the Prussians come from
  VP.set('np_waterloo', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a606a'], [.5, '#9a9a94'], [1, '#7a7468']]);
    for (let k = 0; k < 8; k++) { const r = S.rng(3901 + k); g.fillStyle = S.rgba('#3a3e48', .35); g.beginPath(); g.ellipse(r() * w, 60 + r() * 120, 200, 40, 0, 0, TAU); g.fill(); }
    ridge(g, w, h, 360, 14, 160, 3902, '#5a6a48');
    for (let k = 0; k < 16; k++) tree(g, 1000 + k * 18, 360, .7, '#2a3a28', 3903 + k);
    g.fillStyle = '#e8e0cc'; g.fillRect(260, 330, 120, 40); g.fillStyle = '#8a3a2a'; g.beginPath(); g.moveTo(250, 332); g.lineTo(320, 300); g.lineTo(390, 332); g.fill();
    g.fillStyle = '#9a8a4a'; g.beginPath(); g.moveTo(0, 400); g.quadraticCurveTo(640, 360, 1280, 420); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.strokes(g, { x: 0, y: 390, w, h: 200, n: 900, cols: ['#c8b060', '#7a6a30', '#d8c880'], l0: 8, l1: 22, ang: -Math.PI / 2, jit: .4, w0: 1, w1: 2, a0: .3, a1: .7, seed: 3910 });
    g.fillStyle = '#5a4a32'; g.beginPath(); g.moveTo(0, 580); g.quadraticCurveTo(640, 540, 1280, 600); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 560, w, h: 160, n: 320, cols: ['#3a2e1e', '#6a5a3a', '#4a4a3a'], r0: 4, r1: 20, a0: .3, a1: .6, seed: 3911 });
    for (let k = 0; k < 18; k++) { const r = S.rng(3920 + k); g.fillStyle = S.rgba('#8a8478', .3); g.beginPath(); g.ellipse(r() * w, 340 + r() * 40, 80, 20, 0, 0, TAU); g.fill(); }
    grain(g, w, h, 3929, .05);
  });

  // ===== Saint Helena: a black volcanic island with cliffs, grey South Atlantic, heavy clouds
  VP.set('np_helena', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a5058'], [.5, '#8a9098'], [1, '#6a7078']]);
    for (let k = 0; k < 10; k++) { const r = S.rng(4001 + k); g.fillStyle = S.rgba('#3a3e46', .4); g.beginPath(); g.ellipse(r() * w, 50 + r() * 150, 220, 46, 0, 0, TAU); g.fill(); }
    g.fillStyle = '#2a2a2e'; g.beginPath(); g.moveTo(600, 420); g.lineTo(680, 300); g.lineTo(760, 250); g.lineTo(860, 180); g.lineTo(960, 210); g.lineTo(1080, 170); g.lineTo(1180, 240); g.lineTo(1280, 260); g.lineTo(1280, 430); g.fill();
    S.dabs(g, { x: 600, y: 170, w: 680, h: 260, n: 200, cols: ['#4a4a50', '#1a1a1e', '#3a4a3a'], r0: 6, r1: 22, a0: .3, a1: .6, seed: 4002 });
    g.strokeStyle = S.rgba('#5a5a60', .6); g.lineWidth = 2; for (let k = 0; k < 14; k++) { const x = 640 + k * 46; g.beginPath(); g.moveTo(x, 420); g.lineTo(x + 20, 260 + (k % 3) * 20); g.stroke(); }
    water(g, w, 420, h, '#5a6a78', '#2a3440', 4010);
    for (let k = 0; k < 40; k++) { const r = S.rng(4020 + k); g.fillStyle = S.rgba('#e8ecf0', .3); g.fillRect(620 + r() * 660, 424 + r() * 10, 10 + r() * 30, 2); }
    grain(g, w, h, 4029, .05);
  });

  // ===== Longwood House: a long, low damp house with green shutters, a vegetable garden, fog
  VP.set('np_longwood', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9aa0a4'], [1, '#c8ccc8']]);
    ridge(g, w, h, 300, 30, 200, 4101, '#7a8a7a');
    g.fillStyle = '#d8c8a0'; g.fillRect(160, 250, 960, 170); S.dabs(g, { x: 160, y: 250, w: 960, h: 170, n: 120, cols: ['#8a7a5a', '#f0e4c4', '#6a7a6a'], r0: 6, r1: 24, a0: .08, a1: .2, seed: 4102 });
    g.fillStyle = '#6a5a5a'; g.beginPath(); g.moveTo(140, 254); g.lineTo(220, 200); g.lineTo(1060, 200); g.lineTo(1140, 254); g.fill();
    for (let k = 0; k < 9; k++) { const x = 200 + k * 100; g.fillStyle = '#2a3a2a'; g.fillRect(x, 290, 50, 80); g.fillStyle = '#3a6a4a'; g.fillRect(x - 18, 290, 16, 80); g.fillRect(x + 52, 290, 16, 80); g.fillStyle = S.rgba('#c8d8c8', .3); g.fillRect(x + 4, 294, 18, 30); }
    g.fillStyle = '#4a3a2a'; g.fillRect(610, 330, 60, 90);
    g.fillStyle = '#6a7a48'; g.fillRect(0, 420, w, 300);
    for (let r = 0; r < 4; r++) { g.fillStyle = '#5a4630'; g.fillRect(80, 470 + r * 60, 1120, 24); for (let k = 0; k < 40; k++) { g.fillStyle = S.rgba('#5a8a3a', .8); g.beginPath(); g.arc(100 + k * 28, 470 + r * 60, 8, Math.PI, 0); g.fill(); } }
    mist(g, w, 300, 120, '#e8ecec', .35, 4110); mist(g, w, 560, 100, '#e8ecec', .2, 4120);
    grain(g, w, h, 4129, .05);
  });

  // ===== the last bedroom at Longwood: faded green walls, a narrow camp bed, a window on the grey sea, a hat hook
  VP.set('np_bedroom', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a5a4a'], [1, '#3a4a3a']]);
    for (let x = 0; x < w; x += 40) { g.fillStyle = S.rgba(x / 40 % 2 ? '#5a6a50' : '#3a4a38', .3); g.fillRect(x, 0, 20, 470); }
    S.dabs(g, { x: 0, y: 0, w, h: 470, n: 200, cols: ['#2a3428', '#6a7a60'], r0: 10, r1: 40, a0: .06, a1: .16, seed: 4201 });
    wood(g, 0, 440, w, 30, '#4a3424', 4202);
    // window on the sea
    g.fillStyle = '#3a2a1e'; g.fillRect(820, 90, 260, 300); g.fillStyle = '#9aa4ac'; g.fillRect(836, 106, 228, 268);
    g.fillStyle = '#5a6a78'; g.fillRect(836, 270, 228, 104); g.fillStyle = S.rgba('#ffffff', .25); g.fillRect(836, 266, 228, 4);
    g.strokeStyle = '#3a2a1e'; g.lineWidth = 6; g.beginPath(); g.moveTo(950, 106); g.lineTo(950, 374); g.moveTo(836, 240); g.lineTo(1064, 240); g.stroke();
    g.fillStyle = S.rgba('#d8dcd8', .5); g.beginPath(); g.moveTo(800, 80); g.quadraticCurveTo(840, 240, 810, 410); g.lineTo(780, 410); g.lineTo(780, 80); g.fill();
    S.glow(g, 950, 240, 300, '#c8d0d8', .2);
    // hat hook by the door on the left
    g.fillStyle = '#3a2a1e'; g.fillRect(150, 100, 90, 340); g.fillStyle = '#2a1e14'; g.fillRect(160, 110, 70, 320); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(220, 270, 4, 0, TAU); g.fill();
    g.fillStyle = '#6a5a4a'; g.fillRect(300, 190, 50, 8); g.fillRect(320, 180, 8, 12);
    wood(g, 0, 470, w, 250, '#5a4028', 4203); g.strokeStyle = S.rgba('#2a1a10', .35); g.lineWidth = 2; for (let x = 0; x < w; x += 70) { g.beginPath(); g.moveTo(x, 470); g.lineTo(x - 60, h); g.stroke(); }
    // narrow camp bed
    g.fillStyle = '#2a2a2a'; g.fillRect(380, 430, 6, 90); g.fillRect(720, 440, 6, 80); g.fillStyle = '#e8e4d8'; g.fillRect(380, 440, 346, 30); g.fillStyle = '#7a8a9a'; g.fillRect(420, 456, 306, 40); g.fillStyle = '#f4f0e4'; g.beginPath(); g.ellipse(410, 446, 28, 12, 0, 0, TAU); g.fill();
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 4; g.beginPath(); g.moveTo(380, 380); g.lineTo(380, 520); g.moveTo(726, 400); g.lineTo(726, 520); g.stroke();
    grain(g, w, h, 4209, .05);
  });
})(window);
