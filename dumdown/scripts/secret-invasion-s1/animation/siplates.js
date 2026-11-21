// DumDown Secret Invasion plates, painted with the 2D line's p2 brush engine (2560x1440). Paint: node <p2>/paint.js siplates.js plates/ all
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, shade, wash, glow, rays, finish, poly, paintRegion, Noise } = P2;
const INK = '#231A24', W = 2560, H = 1440;
const R2 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const pr = (c, r, pts, col, o = {}) => paintRegion(c, r, pts, col, Object.assign({ density: 90, len: [12, 44], w: [3, 10], al: .45, topLight: .08, botDark: -.25, var: 12 }, o));
const box = (c, r, x, y, w, h, col, o = {}) => { pr(c, r, R2(x, y, w, h), col, o); if (o.lw !== 0) { c.strokeStyle = INK; c.lineWidth = o.lw ?? 5; c.strokeRect(x, y, w, h); } };
const line = (c, x1, y1, x2, y2, col, w = 4, al = 1) => { c.save(); c.globalAlpha = al; c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore(); };
const disc = (c, x, y, rad, col, lw = 0) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill(); if (lw) { c.strokeStyle = INK; c.lineWidth = lw; c.stroke(); } };
const FIN = (c, r, o = {}) => finish(c, r, W, H, Object.assign({ oil: 2, grain: 7, vig: .38 }, o));
function floorBoards(c, r, y0, col, n = 14) { pr(c, r, R2(0, y0, W, H - y0), col, { density: 120, topLight: -.1, botDark: -.3 }); for (let i = -n; i <= n * 2; i++) line(c, 1280 + (i - n / 2) * 90, y0, 1280 + (i - n / 2) * 260, H, 'rgba(30,18,12,.28)', 3); for (let y = y0 + 40, k = 1; y < H; y += 40 * k, k *= 1.25) line(c, 0, y, W, y, 'rgba(30,18,12,.12)', 2); }
function tileFloor(c, r, y0, a, b) { pr(c, r, R2(0, y0, W, H - y0), a, { density: 100, topLight: -.05, botDark: -.25 }); for (let i = -20; i <= 40; i++) line(c, 1280 + (i - 10) * 120, y0, 1280 + (i - 10) * 380, H, rgb(hex(b), .35), 3); for (let y = y0 + 30, k = 1; y < H; y += 30 * k, k *= 1.3) line(c, 0, y, W, y, rgb(hex(b), .3), 3); }
function skirting(c, y, col = '#3a2a22') { c.fillStyle = col; c.fillRect(0, y - 26, W, 26); line(c, 0, y - 26, W, y - 26, INK, 3); line(c, 0, y, W, y, INK, 4); }
function windowView(c, r, x, y, w, h, top, bot, fn, frame = '#e8e2d4') { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); wash(c, r, [x, y, w, h], top, bot); if (fn) fn(); c.restore(); c.strokeStyle = frame; c.lineWidth = 22; c.strokeRect(x, y, w, h); line(c, x + w / 2, y, x + w / 2, y + h, frame, 14); line(c, x, y + h * .45, x + w, y + h * .45, frame, 12); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x - 11, y - 11, w + 22, h + 22); }
function rain(c, r, n = 900, al = .18) { for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, l = r.range(20, 60); line(c, x, y, x - l * .15, y + l, `rgba(200,215,255,${al})`, 1.5); } }
function snowFall(c, r, n = 700) { for (let i = 0; i < n; i++) disc(c, r() * W, r() * H, r.range(1, 4), `rgba(255,255,255,${r.range(.3, .8)})`); }
function onion(c, r, x, base, w, h, col, gold = '#e8b84a') { box(c, r, x - w / 2, base - h, w, h, '#e8dcc8', { lw: 3 }); for (let k = 0; k < 3; k++) { c.fillStyle = '#3a2a2a'; c.fillRect(x - w / 2 + 14 + k * (w - 28) / 3 + 6, base - h + 40, (w - 28) / 3 - 12, 70); }
  const dw = w * .62, dy = base - h; c.fillStyle = col; c.beginPath(); c.moveTo(x - dw, dy); c.bezierCurveTo(x - dw * 1.15, dy - dw * .9, x - 10, dy - dw * 1.2, x, dy - dw * 1.75); c.bezierCurveTo(x + 10, dy - dw * 1.2, x + dw * 1.15, dy - dw * .9, x + dw, dy); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke();
  for (let k = -2; k <= 2; k++) line(c, x + k * dw * .3, dy, x + k * dw * .05, dy - dw * 1.6, 'rgba(255,255,255,.2)', 4); line(c, x, dy - dw * 1.75, x, dy - dw * 2.1, gold, 6); line(c, x - 18, dy - dw * 1.98, x + 18, dy - dw * 1.98, gold, 5); }
