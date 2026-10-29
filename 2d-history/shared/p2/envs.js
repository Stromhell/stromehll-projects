// Detailed painted environments (2560x1440 plates). Each env takes (ctx, r, W, H, opts) and paints a full plate.
// Built on engine.js (P2) and motifs.js (M2). Characters are drawn live by the act pages, never here.
(function (G) {
  const P = G.P2, M = G.M2, { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, poly, paintRegion } = P;
  const ENV = {};
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // ---------- texture helpers ----------
  // Per-pixel noise texture inside a y-band with perspective: colour from a ramp of palette stops by fbm value.
  ENV.texBand = (ctx, r, W, y0, y1, stops, opts = {}) => {
    const N = P.Noise(r.int(1, 1e6)), N2 = P.Noise(r.int(1, 1e6)), H = Math.ceil(y1 - y0);
    const img = ctx.getImageData(0, y0, W, H), d = img.data, S = stops.map(s => [s[0], hex(s[1])]);
    const ramp = v => { for (let i = 1; i < S.length; i++) if (v <= S[i][0]) { const t = (v - S[i - 1][0]) / (S[i][0] - S[i - 1][0]); return mix(S[i - 1][1], S[i][1], clamp(t)); } return S[S.length - 1][1]; };
    const sx = opts.sx ?? .004, persp = opts.persp ?? 1, al = opts.al ?? 1;
    for (let y = 0; y < H; y++) { const t = y / H, k = 1 / (.12 + t * persp); const near = opts.near ? opts.near(t) : 0;
      for (let x = 0; x < W; x++) { const i = (y * W + x) * 4;
        const v = N.fbm(x * sx * k * .55, (y + y0) * sx * 4.2 * k * .55, 5) * .75 + N2(x * .05 * k, y * .2 * k) * .25;
        const c = ramp(clamp(v + near)); const g = (Math.random() - .5) * 10;
        d[i] = d[i] * (1 - al) + (c[0] + g) * al; d[i + 1] = d[i + 1] * (1 - al) + (c[1] + g) * al; d[i + 2] = d[i + 2] * (1 - al) + (c[2] + g * .8) * al; d[i + 3] = 255; } }
    ctx.putImageData(img, 0, y0);
  };
  // thin curved blades of dry grass in clumps, depth sorted; cols are [dark, mid, light]
  ENV.grass = (ctx, r, W, yMin, yMax, n, cols, opts = {}) => {
    const items = []; for (let i = 0; i < n; i++) { const it = [r.range(-30, W + 30), yMin + Math.pow(r(), opts.bias ?? .7) * (yMax - yMin)]; if (opts.keep && !opts.keep(it[0], it[1])) continue; items.push(it); } items.sort((a, b) => a[1] - b[1]);
    ctx.lineCap = 'round';
    for (const [x, y] of items) { const t = opts.hz != null ? (y - opts.hz) / (opts.H - opts.hz) : (y - yMin) / (yMax - yMin + 1), h = (opts.h ?? 46) * (.3 + t * 2.2) * r.range(.55, 1.35), blades = r.int(opts.bl?.[0] ?? 14, opts.bl?.[1] ?? 34), spread = h * r.range(.18, .42);
      M.contactShadow(ctx, x + (opts.shadowDx ?? 0) * h * .2, y + 1, h * .5, h * .09, .25);
      for (let k = 0; k < blades; k++) { const lean = r.gauss() * .5 + (opts.wind ?? .14), L = h * r.range(.45, 1.2), bx = x + r.gauss() * spread, tipx = bx + Math.sin(lean) * L, tipy = y - Math.cos(lean) * L * r.range(.85, 1);
        const lit = r() < (opts.litFrac ?? .35); const g = ctx.createLinearGradient(bx, y, tipx, tipy);
        g.addColorStop(0, rgb(jitter(cols[0], r, 8), .95)); g.addColorStop(.55, rgb(jitter(cols[1], r, 14), .9)); g.addColorStop(1, rgb(jitter(lit ? cols[2] : cols[1], r, 12), .85));
        ctx.strokeStyle = g; ctx.lineWidth = (.7 + t * 2.4) * r.range(.6, 1.3); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(bx + Math.sin(lean) * L * .25, y - L * .6, tipx, tipy); ctx.stroke();
        if (opts.seeds && r() < .08) { ctx.strokeStyle = rgb(jitter(cols[2], r, 10), .85); ctx.lineWidth = (1.4 + t * 2.5); ctx.beginPath(); ctx.moveTo(tipx, tipy); ctx.lineTo(tipx + Math.sin(lean) * L * .12, tipy - L * .12); ctx.stroke(); } } }
  };
  // fine grass carpet: tiny blades everywhere, scaled by depth, so the ground reads as a dry grass field
  ENV.carpet = (ctx, r, W, yMin, yMax, n, cols, opts = {}) => { ctx.lineCap = 'round'; const N = P.Noise(r.int(1, 1e6));
    for (let i = 0; i < n; i++) { const t = Math.pow(r(), opts.bias ?? .85), y = yMin + t * (yMax - yMin), x = r.range(-10, W + 10), dens = N.fbm(x * .002, y * .006, 3); if (r() > dens * 1.6 - .1) continue;
      const L = (2 + t * 26) * r.range(.5, 1.4), a = -Math.PI / 2 + r.gauss() * .35 + .1, k = r(); const col = k < .45 ? cols[0] : k < .85 ? cols[1] : cols[2];
      ctx.strokeStyle = rgb(jitter(col, r, 14), r.range(.35, .8)); ctx.lineWidth = .5 + t * 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.stroke(); } };
  ENV.tuft = (ctx, r, x, y, h, cols, wind = .1) => { ctx.lineCap = 'round'; const blades = r.int(26, 50);
    for (let k = 0; k < blades; k++) { const lean = r.gauss() * .5 + wind, L = h * r.range(.4, 1.15), bx = x + r.gauss() * h * .3, tipx = bx + Math.sin(lean) * L, tipy = y - Math.cos(lean) * L;
      const g = ctx.createLinearGradient(bx, y, tipx, tipy); g.addColorStop(0, rgb(jitter(cols[0], r, 8))); g.addColorStop(.6, rgb(jitter(cols[1], r, 12))); g.addColorStop(1, rgb(jitter(r() < .4 ? cols[2] : cols[1], r, 12), .9));
      ctx.strokeStyle = g; ctx.lineWidth = r.range(1.5, 4.5); ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(bx + Math.sin(lean) * L * .2, y - L * .6, tipx, tipy); ctx.stroke(); } };
  ENV.pebbles = (ctx, r, W, yMin, yMax, n, col, light) => { for (let i = 0; i < n; i++) { const y = yMin + Math.pow(r(), .8) * (yMax - yMin), t = (y - yMin) / (yMax - yMin), x = r.range(0, W), s = (1.5 + t * 9) * r.range(.5, 1.6);
    M.contactShadow(ctx, x + s * .4, y + s * .3, s * 1.3, s * .45, .35); ctx.fillStyle = rgb(jitter(col, r, 16)); ctx.beginPath(); ctx.ellipse(x, y, s, s * .6, r.gauss() * .3, 0, 7); ctx.fill();
    ctx.fillStyle = rgb(jitter(light, r, 10), .55); ctx.beginPath(); ctx.ellipse(x + s * .25, y - s * .2, s * .5, s * .25, 0, 0, 7); ctx.fill(); } };
  // wavy dark cracks / twigs scattered on ground
  ENV.twigs = (ctx, r, W, yMin, yMax, n, col) => { ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const y = yMin + Math.pow(r(), .8) * (yMax - yMin), t = (y - yMin) / (yMax - yMin), x = r.range(0, W), L = (10 + t * 70) * r.range(.5, 1.4), a = r.gauss() * .4;
    ctx.strokeStyle = rgb(jitter(col, r, 12), .8); ctx.lineWidth = .8 + t * 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + L * .5, y + r.gauss() * L * .1, x + Math.cos(a) * L, y + Math.sin(a) * L * .3); ctx.stroke();
    if (r() < .5) { ctx.beginPath(); ctx.moveTo(x + L * .4, y); ctx.lineTo(x + L * .55, y - L * .2); ctx.stroke(); } } };
  // detailed acacia: branching trunk, several canopy clumps with dark undersides and lit tops, sky holes
  ENV.acacia = (ctx, r, x, y, s, c) => {
    ctx.save(); ctx.lineCap = 'round'; const tips = [];
    const grow = (bx, by, ang, len, wd, depth) => { const ex = bx + Math.cos(ang) * len, ey = by + Math.sin(ang) * len, mx = (bx + ex) / 2 + r.gauss() * len * .15, my = (by + ey) / 2;
      for (let k = 0; k < 5; k++) { ctx.strokeStyle = rgb(shade(c.trunk, -.25 + k * .09), .95); ctx.lineWidth = wd * (1 - k * .16); ctx.beginPath(); ctx.moveTo(bx + (k - 2) * wd * .08, by); ctx.quadraticCurveTo(mx + (k - 2) * wd * .08, my, ex, ey); ctx.stroke(); }
      ctx.strokeStyle = rgb(c.light, .35); ctx.lineWidth = Math.max(1, wd * .18); ctx.beginPath(); ctx.moveTo(bx + wd * .3, by); ctx.quadraticCurveTo(mx + wd * .3, my, ex + wd * .1, ey); ctx.stroke();
      if (depth > 0) { const n = depth > 2 ? 2 : r.int(2, 3); for (let i = 0; i < n; i++) grow(ex, ey, ang + (i - (n - 1) / 2) * r.range(.45, .75) + r.gauss() * .12, len * r.range(.55, .72), wd * .62, depth - 1); } else tips.push([ex, ey]); };
    grow(x, y, -Math.PI / 2 + r.gauss() * .06, 170 * s, 26 * s, 4);
    const top = Math.min(...tips.map(t => t[1]));
    // clumps around the branch tips
    const clumps = tips.map(([tx, ty]) => [tx + r.gauss() * 26 * s, Math.min(ty, top + 70 * s) - r.range(0, 30) * s, r.range(60, 120) * s, r.range(18, 34) * s]);
    for (const pass of [0, 1, 2]) for (const [cx, cy, cw, ch] of clumps) { const n = Math.round(cw * ch / (pass === 0 ? 30 : 55));
      for (let k = 0; k < n; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); const px = cx + Math.cos(a) * d * cw, py = cy + Math.sin(a) * d * ch - pass * 6 * s, tt = clamp((py - (cy - ch)) / (ch * 2));
        const col = pass === 0 ? shade(c.leaf, -.5) : pass === 1 ? mix(c.leaf, shade(c.leaf, -.4), tt) : mix(c.light, c.leaf, clamp(tt * 1.6));
        if (pass === 2 && tt > .55) continue; stroke(ctx, r, px, py, r.range(6, 15) * s, r.gauss() * .4, r.range(3, 6) * s, col, pass === 0 ? .7 : .6, 3); } }
    // sky holes through the canopy
    for (let k = 0; k < 40 * s; k++) { const cl = r.pick(clumps); ctx.fillStyle = rgb(jitter(c.sky, r, 6), .8); ctx.beginPath(); ctx.ellipse(cl[0] + r.gauss() * cl[2] * .5, cl[1] + r.gauss() * cl[3] * .3, r.range(2, 6) * s, r.range(1.5, 3.5) * s, 0, 0, 7); ctx.fill(); }
    ctx.restore(); return { top };
  };
  // thatched hut: dome with layered thatch rows, stick frame showing at the door, lit side
  ENV.hut = (ctx, r, x, y, w, h, c) => {
    M.castShadow(ctx, x + w * .1, y + 4, w * 1.4, h * .45, c.shadowAng ?? Math.PI * .98, .35); M.contactShadow(ctx, x, y + 4, w * .62, h * .14, .5);
    const pts = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; pts.push([x + Math.cos(a) * w / 2 * (1 + r.gauss() * .01), y + Math.sin(a) * h * (1 + r.gauss() * .015)]); }
    ctx.save(); poly(ctx, pts); ctx.clip();
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, rgb(shade(c.thatch, c.litLeft ? .15 : -.35))); g.addColorStop(1, rgb(shade(c.thatch, c.litLeft ? -.35 : .15))); ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h);
    const rows = Math.round(h / 9);
    for (let row = 0; row < rows; row++) { const yy = y - h + (row + .5) * h / rows; const half = w / 2 * Math.sqrt(Math.max(0, 1 - Math.pow((y - yy) / h, 2)));
      for (let k = 0; k < half * 2 / 2.2; k++) { const xx = x - half + r() * half * 2, side = (xx - x) / (w / 2), lit = c.litLeft ? -side : side;
        const col = shade(jitter(c.thatch, r, 18), lit * .28 - .05 - (row / rows) * .12); ctx.strokeStyle = rgb(col, .8); ctx.lineWidth = r.range(1, 2.4);
        ctx.beginPath(); ctx.moveTo(xx, yy - 8); ctx.lineTo(xx + side * 3 + r.gauss() * 1.5, yy + 10 + r() * 6); ctx.stroke(); }
      ctx.strokeStyle = rgb(shade(c.thatch, -.5), .35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - half, yy + 9); ctx.quadraticCurveTo(x, yy + 12, x + half, yy + 9); ctx.stroke(); }
    ctx.restore();
    // doorway with stick frame and inner dark
    const dx = x + w * (c.door ?? .14), dw = w * .19, dh = h * .55; ctx.fillStyle = rgb(hex('#170d07')); ctx.beginPath(); ctx.ellipse(dx, y, dw / 2, dh, 0, Math.PI, 0); ctx.fill();
    ctx.strokeStyle = rgb(hex('#5a3f22')); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(dx, y, dw / 2, dh, 0, Math.PI, 0); ctx.stroke();
    if (c.glowDoor) glow(ctx, dx, y - dh * .3, dw, '#ff9a4a', .35);
    // loose straw at the base
    for (let k = 0; k < w / 3; k++) { const xx = x + r.gauss() * w * .4, yy = y + r.range(-2, 6); ctx.strokeStyle = rgb(jitter(c.thatch, r, 16), .8); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + r.gauss() * 10, yy - r.range(2, 9)); ctx.stroke(); }
  };
  ENV.woodpile = (ctx, r, x, y, s, col = '#6b4a2c') => { M.contactShadow(ctx, x, y + 4 * s, 70 * s, 12 * s, .45); ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const a = r.gauss() * .25 + (i % 2 ? .1 : -.1), L = r.range(70, 110) * s, yy = y - (i % 4) * 7 * s - r() * 3 * s, xx = x + r.gauss() * 18 * s;
      ctx.strokeStyle = rgb(shade(col, r.range(-.35, .05))); ctx.lineWidth = r.range(7, 11) * s; ctx.beginPath(); ctx.moveTo(xx - Math.cos(a) * L / 2, yy - Math.sin(a) * L / 2); ctx.lineTo(xx + Math.cos(a) * L / 2, yy + Math.sin(a) * L / 2); ctx.stroke();
      ctx.strokeStyle = rgb(shade(col, .25), .5); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(xx - Math.cos(a) * L / 2, yy - Math.sin(a) * L / 2 - 3 * s); ctx.lineTo(xx + Math.cos(a) * L / 2, yy + Math.sin(a) * L / 2 - 3 * s); ctx.stroke();
      ctx.fillStyle = rgb(hex('#c9a06a')); ctx.beginPath(); ctx.ellipse(xx + Math.cos(a) * L / 2, yy + Math.sin(a) * L / 2, 3.5 * s, 4.5 * s, 0, 0, 7); ctx.fill(); } };
  ENV.pot = (ctx, r, x, y, s, col = '#9a5a32') => { M.contactShadow(ctx, x, y, 34 * s, 7 * s, .45); const g = ctx.createRadialGradient(x - 10 * s, y - 34 * s, 4 * s, x, y - 24 * s, 34 * s); g.addColorStop(0, rgb(shade(col, .3))); g.addColorStop(1, rgb(shade(col, -.45)));
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y - 22 * s, 30 * s, 24 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = rgb(shade(col, -.2)); ctx.fillRect(x - 13 * s, y - 52 * s, 26 * s, 10 * s); ctx.fillStyle = rgb(hex('#1b0f08')); ctx.beginPath(); ctx.ellipse(x, y - 52 * s, 13 * s, 4 * s, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = rgb(shade(col, -.5), .5); ctx.lineWidth = 1.5 * s; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(x, y - 30 * s + k * 6 * s, 27 * s, 6 * s, 0, .2, Math.PI - .2); ctx.stroke(); } };
  // drying rack with a stretched hide
  ENV.rack = (ctx, r, x, y, s, hide = '#8b5e3a') => { ctx.lineCap = 'round'; ctx.strokeStyle = rgb(hex('#4a3220')); ctx.lineWidth = 6 * s;
    for (const dx of [-70, 70]) { ctx.beginPath(); ctx.moveTo(x + dx * s, y); ctx.lineTo(x + dx * s * .9, y - 150 * s); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(x - 80 * s, y - 140 * s); ctx.lineTo(x + 80 * s, y - 145 * s); ctx.stroke(); M.contactShadow(ctx, x, y + 3, 90 * s, 12 * s, .4);
    const pts = [[x - 55 * s, y - 132 * s], [x + 55 * s, y - 136 * s], [x + 62 * s, y - 70 * s], [x + 40 * s, y - 30 * s], [x - 42 * s, y - 28 * s], [x - 60 * s, y - 75 * s]];
    paintRegion(ctx, r, pts, hide, { density: 40, len: [8, 20], w: [3, 6], ang: 0, angJ: 1, al: .6, topLight: .15, botDark: -.3, var: 24 });
    ctx.strokeStyle = rgb(hex('#3a2616'), .8); ctx.lineWidth = 1.5 * s; for (const [px, py] of pts) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + (px < x ? -12 : 12) * s, py + (py < y - 100 * s ? -6 : 4) * s); ctx.stroke(); } };
  ENV.termiteMound = (ctx, r, x, y, s, col = '#a0643a') => { M.castShadow(ctx, x, y, 220 * s, 40 * s, Math.PI * .98, .3); const pts = [[x - 50 * s, y], [x - 34 * s, y - 80 * s], [x - 20 * s, y - 150 * s], [x - 6 * s, y - 210 * s], [x + 8 * s, y - 175 * s], [x + 22 * s, y - 120 * s], [x + 30 * s, y - 60 * s], [x + 58 * s, y]];
    paintRegion(ctx, r, pts, col, { density: 50, len: [8, 24], w: [3, 8], ang: -Math.PI / 2, angJ: .5, al: .6, topLight: .2, botDark: -.3, var: 18 }); };
  // tiny animal silhouettes for the far plain (antelope/zebra-like)
  ENV.herd = (ctx, r, x0, x1, y, n, s, col) => { for (let i = 0; i < n; i++) { const x = r.range(x0, x1), yy = y + r.range(-6, 6) * s, k = s * r.range(.8, 1.1), f = r() < .5 ? 1 : -1; ctx.fillStyle = rgb(jitter(col, r, 6), .9); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1.6 * k;
    ctx.beginPath(); ctx.ellipse(x, yy - 9 * k, 9 * k, 4 * k, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(x + f * 7 * k, yy - 11 * k); ctx.lineTo(x + f * 12 * k, yy - 18 * k); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + f * 13 * k, yy - 19 * k, 3 * k, 2 * k, 0, 0, 7); ctx.fill();
    for (const lx of [-6, -3, 4, 7]) { ctx.beginPath(); ctx.moveTo(x + lx * k, yy - 7 * k); ctx.lineTo(x + lx * k + r.gauss(), yy); ctx.stroke(); } } };
  ENV.birds = (ctx, r, x0, x1, y0, y1, n, col, s = 1) => { ctx.lineCap = 'round'; for (let i = 0; i < n; i++) { const x = r.range(x0, x1), y = r.range(y0, y1), w = r.range(6, 14) * s; ctx.strokeStyle = rgb(col, .7); ctx.lineWidth = 1.6 * s; ctx.beginPath(); ctx.moveTo(x - w, y - w * .3); ctx.quadraticCurveTo(x - w * .4, y - w * .5, x, y); ctx.quadraticCurveTo(x + w * .4, y - w * .5, x + w, y - w * .3); ctx.stroke(); } };
  ENV.smoke = (ctx, r, x, y, h, col, al = .18) => { for (let k = 0; k < 160; k++) { const t = Math.pow(r(), .8), yy = y - t * h, xx = x + Math.sin(t * 4 + r()) * t * h * .12 + t * h * .15 + r.gauss() * (6 + t * 40), rad = 8 + t * 60;
    const g = ctx.createRadialGradient(xx, yy, 0, xx, yy, rad); g.addColorStop(0, rgb(hex(col), al * (1 - t))); g.addColorStop(1, rgb(hex(col), 0)); ctx.fillStyle = g; ctx.fillRect(xx - rad, yy - rad, rad * 2, rad * 2); } };
  // soft painted cloud bank with lit tops
  ENV.clouds = (ctx, r, W, yMin, yMax, n, lit, mid, dark, opts = {}) => { for (let i = 0; i < n; i++) { const cx = r.range(-200, W + 200), cy = r.range(yMin, yMax), cw = r.range(260, 760) * (opts.scale ?? 1), ch = cw * r.range(.1, .2), bumps = r.int(4, 9);
    for (let b = 0; b < bumps; b++) { const bx = cx + (b / (bumps - 1) - .5) * cw * .8 + r.gauss() * 20, by = cy - Math.sin(b / (bumps - 1) * Math.PI) * ch * .5, br = ch * r.range(.5, .9);
      for (let k = 0; k < br * br / 35; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()), px = bx + Math.cos(a) * d * br * 1.3, py = by + Math.sin(a) * d * br * .8, tt = clamp((py - (by - br)) / (br * 1.8));
        stroke(ctx, r, px, py, r.range(14, 40), r.gauss() * .15, r.range(5, 12), tt < .35 ? mix(lit, mid, tt / .35) : mix(mid, dark, (tt - .35) / .65), .2); } } } };

  // ---------- SAVANNA ----------
  // opts.tod: dawn | noon | dusk | night ; opts.camp: draw huts/fire camp ; opts.trees: list of [x,yFrac,scale] ; opts.horizon (frac)
  const SAV = {
    dawn: { skyTop: '#4d6a96', skyBot: '#f6b876', sun: ['#fff4d0', '#ff9f55'], sunPos: [.72, .56], hillFar: '#857a98', hillNear: '#8f7663', ground: [[0, '#5e4220'], [.35, '#8f6a3a'], [.6, '#b98f55'], [.8, '#d1a868'], [1, '#e4c189']], grass: ['#5b4322', '#a07c44', '#f0c98a'], cloud: ['#ffd9aa', '#b58f9a', '#6f6688'], leaf: '#4f5a2c', light: '#d8c27a', trunk: '#3d2a1c', haze: '#ffb070', shadowAng: Math.PI * .985, litLeft: false },
    noon: { skyTop: '#3f78b5', skyBot: '#cfe0e6', sun: ['#fffbe8', '#fff1c0'], sunPos: [.3, .1], hillFar: '#8aa0b4', hillNear: '#9a8a6a', ground: [[0, '#6e5428'], [.35, '#a38448'], [.6, '#c9a964'], [.8, '#dcc07e'], [1, '#ecd7a0']], grass: ['#6a5428', '#b5964e', '#f4e2a6'], cloud: ['#ffffff', '#dfe7ee', '#9fb1c4'], leaf: '#55652f', light: '#c9cf7a', trunk: '#3d2a1c', haze: '#fff6dc', shadowAng: Math.PI * .55, litLeft: true },
    dusk: { skyTop: '#2c2f5a', skyBot: '#f08a4b', sun: ['#ffe2a8', '#ff7a3a'], sunPos: [.24, .58], hillFar: '#5e4f70', hillNear: '#6a4a40', ground: [[0, '#3e2814'], [.35, '#6e4a26'], [.6, '#9a6a3a'], [.8, '#b98048'], [1, '#c98f52']], grass: ['#3d2a16', '#8a5f32', '#ffb46a'], cloud: ['#ffc48a', '#c0607a', '#4a3a60'], leaf: '#3a3e22', light: '#e0a050', trunk: '#2a1a10', haze: '#ff8a40', shadowAng: Math.PI * .02 + 0, litLeft: true },
    night: { skyTop: '#070b1c', skyBot: '#1f2a4a', sun: null, moon: [.78, .16], hillFar: '#1c2238', hillNear: '#1a1a24', ground: [[0, '#0e0d10'], [.25, '#1a181e'], [.5, '#24212a'], [.75, '#2e2a34'], [1, '#38343e']], grass: ['#0d0c10', '#2a2834', '#5a6280'], cloud: ['#4a5478', '#2a3150', '#121a30'], leaf: '#151a1c', light: '#4a5670', trunk: '#0f0c0c', haze: '#30406a', shadowAng: Math.PI * .5, litLeft: false },
  };
  ENV.savanna = (ctx, r, W, H, opts = {}) => {
    const c = SAV[opts.tod || 'dawn'], hz = H * (opts.horizon ?? .62), N = P.Noise(r.int(1, 99999));
    // sky
    M.sky(ctx, r, W, hz + 40, c.skyTop, c.skyBot, { strokes: 3200 });
    if (c.moon) { for (let i = 0; i < 900; i++) { const x = r.range(0, W), y = Math.pow(r(), 1.4) * hz * .95, s = r() < .04 ? 2.2 : r.range(.6, 1.4); ctx.fillStyle = `rgba(235,240,255,${r.range(.3, .95)})`; ctx.fillRect(x, y, s, s); }
      const mx = W * c.moon[0], my = H * c.moon[1]; glow(ctx, mx, my, 420, '#9fb0e0', .25); M.glowDisk(ctx, mx, my, 44, '#f2f0e4'); ctx.fillStyle = 'rgba(160,160,170,.35)'; for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.arc(mx + r.gauss() * 18, my + r.gauss() * 18, r.range(4, 10), 0, 7); ctx.fill(); }
      glow(ctx, W * .5, hz, W * .6, '#3a4a80', .2); }
    const [sx, sy] = c.sun ? [W * c.sunPos[0], H * c.sunPos[1]] : [0, 0];
    if (c.sun) glow(ctx, sx, sy, W * .55, c.haze, .32);
    ENV.clouds(ctx, r, W, H * .06, hz * .62, opts.clouds ?? 14, ...c.cloud);
    if (c.sun) { M.sun(ctx, r, sx, sy, opts.tod === 'noon' ? 38 : 50, c.sun[0], c.sun[1]); if (opts.tod !== 'noon') P.rays(ctx, r, sx, sy, 26, W * .9, c.sun[0], .035, 2.6, -Math.PI / 2); }
    ENV.birds(ctx, r, W * .1, W * .9, H * .12, hz * .6, opts.birds ?? 9, c.moon ? [20, 24, 40] : [40, 30, 30], 1.2);
    // distance layers with atmospheric fade
    M.hills(ctx, r, N, W, hz - 30, 120, .0011, 3, c.hillFar, { topLight: .1, botDark: .02, density: 600 });
    M.hills(ctx, r, N, W, hz - 4, 55, .0026, 9, mix(c.hillNear, c.hillFar, .35), { topLight: .08, botDark: -.05, rim: c.sun ? c.sun[0] : null });
    M.distantTrees(ctx, r, W, hz + 2, 46, shade(mix(c.hillNear, c.leaf, .5), -.15));
    ENV.herd(ctx, r, W * .55, W * .8, hz + 14, opts.herd ?? 14, 1, shade(c.hillNear, -.35));
    // ground: per-pixel painted texture, then directional strokes, then Kuwahara later
    ENV.texBand(ctx, r, W, Math.round(hz), H, c.ground, { sx: .0035, persp: 1.1, near: t => -t * .15 });
    fillStrokes(ctx, r, [0, hz, W, H - hz], () => true, { n: 9000, len: [10, 60], w: [2, 8], ang: 0, angJ: .08, al: .18, colFn: (x, y) => { const t = (y - hz) / (H - hz); return jitter(c.ground[Math.min(4, 1 + Math.floor(N(x * .004, y * .01) * 4))][1], r, 14); } });
    if (c.sun && opts.tod !== 'noon') { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const g = ctx.createRadialGradient(sx, hz, 0, sx, hz, W * .7); g.addColorStop(0, rgb(hex(c.sun[0]), .55)); g.addColorStop(1, rgb(hex(c.sun[0]), 0)); ctx.fillStyle = g; ctx.fillRect(0, hz, W, H - hz); ctx.restore(); }
    // dirt path winding to the camp
    if (opts.path !== false) { ctx.save(); ctx.globalAlpha = .45; for (let k = 0; k < 1400; k++) { const t = r(), px = W * (.5 + Math.sin(t * 3.2) * .08 * t) + r.gauss() * (6 + t * 70), py = hz + 40 + t * (H - hz - 40); stroke(ctx, r, px, py, 10 + t * 40, r.gauss() * .2, 2 + t * 6, shade(c.ground[3][1], .1 + r.gauss() * .08), .35); } ctx.restore(); }
    P.kuwahara(ctx, W, H, 4);
    ENV.carpet(ctx, r, W, hz + 2, H, opts.carpet ?? 70000, c.grass);
    ENV.pebbles(ctx, r, W, hz + 20, H, 260, shade(c.ground[2][1], -.25), shade(c.ground[4][1], .25));
    ENV.twigs(ctx, r, W, hz + 30, H, 160, shade(c.ground[1][1], -.3));
    ENV.grass(ctx, r, W, hz + 4, hz + 60, 520, c.grass, { h: 14, bl: [6, 14], bias: 1 });
    // mid-ground: bushes, termite mound, acacias
    for (let i = 0; i < (opts.bushes ?? 18); i++) { const x = r.range(0, W), y = r.range(hz + 30, hz + (H - hz) * .3), s = .5 + (y - hz) / (H - hz) * 2.2; M.castShadow(ctx, x, y, 170 * s, 24 * s, c.shadowAng); M.bush(ctx, r, x, y, 110 * s, 56 * s, c.leaf, c.light, { lightDir: c.litLeft ? -1 : 1 }); }
    if (opts.mound) ENV.termiteMound(ctx, r, W * (opts.moundX ?? .83), hz + (H - hz) * .2, 1.1, shade(c.ground[2][1], -.05));
    for (const [tx, ty, ts] of (opts.trees ?? [[.18, .74, 1.35], [.9, .675, .55], [.66, .655, .3]])) { const y = H * ty; M.castShadow(ctx, W * tx, y, 1000 * ts, 90 * ts, c.shadowAng, .3); ENV.acacia(ctx, r, W * tx, y, ts, { trunk: c.trunk, leaf: c.leaf, light: c.light, sky: mix(c.skyBot, c.skyTop, .3) }); }
    // tufts behind the camp line, then the camp, then tufts in front
    const campY = opts.camp !== false ? H * (opts.campAt?.[1] ?? .79) - 60 : hz + 60; const st = opts.stage ?? [.34, .66, .84, 1];
    const keep = (x, y) => !(x > W * st[0] && x < W * st[1] && y > H * st[2] && y < H * st[3] && r() < .8);
    const rr = P.RNG(r.int(1, 1e6)), tuftN = opts.tufts ?? 360; ENV.grass(ctx, rr, W, hz + 60, campY, Math.round(tuftN * (campY - hz - 60) / (H * .97 - hz - 60)), c.grass, { h: 42, seeds: true, wind: .16, bias: 1, keep, hz: hz + 60, H: H * .97 });
    // camp
    if (opts.camp !== false) {
      const camp = opts.campAt ?? [.48, .79]; const cx = W * camp[0], cy = H * camp[1];
      ENV.hut(ctx, r, cx, cy, 300, 175, { thatch: opts.tod === 'night' ? '#3a3226' : '#b08a52', litLeft: c.litLeft, shadowAng: c.shadowAng, glowDoor: opts.tod === 'night' || opts.tod === 'dusk' });
      ENV.hut(ctx, r, cx + 360, cy - 50, 220, 125, { thatch: opts.tod === 'night' ? '#3a3226' : '#b8935c', litLeft: c.litLeft, shadowAng: c.shadowAng, door: -.1 });
      ENV.hut(ctx, r, cx - 520, cy - 70, 180, 100, { thatch: opts.tod === 'night' ? '#332c22' : '#a98550', litLeft: c.litLeft, shadowAng: c.shadowAng });
      ENV.woodpile(ctx, r, cx + 230, cy + 30, 1.1); ENV.pot(ctx, r, cx - 210, cy + 20, 1.1); ENV.pot(ctx, r, cx - 160, cy + 34, .8, '#7a4a2a'); ENV.rack(ctx, r, cx + 560, cy + 20, 1.2);
      if (opts.smoke !== false) ENV.smoke(ctx, r, W * (opts.fireAt?.[0] ?? .42), H * (opts.fireAt?.[1] ?? .9) - 40, 520, opts.tod === 'night' ? '#6a6a80' : '#e8dccb', .12);
    }
    ENV.grass(ctx, rr, W, campY, H * .97, Math.round(tuftN * (H * .97 - campY) / (H * .97 - hz - 60)), c.grass, { h: 42, seeds: true, wind: .16, bias: 1, keep, hz: hz + 60, H: H * .97 });
    for (const side of [0, 1]) { ctx.save(); const items = []; for (let i = 0; i < 70; i++) { const u = Math.pow(r(), 1.3); items.push([side ? W - u * W * .3 : u * W * .3, H * 1.02 - (1 - u) * H * .12 * r()]); }
      for (const [gx, gy] of items.sort((a, b) => a[1] - b[1])) ENV.grass(ctx, r, W, gy, gy + 1, 0, c.grass), ENV.tuft(ctx, r, gx, gy, r.range(120, 230), [shade(c.grass[0], -.3), shade(c.grass[1], -.25), c.grass[2]], side ? -.15 : .15); ctx.restore(); }
    if (c.sun) glow(ctx, sx, sy, W * .7, c.haze, opts.tod === 'noon' ? .06 : .14);
    if (opts.tod === 'night' || opts.tod === 'dusk') { const v = ctx.createLinearGradient(0, 0, 0, H); v.addColorStop(0, 'rgba(10,10,30,0)'); v.addColorStop(1, `rgba(10,10,30,${opts.tod === 'night' ? .35 : .15})`); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); }
    P.finish(ctx, r, W, H, { grain: 5, vig: .4, oil: opts.oil ?? 0, canvas: 8 });
  };
  G.ENV = ENV;
})(typeof window !== 'undefined' ? window : globalThis);

