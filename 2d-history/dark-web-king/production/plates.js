// Dark Web King painted plates. Paint with: node shared/p2/paint.js dark-web-king/production/plates.js dark-web-king/production/plates all
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, { hex, rgb, mix, jitter, shade, stroke, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .4, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const woodPanel = (c, r, x, y, w, h, col) => { c.fillStyle = rgb(shade(col, -.25)); c.fillRect(x, y, w, h); const ix = x + w * .1, iy = y + h * .08, iw = w * .8, ih = h * .84;
    const g = c.createLinearGradient(ix, iy, ix + iw, iy + ih); g.addColorStop(0, rgb(shade(col, .08))); g.addColorStop(1, rgb(shade(col, -.12))); c.fillStyle = g; c.fillRect(ix, iy, iw, ih);
    for (let k = 0; k < 14; k++) { c.strokeStyle = `rgba(${r() < .5 ? '30,14,6' : '160,110,70'},.16)`; c.lineWidth = r.range(1, 3); const xx = ix + r() * iw; c.beginPath(); c.moveTo(xx, iy); c.bezierCurveTo(xx + r.gauss() * 8, iy + ih * .3, xx + r.gauss() * 8, iy + ih * .7, xx + r.gauss() * 5, iy + ih); c.stroke(); }
    c.strokeStyle = 'rgba(255,215,160,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(ix, iy + ih); c.lineTo(ix, iy); c.lineTo(ix + iw, iy); c.stroke(); c.strokeStyle = 'rgba(20,8,2,.5)'; c.beginPath(); c.moveTo(ix + iw, iy); c.lineTo(ix + iw, iy + ih); c.lineTo(ix, iy + ih); c.stroke(); };
  const tree = (rr, ctx, x, y, h, rad, dark, light, n = 500) => { ctx.strokeStyle = '#3a2a1e'; ctx.lineWidth = h * .06; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + rr.gauss() * 20, y - h * .5, x, y - h * .75); ctx.stroke();
    for (let k = 0; k < n; k++) { const a = rr() * 7, d = Math.sqrt(rr()) * rad, px = x + Math.cos(a) * d, py = y - h * .8 + Math.sin(a) * d * .65, up = Math.max(0, Math.min(1, .5 - Math.sin(a) * d / rad * .5 + rr.gauss() * .12)); stroke(ctx, rr, px, py, rad * .12, rr() * 6, rad * .05, mix(dark, light, up), .6); } };

  // Rain-wet alley at night under a sodium lamp.
  ENV.alley = (ctx, r, W, H) => {
    const rr = P.RNG(r.int(1, 1e6)), vx = W * .52, vy = H * .5; ctx.fillStyle = '#0a0c12'; ctx.fillRect(0, 0, W, H); M.sky(ctx, r, W, H * .3, '#05070c', '#141a26', { strokes: 600 });
    // two brick walls converging
    for (const side of [-1, 1]) { const xo = side < 0 ? 0 : W, xi = vx + side * 160; const pts = [[xo, -50], [xi, vy - 300], [xi, vy + 120], [xo, H]]; paintRegion(ctx, r, pts, side < 0 ? '#3a2a26' : '#2e2420', { density: 500, len: [20, 60], w: [6, 14], ang: 0, angJ: .2, al: .4 });
      ctx.save(); poly(ctx, pts); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2; for (let t = 0; t < 1; t += .025) { const y0 = -50 + t * (H + 50), y1 = vy - 300 + t * 420; ctx.beginPath(); ctx.moveTo(xo, y0); ctx.lineTo(xi, y1); ctx.stroke(); } ctx.restore();
      // fire-escape ladder + pipes + a door
      ctx.strokeStyle = '#141416'; ctx.lineWidth = 6; for (let k = 0; k < 3; k++) { const t = .2 + k * .25, x = xo + (xi - xo) * t; ctx.beginPath(); ctx.moveTo(x, -50 + t * (vy + 250)); ctx.lineTo(x, H * .9 - t * (H * .9 - vy - 120)); ctx.stroke(); }
      { const t = .35, x0 = xo + (xi - xo) * t, x1 = xo + (xi - xo) * (t + .12); ctx.fillStyle = '#16120e'; poly(ctx, [[x0, H * .45], [x1, H * .47], [x1, vy + 90 + (1 - t - .12) * 200], [x0, vy + 120 + (1 - t) * 260]]); ctx.fill(); } }
    // far end: street glow
    glow(ctx, vx, vy, 300, '#6a7aa0', .4);
    // wet ground with puddle reflections
    paintRegion(ctx, r, [[0, H], [vx - 160, vy + 120], [vx + 160, vy + 120], [W, H]], '#1a1c22', { density: 400, len: [20, 60], w: [4, 10], ang: 0, angJ: .1, al: .35 });
    // sodium lamp on the right wall
    const lx = W * .68, ly = H * .26; ctx.strokeStyle = '#141416'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(lx + 120, ly - 30); ctx.lineTo(lx, ly - 30); ctx.lineTo(lx, ly); ctx.stroke(); ctx.fillStyle = '#ffb860'; ctx.beginPath(); ctx.ellipse(lx, ly + 10, 34, 14, 0, 0, 7); ctx.fill(); glow(ctx, lx, ly + 10, 700, '#ff9a3a', .5);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,150,60,.12)'; poly(ctx, [[lx - 30, ly + 14], [lx + 30, ly + 14], [lx + 420, H], [lx - 420, H]]); ctx.fill(); const g = ctx.createRadialGradient(lx, H * .86, 0, lx, H * .86, 520); g.addColorStop(0, 'rgba(255,160,70,.35)'); g.addColorStop(1, 'rgba(255,160,70,0)'); ctx.fillStyle = g; ctx.fillRect(0, H * .6, W, H * .4); ctx.restore();
    // bins and boxes
    for (const [x, y, w, h, col] of [[W * .16, H * .88, 220, 200, '#2a3a30'], [W * .26, H * .8, 120, 90, '#5a4630'], [W * .82, H * .92, 260, 220, '#2a2e3a']]) { ctx.fillStyle = col; ctx.fillRect(x - w / 2, y - h, w, h); ctx.fillStyle = 'rgba(255,170,90,.15)'; ctx.fillRect(x - w / 2, y - h, w, 8); M.contactShadow(ctx, x, y, w * .6, 16, .5); }
    FIN(ctx, r, W, H, .5, 90000);
    ctx.save(); for (let i = 0; i < 1500; i++) { const x = r.range(0, W), y = r.range(0, H), l = r.range(20, 50); ctx.strokeStyle = `rgba(255,200,150,${r.range(.08, .3)})`; ctx.lineWidth = r.range(1, 2.4); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - l * .15, y + l); ctx.stroke(); } ctx.restore();
  };

  // Iceberg under a night sea: tip above, huge glowing body below. part: 'whole' | 'deep'
  ENV.iceberg = (ctx, r, W, H, o = {}) => {
    const rr = P.RNG(r.int(1, 1e6)), sea = o.deep ? -H * 2 : H * .3;
    if (!o.deep) { M.sky(ctx, r, W, sea, '#060a1c', '#1a2a4a', { strokes: 1400 }); for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(255,255,255,${rr.range(.3, .9)})`; ctx.fillRect(rr.range(0, W), rr.range(0, sea - 20), 2, 2); } glow(ctx, W * .82, H * .1, 60, '#f4f0e0', .9); }
    const g = ctx.createLinearGradient(0, Math.max(0, sea), 0, H); g.addColorStop(0, o.deep ? '#04101e' : '#0e3050'); g.addColorStop(1, o.deep ? '#010408' : '#03101e'); ctx.fillStyle = g; ctx.fillRect(0, Math.max(0, sea), W, H);
    const cx = W * .5; if (!o.deep) { // tip
      ctx.fillStyle = '#e8f2fa'; poly(ctx, [[cx - 260, sea], [cx - 160, sea - 140], [cx - 60, sea - 190], [cx + 40, sea - 160], [cx + 140, sea - 200], [cx + 260, sea]]); ctx.fill(); ctx.fillStyle = 'rgba(120,160,200,.45)'; poly(ctx, [[cx + 40, sea - 160], [cx + 140, sea - 200], [cx + 260, sea], [cx + 60, sea]]); ctx.fill();
      // underwater body
      const body = [[cx - 260, sea], [cx - 520, sea + 260], [cx - 700, sea + 620], [cx - 560, H + 40], [cx + 600, H + 40], [cx + 760, sea + 560], [cx + 520, sea + 220], [cx + 260, sea]]; const bg = ctx.createLinearGradient(0, sea, 0, H); bg.addColorStop(0, 'rgba(140,200,230,.75)'); bg.addColorStop(1, 'rgba(30,70,110,.6)'); ctx.fillStyle = bg; poly(ctx, body); ctx.fill();
      for (let i = 0; i < 40; i++) { ctx.strokeStyle = 'rgba(200,235,255,.15)'; ctx.lineWidth = rr.range(2, 6); const x = cx + rr.gauss() * 300, y = sea + rr.range(40, H - sea); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rr.gauss() * 80, y + rr.range(40, 120)); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(200,230,250,.6)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x < W; x += 20) ctx.lineTo(x, sea + Math.sin(x * .02) * 4); ctx.stroke();
      ctx.fillStyle = 'rgba(160,200,230,.25)'; for (let k = 0; k < 7; k++) { const x = rr.range(0, W); ctx.fillRect(x, sea - 2, rr.range(60, 200), 3); }
    } else { const body = [[-200, -20], [W + 200, -20], [W * .9, H * .7], [W * .6, H + 40], [W * .4, H + 40], [W * .1, H * .7]]; ctx.fillStyle = 'rgba(20,50,80,.7)'; poly(ctx, body); ctx.fill(); for (let i = 0; i < 6; i++) glow(ctx, W * (.25 + i * .1), H * (.5 + (i % 2) * .15), 80, '#ffb860', .5); }
    for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(180,220,255,${rr.range(.05, .3)})`; ctx.beginPath(); ctx.arc(rr.range(0, W), rr.range(Math.max(0, sea), H), rr.range(1, 4), 0, 7); ctx.fill(); }
    FIN(ctx, r, W, H, .45, 80000);
  };

  // Public library reading room: tall windows, slanting afternoon light, bookshelves.
  ENV.libraryRoom = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 11, RH: 4.4, ch: 1.4, zf: 8, f: 1650, hor: .44 });
    R.shell({ back: '#e6dccb', side: '#dcd0bc', ceil: '#efe8dc', floor: '#9a7a54', planks: true, skirting: '#6a5038' });
    // tall windows on the back wall
    for (const x of [-4, -1.6, .8, 3.2]) R.backWindow(x, x + 1.6, .9, 4.0, (c, rr, X, Y, w, h) => { const g = c.createLinearGradient(0, Y, 0, Y + h); g.addColorStop(0, '#9ac0e0'); g.addColorStop(1, '#f2e6c8'); c.fillStyle = g; c.fillRect(X, Y, w, h); for (let k = 0; k < 30; k++) { c.fillStyle = rgb(jitter('#6a8a4a', rr, 14), .85); c.beginPath(); c.arc(X + rr() * w, Y + h * rr.range(.55, .9), w * rr.range(.05, .14), 0, 7); c.fill(); } }, { frame: '#f2eee6' });
    for (const x of [-4, -1.6, .8, 3.2]) R.beam(x, .9, x + 1.6, 4.0, '#ffe6b0', .16, 5);
    // bookshelves on side walls
    for (const xw of [-5.5, 5.5]) for (let z = 2; z < 8; z += 1.2) R.onSide(xw, 2.6, z, (c, s) => { c.fillStyle = '#5a3a22'; c.fillRect(0, 0, 1.15 * s, 2.5 * s); for (let k = 0; k < 5; k++) { PR.books(c, r, 6, (k + 1) * .5 * s - 5, s * .5 * 4.2, 1.15 * s - 12); c.fillStyle = '#7a5434'; c.fillRect(0, (k + 1) * .5 * s - 6, 1.15 * s, 6); } });
    // reading tables with lamps, chairs
    for (const [x, z] of [[-3.2, 5.5], [1.6, 5.5], [-.8, 3.4]]) { R.box(x, 0, z, 2.0, .74, 1.0, '#6a4628', { density: 60 }); R.box(x - .05, .74, z - .05, 2.1, .05, 1.1, '#8a5e36', { density: 30 }); const [lx, ly] = R.p(x + 1, .79, z + .5), s = R.s(z + .5); ctx.fillStyle = '#c8a040'; ctx.fillRect(lx - .01 * s, ly - .3 * s, .02 * s, .3 * s); ctx.fillStyle = '#2a6a3a'; ctx.beginPath(); ctx.moveTo(lx - .12 * s, ly - .28 * s); ctx.quadraticCurveTo(lx, ly - .4 * s, lx + .12 * s, ly - .28 * s); ctx.fill(); glow(ctx, lx, ly - .2 * s, 200, '#ffe2a0', .3);
      for (const dx of [.4, 1.6]) { const [cx, cy] = R.p(x + dx, 0, z - .3), cs = R.s(z - .3); ctx.fillStyle = '#4a3020'; ctx.fillRect(cx - .2 * cs, cy - .9 * cs, .4 * cs, .06 * cs); ctx.fillRect(cx - .2 * cs, cy - .9 * cs, .04 * cs, .9 * cs); ctx.fillRect(cx + .16 * cs, cy - .9 * cs, .04 * cs, .9 * cs); ctx.fillRect(cx - .22 * cs, cy - .46 * cs, .44 * cs, .05 * cs); } }
    for (const z of [3, 5.5]) for (const x of [-2.5, 2.5]) PR.pendant(ctx, r, ...R.p(x, 3.4, z), R.s(z), { top: R.p(x, 4.4, z)[1] });
    FIN(ctx, r, W, H, .3);
  };

  // Foggy San Francisco street of painted Victorians, sloping uphill. o.sun for a sunny version.
  ENV.sfStreet = (ctx, r, W, H, o = {}) => {
    const rr = P.RNG(r.int(1, 1e6)), sun = o.sun; M.sky(ctx, r, W, H * .6, sun ? '#7ab0e0' : '#a8b0b8', sun ? '#e8eef2' : '#d8dcdc', { strokes: 2400 });
    if (!sun) ENV.clouds(ctx, r, W, H * .1, H * .4, 18, '#eef0f0', '#c8ccd0', '#9aa0a8');
    const slope = .12, base = x => H * .8 - x * slope; const cols = ['#c86a6a', '#e8c86a', '#6a9ac8', '#9ac88a', '#d89ac0', '#e8e0d0'];
    let x = -40, i = 0; while (x < W) { const bw = rr.range(250, 320), y0 = base(x + bw), bh = 520, col = cols[i++ % cols.length];
      M.wall(ctx, rr, [x, y0 - bh, bw, bh + 40], col, { density: 260 });
      ctx.fillStyle = rgb(shade(col, -.35)); poly(ctx, [[x - 10, y0 - bh], [x + bw / 2, y0 - bh - 140], [x + bw + 10, y0 - bh]]); ctx.fill(); ctx.fillStyle = '#f4efe4'; ctx.fillRect(x - 10, y0 - bh - 6, bw + 20, 14);
      // bay window with trim
      ctx.fillStyle = rgb(shade(col, .15)); poly(ctx, [[x + 30, y0 - bh + 60], [x + bw * .62, y0 - bh + 60], [x + bw * .58, y0 - 180], [x + 34, y0 - 180]]); ctx.fill(); for (let k = 0; k < 3; k++) for (let j = 0; j < 2; j++) { const wx = x + 44 + k * (bw * .17), wy = y0 - bh + 80 + j * 150; ctx.fillStyle = '#f4efe4'; ctx.fillRect(wx - 6, wy - 6, bw * .14 + 12, 122); const g = ctx.createLinearGradient(wx, wy, wx, wy + 110); g.addColorStop(0, sun ? '#a8c8e8' : '#c8d0d8'); g.addColorStop(1, '#3a4450'); ctx.fillStyle = g; ctx.fillRect(wx, wy, bw * .14, 110); }
      ctx.fillStyle = '#3a2a20'; ctx.fillRect(x + bw * .7, y0 - 190, 60, 150); ctx.fillStyle = '#f4efe4'; ctx.fillRect(x + bw * .68, y0 - 200, 82, 10); for (let k = 0; k < 4; k++) { ctx.fillStyle = '#c8c0b0'; ctx.fillRect(x + bw * .66 - k * 4, y0 - 40 + k * 12, 92 + k * 8, 12); }
      x += bw; }
    // sloping sidewalk and street
    ctx.fillStyle = '#b8b2a8'; poly(ctx, [[0, base(0) + 10], [W, base(W) + 10], [W, base(W) + 70], [0, base(0) + 70]]); ctx.fill(); ctx.fillStyle = '#5a5a5e'; poly(ctx, [[0, base(0) + 70], [W, base(W) + 70], [W, H], [0, H]]); ctx.fill();
    paintRegion(ctx, r, [[0, base(0) + 76], [W, base(W) + 76], [W, H], [0, H]], '#5a5a5e', { density: 300, ang: -slope, angJ: .05 });
    for (let k = 0; k < 6; k++) { const x0 = k * W / 6 + 60; ctx.fillStyle = 'rgba(240,220,120,.7)'; poly(ctx, [[x0, base(x0) + 150], [x0 + 120, base(x0 + 120) + 150], [x0 + 120, base(x0 + 120) + 160], [x0, base(x0) + 160]]); ctx.fill(); }
    if (!sun) { ctx.save(); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(230,234,238,.55)'); g.addColorStop(.6, 'rgba(230,234,238,.2)'); g.addColorStop(1, 'rgba(230,234,238,.05)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    else tree(rr, ctx, W * .85, base(W * .85) + 40, 420, 170, '#3e6a2a', '#a8d070');
    FIN(ctx, r, W, H, .28);
  };

  // Desert prison gate at dusk.
  ENV.prisonGate = (ctx, r, W, H) => {
    const hz = H * .62, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz + 30, '#3a3a6a', '#ff9a4a', { strokes: 2600 }); M.sun(ctx, r, W * .78, hz - 40, 60, '#fff0c0', '#ff8a3a');
    M.hills(ctx, r, P.Noise(3), W, hz - 10, 70, .0015, 3, '#7a4a5a', { density: 500 });
    M.ground(ctx, r, W, H, hz, '#a8724a', '#c89a6a');
    // perimeter fence with razor wire, guard tower, gate
    const fy = hz + 60; for (let x = 0; x < W; x += 140) { ctx.fillStyle = '#4a4040'; ctx.fillRect(x, fy - 260, 10, 270); } ctx.save(); ctx.strokeStyle = 'rgba(60,50,50,.5)'; ctx.lineWidth = 1.5; for (let x = 0; x < W; x += 18) { ctx.beginPath(); ctx.moveTo(x, fy - 250); ctx.lineTo(x + 120, fy); ctx.moveTo(x + 120, fy - 250); ctx.lineTo(x, fy); ctx.stroke(); } ctx.restore();
    ctx.strokeStyle = '#3a3030'; ctx.lineWidth = 3; for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.arc(x, fy - 270, 16, 0, 7); ctx.stroke(); }
    { const tx = W * .2; M.wall(ctx, rr, [tx - 50, fy - 480, 100, 480], '#b8a890', { density: 80 }); ctx.fillStyle = '#5a4a42'; ctx.fillRect(tx - 80, fy - 560, 160, 80); ctx.fillStyle = 'rgba(255,200,120,.6)'; ctx.fillRect(tx - 70, fy - 550, 140, 40); ctx.fillStyle = '#3a3030'; ctx.fillRect(tx - 90, fy - 572, 180, 14); }
    { const gx = W * .5, gw = 460; ctx.fillStyle = '#8a7a6a'; ctx.fillRect(gx - gw / 2 - 80, fy - 320, 80, 330); ctx.fillRect(gx + gw / 2, fy - 320, 80, 330); ctx.fillStyle = '#5a5050'; ctx.fillRect(gx - gw / 2 - 90, fy - 340, gw + 180, 30);
      ctx.strokeStyle = '#3a3434'; ctx.lineWidth = 6; ctx.strokeRect(gx + 40, fy - 300, gw / 2 + 80, 300); for (let x = gx + 60; x < gx + gw / 2 + 120; x += 30) { ctx.beginPath(); ctx.moveTo(x, fy - 300); ctx.lineTo(x, fy); ctx.stroke(); } }
    // road through the gate
    paintRegion(ctx, r, [[W * .3, H], [W * .47, fy], [W * .58, fy], [W * .8, H]], '#6a5a52', { density: 160, ang: Math.PI / 2, angJ: .1 });
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(W * .78, hz, 0, W * .78, hz, W * .7); g.addColorStop(0, 'rgba(255,150,70,.3)'); g.addColorStop(1, 'rgba(255,150,70,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    M.grassTufts(ctx, rr, W, fy + 40, H, 40, ['#8a7a4a', '#a89a5a'], { h: 30 });
    FIN(ctx, r, W, H, .35);
  };

  // Wood-panelled federal courtroom interior.
  ENV.courtroom = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 12, RH: 5, ch: 1.6, zf: 10, f: 1600, hor: .44 });
    R.shell({ back: '#6a4a30', side: '#5e4028', ceil: '#e8e0d0', floor: '#5a3e28', planks: true, skirting: '#3a2414' });
    for (let x = -6; x < 6; x += 1.5) { const [x0, y0, w0, h0] = R.backRect(x + .05, .1, x + 1.45, 3.6); woodPanel(ctx, r, x0, y0, w0, h0, '#7a5434'); }
    { const [x0, y0, w0] = R.backRect(-6, 3.7, 6, 5); ctx.fillStyle = '#e8e0d0'; ctx.fillRect(x0, y0, w0, R.p(0, 3.7, 10)[1] - y0); ctx.fillStyle = '#c8a040'; ctx.fillRect(x0, R.p(0, 3.7, 10)[1] - 8, w0, 8); }
    { const [sx, sy] = R.p(0, 4.2, 9.98), s = R.s(10); ctx.fillStyle = '#c8a040'; ctx.beginPath(); ctx.arc(sx, sy, .45 * s, 0, 7); ctx.fill(); ctx.fillStyle = '#2a3a6a'; ctx.beginPath(); ctx.arc(sx, sy, .38 * s, 0, 7); ctx.fill(); ctx.fillStyle = '#e8d8a0'; ctx.beginPath(); ctx.arc(sx, sy, .16 * s, 0, 7); ctx.fill(); }
    for (const [x, col] of [[-1.6, ['#bf3a3a', '#f0ede6', '#2a3a7a']], [1.6, ['#2a3a7a', '#f0ede6', '#bf3a3a']]]) { const [fx, fy] = R.p(x, 3.4, 9.9), s = R.s(10); ctx.fillStyle = '#c8a040'; ctx.fillRect(fx - 3, fy - 10, 6, 3.4 * s); for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#f0ede6' : '#bf3a3a'; ctx.fillRect(fx + 4, fy + k * .14 * s, .7 * s, .14 * s); } ctx.fillStyle = '#2a3a7a'; ctx.fillRect(fx + 4, fy, .3 * s, .42 * s); }
    // judge's bench (raised) and witness box
    R.box(-2.2, 0, 8.4, 4.4, 1.5, 1.0, '#5a3820', { density: 120 }); R.box(-2.3, 1.5, 8.35, 4.6, .08, 1.1, '#3e2414', { density: 40 }); { const [x0, y0] = R.p(-2.1, 1.4, 8.4), [x1, y1] = R.p(2.1, .1, 8.4); for (let k = 0; k < 4; k++) woodPanel(ctx, r, x0 + k * (x1 - x0) / 4 + 4, y0, (x1 - x0) / 4 - 8, y1 - y0, '#6a4426'); }
    { const [cx, cy] = R.p(0, 1.5, 9), s = R.s(9); ctx.fillStyle = '#1a1210'; ctx.beginPath(); ctx.roundRect(cx - .35 * s, cy - 1.2 * s, .7 * s, 1.1 * s, .1 * s); ctx.fill(); }
    R.box(3, 0, 7.6, 1.4, 1.0, 1.0, '#5a3820', { density: 60 });
    // bar rail + counsel tables
    { const z = 5.4; ctx.strokeStyle = '#4a2c16'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(...R.p(-6, .9, z)); ctx.lineTo(...R.p(6, .9, z)); ctx.stroke(); for (let x = -6; x <= 6; x += .3) { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...R.p(x, .9, z)); ctx.lineTo(...R.p(x, 0, z)); ctx.stroke(); } }
    for (const x of [-4.2, 1.4]) { R.box(x, 0, 6.2, 2.8, .76, .9, '#6a4628', { density: 60 }); for (const dx of [.6, 1.6, 2.4]) { const [cx, cy] = R.p(x + dx, 0, 7.4); PR.officeChair(ctx, r, cx, cy, R.s(7.4), { col: '#3a2418' }); } }
    // gallery benches in front
    for (const z of [3.2, 4.2]) for (const side of [-1, 1]) R.box(side < 0 ? -5.6 : .6, 0, z, 5, .9, .4, '#5a3a20', { density: 60 });
    for (const z of [3, 6, 9]) for (const x of [-3, 0, 3]) { const [lx, ly] = R.p(x, 5, z); glow(ctx, lx, ly + 20, 180 * 4 / z, '#fff0c8', .2); ctx.fillStyle = '#fff6dc'; ctx.beginPath(); ctx.ellipse(lx, ly, 30 * 4 / z, 8 * 4 / z, 0, 0, 7); ctx.fill(); }
    FIN(ctx, r, W, H, .4);
  };

  // Sunny Austin street: low houses under live oaks.
  ENV.austin = (ctx, r, W, H) => {
    const hz = H * .64, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz, '#6aa0d8', '#e8eef0', { strokes: 2400 }); ENV.clouds(ctx, r, W, 0, H * .3, 8, '#ffffff', '#d8e0e8', '#a8b4c4');
    M.distantTrees(ctx, rr, W, hz - 20, 160, '#4a6a3a', { scale: 1.4 });
    for (let i = 0; i < 4; i++) { const x = i * W / 4 + 60, w = W / 4 - 120, col = ['#e8dcc0', '#c8d8e0', '#e8c8a0', '#d8e0c8'][i]; M.wall(ctx, rr, [x, hz - 190, w, 200], col, { density: 160 }); ctx.fillStyle = rgb(shade(col, -.45)); poly(ctx, [[x - 30, hz - 190], [x + w / 2, hz - 300], [x + w + 30, hz - 190]]); ctx.fill(); ctx.fillStyle = '#3a4a5a'; ctx.fillRect(x + 40, hz - 140, 90, 80); ctx.fillRect(x + w - 130, hz - 140, 90, 80); ctx.fillStyle = '#6a3a2a'; ctx.fillRect(x + w / 2 - 35, hz - 130, 70, 140); ctx.fillStyle = '#f2ece0'; ctx.fillRect(x - 10, hz - 196, w + 20, 10); }
    M.ground(ctx, r, W, H, hz, '#6a8a3a', '#9ab060');
    paintRegion(ctx, r, [[0, H * .82], [W, H * .82], [W, H], [0, H]], '#8a8680', { density: 200, ang: 0 }); ctx.fillStyle = '#c8c2b6'; ctx.fillRect(0, H * .8, W, 26);
    for (const tx of [W * .08, W * .52, W * .95]) tree(rr, ctx, tx, H * .8, 560, 330, '#3a5a26', '#9ac060', 1100);
    M.grassTufts(ctx, rr, W, hz + 20, H * .79, 80, ['#6a8a3a', '#8aa04a'], { h: 30 });
    FIN(ctx, r, W, H, .25);
  };

  // Wooden cabin in the Texas hills at dusk, one lit window.
  ENV.cabin = (ctx, r, W, H) => {
    const hz = H * .6, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz + 30, '#2a3460', '#e8906a', { strokes: 2400 }); ENV.clouds(ctx, r, W, 0, H * .3, 8, '#f0a080', '#8a5a6a', '#3a3050');
    M.hills(ctx, r, P.Noise(9), W, hz - 60, 60, .002, 3, '#4a3a4a', { density: 400 }); M.hills(ctx, r, P.Noise(4), W, hz, 40, .003, 2, '#3a3a34', { density: 500 });
    M.ground(ctx, r, W, H, hz, '#3a3a24', '#5a5232');
    { const cx = W * .5, cy = H * .78, w = 640, h = 280; ctx.fillStyle = '#5a3a24'; ctx.fillRect(cx - w / 2, cy - h, w, h); for (let y = cy - h; y < cy; y += 26) { ctx.fillStyle = 'rgba(30,16,8,.45)'; ctx.fillRect(cx - w / 2, y, w, 4); ctx.fillStyle = 'rgba(200,140,90,.12)'; ctx.fillRect(cx - w / 2, y + 4, w, 3); }
      ctx.fillStyle = '#2a1e18'; poly(ctx, [[cx - w / 2 - 60, cy - h], [cx, cy - h - 200], [cx + w / 2 + 60, cy - h]]); ctx.fill(); ctx.fillStyle = 'rgba(240,150,100,.25)'; poly(ctx, [[cx - w / 2 - 60, cy - h], [cx, cy - h - 200], [cx - 20, cy - h - 190], [cx - w / 2 - 30, cy - h]]); ctx.fill();
      ctx.fillStyle = '#ffcc7a'; ctx.fillRect(cx + 90, cy - 200, 120, 100); ctx.fillStyle = '#3a2418'; ctx.fillRect(cx + 146, cy - 200, 8, 100); ctx.fillRect(cx + 90, cy - 154, 120, 8); glow(ctx, cx + 150, cy - 150, 300, '#ffb860', .45); ctx.fillStyle = '#2a1a10'; ctx.fillRect(cx - 160, cy - 220, 110, 220);
      ctx.fillStyle = '#4a3a30'; ctx.fillRect(cx + 160, cy - h - 160, 50, 120); M.contactShadow(ctx, cx, cy, w * .7, 30, .5); }
    for (const tx of [W * .14, W * .86]) tree(rr, ctx, tx, H * .82, 520, 260, '#1e2a1a', '#6a6a3a', 900);
    M.grassTufts(ctx, rr, W, H * .8, H, 80, ['#5a5232', '#7a6a3a'], { h: 40 });
    FIN(ctx, r, W, H, .4);
  };

  // Conference stage with blue lights and a crowd in silhouette.
  ENV.stage = (ctx, r, W, H, o = {}) => {
    const rr = P.RNG(r.int(1, 1e6)); ctx.fillStyle = '#060814'; ctx.fillRect(0, 0, W, H);
    for (let k = 0; k < 12; k++) { const x = W * (k + .5) / 12; ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(x, 0, x, H * .7); g.addColorStop(0, o.warm ? 'rgba(255,200,120,.35)' : 'rgba(80,140,255,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; poly(ctx, [[x - 10, 0], [x + 10, 0], [x + 160 + rr.gauss() * 60, H * .7], [x - 160 + rr.gauss() * 60, H * .7]]); ctx.fill(); ctx.restore(); glow(ctx, x, 20, 60, o.warm ? '#ffd890' : '#a8c8ff', .7); }
    // backdrop screen + bunting
    ctx.fillStyle = o.warm ? '#2a1a3a' : '#0e1838'; ctx.fillRect(W * .2, H * .12, W * .6, H * .36); glow(ctx, W * .5, H * .3, 600, o.warm ? '#ff9a5a' : '#3a6aff', .3);
    if (o.warm) for (let k = 0; k < 20; k++) { ctx.fillStyle = ['#bf3a3a', '#f0ede6', '#2a3a7a'][k % 3]; ctx.beginPath(); const x = W * .1 + k * W * .04; ctx.moveTo(x, H * .5); ctx.quadraticCurveTo(x + W * .02, H * .55, x + W * .04, H * .5); ctx.fill(); }
    // stage deck
    paintRegion(ctx, r, [[0, H * .62], [W, H * .62], [W, H * .72], [0, H * .72]], '#1a1c2a', { density: 120, ang: 0 }); ctx.fillStyle = o.warm ? 'rgba(255,200,140,.4)' : 'rgba(120,170,255,.45)'; ctx.fillRect(0, H * .62, W, 6);
    { const lx = W * .5; ctx.fillStyle = '#2a2a34'; poly(ctx, [[lx - 80, H * .62], [lx + 80, H * .62], [lx + 60, H * .47], [lx - 60, H * .47]]); ctx.fill(); ctx.fillStyle = '#3a3a48'; ctx.fillRect(lx - 70, H * .46, 140, 16); }
    // crowd silhouettes
    for (let row = 0; row < 4; row++) for (let x = -40; x < W + 40; x += rr.range(50, 80)) { const y = H * (.78 + row * .07), s = 1 + row * .35; ctx.fillStyle = `rgb(${8 + row * 3},${10 + row * 3},${18 + row * 4})`; ctx.beginPath(); ctx.arc(x, y - 60 * s, 22 * s, 0, 7); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 34 * s, y - 40 * s, 68 * s, 80 * s, 24 * s); ctx.fill(); ctx.fillStyle = o.warm ? 'rgba(255,190,120,.25)' : 'rgba(120,170,255,.25)'; ctx.fillRect(x - 20 * s, y - 82 * s, 40 * s, 3); }
    FIN(ctx, r, W, H, .45, 80000);
  };
})(window);

