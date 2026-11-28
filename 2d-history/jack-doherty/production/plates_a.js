// Jack Doherty A-set background plates. Paint one or two at a time:
//   node shared/p2/paint.js jack-doherty/production/plates_a.js jack-doherty/production/plates supermarket_aisle
// Plates are 2560x1440. Helper header copied from whatnot/production/plates_a.js.
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

// ---- GM A-set helpers ----
const tex = (c, r, x, y, w, h, col, n = 3000, o = {}) => P2.fillStrokes(c, r, [x, y, w, h], o.inside || (() => true), { n, len: o.len || [30, 110], w: o.w || [4, 10], ang: o.ang ?? 0, angJ: o.angJ ?? .06, al: o.al ?? .16, colFn: () => P2.shade(P2.jitter(col, r, o.j ?? 12), r.range(-.12, .1)) });
// sea band with horizontal glints
const sea = (c, r, y0, y1, top, bot, glint = '255,240,200', n = 900, gx = null) => { vg(c, 0, y0, c.canvas.width, y1 - y0, [[0, top], [1, bot]]); const W = c.canvas.width;
  for (let i = 0; i < n; i++) { const t = Math.pow(r(), 1.3), y = y0 + t * (y1 - y0), x = gx === null ? r() * W : gx + r.gauss() * (120 + t * 500), L = r.range(10, 60) * (.4 + t * 2); c.fillStyle = `rgba(${glint},${r.range(.08, .4) * (gx === null ? .6 : 1)})`; c.fillRect(x, y, L, 1.5 + t * 3); }
  for (let i = 0; i < n * .5; i++) { const t = r(), y = y0 + t * (y1 - y0); c.fillStyle = `rgba(0,20,40,${r.range(.04, .12)})`; c.fillRect(r() * W, y, r.range(20, 120) * (.4 + t * 2), 2 + t * 4); } };
// arched opening path
const archPath = (c, x, y, w, h, pointed = false) => { c.beginPath(); c.moveTo(x, y + h); c.lineTo(x, y + w / 2); if (pointed) { c.quadraticCurveTo(x, y + w * .05, x + w / 2, y - w * .12); c.quadraticCurveTo(x + w, y + w * .05, x + w, y + w / 2); } else c.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w, y + h); c.closePath(); };
// lattice screen (mashrabiya) in a box
const lattice = (c, x, y, w, h, col, s = 26) => { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = 'rgba(20,10,5,.55)'; c.fillRect(x, y, w, h); c.strokeStyle = col; c.lineWidth = s * .28;
  for (let yy = y; yy < y + h + s; yy += s) for (let xx = x; xx < x + w + s; xx += s) { c.beginPath(); c.arc(xx, yy, s * .42, 0, 7); c.stroke(); c.beginPath(); c.moveTo(xx - s / 2, yy); c.lineTo(xx + s / 2, yy); c.moveTo(xx, yy - s / 2); c.lineTo(xx, yy + s / 2); c.stroke(); } c.restore(); c.strokeStyle = P2.rgb(P2.shade(col, -.3)); c.lineWidth = 8; c.strokeRect(x, y, w, h); };
// date palm with straight-ish trunk and lit fronds
const dpalm = (c, r, x, base, h, lean, dark = '#2a2418', frond = ['#3a5a2a', '#2c4a22', '#4a6a30'], lit = null) => { const tx = x + lean, ty = base - h; c.lineCap = 'round';
  for (let i = 0; i <= 50; i++) { const t = i / 50, px = x + lean * t * t, py = base - h * t, w = (26 - 10 * t) * h / 700; c.strokeStyle = i % 3 ? dark : P2.rgb(P2.shade(dark, .12)); c.lineWidth = h / 50 + 3; c.beginPath(); c.moveTo(px - w, py); c.lineTo(px + w, py + 3); c.stroke(); }
  for (let f = 0; f < 16; f++) { const a = -Math.PI / 2 + (f / 15 - .5) * Math.PI * 1.95 + r.gauss() * .12, L = r.range(.26, .36) * h; const pts = []; for (let k = 0; k <= 16; k++) { const t = k / 16; pts.push([tx + Math.cos(a) * L * t, ty + Math.sin(a) * L * t + t * t * L * .55]); }
    for (let k = 1; k < 16; k++) { const [px, py] = pts[k], [qx, qy] = pts[k - 1], ang = Math.atan2(py - qy, px - qx), ll = (1 - k / 18) * L * .2; for (const sd of [-1, 1]) { c.strokeStyle = P2.rgb(P2.shade(P2.jitter(r.pick(frond), r, 10), r.range(-.1, .1))); c.lineWidth = Math.max(2, h / 220); c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(ang + sd * 1.2) * ll, py + Math.sin(ang + sd * 1.2) * ll + ll * .45); c.stroke(); } }
    c.strokeStyle = frond[1]; c.lineWidth = Math.max(2, h / 180); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
    if (lit) { c.strokeStyle = `rgba(${lit},.35)`; c.lineWidth = Math.max(1, h / 300); c.beginPath(); pts.slice(0, 10).forEach((p, i) => i ? c.lineTo(p[0], p[1] - 2) : c.moveTo(p[0], p[1] - 2)); c.stroke(); } }
  c.fillStyle = '#6a3a14'; for (let i = 0; i < 10; i++) { c.beginPath(); c.arc(tx + r.range(-.04, .04) * h, ty + r.range(.01, .05) * h, h / 160 + 2, 0, 7); c.fill(); } };
// lateen-rigged dhow, side view, waterline at (x,y), length L
const dhow = (c, r, x, y, L, dir = 1, sail = '#efe2c4', hull = '#6a4224') => { const s = L / 400; c.save(); c.translate(x, y); c.scale(dir, 1);
  c.fillStyle = 'rgba(0,30,40,.25)'; c.beginPath(); c.ellipse(0, 4 * s, L * .55, 8 * s, 0, 0, 7); c.fill();
  const g = c.createLinearGradient(0, -50 * s, 0, 0); g.addColorStop(0, P2.rgb(P2.shade(hull, .25))); g.addColorStop(1, P2.rgb(P2.shade(hull, -.35))); c.fillStyle = g;
  c.beginPath(); c.moveTo(-L * .5, -58 * s); c.lineTo(-L * .42, -40 * s); c.quadraticCurveTo(-L * .3, 2 * s, -L * .05, 0); c.quadraticCurveTo(L * .35, 0, L * .58, -72 * s); c.lineTo(L * .5, -50 * s); c.lineTo(-L * .38, -46 * s); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(255,230,190,.35)'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo(-L * .44, -48 * s); c.lineTo(L * .52, -54 * s); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.25)'; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(-L * .4, -46 * s + k * 10 * s); c.quadraticCurveTo(0, -38 * s + k * 10 * s, L * .45, -54 * s + k * 9 * s); c.stroke(); }
  c.strokeStyle = '#3a2614'; c.lineWidth = 6 * s; c.beginPath(); c.moveTo(0, -50 * s); c.lineTo(8 * s, -330 * s); c.stroke();
  c.lineWidth = 4 * s; c.beginPath(); c.moveTo(-L * .42, -110 * s); c.lineTo(L * .42, -380 * s); c.stroke();
  const sg = c.createLinearGradient(-L * .4, 0, L * .4, 0); sg.addColorStop(0, P2.rgb(P2.shade(sail, -.25))); sg.addColorStop(.6, sail); sg.addColorStop(1, P2.rgb(P2.shade(sail, -.1))); c.fillStyle = sg;
  c.beginPath(); c.moveTo(-L * .4, -114 * s); c.quadraticCurveTo(L * .05, -230 * s, L * .4, -374 * s); c.quadraticCurveTo(L * .18, -170 * s, -L * .02, -70 * s); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(120,90,60,.35)'; c.lineWidth = 2 * s; for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-L * .4 + k * L * .08, -114 * s - k * 52 * s); c.lineTo(-L * .02 + k * L * .02, -70 * s - k * 22 * s); c.stroke(); } c.restore(); };
