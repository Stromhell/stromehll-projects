// JPMorgan painted plates. Paint with: node shared/p2/paint.js jpmorgan/production/plates.js jpmorgan/production/plates all
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, { hex, rgb, mix, jitter, shade, stroke, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .4, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const woodPanel = (c, r, x, y, w, h, col) => { c.fillStyle = rgb(shade(col, -.25)); c.fillRect(x, y, w, h); const ix = x + w * .1, iy = y + h * .08, iw = w * .8, ih = h * .84;
    const g = c.createLinearGradient(ix, iy, ix + iw, iy + ih); g.addColorStop(0, rgb(shade(col, .08))); g.addColorStop(1, rgb(shade(col, -.12))); c.fillStyle = g; c.fillRect(ix, iy, iw, ih);
    for (let k = 0; k < 14; k++) { c.strokeStyle = `rgba(${r() < .5 ? '30,14,6' : '160,110,70'},.16)`; c.lineWidth = r.range(1, 3); const xx = ix + r() * iw; c.beginPath(); c.moveTo(xx, iy); c.bezierCurveTo(xx + r.gauss() * 8, iy + ih * .3, xx + r.gauss() * 8, iy + ih * .7, xx + r.gauss() * 5, iy + ih); c.stroke(); }
    c.strokeStyle = 'rgba(255,215,160,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(ix, iy + ih); c.lineTo(ix, iy); c.lineTo(ix + iw, iy); c.stroke(); c.strokeStyle = 'rgba(20,8,2,.5)'; c.beginPath(); c.moveTo(ix + iw, iy); c.lineTo(ix + iw, iy + ih); c.lineTo(ix, iy + ih); c.stroke(); };
  // stone facade with rusticated blocks, cornice and tall windows
  const stoneFacade = (c, r, x, y, w, h, col, o = {}) => { M.wall(c, r, [x, y, w, h], col, { density: 300 }); c.strokeStyle = rgb(shade(col, -.35), .45); c.lineWidth = 2;
    for (let yy = y + 30; yy < y + h; yy += 30) { c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke(); const off = ((yy - y) / 30) % 2 ? 30 : 0; for (let xx = x + off; xx < x + w; xx += 60) { c.beginPath(); c.moveTo(xx, yy - 30); c.lineTo(xx, yy); c.stroke(); } }
    c.fillStyle = rgb(shade(col, .2)); c.fillRect(x - 10, y - 18, w + 20, 18); c.fillStyle = rgb(shade(col, -.3)); c.fillRect(x - 10, y, w + 20, 6);
    const nw = o.cols ?? Math.max(2, Math.round(w / 110)), rows = o.rows ?? Math.max(1, Math.round(h / 190)); for (let i = 0; i < nw; i++) for (let j = 0; j < rows; j++) { const wx = x + (i + .5) * w / nw - 24, wy = y + 40 + j * (h - 60) / rows, wh = (h - 60) / rows - 50; const lit = r() < (o.lit ?? .4);
      c.fillStyle = rgb(shade(col, .25)); c.fillRect(wx - 8, wy - 10, 64, wh + 20); c.fillStyle = lit ? (o.litCol || '#f0c478') : '#1c2028'; c.fillRect(wx, wy, 48, wh); c.fillStyle = rgb(shade(col, .2)); c.fillRect(wx + 22, wy, 4, wh); if (lit) glow(c, wx + 24, wy + wh / 2, 90, o.litCol || '#ffc878', .12); } };

  // Gas-lit 1870s Wall Street at dusk, carriages on cobbles.
  ENV.wallSt1870 = (ctx, r, W, H) => {
    const hz = H * .7, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz, '#2a2a48', '#e0a06a', { strokes: 2200 }); ENV.clouds(ctx, r, W, 0, H * .25, 8, '#e0a070', '#8a5a5a', '#3a3048');
    for (let x = W * .3; x < W * .7; x += 70) { const bh = rr.range(140, 260); M.wall(ctx, rr, [x, hz - bh, 72, bh], mix('#6a5650', '#8a6e60', rr()), { density: 40 }); for (let y = hz - bh + 20; y < hz - 20; y += 34) if (rr() < .5) { ctx.fillStyle = 'rgba(255,200,120,.7)'; ctx.fillRect(x + 20, y, 12, 18); } }
    // Trinity Church spire at the end of the street
    { const tx = W * .5; paintRegion(ctx, rr, [[tx - 50, hz - 100], [tx - 50, hz - 380], [tx, hz - 640], [tx + 50, hz - 380], [tx + 50, hz - 100]], '#5a4a4a', { density: 120, ang: Math.PI / 2 }); }
    const blocks = [[-40, 520, 900, '#8a7a66'], [480, 300, 620, '#7a6a58'], [W - 480, 300, 640, '#857462'], [W - 520 + 520, 0, 0]];
    stoneFacade(ctx, rr, -40, hz - 900, 560, 900, '#8a7a66', { lit: .5 }); stoneFacade(ctx, rr, 520, hz - 560, 300, 560, '#76685a', { lit: .4 });
    stoneFacade(ctx, rr, W - 820, hz - 560, 300, 560, '#7e6e5c', { lit: .4 }); stoneFacade(ctx, rr, W - 520, hz - 940, 560, 940, '#8a7864', { lit: .5 });
    // doorway with the brass plate (left building)
    { const dx = 200, dy = hz; ctx.fillStyle = '#2a2018'; ctx.fillRect(dx, dy - 260, 140, 260); ctx.fillStyle = '#8a7a66'; ctx.fillRect(dx - 20, dy - 280, 180, 24); ctx.fillStyle = '#c8a040'; ctx.fillRect(dx + 160, dy - 170, 60, 34); glow(ctx, dx + 190, dy - 153, 50, '#ffd890', .4); }
    // cobbles in perspective
    { ctx.fillStyle = '#3a342e'; ctx.fillRect(0, hz, W, H - hz); for (let y = hz + 2; y < H;) { const t = (y - hz) / (H - hz), sh = 5 + t * 28, sw = 12 + t * 56; for (let x2 = -rr() * sw; x2 < W; x2 += sw) { ctx.fillStyle = rgb(jitter(mix('#4a4038', '#6a5a4a', rr()), rr, 6)); ctx.beginPath(); ctx.roundRect(x2 + 2, y, sw - 4, sh - 3, sh * .3); ctx.fill(); ctx.fillStyle = 'rgba(255,200,140,.12)'; ctx.fillRect(x2 + 4, y, sw - 8, 2); } y += sh; } }
    ctx.fillStyle = '#6a5e52'; ctx.fillRect(0, hz - 6, W, 14);
    // gas lamps
    for (const [lx, s] of [[W * .3, 1], [W * .72, .9], [W * .44, .55], [W * .58, .5]]) { ctx.fillStyle = '#1a1612'; ctx.fillRect(lx - 6 * s, hz - 420 * s + (1 - s) * 60, 12 * s, 420 * s); const ly = hz - 420 * s + (1 - s) * 60; ctx.fillStyle = '#ffe2a0'; ctx.fillRect(lx - 18 * s, ly - 44 * s, 36 * s, 40 * s); ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 4 * s; ctx.strokeRect(lx - 18 * s, ly - 44 * s, 36 * s, 40 * s); glow(ctx, lx, ly - 24 * s, 380 * s, '#ffcc80', .5); }
    // a parked carriage silhouette
    { const cx = W * .66, cy = H * .86; ctx.fillStyle = '#16120e'; ctx.beginPath(); ctx.roundRect(cx, cy - 170, 220, 120, 20); ctx.fill(); for (const wx of [cx + 30, cx + 190]) { ctx.strokeStyle = '#16120e'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(wx, cy - 30, 46, 0, 7); ctx.stroke(); for (let k = 0; k < 8; k++) { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx, cy - 30); ctx.lineTo(wx + Math.cos(k * .8) * 44, cy - 30 + Math.sin(k * .8) * 44); ctx.stroke(); } }
      ctx.fillStyle = '#16120e'; ctx.beginPath(); ctx.ellipse(cx - 160, cy - 140, 90, 44, 0, 0, 7); ctx.fill(); ctx.fillRect(cx - 230, cy - 140, 20, 140); ctx.fillRect(cx - 120, cy - 140, 20, 140); ctx.beginPath(); ctx.ellipse(cx - 260, cy - 190, 30, 50, -.5, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,200,130,.5)'; ctx.fillRect(cx + 60, cy - 150, 80, 50); }
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(0, hz, 0, H); g.addColorStop(0, 'rgba(255,180,110,.18)'); g.addColorStop(1, 'rgba(255,180,110,0)'); ctx.fillStyle = g; ctx.fillRect(0, hz, W, H - hz); ctx.restore();
    FIN(ctx, r, W, H, .42);
  };

  // Oak-panelled private library at night, lit by one fire (also the 1890s partners' room).
  ENV.morganLibrary = (ctx, r, W, H, o = {}) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 9, RH: 4.2, ch: 1.5, zf: 7.5, f: 1750, hor: .45 });
    R.shell({ back: '#4a2e1a', side: '#3e2614', ceil: '#2a1c12', floor: '#3a2416', planks: true, skirting: '#2a180c' });
    // bookcases on all walls
    { const [x0, y0, w0, h0] = R.backRect(-4.5, .1, 4.5, 4.0); ctx.fillStyle = '#24140a'; ctx.fillRect(x0, y0, w0, h0); const rows = 7, rh = h0 / rows; for (let k = 0; k < rows; k++) { if (k > 3 && Math.abs(0) < 1) {} PR.books(ctx, r, x0 + 10, y0 + (k + 1) * rh - 6, rh * 4.2, w0 - 20); ctx.fillStyle = '#5a3820'; ctx.fillRect(x0, y0 + (k + 1) * rh - 8, w0, 10); } for (let x = x0; x <= x0 + w0; x += w0 / 6) { ctx.fillStyle = '#4a2c16'; ctx.fillRect(x - 8, y0, 16, h0); } }
    for (const xw of [-4.5, 4.5]) for (let z = 2; z < 7.5; z += 1.1) R.onSide(xw, 4.0, z, (c, s) => { c.fillStyle = '#24140a'; c.fillRect(0, 0, 1.05 * s, 3.9 * s); for (let k = 0; k < 7; k++) { PR.books(c, r, 6, (k + 1) * .55 * s - 6, s * .55 * 4.2 / 1, 1.05 * s - 12); c.fillStyle = '#5a3820'; c.fillRect(0, (k + 1) * .55 * s - 8, 1.05 * s, 8); } c.fillStyle = '#4a2c16'; c.fillRect(0, 0, 10, 3.9 * s); });
    // fireplace centred on the back wall
    { const [x0, y0, w0, h0] = R.backRect(-1.2, 0, 1.2, 1.6); ctx.fillStyle = '#6a5a48'; ctx.fillRect(x0 - 30, y0 - 40, w0 + 60, h0 + 40); ctx.fillStyle = '#8a7a64'; ctx.fillRect(x0 - 50, y0 - 60, w0 + 100, 30); ctx.fillStyle = '#120a06'; ctx.fillRect(x0 + 40, y0 + 40, w0 - 80, h0 - 40);
      const fx = x0 + w0 / 2, fy = y0 + h0 - 20; for (let k = 0; k < 60; k++) { const c = mix('#ff5a1a', '#ffe08a', r()); ctx.fillStyle = rgb(c, .7); ctx.beginPath(); ctx.ellipse(fx + r.gauss() * 50, fy - Math.abs(r.gauss()) * 60, r.range(6, 16), r.range(14, 40), r.gauss() * .2, 0, 7); ctx.fill(); }
      glow(ctx, fx, fy - 40, 900, '#ff9a40', .5); glow(ctx, fx, fy - 30, 300, '#ffd080', .6);
      // portrait above the mantel
      ctx.fillStyle = '#c8a040'; ctx.fillRect(fx - 110, y0 - 360, 220, 280); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(fx - 94, y0 - 344, 188, 248); ctx.fillStyle = '#6a5040'; ctx.beginPath(); ctx.ellipse(fx, y0 - 250, 50, 60, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#1a1210'; ctx.fillRect(fx - 80, y0 - 190, 160, 94); }
    // warm floor light + rug + armchairs
    ENV.rug(ctx, r, W / 2, H * .8, 1500, 260, '#6a1e1a', '#c8a04a');
    for (const [x, z, f] of [[-2.2, 4.6, 1], [2.2, 4.6, -1], [-1.6, 3.2, 1]]) { const [cx, cy] = R.p(x, 0, z), s = R.s(z); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(cx, cy, .5 * s, .1 * s, 0, 0, 7); ctx.fill(); const g = ctx.createLinearGradient(cx - .4 * s, 0, cx + .4 * s, 0); g.addColorStop(f > 0 ? 1 : 0, '#a03a24'); g.addColorStop(f > 0 ? 0 : 1, '#3a120c'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(cx - .42 * s, cy - 1.0 * s, .84 * s, .6 * s, .12 * s); ctx.fill(); ctx.beginPath(); ctx.roundRect(cx - .5 * s, cy - .6 * s, 1.0 * s, .5 * s, .1 * s); ctx.fill(); ctx.fillStyle = '#c8a040'; for (let k = 0; k < 8; k++) ctx.fillRect(cx - .4 * s + k * .1 * s, cy - .6 * s, 3, 3); }
    if (o.desk) { R.box(-1.1, 0, 4.4, 2.2, .78, .9, '#4a2a14', { density: 80 }); R.box(-1.15, .78, 4.38, 2.3, .05, .95, '#2a180c', { density: 30 }); const [lx, ly] = R.p(.8, .83, 4.8), s = R.s(4.8); ctx.fillStyle = '#1f6a3a'; ctx.beginPath(); ctx.moveTo(lx - .16 * s, ly - .3 * s); ctx.quadraticCurveTo(lx, ly - .44 * s, lx + .16 * s, ly - .3 * s); ctx.closePath(); ctx.fill(); glow(ctx, lx, ly - .2 * s, 340, '#ffe2a0', .45); }
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; const v = ctx.createRadialGradient(W / 2, H * .7, 200, W / 2, H * .5, W * .7); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(60,40,30,1)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); ctx.restore();
    FIN(ctx, r, W, H, .5);
  };

  // Sunny 1960s Queens street: brick row houses, stoops and fire escapes.
  ENV.queens1960 = (ctx, r, W, H) => {
    const hz = H * .66, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz, '#7aa6d6', '#dceaf2', { strokes: 2400 }); ENV.clouds(ctx, r, W, 0, H * .3, 10, '#ffffff', '#d0dae6', '#9aa8bc');
    let x = -30; let i = 0; while (x < W) { const bw = rr.range(330, 420), bh = rr.range(560, 680), col = ['#9a4a34', '#8a5a40', '#a86a4a', '#7a4030'][i++ % 4];
      M.wall(ctx, rr, [x, hz - bh, bw, bh], col, { density: 400 }); ctx.strokeStyle = 'rgba(230,210,190,.18)'; ctx.lineWidth = 1.5; for (let y = hz - bh + 10; y < hz; y += 12) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + bw, y); ctx.stroke(); }
      ctx.fillStyle = '#d8cfc0'; ctx.fillRect(x - 6, hz - bh - 16, bw + 12, 22);
      for (let fy = hz - bh + 50; fy < hz - 180; fy += 170) for (const fx of [x + 50, x + bw - 130]) { ctx.fillStyle = '#e8e0d0'; ctx.fillRect(fx - 8, fy - 8, 96, 128); const g = ctx.createLinearGradient(fx, fy, fx + 80, fy + 112); g.addColorStop(0, '#a8c4e0'); g.addColorStop(1, '#3a4a5a'); ctx.fillStyle = g; ctx.fillRect(fx, fy, 80, 112); ctx.fillStyle = '#e8e0d0'; ctx.fillRect(fx, fy + 54, 80, 5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(fx + 4, fy + 4, 30, 46); }
      // fire escape
      { const ex = x + bw * .28; ctx.strokeStyle = '#1e1e22'; ctx.lineWidth = 4; for (let fy = hz - bh + 180; fy < hz - 170; fy += 170) { ctx.strokeRect(ex, fy, 150, 6); for (let k = 0; k < 10; k++) { ctx.beginPath(); ctx.moveTo(ex + k * 16, fy); ctx.lineTo(ex + k * 16, fy - 50); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(ex, fy - 50); ctx.lineTo(ex + 150, fy - 50); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ex + 10, fy); ctx.lineTo(ex + 140, fy + 164); ctx.stroke(); } }
      // stoop
      ctx.fillStyle = '#3a2418'; ctx.fillRect(x + bw / 2 - 40, hz - 250, 80, 140); ctx.fillStyle = '#e8e0d0'; ctx.fillRect(x + bw / 2 - 50, hz - 262, 100, 12); for (let k = 0; k < 5; k++) { const sw = 110 + k * 10, sy = hz - 110 + k * 22; ctx.fillStyle = '#b8ae9e'; ctx.fillRect(x + bw / 2 - sw / 2, sy, sw, 22); ctx.fillStyle = 'rgba(60,50,40,.35)'; ctx.fillRect(x + bw / 2 - sw / 2, sy + 18, sw, 4); } ctx.strokeStyle = '#1e1e22'; ctx.lineWidth = 4; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + bw / 2 + d * 60, hz - 150); ctx.lineTo(x + bw / 2 + d * 80, hz); ctx.stroke(); }
      x += bw; }
    // sidewalk + street
    paintRegion(ctx, r, [[0, hz], [W, hz], [W, hz + 90], [0, hz + 90]], '#c8c0b2', { density: 200, ang: 0 }); for (let x2 = 0; x2 < W; x2 += 160) { ctx.strokeStyle = 'rgba(80,70,60,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x2, hz); ctx.lineTo(x2 - 30, hz + 90); ctx.stroke(); }
    ctx.fillStyle = '#9a9288'; ctx.fillRect(0, hz + 90, W, 12); ENV.texBand(ctx, r, W, Math.round(hz + 102), H, [[0, [92, 90, 88]], [1, [70, 68, 66]]], { sx: .004, persp: 1.1 });
    // trees + parked car + hydrant
    for (const tx of [W * .14, W * .62]) { ctx.fillStyle = '#4a3424'; ctx.fillRect(tx - 8, hz - 180, 16, 220); for (let k = 0; k < 400; k++) { const a = rr() * 7, d = Math.sqrt(rr()) * 150; stroke(ctx, rr, tx + Math.cos(a) * d, hz - 260 + Math.sin(a) * d * .7, 16, rr() * 6, 7, mix('#3e6a2a', '#9ac060', .5 - Math.sin(a) * .3 * d / 150), .6); } }
    { const cx = W * .42, cy = hz + 210; ctx.fillStyle = '#7ab0b0'; ctx.beginPath(); ctx.roundRect(cx, cy - 90, 420, 70, 20); ctx.fill(); ctx.beginPath(); ctx.roundRect(cx + 90, cy - 150, 220, 70, 24); ctx.fill(); ctx.fillStyle = '#c8dce8'; ctx.fillRect(cx + 110, cy - 140, 80, 50); ctx.fillRect(cx + 210, cy - 140, 80, 50); ctx.fillStyle = '#e8e8e8'; ctx.fillRect(cx, cy - 34, 420, 10); ctx.fillStyle = '#16161a'; for (const wx of [cx + 80, cx + 340]) { ctx.beginPath(); ctx.arc(wx, cy - 16, 36, 0, 7); ctx.fill(); } }
    { const hx = W * .82, hy = hz + 70; ctx.fillStyle = '#c03028'; ctx.beginPath(); ctx.roundRect(hx - 16, hy - 60, 32, 60, 8); ctx.fill(); ctx.fillRect(hx - 26, hy - 40, 52, 12); }
    FIN(ctx, r, W, H, .25);
  };

  // Neon-lit Florida street at night with palms, club sign.
  ENV.neonClub = (ctx, r, W, H) => {
    const hz = H * .72, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz, '#0a0a24', '#3a2050', { strokes: 1600 });
    M.wall(ctx, rr, [W * .2, hz - 520, W * .62, 540], '#2a2438', { density: 300 });
    ctx.fillStyle = '#1a1626'; ctx.fillRect(W * .2, hz - 540, W * .62, 24);
    for (const [bx, bw, bh, col] of [[-20, W * .22, 360, '#30283a'], [W * .82, W * .2, 320, '#2c2a3e']]) { M.wall(ctx, rr, [bx, hz - bh, bw, bh], col, { density: 160 }); for (let k = 0; k < 3; k++) { ctx.fillStyle = rr() < .5 ? 'rgba(255,200,120,.6)' : 'rgba(30,26,40,.9)'; ctx.fillRect(bx + 40 + k * bw / 3, hz - bh + 60, bw / 4, 90); } ctx.fillStyle = rr() < .5 ? '#2a8a7a' : '#8a2a5a'; ctx.fillRect(bx + 20, hz - 160, bw - 40, 30); }
    for (let k = 0; k < 14; k++) { ctx.fillStyle = k % 2 ? '#e8e0f0' : '#2a9a8a'; poly(ctx, [[W * .3 + k * W * .03, hz - 250], [W * .3 + (k + 1) * W * .03, hz - 250], [W * .3 + (k + 1) * W * .03 + 10, hz - 200], [W * .3 + k * W * .03 + 10, hz - 200]]); ctx.fill(); }
    // neon sign
    { const sx = W * .5, sy = hz - 380; ctx.save(); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.shadowBlur = 40; ctx.shadowColor = '#ff4fa8'; ctx.strokeStyle = '#ff8fd0'; ctx.beginPath(); ctx.roundRect(sx - 260, sy - 90, 520, 180, 40); ctx.stroke(); ctx.shadowColor = '#3ff0e0'; ctx.strokeStyle = '#9ff8f0'; ctx.lineWidth = 9; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(sx - 190 + k * 90, sy - 30); ctx.lineTo(sx - 150 + k * 90, sy + 30); ctx.stroke(); } ctx.restore(); glow(ctx, sx, sy, 700, '#ff4fa8', .35); glow(ctx, sx, sy, 400, '#3ff0e0', .2); }
    // door + bouncer rope
    { const dx = W * .46; ctx.fillStyle = '#0c0a12'; ctx.fillRect(dx, hz - 200, 160, 200); ctx.fillStyle = 'rgba(255,80,160,.3)'; ctx.fillRect(dx + 10, hz - 190, 140, 180); for (const px of [dx - 140, dx - 20]) { ctx.fillStyle = '#c8a040'; ctx.fillRect(px, hz - 70, 10, 70); } ctx.strokeStyle = '#a01a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(dx - 135, hz - 64); ctx.quadraticCurveTo(dx - 75, hz - 30, dx - 15, hz - 64); ctx.stroke(); }
    // palms
    const palm = (x, y, h, s) => { ctx.strokeStyle = '#0e0c14'; ctx.lineWidth = 18 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 40 * s, y - h / 2, x + 20 * s, y - h); ctx.stroke(); for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * .38, L = 200 * s; ctx.lineWidth = 10 * s; ctx.beginPath(); ctx.moveTo(x + 20 * s, y - h); ctx.quadraticCurveTo(x + 20 * s + Math.cos(a) * L * .6, y - h + Math.sin(a) * L * .4 - 30 * s, x + 20 * s + Math.cos(a) * L, y - h + Math.sin(a) * L * .3 + 60 * s); ctx.stroke(); } };
    palm(W * .1, hz + 10, 700, 1.2); palm(W * .9, hz + 10, 760, 1.3); palm(W * .78, hz, 520, .8);
    ENV.texBand(ctx, r, W, Math.round(hz), H, [[0, [30, 26, 40]], [1, [18, 16, 26]]], { sx: .004, persp: 1.1 });
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (const [c, x0] of [['rgba(255,80,170,.3)', W * .5], ['rgba(60,240,220,.18)', W * .45]]) { const g = ctx.createLinearGradient(0, hz, 0, H); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x0 - 280, hz, 560, H - hz); } ctx.restore();
    FIN(ctx, r, W, H, .45);
  };

  // Grey Chicago Loop by day, wind off the lake; elevated train track.
  ENV.chicagoLoop = (ctx, r, W, H) => {
    const hz = H * .74, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz, '#7a8696', '#c8ccd0', { strokes: 2800 }); ENV.clouds(ctx, r, W, 0, H * .35, 16, '#e0e2e4', '#a0a6b0', '#6a707a');
    for (let i = 0; i < 26; i++) { const bx = rr.range(-80, W), bw = rr.range(110, 240), bh = rr.range(300, 760), col = mix('#6a6e74', '#9a948a', rr()); M.wall(ctx, rr, [bx, hz - bh, bw, bh], col, { density: 160 }); M.windowGrid(ctx, rr, [bx + 10, hz - bh + 16, bw - 20, bh - 30], Math.max(3, bw / 22 | 0), Math.max(6, bh / 28 | 0), '#3e444e', 'rgba(0,0,0,0)', .08, '#f0d090'); ctx.fillStyle = rgb(shade(col, .2)); ctx.fillRect(bx - 4, hz - bh - 8, bw + 8, 10); }
    // Bank One tower hero
    { const tx = W * .55; M.wall(ctx, rr, [tx - 120, hz - 980, 240, 980], '#8a8e94', { density: 260 }); M.windowGrid(ctx, rr, [tx - 108, hz - 960, 216, 940], 10, 36, '#4a525e', 'rgba(0,0,0,0)', .05, '#f0d090'); ctx.fillStyle = '#5a6068'; poly(ctx, [[tx - 120, hz - 980], [tx, hz - 1060], [tx + 120, hz - 980]]); ctx.fill(); }
    // elevated L track
    { const ty = hz - 60; ctx.fillStyle = '#3a3c40'; ctx.fillRect(0, ty, W, 26); for (let x = 20; x < W; x += 160) { ctx.fillRect(x, ty + 26, 16, 90); ctx.save(); ctx.strokeStyle = '#3a3c40'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, ty + 26); ctx.lineTo(x + 80, ty + 80); ctx.lineTo(x + 160, ty + 26); ctx.stroke(); ctx.restore(); } }
    ENV.texBand(ctx, r, W, Math.round(hz + 50), H, [[0, [90, 92, 96]], [1, [64, 66, 70]]], { sx: .004, persp: 1.1 }); ctx.fillStyle = '#9a9a96'; ctx.fillRect(0, hz + 40, W, 20);
    { const dx = W * .52; ctx.fillStyle = '#2a2e34'; ctx.fillRect(dx, hz - 140 + 50, 200, 140); ctx.fillStyle = 'rgba(200,220,240,.35)'; for (let k = 0; k < 3; k++) ctx.fillRect(dx + 10 + k * 64, hz - 80, 56, 120); }
    ctx.save(); ctx.strokeStyle = 'rgba(230,234,240,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 300; i++) { const x = r.range(0, W), y = r.range(0, H); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 60, y + 6); ctx.stroke(); } ctx.restore();
    FIN(ctx, r, W, H, .3);
  };

  // Midtown Manhattan street in the rain with a tall glass tower (Bear Stearns, 383 Madison).
  ENV.rainTower = (ctx, r, W, H, o = {}) => {
    const hz = H * .8, rr = P.RNG(r.int(1, 1e6)), dawn = o.dawn; M.sky(ctx, r, W, hz, dawn ? '#3a4a6a' : '#1e2430', dawn ? '#e8b080' : '#5a6070', { strokes: 2400 }); ENV.clouds(ctx, r, W, 0, H * .3, 14, dawn ? '#f0c8a0' : '#6a707a', dawn ? '#a07a7a' : '#3e4450', '#22262e');
    for (const [bx, bw, bh] of [[-40, 380, 900], [W - 360, 400, 820], [W * .2, 220, 600], [W * .7, 200, 640]]) { const col = '#4a4e56'; M.wall(ctx, rr, [bx, hz - bh, bw, bh], col, { density: 200 }); M.windowGrid(ctx, rr, [bx + 14, hz - bh + 20, bw - 28, bh - 40], Math.max(4, bw / 30 | 0), Math.max(8, bh / 30 | 0), '#1e2228', 'rgba(0,0,0,0)', dawn ? .1 : .35, '#f0c890'); }
    // the octagonal glass tower
    { const tx = W * .5, base = hz, top = H * .02; const g = ctx.createLinearGradient(tx - 200, 0, tx + 200, 0); g.addColorStop(0, '#2a3a50'); g.addColorStop(.5, dawn ? '#c8a080' : '#6a7a90'); g.addColorStop(1, '#1e2836'); ctx.fillStyle = g; poly(ctx, [[tx - 200, base], [tx - 200, top + 160], [tx - 120, top + 40], [tx + 120, top + 40], [tx + 200, top + 160], [tx + 200, base]]); ctx.fill();
      ctx.strokeStyle = 'rgba(200,220,240,.18)'; ctx.lineWidth = 2; for (let y = top + 60; y < base; y += 22) { ctx.beginPath(); ctx.moveTo(tx - 200, y); ctx.lineTo(tx + 200, y); ctx.stroke(); } for (let x = tx - 190; x < tx + 200; x += 26) { ctx.beginPath(); ctx.moveTo(x, top + 160); ctx.lineTo(x, base); ctx.stroke(); }
      ctx.fillStyle = 'rgba(30,40,56,.6)'; poly(ctx, [[tx - 200, top + 160], [tx - 120, top + 40], [tx - 70, top + 40], [tx - 140, top + 160]]); ctx.fill(); glow(ctx, tx, top + 100, 200, dawn ? '#ffd8a0' : '#9ab8e0', .3); }
    ENV.texBand(ctx, r, W, Math.round(hz), H, [[0, [40, 44, 52]], [1, [22, 24, 30]]], { sx: .004, persp: 1.1 });
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 14; i++) { const x = rr.range(0, W), g = ctx.createLinearGradient(0, hz, 0, H); g.addColorStop(0, rr() < .5 ? 'rgba(255,200,120,.3)' : 'rgba(255,80,60,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - 8, hz, 16, H - hz); } ctx.restore();
    FIN(ctx, r, W, H, .4, 90000);
    if (!dawn) { ctx.save(); for (let i = 0; i < 1800; i++) { const x = r.range(0, W), y = r.range(0, H), l = r.range(24, 60); ctx.strokeStyle = `rgba(210,220,235,${r.range(.15, .4)})`; ctx.lineWidth = r.range(1, 2.5); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - l * .2, y + l); ctx.stroke(); } ctx.restore(); }
  };

  // TV newsroom: wall of screens with red tickers, desks.
  ENV.newsroom = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 12, RH: 3.6, ch: 1.6, zf: 9, f: 1600, hor: .45 });
    R.shell({ back: '#262a38', side: '#30343e', ceil: '#1a1c24', floor: '#4a4c54', planks: false });
    { const [x0, y0, w0, h0] = R.backRect(-5.5, .9, 5.5, 3.3); ctx.fillStyle = '#0a0b10'; ctx.fillRect(x0 - 10, y0 - 10, w0 + 20, h0 + 20); const cols = 6, rows = 3, cw = w0 / cols, chh = h0 / rows;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const x = x0 + i * cw + 4, y = y0 + j * chh + 4, w = cw - 8, h = chh - 8; const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, '#1a2a48'); g.addColorStop(1, '#0a1428'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#ff4a3a'; ctx.lineWidth = 4; ctx.beginPath(); let v = .2 + r() * .2; for (let k = 0; k <= 20; k++) { v = Math.min(.92, v + r() * .06 - .005); const px = x + w * k / 20, py = y + h * v; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.fillStyle = '#c0201a'; ctx.fillRect(x, y + h - 22, w, 22); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 6; k++) ctx.fillRect(x + 8 + k * w / 6, y + h - 14, w / 9, 6); }
      glow(ctx, x0 + w0 / 2, y0 + h0 / 2, 900, '#ff4a3a', .18); }
    for (const z of [7.2, 5.6, 4.2]) for (const x of [-4.4, -1.2, 2.0]) { R.box(x, 0, z, 2.2, .74, .7, '#5a5e6a', { density: 40 }); const [cx, cy] = R.p(x + 1.1, 0, z - .35); PR.officeChair(ctx, r, cx, cy, R.s(z - .35), { col: '#1b1d22' }); const [mx, my] = R.p(x + 1.1, .76, z + .4), s = R.s(z + .4); ctx.fillStyle = '#0c0e14'; ctx.fillRect(mx - .25 * s, my - .3 * s, .5 * s, .3 * s); ctx.fillStyle = 'rgba(255,90,70,.6)'; ctx.fillRect(mx - .23 * s, my - .28 * s, .46 * s, .26 * s); }
    for (let z = 2; z < 9; z += 1.2) for (const x of [-3, 0, 3]) { const [lx, ly] = R.p(x, 3.6, z); ctx.fillStyle = '#e8f0ff'; ctx.fillRect(lx - 80 * 3 / z, ly, 160 * 3 / z, 8 * 3 / z); glow(ctx, lx, ly + 10, 160 * 3 / z, '#c8d8ff', .18); }
    FIN(ctx, r, W, H, .42);
  };
})(window);

