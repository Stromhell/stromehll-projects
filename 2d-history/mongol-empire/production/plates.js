// Mongol Empire painted plates. Paint with: node shared/p2/paint.js mongol-empire/production/plates.js mongol-empire/production/plates all
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { rgb, mix, jitter, shade, stroke, fillStrokes, glow, poly, paintRegion } = P;
  const STP = {
    dawn: { felt: '#e8d4bc', skyTop: '#5a7aa8', skyBot: '#f4c08a', sun: ['#fff4d0', '#ffa860'], sunPos: [.78, .5], far: '#8e8ca8', mid: '#7f8a6a', ground: [[0, '#4e5a2c'], [.35, '#6f7a3c'], [.6, '#8f9450'], [.8, '#a9a066'], [1, '#c2b07a']], grass: ['#3e4a22', '#7f8a44', '#e8d79a'], cloud: ['#ffe2bc', '#c49aa4', '#7a7896'], haze: '#ffc080', litLeft: false, shadowAng: Math.PI * .99 },
    day: { felt: '#efe6d2', skyTop: '#2f6fb8', skyBot: '#cfe2ee', sun: ['#fffbe8', '#fff3c8'], sunPos: [.25, .12], far: '#8fa6c0', mid: '#7c946a', ground: [[0, '#52622c'], [.35, '#73883c'], [.6, '#93a24e'], [.8, '#aeb466'], [1, '#c6c486']], grass: ['#425426', '#88a04a', '#eef0b0'], cloud: ['#ffffff', '#e2eaf2', '#a4b6c8'], haze: '#fff6dc', litLeft: true, shadowAng: Math.PI * .58 },
    dusk: { felt: '#c49a7a', skyTop: '#2a2c58', skyBot: '#ee8a4e', sun: ['#ffe0a6', '#ff7c3c'], sunPos: [.22, .55], far: '#5c4e72', mid: '#5c5040', ground: [[0, '#2e2814'], [.35, '#4e4424'], [.6, '#6e5e32'], [.8, '#8a7040'], [1, '#9c7c48']], grass: ['#2a2412', '#6e5a2c', '#ffb466'], cloud: ['#ffc48a', '#c0607a', '#4a3a60'], haze: '#ff8a40', litLeft: true, shadowAng: Math.PI * .03 },
    snow: { felt: '#ddd8ce', skyTop: '#7f90a8', skyBot: '#dfe4ea', sun: null, sunPos: [.5, .2], far: '#a8b2c2', mid: '#b8c0cc', ground: [[0, '#b6bcc6'], [.35, '#c8ced6'], [.6, '#d8dde3'], [.8, '#e6e9ee'], [1, '#f2f3f6']], grass: ['#7a7a6a', '#a4a08a', '#f4f4f0'], cloud: ['#f0f2f6', '#c4cad4', '#9aa2b0'], haze: '#e8ecf2', litLeft: true, shadowAng: Math.PI * .08, snow: true },
    night: { felt: '#5c6278', skyTop: '#070b1c', skyBot: '#1f2a4a', sun: null, sunPos: [.5, .2], moon: [.76, .16], far: '#1c2238', mid: '#1a1e26', ground: [[0, '#0e0f12'], [.25, '#16181c'], [.5, '#1e2026'], [.75, '#262830'], [1, '#2e3038']], grass: ['#0d0e10', '#283030', '#5a6a80'], cloud: ['#4a5478', '#2a3150', '#121a30'], haze: '#30406a', litLeft: false, shadowAng: Math.PI * .5 },
  };
  // A felt ger: lattice wall cylinder, conical roof, painted door, smoke from the crown.
  ENV.ger = (ctx, r, x, y, w, c, o = {}) => {
    const h = w * .42, roof = w * .3, lit = c.litLeft ? -1 : 1, felt = o.felt || c.felt || '#efe6d2';
    M.castShadow(ctx, x, y + 4, w * 1.2, w * .18, c.shadowAng, .32); M.contactShadow(ctx, x, y + 4, w * .6, w * .08, .45);
    // wall
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, rgb(shade(felt, lit < 0 ? .08 : -.3))); g.addColorStop(1, rgb(shade(felt, lit < 0 ? -.3 : .08)));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x + w / 2, y - h); ctx.quadraticCurveTo(x + w / 2, y + w * .04, x + w / 2 - 2, y); ctx.quadraticCurveTo(x, y + w * .08, x - w / 2 + 2, y); ctx.closePath(); ctx.fill();
    fillStrokes(ctx, r, [x - w / 2, y - h, w, h], () => true, { n: Math.round(w * 2.2), len: [8, 22], w: [2, 5], ang: Math.PI / 2, angJ: .15, al: .25, colFn: (xx) => shade(felt, ((xx - x) / (w / 2)) * lit * .22 - .06) });
    // rope bands
    ctx.strokeStyle = rgb(shade('#8a5a30', -.1), .85); ctx.lineWidth = Math.max(2, w * .012);
    for (const f of [.28, .62]) { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h * (1 - f)); ctx.quadraticCurveTo(x, y - h * (1 - f) + w * .05, x + w / 2, y - h * (1 - f)); ctx.stroke(); }
    // roof cone
    const g2 = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g2.addColorStop(0, rgb(shade(felt, lit < 0 ? .12 : -.25))); g2.addColorStop(1, rgb(shade(felt, lit < 0 ? -.25 : .12)));
    ctx.fillStyle = g2; ctx.beginPath(); ctx.moveTo(x - w / 2 - w * .03, y - h + 2); ctx.quadraticCurveTo(x, y - h + w * .05, x + w / 2 + w * .03, y - h + 2); ctx.lineTo(x + w * .07, y - h - roof); ctx.lineTo(x - w * .07, y - h - roof); ctx.closePath(); ctx.fill();
    for (let k = 0; k < w * .9; k++) { const t = r(), side = r() * 2 - 1, px = x + side * (w * .07 + (w / 2 - w * .07) * t), py = y - h - roof + roof * t; stroke(ctx, r, px, py, 10 + t * 18, Math.atan2(roof, side * w / 2) , 3, shade(felt, side * lit * .2 - .08), .22); }
    // roof ropes radiating
    ctx.strokeStyle = rgb(shade('#8a5a30', -.2), .6); ctx.lineWidth = Math.max(1.5, w * .007);
    for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(x + k * w * .02, y - h - roof); ctx.lineTo(x + k * w * .16, y - h + w * .04); ctx.stroke(); }
    // crown + chimney pipe
    ctx.fillStyle = rgb(shade('#6a4a2a', -.1)); ctx.fillRect(x - w * .07, y - h - roof - w * .015, w * .14, w * .02);
    if (o.smoke !== false) { ctx.fillStyle = '#3a3430'; ctx.fillRect(x + w * .02, y - h - roof - w * .09, w * .025, w * .08); ENV.smoke(ctx, r, x + w * .032, y - h - roof - w * .09, w * .9, c.snow ? '#e6e8ee' : '#d8d2c8', .14); }
    // painted door: orange-red with gold trim
    if (o.door !== false) { const dx = x + (o.doorAt ?? 0) * w, dw = w * .12, dh = h * .7; ctx.fillStyle = '#7a3a1a'; ctx.fillRect(dx - dw / 2 - 4, y - dh - 4, dw + 8, dh + 4);
      ctx.fillStyle = o.glow ? '#ffb257' : '#c8502a'; ctx.fillRect(dx - dw / 2, y - dh, dw, dh); if (o.glow) glow(ctx, dx, y - dh / 2, w * .5, '#ffae4a', .4);
      ctx.strokeStyle = '#e8b84a'; ctx.lineWidth = Math.max(1.5, w * .006); ctx.strokeRect(dx - dw / 2 + dw * .12, y - dh + dh * .1, dw * .76, dh * .8); ctx.beginPath(); ctx.moveTo(dx, y - dh + dh * .1); ctx.lineTo(dx, y - dh * .1); ctx.stroke(); }
    // outline in warm ink
    ctx.strokeStyle = 'rgba(40,24,14,.55)'; ctx.lineWidth = Math.max(2, w * .008); ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + 2, y); ctx.quadraticCurveTo(x, y + w * .08, x + w / 2 - 2, y); ctx.lineTo(x + w / 2, y - h); ctx.stroke();
  };
  // A horse grazing or standing, painted silhouette with light rim.
  ENV.horseSil = (ctx, r, x, y, s, col, rim, f = 1, graze = false) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * f, s); ctx.fillStyle = rgb(col); ctx.beginPath();
    ctx.ellipse(0, -60, 55, 24, 0, 0, 7); ctx.fill(); // body
    ctx.beginPath(); if (graze) { ctx.moveTo(40, -70); ctx.quadraticCurveTo(70, -50, 78, -12); ctx.lineTo(66, -8); ctx.quadraticCurveTo(58, -40, 34, -50); } else { ctx.moveTo(38, -72); ctx.quadraticCurveTo(58, -100, 72, -112); ctx.lineTo(86, -100); ctx.quadraticCurveTo(66, -82, 52, -56); } ctx.closePath(); ctx.fill();
    for (const lx of [-40, -28, 30, 42]) { ctx.fillRect(lx - 4, -44, 8, 44); } ctx.beginPath(); ctx.moveTo(-54, -66); ctx.quadraticCurveTo(-74, -40, -66, -18); ctx.lineWidth = 7; ctx.strokeStyle = rgb(col); ctx.stroke();
    if (rim) { ctx.strokeStyle = rgb(rim, .5); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, -60, 55, 24, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } ctx.restore(); };

  // Silk Road walled city (Otrar / Samarkand / Baghdad): mud-brick walls, gate towers, blue domes, minaret, poplars.
  const CITY = {
    day: { skyTop: '#4a86c0', skyBot: '#f2dcb0', sun: ['#fffbe8', '#fff0c0'], sunPos: [.8, .14], brick: '#c9a06a', brickDark: '#8a6238', dome: '#3f7fb0', domeLit: '#8fc6e0', ground: '#d2b07a', haze: '#fff0d0', lit: 1, shadowAng: Math.PI * .85, river: false },
    dusk: { skyTop: '#33305c', skyBot: '#f29a58', sun: ['#ffe2a8', '#ff8040'], sunPos: [.18, .5], brick: '#b07a50', brickDark: '#5a3a26', dome: '#2e5f8a', domeLit: '#e0a070', ground: '#9c7448', haze: '#ff9a50', lit: -1, shadowAng: Math.PI * .02 },
    fire: { skyTop: '#1a0e10', skyBot: '#a8402a', sun: null, sunPos: [.5, .5], brick: '#8a5a3a', brickDark: '#3a2418', dome: '#2a4a68', domeLit: '#f08a40', ground: '#5a3a24', haze: '#ff6a2a', lit: 1, shadowAng: Math.PI * .5, burning: true },
  };
  ENV.silkCity = (ctx, r, W, H, o = {}) => {
    const c = CITY[o.tod || 'day'], hz = H * (o.horizon ?? .6), N = P.Noise(r.int(1, 99999));
    M.sky(ctx, r, W, hz + 40, c.skyTop, c.skyBot, { strokes: 3000 });
    const sx = W * c.sunPos[0], sy = H * c.sunPos[1]; if (c.sun) { glow(ctx, sx, sy, W * .5, c.haze, .3); M.sun(ctx, r, sx, sy, 42, c.sun[0], c.sun[1]); }
    ENV.clouds(ctx, r, W, H * .05, hz * .5, o.clouds ?? 9, ...(c.burning ? ['#7a3a2a', '#3a1a16', '#1a0c0c'] : o.tod === 'dusk' ? ['#ffc48a', '#c0607a', '#4a3a60'] : ['#ffffff', '#ead8c0', '#b8a48c']));
    if (c.burning) { for (let k = 0; k < 6; k++) ENV.smoke(ctx, r, W * r.range(.2, .8), hz - 40, H * .6, '#2a1a16', .22); glow(ctx, W * .5, hz, W * .7, '#ff5a20', .35); }
    M.hills(ctx, r, N, W, hz - 60, 90, .0012, 5, shade(c.brick, -.15), { topLight: .1, botDark: 0, density: 700 });
    const wallTop = hz + (o.wallY ?? -10), wallBot = hz + 300, x0 = W * (o.x0 ?? .05), x1 = W * (o.x1 ?? .95);
    // buildings rising behind the wall: domes, flat roofs, a minaret
    const rr = P.RNG(r.int(1, 1e6));
    for (let i = 0; i < 26; i++) { const bx = rr.range(x0, x1), bw = rr.range(80, 200), bh = rr.range(60, 170); paintRegion(ctx, rr, [[bx, wallTop + 10], [bx, wallTop - bh], [bx + bw, wallTop - bh], [bx + bw, wallTop + 10]], shade(c.brick, rr.range(-.12, .1)), { density: 380, topLight: .12, botDark: -.2 }); for (let k = 0; k < 3; k++) { ctx.fillStyle = rgb(shade(c.brickDark, -.3), .8); ctx.fillRect(bx + 14 + k * bw / 3.3, wallTop - bh * .6, 12, 20); } }
    for (const [fx, fr] of (o.domes ?? [[.32, 120], [.58, 170], [.74, 95]])) { const dx = W * fx; paintRegion(ctx, rr, [[dx - fr * .8, wallTop], [dx - fr * .8, wallTop - fr * .9], [dx + fr * .8, wallTop - fr * .9], [dx + fr * .8, wallTop]], c.brick, { density: 300 });
      const g = ctx.createRadialGradient(dx + c.lit * fr * .35, wallTop - fr * 1.6, fr * .1, dx, wallTop - fr * 1.2, fr); g.addColorStop(0, rgb(P.hex(c.domeLit))); g.addColorStop(1, rgb(shade(c.dome, -.35))); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(dx - fr * .78, wallTop - fr * .88); ctx.bezierCurveTo(dx - fr * .9, wallTop - fr * 1.9, dx - fr * .1, wallTop - fr * 2.1, dx, wallTop - fr * 2.25); ctx.bezierCurveTo(dx + fr * .1, wallTop - fr * 2.1, dx + fr * .9, wallTop - fr * 1.9, dx + fr * .78, wallTop - fr * .88); ctx.closePath(); ctx.fill();
      for (let k = 0; k < fr * 3; k++) { const a = rr.range(-1, 1), y = wallTop - fr * (1 + rr() * 1.1); stroke(ctx, rr, dx + a * fr * .7 * (1 - (wallTop - fr - y) / (fr * 1.4)), y, 10, Math.PI / 2 + a * .4, 3, shade(c.dome, a * c.lit * .25), .25); }
      ctx.strokeStyle = 'rgba(240,210,120,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(dx, wallTop - fr * 2.25); ctx.lineTo(dx, wallTop - fr * 2.5); ctx.stroke(); }
    if (o.minaret !== false) { const mx = W * (o.minaretX ?? .46), mh = 380; paintRegion(ctx, rr, [[mx - 34, wallTop], [mx - 26, wallTop - mh], [mx + 26, wallTop - mh], [mx + 34, wallTop]], c.brick, { density: 200, ang: Math.PI / 2 });
      for (let k = 0; k < 6; k++) { ctx.fillStyle = rgb(k % 2 ? c.dome : shade(c.brick, -.2), .85); ctx.fillRect(mx - 30 + k * .5, wallTop - mh * (.2 + k * .13), 60 - k, 10); }
      ctx.fillStyle = rgb(shade(c.brick, .05)); ctx.fillRect(mx - 40, wallTop - mh - 16, 80, 18); ctx.fillStyle = rgb(c.dome); ctx.beginPath(); ctx.arc(mx, wallTop - mh - 16, 24, Math.PI, 0); ctx.fill(); }
    // the city wall: battered mud-brick with crenellations and two gate towers
    const wall = [[x0, wallBot], [x0, wallTop], [x1, wallTop], [x1, wallBot]]; paintRegion(ctx, rr, wall, c.brick, { density: 260, topLight: .14, botDark: -.3, ang: 0 });
    ctx.fillStyle = rgb(shade(c.brick, .05)); for (let x = x0; x < x1; x += 46) { ctx.fillRect(x, wallTop - 22, 26, 24); }
    for (let y = wallTop + 18; y < wallBot; y += 22) { ctx.strokeStyle = rgb(shade(c.brickDark, -.1), .25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y + rr.gauss()); ctx.lineTo(x1, y + rr.gauss()); ctx.stroke(); }
    const gx = W * (o.gateX ?? .5); for (const tx of [gx - 170, gx + 170]) { paintRegion(ctx, rr, [[tx - 70, wallBot], [tx - 62, wallTop - 120], [tx + 62, wallTop - 120], [tx + 70, wallBot]], shade(c.brick, .04), { density: 220, topLight: .18, botDark: -.3, ang: Math.PI / 2 }); ctx.fillStyle = rgb(shade(c.brick, .1)); for (let k = -2; k <= 2; k++) ctx.fillRect(tx + k * 26 - 10, wallTop - 142, 20, 24); }
    ctx.fillStyle = rgb(shade(c.brickDark, -.55)); ctx.beginPath(); ctx.moveTo(gx - 90, wallBot); ctx.lineTo(gx - 90, wallTop + 50); ctx.quadraticCurveTo(gx, wallTop - 40, gx + 90, wallTop + 50); ctx.lineTo(gx + 90, wallBot); ctx.closePath(); ctx.fill();
    if (o.gateOpen === false) { ctx.fillStyle = '#5a3a20'; ctx.fillRect(gx - 84, wallTop + 40, 168, wallBot - wallTop - 40); }
    ctx.strokeStyle = rgb(P.hex('#e8c060'), .7); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx - 96, wallBot); ctx.lineTo(gx - 96, wallTop + 48); ctx.quadraticCurveTo(gx, wallTop - 48, gx + 96, wallTop + 48); ctx.lineTo(gx + 96, wallBot); ctx.stroke();
    // shading over the wall face from the light side
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; const gw = ctx.createLinearGradient(0, 0, W, 0); gw.addColorStop(c.lit > 0 ? 1 : 0, 'rgba(255,255,255,1)'); gw.addColorStop(c.lit > 0 ? 0 : 1, 'rgba(150,120,110,1)'); ctx.fillStyle = gw; ctx.fillRect(x0, wallTop - 22, x1 - x0, wallBot - wallTop + 22); ctx.restore();
    // buttresses: vertical light/shadow bands so the wall reads as solid
    for (let x = x0 + 90; x < x1 - 40; x += 210) { if (Math.abs(x - gx) < 280) continue; const gb = ctx.createLinearGradient(x - 30, 0, x + 30, 0); gb.addColorStop(0, rgb(shade(c.brick, c.lit > 0 ? -.25 : .12), .7)); gb.addColorStop(.5, rgb(shade(c.brick, .02), .5)); gb.addColorStop(1, rgb(shade(c.brick, c.lit > 0 ? .12 : -.25), .7)); ctx.fillStyle = gb; ctx.beginPath(); ctx.moveTo(x - 30, wallBot); ctx.lineTo(x - 22, wallTop); ctx.lineTo(x + 22, wallTop); ctx.lineTo(x + 30, wallBot); ctx.fill(); }
    for (let k = 0; k < 2600; k++) { const x = rr.range(x0, x1), y = rr.range(wallTop, wallBot); if (Math.abs(x - gx) < 110 && y > wallTop + 30) continue; ctx.fillStyle = rgb(shade(c.brick, rr.range(-.18, .1)), .16); ctx.fillRect(x, y, rr.range(14, 30), rr.range(6, 10)); }
    // ground: dusty road to the gate
    ENV.texBand(ctx, r, W, Math.round(wallBot), H, [[0, shade(c.ground, -.25)], [.4, shade(c.ground, -.05)], [.7, P.hex(c.ground)], [1, shade(c.ground, .1)]], { sx: .003, persp: 1.1 });
    fillStrokes(ctx, r, [0, wallBot, W, H - wallBot], () => true, { n: 7000, len: [14, 60], w: [3, 9], ang: 0, angJ: .08, al: .18, colFn: () => jitter(shade(c.ground, r.range(-.15, .12)), r, 10) });
    ctx.save(); ctx.globalAlpha = .4; for (let k = 0; k < 1600; k++) { const t = r(), px = gx + r.gauss() * (20 + t * 260), py = wallBot + t * (H - wallBot); stroke(ctx, r, px, py, 10 + t * 40, r.gauss() * .2, 2 + t * 6, shade(c.ground, .18), .5); } ctx.restore();
    M.castShadow(ctx, gx, wallBot, 400, 160, c.shadowAng, .18);
    // poplars
    for (let i = 0; i < (o.poplars ?? 8); i++) { const side = i % 2 ? rr.range(.02, .36) : rr.range(.64, .98), px = W * side, py = wallBot + rr.range(10, 40), ph = rr.range(160, 300); const leaf = o.tod === 'dusk' ? '#4a4a2a' : c.burning ? '#2a1a12' : '#5a7a3a';
      for (let k = 0; k < 700; k++) { const t = rr(), w2 = Math.sin(Math.pow(t, .7) * Math.PI) * 70; stroke(ctx, rr, px + rr.gauss() * w2 * .5, py - t * ph, 14, -Math.PI / 2 + rr.gauss() * .3, 4, shade(leaf, (rr() - .5) * .4 + c.lit * .05), .4); } }
    if (c.burning) { for (let k = 0; k < 7; k++) { const fx = W * r.range(.1, .9), fy = wallTop - r.range(20, 120); glow(ctx, fx, fy, 160, '#ff7a2a', .3); for (let j = 0; j < 90; j++) stroke(ctx, r, fx + r.gauss() * 26, fy - r() * 90, 18, -Math.PI / 2 + r.gauss() * .3, 4, r() < .5 ? [255, 190, 90] : [230, 90, 40], .35); } }
    P.kuwahara(ctx, W, H, 3);
    ENV.pebbles(ctx, r, W, wallBot + 20, H, 180, shade(c.ground, -.3), shade(c.ground, .2));
    P.finish ? P.finish(ctx, r, W, H, { vignette: .25 }) : 0;
  };

  // Inside a ger: curved lattice wall, roof poles to the crown, light shaft, stove, rugs, painted chests.
  ENV.gerInside = (ctx, r, W, H, o = {}) => {
    const fire = o.fire ?? true, cx = W * .5, crownY = H * .04, floorY = H * .7, wallTop = H * .36;
    ctx.fillStyle = '#2a1c12'; ctx.fillRect(0, 0, W, H);
    // roof: felt underside between poles
    paintRegion(ctx, r, [[0, wallTop + 40], [cx - 110, crownY + 60], [cx + 110, crownY + 60], [W, wallTop + 40], [W, 0], [0, 0]], '#b89a74', { density: 260, topLight: -.25, botDark: .05, ang: Math.PI / 2 });
    // poles (uni), painted orange with blue tips
    for (let k = 0; k <= 34; k++) { const t = k / 34, ex = -W * .1 + t * W * 1.2, ey = wallTop + 40 + Math.sin(t * Math.PI) * 30; const sx = cx + (ex - cx) * .07, sy = crownY + 60;
      ctx.strokeStyle = 'rgba(30,14,6,.35)'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(sx, sy + 6); ctx.lineTo(ex, ey + 8); ctx.stroke();
      const g = ctx.createLinearGradient(sx, sy, ex, ey); g.addColorStop(0, '#d0702e'); g.addColorStop(.85, '#e0883a'); g.addColorStop(.86, '#2f6fa8'); g.addColorStop(1, '#2f6fa8'); ctx.strokeStyle = g; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); }
    // crown wheel (toono) with daylight
    glow(ctx, cx, crownY + 40, 300, '#fff1c8', .5); ctx.fillStyle = '#fff4d8'; ctx.beginPath(); ctx.ellipse(cx, crownY + 50, 110, 34, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#c86a28'; ctx.lineWidth = 14; ctx.stroke(); ctx.lineWidth = 6; for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, crownY + 50); ctx.lineTo(cx + Math.cos(a) * 110, crownY + 50 + Math.sin(a) * 34); ctx.stroke(); }
    if (o.beam !== false) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.filter = 'blur(30px)'; const g = ctx.createLinearGradient(0, crownY, 0, floorY); g.addColorStop(0, 'rgba(255,236,190,.35)'); g.addColorStop(1, 'rgba(255,236,190,.05)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 100, crownY + 60); ctx.lineTo(cx + 110, crownY + 60); ctx.lineTo(cx + 420, floorY + 60); ctx.lineTo(cx + 40, floorY + 60); ctx.fill(); ctx.restore(); }
    // lattice wall (khana)
    const wall = [[0, wallTop + 40], [W, wallTop + 40], [W, floorY], [0, floorY]]; paintRegion(ctx, r, wall, '#e6d2ae', { density: 300, topLight: -.1, botDark: -.25 });
    ctx.save(); poly(ctx, wall); ctx.clip(); ctx.strokeStyle = 'rgba(150,80,30,.75)'; ctx.lineWidth = 5; for (let x = -800; x < W + 800; x += 70) { ctx.beginPath(); ctx.moveTo(x, wallTop + 40); ctx.lineTo(x + 400, floorY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 400, wallTop + 40); ctx.lineTo(x, floorY); ctx.stroke(); } ctx.restore();
    // hangings: two embroidered felt panels and a bow on the wall
    for (const [hx, col] of [[W * .16, '#a3322a'], [W * .8, '#2f5f8a']]) { paintRegion(ctx, r, [[hx - 150, wallTop + 70], [hx + 150, wallTop + 70], [hx + 150, floorY - 40], [hx - 150, floorY - 40]], col, { density: 120 }); ctx.strokeStyle = '#e8c060'; ctx.lineWidth = 6; ctx.strokeRect(hx - 130, wallTop + 90, 260, floorY - wallTop - 150); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(hx, wallTop + 170 + k * 90, 26, 0, 7); ctx.stroke(); } }
    ctx.strokeStyle = '#4a2a14'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(W * .62, wallTop + 210, 120, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.strokeStyle = '#d8c8a0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W * .62 + Math.cos(Math.PI * 1.15) * 120, wallTop + 210 + Math.sin(Math.PI * 1.15) * 120); ctx.lineTo(W * .62 + Math.cos(Math.PI * 1.85) * 120, wallTop + 210 + Math.sin(Math.PI * 1.85) * 120); ctx.stroke();
    // painted chests along the back
    for (const bx of [W * .33, W * .67]) { paintRegion(ctx, r, [[bx - 140, floorY], [bx - 140, floorY - 150], [bx + 140, floorY - 150], [bx + 140, floorY]], '#c8502a', { density: 60 }); ctx.strokeStyle = '#f0c050'; ctx.lineWidth = 5; ctx.strokeRect(bx - 120, floorY - 132, 240, 114); ctx.beginPath(); ctx.arc(bx, floorY - 75, 28, 0, 7); ctx.stroke(); }
    // floor: felt rugs
    ENV.texBand(ctx, r, W, Math.round(floorY), H, [[0, [70, 44, 28]], [.5, [110, 70, 44]], [1, [140, 92, 58]]], { sx: .004, persp: 1.1 });
    for (const [rx, ry, rw, col] of [[W * .5, H * .86, 900, '#8a2a24'], [W * .2, H * .93, 600, '#2a4a6a'], [W * .8, H * .92, 640, '#6a5a2a']]) { ctx.save(); ctx.translate(rx, ry); ctx.scale(1, .28); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, rw / 2, rw / 2, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#e8c060'; ctx.lineWidth = 14; ctx.beginPath(); ctx.ellipse(0, 0, rw / 2 - 40, rw / 2 - 40, 0, 0, 7); ctx.stroke(); ctx.restore(); }
    // stove in the centre with pipe up to the crown
    const sx = cx, sy = floorY + 120; ctx.fillStyle = '#2a2420'; ctx.fillRect(sx - 18, crownY + 80, 36, sy - crownY - 180); paintRegion(ctx, r, [[sx - 110, sy], [sx - 110, sy - 120], [sx + 110, sy - 120], [sx + 110, sy]], '#3a302a', { density: 40 });
    if (fire) { glow(ctx, sx, sy - 50, 700, '#ff9a40', .45); ctx.fillStyle = '#ffb050'; ctx.fillRect(sx - 50, sy - 80, 100, 50); }
    P.kuwahara(ctx, W, H, 3); P.finish ? P.finish(ctx, r, W, H, { vignette: .35 }) : 0;
  };
  // The Great Khan's hall at Karakorum: red pillars, throne dais, banners of horse-tail (tug).
  ENV.khanHall = (ctx, r, W, H, o = {}) => {
    const room = new ENV.Room(ctx, r, W, H, { RW: 14, RH: 7, zf: 14, hor: .42 });
    room.shell({ back: '#7a2a20', side: '#6a241c', ceil: '#3a1a14', floor: '#5a3a24', planks: false });
    // carpet runner to the throne
    room.quad([[-1.4, .01, 3], [1.4, .01, 3], [1.4, .01, 13.5], [-1.4, .01, 13.5]], '#a0302a', { density: 80 });
    // dais + throne
    room.box(-3, 0, 12, 6, .6, 1.8, '#5a3a24'); room.box(-1, .6, 12.6, 2, 1.8, .8, '#c89a3a', { lit: .05 }); room.box(-1.3, 2.2, 12.9, 2.6, .5, .4, '#e0b050');
    // pillars
    for (const z of [6.5, 9.5]) for (const x of [-4.4, 3.6]) room.box(x, 0, z, .8, 7, .8, '#b8302a', { vert: true });
    // banners hanging on the back wall: gold sun, nine white horse-tails
    for (const bx of [-5, -2.8, 2.8, 5]) { const [x0, y0, w0, h0] = room.backRect(bx - .6, 2.4, bx + .6, 6.4); paintRegion(ctx, r, [[x0, y0], [x0 + w0, y0], [x0 + w0, y0 + h0], [x0 + w0 / 2, y0 + h0 + 30], [x0, y0 + h0]], bx < 0 ? '#2f5f8a' : '#e8c060', { density: 50 }); }
    const [tx, ty] = room.p(0, 6.6, 13.9); for (let k = -4; k <= 4; k++) { ctx.strokeStyle = 'rgba(240,236,224,.85)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(tx + k * 22, ty); ctx.quadraticCurveTo(tx + k * 26, ty + 60, tx + k * 30, ty + 140); ctx.stroke(); }
    room.lampGlow(0, 3, 12, 900, '#ffcf80', .35); room.lampGlow(-4, 4, 6, 600, '#ffb060', .25); room.lampGlow(4, 4, 6, 600, '#ffb060', .25);
    P.kuwahara(ctx, W, H, 3); P.finish ? P.finish(ctx, r, W, H, { vignette: .35 }) : 0;
  };
  // Japanese coast in a typhoon: black sea, white breakers, pine cliffs, tossing ships.
  ENV.stormCoast = (ctx, r, W, H, o = {}) => {
    const hz = H * .44, N = P.Noise(r.int(1, 1e5));
    M.sky(ctx, r, W, hz + 40, '#151a22', '#4a5664', { strokes: 3200 });
    ENV.clouds(ctx, r, W, 0, hz * .8, 24, '#6a7684', '#3a4450', '#161c24');
    ctx.save(); ctx.strokeStyle = 'rgba(200,210,230,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 900; i++) { const x = r.range(0, W), y = r.range(0, H); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30, y + 90); ctx.stroke(); } ctx.restore();
    // lightning
    ctx.strokeStyle = 'rgba(230,240,255,.9)'; ctx.lineWidth = 5; ctx.beginPath(); let lx = W * .7, ly = 0; ctx.moveTo(lx, ly); while (ly < hz) { lx += r.range(-60, 50); ly += r.range(40, 90); ctx.lineTo(lx, ly); } ctx.stroke(); glow(ctx, W * .7, hz * .5, 700, '#c8d8ff', .25);
    // sea
    ENV.texBand(ctx, r, W, Math.round(hz), H, [[0, [40, 52, 62]], [.4, [28, 40, 50]], [1, [16, 24, 30]]], { sx: .003, persp: 1.2 });
    for (let i = 0; i < 9000; i++) { const y = r.range(hz, H), t = (y - hz) / (H - hz), x = r.range(0, W); stroke(ctx, r, x, y, 20 + t * 90, r.gauss() * .1, 2 + t * 8, r() < .25 ? [210, 220, 225] : [60, 76, 88], .18 + (r() < .2 ? .3 : 0)); }
    for (let k = 0; k < 1400; k++) { const y = hz + Math.pow(r(), .8) * (H - hz), t = (y - hz) / (H - hz), x = r.range(0, W); const crest = Math.sin(x * .004 + y * .03) > .6; if (!crest) continue; stroke(ctx, r, x, y, 30 + t * 120, -.05 + r.gauss() * .08, 3 + t * 10, [225, 232, 236], .35); }
    // ships: junk silhouettes tossed at angles
    for (const [fx, fy, sz, ang] of (o.ships ?? [[.3, .52, 1, -.2], [.5, .5, .7, .25], [.62, .55, .9, -.35], [.42, .58, 1.2, .4]])) { ctx.save(); ctx.translate(W * fx, H * fy); ctx.rotate(ang); ctx.scale(sz, sz); ctx.fillStyle = '#14100c'; ctx.beginPath(); ctx.moveTo(-110, 0); ctx.quadraticCurveTo(0, 40, 120, -10); ctx.lineTo(100, -30); ctx.lineTo(-100, -26); ctx.closePath(); ctx.fill(); ctx.fillRect(-6, -160, 8, 140); ctx.fillStyle = '#3a2e22'; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(70, -60); ctx.lineTo(0, -40); ctx.closePath(); ctx.fill(); ctx.restore(); }
    // near cliff with wind-bent pines on the right
    paintRegion(ctx, r, [[W * .72, H], [W * .78, H * .62], [W * .86, H * .56], [W, H * .5], [W, H]], '#2a2a26', { density: 180, ang: Math.PI / 2 });
    for (const [px, py] of [[W * .84, H * .57], [W * .93, H * .52]]) { ctx.strokeStyle = '#1a140e'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px - 60, py - 120, px - 160, py - 170); ctx.stroke(); for (let k = 0; k < 260; k++) { const t = r(); stroke(ctx, r, px - 160 * t + r.gauss() * 40, py - 170 * t - 20 + r.gauss() * 30, 22, Math.PI + r.gauss() * .2, 5, [24, 40, 30], .45); } }
    for (let k = 0; k < 900; k++) { const x = W * .74 + r.gauss() * 90, y = H * .62 - Math.abs(r.gauss()) * 160; stroke(ctx, r, x, y, 18, -Math.PI / 2 + r.gauss() * .6, 5, [230, 236, 240], .12); }
    P.kuwahara(ctx, W, H, 3); P.finish ? P.finish(ctx, r, W, H, { vignette: .4 }) : 0;
  };
  ENV.steppe = (ctx, r, W, H, o = {}) => {
    const c = STP[o.tod || 'day'], hz = H * (o.horizon ?? .58), N = P.Noise(r.int(1, 99999));
    M.sky(ctx, r, W, hz + 40, c.skyTop, c.skyBot, { strokes: 3400 });
    if (c.moon) { for (let i = 0; i < 1100; i++) { const x = r.range(0, W), y = Math.pow(r(), 1.4) * hz * .95, s = r() < .04 ? 2.2 : r.range(.6, 1.4); ctx.fillStyle = `rgba(235,240,255,${r.range(.3, .95)})`; ctx.fillRect(x, y, s, s); } const mx = W * c.moon[0], my = H * c.moon[1]; glow(ctx, mx, my, 420, '#9fb0e0', .25); M.glowDisk(ctx, mx, my, 44, '#f2f0e4'); }
    const sx = W * c.sunPos[0], sy = H * c.sunPos[1];
    if (c.sun) glow(ctx, sx, sy, W * .55, c.haze, .3);
    ENV.clouds(ctx, r, W, H * .05, hz * .6, o.clouds ?? 16, ...c.cloud);
    if (c.sun) { M.sun(ctx, r, sx, sy, o.tod === 'day' ? 36 : 50, c.sun[0], c.sun[1]); if (o.tod !== 'day') P.rays(ctx, r, sx, sy, 26, W * .9, c.sun[0], .035, 2.6, -Math.PI / 2); }
    if (!c.snow) ENV.birds(ctx, r, W * .1, W * .9, H * .1, hz * .55, o.birds ?? 6, c.moon ? [20, 24, 40] : [40, 34, 34], 1.1);
    // big rolling ranges, no trees: the open steppe
    M.hills(ctx, r, N, W, hz - 110, 260, .0011, 3, c.snow ? '#8f9aae' : c.far, { topLight: c.snow ? .3 : .1, botDark: .02, density: 700 });
    M.hills(ctx, r, N, W, hz - 20, 80, .0018, 7, mix(c.mid, c.far, .4), { topLight: .08, botDark: -.04, rim: c.sun ? c.sun[0] : null });
    M.hills(ctx, r, N, W, hz + 6, 34, .0032, 11, c.mid, { topLight: .06, botDark: -.06 });
    if (o.herd !== false && !c.snow) ENV.herd(ctx, r, W * .58, W * .86, hz + 22, o.herdN ?? 18, 1, shade(c.mid, -.4));
    ENV.texBand(ctx, r, W, Math.round(hz + 10), H, c.ground, { sx: .003, persp: 1.1, near: t => -t * .12 });
    fillStrokes(ctx, r, [0, hz, W, H - hz], () => true, { n: 9000, len: [12, 70], w: [2, 8], ang: 0, angJ: .07, al: .16, colFn: (x, y) => jitter(c.ground[Math.min(4, 1 + Math.floor(N(x * .004, y * .01) * 4))][1], r, 12) });
    if (c.sun && o.tod !== 'day') { ctx.save(); ctx.globalCompositeOperation = 'soft-light'; const g = ctx.createRadialGradient(sx, hz, 0, sx, hz, W * .7); g.addColorStop(0, rgb(P.hex(c.sun[0]), .5)); g.addColorStop(1, rgb(P.hex(c.sun[0]), 0)); ctx.fillStyle = g; ctx.fillRect(0, hz, W, H - hz); ctx.restore(); }
    P.kuwahara(ctx, W, H, 4);
    if (!c.snow) { ENV.carpet(ctx, r, W, hz + 12, H, o.carpet ?? 60000, c.grass); ENV.grass(ctx, r, W, hz + 10, hz + 70, 600, c.grass, { h: 12, bl: [6, 12], bias: 1 }); }
    else { for (let i = 0; i < 26000; i++) { const x = r.range(0, W), y = r.range(hz + 10, H), t = (y - hz) / (H - hz); stroke(ctx, r, x, y, 6 + t * 30, r.gauss() * .05, 2 + t * 4, shade('#f4f5f8', r.gauss() * .05 - .02), .2); } }
    if (!c.snow) ENV.pebbles(ctx, r, W, hz + 30, H, 160, shade(c.ground[2][1], -.3), shade(c.ground[4][1], .2));
    // foreground tufts, keep a clear stage band for characters
    const st = o.stage ?? [.25, .75, .8, 1], keep = (x, y) => !(x > W * st[0] && x < W * st[1] && y > H * st[2] && y < H * st[3] && r() < .85);
    if (!c.snow) ENV.grass(ctx, P.RNG(r.int(1, 1e6)), W, hz + 60, H * .97, o.tufts ?? 320, c.grass, { h: 46, seeds: true, wind: .18, bias: 1, keep, hz: hz + 60, H: H * .97 });
    // gers
    for (const [gx, gy, gw, go] of (o.gers ?? [])) ENV.ger(ctx, r, W * gx, H * gy, gw, c, go || {});
    for (const [hx, hy, hs, hf, gr] of (o.horses ?? [])) { M.castShadow(ctx, W * hx, H * hy, 160 * hs, 18 * hs, c.shadowAng, .25); ENV.horseSil(ctx, r, W * hx, H * hy, hs, shade(o.horseCol || '#5a3a24', 0), c.sun ? c.sun[0] : '#c8d0e0', hf, gr); }
    if (c.snow) { ctx.save(); for (let i = 0; i < 1600; i++) { ctx.fillStyle = `rgba(255,255,255,${r.range(.35, .85)})`; ctx.beginPath(); ctx.arc(r.range(0, W), r.range(0, H), r.range(1, 3.6), 0, 7); ctx.fill(); } ctx.restore(); }
    P.finish ? P.finish(ctx, r, W, H, { vignette: .28 }) : 0;
  };
})(window);

