// The Marvels parody props (original designs, no logos/emblems). Drawn on the world canvas.
(function () {
const { ctx, clamp, lerp, io } = window.E;
const INK = '#231A24';
const P = window.PROPS;
function rr(x, y, w, h, r, fill, lw) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } }
function glow(x, y, r, col, a) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
function go(o, f) { ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.rot ? o.rot * Math.PI / 180 : 0); const s = o.s || 1; ctx.scale(s * (o.dir || 1), s); f(); ctx.restore(); }
const ell = (x, y, a, b, fill, lw = 5, r = 0) => { ctx.beginPath(); ctx.ellipse(x, y, a, b, r, 0, 7); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw) { ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.stroke(); } };

// Goose: fluffy ginger cat. o.mouth (0..1) opens the mouth with tentacles; o.fat makes her round; o.sit = sitting.
function cat(o, lt, small) {
  go(o, () => { const f = 1 + (o.fat || 0) * .35, br = Math.sin(lt * 3 + (o.ph || 0)) * 3, m = o.mouth || 0, base = o.col || '#e88a3a', dark = o.col2 || '#b8601e';
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 4, 90 * f, 14, 0, 0, 7); ctx.fill();
    // tail
    ctx.strokeStyle = INK; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-70 * f, -30); ctx.quadraticCurveTo(-140, -60 + Math.sin(lt * 4) * 20, -120, -130 + Math.sin(lt * 3) * 25); ctx.stroke();
    ctx.strokeStyle = base; ctx.lineWidth = 18; ctx.stroke();
    // body
    ell(0, -55 + br, 85 * f, 58 * f, base, 6);
    for (let i = 0; i < 4; i++) { ctx.strokeStyle = dark; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-40 + i * 22, -105 * f + br); ctx.quadraticCurveTo(-30 + i * 22, -80 + br, -42 + i * 22, -62 + br); ctx.stroke(); }
    ell(-40, -6, 18, 12, base, 4); ell(40, -6, 18, 12, base, 4);
    // head
    const hx = 70, hy = -110 + br;
    ctx.fillStyle = base; ctx.strokeStyle = INK; ctx.lineWidth = 5; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx + sx * 30, hy - 30); ctx.lineTo(hx + sx * 42, hy - 78); ctx.lineTo(hx + sx * 6, hy - 46); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ell(hx, hy, 52, 44, base, 6); ell(hx + 4, hy + 16, 22, 15, '#f8e8d8', 0);
    const blink = (Math.floor(lt * 2 + (o.ph || 0)) % 7 === 0) && (lt * 2 % 1) < .2;
    for (const sx of [-1, 1]) { if (blink) { ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(hx + sx * 20 - 9, hy - 6); ctx.lineTo(hx + sx * 20 + 9, hy - 6); ctx.stroke(); } else { ell(hx + sx * 20, hy - 6, 10, 13, '#9ad84a', 3); ell(hx + sx * 20, hy - 6, 3, 10, INK, 0); } }
    if (m > 0) { // tentacle mouth
      ell(hx + 4, hy + 20, 18 + m * 14, 6 + m * 22, '#5a0a1a', 4);
      for (let k = 0; k < 4; k++) { const a = -1.9 + k * .55 + Math.sin(lt * 7 + k) * .25, L = (60 + k * 20) * m; ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx + 4, hy + 20); ctx.quadraticCurveTo(hx + 4 + Math.cos(a) * L * .6 + Math.sin(lt * 9 + k) * 20, hy + 20 + Math.sin(a) * L * .6, hx + 4 + Math.cos(a) * L, hy + 20 + Math.sin(a) * L); ctx.stroke(); ctx.strokeStyle = '#ff6a8a'; ctx.lineWidth = 10; ctx.stroke(); }
    } else { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx - 6, hy + 18); ctx.quadraticCurveTo(hx + 4, hy + 26, hx + 14, hy + 18); ctx.stroke(); ell(hx + 4, hy + 10, 6, 4, '#ff8aa0', 2); }
    ctx.strokeStyle = 'rgba(35,26,36,.6)'; ctx.lineWidth = 2; for (const sx of [-1, 1]) for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(hx + sx * 24, hy + 14 + k * 6); ctx.lineTo(hx + sx * 60, hy + 8 + k * 12); ctx.stroke(); }
  });
}
P.goose = (o, lt) => cat(o, lt);
// kittens: a little crowd of tiny flerkens (o.n, o.w spread)
P.kittens = (o, lt) => { const n = o.n || 8, w = o.w || 1200; for (let i = 0; i < n; i++) { const cols = [['#e88a3a', '#b8601e'], ['#f4f1ea', '#c8c0b0'], ['#5a5a62', '#3a3a42'], ['#e8c070', '#b89040']][i % 4];
  const hop = Math.abs(Math.sin(lt * 5 + i * 1.3)) * (o.hop ?? 30); cat({ x: o.x - w / 2 + (i + .5) / n * w + Math.sin(lt * .8 + i) * 30, y: o.y + ((i * 37) % 60) - hop, s: (o.s || .45) * (.85 + (i % 3) * .1), dir: i % 2 ? 1 : -1, col: cols[0], col2: cols[1], ph: i, mouth: o.mouth && (i % 3 === 0) ? o.mouth : 0 }, lt); } };
