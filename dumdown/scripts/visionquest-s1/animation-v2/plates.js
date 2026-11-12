// DumDown VisionQuest cold open plates, painted with the 2D line's p2 brush engine (2560x1440).
window.PLATES = {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
// --- shared helpers ---
function stoneWall(c, r, x, y, w, h, base, o = {}) { // dressed sandstone blocks (Edinburgh)
  paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], base, { density: 120, len: [10, 40], w: [3, 9], al: .4, topLight: o.top ?? .05, botDark: o.bot ?? -.3, var: 14 });
  const bh = o.bh ?? 46; for (let yy = y; yy < y + h; yy += bh) { let xx = x - ((yy / bh) % 2) * 40; while (xx < x + w) { const bw = r.range(70, 130);
    c.strokeStyle = rgb(shade(base, -.55), .55); c.lineWidth = 3; c.strokeRect(Math.max(x, xx), yy, Math.min(bw, x + w - xx), bh);
    if (r() < .35) { c.fillStyle = rgb(jitter(shade(base, r.range(-.25, .1)), r, 10), .35); c.fillRect(Math.max(x, xx) + 3, yy + 3, Math.min(bw, x + w - xx) - 6, bh - 6); } xx += bw; } } }
function rain(c, r, W, H, n, col = '#a8c4ff', al = .28) { c.save(); c.lineCap = 'round'; for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, l = r.range(20, 60); c.strokeStyle = rgb(hex(col), al * r.range(.4, 1)); c.lineWidth = r.range(1, 2.4); c.beginPath(); c.moveTo(x, y); c.lineTo(x - l * .12, y + l); c.stroke(); } c.restore(); }
function puddleRefl(c, r, x, y, w, col, al = .3) { c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const yy = y + r.range(0, 120), ww = w * r.range(.2, 1); c.fillStyle = rgb(jitter(col, r, 20), al * r.range(.2, 1)); c.fillRect(x + r.range(-ww / 2, ww / 2) - ww / 2, yy, ww, r.range(2, 6)); } c.restore(); }
function cobbles(c, r, x0, y0, W, H, base) { paintRegion(c, r, [[x0, y0], [W, y0], [W, H], [x0, H]], base, { density: 150, len: [8, 24], w: [3, 7], al: .5, topLight: -.1, botDark: .15 });
  for (let y = y0; y < H; y += 14 + (y - y0) * .06) { const sz = 18 + (y - y0) * .09; for (let x = x0 - r() * sz; x < W; x += sz * r.range(.9, 1.2)) { c.fillStyle = rgb(jitter(shade(base, r.range(-.2, .25)), r, 12), .55); c.beginPath(); c.ellipse(x, y, sz * .45, sz * .18 + (y - y0) * .015, 0, 0, 7); c.fill(); c.strokeStyle = rgb(shade(base, -.6), .4); c.lineWidth = 1.5; c.stroke(); } } }
function lamppost(c, r, x, y, h, lit = '#ffcf7a') { c.fillStyle = '#1a1612'; c.fillRect(x - 7, y - h, 14, h); c.fillRect(x - 18, y - 16, 36, 16); c.beginPath(); c.moveTo(x - 30, y - h - 70); c.lineTo(x + 30, y - h - 70); c.lineTo(x + 20, y - h); c.lineTo(x - 20, y - h); c.closePath(); c.fill(); c.fillStyle = lit; c.fillRect(x - 20, y - h - 62, 40, 56); glow(c, x, y - h - 34, 380, lit, .45); glow(c, x, y - h - 34, 90, '#fff2c8', .7); }
function bottles(c, r, x, y, w, rowH) { let bx = x; while (bx < x + w - 20) { const bw = r.range(18, 30), bh = rowH * r.range(.5, .9), col = r.pick(['#3f6a32', '#8a5a1a', '#5a1a24', '#2a4a6a', '#c9a04a', '#1a3a2a', '#d8c8a0']);
  c.fillStyle = rgb(jitter(col, r, 14)); c.beginPath(); c.roundRect(bx, y - bh, bw, bh, 5); c.fill(); c.fillRect(bx + bw * .35, y - bh - 18, bw * .3, 20); c.fillStyle = rgb(shade(col, .6), .5); c.fillRect(bx + 3, y - bh + 8, 4, bh - 16); if (r() < .5) { c.fillStyle = 'rgba(240,230,200,.8)'; c.fillRect(bx + 2, y - bh * .6, bw - 4, bh * .25); } bx += bw + r.range(4, 12); } }

