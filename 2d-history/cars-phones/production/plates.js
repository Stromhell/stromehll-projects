// Cars-into-Phones (CP) background plates. Paint:
//   node shared/p2/paint.js cars-phones/production/plates.js cars-phones/production/plates motorway,showroom
// Plates are 2560x1440. Helpers copied from prime/production/plates.js.
(function () {
const gl = (c, x, y, rad, col, a, comp = 'screen') => { c.save(); c.globalCompositeOperation = comp; const g = c.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(.4, `rgba(${col},${a * .4})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); c.restore(); };
const vg = (c, x, y, w, h, stops) => { const g = c.createLinearGradient(0, y, 0, y + h); stops.forEach(([t, col]) => g.addColorStop(t, col)); c.fillStyle = g; c.fillRect(x, y, w, h); };
const hg = (c, x, y, w, h, stops) => { const g = c.createLinearGradient(x, 0, x + w, 0); stops.forEach(([t, col]) => g.addColorStop(t, col)); c.fillStyle = g; c.fillRect(x, y, w, h); };
const rr = (c, x, y, w, h, rad) => { c.beginPath(); c.roundRect(x, y, w, h, rad); };
const poly = (c, pts) => { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (const p of pts.slice(1)) c.lineTo(p[0], p[1]); c.closePath(); };
// soft downward light cone from (x,y)
const cone = (c, x, y, w0, w1, len, col, a) => { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, y, 0, y + len); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; poly(c, [[x - w0 / 2, y], [x + w0 / 2, y], [x + w1 / 2, y + len], [x - w1 / 2, y + len]]); c.fill(); c.restore(); };
// mirror the band just above y0 into the floor below it, blurred and fading out
const reflect = (c, y0, h, a, blur = 4) => { const W = c.canvas.width, t = document.createElement('canvas'); t.width = W; t.height = h; const tc = t.getContext('2d'); tc.filter = `blur(${blur}px)`; tc.translate(0, h); tc.scale(1, -1); tc.drawImage(c.canvas, 0, y0 - h, W, h, 0, 0, W, h); tc.setTransform(1, 0, 0, 1, 0, 0); tc.filter = 'none';
  tc.globalCompositeOperation = 'destination-in'; const g = tc.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); tc.fillStyle = g; tc.fillRect(0, 0, W, h); c.save(); c.globalAlpha = a; c.drawImage(t, 0, y0); c.restore(); };
const shadow = (c, x, y, rx, ry, a = .45) => { c.save(); c.translate(x, y); c.scale(1, ry / rx); const g = c.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(10,6,4,${a})`); g.addColorStop(1, 'rgba(10,6,4,0)'); c.fillStyle = g; c.fillRect(-rx, -rx, rx * 2, rx * 2); c.restore(); };
// abstract CJK-looking glyph made of strokes (not real characters)
const glyph = (c, r, x, y, s, col, lw) => { c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'square'; c.beginPath(); const n = r.int(4, 6);
  for (let i = 0; i < n; i++) { const k = r(); if (k < .45) { const yy = y + s * (.1 + r() * .8), x0 = x + s * r() * .3; c.moveTo(x0, yy); c.lineTo(x0 + s * (.4 + r() * .5), yy); } else if (k < .85) { const xx = x + s * (.1 + r() * .8), y0 = y + s * r() * .3; c.moveTo(xx, y0); c.lineTo(xx, y0 + s * (.4 + r() * .6)); } else { const xx = x + s * r() * .5; c.moveTo(xx, y + s * .2); c.lineTo(xx + s * .4, y + s * .9); } } c.stroke(); };
const neon = (c, r, x, y, s, n, col, vert = true) => { const w = vert ? s * 1.35 : s * 1.3 * n + s * .2, h = vert ? s * 1.3 * n + s * .2 : s * 1.35; gl(c, x + w / 2, y + h / 2, Math.max(w, h) * .9, col, .32);
  c.fillStyle = 'rgba(12,8,16,.88)'; c.fillRect(x, y, w, h); c.strokeStyle = `rgba(${col},.85)`; c.lineWidth = Math.max(2, s * .06); c.strokeRect(x + 3, y + 3, w - 6, h - 6);
  const seed = r.int(1, 1e6); for (let pass = 0; pass < 2; pass++) { const rg = P2.RNG(seed); for (let i = 0; i < n; i++) { const gx = vert ? x + s * .18 : x + s * .2 + i * s * 1.3, gy = vert ? y + s * .2 + i * s * 1.3 : y + s * .18; glyph(c, rg, gx, gy, s, pass ? 'rgba(255,250,245,.85)' : `rgba(${col},.9)`, pass ? s * .05 : s * .14); } } };
// a night city painted inside a box, layered far to near with lit windows, haze, roof beacons and optional neon
const city = (c, r, x, y, w, h, o = {}) => { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  vg(c, x, y, w, h, o.sky || [[0, '#070b1e'], [.55, '#1b2048'], [1, '#4a2c52']]);
  for (let i = 0; i < (o.stars ?? 140); i++) { c.fillStyle = `rgba(255,255,255,${r.range(.15, .6)})`; c.fillRect(x + r() * w, y + r() * h * .45, 2, 2); }
  if (o.moon) { gl(c, o.moon[0], o.moon[1], 160, '220,225,255', .35); c.fillStyle = '#eef0fa'; c.beginPath(); c.arc(o.moon[0], o.moon[1], 34, 0, 7); c.fill(); }
  const base = y + h, layers = o.layers || [{ h: [.18, .42], col: '#1c2040', win: '255,200,150', p: .22, ws: 4 }, { h: [.22, .58], col: '#151732', win: '255,212,150', p: .32, ws: 6 }, { h: [.12, .38], col: '#0d0e20', win: '255,222,165', p: .42, ws: 8 }];
  layers.forEach((L, li) => { if (o.landmark && li === (o.landmarkLayer ?? 1)) o.landmark(c, r, base);
    let bx = x - 40; while (bx < x + w) { const bw = r.range(60, 170) * (1 + li * .35), bh = h * r.range(L.h[0], L.h[1]), top = base - bh;
      c.fillStyle = L.col; c.fillRect(bx, top, bw, bh); c.fillStyle = 'rgba(130,150,210,.09)'; c.fillRect(bx, top, 3, bh); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(bx + bw - 6, top, 6, bh);
      if (r() < .3) { c.fillStyle = L.col; c.fillRect(bx + bw * .3, top - 30, bw * .4, 30); }
      const ws = L.ws, wc = L.win.split(',').map(Number); for (let wy = top + ws * 2; wy < base - ws; wy += ws * 2.3) for (let wx = bx + ws; wx < bx + bw - ws * 1.5; wx += ws * 1.9) if (r() < L.p) { const k = r.range(.4, .95), cool = r() < (o.cool ?? .15); c.fillStyle = cool ? `rgba(180,215,255,${k})` : `rgba(${wc[0]},${wc[1]},${wc[2]},${k})`; c.fillRect(wx, wy, ws, ws * 1.15); }
      if (r() < .22) { c.fillStyle = '#ff4a38'; c.fillRect(bx + bw / 2 - 3, top - 6, 6, 6); gl(c, bx + bw / 2, top - 3, 20, '255,70,50', .55); }
      if (o.neon && li === layers.length - 1 && r() < o.neon) { const s = r.range(20, 34); neon(c, r, bx + r.range(6, Math.max(8, bw - s * 1.5)), top + r.range(10, Math.max(12, bh * .45)), s, r.int(3, 5), r.pick(['255,70,160', '60,230,255', '255,150,40', '120,255,140', '255,60,60'])); }
      bx += bw + r.range(-12, 18); }
    vg(c, x, base - h * .45, w, h * .45, [[0, 'rgba(0,0,0,0)'], [1, o.haze || 'rgba(130,70,120,.28)']]); });
  if (o.fg) o.fg(c, r, base); c.restore(); };
const bottle = (c, r, x, base, s, col) => { const h = r.range(70, 118) * s, w = r.range(22, 36) * s, neck = h * r.range(.28, .42), sq = r() < .5;
  c.fillStyle = `rgba(${col},.88)`; rr(c, x - w / 2, base - h + neck, w, h - neck, sq ? 3 : w * .35); c.fill(); c.fillRect(x - w * .17, base - h, w * .34, neck + 6);
  c.fillStyle = r() < .5 ? '#2a1a10' : '#c9a24a'; c.fillRect(x - w * .2, base - h - 6, w * .4, 10); c.fillStyle = r.pick(['#efe6d0', '#1a1a1a', '#c9b080', '#7a2a20']); c.fillRect(x - w * .4, base - h * .45, w * .8, h * .22);
  c.fillStyle = 'rgba(255,245,220,.45)'; c.fillRect(x - w * .32, base - h + neck + 6, w * .12, h - neck - 14); };
const tumbler = (c, x, base, s, fill = '255,160,60') => { c.fillStyle = 'rgba(220,230,240,.25)'; c.fillRect(x - 18 * s, base - 40 * s, 36 * s, 40 * s); c.fillStyle = `rgba(${fill},.75)`; c.fillRect(x - 16 * s, base - 20 * s, 32 * s, 18 * s); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(x - 15 * s, base - 38 * s, 4 * s, 34 * s); };
// tufted leather armchair seen from the front
const armchair = (c, x, fy, s, col, lite = '255,190,120') => { shadow(c, x, fy, 170 * s, 26 * s, .55); const dk = P2.rgb(P2.shade(col, -.4)), lt = P2.rgb(P2.shade(col, .2));
  c.fillStyle = dk; c.fillRect(x - 110 * s, fy - 22 * s, 12 * s, 22 * s); c.fillRect(x + 98 * s, fy - 22 * s, 12 * s, 22 * s);
  let g = c.createLinearGradient(0, fy - 290 * s, 0, fy - 120 * s); g.addColorStop(0, lt); g.addColorStop(1, dk); c.fillStyle = g; rr(c, x - 115 * s, fy - 290 * s, 230 * s, 190 * s, 36 * s); c.fill();
  c.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { c.beginPath(); c.arc(x + (i - 1) * 60 * s + (j ? 30 * s : 0), fy - 250 * s + j * 50 * s, 5 * s, 0, 7); c.fill(); }
  g = c.createLinearGradient(0, fy - 140 * s, 0, fy - 20 * s); g.addColorStop(0, lt); g.addColorStop(1, dk); c.fillStyle = g; rr(c, x - 125 * s, fy - 135 * s, 250 * s, 115 * s, 24 * s); c.fill();
  for (const sx of [-1, 1]) { g = c.createLinearGradient(x + sx * 140 * s, 0, x + sx * 90 * s, 0); g.addColorStop(0, dk); g.addColorStop(1, lt); c.fillStyle = g; rr(c, x + sx * 115 * s - 32 * s, fy - 190 * s, 64 * s, 170 * s, 26 * s); c.fill(); }
  c.fillStyle = `rgba(${lite},.22)`; rr(c, x - 100 * s, fy - 284 * s, 140 * s, 18 * s, 9 * s); c.fill(); };
const sofa = (c, x, fy, w, s, col, o = {}) => { shadow(c, x + w / 2, fy, w * .62, 30 * s, .55); const dk = P2.rgb(P2.shade(col, -.38)), lt = P2.rgb(P2.shade(col, .18)), h = o.h ?? 1;
  c.fillStyle = o.leg || '#1a1410'; c.fillRect(x + 20 * s, fy - 20 * s, 12 * s, 20 * s); c.fillRect(x + w - 32 * s, fy - 20 * s, 12 * s, 20 * s);
  let g = c.createLinearGradient(0, fy - 260 * s * h, 0, fy - 110 * s); g.addColorStop(0, lt); g.addColorStop(1, dk); c.fillStyle = g; rr(c, x + 30 * s, fy - 260 * s * h, w - 60 * s, 170 * s * h, (o.rad ?? 24) * s); c.fill();
  const nc = o.cushions ?? 3, cw = (w - 120 * s) / nc; for (let i = 0; i < nc; i++) { g = c.createLinearGradient(0, fy - 240 * s * h, 0, fy - 120 * s); g.addColorStop(0, P2.rgb(P2.shade(col, .26))); g.addColorStop(1, P2.rgb(P2.shade(col, -.15))); c.fillStyle = g; rr(c, x + 60 * s + i * cw + 6, fy - 240 * s * h, cw - 12, 120 * s * h, 18 * s); c.fill(); }
  g = c.createLinearGradient(0, fy - 130 * s, 0, fy - 20 * s); g.addColorStop(0, lt); g.addColorStop(1, dk); c.fillStyle = g; rr(c, x + 20 * s, fy - 130 * s, w - 40 * s, 110 * s, 18 * s); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for (let i = 1; i < nc; i++) { c.beginPath(); c.moveTo(x + 60 * s + i * cw, fy - 125 * s); c.lineTo(x + 60 * s + i * cw, fy - 80 * s); c.stroke(); }
  for (const sx of [0, 1]) { const ax = sx ? x + w - 70 * s : x; g = c.createLinearGradient(ax, 0, ax + 70 * s, 0); g.addColorStop(sx ? 1 : 0, dk); g.addColorStop(sx ? 0 : 1, lt); c.fillStyle = g; rr(c, ax, fy - 190 * s, 70 * s, 170 * s, 22 * s); c.fill(); }
  if (o.pillow) { c.fillStyle = o.pillow; rr(c, x + 80 * s, fy - 210 * s, 110 * s, 95 * s, 20 * s); c.fill(); rr(c, x + w - 190 * s, fy - 210 * s, 110 * s, 95 * s, 20 * s); c.fill(); } };
const pendant = (c, x, y0, y1, col = '255,180,90', s = 1) => { c.strokeStyle = '#111'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke();
  cone(c, x, y1 + 40 * s, 80 * s, 640 * s, 900 * s, col, .1); gl(c, x, y1 + 40 * s, 360 * s, col, .4);
  const g = c.createLinearGradient(x - 50 * s, 0, x + 50 * s, 0); g.addColorStop(0, '#5a3a1a'); g.addColorStop(.5, '#c88a3a'); g.addColorStop(1, '#4a2a10'); c.fillStyle = g; poly(c, [[x - 18 * s, y1], [x + 18 * s, y1], [x + 52 * s, y1 + 44 * s], [x - 52 * s, y1 + 44 * s]]); c.fill();
  c.fillStyle = '#fff2c8'; c.beginPath(); c.ellipse(x, y1 + 44 * s, 46 * s, 8 * s, 0, 0, 7); c.fill(); gl(c, x, y1 + 50 * s, 90 * s, '255,230,170', .8); };
const lampPost = (c, x, base, h, col = '255,215,150', s = 1) => { c.fillStyle = '#16161a'; c.fillRect(x - 6 * s, base - h, 12 * s, h); c.fillRect(x - 16 * s, base - 30 * s, 32 * s, 30 * s); c.fillRect(x - 22 * s, base - h - 8 * s, 44 * s, 10 * s);
  c.fillStyle = `rgb(${col})`; poly(c, [[x - 18 * s, base - h - 8 * s], [x + 18 * s, base - h - 8 * s], [x + 12 * s, base - h - 56 * s], [x - 12 * s, base - h - 56 * s]]); c.fill(); c.fillStyle = '#16161a'; c.fillRect(x - 16 * s, base - h - 64 * s, 32 * s, 8 * s); gl(c, x, base - h - 32 * s, 260 * s, col, .45); gl(c, x, base, 200 * s, col, .14); };
const palm = (c, r, x, base, h, lean, lit = '255,190,120') => { const tx = x + lean, ty = base - h; c.lineCap = 'round';
  for (let i = 0; i <= 60; i++) { const t = i / 60, px = x + lean * t * t, py = base - h * t, w = 34 - 16 * t; c.strokeStyle = i % 3 ? '#3a2c22' : '#22180f'; c.lineWidth = h / 60 + 3; c.beginPath(); c.moveTo(px - w / 2, py); c.lineTo(px + w / 2, py); c.stroke(); }
  c.fillStyle = `rgba(${lit},.12)`; c.beginPath(); c.moveTo(x - 17, base); c.quadraticCurveTo(x + lean * .25 - 10, base - h * .5, tx - 9, ty); c.lineTo(tx - 3, ty); c.quadraticCurveTo(x + lean * .25, base - h * .5, x - 6, base); c.fill();
  for (let f = 0; f < 11; f++) { const a = -Math.PI / 2 + (f / 10 - .5) * Math.PI * 1.9 + r.gauss() * .1, L = r.range(220, 300) * h / 900; const pts = []; for (let k = 0; k <= 20; k++) { const t = k / 20; pts.push([tx + Math.cos(a) * L * t, ty + Math.sin(a) * L * t + t * t * L * .7]); }
    for (let k = 1; k < 20; k++) { const [px, py] = pts[k], [qx, qy] = pts[k - 1], ang = Math.atan2(py - qy, px - qx), ll = (1 - k / 22) * L * .28; for (const sd of [-1, 1]) { c.strokeStyle = (k + f) % 4 ? '#1a3322' : '#24442c'; c.lineWidth = 5; c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(ang + sd * 1.1) * ll, py + Math.sin(ang + sd * 1.1) * ll + ll * .5); c.stroke(); } }
    c.strokeStyle = '#2a3a22'; c.lineWidth = 5; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); }
  gl(c, tx, ty + 60, 200, lit, .12); };
