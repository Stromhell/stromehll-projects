// Pattinson video A-set plates. Paint (one or two at a time):
//   node shared/p2/paint.js pattinson/production/plates_a.js pattinson/production/plates barnes,hall
// Helpers copied from prime/production/plates.js.
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

// ---- A-set helpers ----
// clustered leafy dabs for tree canopies / bushes
const leaves = (c, r, x, y, rx, ry, cols, n = 900, s = 1, lit = null) => { for (let i = 0; i < n; i++) { const a = r() * 6.283, d = Math.sqrt(r()), px = x + Math.cos(a) * rx * d, py = y + Math.sin(a) * ry * d, up = (y - py) / ry;
  c.fillStyle = P2.rgb(P2.shade(P2.jitter(r.pick(cols), r, 14), up * .18 + r.range(-.12, .08))); c.beginPath(); c.ellipse(px, py, r.range(6, 16) * s, r.range(4, 9) * s, r() * 3, 0, 7); c.fill(); }
  if (lit) { for (let i = 0; i < n * .25; i++) { const a = r.range(3.6, 5.8), d = Math.sqrt(r()) , px = x + Math.cos(a) * rx * d, py = y + Math.sin(a) * ry * d; c.fillStyle = `rgba(${lit},${r.range(.25, .6)})`; c.beginPath(); c.ellipse(px, py, r.range(4, 10) * s, r.range(3, 6) * s, r() * 3, 0, 7); c.fill(); } } };
const trunk = (c, x, base, top, w, col) => { const g = c.createLinearGradient(x - w, 0, x + w, 0); g.addColorStop(0, P2.rgb(P2.shade(col, -.35))); g.addColorStop(.4, P2.rgb(P2.shade(col, .15))); g.addColorStop(1, P2.rgb(P2.shade(col, -.45))); c.fillStyle = g; poly(c, [[x - w, base], [x + w, base], [x + w * .45, top], [x - w * .45, top]]); c.fill(); };
const stoneBlocks = (c, r, x, y, w, h, base, bw = 120, bh = 60) => { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = P2.rgb(P2.shade(base, -.35)); c.fillRect(x, y, w, h);
  for (let j = 0, yy = y; yy < y + h; j++, yy += bh) for (let xx = x - (j % 2 ? bw / 2 : 0) - r() * 20; xx < x + w; xx += bw * r.range(.8, 1.2)) { c.fillStyle = P2.rgb(P2.shade(P2.jitter(base, r, 10), r.range(-.14, .06))); c.fillRect(xx + 3, yy + 3, bw - 5, bh - 5); c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(xx + 3, yy + 3, bw - 5, 4); } c.restore(); };
const car = (c, x, fy, w, col, o = {}) => { const h = w * .36; shadow(c, x + w / 2, fy, w * .6, 22, .6); const dk = P2.rgb(P2.shade(col, -.4)), lt = P2.rgb(P2.shade(col, .25));
  let g = c.createLinearGradient(0, fy - h, 0, fy); g.addColorStop(0, lt); g.addColorStop(.5, P2.rgb(col)); g.addColorStop(1, dk); c.fillStyle = g; c.beginPath(); c.moveTo(x, fy - h * .2); c.lineTo(x + w * .02, fy - h * .55); c.lineTo(x + w * .2, fy - h * .6); c.lineTo(x + w * .32, fy - h); c.lineTo(x + w * .72, fy - h); c.lineTo(x + w * .84, fy - h * .6); c.lineTo(x + w * .99, fy - h * .52); c.lineTo(x + w, fy - h * .2); c.closePath(); c.fill();
  c.fillStyle = o.glass || '#2a3440'; poly(c, [[x + w * .34, fy - h * .94], [x + w * .51, fy - h * .94], [x + w * .51, fy - h * .62], [x + w * .23, fy - h * .62]]); c.fill(); poly(c, [[x + w * .53, fy - h * .94], [x + w * .7, fy - h * .94], [x + w * .8, fy - h * .62], [x + w * .53, fy - h * .62]]); c.fill();
  c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x + w * .05, fy - h * .54, w * .9, 4); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + w * .52, fy - h * .62); c.lineTo(x + w * .52, fy - h * .2); c.stroke();
  for (const wx of [x + w * .2, x + w * .8]) { c.fillStyle = '#0c0c0e'; c.beginPath(); c.arc(wx, fy - h * .14, h * .26, 0, 7); c.fill(); c.fillStyle = '#7a7c82'; c.beginPath(); c.arc(wx, fy - h * .14, h * .12, 0, 7); c.fill(); }
  c.fillStyle = o.tail || '#ff3020'; c.fillRect(x + 2, fy - h * .48, 10, h * .12); c.fillStyle = '#fff4d0'; c.fillRect(x + w - 12, fy - h * .48, 10, h * .1); if (o.roof) o.roof(x, fy - h, w); };
const fog = (c, r, y0, y1, col, n, a) => { for (let i = 0; i < n; i++) { const x = r() * c.canvas.width, y = r.range(y0, y1), w = r.range(200, 600); c.save(); c.translate(x, y); c.scale(1, .22); gl(c, 0, 0, w, col, a * r.range(.6, 1.4)); c.restore(); } };
const pine = (c, r, x, base, h, col, lit) => { const w = h * .22; c.fillStyle = P2.rgb(P2.shade(col, -.3)); c.fillRect(x - h * .012, base - h * .3, h * .024, h * .3);
  for (let k = 0; k < 14; k++) { const t = k / 14, y = base - h * .15 - (h * .85) * t, ww = w * (1 - t) + 6; c.fillStyle = P2.rgb(P2.shade(P2.jitter(col, r, 8), -.1 + t * .1)); c.beginPath(); c.moveTo(x - ww, y + h * .05); c.quadraticCurveTo(x - ww * .3, y - h * .02, x, y - h * .08); c.quadraticCurveTo(x + ww * .3, y - h * .02, x + ww, y + h * .05); c.closePath(); c.fill();
    if (lit) { c.fillStyle = `rgba(${lit},.12)`; c.beginPath(); c.moveTo(x, y - h * .08); c.quadraticCurveTo(x + ww * .3, y - h * .02, x + ww, y + h * .05); c.lineTo(x + ww * .5, y + h * .04); c.fill(); } } };

