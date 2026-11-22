// Pattinson B-set background plates. Paint (one or two at a time):
//   node shared/p2/paint.js pattinson/production/plates_b.js pattinson/production/plates gotham_roof,dunes
// Plates are 2560x1440. Helpers copied from jensen-spy/production/plates.js.
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


// ---- B-set helpers ----
const tex = (c, r, x, y, w, h, col, o = {}) => P2.fillStrokes(c, r, [x, y, w, h], () => true, { n: o.n ?? Math.round(w * h / 260), len: o.len || [16, 60], w: o.w || [3, 9], ang: o.ang ?? 0, angJ: o.angJ ?? .25, al: o.al ?? .2, colFn: () => P2.shade(P2.jitter(col, r, o.j ?? 14), r.range(-.14, .1)) });
// mirrored puddles cut into a wet floor whose reflection line is y0
const puddles = (c, r, y0, list, base = '#1c1c24', a = .8) => { const W = c.canvas.width, H = c.canvas.height, snap = document.createElement('canvas'); snap.width = W; snap.height = H; snap.getContext('2d').drawImage(c.canvas, 0, 0);
  for (const [px, py, pw] of list) { const ph = pw * .13; c.save(); c.beginPath(); c.ellipse(px, py, pw, ph, 0, 0, 7); c.clip(); c.fillStyle = base; c.fillRect(px - pw, py - ph, pw * 2, ph * 2); c.translate(0, 2 * y0); c.scale(1, -1); c.globalAlpha = a; c.drawImage(snap, 0, 0); c.restore();
    c.save(); c.beginPath(); c.ellipse(px, py, pw, ph, 0, 0, 7); c.clip(); for (let k = 0; k < 4; k++) { const rx = px + r.range(-.6, .6) * pw, ry = py + r.range(-.5, .5) * ph; for (let j = 1; j < 4; j++) { c.strokeStyle = `rgba(230,235,255,${.2 / j})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse(rx, ry, j * 16, j * 3.5, 0, 0, 7); c.stroke(); } } c.restore();
    c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 3; c.beginPath(); c.ellipse(px, py, pw, ph, 0, Math.PI, 0); c.stroke(); } };
const tint = (c, W, H, stops, mode = 'soft-light') => { c.save(); c.globalCompositeOperation = mode; vg(c, 0, 0, W, H, stops); c.restore(); };
const torch = (c, r, x, y, s = 1) => { c.fillStyle = '#3a2412'; poly(c, [[x - 10 * s, y], [x + 10 * s, y], [x + 5 * s, y + 90 * s], [x - 5 * s, y + 90 * s]]); c.fill(); c.fillStyle = '#6a4a22'; c.fillRect(x - 14 * s, y - 6 * s, 28 * s, 14 * s);
  gl(c, x, y - 30 * s, 340 * s, '255,150,60', .45); for (let i = 0; i < 3; i++) { const fc = ['255,120,30', '255,190,80', '255,240,190'][i], k = 1 - i * .3; c.fillStyle = `rgba(${fc},.9)`; c.beginPath(); c.moveTo(x - 16 * s * k, y - 4 * s); c.quadraticCurveTo(x - 20 * s * k, y - 40 * s * k, x + r.range(-4, 4) * s, y - 80 * s * k); c.quadraticCurveTo(x + 18 * s * k, y - 36 * s * k, x + 16 * s * k, y - 4 * s); c.fill(); } };
const brazier = (c, r, x, fy, s = 1) => { shadow(c, x, fy, 120 * s, 18 * s, .5); c.strokeStyle = '#2a1c10'; c.lineWidth = 8 * s; for (const dx of [-50, 0, 50]) { c.beginPath(); c.moveTo(x + dx * .4 * s, fy - 170 * s); c.lineTo(x + dx * s, fy); c.stroke(); }
  const g = c.createLinearGradient(x - 90 * s, 0, x + 90 * s, 0); g.addColorStop(0, '#3a2410'); g.addColorStop(.5, '#a8743a'); g.addColorStop(1, '#2a1808'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 90 * s, fy - 230 * s); c.lineTo(x + 90 * s, fy - 230 * s); c.quadraticCurveTo(x + 70 * s, fy - 160 * s, x, fy - 160 * s); c.quadraticCurveTo(x - 70 * s, fy - 160 * s, x - 90 * s, fy - 230 * s); c.fill();
  gl(c, x, fy - 260 * s, 600 * s, '255,140,50', .5); c.save(); c.filter = `blur(${7 * s}px)`; for (let i = 0; i < 4; i++) { const fc = ['200,60,20', '255,120,30', '255,190,80', '255,240,190'][i], k = 1 - i * .22; c.fillStyle = `rgba(${fc},.9)`; c.beginPath(); c.moveTo(x - 80 * s * k, fy - 228 * s); for (let j = 0; j <= 6; j++) { const t = j / 6; c.lineTo(x + (t * 2 - 1) * 80 * s * k, fy - 228 * s - (j % 2 ? 150 : 70) * s * k * r.range(.7, 1.1)); } c.closePath(); c.fill(); } c.restore();
  for (let i = 0; i < 20; i++) { c.fillStyle = `rgba(255,${r.int(150, 230)},90,${r.range(.4, .9)})`; c.fillRect(x + r.gauss() * 60 * s, fy - 300 * s - r() * 300 * s, 3, 3); } };

Object.assign(window.PLATES = window.PLATES || {}, {
  // gotham_roof: rainy gothic rooftop at night. Roof floor y 1250 (parapet behind at y 880-1080). Searchlight circle on clouds ~x 1640 y 250 r 120. Gargoyle x 120-420, water tower x 2120-2500.
  gotham_roof: (c, r, W, H, P) => { const fy = 1250, pb = 1080;
    vg(c, 0, 0, W, 900, [[0, '#06070f'], [.45, '#141a2e'], [1, '#2a2c44']]);
    ENV.clouds(c, r, W, 40, 520, 16, '#5a6688', '#2a3048', '#10121e', { scale: 1.6 });
    gl(c, 860, 180, 700, '170,190,255', .35); gl(c, 860, 180, 260, '230,235,255', .4);
    // lightning bolt far left
    c.strokeStyle = 'rgba(235,240,255,.85)'; c.lineWidth = 3; c.beginPath(); let lx = 760, ly = 120; c.moveTo(lx, ly); for (let i = 0; i < 9; i++) { lx += r.range(-40, 40); ly += r.range(30, 55); c.lineTo(lx, ly); } c.stroke(); c.lineWidth = 8; c.strokeStyle = 'rgba(180,200,255,.2)'; c.stroke();
    // searchlight beam from city into the cloud
    c.save(); c.globalCompositeOperation = 'screen'; let g = c.createLinearGradient(1900, 880, 1640, 250); g.addColorStop(0, 'rgba(255,240,200,.35)'); g.addColorStop(1, 'rgba(255,240,200,.06)'); c.fillStyle = g; poly(c, [[1890, 880], [1915, 880], [1760, 250], [1520, 250]]); c.fill(); c.restore();
    c.save(); c.translate(1640, 250); c.scale(1, .45); gl(c, 0, 0, 260, '255,240,200', .5); c.fillStyle = 'rgba(255,246,215,.55)'; c.beginPath(); c.arc(0, 0, 120, 0, 7); c.fill(); c.restore();
    // far gothic city
    city(c, r, 0, 260, W, 700, { sky: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0)']], stars: 0, haze: 'rgba(90,100,140,.3)', cool: .1,
      layers: [{ h: [.2, .5], col: '#1a1e30', win: '230,190,130', p: .18, ws: 4 }, { h: [.25, .62], col: '#12141f', win: '240,200,140', p: .26, ws: 6 }, { h: [.18, .42], col: '#0b0c14', win: '255,210,150', p: .34, ws: 8 }],
      landmark: (c, r, base) => { for (const [x, h] of [[420, 560], [1180, 640], [2050, 600]]) { c.fillStyle = '#161a28'; c.fillRect(x - 60, base - h + 120, 120, h - 120); poly(c, [[x - 60, base - h + 120], [x + 60, base - h + 120], [x, base - h - 60]]); c.fill(); for (const dx of [-70, 70]) { poly(c, [[x + dx - 14, base - h + 160], [x + dx + 14, base - h + 160], [x + dx, base - h + 60]]); c.fill(); } c.fillStyle = 'rgba(255,200,130,.55)'; c.fillRect(x - 14, base - h + 200, 28, 50); } } });
    gl(c, 1900, 880, 120, '255,240,200', .7);
    // parapet wall with coping
    vg(c, 0, 930, W, pb - 930, [[0, '#4a4c5a'], [1, '#22232c']]); bricks(c, r, 0, 960, W, pb - 960, '#3a3c48', { bw: 120, bh: 40, mortar: '#1e1f26' });
    vg(c, 0, 900, W, 36, [[0, '#8a8ea0'], [1, '#3e404c']]); c.fillStyle = 'rgba(200,215,255,.35)'; c.fillRect(0, 900, W, 3); for (let x = 0; x < W; x += 260) { c.fillStyle = '#2e303a'; c.fillRect(x, 870, 70, 34); c.fillStyle = 'rgba(200,215,255,.25)'; c.fillRect(x, 870, 70, 3); }
    // gargoyle on the left corner pedestal
    vg(c, 100, 820, 340, 90, [[0, '#5a5c68'], [1, '#2a2b34']]); c.fillStyle = '#2a2b34'; c.fillRect(120, 720, 300, 110);
    c.fillStyle = '#34363f'; c.beginPath(); c.moveTo(150, 730); c.quadraticCurveTo(130, 560, 250, 470); c.lineTo(300, 520); c.quadraticCurveTo(360, 470, 420, 520); c.quadraticCurveTo(470, 600, 400, 730); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(200, 560); c.lineTo(60, 380); c.lineTo(110, 470); c.lineTo(40, 470); c.lineTo(120, 540); c.lineTo(70, 600); c.closePath(); c.fill(); // wing
    c.beginPath(); c.ellipse(430, 520, 62, 50, .3, 0, 7); c.fill(); poly(c, [[400, 480], [380, 400], [430, 470]]); c.fill(); poly(c, [[450, 478], [470, 400], [480, 488]]); c.fill(); poly(c, [[470, 520], [540, 545], [470, 560]]); c.fill();
    c.fillStyle = 'rgba(150,170,230,.35)'; c.beginPath(); c.moveTo(250, 470); c.quadraticCurveTo(140, 560, 155, 720); c.lineTo(170, 720); c.quadraticCurveTo(165, 580, 258, 482); c.fill(); c.beginPath(); c.ellipse(420, 500, 40, 14, .3, Math.PI, 0); c.fill();
    c.fillStyle = 'rgba(255,190,120,.7)'; c.beginPath(); c.arc(450, 512, 5, 0, 7); c.fill(); gl(c, 300, 560, 380, '140,160,230', .12); tex(c, r, 60, 380, 480, 450, '#2c2e38', { n: 900, al: .15 });
    // water tower
    const tx = 2310; c.strokeStyle = '#1a1b22'; c.lineWidth = 14; for (const dx of [-150, -50, 50, 150]) { c.beginPath(); c.moveTo(tx + dx * .8, 640); c.lineTo(tx + dx, 1100); c.stroke(); } c.lineWidth = 6; for (const y of [760, 900, 1020]) { c.beginPath(); c.moveTo(tx - 160, y); c.lineTo(tx + 160, y); c.stroke(); }
    g = c.createLinearGradient(tx - 170, 0, tx + 170, 0); g.addColorStop(0, '#2a2018'); g.addColorStop(.35, '#5a4430'); g.addColorStop(1, '#1a140e'); c.fillStyle = g; c.fillRect(tx - 170, 380, 340, 270); for (let x = tx - 170; x < tx + 170; x += 24) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x, 380, 3, 270); } c.fillStyle = '#1a1612'; for (const y of [420, 520, 620]) c.fillRect(tx - 174, y, 348, 8);
    c.fillStyle = '#16120e'; poly(c, [[tx - 190, 384], [tx + 190, 384], [tx, 270]]); c.fill(); c.fillStyle = 'rgba(160,180,240,.3)'; poly(c, [[tx - 190, 384], [tx - 160, 384], [tx, 278], [tx, 270]]); c.fill();
    // roof floor: wet tar with vents
    vg(c, 0, pb, W, H - pb, [[0, '#1a1b22'], [1, '#2a2a32']]); tex(c, r, 0, pb, W, H - pb, '#24252e', { n: 9000, len: [20, 90], ang: 0, angJ: .1, al: .25 }); reflect(c, pb, 300, .45, 5);
    for (const [vx, vy] of [[700, 1120], [1850, 1110]]) { c.fillStyle = '#2a2c34'; c.fillRect(vx - 40, vy - 80, 80, 80); c.fillStyle = '#3a3c46'; c.fillRect(vx - 54, vy - 96, 108, 18); c.fillStyle = 'rgba(200,210,255,.25)'; c.fillRect(vx - 54, vy - 96, 108, 3); }
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let i = 0; i < 9; i++) { const y = pb + 20 + Math.pow(i / 9, 1.5) * (H - pb); c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    puddles(c, r, pb, [[1280, 1300, 380], [520, 1210, 220], [2000, 1360, 300], [900, 1400, 240], [2350, 1220, 180]], '#14151c', .8);
    drizzle(c, r, W, H, 3200, .25); gl(c, 1280, 1250, 1100, '120,140,220', .08);
    tint(c, W, H, [[0, 'rgba(70,90,170,.45)'], [1, 'rgba(30,30,60,.4)']]);
    done(c, r, W, H, P, { vig: .55 }); },

  // protest_street: rainy night street outside a cinema-style building with a blank marquee. Pavement y 1250 (kerb at y 1330). Marquee panel x 800-1760 y 330-470 (blank, for overlay text). Doors x 940-1620 y 600-1060.
  protest_street: (c, r, W, H, P) => { const pv = 1080;
    vg(c, 0, 0, W, 400, [[0, '#080a14'], [1, '#1c1a2c']]); ENV.clouds(c, r, W, 20, 200, 8, '#3a3850', '#22203a', '#100e1c');
    // side buildings
    for (const [x0, w, col] of [[0, 660, '#2a2226'], [1900, 660, '#262430']]) { ENV.box(c, r, x0, 120, w, pv - 120, col, { edge: false }); for (let wy = 200; wy < 900; wy += 150) for (let wx = x0 + 60; wx < x0 + w - 100; wx += 160) { const lit = r() < .45; c.fillStyle = lit ? `rgba(255,${r.int(180, 215)},130,${r.range(.6, .9)})` : '#121018'; c.fillRect(wx, wy, 90, 110); if (lit) gl(c, wx + 45, wy + 55, 90, '255,200,130', .2); c.fillStyle = '#18141a'; c.fillRect(wx - 6, wy + 110, 102, 10); c.fillRect(wx + 43, wy, 4, 110); } }
    // cinema facade
    const fx = 660, fw = 1240; vg(c, fx, 60, fw, pv - 60, [[0, '#4a3a3a'], [1, '#2a2024']]); tex(c, r, fx, 60, fw, pv - 60, '#3c3032', { n: 7000, ang: Math.PI / 2, angJ: .1, al: .18 });
    c.fillStyle = '#5a4848'; c.fillRect(fx, 60, fw, 30); for (let x = fx + 40; x < fx + fw; x += 150) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x, 90, 16, 200); c.fillStyle = 'rgba(255,200,170,.12)'; c.fillRect(x - 4, 90, 4, 200); }
    // tall vertical blank sign
    c.fillStyle = '#1a1014'; rr(c, 1230, 80, 100, 240, 10); c.fill(); c.strokeStyle = 'rgba(255,90,70,.8)'; c.lineWidth = 5; rr(c, 1240, 90, 80, 220, 8); c.stroke(); gl(c, 1280, 200, 260, '255,80,60', .3);
    // marquee: lit bulb border, blank panel
    c.fillStyle = '#16101a'; poly(c, [[740, 300], [1820, 300], [1880, 520], [680, 520]]); c.fill(); vg(c, 780, 330, 1000, 150, [[0, '#f4ecd8'], [1, '#d8ccb0']]); gl(c, 1280, 400, 800, '255,235,190', .35);
    for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(80,70,60,.08)'; c.fillRect(800, 345 + i * 22, 960, 2); }
    for (let x = 750; x <= 1810; x += 32) for (const y of [312, 500]) { gl(c, x, y, 26, '255,210,130', .7); c.fillStyle = '#fff2c8'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); }
    c.fillStyle = '#100a10'; poly(c, [[680, 520], [1880, 520], [1840, 560], [720, 560]]); c.fill(); cone(c, 1280, 560, 1100, 1500, 520, '255,220,160', .14);
    // glowing doors
    c.fillStyle = '#140e10'; c.fillRect(920, 580, 720, pv - 580); vg(c, 940, 600, 680, pv - 600, [[0, '#f0c890'], [1, '#a8683a']]); gl(c, 1280, 820, 600, '255,200,130', .45);
    for (let x = 940; x <= 1620; x += 170) { c.fillStyle = '#2a1a14'; c.fillRect(x - 8, 600, 16, pv - 600); c.fillStyle = '#c8a050'; c.fillRect(x + 50, 820, 60, 8); }
    c.fillStyle = 'rgba(120,40,40,.5)'; c.fillRect(940, 960, 680, 100); for (let i = 0; i < 4; i++) { c.fillStyle = '#1e1416'; rr(c, 690 + i * 0, 640, 200, 360, 6); }
    // two blank poster cases either side
    for (const px of [700, 1680]) { c.fillStyle = '#c8a050'; c.fillRect(px - 8, 620, 196, 360); vg(c, px, 628, 180, 344, [[0, '#2a2030'], [1, '#141018']]); gl(c, px + 90, 800, 200, '255,220,180', .12); c.fillStyle = 'rgba(255,255,255,.1)'; poly(c, [[px + 20, 628], [px + 70, 628], [px + 10, 972], [px, 972]]); c.fill(); }
    // pavement + kerb + road
    vg(c, 0, pv, W, 250, [[0, '#2e2c34'], [1, '#3c3a44']]); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let x = -200; x < W + 200; x += 220) { c.beginPath(); c.moveTo(1280 + (x - 1280) * .7, pv); c.lineTo(x, pv + 250); c.stroke(); } for (const y of [1130, 1200, 1290]) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    tex(c, r, 0, pv, W, 250, '#34323c', { n: 5000, al: .15 }); c.fillStyle = '#6a6870'; c.fillRect(0, 1330, W, 16); vg(c, 0, 1346, W, H - 1346, [[0, '#18181e'], [1, '#202026']]); c.fillStyle = 'rgba(230,200,90,.7)'; c.fillRect(0, 1400, W, 8);
    reflect(c, pv, 340, .55, 4);
    // street lamps (outside the middle band)
    for (const lx of [260, 2300]) lampPost(c, lx, 1300, 820, '255,215,150', 1.3);
    puddles(c, r, pv, [[1280, 1230, 420], [560, 1170, 240], [1980, 1290, 300], [880, 1310, 220], [2350, 1150, 160]], '#1a1820', .85);
    gl(c, 1280, 1150, 900, '255,200,140', .12); drizzle(c, r, W, H, 3000, .24);
    tint(c, W, H, [[0, 'rgba(90,70,150,.4)'], [1, 'rgba(40,30,60,.35)']]);
    done(c, r, W, H, P, { vig: .5 }); },
  // foyer: bright cinema foyer. Floor y 1250 (back wall base y 1060). Blank poster frames: A x 500-1000 y 220-900, B x 1500-2200 y 220-900 (dark, empty). Popcorn counter x 0-440, queue barriers y ~1110.
  foyer: (c, r, W, H, P) => { const bw = 1060;
    vg(c, 0, 0, W, bw, [[0, '#7a2a2c'], [.15, '#a8403a'], [1, '#8a3030']]); tex(c, r, 0, 0, W, bw, '#9a3836', { n: 9000, ang: Math.PI / 2, angJ: .08, al: .16 });
    // ceiling band with downlights
    vg(c, 0, 0, W, 120, [[0, '#2a1c1a'], [1, '#4a2a26']]); c.fillStyle = '#d8b060'; c.fillRect(0, 118, W, 8);
    for (let x = 160; x < W; x += 320) { c.fillStyle = '#fff4d8'; c.beginPath(); c.ellipse(x, 110, 34, 8, 0, 0, 7); c.fill(); cone(c, x, 112, 60, 420, 900, '255,230,180', .1); gl(c, x, 120, 160, '255,235,190', .5); }
    // art-deco pilasters and wall sconces
    for (const x of [380, 1250, 2300]) { const g = c.createLinearGradient(x - 40, 0, x + 40, 0); g.addColorStop(0, '#6a2224'); g.addColorStop(.5, '#c8a050'); g.addColorStop(1, '#5a1e20'); c.fillStyle = g; c.fillRect(x - 30, 126, 60, bw - 126); for (let k = 0; k < 3; k++) { c.fillStyle = 'rgba(255,230,170,.3)'; c.fillRect(x - 22 + k * 18, 140, 4, bw - 160); } }
    for (const x of [1250]) { c.fillStyle = '#e8c880'; poly(c, [[x - 70, 520], [x + 70, 520], [x + 40, 600], [x - 40, 600]]); c.fill(); gl(c, x, 520, 300, '255,220,160', .55); }
    // two blank poster frames
    for (const [x0, x1] of [[500, 1000], [1500, 2200]]) { gl(c, (x0 + x1) / 2, 200, 500, '255,235,200', .35); c.fillStyle = '#b8903a'; c.fillRect(x0 - 26, 194, x1 - x0 + 52, 732); c.fillStyle = '#ecd08a'; c.fillRect(x0 - 26, 194, x1 - x0 + 52, 6); c.fillStyle = '#7a5a20'; c.fillRect(x0 - 10, 210, x1 - x0 + 20, 700);
      vg(c, x0, 220, x1 - x0, 680, [[0, '#1c181e'], [1, '#100c12']]); c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.05)'; poly(c, [[x0 + 40, 220], [x0 + 140, 220], [x0 + 20, 900], [x0, 900], [x0, 700]]); c.fill(); c.restore();
      for (const bx of [x0 - 13, x1 + 13]) for (let y = 230; y < 900; y += 60) { gl(c, bx, y, 18, '255,220,150', .6); c.fillStyle = '#fff0c0'; c.beginPath(); c.arc(bx, y, 4, 0, 7); c.fill(); } }
    // dado rail + lower panelling
    vg(c, 0, 940, W, bw - 940, [[0, '#4a1a1c'], [1, '#2a0e10']]); c.fillStyle = '#d8b060'; c.fillRect(0, 936, W, 8); for (let x = 0; x < W; x += 160) { c.strokeStyle = 'rgba(216,176,96,.35)'; c.lineWidth = 3; c.strokeRect(x + 14, 960, 132, bw - 980); }
    // patterned carpet
    vg(c, 0, bw, W, H - bw, [[0, '#4a1630'], [1, '#6a1e3a']]);
    for (let j = 0; j < 9; j++) { const t0 = Math.pow(j / 9, 1.5), t1 = Math.pow((j + 1) / 9, 1.5), y = bw + t0 * (H - bw), h = (t1 - t0) * (H - bw), s = h * 1.1;
      for (let x = (j % 2) * s / 2 - s; x < W + s; x += s) { c.fillStyle = 'rgba(230,180,80,.35)'; poly(c, [[x, y + h * .1], [x + s * .25, y + h * .5], [x, y + h * .9], [x - s * .25, y + h * .5]]); c.fill(); c.fillStyle = 'rgba(40,120,140,.35)'; c.beginPath(); c.ellipse(x + s / 2, y + h / 2, s * .08, h * .12, 0, 0, 7); c.fill(); } }
    tex(c, r, 0, bw, W, H - bw, '#5a1a34', { n: 9000, len: [6, 18], angJ: 1, al: .15 });
    // popcorn counter on the left
    shadow(c, 220, 1120, 300, 20, .5); vg(c, 0, 820, 460, 40, [[0, '#f0e0c0'], [1, '#b89a70']]); vg(c, 0, 860, 450, 250, [[0, '#d8a040'], [1, '#8a5a1a']]); for (let x = 20; x < 450; x += 70) { c.fillStyle = 'rgba(255,240,200,.25)'; c.fillRect(x, 870, 30, 230); }
    c.fillStyle = 'rgba(30,10,10,.5)'; c.fillRect(0, 1100, 450, 12);
    const mx = 120; c.fillStyle = '#b8202a'; c.fillRect(mx - 90, 560, 180, 260); c.fillStyle = '#e8d8a0'; c.fillRect(mx - 90, 540, 180, 24); vg(c, mx - 74, 590, 148, 190, [[0, '#fff6d8'], [1, '#f0d080']]); gl(c, mx, 690, 220, '255,230,150', .5);
    for (let i = 0; i < 140; i++) { c.fillStyle = r.pick(['#fffaf0', '#f8e8b8', '#f0d890']); c.beginPath(); c.arc(mx - 70 + r() * 140, 700 + r() * 80, r.range(4, 8), 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 3; c.strokeRect(mx - 74, 590, 148, 190);
    for (let i = 0; i < 5; i++) { const bx = 250 + i * 40, by = 820; c.fillStyle = '#f4f0e8'; poly(c, [[bx - 15, by], [bx + 15, by], [bx + 19, by - 54], [bx - 19, by - 54]]); c.fill(); c.fillStyle = '#c82a2a'; for (let k = -1; k <= 1; k++) c.fillRect(bx + k * 10 - 3, by - 54, 6, 54); for (let k = 0; k < 6; k++) { c.fillStyle = '#fff6d8'; c.beginPath(); c.arc(bx - 14 + k * 6, by - 58, 6, 0, 7); c.fill(); } }
    // menu board above counter (no text, just price-like blocks)
    c.fillStyle = '#16101a'; c.fillRect(30, 170, 300, 300); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(255,230,180,.6)'; c.fillRect(56, 200 + k * 44, 150, 12); c.fillStyle = 'rgba(255,200,90,.8)'; c.fillRect(250, 200 + k * 44, 50, 12); } gl(c, 180, 320, 260, '255,220,170', .15);
    // queue barriers (brass posts, red rope) along the back
    for (let i = 0; i < 8; i++) { const x = 540 + i * 230, y = 1120; shadow(c, x, y, 40, 8, .5); c.fillStyle = '#c8a050'; c.beginPath(); c.ellipse(x, y, 30, 8, 0, 0, 7); c.fill(); vg(c, x - 6, y - 280, 12, 280, [[0, '#f0d890'], [1, '#8a6a2a']]); c.fillStyle = '#f0d890'; c.beginPath(); c.arc(x, y - 286, 13, 0, 7); c.fill();
      if (i < 7) { c.strokeStyle = '#8a1420'; c.lineWidth = 10; c.beginPath(); c.moveTo(x + 6, y - 260); c.quadraticCurveTo(x + 115, y - 190, x + 224, y - 260); c.stroke(); c.strokeStyle = 'rgba(255,160,160,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 6, y - 264); c.quadraticCurveTo(x + 115, y - 194, x + 224, y - 264); c.stroke(); } }
    ENV.plant(c, r, 2470, 1160, 1.6);
    gl(c, 1280, 1200, 1200, '255,220,170', .14);
    tint(c, W, H, [[0, 'rgba(255,210,160,.35)'], [1, 'rgba(120,40,80,.3)']]);
    done(c, r, W, H, P, { vig: .35 }); },

  // greek_hall: ancient Greek feasting hall, firelight. Floor y 1250 (back wall base y 1040). Loom x 1130-1430 y 640-1010. Braziers x 260 and 2300 (front corners). Low tables/couches along back y 1040-1120.
  greek_hall: (c, r, W, H, P) => { const bw = 1040;
    vg(c, 0, 0, W, bw, [[0, '#2a1810'], [.3, '#6a3a22'], [1, '#8a5232']]); tex(c, r, 0, 160, W, bw - 160, '#7a4a2e', { n: 10000, ang: Math.PI / 2, angJ: .2, al: .16 });
    // painted frieze band
    vg(c, 0, 150, W, 110, [[0, '#a8603a'], [1, '#7a3a22']]); c.fillStyle = '#e8d0a0'; c.fillRect(0, 148, W, 8); c.fillRect(0, 258, W, 8);
    for (let x = 0; x < W; x += 60) { c.strokeStyle = '#1a0e08'; c.lineWidth = 6; c.beginPath(); c.moveTo(x, 236); c.lineTo(x, 176); c.lineTo(x + 40, 176); c.lineTo(x + 40, 216); c.lineTo(x + 20, 216); c.stroke(); }
    for (let x = 0; x < W; x += 130) { c.fillStyle = '#1a0e08'; c.beginPath(); c.ellipse(x + 30, 330, 14, 22, 0, 0, 7); c.fill(); poly(c, [[x + 20, 345], [x + 40, 345], [x + 50, 420], [x + 10, 420]]); c.fill(); c.fillStyle = 'rgba(232,208,160,.6)'; c.beginPath(); c.arc(x + 95, 360, 10, 0, 7); c.fill(); }
    c.fillStyle = '#1e100a'; c.fillRect(0, 0, W, 150); for (let x = 0; x < W; x += 180) { vg(c, x, 0, 60, 150, [[0, '#2a160c'], [1, '#4a2a18']]); }
    // loom at the back centre
    const lx = 1130, lw = 300; c.fillStyle = '#3a2210'; c.fillRect(lx, 620, 16, 400); c.fillRect(lx + lw - 16, 620, 16, 400); c.fillRect(lx - 10, 620, lw + 20, 18);
    for (let k = 0; k < 40; k++) { c.strokeStyle = `rgba(230,210,170,${.5 + r() * .3})`; c.lineWidth = 2; c.beginPath(); c.moveTo(lx + 20 + k * 6.5, 638); c.lineTo(lx + 20 + k * 6.5, 980); c.stroke(); c.fillStyle = '#6a4a2a'; c.beginPath(); c.arc(lx + 20 + k * 6.5, 985, 6, 0, 7); c.fill(); }
    for (let y = 640; y < 800; y += 8) { c.fillStyle = y % 32 < 16 ? 'rgba(160,50,40,.85)' : 'rgba(220,180,110,.85)'; c.fillRect(lx + 18, y, lw - 36, 6); }
    // columns
    const col = (x, w) => { const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#5a3a2a'); g.addColorStop(.35, '#f0dcb8'); g.addColorStop(.6, '#c8a880'); g.addColorStop(1, '#4a2a1a'); c.fillStyle = g; c.fillRect(x - w / 2, 270, w, bw - 270 + 60);
      for (let k = 1; k < 8; k++) { c.fillStyle = 'rgba(60,30,20,.25)'; c.fillRect(x - w / 2 + k * w / 8, 270, 3, bw - 210); } c.fillStyle = '#e8d0a8'; c.fillRect(x - w / 2 - 30, 256, w + 60, 30); c.fillRect(x - w / 2 - 20, bw + 40, w + 40, 30); c.fillStyle = '#a8282a'; c.fillRect(x - w / 2 - 30, 284, w + 60, 10); };
    for (const x of [200, 640, 1900, 2360]) col(x, 150);
    for (const x of [640, 1900]) torch(c, r, x + 110, 560, 1.1);
    // stone floor
    vg(c, 0, bw, W, 70, [[0, '#4a2a18'], [1, '#3a2214']]); vg(c, 0, bw + 70, W, H - bw - 70, [[0, '#5a3a26'], [1, '#7a5034']]); c.fillStyle = '#3a2214'; c.fillRect(0, bw + 60, W, 14);
    persLines(c, bw + 74, H, 1280, 8, 'rgba(30,16,8,.35)', 3); tex(c, r, 0, bw + 74, W, H - bw - 74, '#6a4630', { n: 8000, al: .15 }); reflect(c, bw + 70, 200, .12, 8);
    // couches and low tables along the back
    for (const [x0, x1] of [[300, 1050], [1510, 2260]]) { shadow(c, (x0 + x1) / 2, 1120, (x1 - x0) * .6, 20, .5);
      vg(c, x0, 960, x1 - x0, 60, [[0, '#c8a070'], [1, '#6a4020']]); c.fillStyle = '#8a2a24'; rr(c, x0 + 10, 935, x1 - x0 - 20, 40, 14); c.fill(); for (let x = x0 + 40; x < x1 - 40; x += 160) { c.fillStyle = '#c8a040'; rr(c, x, 915, 90, 36, 14); c.fill(); }
      c.fillStyle = '#3a2210'; for (const x of [x0 + 20, x1 - 36]) c.fillRect(x, 1020, 16, 90);
      vg(c, x0 + 60, 1060, x1 - x0 - 120, 24, [[0, '#a87a4a'], [1, '#5a3a1a']]); c.fillStyle = '#3a2210'; for (const x of [x0 + 80, x1 - 90]) c.fillRect(x, 1084, 12, 36);
      for (let x = x0 + 100; x < x1 - 100; x += 90) { const k = r(); if (k < .4) { c.fillStyle = '#c8a050'; c.beginPath(); c.ellipse(x, 1058, 30, 8, 0, 0, 7); c.fill(); c.fillStyle = r.pick(['#5a2a5a', '#6a8a3a', '#c87a3a']); for (let j = 0; j < 5; j++) { c.beginPath(); c.arc(x - 16 + j * 8, 1050 - (j % 2) * 6, 7, 0, 7); c.fill(); } } else if (k < .75) { c.fillStyle = '#a8502a'; poly(c, [[x - 14, 1058], [x + 14, 1058], [x + 22, 1020], [x + 8, 1000], [x + 8, 985], [x - 8, 985], [x - 8, 1000], [x - 22, 1020]]); c.fill(); c.fillStyle = '#1a0e08'; c.fillRect(x - 16, 1022, 32, 6); } else { c.fillStyle = '#d8b060'; c.beginPath(); c.ellipse(x, 1050, 34, 8, 0, 0, Math.PI); c.fill(); c.fillRect(x - 3, 1050, 6, 10); } } }
    brazier(c, r, 230, 1330, 1.2); brazier(c, r, 2330, 1330, 1.2);
    gl(c, 1280, 900, 1300, '255,150,70', .14); gl(c, 1280, 1250, 900, '255,170,90', .12);
    tint(c, W, H, [[0, 'rgba(255,150,70,.4)'], [1, 'rgba(90,40,20,.4)']]);
    done(c, r, W, H, P, { vig: .5 }); },
  // dunes: desert dunes at dusk, two faint moons (x 1880 y 260, x 2080 y 380), mesa x 300-900 on horizon y ~860. Sand floor y 1250.
  dunes: (c, r, W, H, P) => { const hz = 880;
    vg(c, 0, 0, W, hz, [[0, '#141a3a'], [.35, '#3a2e5a'], [.65, '#a8586a'], [.85, '#f0a070'], [1, '#ffd89a']]);
    for (let i = 0; i < 220; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.1, .6) * (1 - 0)})`; c.fillRect(r() * W, Math.pow(r(), 2) * 380, 2, 2); }
    for (const [mx, my, mr, a] of [[1880, 260, 70, .5], [2080, 380, 34, .38]]) { gl(c, mx, my, mr * 4, '230,220,255', a * .5); c.fillStyle = `rgba(240,235,255,${a})`; c.beginPath(); c.arc(mx, my, mr, 0, 7); c.fill(); c.fillStyle = `rgba(60,50,90,${a * .6})`; c.beginPath(); c.arc(mx + mr * .35, my - mr * .1, mr * .9, 0, 7); c.fill(); }
    ENV.clouds(c, r, W, 420, 700, 7, '#ffd0a0', '#c87a7a', '#6a4a6a', { scale: 1.4 });
    gl(c, 1300, hz, 900, '255,190,120', .45);
    // mesa and far rocks
    { const g = c.createLinearGradient(180, 0, 960, 0); g.addColorStop(0, '#5a3446'); g.addColorStop(.6, '#7a4a58'); g.addColorStop(1, '#9a5a5a'); c.fillStyle = g; } poly(c, [[180, hz + 10], [300, 700], [340, 640], [760, 630], [800, 700], [880, 760], [960, hz + 10]]); c.fill(); c.fillStyle = 'rgba(255,170,120,.35)'; poly(c, [[340, 640], [760, 630], [770, 650], [345, 660]]); c.fill();
    for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(40,20,40,.18)'; c.fillRect(380 + k * 70, 660, 18, 210); }
    c.fillStyle = '#7a4a58'; poly(c, [[1500, hz + 10], [1560, 790], [1620, 780], [1660, hz + 10]]); c.fill(); poly(c, [[2200, hz + 10], [2260, 760], [2330, 770], [2400, hz + 10]]); c.fill();
    // dune layers far to near
    vg(c, 0, hz - 20, W, 200, [[0, '#d89a80'], [1, '#b87a70']]);
    const dune = (y, amp, f, ph, lit, dk, hiA) => { const pts = []; for (let x = -20; x <= W + 20; x += 20) pts.push([x, y - amp * (Math.sin(x * f + ph) * .6 + Math.sin(x * f * 2.3 + ph * 1.7) * .4)]);
      const g = c.createLinearGradient(0, y - amp, 0, y + 260); g.addColorStop(0, lit); g.addColorStop(1, dk); c.fillStyle = g; c.beginPath(); c.moveTo(-20, H); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(W + 20, H); c.fill();
      c.save(); c.beginPath(); c.moveTo(-20, H); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(W + 20, H); c.clip(); c.filter = 'blur(40px)'; c.fillStyle = dk; c.globalAlpha = .5; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; if (y1 < y0 - 1) { poly(c, [[x0, y0], [x1, y1], [x1 + 60, y1 + 200], [x0 + 60, y0 + 200]]); c.fill(); } } c.restore();
      tex(c, r, 0, y - amp, W, 200, lit, { n: 1500, len: [20, 70], al: .1, angJ: .1 });
      c.strokeStyle = `rgba(255,220,170,${hiA})`; c.lineWidth = 3; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); };
    dune(hz + 20, 40, .004, 1, '#c8886a', '#8a5260', .4); vg(c, 0, hz - 40, W, 140, [[0, 'rgba(255,200,150,0)'], [.6, 'rgba(255,200,150,.35)'], [1, 'rgba(255,200,150,0)']]);
    dune(hz + 110, 70, .003, 2.5, '#d8946a', '#8a5058', .45); vg(c, 0, hz + 20, W, 160, [[0, 'rgba(255,190,140,0)'], [.6, 'rgba(255,190,140,.25)'], [1, 'rgba(255,190,140,0)']]);
    dune(hz + 230, 60, .0022, 4.2, '#e8a070', '#9a5a54', .5);
    // foreground sand floor, gentle, with ripples
    const fy0 = 1150; let g = c.createLinearGradient(0, fy0, 0, H); g.addColorStop(0, '#e0a070'); g.addColorStop(1, '#b0704e'); c.fillStyle = g; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 20) c.lineTo(x, fy0 - 20 * Math.sin(x * .0016 + .6)); c.lineTo(W, H); c.fill();
    c.strokeStyle = 'rgba(255,220,170,.35)'; c.lineWidth = 3; c.strokeStyle = 'rgba(255,225,180,.5)'; c.beginPath(); for (let x = 0; x <= W; x += 20) { const y = fy0 - 20 * Math.sin(x * .0016 + .6); x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke();
    for (let j = 0; j < 40; j++) { const y = fy0 + 20 + Math.pow(j / 40, 1.3) * (H - fy0 - 20); c.strokeStyle = `rgba(120,60,50,${.12 + j * .004})`; c.lineWidth = 2 + j * .08; c.beginPath(); for (let x = -40; x <= W + 40; x += 30) { const yy = y + Math.sin(x * .01 + j * 1.3) * 6; x > -40 ? c.lineTo(x, yy) : c.moveTo(x, yy); } c.stroke(); }
    tex(c, r, 0, fy0, W, H - fy0, '#d0906a', { n: 9000, len: [6, 22], al: .14 });
    // low scattered rocks at the edges
    for (const [x, y, s] of [[160, 1330, 1.4], [2400, 1300, 1.2], [2240, 1360, .8], [380, 1390, .7]]) { shadow(c, x + 20 * s, y, 110 * s, 16 * s, .45); c.fillStyle = '#6a3a3a'; poly(c, [[x - 80 * s, y], [x - 50 * s, y - 70 * s], [x + 20 * s, y - 90 * s], [x + 80 * s, y - 40 * s], [x + 90 * s, y]]); c.fill(); c.fillStyle = 'rgba(255,190,130,.4)'; poly(c, [[x - 50 * s, y - 70 * s], [x + 20 * s, y - 90 * s], [x + 10 * s, y - 60 * s], [x - 40 * s, y - 50 * s]]); c.fill(); }
    // blowing sand haze
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 60; i++) { const y = r.range(900, 1300); c.fillStyle = `rgba(255,200,150,${r.range(.02, .06)})`; c.beginPath(); c.ellipse(r() * W, y, r.range(200, 600), r.range(10, 30), 0, 0, 7); c.fill(); } c.restore();
    tint(c, W, H, [[0, 'rgba(90,70,160,.35)'], [.6, 'rgba(255,160,110,.3)'], [1, 'rgba(120,60,60,.35)']]);
    done(c, r, W, H, P, { vig: .45 }); },

  // ice_lab: icy sci-fi colony lab. Floor y 1250 (wall base y 1040). Frosted windows x 560-1100 and 1460-2000, y 220-760 (blizzard). Cryo pods x 120-440 and 2120-2440. Console x 1140-1420 y 820-1040.
  ice_lab: (c, r, W, H, P) => { const bw = 1040;
    vg(c, 0, 0, W, bw, [[0, '#1a2430'], [.5, '#2e3e4c'], [1, '#1e2a36']]);
    // metal wall panels
    for (let x = 0; x < W; x += 180) for (let y = 120; y < bw; y += 230) { vg(c, x + 4, y + 4, 172, 222, [[0, '#3a4a5a'], [1, '#26323e']]); c.fillStyle = 'rgba(180,220,255,.12)'; c.fillRect(x + 4, y + 4, 172, 3); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 4, y + 222, 172, 4); for (const [bx, by] of [[14, 14], [162, 14], [14, 212], [162, 212]]) { c.fillStyle = '#5a6a7a'; c.beginPath(); c.arc(x + bx, y + by, 4, 0, 7); c.fill(); } }
    tex(c, r, 0, 120, W, bw - 120, '#2e3c4a', { n: 6000, ang: 0, angJ: .05, al: .12 });
    // ceiling with strip lights
    vg(c, 0, 0, W, 120, [[0, '#0c1218'], [1, '#1a2430']]); for (let x = 120; x < W; x += 420) { c.fillStyle = '#e8f6ff'; c.fillRect(x, 96, 260, 14); gl(c, x + 130, 110, 300, '170,220,255', .5); cone(c, x + 130, 110, 260, 600, 900, '170,220,255', .06); }
    // frosted windows onto a blizzard
    for (const x0 of [560, 1460]) { const w = 540, y0 = 220, h = 540; c.save(); c.beginPath(); rr(c, x0, y0, w, h, 40); c.clip(); vg(c, x0, y0, w, h, [[0, '#6a8aa8'], [.6, '#a8c4da'], [1, '#d8e8f4']]);
      c.fillStyle = 'rgba(80,100,130,.6)'; poly(c, [[x0, y0 + h * .7], [x0 + w * .3, y0 + h * .55], [x0 + w * .55, y0 + h * .68], [x0 + w * .8, y0 + h * .5], [x0 + w, y0 + h * .62], [x0 + w, y0 + h], [x0, y0 + h]]); c.fill();
      for (let i = 0; i < 700; i++) { const x = x0 + r() * w, y = y0 + r() * h, L = r.range(10, 50); c.strokeStyle = `rgba(255,255,255,${r.range(.3, .8)})`; c.lineWidth = r.range(1.5, 4); c.beginPath(); c.moveTo(x, y); c.lineTo(x + L, y + L * .3); c.stroke(); }
      const g = c.createRadialGradient(x0 + w / 2, y0 + h / 2, w * .2, x0 + w / 2, y0 + h / 2, w * .75); g.addColorStop(0, 'rgba(230,245,255,0)'); g.addColorStop(1, 'rgba(230,245,255,.85)'); c.fillStyle = g; c.fillRect(x0, y0, w, h);
      for (let i = 0; i < 40; i++) { const a = r() * 7, d = r.range(.35, .5) * w; c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); const fx = x0 + w / 2 + Math.cos(a) * d, fyy = y0 + h / 2 + Math.sin(a) * d * .9; c.moveTo(fx, fyy); c.lineTo(fx - Math.cos(a) * 40, fyy - Math.sin(a) * 40); c.stroke(); } c.restore();
      c.strokeStyle = '#4a5a6a'; c.lineWidth = 26; rr(c, x0 - 8, y0 - 8, w + 16, h + 16, 46); c.stroke(); c.strokeStyle = 'rgba(200,235,255,.4)'; c.lineWidth = 3; rr(c, x0 - 20, y0 - 20, w + 40, h + 40, 56); c.stroke(); gl(c, x0 + w / 2, y0 + h / 2, 500, '180,220,255', .2); }
    // cryo pods
    const pod = (x, s) => { const top = bw - 720 * s, w = 260 * s; shadow(c, x, bw + 40, w * .8, 20, .5); vg(c, x - w / 2 - 20, bw - 40, w + 40, 80, [[0, '#5a6a7a'], [1, '#2a3440']]); vg(c, x - w / 2 - 20, top - 50, w + 40, 60, [[0, '#5a6a7a'], [1, '#2a3440']]);
      c.save(); rr(c, x - w / 2, top, w, bw - 40 - top, w / 2); c.clip(); vg(c, x - w / 2, top, w, bw - top, [[0, '#7ad0ff'], [1, '#1a5a8a']]); for (let i = 0; i < 40; i++) { c.fillStyle = `rgba(220,245,255,${r.range(.2, .6)})`; c.beginPath(); c.arc(x + r.gauss() * w * .25, top + r() * (bw - top), r.range(2, 6), 0, 7); c.fill(); } c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(x - w * .35, top + 30, w * .1, bw - top - 120); c.restore();
      c.strokeStyle = '#6a7a8a'; c.lineWidth = 10; rr(c, x - w / 2, top, w, bw - 40 - top, w / 2); c.stroke(); gl(c, x, (top + bw) / 2, 380, '90,200,255', .35); c.fillStyle = '#9ff0ff'; c.fillRect(x - 40, bw - 20, 80, 8); };
    pod(280, 1); pod(2280, 1);
    // console at back centre
    c.fillStyle = '#1e2a36'; poly(c, [[1140, 1040], [1420, 1040], [1440, 900], [1120, 900]]); c.fill(); vg(c, 1150, 820, 260, 90, [[0, '#1a8ac8'], [1, '#0a3a5a']]); gl(c, 1280, 860, 260, '80,200,255', .5); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(180,240,255,.7)'; c.fillRect(1170, 836 + k * 12, r.range(60, 200), 4); }
    for (let i = 0; i < 12; i++) { c.fillStyle = r.pick(['#40e0ff', '#ff5050', '#f0f080', '#80ff a0'.replace(' ', '')]); c.fillRect(1150 + i * 22, 930, 10, 8); }
    // pipes along the wall base
    for (const [y, t] of [[960, 18], [990, 12]]) { vg(c, 0, y, W, t, [[0, '#7a8a9a'], [1, '#2a3440']]); }
    c.fillStyle = 'rgba(230,245,255,.8)'; for (let x = 0; x < W; x += 30) { c.beginPath(); c.moveTo(x, 978); c.lineTo(x + 6, 978 + r.range(6, 22)); c.lineTo(x + 12, 978); c.fill(); }
    // floor: grated metal, reflective, frost at the edges
    vg(c, 0, bw, W, H - bw, [[0, '#2a3440'], [1, '#3e4c5a']]); persLines(c, bw, H, 1280, 10, 'rgba(10,16,24,.5)', 3); reflect(c, bw, 300, .35, 4);
    c.fillStyle = '#9ff0ff'; c.fillRect(0, bw, W, 4); gl(c, 1280, bw, 1200, '120,200,255', .12);
    for (const sx of [0, W]) { const g = c.createRadialGradient(sx, H, 0, sx, H, 700); g.addColorStop(0, 'rgba(235,248,255,.7)'); g.addColorStop(1, 'rgba(235,248,255,0)'); c.fillStyle = g; c.fillRect(sx - 700, H - 700, 1400, 700); }
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 200; i++) { c.fillStyle = `rgba(220,240,255,${r.range(.05, .2)})`; c.beginPath(); c.arc(r() * W, r() * H, r.range(1, 3), 0, 7); c.fill(); } c.restore();
    tint(c, W, H, [[0, 'rgba(120,180,255,.4)'], [1, 'rgba(30,60,110,.4)']]);
    done(c, r, W, H, P, { vig: .48 }); },
  // road: two-lane country road side-on, English morning. Far lane centre y 1150, near lane centre y 1300, centre line y 1225; road x full width, y 1080-1370. Verge below y 1370.
  road: (c, r, W, H, P) => { const hz = 760;
    vg(c, 0, 0, W, hz, [[0, '#6a9ac8'], [.55, '#a8c8e0'], [1, '#f0e4c8']]); gl(c, 2100, 300, 700, '255,240,200', .45); gl(c, 2100, 300, 120, '255,250,230', .8);
    ENV.clouds(c, r, W, 80, 460, 12, '#ffffff', '#e0e4ec', '#a8b0c0', { scale: 1.3 });
    // rolling patchwork hills
    const hill = (y, amp, f, ph, cols, rows) => { const top = x => y - amp * (Math.sin(x * f + ph) * .6 + Math.sin(x * f * 2.7 + ph * 2) * .4);
      c.save(); c.beginPath(); c.moveTo(0, 1100); for (let x = 0; x <= W; x += 20) c.lineTo(x, top(x)); c.lineTo(W, 1100); c.clip();
      let x = -r.range(0, 200); while (x < W) { const w = r.range(240, 520), col = r.pick(cols); c.fillStyle = col; c.fillRect(x, y - amp - 20, w, 1100); for (let k = 0; k < rows; k++) { c.fillStyle = 'rgba(0,0,0,.05)'; c.fillRect(x, y - amp + k * 18, w, 6); }
        c.fillStyle = 'rgba(40,60,30,.8)'; for (let yy = y - amp; yy < 1100; yy += 4) { c.beginPath(); c.arc(x + Math.sin(yy * .03) * 3, yy, 5, 0, 7); c.fill(); } x += w; }
      c.restore(); c.strokeStyle = 'rgba(40,70,30,.6)'; c.lineWidth = 8; c.beginPath(); for (let x = 0; x <= W; x += 20) x ? c.lineTo(x, top(x)) : c.moveTo(x, top(x)); c.stroke();
      for (let i = 0; i < 10; i++) { const tx = r() * W, ty = top(tx); c.fillStyle = '#3a5a2e'; c.beginPath(); c.ellipse(tx, ty + 2, r.range(18, 34), 12, 0, Math.PI, 0); c.fill(); } };
    hill(hz - 30, 60, .0018, .5, ['#8aa070', '#98ac78', '#b0ac78', '#7a9a70'], 3); vg(c, 0, hz - 100, W, 160, [[0, 'rgba(230,235,240,0)'], [1, 'rgba(230,235,240,.25)']]);
    hill(hz + 90, 80, .0013, 2, ['#6a8a4a', '#7a9a50', '#c0b060', '#5a7a3a', '#a09848'], 5);
    // church spire and farmhouse far
    c.fillStyle = '#8a8a8a'; c.fillRect(1820, 690, 40, 90); poly(c, [[1814, 690], [1866, 690], [1840, 610]]); c.fill(); c.fillStyle = '#9a7a6a'; c.fillRect(600, 800, 110, 60); c.fillStyle = '#5a4a4a'; poly(c, [[590, 800], [720, 800], [690, 770], [620, 770]]); c.fill();
    // near field behind the hedge
    vg(c, 0, 960, W, 120, [[0, '#6a8a40'], [1, '#5a7a36']]); tex(c, r, 0, 960, W, 120, '#6a8a42', { n: 5000, ang: 0, angJ: .1, al: .2 });
    // big trees in hedge line
    const tree = (x, y, s) => { c.fillStyle = '#3a2a1a'; c.fillRect(x - 10 * s, y - 200 * s, 20 * s, 200 * s); for (let i = 0; i < 260; i++) { const a = r() * 7, d = Math.sqrt(r()) * 160 * s; const px = x + Math.cos(a) * d * 1.1, py = y - 300 * s + Math.sin(a) * d * .8; const t = (py - (y - 450 * s)) / (300 * s); c.fillStyle = P2.rgb(P2.mix(P2.hex('#8ab05a'), P2.hex('#2a4a22'), Math.min(1, Math.max(0, t)))); c.beginPath(); c.ellipse(px, py, r.range(14, 30) * s, r.range(9, 20) * s, r() * 3, 0, 7); c.fill(); } };
    tree(260, 1010, 1.3); tree(1500, 1000, .9); tree(2380, 1010, 1.4);
    // hedgerow along far verge
    for (let x = -20; x < W + 20; x += 14) { const h = 70 + Math.sin(x * .01) * 14 + r() * 16; c.fillStyle = P2.rgb(P2.jitter(r.pick(['#3a5a2a', '#4a6a30', '#2e4a22']), r, 10)); c.beginPath(); c.arc(x, 1060 - h * .5, h * .5, 0, 7); c.fill(); }
    for (let i = 0; i < 300; i++) { c.fillStyle = r() < .5 ? 'rgba(160,200,100,.5)' : 'rgba(250,250,240,.6)'; c.beginPath(); c.arc(r() * W, 990 + r() * 70, r.range(2, 5), 0, 7); c.fill(); }
    // far grass verge, road, near verge
    vg(c, 0, 1060, W, 22, [[0, '#6a8a3a'], [1, '#5a7a32']]);
    vg(c, 0, 1080, W, 290, [[0, '#55575c'], [1, '#3e4046']]); tex(c, r, 0, 1080, W, 290, '#4a4c52', { n: 9000, len: [8, 30], angJ: 1, al: .15 });
    c.fillStyle = 'rgba(240,240,230,.85)'; c.fillRect(0, 1092, W, 6); c.fillRect(0, 1356, W, 6); for (let x = 20; x < W; x += 220) c.fillRect(x, 1221, 120, 8);
    c.fillStyle = 'rgba(0,0,0,.12)'; for (const y of [1130, 1170, 1280, 1320]) c.fillRect(0, y, W, 10);
    vg(c, 0, 1370, W, H - 1370, [[0, '#5a7a32'], [1, '#4a6a2a']]); for (let i = 0; i < 1400; i++) { const x = r() * W, y = 1370 + r() * 70; c.strokeStyle = r.pick(['#6a8a3a', '#4a6a2a', '#8aa84a']); c.lineWidth = 3; c.beginPath(); c.moveTo(x, y + 8); c.lineTo(x + r.range(-6, 6), y - r.range(6, 20)); c.stroke(); }
    gl(c, 2100, 700, 1400, '255,230,180', .12);
    tint(c, W, H, [[0, 'rgba(255,220,170,.3)'], [1, 'rgba(70,90,60,.3)']]);
    done(c, r, W, H, P, { vig: .35 }); },

  // test_stage: dim London studio stage for a screen test. Floor y 1250 (curtain base y 1040). Taped X at x 1280 y 1250. Camera tripod x 120-460 (left), softbox light x 2160-2480 (right). Five chairs along the back x 760-1800.
  test_stage: (c, r, W, H, P) => { const bw = 1040;
    vg(c, 0, 0, W, bw, [[0, '#060608'], [1, '#121216']]);
    // black curtains with folds
    for (let x = 0; x < W; x += 40) { const g = c.createLinearGradient(x, 0, x + 40, 0); g.addColorStop(0, '#08080a'); g.addColorStop(.5, '#24242a'); g.addColorStop(1, '#08080a'); c.fillStyle = g; c.fillRect(x, 60, 40, bw - 60); }
    tex(c, r, 0, 60, W, bw - 60, '#1a1a1e', { n: 6000, ang: Math.PI / 2, angJ: .05, al: .15 });
    // lighting grid
    c.fillStyle = '#16161a'; c.fillRect(0, 30, W, 18); c.fillRect(0, 70, W, 8); for (let x = 0; x < W; x += 60) { c.strokeStyle = '#1e1e22'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 48); c.lineTo(x + 60, 70); c.stroke(); }
    for (const x of [500, 1100, 1700, 2200]) { c.fillStyle = '#202024'; rr(c, x - 24, 78, 48, 50, 6); c.fill(); }
    // pool of light on the back curtain and floor
    gl(c, 1280, 700, 900, '255,225,180', .2);
    // floor: worn dark painted boards
    planks(c, r, bw, H, '#2a2826', 10); c.fillStyle = '#060608'; c.fillRect(0, bw - 4, W, 10);
    // five plain chairs against the back
    const chair = (x) => { const s = .62, fy = bw + 40; shadow(c, x, fy, 70, 10, .5); c.fillStyle = '#3a3a40'; c.fillRect(x - 60 * s, fy - 400 * s, 10 * s, 400 * s); c.fillRect(x + 50 * s, fy - 400 * s, 10 * s, 400 * s); c.fillRect(x - 56 * s, fy - 220 * s, 8 * s, 220 * s); c.fillRect(x + 48 * s, fy - 220 * s, 8 * s, 220 * s);
      vg(c, x - 64 * s, fy - 400 * s, 128 * s, 90 * s, [[0, '#4a4a52'], [1, '#2a2a30']]); vg(c, x - 70 * s, fy - 236 * s, 140 * s, 30 * s, [[0, '#5a5a62'], [1, '#2a2a30']]); c.fillStyle = 'rgba(255,230,190,.2)'; c.fillRect(x - 64 * s, fy - 400 * s, 128 * s, 4); };
    for (let i = 0; i < 5; i++) chair(800 + i * 240);
    // taped X
    c.save(); c.translate(1280, 1250); c.scale(1, .28); c.strokeStyle = 'rgba(240,220,90,.85)'; c.lineWidth = 26; c.beginPath(); c.moveTo(-90, -90); c.lineTo(90, 90); c.moveTo(90, -90); c.lineTo(-90, 90); c.stroke(); c.restore();
    for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(220,220,210,.35)'; c.fillRect(r.range(400, 2100), r.range(1100, 1420), r.range(40, 90), 10); }
    // softbox light right, aimed at centre
    const lx = 2320, ly = 1330; shadow(c, lx, ly, 160, 22, .55); c.strokeStyle = '#18181c'; c.lineWidth = 9; c.lineCap = 'round'; for (const dx of [-120, 0, 120]) { c.beginPath(); c.moveTo(lx, ly - 260); c.lineTo(lx + dx, ly); c.stroke(); }
    c.lineWidth = 12; c.beginPath(); c.moveTo(lx, ly - 260); c.lineTo(lx, 520); c.stroke();
    c.save(); c.translate(lx - 40, 460); c.rotate(-.35); c.fillStyle = '#121216'; poly(c, [[-60, -200], [60, -110], [60, 110], [-60, 200]]); c.fill(); c.fillStyle = '#1c1c20'; poly(c, [[60, -110], [130, -40], [130, 40], [60, 110]]); c.fill(); c.save(); c.scale(.35, 1); vg(c, -200, -200, 60, 400, [[0, '#fffaf0'], [1, '#e8e0d0']]); c.restore(); c.fillStyle = '#fffcf4'; poly(c, [[-70, -200], [-48, -200], [-48, 200], [-70, 200]]); c.fill(); c.strokeStyle = '#2a2a30'; c.lineWidth = 6; c.strokeRect(-70, -200, 22, 400); c.restore();
    gl(c, lx - 70, 460, 300, '255,245,225', .55); cone(c, lx - 100, 420, 300, 1400, 900, '255,240,215', .06);
    c.save(); c.globalCompositeOperation = 'screen'; let g = c.createLinearGradient(lx, 460, 1280, 1250); g.addColorStop(0, 'rgba(255,240,210,.12)'); g.addColorStop(1, 'rgba(255,240,210,0)'); c.fillStyle = g; poly(c, [[lx - 80, 300], [lx - 80, 640], [1500, 1350], [900, 1250]]); c.fill(); c.restore();
    gl(c, 1280, 1250, 700, '255,235,200', .25);
    // camera on tripod left, facing right
    camTripod(c, 290, 1330, 1.5, 1);
    // cables
    c.strokeStyle = '#0a0a0c'; c.lineWidth = 7; c.beginPath(); c.moveTo(290, 1330); c.bezierCurveTo(600, 1420, 900, 1380, 1200, 1440); c.stroke(); c.beginPath(); c.moveTo(lx, ly); c.bezierCurveTo(2100, 1400, 1900, 1360, 1700, 1440); c.stroke();
    tint(c, W, H, [[0, 'rgba(90,100,140,.35)'], [1, 'rgba(255,200,150,.2)']]);
    done(c, r, W, H, P, { vig: .6 }); },
  // greyoffice: grand old-money executive office, London dusk through the window. Floor y 1250 (wall base y 1060). Window x 760-1800 y 160-880 (clock-tower skyline). Desk x 1560-2340 top y 930 (behind floor line, right); green lamp x 2180; globe x 300.
  greyoffice: (c, r, W, H, P) => { const bw = 1060;
    // wood panelling
    vg(c, 0, 0, W, bw, [[0, '#2a160c'], [1, '#4a2a16']]); tex(c, r, 0, 0, W, bw, '#4a2a18', { n: 12000, ang: Math.PI / 2, angJ: .04, al: .2, len: [60, 200] });
    for (let x = 0; x < W; x += 200) for (const [y, h] of [[120, 520], [700, 300]]) { c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 6; c.strokeRect(x + 24, y, 152, h); c.strokeStyle = 'rgba(255,190,120,.16)'; c.lineWidth = 3; c.strokeRect(x + 30, y + 6, 140, h - 12); }
    c.fillStyle = '#1a0c06'; c.fillRect(0, 0, W, 80); c.fillStyle = '#c8904a'; c.fillRect(0, 78, W, 6); c.fillStyle = '#2a1408'; c.fillRect(0, 660, W, 24); c.fillStyle = 'rgba(255,190,120,.3)'; c.fillRect(0, 660, W, 3);
    // the window with London at dusk
    const wx = 760, wy = 160, ww = 1040, wh = 720; c.save(); c.beginPath(); c.rect(wx, wy, ww, wh); c.clip();
    city(c, r, wx, wy, ww, wh, { sky: [[0, '#2a3456'], [.5, '#6a5a7a'], [.85, '#d8907a'], [1, '#f0b088']], stars: 30, cool: .1, haze: 'rgba(240,160,130,.25)',
      layers: [{ h: [.12, .3], col: '#4a3e58', win: '255,210,150', p: .15, ws: 4 }, { h: [.1, .26], col: '#2e2840', win: '255,215,150', p: .25, ws: 5 }],
      landmark: (c, r, base) => { const x = 1180; c.fillStyle = '#3a3048'; c.fillRect(880, base - 150, 560, 150); for (let k = 0; k < 14; k++) { c.fillRect(890 + k * 40, base - 185, 10, 40); } c.fillRect(x - 40, base - 560, 80, 560); c.fillRect(x - 50, base - 600, 100, 60); poly(c, [[x - 50, base - 600], [x + 50, base - 600], [x, base - 730]]); c.fill(); c.fillRect(x - 3, base - 780, 6, 60);
        c.fillStyle = '#f8e8b0'; c.beginPath(); c.arc(x, base - 470, 30, 0, 7); c.fill(); gl(c, x, base - 470, 100, '255,230,160', .5); c.strokeStyle = '#3a3048'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, base - 470); c.lineTo(x, base - 492); c.moveTo(x, base - 470); c.lineTo(x + 14, base - 466); c.stroke(); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(255,220,150,.5)'; c.fillRect(x - 30, base - 420 + k * 50, 8, 20); c.fillRect(x + 22, base - 420 + k * 50, 8, 20); } } });
    gl(c, 1280, 820, 600, '255,170,120', .25); c.restore();
    c.fillStyle = '#1e0e06'; c.fillRect(wx - 30, wy - 30, ww + 60, 30); c.fillRect(wx - 30, wy + wh, ww + 60, 46); for (let k = 0; k <= 4; k++) c.fillRect(wx - 14 + k * ww / 4, wy, 22, wh); c.fillRect(wx, wy + wh * .38, ww, 14); c.fillStyle = 'rgba(255,190,140,.3)'; c.fillRect(wx - 30, wy + wh, ww + 60, 4);
    // heavy curtains either side
    for (const [x0, dir] of [[600, 1], [1800, -1]]) { for (let k = 0; k < 8; k++) { const x = x0 + dir * k * 20, g = c.createLinearGradient(x, 0, x + 24, 0); g.addColorStop(0, '#3a0e12'); g.addColorStop(.5, '#7a1e24'); g.addColorStop(1, '#3a0e12'); c.fillStyle = g; c.fillRect(Math.min(x, x + 24 * dir) , 110, 26, bw - 110); } }
    c.fillStyle = '#c8904a'; c.fillRect(560, 100, 1440, 14);
    // bookshelves on the left wall, portrait on the right
    const shelf = (x0, w) => { vg(c, x0, 140, w, bw - 140, [[0, '#2a1408'], [1, '#1a0c04']]); for (let y = 200; y < bw - 60; y += 150) { c.fillStyle = '#4a2a14'; c.fillRect(x0, y + 120, w, 14); let x = x0 + 12; while (x < x0 + w - 30) { const bwid = r.range(16, 32), bh = r.range(90, 118); c.fillStyle = P2.rgb(P2.jitter(r.pick(['#6a1e1e', '#1e3a2a', '#2a2a4a', '#8a6a3a', '#3a1a10']), r, 14)); c.fillRect(x, y + 120 - bh, bwid, bh); c.fillStyle = 'rgba(220,180,90,.6)'; c.fillRect(x + 2, y + 120 - bh + 14, bwid - 4, 3); x += bwid + 2; } } };
    shelf(40, 460);
    c.fillStyle = '#c8904a'; c.fillRect(2040, 240, 380, 470); vg(c, 2060, 260, 340, 430, [[0, '#3a3424'], [1, '#1a1810']]); vg(c, 2060, 260, 340, 260, [[0, '#4a5a6a'], [1, '#c8a070']]); c.fillStyle = '#2a3020'; poly(c, [[2060, 560], [2150, 480], [2240, 540], [2330, 470], [2400, 520], [2400, 690], [2060, 690]]); c.fill(); c.fillStyle = 'rgba(200,180,120,.4)'; c.fillRect(2060, 600, 340, 6); c.fillStyle = '#1a1c12'; c.fillRect(2280, 540, 12, 60); c.beginPath(); c.arc(2286, 520, 40, 0, 7); c.fill(); gl(c, 2230, 250, 200, '255,210,150', .4);
    // floor: dark boards with a Persian rug
    planks(c, r, bw, H, '#3a2214', 10); c.fillStyle = '#1a0c06'; c.fillRect(0, bw - 6, W, 16);
    const rx0 = 360, rx1 = 2200, ry0 = 1140, ry1 = 1420; c.fillStyle = '#6a1418'; poly(c, [[rx0 + 80, ry0], [rx1 - 80, ry0], [rx1, ry1], [rx0, ry1]]); c.fill();
    c.strokeStyle = '#1e2a4a'; c.lineWidth = 26; poly(c, [[rx0 + 110, ry0 + 20], [rx1 - 110, ry0 + 20], [rx1 - 30, ry1 - 22], [rx0 + 30, ry1 - 22]]); c.stroke(); c.strokeStyle = '#c8a050'; c.lineWidth = 6; poly(c, [[rx0 + 140, ry0 + 42], [rx1 - 140, ry0 + 42], [rx1 - 70, ry1 - 46], [rx0 + 70, ry1 - 46]]); c.stroke();
    c.save(); poly(c, [[rx0 + 140, ry0 + 42], [rx1 - 140, ry0 + 42], [rx1 - 70, ry1 - 46], [rx0 + 70, ry1 - 46]]); c.clip(); c.translate(1280, 1280); c.scale(1, .2); for (let k = 4; k > 0; k--) { c.fillStyle = k % 2 ? '#1e2a4a' : '#c8a050'; poly(c, [[0, -k * 130], [k * 260, 0], [0, k * 130], [-k * 260, 0]]); c.fill(); } c.restore();
    for (let i = 0; i < 80; i++) { const t = r(), x = rx0 + 160 + t * (rx1 - rx0 - 320), y = r.range(ry0 + 60, ry1 - 60); c.fillStyle = r.pick(['rgba(200,160,80,.5)', 'rgba(30,42,74,.6)', 'rgba(240,220,180,.4)']); c.beginPath(); c.arc(x, y, r.range(4, 10), 0, 7); c.fill(); }
    tex(c, r, rx0, ry0, rx1 - rx0, ry1 - ry0, '#6a1418', { n: 3000, len: [4, 12], angJ: 1, al: .12 }); for (let x = rx0; x < rx1; x += 14) { c.strokeStyle = 'rgba(230,220,190,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, ry1); c.lineTo(x + 2, ry1 + 14); c.stroke(); }
    // big desk on the right (behind floor line)
    const dx0 = 1560, dx1 = 2340, dt = 930, db = 1120; shadow(c, (dx0 + dx1) / 2, db, 480, 26, .6); vg(c, dx0 - 20, dt, dx1 - dx0 + 40, 30, [[0, '#7a4a28'], [1, '#3a1e0e']]); c.fillStyle = 'rgba(255,200,140,.4)'; c.fillRect(dx0 - 20, dt, dx1 - dx0 + 40, 3);
    vg(c, dx0, dt + 30, dx1 - dx0, db - dt - 30, [[0, '#4a2814'], [1, '#2a140a']]); for (const px of [dx0 + 20, dx1 - 240]) { c.strokeStyle = 'rgba(255,190,120,.2)'; c.lineWidth = 3; c.strokeRect(px, dt + 50, 220, db - dt - 70); c.fillStyle = '#c8904a'; c.fillRect(px + 100, dt + 90, 20, 6); }
    c.fillStyle = '#1a3a22'; c.fillRect(dx0 + 300, dt - 4, 200, 6); c.fillStyle = '#f0e8d8'; c.fillRect(dx0 + 320, dt - 10, 120, 6);
    // green banker's lamp
    const lx = 2180; c.fillStyle = '#c8904a'; c.fillRect(lx - 4, dt - 110, 8, 110); c.beginPath(); c.ellipse(lx, dt - 4, 46, 10, 0, 0, 7); c.fill(); c.fillStyle = '#1e6a3a'; c.beginPath(); c.moveTo(lx - 90, dt - 100); c.quadraticCurveTo(lx, dt - 170, lx + 90, dt - 100); c.closePath(); c.fill(); c.fillStyle = 'rgba(140,240,170,.4)'; c.beginPath(); c.ellipse(lx - 20, dt - 130, 40, 10, -.2, 0, 7); c.fill();
    gl(c, lx, dt - 90, 300, '255,220,150', .55); cone(c, lx, dt - 100, 170, 500, 200, '255,220,150', .25); c.fillStyle = '#fff2c8'; c.fillRect(lx - 86, dt - 102, 172, 4);
    // globe on a stand, left front corner
    const gx = 300, gy = 900, gr = 130; shadow(c, gx, 1260, 170, 22, .55); c.strokeStyle = '#3a1e0e'; c.lineWidth = 12; for (const d of [-110, 0, 110]) { c.beginPath(); c.moveTo(gx, gy + gr + 60); c.lineTo(gx + d, 1260); c.stroke(); } c.fillRect(gx - 10, gy + gr, 20, 80);
    const gg = c.createRadialGradient(gx - 40, gy - 40, 10, gx, gy, gr); gg.addColorStop(0, '#e8d8a8'); gg.addColorStop(1, '#8a6a3a'); c.fillStyle = gg; c.beginPath(); c.arc(gx, gy, gr, 0, 7); c.fill();
    c.fillStyle = 'rgba(90,110,60,.6)'; for (const [ox, oy, a, b] of [[-50, -40, 40, 60], [30, 10, 50, 40], [-10, 70, 30, 20]]) { c.beginPath(); c.ellipse(gx + ox, gy + oy, a, b, .4, 0, 7); c.fill(); }
    c.strokeStyle = '#c8904a'; c.lineWidth = 10; c.beginPath(); c.arc(gx, gy, gr + 14, -2.2, 1.2); c.stroke();
    ENV.plant(c, r, 2470, 1180, 1.5);
    gl(c, 1280, 700, 1100, '255,170,110', .1); gl(c, 2180, 900, 900, '255,210,140', .1);
    tint(c, W, H, [[0, 'rgba(255,170,110,.3)'], [1, 'rgba(60,30,20,.35)']]);
    done(c, r, W, H, P, { vig: .5 }); },
});
})();
