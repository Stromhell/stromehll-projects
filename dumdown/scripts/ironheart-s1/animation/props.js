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

// Time-Keeper: our own robed lizard-headed statue-god (three of them on the keepers plate)
P.keeper = (o, lt) => { const { x, y, s = 1, ph = 0 } = o; ctx.save(); ctx.translate(x, y + Math.sin(lt * 1.3 + ph) * 6); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  // robe
  const g = ctx.createLinearGradient(0, -560, 0, 0); g.addColorStop(0, '#b88a2c'); g.addColorStop(1, '#5a3a12'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-70, -560); ctx.lineTo(70, -560); ctx.lineTo(170, 0); ctx.lineTo(-170, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#e2b84a'; ctx.beginPath(); ctx.moveTo(-18, -560); ctx.lineTo(18, -560); ctx.lineTo(30, 0); ctx.lineTo(-30, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  // collar + shoulders
  ctx.fillStyle = '#d8a83a'; ctx.beginPath(); ctx.ellipse(0, -555, 120, 40, 0, 0, 7); ctx.fill(); ctx.stroke();
  // lizard head (side-ish snout), green scales; o.hy/o.hr pop the head off on a spring (robot reveal)
  const hy = o.hy || 0, hr = o.hr || 0; if (hy) { ctx.strokeStyle = '#8a8a90'; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const yy = -570 - i * hy / 12; ctx.lineTo((i % 2 ? -18 : 18), yy); } ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 7; }
  ctx.save(); ctx.translate(0, -hy - 650); ctx.rotate(hr); ctx.translate(0, 650);
  ctx.fillStyle = '#4f7a3a'; ctx.beginPath(); ctx.moveTo(-60, -590); ctx.quadraticCurveTo(-70, -720, 0, -740); ctx.quadraticCurveTo(70, -735, 80, -680); ctx.lineTo(150, -650); ctx.quadraticCurveTo(160, -615, 120, -605); ctx.lineTo(55, -592); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#6f9a4a'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-30 + i * 14, -700 + (i % 2) * 18, 7, 0, 7); ctx.fill(); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(60, -622); ctx.lineTo(140, -632); ctx.stroke();
  // eye (glowing)
  ctx.fillStyle = '#ffe27a'; ctx.beginPath(); ctx.ellipse(35, -680, 16, 12, 0, 0, 7); ctx.fill(); ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = INK; ctx.fillRect(32, -690, 6, 20);
  glow(35, -680, 70, 'rgba(255,220,120,A)', .45 + .15 * Math.sin(lt * 3 + ph));
  // crown spikes
  ctx.fillStyle = '#e2b84a'; ctx.lineWidth = 5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(-14 + i * 22, -735); ctx.lineTo(-4 + i * 22, -790 - (2 - Math.abs(i)) * 14); ctx.lineTo(6 + i * 22, -735); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore(); ctx.restore(); };