function block(c, r, x, base, w, h, col, lit = .4) { box(c, r, x, base - h, w, h, col, { lw: 4 }); for (let yy = base - h + 30; yy < base - 60; yy += 80) for (let xx = x + 24; xx < x + w - 50; xx += 76) { c.fillStyle = r() < lit ? rgb(hex('#ffd98a'), .85) : 'rgba(30,30,50,.75)'; c.fillRect(xx, yy, 40, 52); } }
function frameArt(c, r, x, y, w, h, cols) { c.fillStyle = '#b8902a'; c.fillRect(x - 18, y - 18, w + 36, h + 36); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x - 18, y - 18, w + 36, h + 36); wash(c, r, [x, y, w, h], cols[0], cols[1]); for (let k = 0; k < 6; k++) glow(c, x + r() * w, y + r() * h, r.range(30, 90), cols[2] || '#ffe0a0', .35); c.strokeRect(x, y, w, h); }
function clock(c, x, y, rad, face = '#f4ecd8') { disc(c, x, y, rad + 10, '#5a3a22', 4); disc(c, x, y, rad, face, 3); for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; line(c, x + Math.cos(a) * rad * .8, y + Math.sin(a) * rad * .8, x + Math.cos(a) * rad * .92, y + Math.sin(a) * rad * .92, INK, 3); } const h = (x * 7 + y) % 12; line(c, x, y, x + Math.cos(h) * rad * .5, y + Math.sin(h) * rad * .5, INK, 5); line(c, x, y, x + Math.cos(h * 3) * rad * .75, y + Math.sin(h * 3) * rad * .75, INK, 3); }
function lampS(c, x, y, col = '#ffd890') { glow(c, x, y, 520, col, .3); disc(c, x, y, 26, col, 3); }
function book(c, r, x, y, w, h) { let bx = x; while (bx < x + w) { const bw = r.range(18, 36), bh = h * r.range(.7, 1); c.fillStyle = rgb(hex(r.pick(['#8a2a2a', '#2a4a7a', '#3a6a3a', '#c8a03a', '#5a3a6a', '#7a5a3a', '#e8dcc8']))); c.fillRect(bx, y + h - bh, bw, bh); c.strokeStyle = 'rgba(20,10,10,.6)'; c.lineWidth = 2; c.strokeRect(bx, y + h - bh, bw, bh); bx += bw + 2; } }
function shelfWall(c, r, x, y, w, rows, rh = 120) { box(c, r, x - 14, y - 14, w + 28, rows * rh + 28, '#5a3a24', { lw: 4 }); for (let k = 0; k < rows; k++) { book(c, r, x, y + k * rh + 6, w, rh - 22); c.fillStyle = '#6a4a2c'; c.fillRect(x, y + (k + 1) * rh - 16, w, 16); } }
function pod(c, r, x, base, s = 1, man = true) { const w = 220 * s, h = 520 * s; glow(c, x, base - h / 2, 380 * s, '#6aff9a', .25); c.fillStyle = 'rgba(120,255,170,.28)'; c.beginPath(); c.roundRect(x - w / 2, base - h, w, h, 100 * s); c.fill(); if (man) { disc(c, x, base - h + 120 * s, 40 * s, 'rgba(60,90,70,.55)'); c.fillStyle = 'rgba(60,90,70,.45)'; c.fillRect(x - 46 * s, base - h + 160 * s, 92 * s, 260 * s); } c.strokeStyle = '#9ab0a8'; c.lineWidth = 14 * s; c.beginPath(); c.roundRect(x - w / 2, base - h, w, h, 100 * s); c.stroke(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); box(c, r, x - w / 2 - 20, base - 20, w + 40, 40, '#4a5450', { lw: 4 }); }
function stalls(c, r, y, n, cols) { for (let i = 0; i < n; i++) { const x = 60 + i * (W - 120) / n, w = (W - 120) / n - 40; box(c, r, x, y - 160, w, 160, '#7a5a3a', { lw: 4 }); c.fillStyle = cols[i % cols.length]; c.beginPath(); c.moveTo(x - 20, y - 160); c.lineTo(x + w + 20, y - 160); c.lineTo(x + w, y - 250); c.lineTo(x, y - 250); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(x + k * w / 4, y - 250, w / 8, 90); } } }
function flagsLine(c, r, x0, x1, y, sag, cols) { c.strokeStyle = 'rgba(30,20,20,.7)'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 30; i++) { const t = i / 30; c.lineTo(x0 + (x1 - x0) * t, y + Math.sin(t * Math.PI) * sag); } c.stroke(); for (let i = 1; i < 30; i++) { const t = i / 30, x = x0 + (x1 - x0) * t, yy = y + Math.sin(t * Math.PI) * sag; c.fillStyle = cols[i % cols.length]; c.beginPath(); c.moveTo(x - 18, yy); c.lineTo(x + 18, yy); c.lineTo(x, yy + 44); c.closePath(); c.fill(); } }
function tower(c, r, x, base, rw, h) { c.fillStyle = '#9a9a94'; c.beginPath(); c.moveTo(x - rw, base); c.quadraticCurveTo(x - rw * .55, base - h * .55, x - rw * .7, base - h); c.lineTo(x + rw * .7, base - h); c.quadraticCurveTo(x + rw * .55, base - h * .55, x + rw, base); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.stroke(); pr(c, r, [[x - rw, base], [x - rw * .7, base - h], [x + rw * .7, base - h], [x + rw, base]], '#a8a49a', { density: 50, al: .35 }); for (let k = 0; k < 5; k++) line(c, x - rw * .9 + k * 6, base - k * h / 5, x + rw * .9 - k * 6, base - k * h / 5, 'rgba(60,50,40,.25)', 3); }