window.PLATES = {
  steppe_dawn: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'dawn', gers: [[.3, .74, 300], [.46, .71, 210, { doorAt: .1 }], [.62, .69, 150, { smoke: false }]], horses: [[.8, .78, .8, -1, true], [.88, .76, .65, 1]] }),
  steppe_day: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'day', gers: [[.82, .68, 170]], horses: [[.66, .72, .55, 1, true]] }),
  steppe_open: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'day', herdN: 30 }),
  steppe_dusk: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'dusk', gers: [[.2, .72, 240, { glow: true }]], horses: [[.75, .76, .7, -1]] }),
  steppe_snow: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'snow', gers: [[.78, .7, 200, { glow: true }]] }),
  city_day: (c, r, W, H) => ENV.silkCity(c, r, W, H, { tod: 'day' }),
  city_dusk: (c, r, W, H) => ENV.silkCity(c, r, W, H, { tod: 'dusk', gateOpen: false }),
  city_fire: (c, r, W, H) => ENV.silkCity(c, r, W, H, { tod: 'fire' }),
  map_eurasia: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -12, lon1: 148, lat0: 8, lat1: 68 }, grid: 15, compass: [0, 14], title: 'Tartaria Magna', titleXY: [1880, 1010],
    labels: [[103, 47, 'MONGOLIA', 40], [110, 32, 'CHINA', 36], [55, 32, 'PERSIA', 32], [60, 58, 'RUS', 32], [15, 50, 'EUROPA', 30], [78, 22, 'INDIA', 30], [128, 38, 'KOREA', 22], [44, 33, 'Baghdad', 22, true]],
    mountains: [[85, 32, 16, 3], [70, 39, 8, 3], [100, 50, 6, 4]], rivers: [], greens: [[30, 55, 8], [100, 50, 8]], deserts: [[105, 42, 10], [62, 41, 7], [45, 25, 8]] }),
  map_steppe: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 82, lon1: 128, lat0: 36, lat1: 56 }, grid: 5, compass: [85, 38], title: 'The Steppe', titleXY: [1880, 1010],
    labels: [[105, 47, 'MONGOLS', 36], [92, 49, 'NAIMANS', 30], [102, 44, 'KERAITS', 30], [117, 47, 'TATARS', 30], [107, 52, 'MERKITS', 30], [112, 40, 'Gobi', 32, true]],
    mountains: [[100, 47.5, 10, 2], [90, 47, 8, 2]], rivers: [], greens: [[106, 49, 6]], deserts: [[108, 42, 8]] }),
  map_khwarazm: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 48, lon1: 82, lat0: 30, lat1: 46 }, grid: 5, compass: [50, 32], title: 'Khwarazm', titleXY: [1880, 1010],
    labels: [[68, 42.8, 'Otrar', 26, true], [66.9, 39.6, 'Samarkand', 26, true], [64.4, 39.8, 'Bukhara', 26, true], [59, 42, 'Urgench', 24, true], [53, 39, 'Caspian Sea', 30, true], [70, 34.5, 'Indus', 24, true]],
    mountains: [[72, 38, 10, 2], [68, 35, 6, 2]], rivers: [], greens: [], deserts: [[60, 41, 8], [64, 43, 6]] }),
  map_europe: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 8, lon1: 52, lat0: 40, lat1: 60 }, grid: 5, compass: [10, 42], title: 'Europa Orientalis', titleXY: [1880, 1010],
    labels: [[30.5, 50.5, 'Kyiv', 26, true], [16.2, 51.2, 'Legnica', 24, true], [20.9, 48, 'Mohi', 24, true], [19, 47.5, 'HUNGARY', 30], [19, 52, 'POLAND', 30], [38, 55, 'RUS', 34], [16.4, 48.2, 'Vienna', 22, true]],
    mountains: [[24, 47, 8, 2]], rivers: [], greens: [[28, 54, 8]], deserts: [] }),
  map_japan: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 118, lon1: 142, lat0: 28, lat1: 42 }, grid: 5, compass: [120, 30], title: 'Mare Japonicum', titleXY: [1880, 1010],
    labels: [[127, 37, 'KOREA', 30], [131, 32.5, 'Hakata', 24, true], [138, 36, 'JAPAN', 34], [122, 32, 'CHINA', 30]],
    mountains: [[137, 36, 6, 2]], rivers: [], greens: [[136, 35, 4]], deserts: [] }),
  map_india: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: 58, lon1: 92, lat0: 18, lat1: 40 }, grid: 5, compass: [60, 20], title: 'Hindustan', titleXY: [1880, 1010],
    labels: [[77.2, 28.6, 'Delhi', 26, true], [77, 29.4, 'Panipat', 22, true], [69.2, 34.5, 'Kabul', 24, true], [66.9, 39.6, 'Samarkand', 22, true], [78, 27.2, 'Agra', 22, true]],
    mountains: [[80, 33, 14, 3], [70, 35, 6, 2]], rivers: [], greens: [[80, 24, 8]], deserts: [[71, 27, 6]] }),
  ger_inside: (c, r, W, H) => ENV.gerInside(c, r, W, H),
  khan_hall: (c, r, W, H) => ENV.khanHall(c, r, W, H),
  storm_coast: (c, r, W, H) => ENV.stormCoast(c, r, W, H),
  steppe_night: (c, r, W, H) => ENV.steppe(c, r, W, H, { tod: 'night', gers: [[.24, .72, 260, { glow: true }], [.4, .7, 180, { glow: true }]] }),
};
