// Mongols / Ain Jalut sets (Village Painterly): summer steppe with felt tents, a dry Mongol camp, the green valley of
// Ain Jalut below Mount Gilboa with its spring, Baghdad on the Tigris at sunset, Cairo's Bab Zuweila gate, a Caspian
// island hut, a Baghdad alley, the Cairo parade square, a blue-tiled Persian iwan, and a parchment map table.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain } = S.JPX;
  const cloud = (g, x, y, s, col, seed) => { const r = S.rng(seed); for (let k = 0; k < 9; k++) { g.fillStyle = S.rgba(k < 3 ? S.mix(col, '#7a8aa0', .35) : col, .9); g.beginPath(); g.ellipse(x + (r() - .5) * 220 * s, y - r() * 50 * s + (k < 3 ? 20 * s : 0), (50 + r() * 60) * s, (26 + r() * 26) * s, 0, 0, TAU); g.fill(); } };
  const ger = (g, x, y, s, felt = '#ece4d2', door = '#a8402a') => { g.fillStyle = S.rgba('#000000', .2); g.beginPath(); g.ellipse(x + 8 * s, y + 2, 66 * s, 9 * s, 0, 0, TAU); g.fill();
    g.fillStyle = felt; g.fillRect(x - 56 * s, y - 40 * s, 112 * s, 40 * s); g.beginPath(); g.moveTo(x - 60 * s, y - 38 * s); g.quadraticCurveTo(x, y - 92 * s, x + 60 * s, y - 38 * s); g.fill();
    g.fillStyle = S.mix(felt, '#5a4a3a', .3); g.fillRect(x + 20 * s, y - 40 * s, 36 * s, 40 * s); g.beginPath(); g.moveTo(x + 10 * s, y - 52 * s); g.quadraticCurveTo(x + 40 * s, y - 50 * s, x + 60 * s, y - 38 * s); g.lineTo(x + 56 * s, y - 40 * s); g.fill();
    g.strokeStyle = S.rgba('#6a4a2a', .7); g.lineWidth = 2 * s; [-.62, -.32].forEach(q => { g.beginPath(); g.moveTo(x - 56 * s, y + q * 60 * s); g.lineTo(x + 56 * s, y + q * 60 * s); g.stroke(); });
    g.fillStyle = door; g.fillRect(x - 12 * s, y - 30 * s, 22 * s, 30 * s); g.fillStyle = '#5a4a3a'; g.fillRect(x - 6 * s, y - 86 * s, 12 * s, 8 * s); };
  const grass = (g, w, y, hh, cols, seed, n = 900) => S.strokes(g, { x: 0, y, w, h: hh, n, cols, l0: 8, l1: 24, ang: -Math.PI / 2, jit: .45, w0: 1, w1: 2.4, a0: .35, a1: .8, seed });
  const palm = (g, x, y, s, col = '#3a5a2a') => { g.strokeStyle = '#6a4a2a'; g.lineWidth = 7 * s; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 12 * s, y - 60 * s, x + 4 * s, y - 120 * s); g.stroke();
    for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * .42; g.strokeStyle = col; g.lineWidth = 5 * s; g.beginPath(); g.moveTo(x + 4 * s, y - 120 * s); g.quadraticCurveTo(x + 4 * s + Math.cos(a) * 40 * s, y - 120 * s + Math.sin(a) * 30 * s - 10 * s, x + 4 * s + Math.cos(a) * 70 * s, y - 120 * s + Math.sin(a) * 30 * s + 26 * s); g.stroke(); } };
  const olive = (g, x, y, s, seed) => { const r = S.rng(seed); g.fillStyle = '#5a4430'; g.fillRect(x - 3 * s, y - 26 * s, 7 * s, 26 * s); for (let k = 0; k < 7; k++) { g.fillStyle = S.mix('#6a7a4a', k % 2 ? '#a8b888' : '#3a4a2a', .3 * r()); g.beginPath(); g.ellipse(x + (r() - .5) * 40 * s, y - 34 * s - r() * 20 * s, (16 + r() * 10) * s, (10 + r() * 6) * s, 0, 0, TAU); g.fill(); } };
  const dome = (g, x, y, r, col, tip = '#c8a040') => { g.fillStyle = col; g.beginPath(); g.moveTo(x - r, y); g.quadraticCurveTo(x - r, y - r * 1.3, x, y - r * 1.5); g.quadraticCurveTo(x + r, y - r * 1.3, x + r, y); g.fill(); g.fillStyle = S.rgba('#ffffff', .18); g.beginPath(); g.ellipse(x - r * .4, y - r * .8, r * .18, r * .45, -.3, 0, TAU); g.fill(); g.strokeStyle = tip; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - r * 1.5); g.lineTo(x, y - r * 1.5 - 14); g.stroke(); };
  const minaret = (g, x, y, hgt, col) => { g.fillStyle = col; g.fillRect(x - 7, y - hgt, 14, hgt); g.fillRect(x - 11, y - hgt * .7, 22, 5); g.beginPath(); g.moveTo(x - 7, y - hgt); g.lineTo(x, y - hgt - 22); g.lineTo(x + 7, y - hgt); g.fill(); };
  const bricks = (g, x, y, w, h, base, seed) => { g.fillStyle = base; g.fillRect(x, y, w, h); S.dabs(g, { x, y, w, h, n: Math.round(w * h / 500), cols: [S.mix(base, '#000000', .2), S.mix(base, '#ffffff', .15)], r0: 3, r1: 10, a0: .2, a1: .45, seed }); g.strokeStyle = S.rgba(S.mix(base, '#000000', .4), .35); g.lineWidth = 1; for (let yy = y + 16; yy < y + h; yy += 16) { g.beginPath(); g.moveTo(x, yy); g.lineTo(x + w, yy); g.stroke(); for (let xx = x + ((yy / 16) % 2) * 18; xx < x + w; xx += 36) { g.beginPath(); g.moveTo(xx, yy - 16); g.lineTo(xx, yy); g.stroke(); } } };
  const MX = { cloud, ger, grass, palm, olive, dome, minaret, bricks }; S.MGX = MX;

  const steppe = (dry) => (g, w, h) => {
    sky(g, w, h, dry ? [[0, '#6a9ac8'], [.5, '#c8d8e0'], [.6, '#e8dcc0'], [1, '#c8a870']] : [[0, '#3a7ac8'], [.5, '#a8cce8'], [.6, '#d8e8e8'], [1, '#7a9a4a']]);
    cloud(g, 220, 130, 1.3, '#ffffff', 5101); cloud(g, 760, 90, 1.6, '#ffffff', 5102); cloud(g, 1160, 150, 1.1, '#ffffff', 5103);
    ridge(g, w, h, 360, 60, 220, 5104, dry ? '#a8a0b0' : '#8a9ac0'); ridge(g, w, h, 392, 30, 160, 5105, dry ? '#b89a68' : '#6a8a4a');
    g.fillStyle = dry ? '#c8a868' : '#7a9a48'; g.beginPath(); g.moveTo(0, 420); g.quadraticCurveTo(400, 400, 760, 418); g.quadraticCurveTo(1040, 430, 1280, 410); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    grass(g, w, 410, 80, dry ? ['#d8b878', '#a8884a'] : ['#8ab05a', '#5a7a3a', '#a8c870'], 5106, 500);
    [[180, 432, .55], [270, 440, .7], [380, 430, .5], [930, 436, .6], [1040, 444, .75], [1150, 432, .55]].forEach(([x, y, s]) => ger(g, x, y, s, dry ? '#e0d4b8' : '#ece4d2'));
    g.fillStyle = dry ? '#b8985a' : '#6a8a3a'; g.beginPath(); g.moveTo(0, 520); g.quadraticCurveTo(640, 500, 1280, 530); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    grass(g, w, 500, 220, dry ? ['#d8b878', '#a8884a', '#8a6a3a'] : ['#8ab05a', '#5a7a3a', '#a8c870', '#c8d888'], 5107, 1400);
    S.dabs(g, { x: 0, y: 600, w, h: 120, n: 120, cols: dry ? ['#8a6a3a'] : ['#e8d870', '#f0f0e0', '#c87ab0'], r0: 2, r1: 4, a0: .5, a1: .9, seed: 5108 });
    grain(g, w, h, 5109, .04); };
  VP.set('mg_steppe', 1280, 720, steppe(false));
  VP.set('mg_camp', 1280, 720, steppe(true));

  // Ain Jalut: Mount Gilboa on the right, low hills on the left, a green valley floor and the spring with reeds
  VP.set('mg_ainjalut', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a8ac0'], [.45, '#c8d8e0'], [.6, '#f0e0c0'], [1, '#8a9a5a']]);
    cloud(g, 300, 110, 1.1, '#ffffff', 5201); cloud(g, 980, 80, 1.3, '#ffffff', 5202);
    ridge(g, w, h, 330, 40, 260, 5203, '#a8a8c0');
    g.fillStyle = '#8a8a5a'; g.beginPath(); g.moveTo(620, 420); g.quadraticCurveTo(860, 230, 1040, 220); g.quadraticCurveTo(1180, 215, 1280, 260); g.lineTo(1280, 460); g.fill(); g.save(); g.clip();
    S.dabs(g, { x: 700, y: 220, w: 580, h: 220, n: 240, cols: ['#6a7a4a', '#a89a6a', '#5a6a3a'], r0: 4, r1: 14, a0: .3, a1: .6, seed: 5204 }); g.restore();
    g.fillStyle = '#8a9a5a'; g.beginPath(); g.moveTo(0, 330); g.quadraticCurveTo(160, 300, 360, 360); g.quadraticCurveTo(480, 400, 560, 430); g.lineTo(0, 440); g.fill(); g.save(); g.clip();
    S.dabs(g, { x: 0, y: 300, w: 560, h: 140, n: 160, cols: ['#6a7a4a', '#a8a070', '#5a6a3a'], r0: 4, r1: 12, a0: .3, a1: .6, seed: 5205 }); g.restore();
    for (let k = 0; k < 9; k++) olive(g, 40 + k * 56, 380 + (k % 3) * 10, .6, 5206 + k);
    g.fillStyle = '#7a9a48'; g.fillRect(0, 430, w, h - 430);
    grass(g, w, 430, 290, ['#8ab05a', '#5a7a3a', '#a8c870', '#c8c878'], 5210, 1500);
    S.dabs(g, { x: 0, y: 520, w, h: 200, n: 90, cols: ['#e8d870', '#f0f0e0'], r0: 2, r1: 4, a0: .5, a1: .9, seed: 5211 });
    // the spring: a pool with stones and reeds
    g.fillStyle = '#5a6a5a'; g.beginPath(); g.ellipse(330, 636, 150, 34, 0, 0, TAU); g.fill();
    const wg = g.createLinearGradient(0, 610, 0, 660); wg.addColorStop(0, '#9ac8d8'); wg.addColorStop(1, '#4a8aa0'); g.fillStyle = wg; g.beginPath(); g.ellipse(330, 636, 136, 26, 0, 0, TAU); g.fill();
    g.strokeStyle = S.rgba('#ffffff', .5); g.lineWidth = 2; for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(330, 636, 30 + k * 20, 5 + k * 4, 0, Math.PI * 1.1, Math.PI * 1.6); g.stroke(); }
    for (let k = 0; k < 10; k++) { const r = S.rng(5220 + k); g.fillStyle = S.mix('#8a8478', '#d8d0c0', r()); g.beginPath(); g.ellipse(190 + k * 30 + r() * 10, 660 + Math.sin(k) * 6, 14 + r() * 8, 8 + r() * 4, 0, 0, TAU); g.fill(); }
    S.strokes(g, { x: 170, y: 580, w: 60, h: 60, n: 40, cols: ['#5a7a2a', '#8aa04a'], l0: 20, l1: 50, ang: -Math.PI / 2, jit: .2, w0: 1.5, w1: 3, a0: .6, a1: .9, seed: 5230 });
    S.strokes(g, { x: 440, y: 590, w: 50, h: 50, n: 30, cols: ['#5a7a2a', '#8aa04a'], l0: 20, l1: 44, ang: -Math.PI / 2, jit: .2, w0: 1.5, w1: 3, a0: .6, a1: .9, seed: 5231 });
    grain(g, w, h, 5239, .04); });

  // Baghdad on the Tigris at sunset: the far bank skyline of domes and minarets, boats, palms, a near bank promenade
  VP.set('mg_baghdad', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a3a6a'], [.3, '#a85a6a'], [.55, '#f0a050'], [.7, '#f8d090'], [1, '#6a4a3a']]);
    g.fillStyle = S.rgba('#fff0c0', .9); g.beginPath(); g.arc(860, 330, 40, 0, TAU); g.fill();
    for (let k = 0; k < 6; k++) { const r = S.rng(5301 + k); g.fillStyle = S.rgba('#c86a5a', .4); g.beginPath(); g.ellipse(r() * w, 80 + r() * 160, 180, 18, 0, 0, TAU); g.fill(); }
    const far = '#5a3a3a'; g.fillStyle = far;
    g.fillRect(0, 400, w, 70); for (let k = 0; k < 40; k++) { const r = S.rng(5310 + k); g.fillRect(k * 33, 400 - 20 - r() * 40, 30, 70); }
    [[150, 380, 40], [420, 370, 56], [700, 376, 36], [980, 368, 60], [1180, 380, 34]].forEach(([x, y, r]) => dome(g, x, y, r, S.mix(far, '#2a6a7a', .5)));
    [[90, 400, 120], [340, 400, 150], [500, 400, 130], [900, 400, 160], [1060, 400, 120]].forEach(([x, y, hh]) => minaret(g, x, y, hh, S.mix(far, '#000000', .1)));
    g.fillStyle = S.rgba('#ffd890', .8); for (let k = 0; k < 40; k++) { const r = S.rng(5340 + k); g.fillRect(r() * w, 410 + r() * 50, 4, 6); }
    const wg = g.createLinearGradient(0, 470, 0, 590); wg.addColorStop(0, '#e8a060'); wg.addColorStop(1, '#4a4a6a'); g.fillStyle = wg; g.fillRect(0, 470, w, 120);
    g.strokeStyle = S.rgba('#fff0c0', .5); g.lineWidth = 2; for (let k = 0; k < 40; k++) { const r = S.rng(5350 + k); const x = r() * w, y = 476 + r() * 100; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20 + r() * 40, y); g.stroke(); }
    g.fillStyle = S.rgba('#fff0c0', .5); g.fillRect(830, 474, 60, 100);
    g.fillStyle = '#7a5a40'; g.beginPath(); g.moveTo(0, 590); g.lineTo(w, 580); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 590, w, h: 130, n: 300, cols: ['#8a6a4a', '#5a4030', '#a88a6a'], r0: 3, r1: 12, a0: .3, a1: .6, seed: 5360 });
    palm(g, 60, 600, 1.4, '#3a4a2a'); palm(g, 1220, 596, 1.3, '#3a4a2a');
    grain(g, w, h, 5369, .04); });

  // Cairo, Bab Zuweila: two round stone towers either side of a deep arched gate, a dusty street
  VP.set('mg_bab', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a6aa0'], [.6, '#e8c8a0'], [1, '#c8a070']]);
    bricks(g, 0, 160, w, 440, '#b8986a', 5401);
    [[360, 120], [920, 120]].forEach(([x, y]) => { bricks(g, x - 110, y, 220, 480, '#c8a878', 5402 + x); g.fillStyle = S.rgba('#000000', .15); g.fillRect(x + 50, y, 60, 480); g.fillStyle = '#c8a878'; for (let k = 0; k < 7; k++) g.fillRect(x - 110 + k * 34, y - 18, 20, 18); g.fillStyle = '#5a3a2a'; g.fillRect(x - 10, y + 120, 20, 50); g.fillRect(x - 10, y + 260, 20, 50); });
    bricks(g, 470, 160, 340, 440, '#c0a070', 5409);
    g.fillStyle = '#2a1e18'; g.beginPath(); g.moveTo(540, 600); g.lineTo(540, 340); g.quadraticCurveTo(540, 230, 640, 220); g.quadraticCurveTo(740, 230, 740, 340); g.lineTo(740, 600); g.fill();
    g.strokeStyle = '#e8d0a0'; g.lineWidth = 10; g.beginPath(); g.moveTo(530, 600); g.lineTo(530, 340); g.quadraticCurveTo(530, 220, 640, 208); g.quadraticCurveTo(750, 220, 750, 340); g.lineTo(750, 600); g.stroke();
    g.fillStyle = S.rgba('#e8a050', .25); g.fillRect(560, 420, 160, 180);
    g.fillStyle = '#a88a60'; g.fillRect(0, 600, w, 120); S.dabs(g, { x: 0, y: 600, w, h: 120, n: 300, cols: ['#c8a878', '#8a6a48', '#d8c098'], r0: 3, r1: 12, a0: .3, a1: .6, seed: 5410 });
    grain(g, w, h, 5419, .05); });

  // the Caspian island: grey sea, a reed hut on a low sandy island, overcast
  VP.set('mg_island', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a6470'], [.5, '#a8aeb4'], [1, '#7a8088']]);
    for (let k = 0; k < 8; k++) { const r = S.rng(5501 + k); g.fillStyle = S.rgba('#4a525c', .35); g.beginPath(); g.ellipse(r() * w, 60 + r() * 140, 220, 40, 0, 0, TAU); g.fill(); }
    const wg = g.createLinearGradient(0, 360, 0, 720); wg.addColorStop(0, '#8a969e'); wg.addColorStop(1, '#3a4a54'); g.fillStyle = wg; g.fillRect(0, 360, w, 360);
    g.strokeStyle = S.rgba('#e8eef0', .4); g.lineWidth = 2; for (let k = 0; k < 60; k++) { const r = S.rng(5510 + k); const x = r() * w, y = 370 + r() * 340; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 20, y - 4, x + 40 + r() * 30, y); g.stroke(); }
    g.fillStyle = '#c8b890'; g.beginPath(); g.moveTo(380, 560); g.quadraticCurveTo(700, 470, 1280, 500); g.lineTo(1280, 720); g.lineTo(300, 720); g.quadraticCurveTo(300, 600, 380, 560); g.fill();
    S.dabs(g, { x: 340, y: 500, w: 940, h: 220, n: 300, cols: ['#d8c8a0', '#a89870', '#8a7a5a'], r0: 3, r1: 12, a0: .3, a1: .6, seed: 5520 });
    // reed hut
    g.fillStyle = '#8a7048'; g.fillRect(860, 400, 300, 140); g.fillStyle = '#a88a58'; g.beginPath(); g.moveTo(840, 410); g.lineTo(1010, 330); g.lineTo(1180, 410); g.fill();
    S.strokes(g, { x: 860, y: 340, w: 300, h: 200, n: 260, cols: ['#c8a868', '#6a5030'], l0: 14, l1: 30, ang: -Math.PI / 2, jit: .15, w0: 1, w1: 2, a0: .4, a1: .7, seed: 5530 });
    g.fillStyle = '#2a2018'; g.fillRect(960, 450, 70, 90);
    S.strokes(g, { x: 380, y: 520, w: 400, h: 60, n: 80, cols: ['#8a8a5a', '#5a5a3a'], l0: 10, l1: 26, ang: -Math.PI / 2, jit: .4, w0: 1, w1: 2, a0: .5, a1: .8, seed: 5531 });
    grain(g, w, h, 5539, .05); });

  // a Baghdad alley: mud-brick houses, wooden doors, an arch at the end
  VP.set('mg_alley', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a7a6a'], [1, '#c8b8a0']]);
    bricks(g, 0, 60, 420, 560, '#b8986a', 5601); bricks(g, 860, 60, 420, 560, '#a88a60', 5602);
    g.fillStyle = '#c0a070'; g.beginPath(); g.moveTo(420, 120); g.lineTo(560, 220); g.lineTo(560, 560); g.lineTo(420, 620); g.fill();
    g.fillStyle = '#a88a60'; g.beginPath(); g.moveTo(860, 120); g.lineTo(720, 220); g.lineTo(720, 560); g.lineTo(860, 620); g.fill();
    bricks(g, 560, 220, 160, 340, '#c8a878', 5603); g.fillStyle = '#4a3a2e'; g.beginPath(); g.moveTo(600, 560); g.lineTo(600, 400); g.quadraticCurveTo(640, 350, 680, 400); g.lineTo(680, 560); g.fill();
    [[120, 360], [280, 380], [1000, 360], [1150, 380]].forEach(([x, y]) => { g.fillStyle = '#2a1e16'; g.fillRect(x - 40, y, 80, 240); });
    g.fillStyle = '#7a5a3a'; g.fillRect(80, 620 - 260, 30, 240); g.fillStyle = '#6a4a2e'; g.save(); g.translate(1110, 380); g.transform(1, .25, 0, 1, 0, 0); g.fillRect(0, 0, 40, 236); g.restore();
    [[60, 160], [300, 180], [980, 160], [1180, 190]].forEach(([x, y]) => { g.fillStyle = '#5a3a24'; g.fillRect(x - 40, y, 80, 70); g.strokeStyle = '#3a2414'; g.lineWidth = 3; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x - 40 + k * 20, y); g.lineTo(x - 40 + k * 20, y + 70); g.stroke(); } });
    g.fillStyle = '#8a7058'; g.beginPath(); g.moveTo(0, 620); g.lineTo(420, 620); g.lineTo(560, 560); g.lineTo(720, 560); g.lineTo(860, 620); g.lineTo(w, 620); g.lineTo(w, h); g.lineTo(0, h); g.fill();
    S.dabs(g, { x: 0, y: 560, w, h: 160, n: 260, cols: ['#a88a6a', '#5a4030', '#9a8060'], r0: 3, r1: 12, a0: .3, a1: .6, seed: 5610 });
    grain(g, w, h, 5619, .05); });

  // Cairo parade square: sandy ground, the citadel wall, palace steps on the left, Muqattam hills behind
  VP.set('mg_square', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a7ab0'], [.55, '#e0d0b0'], [1, '#c8a878']]);
    ridge(g, w, h, 300, 30, 200, 5701, '#c8a878');
    bricks(g, 0, 280, w, 140, '#c8a878', 5702); g.fillStyle = '#c8a878'; for (let k = 0; k < 40; k++) g.fillRect(k * 34, 266, 22, 16);
    dome(g, 980, 280, 50, '#a89a80'); minaret(g, 1080, 280, 120, '#b8a888');
    g.fillStyle = '#d8b880'; g.fillRect(0, 420, w, 300); S.dabs(g, { x: 0, y: 420, w, h: 300, n: 400, cols: ['#e8c890', '#b89860', '#c8a878'], r0: 3, r1: 14, a0: .3, a1: .6, seed: 5703 });
    // palace steps
    for (let k = 0; k < 5; k++) { g.fillStyle = S.mix('#e0d0b0', '#8a7a60', k * .12); g.fillRect(0, 470 + k * 26, 330 - k * 30, 26); g.fillStyle = S.rgba('#000000', .15); g.fillRect(0, 470 + k * 26 + 22, 330 - k * 30, 4); }
    g.fillStyle = '#e0d0b0'; g.fillRect(0, 300, 260, 170); g.fillStyle = '#4a3a2e'; g.beginPath(); g.moveTo(90, 470); g.lineTo(90, 370); g.quadraticCurveTo(130, 320, 170, 370); g.lineTo(170, 470); g.fill();
    grain(g, w, h, 5709, .04); });

  // Persian iwan: a tall blue-tiled arch, tiled walls, a long pool, carpets
  VP.set('mg_iwan', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ac8'], [1, '#e8e0d0']]);
    bricks(g, 0, 60, w, 520, '#d8c8a8', 5801);
    const tile = (x, y, ww, hh) => { g.fillStyle = '#2a6a9a'; g.fillRect(x, y, ww, hh); for (let yy = y; yy < y + hh; yy += 24) for (let xx = x; xx < x + ww; xx += 24) { g.fillStyle = (xx / 24 + yy / 24) % 2 ? '#3a8ab8' : '#1e4a7a'; g.beginPath(); g.moveTo(xx + 12, yy); g.lineTo(xx + 24, yy + 12); g.lineTo(xx + 12, yy + 24); g.lineTo(xx, yy + 12); g.fill(); g.fillStyle = '#e8d8a0'; g.beginPath(); g.arc(xx + 12, yy + 12, 3, 0, TAU); g.fill(); } };
    tile(380, 60, 520, 520);
    g.fillStyle = '#3a2a2a'; g.beginPath(); g.moveTo(470, 580); g.lineTo(470, 260); g.quadraticCurveTo(470, 110, 640, 90); g.quadraticCurveTo(810, 110, 810, 260); g.lineTo(810, 580); g.fill();
    g.strokeStyle = '#e8c870'; g.lineWidth = 8; g.beginPath(); g.moveTo(460, 580); g.lineTo(460, 260); g.quadraticCurveTo(460, 100, 640, 80); g.quadraticCurveTo(820, 100, 820, 260); g.lineTo(820, 580); g.stroke();
    for (let k = 0; k < 6; k++) { g.fillStyle = S.rgba('#c8a040', .5); g.beginPath(); g.moveTo(500 + k * 46, 140 + Math.abs(k - 2.5) * 20); g.lineTo(520 + k * 46, 200); g.lineTo(480 + k * 46, 200); g.fill(); }
    tile(40, 200, 220, 380); tile(1020, 200, 220, 380);
    g.fillStyle = '#c8b090'; g.fillRect(0, 580, w, 140); g.fillStyle = '#8a2a2a'; g.fillRect(380, 590, 520, 130); g.strokeStyle = '#e8c870'; g.lineWidth = 4; g.strokeRect(392, 600, 496, 110);
    grain(g, w, h, 5809, .04); });
})(window);
