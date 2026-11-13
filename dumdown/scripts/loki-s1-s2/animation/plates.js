// DumDown Loki S1+S2 plates, painted with the 2D line's p2 brush engine (2560x1440). Paint: node <p2>/paint.js plates.js plates/ all
window.PLATES = {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const M = window.M2, PRP = window.PR;
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const pr = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, rect(x, y, w, h), col, Object.assign({ density: 80, len: [10, 40], w: [3, 9], al: .45, topLight: .08, botDark: -.25, var: 10 }, o));
function lineSet(c, pts, col, w, al = 1) { c.save(); c.strokeStyle = rgb(hex(col), al); c.lineWidth = w; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore(); }
function vanish(c, r, vx, vy, W, H, col, n, al = .15) { for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; lineSet(c, [[vx, vy], [vx + Math.cos(a) * 3000, vy + Math.sin(a) * 3000]], col, 2, al); } }
// TVA beige retro-futurist office: desk with green CRT, typewriter, tube, lamp
function tvaDesk(c, r, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(0, 6, 190, 22, 0, 0, 7); c.fill();
  paintRegion(c, r, [[-170, -110], [170, -110], [180, -86], [-180, -86]], '#a07a4a', { density: 30, al: .6, topLight: .3 });
  paintRegion(c, r, [[-165, -86], [165, -86], [165, 0], [-165, 0]], '#7a5632', { density: 40, al: .6, botDark: -.4 });
  c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(-165, -86, 330, 86); c.strokeRect(-150, -70, 120, 60); c.strokeRect(30, -70, 120, 60);
  c.fillStyle = '#c9a046'; c.fillRect(-96, -44, 12, 6); c.fillRect(84, -44, 12, 6);
  // CRT monitor
  c.fillStyle = '#c8b48a'; c.fillRect(-120, -230, 150, 120); c.strokeRect(-120, -230, 150, 120); c.fillStyle = '#0e2a14'; c.fillRect(-106, -218, 122, 90);
  for (let i = 0; i < 6; i++) { c.fillStyle = `rgba(110,255,140,${.35 + r() * .4})`; c.fillRect(-98, -208 + i * 13, 40 + r() * 60, 5); }
  glow(c, -45, -173, 120, '#6aff8a', .25);
  // papers and lamp
  c.fillStyle = '#efe6cc'; c.save(); c.rotate(-.06); c.fillRect(50, -128, 80, 18); c.restore(); c.strokeRect(50, -128, 80, 14);
  c.fillStyle = '#3a5a3a'; c.fillRect(120, -200, 10, 90); c.beginPath(); c.moveTo(95, -200); c.lineTo(160, -200); c.lineTo(150, -230); c.lineTo(105, -230); c.closePath(); c.fill(); c.stroke();
  glow(c, 127, -190, 140, '#ffd98a', .35);
  c.restore();
}
function tube(c, r, x, y0, y1, w = 46) { pr(c, r, x - w / 2, y0, w, y1 - y0, '#b89a6a', { density: 30, al: .5, topLight: 0 }); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x - w / 2 + 6, y0, 8, y1 - y0); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.strokeRect(x - w / 2, y0, w, y1 - y0);
  for (let y = y0 + 40; y < y1; y += 140) { c.fillStyle = '#8a6a3a'; c.fillRect(x - w / 2 - 6, y, w + 12, 16); c.strokeRect(x - w / 2 - 6, y, w + 12, 16); } }
function brutalWall(c, r, x, y, w, h, col) { pr(c, r, x, y, w, h, col, { density: 110, var: 8 }); for (let xx = x; xx < x + w; xx += 160) { c.fillStyle = rgb(shade(hex(col), -.25), .5); c.fillRect(xx, y, 6, h); }
  for (let yy = y + 90; yy < y + h; yy += 180) { c.fillStyle = rgb(shade(hex(col), -.2), .4); c.fillRect(x, yy, w, 5); } }

// 1. TVA office floor: endless rows of desks, giant arched windows to an orange city of time
PLATES.tva_office = (c, r, W, H) => {
  M.sky(c, r, W, 760, '#ffb35a', '#ffdca0');
  // window wall with view of the TVA towers
  for (let i = 0; i < 9; i++) { const x = 40 + i * 290; M.tower(c, r, x + 60, 700, 160, 300 + r() * 360, '#c98a4a', '#ffd58a', {}); }
  for (let i = 0; i < 10; i++) { const x = i * 290 - 30; pr(c, r, x, 0, 60, 760, '#8a6a42', { density: 40, al: .7 }); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 0, 60, 760); }
  pr(c, r, 0, 0, W, 90, '#7a5a36', { density: 80, al: .8 });
  for (let i = 0; i < 9; i++) { const x = 30 + i * 290; c.strokeStyle = '#5a4026'; c.lineWidth = 6; c.beginPath(); c.arc(x + 145, 230, 115, Math.PI, 0); c.stroke(); }
  // floor: polished beige with reflections
  pr(c, r, 0, 760, W, 680, '#c9a878', { density: 140, topLight: .1, botDark: -.2 });
  vanish(c, r, 1280, 720, W, H, '#8a6a42', 40, .08);
  for (let i = 0; i < 40; i++) glow(c, r() * W, 800 + r() * 500, 60 + r() * 120, '#ffe2a8', .07);
  // desk rows: far to near
  for (const [row, y, s] of [[0, 830, .38], [1, 900, .5], [2, 1010, .68], [3, 1190, .95]]) for (let x = -100 + row * 70; x < W + 200; x += 520 * s + 60) tvaDesk(c, r, x, y, s);
  tube(c, r, 380, 90, 860); tube(c, r, 2150, 90, 900);
  for (let i = 0; i < 6; i++) PRP.ceilingPanel(c, 200 + i * 420, 20, 240, 40, .5);
  glow(c, 1280, 400, 900, '#ffcf7a', .2);
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .5 });
};

