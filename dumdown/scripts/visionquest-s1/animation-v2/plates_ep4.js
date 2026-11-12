// DumDown VisionQuest Episode 4 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;
// 1. Crime scene: empty night warehouse, police tape, scorched wing marks on the concrete
PLATES.crime_scene = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 12, RH: 5, ch: 1.6, zf: 14, f: 1700, hor: .42 });
  R.shell({ back: '#3a3e48', side: '#33363f', ceil: '#24262c', floor: '#55575c', planks: false });
  for (let k = 0; k < 4; k++) { const [x, y, w, h] = R.backRect(-5 + k * 2.8, 2.8, -3.4 + k * 2.8, 4.4); c.fillStyle = '#1a2a44'; c.fillRect(x, y, w, h); c.strokeStyle = '#14161a'; c.lineWidth = 8; c.strokeRect(x, y, w, h); c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.moveTo(x, y + h / 2); c.lineTo(x + w, y + h / 2); c.stroke(); glow(c, x + w / 2, y + h / 2, 260, '#6a8aff', .12); }
  for (const z of [5, 9, 13]) for (const x of [-4.5, 4]) R.box(x, 0, z, .4, R.RH, .4, '#4a4e58', { density: 60 });
  // overhead lamp pool
  const [lx, ly] = R.p(0, 0, 6); c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(lx, ly, 20, lx, ly, 900); g.addColorStop(0, 'rgba(255,230,180,.45)'); g.addColorStop(1, 'rgba(255,230,180,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(lx, ly, 900, 260, 0, 0, 7); c.fill(); c.restore();
  { const [a, b] = R.p(0, R.RH, 6); c.fillStyle = '#ffeec8'; c.fillRect(a - 60, b, 120, 16); c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(30px)'; c.fillStyle = 'rgba(255,230,180,.16)'; c.beginPath(); c.moveTo(a - 60, b); c.lineTo(a + 60, b); c.lineTo(lx + 700, ly); c.lineTo(lx - 700, ly); c.fill(); c.restore(); }
  // wing marks: two scorched feathered fans on the floor
  for (const s of [-1, 1]) for (let i = 0; i < 26; i++) { const a = s * (.25 + i * .045), L = 520 - i * 8; c.save(); c.translate(lx + s * 30, ly - 10); c.scale(1, .32); c.rotate(-Math.PI / 2 + a); for (let k = 0; k < 6; k++) stroke(c, r, 0, -L * (.3 + k * .12), L * .22, -Math.PI / 2, 10 - k, r.pick(['#141418', '#1e1e24', '#2a2a30']), .55); c.restore(); }
  // police tape across the foreground + evidence markers
  c.save(); for (const [y0, y1] of [[1120, 1060], [1250, 1300]]) { c.strokeStyle = '#ffd23d'; c.lineWidth = 34; c.beginPath(); c.moveTo(-20, y0); c.quadraticCurveTo(W / 2, (y0 + y1) / 2 + 40, W + 20, y1); c.stroke(); c.fillStyle = '#141418'; c.font = 'bold 26px Inter'; for (let x = 60; x < W; x += 420) { const u = x / W, y = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * ((y0 + y1) / 2 + 40) + u * u * y1; c.fillText('DO NOT CROSS', x, y + 9); } } c.restore();
  for (const [x, z, n] of [[-2, 4, '1'], [2.5, 5, '2'], [-.6, 8, '3']]) { const [a, b] = R.p(x, 0, z), s = 10 / z; c.fillStyle = '#ffd23d'; c.beginPath(); c.moveTo(a - 22 * s, b); c.lineTo(a + 22 * s, b); c.lineTo(a + 12 * s, b - 34 * s); c.lineTo(a - 12 * s, b - 34 * s); c.closePath(); c.fill(); c.fillStyle = '#141418'; c.font = `800 ${20 * s}px Inter`; c.textAlign = 'center'; c.fillText(n, a, b - 8 * s); }
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .6 });
};
// 2. Interpol records office, painted for a black-and-white noir grade
PLATES.noir_office = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 7, RH: 3.2, ch: 1.5, zf: 6.5, f: 1800, hor: .44 });
  R.shell({ back: '#6a6058', side: '#5a524a', ceil: '#3a3430', floor: '#4a3a2e', skirting: '#2a2018' });
  // tall window with venetian blinds on the back wall, city night outside
  { const [x, y, w, h] = R.backRect(-1.6, 1.0, 1.0, 2.9); c.fillStyle = '#1a2230'; c.fillRect(x, y, w, h); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(255,230,160,.7)'; c.fillRect(x + r() * w, y + h * .5 + r() * h * .5, 4, 6); }
    for (let k = 0; k < h; k += 26) { c.fillStyle = 'rgba(200,190,170,.85)'; c.fillRect(x, y + k, w, 12); } c.strokeStyle = '#2a2018'; c.lineWidth = 16; c.strokeRect(x, y, w, h); }
  // filing cabinets along the right wall + left wall
  for (let k = 0; k < 4; k++) { const o = R.box(2.6, 0, 2.2 + k * .95, .85, 1.45, .85, '#7a7a6a', { density: 70 }); }
  for (let k = 0; k < 3; k++) R.box(-3.4, 0, 2.6 + k * .95, .85, 1.45, .85, '#6a6a5c', { density: 70 });
  // drawer lines on visible cabinet fronts
  for (let k = 0; k < 4; k++) for (let d = 1; d < 4; d++) { const z = 2.2 + k * .95, y = d * .36; const A = R.p(2.6, y, z), B = R.p(2.6, y, z + .85); c.strokeStyle = 'rgba(30,30,24,.6)'; c.lineWidth = 3; c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke(); }
  // the desk with green banker's lamp, typewriter and files
  R.box(-1.0, 0, 4.4, 2.0, .76, .9, '#5a3a24', { density: 90 });
  { const [lx, ly] = R.p(.7, .76, 4.8); c.fillStyle = '#c8a050'; c.fillRect(lx - 6, ly - 110, 12, 110); c.fillStyle = '#1f6a3a'; c.beginPath(); c.ellipse(lx - 30, ly - 120, 90, 34, 0, Math.PI, 0); c.fill(); glow(c, lx - 30, ly - 80, 600, '#ffe6a0', .4); }
  { const [tx, ty] = R.p(-.2, .76, 4.7); c.fillStyle = '#1a1a1a'; c.beginPath(); c.roundRect(tx - 120, ty - 90, 240, 90, 12); c.fill(); c.fillStyle = '#f4ecd8'; c.fillRect(tx - 80, ty - 150, 160, 70); }
  { const [fx, fy] = R.p(-.9, .76, 4.6); for (let k = 0; k < 4; k++) { c.fillStyle = ['#c8a870', '#b89860', '#d8b880', '#a88850'][k]; c.fillRect(fx - 10 + k * 4, fy - 20 - k * 12, 200, 12); } }
  // ceiling fan + hanging bulb
  { const [bx, by] = R.p(0, 3.2, 4.2); c.strokeStyle = '#1a1a1a'; c.lineWidth = 4; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx, by + 140); c.stroke(); c.fillStyle = '#fff4d0'; c.beginPath(); c.arc(bx, by + 160, 22, 0, 7); c.fill(); glow(c, bx, by + 160, 400, '#fff0c0', .25); }
  // blind shadows across everything
  c.save(); c.globalCompositeOperation = 'multiply'; for (let i = 0; i < 18; i++) { c.fillStyle = 'rgba(20,18,16,.32)'; c.beginPath(); c.moveTo(0, 60 + i * 80); c.lineTo(W, 260 + i * 80); c.lineTo(W, 292 + i * 80); c.lineTo(0, 92 + i * 80); c.fill(); } c.restore();
  finish(c, r, W, H, { oil: 3, grain: 12, vig: .6 }); };
