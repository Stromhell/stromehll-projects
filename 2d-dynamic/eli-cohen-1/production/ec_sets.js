// Eli Cohen sets (Village Painterly), 1930s-1965: Alexandria corniche, a French-school classroom, Alexandria harbour
// with a steamer, a Cairo police office, a migrant-ship deck off Haifa, a Tel Aviv flat, a training safehouse, a Buenos
// Aires café, a Damascus party salon and Damascus from Mount Qasioun. More Damascus sets in ec_sets2.js.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain, wood } = S.JPX;
  const { cloud, palm, dome, minaret, bricks } = S.MGX;
  const plaster = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); S.dabs(g, { x, y, w, h, n: Math.round(w * h / 700), cols: [S.mix(base, '#000000', .12), S.mix(base, '#ffffff', .18)], r0: 6, r1: 22, a0: .15, a1: .35, seed }); };
  const floorboards = (g, y, w, h, base, seed) => { wood(g, 0, y, w, h - y, base, seed); g.strokeStyle = S.rgba('#000000', .18); g.lineWidth = 2; for (let k = 0; k < 16; k++) { g.beginPath(); g.moveTo(640 + (k - 8) * 30, y); g.lineTo(640 + (k - 8) * 190, h); g.stroke(); } };
  const tiles = (g, y, w, h, a, b, seed) => { g.fillStyle = a; g.fillRect(0, y, w, h - y); for (let r = 0; r < 8; r++) { const y0 = y + (r * r) * (h - y) / 64, y1 = y + ((r + 1) * (r + 1)) * (h - y) / 64; for (let k = -12; k < 12; k++) { if (Math.abs(k + r) % 2) continue; g.fillStyle = b; g.beginPath(); g.moveTo(640 + k * 40 * (1 + r * .6), y0); g.lineTo(640 + (k + 1) * 40 * (1 + r * .6), y0); g.lineTo(640 + (k + 1) * 40 * (1 + (r + 1) * .6), y1); g.lineTo(640 + k * 40 * (1 + (r + 1) * .6), y1); g.fill(); } } S.dabs(g, { x: 0, y, w, h: h - y, n: 200, cols: ['#ffffff', '#000000'], r0: 8, r1: 30, a0: .03, a1: .08, seed }); };
  const win = (g, x, y, w, h, fill, frame = '#e8e0c8') => { g.fillStyle = frame; g.fillRect(x - 10, y - 10, w + 20, h + 20); if (typeof fill === 'function') { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); fill(g); g.restore(); } else { g.fillStyle = fill; g.fillRect(x, y, w, h); } g.fillStyle = frame; g.fillRect(x + w / 2 - 4, y, 8, h); g.fillRect(x, y + h * .45 - 4, w, 8); g.fillStyle = S.rgba('#ffffff', .12); g.beginPath(); g.moveTo(x, y + h); g.lineTo(x + w * .4, y); g.lineTo(x + w * .55, y); g.lineTo(x + w * .15, y + h); g.fill(); };
  const curtain = (g, x, y, w, h, col) => { for (let k = 0; k < 5; k++) { g.fillStyle = S.mix(col, k % 2 ? '#000000' : '#ffffff', .15); g.fillRect(x + k * w / 5, y, w / 5 + 1, h); } g.fillStyle = S.rgba('#000000', .2); g.fillRect(x, y + h - 10, w, 10); };
  const roofs = (g, w, y0, n, seed, night) => { const r = S.rng(seed); for (let k = 0; k < n; k++) { const x = r() * w, bw = 40 + r() * 90, bh = 24 + r() * 60, yy = y0 + r() * 90; g.fillStyle = night ? S.mix('#1c2238', '#3a3a50', r()) : S.mix('#d8c8a8', '#b8a080', r()); g.fillRect(x, yy - bh, bw, bh + 200); g.fillStyle = night ? S.rgba('#ffd890', .8) : S.rgba('#5a4a3a', .45); for (let j = 0; j < 3; j++) if (r() < .55) g.fillRect(x + 8 + j * 22, yy - bh + 10 + (j % 2) * 14, 7, 9); } };
  const sflag = (g, x, y, s, post) => { if (post) { g.fillStyle = '#5a5a5a'; g.fillRect(x - 2, y, 4, 120 * s); } [['#2a7a3a', 0], ['#f0f0f0', 1], ['#1a1a1a', 2]].forEach(([c, i]) => { g.fillStyle = c; g.fillRect(x, y + i * 14 * s, 66 * s, 14 * s); }); g.fillStyle = '#c82a2a'; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(x + (16 + i * 17) * s, y + 21 * s, 3.5 * s, 0, TAU); g.fill(); } };
  const lamp = (g, x, y, col = '#e8c890') => { g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, y - 20); g.stroke(); g.fillStyle = '#3a4a3a'; g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x - 10, y - 22); g.lineTo(x + 10, y - 22); g.lineTo(x + 30, y); g.fill(); const gr = g.createRadialGradient(x, y + 10, 4, x, y + 60, 260); gr.addColorStop(0, S.rgba(col, .45)); gr.addColorStop(1, S.rgba(col, 0)); g.fillStyle = gr; g.fillRect(x - 300, y, 600, 500); };
  const ECX = { plaster, floorboards, tiles, win, curtain, roofs, sflag, lamp }; S.ECX = ECX;

  // Alexandria corniche, 1930s: the sea, a curved sea wall, palms, white apartment blocks, tram rails and wires
  VP.set('ec_corniche', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a8ac8'], [.4, '#a8d0e8'], [.55, '#e8f0f0'], [1, '#d8c8a0']]);
    cloud(g, 260, 120, 1.1, '#ffffff', 7101); cloud(g, 820, 80, 1.3, '#ffffff', 7102);
    g.fillStyle = '#3a8ab0'; g.fillRect(0, 330, w, 120); for (let k = 0; k < 60; k++) { const r = S.rng(7103 + k); g.fillStyle = S.rgba('#ffffff', .35); g.fillRect(r() * w, 340 + r() * 100, 20 + r() * 40, 2); }
    const r = S.rng(7104); for (let k = 0; k < 9; k++) { const x = 620 + k * 80, bh = 140 + r() * 90; g.fillStyle = S.mix('#f0e8d8', '#e0c8a8', r()); g.fillRect(x, 400 - bh, 78, bh + 30); g.fillStyle = S.rgba('#3a5a7a', .7); for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) g.fillRect(x + 10 + i * 22, 410 - bh + 20 + j * 34, 12, 18); g.fillStyle = '#c8b898'; g.fillRect(x - 2, 400 - bh, 82, 8); }
    g.fillStyle = '#e8dcc0'; g.beginPath(); g.moveTo(0, 450); g.quadraticCurveTo(640, 420, 1280, 440); g.lineTo(1280, 470); g.quadraticCurveTo(640, 450, 0, 480); g.fill(); for (let x = 10; x < w; x += 46) { g.fillStyle = '#c8b898'; g.fillRect(x, 448 - (x / w) * 10, 10, 26); }
    g.fillStyle = '#c8b898'; g.beginPath(); g.moveTo(0, 480); g.quadraticCurveTo(640, 450, 1280, 470); g.lineTo(w, h); g.lineTo(0, h); g.fill(); S.dabs(g, { x: 0, y: 480, w, h: 240, n: 300, cols: ['#a89878', '#d8c8a8'], r0: 4, r1: 14, a0: .2, a1: .4, seed: 7105 });
    g.strokeStyle = '#6a6a6a'; g.lineWidth = 3; [560, 576].forEach(y => { g.beginPath(); g.moveTo(0, y); g.quadraticCurveTo(640, y - 18, 1280, y - 6); g.stroke(); });
    g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 300); g.quadraticCurveTo(640, 290, 1280, 296); g.stroke(); [120, 520, 920].forEach(x => { g.fillStyle = '#3a3a3a'; g.fillRect(x, 296, 5, 170); });
    [[60, 470, 1.3], [340, 460, 1.2], [1180, 462, 1.2]].forEach(([x, y, s]) => palm(g, x, y, s));
    grain(g, w, h, 7106, .04); });

  // a 1930s classroom: green wall, chalkboard with French and Arabic, a map of Egypt, tall window with a palm
  VP.set('ec_class', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 500, '#7a9a7a', 7201); g.fillStyle = '#5a7a5a'; g.fillRect(0, 380, w, 120);
    g.fillStyle = '#5a3a22'; g.fillRect(330, 120, 520, 240); g.fillStyle = '#2a3a2e'; g.fillRect(342, 132, 496, 216);
    g.fillStyle = S.rgba('#ffffff', .85); g.font = '30px Caveat'; g.fillText('La mémoire', 380, 190); g.fillText('1 + 1 = 2    ·    ا ب ت', 380, 240); g.fillText('Alexandrie, 1935', 380, 290); g.fillStyle = S.rgba('#ffffff', .15); g.fillRect(350, 300, 200, 30);
    g.fillStyle = '#e8dcb8'; g.fillRect(920, 130, 200, 160); g.fillStyle = '#c8a86a'; g.beginPath(); g.moveTo(950, 160); g.lineTo(1080, 160); g.lineTo(1080, 270); g.lineTo(960, 270); g.lineTo(945, 210); g.fill(); g.strokeStyle = '#3a6ab0'; g.lineWidth = 4; g.beginPath(); g.moveTo(1010, 160); g.quadraticCurveTo(1000, 220, 1015, 270); g.stroke();
    win(g, 80, 100, 170, 280, cc => { sky(cc, 1280, 720, [[0, '#7ab0e0'], [.4, '#e8f0f0']]); palm(cc, 160, 380, 1.2); });
    floorboards(g, 500, w, h, '#7a5a3a', 7202); grain(g, w, h, 7203, .04); });

  // Alexandria harbour, 1949: a stone quay, a black-hulled steamer with a gangway, crates
  VP.set('ec_dock', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ac8'], [.45, '#d8e4ec'], [1, '#c8b898']]); cloud(g, 300, 100, 1.2, '#ffffff', 7301);
    g.fillStyle = '#2a6a8a'; g.fillRect(0, 380, w, 90);
    g.fillStyle = '#1e1e24'; g.beginPath(); g.moveTo(420, 300); g.lineTo(1280, 300); g.lineTo(1280, 450); g.lineTo(470, 450); g.closePath(); g.fill(); g.fillStyle = '#8a2a22'; g.fillRect(450, 430, 830, 20);
    g.fillStyle = '#f0ece0'; g.fillRect(620, 220, 560, 82); g.fillRect(760, 170, 300, 52); for (let k = 0; k < 16; k++) { g.fillStyle = '#3a4a5a'; g.beginPath(); g.arc(640 + k * 34, 260, 8, 0, TAU); g.fill(); }
    g.fillStyle = '#c8a040'; g.fillRect(880, 80, 60, 92); g.fillStyle = '#1e1e24'; g.fillRect(880, 80, 60, 16); g.fillStyle = S.rgba('#5a5a60', .4); for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(910 - k * 30, 70 - k * 14, 20 + k * 6, 0, TAU); g.fill(); }
    g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(500, 300); g.lineTo(700, 60); g.lineTo(1250, 300); g.stroke();
    g.fillStyle = '#9a9488'; g.fillRect(0, 450, w, 40); g.fillStyle = '#b8b0a0'; g.fillRect(0, 490, w, 230); bricks(g, 0, 450, w, 40, '#8a8478', 7302); S.dabs(g, { x: 0, y: 490, w, h: 230, n: 260, cols: ['#a8a090', '#c8c0b0'], r0: 6, r1: 20, a0: .2, a1: .4, seed: 7303 });
    g.fillStyle = '#6a4a2a'; g.beginPath(); g.moveTo(560, 300); g.lineTo(600, 300); g.lineTo(420, 520); g.lineTo(380, 520); g.fill(); g.strokeStyle = '#4a3020'; g.lineWidth = 3; g.beginPath(); g.moveTo(560, 270); g.lineTo(380, 490); g.stroke();
    [[90, 520], [160, 530], [120, 480]].forEach(([x, y], k) => wood(g, x, y - 60, 70, 60, '#8a6a3a', 7304 + k));
    grain(g, w, h, 7307, .04); });

  // Cairo police office, 1954: dim green wall, a filing cabinet, barred window, a hanging lamp
  VP.set('ec_police', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#6a7a6a', 7401); g.fillStyle = '#4a5a4a'; g.fillRect(0, 420, w, 100);
    win(g, 900, 120, 200, 200, '#e8e0c0', '#4a4a44'); g.fillStyle = '#2a2a2a'; for (let k = 0; k < 6; k++) g.fillRect(910 + k * 34, 120, 6, 200);
    g.fillStyle = '#5a5a5a'; g.fillRect(120, 300, 130, 220); for (let k = 0; k < 4; k++) { g.fillStyle = '#6a6a6a'; g.fillRect(128, 310 + k * 52, 114, 44); g.fillStyle = '#c8c8c8'; g.fillRect(175, 326 + k * 52, 20, 6); }
    g.fillStyle = '#8a7a5a'; g.fillRect(460, 110, 120, 150); g.fillStyle = '#c8b898'; g.fillRect(470, 120, 100, 130);
    tiles(g, 520, w, h, '#7a6a5a', '#5a4a3a', 7402); lamp(g, 640, 200); grain(g, w, h, 7403, .05); });

  // deck of a migrant ship off Haifa, 1957: railing, lifeboat, Mount Carmel on the horizon
  VP.set('ec_ship', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac0'], [.45, '#e8e0d0'], [1, '#c8b898']]); cloud(g, 900, 100, 1.2, '#ffffff', 7501);
    g.fillStyle = '#2a6a8a'; g.fillRect(0, 330, w, 120);
    ridge(g, w, 360, 340, 50, 260, 7502, '#8a9a7a'); g.fillStyle = '#e8e0d0'; for (let k = 0; k < 30; k++) { const r = S.rng(7503 + k); g.fillRect(500 + r() * 500, 318 + r() * 20, 6, 5); }
    g.fillStyle = '#2a6a8a'; g.fillRect(0, 346, w, 104);
    g.fillStyle = '#f0ece0'; g.fillRect(0, 440, w, 16); for (let x = 0; x < w; x += 40) g.fillRect(x, 440, 6, 70); g.fillRect(0, 500, w, 10);
    wood(g, 0, 510, w, 210, '#a8865a', 7504); g.strokeStyle = S.rgba('#000000', .2); for (let y = 530; y < h; y += 24) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.fillStyle = '#e8e4dc'; g.beginPath(); g.roundRect(1000, 300, 260, 60, 30); g.fill(); g.fillStyle = '#c82a2a'; g.fillRect(1000, 320, 260, 8); g.strokeStyle = '#5a5a5a'; g.lineWidth = 4; g.beginPath(); g.moveTo(1030, 300); g.lineTo(1030, 230); g.lineTo(1060, 230); g.moveTo(1230, 300); g.lineTo(1230, 230); g.lineTo(1200, 230); g.stroke();
    grain(g, w, h, 7505, .04); });

  // a small Tel Aviv flat, 1959: whitewashed walls, a balcony door, a bookshelf, a framed photo
  VP.set('ec_flat', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#e8e0cc', 7601);
    win(g, 860, 90, 220, 330, cc => { sky(cc, 1280, 720, [[0, '#6aa0d8'], [.5, '#e8f0f0']]); cc.fillStyle = '#e8e4dc'; cc.fillRect(860, 300, 220, 140); for (let k = 0; k < 4; k++) { cc.fillStyle = '#9ab0c0'; cc.fillRect(880 + k * 50, 320, 20, 30); } }, '#3a6a8a');
    curtain(g, 820, 80, 40, 360, '#d8a050'); curtain(g, 1080, 80, 40, 360, '#d8a050');
    g.fillStyle = '#6a4a2a'; g.fillRect(140, 200, 260, 10); g.fillRect(140, 280, 260, 10); for (let k = 0; k < 14; k++) { const r = S.rng(7602 + k); g.fillStyle = ['#8a2a22', '#2a4a7a', '#c8a040', '#3a6a3a'][k % 4]; g.fillRect(150 + k * 17, 200 - 36 - r() * 14, 13, 36 + r() * 14); g.fillRect(150 + k * 17, 280 - 34 - r() * 12, 13, 34 + r() * 12); }
    g.fillStyle = '#8a7a6a'; g.fillRect(480, 160, 100, 80); g.fillStyle = '#c8d8e0'; g.fillRect(488, 168, 84, 64);
    tiles(g, 520, w, h, '#c8b8a0', '#a89878', 7603); grain(g, w, h, 7604, .04); });

  // training safehouse: maps pinned to the wall, notes, blinds drawn
  VP.set('ec_safe', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#b8b098', 7701);
    g.fillStyle = '#e8dcb8'; g.fillRect(140, 90, 360, 240); g.strokeStyle = '#3a6ab0'; g.lineWidth = 3; g.beginPath(); g.moveTo(200, 120); g.quadraticCurveTo(260, 200, 220, 310); g.stroke(); g.strokeStyle = '#8a6a3a'; for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(360, 210, 30 + k * 20, 20 + k * 12, .3, 0, TAU); g.stroke(); } g.fillStyle = '#c82a2a'; [[300, 170], [380, 240], [420, 150]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 6, 0, TAU); g.fill(); });
    g.fillStyle = '#e8dcb8'; g.fillRect(560, 120, 220, 160); for (let k = 0; k < 6; k++) { g.fillStyle = '#2a2a2a'; g.fillRect(580, 140 + k * 22, 140 + (k % 3) * 20, 4); }
    g.fillStyle = '#d8d0b8'; g.fillRect(880, 90, 260, 280); for (let y = 96; y < 370; y += 14) { g.fillStyle = '#b8a888'; g.fillRect(886, y, 248, 9); }
    floorboards(g, 520, w, h, '#6a5a4a', 7702); grain(g, w, h, 7703, .05); });

  // Buenos Aires café, 1961: dark wood panels, mirrors, globe lamps
  VP.set('ec_cafe', 1280, 720, (g, w, h) => {
    wood(g, 0, 0, w, 520, '#5a3a22', 7801); for (let k = 0; k < 4; k++) { g.fillStyle = '#c8b8a0'; g.fillRect(80 + k * 300, 90, 220, 220); g.fillStyle = S.mix('#8a9aa8', '#c8d0d8', k / 4); g.fillRect(90 + k * 300, 100, 200, 200); g.fillStyle = S.rgba('#ffffff', .2); g.beginPath(); g.moveTo(100 + k * 300, 300); g.lineTo(180 + k * 300, 100); g.lineTo(210 + k * 300, 100); g.lineTo(130 + k * 300, 300); g.fill(); }
    g.fillStyle = '#3a2412'; g.fillRect(0, 360, w, 160); for (let k = 0; k < 8; k++) { g.strokeStyle = '#2a1a0c'; g.lineWidth = 3; g.strokeRect(20 + k * 160, 380, 140, 120); }
    for (let k = 0; k < 5; k++) { const x = 160 + k * 240; g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 50); g.stroke(); const gr = g.createRadialGradient(x, 70, 4, x, 70, 120); gr.addColorStop(0, S.rgba('#ffe0a0', .9)); gr.addColorStop(.2, S.rgba('#ffe0a0', .5)); gr.addColorStop(1, S.rgba('#ffe0a0', 0)); g.fillStyle = gr; g.fillRect(x - 120, 0, 240, 200); g.fillStyle = '#fff4d8'; g.beginPath(); g.arc(x, 70, 18, 0, TAU); g.fill(); }
    tiles(g, 520, w, h, '#e8e0d0', '#2a2a2a', 7802); grain(g, w, h, 7803, .04); });

  // Damascus party salon: arched niches, inlaid wood band, a patterned floor, brass lamps
  VP.set('ec_salon', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#d8c8a8', 7901); g.fillStyle = '#5a3a22'; g.fillRect(0, 420, w, 100); for (let k = 0; k < 24; k++) { g.fillStyle = k % 2 ? '#c8a040' : '#3a2412'; g.fillRect(k * 54, 430, 26, 12); }
    for (let k = 0; k < 4; k++) { const x = 120 + k * 300; g.fillStyle = '#7a5a3a'; g.beginPath(); g.moveTo(x, 400); g.lineTo(x, 200); g.quadraticCurveTo(x + 80, 90, x + 160, 200); g.lineTo(x + 160, 400); g.fill(); g.fillStyle = '#2a1a2a'; g.beginPath(); g.moveTo(x + 14, 400); g.lineTo(x + 14, 208); g.quadraticCurveTo(x + 80, 110, x + 146, 208); g.lineTo(x + 146, 400); g.fill(); for (let j = 0; j < 3; j++) { g.fillStyle = S.rgba('#ffd890', .9); g.beginPath(); g.arc(x + 40 + j * 40, 300 + (j % 2) * 30, 3, 0, TAU); g.fill(); } }
    for (let k = 0; k < 3; k++) { const x = 270 + k * 300; g.strokeStyle = '#8a6a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 60); g.stroke(); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(x, 74, 16, 0, TAU); g.fill(); const gr = g.createRadialGradient(x, 74, 4, x, 74, 160); gr.addColorStop(0, S.rgba('#ffc870', .7)); gr.addColorStop(1, S.rgba('#ffc870', 0)); g.fillStyle = gr; g.fillRect(x - 160, 0, 320, 260); }
    tiles(g, 520, w, h, '#8a3a2a', '#6a2a1a', 7902); g.strokeStyle = '#d8a040'; g.lineWidth = 4; g.beginPath(); g.ellipse(640, 640, 420, 60, 0, 0, TAU); g.stroke(); grain(g, w, h, 7903, .05); });

  // Damascus from Mount Qasioun, 1962: flat roofs, domes and minarets, the Umayyad Mosque, a road into the city
  VP.set('ec_damhill', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a90c8'], [.45, '#d8e4e8'], [.6, '#f0e4c8'], [1, '#c8b088']]); cloud(g, 400, 90, 1, '#ffffff', 8001);
    ridge(g, w, h, 300, 30, 300, 8002, '#b8b0c0'); roofs(g, w, 330, 120, 8003, false); roofs(g, w, 380, 120, 8004, false);
    g.fillStyle = '#d8c8a8'; g.fillRect(520, 300, 300, 90); dome(g, 670, 300, 46, '#5a7a8a'); minaret(g, 540, 300, 110, '#e8dcc0'); minaret(g, 800, 300, 90, '#e8dcc0'); dome(g, 330, 340, 26, '#8a8a8a'); minaret(g, 1010, 350, 80, '#e0d4b8'); dome(g, 1110, 360, 22, '#6a8a6a');
    g.fillStyle = '#a89068'; g.beginPath(); g.moveTo(0, 470); g.quadraticCurveTo(640, 430, 1280, 480); g.lineTo(w, h); g.lineTo(0, h); g.fill(); S.dabs(g, { x: 0, y: 470, w, h: 250, n: 260, cols: ['#8a7048', '#c8a878', '#6a7a4a'], r0: 4, r1: 14, a0: .3, a1: .6, seed: 8005 });
    g.fillStyle = '#7a7068'; g.beginPath(); g.moveTo(1280, 560); g.quadraticCurveTo(800, 520, 560, 470); g.lineTo(600, 466); g.quadraticCurveTo(820, 500, 1280, 520); g.fill();
    grain(g, w, h, 8006, .04); });
})(window);
