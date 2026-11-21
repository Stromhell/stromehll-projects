// Thunderbolts* parody props (original designs), same ink style as dwprops.js. y = ground or hand point; s = scale.
(function () {
const { ctx, clamp, lerp } = window.E; const P = window.PROPS; const INK = '#231A24';
const rr = (x, y, w, h, r, f, lw = 6) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); if (f) { ctx.fillStyle = f; ctx.fill(); } ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); };
const glow = (x, y, r, col, a) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); };
const go = (o, f) => { ctx.save(); ctx.translate(o.x, o.y); ctx.scale((o.s || 1) * (o.dir || 1), o.s || 1); if (o.rot) ctx.rotate(o.rot); f(); ctx.restore(); };
const circ = (x, y, r, f, lw = 6) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); if (f) { ctx.fillStyle = f; ctx.fill(); } if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); } };
// plain round shield (no star, no emblem): navy rim, white ring, red centre; held at the hand
P.shield = (o, lt) => go(o, () => { ctx.translate(o.dx || 0, o.dy ?? (o.on != null ? 120 : 0)); circ(0, 0, 92, '#1e2c5a'); circ(0, 0, 70, '#e8e8ee', 4); circ(0, 0, 46, '#c3202c', 4); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(-30, -36, 26, 12, -.6, 0, 7); ctx.fill(); });
// short telescopic baton
P.baton = (o) => go(o, () => { ctx.rotate(-.9); rr(-8, -150, 16, 170, 6, '#3a3e46', 4); rr(-12, 0, 24, 50, 8, '#1a1a1e', 4); });
// wrist zapper: blue electric arcs from the hand
P.zap = (o, lt) => { if (Math.floor(lt * 12) % 3 === 0) return; ctx.save(); ctx.strokeStyle = '#8ae8ff'; ctx.lineWidth = 5; ctx.shadowColor = '#2fc6ff'; ctx.shadowBlur = 20; for (let k = 0; k < 3; k++) { ctx.beginPath(); let x = o.x, y = o.y; ctx.moveTo(x, y); for (let i = 0; i < 6; i++) { x += (o.dir || 1) * (30 + Math.random() * 30) * (o.s || 1); y += (Math.random() - .5) * 50; ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore(); glow(o.x, o.y, 140, 'rgba(80,200,255,A)', .6); };
// stretch limo, side view (black, long), y = ground
P.limo = (o, lt) => go(o, () => { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 0, 720, 34, 0, 0, 7); ctx.fill(); const b = o.bounce ? Math.sin(lt * 18) * 3 : 0; ctx.translate(0, b);
  ctx.beginPath(); ctx.moveTo(-700, -40); ctx.lineTo(-700, -130); ctx.lineTo(-560, -150); ctx.lineTo(-460, -230); ctx.lineTo(460, -230); ctx.lineTo(560, -150); ctx.lineTo(700, -130); ctx.lineTo(700, -40); ctx.closePath(); ctx.fillStyle = '#141418'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
  ctx.fillStyle = 'rgba(120,140,170,.75)'; for (let i = 0; i < 6; i++) ctx.fillRect(-430 + i * 150, -215, 130, 60); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-700, -120, 1400, 8); ctx.fillStyle = '#ffe6a0'; ctx.fillRect(680, -120, 20, 30);
  const sp = (o.spin ?? 1) * lt * 8; for (const wx of [-500, 500]) { circ(wx, -40, 56, '#121214'); ctx.save(); ctx.translate(wx, -40); ctx.rotate(sp); ctx.strokeStyle = '#8a9098'; ctx.lineWidth = 6; for (let k = 0; k < 5; k++) { ctx.rotate(1.2566); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 30); ctx.stroke(); } ctx.restore(); circ(wx, -40, 12, '#c8ccd4', 3); } });
