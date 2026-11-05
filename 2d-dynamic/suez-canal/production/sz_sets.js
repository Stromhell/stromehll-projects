// Suez Canal sets (cold open + act 1): the modern canal, the parchment map, Darius's stone in the dunes,
// the Nile delta, the digging trench, the dark temple, the ancient canal. Painted at 2x, warm desert light.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, wood, grain } = S.JPX;
  const ll = (lon, lat) => [330 + (lon + 20) * 7.4, 14 + (52 - lat) * 7.4];
  const sand = (g, y, w, h, c1, c2, seed) => { const gr = g.createLinearGradient(0, y, 0, h); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr; g.fillRect(0, y, w, h - y);
    S.dabs(g, { x: 0, y, w, h: h - y, n: 600, cols: ['#c89a60', '#f0d4a0', '#a87a48', '#e8c488'], r0: 2, r1: 12, sq: .35, a0: .15, a1: .4, seed });
    for (let k = 0; k < 18; k++) { const r = S.rng(seed + k), yy = y + 20 + r() * (h - y - 20); g.strokeStyle = S.rgba('#8a6438', .18); g.lineWidth = 2; g.beginPath(); g.moveTo(r() * w - 200, yy); g.quadraticCurveTo(r() * w, yy - 14, r() * w + 300, yy + 6); g.stroke(); } };
  const dunes = (g, w, h, y0, cols, seed) => cols.forEach((col, i) => ridge(g, w, h, y0 + i * 26, 40 - i * 8, 220 + i * 60, seed + i, col));
  const water = (g, x, y, w, h, c1, c2, seed) => { const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, c1); gr.addColorStop(1, c2); g.fillStyle = gr; g.fillRect(x, y, w, h);
    for (let k = 0; k < 60; k++) { const r = S.rng(seed + k); g.fillStyle = S.rgba('#ffffff', .08 + r() * .12); g.fillRect(x + r() * w, y + r() * h, 20 + r() * 60, 2); } };
  const palm = (g, x, y, s, seed) => { g.strokeStyle = '#6a4a2a'; g.lineWidth = 7 * s; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 14 * s, y - 70 * s, x + 6 * s, y - 140 * s); g.stroke();
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .38, L = (60 + (k % 3) * 12) * s; g.strokeStyle = k % 2 ? '#3e6a2a' : '#5a8a3a'; g.lineWidth = 9 * s; g.beginPath(); g.moveTo(x + 6 * s, y - 140 * s); g.quadraticCurveTo(x + 6 * s + Math.cos(a) * L * .6, y - 140 * s + Math.sin(a) * L * .4 - 20 * s, x + 6 * s + Math.cos(a) * L, y - 140 * s + Math.sin(a) * L * .5 + 20 * s); g.stroke(); } g.lineCap = 'butt'; };
  const AFR = [[-17,21],[-16,12],[-12,7],[-8,4.5],[-2,5],[5,6],[9,4],[9,-1],[12,-5],[13,-12],[12,-17],[15,-27],[18,-34.5],[22,-34],[28,-33],[32,-28],[35,-24],[40,-15],[40,-10],[39,-5],[42,0],[48,5],[51,11],[44,11],[43,12.5],[39,16],[37,21],[35,24],[33.8,27.6],[32.6,29.9],[32.3,31.3],[29,31],[25,31.7],[20,31],[19,30.3],[15,32.3],[11,33],[10,37],[3,36.8],[-2,35.2],[-6,35.8],[-10,30],[-13,27]];
  const ASIA = [[32.6,29.9],[33.8,27.8],[34.5,29.5],[35,28],[39,22],[42,16],[43,12.7],[45,13],[52,16],[57,19],[59,22.5],[56,26],[56.5,24],[51,24],[50,27],[48,30],[50,30],[56,27],[60,25.5],[66,25],[66,49],[40,49],[40,46],[30,46],[28,44],[28,41.2],[26,40.2],[29,41],[36,37],[36,35],[35,33],[34.3,31.4],[32.3,31.3]];
  const EUR = [[-10,36],[-9,43],[-2,43.5],[-1.5,46],[-4.5,48.5],[-1,49.5],[2,51],[8,54],[10,57],[20,57],[30,60],[40,60],[40,46],[30,46],[28,44],[28,41.2],[26,40.5],[24,38],[22,36.5],[21,39],[19.5,41.5],[13.5,45.5],[12.5,44],[16,41],[18.5,40],[16,38],[15.6,38],[12,41.5],[10,44],[7,43.6],[3,43.3],[3,42],[0,39.5],[-0.5,38],[-2,36.8],[-5.5,36]];
  const land = (g, pts, col, seed) => { g.fillStyle = col; g.beginPath(); pts.forEach(([a, b], i) => { const [x, y] = ll(a, b); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.fill();
    g.save(); g.clip(); S.dabs(g, { x: 0, y: 0, w: 1280, h: 720, n: 500, cols: ['#b8945a', '#e8cc94', '#9a7a48'], r0: 4, r1: 22, a0: .1, a1: .3, seed }); g.restore();
    g.strokeStyle = '#5a3a1e'; g.lineWidth = 2.5; g.beginPath(); pts.forEach(([a, b], i) => { const [x, y] = ll(a, b); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.stroke(); };
  S.SZ = { ll, sand, dunes, water, palm };

  // ======================== THE MODERN CANAL (cold open, act 6) ========================
  VP.set('sz_canal', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7ab0d8'], [.42, '#e8dcc0'], [1, '#d8b47a']]);
    S.glow(g, 1040, 140, 300, '#fff4d0', .35);
    dunes(g, w, h, 300, ['#d8b07a', '#c89a62'], 1101);
    // banks and water: the channel runs diagonally from far left to near right
    g.fillStyle = '#c8a06a'; g.fillRect(0, 330, w, 390);
    g.fillStyle = '#3a7a9a'; g.beginPath(); g.moveTo(0, 360); g.lineTo(w, 410); g.lineTo(w, 600); g.lineTo(0, 420); g.fill();
    g.save(); g.clip(); water(g, 0, 350, w, 260, '#4a8aa8', '#24506a', 1103); g.restore();
    g.fillStyle = '#e0c48c'; g.beginPath(); g.moveTo(0, 420); g.lineTo(w, 600); g.lineTo(w, 620); g.lineTo(0, 434); g.fill();
    g.fillStyle = '#e0c48c'; g.beginPath(); g.moveTo(0, 352); g.lineTo(w, 402); g.lineTo(w, 410); g.lineTo(0, 360); g.fill();
    sand(g, 620, w, h, '#d8b47a', '#b88a52', 1105);
    // far bank: a service road, pylons, a signal station with palms, marker posts along the water
    g.fillStyle = '#9a8a72'; g.fillRect(0, 336, w, 6);
    for (let x = 60; x < w; x += 180) { g.strokeStyle = '#5a5a5a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 336); g.lineTo(x + 6, 296); g.lineTo(x + 12, 336); g.moveTo(x - 4, 304); g.lineTo(x + 16, 304); g.stroke(); }
    g.strokeStyle = S.rgba('#4a4a4a', .5); g.lineWidth = 1; g.beginPath(); for (let x = 60; x < w; x += 180) { g.moveTo(x + 6, 300); g.quadraticCurveTo(x + 96, 312, x + 186, 300); } g.stroke();
    g.fillStyle = '#e8e0d0'; g.fillRect(860, 300, 70, 40); g.fillStyle = '#c84a2a'; g.fillRect(856, 294, 78, 8); g.fillStyle = '#4a6a8a'; for (let k = 0; k < 3; k++) g.fillRect(868 + k * 20, 312, 12, 12); g.fillStyle = '#e8e0d0'; g.fillRect(900, 250, 14, 50); g.fillStyle = '#c84a2a'; g.fillRect(896, 244, 22, 10);
    [[820, 340, .45], [960, 342, .5], [990, 340, .38]].forEach(([x, y, s], k) => palm(g, x, y, s, 1120 + k));
    for (let k = 0; k < 14; k++) { const t = k / 13, x = t * w, y = 362 + t * 46; g.fillStyle = k % 2 ? '#d8402a' : '#e8e8e8'; g.fillRect(x, y - 14, 4, 14); }
    for (let k = 0; k < 10; k++) { const t = k / 9, x = t * w, y = 428 + t * 180; g.fillStyle = '#3a3a3a'; g.fillRect(x - 2, y - 26, 5, 26); g.fillStyle = k % 2 ? '#2a8a3a' : '#e8e8e8'; g.fillRect(x - 4, y - 32, 9, 9); }
    // near shore: tyre tracks, scrub, rocks
    for (let k = 0; k < 2; k++) { g.strokeStyle = S.rgba('#8a6438', .35); g.lineWidth = 6; g.beginPath(); g.moveTo(0, 660 + k * 16); g.quadraticCurveTo(640, 640 + k * 16, w, 690 + k * 16); g.stroke(); }
    for (let k = 0; k < 16; k++) { const r = S.rng(1130 + k), x = r() * w, y = 640 + r() * 70; g.fillStyle = S.rgba(k % 3 ? '#6a7a3a' : '#5a4a32', .7); g.beginPath(); g.ellipse(x, y, 10 + r() * 16, 5 + r() * 6, 0, 0, TAU); g.fill(); }
    grain(g, w, h, 1107, .04);
  });

  // ======================== PARCHMENT MAP ========================
  VP.set('sz_map', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#d8c8a0'], [1, '#c8b488']]);
    S.dabs(g, { x: 0, y: 0, w, h, n: 400, cols: ['#a8946a', '#e8dcb8', '#b8a478'], r0: 10, r1: 60, a0: .05, a1: .18, seed: 1201 });
    g.fillStyle = S.rgba('#6a8aa0', .35); g.fillRect(0, 0, w, h);
    land(g, EUR, '#d4b880', 1203); land(g, AFR, '#d8b878', 1205); land(g, ASIA, '#d0b07a', 1207);
    // the Nile
    g.strokeStyle = '#3a6a8a'; g.lineWidth = 3; g.beginPath(); [[31,31.4],[31.2,30],[31.3,27],[32.8,24],[32.6,22],[31,20],[32.5,15.6],[33,12]].forEach(([a, b], i) => { const [x, y] = ll(a, b); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke();
    g.fillStyle = '#3a2a1a'; g.textAlign = 'center';
    const lab = (t, a, b, px, it) => { const [x, y] = ll(a, b); g.font = `${it ? 'italic ' : ''}${px}px Oswald`; g.fillStyle = it ? S.rgba('#1e3a5a', .75) : S.rgba('#3a2a1a', .8); g.fillText(t, x, y); };
    lab('EUROPE', 15, 50, 30); lab('AFRICA', 18, 8, 40); lab('ARABIA', 46, 23, 26); lab('MEDITERRANEAN SEA', 17, 34.6, 18, 1); lab('RED SEA', 38.6, 19.5, 15, 1); lab('INDIAN OCEAN', 58, 2, 22, 1); lab('ATLANTIC OCEAN', -12, 15, 22, 1); lab('EGYPT', 29, 26, 16);
    g.textAlign = 'left';
    // compass rose and border
    const [cx, cy] = [1180, 640]; g.strokeStyle = '#5a3a1e'; g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, 34, 0, TAU); g.stroke(); g.fillStyle = '#7a2a1e'; g.beginPath(); g.moveTo(cx, cy - 44); g.lineTo(cx + 8, cy); g.lineTo(cx, cy + 44); g.lineTo(cx - 8, cy); g.fill(); g.font = '16px Oswald'; g.fillText('N', cx - 5, cy - 50);
    g.strokeStyle = '#5a3a1e'; g.lineWidth = 6; g.strokeRect(10, 10, w - 20, h - 20); g.lineWidth = 1.5; g.strokeRect(20, 20, w - 40, h - 40);
    grain(g, w, h, 1209, .05);
  });

  // ======================== DUNES WITH A FLAT PLACE FOR THE STONE ========================
  VP.set('sz_dunes', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#e0a868'], [.35, '#f0d0a0'], [.55, '#f4e0bc'], [1, '#d8a868']]);
    S.glow(g, 260, 300, 380, '#fff0c8', .5);
    ridge(g, w, h, 330, 70, 160, 1300, '#b88a70'); ridge(g, w, h, 345, 40, 120, 1299, '#c8987a');
    dunes(g, w, h, 360, ['#e0b680', '#d4a46c', '#c8945c'], 1301);
    sand(g, 470, w, h, '#d8aa70', '#b4824c', 1303);
    for (let k = 0; k < 30; k++) { const r = S.rng(1340 + k), y = 480 + r() * 240; g.strokeStyle = S.rgba('#8a6036', .25); g.lineWidth = 2; g.beginPath(); g.moveTo(r() * w - 100, y); g.bezierCurveTo(r() * w, y - 8, r() * w, y + 8, r() * w + 200, y); g.stroke(); }
    for (let k = 0; k < 12; k++) { const r = S.rng(1310 + k), x = r() * w, y = 500 + r() * 210, s = 8 + r() * 22; g.fillStyle = '#7a5a3e'; g.beginPath(); g.moveTo(x - s, y); g.quadraticCurveTo(x - s * .6, y - s * .9, x + s * .2, y - s * .7); g.quadraticCurveTo(x + s, y - s * .3, x + s, y); g.fill(); g.fillStyle = S.rgba('#f0d0a0', .4); g.beginPath(); g.ellipse(x - s * .2, y - s * .6, s * .4, s * .15, -.3, 0, TAU); g.fill(); g.fillStyle = S.rgba('#5a3a1e', .35); g.beginPath(); g.ellipse(x + s * .8, y + 2, s * 1.2, s * .2, 0, 0, TAU); g.fill(); }
    for (let k = 0; k < 10; k++) { const r = S.rng(1360 + k), x = r() * w, y = 480 + r() * 220; for (let j = 0; j < 7; j++) { g.strokeStyle = '#6a6a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (j - 3) * 4, y - 10 - r() * 10); g.stroke(); } }
    grain(g, w, h, 1305, .04);
  });

  // ======================== NILE DELTA FIELDS ========================
  VP.set('sz_delta', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8ab8d8'], [.5, '#e8e0c0'], [1, '#c8b880']]);
    ridge(g, w, h, 300, 18, 300, 1401, '#b8a878');
    // river band
    g.fillStyle = '#4a8aa0'; g.beginPath(); g.moveTo(0, 360); g.bezierCurveTo(400, 340, 700, 420, w, 380); g.lineTo(w, 440); g.bezierCurveTo(700, 480, 400, 400, 0, 420); g.fill();
    g.save(); g.clip(); water(g, 0, 330, w, 160, '#5a9ab0', '#2a6a84', 1403); g.restore();
    // green fields in strips
    for (let i = 0; i < 9; i++) { const y = 440 + i * 32; g.fillStyle = ['#7aa04a', '#94b45a', '#6a9040', '#a8b860'][i % 4]; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + 30 - i * 4); g.lineTo(w, y + 64); g.lineTo(0, y + 34); g.fill();
      S.strokes(g, { x: 0, y, w, h: 34, n: 120, cols: ['#4a7030', '#c0d080'], l0: 6, l1: 18, ang: -1.4, jit: .2, w0: 1, w1: 2, a0: .2, a1: .45, seed: 1405 + i }); }
    g.fillStyle = '#8ab050'; g.fillRect(0, 300, w, 46); S.strokes(g, { x: 0, y: 300, w, h: 46, n: 160, cols: ['#5a8030', '#c8d890'], l0: 4, l1: 12, ang: -1.5, jit: .3, w0: 1, w1: 2, a0: .2, a1: .4, seed: 1415 });
    [[120, 330, .8], [260, 320, .6], [980, 318, .7], [1160, 330, .9], [60, 640, 1.4], [1220, 660, 1.3]].forEach(([x, y, s], k) => palm(g, x, y, s, 1420 + k));
    grain(g, w, h, 1430, .04);
  });

  // ======================== THE DIGGING TRENCH ========================
  VP.set('sz_trench', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#f4e4c0'], [.3, '#f8ecd0'], [1, '#d8a868']]);
    S.glow(g, 640, 60, 520, '#ffffff', .5);
    dunes(g, w, h, 230, ['#e8c490', '#dcb07a'], 1501);
    // far bank top at y 300, trench floor 470-560, near bank rises to 720
    g.fillStyle = '#c89a62'; g.beginPath(); g.moveTo(0, 300); g.lineTo(w, 290); g.lineTo(w, 470); g.lineTo(0, 480); g.fill();
    S.strokes(g, { x: 0, y: 300, w, h: 170, n: 400, cols: ['#a87a48', '#e0bc84', '#8a6236'], l0: 10, l1: 40, ang: 1.45, jit: .3, w0: 1, w1: 3, a0: .15, a1: .4, seed: 1503 });
    g.fillStyle = '#b8884e'; g.fillRect(0, 470, w, 120); S.dabs(g, { x: 0, y: 470, w, h: 120, n: 300, cols: ['#8a6236', '#d8b07a'], r0: 3, r1: 12, sq: .4, a0: .2, a1: .4, seed: 1505 });
    // a strip of murky water in the trench bottom
    g.fillStyle = S.rgba('#6a7a6a', .55); g.fillRect(0, 548, w, 16);
    sand(g, 590, w, h, '#d0a066', '#a87a48', 1507);
    // spoil heaps on the far bank
    for (let k = 0; k < 6; k++) { const x = 80 + k * 220; g.fillStyle = '#d8b07a'; g.beginPath(); g.moveTo(x - 90, 302); g.quadraticCurveTo(x, 240, x + 90, 300); g.fill(); }
    // earth ramps cut into the far wall, wooden shade poles with cloth, piles of baskets and copper picks
    for (const x of [260, 900]) { g.fillStyle = '#b8884e'; g.beginPath(); g.moveTo(x, 470); g.lineTo(x + 60, 470); g.lineTo(x + 180, 302); g.lineTo(x + 130, 302); g.fill(); for (let k = 0; k < 8; k++) { g.fillStyle = S.rgba('#6a4a2a', .4); g.fillRect(x + 20 + k * 18, 450 - k * 21, 34, 3); } }
    for (const x of [120, 600, 1080]) { g.strokeStyle = '#5a3a1e'; g.lineWidth = 5; g.beginPath(); g.moveTo(x, 302); g.lineTo(x, 220); g.moveTo(x + 120, 300); g.lineTo(x + 120, 224); g.stroke(); g.fillStyle = '#e8dcc0'; g.beginPath(); g.moveTo(x - 10, 220); g.quadraticCurveTo(x + 60, 236, x + 130, 224); g.lineTo(x + 126, 236); g.quadraticCurveTo(x + 60, 248, x - 6, 232); g.fill(); }
    for (let k = 0; k < 9; k++) { const x = 40 + k * 140 + (k % 2) * 30, y = 690 - (k % 3) * 12; g.fillStyle = '#a8864a'; g.beginPath(); g.moveTo(x - 22, y - 26); g.lineTo(x + 22, y - 26); g.lineTo(x + 16, y); g.lineTo(x - 16, y); g.fill(); g.strokeStyle = S.rgba('#5a3a1e', .5); g.lineWidth = 1.5; for (let j = 0; j < 4; j++) { g.beginPath(); g.moveTo(x - 20 + j * 2, y - 20 + j * 6); g.lineTo(x + 20 - j * 2, y - 20 + j * 6); g.stroke(); } }
    for (let k = 0; k < 4; k++) { const x = 180 + k * 300, y = 700; g.strokeStyle = '#5a3a1e'; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 40, y - 30); g.stroke(); g.strokeStyle = '#b86a3a'; g.lineWidth = 5; g.beginPath(); g.moveTo(x + 30, y - 40); g.quadraticCurveTo(x + 46, y - 30, x + 58, y - 18); g.stroke(); }
    for (let k = 0; k < 5; k++) { const x = 340 + k * 210; g.fillStyle = '#b86a3a'; g.beginPath(); g.ellipse(x, 690, 14, 18, 0, 0, TAU); g.fill(); g.fillStyle = '#8a4a28'; g.fillRect(x - 6, 668, 12, 6); }
    grain(g, w, h, 1509, .05);
  });

  // ======================== DARK TEMPLE ========================
  VP.set('sz_temple', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#1e1610'], [1, '#3a2a1c']]);
    for (const x of [140, 420, 860, 1140]) { const gr = g.createLinearGradient(x - 60, 0, x + 60, 0); gr.addColorStop(0, '#3a2c1e'); gr.addColorStop(.5, '#7a6040'); gr.addColorStop(1, '#2a1e14'); g.fillStyle = gr; g.fillRect(x - 60, 0, 120, 560);
      for (let y = 40; y < 540; y += 60) { g.fillStyle = S.rgba('#c89a5a', .25); g.fillRect(x - 40, y, 80, 3); } g.fillStyle = S.rgba('#d8a860', .3); for (let k = 0; k < 6; k++) { g.fillRect(x - 30 + (k % 3) * 22, 120 + Math.floor(k / 3) * 160, 12, 30); } }
    g.fillStyle = '#4a3a2a'; g.fillRect(500, 120, 280, 330); g.fillStyle = '#2a1e14'; g.fillRect(520, 140, 240, 310);
    g.fillStyle = S.rgba('#c8a060', .5); g.font = '40px serif'; for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) g.fillText(['𓂀', '𓆣', '𓋹', '𓇳'][(r + k) % 4], 540 + k * 56, 200 + r * 70);
    for (const x of [280, 1000]) { g.fillStyle = '#6a5034'; g.fillRect(x - 50, 330, 100, 230); g.fillStyle = '#8a6a44'; g.beginPath(); g.ellipse(x, 260, 44, 60, 0, 0, TAU); g.fill(); g.fillStyle = '#2a4a6a'; g.fillRect(x - 46, 240, 92, 18); g.fillStyle = '#c8a050'; g.fillRect(x - 46, 256, 92, 6); g.fillStyle = '#7a5a3a'; g.fillRect(x - 40, 310, 80, 30); }
    for (const x of [200, 1080]) { g.fillStyle = '#3a2a1a'; g.fillRect(x - 5, 360, 10, 90); g.fillStyle = '#6a4a2a'; g.fillRect(x - 14, 352, 28, 12); S.glow(g, x, 330, 140, '#ffa040', .5); }
    g.fillStyle = '#5a4430'; g.fillRect(0, 560, w, 160); S.dabs(g, { x: 0, y: 560, w, h: 160, n: 200, cols: ['#3a2a1c', '#7a6040'], r0: 4, r1: 16, sq: .4, a0: .2, a1: .4, seed: 1601 });
    grain(g, w, h, 1603, .05);
  });

  // ======================== ANCIENT CANAL (Darius, Ptolemy, Rome) ========================
  VP.set('sz_oldcanal', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#9ac0dc'], [.45, '#f0e4c4'], [1, '#d8b47a']]);
    dunes(g, w, h, 280, ['#dcb680', '#d0a46c'], 1701);
    g.fillStyle = '#c8a06a'; g.fillRect(0, 330, w, 60);
    [[90, 360, .7], [300, 352, .55], [1120, 356, .65]].forEach(([x, y, s], k) => palm(g, x, y, s, 1710 + k));
    for (const [x, bw, bh] of [[520, 120, 60], [650, 80, 46], [760, 140, 70]]) { g.fillStyle = '#b8946a'; g.fillRect(x, 340 - bh, bw, bh); g.fillStyle = '#8a6a48'; g.fillRect(x, 340 - bh, bw, 6); g.fillStyle = '#3a2a1a'; g.fillRect(x + bw * .4, 340 - bh * .55, bw * .16, bh * .55); for (let k = 0; k < 4; k++) { g.fillStyle = S.rgba('#6a4a2a', .3); g.fillRect(x, 340 - bh + 14 + k * 12, bw, 1); } }
    g.fillStyle = '#a07a4a'; g.fillRect(0, 380, w, 14);
    g.fillStyle = '#3a7a90'; g.fillRect(0, 394, w, 150); water(g, 0, 394, w, 150, '#5a9ab0', '#2a5a72', 1703);
    for (let k = 0; k < 60; k++) { const r = S.rng(1720 + k), x = r() * w, y = k % 2 ? 396 : 548; g.strokeStyle = k % 3 ? '#5a7a3a' : '#7a9a4a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 4, y - 20, x + 8 + r() * 6, y - 34 - r() * 16); g.stroke(); }
    g.fillStyle = '#a07a4a'; g.fillRect(0, 544, w, 14); g.fillStyle = '#8a8070'; for (let x = 420; x < 860; x += 40) { g.fillRect(x, 540, 38, 20); g.strokeStyle = S.rgba('#3a3028', .5); g.lineWidth = 1; g.strokeRect(x, 540, 38, 20); }
    sand(g, 558, w, h, '#d8b07a', '#b08250', 1705);
    grain(g, w, h, 1707, .04);
  });
})(window);
