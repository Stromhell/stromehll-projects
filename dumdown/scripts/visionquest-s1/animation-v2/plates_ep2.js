// DumDown VisionQuest Episode 2 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;

// 1. Prison bus interior at night, Christmas tinsel, cage bars on both sides
PLATES.bus_int = (c, r, W, H) => {
  wash(c, r, [0, 0, W, H], '#14161e', '#22252e', { blobs: 120 });
  // curved roof + side walls in one-point perspective
  const vx = 1280, vy = 640;
  paintRegion(c, r, [[0, 0], [W, 0], [1700, 380], [860, 380]], '#2a2c34', { density: 100, al: .5, topLight: .1, botDark: -.2 });
  paintRegion(c, r, [[0, 0], [860, 380], [860, 900], [0, H]], '#30343c', { density: 120, al: .5, ang: Math.PI / 2, angJ: .1, topLight: .05, botDark: -.35 });
  paintRegion(c, r, [[W, 0], [1700, 380], [1700, 900], [W, H]], '#2c3038', { density: 120, al: .5, ang: Math.PI / 2, angJ: .1, topLight: .05, botDark: -.35 });
  paintRegion(c, r, [[860, 380], [1700, 380], [1700, 900], [860, 900]], '#1e2028', { density: 80, al: .5 });
  // rear door window with London night + bridge lights
  c.fillStyle = '#0c1430'; c.fillRect(1080, 440, 400, 260); for (let i = 0; i < 26; i++) glow(c, 1090 + r() * 380, 560 + r() * 120, 30, r.pick(['#ffcf7a', '#8ac8ff', '#ff8a8a']), .5);
  c.strokeStyle = '#3a4a6a'; c.lineWidth = 6; c.beginPath(); c.moveTo(1100, 620); c.quadraticCurveTo(1280, 520, 1460, 620); c.stroke(); c.strokeStyle = '#111'; c.lineWidth = 14; c.strokeRect(1080, 440, 400, 260);
  // side windows (dark, with blurred street lights)
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) { const u = i / 4, u2 = (i + .7) / 4; const xa = s < 0 ? lerpx(0, 860, u) : lerpx(W, 1700, u), xb = s < 0 ? lerpx(0, 860, u2) : lerpx(W, 1700, u2); const ya = lerpx(120, 420, u), yb = lerpx(420, 600, u);
    c.fillStyle = '#0a0e1c'; c.beginPath(); c.moveTo(xa, ya); c.lineTo(xb, lerpx(120, 420, u2)); c.lineTo(xb, lerpx(420, 600, u2)); c.lineTo(xa, yb); c.closePath(); c.fill(); glow(c, (xa + xb) / 2, (ya + yb) / 2, 80, '#ffb060', .25); }
  // floor aisle
  paintRegion(c, r, [[0, H], [860, 900], [1700, 900], [W, H]], '#1a1c22', { density: 160, al: .5 });
  for (let k = 0; k < 10; k++) { c.strokeStyle = 'rgba(200,210,230,.08)'; c.lineWidth = 3; c.beginPath(); c.moveTo(860 + k * 84, 900); c.lineTo(-200 + k * 300, H); c.stroke(); }
  // cage bars (both sides, receding)
  for (const s of [-1, 1]) for (let i = 0; i < 22; i++) { const u = i / 22, x = s < 0 ? lerpx(120, 900, u) : lerpx(2440, 1660, u), y0 = lerpx(60, 400, u), y1 = lerpx(1440, 900, u); c.strokeStyle = `rgba(150,160,180,${.85 - u * .4})`; c.lineWidth = lerpx(16, 4, u); c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = lerpx(4, 1, u); c.beginPath(); c.moveTo(x - 3, y0); c.lineTo(x - 3, y1); c.stroke(); }
  // tinsel + fairy lights along the roof
  for (const s of [-1, 1]) for (let i = 0; i < 40; i++) { const u = i / 40, x = s < 0 ? lerpx(0, 860, u) : lerpx(W, 1700, u), y = lerpx(30, 390, u) + Math.sin(i * 1.3) * lerpx(30, 8, u); glow(c, x, y, lerpx(30, 10, u), r.pick(['#ff3a3a', '#3aff6a', '#ffd23d', '#3ab0ff']), .7); }
  c.fillStyle = 'rgba(255,240,200,.9)'; c.fillRect(1180, 390, 200, 16); glow(c, 1280, 398, 600, '#fff0c0', .2);
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 });
  function lerpx(a, b, u) { return a + (b - a) * u; }
};

