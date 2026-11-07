// New Year history sets (Village Painterly): Times Square at night, Babylon's ziggurat at spring sunrise, barley fields,
// a Chinese village at dusk with lanterns, early Rome on its hills, the Roman senate, the shrine of Janus, a Roman
// workshop, a snowy medieval village, a Vatican hall, a 1918 Moscow street in snow, and a modern party sofa at night.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain } = S.JPX; const MX = S.MGX;
  const R = S.rng;
  const cloud = (g, x, y, s, col, seed) => MX.cloud(g, x, y, s, col, seed);
  const ground = (g, w, h, y, cols, seed) => { g.fillStyle = cols[0]; g.fillRect(0, y, w, h - y); S.dabs(g, { x: 0, y, w, h: h - y, n: 420, cols, r0: 3, r1: 14, a0: .25, a1: .6, seed }); };
  const cobbles = (g, w, y0, y1, base, seed) => { const r = R(seed); g.fillStyle = base; g.fillRect(0, y0, w, y1 - y0);
    for (let y = y0 + 4; y < y1; y += 9 + (y - y0) * .05) for (let x = (y * 7) % 20; x < w; x += 16 + (y - y0) * .08) { g.fillStyle = S.mix(base, r() < .5 ? '#000000' : '#ffffff', .1 + r() * .15); g.beginPath(); g.ellipse(x + r() * 4, y, 6 + (y - y0) * .04, 3 + (y - y0) * .02, 0, 0, TAU); g.fill(); } };
  const windowsGrid = (g, x, y, w, h, cols, rows, lit, dark, seed) => { const r = R(seed), cw = w / cols, rh = h / rows;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { g.fillStyle = r() < .65 ? S.mix(lit, '#ffffff', r() * .3) : dark; g.fillRect(x + i * cw + cw * .2, y + j * rh + rh * .2, cw * .6, rh * .55); } };
  const snowfall = (g, w, h, seed, n = 260) => { const r = R(seed); g.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < n; k++) { g.beginPath(); g.arc(r() * w, r() * h * .85, 1 + r() * 2, 0, TAU); g.fill(); } };
  const snowcap = (g, x, y, w, d = 8) => { g.fillStyle = '#f4f6fa'; g.beginPath(); g.moveTo(x - 3, y + 2); for (let k = 0; k <= 8; k++) g.lineTo(x - 3 + (w + 6) * k / 8, y - d * .5 - Math.sin(k * 2.1) * d * .4); g.lineTo(x + w + 3, y + 2); g.quadraticCurveTo(x + w * .5, y + d * .6, x - 3, y + 2); g.fill(); };
  const lantern = (g, x, y, s) => { g.strokeStyle = '#3a1a10'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y - 20 * s); g.lineTo(x, y - 12 * s); g.stroke(); S.glow(g, x, y, 40 * s, '#ff8a40', .35);
    g.fillStyle = '#d8281e'; g.beginPath(); g.ellipse(x, y, 11 * s, 13 * s, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,220,120,.5)'; g.beginPath(); g.ellipse(x - 3 * s, y - 2 * s, 4 * s, 8 * s, 0, 0, TAU); g.fill(); g.fillStyle = '#e8b040'; g.fillRect(x - 6 * s, y - 14 * s, 12 * s, 3 * s); g.fillRect(x - 6 * s, y + 11 * s, 12 * s, 3 * s); g.fillStyle = '#c8281e'; g.fillRect(x - 1 * s, y + 14 * s, 2 * s, 8 * s); };
  const column = (g, x, y, w, h, col, sh) => { g.fillStyle = col; g.fillRect(x, y - h, w, h); g.fillStyle = sh; g.fillRect(x + w * .65, y - h, w * .35, h); g.strokeStyle = S.rgba(sh, .5); g.lineWidth = 1; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x + w * k / 4, y - h); g.lineTo(x + w * k / 4, y); g.stroke(); } g.fillStyle = S.mix(col, '#ffffff', .2); g.fillRect(x - 6, y - h - 10, w + 12, 10); g.fillRect(x - 6, y - 8, w + 12, 8); };
  const pediment = (g, x, y, w, col, sh) => { g.fillStyle = col; g.fillRect(x, y - 22, w, 22); g.beginPath(); g.moveTo(x - 8, y - 22); g.lineTo(x + w / 2, y - 22 - w * .2); g.lineTo(x + w + 8, y - 22); g.fill(); g.fillStyle = sh; g.beginPath(); g.moveTo(x + 14, y - 28); g.lineTo(x + w / 2, y - 22 - w * .2 + 10); g.lineTo(x + w - 14, y - 28); g.fill(); };
  const cypress = (g, x, y, hh) => { g.fillStyle = '#2a4a2a'; g.beginPath(); g.moveTo(x, y - hh); g.quadraticCurveTo(x + hh * .16, y - hh * .5, x + hh * .05, y); g.lineTo(x - hh * .05, y); g.quadraticCurveTo(x - hh * .16, y - hh * .5, x, y - hh); g.fill(); g.fillStyle = 'rgba(140,170,90,.35)'; g.beginPath(); g.ellipse(x - hh * .04, y - hh * .55, hh * .04, hh * .3, 0, 0, TAU); g.fill(); };
  const NX = { cobbles, ground, snowfall, snowcap, lantern, column, pediment, cypress, windowsGrid }; S.NYX = NX;

  // ---------- Times Square at night: towers of billboards, the ball tower in the middle, crowd street ----------
  VP.set('ny_times', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0a0a24'], [.45, '#1e1a4a'], [.7, '#4a2a5a'], [1, '#1a1020']]);
    const r = R(7001); g.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 90; k++) g.fillRect(r() * w, r() * 220, 1.5, 1.5);
    // far skyline
    for (let k = 0; k < 30; k++) { const x = k * 46 - 20, bh = 160 + R(7010 + k)() * 200; g.fillStyle = '#1a1838'; g.fillRect(x, 470 - bh, 44, bh); windowsGrid(g, x, 470 - bh, 44, bh, 4, Math.round(bh / 14), '#e8c880', '#141230', 7020 + k); }
    // flanking billboard towers
    const BB = [['#e8303a', '#ffd040'], ['#2a8ae8', '#ffffff'], ['#f0a020', '#2a1a0a'], ['#30c080', '#0a2a1a'], ['#c040c0', '#ffffff'], ['#e8e040', '#e8303a']];
    const tower = (x, tw, top, side) => { g.fillStyle = '#24223a'; g.fillRect(x, top, tw, 600 - top); g.fillStyle = S.rgba('#000000', .3); g.fillRect(side > 0 ? x + tw * .8 : x, top, tw * .2, 600 - top);
      for (let k = 0, y = top + 14; y < 520; k++) { const bh = 50 + (k * 37 % 50), [a, b] = BB[(k + (x | 0)) % BB.length]; S.glow(g, x + tw / 2, y + bh / 2, tw * .7, a, .25);
        const bg = g.createLinearGradient(x, y, x + tw, y + bh); bg.addColorStop(0, a); bg.addColorStop(1, S.mix(a, '#000000', .35)); g.fillStyle = bg; g.fillRect(x + 8, y, tw - 16, bh);
        g.fillStyle = b; g.globalAlpha = .85; for (let j = 0; j < 3; j++) g.fillRect(x + 18 + j * (tw - 40) / 3, y + bh * .35, (tw - 50) / 3, bh * .14 + (j % 2) * 6); g.fillRect(x + 18, y + bh * .65, tw * .5, 6); g.globalAlpha = 1; y += bh + 14; } };
    tower(-10, 260, 60, 1); tower(250, 170, 200, 1); tower(860, 170, 200, -1); tower(1030, 260, 60, -1);
    // One Times Square with the ball pole
    g.fillStyle = '#2c2a44'; g.beginPath(); g.moveTo(500, 600); g.lineTo(520, 150); g.lineTo(760, 150); g.lineTo(780, 600); g.fill(); g.fillStyle = S.rgba('#000000', .25); g.fillRect(700, 150, 70, 450);
    [[540, 330, '#e8303a'], [540, 420, '#2a8ae8'], [540, 500, '#ffd040']].forEach(([x, y, col]) => { S.glow(g, 640, y + 30, 200, col, .3); g.fillStyle = col; g.fillRect(x - 10, y, 220, 64); g.fillStyle = 'rgba(255,255,255,.8)'; g.fillRect(x + 10, y + 22, 180, 8); g.fillRect(x + 10, y + 38, 120, 6); });
    g.fillStyle = '#1a1a2a'; g.fillRect(540, 170, 200, 140); g.fillStyle = '#ffd88a'; g.font = 'bold 54px Anton, sans-serif'; g.textAlign = 'center'; g.fillText('2027', 640, 262);
    g.strokeStyle = '#8a8aa0'; g.lineWidth = 6; g.beginPath(); g.moveTo(640, 150); g.lineTo(640, 20); g.stroke(); g.lineWidth = 2; [[600, 150, 640, 60], [680, 150, 640, 60]].forEach(([a, b, c2, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); });
    // street with light pools and tarmac
    const st = g.createLinearGradient(0, 590, 0, h); st.addColorStop(0, '#3a2a4a'); st.addColorStop(1, '#14101e'); g.fillStyle = st; g.fillRect(0, 590, w, h - 590);
    for (let k = 0; k < 14; k++) { const r2 = R(7050 + k); S.glow(g, r2() * w, 620 + r2() * 90, 80, BB[k % 6][0], .18); }
    g.strokeStyle = 'rgba(255,240,200,.3)'; g.lineWidth = 3; for (let x = 0; x < w; x += 90) { g.beginPath(); g.moveTo(x, 660); g.lineTo(x + 50, 660); g.stroke(); }
    grain(g, w, h, 7099, .04); });

  // ---------- Babylon at sunrise: stepped ziggurat, mud-brick walls, palms, the Euphrates ----------
  VP.set('ny_babylon', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a7ab8'], [.35, '#f0b890'], [.55, '#ffd8a0'], [.7, '#f0c888'], [1, '#b8885a']]);
    S.glow(g, 980, 400, 300, '#ffe0a0', .7); g.fillStyle = '#fff4d0'; g.beginPath(); g.arc(980, 400, 36, 0, TAU); g.fill();
    cloud(g, 260, 140, 1.1, '#ffe8d8', 7101); cloud(g, 820, 110, .9, '#ffd8c8', 7102);
    ridge(g, w, h, 430, 30, 200, 7103, '#c89a78');
    // ziggurat: 4 stepped terraces with a temple on top and a central stair
    const zx = 560, zb = 520; const terr = [[420, 70, '#c8945a'], [320, 62, '#d0a066'], [230, 56, '#d8aa72'], [150, 50, '#e0b47e']]; let y = zb;
    terr.forEach(([tw, th, col], i) => { MX.bricks(g, zx - tw / 2, y - th, tw, th, col, 7110 + i); g.fillStyle = S.rgba('#5a3018', .35); g.fillRect(zx + tw * .18, y - th, tw * .32, th); g.fillStyle = S.rgba('#fff0d0', .35); g.fillRect(zx - tw / 2, y - th, tw, 4);
      g.fillStyle = S.rgba('#3a2010', .4); for (let k = 0; k < tw / 30; k++) g.fillRect(zx - tw / 2 + 10 + k * 30, y - th + 12, 6, th - 16); y -= th; });
    g.fillStyle = '#4a6ab0'; g.fillRect(zx - 40, y - 46, 80, 46); g.fillStyle = '#c8a040'; g.fillRect(zx - 44, y - 50, 88, 6); g.fillStyle = '#2a1a10'; g.fillRect(zx - 10, y - 30, 20, 30);
    g.fillStyle = '#b8845a'; g.beginPath(); g.moveTo(zx - 30, zb); g.lineTo(zx - 12, y); g.lineTo(zx + 12, y); g.lineTo(zx + 30, zb); g.fill(); g.strokeStyle = S.rgba('#5a3018', .5); g.lineWidth = 1; for (let k = zb; k > y; k -= 7) { const q = (zb - k) / (zb - y); g.beginPath(); g.moveTo(zx - 30 + 18 * q, k); g.lineTo(zx + 30 - 18 * q, k); g.stroke(); }
    // city walls with blue-glazed gate
    MX.bricks(g, 0, 500, w, 90, '#c89868', 7120); for (let x = 0; x < w; x += 40) { g.fillStyle = '#c89868'; g.fillRect(x, 486, 24, 14); }
    MX.bricks(g, 120, 440, 150, 150, '#3a5a9a', 7121); g.fillStyle = '#e8c860'; for (let k = 0; k < 5; k++) { g.beginPath(); g.ellipse(145 + k * 25, 470, 7, 4, 0, 0, TAU); g.fill(); } g.fillStyle = '#2a1a10'; g.beginPath(); g.moveTo(165, 590); g.lineTo(165, 520); g.quadraticCurveTo(195, 490, 225, 520); g.lineTo(225, 590); g.fill();
    // palms and the river edge
    [[40, 600, 1.3], [330, 596, 1.1], [860, 598, 1.2], [1180, 602, 1.4]].forEach(([x, y2, s]) => MX.palm(g, x, y2, s, '#4a6a2a'));
    ground(g, w, h, 590, ['#c8a070', '#a88050', '#e0c090'], 7130);
    grain(g, w, h, 7199, .05); });

  // ---------- spring barley fields at sunrise ----------
  VP.set('ny_fields', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.45, '#f8d0a0'], [.62, '#ffe8c0'], [1, '#8aa050']]);
    S.glow(g, 640, 430, 260, '#fff0c0', .8); g.fillStyle = '#fffbe8'; g.beginPath(); g.arc(640, 430, 30, 0, TAU); g.fill();
    cloud(g, 200, 160, 1, '#fff0e8', 7201); cloud(g, 1050, 130, 1.2, '#ffe8e0', 7202);
    ridge(g, w, h, 440, 24, 160, 7203, '#9aa07a'); ridge(g, w, h, 460, 16, 120, 7204, '#7a9a4a');
    for (let k = 0; k < 9; k++) { const y = 470 + k * k * 3.2, col = k % 2 ? '#7aa040' : '#8ab04a'; g.fillStyle = col; g.fillRect(0, y, w, 40); MX.grass(g, w, y, 30, ['#5a8a2a', '#a8c860', '#4a7a22'], 7210 + k, 260 + k * 60); }
    g.strokeStyle = 'rgba(80,120,200,.6)'; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 560); g.quadraticCurveTo(400, 540, 700, 580); g.quadraticCurveTo(1000, 610, 1280, 590); g.stroke();
    [[90, 520, 1], [1190, 520, .9]].forEach(([x, y, s]) => MX.palm(g, x, y, s, '#3a5a22'));
    ground(g, w, h, 640, ['#7a5a3a', '#5a4028', '#8a6a48'], 7230); MX.grass(g, w, 620, 30, ['#6a9a32', '#9ac050'], 7231, 500);
    grain(g, w, h, 7299, .04); });

  // ---------- Chinese village at dusk: tiled roofs with upturned eaves, red gate, lantern lines ----------
  VP.set('ny_china', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2a5a'], [.4, '#8a4a6a'], [.6, '#e88a5a'], [1, '#5a3a3a']]);
    ridge(g, w, h, 330, 70, 120, 7301, '#5a4a6a'); ridge(g, w, h, 380, 50, 90, 7302, '#4a3a4a');
    const house = (x, y, hw, hh, roofc, wall) => { g.fillStyle = wall; g.fillRect(x, y - hh, hw, hh); g.fillStyle = S.rgba('#000000', .25); g.fillRect(x + hw * .7, y - hh, hw * .3, hh);
      g.fillStyle = '#ffcf70'; g.fillRect(x + hw * .15, y - hh * .7, hw * .18, hh * .32); g.fillRect(x + hw * .55, y - hh * .7, hw * .18, hh * .32); g.fillStyle = '#6a1a12'; g.fillRect(x + hw * .4, y - hh * .55, hw * .12, hh * .55);
      g.fillStyle = roofc; g.beginPath(); g.moveTo(x - hw * .18, y - hh - 4); g.quadraticCurveTo(x - hw * .1, y - hh + 6, x - hw * .22, y - hh - 14); g.lineTo(x + hw * .1, y - hh - hh * .55); g.lineTo(x + hw * .9, y - hh - hh * .55); g.lineTo(x + hw * 1.22, y - hh - 14); g.quadraticCurveTo(x + hw * 1.1, y - hh + 6, x + hw * 1.18, y - hh - 4); g.fill();
      g.strokeStyle = S.rgba('#000000', .3); g.lineWidth = 1; for (let k = 0; k < 10; k++) { const xx = x + hw * (.05 + k * .1); g.beginPath(); g.moveTo(xx, y - hh - hh * .5); g.lineTo(xx - 4, y - hh - 6); g.stroke(); } };
    [[60, 520, 220, 120, '#3a3a4a', '#c8a888'], [380, 500, 180, 100, '#2a3a3a', '#b89878'], [880, 510, 200, 110, '#3a3a4a', '#c8a888'], [1100, 525, 200, 125, '#2a3040', '#b8987a']].forEach(a => house(...a));
    // red paifang gate in the middle
    g.fillStyle = '#b8281e'; g.fillRect(600, 330, 24, 260); g.fillRect(780, 330, 24, 260); g.fillStyle = '#8a1a12'; g.fillRect(612, 330, 10, 260); g.fillRect(792, 330, 10, 260);
    g.fillStyle = '#2a2a3a'; g.beginPath(); g.moveTo(560, 330); g.quadraticCurveTo(580, 316, 570, 300); g.lineTo(840, 300); g.quadraticCurveTo(830, 316, 846, 330); g.fill(); g.fillStyle = '#b8281e'; g.fillRect(590, 330, 226, 20); g.fillStyle = '#e8b040'; g.fillRect(668, 352, 70, 34); g.fillStyle = '#8a1a12'; g.font = 'bold 26px serif'; g.textAlign = 'center'; g.fillText('福', 703, 379);
    // lantern strings
    [[0, 360, 600, 340], [804, 340, 1280, 370]].forEach(([a, b, c2, d]) => { g.strokeStyle = '#2a1a10'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo((a + c2) / 2, b + 40, c2, d); g.stroke(); for (let k = 1; k < 6; k++) { const q = k / 6, x = a + (c2 - a) * q, y = b + (d - b) * q + 40 * 4 * q * (1 - q) * .5; lantern(g, x, y + 22, .9); } });
    cobbles(g, w, 590, h, '#7a6a5a', 7330);
    grain(g, w, h, 7399, .04); });

  // ---------- early Rome on its hills by the Tiber, spring ----------
  VP.set('ny_rome', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a8ad0'], [.55, '#c8e0f0'], [1, '#8aa060']]);
    cloud(g, 300, 120, 1.3, '#ffffff', 7401); cloud(g, 950, 160, 1, '#ffffff', 7402);
    ridge(g, w, h, 380, 60, 220, 7403, '#8aa0b8'); ridge(g, w, h, 440, 90, 170, 7404, '#6a9a4a');
    const temple = (x, y, tw, col) => { for (let k = 0; k < 5; k++) column(g, x + k * tw / 4.6, y, tw / 14, tw * .42, col, S.mix(col, '#6a5a4a', .4)); pediment(g, x - 6, y - tw * .42 - 8, tw + 4, col, S.mix(col, '#6a5a4a', .3)); g.fillStyle = '#a8402a'; g.beginPath(); g.moveTo(x - 10, y - tw * .42 - 30); g.lineTo(x + tw / 2, y - tw * .42 - 30 - tw * .2); g.lineTo(x + tw + 6, y - tw * .42 - 30); g.closePath(); g.globalAlpha = .4; g.fill(); g.globalAlpha = 1; };
    temple(470, 400, 160, '#ece4d2'); temple(820, 420, 120, '#e4dccb');
    S.SPX.town(g, { x: 0, y: 420, w, h: 110, n: 120, seed: 7410, scale: 1.4, wall: '#e8d8b8', wall2: '#d8b890', roof: '#b85a3a', roof2: '#9a4a2a', shade: '#6a4a3a', rim: '#fff0d0', dark: '#3a2a1a' });
    [100, 230, 1080, 1200].forEach((x, i) => cypress(g, x, 540, 120 + i * 10));
    // the Tiber
    const rv = g.createLinearGradient(0, 540, 0, 590); rv.addColorStop(0, '#6a9ac0'); rv.addColorStop(1, '#3a6a8a'); g.fillStyle = rv; g.beginPath(); g.moveTo(0, 548); g.quadraticCurveTo(640, 530, 1280, 556); g.lineTo(1280, 590); g.lineTo(0, 590); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 2; for (let k = 0; k < 30; k++) { const r2 = R(7420 + k), x = r2() * w, y = 552 + r2() * 30; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 20, y); g.stroke(); }
    ground(g, w, h, 590, ['#a8946a', '#8a7450', '#c8b088'], 7430); MX.grass(g, w, 588, 18, ['#6a9a3a', '#8ab04a'], 7431, 400);
    // blossom tree
    g.fillStyle = '#5a3a2a'; g.fillRect(1150, 520, 12, 80); for (let k = 0; k < 40; k++) { const r2 = R(7440 + k); g.fillStyle = S.rgba(r2() < .5 ? '#f8c8d8' : '#ffe8f0', .85); g.beginPath(); g.arc(1156 + (r2() - .5) * 120, 500 + (r2() - .5) * 60, 8 + r2() * 10, 0, TAU); g.fill(); }
    grain(g, w, h, 7499, .04); });

  // ---------- Roman senate hall: columns, marble floor, red benches, a calendar wall ----------
  VP.set('ny_senate', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#d8ccb8'], [1, '#b8a890']]);
    MX.bricks(g, 0, 0, w, 600, '#d8ccb4', 7501); g.fillStyle = S.rgba('#5a4a3a', .12); g.fillRect(0, 0, w, 600);
    for (let k = 0; k < 7; k++) column(g, 40 + k * 200, 600, 60, 520, '#efe8da', '#b8ac98');
    g.fillStyle = '#c8b898'; g.fillRect(0, 60, w, 24); g.fillStyle = '#a8402a'; g.fillRect(0, 84, w, 6);
    // calendar wall between the middle columns
    g.fillStyle = '#9a8a72'; g.fillRect(470, 150, 340, 260); g.fillStyle = '#efe6d2'; g.fillRect(482, 162, 316, 236);
    // red curtains
    [[250, 1], [1030, -1]].forEach(([x, d]) => { g.fillStyle = '#8a1a1a'; g.beginPath(); g.moveTo(x - 60, 90); g.quadraticCurveTo(x, 300, x + 40 * d, 560); g.lineTo(x + 80 * d, 560); g.quadraticCurveTo(x + 40 * d, 300, x + 60, 90); g.fill(); });
    // tiered benches
    for (let k = 0; k < 3; k++) { g.fillStyle = S.mix('#7a2a22', '#3a1410', k * .3); g.fillRect(0, 480 + k * 40, w, 22); g.fillStyle = S.rgba('#000000', .25); g.fillRect(0, 502 + k * 40, w, 6); }
    const fl = g.createLinearGradient(0, 600, 0, h); fl.addColorStop(0, '#d8d0c0'); fl.addColorStop(1, '#a89c88'); g.fillStyle = fl; g.fillRect(0, 600, w, h - 600);
    g.strokeStyle = 'rgba(90,70,50,.25)'; for (let x = -400; x < w + 400; x += 90) { g.beginPath(); g.moveTo(640 + (x - 640) * .4, 600); g.lineTo(x, h); g.stroke(); } for (let y = 620; y < h; y += 28) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    grain(g, w, h, 7599, .04); });

  // ---------- shrine of Janus: twin gates, bronze doors, the two-faced statue on a plinth ----------
  VP.set('ny_janus', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a8ac0'], [.6, '#f0d8b0'], [1, '#c8a878']]);
    cloud(g, 200, 120, 1, '#fff4e8', 7601); cloud(g, 1060, 100, 1.2, '#fff0e0', 7602);
    S.SPX.town(g, { x: 0, y: 400, w, h: 80, n: 60, seed: 7610, scale: 1.2, wall: '#e0d0b0', wall2: '#c8b090', roof: '#b85a3a', roof2: '#9a4a2a', shade: '#6a4a3a', rim: '#fff0d0', dark: '#3a2a1a' });
    // shrine block
    MX.bricks(g, 300, 220, 680, 380, '#d8c8a8', 7620); g.fillStyle = S.rgba('#000000', .15); g.fillRect(860, 220, 120, 380);
    g.fillStyle = '#c8b898'; g.fillRect(290, 206, 700, 18);
    [[330, 1], [790, -1]].forEach(([x]) => { g.fillStyle = '#3a2a1a'; g.beginPath(); g.moveTo(x, 600); g.lineTo(x, 380); g.quadraticCurveTo(x + 80, 300, x + 160, 380); g.lineTo(x + 160, 600); g.fill();
      const bz = g.createLinearGradient(x, 380, x + 160, 600); bz.addColorStop(0, '#a87a3a'); bz.addColorStop(1, '#5a3a1a'); g.fillStyle = bz; g.fillRect(x + 8, 400, 70, 200); g.fillRect(x + 82, 400, 70, 200); g.fillStyle = '#e8c070'; [[x + 66, 500], [x + 94, 500]].forEach(([a, b]) => { g.beginPath(); g.arc(a, b, 5, 0, TAU); g.fill(); });
      g.strokeStyle = S.rgba('#3a2010', .6); g.lineWidth = 2; for (let k = 0; k < 4; k++) { g.strokeRect(x + 16, 412 + k * 46, 54, 38); g.strokeRect(x + 90, 412 + k * 46, 54, 38); } });
    // plinth (statue drawn per shot)
    g.fillStyle = '#c8bca4'; g.fillRect(570, 520, 140, 80); g.fillStyle = '#e8dcc4'; g.fillRect(556, 510, 168, 14); g.fillStyle = S.rgba('#000000', .2); g.fillRect(670, 524, 40, 76);
    g.fillStyle = '#8a7a5a'; g.fillRect(586, 600, 108, 6);
    cobbles(g, w, 600, h, '#b8a88a', 7630);
    [80, 1200].forEach(x => cypress(g, x, 600, 200));
    grain(g, w, h, 7699, .04); });

  // ---------- Roman stone workshop: bench, tools, half-carved block, window light ----------
  VP.set('ny_workshop', 1280, 720, (g, w, h) => {
    MX.bricks(g, 0, 0, w, 600, '#b89a78', 7701); g.fillStyle = S.rgba('#3a2a1a', .25); g.fillRect(0, 0, w, 600);
    g.fillStyle = '#e8f0f8'; g.fillRect(860, 120, 220, 180); g.fillStyle = '#6a4a2a'; g.fillRect(964, 120, 12, 180); g.fillRect(860, 204, 220, 10); g.strokeStyle = '#5a3a22'; g.lineWidth = 10; g.strokeRect(860, 120, 220, 180);
    const beam = g.createLinearGradient(880, 300, 700, 700); beam.addColorStop(0, 'rgba(255,240,200,.35)'); beam.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = beam; g.beginPath(); g.moveTo(860, 300); g.lineTo(1080, 300); g.lineTo(900, 720); g.lineTo(560, 720); g.fill();
    // shelf with jars and tools on the wall
    g.fillStyle = '#6a4a2a'; g.fillRect(120, 230, 420, 14); [[150, '#b8603a'], [210, '#c8a060'], [270, '#8a5a3a'], [470, '#a86a4a']].forEach(([x, col]) => { g.fillStyle = col; g.beginPath(); g.ellipse(x, 205, 20, 26, 0, 0, TAU); g.fill(); g.fillRect(x - 8, 172, 16, 10); });
    g.strokeStyle = '#4a3a2a'; g.lineWidth = 5; [[340, 300, 340, 380], [380, 300, 380, 370], [420, 300, 430, 390]].forEach(([a, b, c2, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); });
    // stone blocks on the floor at the back
    [[90, 520, 140, 80], [1100, 500, 150, 100]].forEach(([x, y, bw, bh]) => { g.fillStyle = '#d8d0c0'; g.fillRect(x, y, bw, bh); g.fillStyle = '#b8ae9a'; g.fillRect(x + bw * .7, y, bw * .3, bh); g.fillStyle = '#ece6da'; g.fillRect(x, y, bw, 8); });
    const fl = g.createLinearGradient(0, 600, 0, h); fl.addColorStop(0, '#9a8466'); fl.addColorStop(1, '#6a5a44'); g.fillStyle = fl; g.fillRect(0, 600, w, h - 600);
    S.dabs(g, { x: 0, y: 600, w, h: 120, n: 300, cols: ['#e8e0d0', '#7a6a54', '#b8a888'], r0: 1, r1: 5, a0: .3, a1: .6, seed: 7730 });
    grain(g, w, h, 7799, .05); });

  // ---------- snowy medieval village with a stone church ----------
  VP.set('ny_snowvillage', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a8ab0'], [.6, '#c8d0e0'], [1, '#e8ecf4']]);
    ridge(g, w, h, 360, 50, 200, 7801, '#a8b0c8'); ridge(g, w, h, 410, 30, 150, 7802, '#d8dce8');
    // church
    MX.bricks(g, 540, 280, 220, 300, '#9a948a', 7810); MX.bricks(g, 600, 120, 100, 160, '#a29c92', 7811);
    g.fillStyle = '#5a4a5a'; g.beginPath(); g.moveTo(590, 122); g.lineTo(650, 40); g.lineTo(710, 122); g.fill(); snowcap(g, 590, 122, 120, 10);
    g.fillStyle = '#5a4a5a'; g.beginPath(); g.moveTo(530, 282); g.lineTo(650, 200); g.lineTo(770, 282); g.fill(); snowcap(g, 530, 282, 240, 10);
    g.fillStyle = '#2a2020'; g.beginPath(); g.moveTo(620, 580); g.lineTo(620, 480); g.quadraticCurveTo(650, 440, 680, 480); g.lineTo(680, 580); g.fill(); g.fillStyle = '#ffd890'; g.beginPath(); g.arc(650, 360, 22, 0, TAU); g.fill(); g.fillStyle = '#ffcf70'; g.fillRect(560, 340, 18, 40); g.fillRect(722, 340, 18, 40);
    g.strokeStyle = '#3a3030'; g.lineWidth = 4; g.beginPath(); g.moveTo(650, 40); g.lineTo(650, 10); g.moveTo(640, 20); g.lineTo(660, 20); g.stroke();
    // timber-frame cottages
    const cot = (x, y, cw, ch, seed) => { g.fillStyle = '#e8dcc4'; g.fillRect(x, y - ch, cw, ch); g.strokeStyle = '#4a3020'; g.lineWidth = 5; g.strokeRect(x, y - ch, cw, ch); g.beginPath(); g.moveTo(x, y - ch * .5); g.lineTo(x + cw, y - ch * .5); g.moveTo(x, y - ch); g.lineTo(x + cw * .5, y - ch * .5); g.moveTo(x + cw, y - ch); g.lineTo(x + cw * .5, y - ch * .5); g.stroke();
      g.fillStyle = '#6a4a3a'; g.beginPath(); g.moveTo(x - 14, y - ch); g.lineTo(x + cw / 2, y - ch - cw * .45); g.lineTo(x + cw + 14, y - ch); g.fill(); g.fillStyle = '#f4f6fa'; g.beginPath(); g.moveTo(x - 16, y - ch + 2); g.lineTo(x + cw / 2, y - ch - cw * .45 - 4); g.lineTo(x + cw + 16, y - ch + 2); g.lineTo(x + cw / 2, y - ch - cw * .45 + 12); g.fill();
      g.fillStyle = '#ffcf70'; g.fillRect(x + cw * .2, y - ch * .4, cw * .18, ch * .2); g.fillStyle = '#4a3020'; g.fillRect(x + cw * .6, y - ch * .45, cw * .2, ch * .45);
      g.fillStyle = '#7a6a5a'; g.fillRect(x + cw * .75, y - ch - cw * .3, 14, 30); g.fillStyle = 'rgba(220,220,230,.5)'; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x + cw * .75 + 7 + k * 8, y - ch - cw * .3 - 10 - k * 16, 8 + k * 3, 0, TAU); g.fill(); } };
    cot(60, 560, 170, 120, 1); cot(290, 570, 150, 110, 2); cot(860, 566, 160, 118, 3); cot(1080, 576, 170, 126, 4);
    g.fillStyle = '#eef2f8'; g.fillRect(0, 580, w, h - 580); S.dabs(g, { x: 0, y: 580, w, h: 140, n: 300, cols: ['#ffffff', '#c8d0e0', '#dce2ee'], r0: 4, r1: 16, a0: .4, a1: .8, seed: 7830 });
    g.fillStyle = 'rgba(160,170,190,.5)'; g.beginPath(); g.moveTo(600, 580); g.quadraticCurveTo(640, 650, 560, 720); g.lineTo(760, 720); g.quadraticCurveTo(680, 650, 700, 580); g.fill();
    snowfall(g, w, h, 7840, 180); grain(g, w, h, 7899, .03); });

  // ---------- Vatican hall 1582: frescoed wall, arched windows, globe table ----------
  VP.set('ny_vatican', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#c8b498'], [1, '#a8906a']]);
    MX.bricks(g, 0, 0, w, 600, '#d8c4a0', 7901); g.fillStyle = S.rgba('#6a4a2a', .1); g.fillRect(0, 0, w, 600);
    // fresco band with painted sky and figures
    const fr = g.createLinearGradient(0, 30, 0, 170); fr.addColorStop(0, '#6a9ad0'); fr.addColorStop(1, '#e8d8b0'); g.fillStyle = fr; g.fillRect(40, 30, 1200, 140); for (let k = 0; k < 12; k++) { const r2 = R(7910 + k); g.fillStyle = S.rgba(['#c84a3a', '#3a5aa8', '#e8c060', '#4a8a4a'][k % 4], .7); g.beginPath(); g.ellipse(80 + k * 100 + r2() * 30, 120, 14, 30, 0, 0, TAU); g.fill(); g.fillStyle = '#e8c0a0'; g.beginPath(); g.arc(80 + k * 100 + r2() * 30, 84, 9, 0, TAU); g.fill(); }
    g.strokeStyle = '#c8a040'; g.lineWidth = 8; g.strokeRect(40, 30, 1200, 140);
    // arched windows with light
    [180, 1000].forEach(x => { g.fillStyle = '#e8f0f8'; g.beginPath(); g.moveTo(x, 500); g.lineTo(x, 280); g.quadraticCurveTo(x + 50, 210, x + 100, 280); g.lineTo(x + 100, 500); g.fill(); g.strokeStyle = '#8a6a3a'; g.lineWidth = 8; g.stroke(); g.fillStyle = '#8a6a3a'; g.fillRect(x + 46, 240, 8, 260); g.fillRect(x, 380, 100, 8);
      const b = g.createLinearGradient(x, 300, x + 300, 720); b.addColorStop(0, 'rgba(255,245,215,.3)'); b.addColorStop(1, 'rgba(255,245,215,0)'); g.fillStyle = b; g.beginPath(); g.moveTo(x, 500); g.lineTo(x + 100, 500); g.lineTo(x + 360, 720); g.lineTo(x + 120, 720); g.fill(); });
    // big calendar chart on the back wall
    g.fillStyle = '#7a5a2a'; g.fillRect(470, 220, 340, 250); g.fillStyle = '#f4ead4'; g.fillRect(482, 232, 316, 226);
    g.fillStyle = '#5a3a1a'; g.font = 'bold 24px serif'; g.textAlign = 'center'; g.fillText('KALENDARIUM', 640, 262); g.strokeStyle = 'rgba(90,60,30,.5)'; g.lineWidth = 1; for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) g.strokeRect(500 + i * 40, 280 + j * 34, 40, 34);
    g.fillStyle = '#8a1a1a'; g.fillRect(0, 590, w, 14);
    const fl = g.createLinearGradient(0, 600, 0, h); fl.addColorStop(0, '#c8b090'); fl.addColorStop(1, '#8a7050'); g.fillStyle = fl; g.fillRect(0, 604, w, h - 604);
    for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) { g.fillStyle = 'rgba(80,50,30,.2)'; g.fillRect(i * 80, 604 + j * 30, 80, 30); }
    grain(g, w, h, 7999, .04); });

  // ---------- Moscow 1918 street in snow: onion domes, posters, tram wires ----------
  VP.set('ny_moscow', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a96aa'], [.7, '#d8dce4'], [1, '#e8ecf0']]);
    const onion = (x, y, r, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - r * .9, y); g.bezierCurveTo(x - r * 1.4, y - r * 1.2, x - r * .2, y - r * 1.5, x, y - r * 2.2); g.bezierCurveTo(x + r * .2, y - r * 1.5, x + r * 1.4, y - r * 1.2, x + r * .9, y); g.fill(); g.fillStyle = S.rgba('#ffffff', .3); g.beginPath(); g.ellipse(x - r * .35, y - r * .8, r * .15, r * .4, -.3, 0, TAU); g.fill(); g.fillStyle = '#e8c860'; g.fillRect(x - 2, y - r * 2.6, 4, r * .5); };
    g.fillStyle = '#e8e0d0'; g.fillRect(500, 200, 280, 260); [[560, 200, 34, '#2a8a5a'], [640, 160, 50, '#c8a040'], [720, 200, 34, '#3a5ab0']].forEach(([x, y, r, col]) => { g.fillStyle = '#e8e0d0'; g.fillRect(x - r * .7, y, r * 1.4, 60); onion(x, y, r, col); snowcap(g, x - r * .6, y - r * 1.2, r * 1.2, 6); });
    const bld = (x, bw, top, col) => { g.fillStyle = col; g.fillRect(x, top, bw, 580 - top); windowsGrid(g, x + 6, top + 20, bw - 12, 560 - top - 40, Math.round(bw / 40), Math.round((560 - top) / 60), '#ffd890', S.mix(col, '#000000', .5), x | 0); snowcap(g, x, top, bw, 10); };
    bld(0, 230, 240, '#c89a7a'); bld(230, 220, 300, '#d8c8a0'); bld(800, 230, 280, '#b8a8c0'); bld(1030, 250, 230, '#c8907a');
    // red posters with a star
    [[260, 470], [840, 470], [60, 460]].forEach(([x, y]) => { g.fillStyle = '#c8281e'; g.fillRect(x, y, 70, 96); g.fillStyle = '#f0e0c0'; g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 9 : 22; g.lineTo(x + 35 + Math.cos(a) * rr, y + 40 + Math.sin(a) * rr); } g.fill(); g.fillRect(x + 10, y + 74, 50, 6); });
    g.strokeStyle = '#3a3a44'; g.lineWidth = 1.5; [[0, 260, 1280, 250], [0, 280, 1280, 274]].forEach(([a, b, c2, d]) => { g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo(640, b + 30, c2, d); g.stroke(); });
    g.fillStyle = '#eef2f6'; g.fillRect(0, 580, w, h - 580); S.dabs(g, { x: 0, y: 580, w, h: 140, n: 300, cols: ['#ffffff', '#c8d0dc', '#dce2ea'], r0: 4, r1: 16, a0: .4, a1: .8, seed: 8030 });
    g.strokeStyle = 'rgba(120,120,130,.5)'; g.lineWidth = 3; [620, 650].forEach(y => { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + 6); g.stroke(); });
    snowfall(g, w, h, 8040, 200); grain(g, w, h, 8099, .03); });

  // ---------- modern party sofa at night: fairy lights, window with city lights, balloons ----------
  VP.set('ny_party', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2440'], [1, '#3a3050']]);
    g.fillStyle = '#4a3e5a'; g.fillRect(0, 0, w, 600); for (let x = 0; x < w; x += 46) { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(x, 0, 23, 600); }
    // window with night city
    g.fillStyle = '#101028'; g.fillRect(820, 110, 340, 280); for (let k = 0; k < 12; k++) { const r2 = R(8110 + k), bh = 60 + r2() * 160; g.fillStyle = '#1a1a3a'; g.fillRect(820 + k * 29, 390 - bh, 27, bh); windowsGrid(g, 820 + k * 29, 390 - bh, 27, bh, 2, Math.round(bh / 14), '#f0c870', '#141430', 8120 + k); }
    g.strokeStyle = '#d8d0c0'; g.lineWidth = 12; g.strokeRect(820, 110, 340, 280); g.fillStyle = '#d8d0c0'; g.fillRect(984, 110, 10, 280);
    // fairy lights
    g.strokeStyle = '#2a2a2a'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, 70); for (let x = 0; x <= w; x += 160) g.quadraticCurveTo(x + 80, 110, x + 160, 70); g.stroke(); for (let x = 20; x < w; x += 40) { const y = 70 + 30 * Math.sin(((x % 160) / 160) * Math.PI) * .8, col = ['#ffd040', '#ff6060', '#60c0ff', '#80ff90'][(x / 40 | 0) % 4]; S.glow(g, x, y + 4, 18, col, .5); g.fillStyle = col; g.beginPath(); g.arc(x, y + 4, 4, 0, TAU); g.fill(); }
    // balloons tied to the lamp
    [[160, 220, '#e8303a'], [200, 190, '#ffd040'], [240, 230, '#2a8ae8']].forEach(([x, y, col]) => { g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y + 30); g.lineTo(200, 440); g.stroke(); g.fillStyle = col; g.beginPath(); g.ellipse(x, y, 26, 32, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(x - 8, y - 10, 6, 10, -.4, 0, TAU); g.fill(); });
    g.fillStyle = '#c8b890'; g.fillRect(190, 440, 20, 160); g.fillStyle = '#e8d8a8'; g.beginPath(); g.moveTo(160, 440); g.lineTo(240, 440); g.lineTo(220, 400); g.lineTo(180, 400); g.fill(); S.glow(g, 200, 430, 120, '#ffd890', .4);
    // sofa
    g.fillStyle = '#2a6a6a'; g.fillRect(380, 440, 520, 120); g.fillStyle = '#1e5050'; g.fillRect(360, 480, 60, 110); g.fillRect(860, 480, 60, 110); g.fillStyle = '#358080'; g.fillRect(410, 510, 460, 60); g.fillStyle = '#e8b040'; g.fillRect(430, 470, 60, 50);
    const fl = g.createLinearGradient(0, 600, 0, h); fl.addColorStop(0, '#5a4030'); fl.addColorStop(1, '#3a2a20'); g.fillStyle = fl; g.fillRect(0, 590, w, h - 590);
    g.fillStyle = '#8a3a4a'; g.beginPath(); g.ellipse(640, 660, 380, 40, 0, 0, TAU); g.fill();
    // confetti on the floor
    for (let k = 0; k < 120; k++) { const r2 = R(8150 + k); g.fillStyle = ['#ffd040', '#ff6060', '#60c0ff', '#80ff90', '#ffffff'][k % 5]; g.fillRect(r2() * w, 610 + r2() * 110, 5, 3); }
    grain(g, w, h, 8199, .03); });

  // ---------- Georgian London 1752 street (no Big Ben: it is 1859) ----------
  VP.set('ny_london', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8a9ab8'], [.7, '#d8d4cc'], [1, '#c8c0b0']]);
    cloud(g, 300, 110, 1.2, '#eceae4', 8201); cloud(g, 980, 90, 1.4, '#e4e2dc', 8202);
    // St Paul's dome in the distance
    g.fillStyle = '#a8a8b0'; g.fillRect(600, 260, 140, 140); g.beginPath(); g.moveTo(590, 262); g.quadraticCurveTo(670, 150, 750, 262); g.fill(); g.fillRect(660, 140, 20, 40); g.beginPath(); g.arc(670, 140, 10, 0, TAU); g.fill();
    const house = (x, bw, top, col) => { MX.bricks(g, x, top, bw, 590 - top, col, x | 0); g.fillStyle = S.rgba('#000000', .12); g.fillRect(x + bw - 18, top, 18, 590 - top);
      for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const wx = x + 22 + i * (bw - 44) / 3, wy = top + 30 + j * 80; g.fillStyle = '#f0ece0'; g.fillRect(wx - 4, wy - 4, 44, 64); g.fillStyle = '#3a4050'; g.fillRect(wx, wy, 36, 56); g.strokeStyle = '#f0ece0'; g.lineWidth = 2; g.beginPath(); g.moveTo(wx + 18, wy); g.lineTo(wx + 18, wy + 56); g.moveTo(wx, wy + 18); g.lineTo(wx + 36, wy + 18); g.moveTo(wx, wy + 37); g.lineTo(wx + 36, wy + 37); g.stroke(); }
      g.fillStyle = '#1a2a3a'; g.fillRect(x + bw / 2 - 22, 510, 44, 80); g.fillStyle = '#f0ece0'; g.beginPath(); g.arc(x + bw / 2, 510, 24, Math.PI, 0); g.fill(); g.fillStyle = '#e8c860'; g.beginPath(); g.arc(x + bw / 2 + 14, 550, 3, 0, TAU); g.fill();
      g.fillStyle = '#3a3030'; g.fillRect(x - 4, top - 12, bw + 8, 14); g.fillRect(x + bw * .3, top - 40, 30, 30); };
    house(0, 300, 190, '#9a5a42'); house(300, 260, 230, '#b87a5a'); house(780, 250, 220, '#a8684a'); house(1030, 260, 180, '#8a4a3a');
    // coffee house sign
    g.strokeStyle = '#2a2020'; g.lineWidth = 4; g.beginPath(); g.moveTo(560, 420); g.lineTo(640, 420); g.stroke(); g.fillStyle = '#3a2a1a'; g.fillRect(600, 424, 70, 50); g.fillStyle = '#e8c860'; g.font = 'bold 13px serif'; g.textAlign = 'center'; g.fillText('COFFEE', 635, 446); g.fillText('HOUSE', 635, 464);
    // lamp posts
    [250, 1000].forEach(x => { g.fillStyle = '#2a2a2a'; g.fillRect(x - 3, 480, 6, 120); g.fillRect(x - 12, 470, 24, 16); g.fillStyle = '#ffe0a0'; g.fillRect(x - 8, 472, 16, 12); });
    cobbles(g, w, 590, h, '#8a8478', 8230);
    grain(g, w, h, 8299, .04); });

  // ---------- a Georgian bedroom with a wall calendar (for 2 / 14 September 1752) ----------
  VP.set('ny_bedroom', 1280, 720, (g, w, h) => {
    g.fillStyle = '#5a6a5a'; g.fillRect(0, 0, w, 600); for (let x = 0; x < w; x += 60) { g.fillStyle = 'rgba(255,255,255,.04)'; g.fillRect(x, 0, 30, 600); }
    g.fillStyle = '#e8e0d0'; g.fillRect(0, 380, w, 14); g.fillStyle = '#4a5a4a'; g.fillRect(0, 394, w, 206);
    // window at night/morning drawn per shot; frame here
    g.fillStyle = '#20304a'; g.fillRect(140, 110, 200, 240); g.strokeStyle = '#e8e0d0'; g.lineWidth = 10; g.strokeRect(140, 110, 200, 240); g.fillStyle = '#e8e0d0'; g.fillRect(236, 110, 8, 240); g.fillRect(140, 226, 200, 8);
    // calendar frame (dates drawn per shot)
    g.fillStyle = '#6a4a2a'; g.fillRect(840, 130, 190, 220); g.fillStyle = '#f4ecd8'; g.fillRect(852, 142, 166, 196);
    // four-poster bed
    g.fillStyle = '#5a3a22'; g.fillRect(440, 200, 16, 400); g.fillRect(780, 200, 16, 400); g.fillStyle = '#7a2a2a'; g.fillRect(430, 190, 376, 30); g.beginPath(); g.moveTo(440, 220); g.quadraticCurveTo(470, 320, 460, 420); g.lineTo(440, 420); g.fill(); g.beginPath(); g.moveTo(796, 220); g.quadraticCurveTo(766, 320, 776, 420); g.lineTo(796, 420); g.fill();
    g.fillStyle = '#e8e4dc'; g.fillRect(456, 470, 324, 70); g.fillStyle = '#8a3a3a'; g.fillRect(540, 480, 240, 64); g.fillStyle = '#f4f0e8'; g.beginPath(); g.ellipse(500, 470, 46, 20, 0, 0, TAU); g.fill(); g.fillStyle = '#5a3a22'; g.fillRect(456, 540, 324, 40);
    // bedside table with candle
    g.fillStyle = '#6a4a2a'; g.fillRect(860, 480, 100, 120); g.fillStyle = '#7a5a3a'; g.fillRect(850, 470, 120, 14); g.fillStyle = '#c8a040'; g.fillRect(896, 456, 28, 14); g.fillStyle = '#f4f0e0'; g.fillRect(904, 420, 12, 38);
    const fl = g.createLinearGradient(0, 600, 0, h); fl.addColorStop(0, '#6a4a2a'); fl.addColorStop(1, '#3a2a18'); g.fillStyle = fl; g.fillRect(0, 600, w, h - 600); g.strokeStyle = 'rgba(0,0,0,.2)'; for (let y = 610; y < h; y += 22) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.fillStyle = '#7a3a3a'; g.beginPath(); g.ellipse(620, 650, 260, 30, 0, 0, TAU); g.fill();
    grain(g, w, h, 8399, .04); });
})(window);