// mud-brick block with soft texture + small dark windows
const mudHouse = (c, r, x, base, w, h, col, o = {}) => { ENV.box(c, r, x, base - h, w, h, col, { density: 60, top: .08, bot: -.18 }); c.fillStyle = P2.rgb(P2.shade(col, -.12)); c.fillRect(x - 6, base - h - 10, w + 12, 14);
  if (o.cren !== false) for (let k = x; k < x + w - 10; k += 34) { c.fillStyle = P2.rgb(P2.shade(col, .04)); c.beginPath(); c.moveTo(k, base - h - 10); c.lineTo(k + 10, base - h - 34); c.lineTo(k + 20, base - h - 10); c.fill(); }
  c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(x + w - w * .12, base - h, w * .12, h);
  const nw = Math.max(1, Math.floor(w / 110)); for (let i = 0; i < nw; i++) { const wx = x + (i + .5) * w / nw - 14; c.fillStyle = '#3a2416'; c.fillRect(wx, base - h * .7, 28, 38); if (o.lit) { c.fillStyle = `rgba(${o.lit},.85)`; c.fillRect(wx + 4, base - h * .7 + 4, 20, 30); gl(c, wx + 14, base - h * .7 + 18, 60, o.lit, .4); } }
  for (let i = 0; i < 4; i++) { c.fillStyle = '#5a3a1e'; c.fillRect(x + 20 + r() * (w - 40), base - h + 18, 22, 8); } };
// wind tower (barjeel)
const windTower = (c, r, x, base, w, h, col) => { mudHouse(c, r, x - w * .1, base, w * 1.2, h * .45, col); ENV.box(c, r, x, base - h, w, h * .55, col, { density: 50, top: .1, bot: -.1 });
  for (let k = 0; k < 3; k++) { const wx = x + 14 + k * (w - 28) / 3; c.fillStyle = '#2a1a10'; c.fillRect(wx + 4, base - h + 30, (w - 28) / 3 - 8, h * .38); }
  c.fillStyle = P2.rgb(P2.shade(col, .1)); c.fillRect(x - 10, base - h - 14, w + 20, 18); for (let k = x - 10; k < x + w + 10; k += 24) { c.beginPath(); c.moveTo(k, base - h - 14); c.lineTo(k + 12, base - h - 36); c.lineTo(k + 24, base - h - 14); c.fill(); } };
// marble floor with veins
const marble = (c, r, y0, y1, col, tile = 260, vx = 1280) => { const W = c.canvas.width; vg(c, 0, y0, W, y1 - y0, [[0, P2.rgb(P2.shade(col, -.12))], [1, P2.rgb(P2.shade(col, .05))]]);
  for (let i = 0; i < 160; i++) { const y = r.range(y0, y1), x = r() * W; c.strokeStyle = `rgba(120,110,100,${r.range(.05, .14)})`; c.lineWidth = r.range(1, 3); c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + r.range(-80, 80), y + r.range(-10, 10), x + r.range(-160, 160), y + r.range(-14, 14), x + r.range(-260, 260), y + r.range(-20, 20)); c.stroke(); }
  persLines(c, y0, y1, vx, 6, 'rgba(90,70,50,.18)', 2); };
const torch = (c, r, x, y, s = 1) => { c.fillStyle = '#2a1a0e'; c.fillRect(x - 7 * s, y, 14 * s, 70 * s); c.fillStyle = '#4a3016'; c.beginPath(); c.moveTo(x - 22 * s, y); c.lineTo(x + 22 * s, y); c.lineTo(x + 12 * s, y + 26 * s); c.lineTo(x - 12 * s, y + 26 * s); c.fill();
  gl(c, x, y - 30 * s, 420 * s, '255,150,60', .45); gl(c, x, y - 30 * s, 120 * s, '255,200,120', .7); for (let k = 0; k < 3; k++) { c.fillStyle = ['#ff7a20', '#ffb040', '#fff0b0'][k]; c.beginPath(); c.moveTo(x - (22 - k * 7) * s, y); c.quadraticCurveTo(x - (20 - k * 6) * s, y - (40 - k * 8) * s, x + r.range(-4, 4) * s, y - (80 - k * 20) * s); c.quadraticCurveTo(x + (20 - k * 6) * s, y - (40 - k * 8) * s, x + (22 - k * 7) * s, y); c.fill(); } };
const chandelier = (c, x, y, s = 1, col = '255,220,150') => { c.strokeStyle = '#8a6a2a'; c.lineWidth = 4 * s; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y - 60 * s); c.stroke(); gl(c, x, y, 420 * s, col, .4);
  for (let t = 0; t < 3; t++) { const rw = (150 - t * 40) * s, yy = y - 40 * s + t * 50 * s; c.strokeStyle = '#d8b050'; c.lineWidth = 5 * s; c.beginPath(); c.ellipse(x, yy, rw, rw * .22, 0, 0, Math.PI); c.stroke();
    for (let k = 0; k < 9 - t * 2; k++) { const a = Math.PI * (k + .5) / (9 - t * 2), px = x + Math.cos(a) * rw, py = yy + Math.sin(a) * rw * .22; c.fillStyle = '#fff6d8'; c.fillRect(px - 3 * s, py - 22 * s, 6 * s, 20 * s); gl(c, px, py - 26 * s, 40 * s, '255,230,170', .8); c.fillStyle = 'rgba(230,240,255,.7)'; c.beginPath(); c.moveTo(px, py); c.lineTo(px - 5 * s, py + 22 * s); c.lineTo(px + 5 * s, py + 22 * s); c.fill(); } }
  for (let k = 0; k < 14; k++) { const a = k / 14 * 6.28; c.fillStyle = 'rgba(240,250,255,.6)'; c.beginPath(); c.arc(x + Math.cos(a) * 50 * s, y + 70 * s + Math.sin(a) * 10 * s, 5 * s, 0, 7); c.fill(); } c.fillStyle = '#d8b050'; c.beginPath(); c.arc(x, y + 90 * s, 16 * s, 0, 7); c.fill(); };
const dallah = (c, x, base, s = 1) => { const g = c.createLinearGradient(x - 30 * s, 0, x + 30 * s, 0); g.addColorStop(0, '#6a4a14'); g.addColorStop(.4, '#f0c860'); g.addColorStop(1, '#5a3a10'); c.fillStyle = g;
  c.beginPath(); c.moveTo(x - 30 * s, base); c.quadraticCurveTo(x - 36 * s, base - 50 * s, x - 14 * s, base - 70 * s); c.lineTo(x - 10 * s, base - 100 * s); c.lineTo(x + 10 * s, base - 100 * s); c.lineTo(x + 14 * s, base - 70 * s); c.quadraticCurveTo(x + 36 * s, base - 50 * s, x + 30 * s, base); c.fill();
  c.beginPath(); c.moveTo(x - 16 * s, base - 108 * s); c.lineTo(x + 16 * s, base - 108 * s); c.lineTo(x, base - 132 * s); c.fill(); c.strokeStyle = '#c89a40'; c.lineWidth = 6 * s; c.beginPath(); c.moveTo(x - 26 * s, base - 40 * s); c.quadraticCurveTo(x - 70 * s, base - 80 * s, x - 60 * s, base - 120 * s); c.stroke(); c.beginPath(); c.moveTo(x + 22 * s, base - 30 * s); c.quadraticCurveTo(x + 50 * s, base - 70 * s, x + 30 * s, base - 95 * s); c.stroke(); };
const cushion = (c, x, y, w, h, col, trim = '#d8b050') => { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, P2.rgb(P2.shade(col, .22))); g.addColorStop(1, P2.rgb(P2.shade(col, -.35))); c.fillStyle = g; rr(c, x, y, w, h, Math.min(h, w) * .25); c.fill(); c.strokeStyle = trim; c.lineWidth = 3; rr(c, x + 6, y + 6, w - 12, h - 12, Math.min(h, w) * .2); c.stroke(); };
const rug = (c, r, x, y, w, h, base, bord) => { c.fillStyle = bord; c.fillRect(x, y, w, h); c.fillStyle = base; c.fillRect(x + w * .05, y + h * .1, w * .9, h * .8); c.strokeStyle = 'rgba(240,210,140,.5)'; c.lineWidth = 3;
  for (let k = 0; k < 7; k++) { const cx = x + w * (.12 + k * .126), cy = y + h / 2; c.beginPath(); c.moveTo(cx - w * .05, cy); c.lineTo(cx, cy - h * .3); c.lineTo(cx + w * .05, cy); c.lineTo(cx, cy + h * .3); c.closePath(); c.stroke(); } tex(c, r, x, y, w, h, base, 600, { len: [10, 30], w: [2, 4], al: .12 }); };

