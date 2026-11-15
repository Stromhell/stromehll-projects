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
PLATES.pit = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#121822', '#040608'); brutalWall(c, r, 0, 0, W, 1100, '#3a4452'); c.fillStyle = '#05070a'; c.beginPath(); c.ellipse(1280, 1180, 900, 220, 0, 0, 7); c.fill();
  for (let i = 0; i < 8; i++) { const x = 600 + i * 190; c.strokeStyle = '#5a6270'; c.lineWidth = 10; c.setLineDash([24, 10]); c.beginPath(); c.moveTo(x, 0); c.quadraticCurveTo(x + 40, 600, 1280 + (x - 1280) * .3, 1150); c.stroke(); c.setLineDash([]); }
  glow(c, 1280, 200, 500, '#6a8aff', .15); finish(c, r, W, H, { oil: 2, grain: 12, vig: .7 }); };
// 13. Night road with lightning crater
PLATES.road_night = (c, r, W, H) => { M.sky(c, r, W, 900, '#0c0e22', '#2c2e5a'); M.clouds(c, r, W, 40, 400, 10, '#3a3a5a', '#0a0a18'); M.distantTrees(c, r, W, 900, 50, '#0a0e14');
  pr(c, r, 0, 900, W, 540, '#2c2c36', { density: 120 }); for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(232,220,160,.6)'; c.fillRect(i * 460 + 80, 1180, 220, 16); }
  c.fillStyle = '#0a0a0e'; c.beginPath(); c.ellipse(1280, 1120, 420, 80, 0, 0, 7); c.fill(); glow(c, 1280, 1100, 500, '#6ab4ff', .4); finish(c, r, W, H, { oil: 2, grain: 12, vig: .6 }); };
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

// ---- detail dressing pass (DumDown: highly detailed painted backgrounds) ----
(function () {
const { hex, rgb, shade, glow, finish } = P2;
const INK = '#231A24';
function grime(c, r, fy, k = 1) { for (let i = 0; i < 70 * k; i++) { const x = r() * 2560, w = 20 + r() * 120, h = 60 + r() * 500, y = r() * (fy - h); c.fillStyle = `rgba(${r() < .5 ? '0,0,0' : '255,240,220'},${.018 + r() * .025})`; c.beginPath(); c.ellipse(x, y + h / 2, w / 2, h / 2, 0, 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 2; for (let i = 0; i < 8 * k; i++) { let x = r() * 2560, y = r() * fy * .8; c.beginPath(); c.moveTo(x, y); for (let j = 0; j < 6; j++) { x += (r() - .5) * 40; y += 10 + r() * 25; c.lineTo(x, y); } c.stroke(); }
  const g = c.createLinearGradient(0, 0, 0, 260); g.addColorStop(0, 'rgba(0,0,0,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, 2560, 260); }
function base(c, fy, col) { c.fillStyle = col; c.fillRect(0, fy - 34, 2560, 34); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(0, fy - 34, 2560, 4); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, fy, 2560, 10); }
function planks(c, r, fy, col) { const H = 1440; for (let y = fy + 10, k = 0; y < H; k++) { const h = 18 + k * 9; c.strokeStyle = 'rgba(0,0,0,.28)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y); c.lineTo(2560, y); c.stroke(); let x = (k * 397) % 520; while (x < 2560) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.stroke(); x += 380 + r() * 260; } y += h; }
  for (let i = 0; i < 260; i++) { const y = fy + r() * (H - fy), x = r() * 2560; c.strokeStyle = `rgba(${r() < .5 ? '0,0,0' : '255,230,200'},.07)`; c.lineWidth = 1 + r() * 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 40 + r() * 140, y + (r() - .5) * 3); c.stroke(); }
  const g = c.createLinearGradient(0, fy, 0, H); g.addColorStop(0, 'rgba(255,240,210,.10)'); g.addColorStop(1, 'rgba(0,0,0,.35)'); c.fillStyle = g; c.fillRect(0, fy, 2560, H - fy); }
function sconce(c, x, y, col = '#ffd890') { glow(c, x, y + 10, 260, col, .35); c.fillStyle = '#3a2a1a'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - 8, y + 20, 16, 40); c.strokeRect(x - 8, y + 20, 16, 40); c.fillStyle = col; c.beginPath(); c.moveTo(x - 34, y + 22); c.lineTo(x + 34, y + 22); c.lineTo(x + 22, y - 26); c.lineTo(x - 22, y - 26); c.closePath(); c.fill(); c.stroke(); }
function pendant(c, x, len, col = '#ffd890') { c.strokeStyle = '#1a1214'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, len); c.stroke(); glow(c, x, len + 30, 340, col, .4); c.fillStyle = '#2a2a2e'; c.strokeStyle = INK; c.beginPath(); c.moveTo(x - 60, len + 40); c.lineTo(x + 60, len + 40); c.lineTo(x + 24, len); c.lineTo(x - 24, len); c.closePath(); c.fill(); c.stroke(); c.fillStyle = col; c.beginPath(); c.ellipse(x, len + 42, 40, 8, 0, 0, 7); c.fill(); }
function frame(c, r, x, y, w, h, kind = 0) { c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x + 8, y + 10, w, h); c.fillStyle = '#6a4a2a'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x, y, w, h); c.strokeRect(x, y, w, h);
  const ix = x + 12, iy = y + 12, iw = w - 24, ih = h - 24; const P = [['#f0b070', '#5a3a6a'], ['#8ac0e0', '#2a5a3a'], ['#e8d8b0', '#8a2a2a'], ['#2a2a40', '#e0c060']][kind % 4]; const g = c.createLinearGradient(0, iy, 0, iy + ih); g.addColorStop(0, P[0]); g.addColorStop(1, P[1]); c.fillStyle = g; c.fillRect(ix, iy, iw, ih);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.moveTo(ix, iy + ih); for (let k = 0; k <= 6; k++) c.lineTo(ix + iw * k / 6, iy + ih * (.55 + r() * .25)); c.lineTo(ix + iw, iy + ih); c.fill(); }
function plant(c, r, x, fy, s = 1) { c.save(); c.translate(x, fy); c.scale(s, s); for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (r() - .5) * 2.2, L = 90 + r() * 120; c.strokeStyle = '#1e4a24'; c.lineWidth = 4; c.fillStyle = i % 2 ? '#3a8a3a' : '#2a6a2e'; c.beginPath(); c.moveTo(0, -110); const ex = Math.cos(a) * L, ey = -110 + Math.sin(a) * L; c.quadraticCurveTo(ex * .3 - 20, ey * .8, ex, ey); c.quadraticCurveTo(ex * .3 + 20, ey * .6, 0, -110); c.fill(); c.stroke(); }
  c.fillStyle = '#b05a32'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-60, -120); c.lineTo(60, -120); c.lineTo(44, 0); c.lineTo(-44, 0); c.closePath(); c.fill(); c.stroke(); c.restore(); }
