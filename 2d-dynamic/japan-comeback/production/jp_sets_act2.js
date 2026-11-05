// Japan act 2 sets: East Asia map, the Toyota works exterior (gate, sawtooth halls, chimneys), the San Francisco treaty hall.
(function (G) {
  const S = G.S, VP = G.VP, J = S.JPX, TAU = Math.PI * 2, { sky, ridge, wood, tin, grain } = J;
  // East Asia projection
  const AL = (lon, lat) => [640 + (lon - 125) * 26, 360 - (lat - 38) * 30];
  const CHINA_KOREA = [[73, 40], [80, 45], [87, 49], [97, 42], [105, 41.5], [111, 43], [117, 49], [123, 53], [127, 50], [131, 47.5], [134, 48], [131, 43], [130.7, 42.3], [129.7, 41], [128.3, 38.6], [129.4, 36], [129.2, 35.1], [127.5, 34.6], [126.3, 34.6], [126.5, 36.8], [126.2, 37.7], [124.7, 38], [125.1, 39.6], [124.2, 40], [121.6, 39], [121.2, 40.8], [119.5, 39.8], [117.8, 39], [118.9, 37.4], [120.7, 36.9], [119.2, 35], [120.5, 33.5], [121.9, 31.7], [121.9, 30], [119.7, 26], [117, 23.6], [113.6, 22.2], [110.2, 20.3], [108.4, 21.6], [106.7, 20.8], [102, 22.4], [98, 24], [97, 28], [92, 27], [88, 28], [80, 30], [78, 35]];
  const RUSSIA = [[60, 50], [87, 49], [97, 50], [117, 49], [123, 53], [127, 50], [131, 47.5], [134, 48], [131, 43], [133, 42.8], [136, 44], [138.5, 47], [141, 52], [141, 58], [150, 59], [160, 61], [170, 62], [180, 66], [180, 75], [60, 75]];
  const JP = S.JPX.ISLES ? null : null;
  const HON = [[130.9, 34.0], [132.6, 35.4], [135.8, 35.6], [136.8, 37.1], [138.6, 37.6], [139.8, 39.0], [140.0, 40.8], [141.2, 41.3], [141.9, 39.6], [141.0, 38.2], [140.8, 35.7], [139.8, 34.9], [138.3, 34.6], [136.9, 34.3], [135.2, 33.8], [133.0, 34.4], [131.2, 33.9]], KYU = [[129.7, 33.4], [131.0, 33.9], [131.7, 33.3], [131.3, 31.4], [130.2, 31.3], [129.8, 32.7]], SHI = [[132.4, 33.3], [134.0, 34.3], [134.7, 33.8], [133.4, 33.4], [132.5, 32.9]], HOK = [[140.0, 41.4], [140.4, 43.2], [141.7, 44.3], [141.9, 45.4], [144.3, 44.0], [145.4, 43.4], [143.3, 42.0], [140.9, 41.8]];
  const TAIWAN = [[120.1, 23], [121, 25.2], [121.9, 25], [121, 22], [120.3, 22.5]];
  J.AL = AL; J.ASIA = { CHINA: CHINA_KOREA.map(q => AL(q[0], q[1])), RUSSIA: RUSSIA.map(q => AL(q[0], q[1])), JAPAN: [HON, KYU, SHI, HOK].map(L => L.map(q => AL(q[0], q[1]))), TAIWAN: TAIWAN.map(q => AL(q[0], q[1])) };
  VP.set('jp_asia', 1280, 720, (g, w, h) => {
    g.fillStyle = '#2a1a10'; g.fillRect(0, 0, w, h);
    const pp = S.poly([[60, 40], [640, 22], [1222, 44], [1250, 360], [1226, 684], [640, 700], [52, 680], [34, 360]]);
    const pg = g.createLinearGradient(0, 0, w, h); pg.addColorStop(0, '#ecd9ac'); pg.addColorStop(1, '#d8bd88'); g.fillStyle = pg; g.fill(pp);
    g.save(); g.clip(pp); S.dabs(g, { x: 0, y: 0, w, h, n: 600, cols: ['#c8a46a', '#f4e4c0', '#b8925a'], r0: 20, r1: 90, sq: .6, a0: .04, a1: .12, seed: 751 });
    g.fillStyle = S.rgba('#7aa0a0', .35); g.fillRect(0, 0, w, h); S.strokes(g, { x: 0, y: 0, w, h, n: 900, cols: ['#5a8a8c', '#9ac0b8'], l0: 10, l1: 30, ang: 0, jit: .15, w0: 1, w1: 3, a0: .08, a1: .2, seed: 753 });
    const land = (L, col, seed) => { const p = S.poly(L, false); g.fillStyle = col; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 300, cols: ['#c8a868', '#f0dca8', '#a88a54'], r0: 6, r1: 30, sq: .5, a0: .1, a1: .25, seed }); g.restore(); g.strokeStyle = '#6a4a2a'; g.lineWidth = 2.2; g.stroke(p); g.strokeStyle = S.rgba('#4a7a7a', .35); g.lineWidth = 7; g.stroke(p); };
    land(J.ASIA.RUSSIA, '#d8c08a', 755); land(J.ASIA.CHINA, '#e2c890', 757); land(J.ASIA.TAIWAN, '#e2c890', 759); J.ASIA.JAPAN.forEach((L, i) => land(L, '#ecd49c', 761 + i));
    // the Korea border (38th parallel) dashed and labels
    g.setLineDash([6, 5]); g.strokeStyle = '#6a4a2a'; g.lineWidth = 1.6; g.beginPath(); const a = AL(124.7, 38.3), b = AL(128.6, 38.3); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); g.setLineDash([]);
    g.font = '24px Caveat'; g.fillStyle = '#3a2a1a'; [['SOVIET UNION', 112, 58], ['CHINA', 108, 33], ['KOREA', 125.6, 39.6], ['JAPAN', 140.5, 36]].forEach(([t, lo, la]) => { const [x, y] = AL(lo, la); g.fillText(t, x - 30, y); });
    g.font = 'italic 20px Caveat'; g.fillStyle = S.rgba('#4a6a6a', .8); g.fillText('Sea of Japan', AL(133, 40)[0], AL(133, 40)[1]); g.fillText('Yellow Sea', AL(122, 35)[0], AL(122, 35)[1]); g.fillText('Pacific Ocean', AL(146, 31)[0], AL(146, 31)[1]);
    g.restore(); g.strokeStyle = '#4a2e18'; g.lineWidth = 6; g.stroke(pp);
  });

  // ======================== THE TOYOTA WORKS (Koromo) ========================
  const works = (g, w, h, night) => {
    if (night) sky(g, w, h, [[0, '#0e1428'], [.6, '#24304a'], [1, '#2a2a34']]); else sky(g, w, h, [[0, '#7aa8d0'], [.6, '#c8d8e0'], [1, '#d8d0c0']]);
    if (night) for (let i = 0; i < 80; i++) { const r = S.rng(i + 770); g.fillStyle = S.rgba('#ffffff', .3 + r() * .5); g.fillRect(r() * w, r() * 260, 1.5, 1.5); }
    ridge(g, w, h, 300, 40, 260, 771, night ? '#1e2638' : '#8aa0a8');
    // sawtooth halls
    const hall = (x, y, ww, hh, seed) => { g.fillStyle = night ? '#3a3a40' : '#a8a098'; g.fillRect(x, y, ww, hh); for (let k = 0; k < ww; k += 50) { g.fillStyle = night ? '#2a2a30' : '#7a726a'; g.beginPath(); g.moveTo(x + k, y); g.lineTo(x + k + 36, y - 34); g.lineTo(x + k + 50, y - 34); g.lineTo(x + k + 50, y); g.fill(); g.fillStyle = night ? '#1a1e2a' : '#c8d8e0'; g.beginPath(); g.moveTo(x + k + 36, y - 34); g.lineTo(x + k + 50, y - 34); g.lineTo(x + k + 50, y); g.lineTo(x + k + 40, y); g.fill(); }
      for (let r = 0; r < 2; r++) for (let k = 0; k < ww / 46 - 1; k++) { g.fillStyle = night ? '#1a1e28' : '#4a5a64'; g.fillRect(x + 16 + k * 46, y + 24 + r * 54, 30, 36); g.strokeStyle = night ? '#2a2a30' : '#d8d0c8'; g.lineWidth = 2; g.strokeRect(x + 16 + k * 46, y + 24 + r * 54, 30, 36); }
      S.dabs(g, { x, y, w: ww, h: hh, n: 60, cols: ['#5a5048', '#c8c0b8'], r0: 3, r1: 14, a0: .1, a1: .3, seed }); };
    hall(140, 300, 560, 170, 773); hall(760, 280, 460, 190, 775);
    // chimneys
    for (const [x, ht] of [[300, 210], [360, 170], [980, 240]]) { g.fillStyle = night ? '#2a2420' : '#8a5040'; g.fillRect(x, 300 - ht + 40, 22, ht); for (let y = 300 - ht + 50; y < 340; y += 24) { g.fillStyle = S.rgba('#ffffff', .2); g.fillRect(x, y, 22, 4); } }
    // wall, gate posts and sign
    g.fillStyle = night ? '#4a4844' : '#c8c0b0'; g.fillRect(0, 470, w, 60); g.fillStyle = S.rgba('#000000', .2); for (let x = 0; x < w; x += 40) g.fillRect(x, 470, 2, 60);
    g.fillStyle = night ? '#5a5650' : '#d8d0c0'; g.fillRect(540, 420, 40, 120); g.fillRect(780, 420, 40, 120); g.fillStyle = night ? '#e8e0c8' : '#f4ecd8'; g.fillRect(580, 432, 200, 34); g.fillStyle = '#1a1a1a'; g.font = 'bold 20px Oswald'; g.textAlign = 'center'; g.fillText('トヨタ自動車 · TOYOTA MOTOR', 680, 456); g.textAlign = 'left';
    g.fillStyle = night ? '#3a3a3e' : '#7a7a7e'; g.fillRect(0, 530, w, h - 530); S.dabs(g, { x: 0, y: 530, w, h: 190, n: 300, cols: ['#4a4a4e', '#9a9a9e', '#5a5a5e'], r0: 4, r1: 20, sq: .4, a0: .15, a1: .35, seed: 779 });
    g.fillStyle = S.rgba('#ffffff', .25); for (let x = 0; x < w; x += 90) g.fillRect(x, 640, 50, 5);
    grain(g, w, h, 781, .05);
  };
  VP.set('jp_works', 1280, 720, (g, w, h) => works(g, w, h, false));
  VP.set('jp_works_night', 1280, 720, (g, w, h) => works(g, w, h, true));

  // ======================== THE TREATY HALL, SAN FRANCISCO ========================
  VP.set('jp_hall', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a2a24'], [1, '#1a1210']]);
    // proscenium arch with gilded mouldings and a row of national flags
    g.fillStyle = '#c8a040'; g.fillRect(120, 40, 1040, 30); g.fillRect(120, 40, 30, 560); g.fillRect(1130, 40, 30, 560); g.fillStyle = '#8a6a20'; for (let x = 130; x < 1150; x += 20) g.fillRect(x, 46, 8, 18);
    g.fillStyle = '#5a1a1a'; g.fillRect(150, 70, 980, 120); for (let x = 150; x < 1130; x += 30) { g.fillStyle = S.rgba('#000000', .25); g.beginPath(); g.ellipse(x + 15, 190, 15, 10, 0, 0, Math.PI); g.fill(); }
    g.fillStyle = '#6a5a4a'; g.fillRect(150, 190, 980, 300); S.glow(g, 640, 300, 500, '#ffe0b0', .3);
    const FL = [['#b02030', '#f4f0e8', '#2a3a7a'], ['#f4f0e8', '#c82020'], ['#2a6a3a', '#f4f0e8', '#c82020'], ['#1a3a8a', '#f4f0e8'], ['#c8a040', '#2a2a2a'], ['#f4f0e8', '#2a5aa8']];
    for (let i = 0; i < 12; i++) { const x = 190 + i * 80, f = FL[i % FL.length]; g.fillStyle = '#c8a040'; g.fillRect(x, 200, 4, 140); f.forEach((col, k) => { g.fillStyle = col; g.fillRect(x + 4, 206 + k * (40 / f.length), 44, 40 / f.length + 1); }); if (i === 5) { g.fillStyle = '#f4f0e8'; g.fillRect(x + 4, 206, 44, 40); g.fillStyle = '#c82020'; g.beginPath(); g.arc(x + 26, 226, 10, 0, TAU); g.fill(); } }
    // the long signing table with green baize
    g.fillStyle = '#1e4a2a'; g.fillRect(260, 440, 760, 40); g.fillStyle = '#5a3a20'; g.fillRect(260, 480, 760, 110); g.fillStyle = S.rgba('#ffe0b0', .2); g.fillRect(260, 440, 760, 4);
    g.fillStyle = '#f4ecd8'; g.fillRect(560, 446, 160, 26); g.fillStyle = '#5a3a20'; for (const x of [360, 900]) { g.fillRect(x, 440, 40, 8); }
    // floor and audience rows in shadow
    g.fillStyle = '#2a1e18'; g.fillRect(0, 590, w, 130); for (let r = 0; r < 3; r++) for (let x = 20 + r * 14; x < w; x += 40) { g.fillStyle = '#120c0a'; g.beginPath(); g.arc(x, 650 + r * 24, 14, Math.PI, 0); g.fill(); }
    grain(g, w, h, 791, .05);
  });
})(window);
