// DumDown Deadpool 2 plates, painted with the 2D line's p2 brush engine (2560x1440). Paint: node <p2>/paint.js plates.js plates/ all
window.PLATES = {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const M = window.M2, PRP = window.PR;
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const pr = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, rect(x, y, w, h), col, Object.assign({ density: 80, len: [10, 40], w: [3, 9], al: .45, topLight: .08, botDark: -.25, var: 10 }, o));
function lineSet(c, pts, col, w, al = 1) { c.save(); c.strokeStyle = rgb(hex(col), al); c.lineWidth = w; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore(); }
function vanish(c, r, vx, vy, W, H, col, n, al = .15) { for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; lineSet(c, [[vx, vy], [vx + Math.cos(a) * 3000, vy + Math.sin(a) * 3000]], col, 2, al); } }
function tube(c, r, x, y0, y1, w = 46) { pr(c, r, x - w / 2, y0, w, y1 - y0, '#b89a6a', { density: 30, al: .5, topLight: 0 }); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x - w / 2 + 6, y0, 8, y1 - y0); c.strokeStyle = '#231A24'; c.lineWidth = 3; c.strokeRect(x - w / 2, y0, w, y1 - y0);
  for (let y = y0 + 40; y < y1; y += 140) { c.fillStyle = '#8a6a3a'; c.fillRect(x - w / 2 - 6, y, w + 12, 16); c.strokeRect(x - w / 2 - 6, y, w + 12, 16); } }
function brutalWall(c, r, x, y, w, h, col) { pr(c, r, x, y, w, h, col, { density: 110, var: 8 }); for (let xx = x; xx < x + w; xx += 160) { c.fillStyle = rgb(shade(hex(col), -.25), .5); c.fillRect(xx, y, 6, h); }
  for (let yy = y + 90; yy < y + h; yy += 180) { c.fillStyle = rgb(shade(hex(col), -.2), .4); c.fillRect(x, yy, w, 5); } }


// ---------- Deadpool 2 helpers ----------
const TW = (c, r, x, base, w, h, b, g, o) => M.tower(c, r, x, base - h, w, h, b, g, o);
const ink = '#231A24';
function win(c, r, x, y, w, h, sky1, sky2, o = {}) { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); wash(c, r, [x, y, w, h], sky1, sky2); if (o.city) for (let i = 0; i < 9; i++) TW(c, r, x + i * w / 8 - 40, y + h, w / 9, h * (.3 + r() * .6), o.city, o.lit || '#ffd98a', {}); c.restore(); c.strokeStyle = ink; c.lineWidth = 12; c.strokeRect(x, y, w, h); c.lineWidth = 6; c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.moveTo(x, y + h / 2); c.lineTo(x + w, y + h / 2); c.stroke(); }
function floor(c, r, y, col, col2, boards = true) { pr(c, r, 0, y, 2560, 1440 - y, col, { density: 90, topLight: -.1, botDark: -.3 }); if (boards) M.floorBoards(c, r, [0, y, 2560, 1440 - y], col2, 10, 1280); }
function barrel(c, r, x, y, s, col = '#c83a1a') { c.save(); c.translate(x, y); c.scale(s, s); paintRegion(c, r, [[-60, -170], [60, -170], [66, -85], [60, 0], [-60, 0], [-66, -85]], col, { density: 20, al: .7, topLight: .25, botDark: -.4 }); c.strokeStyle = ink; c.lineWidth = 5; c.beginPath(); c.ellipse(0, -170, 60, 14, 0, 0, 7); c.stroke(); c.strokeRect(-62, -120, 124, 8); c.strokeRect(-62, -50, 124, 8); c.fillStyle = '#ffd23d'; c.beginPath(); c.moveTo(0, -105); c.lineTo(22, -68); c.lineTo(-22, -68); c.closePath(); c.fill(); c.stroke(); c.restore(); }
function fairy(c, r, x0, x1, y, sag, n = 24) { c.strokeStyle = 'rgba(40,30,30,.7)'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, yy = y + Math.sin(t * Math.PI) * sag; i ? c.lineTo(x, yy) : c.moveTo(x, yy); } c.stroke(); for (let i = 0; i <= n; i++) { const t = i / n; glow(c, x0 + (x1 - x0) * t, y + Math.sin(t * Math.PI) * sag + 8, 40, r.pick(['#ffd98a', '#ffb06a', '#fff2c2']), .55); } }
function neon(c, x, y, w, h, col, txt) { glow(c, x + w / 2, y + h / 2, Math.max(w, h), col, .35); c.strokeStyle = col; c.lineWidth = 8; c.strokeRect(x, y, w, h); if (txt) { c.font = `900 ${h * .55}px Inter`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(txt, x + w / 2, y + h / 2); } }
function bars(c, x, y, w, h, n, col = '#3a4450') { for (let i = 0; i <= n; i++) { const xx = x + i * w / n; c.fillStyle = col; c.fillRect(xx - 7, y, 14, h); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(xx - 4, y, 4, h); } c.fillStyle = col; c.fillRect(x, y, w, 18); c.fillRect(x, y + h - 18, w, 18); }
function portrait(c, r, x, y, w, h, col) { c.fillStyle = '#6a4a1a'; c.fillRect(x - 14, y - 14, w + 28, h + 28); wash(c, r, [x, y, w, h], col, shade(hex(col), -.4) && '#1a1210'); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(x + w / 2, y + h * .42, w * .2, h * .18, 0, 0, 7); c.fill(); c.fillRect(x + w * .25, y + h * .62, w * .5, h * .38); c.strokeStyle = '#c9a046'; c.lineWidth = 6; c.strokeRect(x - 14, y - 14, w + 28, h + 28); }

