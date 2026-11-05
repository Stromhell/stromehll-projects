// Spain 3 act 5 detail upgrade (30 Oct): richer prison, classroom, Hendaye station, Russian front, village, airbase and Costa sets. Loaded after es3_sets_act5.js.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood } = X;
  const line = (g, a, b, c2, d) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); };
  const tiles = (g, x0, y0, x1, y1, col, seed) => S.strokes(g, { x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0), n: 90, cols: [S.mix(col, '#000000', .3), S.mix(col, '#ffffff', .15)], l0: 6, l1: 12, ang: 0, jit: .1, w0: 1.5, w1: 2.5, a0: .3, a1: .6, seed });
  const house = (g, x, y, bw, col, roof, seed, o = {}) => { g.fillStyle = col; g.fillRect(x, y, bw, 520 - y); S.dabs(g, { x, y, w: bw, h: 520 - y, n: 90, cols: [S.mix(col, '#ffffff', .2), S.mix(col, '#000000', .15), S.mix(col, '#a08060', .2)], r0: 4, r1: 14, a0: .12, a1: .3, seed });
    g.fillStyle = S.rgba('#000000', .1); g.fillRect(x + bw * .75, y, bw * .25, 520 - y); g.fillStyle = roof; g.beginPath(); g.moveTo(x - 12, y + 4); g.lineTo(x + bw / 2, y - 40); g.lineTo(x + bw + 12, y + 4); g.fill(); tiles(g, x - 8, y - 36, x + bw + 8, y + 2, roof, seed + 1); g.fillStyle = S.rgba('#000000', .25); g.fillRect(x, y + 4, bw, 7);
    for (let i = 0; i < Math.floor(bw / 90); i++) { const wx = x + 30 + i * 90, wy = y + 60; g.fillStyle = S.mix(col, '#ffffff', .3); g.fillRect(wx - 4, wy - 4, 38, 54); g.fillStyle = '#2a2420'; g.fillRect(wx, wy, 30, 46); g.fillStyle = S.rgba('#a8b8c8', .25); g.fillRect(wx + 2, wy + 2, 10, 20); const sc = o.shut || '#3a5a3a'; g.fillStyle = sc; g.fillRect(wx - 10, wy, 9, 46); g.fillRect(wx + 31, wy, 9, 46); g.fillStyle = S.mix(sc, '#000000', .3); for (let k = 0; k < 5; k++) { g.fillRect(wx - 9, wy + 3 + k * 9, 7, 2); g.fillRect(wx + 32, wy + 3 + k * 9, 7, 2); } g.strokeStyle = '#1a1a1a'; g.lineWidth = 1.5; line(g, wx - 4, wy + 50, wx + 34, wy + 50); for (let k = 0; k < 5; k++) line(g, wx - 2 + k * 9, wy + 38, wx - 2 + k * 9, wy + 50); line(g, wx - 4, wy + 38, wx + 34, wy + 38); if ((i + seed) % 2) S.dabs(g, { x: wx - 2, y: wy + 30, w: 34, h: 10, n: 12, cols: ['#c83a4a', '#e8c040', '#3a7a3a'], r0: 2, r1: 4, a0: .8, a1: 1, seed: wx + seed }); } };
  // ======================== A GREY PRISON YARD ========================
  VP.set('prison', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a8e96'], [.4, '#c8c8c8']]);
    S.dabs(g, { x: 0, y: 10, w, h: 120, n: 40, cols: ['#a8acb4', '#7a7e86'], r0: 30, r1: 80, sq: .3, a0: .2, a1: .4, seed: 800 });
    g.fillStyle = '#8a8478'; g.fillRect(0, 160, w, 360); S.dabs(g, { x: 0, y: 160, w, h: 360, n: 600, cols: ['#9a948a', '#6a645a', '#7a7468'], r0: 6, r1: 24, a0: .15, a1: .32, seed: 801 });
    for (let y = 170; y < 520; y += 32) for (let x = -64; x < w; x += 64) { const bx = x + (y / 32 % 2) * 32, r = S.rng(bx * 7 + y)(); g.fillStyle = S.rgba(r > .5 ? '#ffffff' : '#000000', .04 + r * .04); g.fillRect(bx + 2, y + 2, 60, 28); g.strokeStyle = S.rgba('#4a4438', .4); g.lineWidth = 1; g.strokeRect(bx, y, 64, 32); }
    for (let i = 0; i < 9; i++) { const x = 40 + i * 150, sh = g.createLinearGradient(0, 160, 0, 520); sh.addColorStop(0, 'rgba(60,50,40,.25)'); sh.addColorStop(1, 'rgba(60,50,40,0)'); g.fillStyle = sh; g.fillRect(x, 160, 8 + (i % 3) * 4, 200 + (i % 4) * 40); }
    g.fillStyle = '#6a645a'; g.fillRect(0, 150, w, 14); g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; for (let x = 0; x < w; x += 6) { g.beginPath(); g.arc(x, 132, 12, 0, Math.PI * 1.7); g.stroke(); } for (let x = 0; x < w; x += 90) { g.fillStyle = '#3a3a3a'; g.fillRect(x, 116, 4, 40); }
    // guard tower with planks, searchlight, ladder
    g.fillStyle = '#5a5448'; g.fillRect(1060, 180, 80, 340); S.strokes(g, { x: 1060, y: 180, w: 80, h: 340, n: 80, cols: ['#6a6458', '#3a342a'], l0: 8, l1: 16, ang: 0, jit: .05, w0: 2, w1: 3, a0: .3, a1: .5, seed: 802 });
    g.fillStyle = '#5a5448'; g.fillRect(1040, 60, 120, 120); wood(g, 1040, 120, 120, 60, '#4a4236', 804); g.fillStyle = '#1a1a1a'; g.fillRect(1052, 74, 96, 40); g.strokeStyle = '#4a4236'; g.lineWidth = 4; for (const x of [1084, 1116]) line(g, x, 74, x, 114);
    g.fillStyle = '#3a3428'; g.beginPath(); g.moveTo(1026, 64); g.lineTo(1100, 20); g.lineTo(1174, 64); g.fill(); tiles(g, 1030, 26, 1170, 62, '#3a3428', 805);
    g.fillStyle = '#2a2a2a'; g.beginPath(); g.arc(1150, 96, 12, 0, TAU); g.fill(); g.fillStyle = '#e8e4d0'; g.beginPath(); g.arc(1154, 96, 8, 0, TAU); g.fill();
    g.strokeStyle = '#3a342a'; g.lineWidth = 3; line(g, 1030, 180, 1030, 520); line(g, 1050, 180, 1050, 520); for (let y = 196; y < 520; y += 20) line(g, 1030, y, 1050, y);
    // barred windows with sills and rust streaks
    for (let i = 0; i < 6; i++) { const x = 80 + i * 160; g.fillStyle = '#a8a294'; g.fillRect(x - 6, 320, 62, 8); g.fillStyle = '#2a2824'; g.fillRect(x, 250, 50, 70); g.strokeStyle = '#6a6a6a'; g.lineWidth = 3; for (let k = 1; k < 5; k++) line(g, x + k * 10, 250, x + k * 10, 320); line(g, x, 285, x + 50, 285); g.fillStyle = S.rgba('#7a4a2a', .25); g.fillRect(x + 18, 328, 6, 50 + (i % 3) * 20); }
    // iron door
    g.fillStyle = '#4a4a4a'; g.fillRect(590, 380, 100, 140); g.strokeStyle = '#2a2a2a'; g.lineWidth = 3; g.strokeRect(590, 380, 100, 140); for (let y = 395; y < 520; y += 25) for (let x = 600; x < 690; x += 22) { g.fillStyle = '#6a6a6a'; g.beginPath(); g.arc(x, y, 2, 0, TAU); g.fill(); }
    g.fillStyle = '#9a9488'; g.fillRect(0, 520, w, h - 520); S.dabs(g, { x: 0, y: 520, w, h: 200, n: 700, cols: ['#aaa498', '#7a746a', '#8a8478'], r0: 3, r1: 12, a0: .2, a1: .45, seed: 803 });
    const ao = g.createLinearGradient(0, 520, 0, 560); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 520, w, 40);
    for (let i = 0; i < 6; i++) { const r = S.rng(i + 806); g.fillStyle = S.rgba('#5a5a62', .3); g.beginPath(); g.ellipse(r() * w, 560 + r() * 140, 40 + r() * 50, 6 + r() * 6, 0, 0, TAU); g.fill(); }
  });
  // ======================== HENDAYE STATION ========================
  VP.set('station', 1280, 720, (g, w, h) => {
    g.fillStyle = '#5a5a5e'; g.fillRect(0, 0, w, h);
    const rg = g.createLinearGradient(0, 0, 0, 260); rg.addColorStop(0, '#c8d0d8'); rg.addColorStop(1, '#7a8088'); g.fillStyle = rg; g.fillRect(0, 0, w, 260);
    g.strokeStyle = S.rgba('#ffffff', .25); g.lineWidth = 1; for (let x = 0; x < w; x += 40) line(g, x, 0, x, 260);
    g.strokeStyle = '#2a2a2e'; g.lineWidth = 7; for (let x = 0; x < w; x += 160) { g.beginPath(); g.moveTo(x, 260); g.quadraticCurveTo(x + 80, 20, x + 160, 260); g.stroke(); g.lineWidth = 2; for (let k = 1; k < 6; k++) { const t = k / 6; line(g, x + 160 * t, 260, x + 80, 60 + 200 * Math.abs(t - .5) * 2 * .5); } g.lineWidth = 7; }
    g.lineWidth = 3; for (let y = 60; y < 260; y += 50) line(g, 0, y, w, y);
    // hanging lamps
    for (let x = 80; x < w; x += 320) { g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; line(g, x, 60, x, 230); g.fillStyle = '#1a1a1a'; g.beginPath(); g.moveTo(x - 16, 240); g.lineTo(x, 226); g.lineTo(x + 16, 240); g.fill(); g.fillStyle = '#f0e0a0'; g.beginPath(); g.arc(x, 244, 6, 0, TAU); g.fill(); }
    // station building: stone, pilasters, arched doors, sign and clock
    g.fillStyle = '#c8b898'; g.fillRect(0, 260, w, 200); S.dabs(g, { x: 0, y: 260, w, h: 200, n: 300, cols: ['#d8c8a8', '#a8987a', '#b8a888'], r0: 5, r1: 18, a0: .15, a1: .32, seed: 821 });
    g.strokeStyle = S.rgba('#7a6a50', .35); g.lineWidth = 1; for (let y = 276; y < 460; y += 16) line(g, 0, y, w, y);
    g.fillStyle = '#d8ccb0'; g.fillRect(0, 260, w, 10); for (let x = 0; x < w; x += 260) { g.fillStyle = '#b8a888'; g.fillRect(x + 220, 270, 22, 190); g.fillStyle = S.rgba('#000000', .12); g.fillRect(x + 236, 270, 6, 190); }
    g.fillStyle = '#1a2a4a'; g.fillRect(500, 290, 280, 50); g.strokeStyle = '#c8a040'; g.lineWidth = 3; g.strokeRect(504, 294, 272, 42); g.fillStyle = '#f0e8d0'; g.font = 'bold 32px Oswald'; g.textAlign = 'center'; g.fillText('HENDAYE', 640, 328);
    g.fillStyle = '#2a2a2a'; g.beginPath(); g.arc(940, 320, 34, 0, TAU); g.fill(); g.fillStyle = '#f4f0e4'; g.beginPath(); g.arc(940, 320, 30, 0, TAU); g.fill(); g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; line(g, 940 + Math.cos(a) * 24, 320 + Math.sin(a) * 24, 940 + Math.cos(a) * 28, 320 + Math.sin(a) * 28); } g.lineWidth = 3; line(g, 940, 320, 940, 300); line(g, 940, 320, 954, 326);
    for (let i = 0; i < 5; i++) { const dx = 60 + i * 260; g.fillStyle = '#d8ccb0'; g.fillRect(dx - 8, 352, 76, 108); g.fillStyle = '#4a3a2a'; g.fillRect(dx, 370, 60, 90); g.beginPath(); g.arc(dx + 30, 370, 30, Math.PI, 0); g.fill(); g.fillStyle = S.rgba('#f0d890', .3); g.fillRect(dx + 6, 380, 20, 30); g.fillRect(dx + 34, 380, 20, 30); g.strokeStyle = '#2a1a10'; g.lineWidth = 2; line(g, dx + 30, 360, dx + 30, 460); }
    // posters and a bench
    for (const [x, c1] of [[300, '#c8402a'], [820, '#2a6a8a']]) { g.fillStyle = c1; g.fillRect(x, 370, 46, 64); g.fillStyle = S.rgba('#ffffff', .7); g.fillRect(x + 6, 380, 34, 6); g.fillRect(x + 6, 420, 24, 4); }
    wood(g, 1060, 430, 120, 10, '#5a3a20', 822); g.fillStyle = '#2a2a2a'; g.fillRect(1066, 440, 6, 20); g.fillRect(1168, 440, 6, 20); wood(g, 1060, 410, 120, 8, '#5a3a20', 824);
    // platform: paving, yellow edge, tracks below
    g.fillStyle = '#9a9488'; g.fillRect(0, 460, w, h - 460); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 600, cols: ['#aaa498', '#7a746a', '#8a8478'], r0: 3, r1: 12, a0: .2, a1: .45, seed: 823 });
    for (let x = 0; x < w; x += 80) { g.strokeStyle = S.rgba('#5a5448', .4); g.lineWidth = 1; line(g, x, 476, x - 40, h); } for (let y = 500; y < h; y += 40) line(g, 0, y, w, y);
    g.fillStyle = '#e8d8a0'; g.fillRect(0, 470, w, 6); const ao = g.createLinearGradient(0, 460, 0, 500); ao.addColorStop(0, 'rgba(0,0,0,.3)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 460, w, 40);
  });
  // ======================== RUSSIAN FRONT IN SNOW ========================
  VP.set('steppe', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a7080'], [.5, '#c8ccd4']]);
    S.dabs(g, { x: 0, y: 30, w, h: 220, n: 70, cols: ['#8a909c', '#b8bcc6', '#5a606c'], r0: 30, r1: 90, sq: .35, a0: .2, a1: .45, seed: 830 });
    // dark forest edge: firs and birches
    for (let i = 0; i < 70; i++) { const r = S.rng(i + 833), x = r() * w, y = 372 + r() * 20, s = .5 + r() * .6; g.fillStyle = '#2a3038'; for (let k = 0; k < 3; k++) { const ty = y - k * 18 * s, tw = (14 - k * 3) * s; g.beginPath(); g.moveTo(x, ty - 28 * s); g.lineTo(x - tw, ty); g.lineTo(x + tw, ty); g.fill(); } g.fillStyle = S.rgba('#f0f4f8', .8); g.beginPath(); g.moveTo(x, y - 64 * s); g.lineTo(x - 5 * s, y - 50 * s); g.lineTo(x + 5 * s, y - 50 * s); g.fill(); }
    for (let i = 0; i < 12; i++) { const r = S.rng(i + 835), x = r() * w, y = 392, ht = 60 + r() * 40; g.strokeStyle = '#e8e8e0'; g.lineWidth = 3; line(g, x, y, x + 2, y - ht); g.strokeStyle = '#2a2a2a'; g.lineWidth = 1.5; for (let k = 0; k < 5; k++) line(g, x - 1, y - k * ht / 5 - 6, x + 2, y - k * ht / 5 - 6); }
    // burned-out log hut
    { const x = 1000, y = 410; g.fillStyle = '#3a2e24'; g.fillRect(x, y - 50, 110, 50); for (let k = 0; k < 6; k++) { g.fillStyle = k % 2 ? '#4a3a2a' : '#2e241a'; g.fillRect(x - 6, y - 50 + k * 8.5, 122, 7); } g.fillStyle = '#1a1410'; g.beginPath(); g.moveTo(x - 10, y - 50); g.lineTo(x + 30, y - 76); g.lineTo(x + 50, y - 60); g.lineTo(x + 80, y - 82); g.lineTo(x + 120, y - 50); g.fill(); g.fillStyle = '#f0f4f8'; g.beginPath(); g.moveTo(x - 10, y - 50); g.lineTo(x + 30, y - 76); g.lineTo(x + 40, y - 70); g.lineTo(x + 6, y - 50); g.fill(); g.fillStyle = '#0e0c0a'; g.fillRect(x + 40, y - 34, 20, 34); }
    g.fillStyle = '#d8dce4'; g.fillRect(0, 380, w, 340); S.dabs(g, { x: 0, y: 380, w, h: 340, n: 700, cols: ['#ffffff', '#b8c0cc', '#e8ecf2'], r0: 6, r1: 34, sq: .25, a0: .25, a1: .5, seed: 831 });
    for (let i = 0; i < 8; i++) { const r = S.rng(i + 837), x = r() * w, y = 440 + r() * 260; g.fillStyle = S.rgba('#9aa4b4', .35); g.beginPath(); g.ellipse(x, y, 80 + r() * 80, 8 + r() * 6, 0, 0, Math.PI); g.fill(); }
    g.strokeStyle = S.rgba('#9aa0aa', .6); g.lineWidth = 16; g.beginPath(); g.moveTo(-20, 700); g.quadraticCurveTo(640, 520, 1300, 470); g.stroke(); g.strokeStyle = S.rgba('#6a707a', .4); g.lineWidth = 2; for (const o of [-5, 5]) { g.beginPath(); g.moveTo(-20, 700 + o); g.quadraticCurveTo(640, 520 + o, 1300, 470 + o); g.stroke(); }
    for (let x = 60; x < w; x += 180) { const y = 690 - x * .17; g.fillStyle = '#3a2a1a'; g.fillRect(x, y - 40, 5, 40); g.fillStyle = '#f0f4f8'; g.fillRect(x - 1, y - 42, 7, 4); }
  });
  // ======================== A VILLAGE STREET IN THE HUNGRY YEARS ========================
  VP.set('village', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9ab0c8'], [.4, '#e8e0d0']]);
    hill(g, 300, 60, 260, 841, '#b8a888', ['#c8b898', '#988868'], w, h);
    S.dabs(g, { x: 0, y: 230, w, h: 90, n: 120, cols: ['#7a8a5a', '#5a6a42'], r0: 3, r1: 6, sq: .8, a0: .6, a1: .9, seed: 842, mask: (px, py) => S.fbm(px / 40, 4) > .55 });
    house(g, 0, 260, 300, '#e8e0d0', '#a8603a', 844); house(g, 300, 290, 260, '#d8ccb8', '#9a5434', 846, { shut: '#5a3a2a' }); house(g, 760, 280, 280, '#e0d8c8', '#a8603a', 848, { shut: '#3a4a6a' }); house(g, 1040, 250, 240, '#d0c4ac', '#9a5434', 850);
    // the bakery with a painted sign, ration window, wooden door and a queue rail
    g.fillStyle = '#e8dcc0'; g.fillRect(560, 300, 200, 220); S.dabs(g, { x: 560, y: 300, w: 200, h: 220, n: 60, cols: ['#f4ead0', '#c8b898'], r0: 4, r1: 12, a0: .15, a1: .3, seed: 852 });
    g.fillStyle = '#8a3a24'; g.fillRect(556, 296, 208, 34); g.fillStyle = '#f0e8d0'; g.font = 'bold 22px Oswald'; g.textAlign = 'center'; g.fillText('PANADERÍA', 660, 321); g.strokeStyle = '#c8a040'; g.lineWidth = 2; g.strokeRect(560, 300, 200, 26);
    wood(g, 610, 380, 100, 140, '#4a2e18', 853); g.strokeStyle = '#2a1a10'; g.lineWidth = 3; g.strokeRect(610, 380, 100, 140); line(g, 660, 380, 660, 520); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(652, 452, 3, 0, TAU); g.fill();
    g.fillStyle = '#2a2018'; g.fillRect(724, 350, 30, 30); g.fillStyle = '#f0e8d0'; g.font = 'bold 9px Georgia'; g.fillText('RACIÓN', 739, 344);
    g.fillStyle = '#c8b898'; g.fillRect(0, 520, w, h - 520); S.strokes(g, { x: 0, y: 520, w, h: 200, n: 900, cols: ['#d8c8a8', '#8a7a5a', '#b8a888'], l0: 6, l1: 22, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .45, seed: 843 });
    S.dabs(g, { x: 0, y: 530, w, h: 190, n: 160, cols: ['#8a7a5a', '#6a5a44'], r0: 2, r1: 5, a0: .5, a1: .8, seed: 854 });
    const ao = g.createLinearGradient(0, 518, 0, 556); ao.addColorStop(0, 'rgba(0,0,0,.25)'); ao.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ao; g.fillRect(0, 518, w, 38);
  });
  // ======================== AN AIRBASE (TORREJÓN, 1950s) ========================
  VP.set('airbase', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac8'], [.5, '#e0e8f0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 150, n: 50, cols: ['#ffffff', '#e8f0f8'], r0: 30, r1: 80, sq: .3, a0: .25, a1: .5, seed: 850 });
    hill(g, 380, 30, 300, 851, '#b8a888', ['#c8b898', '#988868'], w, h);
    // curved hangar with corrugated roof, big doors and a painted star
    g.fillStyle = '#8a8a7a'; g.fillRect(100, 300, 300, 100); g.fillStyle = '#6a6a5a'; g.beginPath(); g.moveTo(90, 302); g.quadraticCurveTo(250, 236, 410, 302); g.fill(); g.strokeStyle = S.rgba('#3a3a32', .4); g.lineWidth = 1.5; for (let k = 0; k < 22; k++) { const x = 96 + k * 14; g.beginPath(); g.moveTo(x, 302); g.lineTo(x + (250 - x) * .02, 302 - 62 * Math.sin(Math.PI * (x - 90) / 320)); g.stroke(); }
    g.fillStyle = '#2a2a2a'; g.fillRect(170, 330, 160, 70); g.strokeStyle = '#5a5a52'; g.lineWidth = 2; for (let x = 170; x < 330; x += 40) line(g, x, 330, x, 400); g.fillStyle = '#f0f0f0'; g.font = 'bold 14px Oswald'; g.textAlign = 'center'; g.fillText('U.S. AIR FORCE', 250, 322);
    // control tower: glass cab, railings, mast, windsock
    g.fillStyle = '#e8e4dc'; g.fillRect(900, 230, 60, 170); g.fillStyle = S.rgba('#000000', .12); g.fillRect(940, 230, 20, 170); for (let y = 250; y < 390; y += 30) { g.fillStyle = '#4a5a6a'; g.fillRect(912, y, 14, 16); }
    g.fillStyle = '#4a6a8a'; g.fillRect(880, 206, 100, 40); g.fillStyle = S.rgba('#ffffff', .35); g.fillRect(884, 210, 30, 30); g.strokeStyle = '#e8e4dc'; g.lineWidth = 3; for (let x = 880; x <= 980; x += 25) line(g, x, 206, x, 246); g.fillStyle = '#d8d4cc'; g.fillRect(874, 198, 112, 10); g.fillRect(870, 246, 120, 6); g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; line(g, 930, 198, 930, 150); g.fillStyle = '#c83a2a'; g.beginPath(); g.arc(930, 150, 4, 0, TAU); g.fill();
    // fuel tanks and a parked bomber silhouette in the distance
    for (const tx of [560, 620]) { g.fillStyle = '#c8c4b8'; g.fillRect(tx, 340, 44, 60); g.beginPath(); g.ellipse(tx + 22, 340, 22, 8, 0, Math.PI, TAU); g.fill(); g.fillStyle = S.rgba('#000000', .15); g.fillRect(tx + 30, 340, 14, 60); }
    g.fillStyle = '#8a9098'; g.beginPath(); g.moveTo(700, 392); g.lineTo(820, 388); g.lineTo(830, 394); g.lineTo(700, 398); g.fill(); g.beginPath(); g.moveTo(740, 392); g.lineTo(790, 372); g.lineTo(800, 372); g.lineTo(770, 394); g.fill(); g.beginPath(); g.moveTo(812, 389); g.lineTo(822, 376); g.lineTo(828, 376); g.lineTo(826, 392); g.fill();
    g.fillStyle = '#a89a7a'; g.fillRect(0, 400, w, 320); S.strokes(g, { x: 0, y: 400, w, h: 320, n: 700, cols: ['#b8aa8a', '#8a7a5a', '#c8b898'], l0: 6, l1: 18, ang: -1.4, jit: .5, w0: 1, w1: 2, a0: .25, a1: .5, seed: 853 });
    g.fillStyle = '#5a5a5a'; g.beginPath(); g.moveTo(0, 520); g.lineTo(w, 470); g.lineTo(w, 600); g.lineTo(0, 680); g.fill(); S.dabs(g, { x: 0, y: 470, w, h: 210, n: 400, cols: ['#6a6a6a', '#4a4a4a', '#626262'], r0: 4, r1: 14, a0: .2, a1: .45, seed: 855, mask: (px, py) => py > 520 - px * 50 / 1280 && py < 680 - px * 80 / 1280 });
    g.fillStyle = '#e8e8e0'; for (let x = 0; x < w; x += 120) { const y = 600 - x * .07; g.fillRect(x, y, 60, 6); } g.fillStyle = '#e8d040'; g.beginPath(); g.moveTo(0, 524); g.lineTo(w, 474); g.lineTo(w, 478); g.lineTo(0, 528); g.fill();
    for (let x = 40; x < w; x += 160) { const y = 512 - x * .039; g.fillStyle = '#2a2a2a'; g.fillRect(x, y - 10, 4, 10); g.fillStyle = '#e8e4c0'; g.beginPath(); g.arc(x + 2, y - 12, 3, 0, TAU); g.fill(); }
  });
  // ======================== THE COSTA DEL SOL ========================
  VP.set('costa', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a8ad8'], [.4, '#c8e4f4']]);
    S.dabs(g, { x: 0, y: 40, w, h: 140, n: 30, cols: ['#ffffff'], r0: 20, r1: 60, sq: .3, a0: .4, a1: .7, seed: 860 });
    const sg = g.createLinearGradient(0, 300, 0, 460); sg.addColorStop(0, '#2a7ab8'); sg.addColorStop(1, '#5ab0d0'); g.fillStyle = sg; g.fillRect(0, 300, w, 160);
    S.strokes(g, { x: 0, y: 300, w, h: 160, n: 900, cols: ['#8ad0e8', '#1a6aa8', '#ffffff'], l0: 8, l1: 28, ang: 0, jit: .1, w0: 1, w1: 2, a0: .2, a1: .5, seed: 861 });
    for (let i = 0; i < 4; i++) { const r = S.rng(i + 862), x = 500 + r() * 700, y = 330 + r() * 60; g.fillStyle = '#f4f4f0'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 6, y - 22); g.lineTo(x + 8, y); g.fill(); g.fillStyle = '#8a5a3a'; g.beginPath(); g.moveTo(x - 10, y); g.lineTo(x + 16, y); g.lineTo(x + 12, y + 4); g.lineTo(x - 6, y + 4); g.fill(); }
    hill(g, 260, 80, 160, 863, '#a89a6a', ['#b8aa7a', '#887a4a'], 420, h);
    S.strokes(g, { x: 0, y: 160, w: 420, h: 300, n: 300, cols: ['#c8b888', '#7a6a3a', '#6a7a3a'], l0: 8, l1: 22, ang: 1.0, jit: .6, w0: 1, w1: 2.5, a0: .25, a1: .5, seed: 864, mask: (px) => px < 410 });
    // whitewashed village houses tumbling down the cliff
    X.town(g, { x: 30, y: 250, w: 340, h: 130, n: 40, seed: 866, scale: 1.1, wall: '#f8f4ec', wall2: '#e8e0d0', roof: '#c86a4a', roof2: '#a85a3a', shade: '#8a8a9a', rim: '#ffffff', dark: '#3a3a4a', mask: (x, y) => y > 260 + (x - 30) * .12 });
    g.fillStyle = '#e8dcb0'; g.fillRect(0, 460, w, h - 460); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 900, cols: ['#f4e8c0', '#c8b888', '#e0d0a0'], r0: 2, r1: 10, a0: .25, a1: .55, seed: 865 });
    g.fillStyle = S.rgba('#c8b080', .5); g.fillRect(0, 462, w, 26);
    g.fillStyle = S.rgba('#ffffff', .8); g.beginPath(); g.moveTo(0, 462); for (let x = 0; x <= w; x += 20) g.lineTo(x, 458 + Math.sin(x * .05) * 4); for (let x = w; x >= 0; x -= 20) g.lineTo(x, 470 + Math.sin(x * .07 + 1) * 3); g.fill();
    // palms along the promenade
    const palm = (x, y, ht) => { g.strokeStyle = '#7a5a3a'; g.lineWidth = 7; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - 10, y - ht * .5, x + 4, y - ht); g.stroke(); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .4, L2 = 50 + (k % 2) * 14; g.strokeStyle = k % 2 ? '#3a7a3a' : '#4a8a3a'; g.lineWidth = 5; g.beginPath(); g.moveTo(x + 4, y - ht); g.quadraticCurveTo(x + 4 + Math.cos(a) * L2 * .6, y - ht + Math.sin(a) * L2 * .6 - 8, x + 4 + Math.cos(a) * L2, y - ht + Math.sin(a) * L2 + 16); g.stroke(); } };
    palm(1180, 520, 150); palm(1240, 540, 120); palm(470, 500, 130);
  });
})(window);
