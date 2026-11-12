// DumDown VisionQuest Episode 7 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, wash, glow, rays, finish, poly, paintRegion } = P2;
const ENV = window.ENV, M = window.M2;

// 1. 1939 lab: brick + wood panelling, chalkboard of equations, coils, workbench (sepia)
PLATES.lab1939 = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 9, RH: 3.4, ch: 1.6, zf: 8, f: 1750, hor: .44 });
  R.shell({ back: '#7a5a3a', side: '#6a4a30', ceil: '#4a3420', floor: '#5a4028', planks: true, skirting: '#2a1a10' });
  for (let y = 0; y < 3.4; y += .14) for (let x = -4.5; x < 4.5; x += .3) { const [a, b] = R.p(x + (Math.round(y / .14) % 2) * .15, y, 8); c.fillStyle = rgb(jitter(hex('#8a5a3a'), r, 14), .35); c.fillRect(a, b - 14, 64, 14); }
  { const [x, y, w, h] = R.backRect(-3.6, 1.1, -.4, 2.6); c.fillStyle = '#4a3a2a'; c.fillRect(x - 16, y - 16, w + 32, h + 32); c.fillStyle = '#2a3a2e'; c.fillRect(x, y, w, h); c.strokeStyle = 'rgba(240,235,220,.8)'; c.lineWidth = 3; c.font = '28px Georgia'; c.fillStyle = 'rgba(240,235,220,.8)';
    ['ψ = Σ aₙ · eⁱᵏˣ', 'J.I.M. — synthetic man', 'power: ??? (gem)', 'E ∝ ν³', 'HORTON 1939'].forEach((t, i) => c.fillText(t, x + 30, y + 60 + i * 56)); c.beginPath(); c.arc(x + w * .78, y + h * .45, 90, 0, 6); c.stroke(); for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(x + w * .78, y + h * .45); c.lineTo(x + w * .78 + Math.cos(k) * 120, y + h * .45 + Math.sin(k) * 120); c.stroke(); } }
  for (const x0 of [1.2, 3.0]) { const [bx, by] = R.p(x0, 0, 6.5), [tx, ty] = R.p(x0, 2.0, 6.5); c.fillStyle = '#3a2a1a'; c.fillRect(bx - 40, by - 60, 80, 60); c.fillStyle = '#b87a3a'; for (let k = 0; k < 18; k++) c.fillRect(bx - 22, by - 70 - k * ((by - ty - 120) / 18), 44, 6); c.fillStyle = '#c8c0b0'; c.beginPath(); c.ellipse(tx, ty, 70, 30, 0, 0, 7); c.fill(); glow(c, tx, ty, 260, '#a0d0ff', .3); }
  R.box(-3.8, 0, 6.6, 3.0, .95, .8, '#5a3a20', { density: 120 });
  { const [a, b] = R.p(-3.8, .95, 6.6); for (let k = 0; k < 14; k++) { c.fillStyle = r.pick(['#c8b080', '#8a8a8a', '#b87a3a', '#e8e0c8']); c.fillRect(a + 40 + r() * 700, b - r.range(20, 70), r.range(30, 90), r.range(20, 60)); } }
  for (const x of [-2, 0, 2]) { const [lx, ly] = R.p(x, 3.0, 5); c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(lx, 0); c.lineTo(lx, ly); c.stroke(); c.fillStyle = '#ffe0a0'; c.beginPath(); c.arc(lx, ly + 16, 20, 0, 7); c.fill(); glow(c, lx, ly + 20, 380, '#ffd090', .3); }
  c.fillStyle = 'rgba(200,160,112,.18)'; c.fillRect(0, 0, W, H); finish(c, r, W, H, { oil: 4, grain: 12, vig: .55 });
};