// 1. Wade's apartment at night: brick walls, city window, a mountain of red fuel barrels
PLATES.apt_barrels = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2226', '#120a0c'); pr(c, r, 0, 0, W, 1060, '#5a2e2a', { density: 140, var: 12 });
  for (let y = 30; y < 1060; y += 46) for (let x = (y / 46 % 2) * 60; x < W; x += 120) { c.strokeStyle = 'rgba(20,10,10,.35)'; c.lineWidth = 3; c.strokeRect(x, y, 120, 46); }
  win(c, r, 1650, 180, 640, 520, '#0a1030', '#2a2a5a', { city: '#141428', lit: '#ffcf6a' }); glow(c, 1970, 440, 500, '#6a7aff', .18);
  floor(c, r, 1060, '#3a2a22', '#2a1c16');
  const pile = [[700, 1150], [860, 1150], [1020, 1150], [1180, 1150], [780, 990], [940, 990], [1100, 990], [860, 830], [1020, 830]]; for (const [x, y] of pile) barrel(c, r, x, y, 1.15);
  PR.poster(c, r, 220, 300, 260, 360, { col: '#2fc6ff' }); glow(c, 400, 120, 300, '#ffb06a', .25); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// 2. Same apartment, warm anniversary night: fairy lights, couch, skee-ball machine
PLATES.apt_warm = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#6a3a2a', '#2a1410'); pr(c, r, 0, 0, W, 1060, '#7a4232', { density: 140, var: 12 });
  for (let y = 30; y < 1060; y += 46) for (let x = (y / 46 % 2) * 60; x < W; x += 120) { c.strokeStyle = 'rgba(30,14,10,.3)'; c.lineWidth = 3; c.strokeRect(x, y, 120, 46); }
  win(c, r, 1700, 200, 600, 480, '#141a3a', '#3a3a6a', { city: '#1a1a30', lit: '#ffd98a' }); fairy(c, r, 80, 2480, 120, 120, 30); fairy(c, r, 200, 1500, 260, 80, 18);
  floor(c, r, 1060, '#5a3626', '#40261a');
  paintRegion(c, r, [[260, 760], [1020, 760], [1040, 1080], [240, 1080]], '#8a2a3a', { density: 40, al: .7, topLight: .2, botDark: -.4 }); c.strokeStyle = ink; c.lineWidth = 6; c.strokeRect(260, 860, 760, 220);
  paintRegion(c, r, [[2120, 560], [2380, 560], [2420, 1080], [2080, 1080]], '#2a5a8a', { density: 30, al: .7, topLight: .3 }); c.fillStyle = '#ffd23d'; c.font = '900 50px Inter'; c.textAlign = 'center'; c.fillText('SKEE', 2250, 640); for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(2250, 760 + i * 60, 30 - i * 4, 0, 7); c.strokeStyle = '#ffd23d'; c.lineWidth = 6; c.stroke(); }
  PR.plant(c, r, 1180, 1060, 1.2); PR.pendant(c, r, 640, 0, 1.2); glow(c, 640, 300, 600, '#ffb06a', .3); finish(c, r, W, H, { oil: 2, grain: 12, vig: .4 }); };