const bareTree = (c, r, x, y, ang, len, w, d, col) => { if (d === 0 || len < 6) return; const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len; c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + Math.cos(ang + .2) * len * .5, y + Math.sin(ang + .2) * len * .5, ex, ey); c.stroke();
  const n = d > 5 ? 2 : r.int(2, 3); for (let i = 0; i < n; i++) bareTree(c, r, ex, ey, ang + r.range(-.6, .6), len * r.range(.62, .8), w * .66, d - 1, col); };
// a flag drawn flat into a temp canvas then laid down in waving slices
const flagCanvas = (us, w, h) => { const t = document.createElement('canvas'); t.width = w; t.height = h; const tc = t.getContext('2d');
  if (us) { for (let i = 0; i < 13; i++) { tc.fillStyle = i % 2 ? '#f2eee6' : '#b4222c'; tc.fillRect(0, i * h / 13, w, h / 13 + 1); } tc.fillStyle = '#23305e'; tc.fillRect(0, 0, w * .42, h * 7 / 13); tc.fillStyle = '#f4f2ea'; for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) { tc.beginPath(); tc.arc(w * .42 * (i + .5 + (j % 2) * .25) / 6.3, h * 7 / 13 * (j + .5) / 5, Math.max(1.5, h * .018), 0, 7); tc.fill(); } }
  else { tc.fillStyle = '#1e2d5a'; tc.fillRect(0, 0, w, h); tc.strokeStyle = '#c9a24a'; tc.lineWidth = Math.max(2, w * .03); tc.strokeRect(w * .04, h * .04, w * .92, h * .92); } return t; };
const wavingFlag = (c, us, x, y, w, h, amp, ph = 0) => { const t = flagCanvas(us, w, h); for (let sx = 0; sx < w; sx += 3) { const k = sx / w, dy = Math.sin(k * 7 + ph) * amp * k; c.drawImage(t, sx, 0, 3, h, x + sx, y + dy, 3, h); const sh = Math.cos(k * 7 + ph) * .3 * k; c.fillStyle = sh > 0 ? `rgba(255,255,255,${sh * .5})` : `rgba(0,0,0,${-sh})`; c.fillRect(x + sx, y + dy, 3, h); } };
const hangFlag = (c, us, x, top, w, h) => { c.fillStyle = '#2a1e12'; c.fillRect(x - 6, top - 40, 12, h + 520); c.fillStyle = '#d8b050'; c.beginPath(); c.moveTo(x, top - 90); c.lineTo(x - 16, top - 40); c.lineTo(x + 16, top - 40); c.fill(); c.beginPath(); c.arc(x, top - 40, 14, 0, 7); c.fill();
  const t = flagCanvas(us, 300, 158); c.save(); c.beginPath(); c.moveTo(x + 6, top); c.lineTo(x + 6 + w, top + 20); c.quadraticCurveTo(x + w * .9, top + h * .6, x + w * .55, top + h); c.lineTo(x + 6, top + h * .92); c.closePath(); c.clip(); c.drawImage(t, x + 6, top, w, h * .8);
  c.drawImage(t, 0, 60, 300, 98, x + 6, top + h * .8, w, h * .25); for (let i = 0; i < 6; i++) { const fx = x + 6 + i * w / 6; c.fillStyle = 'rgba(0,0,0,.28)'; c.fillRect(fx, top, w / 14, h); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(fx + w / 12, top, w / 22, h); } c.restore();
  c.strokeStyle = '#d8b050'; c.lineWidth = 8; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(x + 6, top + h * .92); c.lineTo(x + w * .55, top + h); c.stroke(); c.setLineDash([]); };
const done = (c, r, W, H, P, o = {}) => { ENV.impasto(c, r, W, H, { n: o.n ?? 70000, edge: 22 }); P.finish(c, r, W, H, { oil: 0, canvas: 5, grain: 7, vig: o.vig ?? .42 }); };
const planks = (c, r, y0, y1, col, rows = 12) => { const W = c.canvas.width; vg(c, 0, y0, W, y1 - y0, [[0, P2.rgb(P2.shade(col, -.15))], [1, P2.rgb(P2.shade(col, .05))]]);
  P2.fillStrokes(c, r, [0, y0, W, y1 - y0], () => true, { n: 6000, len: [60, 200], w: [4, 10], ang: 0, angJ: .02, al: .22, colFn: () => P2.shade(P2.jitter(col, r, 14), r.range(-.15, .12)) });
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; let y = y0; for (let i = 0; i < rows; i++) { const hh = (y1 - y0) * (Math.pow((i + 1) / rows, 1.6) - Math.pow(i / rows, 1.6)); y += hh; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); let x = r() * 300; while (x < W) { c.beginPath(); c.moveTo(x, y - hh); c.lineTo(x, y); c.stroke(); x += r.range(300, 600) * (.4 + i / rows); } } };

// ---- prime helpers ----
const txt = (c, s, x, y, size, col, o = {}) => { c.save(); c.font = `${o.w || 800} ${size}px ${o.f || 'Arial, Helvetica, sans-serif'}`; c.textAlign = o.al || 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(s, x, y); c.restore(); };
// rows of crowd heads+shoulders from far (y0, small) to near (y1, big), with optional phone lights
const crowd = (c, r, x0, x1, y0, y1, o = {}) => { const rows = o.rows || 14, s0 = o.s0 || 6, s1 = o.s1 || 14;
  for (let i = 0; i < rows; i++) { const t = i / Math.max(1, rows - 1), y = y0 + (y1 - y0) * t, s = s0 + (s1 - s0) * t;
    for (let x = x0 + r() * s; x < x1; x += s * r.range(1.5, 2.2)) { const k = r.range(0, 1), col = P2.shade(P2.jitter(o.col || '#1a1c2a', r, 10), (o.lit || 0) * k - .05);
      c.fillStyle = P2.rgb(col); const hy = y - r() * s * .5; c.beginPath(); c.arc(x, hy, s * .72, 0, 7); c.fill(); rr(c, x - s, hy + s * .45, s * 2, s * 2, s * .6); c.fill();
      if (o.rim && r() < .6) { c.fillStyle = `rgba(${o.rim},${.25 * k})`; c.beginPath(); c.arc(x, hy - s * .15, s * .6, Math.PI * 1.1, Math.PI * 1.9); c.fill(); }
      if (o.shirt && r() < .35) { c.fillStyle = P2.rgb(P2.jitter(r.pick(o.shirt), r, 12), .55); c.fillRect(x - s * .9, hy + s * .7, s * 1.8, s * 1.2); }
      if (r() < (o.phone || 0)) { c.fillStyle = 'rgba(240,248,255,.95)'; c.fillRect(x + s * .3, hy - s * 1.4, s * .55, s * .8); gl(c, x + s * .55, hy - s, s * 5, '200,225,255', .3); } } } };
const drizzle = (c, r, W, H, n, a = .18) => { c.save(); c.lineCap = 'round'; for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, L = r.range(18, 60); c.strokeStyle = `rgba(225,230,240,${a * r.range(.4, 1)})`; c.lineWidth = r.range(1, 2.4); c.beginPath(); c.moveTo(x, y); c.lineTo(x - L * .18, y + L); c.stroke(); } c.restore(); };
const bricks = (c, r, x, y, w, h, base, o = {}) => { const bw = o.bw || 52, bh = o.bh || 20; c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = o.mortar || '#8a7a6a'; c.fillRect(x, y, w, h);
  for (let j = 0, yy = y; yy < y + h; j++, yy += bh) for (let xx = x - (j % 2 ? bw / 2 : 0); xx < x + w; xx += bw) { c.fillStyle = P2.rgb(P2.shade(P2.jitter(base, r, 16), r.range(-.12, .08))); c.fillRect(xx + 2, yy + 2, bw - 3, bh - 3); if (r() < .3) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(xx + 2 + r() * bw * .6, yy + 2, bw * .3, bh - 3); } }
  c.restore(); };
// floor lines receding to a vanishing point
const persLines = (c, y0, y1, vx, n, col, lw = 2) => { const W = c.canvas.width; c.strokeStyle = col; c.lineWidth = lw; for (let i = -n; i <= n * 2; i++) { const bx = (i / n) * W; c.beginPath(); c.moveTo(vx + (bx - vx) * .02, y0); c.lineTo(bx, y1); c.stroke(); }
  for (let k = 1; k < 14; k++) { const yy = y0 + (y1 - y0) * Math.pow(k / 14, 1.8); c.beginPath(); c.moveTo(0, yy); c.lineTo(W, yy); c.stroke(); } };
const sparkle = (c, x, y, s, col, a) => { gl(c, x, y, s * 4, col, a * .5); c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = `rgba(${col},${a})`; poly(c, [[x, y - s * 2], [x + s * .25, y - s * .25], [x + s * 2, y], [x + s * .25, y + s * .25], [x, y + s * 2], [x - s * .25, y + s * .25], [x - s * 2, y], [x - s * .25, y - s * .25]]); c.fill(); c.restore(); };
const micArm = (c, bx, by, ex, ey, mx, my, dir) => { c.lineCap = 'round'; c.strokeStyle = '#121418'; c.lineWidth = 16; c.beginPath(); c.moveTo(bx, by); c.lineTo(ex, ey); c.lineTo(mx - dir * 30, my - 40); c.stroke(); c.strokeStyle = 'rgba(160,180,200,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(bx - 5, by); c.lineTo(ex - 5, ey); c.lineTo(mx - dir * 30, my - 44); c.stroke();
  c.fillStyle = '#22252c'; c.beginPath(); c.arc(ex, ey, 14, 0, 7); c.fill(); c.fillRect(bx - 26, by - 10, 52, 22);
  c.save(); c.translate(mx, my); c.rotate(dir * .35); const g = c.createLinearGradient(-36, 0, 36, 0); g.addColorStop(0, '#1a1c22'); g.addColorStop(.45, '#5a606c'); g.addColorStop(1, '#14161a'); c.fillStyle = g; rr(c, -34, -70, 68, 150, 30); c.fill();
  c.strokeStyle = 'rgba(200,210,220,.25)'; c.lineWidth = 2; for (let k = -60; k < 0; k += 8) { c.beginPath(); c.moveTo(-28, k); c.lineTo(28, k); c.stroke(); } c.fillStyle = '#b8bcc4'; c.fillRect(-34, 0, 68, 8); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-20, -62, 7, 120); c.restore(); };
