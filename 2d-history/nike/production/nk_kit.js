// Nike props shared by every act: waffle iron (the running gag), swoosh, sneakers, shoe boxes, revenue counter,
// stopwatch, chalkboard, car with trunk, ring box, gavel, typewriter, line chart.
(function (G) {
  const INK = '#1d1712', ORANGE = '#f26a2a', TEAL = '#1f8a8a', K = G.KIT, E = K.E;
  const NK = G.NK = { INK, ORANGE, TEAL };
  const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16); const m = v => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))); return `rgb(${m(n >> 16)},${m(n >> 8 & 255)},${m(n & 255)})`; };
  NK.shade = shade;
  // ---- the waffle iron. state: 'hot' (sizzles, glows), 'cold' (dusty, cobweb), 'sealed' (glued shut, smoking); lid 0 closed .. 1 open
  NK.waffle = (c, x, y, s = 1, o = {}) => { const lt = o.t ?? 0, st = o.state || 'hot', lid = o.lid ?? 0; c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 6, 190, 22, 0, 0, 7); c.fill();
    // base
    c.fillStyle = '#3a3a3e'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.roundRect(-170, -70, 340, 70, 18); c.fill(); c.stroke();
    c.fillStyle = '#c8c8cc'; c.fillRect(-150, -66, 300, 10); c.fillStyle = '#2a2a2e'; for (const fx of [-140, 140]) { c.beginPath(); c.ellipse(fx, 2, 22, 8, 0, 0, 7); c.fill(); }
    // cord
    c.strokeStyle = '#1a1a1a'; c.lineWidth = 6; c.beginPath(); c.moveTo(170, -30); c.bezierCurveTo(260, -20, 240, 40, 320, 30); c.stroke();
    // lower plate grid when open
    if (lid > .05) { c.fillStyle = st === 'cold' ? '#6a6a6a' : '#4a4a4e'; c.beginPath(); c.roundRect(-150, -84, 300, 18, 6); c.fill(); c.stroke(); }
    // lid: hinged at the back (y -70), rotates up
    c.save(); c.translate(0, -70); c.scale(1, Math.cos(lid * 1.25)); c.fillStyle = st === 'cold' ? '#8a8a8e' : '#b8b8be'; c.strokeStyle = INK; c.lineWidth = 6;
    c.beginPath(); c.moveTo(-165, 0); c.quadraticCurveTo(-165, -110, 0, -118); c.quadraticCurveTo(165, -110, 165, 0); c.closePath(); c.fill(); c.stroke();
    c.save(); c.clip(); c.strokeStyle = 'rgba(40,40,44,.45)'; c.lineWidth = 4; for (let k = -6; k <= 6; k++) { c.beginPath(); c.moveTo(k * 26, -120); c.lineTo(k * 26, 0); c.stroke(); } for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-170, -k * 24); c.lineTo(170, -k * 24); c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-60, -80, 70, 14, -.2, 0, 7); c.fill(); c.restore();
    c.fillStyle = '#2a1a12'; c.beginPath(); c.roundRect(-40, -132, 80, 22, 10); c.fill(); c.stroke(); c.restore();
    // sealed: rubber oozing out of the seam
    if (st === 'sealed') { c.fillStyle = '#e0d8c0'; c.strokeStyle = INK; c.lineWidth = 3; for (const [dx, h] of [[-120, 26], [-60, 40], [10, 22], [80, 34], [140, 18]]) { c.beginPath(); c.moveTo(dx - 14, -72); c.quadraticCurveTo(dx - 16, -72 + h, dx, -72 + h + 8); c.quadraticCurveTo(dx + 16, -72 + h, dx + 14, -72); c.closePath(); c.fill(); c.stroke(); } }
    // indicator light
    c.fillStyle = st === 'hot' ? (Math.sin(lt * 6) > 0 ? '#ff4a2a' : '#c83a1a') : '#4a2a22'; c.beginPath(); c.arc(-120, -36, 10, 0, 7); c.fill();
    c.restore();
    // effects (unscaled space for nicer strokes)
    if (st === 'hot' || st === 'sealed') { for (let k = 0; k < 5; k++) { const life = (lt * .6 + k / 5) % 1, px = x + (-90 + k * 45) * s + Math.sin(lt * 2 + k) * 14 * s, py = y - (190 + life * 160) * s; c.save(); c.globalAlpha = (1 - life) * (st === 'sealed' ? .75 : .45); c.fillStyle = st === 'sealed' ? '#8a8a8a' : '#f4f4f4'; c.beginPath(); c.arc(px, py, (22 + life * 40) * s, 0, 7); c.fill(); c.restore(); }
      if (st === 'hot') { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(x, y - 70 * s, 0, x, y - 70 * s, 260 * s); g.addColorStop(0, 'rgba(255,120,40,.35)'); g.addColorStop(1, 'rgba(255,120,40,0)'); c.fillStyle = g; c.fillRect(x - 300 * s, y - 330 * s, 600 * s, 400 * s); c.restore(); } }
    if (st === 'cold') { c.save(); c.fillStyle = 'rgba(200,190,170,.35)'; for (let k = 0; k < 60; k++) c.fillRect(x + ((k * 53) % 320 - 160) * s, y + (-180 + (k * 29) % 110) * s, 4 * s, 3 * s); c.strokeStyle = 'rgba(240,240,240,.6)'; c.lineWidth = 1.5; const wx = x + 150 * s, wy = y - 160 * s; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(wx, wy); c.lineTo(wx + Math.cos(k * .5 + 1.6) * 90 * s, wy + Math.sin(k * .5 + 1.6) * 90 * s); c.stroke(); } for (let r = 20; r < 90; r += 18) { c.beginPath(); c.arc(wx, wy, r * s, 1.6, 4.1); c.stroke(); } c.restore(); }
  };
  // ---- the swoosh (fill), width ~ 2*w
  NK.swoosh = (c, x, y, w = 100, col = INK, a = 1) => { if (a <= 0) return; c.save(); c.globalAlpha *= a; c.translate(x, y); c.scale(w / 100, w / 100); c.fillStyle = col; c.beginPath();
    c.moveTo(-100, 10); c.bezierCurveTo(-120, 50, -80, 62, -30, 40); c.lineTo(110, -38); c.lineTo(-25, 22); c.bezierCurveTo(-70, 40, -95, 30, -100, 10); c.closePath(); c.fill(); c.restore(); };
  // ---- a sneaker in side view, toe pointing right (facing -1 flips). o: col, accent, sole ('flat'|'waffle'|'air'), mark ('swoosh'|'tiger'|'stripes'|null), window (air window), high (hi-top)
  NK.shoe = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s * (o.facing ?? 1), s); const col = o.col || '#f4f0e6', acc = o.accent || ORANGE, hi = o.high;
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 8, 150, 14, 0, 0, 7); c.fill();
    // sole
    c.fillStyle = o.soleCol || '#f8f6f0'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-140, -6); c.lineTo(130, -6); c.quadraticCurveTo(160, -6, 156, -22); c.lineTo(-146, -30); c.quadraticCurveTo(-152, -6, -140, -6); c.closePath(); c.fill(); c.stroke();
    if (o.sole === 'waffle') { c.fillStyle = INK; for (let k = -6; k <= 6; k++) c.fillRect(k * 21 - 5, -6, 10, 7); }
    if (o.window) { c.fillStyle = 'rgba(160,220,255,.85)'; c.beginPath(); c.roundRect(-118, -28, 70, 20, 8); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc(-96, -18, 5, 0, 7); c.arc(-74, -20, 4, 0, 7); c.fill(); }
    // upper
    c.fillStyle = col; c.beginPath(); c.moveTo(-142, -30); c.lineTo(-138, hi ? -170 : -110); c.quadraticCurveTo(-100, hi ? -184 : -122, -60, hi ? -170 : -104); c.quadraticCurveTo(10, -98, 60, -66); c.quadraticCurveTo(140, -50, 152, -24); c.closePath(); c.fill(); c.stroke();
    // toe cap + heel tab + laces
    c.fillStyle = shade(col, -.12); c.beginPath(); c.moveTo(70, -62); c.quadraticCurveTo(140, -50, 152, -24); c.lineTo(80, -28); c.closePath(); c.fill();
    c.fillStyle = acc; c.beginPath(); c.moveTo(-142, -30); c.lineTo(-139, hi ? -150 : -96); c.lineTo(-112, hi ? -140 : -90); c.lineTo(-108, -30); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 3; for (let k = 0; k < 4; k++) { const lx = -40 + k * 22, ly = -96 + k * 9; c.beginPath(); c.moveTo(lx - 10, ly - 4); c.lineTo(lx + 12, ly + 4); c.stroke(); }
    if (o.mark === 'swoosh') NK.swoosh(c, 10, -50, 52, acc);
    if (o.mark === 'tiger') { c.strokeStyle = acc; c.lineWidth = 7; for (const d of [0, 16]) { c.beginPath(); c.moveTo(-30 + d, -36); c.lineTo(10 + d, -90); c.lineTo(40 + d, -40); c.stroke(); } }
    if (o.mark === 'stripes') { c.strokeStyle = acc; c.lineWidth = 9; for (const d of [-16, 6, 28]) { c.beginPath(); c.moveTo(d - 10, -36); c.lineTo(d + 20, -92); c.stroke(); } }
    if (o.air) { c.fillStyle = '#fff'; c.font = 'bold 24px Anton'; c.textAlign = 'center'; c.fillText('AIR', -80, -46); }
    c.restore(); };
  // ---- shoe box with lid; label text
  NK.box = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); const col = o.col || ORANGE; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 6, 170, 16, 0, 0, 7); c.fill();
    c.fillStyle = shade(col, -.15); c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-150, -110, 300, 110); c.strokeRect(-150, -110, 300, 110); c.fillStyle = col; c.fillRect(-160, -140, 320, 40); c.strokeRect(-160, -140, 320, 40);
    if (o.label) { c.fillStyle = '#fff'; c.font = '40px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.label, 0, -56); } if (o.swoosh) NK.swoosh(c, 0, -60, 70, '#fff'); c.restore(); };
  // ---- revenue counter (screen, top-right): value in dollars
  NK.fmt$ = v => v >= 1e9 ? '$' + (v / 1e9).toFixed(v >= 1e10 ? 0 : 1) + ' BILLION' : v >= 1e6 ? '$' + (v / 1e6).toFixed(v >= 1e7 ? 0 : 1) + ' MILLION' : '$' + Math.round(v).toLocaleString('en-US');
  NK.revenue = (c, v, a = 1, label = 'NIKE SALES / YEAR') => { if (a <= 0) return; c.save(); c.globalAlpha = Math.min(1, a); const x = 1890, y = 40; c.font = '44px Anton'; const txt = NK.fmt$(v), w = Math.max(c.measureText(txt).width + 60, 300);
    c.fillStyle = 'rgba(20,16,12,.8)'; c.beginPath(); c.roundRect(x - w, y, w, 108, 10); c.fill(); c.strokeStyle = ORANGE; c.lineWidth = 3; c.stroke(); c.fillStyle = '#e8d8c0'; c.font = '22px Oswald'; c.textAlign = 'right'; c.fillText(label, x - 20, y + 32); c.fillStyle = '#fff'; c.font = '44px Anton'; c.fillText(txt, x - 20, y + 86); c.restore(); };
  // ---- stopwatch (hold hook or free); t drives the needle
  NK.stopwatch = (c, x, y, r = 30, t = 0) => { c.save(); c.translate(x, y); c.fillStyle = '#c8c8cc'; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .12); c.fillRect(-r * .18, -r * 1.35, r * .36, r * .3); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, r * .78, 0, 7); c.fill(); c.strokeStyle = '#c83a2a'; c.lineWidth = Math.max(1.5, r * .08); c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(t * 6) * r * .7, -Math.cos(t * 6) * r * .7); c.stroke(); c.restore(); };
  NK.holdWatch = { near: (c, t) => NK.stopwatch(c, 0, 0, 16, t) };
  // ---- chalkboard on an easel (world)
  NK.chalkboard = (c, x, y, w, h) => { c.save(); c.strokeStyle = '#5a3a20'; c.lineWidth = 14; c.beginPath(); c.moveTo(x + w * .2, y + h); c.lineTo(x + w * .1, y + h + 220); c.moveTo(x + w * .8, y + h); c.lineTo(x + w * .9, y + h + 220); c.stroke(); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 14, y + 16, w, h); c.fillStyle = '#2a3a32'; c.fillRect(x, y, w, h); c.strokeStyle = '#7a5434'; c.lineWidth = 18; c.strokeRect(x, y, w, h); c.fillStyle = 'rgba(255,255,255,.05)'; for (let k = 0; k < 30; k++) c.fillRect(x + (k * 97) % w, y + (k * 61) % h, 60, 6); c.restore(); };
  NK.chalk = (c, txt, x, y, px = 60, u = 1, align = 'left') => { if (u <= 0) return; c.save(); c.font = px + 'px Caveat'; c.fillStyle = '#f4f2ea'; c.textAlign = align; c.textBaseline = 'middle'; const n = Math.ceil(txt.length * Math.min(1, u)); c.fillText(txt.slice(0, n), x, y); c.restore(); };
  // ---- a 1960s car seen from behind/side with trunk lid (world). trunk 0 shut .. 1 open
  NK.car = (c, x, y, s = 1, o = {}) => { const trunk = o.trunk ?? 0, col = o.col || '#4a6a8a'; c.save(); c.translate(x, y); c.scale(s * (o.facing ?? 1), s);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 6, 380, 26, 0, 0, 7); c.fill();
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-360, -40); c.lineTo(-350, -130); c.lineTo(-180, -140); c.lineTo(-110, -240); c.lineTo(120, -240); c.lineTo(190, -140); c.lineTo(350, -130); c.lineTo(365, -40); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#a8c8e0'; c.beginPath(); c.moveTo(-90, -225); c.lineTo(0, -225); c.lineTo(0, -150); c.lineTo(-160, -150); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(20, -225); c.lineTo(110, -225); c.lineTo(165, -150); c.lineTo(20, -150); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#d8d8d8'; c.fillRect(-370, -56, 740, 18); c.strokeRect(-370, -56, 740, 18); c.fillStyle = '#ffd890'; c.fillRect(330, -110, 30, 22); c.fillStyle = '#c83a2a'; c.fillRect(-362, -110, 22, 26);
    for (const wx of [-230, 230]) { c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(wx, -30, 58, 0, 7); c.fill(); c.fillStyle = '#c8c8c8'; c.beginPath(); c.arc(wx, -30, 26, 0, 7); c.fill(); c.strokeStyle = '#888'; c.lineWidth = 3; for (let k = 0; k < 5; k++) { const a = k * 1.26 + (o.spin ?? 0); c.beginPath(); c.moveTo(wx, -30); c.lineTo(wx + Math.cos(a) * 24, -30 + Math.sin(a) * 24); c.stroke(); } }
    // trunk at the back (left end): lid hinges up
    if (trunk > 0) { c.save(); c.translate(-180, -140); c.rotate(-trunk * 1.2); c.fillStyle = shade(col, -.1); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.lineTo(-175, 10); c.lineTo(-180, 40); c.lineTo(0, 30); c.closePath(); c.fill(); c.stroke(); c.restore();
      c.fillStyle = '#2a2420'; c.beginPath(); c.moveTo(-180, -140); c.lineTo(-350, -130); c.lineTo(-352, -96); c.lineTo(-180, -100); c.closePath(); c.fill();
      for (let k = 0; k < 5; k++) NK.box(c, -320 + k * 32, -100 - (k % 2) * 14, .14, { col: k % 2 ? '#e8d8b8' : '#c8a070' }); }
    c.restore(); };
  // ---- small gift box with gold ring; open 0..1
  NK.ringBox = (c, x, y, s = 1, open = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a1a3a'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-80, -70, 160, 70); c.strokeRect(-80, -70, 160, 70);
    c.save(); c.translate(0, -70); c.scale(1, Math.cos(open * 1.4)); c.fillStyle = '#3a2a4a'; c.fillRect(-84, -50, 168, 50); c.strokeRect(-84, -50, 168, 50); c.restore();
    if (open > .3) { c.fillStyle = '#f0f0f0'; c.fillRect(-60, -70, 120, 20); c.strokeStyle = '#e8b44a'; c.lineWidth = 10; c.beginPath(); c.ellipse(0, -90, 30, 26, 0, 0, 7); c.stroke(); NK.swoosh(c, 0, -118, 18, '#e8b44a'); c.fillStyle = '#d0f0ff'; c.beginPath(); c.arc(16, -122, 7, 0, 7); c.fill(); } c.restore(); };
  // ---- gavel striking at u (0..1 lift)
  NK.gavel = (c, x, y, s = 1, lift = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#5a3a22'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.ellipse(0, 0, 110, 22, 0, 0, 7); c.fill(); c.stroke(); c.save(); c.translate(120, -30); c.rotate(-lift * .9); c.fillRect(-150, -10, 150, 16); c.strokeRect(-150, -10, 150, 16); c.fillRect(-190, -40, 70, 76); c.strokeRect(-190, -40, 70, 76); c.restore(); c.restore(); };
  // ---- simple line chart; pts in 0..1 space, drawn to u
  NK.line = (c, x, y, w, h, pts, u, col = ORANGE, lw = 10) => { const n = Math.max(2, Math.floor(pts.length * Math.min(1, u))); c.save(); c.strokeStyle = col; c.lineWidth = lw; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath(); pts.slice(0, n).forEach(([px, py], i) => { const X = x + px * w, Y = y + h - py * h; i ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.stroke(); c.restore(); };
  // ---- typewriter page typing text (screen)
  NK.typed = (c, txt, x, y, px, u, col = INK) => { const n = Math.floor(txt.length * Math.min(1, Math.max(0, u))); c.save(); c.font = px + 'px "Courier New", monospace'; c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(txt.slice(0, n), x, y); c.restore(); };
  // ---- paper sheet (world/screen)
  NK.paper = (c, x, y, w, h, rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); c.fillStyle = '#f8f4e8'; c.fillRect(-w / 2, -h / 2, w, h); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(-w / 2, -h / 2, w, h); c.restore(); };
  // ---- a cap for coaches (rig hat hook)
  NK.cap = (col = '#2a4a3a') => (c, hx, hy, r) => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .06); c.beginPath(); c.arc(hx, hy - r * .55, r * .82, Math.PI, 0); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.ellipse(hx + r * .7, hy - r * .55, r * .55, r * .12, 0, 0, 7); c.fill(); c.stroke(); c.restore(); };
  // ---- pour of liquid rubber from a jug (world). u 0..1 pour amount
  NK.pour = (c, x, y, u, lt) => { if (u <= 0) return; c.save(); c.strokeStyle = '#e8dcc0'; c.lineWidth = 14 + Math.sin(lt * 9) * 2; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 6, y + 60, x + 2, y + 130 * Math.min(1, u * 3)); c.stroke(); c.restore(); };
})(window);