// 1. Prescod's Moscow flat at night: red-string conspiracy wall, desk lamp, window with snowy roofs
PLATES.si_flat = (c, r) => { wash(c, r, [0, 0, W, H], '#3a3040', '#14101a'); pr(c, r, R2(0, 0, W, 1080), '#4a3a3a', { density: 140 });
  windowView(c, r, 1880, 180, 520, 640, '#0a1230', '#2a3a6a', () => { for (let i = 0; i < 6; i++) block(c, r, 1880 + i * 90, 820, 86, 200 + (i * 53) % 180, '#2a2a3a', .5); snowFall(c, r, 120); });
  box(c, r, 260, 160, 1360, 760, '#b8a07a', { lw: 6 }); const pins = []; for (let i = 0; i < 26; i++) { const x = 300 + r() * 1260, y = 200 + r() * 660; pins.push([x, y]); c.save(); c.translate(x, y); c.rotate(r.range(-.12, .12)); c.fillStyle = r() < .5 ? '#f4f1ea' : '#e8dca8'; c.fillRect(-60, -44, 120, 88); c.strokeStyle = 'rgba(20,10,10,.5)'; c.lineWidth = 2; c.strokeRect(-60, -44, 120, 88); if (r() < .5) { disc(c, 0, -8, 18, '#8a7a6a'); c.fillStyle = '#8a7a6a'; c.fillRect(-26, 10, 52, 24); } else for (let k = 0; k < 4; k++) line(c, -44, -24 + k * 16, 44, -24 + k * 16, 'rgba(40,40,60,.5)', 3); c.restore(); }
  for (let i = 0; i < 40; i++) { const a = pins[Math.floor(r() * pins.length)], b = pins[Math.floor(r() * pins.length)]; line(c, a[0], a[1] - 40, b[0], b[1] - 40, 'rgba(220,40,40,.8)', 3); } for (const [x, y] of pins) disc(c, x, y - 40, 7, '#e23a3a', 2);
  floorBoards(c, r, 1080, '#4a3426'); skirting(c, 1080); box(c, r, 1650, 900, 520, 30, '#5a3a24'); box(c, r, 1680, 930, 30, 220, '#4a2a1a'); box(c, r, 2110, 930, 30, 220, '#4a2a1a'); lampS(c, 1760, 820, '#ffcf6a'); line(c, 1760, 900, 1760, 830, '#2a2420', 8);
  for (let k = 0; k < 9; k++) { c.save(); c.translate(1700 + k * 50, 890); c.rotate(r.range(-.3, .3)); c.fillStyle = '#f4f1ea'; c.fillRect(-30, -6, 60, 8); c.restore(); } FIN(c, r, { vig: .5 }); };

// 2. Snowy Moscow rooftops at dusk, onion domes behind
PLATES.si_roof = (c, r) => { wash(c, r, [0, 0, W, 900], '#2a2a5a', '#e88a6a'); glow(c, 1900, 700, 700, '#ffb070', .4);
  for (let i = 0; i < 14; i++) block(c, r, i * 190 - 40, 980, 170, 300 + (i * 97) % 360, '#5a4a5a', .45); onion(c, r, 700, 900, 220, 380, '#2a8a5a'); onion(c, r, 1060, 860, 160, 300, '#d8402a'); onion(c, r, 1350, 900, 200, 420, '#e8b84a'); onion(c, r, 1640, 880, 150, 280, '#2a5ac8');
  pr(c, r, R2(0, 1000, W, H - 1000), '#8a8aa0', { density: 80 }); pr(c, r, R2(0, 1000, W, 60), '#f4f4ff', { density: 60, al: .6 }); line(c, 0, 1000, W, 1000, INK, 6); for (let x = 140; x < W; x += 420) { box(c, r, x, 860, 110, 140, '#7a4a3a', { lw: 4 }); pr(c, r, R2(x - 8, 852, 126, 26), '#f4f4ff', { al: .6 }); }
  for (let k = 0; k < 6; k++) line(c, 0, 1100 + k * 60, W, 1100 + k * 60, 'rgba(40,40,60,.2)', 3); snowFall(c, r, 400); FIN(c, r); };

// 3. Safe house street at night in the rain: old stone building, lit door, wet street with reflections
PLATES.si_safe_ext = (c, r) => { wash(c, r, [0, 0, W, H], '#0e1430', '#2a3050'); for (let i = 0; i < 7; i++) block(c, r, -60 + i * 390, 1060, 380, 640 + (i * 71) % 220, '#4a4458', .35);
  box(c, r, 900, 280, 760, 780, '#6a5a50', { lw: 6 }); for (let k = 0; k < 3; k++) for (let j = 0; j < 4; j++) { const lit = (k + j) % 3 === 0; box(c, r, 950 + j * 180, 330 + k * 170, 110, 120, lit ? '#ffcf7a' : '#2a2a40', { lw: 4 }); if (lit) glow(c, 1005 + j * 180, 390 + k * 170, 160, '#ffcf7a', .3); }
  box(c, r, 1180, 820, 200, 240, '#3a2418', { lw: 5 }); glow(c, 1280, 800, 220, '#ffd890', .5); disc(c, 1280, 790, 14, '#ffd890'); pr(c, r, R2(0, 1060, W, H - 1060), '#2a2c38', { density: 90 }); line(c, 0, 1060, W, 1060, INK, 5);
  for (let i = 0; i < 40; i++) { const x = r() * W, y = 1080 + r() * 340; c.fillStyle = `rgba(255,210,140,${r.range(.05, .2)})`; c.fillRect(x, y, r.range(60, 200), 4); } for (const x of [420, 2140]) { line(c, x, 1060, x, 560, '#1a1a22', 14); lampS(c, x, 560, '#ffd890'); } rain(c, r, 1200, .22); FIN(c, r, { vig: .5 }); };

// 4. Safe house interior: tired flat, big window with rain, small Skrull plant on the sill
PLATES.si_safe_int = (c, r) => { wash(c, r, [0, 0, W, H], '#5a5048', '#2a241e'); pr(c, r, R2(0, 0, W, 1090), '#7a6a58', { density: 140 }); for (let x = 0; x < W; x += 200) line(c, x, 0, x, 1090, 'rgba(40,30,20,.15)', 4);
  windowView(c, r, 1500, 170, 760, 720, '#141c3a', '#3a4a6a', () => { for (let i = 0; i < 8; i++) block(c, r, 1500 + i * 100, 890, 96, 260 + (i * 61) % 240, '#2a2a3a', .4); rain(c, r, 300, .3); });
  box(c, r, 1480, 890, 800, 30, '#d8d0bc'); c.fillStyle = '#8a5a3a'; c.fillRect(1840, 830, 70, 60); for (let k = 0; k < 14; k++) { const a = -1.57 + r.gauss() * .6; line(c, 1875, 830, 1875 + Math.cos(a) * 90, 830 + Math.sin(a) * 90, '#2ac86a', 6); disc(c, 1875 + Math.cos(a) * 90, 830 + Math.sin(a) * 90, 9, '#ff8ad8'); }
  box(c, r, 200, 520, 600, 420, '#4a3a2a', { lw: 4 }); for (let k = 0; k < 2; k++) book(c, r, 230, 540 + k * 200, 540, 170); floorBoards(c, r, 1090, '#5a4030'); skirting(c, 1090); box(c, r, 760, 1010, 700, 40, '#6a4a2a'); for (const x of [790, 1400]) box(c, r, x, 1050, 26, 160, '#4a2a1a');
  lampS(c, 1100, 120, '#ffd890'); line(c, 1100, 0, 1100, 100, '#2a2420', 6); FIN(c, r); };

