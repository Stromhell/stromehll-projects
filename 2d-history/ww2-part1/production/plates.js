// WW2 Part 1 painted plates (Leo style, muted 1919-1940 Europe).
// Paint with: node shared/p2/paint.js ww2-part1/production/plates.js ww2-part1/production/plates all
// Reused plates copied in: long_table, airfield (putin); partners_room, palace_gate, sea, westminster, station (rothschilds).
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .42, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const fogBank = (c, r, W, y, h, col = '210,210,214', al = .16, n = 40) => { c.save(); c.filter = 'blur(30px)'; for (let i = 0; i < n; i++) { c.fillStyle = `rgba(${col},${al * r.range(.5, 1)})`; c.beginPath(); c.ellipse(r.range(-100, W + 100), y + r.gauss() * h * .3, r.range(200, 520), r.range(40, 90), 0, 0, 7); c.fill(); } c.restore(); };
  const cobbles = (c, r, W, H, hz, a = '#4a4038', b = '#6a5a4a', lit = 'rgba(255,200,140,.10)') => { c.fillStyle = '#3a342e'; c.fillRect(0, hz, W, H - hz);
    for (let y = hz + 2; y < H;) { const t = (y - hz) / (H - hz), sh = 5 + t * 28, sw = 12 + t * 56; for (let x = -r() * sw; x < W; x += sw) { c.fillStyle = rgb(jitter(mix(a, b, r()), r, 6)); c.beginPath(); c.roundRect(x + 2, y, sw - 4, sh - 3, sh * .3); c.fill(); c.fillStyle = lit; c.fillRect(x + 4, y, sw - 8, 2); } y += sh; } };
  const lamp = (c, x, base, h, s = 1, col = '#ffcc80', al = .4) => { c.fillStyle = '#1a1612'; c.fillRect(x - 6 * s, base - h * s, 12 * s, h * s); const ly = base - h * s; c.fillStyle = '#ffe2a0'; c.fillRect(x - 18 * s, ly - 44 * s, 36 * s, 40 * s);
    c.strokeStyle = '#1a1612'; c.lineWidth = 4 * s; c.strokeRect(x - 18 * s, ly - 44 * s, 36 * s, 40 * s); c.beginPath(); c.moveTo(x - 24 * s, ly - 44 * s); c.lineTo(x, ly - 64 * s); c.lineTo(x + 24 * s, ly - 44 * s); c.closePath(); c.fillStyle = '#1a1612'; c.fill(); glow(c, x, ly - 24 * s, 380 * s, col, al); };
  const fir = (c, r, x, base, h, col = '#24382c', snow = false) => { const w = h * .36; for (let k = 0; k < 6; k++) { const t = k / 6, y = base - h * t - h * .1, ww = w * (1 - t * .8); c.fillStyle = rgb(jitter(shade(col, -.08 + t * .14), r, 5)); c.beginPath(); c.moveTo(x - ww, y); c.lineTo(x, y - h * .32); c.lineTo(x + ww, y); c.closePath(); c.fill(); if (snow) { c.fillStyle = 'rgba(240,244,248,.85)'; c.beginPath(); c.moveTo(x - ww * .7, y - h * .06); c.lineTo(x, y - h * .3); c.lineTo(x + ww * .5, y - h * .1); c.closePath(); c.fill(); } } c.fillStyle = '#2a1e16'; c.fillRect(x - h * .02, base - h * .12, h * .04, h * .12); };
  const brick = (c, r, box, col = '#7a4434') => { M.wall(c, r, box, col, { density: 160 }); const [x, y, w, h] = box; c.strokeStyle = 'rgba(30,20,16,.25)'; c.lineWidth = 2; for (let yy = y + 18; yy < y + h; yy += 18) { c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke(); for (let xx = x + ((yy / 18) % 2) * 22; xx < x + w; xx += 44) { c.beginPath(); c.moveTo(xx, yy - 18); c.lineTo(xx, yy); c.stroke(); } } };
  const sash = (c, x, y, w, h, lit = false) => { c.fillStyle = lit ? '#e8c47a' : '#26282c'; c.fillRect(x, y, w, h); c.strokeStyle = '#e8e0d0'; c.lineWidth = 5; c.strokeRect(x, y, w, h); c.beginPath(); c.moveTo(x, y + h / 2); c.lineTo(x + w, y + h / 2); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.stroke(); if (lit) glow(c, x + w / 2, y + h / 2, w * 1.4, '#ffc070', .12); };

  // Hall of Mirrors: arched mirrors and windows, gilded pilasters, chandeliers, parquet; a long table across the back.
  ENV.mirrorHall = (ctx, r, W, H) => { const hz = H * .7; M.wall(ctx, r, [0, 0, W, hz], '#d8c8a0', { density: 220 });
    ctx.fillStyle = '#c8a860'; ctx.fillRect(0, 0, W, 120); for (let x = 0; x < W; x += 60) { ctx.fillStyle = 'rgba(120,80,30,.3)'; ctx.fillRect(x, 0, 8, 120); }
    for (let k = 0; k < 7; k++) { const x = 80 + k * 360, w = 220, top = 230, h = hz - 330; const g = ctx.createLinearGradient(x, top, x + w, top + h); g.addColorStop(0, '#e8eef0'); g.addColorStop(.5, '#b8c4c8'); g.addColorStop(1, '#dce4e6'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, top, w, h, [110, 110, 0, 0]); ctx.fill(); ctx.strokeStyle = '#b08a3a'; ctx.lineWidth = 14; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 3; for (let j = 1; j < 4; j++) { ctx.beginPath(); ctx.moveTo(x + w * j / 4, top + 60); ctx.lineTo(x + w * j / 4, top + h); ctx.stroke(); } ctx.fillStyle = '#c8a050'; ctx.fillRect(x + w + 50, 160, 40, hz - 160); ctx.fillStyle = 'rgba(255,230,160,.4)'; ctx.fillRect(x + w + 54, 160, 8, hz - 160); }
    for (let k = 0; k < 4; k++) { const x = 360 + k * 620, y = 210; ctx.strokeStyle = '#8a6a2a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y - 40); ctx.stroke(); for (let j = 0; j < 9; j++) { const a = j / 9 * 6.28; ctx.fillStyle = '#fff4d0'; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 70, y + Math.sin(a) * 20, 8, 0, 7); ctx.fill(); } ctx.fillStyle = '#d8b060'; ctx.beginPath(); ctx.ellipse(x, y + 10, 80, 26, 0, 0, 7); ctx.fill(); glow(ctx, x, y, 320, '#ffe2a0', .28); }
    ctx.fillStyle = '#6a4626'; ctx.fillRect(0, hz, W, H - hz); for (let y = hz; y < H; y += 40) for (let x = ((y / 40) % 2) * 40; x < W; x += 80) { ctx.fillStyle = rgb(jitter('#7a5430', r, 8)); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y + 20); ctx.lineTo(x, y + 40); ctx.lineTo(x - 40, y + 20); ctx.fill(); }
    // long table at the back
    ctx.fillStyle = '#2e5a3a'; ctx.fillRect(W * .12, hz - 20, W * .76, 60); ctx.fillStyle = '#1e3e28'; ctx.fillRect(W * .12, hz + 40, W * .76, 80); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(W * .12, hz - 20, W * .76, 6);
    for (let k = 0; k < 12; k++) { const x = W * .15 + k * W * .064; ctx.fillStyle = '#7a3a2a'; ctx.beginPath(); ctx.roundRect(x, hz - 110, 60, 100, [20, 20, 0, 0]); ctx.fill(); ctx.fillStyle = '#c8a050'; ctx.fillRect(x, hz - 116, 60, 8); }
    for (let k = 0; k < 10; k++) { ctx.fillStyle = '#f2ecd8'; ctx.fillRect(W * .17 + k * W * .07, hz - 12, 50, 16); }
    ctx.fillStyle = 'rgba(255,220,150,.08)'; ctx.fillRect(0, 0, W, H); FIN(ctx, r, W, H, .4); };

  // 1923 Berlin street: tenements, a bakery shopfront with an awning, cobbles, gas lamps.
  ENV.berlinStreet = (ctx, r, W, H, o = {}) => { const hz = H * .72; M.sky(ctx, r, W, hz, '#7a8088', '#c8c0b0', { strokes: 1400 }); ENV.clouds(ctx, r, W, 0, H * .2, 6, '#d8d0c4', '#9a948c', '#6a6660');
    const cols = ['#a89880', '#8a7a68', '#b8a88c', '#9a8a74', '#7a6c5c']; let x = -40; let k = 0;
    while (x < W) { const w = r.range(380, 520), h = r.range(hz - 120, hz - 40), col = cols[k % cols.length]; M.wall(ctx, r, [x, hz - h, w, h], col, { density: 140 }); ctx.fillStyle = rgb(shade(col, -.35)); ctx.fillRect(x - 10, hz - h - 30, w + 20, 30);
      for (let f = 0; f < 4; f++) for (let j = 0; j < 3; j++) sash(ctx, x + 50 + j * (w - 100) / 3 + 10, hz - h + 60 + f * 150, 70, 110, r() < .25); x += w; k++; }
    // bakery shopfront
    const bx = W * .36, bw = 820, by = hz - 330; ctx.fillStyle = '#3a2a1e'; ctx.fillRect(bx, by, bw, 330); ctx.fillStyle = '#e8d4a0'; ctx.fillRect(bx + 30, by + 110, bw - 300, 200); glow(ctx, bx + 300, by + 200, 400, '#ffd090', .25);
    for (let j = 0; j < 6; j++) { ctx.fillStyle = '#b8783a'; ctx.beginPath(); ctx.ellipse(bx + 90 + j * 80, by + 270, 34, 18, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#c8904a'; ctx.beginPath(); ctx.ellipse(bx + 120 + j * 80, by + 200, 26, 26, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#2a1c14'; ctx.fillRect(bx + bw - 230, by + 100, 160, 230); ctx.fillStyle = '#e8d4a0'; ctx.fillRect(bx + bw - 210, by + 120, 120, 120);
    ctx.fillStyle = '#2a3a2a'; ctx.fillRect(bx - 10, by - 20, bw + 20, 90); ctx.font = '62px Anton'; ctx.fillStyle = '#e8d4a0'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('BÄCKEREI', bx + bw / 2, by + 26);
    for (let j = 0; j < 9; j++) { ctx.fillStyle = j % 2 ? '#e8e0d0' : '#8a2a22'; ctx.beginPath(); ctx.moveTo(bx + j * bw / 9, by + 70); ctx.lineTo(bx + (j + 1) * bw / 9, by + 70); ctx.lineTo(bx + (j + 1) * bw / 9 + 10, by + 120); ctx.lineTo(bx + j * bw / 9 + 10, by + 120); ctx.fill(); }
    ctx.fillStyle = '#5a5248'; ctx.fillRect(0, hz - 10, W, 40); cobbles(ctx, r, W, H, hz + 30);
    lamp(ctx, W * .16, hz + 40, 420, 1.1, '#ffcc80', .2); lamp(ctx, W * .86, hz + 40, 420, 1.1, '#ffcc80', .2);
    for (let j = 0; j < 30; j++) { ctx.fillStyle = 'rgba(230,220,200,.5)'; ctx.save(); ctx.translate(r.range(0, W), r.range(hz + 60, H)); ctx.rotate(r.range(-1, 1)); ctx.fillRect(-24, -12, 48, 24); ctx.restore(); }
    FIN(ctx, r, W, H, .45); };

  // Munich beer hall: timber roof, long tables, barrels, hanging lamps.
  ENV.beerHall = (ctx, r, W, H) => { const hz = H * .66; M.wall(ctx, r, [0, 0, W, hz], '#8a6a48', { density: 200 });
    for (let x = 0; x < W; x += 320) { ctx.fillStyle = '#3e2a1a'; ctx.fillRect(x, 0, 40, hz); } ctx.fillStyle = '#3e2a1a'; for (let y = 60; y < 300; y += 110) ctx.fillRect(0, y, W, 26);
    for (let k = 0; k < 5; k++) { const x = 260 + k * 520; ctx.strokeStyle = '#2a1c12'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke(); ctx.fillStyle = '#2a1c12'; ctx.beginPath(); ctx.moveTo(x - 50, 340); ctx.lineTo(x + 50, 340); ctx.lineTo(x + 20, 300); ctx.lineTo(x - 20, 300); ctx.fill(); glow(ctx, x, 360, 360, '#ffc070', .32); }
    for (let k = 0; k < 4; k++) { const bx = 120 + k * 200; ctx.fillStyle = '#6a4424'; ctx.beginPath(); ctx.ellipse(bx, hz - 90, 80, 100, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#2a1c12'; ctx.lineWidth = 8; for (const dy of [-50, 50]) { ctx.beginPath(); ctx.moveTo(bx - 76, hz - 90 + dy); ctx.lineTo(bx + 76, hz - 90 + dy); ctx.stroke(); } }
    M.floorBoards(ctx, r, [0, hz, W, H - hz], '#5a3e26', 14);
    for (const [y, s] of [[hz + 80, .7], [hz + 220, 1]]) { ctx.fillStyle = '#7a5434'; ctx.fillRect(W * .5 - 900 * s, y, 1800 * s, 30 * s); ctx.fillStyle = '#4a3020'; ctx.fillRect(W * .5 - 880 * s, y + 30 * s, 20 * s, 110 * s); ctx.fillRect(W * .5 + 860 * s, y + 30 * s, 20 * s, 110 * s); for (let j = 0; j < 8; j++) { const mx = W * .5 - 800 * s + j * 230 * s; ctx.fillStyle = '#e8c070'; ctx.fillRect(mx, y - 50 * s, 34 * s, 50 * s); ctx.fillStyle = '#f8f0e0'; ctx.fillRect(mx, y - 58 * s, 34 * s, 12 * s); } }
    ctx.fillStyle = 'rgba(255,180,90,.08)'; ctx.fillRect(0, 0, W, H); fogBank(ctx, r, W, 400, 200, '220,200,170', .12, 30); FIN(ctx, r, W, H, .5); };

  // A closed factory with an iron gate, grey sky, a tall chimney with no smoke.
  ENV.factoryGate = (ctx, r, W, H) => { const hz = H * .7; M.sky(ctx, r, W, hz, '#6a6e74', '#b4b0a8', { strokes: 1400 }); ENV.clouds(ctx, r, W, 0, H * .28, 8, '#c8c4bc', '#8a8680', '#5a5854');
    brick(ctx, r, [W * .08, hz - 520, W * .84, 520], '#7a4a3a'); for (let j = 0; j < 9; j++) { const x = W * .1 + j * W * .092; ctx.fillStyle = '#2a2c30'; ctx.beginPath(); ctx.roundRect(x, hz - 470, 150, 230, [70, 70, 0, 0]); ctx.fill(); ctx.strokeStyle = '#c8b8a0'; ctx.lineWidth = 6; ctx.stroke(); }
    ctx.fillStyle = '#5a3a2e'; ctx.fillRect(W * .78, hz - 1100, 110, 600); ctx.fillStyle = '#3a2620'; ctx.fillRect(W * .775, hz - 1110, 124, 30);
    ctx.fillStyle = '#d8d0c0'; ctx.fillRect(W * .3, hz - 590, W * .4, 70); ctx.font = '54px Anton'; ctx.fillStyle = '#3a2a22'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('FABRIK', W * .5, hz - 555);
    ctx.fillStyle = '#5a5850'; ctx.fillRect(0, hz, W, H - hz); M.ground(ctx, r, W, H, hz, '#5a564c', '#7a7468');
    ctx.strokeStyle = '#1e1c1a'; ctx.lineWidth = 10; const gx = W * .38, gw = W * .24; ctx.strokeRect(gx, hz - 360, gw, 360); for (let x = gx + 30; x < gx + gw; x += 34) { ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, hz - 360); ctx.lineTo(x, hz); ctx.stroke(); ctx.fillStyle = '#1e1c1a'; ctx.beginPath(); ctx.moveTo(x - 8, hz - 360); ctx.lineTo(x, hz - 390); ctx.lineTo(x + 8, hz - 360); ctx.fill(); }
    ctx.fillStyle = '#e8e0cc'; ctx.fillRect(W * .5 - 120, hz - 230, 240, 70); ctx.font = '46px Anton'; ctx.fillStyle = '#8a2a22'; ctx.fillText('GESCHLOSSEN', W * .5, hz - 195);
    ctx.fillStyle = '#c8a040'; ctx.beginPath(); ctx.arc(W * .5, hz - 140, 26, 0, 7); ctx.fill(); FIN(ctx, r, W, H, .48); };

  // A dark hall with a podium and plain red drapes (no symbols), a spotlight.
  ENV.podiumHall = (ctx, r, W, H) => { const hz = H * .7; ctx.fillStyle = '#16121a'; ctx.fillRect(0, 0, W, H); M.wall(ctx, r, [0, 0, W, hz], '#2a2228', { density: 120 });
    for (const x of [W * .18, W * .42, W * .58, W * .82]) { ctx.fillStyle = '#7a1e1e'; ctx.fillRect(x - 90, 60, 180, hz - 160); for (let j = 0; j < 5; j++) { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(x - 90 + j * 36, 60, 10, hz - 160); } ctx.fillStyle = '#c8a050'; ctx.fillRect(x - 100, 50, 200, 16); }
    ctx.fillStyle = '#2e2620'; ctx.fillRect(0, hz, W, H - hz); M.floorBoards(ctx, r, [0, hz, W, H - hz], '#2e2620', 12);
    ctx.fillStyle = '#4a3a2e'; ctx.beginPath(); ctx.moveTo(W * .43, hz + 200); ctx.lineTo(W * .57, hz + 200); ctx.lineTo(W * .55, hz - 60); ctx.lineTo(W * .45, hz - 60); ctx.fill(); ctx.fillStyle = '#6a5442'; ctx.fillRect(W * .44, hz - 80, W * .12, 30);
    const g = ctx.createRadialGradient(W / 2, hz, 0, W / 2, hz, 900); g.addColorStop(0, 'rgba(255,240,200,.25)'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); FIN(ctx, r, W, H, .6); };

  // Maginot Line: concrete casemates set into a grassy ridge, barbed wire, steel cupolas.
  ENV.maginot = (ctx, r, W, H) => { const hz = H * .56; M.sky(ctx, r, W, hz, '#7a8a9a', '#d4d4c8', { strokes: 1600 }); ENV.clouds(ctx, r, W, 0, H * .3, 10, '#eceae4', '#aab0b4', '#7a8088');
    M.hills(ctx, r, P.Noise(31), W, hz - 10, 30, .003, 3, '#6a7a54'); M.ground(ctx, r, W, H, hz + 60, '#5a6a3a', '#7a8a54');
    for (let k = 0; k < 4; k++) { const x = 240 + k * 620, y = hz + 200; ctx.fillStyle = '#9a968a'; ctx.beginPath(); ctx.moveTo(x - 220, y + 120); ctx.lineTo(x - 180, y - 60); ctx.lineTo(x + 180, y - 60); ctx.lineTo(x + 220, y + 120); ctx.fill(); ctx.fillStyle = '#7a766c'; ctx.fillRect(x - 180, y - 70, 360, 20); ctx.fillStyle = '#1a1a1c'; ctx.fillRect(x - 110, y - 10, 220, 34); ctx.fillStyle = '#5a5c58'; ctx.beginPath(); ctx.ellipse(x + 120, y - 70, 60, 40, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#1a1a1c'; ctx.fillRect(x + 90, y - 92, 60, 10); M.contactShadow(ctx, x, y + 124, 240, 20, .35); }
    ctx.strokeStyle = 'rgba(30,26,22,.8)'; ctx.lineWidth = 3; for (let y of [H * .84, H * .9]) { for (let x = 0; x < W; x += 180) { ctx.beginPath(); ctx.moveTo(x, y + 40); ctx.lineTo(x + 30, y - 40); ctx.moveTo(x + 30, y + 40); ctx.lineTo(x, y - 40); ctx.stroke(); } ctx.beginPath(); for (let x = 0; x < W; x += 12) ctx.lineTo(x, y + Math.sin(x * .1) * 8); ctx.stroke(); }
    M.grassTufts(ctx, r, W, hz + 80, H, 120, ['#5a6a3a', '#7a8a48'], { h: 30 }); FIN(ctx, r, W, H, .4); };

  // A wide autumn plain (Poland): stubble fields, a farm track, a distant village with a church tower.
  ENV.plain = (ctx, r, W, H) => { const hz = H * .52; M.sky(ctx, r, W, hz, '#7a8aa0', '#e0d4bc', { strokes: 1600 }); ENV.clouds(ctx, r, W, 0, H * .3, 10, '#f0e8dc', '#b0aca4', '#7a7c80');
    M.distantTrees(ctx, r, W, hz, 160, '#4a5a3a', { scale: .9 }); { const vx = W * .7; for (let k = 0; k < 6; k++) { ctx.fillStyle = '#c8b898'; ctx.fillRect(vx + k * 50, hz - 30, 40, 30); ctx.fillStyle = '#8a4a34'; ctx.beginPath(); ctx.moveTo(vx + k * 50 - 4, hz - 30); ctx.lineTo(vx + k * 50 + 20, hz - 50); ctx.lineTo(vx + k * 50 + 44, hz - 30); ctx.fill(); } ctx.fillStyle = '#d8ccb0'; ctx.fillRect(vx + 330, hz - 110, 30, 110); ctx.fillStyle = '#5a7a6a'; ctx.beginPath(); ctx.moveTo(vx + 325, hz - 110); ctx.lineTo(vx + 345, hz - 160); ctx.lineTo(vx + 365, hz - 110); ctx.fill(); }
    M.ground(ctx, r, W, H, hz, '#8a7a48', '#b0a060'); for (let k = 0; k < 14; k++) { const y = hz + Math.pow(k / 14, 1.5) * (H - hz); ctx.strokeStyle = 'rgba(90,70,40,.25)'; ctx.lineWidth = 2 + k; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y + 20); ctx.stroke(); }
    paintRegion(ctx, r, [[W * .44, H], [W * .495, hz + 2], [W * .505, hz + 2], [W * .62, H]], '#8a7050', { density: 160, len: [20, 60], w: [4, 10], ang: 0, angJ: .2, al: .4 });
    M.grassTufts(ctx, r, W, hz + 40, H, 110, ['#9a8a50', '#b8a868'], { h: 34 }); ENV.birds(ctx, r, W * .2, W * .6, H * .1, H * .25, 7, '#2a2420', 1); FIN(ctx, r, W, H, .38); };

  // Snowy fir forest (Finland).
  ENV.snowForest = (ctx, r, W, H) => { const hz = H * .6; M.sky(ctx, r, W, hz, '#8a9aac', '#e4e8ec', { strokes: 1400 });
    for (let k = 0; k < 40; k++) fir(ctx, r, r.range(0, W), hz + 10, r.range(200, 320), '#4a5a5a', true);
    ctx.fillStyle = '#e8ecf0'; ctx.fillRect(0, hz, W, H - hz); for (let k = 0; k < 400; k++) { ctx.fillStyle = `rgba(${r() < .5 ? '200,210,220' : '255,255,255'},.5)`; ctx.beginPath(); ctx.ellipse(r.range(0, W), r.range(hz, H), r.range(30, 120), r.range(4, 12), 0, 0, 7); ctx.fill(); }
    for (let k = 0; k < 8; k++) { const x = k < 4 ? r.range(-60, W * .22) : r.range(W * .78, W + 60); fir(ctx, r, x, r.range(H * .86, H * .98), r.range(600, 900), '#2a3a34', true); }
    ctx.save(); ctx.globalAlpha = .7; for (let k = 0; k < 500; k++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(r.range(0, W), r.range(0, H), r.range(1.5, 4), 0, 7); ctx.fill(); } ctx.restore(); FIN(ctx, r, W, H, .36); };

  // Ardennes: a narrow road through a dark, hilly fir forest at dusk.
  ENV.ardennes = (ctx, r, W, H) => { const hz = H * .55; M.sky(ctx, r, W, hz, '#2a3040', '#8a7a6a', { strokes: 1200 });
    M.hills(ctx, r, P.Noise(77), W, hz - 60, 120, .002, 3, '#1e2a24'); for (let k = 0; k < 70; k++) fir(ctx, r, r.range(0, W), hz + r.range(-80, 20), r.range(200, 340), '#1a2a22');
    M.ground(ctx, r, W, H, hz, '#1e2a1e', '#2e3a26'); paintRegion(ctx, r, [[W * .3, H], [W * .48, hz + 4], [W * .52, hz + 4], [W * .7, H]], '#4a4236', { density: 220, len: [20, 70], w: [4, 10], ang: 0, angJ: .2, al: .45 });
    for (let k = 0; k < 10; k++) { const x = k < 5 ? r.range(-80, W * .26) : r.range(W * .74, W + 80); fir(ctx, r, x, r.range(H * .9, H * 1.02), r.range(800, 1200), '#0e1a14'); }
    fogBank(ctx, r, W, hz + 40, 200, '120,130,130', .16, 40); FIN(ctx, r, W, H, .6); };

  // Dunkirk: a long beach, smoke over the town, the sea, a wooden jetty (the mole).
  ENV.dunkirk = (ctx, r, W, H) => { const hz = H * .5; M.sky(ctx, r, W, hz, '#5a6070', '#c0b4a0', { strokes: 1400 }); ENV.clouds(ctx, r, W, 0, H * .24, 8, '#c8c0b4', '#8a8680', '#4a4848');
    for (let k = 0; k < 5; k++) ENV.smoke(ctx, r, W * .72 + k * 120, hz - 20, r.range(500, 800), '#2a2624', .35);
    { for (let k = 0; k < 14; k++) { const x = W * .62 + k * 70, h = r.range(60, 160); ctx.fillStyle = rgb(jitter('#6a6460', r, 10)); ctx.fillRect(x, hz - h, 64, h); } }
    const sg = ctx.createLinearGradient(0, hz, 0, hz + 160); sg.addColorStop(0, '#5a6a74'); sg.addColorStop(1, '#7a8a8c'); ctx.fillStyle = sg; ctx.fillRect(0, hz, W, 180);
    for (let k = 0; k < 200; k++) { ctx.strokeStyle = 'rgba(230,236,236,.35)'; ctx.lineWidth = 2; const x = r.range(0, W), y = r.range(hz + 10, hz + 180); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r.range(20, 60), y); ctx.stroke(); }
    ctx.fillStyle = '#c8b890'; ctx.fillRect(0, hz + 170, W, H - hz - 170); M.ground(ctx, r, W, H, hz + 180, '#b8a47a', '#d8c8a0');
    ctx.strokeStyle = 'rgba(240,240,236,.7)'; ctx.lineWidth = 6; ctx.beginPath(); for (let x = 0; x < W; x += 20) ctx.lineTo(x, hz + 176 + Math.sin(x * .02) * 6); ctx.stroke();
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(W * .05, hz + 60, W * .3, 22); for (let x = W * .05; x < W * .35; x += 50) ctx.fillRect(x, hz + 82, 10, 90);
    ctx.fillStyle = 'rgba(40,36,32,.7)'; for (let k = 0; k < 3; k++) { const x = W * .18 + k * W * .14, y = hz + 90; ctx.beginPath(); ctx.moveTo(x - 90, y); ctx.lineTo(x + 90, y); ctx.lineTo(x + 70, y + 26); ctx.lineTo(x - 70, y + 26); ctx.fill(); ctx.fillRect(x - 10, y - 50, 20, 50); }
    FIN(ctx, r, W, H, .44); };

  // 10 Downing Street at dusk: dark brick, black door, railings, a lamp.
  ENV.downing = (ctx, r, W, H) => { const hz = H * .74; brick(ctx, r, [0, 0, W, hz], '#3a2e2a');
    for (let k = 0; k < 6; k++) for (let f = 0; f < 3; f++) if (Math.abs(k - 2.5) > .6 || f < 2) sash(ctx, 160 + k * 400, 80 + f * 300, 150, 220, r() < .35);
    const dx = W * .5; ctx.fillStyle = '#e8e0d0'; ctx.fillRect(dx - 170, hz - 560, 340, 560); ctx.fillStyle = '#121214'; ctx.fillRect(dx - 120, hz - 470, 240, 470); ctx.fillStyle = '#e8e0d0'; ctx.beginPath(); ctx.arc(dx, hz - 470, 120, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#26282c'; ctx.beginPath(); ctx.arc(dx, hz - 470, 104, Math.PI, 0); ctx.fill();
    ctx.font = '60px Anton'; ctx.fillStyle = '#e8e0d0'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('10', dx, hz - 320); ctx.fillStyle = '#c8a050'; ctx.beginPath(); ctx.arc(dx + 80, hz - 240, 12, 0, 7); ctx.fill(); lamp(ctx, dx - 300, hz, 0, 1); glow(ctx, dx, hz - 600, 200, '#ffd090', .3);
    ctx.fillStyle = '#4a4a4c'; ctx.fillRect(0, hz, W, 50); ctx.fillStyle = '#2e2e30'; ctx.fillRect(0, hz + 50, W, H - hz); M.ground(ctx, r, W, H, hz + 50, '#2a2a2c', '#4a4a4c');
    ctx.strokeStyle = '#121214'; ctx.lineWidth = 6; for (let x = 0; x < W; x += 34) if (Math.abs(x - dx) > 200) { ctx.beginPath(); ctx.moveTo(x, hz + 10); ctx.lineTo(x, hz - 160); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(0, hz - 140); ctx.lineTo(dx - 200, hz - 140); ctx.moveTo(dx + 200, hz - 140); ctx.lineTo(W, hz - 140); ctx.stroke();
    ctx.fillStyle = 'rgba(30,40,70,.18)'; ctx.fillRect(0, 0, W, H); FIN(ctx, r, W, H, .5); };

  // A 1940 living room: wallpaper, blackout curtains, an armchair, a big wooden wireless set.
  ENV.radioRoom = (ctx, r, W, H) => { const hz = H * .7; M.wall(ctx, r, [0, 0, W, hz], '#8a7a5a', { density: 200 }); for (let x = 0; x < W; x += 90) for (let y = 40; y < hz; y += 120) { ctx.fillStyle = 'rgba(60,40,20,.18)'; ctx.beginPath(); ctx.ellipse(x + ((y / 120) % 2) * 45, y, 16, 26, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#5a3a26'; ctx.fillRect(0, hz - 60, W, 60);
    { const wx = W * .66, wy = 160; ctx.fillStyle = '#121624'; ctx.fillRect(wx, wy, 520, 520); ctx.strokeStyle = '#e8e0cc'; ctx.lineWidth = 12; ctx.strokeRect(wx, wy, 520, 520); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(wx + 260, wy); ctx.lineTo(wx + 260, wy + 520); ctx.moveTo(wx, wy + 260); ctx.lineTo(wx + 520, wy + 260); ctx.stroke(); ctx.strokeStyle = 'rgba(240,230,200,.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 520, wy + 520); ctx.moveTo(wx + 520, wy); ctx.lineTo(wx, wy + 520); ctx.stroke();
      for (const sx of [wx - 120, wx + 520]) { ctx.fillStyle = '#3a1e1e'; ctx.fillRect(sx, wy - 60, 120, 640); for (let j = 0; j < 4; j++) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(sx + j * 30, wy - 60, 8, 640); } } }
    { const rx = W * .3, ry = hz + 30; ctx.fillStyle = '#5a3a1e'; ctx.beginPath(); ctx.roundRect(rx - 200, ry - 420, 400, 420, [180, 180, 10, 10]); ctx.fill(); ctx.fillStyle = '#c8a870'; ctx.beginPath(); ctx.roundRect(rx - 150, ry - 360, 300, 200, [130, 130, 0, 0]); ctx.fill(); ctx.strokeStyle = '#5a3a1e'; ctx.lineWidth = 8; for (let j = -2; j <= 2; j++) { ctx.beginPath(); ctx.moveTo(rx + j * 50, ry - 340); ctx.lineTo(rx + j * 50, ry - 160); ctx.stroke(); } ctx.fillStyle = '#f2e0a0'; ctx.fillRect(rx - 120, ry - 130, 240, 40); glow(ctx, rx, ry - 110, 200, '#ffd090', .3); for (const kx of [rx - 80, rx + 80]) { ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.arc(kx, ry - 50, 22, 0, 7); ctx.fill(); } ctx.fillStyle = '#4a3020'; ctx.fillRect(rx - 220, ry, 440, 30); }
    M.floorBoards(ctx, r, [0, hz, W, H - hz], '#5a3e26', 12); ctx.fillStyle = '#7a2a2a'; ctx.beginPath(); ctx.ellipse(W * .5, hz + 260, 900, 120, 0, 0, 7); ctx.fill();
    { const ax = W * .82, ay = hz + 120; ctx.fillStyle = '#4a5a3a'; ctx.beginPath(); ctx.roundRect(ax - 200, ay - 380, 400, 380, 60); ctx.fill(); ctx.fillStyle = '#3a4a2e'; ctx.fillRect(ax - 240, ay - 220, 80, 220); ctx.fillRect(ax + 160, ay - 220, 80, 220); }
    glow(ctx, W * .3, hz - 200, 700, '#ffc070', .15); FIN(ctx, r, W, H, .5); };

  // A print shop: a big iron press, stacks of paper, brick wall, bare bulbs.
  ENV.pressRoom = (ctx, r, W, H) => { const hz = H * .7; brick(ctx, r, [0, 0, W, hz], '#6a4436');
    for (let k = 0; k < 3; k++) { const x = 500 + k * 800; ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 220); ctx.stroke(); ctx.fillStyle = '#fff0c0'; ctx.beginPath(); ctx.arc(x, 240, 20, 0, 7); ctx.fill(); glow(ctx, x, 240, 420, '#ffd090', .3); }
    M.floorBoards(ctx, r, [0, hz, W, H - hz], '#4a3a2c', 12);
    const px = W * .5, py = hz + 80; ctx.fillStyle = '#2a2c30'; ctx.fillRect(px - 420, py - 560, 840, 560); ctx.fillStyle = '#3a3c42'; ctx.fillRect(px - 380, py - 520, 760, 220); for (const cx of [px - 200, px + 200]) { ctx.fillStyle = '#1a1c20'; ctx.beginPath(); ctx.arc(cx, py - 160, 140, 0, 7); ctx.fill(); ctx.strokeStyle = '#6a6c72'; ctx.lineWidth = 10; ctx.stroke(); for (let j = 0; j < 6; j++) { ctx.beginPath(); ctx.moveTo(cx, py - 160); ctx.lineTo(cx + Math.cos(j) * 130, py - 160 + Math.sin(j) * 130); ctx.stroke(); } }
    ctx.fillStyle = '#e8e0cc'; ctx.fillRect(px - 380, py - 300, 760, 30);
    for (const sx of [W * .12, W * .82]) for (let j = 0; j < 8; j++) { ctx.fillStyle = j % 2 ? '#e8e0cc' : '#d8d0bc'; ctx.fillRect(sx, hz + 60 - j * 28, 240, 26); }
    FIN(ctx, r, W, H, .5); };
})(window);

window.PLATES = {
  map_europe: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -12, lon1: 42, lat0: 35, lat1: 66 }, grid: 5, compass: [-9, 38], title: 'Europe 1939', titleXY: [1880, 1010], labels: [], mountains: [[10, 46.5, 8, 2]], rivers: [], greens: [], deserts: [] }),
  mirror_hall: (c, r, W, H) => ENV.mirrorHall(c, r, W, H),
  berlin_street: (c, r, W, H) => ENV.berlinStreet(c, r, W, H),
  beer_hall: (c, r, W, H) => ENV.beerHall(c, r, W, H),
  factory_gate: (c, r, W, H) => ENV.factoryGate(c, r, W, H),
  podium_hall: (c, r, W, H) => ENV.podiumHall(c, r, W, H),
  maginot: (c, r, W, H) => ENV.maginot(c, r, W, H),
  plain: (c, r, W, H) => ENV.plain(c, r, W, H),
  snow_forest: (c, r, W, H) => ENV.snowForest(c, r, W, H),
  ardennes: (c, r, W, H) => ENV.ardennes(c, r, W, H),
  dunkirk: (c, r, W, H) => ENV.dunkirk(c, r, W, H),
  downing: (c, r, W, H) => ENV.downing(c, r, W, H),
  radio_room: (c, r, W, H) => ENV.radioRoom(c, r, W, H),
  press_room: (c, r, W, H) => ENV.pressRoom(c, r, W, H),
};