window.PLATES = {
  bedroom: (c, r, W, H) => ENV.bedroom(c, r, W, H, { dark: true }),
  office: (c, r, W, H) => ENV.office2(c, r, W, H, { night: true }),
  court_ext: (c, r, W, H) => ENV.courthouse(c, r, W, H),
  serverhall: (c, r, W, H) => ENV.serverhall(c, r, W, H),
  worldmap: (c, r, W, H) => ENV.worldMap(c, r, W, H),
  suburb: (c, r, W, H) => ENV.suburb(c, r, W, H),
  kitchen: (c, r, W, H) => ENV.kitchen(c, r, W, H),
  alley: (c, r, W, H) => ENV.alley(c, r, W, H),
  iceberg: (c, r, W, H) => ENV.iceberg(c, r, W, H),
  iceberg_deep: (c, r, W, H) => ENV.iceberg(c, r, W, H, { deep: true }),
  library: (c, r, W, H) => ENV.libraryRoom(c, r, W, H),
  sf_fog: (c, r, W, H) => ENV.sfStreet(c, r, W, H),
  sf_sun: (c, r, W, H) => ENV.sfStreet(c, r, W, H, { sun: true }),
  prison_gate: (c, r, W, H) => ENV.prisonGate(c, r, W, H),
  courtroom: (c, r, W, H) => ENV.courtroom(c, r, W, H),
  austin: (c, r, W, H) => ENV.austin(c, r, W, H),
  cabin: (c, r, W, H) => ENV.cabin(c, r, W, H),
  stage_blue: (c, r, W, H) => ENV.stage(c, r, W, H),
  stage_rally: (c, r, W, H) => ENV.stage(c, r, W, H, { warm: true }),
  map_silkroad: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 10, lon1: 125, lat0: 18, lat1: 55 }, grid: 10, compass: [13, 21], title: 'The Silk Road', titleXY: [1880, 1010],
    labels: [[108.9, 34.3, "Chang'an", 24, true], [66.9, 39.6, 'Samarkand', 22, true], [51.4, 35.7, 'Rey', 20, true], [44.4, 33.3, 'Baghdad', 20, true], [28.9, 41, 'Constantinople', 20, true], [87.6, 43.8, 'Taklamakan', 22, true]], mountains: [[80, 34, 12, 3], [72, 39, 6, 2]], rivers: [], greens: [], deserts: [[85, 40, 8], [105, 42, 8]] }),
};