// 3. Hong Kong neon rooftop at night
PLATES.hongkong = (c, r, W, H) => { M.sky(c, r, W, 1000, '#08081a', '#3a1a4a'); for (let i = 0; i < 12; i++) TW(c, r, i * 230 - 50, 1000, 200, 350 + r() * 550, '#141428', '#ff5ab0', {});
  const signs = [['#ff3a6a', '酒'], ['#2fc6ff', '龍'], ['#ffd23d', '金'], ['#5aff8a', '茶'], ['#ff8a2a', '夜']]; signs.forEach(([col, t], i) => neon(c, 160 + i * 500, 300 + (i % 2) * 180, 120, 260, col, t));
  pr(c, r, 0, 1000, W, 440, '#2a2a34', { density: 100 }); c.fillStyle = '#3a3a48'; c.fillRect(0, 990, W, 24); for (let i = 0; i < 6; i++) { c.fillStyle = '#4a4a58'; c.fillRect(200 + i * 420, 860, 180, 140); c.strokeStyle = ink; c.lineWidth = 4; c.strokeRect(200 + i * 420, 860, 180, 140); }
  for (let i = 0; i < 30; i++) glow(c, r() * W, 1100 + r() * 300, 80, r.pick(['#ff3a6a', '#2fc6ff']), .12); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// 4. Taxi street: New York at dusk, yellow cab parked, steam
PLATES.nyc_street = (c, r, W, H) => { M.sky(c, r, W, 800, '#2a3a6a', '#ffb07a'); for (let i = 0; i < 10; i++) TW(c, r, i * 270 - 30, 900, 240, 400 + r() * 500, '#3a3040', '#ffd98a', {});
  pr(c, r, 0, 900, W, 140, '#5a5a62', { density: 60 }); pr(c, r, 0, 1040, W, 400, '#2a2a30', { density: 100 }); for (let i = 0; i < 8; i++) { c.fillStyle = '#e8e0c8'; c.fillRect(i * 340 + 40, 1230, 180, 14); }
  paintRegion(c, r, [[1500, 860], [2000, 860], [2120, 960], [2160, 1100], [1380, 1100], [1400, 960]], '#ffc81e', { density: 30, al: .8, topLight: .3, botDark: -.3 }); c.strokeStyle = ink; c.lineWidth = 6; c.strokeRect(1560, 880, 400, 80); c.fillStyle = '#9ac8e8'; c.fillRect(1570, 890, 380, 60);
  for (const x of [1520, 2020]) { c.fillStyle = '#141418'; c.beginPath(); c.arc(x, 1100, 70, 0, 7); c.fill(); c.fillStyle = '#8a8a90'; c.beginPath(); c.arc(x, 1100, 28, 0, 7); c.fill(); }
  c.fillStyle = '#231A24'; c.fillRect(1700, 830, 120, 34); c.fillStyle = '#ffd23d'; c.font = '900 26px Inter'; c.textAlign = 'center'; c.fillText('TAXI', 1760, 857);
  for (let i = 0; i < 6; i++) glow(c, 400 + i * 60, 1000 - i * 70, 120, '#ffffff', .1); finish(c, r, W, H, { oil: 2, grain: 12, vig: .4 }); };
// 5. The dream: snowy glowing nowhere, warm golden light
PLATES.dream = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#fff2d8', '#b8c8e8'); rays(c, r, 1280, -200, 24, 1800, '#ffe8a8', .12, 1); M.glowDisk(c, 1700, 600, 500, '#ffe2a0');
  for (let i = 0; i < 400; i++) { c.fillStyle = `rgba(255,255,255,${.4 + r() * .5})`; c.beginPath(); c.arc(r() * W, r() * H, 2 + r() * 6, 0, 7); c.fill(); }
  paintRegion(c, r, [[0, 1080], [600, 1020], [1300, 1060], [2000, 1000], [2560, 1050], [2560, 1440], [0, 1440]], '#e8eef8', { density: 60, al: .6, topLight: .2 }); pr(c, r, 0, 1100, W, 340, '#f4f6fc', { density: 60, topLight: .1 }); finish(c, r, W, H, { oil: 2, grain: 12, vig: .25 }); };
