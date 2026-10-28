// Detailed interiors built on ENV.Room (one-point perspective) + PR props.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, Room = ENV.Room, { hex, rgb, mix, jitter, shade, glow, poly, paintRegion, kuwahara } = P;
  const RP = Room.prototype;
  RP.s = function (z) { return this.f / z; };
  // draw in local pixel space on a side wall (xw = wall x). Local +x runs toward the back (+z), local +y is down.
  RP.onSide = function (xw, y, z, fn) { const c = this.ctx, [X, Y] = this.p(xw, y, z), s0 = this.f / z, a = (xw < 0 ? 1 : -1) * -xw / z * (xw < 0 ? 1 : 1), b = (y - this.ch) / z * (xw < 0 ? 1 : -1);
    c.save(); c.setTransform(Math.abs(xw) / z, xw < 0 ? (y - this.ch) / z : -(y - this.ch) / z, 0, 1, X, Y); if (xw > 0) c.transform(-1, 0, 0, 1, 0, 0); fn(c, s0); c.restore(); };
  // tiles on the back wall between heights y0..y1 (subway)
  RP.backTiles = function (x0, x1, y0, y1, tw, th, col, grout = '#bdb4a2') { const c = this.ctx, r = this.r, z = this.zf - .005, s = this.s(z);
    const [X0, Y0] = this.p(x0, y1, z), [X1, Y1] = this.p(x1, y0, z); c.fillStyle = grout; c.fillRect(X0, Y0, X1 - X0, Y1 - Y0); const rows = Math.round((y1 - y0) / th);
    for (let j = 0; j < rows; j++) { const off = j % 2 ? tw * s / 2 : 0; for (let X = X0 - off; X < X1; X += tw * s) { const x = Math.max(X0, X) + 1, w = Math.min(X1, X + tw * s) - x - 1, y = Y0 + j * th * s + 1, h = th * s - 2; if (w <= 1) continue;
      const tc = jitter(col, r, 6), g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, rgb(shade(tc, .18))); g.addColorStop(1, rgb(shade(tc, -.08))); c.fillStyle = g; c.fillRect(x, y, w, h); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x + 1, y + 1, w - 2, 1.2); } } };
  // checker / plank floor tiles in perspective
  RP.tileFloor = function (a, b, size, Z) { const c = this.ctx, r = this.r, { RW, zf } = this, L = -RW / 2; for (let z = zf; z > Z; z -= size) for (let x = L, i = 0; x < RW / 2; x += size, i++) { const k = (Math.round((zf - z) / size) + i) % 2, col = jitter(k ? a : b, r, 7);
      const pts = [this.p(x, 0, z - size), this.p(x + size, 0, z - size), this.p(x + size, 0, z), this.p(x, 0, z)]; c.fillStyle = rgb(col); poly(c, pts); c.fill(); c.strokeStyle = 'rgba(40,30,20,.25)'; c.lineWidth = 1.2; c.stroke(); }
    // painterly streaks and polish reflection
    const pts = [this.p(L, 0, Z), this.p(RW / 2, 0, Z), this.p(RW / 2, 0, zf), this.p(L, 0, zf)]; c.save(); poly(c, pts); c.clip(); for (let i = 0; i < 2600; i++) { const x = r.range(0, this.W), y = r.range(pts[2][1], this.H); P.stroke(c, r, x, y, r.range(20, 70), r.gauss() * .08, r.range(3, 8), shade(mix(a, b, .5), r.range(-.1, .15)), .06); } c.restore(); };
  // a wall window (back wall) with frame, sill, mullions and a painted view
  RP.backWindow = function (x0, x1, y0, y1, view, o = {}) { const c = this.ctx, r = this.r, z = this.zf - .005, [X, Y] = this.p(x0, y1, z), [X1, Y1] = this.p(x1, y0, z), w = X1 - X, h = Y1 - Y, s = this.s(z);
    c.fillStyle = 'rgba(30,20,10,.35)'; c.fillRect(X - .07 * s, Y - .07 * s, w + .14 * s, h + .14 * s); c.save(); c.beginPath(); c.rect(X, Y, w, h); c.clip(); view(c, r, X, Y, w, h); c.restore();
    const fc = o.frame || '#f2eee6'; c.fillStyle = fc; c.fillRect(X - .06 * s, Y - .06 * s, w + .12 * s, .06 * s); c.fillRect(X - .06 * s, Y, .06 * s, h); c.fillRect(X + w, Y, .06 * s, h); c.fillRect(X + w / 2 - .025 * s, Y, .05 * s, h); c.fillRect(X, Y + h * .45 - .02 * s, w, .04 * s);
    c.fillStyle = rgb(shade(fc, -.15)); c.fillRect(X - .1 * s, Y + h, w + .2 * s, .05 * s); c.fillStyle = rgb(shade(fc, -.4)); c.fillRect(X - .1 * s, Y + h + .05 * s, w + .2 * s, .015 * s);
    c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.07)'; poly(c, [[X, Y], [X + w * .3, Y], [X + w * .1, Y + h], [X, Y + h]]); c.fill(); c.restore(); return [X, Y, w, h, s]; };
  // Painterly pass: short bristle strokes coloured from the image itself, laid along edges (perpendicular to the luminance gradient).
  ENV.impasto = (ctx, r, W, H, o = {}) => { const img = ctx.getImageData(0, 0, W, H).data, n = o.n ?? 60000, lum = (x, y) => { const i = ((y | 0) * W + (x | 0)) * 4; return img[i] * .3 + img[i + 1] * .59 + img[i + 2] * .11; };
    ctx.save(); ctx.lineCap = 'round'; for (let k = 0; k < n; k++) { const x = 2 + r() * (W - 4), y = 2 + r() * (H - 4), i = ((y | 0) * W + (x | 0)) * 4; const gx = lum(x + 2, y) - lum(x - 2, y), gy = lum(x, y + 2) - lum(x, y - 2), mag = Math.hypot(gx, gy);
      if (o.mask && !o.mask(x, y)) continue; const edge = mag > (o.edge ?? 18); const a = edge ? Math.atan2(gy, gx) + Math.PI / 2 : (o.ang ?? 0) + r.gauss() * .6; const len = edge ? r.range(3, 8) : r.range(o.len?.[0] ?? 8, o.len?.[1] ?? 22), w = edge ? r.range(1, 2.2) : r.range(o.w?.[0] ?? 2, o.w?.[1] ?? 5);
      const ex = x + Math.cos(a) * len / 2, ey = y + Math.sin(a) * len / 2, sx = x - Math.cos(a) * len / 2, sy = y - Math.sin(a) * len / 2; if (ex < 0 || ey < 0 || ex >= W || ey >= H || sx < 0 || sy < 0 || sx >= W || sy >= H) continue; const l0 = lum(x, y); if (Math.abs(lum(ex, ey) - l0) > (o.tol ?? 10) || Math.abs(lum(sx, sy) - l0) > (o.tol ?? 10)) continue;
      const k2 = r.gauss() * (o.var ?? 7); ctx.strokeStyle = `rgba(${img[i] + k2 | 0},${img[i + 1] + k2 | 0},${img[i + 2] + k2 * .8 | 0},${edge ? (o.eal ?? .35) : (o.al ?? .45)})`; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * len / 2, y - Math.sin(a) * len / 2); ctx.quadraticCurveTo(x + r.gauss() * 2, y + r.gauss() * 2, x + Math.cos(a) * len / 2, y + Math.sin(a) * len / 2); ctx.stroke(); } ctx.restore(); };
  ENV.views = {
    morningGarden: (c, r, x, y, w, h) => { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#9cc3e0'); g.addColorStop(.6, '#e8e4cf'); g.addColorStop(1, '#f6e0b0'); c.fillStyle = g; c.fillRect(x, y, w, h); glow(c, x + w * .75, y + h * .55, w * .6, '#fff2c8', .55);
      for (let k = 0; k < 7; k++) { c.fillStyle = `rgba(255,255,255,${r.range(.2, .45)})`; c.beginPath(); c.ellipse(x + r() * w, y + r() * h * .35, w * r.range(.08, .2), h * .03, 0, 0, 7); c.fill(); }
      for (let k = 0; k < 6; k++) { const hx = x + k * w / 5 - w * .05, hh = h * r.range(.12, .22); c.fillStyle = rgb(jitter('#c9b8a4', r, 14)); c.fillRect(hx, y + h * .66 - hh, w * .14, hh); c.fillStyle = rgb(jitter('#8a5a4a', r, 10)); poly(c, [[hx - 4, y + h * .66 - hh], [hx + w * .07, y + h * .66 - hh - h * .07], [hx + w * .14 + 4, y + h * .66 - hh]]); c.fill(); c.fillStyle = 'rgba(255,240,200,.7)'; c.fillRect(hx + w * .03, y + h * .66 - hh * .7, w * .025, hh * .25); }
      for (let k = 0; k < 40; k++) { const tx = x + r() * w, ty = y + h * r.range(.58, .8), tr = w * r.range(.03, .08); c.fillStyle = rgb(jitter(r.pick(['#5a7a3a', '#6a8a42', '#4a6a34', '#7a9a4a']), r, 10), .9); c.beginPath(); c.arc(tx, ty, tr, 0, 7); c.fill(); }
      c.fillStyle = '#7a9a52'; c.fillRect(x, y + h * .78, w, h * .22); for (let k = 0; k < 160; k++) { c.strokeStyle = rgb(jitter('#5a7a3a', r, 14), .7); c.lineWidth = 1.5; const gx = x + r() * w, gy = y + h * r.range(.8, 1); c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + r.gauss() * 3, gy - h * .03); c.stroke(); }
      c.fillStyle = '#e8e0d0'; for (let k = 0; k < 9; k++) c.fillRect(x + k * w / 8, y + h * .74, w * .012, h * .1); c.fillRect(x, y + h * .76, w, h * .012); },
    dawnBlue: (c, r, x, y, w, h) => { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1a2448'); g.addColorStop(.7, '#3a4a78'); g.addColorStop(1, '#8a7aa0'); c.fillStyle = g; c.fillRect(x, y, w, h); for (let k = 0; k < 30; k++) { c.fillStyle = `rgba(255,255,255,${r.range(.2, .7)})`; c.fillRect(x + r() * w, y + r() * h * .5, 1.5, 1.5); }
      for (let k = 0; k < 14; k++) { const bx = x + r() * w, bw = w * r.range(.06, .14), bh = h * r.range(.15, .45); c.fillStyle = rgb(jitter('#151a30', r, 6)); c.fillRect(bx, y + h - bh, bw, bh); for (let i = 0; i < 12; i++) if (r() < .35) { c.fillStyle = `rgba(255,${r.int(190, 230)},140,${r.range(.4, .9)})`; c.fillRect(bx + r() * bw * .8, y + h - bh + r() * bh * .9, 3, 4); } } },
  };
  // ------------------------------------------------------------------ KITCHEN
  ENV.kitchen2 = (ctx, r, W, H, o = {}) => {
    const R = new Room(ctx, r, W, H, { RW: 7.2, RH: 2.8, ch: 1.6, zf: 6.5, f: 1850, hor: .4 });
    const wall = '#e2d6bd', back = R.zf;
    R.shell({ back: wall, side: '#d8c9ab', ceil: '#efe7d6', floor: '#9a7454', planks: true, skirting: '#cfc2a8' });
    // ceiling details: cove line + recessed lights
    for (const [x, z] of [[-2, 3], [0, 3], [2, 3], [-2, 5], [0, 5], [2, 5]]) { const [sx, sy] = R.p(x, R.RH, z); ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.ellipse(sx, sy, .09 * R.s(z), .02 * R.s(z), 0, 0, 7); ctx.fill(); glow(ctx, sx, sy + 20, .7 * R.s(z), '#fff0c8', .18); }
    // back wall: subway tile backsplash, window
    R.backTiles(-3.6, 3.6, .9, 1.5, .15, .075, '#f1eee6');
    const win = R.backWindow(-.75, .75, 1.0, 2.25, ENV.views.morningGarden);
    // window light: beam across floor + glow
    R.beam(-.75, 1.0, .75, 2.25, '#fff0c8', .16, 3.6); glow(ctx, win[0] + win[2] / 2, win[1] + win[3] / 2, win[2] * 1.4, '#fff4d8', .22);
    kuwahara(ctx, W, H, 2);
    // floor detail after the soften pass: plank seams, butt joints, grain, knots, window reflection
    { const n = 26, L0 = -3.6, Z = 1.2; ctx.save(); for (let i = 0; i <= n; i++) { const x = L0 + i * 7.2 / n; ctx.strokeStyle = 'rgba(50,30,18,.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...R.p(x, 0, Z)); ctx.lineTo(...R.p(x, 0, R.zf)); ctx.stroke();
        for (let z = R.zf - r.range(0, 1.4); z > Z; z -= r.range(1.0, 2.2)) { ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(...R.p(x, 0, z)); ctx.lineTo(...R.p(x + 7.2 / n, 0, z)); ctx.stroke(); }
        const tint = jitter('#9a7454', r, 14); ctx.fillStyle = rgb(tint, .28); poly(ctx, [R.p(x, 0, Z), R.p(x + 7.2 / n, 0, Z), R.p(x + 7.2 / n, 0, R.zf), R.p(x, 0, R.zf)]); ctx.fill();
        for (let g = 0; g < 7; g++) { const gx = x + r.range(.02, 7.2 / n - .02), z0 = r.range(Z, R.zf - .5), z1 = z0 + r.range(.3, 1.2); ctx.strokeStyle = rgb(shade(tint, r.range(-.35, .2)), .35); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(...R.p(gx, 0, z0)); ctx.lineTo(...R.p(gx + r.gauss() * .01, 0, z1)); ctx.stroke(); }
        if (r() < .3) { const [kx, ky] = R.p(x + 7.2 / n / 2, 0, r.range(Z + .3, R.zf - .3)), ks = R.s(4); ctx.fillStyle = 'rgba(60,35,20,.5)'; ctx.beginPath(); ctx.ellipse(kx, ky, .02 * ks, .008 * ks, 0, 0, 7); ctx.fill(); } }
      ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(40px)'; ctx.fillStyle = 'rgba(255,236,190,.25)'; poly(ctx, [R.p(-.9, 0, 6.2), R.p(.9, 0, 6.2), R.p(1.4, 0, 3.0), R.p(-1.0, 0, 3.0)]); ctx.fill(); ctx.restore(); }
    // crown moulding along the top of the back wall
    { const [a1, b1] = R.p(-3.6, R.RH, R.zf - .01), [a2, b2] = R.p(3.6, R.RH - .09, R.zf - .01); PR.panel(ctx, r, a1, b1, a2 - a1, b2 - b1, '#f4eee2', { grain: false }); ctx.fillStyle = 'rgba(80,60,40,.25)'; ctx.fillRect(a1, b2, a2 - a1, 4); }
    // upper cabinets (front faces + undersides) left and right of window, gap for hood
    const zc = back - .36; const upper = (x0, x1) => { const n = Math.max(1, Math.round((x1 - x0) / .6)); const bw = (x1 - x0) / n; for (let i = 0; i < n; i++) { const b = R.box(x0 + i * bw, 1.55, zc, bw, .75, .36, '#8a6646', { shadow: false, density: 160 }); const F = b.F; const s = R.s(zc);
        const [fx, fy] = F[0], [gx, gy] = F[2]; PR.panel(ctx, r, fx + .04 * s, fy + .04 * s, gx - fx - .08 * s, gy - fy - .08 * s, '#93704e', { gd: 70, ang: Math.PI / 2 }); PR.handle(ctx, (i % 2 ? fx + .08 * s : gx - .08 * s), gy - .16 * s, (i % 2 ? fx + .08 * s : gx - .08 * s), gy - .3 * s, 4, '#c8b48a'); } };
    upper(-3.6, -2.45); upper(-1.55, -.85); upper(.85, 3.6);
    // hood over stove
    { const [hx, hy] = R.p(-2.0, 1.75, back - .3); PR.hood(ctx, r, hx, hy, R.s(back - .3)); }
    // open shelf between hood and window: plates & jars
    { const z = back - .15, s = R.s(z); const [sx, sy] = R.p(-1.5, 1.62, z), [ex] = R.p(-.95, 1.62, z); }
    // lower run: cabinet box, then fronts
    const zl = back - .62, sl = R.s(zl); R.box(-3.6, 0, zl, 7.2, .88, .62, '#7e5c3e', { shadow: false, density: 140 });
    const front = (x0, x1, kind) => { const [X0, Y0] = R.p(x0, .86, zl), [X1, Y1] = R.p(x1, .1, zl), w = X1 - X0, h = Y1 - Y0; if (kind === 'slot') { ctx.fillStyle = '#2a211a'; ctx.fillRect(X0 + 3, Y0 - .02 * sl, w - 6, h + .1 * sl); const g = ctx.createLinearGradient(0, Y0, 0, Y1); g.addColorStop(0, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,.1)'); ctx.fillStyle = g; ctx.fillRect(X0 + 3, Y0, w - 6, h); ctx.strokeStyle = 'rgba(160,140,120,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X0 + 12, Y1 - 6); ctx.lineTo(X1 - 12, Y1 - 6); ctx.stroke(); return; }
      if (kind === 'drawers') { for (let k = 0; k < 3; k++) { const yy = Y0 + k * h / 3; PR.panel(ctx, r, X0 + 4, yy + 4, w - 8, h / 3 - 8, '#8c6a4a', { gd: 70, horiz: true }); PR.handle(ctx, X0 + w * .35, yy + h / 6, X0 + w * .65, yy + h / 6, 4, '#c8b48a'); } return; }
      PR.panel(ctx, r, X0 + 4, Y0 + 4, w / 2 - 6, h - 8, '#8c6a4a', { gd: 70 }); PR.panel(ctx, r, X0 + w / 2 + 2, Y0 + 4, w / 2 - 6, h - 8, '#8c6a4a', { gd: 70 }); PR.handle(ctx, X0 + w / 2 - 12, Y0 + h * .12, X0 + w / 2 - 12, Y0 + h * .3, 4, '#c8b48a'); PR.handle(ctx, X0 + w / 2 + 12, Y0 + h * .12, X0 + w / 2 + 12, Y0 + h * .3, 4, '#c8b48a'); };
    front(-3.6, -2.4, 'doors'); front(-1.6, -.8, 'drawers'); front(-.8, .8, 'doors'); front(.85, 1.55, 'slot'); front(1.55, 2.2, 'drawers'); front(2.2, 2.9, 'doors');
    // toe kick shadow
    { const [a1, b1] = R.p(-3.6, .1, zl), [a2, b2] = R.p(3.6, 0, zl); ctx.fillStyle = '#2b2018'; ctx.fillRect(a1, b1, a2 - a1, b2 - b1); }
    // stove in run
    { const [sx, sy] = R.p(-2.0, 0, zl); PR.stove(ctx, r, sx, sy, sl); }
    // counter top (stone) with front edge
    { const top = R.quad([[-3.65, .92, zl - .04], [3.6, .92, zl - .04], [3.6, .92, back], [-3.65, .92, back]], '#cfc6b6', { density: 40, top: .08, bot: -.05, len: [20, 80] }); const [a, b] = R.p(-3.65, .92, zl - .04), [c2, d] = R.p(3.6, .86, zl - .04); PR.panel(ctx, r, a, b, c2 - a, d - b, '#b8ae9c', { grain: false, rad: 2 });
      ctx.save(); poly(ctx, top); ctx.clip(); for (let k = 0; k < 220; k++) { ctx.fillStyle = `rgba(${r.pick(['90,80,70', '255,255,255', '140,120,100'])},${r.range(.08, .3)})`; ctx.beginPath(); ctx.arc(r.range(top[0][0], top[1][0]), r.range(top[2][1], top[0][1]), r.range(1, 3), 0, 7); ctx.fill(); } ctx.restore(); }
    // sink + faucet under window
    { const [a, b] = R.p(-.45, .92, back - .5), [c2, d] = R.p(.45, .92, back - .12); ctx.fillStyle = '#8f969c'; ctx.beginPath(); ctx.ellipse((a + c2) / 2, (b + d) / 2, (c2 - a) / 2, (b - d) / 2 + 4, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5c6268'; ctx.beginPath(); ctx.ellipse((a + c2) / 2, (b + d) / 2 + 3, (c2 - a) / 2 - 10, (b - d) / 2 - 2, 0, 0, 7); ctx.fill();
      const [fx, fy] = R.p(0, .92, back - .08), s = R.s(back - .08); ctx.strokeStyle = '#b8bec4'; ctx.lineWidth = .025 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy - .3 * s); ctx.quadraticCurveTo(fx, fy - .38 * s, fx + .08 * s, fy - .36 * s); ctx.lineTo(fx + .12 * s, fy - .28 * s); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx - 3, fy); ctx.lineTo(fx - 3, fy - .3 * s); ctx.stroke(); }
    // counter items (back to front)
    const on = (x, z, fn, ...a) => { const [sx, sy] = R.p(x, .92, z); fn(ctx, r, sx, sy, R.s(z), ...a); };
    on(-3.3, back - .25, PR.jar, { fill: '#e8dcc0', label: true }); on(-3.15, back - .2, PR.jar, { fill: '#8a5a2a', h: .2, label: true }); on(-3.0, back - .25, PR.jar, { fill: '#d0a040', w: .09, h: .13 });
    on(-2.75, back - .2, PR.utensils); on(-2.0, back - .4, PR.pot, { steam: true }); on(-1.8, back - .25, PR.kettle);
    on(-1.25, back - .25, PR.knifeBlock); on(-1.05, back - .35, PR.coffee); on(-.65, back - .3, PR.dishRack);
    on(.62, back - .25, PR.plant, { h: .3 }); on(1.2, back - .3, PR.toaster); on(2.6, back - .25, PR.fruitBowl);
    // fridge at the right end of the run, front facing
    { const [fx, fy] = R.p(3.25, 0, back - .72); PR.fridge(ctx, r, fx, fy, R.s(back - .72)); }
    // left wall: open shelves with jars/plates, wall clock, calendar, hanging rail with pans
    R.onSide(-3.6, 2.05, 3.4, (c, s) => { PR.panel(c, r, 0, 0, 1.6 * s, .05 * s, '#7a5838', { grain: true, gd: 40 }); PR.books(c, r, .05 * s, 0, s, .6 * s); for (let k = 0; k < 4; k++) PR.jar(c, r, .8 * s + k * .17 * s, 0, s, { fill: r.pick(['#c94a2a', '#e8c040', '#7a9a4a', '#e8e0d0']), label: k % 2 === 0 }); });
    R.onSide(-3.6, 1.55, 3.4, (c, s) => { PR.panel(c, r, 0, 0, 1.6 * s, .05 * s, '#7a5838', { grain: true, gd: 40 }); for (let k = 0; k < 6; k++) { const px = .12 * s + k * .14 * s, rr = .11 * s; const g = c.createRadialGradient(px, -rr, 0, px, -rr, rr); g.addColorStop(0, '#fbf8f0'); g.addColorStop(.75, '#e2dccd'); g.addColorStop(1, '#4a6a8a'); c.fillStyle = g; c.beginPath(); c.ellipse(px, -rr, rr * .3, rr, 0, 0, 7); c.fill(); } for (let k = 0; k < 4; k++) PR.mug(c, r, 1.0 * s + k * .14 * s, 0, s, { col: r.pick(['#d9534f', '#f0ad4e', '#5bc0de', '#e8e2d4']) }); });
    R.onSide(-3.6, 2.45, 2.3, (c, s) => PR.clock(c, r, .2 * s, 0, s, { h: 7, m: 10, r: .17 }));
    R.onSide(-3.6, 1.9, 2.3, (c, s) => PR.calendar(c, r, .2 * s, 0, s));
    R.onSide(-3.6, 1.3, 1.9, (c, s) => { PR.towel(c, r, 0, 0, s); });
    // window plants on sill
    { const s = R.s(back - .08); const [px, py] = R.p(-.45, 1.0, back - .08); PR.plant(ctx, r, px, py, s, { h: .22, n: 18 }); const [qx, qy] = R.p(.4, 1.0, back - .08); PR.jar(ctx, r, qx, qy, s, { fill: '#d8e8f0', lvl: .5, lid: 'transparent' }); }
    // base-layer paint: soften architecture a touch before foreground
    // decor on top of the upper cabinets
    { const z = R.zf - .2, s = R.s(z), y = 2.3; const at = x => R.p(x, y, z);
      for (const [x, kind] of [[-3.2, 'basket'], [-2.85, 'vase'], [-1.3, 'bottle'], [1.2, 'basket'], [1.65, 'jug'], [2.4, 'bottle'], [2.6, 'bottle'], [3.0, 'basket']]) { const [bx, by] = at(x);
        if (kind === 'basket') { const w = .34 * s, h = .2 * s; ctx.fillStyle = '#b08850'; poly(ctx, [[bx - w / 2, by - h], [bx + w / 2, by - h], [bx + w * .42, by], [bx - w * .42, by]]); ctx.fill(); ctx.strokeStyle = 'rgba(90,60,30,.7)'; ctx.lineWidth = 1.5; for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(bx - w / 2 + k * .01 * s, by - h + k * h / 6); ctx.lineTo(bx + w / 2 - k * .01 * s, by - h + k * h / 6); ctx.stroke(); } for (let k = 0; k < 12; k++) { ctx.beginPath(); ctx.moveTo(bx - w / 2 + k * w / 11, by - h); ctx.lineTo(bx - w * .42 + k * w * .84 / 11, by); ctx.stroke(); } }
        else if (kind === 'vase') { PR.jar(ctx, r, bx, by, s, { w: .12, h: .3, fill: '#3a6a8a', lvl: 1, lid: 'transparent' }); for (let k = 0; k < 7; k++) { ctx.strokeStyle = '#6a8a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by - .3 * s); const ex = bx + r.gauss() * .12 * s, ey = by - r.range(.45, .6) * s; ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = r.pick(['#e8d070', '#f0f0e8', '#d07050']); ctx.beginPath(); ctx.arc(ex, ey, .025 * s, 0, 7); ctx.fill(); } }
        else if (kind === 'bottle') PR.jar(ctx, r, bx, by, s, { w: .07, h: .28, fill: r.pick(['#4a7a4a', '#7a2a2a']), lvl: .8, lid: '#c8a050' });
        else PR.kettle(ctx, r, bx, by, s * 1.2, { col: '#d8cfc0' }); } }
    // foreground floor life: runner rug, pet bowl, bin, shopping bag (kept clear of the centre stage)
    { const pts = [R.p(-1.2, 0, 4.4), R.p(.6, 0, 4.4), R.p(.6, 0, 5.6), R.p(-1.2, 0, 5.6)]; paintRegion(ctx, r, pts, '#8a3a2e', { density: 50, len: [10, 30], w: [2, 5], al: .5, topLight: .05, botDark: -.1 }); ctx.strokeStyle = 'rgba(230,200,150,.75)'; ctx.lineWidth = 4; const inner = [R.p(-1.1, 0, 4.5), R.p(.5, 0, 4.5), R.p(.5, 0, 5.5), R.p(-1.1, 0, 5.5)]; poly(ctx, inner); ctx.stroke(); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(40,60,90,.7)'; for (let k = 1; k < 6; k++) { const a1 = R.p(-1.1 + k * 1.6 / 6, 0, 4.6), b1 = R.p(-1.1 + k * 1.6 / 6 + .1, 0, 5.4); ctx.beginPath(); ctx.moveTo(...a1); ctx.lineTo(...b1); ctx.stroke(); }
      ctx.fillStyle = 'rgba(240,220,180,.8)'; for (let k = 0; k < 30; k++) { const [fx, fy] = R.p(-1.2 + k * 1.8 / 30, 0, 4.4); ctx.fillRect(fx, fy, 2, 10); } }
    { const [bx, by] = R.p(-3.25, 0, 4.2), s = R.s(4.2); PR.panel(ctx, r, bx - .17 * s, by - .6 * s, .34 * s, .6 * s, '#9aa2aa', { sheen: .3, rad: .03 * s }); PR.panel(ctx, r, bx - .19 * s, by - .64 * s, .38 * s, .06 * s, '#7a828a', { grain: false }); PR.shadow(ctx, bx, by, .34 * s); }
    { const [bx, by] = R.p(-2.9, 0, 4.5), s = R.s(4.5); ctx.fillStyle = '#c94a3a'; ctx.beginPath(); ctx.ellipse(bx, by - .03 * s, .1 * s, .03 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.ellipse(bx, by - .055 * s, .075 * s, .018 * s, 0, 0, 7); ctx.fill(); }
    { const [bx, by] = R.p(2.55, 0, 5.2), s = R.s(5.2); ctx.fillStyle = '#d8c8a0'; poly(ctx, [[bx - .18 * s, by], [bx + .18 * s, by], [bx + .16 * s, by - .38 * s], [bx - .16 * s, by - .38 * s]]); ctx.fill(); ctx.strokeStyle = 'rgba(90,70,40,.5)'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#4a8a3a'; for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.ellipse(bx - .1 * s + k * .05 * s, by - .4 * s - (k % 2) * .04 * s, .03 * s, .06 * s, k, 0, 7); ctx.fill(); } ctx.fillStyle = '#e8a030'; ctx.fillRect(bx + .05 * s, by - .48 * s, .03 * s, .14 * s); }
    // right wall: doorway into a lit hall + framed picture
    R.onSide(3.6, 2.05, 3.3, (c, s) => { c.fillStyle = '#efe6d2'; c.fillRect(0, 0, .95 * s, 2.05 * s); const g = c.createLinearGradient(0, 0, .95 * s, 0); g.addColorStop(0, 'rgba(255,236,190,.9)'); g.addColorStop(1, 'rgba(200,180,150,.6)'); c.fillStyle = g; c.fillRect(.05 * s, .05 * s, .85 * s, 2 * s); c.fillStyle = '#9a7a5a'; c.fillRect(.3 * s, .4 * s, .3 * s, .4 * s); c.strokeStyle = '#f6efe2'; c.lineWidth = .06 * s; c.strokeRect(0, 0, .95 * s, 2.05 * s); });
    R.onSide(3.6, 2.1, 2.2, (c, s) => PR.poster(c, r, 0, 0, .45 * s, .6 * s, { frame: '#5a3e2a', a: '#f0c070', b: '#c06040', c: '#405070' }));
    // warm/cool grade and final paint finish
    ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const gg = ctx.createLinearGradient(0, 0, W, 0); gg.addColorStop(0, 'rgba(255,200,140,.35)'); gg.addColorStop(1, 'rgba(160,190,230,.25)'); ctx.fillStyle = gg; ctx.fillRect(0, 0, W, H); ctx.restore();
    ENV.impasto(ctx, r, W, H, { n: o.strokes ?? 140000 });
    P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .3 });
  };

  // ------------------------------------------------------------------ OFFICE (open plan, deep perspective)
  ENV.office2 = (ctx, r, W, H, o = {}) => { const night = !!o.night;
    const R = new Room(ctx, r, W, H, { RW: 14, RH: 3.2, ch: 1.35, zf: 20, f: 1750, hor: .44 });
    const wallC = night ? '#3a4150' : '#c9ccd0';
    R.shell({ back: wallC, side: night ? '#343a48' : '#bfc3c8', ceil: night ? '#2c313c' : '#dfe1e3', floor: night ? '#3a3f4a' : '#7d848c', planks: false, skirting: night ? '#2a2e36' : '#9aa0a6' });
    // carpet tiles
    { const c = ctx; c.save(); for (let z = R.zf; z > 1.3; z -= .6) for (let x = -7, i = 0; x < 7; x += .6, i++) { const pts = [R.p(x, 0, z - .6), R.p(x + .6, 0, z - .6), R.p(x + .6, 0, z), R.p(x, 0, z)]; c.fillStyle = rgb(jitter(night ? '#3a3f4a' : '#7d848c', r, 6), .55); poly(c, pts); c.fill(); c.strokeStyle = 'rgba(30,34,40,.18)'; c.lineWidth = 1; c.stroke(); } c.restore(); }
    // back wall windows to the city
    for (let k = 0; k < 5; k++) { const x0 = -6.6 + k * 2.7; R.backWindow(x0, x0 + 2.4, .9, 2.8, night ? ENV.views.dawnBlue : (c2, r2, x, y, w, h) => { const g = c2.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#a9c1d8'); g.addColorStop(1, '#e8e2d6'); c2.fillStyle = g; c2.fillRect(x, y, w, h); for (let b = 0; b < 9; b++) { const bx = x + r2() * w, bw = w * r2.range(.08, .2), bh = h * r2.range(.3, .8); c2.fillStyle = rgb(jitter('#8a96a6', r2, 10)); c2.fillRect(bx, y + h - bh, bw, bh); c2.fillStyle = 'rgba(255,255,255,.3)'; for (let wy = 0; wy < bh; wy += 6) c2.fillRect(bx + 2, y + h - bh + wy, bw - 4, 2); } }, { frame: night ? '#4a505c' : '#e2e4e6' }); }
    // right wall: tall windows + light on the floor
    for (let k = 1; k < 6; k++) { const z0 = 3 + k * 2.7; R.onSide(7, 2.9, z0, (c, s) => { const w = 2.2 * s, h = 2.2 * s; c.fillStyle = night ? '#1a2240' : '#cfdcea'; c.fillRect(0, 0, w, h); const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, night ? 'rgba(80,100,160,.6)' : 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); c.strokeStyle = night ? '#4a505c' : '#eef0f2'; c.lineWidth = .08 * s; c.strokeRect(0, 0, w, h); c.beginPath(); c.moveTo(w / 2, 0); c.lineTo(w / 2, h); c.stroke(); });
      if (!night) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(18px)'; ctx.fillStyle = 'rgba(255,248,230,.16)'; poly(ctx, [R.p(7, 0, z0), R.p(7, 0, z0 + 2.2), R.p(3.5, 0, z0 + 1.6), R.p(3.5, 0, z0 - .6)]); ctx.fill(); ctx.restore(); } }
    // left wall: whiteboard, clock, binders, door
    R.onSide(-7, 2.3, 3.2, (c, s) => PR.whiteboard(c, r, 0, 0, s, 2.2 * s, 1.1 * s));
    R.onSide(-7, 2.7, 6.2, (c, s) => PR.clock(c, r, .2 * s, 0, s, { h: 9, m: 5, r: .2 }));
    R.onSide(-7, 2.1, 8, (c, s) => { c.fillStyle = night ? '#4a4038' : '#8a7a6a'; c.fillRect(0, 0, 1 * s, 2.1 * s); c.strokeStyle = 'rgba(20,20,20,.5)'; c.lineWidth = 3; c.strokeRect(0, 0, 1 * s, 2.1 * s); PR.handle(c, .8 * s, 1.0 * s, .9 * s, 1.0 * s, 4, '#bbb'); c.fillStyle = '#2a7a3a'; c.fillRect(.2 * s, -.25 * s, .6 * s, .18 * s); c.fillStyle = '#fff'; c.font = `bold ${.12 * s | 0}px sans-serif`; c.fillText('EXIT', .3 * s, -.12 * s); });
    // ceiling light panels + vents
    for (let z = 3; z < R.zf; z += 2.2) for (const x of [-4.5, -1.2, 1.2, 4.5]) { const pts = [R.p(x - .6, R.RH - .01, z + .6), R.p(x + .6, R.RH - .01, z + .6), R.p(x + .6, R.RH - .01, z), R.p(x - .6, R.RH - .01, z)]; ctx.fillStyle = night ? 'rgba(220,235,255,.9)' : 'rgba(250,252,255,.95)'; poly(ctx, pts); ctx.fill(); ctx.strokeStyle = 'rgba(120,130,140,.6)'; ctx.lineWidth = 1.5; ctx.stroke(); const [gx, gy] = R.p(x, R.RH, z + .3); glow(ctx, gx, gy + 30, R.s(z) * 1.4, '#eaf2ff', night ? .2 : .1); }
    { const c = ctx; c.strokeStyle = night ? 'rgba(0,0,0,.25)' : 'rgba(120,125,130,.35)'; c.lineWidth = 1; for (let x = -7; x <= 7; x += .6) { c.beginPath(); c.moveTo(...R.p(x, R.RH, 1.5)); c.lineTo(...R.p(x, R.RH, R.zf)); c.stroke(); } for (let z = 1.5; z < R.zf; z += .6) { c.beginPath(); c.moveTo(...R.p(-7, R.RH, z)); c.lineTo(...R.p(7, R.RH, z)); c.stroke(); } }
    // columns
    for (const z of [7, 13]) for (const x of [-3.2, 3.0]) R.box(x, 0, z, .45, R.RH, .45, night ? '#4a505c' : '#d6d8da', { density: 80 });
    kuwahara(ctx, W, H, 2);
    // desk pods, far to near; centre aisle left open
    const pod = (x, z, w, facing) => { const d = .75, top = .74, s = R.s(z + d / 2), screenC = night ? '#9ac8ff' : '#dde8f2';
      // partition behind the desk
      R.box(x, 0, z + d, w, 1.18, .05, night ? '#3e4a5e' : '#6f8095', { density: 120, shadow: false });
      { const [a, b] = R.p(x, 1.18, z + d), [c2] = R.p(x + w, 1.18, z + d); ctx.fillStyle = night ? '#5a6272' : '#aeb6c0'; ctx.fillRect(a, b - 3, c2 - a, 5); }
      // monitors, lamps, binders on partition
      for (let k = 0; k < Math.round(w / 1.4); k++) { const mx = x + .7 + k * 1.4; const [px, py] = R.p(mx, top + .02, z + d * .62); PR.monitor(ctx, r, px, py, R.s(z + d * .62), { kind: r() < .4 ? 'chart' : 'doc', scr1: night ? '#a8d0ff' : undefined, scr2: night ? '#5a8ad0' : undefined, glow: night ? '#8ab8ff' : '#c8dcf0', glowA: night ? .25 : .08 }); }
      // desk top + front
      R.box(x, top, z, w, .04, d, night ? '#7a6a58' : '#d8c8aa', { density: 60, shadow: false }); { const [a, b] = R.p(x, top, z), [c2, d2] = R.p(x + w, .12, z); ctx.fillStyle = night ? 'rgba(40,40,50,.85)' : 'rgba(90,96,104,.85)'; ctx.fillRect(a + 6, b + 4, c2 - a - 12, d2 - b); }
      for (let k = 0; k < Math.round(w / 1.4); k++) { const mx = x + .7 + k * 1.4, zz = z + .2; const on = (dx, fn, ...aa) => { const [sx, sy] = R.p(mx + dx, top + .04, zz); fn(ctx, r, sx, sy, R.s(zz), ...aa); };
        on(0, PR.keyboard); if (r() < .7) on(-.45, PR.papers, r.int(2, 6)); if (r() < .5) on(.42, PR.mug, { col: r.pick(['#e8e2d4', '#c94a3a', '#3a6aa0']) }); if (r() < .25) on(-.5, PR.plant, { h: .25, n: 14 });
        const [cx, cy] = R.p(mx, 0, z - .35); PR.officeChair(ctx, r, cx, cy, R.s(z - .35), { col: night ? '#22262c' : '#2d3238' }); } };
    for (let z = 17; z >= 4.5; z -= 3.1) { pod(-6.6, z, 4.2); pod(2.4, z, 4.2); }
    // aisle plants + water cooler + bin
    { const [px, py] = R.p(-1.6, 0, 6), s = R.s(6); PR.plant(ctx, r, px, py, s * 2.0, { h: .55, n: 60, leaf: 1.1 }); }
    { const [px, py] = R.p(1.7, 0, 10), s = R.s(10); PR.waterCooler(ctx, r, px, py, s); }
    { const [px, py] = R.p(1.5, 0, 4.4), s = R.s(4.4); PR.plant(ctx, r, px, py, s * 2.0, { h: .5, n: 60, leaf: 1.1 }); }
    if (night) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(70,90,150,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    else { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(150,180,220,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    ENV.impasto(ctx, r, W, H, { n: 140000 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .32 });
  };
  // foreground desk sprite for a seated worker (transparent PNG): desk + monitor + clutter, viewed from the side-front
  ENV.fgDesk = (ctx, r, W, H, o = {}) => { const s = o.s ?? 620, x = o.x ?? W * .8, y = o.y ?? H * .93; PR.panel(ctx, r, x - .75 * s, y - .74 * s, 1.5 * s, .62 * s, '#5d6672', { gd: 120, sheen: .06 }); PR.desk(ctx, r, x, y, s, { w: 1.5, col: '#cdb894' }); const top = y - .78 * s;
    PR.monitor(ctx, r, x + .15 * s, top, s, { kind: 'chart' }); PR.keyboard(ctx, r, x - .05 * s, top + .02 * s, s); PR.papers(ctx, r, x - .52 * s, top, s, 6); PR.mug(ctx, r, x + .55 * s, top, s, { steam: true }); PR.binders(ctx, r, x - .7 * s, top, s, .3 * s); };

  // ------------------------------------------------------------------ BEDROOM (dark early morning)
  ENV.bedroom2 = (ctx, r, W, H, o = {}) => { const dark = o.dark ?? true;
    const R = new Room(ctx, r, W, H, { RW: 6, RH: 2.7, ch: 1.25, zf: 4.8, f: 2000, hor: .4 });
    R.shell({ back: '#7a86a0', side: '#6c7894', ceil: '#8a94aa', floor: '#7a6050', planks: true, skirting: '#c8ccd8' });
    // wallpaper texture: faint vertical pattern
    { const z = R.zf - .005, s = R.s(z); for (let x = -3; x < 3; x += .25) { const [a, b] = R.p(x, R.RH, z), [, d] = R.p(x, .12, z); ctx.strokeStyle = 'rgba(255,255,255,.06)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(a, d); ctx.stroke(); for (let yy = b + 20; yy < d; yy += .25 * s) { ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.arc(a + .125 * s, yy, 3, 0, 7); ctx.fill(); } } }
    // window with blinds (dawn city)
    const win = R.backWindow(.4, 2.1, .95, 2.25, ENV.views.dawnBlue, { frame: '#d8dce6' }); { const [X, Y, w, h] = win; for (let k = 0; k < 22; k++) { const yy = Y + k * h / 22; ctx.fillStyle = 'rgba(200,205,220,.82)'; ctx.fillRect(X, yy, w, h / 22 * .55); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(X, yy, w, 1.5); } ctx.strokeStyle = 'rgba(220,220,230,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X + w * .9, Y); ctx.lineTo(X + w * .9, Y + h * .7); ctx.stroke(); }
    // curtains
    for (const [x0, x1] of [[.05, .45], [2.05, 2.45]]) { const z = R.zf - .1, [a, b] = R.p(x0, 2.45, z), [c2, d] = R.p(x1, .3, z); const g = ctx.createLinearGradient(a, 0, c2, 0); for (let k = 0; k <= 6; k++) g.addColorStop(k / 6, k % 2 ? '#3a3e6a' : '#5a5f8e'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c2, b); ctx.quadraticCurveTo(c2 + 10, (b + d) / 2, c2 + 18, d); ctx.lineTo(a - 10, d); ctx.closePath(); ctx.fill(); }
    { const [a, b] = R.p(-.1, 2.47, R.zf - .12), [c2] = R.p(2.6, 2.47, R.zf - .12); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(a, b, c2 - a, 8); }
    // pictures, shelf with books, wardrobe on the left wall
    { const z = R.zf - .01, [px, py] = R.p(-1.3, 2.3, z), s = R.s(z); PR.poster(ctx, r, px, py, .5 * s, .62 * s, { a: '#e0a868', b: '#9a4a5a', c: '#2a2a4a' }); const [qx, qy] = R.p(-.45, 2.15, z); PR.poster(ctx, r, qx, qy, .4 * s, .5 * s, { frame: '#e8e2d6', a: '#7ab0c8', b: '#3a6a8a', c: '#1a2a3a' }); }
    { const z = R.zf - .15, s = R.s(z), [a, b] = R.p(-2.6, 1.4, z), [c2] = R.p(-1.4, 1.4, z); PR.panel(ctx, r, a, b, c2 - a, .04 * s, '#6a4a32', { grain: false }); PR.books(ctx, r, a + 4, b, s, (c2 - a) * .7); PR.plant(ctx, r, a + (c2 - a) * .85, b, s, { h: .25, n: 16 }); }
    R.onSide(-3, 2.1, 3.3, (c, s) => { PR.panel(c, r, 0, 0, 1.3 * s, 2.1 * s, '#7a5a42', { horiz: true, gd: 90 }); c.strokeStyle = 'rgba(20,10,5,.6)'; c.lineWidth = 3; c.beginPath(); c.moveTo(.65 * s, 0); c.lineTo(.65 * s, 2.1 * s); c.stroke(); for (const dx of [0, .65]) { PR.panel(c, r, (dx + .06) * s, .1 * s, .53 * s, .8 * s, '#84644a', { grain: false, rad: 4 }); PR.panel(c, r, (dx + .06) * s, 1.0 * s, .53 * s, .95 * s, '#84644a', { grain: false, rad: 4 }); } PR.handle(c, .58 * s, .9 * s, .58 * s, 1.15 * s, 5, '#c8b080'); PR.handle(c, .72 * s, .9 * s, .72 * s, 1.15 * s, 5, '#c8b080'); c.fillStyle = '#5a4a6a'; c.fillRect(.1 * s, -.35 * s, .5 * s, .35 * s); c.fillStyle = '#8a6a4a'; c.fillRect(.65 * s, -.25 * s, .45 * s, .25 * s); });
    R.onSide(3, 2.0, 2.0, (c, s) => PR.calendar(c, r, 0, 0, s));
    kuwahara(ctx, W, H, 2);
    // rug, bed (base only; the duvet is a separate foreground sprite), nightstand with lamp, chair with clothes, slippers
    { const pts = [R.p(-1.6, 0, 2.2), R.p(1.4, 0, 2.2), R.p(1.4, 0, 3.6), R.p(-1.6, 0, 3.6)]; paintRegion(ctx, r, pts, '#5a4a6a', { density: 50, len: [8, 20], w: [2, 4], al: .5 }); ctx.strokeStyle = 'rgba(200,180,210,.5)'; ctx.lineWidth = 5; poly(ctx, [R.p(-1.45, 0, 2.3), R.p(1.25, 0, 2.3), R.p(1.25, 0, 3.5), R.p(-1.45, 0, 3.5)]); ctx.stroke(); }
    const bed = ENV.bedroomBed(W, H); PR.bed(ctx, r, bed.x, bed.y, bed.s, { only: 'base', cover: '#c4c8dc', frame: '#3e2c22' });
    { const [nx, ny] = R.p(1.55, 0, 3.4), s = R.s(3.4); PR.nightstand(ctx, r, nx, ny, s, '#4a3424'); const top = ny - .58 * s; PR.books(ctx, r, nx - .23 * s, top, s, .1 * s); ENV.lamp(ctx, r, nx - .06 * s, top, s / 300, false); }
    { const [cx, cy] = R.p(-2.3, 0, 3.0); PR.clothesChair(ctx, r, cx, cy, R.s(3.0)); }
    { const [sx, sy] = R.p(.9, 0, 2.15); PR.slippers(ctx, r, sx, sy, R.s(2.15)); }
    { const [lx, ly] = R.p(2.2, 0, 2.9), s = R.s(2.9); ctx.fillStyle = '#3a3e48'; poly(ctx, [[lx - .2 * s, ly], [lx + .2 * s, ly], [lx + .16 * s, ly - .03 * s], [lx - .16 * s, ly - .03 * s]]); ctx.fill(); ctx.fillStyle = '#2a2e38'; poly(ctx, [[lx - .16 * s, ly - .03 * s], [lx + .16 * s, ly - .03 * s], [lx + .18 * s, ly - .24 * s], [lx - .14 * s, ly - .24 * s]]); ctx.fill(); ctx.fillStyle = 'rgba(90,110,160,.5)'; poly(ctx, [[lx - .14 * s, ly - .045 * s], [lx + .14 * s, ly - .045 * s], [lx + .16 * s, ly - .22 * s], [lx - .12 * s, ly - .22 * s]]); ctx.fill(); }
    { const [bx, by] = R.p(1.05, 0, 3.9), s = R.s(3.9); ctx.fillStyle = '#4a5a3a'; ctx.beginPath(); ctx.moveTo(bx - .18 * s, by); ctx.quadraticCurveTo(bx - .22 * s, by - .4 * s, bx, by - .45 * s); ctx.quadraticCurveTo(bx + .22 * s, by - .4 * s, bx + .18 * s, by); ctx.fill(); ctx.fillStyle = '#3a4a2a'; ctx.fillRect(bx - .12 * s, by - .22 * s, .24 * s, .14 * s); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by - .45 * s, .06 * s, Math.PI, 0); ctx.stroke(); }
    // cold dawn light through the blinds: striped beam on floor and wall
    { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(6px)'; for (let k = 0; k < 12; k++) { const z0 = 2.4 + k * .17; ctx.fillStyle = 'rgba(140,170,230,.12)'; poly(ctx, [R.p(.2, 0, z0), R.p(1.9, 0, z0), R.p(2.2, 0, z0 + .08), R.p(.5, 0, z0 + .08)]); ctx.fill(); } ctx.restore(); }
    if (dark) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; const g = ctx.createRadialGradient(W * .7, H * .35, 100, W * .5, H * .5, W * .75); g.addColorStop(0, 'rgba(175,190,235,1)'); g.addColorStop(1, 'rgba(70,82,140,1)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); glow(ctx, win[0] + win[2] / 2, win[1] + win[3] / 2, win[2] * 1.3, '#6a8ad0', .2); }
    ENV.impasto(ctx, r, W, H, { n: 120000 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .45 });
  };
  ENV.bedroomBed = (W, H) => ({ x: W * .43, y: H * .9, s: 560 });
  ENV.fgDuvet = (ctx, r, W, H) => { const b = ENV.bedroomBed(W, H); PR.bed(ctx, r, b.x, b.y, b.s, { only: 'duvet', cover: '#c4c8dc' }); ctx.save(); ctx.globalCompositeOperation = 'source-atop'; ctx.fillStyle = 'rgba(40,50,95,.55)'; ctx.fillRect(0, 0, W, H); ctx.restore(); };

  // ------------------------------------------------------------------ EXCAVATION TRENCH (looking down into a dig)
  ENV.dig = (ctx, r, W, H, o = {}) => { const N = P.Noise(r.int(1, 99999));
    const R = new Room(ctx, r, W, H, { RW: 30, RH: 10, ch: 3.4, zf: 60, f: 1500, hor: .27 }); const hz = H * .27;
    M.sky(ctx, r, W, hz + 40, '#7fa6c8', '#efe0c2', { strokes: 2400 }); glow(ctx, W * .82, H * .05, W * .5, '#fff1c8', .35); ENV.clouds(ctx, r, W, H * .02, hz * .7, 8, '#fff8ea', '#e8dccb', '#c8b8a8');
    M.hills(ctx, r, N, W, hz - 20, 70, .0013, 4, '#a8a08a', { topLight: .1, botDark: .02, density: 600 }); M.hills(ctx, r, N, W, hz + 2, 30, .003, 8, '#a08a62', { topLight: .08, botDark: -.05 }); M.distantTrees(ctx, r, W, hz + 4, 30, '#6a6a42');
    ENV.texBand(ctx, r, W, Math.round(hz), H, [[0, '#c8a878'], [.3, '#b8946a'], [.6, '#a8845a'], [.85, '#9a7650'], [1, '#8a6a46']], { sx: .004, persp: 1.1, near: t => -t * .12 });
    P.fillStrokes(ctx, r, [0, hz, W, H - hz], () => true, { n: 9000, len: [10, 50], w: [2, 7], ang: 0, angJ: .08, al: .2, colFn: (x, y) => jitter(N(x * .004, y * .01) > .5 ? '#b89268' : '#a07a52', r, 14) });
    ENV.grass(ctx, r, W, hz + 4, hz + 50, 300, ['#8a8a4a', '#a8a058', '#c8b878'], { h: 12, bl: [5, 12], bias: 1 });
    for (let k = 0; k < 40; k++) { const y = hz + Math.pow(r(), 1.5) * (H - hz) * .5, x = r() * W, t = (y - hz) / (H - hz); if (Math.abs(x - W / 2) < W * .3 && y > H * .5) continue; if (x > W * .1 && x < W * .36 && y > H * .3 && y < H * .55) continue; M.bush(ctx, r, x, y, 40 + t * 260, 20 + t * 120, '#6a7038', '#a8a858', {}); }
    // background camp: shade canopy, crates, wheelbarrow, spoil heap
    { const [tx, ty] = R.p(-6.5, 0, 14), s = R.s(14); ctx.fillStyle = 'rgba(60,40,20,.3)'; ctx.beginPath(); ctx.ellipse(tx + .5 * s, ty, 3 * s, .3 * s, 0, 0, 7); ctx.fill(); for (const dx of [-2.2, 2.2]) { ctx.fillStyle = '#5a4a3a'; ctx.fillRect(tx + dx * s, ty - 2.2 * s, .06 * s, 2.2 * s); } ctx.fillStyle = '#ece6d8'; poly(ctx, [[tx - 2.5 * s, ty - 2.2 * s], [tx + 2.5 * s, ty - 2.2 * s], [tx + 2.2 * s, ty - 2.7 * s], [tx - 2.2 * s, ty - 2.7 * s]]); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.12)'; for (let k = 0; k < 8; k++) ctx.fillRect(tx - 2.5 * s + k * .62 * s, ty - 2.2 * s, .3 * s, .08 * s);
      for (let k = 0; k < 4; k++) PR.panel(ctx, r, tx - 1.6 * s + k * .7 * s, ty - .5 * s - (k % 2) * .5 * s, .6 * s, .5 * s, '#8a6a42', { gd: 30 }); PR.panel(ctx, r, tx + 1.2 * s, ty - .8 * s, 1.2 * s, .06 * s, '#7a5a3a', { grain: false }); ctx.fillStyle = '#4a4a4a'; ctx.fillRect(tx + 1.3 * s, ty - .74 * s, .05 * s, .74 * s); ctx.fillRect(tx + 2.3 * s, ty - .74 * s, .05 * s, .74 * s); }
    { const [hx, hy] = R.p(7.5, 0, 14), s = R.s(14); paintRegion(ctx, r, [[hx - 3 * s, hy], [hx - 1 * s, hy - 1.2 * s], [hx + .5 * s, hy - 1.5 * s], [hx + 2.5 * s, hy - .6 * s], [hx + 3.5 * s, hy]], '#9a7a52', { density: 80, len: [6, 20], w: [2, 5], al: .5, topLight: .15, botDark: -.15 }); }
    { const [wx, wy] = R.p(4.2, 0, 9), s = R.s(9); ctx.fillStyle = '#2a7a5a'; poly(ctx, [[wx - .6 * s, wy - .7 * s], [wx + .4 * s, wy - .7 * s], [wx + .3 * s, wy - .3 * s], [wx - .5 * s, wy - .3 * s]]); ctx.fill(); ctx.fillStyle = '#8a6a42'; ctx.beginPath(); ctx.ellipse(wx - .05 * s, wy - .7 * s, .5 * s, .08 * s, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = .04 * s; ctx.beginPath(); ctx.moveTo(wx + .3 * s, wy - .4 * s); ctx.lineTo(wx + 1.1 * s, wy - .7 * s); ctx.moveTo(wx - .5 * s, wy - .3 * s); ctx.lineTo(wx - .5 * s, wy); ctx.stroke(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(wx + .45 * s, wy - .14 * s, .14 * s, 0, 7); ctx.fill(); }
    { const sky = ctx.getImageData(0, 0, W, Math.round(hz)); P.kuwahara(ctx, W, H, 3); ctx.putImageData(sky, 0, 0); }
    ENV.pebbles(ctx, r, W, hz + 20, H, 320, '#6a5238', '#e2c89a');
    // the trench: clip to its opening, then paint floor, side walls, far wall with strata
    const x0 = -3.1, x1 = 3.1, z0 = 5.6, z1 = 9.4, D = -1.5; const open = [R.p(x0, 0, z1), R.p(x1, 0, z1), R.p(x1, 0, z0), R.p(x0, 0, z0)];
    ctx.save(); poly(ctx, open); ctx.clip();
    R.quad([[x0, D, z0], [x1, D, z0], [x1, D, z1], [x0, D, z1]], '#7a5a3a', { density: 60, top: -.1, bot: .05, len: [8, 30] });
    for (const [xw, f] of [[x0, -.15], [x1, -.3]]) { const q = [[xw, 0, z0], [xw, 0, z1], [xw, D, z1], [xw, D, z0]]; const pts = R.quad(q, shade('#8a6a44', f), { density: 60, ang: Math.PI / 2, len: [8, 24] });
      for (let k = 0; k < 5; k++) { const yy = -k * .28 - .1; ctx.strokeStyle = 'rgba(60,40,20,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...R.p(xw, yy, z0)); ctx.lineTo(...R.p(xw, yy, z1)); ctx.stroke(); } }
    // far wall strata
    const strata = [[0, -.15, '#b89a6e'], [-.15, -.42, '#9a7a52'], [-.42, -.5, '#2e2620'], [-.5, -.8, '#a8865a'], [-.8, -1.05, '#8a6a46'], [-1.05, -1.25, '#c0a070'], [-1.25, D, '#6e5236']];
    for (const [ya, yb, col] of strata) { const pts = R.quad([[x0, ya, z1], [x1, ya, z1], [x1, yb, z1], [x0, yb, z1]], col, { density: 30, len: [10, 40], w: [2, 5], top: .05, bot: -.08 }); const s = R.s(z1);
      ctx.save(); poly(ctx, pts); ctx.clip(); for (let k = 0; k < 40; k++) { const [px, py] = R.p(r.range(x0, x1), r.range(yb, ya), z1); ctx.fillStyle = rgb(jitter(shade(col, r.range(-.3, .3)), r, 10)); ctx.beginPath(); ctx.ellipse(px, py, r.range(2, 7), r.range(1.5, 5), r(), 0, 7); ctx.fill(); }
      if (col === '#2e2620') for (let k = 0; k < 30; k++) { const [px, py] = R.p(r.range(x0, x1), r.range(yb, ya), z1); ctx.fillStyle = r() < .5 ? 'rgba(200,90,40,.6)' : 'rgba(10,8,6,.8)'; ctx.fillRect(px, py, 3, 2); } ctx.restore();
      const [lx, ly] = R.p(x0, yb, z1); ctx.strokeStyle = 'rgba(40,25,15,.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(R.p(x1, yb, z1)[0], ly); ctx.stroke(); }
    // context labels pinned to the strata
    for (const [lx, ly, t] of [[-1.9, -.3, 'L1'], [-1.0, -.46, 'HEARTH'], [.3, -.65, 'L3'], [1.4, -.95, 'L4']]) { const [px, py] = R.p(lx, ly, z1 - .01), s = R.s(z1); ctx.fillStyle = '#f6f2e6'; ctx.fillRect(px, py - .05 * s, (t.length * .045 + .04) * s, .08 * s); ctx.fillStyle = '#c33'; ctx.beginPath(); ctx.arc(px + 3, py - .01 * s, 3, 0, 7); ctx.fill(); ctx.fillStyle = '#222'; ctx.font = `bold ${.055 * s | 0}px monospace`; ctx.fillText(t, px + .03 * s, py + .015 * s); }
    // measuring rod leaning on the far wall + north arrow board
    { const s = R.s(z1 - .1), [a, b] = R.p(2.0, D, z1 - .25), [c2, d] = R.p(2.15, 0.2, z1 - .05); ctx.lineCap = 'butt'; for (let k = 0; k < 9; k++) { const t0 = k / 9, t1 = (k + 1) / 9; ctx.strokeStyle = k % 2 ? '#f2f0ea' : '#c8302a'; ctx.lineWidth = .05 * s; ctx.beginPath(); ctx.moveTo(a + (c2 - a) * t0, b + (d - b) * t0); ctx.lineTo(a + (c2 - a) * t1, b + (d - b) * t1); ctx.stroke(); } }
    // finds on the trench floor: stone tools, a bone, a hearth ring, tags, trowel, brushes, bucket, kneeling pad
    const onF = (x, z, fn) => { const [px, py] = R.p(x, D, z); fn(px, py, R.s(z)); };
    onF(-.9, 8.9, (x, y, s) => { for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2; const px = x + Math.cos(a) * .32 * s, py = y + Math.sin(a) * .1 * s; ctx.fillStyle = rgb(jitter('#8a8478', r, 16)); ctx.beginPath(); ctx.ellipse(px, py, .07 * s, .045 * s, r(), 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.ellipse(px - 3, py - 3, .03 * s, .015 * s, 0, 0, 7); ctx.fill(); } ctx.fillStyle = 'rgba(20,15,10,.75)'; ctx.beginPath(); ctx.ellipse(x, y, .22 * s, .07 * s, 0, 0, 7); ctx.fill(); });
    onF(1.1, 8.6, (x, y, s) => { ctx.fillStyle = '#e8dcc0'; ctx.save(); ctx.translate(x, y); ctx.rotate(-.2); ctx.beginPath(); ctx.ellipse(0, 0, .28 * s, .035 * s, 0, 0, 7); ctx.fill(); for (const e of [-1, 1]) { ctx.beginPath(); ctx.arc(e * .28 * s, -.01 * s, .05 * s, 0, 7); ctx.arc(e * .28 * s, .03 * s, .045 * s, 0, 7); ctx.fill(); } ctx.restore(); });
    for (const [fx, fz] of [[1.9, 9.1], [-2.2, 8.5], [.3, 8.4], [2.4, 8.4]]) onF(fx, fz, (x, y, s) => { ctx.fillStyle = '#5a5248'; poly(ctx, [[x - .08 * s, y], [x, y - .05 * s], [x + .09 * s, y - .01 * s], [x + .02 * s, y + .03 * s]]); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - .05 * s, y - .01 * s); ctx.lineTo(x + .05 * s, y - .02 * s); ctx.stroke(); ctx.fillStyle = '#f4f0e2'; ctx.fillRect(x + .1 * s, y - .06 * s, .1 * s, .06 * s); ctx.fillStyle = '#333'; ctx.fillRect(x + .115 * s, y - .04 * s, .07 * s, 2); });
    onF(-2.4, 8.7, (x, y, s) => { ctx.fillStyle = '#c84a3a'; poly(ctx, [[x - .15 * s, y], [x + .15 * s, y], [x + .19 * s, y - .32 * s], [x - .19 * s, y - .32 * s]]); ctx.fill(); ctx.fillStyle = '#8a2a20'; ctx.beginPath(); ctx.ellipse(x, y - .32 * s, .19 * s, .05 * s, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y - .32 * s, .19 * s, Math.PI, 0); ctx.stroke(); });
    onF(-.1, 8.3, (x, y, s) => { ctx.fillStyle = '#3a6aa0'; ctx.fillRect(x - .25 * s, y - .04 * s, .5 * s, .05 * s); ctx.fillStyle = '#bbb'; poly(ctx, [[x + .4 * s, y - .02 * s], [x + .62 * s, y - .06 * s], [x + .6 * s, y + .02 * s]]); ctx.fill(); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x + .3 * s, y - .035 * s, .11 * s, .03 * s); ctx.fillStyle = '#8a5a2a'; ctx.fillRect(x - .2 * s, y - .12 * s, .2 * s, .025 * s); ctx.fillStyle = '#e8d090'; ctx.fillRect(x - .02 * s, y - .13 * s, .06 * s, .045 * s); });
    ctx.restore();
    // shadow inside the near lip, and the lip edges
    { const g = ctx.createLinearGradient(0, open[2][1] - 140, 0, open[2][1]); ctx.save(); poly(ctx, open); ctx.clip(); ctx.fillStyle = 'rgba(30,20,10,.25)'; poly(ctx, [R.p(x0, 0, z0), R.p(x1, 0, z0), R.p(x1, D, z0 + 1.2), R.p(x0, D, z0 + 1.2)]); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 3; poly(ctx, open); ctx.stroke(); }
    // string grid: stakes every metre, strings across the opening
    const stake = (x, z) => { const [px, py] = R.p(x, 0, z), s = R.s(z); ctx.fillStyle = '#7a5a32'; ctx.fillRect(px - .02 * s, py - .3 * s, .04 * s, .3 * s); ctx.fillStyle = '#e04a2a'; ctx.fillRect(px - .025 * s, py - .32 * s, .05 * s, .05 * s); };
    ctx.strokeStyle = 'rgba(255,250,235,.9)'; ctx.lineWidth = 1.6; for (let x = x0; x <= x1 + .01; x += 1.04) { ctx.beginPath(); ctx.moveTo(...R.p(x, .2, z0)); ctx.lineTo(...R.p(x, .2, z1)); ctx.stroke(); } for (let z = z0; z <= z1 + .01; z += .95) { ctx.beginPath(); ctx.moveTo(...R.p(x0, .2, z)); ctx.lineTo(...R.p(x1, .2, z)); ctx.stroke(); }
    for (let x = x0; x <= x1 + .01; x += 1.04) { stake(x, z1); } for (let z = z0; z <= z1 + .01; z += .95) { stake(x0, z); stake(x1, z); }
    // ground-level tools: sieve on legs, sandbags, brushes in a tray, notebook + camera on a crate
    { const [sx, sy] = R.p(5.2, 0, 6.6), s = R.s(6.6); ctx.strokeStyle = '#5a4a3a'; ctx.lineWidth = .04 * s; for (const d of [-.4, .4]) { ctx.beginPath(); ctx.moveTo(sx + d * s, sy - .7 * s); ctx.lineTo(sx + d * 1.2 * s, sy); ctx.stroke(); } ctx.fillStyle = '#8a6a42'; ctx.fillRect(sx - .55 * s, sy - .8 * s, 1.1 * s, .12 * s); ctx.fillStyle = 'rgba(60,60,60,.6)'; for (let k = 0; k < 22; k++) ctx.fillRect(sx - .5 * s + k * .046 * s, sy - .78 * s, 1, .08 * s); ctx.fillStyle = '#c8a878'; ctx.beginPath(); ctx.ellipse(sx, sy - .03 * s, .5 * s, .1 * s, 0, 0, 7); ctx.fill(); }
    { const [bx, by] = R.p(-4.8, 0, 6.2), s = R.s(6.2); for (let k = 0; k < 5; k++) { { const ex = bx + (k % 3 - 1) * .4 * s, ey = by - (k > 2 ? .22 : 0) * s, g = ctx.createRadialGradient(ex - .06 * s, ey - .06 * s, 0, ex, ey, .26 * s); g.addColorStop(0, '#e2d2aa'); g.addColorStop(1, '#8a7650'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(ex, ey, .24 * s, .12 * s, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(90,70,40,.35)'; ctx.lineWidth = 1; for (let j = -2; j <= 2; j++) { ctx.beginPath(); ctx.moveTo(ex + j * .06 * s, ey - .1 * s); ctx.lineTo(ex + j * .06 * s, ey + .1 * s); ctx.stroke(); } } ctx.strokeStyle = 'rgba(90,70,40,.5)'; ctx.lineWidth = 2; ctx.stroke(); } }
    { const [cx2, cy2] = R.p(4.6, 0, 5.0), s = R.s(5.0); PR.panel(ctx, r, cx2 - .3 * s, cy2 - .4 * s, .6 * s, .4 * s, '#8a6a42', { gd: 40 }); PR.newspaper(ctx, r, cx2 - .05 * s, cy2 - .4 * s, s, -.1); ctx.fillStyle = '#222'; ctx.fillRect(cx2 + .12 * s, cy2 - .5 * s, .14 * s, .09 * s); ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(cx2 + .19 * s, cy2 - .455 * s, .03 * s, 0, 7); ctx.fill(); }
    for (const [gx, gy] of [[.03, .99], [.08, .97], [.95, .98], [.9, 1.0], [.98, .95]]) ENV.tuft(ctx, r, W * gx, H * gy, r.range(120, 200), ['#6a6a3a', '#8a8a4a', '#c8b878'], .1);
    ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(255,200,130,.3)'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ENV.impasto(ctx, r, W, H, { n: 120000 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .32 });
  };

  // ---- kitchen pop-in sprites, placed exactly where they sit in the kitchen2 plate
  ENV.kitchenGeo = (W, H) => { const R = new Room(null, null, W, H, { RW: 7.2, RH: 2.8, ch: 1.6, zf: 6.5, f: 1850, hor: .4 }); const zl = R.zf - .62, [wx, wy] = R.p(1.2, .08, zl), [mx, my] = R.p(1.8, .92, R.zf - .3);
    return { washer: { x: wx, y: wy, s: R.s(zl) }, micro: { x: mx, y: my, s: R.s(R.zf - .3) }, floorY: z => R.p(0, 0, z)[1], s: z => R.s(z), xAt: (x, z) => R.p(x, 0, z)[0] }; };
  ENV.fgWasher = (ctx, r, W, H) => { const g = ENV.kitchenGeo(W, H).washer; PR.washer(ctx, r, g.x, g.y, g.s * 1.08); };
  ENV.fgMicrowave = (ctx, r, W, H) => { const g = ENV.kitchenGeo(W, H).micro; PR.microwave(ctx, r, g.x, g.y, g.s * 1.1); };
  ENV.fgCar = (ctx, r, W, H) => { const x = W / 2, y = H * .72, s = 260, L = 4.2 * s; // side-view hatchback, centre (x,y) at wheel base
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(x, y + .02 * s, L * .55, .12 * s, 0, 0, 7); ctx.fill();
    const body = '#c0392b'; const g = ctx.createLinearGradient(0, y - 1.4 * s, 0, y); g.addColorStop(0, '#e86a5a'); g.addColorStop(.45, body); g.addColorStop(1, '#6a1a14'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x - L / 2, y - .25 * s); ctx.lineTo(x - L / 2 + .05 * s, y - .75 * s); ctx.quadraticCurveTo(x - L / 2 + .2 * s, y - .85 * s, x - L * .3, y - .88 * s); ctx.lineTo(x - L * .2, y - 1.35 * s); ctx.quadraticCurveTo(x - L * .1, y - 1.45 * s, x + L * .12, y - 1.42 * s); ctx.lineTo(x + L * .3, y - .92 * s); ctx.quadraticCurveTo(x + L * .48, y - .88 * s, x + L / 2, y - .6 * s); ctx.lineTo(x + L / 2, y - .25 * s); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#3a0e0a'; ctx.lineWidth = 4; ctx.stroke();
    // windows
    const wg = ctx.createLinearGradient(x - L * .2, y - 1.35 * s, x + L * .2, y - .9 * s); wg.addColorStop(0, '#a8c8e0'); wg.addColorStop(.5, '#4a6a88'); wg.addColorStop(1, '#22344a'); ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(x - L * .27, y - .9 * s); ctx.lineTo(x - L * .18, y - 1.3 * s); ctx.lineTo(x - .02 * s, y - 1.33 * s); ctx.lineTo(x - .02 * s, y - .9 * s); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + .06 * s, y - .9 * s); ctx.lineTo(x + .06 * s, y - 1.33 * s); ctx.lineTo(x + L * .11, y - 1.33 * s); ctx.lineTo(x + L * .26, y - .92 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x - L * .2, y - 1.2 * s); ctx.lineTo(x - L * .14, y - 1.3 * s); ctx.lineTo(x - L * .1, y - 1.3 * s); ctx.lineTo(x - L * .17, y - 1.12 * s); ctx.fill();
    // doors, handles, mirror, lights, trim
    ctx.strokeStyle = 'rgba(60,10,8,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + .02 * s, y - .9 * s); ctx.lineTo(x + .02 * s, y - .28 * s); ctx.moveTo(x - L * .27, y - .9 * s); ctx.lineTo(x - L * .25, y - .3 * s); ctx.stroke(); ctx.fillStyle = '#ddd'; ctx.fillRect(x - .45 * s, y - .78 * s, .22 * s, .05 * s); ctx.fillRect(x + .28 * s, y - .78 * s, .22 * s, .05 * s);
    ctx.fillStyle = '#7a1a14'; ctx.beginPath(); ctx.ellipse(x + L * .27, y - .98 * s, .1 * s, .07 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.ellipse(x + L / 2 - .08 * s, y - .58 * s, .1 * s, .07 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e82a1a'; ctx.fillRect(x - L / 2 + .02 * s, y - .72 * s, .08 * s, .18 * s);
    ctx.fillStyle = '#2a2a2a'; ctx.fillRect(x - L / 2, y - .32 * s, L, .1 * s); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.beginPath(); ctx.moveTo(x - L * .45, y - .82 * s); ctx.quadraticCurveTo(x, y - .95 * s, x + L * .45, y - .78 * s); ctx.lineTo(x + L * .45, y - .72 * s); ctx.quadraticCurveTo(x, y - .88 * s, x - L * .45, y - .76 * s); ctx.fill(); ctx.restore();
    for (const wx of [x - L * .3, x + L * .3]) { ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(wx, y - .3 * s, .36 * s, 0, 7); ctx.fill(); const rg = ctx.createRadialGradient(wx - .05 * s, y - .35 * s, 0, wx, y - .3 * s, .22 * s); rg.addColorStop(0, '#f0f0f0'); rg.addColorStop(1, '#7a7a7a'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(wx, y - .3 * s, .22 * s, 0, 7); ctx.fill(); ctx.strokeStyle = '#444'; ctx.lineWidth = 3; for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(wx + Math.cos(a) * .05 * s, y - .3 * s + Math.sin(a) * .05 * s); ctx.lineTo(wx + Math.cos(a) * .2 * s, y - .3 * s + Math.sin(a) * .2 * s); ctx.stroke(); } ctx.fillStyle = '#333'; ctx.beginPath(); ctx.arc(wx, y - .3 * s, .05 * s, 0, 7); ctx.fill(); } };
})(typeof window !== 'undefined' ? window : globalThis);