// 2. The crypt with the hexagonal pod ("the Nest")
PLATES.crypt = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 8, RH: 3.6, ch: 1.6, zf: 9, f: 1750, hor: .44 });
  R.shell({ back: '#3a3a40', side: '#2e2e34', ceil: '#202024', floor: '#3a3632', skirting: '#1a1a1e' });
  for (let y = 0; y < 3.6; y += .32) for (let x = -4; x < 4; x += .6) { const [a, b] = R.p(x + (Math.round(y / .32) % 2) * .3, y, 9), s = 1750 / 9 * .6; paintRegion(c, r, [[a + 3, b - s * .52], [a + s - 3, b - s * .52], [a + s - 3, b - 3], [a + 3, b - 3]], r.pick(['#4a4a50', '#42424a', '#525258']), { density: 6, al: .5, topLight: .1, botDark: -.2 }); }
  for (const x0 of [-3.2, 3.2]) { const [x, y, w, h] = R.backRect(x0 - .3, 0, x0 + .3, 3.2); paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#5a5a60', { density: 40, al: .6, topLight: .15, botDark: -.3 }); }
  // the Nest: hexagonal pod on a plinth, glowing amber
  { const [cx, cy] = R.p(0, 1.4, 8.4), rr = 230; glow(c, cx, cy, 900, '#ffb040', .3); c.fillStyle = '#2a2420'; c.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + Math.PI / 6; c.lineTo(cx + Math.cos(a) * rr * 1.1, cy + Math.sin(a) * rr * 1.25); } c.closePath(); c.fill();
    const g = c.createRadialGradient(cx, cy, 20, cx, cy, rr); g.addColorStop(0, '#fff0b0'); g.addColorStop(1, '#c86a1a'); c.fillStyle = g; c.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + Math.PI / 6; c.lineTo(cx + Math.cos(a) * rr * .9, cy + Math.sin(a) * rr * 1.05); } c.closePath(); c.fill();
    c.strokeStyle = 'rgba(80,40,10,.6)'; c.lineWidth = 3; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(cx + k * 50, cy - rr); c.lineTo(cx + k * 50, cy + rr); c.stroke(); }
    const [px, py] = R.p(0, 0, 8.4); c.fillStyle = '#3a3a40'; c.fillRect(px - 200, cy + rr * 1.1, 400, py - cy - rr * 1.1); }
  // eye-scan panel + blood-key slot
  { const [x, y] = R.p(-2.2, 1.4, 7.2); c.fillStyle = '#1a1a1e'; c.fillRect(x - 60, y - 90, 120, 180); c.fillStyle = '#ff3a3a'; c.beginPath(); c.ellipse(x, y - 30, 34, 18, 0, 0, 7); c.fill(); glow(c, x, y - 30, 120, '#ff3a3a', .4); c.fillStyle = '#5a0a0a'; c.fillRect(x - 30, y + 30, 60, 14); }
  for (const x of [-2.6, 2.6]) { const [lx, ly] = R.p(x, 2.2, 8.8); c.fillStyle = '#ff9a3a'; c.beginPath(); c.ellipse(lx, ly, 14, 26, 0, 0, 7); c.fill(); glow(c, lx, ly, 260, '#ff9a3a', .35); }
  for (let i = 0; i < 70; i++) { c.fillStyle = `rgba(200,190,170,${r.range(.02, .05)})`; c.beginPath(); c.ellipse(r() * W, r.range(1000, H), r.range(80, 200), r.range(20, 40), 0, 0, 7); c.fill(); }
  finish(c, r, W, H, { oil: 3, grain: 10, vig: .65 });
};