// 3. Corkboard wall for the conspiracy board (pins/photos added in the film)
PLATES.corkboard = (c, r, W, H) => { wash(c, r, [0, 0, W, H], '#3a2a20', '#2a1e16', { blobs: 80 });
  c.fillStyle = '#b8865a'; c.fillRect(200, 160, W - 400, H - 320); for (let i = 0; i < 26000; i++) stroke(c, r, r.range(210, W - 210), r.range(170, H - 170), r.range(4, 10), r() * 6.28, r.range(2, 4), r.pick(['#a87a4a', '#c8966a', '#8a5a34', '#d8a878']), .5);
  for (let i = 0; i < 4000; i++) { c.fillStyle = rgb(jitter('#8a5a3a', r, 30), .5); c.fillRect(r.range(200, W - 200), r.range(160, H - 160), 3, 3); }
  c.strokeStyle = '#5a3a20'; c.lineWidth = 40; c.strokeRect(200, 160, W - 400, H - 320); glow(c, W / 2, H * .3, 1300, '#ffe0a0', .18); finish(c, r, W, H, { oil: 3, grain: 9, vig: .55 }); };
// 4. The gala: museum hall at night, warm chandeliers
PLATES.gala_hall = (c, r, W, H) => { ENV.museum(c, r, W, H, {});
  for (let i = 0; i < 3; i++) { const x = W * (.25 + i * .25), y = 230; glow(c, x, y, 520, '#ffd890', .3); c.strokeStyle = '#d8b060'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - 40); c.stroke(); for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283; c.fillStyle = 'rgba(255,240,200,.9)'; c.beginPath(); c.arc(x + Math.cos(a) * 90, y + Math.sin(a) * 24, 7, 0, 7); c.fill(); } }
  c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(80,50,90,.35)'; c.fillRect(0, 0, W, H); c.restore(); finish(c, r, W, H, { oil: 2, grain: 8, vig: .45 }); };
})();
