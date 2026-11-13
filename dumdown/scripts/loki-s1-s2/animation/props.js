// Loki parody props, drawn on the world canvas (call after apply(cam)). All original designs.
(function () {
const { ctx, clamp, lerp, io } = window.E;
const INK = '#231A24';
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function glow(x, y, r, col, a) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
const P = {};
// Miss Minutes: our own orange alarm-clock mascot with a face, stick arms and boots
P.missMinutes = (o, lt) => { const { x, y, s = 1 } = o, b = Math.sin(lt * 5) * 6, wave = Math.sin(lt * 8) * .5; ctx.save(); ctx.translate(x, y + b); ctx.scale(s, s);
  glow(0, -120, 220, 'rgba(255,150,40,A)', .35);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-30, -40); ctx.lineTo(-40, 20); ctx.moveTo(30, -40); ctx.lineTo(40, 20); ctx.stroke(); ctx.fillStyle = '#ffffff'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 46, 26, 22, 12, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(-90, -130); ctx.quadraticCurveTo(-150, -150 + wave * 40, -170, -200 + wave * 80); ctx.moveTo(90, -130); ctx.quadraticCurveTo(150, -110, 165, -60); ctx.stroke();
  for (const [hx, hy] of [[-170, -200 + wave * 80], [165, -60]]) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(hx, hy, 18, 0, 7); ctx.fill(); ctx.stroke(); }
  // bells
  ctx.fillStyle = '#ff9a2a'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 70, -230, 34, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = '#ff8a1a'; ctx.beginPath(); ctx.arc(0, -130, 105, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff4e0'; ctx.beginPath(); ctx.arc(0, -130, 82, 0, 7); ctx.fill(); ctx.lineWidth = 4; ctx.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 70, -130 + Math.sin(a) * 70); ctx.lineTo(Math.cos(a) * 78, -130 + Math.sin(a) * 78); ctx.stroke(); }
  // face: big eyes, smile (mood)
  const mood = o.mood || 'happy'; ctx.fillStyle = INK; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 28, -150, 11, mood === 'mad' ? 8 : 17, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx * 28 + 4, -156, 4, 0, 7); ctx.fill(); ctx.fillStyle = INK; }
  if (mood === 'mad') { ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-44, -178); ctx.lineTo(-12, -166); ctx.moveTo(44, -178); ctx.lineTo(12, -166); ctx.stroke(); }
  ctx.lineWidth = 5; ctx.beginPath(); if (mood === 'mad') ctx.arc(0, -88, 22, Math.PI * 1.15, Math.PI * 1.85); else ctx.arc(0, -118, 30, .2, Math.PI - .2); ctx.stroke();
  ctx.fillStyle = 'rgba(255,120,120,.5)'; ctx.beginPath(); ctx.arc(-52, -112, 12, 0, 7); ctx.arc(52, -112, 12, 0, 7); ctx.fill();
  ctx.restore(); };
// old CRT TV, optional content drawer
P.tv = (o, lt, inner) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#8a6a42'; ctx.strokeStyle = INK; ctx.lineWidth = 6; rr(-260, -380, 520, 380, 30); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#0e1a14'; rr(-220, -345, 360, 300, 40); ctx.fill(); ctx.stroke();
  ctx.save(); rr(-220, -345, 360, 300, 40); ctx.clip(); ctx.fillStyle = '#e8c070'; ctx.fillRect(-220, -345, 360, 300); if (inner) inner(-40, -195); for (let yy = -345; yy < -45; yy += 6) { ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-220, yy, 360, 3); } ctx.restore();
  ctx.fillStyle = '#c9a046'; for (const k of [0, 1]) { ctx.beginPath(); ctx.arc(200, -290 + k * 90, 20, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); };