// ---- WN A-set helpers ----
// generic trading card: coloured border, abstract silhouette or star
const tcard = (c, r, x, y, w, rot = 0, o = {}) => { const h = w * 1.4; c.save(); c.translate(x, y); c.rotate(rot); const bc = o.col || r.pick(['#d83a3a', '#2a6ad8', '#e8b830', '#3aa858', '#9a4ad8', '#e87a2a', '#20b8c8']);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-w / 2 + 3, -h / 2 + 4, w, h); c.fillStyle = bc; rr(c, -w / 2, -h / 2, w, h, w * .06); c.fill();
  const g = c.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, P2.rgb(P2.shade(bc, .45))); g.addColorStop(1, P2.rgb(P2.shade(bc, -.35))); c.fillStyle = g; c.fillRect(-w * .4, -h * .42, w * .8, h * .62);
  c.fillStyle = 'rgba(20,16,30,.8)'; if (r() < .7) { c.beginPath(); c.arc(0, -h * .2, w * .12, 0, 7); c.fill(); poly(c, [[-w * .22, h * .2], [-w * .14, -h * .08], [w * .14, -h * .08], [w * .22, h * .2]]); c.fill(); }
  else { c.fillStyle = 'rgba(255,250,220,.9)'; c.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rd = k % 2 ? w * .1 : w * .24; c.lineTo(Math.cos(a) * rd, -h * .11 + Math.sin(a) * rd); } c.fill(); }
  c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(-w * .36, h * .26, w * .72, h * .06); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(-w * .3, h * .36, w * .45, h * .03);
  if (o.slab) { c.strokeStyle = 'rgba(220,235,255,.7)'; c.lineWidth = 3; c.strokeRect(-w * .62, -h * .72, w * 1.24, h * 1.3); c.fillStyle = 'rgba(200,40,40,.85)'; c.fillRect(-w * .58, -h * .7, w * 1.16, h * .16); c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(-w * .4, -h * .65, w * .5, h * .05); c.fillStyle = 'rgba(230,240,255,.12)'; c.fillRect(-w * .62, -h * .72, w * .4, h * 1.3); }
  if (o.shine !== false) { c.fillStyle = 'rgba(255,255,255,.14)'; poly(c, [[-w / 2, -h / 2], [-w * .1, -h / 2], [-w / 2, h * .1]]); c.fill(); } c.restore(); };
// sealed card box (front face + top) with foil band and star burst
const cbox = (c, r, x, base, w, h, col) => { const d = Math.min(18, w * .15), dk = P2.rgb(P2.shade(col, -.45)), lt = P2.rgb(P2.shade(col, .35));
  const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, lt); g.addColorStop(.5, P2.rgb(col)); g.addColorStop(1, dk); c.fillStyle = g; c.fillRect(x, base - h, w, h);
  c.fillStyle = lt; poly(c, [[x, base - h], [x + w, base - h], [x + w - d * .4, base - h - d * .6], [x + d * .4, base - h - d * .6]]); c.fill();
  c.fillStyle = r.pick(['rgba(255,220,90,.85)', 'rgba(220,230,240,.8)', 'rgba(20,20,30,.6)']); c.fillRect(x, base - h * .35, w, h * .12);
  c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc(x + w * .5, base - h * .62, Math.min(w, h) * .18, 0, 7); c.fill(); c.fillStyle = P2.rgb(P2.shade(col, -.2)); c.beginPath(); c.arc(x + w * .5, base - h * .62, Math.min(w, h) * .1, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(x + w * .08, base - h + 4, w * .1, h - 8); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; c.strokeRect(x, base - h, w, h); };
// shelf board with shadow under it
const shelf = (c, x, y, w, col = '#3a2a22', th = 18) => { c.fillStyle = P2.rgb(P2.shade(col, .25)); c.fillRect(x, y, w, 5); c.fillStyle = col; c.fillRect(x, y + 5, w, th); vg(c, x, y + th + 5, w, 40, [[0, 'rgba(0,0,0,.4)'], [1, 'rgba(0,0,0,0)']]); };
// ring light on a stand
const ringLight = (c, x, fy, top, rad, col = '255,250,240') => { shadow(c, x, fy, 110, 16, .5); c.strokeStyle = '#121216'; c.lineWidth = 6; c.lineCap = 'round'; for (const dx of [-80, 0, 80]) { c.beginPath(); c.moveTo(x, fy - 160); c.lineTo(x + dx, fy); c.stroke(); }
  c.lineWidth = 10; c.beginPath(); c.moveTo(x, fy - 160); c.lineTo(x, top + rad); c.stroke(); gl(c, x, top, rad * 3.2, col, .35); gl(c, x, top, rad * 1.4, col, .5);
  c.strokeStyle = '#1a1a20'; c.lineWidth = rad * .34; c.beginPath(); c.arc(x, top, rad, 0, 7); c.stroke(); c.strokeStyle = `rgb(${col})`; c.lineWidth = rad * .22; c.beginPath(); c.arc(x, top, rad, 0, 7); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = rad * .06; c.beginPath(); c.arc(x, top, rad, 0, 7); c.stroke(); c.fillStyle = '#16161a'; rr(c, x - 18, top - 30, 36, 60, 6); c.fill(); };
// row of books standing on a shelf
const books = (c, r, x0, x1, base, hmin, hmax, cols) => { let x = x0; while (x < x1 - 10) { const w = r.range(14, 30), h = r.range(hmin, hmax), col = P2.jitter(r.pick(cols), r, 14);
  if (r() < .06) { x += r.range(20, 50); continue; } const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, P2.rgb(P2.shade(col, .15))); g.addColorStop(1, P2.rgb(P2.shade(col, -.4))); c.fillStyle = g; c.fillRect(x, base - h, w, h);
  c.fillStyle = 'rgba(230,190,110,.6)'; c.fillRect(x + 2, base - h + h * .15, w - 4, 3); c.fillRect(x + 2, base - h * .25, w - 4, 3); if (r() < .5) { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 3, base - h * .62, w - 6, h * .14); } x += w + 1; } };
// tall potted plant
const plant = (c, r, x, fy, h, pot = '#e8ece8', cols = ['#2f7a4a', '#3a9058', '#24603a', '#4aa868']) => { shadow(c, x, fy, 120, 18, .4); const pw = h * .18;
  for (let i = 0; i < 26; i++) { const a = -Math.PI / 2 + r.range(-1.1, 1.1), L = h * r.range(.45, .9), ex = x + Math.cos(a) * L * .55, ey = fy - pw * 1.3 + Math.sin(a) * L;
    c.strokeStyle = '#2a4a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, fy - pw); c.quadraticCurveTo(x + (ex - x) * .3, ey + (fy - ey) * .4, ex, ey); c.stroke();
    c.fillStyle = P2.rgb(P2.shade(P2.jitter(r.pick(cols), r, 12), r.range(-.15, .15))); c.save(); c.translate(ex, ey); c.rotate(a + Math.PI / 2 + r.range(-.4, .4)); c.beginPath(); c.ellipse(0, 0, h * .05, h * .13, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.15)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -h * .12); c.lineTo(0, h * .12); c.stroke(); c.restore(); }
  const g = c.createLinearGradient(x - pw, 0, x + pw, 0); g.addColorStop(0, P2.rgb(P2.shade(pot, .1))); g.addColorStop(1, P2.rgb(P2.shade(pot, -.35))); c.fillStyle = g; poly(c, [[x - pw, fy - pw * 1.3], [x + pw, fy - pw * 1.3], [x + pw * .78, fy], [x - pw * .78, fy]]); c.fill(); };
// gilded frame with an abstract painting inside
const gframe = (c, r, x, y, w, h, pal) => { const g = c.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#f0d070'); g.addColorStop(.5, '#9a6a20'); g.addColorStop(1, '#e0b850'); c.fillStyle = g; c.fillRect(x - 22, y - 22, w + 44, h + 44); c.fillStyle = '#5a3a10'; c.fillRect(x - 6, y - 6, w + 12, h + 12);
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); vg(c, x, y, w, h, [[0, pal[0]], [1, pal[1]]]); for (let i = 0; i < 40; i++) { c.fillStyle = P2.rgb(P2.jitter(r.pick(pal), r, 30), r.range(.3, .7)); c.beginPath(); c.ellipse(x + r() * w, y + r() * h, r.range(10, w * .25), r.range(6, h * .12), r() * 3, 0, 7); c.fill(); }
  vg(c, x, y, w, h, [[0, 'rgba(255,240,200,.15)'], [1, 'rgba(0,0,0,.3)']]); c.restore(); gl(c, x + w / 2, y - 20, w * .7, '255,220,160', .25); };


