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

// ---- gulf B helpers ----
const tex = (c, r, x, y, w, h, col, o = {}) => P2.fillStrokes(c, r, [x, y, w, h], () => true, { n: o.n ?? Math.round(w * h / 260), len: o.len || [16, 60], w: o.w || [3, 9], ang: o.ang ?? 0, angJ: o.angJ ?? .25, al: o.al ?? .2, colFn: () => P2.shade(P2.jitter(col, r, o.j ?? 14), r.range(-.14, .1)) });
const tint = (c, W, H, stops, mode = "soft-light") => { c.save(); c.globalCompositeOperation = mode; vg(c, 0, 0, W, H, stops); c.restore(); };
const ridgeF = (c, r, y0, amp, freq, col, seed, o = {}) => { const W = c.canvas.width, H = c.canvas.height; const pts = P2.ridge(r, P2.Noise(seed), W, y0, amp, freq, seed).map(([x, y]) => [x, Math.min(y, H)]);
  P2.paintRegion(c, r, pts, col, { density: o.d ?? 500, len: [30, 90], w: [5, 12], ang: o.ang ?? .2, angJ: .5, al: o.al ?? .3, topLight: o.tl ?? .1, botDark: o.bd ?? -.2 }); return pts; };
const mist = (c, r, y, h, col, a, n = 30) => { const W = c.canvas.width; vg(c, 0, y - h, W, h * 2, [[0, `rgba(${col},0)`], [.5, `rgba(${col},${a})`], [1, `rgba(${col},0)`]]); c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { c.fillStyle = `rgba(${col},${a * r.range(.1, .35)})`; c.beginPath(); c.ellipse(r() * W, y + r.gauss() * h * .4, r.range(200, 600), r.range(20, 60), 0, 0, 7); c.fill(); } c.restore(); };
const block = (c, r, x, base, w, h, col, o = {}) => { const top = base - h; vg(c, x, top, w, h, [[0, P2.rgb(P2.shade(col, .08))], [1, P2.rgb(P2.shade(col, -.15))]]); tex(c, r, x, top, w, h, col, { n: Math.round(w * h / 900), al: .12 });
  c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x + w * .88, top, w * .12, h); c.fillStyle = `rgba(${o.rim || '255,255,255'},.18)`; c.fillRect(x, top, 3, h); c.fillRect(x, top, w, 3);
  const ws = o.ws || 10, gx = o.gx || ws * 2.1, gy = o.gy || ws * 2.6; for (let wy = top + gy * .5; wy < base - gy * .7; wy += gy) { for (let wx = x + ws * .8; wx < x + w * .88 - ws; wx += gx) { c.fillStyle = r() < (o.lit ?? 0) ? `rgba(${o.win || '255,210,150'},${r.range(.45, .95)})` : (o.dark || 'rgba(30,34,44,.55)'); c.fillRect(wx, wy, ws, ws * (o.wr || 1.3)); }
    if (o.bal) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x, wy + ws * 1.35, w, 3); c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(x, wy + ws * 1.35 - 2, w, 2); } } };
const pflag = (c, x, base, h, col, ph = 0) => { c.fillStyle = '#b8b0a0'; c.fillRect(x - 4, base - h, 8, h); c.fillStyle = '#d8b050'; c.beginPath(); c.arc(x, base - h - 6, 9, 0, 7); c.fill(); c.fillStyle = '#2a2420'; c.fillRect(x - 22, base - 14, 44, 14);
  const w = 200, fh = 130; for (let sx = 0; sx < w; sx += 3) { const k = sx / w, dy = Math.sin(k * 6 + ph) * 16 * k, dl = Math.sin(k * 6 + ph) * .14 * k * (1 - k * .4) + .1 - k * .06; c.fillStyle = P2.rgb(P2.shade(col, dl * 2 - .1)); c.fillRect(x + 4 + sx, base - h + 6 + dy, 3, fh * (1 - k * .15)); } };
const chand = (c, r, x, y, s = 1) => { c.strokeStyle = '#7a5a22'; c.lineWidth = 4 * s; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, y); c.stroke(); gl(c, x, y + 90 * s, 620 * s, '255,225,160', .45);
  for (let t = 0; t < 4; t++) { const ry = y + 20 * s + t * 50 * s, rw = (170 - t * 34) * s, n = 26 - t * 5; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, px = x + Math.cos(a) * rw, py = ry + Math.sin(a) * rw * .22, L = (30 + r() * 40) * s, f = .45 + .45 * Math.sin(a); c.strokeStyle = `rgba(255,245,220,${f})`; c.lineWidth = 2 * s; c.beginPath(); c.moveTo(px, py); c.lineTo(px, py + L); c.stroke(); c.fillStyle = `rgba(255,250,235,${f + .1})`; c.beginPath(); c.arc(px, py + L, 3.5 * s, 0, 7); c.fill(); }
    c.strokeStyle = '#d8b050'; c.lineWidth = 5 * s; c.beginPath(); c.ellipse(x, ry, rw, rw * .22, 0, 0, 7); c.stroke(); }
  c.fillStyle = '#d8b050'; c.beginPath(); c.moveTo(x, y + 260 * s); c.lineTo(x - 14 * s, y + 210 * s); c.lineTo(x + 14 * s, y + 210 * s); c.fill(); gl(c, x, y + 100 * s, 150 * s, '255,245,220', .9);
  for (let i = 0; i < 8; i++) sparkle(c, x + r.range(-150, 150) * s, y + r.range(20, 220) * s, r.range(4, 9) * s, '255,250,230', .8); };
const marble = (c, r, y0, y1, col, o = {}) => { const W = c.canvas.width; vg(c, 0, y0, W, y1 - y0, [[0, P2.rgb(P2.shade(col, -.12))], [1, P2.rgb(P2.shade(col, .06))]]); tex(c, r, 0, y0, W, y1 - y0, col, { n: 3500, len: [60, 200], w: [3, 8], al: .1, angJ: .1 });
  reflect(c, y0, o.rh || 320, o.ra ?? .35, 5); c.strokeStyle = o.vein || 'rgba(120,110,100,.18)'; c.lineWidth = 1.5; for (let i = 0; i < 50; i++) { let x = r() * W, y = y0 + r() * (y1 - y0); c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 6; k++) { x += r.range(20, 90); y += r.gauss() * 10; c.lineTo(x, y); } c.stroke(); }
  persLines(c, y0, y1, o.vx || W / 2, o.n || 7, o.line || 'rgba(0,0,0,.12)', 2); };