// Judge's high bench: wooden desk with a gold seal, drawn in FRONT of the judge
P.bench = (o, lt) => { const { x, y, s = 1, w = 520, h = 300 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 7;
  const g = ctx.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, '#7a5230'); g.addColorStop(1, '#3a2414'); ctx.fillStyle = g; rr(-w / 2, -h, w, h, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#9a6a3a'; rr(-w / 2 - 20, -h - 26, w + 40, 34, 8); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(35,26,36,.5)'; ctx.lineWidth = 4; for (const k of [-1, 1]) { rr(k * w / 4 - 80, -h + 50, 160, h - 90, 8); ctx.stroke(); }
  ctx.fillStyle = '#c9a046'; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -h / 2 + 10, 46, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#4a3018'; ctx.beginPath(); ctx.arc(0, -h / 2 + 10, 26, 0, 7); ctx.fill();
  ctx.restore(); };
// Old passenger plane (side view, nose right) for the 1971 skyjack gag
P.plane = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineJoin = 'round';
  ctx.fillStyle = '#c8ccd6'; ctx.beginPath(); ctx.moveTo(-520, -60); ctx.lineTo(-640, -230); ctx.lineTo(-560, -230); ctx.lineTo(-440, -70); ctx.closePath(); ctx.fill(); ctx.stroke();
  const g = ctx.createLinearGradient(0, -90, 0, 90); g.addColorStop(0, '#f4f6fa'); g.addColorStop(1, '#a8aebc'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-600, -40); ctx.lineTo(380, -80); ctx.quadraticCurveTo(560, -70, 600, 10); ctx.quadraticCurveTo(560, 80, 380, 80); ctx.lineTo(-560, 50); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3a5a9a'; ctx.fillRect(-560, 0, 940, 18); ctx.fillStyle = '#c23a2a'; ctx.fillRect(-560, 20, 940, 8);
  ctx.fillStyle = '#2a3a5a'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(-420 + i * 56, -30, 13, 17, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#2a3a5a'; ctx.beginPath(); ctx.moveTo(470, -55); ctx.lineTo(560, -30); ctx.lineTo(500, -20); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#1a1a22'; rr(-470, -45, 70, 100, 6); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#b8bcc8'; ctx.beginPath(); ctx.moveTo(-60, 30); ctx.lineTo(180, 30); ctx.lineTo(60, 200); ctx.lineTo(-40, 200); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#9aa0ae'; rr(40, 70, 90, 40, 18); ctx.fill(); ctx.stroke();
  ctx.restore(); };

// ---------- Deadpool 2 parody props (original designs, no logos) ----------
const rrf = (x, y, w, h, r, f, st = INK, lw = 5) => { rr(x, y, w, h, r); if (f) { ctx.fillStyle = f; ctx.fill(); } if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.stroke(); } };
P.barrels = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const pos = [[-180, 0], [0, 0], [180, 0], [-90, -175], [90, -175], [0, -350]];
  for (const [bx, by] of pos) { ctx.save(); ctx.translate(bx, by); rrf(-70, -170, 140, 170, 14, '#c8301a'); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-48, -160, 16, 150); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.strokeRect(-70, -120, 140, 8); ctx.strokeRect(-70, -52, 140, 8);
    ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.moveTo(0, -104); ctx.lineTo(24, -66); ctx.lineTo(-24, -66); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } ctx.restore(); };
P.token = (o, lt) => { const { x, y, s = 1 } = o, spin = o.spin ? Math.cos(lt * o.spin) : 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * Math.max(.08, Math.abs(spin)), s); glow(0, 0, 90, 'rgba(255,220,120,A)', .5);
  ctx.beginPath(); ctx.arc(0, 0, 38, 0, 7); ctx.fillStyle = '#e8b030'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 27, 0, 7); ctx.strokeStyle = '#a87a14'; ctx.lineWidth = 4; ctx.stroke();
  ctx.fillStyle = '#7a5a10'; ctx.font = '900 22px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SKEE', 0, 1); ctx.restore(); };
P.collar = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 60, 22, 0, 0, 7); ctx.strokeStyle = INK; ctx.lineWidth = 22; ctx.stroke(); ctx.strokeStyle = '#7a828e'; ctx.lineWidth = 14; ctx.stroke();
  const on = Math.sin(lt * 6) > 0; glow(0, 22, 40, `rgba(${o.red ? '255,60,60' : '80,200,255'},A)`, on ? .8 : .4); ctx.fillStyle = o.red ? '#ff3a3a' : '#5ad0ff'; ctx.beginPath(); ctx.arc(0, 22, 9, 0, 7); ctx.fill(); ctx.restore(); };
P.swords = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const a of [-.5, .5]) { ctx.save(); ctx.rotate(a + (o.swing ? Math.sin(lt * 9) * .5 : 0)); ctx.fillStyle = '#dfe6ee'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.lineTo(4, -300); ctx.lineTo(0, -320); ctx.lineTo(-4, -300); ctx.closePath(); ctx.fill(); ctx.stroke(); rrf(-26, -4, 52, 12, 4, '#1a1418', INK, 3); rrf(-7, 8, 14, 60, 4, '#3a2a2a', INK, 3); ctx.restore(); } ctx.restore(); };
P.gun = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s); rrf(-20, -18, 240, 36, 6, '#4a5260'); rrf(-60, -30, 90, 60, 10, '#3a4030'); rrf(-50, 20, 30, 70, 6, '#2a2a24'); rrf(200, -10, 60, 20, 4, '#2a2a30');
  ctx.fillStyle = '#ffd23d'; ctx.fillRect(40, -6, 120, 6); if (o.fire && lt % .5 < .12) { glow(280, 0, 120, 'rgba(255,200,80,A)', .9); ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.moveTo(262, 0); ctx.lineTo(360, -30); ctx.lineTo(340, 0); ctx.lineTo(360, 30); ctx.closePath(); ctx.fill(); } ctx.restore(); };