// 6. The mansion lawn: big stone school, empty
PLATES.mansion_ext = (c, r, W, H) => { M.sky(c, r, W, 900, '#5a8ac8', '#e8f0f8'); M.clouds(c, r, W, 60, 360, 7, '#ffffff', '#c8d4e4'); M.distantTrees(c, r, W, 820, 40, '#2a5a3a');
  pr(c, r, 500, 260, 1560, 640, '#9a8e7e', { density: 160, var: 10 }); for (let i = 0; i < 3; i++) { const x = [500, 1180, 1860][i]; c.fillStyle = '#5a3a3a'; c.beginPath(); c.moveTo(x - 40, 300); c.lineTo(x + 100, 120); c.lineTo(x + 240, 300); c.closePath(); c.fill(); c.strokeStyle = ink; c.lineWidth = 6; c.stroke(); }
  M.windowGrid(c, r, [560, 360, 1440, 460], 10, 3, '#3a4a6a', '#e8e0d0', .2); paintRegion(c, r, [[1180, 620], [1380, 620], [1380, 900], [1180, 900]], '#4a2a1a', { density: 20, al: .8 });
  M.ground(c, r, W, H, 900, '#4a8a3a', '#6aa84a', {}); M.grassTufts(c, r, W, 920, 1400, 180, ['#3a7a2a', '#5a9a3a'], {}); for (let i = 0; i < 5; i++) M.bush(c, r, 100 + i * 560, 930, 220, 120, '#2a6a2a', '#5a9a3a'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .3 }); };
// 7. Mansion hallway: wood panels, portraits, all doors shut
PLATES.mansion_hall = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#5a3a22', '#2a1a10'); pr(c, r, 0, 0, W, 1040, '#6a4a2a', { density: 140, var: 10 }); for (let x = 0; x < W; x += 320) { c.fillStyle = 'rgba(30,18,10,.35)'; c.fillRect(x, 600, 12, 440); }
  pr(c, r, 0, 600, W, 440, '#4a2e18', { density: 80 }); c.fillStyle = '#c9a046'; c.fillRect(0, 590, W, 14);
  const cols = ['#3a5a8a', '#8a3a3a', '#3a6a4a', '#6a4a8a', '#8a6a2a', '#2a4a6a']; cols.forEach((col, i) => portrait(c, r, 120 + i * 410, 180, 220, 300, col));
  floor(c, r, 1040, '#5a3218', '#3a200e'); paintRegion(c, r, [[600, 1100], [1960, 1100], [2300, 1440], [260, 1440]], '#7a1a22', { density: 40, al: .6, topLight: .1 });
  for (let i = 0; i < 4; i++) PR.pendant(c, r, 300 + i * 650, 0, 1); finish(c, r, W, H, { oil: 2, grain: 12, vig: .45 }); };
// 8. Classroom with a whiteboard (rules)
PLATES.classroom = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#c8b896', '#8a7a5a'); pr(c, r, 0, 0, W, 1040, '#cbbd9a', { density: 120 }); PR.whiteboard(c, r, 700, 220, 1, 1160, 520);
  win(c, r, 2000, 200, 400, 520, '#8ac0f0', '#e8f4ff'); PR.books(c, r, 120, 500, 1, 400); PR.books(c, r, 120, 620, 1, 400); PR.clock(c, r, 1900, 160, 1);
  floor(c, r, 1040, '#8a6a42', '#6a4e2e'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .3 }); };