// 2. TVA processing / lobby: tall brutalist atrium, three lizard-god statues (TS-silhouettes), queue rails
PLATES.tva_lobby = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#b88a52', '#7a5432');
  brutalWall(c, r, 0, 0, W, 980, '#a88458');
  // three tall arched alcoves with statues
  for (let i = 0; i < 3; i++) { const x = 560 + i * 720, w = 380; pr(c, r, x - w / 2, 100, w, 820, '#6a4a2a', { density: 60, al: .7, botDark: -.4 }); c.strokeStyle = '#231A24'; c.lineWidth = 6; c.strokeRect(x - w / 2, 100, w, 820);
    glow(c, x, 260, 300, '#ffd27a', .3);
    // statue: robed lizard figure with long head
    c.fillStyle = '#8a7a5a'; c.beginPath(); c.moveTo(x - 110, 900); c.lineTo(x - 70, 420); c.quadraticCurveTo(x, 360, x + 70, 420); c.lineTo(x + 110, 900); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(x, 340, 52, 80, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(x - 30, 290); c.lineTo(x, 200); c.lineTo(x + 30, 290); c.fill(); c.stroke();
    paintRegion(c, r, [[x - 110, 900], [x - 70, 420], [x + 70, 420], [x + 110, 900]], '#9a8a6a', { density: 40, al: .35, topLight: .3, rim: '#ffe2a8' });
    c.fillStyle = 'rgba(40,20,10,.6)'; c.beginPath(); c.ellipse(x - 18, 335, 8, 4, 0, 0, 7); c.ellipse(x + 18, 335, 8, 4, 0, 0, 7); c.fill(); }
  // floor and queue rails
  pr(c, r, 0, 980, W, 460, '#c2a072', { density: 140, topLight: .15, botDark: -.25 });
  for (let k = 0; k < 4; k++) { const y = 1060 + k * 90; for (let x = 200; x < W - 200; x += 170) { c.fillStyle = '#c9a046'; c.fillRect(x - 5, y - 70, 10, 70); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.strokeRect(x - 5, y - 70, 10, 70); } lineSet(c, [[200, y - 60], [W - 200, y - 60]], '#7a1a1a', 8, .9); }
  // ticket machine
  pr(c, r, 120, 760, 140, 230, '#c8b48a', { density: 30, al: .7 }); c.fillStyle = '#ff7a2a'; c.fillRect(150, 790, 80, 40); c.strokeRect(120, 760, 140, 230);
  rays(c, r, 1280, 0, 16, 1300, '#ffe2a8', .05, .8);
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .55 });
};

// 3. Temporal Loom chamber: huge ring weaving gold raw time into green threads, gangway, glass window
PLATES.loom = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#0a0806', '#1a1208');
  const cx = 1280, cy = 560;
  for (let i = 0; i < 260; i++) { const a = r() * 7, d = 300 + r() * 1300; glow(c, cx + Math.cos(a) * d, cy + Math.sin(a) * d * .6, 4 + r() * 12, r() < .5 ? '#ffd27a' : '#6aff9a', .5); }
  // raw time pouring from above
  for (let i = 0; i < 90; i++) { const x = cx + r.gauss() * 220; stroke(c, r, x, 0, 420 + r() * 120, Math.PI / 2 + r.gauss() * .05, 6 + r() * 10, hex(r() < .5 ? '#ffc04a' : '#ffe8a8'), .35); }
  glow(c, cx, cy, 700, '#ffb84a', .45); glow(c, cx, cy, 260, '#fff2c8', .8);
  // ring
  c.save(); c.lineWidth = 70; c.strokeStyle = '#3a2a14'; c.beginPath(); c.ellipse(cx, cy, 520, 330, 0, 0, 7); c.stroke(); c.lineWidth = 26; c.strokeStyle = '#c9a046'; c.stroke(); c.lineWidth = 6; c.strokeStyle = '#231A24'; c.beginPath(); c.ellipse(cx, cy, 555, 365, 0, 0, 7); c.stroke(); c.beginPath(); c.ellipse(cx, cy, 485, 295, 0, 0, 7); c.stroke(); c.restore();
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; c.fillStyle = '#8a6a2a'; c.beginPath(); c.arc(cx + Math.cos(a) * 520, cy + Math.sin(a) * 330, 16, 0, 7); c.fill(); }
  // green woven threads flowing down and out
  for (let i = 0; i < 60; i++) { const x0 = cx + r.gauss() * 160; c.strokeStyle = rgb(hex(r() < .8 ? '#5aff8a' : '#c8ffd8'), .35 + r() * .3); c.lineWidth = 2 + r() * 4; c.beginPath(); c.moveTo(x0, cy + 200); c.bezierCurveTo(x0 + r.gauss() * 200, 950, x0 + r.gauss() * 900, 1150, x0 + r.gauss() * 1600, 1440); c.stroke(); }
  // gangway
  c.fillStyle = '#2a2014'; c.beginPath(); c.moveTo(1180, 900); c.lineTo(1380, 900); c.lineTo(1700, 1440); c.lineTo(860, 1440); c.closePath(); c.fill();
  paintRegion(c, r, [[1180, 900], [1380, 900], [1700, 1440], [860, 1440]], '#4a3a24', { density: 60, al: .5, topLight: .4, rim: '#ffd27a' });
  for (let k = 0; k < 12; k++) { const t = k / 11, y = 900 + t * 540, w = 100 + t * 320; lineSet(c, [[1280 - w, y - 40], [1280 - w, y - 120 - t * 60]], '#7a6a4a', 5, .9); lineSet(c, [[1280 + w, y - 40], [1280 + w, y - 120 - t * 60]], '#7a6a4a', 5, .9); }
  lineSet(c, [[1180, 790], [860, 1260]], '#9a8a6a', 6); lineSet(c, [[1380, 790], [1700, 1260]], '#9a8a6a', 6);
  finish(c, r, W, H, { oil: 3, grain: 12, vig: .7 });
};
// 3b. Loom control room: window onto the loom, consoles, blast door
PLATES.loom_ctrl = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#3a2a18', '#1a120a');
  // big window
  c.save(); c.beginPath(); c.rect(360, 140, 1840, 760); c.clip(); wash(c, r, [360, 140, 1840, 760], '#2a1a08', '#0a0604'); glow(c, 1280, 470, 520, '#ffb84a', .7); glow(c, 1280, 470, 160, '#fff2c8', .9);
  c.lineWidth = 40; c.strokeStyle = '#4a3418'; c.beginPath(); c.ellipse(1280, 470, 380, 230, 0, 0, 7); c.stroke(); c.lineWidth = 14; c.strokeStyle = '#c9a046'; c.stroke();
  for (let i = 0; i < 30; i++) { c.strokeStyle = 'rgba(90,255,140,.4)'; c.lineWidth = 3; c.beginPath(); const x0 = 1280 + r.gauss() * 80; c.moveTo(x0, 600); c.quadraticCurveTo(x0 + r.gauss() * 400, 800, x0 + r.gauss() * 800, 920); c.stroke(); } c.restore();
  for (let i = 0; i <= 6; i++) { const x = 360 + i * 1840 / 6; pr(c, r, x - 18, 140, 36, 760, '#5a4226', { density: 20, al: .8 }); }
  c.strokeStyle = '#231A24'; c.lineWidth = 8; c.strokeRect(360, 140, 1840, 760);
  // consoles
  pr(c, r, 0, 900, W, 540, '#6a4e2e', { density: 100, topLight: .2, botDark: -.4 });
  for (let i = 0; i < 7; i++) { const x = 140 + i * 340; pr(c, r, x, 960, 260, 150, '#8a6a42', { density: 30, al: .7, topLight: .3 }); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 960, 260, 150);
    for (let k = 0; k < 8; k++) { c.fillStyle = r.pick(['#ff5a3a', '#ffd23d', '#5aff8a', '#2fc6ff']); c.beginPath(); c.arc(x + 30 + k * 28, 1000, 8, 0, 7); c.fill(); }
    c.fillStyle = '#0e2a14'; c.fillRect(x + 30, 1030, 200, 60); glow(c, x + 130, 1060, 100, '#6aff8a', .2); }
  glow(c, 1280, 520, 1100, '#ffb84a', .25);
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 });
};