// ---- JD helpers ----
// point on a line from (x0,y0) toward vanishing point (vx,vy) at parameter t (0 near, 1 at VP)
const toVP = (x0, y0, vx, vy, t) => [x0 + (vx - x0) * t, y0 + (vy - y0) * t];
// one receding wall of supermarket shelving. side -1 left, +1 right (mirrored)
const aisleWall = (c, r, side, VX, VY, nearBase, nearTop, tEnd, W) => { const mx = x => side < 0 ? x : W - x;
  const nx = 0, levels = [0, .1, .3, .5, .7, .86];
  const pt = (t, k) => { const [x, yb] = toVP(nx, nearBase, VX, VY, t), [, yt] = toVP(nx, nearTop, VX, VY, t); return [mx(x), yb + (yt - yb) * k]; };
  // back panel of the shelving
  const g = c.createLinearGradient(mx(0), 0, mx(VX * tEnd), 0); g.addColorStop(0, '#3a4048'); g.addColorStop(1, '#6a7078'); c.fillStyle = g;
  poly(c, [pt(0, 0), pt(tEnd, 0), pt(tEnd, 1), pt(0, 1)]); c.fill();
  const pal = ['#d8342c', '#f0c020', '#2a62c8', '#3aa04a', '#f07a20', '#e8e0d0', '#8a3ac0', '#20a8c0', '#c82a6a', '#f4f4f0', '#1e2a5a', '#e85a3a', '#6ac040', '#ffd860', '#b02020'];
  for (let li = 0; li < levels.length - 1; li++) { const k0 = levels[li], k1 = levels[li + 1];
    let t = 0; while (t < tEnd) { const s = 1 - t, step = r.range(.014, .03) * (.4 + s * .6); const t1 = Math.min(tEnd, t + step);
      const fill = r.range(.72, .98), col = P2.jitter(r.pick(pal), r, 16), kt = k0 + (k1 - k0) * (li === 0 ? .9 : fill) * .92;
      const a = pt(t, k0 + .012), b = pt(t1, k0 + .012), bb = pt(t1, kt), aa = pt(t, kt);
      const cg = c.createLinearGradient(0, aa[1], 0, a[1]); cg.addColorStop(0, P2.rgb(P2.shade(col, .25))); cg.addColorStop(1, P2.rgb(P2.shade(col, -.25)));
      c.fillStyle = cg; poly(c, [a, b, bb, aa]); c.fill();
      // label band + tiny detail
      if (s > .25) { const mid = (k0 + kt) / 2; const l0 = pt(t + step * .15, mid + .01), l1 = pt(t1 - step * .15, mid + .01), l2 = pt(t1 - step * .15, mid - (kt - k0) * .18), l3 = pt(t + step * .15, mid - (kt - k0) * .18);
        c.fillStyle = r() < .5 ? 'rgba(255,255,255,.75)' : P2.rgb(P2.shade(col, -.5), .8); poly(c, [l0, l1, l2, l3]); c.fill();
        if (r() < .4) { const q = pt(t + step * .5, kt - (kt - k0) * .2); c.fillStyle = P2.rgb(P2.jitter(r.pick(pal), r, 20), .9); c.beginPath(); c.arc(q[0], q[1], 9 * s, 0, 7); c.fill(); } }
      c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = Math.max(1, 2 * s); c.beginPath(); c.moveTo(...b); c.lineTo(...bb); c.stroke();
      t = t1 + step * .04; }
    // shelf lip with price strip
    const s0 = pt(0, k0), s1 = pt(tEnd, k0), s2 = pt(tEnd, k0 + .022), s3 = pt(0, k0 + .03);
    c.fillStyle = '#c8ccd0'; poly(c, [s0, s1, s2, s3]); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)';
    const p0 = pt(0, k0 + .01), p1 = pt(tEnd, k0 + .01); c.strokeStyle = 'rgba(255,240,120,.9)'; c.lineWidth = 3; c.beginPath(); c.moveTo(...p0); c.lineTo(...p1); c.stroke();
    for (let tt = .02; tt < tEnd; tt += .05 * (1.2 - tt)) { const q = pt(tt, k0 + .014), s = 1 - tt; c.fillStyle = r() < .2 ? '#e8302a' : '#fff6c0'; c.fillRect(q[0] - 12 * s, q[1] - 8 * s, 24 * s, 14 * s); } }
  // top cap, uprights
  const c0 = pt(0, .86), c1 = pt(tEnd, .86), c2 = pt(tEnd, 1), c3 = pt(0, 1); c.fillStyle = '#4a525c'; poly(c, [c0, c1, c2, c3]); c.fill();
  for (let tt = 0; tt <= tEnd; tt += .12 * (1.1 - tt)) { const u0 = pt(tt, 0), u1 = pt(tt, 1); c.strokeStyle = '#2a3036'; c.lineWidth = 12 * (1 - tt) + 2; c.beginPath(); c.moveTo(...u0); c.lineTo(...u1); c.stroke(); c.strokeStyle = 'rgba(220,230,240,.35)'; c.lineWidth = 3 * (1 - tt) + 1; c.beginPath(); c.moveTo(u0[0] + 4, u0[1]); c.lineTo(u1[0] + 4, u1[1]); c.stroke(); }
  // overstock boxes on top cap
  for (let tt = .02; tt < tEnd - .02; tt += r.range(.03, .07) * (1.1 - tt)) { const s = 1 - tt, a = pt(tt, .865), w = r.range(50, 110) * s, h = r.range(40, 90) * s; cbox(c, r, side < 0 ? a[0] : a[0] - w, a[1], w, h, P2.jitter('#b08a5a', r, 14)); }
  // base kick plate
  const k0 = pt(0, 0), k1 = pt(tEnd, 0), k2 = pt(tEnd, .015), k3 = pt(0, .02); c.fillStyle = '#20252a'; poly(c, [k0, k1, k2, k3]); c.fill(); };