P.teddy = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c = o.clean ? '#b8875a' : '#7a6650';
  for (const [ex, ey] of [[-34, -118], [34, -118]]) { ctx.beginPath(); ctx.arc(ex, ey, 18, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -40, 46, 52, 0, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -100, 38, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-12, -104, 4, 0, 7); ctx.arc(12, -104, 4, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(0, -90, 6, 0, 7); ctx.fill(); if (!o.clean) { ctx.fillStyle = 'rgba(40,30,20,.35)'; ctx.beginPath(); ctx.arc(-18, -30, 14, 0, 7); ctx.arc(20, -60, 10, 0, 7); ctx.fill(); } ctx.restore(); };
P.device = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrf(-70, -40, 140, 80, 14, '#5a6270'); for (let i = 0; i < 2; i++) { const on = i < (o.charges ?? 2); ctx.fillStyle = on ? '#ffd23d' : '#2a2a30'; ctx.beginPath(); ctx.arc(-25 + i * 50, 0, 18, 0, 7); ctx.fill(); ctx.stroke(); if (on) glow(-25 + i * 50, 0, 50, 'rgba(255,210,60,A)', .6); } ctx.restore(); };
P.bag = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#c8c0a8'; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-80, 0); ctx.quadraticCurveTo(-100, -140, -30, -170); ctx.lineTo(30, -170); ctx.quadraticCurveTo(100, -140, 80, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-30, -170); ctx.quadraticCurveTo(0, -200, 30, -170); ctx.stroke(); ctx.fillStyle = '#c3202c'; ctx.beginPath(); ctx.arc(10, -40, 16, 0, 7); ctx.fill(); ctx.restore(); };
P.boom = (o, lt) => { const { x, y, s = 1 } = o, k = o.k ?? 1; ctx.save(); ctx.translate(x, y); ctx.scale(s * (0.3 + k), s * (0.3 + k)); glow(0, 0, 600, 'rgba(255,160,60,A)', .9 * (1 - k * .5));
  for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283 + lt, r = 160 + 80 * Math.sin(i * 3.1 + lt * 4); ctx.fillStyle = i % 2 ? '#ffd23d' : '#ff6a1a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.lineTo(Math.cos(a + .2) * r * .6, Math.sin(a + .2) * r * .6); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.fill(); for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(60,40,40,.6)'; ctx.beginPath(); ctx.arc(Math.cos(i) * 220 * k, -120 * k - i * 20, 70, 0, 7); ctx.fill(); } ctx.restore(); };
P.limb = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.rotate(lt * (o.spinR ?? 3)); ctx.scale(s, s); rrf(-18, -70, 36, 140, 16, '#b81c28'); rrf(-20, 52, 40, 36, 12, '#1a1418'); if (o.thumb) { rrf(14, 40, 18, 30, 8, '#1a1418'); } ctx.restore(); };
P.cab = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 0, 330, 30, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-320, -40); ctx.lineTo(-300, -140); ctx.lineTo(-160, -150); ctx.lineTo(-100, -250); ctx.lineTo(140, -250); ctx.lineTo(220, -150); ctx.lineTo(320, -130); ctx.lineTo(330, -40); ctx.closePath(); ctx.fillStyle = '#ffc81e'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#9ac8e8'; ctx.beginPath(); ctx.moveTo(-140, -150); ctx.lineTo(-90, -230); ctx.lineTo(10, -230); ctx.lineTo(10, -150); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -150); ctx.lineTo(30, -230); ctx.lineTo(130, -230); ctx.lineTo(195, -150); ctx.closePath(); ctx.fill(); ctx.stroke();
  rrf(-50, -290, 110, 40, 6, '#231A24'); ctx.fillStyle = '#ffd23d'; ctx.font = '900 26px Inter'; ctx.textAlign = 'center'; ctx.save(); ctx.scale(o.dir || 1, 1); ctx.fillText('TAXI', 5 * (o.dir || 1), -262); ctx.restore(); ctx.fillStyle = '#231A24'; for (let i = 0; i < 8; i++) ctx.fillRect(-300 + i * 76, -100, 38, 20);
  for (const wx of [-200, 210]) { ctx.save(); ctx.translate(wx, -30); ctx.rotate(lt * (o.roll ?? 0)); ctx.fillStyle = '#141418'; ctx.beginPath(); ctx.arc(0, 0, 62, 0, 7); ctx.fill(); ctx.fillStyle = '#9a9aa0'; ctx.beginPath(); ctx.arc(0, 0, 26, 0, 7); ctx.fill(); ctx.fillStyle = '#5a5a60'; ctx.fillRect(-4, -26, 8, 52); ctx.restore(); } ctx.restore(); };