// 1. Edinburgh close at night, rain, the pub on the right
PLATES.pub_ext = (c, r, W, H) => {
  M.sky(c, r, W, H * .5, '#0b1024', '#2a3358', { strokes: 1800 });
  // castle rock silhouette far
  paintRegion(c, r, [[0, 620], [300, 520], [700, 470], [900, 380], [1300, 360], [1500, 440], [1800, 500], [W, 560], [W, 760], [0, 760]], '#151a30', { density: 500, al: .3, topLight: 0, botDark: -.2 });
  for (const [x, y, w, h] of [[920, 250, 120, 140], [1060, 210, 70, 180], [1150, 270, 180, 110], [1350, 300, 60, 80]]) { paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#1a1f38', { density: 300, al: .3 }); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(255,200,120,.75)'; c.fillRect(x + 12 + r() * (w - 24), y + 20 + r() * (h - 40), 7, 12); } }
  glow(c, 1150, 300, 520, '#ffb070', .12);
  // tall tenements both sides (one-point perspective street)
  const vx = 1280, hy = 760;
  for (const side of [-1, 1]) { const x0 = side < 0 ? 0 : W, xi = side < 0 ? 760 : 1800;
    const pts = side < 0 ? [[0, 0], [xi, 180], [xi, 900], [0, H]] : [[W, 0], [xi, 180], [xi, 900], [W, H]];
    paintRegion(c, r, pts, side < 0 ? '#4a4038' : '#3e3832', { density: 110, len: [12, 40], w: [3, 9], ang: Math.PI / 2, angJ: .15, al: .45, topLight: -.1, botDark: -.25, var: 16 });
    // stone courses
    for (let k = 0; k < 26; k++) { const t = k / 26; c.strokeStyle = 'rgba(15,10,8,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, t * H); c.lineTo(xi, 180 + t * 720); c.stroke(); }
    // windows receding
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const u = i / 6, u2 = (i + .55) / 6, xa = x0 + (xi - x0) * u, xb = x0 + (xi - x0) * u2; const ya = (1 - u) * (60 + j * 230) + u * (200 + j * 150), yb = ya + (1 - u) * 150 + u * 100;
      const lit = r() < .4; c.fillStyle = lit ? 'rgba(255,196,110,.9)' : 'rgba(20,24,40,.9)'; c.beginPath(); c.moveTo(xa, ya); c.lineTo(xb, ya + (side < 0 ? 18 : 18) * (u2 - u) * 6); c.lineTo(xb, yb - 10); c.lineTo(xa, yb); c.closePath(); c.fill(); if (lit) glow(c, (xa + xb) / 2, (ya + yb) / 2, 120, '#ffb860', .18); c.strokeStyle = '#140f0c'; c.lineWidth = 4; c.stroke(); } }
  // the pub front (right, near)
  const px = 1820, py = 560, pw = 740, ph = 520;
  paintRegion(c, r, [[px, py], [W, py - 40], [W, py + ph + 80], [px, py + ph]], '#1f3a2c', { density: 90, len: [10, 30], w: [3, 8], ang: Math.PI / 2, angJ: .1, al: .55, topLight: .08, botDark: -.3 });
  c.fillStyle = '#152a20'; c.fillRect(px, py - 10, W - px, 90); c.fillStyle = '#d8b46a'; c.font = 'bold 54px Georgia, serif'; c.textAlign = 'left'; c.fillText('THE THISTLE & GEAR', px + 60, py + 56);
  for (const [wx, ww] of [[px + 50, 260], [px + 400, 260]]) { c.fillStyle = '#ffbf6a'; c.fillRect(wx, py + 130, ww, 300); glow(c, wx + ww / 2, py + 280, 420, '#ffae50', .35); c.strokeStyle = '#0f1a14'; c.lineWidth = 12; c.strokeRect(wx, py + 130, ww, 300); for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(wx + ww * k / 3, py + 130); c.lineTo(wx + ww * k / 3, py + 430); c.stroke(); } c.beginPath(); c.moveTo(wx, py + 280); c.lineTo(wx + ww, py + 280); c.stroke();
    for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(60,30,10,.55)'; c.beginPath(); c.ellipse(wx + 40 + k * 60, py + 360, 20, 40, 0, 0, 7); c.fill(); } }
  // hanging sign
  c.strokeStyle = '#111'; c.lineWidth = 8; c.beginPath(); c.moveTo(px - 20, py + 20); c.lineTo(px - 220, py + 20); c.stroke(); c.fillStyle = '#2a2016'; c.fillRect(px - 210, py + 40, 150, 170); c.strokeStyle = '#d8b46a'; c.lineWidth = 6; c.strokeRect(px - 200, py + 50, 130, 150);
  c.fillStyle = '#8a4aa0'; c.beginPath(); c.arc(px - 135, py + 110, 28, 0, 7); c.fill(); c.fillStyle = '#3f8f5f'; c.fillRect(px - 140, py + 135, 10, 50); // thistle
  // street + cobbles, wet
  cobbles(c, r, 0, 900, W, H, '#2a2a30');
  paintRegion(c, r, [[760, 900], [1800, 900], [W, H], [0, H]], '#2e2c32', { density: 300, al: .2, topLight: -.1, botDark: .05 });
  puddleRefl(c, r, 2150, 1080, 500, '#ffb060', .35); puddleRefl(c, r, 1300, 1000, 300, '#ff9a50', .2); puddleRefl(c, r, 400, 1150, 400, '#ffcf7a', .25);
  lamppost(c, r, 520, 1180, 520); lamppost(c, r, 1560, 980, 300);
  rays(c, r, 520, 600, 9, 700, '#ffd890', .06, .8);
  rain(c, r, W, H, 900);
  finish(c, r, W, H, { oil: 4, grain: 8, vig: .55 });
};

// 2. Pub interior, warm, rain on windows
PLATES.pub_int = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 9, RH: 3.2, ch: 1.5, zf: 7.5, f: 1500, hor: .44 });
  R.shell({ back: '#4a2a14', side: '#3e2410', ceil: '#2a1a0e', floor: '#5a3418', skirting: '#2a160a' });
  // wood panelling on back wall
  for (let i = -4; i <= 4; i++) { const [x, y, w, h] = R.backRect(i - .45, .1, i + .45, 1.4); paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#5a3218', { density: 60, len: [20, 60], w: [3, 8], ang: Math.PI / 2, angJ: .05, al: .5, topLight: .1, botDark: -.25 }); c.strokeStyle = 'rgba(20,10,4,.6)'; c.lineWidth = 4; c.strokeRect(x, y, w, h); }
  // windows on back wall with rain + street lights
  for (const cx of [-2.9, 2.9]) { const [x, y, w, h] = R.backRect(cx - .9, 1.6, cx + .9, 2.9); ENV.window(c, r, x, y, w, h, (cc, X, Y, Ww, Hh) => { const g = cc.createLinearGradient(0, Y, 0, Y + Hh); g.addColorStop(0, '#0d1428'); g.addColorStop(1, '#24304e'); cc.fillStyle = g; cc.fillRect(X, Y, Ww, Hh); for (let k = 0; k < 6; k++) glow(cc, X + r() * Ww, Y + Hh * .6 + r() * Hh * .3, 60, '#ffb060', .5); rain(cc, r, X + Ww, Y + Hh, 260, '#b8d0ff', .4); }, { frame: '#2a160a' }); }
  // back bar: shelves full of bottles + mirror
  const [mx, my, mw, mh] = R.backRect(-1.6, 1.5, 1.6, 2.9); const g = c.createLinearGradient(mx, my, mx + mw, my + mh); g.addColorStop(0, '#5a4a3a'); g.addColorStop(1, '#2a2018'); c.fillStyle = g; c.fillRect(mx, my, mw, mh); c.strokeStyle = '#c9a04a'; c.lineWidth = 8; c.strokeRect(mx, my, mw, mh);
  for (let k = 0; k < 3; k++) { const yy = my + 40 + k * (mh - 40) / 3 + (mh - 40) / 3; c.fillStyle = '#3a2210'; c.fillRect(mx + 10, yy - 6, mw - 20, 12); bottles(c, r, mx + 20, yy - 6, mw - 40, (mh - 40) / 3 - 14); }
  // hanging lamps
  for (const [lx, lz] of [[-2.5, 4], [0, 4.5], [2.5, 4]]) { const [sx, sy] = R.p(lx, 2.5, lz); c.strokeStyle = '#140c06'; c.lineWidth = 4; c.beginPath(); c.moveTo(sx, 0); c.lineTo(sx, sy); c.stroke(); c.fillStyle = '#7a5a20'; c.beginPath(); c.moveTo(sx - 60, sy + 40); c.lineTo(sx + 60, sy + 40); c.lineTo(sx + 26, sy); c.lineTo(sx - 26, sy); c.closePath(); c.fill(); c.fillStyle = '#fff0c0'; c.beginPath(); c.ellipse(sx, sy + 44, 34, 10, 0, 0, 7); c.fill(); glow(c, sx, sy + 60, 700, '#ffb050', .28); }
  // side booths on left, stools
  R.box(-4.4, 0, 3.2, 1.2, 1.1, 2.6, '#6a1a1a', { density: 70 });
  R.box(-4.4, 1.1, 3.2, .2, 1.1, 2.6, '#3a1a0e');
  // the bar counter runs across the front (foreground plate covers it, but paint a far section)
  R.box(-3.6, 0, 5.4, 7.2, 1.05, .7, '#5a3016', { density: 100 });
  R.box(-3.7, 1.05, 5.35, 7.4, .08, .85, '#7a4a22');
  // beer taps on counter
  for (let i = 0; i < 5; i++) { const [tx, ty] = R.p(-.6 + i * .3, 1.13, 5.5); c.fillStyle = '#c9a04a'; c.fillRect(tx - 5, ty - 70, 10, 70); c.fillStyle = r.pick(['#1a1a1a', '#8a1a1a', '#e8d8a0', '#2a4a8a']); c.fillRect(tx - 9, ty - 120, 18, 52); }
  // framed pictures, darts board
  for (const [x0, y0] of [[-4.2, 1.8], [-4.2, 2.6]]) { const [x, y] = R.p(x0, y0, 4); ENV.frameArt(c, r, x, y, 120, 90, { a: '#8a6a3a', b: '#3a4a3a' }); }
  const [dx, dy] = R.p(3.9, 2, 5); c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(dx, dy, 60, 0, 7); c.fill(); for (let k = 5; k > 0; k--) { c.fillStyle = k % 2 ? '#c23a2a' : '#e8d8b0'; c.beginPath(); c.arc(dx, dy, k * 10, 0, 7); c.fill(); }
  // wall sconces, chalkboard menu, stools, tartan bench cushions, hanging glasses
  for (const sx of [-3.6, 3.6]) { const [x, y] = R.p(sx, 2.2, 6.4); c.fillStyle = '#c9a04a'; c.fillRect(x - 6, y, 12, 40); c.fillStyle = '#fff0c0'; c.beginPath(); c.arc(x, y - 6, 14, 0, 7); c.fill(); glow(c, x, y, 300, '#ffb050', .35); }
  { const [x, y] = R.p(1.9, 2.8, 7.45); const [x2, y2] = R.p(2.5, 1.6, 7.45); c.fillStyle = '#1a201c'; c.fillRect(x, y, x2 - x, y2 - y); c.strokeStyle = '#7a4a22'; c.lineWidth = 8; c.strokeRect(x, y, x2 - x, y2 - y); c.fillStyle = 'rgba(240,240,230,.8)'; c.font = '22px Georgia'; ['HAGGIS  6', 'STOVIES 5', 'TEA  2', 'ALE  4'].forEach((t, i) => c.fillText(t, x + 12, y + 34 + i * 30)); }
  for (let i = 0; i < 12; i++) { const [gx, gy] = R.p(-1.4 + i * .25, 2.95, 5.6); c.strokeStyle = 'rgba(220,230,240,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(gx - 8, gy); c.lineTo(gx + 8, gy); c.lineTo(gx + 5, gy + 26); c.lineTo(gx - 5, gy + 26); c.closePath(); c.stroke(); }
  for (let i = 0; i < 6; i++) { const [sx, sy] = R.p(-3 + i * 1.2, 0, 4.6); c.fillStyle = '#3a2210'; c.fillRect(sx - 4, sy - 150, 8, 150); c.fillRect(sx - 40, sy - 6, 6, 6); c.fillStyle = '#6a1a1a'; c.beginPath(); c.ellipse(sx, sy - 150, 46, 14, 0, 0, 7); c.fill(); M.contactShadow(c, sx, sy, 50, 10, .4); }
  for (let i = 0; i < 40; i++) { const [x, y] = R.p(-4.4, 1.1 + r() * .05, 3.2 + r() * 2.6); c.fillStyle = r.pick(['rgba(30,60,40,.5)', 'rgba(140,30,30,.5)']); c.fillRect(x - 6, y - 3, 12, 6); }
  glow(c, W / 2, H * .35, 1400, '#ff9a40', .16);
  finish(c, r, W, H, { oil: 4, grain: 8, vig: .45 });
};
// foreground bar counter (PNG) for depth
PLATES.fg_bar = (c, r, W, H) => { const y0 = H * .74; paintRegion(c, r, [[0, y0], [W, y0], [W, H], [0, H]], '#4a2810', { density: 90, len: [40, 140], w: [4, 10], ang: 0, angJ: .04, al: .5, topLight: .05, botDark: -.4 });
  paintRegion(c, r, [[0, y0 - 40], [W, y0 - 40], [W, y0 + 10], [0, y0 + 10]], '#7a4a22', { density: 60, len: [60, 200], w: [3, 7], ang: 0, angJ: .03, al: .6, topLight: .25, botDark: -.1 });
  c.strokeStyle = 'rgba(255,220,160,.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, y0 - 38); c.lineTo(W, y0 - 38); c.stroke(); c.fillStyle = '#c9a04a'; c.fillRect(0, H * .9, W, 14); };

// 3. Sitcom suburb, sunny (where the white Vision lifts off)
PLATES.suburb = (c, r, W, H) => { ENV.suburb(c, r, W, H); finish(c, r, W, H, { oil: 3, grain: 6, vig: .3 }); };

// 4. Scottish highlands at dusk (wide), loch + castle + village, pub far right
PLATES.highlands = (c, r, W, H) => {
  M.sky(c, r, W, H * .7, '#1b2470', '#f08a5c', { strokes: 3200 });
  M.sun(c, r, 1700, 760, 60, '#fff0c8', '#ff9a5c');
  M.clouds(c, r, W, 160, 520, 26, '#f8b48a', '#5a4a8a', { scale: 1.3 });
  const N = P2.Noise(11); M.hills(c, r, N, W, 690, 220, .0011, 4, '#4a3a6a', { density: 900, topLight: .12, botDark: -.1, rim: '#ff9a7a' });
  M.hills(c, r, N, W, 820, 120, .0024, 9, '#33304f', { density: 800, topLight: .06, botDark: -.1 });
  // loch reflecting sky
  const g = c.createLinearGradient(0, 860, 0, 1040); g.addColorStop(0, '#e8906a'); g.addColorStop(1, '#3a3a6a'); c.fillStyle = g; c.fillRect(0, 860, W, 180); puddleRefl(c, r, 1700, 880, 900, '#ffd0a0', .35);
  // castle on crag
  paintRegion(c, r, [[1900, 880], [2050, 700], [2250, 690], [2420, 880]], '#2a2240', { density: 300 });
  for (const [x, y, w, h] of [[2060, 560, 140, 140], [2210, 520, 60, 180], [2020, 600, 40, 100]]) { paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#2e2648', { density: 200 }); for (let k = 0; k < w / 20; k++) c.fillRect.call(c, x + k * 20, y - 14, 12, 14); }
  c.fillStyle = 'rgba(255,200,120,.9)'; c.fillRect(2100, 620, 8, 14); c.fillRect(2230, 580, 8, 14);
  // near moor ground + heather
  M.ground(c, r, W, H, 1000, '#3a3048', '#5a4a5a');
  for (let i = 0; i < 1400; i++) { const x = r() * W, y = r.range(1010, H); stroke(c, r, x, y, r.range(8, 22), -Math.PI / 2 + r.gauss() * .3, r.range(3, 7), r.pick(['#8a4a8a', '#6a3a6a', '#4a5a3a', '#b06aa0']), .5); }
  // village + pub with lit windows near right
  for (let i = 0; i < 7; i++) { const x = 1450 + i * 120, y = 1000 - (i % 2) * 10, w = 100, h = 80 + (i % 3) * 20; paintRegion(c, r, [[x, y - h], [x + w, y - h], [x + w, y], [x, y]], '#3a2a24', { density: 80 }); c.fillStyle = '#2a1e1a'; c.beginPath(); c.moveTo(x - 10, y - h); c.lineTo(x + w / 2, y - h - 50); c.lineTo(x + w + 10, y - h); c.fill(); c.fillStyle = 'rgba(255,190,100,.9)'; c.fillRect(x + 20, y - h + 25, 16, 18); c.fillRect(x + 62, y - h + 25, 16, 18); }
  glow(c, 1850, 960, 400, '#ffb060', .25);
  for (let i = 0; i < 26; i++) { const x = r() * 1300, y = r.range(930, 1000), h = r.range(80, 200); c.fillStyle = rgb(jitter('#1e1a30', r, 8)); for (let k = 0; k < 6; k++) { const w = h * .35 * (1 - k / 6), yy = y - k * h / 6; c.beginPath(); c.moveTo(x - w, yy); c.lineTo(x + w, yy); c.lineTo(x, yy - h / 3); c.closePath(); c.fill(); } }
  for (let i = 0; i < 9; i++) M.rock(c, r, r.range(0, W), r.range(1150, 1400), r.range(80, 220), r.range(50, 120), '#4a4058', '#ff9a7a');
  for (let i = 0; i < 14; i++) { const x = 100 + i * 180, y = 1120 + Math.sin(i) * 20; c.fillStyle = '#2a2018'; c.fillRect(x, y - 90, 12, 90); if (i) { c.strokeStyle = 'rgba(40,30,24,.8)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 168, y - 70 + Math.sin(i - 1) * 20); c.lineTo(x, y - 70); c.stroke(); } }
  for (let i = 0; i < 6; i++) { const x = r.range(300, 1300), y = r.range(1040, 1100); M.contactShadow(c, x, y + 10, 40, 8, .4); c.fillStyle = '#e8e0d8'; c.beginPath(); c.ellipse(x, y - 12, 34, 22, 0, 0, 7); c.fill(); c.fillStyle = '#1a1414'; c.beginPath(); c.ellipse(x + 34, y - 18, 10, 12, 0, 0, 7); c.fill(); c.fillRect(x - 20, y, 5, 14); c.fillRect(x + 14, y, 5, 14); }
  finish(c, r, W, H, { oil: 5, grain: 8, vig: .45 });
};

// 5. The mind house: cosy Victorian living room (warm, a little dreamy)
PLATES.mind_living = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 10, RH: 3.4, ch: 1.5, zf: 7, f: 1500, hor: .42 });
  R.shell({ back: '#7a4a3a', side: '#6a3e30', ceil: '#e8d8c0', floor: '#6a4024', skirting: '#3a2016' });
  // damask wallpaper dots
  for (let i = 0; i < 300; i++) { const [x, y] = R.p(r.range(-5, 5), r.range(1.2, 3.3), 6.99); c.fillStyle = 'rgba(240,200,140,.12)'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); }
  // fireplace centre
  R.box(-1.1, 0, 6.6, 2.2, 1.3, .3, '#e8dcc8', { density: 80 }); const [fx, fy] = R.p(-.6, .9, 6.6); const [fx2, fy2] = R.p(.6, 0, 6.6); c.fillStyle = '#1a0e08'; c.fillRect(fx, fy, fx2 - fx, fy2 - fy); glow(c, (fx + fx2) / 2, fy2 - 40, 500, '#ff8a30', .45); for (let k = 0; k < 40; k++) stroke(c, r, r.range(fx + 20, fx2 - 20), fy2 - r.range(5, 60), r.range(20, 50), -Math.PI / 2 + r.gauss() * .3, r.range(4, 10), r.pick(['#ffcf5a', '#ff8a30', '#ff5a20']), .6);
  // mirror over mantel, clock
  const [mx, my] = R.p(-.7, 2.9, 6.95); const [mx2, my2] = R.p(.7, 1.6, 6.95); c.fillStyle = '#c9a04a'; c.fillRect(mx - 14, my - 14, mx2 - mx + 28, my2 - my + 28); c.fillStyle = '#8aa0b0'; c.fillRect(mx, my, mx2 - mx, my2 - my); glow(c, (mx + mx2) / 2, (my + my2) / 2, 200, '#e8f0ff', .2);
  // tall windows with soft daylight + curtains
  for (const cx of [-3.3, 3.3]) { const [x, y, w, h] = R.backRect(cx - .7, 1, cx + .7, 3); ENV.window(c, r, x, y, w, h, ENV.view.daySky, { frame: '#f0e6d4', curtain: '#8a2a3a', light: [300, 600] }); }
  // bookshelves on side walls
  for (const sx of [-4.9, 4.2]) { const [x, y] = R.p(sx, 2.6, 3.4); ENV.shelf(c, r, x, y, 160, 5, 110); }
  // rug
  const [rx, ry] = R.p(0, 0, 4.2); ENV.rug(c, r, rx, ry, 1600, 300, '#8a3a3a', '#d8b46a');
  // lamps
  for (const lx of [-2.2, 2.2]) { const [x, y] = R.p(lx, 0, 6); ENV.lamp(c, r, x, y, 1.6, true); glow(c, x, y - 220, 380, '#ffd890', .35); }
  for (const [x0, y0] of [[-2.2, 2.4], [2.2, 2.4]]) { const [x, y] = R.p(x0 - .4, y0, 6.95); ENV.frameArt(c, r, x, y, 170, 130, { a: '#c9a04a', b: '#3a5a6a', frame: '#7a5a20' }); }
  for (const [ax, az] of [[-3.2, 4.4], [3.2, 4.4]]) R.box(ax - .5, 0, az, 1, .9, .9, '#3a5a4a', { density: 60 });
  ENV.plant(c, r, ...R.p(-3.9, 0, 5.4), 1.6); ENV.plant(c, r, ...R.p(3.9, 0, 5.4), 1.4);
  // floating "inside a head" motes
  for (let i = 0; i < 70; i++) glow(c, r() * W, r() * H * .8, r.range(6, 16), '#bfe8ff', .35);
  glow(c, W / 2, H * .4, 1300, '#ffc890', .12);
  finish(c, r, W, H, { oil: 4, grain: 7, vig: .4 });
};
// sofa foreground (PNG) so the roommates stand in front of furniture on the floor
PLATES.fg_sofa = (c, r, W, H) => { const x = W * .16, w = W * .68, y = H * .52, h = H * .2; M.contactShadow(c, x + w / 2, y + h + 6, w * .55, 30, .45);
  paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#8a2a3a', { density: 60, len: [20, 60], w: [4, 10], al: .55, topLight: .15, botDark: -.35 });
  paintRegion(c, r, [[x - 40, y + 40], [x + 60, y + 40], [x + 60, y + h + 10], [x - 40, y + h + 10]], '#7a2232', { density: 50, al: .55 }); paintRegion(c, r, [[x + w - 60, y + 40], [x + w + 40, y + 40], [x + w + 40, y + h + 10], [x + w - 60, y + h + 10]], '#7a2232', { density: 50, al: .55 });
  for (let k = 0; k < 4; k++) { c.strokeStyle = 'rgba(40,8,14,.45)'; c.lineWidth = 4; c.beginPath(); c.moveTo(x + w * (k + 1) / 5, y + 10); c.lineTo(x + w * (k + 1) / 5, y + h * .6); c.stroke(); } };

// 6. London covered market at dusk (the kidnapping)
PLATES.market = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#2a2a40', '#6a4a3a', { blobs: 120 });
  // iron roof arches
  for (let i = 0; i < 9; i++) { const x = i * 320 - 100; c.strokeStyle = '#1a2228'; c.lineWidth = 22; c.beginPath(); c.moveTo(x, 900); c.quadraticCurveTo(x + 160, 60, x + 320, 900); c.stroke(); c.strokeStyle = 'rgba(120,160,180,.25)'; c.lineWidth = 4; c.stroke(); }
  for (let k = 0; k < 7; k++) { c.strokeStyle = '#1a2228'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 120 + k * 110); c.lineTo(W, 120 + k * 110); c.stroke(); }
  // glass roof glow
  c.fillStyle = 'rgba(180,200,220,.12)'; c.fillRect(0, 0, W, 700);
  // stalls with awnings + string lights
  const aw = ['#c23a3a', '#2a6a4a', '#e0a020', '#2a4a8a', '#8a2a5a'];
  for (let i = 0; i < 7; i++) { const x = 40 + i * 370, y = 700; paintRegion(c, r, [[x, y], [x + 330, y], [x + 330, y + 360], [x, y + 360]], '#3a2a20', { density: 90 });
    for (let s = 0; s < 6; s++) { c.fillStyle = s % 2 ? '#f4f1ea' : aw[i % 5]; c.beginPath(); c.moveTo(x - 20 + s * 62, y - 10); c.lineTo(x + 42 + s * 62, y - 10); c.lineTo(x + 42 + s * 62, y + 50); c.quadraticCurveTo(x + 11 + s * 62, y + 80, x - 20 + s * 62, y + 50); c.fill(); }
    for (let k = 0; k < 30; k++) { c.fillStyle = rgb(jitter(r.pick(['#d84a2a', '#e8b030', '#6a9a3a', '#8a3a6a', '#f0e0b0']), r, 20)); c.beginPath(); c.arc(x + 20 + r() * 290, y + 220 + r() * 60, r.range(10, 18), 0, 7); c.fill(); }
    c.fillStyle = '#5a3a24'; c.fillRect(x, y + 280, 330, 26); }
  for (let k = 0; k < 120; k++) { const x = k * 22, y = 640 + Math.sin(k * .25) * 30; glow(c, x, y, 40, '#ffd27a', .5); c.fillStyle = '#fff2c0'; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); }
  // floor
  M.floorBoards(c, r, [0, 1060, W, 380], '#4a3a30', 10);
  paintRegion(c, r, [[0, 1060], [W, 1060], [W, H], [0, H]], '#3a3230', { density: 300, al: .35, topLight: .05, botDark: -.2 });
  // distant crowd silhouettes
  for (let i = 0; i < 40; i++) { const x = r() * W, y = 1060, h = r.range(150, 230); c.fillStyle = rgb(jitter('#2a2430', r, 10), .8); c.beginPath(); c.ellipse(x, y - h + 20, 18, 22, 0, 0, 7); c.fill(); c.fillRect(x - 24, y - h + 40, 48, h - 40); }
  glow(c, W / 2, 700, 1400, '#ff9a5a', .12);
  finish(c, r, W, H, { oil: 4, grain: 8, vig: .5 });
};

