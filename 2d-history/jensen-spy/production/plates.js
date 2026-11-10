// Jensen spy story: extra painted plates. Paint (one or two at a time):
//   node shared/p2/paint.js jensen-spy/production/plates.js jensen-spy/production/plates taipei_bar,computex_hall
// Plates are 2560x1440. People, phones, papers are drawn live by the act code; keep the lower middle clear.
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

window.PLATES = {
  // 1. intimate whisky bar in Taipei at night: back bar on the left, big window on the city, leather lounge on the right
  taipei_bar: (c, r, W, H, P) => { const fy = 940;
    vg(c, 0, 0, W, fy, [[0, '#1a0f0a'], [1, '#2e1c12']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, fy], [0, fy]], '#2a1a10', { density: 300, len: [40, 120], w: [6, 14], ang: Math.PI / 2, angJ: .05, al: .25, topLight: -.1, botDark: -.2 });
    for (let x = 0; x < W; x += 160) { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x, 0, 6, fy); c.fillStyle = 'rgba(255,190,120,.06)'; c.fillRect(x + 6, 0, 3, fy); }
    c.fillStyle = '#120a06'; c.fillRect(0, 0, W, 40);
    // the window on the city with a tiered landmark tower
    const wx = 1000, wy = 110, ww = 1480, wh = 680;
    city(c, r, wx, wy, ww, wh, { neon: .55, moon: [2300, 210], haze: 'rgba(170,80,120,.3)', landmarkLayer: 1, landmark: (c, r, base) => { const cx = 1720, top = 150; c.fillStyle = '#1a2038'; c.fillRect(cx - 80, base - 150, 160, 150); let y = base - 150; const seg = (y - top - 120) / 8;
      for (let i = 0; i < 8; i++) { const y1 = y - seg; c.fillStyle = '#1d2440'; poly(c, [[cx - 46, y], [cx - 64, y1], [cx + 64, y1], [cx + 46, y]]); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = `rgba(255,220,160,${.35 + r() * .5})`; c.fillRect(cx - 40 + k * 14, y1 + 10 + r() * (seg - 24), 6, 8); } c.fillStyle = 'rgba(90,255,200,.75)'; c.fillRect(cx - 64, y1, 128, 4); gl(c, cx, y1, 90, '90,255,200', .12); y = y1; }
      c.fillStyle = '#1d2440'; c.fillRect(cx - 30, y - 70, 60, 70); c.fillRect(cx - 7, top, 14, y - top); c.fillStyle = '#ff5a40'; c.fillRect(cx - 4, top - 8, 8, 8); gl(c, cx, top, 40, '255,90,60', .6); },
      fg: (c, r, base) => { for (let i = 0; i < 40; i++) { const x = wx + r() * ww; c.fillStyle = r() < .5 ? 'rgba(255,240,200,.7)' : 'rgba(255,80,60,.7)'; c.fillRect(x, base - 14 - r() * 10, r.range(10, 40), 3); } } });
    // glass reflections + frame
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.04)'; poly(c, [[wx + 200, wy], [wx + 420, wy], [wx + 120, wy + wh], [wx - 100, wy + wh]]); c.fill(); poly(c, [[wx + 900, wy], [wx + 980, wy], [wx + 700, wy + wh], [wx + 620, wy + wh]]); c.fill(); c.restore();
    for (const px of [1430, 1840]) gl(c, px, 300, 50, '255,190,110', .45);
    c.fillStyle = '#1a0e08'; c.fillRect(wx - 26, wy - 26, ww + 52, 26); for (let k = 0; k <= 4; k++) c.fillRect(wx - 26 + k * (ww + 26) / 4, wy, 26, wh);
    // wainscot under the window, with a ledge holding a candle and a small plant
    ENV.box(c, r, wx - 30, wy + wh, ww + 60, 30, '#4a2e1a', { hi: true }); ENV.box(c, r, wx - 30, wy + wh + 30, ww + 60, fy - wy - wh - 30, '#2a170c', { edge: false });
    for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 3; c.strokeRect(wx + k * 250, wy + wh + 50, 220, 90); }
    // back bar on the left: lit amber panel, mirror, four shelves of bottles
    vg(c, 40, 150, 820, 520, [[0, '#6a3a14'], [.5, '#c07a30'], [1, '#6a3a14']]); gl(c, 450, 420, 520, '255,170,80', .35);
    c.fillStyle = 'rgba(255,220,160,.08)'; for (let k = 0; k < 9; k++) c.fillRect(60 + k * 92, 150, 40, 520);
    c.fillStyle = '#1c0f08'; c.fillRect(20, 120, 860, 34); c.fillRect(20, 150, 24, 560); c.fillRect(856, 150, 24, 560);
    const cols = ['190,110,40', '150,70,20', '220,150,60', '90,110,60', '200,190,170', '120,40,30', '230,170,90'];
    for (const sy of [270, 400, 530, 660]) { let bx = 70; while (bx < 840) { const s = r.range(.8, 1.05); bottle(c, r, bx, sy, s, r.pick(cols)); bx += r.range(34, 52) * s; } c.fillStyle = '#3a2414'; c.fillRect(40, sy, 820, 12); c.fillStyle = 'rgba(255,210,150,.5)'; c.fillRect(40, sy, 820, 3); gl(c, 450, sy - 30, 300, '255,180,90', .12); }
    // counter
    vg(c, 0, 690, 920, 24, [[0, '#a8743e'], [1, '#5a3a1c']]); c.fillStyle = 'rgba(255,230,190,.55)'; c.fillRect(0, 690, 920, 3);
    vg(c, 0, 714, 900, 290, [[0, '#3a2010'], [1, '#1c0e06']]); for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(0,0,0,.5)'; c.lineWidth = 4; c.strokeRect(20 + k * 148, 740, 128, 200); c.strokeStyle = 'rgba(255,190,120,.12)'; c.lineWidth = 2; c.strokeRect(24 + k * 148, 744, 120, 192); }
    c.fillStyle = '#c9a050'; c.fillRect(0, 960, 900, 8); for (let k = 0; k < 5; k++) c.fillRect(80 + k * 200, 960, 8, 44); shadow(c, 450, 1004, 520, 20, .6);
    for (const tx of [180, 330, 640]) tumbler(c, tx, 690, 1.1); bottle(c, r, 520, 690, 1, '190,110,40');
    // stools in front of the counter
    for (const sx of [180, 450, 720]) { shadow(c, sx, 1060, 90, 14, .5); c.fillStyle = '#16100c'; c.fillRect(sx - 6, 860, 12, 200); c.fillRect(sx - 50, 1052, 100, 8); c.strokeStyle = '#c9a050'; c.lineWidth = 5; c.beginPath(); c.ellipse(sx, 960, 40, 8, 0, 0, 7); c.stroke();
      const g = c.createLinearGradient(0, 830, 0, 870); g.addColorStop(0, '#7a3a1e'); g.addColorStop(1, '#3a180a'); c.fillStyle = g; rr(c, sx - 62, 830, 124, 36, 16); c.fill(); c.fillStyle = 'rgba(255,200,140,.3)'; c.fillRect(sx - 50, 834, 80, 5); }
    // floor: dark planks, window and bar reflected in the polish
    planks(c, r, fy, H, '#3a2416', 10); reflect(c, fy, 300, .22, 5);
    gl(c, 450, 1000, 520, '255,170,80', .16); gl(c, 1800, 1120, 600, '120,140,255', .05);
    c.save(); c.translate(2040, 1150); c.scale(1, .16); c.fillStyle = '#5a1e1a'; c.beginPath(); c.arc(0, 0, 560, 0, 7); c.fill(); c.strokeStyle = 'rgba(220,170,90,.6)'; c.lineWidth = 30; c.beginPath(); c.arc(0, 0, 500, 0, 7); c.stroke(); c.lineWidth = 14; c.beginPath(); c.arc(0, 0, 380, 0, 7); c.stroke(); c.restore();
    gl(c, 1300, 1150, 700, '255,160,80', .1); for (let i = 0; i < 6; i++) gl(c, 1100 + i * 140, 960 + r() * 20, 40, r.pick(['255,70,160', '60,230,255', '255,150,40']), .25);
    // lounge on the right: two armchairs around a low table with a candle
    shadow(c, 2050, 1072, 260, 22, .55); c.fillStyle = '#1a0e08'; c.fillRect(1900, 1000, 14, 70); c.fillRect(2186, 1000, 14, 70); vg(c, 1870, 980, 360, 26, [[0, '#7a4e2a'], [1, '#3a2010']]); c.fillStyle = 'rgba(255,220,170,.45)'; c.fillRect(1870, 980, 360, 3);
    tumbler(c, 1960, 982, 1); tumbler(c, 2130, 982, 1); c.fillStyle = 'rgba(240,230,210,.5)'; c.fillRect(2030, 950, 30, 32); c.fillStyle = '#ffd890'; c.beginPath(); c.ellipse(2045, 944, 5, 9, 0, 0, 7); c.fill(); gl(c, 2045, 950, 220, '255,170,80', .45);
    armchair(c, 1700, 1090, 1.05, '#6a3420'); armchair(c, 2390, 1090, 1.05, '#6a3420');
    // a tall plant in the far corner
    ENV.plant(c, r, 2510, 930, 1.3);
    // pendants over the bar and lounge
    for (const [px, py] of [[220, 380], [470, 360], [720, 380], [2050, 520]]) pendant(c, px, 0, py);
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(255,215,170,.18)'; c.fillRect(0, 0, W, H); c.restore();
    done(c, r, W, H, P, { vig: .5 }); },

  // 2. big tech expo hall: truss ceiling, spotlights, glowing booths, carpet, press backdrop on the right
  computex_hall: (c, r, W, H, P) => { const fy = 880;
    vg(c, 0, 0, W, fy, [[0, '#06070e'], [.5, '#10142a'], [1, '#1c2036']]);
    // far wall: a dim upper level with faint signs
    c.fillStyle = '#141830'; c.fillRect(0, 300, W, 200); for (let x = 30; x < W; x += 240) { c.fillStyle = 'rgba(120,150,255,.18)'; c.fillRect(x, 330, 180, 40); c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(x, 400, 180, 70); }
    // trusses with hanging spot cans
    const truss = (y, hh, s) => { c.strokeStyle = 'rgba(150,155,170,.75)'; c.lineWidth = 5 * s; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.moveTo(0, y + hh); c.lineTo(W, y + hh); c.stroke(); c.lineWidth = 2.5 * s; c.beginPath(); for (let x = 0; x < W; x += hh) { c.moveTo(x, y); c.lineTo(x + hh / 2, y + hh); c.lineTo(x + hh, y); } c.stroke(); };
    truss(90, 50, 1); truss(240, 34, .8);
    for (let x = 140; x < W; x += 300) { cone(c, x, 160, 40, 700, 1100, r.pick(['230,235,255', '200,210,255', '255,220,180']), .08); c.fillStyle = '#1a1a20'; rr(c, x - 22, 140, 44, 34, 6); c.fill(); gl(c, x, 176, 60, '255,255,240', .7); }
    for (let x = 290; x < W; x += 300) { gl(c, x, 274, 30, '140,120,255', .6); cone(c, x, 280, 20, 380, 600, '140,110,255', .05); }
    // hanging banners
    const banner = (x, y, w, h, bg, fg, txt, size) => { c.fillStyle = '#888'; c.fillRect(x + 10, y - 60, 3, 60); c.fillRect(x + w - 13, y - 60, 3, 60); vg(c, x, y, w, h, [[0, bg], [1, P2.rgb(P2.shade(bg, -.35))]]); c.fillStyle = fg; c.font = `bold ${size}px Anton, Oswald, Impact, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, x + w / 2, y + h / 2); gl(c, x + w / 2, y + h / 2, w, '120,200,255', .08); };
    banner(240, 330, 260, 420, '#1a6a5a', '#eafff6', 'AI', 170); banner(1110, 320, 340, 120, '#101420', '#7affc8', 'EXPO 2025', 64);
    // booths along the back
    const booth = (x, w, col, label, scr) => { const top = 520; c.fillStyle = '#0c0e18'; c.fillRect(x, top, w, fy - top); vg(c, x, top - 70, w, 70, [[0, col], [1, P2.rgb(P2.shade(col, -.4))]]); c.fillStyle = '#f4f6ff'; c.font = 'bold 46px Anton, Oswald, Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, x + w / 2, top - 35); gl(c, x + w / 2, top - 35, w * .6, '255,255,255', .06);
      const sw = w * .7, sh = sw * .5, sx = x + (w - sw) / 2, sy = top + 30; c.fillStyle = '#05060a'; c.fillRect(sx - 8, sy - 8, sw + 16, sh + 16); vg(c, sx, sy, sw, sh, scr); gl(c, sx + sw / 2, sy + sh / 2, sw * .8, '110,180,255', .18);
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 3; c.beginPath(); for (let k = 0; k <= 20; k++) { const px = sx + 20 + k * (sw - 40) / 20, py = sy + sh * .8 - (k / 20) * sh * .5 - Math.sin(k * 1.3) * 10; k ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke();
      c.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 5; k++) c.fillRect(sx + 20 + k * sw / 5, sy + sh * .85, sw / 7, 8 + k * 3);
      vg(c, x + w * .15, fy - 130, w * .7, 130, [[0, '#d8dce8'], [1, '#7a8090']]); c.fillStyle = col; c.fillRect(x + w * .15, fy - 130, w * .7, 14); gl(c, x + w / 2, fy - 130, w * .5, '255,255,255', .08); };
    booth(560, 420, '#1e7a4a', 'AI CLOUD', [[0, '#0a3a5a'], [1, '#1a7a8a']]); booth(1070, 420, '#5a2a9a', 'ROBOTICS', [[0, '#1a1a5a'], [1, '#6a3aaa']]); booth(1580, 300, '#b0502a', 'CHIPS', [[0, '#3a1a0a'], [1, '#c07030']]);
    booth(20, 200, '#2a4a8a', 'DATA', [[0, '#0a1a3a'], [1, '#2a5aaa']]);
    // a few distant visitor silhouettes at the booths
    for (let i = 0; i < 22; i++) { const x = r.range(560, 1880), s = r.range(.45, .6), y = fy + r.range(-6, 6); c.fillStyle = `rgba(${10 + r() * 15 | 0},${12 + r() * 15 | 0},${24 + r() * 20 | 0},.8)`; c.beginPath(); c.arc(x, y - 150 * s, 18 * s, 0, 7); c.fill(); rr(c, x - 24 * s, y - 130 * s, 48 * s, 130 * s, 14 * s); c.fill(); }
    // press backdrop wall on the right (step-and-repeat of generic marks)
    const bx = 1960, by = 470, bw = 560, bh = 560; shadow(c, bx + bw / 2, by + bh, 320, 22, .6); vg(c, bx, by, bw, bh, [[0, '#f0f2f8'], [1, '#c8ccd8']]); c.save(); c.beginPath(); c.rect(bx, by, bw, bh); c.clip();
    c.font = 'bold 34px Anton, Oswald, Impact, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; for (let j = 0; j < 8; j++) for (let i = 0; i < 4; i++) { const px = bx + 70 + i * 150 + (j % 2) * 75, py = by + 40 + j * 72; if ((i + j) % 2) { c.fillStyle = '#1a2a6a'; c.fillText('EXPO 2025', px, py); } else { c.fillStyle = '#1e8a6a'; c.fillRect(px - 22, py - 22, 44, 44); c.fillStyle = '#f0f2f8'; c.fillRect(px - 12, py - 12, 24, 24); c.fillStyle = '#1e8a6a'; for (let k = -2; k <= 2; k++) { c.fillRect(px + k * 8 - 2, py - 30, 4, 8); c.fillRect(px + k * 8 - 2, py + 22, 4, 8); } } } c.restore();
    c.fillStyle = '#3a3e4a'; c.fillRect(bx - 10, by - 14, bw + 20, 14); gl(c, bx + bw / 2, by + bh / 2, 420, '255,250,240', .1);
    banner(2110, 300, 300, 150, '#3a2a7a', '#f2ecff', 'GPU', 110);
    // softbox lights on stands for the press area
    for (const [lx, dir] of [[1880, 1], [2540, -1]]) { c.strokeStyle = '#1a1a1e'; c.lineWidth = 6; c.beginPath(); c.moveTo(lx, 640); c.lineTo(lx, 1010); c.moveTo(lx, 1010); c.lineTo(lx - 40, 1060); c.moveTo(lx, 1010); c.lineTo(lx + 40, 1060); c.stroke(); c.fillStyle = '#22232a'; poly(c, [[lx - 60, 560], [lx + 60, 560], [lx + 60, 700], [lx - 60, 700]]); c.fill(); c.fillStyle = '#fbfbff'; c.fillRect(lx - 50 + dir * 6, 570, 100, 120); gl(c, lx, 630, 300, '255,255,255', .4); }
    // carpet
    ENV.texBand(c, r, W, fy, H, [[0, '#1a1e30'], [.5, '#262c44'], [1, '#343a56']], { sx: .01 }); vg(c, 0, fy, W, 30, [[0, 'rgba(0,0,0,.5)'], [1, 'rgba(0,0,0,0)']]);
    c.fillStyle = '#5a1e2a'; poly(c, [[1110, fy], [1450, fy], [1700, H], [860, H]]); c.fill(); c.strokeStyle = 'rgba(255,220,160,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(1110, fy); c.lineTo(860, H); c.moveTo(1450, fy); c.lineTo(1700, H); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 2; for (let k = -10; k <= 10; k++) { c.beginPath(); c.moveTo(1280 + k * 120, fy); c.lineTo(1280 + k * 420, H); c.stroke(); }
    for (let x = 140; x < W; x += 300) gl(c, x, 1180 + (x % 600 ? 60 : 0), 280, '220,225,255', .1);
    reflect(c, fy, 200, .12, 8);
    done(c, r, W, H, P, { vig: .5 }); },

  // 3. white neoclassical mansion at night across a lawn and fountain, flag on the roof
  white_house_night: (c, r, W, H, P) => { const gy = 900;
    vg(c, 0, 0, W, gy, [[0, '#040818'], [.6, '#122048'], [1, '#2e3e6a']]); for (let i = 0; i < 300; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.15, .7)})`; c.fillRect(r() * W, r() * 600, 2, 2); }
    gl(c, 2240, 170, 200, '210,220,255', .3); c.fillStyle = '#eef0fa'; c.beginPath(); c.arc(2240, 170, 42, 0, 7); c.fill();
    ENV.clouds(c, r, W, 80, 380, 7, '#3a4a78', '#26325a', '#141c3a');
    // tree line behind
    for (let i = 0; i < 70; i++) { const x = r() * W, y = gy - r.range(40, 200), rr2 = r.range(70, 140); c.fillStyle = `rgba(${10 + r() * 10 | 0},${22 + r() * 14 | 0},${28 + r() * 14 | 0},.96)`; c.beginPath(); c.arc(x, y, rr2, 0, 7); c.fill(); }
    // the mansion: wings, main block, portico with pediment
    const stone = (x, y, w, h) => { vg(c, x, y, w, h, [[0, '#9aa4bc'], [.6, '#d8d4cc'], [1, '#f4e8d0']]); P.paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], '#cfcac2', { density: 260, len: [10, 40], w: [3, 8], ang: -Math.PI / 2, al: .18, topLight: -.1, botDark: .05 }); };
    const winRow = (x0, x1, y, h, n, lit = .85) => { const sp = (x1 - x0) / n; for (let i = 0; i < n; i++) { const x = x0 + i * sp + sp * .28, w = sp * .44; c.fillStyle = '#7a7268'; c.fillRect(x - 6, y - 12, w + 12, 12); if (r() < lit) { vg(c, x, y, w, h, [[0, '#ffd890'], [1, '#e8a050']]); gl(c, x + w / 2, y + h / 2, w * 1.6, '255,200,120', .25); } else { c.fillStyle = '#2a3048'; c.fillRect(x, y, w, h); } c.strokeStyle = 'rgba(80,70,60,.7)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); for (let k = 1; k < 3; k++) { c.moveTo(x, y + h * k / 3); c.lineTo(x + w, y + h * k / 3); } c.stroke(); } };
    for (const [x, w] of [[360, 400], [1800, 400]]) { stone(x, 600, w, 300); c.fillStyle = '#e8e4dc'; c.fillRect(x - 10, 586, w + 20, 18); winRow(x + 10, x + w - 10, 660, 140, 4); }
    stone(760, 470, 1040, 430); c.fillStyle = '#ece6dc'; c.fillRect(740, 448, 1080, 26); for (let x = 750; x < 1810; x += 22) { c.fillStyle = '#d8d2c6'; c.fillRect(x, 420, 10, 28); } c.fillStyle = '#ece6dc'; c.fillRect(740, 412, 1080, 12);
    winRow(780, 1080, 520, 130, 3); winRow(1480, 1780, 520, 130, 3); winRow(780, 1080, 720, 150, 3); winRow(1480, 1780, 720, 150, 3);
    // portico recess and door
    c.fillStyle = '#5a5a68'; c.fillRect(1080, 470, 400, 430); gl(c, 1280, 760, 300, '255,200,120', .3); vg(c, 1230, 700, 100, 200, [[0, '#ffe0a0'], [1, '#e09040']]); c.fillStyle = '#3a2a1a'; c.fillRect(1276, 700, 8, 200); winRow(1100, 1460, 520, 120, 3, 1);
    c.fillStyle = '#efe9e0'; poly(c, [[1050, 400], [1510, 400], [1280, 290]]); c.fill(); c.strokeStyle = '#bab4aa'; c.lineWidth = 8; c.stroke(); c.fillStyle = '#c8c2b8'; poly(c, [[1100, 392], [1460, 392], [1280, 306]]); c.fill(); c.fillStyle = '#efe9e0'; c.fillRect(1050, 400, 460, 70);
    for (let k = 0; k < 6; k++) { const x = 1080 + k * 76; hg(c, x, 470, 40, 430, [[0, '#a8a8b4'], [.35, '#f8f2e8'], [.7, '#e0d8cc'], [1, '#8a8a96']]); c.fillStyle = '#efe9e0'; c.fillRect(x - 8, 466, 56, 14); c.fillRect(x - 8, 888, 56, 12); gl(c, x + 20, 890, 60, '255,220,160', .35); }
    // flag on the roof
    c.fillStyle = '#d8d8d8'; c.fillRect(1277, 120, 6, 175); c.fillStyle = '#e8d090'; c.beginPath(); c.arc(1280, 118, 7, 0, 7); c.fill(); wavingFlag(c, true, 1283, 128, 200, 106, 12, .5); gl(c, 1380, 180, 200, '255,230,200', .12);
    // uplight wash on the building
    gl(c, 1280, 900, 900, '255,210,150', .18);
    // bushes along the base
    for (let x = 340; x < 2220; x += 60) { if (x > 1060 && x < 1500) continue; M2.bush(c, r, x, 910, 90, 60, '#1a3424', '#2e5236', { lightDir: 1 }); }
    // lawn with mowing stripes, path, fountain
    P.paintRegion(c, r, [[0, gy], [W, gy], [W, H], [0, H]], '#1a3a22', { density: 380, len: [10, 30], ang: -Math.PI / 2, angJ: .4, al: .5, botDark: -.3 });
    for (let k = 0; k < 9; k++) { c.fillStyle = k % 2 ? 'rgba(80,120,70,.07)' : 'rgba(0,0,0,.08)'; poly(c, [[k * 300 - 200, gy], [k * 300 + 100, gy], [k * 600 - 600 + 600, H], [k * 600 - 1200 + 600, H]]); c.fill(); }
    c.fillStyle = 'rgba(190,180,160,.55)'; poly(c, [[1220, 905], [1340, 905], [1600, H], [960, H]]); c.fill();
    const fx = 1280, fyy = 1000; shadow(c, fx, fyy + 10, 260, 30, .5); c.fillStyle = '#b8b2a6'; c.beginPath(); c.ellipse(fx, fyy, 240, 44, 0, 0, 7); c.fill(); c.fillStyle = '#2a4a6a'; c.beginPath(); c.ellipse(fx, fyy - 6, 214, 34, 0, 0, 7); c.fill(); gl(c, fx, fyy - 6, 220, '140,200,255', .2);
    c.strokeStyle = 'rgba(220,240,255,.7)'; c.lineWidth = 3; for (let k = -6; k <= 6; k++) { c.beginPath(); c.moveTo(fx, fyy - 150); c.quadraticCurveTo(fx + k * 22, fyy - 200, fx + k * 34, fyy - 10); c.stroke(); } c.fillStyle = '#c8c2b6'; c.fillRect(fx - 10, fyy - 100, 20, 90); gl(c, fx, fyy - 120, 160, '200,230,255', .4);
    // lamp posts and framing trees
    for (const x of [560, 940, 1620, 2000]) lampPost(c, x, 1010 + Math.abs(x - 1280) * .1, 220);
    for (const [x, s] of [[80, 1.3], [2480, 1.3]]) { c.fillStyle = '#0a140e'; for (let i = 0; i < 26; i++) { c.beginPath(); c.arc(x + r.gauss() * 160 * s, 500 + r.gauss() * 200 * s, r.range(70, 130) * s, 0, 7); c.fill(); } c.fillRect(x - 20, 600, 40, 600); }
    done(c, r, W, H, P, { vig: .5 }); },

  // 4. severe grey stone ministry building in Beijing at smoggy dusk: wide steps, plaza, guard posts, bare trees
  ministry: (c, r, W, H, P) => { const gy = 1000;
    vg(c, 0, 0, W, gy, [[0, '#6a6660'], [.5, '#a8927a'], [1, '#d0aa80']]); M2.sun(c, r, 420, 420, 46, '#f4c890', '#d08a50'); ENV.clouds(c, r, W, 60, 420, 8, '#b8a490', '#968676', '#7a7068');
    // distant buildings in the haze
    for (let i = 0; i < 16; i++) { const x = r() * W, w = r.range(120, 300), h = r.range(200, 420); c.fillStyle = `rgba(${120 + r() * 20 | 0},${112 + r() * 16 | 0},${102 + r() * 12 | 0},.55)`; c.fillRect(x, 860 - h, w, h); }
    vg(c, 0, 400, W, 500, [[0, 'rgba(200,170,130,0)'], [1, 'rgba(200,170,130,.4)']]);
    // the facade
    const fx0 = 240, fx1 = 2320, top = 250, base = 860; vg(c, fx0, top, fx1 - fx0, base - top, [[0, '#8a8680'], [1, '#6e6a64']]); P.paintRegion(c, r, [[fx0, top], [fx1, top], [fx1, base], [fx0, base]], '#7e7a74', { density: 200, len: [20, 70], w: [4, 10], ang: -Math.PI / 2, angJ: .06, al: .25, topLight: .05, botDark: -.15 });
    c.fillStyle = '#9a968e'; c.fillRect(fx0 - 20, top - 30, fx1 - fx0 + 40, 50); c.fillStyle = '#5a5650'; c.fillRect(fx0 - 20, top + 20, fx1 - fx0 + 40, 10);
    for (let x = fx0 + 40; x < fx1 - 40; x += 116) { if (x > 980 && x < 1560) continue; c.fillStyle = '#2a2a30'; c.fillRect(x + 30, top + 70, 46, 600); for (let k = 1; k < 6; k++) { c.fillStyle = '#7a766e'; c.fillRect(x + 28, top + 70 + k * 100, 50, 10); } if (r() < .25) { const k = r.int(0, 5); c.fillStyle = 'rgba(255,220,150,.75)'; c.fillRect(x + 32, top + 82 + k * 100, 42, 76); }
      hg(c, x, top + 50, 30, base - top - 70, [[0, '#a29e96'], [1, '#6a665e']]); }
    // projecting centre with square pillars and dark doors
    vg(c, 960, top - 70, 640, base - top + 70, [[0, '#9a968e'], [1, '#76726a']]); c.fillStyle = '#aaa69e'; c.fillRect(940, top - 90, 680, 40); c.fillStyle = '#1e1e24'; c.fillRect(1000, top + 40, 560, base - top - 40);
    for (let k = 0; k < 6; k++) { const x = 1000 + k * 104; hg(c, x, top - 50, 56, base - top + 50, [[0, '#b8b4ac'], [.6, '#8a867e'], [1, '#5a5650']]); }
    for (const dx of [1060, 1268, 1476]) { c.fillStyle = '#2e2a26'; c.fillRect(dx - 30, 600, 90, 260); c.fillStyle = 'rgba(255,200,130,.15)'; c.fillRect(dx - 30, 600, 90, 260); }
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(1600, top - 50, 40, base - top + 50);
    // left-side dusk warmth, right side cool shade
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, gy, [[0, 'rgba(255,190,120,.5)'], [1, 'rgba(40,50,80,.5)']]); c.restore();
    // steps
    for (let k = 0; k < 9; k++) { const y = base + k * 16, inset = 300 - k * 28; c.fillStyle = k % 2 ? '#8e8a82' : '#a8a49c'; c.fillRect(760 - (300 - inset), y, 1040 + (300 - inset) * 2, 16); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(760 - (300 - inset), y + 13, 1040 + (300 - inset) * 2, 3); }
    c.fillStyle = '#7e7a72'; c.fillRect(fx0, base, 470, 140); c.fillRect(fx1 - 470, base, 470, 140);
    // plaza paving in perspective
    vg(c, 0, gy, W, H - gy, [[0, '#8a847a'], [1, '#a29a8e']]); P.paintRegion(c, r, [[0, gy], [W, gy], [W, H], [0, H]], '#968f84', { density: 300, len: [40, 120], w: [4, 10], ang: 0, angJ: .05, al: .25 });
    c.strokeStyle = 'rgba(60,55,50,.35)'; c.lineWidth = 2; for (let k = -16; k <= 16; k++) { c.beginPath(); c.moveTo(1280 + k * 150, gy); c.lineTo(1280 + k * 420, H); c.stroke(); } let y = gy; for (let k = 1; k < 9; k++) { y += 10 + k * 8; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    // guard posts flanking the steps
    for (const gx of [560, 2000]) { shadow(c, gx, 1062, 110, 16, .5); vg(c, gx - 70, 860, 140, 200, [[0, '#7a8070'], [1, '#4e5448']]); c.fillStyle = '#3a3e36'; c.fillRect(gx - 86, 840, 172, 24); poly(c, [[gx - 86, 840], [gx + 86, 840], [gx, 800]]); c.fill(); c.fillStyle = '#c8b888'; c.fillRect(gx - 46, 900, 92, 70); c.fillStyle = 'rgba(255,220,150,.35)'; c.fillRect(gx - 46, 900, 92, 70); gl(c, gx, 935, 120, '255,210,140', .2); c.fillStyle = '#c03028'; c.fillRect(gx - 70, 1040, 140, 8); }
    // lamp posts and bare trees
    for (const x of [380, 2180]) lampPost(c, x, 1120, 300, '255,200,130', 1.1);
    bareTree(c, r, 110, 1180, -Math.PI / 2, 260, 26, 8, '#2a2622'); bareTree(c, r, 2460, 1180, -Math.PI / 2, 260, 26, 8, '#2a2622'); bareTree(c, r, 760, 1010, -Math.PI / 2, 110, 10, 6, 'rgba(60,56,50,.8)'); bareTree(c, r, 1800, 1010, -Math.PI / 2, 110, 10, 6, 'rgba(60,56,50,.8)');
    vg(c, 0, 0, W, H, [[0, 'rgba(190,160,120,.12)'], [.7, 'rgba(190,160,120,.2)'], [1, 'rgba(0,0,0,0)']]);
    done(c, r, W, H, P, { vig: .45 }); },

  // 5. luxury flat at night: floor-to-ceiling windows on a glittering desert city with a super-tall tower, sofa, lamp, marble floor
  abu_dhabi_flat: (c, r, W, H, P) => { const fy = 940;
    city(c, r, 0, 60, W, fy - 60, { sky: [[0, '#08081e'], [.5, '#1e1a46'], [.85, '#6a3a5a'], [1, '#c07a5a']], haze: 'rgba(200,110,90,.25)', cool: .35, stars: 80,
      layers: [{ h: [.08, .2], col: '#24203e', win: '255,200,140', p: .3, ws: 3 }, { h: [.12, .36], col: '#1a1834', win: '255,210,150', p: .35, ws: 5 }, { h: [.06, .22], col: '#110f24', win: '255,220,160', p: .5, ws: 6 }],
      landmarkLayer: 1, landmark: (c, r, base) => { const cx = 1700; let y = base, w = 110; gl(c, cx, base - 400, 420, '150,180,255', .18); for (let k = 0; k < 14; k++) { const hh = 46 + k * 3; hg(c, cx - w / 2, y - hh, w, hh, [[0, '#5a6a9a'], [.45, '#3a4470'], [1, '#22284a']]); for (let j = 0; j < 10; j++) { c.fillStyle = `rgba(210,230,255,${.45 + r() * .5})`; c.fillRect(cx - w / 2 + 4 + r() * (w - 12), y - hh + 4 + r() * (hh - 10), 4, 4); } c.fillStyle = 'rgba(190,215,255,.8)'; c.fillRect(cx - w / 2, y - hh, w, 2); c.fillRect(cx - w / 2, y - hh, 2, hh); y -= hh; w *= .86; } c.fillStyle = '#3a4470';
        c.fillRect(cx - 4, y - 140, 8, 140); c.fillStyle = '#ff5a48'; c.fillRect(cx - 3, y - 148, 6, 8); gl(c, cx, y - 144, 40, '255,90,70', .7); gl(c, cx, base - 300, 300, '170,200,255', .14); c.fillStyle = 'rgba(180,210,255,.15)'; c.fillRect(cx - 2, y, 4, base - y); },
      fg: (c, r, base) => { c.fillStyle = '#0a0a16'; c.fillRect(0, base - 30, W, 30); for (let i = 0; i < 260; i++) { const x = r() * W; c.fillStyle = r() < .6 ? 'rgba(255,190,90,.85)' : 'rgba(255,245,230,.8)'; c.fillRect(x, base - 26 + r() * 16, r.range(6, 26), 2); } gl(c, 600, base - 20, 300, '255,170,80', .15); } });
    // glass: mullions, faint reflection of the room lamp
    c.save(); c.globalCompositeOperation = 'screen'; for (let k = 0; k < 5; k++) { c.fillStyle = 'rgba(255,255,255,.03)'; poly(c, [[k * 512 + 120, 60], [k * 512 + 260, 60], [k * 512 + 80, fy], [k * 512 - 60, fy]]); c.fill(); } c.restore();
    for (let k = 0; k <= 5; k++) { hg(c, k * 512 - 10, 60, 20, fy - 60, [[0, '#1a1a22'], [.5, '#4a4a56'], [1, '#14141a']]); }
    c.fillStyle = '#16141c'; c.fillRect(0, 0, W, 64); for (let x = 160; x < W; x += 320) { c.fillStyle = '#fff4dc'; c.beginPath(); c.arc(x, 40, 9, 0, 7); c.fill(); gl(c, x, 46, 90, '255,230,180', .3); cone(c, x, 46, 20, 300, 500, '255,220,170', .03); }
    c.fillStyle = '#1e1c22'; c.fillRect(0, fy - 16, W, 16);
    // marble floor with veins and the city reflected
    vg(c, 0, fy, W, H - fy, [[0, '#4a4650'], [1, '#8a8478']]); reflect(c, fy, 420, .55, 3);
    c.save(); c.globalAlpha = .35; for (let i = 0; i < 26; i++) { c.strokeStyle = r() < .5 ? 'rgba(235,230,220,.5)' : 'rgba(40,36,40,.5)'; c.lineWidth = r.range(1, 3); c.beginPath(); let x = r() * W, y = fy + r() * (H - fy); c.moveTo(x, y); for (let k = 0; k < 8; k++) { x += r.range(40, 140); y += r.gauss() * 20; c.lineTo(x, y); } c.stroke(); } c.restore();
    c.strokeStyle = 'rgba(20,18,24,.3)'; c.lineWidth = 2; for (let k = -10; k <= 10; k++) { c.beginPath(); c.moveTo(1280 + k * 260, fy); c.lineTo(1280 + k * 640, H); c.stroke(); } for (const y of [1010, 1130, 1320]) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    // rug, sofa, coffee table, side table with lamp, armchair, plant
    c.fillStyle = 'rgba(200,180,150,.55)'; poly(c, [[60, 1060], [980, 1060], [1060, 1250], [-40, 1250]]); c.fill();
    gl(c, 960, 860, 700, '255,190,110', .35);
    sofa(c, 90, 1070, 820, 1.05, '#c8b8a0', { h: .85, rad: 14, pillow: '#7a5a3a' });
    shadow(c, 510, 1210, 280, 20, .45); c.fillStyle = 'rgba(200,220,230,.3)'; c.fillRect(300, 1140, 420, 14); c.fillStyle = '#1a1a1e'; c.fillRect(310, 1154, 10, 50); c.fillRect(700, 1154, 10, 50); c.fillStyle = '#c9a24a'; c.fillRect(430, 1118, 70, 22);
    shadow(c, 1000, 1070, 90, 12, .5); c.fillStyle = '#2a2420'; c.fillRect(994, 900, 12, 168); c.fillRect(950, 1060, 100, 10); vg(c, 930, 892, 140, 14, [[0, '#6a4a30'], [1, '#2a1a10']]);
    c.fillStyle = '#c9a24a'; c.fillRect(996, 790, 8, 104); c.fillStyle = '#f6e2b0'; poly(c, [[940, 720], [1060, 720], [1074, 796], [926, 796]]); c.fill(); gl(c, 1000, 760, 260, '255,200,120', .6); cone(c, 1000, 796, 140, 520, 300, '255,200,120', .12);
    armchair(c, 2160, 1080, .95, '#3a3a44', '200,210,255'); ENV.plant(c, r, 2460, 1010, 1.4);
    done(c, r, W, H, P, { vig: .45 }); },

  // 6. palm-lined Florida mansion terrace at night: string lights, lanterns, glowing pumpkins, warm lit facade
  party_lawn: (c, r, W, H, P) => { const fy = 960;
    vg(c, 0, 0, W, fy, [[0, '#060a20'], [.7, '#1c2450'], [1, '#3a3060']]); for (let i = 0; i < 200; i++) { c.fillStyle = `rgba(255,255,255,${r.range(.15, .6)})`; c.fillRect(r() * W, r() * 500, 2, 2); }
    for (let i = 0; i < 9; i++) palm(c, r, r() * W, 760, r.range(300, 420), r.range(-60, 60), '120,120,200');
    c.fillStyle = 'rgba(10,14,34,.5)'; c.fillRect(0, 0, W, 800);
    // mansion facade: stucco, tile roof, arched windows and doors, balcony
    const mx0 = 360, mx1 = 2200; c.fillStyle = '#7a3a26'; poly(c, [[mx0 - 60, 330], [mx1 + 60, 330], [mx1 - 40, 230], [mx0 + 40, 230]]); c.fill(); c.strokeStyle = 'rgba(40,16,10,.6)'; c.lineWidth = 3; for (let x = mx0 - 40; x < mx1 + 60; x += 26) { c.beginPath(); c.moveTo(x, 330); c.lineTo(x + (1280 - x) * .03, 232); c.stroke(); }
    c.fillStyle = '#8a4430'; poly(c, [[1000, 240], [1560, 240], [1280, 120]]); c.fill();
    vg(c, mx0, 330, mx1 - mx0, fy - 330, [[0, '#a88a70'], [1, '#e8c098']]); P.paintRegion(c, r, [[mx0, 330], [mx1, 330], [mx1, fy], [mx0, fy]], '#d0ac88', { density: 200, len: [10, 40], w: [4, 9], ang: -.3, angJ: 1, al: .2, topLight: -.2, botDark: .1 });
    vg(c, 1000, 240, 560, 90, [[0, '#a88a70'], [1, '#c8a280']]); c.fillStyle = '#f0e0c8'; c.fillRect(mx0 - 20, 330, mx1 - mx0 + 40, 14);
    const arch = (x, y, w, h, lit = true) => { c.fillStyle = '#efe0c8'; rr(c, x - 10, y - 10, w + 20, h + 20, [w / 2 + 10, w / 2 + 10, 0, 0]); c.fill(); if (lit) { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#ffe2a0'); g.addColorStop(1, '#e8903a'); c.fillStyle = g; } else c.fillStyle = '#2a2436'; rr(c, x, y, w, h, [w / 2, w / 2, 0, 0]); c.fill();
      c.strokeStyle = 'rgba(70,40,20,.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); for (let k = 1; k < 4; k++) { c.moveTo(x, y + h * k / 4 + w * .2); c.lineTo(x + w, y + h * k / 4 + w * .2); } c.stroke(); if (lit) gl(c, x + w / 2, y + h / 2, w * 1.8, '255,190,110', .3); };
    for (let x = 440; x < 2140; x += 190) arch(x, 400, 100, 170, r() < .8);
    for (let x = 460; x < 2140; x += 280) arch(x, 660, 160, 300);
    c.fillStyle = '#efe0c8'; c.fillRect(mx0, 600, mx1 - mx0, 18); for (let x = mx0; x < mx1; x += 30) c.fillRect(x + 8, 560, 12, 40); c.fillRect(mx0, 552, mx1 - mx0, 10);
    gl(c, 1280, 800, 1100, '255,180,100', .18);
    // terrace: stone tiles, balustrade edge, steps
    vg(c, 0, fy, W, H - fy, [[0, '#6a5444'], [1, '#a48a70']]); P.paintRegion(c, r, [[0, fy], [W, fy], [W, H], [0, H]], '#8a7058', { density: 320, len: [30, 90], w: [4, 10], ang: 0, angJ: .1, al: .25 });
    c.strokeStyle = 'rgba(40,26,16,.35)'; c.lineWidth = 2; for (let k = -12; k <= 12; k++) { c.beginPath(); c.moveTo(1280 + k * 180, fy); c.lineTo(1280 + k * 480, H); c.stroke(); } let ty = fy; for (let k = 1; k < 8; k++) { ty += 14 + k * 12; c.beginPath(); c.moveTo(0, ty); c.lineTo(W, ty); c.stroke(); }
    reflect(c, fy, 200, .12, 8); gl(c, 1280, 1000, 900, '255,170,90', .15);
    // palms flanking the terrace
    palm(c, r, 120, 1120, 900, 80); palm(c, r, 420, 1000, 760, -40); palm(c, r, 2160, 1000, 760, 40); palm(c, r, 2460, 1120, 900, -80);
    // string lights between the palms
    const strand = (x0, y0, x1, y1, sag) => { c.strokeStyle = 'rgba(20,16,12,.8)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sag, x1, y1); c.stroke();
      for (let t = .03; t < 1; t += .045) { const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * (x0 + x1) / 2 + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * ((y0 + y1) / 2 + sag) + t * t * y1; c.fillStyle = '#fff0c0'; c.beginPath(); c.arc(x, y + 8, 7, 0, 7); c.fill(); gl(c, x, y + 8, 50, '255,210,130', .5); } };
    strand(200, 260, 1280, 200, 220); strand(1280, 200, 2380, 260, 220); strand(470, 300, 2110, 300, 300); strand(160, 420, 1280, 380, 160); strand(1280, 380, 2400, 420, 160);
    // paper lanterns hanging from the strands
    for (const [lx, ly, col] of [[700, 470, '255,140,60'], [1060, 540, '255,90,40'], [1500, 540, '255,140,60'], [1860, 470, '255,90,40']]) { c.strokeStyle = '#222'; c.lineWidth = 2; c.beginPath(); c.moveTo(lx, ly - 60); c.lineTo(lx, ly - 28); c.stroke(); c.fillStyle = `rgb(${col})`; c.beginPath(); c.ellipse(lx, ly, 26, 32, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(80,30,10,.5)'; for (let k = -2; k <= 2; k++) { c.beginPath(); c.ellipse(lx, ly, Math.abs(k) * 10 + 1, 32, 0, 0, 7); c.stroke(); } gl(c, lx, ly, 140, col, .5); }
    // high cocktail tables with candle lanterns
    for (const tx of [360, 2200]) { shadow(c, tx, 1130, 120, 16, .5); c.fillStyle = '#1a1410'; c.fillRect(tx - 6, 960, 12, 170); c.fillRect(tx - 50, 1124, 100, 8); c.fillStyle = '#f2ece2'; poly(c, [[tx - 80, 940], [tx + 80, 940], [tx + 100, 1100], [tx - 100, 1100]]); c.fill(); c.fillStyle = 'rgba(0,0,0,.15)'; for (let k = -2; k <= 2; k++) c.fillRect(tx + k * 36, 950, 6, 150); c.fillStyle = '#fbf7ee'; c.beginPath(); c.ellipse(tx, 940, 84, 14, 0, 0, 7); c.fill();
      c.fillStyle = '#2a2420'; c.fillRect(tx - 18, 880, 36, 56); c.fillStyle = '#ffd890'; c.fillRect(tx - 12, 890, 24, 40); gl(c, tx, 910, 160, '255,190,100', .5); tumbler(c, tx + 50, 938, .8, '255,120,80'); }
    // pumpkins: carved and glowing along the terrace edges
    const pumpkin = (x, y, s, lit) => { shadow(c, x, y + 4, 70 * s, 12 * s, .5); for (const k of [-1, 1, 0]) { const g = c.createRadialGradient(x + k * 22 * s - 10 * s, y - 50 * s, 6 * s, x + k * 22 * s, y - 40 * s, 52 * s); g.addColorStop(0, '#f0a040'); g.addColorStop(1, '#a04a10'); c.fillStyle = g; c.beginPath(); c.ellipse(x + k * 24 * s, y - 40 * s, 38 * s, 42 * s, 0, 0, 7); c.fill(); }
      c.fillStyle = '#3a4a1a'; c.fillRect(x - 5 * s, y - 92 * s, 10 * s, 18 * s); if (lit) { c.fillStyle = '#ffe070'; for (const ex of [-20, 20]) { poly(c, [[x + ex * s - 10 * s, y - 46 * s], [x + ex * s + 10 * s, y - 46 * s], [x + ex * s, y - 62 * s]]); c.fill(); } poly(c, [[x - 30 * s, y - 32 * s], [x + 30 * s, y - 32 * s], [x + 18 * s, y - 18 * s], [x, y - 24 * s], [x - 18 * s, y - 18 * s]]); c.fill(); gl(c, x, y - 40 * s, 150 * s, '255,170,60', .45); } };
    pumpkin(220, 1040, .9, true); pumpkin(320, 1080, .7, false); pumpkin(560, 990, .7, true); pumpkin(2000, 990, .7, true); pumpkin(2280, 1050, .9, true); pumpkin(2400, 1100, .7, false); pumpkin(150, 1250, 1.2, true); pumpkin(2440, 1260, 1.2, true);
    done(c, r, W, H, P, { vig: .5 }); },

  // 7. long marble government corridor, one-point perspective: columns, tall doors on the right, tall windows on the left with cool morning shafts
  gov_corridor: (c, r, W, H, P) => { const VX = 1280, VY = 560, F = 1200, XL = -1280, XR = 1280, YF = 880, YC = -560, ZB = 7;
    const sx = (X, z) => VX + X / z, sy = (Y, z) => VY + Y / z, pt = (X, Y, z) => [sx(X, z), sy(Y, z)];
    const quadL = (X, za, zb, ya, yb) => [pt(X, ya, za), pt(X, ya, zb), pt(X, yb, zb), pt(X, yb, za)];
    // walls, ceiling, back wall
    const wallG = (pts, a, b, x0, x1) => { const g = c.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, a); g.addColorStop(1, b); c.fillStyle = g; poly(c, pts); c.fill(); };
    wallG([pt(XL, YC, 1), pt(XL, YC, ZB), pt(XL, YF, ZB), pt(XL, YF, 1)], '#cfc8ba', '#a8a294', 0, sx(XL, ZB));
    wallG([pt(XR, YC, 1), pt(XR, YC, ZB), pt(XR, YF, ZB), pt(XR, YF, 1)], '#d8d0c0', '#b0a898', W, sx(XR, ZB));
    for (const X of [XL, XR]) { const wq = [pt(X, YC, 1), pt(X, YC, ZB), pt(X, YF, ZB), pt(X, YF, 1)]; P.paintRegion(c, r, wq, X < 0 ? '#c4bcac' : '#d0c8b6', { density: 260, len: [20, 60], w: [5, 12], ang: -Math.PI / 2, angJ: .15, al: .2, topLight: .05, botDark: -.1 });
      const mq = [pt(X, 560, 1), pt(X, 560, ZB), pt(X, YF, ZB), pt(X, YF, 1)]; P.paintRegion(c, r, mq, '#8a7a68', { density: 160, len: [20, 70], w: [4, 10], ang: 0, angJ: .6, al: .35, topLight: .1, botDark: -.15, var: 22 });
      c.strokeStyle = '#efe8da'; c.lineWidth = 6; c.beginPath(); c.moveTo(...pt(X, 560, 1)); c.lineTo(...pt(X, 560, ZB)); c.stroke(); c.strokeStyle = 'rgba(50,40,30,.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(...pt(X, YF - 30, 1)); c.lineTo(...pt(X, YF - 30, ZB)); c.stroke(); }
    const cg = c.createLinearGradient(0, 0, 0, sy(YC, ZB)); cg.addColorStop(0, '#e8e2d4'); cg.addColorStop(1, '#b8b2a4'); c.fillStyle = cg; poly(c, [pt(XL, YC, 1), pt(XR, YC, 1), pt(XR, YC, ZB), pt(XL, YC, ZB)]); c.fill();
    const [bx0, by0] = pt(XL, YC, ZB), [bx1, by1] = pt(XR, YF, ZB); vg(c, bx0, by0, bx1 - bx0, by1 - by0, [[0, '#d0c8b8'], [1, '#a8a090']]);
    // back door with a bright transom
    const [dx0, dy0] = pt(-300, -300, ZB), [dx1, dy1] = pt(300, YF, ZB); c.fillStyle = '#5a3a24'; c.fillRect(dx0, dy0, dx1 - dx0, dy1 - dy0); c.fillStyle = '#3a2416'; c.fillRect((dx0 + dx1) / 2 - 2, dy0, 4, dy1 - dy0); vg(c, dx0, dy0 - 50, dx1 - dx0, 44, [[0, '#f4f6ff'], [1, '#c8d4ea']]); gl(c, VX, dy0 - 30, 160, '220,235,255', .4);
    // marble floor tiles
    const T = 320 / F; let row = 0; for (let z = ZB; z > .9; z -= T, row++) { const za = Math.max(z - T, .9); for (let X = XL, i = 0; X < XR; X += 320, i++) { const k = (row + i) % 2; c.fillStyle = P2.rgb(P2.jitter(k ? '#e2dacb' : '#a89684', r, 6)); poly(c, [pt(X, YF, za), pt(X + 320, YF, za), pt(X + 320, YF, z), pt(X, YF, z)]); c.fill(); } }
    c.strokeStyle = 'rgba(60,50,40,.25)'; c.lineWidth = 1.5; for (let X = XL; X <= XR; X += 320) { c.beginPath(); c.moveTo(...pt(X, YF, .9)); c.lineTo(...pt(X, YF, ZB)); c.stroke(); }
    // polish: soft sheen up the middle
    c.save(); c.globalCompositeOperation = 'screen'; const sg = c.createLinearGradient(0, sy(YF, ZB), 0, H); sg.addColorStop(0, 'rgba(230,240,255,.25)'); sg.addColorStop(1, 'rgba(230,240,255,0)'); c.fillStyle = sg; poly(c, [pt(-400, YF, ZB), pt(400, YF, ZB), pt(900, YF, .9), pt(-900, YF, .9)]); c.fill(); c.restore();
    // bays between columns, far to near
    const zs = []; for (let z = 6.4; z > .9; z -= .8) zs.push(z);
    for (const z0 of zs) { const za = Math.max(z0 - .55, .62), zb = z0 - .12; if (zb < .75) continue;
      // left wall: a tall window with sky and mullions
      const wq = quadL(XL, za, zb, -440, 520); const wgc = c.createLinearGradient(0, wq[0][1], 0, wq[3][1]); wgc.addColorStop(0, '#dfeaff'); wgc.addColorStop(1, '#a8c0e0'); c.fillStyle = wgc; poly(c, wq); c.fill();
      c.strokeStyle = 'rgba(110,100,90,.8)'; c.lineWidth = Math.max(2, 14 / za); poly(c, wq); c.stroke(); c.lineWidth = Math.max(1.5, 7 / za); for (let k = 1; k < 4; k++) { const y = -440 + k * 240; c.beginPath(); c.moveTo(...pt(XL, y, za)); c.lineTo(...pt(XL, y, zb)); c.stroke(); } const zm = (za + zb) / 2; c.beginPath(); c.moveTo(...pt(XL, -440, zm)); c.lineTo(...pt(XL, 520, zm)); c.stroke();
      // sun shaft from the window onto the floor
      const k = .95, fp = [pt(XL + (YF - 520) * k, YF, za + .12), pt(XL + (YF - 520) * k, YF, zb + .12), pt(XL + (YF + 440) * k, YF, zb + .5), pt(XL + (YF + 440) * k, YF, za + .5)];
      c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(210,228,255,.3)'; poly(c, fp); c.fill(); c.fillStyle = 'rgba(210,228,255,.09)'; poly(c, [wq[0], wq[1], fp[2], fp[3]]); c.fill(); poly(c, [wq[3], wq[2], fp[1], fp[0]]); c.fill(); c.restore();
      // right wall: a tall panelled wooden door with a pediment
      const dq = quadL(XR, za + .08, zb - .08, -300, YF); const dg = c.createLinearGradient(0, dq[0][1], 0, dq[3][1]); dg.addColorStop(0, '#6a4628'); dg.addColorStop(1, '#3a2414'); c.fillStyle = dg; poly(c, dq); c.fill(); c.strokeStyle = 'rgba(30,18,8,.8)'; c.lineWidth = Math.max(1.5, 6 / za); poly(c, dq); c.stroke();
      const zmd = (za + zb) / 2; c.beginPath(); c.moveTo(...pt(XR, -300, zmd)); c.lineTo(...pt(XR, YF, zmd)); c.stroke(); for (const y of [-200, 300, 500, 800]) { c.beginPath(); c.moveTo(...pt(XR, y, za + .14)); c.lineTo(...pt(XR, y, zb - .14)); c.stroke(); }
      c.fillStyle = '#d8b050'; const [hx, hy] = pt(XR, 360, zmd - .04); c.beginPath(); c.arc(hx, hy, Math.max(2, 14 / za), 0, 7); c.fill();
      c.fillStyle = '#e8e2d4'; poly(c, quadL(XR, za, zb, -380, -310)); c.fill();
      // reflection of the door in the polish
      c.save(); c.globalAlpha = .18; c.fillStyle = '#5a3a24'; poly(c, quadL(XR - 1, za + .08, zb - .08, YF, YF + 400).map(([x, y]) => [x, y])); c.restore();
      // columns on both sides at the bay's near edge
      for (const side of [-1, 1]) { const zc = zb + .02, X0 = side < 0 ? XL : XR - 170, X1 = side < 0 ? XL + 170 : XR, inner = side < 0 ? X1 : X0, zc2 = zc + .14;
        c.fillStyle = side < 0 ? '#a8a092' : '#bcb4a4'; poly(c, [pt(inner, YC, zc), pt(inner, YC, zc2), pt(inner, YF, zc2), pt(inner, YF, zc)]); c.fill();
        const [cx0, cy0] = pt(X0, YC, zc), [cx1, cy1] = pt(X1, YF, zc); hg(c, cx0, cy0, cx1 - cx0, cy1 - cy0, side < 0 ? [[0, '#fbf6ec'], [.5, '#e8e0d0'], [1, '#b8b0a0']] : [[0, '#c8c0b0'], [.6, '#e8e0d2'], [1, '#d8d0c2']]);
        c.fillStyle = '#f4eee2'; c.fillRect(cx0 - (cx1 - cx0) * .1, cy0, (cx1 - cx0) * 1.2, (cy1 - cy0) * .04); c.fillRect(cx0 - (cx1 - cx0) * .1, cy1 - (cy1 - cy0) * .05, (cx1 - cx0) * 1.2, (cy1 - cy0) * .05);
        c.strokeStyle = 'rgba(120,110,95,.4)'; c.lineWidth = Math.max(1, 4 / zc); for (let k = 1; k < 4; k++) { const x = cx0 + (cx1 - cx0) * k / 4; c.beginPath(); c.moveTo(x, cy0 + (cy1 - cy0) * .05); c.lineTo(x, cy1 - (cy1 - cy0) * .06); c.stroke(); }
        c.save(); c.globalAlpha = .22; const rg = c.createLinearGradient(0, cy1, 0, cy1 + (cy1 - cy0) * .35); rg.addColorStop(0, '#e8e0d0'); rg.addColorStop(1, 'rgba(232,224,208,0)'); c.fillStyle = rg; c.fillRect(cx0, cy1, cx1 - cx0, (cy1 - cy0) * .35); c.restore(); }
      // coffer beam and a hanging lamp
      c.fillStyle = 'rgba(150,140,125,.5)'; poly(c, [pt(XL, YC, zb), pt(XR, YC, zb), pt(XR, YC, zb + .08), pt(XL, YC, zb + .08)]); c.fill();
      const lz = za + .1, [lx, ly0] = pt(0, YC, lz), [, ly1] = pt(0, -260, lz); c.strokeStyle = '#3a3026'; c.lineWidth = Math.max(1, 4 / lz); c.beginPath(); c.moveTo(lx, ly0); c.lineTo(lx, ly1); c.stroke(); c.fillStyle = '#fff2d0'; c.beginPath(); c.arc(lx, ly1 + 40 / lz, 46 / lz, 0, 7); c.fill(); gl(c, lx, ly1 + 40 / lz, 300 / lz, '255,215,150', .35); gl(c, lx, sy(YF, lz), 240 / lz, '255,215,150', .1); }
    // cool morning wash from the left, warm lamps in the middle
    c.save(); c.globalCompositeOperation = 'soft-light'; hg(c, 0, 0, W, H, [[0, 'rgba(160,190,255,.55)'], [1, 'rgba(255,220,170,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .4 }); },

  // 8. oval presidential-style office: curved cream wall, three tall windows with gold curtains, heavy desk, two flags, sofas, blue oval carpet
  oval_office: (c, r, W, H, P) => { const curve = x => Math.pow((x - 1280) / 1280, 2), baseY = x => 880 + 50 * curve(x), topY = x => 70 - 50 * curve(x);
    vg(c, 0, 0, W, 960, [[0, '#d8ccb0'], [1, '#c4b494']]); P.paintRegion(c, r, [[0, 0], [W, 0], [W, 960], [0, 960]], '#d4c6a8', { density: 300, len: [40, 120], w: [8, 18], ang: -Math.PI / 2, angJ: .1, al: .18, topLight: .05, botDark: -.12 });
    hg(c, 0, 0, W, 960, [[0, 'rgba(60,40,20,.35)'], [.3, 'rgba(0,0,0,0)'], [.7, 'rgba(0,0,0,0)'], [1, 'rgba(60,40,20,.35)']]);
    const curveLine = (fn, col, lw) => { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); for (let x = 0; x <= W; x += 20) { const y = fn(x); x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); };
    c.fillStyle = '#ece2cc'; c.beginPath(); c.moveTo(0, 0); for (let x = 0; x <= W; x += 20) c.lineTo(x, topY(x)); c.lineTo(W, 0); c.fill(); curveLine(topY, '#a8946e', 8); curveLine(x => topY(x) + 18, '#ece2cc', 6);
    // pilasters and panels following the curve
    for (const px of [150, 420, 2140, 2410]) { const t = topY(px) + 24, b = baseY(px); hg(c, px - 26, t, 52, b - t, [[0, '#e8dcc0'], [.5, '#f4ecd8'], [1, '#bcae90']]); }
    for (const [x0, x1] of [[200, 370], [2190, 2360]]) { c.strokeStyle = 'rgba(140,120,90,.6)'; c.lineWidth = 4; c.strokeRect(x0, 160, x1 - x0, 260); c.strokeRect(x0, 480, x1 - x0, 330); }
    // three tall windows behind the desk: daylight on a garden, gold curtains and valances
    for (const wx of [860, 1280, 1700]) { const w = 270, y0 = 160, y1 = 800; c.fillStyle = '#8a7a5a'; c.fillRect(wx - w / 2 - 20, y0 - 20, w + 40, y1 - y0 + 40);
      vg(c, wx - w / 2, y0, w, y1 - y0, [[0, '#e8f0fa'], [.6, '#c8dcee'], [.75, '#8aa878'], [1, '#5a7a4a']]); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(70,100,60,.8)'; c.beginPath(); c.arc(wx - w / 2 + r() * w, y1 - 100 + r() * 40, r.range(30, 60), 0, 7); c.fill(); }
      c.strokeStyle = '#f0ece0'; c.lineWidth = 6; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(wx - w / 2 + k * w / 3, y0); c.lineTo(wx - w / 2 + k * w / 3, y1); c.stroke(); } for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(wx - w / 2, y0 + k * (y1 - y0) / 6); c.lineTo(wx + w / 2, y0 + k * (y1 - y0) / 6); c.stroke(); }
      gl(c, wx, 480, 400, '255,250,235', .35); cone(c, wx, y1, w, w * 2.2, 400, '255,245,220', .1);
      for (const sd of [-1, 1]) { const cx = wx + sd * (w / 2 + 10); const pts = [[cx - 60, y0 - 40], [cx + 60, y0 - 40], [cx + sd * 10 + 50, y1 + 60], [cx + sd * 10 - 50, y1 + 60]]; P.paintRegion(c, r, pts, '#c89a3a', { density: 40, len: [40, 100], w: [4, 10], ang: Math.PI / 2, angJ: .05, al: .5, topLight: .15, botDark: -.3, var: 14 });
        c.strokeStyle = 'rgba(90,60,10,.55)'; c.lineWidth = 4; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(cx + k * 22, y0 - 40); c.lineTo(cx + k * 22 + sd * 4, y1 + 60); c.stroke(); } }
      c.fillStyle = '#b8882a'; c.beginPath(); c.moveTo(wx - w / 2 - 80, y0 - 60); c.lineTo(wx + w / 2 + 80, y0 - 60); c.lineTo(wx + w / 2 + 80, y0 + 10); c.quadraticCurveTo(wx, y0 + 90, wx - w / 2 - 80, y0 + 10); c.fill(); c.fillStyle = '#e0b850'; c.fillRect(wx - w / 2 - 80, y0 - 60, w + 160, 10); }
    // baseboard and parquet floor following the curve
    c.fillStyle = '#7a6040'; c.beginPath(); c.moveTo(0, baseY(0) - 30); for (let x = 0; x <= W; x += 20) c.lineTo(x, baseY(x) - 30); for (let x = W; x >= 0; x -= 20) c.lineTo(x, baseY(x)); c.fill();
    c.fillStyle = '#6a4a2e'; c.beginPath(); c.moveTo(0, baseY(0)); for (let x = 0; x <= W; x += 20) c.lineTo(x, baseY(x)); c.lineTo(W, H); c.lineTo(0, H); c.fill();
    c.save(); c.beginPath(); c.moveTo(0, baseY(0)); for (let x = 0; x <= W; x += 20) c.lineTo(x, baseY(x)); c.lineTo(W, H); c.lineTo(0, H); c.clip(); P2.fillStrokes(c, r, [0, 880, W, 560], () => true, { n: 5000, len: [30, 90], w: [4, 10], ang: 0, angJ: .05, al: .25, colFn: () => P2.shade(P2.jitter('#7a5634', r, 14), r.range(-.15, .15)) }); c.strokeStyle = 'rgba(30,18,8,.3)'; c.lineWidth = 2; for (let k = -14; k <= 14; k++) { c.beginPath(); c.moveTo(1280 + k * 180, 880); c.lineTo(1280 + k * 420, H); c.stroke(); } c.restore();
    // oval carpet: deep blue with gold rings and a generic sunburst, no emblem
    const ccx = 1280, ccy = 1190, crx = 1200, cry = 230; shadow(c, ccx, ccy + 10, crx + 40, cry + 20, .3); c.fillStyle = '#c8a860'; c.beginPath(); c.ellipse(ccx, ccy, crx, cry, 0, 0, 7); c.fill(); c.fillStyle = '#1e2e5e'; c.beginPath(); c.ellipse(ccx, ccy, crx - 26, cry - 10, 0, 0, 7); c.fill();
    c.strokeStyle = 'rgba(220,190,110,.7)'; c.lineWidth = 6; c.beginPath(); c.ellipse(ccx, ccy, crx - 110, cry - 42, 0, 0, 7); c.stroke(); c.lineWidth = 3; c.beginPath(); c.ellipse(ccx, ccy, crx - 140, cry - 54, 0, 0, 7); c.stroke();
    c.save(); c.globalAlpha = .18; for (let k = 0; k < 48; k++) { const a = k / 48 * Math.PI * 2; c.strokeStyle = k % 2 ? '#e8c870' : '#5a6aa0'; c.lineWidth = 18; c.beginPath(); c.moveTo(ccx + Math.cos(a) * 200, ccy + Math.sin(a) * 40); c.lineTo(ccx + Math.cos(a) * (crx - 170), ccy + Math.sin(a) * (cry - 64)); c.stroke(); } c.restore();
    c.fillStyle = 'rgba(230,200,120,.85)'; for (let k = 0; k < 50; k++) { const a = k / 50 * Math.PI * 2; c.beginPath(); c.arc(ccx + Math.cos(a) * (crx - 75), ccy + Math.sin(a) * (cry - 26), 5, 0, 7); c.fill(); }
    c.fillStyle = '#2a3a6e'; c.beginPath(); c.ellipse(ccx, ccy, 200, 40, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(220,190,110,.7)'; c.lineWidth = 4; c.stroke();
    P2.fillStrokes(c, r, [ccx - crx, ccy - cry, crx * 2, cry * 2], (x, y) => Math.pow((x - ccx) / crx, 2) + Math.pow((y - ccy) / cry, 2) < .9, { n: 2500, len: [8, 20], w: [2, 5], ang: 0, angJ: 1, al: .12, col: '#3a4a8a' });
    // flags either side of the windows
    hangFlag(c, true, 610, 300, 150, 420); hangFlag(c, false, 1930, 300, 150, 420);
    // desk chair back, heavy desk with carved panels, desk items
    c.fillStyle = '#2a1a14'; rr(c, 1180, 640, 200, 200, 30); c.fill(); c.fillStyle = 'rgba(255,240,210,.12)'; c.fillRect(1196, 650, 168, 12);
    shadow(c, 1280, 1000, 380, 26, .6); vg(c, 1000, 780, 560, 22, [[0, '#8a5a30'], [1, '#4a2a14']]); c.fillStyle = 'rgba(255,230,190,.45)'; c.fillRect(1000, 780, 560, 3);
    vg(c, 1010, 802, 540, 196, [[0, '#5a3418'], [1, '#2e1a0c']]); for (const [px, pw] of [[1030, 140], [1210, 140], [1390, 140]]) { c.strokeStyle = 'rgba(20,10,4,.7)'; c.lineWidth = 5; c.strokeRect(px, 826, pw, 150); c.strokeStyle = 'rgba(255,200,140,.18)'; c.lineWidth = 2; c.strokeRect(px + 10, 836, pw - 20, 130); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.arc(px + pw / 2, 900, 26, 0, 7); c.fill(); }
    c.fillStyle = '#1a1a1a'; c.fillRect(1060, 756, 60, 24); c.fillStyle = '#e8e2d0'; c.fillRect(1300, 766, 120, 12); c.fillStyle = '#c9a24a'; c.fillRect(1460, 740, 8, 40); c.fillStyle = '#2a5a3a'; poly(c, [[1430, 700], [1500, 700], [1510, 742], [1420, 742]]); c.fill(); gl(c, 1464, 740, 120, '255,220,150', .3);
    // side sofas, end tables with lamps, paintings above
    sofa(c, 40, 1060, 560, .95, '#d8ccae', { h: .9, cushions: 2, pillow: '#8a2a2a', leg: '#5a3a20' }); sofa(c, 1960, 1060, 560, .95, '#d8ccae', { h: .9, cushions: 2, pillow: '#8a2a2a', leg: '#5a3a20' });
    for (const tx of [660, 1900]) { shadow(c, tx, 1000, 70, 10, .5); vg(c, tx - 50, 900, 100, 100, [[0, '#6a4426'], [1, '#2e1a0c']]); c.fillStyle = '#e8d8b0'; c.fillRect(tx - 6, 830, 12, 70); c.fillStyle = '#f4e6c0'; poly(c, [[tx - 50, 770], [tx + 50, 770], [tx + 36, 720], [tx - 36, 720]]); c.fill(); gl(c, tx, 760, 220, '255,210,140', .45); }
    ENV.frameArt(c, r, 160, 470, 260, 190, { a: '#7a8a6a', b: '#2a3a4a', frame: '#b8902a' }); ENV.frameArt(c, r, 2140, 470, 260, 190, { a: '#c8a070', b: '#4a5a7a', frame: '#b8902a' });
    c.save(); c.globalCompositeOperation = 'soft-light'; vg(c, 0, 0, W, H, [[0, 'rgba(255,250,235,.4)'], [1, 'rgba(60,50,40,.3)']]); c.restore();
    done(c, r, W, H, P, { vig: .38 }); },
};
})();
