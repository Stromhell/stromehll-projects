// Village painterly style: drawing engine.
// Everything is drawn as a pure function of time t, so the same code plays live and renders to video.
(function (G) {
  const S = G.S = {};
  S.W = 1280; S.H = 720;
  S.TAU = Math.PI * 2;
  S.D = Math.PI / 180;

  S.rng = function (seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  };
  S.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  S.lerp = (a, b, u) => a + (b - a) * u;
  S.ss = t => { t = S.clamp(t); return t * t * (3 - 2 * t); };
  S.seg = (t, a, b) => S.clamp((t - a) / (b - a));
  // eased window: rises over [a,b], falls over [c,d]
  S.win = (t, a, b, c, d) => S.ss(S.seg(t, a, b)) * (1 - S.ss(S.seg(t, c, d)));

  const hex = h => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
  const toHex = a => '#' + a.map(v => Math.round(S.clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  S.mix = (a, b, u) => { const A = hex(a), B = hex(b); return toHex(A.map((v, i) => v + (B[i] - v) * u)); };
  S.rgba = (h, a) => { const A = hex(h); return `rgba(${A[0]},${A[1]},${A[2]},${a})`; };
  S.off = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; };

  // smooth 1D value noise in 0..1
  S.noise = (x, seed = 0) => {
    const i = Math.floor(x), f = x - i;
    const h = n => { const s = Math.sin((n + seed * 57.13) * 127.1) * 43758.5453; return s - Math.floor(s); };
    const u = f * f * (3 - 2 * f);
    return h(i) * (1 - u) + h(i + 1) * u;
  };
  S.fbm = (x, seed = 0) => (S.noise(x, seed) * .6 + S.noise(x * 2.1, seed + 3) * .3 + S.noise(x * 4.3, seed + 7) * .1);

  // ---------- painterly marks ----------
  // Irregular soft blob, used as a brush dab.
  S.blob = (c, x, y, r, sq, ang, rnd) => {
    c.save(); c.translate(x, y); c.rotate(ang); c.scale(1, sq);
    c.beginPath();
    const k = 9, pts = [];
    for (let j = 0; j < k; j++) { const a = j / k * S.TAU, rr = r * (0.78 + 0.36 * rnd()); pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    for (let j = 0; j <= k; j++) {
      const p = pts[j % k], q = pts[(j + 1) % k], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      j ? c.quadraticCurveTo(p[0], p[1], m[0], m[1]) : c.moveTo(m[0], m[1]);
    }
    c.closePath(); c.fill(); c.restore();
  };
  // Many dabs in a box. o: {x,y,w,h,n,cols,r0,r1,a0,a1,sq,ang,jit,seed,mask(x,y)}
  S.dabs = (c, o) => {
    const r = S.rng(o.seed || 1);
    for (let i = 0; i < o.n; i++) {
      const x = o.x + r() * o.w, y = o.y + r() * o.h;
      const rad = S.lerp(o.r0, o.r1, r()), al = S.lerp(o.a0 ?? .04, o.a1 ?? .16, r()), col = o.cols[Math.floor(r() * o.cols.length)], an = (o.ang || 0) + (r() - .5) * (o.jit ?? .5);
      if (o.mask && !o.mask(x, y)) continue;
      c.globalAlpha = al; c.fillStyle = col;
      S.blob(c, x, y, rad, o.sq ?? .45, an, r);
    }
    c.globalAlpha = 1;
  };
  // Directional brush strokes (for straw, grass texture, wood grain)
  S.strokes = (c, o) => {
    const r = S.rng(o.seed || 2);
    c.lineCap = 'round';
    for (let i = 0; i < o.n; i++) {
      const x = o.x + r() * o.w, y = o.y + r() * o.h;
      if (o.mask && !o.mask(x, y)) continue;
      const len = S.lerp(o.l0, o.l1, r()), an = (o.ang || 0) + (r() - .5) * (o.jit ?? .3);
      c.globalAlpha = S.lerp(o.a0 ?? .2, o.a1 ?? .6, r()); c.strokeStyle = o.cols[Math.floor(r() * o.cols.length)];
      c.lineWidth = S.lerp(o.w0 ?? 1, o.w1 ?? 3, r());
      const bx = Math.cos(an) * len, by = Math.sin(an) * len, bend = (r() - .5) * len * (o.bend ?? .25);
      c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + bx / 2 - by / len * bend, y + by / 2 + bx / len * bend, x + bx, y + by); c.stroke();
    }
    c.globalAlpha = 1;
  };
  S.glow = (c, x, y, r, col, a = 1, op = 'lighter') => {
    c.save(); c.globalCompositeOperation = op; c.globalAlpha = a;
    const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, S.rgba(col.length === 7 ? col : '#000000', 0));
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore();
  };
  // Soft light beam: quad from a narrow source to a wide end.
  S.beam = (c, x0, y0, x1, y1, w0, w1, col, a) => {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = a;
    const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, S.rgba(col, .9)); g.addColorStop(1, S.rgba(col, 0));
    c.fillStyle = g; c.beginPath();
    c.moveTo(x0 + nx * w0, y0 + ny * w0); c.lineTo(x1 + nx * w1, y1 + ny * w1); c.lineTo(x1 - nx * w1, y1 - ny * w1); c.lineTo(x0 - nx * w0, y0 - ny * w0); c.closePath();
    c.filter = 'blur(6px)'; c.fill(); c.restore();
  };
  // Paper grain + subtle tooth, shared by every scene
  let GRAIN;
  S.grain = (c, a = .07) => {
    if (!GRAIN) GRAIN = S.off(512, 512, (g, w, h) => {
      const id = g.createImageData(w, h), r = S.rng(99);
      for (let i = 0; i < w * h; i++) { const v = 128 + (r() - .5) * 90; id.data[i * 4] = v; id.data[i * 4 + 1] = v; id.data[i * 4 + 2] = v; id.data[i * 4 + 3] = 255; }
      g.putImageData(id, 0, 0);
    });
    c.save(); c.globalCompositeOperation = 'overlay'; c.globalAlpha = a;
    for (let x = 0; x < S.W; x += 512) for (let y = 0; y < S.H; y += 512) c.drawImage(GRAIN, x, y);
    c.restore();
  };
  S.vignette = (c, a = .45, col = '#120a06') => {
    const g = c.createRadialGradient(S.W / 2, S.H / 2, S.H * .35, S.W / 2, S.H / 2, S.H * .95);
    g.addColorStop(0, S.rgba(col, 0)); g.addColorStop(1, S.rgba(col, a));
    c.fillStyle = g; c.fillRect(0, 0, S.W, S.H);
  };
  S.grade = (c, col, a, op = 'soft-light') => { c.save(); c.globalCompositeOperation = op; c.globalAlpha = a; c.fillStyle = col; c.fillRect(0, 0, S.W, S.H); c.restore(); };

  // ---------- shapes ----------
  // Quadratic through B (soft joint). k<1 keeps the curve a little inside the joint.
  S.bez = (A, B, C, n = 14, k = .75) => {
    const m = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], P = [B[0] + (B[0] - m[0]) * k, B[1] + (B[1] - m[1]) * k];
    const out = [];
    for (let i = 0; i <= n; i++) { const u = i / n, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), d = u * u; out.push([a * A[0] + b * P[0] + d * C[0], a * A[1] + b * P[1] + d * C[1]]); }
    return out;
  };
  const bbOf = pts => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const q of pts) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); } return [x0, y0, x1, y1]; };
  S.bbOf = bbOf;
  // Tapered tube outline around a polyline. w: number, [w0,w1], or fn(u)
  S.tube = (pts, w) => {
    const n = pts.length, W = typeof w === 'function' ? w : Array.isArray(w) ? u => S.lerp(w[0], w[1], u) : () => w;
    const L = [], R = [], N = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      const nx = -ty, ny = tx, hw = W(i / (n - 1)) / 2;
      N.push([nx, ny, hw]); L.push([pts[i][0] + nx * hw, pts[i][1] + ny * hw]); R.push([pts[i][0] - nx * hw, pts[i][1] - ny * hw]);
    }
    const p = new Path2D();
    p.moveTo(L[0][0], L[0][1]);
    for (let i = 1; i < n; i++) p.lineTo(L[i][0], L[i][1]);
    const e = N[n - 1], ae = Math.atan2(e[1], e[0]);
    p.arc(pts[n - 1][0], pts[n - 1][1], e[2], ae, ae - Math.PI, true);
    for (let i = n - 1; i >= 0; i--) p.lineTo(R[i][0], R[i][1]);
    const s = N[0], as = Math.atan2(s[1], s[0]);
    p.arc(pts[0][0], pts[0][1], s[2], as + Math.PI, as, true);
    p.closePath();
    p.bb = bbOf(L.concat(R));
    return p;
  };
  S.limb = (A, B, C, w, k) => S.tube(S.bez(A, B, C, 16, k), w);
  S.ell = (x, y, rx, ry, rot = 0) => { const p = new Path2D(); p.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot, 0, S.TAU); const r = Math.max(Math.abs(rx), Math.abs(ry)); p.bb = [x - r, y - r, x + r, y + r]; return p; };
  S.poly = (pts, smooth = true) => {
    const p = new Path2D(), n = pts.length;
    p.bb = bbOf(pts);
    if (!smooth) { pts.forEach((q, i) => i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); p.closePath(); return p; }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let m = mid(pts[n - 1], pts[0]); p.moveTo(m[0], m[1]);
    for (let i = 0; i < n; i++) { const q = pts[i], mm = mid(q, pts[(i + 1) % n]); p.quadraticCurveTo(q[0], q[1], mm[0], mm[1]); }
    p.closePath(); return p;
  };

  // ---------- cel shading ----------
  // Fills a shape with: a shadow crescent on the side away from the light, a flat lit tone,
  // a thin warm rim on the side facing the light, then a coloured line.
  // o: {base, shade, rim, L:[x,y] light direction (screen), sw shadow width px, rw rim width px, ink, lw, over(c)}
  S.FLAGS = {};
  S.cel = (c, p, o) => {
    const F = S.FLAGS;
    if (F.flat) { c.save(); c.fillStyle = o.base; c.fill(p); c.restore(); if (F.ink && o.ink !== false) { c.save(); c.lineJoin = 'round'; c.lineWidth = o.lw ?? 1.8; c.strokeStyle = o.ink || '#2a1610'; c.stroke(p); c.restore(); } return; }
    if (F.noRim) o = Object.assign({}, o, { rim: o.base });
    if (F.noInk) o = Object.assign({}, o, { ink: false });
    if (F.noVol) o = Object.assign({}, o, { vol: false });
    const L = o.L || [1, -.5], n = Math.hypot(L[0], L[1]) || 1, lx = L[0] / n, ly = L[1] / n;
    const rw = o.rw ?? 2.5, sw = o.sw ?? 10;
    c.save(); c.clip(p);
    c.fillStyle = o.rim || o.base; c.fill(p);
    c.save();
    c.translate(-lx * rw, -ly * rw); c.clip(p);
    c.fillStyle = o.shade; c.fillRect(-5000, -5000, 10000, 10000);
    c.translate(lx * (rw + sw), ly * (rw + sw)); c.fillStyle = o.base; if (o.soft) c.filter = `blur(${o.soft}px)`; c.fill(p); c.filter = 'none';
    c.restore();
    // soft volume: a gentle gradient from the lit side to the shadow side, plus bounce light at the bottom
    if (p.bb && o.vol !== false) {
      const [x0, y0, x1, y1] = p.bb, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = Math.max(x1 - x0, y1 - y0) / 2;
      const g = c.createLinearGradient(cx + lx * R, cy + ly * R, cx - lx * R, cy - ly * R);
      g.addColorStop(0, 'rgba(255,240,220,0.10)'); g.addColorStop(.5, 'rgba(0,0,0,0)'); g.addColorStop(1, S.rgba(o.shade.startsWith('#') ? o.shade : '#000000', .35));
      c.fillStyle = g; c.fillRect(x0 - 2, y0 - 2, x1 - x0 + 4, y1 - y0 + 4);
    }
    if (o.over) o.over(c);
    c.restore();
    if (o.ink !== false) { c.save(); c.lineJoin = 'round'; c.lineCap = 'round'; c.lineWidth = o.lw ?? 1.8; c.strokeStyle = o.ink || '#2a1610'; c.stroke(p); c.restore(); }
  };
  // Cast shadow of shape q onto shape p (both already drawn): darkens p where q, shifted away from light, falls.
  S.cast = (c, p, q, dx, dy, col, a) => { c.save(); c.clip(p); c.translate(dx, dy); c.globalAlpha = a; c.fillStyle = col; c.fill(q); c.restore(); };

  // ---------- player ----------
  // Registers a canvas with a draw(c,t) function. Plays only while on screen.
  S.players = [];
  S.player = (canvas, draw, opts = {}) => {
    const c = canvas.getContext('2d');
    const P = { canvas, c, draw, t: opts.start || 0, playing: true, visible: true, dur: opts.dur || 8, last: null };
    draw(c, P.t);
    S.players.push(P);
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { P.visible = e.isIntersecting; })).observe(canvas);
    return P;
  };
  S.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  S.loop = () => {
    const step = now => {
      for (const P of S.players) {
        if (P.last == null) P.last = now;
        const dt = Math.min(.1, (now - P.last) / 1000); P.last = now;
        if (!P.playing || !P.visible) continue;
        P.t = (P.t + dt) % P.dur;
        P.draw(P.c, P.t);
      }
      requestAnimationFrame(step);
    };
    if (!S.reduced) requestAnimationFrame(step);
  };
})(window);