// 5. New Skrullos outside: abandoned nuclear plant in the snow, cooling towers, green glow at dusk
PLATES.si_plant_ext = (c, r) => { wash(c, r, [0, 0, W, 980], '#3a3a5a', '#a8a0b8'); glow(c, 1600, 800, 900, '#7aff9a', .18);
  for (let i = 0; i < 30; i++) { const x = r() * W; c.fillStyle = 'rgba(40,40,60,.5)'; c.beginPath(); c.moveTo(x - 80, 980); c.lineTo(x, 760 - r() * 80); c.lineTo(x + 80, 980); c.fill(); }
  tower(c, r, 640, 1000, 300, 640); tower(c, r, 1120, 1000, 240, 520); box(c, r, 1400, 560, 900, 440, '#6a6a6a', { lw: 6 }); for (let k = 0; k < 8; k++) box(c, r, 1450 + k * 104, 620, 70, 120, k % 3 ? '#20302a' : '#9aff9a', { lw: 3 }); glow(c, 1700, 680, 400, '#7aff9a', .3);
  box(c, r, 1900, 300, 80, 260, '#5a5a5a', { lw: 4 }); for (let k = 0; k < 4; k++) line(c, 1880, 330 + k * 60, 2000, 330 + k * 60, '#e23a3a', 6);
  pr(c, r, R2(0, 1000, W, H - 1000), '#e8ecf4', { density: 70, al: .5 }); line(c, 0, 1000, W, 1000, '#8a8aa0', 4); for (let x = 40; x < W; x += 60) { line(c, x, 1180, x, 1080, '#4a4a52', 6); } line(c, 0, 1100, W, 1100, '#4a4a52', 3); line(c, 0, 1140, W, 1140, '#4a4a52', 3); snowFall(c, r, 600); FIN(c, r); };

// 6. New Skrullos inside: big hall with warm lamps, green plants, refugee tents, pipes
PLATES.si_plant_int = (c, r) => { wash(c, r, [0, 0, W, H], '#3a4a40', '#1a2018'); pr(c, r, R2(0, 0, W, 1060), '#4a5a4e', { density: 140 });
  for (let x = 80; x < W; x += 340) { box(c, r, x, 0, 60, 1060, '#5a5a52', { lw: 4 }); } for (const y of [160, 220]) { line(c, 0, y, W, y, '#7a6a4a', 26); line(c, 0, y, W, y, INK, 3); }
  for (let i = 0; i < 9; i++) { const x = 200 + i * 270; lampS(c, x, 300, '#ffcf6a'); line(c, x, 230, x, 280, '#2a2420', 4); }
  for (let i = 0; i < 6; i++) { const x = 140 + i * 420, y = 1060; c.fillStyle = ['#a86a3a', '#6a8a4a', '#8a4a5a', '#4a6a8a'][i % 4]; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 140, y - 220); c.lineTo(x + 280, y); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.fillStyle = 'rgba(20,10,10,.5)'; c.beginPath(); c.moveTo(x + 110, y); c.lineTo(x + 140, y - 120); c.lineTo(x + 170, y); c.fill(); }
  for (let i = 0; i < 12; i++) { const x = 100 + i * 220, y = 1060; for (let k = 0; k < 10; k++) { const a = -1.57 + r.gauss() * .7; line(c, x, y, x + Math.cos(a) * 80, y + Math.sin(a) * 80, r.pick(['#3ac86a', '#2a9a4a', '#7ae07a']), 7); } }
  pr(c, r, R2(0, 1060, W, H - 1060), '#4a4a40', { density: 100 }); line(c, 0, 1060, W, 1060, INK, 5); glow(c, 1280, 600, 1100, '#ffcf6a', .14); FIN(c, r); };

// 7. Pod room under New Skrullos: green-lit pods in rows
PLATES.si_pods = (c, r) => { wash(c, r, [0, 0, W, H], '#0e1a16', '#04080a'); pr(c, r, R2(0, 0, W, 1080), '#1a2a26', { density: 120 });
  for (let i = 0; i < 7; i++) pod(c, r, 220 + i * 360, 1060, i % 2 ? .78 : .9); for (let k = 0; k < 5; k++) line(c, 0, 120 + k * 30, W, 120 + k * 30, '#2a3a34', 10);
  pr(c, r, R2(0, 1080, W, H - 1080), '#1a2422', { density: 80 }); line(c, 0, 1080, W, 1080, INK, 5); for (let i = 0; i < 7; i++) glow(c, 220 + i * 360, 1100, 220, '#6aff9a', .2); FIN(c, r, { vig: .55 }); };