function shelf(c, r, x, y, w) { c.fillStyle = '#5a3a1e'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x, y, w, 18); c.strokeRect(x, y, w, 18); let xx = x + 10; while (xx < x + w - 30) { const bw = 18 + r() * 22, bh = 60 + r() * 50; c.fillStyle = ['#8a2a2a', '#2a4a7a', '#c8a040', '#3a6a3a', '#e8e0d0'][Math.floor(r() * 5)]; c.fillRect(xx, y - bh, bw, bh); c.strokeRect(xx, y - bh, bw, bh); xx += bw + 4; } }
function pipe(c, y, col = '#5a6470') { c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(0, y, 2560, 34); c.strokeRect(-5, y, 2570, 34); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(0, y + 5, 2560, 6); for (let x = 120; x < 2560; x += 420) { c.fillStyle = shadeC(col); c.fillRect(x, y - 8, 30, 50); c.strokeRect(x, y - 8, 30, 50); } }
function shadeC(col) { return rgb(shade(hex(col), -.25)); }
function stripes(c, x, y, w, h) { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = '#ffd23d'; c.fillRect(x, y, w, h); c.fillStyle = '#1a1a1a'; for (let i = -h; i < w; i += 60) { c.beginPath(); c.moveTo(x + i, y + h); c.lineTo(x + i + 30, y + h); c.lineTo(x + i + 30 + h, y); c.lineTo(x + i + h, y); c.fill(); } c.restore(); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x, y, w, h); }
function sign(c, x, y, t, bg = '#e8e0c8', fg = '#231A24', sz = 34) { c.font = `900 ${sz}px Inter`; const w = c.measureText(t).width + 40; c.fillStyle = bg; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - w / 2, y - sz, w, sz * 1.7); c.strokeRect(x - w / 2, y - sz, w, sz * 1.7); c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y - sz * .15); }
function cam(c, x, y) { c.fillStyle = '#d8d8d0'; c.strokeStyle = INK; c.lineWidth = 4; c.save(); c.translate(x, y); c.rotate(.35); c.fillRect(-50, -20, 100, 40); c.strokeRect(-50, -20, 100, 40); c.fillStyle = '#ff2a2a'; c.beginPath(); c.arc(38, -8, 6, 0, 7); c.fill(); c.restore(); c.fillStyle = '#8a8a88'; c.fillRect(x - 6, y - 60, 12, 50); }
function rivets(c, fy) { c.fillStyle = 'rgba(200,210,220,.35)'; for (let x = 40; x < 2560; x += 80) for (let y = 60; y < fy; y += 300) { c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); } }
const DRESS = {
  apt_barrels: (c, r) => { grime(c, r, 1060); base(c, 1060, '#2a1a14'); planks(c, r, 1060); sconce(c, 1450, 480, '#ffb070'); frame(c, r, 1280, 250, 180, 140, 3); shelf(c, r, 2340, 760, 200); pendant(c, 900, 120, '#ffb070'); },
  apt_warm: (c, r) => { grime(c, r, 1060, .6); base(c, 1060, '#2a1a14'); planks(c, r, 1060); sconce(c, 1250, 470); frame(c, r, 180, 300, 200, 160, 0); frame(c, r, 1350, 640, 150, 120, 1); shelf(c, r, 120, 760, 240); },
  bar: (c, r) => { grime(c, r, 1000, .5); [500, 1280, 2060].forEach(x => pendant(c, x, 60, '#ffc070')); },
  classroom: (c, r) => { grime(c, r, 1040, .5); base(c, 1040, '#5a4a3a'); planks(c, r, 1040); frame(c, r, 300, 300, 180, 220, 1); plant(c, r, 2460, 1090, .9); sign(c, 1500, 800, 'NO POWERS IN CLASS', '#f4f1ea', '#a01a1a', 26); [700, 1600].forEach(x => pendant(c, x, 40, '#fff4d8')); },
  office: (c, r) => { grime(c, r, 1020, .4); base(c, 1020, '#7a7468'); plant(c, r, 160, 1080, 1); sign(c, 1300, 260, 'EMPLOYEE OF THE MONTH: NOBODY', '#f4f1ea', '#2a3990', 22); shelf(c, r, 2300, 880, 220); },
  future_home: (c, r) => { grime(c, r, 1040, .5); base(c, 1040, '#2a2a3a'); planks(c, r, 1040, '#3a3a4a'); frame(c, r, 1150, 330, 240, 180, 1); plant(c, r, 2400, 1090, .8); sconce(c, 900, 470, '#c8d8ff'); },
  mansion_hall: (c, r) => { grime(c, r, 1040, .4); base(c, 1040, '#3a2414'); planks(c, r, 1100); [500, 1280, 2060].forEach(x => sconce(c, x, 640, '#ffd890')); plant(c, r, 140, 1110, 1.1); plant(c, r, 2420, 1110, 1.1); },
  icebox: (c, r) => { grime(c, r, 1000, 1.2); pipe(c, 130); rivets(c, 1000); stripes(c, 0, 960, 2560, 40); sign(c, 1280, 330, 'BLOCK C · MUTANTS', '#e8e0c8', '#a01a1a', 34); cam(c, 2480, 260); },
  truck: (c, r) => { grime(c, r, 1060, 1); pipe(c, 110, '#3a3a40'); rivets(c, 1060); stripes(c, 0, 1020, 2560, 36); sign(c, 1280, 360, 'NO TALKING', '#ffd23d', '#1a1a1a', 34); },
};
for (const k in DRESS) { const f = PLATES[k]; if (!f) continue; PLATES[k] = (c, r, W, H) => { f(c, r, W, H); DRESS[k](c, r); finish(c, r, W, H, { oil: 1, grain: 6, vig: .25 }); }; }
})();