// shopping trolley side-on
const trolley = (c, x, fy, s, dir = 1) => { shadow(c, x + 150 * s * dir, fy, 200 * s, 18 * s, .5); c.strokeStyle = '#a8b0b8'; c.lineWidth = 4 * s; c.lineCap = 'round';
  const X = v => x + v * s * dir, Y = v => fy - v * s;
  for (let i = 0; i <= 12; i++) { c.beginPath(); c.moveTo(X(20 + i * 22), Y(140)); c.lineTo(X(40 + i * 21), Y(300)); c.stroke(); }
  for (const v of [140, 190, 245, 300]) { c.beginPath(); c.moveTo(X(20), Y(v)); c.lineTo(X(296), Y(v + (v - 140) * .05)); c.stroke(); }
  c.lineWidth = 7 * s; c.strokeStyle = '#7a848e'; c.beginPath(); c.moveTo(X(10), Y(140)); c.lineTo(X(300), Y(140)); c.lineTo(X(300), Y(310)); c.stroke();
  c.beginPath(); c.moveTo(X(30), Y(140)); c.lineTo(X(40), Y(30)); c.lineTo(X(280), Y(30)); c.lineTo(X(300), Y(140)); c.stroke();
  c.strokeStyle = '#c82a2a'; c.lineWidth = 12 * s; c.beginPath(); c.moveTo(X(300), Y(312)); c.lineTo(X(345), Y(330)); c.stroke();
  for (const v of [50, 270]) { c.fillStyle = '#16181c'; c.beginPath(); c.arc(X(v), Y(14), 14 * s, 0, 7); c.fill(); c.fillStyle = '#5a6068'; c.beginPath(); c.arc(X(v), Y(14), 5 * s, 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2 * s; c.beginPath(); c.moveTo(X(10), Y(143)); c.lineTo(X(300), Y(143)); c.stroke(); };

window.PLATES = Object.assign(window.PLATES || {}, {
  // supermarket_aisle: big-box supermarket aisle, one-point perspective, VP (1280,720). Floor y 1250 (clear floor x 200-2360 at that depth). Shelf walls left x<~480 and right x>~2080 near the floor line. Trolley parked left x 60-420 base y 1370. Hanging aisle signs over centre y 200-440 (blank boards ok for overlays at x 1130-1430 y 210-330). End-of-aisle back wall x 1040-1520 y 620-835.
  supermarket_aisle: (c, r, W, H, P) => { const VX = 1280, VY = 720, nb = 1330, nt = 170, tE = .8;
    // ceiling
    vg(c, 0, 0, W, VY, [[0, '#8a9098'], [.6, '#b8bec4'], [1, '#d0d4d6']]); tex(c, r, 0, 0, W, VY, '#a0a6ac', 1600, { al: .08 });
    for (let i = 0; i < 14; i++) { const t = 1 - Math.pow(.82, i + 1), y = toVP(0, -200, VX, VY, t)[1]; c.strokeStyle = `rgba(60,66,74,${.5 - t * .3})`; c.lineWidth = 10 * (1 - t) + 1; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    for (let i = -6; i <= 6; i++) { c.strokeStyle = 'rgba(70,76,84,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(VX, VY); c.lineTo(VX + i * 420, -40); c.stroke(); }
    // fluorescent runs
    for (let i = 0; i < 16; i++) { const t = 1 - Math.pow(.84, i + .6), s = 1 - t; for (const off of [-1, 1]) { const [x, y] = toVP(VX + off * 520, -60, VX, VY, t), w = 220 * s, h = 22 * s; gl(c, x, y + h, w * 1.6, '235,245,255', .35 * s + .1); c.fillStyle = '#f8fcff'; c.fillRect(x - w / 2, y, w, h); } }
    gl(c, VX, 300, 1400, '230,240,255', .18);
    // end-of-aisle back wall + cross aisle
    const [bxL, bb] = toVP(0, nb, VX, VY, tE), [, bt] = toVP(0, nt, VX, VY, tE), bxR = W - bxL;
    vg(c, bxL, bt - 40, bxR - bxL, bb - bt + 40, [[0, '#d8dcd8'], [1, '#e8e8e2']]);
    for (let x = bxL + 10; x < bxR; x += 26) { cbox(c, r, x, bb - 4, 22, r.range(14, 34), P2.jitter(r.pick(['#d8342c', '#2a62c8', '#f0c020', '#3aa04a', '#e8e0d0']), r, 14)); }
    c.fillStyle = '#2a8a4a'; rr(c, VX - 70, bt + 10, 140, 34, 4); c.fill(); txt(c, 'EXIT', VX, bt + 28, 24, '#f4fff4'); gl(c, VX, bt + 28, 120, '120,255,160', .3);
    c.fillStyle = '#c8302a'; c.fillRect(bxL, bt - 40, bxR - bxL, 26); txt(c, 'FRESH  BAKERY  DELI', VX, bt - 27, 18, '#fff');
    // shelving walls
    aisleWall(c, r, -1, VX, VY, nb, nt, tE, W); aisleWall(c, r, 1, VX, VY, nb, nt, tE, W);
    // floor
    poly(c, [[0, nb], toVP(0, nb, VX, VY, tE), toVP(W, nb, VX, VY, tE), [W, nb], [W, H], [0, H]]); c.save(); c.clip();
    vg(c, 0, bb, W, H - bb, [[0, '#d8d6cc'], [.4, '#c4c0b4'], [1, '#9a968c']]); tex(c, r, 0, bb, W, H - bb, '#c0bcb0', 2600, { al: .1 });
    for (let i = -20; i <= 20; i++) { c.strokeStyle = 'rgba(90,86,78,.22)'; c.lineWidth = 2; c.beginPath(); c.moveTo(VX, VY); c.lineTo(VX + i * 180, H + 400); c.stroke(); }
    for (let i = 0; i < 26; i++) { const t = 1 - Math.pow(.88, i + 1), y = toVP(0, H + 300, VX, VY, t)[1]; if (y < bb) continue; c.strokeStyle = 'rgba(90,86,78,.2)'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    // reflections of lights and shelves on polished floor
    for (let i = 0; i < 16; i++) { const t = 1 - Math.pow(.84, i + .6), s = 1 - t; for (const off of [-1, 1]) { const [x] = toVP(VX + off * 520, 0, VX, VY, t), y = VY + (VY - toVP(0, -60, VX, VY, t)[1]) * .9; c.save(); c.translate(x, y); c.scale(1, 2.4); gl(c, 0, 0, 120 * s + 10, '245,250,255', .3 * s + .08); c.restore(); } }
    c.save(); c.globalAlpha = .1; c.filter = 'blur(14px)'; for (const sd of [-1, 1]) { for (let i = 0; i < 40; i++) { const t = r() * tE, [x, y] = toVP(sd < 0 ? 0 : W, nb, VX, VY, t); c.fillStyle = r.pick(['#d8342c', '#2a62c8', '#f0c020', '#3aa04a']); c.fillRect(x - 20 * (1 - t), y + 4, 50 * (1 - t) + 6, 90 * (1 - t)); } } c.restore();
    c.restore();
    // floor sale stand / signs low near shelf base
    const ss = toVP(0, nb, VX, VY, .42); c.fillStyle = '#e8302a'; rr(c, ss[0] + 70, ss[1] - 150, 110, 70, 6); c.fill(); txt(c, 'SALE', ss[0] + 125, ss[1] - 115, 30, '#fff'); c.fillStyle = '#555'; c.fillRect(ss[0] + 122, ss[1] - 80, 6, 70);
    // hanging aisle signs
    [[.12, '14'], [.4, '15'], [.58, '16'], [.7, '17']].forEach(([t, n]) => { const s = 1 - t, [x, y] = toVP(VX, 210, VX, VY, t), w = 420 * s, h = 150 * s;
      c.strokeStyle = '#555'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - w * .4, 0); c.lineTo(x - w * .4, y); c.moveTo(x + w * .4, 0); c.lineTo(x + w * .4, y); c.stroke();
      c.fillStyle = 'rgba(0,0,0,.25)'; rr(c, x - w / 2 + 5, y + 6, w, h, 8 * s); c.fill(); c.fillStyle = '#1e4a9a'; rr(c, x - w / 2, y, w, h, 8 * s); c.fill(); c.fillStyle = '#f0c020'; c.fillRect(x - w / 2, y + h * .72, w, h * .12);
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x - w * .3, y + h * .38, h * .3, 0, 7); c.fill(); txt(c, n, x - w * .3, y + h * .38, h * .34, '#1e4a9a');
      c.fillStyle = 'rgba(255,255,255,.85)'; for (let k = 0; k < 2; k++) c.fillRect(x - w * .08, y + h * (.2 + k * .25), w * r.range(.3, .5), h * .1); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(x - w / 2, y, w, h * .12); });
    trolley(c, 70, 1370, 1.0, 1);
    // light wash + haze toward VP
    gl(c, VX, VY, 900, '255,250,235', .2); cone(c, VX, 0, 400, 1600, 1440, '255,252,240', .05);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(200,220,255,.25)'], [1, 'rgba(120,90,60,.25)']]); c.restore();
    done(c, r, W, H, P, { vig: .38 }); },
  // night_highway: wet Miami highway at night in rain. Guardrail top y 1150 spanning full width (posts every 220 px, rail face y 1110-1165). Road surface y 1180-1440 clear: near lane centre y ~1390 (car wheels/base y 1400, car ~260 px tall, top ~1140), far lane y ~1250. City skyline x 0-2560 horizon y ~880. Palms behind rail x 300, 820, 1900, 2350. Streetlights x 560, 1460, 2240 (heads y ~430).
  night_highway: (c, r, W, H, P) => { const hz = 900, rt = 1150;
    city(c, r, 0, 0, W, hz, { sky: [[0, '#05070f'], [.5, '#141a30'], [.85, '#3a2a48'], [1, '#6a3a4a']], stars: 0, haze: 'rgba(220,110,90,.35)', neon: .12, cool: .3,
      layers: [{ h: [.12, .3], col: '#1a1c30', win: '255,200,150', p: .2, ws: 4 }, { h: [.2, .48], col: '#13142a', win: '255,210,160', p: .3, ws: 5 }, { h: [.1, .26], col: '#0c0d1c', win: '255,220,170', p: .4, ws: 7 }] });
    // low cloud glow + rain veil
    c.save(); c.filter = 'blur(30px)'; for (let i = 0; i < 26; i++) { c.fillStyle = `rgba(${r.pick(['90,70,110', '130,80,90', '60,60,90'])},${r.range(.08, .2)})`; c.beginPath(); c.ellipse(r() * W, r.range(40, 420), r.range(200, 520), r.range(40, 110), 0, 0, 7); c.fill(); } c.restore();
    gl(c, 1280, hz, 1500, '255,140,110', .22);
    // far verge + overpass road beyond the rail
    vg(c, 0, hz, W, rt - hz, [[0, '#1a1a24'], [1, '#0e1016']]); tex(c, r, 0, hz, W, rt - hz, '#1e2028', 1500, { al: .12 });
    for (let i = 0; i < 40; i++) { const x = r() * W, y = hz + 30 + r() * 60, rd = r() < .5; c.fillStyle = rd ? '#ff3a2a' : '#fff4d8'; c.fillRect(x, y, 8, 3); gl(c, x, y, 34, rd ? '255,60,40' : '255,240,210', .35); }
    for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(${r.pick(['20,40,28', '30,52,34', '14,24,18'])},.8)`; c.beginPath(); c.ellipse(r() * W, rt - 20 - r() * 110, r.range(10, 40), r.range(6, 18), 0, 0, 7); c.fill(); }
    // palms and streetlights behind the rail
    for (const [x, h, l] of [[300, 640, 60], [820, 560, -40], [1080, 420, 30], [1900, 620, -70], [2350, 700, 50]]) palm(c, r, x, rt - 30, h, l, '255,170,120'); c.fillStyle = 'rgba(14,16,30,.35)'; c.fillRect(0, 0, 0, 0);
    c.save(); c.globalCompositeOperation = 'multiply'; vg(c, 0, 0, W, rt - 30, [[0, 'rgb(255,255,255)'], [.45, 'rgb(170,160,200)'], [1, 'rgb(150,140,180)']]); c.restore();
    for (const x of [560, 1460, 2240]) { const top = 430; c.fillStyle = '#1a1c22'; c.fillRect(x - 8, top, 16, rt - top); c.fillRect(x, top - 6, 120, 12); c.fillStyle = '#ffd8a0'; rr(c, x + 80, top + 4, 70, 14, 6); c.fill();
      gl(c, x + 115, top + 14, 420, '255,190,120', .4); gl(c, x + 115, top + 14, 120, '255,230,190', .8); cone(c, x + 115, top + 18, 40, 520, rt - top, '255,200,140', .1); }
    // guardrail
    for (let x = 40; x < W; x += 220) { vg(c, x - 10, rt - 60, 20, 300, [[0, '#9aa0a8'], [1, '#3a3e44']]); }
    let g = c.createLinearGradient(0, rt - 42, 0, rt + 16); g.addColorStop(0, '#d8dde4'); g.addColorStop(.25, '#8a929c'); g.addColorStop(.5, '#c4cad2'); g.addColorStop(.75, '#5a626c'); g.addColorStop(1, '#2a2e34'); c.fillStyle = g; c.fillRect(0, rt - 42, W, 58);
    c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(0, rt - 42, W, 3); for (let x = 40; x < W; x += 220) { c.fillStyle = '#3a3e44'; c.beginPath(); c.arc(x - 6, rt - 13, 4, 0, 7); c.arc(x + 6, rt - 13, 4, 0, 7); c.fill(); }
    for (const x of [560, 1460, 2240]) gl(c, x + 115, rt - 30, 260, '255,200,140', .35);
    for (let x = 150; x < W; x += 440) { c.fillStyle = '#ffb020'; c.fillRect(x, rt - 30, 14, 20); gl(c, x + 7, rt - 20, 30, '255,180,40', .5); }
    // road
    vg(c, 0, rt + 16, W, H - rt - 16, [[0, '#14161e'], [.4, '#1c1e28'], [1, '#0a0b10']]); tex(c, r, 0, rt + 16, W, H - rt - 16, '#22242e', 2500, { al: .14 });
    reflect(c, rt + 16, 264, .3, 8);
    c.save(); c.globalCompositeOperation = 'screen'; for (const x of [560, 1460, 2240]) for (let k = 0; k < 40; k++) { c.fillStyle = `rgba(255,190,120,${.22 - k * .005})`; c.fillRect(x + 115 - 26 + r.range(-18, 18), rt + 30 + k * 6.5, r.range(30, 60), 4); } c.restore();
    c.fillStyle = 'rgba(240,240,230,.7)'; c.fillRect(0, rt + 34, W, 6); for (let x = -40; x < W; x += 260) { c.fillStyle = 'rgba(240,220,120,.75)'; c.fillRect(x, 1312, 150, 8); }
    for (let i = 0; i < 70; i++) { const x = r() * W, y = r.range(rt + 40, H), w = r.range(60, 260); c.fillStyle = `rgba(${r.pick(['255,190,130', '150,170,220', '255,120,140'])},${r.range(.03, .08)})`; c.beginPath(); c.ellipse(x, y, w, w * .05, 0, 0, 7); c.fill(); }
    for (let i = 0; i < 260; i++) { c.strokeStyle = `rgba(220,230,255,${r.range(.08, .25)})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse(r() * W, r.range(rt + 30, H), r.range(4, 12), r.range(1, 3), 0, 0, 7); c.stroke(); }
    drizzle(c, r, W, H, 2200, .2); c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(80,90,180,.3)'], [1, 'rgba(255,120,90,.2)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },
  // hospital: A&E bay at night, cool blue-green. Floor y 1250. Bed left third: frame x 140-900, mattress top y 1000 (lying figure head at pillow x ~230, y ~960), bed legs to floor 1250. Curtain rail y 150 across, curtain bunched x 0-120 and x 2380-2560. Heart monitor on stand x 1000 (screen x 930-1090 y 640-760). IV pole x 80 (bag y 420-560). Window with night blinds x 1600-2200 y 280-760. Clear standing area x 1150-2350.
  hospital: (c, r, W, H, P) => { const fy = 1250, mt = 1000;
    vg(c, 0, 0, W, fy, [[0, '#4a7a78'], [.6, '#5e8e88'], [1, '#4a706c']]); tex(c, r, 0, 0, W, fy, '#5a8a84', 3000, { al: .1, ang: Math.PI / 2 });
    vg(c, 0, 820, W, fy - 820, [[0, '#3e625e'], [1, '#2e4a48']]); c.fillStyle = '#8ab0aa'; c.fillRect(0, 812, W, 10); c.fillStyle = '#c8d8d4'; c.fillRect(0, 900, W, 14);
    // ceiling panels + light
    vg(c, 0, 0, W, 130, [[0, '#9ab0ae'], [1, '#7a9894']]); for (const x of [400, 1300, 2100]) { c.fillStyle = '#f4fcff'; c.fillRect(x - 160, 40, 320, 40); gl(c, x, 80, 600, '210,245,240', .3); cone(c, x, 80, 300, 900, 1200, '210,245,240', .06); }
    // wall services rail behind bed: oxygen outlets, lights
    c.fillStyle = '#c8d4d2'; c.fillRect(60, 560, 1020, 120); c.fillStyle = '#9aaaa8'; c.fillRect(60, 670, 1020, 10);
    for (const [x, col] of [[180, '#f4f4f4'], [260, '#2a2a2a'], [340, '#e8e8e8'], [720, '#3a8ac8'], [800, '#f0c020'], [880, '#3aa04a']]) { c.fillStyle = col; c.beginPath(); c.arc(x, 615, 18, 0, 7); c.fill(); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(x, 615, 6, 0, 7); c.fill(); }
    gl(c, 520, 600, 260, '255,240,210', .25); cone(c, 520, 596, 80, 700, 420, '255,240,210', .12); c.fillStyle = '#fff8e0'; c.fillRect(440, 580, 160, 16);
    // hand gel + sharps bin + clock
    c.fillStyle = '#e0e8e8'; rr(c, 1180, 560, 60, 120, 8); c.fill(); c.fillStyle = '#3a8ac8'; c.fillRect(1186, 600, 48, 30); c.fillStyle = '#f0c020'; c.fillRect(1290, 600, 90, 90); c.fillStyle = '#c82a2a'; c.fillRect(1290, 600, 90, 18);
    c.fillStyle = '#f4f4f0'; c.beginPath(); c.arc(1330, 380, 60, 0, 7); c.fill(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 6; c.stroke(); c.lineWidth = 5; c.beginPath(); c.moveTo(1330, 380); c.lineTo(1330, 338); c.moveTo(1330, 380); c.lineTo(1360, 396); c.stroke();
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; c.fillStyle = '#2a2a2a'; c.fillRect(1330 + Math.cos(a) * 50 - 2, 380 + Math.sin(a) * 50 - 2, 4, 4); }
    // window with night blinds
    const wx = 1600, wy = 280, ww = 600, wh = 480; c.fillStyle = '#d8e4e2'; c.fillRect(wx - 24, wy - 24, ww + 48, wh + 48); city(c, r, wx, wy, ww, wh, { sky: [[0, '#060a18'], [1, '#1a2a44']], stars: 30, haze: 'rgba(80,120,160,.3)', moon: [wx + 480, wy + wh * .78] });
    for (let y = wy; y < wy + wh * .62; y += 22) { vg(c, wx, y, ww, 16, [[0, '#e8eeec'], [1, '#a8b8b4']]); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(wx, y + 16, ww, 2); }
    c.fillStyle = '#c8d4d0'; c.fillRect(wx, wy + wh * .62, ww, 14); c.strokeStyle = '#c0ccc8'; c.lineWidth = 2; c.beginPath(); c.moveTo(wx + 40, wy); c.lineTo(wx + 40, wy + wh * .7); c.stroke();
    c.fillStyle = '#e0e8e6'; c.fillRect(wx - 30, wy + wh + 20, ww + 60, 22); c.fillStyle = '#d8e4e2'; c.fillRect(wx + ww / 2 - 6, wy, 12, wh);
    // floor: lino
    vg(c, 0, fy, W, H - fy, [[0, '#8aa8a2'], [1, '#5a7874']]); tex(c, r, 0, fy, W, H - fy, '#88a6a0', 1800, { al: .12 });
    c.strokeStyle = 'rgba(40,60,58,.25)'; c.lineWidth = 2; for (let y = fy + 30; y < H; y += 30 + (y - fy) * .3) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } c.fillStyle = '#3a5a56'; c.fillRect(0, fy - 4, W, 10);
    // radiator under window
    for (let k = 0; k < 18; k++) { vg(c, wx + 20 + k * 31, 960, 24, 150, [[0, '#e8eeee'], [1, '#a8b6b4']]); } c.fillStyle = '#b8c4c2'; c.fillRect(wx + 14, 1100, 570, 10); shadow(c, wx + 300, fy, 320, 14, .3);
    reflect(c, fy - 4, 150, .2, 6);
    for (const x of [400, 1300, 2100]) { c.save(); c.translate(x, fy + 80); c.scale(1, .16); gl(c, 0, 0, 640, '220,250,245', .28); c.restore(); }
    // stained/aged wall dabs
    for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(${r() < .5 ? '30,60,58' : '200,230,225'},${r.range(.02, .06)})`; c.beginPath(); c.ellipse(r() * W, r.range(140, 900), r.range(30, 140), r.range(20, 80), 0, 0, 7); c.fill(); }
    // curtain rail + curtains
    c.fillStyle = '#c0c8c8'; c.fillRect(0, 140, W, 14); for (let x = 20; x < W; x += 60) { c.fillStyle = '#909a9a'; c.fillRect(x, 154, 6, 18); }
    const curtain = (x0, x1) => { const n = Math.round((x1 - x0) / 34); for (let i = 0; i < n; i++) { const x = x0 + i * (x1 - x0) / n, w = (x1 - x0) / n; const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#2a7a8a'); g.addColorStop(.5, '#5ab0b8'); g.addColorStop(1, '#1e5a66'); c.fillStyle = g; c.fillRect(x, 170, w + 1, fy - 200); }
      c.fillStyle = 'rgba(255,255,255,.1)'; for (let y = 240; y < fy - 40; y += 90) c.fillRect(x0, y, x1 - x0, 30); vg(c, x0, 170, x1 - x0, 100, [[0, 'rgba(240,250,250,.6)'], [1, 'rgba(240,250,250,0)']]); };
    curtain(0, 120); curtain(2380, W);
    // IV pole
    c.fillStyle = '#b8c0c4'; c.fillRect(76, 380, 8, fy - 380); c.fillRect(30, 380, 100, 6); shadow(c, 80, fy, 90, 12); for (const dx of [-50, -20, 20, 50]) { c.fillStyle = '#333'; c.beginPath(); c.arc(80 + dx, fy - 8, 8, 0, 7); c.fill(); }
    c.fillStyle = 'rgba(230,245,250,.75)'; rr(c, 40, 420, 72, 140, 14); c.fill(); c.fillStyle = 'rgba(180,220,230,.6)'; c.fillRect(46, 480, 60, 74); c.strokeStyle = 'rgba(230,240,245,.8)'; c.lineWidth = 3; c.beginPath(); c.moveTo(76, 560); c.quadraticCurveTo(120, 800, 260, 960); c.stroke();
    // bed
    shadow(c, 520, fy, 460, 30, .5); c.fillStyle = '#5a6468'; c.fillRect(180, mt + 90, 680, 22); for (const x of [190, 840]) { c.fillStyle = '#4a5054'; c.fillRect(x, mt + 100, 16, fy - mt - 120); c.fillStyle = '#222'; c.beginPath(); c.arc(x + 8, fy - 14, 16, 0, 7); c.fill(); }
    c.fillStyle = '#3a8ac8'; c.fillRect(380, mt + 100, 240, 40); c.fillStyle = '#d8e0e2'; rr(c, 120, 740, 36, mt + 90 - 740, 14); c.fill(); rr(c, 880, 860, 30, mt + 90 - 860, 12); c.fill();
    c.fillStyle = '#a8b4b8'; c.fillRect(260, 920, 300, 10); for (let x = 280; x < 560; x += 40) c.fillRect(x, 920, 6, 70);
    let g = c.createLinearGradient(0, mt, 0, mt + 90); g.addColorStop(0, '#f8fcfc'); g.addColorStop(1, '#b8c8cc'); c.fillStyle = g; rr(c, 150, mt, 740, 92, 20); c.fill();
    g = c.createLinearGradient(0, mt - 80, 0, mt + 6); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#c8d8dc'); c.fillStyle = g; c.beginPath(); c.ellipse(260, mt - 26, 110, 46, -.05, 0, 7); c.fill();
    c.fillStyle = '#d0dce0'; poly(c, [[380, mt + 4], [890, mt + 4], [880, mt + 120], [370, mt + 130]]); c.fill(); c.strokeStyle = 'rgba(120,150,160,.4)'; c.lineWidth = 3; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(400 + i * 80, mt + 10); c.quadraticCurveTo(420 + i * 80, mt + 70, 390 + i * 82, mt + 125); c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(380, mt + 2, 510, 5);
    // heart monitor on stand
    const mx = 1010; shadow(c, mx, fy, 90, 12); c.fillStyle = '#6a7478'; c.fillRect(mx - 5, 760, 10, fy - 760); for (const dx of [-50, -18, 18, 50]) { c.fillStyle = '#333'; c.beginPath(); c.arc(mx + dx, fy - 8, 8, 0, 7); c.fill(); } c.fillRect(mx - 55, fy - 22, 110, 8);
    c.fillStyle = '#2a3034'; rr(c, mx - 90, 630, 180, 140, 12); c.fill(); c.fillStyle = '#05100c'; c.fillRect(mx - 78, 642, 156, 108); gl(c, mx, 696, 220, '60,255,140', .22);
    c.strokeStyle = '#4aff8a'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x <= 150; x += 3) { const k = x % 50, y = k > 20 && k < 24 ? -30 : k > 24 && k < 28 ? 16 : 0; x ? c.lineTo(mx - 75 + x, 670 + y) : c.moveTo(mx - 75, 670); } c.stroke();
    c.strokeStyle = '#4ac8ff'; c.lineWidth = 2; c.beginPath(); for (let x = 0; x <= 150; x += 3) { const y = Math.sin(x * .12) * 8; x ? c.lineTo(mx - 75 + x, 712 + y) : c.moveTo(mx - 75, 712); } c.stroke();
    txt(c, '72', mx + 52, 734, 22, '#4aff8a'); txt(c, '98', mx - 50, 734, 18, '#4ac8ff');
    // cool wash
    gl(c, 1700, 520, 700, '120,170,230', .12); c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(150,230,220,.3)'], [1, 'rgba(20,60,70,.35)']]); c.restore();
    done(c, r, W, H, P, { vig: .45 }); },
  // golf_course: sunny desert tournament hole (Arizona style). Grass floor y 1250 (tee box x 500-2060 y 1180-1330). Gallery rope on short white stakes at y ~1330-1390 across full width (stakes ~70 px tall). Grandstand with painted crowd x 1250-2450 y 470-900. Blank leaderboard x 140-760 y 300-640 (panels blank, fill live). Saguaro cacti x 900, 2480. Desert hills horizon y ~620.
  golf_course: (c, r, W, H, P) => { const fy = 1250;
    vg(c, 0, 0, W, 700, [[0, '#2a6ad0'], [.6, '#6aa8e8'], [1, '#c8e0f0']]); gl(c, 2300, 80, 700, '255,250,220', .35);
    c.save(); c.filter = 'blur(6px)'; for (let i = 0; i < 9; i++) { const x = r() * W, y = r.range(60, 260); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(x + k * 40 - 100, y + r.range(-10, 10), r.range(40, 90), r.range(16, 30), 0, 0, 7); c.fill(); } } c.restore();
    // far mountains
    const ridge = (y, amp, col, f) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, 900); for (let x = 0; x <= W; x += 20) c.lineTo(x, y - Math.abs(Math.sin(x * f + y)) * amp - Math.sin(x * f * 3.1) * amp * .25); c.lineTo(W, 900); c.fill(); };
    ridge(560, 160, '#b89aa8', .0021); ridge(610, 110, '#c88a6a', .0034); ridge(660, 60, '#a8704a', .005);
    tex(c, r, 0, 420, W, 300, '#b8805a', 1500, { al: .1, inside: (x, y) => y > 560 });
    // desert floor mid band
    vg(c, 0, 650, W, 300, [[0, '#d8a878'], [1, '#c89060']]); tex(c, r, 0, 650, W, 260, '#d0a070', 2500, { al: .18, len: [20, 60], w: [3, 6] }); for (let i = 0; i < 140; i++) leaves(c, r, r() * W, r.range(670, 900), r.range(10, 30), r.range(6, 14), ['#6a7a40', '#5a6a38', '#8a8a50'], 40, .7);
    // leaderboard
    c.fillStyle = '#4a4e54'; c.fillRect(230, 640, 22, 260); c.fillRect(650, 640, 22, 260);
    c.fillStyle = '#1e4a2a'; c.fillRect(140, 300, 620, 340); c.fillStyle = '#e8e0c8'; c.fillRect(140, 290, 620, 16); c.fillRect(140, 634, 620, 12);
    for (let j = 0; j < 7; j++) { c.fillStyle = '#f4f2e8'; c.fillRect(170, 330 + j * 42, 360, 32); for (let k = 0; k < 4; k++) { c.fillStyle = '#f4f2e8'; c.fillRect(548 + k * 50, 330 + j * 42, 42, 32); } }
    c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(140, 300, 620, 30); shadow(c, 450, 900, 300, 14, .3);
    // grandstand with crowd
    const gx0 = 1250, gx1 = 2450, gt = 470, gb = 900; c.fillStyle = '#e8e8e4'; c.fillRect(gx0 - 20, gt - 40, gx1 - gx0 + 40, 30); c.fillStyle = '#2a5a3a'; c.fillRect(gx0 - 20, gt - 70, gx1 - gx0 + 40, 32);
    for (let x = gx0; x <= gx1; x += 150) { c.fillStyle = '#8a9098'; c.fillRect(x - 4, gt - 40, 8, gb - gt + 40); }
    vg(c, gx0, gt - 10, gx1 - gx0, gb - gt, [[0, '#4a4a50'], [1, '#6a6a70']]);
    for (let y = gt; y < gb - 60; y += 22) { c.fillStyle = 'rgba(200,200,210,.5)'; c.fillRect(gx0, y + 18, gx1 - gx0, 3); }
    c.save(); c.beginPath(); c.rect(gx0, gt - 10, gx1 - gx0, gb - gt - 70); c.clip();
    crowd(c, r, gx0, gx1, gt + 10, gb - 90, { rows: 18, s0: 6, s1: 11, col: '#8a6a50', lit: .4, shirt: ['#e83a3a', '#f4f4f4', '#2a6ad8', '#f0c020', '#3aa04a', '#e87ab0', '#20b8c8', '#1a1a1a', '#f4f4f4'] }); c.restore();
    vg(c, gx0, gb - 70, gx1 - gx0, 70, [[0, '#2a5a3a'], [1, '#1e4a2e']]); c.fillStyle = '#f4f4f0'; c.fillRect(gx0, gb - 70, gx1 - gx0, 6);
    c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(gx0 - 20, gt - 40, gx1 - gx0 + 40, 6); shadow(c, 1850, gb + 10, 700, 20, .3);
    // grass: rough, fairway band, tee
    c.fillStyle = '#5a8a3a'; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 40) c.lineTo(x, 905 + Math.sin(x * .004) * 22 + Math.sin(x * .013) * 8); c.lineTo(W, H); c.fill(); c.save(); c.clip(); vg(c, 0, 860, W, H - 860, [[0, '#6a9440'], [.3, '#54883a'], [1, '#356a2a']]);
    for (let i = 0; i < 10; i++) { c.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)'; poly(c, [[i * 300 - 200, 900], [i * 300 + 100, 900], [i * 420 - 600 + 420, H], [i * 420 - 600, H]]); c.fill(); }
    tex(c, r, 0, 880, W, H - 880, '#4e8a36', 5000, { al: .14, len: [10, 30], w: [2, 5], ang: -Math.PI / 2, angJ: .3 }); c.restore();
    for (const [x, y, rx] of [[640, 900, 90], [1180, 905, 70], [2560, 930, 110]]) { c.fillStyle = '#4a3a2a'; c.fillRect(x - 6, y - rx * .2, 12, rx * .6); leaves(c, r, x, y - rx * .7, rx, rx * .5, ['#7a9a4a', '#8aaa58', '#5a7a3a'], 500, 1, '230,240,160'); shadow(c, x, y + rx * .3, rx, 10, .35); }
    // bunker + cacti + desert edge
    c.fillStyle = '#e8d4a8'; c.beginPath(); c.ellipse(2150, 980, 260, 40, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(160,120,70,.3)'; c.beginPath(); c.ellipse(2150, 970, 240, 24, 0, Math.PI, 7); c.fill();
    const saguaro = (x, base, h) => { const w = h * .12; shadow(c, x + 30, base, w * 2.5, 10, .4); const arm = (ax, ay, dir, ah) => { c.fillStyle = '#3a7a44'; rr(c, ax, ay - w * .4, dir * w * 1.1, w * .8, w * .4); c.fill(); rr(c, ax + dir * w * 1.1 - (dir > 0 ? w * .8 : 0), ay - ah, w * .8, ah, w * .4); c.fill(); };
      arm(x + w / 2, base - h * .45, 1, h * .35); arm(x - w / 2, base - h * .6, -1, h * .3);
      const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#2a5a32'); g.addColorStop(.4, '#5aa060'); g.addColorStop(1, '#1e4a28'); c.fillStyle = g; rr(c, x - w / 2, base - h, w, h, w / 2); c.fill();
      c.strokeStyle = 'rgba(20,50,25,.5)'; c.lineWidth = 2; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(x + k * w * .18, base - h + 8); c.lineTo(x + k * w * .18, base); c.stroke(); } };
    saguaro(900, 900, 300); saguaro(1120, 880, 170); saguaro(2480, 1040, 520); saguaro(60, 1060, 420);
    // tee box
    c.fillStyle = '#5aa040'; c.beginPath(); c.ellipse(1280, 1255, 820, 90, 0, 0, 7); c.fill(); tex(c, r, 460, 1170, 1640, 170, '#62a848', 1500, { al: .2, len: [10, 24], w: [2, 4], ang: -Math.PI / 2, inside: (x, y) => ((x - 1280) / 820) ** 2 + ((y - 1255) / 90) ** 2 < 1 });
    for (const x of [1000, 1560]) { c.fillStyle = '#f4f4f0'; c.beginPath(); c.arc(x, 1250, 14, 0, 7); c.fill(); shadow(c, x, 1262, 20, 4); }
    // gallery rope on stakes
    const ry = 1350; for (let x = 20; x < W + 200; x += 200) { c.fillStyle = '#f4f4f0'; c.fillRect(x - 5, ry - 40, 10, 80); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x + 2, ry - 40, 3, 80); shadow(c, x, ry + 40, 18, 4); }
    c.strokeStyle = '#e8d8a0'; c.lineWidth = 4; c.beginPath(); for (let x = 20; x < W; x += 200) { c.moveTo(x, ry - 34); c.quadraticCurveTo(x + 100, ry - 10, x + 200, ry - 34); } c.stroke();
    // heat haze + sun wash
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,240,200,.35)'], [1, 'rgba(60,90,30,.25)']]); c.restore(); gl(c, 2300, 100, 1200, '255,240,200', .15);
    done(c, r, W, H, P, { vig: .3 }); },
});
})();