// Alligator Loki: green gator with a tiny horned crown
P.gator = (o, lt) => { const { x, y, s = 1, dir = 1 } = o, ch = Math.max(0, Math.sin(lt * 3)) * .25; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 6, 260, 26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#4a7a3a'; ctx.beginPath(); ctx.moveTo(-320, -20); ctx.quadraticCurveTo(-150, -80, 40, -90); ctx.lineTo(120, -80); ctx.lineTo(260, -60 - ch * 60); ctx.lineTo(280, -40); ctx.lineTo(140, -36); ctx.lineTo(270, -20 + ch * 30); ctx.lineTo(250, -4); ctx.lineTo(40, 0); ctx.quadraticCurveTo(-150, 6, -320, -20); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#6a9a4a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); const bx = -240 + i * 34; ctx.moveTo(bx, -54 + i * -3); ctx.lineTo(bx + 14, -76 - i * 3); ctx.lineTo(bx + 28, -58 - i * 3); ctx.fill(); ctx.stroke(); }
  for (const lx of [-140, -20, 60]) { ctx.fillStyle = '#3a6a2a'; ctx.fillRect(lx, -10, 28, 16); ctx.strokeRect(lx, -10, 28, 16); }
  ctx.fillStyle = '#f4f0c0'; ctx.beginPath(); ctx.arc(120, -86, 16, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(124, -86, 4, 11, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(150 + i * 22, -38); ctx.lineTo(160 + i * 22, -26); ctx.lineTo(170 + i * 22, -38); ctx.fill(); }
  // crown
  ctx.fillStyle = '#d9a520'; ctx.beginPath(); ctx.moveTo(84, -96); ctx.lineTo(150, -96); ctx.lineTo(146, -110); ctx.lineTo(88, -110); ctx.closePath(); ctx.fill(); ctx.stroke(); for (const hx of [92, 140]) { ctx.beginPath(); ctx.moveTo(hx - 6, -108); ctx.quadraticCurveTo(hx + (hx < 120 ? -26 : 26), -140, hx + (hx < 120 ? -12 : 12), -176); ctx.quadraticCurveTo(hx + (hx < 120 ? -8 : 8), -140, hx + 6, -108); ctx.fill(); ctx.stroke(); }
  ctx.restore(); };
// Tesseract: glowing blue cube
P.cube = (o, lt) => { const { x, y, s = 1 } = o; glow(x, y, 220 * s, 'rgba(80,180,255,A)', .7); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(lt * .6); ctx.fillStyle = 'rgba(120,220,255,.85)'; ctx.strokeStyle = '#e8fbff'; ctx.lineWidth = 4; ctx.fillRect(-40, -40, 80, 80); ctx.strokeRect(-40, -40, 80, 80); ctx.strokeRect(-24, -56, 80, 80); ctx.restore(); };
// TemPad: brass time tablet with an orange screen
P.tempad = (o, lt) => { const { x, y, s = 1, rot = 0 } = o; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#7a5a32'; ctx.strokeStyle = INK; ctx.lineWidth = 4; rr(-40, -60, 80, 120, 10); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff8a2a'; ctx.fillRect(-30, -50, 60, 70); glow(0, -15, 60, 'rgba(255,150,60,A)', .5); ctx.restore(); };
// Time door: glowing orange rectangle portal
P.door = (o, lt) => { const { x, y, s = 1, k = 1 } = o, w = 260 * s * k, h = 520 * s; glow(x, y - h / 2, 500 * s * k, 'rgba(255,140,40,A)', .6); ctx.save(); ctx.fillStyle = `rgba(255,190,90,${.9 * k})`; ctx.fillRect(x - w / 2, y - h, w, h); ctx.strokeStyle = `rgba(255,240,200,${k})`; ctx.lineWidth = 8; ctx.strokeRect(x - w / 2, y - h, w, h); for (let i = 0; i < 6; i++) { ctx.strokeStyle = `rgba(255,255,255,${.3 * k})`; ctx.lineWidth = 3; const yy = y - ((lt * 300 + i * 90) % h); ctx.beginPath(); ctx.moveTo(x - w / 2, yy); ctx.lineTo(x + w / 2, yy); ctx.stroke(); } ctx.restore(); };
// Baton (prune stick) in a hand position
P.baton = (o, lt) => { const { x, y, rot = -.6, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#3a2a1a'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.fillRect(-8, -110, 16, 130); ctx.strokeRect(-8, -110, 16, 130); ctx.fillStyle = '#ff8a2a'; ctx.fillRect(-10, -130, 20, 26); glow(0, -118, 60, 'rgba(255,140,40,A)', .7); ctx.restore(); };
// Alioth: storm cloud monster with a red glow maw
P.alioth = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 40; i++) { const a = i * 2.4, rr2 = 120 + (i % 7) * 50, px = Math.cos(a + lt * .2) * rr2 * 1.6, py = Math.sin(a + lt * .15) * rr2 * .7; const g = ctx.createRadialGradient(px, py, 0, px, py, 200); g.addColorStop(0, `rgba(${90 + i % 3 * 20},40,${120 + i % 4 * 20},.55)`); g.addColorStop(1, 'rgba(40,10,60,0)'); ctx.fillStyle = g; ctx.fillRect(px - 200, py - 200, 400, 400); }
  glow(0, 40, 260, 'rgba(255,60,60,A)', .5 + .3 * Math.sin(lt * 4));
  for (let k = 0; k < 4; k++) { if (((lt * 7 + k * 3) | 0) % 5) continue; ctx.strokeStyle = 'rgba(255,220,255,.9)'; ctx.lineWidth = 5; ctx.beginPath(); let px = (k - 1.5) * 200, py = -200; ctx.moveTo(px, py); for (let j = 0; j < 6; j++) { px += (Math.sin(j * 9 + k) * 60); py += 60; ctx.lineTo(px, py); } ctx.stroke(); }
  ctx.restore(); };
// Infinity stones in an open drawer
P.drawer = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#6a4a2a'; ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.fillRect(-300, -60, 600, 120); ctx.strokeRect(-300, -60, 600, 120); ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-280, -50, 560, 80);
  ['#3a6aff', '#ff3a3a', '#ffd23a', '#3aff6a', '#ff8a2a', '#b84aff'].forEach((c, i) => { const sx = -220 + i * 88, sy = -8 + Math.sin(i * 2) * 8; glow(sx, sy, 70, c.replace('#', 'rgba(').length ? `rgba(${parseInt(c.slice(1, 3), 16)},${parseInt(c.slice(3, 5), 16)},${parseInt(c.slice(5, 7), 16)},A)` : '', .7); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(sx, sy - 22); ctx.lineTo(sx + 16, sy); ctx.lineTo(sx, sy + 22); ctx.lineTo(sx - 16, sy); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  ctx.fillStyle = '#c8c8d0'; ctx.fillRect(170, -40, 80, 26); ctx.strokeRect(170, -40, 80, 26); ctx.restore(); };
// Branch timelines in the sky (k = branching amount 0..1)
P.branches = (o, lt) => { const { y = 300, k = 1 } = o; ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 1 + k * 40; i++) { const r = Math.sin(i * 91.7) * .5 + .5, y0 = y + Math.sin(i * 13.1) * 120 * k; ctx.strokeStyle = `rgba(${i ? 255 : 120},${i ? 200 : 255},${i ? 90 : 150},${i ? .5 : .9})`; ctx.lineWidth = i ? 3 : 10; ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(800, y, 1200 + r * 400, y0, 2560, y0 + Math.sin(i * 7 + lt) * 200 * k); ctx.stroke(); } ctx.restore(); };
// Fast-food counter tray + soft serve
P.softServe = (o) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.fillStyle = '#d8a050'; ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.lineTo(0, 70); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff8ec'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(0, -14 - i * 22, 32 - i * 8, 16, 0, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); };
// Puffy radiation suit overlay drawn as a white blob body around a figure point
P.suit = (o) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#e8e4d8'; ctx.strokeStyle = INK; ctx.lineWidth = 6; rr(-80, -300, 160, 200, 60); ctx.fill(); ctx.stroke(); rr(-70, -110, 60, 110, 26); ctx.fill(); ctx.stroke(); rr(10, -110, 60, 110, 26); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(200,230,255,.6)'; ctx.beginPath(); ctx.arc(0, -360, 70, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff8a2a'; ctx.fillRect(-60, -250, 120, 20); ctx.restore(); };
window.PROPS = P;
})();
// Yggdrasil: glowing tree of timelines growing from (x,y), k = growth 0..1
P.tree = (o, lt) => { const { x = 1280, y = 1300, k = 1 } = o; ctx.save(); ctx.lineCap = 'round'; ctx.globalCompositeOperation = 'lighter';
  const br = (x0, y0, a, len, w, d, seed) => { if (d > 7 || len < 8) return; const g = Math.min(1, Math.max(0, k * 8 - d)); if (g <= 0) return; const sw = Math.sin(lt * .8 + seed) * .04; const x1 = x0 + Math.cos(a + sw) * len * g, y1 = y0 + Math.sin(a + sw) * len * g;
    ctx.strokeStyle = `rgba(${120 + d * 15},255,${150 + d * 10},${.85 - d * .07})`; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1) / 2 + Math.sin(seed) * len * .15, (y0 + y1) / 2, x1, y1); ctx.stroke();
    if (g >= 1) { const n = 2 + ((seed * 7 | 0) % 2); for (let i = 0; i < n; i++) { const s2 = seed * 3.1 + i * 1.7; br(x1, y1, a + (i - (n - 1) / 2) * .55 + Math.sin(s2) * .15, len * (.72 + .08 * Math.sin(s2 * 2)), w * .68, d + 1, s2); } } };
  br(x, y, -Math.PI / 2, 260, 34, 0, 1.3);
  // roots
  for (let i = 0; i < 7; i++) { ctx.strokeStyle = 'rgba(120,255,160,.5)'; ctx.lineWidth = 8 - i * .6; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + (i - 3) * 120, y + 60, x + (i - 3) * 260 * k, y + 120); ctx.stroke(); }
  ctx.restore(); };
