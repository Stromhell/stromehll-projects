// Putin security painted plates. Paint with: node shared/p2/paint.js putin-security/production/plates.js putin-security/production/plates all
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, { hex, rgb, mix, jitter, shade, stroke, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .4, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  // raised wood panel: frame + bevelled inset with grain
  const woodPanel = (c, r, x, y, w, h, col) => { c.fillStyle = rgb(shade(col, -.25)); c.fillRect(x, y, w, h); const ix = x + w * .1, iy = y + h * .08, iw = w * .8, ih = h * .84;
    const g = c.createLinearGradient(ix, iy, ix + iw, iy + ih); g.addColorStop(0, rgb(shade(col, .08))); g.addColorStop(1, rgb(shade(col, -.12))); c.fillStyle = g; c.fillRect(ix, iy, iw, ih);
    for (let k = 0; k < 18; k++) { c.strokeStyle = `rgba(${r() < .5 ? '30,14,6' : '160,110,70'},.16)`; c.lineWidth = r.range(1, 3); const xx = ix + r() * iw; c.beginPath(); c.moveTo(xx, iy); c.bezierCurveTo(xx + r.gauss() * 8, iy + ih * .3, xx + r.gauss() * 8, iy + ih * .7, xx + r.gauss() * 5, iy + ih); c.stroke(); }
    c.strokeStyle = 'rgba(255,215,160,.32)'; c.lineWidth = 3; c.beginPath(); c.moveTo(ix, iy + ih); c.lineTo(ix, iy); c.lineTo(ix + iw, iy); c.stroke(); c.strokeStyle = 'rgba(20,8,2,.5)'; c.beginPath(); c.moveTo(ix + iw, iy); c.lineTo(ix + iw, iy + ih); c.lineTo(ix, iy + ih); c.stroke(); };
  const flag = (c, r, x, y, w, h, cols, s) => { const pole = '#c8a040'; c.fillStyle = pole; c.fillRect(x - 4 * s, y - 20 * s, 8 * s, h * 2.2); c.beginPath(); c.arc(x, y - 26 * s, 9 * s, 0, 7); c.fill();
    for (let k = 0; k < 3; k++) { c.fillStyle = cols[k]; c.beginPath(); const y0 = y + k * h / 3, y1 = y0 + h / 3; c.moveTo(x + 4 * s, y0); for (let t = 0; t <= 1.001; t += .1) c.lineTo(x + 4 * s + w * t, y0 + Math.sin(t * 5) * 10 * s + t * 30 * s); for (let t = 1; t >= -.001; t -= .1) c.lineTo(x + 4 * s + w * t, y1 + Math.sin(t * 5) * 10 * s + t * 30 * s); c.fill(); }
    for (let k = 0; k < 6; k++) { const t = k / 6; c.fillStyle = `rgba(0,0,0,${.06 + .06 * Math.sin(t * 9)})`; c.fillRect(x + 4 * s + w * t, y, w / 6, h + 40 * s); }
    c.fillStyle = '#d8b050'; for (let t = 0; t < 1; t += .04) c.fillRect(x + 4 * s + w * t, y + h + Math.sin(t * 5) * 10 * s + t * 30 * s, 3 * s, 12 * s); };
  const eagle = (c, x, y, s) => { glow(c, x, y, 180 * s, '#ffd890', .22); c.fillStyle = '#c99a30'; c.strokeStyle = '#7a5410'; c.lineWidth = 3 * s;
    for (const d of [-1, 1]) { c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 6; k++) { c.lineTo(x + d * (30 + k * 14) * s, y - (60 - k * 8) * s); c.lineTo(x + d * (34 + k * 14) * s, y - (36 - k * 10) * s); } c.lineTo(x + d * 40 * s, y + 40 * s); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.arc(x + d * 22 * s, y - 64 * s, 13 * s, 0, 7); c.fill(); c.stroke(); }
    c.beginPath(); c.moveTo(x - 30 * s, y - 20 * s); c.lineTo(x + 30 * s, y - 20 * s); c.lineTo(x + 26 * s, y + 30 * s); c.quadraticCurveTo(x, y + 52 * s, x - 26 * s, y + 30 * s); c.closePath(); c.fillStyle = '#b02a24'; c.fill(); c.stroke();
    c.fillStyle = '#e8e0d0'; c.beginPath(); c.arc(x, y + 6 * s, 9 * s, 0, 7); c.fill(); c.fillStyle = '#d8b050'; c.beginPath(); c.moveTo(x - 14 * s, y - 92 * s); c.lineTo(x, y - 112 * s); c.lineTo(x + 14 * s, y - 92 * s); c.fill(); };

  // Wood-panelled presidential office. Variant v (0,1,2) moves the door handle, thermostat and panel seams for the spot-the-difference act.
  ENV.kremlinOffice = (ctx, r, W, H, o = {}) => {
    const v = o.v ?? 0, R = new ENV.Room(ctx, r, W, H, { RW: 10, RH: 3.6, ch: 1.5, zf: 8, f: 1750, hor: .45 });
    R.shell({ back: '#6a4428', side: '#5a3a22', ceil: '#e2d8c4', floor: '#5a3820', planks: true, skirting: '#3a2414' });
    const bays = [[-5, -3, -1.6, -.6, .6, 1.6, 3, 5], [-5, -3.2, -1.6, -.6, .6, 1.6, 3.2, 5], [-5, -3, -1.6, -.6, .6, 1.8, 3, 5]][v];
    for (let i = 0; i < bays.length - 1; i++) { const [x0, y0, w0, h0] = R.backRect(bays[i], .2, bays[i + 1], 1.0); woodPanel(ctx, r, x0, y0, w0, h0, '#7a4e2c'); const [x1, y1, w1, h1] = R.backRect(bays[i], 1.1, bays[i + 1], 3.3); woodPanel(ctx, r, x1, y1, w1, h1, '#744a2a'); }
    { const [x0, y0, w0] = R.backRect(-5, 3.35, 5, 3.6); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(x0, y0, w0, 26); ctx.fillStyle = 'rgba(80,60,30,.4)'; for (let x = x0; x < x0 + w0; x += 18) ctx.fillRect(x, y0 + 18, 9, 8); ctx.fillStyle = '#c8a04a'; ctx.fillRect(x0, y0 + 26, w0, 5); }
    for (const xw of [-5, 5]) for (let z = 2.2; z < 8; z += 1.2) R.onSide(xw, 3.3, z, (c, s) => woodPanel(c, r, 0, 0, 1.15 * s, 3.1 * s, '#6e4628'));
    R.onSide(5, 3.0, 3.0, (c, s) => { const w = 1.6 * s, h = 2.5 * s; const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9ab0c8'); g.addColorStop(1, '#d8dce0'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(120,110,100,.8)'; for (let k = 0; k < 5; k++) c.fillRect(w * (.1 + k * .18), h * .55, w * .12, h * .45); c.fillStyle = '#c8a040'; c.beginPath(); c.arc(w * .55, h * .5, w * .07, Math.PI, 0); c.fill();
      c.fillStyle = '#efe6d6'; c.fillRect(-10, -10, w + 20, 14); c.fillRect(-10, 0, 12, h); c.fillRect(w - 2, 0, 12, h); c.fillRect(w / 2 - 5, 0, 10, h); c.fillRect(0, h / 2 - 5, w, 10);
      for (const [dx, dw] of [[-.35 * s, .6 * s], [w - .25 * s, .6 * s]]) { for (let k = 0; k < 7; k++) { const fx = dx + k * dw / 7, g2 = c.createLinearGradient(fx, 0, fx + dw / 7, 0); g2.addColorStop(0, '#5a1a1c'); g2.addColorStop(.5, '#8a2a2a'); g2.addColorStop(1, '#4a1418'); c.fillStyle = g2; c.fillRect(fx, -.2 * s, dw / 7 + 1, h + .5 * s); } }
      c.fillStyle = '#c8a040'; c.fillRect(-.4 * s, -.24 * s, w + .8 * s, 8); });
    R.onSide(-5, 2.9, 2.6, (c, s) => { const w = 1.5 * s, h = 2.6 * s; c.fillStyle = '#3a2214'; c.fillRect(0, 0, w, h); for (let k = 0; k < 5; k++) { const y = .1 * s + k * h * .19; c.fillStyle = '#2a180c'; c.fillRect(.05 * s, y, w - .1 * s, h * .17); PR.books(c, r, .07 * s, y + h * .17, s * 1.2, w - .14 * s); c.fillStyle = '#5a3420'; c.fillRect(0, y + h * .17, w, .03 * s); } });
    { const [x0, y0, w0, h0] = R.backRect(-4.7, 0, -3.3, 2.5); woodPanel(ctx, r, x0, y0, w0, h0 * .5, '#8a5a34'); woodPanel(ctx, r, x0, y0 + h0 * .5, w0, h0 * .5, '#8a5a34'); ctx.strokeStyle = '#2a1608'; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, w0, h0);
      const hy = R.p(0, [1.05, 1.3, .85][v], 7.99)[1]; ctx.fillStyle = '#e8c870'; ctx.fillRect(x0 + w0 - 40, hy - 7, 30, 14); ctx.fillStyle = 'rgba(255,255,220,.8)'; ctx.fillRect(x0 + w0 - 38, hy - 6, 26, 3); }
    { const s = R.s(7.9) / 220; const [fx1, fy1] = R.p(-1.25, 3.1, 7.9), [fx2, fy2] = R.p(1.0, 3.1, 7.9); flag(ctx, r, fx1, fy1, 90 * s * 1.6, 230 * s * 1.6, ['#f4f2ee', '#1f4ea0', '#d03a2a'], s * 1.6); flag(ctx, r, fx2, fy2, 90 * s * 1.6, 230 * s * 1.6, ['#f4f2ee', '#1f4ea0', '#d03a2a'], s * 1.6); const [cx, cy] = R.p(0, 2.75, 7.95); eagle(ctx, cx, cy, s * 1.5); }
    { const tp = [[2.6, 1.5], [2.25, 1.5], [2.6, 1.25]][v], [tx, ty] = R.p(tp[0], tp[1], 7.98); ctx.fillStyle = '#ece6da'; ctx.fillRect(tx - 20, ty - 26, 40, 52); ctx.strokeStyle = '#6a6458'; ctx.lineWidth = 2; ctx.strokeRect(tx - 20, ty - 26, 40, 52); ctx.fillStyle = '#2f7a44'; ctx.fillRect(tx - 12, ty - 16, 24, 12); ctx.fillStyle = '#888'; ctx.beginPath(); ctx.arc(tx, ty + 12, 6, 0, 7); ctx.fill(); }
    R.box(3.3, 0, 6.4, 1.4, .62, .6, ['#4a2c18', '#2a2a2e', '#4a2c18'][v], { density: 60 });
    { const [a0, a1] = R.p(3.4, 1.42, 6.75), [b0, b1] = R.p(4.6, .66, 6.75); ctx.fillStyle = '#0c0d10'; ctx.fillRect(a0, a1, b0 - a0, b1 - a1); ctx.fillStyle = 'rgba(120,140,170,.18)'; poly(ctx, [[a0, a1], [a0 + (b0 - a0) * .35, a1], [a0 + (b0 - a0) * .15, b1], [a0, b1]]); ctx.fill(); ctx.fillStyle = '#222'; ctx.fillRect((a0 + b0) / 2 - 30, b1, 60, 8); }
    { const pts = [R.p(-3, 0.002, 2.0), R.p(3, 0.002, 2.0), R.p(3, 0.002, 7), R.p(-3, 0.002, 7)]; paintRegion(ctx, r, pts, '#7a1e20', { density: 200, len: [20, 60], w: [4, 10], ang: 0, angJ: .2, al: .35, topLight: -.1, botDark: .05 });
      const inner = [R.p(-2.7, 0.003, 2.3), R.p(2.7, 0.003, 2.3), R.p(2.7, 0.003, 6.7), R.p(-2.7, 0.003, 6.7)]; ctx.strokeStyle = '#c8a04a'; ctx.lineWidth = 8; poly(ctx, inner); ctx.stroke(); ctx.lineWidth = 3; poly(ctx, pts); ctx.stroke();
      ctx.save(); poly(ctx, inner); ctx.clip(); for (let z = 2.6; z < 6.6; z += .5) for (let x = -2.4; x < 2.5; x += .6) { const [px, py] = R.p(x, 0, z), s = R.s(z); ctx.strokeStyle = 'rgba(210,170,90,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(px, py, .1 * s, .04 * s, 0, 0, 7); ctx.stroke(); } ctx.restore(); }
    { const [cx, cy] = R.p(0, 0, 6.2); PR.officeChair(ctx, r, cx, cy, R.s(6.2) * 1.15, { col: '#3a2418' }); }
    R.box(-1.7, 0, 4.6, 3.4, .78, 1.2, '#5e3a20', { density: 120, lit: .04 }); R.box(-1.78, .78, 4.55, 3.56, .06, 1.32, '#3e2414', { density: 60 });
    { const [x0, y0] = R.p(-1.6, .7, 4.6), [x1, y1] = R.p(1.6, .1, 4.6); const pw = (x1 - x0) / 3; for (let k = 0; k < 3; k++) woodPanel(ctx, r, x0 + k * pw + 6, y0, pw - 12, y1 - y0, '#6a4224');
      const top = [R.p(-1.2, .845, 4.7), R.p(1.2, .845, 4.7), R.p(1.2, .845, 5.5), R.p(-1.2, .845, 5.5)]; ctx.fillStyle = '#244a34'; poly(ctx, top); ctx.fill(); }
    { const [lx, ly] = R.p(1.25, .85, 5.2), s = R.s(5.2); ctx.fillStyle = '#c8a040'; ctx.fillRect(lx - .015 * s, ly - .32 * s, .03 * s, .32 * s); ctx.fillStyle = '#1f6a3a'; ctx.beginPath(); ctx.moveTo(lx - .16 * s, ly - .3 * s); ctx.quadraticCurveTo(lx, ly - .44 * s, lx + .16 * s, ly - .3 * s); ctx.closePath(); ctx.fill(); glow(ctx, lx, ly - .2 * s, 300, '#ffe2a0', .4); ctx.fillStyle = 'rgba(255,230,160,.35)'; ctx.beginPath(); ctx.ellipse(lx, ly, .3 * s, .06 * s, 0, 0, 7); ctx.fill(); }
    for (const [px, col] of [[-1.3, '#ece6da'], [-.95, '#b8302a'], [-.6, '#ece6da']]) { const [x, y] = R.p(px, .85, 5.0), s = R.s(5); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - .12 * s, y); ctx.lineTo(x + .12 * s, y); ctx.lineTo(x + .09 * s, y - .06 * s); ctx.lineTo(x - .09 * s, y - .06 * s); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(x - .1 * s, y - .09 * s, .2 * s, .03 * s); }
    { const [x, y] = R.p(.2, .85, 5.0), s = R.s(5); ctx.fillStyle = '#2a1a10'; ctx.fillRect(x - .15 * s, y - .05 * s, .3 * s, .05 * s); ctx.fillStyle = '#c8a040'; ctx.fillRect(x - .08 * s, y - .12 * s, .04 * s, .07 * s); ctx.fillRect(x + .04 * s, y - .12 * s, .04 * s, .07 * s); ctx.fillStyle = '#f2ece0'; ctx.fillRect(x - .4 * s, y - .01 * s, .18 * s, .01 * s); }
    { const [cx, cy] = R.p(0, 3.5, 4.8), s = R.s(4.8); ctx.strokeStyle = '#8a6a30'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, R.p(0, 3.6, 4.8)[1]); ctx.lineTo(cx, cy + .2 * s); ctx.stroke(); glow(ctx, cx, cy + .3 * s, 420, '#fff0c8', .35);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = cx + Math.cos(a) * .35 * s, y = cy + .3 * s + Math.sin(a) * .08 * s; ctx.strokeStyle = '#c8a04a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy + .3 * s); ctx.lineTo(x, y); ctx.stroke(); ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.ellipse(x, y - .04 * s, .025 * s, .05 * s, 0, 0, 7); ctx.fill(); glow(ctx, x, y - .04 * s, 60, '#fff0c0', .5); } }
    R.lampGlow(0, 3.2, 6, 900, '#ffe6b0', .2);
    FIN(ctx, r, W, H, .38);
  };

  // The very long white table in a palace hall.
  ENV.longTable = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 12, RH: 5.2, ch: 1.6, zf: 18, f: 1500, hor: .44 });
    R.shell({ back: '#efe8da', side: '#e6dcc8', ceil: '#f4eee2', floor: '#a88a5c', planks: true, skirting: '#d8c8a0' });
    // side walls in true perspective: mouldings, pilasters, tall windows with gold drapes
    const L3 = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((q, i) => { const p = R.p(...q); i ? ctx.lineTo(...p) : ctx.moveTo(...p); }); ctx.closePath(); ctx.stroke(); };
    for (const xw of [-6, 6]) { for (let z = 3; z < 17.5; z += 2.4) { R.quad([[xw, 5.0, z], [xw, 5.0, z + .3], [xw, 0, z + .3], [xw, 0, z]], '#d8b860', { density: 40, ang: -Math.PI / 2 }); }
      for (let z = 3.3; z < 17.2; z += 2.4) { const win = Math.round((z - 3.3) / 2.4) % 2 === 0;
        if (win) { R.quad([[xw, 4.2, z + .4], [xw, 4.2, z + 1.9], [xw, .8, z + 1.9], [xw, .8, z + .4]], '#d6e0ea', { density: 60, ang: -Math.PI / 2, top: .1 }); for (let k = 1; k < 5; k++) L3([[xw, .8 + k * .68, z + .4], [xw, .8 + k * .68, z + 1.9]], '#f6f2ea', 4); L3([[xw, 4.2, z + 1.15], [xw, .8, z + 1.15]], '#f6f2ea', 5);
          for (const [z0, z1] of [[z + .2, z + .6], [z + 1.7, z + 2.1]]) R.quad([[xw, 4.5, z0], [xw, 4.5, z1], [xw, .02, z1], [xw, .02, z0]], '#c8a04a', { density: 120, ang: -Math.PI / 2, len: [40, 120], w: [3, 7], top: .15, bot: -.25 }); }
        else { L3([[xw, 4.3, z + .5], [xw, 4.3, z + 1.8], [xw, 2.6, z + 1.8], [xw, 2.6, z + .5]], '#c8a04a', 4); L3([[xw, 2.3, z + .5], [xw, 2.3, z + 1.8], [xw, .5, z + 1.8], [xw, .5, z + .5]], '#c8a04a', 4); } } }
    for (const z of [4.2, 9]) R.beam(-6, .8, -5.6, 4.2, '#fff6e0', .06, 3);
    { for (let x = -5; x < 5; x += 2.5) { const [x0, y0, w0, h0] = R.backRect(x + .3, .4, x + 2.2, 4.3); ctx.strokeStyle = '#c8a04a'; ctx.lineWidth = 5; ctx.strokeRect(x0, y0, w0, h0); ctx.lineWidth = 2; ctx.strokeRect(x0 + 10, y0 + 10, w0 - 20, h0 - 20); } }
    { const [x0, y0, w0] = R.backRect(-6, 4.8, 6, 5.2); ctx.fillStyle = '#d8b860'; ctx.fillRect(x0, y0, w0, 20); }
    if (0) R.onSide(0, 0, 1, (c, s) => { const w = 1.4 * s, h = 3.4 * s; const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#c0d0e4'); g.addColorStop(1, '#f2eee4'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = '#f6f2ea'; for (let k = 1; k < 3; k++) c.fillRect(w * k / 3 - 4, 0, 8, h); for (let k = 1; k < 5; k++) c.fillRect(0, h * k / 5 - 4, w, 8);
      for (const dx of [-.3 * s, w - .1 * s]) for (let k = 0; k < 6; k++) { const fx = dx + k * .07 * s, g2 = c.createLinearGradient(fx, 0, fx + .07 * s, 0); g2.addColorStop(0, '#a8843a'); g2.addColorStop(.5, '#e2c272'); g2.addColorStop(1, '#8a6a28'); c.fillStyle = g2; c.fillRect(fx, -.2 * s, .07 * s + 1, h + .6 * s); } });
    { const pts = [R.p(-6, 0, 1.5), R.p(6, 0, 1.5), R.p(6, 0, 18), R.p(-6, 0, 18)]; ctx.save(); poly(ctx, pts); ctx.clip(); for (let z = 2; z < 18; z += .5) for (let x = -6; x < 6; x += .5) { const a = R.p(x, 0, z), b = R.p(x + .25, 0, z + .25), c2 = R.p(x + .5, 0, z); ctx.strokeStyle = 'rgba(70,45,20,.25)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...c2); ctx.stroke(); } ctx.restore(); }
    R.box(-.9, 0, 2.4, 1.8, .74, 13.4, '#f6f3ec', { density: 140, lit: .05 }); R.box(-.96, .74, 2.35, 1.92, .05, 13.5, '#ffffff', { density: 80 });
    { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = 'rgba(255,240,210,.35)'; poly(ctx, [R.p(-.05, .8, 2.5), R.p(.05, .8, 2.5), R.p(.05, .8, 15.8), R.p(-.05, .8, 15.8)]); ctx.fill(); ctx.restore(); }
    const chair = (z) => { const [x, y] = R.p(0, 0, z); const sc = R.s(z); ctx.fillStyle = '#c8a04a'; ctx.fillRect(x - .25 * sc, y - 1.15 * sc, .5 * sc, .1 * sc); ctx.fillRect(x - .25 * sc, y - 1.15 * sc, .05 * sc, 1.15 * sc); ctx.fillRect(x + .2 * sc, y - 1.15 * sc, .05 * sc, 1.15 * sc); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(x - .2 * sc, y - 1.05 * sc, .4 * sc, .5 * sc); ctx.fillStyle = '#c8a04a'; ctx.fillRect(x - .27 * sc, y - .5 * sc, .54 * sc, .06 * sc); };
    chair(16.3);
    for (const z of [6, 12]) { const [cx, cy] = R.p(0, 4.3, z), s = R.s(z); ctx.strokeStyle = '#a8843a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, R.p(0, 5.2, z)[1]); ctx.lineTo(cx, cy); ctx.stroke(); glow(ctx, cx, cy + .2 * s, 600 * 6 / z, '#fff2cc', .4);
      for (let t = 0; t < 3; t++) for (let k = 0; k < 10 + t * 4; k++) { const a = k / (10 + t * 4) * Math.PI * 2, rr = (.2 + t * .18) * s, x = cx + Math.cos(a) * rr, y = cy + t * .18 * s + Math.sin(a) * rr * .2; ctx.fillStyle = `rgba(255,250,230,${.6 - t * .1})`; ctx.beginPath(); ctx.ellipse(x, y, .02 * s, .05 * s, 0, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#d8b860'; ctx.beginPath(); ctx.ellipse(cx, cy + .55 * s, .5 * s, .07 * s, 0, 0, 7); ctx.fill(); }
    FIN(ctx, r, W, H, .3);
  };

  // Private jet cabin at night: leather seats, veneer table, oval windows.
  ENV.jetCabin = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 4.4, RH: 2.3, ch: 1.2, zf: 9, f: 1500, hor: .46 });
    R.shell({ back: '#e6dccb', side: '#ddd2bf', ceil: '#efe8da', floor: '#4a3a4e', planks: false });
    { const g = ctx.createLinearGradient(0, 0, 0, H * .3); g.addColorStop(0, 'rgba(60,50,40,.45)'); g.addColorStop(1, 'rgba(60,50,40,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * .3);
      for (const side of [-1, 1]) { ctx.strokeStyle = 'rgba(255,230,180,.8)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(...R.p(side * 1.4, 2.25, 1.6)); ctx.lineTo(...R.p(side * 1.4, 2.25, 9)); ctx.stroke(); } }
    for (const xw of [-2.2, 2.2]) for (let z = 2; z < 9; z += 1.4) { R.onSide(xw, 2.25, z, (c, s) => { c.fillStyle = '#f2ece0'; c.fillRect(0, 0, 1.36 * s, .45 * s); c.strokeStyle = 'rgba(80,70,60,.4)'; c.lineWidth = 2; c.strokeRect(0, 0, 1.36 * s, .45 * s); c.fillStyle = '#b89a6a'; c.fillRect(.6 * s, .38 * s, .16 * s, .03 * s); });
      R.onSide(xw, .8, z, (c, s) => { const g = c.createLinearGradient(0, 0, 0, .8 * s); g.addColorStop(0, '#8a5a32'); g.addColorStop(1, '#5a3a20'); c.fillStyle = g; c.fillRect(0, 0, 1.4 * s, .8 * s); for (let k = 0; k < 10; k++) { c.strokeStyle = 'rgba(40,20,8,.25)'; c.lineWidth = 2; const y = r() * .8 * s; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(.4 * s, y + r.gauss() * 6, .9 * s, y + r.gauss() * 6, 1.4 * s, y); c.stroke(); } c.fillStyle = '#c8a040'; c.fillRect(0, 0, 1.4 * s, .015 * s); });
      R.onSide(xw, 1.65, z + .5, (c, s) => { const w = .3 * s, h = .45 * s; c.fillStyle = '#cfc4b0'; c.beginPath(); c.ellipse(w / 2, h / 2, w / 2 + .05 * s, h / 2 + .05 * s, 0, 0, 7); c.fill(); const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#05081a'); g.addColorStop(1, '#1a2448'); c.fillStyle = g; c.beginPath(); c.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, 7); c.fill(); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(w * r(), h * r() * .6, 2, 2); } c.fillStyle = 'rgba(230,224,210,.95)'; c.fillRect(0, 0, w, h * .25); }); }
    const seat = (x, z, face) => { const s = R.s(z), [sx, sy] = R.p(x, 0, z); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(sx, sy, .4 * s, .08 * s, 0, 0, 7); ctx.fill();
      const col = '#e8dcc0', g = ctx.createLinearGradient(sx - .35 * s, 0, sx + .35 * s, 0); g.addColorStop(0, rgb(shade(col, -.2))); g.addColorStop(.5, col); g.addColorStop(1, rgb(shade(col, -.25))); ctx.fillStyle = g;
      ctx.beginPath(); ctx.roundRect(sx - .34 * s, sy - .48 * s, .68 * s, .42 * s, .06 * s); ctx.fill(); if (face) { ctx.beginPath(); ctx.roundRect(sx - .3 * s, sy - 1.15 * s, .6 * s, .72 * s, .08 * s); ctx.fill(); ctx.strokeStyle = 'rgba(120,100,70,.4)'; ctx.lineWidth = 2; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(sx - .28 * s, sy - 1.15 * s + k * .18 * s); ctx.lineTo(sx + .28 * s, sy - 1.15 * s + k * .18 * s); ctx.stroke(); } }
      ctx.fillStyle = rgb(shade(col, -.15)); ctx.beginPath(); ctx.roundRect(sx - .42 * s, sy - .62 * s, .1 * s, .5 * s, .04 * s); ctx.roundRect(sx + .32 * s, sy - .62 * s, .1 * s, .5 * s, .04 * s); ctx.fill(); };
    seat(-1.3, 6.4, true); seat(1.3, 6.4, true);
    R.box(-.7, 0, 4.4, 1.4, .72, 1.3, '#6a4224', { density: 80, lit: .05 }); R.box(-.75, .72, 4.35, 1.5, .04, 1.4, '#8a5a32', { density: 40 });
    { const [x, y] = R.p(.25, .76, 4.9), s = R.s(4.9); ctx.fillStyle = 'rgba(220,235,255,.5)'; ctx.fillRect(x - .03 * s, y - .12 * s, .06 * s, .12 * s); ctx.fillStyle = '#efe9da'; ctx.fillRect(x - .45 * s, y - .01 * s, .2 * s, .012 * s); }
    seat(-1.3, 3.2, false); seat(1.3, 3.2, false);
    R.lampGlow(0, 2.2, 5, 700, '#ffe6b0', .25);
    FIN(ctx, r, W, H, .4);
  };

  // Grey Moscow avenue in sleet with a Stalinist tower.
  ENV.moscowRoad = (ctx, r, W, H) => {
    const hz = H * .5, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz + 40, '#4e5664', '#a4a9b0', { strokes: 3000 }); ENV.clouds(ctx, r, W, 0, hz * .7, 18, '#b8bcc4', '#7e848e', '#454a54');
    for (let i = 0; i < 30; i++) { const bx = rr.range(-100, W), bw = rr.range(80, 200), bh = rr.range(100, 260); M.wall(ctx, rr, [bx, hz - bh, bw, bh + 20], mix('#8a8e96', '#a0a4aa', rr()), { density: 120 }); M.windowGrid(ctx, rr, [bx + 8, hz - bh + 12, bw - 16, bh - 20], Math.max(2, bw / 26 | 0), Math.max(3, bh / 30 | 0), '#6a6e78', 'rgba(0,0,0,0)', .25, '#e8c890'); }
    { const tx = W * .72, s = 1.1; const tiers = [[180, 0, 280], [120, 280, 450], [70, 450, 600], [36, 600, 700]]; for (const [hw, y0, y1] of tiers) { M.wall(ctx, rr, [tx - hw * s, hz - y1 * s, hw * 2 * s, (y1 - y0) * s], '#8e867a', { density: 200 }); M.windowGrid(ctx, rr, [tx - hw * s + 10, hz - y1 * s + 14, hw * 2 * s - 20, (y1 - y0) * s - 24], Math.max(2, hw / 14 | 0), Math.max(2, (y1 - y0) / 26 | 0), '#5a5650', 'rgba(0,0,0,0)', .3, '#f0c880'); ctx.fillStyle = '#d8d0c0'; ctx.fillRect(tx - hw * s - 6, hz - y1 * s - 8, hw * 2 * s + 12, 10); }
      ctx.fillStyle = '#c8a040'; ctx.fillRect(tx - 4, hz - 800 * s, 8, 100 * s); ctx.fillStyle = '#c03028'; ctx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rad = k % 2 ? 7 : 16; ctx.lineTo(tx + Math.cos(a) * rad, hz - 805 * s + Math.sin(a) * rad); } ctx.fill(); }
    for (const side of [0, 1]) { let x = side ? W * .8 : -40; for (let i = 0; i < 4; i++) { const bw = rr.range(260, 380), bh = rr.range(420, 600); M.wall(ctx, rr, [x, hz - bh + 60, bw, bh], mix('#6e6a66', '#8a8278', rr()), { density: 260 }); M.windowGrid(ctx, rr, [x + 20, hz - bh + 90, bw - 40, bh - 90], 5, 10, '#2e3038', 'rgba(60,56,52,.8)', .35, '#f2cc88'); ctx.fillStyle = '#b8b0a2'; ctx.fillRect(x - 6, hz - bh + 52, bw + 12, 14); x += bw; if (!side && x > W * .2) break; if (side && x > W) break; } }
    ENV.texBand(ctx, r, W, Math.round(hz + 20), H, [[0, [70, 72, 78]], [.5, [52, 54, 60]], [1, [38, 40, 46]]], { sx: .004, persp: 1.2 });
    ctx.fillStyle = '#8a8680'; poly(ctx, [[0, hz + 30], [W * .3, hz + 20], [0, H * .62]]); ctx.fill(); poly(ctx, [[W, hz + 30], [W * .7, hz + 20], [W, H * .62]]); ctx.fill();
    for (let k = -3; k <= 3; k++) { ctx.strokeStyle = k ? 'rgba(235,235,225,.55)' : 'rgba(240,210,120,.7)'; ctx.lineWidth = 6; ctx.setLineDash(k ? [60, 70] : []); ctx.beginPath(); ctx.moveTo(W / 2 + k * 40, hz + 24); ctx.lineTo(W / 2 + k * 480, H); ctx.stroke(); } ctx.setLineDash([]);
    for (let i = 0; i < 9; i++) { const lx = W * (.08 + i * .105), ly = hz + 30 + Math.abs(i - 4) * 4; ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(lx, ly, lx, H); g.addColorStop(0, i % 2 ? 'rgba(255,90,60,.45)' : 'rgba(255,230,170,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(lx - 10, ly, 20, H - ly); ctx.restore(); glow(ctx, lx, ly - 4, 40, i % 2 ? '#ff5a3a' : '#ffe6a8', .6); }
    for (let i = 0; i < 8; i++) { const t = Math.pow(i / 8, .7), x = t * W * .28, y = H * .62 - t * (H * .62 - hz - 22), s = 1 - t * .85; ctx.fillStyle = '#2a2c30'; ctx.fillRect(x, y - 520 * s, 8 * s + 2, 520 * s); ctx.fillRect(x, y - 520 * s, 70 * s, 6 * s + 1); glow(ctx, x + 70 * s, y - 514 * s, 120 * s, '#ffd890', .5); }
    for (let i = 0; i < 2600; i++) { const x = r.range(0, W), y = r.range(hz + 30, H); stroke(ctx, r, x, y, 26, Math.PI / 2, 3, [150, 156, 168], .07); }
    FIN(ctx, r, W, H, .32, 90000);
    ctx.save(); ctx.lineCap = 'round'; for (let i = 0; i < 1600; i++) { const x = r.range(0, W), y = r.range(0, H), l = r.range(20, 50); ctx.strokeStyle = `rgba(225,230,240,${r.range(.2, .5)})`; ctx.lineWidth = r.range(1.5, 3); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - l * .3, y + l); ctx.stroke(); } ctx.restore();
  };

  // Birch forest crossed by a railway line, overcast summer.
  ENV.birchRail = (ctx, r, W, H) => {
    const hz = H * .56, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz + 40, '#7a8ea8', '#dfe2e4', { strokes: 2800 }); ENV.clouds(ctx, r, W, 0, hz * .55, 14, '#f4f4f2', '#bcc4cc', '#7a8494');
    M.hills(ctx, r, P.Noise(7), W, hz - 40, 30, .003, 2, '#6a7a72', { density: 500 });
    M.distantTrees(ctx, rr, W, hz, 220, '#4e6a44', { scale: 1.3 });
    M.ground(ctx, r, W, H, hz, '#6a7e3e', '#8a9a5a');
    const leaves = (x, y, rad, n, light) => { for (let k = 0; k < n; k++) { const a = rr() * 7, d = Math.sqrt(rr()) * rad, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * .8, up = (y - py) / rad; const c = mix('#4e6a2e', light ? '#c8d880' : '#9ab060', Math.max(0, Math.min(1, .5 + up * .5 + rr.gauss() * .15))); stroke(ctx, rr, px, py, rr.range(8, 18) * rad / 120, rr() * 6, rr.range(4, 9) * rad / 120, c, .55); } };
    const birch = (x, y, h, s) => { ctx.fillStyle = '#e8e4da'; ctx.beginPath(); ctx.moveTo(x - 9 * s, y); ctx.lineTo(x - 5 * s, y - h); ctx.lineTo(x + 5 * s, y - h); ctx.lineTo(x + 9 * s, y); ctx.fill(); const g = ctx.createLinearGradient(x - 9 * s, 0, x + 9 * s, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(60,60,70,.35)'); ctx.fillStyle = g; ctx.fillRect(x - 9 * s, y - h, 18 * s, h);
      for (let k = 0; k < h / 26; k++) { ctx.fillStyle = '#26221e'; const yy = y - rr() * h; ctx.fillRect(x - 8 * s + rr() * 6 * s, yy, rr.range(5, 14) * s, rr.range(2, 4) * s); }
      for (let b = 0; b < 4; b++) { const by = y - h * (.5 + b * .14), bl = rr.range(40, 90) * s, d = rr() < .5 ? -1 : 1; ctx.strokeStyle = '#3a3630'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x, by); ctx.quadraticCurveTo(x + d * bl * .5, by - bl * .5, x + d * bl, by - bl * .2); ctx.stroke(); }
      for (let b = 0; b < 6; b++) leaves(x + rr.gauss() * 50 * s, y - h * (.55 + rr() * .45), 70 * s, 140 * s, b % 2); };
    for (let i = 0; i < 34; i++) birch(rr.range(0, W), hz + rr.range(6, 30), rr.range(320, 460), .75);
    const ty = H * .76; paintRegion(ctx, r, [[0, ty + 70], [0, ty - 24], [W, ty - 24], [W, ty + 70]], '#7a6e62', { density: 260, len: [6, 18], w: [3, 7], ang: 0, angJ: 1, al: .5 });
    for (let x = -10; x < W; x += 46) { ctx.fillStyle = '#3e2c1e'; ctx.fillRect(x, ty - 10, 30, 36); ctx.fillStyle = 'rgba(255,230,200,.15)'; ctx.fillRect(x, ty - 10, 30, 4); }
    for (const yy of [ty - 6, ty + 14]) { ctx.fillStyle = '#5a5a60'; ctx.fillRect(0, yy, W, 8); ctx.fillStyle = '#c8ccd2'; ctx.fillRect(0, yy, W, 2.5); }
    for (let x = 120; x < W; x += 620) { ctx.fillStyle = '#4a3a2a'; ctx.fillRect(x, ty - 520, 12, 500); ctx.fillRect(x - 40, ty - 500, 92, 8); } ctx.strokeStyle = 'rgba(30,30,30,.55)'; ctx.lineWidth = 1.5; for (const dy of [-498, -490]) { ctx.beginPath(); for (let x = 120; x < W + 620; x += 620) { ctx.moveTo(x - 30, ty + dy); ctx.quadraticCurveTo(x + 280, ty + dy + 30, x + 590, ty + dy); } ctx.stroke(); }
    M.grassTufts(ctx, rr, W, ty + 60, H, 160, ['#6a8a3a', '#8aa04a', '#5a7a30'], { h: 46 });
    for (const x of [W * .05, W * .9]) birch(x, H * 1.02, 1500, 1.8);
    FIN(ctx, r, W, H, .28);
  };

  // Dresden street at night in the 1980s: old facades, a street lamp, falling snow.
  ENV.dresdenNight = (ctx, r, W, H) => {
    const hz = H * .74, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, H * .35, '#060914', '#1a2440', { strokes: 1400 });
    let x = -60; while (x < W) { const bw = rr.range(300, 440), bh = rr.range(760, 980), col = mix('#4a4846', '#6e665a', rr());
      M.wall(ctx, rr, [x, hz - bh, bw, bh], col, { density: 400 });
      ctx.fillStyle = '#2a2a30'; poly(ctx, [[x - 8, hz - bh], [x + 40, hz - bh - 150], [x + bw - 40, hz - bh - 150], [x + bw + 8, hz - bh]]); ctx.fill(); ctx.fillStyle = 'rgba(230,236,245,.85)'; poly(ctx, [[x + 40, hz - bh - 150], [x + bw - 40, hz - bh - 150], [x + bw - 34, hz - bh - 140], [x + 46, hz - bh - 140]]); ctx.fill();
      for (let dx = x + 70; dx < x + bw - 80; dx += 120) { ctx.fillStyle = '#3a3a40'; ctx.fillRect(dx, hz - bh - 110, 50, 70); ctx.fillStyle = rr() < .3 ? '#f0c070' : '#141824'; ctx.fillRect(dx + 10, hz - bh - 96, 30, 44); }
      for (let fy = hz - bh; fy < hz - 120; fy += 200) { ctx.fillStyle = rgb(shade(col, .2)); ctx.fillRect(x, fy, bw, 12); ctx.fillStyle = 'rgba(230,236,245,.7)'; ctx.fillRect(x, fy - 4, bw, 4); }
      for (let fy = hz - bh + 50; fy < hz - 200; fy += 200) for (let fx = x + 40; fx < x + bw - 70; fx += 110) { const lit = rr() < .32; ctx.fillStyle = rgb(shade(col, .25)); ctx.fillRect(fx - 8, fy - 14, 66, 120); ctx.fillStyle = lit ? '#f2c478' : '#121622'; ctx.fillRect(fx, fy, 50, 96); ctx.fillStyle = rgb(shade(col, .25)); ctx.fillRect(fx + 23, fy, 4, 96); ctx.fillRect(fx, fy + 36, 50, 4);
        if (lit) { glow(ctx, fx + 25, fy + 48, 110, '#ffc878', .16); ctx.fillStyle = 'rgba(150,60,40,.45)'; ctx.fillRect(fx, fy, 12, 96); } ctx.fillStyle = 'rgba(230,236,245,.8)'; ctx.fillRect(fx - 10, fy + 100, 70, 5); }
      if (rr() < .6) { const dx = x + bw / 2 - 45; ctx.fillStyle = '#1e1a18'; ctx.beginPath(); ctx.moveTo(dx, hz); ctx.lineTo(dx, hz - 190); ctx.arc(dx + 45, hz - 190, 45, Math.PI, 0); ctx.lineTo(dx + 90, hz); ctx.fill(); }
      x += bw + 4; }
    { ctx.fillStyle = '#2e3038'; ctx.fillRect(0, hz, W, H - hz); for (let y = hz + 4; y < H; ) { const t = (y - hz) / (H - hz), sh = 6 + t * 30, sw = 14 + t * 60; for (let x2 = -rr() * sw; x2 < W; x2 += sw) { ctx.fillStyle = rgb(jitter(mix('#3e4048', '#585a64', rr()), rr, 6)); ctx.beginPath(); ctx.roundRect(x2 + 2, y, sw - 4, sh - 3, sh * .3); ctx.fill(); ctx.fillStyle = 'rgba(220,226,236,.18)'; ctx.fillRect(x2 + 4, y, sw - 8, 2); } y += sh; } }
    ctx.fillStyle = '#5a5a60'; ctx.fillRect(0, hz - 4, W, 14);
    const lx = W * .62; ctx.fillStyle = '#16161a'; ctx.fillRect(lx - 9, hz - 660, 18, 660); ctx.fillRect(lx - 20, hz - 20, 40, 20); ctx.beginPath(); ctx.moveTo(lx - 34, hz - 650); ctx.lineTo(lx + 34, hz - 650); ctx.lineTo(lx + 22, hz - 700); ctx.lineTo(lx - 22, hz - 700); ctx.fill();
    glow(ctx, lx, hz - 660, 600, '#ffd890', .55); ctx.fillStyle = '#ffe8b8'; ctx.fillRect(lx - 22, hz - 696, 44, 40);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(lx, hz + 60, 0, lx, hz + 60, 760); g.addColorStop(0, 'rgba(255,210,140,.42)'); g.addColorStop(1, 'rgba(255,210,140,0)'); ctx.fillStyle = g; ctx.fillRect(0, hz - 200, W, H - hz + 200);
    ctx.fillStyle = 'rgba(255,220,160,.08)'; poly(ctx, [[lx - 22, hz - 656], [lx + 22, hz - 656], [lx + 360, H], [lx - 360, H]]); ctx.fill(); ctx.restore();
    for (let i = 0; i < 1800; i++) { ctx.fillStyle = `rgba(235,240,250,${rr.range(.2, .5)})`; ctx.fillRect(rr.range(0, W), hz - 4 + rr() * 16, rr.range(4, 16), 3); }
    FIN(ctx, r, W, H, .45);
    for (let i = 0; i < 1600; i++) { const d = r(); ctx.fillStyle = `rgba(255,255,255,${.3 + d * .5})`; ctx.beginPath(); ctx.arc(r.range(0, W), r.range(0, H), 1 + d * 3, 0, 7); ctx.fill(); }
  };

  // Military airfield, grey sky.
  ENV.airfield = (ctx, r, W, H) => {
    const hz = H * .56, rr = P.RNG(r.int(1, 1e6)); M.sky(ctx, r, W, hz + 40, '#5e6e84', '#c6ced6', { strokes: 3000 }); ENV.clouds(ctx, r, W, 0, hz * .7, 18, '#eef0f2', '#a6aebc', '#646e7e');
    M.hills(ctx, r, P.Noise(5), W, hz - 20, 40, .002, 3, '#5e6c66', { density: 600 });
    M.distantTrees(ctx, rr, W, hz, 200, '#3e5038', { scale: 1.1 });
    M.ground(ctx, r, W, H, hz, '#5e7238', '#869464');
    M.grassTufts(ctx, rr, W, hz + 60, H, 90, ['#5e7238', '#7a8a48'], { h: 36 });
    const rw = [[W * .06, H], [W * .45, hz + 4], [W * .55, hz + 4], [W * .94, H]]; paintRegion(ctx, r, rw, '#55575c', { density: 260, len: [20, 70], w: [4, 10], ang: 0, angJ: .1, al: .35 });
    ctx.strokeStyle = 'rgba(240,240,236,.8)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(W * .08, H); ctx.lineTo(W * .452, hz + 6); ctx.moveTo(W * .92, H); ctx.lineTo(W * .548, hz + 6); ctx.stroke();
    for (let k = 0; k < 16; k++) { const t = Math.pow(k / 16, 1.6), y = H - t * (H - hz) * .95, s = 1 - t * .9, y2 = y - 50 * s; ctx.fillStyle = 'rgba(240,240,236,.8)'; ctx.fillRect(W / 2 - 4 * s - 1, y2, 8 * s + 2, 30 * s + 1); }
    for (let k = 0; k < 6; k++) { ctx.fillStyle = 'rgba(240,240,236,.75)'; ctx.fillRect(W * .2 + k * W * .03, H * .93, W * .018, H * .05); ctx.fillRect(W * .62 + k * W * .03, H * .93, W * .018, H * .05); }
    ctx.save(); ctx.globalAlpha = .25; for (let k = 0; k < 30; k++) { ctx.strokeStyle = '#1a1a1c'; ctx.lineWidth = rr.range(4, 12); const x0 = W / 2 + rr.gauss() * 80, y0 = rr.range(H * .7, H); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + rr.gauss() * 20, y0 - rr.range(60, 200)); ctx.stroke(); } ctx.restore();
    { const x0 = W * .04, x1 = W * .3, y0 = hz + 12; ctx.fillStyle = '#8a9096'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 - 120); ctx.quadraticCurveTo((x0 + x1) / 2, y0 - 220, x1, y0 - 120); ctx.lineTo(x1, y0); ctx.fill(); for (let x = x0 + 10; x < x1; x += 14) { ctx.fillStyle = 'rgba(40,44,50,.35)'; ctx.fillRect(x, y0 - 110, 3, 110); } ctx.fillStyle = '#5a6066'; ctx.fillRect(x0 + 40, y0 - 90, x1 - x0 - 80, 90); }
    { const tx = W * .8; M.wall(ctx, rr, [tx - 26, hz - 200, 52, 214], '#d8d2c6', { density: 80 }); ctx.fillStyle = '#26384a'; ctx.fillRect(tx - 46, hz - 250, 92, 50); ctx.fillStyle = 'rgba(200,220,240,.4)'; ctx.fillRect(tx - 44, hz - 248, 88, 10); ctx.fillStyle = '#e8e4da'; ctx.fillRect(tx - 52, hz - 256, 104, 8); ctx.fillStyle = '#c03028'; ctx.fillRect(tx - 2, hz - 300, 4, 44); }
    { const wx = W * .66, wy = hz + 30; ctx.fillStyle = '#d8d8d8'; ctx.fillRect(wx, wy - 120, 5, 120); ctx.fillStyle = '#e86a2a'; poly(ctx, [[wx + 5, wy - 120], [wx + 80, wy - 108], [wx + 80, wy - 96], [wx + 5, wy - 98]]); ctx.fill(); ctx.fillStyle = '#f2f2f2'; for (let k = 1; k < 4; k += 2) ctx.fillRect(wx + 5 + k * 18, wy - 118 + k, 16, 18); }
    FIN(ctx, r, W, H, .26);
  };
})(window);