// 4. The throne at the end of time: Loki holding the branches, world tree of green-gold threads
PLATES.throne = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#020403', '#06100a');
  for (let i = 0; i < 500; i++) glow(c, r() * W, r() * H, 1 + r() * 4, '#d8ffe8', .5 * r());
  const cx = 1280, cy = 820;
  // branches: thick trunk threads rising from throne, splitting into a canopy
  function branch(x, y, a, len, w, d) { if (d > 7 || w < 1) return; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; c.strokeStyle = rgb(hex(d < 3 ? '#4adf7a' : '#8affb0'), .55); c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo((x + x2) / 2 + r.gauss() * 40, (y + y2) / 2 + r.gauss() * 40, x2, y2); c.stroke();
    glow(c, x2, y2, w * 6, '#5aff8a', .12); const n = 2 + (r() < .4 ? 1 : 0); for (let k = 0; k < n; k++) branch(x2, y2, a + r.gauss() * .55, len * (.68 + r() * .15), w * .66, d + 1); }
  for (let i = 0; i < 9; i++) branch(cx + r.gauss() * 20, cy - 60, -Math.PI / 2 + (i - 4) * .22, 260 + r() * 60, 18, 0);
  for (let i = 0; i < 7; i++) branch(cx + r.gauss() * 20, cy + 40, Math.PI / 2 + (i - 3) * .3, 200, 12, 2);
  glow(c, cx, cy, 520, '#3adf6a', .35); glow(c, cx, cy - 40, 160, '#e8ffd8', .6);
  // throne: gold, angular, horned back
  c.fillStyle = '#5a4214'; c.strokeStyle = '#231A24'; c.lineWidth = 6;
  c.beginPath(); c.moveTo(cx - 170, cy + 160); c.lineTo(cx - 150, cy - 240); c.lineTo(cx - 230, cy - 420); c.lineTo(cx - 90, cy - 300); c.lineTo(cx, cy - 360); c.lineTo(cx + 90, cy - 300); c.lineTo(cx + 230, cy - 420); c.lineTo(cx + 150, cy - 240); c.lineTo(cx + 170, cy + 160); c.closePath(); c.fill(); c.stroke();
  paintRegion(c, r, [[cx - 170, cy + 160], [cx - 150, cy - 240], [cx, cy - 360], [cx + 150, cy - 240], [cx + 170, cy + 160]], '#c9a046', { density: 50, al: .5, topLight: .4, rim: '#9affc0' });
  pr(c, r, cx - 210, cy + 40, 420, 80, '#8a6a24', { density: 30, al: .7, topLight: .4 });
  pr(c, r, cx - 260, cy + 160, 520, 60, '#3a2a10', { density: 30, al: .8 });
  finish(c, r, W, H, { oil: 3, grain: 12, vig: .75 });
};

// 5. Gobi desert, day
PLATES.gobi = (c, r, W, H) => {
  M.sky(c, r, W, 760, '#4a8ad8', '#e8d8b0'); M.clouds(c, r, W, 80, 420, 8, '#fff6e8', '#c8b8a8');
  const N = P2.Noise(5); M.hills(c, r, N, W, 700, 90, .0016, 3, '#b89a6a', { density: 800 }); M.hills(c, r, N, W, 760, 60, .0026, 9, '#d4ae72', { density: 800 });
  M.ground(c, r, W, H, 760, '#e2b878', '#c8a068', {});
  for (let i = 0; i < 24; i++) { const x = r() * W, y = 820 + r() * 560, s = .5 + (y - 760) / 600; M.rock(c, r, x, y, 40 * s, 22 * s, '#9a7a52', '#e8d0a0'); }
  for (let i = 0; i < 80; i++) stroke(c, r, r() * W, 780 + r() * 640, 80 + r() * 160, r.gauss() * .05, 3, hex('#f4d49a'), .3);
  M.sun(c, r, 2100, 180, 70);
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .4 });
};

// 6. Void at the end of time: purple sky, ruins, wrecked ships, cars, a broken tower
PLATES.void = (c, r, W, H) => {
  M.sky(c, r, W, 900, '#1a0a2a', '#8a5aa8'); M.clouds(c, r, W, 60, 500, 14, '#b88ad8', '#2a1a3a', {});
  for (let i = 0; i < 12; i++) { const x = r() * W, h = 200 + r() * 420; M.tower(c, r, x, 900, 80 + r() * 120, h, '#3a2a40', '#8a6aa8', {}); }
  M.hills(c, r, P2.Noise(7), W, 860, 80, .002, 5, '#4a3a52', { density: 800 });
  M.ground(c, r, W, H, 880, '#6a5a62', '#3a2a3a', {});
  // wreckage: a tilted car, a ship hull, a bus
  c.save(); c.translate(600, 1080); c.rotate(-.18); pr(c, r, -180, -90, 360, 110, '#7a2a2a', { density: 40, al: .7, rim: '#d8a8ff' }); c.strokeStyle = '#231A24'; c.lineWidth = 5; c.strokeRect(-180, -90, 360, 110); c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(-110, 20, 40, 0, 7); c.arc(110, 20, 40, 0, 7); c.fill(); c.restore();
  c.save(); c.translate(1900, 1000); c.rotate(.12); paintRegion(c, r, [[-420, 0], [380, -40], [460, 120], [-380, 160]], '#4a4a56', { density: 60, al: .7, topLight: .3, rim: '#d8a8ff' }); c.restore();
  for (let i = 0; i < 30; i++) { const x = r() * W, y = 920 + r() * 480, s = .5 + (y - 880) / 500; M.rock(c, r, x, y, 60 * s, 34 * s, '#5a4a5a', '#b8a0c8'); }
  glow(c, 1280, 300, 900, '#c88aff', .15);
  finish(c, r, W, H, { oil: 4, grain: 12, vig: .6 });
};