// the Kree Queen's big hammer (plain design, glowing head)
P.hammer = (o, lt) => go(o, () => { glow(0, -260, 260, 'rgba(120,170,255,A)', .5 + .2 * Math.sin(lt * 8)); rr(-12, -240, 24, 340, 8, '#3a3a44', 4);
  rr(-90, -320, 180, 110, 18, '#2a2a34', 6); rr(-70, -300, 140, 70, 10, '#4a6ac8', 3); ctx.fillStyle = 'rgba(200,230,255,.9)'; ctx.fillRect(-50, -280, 100, 12); rr(-18, 100, 36, 30, 6, '#ffd23d', 4); });
// glowing gold bangle (o.col sets glow)
P.bangle = (o, lt) => { glow(o.x, o.y, 120 * (o.s || 1), `rgba(${o.col || '255,210,80'},A)`, .55 + .25 * Math.sin(lt * 7)); go(o, () => { ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.beginPath(); ctx.ellipse(0, 0, 30, 12, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 9; ctx.stroke(); }); };
// purple hard-light fist / platform (Kamala's power)
P.lightFist = (o, lt) => { const k = o.t0 != null ? clamp((lt - o.t0) / .3) : 1; if (k <= 0) return; go({ ...o, s: (o.s || 1) * (.4 + .6 * io(k)) }, () => { glow(0, 0, 340, 'rgba(200,90,255,A)', .5);
  ctx.globalAlpha = .9; ctx.fillStyle = 'rgba(190,110,255,.75)'; ctx.strokeStyle = '#f4d8ff'; ctx.lineWidth = 8; rr(-150, -110, 300, 220, 70); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-60 + i * 60, -110); ctx.lineTo(-60 + i * 60, -20); ctx.stroke(); } ctx.beginPath(); ctx.roundRect(-210, -40, 90, 120, 40); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1; }); };
P.lightStep = (o, lt) => { const n = o.n || 5; for (let i = 0; i < n; i++) { ctx.save(); ctx.globalAlpha = .8; ctx.fillStyle = 'rgba(190,110,255,.7)'; ctx.strokeStyle = '#f4d8ff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(o.x + i * 170 * (o.s || 1), o.y - i * 110 * (o.s || 1), 150 * (o.s || 1), 34, 12); ctx.fill(); ctx.stroke(); ctx.restore(); glow(o.x + i * 170 * (o.s || 1) + 70, o.y - i * 110 * (o.s || 1), 120, 'rgba(200,90,255,A)', .4); } };
// big glowing energy around fists/body; o.col = 'r,g,b'
P.photon = (o, lt) => { const col = o.col || '255,200,80'; for (let i = 0; i < 3; i++) glow(o.x, o.y, (140 + i * 70 + Math.sin(lt * 9 + i) * 20) * (o.s || 1), `rgba(${col},A)`, .5 - i * .12);
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.strokeStyle = `rgba(${col},.9)`; ctx.lineWidth = 4; for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + lt * 3; ctx.beginPath(); ctx.moveTo(o.x + Math.cos(a) * 40 * (o.s || 1), o.y + Math.sin(a) * 40 * (o.s || 1)); ctx.lineTo(o.x + Math.cos(a) * (110 + 30 * Math.sin(lt * 13 + k)) * (o.s || 1), o.y + Math.sin(a) * (110 + 30 * Math.sin(lt * 13 + k)) * (o.s || 1)); ctx.stroke(); } ctx.restore(); };
// a jagged purple tear in space (o.k 0..1 open amount)
P.tear = (o, lt) => { const k = o.kk != null ? o.k : (o.t0 != null ? clamp((lt - o.t0) / .8) : 1); if (k <= 0) return; const s = (o.s || 1) * k, col = o.col || '190,80,255';
  glow(o.x, o.y, 700 * s, `rgba(${col},A)`, .6); ctx.save(); ctx.translate(o.x, o.y); ctx.rotate((o.rot || 0) * Math.PI / 180);
  ctx.beginPath(); const N = 14; for (let i = 0; i <= N; i++) { const t = i / N, y = (t - .5) * 900 * s, w = Math.sin(t * Math.PI) * 170 * s * (1 + .2 * Math.sin(lt * 6 + i * 2)); ctx.lineTo(w * (i % 2 ? 1 : .55), y); } for (let i = N; i >= 0; i--) { const t = i / N, y = (t - .5) * 900 * s, w = Math.sin(t * Math.PI) * 170 * s * (1 + .2 * Math.sin(lt * 5 + i * 3)); ctx.lineTo(-w * (i % 2 ? .55 : 1), y); } ctx.closePath();
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 450 * s); g.addColorStop(0, '#ffffff'); g.addColorStop(.3, `rgba(${col},1)`); g.addColorStop(1, '#2a0a4a'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#f4d8ff'; ctx.lineWidth = 8; ctx.stroke();
  ctx.globalCompositeOperation = 'screen'; ctx.strokeStyle = `rgba(${col},.8)`; ctx.lineWidth = 4; for (let j = 0; j < 8; j++) { const a = j / 8 * 6.283 + lt; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 150 * s, Math.sin(a) * 380 * s); ctx.lineTo(Math.cos(a) * (260 + 60 * Math.sin(lt * 7 + j)) * s, Math.sin(a) * (520 + 60 * Math.sin(lt * 7 + j)) * s); ctx.stroke(); } ctx.restore(); };