window.PLATES = {
  office_a: (c, r, W, H) => ENV.kremlinOffice(c, r, W, H, { v: 0 }),
  office_b: (c, r, W, H) => ENV.kremlinOffice(c, r, W, H, { v: 1 }),
  office_c: (c, r, W, H) => ENV.kremlinOffice(c, r, W, H, { v: 2 }),
  long_table: (c, r, W, H) => ENV.longTable(c, r, W, H),
  jet_cabin: (c, r, W, H) => ENV.jetCabin(c, r, W, H),
  moscow_road: (c, r, W, H) => ENV.moscowRoad(c, r, W, H),
  birch_rail: (c, r, W, H) => ENV.birchRail(c, r, W, H),
  dresden_night: (c, r, W, H) => ENV.dresdenNight(c, r, W, H),
  airfield: (c, r, W, H) => ENV.airfield(c, r, W, H),
  map_russia: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 20, lon1: 60, lat0: 40, lat1: 62 }, grid: 5, compass: [22, 42], title: 'Rossiya', titleXY: [1880, 1010],
    labels: [[37.6, 55.75, 'Moscow', 28, true], [37.2, 55.7, 'Novo-Ogaryovo', 20, true], [33.2, 58, 'Valdai', 22, true], [30.3, 59.9, 'St Petersburg', 22, true], [39.7, 43.6, 'Sochi', 22, true], [38.2, 44.4, 'Cape Idokopas', 18, true], [31, 49, 'UKRAINE', 30], [36, 44, 'Black Sea', 26, true]],
    mountains: [[42, 43, 8, 2]], rivers: [], greens: [[35, 57, 8]], deserts: [] }),
};