// 8. Fancy art gallery: gold frames, velvet rope, antique chair spot, chandelier
PLATES.si_gallery = (c, r) => { wash(c, r, [0, 0, W, H], '#f0e4d0', '#c8b49a'); pr(c, r, R2(0, 0, W, 1070), '#a83a3a', { density: 140 }); for (let x = 0; x < W; x += 160) line(c, x, 0, x, 1070, 'rgba(255,220,180,.08)', 30);
  frameArt(c, r, 180, 260, 420, 300, ['#3a6a8a', '#e8c88a']); frameArt(c, r, 760, 200, 300, 420, ['#2a2a4a', '#8a4a6a', '#ffd23d']); frameArt(c, r, 1500, 240, 500, 360, ['#6a8a3a', '#e8a86a']); frameArt(c, r, 2160, 300, 260, 320, ['#8a3a2a', '#ffcf7a']);
  for (let k = 0; k < 4; k++) glow(c, 390 + k * 600, 120, 360, '#fff0c0', .35); disc(c, 1280, 90, 60, '#e8c84a', 4); for (let k = 0; k < 8; k++) disc(c, 1280 + Math.cos(k * .8) * 120, 140 + Math.sin(k * .8) * 20, 14, '#fff6c8');
  for (let x = 1100; x <= 1460; x += 360) { box(c, r, x - 10, 860, 20, 210, '#c8a03a'); disc(c, x, 860, 22, '#e8c84a', 3); } c.strokeStyle = '#8a1a2a'; c.lineWidth = 14; c.beginPath(); c.moveTo(1100, 880); c.quadraticCurveTo(1280, 960, 1460, 880); c.stroke();
  tileFloor(c, r, 1070, '#e8dcc8', '#a89a80'); skirting(c, 1070, '#5a1a1a'); FIN(c, r); };

// 9. Narrow back alley in the rain
PLATES.si_alley = (c, r) => { wash(c, r, [0, 0, W, H], '#101828', '#2a2a38'); box(c, r, 0, 0, 900, 1080, '#4a3a3a', { lw: 6 }); box(c, r, 1660, 0, 900, 1080, '#3a3a48', { lw: 6 });
  for (let y = 40; y < 1080; y += 60) for (let x = (y / 60 % 2) * 60; x < 900; x += 120) { c.strokeStyle = 'rgba(10,10,10,.3)'; c.lineWidth = 3; c.strokeRect(x, y, 120, 60); c.strokeRect(1660 + x, y, 120, 60); }
  wash(c, r, [900, 0, 760, 1080], '#3a4a6a', '#1a2030'); for (let i = 0; i < 4; i++) block(c, r, 920 + i * 180, 1080, 170, 500 + i * 80, '#2a2a3a', .4); lampS(c, 820, 420, '#ffd890'); lampS(c, 1740, 360, '#9ac8ff');
  box(c, r, 1700, 860, 260, 220, '#2a5a3a', { lw: 5 }); box(c, r, 520, 900, 180, 180, '#7a5a3a', { lw: 4 }); box(c, r, 610, 820, 140, 80, '#8a6a4a', { lw: 4 }); for (let k = 0; k < 5; k++) line(c, 0, 200 + k * 200, 900, 230 + k * 200, 'rgba(10,10,10,.5)', 10);
  pr(c, r, R2(0, 1080, W, H - 1080), '#22242e', { density: 90 }); line(c, 0, 1080, W, 1080, INK, 5); for (let i = 0; i < 30; i++) { c.fillStyle = `rgba(255,210,140,${r.range(.05, .2)})`; c.fillRect(r() * W, 1100 + r() * 300, r.range(80, 200), 4); } rain(c, r, 1400, .25); FIN(c, r, { vig: .55 }); };

// 10. Moscow festival square: flags, food stalls, balloons, domes behind
PLATES.si_festival = (c, r) => { wash(c, r, [0, 0, W, 900], '#6aa8e8', '#f4e0c0'); onion(c, r, 500, 760, 200, 340, '#d8402a'); onion(c, r, 900, 720, 140, 260, '#2a8a5a'); onion(c, r, 1900, 760, 220, 360, '#e8b84a'); onion(c, r, 2250, 740, 140, 240, '#2a5ac8');
  for (let i = 0; i < 6; i++) block(c, r, 1100 + i * 120, 800, 116, 220 + i * 30, '#c8a88a', .2); flagsLine(c, r, 0, W, 300, 120, ['#e23a3a', '#2a5ac8', '#ffd23d', '#2fb66a', '#f4f1ea']); flagsLine(c, r, 0, W, 470, 90, ['#ffd23d', '#e23a3a', '#2fc6ff']);
  stalls(c, r, 1040, 6, ['#e23a3a', '#2a5ac8', '#2fb66a', '#ff8a2b', '#8a4fff', '#ffd23d']); for (let i = 0; i < 14; i++) { const x = 100 + r() * 2360, y = 120 + r() * 400; line(c, x, y + 50, x + r.range(-20, 20), y + 200, 'rgba(60,60,60,.5)', 2); disc(c, x, y, 34, r.pick(['#e23a3a', '#ffd23d', '#2fc6ff', '#ff6ab0']), 3); }
  tileFloor(c, r, 1040, '#b8a890', '#7a6a58'); FIN(c, r); };

// 11. Quiet café: little round table, two chairs, window to the street
PLATES.si_cafe = (c, r) => { wash(c, r, [0, 0, W, H], '#5a4a3a', '#2a2018'); pr(c, r, R2(0, 0, W, 1060), '#6a5040', { density: 140 }); windowView(c, r, 300, 160, 1960, 640, '#8aa8c8', '#c8b8a0', () => { for (let i = 0; i < 12; i++) block(c, r, 300 + i * 165, 800, 160, 300 + (i * 47) % 200, '#8a7a7a', .1); }, '#3a2a22');
  for (let k = 0; k < 5; k++) { lampS(c, 300 + k * 490, 90, '#ffcf7a'); } floorBoards(c, r, 1060, '#4a3024'); skirting(c, 1060);
  box(c, r, 1080, 940, 400, 26, '#e8dcc8'); box(c, r, 1265, 966, 30, 220, '#3a2a22'); box(c, r, 1180, 1180, 200, 20, '#3a2a22'); for (const x of [880, 1560]) { box(c, r, x, 920, 140, 20, '#7a4a2a'); box(c, r, x + 10, 760, 20, 160, '#7a4a2a'); box(c, r, x + 110, 760, 20, 160, '#7a4a2a'); box(c, r, x + 10, 940, 20, 240, '#5a3a22'); box(c, r, x + 110, 940, 20, 240, '#5a3a22'); } FIN(c, r); };

