// Finance / city plates for the BlackRock video: night skyline, boardroom, parchment map, courthouse, 1980s trading floor.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, Room = ENV.Room, { hex, rgb, mix, jitter, shade, glow, poly, paintRegion, kuwahara, fillStrokes } = P;
  const F = ENV.fin = {};
  // one building: x,w at base y, top ytop; style options
  F.bld = (c, r, x, ytop, w, ybase, body, o = {}) => {
    const lit = o.lit ?? .35, litCol = o.litCol || '#ffcf86', fw = o.fw ?? Math.max(3, w / 14), fh = o.fh ?? fw * 1.5;
    paintRegion(c, r, [[x, ytop], [x + w, ytop], [x + w, ybase], [x, ybase]], body, { density: o.density ?? 500, len: [10, 40], w: [2, 6], ang: -Math.PI / 2, angJ: .05, al: .3, topLight: o.top ?? .06, botDark: o.bot ?? -.2, var: 6 });
    // side shading strip (gives volume)
    if (o.side !== false) { const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.62, 'rgba(0,0,0,0)'); g.addColorStop(.63, 'rgba(0,0,0,.22)'); g.addColorStop(1, 'rgba(0,0,0,.32)'); c.fillStyle = g; c.fillRect(x, ytop, w, ybase - ytop); }
    // windows
    if (o.windows !== false) { const cols = Math.max(1, Math.floor(w / (fw * 2))), rows = Math.floor((ybase - ytop - fh) / (fh * 1.9)); const ox = (w - cols * fw * 2) / 2 + fw * .5;
      const band = r() < .4; for (let j = 0; j < rows; j++) { const floorLit = r() < (o.floorProb ?? .25); for (let i = 0; i < cols; i++) { const on = floorLit ? r() < .85 : r() < lit; if (!on && r() < .65) continue;
        const wx = x + ox + i * fw * 2, wy = ytop + fh * .8 + j * fh * 1.9; c.fillStyle = on ? rgb(jitter(r() < .15 ? '#cfe6ff' : litCol, r, 22), r.range(.55, .95)) : rgb(shade(body, .25), .5); c.fillRect(wx, wy, band ? fw * 1.8 : fw, fh); } } }
    // facade detail: ledges every few floors, faint pilasters, parapet cap
    c.save(); c.strokeStyle = rgb(shade(body, .35), .35); c.lineWidth = 1.2; for (let y = ytop + fh * 1.9 * (o.ledge ?? r.int(4, 8)); y < ybase - 6; y += fh * 1.9 * (o.ledge ?? 6)) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + w, y); c.stroke(); }
    c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 1; const pst = fw * 2 * r.int(2, 4); for (let xx = x + pst; xx < x + w - 3; xx += pst) { c.beginPath(); c.moveTo(xx, ytop); c.lineTo(xx, ybase); c.stroke(); }
    c.fillStyle = rgb(shade(body, .22)); c.fillRect(x - 1, ytop - 2, w + 2, 3); c.restore();
    // roof furniture
    const cx = x + w / 2;
    if (o.antenna) { c.strokeStyle = rgb(shade(body, -.2)); c.lineWidth = Math.max(2, w * .025); c.beginPath(); c.moveTo(cx, ytop); c.lineTo(cx, ytop - o.antenna); c.stroke(); c.fillStyle = '#ff5a4a'; c.beginPath(); c.arc(cx, ytop - o.antenna, Math.max(2.5, w * .02), 0, 7); c.fill(); glow(c, cx, ytop - o.antenna, 22, '#ff4a3a', .5); }
    if (o.tank) { const tw = Math.min(w * .22, 34), tx = x + w * r.range(.15, .6), th = tw * 1.1; c.fillStyle = rgb(shade(body, -.1)); c.fillRect(tx, ytop - th, tw, th); c.beginPath(); c.moveTo(tx - 2, ytop - th); c.lineTo(tx + tw / 2, ytop - th - tw * .45); c.lineTo(tx + tw + 2, ytop - th); c.fill();
      c.strokeStyle = rgb(shade(body, .2), .5); c.lineWidth = 1; for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(tx, ytop - th * k / 4); c.lineTo(tx + tw, ytop - th * k / 4); c.stroke(); } }
    if (o.crown === 'spire') { c.fillStyle = rgb(shade(body, .05)); poly(c, [[x + w * .2, ytop], [cx, ytop - w * 1.2], [x + w * .8, ytop]]); c.fill(); c.strokeStyle = rgb(hex(litCol), .5); c.lineWidth = 1.5; for (let k = 1; k < 5; k++) { const yy = ytop - w * 1.2 * k / 5, hw = w * .3 * (1 - k / 5); c.beginPath(); c.moveTo(cx - hw, yy); c.lineTo(cx + hw, yy); c.stroke(); } }
    if (o.crown === 'step') { for (let k = 1; k <= 3; k++) { const sw = w * (1 - k * .22), sh = w * .18; c.fillStyle = rgb(shade(body, k * .03)); c.fillRect(cx - sw / 2, ytop - sh * k, sw, sh + 1); c.fillStyle = rgb(hex(litCol), .55); for (let i = 0; i < 4; i++) c.fillRect(cx - sw / 2 + sw * (i + .3) / 4, ytop - sh * k + sh * .3, sw * .1, sh * .35); } }
  };
  // a layer of buildings across [x0,x1] with heights in [h0,h1] above base y
  F.layer = (c, r, x0, x1, base, h0, h1, body, o = {}) => { let x = x0; while (x < x1) { const w = r.range(o.w?.[0] ?? 40, o.w?.[1] ?? 120), h = r.range(h0, h1) * (r() < .12 ? 1.5 : 1);
    F.bld(c, r, x, base - h, w, base + 4, jitter(body, r, o.var ?? 5), { lit: o.lit ?? .3, fw: o.fw, antenna: r() < (o.ant ?? .12) ? r.range(20, 70) : 0, tank: r() < (o.tank ?? .2), crown: r() < (o.spire ?? .04) ? 'spire' : r() < (o.step ?? .08) ? 'step' : null, side: o.side, litCol: o.litCol, floorProb: o.floorProb, density: o.density });
    if (r() < (o.setback ?? .3)) { const sw = w * r.range(.45, .7), sh = h * r.range(.15, .35); F.bld(c, r, x + (w - sw) * r.range(.3, .7), base - h - sh, sw, base - h + 2, jitter(shade(body, .03), r, 4), { lit: (o.lit ?? .3) * .8, fw: o.fw, antenna: r() < .3 ? r.range(20, 60) : 0, tank: r() < .3, side: o.side, litCol: o.litCol, floorProb: o.floorProb, density: o.density }); }
    x += w + r.range(-w * .25, w * .1); } };
  // the black glass tower (hero). cx centre, ytop, w width at base, ybase
  F.blackTower = (c, r, cx, ytop, w, ybase, o = {}) => { const x = cx - w / 2, tw = w * .86;
    // body: dark glass with vertical fins, slightly tapered
    const pts = [[cx - tw / 2, ytop], [cx + tw / 2, ytop], [x + w, ybase], [x, ybase]];
    paintRegion(c, r, pts, '#10141c', { density: 260, len: [30, 90], w: [3, 8], ang: -Math.PI / 2, angJ: .03, al: .35, topLight: .12, botDark: -.1, var: 4 });
    c.save(); poly(c, pts); c.clip();
    // reflection of the city glow on the glass (left face lighter)
    const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, 'rgba(120,140,190,.22)'); g.addColorStop(.48, 'rgba(60,70,100,.08)'); g.addColorStop(.5, 'rgba(0,0,0,.25)'); g.addColorStop(1, 'rgba(0,0,0,.4)'); c.fillStyle = g; c.fillRect(x, ytop, w, ybase - ytop);
    // vertical mullions
    for (let i = 1; i < 22; i++) { const t = i / 22, xa = cx - tw / 2 + tw * t, xb = x + w * t; c.strokeStyle = `rgba(150,170,210,${i % 4 ? .1 : .22})`; c.lineWidth = i % 4 ? 1 : 2; c.beginPath(); c.moveTo(xa, ytop); c.lineTo(xb, ybase); c.stroke(); }
    // floor lines
    const fl = o.floors ?? 60; for (let j = 1; j < fl; j++) { const y = ytop + (ybase - ytop) * j / fl, t = (y - ytop) / (ybase - ytop), hw = (tw + (w - tw) * t) / 2; c.strokeStyle = 'rgba(140,160,200,.08)'; c.lineWidth = 1; c.beginPath(); c.moveTo(cx - hw, y); c.lineTo(cx + hw, y); c.stroke(); }
    // scattered lit windows lower, lit top floors (warm)
    for (let j = 0; j < fl; j++) { const y = ytop + (ybase - ytop) * j / fl, t = (y - ytop) / (ybase - ytop), hw = (tw + (w - tw) * t) / 2, top = j < (o.litTop ?? 7);
      for (let i = 0; i < 22; i++) { if (!(top ? r() < .8 : r() < .05)) continue; const xx = cx - hw + 2 * hw * (i + .15) / 22; c.fillStyle = top ? rgb(jitter('#ffd890', r, 18), r.range(.55, .9)) : rgb(jitter('#c8dcff', r, 15), .45); c.fillRect(xx, y + 2, 2 * hw / 22 * .7, (ybase - ytop) / fl - 4); } }
    // sky glint along left edge
    c.strokeStyle = 'rgba(200,215,255,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - tw / 2 + 2, ytop); c.lineTo(x + 2, ybase); c.stroke();
    c.restore();
    // crown: angled glass cap with light strip
    const ch = w * .32; c.fillStyle = '#0c1018'; poly(c, [[cx - tw / 2, ytop], [cx + tw / 2, ytop], [cx + tw / 2, ytop - ch * .35], [cx - tw * .1, ytop - ch]]); c.fill();
    c.strokeStyle = 'rgba(255,220,150,.75)'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - tw / 2, ytop); c.lineTo(cx - tw * .1, ytop - ch); c.lineTo(cx + tw / 2, ytop - ch * .35); c.stroke(); glow(c, cx, ytop - ch * .5, w * .9, '#ffcf80', .14);
    c.strokeStyle = '#0c1018'; c.lineWidth = 4; c.beginPath(); c.moveTo(cx - tw * .1, ytop - ch); c.lineTo(cx - tw * .1, ytop - ch - w * .5); c.stroke(); c.fillStyle = '#ff5040'; c.beginPath(); c.arc(cx - tw * .1, ytop - ch - w * .5, 4, 0, 7); c.fill(); glow(c, cx - tw * .1, ytop - ch - w * .5, 30, '#ff4030', .6);
    return { top: ytop - ch, litY: [ytop, ytop + (ybase - ytop) * (o.litTop ?? 7) / fl] }; };
  F.stars = (c, r, W, h, n = 260) => { for (let i = 0; i < n; i++) { const x = r() * W, y = Math.pow(r(), 1.6) * h, s = r.range(.6, 2.2); c.fillStyle = `rgba(230,235,255,${r.range(.25, .8) * (1 - y / h)})`; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill(); } };
  // ---------- night skyline ----------
  // o.hero: draw the black tower; o.water: river at the bottom; o.box: paint into [X,Y,w,h] (for windows)
  ENV.skyline = (ctx, r, W, H, o = {}) => { const hor = H * (o.hor ?? .78), heroX = W * (o.heroX ?? .5);
    // sky: deep navy to warm light-pollution glow at horizon
    M.sky(ctx, r, W, hor + 40, '#0b1026', '#3a3150', { strokes: 2200 });
    let g = ctx.createLinearGradient(0, hor * .45, 0, hor); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, 'rgba(255,150,100,.32)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, hor + 40);
    F.stars(ctx, r, W, hor * .6, 300);
    // moon
    if (o.moon !== false) { const mx = W * (o.moonX ?? .82), my = H * .13; glow(ctx, mx, my, 260, '#9fb2e0', .25); M.glowDisk(ctx, mx, my, 34, '#f4f1e4'); ctx.fillStyle = 'rgba(160,160,170,.25)'; for (const [dx, dy, rr] of [[-8, -6, 7], [9, 5, 5], [-2, 11, 4]]) { ctx.beginPath(); ctx.arc(mx + dx, my + dy, rr, 0, 7); ctx.fill(); } }
    // thin lit clouds
    ctx.save(); for (let k = 0; k < 14; k++) { const cx = r() * W, cy = H * r.range(.08, .4), cw = r.range(250, 600); ctx.globalAlpha = r.range(.12, .25); for (let i = 0; i < 18; i++) { const x = cx + r.gauss() * cw * .4, y = cy + r.gauss() * 14; const gg = ctx.createRadialGradient(x, y, 0, x, y, r.range(30, 70)); gg.addColorStop(0, 'rgba(120,110,150,.6)'); gg.addColorStop(1, 'rgba(120,110,150,0)'); ctx.fillStyle = gg; ctx.fillRect(x - 70, y - 70, 140, 140); } } ctx.restore();
    // far layer (hazy)
    F.layer(ctx, r, -40, W + 40, hor, H * .08, H * .2, '#2a3048', { lit: .18, fw: 3, ant: .2, tank: .1, density: 900, floorProb: .1, side: false });
    g = ctx.createLinearGradient(0, hor - H * .25, 0, hor); g.addColorStop(0, 'rgba(70,60,95,.0)'); g.addColorStop(1, 'rgba(90,70,100,.55)'); ctx.fillStyle = g; ctx.fillRect(0, hor - H * .3, W, H * .3 + 4);
    // mid layer with a few landmark spires, leave a gap around the hero
    F.layer(ctx, r, -40, heroX - W * .09, hor + 6, H * .14, H * .36, '#1c2236', { lit: .2, fw: 4, ant: .15, tank: .25, spire: .08, step: .12, w: [60, 150], floorProb: .08 });
    F.layer(ctx, r, heroX + W * .09, W + 40, hor + 6, H * .14, H * .38, '#1c2236', { lit: .2, fw: 4, ant: .15, tank: .25, spire: .08, step: .12, w: [60, 150], floorProb: .08 });
    let hero = null; if (o.hero !== false) hero = F.blackTower(ctx, r, heroX, H * (o.heroTop ?? .16), W * (o.heroW ?? .1), hor + 10, { litTop: 8 });
    // near layer: darker, bigger, at the sides only
    F.layer(ctx, r, -60, W * .3, hor + 14, H * .22, H * .5, '#121625', { lit: .22, fw: 6, w: [120, 240], tank: .3, ant: .1, step: .1, floorProb: .07 });
    F.layer(ctx, r, W * .72, W + 60, hor + 14, H * .2, H * .48, '#121625', { lit: .22, fw: 6, w: [120, 240], tank: .3, ant: .1, step: .1, floorProb: .07 });
    // haze between layers + street glow
    g = ctx.createLinearGradient(0, hor - 80, 0, hor + 20); g.addColorStop(0, 'rgba(255,170,110,0)'); g.addColorStop(1, 'rgba(255,170,110,.25)'); ctx.fillStyle = g; ctx.fillRect(0, hor - 80, W, 100);
    // river + reflections
    if (o.water !== false) { const wy = hor + 14; paintRegion(ctx, r, [[0, wy], [W, wy], [W, H], [0, H]], '#0d1222', { density: 400, len: [60, 200], w: [3, 8], ang: 0, angJ: .02, al: .35, topLight: .1, botDark: -.2 });
      const img = ctx.getImageData(0, Math.max(0, wy - 400), W, 400).data; ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 9000; i++) { const x = r() * W | 0, sy = 399 - (Math.pow(r(), 2) * 380 | 0), k = (sy * W + x) * 4, lum = img[k] + img[k + 1] + img[k + 2]; if (lum < 260) continue; const d = 399 - sy, y = wy + d * .9 + r.gauss() * 6; if (y > H) continue;
        ctx.fillStyle = `rgba(${img[k]},${img[k + 1]},${img[k + 2]},${r.range(.25, .55) * (1 - d / 420)})`; ctx.fillRect(x - r.range(4, 16), y, r.range(8, 34), r.range(1.5, 3)); } ctx.restore();
      // long vertical light columns under bright spots
      ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(3px)'; for (let i = 0; i < 260; i++) { const x = r() * W | 0, sy = 399 - (r() * 300 | 0), k = (sy * W + x) * 4; if (img[k] + img[k + 1] + img[k + 2] < 420) continue; const len = r.range(60, 220); for (let y = wy + 4; y < wy + len; y += 5) { ctx.fillStyle = `rgba(${img[k]},${img[k + 1]},${img[k + 2]},${.35 * (1 - (y - wy) / len)})`; ctx.fillRect(x - 3 + Math.sin(y * .3 + i) * 4, y, r.range(4, 9), 2); } } ctx.restore();
      // embankment wall + lamps
      ctx.fillStyle = '#0a0d16'; ctx.fillRect(0, wy - 6, W, 12); for (let x = 30; x < W; x += 140) { ctx.fillStyle = '#ffe2a8'; ctx.beginPath(); ctx.arc(x, wy - 14, 3.5, 0, 7); ctx.fill(); glow(ctx, x, wy - 14, 40, '#ffcf80', .35); ctx.fillStyle = 'rgba(255,210,140,.25)'; ctx.fillRect(x - 2, wy + 6, 4, 70); }
      // a ferry
      if (o.boat !== false) { const bx = W * .23, by = wy + 120; ctx.fillStyle = '#0a0c14'; poly(ctx, [[bx - 120, by], [bx + 130, by], [bx + 110, by + 26], [bx - 100, by + 26]]); ctx.fill(); ctx.fillStyle = '#151a28'; ctx.fillRect(bx - 70, by - 30, 150, 30); for (let i = 0; i < 9; i++) { ctx.fillStyle = rgb(jitter('#ffd38a', r, 15), .9); ctx.fillRect(bx - 62 + i * 16, by - 22, 9, 10); } glow(ctx, bx, by, 160, '#ffcf80', .15); } }
    return hero; };
  ENV.skylinePlate = (ctx, r, W, H, o = {}) => { ENV.skyline(ctx, r, W, H, o); ENV.impasto(ctx, r, W, H, { n: 90000, edge: 30 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig: .4 }); };

  // ---------- boardroom at night, glass wall onto the skyline ----------
  ENV.boardroom = (ctx, r, W, H, o = {}) => {
    const R = new Room(ctx, r, W, H, { RW: 10, RH: 3.3, ch: 1.5, zf: 8, f: 1750, hor: .45 });
    R.shell({ back: '#20242e', side: '#3a2a20', ceil: '#1c1a1e', floor: '#2b2833', planks: false });
    // carpet pattern (subtle diagonal weave)
    { const c = ctx, pts = [R.p(-5, 0, 1.4), R.p(5, 0, 1.4), R.p(5, 0, 8), R.p(-5, 0, 8)]; c.save(); poly(c, pts); c.clip(); for (let z = 8; z > 1.4; z -= .25) { const a = R.p(-5, 0, z), b = R.p(5, 0, z); c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 1; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); } c.restore(); }
    // glass back wall: skyline view
    const [X, Y, w, h] = R.backRect(-5, 0, 5, 3.3); const off = document.createElement('canvas'); off.width = Math.round(w); off.height = Math.round(h); const oc = off.getContext('2d', { willReadFrequently: true });
    ENV.skyline(oc, P.RNG(77), off.width, off.height, { hor: .8, heroX: .62, heroW: .08, heroTop: .1, boat: false, moonX: .2 }); ctx.drawImage(off, X, Y);
    // night tint + reflection of the room on the glass
    ctx.fillStyle = 'rgba(10,14,30,.18)'; ctx.fillRect(X, Y, w, h);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let k = 0; k < 5; k++) { const lx = X + w * (.1 + k * .2); glow(ctx, lx, Y + h * .04, 70, '#ffe2b0', .18); } ctx.restore();
    // mullions + transom
    const zb = R.zf - .01; for (let x = -5; x <= 5.01; x += 2) { const a = R.p(x, 3.3, zb), b = R.p(x, 0, zb); ctx.fillStyle = '#0d0f14'; ctx.fillRect(a[0] - 7, a[1], 14, b[1] - a[1]); ctx.fillStyle = 'rgba(160,170,200,.25)'; ctx.fillRect(a[0] - 7, a[1], 2, b[1] - a[1]); }
    { const a = R.p(-5, .12, zb), b = R.p(5, 0, zb); ctx.fillStyle = '#121418'; ctx.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); }
    // side walls: walnut panels with vertical grooves
    for (const xw of [-5, 5]) for (let z = 1.5; z < 8; z += .9) R.onSide(xw, 3.3, z, (c, s) => { c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 3.3 * s); c.stroke(); c.strokeStyle = 'rgba(255,200,150,.08)'; c.lineWidth = 2; c.beginPath(); c.moveTo(4, 0); c.lineTo(4, 3.3 * s); c.stroke(); for (let k = 0; k < 14; k++) { c.strokeStyle = `rgba(${r() < .5 ? '20,10,5' : '120,80,50'},.12)`; c.lineWidth = r.range(1, 3); const yy = r() * 3.3 * s; c.beginPath(); c.moveTo(6, yy); c.bezierCurveTo(.3 * s, yy + r.gauss() * 10, .6 * s, yy + r.gauss() * 10, .88 * s, yy + r.gauss() * 6); c.stroke(); } });
    // left wall: big screen with a market chart
    R.onSide(-5, 2.45, 4.0, (c, s) => { const sw = 2.4 * s, sh = 1.3 * s; c.fillStyle = '#08090c'; c.fillRect(-6, -6, sw + 12, sh + 12); const g = c.createLinearGradient(0, 0, 0, sh); g.addColorStop(0, '#0e2240'); g.addColorStop(1, '#081426'); c.fillStyle = g; c.fillRect(0, 0, sw, sh);
      c.strokeStyle = 'rgba(120,170,255,.18)'; c.lineWidth = 1; for (let i = 1; i < 8; i++) { c.beginPath(); c.moveTo(0, sh * i / 8); c.lineTo(sw, sh * i / 8); c.stroke(); }
      c.strokeStyle = '#5fd0a0'; c.lineWidth = 4; c.beginPath(); let v = .8; for (let i = 0; i <= 40; i++) { v = Math.max(.1, Math.min(.9, v - .016 + r.gauss() * .05)); const xx = sw * i / 40, yy = sh * v; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke();
      for (let i = 0; i < 24; i++) { const bh = r.range(.03, .18) * sh; c.fillStyle = 'rgba(90,150,255,.35)'; c.fillRect(sw * (i + .2) / 24, sh - bh, sw / 24 * .6, bh); } });
    { const [sx, sy] = R.p(-5, 1.8, 5.2); glow(ctx, sx, sy, 520, '#4a90ff', .16); }
    // right wall: credenza + abstract painting
    R.onSide(5, 2.4, 3.0, (c, s) => { const pw = 1.3 * s, ph = .9 * s; c.fillStyle = '#c8b48a'; c.fillRect(-8, -8, pw + 16, ph + 16); const g = c.createLinearGradient(0, 0, pw, ph); g.addColorStop(0, '#2a3a5a'); g.addColorStop(1, '#8a4a3a'); c.fillStyle = g; c.fillRect(0, 0, pw, ph); for (let k = 0; k < 40; k++) { c.fillStyle = rgb(jitter(['#d8a050', '#3a5a8a', '#e8dcc0', '#7a2a20'][k % 4], r, 20), .55); c.fillRect(r() * pw * .9, r() * ph * .9, r.range(6, 60), r.range(4, 40)); } });
    R.box(4.45, 0, 2.6, .55, .75, 2.2, '#2e2018', { density: 40 });
    // ceiling: recessed downlights + linear pendant over the table
    for (let z = 2.2; z < 8; z += 1.1) for (const x of [-3.2, -1.6, 1.6, 3.2]) { const [lx, ly] = R.p(x, 3.3, z); ctx.fillStyle = '#fff3d8'; ctx.beginPath(); ctx.ellipse(lx, ly, 26 * 3 / z, 7 * 3 / z, 0, 0, 7); ctx.fill(); glow(ctx, lx, ly + 20, 160 * 3 / z, '#ffd9a0', .22); }
    { const a = R.p(-.06, 2.6, 3.8), b = R.p(.06, 2.6, 6.6), a1 = R.p(-.06, 2.6, 6.6), b1 = R.p(.06, 2.6, 3.8); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; for (const z of [4, 6.4]) { const p0 = R.p(0, 3.3, z), p1 = R.p(0, 2.61, z); ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); }
      ctx.fillStyle = '#16161a'; poly(ctx, [a, b1, b, a1]); ctx.fill(); ctx.strokeStyle = '#ffe6b8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(...R.p(0, 2.59, 3.8)); ctx.lineTo(...R.p(0, 2.59, 6.6)); ctx.stroke(); glow(ctx, ...R.p(0, 2.4, 5.2), 380, '#ffdca8', .18); }
    // window light pool on the floor
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(40px)'; ctx.fillStyle = 'rgba(90,110,170,.18)'; poly(ctx, [R.p(-5, 0, 7.9), R.p(5, 0, 7.9), R.p(5, 0, 5.5), R.p(-5, 0, 5.5)]); ctx.fill(); ctx.restore();
    // long table
    const T = { x0: -1.0, x1: 1.0, z0: 3.3, z1: 7.0, h: .76 };
    { const [cx, cy] = R.p(0, 0, 7.45); PR.officeChair(ctx, r, cx, cy, R.s(7.45), { col: '#1b1d22' }); }
    for (const z of [T.z0 + .4, T.z1 - .4]) for (const x of [-.6, .6]) R.box(x - .06, 0, z, .12, T.h - .05, .12, '#1a120c', { density: 30, shadow: false });
    { const top = [R.p(T.x0, T.h, T.z0), R.p(T.x1, T.h, T.z0), R.p(T.x1, T.h, T.z1), R.p(T.x0, T.h, T.z1)]; const c = ctx; M.contactShadow(c, (top[0][0] + top[1][0]) / 2, R.p(0, 0, 4)[1], 700, 120, .45);
      paintRegion(c, r, top, '#4a2c1c', { density: 60, len: [40, 120], w: [2, 5], ang: -1.2, angJ: .1, al: .3, topLight: -.2, botDark: .1 });
      c.save(); poly(c, top); c.clip(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, top[3][1], 0, top[0][1]); g.addColorStop(0, 'rgba(140,160,220,.35)'); g.addColorStop(.5, 'rgba(255,220,170,.08)'); g.addColorStop(1, 'rgba(255,220,170,.0)'); c.fillStyle = g; c.fillRect(0, top[3][1], W, top[0][1] - top[3][1]);
      c.fillStyle = 'rgba(255,230,190,.35)'; poly(c, [R.p(-.05, T.h, 3.8), R.p(.05, T.h, 3.8), R.p(.05, T.h, 6.6), R.p(-.05, T.h, 6.6)]); c.fill(); c.restore();
      const f = [R.p(T.x0, T.h, T.z0), R.p(T.x1, T.h, T.z0), R.p(T.x1, T.h - .07, T.z0), R.p(T.x0, T.h - .07, T.z0)]; c.fillStyle = '#26170e'; poly(c, f); c.fill(); c.strokeStyle = 'rgba(255,210,160,.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(...f[0]); c.lineTo(...f[1]); c.stroke();
      const sideL = [R.p(T.x0, T.h, T.z0), R.p(T.x0, T.h, T.z1), R.p(T.x0, T.h - .07, T.z1), R.p(T.x0, T.h - .07, T.z0)], sideR = [R.p(T.x1, T.h, T.z0), R.p(T.x1, T.h, T.z1), R.p(T.x1, T.h - .07, T.z1), R.p(T.x1, T.h - .07, T.z0)]; c.fillStyle = '#1f130b'; poly(c, sideL); c.fill(); poly(c, sideR); c.fill(); }
    // table items: notepads, glasses, closed laptops, carafe
    for (let z = 3.7; z < 6.8; z += .8) for (const sx of [-1, 1]) { const x = sx * .68; const [px, py] = R.p(x, T.h, z), s = R.s(z);
      c2pad(ctx, px - sx * .05 * s, py, s); const [gx, gy] = R.p(x - sx * .3, T.h, z - .2); glass(ctx, gx, gy, R.s(z - .2)); if (r() < .5) { const [lx, ly] = R.p(x + sx * .05, T.h, z + .25); laptop(ctx, lx, ly, R.s(z + .25)); } }
    { const [cx, cy] = R.p(0, T.h, 4.6); carafe(ctx, cx, cy, R.s(4.6)); const [ox, oy] = R.p(0, T.h, 6.2); PR.plant(ctx, r, ox, oy, R.s(6.2), { h: .25 }); }
    // chairs, far to near
    const chairs = []; for (let z = 3.8; z < 6.9; z += .8) for (const sx of [-1, 1]) chairs.push([sx * 1.42, z]);
    chairs.sort((a, b) => b[1] - a[1]).forEach(([x, z]) => { const [cx, cy] = R.p(x, 0, z); PR.officeChair(ctx, r, cx, cy, R.s(z), { col: '#1b1d22' }); });
    function c2pad(c, x, y, s) { c.fillStyle = '#efe9da'; poly(c, [[x - .1 * s, y], [x + .1 * s, y], [x + .09 * s, y - .025 * s], [x - .09 * s, y - .025 * s]]); c.fill(); c.strokeStyle = '#222'; c.lineWidth = Math.max(1, s * .006); c.beginPath(); c.moveTo(x + .05 * s, y - .005 * s); c.lineTo(x + .1 * s, y - .02 * s); c.stroke(); }
    function glass(c, x, y, s) { c.fillStyle = 'rgba(200,220,240,.35)'; c.fillRect(x - .03 * s, y - .1 * s, .06 * s, .1 * s); c.strokeStyle = 'rgba(230,240,255,.7)'; c.lineWidth = Math.max(1, s * .004); c.strokeRect(x - .03 * s, y - .1 * s, .06 * s, .1 * s); c.fillStyle = 'rgba(160,200,240,.3)'; c.fillRect(x - .03 * s, y - .06 * s, .06 * s, .06 * s); }
    function laptop(c, x, y, s) { c.fillStyle = '#9aa0a8'; poly(c, [[x - .17 * s, y], [x + .17 * s, y], [x + .15 * s, y - .03 * s], [x - .15 * s, y - .03 * s]]); c.fill(); c.fillStyle = '#c8ccd2'; c.fillRect(x - .17 * s, y - .006 * s, .34 * s, .006 * s); }
    function carafe(c, x, y, s) { c.fillStyle = 'rgba(190,215,240,.4)'; c.beginPath(); c.moveTo(x - .06 * s, y); c.quadraticCurveTo(x - .09 * s, y - .12 * s, x - .03 * s, y - .2 * s); c.lineTo(x - .03 * s, y - .26 * s); c.lineTo(x + .03 * s, y - .26 * s); c.lineTo(x + .03 * s, y - .2 * s); c.quadraticCurveTo(x + .09 * s, y - .12 * s, x + .06 * s, y); c.fill(); c.strokeStyle = 'rgba(240,250,255,.75)'; c.lineWidth = Math.max(1, s * .004); c.stroke(); }
    ENV.impasto(ctx, r, W, H, { n: 110000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig: .42 });
    ENV.boardroomTable = { R, T };
  };

  // ---------- parchment world map on a desk (flat, top-down) ----------
  F.mapProj = { x0: 160, y0: 272, k: 6.2222, lon0: -170, lat0: 84 };
  F.mapXY = (lon, lat, pr = F.mapProj) => { if (lon < pr.lon0) lon += 360; return [pr.x0 + (lon - pr.lon0) * pr.k, pr.y0 + (pr.lat0 - lat) * pr.k]; };
  F.countryPath = (c, name, pr = F.mapProj) => { const rings = (G.WORLD || {})[name] || []; c.beginPath(); for (const R0 of rings) { let wrap = 0; for (let i = 0; i < R0.length; i += 2) if (R0[i] < pr.lon0) wrap++; const shift = wrap > R0.length / 4; for (let i = 0; i < R0.length; i += 2) { let lon = R0[i]; if (shift && lon < pr.lon0 + 20) lon += 360; const x = pr.x0 + (lon - pr.lon0) * pr.k, y = pr.y0 + (pr.lat0 - R0[i + 1]) * pr.k; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); } };
  ENV.worldMap = (ctx, r, W, H, o = {}) => { const c = ctx;
    // dark walnut desk
    paintRegion(c, r, [[0, 0], [W, 0], [W, H], [0, H]], '#3b2416', { density: 300, len: [80, 260], w: [3, 9], ang: .05, angJ: .03, al: .35, topLight: .05, botDark: -.15, var: 12 });
    for (let i = 0; i < 160; i++) { const y = r() * H; c.strokeStyle = `rgba(${r() < .5 ? '20,10,4' : '120,70,40'},.18)`; c.lineWidth = r.range(1, 4); c.beginPath(); c.moveTo(0, y); for (let x = 0; x <= W; x += 80) c.lineTo(x, y + Math.sin(x * .004 + i) * 10 + r.gauss() * 2); c.stroke(); }
    // parchment sheet with shadow and torn-ish edge
    const px0 = 110, py0 = 200, px1 = W - 110, py1 = H - 150; const edge = []; for (let x = px0; x <= px1; x += 30) edge.push([x, py0 + r.gauss() * 3]); for (let y = py0; y <= py1; y += 30) edge.push([px1 + r.gauss() * 3, y]); for (let x = px1; x >= px0; x -= 30) edge.push([x, py1 + r.gauss() * 3]); for (let y = py1; y >= py0; y -= 30) edge.push([px0 + r.gauss() * 3, y]);
    c.save(); c.filter = 'blur(18px)'; c.fillStyle = 'rgba(0,0,0,.55)'; c.translate(14, 22); poly(c, edge); c.fill(); c.restore();
    paintRegion(c, r, edge, '#e3cfa2', { density: 200, len: [30, 100], w: [6, 16], ang: 0, angJ: .6, al: .25, topLight: .06, botDark: -.08, var: 14 });
    c.save(); poly(c, edge); c.clip();
    for (let i = 0; i < 40; i++) { const x = r.range(px0, px1), y = r.range(py0, py1), rad = r.range(40, 220), g = c.createRadialGradient(x, y, rad * .2, x, y, rad); g.addColorStop(0, 'rgba(150,100,40,.0)'); g.addColorStop(.85, `rgba(150,100,40,${r.range(.04, .12)})`); g.addColorStop(1, 'rgba(150,100,40,0)'); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
    const vg = c.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1400); vg.addColorStop(0, 'rgba(120,70,20,0)'); vg.addColorStop(1, 'rgba(120,70,20,.35)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
    // ocean wave hatching + graticule
    const pr = F.mapProj; c.strokeStyle = 'rgba(110,80,50,.28)'; c.lineWidth = 1.2; for (let lon = -150; lon <= 180; lon += 30) { const [x] = F.mapXY(lon, 0); c.beginPath(); c.moveTo(x, pr.y0); c.lineTo(x, pr.y0 + 144 * pr.k); c.stroke(); } for (let lat = -60; lat <= 80; lat += 20) { const [, y] = F.mapXY(0, lat); c.beginPath(); c.moveTo(pr.x0, y); c.lineTo(pr.x0 + 360 * pr.k, y); c.stroke(); }
    c.strokeStyle = 'rgba(70,110,130,.18)'; c.lineWidth = 1.4; for (let i = 0; i < 700; i++) { const x = r.range(px0, px1), y = r.range(py0, py1); c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 7, y - 5, x + 14, y); c.quadraticCurveTo(x + 21, y + 5, x + 28, y); c.stroke(); }
    // land: wash + ink outline + inner hatching
    const names = Object.keys(G.WORLD || {}); c.lineJoin = 'round';
    for (const n of names) { F.countryPath(c, n); c.fillStyle = rgb(jitter('#c9ab72', r, 14), .95); c.fill(); }
    // relief texture on land
    c.save(); c.beginPath(); for (const n of names) { const rings = G.WORLD[n]; } names.forEach(n => { F.countryPath(c, n); c.save(); c.clip(); for (let i = 0; i < 25; i++) { } c.restore(); }); c.restore();
    { const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const t = tmp.getContext('2d'); t.fillStyle = '#000'; names.forEach(n => { F.countryPath(t, n); t.fill(); }); t.globalCompositeOperation = 'source-in'; for (let i = 0; i < 9000; i++) { const x = r() * W, y = r() * H; t.strokeStyle = `rgba(${r() < .5 ? '110,80,40' : '150,120,60'},${r.range(.15, .4)})`; t.lineWidth = r.range(1, 2.5); t.beginPath(); t.moveTo(x, y); t.lineTo(x + r.range(4, 12), y + r.range(-3, 3)); t.stroke(); } c.globalAlpha = .9; c.drawImage(tmp, 0, 0); c.globalAlpha = 1; }
    // mountain marks (Himalaya, Andes, Rockies, Alps)
    for (const [lon, lat, n] of [[85, 29, 7], [-70, -20, 8], [-112, 45, 7], [10, 46, 3], [42, 42, 3]]) for (let i = 0; i < n; i++) { const [x, y] = F.mapXY(lon + (i - n / 2) * 3 + r.gauss(), lat + r.gauss() * 2); c.strokeStyle = 'rgba(80,50,20,.6)'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(x - 9, y + 6); c.lineTo(x, y - 8); c.lineTo(x + 9, y + 6); c.stroke(); c.fillStyle = 'rgba(80,50,20,.25)'; poly(c, [[x, y - 8], [x + 9, y + 6], [x + 2, y + 6]]); c.fill(); }
    names.forEach(n => { F.countryPath(c, n); c.strokeStyle = 'rgba(70,45,20,.75)'; c.lineWidth = 1.6; c.stroke(); });
    // coastline ripple (offset outline)
    c.save(); c.strokeStyle = 'rgba(70,100,120,.25)'; c.lineWidth = 6; c.globalCompositeOperation = 'multiply'; names.forEach(n => { F.countryPath(c, n); c.stroke(); }); c.restore();
    // compass rose (south Atlantic) + cartouche
    { const [x, y] = F.mapXY(-20, -42); c.save(); c.translate(x, y); for (let k = 0; k < 8; k++) { c.rotate(Math.PI / 4); const L = k % 2 ? 50 : 95; c.fillStyle = k % 2 ? 'rgba(90,60,30,.55)' : 'rgba(150,40,30,.7)'; poly(c, [[0, -L], [10, 0], [0, 0]]); c.fill(); c.fillStyle = 'rgba(240,225,190,.8)'; poly(c, [[0, -L], [-10, 0], [0, 0]]); c.fill(); } c.strokeStyle = 'rgba(80,50,20,.7)'; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.stroke(); c.beginPath(); c.arc(0, 0, 66, 0, 7); c.stroke(); c.fillStyle = 'rgba(80,50,20,.8)'; c.font = 'bold 26px Georgia, serif'; c.textAlign = 'center'; c.fillText('N', 0, -104); c.restore(); }
    { const [x, y] = F.mapXY(-150, -40); c.strokeStyle = 'rgba(80,50,20,.7)'; c.lineWidth = 3; c.strokeRect(x, y - 60, 300, 110); c.lineWidth = 1; c.strokeRect(x + 8, y - 52, 284, 94); c.fillStyle = 'rgba(80,50,20,.85)'; c.font = 'italic 34px Georgia, serif'; c.textAlign = 'center'; c.fillText('Orbis Terrarum', x + 150, y - 2); c.font = '20px Georgia, serif'; c.fillText('MMXXVI', x + 150, y + 28); }
    // border band
    c.strokeStyle = 'rgba(80,50,20,.7)'; c.lineWidth = 4; c.strokeRect(px0 + 26, py0 + 26, px1 - px0 - 52, py1 - py0 - 52); c.lineWidth = 1.5; c.strokeRect(px0 + 36, py0 + 36, px1 - px0 - 72, py1 - py0 - 72);
    c.restore();
    // desk props: brass compass (divider), magnifier, pins tin
    { const x = W - 300, y = H - 120; c.strokeStyle = '#c99a48'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y - 160); c.lineTo(x - 80, y + 60); c.moveTo(x, y - 160); c.lineTo(x + 70, y + 70); c.stroke(); c.fillStyle = '#e8c070'; c.beginPath(); c.arc(x, y - 160, 16, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,240,200,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 3, y - 150); c.lineTo(x - 78, y + 55); c.stroke(); }
    { const x = 250, y = H - 90; c.save(); c.translate(x, y); c.rotate(-.5); c.fillStyle = '#2a1a10'; c.fillRect(-20, 60, 40, 200); c.strokeStyle = '#b8873a'; c.lineWidth = 14; c.beginPath(); c.arc(0, 0, 110, 0, 7); c.stroke(); c.fillStyle = 'rgba(200,220,240,.18)'; c.beginPath(); c.arc(0, 0, 104, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 80, 3.6, 4.4); c.stroke(); c.restore(); }
    for (const [lon, lat, col] of [[-74, 40.7, '#b8302a'], [-0.1, 51.5, '#2a5a9a'], [139.7, 35.7, '#b8302a']]) { const [x, y] = F.mapXY(lon, lat); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(x + 8, y + 10, 9, 5, 0, 0, 7); c.fill(); c.fillStyle = col; c.beginPath(); c.arc(x, y - 4, 9, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(x - 3, y - 7, 3, 0, 7); c.fill(); }
    // lamp light from upper left
    glow(c, W * .3, H * .2, 1500, '#ffd9a0', .18); const sh = c.createLinearGradient(0, 0, W, H); sh.addColorStop(0, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(10,5,0,.35)'); c.fillStyle = sh; c.fillRect(0, 0, W, H);
    ENV.impasto(ctx, r, W, H, { n: 70000, edge: 30 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 8, grain: 7, vig: .45 }); };

  // ---------- courthouse exterior with two podiums ----------
  ENV.courthouse = (ctx, r, W, H, o = {}) => { const c = ctx, gy = H * .74;
    M.sky(c, r, W, gy, '#7fa6cf', '#dfe6ea', { strokes: 2400 }); M.clouds && M.clouds(c, r, W, H * .45);
    // background trees + city
    F.layer(c, r, -40, W + 40, gy - 120, H * .1, H * .25, '#8d9cae', { lit: 0, windows: false, density: 1200 });
    const bx0 = W * .38, bx1 = W * 1.02, top = H * .2, cx = (bx0 + bx1) / 2, bw = bx1 - bx0;
    // wings
    for (const [x0, x1] of [[bx0 - 60, bx0 + bw * .16], [bx1 - bw * .16, bx1 + 60]]) { paintRegion(c, r, [[x0, top + 150], [x1, top + 150], [x1, gy - 110], [x0, gy - 110]], '#d8d0c0', { density: 300, len: [20, 60], w: [3, 8], ang: 0, al: .3 }); for (let j = 0; j < 3; j++) for (let x = x0 + 30; x < x1 - 50; x += 80) { c.fillStyle = '#4a5260'; c.fillRect(x, top + 200 + j * 120, 40, 75); c.fillStyle = '#e8e0d0'; c.fillRect(x - 6, top + 195 + j * 120 + 75, 52, 8); c.fillStyle = 'rgba(200,220,240,.25)'; c.fillRect(x + 2, top + 202 + j * 120, 14, 70); } for (let y = top + 170; y < gy - 110; y += 22) { c.strokeStyle = 'rgba(120,110,90,.18)'; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); } }
    // central block wall behind columns (shadowed portico)
    const px0 = bx0 + bw * .16, px1 = bx1 - bw * .16, ptop = top + 140, pbot = gy - 110;
    paintRegion(c, r, [[px0, ptop], [px1, ptop], [px1, pbot], [px0, pbot]], '#9c9486', { density: 300, ang: -Math.PI / 2, al: .3 });
    // bronze doors
    for (const dx of [-.25, 0, .25]) { const dw = 90, dh = 210, x = cx + dx * (px1 - px0) - dw / 2, y = pbot - dh; c.fillStyle = '#5a4026'; c.fillRect(x, y, dw, dh); c.strokeStyle = '#a07a40'; c.lineWidth = 3; for (let k = 0; k < 4; k++) c.strokeRect(x + 8 + (k % 2) * 41, y + 10 + (k >> 1) * 98, 33, 88); c.fillStyle = '#d8b060'; c.beginPath(); c.arc(x + dw / 2 + 6, y + dh * .55, 4, 0, 7); c.fill(); }
    // columns
    const n = 8; for (let i = 0; i < n; i++) { const x = px0 + 40 + (px1 - px0 - 80) * i / (n - 1), w = 62; c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x + w / 2, ptop + 50, 30, pbot - ptop - 50);
      const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#b8b0a0'); g.addColorStop(.35, '#f2ece0'); g.addColorStop(1, '#9a9282'); c.fillStyle = g; c.fillRect(x - w / 2, ptop + 40, w, pbot - ptop - 60);
      c.strokeStyle = 'rgba(90,80,60,.35)'; c.lineWidth = 2; for (let k = 1; k < 6; k++) { const fx = x - w / 2 + w * k / 6; c.beginPath(); c.moveTo(fx, ptop + 46); c.lineTo(fx, pbot - 26); c.stroke(); }
      c.fillStyle = '#e8e0d0'; c.fillRect(x - w * .7, ptop + 22, w * 1.4, 22); c.fillStyle = '#cfc6b4'; c.beginPath(); c.ellipse(x - w * .45, ptop + 46, 12, 9, 0, 0, 7); c.ellipse(x + w * .45, ptop + 46, 12, 9, 0, 0, 7); c.fill(); c.fillStyle = '#ddd5c4'; c.fillRect(x - w * .65, pbot - 26, w * 1.3, 26); }
    // entablature, frieze, pediment
    c.fillStyle = '#e6decd'; c.fillRect(px0 - 30, ptop - 30, px1 - px0 + 60, 60); c.fillStyle = '#cfc6b2'; c.fillRect(px0 - 30, ptop + 20, px1 - px0 + 60, 8);
    c.fillStyle = 'rgba(80,70,50,.55)'; c.font = '600 30px Georgia, serif'; c.textAlign = 'center'; c.letterSpacing = '10px'; c.fillText('UNITED STATES COURTHOUSE', cx, ptop + 10); c.letterSpacing = '0px';
    const pd = [[px0 - 50, ptop - 30], [cx, ptop - 190], [px1 + 50, ptop - 30]]; paintRegion(c, r, pd, '#ebe4d4', { density: 200, al: .3 }); c.strokeStyle = '#c4baa6'; c.lineWidth = 10; poly(c, pd); c.stroke();
    const ip = [[px0 + 10, ptop - 42], [cx, ptop - 168], [px1 - 10, ptop - 42]]; c.fillStyle = '#d4ccba'; poly(c, ip); c.fill();
    // relief figures in tympanum (simple carved silhouettes)
    for (let k = -4; k <= 4; k++) { const x = cx + k * 70, hgt = 110 - Math.abs(k) * 22; if (hgt < 30) continue; c.fillStyle = 'rgba(150,140,120,.6)'; c.beginPath(); c.ellipse(x, ptop - 50 - hgt + 14, 10, 12, 0, 0, 7); c.fill(); c.fillRect(x - 12, ptop - 50 - hgt + 26, 24, hgt - 30); c.fillStyle = 'rgba(255,250,240,.4)'; c.fillRect(x - 12, ptop - 50 - hgt + 26, 6, hgt - 30); }
    // steps
    for (let k = 0; k < 9; k++) { const y = pbot + k * 12.5, ext = k * 14; c.fillStyle = k % 2 ? '#d6cebd' : '#e4dccb'; c.fillRect(px0 - 80 - ext, y, px1 - px0 + 160 + ext * 2, 12.5); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(px0 - 80 - ext, y + 10, px1 - px0 + 160 + ext * 2, 2.5); }
    // plaza paving
    paintRegion(c, r, [[0, gy], [W, gy], [W, H], [0, H]], '#b9b1a2', { density: 300, len: [40, 120], w: [4, 10], ang: 0, angJ: .05, al: .3, topLight: .05, botDark: -.15 });
    for (let y = gy + 14; y < H; y += 14 + (y - gy) * .12) { c.strokeStyle = 'rgba(90,80,60,.25)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } for (let k = -30; k <= 30; k++) { c.beginPath(); c.moveTo(W / 2 + k * 60, gy); c.lineTo(W / 2 + k * 230, H); c.stroke(); }
    c.fillStyle = '#c8c0b0'; c.fillRect(0, gy - 110 + 112, W, 0); c.fillStyle = '#a9a192'; c.fillRect(0, gy - 4, W, 8);
    // trees on the left
    for (const [x, s] of [[W * .06, 1.2], [W * .2, 1]]) { c.fillStyle = '#4a3a2a'; c.fillRect(x - 12 * s, gy - 260 * s, 24 * s, 270 * s); M.bush(c, r, x, gy - 220 * s, 360 * s, 300 * s, '#4c6e3a', '#86a85a'); }
    // flagpoles
    for (const x of [px0 - 170, px1 + 170]) { c.strokeStyle = '#d0d0d0'; c.lineWidth = 6; c.beginPath(); c.moveTo(x, gy + 10); c.lineTo(x, top - 40); c.stroke(); c.fillStyle = '#e8c060'; c.beginPath(); c.arc(x, top - 44, 8, 0, 7); c.fill(); for (let k = 0; k < 7; k++) { c.fillStyle = k % 2 ? '#f2eee6' : '#b8302a'; c.beginPath(); c.moveTo(x, top - 30 + k * 14); for (let t = 0; t <= 1.01; t += .1) c.lineTo(x + t * 180, top - 30 + k * 14 + Math.sin(t * 6) * 8); for (let t = 1; t >= -.01; t -= .1) c.lineTo(x + t * 180, top - 16 + k * 14 + Math.sin(t * 6) * 8); c.fill(); } c.fillStyle = '#2a3e74'; c.beginPath(); c.moveTo(x, top - 30); for (let t = 0; t <= .45; t += .05) c.lineTo(x + t * 180, top - 30 + Math.sin(t * 6) * 8); for (let t = .45; t >= 0; t -= .05) c.lineTo(x + t * 180, top + 26 + Math.sin(t * 6) * 8); c.fill(); }
    // lamp posts
    for (const x of [W * .3, W * .62, W * .94]) { c.fillStyle = '#23262a'; c.fillRect(x - 6, gy - 240, 12, 250); c.fillRect(x - 16, gy - 10, 32, 14); c.fillStyle = '#f0ead8'; c.beginPath(); c.arc(x, gy - 254, 22, 0, 7); c.fill(); c.strokeStyle = '#23262a'; c.lineWidth = 3; c.stroke(); }
    // podiums (wood with blank seal) + mics, at o.pods
    for (const px of o.pods || [W * .14, W * .34]) { const y = H * .98, w = 220, h = 300; M.contactShadow(c, px, y, w * .7, 30, .4); paintRegion(c, r, [[px - w / 2, y - h], [px + w / 2, y - h], [px + w / 2 - 14, y], [px - w / 2 + 14, y]], '#6a4426', { density: 120, ang: -Math.PI / 2, al: .35 }); c.fillStyle = '#4a2e18'; c.fillRect(px - w / 2 - 12, y - h - 20, w + 24, 24);
      c.fillStyle = '#d8b860'; c.beginPath(); c.arc(px, y - h * .58, 56, 0, 7); c.fill(); c.fillStyle = '#2a3e74'; c.beginPath(); c.arc(px, y - h * .58, 46, 0, 7); c.fill(); c.strokeStyle = '#d8b860'; c.lineWidth = 3; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; c.beginPath(); c.moveTo(px + Math.cos(a) * 20, y - h * .58 + Math.sin(a) * 20); c.lineTo(px + Math.cos(a) * 38, y - h * .58 + Math.sin(a) * 38); c.stroke(); }
      for (const d of [-30, 30]) { c.strokeStyle = '#1a1a1a'; c.lineWidth = 5; c.beginPath(); c.moveTo(px + d * .3, y - h - 20); c.quadraticCurveTo(px + d, y - h - 60, px + d * 1.4, y - h - 90); c.stroke(); c.fillStyle = '#2a2a2a'; c.beginPath(); c.ellipse(px + d * 1.4, y - h - 98, 10, 16, d > 0 ? .5 : -.5, 0, 7); c.fill(); } }
    // pigeons
    for (let i = 0; i < 9; i++) { const x = r.range(W * .42, W * .95), y = gy + r.range(10, 160); c.fillStyle = '#5a5e66'; c.beginPath(); c.ellipse(x, y, 12, 7, 0, 0, 7); c.fill(); c.beginPath(); c.arc(x + (i % 2 ? 10 : -10), y - 6, 5, 0, 7); c.fill(); }
    ENV.impasto(ctx, r, W, H, { n: 110000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .32 }); };

  // ---------- 1986 trading floor ----------
  F.crt = (c, r, x, y, s, o = {}) => { const w = .42 * s, h = .36 * s; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, y, w * .6, .03 * s, 0, 0, 7); c.fill();
    c.fillStyle = '#b8ae98'; poly(c, [[x - w * .42, y - h], [x + w * .42, y - h], [x + w * .36, y - h - .06 * s], [x - w * .36, y - h - .06 * s]]); c.fill();
    const g = c.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, '#cfc5ae'); g.addColorStop(1, '#a89e88'); c.fillStyle = g; c.fillRect(x - w / 2, y - h, w, h); c.fillStyle = '#9a907a'; c.fillRect(x - w / 2, y - .05 * s, w, .05 * s);
    const sx = x - w * .4, sy = y - h * .9, sw = w * .8, sh = h * .66; c.fillStyle = '#1a1e18'; c.fillRect(sx - 3, sy - 3, sw + 6, sh + 6); const sg = c.createRadialGradient(x, sy + sh / 2, 0, x, sy + sh / 2, sw * .7); sg.addColorStop(0, o.scr || '#123a1c'); sg.addColorStop(1, '#06140a'); c.fillStyle = sg; c.fillRect(sx, sy, sw, sh);
    if (o.text !== false) { const rows = Math.max(3, Math.round(sh / Math.max(3, s * .02))); for (let j = 0; j < rows; j++) { let xx = sx + sw * .06; while (xx < sx + sw * .9) { const tw = r.range(.03, .12) * sw; if (r() < .8) { c.fillStyle = rgb(jitter(o.txt || '#58f07a', r, 20), .75); c.fillRect(xx, sy + sh * .08 + j * sh * .84 / rows, tw, Math.max(1, sh * .5 / rows)); } xx += tw + sw * .03; } } }
    c.fillStyle = 'rgba(0,0,0,.18)'; for (let yy = sy; yy < sy + sh; yy += 3) c.fillRect(sx, yy, sw, 1); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(sx + sw * .05, sy + sh * .05, sw * .3, sh * .2);
    if (o.glow !== false) glow(c, x, sy + sh / 2, sw * 1.2, '#60ff90', .1); return [sx, sy, sw, sh]; };
  F.phone = (c, x, y, s) => { c.fillStyle = '#2a2420'; c.beginPath(); c.moveTo(x - .09 * s, y); c.lineTo(x + .09 * s, y); c.lineTo(x + .07 * s, y - .06 * s); c.lineTo(x - .07 * s, y - .06 * s); c.fill(); c.fillStyle = '#3a322c'; c.beginPath(); c.ellipse(x, y - .075 * s, .1 * s, .022 * s, 0, 0, 7); c.fill(); c.fillStyle = '#e8dcc0'; for (let i = 0; i < 6; i++) c.fillRect(x - .05 * s + (i % 3) * .035 * s, y - .045 * s + (i / 3 | 0) * .018 * s, .02 * s, .01 * s); };
  ENV.trading = (ctx, r, W, H, o = {}) => {
    const R = new Room(ctx, r, W, H, { RW: 16, RH: 3.4, ch: 1.6, zf: 14, f: 1650, hor: .42 });
    R.shell({ back: '#4a4640', side: '#55504a', ceil: '#d8d4c8', floor: '#5a5650', planks: false, skirting: '#3a3632' });
    // ceiling fluorescent grid
    for (let z = 2.2; z < 14; z += 1.2) for (let x = -7; x <= 7; x += 2.4) { const a = R.p(x - .3, 3.4, z), b = R.p(x + .3, 3.4, z + .6); const a2 = R.p(x + .3, 3.4, z), b2 = R.p(x - .3, 3.4, z + .6); const xs = [a[0], b[0], a2[0], b2[0]], X0 = Math.min(...xs), pw = Math.max(...xs) - X0, ph = Math.abs(b[1] - a[1]); if (ph < 1 || pw < 1) continue; c3panel(X0, Math.min(a[1], b[1]), pw, ph); }
    function c3panel(x, y, w, h) { ctx.fillStyle = '#fbfaf0'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(120,120,110,.6)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h); glow(ctx, x + w / 2, y + h, w * 1.1, '#fff8e0', .12); }
    // back wall: ticker board + world clocks
    { const [X, Y, w, h] = R.backRect(-6.5, 2.1, 6.5, 3.1); ctx.fillStyle = '#0c0b0a'; ctx.fillRect(X - 8, Y - 8, w + 16, h + 16); ctx.fillStyle = '#16120e'; ctx.fillRect(X, Y, w, h);
      for (let row = 0; row < 2; row++) { let xx = X + 10; const sy = Y + 8 + row * h / 2; const syms = ['IBM 123¼ ▲', 'GM 81⅜ ▼', 'XON 49½ ▲', 'GE 72⅞ ▲', 'AT&T 25¼ ▼', 'KO 38¾ ▲', 'MRK 54 ▼', 'DOW 1895.95']; let k = row * 3; ctx.font = `bold ${h * .32}px "Courier New", monospace`; ctx.textBaseline = 'top';
        while (xx < X + w - 40) { const t = syms[k++ % syms.length]; ctx.fillStyle = t.includes('▼') ? '#ff5a3a' : '#ffb030'; ctx.fillText(t, xx, sy); xx += ctx.measureText(t).width + 50; } }
      ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let yy = Y; yy < Y + h; yy += 3) ctx.fillRect(X, yy, w, 1.2); glow(ctx, X + w / 2, Y + h / 2, w * .5, '#ff9a30', .12);
      const cl = ['NEW YORK', 'LONDON', 'TOKYO']; cl.forEach((n, i) => { const [cx, cy] = R.p(-3 + i * 3, 1.7, R.zf - .01); PR.clock(ctx, r, cx, cy, R.s(R.zf), { h: [10, 3, 0][i], m: 15, r: .2 }); ctx.fillStyle = '#e8e0cc'; ctx.font = `bold ${R.s(R.zf) * .09}px Arial`; ctx.textAlign = 'center'; ctx.fillText(n, cx, cy + R.s(R.zf) * .32); ctx.textAlign = 'left'; }); }
    // side walls: quote boards (green) on left, windows w/ blinds on right
    for (let z = 3; z < 13; z += 2.5) R.onSide(-8, 2.9, z, (c, s) => { c.fillStyle = '#0f1a12'; c.fillRect(0, 0, 2 * s, 1 * s); for (let j = 0; j < 8; j++) for (let i = 0; i < 4; i++) { c.fillStyle = rgb(jitter(r() < .3 ? '#ff6a4a' : '#6af08a', r, 20), .8); c.fillRect(.08 * s + i * .48 * s, .08 * s + j * .11 * s, r.range(.2, .38) * s, .05 * s); } });
    for (let z = 3; z < 13; z += 2.5) R.onSide(8, 2.8, z, (c, s) => { c.fillStyle = '#c8c4b4'; c.fillRect(0, 0, 1.8 * s, 1.4 * s); for (let j = 0; j < 30; j++) { c.fillStyle = j % 2 ? '#e8e4d4' : '#b0ac9c'; c.fillRect(0, j * 1.4 * s / 30, 1.8 * s, 1.4 * s / 60); } });
    // paper slips on floor
    for (let i = 0; i < 700; i++) { const x = r.range(-7.8, 7.8), z = r.range(1.6, 13.5), [px, py] = R.p(x, 0, z), s = R.s(z); ctx.save(); ctx.translate(px, py); ctx.rotate(r.range(-1, 1)); ctx.fillStyle = rgb(jitter(r() < .2 ? '#f0d890' : '#f2efe6', r, 12), .9); ctx.fillRect(-.05 * s, -.015 * s, .1 * s, .03 * s); ctx.restore(); }
    // desk rows, far to near, with CRTs, phones, papers, traders' clutter
    for (let z = 12.5; z >= 3.5; z -= 1.8) { const d = .8; R.box(-7.4, 0, z, 6.2, .76, d, '#7a6a58', { density: 40 }); R.box(1.2, 0, z, 6.2, .76, d, '#7a6a58', { density: 40 });
      for (const [x0, x1] of [[-7.2, -1.4], [1.4, 7.2]]) for (let x = x0 + .4; x < x1; x += 1.05) { const [cx, cy] = R.p(x, .76, z + .35), s = R.s(z + .35); F.crt(ctx, r, cx, cy, s, { glow: z < 9 }); const [phx, phy] = R.p(x + .4, .76, z + .15); F.phone(ctx, phx, phy, R.s(z + .15)); if (r() < .6) PR.papers(ctx, r, ...R.p(x - .35, .76, z + .1), R.s(z + .1), 3); if (r() < .3) PR.mug(ctx, r, ...R.p(x + .25, .76, z + .05), R.s(z + .05)); }
      if (z > 4) for (const x of [-6.6, -4.4, -2.2, 2.2, 4.4, 6.6]) { const [cx, cy] = R.p(x, 0, z - .4); PR.officeChair(ctx, r, cx, cy, R.s(z - .4), { col: '#3a2e28' }); } }
    // cigarette haze
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const x = r() * W, y = H * r.range(.2, .55), rad = r.range(200, 500), g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, 'rgba(200,190,170,.08)'); g.addColorStop(1, 'rgba(200,190,170,0)'); ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2); } ctx.restore();
    const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(60,80,40,.0)'); gr.addColorStop(1, 'rgba(30,40,20,.25)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    ENV.impasto(ctx, r, W, H, { n: 120000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 9, vig: .45 }); };
  // big foreground CRT for close-ups (sprite), screen box exported in ENV.fgCrtBox
  ENV.fgCrt = (ctx, r, W, H) => { const x = W * .62, y = H * 1.02, s = 2600; ctx.fillStyle = '#6a5a48'; ctx.fillRect(0, H * .93, W, H * .1); ctx.fillStyle = 'rgba(255,230,190,.15)'; ctx.fillRect(0, H * .93, W, 4); ENV.fgCrtBox = F.crt(ctx, r, x, y - H * .07, s, { text: false, glow: false }); { const kx = W * .62, ky = H * .935; ctx.fillStyle = '#c8bea8'; ctx.fillRect(kx - 330, ky - 34, 660, 40); ctx.fillStyle = '#9a907a'; for (let j = 0; j < 3; j++) for (let i = 0; i < 26; i++) ctx.fillRect(kx - 315 + i * 24.5, ky - 30 + j * 11, 20, 8); } ctx.fillStyle = '#7a705c'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(W * .62 + 380 - i * 40, H * .82, 9, 0, 7); ctx.fill(); } ctx.fillStyle = '#e8e0cc'; ctx.fillRect(W * .62 - 120, H * .835, 160, 22); ctx.fillStyle = '#3a3a3a'; ctx.font = 'bold 16px Arial'; ctx.fillText('QUOTRON', W * .62 - 108, H * .835 + 17); F.phone(ctx, W * .2, H * .99, 1500); PR.papers(ctx, r, W * .36, H * .97, 1700, 4); };
})(typeof window !== 'undefined' ? window : globalThis);
