// One-point perspective room kit for interior plates. Camera space: x right, y up (floor = 0), z depth away from camera.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { hex, rgb, mix, jitter, shade, stroke, fillStrokes, glow, poly, paintRegion } = P;
  class Room {
    constructor(ctx, r, W, H, o = {}) { Object.assign(this, { ctx, r, W, H }); this.RW = o.RW ?? 12; this.RH = o.RH ?? 6; this.ch = o.ch ?? 2.9; this.zf = o.zf ?? 12; this.zn = o.zn ?? 2.6;
      this.hor = o.hor ?? .45; this.cx = o.cx ?? .5; this.f = o.f ?? W * .42 * this.zf / this.RW * (o.backW ?? 1); this.light = o.light ?? 1; this.items = []; }
    p(x, y, z) { return [this.W * this.cx + this.f * x / z, this.H * this.hor - this.f * (y - this.ch) / z]; }
    quad(pts3, col, o = {}) { const pts = pts3.map(q => this.p(...q)); paintRegion(this.ctx, this.r, pts, col, { density: o.density ?? 160, len: o.len ?? [14, 50], w: o.w ?? [3, 9], ang: o.ang ?? 0, angJ: o.angJ ?? .25, al: o.al ?? .32, topLight: o.top ?? .06, botDark: o.bot ?? -.18, var: o.var ?? 9 });
      if (o.edge) { this.ctx.strokeStyle = rgb(shade(col, -.6), o.edgeA ?? .5); this.ctx.lineWidth = o.ew ?? 2; poly(this.ctx, pts); this.ctx.stroke(); } return pts; }
    // walls, floor, ceiling
    shell(o) { const { RW, RH, zf, zn } = this, L = -RW / 2, R = RW / 2, Z = zn * .55;
      this.quad([[L, RH, zf], [R, RH, zf], [R, 0, zf], [L, 0, zf]], o.back, { ang: -Math.PI / 2, top: .04, bot: -.12, density: 220 });
      this.quad([[L, RH, Z], [L, RH, zf], [L, 0, zf], [L, 0, Z]], shade(o.side ?? o.back, -.12), { ang: -Math.PI / 2, density: 220 });
      this.quad([[R, RH, zf], [R, RH, Z], [R, 0, Z], [R, 0, zf]], shade(o.side ?? o.back, -.06), { ang: -Math.PI / 2, density: 220 });
      this.quad([[L, RH, Z], [R, RH, Z], [R, RH, zf], [L, RH, zf]], o.ceil ?? shade(o.back, .1), { top: -.1, bot: .05, density: 260 });
      this.floor(o.floor, o.planks ?? true, Z);
      // skirting + seams with soft occlusion
      const c = this.ctx; c.save(); c.lineCap = 'round';
      for (const [a, b] of [[[L, 0, zf], [R, 0, zf]], [[L, 0, Z], [L, 0, zf]], [[R, 0, Z], [R, 0, zf]], [[L, RH, zf], [R, RH, zf]], [[L, RH, Z], [L, RH, zf]], [[R, RH, Z], [R, RH, zf]], [[L, 0, zf], [L, RH, zf]], [[R, 0, zf], [R, RH, zf]]]) {
        const A = this.p(...a), B = this.p(...b); c.strokeStyle = 'rgba(20,12,8,.22)'; c.lineWidth = 14; c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke(); c.strokeStyle = 'rgba(20,12,8,.35)'; c.lineWidth = 3; c.stroke(); }
      if (o.skirting) { this.quad([[L, .18, zf], [R, .18, zf], [R, 0, zf], [L, 0, zf]], o.skirting, { density: 60, edge: true }); this.quad([[L, .18, Z], [L, .18, zf], [L, 0, zf], [L, 0, Z]], shade(o.skirting, -.1), { density: 60 }); this.quad([[R, .18, zf], [R, .18, Z], [R, 0, Z], [R, 0, zf]], shade(o.skirting, -.05), { density: 60 }); }
      c.restore(); }
    floor(col, planks, Z) { const { RW, zf } = this, L = -RW / 2, R = RW / 2; const pts = this.quad([[L, 0, Z], [R, 0, Z], [R, 0, zf], [L, 0, zf]], col, { ang: 0, angJ: .05, density: 140, top: -.12, bot: .06, len: [30, 90] });
      if (!planks) return; const c = this.ctx, r = this.r; c.save(); poly(c, pts); c.clip();
      const n = Math.round(RW / .28); for (let i = 0; i <= n; i++) { const x = L + i * RW / n; const A = this.p(x, 0, Z), B = this.p(x, 0, zf); c.strokeStyle = rgb(shade(col, -.45), .45); c.lineWidth = 2; c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke();
        for (let z = zf; z > Z; z -= r.range(1.2, 2.6)) { const a = this.p(x, 0, z), b = this.p(x + RW / n, 0, z); c.lineWidth = 1.2; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
        const a = this.p(x + RW / n * .5, 0, zf), b = this.p(x + RW / n * .5, 0, Z); const g = c.createLinearGradient(a[0], a[1], b[0], b[1]); const tint = jitter(col, r, 12); g.addColorStop(0, rgb(tint, .15)); g.addColorStop(1, rgb(tint, .25)); c.fillStyle = g;
        poly(c, [this.p(x, 0, Z), this.p(x + RW / n, 0, Z), this.p(x + RW / n, 0, zf), this.p(x, 0, zf)]); c.fill(); }
      // sheen
      c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, this.p(0, 0, zf)[1], 0, this.H); g.addColorStop(0, 'rgba(255,240,220,.12)'); g.addColorStop(1, 'rgba(255,240,220,0)'); c.fillStyle = g; c.fillRect(0, 0, this.W, this.H); c.restore(); }
    // 3D box with visible faces; x,y,z = near-bottom-left corner; w along x, h along y, d along +z (away)
    box(x, y, z, w, h, d, col, o = {}) { const ch = this.ch, faces = [];
      const top = [[x, y + h, z], [x + w, y + h, z], [x + w, y + h, z + d], [x, y + h, z + d]], bot = [[x, y, z], [x + w, y, z], [x + w, y, z + d], [x, y, z + d]];
      if (o.shadow !== false) { const c = this.ctx, a = this.p(x - .08, 0, z - .05), b = this.p(x + w + .08, 0, z + d + .1); M.contactShadow(c, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 2, Math.abs(b[0] - a[0]) * .62, Math.abs(b[1] - a[1]) * .6 + 8, o.shadowA ?? .4); }
      if (x > 0) faces.push(['L', [[x, y + h, z + d], [x, y + h, z], [x, y, z], [x, y, z + d]], -.22]); if (x + w < 0) faces.push(['R', [[x + w, y + h, z], [x + w, y + h, z + d], [x + w, y, z + d], [x + w, y, z]], -.16]);
      if (y + h < ch) faces.push(['T', top, .12]); if (y > ch) faces.push(['B', bot, -.3]);
      faces.push(['F', [[x, y + h, z], [x + w, y + h, z], [x + w, y, z], [x, y, z]], 0]);
      const out = {}; for (const [k, pts, f] of faces) out[k] = this.quad(pts, shade(col, f + (o.lit ?? 0)), { density: o.density ?? 90, len: o.len ?? [8, 30], w: [2, 6], ang: k === 'T' ? 0 : -Math.PI / 2 * (o.vert ? 1 : 0), angJ: .2, al: .3, top: k === 'F' ? .06 : 0, bot: k === 'F' ? -.16 : 0, var: o.var ?? 7, edge: o.edge ?? true, edgeA: .45, ew: 1.6 });
      if (o.hi !== false && out.T) { const c = this.ctx, a = this.p(x, y + h, z), b = this.p(x + w, y + h, z); c.strokeStyle = rgb(shade(col, .45), .55); c.lineWidth = 2; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
      return out; }
    // rectangle on the back wall (window, picture, board): x0..x1 (across), y0..y1 (height)
    backRect(x0, y0, x1, y1) { const z = this.zf - .01; const a = this.p(x0, y1, z), b = this.p(x1, y0, z); return [a[0], a[1], b[0] - a[0], b[1] - a[1]]; }
    // a light beam from a back-wall window onto the floor
    beam(x0, y0, x1, y1, col = '#ffe6b0', al = .18, toward = 4) { const c = this.ctx, z = this.zf; c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(28px)'; const pts = [this.p(x0, y1, z), this.p(x1, y1, z), this.p(x1 + toward * .2, 0, z - toward), this.p(x0 + toward * .2, 0, z - toward)];
      const g = c.createLinearGradient(pts[0][0], pts[0][1], pts[3][0], pts[3][1]); g.addColorStop(0, rgb(hex(col), al)); g.addColorStop(1, rgb(hex(col), al * .25)); c.fillStyle = g; poly(c, pts); c.fill();
      const fl = [this.p(x0 + toward * .2, 0, z - toward), this.p(x1 + toward * .2, 0, z - toward), this.p(x1, 0, z - .3), this.p(x0, 0, z - .3)]; c.fillStyle = rgb(hex(col), al * 1.2); poly(c, fl); c.fill(); c.restore(); }
    lampGlow(x, y, z, rad = 600, col = '#ffd890', al = .35) { const [sx, sy] = this.p(x, y, z); glow(this.ctx, sx, sy, rad * 10 / z, col, al); }
  }
  ENV.Room = Room;
})(typeof window !== 'undefined' ? window : globalThis);