// 12. Fury and Varra's cosy London home: books, record player, warm lamp, rug
PLATES.si_home = (c, r) => { wash(c, r, [0, 0, W, H], '#e8c890', '#6a4a30'); pr(c, r, R2(0, 0, W, 1070), '#3a5a4a', { density: 140 }); shelfWall(c, r, 120, 180, 700, 6, 130); shelfWall(c, r, 1960, 220, 480, 5, 130);
  windowView(c, r, 1000, 200, 640, 560, '#2a3a6a', '#e88a6a', () => { for (let i = 0; i < 7; i++) block(c, r, 1000 + i * 92, 760, 90, 180 + (i * 41) % 160, '#4a3a4a', .5); }, '#f4ecd8'); box(c, r, 1700, 820, 220, 250, '#6a3a22', { lw: 4 }); disc(c, 1810, 800, 90, '#1a1a1a', 4); disc(c, 1810, 800, 24, '#e23a3a');
  lampS(c, 900, 700, '#ffcf7a'); line(c, 900, 720, 900, 1070, '#2a2420', 8); floorBoards(c, r, 1070, '#6a4026'); skirting(c, 1070); c.fillStyle = '#8a2a3a'; c.beginPath(); c.ellipse(1280, 1250, 700, 120, 0, 0, 7); c.fill(); c.strokeStyle = '#e8c84a'; c.lineWidth = 8; c.beginPath(); c.ellipse(1280, 1250, 640, 100, 0, 0, 7); c.stroke(); FIN(c, r); };

// 13. Harvest machine lab: big chair under a ring machine, tubes, sparks of green
PLATES.si_lab = (c, r) => { wash(c, r, [0, 0, W, H], '#1a2430', '#080c12'); pr(c, r, R2(0, 0, W, 1070), '#26323e', { density: 140 }); for (let x = 0; x < W; x += 256) line(c, x, 0, x, 1070, 'rgba(0,0,0,.3)', 6);
  c.strokeStyle = '#8a9aa8'; c.lineWidth = 46; c.beginPath(); c.ellipse(1280, 420, 420, 140, 0, 0, 7); c.stroke(); c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.ellipse(1280, 420, 444, 164, 0, 0, 7); c.stroke(); glow(c, 1280, 420, 600, '#6aff9a', .3); for (let k = 0; k < 10; k++) disc(c, 1280 + Math.cos(k * .63) * 420, 420 + Math.sin(k * .63) * 140, 14, '#9aff9a');
  for (const x of [380, 2180]) { box(c, r, x - 90, 380, 180, 690, '#3a4a58', { lw: 5 }); for (let k = 0; k < 5; k++) { c.fillStyle = k % 2 ? '#2fc6ff' : '#6aff9a'; c.fillRect(x - 60, 420 + k * 120, 120, 70); } } for (let k = 0; k < 6; k++) line(c, 470, 500 + k * 30, 1000, 560 + k * 40, k % 2 ? '#c8a03a' : '#e23a3a', 10);
  tileFloor(c, r, 1070, '#3a4450', '#1a2028'); c.fillStyle = 'rgba(106,255,154,.15)'; c.beginPath(); c.ellipse(1280, 1180, 460, 70, 0, 0, 7); c.fill(); FIN(c, r, { vig: .5 }); };

// 14. The President's office: blue carpet, tall windows with curtains, desk, two plain flags (no emblems)
PLATES.si_office = (c, r) => { wash(c, r, [0, 0, W, H], '#f0ead8', '#b8b0a0'); pr(c, r, R2(0, 0, W, 1060), '#efe4c4', { density: 130 }); for (let x = 0; x < W; x += 140) line(c, x, 0, x, 1060, 'rgba(160,140,100,.15)', 4);
  for (const x of [700, 1280, 1860]) { windowView(c, r, x - 170, 160, 340, 700, '#9ac8f0', '#e8f0f4', () => { glow(c, x, 700, 200, '#c8e8a0', .5); }, '#f4f1ea'); for (const s of [-1, 1]) { c.fillStyle = '#c8a03a'; c.beginPath(); c.moveTo(x + s * 170, 130); c.quadraticCurveTo(x + s * 230, 500, x + s * 200, 900); c.lineTo(x + s * 260, 900); c.lineTo(x + s * 260, 130); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); } }
  for (const [x, col] of [[300, '#e23a3a'], [2260, '#2a4a9a']]) { line(c, x, 1060, x, 300, '#c8a03a', 10); c.fillStyle = col; c.beginPath(); c.moveTo(x, 320); c.quadraticCurveTo(x + 110, 360, x + 160, 340); c.lineTo(x + 150, 640); c.quadraticCurveTo(x + 90, 660, x, 620); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); }
  pr(c, r, R2(0, 1060, W, H - 1060), '#2a3a7a', { density: 90 }); c.strokeStyle = '#e8c84a'; c.lineWidth = 6; c.beginPath(); c.ellipse(1280, 1250, 900, 140, 0, 0, 7); c.stroke(); line(c, 0, 1060, W, 1060, INK, 5); FIN(c, r); };

// 15. Sonya's study: a wall of stopped clocks, leather chairs, chess table spot, fire glow
PLATES.si_study = (c, r) => { wash(c, r, [0, 0, W, H], '#4a3426', '#1a120c'); pr(c, r, R2(0, 0, W, 1070), '#5a3a2a', { density: 140 }); for (let x = 0; x < W; x += 180) box(c, r, x + 20, 640, 140, 400, '#4a2e1e', { lw: 3 });
  for (let i = 0; i < 18; i++) clock(c, 260 + (i % 9) * 260 + (Math.floor(i / 9) % 2) * 120, 200 + Math.floor(i / 9) * 220, r.range(50, 80));
  glow(c, 2300, 1000, 600, '#ff8a3a', .35); box(c, r, 2140, 780, 340, 290, '#3a2a22', { lw: 4 }); c.fillStyle = '#1a0a04'; c.fillRect(2190, 860, 240, 210); for (let k = 0; k < 8; k++) disc(c, 2230 + k * 25, 1040 - (k % 3) * 20, 22, r.pick(['#ff8a2b', '#ffd23d', '#e23a3a']));
  floorBoards(c, r, 1070, '#3a2418'); skirting(c, 1070); c.fillStyle = '#6a1a24'; c.beginPath(); c.ellipse(1280, 1240, 760, 120, 0, 0, 7); c.fill(); FIN(c, r, { vig: .5 }); };

