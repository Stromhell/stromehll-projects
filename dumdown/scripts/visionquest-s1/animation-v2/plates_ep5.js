// DumDown VisionQuest Episode 5 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
// 1. Old pub interior: bar counter, taps, bottles, booth, warm lamps
PLATES.pub = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 8, RH: 3.0, ch: 1.5, zf: 7, f: 1750, hor: .44 });
  R.shell({ back: '#6a3a24', side: '#5a3020', ceil: '#3a2418', floor: '#5a3a24', skirting: '#2a1a10' });
  // wood panelling + back shelves of bottles
  for (let x = -4; x < 4; x += .5) { const A = R.p(x, 0, 7), B = R.p(x, 1.1, 7); c.strokeStyle = 'rgba(30,14,6,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke(); }
  for (let sh = 0; sh < 3; sh++) { const y = 1.45 + sh * .42; const [a, b] = R.p(-2.6, y, 6.99), [a2] = R.p(2.6, y, 6.99); c.fillStyle = '#3a2010'; c.fillRect(a, b, a2 - a, 10); for (let x = a + 20; x < a2 - 20; x += r.range(28, 44)) { const h = r.range(60, 100); c.fillStyle = r.pick(['#2a6a3a', '#8a4a1a', '#c8a050', '#5a2a1a', '#e8e0c8', '#3a5a8a']); c.globalAlpha = .9; c.beginPath(); c.roundRect(x, b - h, 22, h, [8, 8, 2, 2]); c.fill(); c.fillRect(x + 7, b - h - 18, 8, 20); c.globalAlpha = 1; c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x + 4, b - h + 8, 4, h - 16); } }
  { const [x, y, w, h] = R.backRect(-3.4, 1.4, -2.8, 2.6); c.fillStyle = '#c8b890'; c.fillRect(x, y, w, h); c.fillStyle = '#231A24'; c.font = 'bold 40px Georgia'; c.textAlign = 'center'; c.fillText('THE', x + w / 2, y + 70); c.fillText('OLD', x + w / 2, y + 120); c.fillText('OAK', x + w / 2, y + 170); }
  // bar counter across the middle
  R.box(-3.2, 0, 4.6, 6.4, 1.05, .6, '#5a2a14', { density: 120 });
  { const [a, b] = R.p(-3.2, 1.05, 4.6), [a2] = R.p(3.2, 1.05, 4.6); c.fillStyle = '#c8a050'; c.fillRect(a, b - 6, a2 - a, 8); for (let k = 0; k < 5; k++) { const [tx, ty] = R.p(-1.2 + k * .5, 1.05, 4.9); c.fillStyle = '#d8b060'; c.fillRect(tx - 6, ty - 90, 12, 90); c.fillStyle = r.pick(['#1a1a1a', '#c81a2a', '#2a5aa0']); c.beginPath(); c.roundRect(tx - 16, ty - 130, 32, 44, 6); c.fill(); } }
  // stools
  for (let k = 0; k < 5; k++) { const [sx, sy] = R.p(-2.4 + k * 1.2, 0, 3.9); const s = 10 / 3.9; c.fillStyle = '#2a1a10'; c.fillRect(sx - 4 * s, sy - 70 * s, 8 * s, 70 * s); c.fillStyle = '#7a1a1a'; c.beginPath(); c.ellipse(sx, sy - 72 * s, 26 * s, 9 * s, 0, 0, 7); c.fill(); }
  for (const x of [-2, 0, 2]) { const [lx, ly] = R.p(x, 2.6, 5); c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(lx, 0); c.lineTo(lx, ly); c.stroke(); c.fillStyle = '#e8c070'; c.beginPath(); c.ellipse(lx, ly, 46, 22, 0, Math.PI, 0); c.fill(); glow(c, lx, ly + 30, 520, '#ffc870', .32); }
  finish(c, r, W, H, { oil: 3, grain: 8, vig: .5 }); };