// 2. Frosty field at dawn: hedgerow, mist, the stopped prison bus on a lane
PLATES.frost_field = (c, r, W, H) => {
  M.sky(c, r, W, H * .55, '#4a5a8a', '#ffc8a0', { strokes: 2400 });
  M.sun(c, r, 1900, 690, 70, '#fff4d8', '#ffb080');
  const N = P2.Noise(21); M.hills(c, r, N, W, 700, 120, .0012, 2, '#6a7a9a', { density: 800, topLight: .15, botDark: -.1, rim: '#ffd0b0' });
  M.hills(c, r, N, W, 800, 70, .0025, 7, '#7a8aa8', { density: 700, topLight: .12, botDark: -.1 });
  // frosty ground with sparkle
  M.ground(c, r, W, H, 860, '#c8d4e4', '#9aaac4');
  for (let i = 0; i < 1600; i++) { const x = r() * W, y = r.range(870, H); stroke(c, r, x, y, r.range(6, 18), -Math.PI / 2 + r.gauss() * .4, r.range(2, 5), r.pick(['#e8f0ff', '#b8c8e0', '#8a9ab8', '#f8fcff']), .55); }
  for (let i = 0; i < 300; i++) glow(c, r() * W, r.range(880, H), r.range(3, 7), '#ffffff', .6);
  // hedgerow with frost + bare trees
  for (let i = 0; i < 60; i++) { const x = i * 46, y = 860; c.fillStyle = rgb(jitter('#3a4a4a', r, 10)); c.beginPath(); c.ellipse(x, y - 30, 40, 50, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(230,240,255,.4)'; c.beginPath(); c.ellipse(x, y - 60, 30, 14, 0, 0, 7); c.fill(); }
  for (const tx of [300, 700, 2300]) { c.strokeStyle = '#2a2a34'; c.lineCap = 'round'; const br = (x, y, a, l, w, d) => { if (d > 6) return; const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; c.lineWidth = w; c.beginPath(); c.moveTo(x, y); c.lineTo(x2, y2); c.stroke(); br(x2, y2, a - r.range(.2, .5), l * .72, w * .7, d + 1); br(x2, y2, a + r.range(.2, .5), l * .72, w * .7, d + 1); }; br(tx, 860, -Math.PI / 2, 160, 22, 0); }
  // lane
  paintRegion(c, r, [[1400, 860], [1700, 860], [2300, H], [900, H]], '#8a8a96', { density: 200, al: .45, topLight: .1, botDark: -.1 });
  // the stopped bus (side view) on the lane, far
  const bx = 1500, by = 860; M.contactShadow(c, bx + 260, by + 4, 280, 14, .4);
  paintRegion(c, r, [[bx, by - 210], [bx + 520, by - 210], [bx + 540, by - 30], [bx, by - 30]], '#e8ecf0', { density: 80, al: .6, topLight: .2, botDark: -.2 });
  c.fillStyle = '#2a3a6a'; c.fillRect(bx, by - 120, 540, 26); for (let i = 0; i < 6; i++) { c.fillStyle = '#1a2030'; c.fillRect(bx + 30 + i * 80, by - 190, 56, 50); c.strokeStyle = '#aaa'; c.lineWidth = 2; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(bx + 30 + i * 80 + k * 14, by - 190); c.lineTo(bx + 30 + i * 80 + k * 14, by - 140); c.stroke(); } }
  for (const wx of [bx + 90, bx + 440]) { c.fillStyle = '#111'; c.beginPath(); c.arc(wx, by - 30, 38, 0, 7); c.fill(); c.fillStyle = '#777'; c.beginPath(); c.arc(wx, by - 30, 14, 0, 7); c.fill(); }
  c.fillStyle = 'rgba(200,200,210,.5)'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(bx + 560 + k * 20, by - 60 - k * 22, 20 + k * 6, 0, 7); c.fill(); }
  // mist band
  const g = c.createLinearGradient(0, 760, 0, 940); g.addColorStop(0, 'rgba(255,240,230,0)'); g.addColorStop(.5, 'rgba(255,240,230,.35)'); g.addColorStop(1, 'rgba(255,240,230,0)'); c.fillStyle = g; c.fillRect(0, 760, W, 180);
  finish(c, r, W, H, { oil: 4, grain: 7, vig: .35 });
};

