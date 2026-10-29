// NVIDIA act 3 plates: Sega boardroom in Tokyo on a rainy night, Nvidia's small engineering room with a whiteboard.
// Paint: node shared/p2/paint.js nvidia/production/plates_act3.js nvidia/production/plates all
(function (G) {
  const P = G.P2, ENV = G.ENV, { rgb, shade, glow, poly, paintRegion } = P;
  const rect = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, Object.assign({ density: 120, len: [10, 40], w: [3, 8], ang: 0, angJ: .2, al: .3, topLight: .06, botDark: -.16, var: 8 }, o));
  // rainy city seen through glass: painted offscreen, softened once
  const rainyCity = (c, r, x, y, w, h) => { const off = document.createElement('canvas'); off.width = w; off.height = h; const o = off.getContext('2d');
    const g = o.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0d1222'); g.addColorStop(.7, '#1c2440'); g.addColorStop(1, '#2a2a3a'); o.fillStyle = g; o.fillRect(0, 0, w, h);
    for (let layer = 0; layer < 3; layer++) { const n = 18 - layer * 4; for (let i = 0; i < n; i++) { const bw = r.range(60, 160) * (1 + layer * .4), bx = r.range(-50, w), bh = r.range(.25, .75) * h * (1 - layer * .15), by = h - bh; o.fillStyle = ['#1a2034', '#202840', '#283048'][layer]; o.fillRect(bx, by, bw, bh); for (let yy = by + 12; yy < h - 8; yy += 18) for (let xx = bx + 8; xx < bx + bw - 10; xx += 16) if (r() < .3) { o.fillStyle = r() < .2 ? 'rgba(255,120,140,.7)' : `rgba(255,${200 + r.int(0, 40)},140,${.4 + r() * .4})`; o.fillRect(xx, yy, 8, 9); } } }
    // neon signs
    for (const [nx, ny, col] of [[.18, .55, '#ff4a6a'], [.52, .48, '#4ad8ff'], [.8, .6, '#ffd24a']]) { o.fillStyle = col; o.fillRect(nx * w, ny * h, 26, 90); glow(o, nx * w + 13, ny * h + 45, 120, col, .35); }
    // one tall tower with a red beacon (Tokyo Tower style lattice)
    { const tx = w * .66, tb = h, tt = h * .12; o.strokeStyle = '#d8582a'; o.lineWidth = 6; o.beginPath(); o.moveTo(tx - 70, tb); o.lineTo(tx, tt); o.lineTo(tx + 70, tb); o.stroke(); o.lineWidth = 3; for (let k = 1; k < 8; k++) { const yy = tt + (tb - tt) * k / 8, hw = 70 * k / 8; o.beginPath(); o.moveTo(tx - hw, yy); o.lineTo(tx + hw, yy); o.stroke(); } glow(o, tx, tt, 60, '#ff3a2a', .6); }
    c.save(); c.filter = 'blur(5px)'; c.drawImage(off, x, y); c.restore();
    // rain on the glass: streaks + droplets, crisp
    c.save(); for (let i = 0; i < 900; i++) { const dx = x + r() * w, dy = y + r() * h, rr = r.range(2, 7); c.fillStyle = `rgba(200,220,255,${.12 + r() * .25})`; c.beginPath(); c.ellipse(dx, dy, rr * .8, rr, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(dx - rr * .3, dy - rr * .5, 1.5, 1.5); }
    for (let i = 0; i < 120; i++) { const sx = x + r() * w, sy = y + r() * h * .6, L = r.range(60, 260); c.strokeStyle = `rgba(190,210,250,${.1 + r() * .18})`; c.lineWidth = r.range(1.5, 3.5); c.beginPath(); c.moveTo(sx, sy); c.bezierCurveTo(sx + r.gauss() * 6, sy + L * .3, sx + r.gauss() * 8, sy + L * .7, sx + r.gauss() * 6, sy + L); c.stroke(); } c.restore(); };
  ENV.tokyoBoardroom = (ctx, r, W, H) => { const c = ctx, FL = 1020;
    // ceiling + walls
    rect(c, r, 0, 0, W, 150, '#2a221c', { density: 120 }); for (const lx of [420, 1280, 2140]) { c.fillStyle = '#fff0d0'; c.beginPath(); c.ellipse(lx, 132, 60, 12, 0, 0, 7); c.fill(); glow(c, lx, 180, 360, '#ffe0a8', .22); }
    rect(c, r, 0, 150, 300, FL - 150, '#5a3a24', { density: 200, ang: -Math.PI / 2 }); rect(c, r, W - 300, 150, 300, FL - 150, '#5a3a24', { density: 200, ang: -Math.PI / 2 });
    // big window
    rainyCity(c, r, 300, 170, W - 600, 640); c.fillStyle = '#1a1410'; for (let x = 300; x <= W - 300; x += (W - 600) / 4) c.fillRect(x - 9, 160, 18, 670); c.fillRect(300, 160, W - 600, 18); c.fillRect(300, 800, W - 600, 30);
    c.fillStyle = 'rgba(255,220,170,.06)'; c.fillRect(300, 170, W - 600, 640);
    // wall under the window: wood panels
    rect(c, r, 300, 830, W - 600, FL - 830, '#6a4428', { density: 160 }); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 3; for (let x = 300; x < W - 300; x += 140) { c.beginPath(); c.moveTo(x, 840); c.lineTo(x, FL); c.stroke(); }
    // hanging scroll on the left wall + bonsai on the right
    { const sx = 150, sy = 260; c.fillStyle = '#3a2a1a'; c.fillRect(sx - 70, sy - 10, 140, 12); c.fillStyle = '#efe6cc'; c.fillRect(sx - 58, sy, 116, 420); c.strokeStyle = '#8a6a3a'; c.lineWidth = 6; c.strokeRect(sx - 58, sy, 116, 420); c.strokeStyle = '#1a1410'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(sx - 10, sy + 70); c.quadraticCurveTo(sx + 20, sy + 120, sx - 5, sy + 200); c.moveTo(sx - 30, sy + 240); c.lineTo(sx + 25, sy + 250); c.moveTo(sx, sy + 270); c.quadraticCurveTo(sx - 15, sy + 320, sx + 10, sy + 360); c.stroke(); c.fillStyle = '#b8241c'; c.fillRect(sx + 18, sy + 370, 18, 18); c.fillStyle = '#3a2a1a'; c.fillRect(sx - 70, sy + 420, 140, 14); }
    { const bx = W - 150, by = 760; rect(c, r, bx - 110, by, 220, 260, '#3a2618', { density: 60 }); c.fillStyle = '#4a4a52'; c.beginPath(); c.ellipse(bx, by - 10, 90, 22, 0, 0, 7); c.fill(); c.strokeStyle = '#4a3020'; c.lineWidth = 12; c.beginPath(); c.moveTo(bx, by - 20); c.quadraticCurveTo(bx - 40, by - 90, bx + 10, by - 150); c.stroke(); for (const [px, py, pr] of [[-60, -170, 50], [30, -190, 56], [70, -130, 40], [-20, -230, 40]]) { c.fillStyle = '#2f5a2a'; c.beginPath(); c.ellipse(bx + px, by + py, pr, pr * .6, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(140,200,120,.3)'; c.beginPath(); c.ellipse(bx + px - 10, by + py - 10, pr * .5, pr * .25, 0, 0, 7); c.fill(); } }
    // floor: dark polished wood with window reflections
    rect(c, r, 0, FL, W, H - FL, '#3a2618', { density: 260, ang: 0, var: 6 }); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2; for (let y = FL + 30; y < H; y += 38 + (y - FL) * .08) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, FL, 0, FL + 160); g.addColorStop(0, 'rgba(120,150,220,.14)'); g.addColorStop(1, 'rgba(120,150,220,0)'); c.fillStyle = g; c.fillRect(300, FL, W - 600, 160); c.restore();
    // low table in the middle, two tea cups
    { const ty = 1180; c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(1280, ty + 120, 520, 40, 0, 0, 7); c.fill(); rect(c, r, 800, ty, 960, 40, '#2a1a10', { density: 60, topLight: .2 }); rect(c, r, 820, ty + 40, 920, 26, '#1e120a', { density: 30 }); for (const lx of [840, 1700]) rect(c, r, lx, ty + 66, 40, 70, '#1e120a', { density: 20 }); c.fillStyle = 'rgba(255,220,170,.18)'; c.fillRect(800, ty, 960, 6);
      for (const cx of [1100, 1460]) { c.fillStyle = '#d8d0b8'; c.beginPath(); c.ellipse(cx, ty - 4, 34, 10, 0, 0, 7); c.fill(); c.fillStyle = '#c8c0a8'; c.fillRect(cx - 28, ty - 44, 56, 40); c.fillStyle = '#3a6a3a'; c.beginPath(); c.ellipse(cx, ty - 44, 28, 8, 0, 0, 7); c.fill(); c.strokeStyle = '#2a2a24'; c.lineWidth = 2; c.strokeRect(cx - 28, ty - 44, 56, 40); } }
    ENV.impasto(ctx, r, W, H, { n: 90000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 6, vig: .45 }); };
  // small engineering room: whiteboard wall, cubicle edges, a 3D model printout pinned up
  ENV.labWhiteboard = (ctx, r, W, H) => { const c = ctx, FL = 1060;
    rect(c, r, 0, 0, W, FL, '#c8c0ac', { density: 260, ang: -Math.PI / 2, var: 6 }); rect(c, r, 0, 0, W, 90, '#e8e4da', { density: 60 }); for (let x = 200; x < W; x += 600) { c.fillStyle = '#f8f4e8'; c.fillRect(x, 70, 260, 20); glow(c, x + 130, 120, 420, '#fff6e0', .25); }
    // whiteboard
    const bx = 520, by = 200, bw = 1520, bh = 680; c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(bx + 16, by + 20, bw, bh); c.fillStyle = '#f6f8f8'; c.fillRect(bx, by, bw, bh); c.strokeStyle = '#8a9098'; c.lineWidth = 14; c.strokeRect(bx, by, bw, bh); c.fillStyle = '#9aa0a8'; c.fillRect(bx + 100, by + bh + 4, bw - 200, 18); for (const [mx, col] of [[bx + 300, '#c8302a'], [bx + 360, '#2a4ac8'], [bx + 420, '#1a1a1a']]) { c.fillStyle = col; c.fillRect(mx, by + bh - 4, 46, 12); }
    c.save(); c.globalAlpha = .12; c.strokeStyle = '#4a6ac8'; c.lineWidth = 6; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(bx + 1100 + k * 30, by + 80); c.lineTo(bx + 1300 + k * 20, by + 240); c.stroke(); } c.restore();
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(bx, by, bx + bw, by + bh); g.addColorStop(0, 'rgba(255,255,255,.4)'); g.addColorStop(.3, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(bx, by, bw, bh); c.restore();
    // pinned printouts + cork strip on the left, server rack hint on the right
    rect(c, r, 120, 260, 300, 520, '#b88a5a', { density: 120 }); for (let i = 0; i < 6; i++) { const px = 140 + (i % 2) * 140, py = 290 + Math.floor(i / 2) * 160; c.save(); c.translate(px + 60, py + 60); c.rotate(r.range(-.08, .08)); c.fillStyle = '#f6f2e6'; c.fillRect(-60, -60, 120, 140); c.strokeStyle = 'rgba(40,40,60,.4)'; c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(-48, -40 + k * 18); c.lineTo(48, -40 + k * 18); c.stroke(); } c.fillStyle = '#c8302a'; c.beginPath(); c.arc(0, -54, 6, 0, 7); c.fill(); c.restore(); }
    rect(c, r, 2160, 220, 300, FL - 220, '#2a2c32', { density: 120 }); for (let y = 250; y < FL - 40; y += 70) { c.fillStyle = '#3a3c44'; c.fillRect(2180, y, 260, 54); for (let k = 0; k < 6; k++) { c.fillStyle = r() < .5 ? '#5aff8a' : '#ffb84a'; c.fillRect(2200 + k * 14, y + 22, 6, 6); } }
    // floor: grey carpet tiles + cubicle partition at front edges
    rect(c, r, 0, FL, W, H - FL, '#5a5c64', { density: 260, var: 8 }); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 2; for (let x = 0; x < W; x += 160) { c.beginPath(); c.moveTo(x, FL); c.lineTo(x - (x - 1280) * .3, H); c.stroke(); }
    ENV.impasto(ctx, r, W, H, { n: 80000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 6, vig: .36 }); };
})(window);
window.PLATES = {
  tokyo_room: (c, r, W, H) => ENV.tokyoBoardroom(c, r, W, H),
  lab_wb: (c, r, W, H) => ENV.labWhiteboard(c, r, W, H),
};
