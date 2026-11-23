// Gulf Monarchies A-set background plates. Paint one at a time:
//   node shared/p2/paint.js gulf-monarchies/production/plates_a.js gulf-monarchies/production/plates gulf_night
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

window.PLATES = Object.assign(window.PLATES || {}, {
  // gulf_night: modern Gulf city at night from a rooftop terrace. Terrace floor y 1150-1440, figures stand y ~1250. Glass balustrade top rail y 870 (x 0-2560). Sky clear above y 0-600 for interceptor streaks. Bay water y 830-1000.
  gulf_night: (c, r, W, H, P) => { const hz = 830;
    vg(c, 0, 0, W, hz, [[0, '#050a1e'], [.5, '#0f1a40'], [.85, '#2a2a58'], [1, '#5a3a5a']]);
    for (let i = 0; i < 120; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.1, .45)})`; c.fillRect(r() * W, r() * 380, 2, 2); }
    fog(c, r, 500, hz, '120,90,150', 14, .22);
    city(c, r, 0, 150, W, hz - 150, { stars: 0, cool: .45, haze: 'rgba(150,90,140,.3)', sky: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0)']],
      layers: [{ h: [.15, .6], col: '#161a36', win: '255,205,150', p: .22, ws: 4 }, { h: [.1, .5], col: '#11142c', win: '255,215,160', p: .3, ws: 5 }, { h: [.05, .22], col: '#0b0d20', win: '255,225,170', p: .4, ws: 6 }],
      landmark: (c2, r2, base) => { const tw = (x, w, h, sp, col) => { const top = base - h; c.fillStyle = col; poly(c, [[x, base], [x + w, base], [x + w * .8, top + 40], [x + w / 2, top], [x + w * .2, top + 40]]); c.fill(); c.fillStyle = '#9ad0ff'; c.fillRect(x + w / 2 - 2, top - sp, 4, sp); gl(c, x + w / 2, top - sp, 30, '255,80,60', .8);
          for (let yy = top + 60; yy < base - 10; yy += 14) for (let xx = x + 8; xx < x + w - 8; xx += 10) if (r2() < .45) { c.fillStyle = `rgba(${r2() < .5 ? '190,225,255' : '255,220,170'},${r2.range(.4, .9)})`; c.fillRect(xx, yy, 5, 6); }
          c.strokeStyle = 'rgba(120,200,255,.6)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + w / 2, top); c.lineTo(x + w / 2, base); c.stroke(); };
        tw(560, 120, 560, 70, '#1a2042'); tw(1380, 150, 640, 90, '#182040'); tw(1980, 110, 500, 60, '#1c2246'); tw(880, 90, 420, 40, '#181c3a');
        c.strokeStyle = 'rgba(255,170,90,.7)'; c.lineWidth = 6; c.beginPath(); c.moveTo(1700, base - 300); c.quadraticCurveTo(1760, base - 520, 1830, base - 300); c.stroke(); gl(c, 1765, base - 420, 160, '255,170,90', .25); } });
    sea(c, r, hz, 1000, '#1a1838', '#0a0c1e', '255,200,140', 1400);
    for (let i = 0; i < 60; i++) { const x = r() * W; c.fillStyle = `rgba(${r.pick(['255,200,140', '150,210,255', '255,120,180'])},.35)`; c.fillRect(x, hz + 4, 3, r.range(40, 150)); }
    for (let x = 0; x < W; x += 22) { gl(c, x, 995, 26, '255,200,120', .5); c.fillStyle = '#ffe0a0'; c.fillRect(x - 2, 992, 4, 4); }
    c.fillStyle = '#0a0a16'; c.fillRect(0, 998, W, 10);
    vg(c, 0, 1000, W, 150, [[0, '#1a1622'], [1, '#100e18']]);
    c.fillStyle = 'rgba(140,180,220,.08)'; c.fillRect(0, 880, W, 270); for (let x = 0; x < W; x += 320) { c.fillStyle = '#2a2a34'; c.fillRect(x, 880, 14, 270); c.fillStyle = 'rgba(200,220,255,.12)'; poly(c, [[x + 40, 900], [x + 90, 900], [x + 30, 1130], [x - 20, 1130]]); c.fill(); }
    vg(c, 0, 866, W, 18, [[0, '#9aa4b8'], [1, '#3a3e4a']]);
    vg(c, 0, 1150, W, H - 1150, [[0, '#2a2430'], [1, '#3a2e30']]); persLines(c, 1150, H, 1280, 7, 'rgba(0,0,0,.25)', 2); reflect(c, 1150, 200, .25, 6);
    gl(c, 1280, 1340, 1100, '255,170,100', .22);
    for (const [x, ln] of [[170, 60], [2390, -60]]) { dpalm(c, r, x, 1190, 820, ln, '#1a1410', ['#1a3020', '#14261a', '#22382a'], '255,180,120'); c.fillStyle = '#2a2430'; rr(c, x - 110, 1120, 220, 160, 10); c.fill(); c.fillStyle = 'rgba(255,190,130,.2)'; c.fillRect(x - 110, 1120, 220, 6); }
    for (const x of [470, 2090]) { c.fillStyle = '#1a1418'; c.fillRect(x - 24, 1170, 48, 90); c.fillStyle = '#ffd890'; c.fillRect(x - 16, 1180, 32, 60); gl(c, x, 1210, 240, '255,190,110', .55); shadow(c, x, 1262, 60, 10); }
    c.strokeStyle = '#2a2228'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 60); c.quadraticCurveTo(1280, 160, W, 60); c.stroke(); for (let k = 0; k < 26; k++) { const t = k / 25, x = t * W, y = 60 + 50 * (1 - Math.pow(2 * t - 1, 2)); gl(c, x, y + 8, 40, '255,200,120', .55); c.fillStyle = '#ffe2a8'; c.beginPath(); c.arc(x, y + 8, 5, 0, 7); c.fill(); }
    done(c, r, W, H, P, { vig: .5 }); },

  // palace_terrace: white marble palace terrace, golden hour. Floor y 1120-1440, figures y ~1250. Arcade of 5 pointed arches (openings x 60-460, 580-980, 1080-1480, 1580-1980, 2100-2500; outer two have mashrabiya screens), sea horizon y 760, sun x 1830 y 640. Fountains x 230 and 2330 (low).
  palace_terrace: (c, r, W, H, P) => { const hz = 760, fy = 1120;
    vg(c, 0, 0, W, hz, [[0, '#5a7aa8'], [.45, '#e0b48a'], [.85, '#ffcf8a'], [1, '#ffe0a8']]); gl(c, 1830, 640, 800, '255,200,120', .55); gl(c, 1830, 640, 90, '255,248,220', .95);
    ENV.clouds(c, r, W, 120, 460, 7, '#ffe0b8', '#d8a890', '#9a8aa0');
    sea(c, r, hz, 960, '#5a8aa0', '#2a6a80', '255,220,150', 1000, 1830);
    vg(c, 0, 900, W, 60, [[0, 'rgba(240,210,170,0)'], [1, 'rgba(240,210,170,.6)']]);
    for (const [x, h, l] of [[300, 520, 40], [760, 600, -30], [1300, 480, 50], [2200, 560, -40]]) dpalm(c, r, x, 990, h, l, '#4a3422', ['#4a6a2a', '#3a5a24', '#6a7a3a'], '255,200,120');
    vg(c, 0, 960, W, 60, [[0, '#f4e8d0'], [1, '#c8b49a']]);
    for (let x = 10; x < W; x += 46) { c.fillStyle = '#f2e6d0'; rr(c, x, 900, 26, 62, 10); c.fill(); c.fillStyle = 'rgba(120,80,50,.25)'; c.fillRect(x + 18, 900, 8, 62); } c.fillStyle = '#f6ecda'; c.fillRect(0, 890, W, 16); vg(c, 0, 1018, W, fy - 1018, [[0, '#d8c8ac'], [1, '#eadcc4']]); persLines(c, 1018, fy, 1280, 12, 'rgba(120,90,60,.15)', 1.5);
    const t = document.createElement('canvas'); t.width = W; t.height = H; const tc = t.getContext('2d');
    const wg = tc.createLinearGradient(0, 0, 0, fy); wg.addColorStop(0, '#d8c8b0'); wg.addColorStop(.5, '#f2e8d8'); wg.addColorStop(1, '#e0d0b8'); tc.fillStyle = wg; tc.fillRect(0, 0, W, fy);
    tc.globalCompositeOperation = 'destination-out'; const arches = [[60, 400], [580, 400], [1080, 400], [1580, 400], [2100, 400]];
    for (const [ax, aw] of arches) { archPath(tc, ax, 230, aw, fy - 230, true); tc.fill(); } c.drawImage(t, 0, 0);
    tex(c, r, 0, 0, W, fy, '#ece0cc', 2500, { al: .1, inside: (x, y) => !arches.some(([ax, aw]) => x > ax - 10 && x < ax + aw + 10 && y > 200) });
    for (const [ax, aw] of arches) { c.strokeStyle = '#c8a870'; c.lineWidth = 10; archPath(c, ax - 8, 222, aw + 16, fy - 222, true); c.stroke(); c.strokeStyle = 'rgba(255,240,210,.8)'; c.lineWidth = 3; archPath(c, ax - 20, 210, aw + 40, fy - 210, true); c.stroke();
      c.fillStyle = 'rgba(90,60,40,.18)'; c.fillRect(ax + aw + 6, 400, 26, fy - 400); }
    c.fillStyle = '#f4ead8'; c.fillRect(0, 0, W, 90); c.fillStyle = '#c8a870'; c.fillRect(0, 90, W, 26); for (let x = 0; x < W; x += 60) { c.fillStyle = '#8a6a3a'; c.beginPath(); c.moveTo(x, 103); c.lineTo(x + 30, 92); c.lineTo(x + 60, 103); c.lineTo(x + 30, 114); c.fill(); }
    c.save(); archPath(c, 60, 230, 400, fy - 230, true); c.clip(); lattice(c, 60, 180, 400, 560, '#9a6a3a', 46); c.restore(); c.save(); archPath(c, 2100, 230, 400, fy - 230, true); c.clip(); lattice(c, 2100, 180, 400, 560, '#9a6a3a', 46); c.restore();
    for (const x of [520, 1030, 1530, 2040]) { c.fillStyle = '#6a4a20'; c.fillRect(x - 3, 130, 6, 140); c.fillStyle = '#e8b050'; poly(c, [[x - 20, 270], [x + 20, 270], [x + 14, 330], [x - 14, 330]]); c.fill(); gl(c, x, 300, 140, '255,200,120', .45); }
    c.save(); c.globalCompositeOperation = 'screen'; for (const [ax, aw] of arches) { c.fillStyle = 'rgba(255,190,110,.07)'; poly(c, [[ax, fy], [ax + aw, fy], [ax + aw - 380, H], [ax - 520, H]]); c.fill(); } c.restore();
    marble(c, r, fy, H, '#eadcc4', 260, 1280); reflect(c, fy, 220, .3, 5);
    c.save(); c.globalCompositeOperation = 'multiply'; for (const [ax, aw] of arches) { c.fillStyle = 'rgba(215,190,160,.45)'; poly(c, [[ax + aw, fy], [ax + aw + 100, fy], [ax + aw - 300, H], [ax + aw - 480, H]]); c.fill(); } c.restore();
    for (const x of [230, 2330]) { shadow(c, x, 1300, 220, 26); c.fillStyle = '#d8ccb4'; c.fillRect(x - 200, 1255, 400, 45); c.fillStyle = '#eee2cc'; c.beginPath(); c.ellipse(x, 1300, 200, 40, 0, 0, Math.PI); c.fill(); c.beginPath(); c.ellipse(x, 1255, 200, 40, 0, 0, 7); c.fill(); c.fillStyle = '#3a8aa0'; c.beginPath(); c.ellipse(x, 1252, 176, 30, 0, 0, 7); c.fill();
      c.fillStyle = '#e8dcc6'; c.fillRect(x - 16, 1120, 32, 136); c.beginPath(); c.ellipse(x, 1124, 70, 16, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(220,240,255,.7)'; c.lineWidth = 3; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(x, 1090); c.quadraticCurveTo(x + k * 22, 1060, x + k * 30, 1124); c.stroke(); } gl(c, x, 1080, 60, '255,255,255', .6); }
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,170,90,.2)'], [1, 'rgba(255,210,140,.35)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // map: MENA parchment map, no borders, no text. Projection x = (lon-4)*42.67, y = (42.5-lat)*42.67. Centres (x,y): Egypt 1040,800 | Libya 600,780 | Tunisia 380,420 | Iraq 1800,560 | Iran 2200,560 | Saudi Arabia 1830,950 | Kuwait 1950,750 | Bahrain 2050,920 | Qatar 2100,970 | UAE 2240,1030 | Oman 2440,1100 (Dhofar ~2280,1280) | Yemen 2000,1300 | Mecca 1520,1110 | Strait of Hormuz 2350,920.
  map: (c, r, W, H, P) => { const X = lon => (lon - 4) * 42.67, Y = lat => (42.5 - lat) * 42.67;
    vg(c, 0, 0, W, H, [[0, '#3e8a8a'], [1, '#2e7a80']]); tex(c, r, 0, 0, W, H, '#3a8686', 5000, { al: .12 });
    for (let i = 0; i < 40; i++) gl(c, r() * W, r() * H, r.range(200, 600), '200,240,230', .06);
    const shapes = []; for (const [name, rings] of Object.entries(window.WORLD50)) for (const ring of rings) { let inb = false; for (let k = 0; k < ring.length; k += 2) if (ring[k] > -15 && ring[k] < 80 && ring[k + 1] > 0 && ring[k + 1] < 55) { inb = true; break; } if (inb) shapes.push([name, ring]); }
    const path = (cc, ring) => { cc.beginPath(); for (let k = 0; k < ring.length; k += 2) { const x = X(ring[k]), y = Y(ring[k + 1]); k ? cc.lineTo(x, y) : cc.moveTo(x, y); } cc.closePath(); };
    c.save(); c.filter = 'blur(18px)'; c.strokeStyle = 'rgba(150,220,210,.5)'; c.lineWidth = 50; for (const [, ring] of shapes) { path(c, ring); c.stroke(); } c.restore();
    const tints = { 'Saudi Arabia': '#e6cf9c', Iran: '#d8c49a', Iraq: '#dcc89a', Egypt: '#e8d2a0', Libya: '#e4cc98', Oman: '#e0c898', Yemen: '#dcc49a', 'United Arab Emirates': '#e2cc9c', Qatar: '#e4cc9e', Kuwait: '#dec89a', Bahrain: '#e0ca9c' };
    for (const [n, ring] of shapes) { c.fillStyle = tints[n] || '#e0cca0'; c.strokeStyle = tints[n] || '#e0cca0'; c.lineWidth = 2; path(c, ring); c.fill(); c.stroke(); }
    const land = document.createElement('canvas'); land.width = W; land.height = H; const lc = land.getContext('2d'); lc.fillStyle = '#000'; for (const [, ring] of shapes) { path(lc, ring); lc.fill(); }
    const ld = lc.getImageData(0, 0, W, H).data, isLand = (x, y) => x >= 0 && y >= 0 && x < W && y < H && ld[((y | 0) * W + (x | 0)) * 4 + 3] > 0;
    tex(c, r, 0, 0, W, H, '#dcc494', 9000, { inside: isLand, al: .18, len: [20, 70] });
    for (let i = 0; i < 900; i++) { const x = r() * W, y = r() * H; if (!isLand(x, y)) continue; c.fillStyle = `rgba(150,110,60,${r.range(.04, .1)})`; c.beginPath(); c.ellipse(x, y, r.range(20, 70), r.range(8, 20), r.range(-.4, .4), 0, 7); c.fill(); }
    const mtn = (x0, y0, x1, y1, n) => { c.strokeStyle = 'rgba(90,60,30,.5)'; c.lineWidth = 3; for (let i = 0; i < n; i++) { const t = i / n, x = x0 + (x1 - x0) * t + r.gauss() * 20, y = y0 + (y1 - y0) * t + r.gauss() * 20; if (!isLand(x, y)) continue; c.beginPath(); c.moveTo(x - 14, y + 8); c.lineTo(x, y - 10); c.lineTo(x + 14, y + 8); c.stroke(); } };
    mtn(1790, 360, 2380, 860, 60); mtn(1380, 820, 1720, 1320, 40); mtn(2330, 1010, 2500, 1110, 14); mtn(1960, 1240, 2130, 1300, 10); mtn(160, 420, 420, 430, 14);
    const ink = document.createElement('canvas'); ink.width = W; ink.height = H; const ic = ink.getContext('2d'); ic.strokeStyle = '#3a2814'; ic.lineWidth = 7; ic.lineJoin = 'round'; for (const [, ring] of shapes) { path(ic, ring); ic.stroke(); }
    ic.globalCompositeOperation = 'destination-out'; ic.strokeStyle = '#000'; ic.lineWidth = 1.5; for (const [, ring] of shapes) { path(ic, ring); ic.fill(); ic.stroke(); } c.drawImage(ink, 0, 0);
    const river = pts => { c.strokeStyle = 'rgba(50,120,130,.8)'; c.lineWidth = 4; c.beginPath(); pts.forEach(([lo, la], i) => i ? c.lineTo(X(lo), Y(la)) : c.moveTo(X(lo), Y(la))); c.stroke(); };
    river([[31.2, 30.1], [31.3, 28], [30.8, 26.5], [32.8, 25.5], [32.9, 24], [32.6, 22], [31, 21], [30.5, 19.5], [32.5, 15.6]]); river([[31, 31.5], [31.2, 30.1]]); river([[30.3, 31.4], [31.2, 30.1]]);
    river([[38.5, 37.5], [40.1, 35.3], [41.3, 34.4], [43.3, 33.4], [44.6, 32], [46.3, 31], [47.5, 30.8], [48.3, 30]]); river([[42.6, 37.1], [43.1, 36.3], [43.6, 34.8], [44.4, 33.3], [45.6, 32.3], [47.2, 31.4], [47.5, 30.8]]);
    c.strokeStyle = 'rgba(40,30,20,.12)'; c.lineWidth = 2; c.setLineDash([10, 12]); for (let lo = 10; lo < 65; lo += 10) { c.beginPath(); c.moveTo(X(lo), 0); c.lineTo(X(lo), H); c.stroke(); } for (let la = 10; la < 43; la += 10) { c.beginPath(); c.moveTo(0, Y(la)); c.lineTo(W, Y(la)); c.stroke(); } c.setLineDash([]);
    const cx = 330, cy = 1200; c.fillStyle = 'rgba(240,225,190,.85)'; c.beginPath(); c.arc(cx, cy, 120, 0, 7); c.fill(); c.strokeStyle = '#3a2814'; c.lineWidth = 3; c.beginPath(); c.arc(cx, cy, 120, 0, 7); c.stroke(); c.beginPath(); c.arc(cx, cy, 100, 0, 7); c.stroke();
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, L = k % 2 ? 60 : 110; c.fillStyle = k % 4 === 0 ? '#8a2a1a' : '#3a2814'; poly(c, [[cx + Math.cos(a) * L, cy + Math.sin(a) * L], [cx + Math.cos(a + 1.3) * 16, cy + Math.sin(a + 1.3) * 16], [cx, cy], [cx + Math.cos(a - 1.3) * 16, cy + Math.sin(a - 1.3) * 16]]); c.fill(); }
    c.strokeStyle = 'rgba(220,250,240,.25)'; c.lineWidth = 3; for (let i = 0; i < 160; i++) { const x = r() * W, y = r() * H; if (isLand(x, y) || isLand(x + 40, y) || isLand(x, y + 30) || isLand(x, y - 30)) continue; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 10, y - 8, x + 20, y); c.quadraticCurveTo(x + 30, y + 8, x + 40, y); c.stroke(); }
    c.save(); c.globalCompositeOperation = 'multiply'; const eg = c.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, W * .62); eg.addColorStop(0, 'rgba(255,255,255,1)'); eg.addColorStop(1, 'rgba(150,100,50,1)'); c.fillStyle = eg; c.fillRect(0, 0, W, H); c.restore();
    c.strokeStyle = '#3a2814'; c.lineWidth = 6; c.strokeRect(30, 30, W - 60, H - 60); c.lineWidth = 2; c.strokeRect(46, 46, W - 92, H - 92);
    done(c, r, W, H, P, { vig: .35, n: 50000 }); },

  // pearl_coast: early-1800s Gulf coast, hot haze. Beach/jetty floor y 1260 (sand y 1070-1440). Jetty x 1720-2560 deck top y 1180 (posts below). Dhows on sea x ~760, 1180, 1500, 2150. Wind tower x 300-450. Sun x 1900 y 220.
  pearl_coast: (c, r, W, H, P) => { const hz = 640;
    vg(c, 0, 0, W, hz, [[0, '#8ab8d0'], [.6, '#d8e0d0'], [1, '#f4ecd0']]); gl(c, 1900, 220, 900, '255,245,210', .5); gl(c, 1900, 220, 110, '255,255,240', .95);
    ENV.clouds(c, r, W, 200, 520, 5, '#fffaf0', '#eae0d0', '#c8c8c0', { scale: .8 });
    sea(c, r, hz, 1080, '#6ac0c0', '#2ac8c0', '255,255,240', 1500, 1900);
    vg(c, 0, 940, W, 140, [[0, 'rgba(120,230,210,0)'], [1, 'rgba(160,240,220,.75)']]);
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const y = r.range(1000, 1075), x = r() * W; c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(80, 300), y + r.range(-3, 3)); c.stroke(); } c.restore();
    dhow(c, r, 760, 900, 300, 1); dhow(c, r, 1500, 760, 180, -1, '#e6dcc0'); dhow(c, r, 2150, 820, 240, 1, '#f0e4c8', '#5a3a20'); dhow(c, r, 1180, 700, 90, 1, '#e0d8c8');
    vg(c, 0, 1060, W, H - 1060, [[0, '#e8d0a0'], [1, '#d8b47c']]); tex(c, r, 0, 1060, W, H - 1060, '#dcc090', 4000, { len: [20, 60] }); ENV.pebbles(c, r, W, 1080, H, 300, '#b09070', '#f0e0c0');
    c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.moveTo(0, 1070); for (let x = 0; x <= W; x += 40) c.lineTo(x, 1066 + Math.sin(x * .02) * 6); c.lineTo(W, 1080); c.lineTo(0, 1080); c.fill();
    mudHouse(c, r, -20, 1070, 300, 230, '#c8a070'); windTower(c, r, 300, 1070, 150, 520, '#c09868'); mudHouse(c, r, 520, 1075, 260, 180, '#d0aa78'); mudHouse(c, r, 140, 1090, 220, 140, '#c49a6a', { cren: false });
    dpalm(c, r, 820, 1070, 520, 40, '#5a4028', ['#5a7a30', '#4a6a28', '#7a8a40'], '255,250,200'); dpalm(c, r, 60, 1080, 640, 70, '#5a4028', ['#5a7a30', '#4a6a28', '#7a8a40'], '255,250,200');
    for (const x of [640, 880]) { c.fillStyle = '#8a5a30'; c.beginPath(); c.ellipse(x, 1110, 40, 46, 0, 0, 7); c.fill(); c.fillStyle = '#6a4220'; c.fillRect(x - 16, 1060, 32, 14); }
    for (let x = 1760; x < W; x += 140) { c.fillStyle = '#4a3018'; c.fillRect(x, 1190, 22, 250); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x + 16, 1190, 6, 250); }
    vg(c, 1720, 1180, W - 1720, 40, [[0, '#a07a50'], [1, '#6a4a2a']]); for (let x = 1720; x < W; x += 36) { c.fillStyle = P2.rgb(P2.shade(P2.jitter('#9a7248', r, 16), r.range(-.1, .1))); c.fillRect(x, 1180, 32, 30); } c.fillStyle = '#3a2412'; c.fillRect(1720, 1210, W - 1720, 14);
    c.fillStyle = '#3a2412'; c.fillRect(1740, 1060, 18, 130); c.fillRect(2460, 1060, 18, 130); c.strokeStyle = '#8a6a40'; c.lineWidth = 6; c.beginPath(); c.moveTo(1748, 1066); c.lineTo(2470, 1066); c.stroke();
    c.strokeStyle = '#a88a5a'; c.lineWidth = 6; for (let k = 0; k < 5; k++) { c.beginPath(); c.ellipse(2330, 1176, 50 - k * 8, 14 - k * 2, 0, 0, 7); c.stroke(); }
    for (let f = 0; f < 6; f++) { const a = .25 + f * .16, L = 700 - f * 50, sx = -40, sy = -60; c.lineCap = 'round'; for (let k = 1; k < 26; k++) { const t = k / 26, px = sx + Math.cos(a) * L * t, py = sy + Math.sin(a) * L * t + t * t * 120, ll = (1 - t) * 110; for (const sd of [-1, 1]) { c.strokeStyle = P2.rgb(P2.shade('#3a5a22', r.range(-.2, .05))); c.lineWidth = 9; c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(a + sd * 1.1) * ll, py + Math.sin(a + sd * 1.1) * ll + ll * .4); c.stroke(); } } }
    c.save(); c.globalCompositeOperation = 'screen'; vg(c, 0, 0, W, H, [[0, 'rgba(255,240,200,.18)'], [.6, 'rgba(255,240,200,.05)'], [1, 'rgba(0,0,0,0)']]); c.restore();
    done(c, r, W, H, P, { vig: .35 }); },

  // fort_town: mud-brick fort courtyard. Floor y 1120-1440, figures y ~1250. Carved arched door x 1100-1460 y 460-1120. Watchtower x 1880-2260 top y 100. Palm x 380. Clay pots x 560, 640, 2020.
  fort_town: (c, r, W, H, P) => { const fy = 1120, wall = '#c49a68';
    vg(c, 0, 0, W, 500, [[0, '#5a90c8'], [1, '#c8dce8']]); gl(c, 400, 120, 600, '255,250,230', .4); ENV.birds(c, r, 600, 1600, 80, 260, 8, '#2a2a30', 2);
    ENV.box(c, r, 0, 330, W, fy - 330, wall, { density: 100, top: .12, bot: -.22 }); tex(c, r, 0, 330, W, fy - 330, wall, 5000, { al: .14, len: [20, 70] });
    for (let x = 0; x < W; x += 80) { ENV.box(c, r, x + 4, 270, 50, 70, '#c8a070', { density: 10 }); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x + 44, 270, 10, 70); }
    c.fillStyle = 'rgba(80,50,30,.2)'; c.fillRect(0, 330, W, 18); for (let k = 0; k < 24; k++) { c.fillStyle = '#5a3a1e'; c.fillRect(r() * W, r.range(380, 420), 24, 9); }
    for (let i = 0; i < 70; i++) { const x = r() * W, y = r.range(400, fy); c.strokeStyle = `rgba(90,60,30,${r.range(.08, .2)})`; c.lineWidth = r.range(2, 4); c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(-30, 30), y + r.range(20, 90)); c.stroke(); }
    for (const x of [260, 900, 1700]) { c.fillStyle = '#5a3a1e'; c.fillRect(x, 360, 60, 14); c.fillStyle = 'rgba(80,50,30,.18)'; c.fillRect(x + 40, 374, 18, 400); }
    dpalm(c, r, 380, 1130, 1000, 80, '#5a4028', ['#5a7a30', '#4a6a28', '#7a8a40'], '255,250,210');
    const tx = 1880, tw = 380; ENV.box(c, r, tx, 160, tw, fy - 160, '#c09464', { density: 70, top: .16, bot: -.2 }); hg(c, tx, 160, tw, fy - 160, [[0, 'rgba(255,240,200,.12)'], [.6, 'rgba(0,0,0,0)'], [1, 'rgba(60,30,10,.35)']]);
    for (let x = tx - 10; x < tx + tw; x += 64) { ENV.box(c, r, x, 100, 44, 70, '#c49a68', { density: 8 }); } c.fillStyle = '#b08a5a'; c.fillRect(tx - 20, 160, tw + 40, 20);
    for (const y of [300, 520, 740]) { c.fillStyle = '#2a1a10'; c.fillRect(tx + tw / 2 - 12, y, 24, 70); c.fillRect(tx + 60, y + 20, 14, 40); c.fillRect(tx + tw - 74, y + 20, 14, 40); }
    for (let k = 0; k < 5; k++) { c.fillStyle = '#5a3a1e'; c.fillRect(tx - 14 + k * 90, 200, 26, 10); }
    const dx = 1100, dw = 360, dy = 460; c.fillStyle = '#a8805a'; archPath(c, dx - 40, dy - 40, dw + 80, fy - dy + 40); c.fill(); c.fillStyle = '#2a1a0c'; archPath(c, dx, dy, dw, fy - dy); c.fill();
    c.save(); archPath(c, dx + 10, dy + 10, dw - 20, fy - dy - 10); c.clip(); const dg = c.createLinearGradient(dx, 0, dx + dw, 0); dg.addColorStop(0, '#5a3418'); dg.addColorStop(.5, '#8a5a2a'); dg.addColorStop(1, '#4a2a12'); c.fillStyle = dg; c.fillRect(dx, dy, dw, fy - dy);
    c.fillStyle = '#2a1a0c'; c.fillRect(dx + dw / 2 - 4, dy, 8, fy - dy); for (let y = dy + 220; y < fy - 40; y += 120) for (let k = 0; k < 2; k++) { const px = dx + 26 + k * dw / 2; c.strokeStyle = '#3a200c'; c.lineWidth = 5; c.strokeRect(px, y, dw / 2 - 52, 96); c.strokeStyle = '#a87a40'; c.lineWidth = 2; c.beginPath(); c.moveTo(px + 10, y + 48); c.lineTo(px + (dw / 2 - 52) / 2, y + 10); c.lineTo(px + dw / 2 - 62, y + 48); c.lineTo(px + (dw / 2 - 52) / 2, y + 86); c.closePath(); c.stroke(); }
    for (let y = dy + 200; y < fy; y += 40) for (let x = dx + 16; x < dx + dw; x += 44) { c.fillStyle = '#c8a050'; c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill(); } c.restore();
    c.fillStyle = '#c8a050'; c.beginPath(); c.arc(dx + dw / 2 + 30, 820, 14, 0, 7); c.fill();
    vg(c, 0, fy, W, H - fy, [[0, '#c8a070'], [1, '#e0c090']]); tex(c, r, 0, fy, W, H - fy, '#d8b480', 4000, { len: [30, 100] }); ENV.pebbles(c, r, W, fy, H, 250, '#a08060', '#f0dcb0');
    c.fillStyle = 'rgba(70,40,20,.28)'; c.fillRect(0, fy, W, 40); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(200,160,130,.6)'; poly(c, [[tx, fy], [tx + tw, fy], [tx + tw - 500, H], [tx - 600, H]]); c.fill(); c.restore();
    for (const [x, s] of [[560, 1.2], [640, .9], [2020, 1.3]]) ENV.pot(c, r, x, fy + 10, s * 1.4, '#a8603a');
    c.strokeStyle = '#6a4a28'; c.lineWidth = 8; for (const x of [820, 900]) { c.beginPath(); c.moveTo(x, 600); c.lineTo(x + 40, fy); c.stroke(); } for (let y = 640; y < fy; y += 60) { c.beginPath(); c.moveTo(820 + (y - 600) / 13, y); c.lineTo(900 + (y - 600) / 13, y); c.stroke(); }
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(255,220,160,.35)'], [1, 'rgba(200,140,80,.2)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // treaty_tent: beach with open canvas tent. Floor y 1250. Tent poles x 640 and 1920; canopy y 220-560. Table x 1150-1410 top y 986. Stools: left x 1010, right x 1550, seat top y 1080 (seated hips there). Warship x 1890-2450 on horizon y 712. Rowing boat x 140-640 y ~1150-1260.
  treaty_tent: (c, r, W, H, P) => { const hz = 700;
    vg(c, 0, 0, W, hz, [[0, '#4a8ac8'], [.7, '#a8cce0'], [1, '#e0ecec']]); ENV.clouds(c, r, W, 120, 480, 7, '#ffffff', '#e0e6ee', '#aab4c4');
    sea(c, r, hz, 1000, '#3a90a8', '#4ab8b8', '255,255,240', 1200);
    const sx = 2150, sy = 712; c.fillStyle = '#1a1612'; c.beginPath(); c.moveTo(sx - 260, sy - 50); c.lineTo(sx + 250, sy - 58); c.lineTo(sx + 220, sy); c.lineTo(sx - 230, sy); c.closePath(); c.fill(); c.fillStyle = '#e8dcbc'; c.fillRect(sx - 245, sy - 36, 480, 10); c.fillStyle = '#1a1612'; for (let k = 0; k < 16; k++) c.fillRect(sx - 230 + k * 29, sy - 34, 10, 7);
    c.strokeStyle = '#2a2018'; c.lineWidth = 5; for (const [mx, mh] of [[-150, 360], [0, 420], [150, 330]]) { c.beginPath(); c.moveTo(sx + mx, sy - 55); c.lineTo(sx + mx, sy - 55 - mh); c.stroke(); for (let k = 0; k < 3; k++) { const yy = sy - 120 - k * mh * .28, ww = 110 - k * 22; c.fillStyle = 'rgba(240,232,210,.92)'; c.beginPath(); c.moveTo(sx + mx - ww / 2, yy - 70 + k * 12); c.lineTo(sx + mx + ww / 2, yy - 70 + k * 12); c.quadraticCurveTo(sx + mx + ww / 2 + 8, yy - 20, sx + mx + ww / 2 - 4, yy); c.lineTo(sx + mx - ww / 2 + 4, yy); c.quadraticCurveTo(sx + mx - ww / 2 - 8, yy - 20, sx + mx - ww / 2, yy - 70 + k * 12); c.fill(); } }
    c.lineWidth = 2; c.beginPath(); c.moveTo(sx - 260, sy - 50); c.lineTo(sx - 150, sy - 415); c.lineTo(sx, sy - 475); c.lineTo(sx + 150, sy - 385); c.lineTo(sx + 300, sy - 60); c.stroke(); c.fillStyle = '#b02a2a'; c.fillRect(sx + 150, sy - 395, 40, 22);
    c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(sx - 240, sy + 2, 460, 3);
    vg(c, 0, 990, W, H - 990, [[0, '#e8d4a8'], [1, '#d8bc88']]); tex(c, r, 0, 990, W, H - 990, '#e0c898', 4000, { len: [20, 60] });
    c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.moveTo(0, 995); for (let x = 0; x <= W; x += 40) c.lineTo(x, 990 + Math.sin(x * .013) * 8); c.lineTo(W, 1010); c.lineTo(0, 1010); c.fill(); ENV.pebbles(c, r, W, 1010, H, 220, '#b09878', '#f8ead0');
    c.fillStyle = 'rgba(90,70,40,.3)'; c.beginPath(); c.ellipse(1280, 1180, 760, 120, 0, 0, 7); c.fill();
    rug(c, r, 820, 1100, 920, 120, '#8a2a20', '#2a3a5a');
    const L = 640, R = 1920, top = 220, eave = 520; c.strokeStyle = '#d8c8a0'; c.lineWidth = 3; for (const [ax, ay] of [[L, eave], [R, eave]]) { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + (ax < 1280 ? -260 : 260), 1240); c.stroke(); c.fillStyle = '#5a3a1a'; c.fillRect(ax + (ax < 1280 ? -266 : 254), 1225, 12, 30); }
    const cg = c.createLinearGradient(0, top, 0, eave); cg.addColorStop(0, '#f6eedc'); cg.addColorStop(1, '#d8c8a8'); c.fillStyle = cg; c.beginPath(); c.moveTo(L - 60, eave); c.lineTo(1280, top); c.lineTo(R + 60, eave); c.closePath(); c.fill();
    c.fillStyle = 'rgba(80,60,30,.25)'; for (let k = 0; k < 14; k++) { const x0 = L - 60 + k * (R - L + 120) / 14; c.beginPath(); c.moveTo(1280, top); c.lineTo(x0, eave); c.lineTo(x0 + 40, eave); c.closePath(); c.fill(); }
    c.fillStyle = 'rgba(70,50,30,.35)'; c.beginPath(); c.moveTo(L - 60, eave); c.quadraticCurveTo(1280, eave + 70, R + 60, eave); c.lineTo(R + 60, eave + 20); c.quadraticCurveTo(1280, eave + 120, L - 60, eave + 20); c.fill();
    for (let k = 0; k < 26; k++) { const x = L - 60 + k * (R - L + 120) / 26, w = (R - L + 120) / 26; c.fillStyle = k % 2 ? '#2a3a6a' : '#b8302a'; c.beginPath(); c.moveTo(x, eave); c.lineTo(x + w, eave); c.lineTo(x + w, eave + 30); c.quadraticCurveTo(x + w / 2, eave + 64, x, eave + 30); c.fill(); }
    for (const px of [L, R]) { const g = c.createLinearGradient(px - 12, 0, px + 12, 0); g.addColorStop(0, '#4a3018'); g.addColorStop(.5, '#9a7040'); g.addColorStop(1, '#3a2410'); c.fillStyle = g; c.fillRect(px - 12, eave - 20, 24, 1260 - eave + 20); shadow(c, px, 1262, 60, 10); } c.fillStyle = '#8a6a3a'; c.fillRect(1272, top - 60, 16, 60); c.fillStyle = '#b8302a'; poly(c, [[1288, top - 60], [1360, top - 44], [1288, top - 28]]); c.fill();
    shadow(c, 1280, 1135, 200, 16); c.fillStyle = '#5a3418'; c.fillRect(1170, 1000, 14, 130); c.fillRect(1376, 1000, 14, 130); c.fillStyle = '#7a4a24'; c.fillRect(1150, 986, 260, 22); c.fillStyle = '#efe6d0'; c.fillRect(1160, 978, 240, 10); c.fillStyle = '#e8dcc0'; poly(c, [[1220, 980], [1300, 972], [1330, 982], [1240, 988]]); c.fill(); c.fillStyle = '#2a2418'; c.fillRect(1340, 960, 16, 20);
    for (const x of [1010, 1550]) { shadow(c, x, 1150, 90, 12); c.fillStyle = '#4a2a12'; c.fillRect(x - 60, 1100, 12, 50); c.fillRect(x + 48, 1100, 12, 50); cushion(c, x - 75, 1080, 150, 34, '#2a5a4a'); }
    shadow(c, 400, 1260, 290, 20); c.fillStyle = '#5a3a20'; c.beginPath(); c.moveTo(140, 1150); c.quadraticCurveTo(380, 1270, 640, 1160); c.lineTo(620, 1200); c.quadraticCurveTo(380, 1290, 160, 1190); c.fill(); c.fillStyle = '#d8d0c0'; c.beginPath(); c.moveTo(140, 1150); c.quadraticCurveTo(380, 1200, 640, 1160); c.quadraticCurveTo(380, 1220, 140, 1150); c.fill(); c.strokeStyle = '#8a6a40'; c.lineWidth = 8; c.beginPath(); c.moveTo(260, 1160); c.lineTo(700, 1240); c.stroke();
    done(c, r, W, H, P, { vig: .38 }); },

  // oil_field: desert oil field at sunset. Floor y 1260 (sand y 1000-1440). Big derrick left x 140-560 (top y 120). Pump jack right x 1900-2510. Tanks x 1250-1810 y 820-930. Sea + tankers right x 2050-2580 y 850. Flare x 960 y 640.
  oil_field: (c, r, W, H, P) => { const hz = 880;
    vg(c, 0, 0, W, hz, [[0, '#2a2a5a'], [.4, '#a04a5a'], [.75, '#f08a40'], [1, '#ffc070']]); gl(c, 1600, 820, 900, '255,170,80', .5); c.fillStyle = '#fff0c0'; c.beginPath(); c.arc(1600, 830, 70, 0, 7); c.fill(); gl(c, 1600, 830, 200, '255,230,170', .8);
    ENV.clouds(c, r, W, 140, 560, 6, '#ffb880', '#c06070', '#5a3a5a');
    sea(c, r, hz - 20, 920, '#c07050', '#8a5050', '255,200,120', 300, 1600); c.fillStyle = '#8a5a40'; c.beginPath(); c.moveTo(0, 860); c.quadraticCurveTo(900, 840, 1800, 870); c.lineTo(1800, 930); c.lineTo(0, 930); c.fill();
    for (const [x, L] of [[2050, 280], [2380, 200]]) { c.fillStyle = '#2a1a1e'; c.fillRect(x, 850, L, 22); c.fillRect(x + L * .78, 818, L * .16, 34); c.fillRect(x + L * .85, 790, 8, 30); }
    for (const [y, col] of [[900, '#b06a48'], [960, '#c8804a'], [1030, '#d8985a']]) { c.fillStyle = col; c.beginPath(); c.moveTo(0, y + 40); for (let x = 0; x <= W; x += 40) c.lineTo(x, y + Math.sin(x * .002 + y) * 30 + Math.sin(x * .007) * 12); c.lineTo(W, H); c.lineTo(0, H); c.fill(); }
    vg(c, 0, 1060, W, H - 1060, [[0, '#d8985a'], [1, '#c07a44']]); tex(c, r, 0, 960, W, H - 960, '#d89058', 5000, { len: [40, 120], al: .14 }); for (let i = 0; i < 30; i++) { const y = r.range(1080, H), x = r() * W; c.strokeStyle = 'rgba(255,200,140,.25)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 150, y - 10, x + 300, y + 4); c.stroke(); }
    for (const [x, w, h] of [[1250, 170, 90], [1440, 200, 110], [1660, 150, 80]]) { const y = 930; const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#8a7a7a'); g.addColorStop(.3, '#e8d0b0'); g.addColorStop(1, '#5a4a50'); c.fillStyle = g; c.fillRect(x, y - h, w, h); c.fillStyle = '#c8b4a0'; c.beginPath(); c.ellipse(x + w / 2, y - h, w / 2, 10, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(x, y - k * h / 4); c.lineTo(x + w, y - k * h / 4); c.stroke(); } }
    const derrick = (x, base, h, w, col) => { c.strokeStyle = col; c.lineWidth = Math.max(2, h / 140); const lx = t => x - w / 2 + w * .38 * t, rx = t => x + w / 2 - w * .38 * t; c.beginPath(); c.moveTo(lx(0), base); c.lineTo(lx(1), base - h); c.lineTo(rx(1), base - h); c.lineTo(rx(0), base); c.stroke();
      for (let k = 0; k < 10; k++) { const t0 = k / 10, t1 = (k + 1) / 10; c.beginPath(); c.moveTo(lx(t0), base - h * t0); c.lineTo(rx(t1), base - h * t1); c.moveTo(rx(t0), base - h * t0); c.lineTo(lx(t1), base - h * t1); c.moveTo(lx(t1), base - h * t1); c.lineTo(rx(t1), base - h * t1); c.stroke(); }
      c.fillStyle = col; c.fillRect(x - w * .2, base - h - h * .05, w * .4, h * .05); };
    derrick(780, 940, 260, 90, '#3a2228'); derrick(1100, 920, 180, 60, '#5a3438'); derrick(2220, 935, 200, 70, '#4a2a30');
    c.fillStyle = '#2a1a1e'; c.fillRect(955, 680, 10, 250); gl(c, 960, 650, 260, '255,150,60', .55); c.fillStyle = '#ffb040'; c.beginPath(); c.moveTo(948, 680); c.quadraticCurveTo(940, 640, 962, 590); c.quadraticCurveTo(985, 640, 972, 680); c.fill(); c.fillStyle = '#fff0a0'; c.beginPath(); c.moveTo(954, 680); c.quadraticCurveTo(952, 655, 962, 630); c.quadraticCurveTo(972, 655, 966, 680); c.fill(); ENV.smoke(c, r, 966, 590, 300, '#2a2020', .12);
    for (const y of [1100, 1130]) { vg(c, 0, y, W, 20, [[0, '#6a6060'], [.4, '#c8b0a0'], [1, '#3a2a2a']]); for (let x = 60; x < W; x += 260) { c.fillStyle = '#3a2a2a'; c.fillRect(x, y + 20, 16, 30); c.fillStyle = '#8a7a7a'; c.fillRect(x - 6, y - 3, 28, 26); } }
    derrick(350, 1240, 1120, 420, '#2a1a1c'); c.fillStyle = '#2a1a1c'; c.fillRect(120, 1210, 460, 40); c.strokeStyle = 'rgba(255,170,100,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(556, 1240); c.lineTo(400, 130); c.stroke(); shadow(c, 350, 1250, 320, 30);
    c.strokeStyle = '#1a1214'; c.lineWidth = 4; c.beginPath(); c.moveTo(350, 140); c.lineTo(350, 900); c.stroke(); c.fillStyle = '#3a2a2a'; c.fillRect(330, 880, 40, 50);
    const px = 2280, pb = 1250; shadow(c, px, pb + 4, 280, 24); c.fillStyle = '#2a2224'; c.fillRect(px - 230, pb - 40, 460, 40); c.strokeStyle = '#2a2224'; c.lineWidth = 22; c.beginPath(); c.moveTo(px - 100, pb - 40); c.lineTo(px, pb - 400); c.lineTo(px + 100, pb - 40); c.stroke();
    c.save(); c.translate(px, pb - 400); c.rotate(-.12); c.fillStyle = '#3a3034'; c.fillRect(-300, -26, 520, 52); c.fillStyle = '#c8a040'; c.fillRect(-280, -8, 470, 8); c.fillStyle = '#3a3034'; c.beginPath(); c.moveTo(-300, -70); c.quadraticCurveTo(-380, 0, -300, 70); c.lineTo(-300, -70); c.fill(); c.restore();
    c.strokeStyle = '#1a1416'; c.lineWidth = 6; c.beginPath(); c.moveTo(px - 380, pb - 360); c.lineTo(px - 380, pb - 40); c.stroke(); c.fillStyle = '#4a3a3c'; c.beginPath(); c.arc(px + 160, pb - 150, 70, 0, 7); c.fill(); c.strokeStyle = '#2a2224'; c.lineWidth = 16; c.beginPath(); c.moveTo(px + 160, pb - 150); c.lineTo(px + 200, pb - 360); c.stroke();
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(120,60,140,.3)'], [.6, 'rgba(255,150,70,.35)'], [1, 'rgba(255,120,60,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .45 }); },

  // palace_hall: 1950s royal throne room. Floor y 1150-1440, figures y ~1250. Throne centre x 1280: seat top y 880 (seat x 1150-1410), back top y 560, on dais y 1000-1150 (x 900-1660). Red carpet x 1080-1480 front to dais. Windows x 120-460 and 2100-2440, y 260-1000. Chandeliers x 700, 1860.
  palace_hall: (c, r, W, H, P) => { const fy = 1150;
    vg(c, 0, 0, W, fy, [[0, '#4a2a22'], [.4, '#8a5a3a'], [1, '#6a3a26']]); tex(c, r, 0, 0, W, fy, '#8a5a3a', 3000, { al: .1, ang: Math.PI / 2 });
    for (let x = 0; x < W; x += 320) { c.fillStyle = '#c8a050'; c.fillRect(x - 24, 120, 48, fy - 120); hg(c, x - 24, 120, 48, fy - 120, [[0, 'rgba(0,0,0,.35)'], [.4, 'rgba(255,240,190,.4)'], [1, 'rgba(0,0,0,.4)']]); c.fillStyle = '#e0b860'; c.fillRect(x - 36, 110, 72, 30); c.fillRect(x - 36, fy - 60, 72, 30); }
    for (let x = 40; x < W; x += 320) { if (x < 480 || x > 2060) continue; c.strokeStyle = '#c8a050'; c.lineWidth = 4; c.strokeRect(x + 30, 300, 220, 600); c.fillStyle = 'rgba(150,30,30,.35)'; c.fillRect(x + 40, 310, 200, 580); }
    vg(c, 0, 0, W, 70, [[0, '#2a160e'], [1, '#5a3a22']]); c.fillStyle = '#e0c070'; c.fillRect(0, 70, W, 50); for (let x = 0; x < W; x += 40) { c.fillStyle = '#8a6020'; c.beginPath(); c.arc(x + 20, 95, 10, 0, 7); c.fill(); }
    for (const wx of [120, 2100]) { c.fillStyle = '#e8c870'; c.fillRect(wx - 20, 240, 380, 780); const g = c.createLinearGradient(0, 260, 0, 1000); g.addColorStop(0, '#6a9ad0'); g.addColorStop(1, '#d8e8f0'); c.fillStyle = g; archPath(c, wx, 260, 340, 740); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(230,240,255,.5)'; c.beginPath(); c.ellipse(wx + 40 + r() * 260, r.range(400, 700), 60, 14, 0, 0, 7); c.fill(); }
      c.strokeStyle = '#d8b860'; c.lineWidth = 8; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(wx + k * 340 / 3, 300); c.lineTo(wx + k * 340 / 3, 1000); c.stroke(); } for (let y = 440; y < 1000; y += 140) { c.beginPath(); c.moveTo(wx, y); c.lineTo(wx + 340, y); c.stroke(); }
      for (const sd of [0, 1]) { const cx = sd ? wx + 300 : wx - 60; const g2 = c.createLinearGradient(cx, 0, cx + 120, 0); g2.addColorStop(0, '#5a0e14'); g2.addColorStop(.5, '#a8202a'); g2.addColorStop(1, '#4a0a10'); c.fillStyle = g2; c.beginPath(); c.moveTo(cx, 220); c.lineTo(cx + 120, 220); c.quadraticCurveTo(cx + 60 + (sd ? 30 : -30), 700, cx + 120, 1040); c.lineTo(cx, 1040); c.fill(); }
      c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(200,220,255,.12)'; poly(c, [[wx, 1000], [wx + 340, 1000], [wx + 340 + (wx < 1280 ? 500 : -300), H], [wx + (wx < 1280 ? 200 : -600), H]]); c.fill(); c.restore(); }
    const dg = c.createLinearGradient(1000, 0, 1560, 0); dg.addColorStop(0, '#4a0a10'); dg.addColorStop(.5, '#b02430'); dg.addColorStop(1, '#4a0a10'); c.fillStyle = dg; c.beginPath(); c.moveTo(1000, 160); c.lineTo(1560, 160); c.lineTo(1580, 1010); c.lineTo(980, 1010); c.fill();
    for (let k = 0; k < 12; k++) { const x = 1010 + k * 48; c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x, 170, 14, 840); c.fillStyle = 'rgba(255,200,180,.08)'; c.fillRect(x + 24, 170, 10, 840); }
    c.fillStyle = '#d8b050'; c.beginPath(); c.moveTo(960, 160); c.quadraticCurveTo(1280, 100, 1600, 160); c.lineTo(1600, 200); c.quadraticCurveTo(1280, 140, 960, 200); c.fill();
    marble(c, r, fy, H, '#d8c8a8', 260, 1280);
    for (const [y, w, h] of [[1000, 600, 50], [1050, 680, 50], [1100, 760, 50]]) { vg(c, 1280 - w / 2, y, w, h, [[0, '#e8dcc8'], [1, '#a89880']]); c.fillStyle = '#c8a050'; c.fillRect(1280 - w / 2, y, w, 5); }
    shadow(c, 1280, 1004, 200, 16); const gold = (x, y, w, h) => { const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#6a4a14'); g.addColorStop(.35, '#f8d870'); g.addColorStop(.6, '#c89a30'); g.addColorStop(1, '#5a3a10'); c.fillStyle = g; c.fillRect(x, y, w, h); };
    gold(1160, 560, 240, 360); c.fillStyle = '#c8202a'; rr(c, 1190, 610, 180, 280, 20); c.fill(); c.fillStyle = '#f8d870'; c.beginPath(); c.moveTo(1150, 570); c.quadraticCurveTo(1280, 470, 1410, 570); c.lineTo(1410, 600); c.lineTo(1150, 600); c.fill(); c.beginPath(); c.arc(1280, 500, 22, 0, 7); c.fill();
    gold(1150, 880, 260, 50); c.fillStyle = '#b01c26'; rr(c, 1170, 876, 220, 30, 10); c.fill(); gold(1130, 790, 40, 210); gold(1390, 790, 40, 210); gold(1150, 930, 26, 70); gold(1384, 930, 26, 70); gl(c, 1280, 700, 300, '255,220,140', .25);
    c.fillStyle = '#b81c26'; poly(c, [[1130, 1000], [1430, 1000], [1440, 1150], [1120, 1150]]); c.fill();
    reflect(c, fy, 200, .25, 6); c.fillStyle = '#a8141e'; poly(c, [[1080, fy], [1480, fy], [1620, H], [940, H]]); c.fill(); c.strokeStyle = '#e0b050'; c.lineWidth = 6; c.beginPath(); c.moveTo(1095, fy); c.lineTo(960, H); c.moveTo(1465, fy); c.lineTo(1600, H); c.stroke(); tex(c, r, 940, fy, 680, H - fy, '#a8141e', 800, { inside: (x, y) => Math.abs(x - 1280) < 200 + (y - fy) * .45, len: [10, 40], al: .1 });
    chandelier(c, 700, 260, 1.1); chandelier(c, 1860, 260, 1.1);
    done(c, r, W, H, P, { vig: .5 }); },

  // baghdad: dusk riverside palace, 1958. Road y 1130-1440 (tanks roll along y ~1250). Palace centre x 1280 (x 630-1930): dome top y 230, colonnade y 640-1100. River glint y 900-980. Palms x 260, 640, 1920, 2300. Street lamps x 420, 1080, 1480, 2140.
  baghdad: (c, r, W, H, P) => { const hz = 900;
    vg(c, 0, 0, W, hz, [[0, '#2a2a5a'], [.45, '#8a4a6a'], [.8, '#f0905a'], [1, '#ffc080']]); gl(c, 1980, 760, 700, '255,170,90', .5); ENV.clouds(c, r, W, 140, 500, 6, '#ffb090', '#a05a6a', '#4a3a5a');
    city(c, r, 0, 520, W, 380, { stars: 0, sky: [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0)']], haze: 'rgba(240,140,100,.35)', layers: [{ h: [.15, .35], col: '#5a3a50', win: '255,210,150', p: .12, ws: 5 }, { h: [.1, .28], col: '#4a2e44', win: '255,210,150', p: .18, ws: 6 }] });
    for (const x of [300, 2200]) { c.fillStyle = '#4a2e44'; c.beginPath(); c.arc(x, 820, 60, Math.PI, 0); c.fill(); }
    sea(c, r, hz, 980, '#c8805a', '#5a4058', '255,210,150', 600, 1980);
    for (let i = 0; i < 10; i++) { const x = r() * W; dpalm(c, r, x, 990, r.range(160, 260), r.range(-20, 20), '#2a1a22', ['#2a2a24', '#22241e', '#3a3428']); }
    vg(c, 0, 980, W, 150, [[0, '#6a4a48'], [1, '#4a3238']]);
    const pc = 1280, pw = 1300, pb = 1100, pl = pc - pw / 2; ENV.box(c, r, pl, 640, pw, pb - 640, '#e8d4b8', { density: 60, top: .1, bot: -.3 }); c.save(); c.globalCompositeOperation = 'multiply'; vg(c, pl, 640, pw, pb - 640, [[0, 'rgba(255,190,150,1)'], [1, 'rgba(160,110,120,1)']]); c.restore();
    c.fillStyle = '#f4e4c8'; c.fillRect(pl - 30, 620, pw + 60, 30); for (let x = pl - 30; x < pl + pw + 30; x += 30) { c.fillStyle = '#d8c0a0'; c.fillRect(x, 600, 16, 22); }
    for (let k = 0; k < 11; k++) { const ax = pl + 40 + k * (pw - 80) / 11, aw = (pw - 80) / 11 - 24; c.fillStyle = '#2a1a26'; archPath(c, ax, 720, aw, pb - 720, true); c.fill(); if (r() < .6) { c.fillStyle = 'rgba(255,200,120,.75)'; archPath(c, ax + 10, 760, aw - 20, 200, true); c.fill(); gl(c, ax + aw / 2, 850, 90, '255,190,110', .35); } c.fillStyle = '#f4e4c8'; c.fillRect(ax - 14, 720, 10, pb - 720); }
    ENV.box(c, r, pc - 230, 470, 460, 170, '#e0c8a8', { density: 30, top: .1, bot: -.2 }); for (let k = 0; k < 7; k++) { c.fillStyle = '#3a2430'; archPath(c, pc - 200 + k * 62, 510, 30, 90, true); c.fill(); }
    const dg2 = c.createRadialGradient(pc - 80, 320, 20, pc, 400, 260); dg2.addColorStop(0, '#9ae0d8'); dg2.addColorStop(.5, '#2a8a90'); dg2.addColorStop(1, '#14405a'); c.fillStyle = dg2; c.beginPath(); c.moveTo(pc - 240, 475); c.bezierCurveTo(pc - 260, 300, pc - 60, 260, pc, 230); c.bezierCurveTo(pc + 60, 260, pc + 260, 300, pc + 240, 475); c.fill();
    c.strokeStyle = 'rgba(255,230,160,.35)'; c.lineWidth = 3; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(pc, 232); c.quadraticCurveTo(pc + k * 70, 300, pc + k * 70, 474); c.stroke(); } c.fillStyle = '#e8c060'; c.fillRect(pc - 4, 170, 8, 64); c.beginPath(); c.arc(pc, 176, 12, 0, 7); c.fill();
    for (const x of [pl + 40, pl + pw - 120]) { ENV.box(c, r, x, 520, 80, 130, '#e0c8a8', { density: 10 }); c.fillStyle = '#2a8a90'; c.beginPath(); c.arc(x + 40, 520, 40, Math.PI, 0); c.fill(); }
    gl(c, pc, 900, 900, '255,170,100', .15);
    for (const [x, h, l] of [[260, 760, 40], [640, 640, -30], [1920, 660, 30], [2300, 780, -40]]) dpalm(c, r, x, 1120, h, l, '#2a1a1e', ['#2a3a28', '#22301e', '#3a4a2c'], '255,160,100');
    c.fillStyle = '#c8b8a0'; c.fillRect(0, 1110, W, 22); vg(c, 0, 1132, W, H - 1132, [[0, '#3a3438'], [1, '#2a2428']]); tex(c, r, 0, 1132, W, H - 1132, '#3a3438', 3000, { len: [20, 60], al: .14 }); for (let x = 40; x < W; x += 300) { c.fillStyle = 'rgba(230,220,190,.6)'; c.fillRect(x, 1330, 160, 10); }
    for (const x of [420, 1080, 1480, 2140]) lampPost(c, x, 1120, 520, '255,200,130', .9);
    reflect(c, 1132, 140, .2, 8);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(90,60,140,.35)'], [1, 'rgba(255,150,80,.35)']]); c.restore();
    done(c, r, W, H, P, { vig: .48 }); },

  // desert_border: flat desert border region, daylight. Floor y 1260 (sand y 880-1440). Distant road y 930-965 across; striped barrier boom x 1880-2160 y 902 (post x 1880); guard hut x 2180-2310 y 806-930. Rock outcrops at left (x 0-360) and right (x 2220-2560) edges.
  desert_border: (c, r, W, H, P) => { const hz = 880;
    vg(c, 0, 0, W, hz, [[0, '#4a86c8'], [.7, '#a8c8e0'], [1, '#f0e4cc']]); gl(c, 700, 140, 700, '255,250,230', .35);
    for (const [x, w, h, col] of [[200, 520, 140, '#c09878'], [1100, 340, 90, '#c8a888'], [1600, 600, 160, '#b89070'], [2300, 400, 110, '#c09a7a']]) { c.fillStyle = col; c.beginPath(); c.moveTo(x - w / 2, hz); c.lineTo(x - w * .36, hz - h); c.lineTo(x + w * .3, hz - h * 1.05); c.lineTo(x + w / 2, hz); c.fill(); c.fillStyle = 'rgba(255,240,220,.25)'; c.fillRect(x - w * .36, hz - h, w * .66, 8); }
    vg(c, 0, hz - 80, W, 100, [[0, 'rgba(245,230,210,0)'], [1, 'rgba(245,230,210,.8)']]);
    vg(c, 0, hz, W, H - hz, [[0, '#e8cca0'], [.3, '#dcb884'], [1, '#c89a64']]); tex(c, r, 0, hz, W, H - hz, '#d8b080', 6000, { len: [40, 140] });
    for (let i = 0; i < 60; i++) { const y = hz + Math.pow(r(), .6) * (H - hz), t = (y - hz) / (H - hz); c.strokeStyle = `rgba(150,100,60,${.1 + t * .1})`; c.lineWidth = 1 + t * 3; const x = r() * W, L = 60 + t * 400; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + L / 2, y - 6 - t * 10, x + L, y); c.stroke(); }
    c.fillStyle = '#6a6058'; poly(c, [[0, 935], [W, 925], [W, 962], [0, 968]]); c.fill(); c.fillStyle = 'rgba(240,230,200,.7)'; for (let x = 0; x < W; x += 120) c.fillRect(x, 946, 60, 4); c.fillStyle = '#c8b898'; c.fillRect(0, 966, W, 4);
    c.fillStyle = '#d8d4c8'; c.fillRect(2180, 820, 130, 110); c.fillStyle = '#8a7a6a'; c.fillRect(2170, 806, 150, 18); c.fillStyle = '#4a5a6a'; c.fillRect(2210, 850, 50, 36); c.fillStyle = '#5a5048'; c.fillRect(1870, 880, 22, 60); c.fillStyle = '#3a3430'; c.fillRect(1866, 900, 30, 20);
    for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#f0ece4' : '#c82a2a'; c.fillRect(1880 + k * 35, 902, 35, 14); } c.fillStyle = '#5a5048'; c.fillRect(2160, 900, 10, 40);
    for (let k = 0; k < 14; k++) { const x = 100 + k * 180; c.fillStyle = '#6a5a4a'; c.fillRect(x, 905, 6, 34); }
    const rock = (x, base, w, h, col) => { c.fillStyle = P2.rgb(P2.shade(col, -.2)); c.beginPath(); c.moveTo(x, base); c.lineTo(x + w * .1, base - h * .7); c.lineTo(x + w * .3, base - h); c.lineTo(x + w * .7, base - h * .9); c.lineTo(x + w * .9, base - h * .5); c.lineTo(x + w, base); c.fill(); c.fillStyle = P2.rgb(P2.shade(col, .15)); c.beginPath(); c.moveTo(x + w * .1, base - h * .7); c.lineTo(x + w * .3, base - h); c.lineTo(x + w * .5, base - h * .95); c.lineTo(x + w * .35, base - h * .4); c.fill(); shadow(c, x + w * .6, base, w * .7, 20, .4); };
    rock(-60, 1240, 420, 360, '#a87a58'); rock(2220, 1250, 400, 300, '#a87a58'); rock(380, 1160, 160, 90, '#b08a68'); rock(2050, 1170, 140, 70, '#b08a68');
    ENV.pebbles(c, r, W, 1000, H, 500, '#a08060', '#f0dcb0');
    c.save(); c.globalCompositeOperation = 'screen'; fog(c, r, hz - 30, hz + 60, '255,240,220', 18, .35); c.restore();
    done(c, r, W, H, P, { vig: .35 }); },

  // london_office: 1960s Whitehall-style study. Floor y 1150-1440, figures y ~1250. Desk x 940-1620, top y 950, front to 1180. Chair behind desk x 1150-1410 (back top y 650); seated figure hips ~y 950 at x 1280. Sash window x 220-760 y 200-980. Bookshelves x 1900-2500. Green lamp x 1500 y 840-950.
  london_office: (c, r, W, H, P) => { const fy = 1150;
    vg(c, 0, 0, W, fy, [[0, '#3a2414'], [1, '#5a3a20']]);
    for (let x = 0; x < W; x += 240) { c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x, 0, 8, fy); c.strokeStyle = 'rgba(200,150,90,.25)'; c.lineWidth = 3; c.strokeRect(x + 30, 120, 180, 460); c.strokeRect(x + 30, 680, 180, 380); } tex(c, r, 0, 0, W, fy, '#5a3a20', 4000, { ang: Math.PI / 2, al: .1 });
    c.fillStyle = '#2a180c'; c.fillRect(0, 600, W, 40); c.fillStyle = 'rgba(220,170,100,.3)'; c.fillRect(0, 600, W, 6); c.fillStyle = '#2a180c'; c.fillRect(0, 0, W, 50);
    const wx = 220, ww = 540, wt = 200, wb = 980; c.fillStyle = '#e8e0d0'; c.fillRect(wx - 30, wt - 30, ww + 60, wb - wt + 70);
    const sg = c.createLinearGradient(0, wt, 0, wb); sg.addColorStop(0, '#8a96a4'); sg.addColorStop(1, '#c8ccd0'); c.fillStyle = sg; c.fillRect(wx, wt, ww, wb - wt);
    for (let i = 0; i < 8; i++) { const bx = wx + i * 70, bh = r.range(140, 320); c.fillStyle = '#6a6e78'; c.fillRect(bx, wb - bh, 72, bh); for (let k = 0; k < 3; k++) { c.fillStyle = '#5a5e68'; c.fillRect(bx + 10 + k * 18, wb - bh - 30, 10, 30); } }
    c.save(); c.beginPath(); c.rect(wx, wt, ww, wb - wt); c.clip(); drizzle(c, r, W, H, 300, .25); c.restore();
    c.strokeStyle = '#f0ece4'; c.lineWidth = 14; c.strokeRect(wx, wt, ww, wb - wt); c.beginPath(); c.moveTo(wx, (wt + wb) / 2); c.lineTo(wx + ww, (wt + wb) / 2); c.stroke(); c.lineWidth = 6; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(wx + k * ww / 3, wt); c.lineTo(wx + k * ww / 3, wb); c.stroke(); } for (const y of [wt + 195, wb - 195]) { c.beginPath(); c.moveTo(wx, y); c.lineTo(wx + ww, y); c.stroke(); }
    for (const sd of [-1, 1]) { const cx = sd < 0 ? wx - 120 : wx + ww; const g = c.createLinearGradient(cx, 0, cx + 120, 0); g.addColorStop(0, '#1a2a1e'); g.addColorStop(.5, '#3a5a3a'); g.addColorStop(1, '#14201a'); c.fillStyle = g; c.fillRect(cx, wt - 60, 120, wb - wt + 120); }
    c.fillStyle = '#2a160a'; c.fillRect(1900, 140, 600, fy - 140); for (let k = 0; k < 6; k++) { const y = 200 + k * 160; c.fillStyle = '#4a2a14'; c.fillRect(1900, y + 130, 600, 18); let bx = 1920; while (bx < 2480) { const bw = r.range(16, 34), bh = r.range(90, 128); c.fillStyle = P2.rgb(P2.shade(r.pick(['#5a1a14', '#1a2a4a', '#2a4a2a', '#6a4a1a', '#3a1a2a', '#8a7a5a']), r.range(-.2, .1))); c.fillRect(bx, y + 130 - bh, bw, bh); c.fillStyle = 'rgba(220,180,90,.5)'; c.fillRect(bx + 2, y + 140 - bh, bw - 4, 3); bx += bw + 1; if (r() < .06) bx += 30; } }
    ENV.frameArt(c, r, 1080, 230, 400, 280, { frame: '#a07830', a: '#7a8a6a', b: '#3a4a5a' });
    planks(c, r, fy, H, '#4a2a14', 10); c.fillStyle = '#5a1a1a'; poly(c, [[500, fy + 20], [2060, fy + 20], [2400, H], [160, H]]); c.fill(); c.strokeStyle = '#c8a050'; c.lineWidth = 6; poly(c, [[540, fy + 34], [2020, fy + 34], [2340, H - 10], [220, H - 10]]); c.stroke(); tex(c, r, 160, fy, 2240, H - fy, '#5a1a1a', 1500, { inside: (x, y) => y > fy + 24 && x > 200 + (H - y) * .3 && x < 2360 - (H - y) * .3, len: [10, 40], al: .12 });
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(180,200,220,.1)'; poly(c, [[wx, wb], [wx + ww, wb], [wx + ww + 700, H], [wx + 200, H]]); c.fill(); c.restore();
    const cg = c.createLinearGradient(1160, 0, 1400, 0); cg.addColorStop(0, '#2a0e0a'); cg.addColorStop(.5, '#6a2418'); cg.addColorStop(1, '#2a0e0a'); c.fillStyle = cg; rr(c, 1150, 650, 260, 330, 40); c.fill(); c.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { c.beginPath(); c.arc(1190 + i * 60, 700 + j * 60, 5, 0, 7); c.fill(); }
    shadow(c, 1280, 1190, 420, 30, .6); const dg = c.createLinearGradient(0, 960, 0, 1180); dg.addColorStop(0, '#6a3a1a'); dg.addColorStop(1, '#2a1408'); c.fillStyle = dg; c.fillRect(960, 980, 640, 200); c.fillStyle = '#7a4a22'; c.fillRect(940, 950, 680, 34); c.fillStyle = '#2a4a2a'; c.fillRect(1000, 950, 600, 10);
    for (const x of [990, 1310]) { c.strokeStyle = 'rgba(220,170,100,.35)'; c.lineWidth = 4; c.strokeRect(x, 1000, 260, 150); c.fillStyle = '#c8a050'; c.beginPath(); c.arc(x + 130, 1040, 6, 0, 7); c.fill(); }
    c.fillStyle = '#f0ead8'; for (let k = 0; k < 4; k++) { c.save(); c.translate(1120 + k * 18, 945); c.rotate(r.range(-.08, .08)); c.fillRect(-70, -6, 140, 8); c.restore(); } c.fillStyle = '#1a1a1a'; c.fillRect(1240, 936, 80, 12); c.fillStyle = '#2a2a2a'; c.fillRect(1360, 930, 60, 18);
    c.fillStyle = '#c8a040'; c.fillRect(1494, 880, 10, 70); c.fillRect(1460, 940, 80, 10); c.fillStyle = '#1e5a3a'; c.beginPath(); c.moveTo(1440, 890); c.quadraticCurveTo(1500, 840, 1560, 890); c.lineTo(1440, 890); c.fill(); c.fillStyle = '#fff0c0'; c.fillRect(1446, 888, 108, 6); gl(c, 1500, 920, 260, '255,220,140', .5); cone(c, 1500, 892, 120, 300, 70, '255,220,150', .3);
    gl(c, 500, 700, 900, '190,200,220', .12);
    done(c, r, W, H, P, { vig: .5 }); },

  // old_palace: dim 1960s Omani-style palace room. Floor y 1150-1440, figures y ~1250. High barred windows x 640-760, 1220-1340, 1800-1920 at y 230-380; light shafts fall to lower right. Low cushioned seat left x 120-720, seat top y 1050. Wooden chest x 1950-2360 y 980-1230. Oil lamp on chest x 2150 y 880-975.
  old_palace: (c, r, W, H, P) => { const fy = 1150, wall = '#b8aa94';
    vg(c, 0, 0, W, fy, [[0, '#4a4034'], [.5, '#7a6c5a'], [1, '#5a4c3c']]); tex(c, r, 0, 0, W, fy, wall, 6000, { al: .12, len: [30, 120], j: 16 });
    for (let i = 0; i < 40; i++) gl(c, r() * W, r.range(100, fy), r.range(100, 300), '30,20,10', .15, 'multiply');
    vg(c, 0, 0, W, 120, [[0, '#1a120a'], [1, '#3a2a1a']]); for (let x = 20; x < W; x += 110) { c.fillStyle = '#2a1a0e'; c.fillRect(x, 0, 40, 130); c.fillStyle = 'rgba(200,160,100,.1)'; c.fillRect(x, 0, 6, 130); }
    for (const x of [1000, 1500]) { c.fillStyle = 'rgba(30,20,10,.5)'; archPath(c, x, 620, 160, 260, true); c.fill(); c.fillStyle = '#8a5a30'; c.beginPath(); c.ellipse(x + 80, 860, 30, 34, 0, 0, 7); c.fill(); }
    vg(c, 0, fy, W, H - fy, [[0, '#4a3c2c'], [1, '#6a5640']]); tex(c, r, 0, fy, W, H - fy, '#5a4a36', 3000); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(0, fy, W, 14);
    rug(c, r, 700, 1190, 1200, 160, '#6a1a1a', '#2a2a3a');
    for (const x of [640, 1220, 1800]) { c.fillStyle = '#fff4d8'; c.fillRect(x, 230, 120, 150); gl(c, x + 60, 305, 260, '255,230,180', .5); c.fillStyle = '#1a1410'; for (let k = 1; k < 5; k++) c.fillRect(x + k * 24 - 4, 230, 8, 150); c.strokeStyle = '#3a2a1a'; c.lineWidth = 10; c.strokeRect(x - 5, 225, 130, 160);
      c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(x, 380, x + 500, fy + 200); g.addColorStop(0, 'rgba(255,225,170,.3)'); g.addColorStop(1, 'rgba(255,225,170,.02)'); c.fillStyle = g; poly(c, [[x, 380], [x + 120, 380], [x + 640, fy + 150], [x + 380, fy + 150]]); c.fill();
      c.fillStyle = 'rgba(255,220,160,.18)'; c.beginPath(); c.ellipse(x + 510, fy + 150, 150, 36, 0, 0, 7); c.fill(); c.restore(); }
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(255,230,180,${r.range(.1, .4)})`; const x = r.range(640, 2400), y = r.range(400, fy); c.fillRect(x, y, 2, 2); } c.restore();
    shadow(c, 420, 1150, 360, 30, .5); c.fillStyle = '#3a2a1a'; c.fillRect(120, 1090, 600, 60); cushion(c, 120, 1050, 600, 50, '#7a2a24'); for (let k = 0; k < 3; k++) cushion(c, 140 + k * 195, 880, 180, 170, ['#6a2a2a', '#5a3a2a', '#6a2a2a'][k]); cushion(c, 90, 960, 70, 120, '#4a3a2a');
    shadow(c, 2155, 1240, 280, 26, .6); const cg = c.createLinearGradient(1950, 0, 2360, 0); cg.addColorStop(0, '#2a160a'); cg.addColorStop(.4, '#6a3e1a'); cg.addColorStop(1, '#2a1408'); c.fillStyle = cg; c.fillRect(1950, 1000, 410, 230); c.fillStyle = '#5a3416'; rr(c, 1940, 980, 430, 40, 10); c.fill();
    c.fillStyle = '#b08a40'; for (const x of [1990, 2150, 2300]) { c.fillRect(x - 6, 980, 12, 250); } for (let x = 1970; x < 2350; x += 30) for (const y of [1010, 1210]) { c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill(); } c.fillRect(2130, 1060, 40, 50);
    c.fillStyle = '#8a6a2a'; c.beginPath(); c.ellipse(2150, 975, 40, 10, 0, 0, 7); c.fill(); c.fillStyle = '#c89a40'; c.beginPath(); c.moveTo(2120, 970); c.quadraticCurveTo(2150, 920, 2180, 970); c.fill(); c.fillStyle = 'rgba(230,240,255,.3)'; rr(c, 2130, 880, 40, 60, 16); c.fill(); c.fillStyle = '#ffc060'; c.beginPath(); c.ellipse(2150, 915, 6, 14, 0, 0, 7); c.fill(); gl(c, 2150, 910, 500, '255,170,80', .45); gl(c, 2150, 910, 80, '255,230,170', .8);
    done(c, r, W, H, P, { vig: .6 }); },

  // palace_night: night courtyard of a seaside Omani-style palace. Floor y 1120-1440, figures y ~1250. White wall top y 640 from x 0-1960; arched gate x 1080-1480 (opening y 500-1120, sea through it). Right x 1960-2560 open to sea (horizon y 800), airstrip lights x 2150-2520 y ~862. Torches x 620, 1860 y 680-760. Palms x 260, 2120. Moon x 600 y 180.
  palace_night: (c, r, W, H, P) => { const hz = 800, fy = 1120;
    vg(c, 0, 0, W, hz, [[0, '#060a1c'], [.7, '#16224a'], [1, '#2a3460']]); for (let i = 0; i < 260; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.15, .7)})`; c.fillRect(r() * W, r() * 600, 2, 2); }
    gl(c, 600, 180, 300, '210,220,255', .35); c.fillStyle = '#eef0fa'; c.beginPath(); c.arc(600, 180, 46, 0, 7); c.fill();
    sea(c, r, hz, fy, '#1a2448', '#0a1020', '200,210,255', 700, 600);
    c.fillStyle = '#14141e'; poly(c, [[1960, 870], [W, 850], [W, 900], [1960, 900]]); c.fill(); for (let x = 2150; x < 2530; x += 30) { gl(c, x, 862, 22, '255,200,90', .8); c.fillStyle = '#ffe0a0'; c.fillRect(x - 2, 860, 4, 4); } gl(c, 2500, 840, 40, '255,60,60', .8); c.fillStyle = '#2a2a34'; c.fillRect(2440, 790, 30, 70); c.fillRect(2425, 780, 60, 16);
    c.fillStyle = '#20202c'; c.fillRect(1960, 900, 600, 220);
    const wallT = 640, wl = 1960; ENV.box(c, r, 0, wallT, wl, fy - wallT, '#d8d4cc', { density: 60, top: .05, bot: -.25 }); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(90,110,170,1)'; c.fillRect(0, wallT - 40, wl + 10, fy - wallT + 40); c.restore();
    for (let x = 0; x < wl; x += 70) { c.fillStyle = '#7a809a'; c.beginPath(); c.moveTo(x, wallT); c.lineTo(x + 20, wallT - 34); c.lineTo(x + 40, wallT); c.fill(); }
    const gx = 1080, gw = 400; ENV.box(c, r, gx - 90, 380, gw + 180, fy - 380, '#d8d4cc', { density: 30 }); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(100,120,175,1)'; c.fillRect(gx - 90, 380, gw + 180, fy - 380); c.restore();
    for (let x = gx - 90; x < gx + gw + 90; x += 60) { c.fillStyle = '#8a90aa'; c.beginPath(); c.moveTo(x, 380); c.lineTo(x + 18, 346); c.lineTo(x + 36, 380); c.fill(); }
    c.save(); archPath(c, gx, 500, gw, fy - 500, true); c.clip(); vg(c, gx, 400, gw, hz - 400, [[0, '#14204a'], [1, '#2a3460']]); sea(c, r, hz, fy, '#1a2448', '#0a1020', '200,210,255', 200); c.restore();
    c.strokeStyle = '#c8b070'; c.lineWidth = 8; archPath(c, gx - 6, 494, gw + 12, fy - 494, true); c.stroke();
    for (const sd of [-1, 1]) { const dx = sd < 0 ? gx - 6 : gx + gw - 54; const g = c.createLinearGradient(dx, 0, dx + 60, 0); g.addColorStop(0, '#2a1a0e'); g.addColorStop(1, '#5a3a1a'); c.fillStyle = g; c.fillRect(dx, 640, 60, fy - 640); }
    dpalm(c, r, 260, 1140, 900, 60, '#1a140e', ['#1a2a20', '#14221a', '#24342a'], '255,160,90'); dpalm(c, r, 2120, 1140, 820, -50, '#1a140e', ['#1a2a20', '#14221a', '#24342a'], '200,210,255');
    vg(c, 0, fy, W, H - fy, [[0, '#3a3a48'], [1, '#2a2a36']]); persLines(c, fy, H, 1280, 8, 'rgba(0,0,0,.35)', 3); reflect(c, fy, 160, .18, 6);
    for (const x of [620, 1860]) { c.fillStyle = '#3a2a1a'; c.fillRect(x - 30, 830, 60, 12); torch(c, r, x, 760, 1.2); gl(c, x, 900, 600, '255,150,70', .22); gl(c, x, 1220, 500, '255,150,70', .18); }
    done(c, r, W, H, P, { vig: .55 }); },

  // majlis: Gulf majlis. Floor y 1150-1440, figures y ~1250. Back seating along wall x 100-2460: seat top y 1010, back cushions y 870-1045; seat positions x 300, 620, 940, 1620, 1940, 2260. Low table centre x 970-1590 top y 1090 (dallahs on it). Lamps x 640, 1280, 1920 hang to y 400.
  majlis: (c, r, W, H, P) => { const fy = 1150;
    vg(c, 0, 0, W, fy, [[0, '#d8c4a0'], [1, '#c4aa84']]); tex(c, r, 0, 0, W, fy, '#d4bc94', 4000, { al: .1 });
    vg(c, 0, 0, W, 120, [[0, '#3a2414'], [1, '#6a4422']]); for (let x = 0; x < W; x += 90) { c.strokeStyle = '#c8a050'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 60); c.lineTo(x + 45, 20); c.lineTo(x + 90, 60); c.lineTo(x + 45, 100); c.closePath(); c.stroke(); }
    c.fillStyle = '#8a5a2a'; c.fillRect(0, 120, W, 16); c.fillStyle = '#1e4a5a'; c.fillRect(0, 136, W, 44); for (let x = 0; x < W; x += 44) { c.fillStyle = '#c8a050'; c.beginPath(); c.arc(x + 22, 158, 10, 0, 7); c.fill(); }
    for (let k = 0; k < 6; k++) { const x = 140 + k * 400 + (k >= 3 ? 40 : 0); c.fillStyle = 'rgba(120,80,40,.3)'; archPath(c, x - 10, 290, 260, 560, true); c.fill(); c.save(); archPath(c, x, 300, 240, 540, true); c.clip(); lattice(c, x, 250, 240, 600, '#6a4220', 28); c.restore(); gl(c, x + 120, 560, 200, '255,200,120', .2); }
    vg(c, 0, fy - 40, W, H - fy + 40, [[0, '#8a6a4a'], [1, '#6a4a30']]);
    c.fillStyle = '#5a2a1a'; c.fillRect(100, 1040, 2360, 70); for (let x = 120; x < 2440; x += 160) cushion(c, x, 870, 150, 175, r.pick(['#8a1a22', '#7a2028', '#5a2a4a']), '#d8b050'); cushion(c, 100, 1010, 2360, 50, '#9a2028', '#e0b860');
    for (let x = 100; x < 2460; x += 40) { c.fillStyle = r() < .5 ? '#c8a050' : '#2a5a6a'; c.fillRect(x, 1070, 20, 30); }
    c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(0, 1110, W, 30);
    c.fillStyle = '#2a3a6a'; poly(c, [[380, 1130], [2180, 1130], [2560, H], [0, H]]); c.fill(); c.fillStyle = '#8a1a20'; poly(c, [[460, 1145], [2100, 1145], [2400, H - 20], [160, H - 20]]); c.fill();
    c.strokeStyle = '#e0b860'; c.lineWidth = 4; for (let k = 0; k < 9; k++) { const t = k / 8, cx = 600 + t * 1360, cy = 1300; c.beginPath(); c.moveTo(cx - 70, cy); c.lineTo(cx, cy - 70); c.lineTo(cx + 70, cy); c.lineTo(cx, cy + 70); c.closePath(); c.stroke(); } tex(c, r, 0, 1130, W, H - 1130, '#8a1a20', 2500, { inside: (x, y) => y > 1150 && x > 200 + (H - y) * .6 && x < 2360 - (H - y) * .6, len: [8, 24], w: [2, 4], al: .1 });
    shadow(c, 1280, 1160, 360, 20, .5); c.fillStyle = '#3a2010'; c.fillRect(990, 1110, 18, 50); c.fillRect(1552, 1110, 18, 50); vg(c, 970, 1090, 620, 26, [[0, '#9a6a3a'], [1, '#4a2a12']]); c.fillStyle = '#c8a050'; c.fillRect(970, 1090, 620, 4);
    dallah(c, 1100, 1090, .7); dallah(c, 1200, 1090, .55); c.fillStyle = '#e0c070'; c.beginPath(); c.ellipse(1400, 1086, 90, 10, 0, 0, 7); c.fill(); for (let k = 0; k < 5; k++) { c.fillStyle = '#f8f0e0'; c.fillRect(1340 + k * 26, 1066, 14, 18); } c.fillStyle = '#8a4a2a'; c.beginPath(); c.ellipse(1520, 1080, 40, 12, 0, 0, 7); c.fill(); for (let k = 0; k < 8; k++) { c.fillStyle = '#5a2a10'; c.beginPath(); c.arc(1500 + r() * 40, 1072 + r() * 6, 6, 0, 7); c.fill(); }
    for (const x of [640, 1280, 1920]) { c.strokeStyle = '#6a4a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, 180); c.lineTo(x, 260); c.stroke(); gl(c, x, 320, 500, '255,190,110', .4); const g = c.createLinearGradient(x - 60, 0, x + 60, 0); g.addColorStop(0, '#6a4a14'); g.addColorStop(.5, '#f0c860'); g.addColorStop(1, '#5a3a10'); c.fillStyle = g; c.beginPath(); c.moveTo(x, 260); c.lineTo(x + 60, 310); c.lineTo(x + 40, 380); c.lineTo(x, 400); c.lineTo(x - 40, 380); c.lineTo(x - 60, 310); c.closePath(); c.fill();
      c.fillStyle = 'rgba(255,230,170,.9)'; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(x - 30 + k * 20, 330, 5, 0, 7); c.fill(); } gl(c, x, 330, 100, '255,220,150', .7); cone(c, x, 400, 100, 700, 700, '255,200,130', .06); }
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,200,130,.3)'], [1, 'rgba(120,60,30,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },
});
})();