// 7. Citadel at the end of time: dark castle on a floating rock in a nebula
PLATES.citadel = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#120a20', '#2a1438');
  for (let i = 0; i < 700; i++) glow(c, r() * W, r() * H, 1 + r() * 3, '#e8d8ff', .6 * r());
  for (let i = 0; i < 8; i++) glow(c, r() * W, r() * H, 300 + r() * 400, r.pick(['#6a2aa8', '#2a4aa8', '#a83a8a']), .15);
  const cx = 1280; paintRegion(c, r, [[cx - 700, 1000], [cx + 700, 1000], [cx + 300, 1400], [cx - 260, 1440]], '#2a2030', { density: 80, al: .7, topLight: .3, rim: '#c88aff' });
  for (const [x, w, h] of [[cx, 220, 760], [cx - 300, 140, 520], [cx + 300, 140, 560], [cx - 520, 100, 340], [cx + 520, 100, 380]]) { pr(c, r, x - w / 2, 1000 - h, w, h, '#1a1422', { density: 50, al: .8, rim: '#a87ad8' }); c.fillStyle = '#1a1422'; c.beginPath(); c.moveTo(x - w / 2 - 10, 1000 - h); c.lineTo(x, 1000 - h - w * .9); c.lineTo(x + w / 2 + 10, 1000 - h); c.closePath(); c.fill();
    for (let k = 0; k < h / 90; k++) { c.fillStyle = r() < .5 ? '#ffd27a' : '#2a2030'; c.fillRect(x - 8, 1000 - h + 60 + k * 90, 16, 34); } }
  glow(c, cx, 600, 500, '#a87ad8', .2);
  finish(c, r, W, H, { oil: 3, grain: 12, vig: .7 });
};
// 7b. Citadel interior office: He Who Remains' desk, clocks, tall window to the timeline
PLATES.citadel_int = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#2a1a2a', '#140a14');
  pr(c, r, 0, 0, W, 1000, '#3a2a36', { density: 100 });
  c.save(); c.beginPath(); c.rect(1600, 120, 720, 800); c.clip(); wash(c, r, [1600, 120, 720, 800], '#0a0610', '#1a0a2a'); for (let i = 0; i < 40; i++) { c.strokeStyle = 'rgba(255,200,120,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(1600 + r() * 720, 120); c.bezierCurveTo(1960 + r.gauss() * 200, 400, 1960 + r.gauss() * 200, 700, 1600 + r() * 720, 920); c.stroke(); } glow(c, 1960, 520, 300, '#ffb84a', .4); c.restore();
  c.strokeStyle = '#231A24'; c.lineWidth = 10; c.strokeRect(1600, 120, 720, 800);
  for (let i = 0; i < 5; i++) { const x = 200 + i * 260; PRP.books(c, r, x, 420, 1.2, 200); PRP.books(c, r, x, 640, 1.2, 200); }
  pr(c, r, 0, 1000, W, 440, '#4a2a2a', { density: 120, topLight: .1 });
  // desk with lamp
  pr(c, r, 700, 860, 900, 60, '#5a3a22', { density: 40, al: .8, topLight: .4 }); pr(c, r, 740, 920, 820, 220, '#3a2414', { density: 50, al: .8 });
  c.fillStyle = '#c9a046'; c.fillRect(1380, 760, 14, 100); c.beginPath(); c.moveTo(1340, 760); c.lineTo(1430, 760); c.lineTo(1410, 720); c.lineTo(1360, 720); c.fill(); glow(c, 1387, 780, 260, '#ffd98a', .5);
  c.fillStyle = '#8a1a1a'; c.beginPath(); c.arc(900, 840, 22, 0, 7); c.fill(); // the apple
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 });
};
// ---------- batch 2: S1 locations ----------
function crowdSil(c, r, y, n, col, h = 120) { for (let i = 0; i < n; i++) { const x = r() * 2560, hh = h * (.8 + r() * .4); c.fillStyle = rgb(jitter(col, r, 12), .9); c.beginPath(); c.ellipse(x, y - hh, hh * .18, hh * .2, 0, 0, 7); c.fill(); c.beginPath(); c.roundRect(x - hh * .22, y - hh * .8, hh * .44, hh * .8, 14); c.fill(); } }
function bunting(c, r, x0, x1, y, sag, cols) { c.save(); c.strokeStyle = '#3a2a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x0, y); c.quadraticCurveTo((x0 + x1) / 2, y + sag, x1, y); c.stroke(); for (let t = .03; t < 1; t += .05) { const x = x0 + (x1 - x0) * t, yy = y + sag * 4 * t * (1 - t) * .5 * 2 * .5 * 2; c.fillStyle = cols[(t * 20 | 0) % cols.length]; c.beginPath(); c.moveTo(x - 14, yy); c.lineTo(x + 14, yy); c.lineTo(x, yy + 34); c.closePath(); c.fill(); } c.restore(); }
// New York 2012 lobby: marble, glass doors, police tape
PLATES.ny_lobby = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#d8d4cc', '#8a8680'); pr(c, r, 0, 0, W, 960, '#cfc8bc', { density: 120 });
  for (let i = 0; i < 6; i++) { const x = 160 + i * 420; pr(c, r, x, 80, 120, 880, '#e8e2d6', { density: 40, topLight: .2, rim: '#fff' }); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 80, 120, 880); }
  c.save(); c.fillStyle = 'rgba(160,200,230,.5)'; c.fillRect(900, 260, 760, 700); c.restore(); for (let k = 0; k < 5; k++) lineSet(c, [[900 + k * 190, 260], [900 + k * 190, 960]], '#3a3a40', 8); 
  pr(c, r, 0, 960, W, 480, '#b8b0a2', { density: 160, topLight: .2 }); for (let i = 0; i < 18; i++) lineSet(c, [[i * 160 - 400, 1440], [1280 + (i * 160 - 1680) * .3, 960]], '#8a8478', 2, .5);
  for (let i = 0; i < 30; i++) glow(c, r() * W, 1000 + r() * 400, 80, '#ffffff', .08); lineSet(c, [[0, 1000], [W, 1060]], '#ffd23d', 14, .9);
  finish(c, r, W, H, { oil: 3, grain: 9, vig: .45 }); };
// Time Theatre: rows of seats, a big film screen (screen left bright for overlays)
PLATES.theatre = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#2a1a12', '#0a0604'); pr(c, r, 0, 0, W, 1000, '#3a2418', { density: 90 });
  for (let i = 0; i < 14; i++) { const x = i * 190; pr(c, r, x, 0, 30, 1000, '#5a3a24', { density: 10, al: .7 }); }
  c.fillStyle = '#f4e8c8'; c.fillRect(460, 140, 1640, 700); glow(c, 1280, 490, 900, '#fff2d0', .3); c.strokeStyle = '#231A24'; c.lineWidth = 10; c.strokeRect(460, 140, 1640, 700);
  for (let k = 0; k < 3; k++) for (let i = 0; i < 16; i++) { const y = 1080 + k * 130, x = 40 + i * 160 + (k % 2) * 60; c.fillStyle = '#7a1a1a'; c.beginPath(); c.roundRect(x, y, 130, 130, 20); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#9a2a2a'; c.fillRect(x + 10, y + 10, 110, 30); }
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .7 }); };
// Courtroom: judge tower desk
PLATES.court = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2a1a', '#1a1208'); brutalWall(c, r, 0, 0, W, 1000, '#6a4a2a');
  rays(c, r, 1280, 0, 12, 1200, '#ffe2a8', .06, .5); pr(c, r, 980, 120, 600, 640, '#4a3018', { density: 70, al: .8, topLight: .3, rim: '#ffd27a' }); c.strokeStyle = '#231A24'; c.lineWidth = 8; c.strokeRect(980, 120, 600, 640);
  pr(c, r, 900, 120, 760, 70, '#8a6a3a', { density: 30, al: .8, topLight: .5 }); c.fillStyle = '#c9a046'; c.beginPath(); c.arc(1280, 420, 90, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#4a3018'; c.beginPath(); c.arc(1280, 420, 60, 0, 7); c.fill();
  pr(c, r, 0, 1000, W, 440, '#8a6a42', { density: 130 }); for (const x of [400, 2160]) { pr(c, r, x - 160, 860, 320, 200, '#5a3a20', { density: 30, al: .8 }); c.strokeRect(x - 160, 860, 320, 200); }
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 }); };
// Archive: towers of files, ladders
PLATES.archive = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#5a4026', '#2a1a0e'); for (let i = 0; i < 9; i++) { const x = i * 300 - 40; pr(c, r, x, 0, 240, 1060, '#6a4a2a', { density: 30, al: .8 }); for (let y = 40; y < 1040; y += 70) { for (let k = 0; k < 7; k++) { c.fillStyle = rgb(jitter(r.pick(['#d8c8a0', '#c8a870', '#e8dcc0', '#a87a4a']), r, 15)); c.fillRect(x + 10 + k * 32, y, 28, 58); c.strokeStyle = 'rgba(35,26,36,.6)'; c.lineWidth = 2; c.strokeRect(x + 10 + k * 32, y, 28, 58); } } }
  pr(c, r, 0, 1060, W, 380, '#7a5a36', { density: 100 }); for (let i = 0; i < 25; i++) { const x = r() * W, y = 1100 + r() * 300; c.save(); c.translate(x, y); c.rotate(r.gauss() * .4); c.fillStyle = '#efe6cc'; c.fillRect(-60, -40, 120, 80); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.strokeRect(-60, -40, 120, 80); c.restore(); }
  glow(c, 1280, 300, 900, '#ffd98a', .2); finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 }); };