const crane = (c, x, base, top, jl, jr, col = '#e0a81c') => { c.strokeStyle = col; c.lineWidth = 6; for (const dx of [-18, 18]) { c.beginPath(); c.moveTo(x + dx, base); c.lineTo(x + dx, top); c.stroke(); } c.lineWidth = 3; c.beginPath(); for (let y = base; y > top; y -= 36) { c.moveTo(x - 18, y); c.lineTo(x + 18, y - 36); c.moveTo(x - 18, y); c.lineTo(x + 18, y); } c.stroke();
  c.lineWidth = 5; c.beginPath(); c.moveTo(x - jl, top); c.lineTo(x + jr, top); c.moveTo(x - jl, top - 26); c.lineTo(x + jr * .98, top - 4); c.stroke(); c.lineWidth = 2; c.beginPath(); for (let k = x - jl; k < x + jr - 30; k += 30) { c.moveTo(k, top); c.lineTo(k + 15, top - 22 + (k - x + jl) / (jl + jr) * 18); c.lineTo(k + 30, top); } c.stroke();
  c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, top - 90); c.lineTo(x + jr * .7, top - 2); c.moveTo(x, top - 90); c.lineTo(x - jl, top - 20); c.moveTo(x - 18, top); c.lineTo(x, top - 90); c.lineTo(x + 18, top); c.stroke();
  c.fillStyle = '#5a5a5e'; c.fillRect(x - jl, top - 6, 70, 46); c.fillStyle = col; c.fillRect(x + 20, top + 2, 40, 34); c.fillStyle = 'rgba(160,200,230,.7)'; c.fillRect(x + 26, top + 8, 28, 16);
  c.strokeStyle = '#222'; c.lineWidth = 1.5; const hx = x + jr * .55; c.beginPath(); c.moveTo(hx, top); c.lineTo(hx, top + 260); c.stroke(); c.fillStyle = '#222'; c.fillRect(hx - 8, top + 258, 16, 16); };
const wheel = (c, x, y, rad) => { c.fillStyle = '#141414'; c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill(); c.fillStyle = '#7a7a7a'; c.beginPath(); c.arc(x, y, rad * .5, 0, 7); c.fill(); c.fillStyle = '#3a3a3a'; c.beginPath(); c.arc(x, y, rad * .2, 0, 7); c.fill(); };
const hazeTint = (c, r, y0, y1, col, n = 60, a = .06) => { c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { c.fillStyle = `rgba(${col},${r.range(a * .3, a)})`; c.beginPath(); c.ellipse(r() * c.canvas.width, r.range(y0, y1), r.range(200, 700), r.range(14, 40), 0, 0, 7); c.fill(); } c.restore(); };
const frank = (c, r, x, y, ang, len, w, d) => { const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len; c.strokeStyle = '#6a5a4a'; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + Math.cos(ang + .4) * len * .5, y + Math.sin(ang + .4) * len * .5, ex, ey); c.stroke(); c.strokeStyle = 'rgba(220,210,190,.35)'; c.lineWidth = w * .3; c.stroke();
  if (d === 0) { for (let i = 0; i < 16; i++) { c.fillStyle = P2.rgb(P2.jitter(r.pick(['#4a7a3a', '#3a6a30', '#6a9a4a']), r, 14)); c.beginPath(); c.ellipse(ex + r.gauss() * len * .3, ey + r.gauss() * len * .15, len * .14, len * .07, r() * 3, 0, 7); c.fill(); } return; }
  for (let i = 0; i < 2 + (r() < .4); i++) frank(c, r, ex, ey, ang + r.range(-.8, .8), len * r.range(.6, .8), w * .65, d - 1); };
const dome = (c, x, base, rad, col, lit) => { const g = c.createLinearGradient(x - rad, 0, x + rad, 0); g.addColorStop(0, P2.rgb(P2.shade(col, -.25))); g.addColorStop(.6, lit); g.addColorStop(1, P2.rgb(P2.shade(col, -.1))); c.fillStyle = g; c.beginPath(); c.moveTo(x - rad, base); c.bezierCurveTo(x - rad, base - rad * 1.25, x - rad * .2, base - rad * 1.2, x, base - rad * 1.45); c.bezierCurveTo(x + rad * .2, base - rad * 1.2, x + rad, base - rad * 1.25, x + rad, base); c.fill(); c.fillStyle = lit; c.fillRect(x - 2, base - rad * 1.7, 4, rad * .3); };
const minaret = (c, x, base, h, w, col, lit) => { hg(c, x - w / 2, base - h, w, h, [[0, P2.rgb(P2.shade(col, -.2))], [.6, lit], [1, P2.rgb(P2.shade(col, -.1))]]); for (const t of [.45, .75]) { c.fillStyle = lit; c.fillRect(x - w * .9, base - h * t, w * 1.8, 7); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x - w * .8, base - h * t + 7, w * 1.6, 6); }
  c.fillStyle = col; c.beginPath(); c.moveTo(x - w * .6, base - h); c.lineTo(x, base - h - w * 3); c.lineTo(x + w * .6, base - h); c.fill(); };
const arcade = (c, x, y, w, h, n, col) => { c.fillStyle = col; for (let i = 0; i < n; i++) { const ax = x + (i + .5) * w / n, aw = w / n * .62; c.beginPath(); c.moveTo(ax - aw / 2, y + h); c.lineTo(ax - aw / 2, y + h * .4); c.quadraticCurveTo(ax, y - h * .05, ax + aw / 2, y + h * .4); c.lineTo(ax + aw / 2, y + h); c.fill(); } };
const seaBand = (c, r, y0, y1, top, bot, glint = '255,240,210', n = 2500) => { const W = c.canvas.width; vg(c, 0, y0, W, y1 - y0, [[0, top], [1, bot]]); for (let i = 0; i < n; i++) { const t = Math.pow(r(), 1.5), y = y0 + t * (y1 - y0); c.fillStyle = r() < .3 ? `rgba(${glint},${r.range(.1, .45)})` : `rgba(0,30,50,${r.range(.05, .15)})`; c.fillRect(r() * W, y, r.range(8, 40) * (1 + t * 3), 1 + t * 3); } };