// 2. White-cube art gallery (simulated date)
PLATES.gallery = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 10, RH: 3.6, ch: 1.6, zf: 9, f: 1750, hor: .44 });
  R.shell({ back: '#ecebe6', side: '#e2e0da', ceil: '#f4f3ef', floor: '#b8a890', planks: true, skirting: '#d8d6d0' });
  const art = [[-3.8, '#e23a3a', 0], [-1.0, '#2a5aa0', 1], [1.8, '#ffd23d', 2]]; for (const [x0, col, kind] of art) { const [x, y, w, h] = R.backRect(x0, 1.0, x0 + 2.0, 2.6); c.fillStyle = '#fff'; c.fillRect(x - 10, y - 10, w + 20, h + 20); c.fillStyle = '#f8f6f0'; c.fillRect(x, y, w, h);
    if (kind === 0) { c.fillStyle = col; c.fillRect(x + w * .15, y + h * .2, w * .5, h * .5); c.fillStyle = '#231A24'; c.fillRect(x + w * .5, y + h * .55, w * .35, h * .3); }
    if (kind === 1) { c.strokeStyle = col; c.lineWidth = 14; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(x + w / 2, y + h / 2, 30 + k * 26, 0, 7); c.stroke(); } }
    if (kind === 2) { c.fillStyle = col; c.beginPath(); c.arc(x + w * .4, y + h * .45, h * .28, 0, 7); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 10; c.beginPath(); c.moveTo(x + w * .1, y + h * .85); c.lineTo(x + w * .9, y + h * .15); c.stroke(); }
    const [bx, by] = R.p(x0 + 1, 0, 8.99); M.contactShadow(c, bx, by, 160, 14, .25); glow(c, x + w / 2, y - 30, 420, '#fffaf0', .25); }
  // bench in the middle
  R.box(-1.2, 0, 4.5, 2.4, .45, .6, '#3a3a3e', { density: 60 });
  finish(c, r, W, H, { oil: 2, grain: 6, vig: .25 }); };
// 3. Inside a cargo plane hold: ribbed fuselage, crates, cages, cargo netting
PLATES.cargo_plane = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#2a2e34', '#16181c', { blobs: 80 });
  const cx = W / 2, cy = H * .45;
  for (let k = 0; k < 14; k++) { const s = Math.pow(.82, k), rx = 1500 * s, ry = 900 * s; c.strokeStyle = `rgba(${110 - k * 4},${118 - k * 4},${128 - k * 4},.9)`; c.lineWidth = 40 * s + 4; c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, Math.PI * 1.02, Math.PI * 1.98); c.stroke(); }
  paintRegion(c, r, [[0, H * .74], [W, H * .74], [W, H], [0, H]], '#3a3a3e', { density: 200, al: .5, topLight: .1, botDark: -.3 });
  for (let x = -400; x < W + 400; x += 160) { c.strokeStyle = 'rgba(200,190,150,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, H); c.lineTo(cx + (x - cx) * .2, H * .74); c.stroke(); }
  c.fillStyle = '#c8e0ff'; c.fillRect(cx - 50, cy - 40, 100, 70); glow(c, cx, cy, 300, '#c8e0ff', .3);
  // crates and animal cages
  const crate = (x, y, w, h, col) => { paintRegion(c, r, [[x, y - h], [x + w, y - h], [x + w, y], [x, y]], col, { density: 50, al: .6, topLight: .15, botDark: -.3 }); c.strokeStyle = 'rgba(40,24,10,.7)'; c.lineWidth = 6; c.strokeRect(x, y - h, w, h); c.beginPath(); c.moveTo(x, y - h); c.lineTo(x + w, y); c.stroke(); };
  crate(80, 1150, 420, 360, '#8a6a3a'); crate(160, 790, 300, 240, '#7a5a30'); crate(2080, 1150, 420, 380, '#8a6a3a'); crate(1880, 1090, 220, 200, '#9a7a40');
  for (const [x, y] of [[620, 1120], [1720, 1120]]) { c.fillStyle = 'rgba(30,30,30,.35)'; c.fillRect(x, y - 260, 260, 260); c.strokeStyle = '#9a9a96'; c.lineWidth = 6; c.strokeRect(x, y - 260, 260, 260); for (let k = 1; k < 8; k++) { c.beginPath(); c.moveTo(x + k * 32, y - 260); c.lineTo(x + k * 32, y); c.stroke(); } }
  // hay
  for (let i = 0; i < 600; i++) stroke(c, r, r.range(500, 2100), r.range(1080, 1200), r.range(20, 50), r.range(-.5, .5), 3, r.pick(['#d8b860', '#c8a040', '#e8d080']), .6);
  // cargo netting overhead
  c.strokeStyle = 'rgba(200,180,120,.35)'; c.lineWidth = 3; for (let k = 0; k < 20; k++) { c.beginPath(); c.moveTo(k * 140, 100); c.lineTo(k * 140 + 300, 420); c.stroke(); c.beginPath(); c.moveTo(k * 140 + 300, 100); c.lineTo(k * 140, 420); c.stroke(); }
  c.fillStyle = '#ff3a2a'; c.fillRect(300, 120, 30, 30); glow(c, 315, 135, 160, '#ff3a2a', .4);
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .55 }); };
})();
