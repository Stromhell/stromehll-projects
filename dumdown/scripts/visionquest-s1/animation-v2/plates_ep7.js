// DumDown VisionQuest Episode 7 plates (p2 brush engine, 2560x1440).
window.PLATES = window.PLATES || {};
(function () {
const { hex, rgb, mix, jitter, shade, stroke, wash, glow, rays, finish, poly, paintRegion } = P2; const lerp = (a, b, t) => a + (b - a) * t;
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
  const R = new ENV.Room(c, r, W, H, { RW: 11, RH: 4.4, ch: 1.6, zf: 9, f: 1700, hor: .44 }), P = (x, y, z) => R.p(x, y, z), ZB = 8.99;
  R.shell({ back: '#5a2430', side: '#46202a', ceil: '#2a1a16', floor: '#6a4428', planks: true, skirting: '#1a0e0a' });
  const quad = (pts, col) => { c.fillStyle = col; poly(c, pts); c.fill(); };
  // wallpaper damask (back + side walls, above wainscot)
  const damask = (x, y, s, al) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = `rgba(214,170,96,${al})`; c.beginPath(); c.moveTo(0, -26); c.bezierCurveTo(14, -16, 14, -2, 0, 6); c.bezierCurveTo(-14, -2, -14, -16, 0, -26); c.fill(); c.beginPath(); c.ellipse(0, 14, 5, 8, 0, 0, 7); c.fill(); for (const d of [-1, 1]) { c.beginPath(); c.moveTo(0, 2); c.quadraticCurveTo(d * 22, -4, d * 18, 16); c.quadraticCurveTo(d * 10, 8, 0, 6); c.fill(); } c.restore(); };
  for (let y = 1.25; y < 4.35; y += .42) for (let x = -5.4; x < 5.5; x += .5) { const [a, b] = P(x + (Math.round(y / .42) % 2) * .25, y, ZB); damask(a, b, 1, .16); }
  for (const sd of [-1, 1]) for (let z = 3.2; z < 9; z += .55) for (let y = 1.25; y < 4.35; y += .42) { const [a, b] = P(sd * 5.49, y, z); damask(a, b, 9 / z * .9, .11); }
  // wainscot panels + chair rail (back)
  { const [x0, y0] = P(-5.5, 1.1, ZB), [x1, y1] = P(5.5, 0, ZB); paintRegion(c, r, [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], '#3a2216', { density: 160, al: .55, topLight: .1, botDark: -.25 }); c.fillStyle = '#5a3a22'; c.fillRect(x0, y0 - 10, x1 - x0, 14); c.fillStyle = 'rgba(255,220,160,.25)'; c.fillRect(x0, y0 - 10, x1 - x0, 3);
    for (let x = -5.3; x < 5.2; x += .7) { const [a, b] = P(x, .95, ZB), [a2, b2] = P(x + .55, .15, ZB); c.strokeStyle = 'rgba(20,10,4,.6)'; c.lineWidth = 4; c.strokeRect(a, b, a2 - a, b2 - b); c.strokeStyle = 'rgba(255,210,150,.16)'; c.lineWidth = 2; c.strokeRect(a + 4, b + 4, a2 - a - 8, b2 - b - 8); } }
  for (const sd of [-1, 1]) { const pts = [P(sd * 5.5, 1.1, 3), P(sd * 5.5, 1.1, ZB), P(sd * 5.5, 0, ZB), P(sd * 5.5, 0, 3)]; paintRegion(c, r, pts, '#301a12', { density: 120, al: .5, topLight: .05, botDark: -.3 }); c.strokeStyle = '#5a3a22'; c.lineWidth = 8; c.beginPath(); c.moveTo(...pts[0]); c.lineTo(...pts[1]); c.stroke(); }
  // tall side windows with drapes (side walls)
  for (const sd of [-1, 1]) { const z0 = 4.2, z1 = 5.6; const pts = [P(sd * 5.48, 3.6, z0), P(sd * 5.48, 3.6, z1), P(sd * 5.48, 1.3, z1), P(sd * 5.48, 1.3, z0)]; quad(pts, '#2a3a5a'); const g = c.createLinearGradient(...pts[0], ...pts[2]); g.addColorStop(0, 'rgba(160,190,240,.5)'); g.addColorStop(1, 'rgba(40,60,110,.2)'); c.fillStyle = g; poly(c, pts); c.fill();
    c.strokeStyle = '#2a1810'; c.lineWidth = 7; c.beginPath(); c.moveTo(...P(sd * 5.48, 3.6, (z0 + z1) / 2)); c.lineTo(...P(sd * 5.48, 1.3, (z0 + z1) / 2)); c.moveTo(...P(sd * 5.48, 2.45, z0)); c.lineTo(...P(sd * 5.48, 2.45, z1)); c.stroke();
    for (const zz of [z0 - .25, z1 + .05]) { const d = [P(sd * 5.45, 3.9, zz), P(sd * 5.45, 3.9, zz + .3), P(sd * 5.45, .2, zz + .34), P(sd * 5.45, .2, zz - .04)]; paintRegion(c, r, d, '#7a1a22', { density: 60, al: .7, topLight: .15, botDark: -.3 }); c.strokeStyle = 'rgba(30,5,8,.5)'; c.lineWidth = 3; for (let f = 0; f < 4; f++) { const t = (f + .5) / 4; c.beginPath(); c.moveTo(...P(sd * 5.45, 3.9, zz + .3 * t)); c.lineTo(...P(sd * 5.45, .2, zz - .04 + .38 * t)); c.stroke(); } } }
  // arched moonlit window above the landing
  { const [x, y, w, h] = R.backRect(-1.0, 2.6, 1.0, 4.1); c.save(); c.beginPath(); c.moveTo(x, y + h); c.lineTo(x, y + w / 2); c.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w, y + h); c.closePath(); const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1a2a50'); g.addColorStop(1, '#4a5a8a'); c.fillStyle = g; c.fill(); c.clip(); c.fillStyle = '#f4f0dc'; c.beginPath(); c.arc(x + w * .7, y + w * .45, 26, 0, 7); c.fill(); glow(c, x + w * .7, y + w * .45, 160, '#c8d8ff', .4);
    c.strokeStyle = '#2a1810'; c.lineWidth = 8; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x + w * k / 4, y); c.lineTo(x + w * k / 4, y + h); c.stroke(); } for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x, y + h * k / 4 + 30); c.lineTo(x + w, y + h * k / 4 + 30); c.stroke(); } c.restore(); c.strokeStyle = '#c8a050'; c.lineWidth = 10; c.beginPath(); c.moveTo(x, y + h); c.lineTo(x, y + w / 2); c.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w, y + h); c.stroke(); }
  // portraits: ornate gilt frames with painted sitters
  const sitter = (x, y, w, h, bg, coat, hair, skin) => { const g = c.createRadialGradient(x + w / 2, y + h * .35, 10, x + w / 2, y + h / 2, h); g.addColorStop(0, shade(hex(bg), 30) ? rgb(shade(hex(bg), .25)) : bg); g.addColorStop(1, rgb(shade(hex(bg), -.45))); c.fillStyle = g; c.fillRect(x, y, w, h);
    c.fillStyle = coat; c.beginPath(); c.moveTo(x + w * .08, y + h); c.quadraticCurveTo(x + w * .14, y + h * .62, x + w * .5, y + h * .58); c.quadraticCurveTo(x + w * .86, y + h * .62, x + w * .92, y + h); c.fill(); c.fillStyle = '#e8e0d0'; c.beginPath(); c.moveTo(x + w * .42, y + h * .6); c.lineTo(x + w * .5, y + h * .78); c.lineTo(x + w * .58, y + h * .6); c.fill();
    c.fillStyle = skin; c.beginPath(); c.ellipse(x + w * .5, y + h * .4, w * .16, h * .15, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(80,40,30,.25)'; c.beginPath(); c.ellipse(x + w * .55, y + h * .43, w * .1, h * .1, 0, 0, 7); c.fill(); c.fillStyle = hair; c.beginPath(); c.ellipse(x + w * .5, y + h * .3, w * .18, h * .08, 0, Math.PI, 0); c.fill();
    c.fillStyle = 'rgba(30,20,20,.7)'; c.fillRect(x + w * .44, y + h * .38, w * .03, h * .02); c.fillRect(x + w * .53, y + h * .38, w * .03, h * .02); };
  const gilt = (x, y, w, h) => { for (let k = 0; k < 4; k++) { c.strokeStyle = ['#7a5a20', '#e8c060', '#a8802a', '#f4dc8a'][k]; c.lineWidth = [26, 12, 6, 2][k]; c.strokeRect(x - 13 + k * 3, y - 13 + k * 3, w + 26 - k * 6, h + 26 - k * 6); } for (const [cx, cy] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) { c.fillStyle = '#e8c060'; c.beginPath(); c.arc(cx, cy, 14, 0, 7); c.fill(); } c.fillStyle = '#c8a050'; c.fillRect(x + w / 2 - 50, y + h + 18, 100, 16); };
  for (const [x0, bg, coat, hair, skin] of [[-4.6, '#3a5a7a', '#1a1a24', '#3a2a1a', '#e8c8a8'], [3.4, '#6a4a2a', '#3a1a1a', '#8a8a8a', '#e0bca0']]) { const [x, y, w, h] = R.backRect(x0, 1.4, x0 + 1.2, 3.0); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 14, y + 18, w + 10, h + 10); sitter(x, y, w, h, bg, coat, hair, skin); gilt(x, y, w, h); R.lampGlow(x0 + .6, 3.2, ZB, 500, '#ffd890', .18); }
  for (const x0 of [-2.9, 2.0]) { const [x, y, w, h] = R.backRect(x0, 2.1, x0 + .9, 2.8); const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#8aa0b8'); g.addColorStop(.6, '#c8b088'); g.addColorStop(1, '#4a5a3a'); c.fillStyle = g; c.fillRect(x, y, w, h); c.fillStyle = '#3a4a2a'; c.beginPath(); c.moveTo(x, y + h * .7); c.quadraticCurveTo(x + w * .4, y + h * .45, x + w, y + h * .65); c.lineTo(x + w, y + h); c.lineTo(x, y + h); c.fill(); gilt(x, y, w, h); }
  // sconces
  for (const x0 of [-3.4, -1.5, 1.5, 3.0]) { const [sx, sy] = P(x0 + (x0 < 0 ? 0 : .1), 2.0, ZB); c.fillStyle = '#c8a050'; c.fillRect(sx - 4, sy, 8, 40); c.beginPath(); c.ellipse(sx, sy, 22, 6, 0, 0, 7); c.fill(); c.fillStyle = '#fff4d0'; c.beginPath(); c.ellipse(sx, sy - 16, 6, 14, 0, 0, 7); c.fill(); glow(c, sx, sy - 16, 240, '#ffd080', .4); }
  // landing + gallery balustrade
  const step = 13, zS = 6.0, zL = 8.4, yL = 2.3;
  { const pts = [P(-2.3, yL, zL), P(2.3, yL, zL), P(2.3, yL, ZB), P(-2.3, yL, ZB)]; quad(pts, '#4a2c1a'); for (const sd of [-1, 1]) quad([P(sd * 1.95, yL, zL), P(sd * 2.3, yL, zL), P(sd * 2.3, 0, zL), P(sd * 1.95, 0, zL)], '#2e1a0e'); const [a, b] = P(-2.3, yL, zL), [a2, b2] = P(2.3, yL - .14, zL); c.fillStyle = '#2a160c'; c.fillRect(a, b, a2 - a, b2 - b); }
  const rail = (x0, x1, y, z0, z1, n) => { const p0 = P(x0, y + .95, z0), p1 = P(x1, y + .95, z1); for (let k = 0; k <= n; k++) { const t = k / n, bx = lerp(x0, x1, t), bz = lerp(z0, z1, t), by = typeof y === 'function' ? y(t) : y; const [a, b] = P(bx, by, bz), [, b2] = P(bx, by + .9, bz); const w = 9 * 9 / bz; c.fillStyle = '#e8dcc8'; c.beginPath(); c.moveTo(a - w * .5, b); c.quadraticCurveTo(a - w * 1.2, (b + b2) / 2, a - w * .4, b2); c.lineTo(a + w * .4, b2); c.quadraticCurveTo(a + w * 1.2, (b + b2) / 2, a + w * .5, b); c.fill(); c.fillStyle = 'rgba(80,60,40,.35)'; c.fillRect(a, b2, w * .5, b - b2); } };
  { for (let k = 0; k <= 30; k++) { const x = lerp(-2.3, 2.3, k / 30); if (Math.abs(x) < 1.75) continue; const [a, b] = P(x, yL, zL), [, b2] = P(x, yL + .9, zL); c.fillStyle = '#e8dcc8'; c.fillRect(a - 5, b2, 10, b - b2); } for (const sd of [-1, 1]) { const [a, b] = P(sd * 2.3, yL + .95, zL), [a2, b2] = P(sd * 1.75, yL + .95, zL); c.fillStyle = '#3a2010'; c.fillRect(Math.min(a, a2), b - 8, Math.abs(a2 - a), 16); } }
  // the staircase: solid steps back to front, red runner with brass rods
  const yk = k => yL * (1 - k / step), zk = k => lerp(zL, zS, k / step);
  for (let k = 0; k < step; k++) { const y0 = yk(k), y1 = yk(k + 1), z0 = zk(k), z1 = zk(k + 1);
    quad([P(-1.7, y0, z0), P(1.7, y0, z0), P(1.7, y0, z1), P(-1.7, y0, z1)], rgb(shade(hex('#7a5232'), -.05)));
    quad([P(-1.7, y0, z1), P(1.7, y0, z1), P(1.7, y1, z1), P(-1.7, y1, z1)], rgb(shade(hex('#4a2c18'), -k * .01)));
    quad([P(-1.1, y0, z0), P(1.1, y0, z0), P(1.1, y0, z1), P(-1.1, y0, z1)], '#8a1a24'); quad([P(-1.1, y0, z1), P(1.1, y0, z1), P(1.1, y1, z1), P(-1.1, y1, z1)], '#6a1018');
    for (const sd of [-1, 1]) { const [a, b] = P(sd * 1.02, y0, z1), [a2, b2] = P(sd * 1.02, y1, z1); c.fillStyle = '#e8c060'; c.fillRect(a - 2, b, 4, b2 - b); }
    const [ra, rb] = P(-1.1, y0, z1), [ra2] = P(1.1, y0, z1); c.fillStyle = '#e8c060'; c.fillRect(ra, rb - 3, ra2 - ra, 5); c.fillStyle = 'rgba(255,230,190,.2)'; const [na, nb] = P(-1.7, y0, z1), [na2] = P(1.7, y0, z1); c.fillRect(na, nb - 2, na2 - na, 3); }
  for (const sd of [-1, 1]) { quad([P(sd * 1.7, yL, zL), P(sd * 1.95, yL, zL), P(sd * 1.95, 0, zS), P(sd * 1.7, 0, zS)], '#3a2010');
    rail(sd * 1.82, sd * 1.82, t => yL * (1 - t), zL, zS, step); const a = P(sd * 1.82, yL + .95, zL), b = P(sd * 1.82, .95, zS); c.strokeStyle = '#3a2010'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); c.strokeStyle = 'rgba(255,210,150,.3)'; c.lineWidth = 4; c.beginPath(); c.moveTo(a[0], a[1] - 5); c.lineTo(b[0], b[1] - 5); c.stroke();
    const [na, nb] = P(sd * 1.82, 0, zS), [, nb2] = P(sd * 1.82, 1.15, zS); c.fillStyle = '#3a2010'; c.fillRect(na - 16, nb2, 32, nb - nb2); c.fillStyle = '#c8a050'; c.beginPath(); c.arc(na, nb2 - 10, 16, 0, 7); c.fill(); }
  // console tables, vases + flowers, grandfather clock, palms
  for (const sd of [-1, 1]) { const x = sd * 3.9, z = 8.4; const [a, b] = P(x - .6, .8, z), [a2] = P(x + .6, .8, z), [, b0] = P(x, 0, z); c.fillStyle = '#4a2a16'; c.fillRect(a, b - 10, a2 - a, 16); for (const lx of [a + 10, a2 - 18]) c.fillRect(lx, b, 8, b0 - b); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse((a + a2) / 2, b0, (a2 - a) * .6, 10, 0, 0, 7); c.fill();
    const vx = (a + a2) / 2; c.fillStyle = '#2a4a7a'; c.beginPath(); c.moveTo(vx - 20, b - 10); c.quadraticCurveTo(vx - 40, b - 60, vx - 14, b - 90); c.lineTo(vx + 14, b - 90); c.quadraticCurveTo(vx + 40, b - 60, vx + 20, b - 10); c.fill(); c.strokeStyle = '#e8e0c8'; c.lineWidth = 3; c.beginPath(); c.moveTo(vx - 28, b - 50); c.quadraticCurveTo(vx, b - 40, vx + 28, b - 50); c.stroke();
    for (let f = 0; f < 14; f++) { const R2 = r.range(-1, 1), ang = -Math.PI / 2 + R2 * .9, L = 50 + r.range(0, 50); const fx = vx + Math.cos(ang) * L, fy = b - 90 + Math.sin(ang) * L; c.strokeStyle = '#2a5a2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(vx, b - 88); c.lineTo(fx, fy); c.stroke(); c.fillStyle = ['#e84a5a', '#f4e0e8', '#e8c040', '#c83a6a'][f % 4]; c.beginPath(); c.arc(fx, fy, 9, 0, 7); c.fill(); }
    const [ca, cb] = P(x - .6, 1.5, z), [cc] = P(x + .6, 1.5, z); c.fillStyle = '#e8c060'; for (const cx of [ca + 20, cc - 20]) { c.fillRect(cx - 3, b - 60, 6, 50); c.fillStyle = '#fff4d0'; c.beginPath(); c.ellipse(cx, b - 70, 4, 10, 0, 0, 7); c.fill(); glow(c, cx, b - 70, 120, '#ffd080', .35); c.fillStyle = '#e8c060'; } }
  { const z = 5.0, x = -5.2; const [a, b] = P(x, 2.3, z), [a2, b2] = P(x + .35, 0, z); c.fillStyle = '#3a1e10'; c.fillRect(a, b, a2 - a, b2 - b); c.fillStyle = '#f4ecd8'; c.beginPath(); c.arc((a + a2) / 2, b + (a2 - a) * .7, (a2 - a) * .38, 0, 7); c.fill(); c.strokeStyle = '#231A24'; c.lineWidth = 4; c.beginPath(); c.moveTo((a + a2) / 2, b + (a2 - a) * .7); c.lineTo((a + a2) / 2, b + (a2 - a) * .45); c.moveTo((a + a2) / 2, b + (a2 - a) * .7); c.lineTo((a + a2) / 2 + 20, b + (a2 - a) * .75); c.stroke(); c.strokeStyle = '#c8a050'; c.lineWidth = 3; c.beginPath(); c.moveTo((a + a2) / 2, b + (a2 - a) * 1.1); c.lineTo((a + a2) / 2, b + (a2 - a) * 2.2); c.stroke(); c.fillStyle = '#c8a050'; c.beginPath(); c.arc((a + a2) / 2, b + (a2 - a) * 2.25, 14, 0, 7); c.fill(); }
  // chandelier: three tiers, candles, crystal drops
  { const [cx, cy] = P(0, 3.55, 6.2); c.strokeStyle = '#2a2a2a'; c.lineWidth = 5; c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, cy); c.stroke();
    for (const [rw, ry, dy, n] of [[230, 40, 30, 12], [160, 28, -20, 9], [90, 18, -60, 6]]) { c.strokeStyle = '#c8a050'; c.lineWidth = 7; c.beginPath(); c.ellipse(cx, cy + dy, rw, ry, 0, 0, 7); c.stroke();
      for (let k = 0; k < n; k++) { const a = k / n * 6.283, lx = cx + Math.cos(a) * rw, ly = cy + dy + Math.sin(a) * ry; c.fillStyle = '#f4ecd8'; c.fillRect(lx - 4, ly - 26, 8, 26); c.fillStyle = '#fff2b0'; c.beginPath(); c.ellipse(lx, ly - 34, 5, 10, 0, 0, 7); c.fill(); for (let d = 0; d < 3; d++) { c.fillStyle = 'rgba(220,240,255,.8)'; c.beginPath(); c.moveTo(lx, ly + 8 + d * 14); c.lineTo(lx + 4, ly + 14 + d * 14); c.lineTo(lx, ly + 20 + d * 14); c.lineTo(lx - 4, ly + 14 + d * 14); c.fill(); } } }
    glow(c, cx, cy, 900, '#ffd890', .35); }
  // Persian rug from the stair foot toward the camera
  { const pts = [P(-2.4, 0, 5.6), P(2.4, 0, 5.6), P(2.4, 0, 1.6), P(-2.4, 0, 1.6)]; quad(pts, '#7a1a22'); const inner = [P(-2.1, 0, 5.4), P(2.1, 0, 5.4), P(2.1, 0, 1.6), P(-2.1, 0, 1.6)]; c.strokeStyle = '#d8a850'; c.lineWidth = 10; poly(c, inner); c.stroke(); const inner2 = [P(-1.8, 0, 5.2), P(1.8, 0, 5.2), P(1.8, 0, 1.6), P(-1.8, 0, 1.6)]; quad(inner2, '#1a2a4a');
    for (let z = 5.0; z > 1.7; z -= .45) for (let x = -1.5; x <= 1.5; x += .75) { const [a, b] = P(x, 0, z); const s = 9 / z; c.fillStyle = (Math.round(z * 2 + x * 2) % 2) ? '#c84a3a' : '#d8a850'; c.beginPath(); c.moveTo(a, b - 12 * s); c.lineTo(a + 26 * s, b); c.lineTo(a, b + 12 * s); c.lineTo(a - 26 * s, b); c.closePath(); c.fill(); }
    for (let z = 5.5; z > 1.6; z -= .18) { const [a, b] = P(-2.25, 0, z), [a2] = P(2.25, 0, z); c.fillStyle = 'rgba(232,200,120,.35)'; c.fillRect(a, b - 1, 6, 2); c.fillRect(a2 - 6, b - 1, 6, 2); } }
  // floor sheen + warm light pools
  { const [fx, fy] = P(0, 0, 5.2); glow(c, fx, fy, 900, '#ffd8a0', .18); R.lampGlow(-3.9, 1.2, 8.4, 300, '#ffd080', .25); R.lampGlow(3.9, 1.2, 8.4, 300, '#ffd080', .25); }
  finish(c, r, W, H, { oil: 4, grain: 9, vig: .55 });
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