// 16. English countryside road with hedges and hills
PLATES.si_country = (c, r) => { wash(c, r, [0, 0, W, 820], '#8ab8e8', '#e8f0f4'); for (let i = 0; i < 8; i++) glow(c, r() * W, r.range(100, 400), r.range(150, 300), '#ffffff', .5);
  for (const [y, col] of [[760, '#7aa86a'], [840, '#5a9a4a'], [930, '#4a8a3a']]) { c.fillStyle = col; c.beginPath(); c.moveTo(0, y + 80); for (let x = 0; x <= W; x += 80) c.lineTo(x, y + Math.sin(x / 300 + y) * 50); c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill(); }
  for (let i = 0; i < 24; i++) { const x = r() * W, y = 820 + r() * 160; disc(c, x, y, r.range(20, 40), '#3a6a2a', 2); } c.fillStyle = '#6a6a6e'; c.beginPath(); c.moveTo(0, 1180); c.quadraticCurveTo(1280, 1000, W, 1120); c.lineTo(W, 1300); c.quadraticCurveTo(1280, 1200, 0, 1380); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke();
  for (let k = 0; k < 14; k++) { const t = k / 14, x = t * W; c.fillStyle = '#f4f1ea'; c.fillRect(x, 1190 - Math.sin(t * Math.PI) * 60 + t * 20, 80, 8); } for (let i = 0; i < 80; i++) { const x = r() * W; disc(c, x, 1340 + r() * 100, r.range(20, 50), '#2a5a22'); } FIN(c, r); };

// 17. Park bench in the rain
PLATES.si_park = (c, r) => { wash(c, r, [0, 0, W, H], '#5a6a7a', '#2a3a3a'); for (let i = 0; i < 9; i++) { const x = 120 + i * 300; line(c, x, 1060, x + 20, 500, '#3a2a22', 26); for (let k = 0; k < 40; k++) disc(c, x + r.gauss() * 140, 460 + r.gauss() * 90, r.range(30, 60), r.pick(['#3a5a3a', '#4a6a3a', '#2a4a2a'])); }
  pr(c, r, R2(0, 1060, W, H - 1060), '#3a5a3a', { density: 120 }); c.fillStyle = '#7a7a72'; c.beginPath(); c.moveTo(0, 1180); c.lineTo(W, 1140); c.lineTo(W, 1260); c.lineTo(0, 1300); c.fill(); box(c, r, 980, 1040, 600, 30, '#7a4a2a'); for (let k = 0; k < 3; k++) box(c, r, 980, 940 + k * 30, 600, 22, '#8a5a32'); for (const x of [1000, 1540]) box(c, r, x, 1070, 24, 110, '#2a2a2a');
  line(c, 2000, 1060, 2000, 640, '#1a1a1a', 14); lampS(c, 2000, 630, '#ffe8a0'); rain(c, r, 1300, .25); FIN(c, r, { vig: .5 }); };

// 18. Hospital corridor: pale green walls, doors, ceiling lights
PLATES.si_hospital = (c, r) => { wash(c, r, [0, 0, W, H], '#d8e8e0', '#9ab0a8'); const vx = 1280, vy = 640; c.fillStyle = '#c8dcd4'; c.fillRect(0, 0, W, H);
  c.fillStyle = '#b8d0c8'; c.beginPath(); c.moveTo(0, 0); c.lineTo(vx - 300, vy - 260); c.lineTo(vx - 300, vy + 220); c.lineTo(0, H); c.fill(); c.beginPath(); c.moveTo(W, 0); c.lineTo(vx + 300, vy - 260); c.lineTo(vx + 300, vy + 220); c.lineTo(W, H); c.fill();
  c.fillStyle = '#e8f0ec'; c.beginPath(); c.moveTo(0, 0); c.lineTo(W, 0); c.lineTo(vx + 300, vy - 260); c.lineTo(vx - 300, vy - 260); c.fill(); c.fillStyle = '#9ab4ac'; c.beginPath(); c.moveTo(0, H); c.lineTo(W, H); c.lineTo(vx + 300, vy + 220); c.lineTo(vx - 300, vy + 220); c.fill();
  box(c, r, vx - 300, vy - 260, 600, 480, '#a8c4bc', { lw: 4 }); box(c, r, vx - 90, vy - 120, 180, 340, '#6a8a9a', { lw: 4 });
  for (const [s, k] of [[-1, 0], [-1, 1], [1, 0], [1, 1]]) { const x0 = vx + s * (420 + k * 420), w = 150 + k * 90; c.fillStyle = '#7a9aaa'; c.beginPath(); c.moveTo(x0, vy - 160 - k * 120); c.lineTo(x0 + s * w, vy - 200 - k * 180); c.lineTo(x0 + s * w, vy + 320 + k * 220); c.lineTo(x0, vy + 260 + k * 140); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); }
  for (let k = 0; k < 4; k++) { const t = k / 4, y = vy - 260 - (1 - t) * 640 + 40; c.fillStyle = 'rgba(255,255,255,.95)'; c.fillRect(vx - 300 - (1 - t) * 700, y, 600 + (1 - t) * 1400, 20 + (1 - t) * 30); } for (let k = 0; k < 8; k++) line(c, vx - 300 - k * 140, vy + 220 + k * 70, vx + 300 + k * 140, vy + 220 + k * 70, 'rgba(60,80,80,.2)', 3); FIN(c, r, { vig: .3 }); };

