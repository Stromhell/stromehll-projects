// Prime drink story: background plates. Paint (one or two at a time):
//   node shared/p2/paint.js prime/production/plates.js prime/production/plates studio,ring
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

window.PLATES = {
  // 1. Sydney breakfast radio studio at sunrise. ON AIR box: x 2170-2450, y 150-262 (unlit). Floor y 1270, clear right half.
  studio: (c, r, W, H, P) => { const fy = 1060;
    vg(c, 0, 0, W, fy, [[0, '#18222c'], [1, '#222c36']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, fy], [0, fy]], '#1e2832', { density: 260, len: [40, 120], w: [6, 14], ang: Math.PI / 2, angJ: .05, al: .22, topLight: -.1, botDark: -.15 });
    // acoustic foam wedges
    const foam = (x0, y0, w, h, col) => { const s = 46; for (let y = y0; y < y0 + h - 1; y += s) for (let x = x0; x < x0 + w - 1; x += s) { const flip = ((x - x0) / s + (y - y0) / s) % 2; const lt = P2.rgb(P2.shade(col, .18)), dk = P2.rgb(P2.shade(col, -.35));
      c.fillStyle = flip ? lt : dk; poly(c, [[x, y], [x + s, y], [x + s / 2, y + s / 2]]); c.fill(); c.fillStyle = flip ? dk : lt; poly(c, [[x, y + s], [x + s, y + s], [x + s / 2, y + s / 2]]); c.fill(); c.fillStyle = P2.rgb(col); poly(c, [[x, y], [x + s / 2, y + s / 2], [x, y + s]]); c.fill(); poly(c, [[x + s, y], [x + s / 2, y + s / 2], [x + s, y + s]]); c.fill(); }
      c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 6; c.strokeRect(x0, y0, w, h); };
    foam(46, 130, 506, 828, '#2c3e52'); foam(2116, 322, 414, 644, '#2c3e52');
    // window: harbour at sunrise
    const wx = 640, wy = 110, ww = 1420, wh = 720, hz = 560; c.save(); c.beginPath(); c.rect(wx, wy, ww, wh); c.clip();
    vg(c, wx, wy, ww, hz - wy, [[0, '#34427a'], [.35, '#8a6a9a'], [.7, '#f09a78'], [1, '#ffd08a']]); gl(c, 1560, hz - 10, 520, '255,200,120', .7); gl(c, 1560, hz - 10, 120, '255,245,210', .9);
    ENV.clouds(c, r, W, wy + 20, hz - 160, 6, '#ffc8a0', '#d88a8a', '#8a6a8a');
    for (let i = 0; i < 30; i++) { const x = wx + r() * ww, h = r.range(20, 110); c.fillStyle = 'rgba(90,70,100,.75)'; c.fillRect(x, hz - h, r.range(18, 50), h); if (r() < .5) { c.fillStyle = 'rgba(255,220,170,.5)'; c.fillRect(x + 4, hz - h + 6, 4, 4); } }
    c.fillStyle = '#5a4a6a'; c.beginPath(); c.moveTo(wx, hz); for (let x = wx; x <= wx + ww; x += 40) c.lineTo(x, hz - 18 - Math.sin(x * .01) * 10 - r() * 6); c.lineTo(wx + ww, hz); c.fill();
    vg(c, wx, hz, ww, wy + wh - hz, [[0, '#e8907a'], [.3, '#8a6a8a'], [1, '#2a3a5a']]);
    for (let i = 0; i < 900; i++) { const y = hz + Math.pow(r(), 1.6) * (wy + wh - hz), x = wx + r() * ww, near = Math.abs(x - 1560) < 140 + (y - hz) * .4; c.fillStyle = near ? `rgba(255,230,170,${r.range(.3, .8)})` : `rgba(255,190,170,${r.range(.05, .25)})`; c.fillRect(x, y, r.range(10, 50) * (1 + (y - hz) / 200), 2 + (y - hz) / 120); }
    // arch bridge
    const ax0 = 1640, ax1 = 2080, ay = hz - 8, apex = hz - 190; c.strokeStyle = '#3a2c3a'; c.lineWidth = 14; for (const o of [0, 26]) { c.beginPath(); c.moveTo(ax0, ay - o * .2); c.quadraticCurveTo((ax0 + ax1) / 2, apex * 2 - ay + o, ax1, ay - o * .2); c.stroke(); }
    c.lineWidth = 3; for (let i = 1; i < 22; i++) { const t = i / 22, x = ax0 + (ax1 - ax0) * t, yA = (1 - t) * (1 - t) * ay + 2 * t * (1 - t) * (apex * 2 - ay) + t * t * ay; c.beginPath(); c.moveTo(x, yA); c.lineTo(x, ay - 40); c.stroke(); }
    c.fillStyle = '#3a2c3a'; c.fillRect(1560, ay - 44, 600, 12); c.fillRect(1600, ay - 110, 50, 110); c.fillRect(2070, ay - 110, 50, 110); c.fillStyle = 'rgba(255,200,140,.35)'; c.fillRect(1600, ay - 110, 8, 110); c.fillRect(2070, ay - 110, 8, 110);
    // sail-shell opera building
    c.fillStyle = '#8a6a70'; c.fillRect(860, hz - 30, 440, 40); c.fillStyle = 'rgba(255,210,170,.3)'; c.fillRect(860, hz - 30, 440, 5);
    const shell = (x, w, h, lean) => { const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#fff2e0'); g.addColorStop(.6, '#f2c8b0'); g.addColorStop(1, '#a8889a'); c.fillStyle = g; c.beginPath(); c.moveTo(x, hz - 30); c.quadraticCurveTo(x + w * .15 + lean, hz - 30 - h * 1.05, x + w * .95 + lean, hz - 30 - h); c.quadraticCurveTo(x + w * .7, hz - 30 - h * .4, x + w, hz - 30); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(150,120,130,.35)'; c.lineWidth = 2; for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(x + w * k / 6, hz - 30); c.quadraticCurveTo(x + w * (k / 6) * .6 + lean * .6, hz - 30 - h * .5 * (1 - k / 8), x + w * .95 + lean, hz - 30 - h); c.stroke(); } };
    shell(1150, 150, 120, 10); shell(1040, 170, 160, 14); shell(940, 160, 130, 8); shell(880, 130, 96, 6); shell(1210, 100, 70, 6);
    for (let i = 0; i < 12; i++) { const x = wx + r() * ww; c.fillStyle = 'rgba(255,255,255,.8)'; poly(c, [[x, hz + 40 + i * 14], [x + 10, hz + 20 + i * 14], [x + 12, hz + 40 + i * 14]]); c.fill(); }
    c.restore();
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.05)'; poly(c, [[wx + 160, wy], [wx + 420, wy], [wx + 100, wy + wh], [wx - 160, wy + wh]]); c.fill(); poly(c, [[wx + 980, wy], [wx + 1060, wy], [wx + 760, wy + wh], [wx + 680, wy + wh]]); c.fill(); c.restore();
    c.fillStyle = '#10161c'; c.fillRect(wx - 24, wy - 24, ww + 48, 24); c.fillRect(wx - 24, wy + wh, ww + 48, 30); for (let k = 0; k <= 3; k++) c.fillRect(wx - 24 + k * (ww + 24) / 3, wy, 24, wh); c.fillStyle = 'rgba(255,200,150,.35)'; c.fillRect(wx - 24, wy + wh, ww + 48, 4);
    gl(c, 1500, 700, 1100, '255,170,110', .18);
    // ON AIR box (unlit)
    c.fillStyle = '#0c0e12'; rr(c, 2162, 142, 296, 128, 14); c.fill(); c.fillStyle = '#3a1414'; rr(c, 2176, 156, 268, 100, 8); c.fill(); txt(c, 'ON AIR', 2310, 208, 64, '#5a2222', { w: 900 }); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(2180, 160, 260, 12);
    // clock
    c.fillStyle = '#0c0e12'; c.beginPath(); c.arc(2330, 220 + 0, 0, 0, 7); c.fill();
    // floor and skirting
    planks(c, r, fy, H, '#2a2420', 10); c.fillStyle = '#0e1216'; c.fillRect(0, fy - 18, W, 18); reflect(c, fy, 220, .18, 6); gl(c, 1500, 1120, 900, '255,170,110', .1);
    ENV.rug(c, r, 1900, 1290, 1100, 150, '#2c3e52', '#c88a5a');
    // desk on the left
    shadow(c, 860, 1200, 760, 36, .6); vg(c, 160, 930, 1420, 40, [[0, '#6a5a50'], [1, '#3a302a']]); c.fillStyle = 'rgba(255,220,180,.5)'; c.fillRect(160, 930, 1420, 3);
    vg(c, 180, 970, 1380, 220, [[0, '#262a30'], [1, '#14161a']]); c.fillStyle = 'rgba(80,160,255,.6)'; c.fillRect(180, 1180, 1380, 6); gl(c, 870, 1186, 700, '80,160,255', .18);
    for (let k = 0; k < 4; k++) { c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 3; c.strokeRect(210 + k * 340, 1000, 310, 150); }
    // mixing desk
    c.fillStyle = '#16181c'; poly(c, [[600, 932], [1140, 932], [1170, 872], [570, 872]]); c.fill(); c.fillStyle = '#2a2e36'; poly(c, [[586, 902], [1156, 902], [1170, 872], [570, 872]]); c.fill();
    for (let i = 0; i < 18; i++) { const x = 602 + i * 30; c.fillStyle = '#0a0b0d'; c.fillRect(x, 906, 4, 22); c.fillStyle = r.pick(['#d0d4dc', '#e04040', '#40a0ff']); c.fillRect(x - 5, 910 + r() * 12, 14, 6); for (let k = 0; k < 2; k++) { c.fillStyle = r.pick(['#888', '#e0b040', '#40c0a0']); c.beginPath(); c.arc(x + 2 + k * 3, 880 + k * 10, 4, 0, 7); c.fill(); } }
    for (let i = 0; i < 10; i++) { c.fillStyle = i < 7 ? '#40e070' : i < 9 ? '#f0c040' : '#f04040'; c.fillRect(1120, 896 - i * 4, 14, 3); }
    // monitor screen
    c.fillStyle = '#0c0e12'; rr(c, 1200, 700, 300, 200, 10); c.fill(); vg(c, 1212, 712, 276, 170, [[0, '#18406a'], [1, '#0c1c34']]); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(100,220,255,.6)'; const h = 10 + Math.abs(Math.sin(i * .5)) * 60 * r(); c.fillRect(1222 + i * 6.5, 850 - h, 4, h); } c.fillStyle = '#1a1c20'; c.fillRect(1340, 900, 20, 32); c.fillRect(1300, 924, 100, 8); gl(c, 1350, 800, 260, '80,170,255', .25);
    // headphones, mug
    c.strokeStyle = '#121418'; c.lineWidth = 12; c.beginPath(); c.ellipse(380, 928, 70, 52, 0, Math.PI, 0); c.stroke(); for (const hx of [310, 450]) { c.fillStyle = '#1c1e24'; c.beginPath(); c.ellipse(hx, 920, 26, 18, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,200,160,.25)'; c.fillRect(hx - 18, 906, 30, 4); }
    c.fillStyle = '#e8e0d4'; rr(c, 480, 880, 46, 54, 6); c.fill(); c.strokeStyle = '#e8e0d4'; c.lineWidth = 7; c.beginPath(); c.arc(528, 904, 13, -1.3, 1.3); c.stroke(); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(508, 880, 18, 54);
    micArm(c, 430, 930, 510, 600, 700, 760, 1); micArm(c, 1500, 930, 1420, 600, 1180, 760, -1);
    gl(c, 860, 800, 600, '255,190,140', .12);
    ENV.plant(c, r, 2470, 1110, 1.5);
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(60,110,160,.4)'], [.6, 'rgba(255,170,110,.35)'], [1, 'rgba(60,90,140,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .42 }); },

  // 2. boxing arena: ring canvas centre-low (canvas top edge y 1000, front apron y 1330). Feet y 1250.
  ring: (c, r, W, H, P) => {
    vg(c, 0, 0, W, H, [[0, '#04050a'], [.5, '#0a0c18'], [1, '#100c14']]);
    // tiers of crowd in the dark with phone lights
    for (let t = 0; t < 3; t++) { const y0 = 320 + t * 190; vg(c, 0, y0 - 20, W, 30, [[0, 'rgba(60,70,110,.0)'], [1, 'rgba(60,70,110,.35)']]); crowd(c, r, 0, W, y0, y0 + 160, { rows: 7, s0: 6 + t * 3, s1: 9 + t * 4, col: '#151724', lit: .25, rim: '120,150,255', phone: .03 + t * .01, shirt: ['#5a2a2a', '#2a3a5a', '#4a4a4a'] }); c.fillStyle = '#05060a'; c.fillRect(0, y0 + 170, W, 12); c.fillStyle = 'rgba(255,60,60,.6)'; c.fillRect(0, y0 + 170, W, 2); }
    crowd(c, r, 0, W, 900, 1040, { rows: 5, s0: 22, s1: 30, col: '#0e0f18', lit: .3, rim: '255,210,170', phone: .06 });
    // big screens
    for (const [sx, sy] of [[160, 90], [1880, 90]]) { c.fillStyle = '#050608'; c.fillRect(sx - 14, sy - 14, 548, 318); vg(c, sx, sy, 520, 290, [[0, '#16305a'], [1, '#0a1630']]); gl(c, sx + 260, sy + 145, 300, '80,140,255', .4); for (let k = 0; k < 290; k += 4) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(sx, sy + k, 520, 1); } c.strokeStyle = '#0c0d10'; c.lineWidth = 10; c.beginPath(); c.moveTo(sx + 100, 0); c.lineTo(sx + 100, sy); c.moveTo(sx + 420, 0); c.lineTo(sx + 420, sy); c.stroke(); }
    // lighting rig
    c.fillStyle = '#101218'; c.fillRect(600, 60, 1360, 26); c.fillRect(600, 140, 1360, 14); for (let x = 600; x < 1960; x += 40) { c.strokeStyle = '#181a22'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 86); c.lineTo(x + 40, 140); c.stroke(); }
    for (let i = 0; i < 8; i++) { const x = 680 + i * 170; c.fillStyle = '#1a1c22'; rr(c, x - 26, 154, 52, 46, 8); c.fill(); gl(c, x, 200, 80, '255,245,220', .9); cone(c, x, 200, 50, 760, 860, '255,240,210', .07); }
    // ring: posts, canvas, apron
    const L = 420, R = 2140, B = 1000, F = 1330, inset = 180;
    c.fillStyle = '#1a1018'; poly(c, [[L - 40, F], [R + 40, F], [R + 40, H], [L - 40, H]]); c.fill(); vg(c, L - 40, F, R - L + 80, 110, [[0, '#7a1a22'], [1, '#2a0a10']]); c.fillStyle = 'rgba(255,220,220,.35)'; c.fillRect(L - 40, F, R - L + 80, 4);
    const g = c.createLinearGradient(0, B, 0, F); g.addColorStop(0, '#b8b4ae'); g.addColorStop(1, '#e8e4dc'); c.fillStyle = g; poly(c, [[L + inset, B], [R - inset, B], [R + 40, F], [L - 40, F]]); c.fill();
    P2.fillStrokes(c, r, [L, B, R - L, F - B], (x, y) => true, { n: 2500, len: [30, 90], w: [4, 9], ang: 0, angJ: .05, al: .1, colFn: () => P2.jitter('#d8d2c8', r, 12) });
    gl(c, 1280, 1170, 700, '255,250,235', .4); c.strokeStyle = 'rgba(120,20,30,.5)'; c.lineWidth = 10; c.beginPath(); c.ellipse(1280, 1165, 230, 60, 0, 0, 7); c.stroke();
    const post = (x, y, h, col) => { vg(c, x - 12, y - h, 24, h, [[0, '#d8d8dc'], [1, '#7a7a80']]); c.fillStyle = col; rr(c, x - 22, y - h - 10, 44, h * .9, 10); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(x - 16, y - h - 4, 6, h * .8); };
    const ropeCols = ['#c8202a', '#f0ece4', '#2a48b0'];
    post(L + inset, B, 210, '#2a48b0'); post(R - inset, B, 210, '#c8202a');
    for (let k = 0; k < 3; k++) { const y = B - 60 - k * 55; c.strokeStyle = ropeCols[k]; c.lineWidth = 9; c.beginPath(); c.moveTo(L + inset, y); c.quadraticCurveTo(1280, y + 12, R - inset, y); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(L + inset, y - 3); c.quadraticCurveTo(1280, y + 9, R - inset, y - 3); c.stroke();
      for (const sd of [-1, 1]) { const x0 = sd < 0 ? L + inset : R - inset, x1 = sd < 0 ? L - 40 : R + 40, y1 = F - 90 - k * 90; c.strokeStyle = ropeCols[k]; c.lineWidth = 11; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y1); c.stroke(); } }
    post(L - 40, F, 380, '#f0ece4'); post(R + 40, F, 380, '#f0ece4');
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(220,230,255,${r.range(.02, .07)})`; c.beginPath(); c.arc(r() * W, r() * 900, r.range(20, 80), 0, 7); c.fill(); } c.restore();
    gl(c, 1280, 700, 1300, '120,90,200', .1);
    done(c, r, W, H, P, { vig: .55 }); },

  // 3. British supermarket exterior, dawn drizzle. Pavement/car park, feet y 1270.
  shopfront: (c, r, W, H, P) => { const hz = 760;
    vg(c, 0, 0, W, hz, [[0, '#5a6070'], [.5, '#a08a92'], [.85, '#d8a8a0'], [1, '#e8c0aa']]); ENV.clouds(c, r, W, 20, 420, 9, '#c8a8a8', '#8a8090', '#5a5a68');
    for (let i = 0; i < 14; i++) { const x = r() * W, h = r.range(40, 140); c.fillStyle = 'rgba(80,80,96,.6)'; c.fillRect(x, hz - h - 120, r.range(60, 180), h + 130); }
    // building
    const bx = 260, bw = 2040, top = 360, base = 1030;
    vg(c, bx, top, bw, 120, [[0, '#2a5a48'], [1, '#1e4436']]); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(bx, top, bw, 4); txt(c, 'SUPERMARKET', 1280, top + 62, 86, '#f2f0e6', { w: 900 }); txt(c, 'FRESH FOOD  ·  OPEN 7AM–10PM', 2000, top + 62, 26, '#d8e8c8', { w: 700 });
    ENV.box(c, r, bx, top + 120, bw, base - top - 120, '#a8a8a6', { edge: false }); for (let x = bx; x < bx + bw; x += 120) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, top + 120, 3, base - top - 120); }
    bricks(c, r, bx, base - 90, bw, 90, '#7a3a2a', { bw: 46, bh: 18 });
    // glazed frontage with warm interior
    const gx = 520, gw = 1520, gy = 560, gh = base - 90 - gy; vg(c, gx, gy, gw, gh, [[0, '#f6e6c0'], [1, '#d8b88a']]); gl(c, 1280, 800, 900, '255,230,170', .4);
    for (let i = 0; i < 9; i++) { const sx = gx + 40 + i * 170; c.fillStyle = 'rgba(120,90,70,.55)'; c.fillRect(sx, gy + 140, 110, 200); for (let k = 0; k < 4; k++) for (let j = 0; j < 8; j++) { c.fillStyle = P2.rgb(P2.jitter(r.pick(['#c85a3a', '#e0b040', '#5a9a4a', '#3a6aaa', '#e8e0d0']), r, 20), .8); c.fillRect(sx + 4 + j * 13, gy + 150 + k * 48, 10, 34); } }
    for (let i = 0; i < 6; i++) fluoro(c, gx + 60 + i * 250, gy + 40, 160, 10);
    c.fillStyle = 'rgba(40,50,60,.25)'; c.fillRect(gx, gy, gw, gh);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.12)'; for (const k of [0, 500, 1000]) { poly(c, [[gx + k + 100, gy], [gx + k + 260, gy], [gx + k + 120, gy + gh], [gx + k - 40, gy + gh]]); c.fill(); } c.restore();
    c.fillStyle = '#2a2c30'; c.fillRect(gx - 14, gy - 14, gw + 28, 14); for (let k = 0; k <= 8; k++) c.fillRect(gx - 7 + k * gw / 8, gy, 14, gh);
    // sliding doors centre with canopy
    c.fillStyle = '#1c1e22'; c.fillRect(1100, gy - 30, 360, gh + 30); vg(c, 1112, gy - 18, 336, gh + 18, [[0, '#fff2d0'], [1, '#e8cc9a']]); gl(c, 1280, 860, 400, '255,235,190', .5); c.fillStyle = '#1c1e22'; c.fillRect(1272, gy - 18, 16, gh + 18); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(1130, gy, 10, gh); c.fillRect(1300, gy, 10, gh);
    txt(c, 'ENTRANCE', 1280, gy - 64, 30, '#f0f0e8', { w: 700 }); c.fillStyle = '#1e4436'; poly(c, [[1040, gy - 40], [1520, gy - 40], [1560, gy - 4], [1000, gy - 4]]); c.fill();
    // pavement and car park
    const pv = base; vg(c, 0, pv, W, 70, [[0, '#7a7676'], [1, '#5a5658']]); c.fillStyle = '#9a9690'; c.fillRect(0, pv + 70, W, 14);
    vg(c, 0, pv + 84, W, H - pv - 84, [[0, '#3a3a40'], [1, '#26262c']]); P2.fillStrokes(c, r, [0, pv + 84, W, H - pv], () => true, { n: 5000, len: [10, 40], w: [3, 8], ang: 0, angJ: .3, al: .2, colFn: () => P2.jitter('#3a3a42', r, 14) });
    c.strokeStyle = 'rgba(240,240,230,.7)'; c.lineWidth = 8; for (let i = -6; i < 12; i++) { const x = i * 260; c.beginPath(); c.moveTo(x + 100, pv + 110); c.lineTo(x - 80, H); c.stroke(); }
    reflect(c, pv, 340, .45, 3);
    const snap = document.createElement('canvas'); snap.width = W; snap.height = H; snap.getContext('2d').drawImage(c.canvas, 0, 0);
    for (const [px, py, pw] of [[1280, 1230, 420], [560, 1170, 260], [1900, 1300, 340], [880, 1370, 300], [2300, 1160, 200], [300, 1330, 220]]) { const ph = pw * .14; c.save(); c.beginPath(); c.ellipse(px, py, pw, ph, 0, 0, 7); c.clip(); c.fillStyle = '#2a2830'; c.fillRect(px - pw, py - ph, pw * 2, ph * 2); c.translate(0, 2 * pv + 60); c.scale(1, -1); c.globalAlpha = .85; c.drawImage(snap, 0, 0); c.restore();
      c.save(); c.beginPath(); c.ellipse(px, py, pw, ph, 0, 0, 7); c.clip(); for (let k = 0; k < 5; k++) { const rx = px + r.range(-.6, .6) * pw, ry = py + r.range(-.5, .5) * ph; for (let j = 1; j < 4; j++) { c.strokeStyle = `rgba(255,240,225,${.22 / j})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse(rx, ry, j * 18, j * 4, 0, 0, 7); c.stroke(); } } c.restore();
      c.strokeStyle = 'rgba(20,18,22,.5)'; c.lineWidth = 4; c.beginPath(); c.ellipse(px, py, pw, ph, 0, Math.PI, 0); c.stroke(); c.strokeStyle = 'rgba(255,235,220,.3)'; c.lineWidth = 2; c.beginPath(); c.ellipse(px, py, pw, ph, 0, 0, Math.PI); c.stroke(); }
    // trolley bay right
    c.fillStyle = '#2a5a48'; c.fillRect(2080, 930, 360, 12); c.fillRect(2080, 930, 10, 160); c.fillRect(2430, 930, 10, 160);
    for (let i = 0; i < 6; i++) { const tx = 2110 + i * 40; c.strokeStyle = 'rgba(190,195,205,.85)'; c.lineWidth = 2; for (let k = 0; k < 7; k++) { c.beginPath(); c.moveTo(tx, 970 + k * 11); c.lineTo(tx + 200, 970 + k * 11); c.stroke(); } for (let k = 0; k < 10; k++) { c.beginPath(); c.moveTo(tx + k * 20, 970); c.lineTo(tx + k * 20 + 6, 1046); c.stroke(); } c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(tx + 20, 1080, 7, 0, 7); c.arc(tx + 190, 1080, 7, 0, 7); c.fill(); }
    // lamp posts
    for (const lx of [140, 2480]) { lampPost(c, lx, 1120, 760, '255,220,170', 1.2); }
    // red post box at left
    shadow(c, 330, 1100, 70, 12, .5); vg(c, 290, 920, 80, 180, [[0, '#d02a22'], [1, '#8a1410']]); c.fillStyle = '#d02a22'; c.beginPath(); c.ellipse(330, 920, 44, 24, 0, Math.PI, 0); c.fill(); c.fillStyle = '#1a0a08'; c.fillRect(304, 960, 52, 8); c.fillStyle = 'rgba(255,200,180,.35)'; c.fillRect(296, 920, 8, 170); c.fillStyle = '#1a1a1a'; c.fillRect(286, 1092, 88, 10);
    drizzle(c, r, W, H, 2200, .22);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(200,150,170,.35)'], [1, 'rgba(40,50,70,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // 4. British secondary school playground, autumn. Feet y 1260.
  playground: (c, r, W, H, P) => { const fy = 960;
    vg(c, 0, 0, W, fy, [[0, '#8a96a4'], [1, '#c8ccd0']]); ENV.clouds(c, r, W, 20, 360, 9, '#e0e2e4', '#aab0b8', '#7a828e');
    // trees behind
    const tree = (x, base, s) => { c.fillStyle = '#3a2a1e'; c.fillRect(x - 12 * s, base - 260 * s, 24 * s, 260 * s); bareTree(c, r, x, base - 240 * s, -Math.PI / 2, 120 * s, 16 * s, 5, '#3a2a1e');
      for (let i = 0; i < 260; i++) { const a = r() * 7, d = Math.sqrt(r()) * 190 * s, px = x + Math.cos(a) * d * 1.1, py = base - 380 * s + Math.sin(a) * d * .8; c.fillStyle = P2.rgb(P2.jitter(r.pick(['#c86a22', '#e0a030', '#a8401a', '#d88a2a', '#8a5a1a']), r, 18), .85); c.beginPath(); c.ellipse(px, py, r.range(10, 26) * s, r.range(7, 16) * s, r() * 3, 0, 7); c.fill(); } };
    tree(140, 860, 1.4); tree(2420, 860, 1.5); tree(560, 640, .9); tree(2020, 640, .9);
    // school building
    const sx = 360, sw = 1840, top = 280, base = 900;
    c.fillStyle = '#4a4a50'; poly(c, [[sx - 30, top], [sx + sw + 30, top], [sx + sw - 30, top - 100], [sx + 30, top - 100]]); c.fill(); for (let x = sx; x < sx + sw; x += 18) { c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x, top - 96, 2, 96); }
    bricks(c, r, sx, top, sw, base - top, '#9a4a36'); c.fillStyle = 'rgba(255,240,220,.08)'; c.fillRect(sx, top, sw, 40);
    for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) { if (row === 1 && i === 4) continue; const wx = sx + 70 + i * 200, wy = top + 50 + row * 280; c.fillStyle = '#f0ece4'; c.fillRect(wx - 10, wy - 10, 150, 200); vg(c, wx, wy, 130, 180, [[0, '#7a8aa0'], [1, '#3a4658']]); c.fillStyle = 'rgba(255,235,190,.35)'; if (r() < .5) c.fillRect(wx, wy + 90, 130, 90); c.fillStyle = '#f0ece4'; c.fillRect(wx + 62, wy, 6, 180); c.fillRect(wx, wy + 86, 130, 6); c.fillStyle = 'rgba(255,255,255,.25)'; poly(c, [[wx + 10, wy], [wx + 40, wy], [wx + 10, wy + 60]]); c.fill(); c.fillStyle = '#c8c0b0'; c.fillRect(wx - 16, wy + 190, 162, 12); }
    for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) { if (row === 1 && i === 4) continue; const wx = sx + 70 + i * 200, wy = top + 50 + row * 280; c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(wx, wy, wx + 130, wy + 180); g.addColorStop(0, 'rgba(220,225,235,.35)'); g.addColorStop(.5, 'rgba(200,210,225,.05)'); g.addColorStop(1, 'rgba(255,200,140,.15)'); c.fillStyle = g; c.fillRect(wx, wy, 130, 180); c.fillStyle = 'rgba(200,120,50,.25)'; c.beginPath(); c.arc(wx + (i < 4 ? 20 : 110), wy + 150, 40, 0, 7); c.fill(); c.restore(); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(wx - 10, wy + 180, 150, 6); }
    for (const dx of [sx + 20, sx + 1000, sx + sw - 30]) { c.fillStyle = '#26282c'; c.fillRect(dx, top - 6, 12, base - top); c.fillRect(dx - 6, top - 10, 24, 12); for (let y = top + 60; y < base; y += 120) c.fillRect(dx - 4, y, 20, 8); c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(dx + 2, top, 3, base - top); c.fillRect(dx - 10, base - 18, 30, 8); }
    for (let i = 0; i < 1400; i++) { c.fillStyle = r() < .5 ? 'rgba(40,20,10,.12)' : 'rgba(255,230,200,.08)'; c.fillRect(sx + r() * sw, top + r() * (base - top), r.range(4, 14), 3); }
    vg(c, sx, base - 120, sw, 120, [[0, 'rgba(30,40,30,0)'], [1, 'rgba(30,40,30,.25)']]);
    c.fillStyle = '#1e4a7a'; rr(c, 2210, 760, 220, 150, 8); c.fill(); c.strokeStyle = '#f0ece4'; c.lineWidth = 5; c.strokeRect(2222, 772, 196, 126); txt(c, 'HIGH SCHOOL', 2320, 810, 26, '#f0f0e8'); txt(c, 'Visitors please', 2320, 848, 18, '#d8e0ec', { w: 500 }); txt(c, 'report to reception', 2320, 874, 18, '#d8e0ec', { w: 500 }); c.fillStyle = '#26282c'; c.fillRect(2250, 910, 10, 50); c.fillRect(2380, 910, 10, 50);
    // door
    c.fillStyle = '#f0ece4'; c.fillRect(1185, 600, 190, 300); vg(c, 1200, 615, 160, 285, [[0, '#1e4a7a'], [1, '#12304e']]); c.fillStyle = 'rgba(200,220,240,.5)'; c.fillRect(1214, 630, 56, 120); c.fillRect(1290, 630, 56, 120); c.fillStyle = '#1e4a7a'; rr(c, 1140, 520, 280, 60, 6); c.fill(); txt(c, 'MAIN ENTRANCE', 1280, 550, 30, '#f0f0e8', { w: 800 });
    c.fillStyle = '#d8d0c4'; c.fillRect(sx, base - 16, sw, 16);
    // railings and gate either side
    const rail = (x0, x1, yb, h) => { c.fillStyle = '#16241c'; c.fillRect(x0, yb - h, x1 - x0, 8); c.fillRect(x0, yb - 24, x1 - x0, 6); for (let x = x0; x < x1; x += 22) { c.fillRect(x, yb - h - 10, 6, h + 10); poly(c, [[x - 4, yb - h - 10], [x + 10, yb - h - 10], [x + 3, yb - h - 28]]); c.fill(); } };
    rail(0, 360, 960, 220); rail(2200, W, 960, 220); c.fillStyle = '#16241c'; c.fillRect(350, 700, 20, 260); c.fillRect(2190, 700, 20, 260);
    // tarmac playground
    vg(c, 0, fy, W, H - fy, [[0, '#5a5a60'], [1, '#3a3a40']]); P2.fillStrokes(c, r, [0, fy, W, H - fy], () => true, { n: 7000, len: [10, 40], w: [3, 9], ang: 0, angJ: .4, al: .22, colFn: () => P2.jitter('#55555c', r, 16) });
    c.fillStyle = '#6a6a6e'; c.fillRect(0, fy - 4, W, 12);
    // hopscotch (perspective) left of centre, painted yellow
    const hop = (cx, y0, y1) => { const n = 7; let num = 1; for (let i = n - 1; i >= 0; i--) { const t0 = i / n, t1 = (i + 1) / n, ya = y0 + (y1 - y0) * t0, yb = y0 + (y1 - y0) * t1, w = 80 + 60 * t1, dbl = i % 3 === 1; c.fillStyle = 'rgba(240,205,70,.1)'; c.strokeStyle = 'rgba(240,210,80,.85)'; c.lineWidth = 3 + 4 * t1; const cells = dbl ? [cx - w, cx] : [cx - w / 2];
      for (const x of cells) { c.fillRect(x, ya, w, yb - ya); c.strokeRect(x, ya, w, yb - ya); txt(c, String(num++), x + w / 2, (ya + yb) / 2, 16 + 24 * t1, 'rgba(245,215,90,.85)'); } } };
    hop(560, 1000, 1400);
    c.strokeStyle = 'rgba(240,240,235,.6)'; c.lineWidth = 6; c.beginPath(); c.ellipse(1900, 1200, 300, 70, 0, 0, 7); c.stroke(); c.beginPath(); c.moveTo(1600, 1200); c.lineTo(2200, 1200); c.stroke();
    // benches
    const bench = (x, y, s) => { shadow(c, x, y + 4, 180 * s, 16 * s, .5); c.fillStyle = '#1a1a1c'; c.fillRect(x - 140 * s, y - 60 * s, 10 * s, 60 * s); c.fillRect(x + 130 * s, y - 60 * s, 10 * s, 60 * s); for (let k = 0; k < 3; k++) { vg(c, x - 160 * s, y - 70 * s - k * 30 * s, 320 * s, 16 * s, [[0, '#9a6a3a'], [1, '#5a3a1e']]); } };
    bench(160, 1060, 1); bench(2400, 1060, 1);
    // leaves on the ground
    for (const [tx, ty] of [[140, 980], [2420, 980]]) for (let i = 0; i < 400; i++) { const x = tx + r.gauss() * 260, y = ty + Math.abs(r.gauss()) * 60; c.fillStyle = P2.rgb(P2.jitter(r.pick(['#c86a22', '#e0a030', '#a8401a', '#7a4a1a']), r, 20), .9); c.beginPath(); c.ellipse(x, y, 10, 5, r() * 3, 0, 7); c.fill(); }
    for (let i = 0; i < 700; i++) { const x = r() * W, y = fy + Math.pow(r(), .7) * (H - fy), s = .5 + (y - fy) / 400; c.fillStyle = P2.rgb(P2.jitter(r.pick(['#c86a22', '#e0a030', '#a8401a', '#7a4a1a']), r, 20), .85); c.beginPath(); c.ellipse(x, y, 9 * s, 4 * s, r() * 3, 0, 7); c.fill(); }
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,240,220,.3)'], [1, 'rgba(40,40,60,.35)']]); c.restore();
    done(c, r, W, H, P, { vig: .38 }); },

  // 5. supermarket drinks aisle: front-on fridge bay centre with empty shelf (y 700-900, shelf lip 905), aisles receding at sides. Feet y 1290.
  shelf: (c, r, W, H, P) => { const vx = 1280, vy = 640, fy = 1100;
    vg(c, 0, 0, W, H, [[0, '#d8dcd8'], [1, '#a8aca8']]);
    // ceiling with lights receding
    vg(c, 0, 0, W, 200, [[0, '#e8ece8'], [1, '#c8ccc8']]);
    for (let k = 0; k < 8; k++) { const t = Math.pow(k / 8, 1.5); fluoro(c, 300 + t * 300, 40 + t * 120, 400 - t * 300, 16 - t * 10); fluoro(c, 1860 - t * 300 + t * 0, 40 + t * 120, 400 - t * 300, 16 - t * 10); }
    // side aisles: receding fridge walls with products
    const sideWall = (dir) => { const xNear = dir < 0 ? 0 : W, xFar = dir < 0 ? 700 : 1860; const yTn = 150, yBn = fy + 40, yTf = 300, yBf = 1000;
      const g = c.createLinearGradient(xNear, 0, xFar, 0); g.addColorStop(0, '#2a3036'); g.addColorStop(1, '#4a5258'); c.fillStyle = g; poly(c, [[xNear, yTn], [xFar, yTf], [xFar, yBf], [xNear, yBn]]); c.fill();
      for (let s = 0; s < 6; s++) { const f = s / 6, f2 = (s + 1) / 6; for (let i = 0; i < 40; i++) { const t = i / 40, t2 = (i + .8) / 40, x1 = xNear + (xFar - xNear) * t, x2 = xNear + (xFar - xNear) * t2, yt = yTn + (yTf - yTn) * t, yb = yBn + (yBf - yBn) * t, y1 = yt + (yb - yt) * (f + .02), y2 = yt + (yb - yt) * (f2 - .03);
        c.fillStyle = P2.rgb(P2.jitter(r.pick(['#d84a3a', '#3a8ad8', '#e8c040', '#5ac06a', '#e86aa8', '#f0f0f0', '#2a2a2a', '#ff8a2a']), r, 20), .9); c.fillRect(Math.min(x1, x2), y1, Math.abs(x2 - x1), y2 - y1); }
        const yt0 = yTn + (yTn - yTn), shy = (t) => (yTn + (yTf - yTn) * t) + ((yBn + (yBf - yBn) * t) - (yTn + (yTf - yTn) * t)) * f2; c.strokeStyle = '#e8eef2'; c.lineWidth = 8 * (1 - .6); c.beginPath(); c.moveTo(xNear, shy(0)); c.lineTo(xFar, shy(1)); c.stroke(); c.strokeStyle = 'rgba(255,230,80,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(xNear, shy(0) + 8); c.lineTo(xFar, shy(1) + 3); c.stroke(); }
      c.save(); c.globalCompositeOperation = 'screen'; for (let k = 0; k < 8; k++) { const t = k / 8, x = xNear + (xFar - xNear) * t; c.fillStyle = 'rgba(200,230,255,.08)'; poly(c, [[x, yTn + (yTf - yTn) * t], [x + dir * -40, yTn + (yTf - yTn) * t], [x + dir * -40, yBn + (yBf - yBn) * t], [x, yBn + (yBf - yBn) * t]]); c.fill(); c.fillStyle = 'rgba(40,40,46,.9)'; c.fillRect(x - 4, yTn + (yTf - yTn) * t, 8, (yBn - yTn) * (1 - t) + (yBf - yTf) * t); } c.restore();
      c.fillStyle = '#e8eaec'; poly(c, [[xNear, yTn - 40], [xFar, yTf - 20], [xFar, yTf], [xNear, yTn]]); c.fill(); };
    sideWall(-1); sideWall(1);
    // centre fridge bay
    const bx = 700, bw = 1160, by = 300, bb = 1000; ENV.box(c, r, bx - 20, by - 50, bw + 40, 50, '#e8eaec', { hi: true }); txt(c, 'SOFT DRINKS', vx, by - 25, 34, '#3a4a5a', { w: 800 });
    vg(c, bx, by, bw, bb - by, [[0, '#1e2a34'], [1, '#2a3640']]); gl(c, vx, 450, 700, '200,235,255', .35);
    const shelfY = [500, 700, 905]; for (const sy of [500, 700]) { for (let x = bx + 20; x < bx + bw - 30; x += 34) { const h = r.range(120, 150), col = r.pick(['#d84a3a', '#3a8ad8', '#e8c040', '#5ac06a', '#e86aa8', '#ff8a2a', '#8a4ad8']); c.fillStyle = P2.rgb(P2.jitter(col, r, 16)); rr(c, x, sy - h, 26, h, 6); c.fill(); c.fillRect(x + 8, sy - h - 16, 10, 18); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x + 4, sy - h + 10, 5, h - 20); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(x + 2, sy - h * .5, 22, 18); } }
    for (const sy of shelfY) { vg(c, bx, sy, bw, 18, [[0, '#f4f6f8'], [1, '#a8b0b8']]); c.fillStyle = '#f4e040'; c.fillRect(bx, sy + 18, bw, 20); for (let x = bx + 40; x < bx + bw; x += 140) { c.fillStyle = '#fff'; c.fillRect(x, sy + 20, 60, 16); c.fillStyle = '#c82a2a'; c.fillRect(x + 40, sy + 22, 16, 12); } }
    gl(c, vx, 800, 600, '220,240,255', .3); // empty lit shelf
    for (let x = bx + 20; x < bx + bw - 30; x += 40) { const h = r.range(30, 60); c.fillStyle = P2.rgb(P2.jitter('#6a7a8a', r, 10), .6); c.fillRect(x, bb - h, 30, h); }
    c.fillStyle = '#3a4248'; c.fillRect(bx - 20, by, 20, bb - by); c.fillRect(bx + bw, by, 20, bb - by); c.fillRect(vx - 8, by, 16, bb - by);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(220,240,255,.08)'; poly(c, [[bx + 80, by], [bx + 260, by], [bx + 120, bb], [bx - 60, bb]]); c.fill(); poly(c, [[bx + 700, by], [bx + 780, by], [bx + 640, bb], [bx + 560, bb]]); c.fill(); c.restore();
    ENV.box(c, r, bx - 20, bb, bw + 40, fy - bb + 40 - 140, '#c8ccd0', { edge: false });
    // polished floor with tile lines and reflections
    vg(c, 0, fy - 100, W, H - fy + 100, [[0, '#b8bcbc'], [1, '#8a8e90']]); c.fillStyle = '#b8bcbc'; poly(c, [[0, fy + 40], [700, 1000], [1860, 1000], [W, fy + 40], [W, H], [0, H]]); c.fill();
    c.save(); c.beginPath(); c.rect(0, 1000, W, H - 1000); c.clip(); persLines(c, 1000, H, vx, 6, 'rgba(90,96,100,.35)', 2); c.restore();
    reflect(c, 1000, 440, .35, 5); gl(c, vx, 1200, 900, '255,255,255', .12);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(230,245,255,.3)'], [1, 'rgba(60,70,80,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .35 }); },

  // 6. modern podcast studio. Desk centre (top y 960); floor in front, feet y 1270.
  podcast: (c, r, W, H, P) => { const fy = 1040;
    vg(c, 0, 0, W, fy, [[0, '#121218'], [1, '#1c1c26']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, fy], [0, fy]], '#18181f', { density: 260, len: [40, 120], w: [6, 14], ang: Math.PI / 2, angJ: .05, al: .22, topLight: -.1, botDark: -.15 });
    // vertical wood slat panel behind centre
    for (let x = 700; x < 1860; x += 28) { vg(c, x, 120, 18, fy - 120, [[0, '#3a2a20'], [1, '#2a1c14']]); c.fillStyle = 'rgba(255,180,120,.12)'; c.fillRect(x, 120, 3, fy - 120); }
    gl(c, 1280, 500, 700, '255,150,90', .14);
    // LED strips
    const led = (x, y, w, h, col) => { gl(c, x + w / 2, y + h / 2, Math.max(w, h) * .6, col, .35); c.fillStyle = `rgba(${col},1)`; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(x + (h > w ? 1 : 0), y + (h > w ? 0 : 1), h > w ? w - 2 : w, h > w ? h : h - 2); };
    led(0, 100, W, 6, '170,80,255'); led(690, 120, 6, fy - 120, '170,80,255'); led(1864, 120, 6, fy - 120, '170,80,255');
    // neon squiggle sign (no words)
    const sq = (col, lw, a) => { c.strokeStyle = `rgba(${col},${a})`; c.lineWidth = lw; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); for (let i = 0; i <= 120; i++) { const t = i / 120, x = 1000 + t * 560, y = 330 + Math.sin(t * 14) * 50 * Math.sin(t * 3.1) + Math.cos(t * 5) * 20; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); };
    gl(c, 1280, 330, 500, '255,60,180', .4); sq('255,60,180', 36, .25); sq('255,80,190', 16, .9); sq('255,230,250', 5, 1);
    c.strokeStyle = 'rgba(60,230,255,.9)'; c.lineWidth = 12; c.beginPath(); c.arc(1600, 300, 46, 0, 7); c.stroke(); gl(c, 1600, 300, 160, '60,230,255', .5); c.strokeStyle = '#e8ffff'; c.lineWidth = 4; c.beginPath(); c.arc(1600, 300, 46, 0, 7); c.stroke();
    // shelves with trinkets on the left
    for (let k = 0; k < 4; k++) { const sy = 330 + k * 170; ENV.box(c, r, 120, sy, 460, 16, '#5a4030', { edge: false }); gl(c, 350, sy + 20, 260, '255,190,120', .15); let x = 140;
      while (x < 560) { const kind = r.int(0, 3); if (kind === 0) { const h = r.range(80, 130); c.fillStyle = P2.rgb(P2.jitter(r.pick(['#7a2e2a', '#2f4a6a', '#c9b48a', '#2a2a2a']), r, 14)); c.fillRect(x, sy - h, 22, h); x += 24; } else if (kind === 1) { c.fillStyle = r.pick(['#e8c040', '#d0d4dc', '#c84a3a']); c.beginPath(); c.arc(x + 30, sy - 34, 30, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.arc(x + 20, sy - 44, 9, 0, 7); c.fill(); x += 70; } else if (kind === 2) { c.fillStyle = '#d8a83a'; poly(c, [[x + 10, sy], [x + 50, sy], [x + 40, sy - 30], [x + 56, sy - 90], [x + 4, sy - 90], [x + 20, sy - 30]]); c.fill(); c.fillStyle = 'rgba(255,240,180,.5)'; c.fillRect(x + 12, sy - 86, 8, 50); x += 70; } else { ENV.pot(c, r, x + 30, sy, .5, '#e8e0d4'); for (let i = 0; i < 8; i++) { c.fillStyle = '#4a8a44'; c.beginPath(); c.ellipse(x + 30 + r.gauss() * 20, sy - 50 - r() * 30, 14, 6, r() * 3, 0, 7); c.fill(); } x += 70; } } }
    // sofa on the right with a floor lamp
    sofa(c, 1960, 1000, 520, .9, '#3a4a6a', { pillow: '#c8603a' }); ENV.lamp(c, r, 2500, 1000, 1.6);
    ENV.plant(c, r, 640, 1040, 1.6); ENV.plant(c, r, 1920, 1040, 1.3);
    // floor
    planks(c, r, fy, H, '#2a2026', 10); c.fillStyle = '#0a0a0e'; c.fillRect(0, fy - 14, W, 14); reflect(c, fy, 240, .2, 6);
    ENV.rug(c, r, 1280, 1230, 1500, 260, '#2a2a3a', '#aa50ff');
    // desk
    shadow(c, 1280, 1140, 640, 30, .6); vg(c, 680, 960, 1200, 36, [[0, '#3a3a44'], [1, '#22222a']]); c.fillStyle = 'rgba(200,160,255,.5)'; c.fillRect(680, 960, 1200, 3);
    vg(c, 740, 996, 1080, 120, [[0, '#1a1a22'], [1, '#0e0e14']]); c.fillStyle = 'rgba(170,80,255,.9)'; c.fillRect(740, 1110, 1080, 5); gl(c, 1280, 1114, 600, '170,80,255', .25);
    micArm(c, 820, 960, 900, 640, 1060, 800, 1); micArm(c, 1740, 960, 1660, 640, 1500, 800, -1);
    c.fillStyle = '#0c0c10'; rr(c, 1180, 880, 200, 80, 8); c.fill(); for (let i = 0; i < 6; i++) { c.fillStyle = r.pick(['#888', '#e0b040', '#40c0a0']); c.beginPath(); c.arc(1200 + i * 32, 905, 7, 0, 7); c.fill(); c.fillStyle = '#ddd'; c.fillRect(1196 + i * 32, 925, 8, 22); }
    c.fillStyle = '#e8e0d4'; rr(c, 960, 912, 40, 48, 6); c.fill(); c.fillStyle = '#1a1a1a'; rr(c, 1560, 908, 40, 52, 6); c.fill();
    done(c, r, W, H, P, { vig: .48 }); },

  // 7. Washington press podium outdoors. Lectern centre x 1280 (top y 900). Feet y 1290 (character behind lectern).
  podium: (c, r, W, H, P) => { const fy = 1060;
    vg(c, 0, 0, W, 500, [[0, '#6a9ad0'], [1, '#c8dcec']]); ENV.clouds(c, r, W, 20, 300, 6, '#ffffff', '#d8e4f0', '#a8b8cc');
    // neoclassical facade
    vg(c, 0, 120, W, 160, [[0, '#ece6da'], [1, '#c8c0b0']]); poly(c, [[300, 120], [W - 300, 120], [1280, 20]]); c.fillStyle = '#e4ded2'; c.fill(); c.strokeStyle = 'rgba(120,110,90,.5)'; c.lineWidth = 4; c.stroke();
    for (let x = 0; x < W; x += 40) { c.fillStyle = 'rgba(150,140,120,.4)'; c.fillRect(x, 250, 20, 18); }
    vg(c, 0, 280, W, fy - 280, [[0, '#8a8478'], [1, '#6a6458']]);
    for (let i = 0; i < 11; i++) { const x = 60 + i * 245; const g = c.createLinearGradient(x - 44, 0, x + 44, 0); g.addColorStop(0, '#b8b0a0'); g.addColorStop(.35, '#f6f2ea'); g.addColorStop(1, '#a8a090'); c.fillStyle = g; c.fillRect(x - 44, 300, 88, 640); for (let k = -30; k <= 30; k += 15) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x + k, 300, 4, 640); } c.fillStyle = '#e8e2d6'; c.fillRect(x - 60, 280, 120, 24); c.fillRect(x - 60, 936, 120, 26); }
    c.fillStyle = '#d8d2c4'; c.fillRect(0, 960, W, 30); for (let k = 0; k < 3; k++) { vg(c, 0, 990 + k * 24, W, 24, [[0, '#e4ded2'], [1, '#a8a294']]); }
    // flags row
    for (let i = 0; i < 6; i++) { const x = 760 + i * 220 + (i > 2 ? 0 : 0); if (i === 2 || i === 3) continue; c.fillStyle = '#c8a84a'; c.fillRect(x - 5, 420, 10, 640); c.beginPath(); c.arc(x, 414, 12, 0, 7); c.fill(); wavingFlag(c, true, x + 5, 440, 200, 120, 14, i); }
    for (const x of [1170, 1390]) { hangFlag(c, x === 1170, x, 520, 170, 300); }
    // ground: paved plaza
    vg(c, 0, fy, W, H - fy, [[0, '#a8a498'], [1, '#7a766c']]); c.save(); c.beginPath(); c.rect(0, fy, W, H - fy); c.clip(); persLines(c, fy, H, 1280, 8, 'rgba(60,56,50,.3)', 2); c.restore();
    P2.fillStrokes(c, r, [0, fy, W, H - fy], () => true, { n: 4000, len: [20, 60], w: [4, 9], ang: 0, angJ: .2, al: .12, colFn: () => P2.jitter('#9a968a', r, 12) });
    // lectern
    shadow(c, 1280, 1310, 300, 26, .55); const g = c.createLinearGradient(1120, 0, 1440, 0); g.addColorStop(0, '#3a2414'); g.addColorStop(.4, '#7a4e2a'); g.addColorStop(1, '#2a180c'); c.fillStyle = g; poly(c, [[1130, 960], [1430, 960], [1400, 1310], [1160, 1310]]); c.fill();
    vg(c, 1110, 920, 340, 44, [[0, '#8a5a32'], [1, '#4a2c16']]); c.fillStyle = 'rgba(255,230,190,.5)'; c.fillRect(1110, 920, 340, 3);
    for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(1170 + k * 40, 970, 3, 330); }
    c.fillStyle = '#1e2a4a'; c.beginPath(); c.arc(1280, 1090, 82, 0, 7); c.fill(); c.strokeStyle = '#d8b050'; c.lineWidth = 8; c.stroke(); c.lineWidth = 3; c.beginPath(); c.arc(1280, 1090, 64, 0, 7); c.stroke(); for (let k = 0; k < 13; k++) { const a = k / 13 * 7; c.fillStyle = '#d8b050'; c.beginPath(); c.arc(1280 + Math.cos(a) * 50, 1090 + Math.sin(a) * 50, 4, 0, 7); c.fill(); } c.fillStyle = 'rgba(255,255,255,.15)'; c.beginPath(); c.arc(1260, 1070, 30, 0, 7); c.fill();
    c.strokeStyle = '#1a1a1a'; c.lineWidth = 4; for (const mx of [1250, 1310]) { c.beginPath(); c.moveTo(mx, 920); c.quadraticCurveTo(mx, 870, mx + (mx < 1280 ? -10 : 10), 840); c.stroke(); c.fillStyle = '#1a1a1a'; rr(c, mx + (mx < 1280 ? -20 : 0), 822, 20, 30, 8); c.fill(); }
    camTripod(c, 260, 1360, 1.15, 1); camTripod(c, 2300, 1360, 1.15, -1); camTripod(c, 560, 1250, .85, 1); camTripod(c, 2000, 1250, .85, -1);
    gl(c, 1800, 200, 900, '255,250,230', .2);
    done(c, r, W, H, P, { vig: .36 }); },

  // 8. bottling plant: conveyor runs across, belt top y ~880-900. Feet y 1290 in front.
  factory: (c, r, W, H, P) => { const fy = 1020;
    vg(c, 0, 0, W, fy, [[0, '#1a222c'], [1, '#36424e']]);
    // roof trusses and skylights
    for (let x = -100; x < W; x += 320) { c.strokeStyle = '#141a20'; c.lineWidth = 10; c.beginPath(); c.moveTo(x, 160); c.lineTo(x + 160, 40); c.lineTo(x + 320, 160); c.stroke(); c.lineWidth = 4; c.beginPath(); c.moveTo(x + 160, 40); c.lineTo(x + 160, 160); c.stroke(); }
    c.fillStyle = '#141a20'; c.fillRect(0, 156, W, 12);
    for (let i = 0; i < 6; i++) { const x = 140 + i * 440; c.fillStyle = '#20262c'; poly(c, [[x - 70, 168], [x + 70, 168], [x + 50, 200], [x - 50, 200]]); c.fill(); gl(c, x, 210, 140, '200,225,255', .7); cone(c, x, 205, 90, 700, 820, '190,215,255', .07); }
    // back wall: tanks and pipes
    for (let i = 0; i < 5; i++) { const x = 160 + i * 520, w = 260, top = 300; const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#5a6672'); g.addColorStop(.3, '#c8d4de'); g.addColorStop(.5, '#8a96a2'); g.addColorStop(1, '#3a444e'); c.fillStyle = g; rr(c, x, top, w, 460, 60); c.fill(); c.fillStyle = 'rgba(0,0,0,.25)'; for (let k = 0; k < 4; k++) c.fillRect(x, top + 80 + k * 100, w, 4); c.fillStyle = '#2a3036'; c.fillRect(x + 30, top + 460, 14, 260); c.fillRect(x + w - 44, top + 460, 14, 260); }
    for (let k = 0; k < 4; k++) { const y = 250 + k * 34; const g = c.createLinearGradient(0, y, 0, y + 18); g.addColorStop(0, '#9aa6b0'); g.addColorStop(.5, '#e0e8ee'); g.addColorStop(1, '#4a5660'); c.fillStyle = g; c.fillRect(0, y, W, 18); for (let x = 100 + k * 60; x < W; x += 400) { c.fillStyle = '#5a646e'; c.fillRect(x, y - 4, 16, 26); } }
    for (let i = 0; i < 9; i++) { const x = 400 + i * 260; const g = c.createLinearGradient(x, 0, x + 16, 0); g.addColorStop(0, '#5a6670'); g.addColorStop(.5, '#d0dae2'); g.addColorStop(1, '#4a5660'); c.fillStyle = g; c.fillRect(x, 370, 16, 400); }
    vg(c, 0, 700, W, fy - 700, [[0, 'rgba(30,40,50,.0)'], [1, 'rgba(30,40,50,.6)']]);
    for (let i = 0; i < 7; i++) { const x = 60 + i * 380; c.fillStyle = 'rgba(40,50,60,.8)'; c.fillRect(x, 600, 220, 200); c.fillStyle = 'rgba(120,200,255,.5)'; c.fillRect(x + 20, 620, 50, 30); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x, 600, 220, 4); for (let k = 0; k < 4; k++) { c.fillStyle = r.pick(['#40e070', '#e8c020', '#e04040']); c.fillRect(x + 90 + k * 24, 630, 10, 10); } }
    c.fillStyle = '#20262c'; c.fillRect(0, 470, W, 16); c.fillStyle = 'rgba(200,225,255,.3)'; c.fillRect(0, 470, W, 2); c.strokeStyle = '#2a3238'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 420); c.lineTo(W, 420); c.moveTo(0, 445); c.lineTo(W, 445); c.stroke(); for (let x = 0; x < W; x += 60) c.fillRect(x, 420, 4, 50); for (let x = 200; x < W; x += 600) { c.fillStyle = '#20262c'; c.fillRect(x, 486, 12, 300); }
    for (let k = 0; k < 3; k++) { const x = 500 + k * 820; c.strokeStyle = '#7a8692'; c.lineWidth = 14; c.beginPath(); c.moveTo(x, 168); c.lineTo(x, 300); c.quadraticCurveTo(x, 340, x + 40, 340); c.lineTo(x + 200, 340); c.stroke(); }
    c.save(); c.globalCompositeOperation = 'screen'; vg(c, 0, 380, W, 500, [[0, 'rgba(140,170,210,0)'], [.5, 'rgba(140,170,210,.12)'], [1, 'rgba(140,170,210,0)']]); c.restore();
    // filling carousels on the conveyor
    const carousel = (x) => { c.fillStyle = '#2a3238'; c.fillRect(x - 12, 520, 24, 140); const g = c.createLinearGradient(x - 200, 0, x + 200, 0); g.addColorStop(0, '#4a5660'); g.addColorStop(.4, '#e0e8ee'); g.addColorStop(1, '#3a444e'); c.fillStyle = g; c.beginPath(); c.ellipse(x, 660, 200, 40, 0, 0, 7); c.fill(); c.fillRect(x - 200, 600, 400, 60); c.beginPath(); c.ellipse(x, 600, 200, 40, 0, 0, 7); c.fillStyle = '#c8d2da'; c.fill();
      for (let k = 0; k < 11; k++) { const a = k / 11 * Math.PI, nx = x + Math.cos(a) * 180, ny = 680 + Math.sin(a) * 36; c.fillStyle = '#9aa6b0'; c.fillRect(nx - 6, ny, 12, 120 - Math.sin(a) * 20); c.fillStyle = '#5a646e'; c.fillRect(nx - 10, ny + 110 - Math.sin(a) * 20, 20, 12); }
      c.fillStyle = '#3a444e'; c.fillRect(x - 230, 520, 460, 20); c.fillStyle = 'rgba(200,225,255,.35)'; c.fillRect(x - 230, 520, 460, 4);
      c.strokeStyle = 'rgba(180,200,220,.4)'; c.lineWidth = 3; c.strokeRect(x - 240, 540, 480, 330); c.fillStyle = 'rgba(160,200,230,.06)'; c.fillRect(x - 240, 540, 480, 330); };
    carousel(700); carousel(1860);
    // safety yellow floor
    vg(c, 0, fy, W, H - fy, [[0, '#4a525a'], [1, '#2e343a']]); P2.fillStrokes(c, r, [0, fy, W, H - fy], () => true, { n: 5000, len: [20, 80], w: [4, 10], ang: 0, angJ: .1, al: .15, colFn: () => P2.jitter('#454d55', r, 10) });
    for (const [y, h] of [[1050, 14], [1400, 22]]) { c.fillStyle = '#e8c020'; c.fillRect(0, y, W, h); }
    for (let x = -40; x < W; x += 80) { c.fillStyle = '#e8c020'; poly(c, [[x, 1170], [x + 40, 1170], [x + 10, 1190], [x - 30, 1190]]); c.fill(); }
    reflect(c, fy, 300, .25, 6);
    // conveyor line
    const cy = 880; shadow(c, 1280, 1050, 1400, 30, .6);
    for (let x = 80; x < W; x += 280) { c.fillStyle = '#2a3036'; c.fillRect(x, cy + 50, 18, 1040 - cy - 50); c.fillRect(x - 20, 1036, 58, 10); }
    const bg = c.createLinearGradient(0, cy - 20, 0, cy + 50); bg.addColorStop(0, '#e0e8ee'); bg.addColorStop(.3, '#8a96a0'); bg.addColorStop(1, '#3a444e'); c.fillStyle = bg; c.fillRect(0, cy - 20, W, 70); c.fillStyle = '#1a1e22'; c.fillRect(0, cy, W, 14); for (let x = 0; x < W; x += 24) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x, cy, 12, 14); }
    c.fillStyle = 'rgba(220,235,255,.7)'; c.fillRect(0, cy - 20, W, 3); c.fillStyle = '#c8d2da'; c.fillRect(0, cy - 48, W, 8); c.fillRect(0, cy + 30, W, 6);
    // a few empty clear bottles stranded on the belt near the carousels
    for (const x of [420, 460, 1580, 1620, 2240]) { c.fillStyle = 'rgba(200,225,240,.35)'; rr(c, x - 12, cy - 70, 24, 70, 8); c.fill(); c.fillRect(x - 5, cy - 92, 10, 24); c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(x - 8, cy - 64, 4, 56); }
    // control panel and hanging warning sign
    ENV.box(c, r, 2340, 700, 180, 330, '#4a5660'); c.fillStyle = '#0a1018'; c.fillRect(2360, 730, 140, 90); gl(c, 2430, 775, 120, '80,200,255', .3); c.fillStyle = '#40e070'; c.beginPath(); c.arc(2380, 860, 10, 0, 7); c.fill(); c.fillStyle = '#e04040'; c.beginPath(); c.arc(2420, 860, 10, 0, 7); c.fill();
    c.fillStyle = '#e8c020'; c.fillRect(1180, 340, 200, 80); c.fillStyle = '#1a1a1a'; for (let k = 0; k < 5; k++) poly(c, [[1180 + k * 40, 340], [1200 + k * 40, 340], [1180 + k * 40 + 0, 360]]), c.fill(); txt(c, 'CAUTION', 1280, 390, 34, '#1a1a1a', { w: 900 });
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 160; i++) { c.fillStyle = `rgba(160,190,230,${r.range(.02, .05)})`; c.beginPath(); c.arc(r() * W, 300 + r() * 600, r.range(40, 120), 0, 7); c.fill(); } c.restore();
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(120,170,230,.4)'], [1, 'rgba(20,30,50,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // 9. police line-up room. Floor line y 1300; positions 1-6 at x 380,680,980,1280... (300 apart, from 530). Height lines every 64px above 1300.
  lineup: (c, r, W, H, P) => { const fy = 1300;
    vg(c, 0, 0, W, fy, [[0, '#7a8288'], [1, '#a8b0b4']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, fy], [0, fy]], '#98a0a6', { density: 260, len: [40, 120], w: [6, 14], ang: 0, angJ: .05, al: .18, topLight: -.12, botDark: -.05 });
    // height chart
    for (let k = 0; k <= 18; k++) { const y = fy - k * 64, major = k % 3 === 0; c.fillStyle = major ? 'rgba(20,24,28,.85)' : 'rgba(20,24,28,.45)'; c.fillRect(120, y - (major ? 3 : 1.5), W - 240, major ? 6 : 3); if (major) { const ft = k / 3; txt(c, `${ft}'`, 70, y, 40, '#1a1e22', { w: 800 }); txt(c, `${ft}'`, W - 70, y, 40, '#1a1e22', { w: 800 }); } else { txt(c, `${Math.floor(k / 3)}'${(k % 3) * 4}"`, W - 70, y, 20, 'rgba(26,30,34,.7)', { w: 700 }); } }
    for (let i = 0; i < 260; i++) { const x = 120 + r() * (W - 240), y = r.range(700, fy - 20); c.strokeStyle = `rgba(40,40,46,${r.range(.05, .2)})`; c.lineWidth = r.range(2, 6); c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(-60, 60), y + r.range(-14, 14)); c.stroke(); }
    for (let i = 0; i < 40; i++) { const x = r() * W, y = r() * fy; c.fillStyle = `rgba(60,58,50,${r.range(.04, .1)})`; c.beginPath(); c.ellipse(x, y, r.range(20, 90), r.range(10, 50), r() * 3, 0, 7); c.fill(); }
    for (let x = 0; x < W; x += 320) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x, 0, 3, fy); }
    // overhead harsh lights
    c.fillStyle = '#2a2e32'; c.fillRect(0, 0, W, 60); for (let i = 0; i < 5; i++) { const x = 260 + i * 510; fluoro(c, x, 30, 280, 20); cone(c, x + 140, 50, 300, 700, 1300, '240,248,255', .08); }
    for (let i = 0; i < 6; i++) { const x = 530 + i * 300; gl(c, x, 200, 360, '255,255,250', .28); gl(c, x, 700, 300, '255,255,255', .12); shadow(c, x, fy + 60, 160, 30, .3); }
    // floor
    vg(c, 0, fy, W, H - fy, [[0, '#4a5054'], [1, '#30353a']]); c.fillStyle = '#1a1e22'; c.fillRect(0, fy - 4, W, 10);
    for (let i = 0; i < 6; i++) { const x = 530 + i * 300; c.fillStyle = 'rgba(240,240,235,.85)'; c.fillRect(x - 90, fy + 40, 180, 6); txt(c, String(i + 1), x, fy + 92, 64, 'rgba(245,245,240,.9)', { w: 900 }); shadow(c, x, fy + 10, 120, 12, .35); }
    // one-way glass edge: dark frame left and top, reflective sheen
    c.fillStyle = 'rgba(10,14,20,.88)'; c.fillRect(0, 0, 70, H); c.fillRect(0, H - 30, W, 30); c.fillStyle = '#3a4048'; c.fillRect(70, 0, 10, H);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(180,210,240,.08)'; poly(c, [[80, 0], [500, 0], [140, H], [80, H]]); c.fill(); c.fillStyle = 'rgba(200,225,255,.05)'; poly(c, [[1900, 0], [2000, 0], [1700, H], [1600, H]]); c.fill(); c.restore();
        c.save(); c.globalAlpha = .07; c.fillStyle = '#0a0c10'; c.fillRect(1700, 820, 700, 40); for (const [hx, hy] of [[1880, 700], [2160, 690]]) { c.beginPath(); c.arc(hx, hy, 60, 0, 7); c.fill(); rr(c, hx - 100, hy + 60, 200, 260, 40); c.fill(); } c.fillRect(1600, 300, 900, 14); c.fillRect(1600, 300, 14, 600); c.restore();
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,220,160,.05)'; c.fillRect(1640, 330, 260, 160); c.restore();
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(200,230,210,.3)'], [1, 'rgba(20,30,40,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // 10. football stadium pitch-side at night. LED board strip x 0-2560 y 760-860 (blank). Feet y 1290 on pitch.
  stadium: (c, r, W, H, P) => {
    vg(c, 0, 0, W, 400, [[0, '#04060e'], [1, '#101830']]);
    // roof edge and floodlights
    c.fillStyle = '#0a0c12'; poly(c, [[0, 150], [W, 110], [W, 170], [0, 210]]); c.fill();
    for (const fx of [300, 1000, 1700, 2360]) { const fyy = 120 - fx * .015; c.fillStyle = '#1a1c22'; c.fillRect(fx - 110, fyy - 40, 220, 70); for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) { gl(c, fx - 88 + i * 44, fyy - 22 + j * 34, 50, '255,255,250', .9); c.fillStyle = '#f8fbff'; c.beginPath(); c.arc(fx - 88 + i * 44, fyy - 22 + j * 34, 12, 0, 7); c.fill(); } gl(c, fx, fyy, 520, '210,225,255', .35); cone(c, fx, fyy + 30, 200, 1400, 1300, '220,235,255', .05); }
    // stands: packed crowd tiers
    vg(c, 0, 200, W, 560, [[0, '#10141e'], [1, '#1c2230']]);
    crowd(c, r, 0, W, 230, 460, { rows: 14, s0: 6, s1: 9, col: '#222838', lit: .35, rim: '200,215,255', phone: .015, shirt: ['#c83030', '#e8e8e8', '#3050c0', '#e8c030'] });
    c.fillStyle = '#0c0e14'; c.fillRect(0, 470, W, 18); c.fillStyle = 'rgba(200,210,255,.2)'; c.fillRect(0, 470, W, 2);
    crowd(c, r, 0, W, 510, 730, { rows: 9, s0: 10, s1: 15, col: '#262c3c', lit: .45, rim: '220,230,255', phone: .02, shirt: ['#c83030', '#e8e8e8', '#3050c0', '#e8c030'] });
    for (let i = 0; i < 8; i++) { const x = r.range(100, 2460), y = r.range(260, 700); c.fillStyle = P2.rgb(r.pick([[200, 40, 40], [230, 230, 230], [40, 80, 200]]), .8); poly(c, [[x, y], [x + 120, y - 6], [x + 120, y + 40], [x, y + 44]]); c.fill(); }
    // LED board strip (blank, dark glowing)
    c.fillStyle = '#05060a'; c.fillRect(0, 750, W, 120); vg(c, 0, 760, W, 100, [[0, '#141a2c'], [1, '#0a0e1a']]); for (let y = 762; y < 860; y += 5) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, y, W, 1); } for (let x = 0; x < W; x += 640) { c.fillStyle = '#000'; c.fillRect(x, 760, 4, 100); } c.fillStyle = 'rgba(120,160,255,.25)'; c.fillRect(0, 760, W, 2);
    // pitch
    const py = 870; vg(c, 0, py, W, H - py, [[0, '#2a6a30'], [1, '#3a8a3a']]);
    for (let i = -10; i < 20; i++) { const x0 = 1280 + i * 160, x1 = 1280 + i * 420; if (i % 2) { c.fillStyle = 'rgba(255,255,255,.06)'; poly(c, [[x0, py], [x0 + 160, py], [x1 + 420, H], [x1, H]]); c.fill(); } }
    P2.fillStrokes(c, r, [0, py, W, H - py], () => true, { n: 14000, len: [6, 18], w: [2, 4], ang: -Math.PI / 2, angJ: .3, al: .3, colFn: (x, y) => P2.jitter(r() < .5 ? '#3a8a3a' : '#2a6a2a', r, 14) });
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 940); c.lineTo(W, 940); c.stroke(); c.lineWidth = 6; c.beginPath(); c.ellipse(1280, 1300, 900, 180, 0, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
    gl(c, 1280, 1100, 1400, '220,235,255', .15); for (const fx of [300, 1000, 1700, 2360]) shadow(c, fx * .6 + 500, 1290, 400, 20, .15);
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 200; i++) { c.fillStyle = `rgba(200,220,255,${r.range(.015, .04)})`; c.beginPath(); c.arc(r() * W, r() * 500, r.range(40, 140), 0, 7); c.fill(); } c.restore();
    done(c, r, W, H, P, { vig: .45 }); },

  // 11. title backdrop: dark with coloured glows and sparkles, empty centre
  title: (c, r, W, H, P) => {
    vg(c, 0, 0, W, H, [[0, '#06060e'], [.5, '#0c0a1a'], [1, '#05050a']]);
    P2.fillStrokes(c, r, [0, 0, W, H], () => true, { n: 8000, len: [60, 200], w: [10, 30], ang: .4, angJ: .3, al: .06, colFn: () => P2.jitter('#1a1830', r, 14) });
    gl(c, 260, 320, 1100, '40,120,255', .55); gl(c, 2300, 1150, 1100, '255,40,190', .5); gl(c, 2200, 200, 700, '160,255,60', .3); gl(c, 400, 1300, 700, '160,255,60', .22); gl(c, 1280, 720, 900, '90,60,200', .18);
    c.save(); c.globalCompositeOperation = 'screen'; for (let k = 0; k < 7; k++) { const col = r.pick(['40,140,255', '255,60,200', '170,255,70']); c.strokeStyle = `rgba(${col},.12)`; c.lineWidth = r.range(30, 90); c.beginPath(); const y0 = r.range(0, H); c.moveTo(-100, y0); c.bezierCurveTo(800, y0 + r.range(-500, 500), 1700, r.range(0, H), W + 100, r.range(0, H)); c.stroke(); } c.restore();
    for (let i = 0; i < 380; i++) { let x = r() * W, y = r() * H; const d = Math.hypot((x - 1280) / 1.6, y - 720); if (d < 380 && r() < .85) continue; c.fillStyle = `rgba(255,255,255,${r.range(.2, .8)})`; c.fillRect(x, y, 2, 2); }
    for (let i = 0; i < 40; i++) { const x = r() * W, y = r() * H; if (Math.hypot((x - 1280) / 1.6, y - 720) < 420) continue; sparkle(c, x, y, r.range(4, 14), r.pick(['200,230,255', '255,180,240', '220,255,170']), r.range(.4, .9)); }
    shadow(c, 1280, 720, 1000, 440, .4);
    done(c, r, W, H, P, { vig: .5, n: 30000 }); },

  // 12. dark textured card backdrop
  card: (c, r, W, H, P) => {
    vg(c, 0, 0, W, H, [[0, '#1a1a20'], [1, '#121216']]);
    P2.fillStrokes(c, r, [0, 0, W, H], () => true, { n: 14000, len: [40, 140], w: [8, 22], ang: 0, angJ: 1.5, al: .07, colFn: () => P2.jitter('#24242c', r, 10) });
    gl(c, 1280, 620, 1300, '255,235,210', .07); gl(c, 300, 200, 700, '80,120,200', .06); gl(c, 2300, 1250, 700, '200,90,160', .05);
    for (let i = 0; i < 40000; i++) { c.fillStyle = r() < .5 ? `rgba(255,255,255,${r() * .05})` : `rgba(0,0,0,${r() * .1})`; c.fillRect(r() * W, r() * H, 2, 2); }
    c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 2; c.strokeRect(60, 60, W - 120, H - 120);
    done(c, r, W, H, P, { vig: .6, n: 20000 }); },

  // 13. dark-blue grid backdrop for charts
  chart: (c, r, W, H, P) => {
    vg(c, 0, 0, W, H, [[0, '#0a1630'], [1, '#06101f']]); gl(c, 1280, 600, 1400, '40,90,180', .25);
    P2.fillStrokes(c, r, [0, 0, W, H], () => true, { n: 6000, len: [40, 140], w: [8, 22], ang: 0, angJ: 1.5, al: .05, colFn: () => P2.jitter('#16284a', r, 10) });
    for (let x = 0; x <= W; x += 40) { c.fillStyle = x % 200 === 0 ? 'rgba(120,170,255,.16)' : 'rgba(120,170,255,.06)'; c.fillRect(x, 0, x % 200 === 0 ? 2 : 1, H); }
    for (let y = 0; y <= H; y += 40) { c.fillStyle = y % 200 === 0 ? 'rgba(120,170,255,.16)' : 'rgba(120,170,255,.06)'; c.fillRect(0, y, W, y % 200 === 0 ? 2 : 1); }
    for (let i = 0; i < 60; i++) { const x = Math.round(r() * W / 200) * 200, y = Math.round(r() * H / 200) * 200; gl(c, x, y, 30, '120,200,255', .25); }
    c.save(); c.globalCompositeOperation = 'screen'; c.strokeStyle = 'rgba(80,200,255,.06)'; c.lineWidth = 40; c.beginPath(); c.moveTo(0, 1200); for (let x = 0; x <= W; x += 80) c.lineTo(x, 1200 - x * .25 - Math.sin(x * .01) * 60); c.stroke(); c.restore();
    done(c, r, W, H, P, { vig: .55, n: 20000 }); },
};
})();
