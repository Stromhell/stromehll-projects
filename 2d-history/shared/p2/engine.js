// p2 painter engine: painterly backgrounds drawn with bristle strokes on canvas.
// Works in the browser (act pages, plate painter). All randomness is seeded so plates are repeatable.
(function (G) {
  function RNG(seed) { let s = (seed >>> 0) || 1; const r = () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; r.range = (a, b) => a + (b - a) * r(); r.int = (a, b) => Math.floor(r.range(a, b + 1)); r.pick = a => a[Math.floor(r() * a.length)]; r.gauss = () => (r() + r() + r() + r() - 2) / 2; return r; }

  // colour helpers
  function hex(c) { c = c.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join(''); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; }
  function rgb(a, al = 1) { return `rgba(${a[0] | 0},${a[1] | 0},${a[2] | 0},${al})`; }
  function mix(a, b, t) { a = typeof a === 'string' ? hex(a) : a; b = typeof b === 'string' ? hex(b) : b; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function jitter(c, r, amt) { c = typeof c === 'string' ? hex(c) : c; const k = r.gauss() * amt; return [c[0] + k + r.gauss() * amt * .4, c[1] + k + r.gauss() * amt * .4, c[2] + k + r.gauss() * amt * .4]; }
  function shade(c, f) { c = typeof c === 'string' ? hex(c) : c; return f < 0 ? mix(c, [12, 8, 6], -f) : mix(c, [255, 248, 235], f); }

  // smooth value noise (for fbm masks)
  function Noise(seed) { const r = RNG(seed), p = new Uint8Array(512), g = new Float32Array(256); for (let i = 0; i < 256; i++) { p[i] = i; g[i] = r(); } for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 256; i++) p[i + 256] = p[i];
    const f = t => t * t * (3 - 2 * t); const n2 = (x, y) => { const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255, xf = x - Math.floor(x), yf = y - Math.floor(y); const a = g[p[p[xi] + yi]], b = g[p[p[xi + 1] + yi]], c = g[p[p[xi] + yi + 1]], d = g[p[p[xi + 1] + yi + 1]]; const u = f(xf), v = f(yf); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; };
    n2.fbm = (x, y, o = 4) => { let s = 0, a = .5, fr = 1, n = 0; for (let i = 0; i < o; i++) { s += a * n2(x * fr, y * fr); n += a; a *= .5; fr *= 2.03; } return s / n; }; return n2; }

  // A single bristle stroke: several thin parallel hairs along a gently curved path, each with its own alpha and colour drift.
  function stroke(ctx, r, x, y, len, ang, w, col, al = .5, hairs) {
    hairs = hairs || Math.max(3, Math.round(w / 2.2));
    const bend = r.gauss() * .25, nx = Math.cos(ang + Math.PI / 2), ny = Math.sin(ang + Math.PI / 2);
    ctx.lineCap = 'round';
    for (let h = 0; h < hairs; h++) {
      const off = (h / (hairs - 1 || 1) - .5) * w, c = jitter(col, r, 9), a = al * r.range(.35, 1);
      const L = len * r.range(.7, 1), sx = x + nx * off, sy = y + ny * off;
      ctx.strokeStyle = rgb(c, a); ctx.lineWidth = Math.max(.8, w / hairs * r.range(.8, 1.9));
      ctx.beginPath(); ctx.moveTo(sx, sy);
      const mx = sx + Math.cos(ang + bend) * L * .5, my = sy + Math.sin(ang + bend) * L * .5;
      ctx.quadraticCurveTo(mx, my, sx + Math.cos(ang) * L, sy + Math.sin(ang) * L); ctx.stroke();
    }
  }
  // Fill a region (given as a test function in(x,y)) with strokes following an angle field.
  function fillStrokes(ctx, r, box, inside, opts) {
    const { n = 2000, len = [20, 60], w = [6, 16], col, al = .45, ang = 0, angJ = .25, colFn } = opts;
    for (let i = 0; i < n; i++) {
      const x = r.range(box[0], box[0] + box[2]), y = r.range(box[1], box[1] + box[3]);
      if (!inside(x, y)) continue;
      const a = (typeof ang === 'function' ? ang(x, y) : ang) + r.gauss() * angJ;
      stroke(ctx, r, x, y, r.range(len[0], len[1]), a, r.range(w[0], w[1]), colFn ? colFn(x, y) : col, al);
    }
  }
  // Soft wash: many big translucent blobs over a gradient: reads as wet paint.
  function wash(ctx, r, box, top, bot, opts = {}) {
    const [x, y, w, h] = box, g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, rgb(hex(top))); g.addColorStop(1, rgb(hex(bot))); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    const n = opts.blobs ?? 160;
    for (let i = 0; i < n; i++) { const bx = r.range(x, x + w), by = r.range(y, y + h), t = (by - y) / h, c = jitter(mix(top, bot, t), r, opts.var ?? 14), rad = r.range(w * .03, w * .14);
      const rg = ctx.createRadialGradient(bx, by, 0, bx, by, rad); rg.addColorStop(0, rgb(c, opts.al ?? .16)); rg.addColorStop(1, rgb(c, 0)); ctx.fillStyle = rg; ctx.fillRect(bx - rad, by - rad, rad * 2, rad * 2); }
  }
  function glow(ctx, x, y, rad, col, al = .5, comp = 'screen') {
    ctx.save(); ctx.globalCompositeOperation = comp; const g = ctx.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, rgb(hex(col), al)); g.addColorStop(.45, rgb(hex(col), al * .35)); g.addColorStop(1, rgb(hex(col), 0)); ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2); ctx.restore();
  }
  function rays(ctx, r, x, y, n, len, col, al = .08, spread = 1.2, dir = Math.PI / 2) {
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < n; i++) { const a = dir + (i / (n - 1) - .5) * spread + r.gauss() * .03, wd = r.range(.01, .04); const g = ctx.createLinearGradient(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len); g.addColorStop(0, rgb(hex(col), al)); g.addColorStop(1, rgb(hex(col), 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - wd) * len, y + Math.sin(a - wd) * len); ctx.lineTo(x + Math.cos(a + wd) * len, y + Math.sin(a + wd) * len); ctx.fill(); }
    ctx.restore();
  }
  // Paper / canvas grain, plus a soft vignette. Applied last.
  function finish(ctx, r, W, H, opts = {}) {
    if (opts.oil !== 0) kuwahara(ctx, W, H, opts.oil ?? 5);
    if (opts.canvas !== 0) canvasTexture(ctx, r, W, H, opts.canvas ?? 10);
    const img = ctx.getImageData(0, 0, W, H), d = img.data, amt = opts.grain ?? 10;
    const N = Noise(r.int(1, 1e6));
    for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) { const i = (y * W + x) * 4; const weave = (N(x * .9, y * .9) - .5) * amt * .9 + (Math.random() - .5) * amt * .7; d[i] += weave; d[i + 1] += weave; d[i + 2] += weave; }
    ctx.putImageData(img, 0, 0);
    const v = ctx.createRadialGradient(W / 2, H * .5, Math.min(W, H) * .35, W / 2, H * .5, Math.max(W, H) * .75); v.addColorStop(0, 'rgba(20,12,6,0)'); v.addColorStop(1, `rgba(20,12,6,${opts.vig ?? .38})`); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  }
  // Polygon helpers
  function poly(ctx, pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.closePath(); }
  function inPoly(pts) { return (x, y) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; }; }
  function ridge(r, N, W, y0, amp, freq, seed, pts = 9) { // returns polygon of a hill/mountain ridge closed to the bottom
    const out = [[0, 99999]]; for (let i = 0; i <= 120; i++) { const x = i / 120 * W; out.push([x, y0 - amp * N.fbm(x * freq + seed, seed * .37, 5)]); } out.push([W, 99999]); return out;
  }
  // Paint a region: base fill, darker bottom/side gradient for form, then bristle strokes in local colours.
  function paintRegion(ctx, r, pts, base, opts = {}) {
    const ins = inPoly(pts); let minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9; for (const [x, y] of pts) { minx = Math.min(minx, x); miny = Math.min(miny, y); maxx = Math.max(maxx, x); maxy = Math.max(maxy, Math.min(y, opts.bottom ?? 1e5)); }
    ctx.save(); poly(ctx, pts); ctx.clip();
    const g = ctx.createLinearGradient(0, miny, 0, maxy); g.addColorStop(0, rgb(shade(base, opts.topLight ?? .08))); g.addColorStop(1, rgb(shade(base, opts.botDark ?? -.25))); ctx.fillStyle = g; ctx.fillRect(minx, miny, maxx - minx, maxy - miny);
    const box = [minx, miny, maxx - minx, maxy - miny];
    const area = box[2] * box[3];
    fillStrokes(ctx, r, box, ins, { n: Math.round(area / (opts.density ?? 900)), len: opts.len ?? [18, 70], w: opts.w ?? [5, 14], ang: opts.ang ?? 0, angJ: opts.angJ ?? .3, al: opts.al ?? .4,
      colFn: opts.colFn || ((x, y) => { const t = (y - miny) / (maxy - miny + 1); return shade(jitter(base, r, opts.var ?? 16), (opts.topLight ?? .08) - t * ((opts.topLight ?? .08) - (opts.botDark ?? -.25))); }) });
    if (opts.rim) { ctx.globalCompositeOperation = 'screen'; ctx.lineWidth = opts.rimW ?? 6; ctx.strokeStyle = rgb(hex(opts.rim), .35); poly(ctx, pts); ctx.stroke(); }
    ctx.restore();
  }

  // Kuwahara oil-paint filter using summed-area tables: each pixel takes the mean of its calmest quadrant.
  // Turns stroke-built images into flat, brushy paint patches with crisp edges.
  function kuwahara(ctx, W, H, rad = 6) {
    const img = ctx.getImageData(0, 0, W, H), d = img.data, W1 = W + 1, n = W1 * (H + 1);
    const S = [new Float64Array(n), new Float64Array(n), new Float64Array(n)], L2 = new Float64Array(n);
    for (let y = 1; y <= H; y++) { let r0 = 0, g0 = 0, b0 = 0, l0 = 0; for (let x = 1; x <= W; x++) { const i = ((y - 1) * W + (x - 1)) * 4, R = d[i], Gc = d[i + 1], B = d[i + 2], l = (R * .3 + Gc * .59 + B * .11); r0 += R; g0 += Gc; b0 += B; l0 += l * l; const k = y * W1 + x, u = k - W1; S[0][k] = S[0][u] + r0; S[1][k] = S[1][u] + g0; S[2][k] = S[2][u] + b0; L2[k] = L2[u] + l0; } }
    const box = (A, x0, y0, x1, y1) => A[y1 * W1 + x1] - A[y0 * W1 + x1] - A[y1 * W1 + x0] + A[y0 * W1 + x0];
    const out = new Uint8ClampedArray(d.length);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let best = 1e18, br = 0, bg = 0, bb = 0;
      for (let q = 0; q < 4; q++) { const x0 = Math.max(0, q & 1 ? x : x - rad), x1 = Math.min(W, q & 1 ? x + rad + 1 : x + 1), y0 = Math.max(0, q & 2 ? y : y - rad), y1 = Math.min(H, q & 2 ? y + rad + 1 : y + 1), c = (x1 - x0) * (y1 - y0);
        const R = box(S[0], x0, y0, x1, y1) / c, Gc = box(S[1], x0, y0, x1, y1) / c, B = box(S[2], x0, y0, x1, y1) / c, l = R * .3 + Gc * .59 + B * .11, v = box(L2, x0, y0, x1, y1) / c - l * l;
        if (v < best) { best = v; br = R; bg = Gc; bb = B; } }
      const i = (y * W + x) * 4; out[i] = br; out[i + 1] = bg; out[i + 2] = bb; out[i + 3] = 255; }
    img.data.set(out); ctx.putImageData(img, 0, 0);
  }
  // Canvas weave texture + directional relief so the flat patches read as paint on canvas.
  function canvasTexture(ctx, r, W, H, amt = 12) {
    const img = ctx.getImageData(0, 0, W, H), d = img.data, N = Noise(r.int(1, 1e6));
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; const weave = ((x % 4 < 2) ^ (y % 4 < 2) ? 1 : -1) * amt * .18; const n = (N(x * .35, y * .35) - .5) * amt + (N(x * .04, y * .04) - .5) * amt * .8; const k = weave + n; d[i] += k; d[i + 1] += k; d[i + 2] += k * .9; }
    ctx.putImageData(img, 0, 0);
  }
  G.P2 = { kuwahara, canvasTexture, RNG, Noise, hex, rgb, mix, jitter, shade, stroke, fillStrokes, wash, glow, rays, finish, poly, inPoly, ridge, paintRegion };
})(typeof window !== 'undefined' ? window : globalThis);