// 19. Cold Finnish safe house: wood walls, snow outside, metal table
PLATES.si_finland = (c, r) => { wash(c, r, [0, 0, W, H], '#8a7a6a', '#3a3028'); pr(c, r, R2(0, 0, W, 1070), '#8a6a4a', { density: 140 }); for (let y = 0; y < 1070; y += 70) line(c, 0, y, W, y, 'rgba(40,24,14,.4)', 4);
  windowView(c, r, 400, 200, 600, 520, '#c8d8e8', '#f4f8fc', () => { for (let i = 0; i < 10; i++) { const x = 420 + i * 60; c.fillStyle = '#2a4a3a'; c.beginPath(); c.moveTo(x, 560); c.lineTo(x + 30, 380); c.lineTo(x + 60, 560); c.fill(); } snowFall(c, r, 120); }, '#5a3a22'); windowView(c, r, 1560, 200, 600, 520, '#c8d8e8', '#f4f8fc', () => snowFall(c, r, 120), '#5a3a22');
  floorBoards(c, r, 1070, '#5a4030'); skirting(c, 1070); box(c, r, 900, 960, 760, 26, '#8a8e96'); for (const x of [930, 1610]) box(c, r, x, 986, 20, 200, '#5a5e66'); lampS(c, 1280, 90, '#e8f0ff'); line(c, 1280, 0, 1280, 70, '#2a2420', 6); FIN(c, r); };

// 20. Press room: podium spot, blue curtain, plain seal-free backdrop, camera flashes
PLATES.si_press = (c, r) => { wash(c, r, [0, 0, W, H], '#1a2a5a', '#0a1028'); for (let x = 0; x < W; x += 110) { c.fillStyle = x % 220 ? '#1e3068' : '#24387a'; c.fillRect(x, 0, 110, 1070); line(c, x, 0, x, 1070, 'rgba(0,0,20,.4)', 4); }
  glow(c, 1280, 500, 700, '#9ab8ff', .25); box(c, r, 1100, 760, 360, 310, '#5a3a24', { lw: 5 }); for (let k = 0; k < 3; k++) line(c, 1240 + k * 40, 760, 1220 + k * 60, 690, '#1a1a1a', 6);
  for (const [x, col] of [[400, '#e23a3a'], [2160, '#f4f1ea']]) { line(c, x, 1070, x, 260, '#c8a03a', 10); c.fillStyle = col; c.fillRect(x, 280, 150, 300); c.strokeStyle = INK; c.lineWidth = 3; c.strokeRect(x, 280, 150, 300); }
  pr(c, r, R2(0, 1070, W, H - 1070), '#2a2a3a', { density: 80 }); line(c, 0, 1070, W, 1070, INK, 5); for (let i = 0; i < 10; i++) glow(c, r() * W, r.range(1150, 1400), 140, '#ffffff', .25); FIN(c, r); };

// 21. Spaceship window, Earth below (ending)
PLATES.si_ship = (c, r) => { wash(c, r, [0, 0, W, H], '#02040e', '#0a1028'); for (let i = 0; i < 700; i++) disc(c, r() * W, r() * 900, r.range(.6, 2.4), `rgba(255,255,255,${r.range(.3, .9)})`);
  c.fillStyle = '#2a6ac8'; c.beginPath(); c.arc(1280, 2100, 1300, 0, 7); c.fill(); for (let k = 0; k < 30; k++) disc(c, 400 + r() * 1760, 850 + r() * 300, r.range(40, 140), 'rgba(80,160,80,.6)'); for (let k = 0; k < 40; k++) disc(c, 300 + r() * 1960, 820 + r() * 300, r.range(30, 90), 'rgba(255,255,255,.35)'); glow(c, 1280, 820, 1400, '#7ac8ff', .25);
  c.fillStyle = '#c8ccd8'; c.fillRect(0, 0, W, 100); c.fillRect(0, 1100, W, 340); c.fillRect(0, 0, 160, H); c.fillRect(W - 160, 0, 160, H); c.strokeStyle = INK; c.lineWidth = 6; c.strokeRect(160, 100, W - 320, 1000); for (const x of [900, 1660]) { c.fillStyle = '#c8ccd8'; c.fillRect(x - 18, 100, 36, 1000); }
  pr(c, r, R2(0, 1100, W, 340), '#9aa0b0', { density: 60 }); for (let k = 0; k < 6; k++) { c.fillStyle = k % 2 ? '#2fc6ff' : '#ffd23d'; c.fillRect(300 + k * 340, 1140, 120, 24); } FIN(c, r, { vig: .4 }); };

// 22. DumDown sofa room (outro)
PLATES.si_sofa = (c, r) => { wash(c, r, [0, 0, W, H], '#2a3990', '#0d1233'); pr(c, r, R2(0, 0, W, 1060), '#1b2470', { density: 140 }); for (let k = 0; k < 4; k++) frameArt(c, r, 280 + k * 560, 220, 300, 220, ['#2fc6ff', '#ffd23d', '#ffffff']);
  box(c, r, 1600, 560, 700, 420, '#111', { lw: 6 }); wash(c, r, [1630, 590, 640, 360], '#3a6a3a', '#1a3a1a'); glow(c, 1950, 770, 500, '#6aff9a', .3); floorBoards(c, r, 1060, '#3a2a4a'); skirting(c, 1060, '#0d1233');
  box(c, r, 300, 900, 1100, 200, '#e23a3a', { lw: 5 }); box(c, r, 300, 760, 1100, 160, '#c82a2a', { lw: 5 }); box(c, r, 240, 820, 120, 280, '#a81a1a', { lw: 5 }); box(c, r, 1340, 820, 120, 280, '#a81a1a', { lw: 5 }); FIN(c, r); };
})();
