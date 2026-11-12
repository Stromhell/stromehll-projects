// DumDown VisionQuest Episode 6 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
const NEON = ['#ff3a8a', '#3ae8ff', '#ffd23d', '#8a5aff', '#ff6a2a', '#3aff9a'];

// 1. Madripoor: neon night street, wet road, layered towers + street stalls
PLATES.madripoor = (c, r, W, H) => {
  { const g = c.createLinearGradient(0, 0, 0, H * .6); g.addColorStop(0, '#0a0818'); g.addColorStop(1, '#3a1a3a'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
  for (let i = 0; i < 1400; i++) stroke(c, r, r() * W, r() * H * .55, r.range(20, 60), r.gauss() * .2, r.range(4, 10), r.pick(['#1a1028', '#2a1838', '#3a2040']), .35);
  // far towers (hazy) then near towers with lit windows
  for (const [n, y0, hmin, hmax, col, lit, haze] of [[22, 760, 300, 640, '#2a2040', .25, .5], [12, 860, 420, 760, '#16121e', .45, 0]]) {
    let x = -60; for (let k = 0; k < n && x < W; k++) { const w = r.range(140, 260), h = r.range(hmin, hmax); const top = y0 - h;
      paintRegion(c, r, [[x, top], [x + w, top], [x + w, y0], [x, y0]], col, { density: 90, al: .7, topLight: .08, botDark: -.15 });
      for (let wy = top + 30; wy < y0 - 30; wy += 34) for (let wx = x + 16; wx < x + w - 20; wx += 30) if (r() < lit) { c.fillStyle = rgb(mix(hex(r.pick(['#ffd890', '#ff9ad0', '#9ae8ff'])), hex(col), haze), .85); c.fillRect(wx, wy, 14, 18); }
      if (r() < .6) { const sx = x + w * .2, sy = top + r.range(40, h * .5), col2 = r.pick(NEON); c.fillStyle = rgb(mix(hex(col2), hex('#2a2040'), haze)); c.fillRect(sx, sy, w * .6, 26); glow(c, sx + w * .3, sy + 13, 140, col2, .25 * (1 - haze)); }
      x += w + r.range(-10, 30); } }
  // street level: shopfronts with signs, awnings, stalls
  paintRegion(c, r, [[0, 820], [W, 820], [W, 1000], [0, 1000]], '#1e1622', { density: 160, al: .6 });
  for (let x = 0; x < W; x += 320) { const col2 = r.pick(NEON); c.fillStyle = rgb(shade(hex(col2), -.45)); c.fillRect(x + 20, 840, 280, 150); c.fillStyle = 'rgba(255,220,170,.55)'; c.fillRect(x + 40, 880, 240, 100);
    c.fillStyle = col2; c.beginPath(); c.moveTo(x + 10, 840); c.lineTo(x + 310, 840); c.lineTo(x + 290, 880); c.lineTo(x + 30, 880); c.fill();
    for (let s = 0; s < 6; s++) { c.fillStyle = s % 2 ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.2)'; c.fillRect(x + 30 + s * 44, 846, 22, 30); }
    glow(c, x + 160, 900, 260, col2, .28); }
  // vertical neon blade signs with fake script
  for (const [x, y, col2] of [[260, 420, '#ff3a8a'], [900, 360, '#3ae8ff'], [1700, 400, '#ffd23d'], [2300, 380, '#8a5aff']]) { c.fillStyle = '#0a0810'; c.fillRect(x - 46, y, 92, 380); c.strokeStyle = col2; c.lineWidth = 8; c.strokeRect(x - 40, y + 6, 80, 368);
    for (let k = 0; k < 6; k++) { c.fillStyle = col2; const yy = y + 40 + k * 56; c.fillRect(x - 22, yy, 44, 8); c.fillRect(x - 4, yy - 14, 8, 36); }
    glow(c, x, y + 190, 420, col2, .32); }
  // cables between buildings + lanterns
  for (let k = 0; k < 5; k++) { const y = 300 + k * 80; c.strokeStyle = 'rgba(10,8,14,.9)'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, y); c.quadraticCurveTo(W / 2, y + 120, W, y - 20); c.stroke();
    if (k % 2 === 0) for (let i = 1; i < 10; i++) { const t = i / 10, lx = t * W, ly = (1 - t) * (1 - t) * y + 2 * t * (1 - t) * (y + 120) + t * t * (y - 20); c.fillStyle = '#e83a2a'; c.beginPath(); c.ellipse(lx, ly + 22, 16, 22, 0, 0, 7); c.fill(); glow(c, lx, ly + 22, 70, '#ff6a3a', .35); } }
  // wet road with neon reflections
  paintRegion(c, r, [[0, 1000], [W, 1000], [W, H], [0, H]], '#2a2234', { density: 260, al: .6, topLight: .1, botDark: -.2 }); c.fillStyle = '#3a3040'; c.fillRect(0, 990, W, 40);
  for (let i = 0; i < 260; i++) { const x = r() * W; stroke(c, r, x, r.range(1010, H), r.range(40, 160), Math.PI / 2 + r.gauss() * .05, r.range(6, 18), r.pick(NEON), .22); }
  for (let i = 0; i < 1200; i++) stroke(c, r, r() * W, r.range(1000, H), r.range(10, 40), r.gauss() * .2, r.range(2, 5), r.pick(['#2a2230', '#0a0810', '#3a3040']), .4);
  c.fillStyle = 'rgba(255,255,255,.08)'; for (let x = 0; x < W; x += 300) c.fillRect(x, 1200, 160, 10);
  // steam from a grate + drifting haze
  for (let i = 0; i < 40; i++) { const x = 1900 + r.gauss() * 80, y = 1060 - r() * 400; c.fillStyle = `rgba(200,180,220,${r.range(.02, .06)})`; c.beginPath(); c.ellipse(x, y, r.range(60, 140), r.range(30, 70), 0, 0, 7); c.fill(); }
  finish(c, r, W, H, { oil: 3, grain: 8, vig: .55 });
};

// 2. The cave (Iron Man 1 style): rock vault, sand floor, workbench + scrap
PLATES.cave = (c, r, W, H) => {
  c.fillStyle = '#1a1410'; c.fillRect(0, 0, W, H);
  // back wall rock strata
  paintRegion(c, r, [[0, 0], [W, 0], [W, 980], [0, 980]], '#4a3a2a', { density: 900, len: [40, 120], w: [14, 30], ang: 0, angJ: .3, al: .6, topLight: -.25, botDark: .1 });
  for (let i = 0; i < 40; i++) M.rock(c, r, r() * W, r.range(200, 980), r.range(200, 420), r.range(120, 260), r.pick(['#5a4632', '#4a3a28', '#6a543a']), '#8a6a44');
  // arch opening of daylight at the back
  { c.save(); c.beginPath(); c.moveTo(1640, 990); c.lineTo(1660, 700); c.quadraticCurveTo(1700, 430, 1900, 420); c.quadraticCurveTo(2100, 430, 2140, 700); c.lineTo(2160, 990); c.closePath(); c.clip(); const g = c.createLinearGradient(0, 400, 0, 1000); g.addColorStop(0, '#f0e0b0'); g.addColorStop(1, '#d8a860'); c.fillStyle = g; c.fillRect(1600, 380, 600, 760); M.hills(c, r, P2.Noise(7), 2560, 860, 60, .004, 2, '#c89058', { density: 120 }); c.restore(); }
  rays(c, r, 1900, 600, 7, 1500, '#ffe0a0', .07, .8); glow(c, 1900, 760, 700, '#ffd090', .22);
  // sand floor
  paintRegion(c, r, [[0, 980], [W, 980], [W, H], [0, H]], '#8a6a44', { density: 600, len: [20, 60], w: [6, 14], ang: 0, angJ: .15, al: .5, topLight: -.15, botDark: .15 });
  for (let i = 0; i < 500; i++) { c.fillStyle = r.pick(['rgba(60,40,20,.35)', 'rgba(200,160,110,.3)']); c.beginPath(); c.ellipse(r() * W, r.range(1000, H), r.range(4, 14), r.range(2, 6), 0, 0, 7); c.fill(); }
  // lantern-lit workbench (left), scrap piles, crates with fake stencils
  c.fillStyle = '#3a2a1a'; c.fillRect(260, 860, 820, 40); for (const x of [290, 1040]) c.fillRect(x, 900, 24, 200);
  for (let k = 0; k < 18; k++) { c.fillStyle = r.pick(['#6a6a70', '#8a8a90', '#4a4a50', '#a07a40']); c.save(); c.translate(320 + r() * 720, 860 - r() * 40); c.rotate(r.gauss() * .5); c.fillRect(-r.range(10, 40), -r.range(6, 20), r.range(20, 80), r.range(10, 30)); c.restore(); }
  for (const [x, w] of [[180, 300], [2260, 260]]) { for (let i = 0; i < 70; i++) { c.fillStyle = r.pick(['#5a5a60', '#7a7a80', '#3a3a40', '#8a6a3a']); c.save(); c.translate(x + r.gauss() * w * .3, 1100 - Math.abs(r.gauss()) * 90); c.rotate(r() * 3); c.fillRect(-20, -8, r.range(20, 70), r.range(8, 22)); c.restore(); } }
  for (const [x, y] of [[1300, 1000], [1420, 1040], [2380, 960]]) { paintRegion(c, r, [[x, y - 140], [x + 180, y - 140], [x + 180, y], [x, y]], '#6a5030', { density: 50, al: .6, topLight: .2, botDark: -.3 }); c.fillStyle = 'rgba(30,20,10,.6)'; c.font = 'bold 30px monospace'; c.fillText('X-17', x + 40, y - 60); }
  for (const x of [560, 1180]) { c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 520); c.stroke(); c.fillStyle = '#ffd07a'; c.beginPath(); c.arc(x, 540, 22, 0, 7); c.fill(); glow(c, x, 540, 420, '#ffb050', .35); }
  finish(c, r, W, H, { oil: 4, grain: 9, vig: .6 });
};

// 3. Jikastan server farm: server hall with hay on the floor and chewed cables
PLATES.goat_servers = (c, r, W, H) => {
  ENV.serverhall(c, r, W, H);
  for (let i = 0; i < 1600; i++) stroke(c, r, r() * W, r.range(1080, H), r.range(14, 40), r.gauss() * .6, r.range(2, 4), r.pick(['#c8a050', '#d8b860', '#a08040', '#e8c870']), .55);
  for (let k = 0; k < 9; k++) { const x = r() * W; c.strokeStyle = r.pick(['#2a8a3a', '#c83a2a', '#2a5ac8', '#d8a020']); c.lineWidth = 10; c.beginPath(); c.moveTo(x, 560); c.bezierCurveTo(x + r.range(-200, 200), 900, x + r.range(-300, 300), 1100, x + r.range(-200, 200), 1300 + r() * 100); c.stroke(); }
  finish(c, r, W, H, { oil: 2, grain: 6, vig: .5 });
};
})();