// the Captain's small silver ship (side view), o.dir flips
P.ship = (o, lt) => go({ ...o, y: o.y + Math.sin(lt * 1.5) * 8 }, () => { glow(-300, 0, 220, 'rgba(120,200,255,A)', .7 + .2 * Math.sin(lt * 20));
  ctx.fillStyle = '#c8ccd8'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-280, -60); ctx.lineTo(160, -80); ctx.quadraticCurveTo(320, -40, 340, 10); ctx.quadraticCurveTo(300, 60, 160, 70); ctx.lineTo(-280, 60); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2a3a6a'; ctx.beginPath(); ctx.moveTo(120, -70); ctx.quadraticCurveTo(260, -50, 300, -5); ctx.lineTo(130, -10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(160,220,255,.6)'; ctx.fillRect(150, -55, 60, 12);
  ctx.fillStyle = '#9aa0b0'; ctx.beginPath(); ctx.moveTo(-200, 50); ctx.lineTo(-80, 50); ctx.lineTo(-180, 150); ctx.lineTo(-250, 150); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-200, -50); ctx.lineTo(-80, -60); ctx.lineTo(-170, -150); ctx.lineTo(-240, -150); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#c3202c'; ctx.fillRect(-120, -14, 220, 14); ctx.fillStyle = '#ffd23d'; ctx.fillRect(-120, 2, 220, 8); rr(-320, -40, 50, 80, 10, '#4a4a54', 6); for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(255,230,140,.9)'; ctx.beginPath(); ctx.arc(-60 + i * 50, 30, 8, 0, 7); ctx.fill(); } });
// Kree warship (dark wedge with blue lights)
P.kreeShip = (o, lt) => go({ ...o, y: o.y + Math.sin(lt * 1.1) * 10 }, () => { ctx.fillStyle = '#1a1e2a'; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-600, 40); ctx.lineTo(500, -120); ctx.lineTo(620, 0); ctx.lineTo(500, 120); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2a3048'; ctx.beginPath(); ctx.moveTo(-300, 10); ctx.lineTo(420, -70); ctx.lineTo(420, 60); ctx.closePath(); ctx.fill(); for (let i = 0; i < 12; i++) { const on = Math.floor(lt * 3 + i) % 4; ctx.fillStyle = on ? '#4a8aff' : '#9ad0ff'; ctx.fillRect(-400 + i * 70, 20 - i * 4, 24, 10); } glow(-600, 40, 200, 'rgba(80,140,255,A)', .6); });
// big round sun/star (o.col core, o.dim 0..1 dims)
P.star = (o, lt) => { const d = o.dimTo != null ? (o.dim ?? 0) + (o.dimTo - (o.dim ?? 0)) * (o.k ?? 1) : (o.dim ?? 0), s = o.s || 1, c1 = o.col || '255,200,80'; for (let i = 0; i < 4; i++) glow(o.x, o.y, (520 + i * 160) * s, `rgba(${c1},A)`, (.5 - i * .1) * (1 - d * .7));
  ctx.save(); const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 360 * s); g.addColorStop(0, d > .5 ? '#a8401a' : '#fff6d0'); g.addColorStop(.6, `rgba(${c1},1)`); g.addColorStop(1, d > .5 ? '#3a0a06' : '#ff7a1a'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, 360 * s, 0, 7); ctx.fill();
  ctx.globalCompositeOperation = 'screen'; ctx.strokeStyle = `rgba(${c1},${.5 * (1 - d)})`; ctx.lineWidth = 10; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + lt * .3; ctx.beginPath(); ctx.arc(o.x + Math.cos(a) * 360 * s, o.y + Math.sin(a) * 360 * s, (40 + 30 * Math.sin(lt * 3 + k)) * s, 0, 3.14); ctx.stroke(); } ctx.restore(); };
