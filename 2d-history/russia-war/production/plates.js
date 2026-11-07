// Russia-NATO war scenario painted plates (Alium style: muted steel blue, olive, warning red).
// Paint with: node shared/p2/paint.js russia-war/production/plates.js russia-war/production/plates all
// Reused plates copied in: map_europe, plain (ww2-part1); serverhall (dark-web-king); birch_rail (putin-security).
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .42, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const fogBank = (c, r, W, y, h, col = '210,210,214', al = .16, n = 40) => { c.save(); c.filter = 'blur(30px)'; for (let i = 0; i < n; i++) { c.fillStyle = `rgba(${col},${al * r.range(.5, 1)})`; c.beginPath(); c.ellipse(r.range(-100, W + 100), y + r.gauss() * h * .3, r.range(200, 520), r.range(40, 90), 0, 0, 7); c.fill(); } c.restore(); };
  const fir = (c, r, x, base, h, col = '#24382c') => { const w = h * .36; for (let k = 0; k < 6; k++) { const t = k / 6, y = base - h * t - h * .1, ww = w * (1 - t * .8); c.fillStyle = rgb(jitter(shade(col, -.08 + t * .14), r, 5)); c.beginPath(); c.moveTo(x - ww, y); c.lineTo(x, y - h * .32); c.lineTo(x + ww, y); c.closePath(); c.fill(); } c.fillStyle = '#2a2018'; c.fillRect(x - h * .02, base - h * .12, h * .04, h * .12); };
  const tooth = (c, r, x, y, s, lit = 'rgba(255,255,255,.18)') => { // concrete dragon's tooth (truncated pyramid)
    c.fillStyle = 'rgba(20,24,26,.35)'; c.beginPath(); c.ellipse(x + 30 * s, y + 4 * s, 80 * s, 14 * s, 0, 0, 7); c.fill();
    c.fillStyle = rgb(jitter('#a8a8a0', r, 8)); c.beginPath(); c.moveTo(x - 55 * s, y); c.lineTo(x - 18 * s, y - 92 * s); c.lineTo(x + 18 * s, y - 92 * s); c.lineTo(x + 10 * s, y + 6 * s); c.closePath(); c.fill();
    c.fillStyle = rgb(jitter('#7a7c78', r, 8)); c.beginPath(); c.moveTo(x + 10 * s, y + 6 * s); c.lineTo(x + 18 * s, y - 92 * s); c.lineTo(x + 55 * s, y - 2 * s); c.closePath(); c.fill();
    c.fillStyle = lit; c.fillRect(x - 18 * s, y - 94 * s, 36 * s, 6 * s); c.strokeStyle = 'rgba(40,40,40,.25)'; c.lineWidth = 2 * s; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(x - 40 * s + r() * 30 * s, y - r() * 70 * s); c.lineTo(x - 30 * s + r() * 30 * s, y - r() * 70 * s); c.stroke(); } };
  const crane = (c, x, base, h, s, col = '#c87a2a') => { c.save(); c.strokeStyle = col; c.lineWidth = 10 * s; c.fillStyle = col;
    for (const dx of [-60, 60]) { c.beginPath(); c.moveTo(x + dx * s, base); c.lineTo(x + dx * .5 * s, base - h); c.stroke(); }
    for (let k = 1; k < 6; k++) { const y = base - h * k / 6; c.lineWidth = 5 * s; c.beginPath(); c.moveTo(x - 60 * s * (1 - k / 12), y); c.lineTo(x + 60 * s * (1 - k / 12), y - h / 6); c.stroke(); }
    c.fillRect(x - 260 * s, base - h - 26 * s, 520 * s, 26 * s); c.fillRect(x - 40 * s, base - h - 70 * s, 80 * s, 50 * s); c.lineWidth = 3 * s; c.beginPath(); c.moveTo(x + 200 * s, base - h); c.lineTo(x + 200 * s, base - h * .55); c.stroke(); c.restore(); };
  const waves = (c, r, W, y0, H, a, b, n = 900, amp = 1) => { for (let k = 0; k < n; k++) { const y = y0 + Math.pow(r(), 1.4) * (H - y0), t = (y - y0) / (H - y0), w = (30 + t * 160) * amp; c.fillStyle = rgb(jitter(mix(a, b, r()), r, 8)); c.beginPath(); c.ellipse(r.range(-50, W + 50), y, w, 3 + t * 10 * amp, 0, Math.PI, 0); c.fill(); } };
  const caps = (c, r, W, y0, H, n = 300) => { for (let k = 0; k < n; k++) { const y = y0 + Math.pow(r(), 1.3) * (H - y0), t = (y - y0) / (H - y0); c.strokeStyle = `rgba(236,240,240,${.25 + t * .4})`; c.lineWidth = 2 + t * 5; const x = r.range(0, W), w = 20 + t * 110; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + w * .5, y - 6 - t * 14, x + w, y); c.stroke(); } };

  // NATO war room: dark panelled room, wall of screens, a long lit table with a printed map of Europe.
  ENV.warRoom = (ctx, r, W, H) => { const c = ctx, hz = H * .5;
    const bg = c.createLinearGradient(0, 0, 0, hz); bg.addColorStop(0, '#141a24'); bg.addColorStop(1, '#232c38'); c.fillStyle = bg; c.fillRect(0, 0, W, hz + 10);
    for (let x = 0; x < W; x += 160) { c.fillStyle = rgb(jitter('#1e2632', r, 4)); c.fillRect(x, 0, 156, hz); c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(x, 0, 4, hz); }
    // wall screens
    const scr = [[W * .12, 140, 520, 300], [W * .5 - 420, 90, 840, 380], [W * .88 - 520, 140, 520, 300]];
    for (const [x, y, w, h] of scr) { c.fillStyle = '#0a0e14'; c.fillRect(x - 14, y - 14, w + 28, h + 28); const g = c.createLinearGradient(x, y, x, y + h); g.addColorStop(0, '#1c3a5a'); g.addColorStop(1, '#0e2236'); c.fillStyle = g; c.fillRect(x, y, w, h);
      c.strokeStyle = 'rgba(120,200,255,.25)'; c.lineWidth = 2; for (let k = 1; k < 8; k++) { c.beginPath(); c.moveTo(x, y + h * k / 8); c.lineTo(x + w, y + h * k / 8); c.stroke(); c.beginPath(); c.moveTo(x + w * k / 8, y); c.lineTo(x + w * k / 8, y + h); c.stroke(); }
      for (let k = 0; k < 14; k++) { c.fillStyle = r() < .3 ? 'rgba(255,90,70,.8)' : 'rgba(120,210,255,.8)'; c.beginPath(); c.arc(x + r.range(20, w - 20), y + r.range(20, h - 20), r.range(4, 9), 0, 7); c.fill(); }
      glow(c, x + w / 2, y + h / 2, w * .8, '#4aa0e0', .12); }
    // a big outline of Europe on the centre screen
    c.save(); c.strokeStyle = 'rgba(150,220,255,.55)'; c.lineWidth = 3; const cx = W * .5, cy = 280; c.beginPath(); c.ellipse(cx, cy, 300, 150, 0, 0, 7); c.stroke(); c.restore();
    // floor
    const fl = c.createLinearGradient(0, hz, 0, H); fl.addColorStop(0, '#2a2e34'); fl.addColorStop(1, '#16181c'); c.fillStyle = fl; c.fillRect(0, hz, W, H - hz);
    paintRegion(c, r, [[0, hz], [W, hz], [W, H], [0, H]], '#24282e', { density: 900, len: [30, 90], w: [6, 14], ang: 0, angJ: .1, al: .25 });
    // table (perspective slab) with a printed map top
    const T = [[W * .16, H * .66], [W * .84, H * .66], [W * .96, H * .97], [W * .04, H * .97]];
    c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.moveTo(W * .02, H * .99); c.lineTo(W * .98, H * .99); c.lineTo(W * .9, H); c.lineTo(W * .1, H); c.fill();
    c.fillStyle = '#3a2a20'; c.beginPath(); c.moveTo(T[3][0], T[3][1]); c.lineTo(T[2][0], T[2][1]); c.lineTo(T[2][0], T[2][1] + 40); c.lineTo(T[3][0], T[3][1] + 40); c.fill();
    poly(c, T); c.fillStyle = '#c8b890'; c.fill(); c.save(); poly(c, T); c.clip();
    { // printed map of Europe on the table, projected into the table's trapezoid
      const V = { lon0: -12, lon1: 42, lat0: 36, lat1: 66 }, q = (lon, lat) => { const u = (lon - V.lon0) / (V.lon1 - V.lon0), v = (V.lat1 - lat) / (V.lat1 - V.lat0); const xl = T[0][0] + (T[3][0] - T[0][0]) * v, xr = T[1][0] + (T[2][0] - T[1][0]) * v; return [xl + (xr - xl) * u, T[0][1] + (T[3][1] - T[0][1]) * Math.pow(v, 1.15)]; };
      c.fillStyle = '#9ab4bc'; poly(c, T); c.fill(); const WD = G.WORLD50 || {};
      for (const name in WD) for (const R0 of WD[name]) { if (R0.length < 6) continue; let vis = false; for (let i = 0; i < R0.length; i += 2) if (R0[i] > V.lon0 - 5 && R0[i] < V.lon1 + 5 && R0[i + 1] > V.lat0 - 5 && R0[i + 1] < V.lat1 + 5) { vis = true; break; } if (!vis) continue;
        c.beginPath(); for (let i = 0; i < R0.length; i += 2) { const [x, y] = q(R0[i], R0[i + 1]); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); c.fillStyle = name === 'Russia' || name === 'Belarus' ? '#c8a48a' : ['Estonia', 'Latvia', 'Lithuania'].includes(name) ? '#e8d48a' : '#e0d4b0'; c.fill(); c.strokeStyle = 'rgba(70,56,40,.55)'; c.lineWidth = 2; c.stroke(); }
      c.strokeStyle = 'rgba(60,50,40,.18)'; c.lineWidth = 2; for (let lon = -10; lon <= 40; lon += 10) { c.beginPath(); for (let lat = V.lat0; lat <= V.lat1; lat += 2) { const [x, y] = q(lon, lat); lat === V.lat0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
      for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(30,30,40,.6)'; const [x, y] = q(r.range(-5, 35), r.range(40, 60)); c.beginPath(); c.arc(x, y, 8, 0, 7); c.fill(); }
      c.strokeStyle = '#3a2a20'; c.lineWidth = 10; poly(c, T); c.stroke(); }
    c.restore(); glow(c, W * .5, H * .8, 900, '#ffe8c0', .16);
    // overhead lamps
    for (const lx of [W * .3, W * .5, W * .7]) { c.fillStyle = '#0c0e10'; c.fillRect(lx - 3, 0, 6, 60); c.beginPath(); c.moveTo(lx - 70, 90); c.lineTo(lx + 70, 90); c.lineTo(lx + 30, 56); c.lineTo(lx - 30, 56); c.fill(); glow(c, lx, 110, 260, '#ffe2b0', .3); }
    // flags along the back wall (plain colour blocks, no real insignia)
    for (let k = 0; k < 12; k++) { const x = W * .07 + k * W * .075, y = hz - 150; c.fillStyle = '#2a2a2a'; c.fillRect(x, y, 5, 160); c.fillStyle = rgb(jitter(['#3a5a9a', '#9a3a3a', '#e0d8c8', '#3a7a5a'][k % 4], r, 10)); c.beginPath(); c.moveTo(x + 5, y + 4); c.quadraticCurveTo(x + 40, y + 14, x + 70, y + 6); c.lineTo(x + 70, y + 54); c.quadraticCurveTo(x + 40, y + 62, x + 5, y + 52); c.fill(); }
    FIN(c, r, W, H, .5); };

  // Foggy Baltic border at dawn: rows of dragon's teeth across a field, birch/fir treeline, a border post.
  ENV.balticBorder = (ctx, r, W, H) => { const c = ctx, hz = H * .5; M.sky(c, r, W, hz, '#8a96a4', '#d8d4cc', { strokes: 1400 }); ENV.clouds(c, r, W, 0, H * .26, 9, '#e8e4dc', '#b4b4b0', '#808488');
    for (let k = 0; k < 90; k++) fir(c, r, r.range(0, W), hz + r.range(-10, 16), r.range(140, 260), '#4a5a52');
    fogBank(c, r, W, hz + 10, 120, '220,222,224', .22, 50);
    M.ground(c, r, W, H, hz + 20, '#6a7048', '#9a9a70'); M.grassTufts(c, r, W, hz + 40, H, 160, ['#7a7a50', '#9a9468'], { h: 30 });
    paintRegion(c, r, [[0, H * .86], [W, H * .84], [W, H * .97], [0, H * .99]], '#8a8070', { density: 500, len: [20, 60], w: [5, 12], ang: 0, angJ: .2, al: .55 }); for (let k = 0; k < 120; k++) { c.fillStyle = rgb(jitter('#6a6458', r, 10), .6); c.beginPath(); c.ellipse(r.range(0, W), r.range(H * .86, H * .97), r.range(4, 12), r.range(3, 6), 0, 0, 7); c.fill(); }
    for (let row = 0; row < 3; row++) { const y = hz + 90 + row * row * 46 + row * 70, s = .45 + row * .32; for (let x = -60 + (row % 2) * 70 * s; x < W + 80; x += 150 * s) tooth(c, r, x, y + r.range(-4, 4), s); }
    // border post (striped pole) and a sign
    c.save(); const bx = W * .86, by = H * .78; for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#e8e4dc' : '#2a6a3a'; c.fillRect(bx, by - 360 + k * 45, 22, 45); } c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(bx + 40, by + 6, 70, 12, 0, 0, 7); c.fill(); c.restore();
    fogBank(c, r, W, H * .72, 200, '230,230,232', .1, 30); FIN(c, r, W, H, .4); };

  // Texas port at dawn: warm sky, cranes, a huge grey roll-on/roll-off ship on the right with its stern ramp down.
  ENV.portDawn = (ctx, r, W, H) => { const c = ctx, hz = H * .56; M.sky(c, r, W, hz, '#5a6a8a', '#f0b878', { strokes: 1600 }); glow(c, W * .3, hz - 40, 700, '#ffc890', .45); ENV.clouds(c, r, W, H * .05, H * .3, 8, '#f8d0a8', '#c8988a', '#6a6078');
    const sea = c.createLinearGradient(0, hz, 0, H * .7); sea.addColorStop(0, '#c89a7a'); sea.addColorStop(1, '#4a5a6a'); c.fillStyle = sea; c.fillRect(0, hz, W, H * .14);
    for (let k = 0; k < 4; k++) crane(c, W * .08 + k * 300, hz + 10, r.range(380, 460), .7);
    // ship
    c.fillStyle = '#6a7078'; c.beginPath(); c.moveTo(W * .5, hz + 60); c.lineTo(W * 1.02, hz + 60); c.lineTo(W * 1.02, hz - 360); c.lineTo(W * .56, hz - 360); c.lineTo(W * .5, hz - 200); c.closePath(); c.fill();
    c.fillStyle = '#4a5058'; c.fillRect(W * .5, hz - 80, W * .52, 140); c.fillStyle = '#8a3a2a'; c.fillRect(W * .5, hz + 30, W * .52, 30);
    c.fillStyle = '#eaeae4'; c.fillRect(W * .86, hz - 520, 260, 170); for (let k = 0; k < 6; k++) { c.fillStyle = '#2a3a4a'; c.fillRect(W * .86 + 16 + k * 40, hz - 480, 28, 20); }
    c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(W * .56, hz - 360, W * .46, 10); for (let k = 0; k < 40; k++) { c.fillStyle = 'rgba(30,30,30,.15)'; c.fillRect(W * .52 + r() * W * .48, hz - 340 + r() * 240, r.range(20, 80), 4); }
    // ramp from ship stern to the quay
    c.fillStyle = '#3a4048'; c.beginPath(); c.moveTo(W * .5, hz - 160); c.lineTo(W * .5, hz - 20); c.lineTo(W * .36, H * .74); c.lineTo(W * .36, H * .74 - 30); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(200,200,200,.3)'; c.lineWidth = 3; for (let k = 1; k < 12; k++) { const t = k / 12; c.beginPath(); c.moveTo(W * (.5 - .14 * t), hz - 160 + (H * .74 - 30 - hz + 160) * t); c.lineTo(W * (.5 - .14 * t), hz - 20 + (H * .74 - hz + 20) * t); c.stroke(); }
    // quay
    M.ground(c, r, W, H, H * .7, '#5a5650', '#8a8478'); for (let k = 0; k < 12; k++) { c.strokeStyle = 'rgba(240,220,120,.5)'; c.lineWidth = 8; c.setLineDash([60, 40]); c.beginPath(); c.moveTo(0, H * .86); c.lineTo(W * .36, H * .76); c.stroke(); c.setLineDash([]); }
    for (let k = 0; k < 10; k++) { c.fillStyle = rgb(jitter(['#9a4a2a', '#2a5a8a', '#6a7a4a'][k % 3], r, 10)); c.fillRect(k * 70, H * .7 - 70 - (k % 3) * 0, 66, 70); }
    glow(c, W * .3, H * .74, 600, '#ffb070', .2); FIN(c, r, W, H, .4); };

  // Stormy North Atlantic: grey-green swell, white caps, low dark clouds and rain streaks.
  ENV.atlanticStorm = (ctx, r, W, H) => { const c = ctx, hz = H * .42; M.sky(c, r, W, hz, '#2a3038', '#6a747a', { strokes: 1600 }); ENV.clouds(c, r, W, 0, hz * .8, 14, '#8a9094', '#4a5258', '#22282e');
    const sg = c.createLinearGradient(0, hz, 0, H); sg.addColorStop(0, '#4a5a5c'); sg.addColorStop(1, '#16242a'); c.fillStyle = sg; c.fillRect(0, hz, W, H - hz);
    waves(c, r, W, hz, H, '#2a3e44', '#5a7072', 1400, 1.2); caps(c, r, W, hz, H, 380);
    c.save(); c.strokeStyle = 'rgba(200,210,214,.12)'; c.lineWidth = 2; for (let k = 0; k < 500; k++) { const x = r.range(0, W), y = r.range(0, H); c.beginPath(); c.moveTo(x, y); c.lineTo(x - 18, y + 60); c.stroke(); } c.restore(); FIN(c, r, W, H, .55); };

  // Rail yard at night: floodlights on masts, parallel tracks, flatcars waiting, wet gravel.
  ENV.railYard = (ctx, r, W, H) => { const c = ctx, hz = H * .5; M.sky(c, r, W, hz, '#0c1018', '#2a3040', { strokes: 1000 });
    for (let k = 0; k < 30; k++) { c.fillStyle = rgb(jitter('#1a1e24', r, 4)); const w = r.range(80, 240), h = r.range(40, 160); c.fillRect(r.range(0, W), hz - h, w, h); }
    c.fillStyle = '#1e2228'; c.fillRect(0, hz, W, H - hz); paintRegion(c, r, [[0, hz], [W, hz], [W, H], [0, H]], '#2e3036', { density: 1400, len: [6, 20], w: [4, 8], ang: 0, angJ: 1, al: .5 });
    const rails = (y, sp) => { c.fillStyle = '#3a3026'; for (let x = -20; x < W; x += sp * 1.6) c.fillRect(x, y - sp * .18, sp * .5, sp * .5); c.strokeStyle = '#8a8c90'; c.lineWidth = sp * .08; for (const dy of [-sp * .12, sp * .2]) { c.beginPath(); c.moveTo(0, y + dy); c.lineTo(W, y + dy); c.stroke(); } };
    for (let k = 0; k < 6; k++) rails(hz + 40 + k * k * 22 + k * 30, 20 + k * 14);
    for (let k = 0; k < 5; k++) { const x = W * .05 + k * 420, y = hz + 30; c.fillStyle = '#16181c'; c.fillRect(x, y - 40, 380, 26); for (const wx of [40, 100, 280, 340]) { c.beginPath(); c.arc(x + wx, y - 10, 14, 0, 7); c.fill(); } }
    for (let k = 0; k < 8; k++) { const x = r.range(0, W); c.fillStyle = '#0e1012'; c.fillRect(x, hz - 160, 8, 160); c.fillStyle = r() < .5 ? '#ff4a3a' : '#5aff7a'; c.beginPath(); c.arc(x + 4, hz - 150, 6, 0, 7); c.fill(); glow(c, x + 4, hz - 150, 40, c.fillStyle, .4); }
    for (const mx of [W * .15, W * .55, W * .9]) { c.fillStyle = '#0a0c0e'; c.fillRect(mx - 8, hz - 520, 16, 520); c.fillRect(mx - 60, hz - 540, 120, 26); glow(c, mx, hz - 520, 900, '#e8f0ff', .22); c.save(); c.filter = 'blur(40px)'; const cg = c.createLinearGradient(0, hz - 520, 0, H); cg.addColorStop(0, 'rgba(232,240,255,.10)'); cg.addColorStop(1, 'rgba(232,240,255,.02)'); c.fillStyle = cg; c.beginPath(); c.moveTo(mx - 50, hz - 520); c.lineTo(mx - 420, H); c.lineTo(mx + 420, H); c.lineTo(mx + 50, hz - 520); c.fill(); c.restore(); }
    for (let k = 0; k < 300; k++) { c.fillStyle = 'rgba(220,230,255,.06)'; c.beginPath(); c.ellipse(r.range(0, W), r.range(hz + 100, H), r.range(20, 80), 4, 0, 0, 7); c.fill(); }
    FIN(c, r, W, H, .55); };

  // Suwalki corridor: rolling farmland, a two-lane road toward the horizon, dark forest on both flanks, lakes.
  ENV.farmCorridor = (ctx, r, W, H) => { const c = ctx, hz = H * .48; M.sky(c, r, W, hz, '#6a7a8e', '#d4ccba', { strokes: 1400 }); ENV.clouds(c, r, W, 0, H * .28, 10, '#ece6dc', '#b0aca4', '#6a6e74');
    M.hills(c, r, P.Noise(41), W, hz - 20, 60, .002, 3, '#5a6a4a');
    for (let k = 0; k < 60; k++) { const left = r() < .5; fir(c, r, left ? r.range(-60, W * .22) : r.range(W * .78, W + 60), hz + r.range(10, 70), r.range(180, 300), '#24342a'); }
    M.ground(c, r, W, H, hz + 30, '#7a8048', '#a8a468');
    for (let k = 0; k < 9; k++) { const y = hz + 40 + k * k * 9; c.fillStyle = rgb(jitter(k % 2 ? '#b8a860' : '#8a9a50', r, 10), .5); c.fillRect(W * .2, y, W * .6, 6 + k * 3); }
    c.fillStyle = '#7a9aa8'; c.beginPath(); c.ellipse(W * .76, hz + 70, 160, 22, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(W * .72, hz + 64, 120, 3);
    paintRegion(c, r, [[W * .4, H], [W * .495, hz + 30], [W * .505, hz + 30], [W * .6, H]], '#4a4a4c', { density: 300, len: [20, 60], w: [4, 10], ang: 0, angJ: .2, al: .6 });
    c.strokeStyle = 'rgba(240,230,180,.7)'; c.lineWidth = 6; c.setLineDash([40, 50]); c.beginPath(); c.moveTo(W * .5, hz + 34); c.lineTo(W * .5, H); c.stroke(); c.setLineDash([]);
    for (let k = 0; k < 8; k++) { const x = W * .3 + k * 30, y = hz + 50 + k * 6; c.fillStyle = '#5a4030'; c.fillRect(x, y - 30, 4, 30); }
    M.grassTufts(c, r, W, hz + 60, H, 140, ['#8a8a50', '#a8a068'], { h: 32 }); ENV.birds(c, r, W * .3, W * .7, H * .08, H * .2, 6, '#2a2420', 1); FIN(c, r, W, H, .4); };

  // Gotland harbour: limestone cliffs, a small harbour wall, red-roofed houses, sea under a cold sky.
  ENV.gotland = (ctx, r, W, H) => { const c = ctx, hz = H * .5; M.sky(c, r, W, hz, '#7a90a8', '#dce0e0', { strokes: 1400 }); ENV.clouds(c, r, W, 0, H * .28, 9, '#f0f0ec', '#b8bcc0', '#7a8088');
    const sg = c.createLinearGradient(0, hz, 0, H); sg.addColorStop(0, '#6a8a9a'); sg.addColorStop(1, '#2a4a5a'); c.fillStyle = sg; c.fillRect(0, hz, W, H - hz); waves(c, r, W, hz, H, '#3a5a6a', '#7a9aa8', 800, .7);
    // cliffs on the right with houses and a church tower
    c.fillStyle = '#d8d0b8'; c.beginPath(); c.moveTo(W * .5, hz + 20); c.lineTo(W * .58, hz - 140); c.lineTo(W, hz - 180); c.lineTo(W, H * .78); c.lineTo(W * .6, H * .7); c.closePath(); c.fill();
    paintRegion(c, r, [[W * .5, hz + 20], [W * .58, hz - 140], [W, hz - 180], [W, H * .78], [W * .6, H * .7]], '#c8c0a4', { density: 700, len: [20, 70], w: [6, 14], ang: 1.4, angJ: .3, al: .5 });
    for (let k = 0; k < 16; k++) { const x = W * .6 + k * 60, y = hz - 150 - (k % 3) * 8; c.fillStyle = rgb(jitter('#e8e0d0', r, 6)); c.fillRect(x, y - 50, 52, 50); c.fillStyle = rgb(jitter('#a83a2a', r, 10)); c.beginPath(); c.moveTo(x - 4, y - 50); c.lineTo(x + 26, y - 80); c.lineTo(x + 56, y - 50); c.fill(); }
    c.fillStyle = '#e0d8c4'; c.fillRect(W * .82, hz - 340, 60, 190); c.fillStyle = '#3a4a4a'; c.beginPath(); c.moveTo(W * .82 - 6, hz - 340); c.lineTo(W * .82 + 30, hz - 440); c.lineTo(W * .82 + 66, hz - 340); c.fill();
    // harbour wall
    c.fillStyle = '#8a8478'; c.fillRect(W * .18, H * .7, W * .5, 40); for (let x = W * .18; x < W * .68; x += 60) { c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x, H * .7, 3, 40); }
    c.fillStyle = '#c8402a'; c.fillRect(W * .18 - 10, H * .7 - 120, 30, 120); c.fillStyle = '#f0f0e8'; c.fillRect(W * .18 - 10, H * .7 - 90, 30, 20);
    // --- extra detail: distant sails, sea stacks (raukar), cliff strata, rocks + foam, town wall, cathedral, trees, moored boats
    for (let k = 0; k < 5; k++) { const x = r.range(120, W * .45), y = hz + r.range(4, 26), h = r.range(26, 46); c.fillStyle = 'rgba(70,80,90,.55)'; c.fillRect(x - 14, y - 4, 28, 5); c.fillStyle = 'rgba(240,240,232,.8)'; c.beginPath(); c.moveTo(x, y - 4); c.lineTo(x, y - h); c.lineTo(x + h * .5, y - 6); c.fill(); }
    for (const [x0, w0, h0] of [[W * .1, 70, 210], [W * .155, 46, 140], [W * .3, 90, 260], [W * .34, 40, 120]]) { const yb = hz + 150 + h0 * .2; c.fillStyle = '#b8ae94'; c.beginPath(); c.moveTo(x0 - w0, yb); c.lineTo(x0 - w0 * .7, yb - h0 * .6); c.lineTo(x0 - w0 * .9, yb - h0 * .8); c.lineTo(x0 - w0 * .3, yb - h0); c.lineTo(x0 + w0 * .4, yb - h0 * .92); c.lineTo(x0 + w0 * .6, yb - h0 * .5); c.lineTo(x0 + w0 * .9, yb); c.closePath(); c.fill(); c.fillStyle = 'rgba(70,60,50,.3)'; c.beginPath(); c.moveTo(x0 + w0 * .1, yb); c.lineTo(x0 + w0 * .4, yb - h0 * .92); c.lineTo(x0 + w0 * .6, yb - h0 * .5); c.lineTo(x0 + w0 * .9, yb); c.fill(); for (let j = 1; j < 6; j++) { c.strokeStyle = 'rgba(90,80,64,.35)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x0 - w0 * .8, yb - h0 * j / 6); c.lineTo(x0 + w0 * .7, yb - h0 * j / 6 + r.range(-6, 6)); c.stroke(); } c.fillStyle = 'rgba(240,248,248,.7)'; c.beginPath(); c.ellipse(x0, yb + 4, w0 * 1.3, 8, 0, 0, 7); c.fill(); }
    c.save(); c.beginPath(); c.moveTo(W * .5, hz + 20); c.lineTo(W * .58, hz - 140); c.lineTo(W, hz - 180); c.lineTo(W, H * .78); c.lineTo(W * .6, H * .7); c.closePath(); c.clip();
    for (let j = 0; j < 22; j++) { const y = hz - 120 + j * 22; c.strokeStyle = j % 3 ? 'rgba(120,108,84,.28)' : 'rgba(250,246,232,.35)'; c.lineWidth = j % 3 ? 3 : 5; c.beginPath(); c.moveTo(W * .5, y + 30); for (let x = W * .5; x <= W; x += 80) c.lineTo(x, y + (x - W * .5) * .06 + r.range(-5, 5)); c.stroke(); }
    for (let k = 0; k < 40; k++) { const x = r.range(W * .56, W), y = r.range(hz - 100, H * .76); c.strokeStyle = 'rgba(90,80,62,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + r.range(-8, 8), y + r.range(30, 90)); c.stroke(); }
    const cg = c.createLinearGradient(0, H * .55, 0, H * .78); cg.addColorStop(0, 'rgba(40,40,40,0)'); cg.addColorStop(1, 'rgba(40,36,30,.4)'); c.fillStyle = cg; c.fillRect(W * .5, H * .5, W * .5, H * .3);
    c.fillStyle = '#6a8a4a'; c.beginPath(); c.moveTo(W * .58, hz - 140); c.lineTo(W, hz - 180); c.lineTo(W, hz - 158); c.lineTo(W * .58, hz - 122); c.closePath(); c.fill(); c.restore();
    for (let k = 0; k < 34; k++) { const t = r(), x = W * .6 + t * W * .4, y = H * .7 + t * H * .08 + r.range(-6, 14), rw = r.range(18, 46); c.fillStyle = rgb(jitter('#7a7466', r, 12)); c.beginPath(); c.ellipse(x, y, rw, rw * .55, 0, Math.PI, 0); c.fill(); c.fillStyle = 'rgba(245,250,250,.65)'; c.beginPath(); c.ellipse(x + r.range(-10, 10), y + 4, rw * 1.2, 5, 0, 0, 7); c.fill(); }
    // town wall with round towers along the cliff top
    const wy = (x) => hz - 140 - (x - W * .58) / (W * .42) * 40;
    c.fillStyle = '#d4c8a8'; c.strokeStyle = 'rgba(60,50,40,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(W * .585, wy(W * .585)); for (let x = W * .585; x <= W; x += 20) c.lineTo(x, wy(x) - 46); c.lineTo(W, wy(W)); c.closePath(); c.fill();
    for (let x = W * .59; x < W; x += 34) { c.fillStyle = '#d4c8a8'; c.fillRect(x, wy(x) - 62, 18, 18); }
    for (let x = W * .59; x < W; x += 140) { c.fillStyle = 'rgba(80,66,50,.35)'; c.fillRect(x + 40, wy(x) - 30, 8, 14); }
    for (const tx of [W * .6, W * .7, W * .8, W * .92]) { const ty = wy(tx); c.fillStyle = '#cfc2a0'; c.fillRect(tx - 26, ty - 110, 52, 110); c.fillStyle = 'rgba(70,58,44,.3)'; c.fillRect(tx + 6, ty - 110, 20, 110); c.fillStyle = '#5a3a2a'; c.beginPath(); c.moveTo(tx - 32, ty - 110); c.lineTo(tx, ty - 170); c.lineTo(tx + 32, ty - 110); c.fill(); c.fillStyle = '#2a2a2a'; c.fillRect(tx - 5, ty - 84, 10, 18); }
    // cathedral with two dark towers and green trees between roofs
    { const cx = W * .7, cy = wy(W * .7) - 48; c.fillStyle = '#e6dcc4'; c.fillRect(cx - 80, cy - 90, 160, 90); c.fillStyle = '#3a3a38'; c.beginPath(); c.moveTo(cx - 90, cy - 90); c.lineTo(cx, cy - 140); c.lineTo(cx + 90, cy - 90); c.fill(); for (const dx of [-60, 40]) { c.fillStyle = '#e6dcc4'; c.fillRect(cx + dx, cy - 210, 34, 120); c.fillStyle = '#232523'; c.beginPath(); c.moveTo(cx + dx - 6, cy - 210); c.lineTo(cx + dx + 17, cy - 300); c.lineTo(cx + dx + 40, cy - 210); c.fill(); } for (let k = 0; k < 4; k++) { c.fillStyle = '#4a5a6a'; c.fillRect(cx - 60 + k * 36, cy - 64, 12, 26); } }
    for (let k = 0; k < 14; k++) { const x = r.range(W * .6, W * .98), y = wy(x) - 50 - r.range(0, 30), rr = r.range(18, 34); c.fillStyle = rgb(jitter('#4a6a3a', r, 14)); c.beginPath(); c.arc(x, y - rr, rr, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.arc(x - rr * .3, y - rr * 1.3, rr * .45, 0, 7); c.fill(); }
    for (let k = 0; k < 16; k++) { const x = W * .6 + k * 60 + 14, y = hz - 150 - (k % 3) * 8 - 34; c.fillStyle = '#4a5a6a'; c.fillRect(x, y, 10, 12); c.fillRect(x + 22, y, 10, 12); }
    // moored boats and bollards along the harbour wall
    for (let k = 0; k < 4; k++) { const x = W * .24 + k * 220, y = H * .7 + 64; c.fillStyle = k % 2 ? '#e8e4da' : '#3a5a7a'; c.beginPath(); c.moveTo(x - 70, y - 22); c.lineTo(x + 70, y - 22); c.lineTo(x + 50, y); c.lineTo(x - 56, y); c.closePath(); c.fill(); c.fillStyle = '#f0ece2'; c.fillRect(x - 20, y - 46, 40, 24); c.strokeStyle = '#3a3a3a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 30, y - 22); c.lineTo(x + 30, y - 110); c.stroke(); c.beginPath(); c.moveTo(x - 60, y - 20); c.lineTo(x - 70, y - 40); c.stroke(); }
    for (let x = W * .2; x < W * .68; x += 110) { c.fillStyle = '#2e2e2c'; c.fillRect(x, H * .7 - 14, 14, 16); }
    ENV.birds(c, r, W * .2, W * .7, H * .08, H * .22, 8, '#2a2a2a', 1); FIN(c, r, W, H, .38); };

  // Modern airbase: hardened shelters, a long runway, control tower, a cold low sun.
  ENV.airbase = (ctx, r, W, H) => { const c = ctx, hz = H * .55; M.sky(c, r, W, hz, '#6a7a94', '#e4dcd0', { strokes: 1400 }); ENV.clouds(c, r, W, 0, H * .3, 9, '#f0ece4', '#b8b6b0', '#7a7c82');
    M.distantTrees(c, r, W, hz, 140, '#4a5a4a', { scale: .8 });
    for (let k = 0; k < 4; k++) { const x = W * .05 + k * 330, w = 280, h = 120; c.fillStyle = rgb(jitter('#7a7e70', r, 6)); c.beginPath(); c.moveTo(x, hz); c.quadraticCurveTo(x + w / 2, hz - h * 1.6, x + w, hz); c.fill(); c.fillStyle = '#1a1c1e'; c.beginPath(); c.moveTo(x + 50, hz); c.quadraticCurveTo(x + w / 2, hz - h, x + w - 50, hz); c.fill(); }
    c.fillStyle = '#d8d8d0'; c.fillRect(W * .82, hz - 260, 50, 260); c.fillStyle = '#2a3a4a'; c.fillRect(W * .82 - 30, hz - 320, 110, 60); c.fillStyle = 'rgba(160,220,255,.5)'; c.fillRect(W * .82 - 24, hz - 312, 98, 30);
    M.ground(c, r, W, H, hz, '#6a7450', '#94966a');
    c.fillStyle = '#4a4c50'; c.beginPath(); c.moveTo(0, H * .7); c.lineTo(W, H * .64); c.lineTo(W, H * .8); c.lineTo(0, H * .92); c.fill();
    c.strokeStyle = 'rgba(240,240,236,.8)'; c.lineWidth = 8; c.setLineDash([80, 70]); c.beginPath(); c.moveTo(0, H * .81); c.lineTo(W, H * .72); c.stroke(); c.setLineDash([]);
    for (let k = 0; k < 30; k++) { c.fillStyle = 'rgba(30,30,30,.2)'; c.fillRect(r.range(0, W), r.range(H * .7, H * .86), r.range(40, 160), 4); }
    M.grassTufts(c, r, W, H * .88, H, 80, ['#7a7a50', '#94906a'], { h: 30 }); FIN(c, r, W, H, .4); };

  // Cold upper sky for jets: bright high cloud deck, deep blue above.
  ENV.coldSky = (ctx, r, W, H) => { const c = ctx; M.sky(c, r, W, H, '#2a4a7a', '#c8d8e8', { strokes: 1800 }); ENV.clouds(c, r, W, H * .55, H * .95, 22, '#ffffff', '#c8d0d8', '#8a96a4', { scale: 1.4 }); ENV.clouds(c, r, W, H * .1, H * .3, 5, '#f0f4f8', '#c0c8d0', '#9aa4b0', { scale: .7 }); FIN(c, r, W, H, .3); };

  // Undersea cross-section: waves on top, dark water, seabed with a cable.
  ENV.seabed = (ctx, r, W, H) => { const c = ctx, sy = H * .18; M.sky(c, r, W, sy, '#3a4450', '#7a848c', { strokes: 600 });
    const g = c.createLinearGradient(0, sy, 0, H); g.addColorStop(0, '#2a5a6a'); g.addColorStop(1, '#06141c'); c.fillStyle = g; c.fillRect(0, sy, W, H - sy);
    c.fillStyle = '#4a6a74'; c.beginPath(); c.moveTo(0, sy); for (let x = 0; x <= W; x += 40) c.lineTo(x, sy + Math.sin(x * .01) * 14); c.lineTo(W, sy + 30); c.lineTo(0, sy + 30); c.fill();
    for (let k = 0; k < 18; k++) { c.fillStyle = 'rgba(160,220,230,.025)'; c.beginPath(); c.moveTo(r.range(0, W), sy); c.lineTo(r.range(0, W), H * .8); c.lineTo(r.range(0, W), H * .8); c.fill(); }
    M.hills(c, r, P.Noise(9), W, H * .86, 40, .003, 2, '#3a3428');
    paintRegion(c, r, [[0, H * .86], [W, H * .84], [W, H], [0, H]], '#4a4232', { density: 900, len: [10, 40], w: [4, 10], ang: 0, angJ: .4, al: .5 });
    for (let k = 0; k < 40; k++) { const x = r.range(0, W), y = r.range(H * .84, H * .9); c.strokeStyle = rgb(jitter('#3a6a4a', r, 10), .7); c.lineWidth = 4; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 10, y - 50, x - 6, y - r.range(60, 120)); c.stroke(); }
    FIN(c, r, W, H, .5); };

  window.PLATES = {
    war_room: (c, r, W, H) => ENV.warRoom(c, r, W, H),
    baltic_border: (c, r, W, H) => ENV.balticBorder(c, r, W, H),
    port_dawn: (c, r, W, H) => ENV.portDawn(c, r, W, H),
    atlantic: (c, r, W, H) => ENV.atlanticStorm(c, r, W, H),
    rail_yard: (c, r, W, H) => ENV.railYard(c, r, W, H),
    farm_corridor: (c, r, W, H) => ENV.farmCorridor(c, r, W, H),
    gotland: (c, r, W, H) => ENV.gotland(c, r, W, H),
    airbase: (c, r, W, H) => ENV.airbase(c, r, W, H),
    cold_sky: (c, r, W, H) => ENV.coldSky(c, r, W, H),
    seabed: (c, r, W, H) => ENV.seabed(c, r, W, H),
    map_atlantic: (c, r, W, H) => ENV.regionMap(c, r, W, H, { view: { lon0: -100, lon1: 20, lat0: 10, lat1: 66 }, grid: 10, compass: [-92, 16], labels: [], mountains: [], rivers: [], greens: [], deserts: [] }),
  };
})(window);