// 3. Horton Manor (Vision's mind-house transformed): grand hall, staircase, chandelier, portraits
PLATES.manor = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 11, RH: 4.4, ch: 1.6, zf: 9, f: 1700, hor: .44 });
  R.shell({ back: '#4a2a2a', side: '#3a2222', ceil: '#2a1818', floor: '#6a4a30', planks: true, skirting: '#1a0e0a' });
  for (let x = -5.5; x < 5.5; x += .55) { const A = R.p(x, 0, 9), B = R.p(x, 4.4, 9); c.strokeStyle = 'rgba(200,150,90,.18)'; c.lineWidth = 4; c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke(); }
  // central staircase rising to a landing
  for (let k = 0; k < 14; k++) { const y = k * .16, z = 8.9 - k * .0; const [a, b] = R.p(-1.6 + k * .04, y, 8.9 - (14 - k) * .2), [a2] = R.p(1.6 - k * .04, y, 8.9 - (14 - k) * .2); c.fillStyle = rgb(shade(hex('#7a1a1a'), -k * .02)); c.fillRect(a, b - 22, a2 - a, 24); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(a, b, a2 - a, 4); }
  { const [a, b] = R.p(-3, 2.3, 8.9), [a2] = R.p(3, 2.3, 8.9); c.fillStyle = '#3a2010'; c.fillRect(a, b - 20, a2 - a, 24); c.strokeStyle = '#2a1408'; c.lineWidth = 6; for (let x = a; x < a2; x += 40) { c.beginPath(); c.moveTo(x, b - 20); c.lineTo(x, b - 110); c.stroke(); } c.fillRect(a, b - 120, a2 - a, 14); }
  for (const [x0, col] of [[-4.6, '#4a6a8a'], [3.4, '#8a6a3a']]) { const [x, y, w, h] = R.backRect(x0, 1.4, x0 + 1.2, 3.0); c.fillStyle = '#c8a050'; c.fillRect(x - 14, y - 14, w + 28, h + 28); c.fillStyle = col; c.fillRect(x, y, w, h); c.fillStyle = '#e8c0a0'; c.beginPath(); c.ellipse(x + w / 2, y + h * .4, w * .2, h * .18, 0, 0, 7); c.fill(); c.fillStyle = '#2a1a10'; c.fillRect(x + w * .25, y + h * .6, w * .5, h * .4); }
  { const [cx, cy] = R.p(0, 3.6, 6); c.strokeStyle = '#2a2a2a'; c.lineWidth = 4; c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, cy); c.stroke(); c.strokeStyle = '#c8a050'; c.lineWidth = 6; c.beginPath(); c.ellipse(cx, cy + 20, 200, 40, 0, 0, 7); c.stroke(); for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283, lx = cx + Math.cos(a) * 200, ly = cy + 20 + Math.sin(a) * 40; c.fillStyle = '#ffe8b0'; c.beginPath(); c.arc(lx, ly - 18, 10, 0, 7); c.fill(); } glow(c, cx, cy + 20, 900, '#ffd890', .32); }
  { const pts = [R.p(-2.2, 0, 3), R.p(2.2, 0, 3), R.p(1.6, 0, 7.5), R.p(-1.6, 0, 7.5)]; c.fillStyle = 'rgba(120,20,30,.65)'; poly(c, pts); c.fill(); }
  finish(c, r, W, H, { oil: 4, grain: 9, vig: .6 });
};

// 4. Paladin's private jet: cream leather, oval windows, night clouds
PLATES.jet = (c, r, W, H) => {
  c.fillStyle = '#e8dcc8'; c.fillRect(0, 0, W, H);
  paintRegion(c, r, [[0, 0], [W, 0], [W, 260], [0, 260]], '#f4ecdc', { density: 120, al: .5, topLight: .1, botDark: -.15 });
  c.fillStyle = '#d8c8b0'; c.beginPath(); c.moveTo(0, 260); c.quadraticCurveTo(W / 2, 140, W, 260); c.lineTo(W, 300); c.quadraticCurveTo(W / 2, 180, 0, 300); c.fill();
  paintRegion(c, r, [[0, 300], [W, 300], [W, 980], [0, 980]], '#e0d2bc', { density: 300, al: .45, topLight: .1, botDark: -.15 });
  for (let k = 0; k < 6; k++) { const x = 220 + k * 420, y = 560; c.fillStyle = '#c8b8a0'; c.beginPath(); c.ellipse(x, y, 110, 150, 0, 0, 7); c.fill(); c.save(); c.beginPath(); c.ellipse(x, y, 88, 126, 0, 0, 7); c.clip(); const g = c.createLinearGradient(0, y - 126, 0, y + 126); g.addColorStop(0, '#0a1028'); g.addColorStop(1, '#3a2a5a'); c.fillStyle = g; c.fillRect(x - 90, y - 130, 180, 260); for (let i = 0; i < 10; i++) { c.fillStyle = 'rgba(200,190,230,.25)'; c.beginPath(); c.ellipse(x + r.range(-80, 80), y + r.range(30, 120), r.range(30, 70), r.range(10, 20), 0, 0, 7); c.fill(); } c.fillStyle = '#fff'; c.fillRect(x + r.range(-60, 60), y - r.range(40, 100), 3, 3); c.restore(); glow(c, x, y, 200, '#a0a0ff', .12); }
  c.fillStyle = '#a07a4a'; c.fillRect(0, 960, W, 30); paintRegion(c, r, [[0, 990], [W, 990], [W, H], [0, H]], '#4a3a3a', { density: 260, al: .5, topLight: .1, botDark: -.3 });
  for (const x of [380, 1280, 2180]) { paintRegion(c, r, [[x - 260, 760], [x + 260, 760], [x + 300, 1240], [x - 300, 1240]], '#f0e4cc', { density: 70, al: .6, topLight: .2, botDark: -.3 }); c.fillStyle = '#e8d8bc'; c.beginPath(); c.roundRect(x - 230, 700, 460, 120, 40); c.fill(); c.strokeStyle = 'rgba(120,90,60,.35)'; c.lineWidth = 4; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x - 260 + k * 130, 780); c.lineTo(x - 270 + k * 135, 1230); c.stroke(); } }
  for (let x = 120; x < W; x += 420) { c.fillStyle = '#fff4d0'; c.beginPath(); c.ellipse(x, 220, 30, 8, 0, 0, 7); c.fill(); glow(c, x, 240, 220, '#fff0c0', .25); }
  finish(c, r, W, H, { oil: 3, grain: 7, vig: .45 });
};