// ---------- INTERIORS ----------
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { hex, rgb, mix, jitter, shade, stroke, fillStrokes, glow, poly, paintRegion } = P;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  // painted flat box with soft gradient, bristle texture, ink-ish edge and highlight
  ENV.box = (ctx, r, x, y, w, h, col, o = {}) => { paintRegion(ctx, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, { density: o.density ?? 120, len: o.len ?? [10, 40], w: [3, 8], ang: o.ang ?? 0, angJ: .15, al: .3, topLight: o.top ?? .08, botDark: o.bot ?? -.2, var: o.var ?? 8 });
    if (o.edge !== false) { ctx.strokeStyle = rgb(shade(col, -.55), .55); ctx.lineWidth = o.ew ?? 2.5; ctx.strokeRect(x, y, w, h); }
    if (o.hi) { ctx.fillStyle = rgb(shade(col, .35), .5); ctx.fillRect(x + 3, y + 3, w - 6, Math.max(2, h * .04)); } };
  ENV.wallTex = (ctx, r, x, y, w, h, col, opts = {}) => { M.wall(ctx, r, [x, y, w, h], col, { density: 260, topLight: opts.top ?? .02, botDark: opts.bot ?? -.2 });
    if (opts.stripes) { ctx.save(); ctx.globalAlpha = .07; for (let i = 0; i < w / opts.stripes; i++) { ctx.fillStyle = rgb(shade(col, i % 2 ? .3 : -.3)); ctx.fillRect(x + i * opts.stripes, y, opts.stripes / 2, h); } ctx.restore(); } };
  ENV.window = (ctx, r, x, y, w, h, view, o = {}) => { // view(ctx,x,y,w,h) paints what is outside
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); view(ctx, x, y, w, h); ctx.restore();
    const fr = o.frame ?? '#e8e0d0'; ctx.fillStyle = rgb(shade(fr, -.1)); ctx.fillRect(x - 14, y - 14, w + 28, 14); ctx.fillRect(x - 14, y + h, w + 28, 22); ctx.fillRect(x - 14, y, 14, h); ctx.fillRect(x + w, y, 14, h); ctx.fillRect(x + w / 2 - 6, y, 12, h); ctx.fillRect(x, y + h / 2 - 5, w, 10);
    ctx.fillStyle = rgb(shade(fr, .2), .6); ctx.fillRect(x - 14, y + h, w + 28, 5);
    if (o.curtain) for (const side of [0, 1]) { const cx = side ? x + w + 10 : x - 120; const pts = [[cx, y - 40], [cx + 110, y - 40], [cx + (side ? 70 : 110), y + h + 60], [cx + (side ? 0 : 40), y + h + 60]];
      paintRegion(ctx, r, pts, o.curtain, { density: 30, len: [30, 80], w: [4, 10], ang: Math.PI / 2, angJ: .05, al: .55, topLight: .1, botDark: -.3, var: 14 });
      ctx.strokeStyle = rgb(shade(o.curtain, -.45), .5); ctx.lineWidth = 3; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(cx + k * 22, y - 40); ctx.lineTo(cx + k * 22 + (side ? -8 : 8), y + h + 60); ctx.stroke(); } }
    if (o.light) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(x, y, x + o.light[0], y + o.light[1]); g.addColorStop(0, rgb(hex(o.lightCol || '#ffe6b0'), .22)); g.addColorStop(1, rgb(hex(o.lightCol || '#ffe6b0'), 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w + o.light[0], y + h + o.light[1]); ctx.lineTo(x + o.light[0], y + h + o.light[1]); ctx.closePath(); ctx.fill(); ctx.restore(); } };
  ENV.view = { dawnCity: (ctx, x, y, w, h) => { const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2b3a5e'); g.addColorStop(1, '#c98a6a'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); for (let i = 0; i < 14; i++) { const bx = x + i * w / 12 - 20, bh = h * (.25 + ((i * 37) % 10) / 22); ctx.fillStyle = '#26283a'; ctx.fillRect(bx, y + h - bh, w / 14, bh); for (let k = 0; k < 10; k++) if ((i * 7 + k * 3) % 5 === 0) { ctx.fillStyle = 'rgba(255,214,140,.8)'; ctx.fillRect(bx + 6 + (k % 3) * 10, y + h - bh + 10 + k * 14, 5, 6); } } },
    nightCity: (ctx, x, y, w, h) => { ctx.fillStyle = '#0d1226'; ctx.fillRect(x, y, w, h); for (let i = 0; i < 16; i++) { const bx = x + i * w / 14 - 20, bh = h * (.3 + ((i * 37) % 10) / 18); ctx.fillStyle = '#171a2c'; ctx.fillRect(bx, y + h - bh, w / 16, bh); for (let k = 0; k < 18; k++) if ((i * 5 + k * 7) % 4 === 0) { ctx.fillStyle = 'rgba(255,214,140,.85)'; ctx.fillRect(bx + 4 + (k % 3) * 9, y + h - bh + 8 + k * 11, 4, 5); } } },
    daySky: (ctx, x, y, w, h) => { const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#7fa8d0'); g.addColorStop(1, '#dfe8e8'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#9fb59a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x + i * w / 8, y + h, w / 9, h * .25, 0, 0, 7); ctx.fill(); } } };
  ENV.frameArt = (ctx, r, x, y, w, h, o = {}) => { ctx.fillStyle = rgb(hex(o.frame || '#4a3424')); ctx.fillRect(x - 10, y - 10, w + 20, h + 20); const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, o.a || '#b88a5a'); g.addColorStop(1, o.b || '#5a6a7a'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    for (let k = 0; k < 60; k++) stroke(ctx, r, x + r() * w, y + r() * h, r.range(8, 30), r.gauss(), r.range(3, 8), jitter(r() < .5 ? (o.a || '#b88a5a') : (o.b || '#5a6a7a'), r, 30), .5); ctx.strokeStyle = 'rgba(255,240,210,.25)'; ctx.lineWidth = 2; ctx.strokeRect(x - 10, y - 10, w + 20, h + 20); };
  ENV.shelf = (ctx, r, x, y, w, rows = 3, rowH = 110) => { for (let k = 0; k < rows; k++) { const yy = y + k * rowH; ENV.box(ctx, r, x, yy + rowH - 14, w, 14, '#6b4a30', { edge: false }); let bx = x + 6;
    while (bx < x + w - 20) { const bw = r.range(14, 30), bh = rowH * r.range(.55, .85), col = r.pick(['#7a2e2a', '#2f4a6a', '#3e5a3a', '#8a6a3a', '#5a3a5a', '#c9b48a', '#2a2a2a']); if (r() < .1) { bx += 30; continue; }
      ctx.fillStyle = rgb(jitter(col, r, 12)); ctx.fillRect(bx, yy + rowH - 14 - bh, bw, bh); ctx.fillStyle = rgb(shade(col, .3), .6); ctx.fillRect(bx + 2, yy + rowH - 14 - bh + 8, bw - 4, 3); ctx.fillRect(bx + 2, yy + rowH - 30, bw - 4, 3); ctx.strokeStyle = rgb(shade(col, -.5), .7); ctx.lineWidth = 1.2; ctx.strokeRect(bx, yy + rowH - 14 - bh, bw, bh); bx += bw + 1; } } };
  ENV.plant = (ctx, r, x, y, s = 1) => { ENV.pot(ctx, r, x, y, s * .9, '#a0603a'); for (let k = 0; k < 22; k++) { const a = -Math.PI / 2 + r.gauss() * .7, L = r.range(60, 140) * s, ex = x + Math.cos(a) * L, ey = y - 46 * s + Math.sin(a) * L; ctx.strokeStyle = rgb(hex('#2e4a26')); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x, y - 46 * s); ctx.quadraticCurveTo(x + Math.cos(a) * L * .4, y - 46 * s + Math.sin(a) * L * .7, ex, ey); ctx.stroke();
    ctx.fillStyle = rgb(jitter(r() < .5 ? '#3f6a32' : '#5a8a44', r, 14)); ctx.beginPath(); ctx.ellipse(ex, ey, 18 * s, 7 * s, a, 0, 7); ctx.fill(); } };
  ENV.lamp = (ctx, r, x, y, s = 1, on = true) => { ctx.fillStyle = '#2a2420'; ctx.fillRect(x - 3 * s, y - 120 * s, 6 * s, 120 * s); ctx.beginPath(); ctx.ellipse(x, y, 30 * s, 8 * s, 0, 0, 7); ctx.fill(); ctx.fillStyle = on ? '#f0d49a' : '#cdbb98'; ctx.beginPath(); ctx.moveTo(x - 30 * s, y - 120 * s); ctx.lineTo(x + 30 * s, y - 120 * s); ctx.lineTo(x + 20 * s, y - 175 * s); ctx.lineTo(x - 20 * s, y - 175 * s); ctx.closePath(); ctx.fill(); if (on) glow(ctx, x, y - 140 * s, 320 * s, '#ffcf80', .4); };
  ENV.rug = (ctx, r, cx, cy, w, h, a, b) => { ctx.save(); ctx.translate(cx, cy); ctx.scale(1, h / w); ctx.fillStyle = rgb(hex(a)); ctx.beginPath(); ctx.ellipse(0, 0, w / 2, w / 2, 0, 0, 7); ctx.fill(); ctx.strokeStyle = rgb(hex(b), .8); for (let k = 1; k < 5; k++) { ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, 0, w / 2 - k * 40, w / 2 - k * 40, 0, 0, 7); ctx.stroke(); } ctx.restore();
    fillStrokes(ctx, r, [cx - w / 2, cy - h / 2, w, h], (x, y) => Math.pow((x - cx) / (w / 2), 2) + Math.pow((y - cy) / (h / 2), 2) < 1, { n: 900, len: [6, 18], w: [2, 4], ang: 0, angJ: 1, al: .2, col: shade(a, .15) }); };
  // ---- bedroom: dark early morning, cold blue, bed in the middle, phone on nightstand
  ENV.bedroom = (ctx, r, W, H, o = {}) => { const night = o.dark ?? true, fy = H * .66;
    ENV.wallTex(ctx, r, 0, 0, W, fy, night ? '#3b4660' : '#c9b9a0', { stripes: 46 }); ENV.box(ctx, r, 0, fy - 24, W, 28, night ? '#2a3046' : '#e8dcc8', { edge: false });
    M.floorBoards(ctx, r, [0, fy, W, H - fy], night ? '#3a3036' : '#8a6444', 18);
    ENV.window(ctx, r, W * .62, H * .12, 520, 520, night ? ENV.view.dawnCity : ENV.view.daySky, { curtain: night ? '#4a4f78' : '#c98a6a', light: [-500, 700], lightCol: night ? '#9fb4e0' : '#ffe6b0' });
    ENV.frameArt(ctx, r, W * .14, H * .14, 260, 190, { a: '#8a6a5a', b: '#3a4a6a' }); ENV.frameArt(ctx, r, W * .27, H * .2, 160, 220, { a: '#6a7a5a', b: '#2a3a4a' });
    ENV.rug(ctx, r, W * .42, H * .9, 1300, 260, night ? '#4a3a4a' : '#8a4a3a', night ? '#6a5a7a' : '#d9b48a');
    // bed: headboard, mattress, duvet with folds, pillows
    const bx = W * .2, bw = W * .44, by = fy + 40; ENV.box(ctx, r, bx - 20, fy - 260, bw + 40, 300, night ? '#3a2a24' : '#6a4a30', { hi: true });
    ENV.box(ctx, r, bx, by - 60, bw, 120, night ? '#c9cde0' : '#f2ede2', { edge: true, bot: -.35 });
    const duv = [[bx - 10, by - 40], [bx + bw + 10, by - 40], [bx + bw + 30, by + 150], [bx - 30, by + 150]]; paintRegion(ctx, r, duv, night ? '#5a6a98' : '#8aa0c8', { density: 60, len: [30, 120], w: [6, 16], ang: .1, angJ: .4, al: .45, topLight: .15, botDark: -.35, var: 14 });
    ctx.strokeStyle = rgb(hex(night ? '#2a3458' : '#5a6a90'), .55); ctx.lineWidth = 4; for (let k = 0; k < 7; k++) { const x0 = bx + r.range(40, bw - 40); ctx.beginPath(); ctx.moveTo(x0, by - 30); ctx.quadraticCurveTo(x0 + r.gauss() * 60, by + 60, x0 + r.gauss() * 80, by + 145); ctx.stroke(); }
    for (const px of [bx + bw * .22, bx + bw * .62]) { ctx.fillStyle = rgb(hex(night ? '#d8dcec' : '#fbf7ee')); ctx.beginPath(); ctx.ellipse(px, by - 75, 120, 42, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(40,40,60,.35)'; ctx.lineWidth = 3; ctx.stroke(); }
    // nightstand + lamp (off) + phone spot (phone drawn live) + clock
    ENV.box(ctx, r, bx + bw + 60, fy - 60, 200, 220, night ? '#3a2a24' : '#7a5236', { hi: true }); ENV.box(ctx, r, bx + bw + 80, fy + 10, 160, 50, night ? '#2a1e1a' : '#5a3a26'); ENV.lamp(ctx, r, bx + bw + 200, fy - 60, 1, false);
    ENV.shelf(ctx, r, W * .82, H * .2, 300, 3, 120); ENV.plant(ctx, r, W * .9, fy + 120, 1.2);
    if (night) { const v = ctx.createLinearGradient(0, 0, W, 0); v.addColorStop(0, 'rgba(8,10,30,.45)'); v.addColorStop(1, 'rgba(8,10,30,.1)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); }
    P.finish(ctx, r, W, H, { grain: 6, vig: .5, oil: 2, canvas: 8 });
  };
  // ---- kitchen: counter, tiles, cabinets, appliances
  ENV.kitchen = (ctx, r, W, H, o = {}) => { const fy = H * .7;
    ENV.wallTex(ctx, r, 0, 0, W, fy, '#d8cdb4'); // tiles
    ctx.strokeStyle = 'rgba(120,100,80,.25)'; ctx.lineWidth = 2; for (let y = H * .38; y < H * .62; y += 44) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x, H * .38); ctx.lineTo(x, H * .62); ctx.stroke(); }
    for (let i = 0; i < 6; i++) ENV.box(ctx, r, 120 + i * 270, H * .06, 250, 300, '#7a5a3e', { hi: true }); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#c9b48a'; ctx.fillRect(120 + i * 270 + 210, H * .06 + 140, 10, 40); }
    ENV.window(ctx, r, W * .72, H * .1, 520, 360, ENV.view.daySky, { light: [-400, 600] });
    M.floorBoards(ctx, r, [0, fy, W, H - fy], '#8a7050', 14); ENV.box(ctx, r, 0, H * .6, W, 40, '#e8e2d6', { hi: true }); for (let i = 0; i < 9; i++) ENV.box(ctx, r, i * 290, H * .62 + 40, 280, fy - H * .62 - 30 + 40, '#6a4e36', { hi: true });
    ENV.plant(ctx, r, W * .62, H * .6, .9); ENV.pot(ctx, r, W * .3, H * .6, .8, '#5a6a7a'); for (let k = 0; k < 5; k++) ENV.box(ctx, r, W * .5 + k * 26, H * .6 - 90 - (k % 2) * 20, 20, 90 + (k % 2) * 20, r.pick(['#c9a06a', '#7a8a6a', '#8a4a3a']), {});
    P.finish(ctx, r, W, H, { grain: 6, vig: .42, oil: 2, canvas: 8 });
  };
  // ---- office: open plan, desks with monitors, ceiling lights, window wall
  ENV.office = (ctx, r, W, H, o = {}) => { const fy = H * .62, night = o.night;
    ENV.wallTex(ctx, r, 0, 0, W, fy, night ? '#2a3040' : '#b8bcc0');
    for (let i = 0; i < 4; i++) ENV.window(ctx, r, 160 + i * 600, H * .1, 480, H * .38, night ? ENV.view.nightCity : ENV.view.dawnCity, { frame: night ? '#3a3e48' : '#d0d2d4' });
    for (let i = 0; i < 7; i++) { const x = 100 + i * 380; ctx.fillStyle = night ? '#e8eef8' : '#fbfbf6'; ctx.fillRect(x, 20, 260, 18); glow(ctx, x + 130, 40, 300, night ? '#c8d8ff' : '#fff6e0', night ? .35 : .2); }
    M.floorBoards(ctx, r, [0, fy, W, H - fy], night ? '#3a3a42' : '#7a7a80', 10);
    for (const [y, s] of [[fy + 40, .7], [fy + 200, 1]]) for (let i = 0; i < 5; i++) { const x = 120 + i * 520 + (s < 1 ? 200 : 0); ENV.box(ctx, r, x, y - 120 * s, 420 * s, 14 * s, '#c8b89a', { hi: true }); ctx.fillStyle = '#3a3a3a'; ctx.fillRect(x + 30 * s, y - 106 * s, 10 * s, 106 * s); ctx.fillRect(x + 380 * s, y - 106 * s, 10 * s, 106 * s);
      ENV.box(ctx, r, x + 150 * s, y - 250 * s, 160 * s, 110 * s, '#1e2228', { edge: true }); ctx.fillStyle = night ? 'rgba(120,180,255,.75)' : 'rgba(150,190,230,.6)'; ctx.fillRect(x + 158 * s, y - 242 * s, 144 * s, 94 * s); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(x + 222 * s, y - 140 * s, 16 * s, 20 * s);
      ENV.box(ctx, r, x - 20 * s, y - 330 * s, 14 * s, 330 * s, '#8a8f99', { edge: false }); }
    if (night) { ctx.fillStyle = 'rgba(10,14,30,.35)'; ctx.fillRect(0, 0, W, H); }
    P.finish(ctx, r, W, H, { grain: 6, vig: .45, oil: 2, canvas: 8 });
  };
})(typeof window !== 'undefined' ? window : globalThis);