// Renaissance fair 1985
PLATES.renfair = (c, r, W, H) => { M.sky(c, r, W, 760, '#6ab0e8', '#e8f4ff'); M.clouds(c, r, W, 80, 380, 8, '#ffffff', '#c8d8e8'); M.distantTrees(c, r, W, 740, 40, '#3a6a3a');
  for (let i = 0; i < 5; i++) { const x = 160 + i * 520, col = r.pick(['#c83a3a', '#3a5ac8', '#e8c83a', '#3a9a5a']); c.fillStyle = '#efe6d0'; c.beginPath(); c.moveTo(x, 800); c.lineTo(x + 380, 800); c.lineTo(x + 380, 560); c.lineTo(x + 190, 380); c.lineTo(x, 560); c.closePath(); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.stroke();
    for (let k = 0; k < 5; k++) { c.fillStyle = col; c.beginPath(); c.moveTo(x + k * 76, 560); c.lineTo(x + 190, 380); c.lineTo(x + k * 76 + 38, 560); c.fill(); } c.fillStyle = col; c.beginPath(); c.moveTo(x + 190, 380); c.lineTo(x + 190, 320); c.lineTo(x + 240, 340); c.lineTo(x + 190, 360); c.fill(); }
  bunting(c, r, 0, W, 300, 180, ['#c83a3a', '#e8c83a', '#3a5ac8']); M.ground(c, r, W, H, 800, '#7aa04a', '#5a8a3a', {}); crowdSil(c, r, 860, 30, '#4a3a2a', 110); finish(c, r, W, H, { oil: 4, grain: 9, vig: .4 }); };
// Pompeii street, volcano erupting
PLATES.pompeii = (c, r, W, H) => { M.sky(c, r, W, 900, '#3a1a12', '#c84a1a'); c.fillStyle = '#2a1a14'; c.beginPath(); c.moveTo(900, 700); c.lineTo(1400, 260); c.lineTo(1640, 260); c.lineTo(2200, 700); c.closePath(); c.fill();
  for (let i = 0; i < 40; i++) glow(c, 1520 + r.gauss() * 200, 260 - r() * 260, 60 + r() * 120, r() < .5 ? '#ff6a1a' : '#5a3a3a', .4); for (let i = 0; i < 80; i++) { c.fillStyle = 'rgba(40,30,30,.15)'; c.beginPath(); c.arc(1520 + r.gauss() * 400, 120 - r() * 200, 80 + r() * 160, 0, 7); c.fill(); }
  for (let i = 0; i < 6; i++) { const x = i * 460 - 60; pr(c, r, x, 520, 380, 420, '#c8a878', { density: 60 }); c.fillStyle = '#5a3a2a'; c.fillRect(x + 140, 760, 100, 180); for (let k = 0; k < 4; k++) { c.fillStyle = '#e8d8b8'; c.fillRect(x + 20 + k * 90, 560, 40, 170); } c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 520, 380, 420); }
  pr(c, r, 0, 940, W, 500, '#8a7a62', { density: 140 }); for (let y = 960; y < H; y += 50) for (let x = (y / 50 % 2) * 60; x < W; x += 120) { c.strokeStyle = 'rgba(35,26,36,.3)'; c.lineWidth = 2; c.strokeRect(x, y, 120, 50); }
  for (let i = 0; i < 60; i++) glow(c, r() * W, r() * 900, 10 + r() * 20, '#ff8a3a', .5); finish(c, r, W, H, { oil: 4, grain: 12, vig: .6 }); };
// Roxxcart megastore in a hurricane, 2050
PLATES.roxxcart = (c, r, W, H) => { M.sky(c, r, W, 900, '#1a2a2a', '#4a5a52'); for (let i = 0; i < 30; i++) { c.fillStyle = 'rgba(20,30,30,.25)'; c.beginPath(); c.ellipse(r() * W, r() * 500, 300, 80, r.gauss() * .2, 0, 7); c.fill(); }
  pr(c, r, 200, 420, 2160, 560, '#6a7a72', { density: 120, topLight: .1 }); c.strokeStyle = '#231A24'; c.lineWidth = 8; c.strokeRect(200, 420, 2160, 560);
  c.fillStyle = 'rgba(160,220,200,.35)'; c.fillRect(700, 700, 1160, 280); for (let k = 0; k < 7; k++) lineSet(c, [[700 + k * 193, 700], [700 + k * 193, 980]], '#2a3a3a', 6);
  c.save(); c.font = '900 150px "Inter Display"'; c.textAlign = 'center'; c.fillStyle = '#ff3a6a'; c.shadowColor = '#ff3a6a'; c.shadowBlur = 40; c.fillText('ROXXKART', 1280, 620); c.restore(); glow(c, 1280, 560, 700, '#ff3a6a', .25);
  pr(c, r, 0, 980, W, 460, '#3a4440', { density: 120 }); for (let i = 0; i < 40; i++) glow(c, r() * W, 1000 + r() * 400, 90, '#ff6a8a', .06);
  for (let i = 0; i < 12; i++) { const x = 300 + r() * 1960, y = 1100 + r() * 250; c.fillStyle = '#8a9a92'; c.fillRect(x, y, 90, 60); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.strokeRect(x, y, 90, 60); } finish(c, r, W, H, { oil: 3, grain: 12, vig: .6 }); };