// ================= Ironheart S1 plates (DumDown) =================
(function () {
const { hex, rgb, shade, wash, glow, rays, finish, paintRegion } = P2;
const M = window.M2, PR = window.PR, ENV = window.ENV, ink = '#231A24';
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const pr = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, rect(x, y, w, h), col, Object.assign({ density: 80, len: [10, 40], w: [3, 9], al: .45, topLight: .08, botDark: -.25, var: 10 }, o));
const box = (c, x, y, w, h, col, lw = 5) => { c.fillStyle = col; c.fillRect(x, y, w, h); c.strokeStyle = ink; c.lineWidth = lw; c.strokeRect(x, y, w, h); };
function bricks(c, r, x0, y0, w, h, col) { pr(c, r, x0, y0, w, h, col, { density: 140, var: 12 }); for (let y = y0 + 20; y < y0 + h; y += 46) for (let x = x0 + ((y / 46) % 2) * 60; x < x0 + w; x += 120) { c.strokeStyle = 'rgba(20,10,10,.32)'; c.lineWidth = 3; c.strokeRect(x, y, 120, 46); } }
function floorC(c, r, y, col) { pr(c, r, 0, y, 2560, 1440 - y, col, { density: 100, topLight: -.1, botDark: -.35 }); const g = c.createLinearGradient(0, y, 0, 1440); g.addColorStop(0, 'rgba(0,0,0,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, y, 2560, 120); }
function shelves(c, r, x, y, w, rows, gap, items) { for (let k = 0; k < rows; k++) { const yy = y + k * gap; box(c, x, yy, w, 18, '#5a3a1e', 4); let xx = x + 14; while (xx < x + w - 40) { const it = r.pick(items), bw = 26 + r() * 40, bh = 40 + r() * (gap - 70); c.fillStyle = it; c.strokeStyle = ink; c.lineWidth = 3; c.fillRect(xx, yy - bh, bw, bh); c.strokeRect(xx, yy - bh, bw, bh); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(xx + 4, yy - bh + 4, 5, bh - 8); xx += bw + 6 + r() * 10; } } }
function jars(c, r, x, y, w, rows, gap) { for (let k = 0; k < rows; k++) { const yy = y + k * gap; box(c, x, yy, w, 16, '#8a5a3a', 4); for (let xx = x + 20; xx < x + w - 60; xx += 74) { const col = r.pick(['#ff5a8a', '#ffd23d', '#5ad8ff', '#8aff6a', '#c86aff', '#ff8a3a']); c.fillStyle = 'rgba(230,240,255,.35)'; c.strokeStyle = ink; c.lineWidth = 3; c.beginPath(); c.roundRect(xx, yy - 96, 56, 96, 10); c.fill(); c.stroke(); for (let i = 0; i < 9; i++) { c.fillStyle = col; c.beginPath(); c.arc(xx + 10 + r() * 36, yy - 12 - r() * 60, 7 + r() * 4, 0, 7); c.fill(); } c.fillStyle = '#e8e0d0'; c.fillRect(xx - 2, yy - 106, 60, 12); } } }
function tool(c, x, y, a) { c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = '#9aa2ac'; c.strokeStyle = ink; c.lineWidth = 3; c.fillRect(-6, 0, 12, 90); c.strokeRect(-6, 0, 12, 90); c.fillStyle = '#c83a1a'; c.fillRect(-9, 60, 18, 40); c.restore(); }

// Ready-made p2 environments
PLATES.boardroom = (c, r, W, H) => ENV.boardroom(c, r, W, H, {});
PLATES.ri_bedroom = (c, r, W, H) => ENV.bedroom2(c, r, W, H, {});
PLATES.ma_kitchen = (c, r, W, H) => ENV.kitchen2(c, r, W, H, {});
PLATES.burger = (c, r, W, H) => ENV.dinerBooth(c, r, W, H, {});
PLATES.skyline = (c, r, W, H) => ENV.skylinePlate(c, r, W, H, {});
PLATES.suburb = (c, r, W, H) => ENV.suburb(c, r, W, H, {});
PLATES.joe_home = (c, r, W, H) => ENV.kitchen(c, r, W, H, {});

// Chicago South Side street at night: brick walk-ups, corner store, streetlights
PLATES.southside = (c, r, W, H) => { M.sky(c, r, W, 700, '#0c1230', '#3a2a5a'); for (let i = 0; i < 9; i++) M.tower(c, r, i * 300 - 60, 200, 260, 500 + r() * 200, '#1a1a30', '#ffcf6a', {});
  const cols = ['#7a3a2a', '#8a5a3a', '#6a2e26', '#7a4a2a'];
  for (let i = 0; i < 5; i++) { const x = i * 540 - 40, w = 520, top = 260 + (i % 2) * 70; bricks(c, r, x, top, w, 780 - top, cols[i % 4]); c.fillStyle = '#3a2a24'; c.fillRect(x, top - 20, w, 30);
    for (let k = 0; k < 2; k++) for (let j = 0; j < 3; j++) { const wx = x + 50 + j * 160, wy = top + 60 + k * 180; box(c, wx, wy, 110, 130, r() < .5 ? '#ffd98a' : '#2a2a40', 4); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(wx, wy + 62, 110, 4); } }
  box(c, 1700, 560, 520, 220, '#2a3a4a'); c.fillStyle = '#ffd23d'; c.font = '900 56px Inter'; c.textAlign = 'center'; c.fillText('CORNER STORE', 1960, 530); glow(c, 1960, 650, 400, '#ffe8a0', .35);
  pr(c, r, 0, 780, W, 120, '#6a6a70', { density: 60 }); pr(c, r, 0, 900, W, 540, '#2a2a32', { density: 110 }); for (let i = 0; i < 8; i++) { c.fillStyle = 'rgba(232,220,160,.55)'; c.fillRect(i * 340 + 40, 1180, 180, 14); }
  for (const x of [300, 1300, 2300]) { c.fillStyle = '#2a2a30'; c.fillRect(x - 8, 380, 16, 520); c.fillRect(x - 8, 380, 90, 14); glow(c, x + 80, 400, 380, '#ffcf8a', .45); rays(c, r, x + 80, 400, 8, 600, '#ffe0a0', .05, .6); }
  finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// Mural wall: painted portrait mural of a teen girl and a man in a jumpsuit, on bricks, daylight
PLATES.mural = (c, r, W, H) => { M.sky(c, r, W, 400, '#6a9ad8', '#e8f0f8'); bricks(c, r, 0, 120, W, 900, '#8a4a32');
  c.save(); c.beginPath(); c.roundRect(360, 200, 1840, 720, 30); c.clip(); wash(c, r, [360, 200, 1840, 720], '#ffd23d', '#ff6a8a'); rays(c, r, 1280, 560, 20, 1400, '#fff6c8', .18, 6.3);
  for (const [x, sk, hair, top] of [[900, '#7a4a32', '#1a1210', '#e23a8a'], [1640, '#5a3422', '#2a1a14', '#2a5a9a']]) { c.fillStyle = top; c.beginPath(); c.ellipse(x, 960, 250, 260, 0, 0, 7); c.fill(); c.fillStyle = sk; c.beginPath(); c.ellipse(x, 560, 140, 170, 0, 0, 7); c.fill(); c.fillStyle = hair; c.beginPath(); c.ellipse(x, 450, 170, 120, 0, Math.PI, 0); c.fill(); c.fillStyle = ink; c.beginPath(); c.arc(x - 50, 560, 12, 0, 7); c.arc(x + 50, 560, 12, 0, 7); c.fill(); c.strokeStyle = ink; c.lineWidth = 8; c.beginPath(); c.arc(x, 610, 50, .2, Math.PI - .2); c.stroke(); }
  c.restore(); c.strokeStyle = ink; c.lineWidth = 8; c.strokeRect(360, 200, 1840, 720); c.fillStyle = '#f4ecd8'; c.font = '900 70px Inter'; c.textAlign = 'center'; c.fillText('FOREVER IN OUR HEARTS', 1280, 290);
  for (let i = 0; i < 40; i++) { c.fillStyle = r.pick(['#ff5a8a', '#ffd23d', '#e8e8f0']); c.beginPath(); c.arc(400 + r() * 1760, 1000 + r() * 30, 8 + r() * 8, 0, 7); c.fill(); }
  pr(c, r, 0, 1020, W, 420, '#7a7a80', { density: 80 }); finish(c, r, W, H, { oil: 2, grain: 12, vig: .3 }); };
// Junk shop: crowded shelves of parts, hanging cables, counter
PLATES.junkshop = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#4a3a2a', '#1a120a'); pr(c, r, 0, 0, W, 1040, '#5a4a36', { density: 140 });
  shelves(c, r, 80, 300, 1000, 4, 220, ['#6a7480', '#8a6a3a', '#3a5a6a', '#9a3a2a', '#c8a040', '#4a4a50']); shelves(c, r, 1480, 300, 1000, 4, 220, ['#6a7480', '#2a6a4a', '#8a8a90', '#c86a2a', '#3a3a44']);
  for (let i = 0; i < 12; i++) { c.strokeStyle = r.pick(['#1a1a1a', '#c83a1a', '#2a5aa8', '#e8c040']); c.lineWidth = 6; c.beginPath(); const x = 100 + i * 210; c.moveTo(x, 0); c.quadraticCurveTo(x + 60, 150 + r() * 80, x + 120, 0); c.stroke(); }
  box(c, 1100, 760, 360, 280, '#6a4a2a'); box(c, 1160, 680, 120, 80, '#2a2a30'); c.fillStyle = '#5aff8a'; c.fillRect(1175, 695, 90, 45);
  floorC(c, r, 1040, '#3a2e22'); PR.pendant(c, r, 1280, 0, 1.2); glow(c, 1280, 300, 700, '#ffc070', .3); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// Tiny elevator: steel walls, red warning light, a box on the floor
PLATES.elevator = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#5a6068', '#20242a'); for (let i = 0; i < 4; i++) { pr(c, r, 380 + i * 450, 80, 440, 980, '#8a929c', { density: 60, var: 6 }); c.strokeStyle = ink; c.lineWidth = 5; c.strokeRect(380 + i * 450, 80, 440, 980); for (let y = 140; y < 1060; y += 90) { c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(390 + i * 450, y, 420, 6); } }
  box(c, 0, 0, 380, H, '#3a4048'); box(c, 2180, 0, 380, H, '#3a4048'); box(c, 1980, 420, 120, 260, '#2a2e34'); for (let k = 0; k < 6; k++) { c.fillStyle = '#e8e0c8'; c.beginPath(); c.arc(2040, 470 + k * 38, 12, 0, 7); c.fill(); }
  c.fillStyle = '#ff2a2a'; c.beginPath(); c.arc(1280, 60, 40, 0, 7); c.fill(); glow(c, 1280, 60, 900, '#ff2a2a', .45); c.fillStyle = 'rgba(255,0,0,.08)'; c.fillRect(0, 0, W, H);
  floorC(c, r, 1060, '#4a4e56'); box(c, 1180, 1080, 200, 110, '#c8a040'); c.fillStyle = ink; c.font = '900 28px Inter'; c.textAlign = 'center'; c.fillText('OPEN ME', 1280, 1145); finish(c, r, W, H, { oil: 2, grain: 12, vig: .6 }); };
// Crew loft hideout: exposed brick, big couches, TV screen, city windows
PLATES.loft = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2a2a', '#120a0a'); bricks(c, r, 0, 0, W, 1040, '#6a3a2a');
  for (const x of [120, 900]) { box(c, x, 140, 560, 520, '#141428'); for (let i = 0; i < 6; i++) M.tower(c, r, x + i * 95, 660 - 200 - r() * 200, 80, 200 + r() * 200, '#1a1a30', '#ffcf6a', {}); c.strokeStyle = ink; c.lineWidth = 10; c.strokeRect(x, 140, 560, 520); c.beginPath(); c.moveTo(x + 280, 140); c.lineTo(x + 280, 660); c.moveTo(x, 400); c.lineTo(x + 560, 400); c.stroke(); }
  box(c, 1700, 220, 700, 400, '#0a0a14', 10); c.fillStyle = '#2fc6ff'; c.globalAlpha = .25; c.fillRect(1710, 230, 680, 380); c.globalAlpha = 1; glow(c, 2050, 420, 600, '#2fc6ff', .25);
  paintRegion(c, r, [[1500, 800], [2500, 800], [2520, 1060], [1480, 1060]], '#6a2a3a', { density: 40, al: .75, topLight: .2, botDark: -.4 }); c.strokeStyle = ink; c.lineWidth = 6; c.strokeRect(1500, 880, 1000, 180);
  for (let i = 0; i < 3; i++) PR.pendant(c, r, 500 + i * 800, 0, 1); floorC(c, r, 1040, '#2a1e18'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// Joe's secret bunker: round silo walls, crates, robot parts, missiles, a framed quote
PLATES.bunker = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a4448', '#101416'); for (let i = 0; i < 9; i++) { pr(c, r, i * 290, 0, 290, 1060, i % 2 ? '#5a666a' : '#4e5a5e', { density: 60 }); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(i * 290, 0, 8, 1060); }
  for (const x of [180, 520, 2000, 2300]) { box(c, x, 840, 260, 220, '#6a5a3a'); c.strokeStyle = ink; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 840); c.lineTo(x + 260, 1060); c.moveTo(x + 260, 840); c.lineTo(x, 1060); c.stroke(); }
  for (let i = 0; i < 4; i++) { c.save(); c.translate(900 + i * 180, 1040); c.fillStyle = '#d8d8d0'; c.strokeStyle = ink; c.lineWidth = 4; c.beginPath(); c.moveTo(-26, 0); c.lineTo(-26, -360); c.lineTo(0, -420); c.lineTo(26, -360); c.lineTo(26, 0); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c83a1a'; c.fillRect(-26, -340, 52, 30); c.restore(); }
  box(c, 920, 220, 660, 240, '#f4ecd8', 8); c.fillStyle = ink; c.font = 'italic 700 44px Georgia'; c.textAlign = 'center'; c.fillText('Live, Laugh,', 1250, 320); c.fillText('Love', 1250, 380);
  for (let i = 0; i < 6; i++) { c.strokeStyle = '#8a929c'; c.lineWidth = 10; c.beginPath(); c.moveTo(200 + i * 60, 400); c.lineTo(230 + i * 60, 560); c.stroke(); } glow(c, 1280, 0, 900, '#cfe8ff', .25);
  floorC(c, r, 1060, '#3a4044'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// Underground car tunnel: neon strips, concrete arch, a car lift platform
PLATES.tunnel = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#1a1e2a', '#05060a'); for (let k = 0; k < 7; k++) { const s = 1 - k * .13, w = 2560 * s, h = 1300 * s, x = 1280 - w / 2, y = 1240 - h; c.strokeStyle = `rgba(255,${80 + k * 20},${200 - k * 10},${.8 - k * .1})`; c.lineWidth = 14 * s; c.beginPath(); c.moveTo(x, 1240); c.lineTo(x, y + h * .35); c.quadraticCurveTo(1280, y - h * .2, x + w, y + h * .35); c.lineTo(x + w, 1240); c.stroke(); }
  glow(c, 1280, 700, 600, '#ff3ab0', .25); paintRegion(c, r, [[0, 1240], [2560, 1240], [2560, 1440], [0, 1440]], '#2a2a34', { density: 80 }); paintRegion(c, r, [[1020, 1240], [1540, 1240], [2100, 1440], [460, 1440]], '#3a3a48', { density: 60 });
  for (let i = 0; i < 5; i++) { c.fillStyle = '#ffd23d'; const y = 1260 + i * 36; c.fillRect(1270 - 6 - i * 4, y, 12 + i * 8, 20); }
  box(c, 1700, 980, 640, 60, '#5a6470'); for (let i = 0; i < 3; i++) box(c, 1760 + i * 200, 1040, 30, 200, '#3a4048', 3); finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// Futuristic farm at night: five glass greenhouses glowing green around a central atrium
PLATES.greenhouse = (c, r, W, H) => { M.sky(c, r, W, 760, '#06101a', '#14304a'); for (let i = 0; i < 120; i++) { c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(r() * W, r() * 500, 2, 2); }
  M.ground(c, r, W, H, 760, '#1a2a1a', '#2a3a22', {});
  const gh = (x, y, w, h) => { c.save(); c.fillStyle = 'rgba(90,255,140,.18)'; c.strokeStyle = '#bfffd0'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y + h); c.lineTo(x, y + h * .35); c.quadraticCurveTo(x + w / 2, y - h * .25, x + w, y + h * .35); c.lineTo(x + w, y + h); c.closePath(); c.fill(); c.stroke(); for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(x + w * k / 6, y + h); c.lineTo(x + w * k / 6, y + h * .1); c.stroke(); } for (let k = 0; k < 14; k++) { c.fillStyle = r.pick(['#2a8a3a', '#3aaa4a', '#1a6a2a']); c.beginPath(); c.arc(x + 30 + r() * (w - 60), y + h - 20 - r() * h * .4, 16 + r() * 20, 0, 7); c.fill(); } glow(c, x + w / 2, y + h * .6, w, '#5aff8a', .3); c.restore(); };
  gh(60, 640, 520, 300); gh(560, 560, 460, 240); gh(1540, 560, 460, 240); gh(1980, 640, 520, 300);
  c.fillStyle = 'rgba(200,255,230,.25)'; c.strokeStyle = '#e8fff0'; c.lineWidth = 6; c.beginPath(); c.moveTo(1000, 900); c.lineTo(1000, 520); c.lineTo(1280, 300); c.lineTo(1560, 520); c.lineTo(1560, 900); c.closePath(); c.fill(); c.stroke(); glow(c, 1280, 600, 600, '#9affd8', .35);
  box(c, 2380, 360, 60, 400, '#3a4048'); box(c, 2330, 320, 160, 70, '#4a5058'); glow(c, 2410, 350, 200, '#ffffff', .4);
  pr(c, r, 0, 940, W, 500, '#1e2a20', { density: 90 }); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// Inside a greenhouse: lit rows of plants, misting pipes, glass panes
PLATES.gh_inside = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#2a5a3a', '#0a1a10'); for (let x = 0; x < W; x += 220) { c.strokeStyle = 'rgba(200,255,220,.5)'; c.lineWidth = 6; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1000); c.stroke(); } for (let y = 80; y < 1000; y += 200) { c.fillStyle = 'rgba(200,255,220,.25)'; c.fillRect(0, y, W, 5); }
  c.fillStyle = '#6a7480'; c.fillRect(0, 140, W, 24); for (let x = 100; x < W; x += 260) { c.fillStyle = '#9aa2ac'; c.fillRect(x, 164, 14, 40); }
  for (let k = 0; k < 3; k++) { const y = 760 + k * 90; box(c, 0, y, W, 40, '#5a4a3a', 3); for (let x = 20; x < W; x += 70) { c.fillStyle = r.pick(['#2a8a3a', '#3aaa4a', '#4aba5a']); c.beginPath(); c.ellipse(x, y - 30 - r() * 20, 30, 40 + r() * 20, 0, 0, 7); c.fill(); } }
  glow(c, 1280, 400, 1200, '#bfffd0', .25); floorC(c, r, 1040, '#2a3a2a'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// Candy + crystal shop: jar walls, crystals, a beaded curtain to the back
PLATES.candyshop = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#6a3a7a', '#2a1030'); pr(c, r, 0, 0, W, 1040, '#7a4a8a', { density: 120 }); for (let x = 0; x < W; x += 80) { c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(x, 0, 40, 1040); }
  jars(c, r, 80, 360, 900, 3, 200); jars(c, r, 1580, 360, 900, 3, 200);
  for (let i = 0; i < 26; i++) { c.strokeStyle = r.pick(['#ffd23d', '#ff5a8a', '#5ad8ff']); c.lineWidth = 4; c.setLineDash([10, 8]); c.beginPath(); c.moveTo(1080 + i * 16, 220); c.lineTo(1080 + i * 16, 920); c.stroke(); c.setLineDash([]); }
  box(c, 960, 860, 640, 180, '#5a2a4a'); for (let i = 0; i < 6; i++) { c.fillStyle = r.pick(['#c86aff', '#5ad8ff', '#ff8ab0']); c.beginPath(); const x = 1000 + i * 100; c.moveTo(x, 860); c.lineTo(x + 20, 790); c.lineTo(x + 40, 860); c.fill(); }
  c.fillStyle = '#ffd23d'; c.font = '900 64px Georgia'; c.textAlign = 'center'; c.fillText('SWEETS · READS · WISHES', 1280, 140); glow(c, 1280, 120, 700, '#ffd23d', .2);
  for (let i = 0; i < 3; i++) PR.pendant(c, r, 500 + i * 780, 0, 1); floorC(c, r, 1040, '#3a2030'); finish(c, r, W, H, { oil: 2, grain: 12, vig: .5 }); };
// Gary's garage: tool walls, workbench, an old car under a sheet, hanging bulb
PLATES.garage = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#4a4038', '#16120e'); pr(c, r, 0, 0, W, 1040, '#5a5046', { density: 130 }); for (let x = 0; x < W; x += 240) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, 0, 6, 1040); }
  box(c, 120, 260, 820, 420, '#8a6a42'); for (let i = 0; i < 12; i++) tool(c, 180 + i * 64, 300 + (i % 2) * 40, (r() - .5) * .3); box(c, 100, 700, 900, 50, '#5a3a1e'); box(c, 130, 750, 40, 290, '#3a2a1a', 3); box(c, 930, 750, 40, 290, '#3a2a1a', 3);
  c.fillStyle = '#c8c0b0'; c.strokeStyle = ink; c.lineWidth = 6; c.beginPath(); c.moveTo(1300, 1040); c.quadraticCurveTo(1340, 760, 1600, 720); c.quadraticCurveTo(1900, 640, 2200, 700); c.quadraticCurveTo(2420, 760, 2460, 1040); c.closePath(); c.fill(); c.stroke(); for (let i = 0; i < 8; i++) { c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 4; c.beginPath(); c.moveTo(1400 + i * 130, 760); c.lineTo(1380 + i * 135, 1030); c.stroke(); }
  box(c, 1180, 160, 420, 220, '#c83a1a'); c.fillStyle = '#f4ecd8'; c.font = '900 50px Inter'; c.textAlign = 'center'; c.fillText("GARY'S", 1390, 250); c.font = '700 34px Inter'; c.fillText('AUTO REPAIR', 1390, 310);
  c.strokeStyle = '#1a1214'; c.lineWidth = 4; c.beginPath(); c.moveTo(1280, 0); c.lineTo(1280, 420); c.stroke(); glow(c, 1280, 440, 900, '#ffd890', .45); c.fillStyle = '#fff2c8'; c.beginPath(); c.arc(1280, 440, 22, 0, 7); c.fill();
  for (let i = 0; i < 30; i++) { c.strokeStyle = 'rgba(220,220,220,.3)'; c.lineWidth = 1; c.beginPath(); const x = r() * W; c.moveTo(x, 0); c.lineTo(x + 30, 60); c.stroke(); }
  floorC(c, r, 1040, '#4a4440'); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(700, 1200, 180, 40, 0, 0, 7); c.fill(); finish(c, r, W, H, { oil: 2, grain: 12, vig: .55 }); };
// Golden deal light (Mephisto's offer)
PLATES.golden = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a0a10', '#0a0204'); rays(c, r, 1280, 500, 26, 1800, '#ffb84a', .1, 6.3); M.glowDisk(c, 1280, 520, 420, '#ffcf7a'); for (let i = 0; i < 200; i++) { c.fillStyle = `rgba(255,${120 + r() * 100},40,${r() * .6})`; c.beginPath(); c.arc(r() * W, r() * H, 2 + r() * 4, 0, 7); c.fill(); } pr(c, r, 0, 1080, W, 360, '#2a0a0c', { density: 60 }); finish(c, r, W, H, { oil: 2, grain: 12, vig: .6 }); };
})();