Object.assign(window.PLATES = window.PLATES || {}, {
  // dhofar: monsoon-green Dhofar hills, village with white clinic (x 640-1120, y 820-1010) and school (x 1440-2040, y 760-1010), dirt road centre. Floor y 1260.
  dhofar: (c, r, W, H, P) => { const fy = 1260;
    vg(c, 0, 0, W, 900, [[0, '#6e8088'], [.5, '#a2b2b0'], [1, '#d2dbd0']]); ENV.clouds(c, r, W, 20, 360, 9, '#eef0ea', '#b8c4c2', '#7e8e92', { scale: 1.3 });
    ridgeF(c, r, 700, 900, .0016, '#7a9a8e', 11, { al: .2 }); mist(c, r, 560, 90, '235,240,235', .3);
    ridgeF(c, r, 860, 650, .0022, '#5a8a62', 23); mist(c, r, 720, 70, '230,238,230', .28);
    ridgeF(c, r, 1000, 360, .003, '#4a7c42', 37, { al: .35 }); mist(c, r, 900, 50, '230,238,228', .22, 20);
    for (let i = 0; i < 260; i++) { const x = r() * W, y = r.range(720, 990); c.fillStyle = P2.rgb(P2.jitter('#3a6a32', r, 16), .7); c.beginPath(); c.ellipse(x, y, r.range(8, 22), r.range(5, 12), 0, 0, 7); c.fill(); }
    // meadow
    vg(c, 0, 960, W, H - 960, [[0, '#5e8e3e'], [.4, '#4e8036'], [1, '#3a6428']]); for (let i = 0; i < 90; i++) { const x = r() * W, y = r.range(1000, 1240); if (x > 820 && x < 1800 && y > 1100) continue; c.fillStyle = P2.rgb(P2.jitter('#2f5a26', r, 14)); c.beginPath(); c.ellipse(x, y, r.range(14, 40), r.range(8, 20), 0, 0, 7); c.fill(); c.fillStyle = 'rgba(160,200,120,.3)'; c.beginPath(); c.ellipse(x - 4, y - 5, r.range(6, 16), 4, 0, 0, 7); c.fill(); }
    tex(c, r, 0, 960, W, H - 960, '#55883a', { n: 9000, len: [10, 40], ang: -1.4, angJ: .4, al: .25 });
    // village houses
    for (let i = 0; i < 14; i++) { const x = r.range(100, 2400), b = r.range(950, 1000), w = r.range(70, 150), h = r.range(50, 90); if (x > 580 && x < 2100) continue; block(c, r, x, b, w, h, r.pick(['#e8e2d4', '#d8ccb4', '#efe9dc']), { ws: 9, gx: 34, gy: 40, dark: 'rgba(60,50,40,.6)' }); }
    for (let i = 0; i < 10; i++) { const x = r.range(300, 2300), b = r.range(905, 935); block(c, r, x, b, r.range(50, 90), r.range(30, 50), '#dcd4c2', { ws: 6, gx: 26, gy: 30 }); }
    // clinic: white, green band
    shadow(c, 880, 1012, 300, 14, .4); block(c, r, 640, 1010, 480, 190, '#f4f2ec', { ws: 34, gx: 80, gy: 90, wr: 1, dark: 'rgba(60,90,110,.7)' }); c.fillStyle = '#2f8a5a'; c.fillRect(640, 832, 480, 18); c.fillStyle = '#2a3440'; c.fillRect(850, 930, 70, 80); c.fillStyle = '#e8e4da'; c.fillRect(820, 905, 130, 12); c.fillStyle = '#9aa4a8'; c.fillRect(1040, 790, 50, 30);
    // school: two storey, ochre trim
    shadow(c, 1740, 1012, 360, 14, .4); block(c, r, 1440, 1010, 600, 250, '#f0ece0', { ws: 40, gx: 86, gy: 110, wr: .9, dark: 'rgba(50,80,110,.7)' }); c.fillStyle = '#c89a3a'; c.fillRect(1440, 760, 600, 14); c.fillRect(1440, 880, 600, 8); c.fillStyle = '#e0dccc'; c.fillRect(1380, 960, 720, 50); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(1380, 1004, 720, 6);
    c.strokeStyle = '#d8d0c0'; c.lineWidth = 4; for (let x = 1380; x < 2100; x += 24) { c.beginPath(); c.moveTo(x, 1010); c.lineTo(x, 975); c.stroke(); }
    // dirt road
    c.fillStyle = '#a88a62'; c.beginPath(); c.moveTo(860, H); c.bezierCurveTo(1100, 1200, 1500, 1120, 1300, 1040); c.lineTo(1240, 1010); c.lineTo(1280, 1010); c.bezierCurveTo(1620, 1100, 1500, 1250, 1760, H); c.fill();
    P2.fillStrokes(c, r, [860, 1010, 900, 430], (x, y) => c.isPointInPath(x, y), { n: 2500, len: [14, 50], w: [3, 8], ang: 0, angJ: .3, al: .25, colFn: () => P2.jitter('#9a7a54', r, 18) });
    for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(90,70,50,.5)'; c.beginPath(); c.ellipse(r.range(1000, 1600), r.range(1150, 1430), r.range(4, 12), r.range(2, 5), 0, 0, 7); c.fill(); }
    // frankincense trees
    for (const [x, y, s] of [[640, 1000, .45], [2140, 990, .5], [440, 990, .35], [2330, 1000, .38]]) frank(c, r, x, y, -Math.PI / 2 + r.gauss() * .1, 120 * s, 18 * s, 4);
    for (const [x, y, s] of [[170, 1330, 1.25], [2400, 1320, 1.15]]) { shadow(c, x, y, 220 * s, 20 * s, .45); frank(c, r, x, y, -Math.PI / 2 - .15, 160 * s, 34 * s, 5); }
    ENV.grass(c, r, W, 1300, H + 20, 380, ['#3e6a2a', '#5a8a3a', '#6a9a48'], { h: 30, keep: (x) => x < 700 || x > 1900 });
    mist(c, r, 1000, 40, '230,236,228', .25, 10); gl(c, 1300, 300, 1300, '255,250,235', .14);
    tint(c, W, H, [[0, 'rgba(120,150,160,.3)'], [1, 'rgba(60,90,50,.3)']]); done(c, r, W, H, P, { vig: .38 }); },

  // ministry: government counter hall. Floor y 1250 (wall base y 1000). Counter x 280-2280 (top y 850), windows 1-7 numbered on front face. Blank chart wall x 1500-2300 y 250-750.
  ministry: (c, r, W, H, P) => { const wb = 1000;
    vg(c, 0, 0, W, wb, [[0, '#dcd2be'], [1, '#c4b498']]); P.paintRegion(c, r, [[0, 120], [W, 120], [W, wb], [0, wb]], '#d6cab0', { density: 700, len: [40, 120], w: [5, 12], ang: Math.PI / 2, angJ: .05, al: .18 });
    for (let x = 0; x < W; x += 180) { c.fillStyle = 'rgba(90,70,40,.12)'; c.fillRect(x, 120, 3, wb - 120); } c.fillStyle = 'rgba(90,70,40,.1)'; c.fillRect(0, 560, W, 3);
    vg(c, 0, 0, W, 120, [[0, '#f2eee4'], [1, '#d8d0c0']]); c.fillStyle = '#a8946a'; c.fillRect(0, 118, W, 10);
    for (let i = 0; i < 7; i++) { const x = 200 + i * 360; c.fillStyle = '#fffbf0'; rr(c, x - 70, 30, 140, 40, 6); c.fill(); gl(c, x, 60, 260, '255,245,220', .5); cone(c, x, 70, 140, 700, 900, '255,245,220', .06); }
    // geometric frieze
    c.strokeStyle = 'rgba(150,120,70,.5)'; c.lineWidth = 3; for (let x = 0; x < W; x += 60) { c.beginPath(); c.moveTo(x, 170); c.lineTo(x + 30, 140); c.lineTo(x + 60, 170); c.lineTo(x + 30, 200); c.closePath(); c.stroke(); }
    // blank chart wall
    c.fillStyle = 'rgba(80,60,30,.25)'; rr(c, 1484, 234, 832, 532, 8); c.fill(); c.fillStyle = '#f6f2e8'; rr(c, 1500, 250, 800, 500, 6); c.fill(); gl(c, 1900, 500, 600, '255,250,240', .25);
    // clock and generic sign
    c.fillStyle = '#3a3026'; c.beginPath(); c.arc(860, 380, 70, 0, 7); c.fill(); c.fillStyle = '#f4efe2'; c.beginPath(); c.arc(860, 380, 60, 0, 7); c.fill(); c.strokeStyle = '#2a2420'; c.lineWidth = 6; c.beginPath(); c.moveTo(860, 380); c.lineTo(860, 336); c.moveTo(860, 380); c.lineTo(892, 392); c.stroke();
    // back office behind glass
    vg(c, 280, 640, 2000, 220, [[0, '#8a7e6a'], [1, '#5a5244']]); for (let i = 0; i < 7; i++) { const x = 300 + i * 285; c.fillStyle = '#1e2228'; c.fillRect(x + 90, 760, 100, 70); c.fillStyle = 'rgba(120,190,240,.7)'; c.fillRect(x + 96, 766, 88, 56); gl(c, x + 140, 795, 120, '120,190,240', .25); c.fillStyle = '#3a3630'; c.fillRect(x + 60, 690, 160, 60); }
    c.fillStyle = 'rgba(170,210,220,.28)'; c.fillRect(280, 700, 2000, 150); for (let i = 0; i <= 7; i++) { c.fillStyle = '#8a7a5a'; c.fillRect(276 + i * 285, 690, 10, 160); } c.fillStyle = '#a8946a'; c.fillRect(270, 686, 2020, 8);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.12)'; for (let i = 0; i < 7; i++) { poly(c, [[320 + i * 285, 700], [370 + i * 285, 700], [330 + i * 285, 850], [280 + i * 285, 850]]); c.fill(); } c.restore();
    // counter
    vg(c, 260, 846, 2040, 20, [[0, '#f4ece0'], [1, '#b8a888']]); vg(c, 280, 866, 2000, 134, [[0, '#7a5a3a'], [1, '#4a3420']]); tex(c, r, 280, 866, 2000, 134, '#6a4a2e', { n: 1500, len: [40, 120], al: .2, angJ: .05 });
    for (let i = 0; i < 7; i++) { const x = 422 + i * 285; c.fillStyle = '#1a1612'; rr(c, x - 36, 890, 72, 60, 8); c.fill(); txt(c, String(i + 1), x, 921, 44, '#6cf0a0', { w: 900 }); gl(c, x, 920, 70, '100,240,160', .3); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x + 140, 866, 4, 134); }
    c.fillStyle = '#e8dcc4'; c.fillRect(0, wb - 12, W, 12);
    marble(c, r, wb, H, '#d8cebe', { rh: 360, ra: .4, n: 8 });
    for (const x of [130, 2430]) { ENV.plant(c, r, x, 1240, 2.2); } for (const x of [300, 2260]) { c.fillStyle = '#b8a470'; c.fillRect(x - 5, 1050, 10, 180); c.beginPath(); c.arc(x, 1050, 12, 0, 7); c.fill(); c.fillStyle = '#2a2a2a'; c.beginPath(); c.ellipse(x, 1232, 34, 8, 0, 0, 7); c.fill(); }
    c.strokeStyle = '#7a1a22'; c.lineWidth = 10; c.beginPath(); c.moveTo(300, 1080); c.quadraticCurveTo(170, 1130, 40, 1080); c.moveTo(2260, 1080); c.quadraticCurveTo(2390, 1130, 2520, 1080); c.stroke();
    tint(c, W, H, [[0, 'rgba(255,240,210,.3)'], [1, 'rgba(120,100,80,.3)']]); done(c, r, W, H, P, { vig: .36 }); },

  // construction: huge site, half-built tower x 700-1300 with crane on top, free crane x 1850, bus x 1820-2540 (base y 1180). Floor y 1260.
  construction: (c, r, W, H, P) => { const gb = 1060;
    vg(c, 0, 0, W, gb, [[0, '#8ab0cc'], [.6, '#d0d8d4'], [1, '#f2e4c4']]); gl(c, 2150, 160, 900, '255,250,230', .6); gl(c, 2150, 160, 90, '255,255,250', 1);
    for (let i = 0; i < 26; i++) { const x = r() * W, h = r.range(60, 380); c.fillStyle = `rgba(170,170,165,${r.range(.25, .45)})`; c.fillRect(x, gb - 120 - h, r.range(40, 110), h + 120); }
    vg(c, 0, 700, W, 380, [[0, 'rgba(240,225,200,0)'], [1, 'rgba(240,225,200,.7)']]);
    // second half-built block right
    block(c, r, 2140, gb, 360, 520, '#b8b2a6', { ws: 50, gx: 72, gy: 64, wr: .8, dark: 'rgba(40,40,46,.75)' });
    // main tower
    const tx = 700, tw = 600, fh = 52; for (let f = 0; f < 13; f++) { const y = gb - f * fh; c.fillStyle = f < 5 ? '#4a6e8a' : '#4a4a50'; c.fillRect(tx, y - fh, tw, fh); if (f < 5) { for (let k = 0; k < 10; k++) { c.fillStyle = `rgba(190,220,240,${r.range(.2, .5)})`; c.fillRect(tx + k * 60 + 3, y - fh + 4, 54, fh - 8); } } else { vg(c, tx, y - fh, tw, fh, [[0, 'rgba(20,20,24,.5)'], [1, 'rgba(120,110,100,.3)']]); for (let k = 0; k <= 8; k++) { c.fillStyle = '#b8b4ac'; c.fillRect(tx + k * 73, y - fh, 12, fh); } if (r() < .5) { c.fillStyle = '#c8a040'; c.fillRect(tx + r.range(40, 500), y - 20, 30, 20); } } c.fillStyle = '#d0ccc4'; c.fillRect(tx - 10, y - 8, tw + 20, 10); }
    c.strokeStyle = '#a8482a'; c.lineWidth = 6; for (let f = 13; f < 17; f++) { const y = gb - f * fh; c.beginPath(); c.moveTo(tx, y); c.lineTo(tx + tw, y); for (let k = 0; k <= 6; k++) { c.moveTo(tx + k * 100, y); c.lineTo(tx + k * 100, y + fh); } c.stroke(); c.lineWidth = 2.5; c.beginPath(); for (let k = 0; k < 6; k++) { c.moveTo(tx + k * 100, y + fh); c.lineTo(tx + k * 100 + 100, y); } c.stroke(); c.lineWidth = 6; }
    c.fillStyle = '#b8b4aa'; c.fillRect(920, gb - 17 * fh - 40, 160, 17 * fh - 13 * fh + 40); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(1050, gb - 17 * fh - 40, 30, 4 * fh + 40);
    // scaffolding right face lower
    c.strokeStyle = 'rgba(140,130,110,.9)'; c.lineWidth = 3; for (let x = 1310; x < 1420; x += 36) { c.beginPath(); c.moveTo(x, gb); c.lineTo(x, gb - 560); c.stroke(); } for (let y = gb; y > gb - 560; y -= 46) { c.beginPath(); c.moveTo(1300, y); c.lineTo(1420, y); c.stroke(); } c.fillStyle = 'rgba(40,140,90,.35)'; c.fillRect(1300, gb - 560, 120, 300);
    crane(c, 1000, 136, 60, 300, 820); crane(c, 1850, gb, 230, 260, 640, '#d8a020'); crane(c, 300, gb, 360, 180, 520, '#c83a2a');
    // ground
    vg(c, 0, gb, W, H - gb, [[0, '#c8a678'], [1, '#a88454']]); tex(c, r, 0, gb, W, H - gb, '#b8966a', { n: 9000, len: [10, 40], al: .2 });
    c.strokeStyle = 'rgba(90,70,40,.35)'; c.lineWidth = 16; for (const o of [0, 70]) { c.beginPath(); c.moveTo(-50, 1400 - o); c.bezierCurveTo(700, 1180 - o, 1500, 1160 - o, 2600, 1120 - o * .4); c.stroke(); }
    // barriers
    for (let x = 0; x < W; x += 90) { if (x > 1700 && x < 2560) continue; c.fillStyle = (x / 90) % 2 ? '#e06a22' : '#f2ece0'; c.fillRect(x, 1080, 86, 30); c.fillStyle = '#5a5048'; c.fillRect(x + 6, 1110, 8, 14); c.fillRect(x + 72, 1110, 8, 14); }
    // bus
    const bx = 1820, bb = 1180; shadow(c, bx + 360, bb, 400, 20, .5); vg(c, bx, bb - 200, 720, 180, [[0, '#f0ece2'], [1, '#c8c0b0']]); rr(c, bx, bb - 210, 720, 190, 18); c.fillStyle = '#ece6d8'; c.fill(); c.fillStyle = '#2a6a9a'; c.fillRect(bx, bb - 90, 720, 22);
    for (let k = 0; k < 9; k++) { c.fillStyle = 'rgba(40,60,80,.85)'; c.fillRect(bx + 30 + k * 74, bb - 186, 62, 70); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(bx + 34 + k * 74, bb - 182, 12, 60); } c.fillStyle = '#3a3a3a'; c.fillRect(bx + 700, bb - 186, 18, 120);
    wheel(c, bx + 140, bb - 18, 34); wheel(c, bx + 590, bb - 18, 34);
    // steel beams and blocks left front
    for (let k = 0; k < 6; k++) { const y = 1240 - k * 22; c.fillStyle = k % 2 ? '#8a4a2a' : '#a8582e'; c.fillRect(80 + k * 6, y, 420, 20); c.fillStyle = 'rgba(255,220,180,.3)'; c.fillRect(80 + k * 6, y, 420, 4); } shadow(c, 300, 1250, 300, 16, .4);
    for (let k = 0; k < 5; k++) { vg(c, 2160 + k * 76, 1320, 72, 60, [[0, '#c8c4bc'], [1, '#8a867e']]); } for (let k = 0; k < 3; k++) vg(c, 2200 + k * 76, 1262, 72, 58, [[0, '#d0ccc4'], [1, '#908c84']]); shadow(c, 2340, 1384, 230, 14, .4);
    hazeTint(c, r, 900, 1250, '255,225,180', 70, .08); tint(c, W, H, [[0, 'rgba(255,240,200,.35)'], [1, 'rgba(160,110,60,.3)']]); done(c, r, W, H, P, { vig: .32 }); },

  // labour_camp: workers' blocks courtyard at sunset. Floor y 1250. Water cooler x 230-420 (top y 830). Office booth x 2060-2560: desk top y 1075, desk x 2130-2480, chair at x 2300 behind.
  labour_camp: (c, r, W, H, P) => { const hz = 860;
    vg(c, 0, 0, W, hz, [[0, '#3a2c50'], [.45, '#a8506a'], [.8, '#f08a5a'], [1, '#ffc878']]); ENV.clouds(c, r, W, 80, 380, 8, '#ffb888', '#c86a6a', '#5a3a5a'); gl(c, 1200, 820, 700, '255,190,110', .6); gl(c, 1200, 820, 90, '255,240,200', .9);
    for (let i = 0; i < 18; i++) { const x = r() * W, h = r.range(40, 160); c.fillStyle = 'rgba(80,50,70,.55)'; c.fillRect(x, hz - h, r.range(40, 120), h); }
    // back row of blocks
    for (let i = 0; i < 6; i++) { const x = i * 440 - 40; block(c, r, x, 990, 400, 230, '#c8aa8a', { ws: 26, gx: 66, gy: 100, wr: 1, dark: 'rgba(50,40,40,.6)', rim: '255,190,140' }); for (let k = 0; k < 5; k++) { c.fillStyle = '#d8d2c8'; c.fillRect(x + 20 + k * 72, 830, 30, 20); c.fillRect(x + 20 + k * 72, 930, 30, 20); } }
    // side blocks
    const side = (x0, x1, dir) => { const top = 520, base = 1130; P2.paintRegion(c, r, dir < 0 ? [[x0, top], [x1, 700], [x1, 1000], [x0, base]] : [[x0, 700], [x1, top], [x1, base], [x0, 1000]], '#b89a7a', { density: 600, al: .25 });
      for (let k = 0; k < 5; k++) for (let f = 0; f < 2; f++) { const t = (k + .3) / 5, x = x0 + (x1 - x0) * t, tt = dir < 0 ? t : 1 - t, yT = top + (700 - top) * tt, yB = base + (1000 - base) * tt, hh = (yB - yT); c.fillStyle = 'rgba(40,30,30,.6)'; c.fillRect(x, yT + hh * (.15 + f * .45), (x1 - x0) / 9, hh * .2); c.fillStyle = '#ddd6cc'; c.fillRect(x, yT + hh * (.08 + f * .45), (x1 - x0) / 12, hh * .06); } };
    side(0, 560, -1); side(2000, 2560, 1);
    // washing lines
    for (const [x0, x1] of [[640, 1180], [1360, 1920]]) { for (const x of [x0, x1]) { c.fillStyle = '#4a3a32'; c.fillRect(x - 4, 760, 8, 240); } c.strokeStyle = '#3a3030'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, 770); c.quadraticCurveTo((x0 + x1) / 2, 810, x1, 770); c.stroke();
      for (let x = x0 + 30; x < x1 - 40; x += r.range(40, 70)) { const t = (x - x0) / (x1 - x0), y = 770 + 4 * t * (1 - t) * 40, w = r.range(28, 52), h = r.range(40, 80); c.fillStyle = P2.rgb(P2.jitter(r.pick(['#3a6aa8', '#e8e0d0', '#c84a3a', '#5a8a4a', '#e8b84a', '#6a4a8a']), r, 20)); c.fillRect(x, y, w, h); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x + w * .7, y, w * .3, h); x += w * .3; } }
    // ground
    vg(c, 0, 990, W, H - 990, [[0, '#a88870'], [1, '#7a5e4a']]); tex(c, r, 0, 990, W, H - 990, '#9a7a62', { n: 7000, len: [20, 70], al: .18 }); gl(c, 1200, 1100, 900, '255,170,100', .2);
    for (let i = 0; i < 40; i++) { c.fillStyle = `rgba(${r() < .5 ? '70,50,40' : '200,170,140'},${r.range(.06, .14)})`; c.beginPath(); c.ellipse(r() * W, r.range(1010, 1430), r.range(60, 260), r.range(8, 30), 0, 0, 7); c.fill(); } c.fillStyle = 'rgba(60,40,30,.25)'; c.fillRect(0, 990, W, 6);
    // water cooler
    shadow(c, 325, 1250, 140, 16, .5); vg(c, 230, 830, 190, 420, [[0, '#c8ccd0'], [1, '#7a8088']]); c.fillStyle = '#5a6068'; c.fillRect(230, 1180, 190, 70); c.fillStyle = 'rgba(255,200,160,.35)'; c.fillRect(236, 836, 10, 340); c.fillStyle = '#8a9098'; c.fillRect(262, 940, 126, 90); c.fillStyle = '#d8dce0'; c.fillRect(296, 950, 12, 22); c.fillRect(342, 950, 12, 22); c.fillStyle = '#5a6068'; c.fillRect(270, 1018, 110, 8); c.fillStyle = 'rgba(80,150,220,.75)'; rr(c, 270, 700, 110, 130, 30); c.fill(); c.fillRect(305, 680, 40, 24); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(284, 716, 12, 96); c.fillStyle = '#3a6aa0'; c.fillRect(250, 860, 150, 18);
    
    // office booth
    const ox = 2060; shadow(c, 2320, 1295, 320, 20, .5); vg(c, ox, 420, 520, 870, [[0, '#e8e2d2'], [1, '#b0a890']]); c.fillStyle = '#8a8070'; c.fillRect(ox - 20, 400, 540, 34);
    vg(c, ox + 50, 590, 470, 500, [[0, '#5a4a3a'], [1, '#2e2620']]); gl(c, 2300, 900, 300, '255,210,150', .4);
    c.fillStyle = '#d8d0c0'; c.fillRect(ox + 230, 620, 140, 90); c.fillStyle = '#3a3a3a'; c.fillRect(ox + 260, 660, 90, 6); // notice board
    c.fillStyle = '#3a2c22'; c.fillRect(2250, 900, 100, 175); c.fillStyle = '#4a3a2e'; c.fillRect(2230, 880, 140, 40); // chair back
    vg(c, 2130, 1075, 350, 22, [[0, '#a87a4a'], [1, '#6a4a2a']]); c.fillStyle = '#5a3e24'; c.fillRect(2140, 1097, 330, 190); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(2300, 1097, 4, 190);
    c.fillStyle = '#f2ece0'; c.fillRect(2180, 1062, 90, 12); c.fillRect(2190, 1056, 80, 8); c.fillStyle = '#2a2a2a'; c.fillRect(2400, 1020, 8, 55); c.fillRect(2370, 1015, 50, 10); gl(c, 2390, 1030, 120, '255,220,160', .5);
    c.fillStyle = '#8a8070'; c.fillRect(ox + 30, 580, 20, 710); c.fillRect(ox + 510, 580, 10, 710); c.fillRect(ox + 30, 575, 490, 18);
    tint(c, W, H, [[0, 'rgba(120,70,140,.3)'], [.6, 'rgba(255,150,90,.35)'], [1, 'rgba(90,50,50,.35)']]); done(c, r, W, H, P, { vig: .4 }); },
  // tehran: 1979 avenue, Alborz-like snowy range, apartment blocks, plane trees. Blank billboard x 1700-2300 y 260-560. Floor y 1260 (road vanishing x 1280 y 1000).
  tehran: (c, r, W, H, P) => { const hz = 1000;
    vg(c, 0, 0, W, hz, [[0, '#7c98b8'], [.6, '#bcc8d0'], [1, '#e4dccc']]); ENV.clouds(c, r, W, 40, 260, 6, '#f4f2ec', '#c8ccd4', '#9aa2b0');
    const mp = ridgeF(c, r, 760, 900, .0014, '#7a7c94', 51, { al: .2 }); c.save(); poly(c, mp); c.clip(); vg(c, 0, 120, W, 420, [[0, 'rgba(250,250,255,.95)'], [.55, 'rgba(240,242,250,.7)'], [1, 'rgba(240,242,250,0)']]); c.strokeStyle = 'rgba(110,110,140,.35)'; c.lineWidth = 6; for (let i = 0; i < 60; i++) { const x = r() * W, y = r.range(200, 600); c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(-60, 60), y + r.range(60, 160)); c.stroke(); } c.restore();
    vg(c, 0, 560, W, 300, [[0, 'rgba(220,215,205,0)'], [1, 'rgba(220,215,205,.75)']]);
    // apartment blocks
    for (let x = -40; x < W; ) { const w = r.range(220, 380), h = r.range(240, 520); block(c, r, x, hz, w, h, r.pick(['#b8a890', '#a89a88', '#c4b49a', '#9a9080']), { ws: 22, gx: 46, gy: 52, wr: 1.1, bal: true, dark: 'rgba(50,50,60,.55)' }); x += w + r.range(0, 30); }
    // billboard
    c.fillStyle = '#3a3a3e'; for (const x of [1780, 2220]) c.fillRect(x, 560, 16, 200); c.fillStyle = '#2a2a2e'; c.fillRect(1690, 250, 620, 320); c.fillStyle = '#e8e4dc'; c.fillRect(1700, 260, 600, 300); vg(c, 1700, 260, 600, 300, [[0, 'rgba(255,255,255,.2)'], [1, 'rgba(0,0,0,.1)']]); c.fillStyle = '#3a3a3e'; c.fillRect(1690, 570, 620, 10);
    // shops at ground
    for (let x = 0; x < W; x += 210) { c.fillStyle = r.pick(['#5a3a2a', '#3a4a5a', '#6a5a3a']); c.fillRect(x + 10, 920, 190, 80); c.fillStyle = r.pick(['#a83a2a', '#2a6a5a', '#c89a3a', '#e8e0d0']); poly(c, [[x + 4, 905], [x + 206, 905], [x + 214, 935], [x - 4, 935]]); c.fill(); }
    // road
    vg(c, 0, hz, W, H - hz, [[0, '#6a6a6e'], [1, '#3e3e44']]); tex(c, r, 0, hz, W, H - hz, '#55555a', { n: 6000, len: [10, 50], al: .15 });
    c.fillStyle = '#a8a094'; poly(c, [[0, hz], [700, hz], [-600, H], [0, H]]); c.fill(); poly(c, [[1860, hz], [W, hz], [W, H], [3160, H]]); c.fill();
    c.fillStyle = 'rgba(240,236,220,.75)'; for (const L of [-1, 1, 0]) for (let k = 0; k < 9; k++) { const t0 = Math.pow(k / 9, 1.8), t1 = Math.pow((k + .5) / 9, 1.8), y0 = hz + (H - hz) * t0, y1 = hz + (H - hz) * t1, x0 = 1280 + L * 700 * t0 * 1.2, x1 = 1280 + L * 700 * t1 * 1.2, w0 = 3 + t0 * 14, w1 = 3 + t1 * 14; if (L === 0) continue; poly(c, [[x0 - w0, y0], [x0 + w0, y0], [x1 + w1, y1], [x1 - w1, y1]]); c.fill(); }
    // plane trees
    const ptree = (x, base, s) => { c.fillStyle = '#8a8270'; c.fillRect(x - 14 * s, base - 380 * s, 28 * s, 380 * s); for (let i = 0; i < 12; i++) { c.fillStyle = `rgba(${r() < .5 ? '220,214,190' : '90,84,70'},.5)`; c.beginPath(); c.ellipse(x + r.gauss() * 8 * s, base - r() * 360 * s, 8 * s, 14 * s, 0, 0, 7); c.fill(); }
      for (let i = 0; i < 60; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); c.fillStyle = P2.rgb(P2.shade(P2.jitter('#5a7a3a', r, 18), -(Math.sin(a) * d) * .25 - .05)); c.beginPath(); c.arc(x + Math.cos(a) * d * 220 * s, base - 520 * s + Math.sin(a) * d * 160 * s, r.range(40, 80) * s, 0, 7); c.fill(); } };
    for (const [x, s] of [[560, .45], [380, .7], [1960, .45], [2160, .7]]) ptree(x, hz + 160 * s, s); ptree(80, 1330, 1.2); ptree(2480, 1330, 1.2);
    hazeTint(c, r, 700, 1000, '240,230,210', 30, .06); tint(c, W, H, [[0, 'rgba(160,180,200,.3)'], [1, 'rgba(150,120,90,.3)']]); done(c, r, W, H, P, { vig: .38 }); },

  // mosque_dawn: far generic marble mosque (dome x 1280 y ~600, minarets x 720/1000/1560/1840) over rooftops at dawn. Sky clear y 0-500 for smoke. Roof terrace floor y 1300.
  mosque_dawn: (c, r, W, H, P) => { const hz = 860;
    vg(c, 0, 0, W, hz, [[0, '#1e2a5a'], [.4, '#5a5a8a'], [.75, '#c88a9a'], [1, '#f8c8a0']]); for (let i = 0; i < 120; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.1, .5)})`; c.fillRect(r() * W, Math.pow(r(), 2) * 300, 2, 2); }
    gl(c, 1700, hz, 900, '255,200,150', .45); ENV.clouds(c, r, W, 360, 640, 5, '#ffd0b0', '#c88a9a', '#6a5a7a', { scale: 1.2 });
    const col = '#e8dcd4', lit = '#fff0e4';
    c.fillStyle = '#b8a8b0'; c.fillRect(560, hz - 70, 1440, 70); arcade(c, 570, hz - 60, 1420, 50, 30, 'rgba(90,70,90,.55)'); c.fillStyle = lit; c.fillRect(560, hz - 74, 1440, 6);
    for (const [x, rad] of [[940, 60], [1620, 60], [1090, 80], [1470, 80]]) { c.fillStyle = '#d8ccc8'; c.fillRect(x - rad, hz - 140, rad * 2, 70); dome(c, x, hz - 140, rad, col, lit); }
    c.fillStyle = '#ddd0cc'; c.fillRect(1100, hz - 250, 360, 180); arcade(c, 1110, hz - 200, 340, 110, 5, 'rgba(90,70,90,.5)'); c.fillStyle = col; c.fillRect(1140, hz - 300, 280, 50); dome(c, 1280, hz - 300, 160, col, lit);
    for (const [x, h] of [[720, 520], [1000, 470], [1560, 470], [1840, 520]]) minaret(c, x, hz - 70, h, 30, col, lit);
    gl(c, 1300, 600, 700, '255,210,190', .2); vg(c, 0, 600, W, 300, [[0, 'rgba(230,190,190,0)'], [1, 'rgba(230,190,190,.5)']]);
    // rooftops layers
    for (let L = 0; L < 4; L++) { const base = hz + 70 + L * 110, s = 1 + L * .6, cc = P2.mix('#6a5a78', '#2a2436', L / 3); let x = -60;
      while (x < W) { const w = r.range(140, 320) * s, h = r.range(60, 140) * s; c.fillStyle = P2.rgb(P2.jitter(cc, r, 8)); c.fillRect(x, base - h, w, h + 200); c.fillStyle = 'rgba(255,190,160,.25)'; c.fillRect(x, base - h, w, 3 * s);
        for (let k = 0; k < 2; k++) if (r() < .5) { c.fillStyle = `rgba(255,${r.int(180, 220)},140,${r.range(.4, .8)})`; c.fillRect(x + r.range(10, w - 30), base - h + r.range(15, h - 20), 10 * s, 14 * s); }
        if (r() < .4) { c.fillStyle = P2.rgb(P2.shade(cc, .1)); c.beginPath(); c.ellipse(x + w * .3, base - h - 14 * s, 18 * s, 14 * s, 0, 0, 7); c.fill(); c.fillRect(x + w * .3 - 14 * s, base - h - 12 * s, 28 * s, 12 * s); }
        if (r() < .4) { c.strokeStyle = P2.rgb(cc); c.lineWidth = 2; c.beginPath(); c.moveTo(x + w * .7, base - h); c.lineTo(x + w * .7, base - h - 50 * s); c.moveTo(x + w * .7 - 16 * s, base - h - 40 * s); c.lineTo(x + w * .7 + 16 * s, base - h - 40 * s); c.stroke(); }
        x += w + r.range(-10, 20); } }
    // terrace
    vg(c, 0, 1200, W, H - 1200, [[0, '#7a6470'], [1, '#4a3a46']]); tex(c, r, 0, 1200, W, H - 1200, '#6a5862', { n: 5000, al: .18 }); c.strokeStyle = 'rgba(30,20,30,.3)'; c.lineWidth = 2; for (let x = -800; x < W + 800; x += 160) { c.beginPath(); c.moveTo(1280 + (x - 1280) * .6, 1200); c.lineTo(x, H); c.stroke(); }
    c.fillStyle = '#5a4652'; c.fillRect(0, 1160, W, 46); c.fillStyle = 'rgba(255,200,170,.4)'; c.fillRect(0, 1160, W, 4);
    shadow(c, 200, 1300, 160, 14, .4); vg(c, 110, 1060, 190, 240, [[0, '#d8d4cc'], [1, '#8a8480']]); c.fillStyle = '#b8b4ac'; c.beginPath(); c.ellipse(205, 1060, 95, 22, 0, 0, 7); c.fill();
    ENV.plant(c, r, 2420, 1300, 1.6);
    tint(c, W, H, [[0, 'rgba(90,90,170,.3)'], [.6, 'rgba(255,170,150,.3)'], [1, 'rgba(60,40,70,.35)']]); done(c, r, W, H, P, { vig: .42 }); },

  // summit: round table centre (top ellipse cx 1280 cy 1010 rx 560 ry 120). Six chairs, seat (x, seat-top y): 700,1000 | 930,930 | 1150,900 | 1410,900 | 1630,930 | 1860,1000. Flags x 230-530 and 2030-2330. Blank screen x 880-1680 y 170-580. Floor y 1250.
  summit: (c, r, W, H, P) => { const wb = 960;
    vg(c, 0, 0, W, wb, [[0, '#1c2638'], [1, '#2c3a50']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, wb], [0, wb]], '#26324a', { density: 700, len: [40, 120], w: [5, 12], ang: Math.PI / 2, angJ: .05, al: .15 });
    for (let x = 0; x < W; x += 220) { vg(c, x + 8, 640, 204, 310, [[0, '#5a3e28'], [1, '#3a2818']]); c.fillStyle = 'rgba(255,210,150,.2)'; c.fillRect(x + 8, 640, 204, 3); }
    c.fillStyle = '#c8a050'; c.fillRect(0, 630, W, 8);
    c.fillStyle = '#0c0e14'; rr(c, 860, 150, 840, 450, 10); c.fill(); vg(c, 880, 170, 800, 410, [[0, '#2a3e5c'], [1, '#1a2840']]); gl(c, 1280, 375, 500, '120,160,220', .2);
    for (const x of [420, 2140]) chand(c, r, x, 110, .9);
    const cols = ['#2a7a4a', '#f2eee6', '#b8282e', '#1e4a9a', '#7a1e3a', '#d8a83a'];
    cols.forEach((col, i) => { const x = i < 3 ? 230 + i * 150 : 2030 + (i - 3) * 150; pflag(c, x, 1000, 620, col, i); });
    cone(c, 1280, 0, 300, 1500, 1200, '255,230,190', .08);
    // carpet
    vg(c, 0, wb, W, H - wb, [[0, '#4a1a20'], [1, '#6a242a']]); tex(c, r, 0, wb, W, H - wb, '#5a2026', { n: 5000, al: .15 }); c.strokeStyle = 'rgba(210,170,90,.35)'; c.lineWidth = 6; c.beginPath(); c.ellipse(1280, 1100, 1100, 260, 0, 0, 7); c.stroke(); c.lineWidth = 2; c.beginPath(); c.ellipse(1280, 1100, 1060, 240, 0, 0, 7); c.stroke();
    gl(c, 1280, 1050, 900, '255,220,170', .2);
    const chair = (x, fy, s) => { shadow(c, x, fy, 90 * s, 12 * s, .5); vg(c, x - 60 * s, fy - 370 * s, 120 * s, 230 * s, [[0, '#2a3e5a'], [1, '#1a2840']]); rr(c, x - 64 * s, fy - 380 * s, 128 * s, 250 * s, 20 * s); c.fillStyle = '#c8a050'; c.fill(); c.fillStyle = '#24385a'; rr(c, x - 54 * s, fy - 370 * s, 108 * s, 230 * s, 16 * s); c.fill(); c.fillStyle = '#1e2e48'; c.fillRect(x - 64 * s, fy - 160 * s, 128 * s, 30 * s); c.fillStyle = '#c8a050'; c.fillRect(x - 58 * s, fy - 130 * s, 8 * s, 130 * s); c.fillRect(x + 50 * s, fy - 130 * s, 8 * s, 130 * s); };
    for (const [x, fy, s] of [[1150, 1060, .9], [1410, 1060, .9], [930, 1090, .95], [1630, 1090, .95]]) chair(x, fy, s);
    // table
    shadow(c, 1280, 1230, 640, 40, .6); vg(c, 720, 1010, 1120, 220, [[0, '#4a2e1a'], [1, '#2a1a0e']]); c.fillStyle = '#3a2412'; c.beginPath(); c.ellipse(1280, 1010, 560, 120, 0, 0, Math.PI); c.lineTo(720, 1010); c.fill();
    c.beginPath(); c.moveTo(720, 1010); c.lineTo(720, 1110); c.ellipse(1280, 1110, 560, 120, 0, Math.PI, 0, true); c.lineTo(1840, 1010); c.fillStyle = '#3e2614'; c.fill();
    const g = c.createLinearGradient(0, 890, 0, 1130); g.addColorStop(0, '#8a5a32'); g.addColorStop(1, '#5a3418'); c.fillStyle = g; c.beginPath(); c.ellipse(1280, 1010, 560, 120, 0, 0, 7); c.fill(); c.fillStyle = '#e8e2d4'; c.beginPath(); c.ellipse(1280, 1010, 200, 44, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,230,180,.25)'; c.beginPath(); c.ellipse(1180, 970, 300, 40, 0, 0, 7); c.fill();
    for (const [x, y] of [[880, 1000], [1060, 920], [1280, 905], [1500, 920], [1680, 1000]]) { c.fillStyle = 'rgba(220,235,245,.6)'; c.fillRect(x - 6, y - 26, 12, 26); c.fillStyle = '#f4f0e6'; c.fillRect(x + 18, y - 4, 50, 8); }
    for (const [x, fy, s] of [[700, 1190, 1], [1860, 1190, 1]]) chair(x, fy, s);
    tint(c, W, H, [[0, 'rgba(80,110,160,.3)'], [1, 'rgba(120,60,50,.3)']]); done(c, r, W, H, P, { vig: .42 }); },

  // kuwait_night: night skyline with sphere water-towers (x ~1650-2000), sea strip y 980-1060, desert highway lanes y 1180-1380 (vehicles at y 1280), sodium lamps. Floor y 1280.
  kuwait_night: (c, r, W, H, P) => {
    city(c, r, 0, 0, W, 990, { sky: [[0, '#060a1e'], [.6, '#18204a'], [1, '#5a3a4a']], stars: 200, moon: [420, 180], cool: .1, haze: 'rgba(200,120,80,.25)', landmarkLayer: 1,
      landmark: (c, r, base) => { const tw = (x, h, sp) => { c.fillStyle = '#d8d8e0'; poly(c, [[x - 14, base], [x + 14, base], [x + 3, base - h], [x - 3, base - h]]); c.fill(); gl(c, x, base - h, 30, '255,80,60', .8);
          for (const [t, rad] of sp) { const y = base - h * t; const g = c.createRadialGradient(x - rad * .3, y - rad * .3, rad * .1, x, y, rad); g.addColorStop(0, '#5ab0c8'); g.addColorStop(1, '#0e3a54'); c.fillStyle = g; c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill();
            for (let i = 0; i < rad * 3; i++) { const a = r() * 7, d = Math.sqrt(r()) * rad * .9; c.fillStyle = `rgba(${r() < .5 ? '150,220,240' : '20,60,90'},.6)`; c.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, 4, 4); } gl(c, x, y, rad * 2.5, '120,200,230', .25); } };
        tw(1720, 760, [[.6, 95], [.82, 48]]); tw(1900, 560, [[.62, 72]]); tw(2010, 300, []); } });
    seaBand(c, r, 990, 1070, '#1a2040', '#0c1024', '255,200,140', 1200);
    vg(c, 0, 1070, W, H - 1070, [[0, '#3a2a28'], [1, '#2a1e1c']]); tex(c, r, 0, 1070, W, 110, '#4a3630', { n: 2500, al: .2 });
    vg(c, 0, 1180, W, 200, [[0, '#2a2a30'], [1, '#1c1c22']]); tex(c, r, 0, 1180, W, 200, '#2e2e34', { n: 3000, al: .15 });
    c.fillStyle = '#b8a890'; c.fillRect(0, 1176, W, 6); c.fillRect(0, 1378, W, 8); c.fillStyle = 'rgba(240,230,200,.8)'; for (let x = 0; x < W; x += 180) { c.fillRect(x, 1244, 90, 6); c.fillRect(x + 60, 1314, 90, 6); }
    vg(c, 0, 1386, W, H - 1386, [[0, '#3a2a24'], [1, '#2a1e1a']]);
    for (let x = 160; x < W; x += 560) { lampPost(c, x, 1176, 520, '255,170,70', 1); gl(c, x, 1240, 420, '255,150,60', .25); }
    tint(c, W, H, [[0, 'rgba(60,80,160,.3)'], [1, 'rgba(255,140,60,.25)']]); done(c, r, W, H, P, { vig: .5 }); },
});
})();