// Lamentis-1: purple world, huge planet looming, meteors
PLATES.lamentis = (c, r, W, H) => { M.sky(c, r, W, 900, '#1a0a2a', '#7a3a5a'); glow(c, 1500, 260, 900, '#ff6a3a', .3); c.fillStyle = '#5a2a3a'; c.beginPath(); c.arc(1500, 200, 620, 0, 7); c.fill(); paintRegion(c, r, (() => { const a = []; for (let i = 0; i < 40; i++) a.push([1500 + Math.cos(i / 40 * 7) * 620, 200 + Math.sin(i / 40 * 7) * 620]); return a; })(), '#8a3a4a', { density: 200, al: .5, topLight: .3, rim: '#ffb07a' });
  for (let i = 0; i < 14; i++) { const x = r() * W, y = r() * 700; lineSet(c, [[x, y], [x - 160, y - 120]], '#ffb07a', 6, .6); glow(c, x, y, 40, '#ffd27a', .8); }
  M.hills(c, r, P2.Noise(13), W, 820, 120, .002, 4, '#3a1a2a', { density: 900 }); M.ground(c, r, W, H, 900, '#5a3a3a', '#3a2028', {});
  for (let i = 0; i < 18; i++) { const x = r() * W, y = 950 + r() * 450, s = .4 + (y - 900) / 500; M.rock(c, r, x, y, 70 * s, 40 * s, '#4a2a2a', '#b07a6a'); glow(c, x, y, 60 * s, '#ff6a2a', .25); }
  finish(c, r, W, H, { oil: 4, grain: 12, vig: .6 }); };
// Train carriage interior (Lamentis), plush seats, windows of falling fire
PLATES.train = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a1a1a', '#1a0a0a'); for (let i = 0; i < 5; i++) { const x = 100 + i * 500; c.save(); c.beginPath(); c.roundRect(x, 220, 380, 380, 30); c.clip(); wash(c, r, [x, 220, 380, 380], '#2a0a2a', '#a83a3a'); glow(c, x + 190, 300, 200, '#ff8a3a', .4); for (let k = 0; k < 4; k++) lineSet(c, [[x + r() * 380, 220], [x + r() * 380 - 80, 600]], '#ffd27a', 4, .6); c.restore(); c.strokeStyle = '#c9a046'; c.lineWidth = 10; c.beginPath(); c.roundRect(x, 220, 380, 380, 30); c.stroke(); }
  pr(c, r, 0, 0, W, 180, '#5a2a1a', { density: 50 }); for (let i = 0; i < 8; i++) PRP.pendant(c, r, 160 + i * 320, 40, .8, {});
  for (let i = 0; i < 6; i++) { const x = i * 440 - 20; c.fillStyle = '#7a1a2a'; c.beginPath(); c.roundRect(x, 700, 360, 360, 30); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 5; c.stroke(); pr(c, r, x + 20, 720, 320, 120, '#9a2a3a', { density: 20, al: .5 }); }
  pr(c, r, 0, 1060, W, 380, '#4a2a1a', { density: 100 }); for (let i = 0; i < 40; i++) glow(c, r() * W, r() * 600, 40, '#ffd98a', .1); finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 }); };
// Lamentis station: the Ark and fire
PLATES.ark = (c, r, W, H) => { M.sky(c, r, W, 900, '#2a0a0a', '#c84a1a'); for (let i = 0; i < 60; i++) glow(c, r() * W, r() * 900, 80 + r() * 200, r() < .5 ? '#ff6a1a' : '#ffd27a', .2);
  c.fillStyle = '#3a3a44'; c.beginPath(); c.moveTo(900, 760); c.lineTo(1100, 300); c.lineTo(1460, 300); c.lineTo(1660, 760); c.closePath(); c.fill(); paintRegion(c, r, [[900, 760], [1100, 300], [1460, 300], [1660, 760]], '#5a5a66', { density: 80, al: .5, rim: '#ffb07a' }); c.strokeStyle = '#231A24'; c.lineWidth = 6; c.stroke();
  M.ground(c, r, W, H, 820, '#4a2a22', '#2a1414', {}); for (let i = 0; i < 20; i++) { const x = r() * W, y = 850 + r() * 500; glow(c, x, y, 120, '#ff5a1a', .35); }
  crowdSil(c, r, 900, 40, '#1a0a0a', 100); finish(c, r, W, H, { oil: 4, grain: 12, vig: .6 }); };
// Time-Keepers chamber: golden hall, three tall thrones
PLATES.keepers = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2a10', '#120a04'); rays(c, r, 1280, -200, 20, 1700, '#ffe2a8', .08, 1);
  for (let i = 0; i < 3; i++) { const x = 640 + i * 640; pr(c, r, x - 160, 160, 320, 760, '#8a6a24', { density: 60, al: .8, topLight: .4, rim: '#ffe2a8' }); c.strokeStyle = '#231A24'; c.lineWidth = 6; c.strokeRect(x - 160, 160, 320, 760); c.fillStyle = '#c9a046'; c.beginPath(); c.moveTo(x - 200, 160); c.lineTo(x, 40); c.lineTo(x + 200, 160); c.fill(); c.stroke(); }
  pr(c, r, 0, 920, W, 520, '#5a4218', { density: 140, topLight: .25 }); for (let i = 0; i < 40; i++) glow(c, r() * W, 950 + r() * 400, 90, '#ffd27a', .07); finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 }); };
// TVA corridor / elevator lobby (brutalist, warm)
PLATES.tva_corridor = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#b88a52', '#5a3a22'); pr(c, r, 0, 0, W, 1000, '#a07a4a', { density: 100 });
  c.fillStyle = '#3a2a18'; c.beginPath(); c.moveTo(980, 300); c.lineTo(1580, 300); c.lineTo(1580, 900); c.lineTo(980, 900); c.fill(); for (let k = 0; k < 8; k++) { const t = k / 8; lineSet(c, [[980 - t * 980, 300 - t * 300], [1580 + t * 980, 300 - t * 300]], '#7a5632', 3, .4); lineSet(c, [[980 - t * 980, 900 + t * 540], [1580 + t * 980, 900 + t * 540]], '#7a5632', 3, .4); }
  glow(c, 1280, 600, 300, '#ffd98a', .5); for (let i = 0; i < 5; i++) { const x = 120 + i * 180; c.fillStyle = '#c9a046'; c.fillRect(x, 420 + i * 10, 120, 300 - i * 30); } for (let i = 0; i < 5; i++) { const x = 2320 - i * 180; c.fillStyle = '#c9a046'; c.fillRect(x, 420 + i * 10, 120, 300 - i * 30); }
  pr(c, r, 0, 1000, W, 440, '#8a6a42', { density: 120 }); finish(c, r, W, H, { oil: 3, grain: 10, vig: .55 }); };


