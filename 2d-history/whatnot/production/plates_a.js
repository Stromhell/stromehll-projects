// Whatnot A-set background plates. Paint one or two at a time:
//   node shared/p2/paint.js whatnot/production/plates_a.js whatnot/production/plates break_studio
// Plates are 2560x1440. Helper header copied from gulf-monarchies/production/plates_a.js.
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

window.PLATES = Object.assign(window.PLATES || {}, {
  // break_studio: night livestream box-break studio. Floor y 1250. Desk top y 1060, desk x 700-1860 (front face to y 1250); host sits behind desk, clear above desk x 900-1660 (y 380-1060). Monitor (blank chat) x 1690-1850 y 880-1000. Ring lights x 380, 2180. Camera tripod x 2400.
  break_studio: (c, r, W, H, P) => { const fy = 1250, dt = 1060;
    vg(c, 0, 0, W, fy, [[0, '#120c22'], [.55, '#1e1436'], [1, '#2a1a3e']]); tex(c, r, 0, 0, W, fy, '#2a1c44', 2600, { al: .1, ang: Math.PI / 2 });
    // acoustic panels behind host
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { const x = 900 + i * 128, y = 300 + j * 150; vg(c, x + 6, y + 6, 116, 138, [[0, '#2a1f48'], [1, '#18122c']]); c.fillStyle = 'rgba(160,120,255,.06)'; c.fillRect(x + 6, y + 6, 116, 8); }
    gl(c, 1280, 560, 700, '150,90,255', .22); for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(${r.pick(['170,90,255', '40,230,220', '255,120,200'])},${r.range(.05, .3)})`; c.beginPath(); c.arc(900 + r() * 760, 300 + r() * 600, r.range(2, 9), 0, 7); c.fill(); }
    // LED strips: ceiling and floor edges
    for (const [y, col] of [[120, '170,90,255'], [fy - 8, '40,230,220']]) { c.fillStyle = `rgb(${col})`; c.fillRect(0, y, W, 6); for (let x = 0; x < W; x += 160) gl(c, x + 80, y, 260, col, .28); }
    c.fillStyle = 'rgb(40,230,220)'; c.fillRect(890, 290, 4, 620); c.fillRect(1666, 290, 4, 620); gl(c, 892, 600, 300, '40,230,220', .2); gl(c, 1668, 600, 300, '40,230,220', .2);
    vg(c, 0, 0, W, 120, [[0, '#08060f'], [1, '#140e24']]);
    // shelves of sealed boxes, left and right walls
    const bcol = ['#d83a3a', '#2a6ad8', '#e8b830', '#3aa858', '#9a4ad8', '#e87a2a', '#20b8c8', '#c82a8a', '#1a1a2a', '#f0f0f0'];
    for (const [x0, x1] of [[60, 840], [1720, 2500]]) { vg(c, x0 - 20, 180, x1 - x0 + 40, 900, [[0, '#1a1230'], [1, '#22183a']]);
      for (let s = 0; s < 5; s++) { const y = 340 + s * 170; let x = x0; while (x < x1 - 40) { const w = r.range(70, 140), h = r.range(60, 130); cbox(c, r, x, y, w, h, P2.jitter(r.pick(bcol), r, 10)); x += w + r.range(2, 10); } shelf(c, x0 - 20, y, x1 - x0 + 40, '#2a2036'); c.fillStyle = s % 2 ? 'rgba(40,230,220,.9)' : 'rgba(180,100,255,.9)'; c.fillRect(x0 - 20, y + 22, x1 - x0 + 40, 3); gl(c, (x0 + x1) / 2, y - 60, 500, s % 2 ? '40,230,220' : '170,90,255', .12); } }
    // floor
    vg(c, 0, fy, W, H - fy, [[0, '#1a1426'], [1, '#0c0a12']]); tex(c, r, 0, fy, W, H - fy, '#221a30', 1500, { al: .12 }); reflect(c, fy, 150, .22, 6);
    // ring lights and camera
    ringLight(c, 380, 1200, 520, 120); ringLight(c, 2180, 1200, 520, 120);
    camTripod(c, 2400, 1230, 1.05, -1);
    // desk
    shadow(c, 1280, fy, 700, 40, .6); let g = c.createLinearGradient(0, dt, 0, fy); g.addColorStop(0, '#2a2234'); g.addColorStop(1, '#100c16'); c.fillStyle = g; c.fillRect(700, dt + 22, 1160, fy - dt - 22);
    c.fillStyle = 'rgb(170,90,255)'; c.fillRect(700, fy - 40, 1160, 5); gl(c, 1280, fy - 38, 600, '170,90,255', .2); for (let k = 0; k < 5; k++) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(760 + k * 220, dt + 50, 180, 110); }
    g = c.createLinearGradient(0, dt, 0, dt + 24); g.addColorStop(0, '#5a4a6a'); g.addColorStop(1, '#241c30'); c.fillStyle = g; c.fillRect(690, dt, 1180, 24); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(690, dt, 1180, 3);
    // desk mat in middle + scattered cards (low)
    c.fillStyle = '#16302c'; poly(c, [[960, dt + 2], [1600, dt + 2], [1620, dt + 18], [940, dt + 18]]); c.fill();
    tex(c, r, 700, dt + 24, 1160, fy - dt - 60, '#2a2236', 900, { al: .14 }); c.strokeStyle = 'rgba(40,230,220,.5)'; c.lineWidth = 3; c.strokeRect(730, dt + 44, 1100, fy - dt - 100);
    for (let k = 0; k < 9; k++) tcard(c, r, 1000 + k * 64 + r.range(-10, 10), dt + 8, 34, Math.PI / 2 + r.range(-.3, .3));
    // left end: card sleeve stacks + toploader rack
    for (let k = 0; k < 4; k++) { const x = 720 + k * 42, h = r.range(30, 70); vg(c, x, dt - h, 34, h, [[0, 'rgba(230,240,255,.55)'], [1, 'rgba(160,180,210,.35)']]); c.fillStyle = r.pick(['#d83a3a', '#2a6ad8', '#e8b830']); c.fillRect(x, dt - h, 34, 6); }
    c.fillStyle = '#20202a'; c.fillRect(850, dt - 14, 46, 14); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(220,235,255,.5)'; c.fillRect(852 + k * 7, dt - 60, 5, 48); }
    // right end: small monitor with blank chat
    c.fillStyle = '#111'; c.fillRect(1762, 1000, 16, dt - 1000); c.fillRect(1730, dt - 8, 80, 8); c.fillStyle = '#0c0c12'; rr(c, 1684, 872, 172, 132, 8); c.fill();
    g = c.createLinearGradient(0, 880, 0, 1000); g.addColorStop(0, '#1e2a40'); g.addColorStop(1, '#141c2e'); c.fillStyle = g; c.fillRect(1692, 880, 156, 116); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(160,200,255,.18)'; rr(c, 1700, 888 + k * 18, r.range(60, 130), 10, 4); c.fill(); } gl(c, 1770, 940, 200, '120,170,255', .2);
    // purple/teal wash
    gl(c, 200, 300, 900, '170,90,255', .16); gl(c, 2360, 300, 900, '40,230,220', .14); cone(c, 1280, 0, 300, 1200, 1100, '200,170,255', .06);
    done(c, r, W, H, P, { vig: .5 }); },
  // card_shop: cosy local card shop, warm light. Floor y 1250. Blank corkboard (poster drawn live) x 1700-2100 y 380-760. Glass counter front-left x 40-560 (top y 960). Back counter with till x 1180-1640 top y 900. Binder wall x 120-1080 y 200-820.
  card_shop: (c, r, W, H, P) => { const fy = 1250; let cx0 = 0;
    vg(c, 0, 0, W, fy, [[0, '#4a2e1e'], [.5, '#7a4e30'], [1, '#5a3824']]); tex(c, r, 0, 0, W, fy, '#7a4e30', 3000, { al: .1, ang: Math.PI / 2 });
    c.fillStyle = '#3a2418'; c.fillRect(0, 880, W, 12); vg(c, 0, 892, W, fy - 892, [[0, '#5a3a22'], [1, '#3a2416']]); for (let x = 0; x < W; x += 90) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, 892, 4, fy - 892); }
    // binder wall: shelves of binders + slabs
    vg(c, 100, 180, 1000, 660, [[0, '#2a1a10'], [1, '#3a2416']]);
    for (let s2 = 0; s2 < 3; s2++) { const y = 380 + s2 * 200; let x = 130; while (x < 1060) { const w = r.range(40, 70), h = r.range(150, 175), col = P2.jitter(r.pick(['#1a3a8a', '#8a1a1a', '#1a6a3a', '#2a2a2a', '#6a2a8a', '#c87a1a', '#1a7a8a']), r, 14); const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, P2.rgb(P2.shade(col, .2))); g.addColorStop(1, P2.rgb(P2.shade(col, -.4))); c.fillStyle = g; rr(c, x, y - h, w, h, 6); c.fill(); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(x + w * .2, y - h * .78, w * .6, h * .14); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(x + w / 2, y - h * .3, 6, 0, 7); c.fill(); x += w + r.range(2, 6); } shelf(c, 100, y, 1000, '#4a2e1a'); }
    // graded slab grid wall above till
    vg(c, 1160, 200, 500, 560, [[0, '#2a1a12'], [1, '#22160e']]); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) tcard(c, r, 1205 + i * 82, 275 + j * 132, 40, 0, { slab: true });
    gl(c, 1410, 480, 420, '255,210,150', .18);
    // generic posters (no text)
    for (const [x, y, w, h, a, b] of [[2200, 300, 260, 360, '#1a3a8a', '#e8b830'], [1160, 790, 0, 0, '#000', '#000']]) { if (!w) continue; c.fillStyle = '#f0e6d0'; c.fillRect(x - 10, y - 10, w + 20, h + 20); vg(c, x, y, w, h, [[0, a], [1, P2.rgb(P2.shade(a, -.3))]]); tcard(c, r, x + w / 2, y + h * .45, 120, -.12, { col: b }); c.fillStyle = b; c.fillRect(x + 20, y + h - 50, w - 40, 26); }
    // corkboard frame around blank area x1700-2100 y380-760
    c.fillStyle = '#5a3a1e'; c.fillRect(1680, 360, 440, 420); vg(c, 1700, 380, 400, 380, [[0, '#c89a62'], [1, '#a87a48']]); for (let i = 0; i < 900; i++) { c.fillStyle = `rgba(${r() < .5 ? '90,60,30' : '230,200,150'},${r.range(.1, .35)})`; c.fillRect(1700 + r() * 398, 380 + r() * 378, 2, 2); }
    for (const [px, py] of [[1720, 400], [2080, 400], [1720, 740], [2080, 740]]) { c.fillStyle = r.pick(['#d83a3a', '#2a6ad8', '#e8b830']); c.beginPath(); c.arc(px, py, 7, 0, 7); c.fill(); }
    // pendant lamps
    for (const x of [500, 1280, 1900]) pendant(c, x, 0, 120, '255,190,110', 1);
    // back counter + till
    shadow(c, 1410, 1060, 300, 20); vg(c, 1180, 900, 460, 160, [[0, '#6a4228'], [1, '#3a2214']]); c.fillStyle = '#8a5a34'; c.fillRect(1170, 892, 480, 14); 
    c.fillStyle = '#2a2a2e'; poly(c, [[1480, 892], [1600, 892], [1590, 840], [1490, 840]]); c.fill(); c.fillStyle = '#1a1a1e'; c.fillRect(1500, 780, 80, 60); c.fillStyle = '#5ad8a0'; c.fillRect(1506, 786, 68, 30); gl(c, 1540, 800, 80, '90,216,160', .3);
    for (let k = 0; k < 4; k++) cbox(c, r, 1200 + k * 64, 892, 58, 70, r.pick(['#d83a3a', '#2a6ad8', '#e8b830', '#3aa858']));
    // floor
    planks(c, r, fy, H, '#8a5a34', 10); reflect(c, fy, 90, .12, 6); for (const x of [500, 1280, 1900]) { c.save(); c.translate(x, fy + 70); c.scale(1, .18); gl(c, 0, 0, 520, '255,200,130', .3); c.restore(); }
    for (let i = 0; i < 14; i++) { const x = 140 + i * 175, y = 175 + Math.sin(i * .9) * 18; c.strokeStyle = '#2a1a10'; c.lineWidth = 2; if (i) { c.beginPath(); c.moveTo(x - 175, 175 + Math.sin((i - 1) * .9) * 18); c.quadraticCurveTo(x - 88, y + 40, x, y); c.stroke(); } gl(c, x, y, 40, '255,210,140', .6); c.fillStyle = '#ffe2a8'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); }
    tex(c, r, 0, 892, W, fy - 892, '#5a3a22', 1200, { al: .1, ang: Math.PI / 2 });
    // glass display counter front-left
    cx0 = 40; const cx1 = 560, ct = 960; shadow(c, 300, fy, 320, 24, .55); vg(c, cx0, ct + 120, cx1 - cx0, fy - ct - 120, [[0, '#5a3820'], [1, '#2a180c']]);
    vg(c, cx0, ct, cx1 - cx0, 120, [[0, 'rgba(200,230,240,.25)'], [1, 'rgba(120,150,170,.2)']]); vg(c, cx0 + 6, ct + 70, cx1 - cx0 - 12, 50, [[0, '#2a1a3a'], [1, '#1a1024']]);
    for (let k = 0; k < 9; k++) tcard(c, r, cx0 + 40 + k * 56, ct + 92, 30, Math.PI / 2 * 0 + r.range(-.1, .1)); gl(c, 300, ct + 40, 300, '255,240,210', .2);
    c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(cx0, ct, cx1 - cx0, 4); c.fillStyle = 'rgba(255,255,255,.18)'; poly(c, [[cx0 + 40, ct + 6], [cx0 + 120, ct + 6], [cx0 + 60, ct + 116], [cx0 - 20 + 40, ct + 116]]); c.fill();
    c.strokeStyle = '#c8a070'; c.lineWidth = 4; c.strokeRect(cx0, ct, cx1 - cx0, 120); tex(c, r, cx0, ct + 120, cx1 - cx0, fy - ct - 120, '#5a3820', 500, { al: .15 }); for (let k = 0; k < 3; k++) { c.strokeStyle = 'rgba(0,0,0,.3)'; c.strokeRect(cx0 + 20 + k * 170, ct + 150, 150, 120); }
    // second low glass counter right edge (cut by frame)
    vg(c, 2260, 1000, 320, 250, [[0, '#5a3820'], [1, '#2a180c']]); vg(c, 2260, 1000, 320, 80, [[0, 'rgba(200,230,240,.3)'], [1, 'rgba(120,150,170,.2)']]); for (let k = 0; k < 5; k++) tcard(c, r, 2290 + k * 58, 1050, 30);
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,200,130,.35)'], [1, 'rgba(120,60,30,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },
  // lambo_showroom: glossy supercar showroom at night. Floor y 1240. Empty turntable centre x 1280, top y 1180, radius 620 (ellipse ry ~110). Windows x 0-2560 y 140-1040 (night city). Spotlights at ceiling x 820, 1280, 1740.
  lambo_showroom: (c, r, W, H, P) => { const fy = 1240, wt = 140, wb = 1040;
    city(c, r, 0, wt, W, wb - wt, { stars: 80, moon: [2150, 260], neon: .12 });
    // mullions + glass reflections
    c.fillStyle = '#0c0d12'; for (let x = 0; x <= W; x += 320) { c.fillRect(x - 9, wt, 18, wb - wt); } c.fillRect(0, 600, W, 10);
    for (let x = 0; x < W; x += 320) { c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(180,200,240,.06)'; poly(c, [[x + 40, wt], [x + 140, wt], [x + 60, wb], [x - 40, wb]]); c.fill(); c.restore(); }
    // ceiling
    vg(c, 0, 0, W, wt, [[0, '#0a0a0e'], [1, '#1c1c24']]); c.fillStyle = '#2a2a34'; c.fillRect(0, wt - 14, W, 14); for (let x = 60; x < W; x += 140) { c.fillStyle = '#f4f6ff'; c.fillRect(x, 50, 70, 6); gl(c, x + 35, 54, 60, '230,240,255', .4); }
    // low wall base under windows
    vg(c, 0, wb, W, fy - wb, [[0, '#24242c'], [1, '#121218']]); c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, wb, W, 3);
    // polished floor
    vg(c, 0, fy, W, H - fy, [[0, '#2a2a32'], [1, '#0e0e12']]); reflect(c, fy, 200, .55, 3); persLines(c, fy, H, 1280, 5, 'rgba(255,255,255,.05)', 2);
    // big ceiling spotlights with cones down onto turntable
    for (const x of [820, 1280, 1740]) { c.fillStyle = '#18181e'; c.fillRect(x - 30, wt - 6, 60, 26); c.fillStyle = '#fffbe8'; c.beginPath(); c.ellipse(x, wt + 22, 24, 6, 0, 0, 7); c.fill(); gl(c, x, wt + 24, 160, '255,245,220', .6); cone(c, x, wt + 24, 50, 900, fy - wt + 10, '255,245,220', .11); }
    // turntable
    const tx = 1280, ty = 1180, R = 620, ry = 110; shadow(c, tx, ty + 60, R + 60, ry + 30, .7);
    let g = c.createLinearGradient(0, ty, 0, ty + 60); g.addColorStop(0, '#5a5a66'); g.addColorStop(1, '#1a1a20'); c.fillStyle = g; c.beginPath(); c.ellipse(tx, ty + 40, R, ry, 0, 0, Math.PI); c.lineTo(tx - R, ty); c.ellipse(tx, ty, R, ry, 0, Math.PI, 0, true); c.fill();
    c.fillStyle = 'rgb(220,235,255)'; c.beginPath(); c.ellipse(tx, ty + 40, R, ry, 0, .05, Math.PI - .05); c.lineWidth = 4; c.strokeStyle = 'rgba(200,225,255,.9)'; c.stroke(); gl(c, tx, ty + 120, 300, '200,225,255', .25);
    g = c.createRadialGradient(tx, ty - 20, 20, tx, ty, R); g.addColorStop(0, '#6a6a78'); g.addColorStop(.7, '#3a3a44'); g.addColorStop(1, '#24242c'); c.fillStyle = g; c.beginPath(); c.ellipse(tx, ty, R, ry, 0, 0, 7); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 2; for (const k of [.35, .7]) { c.beginPath(); c.ellipse(tx, ty, R * k, ry * k, 0, 0, 7); c.stroke(); } c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; c.beginPath(); c.ellipse(tx, ty, R, ry, 0, Math.PI, 0); c.stroke();
    c.save(); c.beginPath(); c.ellipse(tx, ty, R, ry, 0, 0, 7); c.clip(); for (const x of [820, 1280, 1740]) { c.save(); c.translate(x, ty); c.scale(1, .2); gl(c, 0, 0, 380, '255,245,220', .3); c.restore(); } c.restore();
    // side plinths with velvet rope posts (outside middle)
    for (const x of [200, 2360]) { for (const dx of [-90, 90]) { const px = x + dx; shadow(c, px, fy + 60, 40, 8); c.fillStyle = '#c8a050'; c.fillRect(px - 6, fy - 110 + 60, 12, 110); c.beginPath(); c.arc(px, fy - 112 + 60, 14, 0, 7); c.fill(); c.fillStyle = '#a8a8b0'; c.beginPath(); c.ellipse(px, fy + 60, 30, 8, 0, 0, 7); c.fill(); } c.strokeStyle = '#8a1020'; c.lineWidth = 10; c.beginPath(); c.moveTo(x - 90, fy - 40); c.quadraticCurveTo(x, fy + 20, x + 90, fy - 40); c.stroke(); }
    plant(c, r, 520, fy, 420, '#1a1a1e'); plant(c, r, 2040, fy, 420, '#1a1a1e');
    gl(c, 1280, 1180, 1100, '120,140,200', .08);
    done(c, r, W, H, P, { vig: .55 }); },

  // auction_house: classic auction room. Floor y 1250. Rostrum right x 1750-2150, top y 1020 (auctioneer stands behind, visible above y 1020). Blank screen x 700-1500 y 260-700. Chair rows from behind at bottom y 1240-1440 (keep figures above). Chandeliers x 500, 1100, 1700.
  auction_house: (c, r, W, H, P) => { const fy = 1250;
    vg(c, 0, 0, W, fy, [[0, '#4a0e14'], [.5, '#7a1a22'], [1, '#5a1218']]); tex(c, r, 0, 0, W, fy, '#7a1a22', 3000, { al: .1, ang: Math.PI / 2 });
    for (let x = 0; x < W; x += 60) { c.fillStyle = 'rgba(0,0,0,.07)'; c.fillRect(x, 0, 24, 880); }
    // cornice & dado
    vg(c, 0, 0, W, 110, [[0, '#2a1208'], [1, '#5a3418']]); c.fillStyle = '#d8b050'; c.fillRect(0, 110, W, 16); c.fillStyle = '#e8c870'; c.fillRect(0, 880, W, 14); vg(c, 0, 894, W, fy - 894, [[0, '#4a2a16'], [1, '#2a160c']]);
    for (let x = 30; x < W; x += 260) { c.strokeStyle = 'rgba(232,200,112,.4)'; c.lineWidth = 3; c.strokeRect(x, 930, 200, 260); }
    // frames
    gframe(c, r, r.range(0, 0) + 90, 300, 300, 400, ['#2a4a6a', '#e8c870', '#a83a2a']); gframe(c, r, 1700, 280, 240, 320, ['#3a6a3a', '#e8d8a0', '#6a3a2a']); gframe(c, r, 2080, 330, 360, 280, ['#6a4a8a', '#e8a860', '#2a2a4a']); gframe(c, r, 470, 360, 160, 220, ['#8a6a2a', '#f0e0b0', '#3a2a1a']);
    // big blank screen
    c.fillStyle = '#1a1210'; c.fillRect(680, 240, 840, 480); vg(c, 700, 260, 800, 440, [[0, '#1c2230'], [1, '#121620']]); c.fillStyle = 'rgba(180,200,240,.06)'; poly(c, [[700, 260], [980, 260], [800, 700], [700, 700]]); c.fill(); gl(c, 1100, 480, 520, '140,170,230', .12);
    c.strokeStyle = '#d8b050'; c.lineWidth = 6; c.strokeRect(684, 244, 832, 472);
    // chandeliers
    for (const x of [500, 1100, 1700]) chandelier(c, x, 200, .75);
    // floor carpet
    vg(c, 0, fy, W, H - fy, [[0, '#6a1a1e'], [1, '#3a0a0e']]); tex(c, r, 0, fy, W, H - fy, '#6a1a1e', 1400, { al: .12, len: [10, 40] });
    // rostrum
    const rx = 1750, rw = 400, rt = 1020; shadow(c, rx + rw / 2, fy, 260, 24, .6); let g = c.createLinearGradient(rx, 0, rx + rw, 0); g.addColorStop(0, '#3a1e0c'); g.addColorStop(.35, '#8a5228'); g.addColorStop(1, '#2a1408'); c.fillStyle = g; poly(c, [[rx, rt + 20], [rx + rw, rt + 20], [rx + rw - 20, fy], [rx + 20, fy]]); c.fill();
    c.strokeStyle = 'rgba(232,200,112,.55)'; c.lineWidth = 4; c.strokeRect(rx + 50, rt + 60, rw - 100, 120); tex(c, r, rx, rt + 20, rw, fy - rt - 20, '#6a3a1a', 400, { al: .14, ang: Math.PI / 2 });
    g = c.createLinearGradient(0, rt, 0, rt + 24); g.addColorStop(0, '#b07a40'); g.addColorStop(1, '#4a2a12'); c.fillStyle = g; c.fillRect(rx - 20, rt, rw + 40, 24); c.fillStyle = 'rgba(255,230,170,.4)'; c.fillRect(rx - 20, rt, rw + 40, 3);
    c.fillStyle = '#2a1408'; c.fillRect(rx + rw - 110, rt - 10, 70, 12); c.fillStyle = '#5a3018'; rr(c, rx + rw - 150, rt - 22, 60, 16, 6); c.fill(); c.fillRect(rx + rw - 126, rt - 50, 10, 30);
    gl(c, rx + rw / 2, rt - 120, 380, '255,220,160', .2);
    // rows of chairs from behind
    for (let row = 0; row < 2; row++) { const y = 1400 + row * 70, s = 1 + row * .25; for (let x = 40 + row * 60; x < W; x += 190 * s) { if (row === 0 && x > 1580 && x < 1700) continue; c.fillStyle = '#2a0c0e'; rr(c, x, y - 120 * s, 150 * s, 130 * s, 18 * s); c.fill(); g = c.createLinearGradient(0, y - 110 * s, 0, y); g.addColorStop(0, '#9a2a2e'); g.addColorStop(1, '#4a0e12'); c.fillStyle = g; rr(c, x + 10 * s, y - 112 * s, 130 * s, 100 * s, 14 * s); c.fill(); c.fillStyle = '#d8b050'; c.fillRect(x, y - 122 * s, 150 * s, 6 * s); } }
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,210,140,.3)'], [1, 'rgba(60,20,10,.4)']]); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },
  // wn_hq: bright tech atrium, white + mint. Floor y 1250. Blank LED wall x 760-1800 y 200-720. Low podium centre x 980-1580 top y 1210. Mezzanine walkways y 380-420 (left x 0-700, right x 1860-2560). Plants x 130, 420, 2140, 2430.
  wn_hq: (c, r, W, H, P) => { const fy = 1250;
    vg(c, 0, 0, W, fy, [[0, '#e8f4f0'], [.6, '#f4faf8'], [1, '#dceee8']]); tex(c, r, 0, 0, W, fy, '#e4f2ee', 2000, { al: .08, ang: Math.PI / 2 });
    // skylight grid
    vg(c, 0, 0, W, 120, [[0, '#a8d8e8'], [1, '#d8f0f4']]); c.strokeStyle = '#ffffff'; c.lineWidth = 8; for (let x = 0; x < W; x += 160) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 120); c.stroke(); } c.fillStyle = '#fff'; c.fillRect(0, 116, W, 14);
    for (let x = 0; x < W; x += 320) cone(c, x + 80, 120, 140, 400, 900, '255,255,250', .12);
    // glass side walls with offices behind
    for (const [x0, x1] of [[0, 740], [1820, W]]) { vg(c, x0, 140, x1 - x0, fy - 140, [[0, '#cfe6e2'], [1, '#b8d8d2']]);
      for (let x = x0; x < x1; x += 120) { c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(x, 140, 6, fy - 140); c.fillStyle = 'rgba(255,255,255,.18)'; poly(c, [[x + 20, 140], [x + 60, 140], [x + 30, fy], [x - 10, fy]]); c.fill(); }
      for (let k = 0; k < 10; k++) { const dx = x0 + r() * (x1 - x0 - 80); c.fillStyle = 'rgba(120,170,160,.25)'; c.fillRect(dx, 640 + r() * 40, 90, 8); c.fillRect(dx + 10, 280 + r() * 40, 70, 6); }
      // mezzanine walkway
      vg(c, x0, 380, x1 - x0, 44, [[0, '#ffffff'], [1, '#c8dcd8']]); c.fillStyle = 'rgba(220,245,240,.35)'; c.fillRect(x0, 300, x1 - x0, 80); c.fillStyle = '#9ad8c0'; c.fillRect(x0, 296, x1 - x0, 6); c.fillStyle = 'rgba(0,60,50,.12)'; c.fillRect(x0, 424, x1 - x0, 20);
      vg(c, x0, 840, x1 - x0, 40, [[0, '#ffffff'], [1, '#c8dcd8']]); c.fillStyle = 'rgba(220,245,240,.35)'; c.fillRect(x0, 770, x1 - x0, 70); c.fillStyle = '#9ad8c0'; c.fillRect(x0, 766, x1 - x0, 6); }
    // LED wall
    shadow(c, 1280, 760, 600, 30, .25); c.fillStyle = '#1a2a28'; rr(c, 744, 184, 1072, 552, 14); c.fill(); vg(c, 760, 200, 1040, 520, [[0, '#0e2a26'], [1, '#081a18']]);
    c.fillStyle = 'rgba(80,230,180,.06)'; for (let x = 760; x < 1800; x += 8) c.fillRect(x, 200, 1, 520); gl(c, 1280, 460, 600, '80,230,180', .12); c.fillStyle = 'rgba(255,255,255,.05)'; poly(c, [[760, 200], [1100, 200], [900, 720], [760, 720]]); c.fill();
    // abstract bag / heart shapes on side wall pillars
    const bag = (x, y, s, col) => { c.strokeStyle = col; c.lineWidth = 10 * s; c.beginPath(); c.arc(x, y - 40 * s, 30 * s, Math.PI, 0); c.stroke(); c.fillStyle = col; rr(c, x - 60 * s, y - 40 * s, 120 * s, 110 * s, 14 * s); c.fill(); };
    const heart = (x, y, s, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(x, y + 50 * s); c.bezierCurveTo(x - 90 * s, y - 10 * s, x - 50 * s, y - 70 * s, x, y - 30 * s); c.bezierCurveTo(x + 50 * s, y - 70 * s, x + 90 * s, y - 10 * s, x, y + 50 * s); c.fill(); };
    c.fillStyle = '#ffffff'; c.fillRect(740, 140, 20, fy - 140); c.fillRect(1800, 140, 20, fy - 140);
    bag(560, 560, 1.1, '#3ac8a0'); heart(700 - 20, 620, .7, '#ff7a9a'); bag(2000, 600, .9, '#ffb84a'); heart(2140, 560, 1, '#3ac8a0'); heart(400, 1000, .6, '#ffb84a'); bag(2260, 1010, .7, '#ff7a9a');
    vg(c, 760, 840, 1040, 60, [[0, '#5ad8b0'], [1, '#3ab890']]); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(760, 840, 1040, 4); for (let k = 0; k < 12; k++) { c.fillStyle = 'rgba(58,200,160,.18)'; c.beginPath(); c.arc(800 + k * 90, 1000 + Math.sin(k) * 30, r.range(14, 30), 0, 7); c.fill(); }
    // floor: glossy white
    vg(c, 0, fy, W, H - fy, [[0, '#e8f0ee'], [1, '#c8d8d4']]); reflect(c, fy, 220, .3, 4); persLines(c, fy, H, 1280, 5, 'rgba(120,160,150,.12)', 2);
    // podium
    shadow(c, 1280, 1250, 360, 20, .3); vg(c, 980, 1210, 600, 40, [[0, '#ffffff'], [1, '#b8ccc8']]); c.fillStyle = '#3ac8a0'; c.fillRect(980, 1242, 600, 6); c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(980, 1210, 600, 3);
    // tall plants
    for (const x of [130, 420, 2140, 2430]) plant(c, r, x, fy + 10, 520, '#f4f8f6');
    gl(c, 1280, 300, 1200, '255,255,250', .12);
    done(c, r, W, H, P, { vig: .25 }); },

  // law_office: US lawyer's office, sunny. Floor y 1250. Desk centre x 820-1740, top y 1050. Chair behind desk: seat y ~1000, back top y 640, centre x 1280 (seated figure torso visible above desk y 600-1050). Window x 1880-2440 y 220-860. Banker's lamp x 1580 on desk. Bookshelves x 60-760.
  law_office: (c, r, W, H, P) => { const fy = 1250, dt = 1050;
    vg(c, 0, 0, W, fy, [[0, '#5a4630'], [.5, '#7a6040'], [1, '#5a4228']]); tex(c, r, 0, 0, W, fy, '#7a6040', 2400, { al: .08, ang: Math.PI / 2 });
    vg(c, 0, 0, W, 80, [[0, '#2a1a0e'], [1, '#4a3220']]); c.fillStyle = '#c8a870'; c.fillRect(0, 80, W, 10); c.fillStyle = '#3a2414'; c.fillRect(0, 860, W, 14); vg(c, 0, 874, W, fy - 874, [[0, '#4a2e1a'], [1, '#2a1a0e']]);
    for (let x = 820; x < 1860; x += 210) { c.strokeStyle = 'rgba(200,160,100,.3)'; c.lineWidth = 3; c.strokeRect(x, 900, 180, 300); }
    // bookshelves left
    vg(c, 50, 120, 720, fy - 120, [[0, '#3a2210'], [1, '#2a180a']]); c.fillStyle = '#5a3818'; c.fillRect(40, 110, 740, 22); c.fillRect(40, 120, 20, fy - 120); c.fillRect(760, 120, 20, fy - 120);
    for (let s2 = 0; s2 < 6; s2++) { const y = 300 + s2 * 160; books(c, r, 70, 750, y, 110, 140, ['#6a1a1a', '#1a3a1a', '#1a2a4a', '#5a3a1a', '#2a1a10', '#7a5a2a']); shelf(c, 60, y, 700, '#5a3818'); }
    // certificates (no text)
    for (const [x, y] of [[880, 260], [1110, 230], [1340, 260], [1110, 470]]) { c.fillStyle = '#2a1a0e'; c.fillRect(x - 12, y - 12, 184, 144); c.fillStyle = '#c8a050'; c.fillRect(x - 6, y - 6, 172, 132); c.fillStyle = '#f4ecd8'; c.fillRect(x, y, 160, 120); for (let k = 0; k < 4; k++) { c.fillStyle = 'rgba(60,40,20,.35)'; c.fillRect(x + 25, y + 26 + k * 16, 110 - (k % 2) * 30, 4); } c.fillStyle = '#b8282a'; c.beginPath(); c.arc(x + 130, y + 96, 12, 0, 7); c.fill(); }
    // window with sunny city
    const wx = 1880, wy = 220, ww = 560, wh = 640; c.fillStyle = '#e8dcc0'; c.fillRect(wx - 26, wy - 26, ww + 52, wh + 52);
    c.save(); c.beginPath(); c.rect(wx, wy, ww, wh); c.clip(); vg(c, wx, wy, ww, wh, [[0, '#6ab0e8'], [.7, '#c8e4f4'], [1, '#e8f0f0']]); for (let k = 0; k < 5; k++) { c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(wx + r() * ww, wy + 60 + r() * 200, r.range(50, 110), 18, 0, 0, 7); c.fill(); }
    let bx = wx - 20; while (bx < wx + ww) { const bw = r.range(50, 110), bh = r.range(150, 480), col = P2.jitter(r.pick(['#a8b4c0', '#c8c0b0', '#8a98a8', '#d8d0c0']), r, 10); c.fillStyle = col; c.fillRect(bx, wy + wh - bh, bw, bh); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(bx, wy + wh - bh, 4, bh); for (let yy = wy + wh - bh + 12; yy < wy + wh; yy += 18) for (let xx = bx + 6; xx < bx + bw - 8; xx += 14) { c.fillStyle = r() < .3 ? 'rgba(255,255,255,.6)' : 'rgba(60,80,110,.45)'; c.fillRect(xx, yy, 8, 10); } bx += bw + r.range(0, 10); } c.restore();
    c.fillStyle = '#f0e8d8'; c.fillRect(wx + ww / 2 - 8, wy, 16, wh); c.fillRect(wx, wy + wh / 2 - 8, ww, 16); c.fillStyle = '#d8ccb0'; c.fillRect(wx - 40, wy + wh + 20, ww + 80, 20);
    for (const sd of [0, 1]) { const cx = sd ? wx + ww + 10 : wx - 110; const g2 = c.createLinearGradient(cx, 0, cx + 100, 0); g2.addColorStop(0, '#3a4a2a'); g2.addColorStop(.5, '#5a6a3a'); g2.addColorStop(1, '#2a3a1a'); c.fillStyle = g2; c.fillRect(cx, wy - 40, 100, wh + 100); for (let k = 0; k < 5; k++) { c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(cx + 10 + k * 20, wy - 40, 6, wh + 100); } }
    c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(30px)'; c.fillStyle = 'rgba(255,240,200,.1)'; poly(c, [[wx, wy + wh], [wx + ww, wy + wh], [wx + ww - 200, H], [wx - 900, H]]); c.fill(); c.restore(); gl(c, wx + ww / 2, wy + wh / 2, 700, '255,240,200', .25);
    // floor
    planks(c, r, fy, H, '#6a4428', 10); c.fillStyle = '#5a1a1a'; poly(c, [[600, fy + 20], [1960, fy + 20], [2160, H], [400, H]]); c.fill(); tex(c, r, 400, fy + 20, 1760, H - fy, '#5a1a1a', 600, { inside: (x, y) => x > 600 - (y - fy) * 1.2 && x < 1960 + (y - fy) * 1.2, len: [10, 40], al: .12 }); c.strokeStyle = '#c8a050'; c.lineWidth = 4; c.beginPath(); c.moveTo(620, fy + 30); c.lineTo(1940, fy + 30); c.stroke();
    // chair behind desk (leather, high back)
    const chx = 1280; let g = c.createLinearGradient(chx - 170, 0, chx + 170, 0); g.addColorStop(0, '#2a0c08'); g.addColorStop(.4, '#6a2418'); g.addColorStop(1, '#1a0604'); c.fillStyle = g; rr(c, chx - 170, 640, 340, 400, 50); c.fill();
    c.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(chx - 105 + i * 70, 720 + j * 90, 5, 0, 7); c.fill(); } c.fillStyle = 'rgba(255,200,160,.15)'; rr(c, chx - 150, 650, 200, 20, 10); c.fill();
    // desk
    shadow(c, 1280, fy, 560, 30, .6); g = c.createLinearGradient(820, 0, 1740, 0); g.addColorStop(0, '#2a1408'); g.addColorStop(.5, '#5a3016'); g.addColorStop(1, '#2a1408'); c.fillStyle = g; c.fillRect(840, dt + 30, 880, fy - dt - 30);
    for (const px of [870, 1300]) { c.strokeStyle = 'rgba(200,150,90,.35)'; c.lineWidth = 3; c.strokeRect(px, dt + 60, 390, fy - dt - 90); } tex(c, r, 840, dt + 30, 880, fy - dt - 30, '#4a2810', 600, { al: .14 });
    g = c.createLinearGradient(0, dt, 0, dt + 30); g.addColorStop(0, '#7a4a24'); g.addColorStop(1, '#3a1e0c'); c.fillStyle = g; c.fillRect(820, dt, 920, 30); c.fillStyle = '#1a4a2a'; c.fillRect(1100, dt - 2, 360, 6);
    // banker's lamp
    const lx = 1580; c.fillStyle = '#c8a050'; c.fillRect(lx - 40, dt - 12, 80, 12); c.fillRect(lx - 5, dt - 90, 10, 80); g = c.createLinearGradient(0, dt - 140, 0, dt - 90); g.addColorStop(0, '#2a8a4a'); g.addColorStop(1, '#0e4a22'); c.fillStyle = g; c.beginPath(); c.moveTo(lx - 80, dt - 92); c.quadraticCurveTo(lx, dt - 160, lx + 80, dt - 92); c.closePath(); c.fill(); c.fillStyle = '#fff2c0'; c.fillRect(lx - 70, dt - 94, 140, 5); gl(c, lx, dt - 70, 220, '255,220,140', .45);
    // stacks of files
    for (const [fx, n] of [[880, 7], [990, 4], [1660, 5]]) for (let k = 0; k < n; k++) { const col = r.pick(['#c8a060', '#d8c090', '#8a6a3a', '#e8dcc0', '#6a7a9a']); c.fillStyle = col; c.fillRect(fx + r.range(-6, 6), dt - (k + 1) * 14, 110, 12); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(fx + 4, dt - (k + 1) * 14 + 4, 100, 2); }
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,220,160,.3)'], [1, 'rgba(80,40,20,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .45 }); },
});
})();
