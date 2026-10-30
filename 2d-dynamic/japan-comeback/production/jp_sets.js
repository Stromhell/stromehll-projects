// Japan comeback sets (1945-1964), Village Painterly: painted at 2x, warm key light, soft cast shadows.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const sky = (g, w, h, stops) => { const gr = g.createLinearGradient(0, 0, 0, h); stops.forEach(([q, col]) => gr.addColorStop(q, col)); g.fillStyle = gr; g.fillRect(0, 0, w, h); };
  const ridge = (g, w, h, y0, amp, k, seed, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 6) g.lineTo(x, y0 - amp * S.fbm(x / k, seed)); g.lineTo(w, h); g.closePath(); g.fill(); };
  const wood = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); S.strokes(g, { x, y, w, h, n: Math.max(4, Math.round(w * h / 300)), cols: [S.mix(base, '#000000', .25), S.mix(base, '#ffffff', .15)], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 2, a0: .15, a1: .35, seed }); };
  const tin = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); for (let i = 0; i < w; i += 7) { g.fillStyle = S.rgba('#000000', .14); g.fillRect(x + i, y, 2, h); g.fillStyle = S.rgba('#ffffff', .08); g.fillRect(x + i + 3, y, 1, h); }
    S.dabs(g, { x, y, w, h, n: Math.round(w * h / 400) + 4, cols: ['#8a4a2a', '#6a3a1a', '#9a6a4a'], r0: 3, r1: 12, a0: .2, a1: .45, seed }); };
  const grain = (g, w, h, seed, a = .06) => S.dabs(g, { x: 0, y: 0, w, h, n: 500, cols: ['#ffffff', '#000000'], r0: 6, r1: 30, a0: a * .4, a1: a, seed });
  const JX = { sky, ridge, wood, tin, grain }; S.JPX = JX;

  // ======================== BURNT TOKYO, 1945 ========================
  VP.set('jp_burnt', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a6a70'], [.45, '#9a948c'], [.62, '#b0a090'], [1, '#5a4a40']]);
    S.dabs(g, { x: 0, y: 0, w, h: 360, n: 220, cols: ['#8a8a90', '#5a5a62', '#b4aca0'], r0: 30, r1: 110, sq: .45, a0: .08, a1: .22, seed: 901 });
    // far ruined skyline: broken concrete shells and a gutted department store
    g.fillStyle = '#6e6660'; for (let i = 0; i < 26; i++) { const r = S.rng(i + 910), x = i * 52 - 10, bw = 30 + r() * 40, bh = 20 + r() * 70; g.beginPath(); g.moveTo(x, 420); g.lineTo(x, 420 - bh); for (let k = 0; k < 5; k++) g.lineTo(x + bw * (k + 1) / 5, 420 - bh + (r() - .5) * 18); g.lineTo(x + bw, 420); g.fill(); }
    g.fillStyle = '#5e5650'; g.fillRect(860, 300, 150, 120); g.fillStyle = '#2a2420'; for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) g.fillRect(870 + k * 23, 312 + r * 26, 14, 16);
    g.fillStyle = '#6e6660'; g.beginPath(); g.moveTo(860, 300); g.lineTo(900, 286); g.lineTo(940, 300); g.lineTo(1010, 296); g.lineTo(1010, 300); g.fill();
    // haze band
    const hz = g.createLinearGradient(0, 360, 0, 450); hz.addColorStop(0, 'rgba(180,170,160,0)'); hz.addColorStop(1, 'rgba(180,170,160,.55)'); g.fillStyle = hz; g.fillRect(0, 360, w, 90);
    // ash ground with rubble and scorch
    sky(g, w, h, [[0, 'rgba(0,0,0,0)'], [.58, 'rgba(0,0,0,0)'], [.6, '#6a5a50'], [1, '#3a2e28']]);
    g.fillStyle = '#5a4c44'; g.fillRect(0, 432, w, h - 432);
    S.dabs(g, { x: 0, y: 432, w, h: 290, n: 700, cols: ['#3a302a', '#7a6a5e', '#2a2220', '#8a7a6a'], r0: 3, r1: 18, sq: .5, a0: .2, a1: .55, seed: 921 });
    for (let i = 0; i < 140; i++) { const r = S.rng(i + 930), x = r() * w, y = 440 + r() * 280, s = 2 + r() * 8; g.fillStyle = r() < .5 ? '#2a2420' : '#8a6a52'; g.beginPath(); g.moveTo(x - s, y); g.lineTo(x - s * .3, y - s * .8); g.lineTo(x + s, y - s * .3); g.lineTo(x + s * .6, y + s * .2); g.fill(); }
    // black chimneys and a lone stone storehouse (kura) still standing
    for (const [x, ht, cw] of [[150, 230, 26], [410, 180, 20], [740, 260, 28], [1130, 210, 22]]) { g.fillStyle = '#1e1a1a'; g.fillRect(x, 440 - ht, cw, ht); g.fillStyle = '#3a3230'; g.fillRect(x - 3, 440 - ht, cw + 6, 8); for (let y = 440 - ht + 14; y < 440; y += 12) { g.fillStyle = S.rgba('#000000', .25); g.fillRect(x, y, cw, 1); } g.fillStyle = S.rgba('#c8b8a8', .18); g.fillRect(x + 2, 440 - ht, 4, ht); }
    g.fillStyle = '#c8c0b0'; g.fillRect(960, 360, 110, 84); g.fillStyle = '#2a2624'; g.beginPath(); g.moveTo(950, 362); g.lineTo(1015, 326); g.lineTo(1080, 362); g.fill(); g.fillStyle = '#1a1614'; g.fillRect(1000, 392, 30, 52); S.dabs(g, { x: 960, y: 360, w: 110, h: 84, n: 40, cols: ['#3a3430', '#8a8070'], r0: 3, r1: 12, a0: .2, a1: .5, seed: 941 });
    // the Sakai tin shack in the foreground left
    tin(g, 80, 470, 250, 150, '#7a5a44', 951); g.fillStyle = '#4a3a30'; g.beginPath(); g.moveTo(66, 478); g.lineTo(200, 448); g.lineTo(344, 474); g.lineTo(344, 486); g.lineTo(66, 490); g.fill(); tin(g, 66, 474, 278, 14, '#5a4a3a', 952);
    g.fillStyle = '#1a1412'; g.fillRect(150, 520, 60, 100); g.fillStyle = S.rgba('#c8a070', .25); g.fillRect(152, 522, 6, 96);
    wood(g, 240, 520, 70, 46, '#6a5038', 953); g.fillStyle = '#d8d0b8'; g.fillRect(246, 526, 58, 34); g.strokeStyle = '#6a5038'; g.lineWidth = 2; g.strokeRect(246, 526, 58, 34); g.beginPath(); g.moveTo(275, 526); g.lineTo(275, 560); g.moveTo(246, 543); g.lineTo(304, 543); g.stroke();
    g.fillStyle = '#3a2e26'; g.fillRect(70, 616, 280, 8); g.fillStyle = '#8a7a5a'; for (let i = 0; i < 6; i++) g.fillRect(90 + i * 40, 600 + (i % 2) * 6, 30, 14);
    // a cooking pot on bricks with a wisp of smoke
    g.fillStyle = '#7a3a24'; g.fillRect(400, 606, 18, 12); g.fillRect(440, 606, 18, 12); g.fillStyle = '#2a2a2e'; g.beginPath(); g.ellipse(429, 598, 30, 14, 0, 0, TAU); g.fill(); g.fillStyle = '#4a4a50'; g.fillRect(400, 584, 58, 14);
    grain(g, w, h, 961, .05);
  });

  // ======================== MAP OF JAPAN ========================
  const JL = (lon, lat) => [640 + (lon - 136) * 62, 380 - (lat - 36) * 70];
  const HONSHU = [[130.9, 34.0], [131.8, 34.7], [132.6, 35.4], [133.3, 35.5], [134.8, 35.6], [135.8, 35.6], [136.4, 36.3], [136.8, 37.1], [137.3, 37.3], [137.2, 36.8], [138.0, 37.0], [138.6, 37.6], [139.4, 38.2], [139.8, 39.0], [140.0, 40.0], [140.0, 40.8], [140.5, 41.2], [141.2, 41.3], [141.5, 40.6], [141.9, 39.6], [141.6, 38.4], [141.0, 38.2], [140.9, 37.0], [140.7, 36.2], [140.8, 35.7], [140.4, 35.2], [139.8, 34.9], [139.7, 35.3], [139.2, 35.2], [138.8, 34.6], [138.3, 34.6], [137.3, 34.6], [136.9, 34.3], [136.2, 33.8], [135.8, 33.5], [135.2, 33.8], [135.1, 34.6], [134.2, 34.7], [133.0, 34.4], [132.3, 34.2], [131.2, 33.9]];
  const KYUSHU = [[129.7, 33.4], [130.4, 33.9], [131.0, 33.9], [131.7, 33.3], [131.6, 32.4], [131.3, 31.4], [130.6, 31.0], [130.2, 31.3], [130.3, 32.0], [129.8, 32.7]];
  const SHIKOKU = [[132.4, 33.3], [133.1, 33.95], [134.0, 34.3], [134.7, 34.2], [134.7, 33.8], [134.2, 33.3], [133.4, 33.4], [132.9, 32.8], [132.5, 32.9]];
  const HOKKAIDO = [[140.0, 41.4], [140.5, 41.8], [140.1, 42.5], [140.4, 43.2], [141.4, 43.3], [141.7, 44.3], [141.9, 45.4], [142.9, 44.7], [144.3, 44.0], [145.4, 43.4], [145.2, 43.0], [143.9, 42.9], [143.3, 42.0], [141.6, 42.6], [140.9, 41.8]];
  const ISLES = [HONSHU, KYUSHU, SHIKOKU, HOKKAIDO].map(L => L.map(q => JL(q[0], q[1])));
  // the 66 bombed cities, roughly placed (major ones accurate)
  const CITIES = [[139.7, 35.7, 'Tokyo'], [135.5, 34.7, 'Osaka'], [136.9, 35.2, 'Nagoya'], [135.2, 34.7, 'Kobe'], [139.6, 35.4, 'Yokohama'], [132.5, 34.4, 'Hiroshima'], [129.9, 32.75, 'Nagasaki'], [130.4, 33.6, 'Fukuoka'], [140.9, 38.3, 'Sendai'], [133.9, 34.65, 'Okayama'], [137.2, 36.7, 'Toyama'], [138.4, 34.98, 'Shizuoka'], [130.55, 31.6, 'Kagoshima'], [140.1, 35.6, 'Chiba'], [139.0, 37.9, 'Niigata']];
  for (let i = CITIES.length; i < 66; i++) { const r = S.rng(i + 400); const L = HONSHU[Math.floor(r() * HONSHU.length)]; CITIES.push([L[0] + (r() - .5) * 1.4 + (L[0] > 138 ? -.4 : .4), L[1] + (r() - .5) * .8 - .2]); }
  JX.JL = JL; JX.ISLES = ISLES; JX.CITIES = CITIES.map(c => JL(c[0], c[1]).concat([c[2] || '']));
  VP.set('jp_map', 1280, 720, (g, w, h) => {
    g.fillStyle = '#2a1a10'; g.fillRect(0, 0, w, h);
    const pp = S.poly([[60, 40], [640, 22], [1222, 44], [1250, 360], [1226, 684], [640, 700], [52, 680], [34, 360]]);
    const pg = g.createLinearGradient(0, 0, w, h); pg.addColorStop(0, '#ecd9ac'); pg.addColorStop(1, '#d8bd88'); g.fillStyle = pg; g.fill(pp);
    g.save(); g.clip(pp);
    S.dabs(g, { x: 0, y: 0, w, h, n: 600, cols: ['#c8a46a', '#f4e4c0', '#b8925a'], r0: 20, r1: 90, sq: .6, a0: .04, a1: .12, seed: 451 });
    g.fillStyle = S.rgba('#7aa0a0', .35); g.fillRect(0, 0, w, h);
    S.strokes(g, { x: 0, y: 0, w, h, n: 900, cols: ['#5a8a8c', '#9ac0b8'], l0: 10, l1: 30, ang: 0, jit: .15, w0: 1, w1: 3, a0: .08, a1: .2, seed: 453 });
    for (const L of ISLES) { const p = S.poly(L, false); g.fillStyle = '#e2c890'; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 400, cols: ['#c8a868', '#f0dca8', '#a88a54'], r0: 6, r1: 30, sq: .5, a0: .1, a1: .25, seed: 455 }); g.restore();
      g.strokeStyle = '#6a4a2a'; g.lineWidth = 2.4; g.stroke(p); g.strokeStyle = S.rgba('#4a7a7a', .35); g.lineWidth = 8; g.stroke(p); }
    g.strokeStyle = S.rgba('#6a4a2a', .7); g.lineWidth = 1.6;
    for (let i = 0; i < 90; i++) { const r = S.rng(i + 480), [x, y] = JL(131 + r() * 13, 33 + r() * 10); if (!ISLES.some(L => g.isPointInPath(S.poly(L, false), x * 2, y * 2))) continue; g.beginPath(); g.moveTo(x - 6, y + 3); g.lineTo(x, y - 5); g.lineTo(x + 6, y + 3); g.stroke(); }
    const [fx, fy] = JL(138.73, 35.36); g.fillStyle = '#f4f0e8'; g.beginPath(); g.moveTo(fx - 12, fy + 6); g.lineTo(fx, fy - 12); g.lineTo(fx + 12, fy + 6); g.fill(); g.strokeStyle = '#6a4a2a'; g.stroke();
    g.font = 'italic 22px Caveat'; g.fillStyle = S.rgba('#4a6a6a', .8); g.fillText('Sea of Japan', 300, 230); g.fillText('Pacific Ocean', 900, 600);
    g.restore();
    g.strokeStyle = '#4a2e18'; g.lineWidth = 6; g.stroke(pp);
  });

  // ======================== MOUNT FUJI + THE TOKAIDO LINE, 1964 ========================
  VP.set('jp_fuji', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a8ad0'], [.5, '#9ac8ec'], [.7, '#d8ecf4'], [1, '#e8f0e8']]);
    S.dabs(g, { x: 0, y: 40, w, h: 220, n: 60, cols: ['#ffffff', '#e8f2fa'], r0: 30, r1: 90, sq: .35, a0: .25, a1: .55, seed: 501 });
    // Fuji: broad cone, snow cap with ragged gullies
    const F = [[180, 470], [470, 200], [560, 168], [650, 200], [940, 470]]; g.fillStyle = '#5a6a9a'; g.beginPath(); g.moveTo(F[0][0], F[0][1]); g.quadraticCurveTo(420, 260, 520, 172); g.lineTo(600, 172); g.quadraticCurveTo(700, 260, 940, 470); g.fill();
    S.strokes(g, { x: 260, y: 220, w: 600, h: 250, n: 300, cols: ['#4a5a8a', '#7a8ab8'], l0: 20, l1: 60, ang: 1.2, jit: .3, w0: 1, w1: 3, a0: .15, a1: .35, seed: 503 });
    g.fillStyle = '#f8fafc'; g.beginPath(); g.moveTo(468, 222); g.quadraticCurveTo(495, 190, 520, 172); g.lineTo(600, 172); g.quadraticCurveTo(625, 190, 652, 222); for (let i = 0; i <= 12; i++) { const x = 652 - i * 15.3, y = 222 + (i % 2 ? 26 + 14 * S.rng(i + 7)() : 6); g.lineTo(x, y); } g.fill();
    g.fillStyle = S.rgba('#c8d8f0', .6); g.beginPath(); g.moveTo(560, 174); g.lineTo(600, 172); g.quadraticCurveTo(625, 190, 652, 222); g.lineTo(600, 236); g.fill();
    // foothills, tea fields and pines
    ridge(g, w, h, 470, 60, 260, 511, '#5a8a5a'); ridge(g, w, h, 520, 50, 200, 513, '#4a7a46');
    for (let r = 0; r < 6; r++) { g.strokeStyle = S.rgba('#2e5a2e', .5); g.lineWidth = 3; g.beginPath(); for (let x = 0; x <= w; x += 20) g.lineTo(x, 540 + r * 9 + 4 * Math.sin(x / 60 + r)); g.stroke(); }
    for (let i = 0; i < 18; i++) { const r = S.rng(i + 520), x = r() * w, y = 500 + r() * 30, s = .6 + r() * .6; g.fillStyle = '#2a4a2a'; g.fillRect(x - 2, y - 30 * s, 4, 30 * s); for (let k = 0; k < 3; k++) { g.fillStyle = k ? '#3a6a3a' : '#2a5a2a'; g.beginPath(); g.ellipse(x + (k - 1) * 10 * s, y - 34 * s - k * 6 * s, 18 * s, 8 * s, 0, 0, TAU); g.fill(); } }
    // the elevated line: concrete viaduct with piers, catenary posts and wires
    g.fillStyle = '#c8c4bc'; g.fillRect(0, 590, w, 22); g.fillStyle = '#8a8680'; g.fillRect(0, 612, w, 8); g.fillStyle = S.rgba('#ffffff', .4); g.fillRect(0, 590, w, 3);
    for (let x = 30; x < w; x += 140) { g.fillStyle = '#b0aca4'; g.fillRect(x, 620, 26, 100); g.fillStyle = S.rgba('#000000', .18); g.fillRect(x + 18, 620, 8, 100); }
    for (let x = 60; x < w; x += 200) { g.fillStyle = '#5a5a5e'; g.fillRect(x, 520, 6, 72); g.fillRect(x - 20, 524, 46, 4); }
    g.strokeStyle = '#3a3a3e'; g.lineWidth = 1.2; g.beginPath(); for (let x = 0; x <= w; x += 20) g.lineTo(x, 528 + 3 * Math.cos((x - 60) / 200 * TAU)); g.stroke();
    g.fillStyle = '#6a6a6e'; g.fillRect(0, 586, w, 4);
    grain(g, w, h, 531, .04);
  });

  // ======================== TRUCK FACTORY FLOOR, 1951 ========================
  VP.set('jp_factory', 1280, 720, (g, w, h) => {
    g.fillStyle = '#4a4440'; g.fillRect(0, 0, w, h);
    // saw-tooth roof lights
    for (let x = -40; x < w; x += 160) { g.fillStyle = '#e8e0c8'; g.beginPath(); g.moveTo(x, 120); g.lineTo(x + 40, 20); g.lineTo(x + 50, 20); g.lineTo(x + 50, 120); g.fill(); g.fillStyle = '#3a3430'; g.beginPath(); g.moveTo(x + 50, 20); g.lineTo(x + 160, 120); g.lineTo(x + 50, 120); g.fill(); g.strokeStyle = '#2a2420'; g.lineWidth = 2; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x + k * 12, 120 - k * 25); g.lineTo(x + 50, 120 - k * 25); g.stroke(); } }
    g.fillStyle = '#2a2420'; g.fillRect(0, 118, w, 10);
    // back wall brick with windows and a slogan banner
    g.fillStyle = '#7a5040'; g.fillRect(0, 128, w, 300); for (let y = 128; y < 428; y += 10) for (let x = (y / 10) % 2 * 12; x < w; x += 24) { g.fillStyle = S.rgba('#000000', .12); g.fillRect(x, y, 23, 1); g.fillRect(x, y, 1, 10); }
    for (let x = 60; x < w; x += 220) { g.fillStyle = '#c8d8d8'; g.fillRect(x, 170, 120, 90); g.strokeStyle = '#3a3a3a'; g.lineWidth = 3; g.strokeRect(x, 170, 120, 90); g.beginPath(); for (let k = 1; k < 4; k++) { g.moveTo(x + k * 30, 170); g.lineTo(x + k * 30, 260); } g.moveTo(x, 215); g.lineTo(x + 120, 215); g.stroke(); }
    g.fillStyle = '#e8e0d0'; g.fillRect(420, 300, 440, 50); g.fillStyle = '#b02020'; g.font = 'bold 30px Oswald'; g.textAlign = 'center'; g.fillText('品質第一 · QUALITY FIRST', 640, 336); g.textAlign = 'left';
    // overhead crane rail and hook
    g.fillStyle = '#c89a20'; g.fillRect(0, 140, w, 16); g.fillStyle = '#2a2420'; for (let x = 0; x < w; x += 30) g.fillRect(x, 142, 2, 12);
    // floor
    const fl = g.createLinearGradient(0, 428, 0, h); fl.addColorStop(0, '#6a645c'); fl.addColorStop(1, '#3a3632'); g.fillStyle = fl; g.fillRect(0, 428, w, h - 428);
    S.dabs(g, { x: 0, y: 428, w, h: 292, n: 300, cols: ['#2a2622', '#8a847a', '#4a2a1a'], r0: 4, r1: 26, sq: .4, a0: .1, a1: .3, seed: 551 });
    g.fillStyle = '#d8b030'; g.fillRect(0, 600, w, 6);
    // a line of truck chassis under assembly
    for (let i = 0; i < 3; i++) { const x = 140 + i * 380, y = 560; g.fillStyle = '#2a2a2e'; g.fillRect(x, y - 20, 300, 16); for (const wx of [x + 50, x + 250]) { g.fillStyle = '#1a1a1a'; g.beginPath(); g.arc(wx, y + 10, 34, 0, TAU); g.fill(); g.fillStyle = '#6a6a6e'; g.beginPath(); g.arc(wx, y + 10, 14, 0, TAU); g.fill(); }
      g.fillStyle = i === 0 ? '#3a5a3a' : '#4a6a8a'; g.beginPath(); g.moveTo(x + 200, y - 20); g.lineTo(x + 200, y - 110); g.lineTo(x + 270, y - 110); g.lineTo(x + 300, y - 70); g.lineTo(x + 300, y - 20); g.fill(); g.fillStyle = '#a8c8d8'; g.fillRect(x + 214, y - 100, 40, 32); if (i < 2) { g.fillStyle = '#5a4a3a'; g.fillRect(x, y - 70, 196, 50); } }
    S.glow(g, 640, 60, 600, '#fff0d0', .25);
    grain(g, w, h, 561, .05);
  });

  // ======================== THE SHELF (title card) ========================
  VP.set('jp_shelf', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a1e18'], [1, '#120c0a']]);
    // shoji screen glowing behind
    g.fillStyle = '#e8dcc0'; g.fillRect(140, 60, 1000, 440); g.strokeStyle = '#4a3020'; g.lineWidth = 6; g.strokeRect(140, 60, 1000, 440); g.lineWidth = 3; for (let x = 140; x <= 1140; x += 100) { g.beginPath(); g.moveTo(x, 60); g.lineTo(x, 500); g.stroke(); } for (let y = 60; y <= 500; y += 88) { g.beginPath(); g.moveTo(140, y); g.lineTo(1140, y); g.stroke(); }
    S.glow(g, 640, 280, 700, '#ffd8a0', .35);
    wood(g, 0, 500, w, 30, '#6a4428', 571); g.fillStyle = S.rgba('#ffe0b0', .3); g.fillRect(0, 500, w, 3); wood(g, 0, 530, w, 190, '#3a2416', 573);
    g.fillStyle = S.rgba('#000000', .4); g.fillRect(0, 530, w, 10);
  });

  // ======================== A SMALL WORKSHOP / HOME DESK (close-ups) ========================
  VP.set('jp_desk', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a4430'], [1, '#2a1c12']]);
    g.fillStyle = '#d8c8a0'; g.fillRect(0, 0, w, 380); g.strokeStyle = '#5a3a22'; g.lineWidth = 4; for (let x = 0; x <= w; x += 120) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 380); g.stroke(); } g.beginPath(); g.moveTo(0, 190); g.lineTo(w, 190); g.stroke();
    S.glow(g, 900, 120, 600, '#fff0c8', .3);
    wood(g, 0, 380, w, 340, '#7a5232', 581); g.fillStyle = S.rgba('#ffe0b0', .25); g.fillRect(0, 380, w, 4);
    S.strokes(g, { x: 0, y: 384, w, h: 336, n: 400, cols: ['#5a3a20', '#9a6a40'], l0: 40, l1: 160, ang: 0, jit: .02, w0: 1, w1: 3, a0: .1, a1: .3, seed: 583 });
  });
})(window);
