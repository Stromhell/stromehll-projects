// Spain 1, act 3 (The City of Lamps): throne hall, Cordoba from above, baths, the huerta, rooftop observatory, Ibn Firnas' tower, the market, Madinat al-Zahra.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { cypress, tower, town, arch, hill, sky, dome, minaret } = X;
  const striped = (g, x, y, r, n, a, b, k = 0) => { for (let i = 0; i < n; i++) { const a0 = Math.PI * (.83 + i * 1.34 / n), a1 = Math.PI * (.83 + (i + 1) * 1.34 / n); g.fillStyle = S.mix(i % 2 ? a : b, '#1e1410', k); g.beginPath(); g.arc(x, y, r, a0, a1); g.arc(x, y, r * .74, a1, a0, true); g.closePath(); g.fill(); } };
  const orange = (g, x, y, s, seed) => { g.fillStyle = '#5a3a20'; g.fillRect(x - 3 * s, y - 30 * s, 6 * s, 30 * s); S.dabs(g, { x: x - 34 * s, y: y - 84 * s, w: 68 * s, h: 60 * s, n: 50, cols: ['#2e5a2a', '#4a7a3a', '#1e4020', '#6a9a4a'], r0: 5 * s, r1: 12 * s, sq: .7, a0: .7, a1: 1, seed, mask: (px, py) => (px - x) ** 2 / (34 * s) ** 2 + (py - y + 54 * s) ** 2 / (30 * s) ** 2 < 1 });
    const r = S.rng(seed); for (let k = 0; k < 9; k++) { g.fillStyle = '#f09a2a'; g.beginPath(); g.arc(x + (r() - .5) * 50 * s, y - 54 * s + (r() - .5) * 40 * s, 3.2 * s, 0, TAU); g.fill(); } };
  X.striped = striped; X.orange = orange;

  // ======================== THE CALIPH'S HALL: marble columns, a raised throne ========================
  VP.set('throne', 1280, 720, (g, w, h) => {
    g.fillStyle = '#e8dcc4'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < 560; y += 40) for (let x = (y / 40 % 2) * 50; x < w; x += 100) { g.fillStyle = S.mix('#efe4cc', '#c8b898', S.rng(x + y * 9 + 2)()); g.fillRect(x + 1, y + 1, 98, 38); }
    // arcade of arches with marble columns
    for (let i = 0; i < 7; i++) { const x = 90 + i * 183; g.fillStyle = '#5a3a28'; g.fill(arch(x, 520, 150, 330)); striped(g, x, 520 - 330 + 75, 78, 13, '#f0e4c8', '#3a6a5a'); g.fillStyle = '#f4ecdc'; g.fillRect(x + 80, 260, 22, 260); g.fillStyle = '#c8b898'; g.fillRect(x + 92, 260, 10, 260); g.fillStyle = '#d8a84a'; g.fillRect(x + 74, 250, 34, 12); g.fillRect(x + 74, 512, 34, 10); }
    // gold frieze
    g.fillStyle = '#c8962a'; g.fillRect(0, 140, w, 16); for (let i = 0; i < 64; i++) { g.fillStyle = '#7a5a14'; g.fillRect(i * 20 + 6, 144, 8, 8); }
    // dais with the throne in the centre
    g.fillStyle = '#9a7a5a'; g.fillRect(480, 500, 320, 22); g.fillStyle = '#b8987a'; g.fillRect(450, 522, 380, 26);
    g.fillStyle = '#2f6b4a'; g.fillRect(578, 320, 124, 184); g.fillStyle = '#c8962a'; g.fillRect(570, 312, 140, 14); g.fillRect(570, 312, 14, 192); g.fillRect(696, 312, 14, 192); g.beginPath(); g.arc(640, 312, 44, Math.PI, 0); g.fill(); g.fillStyle = '#2f6b4a'; g.beginPath(); g.arc(640, 312, 32, Math.PI, 0); g.fill();
    // polished floor with reflections
    const fl = g.createLinearGradient(0, 548, 0, h); fl.addColorStop(0, '#d8c8a8'); fl.addColorStop(1, '#a89878'); g.fillStyle = fl; g.fillRect(0, 548, w, h - 548);
    for (let i = 0; i < 7; i++) { g.fillStyle = S.rgba('#ffffff', .2); g.fillRect(170 + i * 183, 560, 22, 120); }
    S.strokes(g, { x: 0, y: 548, w, h: 172, n: 300, cols: ['#f0e4cc', '#8a7a5a'], l0: 20, l1: 60, ang: 0, jit: .05, w0: 1, w1: 2, a0: .1, a1: .3, seed: 1501 });
  });

  // ======================== CORDOBA FROM ABOVE ========================
  VP.set('aerial', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa0d0'], [.25, '#e8e0cc'], [.35, '#f0d0a0']]);
    hill(g, 220, 40, 220, 1511, '#9aa098', ['#b4b8a8', '#7a8070'], w, h);
    // the river curving across the bottom with the bridge
    g.fillStyle = '#c8a878'; g.fillRect(0, 230, w, h - 230);
    town(g, { x: 0, y: 240, w, h: 420, n: 1500, seed: 1513, scale: .6, wall: '#f4e2bc', wall2: '#e0c290', shade: '#a8845a', roof: '#c8724a', roof2: '#9a4a2a', dark: '#4a2a18', rim: '#fff4d8', mask: (x, y) => y < 600 + 30 * Math.sin(x / 200) });
    // gardens and palms between the roofs
    for (let i = 0; i < 70; i++) { const r = S.rng(i + 1520), x = r() * w, y = 260 + r() * 330; S.dabs(g, { x: x - 14, y: y - 10, w: 28, h: 20, n: 10, cols: ['#3a6a32', '#5a8a42'], r0: 4, r1: 9, sq: .7, a0: .6, a1: .95, seed: i + 1530 }); }
    // the Great Mosque: a big roof block with many ridges and the minaret
    g.fillStyle = '#e8d4ac'; g.fillRect(560, 470, 260, 110); for (let i = 0; i < 18; i++) { g.fillStyle = i % 2 ? '#c8724a' : '#a85a38'; g.fillRect(564 + i * 14, 476, 12, 64); } g.fillStyle = '#d8c094'; g.fillRect(560, 540, 260, 40);
    for (let i = 0; i < 6; i++) cypress(g, 580 + i * 40, 570, 18, '#3a5a2a', '#d8c070');
    minaret(g, 590, 470, 22, 120, '#f0dcb4', '#c8a880');
    dome(g, 760, 476, 20, '#f0dcb4', '#c8a880');
    minaret(g, 300, 380, 14, 80, '#f0dcb4', '#c8a880'); minaret(g, 1000, 360, 14, 76, '#f0dcb4', '#c8a880');
    g.fillStyle = '#5a8a92'; g.beginPath(); g.moveTo(0, 640); g.bezierCurveTo(400, 600, 800, 680, w, 610); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 610, w, h: 110, n: 300, cols: ['#c8e0e0', '#3a6a72'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2, a0: .3, a1: .6, seed: 1541, mask: (x, y) => y > 640 - 30 * Math.sin(x / 400) });
    g.fillStyle = '#d8b888'; g.save(); g.translate(640, 640); g.rotate(-.06); g.fillRect(-160, -8, 320, 14); g.restore();
  });

  // ======================== THE BATHS ========================
  VP.BATH_STARS = [[340, 70], [520, 50], [700, 50], [880, 70], [430, 120], [610, 100], [790, 120]];
  VP.set('bath', 1280, 720, (g, w, h) => {
    g.fillStyle = '#5a4a3a'; g.fillRect(0, 0, w, h);
    // vaulted ceiling with star-shaped skylights
    const v = g.createRadialGradient(640, -200, 100, 640, -200, 900); v.addColorStop(0, '#8a7458'); v.addColorStop(1, '#3a2c20'); g.fillStyle = v; g.beginPath(); g.ellipse(640, 330, 720, 330, 0, Math.PI, 0); g.fill();
    for (const [x, y] of VP.BATH_STARS) { g.fillStyle = '#fff4d0'; g.beginPath(); for (let k = 0; k < 16; k++) { const r = k % 2 ? 7 : 16, a = k / 16 * TAU; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); g.fill(); }
    // horseshoe arcade at the back
    for (let i = 0; i < 5; i++) { const x = 240 + i * 200; g.fillStyle = '#2a2018'; g.fill(arch(x, 520, 140, 230)); striped(g, x, 520 - 230 + 70, 74, 13, '#e8dcc0', '#a8402a'); g.fillStyle = '#d8c8a8'; g.fillRect(x + 84, 330, 20, 190); }
    // tiled walls
    for (let i = 0; i < 64; i++) { g.fillStyle = ['#2a6a7a', '#e8dcc0', '#1e4a5a', '#c8a050'][i % 4]; g.fillRect(i * 20, 520, 18, 18); }
    // the pool
    g.fillStyle = '#c8b498'; g.fillRect(0, 540, w, 180);
    g.fillStyle = '#4a9aa8'; g.beginPath(); g.ellipse(640, 640, 460, 70, 0, 0, TAU); g.fill(); g.strokeStyle = '#e8dcc0'; g.lineWidth = 10; g.stroke();
    S.strokes(g, { x: 180, y: 580, w: 920, h: 120, n: 300, cols: ['#d8f8f8', '#2a6a7a'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2, a0: .2, a1: .5, seed: 1551, mask: (x, y) => (x - 640) ** 2 / 460 ** 2 + (y - 640) ** 2 / 70 ** 2 < .9 });
  });

  // ======================== THE HUERTA: orange groves, canals, a big water wheel ========================
  VP.WHEEL = [880, 470, 150];
  VP.set('huerta', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.5, '#e8e4cc'], [.7, '#f0d4a0']]);
    hill(g, 300, 60, 200, 1561, '#b8a07a', ['#d8b88a', '#8a7050'], w, h);
    // the valley: green fields, rice terraces
    g.fillStyle = '#7a9a4a'; g.fillRect(0, 330, w, h - 330);
    for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#8aaa5a' : '#6a8a3a'; g.beginPath(); g.moveTo(0, 340 + i * 26); g.bezierCurveTo(400, 330 + i * 26, 800, 352 + i * 26, w, 338 + i * 26); g.lineTo(w, 360 + i * 26); g.bezierCurveTo(800, 374 + i * 26, 400, 352 + i * 26, 0, 362 + i * 26); g.fill(); }
    S.strokes(g, { x: 0, y: 330, w, h: 390, n: 900, cols: ['#a8c870', '#4a6a2a', '#c8d888'], l0: 4, l1: 12, ang: 1.4, jit: .3, w0: 1, w1: 2, a0: .3, a1: .6, seed: 1563 });
    // the canal
    g.fillStyle = '#5a9ab0'; g.beginPath(); g.moveTo(0, 580); g.bezierCurveTo(300, 560, 600, 600, 880, 560); g.lineTo(880, 590); g.bezierCurveTo(600, 630, 300, 590, 0, 610); g.fill();
    S.strokes(g, { x: 0, y: 560, w: 880, h: 70, n: 200, cols: ['#d8f0f0'], l0: 8, l1: 20, ang: 0, jit: .05, w0: 1, w1: 2, a0: .3, a1: .6, seed: 1565, mask: (x, y) => Math.abs(y - (585 - 20 * Math.sin(x / 300))) < 10 });
    // the aqueduct the wheel lifts water into
    g.fillStyle = '#c8a878'; g.fillRect(880, 300, 400, 22); for (let i = 0; i < 4; i++) { g.fillStyle = '#c8a878'; g.fillRect(940 + i * 90, 322, 22, 260); }
    // orange trees in rows
    for (let i = 0; i < 9; i++) orange(g, 60 + i * 90, 470 + (i % 2) * 10, .8, 1570 + i);
    for (let i = 0; i < 7; i++) orange(g, 40 + i * 120, 700, 1.2, 1580 + i);
  });

  // ======================== ROOFTOP AT NIGHT ========================
  VP.set('rooftop', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a1028'], [.6, '#1e2a4e'], [1, '#3a3a5a']]);
    for (let i = 0; i < 260; i++) { const r = S.rng(i + 1601); g.fillStyle = S.rgba('#fffaf0', .3 + r() * .6); g.beginPath(); g.arc(r() * w, r() * 460, .5 + r() * 1.4, 0, TAU); g.fill(); }
    S.glow(g, 900, 200, 300, '#6a7ab0', .15);
    town(g, { x: 0, y: 470, w, h: 80, n: 260, seed: 1603, scale: .7, wall: '#4a4a66', wall2: '#3a3a58', shade: '#24243c', roof: '#3e3854', roof2: '#2a2440', dark: '#ffc870', rim: '#8a90c0', mask: () => true });
    minaret(g, 1050, 500, 20, 160, '#5a5e7e', '#3a3e5e');
    // the flat roof with a parapet
    g.fillStyle = '#6a5e6a'; g.fillRect(0, 560, w, h - 560); g.fillStyle = '#7a6e7a'; g.fillRect(0, 540, w, 22); for (let i = 0; i < 26; i++) { g.fillStyle = '#7a6e7a'; g.fillRect(i * 52, 526, 30, 16); }
    S.strokes(g, { x: 0, y: 560, w, h: 160, n: 300, cols: ['#8a7e8a', '#3a3040'], l0: 10, l1: 30, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .4, seed: 1605 });
  });

  // ======================== IBN FIRNAS' TOWER ========================
  VP.set('firnas', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac8'], [.6, '#d8e4e8'], [1, '#f0dcb0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 300, n: 300, cols: ['#ffffff', '#e0e8f0'], r0: 30, r1: 120, sq: .18, a0: .06, a1: .16, seed: 1611 });
    hill(g, 470, 40, 200, 1613, '#a8a888', ['#c8c4a0', '#7a7a5a'], w, h);
    town(g, { x: 0, y: 470, w, h: 120, n: 400, seed: 1615, scale: .8, wall: '#f0dcb0', wall2: '#d8b888', shade: '#9a7a5a', roof: '#c06a44', roof2: '#8a4028', dark: '#3a2418', rim: '#fff0cc', mask: () => true });
    // the tall tower on the left
    tower(g, 260, 600, 90, 420, '#e8d4ac', '#b8986e', '#fff4dc');
    g.fillStyle = '#e8d4ac'; g.fillRect(200, 170, 120, 20);
    // the square below
    g.fillStyle = '#d8b888'; g.fillRect(0, 600, w, 120); S.strokes(g, { x: 0, y: 600, w, h: 120, n: 400, cols: ['#f0d8a8', '#8a6a48'], l0: 6, l1: 18, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .4, seed: 1617 });
  });

  // ======================== THE MARKET ========================
  VP.set('market', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa0d0'], [.5, '#f0e4c8']]);
    const R = S.rng(1660);
    // house fronts: limewashed plaster with stains, a stone plinth and tiled eaves
    const pl = g.createLinearGradient(0, 150, 0, 580); pl.addColorStop(0, '#efdcb4'); pl.addColorStop(1, '#d9bf92'); g.fillStyle = pl; g.fillRect(0, 150, w, 430);
    S.dabs(g, { x: 0, y: 160, w, h: 410, n: 900, cols: ['#f6e8c8', '#cfae80', '#e2c89c', '#bf9d70'], r0: 3, r1: 14, a0: .12, a1: .35, seed: 1661 });
    for (let i = 0; i < 9; i++) { const x = i * 150 + (R() - .5) * 40; g.fillStyle = S.rgba('#a8805a', .12); g.beginPath(); g.ellipse(x, 560, 50, 70, 0, 0, TAU); g.fill(); }
    g.fillStyle = '#b89a78'; g.fillRect(0, 540, w, 40); for (let x = 0; x < w; x += 48) { g.fillStyle = S.mix('#c8aa88', '#9a7a5a', R()); g.fillRect(x + 1, 541, 46, 18); g.fillRect(x + 25, 560, 46, 19); }
    // tiled eaves along the top, with a shadow line under them
    g.fillStyle = '#8a3a22'; g.fillRect(0, 128, w, 26); for (let x = 0; x < w; x += 18) { g.fillStyle = S.mix('#b0502e', '#7a2e1a', R()); g.beginPath(); g.ellipse(x + 9, 150, 9, 7, 0, 0, Math.PI); g.fill(); }
    g.fillStyle = S.rgba('#5a3a20', .28); g.fillRect(0, 156, w, 12);
    // upper windows with green shutters, wooden balconies and pots of geraniums
    for (let i = 0; i < 6; i++) { const x = 110 + i * 212 + 75, y = 200; g.fillStyle = '#3a2418'; g.fillRect(x - 22, y, 44, 58); g.fillStyle = '#2f6a4a'; g.fillRect(x - 40, y, 18, 58); g.fillRect(x + 22, y, 18, 58); g.strokeStyle = '#1e4a32'; g.lineWidth = 1.5; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(x - 40, y + 6 + k * 9); g.lineTo(x - 22, y + 6 + k * 9); g.moveTo(x + 22, y + 6 + k * 9); g.lineTo(x + 40, y + 6 + k * 9); g.stroke(); }
      g.fillStyle = '#6a4228'; g.fillRect(x - 46, y + 58, 92, 8); for (let k = 0; k < 9; k++) g.fillRect(x - 44 + k * 11, y + 66, 3, 18); g.fillRect(x - 46, y + 84, 92, 5);
      for (const dx of [-30, 0, 30]) { g.fillStyle = '#b8603a'; g.fillRect(x + dx - 7, y + 46, 14, 12); S.dabs(g, { x: x + dx - 12, y: y + 30, w: 24, h: 18, n: 14, cols: ['#3a6a2a', '#5a8a3a', '#d8302a', '#e85a4a'], r0: 2, r1: 5, a0: .8, a1: 1, seed: 1670 + i * 7 + dx }); } }
    // ground-floor horseshoe arches with striped voussoirs and a lit interior glow
    for (let i = 0; i < 6; i++) { const x = 110 + i * 212; g.fillStyle = '#3a2418'; g.fill(arch(x, 540, 150, 230)); const gl = g.createRadialGradient(x + 75, 520, 10, x + 75, 470, 110); gl.addColorStop(0, S.rgba('#c87a3a', .45)); gl.addColorStop(1, S.rgba('#3a2418', 0)); g.fillStyle = gl; g.fillRect(x, 310, 150, 230); striped(g, x, 540 - 230 + 75, 80, 13, '#f0e4c8', '#a8402a'); }
    // hanging brass lanterns between the arches
    for (let i = 0; i < 5; i++) { const x = 110 + i * 212 + 181; g.strokeStyle = '#3a2a1a'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, 168); g.lineTo(x, 300); g.stroke(); g.fillStyle = '#b8862a'; g.beginPath(); g.moveTo(x - 9, 300); g.lineTo(x + 9, 300); g.lineTo(x + 6, 326); g.lineTo(x - 6, 326); g.fill(); g.fillStyle = S.rgba('#ffe0a0', .7); g.fillRect(x - 5, 304, 10, 18); g.fillStyle = '#8a5a1a'; g.beginPath(); g.moveTo(x - 11, 300); g.lineTo(x, 290); g.lineTo(x + 11, 300); g.fill(); }
    // stalls: shaded, scalloped canvas awnings on poles, plank counters with cloth skirts
    const cols = ['#c83a2a', '#2a5a8a', '#2f8a5a', '#d8962a'];
    for (let i = 0; i < 4; i++) { const x = 60 + i * 310;
      g.fillStyle = S.rgba('#3a2418', .25); g.fillRect(x + 4, 412, 232, 110);
      for (let k = 0; k < 8; k++) { const x0 = x - 6 + k * 31; g.fillStyle = k % 2 ? cols[i] : '#f4ecd8'; g.beginPath(); g.moveTo(x0 + 4, 360); g.lineTo(x0 + 35, 360); g.lineTo(x0 + 37, 404); g.quadraticCurveTo(x0 + 21, 418, x0 + 6, 404); g.closePath(); g.fill(); }
      const aw = g.createLinearGradient(0, 360, 0, 418); aw.addColorStop(0, S.rgba('#000000', 0)); aw.addColorStop(1, S.rgba('#3a2010', .25)); g.fillStyle = aw; g.fillRect(x - 6, 360, 250, 58);
      g.fillStyle = '#6a4228'; g.fillRect(x - 8, 352, 256, 9);
      g.fillStyle = '#5a3a20'; g.fillRect(x, 360, 7, 220); g.fillRect(x + 226, 360, 7, 220);
      g.fillStyle = '#8a5a32'; g.fillRect(x - 12, 518, 258, 12); g.strokeStyle = '#5a3a1e'; g.lineWidth = 1; for (let k = 1; k < 6; k++) { g.beginPath(); g.moveTo(x - 12 + k * 43, 518); g.lineTo(x - 12 + k * 43, 530); g.stroke(); }
      g.fillStyle = S.mix(cols[i], '#f4ecd8', .35); g.beginPath(); g.moveTo(x - 10, 530); g.lineTo(x + 244, 530); g.lineTo(x + 240, 574); for (let k = 8; k >= 0; k--) g.lineTo(x - 8 + k * 31, 574 + (k % 2) * 6); g.closePath(); g.fill();
      g.fillStyle = S.rgba('#3a2010', .18); for (let k = 0; k < 8; k++) g.fillRect(x - 6 + k * 31 + 14, 530, 3, 44); }
    // stall 1: glazed pots and amphorae with highlights
    for (let k = 0; k < 6; k++) { const x = 84 + k * 36, y = 518, hh = 34 + (k % 3) * 8, c0 = ['#b8603a', '#2a6a8a', '#c8a050', '#a8502a', '#3a7a6a', '#b8603a'][k];
      g.fillStyle = c0; g.beginPath(); g.moveTo(x - 6, y - hh); g.quadraticCurveTo(x - 18, y - hh * .6, x - 14, y - hh * .25); g.quadraticCurveTo(x - 10, y, x, y); g.quadraticCurveTo(x + 10, y, x + 14, y - hh * .25); g.quadraticCurveTo(x + 18, y - hh * .6, x + 6, y - hh); g.closePath(); g.fill();
      g.fillStyle = '#2a1a10'; g.beginPath(); g.ellipse(x, y - hh, 6, 2.5, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#ffffff', .35); g.fillRect(x - 9, y - hh * .7, 3, hh * .4); g.strokeStyle = S.rgba('#f0e4c8', .6); g.lineWidth = 2; g.beginPath(); g.moveTo(x - 13, y - hh * .45); g.lineTo(x + 13, y - hh * .45); g.stroke(); }
    // stall 2: rolled cloth bolts with spiral ends, and lengths of cloth hanging from the awning bar
    for (let k = 0; k < 6; k++) { const x = 384 + k * 36, c0 = ['#8a2a5a', '#2a6a8a', '#e8c040', '#3a8a5a', '#c8502a', '#f0e8d0'][k]; g.fillStyle = S.mix(c0, '#000000', .15); g.fillRect(x - 13, 476, 26, 42); g.fillStyle = c0; g.fillRect(x - 13, 476, 20, 42); g.beginPath(); g.ellipse(x, 476, 13, 5, 0, 0, TAU); g.fill(); g.strokeStyle = S.mix(c0, '#000000', .35); g.lineWidth = 1; g.beginPath(); g.ellipse(x, 476, 7, 2.6, 0, 0, TAU); g.stroke(); }
    for (let k = 0; k < 4; k++) { const x = 392 + k * 52, c0 = ['#a83a6a', '#d8a030', '#2a7a9a', '#5a9a5a'][k]; g.fillStyle = c0; g.beginPath(); g.moveTo(x, 412); g.lineTo(x + 30, 412); g.quadraticCurveTo(x + 34, 440, x + 28, 462); g.lineTo(x + 2, 458); g.quadraticCurveTo(x - 4, 436, x, 412); g.fill(); g.fillStyle = S.rgba('#ffffff', .18); g.fillRect(x + 6, 414, 4, 42); }
    // stall 3: spice heaps in woven baskets
    for (let k = 0; k < 6; k++) { const x = 706 + k * 36, c0 = ['#d8a020', '#c8401a', '#8a5a2a', '#e8d040', '#6a8a2a', '#a8301a'][k]; g.fillStyle = '#8a6a3a'; g.beginPath(); g.moveTo(x - 16, 500); g.lineTo(x + 16, 500); g.lineTo(x + 13, 518); g.lineTo(x - 13, 518); g.fill(); g.strokeStyle = '#5a4020'; g.lineWidth = 1; for (let q = 0; q < 3; q++) { g.beginPath(); g.moveTo(x - 15, 504 + q * 5); g.lineTo(x + 15, 504 + q * 5); g.stroke(); }
      g.fillStyle = c0; g.beginPath(); g.moveTo(x - 16, 500); g.quadraticCurveTo(x, 470, x + 16, 500); g.fill(); g.fillStyle = S.rgba('#ffffff', .25); g.beginPath(); g.ellipse(x - 4, 488, 4, 2.5, -.5, 0, TAU); g.fill(); }
    // stall 4: oranges and pomegranates in crates, bread loaves in a basket
    for (let k = 0; k < 3; k++) { const x = 1012 + k * 70; g.fillStyle = '#9a6a3a'; g.fillRect(x - 30, 496, 60, 22); g.strokeStyle = '#6a4220'; g.lineWidth = 1.5; g.strokeRect(x - 30, 496, 60, 22); g.beginPath(); g.moveTo(x - 30, 507); g.lineTo(x + 30, 507); g.stroke();
      for (let q = 0; q < 9; q++) { g.fillStyle = k === 1 ? '#a82a2a' : '#f09a2a'; g.beginPath(); g.arc(x - 24 + (q % 5) * 12 + (q > 4 ? 6 : 0), 494 - (q > 4 ? 9 : 0), 6.5, 0, TAU); g.fill(); g.fillStyle = S.rgba('#ffffff', .35); g.beginPath(); g.arc(x - 26 + (q % 5) * 12 + (q > 4 ? 6 : 0), 492 - (q > 4 ? 9 : 0), 2, 0, TAU); g.fill(); } }
    // ground: worn cobbles with shadows, and sacks and a crate by the stalls
    g.fillStyle = '#c4a884'; g.fillRect(0, 580, w, 140);
    for (let y = 586; y < h; y += 14) for (let x = (y / 14 % 2) * 12; x < w; x += 24) { const r = S.rng(x * 7 + y)(); g.fillStyle = S.mix('#d4b894', '#a88a64', r); g.beginPath(); g.ellipse(x, y, 10 + (y - 580) * .02, 5 + (y - 580) * .01, 0, 0, TAU); g.fill(); }
    S.strokes(g, { x: 0, y: 580, w, h: 140, n: 300, cols: ['#e8d0a8', '#8a6a48'], l0: 6, l1: 18, ang: 0, jit: .2, w0: 1, w1: 2, a0: .15, a1: .3, seed: 1621 });
    const sg = g.createLinearGradient(0, 578, 0, 610); sg.addColorStop(0, S.rgba('#3a2418', .3)); sg.addColorStop(1, S.rgba('#3a2418', 0)); g.fillStyle = sg; g.fillRect(0, 578, w, 32);
    for (const [x, y] of [[44, 596], [300, 602], [1250, 598]]) { g.fillStyle = '#c8b088'; g.beginPath(); g.moveTo(x - 18, y); g.quadraticCurveTo(x - 22, y - 34, x - 6, y - 42); g.lineTo(x + 8, y - 42); g.quadraticCurveTo(x + 22, y - 34, x + 18, y); g.closePath(); g.fill(); g.strokeStyle = '#8a7048'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 8, y - 38); g.lineTo(x + 8, y - 38); g.stroke(); g.fillStyle = S.rgba('#3a2418', .25); g.beginPath(); g.ellipse(x, y + 2, 22, 5, 0, 0, TAU); g.fill(); }
  });

  // ======================== MADINAT AL-ZAHRA ========================
  VP.set('zahra', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac8'], [.5, '#e8e4cc'], [.7, '#f0d4a0']]);
    hill(g, 320, 140, 260, 1631, '#7a8a5a', ['#9aa070', '#5a6a3a', '#b0a878'], w, h);
    // three terraces climbing the hill, with palaces and gardens
    for (let t = 0; t < 3; t++) { const y = 330 + t * 110, x0 = 160 - t * 60, x1 = 1120 + t * 60; g.fillStyle = '#e8d4ac'; g.fillRect(x0, y, x1 - x0, 26); g.fillStyle = '#c8b088'; g.fillRect(x0, y + 26, x1 - x0, 84);
      for (let i = 0; i < 10 + t * 2; i++) { const x = x0 + 40 + i * ((x1 - x0 - 80) / (9 + t * 2)); g.fillStyle = '#3a2418'; g.fill(arch(x, y + 100, 34, 60)); }
      for (let i = 0; i < 14; i++) cypress(g, x0 + 30 + i * (x1 - x0 - 60) / 13, y, 26 + (i % 3) * 8, '#3a5a2a', '#d8c070');
      if (t === 0) { g.fillStyle = '#f0dcb4'; g.fillRect(560, 250, 160, 80); dome(g, 640, 250, 46, '#f0dcb4', '#c8a880', '#fff4dc'); for (const x of [570, 710]) minaret(g, x, 330, 16, 110, '#f0dcb4', '#c8a880'); } }
    g.fillStyle = '#9a8a5a'; g.fillRect(0, 660, w, 60);
  });
  // the golden hall with the mercury bowl
  VP.set('goldhall', 1280, 720, (g, w, h) => {
    const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#6a4a1a'); bg.addColorStop(1, '#2a1a08'); g.fillStyle = bg; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 5; i++) { const x = 160 + i * 240; g.fillStyle = '#1e140a'; g.fill(arch(x, 560, 170, 380)); striped(g, x, 560 - 380 + 85, 90, 13, '#e8c060', '#7a3a14'); g.fillStyle = '#c8962a'; g.fillRect(x + 100, 240, 22, 320); }
    // carved gold panels
    for (let y = 40; y < 160; y += 30) for (let x = 0; x < w; x += 30) { g.strokeStyle = S.rgba('#e8c060', .35); g.lineWidth = 1.5; g.beginPath(); g.arc(x + 15, y + 15, 10, 0, TAU); g.moveTo(x, y + 15); g.lineTo(x + 30, y + 15); g.stroke(); }
    g.fillStyle = '#4a3418'; g.fillRect(0, 560, w, h - 560);
    // the basin of mercury on a pedestal in the middle
    g.fillStyle = '#8a7a6a'; g.fillRect(600, 560, 80, 60); g.fillStyle = '#b8a890'; g.beginPath(); g.ellipse(640, 560, 120, 26, 0, 0, TAU); g.fill();
    const hg = g.createLinearGradient(520, 550, 760, 570); hg.addColorStop(0, '#c8ccd8'); hg.addColorStop(.5, '#ffffff'); hg.addColorStop(1, '#8a90a0'); g.fillStyle = hg; g.beginPath(); g.ellipse(640, 556, 104, 18, 0, 0, TAU); g.fill();
  });
})(window);
