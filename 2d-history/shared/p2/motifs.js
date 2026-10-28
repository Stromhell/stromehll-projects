// Reusable painted motifs built on engine.js. Every function takes (ctx, r, ...) and paints in place.
(function (G) {
  const P = G.P2, { hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, poly, inPoly, paintRegion } = P;
  const M = {};

  M.sky = (ctx, r, W, H, top, horizon, opts = {}) => {
    wash(ctx, r, [0, 0, W, H], top, horizon, { blobs: 220, var: 10, al: .14 });
    // horizontal brush strokes give the sky a painted surface
    fillStrokes(ctx, r, [0, 0, W, H], () => true, { n: opts.strokes ?? 2600, len: [80, 240], w: [10, 26], ang: 0, angJ: .05, al: .12,
      colFn: (x, y) => jitter(mix(top, horizon, Math.pow(y / H, .9)), r, 8) });
  };
  M.sun = (ctx, r, x, y, rad, col = '#fff2c2', haze = '#ffb15a') => { M.glowDisk(ctx, x, y, rad, col); P.glow(ctx, x, y, rad * 9, haze, .45); P.glow(ctx, x, y, rad * 3, col, .6); };
  M.glowDisk = (ctx, x, y, rad, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill(); };
  M.clouds = (ctx, r, W, yMin, yMax, n, lit, dark, opts = {}) => {
    for (let i = 0; i < n; i++) { const cx = r.range(-100, W + 100), cy = r.range(yMin, yMax), cw = r.range(220, 620) * (opts.scale ?? 1), ch = cw * r.range(.12, .22);
      for (let k = 0; k < cw * ch / 260; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); const x = cx + Math.cos(a) * d * cw / 2, y = cy + Math.sin(a) * d * ch / 2; const t = (y - (cy - ch / 2)) / ch;
        stroke(ctx, r, x, y, r.range(30, 90), r.gauss() * .08, r.range(8, 18), mix(lit, dark, Math.min(1, Math.max(0, t))), .22); } }
  };
  M.hills = (ctx, r, N, W, y0, amp, freq, seed, col, opts = {}) => { const pts = P.ridge(r, N, W, y0, amp, freq, seed); paintRegion(ctx, r, pts.map(p => [p[0], Math.min(p[1], opts.bottom ?? 1440)]), col, { density: opts.density ?? 700, len: [30, 90], w: [8, 20], ang: 0, angJ: .12, al: .35, topLight: opts.topLight ?? .06, botDark: opts.botDark ?? -.08, var: 10, rim: opts.rim }); return pts; };
  M.ground = (ctx, r, W, H, y0, near, far, opts = {}) => {
    const N = P.Noise(r.int(1, 99999)), pts = [[0, y0], [W, y0], [W, H], [0, H]];
    const patchA = opts.patchLight ?? shade(far, .18), patchB = opts.patchDark ?? shade(near, -.25);
    const colAt = (x, y) => { const t = (y - y0) / (H - y0), sc = 1 / (0.15 + t); const n = N.fbm(x * .0022 * sc * .4, (y - y0) * .012, 4);
      let c = mix(far, near, Math.pow(t, .8)); c = n > .55 ? mix(c, patchA, (n - .55) * 2.2) : mix(c, patchB, (.55 - n) * 1.4); return c; };
    ctx.save(); poly(ctx, pts); ctx.clip(); const g = ctx.createLinearGradient(0, y0, 0, H); g.addColorStop(0, rgb(hex(far))); g.addColorStop(1, rgb(hex(near))); ctx.fillStyle = g; ctx.fillRect(0, y0, W, H - y0);
    // big flat patches first, then perspective strokes on top
    for (let i = 0; i < (opts.n ?? 9000) * .25; i++) { const t = Math.pow(r(), .8), y = y0 + t * (H - y0), x = r.range(-40, W + 40); stroke(ctx, r, x, y, 60 + t * 160, r.gauss() * .12, 10 + t * 26, colAt(x, y), .22); }
    for (let i = 0; i < (opts.n ?? 9000); i++) { const t = Math.pow(r(), .8), y = y0 + t * (H - y0), x = r.range(-40, W + 40);
      stroke(ctx, r, x, y, 30 + t * 60, r.gauss() * (.05 + t * .35), 2 + t * 8, jitter(colAt(x, y), r, 14), .4); }
    // sunlit dabs
    if (opts.light) for (let i = 0; i < (opts.n ?? 9000) * .06; i++) { const t = Math.pow(r(), .8), y = y0 + t * (H - y0), x = r.range(0, W); if (N.fbm(x * .001, y * .004, 3) < .5) continue; stroke(ctx, r, x, y, 8 + t * 24, r.gauss() * .5, 2 + t * 4, jitter(opts.light, r, 10), .3); }
    ctx.restore();
  };
  M.grassTufts = (ctx, r, W, yMin, yMax, n, cols, opts = {}) => {
    const items = []; for (let i = 0; i < n; i++) items.push([r.range(-20, W + 20), r.range(yMin, yMax)]); items.sort((a, b) => a[1] - b[1]);
    for (const [x, y] of items) { const t = (y - yMin) / (yMax - yMin + 1), h = (opts.h ?? 40) * (.45 + t * 1.8) * r.range(.6, 1.3), c = r.pick(cols), blades = r.int(10, 22);
      M.contactShadow(ctx, x, y + 1, h * .45, h * .1, .3);
      for (let k = 0; k < blades; k++) { const lean = r.gauss() * .45 + (opts.wind ?? .12), L = h * r.range(.55, 1.15), bx = x + r.gauss() * h * .12, tipx = bx + Math.sin(lean) * L, tipy = y - Math.cos(lean) * L;
        const g = ctx.createLinearGradient(bx, y, tipx, tipy); g.addColorStop(0, rgb(shade(c, -.45), .9)); g.addColorStop(.6, rgb(jitter(c, r, 12), .85)); g.addColorStop(1, rgb(shade(c, opts.tipLight ?? .3), .8));
        ctx.strokeStyle = g; ctx.lineWidth = (1.2 + t * 2.6) * r.range(.7, 1.3); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, y); ctx.quadraticCurveTo(bx + Math.sin(lean) * L * .3, y - L * .55, tipx, tipy); ctx.stroke(); } }
  };
  M.grassBand = (ctx, r, W, y, thick, cols) => { // dense distant grass line along the horizon
    for (let i = 0; i < W / 2.2; i++) { const x = r.range(0, W), h = thick * r.range(.4, 1.2); stroke(ctx, r, x, y + r.range(0, thick), h, -Math.PI / 2 + r.gauss() * .25, 2, jitter(r.pick(cols), r, 12), .5, 2); }
  };
  M.acacia = (ctx, r, x, y, s, trunk, leaf, light) => {
    // trunk splits into a fan of branches, flat umbrella canopy
    ctx.save(); ctx.lineCap = 'round';
    const branches = [];
    const grow = (bx, by, ang, len, wd, depth) => { const ex = bx + Math.cos(ang) * len, ey = by + Math.sin(ang) * len; for (let k = 0; k < 4; k++) { ctx.strokeStyle = rgb(shade(trunk, -.1 + k * .06), .9); ctx.lineWidth = wd * (1 - k * .18); ctx.beginPath(); ctx.moveTo(bx + k * .8, by); ctx.quadraticCurveTo((bx + ex) / 2 + r.gauss() * len * .12, (by + ey) / 2, ex, ey); ctx.stroke(); }
      if (depth > 0) { const n = depth > 1 ? 3 : 2; for (let i = 0; i < n; i++) grow(ex, ey, ang + (i - (n - 1) / 2) * .55 + r.gauss() * .15, len * .62, wd * .6, depth - 1); } else branches.push([ex, ey]); };
    grow(x, y, -Math.PI / 2 + r.gauss() * .08, 150 * s, 22 * s, 3);
    // canopy: layered stroke clouds, dark under-side, lit top
    const cx = x, cy = Math.min(...branches.map(b => b[1])) + 10 * s, cw = 560 * s, ch = 90 * s;
    for (let pass = 0; pass < 3; pass++) for (let k = 0; k < 900 * s * s + 120; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); const px = cx + Math.cos(a) * d * cw / 2, py = cy + Math.sin(a) * d * ch / 2 - pass * 10 * s; const t = (py - (cy - ch / 2)) / ch;
      stroke(ctx, r, px, py, r.range(10, 26) * s, r.gauss() * .3, r.range(5, 11) * s, mix(pass === 2 ? light : leaf, shade(leaf, -.45), Math.max(0, Math.min(1, t * (pass === 2 ? .6 : 1)))), .55); }
    ctx.restore();
    return { top: cy - ch, bottom: y };
  };
  M.rock = (ctx, r, x, y, w, h, col, light) => { const pts = []; for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; pts.push([x + Math.cos(a) * w / 2 * r.range(.8, 1.05), y + Math.sin(a) * h * r.range(.7, 1)]); } pts.push([x + w / 2, y + 6], [x - w / 2, y + 6]);
    paintRegion(ctx, r, pts, col, { density: 120, len: [8, 22], w: [4, 9], ang: -.4, angJ: .6, al: .6, topLight: .18, botDark: -.4, rim: light, rimW: 3 }); M.contactShadow(ctx, x, y + 4, w * .6, h * .18); };
  M.contactShadow = (ctx, x, y, rx, ry, al = .35) => { ctx.save(); ctx.translate(x, y); ctx.scale(1, ry / rx); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(25,14,6,${al})`); g.addColorStop(1, 'rgba(25,14,6,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 7); ctx.fill(); ctx.restore(); };
  M.grassHut = (ctx, r, x, y, w, h, thatch, dark) => { // dome of thatch with a dark doorway
    M.contactShadow(ctx, x, y + 4, w * .62, h * .16, .45);
    const pts = []; for (let i = 0; i <= 20; i++) { const a = Math.PI + i / 20 * Math.PI; pts.push([x + Math.cos(a) * w / 2, y + Math.sin(a) * h]); }
    paintRegion(ctx, r, pts, thatch, { density: 60, len: [20, 50], w: [3, 7], ang: (px, py) => Math.atan2(py - (y - h), px - x) + Math.PI / 2 * 0 - .2, angJ: .25, al: .7, topLight: .2, botDark: -.35, var: 22 });
    ctx.save(); poly(ctx, pts); ctx.clip(); fillStrokes(ctx, r, [x - w / 2, y - h, w, h], () => true, { n: 500, len: [30, 70], w: [1.5, 3], ang: -Math.PI / 2, angJ: .5, al: .5, col: shade(thatch, -.35) }); ctx.restore();
    const dw = w * .2, dh = h * .5; ctx.fillStyle = rgb(hex(dark)); ctx.beginPath(); ctx.ellipse(x + w * .12, y, dw / 2, dh, 0, Math.PI, 0); ctx.fill();
  };
  M.campfire = (ctx, r, x, y, s, lit = true) => {
    M.contactShadow(ctx, x, y + 6 * s, 120 * s, 22 * s, .5);
    for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; M.rock(ctx, r, x + Math.cos(a) * 70 * s, y + Math.sin(a) * 18 * s, 34 * s, 22 * s, '#6d6052', '#ffb36b'); }
    ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const a = r.range(-.5, .5) + (i % 2 ? Math.PI : 0); ctx.strokeStyle = rgb(shade('#4a3020', r.range(-.2, .1))); ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * 60 * s, y + r.range(-8, 8) * s); ctx.lineTo(x + Math.cos(a) * 30 * s, y - 14 * s); ctx.stroke(); }
    if (lit) { P.glow(ctx, x, y - 30 * s, 520 * s, '#ff9a3c', .55); P.glow(ctx, x, y - 20 * s, 160 * s, '#ffd27a', .8); }
  };
  M.hide = (ctx, r, x, y, w, h, col) => { const pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; pts.push([x + Math.cos(a) * w / 2 * r.range(.8, 1.1), y + Math.sin(a) * h / 2 * r.range(.8, 1.1)]); } M.contactShadow(ctx, x, y + h * .3, w * .55, h * .25, .3); paintRegion(ctx, r, pts, col, { density: 80, len: [10, 26], w: [3, 7], ang: 0, angJ: 1, al: .6, topLight: .15, botDark: -.25, var: 20 }); };
  // Interior helpers (offices, rooms)
  M.wall = (ctx, r, box, col, opts = {}) => { const [x, y, w, h] = box; paintRegion(ctx, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, { density: opts.density ?? 500, len: [30, 90], w: [10, 24], ang: opts.ang ?? -Math.PI / 2, angJ: .2, al: .25, topLight: opts.topLight ?? -.05, botDark: opts.botDark ?? -.18, var: 9 }); };
  M.floorBoards = (ctx, r, box, col, rows = 14, vx) => { const [x, y, w, h] = box; vx = vx ?? x + w / 2; paintRegion(ctx, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, { density: 400, len: [40, 120], w: [6, 14], ang: 0, angJ: .04, al: .35, topLight: -.15, botDark: .05, var: 14 });
    ctx.save(); ctx.strokeStyle = rgb(shade(col, -.45), .5); ctx.lineWidth = 2; for (let i = -rows; i <= rows; i++) { const bx = vx + i * w / rows * 1.6; ctx.beginPath(); ctx.moveTo(vx + i * w / rows * .35, y); ctx.lineTo(bx, y + h); ctx.stroke(); } ctx.restore(); };
  M.windowGrid = (ctx, r, box, cols, rows, glass, frame, litProb = .6, litCol = '#ffd98a') => { const [x, y, w, h] = box, cw = w / cols, chh = h / rows; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const lit = r() < litProb; ctx.fillStyle = rgb(lit ? jitter(litCol, r, 20) : jitter(glass, r, 8), lit ? .9 : .85); ctx.fillRect(x + i * cw + cw * .14, y + j * chh + chh * .14, cw * .72, chh * .7); }
    ctx.strokeStyle = rgb(hex(frame), .5); ctx.lineWidth = 1.5; for (let i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(x + i * cw, y); ctx.lineTo(x + i * cw, y + h); ctx.stroke(); } };
  M.tower = (ctx, r, x, y, w, h, body, glass, opts = {}) => { paintRegion(ctx, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], body, { density: 300, len: [20, 60], w: [4, 10], ang: -Math.PI / 2, angJ: .05, al: .35, topLight: .1, botDark: -.3, var: 8 }); M.windowGrid(ctx, r, [x + w * .06, y + h * .02, w * .88, h * .96], opts.cols ?? Math.max(3, Math.round(w / 22)), opts.rows ?? Math.max(6, Math.round(h / 24)), glass, '#000', opts.lit ?? .35, opts.litCol); };

  M.bush = (ctx, r, x, y, w, h, leaf, light, opts = {}) => { M.contactShadow(ctx, x + (opts.shadowDx ?? 0), y + 2, w * .6, h * .14, .4);
    for (let k = 0; k < w * h / 40; k++) { const a = Math.PI + r() * Math.PI, d = Math.sqrt(r()); const px = x + Math.cos(a) * d * w / 2, py = y + Math.sin(a) * d * h; const t = (y - py) / h; const lit = (px - x) * (opts.lightDir ?? 1) > 0 ? .35 : 0;
      stroke(ctx, r, px, py, r.range(8, 20), r.gauss() * .6, r.range(4, 9), mix(shade(leaf, -.35), light, Math.min(1, t * .8 + lit)), .7); } };
  M.distantTrees = (ctx, r, W, y, n, col, opts = {}) => { for (let i = 0; i < n; i++) { const x = r.range(0, W), s = r.range(.5, 1) * (opts.scale ?? 1), c = rgb(jitter(col, r, 5), .92); ctx.fillStyle = c; ctx.strokeStyle = c;
      if (r() < .55) { const th = 34 * s, cw = 70 * s; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r.gauss() * 3, y - th); ctx.stroke(); for (let k = 0; k < 40; k++) { const px = x + r.gauss() * cw * .35, py = y - th - Math.abs(r.gauss()) * 7 * s; ctx.beginPath(); ctx.ellipse(px, py, 9 * s, 3.5 * s, 0, 0, 7); ctx.fill(); } }
      else { for (let k = 0; k < 30; k++) { ctx.beginPath(); ctx.ellipse(x + r.gauss() * 18 * s, y - Math.abs(r.gauss()) * 10 * s, 6 * s, 4 * s, 0, 0, 7); ctx.fill(); } } } };
  M.castShadow = (ctx, x, y, len, wd, ang, al = .28) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); const g = ctx.createLinearGradient(0, 0, len, 0); g.addColorStop(0, `rgba(40,22,10,${al})`); g.addColorStop(1, 'rgba(40,22,10,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(len / 2, 0, len / 2, wd / 2, 0, 0, 7); ctx.fill(); ctx.restore(); };
  M.fgFrame = (ctx, r, W, H, cols, opts = {}) => { // dark grass and earth masses at the bottom corners pull the eye to the middle
    for (const side of [0, 1]) { const x0 = side ? W * (1 - (opts.w ?? .28)) : 0, x1 = side ? W : W * (opts.w ?? .28);
      for (let i = 0; i < 2600; i++) { const x = r.range(x0, x1), edge = side ? (x - x0) / (x1 - x0) : 1 - (x - x0) / (x1 - x0), y = H - r() * H * (opts.h ?? .2) * edge; const c = shade(r.pick(cols), -.35 - edge * .2);
        stroke(ctx, r, x, y + 30, r.range(40, 140) * edge + 30, -Math.PI / 2 + r.gauss() * .4 + (side ? -.15 : .15), r.range(2, 5), c, .8, 2); } } };
  G.M2 = M;
})(typeof window !== 'undefined' ? window : globalThis);