// ---------- batch 3: S2 locations ----------
PLATES.london = (c, r, W, H) => { M.sky(c, r, W, 700, '#0a0a1a', '#2a2a4a'); for (let i = 0; i < 8; i++) M.tower(c, r, i * 340, 700, 260, 300 + r() * 300, '#2a2232', '#ffd98a', {});
  pr(c, r, 300, 260, 1960, 640, '#5a2a2a', { density: 80 }); c.fillStyle = '#ffeec8'; c.fillRect(500, 300, 1560, 180); for (let i = 0; i < 40; i++) { c.fillStyle = '#ffd23d'; c.beginPath(); c.arc(520 + i * 39, 300, 9, 0, 7); c.arc(520 + i * 39, 480, 9, 0, 7); c.fill(); }
  c.save(); c.font = '900 120px "Inter Display"'; c.textAlign = 'center'; c.fillStyle = '#b01a1a'; c.fillText('ZANIAC!', 1280, 430); c.restore(); glow(c, 1280, 390, 900, '#ffd98a', .3);
  c.fillStyle = '#8a1a1a'; c.fillRect(0, 960, W, 480); paintRegion(c, r, rect(800, 960, 960, 480), '#b02a2a', { density: 60, al: .6 }); crowdSil(c, r, 1000, 26, '#1a1418', 140); for (let i = 0; i < 12; i++) glow(c, r() * W, 820 + r() * 160, 60, '#ffffff', .4);
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .55 }); };
PLATES.diner = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#e8d0a0', '#a87a4a'); pr(c, r, 0, 0, W, 760, '#e8d8b8', { density: 90 }); c.fillStyle = '#c83a2a'; c.fillRect(0, 120, W, 60);
  for (let i = 0; i < 5; i++) { const x = 220 + i * 440; c.fillStyle = '#2a2a2a'; c.fillRect(x, 220, 360, 200); c.fillStyle = '#ffd23d'; c.font = '800 34px Inter'; c.fillText(['BURGERS', 'FRIES', 'SHAKES', 'NUGGETS', 'SOFT SERVE'][i], x + 30, 280); for (let k = 0; k < 3; k++) { c.fillStyle = '#e8e8e8'; c.fillRect(x + 30, 310 + k * 34, 200, 12); } }
  pr(c, r, 0, 760, W, 260, '#c83a2a', { density: 60, topLight: .3 }); c.fillStyle = '#e8d8c0'; c.fillRect(0, 740, W, 40); for (let i = 0; i < 6; i++) { const x = 300 + i * 380; c.fillStyle = '#c8c8d0'; c.fillRect(x, 640, 90, 100); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 640, 90, 100); }
  pr(c, r, 0, 1020, W, 420, '#d8c8a8', { density: 120 }); for (let y = 1020; y < H; y += 80) for (let x = (y / 80 % 2) * 80; x < W; x += 160) { c.fillStyle = 'rgba(35,26,36,.12)'; c.fillRect(x, y, 80, 80); }
  rays(c, r, 2400, 0, 10, 1600, '#fff2c8', .08, .6); finish(c, r, W, H, { oil: 3, grain: 9, vig: .4 }); };
PLATES.alley1868 = (c, r, W, H) => { M.sky(c, r, W, 500, '#060812', '#1a1a2a'); for (let i = 0; i < 2; i++) { const x = i ? 1600 : 0, w = i ? 960 : 980; pr(c, r, x, 0, w, 1100, '#3a2a24', { density: 120 }); for (let y = 0; y < 1100; y += 40) lineSet(c, [[x, y], [x + w, y]], '#2a1a14', 2, .5);
    for (let k = 0; k < 3; k++) { const wx = x + 160 + k * 280, wy = 300; c.fillStyle = k === 1 && i ? '#ffcf7a' : '#1a1418'; c.fillRect(wx, wy, 140, 200); c.strokeStyle = '#231A24'; c.lineWidth = 6; c.strokeRect(wx, wy, 140, 200); if (k === 1 && i) glow(c, wx + 70, wy + 100, 260, '#ffcf7a', .5); } }
  pr(c, r, 0, 1100, W, 340, '#2a2420', { density: 120 }); for (let i = 0; i < 30; i++) M.rock(c, r, r() * W, 1150 + r() * 260, 40, 16, '#3a3430', '#6a6460'); for (let i = 0; i < 50; i++) { c.fillStyle = 'rgba(200,200,220,.04)'; c.beginPath(); c.arc(r() * W, r() * H, 100 + r() * 200, 0, 7); c.fill(); }
  finish(c, r, W, H, { oil: 4, grain: 12, vig: .7 }); };
PLATES.fair1893 = (c, r, W, H) => { M.sky(c, r, W, 760, '#4a7ac8', '#f8e8c8'); M.clouds(c, r, W, 60, 360, 8, '#fff', '#d8c8b8');
  const wx = 2000, wy = 420; c.strokeStyle = '#3a3a44'; c.lineWidth = 8; c.beginPath(); c.arc(wx, wy, 360, 0, 7); c.stroke(); c.beginPath(); c.arc(wx, wy, 340, 0, 7); c.stroke(); for (let i = 0; i < 24; i++) { const a = i / 24 * 7; lineSet(c, [[wx, wy], [wx + Math.cos(a) * 350, wy + Math.sin(a) * 350]], '#5a5a64', 3); c.fillStyle = '#c83a3a'; c.fillRect(wx + Math.cos(a) * 350 - 14, wy + Math.sin(a) * 350, 28, 22); } lineSet(c, [[wx - 120, 820], [wx, wy], [wx + 120, 820]], '#3a3a44', 12);
  for (let i = 0; i < 3; i++) { const x = 100 + i * 560; pr(c, r, x, 380, 500, 420, '#f4efe4', { density: 70, topLight: .3 }); c.fillStyle = '#f4efe4'; c.beginPath(); c.arc(x + 250, 380, 150, Math.PI, 0); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = '#d8d0c0'; c.fillRect(x + 30 + k * 80, 460, 30, 340); } c.strokeStyle = '#231A24'; c.lineWidth = 4; c.strokeRect(x, 380, 500, 420); }
  bunting(c, r, 0, 1800, 260, 160, ['#c83a3a', '#ffffff', '#3a5ac8']); M.ground(c, r, W, H, 800, '#d8c8a0', '#b8a880', {}); crowdSil(c, r, 880, 40, '#2a2a34', 120); for (let i = 0; i < 20; i++) glow(c, r() * W, 300 + r() * 500, 30, '#fff2c8', .5);
  finish(c, r, W, H, { oil: 4, grain: 9, vig: .4 }); };
PLATES.workshop = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#5a4026', '#2a1a0e'); pr(c, r, 0, 0, W, 980, '#6a4a2a', { density: 100 });
  for (let i = 0; i < 4; i++) { const x = 140 + i * 620; pr(c, r, x, 140, 480, 560, '#4a3018', { density: 40, al: .8 }); for (let k = 0; k < 4; k++) PRP.books(c, r, x + 20, 260 + k * 130, 1, 440); }
  for (let i = 0; i < 26; i++) { const x = r() * W, y = 100 + r() * 700; c.fillStyle = rgb(jitter(r.pick(['#c9a046', '#8a8a90', '#5a7a5a', '#a85a3a']), r, 15)); c.beginPath(); c.arc(x, y, 14 + r() * 26, 0, 7); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.stroke(); }
  pr(c, r, 0, 980, W, 460, '#5a3a20', { density: 120 }); pr(c, r, 500, 820, 1560, 70, '#8a6a3a', { density: 40, al: .9, topLight: .4 }); for (let i = 0; i < 12; i++) { c.fillStyle = '#efe6cc'; c.save(); c.translate(560 + i * 125, 810); c.rotate(r.gauss() * .2); c.fillRect(-40, -20, 80, 30); c.restore(); }
  glow(c, 1280, 500, 900, '#ffd98a', .25); finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 }); };