const camTripod = (c, x, fy, s, dir) => { shadow(c, x, fy, 120 * s, 18 * s, .5); c.strokeStyle = '#15161a'; c.lineWidth = 7 * s; c.lineCap = 'round'; const hy = fy - 330 * s; for (const dx of [-90, 0, 90]) { c.beginPath(); c.moveTo(x, hy); c.lineTo(x + dx * s, fy); c.stroke(); }
  c.fillStyle = '#1e2026'; rr(c, x - 90 * s + dir * 30 * s, hy - 120 * s, 180 * s, 110 * s, 12 * s); c.fill(); c.fillStyle = '#2c2f38'; rr(c, x + dir * 110 * s - 40 * s, hy - 100 * s, 80 * s, 74 * s, 10 * s); c.fill();
  c.fillStyle = '#0a0b0e'; c.beginPath(); c.arc(x + dir * 150 * s, hy - 63 * s, 32 * s, 0, 7); c.fill(); c.fillStyle = 'rgba(120,160,220,.5)'; c.beginPath(); c.arc(x + dir * 145 * s, hy - 70 * s, 10 * s, 0, 7); c.fill(); c.fillStyle = '#ff3030'; c.fillRect(x - 70 * s, hy - 110 * s, 8 * s, 8 * s);
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x - 86 * s, hy - 116 * s, 170 * s, 6 * s); };
const fluoro = (c, x, y, w, h = 18) => { gl(c, x + w / 2, y + h, w * .7, '225,240,255', .25); c.fillStyle = '#d0d6dc'; c.fillRect(x - 6, y - 6, w + 12, h + 12); c.fillStyle = '#f4fbff'; c.fillRect(x, y, w, h); };

// ---- CP helpers ----
const tex = (c, r, x, y, w, h, col, o = {}) => P2.fillStrokes(c, r, [x, y, w, h], () => true, { n: o.n || Math.round(w * h / 600), len: o.len || [20, 80], w: o.w || [3, 8], ang: o.ang ?? 0, angJ: o.angJ ?? .3, al: o.al ?? .18, colFn: () => P2.shade(P2.jitter(col, r, o.j ?? 12), r.range(-.12, .1)) });
const pine = (c, r, x, base, h, col = '#1a2a22', lit) => { const w = h * .32; c.fillStyle = '#2a1e16'; c.fillRect(x - h * .015, base - h * .2, h * .03, h * .2);
  for (let k = 0; k < 7; k++) { const t = k / 7, yy = base - h * .15 - t * h * .85, ww = w * (1 - t) + 6; c.fillStyle = P2.rgb(P2.shade(P2.jitter(col, r, 6), -.05 + t * .08)); poly(c, [[x - ww, yy], [x + ww, yy], [x + ww * .1, yy - h * .2], [x - ww * .1, yy - h * .2]]); c.fill(); if (lit) { c.fillStyle = `rgba(${lit},.18)`; poly(c, [[x + ww * .2, yy], [x + ww, yy], [x + ww * .1, yy - h * .2]]); c.fill(); } }
  c.fillStyle = P2.rgb(col); poly(c, [[x - 4, base - h * .9], [x + 4, base - h * .9], [x, base - h]]); c.fill(); };
// crushed car slab seen from the side
const slab = (c, r, x, y, w, h, col) => { const k = P2.shade(P2.jitter(col, r, 30), r.range(-.25, .05)); c.fillStyle = P2.rgb(k); poly(c, [[x, y + h], [x + w * .02, y + h * .2], [x + w * .2, y + r() * h * .2], [x + w * .8, y + r() * h * .15], [x + w, y + h * .3], [x + w, y + h]]); c.fill();
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x, y + h * .7, w, h * .3); c.fillStyle = 'rgba(30,36,44,.8)'; for (let i = 0; i < 3; i++) c.fillRect(x + w * (.22 + i * .2), y + h * .25, w * .16, h * .22);
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x + 4, y + h * .2, w - 8, 3); c.fillStyle = 'rgba(120,60,30,.35)'; for (let i = 0; i < 4; i++) c.fillRect(x + r() * w * .9, y + h * (.4 + r() * .5), r.range(10, 40), r.range(4, 10));
  if (r() < .5) { c.fillStyle = '#151515'; c.beginPath(); c.arc(x + w * r.range(.15, .85), y + h * .85, h * .18, 0, 7); c.fill(); } };
const column = (c, x, top, base, w, lit = '255,220,170') => { const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#5a4a3a'); g.addColorStop(.35, '#e8d6b4'); g.addColorStop(.6, '#c8b090'); g.addColorStop(1, '#4a3a2c'); c.fillStyle = g; c.fillRect(x - w / 2, top, w, base - top);
  c.strokeStyle = 'rgba(60,40,20,.3)'; c.lineWidth = 3; for (let i = 1; i < 6; i++) { const xx = x - w / 2 + i * w / 6; c.beginPath(); c.moveTo(xx, top + 30); c.lineTo(xx, base - 30); c.stroke(); }
  c.fillStyle = '#d8c4a0'; c.fillRect(x - w * .7, top - 30, w * 1.4, 34); c.fillRect(x - w * .65, base - 34, w * 1.3, 34); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x - w * .7, top, w * 1.4, 6); };
const poster = (c, r, x, y, w, h, bg, ink) => { c.fillStyle = '#1a1410'; c.fillRect(x - 8, y - 8, w + 16, h + 16); vg(c, x, y, w, h, [[0, bg], [1, P2.rgb(P2.shade(bg, -.3))]]);
  c.fillStyle = ink; c.beginPath(); c.moveTo(x + w * .1, y + h * .68); c.quadraticCurveTo(x + w * .3, y + h * .5, x + w * .6, y + h * .52); c.quadraticCurveTo(x + w * .85, y + h * .55, x + w * .9, y + h * .68); c.closePath(); c.fill();
  for (const t of [.28, .74]) { c.fillStyle = '#111'; c.beginPath(); c.arc(x + w * t, y + h * .69, w * .08, 0, 7); c.fill(); } c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(x + w * .1, y + h * .8, w * .8, h * .04); c.fillRect(x + w * .25, y + h * .88, w * .5, h * .025);
  c.fillStyle = ink; c.beginPath(); c.arc(x + w * .75, y + h * .22, w * .12, 0, 7); c.fill(); c.fillStyle = 'rgba(255,240,210,.08)'; c.fillRect(x, y, w, h * .4); };
const spot = (c, x, y, s = 1) => { c.fillStyle = '#16181c'; rr(c, x - 22 * s, y - 10 * s, 44 * s, 40 * s, 8 * s); c.fill(); c.fillStyle = '#fff6e0'; c.beginPath(); c.ellipse(x, y + 30 * s, 18 * s, 6 * s, 0, 0, 7); c.fill(); gl(c, x, y + 30 * s, 90 * s, '255,240,210', .6); };

