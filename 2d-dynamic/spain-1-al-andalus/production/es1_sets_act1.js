// Spain 1, act 1 (Seven Thousand Men): extra sets, maps and headwear.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { crisp, ridge, cypress, tower, town, arch, P } = X;
  const sky = (g, w, h, stops) => { const gr = g.createLinearGradient(0, 0, 0, h); stops.forEach(([q, col]) => gr.addColorStop(q, col)); g.fillStyle = gr; g.fillRect(0, 0, w, h); };
  const hill = (g, y0, amp, k, seed, col, dab, w, h) => { const top = x => y0 - amp * S.fbm(x / k, seed); g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 6) g.lineTo(x, top(x)); g.lineTo(w, h); g.closePath(); g.fill();
    if (dab) S.dabs(g, { x: 0, y: y0 - amp, w, h: amp + 120, n: 500, cols: dab, r0: 8, r1: 26, sq: .5, a0: .12, a1: .3, seed: seed + 1, mask: (x, y) => y > top(x) + 3 }); return top; };
  X.hill = hill; X.sky = sky;

  // ---------- headwear ----------
  X.crown = (c, u, f, Lt, k) => { const g = k.tone({ base: '#e8b84a', shade: '#8a6420', rim: '#fff2c0' }, Lt);
    const pts = k.front ? [[-.6, -.5], [-.62, -.98], [-.42, -.8], [-.2, -1.08], [0, -.84], [.2, -1.08], [.42, -.8], [.62, -.98], [.6, -.5]] : [[-.55, -.46], [-.58, -.92], [-.36, -.76], [-.1, -1.04], [.08, -.8], [.3, -1.02], [.46, -.74], [.62, -.88], [.6, -.44]];
    k.celT(c, S.poly(pts.map(q => [q[0] * u, q[1] * u]), false), g, Lt, u, { swk: .5 });
    for (const [x, col] of [[-.3, '#b02a2a'], [.05, '#2a6ab0'], [.38, '#2a8a4a']]) { c.fillStyle = col; c.beginPath(); c.arc(x * u, -.6 * u, .06 * u, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc((x - .02) * u, -.62 * u, .02 * u, 0, TAU); c.fill(); } };
  X.mitre = (c, u, f, Lt, k) => { const w = k.tone({ base: '#f2ead6', shade: '#a89c80', rim: '#ffffff' }, Lt);
    k.celT(c, S.poly([[-.56 * u, -.42 * u], [-.5 * u, -1.0 * u], [0, -1.55 * u], [.5 * u, -1.0 * u], [.56 * u, -.42 * u]], false), w, Lt, u, { swk: .5 });
    c.fillStyle = '#c8962a'; c.fillRect(-.06 * u, -1.45 * u, .12 * u, 1.0 * u); c.fillRect(-.56 * u, -.56 * u, 1.12 * u, .12 * u); };
  X.spangen = (c, u, f, Lt, k) => { const st = k.tone({ base: '#8a9096', shade: '#3e444a', rim: '#e8eef2' }, Lt);
    k.celT(c, S.poly([[-.62 * u, -.36 * u], [-.58 * u, -.7 * u], [-.2 * u, -1.1 * u], [0, -1.22 * u], [.2 * u, -1.1 * u], [.58 * u, -.7 * u], [.62 * u, -.36 * u]]), st, Lt, u, { swk: .6 });
    c.fillStyle = '#7a5a2a'; c.fillRect(-.62 * u, -.44 * u, 1.24 * u, .1 * u); const nx = k.front ? 0 : .42; c.fillStyle = st.base; c.fillRect((nx - .04) * u, -.4 * u, .08 * u, .34 * u); };
  X.hood = col => (c, u, f, Lt, k) => { const t = k.tone(col, Lt); k.celT(c, S.poly([[-.72 * u, .1 * u], [-.74 * u, -.6 * u], [-.3 * u, -1.0 * u], [.3 * u, -1.0 * u], [.68 * u, -.62 * u], [.6 * u, -.3 * u], [.2 * u, -.5 * u], [-.4 * u, -.4 * u], [-.5 * u, .2 * u]]), t, Lt, u, { swk: .7 }); };

  // ---------- map projections ----------
  const mkLL = (lon0, lon1, lat0, lat1, x0 = 60, x1 = 1220, y0 = 50, y1 = 670) => (lon, lat) => [x0 + (lon - lon0) / (lon1 - lon0) * (x1 - x0), y0 + (lat1 - lat) / (lat1 - lat0) * (y1 - y0)];
  const parchment = (g, w, h, seed) => {
    g.fillStyle = '#2a1a10'; g.fillRect(0, 0, w, h);
    const pp = S.poly([[60, 40], [640, 22], [1222, 44], [1250, 360], [1226, 684], [640, 700], [52, 680], [34, 360]]);
    const pg = g.createLinearGradient(0, 0, w, h); pg.addColorStop(0, '#ecd9ac'); pg.addColorStop(1, '#d8bd88'); g.fillStyle = pg; g.fill(pp);
    return pp;
  };
  const landFill = (g, p, w, h, seed) => { g.fillStyle = '#e2c890'; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 500, cols: ['#c8a868', '#f0dca8', '#a88a54'], r0: 8, r1: 40, sq: .5, a0: .1, a1: .25, seed }); g.restore(); };
  const seaFill = (g, p, w, h, seed) => { g.fillStyle = '#93b2ac'; g.fill(p); g.save(); g.clip(p); S.strokes(g, { x: 0, y: 0, w, h, n: 700, cols: ['#5a8a8c', '#b4d0c8'], l0: 10, l1: 30, ang: 0, jit: .15, w0: 1, w1: 3, a0: .1, a1: .25, seed }); g.restore(); g.strokeStyle = '#6a4a2a'; g.lineWidth = 2; g.stroke(p); g.strokeStyle = S.rgba('#4a7a7a', .3); g.lineWidth = 7; g.stroke(p); };

  // the wide world map: Atlantic to Arabia
  const LW = mkLL(-12, 50, 12, 48); X.LW = LW;
  const MED = [[-5.6, 36.0], [-2, 36.7], [0, 38.8], [0.5, 40.5], [3.2, 42.3], [4.5, 43.4], [7.5, 43.8], [9, 44.4], [10.5, 43], [12.2, 41.8], [15.6, 40.1], [16, 38], [17, 39], [18.5, 40.2], [16, 41.5], [13.5, 43.6], [12.3, 45.4], [13.7, 45.6], [15, 44.5], [17.5, 43], [19.5, 41.8], [19.4, 40.4], [21, 38.5], [22.5, 36.5], [23.5, 38], [22.9, 40.6], [26, 40.8], [26.5, 40.2], [26.2, 39.4], [27, 37.8], [28.2, 36.7], [30.6, 36.8], [32.5, 36.2], [34.5, 36.8], [36, 36.6], [35.8, 35.4], [35.5, 33.9], [34.9, 32.4], [34.3, 31.3], [32.3, 31.2], [30, 31.4], [28, 30.9], [25, 31.6], [23, 32.6], [20, 32], [19.5, 30.5], [18.5, 30.4], [15.5, 32.2], [13, 32.9], [11.1, 33.2], [10.1, 34.3], [11, 35.8], [10.3, 37.2], [8.6, 36.9], [5, 36.8], [2, 36.6], [0, 35.8], [-2, 35.1], [-5.3, 35.9]];
  const BLACK = [[28, 41.5], [29, 41.2], [31, 41.1], [33, 42], [36, 41.7], [38, 40.9], [41.5, 41.5], [41.6, 42.6], [39.7, 43.4], [37.5, 44.7], [36, 45.3], [33.5, 44.5], [32.5, 45.4], [30.7, 46.5], [29.6, 45.3], [28.6, 44.2], [27.9, 42.7]];
  const RED = [[32.5, 30], [33.5, 28], [35.5, 24], [38.5, 18], [42.5, 13], [43.4, 12.6], [43.2, 13.6], [41, 17.5], [39.2, 21.5], [37, 24.5], [35, 28], [34.9, 29.5]];
  const GULF = [[47.9, 30], [50.5, 29.2], [50.5, 26.5], [49.5, 27], [48.2, 28.6]];
  const ATL = [[-12.5, 48.5], [-4.5, 48.5], [-1.2, 46], [-1.4, 43.5], [-8, 43.7], [-9.3, 43], [-8.8, 42], [-8.7, 40.7], [-9.4, 38.7], [-8.9, 37], [-7, 37.2], [-6.2, 36.6], [-5.6, 36.0], [-5.9, 35.8], [-6.8, 34], [-9.6, 30.4], [-12.5, 27.5]];
  const CASP = [[47, 45.5], [49, 46.6], [51, 45], [50.5, 42], [50.5, 40], [49.5, 40.3], [48, 42.5], [47.4, 43.2]];
  X.MED = MED;
  VP.set('mapwide', 1280, 720, (g, w, h) => {
    const pp = parchment(g, w, h); g.save(); g.clip(pp);
    landFill(g, pp, w, h, 201);
    for (const [L, sd] of [[MED, 203], [BLACK, 205], [RED, 207], [GULF, 209], [ATL, 211], [CASP, 213]]) seaFill(g, S.poly(L.map(q => LW(q[0], q[1])), false), w, h, sd);
    // desert stipple across the Sahara and Arabia
    for (let i = 0; i < 260; i++) { const r = S.rng(i + 500), lon = -8 + r() * 58, lat = 14 + r() * 16; if (lon > 32 && lon < 36 && lat > 22) continue; const [x, y] = LW(lon, lat); g.fillStyle = S.rgba('#a8804a', .35); g.beginPath(); g.arc(x, y, 1.5, 0, TAU); g.fill(); }
    // Nile
    g.strokeStyle = S.rgba('#4a7a8a', .7); g.lineWidth = 2; g.beginPath(); [[31.2, 30.5], [31.3, 27], [32.8, 24], [32.6, 20], [33, 15], [33, 12]].forEach((q, i) => { const [x, y] = LW(q[0], q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke();
    g.restore(); g.strokeStyle = '#7a5a34'; g.lineWidth = 3; g.stroke(pp);
  });
  // France-and-Iberia map for the push to Tours
  const LF = mkLL(-10.5, 9, 35, 49.5); X.LF = LF;
  const EU = [[-1.8, 43.4], [-1.25, 44.6], [-1.2, 46.2], [-2.2, 47.2], [-4.5, 47.9], [-4.7, 48.6], [-3, 48.8], [-1.6, 48.7], [-1.4, 49.7], [0.2, 49.6], [9.5, 49.8], [9.5, 44.2], [8.8, 44.4], [7.5, 43.8], [6, 43.1], [4.5, 43.4], [3.1, 43.1], [3.2, 42.3], [3.0, 41.9], [2.2, 41.4], [1.0, 41.1], [0.2, 40.2], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3], [-2.1, 36.7], [-3.5, 36.7], [-4.4, 36.7], [-5.0, 36.4], [-5.6, 36.0], [-6.0, 36.3], [-6.4, 36.8], [-7.0, 37.2], [-7.9, 37.0], [-8.9, 37.0], [-8.8, 38.0], [-9.4, 38.7], [-9.0, 39.6], [-8.7, 40.7], [-8.8, 42.0], [-9.3, 43.0], [-8.0, 43.7], [-5.8, 43.6], [-3.8, 43.45]];
  const AF2 = [[-11, 33], [-6.6, 33.9], [-6.2, 35.5], [-5.9, 35.8], [-5.3, 35.9], [-4.5, 35.2], [-3.0, 35.3], [-2.0, 35.1], [-1.0, 35.6], [0.5, 35.9], [2.0, 36.5], [5, 36.8], [8.6, 36.9], [9.5, 37], [9.5, 33]];
  X.EU = EU;
  VP.set('mapfr', 1280, 720, (g, w, h) => {
    const pp = parchment(g, w, h); g.save(); g.clip(pp);
    seaFill(g, pp, w, h, 221); g.lineWidth = 0;
    for (const [L, sd] of [[EU, 223], [AF2, 225]]) { const p = S.poly(L.map(q => LF(q[0], q[1])), false); landFill(g, p, w, h, sd); g.strokeStyle = '#6a4a2a'; g.lineWidth = 2.4; g.stroke(p); }
    // the Pyrenees
    g.strokeStyle = S.rgba('#6a4a2a', .8); g.lineWidth = 1.6; for (let i = 0; i < 14; i++) { const [x, y] = LF(-1.6 + i * .34, 42.75 + Math.sin(i) * .15); g.beginPath(); g.moveTo(x - 8, y + 5); g.lineTo(x, y - 8); g.lineTo(x + 8, y + 5); g.stroke(); }
    // Loire
    g.strokeStyle = S.rgba('#4a7a8a', .7); g.lineWidth = 2; g.beginPath(); [[-2.2, 47.25], [-0.5, 47.4], [0.7, 47.4], [1.9, 47.9], [2.9, 47.4], [3.9, 46.5]].forEach((q, i) => { const [x, y] = LF(q[0], q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke();
    g.restore(); g.strokeStyle = '#7a5a34'; g.lineWidth = 3; g.stroke(pp);
  });

  // ======================== TOLEDO on its rock above the Tagus ========================
  VP.set('toledo', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a7aa8'], [.45, '#c8d0d0'], [.7, '#f0d8a8'], [1, '#e0b47a']]);
    S.dabs(g, { x: 0, y: 30, w, h: 260, n: 400, cols: ['#ffffff', '#e8eef0', '#c8d4dc'], r0: 30, r1: 120, sq: .18, ang: -.05, jit: .1, a0: .05, a1: .14, seed: 301 });
    hill(g, 360, 60, 220, 303, '#8a9aa0', ['#a8b4b4', '#6a7a80'], w, h);
    hill(g, 400, 50, 160, 305, '#9a8a6a', ['#b8a07a', '#6a5a40', '#7a8a50'], w, h);
    // the rock and the city on top
    g.fillStyle = '#a07a52'; g.beginPath(); g.moveTo(180, 620); g.bezierCurveTo(220, 420, 380, 330, 640, 320); g.bezierCurveTo(900, 330, 1040, 420, 1100, 620); g.closePath(); g.fill();
    S.dabs(g, { x: 180, y: 320, w: 920, h: 300, n: 700, cols: ['#c8986a', '#6a4a30', '#b88a5a', '#8a9a5a'], r0: 6, r1: 20, sq: .5, ang: .4, a0: .2, a1: .5, seed: 307, mask: (x, y) => y > 330 + Math.abs(x - 640) * .35 });
    S.strokes(g, { x: 180, y: 340, w: 920, h: 280, n: 700, cols: ['#e0b080', '#5a3a24'], l0: 8, l1: 20, ang: 1.2, jit: .5, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 309, mask: (x, y) => y > 340 + Math.abs(x - 640) * .35 });
    town(g, { x: 300, y: 300, w: 680, h: 90, n: 220, seed: 311, scale: .9, wall: '#e8d0a4', wall2: '#c8a070', shade: '#7a5a42', roof: '#b8603e', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: (x, y) => y > 300 + Math.pow(Math.abs(x - 640) / 340, 2) * 80 });
    // the palace-fortress and the church
    g.fillStyle = '#d8b88a'; g.fillRect(560, 210, 170, 110); g.fillStyle = '#a8845a'; g.fillRect(660, 210, 70, 110); for (const x of [560, 714]) { g.fillStyle = '#d8b88a'; g.fillRect(x - 4, 180, 24, 140); g.fillStyle = '#7a5a3a'; g.beginPath(); g.moveTo(x - 6, 182); g.lineTo(x + 8, 160); g.lineTo(x + 22, 182); g.fill(); }
    for (let i = 0; i < 8; i++) { g.fillStyle = '#d8b88a'; g.fillRect(562 + i * 21, 202, 11, 9); }
    tower(g, 470, 330, 40, 130, '#e8d4b0', '#a88a64', '#fff4dc');
    // river gorge curling around the foot of the rock
    g.fillStyle = '#6a5038'; g.beginPath(); g.moveTo(0, 600); g.bezierCurveTo(300, 640, 500, 680, 640, 660); g.bezierCurveTo(820, 640, 1000, 600, w, 620); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
    g.fillStyle = '#4a7a7a'; g.beginPath(); g.moveTo(0, 640); g.bezierCurveTo(300, 668, 500, 702, 640, 690); g.bezierCurveTo(820, 676, 1000, 640, w, 650); g.lineTo(w, 676); g.bezierCurveTo(1000, 668, 820, 708, 640, 718); g.bezierCurveTo(480, 730, 300, 700, 0, 672); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 640, w, h: 80, n: 300, cols: ['#a8d0c8', '#2a5a5a'], l0: 10, l1: 30, ang: .05, jit: .1, w0: 1, w1: 2, a0: .3, a1: .6, seed: 313, mask: (x, y) => y > 646 + Math.sin(x / 400) * 20 });
    // the old bridge
    g.fillStyle = '#c8a87a'; g.fillRect(840, 618, 200, 22); for (let i = 0; i < 3; i++) { g.fillStyle = '#3a2a1a'; g.fill(arch(880 + i * 60, 668, 44, 46)); }
    for (let i = 0; i < 12; i++) cypress(g, 200 + i * 80 + (i % 3) * 20, 610 + (i % 2) * 10, 40 + (i % 3) * 12, '#3a4a2a', '#d8b070');
  });

  // ======================== THE HALL with the empty throne ========================
  VP.HALL_TORCHES = [[180, 250], [500, 230], [780, 230], [1100, 250]];
  VP.set('hall', 1280, 720, (g, w, h) => {
    g.fillStyle = '#4a3a30'; g.fillRect(0, 0, w, h);
    // stone blocks
    for (let y = 0; y < 560; y += 34) for (let x = (y / 34 % 2) * 40; x < w; x += 80) { g.fillStyle = S.mix('#5a4a3e', '#3a2c24', S.rng(x * 3 + y)()); g.fillRect(x + 2, y + 2, 76, 30); }
    // horseshoe arches (Visigothic)
    for (const x of [340, 940]) { g.fillStyle = '#1e140e'; g.fill(arch(x, 560, 200, 330)); g.lineWidth = 14; g.strokeStyle = '#8a7058'; g.stroke(arch(x, 560, 220, 344)); }
    // dais and the empty throne
    g.fillStyle = '#5a4434'; g.fillRect(520, 470, 240, 24); g.fillRect(500, 494, 280, 30);
    g.fillStyle = '#6a3a22'; g.fillRect(590, 300, 100, 176); g.fillStyle = '#8a2a22'; g.fillRect(604, 330, 72, 120); g.fillStyle = '#c8962a'; g.fillRect(586, 292, 108, 14); for (const x of [592, 688]) { g.beginPath(); g.arc(x, 290, 9, 0, TAU); g.fill(); }
    // banners with the Visigothic cross
    for (const x of [200, 1080]) { g.fillStyle = '#7a1e1a'; g.beginPath(); g.moveTo(x - 50, 60); g.lineTo(x + 50, 60); g.lineTo(x + 50, 300); g.lineTo(x, 270); g.lineTo(x - 50, 300); g.fill(); g.fillStyle = '#d8b04a'; g.fillRect(x - 6, 100, 12, 120); g.fillRect(x - 34, 130, 68, 12); }
    // floor
    const fl = g.createLinearGradient(0, 520, 0, h); fl.addColorStop(0, '#5a4636'); fl.addColorStop(1, '#2e221a'); g.fillStyle = fl; g.fillRect(0, 520, w, h - 520);
    S.strokes(g, { x: 0, y: 520, w, h: 200, n: 600, cols: ['#7a6450', '#2a1e16'], l0: 10, l1: 30, ang: 0, jit: .2, w0: 1, w1: 3, a0: .2, a1: .4, seed: 321 });
    // the long table
    g.fillStyle = '#4a2a18'; g.fillRect(260, 588, 760, 26); g.fillStyle = '#2a1810'; g.fillRect(290, 614, 16, 90); g.fillRect(974, 614, 16, 90);
    g.fillStyle = S.rgba('#ffd8a0', .25); g.fillRect(260, 588, 760, 4);
    // torch brackets
    for (const [x, y] of VP.HALL_TORCHES) { g.fillStyle = '#2a1a10'; g.fillRect(x - 4, y, 8, 40); g.fillStyle = '#4a3020'; g.beginPath(); g.moveTo(x - 10, y); g.lineTo(x + 10, y); g.lineTo(x + 5, y + 14); g.lineTo(x - 5, y + 14); g.fill(); }
  });

  // ======================== THE CHURCH: a dim nave, one shaft of light ========================
  VP.set('church', 1280, 720, (g, w, h) => {
    g.fillStyle = '#2e2420'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < 600; y += 30) for (let x = (y / 30 % 2) * 36; x < w; x += 72) { g.fillStyle = S.mix('#4a3c34', '#2a201a', S.rng(x * 5 + y + 1)()); g.fillRect(x + 2, y + 2, 68, 26); }
    // columns
    for (const x of [140, 380, 900, 1140]) { g.fillStyle = '#5a4a3e'; g.fillRect(x - 30, 120, 60, 520); g.fillStyle = S.rgba('#c8a070', .25); g.fillRect(x - 30, 120, 10, 520); g.fillStyle = '#6a5848'; g.fillRect(x - 40, 110, 80, 20); }
    // apse with the altar
    g.fillStyle = '#1e1612'; g.fill(arch(640, 600, 360, 480));
    g.fillStyle = '#c8a070'; g.fillRect(560, 470, 160, 70); g.fillStyle = '#f2e6c8'; g.fillRect(552, 462, 176, 12);
    g.fillStyle = '#d8b04a'; g.fillRect(634, 330, 12, 120); g.fillRect(604, 360, 72, 10);
    // high window
    g.fillStyle = '#e8d8b0'; g.fill(arch(250, 150, 50, 90));
    g.fillStyle = '#3a2c24'; g.fillRect(0, 600, w, 120);
    S.strokes(g, { x: 0, y: 600, w, h: 120, n: 400, cols: ['#5a4838', '#1a120c'], l0: 10, l1: 30, ang: 0, jit: .2, w0: 1, w1: 3, a0: .2, a1: .4, seed: 331 });
  });

  // ======================== MUSA'S TENT ========================
  VP.set('tent', 1280, 720, (g, w, h) => {
    const cv = g.createLinearGradient(0, 0, 0, h); cv.addColorStop(0, '#8a5a34'); cv.addColorStop(1, '#5a3a22'); g.fillStyle = cv; g.fillRect(0, 0, w, h);
    // canvas panels and stripes
    for (let i = 0; i < 9; i++) { const x = i * 150 - 20; g.fillStyle = i % 2 ? S.rgba('#c89060', .25) : S.rgba('#3a2010', .15); g.beginPath(); g.moveTo(640, -40); g.lineTo(x, 560); g.lineTo(x + 150, 560); g.closePath(); g.fill(); }
    g.strokeStyle = S.rgba('#2a1408', .4); g.lineWidth = 2; for (let i = 0; i < 10; i++) { g.beginPath(); g.moveTo(640, -40); g.lineTo(i * 150 - 20, 560); g.stroke(); }
    // the open flap on the right with bright day outside
    g.fillStyle = '#f4e0b0'; g.beginPath(); g.moveTo(1010, 560); g.lineTo(1060, 180); g.lineTo(1170, 180); g.lineTo(1220, 560); g.closePath(); g.fill();
    S.dabs(g, { x: 1010, y: 180, w: 210, h: 380, n: 60, cols: ['#ffffff', '#e8c890', '#b0c8d0'], r0: 10, r1: 40, sq: .5, a0: .1, a1: .3, seed: 341 });
    g.fillStyle = '#d8b07a'; g.fillRect(1010, 480, 210, 80);
    // carpets
    g.fillStyle = '#7a1e1a'; g.fillRect(0, 560, w, h - 560); for (let i = 0; i < 40; i++) { g.fillStyle = ['#d8a040', '#2a3a6a', '#f0e0c0'][i % 3]; g.fillRect(i * 32 + 6, 590, 14, 6); g.fillRect(i * 32 + 14, 690, 14, 6); }
    // low table with the map
    g.fillStyle = '#4a2a14'; g.fillRect(400, 560, 420, 20); g.fillRect(420, 580, 14, 50); g.fillRect(786, 580, 14, 50);
    g.fillStyle = '#ecd8a8'; g.beginPath(); g.moveTo(430, 562); g.lineTo(790, 562); g.lineTo(780, 548); g.lineTo(440, 548); g.closePath(); g.fill();
    g.strokeStyle = '#6a4a2a'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(470, 556); g.quadraticCurveTo(600, 548, 620, 556); g.moveTo(640, 552); g.quadraticCurveTo(700, 560, 760, 552); g.stroke();
    // chest and cushions
    g.fillStyle = '#5a3a1e'; g.fillRect(110, 500, 160, 80); g.fillStyle = '#c8962a'; g.fillRect(110, 520, 160, 8);
    g.fillStyle = '#2a4a6a'; g.beginPath(); g.ellipse(880, 590, 70, 22, 0, 0, TAU); g.fill();
  });

  // ======================== GUADALETE: the river plain ========================
  VP.set('plain', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a9ab8'], [.5, '#e8dcc0'], [1, '#d8b47a']]);
    S.dabs(g, { x: 0, y: 20, w, h: 240, n: 300, cols: ['#ffffff', '#d8e0e8'], r0: 30, r1: 120, sq: .16, a0: .05, a1: .14, seed: 351 });
    hill(g, 330, 50, 200, 353, '#9aa098', ['#b4b8a8', '#7a8070'], w, h);
    hill(g, 370, 40, 150, 355, '#a8a070', ['#c8b884', '#7a7a4a'], w, h);
    const pl = g.createLinearGradient(0, 380, 0, h); pl.addColorStop(0, '#c8b07a'); pl.addColorStop(1, '#9a7a4a'); g.fillStyle = pl; g.fillRect(0, 390, w, h - 390);
    S.strokes(g, { x: 0, y: 390, w, h: 330, n: 1400, cols: ['#e0c890', '#8a6a3a', '#a8a060'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 357 });
    // the river Guadalete winding across
    g.fillStyle = '#5a8a92'; g.beginPath(); g.moveTo(0, 470); g.bezierCurveTo(300, 450, 500, 520, 760, 500); g.bezierCurveTo(1000, 480, 1100, 440, w, 430); g.lineTo(w, 446); g.bezierCurveTo(1100, 458, 1000, 500, 760, 520); g.bezierCurveTo(500, 542, 300, 470, 0, 492); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 430, w, h: 110, n: 200, cols: ['#c8e0e0'], l0: 10, l1: 26, ang: 0, jit: .1, w0: 1, w1: 2, a0: .3, a1: .6, seed: 359, mask: (x, y) => Math.abs(y - (470 + 30 * Math.sin(x / 300))) < 14 });
    for (let i = 0; i < 20; i++) { const r = S.rng(i + 360), x = r() * w, y = 400 + r() * 40; S.dabs(g, { x: x - 14, y: y - 18, w: 28, h: 18, n: 10, cols: ['#5a6a3a', '#7a8a52'], r0: 4, r1: 9, sq: .7, a0: .5, a1: .9, seed: i + 370 }); }
  });

  // ======================== A TOWN GATE and the signing table ========================
  VP.set('towngate', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a8ab0'], [.6, '#e8e0c8'], [1, '#e0c090']]);
    // town wall and gate tower
    g.fillStyle = '#b89a72'; g.fillRect(0, 200, w, 380);
    for (let y = 210; y < 580; y += 28) for (let x = (y / 28 % 2) * 30; x < w; x += 60) { g.fillStyle = S.rgba(S.mix('#d8bc90', '#8a6a48', S.rng(x + y * 7)()), .5); g.fillRect(x + 2, y + 2, 56, 24); }
    for (let i = 0; i < 32; i++) { g.fillStyle = '#b89a72'; g.fillRect(i * 40, 186, 24, 16); }
    g.fillStyle = '#c8aa80'; g.fillRect(480, 120, 320, 460); for (let i = 0; i < 8; i++) g.fillRect(482 + i * 40, 100, 24, 22);
    g.fillStyle = S.rgba('#5a4030', .4); g.fillRect(700, 120, 100, 460);
    // the gate opening (doors drawn in the act)
    g.fillStyle = '#1a120c'; g.fill(arch(640, 580, 200, 280));
    g.lineWidth = 10; g.strokeStyle = '#e0c89a'; g.stroke(arch(640, 580, 216, 292));
    // ground
    g.fillStyle = '#b8966a'; g.fillRect(0, 580, w, 140); S.strokes(g, { x: 0, y: 580, w, h: 140, n: 500, cols: ['#d8b88a', '#7a5a3a'], l0: 6, l1: 18, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .5, seed: 381 });
    // the signing table is drawn in the act, in front of the people
  });

  // ======================== COVADONGA: misty green mountains and the cave ========================
  VP.set('covadonga', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a8c9c'], [.55, '#c8d0cc'], [1, '#b0b8a8']]);
    // jagged limestone peaks of the far north, three ranges fading into the mist, snow on the highest
    const range = (y0, amp, col, lit, snow, seed, step) => { const r = S.rng(seed), pts = [[0, h]]; for (let x = -20; x <= w + 40; x += step) pts.push([x, y0 - amp * (.35 + .65 * Math.abs(Math.sin(x * .011 + seed))) * (.6 + .4 * r())]); pts.push([w, h]);
      g.fillStyle = col; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fill();
      for (let i = 1; i < pts.length - 2; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1]; if (y1 < y2) { g.fillStyle = lit; g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo(x1 + (x2 - x1) * .5, y1 + (y2 - y1) * .4, x2, y2); g.lineTo(x2 - 6, y2 + 18); g.quadraticCurveTo(x1 + (x2 - x1) * .45, y1 + 30, x1 + 3, y1 + 10); g.closePath(); g.fill(); }
        if (snow && y1 < y0 - amp * .6) { g.fillStyle = 'rgba(240,244,246,.85)'; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 + 14, y1 + 22); g.lineTo(x1 + 4, y1 + 16); g.lineTo(x1 - 10, y1 + 26); g.closePath(); g.fill(); } }
      S.dabs(g, { x: 0, y: y0 - amp, w, h: amp + 80, n: 220, cols: [S.mix(col, '#ffffff', .2), S.mix(col, '#000000', .25)], r0: 3, r1: 10, sq: .4, ang: 1.3, a0: .15, a1: .35, seed: seed + 5, mask: (x, y) => y > y0 - amp * .3 }); };
    range(250, 150, '#8e98a0', 'rgba(230,236,240,.45)', true, 401, 46);
    const f1 = g.createLinearGradient(0, 180, 0, 320); f1.addColorStop(0, 'rgba(220,228,226,0)'); f1.addColorStop(1, 'rgba(220,228,226,.55)'); g.fillStyle = f1; g.fillRect(0, 180, w, 140);
    range(320, 130, '#6e7a78', 'rgba(210,220,220,.35)', true, 403, 38);
    const f2 = g.createLinearGradient(0, 260, 0, 400); f2.addColorStop(0, 'rgba(220,228,226,0)'); f2.addColorStop(1, 'rgba(220,228,226,.5)'); g.fillStyle = f2; g.fillRect(0, 260, w, 140);
    // a forested valley floor with a river winding between the walls
    g.fillStyle = '#4e6448'; g.beginPath(); g.moveTo(0, h); g.lineTo(0, 420); for (let x = 0; x <= w; x += 40) g.lineTo(x, 400 + 14 * Math.sin(x * .02)); g.lineTo(w, h); g.closePath(); g.fill();
    S.dabs(g, { x: 0, y: 390, w, h: 330, n: 900, cols: ['#3a5236', '#5a7a4a', '#2e4230', '#6e8a58'], r0: 4, r1: 14, sq: .7, a0: .4, a1: .8, seed: 431 });
    g.strokeStyle = 'rgba(200,220,228,.7)'; g.lineWidth = 6; g.beginPath(); g.moveTo(560, 720); g.bezierCurveTo(600, 600, 720, 520, 660, 440); g.bezierCurveTo(620, 410, 700, 400, 760, 404); g.stroke();
    const f3 = g.createLinearGradient(0, 380, 0, 470); f3.addColorStop(0, 'rgba(220,228,226,.45)'); f3.addColorStop(1, 'rgba(220,228,226,0)'); g.fillStyle = f3; g.fillRect(0, 380, w, 90);
    // dark pines on the lower slopes
    for (let i = 0; i < 70; i++) { const r = S.rng(i + 420), x = r() * w, y = 360 + r() * 50, s = 10 + r() * 12; g.fillStyle = r() < .5 ? '#2e4232' : '#3a5038'; g.beginPath(); g.moveTo(x, y - s * 2.4); g.lineTo(x + s * .7, y); g.lineTo(x - s * .7, y); g.closePath(); g.fill(); }
    // the gorge: two craggy limestone walls with strata, cracks and moss
    const wall = (pts, base, seed, flip) => { g.fillStyle = base; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.closePath(); g.fill();
      g.save(); g.clip(); for (let y = 180; y < h; y += 22 + (y % 7)) { g.strokeStyle = 'rgba(30,30,26,.35)'; g.lineWidth = 2; g.beginPath(); for (let x = 0; x <= w; x += 40) { const yy = y + Math.sin(x * .03 + seed) * 6 + (flip ? -1 : 1) * x * .08; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
      for (let i = 0; i < 40; i++) { const r = S.rng(i + seed), x = r() * w, y = 200 + r() * 520; g.strokeStyle = 'rgba(20,20,16,.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - .5) * 20, y + 20 + r() * 30); g.lineTo(x + (r() - .5) * 30, y + 50 + r() * 30); g.stroke(); }
      S.dabs(g, { x: 0, y: 180, w, h: 540, n: 700, cols: ['#8a8c80', '#3a3c34', '#5a7a44', '#a8a898', '#6a6c60'], r0: 5, r1: 20, sq: .5, ang: flip ? -1.1 : 1.1, a0: .2, a1: .5, seed: seed + 9 });
      g.fillStyle = 'rgba(255,250,235,.18)'; g.fillRect(0, 0, w, h); g.restore(); };
    wall([[0, h], [0, 190], [90, 205], [140, 240], [200, 250], [260, 300], [330, 330], [380, 420], [430, 520], [470, 640], [490, 720]], '#5e6056', 395, false);
    wall([[w, h], [w, 210], [1180, 230], [1110, 280], [1040, 300], [980, 360], [920, 450], [870, 560], [840, 650], [820, 720]], '#4e5048', 397, true);
    // the cave with its ledge, a waterfall spilling below it
    g.fillStyle = '#120e0a'; g.beginPath(); g.ellipse(250, 330, 66, 48, 0, Math.PI, 0); g.lineTo(316, 360); g.lineTo(184, 360); g.closePath(); g.fill(); g.fillStyle = S.rgba('#ffd090', .22); g.beginPath(); g.ellipse(250, 350, 34, 16, 0, 0, TAU); g.fill();
    g.fillStyle = '#6e7064'; g.beginPath(); g.moveTo(150, 392); g.lineTo(360, 392); g.lineTo(372, 404); g.lineTo(340, 420); g.lineTo(170, 418); g.lineTo(140, 404); g.closePath(); g.fill(); g.fillStyle = 'rgba(240,240,220,.35)'; g.fillRect(150, 390, 210, 4);
    for (let i = 0; i < 14; i++) { const x = 300 + i * 2.2; g.strokeStyle = `rgba(230,240,245,${.35 + .3 * (i % 2)})`; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 418); g.bezierCurveTo(x + 6, 480, x + 2, 560, x + 10, 640); g.stroke(); }
    g.fillStyle = 'rgba(240,246,250,.5)'; g.beginPath(); g.ellipse(322, 645, 34, 10, 0, 0, TAU); g.fill();
    // the gorge floor path with boulders and scrub
    g.fillStyle = '#6a6a50'; g.beginPath(); g.moveTo(480, 720); g.bezierCurveTo(560, 600, 700, 560, 820, 720); g.fill();
    for (let i = 0; i < 12; i++) { const r = S.rng(i + 430), x = 480 + r() * 340, y = 600 + r() * 110, rs = 6 + r() * 12; g.fillStyle = '#5a5a4c'; g.beginPath(); g.ellipse(x, y, rs * 1.3, rs, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(240,240,220,.3)'; g.beginPath(); g.ellipse(x - rs * .3, y - rs * .4, rs * .6, rs * .3, 0, 0, TAU); g.fill(); }
    for (let i = 0; i < 16; i++) { const r = S.rng(i + 400); S.dabs(g, { x: 480 + r() * 340, y: 560 + r() * 140, w: 30, h: 26, n: 12, cols: ['#3a5a32', '#5a7a42'], r0: 4, r1: 10, sq: .7, a0: .5, a1: .9, seed: i + 410 }); }
  });
})(window);
