// Nike painted plates. Paint with: node shared/p2/paint.js nike/production/plates.js nike/production/plates all
// Reused from JPMorgan (copied): kitchen, office, office_day, boardroom, court, bank, trading, skyline, suburb.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, { rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const FIN = (ctx, r, W, H, vig = .4, n = 110000) => { ENV.impasto(ctx, r, W, H, { n, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 6, vig }); };
  const grad = (c, x0, y0, x1, y1, stops) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([t, col]) => g.addColorStop(t, col)); return g; };
  // douglas fir silhouette band
  const firs = (c, r, W, y, n, col, h0 = 160, h1 = 320) => { for (let i = 0; i < n; i++) { const x = r.range(-60, W + 60), h = r.range(h0, h1), w = h * .32; c.fillStyle = rgb(jitter(col, r, 8)); c.beginPath(); c.moveTo(x, y - h); for (let k = 0; k <= 6; k++) { const t = k / 6; c.lineTo(x + w * t * (k % 2 ? .7 : 1), y - h + h * t); } for (let k = 6; k >= 0; k--) { const t = k / 6; c.lineTo(x - w * t * (k % 2 ? .7 : 1), y - h + h * t); } c.closePath(); c.fill(); } };
  // a stand of spectators: rows of tiny painted heads and shirts
  const crowd = (c, r, x0, x1, y0, rows, step, cols) => { for (let j = 0; j < rows; j++) for (let x = x0 + (j % 2) * step / 2; x < x1; x += step * r.range(.85, 1.15)) { const y = y0 + j * step * 1.05, s = step * .32; c.fillStyle = rgb(jitter(cols[r.int(0, cols.length - 1)], r, 14)); c.fillRect(x - s * .9, y, s * 1.8, s * 1.6); c.fillStyle = rgb(jitter(r() < .5 ? '#e8c8a8' : '#b8865a', r, 10)); c.beginPath(); c.arc(x, y - s * .2, s * .62, 0, 7); c.fill(); } };

  // Rainy 1950s/60s Oregon cinder track: dark firs, grey sky, wooden bleacher, puddles. o.sun = sunny trials day with a full stand.
  ENV.oregonTrack = (ctx, r, W, H, o = {}) => {
    const sun = o.sun, hz = H * .5, rr = P.RNG(r.int(1, 1e6));
    M.sky(ctx, r, W, hz + 40, sun ? '#6aa0d8' : '#6a7480', sun ? '#e8f0f0' : '#b8c0c4', { strokes: 2400 });
    if (sun) ENV.clouds(ctx, r, W, H * .05, H * .25, 8, '#ffffff', '#e0e8f0', '#b0c0d0'); else ENV.clouds(ctx, r, W, 0, H * .3, 20, '#9aa4ac', '#7a848c', '#5a646c');
    M.hills(ctx, rr, P.Noise(7), W, hz - 60, 60, .0016, 3, sun ? '#5a7a6a' : '#4a5a58', { density: 400 });
    firs(ctx, rr, W, hz + 10, 90, sun ? '#2a4a34' : '#1e3228', 140, 300);
    // grandstand (left) with roof
    { const x0 = 80, x1 = 1180, yb = hz + 120; ctx.fillStyle = '#5a4434'; poly(ctx, [[x0, yb], [x1, yb], [x1 - 40, yb - 230], [x0 + 40, yb - 230]]); ctx.fill();
      for (let k = 0; k < 7; k++) { const y = yb - k * 32; ctx.fillStyle = rgb(shade('#8a6a4a', k % 2 ? -.1 : .05)); ctx.fillRect(x0 + k * 6, y - 14, x1 - x0 - k * 12, 14); }
      if (sun) crowd(ctx, rr, x0 + 40, x1 - 40, yb - 230, 7, 30, ['#c83a2a', '#2a5a9a', '#e8e0d0', '#e8a830', '#3a7a4a']); else crowd(ctx, rr, x0 + 200, x0 + 520, yb - 120, 3, 34, ['#3a4a5a', '#5a4a3a', '#2a3a4a']);
      ctx.fillStyle = '#3a2e26'; poly(ctx, [[x0 - 20, yb - 250], [x1 + 20, yb - 250], [x1 - 10, yb - 300], [x0 + 10, yb - 300]]); ctx.fill(); for (let x = x0 + 40; x < x1; x += 180) { ctx.fillStyle = '#2a201a'; ctx.fillRect(x, yb - 250, 12, 250); } }
    // infield grass, then the cinder track sweeping across the foreground
    M.ground(ctx, r, W, H, hz + 120, sun ? '#5a8a44' : '#3e5e3a', sun ? '#7aa25a' : '#56724a', {});
    const lane = (y, a) => y + (1 - a) * 0; const ty0 = H * .66, ty1 = H * 1.02;
    paintRegion(ctx, rr, [[-50, ty0 + 30], [W + 50, ty0 - 30], [W + 50, ty1], [-50, ty1]], sun ? '#b05a3a' : '#7a4434', { density: 900, len: [20, 70], w: [4, 10], ang: 0, angJ: .1, al: .35 });
    for (let k = 0; k < 2600; k++) { const x = rr.range(0, W), t = rr(), y = ty0 + (ty1 - ty0) * t - (x / W - .5) * 60 * (1 - t); ctx.fillStyle = rr() < .5 ? 'rgba(40,20,14,.35)' : 'rgba(220,150,110,.25)'; ctx.fillRect(x, y, 2 + t * 4, 2 + t * 3); }
    ctx.strokeStyle = 'rgba(245,240,230,.75)'; for (let i = 0; i < 6; i++) { const t = i / 5, y = ty0 + 8 + (ty1 - ty0 - 20) * t; ctx.lineWidth = 3 + t * 6; ctx.beginPath(); ctx.moveTo(-50, y + 30 - t * 30 + 30 * (1 - t)); ctx.lineTo(W + 50, y - 30 + t * 30 - 30 * (1 - t) + 60 * (1 - t)); ctx.stroke(); }
    
    if (!sun) { for (let k = 0; k < 9; k++) { const x = rr.range(100, W - 200), y = rr.range(ty0 + 60, H - 40), w = rr.range(120, 320); ctx.fillStyle = 'rgba(150,165,180,.35)'; ctx.beginPath(); ctx.ellipse(x, y, w, w * .12, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(230,240,250,.2)'; ctx.beginPath(); ctx.ellipse(x - w * .2, y - 2, w * .4, w * .03, 0, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(90,100,110,.16)'; ctx.fillRect(0, 0, W, H); }
    else { glow(ctx, W * .8, H * .1, 900, '#fff0c8', .25); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fillRect(1560, hz - 40, 560, 110); ctx.fillStyle = '#1a3a6a'; ctx.font = '64px Anton'; ctx.textAlign = 'center'; ctx.fillText('U.S. OLYMPIC TRIALS', 1840, hz + 36); ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 5; ctx.strokeRect(1560, hz - 40, 560, 110); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(1640, hz + 70, 14, 60); ctx.fillRect(2020, hz + 70, 14, 60); }
    FIN(ctx, r, W, H, .4);
  };

  // Bowerman's workshop: a cluttered garage bench of lasts, soles, leather, glue pots, a hanging bulb.
  ENV.workshop = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 11, RH: 3.6, ch: 1.5, zf: 7, f: 1700, hor: .46 });
    R.shell({ back: '#8a7a64', side: '#7a6a56', ceil: '#6a5a48', floor: '#6a6460', planks: false });
    // pegboard with tools and leather offcuts on the back wall
    { const [x0, y0] = R.p(-4.4, 3.1, 7), [x1, y1] = R.p(1.2, 1.25, 7); ctx.fillStyle = '#b89a6a'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.fillStyle = 'rgba(60,40,20,.5)'; for (let x = x0 + 14; x < x1; x += 28) for (let y = y0 + 14; y < y1; y += 28) ctx.fillRect(x, y, 4, 4);
      const rr = P.RNG(11); for (let k = 0; k < 14; k++) { const x = x0 + 40 + k * (x1 - x0 - 80) / 14, y = y0 + 40 + (k % 3) * 70; if (k % 3 === 0) { ctx.fillStyle = rgb(jitter('#6a4a2a', rr, 20)); ctx.beginPath(); ctx.ellipse(x, y + 60, 44, 70, rr.range(-.3, .3), 0, 7); ctx.fill(); } else { ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rr.range(-10, 10), y + 120); ctx.stroke(); ctx.fillStyle = '#9a5a2a'; ctx.fillRect(x - 10, y - 30, 20, 40); } } }
    // small window with Oregon rain
    { const [x0, y0] = R.p(2, 3.0, 7), [x1, y1] = R.p(4.4, 1.5, 7); ctx.fillStyle = grad(ctx, 0, y0, 0, y1, [[0, '#8a98a4'], [1, '#c8d0d4']]); ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip(); firs(ctx, P.RNG(4), W, y1, 60, '#3a4a44', 60, 120); ctx.restore(); ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 14; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo((x0 + x1) / 2, y0); ctx.lineTo((x0 + x1) / 2, y1); ctx.moveTo(x0, (y0 + y1) / 2); ctx.lineTo(x1, (y0 + y1) / 2); ctx.stroke(); ctx.strokeStyle = 'rgba(220,230,240,.4)'; ctx.lineWidth = 2; for (let k = 0; k < 30; k++) { const x = x0 + (k * 37) % (x1 - x0); ctx.beginPath(); ctx.moveTo(x, y0 + (k * 53) % (y1 - y0)); ctx.lineTo(x - 4, y0 + (k * 53) % (y1 - y0) + 24); ctx.stroke(); } }
    // long workbench across the back
    R.box(-5, 0, 5.4, 9.4, .9, 1.1, '#7a5634', { density: 80 }); R.box(-5.05, .9, 5.35, 9.5, .07, 1.2, '#a07a4a', { density: 40 });
    const top = (x, z) => R.p(x, .97, z), rr = P.RNG(23);
    // shoe lasts, soles, glue pots, a cobbler's hammer on the bench
    for (let k = 0; k < 9; k++) { const x = -4.4 + k * 1.0, [px, py] = top(x, 5.7), s = R.s(5.7);
      if (k % 3 === 0) { ctx.fillStyle = '#c8a070'; ctx.beginPath(); ctx.ellipse(px, py - .12 * s, .32 * s, .12 * s, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#3a2614'; ctx.lineWidth = 3; ctx.stroke(); }
      else if (k % 3 === 1) { ctx.fillStyle = '#2a2a2a'; ctx.beginPath(); ctx.ellipse(px, py - .03 * s, .34 * s, .06 * s, .1, 0, 7); ctx.fill(); ctx.fillStyle = '#6a4a2a'; ctx.beginPath(); ctx.moveTo(px - .3 * s, py - .05 * s); ctx.quadraticCurveTo(px - .1 * s, py - .32 * s, px + .32 * s, py - .07 * s); ctx.closePath(); ctx.fill(); }
      else { ctx.fillStyle = '#8a8a8a'; ctx.fillRect(px - .08 * s, py - .2 * s, .16 * s, .2 * s); ctx.fillStyle = '#e8d070'; ctx.fillRect(px - .08 * s, py - .2 * s, .16 * s, .04 * s); } }
    // shelves of shoe boxes on the left wall side
    for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) R.box(-5.4, .2 + j * .7, 2.4 + k * .9, .5, .45, .75, ['#c8a070', '#e8e0d0', '#b88a5a'][(j + k) % 3], { density: 30 });
    // hanging bulb + warm light
    { const [bx, by] = R.p(.4, 2.5, 4.5); ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, 0); ctx.lineTo(bx, by); ctx.stroke(); ctx.fillStyle = '#fff2c0'; ctx.beginPath(); ctx.arc(bx, by + 18, 22, 0, 7); ctx.fill(); glow(ctx, bx, by + 20, 900, '#ffd890', .4); }
    // scraps on the floor
    for (let k = 0; k < 40; k++) { const [px, py] = R.p(rr.range(-4.5, 4.5), 0, rr.range(2.2, 5)), s = R.s(3); ctx.fillStyle = rgb(jitter(['#6a4a2a', '#c8b090', '#2a2a2a'][k % 3], rr, 15)); ctx.beginPath(); ctx.ellipse(px, py, rr.range(.05, .14) * s, rr.range(.02, .05) * s, rr(), 0, 7); ctx.fill(); }
    FIN(ctx, r, W, H, .45);
  };

  // Onitsuka's Kobe office, 1962: paper screens, low lacquer table, a shelf of Tiger shoes, a city view.
  ENV.kobeOffice = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 12, RH: 3.4, ch: 1.45, zf: 7.5, f: 1750, hor: .45 });
    R.shell({ back: '#e8dcc0', side: '#d8c8a8', ceil: '#c8b48c', floor: '#b8a070', planks: true, skirting: '#4a3220' });
    // shoji screens across the back wall
    { const [x0, y0] = R.p(-5.6, 3.2, 7.5), [x1, y1] = R.p(5.6, .1, 7.5); for (let i = 0; i < 6; i++) { const a = x0 + i * (x1 - x0) / 6, b = a + (x1 - x0) / 6; ctx.fillStyle = i === 2 || i === 3 ? '#f8f0dc' : '#efe4c8'; ctx.fillRect(a, y0, b - a, y1 - y0); ctx.strokeStyle = '#4a3220'; ctx.lineWidth = 3; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(a + k * (b - a) / 4, y0); ctx.lineTo(a + k * (b - a) / 4, y1); ctx.stroke(); } for (let k = 1; k < 8; k++) { ctx.beginPath(); ctx.moveTo(a, y0 + k * (y1 - y0) / 8); ctx.lineTo(b, y0 + k * (y1 - y0) / 8); ctx.stroke(); } ctx.lineWidth = 10; ctx.strokeRect(a, y0, b - a, y1 - y0); }
      glow(ctx, (x0 + x1) / 2, (y0 + y1) / 2, 900, '#fff4d8', .3); }
    // window on the right side showing 1960s Kobe harbour
    { const [x0, y0] = R.p(5.95, 3.0, 3), [x1, y1] = R.p(5.95, 1.0, 5.6); ctx.fillStyle = grad(ctx, 0, y0, 0, y1, [[0, '#8ab4d8'], [1, '#e8e8d8']]); poly(ctx, [[x0, y0], [x1, R.p(5.95, 3.0, 5.6)[1]], [x1, y1], [x0, R.p(5.95, 1.0, 3)[1]]]); ctx.fill(); ctx.strokeStyle = '#4a3220'; ctx.lineWidth = 12; ctx.stroke(); }
    // shelf of Tiger shoes on the left side
    for (let j = 0; j < 3; j++) { R.box(-5.9, .5 + j * .75, 2.6, .5, .06, 3.6, '#5a3a22', { density: 20 }); for (let k = 0; k < 6; k++) { const [px, py] = R.p(-5.6, .56 + j * .75, 2.9 + k * .55), s = R.s(2.9 + k * .55); ctx.fillStyle = k % 2 ? '#f0e8d8' : '#e8d8b8'; ctx.beginPath(); ctx.moveTo(px - .2 * s, py); ctx.quadraticCurveTo(px - .15 * s, py - .2 * s, px + .05 * s, py - .2 * s); ctx.lineTo(px + .25 * s, py - .05 * s); ctx.lineTo(px + .25 * s, py); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = '#c83a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - .1 * s, py - .05 * s); ctx.lineTo(px + .05 * s, py - .15 * s); ctx.lineTo(px + .15 * s, py - .05 * s); ctx.stroke(); } }
    // low lacquer meeting table and floor cushions
    R.box(-2.2, 0, 4.2, 4.4, .42, 1.6, '#3a1a14', { density: 60, lit: .05 }); R.box(-2.25, .42, 4.15, 4.5, .05, 1.7, '#5a2a1e', { density: 30 });
    for (const x of [-1.8, -.2, 1.4]) { const [px, py] = R.p(x + .3, .47, 4.9), s = R.s(4.9); ctx.fillStyle = '#f4efe2'; ctx.fillRect(px - .1 * s, py - .02 * s, .22 * s, .02 * s); ctx.fillStyle = '#e8e0c8'; ctx.beginPath(); ctx.ellipse(px + .2 * s, py - .06 * s, .05 * s, .06 * s, 0, 0, 7); ctx.fill(); }
    // calligraphy scroll and a company sign
    { const [sx, sy] = R.p(-.4, 3.0, 7.45); ctx.fillStyle = '#f8f4e8'; ctx.fillRect(sx - 60, sy, 120, 300); ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 6; ctx.strokeRect(sx - 60, sy, 120, 300); ctx.fillStyle = '#1a1a1a'; ctx.font = '70px SourceSerif, serif'; ctx.textAlign = 'center'; ctx.fillText('虎', sx, sy + 110); ctx.fillText('道', sx, sy + 210); }
    PR.plant(ctx, r, ...R.p(4.6, 0, 6.6), R.s(6.6) * .9);
    FIN(ctx, r, W, H, .35);
  };

  // A big 1980s basketball arena: hardwood, key paint, packed stands under spotlights.
  ENV.arena = (ctx, r, W, H) => {
    const rr = P.RNG(r.int(1, 1e6)); ctx.fillStyle = '#0e0c14'; ctx.fillRect(0, 0, W, H);
    // tiers of crowd, darker toward the roof
    for (let j = 0; j < 4; j++) { const y0 = 120 + j * 150; ctx.fillStyle = rgb(shade('#2a2030', -j * .1)); ctx.fillRect(0, y0, W, 150); crowd(ctx, rr, -20, W + 20, y0 + 20, 4, 30 - j * 3, ['#c8202a', '#e8e0d0', '#2a2a2a', '#d8a030', '#3a5a9a']); ctx.fillStyle = 'rgba(10,8,14,' + (.5 - j * .1) + ')'; ctx.fillRect(0, y0, W, 150); }
    ctx.fillStyle = '#c8202a'; ctx.fillRect(0, 720, W, 30); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(0, 750, W, 10);
    // hardwood floor in perspective
    const fy = 760; paintRegion(ctx, rr, [[0, fy], [W, fy], [W, H], [0, H]], '#c8904a', { density: 900, len: [40, 120], w: [4, 10], ang: 0, angJ: .04, al: .3 });
    ctx.strokeStyle = 'rgba(90,50,20,.3)'; ctx.lineWidth = 2; for (let x = -2000; x < W + 2000; x += 70) { ctx.beginPath(); ctx.moveTo(W / 2 + (x - W / 2) * .35, fy); ctx.lineTo(x, H); ctx.stroke(); }
    // key + court lines
    ctx.fillStyle = 'rgba(200,32,42,.85)'; poly(ctx, [[W / 2 - 220, fy + 10], [W / 2 + 220, fy + 10], [W / 2 + 420, H], [W / 2 - 420, H]]); ctx.fill();
    ctx.strokeStyle = '#f8f4ec'; ctx.lineWidth = 8; ctx.stroke(); ctx.beginPath(); ctx.ellipse(W / 2, fy + 230, 330, 70, 0, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, fy + 8); ctx.lineTo(W, fy + 8); ctx.stroke();
    // backboard + hoop on the far end
    ctx.fillStyle = 'rgba(230,240,250,.55)'; ctx.fillRect(W / 2 - 150, 380, 300, 190); ctx.strokeStyle = '#f8f4ec'; ctx.lineWidth = 6; ctx.strokeRect(W / 2 - 150, 380, 300, 190); ctx.strokeRect(W / 2 - 55, 470, 110, 80); ctx.strokeStyle = '#ff6a1a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(W / 2, 570, 60, 14, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; for (let k = -4; k <= 4; k++) { ctx.beginPath(); ctx.moveTo(W / 2 + k * 14, 572); ctx.lineTo(W / 2 + k * 9, 640); ctx.stroke(); }
    ctx.fillStyle = '#2a2a2a'; ctx.fillRect(W / 2 - 10, 0, 20, 380);
    // spotlights and floor sheen
    for (const x of [500, 1280, 2060]) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = grad(ctx, 0, 0, 0, H, [[0, 'rgba(255,250,230,.28)'], [1, 'rgba(255,250,230,0)']]); poly(ctx, [[x - 30, 0], [x + 30, 0], [x + 380, H], [x - 380, H]]); ctx.fill(); ctx.restore(); }
    glow(ctx, W / 2, fy + 300, 1200, '#fff0d0', .18);
    FIN(ctx, r, W, H, .5);
  };

  // A dim 1990s shoe factory: long rows of sewing tables under strip lights.
  ENV.factory = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 16, RH: 4.6, ch: 1.6, zf: 16, f: 1500, hor: .42 });
    R.shell({ back: '#7a7a6e', side: '#6e6e62', ceil: '#5a5a52', floor: '#6a6458', planks: false });
    for (let z = 15; z > 2.6; z -= 1.6) for (const x of [-6.4, -2.6, 1.0, 4.8]) { R.box(x, 0, z, 2.2, .76, .7, '#8a7a5a', { density: 30 }); const [px, py] = R.p(x + 1.1, .76, z + .35), s = R.s(z + .35);
      ctx.fillStyle = '#2a3a3a'; ctx.fillRect(px - .25 * s, py - .3 * s, .5 * s, .3 * s); ctx.fillRect(px + .15 * s, py - .5 * s, .1 * s, .25 * s); ctx.fillStyle = 'rgba(240,236,220,.85)'; ctx.fillRect(px - .7 * s, py - .05 * s, .3 * s, .05 * s); ctx.fillStyle = '#e8e0d0'; ctx.beginPath(); ctx.ellipse(px + .55 * s, py - .05 * s, .18 * s, .06 * s, 0, 0, 7); ctx.fill(); }
    for (let z = 2.5; z < 15; z += 2) for (const x of [-4, 0, 4]) { const [lx, ly] = R.p(x, 4.2, z); ctx.fillStyle = '#f0f4e8'; ctx.fillRect(lx - 120 * 3 / z, ly, 240 * 3 / z, 10 * 3 / z); glow(ctx, lx, ly + 8, 220 * 3 / z, '#e8f0d8', .2); }
    // high windows with bars
    for (let i = 0; i < 6; i++) { const [x0, y0] = R.p(-7 + i * 2.5, 4.3, 16), [x1, y1] = R.p(-5.6 + i * 2.5, 3.5, 16); ctx.fillStyle = '#b8c8c0'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0); ctx.strokeStyle = '#3a3a34'; ctx.lineWidth = 3; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x0 + k * (x1 - x0) / 4, y0); ctx.lineTo(x0 + k * (x1 - x0) / 4, y1); ctx.stroke(); } }
    ctx.fillStyle = 'rgba(40,46,30,.22)'; ctx.fillRect(0, 0, W, H);
    FIN(ctx, r, W, H, .5);
  };

  // Nike's glassy Beaverton campus: lake, lawns, low glass buildings, firs. o.dusk for evening.
  ENV.campus = (ctx, r, W, H, o = {}) => {
    const rr = P.RNG(r.int(1, 1e6)), hz = H * .52, dusk = o.dusk;
    M.sky(ctx, r, W, hz + 40, dusk ? '#3a4a7a' : '#7ab0e0', dusk ? '#f0a070' : '#e8f0f4', { strokes: 2400 }); ENV.clouds(ctx, r, W, H * .05, H * .3, 10, dusk ? '#f8c8a0' : '#ffffff', dusk ? '#c08080' : '#e0e8f0', dusk ? '#6a5a7a' : '#a8b8c8');
    firs(ctx, rr, W, hz + 20, 70, dusk ? '#1e2e2a' : '#2a4a38', 160, 340);
    // low glass buildings with dark frames
    for (const [x, w, h] of [[160, 760, 300], [1000, 620, 380], [1700, 720, 280]]) { const y = hz + 60 - h; ctx.fillStyle = grad(ctx, x, y, x + w, y + h, [[0, dusk ? '#7a8ab0' : '#a8d0e8'], [.5, dusk ? '#f0b890' : '#e8f4fa'], [1, dusk ? '#4a5a80' : '#6a98b8']]); ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#2a3238'; ctx.lineWidth = 6; ctx.strokeRect(x, y, w, h); ctx.lineWidth = 3; for (let xx = x + 60; xx < x + w; xx += 60) { ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke(); } for (let yy = y + 70; yy < y + h; yy += 70) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke(); }
      ctx.fillStyle = '#d8d8d0'; ctx.fillRect(x - 20, y - 22, w + 40, 22); if (dusk) for (let k = 0; k < 10; k++) { ctx.fillStyle = 'rgba(255,220,150,.6)'; ctx.fillRect(x + rr.range(10, w - 60), y + rr.range(20, h - 60), 50, 60); } }
    // lawn and lake
    M.ground(ctx, r, W, H, hz + 60, dusk ? '#3a5a34' : '#5a8a3e', dusk ? '#4a6a40' : '#7aa24e', {});
    { const ly = hz + 200; ctx.fillStyle = grad(ctx, 0, ly, 0, H * .86, [[0, dusk ? '#6a6a90' : '#8ab8d8'], [1, dusk ? '#2a3050' : '#3a6a8a']]); ctx.beginPath(); ctx.ellipse(W * .62, ly + 180, 900, 170, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 3; for (let k = 0; k < 14; k++) { const x = W * .62 + rr.range(-700, 700), y = ly + 120 + rr.range(0, 120); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + rr.range(40, 140), y); ctx.stroke(); } }
    // a footpath and a big swoosh-free sign plinth
    paintRegion(ctx, rr, [[200, H], [520, hz + 120], [600, hz + 120], [520, H]], '#c8c0b0', { density: 200 });
    ctx.fillStyle = '#e8e4dc'; ctx.fillRect(820, hz + 120, 480, 90); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 5; ctx.strokeRect(820, hz + 120, 480, 90); ctx.fillStyle = '#2a2a2a'; ctx.font = '54px Anton'; ctx.textAlign = 'center'; ctx.fillText('WORLD HEADQUARTERS', 1060, hz + 185);
    [[120, H * .9], [2300, H * .88], [1500, H * .95]].forEach(([x, y]) => M.bush(ctx, rr, x, y, 320, 160, dusk ? '#2a4a2a' : '#3a6a34', dusk ? '#4a6a40' : '#6a9a50'));
    FIN(ctx, r, W, H, .38);
  };

  // A sports shoe shop: a lit wall of shoes on shelves, a bench, shop window. o.rivals adds rival-brand stripes.
  ENV.shoeShop = (ctx, r, W, H) => {
    const R = new ENV.Room(ctx, r, W, H, { RW: 12, RH: 3.8, ch: 1.5, zf: 7, f: 1700, hor: .45 });
    R.shell({ back: '#e8e4dc', side: '#d8d4cc', ceil: '#f0eee8', floor: '#8a7a6a', planks: true, skirting: '#3a3a3a' });
    const rr = P.RNG(99), cols = ['#e8e0d0', '#2a2a2a', '#c83a2a', '#3a6aa8', '#f0b030', '#5a9a5a', '#d8d0c0'];
    // the shoe wall: rows of angled shelves with shoes
    for (let j = 0; j < 5; j++) for (let i = 0; i < 9; i++) { const x = -5 + i * 1.1, y = .5 + j * .6, [px, py] = R.p(x + .4, y, 7), s = R.s(7); ctx.fillStyle = '#c8c4bc'; ctx.fillRect(px - .4 * s, py, .8 * s, .04 * s);
      const col = cols[rr.int(0, cols.length - 1)]; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px - .3 * s, py); ctx.quadraticCurveTo(px - .28 * s, py - .22 * s, px - .02 * s, py - .24 * s); ctx.lineTo(px + .1 * s, py - .12 * s); ctx.quadraticCurveTo(px + .3 * s, py - .1 * s, px + .32 * s, py); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#f8f8f4'; ctx.fillRect(px - .3 * s, py - .04 * s, .62 * s, .04 * s);
      glow(ctx, px, py - .15 * s, .5 * s, '#fff8e8', .08); }
    // shop window on the right side looking onto a street
    { const a = R.p(5.95, 3.2, 2.8), b = R.p(5.95, 3.2, 5.8), c2 = R.p(5.95, .2, 5.8), d = R.p(5.95, .2, 2.8); ctx.fillStyle = grad(ctx, 0, a[1], 0, d[1], [[0, '#a8c8e0'], [1, '#e0e4e0']]); poly(ctx, [a, b, c2, d]); ctx.fill(); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 10; ctx.stroke(); }
    // fitting bench + stool + mirror
    R.box(-2.4, 0, 3.4, 3.2, .45, .8, '#4a5a6a', { density: 40 }); R.box(-2.45, .45, 3.35, 3.3, .08, .9, '#5a6a7a', { density: 20 });
    { const [mx, my] = R.p(-5.9, 2.2, 4.4), s = R.s(4.4); ctx.fillStyle = grad(ctx, mx, my, mx + .6 * s, my + 1.6 * s, [[0, '#e8f0f4'], [1, '#a8b8c0']]); ctx.fillRect(mx, my, .5 * s, 1.6 * s); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 6; ctx.strokeRect(mx, my, .5 * s, 1.6 * s); }
    for (const z of [3, 5.4]) for (const x of [-2.5, 2.5]) PR.pendant(ctx, r, ...R.p(x, 3.0, z), R.s(z), { top: R.p(x, 3.8, z)[1] });
    FIN(ctx, r, W, H, .3);
  };

  // A 1960s/70s American park with a jogging path, big trees and a pond.
  ENV.park = (ctx, r, W, H) => {
    const rr = P.RNG(r.int(1, 1e6)), hz = H * .5;
    M.sky(ctx, r, W, hz + 40, '#7ab0e0', '#f0f0e0', { strokes: 2400 }); ENV.clouds(ctx, r, W, H * .05, H * .3, 10, '#ffffff', '#e8eef4', '#b8c4d0');
    for (let k = 0; k < 160; k++) { const x = rr.range(-40, W + 40), rad = rr.range(26, 60); ctx.fillStyle = rgb(jitter(k % 2 ? '#4a7a44' : '#3e6a3a', rr, 10)); ctx.beginPath(); ctx.arc(x, hz + 40 - rad * .6, rad, 0, 7); ctx.fill(); }
    M.ground(ctx, r, W, H, hz + 40, '#5a8a3a', '#82aa52', {});
    ctx.fillStyle = grad(ctx, 0, hz + 120, 0, hz + 260, [[0, '#9ac0d8'], [1, '#5a88a8']]); ctx.beginPath(); ctx.ellipse(W * .78, hz + 170, 420, 70, 0, 0, 7); ctx.fill();
    // winding asphalt path through the park
    const path = []; for (let k = 0; k <= 30; k++) { const t = k / 30; path.push([W * (.0 + 1.0 * t), hz + 90 + Math.sin(t * 3.2) * 40 + t * t * 500]); }
    ctx.strokeStyle = '#b8b0a0'; ctx.lineCap = 'round'; ctx.lineWidth = 120; ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); ctx.strokeStyle = '#d0c8b8'; ctx.lineWidth = 90; ctx.stroke();
    // a few big round deciduous trees with benches
    for (const [x, y, s] of [[260, hz + 300, 1.4], [1180, hz + 120, .8], [2250, hz + 360, 1.5]]) { ctx.fillStyle = '#4a3420'; ctx.fillRect(x - 18 * s, y - 260 * s, 36 * s, 260 * s); for (let k = 0; k < 9; k++) { ctx.fillStyle = rgb(jitter(k % 2 ? '#3a6a30' : '#4e8040', rr, 10)); ctx.beginPath(); ctx.arc(x + rr.range(-130, 130) * s, y - 300 * s + rr.range(-90, 70) * s, rr.range(80, 130) * s, 0, 7); ctx.fill(); } M.contactShadow(ctx, x + 40 * s, y + 4, 180 * s, 26 * s, .35); }
    { const bx = 1600, by = hz + 230; ctx.fillStyle = '#6a4a2a'; ctx.fillRect(bx, by - 60, 220, 16); ctx.fillRect(bx, by - 30, 220, 14); ctx.fillStyle = '#2a2a2a'; ctx.fillRect(bx + 10, by - 44, 10, 44); ctx.fillRect(bx + 200, by - 44, 10, 44); }
    glow(ctx, W * .85, H * .1, 900, '#fff4d0', .25);
    FIN(ctx, r, W, H, .35);
  };
})(window);

window.PLATES = {
  track_rain: (c, r, W, H) => ENV.oregonTrack(c, r, W, H),
  track_trials: (c, r, W, H) => ENV.oregonTrack(c, r, W, H, { sun: true }),
  workshop: (c, r, W, H) => ENV.workshop(c, r, W, H),
  kobe_office: (c, r, W, H) => ENV.kobeOffice(c, r, W, H),
  arena: (c, r, W, H) => ENV.arena(c, r, W, H),
  factory: (c, r, W, H) => ENV.factory(c, r, W, H),
  campus: (c, r, W, H) => ENV.campus(c, r, W, H),
  campus_dusk: (c, r, W, H) => ENV.campus(c, r, W, H, { dusk: true }),
  shoe_shop: (c, r, W, H) => ENV.shoeShop(c, r, W, H),
  park: (c, r, W, H) => ENV.park(c, r, W, H),
};
