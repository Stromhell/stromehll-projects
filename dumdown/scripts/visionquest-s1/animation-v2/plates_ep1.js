// DumDown VisionQuest Episode 1 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
function sign(c, x, y, w, h, txt, col = '#1f6a3a', fs = 56) { c.fillStyle = rgb(shade(col, -.5)); c.beginPath(); c.roundRect(x - 4, y - 4, w + 8, h + 8, 10); c.fill(); c.fillStyle = col; c.beginPath(); c.roundRect(x, y, w, h, 8); c.fill();
  c.strokeStyle = '#f4f1ea'; c.lineWidth = 4; c.beginPath(); c.roundRect(x + 8, y + 8, w - 16, h - 16, 6); c.stroke(); c.fillStyle = '#f4f1ea'; c.font = `bold ${fs}px Inter, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, x + w / 2, y + h / 2 + 3); c.textBaseline = 'alphabetic';
  c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(x + 10, y + 10, w - 20, h * .3); }

// 1. Westview street corner, bright sitcom afternoon, street-sign pole + welcome board
PLATES.westview_corner = (c, r, W, H) => {
  ENV.suburb(c, r, W, H);
  // sidewalk corner + kerb in the foreground
  paintRegion(c, r, [[0, 1180], [W, 1150], [W, H], [0, H]], '#b8b0a4', { density: 160, len: [10, 30], w: [3, 8], al: .5, topLight: .1, botDark: -.15 });
  for (let x = -60; x < W; x += 260) { c.strokeStyle = 'rgba(90,80,70,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 1180); c.lineTo(x - 160, H); c.stroke(); }
  c.fillStyle = '#d8d2c6'; c.fillRect(0, 1160, W, 22); c.fillStyle = 'rgba(60,50,40,.35)'; c.fillRect(0, 1182, W, 8);
  // signpost (left of centre) with two crossed street blades
  const px = 820; M.contactShadow(c, px + 40, 1236, 90, 14, .45);
  c.fillStyle = '#3a4a3a'; c.fillRect(px - 11, 330, 22, 910); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(px - 7, 330, 5, 910); c.fillStyle = '#2a362a'; c.fillRect(px - 20, 1210, 40, 30);
  sign(c, px - 330, 360, 560, 110, 'ELLIS ST');
  c.save(); c.translate(px, 520); c.transform(1, 0, -.18, 1, 0, 0); sign(c, -170, 0, 440, 100, 'SHERWOOD AVE', '#1f6a3a', 50); c.restore();
  // "WELCOME TO WESTVIEW" board on the right lawn
  const bx = 1820, by = 760; for (const lx of [bx + 60, bx + 520]) { c.fillStyle = '#5a3a20'; c.fillRect(lx - 10, by + 200, 20, 240); } M.contactShadow(c, bx + 300, by + 440, 330, 20, .35);
  c.fillStyle = '#2a4a7a'; c.beginPath(); c.roundRect(bx, by, 600, 230, 20); c.fill(); c.strokeStyle = '#f0e2c0'; c.lineWidth = 10; c.stroke();
  c.fillStyle = '#f0e2c0'; c.textAlign = 'center'; c.font = '600 38px Georgia, serif'; c.fillText('WELCOME TO', bx + 300, by + 70); c.font = 'bold 88px Georgia, serif'; c.fillText('WESTVIEW', bx + 300, by + 160); c.font = '500 30px Georgia, serif'; c.fillText('NEW JERSEY', bx + 300, by + 205);
  for (let i = 0; i < 70; i++) stroke(c, r, bx + r.range(-30, 630), by + 440 - r.range(0, 30), r.range(12, 30), -Math.PI / 2 + r.gauss() * .4, r.range(4, 8), r.pick(['#e23a3a', '#ffd23d', '#f4f1ea', '#3f8f5f']), .7);
  // hydrant + mailbox for scale
  { const hx = 1180, hy = 1220; M.contactShadow(c, hx, hy, 40, 8, .4); c.fillStyle = '#c23a2a'; c.beginPath(); c.roundRect(hx - 22, hy - 90, 44, 90, 8); c.fill(); c.beginPath(); c.arc(hx, hy - 90, 26, Math.PI, 0); c.fill(); c.fillRect(hx - 36, hy - 70, 72, 16); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(hx - 14, hy - 88, 6, 80); }
  { const mx = 300, my = 1230; c.fillStyle = '#4a3a2a'; c.fillRect(mx - 6, my - 150, 12, 150); c.fillStyle = '#2a4a8a'; c.beginPath(); c.roundRect(mx - 50, my - 200, 100, 56, [28, 28, 4, 4]); c.fill(); c.fillStyle = '#e23a3a'; c.fillRect(mx + 40, my - 230, 8, 40); }
  glow(c, 2200, 200, 900, '#fff2c0', .2);
  finish(c, r, W, H, { oil: 3, grain: 6, vig: .3 });
};

// 2. Mind-house kitchen (DUM-E and U's sink job, Friday's coffee)
PLATES.mind_kitchen = (c, r, W, H) => {
  ENV.kitchen2(c, r, W, H);
  for (let i = 0; i < 60; i++) glow(c, r() * W, r() * H * .8, r.range(6, 16), '#bfe8ff', .3);
  glow(c, W / 2, H * .4, 1300, '#ffc890', .14);
  finish(c, r, W, H, { oil: 4, grain: 7, vig: .4 });
};

// 3. Paladin's van: ribbed dark interior, wall of monitors (screens left dark for the film to fill)
window.VAN_SCREENS = [[560, 300, 440, 270], [1060, 300, 440, 270], [1560, 300, 440, 270], [560, 610, 440, 270], [1060, 610, 440, 270], [1560, 610, 440, 270]];
PLATES.van_int = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#0c0f14', '#1a1e26', { blobs: 120 });
  // ribbed side walls in perspective
  for (const s of [-1, 1]) { const x0 = s < 0 ? 0 : W, xi = s < 0 ? 420 : 2140; paintRegion(c, r, [[x0, 0], [xi, 160], [xi, 1060], [x0, H]], '#22262e', { density: 90, ang: Math.PI / 2, angJ: .1, al: .5, topLight: .05, botDark: -.3 });
    for (let k = 0; k < 9; k++) { const u = k / 9, xa = x0 + (xi - x0) * u; c.strokeStyle = 'rgba(120,130,150,.25)'; c.lineWidth = 10 - u * 6; c.beginPath(); c.moveTo(xa, u * 160); c.lineTo(xa, H - u * 380); c.stroke(); } }
  // back wall
  paintRegion(c, r, [[420, 160], [2140, 160], [2140, 1060], [420, 1060]], '#1c2028', { density: 120, al: .45, topLight: .05, botDark: -.3 });
  // ceiling red strip light
  c.fillStyle = '#ff3a3a'; c.fillRect(600, 110, 1360, 12); glow(c, 1280, 116, 900, '#ff3a3a', .25);
  // monitors
  for (const [x, y, w, h] of window.VAN_SCREENS) { c.fillStyle = '#0a0a0e'; c.beginPath(); c.roundRect(x - 16, y - 16, w + 32, h + 32, 10); c.fill(); c.fillStyle = '#0f1a2a'; c.fillRect(x, y, w, h); glow(c, x + w / 2, y + h / 2, 340, '#4a8aff', .14); c.fillStyle = '#2a2a30'; c.fillRect(x + w / 2 - 14, y + h + 16, 28, 18); }
  // desk + keyboard + clutter
  paintRegion(c, r, [[380, 960], [2180, 960], [2300, 1110], [260, 1110]], '#2a2a30', { density: 80, al: .55, topLight: .2, botDark: -.3 });
  c.fillStyle = '#121216'; c.fillRect(1060, 985, 440, 60); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(80,140,255,.35)'; c.fillRect(1070 + (i % 20) * 21, 992 + Math.floor(i / 20) * 26, 16, 18); }
  for (const [x, col] of [[720, '#f4f1ea'], [790, '#c23a2a'], [1800, '#f4f1ea']]) { c.fillStyle = col; c.beginPath(); c.roundRect(x - 26, 900, 52, 70, 6); c.fill(); c.strokeStyle = '#000'; c.lineWidth = 3; c.stroke(); }
  // map + string board pinned on the left wall
  c.fillStyle = '#c8b890'; c.beginPath(); c.moveTo(120, 300); c.lineTo(380, 360); c.lineTo(380, 720); c.lineTo(120, 760); c.closePath(); c.fill();
  for (let k = 0; k < 8; k++) { c.fillStyle = '#e23a3a'; c.beginPath(); c.arc(150 + r() * 200, 380 + r() * 320, 8, 0, 7); c.fill(); } c.strokeStyle = '#c23a2a'; c.lineWidth = 3; c.beginPath(); for (let k = 0; k < 6; k++) c.lineTo(150 + r() * 200, 380 + r() * 320); c.stroke();
  // floor
  paintRegion(c, r, [[0, H], [260, 1110], [2300, 1110], [W, H]], '#14161a', { density: 120, al: .5 });
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 });
};

// 4. Dusk sky over the sea (the "threw a city" flashback); the city chunk is a separate PNG
PLATES.sky_city = (c, r, W, H) => {
  M.sky(c, r, W, H * .8, '#2a1a4a', '#ff7a4a', { strokes: 3000 });
  M.clouds(c, r, W, 200, 700, 24, '#ffb08a', '#4a2a5a', { scale: 1.3 });
  const g = c.createLinearGradient(0, 1060, 0, H); g.addColorStop(0, '#d86a4a'); g.addColorStop(1, '#2a1a3a'); c.fillStyle = g; c.fillRect(0, 1060, W, H - 1060);
  for (let i = 0; i < 200; i++) { c.fillStyle = `rgba(255,190,140,${r.range(.1, .4)})`; c.fillRect(r() * W, r.range(1070, H), r.range(30, 160), 3); }
  const N = P2.Noise(5); M.hills(c, r, N, W, 1060, 60, .002, 3, '#3a2040', { density: 500, topLight: .1, botDark: -.1 });
  finish(c, r, W, H, { oil: 4, grain: 8, vig: .45 });
};
PLATES.fg_city = (c, r, W, H) => { const cx = 1280, top = 560;
  // inverted rock cone
  paintRegion(c, r, [[cx - 600, top], [cx + 600, top], [cx + 380, top + 160], [cx + 120, top + 420], [cx - 60, top + 560], [cx - 260, top + 300], [cx - 520, top + 140]], '#4a3438', { density: 300, len: [10, 40], w: [4, 10], al: .6, topLight: .15, botDark: -.5, rim: '#ff9a6a' });
  for (let i = 0; i < 22; i++) { const x = cx - 540 + i * 50 + r.range(-10, 10), h = r.range(80, 300), w = r.range(36, 60); paintRegion(c, r, [[x, top - h], [x + w, top - h], [x + w, top + 4], [x, top + 4]], r.pick(['#5a4a5a', '#6a5060', '#4a3a4a']), { density: 40, al: .6, topLight: .2, botDark: -.3, rim: '#ffb08a' });
    for (let k = 0; k < h / 40; k++) if (r() < .5) { c.fillStyle = 'rgba(255,210,140,.85)'; c.fillRect(x + 8 + r() * (w - 20), top - h + 14 + k * 38, 8, 12); } }
  for (let i = 0; i < 30; i++) { c.fillStyle = 'rgba(90,70,70,.8)'; c.beginPath(); c.arc(cx + r.range(-300, 200), top + r.range(300, 700), r.range(6, 18), 0, 7); c.fill(); } };
})();
