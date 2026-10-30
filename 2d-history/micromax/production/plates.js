// Micromax painted plates (Gumball style, warm saffron India with Jio blue as the threat colour).
// Paint with: node shared/p2/paint.js micromax/production/plates.js micromax/production/plates all
// Reused plates copied in from Nike: factory, office, skyline, boardroom.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, { rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .4, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const grad = (c, x0, y0, x1, y1, stops) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([t, col]) => g.addColorStop(t, col)); return g; };
  const sign = (c, x, y, w, h, bg, fg, txt, px) => { c.fillStyle = bg; c.fillRect(x, y, w, h); c.strokeStyle = 'rgba(20,12,8,.6)'; c.lineWidth = 4; c.strokeRect(x, y, w, h); c.fillStyle = fg; c.font = `${px}px Anton`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, x + w / 2, y + h / 2 + 2); };
  // sagging overhead cables
  const wires = (c, r, W, y0, n, col = 'rgba(20,16,14,.75)') => { for (let i = 0; i < n; i++) { const xa = r.range(-200, W * .4), xb = r.range(W * .6, W + 200), ya = y0 + r.range(-60, 80), yb = y0 + r.range(-60, 80), sag = r.range(40, 140); c.strokeStyle = col; c.lineWidth = r.range(2, 5); c.beginPath(); c.moveTo(xa, ya); c.quadraticCurveTo((xa + xb) / 2, Math.max(ya, yb) + sag, xb, yb); c.stroke(); } };
  const dust = (c, r, W, H, y0, al = .1) => { for (let i = 0; i < 1800; i++) { const x = r() * W, y = r.range(y0, H); c.fillStyle = r() < .5 ? `rgba(120,80,40,${al})` : `rgba(255,230,190,${al})`; c.fillRect(x, y, r.range(2, 6), r.range(1, 3)); } };
  // a flat-roofed Indian town house front
  const house = (c, r, x, base, w, h, col, o = {}) => { c.fillStyle = col; c.fillRect(x, base - h, w, h); paintRegion(c, r, [[x, base - h], [x + w, base - h], [x + w, base], [x, base]], col, { density: 40, len: [10, 40], w: [3, 8], al: .3 });
    c.fillStyle = rgb(shade(col, -.2)); c.fillRect(x - 6, base - h - 14, w + 12, 16); for (let k = 0; k < Math.floor(w / 110); k++) { const wx = x + 30 + k * 110; c.fillStyle = '#3a3030'; c.fillRect(wx, base - h + 40, 50, 60); c.strokeStyle = '#8a7a6a'; c.lineWidth = 3; for (let j = 1; j < 4; j++) { c.beginPath(); c.moveTo(wx + j * 12.5, base - h + 40); c.lineTo(wx + j * 12.5, base - h + 100); c.stroke(); } }
    if (o.tank) { c.fillStyle = '#2a2a2a'; c.fillRect(x + w * .6, base - h - 70, 60, 56); c.fillStyle = '#3a3a3a'; c.fillRect(x + w * .6 - 4, base - h - 74, 68, 8); }
    if (o.door) { c.fillStyle = rgb(shade(col, -.45)); c.fillRect(x + w / 2 - 40, base - 150, 80, 150); } };

  // 1990s Delhi middle-class flat: pale green walls, ceiling fan, barred window over rooftops, steel almirah, a bed. o.pc adds the beige PC on a desk. o.night dims it under a desk lamp. o.village: ochre mud walls, a bare bulb, no fan.
  ENV.mxFlat = (ctx, r, W, H, o = {}) => { const vil = o.village;
    const R = new ENV.Room(ctx, r, W, H, { RW: 10, RH: 3.2, ch: 1.5, zf: 6, f: 1800, hor: .45 });
    R.shell({ back: vil ? '#c09060' : '#b4c8a6', side: vil ? '#a87a50' : '#a2b896', ceil: vil ? '#8a6a4a' : '#e8e8dc', floor: vil ? '#8a6a4a' : '#a89a88', planks: false, skirting: vil ? null : '#5a6a52' });
    const rr = P.RNG(7); for (let k = 0; k < 900; k++) { const [px, py] = R.p(rr.range(-5, 5), 0, rr.range(1.6, 6)); ctx.fillStyle = vil ? 'rgba(60,40,20,.12)' : `rgba(${rr() < .5 ? '255,255,255' : '60,50,40'},.12)`; ctx.fillRect(px, py, rr.range(3, 9), rr.range(2, 4)); }
    // window with rooftops (or a small village window)
    { const [X, Y] = R.p(-2.6, 2.6, 5.99), [X1, Y1] = R.p(vil ? -1.6 : -.6, vil ? 1.8 : 1.1, 5.99); const w = X1 - X, h = Y1 - Y;
      ctx.fillStyle = o.night ? grad(ctx, 0, Y, 0, Y1, [[0, '#0c1630'], [1, '#2a3050']]) : grad(ctx, 0, Y, 0, Y1, [[0, '#9ac4e8'], [1, '#f0dcb0']]); ctx.fillRect(X, Y, w, h);
      if (!vil) for (let k = 0; k < 9; k++) { const bx = X + k * w / 9, bh = rr.range(.25, .55) * h; ctx.fillStyle = o.night ? '#1a1a26' : rgb(jitter('#c8a888', rr, 18)); ctx.fillRect(bx, Y1 - bh, w / 9 + 2, bh); if (rr() < .5) { ctx.fillStyle = o.night ? '#101018' : '#2a2a2a'; ctx.fillRect(bx + 10, Y1 - bh - 26, 26, 24); } if (o.night && rr() < .6) { ctx.fillStyle = 'rgba(255,210,120,.8)'; ctx.fillRect(bx + 14, Y1 - bh + 20, 14, 18); } }
      else { ctx.fillStyle = '#3a5a2a'; ctx.beginPath(); ctx.ellipse(X + w * .5, Y1, w * .7, h * .4, 0, Math.PI, 0); ctx.fill(); }
      ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 6; ctx.strokeRect(X, Y, w, h); ctx.lineWidth = 3; for (let k = 1; k < 7; k++) { ctx.beginPath(); ctx.moveTo(X + k * w / 7, Y); ctx.lineTo(X + k * w / 7, Y1); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(X, Y + h / 2); ctx.lineTo(X1, Y + h / 2); ctx.stroke();
      if (!vil) { ctx.fillStyle = 'rgba(200,120,60,.55)'; ctx.fillRect(X - 30, Y - 10, 40, h + 30); ctx.fillRect(X1 - 10, Y - 10, 40, h + 30); } }
    // calendar + a framed photo on the back wall
    { const [cx, cy] = R.p(1.4, 2.5, 5.99), s = R.s(6); ctx.fillStyle = '#f4ecd8'; ctx.fillRect(cx, cy, .5 * s, .7 * s); ctx.fillStyle = '#c8402a'; ctx.fillRect(cx, cy, .5 * s, .16 * s); ctx.fillStyle = 'rgba(40,30,20,.35)'; for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) ctx.fillRect(cx + 8 + i * .075 * s, cy + .22 * s + j * .1 * s, .05 * s, .06 * s);
      const [fx, fy] = R.p(.2, 2.6, 5.99); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(fx, fy, .6 * s, .45 * s); ctx.fillStyle = '#d8b890'; ctx.fillRect(fx + 10, fy + 10, .6 * s - 20, .45 * s - 20); ctx.fillStyle = '#7a5a3a'; ctx.beginPath(); ctx.arc(fx + .3 * s, fy + .2 * s, .08 * s, 0, 7); ctx.fill(); }
    // steel almirah (left side), bed (right)
    if (!vil) { R.box(-4.7, 0, 5.2, 1.1, 2.1, .6, '#8a929a', { density: 50 }); const [ax, ay] = R.p(-4.15, 1.1, 5.2); ctx.fillStyle = '#d8d8d8'; ctx.fillRect(ax - 6, ay - 30, 12, 60); }
    else { R.box(-4.4, 0, 5.0, 1.4, .5, .9, '#6a4a2a', { density: 40 }); for (let k = 0; k < 3; k++) { const [px, py] = R.p(-4.1 + k * .45, .5, 5.2), s = R.s(5.2); ctx.fillStyle = ['#9a5a2a', '#b88a4a', '#7a6a5a'][k]; ctx.beginPath(); ctx.ellipse(px, py - .12 * s, .15 * s, .14 * s, 0, 0, 7); ctx.fill(); } }
    R.box(2.4, 0, 3.6, 2.4, .45, 2.0, vil ? '#7a5a3a' : '#6a4a32', { density: 40 }); R.box(2.45, .45, 3.65, 2.3, .18, 1.9, vil ? '#c8b088' : '#d8c8e0', { density: 30 }); R.box(3.9, .63, 4.9, .7, .14, .6, '#f0ece4', { density: 10 });
    if (!vil) for (let k = 0; k < 3; k++) R.box(2.8 + k * .32, .63, 3.9, .26, .06 + k * .02, .34, ['#2a5a8a', '#8a2a2a', '#3a6a3a'][k], { density: 6 });
    // desk with the beige PC
    if (o.pc) { R.box(-2.2, 0, 4.4, 1.8, .74, .8, '#6a4a32', { density: 40 }); R.box(-2.0, .74, 4.55, .6, .2, .5, '#d8ccb0', { density: 10 }); R.box(-1.95, .94, 4.6, .5, .48, .45, '#e0d4b8', { density: 10 });
      const [sx, sy] = R.p(-1.88, 1.36, 4.6), [ex, ey] = R.p(-1.52, 1.02, 4.6); ctx.fillStyle = o.night ? '#6ab0d0' : '#2a3a4a'; ctx.fillRect(sx, sy, ex - sx, ey - sy); if (o.night) glow(ctx, (sx + ex) / 2, (sy + ey) / 2, 320, '#8ad0ff', .35);
      R.box(-1.2, .74, 4.5, .55, .04, .2, '#d0c4a8', { density: 6 }); R.box(-.5, .74, 4.5, .3, .09, .22, '#2a5a8a', { density: 4 }); }
    // ceiling fan or bare bulb
    { const [fx, fy] = R.p(0, 3.2, 5.0), s = R.s(5.0); ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy + .3 * s); ctx.stroke();
      if (!vil) { ctx.fillStyle = '#5a5a5a'; ctx.beginPath(); ctx.ellipse(fx, fy + .32 * s, .12 * s, .05 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#7a7a72'; for (const a of [-.15, 2.0, 4.2]) { ctx.save(); ctx.translate(fx, fy + .33 * s); ctx.scale(1, .22); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(.42 * s, 0, .4 * s, .07 * s, 0, 0, 7); ctx.fill(); ctx.restore(); } }
      else { ctx.fillStyle = '#fff4c8'; ctx.beginPath(); ctx.arc(fx, fy + .36 * s, .06 * s, 0, 7); ctx.fill(); glow(ctx, fx, fy + .36 * s, 700, '#ffd890', o.night ? .4 : .2); } }
    // lived-in details: rug, potted plant, wall clock, switchboard, a clothes line or shoe rack
    ENV.rug(ctx, rr, W * .5, H * .86, 700, 120, vil ? '#8a5a3a' : '#a83a3a', vil ? '#c8a060' : '#e8c060');
    { const [px, py] = R.p(1.2, 0, 5.6), s = R.s(5.6); PR.plant(ctx, rr, px, py, s, { h: .6, n: 22 }); }
    { const [cx, cy] = R.p(-.2, 2.95, 5.99), s = R.s(6); ctx.fillStyle = '#f4f0e4'; ctx.beginPath(); ctx.arc(cx, cy, .14 * s, 0, 7); ctx.fill(); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 6; ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - .1 * s); ctx.moveTo(cx, cy); ctx.lineTo(cx + .07 * s, cy + .02 * s); ctx.stroke();
      const [bx, by] = R.p(2.0, 1.25, 5.99); ctx.fillStyle = '#ece6d6'; ctx.fillRect(bx, by, .32 * s, .2 * s); ctx.fillStyle = '#3a3a3a'; for (let k = 0; k < 4; k++) ctx.fillRect(bx + 10 + k * .07 * s, by + .06 * s, .03 * s, .07 * s); }
    if (vil) { const [a, b] = R.p(-1.2, 2.4, 5.9), [c2] = R.p(1.6, 2.4, 5.9); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a, b); ctx.quadraticCurveTo((a + c2) / 2, b + 30, c2, b); ctx.stroke(); for (let k = 0; k < 4; k++) { const x = a + 60 + k * (c2 - a - 120) / 3; ctx.fillStyle = ['#c8402a', '#3a6aa8', '#e8c040', '#5a8a4a'][k]; ctx.fillRect(x - 40, b + 18, 80, 110 - k * 10); }
      for (let k = 0; k < 900; k++) { const [px, py] = R.p(rr.range(-5, 5), rr.range(.2, 3.1), 5.99); ctx.fillStyle = 'rgba(80,50,20,.12)'; ctx.fillRect(px, py, rr.range(4, 14), rr.range(2, 5)); } }
    else { R.box(-2.9, 0, 5.4, .7, .35, .35, '#7a5a3a', { density: 10 }); for (let k = 0; k < 4; k++) { const [px, py] = R.p(-2.8 + k * .16, .35, 5.5), s = R.s(5.5); ctx.fillStyle = ['#2a2a2a', '#8a4a2a', '#c8a070', '#3a3a5a'][k]; ctx.beginPath(); ctx.ellipse(px + .05 * s, py - .03 * s, .07 * s, .03 * s, 0, 0, 7); ctx.fill(); } }
    if (o.night) { ctx.fillStyle = 'rgba(10,14,40,.42)'; ctx.fillRect(0, 0, W, H); if (o.pc) { const [lx, ly] = R.p(-.9, 1.3, 4.5); glow(ctx, lx, ly, 900, '#ffcc80', .35); } }
    FIN(ctx, r, W, H, .45);
  };

  // A dusty small-town road with a yellow STD/ISD/PCO booth, a neem tree, low houses, a pole with tangled wires.
  ENV.pcoRoad = (ctx, r, W, H, o = {}) => { const hz = H * .6, rr = P.RNG(21);
    M.sky(ctx, r, W, hz, '#7ab0d8', '#f4e2b8', { strokes: 1600 }); ENV.clouds(ctx, r, W, H * .04, H * .22, 7, '#ffffff', '#f0e0c8', '#c8b098');
    M.hills(ctx, rr, P.Noise(4), W, hz - 40, 30, .002, 3, '#a8a07a', { density: 200 });
    const cols = ['#e8c890', '#d8a8a0', '#a8c8b8', '#e0d0a0', '#c8b0d0', '#f0d8b0'];
    for (let i = 0, x = -40; x < W; i++) { const w = rr.range(260, 420), h = rr.range(240, 380); house(ctx, rr, x, hz + 60, w, h, cols[i % 6], { tank: rr() < .5, door: true }); x += w + rr.range(0, 30); }
    M.ground(ctx, r, W, H, hz + 60, '#c8a06a', '#d8b47e', {});
    paintRegion(ctx, rr, [[W * .42, hz + 60], [W * .58, hz + 60], [W + 300, H], [-300, H]], '#b89060', { density: 500, len: [30, 90], w: [5, 12], ang: 0, angJ: .1, al: .3 });
    dust(ctx, rr, W, H, hz + 60, .12);
    // neem tree (left)
    { const tx = 260, ty = hz + 300; ctx.fillStyle = '#5a4030'; ctx.beginPath(); ctx.moveTo(tx - 40, ty); ctx.lineTo(tx - 20, ty - 360); ctx.lineTo(tx + 20, ty - 360); ctx.lineTo(tx + 50, ty); ctx.fill(); for (let k = 0; k < 90; k++) { const a = rr() * 6.28, d = Math.sqrt(rr()) * 300; ctx.fillStyle = rgb(jitter(rr() < .5 ? '#3a6a2a' : '#5a8a3a', rr, 14)); ctx.beginPath(); ctx.arc(tx + Math.cos(a) * d * 1.3, ty - 480 + Math.sin(a) * d * .7, rr.range(40, 90), 0, 7); ctx.fill(); } M.contactShadow(ctx, tx, ty + 10, 300, 40, .3); }
    // pole + wires (right)
    { const px = 2280; ctx.fillStyle = '#5a5a5a'; ctx.fillRect(px - 14, hz - 420, 28, 760); ctx.fillRect(px - 120, hz - 400, 240, 14); wires(ctx, rr, W, hz - 380, 14); }
    // the yellow booth
    { const bx = 1180, by = hz + 330, bw = 300, bh = 470; M.contactShadow(ctx, bx + bw / 2, by + 6, bw * .8, 30, .45); ctx.fillStyle = '#f0c020'; ctx.fillRect(bx, by - bh, bw, bh); paintRegion(ctx, rr, [[bx, by - bh], [bx + bw, by - bh], [bx + bw, by], [bx, by]], '#f0c020', { density: 60, len: [10, 40], w: [3, 8], al: .3 });
      ctx.fillStyle = '#d8a810'; ctx.fillRect(bx - 14, by - bh - 30, bw + 28, 34); sign(ctx, bx + 10, by - bh + 14, bw - 20, 70, '#f8e8a0', '#c8281e', 'STD · ISD · PCO', 40);
      ctx.fillStyle = '#3a3a3a'; ctx.fillRect(bx + 40, by - bh + 110, bw - 80, 200); ctx.fillStyle = 'rgba(160,200,220,.4)'; ctx.fillRect(bx + 46, by - bh + 116, bw - 92, 188); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(bx + 100, by - bh + 240, 100, 50); ctx.fillStyle = '#c8281e'; ctx.fillRect(bx + 110, by - bh + 226, 80, 20);
      ctx.strokeStyle = 'rgba(20,12,8,.6)'; ctx.lineWidth = 5; ctx.strokeRect(bx, by - bh, bw, bh); }
    FIN(ctx, r, W, H, .38);
  };

  // A busy phone-market street: shop fronts with shutters and signboards, tangled wires, hanging brand banners. o.banners = colours for the banners.
  ENV.phoneMarket = (ctx, r, W, H, o = {}) => { const hz = H * .74, rr = P.RNG(33);
    M.sky(ctx, r, W, H * .3, '#8ab4d4', '#f0dcb4', { strokes: 900 });
    const names = ['MOBILE WORLD', 'SHREE TELECOM', 'NEW PHONE POINT', 'GUPTA ELECTRONICS', 'SAI MOBILES', 'CITY CELL'], cols = ['#d8b890', '#c89a80', '#b8b0a0', '#d0c098', '#c0a088', '#d8c0a0'];
    for (let i = 0; i < 6; i++) { const x = i * W / 6, w = W / 6 + 4, top = H * rr.range(.08, .18); ctx.fillStyle = cols[i]; ctx.fillRect(x, top, w, hz - top); paintRegion(ctx, rr, [[x, top], [x + w, top], [x + w, hz], [x, hz]], cols[i], { density: 120, len: [20, 60], w: [5, 12], ang: -Math.PI / 2, al: .25 });
      for (let k = 0; k < 2; k++) { ctx.fillStyle = '#3a3434'; ctx.fillRect(x + 60 + k * 200, top + 60, 110, 140); ctx.fillStyle = 'rgba(255,230,180,.25)'; ctx.fillRect(x + 66 + k * 200, top + 66, 40, 60); ctx.fillStyle = '#5a4a3a'; ctx.fillRect(x + 50 + k * 200, top + 200, 130, 20); }
      // shop opening with shelves of boxes
      const sy = hz - 430; ctx.fillStyle = '#2a2420'; ctx.fillRect(x + 24, sy, w - 48, 430); for (let j = 0; j < 4; j++) for (let k = 0; k < 7; k++) { ctx.fillStyle = rgb(jitter(['#e8e0d0', '#2a2a3a', '#d86a20', '#3a6aa8', '#c8c8c8'][(j + k + i) % 5], rr, 12)); ctx.fillRect(x + 40 + k * (w - 80) / 7, sy + 40 + j * 80, (w - 80) / 7 - 8, 50); }
      ctx.fillStyle = 'rgba(200,220,230,.25)'; ctx.fillRect(x + 24, hz - 150, w - 48, 150); ctx.strokeStyle = '#8a8a8a'; ctx.lineWidth = 4; ctx.strokeRect(x + 24, hz - 150, w - 48, 150);
      // rolled-up shutter + signboard
      ctx.fillStyle = '#7a7a7a'; ctx.fillRect(x + 20, sy - 40, w - 40, 40); for (let k = 0; k < 4; k++) { ctx.fillStyle = 'rgba(20,20,20,.3)'; ctx.fillRect(x + 20, sy - 36 + k * 10, w - 40, 3); }
      sign(ctx, x + 30, sy - 150, w - 60, 100, ['#c8281e', '#1a4a8a', '#f0c020', '#2a7a3a', '#e86a10', '#5a2a7a'][i], i === 2 ? '#2a1a10' : '#fff8e8', names[i], 42); }
    wires(ctx, rr, W, H * .2, 20);
    const bc = o.banners || ['#e86a10', '#e86a10', '#e86a10'];
    for (let i = 0; i < 5; i++) { const x = 160 + i * 500, y = H * .26, col = bc[i % bc.length]; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 280, y); ctx.lineTo(x + 280, y + 150); ctx.lineTo(x + 140, y + 180); ctx.lineTo(x, y + 150); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(20,12,8,.5)'; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x + 50, y + 40, 180, 20); ctx.fillRect(x + 80, y + 80, 120, 14); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y - 60); ctx.moveTo(x + 280, y); ctx.lineTo(x + 310, y - 60); ctx.stroke(); }
    M.ground(ctx, r, W, H, hz, '#9a8a78', '#b0a08a', {}); for (let k = 0; k < 600; k++) { ctx.fillStyle = `rgba(${rr() < .5 ? '60,50,40' : '230,220,200'},.12)`; ctx.fillRect(rr() * W, rr.range(hz, H), rr.range(6, 30), 3); }
    ctx.fillStyle = 'rgba(20,14,10,.25)'; ctx.fillRect(0, hz, W, 18);
    FIN(ctx, r, W, H, .4);
  };

  // Inside a small phone shop: glass counter, wall of boxed phones, posters, a tube light.
  ENV.phoneShop = (ctx, r, W, H, o = {}) => { const rr = P.RNG(44);
    const R = new ENV.Room(ctx, r, W, H, { RW: 10, RH: 3.2, ch: 1.5, zf: 6.2, f: 1800, hor: .45 });
    R.shell({ back: '#e8dcc0', side: '#d8c8a8', ceil: '#f0ece0', floor: '#b0a898', planks: false, skirting: '#4a4a4a' });
    for (let j = 0; j < 5; j++) { const y = .7 + j * .5; R.box(-4.2, y, 6.0, 8.4, .03, .18, '#c8c8c8', { density: 4, shadow: false }); for (let k = 0; k < 16; k++) R.box(-4.1 + k * .52, y + .03, 6.02, .42, .32, .12, jitter(['#e8e0d0', '#2a2a3a', '#d86a20', '#3a6aa8', '#c8c8c8', '#e8a020'][(j * 3 + k) % 6], rr, 10), { density: 4, shadow: false, edge: false }); }
    { const z = 6.15, s = R.s(z); for (const [x, c1, c2] of [[-4.6, '#e86a10', '#f8d0a0'], [3.4, '#e86a10', '#2a2a3a']]) { const [px, py] = R.p(x, 3.0, z); ctx.fillStyle = c1; ctx.fillRect(px, py, 1.0 * s, .28 * s); ctx.fillStyle = c2; ctx.fillRect(px + 10, py + 10, 1.0 * s - 20, .08 * s); } }
    for (let k = 0; k < 2; k++) { const [a, b] = R.p(-1.5 + k * 1.5, 3.19, 3.5 + k), [c2] = R.p(-.5 + k * 1.5, 3.19, 3.5 + k); ctx.fillStyle = '#fbfbf4'; ctx.fillRect(a, b, c2 - a, 12); glow(ctx, (a + c2) / 2, b + 20, 500, '#f0f8ff', .2); }
    R.box(-4.0, 0, 5.0, 8.0, .95, .6, '#5a4a3a', { density: 40 }); { const pts = [R.p(-4.0, .95, 5.0), R.p(4.0, .95, 5.0), R.p(4.0, .55, 5.0), R.p(-4.0, .55, 5.0)]; ctx.fillStyle = 'rgba(200,230,240,.35)'; poly(ctx, pts); ctx.fill(); for (let k = 0; k < 14; k++) { const [px, py] = R.p(-3.6 + k * .52, .62, 5.0); ctx.fillStyle = rgb(jitter(['#2a2a2a', '#d86a20', '#e8e0d0'][k % 3], rr, 10)); ctx.fillRect(px, py - 46, 28, 46); } }
    FIN(ctx, r, W, H, .4);
  };

  // A roadside chai stall: brick wall with a cork notice board (the running market-share chart goes here), tin awning, stove and kettle, a bench.
  ENV.chaiStall = (ctx, r, W, H) => { const rr = P.RNG(55), base = H * .82;
    ctx.fillStyle = '#8a4a34'; ctx.fillRect(0, 0, W, base); for (let y = 0; y < base; y += 44) for (let x = (y / 44) % 2 ? -50 : 0; x < W; x += 100) { ctx.fillStyle = rgb(jitter('#9a5a3e', rr, 16)); ctx.fillRect(x + 3, y + 3, 94, 38); }
    paintRegion(ctx, rr, [[0, 0], [W, 0], [W, base], [0, base]], '#9a5a3e', { density: 300, len: [20, 60], w: [4, 10], al: .18 });
    ctx.fillStyle = 'rgba(230,220,190,.35)'; ctx.fillRect(0, base - 260, W, 260);
    // awning
    ctx.fillStyle = '#7a8088'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(W + 20, 0); ctx.lineTo(W + 20, 160); ctx.lineTo(-20, 200); ctx.fill(); for (let x = 0; x < W; x += 40) { ctx.fillStyle = 'rgba(20,20,20,.25)'; ctx.fillRect(x, 0, 8, 190); } ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 190, W, 40);
    // cork board
    { const x = 760, y = 300, w = 1040, h = 640; ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x - 24, y - 24, w + 48, h + 48); ctx.fillStyle = '#c8a070'; ctx.fillRect(x, y, w, h); for (let k = 0; k < 4000; k++) { ctx.fillStyle = `rgba(${rr() < .5 ? '120,80,40' : '230,200,150'},.25)`; ctx.fillRect(x + rr() * w, y + rr() * h, 3, 3); } }
    // stove + kettle (left), glasses
    { const sx = 260, sy = base; ctx.fillStyle = '#5a5a5a'; ctx.fillRect(sx - 160, sy - 300, 320, 300); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(sx - 120, sy - 330, 240, 30); ctx.fillStyle = '#c8c0b0'; ctx.beginPath(); ctx.ellipse(sx, sy - 400, 110, 80, 0, 0, 7); ctx.fill(); ctx.fillRect(sx - 20, sy - 500, 40, 40); ctx.strokeStyle = '#8a8070'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(sx + 100, sy - 420); ctx.lineTo(sx + 190, sy - 480); ctx.stroke(); ENV.smoke(ctx, rr, sx, sy - 500, 260, '#ffffff', .2);
      for (let k = 0; k < 6; k++) { ctx.fillStyle = 'rgba(230,240,240,.6)'; ctx.fillRect(sx + 220 + k * 40, sy - 380, 26, 40); ctx.fillStyle = '#c88a4a'; ctx.fillRect(sx + 222 + k * 40, sy - 360, 22, 18); } ctx.fillStyle = '#6a4a32'; ctx.fillRect(sx + 200, sy - 340, 280, 20); }
    // bench (right)
    { ctx.fillStyle = '#6a4a2a'; ctx.fillRect(1960, base - 140, 520, 30); ctx.fillRect(1990, base - 110, 24, 110); ctx.fillRect(2430, base - 110, 24, 110); }
    M.ground(ctx, r, W, H, base, '#9a7a5a', '#a88a68', {}); dust(ctx, rr, W, H, base, .14); ctx.fillStyle = 'rgba(20,10,6,.3)'; ctx.fillRect(0, base, W, 16);
    FIN(ctx, r, W, H, .42);
  };

  // A warehouse stacked with cardboard phone boxes under tube lights; a roller door at the back. o.dust = gathering dust (dim, greyer).
  ENV.warehouse = (ctx, r, W, H, o = {}) => { const rr = P.RNG(66);
    const R = new ENV.Room(ctx, r, W, H, { RW: 16, RH: 6, ch: 1.5, zf: 14, f: 1800, hor: .46 });
    R.shell({ back: '#8a8a84', side: '#7a7a74', ceil: '#5a5a58', floor: '#9a968e', planks: false });
    { const [X, Y] = R.p(-2.4, 4, 13.99), [X1, Y1] = R.p(2.4, 0, 13.99); ctx.fillStyle = '#6a6e72'; ctx.fillRect(X, Y, X1 - X, Y1 - Y); for (let y = Y; y < Y1; y += 12) { ctx.fillStyle = 'rgba(20,20,20,.25)'; ctx.fillRect(X, y, X1 - X, 3); } }
    for (const side of [-1, 1]) for (let z = 13; z > 3; z -= 1.3) for (let j = 0; j < 4; j++) for (let i = 0; i < 2; i++) { const x = side < 0 ? -7.8 + i * .9 : 6.0 + i * .9; R.box(x, j * .8, z, .85, .78, 1.1, jitter('#b88a5a', rr, 12), { density: 6, shadow: j === 0 }); }
    for (let z = 3; z < 14; z += 2.4) { const [a, b] = R.p(-1, 5.99, z), [c2] = R.p(1, 5.99, z); ctx.fillStyle = o.dust ? '#d8dcd0' : '#fbfbf4'; ctx.fillRect(a, b, c2 - a, 10); glow(ctx, (a + c2) / 2, b + 30, R.s(z) * 2, '#f0f8ff', o.dust ? .06 : .14); }
    if (o.dust) { ctx.fillStyle = 'rgba(80,80,70,.25)'; ctx.fillRect(0, 0, W, H); for (let k = 0; k < 400; k++) { ctx.fillStyle = 'rgba(240,240,220,.18)'; ctx.beginPath(); ctx.arc(rr() * W, rr() * H * .8, rr.range(1, 3), 0, 7); ctx.fill(); } }
    FIN(ctx, r, W, H, .45);
  };

  // A giant launch stage: blue light, a big blank screen, beams sweeping over a dark crowd.
  ENV.launchStage = (ctx, r, W, H, o = {}) => { const rr = P.RNG(77), col = o.col || '#2a6ad8';
    ctx.fillStyle = '#060a18'; ctx.fillRect(0, 0, W, H); glow(ctx, W / 2, H * .3, 1400, col, .35);
    { const x = W * .2, y = H * .08, w = W * .6, h = H * .44; ctx.fillStyle = shade(col, -.3) === undefined ? '#1a3a8a' : rgb(shade(col, -.35)); ctx.fillRect(x, y, w, h); glow(ctx, W / 2, y + h / 2, 900, col, .4); ctx.strokeStyle = '#0a0e1a'; ctx.lineWidth = 16; ctx.strokeRect(x, y, w, h); }
    for (let k = 0; k < 7; k++) { const x0 = W * (k + .5) / 7, g = ctx.createLinearGradient(x0, 0, W / 2, H * .7); g.addColorStop(0, rgb(P.hex(col), .35)); g.addColorStop(1, rgb(P.hex(col), 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x0 - 20, 0); ctx.lineTo(x0 + 20, 0); ctx.lineTo(W / 2 + (x0 - W / 2) * .2 + 160, H * .75); ctx.lineTo(W / 2 + (x0 - W / 2) * .2 - 160, H * .75); ctx.fill(); }
    ctx.fillStyle = '#121828'; ctx.fillRect(W * .1, H * .6, W * .8, 80); ctx.fillStyle = rgb(P.hex(col), .6); ctx.fillRect(W * .1, H * .6, W * .8, 8);
    for (let j = 0; j < 6; j++) for (let x = -40 + (j % 2) * 30; x < W + 40; x += rr.range(46, 66)) { const y = H * .76 + j * 52, s = 26 + j * 6; ctx.fillStyle = rgb(jitter('#0c1020', rr, 8)); ctx.beginPath(); ctx.arc(x, y, s * .55, 0, 7); ctx.fill(); ctx.fillRect(x - s * .8, y + s * .4, s * 1.6, s * 2); if (rr() < .06) { ctx.fillStyle = '#e8f0ff'; ctx.fillRect(x + 10, y - 50, 14, 22); glow(ctx, x + 17, y - 40, 40, '#ffffff', .4); } }
    FIN(ctx, r, W, H, .5, 60000);
  };

  // A living room on a festival evening: sofa, a CRT TV on a stand, diyas glowing, the moon in the window.
  ENV.livingRoom = (ctx, r, W, H) => { const rr = P.RNG(88);
    const R = new ENV.Room(ctx, r, W, H, { RW: 10, RH: 3.2, ch: 1.5, zf: 6, f: 1800, hor: .45 });
    R.shell({ back: '#d8a878', side: '#c89868', ceil: '#e8d8c0', floor: '#8a5a3a', planks: false, skirting: '#5a3a2a' });
    { const [X, Y] = R.p(1.8, 2.7, 5.99), [X1, Y1] = R.p(3.8, 1.2, 5.99); ctx.fillStyle = grad(ctx, 0, Y, 0, Y1, [[0, '#0c1430'], [1, '#2a2a4a']]); ctx.fillRect(X, Y, X1 - X, Y1 - Y); ctx.fillStyle = '#fff8e0'; ctx.beginPath(); ctx.arc(X + (X1 - X) * .65, Y + (Y1 - Y) * .3, 50, 0, 7); ctx.fill(); glow(ctx, X + (X1 - X) * .65, Y + (Y1 - Y) * .3, 220, '#fff0c0', .35); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 8; ctx.strokeRect(X, Y, X1 - X, Y1 - Y); ctx.fillStyle = 'rgba(200,60,60,.6)'; ctx.fillRect(X - 40, Y - 10, 46, Y1 - Y + 30); ctx.fillRect(X1 - 6, Y - 10, 46, Y1 - Y + 30); }
    // marigold garland on the back wall
    { for (let k = 0; k < 40; k++) { const t = k / 39, [px, py] = R.p(-4.6 + t * 9.2, 2.95 - Math.sin(t * Math.PI * 4) * .08, 5.98); ctx.fillStyle = k % 2 ? '#f0a020' : '#e86010'; ctx.beginPath(); ctx.arc(px, py, 14, 0, 7); ctx.fill(); } }
    // TV stand + CRT (screen left dark for the animation to fill)
    R.box(-1.4, 0, 5.4, 2.0, .6, .5, '#5a3a22', { density: 30 }); R.box(-1.0, .6, 5.45, 1.2, .9, .6, '#2a2a2e', { density: 20 });
    { const [sx, sy] = R.p(-.9, 1.42, 5.45), [ex, ey] = R.p(.1, .68, 5.45); ctx.fillStyle = '#1a2a30'; ctx.fillRect(sx, sy, ex - sx, ey - sy); }
    // diyas on a shelf
    { const [a, b] = R.p(-4.2, 1.2, 5.9), [c2] = R.p(-2.2, 1.2, 5.9); ctx.fillStyle = '#5a3a22'; ctx.fillRect(a, b, c2 - a, 14); for (let k = 0; k < 5; k++) { const x = a + 30 + k * (c2 - a - 60) / 4; ctx.fillStyle = '#b86a3a'; ctx.beginPath(); ctx.ellipse(x, b - 6, 22, 10, 0, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#ffd060'; ctx.beginPath(); ctx.ellipse(x, b - 22, 6, 12, 0, 0, 7); ctx.fill(); glow(ctx, x, b - 20, 140, '#ffb040', .45); } }
    // sofa (left), rug
    R.box(-4.8, 0, 3.6, 2.6, .5, 1.0, '#8a2a3a', { density: 30 }); R.box(-4.8, .5, 4.4, 2.6, .55, .25, '#7a2232', { density: 20 });
    ENV.rug(ctx, rr, W / 2, H * .9, 900, 160, '#a83a2a', '#e8b040');
    ctx.fillStyle = 'rgba(40,20,40,.25)'; ctx.fillRect(0, 0, W, H); glow(ctx, W * .2, H * .5, 900, '#ffb050', .2);
    FIN(ctx, r, W, H, .45);
  };

  // A crime-board wall: cork board on a dark wall, lit from above.
  ENV.corkboard = (ctx, r, W, H) => { const rr = P.RNG(99); ctx.fillStyle = '#1e1a1a'; ctx.fillRect(0, 0, W, H); M.wall(ctx, r, [0, 0, W, H], '#2a2422', { density: 200 });
    const x = 160, y = 140, w = W - 320, h = H - 300; ctx.fillStyle = '#4a3020'; ctx.fillRect(x - 30, y - 30, w + 60, h + 60); ctx.fillStyle = '#b88a5a'; ctx.fillRect(x, y, w, h); for (let k = 0; k < 14000; k++) { ctx.fillStyle = `rgba(${rr() < .5 ? '110,70,36' : '220,180,130'},.28)`; ctx.fillRect(x + rr() * w, y + rr() * h, 3, 3); }
    glow(ctx, W / 2, 0, 1600, '#ffe0a0', .25); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(0, H - 160, W, 160);
    FIN(ctx, r, W, H, .55, 60000);
  };
})(window);

window.PLATES = {
  flat: (c, r, W, H) => ENV.mxFlat(c, r, W, H),
  flat_pc: (c, r, W, H) => ENV.mxFlat(c, r, W, H, { pc: true }),
  flat_night: (c, r, W, H) => ENV.mxFlat(c, r, W, H, { pc: true, night: true }),
  village_room: (c, r, W, H) => ENV.mxFlat(c, r, W, H, { village: true }),
  village_night: (c, r, W, H) => ENV.mxFlat(c, r, W, H, { village: true, night: true }),
  pco_road: (c, r, W, H) => ENV.pcoRoad(c, r, W, H),
  market: (c, r, W, H) => ENV.phoneMarket(c, r, W, H),
  market_rivals: (c, r, W, H) => ENV.phoneMarket(c, r, W, H, { banners: ['#2a8a5a', '#1a8a8a', '#3a5ad8', '#e86a10'] }),
  phone_shop: (c, r, W, H) => ENV.phoneShop(c, r, W, H),
  chai_stall: (c, r, W, H) => ENV.chaiStall(c, r, W, H),
  warehouse: (c, r, W, H) => ENV.warehouse(c, r, W, H),
  warehouse_dust: (c, r, W, H) => ENV.warehouse(c, r, W, H, { dust: true }),
  stage_blue: (c, r, W, H) => ENV.launchStage(c, r, W, H),
  stage_orange: (c, r, W, H) => ENV.launchStage(c, r, W, H, { col: '#e86a10' }),
  living_room: (c, r, W, H) => ENV.livingRoom(c, r, W, H),
  corkboard: (c, r, W, H) => ENV.corkboard(c, r, W, H),
  map_india: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 62, lon1: 102, lat0: 5, lat1: 37 }, grid: 5, compass: [64, 8], title: 'India', titleXY: [2080, 1080],
    labels: [[77.2, 28.6, 'Delhi', 26, true], [72.88, 19.08, 'Mumbai', 24, true], [88.36, 22.57, 'Kolkata', 24, true], [80.27, 13.08, 'Chennai', 24, true], [85.1, 25.6, 'Patna', 22, true], [80.95, 26.85, 'Lucknow', 22, true]],
    mountains: [[80, 31, 14, 6]], rivers: [], greens: [[76, 12, 6], [88, 25, 5]], deserts: [[71, 27, 4]] }),
  map_asia: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 64, lon1: 128, lat0: 4, lat1: 46 }, grid: 10, compass: [66, 7], title: 'Asia', titleXY: [2080, 1080],
    labels: [[77.2, 28.6, 'Delhi', 24, true], [114.06, 22.54, 'Shenzhen', 24, true], [116.4, 39.9, 'Beijing', 22, true]],
    mountains: [[85, 31, 16, 8]], rivers: [], greens: [[110, 28, 8]], deserts: [[95, 40, 8]] }),
};