PLATES.jetski = (c, r, W, H) => { M.sky(c, r, W, 700, '#6ab8f0', '#e8f8ff'); c.fillStyle = '#3a8ac8'; c.fillRect(0, 640, W, 120); for (let i = 0; i < 40; i++) lineSet(c, [[r() * W, 650 + r() * 100], [r() * W + 60, 650 + r() * 100]], '#ffffff', 3, .5);
  pr(c, r, 0, 760, W, 680, '#d8c8a0', { density: 120 }); pr(c, r, 1500, 200, 1000, 560, '#f4efe4', { density: 60 }); c.fillStyle = '#e83a5a'; c.fillRect(1500, 200, 1000, 120); c.save(); c.font = '900 84px "Inter Display"'; c.fillStyle = '#fff'; c.fillText("DON'S JET SKIS", 1560, 290); c.restore();
  for (let i = 0; i < 3; i++) { const x = 300 + i * 560, y = 1100; c.fillStyle = r.pick(['#e8c83a', '#e83a5a', '#3ae8a8']); c.beginPath(); c.moveTo(x - 220, y); c.quadraticCurveTo(x - 240, y - 90, x - 60, y - 110); c.lineTo(x + 200, y - 70); c.quadraticCurveTo(x + 250, y - 20, x + 200, y); c.closePath(); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 5; c.stroke(); c.fillStyle = '#2a2a2a'; c.fillRect(x - 40, y - 150, 80, 40); }
  bunting(c, r, 0, 1500, 420, 120, ['#e83a5a', '#e8c83a', '#3ae8a8']); finish(c, r, W, H, { oil: 3, grain: 9, vig: .35 }); };
PLATES.alcatraz = (c, r, W, H) => { M.sky(c, r, W, 800, '#5a6a7a', '#b8c0c8'); c.fillStyle = '#3a4a5a'; c.fillRect(0, 760, W, 680); for (let i = 0; i < 60; i++) lineSet(c, [[r() * W, 780 + r() * 600], [r() * W, 780 + r() * 600]], '#8a9aaa', 2, .3);
  paintRegion(c, r, [[600, 760], [900, 420], [1700, 400], [2000, 760]], '#6a6a62', { density: 80, al: .8, topLight: .3 }); pr(c, r, 950, 260, 600, 200, '#c8c0b0', { density: 40 }); for (let k = 0; k < 10; k++) { c.fillStyle = '#2a2a2a'; c.fillRect(980 + k * 56, 300, 26, 40); } pr(c, r, 1600, 120, 60, 300, '#c8c0b0', { density: 20 });
  finish(c, r, W, H, { oil: 4, grain: 11, vig: .5 }); };
PLATES.clinic = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#d8e8e8', '#a8b8b8'); pr(c, r, 0, 0, W, 980, '#c8dcd8', { density: 80 }); for (let i = 0; i < 4; i++) PRP.ceilingPanel(c, 300 + i * 560, 30, 300, 50, .8);
  c.fillStyle = '#3a8a9a'; c.beginPath(); c.moveTo(900, 900); c.lineTo(1500, 760); c.lineTo(1700, 800); c.lineTo(1650, 960); c.lineTo(950, 1000); c.closePath(); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 6; c.stroke(); glow(c, 1300, 300, 300, '#ffffff', .6);
  pr(c, r, 0, 980, W, 460, '#b8c8c4', { density: 100 }); PRP.plant(c, r, 300, 980, 1.4, {}); finish(c, r, W, H, { oil: 3, grain: 8, vig: .35 }); };
PLATES.bookshop = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#4a3020', '#2a1a10'); for (let i = 0; i < 6; i++) { const x = i * 430; pr(c, r, x, 80, 390, 900, '#5a3a20', { density: 30, al: .8 }); for (let k = 0; k < 7; k++) PRP.books(c, r, x + 15, 200 + k * 125, 1, 360); }
  pr(c, r, 0, 980, W, 460, '#6a4a2a', { density: 100 }); pr(c, r, 800, 860, 960, 140, '#7a5a32', { density: 30, al: .8, topLight: .4 }); for (let i = 0; i < 8; i++) { c.fillStyle = '#3a6aa8'; c.fillRect(840 + i * 110, 820, 80, 40); c.fillStyle = '#ffd23d'; c.fillRect(850 + i * 110, 830, 60, 8); }
  glow(c, 1280, 400, 800, '#ffd98a', .25); finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 }); };
PLATES.beach = (c, r, W, H) => { M.sky(c, r, W, 640, '#ffb06a', '#ffe8c0'); M.sun(c, r, 1800, 520, 120, '#fff2c2', '#ffb15a'); c.fillStyle = '#3a7ab8'; c.fillRect(0, 620, W, 220); for (let i = 0; i < 80; i++) lineSet(c, [[r() * W, 630 + r() * 200], [r() * W, 630 + r() * 200]], '#ffd8a8', 2, .4);
  pr(c, r, 0, 840, W, 600, '#e8c890', { density: 140, topLight: .1 }); for (let i = 0; i < 20; i++) M.rock(c, r, r() * W, 900 + r() * 500, 20, 10, '#c8a870', '#f8e0b0'); glow(c, 1800, 520, 900, '#ffb06a', .25); finish(c, r, W, H, { oil: 4, grain: 9, vig: .4 }); };
PLATES.interrogation = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#2a2a26', '#0a0a08'); pr(c, r, 0, 0, W, 1000, '#4a4a40', { density: 100 }); c.fillStyle = 'rgba(160,200,230,.18)'; c.fillRect(1800, 200, 600, 400); c.strokeStyle = '#231A24'; c.lineWidth = 8; c.strokeRect(1800, 200, 600, 400);
  glow(c, 1280, 200, 900, '#fff2c8', .35); c.fillStyle = '#3a3a34'; c.beginPath(); c.moveTo(1200, 60); c.lineTo(1360, 60); c.lineTo(1420, 160); c.lineTo(1140, 160); c.closePath(); c.fill(); rays(c, r, 1280, 160, 8, 900, '#fff2c8', .06, .4);
  pr(c, r, 0, 1000, W, 440, '#3a3a34', { density: 100 }); pr(c, r, 880, 900, 800, 60, '#6a5a44', { density: 30, al: .9, topLight: .4 }); finish(c, r, W, H, { oil: 3, grain: 11, vig: .7 }); };
PLATES.tva_ruin = (c, r, W, H) => { PLATES.tva_office(c, r, W, H); for (let i = 0; i < 260; i++) { const x = r() * W, y = r() * H; c.strokeStyle = rgb(hex(r() < .5 ? '#ffd27a' : '#5aff8a'), .3 + r() * .4); c.lineWidth = 2 + r() * 4; c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + r.gauss() * 200, y - 200, x + r.gauss() * 300, y - 400, x + r.gauss() * 300, y - 700); c.stroke(); }
  c.fillStyle = 'rgba(10,8,6,.45)'; c.fillRect(0, 0, W, H); finish(c, r, W, H, { oil: 2, grain: 14, vig: .8 }); };

})();