// 9. The orphanage gate, daytime: grey building, spiked fence, news vans
PLATES.orphanage = (c, r, W, H) => { M.sky(c, r, W, 900, '#7a8494', '#c8ccd0'); M.clouds(c, r, W, 40, 300, 9, '#d8dce0', '#8a92a0');
  pr(c, r, 380, 200, 1800, 700, '#6a6a70', { density: 160, var: 8 }); M.windowGrid(c, r, [440, 280, 1680, 520], 12, 3, '#2a3240', '#4a4a50', .15); c.fillStyle = '#3a3a40'; c.beginPath(); c.moveTo(340, 220); c.lineTo(1280, 60); c.lineTo(2220, 220); c.closePath(); c.fill();
  c.fillStyle = '#e8e8ea'; c.font = '900 64px Georgia'; c.textAlign = 'center'; c.fillText('ESSEX HOUSE', 1280, 200);
  M.ground(c, r, W, H, 900, '#6a6a5a', '#8a8a7a', {}); for (let x = 0; x < W; x += 60) { c.fillStyle = '#1e1e24'; c.fillRect(x, 960, 12, 240); c.beginPath(); c.moveTo(x - 6, 960); c.lineTo(x + 6, 920); c.lineTo(x + 18, 960); c.fill(); } c.fillRect(0, 990, W, 12); c.fillRect(0, 1150, W, 12);
  for (const x of [120, 2280]) { paintRegion(c, r, [[x, 820], [x + 240, 820], [x + 240, 980], [x, 980]], '#e8e8ea', { density: 20, al: .8 }); c.fillStyle = '#e23a3a'; c.fillRect(x, 850, 240, 20); c.fillStyle = '#9aa0a8'; c.fillRect(x + 100, 740, 12, 80); c.beginPath(); c.arc(x + 106, 730, 40, Math.PI, 0); c.fill(); }
  finish(c, r, W, H, { oil: 2, grain: 12, vig: .35 }); };
// 10. Orphanage courtyard at night, burning
PLATES.orphanage_fire = (c, r, W, H) => { PLATES.orphanage(c, r, W, H); c.fillStyle = 'rgba(10,6,20,.55)'; c.fillRect(0, 0, W, H); for (let i = 0; i < 9; i++) { const x = 500 + i * 190; glow(c, x, 300 + r() * 200, 260, '#ff6a1a', .45); for (let k = 0; k < 10; k++) stroke(c, r, x + r.gauss() * 40, 520, 200 + r() * 200, -Math.PI / 2 + r.gauss() * .2, 18, r.pick(['#ff8a1a', '#ffd23d', '#ff4a1a']), .6); }
  for (let i = 0; i < 140; i++) { c.fillStyle = `rgba(255,${120 + r() * 120},40,${r()})`; c.fillRect(r() * W, r() * 900, 4, 4); } glow(c, 1280, 1300, 900, '#ff6a2a', .25); finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// 11. The Icebox yard: cold blue concrete, cages, floodlights
PLATES.icebox = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#2a3a4e', '#0a1220'); brutalWall(c, r, 0, 0, W, 1000, '#4a5a6a'); bars(c, 200, 220, 900, 700, 14); bars(c, 1460, 220, 900, 700, 14);
  for (const x of [400, 1280, 2160]) { glow(c, x, 90, 420, '#cfe8ff', .35); rays(c, r, x, 60, 10, 1300, '#cfe8ff', .05, .5); }
  floor(c, r, 1000, '#5a6676', '#3a4656', false); for (let i = 0; i < 6; i++) { c.strokeStyle = '#ffd23d'; c.lineWidth = 10; c.setLineDash([60, 40]); c.beginPath(); c.moveTo(0, 1060 + i * 70); c.lineTo(W, 1060 + i * 70); c.stroke(); c.setLineDash([]); break; }
  for (let i = 0; i < 260; i++) { c.fillStyle = 'rgba(220,240,255,.5)'; c.fillRect(r() * W, r() * H, 2, 2); } finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// 12. The pit in the Icebox basement: chains, dark, two red eyes possible
PLATES.pit = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#121822', '#040608'); brutalWall(c, r, 0, 0, W, 1100, '#222a34'); c.fillStyle = '#05070a'; c.beginPath(); c.ellipse(1280, 1180, 900, 220, 0, 0, 7); c.fill();
  for (let i = 0; i < 8; i++) { const x = 600 + i * 190; c.strokeStyle = '#5a6270'; c.lineWidth = 10; c.setLineDash([24, 10]); c.beginPath(); c.moveTo(x, 0); c.quadraticCurveTo(x + 40, 600, 1280 + (x - 1280) * .3, 1150); c.stroke(); c.setLineDash([]); }
  glow(c, 1280, 200, 500, '#6a8aff', .15); finish(c, r, W, H, { oil: 2, grain: 12, vig: .7 }); };
