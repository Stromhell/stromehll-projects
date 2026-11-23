// Wakanda Forever (DumDown 13) props + overlays (original designs). World-space props drawn after apply(cam).
(function () {
const E = window.E, { ctx, W, H } = E, P = window.PROPS = window.PROPS || {};
const INK = '#231A24';
function go(o, f) { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(((o.rot || 0) * Math.PI) / 180); const s = o.s ?? 1; ctx.scale(s * (o.dir || 1), s); f(); ctx.restore(); }
function rr(x, y, w, h, r, fill, lw = 5) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function ell(x, y, rx, ry, fill, lw = 5) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function ln(x1, y1, x2, y2, col, w) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
function txt(t, x, y, f, col = INK, al = 'center') { ctx.font = f; ctx.fillStyle = col; ctx.textAlign = al; ctx.textBaseline = 'alphabetic'; ctx.fillText(t, x, y); }
function poly(pts, fill, lw = 5) { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function glow(x, y, r, col, a = .5) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
// spear: long pole, silver leaf blade (held: o.on = char index; drawn upright from the hand)
P.spear = o => go(o, () => { ln(0, 260, 0, -420, INK, 16); ln(0, 260, 0, -420, '#8a5a2a', 9); rr(-10, -60, 20, 40, 4, '#c8a04a', 3); poly([[0, -560], [26, -470], [0, -410], [-26, -470]], '#d8dce8'); ln(0, -545, 0, -420, '#a8acb8', 3); });
// claw nails: five glowing purple tips around a hand
P.claws = (o, lt) => go(o, () => { for (let i = -2; i <= 2; i++) { const a = -Math.PI / 2 + i * .32; ctx.save(); ctx.rotate(a + Math.PI / 2); poly([[-5, -20], [5, -20], [0, -54]], '#b48aff', 3); ctx.restore(); } glow(0, -30, 70, 'rgba(180,140,255,A)', .35); });
// heart-shaped herb in a glass dome (o.glow 0..1)
P.herb = (o, lt) => go(o, () => { const g = o.glow ?? 1; if (g > 0) glow(0, -120, 260, 'rgba(170,110,255,A)', .55 * g); rr(-110, -20, 220, 40, 10, '#3a3a48'); ln(0, -20, 0, -110, '#2a6a3a', 8);
  ctx.beginPath(); ctx.moveTo(0, -110); ctx.bezierCurveTo(-90, -170, -60, -250, 0, -205); ctx.bezierCurveTo(60, -250, 90, -170, 0, -110); ctx.fillStyle = g > 0 ? '#a46aff' : '#6a5a7a'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke();
  if (!o.noDome) { ctx.beginPath(); ctx.ellipse(0, -130, 100, 140, 0, Math.PI, 0); ctx.lineTo(100, -20); ctx.lineTo(-100, -20); ctx.closePath(); ctx.fillStyle = 'rgba(200,230,255,.18)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,240,255,.8)'; ctx.lineWidth = 4; ctx.stroke(); } });
// GRIOT: floating hologram ring, pulses (o.talk true -> faster)
P.griot = (o, lt) => go(o, () => { const bob = Math.sin(lt * 2) * 12, sp = o.talk ? 9 : 3, k = 1 + Math.sin(lt * sp) * .06; ctx.translate(0, bob); glow(0, 0, 200, 'rgba(90,200,255,A)', .5);
  ctx.save(); ctx.scale(k, k * .45); ctx.beginPath(); ctx.arc(0, 0, 110, 0, 7); ctx.strokeStyle = '#9ae8ff'; ctx.lineWidth = 14; ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 80, lt * 2, lt * 2 + 4.5); ctx.strokeStyle = '#4ac8ff'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  for (let i = 0; i < 5; i++) { const a = lt * 1.5 + i * 1.26; ell(Math.cos(a) * 110 * k, Math.sin(a) * 50 * k, 7, 7, '#e8fbff', 0); } });
// vibranium detector machine (o.beep flashes the light)
P.detector = (o, lt) => go(o, () => { rr(-150, -160, 300, 160, 14, '#c8a04a'); rr(-120, -130, 150, 90, 8, '#1a2a2a'); const on = Math.floor(lt * 4) % 2; for (let i = 0; i < 5; i++) rr(-110 + i * 26, -60 - ((i * 37 + Math.floor(lt * 8)) % 50), 18, 12, 2, '#7af0a0', 0);
  ell(80, -110, 26, 26, on || !o.beep ? '#e23a3a' : '#5a1a1a'); if (on && o.beep) glow(80, -110, 90, 'rgba(255,60,60,A)', .6); ln(110, -160, 140, -280, INK, 8); ell(140, -285, 14, 14, '#d8dce8'); rr(-130, 0, 260, 24, 6, '#5a5a62'); });
// spiral shell whistle
P.shell = o => go(o, () => { ctx.beginPath(); ctx.moveTo(-60, 20); ctx.quadraticCurveTo(-70, -50, 0, -50); ctx.quadraticCurveTo(70, -40, 60, 10); ctx.quadraticCurveTo(10, 40, -60, 20); ctx.fillStyle = '#f4d8c0'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.beginPath(); ctx.arc(10, -8, 22, 0, 5.5); ctx.strokeStyle = '#c8946a'; ctx.lineWidth = 5; ctx.stroke(); });
// judge score card paddle with a number
P.scoreCard = (o, lt) => go(o, () => { const shown = o.flip == null || lt >= o.flip; ln(0, 0, 0, 160, INK, 14); ln(0, 0, 0, 160, '#8a5a2a', 8); rr(-110, -170, 220, 170, 10, shown ? '#f4f1ea' : '#2a3990'); if (shown) txt(String(o.n ?? 0), 0, -40, '900 130px Inter', o.n >= 10 ? '#2a9a4a' : '#e23a3a'); else txt('?', 0, -40, '900 120px Inter', '#ffd23d'); });
// judging table item (nails | sword | rocket | duck | spear) sitting on a little plate
P.judgeItem = (o, lt) => go(o, () => { ell(0, 0, 150, 30, '#e8e8ec'); const it = o.item;
  if (it === 'nails') { for (let i = 0; i < 5; i++) poly([[-80 + i * 40, -10], [-64 + i * 40, -10], [-72 + i * 40, -70]], '#b48aff', 3); }
  else if (it === 'sword') { ln(-120, -30, 110, -30, INK, 16); ln(-120, -30, 110, -30, '#ff5a8a', 9); rr(-150, -46, 34, 32, 6, '#3a3a48'); glow(0, -30, 150, 'rgba(255,90,140,A)', .3); }
  else if (it === 'rocket') { rr(-130, -70, 220, 60, 28, '#5a6a4a'); poly([[90, -70], [150, -40], [90, -10]], '#e23a3a'); rr(-150, -60, 30, 40, 6, '#3a3a3a'); }
  else if (it === 'duck') { ell(0, -45, 70, 44, '#ffd23d'); ell(46, -100, 38, 34, '#ffd23d'); poly([[78, -100], [112, -92], [78, -86]], '#ff8a2a', 3); ell(54, -108, 6, 6, INK, 0); }
  else if (it === 'spear') { ln(-170, -40, 160, -40, INK, 16); ln(-170, -40, 160, -40, '#8a5a2a', 9); poly([[230, -40], [160, -60], [130, -40], [160, -20]], '#d8dce8'); glow(0, -40, 220, 'rgba(255,220,90,A)', .35); } });
// chalk/neon price board: o.lines (array), o.title
P.board = (o, lt) => go(o, () => { const w = o.w || 620, lines = o.lines || [], h = 120 + lines.length * 70; if (o.stand) { ln(-w / 2 + 50, -20, -w / 2 + 10, o.stand, INK, 22); ln(-w / 2 + 50, -20, -w / 2 + 10, o.stand, '#7a5a3a', 12); ln(w / 2 - 50, -20, w / 2 - 10, o.stand, INK, 22); ln(w / 2 - 50, -20, w / 2 - 10, o.stand, '#7a5a3a', 12); } rr(-w / 2, -h, w, h, 14, o.col || '#1e2a24', 7); if (o.title) txt(o.title, 0, -h + 70, '900 52px Inter', o.tc || '#ffd23d');
  lines.forEach((l, i) => { const vis = !o.reveal || lt >= o.reveal[i] - 0; if (vis) txt(l, -w / 2 + 40, -h + 140 + i * 70, '800 40px Inter', i === lines.length - 1 && o.hot ? '#ff5a8a' : '#f4f1ea', 'left'); }); });
// clipboard with pencil scribbles (writing)
P.clipboard = (o, lt) => go(o, () => { rr(-80, -110, 160, 220, 8, '#c8946a'); rr(-66, -90, 132, 190, 4, '#f8f8f4', 3); rr(-30, -122, 60, 26, 6, '#a8acb8', 3); for (let i = 0; i < 6; i++) { const w = 40 + ((i * 53 + Math.floor(lt * 3) * 17) % 60); ln(-50, -60 + i * 26, -50 + w, -60 + i * 26, '#4a4a5a', 4); } });
// birds: eagle (glasses) / seagull, flapping
function bird(o, lt, body, wing, big) { go(o, () => { const f = Math.sin(lt * (o.fast ? 18 : 9)) * .7; const sz = big ? 1.4 : 1;
  ctx.save(); ctx.scale(sz, sz); ctx.save(); ctx.rotate(-f); ell(-60, -30, 80, 24, wing); ctx.restore(); ell(0, 0, 70, 40, body); ell(64, -36, 34, 30, big ? '#f4f1ea' : body); poly([[92, -38], [128, -28], [92, -22]], '#ffb02a', 3); ell(70, -44, 6, 6, INK, 0);
  if (o.glasses) { ctx.beginPath(); ctx.arc(70, -42, 13, 0, 7); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.save(); ctx.rotate(f * .8); ell(-40, -40, 70, 20, wing); ctx.restore(); ctx.restore(); }); }
P.eagle = (o, lt) => bird(o, lt, '#6a4a2a', '#4a3020', true);
P.seagull = (o, lt) => bird(o, lt, '#f4f4f0', '#b8bcc8', false);
P.coconut = o => go(o, () => { ell(0, 0, 40, 36, '#6a4a2a'); ln(10, -30, 34, -70, '#ff5a8a', 6); });
P.sandwich = o => go(o, () => { poly([[-70, 0], [70, 0], [0, -60]], '#e8c88a'); ln(-60, -6, 60, -6, '#4aa83a', 8); ln(-50, -14, 50, -14, '#e23a3a', 6); });
P.chips = o => go(o, () => { rr(-50, -110, 100, 120, 12, '#e23a3a'); txt('CHIPS', 0, -40, '900 26px Inter', '#ffd23d'); });
P.tourFlag = (o, lt) => go(o, () => { ln(0, 0, 0, -430, INK, 8); ctx.translate(0, -170); const w = Math.sin(lt * 4) * 8; ctx.beginPath(); ctx.moveTo(0, -260); ctx.quadraticCurveTo(60, -250 + w, 120, -240); ctx.lineTo(120, -180); ctx.quadraticCurveTo(60, -190 + w, 0, -190); ctx.closePath(); ctx.fillStyle = '#ffd23d'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); });
P.fish = (o, lt) => go(o, () => { const sw = Math.sin(lt * 6 + (o.ph || 0)) * 10; poly([[-70, 0], [-110, -30 + sw], [-110, 30 + sw]], o.col || '#ff8a2a', 4); ell(0, 0, 80, 44, o.col || '#ff8a2a'); ell(44, -10, 9, 9, '#fff', 3); ell(46, -10, 4, 4, INK, 0);
  if (o.camera) { rr(30, -90, 80, 54, 8, '#2a2a34', 4); ell(70, -63, 16, 16, '#9ae8ff', 3); if (o.flash != null && Math.abs(lt - o.flash) < .12) glow(70, -63, 260, 'rgba(255,255,255,A)', .9); } });
P.oil = (o, lt) => go(o, () => { rr(-34, -190, 68, 190, 12, '#a8b83a'); rr(-14, -230, 28, 44, 4, '#2a2a2a'); rr(-30, -130, 60, 60, 4, '#f4ecd8', 3); txt('OIL', 0, -90, '900 22px Inter');
  if (o.stamp != null && lt >= o.stamp) { const k = Math.min(1, (lt - o.stamp) / .15); ctx.save(); ctx.translate(0, -110); ctx.rotate(-.3); ctx.scale(2 - k, 2 - k); ctx.strokeStyle = '#e23a3a'; ctx.lineWidth = 6; ctx.strokeRect(-110, -34, 220, 68); txt(o.stampText || 'TREASON', 0, 16, '900 40px Inter', '#e23a3a'); ctx.restore(); } });
P.hairDryer = (o, lt) => go(o, () => { rr(-220, -110, 340, 160, 60, '#ff6ab0'); ell(140, -30, 50, 80, '#ff9ad0'); ell(140, -30, 30, 54, '#3a3a48'); rr(-170, 30, 90, 200, 20, '#ff6ab0'); if (o.on) for (let i = 0; i < 6; i++) { const yy = -90 + i * 30, xx = 220 + ((lt * 600 + i * 70) % 300); ln(xx, yy, xx + 60, yy, 'rgba(255,255,255,.8)', 6); } });
P.book = o => go(o, () => { rr(-90, -120, 180, 240, 8, o.col || '#2a6a8a'); ln(-70, -120, -70, 120, INK, 4); txt(o.t || 'BOOK', 10, -40, '900 22px Inter', '#ffd23d'); if (o.t2) txt(o.t2, 10, -10, '900 22px Inter', '#ffd23d'); });
P.cup = (o, lt) => go(o, () => { poly([[-34, -90], [34, -90], [24, 0], [-24, 0]], '#f4f4f0', 4); ctx.fillStyle = 'rgba(90,180,255,.7)'; ctx.fillRect(-28, -70, 56, 20); });
P.chains = o => go(o, () => { for (let i = 0; i < 12; i++) { ctx.save(); ctx.translate(-160 + i * 28, Math.sin(i * .5) * 12); ctx.rotate(i % 2 ? 0 : Math.PI / 2); ctx.beginPath(); ctx.ellipse(0, 0, 18, 10, 0, 0, 7); ctx.strokeStyle = INK; ctx.lineWidth = 11; ctx.stroke(); ctx.strokeStyle = '#a8acb8'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); } });
P.glassBox = o => go(o, () => { rr(-260, -40, 520, 60, 6, '#3a3a44'); ctx.fillStyle = 'rgba(200,230,255,.14)'; ctx.fillRect(-240, -720, 480, 680); ctx.strokeStyle = 'rgba(230,245,255,.9)'; ctx.lineWidth = 6; ctx.strokeRect(-240, -720, 480, 680); ln(-200, -680, -120, -560, 'rgba(255,255,255,.6)', 6);
  if (o.label) { rr(140, -120, 260, 90, 6, '#f4ecd8', 4); txt(o.label, 270, -85, '800 20px Inter'); if (o.label2) txt(o.label2, 270, -55, '800 20px Inter'); } });
P.robe = o => go(o, () => { rr(-120, -50, 240, 60, 14, '#f4f1ea'); ln(-100, -30, 100, -30, '#d8d0c0', 4); });
P.whale = (o, lt) => go(o, () => { const b = Math.sin(lt * 1.6 + (o.ph || 0)) * 10; ctx.translate(0, b); ctx.beginPath(); ctx.moveTo(-320, 0); ctx.bezierCurveTo(-300, -170, 200, -190, 300, -40); ctx.lineTo(380, -110); ctx.lineTo(370, 20); ctx.bezierCurveTo(200, 90, -200, 90, -320, 0); ctx.fillStyle = '#3a5a8a'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-300, 20); ctx.bezierCurveTo(-150, 70, 150, 70, 300, 20); ctx.lineTo(300, 40); ctx.bezierCurveTo(150, 90, -150, 90, -300, 40); ctx.fillStyle = '#c8d8e8'; ctx.fill(); ell(-220, -40, 12, 12, INK, 0); });
P.wave = (o, lt) => go(o, () => { const h = Array.isArray(o.h) ? o.k : (o.h ?? 600); ctx.beginPath(); ctx.moveTo(-1600, 0); for (let x = -1600; x <= 1600; x += 80) ctx.lineTo(x, -h + Math.sin(x / 120 + lt * 2) * 30); ctx.lineTo(1600, 0); ctx.closePath(); const g = ctx.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, '#5ab8d8'); g.addColorStop(1, '#1a4a7a'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#e8f8ff'; ctx.lineWidth = 10; ctx.stroke(); });
P.drone = (o, lt) => go(o, () => { rr(-90, -24, 180, 48, 20, '#5a5a62'); for (const x of [-110, 110]) { ln(x, -30, x, -50, INK, 6); ell(x, -54, 60 * Math.abs(Math.sin(lt * 30)) + 6, 6, '#a8acb8', 3); } ell(0, 30, 18, 18, '#e23a3a', 4); });
P.coffin = o => go(o, () => { poly([[-260, -60], [240, -70], [280, 0], [240, 60], [-260, 50], [-290, 0]], '#f4f1ea', 6); ln(-200, 0, 200, 0, '#c8a04a', 6); });
P.bracelet = (o, lt) => go(o, () => { glow(0, 0, 90, 'rgba(120,255,180,A)', .3); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; ell(Math.cos(a) * 46, Math.sin(a) * 46, 11, 11, i % 2 ? '#2fbf7a' : '#e8d8a8', 3); } });
P.lamp = o => go(o, () => { rr(-60, -16, 120, 22, 6, '#3a3a44'); ln(0, -10, 40, -140, INK, 12); ln(40, -140, -20, -220, INK, 12); poly([[-20, -220], [-90, -170], [10, -150]], '#ffd23d'); });
P.sock = o => go(o, () => { poly([[-20, -60], [20, -60], [20, 10], [60, 20], [60, 44], [-20, 44]], '#f4f1ea'); ln(-20, -40, 20, -40, '#e23a3a', 6); });
P.dumpBag = o => go(o, () => { ell(0, -60, 80, 70, '#3a3a44'); });
P.bigPct = (o, lt) => go(o, () => { const n = o.n ?? 25; rr(-260, -130, 520, 180, 20, '#0d1a2a', 7); txt('CONFIDENCE', 0, -70, '900 34px Inter', '#9ae8ff'); txt(n + '%', 0, 20, '900 90px Inter', n > 90 ? '#7af0a0' : '#ff8a4a'); });
// CONFIDENCE meter (top-right safe zone): meterEv n = percent*10 (25 -> 250) so decimals survive
window.METER = (n, bump = 9) => { E.screen(); const x = W - 360, y = E.BAR + 24, k = 1 + .3 * Math.max(0, 1 - bump / .45), pct = n / 10; ctx.save(); ctx.translate(x + 150, y + 52); ctx.scale(k, k); ctx.translate(-150, -52);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(6, 6, 300, 104, 18); ctx.fill(); ctx.fillStyle = '#0d1a2a'; ctx.beginPath(); ctx.roundRect(0, 0, 300, 104, 18); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = '#9ae8ff'; ctx.font = '900 18px Inter'; ctx.textAlign = 'left'; ctx.fillText('CONFIDENCE RATE', 18, 30); ctx.font = '900 52px Inter'; ctx.fillStyle = pct > 90 ? '#7af0a0' : '#ff8a4a'; ctx.strokeStyle = INK; ctx.lineWidth = 8; const s_ = pct + '%'; ctx.strokeText(s_, 18, 90); ctx.fillText(s_, 18, 90);
  ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(180, 60, 100, 18); ctx.fillStyle = pct > 90 ? '#7af0a0' : '#ff8a4a'; ctx.fillRect(180, 60, pct, 18); ctx.restore(); };
// seats (QA L02): flat-topped boulder and a front-view armchair; seat top at -74 like siprops chairS, use s 1.46
P.rock = o => go(o, () => { poly([[-110, 0], [-118, -40], [-96, -70], [-30, -80], [40, -78], [100, -66], [120, -30], [112, 0]], o.col || '#8a7a62', 5); ln(-70, -50, -20, -40, '#5e5242', 4); ln(30, -30, 80, -42, '#5e5242', 4); ell(0, 4, 120, 10, 'rgba(0,0,0,.25)', 0); });
P.armchair = o => go(o, () => { const C = o.col || '#7a2a5a'; rr(-92, -250, 184, 190, 26, C, 5); rr(-112, -120, 44, 120, 14, C, 5); rr(68, -120, 44, 120, 14, C, 5); rr(-80, -86, 160, 30, 10, C, 5); ln(-80, 0, -80, -20, '#3a1a0a', 10); ln(80, 0, 80, -20, '#3a1a0a', 10); });
P.counter = o => go(o, () => { rr(-360, -260, 720, 260, 6, o.col || '#8a6a4a'); rr(-380, -280, 760, 34, 6, '#a8825a'); if (o.t) txt(o.t, 0, -150, '900 52px Inter', '#f4ecd8'); });
// v5 gag props
// pool sunk into the stage floor; o.sp = [t, ...] splash bursts
P.pool = (o, lt) => go(o, () => { const w = o.w || 640; ell(0, 0, w / 2 + 22, 64, '#c8ccd4'); ell(0, 0, w / 2, 52, '#3aa8e8'); ctx.save(); ctx.globalAlpha = .5; for (let i = 0; i < 4; i++) ell(-w / 4 + i * w / 6, -4 + Math.sin(lt * 3 + i) * 4, 40, 6, '#bfe8ff', 0); ctx.restore();
  for (const t of (o.sp || [])) { const a = lt - t; if (a < 0 || a > .9) continue; const k = a / .9; ctx.save(); ctx.globalAlpha = 1 - k; for (let j = 0; j < 9; j++) { const an = -Math.PI * (.15 + .7 * j / 8), r = 60 + 260 * k; ell((o.sx || 0) + Math.cos(an) * r * .8, -30 + Math.sin(an) * r * (1.4 - k), 22 - 12 * k, 30 - 16 * k, '#9ad8ff', 3); } ctx.restore(); } });
// judges' desk with a little name plate
P.judgeDesk = o => go(o, () => { rr(-420, -230, 840, 230, 10, o.col || '#3a2a5a', 6); rr(-440, -250, 880, 30, 8, '#d8b46a', 5); if (o.t) txt(o.t, 0, -120, '900 46px Inter', '#ffd23d'); });
// T-shirt on a hanger for the Talokan gift shop
P.tshirt = o => go(o, () => { poly([[-90, -200], [-40, -220], [0, -200], [40, -220], [90, -200], [130, -150], [90, -125], [80, -140], [80, 0], [-80, 0], [-80, -140], [-90, -125], [-130, -150]], o.col || '#f4f1ea', 5); if (o.t) { const L = o.t.split('|'); L.forEach((l, i) => txt(l, 0, -120 + i * 30, '900 22px Inter', '#1a3a6a')); } });
// fridge (opens: o.open 0..1 via kk)
P.fridge = (o, lt) => go(o, () => { rr(-150, -560, 300, 560, 14, '#e8e4d4', 6); ln(-150, -330, 150, -330, '#9a9688', 4); const k = o.k ?? 0; if (k > .05) { ctx.save(); rr(-150, -560, 300, 560, 14, '#1a1a22', 0); ctx.restore(); ctx.fillStyle = 'rgba(200,240,255,.6)'; ctx.fillRect(-140, -550, 280, 540); poly([[150, -560], [150 + 220 * k, -600], [150 + 220 * k, 40], [150, 0]], '#d8d4c4', 6); } else { rr(110, -500, 14, 120, 6, '#8a8a8a', 3); rr(110, -300, 14, 120, 6, '#8a8a8a', 3); } });
// milk carton + cheese wedge held by agents
P.milk = o => go(o, () => { rr(-34, -120, 68, 120, 4, '#f4f4f4', 4); poly([[-34, -120], [0, -160], [34, -120]], '#6aa8e8', 4); txt('MILK', 0, -60, '900 20px Inter', '#2a5aa8'); });
// car interior cutaway: long bench seat + window frame (side view)
P.carBench = o => go(o, () => { const w = o.w || 1500; rr(-w / 2, -300, w, 230, 40, '#2a2a30', 6); rr(-w / 2 + 20, -90, w - 40, 90, 24, '#3a3a44', 6); });
// car seen from the front (cutaway): roof, pillars, wheel, dashboard/hood with headlights. Characters sit behind it (front view), so no seats show.
P.carFront = (o, lt) => go(o, () => { const C = o.col || '#1a1a22', bob = Math.sin(lt * 9) * 3; ctx.translate(0, bob);
  rr(-720, -940, 1440, 70, 30, C, 6); poly([[-720, -900], [-660, -900], [-760, -250], [-860, -250]], C, 6); poly([[720, -900], [660, -900], [760, -250], [860, -250]], C, 6);
  ell(o.wx ?? -290, -300, 120, 120, 'rgba(0,0,0,0)', 0); ctx.lineWidth = 26; ctx.strokeStyle = '#111'; ctx.beginPath(); ctx.arc(o.wx ?? -290, -300, 110, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 12; ctx.strokeStyle = '#3a3a44'; ctx.beginPath(); ctx.arc(o.wx ?? -290, -300, 110, 0, Math.PI * 2); ctx.stroke();
  rr(-920, -270, 1840, 330, 60, C, 7); rr(-880, -270, 1760, 40, 16, '#2e2e38', 0); ell(-680, -120, 90, 50, '#fff6c8', 5); ell(680, -120, 90, 50, '#fff6c8', 5); rr(-260, -170, 520, 90, 20, '#0c0c10', 5);
  for (let i = -3; i <= 3; i++) ln(i * 70, -160, i * 70, -90, '#3a3a44', 6); rr(-200, -40, 400, 60, 10, '#e8e4d4', 4); if (o.plate) txt(o.plate, 0, -2, '900 34px Inter', '#1a1a22'); });
// stand legs under a board/whiteboard: o.w half-width, o.h leg length (top at y)
// v6 car interior seen through the windscreen (L43): roof + pillars frame the two front seats, dashboard + wheel cover the laps. World coords, cam z 1.
P.carInt = (o, lt) => { ctx.save(); const bob = Math.sin(lt * 7) * 3; ctx.translate(0, bob); const D = o.col || '#2a2a33';
  const yD = o.y ?? 1120, wx = o.wx ?? 1560;
  poly([[-40, -40], [2600, -40], [2600, 230], [2260, 300], [300, 300], [-40, 230]], D, 6);            // roof
  poly([[-40, 200], [330, 270], [140, yD + 40], [-40, yD + 40]], D, 6); poly([[2600, 200], [2230, 270], [2420, yD + 40], [2600, yD + 40]], D, 6); // A-pillars
  ctx.save(); ctx.globalAlpha = .10; poly([[600, 300], [900, 300], [500, yD], [200, yD]], '#ffffff', 0); poly([[1900, 300], [2000, 300], [1700, yD], [1600, yD]], '#ffffff', 0); ctx.restore(); // glass glare
  rr(1180, 290, 200, 70, 12, '#3a3a44', 4);                                                           // mirror
  ctx.lineWidth = 34; ctx.strokeStyle = INK; ctx.beginPath(); ctx.arc(wx, yD + 120, 230, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.lineWidth = 22; ctx.strokeStyle = '#3a3a44'; ctx.stroke(); // wheel rim
  poly([[-40, yD], [2600, yD], [2600, 1480], [-40, 1480]], '#3a3a44', 6); rr(-40, yD - 6, 2640, 40, 16, '#4a4a56', 5);   // dashboard
  rr(wx - 150, yD + 40, 300, 90, 20, '#22222a', 4); ell(wx - 60, yD + 85, 34, 30, '#ffd23d', 3); ell(wx + 60, yD + 85, 34, 30, '#ffd23d', 3); // gauges
  rr(1120, yD + 50, 320, 140, 14, '#1a1a22', 4); ctx.fillStyle = '#5ab8d8'; ctx.fillRect(1140, yD + 70, 280, 100);            // centre screen
  ctx.restore(); };

P.legs = o => go(o, () => { const w = o.w || 300, h = o.h || 220; ln(-w, 0, -w - 30, h, '#3a3a44', 14); ln(w, 0, w + 30, h, '#3a3a44', 14); ln(-w - 10, h * .6, w + 10, h * .6, '#3a3a44', 10); });

// coffin seen END-ON (procession walking toward camera): origin = bottom centre of the near end; top recedes upward (v6, L42)
P.coffinEnd = o => go(o, () => { poly([[-150, -130], [150, -130], [105, -215], [-105, -215]], '#e8e2d4', 5); ln(-120, -172, 120, -172, '#c8a04a', 5); poly([[-150, 0], [150, 0], [150, -130], [-150, -130]], '#f6f3ec', 6); poly([[-150, -18], [150, -18], [150, -6], [-150, -6]], '#c8a04a', 0); poly([[-150, -124], [150, -124], [150, -112], [-150, -112]], '#c8a04a', 0); ell(0, -66, 26, 26, '#c8a04a', 4); poly([[-140, 0], [140, 0], [140, 14], [-140, 14]], 'rgba(0,0,0,.25)', 0); });

// v6 (L43/6:37): cars seen from BEHIND (driving away) and HEAD-ON, width 650 at s 1 = real car next to a person at s 1.4
P.carRear = (o, lt) => go(o, () => { const C = o.col || '#e8e0d0', bob = Math.sin(lt * 14 + (o.ph || 0)) * 2;
  rr(-300, -70, 120, 90, 20, '#141418', 5); rr(180, -70, 120, 90, 20, '#141418', 5); ctx.translate(0, bob);
  poly([[-325, -60], [325, -60], [335, -250], [-335, -250]], C, 6); poly([[-250, -250], [250, -250], [195, -400], [-195, -400]], C, 6);
  poly([[-220, -262], [220, -262], [175, -385], [-175, -385]], '#2a3a4a', 4); rr(-90, -150, 180, 50, 6, '#f4f1ea', 4);
  for (const sx of [-1, 1]) { rr(sx * 255 - 55, -225, 110, 46, 10, '#e23a3a', 4); glow(sx * 255, -202, 170, 'rgba(255,40,40,A)', .5); }
  rr(-340, -80, 680, 28, 12, '#2a2a32', 4); });
P.carHead = (o, lt) => go(o, () => { const C = o.col || '#1a1a22', bob = Math.sin(lt * 14 + (o.ph || 0)) * 2;
  rr(-300, -70, 120, 90, 20, '#141418', 5); rr(180, -70, 120, 90, 20, '#141418', 5); ctx.translate(0, bob);
  poly([[-325, -60], [325, -60], [335, -240], [-335, -240]], C, 6); poly([[-250, -240], [250, -240], [195, -400], [-195, -400]], C, 6);
  poly([[-220, -252], [220, -252], [175, -385], [-175, -385]], '#6a8aa8', 4); rr(-130, -170, 260, 70, 10, '#2a2a32', 4);
  for (const sx of [-1, 1]) { rr(sx * 245 - 60, -215, 120, 50, 14, '#fff6c8', 4); glow(sx * 245, -190, 260, 'rgba(255,250,200,A)', .55); }
  rr(-340, -80, 680, 28, 12, '#2a2a32', 4); });

// car seat back + headrest (behind a seated driver/passenger, v6 car scene)
P.carSeat = o => go(o, () => { rr(-190, -560, 380, 580, 70, o.col || '#3a3440', 6); rr(-110, -700, 220, 150, 40, o.col || '#3a3440', 6); ln(-60, -560, -60, -540, '#22222a', 10); ln(60, -560, 60, -540, '#22222a', 10); });
})();