// motorbike, side view, y = ground
P.bike = (o, lt) => go(o, () => { const sp = lt * 14; for (const wx of [-150, 150]) { circ(wx, -60, 60, '#121214', 7); ctx.save(); ctx.translate(wx, -60); ctx.rotate(sp); ctx.strokeStyle = '#9aa0a8'; ctx.lineWidth = 4; for (let k = 0; k < 6; k++) { ctx.rotate(1.047); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 44); ctx.stroke(); } ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(-150, -60); ctx.lineTo(-40, -150); ctx.lineTo(90, -150); ctx.lineTo(150, -60); ctx.lineWidth = 12; ctx.strokeStyle = '#2a2a30'; ctx.stroke(); rr(-80, -190, 170, 60, 26, '#1a1a1e'); rr(70, -230, 20, 90, 6, '#3a3a40', 4); rr(40, -240, 90, 16, 6, '#3a3a40', 4); glow(170, -150, 120, 'rgba(255,240,190,A)', .5); });
// bullets: streaks flying from (x,y) towards (x2,y2) on loop; o.stop: bullets freeze mid-air
P.bullets = (o, lt) => { ctx.save(); for (let i = 0; i < (o.n || 8); i++) { let ph = ((lt * 2.2 + i * .37) % 1); if (o.stop) ph = Math.min(ph, .55 + (i % 3) * .05); const x = lerp(o.x, o.x2, ph) + (i % 3 - 1) * 20, y = lerp(o.y, o.y2, ph) + ((i * 37) % 60 - 30); ctx.strokeStyle = o.stop ? '#fff2a0' : 'rgba(255,230,140,.9)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - (o.x2 - o.x) * .05, y - (o.y2 - o.y) * .05); ctx.stroke(); if (o.stop) glow(x, y, 30, 'rgba(255,230,120,A)', .6); } ctx.restore(); };
// muzzle flashes along a line of soldiers
P.muzzle = (o, lt) => { if (Math.floor(lt * 10 + (o.ph || 0)) % 2) return; glow(o.x, o.y, 90 * (o.s || 1), 'rgba(255,220,120,A)', .9); ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(o.x, o.y, 16 * (o.s || 1), 0, 7); ctx.fill(); };
// framed photo of two little girls in soccer kits (held in a hand)
P.photo = (o) => go(o, () => { rr(-70, -90, 140, 110, 8, '#8a6a3a'); rr(-58, -78, 116, 86, 4, '#e8f0d8', 3); for (const [x, col, hc] of [[-24, '#2a7ac8', '#f0dc9a'], [24, '#2a7ac8', '#6a3a22']]) { ctx.fillStyle = col; ctx.fillRect(x - 12, -30, 24, 34); circ(x, -44, 13, '#f0d4bc', 3); ctx.fillStyle = hc; ctx.beginPath(); ctx.arc(x, -50, 13, Math.PI, 0); ctx.fill(); } circ(0, 0, 9, '#ffffff', 3); });
// teacup on saucer
P.teacup = (o) => go(o, () => { ctx.fillStyle = '#f4f1ea'; ctx.beginPath(); ctx.ellipse(0, 0, 40, 10, 0, 0, 7); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); rr(-24, -40, 48, 38, 12, '#f4f1ea', 4); ctx.beginPath(); ctx.arc(28, -24, 12, -1.2, 1.2); ctx.stroke(); });
// tablet (assistant)
P.tablet = (o, lt) => go(o, () => { rr(-46, -64, 92, 128, 10, '#1d1d24', 5); ctx.fillStyle = '#4ac8ff'; ctx.fillRect(-36, -54, 72, 108); ctx.fillStyle = '#e8f8ff'; for (let k = 0; k < 5; k++) ctx.fillRect(-28, -44 + k * 20, 40 + ((k * 13) % 20), 6); });
// phone held to the ear / in hand
P.phone2 = (o) => go(o, () => { rr(-20, -40, 40, 80, 8, '#1d1d24', 4); ctx.fillStyle = '#9ad8ff'; ctx.fillRect(-14, -32, 28, 60); });
// flying glass shards (after a window smash), k = 0..1 progress
P.shards = (o, lt) => { const k = clamp((lt - (o.t0 || 0)) / 1.2); if (k >= 1) return; ctx.save(); for (let i = 0; i < 26; i++) { const a = (i * 2.39) % 6.28, d = k * (300 + (i * 53) % 400) * (o.s || 1); ctx.translate(0, 0); const x = o.x + Math.cos(a) * d, y = o.y + Math.sin(a) * d * .6 + k * k * 400; ctx.fillStyle = `rgba(200,230,255,${.9 * (1 - k)})`; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 20, y + 8); ctx.lineTo(x + 6, y + 26); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); };
// rope / cable hanging from above to a hand
P.cable = (o) => { ctx.save(); ctx.strokeStyle = '#2a2a2e'; ctx.lineWidth = 12 * (o.s || 1); ctx.beginPath(); ctx.moveTo(o.x + (o.dx0 || 0), -200); ctx.lineTo(o.x, o.y + (o.len || 200)); ctx.stroke(); ctx.strokeStyle = 'rgba(200,200,210,.4)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
// press camera flashes around (random pops)
P.flashes = (o, lt) => { for (let i = 0; i < (o.n || 10); i++) { const f = Math.floor(lt * 6 + i * 1.7) % 7 === 0; if (!f) continue; const x = o.x + ((i * 197) % (o.w || 1600)) - (o.w || 1600) / 2, y = o.y - ((i * 89) % 200); glow(x, y, 120, 'rgba(255,255,255,A)', .9); } };
// spreading black ink of the Void across the ground/wall: k 0..1 grows
P.inkSpread = (o, lt) => { const k = o.t0 != null ? clamp((lt - o.t0) / (o.dur || 4)) : (o.k ?? 1); ctx.save(); ctx.fillStyle = 'rgba(4,4,8,.92)'; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283, rad = (o.r || 1400) * k * (0.8 + .2 * Math.sin(a * 5 + lt * 2)); const x = o.x + Math.cos(a) * rad, y = o.y + Math.sin(a) * rad * (o.flat || .5); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.fill(); ctx.restore(); };
// a person-shaped shadow stuck on a wall
P.wallShadow = (o, lt) => go(o, () => { ctx.fillStyle = 'rgba(0,0,0,.78)'; ctx.beginPath(); ctx.ellipse(0, -330, 44, 52, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.roundRect(-60, -280, 120, 200, 40); ctx.fill(); ctx.fillRect(-50, -90, 40, 90); ctx.fillRect(10, -90, 40, 90); ctx.save(); ctx.translate(-60, -260); ctx.rotate(o.arm ?? .4); ctx.fillRect(-20, 0, 34, 150); ctx.restore(); ctx.save(); ctx.translate(60, -260); ctx.rotate(-(o.arm ?? .4)); ctx.fillRect(-14, 0, 34, 150); ctx.restore(); });
// a stool that bends (Dad's)
P.stool = (o) => go(o, () => { const b = o.bend ?? 0; rr(-70, -150, 140, 24, 8, '#a86a3a'); ctx.strokeStyle = '#6a3a1a'; ctx.lineWidth = 12; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 54, -128); ctx.quadraticCurveTo(sx * (60 + b * 40), -60, sx * (64 + b * 70), 0); ctx.stroke(); } });
// cucumber (gag prop)
P.cuke = (o) => go(o, () => { ctx.fillStyle = '#3a8a3a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 22, -.3, 0, 7); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); ctx.fillStyle = '#7ac86a'; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.arc(k * 22, -k * 6 - 6, 4, 0, 7); ctx.fill(); } });
// sentry golden glow (around a figure) and golden flight trail
P.gold = (o, lt) => { for (let i = 0; i < 3; i++) glow(o.x, o.y, (300 + i * 120 + Math.sin(lt * 5 + i) * 30) * (o.s || 1), 'rgba(255,214,90,A)', .4 - i * .1); };
P.trail = (o, lt) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(o.x, o.y, o.x2, o.y2); g.addColorStop(0, 'rgba(255,220,110,0)'); g.addColorStop(1, 'rgba(255,230,140,.9)'); ctx.strokeStyle = g; ctx.lineWidth = 60 * (o.s || 1); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x2, o.y2); ctx.stroke(); ctx.restore(); };
// impact burst (comic POW star) at a point, t0 = when
P.pow = (o, lt) => { const k = clamp((lt - (o.t0 || 0)) / .35); if (lt < (o.t0 || 0) || k >= 1) return; ctx.save(); ctx.translate(o.x, o.y); ctx.scale((o.s || 1) * (.4 + k), (o.s || 1) * (.4 + k)); ctx.globalAlpha = 1 - k; ctx.fillStyle = o.col || '#ffd23d'; ctx.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * 6.283, rr_ = i % 2 ? 40 : 110; ctx.lineTo(Math.cos(a) * rr_, Math.sin(a) * rr_); } ctx.closePath(); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); };
// dust cloud kicked up at ground (looping)
P.dust = (o, lt) => { for (let i = 0; i < 10; i++) { const ph = (lt * .8 + i * .1) % 1; ctx.fillStyle = `rgba(${o.col || '200,170,130'},${.4 * (1 - ph)})`; ctx.beginPath(); ctx.arc(o.x + (i - 5) * 40 * (o.s || 1) + ph * 80 * (o.dir || -1), o.y - ph * 90 * (o.s || 1), (30 + ph * 60) * (o.s || 1), 0, 7); ctx.fill(); } };
// speed lines (screen-space-ish, drawn in world) for chases
P.speed = (o, lt) => { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 4; for (let i = 0; i < 30; i++) { const y = (o.y0 || 300) + ((i * 97) % (o.h || 900)), x = ((i * 331 - lt * 2600 * (o.dir || 1)) % 3000 + 3000) % 3000 - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 220, y); ctx.stroke(); } ctx.restore(); };
// steel door that a phasing hand pulls a lever on
P.lever = (o, lt) => go(o, () => { rr(-30, -160, 60, 160, 8, '#5a6068'); ctx.save(); ctx.translate(0, -80); ctx.rotate((o.k ?? 0) * 1.4 - .7); rr(-8, -110, 16, 110, 6, '#c3202c', 4); circ(0, -110, 16, '#e8e8ee', 4); ctx.restore(); });
// helmet sign being lifted (tower reveal): big blank-gold letters
P.bigSign = (o, lt) => go(o, () => { rr(-460, -120, 920, 240, 20, '#e8b22a', 8); ctx.fillStyle = INK; ctx.font = '900 130px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.t || 'SENTRY', 0, 8); ctx.strokeStyle = '#2a2a2e'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-300, -120); ctx.lineTo(-300, -900); ctx.moveTo(300, -120); ctx.lineTo(300, -900); ctx.stroke(); });
// sad cactus pot
P.pot = (o) => go(o, () => { rr(-40, -60, 80, 60, 8, '#a85a3a', 5); ctx.fillStyle = '#3a6a3a'; ctx.beginPath(); ctx.roundRect(-14, -150, 28, 96, 14); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); });
})();
// layered flickering fire: teardrop tongues with hot cores + glow; x centre, y ground, w width
(function () { const { ctx } = window.E; const P = window.PROPS;
P.fire = (o, lt) => { const { x, y, w = 600 } = o, s = o.s || 1, n = Math.max(5, Math.round(w / 70)); ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y - 120 * s, 0, x, y - 120 * s, w * .8); g.addColorStop(0, 'rgba(255,140,40,.55)'); g.addColorStop(1, 'rgba(255,90,20,0)'); ctx.fillStyle = g; ctx.fillRect(x - w, y - w, w * 2, w * 1.2); ctx.restore();
  for (const [col, hk, wk] of [['#c8321a', 1.0, 1.0], ['#ff6a1a', .8, .8], ['#ffb02a', .58, .6], ['#fff2a0', .32, .35]]) { ctx.fillStyle = col; for (let i = 0; i < n; i++) { const xx = x - w / 2 + (i + .5) / n * w, ph = lt * 7 + i * 2.3, h = (140 + 70 * Math.sin(ph) + 40 * Math.sin(ph * 2.7)) * s * hk, ww = (w / n) * .9 * wk, sway = Math.sin(ph * .7) * 18 * s;
    ctx.beginPath(); ctx.moveTo(xx - ww, y); ctx.bezierCurveTo(xx - ww, y - h * .45, xx - ww * .2 + sway, y - h * .7, xx + sway * 1.6, y - h); ctx.bezierCurveTo(xx + ww * .2 + sway, y - h * .7, xx + ww, y - h * .45, xx + ww, y); ctx.closePath(); ctx.fill(); } }
  for (let i = 0; i < 10; i++) { const ph = (lt * .9 + i * .13) % 1; ctx.fillStyle = `rgba(255,${180 + i * 6},80,${1 - ph})`; ctx.beginPath(); ctx.arc(x + ((i * 173) % w) - w / 2 + Math.sin(lt * 3 + i) * 20, y - 60 * s - ph * 320 * s, 4 * s, 0, 7); ctx.fill(); } };
})();