// 3. St Mabyn's hospital corridor: pale green tiles, strip lights, double doors at the end
PLATES.hospital = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 4.4, RH: 3.0, ch: 1.6, zf: 14, f: 1500, hor: .45 });
  R.shell({ back: '#a8c0b0', side: '#9ab4a4', ceil: '#d8e0dc', floor: '#8a9a94', skirting: '#4a5a54' });
  // wall tiles grid on side walls
  for (let z = 1; z < 14; z += .5) for (let y = 0; y < 1.4; y += .2) for (const x of [-2.2, 2.2]) { const [a, b] = R.p(x, y, z), [a2, b2] = R.p(x, y + .2, z + .5); c.strokeStyle = 'rgba(60,80,70,.25)'; c.lineWidth = 1.5; c.strokeRect(Math.min(a, a2), Math.min(b, b2), Math.abs(a2 - a), Math.abs(b2 - b)); }
  // green dado stripe
  for (const x of [-2.2, 2.2]) { const pts = [R.p(x, 1.3, .5), R.p(x, 1.3, 14), R.p(x, 1.45, 14), R.p(x, 1.45, .5)]; c.fillStyle = '#3a7a5a'; c.beginPath(); pts.forEach(([a, b], i) => i ? c.lineTo(a, b) : c.moveTo(a, b)); c.closePath(); c.fill(); }
  // ceiling strip lights
  for (let z = 1.5; z < 14; z += 1.6) { const [a, b] = R.p(-.4, 2.99, z), [a2, b2] = R.p(.4, 2.99, z + .5); c.fillStyle = '#fbfff8'; c.fillRect(a, b, a2 - a, Math.max(4, b2 - b)); glow(c, (a + a2) / 2, b, 260 / (z * .3 + 1), '#f0fff0', .35); }
  // doors along the side walls
  for (let z = 2; z < 13; z += 2.4) for (const x of [-2.2, 2.2]) { const [a, b] = R.p(x, 2.1, z), [a2, b2] = R.p(x, 0, z + .9); c.fillStyle = '#5a7a8a'; c.beginPath(); c.moveTo(a, b); c.lineTo(a2, R.p(x, 2.1, z + .9)[1]); c.lineTo(a2, b2); c.lineTo(a, R.p(x, 0, z)[1]); c.closePath(); c.fill(); c.strokeStyle = '#2a3a44'; c.lineWidth = 3; c.stroke(); }
  // end double doors with round windows + sign
  { const [a, b] = R.p(-.9, 2.2, 13.9), [a2, b2] = R.p(.9, 0, 13.9); c.fillStyle = '#6a8a9a'; c.fillRect(a, b, a2 - a, b2 - b); c.strokeStyle = '#2a3a44'; c.lineWidth = 4; c.strokeRect(a, b, a2 - a, b2 - b); c.beginPath(); c.moveTo((a + a2) / 2, b); c.lineTo((a + a2) / 2, b2); c.stroke(); for (const q of [.25, .75]) { c.fillStyle = '#cfe8f0'; c.beginPath(); c.arc(a + (a2 - a) * q, b + (b2 - b) * .3, (a2 - a) * .1, 0, 7); c.fill(); }
    c.fillStyle = '#1f4a3a'; c.fillRect(a - 30, b - 70, a2 - a + 60, 50); c.fillStyle = '#f4f1ea'; c.font = 'bold 20px Inter, Arial'; c.textAlign = 'center'; c.fillText("ST MABYN'S · WARD 3", (a + a2) / 2, b - 34); }
  // floor shine
  for (let z = 1.5; z < 14; z += 1.6) { const [a, b] = R.p(0, 0, z); glow(c, a, b, 200 / (z * .3 + 1), '#ffffff', .12); }
  // wheelchair + trolley props
  { const [x, y] = R.p(-1.6, 0, 4); M.contactShadow(c, x, y, 70, 12, .35); c.strokeStyle = '#4a4a50'; c.lineWidth = 6; c.beginPath(); c.arc(x, y - 50, 50, 0, 7); c.stroke(); c.fillStyle = '#3a6a8a'; c.fillRect(x - 40, y - 140, 80, 60); c.fillRect(x - 40, y - 200, 16, 70); }
  finish(c, r, W, H, { oil: 3, grain: 7, vig: .45 });
};

// 4. Underwater pool (teal, caustics, lane rope, light from above)
PLATES.pool = (c, r, W, H) => {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#5ad8d8'); g.addColorStop(.5, '#1a8a9a'); g.addColorStop(1, '#0a3a4a'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  // surface ripple band
  for (let i = 0; i < 400; i++) { c.fillStyle = `rgba(230,255,255,${r.range(.1, .4)})`; c.beginPath(); c.ellipse(r() * W, r.range(0, 160), r.range(20, 90), r.range(3, 8), 0, 0, 7); c.fill(); }
  rays(c, r, 1280, -300, 16, 1800, '#e8ffff', .07, 1.2);
  // tiled floor in perspective
  const fy = 1060; paintRegion(c, r, [[0, fy], [W, fy], [W, H], [0, H]], '#2a7a8a', { density: 200, al: .4 });
  for (let k = -12; k < 13; k++) { c.strokeStyle = 'rgba(10,50,60,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(1280 + k * 60, fy); c.lineTo(1280 + k * 240, H); c.stroke(); } for (let k = 0; k < 6; k++) { const y = fy + k * k * 12; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  c.fillStyle = '#0a3a5a'; c.fillRect(1240, fy, 80, H - fy); // lane line
  // caustics web
  for (let i = 0; i < 260; i++) { const x = r() * W, y = r.range(200, H); c.strokeStyle = `rgba(220,255,255,${r.range(.05, .18)})`; c.lineWidth = r.range(2, 5); c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + r.range(-60, 60), y + r.range(-40, 40), x + r.range(-60, 60), y + r.range(-40, 40), x + r.range(-90, 90), y + r.range(-30, 30)); c.stroke(); }
  // lane rope floats near the surface
  for (let i = 0; i < 40; i++) { c.fillStyle = i % 2 ? '#e23a3a' : '#f4f1ea'; c.beginPath(); c.ellipse(i * 68, 120, 30, 18, 0, 0, 7); c.fill(); }
  for (let i = 0; i < 90; i++) glow(c, r() * W, r() * H, r.range(4, 10), '#e8ffff', .4);
  finish(c, r, W, H, { oil: 3, grain: 6, vig: .5 });
};
})();