// 7. Dark gala hall (robot bride reveal): moonlit, red accent
PLATES.gala = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#0a0a14', '#1a0e18', { blobs: 120 });
  // tall arched windows with moonlight
  for (let i = 0; i < 5; i++) { const x = 160 + i * 500, y = 160; c.fillStyle = '#2a3a6a'; c.beginPath(); c.moveTo(x, y + 700); c.lineTo(x, y + 140); c.arc(x + 110, y + 140, 110, Math.PI, 0); c.lineTo(x + 220, y + 700); c.closePath(); c.fill(); c.strokeStyle = '#05050a'; c.lineWidth = 10; c.stroke(); c.beginPath(); c.moveTo(x + 110, y + 30); c.lineTo(x + 110, y + 700); c.moveTo(x, y + 420); c.lineTo(x + 220, y + 420); c.stroke(); }
  rays(c, r, 1280, -200, 22, 1700, '#8aa8ff', .05, 1.3);
  // marble floor with reflections
  const g = c.createLinearGradient(0, 960, 0, H); g.addColorStop(0, '#1a1a26'); g.addColorStop(1, '#0a0a10'); c.fillStyle = g; c.fillRect(0, 960, W, H - 960);
  for (let i = -10; i < 20; i++) { c.strokeStyle = 'rgba(120,130,180,.15)'; c.lineWidth = 2; c.beginPath(); c.moveTo(1280 + i * 60, 960); c.lineTo(1280 + i * 260, H); c.stroke(); }
  for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(0, 960 + k * k * 22); c.lineTo(W, 960 + k * k * 22); c.stroke(); }
  // exhibit plinths + a covered statue + "ape to robot" mural shapes
  for (const x of [400, 2100]) { paintRegion(c, r, [[x, 760], [x + 180, 760], [x + 180, 980], [x, 980]], '#2a2a36', { density: 90, rim: '#8aa8ff' }); glow(c, x + 90, 740, 160, '#ff3030', .25); }
  c.fillStyle = 'rgba(200,40,40,.35)'; for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(900 + i * 150, 560, 30 + i * 4, 70 + i * 6, 0, 0, 7); c.fill(); }
  for (let i = 0; i < 6; i++) { const x = 60 + i * 500; paintRegion(c, r, [[x, 80], [x + 90, 80], [x + 90, 980], [x, 980]], '#2a2834', { density: 60, ang: Math.PI / 2, angJ: .05, al: .5, topLight: .15, botDark: -.4, rim: '#8aa8ff' }); for (let k = 0; k < 4; k++) { c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 18 + k * 18, 100); c.lineTo(x + 18 + k * 18, 960); c.stroke(); } c.fillStyle = '#3a3646'; c.fillRect(x - 20, 60, 130, 40); c.fillRect(x - 20, 960, 130, 30); }
  for (const x of [0, W - 260]) paintRegion(c, r, [[x, 0], [x + 260, 0], [x + 220, 1000], [x + 40, 1000]], '#5a0e18', { density: 40, len: [40, 120], w: [4, 12], ang: Math.PI / 2, angJ: .05, al: .6, topLight: .1, botDark: -.4 });
  { const cx = 1280, cy = 230; c.strokeStyle = '#8a7a4a'; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, cy); c.stroke(); for (let k = 0; k < 3; k++) { c.strokeStyle = '#c9a04a'; c.lineWidth = 6; c.beginPath(); c.ellipse(cx, cy + k * 40, 260 - k * 70, 30 - k * 6, 0, 0, 7); c.stroke(); for (let j = 0; j < 12 - k * 3; j++) { const a = j / (12 - k * 3) * 6.283, x = cx + Math.cos(a) * (260 - k * 70), y = cy + k * 40 + Math.sin(a) * (30 - k * 6); glow(c, x, y - 10, 40, '#ffd890', .5); c.fillStyle = '#fff2c8'; c.fillRect(x - 3, y - 22, 6, 16); } } glow(c, cx, cy + 40, 600, '#ffb060', .1); }
  for (let i = 0; i < 26; i++) { const x = r() * W, y = 1000 + r() * 40, h = r.range(220, 300); c.fillStyle = 'rgba(8,6,12,.9)'; c.beginPath(); c.ellipse(x, y - h + 24, 20, 25, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(x - 30, y - h + 50); c.lineTo(x + 30, y - h + 50); c.lineTo(x + 40, y); c.lineTo(x - 40, y); c.closePath(); c.fill(); }
  for (let i = 0; i < 80; i++) glow(c, r() * W, r() * 900, r.range(4, 10), '#cfd8ff', .25);
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 });
};