window.PLATES = {
  // 1. Driver's view, M62 at dusk in rain. Windscreen view y 90-1000; dashboard top edge y 1000 (lower 440 px plain dash for overlays). Road vanishing point (1280, 600).
  motorway: (c, r, W, H, P) => { const hz = 600, vx = 1280, dy = 1000;
    vg(c, 0, 0, W, hz, [[0, '#3a3e4a'], [.45, '#6a6470'], [.8, '#c88a62'], [1, '#e8a870']]); gl(c, 1700, hz - 40, 700, '255,170,100', .5);
    ENV.clouds(c, r, W, 60, 420, 14, '#a8909a', '#6a6470', '#3e404c'); ENV.clouds(c, r, W, 380, 540, 8, '#e8b088', '#b08078', '#7a6a72', { scale: .7 });
    for (const [col, amp, base, f] of [['#5a5466', 70, hz - 30, .002], ['#46404e', 90, hz - 6, .0031], ['#38363e', 40, hz + 4, .006]]) { c.fillStyle = col; c.beginPath(); c.moveTo(0, hz + 10); for (let x = 0; x <= W; x += 20) c.lineTo(x, base - amp * (.5 + .5 * Math.sin(x * f + base))); c.lineTo(W, hz + 10); c.fill(); }
    tex(c, r, 0, hz - 140, W, 150, '#4a4652', { al: .12, ang: 0 });
    // verges
    vg(c, 0, hz, W, dy - hz, [[0, '#3a3a34'], [1, '#22241e']]); tex(c, r, 0, hz, W, dy - hz, '#3a4030', { al: .15, len: [6, 22], ang: -1.4 });
    // carriageway
    const road = (t) => [vx + (t[0] - vx), t[1]]; const rdL = -900, rdR = 2600; c.fillStyle = '#2c2e34'; poly(c, [[vx - 60, hz], [vx + 90, hz], [rdR, dy], [rdL, dy]]); c.fill();
    vg(c, 0, hz, W, dy - hz, [[0, 'rgba(200,150,120,.35)'], [.4, 'rgba(60,60,70,0)']]);
    // central reservation barrier (left)
    c.fillStyle = '#7a7a80'; poly(c, [[vx - 64, hz], [vx - 58, hz], [-700, dy - 60], [-700, dy - 90]]); c.fill(); c.strokeStyle = '#3a3a3e'; c.lineWidth = 3; for (let i = 0; i < 26; i++) { const t = Math.pow(i / 26, 2), x = vx - 60 + (-700 - vx + 60) * t, y = hz + (dy - 75 - hz) * t; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 6 + t * 60); c.stroke(); }
    // lane lines (dashed), hard-shoulder solid
    const lane = (bx, dash) => { c.fillStyle = 'rgba(235,235,225,.85)'; const n = 18; for (let i = 0; i < n; i++) { const t0 = Math.pow(i / n, 2.2), t1 = Math.pow((i + (dash ? .45 : 1.02)) / n, 2.2); const x0 = vx + (bx - vx) * t0, y0 = hz + (dy - hz) * t0, x1 = vx + (bx - vx) * t1, y1 = hz + (dy - hz) * t1, w0 = 1 + t0 * 22, w1 = 1 + t1 * 22; poly(c, [[x0 - w0 / 2, y0], [x0 + w0 / 2, y0], [x1 + w1 / 2, y1], [x1 - w1 / 2, y1]]); c.fill(); } };
    lane(-260, true); lane(820, true); lane(1900, true); lane(2900, false); lane(-860, false);
    // wet reflections of lights
    for (let i = 0; i < 1600; i++) { const t = Math.pow(r(), 1.4), y = hz + 4 + t * (dy - hz - 4), x = vx + (r() - .5) * (300 + t * 3200); c.fillStyle = `rgba(160,170,190,${r.range(.03, .1)})`; c.fillRect(x, y, r.range(4, 30) * (1 + t * 2), 1 + t * 2); }
    // lorries + cars ahead (rear views)
    const lorry = (x, y, s, col) => { shadow(c, x, y, 150 * s, 10 * s, .6); c.fillStyle = col; rr(c, x - 110 * s, y - 330 * s, 220 * s, 300 * s, 6 * s); c.fill(); tex(c, r, x - 110 * s, y - 330 * s, 220 * s, 300 * s, col, { al: .12, n: 120 }); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo(x, y - 320 * s); c.lineTo(x, y - 40 * s); c.stroke();
      c.fillStyle = '#121214'; c.fillRect(x - 112 * s, y - 40 * s, 224 * s, 30 * s); c.fillStyle = '#f0c040'; c.fillRect(x - 50 * s, y - 36 * s, 100 * s, 20 * s); for (const sx of [-1, 1]) { c.fillStyle = '#ff2a1a'; c.fillRect(x + sx * 96 * s - 12 * s, y - 60 * s, 24 * s, 16 * s); gl(c, x + sx * 96 * s, y - 52 * s, 120 * s, '255,40,30', .6); for (let k = 0; k < 6; k++) { c.fillStyle = `rgba(255,50,40,${.18 - k * .025})`; c.fillRect(x + sx * 96 * s - 8 * s, y + k * 14 * s, 16 * s, 12 * s); } }
      for (const wx of [-80, -40, 40, 80]) { c.fillStyle = '#0c0c0e'; c.fillRect(x + wx * s - 16 * s, y - 14 * s, 32 * s, 16 * s); }
      for (let k = 0; k < 120; k++) { const sx = x + r.gauss() * 110 * s, sy = y - r() * 120 * s; c.fillStyle = `rgba(200,200,210,${r.range(.02, .07)})`; c.beginPath(); c.arc(sx, sy, r.range(8, 30) * s, 0, 7); c.fill(); } };
    const car = (x, y, s, col) => { shadow(c, x, y, 90 * s, 8 * s, .6); c.fillStyle = col; rr(c, x - 80 * s, y - 70 * s, 160 * s, 60 * s, 10 * s); c.fill(); c.fillStyle = P2.rgb(P2.shade(col, -.2)); poly(c, [[x - 60 * s, y - 70 * s], [x + 60 * s, y - 70 * s], [x + 46 * s, y - 112 * s], [x - 46 * s, y - 112 * s]]); c.fill(); c.fillStyle = 'rgba(40,50,64,.9)'; poly(c, [[x - 52 * s, y - 74 * s], [x + 52 * s, y - 74 * s], [x + 42 * s, y - 106 * s], [x - 42 * s, y - 106 * s]]); c.fill();
      for (const sx of [-1, 1]) { c.fillStyle = '#ff3020'; c.fillRect(x + sx * 62 * s - 14 * s, y - 60 * s, 28 * s, 12 * s); gl(c, x + sx * 62 * s, y - 54 * s, 80 * s, '255,40,30', .55); c.fillStyle = 'rgba(255,40,30,.15)'; c.fillRect(x + sx * 62 * s - 6 * s, y - 10 * s, 12 * s, 60 * s); } c.fillStyle = '#e8e4d0'; c.fillRect(x - 22 * s, y - 40 * s, 44 * s, 12 * s); c.fillStyle = '#0a0a0c'; c.fillRect(x - 78 * s, y - 14 * s, 26 * s, 14 * s); c.fillRect(x + 52 * s, y - 14 * s, 26 * s, 14 * s); };
    lorry(1150, 690, .42, '#d8d8dc'); car(1420, 668, .32, '#4a5a7a'); lorry(1560, 760, .78, '#8a2a24'); car(880, 740, .6, '#5a5a60'); car(1290, 640, .2, '#2a2a30'); lorry(1010, 650, .26, '#3a5a8a');
    // overhead gantry with blue signs
    const gy = 300; c.fillStyle = '#4a4e56'; c.fillRect(260, gy - 20, 2040, 24); c.fillRect(260, gy + 130, 2040, 14); c.strokeStyle = '#4a4e56'; c.lineWidth = 6; for (let x = 260; x < 2300; x += 60) { c.beginPath(); c.moveTo(x, gy); c.lineTo(x + 30, gy + 130); c.lineTo(x + 60, gy); c.stroke(); }
    for (const px of [240, 2300]) { c.fillStyle = '#3a3e46'; c.fillRect(px - 16, gy - 30, 32, hz - gy + 80); c.fillStyle = 'rgba(255,190,140,.3)'; c.fillRect(px - 16, gy - 30, 5, hz - gy + 80); }
    const sign = (x, w, lines, arrow) => { c.fillStyle = '#e8eef4'; c.fillRect(x - 6, gy + 4, w + 12, 160); c.fillStyle = '#1d4fa0'; c.fillRect(x, gy + 10, w, 148); for (let i = 0; i < lines.length; i++) txt(c, lines[i], x + w / 2, gy + 50 + i * 54, 40, '#f4f6fa', { w: 700 }); if (arrow) { c.fillStyle = '#f4f6fa'; poly(c, [[x + w - 60, gy + 120], [x + w - 30, gy + 80], [x + w - 0 - 10, gy + 120]]); c.fill(); } };
    sign(520, 520, ['M62  Leeds', 'Huddersfield'], true); sign(1140, 360, ['M62', 'Hull  (M1)'], true); txt(c, '', 0, 0, 1, '#000');
    c.fillStyle = '#121418'; rr(c, 1640, gy + 20, 200, 120, 6); c.fill(); for (let i = 0; i < 2; i++) { gl(c, 1700 + i * 80, gy + 60, 40, '255,180,60', .6); c.fillStyle = '#ffc040'; c.beginPath(); c.arc(1700 + i * 80, gy + 60, 10, 0, 7); c.fill(); } txt(c, '50', 1740, gy + 108, 44, '#ffd070', { w: 800 });
    gl(c, 1280, 820, 1200, '255,150,110', .08);
    // glass: haze, rain streaks, drops
    c.fillStyle = 'rgba(170,170,185,.07)'; c.fillRect(0, 0, W, dy);
    c.save(); c.lineCap = 'round'; for (let i = 0; i < 260; i++) { let x = r() * W, y = r() * dy * .8; const L = r.range(40, 260); c.strokeStyle = `rgba(220,225,235,${r.range(.05, .18)})`; c.lineWidth = r.range(2, 5); c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 6; k++) { x += r.range(-6, 6); y += L / 6; c.lineTo(x, y); } c.stroke(); }
    for (let i = 0; i < 1400; i++) { const x = r() * W, y = r() * dy, s = r.range(2, 9); c.fillStyle = `rgba(30,30,40,${r.range(.08, .2)})`; c.beginPath(); c.arc(x, y + s * .3, s, 0, 7); c.fill(); c.fillStyle = `rgba(235,235,245,${r.range(.15, .4)})`; c.beginPath(); c.arc(x - s * .3, y - s * .3, s * .45, 0, 7); c.fill(); } c.restore();
    // wiper rest arcs
    c.strokeStyle = 'rgba(255,255,255,.06)'; c.lineWidth = 60; c.beginPath(); c.arc(700, 1120, 760, Math.PI * 1.15, Math.PI * 1.75); c.stroke(); c.beginPath(); c.arc(1800, 1120, 760, Math.PI * 1.25, Math.PI * 1.85); c.stroke();
    // cabin frame: roof, A-pillars
    vg(c, 0, 0, W, 110, [[0, '#0c0c0e'], [.8, '#1c1c20'], [1, '#2a2a2e']]); c.fillStyle = '#26262a'; poly(c, [[0, 0], [W, 0], [W, 120], [2200, 100], [360, 100], [0, 130]]); c.fill(); tex(c, r, 0, 0, W, 110, '#2a2a30', { al: .2, len: [6, 20] });
    c.fillStyle = '#18181c'; poly(c, [[0, 100], [360, 92], [130, dy + 10], [0, dy + 10]]); c.fill(); poly(c, [[W, 100], [W - 360, 92], [W - 130, dy + 10], [W, dy + 10]]); c.fill();
    c.fillStyle = 'rgba(255,170,120,.12)'; poly(c, [[360, 92], [340, 100], [112, dy], [130, dy]]); c.fill(); poly(c, [[W - 360, 92], [W - 340, 100], [W - 112, dy], [W - 130, dy]]); c.fill();
    // rear-view mirror
    c.fillStyle = '#16161a'; c.fillRect(1268, 100, 24, 60); c.fillStyle = '#1c1c20'; rr(c, 1080, 150, 400, 120, 30); c.fill(); vg(c, 1096, 164, 368, 92, [[0, '#4a4650'], [1, '#2a2a34']]); c.save(); rr(c, 1096, 164, 368, 92, 22); c.clip(); for (let i = 0; i < 4; i++) { gl(c, 1160 + i * 90, 230, 30, '255,240,210', .5); } c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(1096, 164, 368, 30); c.restore();
    // dashboard top (plain)
    vg(c, 0, dy - 20, W, 70, [[0, '#2a2a30'], [1, '#141418']]); c.fillStyle = '#2e2e34'; c.beginPath(); c.moveTo(0, dy + 20); c.quadraticCurveTo(W / 2, dy - 50, W, dy + 20); c.lineTo(W, H); c.lineTo(0, H); c.fill();
    vg(c, 0, dy, W, H - dy, [[0, 'rgba(30,30,36,1)'], [.3, 'rgba(18,18,22,1)'], [1, 'rgba(8,8,10,1)']]); c.globalCompositeOperation = 'source-over'; tex(c, r, 0, dy, W, H - dy, '#1a1a20', { al: .14, len: [6, 18], n: 4000 });
    c.fillStyle = 'rgba(255,190,150,.16)'; c.beginPath(); c.moveTo(0, dy + 4); c.quadraticCurveTo(W / 2, dy - 66, W, dy + 4); c.lineTo(W, dy + 10); c.quadraticCurveTo(W / 2, dy - 58, 0, dy + 10); c.fill();
    // steering column hint
    vg(c, 1060, 1260, 440, 180, [[0, '#1a1a1e'], [1, '#0a0a0c']]); c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(1060, 1260, 440, 4);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(60,80,120,.35)'], [.6, 'rgba(255,150,90,.3)'], [1, 'rgba(60,80,120,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // 2. Dealership showroom. Floor line y 1060; turntable centre (1280,1150) rx 520; sales desk left x 120-640.
  showroom: (c, r, W, H, P) => { const fy = 1060;
    vg(c, 0, 0, W, fy, [[0, '#d8dce2'], [1, '#eef0f2']]); tex(c, r, 0, 0, W, fy, '#e0e2e6', { al: .08 });
    // ceiling
    vg(c, 0, 0, W, 150, [[0, '#9aa0aa'], [1, '#c8ccd4']]); for (let x = 140; x < W; x += 300) { spot(c, x, 140, 1.1); cone(c, x, 170, 40, 360, 900, '255,245,225', .12); }
    // glass wall right with car park
    const gx = 1580, gw = 940, gy = 190, gh = fy - gy; c.save(); c.beginPath(); c.rect(gx, gy, gw, gh); c.clip(); vg(c, gx, gy, gw, gh, [[0, '#9ab8d8'], [.55, '#d8e4ee'], [.62, '#a8acb0'], [1, '#6a6e74']]); ENV.clouds(c, r, W, gy + 40, gy + 260, 6, '#ffffff', '#e0e8f0', '#b8c4d0', { scale: .6 });
    for (let i = 0; i < 8; i++) { pine(c, r, gx + 40 + i * 130 + r() * 40, gy + gh * .6, r.range(160, 240), '#3a5a44'); } c.fillStyle = '#7a7e84'; c.fillRect(gx, gy + gh * .6, gw, gh * .4); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 4; for (let x = gx; x < gx + gw; x += 150) { c.beginPath(); c.moveTo(x, gy + gh * .66); c.lineTo(x - 60, gy + gh * .9); c.stroke(); }
    for (let i = 0; i < 5; i++) { const x = gx + 60 + i * 190, y = gy + gh * .8, col = r.pick(['#a83030', '#2a4a7a', '#e8e8ea', '#2a2a30', '#6a7a6a']); shadow(c, x + 60, y + 6, 90, 8, .4); c.fillStyle = col; rr(c, x, y - 36, 150, 36, 12); c.fill(); c.beginPath(); c.moveTo(x + 30, y - 34); c.quadraticCurveTo(x + 60, y - 70, x + 110, y - 66); c.lineTo(x + 130, y - 34); c.fill(); c.fillStyle = 'rgba(40,60,80,.7)'; poly(c, [[x + 40, y - 38], [x + 62, y - 62], [x + 108, y - 60], [x + 122, y - 38]]); c.fill(); c.fillStyle = '#111'; for (const t of [30, 120]) { c.beginPath(); c.arc(x + t, y, 16, 0, 7); c.fill(); } }
    c.restore(); c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.12)'; poly(c, [[gx + 100, gy], [gx + 300, gy], [gx + 80, fy], [gx - 120, fy]]); c.fill(); poly(c, [[gx + 600, gy], [gx + 680, gy], [gx + 460, fy], [gx + 380, fy]]); c.fill(); c.restore();
    c.fillStyle = '#2a2e34'; for (let k = 0; k <= 4; k++) c.fillRect(gx - 10 + k * gw / 4, gy, 16, gh); c.fillRect(gx - 10, gy - 14, gw + 20, 18);
    // left wall panels + banners
    for (let x = 0; x < gx; x += 260) { c.fillStyle = 'rgba(0,0,0,.04)'; c.fillRect(x, 150, 4, fy - 150); }
    const banner = (x, y, w, h, a, b) => { c.fillStyle = '#5a5e66'; c.fillRect(x - 10, y - 10, w + 20, 10); vg(c, x, y, w, h, [[0, a], [1, b]]); c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(x + w * .15, y + h * .2, w * .7, 10); c.fillRect(x + w * .15, y + h * .27, w * .45, 8); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 8; c.beginPath(); c.moveTo(x + w * .1, y + h * .7); c.quadraticCurveTo(x + w * .5, y + h * .5, x + w * .9, y + h * .62); c.stroke(); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(x + w - 12, y, 12, h); };
    banner(820, 200, 200, 560, '#1e3a6a', '#0e1a34'); banner(1100, 200, 200, 560, '#b03028', '#5a1410'); banner(1380, 200, 140, 560, '#2a2e34', '#101214');
    // feature wall + sales desk area
    c.fillStyle = '#c8ccd2'; c.fillRect(60, 260, 680, 560); c.fillStyle = '#2a2e36'; c.fillRect(90, 290, 620, 340); vg(c, 100, 300, 600, 320, [[0, '#3a6a9a'], [1, '#1a2a44']]); c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(160, 360, 300, 22); c.fillRect(160, 400, 200, 14); gl(c, 400, 460, 300, '120,180,255', .2);
    shadow(c, 380, fy + 70, 330, 24, .4); c.fillStyle = '#f4f4f2'; rr(c, 120, 900, 520, 170, 14); c.fill(); vg(c, 120, 900, 520, 26, [[0, '#2a2a2e'], [1, '#1a1a1e']]); c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(120, 1040, 520, 30);
    c.fillStyle = '#1a1c20'; rr(c, 300, 770, 180, 120, 8); c.fill(); c.fillStyle = '#5a8ac0'; c.fillRect(310, 780, 160, 100); c.fillRect(380, 890, 20, 12); ENV.plant(c, r, 700, 1090, 1.3);
    // floor: glossy
    vg(c, 0, fy, W, H - fy, [[0, '#c4c8ce'], [1, '#8a8e96']]); reflect(c, fy, 380, .45, 3); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 2; persLines(c, fy, H, 1280, 8, 'rgba(255,255,255,.18)', 2);
    for (let x = 140; x < W; x += 300) gl(c, x, fy + 120, 160, '255,250,235', .25);
    // turntable
    const tx = 1280, ty = 1150; shadow(c, tx, ty + 30, 600, 70, .45); c.fillStyle = '#2a2c32'; c.beginPath(); c.ellipse(tx, ty + 24, 540, 92, 0, 0, 7); c.fill(); c.fillStyle = '#4a4e56'; c.fillRect(tx - 540, ty, 1080, 24); c.fillStyle = '#d8dce2'; c.beginPath(); c.ellipse(tx, ty, 540, 92, 0, 0, 7); c.fill();
    const g = c.createRadialGradient(tx - 120, ty - 30, 20, tx, ty, 540); g.addColorStop(0, 'rgba(255,255,255,.7)'); g.addColorStop(1, 'rgba(120,130,140,.2)'); c.fillStyle = g; c.beginPath(); c.ellipse(tx, ty, 540, 92, 0, 0, 7); c.fill();
    c.strokeStyle = 'rgba(80,90,100,.3)'; c.lineWidth = 3; for (const k of [.4, .75]) { c.beginPath(); c.ellipse(tx, ty, 540 * k, 92 * k, 0, 0, 7); c.stroke(); } c.strokeStyle = 'rgba(120,200,255,.8)'; c.lineWidth = 4; c.beginPath(); c.ellipse(tx, ty + 24, 542, 93, 0, .1, Math.PI - .1); c.stroke(); gl(c, tx, ty + 110, 500, '120,200,255', .12);
    done(c, r, W, H, P, { vig: .3 }); },

  // 3. Swedish test airfield at dawn. Horizon y 760; runway edge-on, characters stand on runway at y ~1180. Hut right (x 2050-2400).
  airfield: (c, r, W, H, P) => { const hz = 760, fy = 1180;
    vg(c, 0, 0, W, hz, [[0, '#3a4a6e'], [.4, '#8a7aa0'], [.75, '#e8a0a8'], [1, '#ffd0b0']]); gl(c, 900, hz - 20, 800, '255,200,170', .55); gl(c, 900, hz - 10, 140, '255,245,220', .9);
    ENV.clouds(c, r, W, 120, 560, 12, '#ffd0d0', '#d898a8', '#8a7a9a'); ENV.birds(c, r, 1500, 2100, 200, 360, 6, [60, 50, 70], 1.6);
    c.fillStyle = '#5a5a7a'; c.beginPath(); c.moveTo(0, hz); for (let x = 0; x <= W; x += 30) c.lineTo(x, hz - 40 - 30 * Math.sin(x * .002)); c.lineTo(W, hz); c.fill();
    for (let x = -20; x < W + 40; x += r.range(14, 30)) pine(c, r, x, hz + 4, r.range(90, 160), '#3a3e58');
    for (let x = -20; x < W + 40; x += r.range(26, 50)) pine(c, r, x, hz + 30, r.range(150, 260), '#1e2a2e', '255,180,160');
    // grass field
    vg(c, 0, hz + 20, W, H - hz, [[0, '#3a4a3a'], [1, '#5a6a44']]); ENV.grass(c, r, W, hz + 30, H, 14000, [[80, 100, 70], [110, 120, 80], [150, 130, 110]]);
    gl(c, 900, hz + 60, 800, '255,190,170', .18);
    // runway receding to the right-hand horizon
    const vx = 1640; c.fillStyle = '#8a8a90'; poly(c, [[vx - 40, hz + 30], [vx + 40, hz + 30], [W + 1400, H], [-600, H]]); c.fill(); tex(c, r, 0, hz + 30, W, H - hz, '#8e8c94', { al: .16, len: [10, 50], ang: 0, angJ: .1 });
    c.strokeStyle = 'rgba(60,60,64,.35)'; c.lineWidth = 2; for (let k = 1; k < 16; k++) { const t = Math.pow(k / 16, 2), y = hz + 30 + t * (H - hz - 30); c.beginPath(); c.moveTo(vx - 40 + (-600 - vx + 40) * t, y); c.lineTo(vx + 40 + (W + 1400 - vx - 40) * t, y); c.stroke(); }
    c.fillStyle = 'rgba(245,245,240,.85)'; for (let i = 0; i < 14; i++) { const t0 = Math.pow(i / 14, 2), t1 = Math.pow((i + .45) / 14, 2), bx = 400, x0 = vx + (bx - vx) * t0, y0 = hz + 30 + (H - hz - 30) * t0, x1 = vx + (bx - vx) * t1, y1 = hz + 30 + (H - hz - 30) * t1, w0 = 2 + t0 * 30, w1 = 2 + t1 * 30; poly(c, [[x0 - w0, y0], [x0 + w0, y0], [x1 + w1, y1], [x1 - w1, y1]]); c.fill(); }
    for (let i = 0; i < 60; i++) { const t = r(), x = vx + (-200 - vx) * t + r.gauss() * 60 * t, y = hz + 30 + (H - hz - 30) * t; c.fillStyle = 'rgba(30,30,34,.25)'; c.fillRect(x, y, 80 + t * 300, 4 + t * 6); }
    c.save(); c.globalCompositeOperation = 'screen'; vg(c, 0, hz + 30, W, 300, [[0, 'rgba(255,190,180,.3)'], [1, 'rgba(255,190,180,0)']]); c.restore();
    // edge lights
    for (let i = 0; i < 20; i++) { const t = Math.pow(i / 20, 2); for (const ex of [-600, W + 1400]) { const x = vx + (ex - vx) * t, y = hz + 30 + (H - hz - 30) * t; if (x < 0 || x > W) continue; c.fillStyle = '#ffe8a0'; c.beginPath(); c.arc(x, y - 3, 2 + t * 8, 0, 7); c.fill(); gl(c, x, y, 10 + t * 40, '255,220,140', .5); } }
    // control hut
    const hx = 300; shadow(c, hx + 170, 990, 240, 20, .5); c.fillStyle = '#8a3a2c'; c.fillRect(hx, 800, 340, 190); tex(c, r, hx, 800, 340, 190, '#8a3a2c', { ang: Math.PI / 2, angJ: .05, al: .25 }); c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = 2; for (let x = hx; x < hx + 340; x += 20) { c.beginPath(); c.moveTo(x, 800); c.lineTo(x, 990); c.stroke(); }
    c.fillStyle = '#e8e2d6'; c.fillRect(hx + 60, 690, 220, 110); c.fillStyle = '#2a3a4a'; c.fillRect(hx + 72, 704, 196, 70); gl(c, hx + 170, 740, 140, '255,220,150', .4); c.fillStyle = 'rgba(255,220,150,.6)'; c.fillRect(hx + 80, 712, 60, 54); c.fillStyle = '#3a3a3e'; poly(c, [[hx + 40, 690], [hx + 300, 690], [hx + 280, 670], [hx + 60, 670]]); c.fill(); poly(c, [[hx - 20, 800], [hx + 360, 800], [hx + 330, 776], [hx + 10, 776]]); c.fill();
    c.fillStyle = '#e8e2d6'; c.fillRect(hx + 30, 880, 60, 110); c.fillRect(hx + 160, 850, 120, 70); c.fillStyle = '#2a3a4a'; c.fillRect(hx + 168, 858, 104, 54); c.fillStyle = '#2a2a2e'; c.fillRect(hx + 320, 560, 6, 240); c.fillStyle = '#f08030'; poly(c, [[hx + 326, 570], [hx + 400, 590], [hx + 326, 610]]); c.fill();
    // cones
    const cone2 = (x, y, s) => { shadow(c, x, y, 30 * s, 6 * s, .5); c.fillStyle = '#f06a20'; poly(c, [[x - 22 * s, y], [x + 22 * s, y], [x + 5 * s, y - 60 * s], [x - 5 * s, y - 60 * s]]); c.fill(); c.fillStyle = '#f4f2ea'; poly(c, [[x - 15 * s, y - 22 * s], [x + 15 * s, y - 22 * s], [x + 10 * s, y - 38 * s], [x - 10 * s, y - 38 * s]]); c.fill(); c.fillStyle = '#3a3a3a'; c.fillRect(x - 28 * s, y - 6 * s, 56 * s, 6 * s); c.fillStyle = 'rgba(255,220,200,.25)'; poly(c, [[x - 22 * s, y], [x - 12 * s, y], [x - 2 * s, y - 60 * s], [x - 5 * s, y - 60 * s]]); c.fill(); };
    for (let i = 0; i < 9; i++) cone2(1500 - i * 150 - i * i * 8, 840 + i * 30 + i * i * 2.4, .6 + i * .12); for (let i = 0; i < 6; i++) cone2(1750 + i * 90 + i * i * 6, 850 + i * 24 + i * i * 2, .6 + i * .1); cone2(300, 1330, 1.8); cone2(2350, 1300, 1.6);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,170,190,.35)'], [1, 'rgba(80,90,150,.35)']]); c.restore(); gl(c, 900, 700, 1100, '255,190,180', .1);
    done(c, r, W, H, P, { vig: .38 }); },

  // 4. Car-design studio. Floor line y 1100; whiteboard x 360-1460, y 200-760; centre floor x 800-1800 clear.
  design_studio: (c, r, W, H, P) => { const fy = 1100;
    vg(c, 0, 0, W, fy, [[0, '#4a4e58'], [1, '#6a6c72']]); tex(c, r, 0, 0, W, fy, '#5a5e66', { al: .12 });
    // big north-light window strip at top
    c.fillStyle = '#2a2c32'; c.fillRect(0, 0, W, 120); for (let x = 40; x < W; x += 320) { vg(c, x, 20, 280, 80, [[0, '#cfe0ee'], [1, '#90a8c0']]); }
    for (let x = 300; x < W; x += 560) { c.fillStyle = '#1a1a1e'; c.fillRect(x - 3, 120, 6, 160); c.fillStyle = '#2a2a2e'; poly(c, [[x - 60, 280], [x + 60, 280], [x + 30, 240], [x - 30, 240]]); c.fill(); cone(c, x, 282, 110, 500, 820, '255,230,190', .14); gl(c, x, 284, 120, '255,230,190', .6); }
    // whiteboard with car sketches
    const bx = 360, by = 200, bw = 1100, bh = 560; shadow(c, bx + bw / 2, by + bh + 10, bw * .55, 16, .4); c.fillStyle = '#a8acb2'; c.fillRect(bx - 14, by - 14, bw + 28, bh + 28); vg(c, bx, by, bw, bh, [[0, '#f8f8f6'], [1, '#e4e6e8']]); c.fillStyle = 'rgba(255,255,255,.4)'; poly(c, [[bx + 200, by], [bx + 420, by], [bx + 260, by + bh], [bx + 40, by + bh]]); c.fill();
    const sketch = (x, y, s, col) => { c.strokeStyle = col; c.lineCap = 'round'; for (let pass = 0; pass < 3; pass++) { c.lineWidth = pass ? 2 : 5; const j = () => r.range(-4, 4) * s; c.beginPath(); c.moveTo(x + j(), y + 70 * s); c.lineTo(x + 20 * s, y + 40 * s + j()); c.quadraticCurveTo(x + 90 * s, y + 30 * s, x + 140 * s + j(), y); c.quadraticCurveTo(x + 220 * s, y - 14 * s, x + 280 * s, y + 24 * s + j()); c.lineTo(x + 380 * s + j(), y + 36 * s); c.quadraticCurveTo(x + 410 * s, y + 50 * s, x + 404 * s, y + 70 * s); c.lineTo(x + j(), y + 70 * s); c.stroke();
        for (const wx of [80, 320]) { c.beginPath(); c.arc(x + wx * s + j() * .3, y + 70 * s, 34 * s, 0, 7); c.stroke(); } c.beginPath(); c.moveTo(x + 150 * s, y + 8 * s); c.lineTo(x + 170 * s, y + 40 * s); c.lineTo(x + 280 * s, y + 38 * s); c.stroke(); } };
    sketch(420, 290, 1, '#2a3a6a'); sketch(900, 300, .8, '#c03030'); sketch(440, 520, .7, '#2a2a2e'); sketch(800, 520, 1.05, '#2a6a4a');
    c.strokeStyle = 'rgba(40,60,120,.6)'; c.lineWidth = 3; for (let i = 0; i < 8; i++) { c.beginPath(); c.moveTo(1300, 300 + i * 40); c.lineTo(1300 + r.range(60, 130), 300 + i * 40); c.stroke(); } c.fillStyle = '#a8acb2'; c.fillRect(bx, by + bh + 10, bw, 16); for (let i = 0; i < 4; i++) { c.fillStyle = ['#c03030', '#2a3a6a', '#2a6a4a', '#1a1a1a'][i]; c.fillRect(bx + 60 + i * 40, by + bh + 2, 30, 10); }
    // pin-up boards right
    for (let k = 0; k < 2; k++) { const px = 1640 + k * 440, py = 230; c.fillStyle = '#a07a50'; c.fillRect(px, py, 380, 480); tex(c, r, px, py, 380, 480, '#a07a50', { al: .3, len: [4, 12] }); c.strokeStyle = '#3a2a1a'; c.lineWidth = 10; c.strokeRect(px, py, 380, 480);
      for (let i = 0; i < 6; i++) { const x = px + 20 + (i % 2) * 180 + r.range(-6, 6), y = py + 20 + Math.floor(i / 2) * 150 + r.range(-6, 6), w = 160, h = 130; c.save(); c.translate(x + w / 2, y + h / 2); c.rotate(r.range(-.05, .05)); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-w / 2 + 4, -h / 2 + 4, w, h); vg(c, -w / 2, -h / 2, w, h, [[0, r.pick(['#f4f0e6', '#e8eef4', '#2a2e3a', '#f0e0c8'])], [1, '#c8c4bc']]); c.strokeStyle = r.pick(['#c03030', '#2a3a6a', '#888']); c.lineWidth = 3; c.beginPath(); c.moveTo(-60, 30); c.quadraticCurveTo(-10, -30, 60, 10); c.lineTo(60, 30); c.closePath(); c.stroke(); c.fillStyle = '#d03030'; c.beginPath(); c.arc(0, -h / 2 + 8, 6, 0, 7); c.fill(); c.restore(); } }
    // left shelving with clay models
    c.fillStyle = '#2e3036'; c.fillRect(30, 300, 260, 780); for (let k = 0; k < 4; k++) { c.fillStyle = '#8a8e96'; c.fillRect(30, 420 + k * 180, 260, 12); const y = 420 + k * 180; c.fillStyle = r.pick(['#b8865a', '#a07050', '#8a8e96']); c.beginPath(); c.moveTo(50, y); c.quadraticCurveTo(120, y - 60, 200, y - 50); c.quadraticCurveTo(260, y - 40, 270, y); c.fill(); c.fillStyle = 'rgba(255,230,200,.25)'; c.fillRect(70, y - 46, 120, 5); }
    // floor
    vg(c, 0, fy, W, H - fy, [[0, '#5a5c62'], [1, '#3a3c42']]); tex(c, r, 0, fy, W, H - fy, '#5a5c62', { al: .14, ang: 0, angJ: .05, len: [40, 160] }); reflect(c, fy, 200, .2, 6); c.fillStyle = '#26282c'; c.fillRect(0, fy - 14, W, 14);
    // clay model table (left front) with half-finished clay car
    shadow(c, 420, fy + 160, 420, 30, .55); c.fillStyle = '#2a2c32'; c.fillRect(80, fy + 40, 680, 30); for (const lx of [110, 720]) c.fillRect(lx, fy + 70, 24, 110);
    c.fillStyle = '#b07a4e'; c.beginPath(); c.moveTo(130, fy + 40); c.lineTo(140, fy - 20); c.quadraticCurveTo(250, fy - 50, 330, fy - 110); c.quadraticCurveTo(480, fy - 150, 600, fy - 70); c.lineTo(710, fy - 40); c.lineTo(720, fy + 40); c.fill(); tex(c, r, 130, fy - 150, 590, 190, '#b07a4e', { al: .2, len: [6, 20] });
    c.fillStyle = 'rgba(255,220,190,.35)'; c.beginPath(); c.moveTo(150, fy - 22); c.quadraticCurveTo(250, fy - 52, 330, fy - 112); c.quadraticCurveTo(480, fy - 150, 600, fy - 72); c.lineTo(590, fy - 62); c.quadraticCurveTo(470, fy - 136, 330, fy - 100); c.quadraticCurveTo(250, fy - 40, 150, fy - 12); c.fill(); for (const wx of [250, 600]) { c.fillStyle = '#5a3a24'; c.beginPath(); c.arc(wx, fy + 30, 42, Math.PI, 0); c.fill(); } c.fillStyle = '#8a8e96'; c.fillRect(470, fy + 20, 80, 14);
    // desk right with laptops and lamp
    shadow(c, 2200, fy + 150, 380, 30, .55); c.fillStyle = '#e8e6e2'; c.fillRect(1880, fy + 10, 640, 26); c.fillStyle = '#2a2c32'; for (const lx of [1900, 2490]) c.fillRect(lx, fy + 36, 20, 150);
    for (const [lx, sc] of [[1960, '#3a6aa0'], [2240, '#5a8a6a']]) { c.fillStyle = '#b8bcc4'; poly(c, [[lx, fy + 10], [lx + 220, fy + 10], [lx + 200, fy - 4], [lx + 20, fy - 4]]); c.fill(); c.fillStyle = '#2a2c32'; poly(c, [[lx + 20, fy - 4], [lx + 200, fy - 4], [lx + 210, fy - 150], [lx + 30, fy - 150]]); c.fill(); c.fillStyle = sc; poly(c, [[lx + 32, fy - 14], [lx + 190, fy - 14], [lx + 198, fy - 140], [lx + 40, fy - 140]]); c.fill(); gl(c, lx + 115, fy - 80, 160, '160,200,255', .2); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(lx + 60, fy - 50); c.quadraticCurveTo(lx + 110, fy - 100, lx + 170, fy - 70); c.stroke(); }
    c.strokeStyle = '#1a1a1e'; c.lineWidth = 8; c.beginPath(); c.moveTo(2470, fy + 10); c.lineTo(2440, fy - 160); c.lineTo(2380, fy - 230); c.stroke(); c.fillStyle = '#1a1a1e'; c.beginPath(); c.ellipse(2380, fy - 230, 40, 18, -.5, 0, 7); c.fill(); cone(c, 2370, fy - 220, 40, 200, 230, '255,230,180', .3); gl(c, 2370, fy - 214, 60, '255,240,200', .7);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,200,150,.3)'], [1, 'rgba(100,140,200,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // 5. Terraced-house kitchen, night. Floor y 1250; table top y 1030 (x 820-1740, clear); window x 1640-2180, y 220-700.
  kitchen: (c, r, W, H, P) => { const fy = 1250, ty = 1030;
    vg(c, 0, 0, W, fy, [[0, '#4a5a4a'], [1, '#6a6a52']]); tex(c, r, 0, 0, W, fy, '#5a6450', { al: .14 });
    // tiled splashback
    for (let y = 560; y < 800; y += 50) for (let x = 0; x < 1560; x += 50) { c.fillStyle = P2.rgb(P2.shade(P2.jitter('#d8d4c4', r, 8), r.range(-.08, .05))); c.fillRect(x + 2, y + 2, 46, 46); }
    // wall cupboards
    for (let i = 0; i < 4; i++) { const x = 60 + i * 300; c.fillStyle = '#c8b898'; c.fillRect(x, 160, 290, 360); tex(c, r, x, 160, 290, 360, '#c8b898', { al: .15, ang: Math.PI / 2, angJ: .05 }); c.strokeStyle = 'rgba(80,60,40,.4)'; c.lineWidth = 5; c.strokeRect(x + 24, 184, 242, 312); c.fillStyle = '#8a8070'; c.fillRect(x + 240, 440, 10, 50); }
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(60, 520, 1200, 30);
    // window: night street, rain, streetlight
    const wx = 1640, wy = 220, ww = 540, wh = 480; c.save(); c.beginPath(); c.rect(wx, wy, ww, wh); c.clip(); vg(c, wx, wy, ww, wh, [[0, '#0a1020'], [1, '#1c2236']]);
    for (let i = 0; i < 4; i++) { const hx = wx - 40 + i * 160; c.fillStyle = '#1a1820'; c.fillRect(hx, wy + 140, 150, wh); c.fillStyle = '#121016'; poly(c, [[hx - 10, wy + 140], [hx + 160, wy + 140], [hx + 75, wy + 80]]); c.fill(); for (let k = 0; k < 2; k++) { c.fillStyle = r() < .6 ? 'rgba(255,200,120,.75)' : 'rgba(40,40,60,.9)'; c.fillRect(hx + 30 + k * 60, wy + 200, 36, 50); } c.fillStyle = '#3a2a24'; c.fillRect(hx + 140, wy + 90, 16, 50); }
    c.fillStyle = '#16161a'; c.fillRect(wx + 380, wy + 40, 10, wh); c.fillRect(wx + 340, wy + 40, 60, 10); c.fillStyle = '#ffb860'; c.fillRect(wx + 340, wy + 50, 30, 14); gl(c, wx + 355, wy + 60, 260, '255,170,80', .6); cone(c, wx + 355, wy + 64, 30, 300, 400, '255,170,80', .2);
    c.save(); c.lineCap = 'round'; for (let i = 0; i < 260; i++) { const x = wx + r() * ww, y = wy + r() * wh, L = r.range(20, 50); c.strokeStyle = `rgba(200,210,230,${r.range(.15, .4)})`; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 6, y + L); c.stroke(); } c.restore();
    for (let i = 0; i < 160; i++) { const x = wx + r() * ww, y = wy + r() * wh, s = r.range(2, 6); c.fillStyle = 'rgba(220,220,240,.35)'; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill(); } c.restore();
    c.fillStyle = '#ece6da'; c.fillRect(wx - 20, wy - 20, ww + 40, 20); c.fillRect(wx - 20, wy + wh, ww + 40, 30); c.fillRect(wx - 20, wy, 20, wh); c.fillRect(wx + ww, wy, 20, wh); c.fillRect(wx + ww / 2 - 8, wy, 16, wh); c.fillRect(wx, wy + wh / 2 - 8, ww, 16);
    c.fillStyle = '#8a3a3a'; poly(c, [[wx - 60, wy - 40], [wx + 80, wy - 40], [wx + 30, wy + 300], [wx - 60, wy + 520]]); c.fill(); poly(c, [[wx + ww + 60, wy - 40], [wx + ww - 80, wy - 40], [wx + ww - 30, wy + 300], [wx + ww + 60, wy + 520]]); c.fill();
    ENV.plant(c, r, wx + 100, wy + wh, .7); c.fillStyle = '#e8e2d6'; c.fillRect(wx + 380, wy + wh - 70, 50, 70);
    // counter + kettle + toaster
    c.fillStyle = '#3a4a3a'; c.fillRect(0, 840, 1560, fy - 840); for (let i = 0; i < 5; i++) { const x = 20 + i * 310; c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 4; c.strokeRect(x, 880, 290, 330); c.fillStyle = '#b8a888'; c.fillRect(x + 120, 900, 50, 10); } tex(c, r, 0, 840, 1560, fy - 840, '#3a4a3a', { al: .15, ang: Math.PI / 2 });
    vg(c, 0, 790, 1580, 50, [[0, '#d8cfbe'], [1, '#a89c88']]); c.fillStyle = 'rgba(255,230,180,.5)'; c.fillRect(0, 790, 1580, 4);
    const kx = 340; c.fillStyle = '#c8ccd2'; c.beginPath(); c.moveTo(kx - 60, 790); c.lineTo(kx - 50, 660); c.quadraticCurveTo(kx, 640, kx + 50, 660); c.lineTo(kx + 60, 790); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(kx - 40, 670, 12, 110); c.strokeStyle = '#2a2a2e'; c.lineWidth = 14; c.beginPath(); c.moveTo(kx + 40, 680); c.quadraticCurveTo(kx + 110, 700, kx + 54, 770); c.stroke(); c.fillStyle = '#c8ccd2'; poly(c, [[kx - 50, 680], [kx - 110, 660], [kx - 100, 676], [kx - 52, 700]]); c.fill(); c.fillStyle = '#2a2a2e'; c.fillRect(kx - 70, 784, 140, 8); ENV.smoke(c, r, kx - 100, 650, 140, [240, 240, 240], .08);
    c.fillStyle = '#8a2a24'; rr(c, 560, 700, 160, 90, 14); c.fill(); c.fillStyle = '#1a1a1a'; c.fillRect(590, 696, 40, 8); c.fillRect(650, 696, 40, 8); for (let i = 0; i < 4; i++) { c.fillStyle = r.pick(['#e8e0d0', '#3a6a8a', '#c8a040']); rr(c, 820 + i * 70, 720, 56, 70, 6); c.fill(); }
    c.fillStyle = '#1a1a1e'; c.fillRect(1000, 600, 300, 12); for (let i = 0; i < 5; i++) { c.fillStyle = '#9a9ea6'; c.fillRect(1020 + i * 55, 612, 6, 80); c.beginPath(); c.arc(1023 + i * 55, 700, 14, 0, 7); c.fill(); }
    // fridge right with magnets
    const fx = 2240; shadow(c, fx + 150, fy, 190, 16, .5); vg(c, fx, 360, 300, fy - 360, [[0, '#eeece6'], [1, '#c8c4ba']]); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(fx, 760, 300, 6); c.fillStyle = '#8a8a8e'; c.fillRect(fx + 20, 500, 12, 200); c.fillRect(fx + 20, 800, 12, 200); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(fx + 270, 360, 12, fy - 360);
    for (let i = 0; i < 12; i++) { const x = fx + 60 + r() * 200, y = 400 + r() * 560; c.save(); c.translate(x, y); c.rotate(r.range(-.2, .2)); if (r() < .5) { c.fillStyle = r.pick(['#f4f0e0', '#e8d8b0', '#d8e8f4']); c.fillRect(-36, -44, 72, 88); c.strokeStyle = 'rgba(60,60,90,.5)'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-26, -24 + k * 16); c.lineTo(r.range(0, 26), -24 + k * 16); c.stroke(); } c.fillStyle = r.pick(['#d03030', '#3070c0', '#30a050']); c.beginPath(); c.arc(0, -40, 8, 0, 7); c.fill(); } else { c.fillStyle = r.pick(['#d03030', '#3070c0', '#f0c030', '#30a050']); c.beginPath(); c.arc(0, 0, 14, 0, 7); c.fill(); } c.restore(); }
    // floor: lino checks
    vg(c, 0, fy, W, H - fy, [[0, '#6a5a48'], [1, '#4a3e32']]); for (let j = 0; j < 6; j++) for (let i = -10; i < 40; i++) { if ((i + j) % 2) continue; const y0 = fy + Math.pow(j / 6, 1.4) * (H - fy), y1 = fy + Math.pow((j + 1) / 6, 1.4) * (H - fy), f = (y) => 1 + (y - fy) / 200; c.fillStyle = 'rgba(230,220,200,.22)'; poly(c, [[1280 + (i * 120 - 1280) * f(y0) * .6, y0], [1280 + ((i + 1) * 120 - 1280) * f(y0) * .6, y0], [1280 + ((i + 1) * 120 - 1280) * f(y1) * .6, y1], [1280 + (i * 120 - 1280) * f(y1) * .6, y1]]); c.fill(); }
    c.fillStyle = '#2a2420'; c.fillRect(0, fy - 12, W, 12);
    // pendant lamp + warm light
    c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(1280, 0); c.lineTo(1280, 380); c.stroke(); c.fillStyle = '#2a3a2a'; poly(c, [[1220, 440], [1340, 440], [1300, 380], [1260, 380]]); c.fill(); c.fillStyle = '#fff0c8'; c.beginPath(); c.ellipse(1280, 440, 60, 12, 0, 0, 7); c.fill(); cone(c, 1280, 444, 120, 1100, 700, '255,210,140', .22); gl(c, 1280, 450, 500, '255,200,130', .4);
    // table front centre (clear top)
    shadow(c, 1280, fy + 100, 560, 34, .55); vg(c, 800, ty, 960, 40, [[0, '#a87a4c'], [1, '#6a4a2c']]); c.fillStyle = '#8a6038'; c.beginPath(); c.moveTo(830, ty); c.lineTo(1730, ty); c.lineTo(1700, ty - 60); c.lineTo(860, ty - 60); c.fill(); tex(c, r, 860, ty - 60, 840, 100, '#8a6038', { ang: 0, angJ: .02, al: .25, len: [40, 160] }); c.fillStyle = 'rgba(255,220,170,.3)'; c.fillRect(860, ty - 60, 840, 4);
    c.fillStyle = '#5a3e24'; for (const lx of [860, 1680]) c.fillRect(lx, ty + 40, 30, fy - ty + 90); c.fillRect(840, ty + 40, 880, 30);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,190,120,.35)'], [1, 'rgba(60,70,110,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // 6. Scrapyard, overcast afternoon. Floor line y 1150; centre ground x 700-1900 clear. Crane left.
  scrapyard: (c, r, W, H, P) => { const fy = 1150;
    vg(c, 0, 0, W, 760, [[0, '#7a8088'], [1, '#b8b8b4']]); ENV.clouds(c, r, W, 40, 500, 16, '#d0d0cc', '#9a9ea4', '#6a7078');
    c.fillStyle = '#8a9088'; c.beginPath(); c.moveTo(0, 760); for (let x = 0; x <= W; x += 40) c.lineTo(x, 700 - 30 * Math.sin(x * .003) - r() * 10); c.lineTo(W, 760); c.fill(); for (let x = 0; x < W; x += r.range(40, 90)) { c.fillStyle = '#6a7266'; c.beginPath(); c.arc(x, 700 - r() * 20, r.range(20, 50), 0, 7); c.fill(); }
    // far stacks
    const stack = (x0, x1, base, n, w, h, col) => { for (let k = 0; k < n; k++) { let x = x0 + r() * 30; const y = base - (k + 1) * h; while (x < x1) { const ww = w * r.range(.85, 1.15); slab(c, r, x, y + r.range(-4, 4), ww, h, col); x += ww + r.range(-10, 4); } } };
    stack(-20, W + 20, 800, 3, 150, 34, '#6a7078');
    // corrugated fence
    for (let x = 0; x < W; x += 16) { c.fillStyle = P2.rgb(P2.shade('#7a7a70', (x / 16) % 2 ? -.1 : .06)); c.fillRect(x, 720, 16, 170); } tex(c, r, 0, 720, W, 170, '#8a6a4a', { al: .18, len: [8, 30] }); c.fillStyle = '#4a4a44'; c.fillRect(0, 716, W, 8); for (let x = 0; x < W; x += 12) { c.strokeStyle = '#3a3a36'; c.lineWidth = 2; c.beginPath(); c.arc(x, 712, 6, 0, 7); c.stroke(); }
    // crane left
    c.fillStyle = '#c89a2a'; c.fillRect(140, 820, 340, 140); tex(c, r, 140, 820, 340, 140, '#c89a2a', { al: .2 }); c.fillStyle = '#2a3a4a'; c.fillRect(170, 740, 140, 90); c.fillStyle = '#b8892a'; c.fillRect(150, 730, 180, 14); c.fillStyle = '#1a1a1a'; rr(c, 120, 950, 400, 60, 30); c.fill(); for (let i = 0; i < 6; i++) { c.fillStyle = '#3a3a3a'; c.beginPath(); c.arc(150 + i * 68, 980, 22, 0, 7); c.fill(); }
    c.strokeStyle = '#c89a2a'; c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(380, 820); c.lineTo(660, 300); c.lineTo(900, 380); c.stroke(); c.strokeStyle = '#8a6a1a'; c.lineWidth = 6; c.beginPath(); c.moveTo(380, 820); c.lineTo(660, 300); c.stroke(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 4; c.beginPath(); c.moveTo(900, 380); c.lineTo(900, 560); c.stroke();
    c.fillStyle = '#3a3a3a'; for (let k = 0; k < 5; k++) { c.save(); c.translate(900, 560); c.rotate(-.8 + k * .4); poly(c, [[-8, 0], [8, 0], [14, 70], [0, 100], [-6, 70]]); c.fill(); c.restore(); }
    // near stacks left and right
    stack(560, 900, 1000, 5, 260, 60, '#7a6a5a'); stack(1820, 2560, 1050, 6, 300, 66, '#5a6a7a'); stack(2000, 2560, 1050 - 6 * 66, 2, 280, 60, '#8a4a3a');
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(1820, 1040, 740, 20);
    // ground: mud, gravel, puddles
    vg(c, 0, 960, W, H - 960, [[0, '#6a6458'], [1, '#4a4438']]); ENV.pebbles(c, r, W, 980, H, 3500, [120, 110, 100], [180, 170, 150]); tex(c, r, 0, 960, W, H - 960, '#5a5246', { al: .2, len: [20, 70], ang: 0, angJ: .1 });
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(0, fy, W, 4);
    for (const [px, py, pw] of [[380, 1260, 420], [1400, 1330, 600], [2200, 1220, 300], [1000, 1190, 220]]) { c.save(); c.beginPath(); c.ellipse(px, py, pw / 2, pw * .08, 0, 0, 7); c.clip(); vg(c, px - pw / 2, py - pw * .08, pw, pw * .16, [[0, '#a8acb0'], [1, '#6a7078']]); c.fillStyle = 'rgba(40,40,40,.4)'; c.fillRect(px - pw / 2, py - pw * .02, pw, 4); c.restore(); c.strokeStyle = 'rgba(40,36,30,.5)'; c.lineWidth = 3; c.beginPath(); c.ellipse(px, py, pw / 2, pw * .08, 0, 0, 7); c.stroke(); }
    // tyres + oil drum foreground
    for (let i = 0; i < 4; i++) { const x = 120 + i * 30, y = 1300 - i * 40; c.fillStyle = '#1a1a1a'; c.beginPath(); c.ellipse(x, y, 90, 30, 0, 0, 7); c.fill(); c.fillStyle = '#3a3a38'; c.beginPath(); c.ellipse(x, y - 6, 44, 14, 0, 0, 7); c.fill(); }
    shadow(c, 2380, 1330, 90, 14, .6); vg(c, 2310, 1150, 140, 180, [[0, '#2a4a6a'], [1, '#1a2a3a']]); c.fillStyle = '#9a4a2a'; c.fillRect(2310, 1210, 140, 10); c.fillRect(2310, 1270, 140, 10); c.fillStyle = '#1a2a3a'; c.beginPath(); c.ellipse(2380, 1150, 70, 14, 0, 0, 7); c.fill();
    drizzle(c, r, W, H, 0);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(140,160,180,.3)'], [1, 'rgba(200,170,130,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .42 }); },

  // 7. Night launch in Rome. Stage floor y 1080 (front lip y 1180); turntable centre (1280,1110). Audience only x<520 and x>2040 at bottom.
  rome_stage: (c, r, W, H, P) => { const fy = 1080;
    vg(c, 0, 0, W, H, [[0, '#06070e'], [.6, '#161220'], [1, '#0a0810']]); for (let i = 0; i < 120; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.1, .5)})`; c.fillRect(r() * W, r() * 300, 2, 2); }
    // floodlit facade (temple front)
    gl(c, 1280, 560, 1300, '255,180,100', .25); const fx0 = 420, fx1 = 2140; c.fillStyle = '#a07a50'; c.fillRect(fx0, 340, fx1 - fx0, 720); tex(c, r, fx0, 340, fx1 - fx0, 720, '#b08a5a', { al: .25, len: [10, 40] });
    vg(c, fx0, 340, fx1 - fx0, 720, [[0, 'rgba(0,0,0,.3)'], [.5, 'rgba(0,0,0,0)'], [1, 'rgba(255,200,120,.25)']]);
    c.fillStyle = '#c8a070'; poly(c, [[fx0 - 60, 340], [fx1 + 60, 340], [1280, 130]]); c.fill(); c.fillStyle = '#6a4a2c'; poly(c, [[fx0 + 60, 320], [fx1 - 60, 320], [1280, 170]]); c.fill(); c.fillStyle = '#d8b080'; c.fillRect(fx0 - 70, 320, fx1 - fx0 + 140, 40); c.fillRect(fx0 - 50, 380, fx1 - fx0 + 100, 24); txt(c, 'S · P · Q · R', 1280, 372, 30, '#7a5a34', { w: 700, f: 'Georgia, serif' });
    for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(40,24,12,.7)'; rr(c, fx0 + 110 + i * 280, 520, 120, 360, 60); c.fill(); }
    for (let i = 0; i < 8; i++) column(c, fx0 + 40 + i * (fx1 - fx0 - 80) / 7, 410, 1000, 90);
    for (let i = 0; i < 4; i++) cone(c, 600 + i * 450, 1060, 60, 400, -900, '255,190,110', .1);
    // side ruins/broken columns + cypress trees
    for (const [x, h] of [[180, 520], [2380, 460]]) { column(c, x, 1000 - h, 1000, 110); c.fillStyle = '#0a0a10'; c.beginPath(); c.moveTo(x - 80, 1000 - h - 30); c.lineTo(x - 20, 1000 - h - 60); c.lineTo(x + 80, 1000 - h - 20); c.lineTo(x + 80, 1000 - h - 32); c.lineTo(x - 80, 1000 - h - 32); c.fill(); }
    for (const x of [60, 340, 2240, 2500]) { c.fillStyle = '#0a120e'; c.beginPath(); c.ellipse(x, 700, 50, 330, 0, 0, 7); c.fill(); }
    // truss + spotlights
    c.strokeStyle = '#2a2a30'; c.lineWidth = 10; c.strokeRect(120, 70, 2320, 40); for (let x = 120; x < 2440; x += 40) { c.lineWidth = 3; c.beginPath(); c.moveTo(x, 70); c.lineTo(x + 40, 110); c.stroke(); }
    for (let i = 0; i < 8; i++) { const x = 260 + i * 290; spot(c, x, 112, 1.2); const tx = 1280 + (x - 1280) * .2; c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(x, 140, tx, fy); g.addColorStop(0, `rgba(${i % 2 ? '200,220,255' : '255,220,170'},.2)`); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; poly(c, [[x - 20, 140], [x + 20, 140], [tx + 160, fy + 40], [tx - 160, fy + 40]]); c.fill(); c.restore(); }
    // stage floor
    c.fillStyle = '#08080c'; c.fillRect(0, fy, W, H - fy); vg(c, 0, fy, W, 100, [[0, '#1a1820'], [1, '#0c0c10']]); reflect(c, fy, 260, .28, 4); c.fillStyle = 'rgba(255,200,130,.5)'; c.fillRect(0, fy, W, 3);
    c.fillStyle = '#14141a'; c.fillRect(0, 1180, W, 16); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(0, 1180, W, 3);
    const tx = 1280, ty = 1110; c.fillStyle = '#1a1a22'; c.beginPath(); c.ellipse(tx, ty + 16, 520, 72, 0, 0, 7); c.fill(); c.fillStyle = '#26262e'; c.beginPath(); c.ellipse(tx, ty, 520, 72, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,210,150,.6)'; c.lineWidth = 4; c.beginPath(); c.ellipse(tx, ty + 14, 522, 73, 0, .05, Math.PI - .05); c.stroke(); gl(c, tx, ty, 520, '255,210,150', .14);
    // audience silhouettes bottom corners
    crowd(c, r, -20, 540, 1250, 1420, { rows: 4, s0: 26, s1: 40, col: '#0a0a10', rim: '255,200,140', phone: .08 }); crowd(c, r, 2020, 2580, 1250, 1420, { rows: 4, s0: 26, s1: 40, col: '#0a0a10', rim: '255,200,140', phone: .08 });
    done(c, r, W, H, P, { vig: .55 }); },

  // 8. Heritage sports-car workshop. Floor line y 1100; centre floor x 640-1920 empty for a car. Lift right.
  workshop: (c, r, W, H, P) => { const fy = 1100;
    bricks(c, r, 0, 0, W, fy, '#8a4a32', { bw: 64, bh: 24, mortar: '#6a5a4a' }); vg(c, 0, 0, W, fy, [[0, 'rgba(20,10,6,.55)'], [.6, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.25)']]);
    // roof trusses + factory lamps
    c.fillStyle = '#1a1410'; c.fillRect(0, 0, W, 70); for (let x = 0; x < W; x += 320) { c.strokeStyle = '#2a2018'; c.lineWidth = 10; c.beginPath(); c.moveTo(x, 70); c.lineTo(x + 160, 20); c.lineTo(x + 320, 70); c.stroke(); }
    for (let x = 360; x < W; x += 600) { c.strokeStyle = '#111'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 70); c.lineTo(x, 200); c.stroke(); c.fillStyle = '#2a4a3a'; poly(c, [[x - 70, 260], [x + 70, 260], [x + 20, 200], [x - 20, 200]]); c.fill(); c.fillStyle = '#fff0c8'; c.beginPath(); c.ellipse(x, 260, 70, 12, 0, 0, 7); c.fill(); cone(c, x, 264, 140, 900, 840, '255,200,130', .16); gl(c, x, 270, 360, '255,200,130', .45); }
    // posters
    poster(c, r, 120, 240, 240, 340, '#c83a2a', '#f4e8c8'); poster(c, r, 400, 280, 200, 280, '#2a5a8a', '#f0d070'); poster(c, r, 1980, 240, 240, 340, '#d8a030', '#2a2a2e'); poster(c, r, 2260, 290, 200, 280, '#2a6a4a', '#f4e8c8');
    // tool board centre
    const tbx = 700, tby = 260; c.fillStyle = '#3a4a3a'; c.fillRect(tbx, tby, 1160, 420); for (let y = tby + 15; y < tby + 420; y += 30) for (let x = tbx + 15; x < tbx + 1160; x += 30) { c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); }
    c.lineCap = 'round'; for (let i = 0; i < 22; i++) { const x = tbx + 50 + i * 50, y = tby + 60; c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 16; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 90 + (i % 4) * 20); c.stroke(); c.strokeStyle = '#b8bcc4'; c.lineWidth = 10; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 90 + (i % 4) * 20); c.stroke(); c.strokeStyle = '#d8dce4'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, 12, 0, 7); c.stroke(); }
    for (let i = 0; i < 8; i++) { const x = tbx + 80 + i * 130, y = tby + 260; c.fillStyle = r.pick(['#c03028', '#e8b030', '#2a2a2e']); rr(c, x, y, 30, 110, 10); c.fill(); c.fillStyle = '#9aa0a8'; c.fillRect(x + 8, y - 70, 14, 70); c.fillRect(x - 10, y - 90, 50, 24); }
    c.fillStyle = '#5a3a24'; c.fillRect(tbx - 10, tby - 10, 1180, 12); c.fillRect(tbx - 10, tby + 418, 1180, 12);
    // workbench left
    shadow(c, 360, fy + 10, 360, 20, .5); c.fillStyle = '#7a5030'; c.fillRect(40, 860, 640, 40); tex(c, r, 40, 860, 640, 40, '#7a5030', { ang: 0, angJ: .03, al: .3 }); c.fillStyle = '#4a3020'; c.fillRect(60, 900, 30, fy - 900); c.fillRect(630, 900, 30, fy - 900); c.fillRect(60, 1020, 600, 20);
    c.fillStyle = '#3a3a3e'; c.fillRect(120, 790, 120, 70); c.fillStyle = '#5a5a60'; c.fillRect(100, 780, 160, 16); c.fillStyle = '#c03028'; rr(c, 360, 800, 180, 60, 6); c.fill(); c.fillStyle = '#2a2a2e'; c.fillRect(420, 790, 60, 12); c.fillStyle = '#b8bcc4'; c.beginPath(); c.arc(600, 840, 22, 0, 7); c.fill();
    c.fillStyle = '#c03028'; rr(c, 120, 930, 300, 160, 8); c.fill(); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(130, 950 + k * 36, 280, 4); c.fillStyle = '#d8dce4'; c.fillRect(250, 960 + k * 36, 40, 6); }
    // lift right
    for (const px of [1960, 2420]) { vg(c, px, 620, 70, fy - 620, [[0, '#d0a030'], [1, '#8a6a1a']]); c.fillStyle = '#2a2a2e'; c.fillRect(px - 10, fy - 20, 90, 20); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(px + 50, 620, 20, fy - 620); for (let y = 660; y < fy; y += 60) { c.fillStyle = '#1a1a1a'; c.fillRect(px + 20, y, 30, 6); } } c.fillStyle = '#3a3a3e'; c.fillRect(1950, 600, 550, 30); txt(c, "2.5 T", 2225, 616, 20, '#e8c040', {});
    for (const ax of [2030, 2390]) { c.fillStyle = '#4a4a50'; c.fillRect(ax - 4, 960, 80, 20); } ENV.box(c, r, 2140, 980, 160, 120, '#4a5a6a');
    // tyres stacked
    for (let k = 0; k < 4; k++) { c.fillStyle = '#16161a'; rr(c, 2480, fy - 60 - k * 60, 70, 56, 12); c.fill(); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(2486, fy - 54 - k * 60, 60, 4); }
    // polished floor
    vg(c, 0, fy, W, H - fy, [[0, '#5a4a40'], [1, '#2a2220']]); reflect(c, fy, 300, .35, 4); tex(c, r, 0, fy, W, H - fy, '#4a3e36', { al: .08, ang: 0, angJ: .05, len: [80, 260] }); c.fillStyle = '#1a1410'; c.fillRect(0, fy - 10, W, 10);
    for (let x = 360; x < W; x += 600) gl(c, x, fy + 140, 300, '255,200,130', .18); c.strokeStyle = 'rgba(230,190,60,.35)'; c.lineWidth = 10; c.setLineDash([60, 40]); c.beginPath(); c.moveTo(600, H); c.lineTo(760, fy + 10); c.moveTo(1960, H); c.lineTo(1800, fy + 10); c.stroke(); c.setLineDash([]);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,180,100,.35)'], [1, 'rgba(255,160,90,.25)']]); c.restore();
    done(c, r, W, H, P, { vig: .48 }); },

  // 9. Wood-panelled gallery hall. Floor y 1180. Empty gilt frame x 520-1240, y 220-980 (inner 560-1200 x 260-940). Plinth right x 1700-2160, top y 900.
  gallery: (c, r, W, H, P) => { const fy = 1180;
    vg(c, 0, 0, W, fy, [[0, '#2a1a10'], [1, '#4a2e1a']]);
    // panelling
    for (let x = 0; x < W; x += 320) { c.fillStyle = '#4a2c18'; c.fillRect(x + 16, 120, 288, 640); tex(c, r, x + 16, 120, 288, 640, '#4a2c18', { ang: Math.PI / 2, angJ: .05, al: .25, len: [60, 200] }); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 6; c.strokeRect(x + 36, 140, 248, 600); c.strokeStyle = 'rgba(255,200,140,.12)'; c.lineWidth = 2; c.strokeRect(x + 42, 146, 236, 588);
      c.fillStyle = '#3a2214'; c.fillRect(x + 16, 800, 288, fy - 840); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 6; c.strokeRect(x + 36, 820, 248, fy - 880); }
    c.fillStyle = '#5a3820'; c.fillRect(0, 760, W, 40); c.fillStyle = 'rgba(255,210,150,.2)'; c.fillRect(0, 760, W, 4); c.fillStyle = '#2a180c'; c.fillRect(0, 0, W, 120); c.fillStyle = '#6a4424'; c.fillRect(0, 108, W, 16);
    // small side paintings
    const frame = (x, y, w, h, b) => { c.fillStyle = '#6a4a1a'; c.fillRect(x - b, y - b, w + 2 * b, h + 2 * b); const g = c.createLinearGradient(x - b, y - b, x + w + b, y + h + b); g.addColorStop(0, '#f0d070'); g.addColorStop(.3, '#b08020'); g.addColorStop(.6, '#e8c060'); g.addColorStop(1, '#6a4a10'); c.fillStyle = g; c.fillRect(x - b, y - b, w + 2 * b, h + 2 * b); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x - b * .3, y - b * .3, w + b * .6, h + b * .6); c.strokeStyle = 'rgba(255,240,180,.5)'; c.lineWidth = 3; c.strokeRect(x - b * .7, y - b * .7, w + b * 1.4, h + b * 1.4);
      for (let i = 0; i < (w + h) / 12; i++) { const t = r(); c.fillStyle = 'rgba(255,240,180,.35)'; c.beginPath(); c.arc(x - b * .5 + t * (w + b), y - b * .5, 3, 0, 7); c.fill(); } };
    frame(110, 280, 220, 300, 26); vg(c, 110, 280, 220, 300, [[0, '#3a4a5a'], [1, '#6a5a3a']]); c.fillStyle = '#2a3a2a'; c.fillRect(110, 480, 220, 100);
    frame(2290, 280, 200, 280, 24); vg(c, 2290, 280, 200, 280, [[0, '#5a3a2a'], [1, '#2a1a10']]); c.fillStyle = '#c8a888'; c.beginPath(); c.arc(2390, 380, 40, 0, 7); c.fill(); c.fillStyle = '#1a1a1a'; c.fillRect(2340, 420, 100, 140);
    // big empty gilt frame
    const fx = 560, fyy = 260, fw = 640, fh = 680; shadow(c, fx + fw / 2, fyy + fh + 70, fw * .6, 30, .4); frame(fx, fyy, fw, fh, 44); vg(c, fx, fyy, fw, fh, [[0, '#2a1c12'], [1, '#1a100a']]); c.fillStyle = 'rgba(255,220,160,.05)'; c.fillRect(fx, fyy, fw, fh);
    // picture lights
    for (const [lx, ly, lw] of [[880, 190, 300], [220, 230, 140], [2390, 230, 130]]) { c.fillStyle = '#b08a3a'; rr(c, lx - lw / 2, ly - 16, lw, 24, 10); c.fill(); c.fillStyle = '#6a4a1a'; c.fillRect(lx - 4, ly + 8, 8, 30); cone(c, lx, ly + 8, lw, lw * 2.6, 560, '255,210,140', .22); gl(c, lx, ly + 4, lw, '255,220,160', .5); }
    // plinth
    const px = 1700, pw = 460, pt = 900; cone(c, px + pw / 2, 120, 60, 700, 800, '255,215,150', .18); shadow(c, px + pw / 2, fy + 10, pw * .7, 26, .6); vg(c, px, pt, pw, fy - pt, [[0, '#e8e0d0'], [1, '#a89c88']]); hg(c, px, pt, pw, fy - pt, [[0, 'rgba(255,240,210,.3)'], [.6, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.35)']]);
    c.fillStyle = '#f4ecdc'; c.fillRect(px - 20, pt - 30, pw + 40, 34); c.fillStyle = '#c8bca8'; c.fillRect(px - 30, fy - 30, pw + 60, 30); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(px - 20, pt + 4, pw + 40, 8); tex(c, r, px, pt, pw, fy - pt, '#d8d0c0', { al: .1, len: [6, 20] });
    c.fillStyle = '#b8902a'; c.fillRect(px + pw / 2 - 70, pt + 80, 140, 34); c.fillStyle = 'rgba(40,20,0,.5)'; c.fillRect(px + pw / 2 - 50, pt + 94, 100, 5);
    // velvet rope
    for (const sx of [1500, 2360]) { c.fillStyle = '#c8a040'; c.fillRect(sx - 6, 1000, 12, 200); c.beginPath(); c.arc(sx, 996, 14, 0, 7); c.fill(); c.fillStyle = '#8a6a20'; c.beginPath(); c.ellipse(sx, 1200, 40, 10, 0, 0, 7); c.fill(); } c.strokeStyle = '#7a1420'; c.lineWidth = 12; c.beginPath(); c.moveTo(1500, 1010); c.quadraticCurveTo(1930, 1140, 2360, 1010); c.stroke();
    // floor: herringbone parquet
    vg(c, 0, fy, W, H - fy, [[0, '#5a3418'], [1, '#2a180c']]); for (let j = 0; j < 8; j++) { const y = fy + Math.pow(j / 8, 1.3) * (H - fy), hh = 12 + j * 6; for (let x = (j % 2) * 40; x < W; x += 80) { c.fillStyle = P2.rgb(P2.shade(P2.jitter('#6a3e1c', r, 14), r.range(-.15, .1))); poly(c, [[x, y], [x + 40, y], [x + 80, y + hh], [x + 40, y + hh]]); c.fill(); } } reflect(c, fy, 200, .22, 5); c.fillStyle = '#1a0e06'; c.fillRect(0, fy - 10, W, 10);
    ENV.rug(c, r, 900, 1330, 1000, 120, '#5a1420', '#c8a040');
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,190,110,.3)'], [1, 'rgba(40,20,10,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .55 }); },
};
})();