// 13. Night road with lightning crater
PLATES.road_night = (c, r, W, H) => { M.sky(c, r, W, 900, '#04040c', '#1a1a3a'); M.clouds(c, r, W, 40, 400, 10, '#3a3a5a', '#0a0a18'); M.distantTrees(c, r, W, 900, 50, '#0a0e14');
  pr(c, r, 0, 900, W, 540, '#1a1a20', { density: 120 }); for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(232,220,160,.6)'; c.fillRect(i * 460 + 80, 1180, 220, 16); }
  c.fillStyle = '#0a0a0e'; c.beginPath(); c.ellipse(1280, 1120, 420, 80, 0, 0, 7); c.fill(); glow(c, 1280, 1100, 500, '#6ab4ff', .4); c.strokeStyle = '#cfe8ff'; c.lineWidth = 8; c.beginPath(); let x = 1240, y = 0; c.moveTo(x, y); while (y < 1100) { x += r.gauss() * 60; y += 80 + r() * 60; c.lineTo(x, y); } c.stroke(); finish(c, r, W, H, { oil: 2, grain: 12, vig: .6 }); };
// 14. Weasel's bar: dim, neon beer signs, bottles
PLATES.bar = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2418', '#120a06'); pr(c, r, 0, 0, W, 1000, '#4a2c1a', { density: 140 });
  for (let k = 0; k < 3; k++) { c.fillStyle = '#2a1a0e'; c.fillRect(300, 300 + k * 160, 1900, 18); for (let i = 0; i < 26; i++) { c.fillStyle = r.pick(['#3a8a3a', '#8a3a1a', '#c8a040', '#2a4a8a', '#e8e0c8']); c.fillRect(320 + i * 72, 300 + k * 160 - 90, 30, 90); } }
  neon(c, 200, 120, 420, 120, '#ff3a6a', 'BEER'); neon(c, 1940, 120, 420, 120, '#2fc6ff', 'OPEN');
  paintRegion(c, r, [[0, 900], [W, 900], [W, 1060], [0, 1060]], '#6a3a1a', { density: 40, al: .8, topLight: .3 }); c.fillStyle = '#c9a046'; c.fillRect(0, 892, W, 12); floor(c, r, 1060, '#2a1a10', '#1a0e08'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// 15. Bland interview office
PLATES.office = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#d8d4c8', '#a8a498'); pr(c, r, 0, 0, W, 1020, '#d4cfc0', { density: 100 }); for (let i = 0; i < 4; i++) PR.ceilingPanel(c, 300 + i * 560, 20, 320, 50, .8);
  win(c, r, 1700, 180, 700, 500, '#8ac0f0', '#e8f4ff', { city: '#8a96a8', lit: '#ffffff' }); PR.whiteboard(c, r, 300, 220, 1, 900, 440); PR.waterCooler && PR.waterCooler(c, r, 1450, 1020, 1); PR.plant(c, r, 2450, 1020, 1.1);
  floor(c, r, 1020, '#8a8a8e', '#6a6a70', false); finish(c, r, W, H, { oil: 2, grain: 12, vig: .25 }); };
// 16. High in the sky above the highway (skydive)
PLATES.sky_drop = (c, r, W, H) => { M.sky(c, r, W, H, '#3a7ad8', '#c8e4ff'); M.clouds(c, r, W, 200, 1300, 14, '#ffffff', '#b8cce4', {}); for (let i = 0; i < 40; i++) { c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; const x = r() * W, y = r() * H; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 300, y - 40); c.stroke(); } finish(c, r, W, H, { oil: 2, grain: 12, vig: .2 }); };
// 17. Highway by day: convoy road, guardrails, city edge
PLATES.highway = (c, r, W, H) => { M.sky(c, r, W, 760, '#5a9ae0', '#e8f0f8'); M.clouds(c, r, W, 60, 320, 7, '#fff', '#c8d4e4'); for (let i = 0; i < 9; i++) TW(c, r, 300 + i * 220, 760, 180, 200 + r() * 260, '#8a96a8', '#e8f0f8', {});
  M.ground(c, r, W, H, 760, '#6a8a4a', '#8aa86a', {}); paintRegion(c, r, [[0, 880], [W, 880], [W, 1440], [0, 1440]], '#4a4a52', { density: 120, topLight: -.1 }); for (let i = 0; i < 7; i++) { c.fillStyle = '#ffd23d'; c.fillRect(i * 400, 1150, 220, 18); }
  c.fillStyle = '#b8bcc4'; c.fillRect(0, 860, W, 20); for (let x = 0; x < W; x += 140) c.fillRect(x, 860, 10, 60); finish(c, r, W, H, { oil: 2, grain: 12, vig: .25 }); };