window.PLATES = Object.assign(window.PLATES || {}, {
  // barnes: Barnes riverside street, late-afternoon gold. Road surface y 1180-1440, car drives along y ~1250; pavement y 1130-1180 (figures stand ~1170-1260). Pillar box x 2290. Footbridge behind wall upper centre.
  barnes: (c, r, W, H, P) => { const hz = 640;
    vg(c, 0, 0, W, hz, [[0, '#6a88b0'], [.45, '#c8b0a0'], [.8, '#f2c890'], [1, '#ffd8a0']]); gl(c, 2100, 430, 700, '255,210,140', .55); gl(c, 2100, 430, 140, '255,245,215', .8);
    ENV.clouds(c, r, W, 40, 380, 8, '#ffe0b8', '#d8a890', '#9a8a98');
    // far bank trees + houses
    for (let x = -50; x < W + 50; x += 90) leaves(c, r, x, hz - 50 - r() * 40, 90, 60, ['#6a7a5a', '#7a8a62', '#8a8a6a'], 90, 1.2, '255,210,150');
    for (let i = 0; i < 12; i++) { const x = r() * W; c.fillStyle = 'rgba(150,130,130,.7)'; c.fillRect(x, hz - 70, 60, 60); c.fillStyle = 'rgba(110,80,80,.7)'; poly(c, [[x - 6, hz - 70], [x + 66, hz - 70], [x + 30, hz - 100]]); c.fill(); }
    // river
    vg(c, 0, hz, W, 220, [[0, '#d8b890'], [.5, '#8a8a88'], [1, '#5a6a70']]);
    for (let i = 0; i < 1400; i++) { const y = hz + Math.pow(r(), 1.3) * 220, x = r() * W, nr = Math.abs(x - 2100) < 120 + (y - hz); c.fillStyle = nr ? `rgba(255,225,170,${r.range(.3, .8)})` : `rgba(230,220,210,${r.range(.05, .22)})`; c.fillRect(x, y, r.range(10, 50) * (1 + (y - hz) / 120), 2 + (y - hz) / 90); }
    // ducks
    for (let i = 0; i < 7; i++) { const x = r.range(400, 1600), y = r.range(hz + 80, hz + 190); c.fillStyle = 'rgba(40,40,30,.85)'; c.beginPath(); c.ellipse(x, y, 16, 7, 0, 0, 7); c.fill(); c.beginPath(); c.arc(x + 12, y - 8, 5, 0, 7); c.fill(); c.fillStyle = i % 2 ? '#2a6a40' : '#8a6a4a'; c.beginPath(); c.arc(x + 12, y - 9, 4, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,230,190,.4)'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(x, y + 7, 30, 4, 0, 0, 7); c.stroke(); }
    // footbridge: iron lattice bridge with piers
    const by = hz - 40; c.fillStyle = '#3a3a3c'; for (const px of [300, 900, 1500, 2100]) { c.fillRect(px - 26, by, 52, 110); c.fillStyle = 'rgba(255,210,150,.25)'; c.fillRect(px + 14, by, 10, 110); c.fillStyle = '#3a3a3c'; }
    c.fillStyle = '#2e3436'; c.fillRect(0, by - 70, W, 14); c.fillRect(0, by - 4, W, 16); c.strokeStyle = '#2e3436'; c.lineWidth = 5; for (let x = 0; x < W; x += 50) { c.beginPath(); c.moveTo(x, by - 60); c.lineTo(x + 50, by); c.moveTo(x + 50, by - 60); c.lineTo(x, by); c.stroke(); }
    for (let k = 0; k < 3; k++) { const x0 = 300 + k * 600; c.strokeStyle = '#3a3a3c'; c.lineWidth = 12; c.beginPath(); c.moveTo(x0 + 26, by + 110); c.quadraticCurveTo(x0 + 300, by + 10, x0 + 574, by + 110); c.stroke(); }
    c.fillStyle = 'rgba(255,200,140,.4)'; c.fillRect(0, by - 70, W, 3);
    // low river wall with railings
    const wy = 860; stoneBlocks(c, r, 0, wy, W, 90, '#9a8a78', 70, 30); c.fillStyle = '#c8b498'; c.fillRect(0, wy - 14, W, 16); c.fillStyle = 'rgba(255,220,170,.5)'; c.fillRect(0, wy - 14, W, 3);
    c.fillStyle = '#1c2224'; for (let x = 10; x < W; x += 22) c.fillRect(x, wy - 70, 5, 58); c.fillRect(0, wy - 74, W, 6);
    // terraced houses run on the left behind pavement? houses on far right side across a gap: draw tall terrace right of centre beyond wall
    const house = (x, w, top, col, n) => { stoneBlocks(c, r, x, top, w, wy - top + 40, col, 34, 14); c.fillStyle = '#4a3a3a'; poly(c, [[x - 10, top], [x + w + 10, top], [x + w - 20, top - 90], [x + 20, top - 90]]); c.fill(); for (let k = 0; k < 3; k++) { c.fillStyle = '#6a3a2a'; c.fillRect(x + 30 + k * (w - 80) / 2, top - 130, 30, 50); c.fillStyle = '#b05a3a'; c.fillRect(x + 32 + k * (w - 80) / 2, top - 140, 8, 14); }
      for (let i = 0; i < n; i++) { const hx = x + 30 + i * (w - 60) / n, hw = (w - 60) / n - 30; c.fillStyle = '#e8e0d0'; c.fillRect(hx - 8, top + 40, hw + 16, 150); c.fillStyle = '#2a2a34'; c.fillRect(hx, top + 48, hw, 134); c.fillStyle = 'rgba(255,210,150,.5)'; c.fillRect(hx + 4, top + 52, hw * .4, 124); c.fillStyle = '#e8e0d0'; c.fillRect(hx + hw / 2 - 3, top + 48, 6, 134); c.fillRect(hx, top + 110, hw, 6);
        c.fillStyle = '#ece4d4'; poly(c, [[hx - 20, top + 330], [hx + hw + 20, top + 330], [hx + hw + 40, top + 230], [hx - 40, top + 230]]); c.fill(); c.fillStyle = '#26262e'; for (let j = 0; j < 3; j++) c.fillRect(hx - 24 + j * (hw + 48) / 3 + 8, top + 240, (hw + 48) / 3 - 16, 82); c.fillStyle = 'rgba(255,210,140,.45)'; c.fillRect(hx - 16, top + 244, 30, 74); c.fillStyle = 'rgba(0,0,0,.25)'; poly(c, [[hx + hw + 20, top + 330], [hx + hw + 40, top + 230], [hx + hw + 60, top + 230], [hx + hw + 60, top + 330]]); c.fill();
        const dx = hx + hw + 70; c.fillStyle = '#e8e0d0'; c.fillRect(dx - 8, top + 200, 86, 150); c.fillStyle = r.pick(['#1e3a5a', '#2a4a2a', '#6a1a1a', '#1a1a1a']); c.fillRect(dx, top + 230, 70, 120); c.fillStyle = 'rgba(255,220,160,.5)'; c.beginPath(); c.arc(dx + 35, top + 222, 30, Math.PI, 0); c.fill(); c.fillStyle = '#c8a040'; c.fillRect(dx + 54, top + 290, 6, 6); }
      for (let x2 = x; x2 < x + w; x2 += 14) leaves(c, r, x2, wy + 6, 14, 30, ['#2e4a22', '#3a5a2a'], 12, 1); c.fillStyle = '#1a1a1a'; c.fillRect(x, wy - 34, w, 5); for (let x2 = x; x2 < x + w; x2 += 18) c.fillRect(x2, wy - 34, 4, 40); };
    // Victorian terrace sits on our side of the road? No: place it left, set back on a raised street behind the wall end
    c.save(); c.beginPath(); c.rect(0, 0, 820, wy + 40); c.clip(); house(0, 830, 330, '#a85a42', 3); c.restore();
    c.save(); c.beginPath(); c.rect(1980, 0, W, wy + 40); c.clip(); house(1960, 620, 360, '#b8a080', 2); c.restore();
    // plane trees
    for (const [tx, th, rx] of [[620, 140, 380], [1960, 120, 360], [1280, 220, 300]]) { trunk(c, tx, wy + 20, th + 200, 26, '#8a8070'); for (let k = 0; k < 40; k++) { c.fillStyle = `rgba(220,210,180,${r.range(.2, .5)})`; c.beginPath(); c.ellipse(tx + r.range(-18, 18), r.range(th + 220, wy), r.range(6, 14), r.range(10, 24), 0, 0, 7); c.fill(); }
      for (let k = 0; k < 9; k++) { const cx = tx + r.range(-1, 1) * rx * .75, cy = th + 120 + r.range(-.8, .9) * 150; leaves(c, r, cx, cy + 25, rx * .4, 90, ['#22341a', '#2a3e1e'], 250, 1.5); leaves(c, r, cx, cy, rx * r.range(.3, .5), r.range(80, 120), ['#3e5a24', '#4e6a2c', '#5e7a34', '#34502a'], 700, 1.5, '200,170,90'); }
      c.strokeStyle = '#7a7060'; c.lineWidth = 8; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(tx, th + 260); c.quadraticCurveTo(tx + (k - 1.5) * 80, th + 180, tx + (k - 1.5) * 160, th + 120 + r() * 60); c.stroke(); } }
    // pavement
    vg(c, 0, wy + 40, W, 1180 - wy - 40, [[0, '#a8988a'], [1, '#8a7c70']]); c.strokeStyle = 'rgba(60,50,40,.3)'; c.lineWidth = 2; for (let x = 0; x < W; x += 130) { c.beginPath(); c.moveTo(x, wy + 40); c.lineTo(x - 60, 1180); c.stroke(); } for (const yy of [960, 1040, 1110]) { c.beginPath(); c.moveTo(0, yy); c.lineTo(W, yy); c.stroke(); }
    P2.fillStrokes(c, r, [0, wy + 40, W, 1180 - wy - 40], () => true, { n: 3000, len: [10, 40], w: [3, 7], ang: 0, angJ: .3, al: .14, colFn: () => P2.jitter('#a89888', r, 16) });
    // kerb + road
    c.fillStyle = '#c8bca8'; c.fillRect(0, 1170, W, 18); c.fillStyle = '#6a6058'; c.fillRect(0, 1188, W, 8);
    vg(c, 0, 1196, W, H - 1196, [[0, '#4a4448'], [1, '#2e2a2e']]); P2.fillStrokes(c, r, [0, 1196, W, H - 1196], () => true, { n: 5000, len: [10, 40], w: [3, 8], ang: 0, angJ: .3, al: .2, colFn: () => P2.jitter('#4a4448', r, 14) });
    c.strokeStyle = 'rgba(240,220,90,.8)'; c.lineWidth = 7; for (const yy of [1212, 1224]) { c.beginPath(); c.moveTo(0, yy); c.lineTo(W, yy); c.stroke(); }
    c.fillStyle = 'rgba(240,240,230,.75)'; for (let x = 0; x < W; x += 320) c.fillRect(x, 1350, 180, 10);
    // long tree shadows and sun across the road
    c.save(); c.globalCompositeOperation = 'multiply'; for (const tx of [620, 1280, 1960]) { c.fillStyle = 'rgba(80,70,90,.35)'; poly(c, [[tx - 30, 1000], [tx + 30, 1000], [tx - 300, H], [tx - 520, H]]); c.fill(); } c.restore();
    gl(c, 1700, 1150, 1200, '255,190,110', .18);
    // pillar box right
    shadow(c, 2290, 1150, 70, 12, .55); vg(c, 2250, 950, 80, 200, [[0, '#d8281e'], [1, '#8a1210']]); c.fillStyle = '#d8281e'; c.beginPath(); c.ellipse(2290, 950, 46, 26, 0, Math.PI, 0); c.fill(); c.fillStyle = '#1e0806'; c.fillRect(2262, 990, 56, 9); c.fillStyle = 'rgba(255,220,170,.45)'; c.fillRect(2304, 940, 10, 200); c.fillStyle = '#1a1414'; c.fillRect(2244, 1140, 92, 12); c.fillStyle = '#f0e0c0'; c.fillRect(2270, 1020, 40, 24);
    // lamp post left
    lampPost(c, 140, 1160, 620, '255,220,170', 1.1);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(90,110,160,.35)'], [.7, 'rgba(255,190,110,.45)'], [1, 'rgba(255,170,90,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .38 }); },

  // hall: church-hall amateur theatre. Stage floor y 1180 (stage front edge y 1200, x 520-2040); stage spot pool centred x 1280. Folding chairs only in front-bottom corners (y>1260).
  hall: (c, r, W, H, P) => { const fy = 1180;
    vg(c, 0, 0, W, H, [[0, '#3a2a22'], [1, '#2a1e18']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, 1000], [0, 1000]], '#8a7a62', { density: 300, len: [40, 120], w: [6, 14], ang: Math.PI / 2, angJ: .05, al: .2, topLight: -.1, botDark: -.15 });
    // wall: cream paint over wood dado; high arched windows
    vg(c, 0, 0, W, 900, [[0, '#6a5a48'], [1, '#a08a6a']]); for (let x = 0; x < W; x += 34) { c.fillStyle = 'rgba(60,40,20,.25)'; c.fillRect(x, 820, 3, 400); } vg(c, 0, 820, W, 400, [[0, 'rgba(90,60,36,.9)'], [1, 'rgba(60,40,26,.95)']]);
    for (const wx of [160, 2200]) { c.fillStyle = '#2a3442'; c.beginPath(); c.moveTo(wx, 640); c.lineTo(wx, 240); c.arc(wx + 100, 240, 100, Math.PI, 0); c.lineTo(wx + 200, 640); c.fill(); vg(c, wx + 10, 150, 180, 480, [[0, 'rgba(160,180,210,.5)'], [1, 'rgba(90,110,140,.4)']]); c.strokeStyle = '#4a3a2a'; c.lineWidth = 8; c.beginPath(); c.moveTo(wx + 100, 140); c.lineTo(wx + 100, 640); for (let y = 300; y < 640; y += 110) { c.moveTo(wx, y); c.lineTo(wx + 200, y); } c.stroke(); }
    // roof trusses
    c.fillStyle = '#2a1c14'; c.fillRect(0, 0, W, 70); for (let x = 100; x < W; x += 460) { poly(c, [[x, 70], [x + 30, 70], [x + 230, 160], [x + 200, 160]]); c.fill(); poly(c, [[x + 460, 70], [x + 430, 70], [x + 230, 160], [x + 260, 160]]); c.fill(); }
    // bunting
    const bunt = (x0, x1, y, sag) => { c.strokeStyle = '#d8c8a8'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y); c.quadraticCurveTo((x0 + x1) / 2, y + sag * 2, x1, y); c.stroke(); for (let t = .02; t < 1; t += .04) { const x = x0 + (x1 - x0) * t, yy = y + sag * 4 * t * (1 - t) * 1; c.fillStyle = ['#c8302a', '#f0ece0', '#2a4aa0', '#e8b030', '#3a8a4a'][Math.round(t * 25) % 5]; poly(c, [[x - 14, yy], [x + 14, yy], [x, yy + 36]]); c.fill(); } };
    bunt(0, W, 120, 90); bunt(0, W, 220, 70);
    // proscenium
    const sx0 = 480, sx1 = 2080, st = 230; c.fillStyle = '#5a1418'; c.fillRect(sx0 - 80, st - 60, sx1 - sx0 + 160, fy - st + 80);
    // backdrop: hand-painted countryside
    c.save(); c.beginPath(); c.rect(sx0, st, sx1 - sx0, fy - st); c.clip();
    vg(c, sx0, st, sx1 - sx0, 700, [[0, '#7aa0c8'], [1, '#d8e0c0']]); ENV.clouds(c, r, W, st + 40, st + 260, 5, '#f8f4ea', '#d8d8d0', '#a8a8b0');
    for (let k = 0; k < 3; k++) { c.fillStyle = ['#8aa060', '#6a9048', '#4a7838'][k]; c.beginPath(); c.moveTo(sx0, fy); for (let x = sx0; x <= sx1; x += 40) c.lineTo(x, 620 + k * 110 - Math.sin(x * .004 + k * 2) * 80); c.lineTo(sx1, fy); c.fill(); }
    c.fillStyle = '#e8dcc0'; c.fillRect(1500, 600, 120, 80); c.fillStyle = '#8a3a2a'; poly(c, [[1490, 600], [1630, 600], [1560, 550]]); c.fill();
    for (let i = 0; i < 6; i++) leaves(c, r, sx0 + 100 + i * 280, 700 + r() * 60, 80, 60, ['#3a6a30', '#4a7a38'], 150, 1.4);
    c.fillStyle = 'rgba(0,0,0,.08)'; for (let x = sx0; x < sx1; x += 220) c.fillRect(x, st, 4, fy - st);
    c.restore();
    // curtains
    const curtain = (x, w, dir) => { for (let i = 0; i < w; i += 18) { const k = Math.sin(i * .35); c.fillStyle = P2.rgb(P2.shade('#9a1a22', k * .3 - .05)); c.beginPath(); c.moveTo(x + i, st - 40); c.lineTo(x + i + 20, st - 40); c.quadraticCurveTo(x + i + 20 + dir * (w - i) * .1, fy - 300, x + i + 20 + dir * (w - i) * .25, fy); c.lineTo(x + i + dir * (w - i) * .25, fy); c.quadraticCurveTo(x + i + dir * (w - i) * .1, fy - 300, x + i, st - 40); c.fill(); } c.fillStyle = '#e0b040'; c.fillRect(x + (dir > 0 ? w - 30 : 10), 620, 40, 18); };
    curtain(sx0 - 20, 260, -1); curtain(sx1 - 240, 260, 1);
    for (let i = 0; i < sx1 - sx0 + 80; i += 22) { c.fillStyle = P2.rgb(P2.shade('#9a1a22', Math.sin(i * .3) * .3)); c.fillRect(sx0 - 40 + i, st - 60, 24, 110 + Math.sin(i * .05) * 14); } c.fillStyle = '#d8a840'; c.fillRect(sx0 - 40, st + 50, sx1 - sx0 + 80, 6);
    // stage floor and front
    vg(c, sx0 - 80, fy - 10, sx1 - sx0 + 160, 30, [[0, '#8a6038'], [1, '#6a4428']]); planks(c, r, fy + 20, fy + 30, '#5a3a22', 1);
    vg(c, sx0 - 80, fy + 20, sx1 - sx0 + 160, 140, [[0, '#3a2416'], [1, '#22140c']]); for (let x = sx0 - 80; x < sx1 + 80; x += 90) { c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(x, fy + 20, 3, 140); }
    c.save(); c.beginPath(); c.rect(sx0 - 80, fy - 120, sx1 - sx0 + 160, 140); c.clip(); vg(c, sx0 - 80, fy - 120, sx1 - sx0 + 160, 140, [[0, '#4a3020'], [1, '#7a5432']]); for (let y = fy - 120; y < fy + 20; y += 16) { c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(0, y, W, 2); } c.restore();
    for (let x = sx0; x < sx1; x += 120) { c.fillStyle = '#f0e0a0'; c.fillRect(x, fy + 10, 26, 10); gl(c, x + 13, fy, 60, '255,220,150', .4); }
    // spot pool + beam
    cone(c, 1280, 0, 80, 900, fy, '255,235,190', .1); c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,230,180,.28)'; c.beginPath(); c.ellipse(1280, fy - 50, 470, 70, 0, 0, 7); c.fill(); c.restore(); gl(c, 1280, 800, 700, '255,220,160', .18);
    // hall floor
    planks(c, r, fy + 160, H, '#6a4a2e', 6);
    // folding chairs in corners (rows facing stage)
    const chair = (x, y, s) => { c.fillStyle = '#1a1c20'; c.fillRect(x - 40 * s, y - 120 * s, 80 * s, 70 * s); c.fillStyle = '#2a3040'; c.fillRect(x - 36 * s, y - 116 * s, 72 * s, 50 * s); c.strokeStyle = '#3a3c40'; c.lineWidth = 5 * s; c.beginPath(); c.moveTo(x - 36 * s, y - 50 * s); c.lineTo(x - 30 * s, y); c.moveTo(x + 36 * s, y - 50 * s); c.lineTo(x + 30 * s, y); c.stroke(); c.fillStyle = 'rgba(200,200,220,.2)'; c.fillRect(x - 36 * s, y - 120 * s, 72 * s, 4 * s); };
    for (let row = 0; row < 3; row++) for (let i = 0; i < 2; i++) { const s = 1.4 + row * .5, y = 1300 + row * 80; chair(60 + i * 120 * s * .9, y, s); chair(W - 60 - i * 120 * s * .9, y, s); }
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,190,120,.3)'], [1, 'rgba(40,30,60,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // castle: film set of a gothic castle courtyard, overcast. Floor y 1260 (flagstones 1000-1440). Camera crane left x 120-700, light stands right x 2150-2450. Arches x 560-2000 y 380-990.
  castle: (c, r, W, H, P) => { const fy = 1000;
    vg(c, 0, 0, W, 500, [[0, '#7a8290'], [1, '#b8bcc0']]); ENV.clouds(c, r, W, 20, 360, 12, '#d8dadc', '#a8acb4', '#7a7e88');
    // far towers
    for (const [tx, tw, th] of [[300, 160, 120], [1120, 220, 40], [1900, 180, 90], [2300, 140, 160]]) { stoneBlocks(c, r, tx, th, tw, 500, '#6a6a6e', 40, 20); c.fillStyle = '#3a3e48'; poly(c, [[tx - 20, th], [tx + tw + 20, th], [tx + tw / 2, th - 200]]); c.fill(); c.fillStyle = '#2a2a30'; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(tx + 30 + k * (tw - 60) / 2, th + 200); c.arc(tx + 40 + k * (tw - 60) / 2, th + 160, 10, Math.PI, 0); c.lineTo(tx + 50 + k * (tw - 60) / 2, th + 200); c.fill(); } }
    fog(c, r, 300, 600, '200,205,215', 40, .12);
    // main wall with gothic arcade
    stoneBlocks(c, r, 0, 360, W, fy - 360, '#8a867e', 110, 46); c.fillStyle = '#5a5650'; c.fillRect(0, 330, W, 40); for (let x = 0; x < W; x += 80) c.fillRect(x, 290, 46, 50);
    for (let i = 0; i < 6; i++) { const ax = 560 + i * 240, aw = 180; c.fillStyle = '#1e2026'; c.beginPath(); c.moveTo(ax, fy - 10); c.lineTo(ax, 560); c.quadraticCurveTo(ax, 420, ax + aw / 2, 380); c.quadraticCurveTo(ax + aw, 420, ax + aw, 560); c.lineTo(ax + aw, fy - 10); c.fill();
      vg(c, ax + 10, 600, aw - 20, fy - 610, [[0, 'rgba(60,64,72,.3)'], [1, 'rgba(110,110,104,.6)']]);
      c.strokeStyle = '#b0aca0'; c.lineWidth = 12; c.beginPath(); c.moveTo(ax - 6, fy); c.lineTo(ax - 6, 560); c.quadraticCurveTo(ax - 6, 412, ax + aw / 2, 370); c.quadraticCurveTo(ax + aw + 6, 412, ax + aw + 6, 560); c.lineTo(ax + aw + 6, fy); c.stroke();
      c.fillStyle = '#6a665e'; c.fillRect(ax + aw + 12, 360, 48, fy - 360); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(ax + aw + 12, 360, 8, fy - 360); }
    // banners in house colours, no crests
    const cols = [['#e8b820', '#1a1a1a'], ['#9a1a1e', '#d8a830'], ['#1e3a7a', '#a8a8b0'], ['#1e5a34', '#c0c0c0'], ['#e8b820', '#1a1a1a']];
    [260, 2300, 760, 1520, 1990].forEach((bx, i) => { const [a, b] = cols[i], bw = 150, top = 420, bh = 420; c.fillStyle = '#2a1e14'; c.fillRect(bx - 20, top - 16, bw + 40, 14);
      for (let k = 0; k < bw; k += 6) { const sh = Math.sin(k * .09) * .18; c.fillStyle = P2.rgb(P2.shade(a, sh)); c.fillRect(bx + k, top, 6, bh); } for (let k = 0; k < bw; k += 6) { c.fillStyle = P2.rgb(P2.shade(b, Math.sin(k * .09) * .18)); c.fillRect(bx + k, top + bh * .3, 6, 30); c.fillRect(bx + k, top + bh * .6, 6, 30); }
      c.fillStyle = '#80786a'; poly(c, [[bx, top + bh], [bx + bw, top + bh], [bx + bw, top + bh + 50], [bx + bw / 2, top + bh + 10], [bx, top + bh + 50]]); c.fill(); c.save(); c.beginPath(); poly(c, [[bx, top + bh - 1], [bx + bw, top + bh - 1], [bx + bw, top + bh + 50], [bx + bw / 2, top + bh + 10], [bx, top + bh + 50]]); c.clip(); c.fillStyle = a; c.fillRect(bx, top + bh - 2, bw, 60); c.restore(); });
    // flagstones
    vg(c, 0, fy, W, H - fy, [[0, '#7a766e'], [1, '#5a5650']]);
    for (let j = 0; j < 10; j++) { const y0 = fy + (H - fy) * Math.pow(j / 10, 1.4), y1 = fy + (H - fy) * Math.pow((j + 1) / 10, 1.4), bw = 120 + j * 40; for (let x = -r() * bw; x < W; x += bw * r.range(.8, 1.2)) { c.fillStyle = P2.rgb(P2.shade(P2.jitter('#76726a', r, 10), r.range(-.12, .08))); c.fillRect(x + 3, y0 + 2, bw - 5, y1 - y0 - 3); } }
    for (let i = 0; i < 14; i++) { c.fillStyle = `rgba(150,160,175,${r.range(.15, .3)})`; c.beginPath(); c.ellipse(r() * W, r.range(1080, 1420), r.range(60, 200), r.range(8, 20), 0, 0, 7); c.fill(); }
    // camera crane on left
    shadow(c, 380, 1240, 260, 26, .6); c.fillStyle = '#1e2024'; poly(c, [[240, 1240], [520, 1240], [480, 1180], [280, 1180]]); c.fill(); for (const wx of [270, 490]) { c.fillStyle = '#0c0c0e'; c.beginPath(); c.arc(wx, 1240, 26, 0, 7); c.fill(); }
    c.fillStyle = '#2a2c30'; c.fillRect(360, 900, 40, 290); c.strokeStyle = '#2c2e34'; c.lineWidth = 22; c.beginPath(); c.moveTo(100, 960); c.lineTo(720, 640); c.stroke(); c.strokeStyle = 'rgba(200,210,220,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(100, 952); c.lineTo(720, 632); c.stroke();
    c.fillStyle = '#3a3c42'; c.fillRect(60, 930, 90, 80); c.fillStyle = '#1a1c20'; rr(c, 680, 570, 130, 80, 8); c.fill(); c.fillStyle = '#0a0b0e'; c.beginPath(); c.arc(820, 610, 30, 0, 7); c.fill(); c.fillStyle = 'rgba(120,160,220,.5)'; c.beginPath(); c.arc(816, 604, 10, 0, 7); c.fill(); c.fillStyle = '#ff3030'; c.fillRect(690, 580, 8, 8);
    // light stands right with soft boxes
    for (const [lx, ly] of [[2200, 560], [2420, 620]]) { shadow(c, lx, 1260, 120, 14, .5); c.strokeStyle = '#18181c'; c.lineWidth = 6; for (const dx of [-70, 0, 70]) { c.beginPath(); c.moveTo(lx, 1100); c.lineTo(lx + dx, 1260); c.stroke(); } c.fillRect(lx - 4, ly, 8, 500); c.fillStyle = '#18181c'; c.fillRect(lx - 4, ly, 8, 500);
      c.fillStyle = '#121214'; poly(c, [[lx - 90, ly - 100], [lx + 90, ly - 100], [lx + 60, ly + 20], [lx - 60, ly + 20]]); c.fill(); c.fillStyle = '#f4f2ea'; poly(c, [[lx - 82, ly - 92], [lx + 82, ly - 92], [lx + 56, ly + 12], [lx - 56, ly + 12]]); c.fill(); gl(c, lx, ly - 40, 380, '255,250,235', .4); }
    // cables
    c.strokeStyle = '#141416'; c.lineWidth = 7; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(2200 + k * 40, 1260); c.bezierCurveTo(2000, 1350 + k * 20, 900, 1300 + k * 30, 380 + k * 20, 1240 + k * 30); c.stroke(); }
    c.fillStyle = '#2a2a2e'; rr(c, 1800, 1360, 120, 50, 6); c.fill(); c.fillStyle = '#e0b030'; c.fillRect(1800, 1360, 120, 8);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(150,170,200,.4)'], [1, 'rgba(60,60,70,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // forest: misty Pacific-north-west pine forest, cool green-blue. Floor y 1260 (mossy ground 1100-1440). Light shafts from upper right.
  forest: (c, r, W, H, P) => { const fy = 1100;
    vg(c, 0, 0, W, fy, [[0, '#a8c0c0'], [.6, '#7a9a98'], [1, '#5a7a74']]); gl(c, 1900, 120, 900, '240,250,230', .5);
    for (let L = 0; L < 4; L++) { const col = ['#8aa4a2', '#6a8a86', '#4a6a64', '#2e4a42'][L], h = [700, 900, 1100, 1300][L]; for (let x = -60 + r() * 80; x < W + 60; x += r.range(80, 180) * (1 + L * .3)) pine(c, r, x, fy - 60 + L * 30, h * r.range(.8, 1.2), col, L > 1 ? null : '230,245,235'); fog(c, r, fy - 600, fy, '210,225,225', 30, .1); }
    // shafts
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 7; i++) { const x0 = 1500 + i * 150 + r() * 80; const g = c.createLinearGradient(0, 0, 0, fy + 200); g.addColorStop(0, 'rgba(255,250,220,.22)'); g.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = g; poly(c, [[x0, 0], [x0 + r.range(40, 100), 0], [x0 - 600 + r.range(100, 200), fy + 200], [x0 - 700, fy + 200]]); c.fill(); } c.restore();
    // near trunks at edges
    for (const [tx, tw] of [[110, 90], [380, 50], [2200, 60], [2470, 110]]) { trunk(c, tx, fy + 60, -50, tw, '#4a3a30'); c.fillStyle = 'rgba(120,150,80,.55)'; for (let k = 0; k < 40; k++) c.fillRect(tx - tw + r() * tw * .6, r() * fy, r.range(6, 20), r.range(10, 40)); for (let k = 0; k < 30; k++) { c.strokeStyle = 'rgba(20,14,10,.4)'; c.lineWidth = 3; const y = r() * fy; c.beginPath(); c.moveTo(tx - tw * .4, y); c.lineTo(tx + tw * .4, y + r.range(10, 40)); c.stroke(); } }
    vg(c, 0, fy - 160, W, 170, [[0, 'rgba(40,60,50,0)'], [1, '#2e4236']]); for (let x = 0; x < W; x += 60) leaves(c, r, x + r() * 40, fy - 30, 80, 40, ['#2e4a30', '#3a5a3a', '#4a6a44'], 60, 1.6);
    // ground
    vg(c, 0, fy, W, H - fy, [[0, '#4a6040'], [1, '#2a3a26']]); P2.fillStrokes(c, r, [0, fy, W, H - fy], () => true, { n: 9000, len: [8, 30], w: [3, 8], ang: 0, angJ: .6, al: .3, colFn: () => P2.jitter(r.pick(['#5a7a3a', '#3a5a2e', '#6a5a3a']), r, 14) });
    // path of packed earth in middle
    c.fillStyle = 'rgba(110,96,74,.55)'; c.beginPath(); c.moveTo(900, fy); c.lineTo(1500, fy); c.lineTo(2100, H); c.lineTo(400, H); c.fill();
    // wet rocks
    const rock = (x, y, w, h) => { shadow(c, x, y + h * .3, w * 1.1, h * .3, .5); const g = c.createLinearGradient(0, y - h, 0, y + h * .3); g.addColorStop(0, '#7a8484'); g.addColorStop(1, '#2a3232'); c.fillStyle = g; c.beginPath(); c.ellipse(x, y, w, h, 0, Math.PI, 0); c.lineTo(x + w, y + h * .2); c.lineTo(x - w, y + h * .2); c.fill(); c.fillStyle = 'rgba(90,140,60,.7)'; c.beginPath(); c.ellipse(x - w * .1, y - h * .8, w * .6, h * .25, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(230,245,255,.35)'; c.beginPath(); c.ellipse(x - w * .3, y - h * .6, w * .2, h * .08, -.3, 0, 7); c.fill(); };
    rock(260, 1330, 200, 110); rock(2300, 1360, 230, 130); rock(700, 1140, 70, 40); rock(1980, 1150, 90, 45);
    // ferns
    const fern = (x, y, s) => { for (let f = 0; f < 9; f++) { const a = -Math.PI / 2 + (f / 8 - .5) * 2.6, L = 160 * s; c.strokeStyle = '#3a6a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); const ex = x + Math.cos(a) * L, ey = y + Math.sin(a) * L * .7 + L * .3; c.quadraticCurveTo(x + Math.cos(a) * L * .6, y + Math.sin(a) * L * .7, ex, ey); c.stroke(); for (let k = 1; k < 12; k++) { const t = k / 12, px = x + (ex - x) * t, py = y + (ey - y) * t - Math.sin(t * 3.1) * 20 * s; c.fillStyle = P2.rgb(P2.jitter(t < .5 ? '#4a8a34' : '#6aa040', r, 14)); c.beginPath(); c.ellipse(px, py, 14 * s * (1 - t * .6), 4 * s, a + 1.2, 0, 7); c.fill(); c.beginPath(); c.ellipse(px, py, 14 * s * (1 - t * .6), 4 * s, a - 1.2, 0, 7); c.fill(); } } };
    for (const [x, y, s] of [[60, 1420, 1.6], [520, 1400, 1.2], [180, 1200, .8], [2440, 1430, 1.7], [2050, 1410, 1.1], [2350, 1200, .8], [800, 1130, .5], [1750, 1130, .5]]) fern(x, y, s);
    fog(c, r, fy - 100, fy + 120, '220,235,235', 40, .12);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(150,200,210,.4)'], [1, 'rgba(30,60,70,.45)']]); c.restore();
    done(c, r, W, H, P, { vig: .45 }); },

  // premiere: night red-carpet premiere. Carpet floor y 1240 (carpet y 1080-1440 across full width). Step-and-repeat wall x 300-2260 y 260-1060. Barriers + blurred crowd only at far left/right.
  premiere: (c, r, W, H, P) => { const fy = 1080;
    vg(c, 0, 0, W, fy, [[0, '#06060e'], [1, '#14101e']]);
    // spotlights sweeping
    for (const [sx, a] of [[200, -.3], [2360, .3], [900, -.1], [1700, .15]]) { c.save(); c.translate(sx, fy); c.rotate(a); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, 0, 0, -fy); g.addColorStop(0, 'rgba(220,230,255,.25)'); g.addColorStop(1, 'rgba(220,230,255,0)'); c.fillStyle = g; poly(c, [[-20, 0], [20, 0], [140, -fy * 1.2], [-140, -fy * 1.2]]); c.fill(); c.restore(); }
    // step and repeat wall
    const wx = 300, wy = 260, ww = 1960, wh = fy - wy; vg(c, wx, wy, ww, wh, [[0, '#141628'], [1, '#0c0e1c']]);
    const star = (x, y, s, col) => { c.fillStyle = col; c.beginPath(); for (let i = 0; i < 10; i++) { const rad = i % 2 ? s * .42 : s, a = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); } c.closePath(); c.fill(); };
    for (let j = 0; j < 8; j++) for (let i = 0; i < 14; i++) { const x = wx + 70 + i * 140 + (j % 2) * 70, y = wy + 60 + j * 100; if (x > wx + ww - 30) continue; star(x, y, 22, j % 2 ? 'rgba(210,180,100,.75)' : 'rgba(200,205,220,.55)'); c.fillStyle = 'rgba(200,200,220,.18)'; c.fillRect(x - 30, y + 30, 60, 6); }
    c.fillStyle = '#c8a050'; c.fillRect(wx, wy - 10, ww, 10); c.fillRect(wx, fy - 4, ww, 4); gl(c, 1280, 700, 1200, '255,230,200', .18);
    // flash glows
    for (let i = 0; i < 9; i++) { const x = r.pick([r.range(40, 280), r.range(2280, 2520)]), y = r.range(800, 1000); gl(c, x, y, 200, '235,240,255', .55); sparkle(c, x, y, 14, '255,255,255', .9); }
    // crowd behind barriers on both sides (blurred shapes)
    const crowdSide = (x0, x1) => { const t = document.createElement('canvas'); t.width = W; t.height = H; const tc = t.getContext('2d'); crowd(tc, r, x0, x1, 700, 1060, { rows: 6, s0: 26, s1: 40, col: '#0c0c14', lit: .35, rim: '200,210,255', phone: .1 }); c.save(); c.filter = 'blur(5px)'; c.drawImage(t, 0, 0); c.restore(); };
    crowdSide(0, 300); crowdSide(2260, W);
    // carpet
    vg(c, 0, fy, W, H - fy, [[0, '#6a0e14'], [1, '#a8141e']]); P2.fillStrokes(c, r, [0, fy, W, H - fy], () => true, { n: 7000, len: [10, 40], w: [3, 8], ang: 0, angJ: .2, al: .18, colFn: () => P2.jitter('#9a1820', r, 18) });
    c.fillStyle = '#c8a050'; c.fillRect(0, fy, W, 6); gl(c, 1280, 1250, 1100, '255,200,180', .18);
    // barrier posts with velvet ropes at the edges
    for (const bx of [80, 300, 2260, 2480]) { vg(c, bx - 10, 980, 20, 200, [[0, '#f0d890'], [1, '#8a6a30']]); c.fillStyle = '#e8c870'; c.beginPath(); c.arc(bx, 976, 18, 0, 7); c.fill(); c.fillStyle = '#5a4420'; c.beginPath(); c.ellipse(bx, 1180, 40, 10, 0, 0, 7); c.fill(); }
    c.strokeStyle = '#6a0a12'; c.lineWidth = 14; for (const [a, b] of [[80, 300], [2260, 2480]]) { c.beginPath(); c.moveTo(a, 1000); c.quadraticCurveTo((a + b) / 2, 1070, b, 1000); c.stroke(); }
    reflect(c, fy, 160, .15, 6);
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(200,210,255,${r.range(.01, .04)})`; c.beginPath(); c.arc(r() * W, r() * 900, r.range(30, 120), 0, 7); c.fill(); } c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // arthouse: small independent cinema interior. Front seat row backs at y 1150 (seat tops), rows rise behind; screen x 760-1800 y 120-560 (glowing, blank). Noticeboard x 160-700 y 300-800 (blank cork). Foyer door x 2160-2420 y 420-1000. Floor y 1250 in the aisle at front.
  arthouse: (c, r, W, H, P) => {
    vg(c, 0, 0, W, H, [[0, '#1a0c0e'], [1, '#2a1214']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, 1000], [0, 1000]], '#4a1a1e', { density: 300, len: [40, 120], w: [6, 14], ang: Math.PI / 2, angJ: .05, al: .2, topLight: -.1, botDark: -.15 });
    // fabric wall panels
    for (let x = 0; x < W; x += 30) { c.fillStyle = `rgba(0,0,0,${.12 + Math.sin(x * .2) * .06})`; c.fillRect(x, 0, 14, 1000); }
    // screen
    c.fillStyle = '#0a0606'; c.fillRect(730, 90, 1100, 500); vg(c, 760, 120, 1040, 440, [[0, '#d8dce8'], [1, '#a8b0c8']]); gl(c, 1280, 340, 900, '200,215,255', .35);
    for (const sx of [700, 1830]) for (let i = 0; i < 40; i += 1) { c.fillStyle = P2.rgb(P2.shade('#7a1018', Math.sin(i * .9) * .3)); c.fillRect(sx - 40 + i * 2 - (sx > 1000 ? 0 : 0), 60, 2, 560); }
    // projector beam from back
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(1280, 1000, 1280, 300); g.addColorStop(0, 'rgba(200,215,255,.0)'); g.addColorStop(1, 'rgba(200,215,255,.08)'); c.fillStyle = g; poly(c, [[1250, 1440], [1310, 1440], [1800, 560], [760, 560]]); c.fill(); c.restore();
    // art deco lamps
    const deco = (x, y) => { gl(c, x, y, 220, '255,190,120', .45); c.fillStyle = '#d8a050'; poly(c, [[x - 40, y + 60], [x + 40, y + 60], [x + 20, y - 60], [x - 20, y - 60]]); c.fill(); c.fillStyle = '#ffe0a8'; for (let k = 0; k < 4; k++) poly(c, [[x - 34 + k * 3, y + 50 - k * 28], [x + 34 - k * 3, y + 50 - k * 28], [x + 32 - k * 3, y + 34 - k * 28], [x - 32 + k * 3, y + 34 - k * 28]]), c.fill(); c.fillStyle = '#8a5a20'; c.fillRect(x - 6, y + 60, 12, 30); cone(c, x, y - 60, 30, 260, 300, '255,200,140', .08); };
    deco(880, 720); deco(1680, 720); deco(2000, 300); deco(560, 300);
    // noticeboard
    c.fillStyle = '#4a2e18'; c.fillRect(150, 290, 560, 520); vg(c, 172, 312, 516, 476, [[0, '#a8804e'], [1, '#8a6a3e']]); for (let i = 0; i < 800; i++) { c.fillStyle = `rgba(${r() < .5 ? '60,40,20' : '200,170,120'},.25)`; c.fillRect(172 + r() * 512, 312 + r() * 472, 3, 3); }
    // foyer door with porthole windows and green exit glow
    c.fillStyle = '#2a1a12'; c.fillRect(2140, 400, 300, 600); for (const dx of [2160, 2295]) { vg(c, dx, 420, 125, 580, [[0, '#6a3a22'], [1, '#4a2616']]); c.fillStyle = '#e8c080'; c.beginPath(); c.arc(dx + 62, 560, 34, 0, 7); c.fill(); gl(c, dx + 62, 560, 80, '255,210,140', .5); c.fillStyle = '#d8b060'; c.fillRect(dx + (dx < 2200 ? 105 : 8), 700, 10, 80); }
    c.fillStyle = '#0a3a1a'; c.fillRect(2220, 340, 140, 44); c.fillStyle = '#5aff8a'; c.fillRect(2232, 350, 116, 24); gl(c, 2290, 362, 160, '90,255,140', .35);
    // raked floor & seat rows rising back (back rows higher, smaller)
    vg(c, 0, 1000, W, H - 1000, [[0, '#2a0e10'], [1, '#3a1416']]);
    const row = (y, s, x0, x1) => { const sw = 92 * s; for (let x = x0; x < x1; x += sw) { const g2 = c.createLinearGradient(0, y - 130 * s, 0, y); g2.addColorStop(0, '#c0303a'); g2.addColorStop(1, '#5a0c14'); c.fillStyle = g2; rr(c, x + 4 * s, y - 130 * s, sw - 8 * s, 140 * s, 18 * s); c.fill(); c.fillStyle = 'rgba(255,190,170,.22)'; rr(c, x + 10 * s, y - 126 * s, sw - 20 * s, 14 * s, 7 * s); c.fill(); c.fillStyle = '#1a0608'; c.fillRect(x - 3 * s, y - 70 * s, 7 * s, 90 * s); } c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, y + 10 * s, W, 20 * s); };
    for (let k = 0; k < 5; k++) { const y = 840 + k * 75, s = .55 + k * .12; row(y, s, -20, 1180); row(y, s, 1380, W + 20); }
    row(1150, 1.25, -40, 1120); row(1150, 1.25, 1440, W + 40);
    // aisle carpet with step lights
    c.fillStyle = '#4a1418'; poly(c, [[1190, 840], [1370, 840], [1460, H], [1100, H]]); c.fill(); for (let k = 0; k < 7; k++) { const y = 860 + k * 85; gl(c, 1200 - k * 10, y, 30, '255,200,120', .7); gl(c, 1360 + k * 10, y, 30, '255,200,120', .7); }
    vg(c, 0, 1160, W, H - 1160, [[0, '#2a0c0e'], [1, '#3a1214']]); P2.fillStrokes(c, r, [0, 1160, W, H - 1160], () => true, { n: 4000, len: [10, 30], w: [3, 7], ang: 0, angJ: .3, al: .2, colFn: () => P2.jitter('#4a1418', r, 14) });
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(120,140,220,.25)'], [1, 'rgba(255,150,110,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // ny_night: neon NY side street after rain. Pavement y 1250 (pavement 1120-1300, road below). Yellow cab parked right x 1960-2520 kerb y 1340. Manhole steam x 900 y 1380.
  ny_night: (c, r, W, H, P) => { const pv = 1120;
    vg(c, 0, 0, W, pv, [[0, '#0a0c1c'], [1, '#2a1a34']]);
    city(c, r, 1000, 0, 560, pv, { stars: 30, neon: .5, haze: 'rgba(160,80,140,.35)', layers: [{ h: [.3, .6], col: '#1c1a34', win: '255,200,150', p: .25, ws: 6 }, { h: [.2, .45], col: '#151428', win: '255,212,150', p: .35, ws: 8 }] }); fog(c, r, pv - 300, pv, '160,100,180', 12, .25);
    // brick buildings left and right with fire escapes
    const bld = (x, w, top, col) => { bricks(c, r, x, top, w, pv - top, col, { bw: 40, bh: 16, mortar: '#2a1a18' }); c.fillStyle = 'rgba(10,8,20,.55)'; c.fillRect(x, top, w, pv - top);
      for (let fl = 0; fl < 6; fl++) for (let i = 0; i < Math.floor(w / 160); i++) { const wx = x + 50 + i * 160, wy = top + 60 + fl * 150; if (wy > pv - 400) continue; const lit = r() < .5; c.fillStyle = lit ? r.pick(['#ffcf8a', '#ffe0b0', '#9ac8ff']) : '#141428'; c.fillRect(wx, wy, 70, 100); if (lit) gl(c, wx + 35, wy + 50, 90, '255,200,140', .3); c.fillStyle = '#1a1210'; c.fillRect(wx - 6, wy + 100, 82, 8); }
      // fire escape
      const fx = x + w * .2, fw = w * .6; for (let fl = 0; fl < 4; fl++) { const y = top + 160 + fl * 150; if (y > pv - 380) break; c.fillStyle = '#0a0a0c'; c.fillRect(fx, y, fw, 8); c.strokeStyle = '#0a0a0c'; c.lineWidth = 3; for (let xx = fx; xx < fx + fw; xx += 14) { c.beginPath(); c.moveTo(xx, y); c.lineTo(xx, y - 50); c.stroke(); } c.fillRect(fx, y - 54, fw, 5); c.lineWidth = 5; c.beginPath(); c.moveTo(fx + 20, y); c.lineTo(fx + fw - 20, y + 150); c.stroke(); } };
    bld(-20, 1040, 40, '#6a3226'); bld(1540, 1040, 100, '#5a2c24');
    // bodega fronts with neon
    const shop = (x, w, col, word) => { const y = pv - 360; c.fillStyle = '#100c10'; c.fillRect(x, y, w, 360); vg(c, x + 20, y + 120, w - 40, 220, [[0, '#ffe8b0'], [1, '#e0a860']]); gl(c, x + w / 2, y + 220, w * .7, '255,210,140', .35);
      for (let k = 0; k < 4; k++) for (let j = 0; j < 10; j++) { c.fillStyle = P2.rgb(P2.jitter(r.pick(['#c85a3a', '#e0b040', '#5a9a4a', '#3a6aaa', '#e8e0d0']), r, 20), .8); c.fillRect(x + 40 + j * (w - 80) / 10, y + 150 + k * 46, (w - 80) / 12, 34); }
      c.fillStyle = col; c.fillRect(x - 10, y + 20, w + 20, 80); c.fillStyle = 'rgba(0,0,0,.25)'; for (let k = 0; k < w + 20; k += 40) c.fillRect(x - 10 + k, y + 20, 20, 80); txt(c, word, x + w / 2, y + 60, 50, '#fff6e0', { w: 900 }); };
    shop(80, 700, '#1a4a2a', 'OPEN'); shop(1760, 680, '#7a1a2a', 'DELI');
    const nsign = (x, y, w, h, col) => { gl(c, x + w / 2, y + h / 2, w, col, .4); c.strokeStyle = `rgba(${col},.95)`; c.lineWidth = 8; rr(c, x, y, w, h, 14); c.stroke(); c.strokeStyle = '#fff'; c.lineWidth = 2.5; rr(c, x, y, w, h, 14); c.stroke(); };
    nsign(820, 520, 140, 220, '255,60,160'); nsign(1600, 480, 120, 260, '60,230,255'); nsign(300, 520, 260, 90, '255,150,40'); nsign(2050, 540, 300, 80, '120,255,140');
    // pavement
    vg(c, 0, pv, W, 180, [[0, '#2a2632'], [1, '#1a1822']]); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; for (let x = 0; x < W; x += 180) { c.beginPath(); c.moveTo(x, pv); c.lineTo(x - 40, 1300); c.stroke(); }
    c.fillStyle = '#4a4650'; c.fillRect(0, 1300, W, 16); vg(c, 0, 1316, W, H - 1316, [[0, '#121018'], [1, '#0a0a10']]);
    reflect(c, pv, 320, .55, 4);
    // cab
    car(c, 1960, 1360, 560, '#e8b820', { glass: '#1a2030', roof: (x, y, w) => { c.fillStyle = '#f8f0c0'; c.fillRect(x + w * .44, y - 22, w * .14, 22); gl(c, x + w * .51, y - 10, 80, '255,240,180', .5); } });
    c.fillStyle = '#111'; for (let k = 0; k < 12; k++) c.fillRect(1990 + k * 44, 1290, 22, 8);
    // manhole + steam
    c.fillStyle = '#1c1a20'; c.beginPath(); c.ellipse(900, 1385, 90, 18, 0, 0, 7); c.fill(); c.strokeStyle = '#2c2a30'; c.lineWidth = 3; c.stroke();
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 70; i++) { const t = r(), y = 1380 - t * 700, x = 900 + Math.sin(t * 6) * 60 * t + r.gauss() * 30 * (1 + t * 2), rad = 40 + t * 200; c.fillStyle = `rgba(200,190,220,${.05 * (1 - t * .7)})`; c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill(); } c.restore();
    // puddle highlights
    for (let i = 0; i < 300; i++) { const x = r() * W, y = r.range(1130, H); c.fillStyle = `rgba(${r.pick(['255,60,160', '60,230,255', '255,200,140'])},${r.range(.05, .2)})`; c.fillRect(x, y, r.range(20, 120), 2); }
    lampPost(c, 1500, 1280, 760, '255,210,150', 1.1);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,80,170,.3)'], [.5, 'rgba(80,60,200,.3)'], [1, 'rgba(60,220,255,.25)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // lighthouse: stormy rocky island, white lighthouse right third (tower x 1880-2160, lamp x 2020 y 260). Rock floor y 1250 on left 2/3 (x 0-1700). Waves crash right/foreground edges.
  lighthouse: (c, r, W, H, P) => {
    vg(c, 0, 0, W, 800, [[0, '#0e1218'], [.6, '#2a3440'], [1, '#4a5660']]); ENV.clouds(c, r, W, 0, 500, 16, '#5a6470', '#2e3640', '#161a22');
    gl(c, 600, 200, 400, '200,220,255', .12);
    // sea
    vg(c, 0, 760, W, 500, [[0, '#2a3a44'], [1, '#121c22']]); for (let i = 0; i < 2000; i++) { const y = 760 + Math.pow(r(), 1.2) * 500, x = r() * W; c.fillStyle = `rgba(200,220,230,${r.range(.03, .18)})`; c.fillRect(x, y, r.range(20, 80) * (1 + (y - 760) / 200), 2 + (y - 760) / 160); }
    // beam
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(2020, 0, 200, 0); g.addColorStop(0, 'rgba(255,240,190,.45)'); g.addColorStop(1, 'rgba(255,240,190,0)'); c.fillStyle = g; poly(c, [[2020, 250], [2020, 270], [0, 420], [0, 120]]); c.fill(); c.restore();
    // island rock right with lighthouse
    c.fillStyle = '#1a1e22'; c.beginPath(); c.moveTo(1600, 1260); c.lineTo(1760, 900); c.lineTo(2000, 820); c.lineTo(2300, 860); c.lineTo(2560, 960); c.lineTo(W, 1440); c.lineTo(1600, 1440); c.fill();
    P2.fillStrokes(c, r, [1600, 820, 960, 620], () => true, { n: 2000, len: [20, 60], w: [5, 12], ang: .6, angJ: .4, al: .25, colFn: () => P2.jitter('#2a3036', r, 16) });
    const tx = 2020, tb = 860, tt = 330; c.fillStyle = '#e8e8e4'; poly(c, [[tx - 140, tb], [tx + 140, tb], [tx + 90, tt], [tx - 90, tt]]); c.fill(); c.save(); c.beginPath(); poly(c, [[tx - 140, tb], [tx + 140, tb], [tx + 90, tt], [tx - 90, tt]]); c.clip(); hg(c, tx - 140, tt, 280, tb - tt, [[0, 'rgba(0,0,0,.45)'], [.35, 'rgba(255,255,255,.1)'], [1, 'rgba(0,0,0,.5)']]); c.fillStyle = 'rgba(0,0,0,.15)'; for (let y = tt; y < tb; y += 22) c.fillRect(0, y, W, 2); c.restore();
    c.fillStyle = '#1a1a1e'; c.fillRect(tx - 18, 600, 36, 60); c.fillRect(tx - 16, 450, 32, 50); c.fillStyle = '#2a2a2e'; c.fillRect(tx - 120, tt - 20, 240, 22); c.fillStyle = '#1a1a1e'; rr(c, tx - 70, tt - 110, 140, 90, 4); c.fill();
    c.fillStyle = '#fff2c0'; c.fillRect(tx - 60, tt - 100, 120, 70); gl(c, tx, tt - 65, 400, '255,235,170', .7); gl(c, tx, tt - 65, 120, '255,250,230', .9); c.strokeStyle = '#1a1a1e'; c.lineWidth = 4; for (let k = -40; k <= 40; k += 40) { c.beginPath(); c.moveTo(tx + k, tt - 100); c.lineTo(tx + k, tt - 30); c.stroke(); }
    c.fillStyle = '#2a2a2e'; poly(c, [[tx - 80, tt - 110], [tx + 80, tt - 110], [tx, tt - 180]]); c.fill(); c.fillRect(tx - 3, tt - 210, 6, 40);
    // foreground rock shelf left
    c.fillStyle = '#22262a'; c.beginPath(); c.moveTo(0, 1060); for (let x = 0; x <= 1760; x += 40) c.lineTo(x, 1080 + Math.sin(x * .01) * 20 + r() * 20 + (x > 1500 ? (x - 1500) * .6 : 0)); c.lineTo(1760, H); c.lineTo(0, H); c.fill();
    P2.fillStrokes(c, r, [0, 1060, 1760, 380], (x, y) => y > 1080 + (x > 1500 ? (x - 1500) * .6 : 0) + 20, { n: 6000, len: [20, 70], w: [6, 14], ang: .1, angJ: .5, al: .3, colFn: () => P2.jitter(r.pick(['#3a4046', '#2a2e34', '#4a4e50']), r, 14) });
    c.fillStyle = 'rgba(200,220,230,.12)'; for (let i = 0; i < 40; i++) { c.beginPath(); c.ellipse(r() * 1700, r.range(1200, 1420), r.range(30, 120), r.range(4, 10), 0, 0, 7); c.fill(); }
    // crashing waves
    const splash = (x, y, s) => { for (let i = 0; i < 60; i++) { const a = -Math.PI / 2 + r.gauss() * .8, d = r() * 300 * s; gl(c, x + Math.cos(a) * d * 1.4, y + Math.sin(a) * d, r.range(40, 110) * s, '225,235,240', r.range(.08, .2)); } c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 260; i++) { const a = -Math.PI / 2 + r.gauss() * .9, d = r() * 340 * s; c.fillStyle = `rgba(240,248,250,${r.range(.2, .6)})`; c.beginPath(); c.arc(x + Math.cos(a) * d * 1.4, y + Math.sin(a) * d, r.range(1.5, 5), 0, 7); c.fill(); } c.restore(); };
    splash(1720, 1080, 1.4); splash(2500, 940, 1.2); splash(1650, 1430, 1.2); splash(60, 1120, .8);
    c.strokeStyle = 'rgba(200,215,220,.35)'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x < 1760; x += 20) { const y = 1080 + Math.sin(x * .01) * 20 + 8; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); for (let i = 0; i < 400; i++) { const x = r.range(1650, W), y = r.range(1150, H); c.fillStyle = `rgba(220,232,238,${r.range(.05, .25)})`; c.fillRect(x, y, r.range(20, 70), 3); }
    drizzle(c, r, W, H, 1800, .2);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(100,130,170,.4)'], [1, 'rgba(20,30,40,.45)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // chatshow: TV chat-show set. Floor y 1250. Sofa x 380-1180, seat top y ~1000, back top ~810 (for s 1.9 figures). Host desk x 1620-2240, desktop y 960, host sits behind at x ~1930. Backdrop city screen x 200-2360 y 90-820.
  chatshow: (c, r, W, H, P) => { const fy = 1180;
    vg(c, 0, 0, W, fy, [[0, '#0a0c18'], [1, '#141828']]);
    // city-night backdrop screen
    city(c, r, 200, 90, 2160, 730, { moon: [2000, 200], neon: .15, haze: 'rgba(120,80,160,.35)' });
    c.strokeStyle = '#1a1c28'; c.lineWidth = 30; c.strokeRect(185, 75, 2190, 760);
    // side pillars with LED
    for (const px of [80, 2400]) { vg(c, px, 40, 80, fy - 40, [[0, '#222636'], [1, '#141622']]); c.fillStyle = 'rgba(80,170,255,.9)'; c.fillRect(px + 36, 60, 8, fy - 100); gl(c, px + 40, 600, 260, '80,170,255', .3); }
    // lighting truss
    c.fillStyle = '#0c0d12'; c.fillRect(0, 30, W, 18); for (let i = 0; i < 9; i++) { const x = 160 + i * 280; c.fillStyle = '#1a1c22'; rr(c, x - 24, 46, 48, 40, 6); c.fill(); gl(c, x, 86, 70, '255,240,220', .8); cone(c, x, 86, 40, 400, 700, '255,235,210', .04); }
    // floor: glossy warm stage
    vg(c, 0, fy, W, H - fy, [[0, '#3a2418'], [1, '#5a3420']]); planks(c, r, fy, H, '#4a2c1c', 8); reflect(c, fy, 260, .3, 5); gl(c, 1280, 1300, 1200, '255,170,100', .2);
    c.fillStyle = '#0a0a10'; c.fillRect(0, fy - 20, W, 20); c.fillStyle = 'rgba(255,160,90,.7)'; c.fillRect(0, fy - 2, W, 3);
    // rug + sofa + coffee table
    ENV.rug(c, r, 800, 1220, 1000, 120, '#2a3a5a', '#c8903a');
    sofa(c, 380, 1180, 800, 1.4, '#7a2a30', { pillow: '#d8b060' });
    shadow(c, 1360, 1220, 140, 16, .5); c.fillStyle = '#1a1414'; c.fillRect(1290, 1100, 140, 12); c.fillRect(1350, 1112, 20, 90); c.fillRect(1310, 1196, 100, 10); c.fillStyle = '#e8e0d4'; rr(c, 1330, 1068, 30, 34, 4); c.fill(); c.fillStyle = 'rgba(200,230,255,.3)'; c.fillRect(1376, 1060, 22, 40);
    // host desk right
    shadow(c, 1930, 1180, 380, 26, .6); vg(c, 1600, 940, 660, 30, [[0, '#d8c0a0'], [1, '#8a6a4a']]); c.fillStyle = 'rgba(255,240,210,.6)'; c.fillRect(1600, 940, 660, 3);
    const dg = c.createLinearGradient(1620, 0, 2240, 0); dg.addColorStop(0, '#2a1e2a'); dg.addColorStop(.5, '#4a3448'); dg.addColorStop(1, '#2a1e2a'); c.fillStyle = dg; poly(c, [[1620, 970], [2240, 970], [2210, 1180], [1650, 1180]]); c.fill();
    c.fillStyle = 'rgba(80,170,255,.8)'; c.fillRect(1650, 1160, 560, 5); gl(c, 1930, 1164, 400, '80,170,255', .25); for (let k = 0; k < 5; k++) { c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(1660 + k * 112, 990, 90, 150); }
    c.fillStyle = '#e8e0d4'; rr(c, 1700, 900, 36, 42, 5); c.fill(); c.fillStyle = '#c0c0c8'; c.fillRect(2080, 920, 120, 20); c.fillStyle = 'rgba(200,230,255,.4)'; c.fillRect(1780, 890, 26, 50);
    ENV.plant(c, r, 260, 1180, 1.6); ENV.plant(c, r, 2340, 1180, 1.6);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,160,100,.35)'], [.5, 'rgba(80,80,200,.25)'], [1, 'rgba(255,160,100,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .45 }); },
});
})();