// 5. New York loft: brick wall, big factory windows onto the skyline, wood floor
PLATES.loft = (c, r, W, H) => {
  const R = new ENV.Room(c, r, W, H, { RW: 11, RH: 4.2, ch: 1.6, zf: 9, f: 1700, hor: .44 });
  R.shell({ back: '#7a3a2a', side: '#6a3226', ceil: '#2a2a2e', floor: '#6a4a30', planks: true, skirting: '#1a1210' });
  for (let y = 0; y < 4.2; y += .12) for (let x = -5.5; x < 5.5; x += .26) { const [a, b] = R.p(x + (Math.round(y / .12) % 2) * .13, y, 9); c.fillStyle = rgb(jitter(hex('#8a4030'), r, 18), .45); c.fillRect(a, b - 18, 46, 17); }
  for (const x0 of [-4.4, -1.3, 1.8]) { const [x, y, w, h] = R.backRect(x0, .9, x0 + 2.4, 3.8); const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1a1a3a'); g.addColorStop(1, '#6a4a6a'); c.fillStyle = g; c.fillRect(x, y, w, h);
    for (let k = 0; k < 9; k++) { const bw = r.range(30, 70), bh = r.range(80, h * .8), bx = x + r() * (w - bw); c.fillStyle = '#141428'; c.fillRect(bx, y + h - bh, bw, bh); for (let j = 0; j < 20; j++) if (r() < .5) { c.fillStyle = 'rgba(255,220,140,.8)'; c.fillRect(bx + r() * (bw - 6), y + h - bh + r() * bh, 4, 5); } }
    c.strokeStyle = '#1a1a1a'; c.lineWidth = 10; c.strokeRect(x, y, w, h); c.lineWidth = 5; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x + w * k / 4, y); c.lineTo(x + w * k / 4, y + h); c.stroke(); } for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(x, y + h * k / 5); c.lineTo(x + w, y + h * k / 5); c.stroke(); } }
  for (const x of [-3, 0, 3]) { const [lx, ly] = R.p(x, 3.4, 6); c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(lx, 0); c.lineTo(lx, ly); c.stroke(); c.fillStyle = '#2a2a2a'; c.beginPath(); c.moveTo(lx - 40, ly + 30); c.lineTo(lx + 40, ly + 30); c.lineTo(lx + 20, ly); c.lineTo(lx - 20, ly); c.fill(); glow(c, lx, ly + 60, 360, '#ffd090', .3); }
  R.box(2.6, 0, 6.5, 2.4, .45, 1.0, '#3a3a40', { density: 60 }); R.box(-4.6, 0, 7.6, 1.2, 1.9, .5, '#4a3020', { density: 60 });
  { const [a, b] = R.p(-4.6, 1.9, 7.6); for (let k = 0; k < 4; k++) for (let j = 0; j < 7; j++) { c.fillStyle = r.pick(['#8a2a2a', '#2a4a6a', '#c8a050', '#3a5a3a']); c.fillRect(a + 14 + j * 22, b + 30 + k * 70, 16, 54); } }
  finish(c, r, W, H, { oil: 3, grain: 8, vig: .5 });
};
})();