// a stack of drawing paper with a doodle (fan comic)
P.comicPage = (o, lt) => go(o, () => { rr(-170, -220, 340, 440, 8, '#fbf8ef', 5); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.strokeRect(-150, -200, 300, 190); ctx.strokeRect(-150, 0, 140, 190); ctx.strokeRect(10, 0, 140, 190);
  ctx.fillStyle = '#c3202c'; ctx.beginPath(); ctx.arc(-40, -110, 30, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#e8c878'; ctx.beginPath(); ctx.arc(-40, -150, 22, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffd23d'; ctx.font = '900 46px Inter'; ctx.fillText('POW!', 10, -120);
  ctx.fillStyle = '#1c3a8a'; ctx.beginPath(); ctx.arc(-80, 110, 26, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#c3202c'; ctx.beginPath(); ctx.arc(80, 110, 26, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.font = '700 26px Inter'; ctx.fillText('nice job kid!', 20, 40); });
// memory halo chair
P.memChair = (o, lt) => go(o, () => { rr(-110, -40, 220, 60, 20, '#4a4a58', 6); rr(-90, -320, 180, 300, 40, '#3a3a48', 6); ctx.strokeStyle = '#9ae8ff'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(0, -360, 90, 26, 0, 0, 7); ctx.stroke(); glow(0, -360, 160, 'rgba(120,220,255,A)', .4 + .2 * Math.sin(lt * 6)); rr(-20, 20, 40, 120, 8, '#2a2a34', 5); });
// escape pod
P.pod = (o, lt) => go(o, () => { ell(0, 0, 120, 90, '#e8ecf4', 7); ell(30, -10, 50, 36, '#2fc6ff', 5); ctx.fillStyle = '#c3202c'; ctx.fillRect(-110, 30, 220, 12); glow(-130, 0, 120, 'rgba(255,170,60,A)', .6); });
// singing notes floating up
P.notes = (o, lt) => { for (let i = 0; i < (o.n || 10); i++) { const ph = (lt * .35 + i * .13) % 1, x = o.x + ((i * 233) % (o.w || 1600)) - (o.w || 1600) / 2 + Math.sin(lt * 2 + i) * 40, y = o.y - ph * 600; ctx.save(); ctx.globalAlpha = Math.sin(ph * Math.PI); ctx.fillStyle = ['#ff6ab0', '#ffd23d', '#2fc6ff', '#ffffff'][i % 4]; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.font = '900 70px Inter'; ctx.strokeText(i % 2 ? '♪' : '♫', x, y); ctx.fillText(i % 2 ? '♪' : '♫', x, y); ctx.restore(); } };
// water column / wave being pulled up into the sky
P.waterSpout = (o, lt) => { ctx.save(); const k = o.t0 != null ? clamp((lt - o.t0) / 1.5) : 1; for (let i = 0; i < 40; i++) { const ph = (lt * .5 + i * .05) % 1, yy = o.y - ph * 1200 * k, w = (180 - ph * 120) * (o.s || 1); ctx.fillStyle = `rgba(${i % 2 ? '90,190,255' : '200,240,255'},${.5 * (1 - ph)})`; ctx.beginPath(); ctx.ellipse(o.x + Math.sin(lt * 3 + i) * 40 * ph, yy, w, 30, 0, 0, 7); ctx.fill(); } ctx.restore(); };
// space vacuum: sky being sucked (swirling streaks toward a point)
P.suck = (o, lt) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 50; i++) { const ph = (lt * .7 + i * .021) % 1, a = i * 2.39 + lt * .5, R = (1 - ph) * (o.r || 1400); ctx.strokeStyle = `rgba(${o.col || '200,140,255'},${.45 * ph})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(o.x, o.y, R, a, a + .35); ctx.stroke(); } ctx.restore(); };
// pizza box (for the archer girl door scene)
P.pizzaBox = (o, lt) => go(o, () => { rr(-140, -24, 280, 48, 6, '#d8b888', 5); ctx.fillStyle = '#c3202c'; ctx.font = '900 24px Inter'; ctx.textAlign = 'center'; ctx.fillText('PIZZA', 0, 9); });
})();