window.PLATES = {
  boardroom: (c, r, W, H) => ENV.boardroom(c, r, W, H),
  trading: (c, r, W, H) => ENV.trading(c, r, W, H),
  skyline: (c, r, W, H) => ENV.skylinePlate(c, r, W, H),
  court: (c, r, W, H) => ENV.courthouse(c, r, W, H),
  bank: (c, r, W, H) => ENV.bankHall(c, r, W, H),
  suburb: (c, r, W, H) => ENV.suburb(c, r, W, H),
  office: (c, r, W, H) => ENV.office2(c, r, W, H, { night: true }),
  office_day: (c, r, W, H) => ENV.office2(c, r, W, H, { night: false }),
  kitchen: (c, r, W, H) => ENV.kitchen(c, r, W, H),
  wallst_1870: (c, r, W, H) => ENV.wallSt1870(c, r, W, H),
  library: (c, r, W, H) => ENV.morganLibrary(c, r, W, H),
  partners_room: (c, r, W, H) => ENV.morganLibrary(c, r, W, H, { desk: true }),
  queens: (c, r, W, H) => ENV.queens1960(c, r, W, H),
  neon_club: (c, r, W, H) => ENV.neonClub(c, r, W, H),
  chicago: (c, r, W, H) => ENV.chicagoLoop(c, r, W, H),
  rain_tower: (c, r, W, H) => ENV.rainTower(c, r, W, H),
  dawn_tower: (c, r, W, H) => ENV.rainTower(c, r, W, H, { dawn: true }),
  newsroom: (c, r, W, H) => ENV.newsroom(c, r, W, H),
  map_northeast: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -82, lon1: -66, lat0: 37, lat1: 46 }, grid: 2, compass: [-81, 38], title: 'New York', titleXY: [1880, 1010],
    labels: [[-74, 40.7, 'New York', 28, true], [-71.06, 42.36, 'Boston', 20, true], [-75.16, 39.95, 'Philadelphia', 20, true], [-77.04, 38.9, 'Washington', 20, true]], mountains: [[-78, 41, 4, 2]], rivers: [], greens: [[-76, 42, 4]], deserts: [] }),
  map_us: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -126, lon1: -66, lat0: 24, lat1: 50 }, grid: 10, compass: [-123, 27], title: 'United States', titleXY: [1880, 1010],
    labels: [[-74, 40.7, 'New York', 24, true], [-87.6, 41.9, 'Chicago', 22, true], [-122.4, 37.8, 'San Francisco', 22, true], [-122.3, 47.6, 'Seattle', 20, true], [-80.2, 25.8, 'Miami', 20, true]], mountains: [[-110, 42, 10, 3]], rivers: [], greens: [[-85, 38, 8]], deserts: [[-112, 34, 6]] }),
};