// 18. Rooftop at dusk (Cable's choice)
PLATES.rooftop_dusk = (c, r, W, H) => { M.sky(c, r, W, 1000, '#2a2a5a', '#ff9a5a'); M.sun(c, r, 1900, 860, 140, '#fff2c2', '#ff8a4a'); for (let i = 0; i < 12; i++) TW(c, r, i * 220 - 20, 1000, 200, 200 + r() * 400, '#2a2234', '#ffd98a', {});
  pr(c, r, 0, 1000, W, 440, '#3a3036', { density: 100 }); c.fillStyle = '#2a2026'; c.fillRect(0, 990, W, 30); for (let i = 0; i < 3; i++) { c.fillStyle = '#4a3a3a'; c.fillRect(300 + i * 800, 840, 180, 160); c.strokeStyle = ink; c.lineWidth = 4; c.strokeRect(300 + i * 800, 840, 180, 160); } finish(c, r, W, H, { oil: 2, grain: 12, vig: .4 }); };
// 19. Cable's future home (soft blue memory)
PLATES.future_home = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#6a8ab8', '#2a3a5a'); pr(c, r, 0, 0, W, 1040, '#7a96bc', { density: 100 }); win(c, r, 1600, 200, 700, 500, '#3a2a6a', '#ff8a6a', { city: '#2a2a4a', lit: '#8ae0ff' });
  PR.bed(c, r, 500, 1040, 1.1); PR.plant(c, r, 1300, 1040, 1); PR.poster(c, r, 300, 260, 300, 380, { col: '#ffd23d' }); floor(c, r, 1040, '#5a6a8a', '#4a5a7a'); glow(c, 1280, 600, 1200, '#bfe0ff', .2); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// 20. Heaven: golden glowing place
PLATES.heaven = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#fff2c2', '#ffb86a'); rays(c, r, 1280, 300, 30, 2000, '#fff8e0', .14, 6.3); M.glowDisk(c, 1280, 420, 600, '#fff6d8'); M.clouds(c, r, W, 900, 1440, 12, '#fff8f0', '#ffd8a8', {}); finish(c, r, W, H, { oil: 2, grain: 12, vig: .2 }); };
// 21. Comic recap backdrop: halftone panels
PLATES.comic = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#ffd23d', '#ff6a2b'); for (let y = 0; y < H; y += 26) for (let x = (y / 26 % 2) * 13; x < W; x += 26) { c.fillStyle = 'rgba(200,40,40,.25)'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); } rays(c, r, 1280, 720, 28, 1800, '#ffffff', .1, 6.3); finish(c, r, W, H, { oil: 2, grain: 12, vig: .2 }); };
// 22. Prison convoy truck interior
PLATES.truck = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a3a3e', '#141418'); pr(c, r, 0, 0, W, 1060, '#4a4a50', { density: 100 }); for (let x = 100; x < W; x += 300) { c.fillStyle = '#2a2a2e'; c.fillRect(x, 0, 30, 1060); for (let y = 40; y < 1060; y += 90) { c.fillStyle = '#6a6a70'; c.beginPath(); c.arc(x + 15, y, 6, 0, 7); c.fill(); } }
  c.fillStyle = '#ff2a2a'; glow(c, 1280, 80, 400, '#ff2a2a', .35); floor(c, r, 1060, '#2a2a2e', '#1a1a1e', false); finish(c, r, W, H, { oil: 2, grain: 12, vig: .6 }); };

})();