// 8. Ultron's attic: stacks of old TVs, stained-glass dots window, armchair
PLATES.attic = (c, r, W, H) => {
  // sloped roof
  paintRegion(c, r, [[0, 0], [W, 0], [W, 300], [1280, 120], [0, 300]], '#2a1a22', { density: 150 });
  paintRegion(c, r, [[0, 300], [1280, 120], [W, 300], [W, 1000], [0, 1000]], '#3a2430', { density: 140, ang: Math.PI / 2, angJ: .1, al: .45 });
  for (let k = 0; k < 14; k++) { const x = k * 200; c.strokeStyle = '#1a0e14'; c.lineWidth = 26; c.beginPath(); c.moveTo(x, 0); c.lineTo(1280 + (x - 1280) * .3, 160); c.stroke(); }
  // round stained glass window (dots)
  const wx = 1280, wy = 420; c.fillStyle = '#120a10'; c.beginPath(); c.arc(wx, wy, 230, 0, 7); c.fill();
  for (let i = 0; i < 160; i++) { const a = r() * 7, d = Math.sqrt(r()) * 210; c.fillStyle = r.pick(['#e23a3a', '#2fc6ff', '#ffd23d', '#7a4fd0', '#3f8f5f']); c.globalAlpha = .8; c.beginPath(); c.arc(wx + Math.cos(a) * d, wy + Math.sin(a) * d, r.range(8, 20), 0, 7); c.fill(); } c.globalAlpha = 1;
  rays(c, r, wx, wy, 14, 1300, '#c8a0ff', .05, 1.0);
  // TV stacks both sides (CRT glow)
  for (const side of [0, 1]) for (let col = 0; col < 3; col++) for (let row = 0; row < 4; row++) { const w = r.range(170, 230), h = w * .78, x = side ? 1700 + col * 260 + r.range(-10, 10) : 120 + col * 260 + r.range(-10, 10), y = 980 - (row + 1) * (h + 8);
    c.fillStyle = rgb(jitter('#4a3a2a', r, 14)); c.fillRect(x, y, w, h); c.strokeStyle = '#120a08'; c.lineWidth = 5; c.strokeRect(x, y, w, h);
    const scr = r.pick(['#5a9ad8', '#8ad8a8', '#d8d0c0', '#7a6ad8', '#d87a5a']); c.fillStyle = scr; c.beginPath(); c.roundRect(x + 14, y + 14, w * .72, h - 28, 18); c.fill(); for (let s = 0; s < h; s += 6) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x + 14, y + 14 + s, w * .72, 2); } glow(c, x + w * .4, y + h / 2, 220, scr, .35);
    c.fillStyle = '#1a1210'; c.beginPath(); c.arc(x + w * .88, y + h * .3, 8, 0, 7); c.arc(x + w * .88, y + h * .55, 8, 0, 7); c.fill(); }
  // floorboards, rug, armchair base
  M.floorBoards(c, r, [0, 980, W, 460], '#3a2418', 12);
  ENV.rug(c, r, 1280, 1180, 1200, 260, '#5a1a2a', '#c9a04a');
  paintRegion(c, r, [[1080, 760], [1480, 760], [1500, 1120], [1060, 1120]], '#6a1a28', { density: 60, al: .6, topLight: .2, botDark: -.4, rim: '#ff6a6a' });
  paintRegion(c, r, [[1000, 940], [1120, 940], [1120, 1140], [1000, 1140]], '#5a1422', { density: 40, al: .6 }); paintRegion(c, r, [[1440, 940], [1560, 940], [1560, 1140], [1440, 1140]], '#5a1422', { density: 40, al: .6 });
  // dust motes
  for (let i = 0; i < 120; i++) glow(c, r() * W, r() * 1000, r.range(3, 8), '#fff0d0', .3);
  finish(c, r, W, H, { oil: 4, grain: 10, vig: .6 });
};
})();