P.truck = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 0, 520, 36, 0, 0, 7); ctx.fill();
  rrf(-500, -420, 720, 380, 16, '#3a4450'); rrf(240, -330, 260, 290, 30, '#2a3440'); ctx.fillStyle = '#9ac8e8'; ctx.fillRect(330, -300, 140, 110); ctx.strokeRect(330, -300, 140, 110); ctx.fillStyle = '#ffd23d'; ctx.font = '900 54px Inter'; ctx.textAlign = 'center'; ctx.fillText('ICEBOX TRANSPORT', -140, -230);
  for (let i = 0; i < 9; i++) { ctx.fillStyle = '#2a323c'; ctx.fillRect(-480 + i * 76, -400, 10, 340); } for (const wx of [-380, -120, 380]) { ctx.save(); ctx.translate(wx, -40); ctx.rotate(lt * (o.roll ?? 0)); ctx.fillStyle = '#141418'; ctx.beginPath(); ctx.arc(0, 0, 70, 0, 7); ctx.fill(); ctx.fillStyle = '#9a9aa0'; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.fill(); ctx.fillStyle = '#5a5a60'; ctx.fillRect(-4, -30, 8, 60); ctx.restore(); } ctx.restore(); };
P.fireHands = (o, lt) => { const { x, y, s = 1 } = o; for (const dx of [-1, 1]) { glow(x + dx * 60 * s, y, 160 * s, 'rgba(255,120,30,A)', .8); for (let i = 0; i < 9; i++) { const ph = lt * 9 + i * 1.3; ctx.fillStyle = i % 2 ? 'rgba(255,210,60,.8)' : 'rgba(255,90,20,.8)'; ctx.beginPath(); ctx.ellipse(x + dx * 60 * s + Math.sin(ph) * 14 * s, y - (i * 12 + (ph % 1) * 30) * s, (24 - i * 2) * s, (36 - i * 2) * s, 0, 0, 7); ctx.fill(); } } };
P.whiteboard = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrf(-420, -260, 840, 520, 10, '#f8f8f4'); ctx.fillStyle = '#231A24'; ctx.font = '800 50px Inter'; ctx.textAlign = 'left'; (o.lines || []).forEach((l, i) => { if (lt > (o.at || 0) + i * .8) { ctx.fillStyle = i ? '#2a3990' : '#e23a3a'; ctx.fillText(l, -380, -170 + i * 90); } }); ctx.restore(); };
P.tvNews = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrf(-320, -200, 640, 400, 18, '#1a1a20'); ctx.fillStyle = '#2a4a8a'; ctx.fillRect(-290, -170, 580, 300); ctx.fillStyle = '#e23a3a'; ctx.fillRect(-290, 90, 580, 46); ctx.fillStyle = '#fff'; ctx.font = '900 30px Inter'; ctx.textAlign = 'center'; ctx.fillText(o.text || 'BREAKING NEWS', 0, 124); ctx.restore(); };
P.portalRing = (o, lt) => { const { x, y, s = 1 } = o; for (let i = 0; i < 6; i++) { ctx.strokeStyle = `rgba(120,200,255,${.6 - i * .08})`; ctx.lineWidth = 14 - i * 2; ctx.beginPath(); ctx.ellipse(x, y, (180 + i * 30 + Math.sin(lt * 6 + i) * 10) * s, (60 + i * 10) * s, 0, 0, 7); ctx.stroke(); } glow(x, y, 400 * s, 'rgba(120,200,255,A)', .5); };
P.balloon = (o, lt) => { const { x, y, s = 1 } = o; ctx.save(); ctx.translate(x, y + Math.sin(lt * 2) * 10); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 90); ctx.lineTo(0, 260); ctx.stroke(); ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.arc(-60, -70, 30, 0, 7); ctx.arc(60, -70, 30, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(-32, -6, 20, 26, -.3, 0, 7); ctx.ellipse(32, -6, 20, 26, .3, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-30, -8, 6, 0, 7); ctx.arc(30, -8, 6, 0, 7); ctx.fill(); ctx.restore(); };

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
