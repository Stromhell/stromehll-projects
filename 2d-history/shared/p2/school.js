// Rural Kentucky boarding school (exterior) and a 1970s dorm washroom (interior).
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV;
  const { rgb, jitter, shade, glow, paintRegion } = P;

  function tree(c, r, x, y, s, cols) { c.fillStyle = 'rgba(30,40,20,.25)'; c.beginPath(); c.ellipse(x + 30 * s, y + 4, 150 * s, 20 * s, 0, 0, 7); c.fill();
    c.fillStyle = '#4a3020'; c.beginPath(); c.moveTo(x - 16 * s, y); c.lineTo(x - 9 * s, y - 220 * s); c.lineTo(x + 9 * s, y - 220 * s); c.lineTo(x + 16 * s, y); c.fill();
    for (let k = 0; k < 70; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 150 * s, bx = x + Math.cos(a) * d * 1.1, by = y - 310 * s + Math.sin(a) * d * .85, rr = r.range(28, 58) * s;
      const col = jitter(cols[k % cols.length], r, 14); const g = c.createRadialGradient(bx - rr * .3, by - rr * .4, 0, bx, by, rr); g.addColorStop(0, rgb(shade(col, .2))); g.addColorStop(1, rgb(shade(col, -.25))); c.fillStyle = g; c.beginPath(); c.arc(bx, by, rr, 0, 7); c.fill(); } }

  // red-brick school hall with white porch columns; sign board left blank (text is an overlay)
  function school(c, r, x, y, s) { const w = 1100 * s, h = 520 * s;
    c.fillStyle = 'rgba(30,40,20,.3)'; c.beginPath(); c.ellipse(x + 40 * s, y + 8, w * .6, 34 * s, 0, 0, 7); c.fill();
    // wings
    for (const sx of [-1, 1]) { const wx = x + sx * (w / 2 + 170 * s); paintRegion(c, r, [[wx - 180 * s, y - h * .72], [wx + 180 * s, y - h * .72], [wx + 180 * s, y], [wx - 180 * s, y]], '#9a4632', { density: 140, len: [16, 40], w: [3, 7], ang: 0, angJ: .05, al: .38, topLight: .05, botDark: -.15 });
      c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.strokeRect(wx - 180 * s, y - h * .72, 360 * s, h * .72); c.fillStyle = '#5a3a30'; c.fillRect(wx - 196 * s, y - h * .72 - 20 * s, 392 * s, 22 * s);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const ww = 70 * s, wh = 100 * s, X = wx - 120 * s + i * 170 * s, Y = y - h * .72 + 50 * s + j * 160 * s; c.fillStyle = '#f2ece0'; c.fillRect(X - 6, Y - 6, ww + 12, wh + 12); const g = c.createLinearGradient(X, Y, X, Y + wh); g.addColorStop(0, '#9ab8cc'); g.addColorStop(1, '#4a6478'); c.fillStyle = g; c.fillRect(X, Y, ww, wh); c.strokeStyle = '#f2ece0'; c.lineWidth = 3; c.beginPath(); c.moveTo(X + ww / 2, Y); c.lineTo(X + ww / 2, Y + wh); c.moveTo(X, Y + wh / 2); c.lineTo(X + ww, Y + wh / 2); c.stroke(); } }
    // main block
    paintRegion(c, r, [[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2, y], [x - w / 2, y]], '#a44e36', { density: 260, len: [16, 40], w: [3, 7], ang: 0, angJ: .05, al: .38, topLight: .06, botDark: -.15 });
    c.strokeStyle = 'rgba(70,30,20,.28)'; c.lineWidth = 1.5; for (let yy = y - h + 10; yy < y; yy += 12 * s) { c.beginPath(); c.moveTo(x - w / 2, yy); c.lineTo(x + w / 2, yy); c.stroke(); }
    // roof + cupola
    c.fillStyle = '#3e3a40'; c.beginPath(); c.moveTo(x - w / 2 - 30 * s, y - h); c.lineTo(x - w / 2 + 80 * s, y - h - 120 * s); c.lineTo(x + w / 2 - 80 * s, y - h - 120 * s); c.lineTo(x + w / 2 + 30 * s, y - h); c.closePath(); c.fill(); c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#f2ece0'; c.fillRect(x - 50 * s, y - h - 230 * s, 100 * s, 110 * s); c.strokeRect(x - 50 * s, y - h - 230 * s, 100 * s, 110 * s); c.fillStyle = '#4a6478'; c.fillRect(x - 26 * s, y - h - 210 * s, 52 * s, 70 * s);
    c.fillStyle = '#3e3a40'; c.beginPath(); c.moveTo(x - 66 * s, y - h - 230 * s); c.lineTo(x, y - h - 300 * s); c.lineTo(x + 66 * s, y - h - 230 * s); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c9a25a'; c.fillRect(x - 3, y - h - 340 * s, 6, 44 * s);
    // windows: three floors
    for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) { if (j === 0 && (i === 2 || i === 3)) continue; const ww = 72 * s, wh = 104 * s, X = x - w / 2 + 70 * s + i * 170 * s, Y = y - h + 40 * s + j * 160 * s;
      c.fillStyle = '#f2ece0'; c.fillRect(X - 7, Y - 7, ww + 14, wh + 14); const g = c.createLinearGradient(X, Y, X, Y + wh); g.addColorStop(0, '#a4c0d0'); g.addColorStop(1, '#46607a'); c.fillStyle = g; c.fillRect(X, Y, ww, wh);
      c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.moveTo(X, Y + wh * .6); c.lineTo(X + ww * .5, Y); c.lineTo(X + ww * .7, Y); c.lineTo(X, Y + wh * .9); c.fill(); c.strokeStyle = '#f2ece0'; c.lineWidth = 3; c.beginPath(); c.moveTo(X + ww / 2, Y); c.lineTo(X + ww / 2, Y + wh); c.moveTo(X, Y + wh / 2); c.lineTo(X + ww, Y + wh / 2); c.stroke(); }
    // porch: pediment + 4 columns + steps + doors
    const pw = 380 * s, ph = 300 * s; c.fillStyle = '#f2ece0'; c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - pw / 2 - 20 * s, y - ph); c.lineTo(x, y - ph - 90 * s); c.lineTo(x + pw / 2 + 20 * s, y - ph); c.closePath(); c.fill(); c.stroke();
    c.fillRect(x - pw / 2 - 20 * s, y - ph, pw + 40 * s, 22 * s); c.strokeRect(x - pw / 2 - 20 * s, y - ph, pw + 40 * s, 22 * s);
    c.fillStyle = '#4a2a1c'; c.fillRect(x - 70 * s, y - 190 * s, 140 * s, 190 * s); c.strokeRect(x - 70 * s, y - 190 * s, 140 * s, 190 * s); c.beginPath(); c.moveTo(x, y - 190 * s); c.lineTo(x, y); c.stroke(); c.fillStyle = '#d8b050'; c.beginPath(); c.arc(x - 12 * s, y - 90 * s, 5 * s, 0, 7); c.arc(x + 12 * s, y - 90 * s, 5 * s, 0, 7); c.fill();
    for (let k = 0; k < 4; k++) { const cx = x - pw / 2 + k * pw / 3; const g = c.createLinearGradient(cx - 16 * s, 0, cx + 16 * s, 0); g.addColorStop(0, '#c8c0b0'); g.addColorStop(.4, '#fbf8f0'); g.addColorStop(1, '#b0a898'); c.fillStyle = g; c.fillRect(cx - 16 * s, y - ph + 22 * s, 32 * s, ph - 22 * s); c.strokeStyle = 'rgba(43,30,22,.7)'; c.lineWidth = 2.5; c.strokeRect(cx - 16 * s, y - ph + 22 * s, 32 * s, ph - 22 * s); }
    for (let k = 0; k < 3; k++) { c.fillStyle = ['#d8d0c2', '#ccc4b6', '#c0b8aa'][k]; c.fillRect(x - pw / 2 - 40 * s - k * 16 * s, y + k * 12 * s, pw + 80 * s + k * 32 * s, 12 * s); }
    c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.strokeRect(x - w / 2, y - h, w, h); }

  ENV.kySchool = (ctx, r, W, H) => { const c = ctx, gy = H * .66;
    M.sky(c, r, W, gy, '#8cb8dc', '#f0ece0', { strokes: 2600 }); ENV.clouds(c, r, W, H * .04, H * .28, 9, '#ffffff', '#e8ecf0', '#bcc6d4');
    glow(c, W * .12, H * .08, W * .4, '#fff2cc', .25);
    // rolling Appalachian ridges, far to near
    const ridge = (base, amp, col, seed, al = 1) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= W; x += 20) c.lineTo(x, base - amp * (.55 + .45 * Math.sin(x * .0021 + seed) * Math.cos(x * .0013 + seed * 2))); c.lineTo(W, H); c.closePath(); c.fill(); };
    c.fillStyle = '#9ab0b8'; ridge(gy - 120, 140, '#9fb2b4', 1); ridge(gy - 60, 120, '#8aa088', 2.3); ridge(gy - 10, 90, '#6f8f5a', 4.1);
    for (let i = 0; i < 160; i++) { const x = r() * W, y = gy - r.range(20, 120), rr = r.range(18, 40); c.fillStyle = rgb(jitter(['#5d7f45', '#7a8a3a', '#a06a2a', '#6a8a4a'][i % 4], r, 12), .85); c.beginPath(); c.arc(x, y, rr, 0, 7); c.fill(); }
    // lawn
    paintRegion(c, r, [[0, gy - 10], [W, gy - 10], [W, H], [0, H]], '#6e9a48', { density: 700, len: [10, 30], w: [2, 5], ang: -Math.PI / 2, angJ: .4, al: .45, topLight: .1, botDark: -.15 });
    // school
    school(c, r, W * .5, gy + 60, 1);
    // trees either side (autumn mix)
    tree(c, r, W * .1, gy + 120, 1.1, ['#4a7a3a', '#6a8a3a', '#c07a2a']); tree(c, r, W * .9, gy + 130, 1.15, ['#4a7a3a', '#b8602a', '#7a8a3a']); tree(c, r, W * .2, gy + 70, .7, ['#5a8a3a', '#8a9a3a']); tree(c, r, W * .8, gy + 70, .7, ['#5a8a3a', '#c08a2a']);
    // gravel path widening toward camera
    c.fillStyle = '#cbbfa4'; c.beginPath(); c.moveTo(W * .47, gy + 100); c.lineTo(W * .53, gy + 100); c.lineTo(W * .66, H); c.lineTo(W * .34, H); c.closePath(); c.fill();
    for (let i = 0; i < 900; i++) { const t = r(), y = gy + 100 + t * (H - gy - 100), hw = W * (.03 + .13 * t), x = W * .5 + r.range(-hw, hw); c.fillStyle = `rgba(${r() < .5 ? '120,110,90' : '240,232,214'},.5)`; c.fillRect(x, y, 3 + t * 4, 2 + t * 3); }
    // sign post (blank board, left of the path)
    { const sx = W * .3, sy = gy + 330; c.fillStyle = '#5a3a24'; c.fillRect(sx - 150, sy - 160, 16, 200); c.fillRect(sx + 134, sy - 160, 16, 200); c.fillStyle = '#f0e8d4'; c.strokeStyle = '#2b1e16'; c.lineWidth = 5; c.fillRect(sx - 180, sy - 250, 360, 120); c.strokeRect(sx - 180, sy - 250, 360, 120); c.strokeStyle = '#2f4a3a'; c.lineWidth = 4; c.strokeRect(sx - 168, sy - 238, 336, 96); ENV.kySign = [sx, sy - 190]; }
    // split-rail fence
    for (const [x0, x1] of [[0, W * .28], [W * .72, W]]) { const fy = gy + 250; for (let x = x0; x < x1; x += 120) { c.fillStyle = '#6a4a30'; c.fillRect(x, fy - 70, 12, 80); } c.strokeStyle = '#7a5a3a'; c.lineWidth = 9; c.beginPath(); c.moveTo(x0, fy - 52); c.lineTo(x1, fy - 46); c.moveTo(x0, fy - 22); c.lineTo(x1, fy - 18); c.stroke(); }
    ENV.impasto(c, r, W, H, { n: 90000, edge: 20 }); P.finish(c, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .35 }); };

  // dorm washroom: white tile, green band, three stalls on the left (middle one open with a toilet), two sinks + mirrors on the right, high window
  ENV.dormBath = (ctx, r, W, H) => { const c = ctx;
    const R = new ENV.Room(ctx, r, W, H, { RW: 8, RH: 3, ch: 1.5, zf: 9, f: 1650, hor: .44 });
    R.shell({ back: '#e8e6dc', side: '#e0ddd0', ceil: '#eeece4', floor: '#d6d4cc', planks: false, skirting: '#4a7a6a' });
    // floor tiles
    for (let z = 2; z < 9; z += .35) for (let x = -4; x < 4; x += .35) { if (((Math.round(z / .35) + Math.round(x / .35)) & 1) === 0) continue; const a = R.p(x, 0, z), b = R.p(x + .35, 0, z), d = R.p(x + .35, 0, z + .35), e = R.p(x, 0, z + .35); c.fillStyle = 'rgba(60,90,80,.16)'; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.lineTo(...d); c.lineTo(...e); c.fill(); }
    // wall tile grout (back + sides) and green band
    const grout = (pts) => { c.save(); c.beginPath(); pts.forEach((q, i) => i ? c.lineTo(...q) : c.moveTo(...q)); c.closePath(); c.clip(); c.strokeStyle = 'rgba(120,120,110,.28)'; c.lineWidth = 1.5; c.stroke(); c.restore(); };
    for (let y = .15; y < 3; y += .15) { const a = R.p(-4, y, 9), b = R.p(4, y, 9); c.strokeStyle = 'rgba(120,120,110,.25)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); for (const sx of [-4, 4]) { const p1 = R.p(sx, y, 1.4), p2 = R.p(sx, y, 9); c.beginPath(); c.moveTo(...p1); c.lineTo(...p2); c.stroke(); } }
    for (let x = -4; x <= 4; x += .15) { const a = R.p(x, 0, 9), b = R.p(x, 3, 9); c.strokeStyle = 'rgba(120,120,110,.2)'; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
    for (const [y0, y1] of [[1.2, 1.32]]) { c.fillStyle = 'rgba(60,120,100,.7)'; const a = R.p(-4, y1, 9), b = R.p(4, y0, 9); c.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); for (const sx of [-4, 4]) { const q = [R.p(sx, y1, 1.4), R.p(sx, y1, 9), R.p(sx, y0, 9), R.p(sx, y0, 1.4)]; c.beginPath(); q.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fill(); } }
    // stalls: partitions + doors (left half of the back)
    const SZ = 7.6; // stall fronts
    for (const px of [-4, -2.9, -1.8, -.7]) R.box(px, .15, SZ, .06, 1.95, 9 - SZ, '#7a9a8c', { density: 40, shadow: false });
    // toilet in the middle stall (open), at the back wall
    { const [tx, ty] = R.p(-2.35, 0, 8.7), s = R.s ? R.s(8.7) : 1650 / 8.7; c.fillStyle = '#f6f6f2'; c.strokeStyle = '#2b1e16'; c.lineWidth = 3; c.fillRect(tx - s * .2, ty - s * .82, s * .4, s * .38); c.strokeRect(tx - s * .2, ty - s * .82, s * .4, s * .38); c.beginPath(); c.ellipse(tx, ty - s * .4, s * .22, s * .07, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(tx - s * .17, ty - s * .4); c.quadraticCurveTo(tx - s * .14, ty, tx - s * .08, ty); c.lineTo(tx + s * .08, ty); c.quadraticCurveTo(tx + s * .14, ty, tx + s * .17, ty - s * .4); c.fill(); c.stroke(); }
    // stall doors: left and right ones closed, middle open (swung in, drawn thin)
    for (const [x0, open] of [[-4, false], [-2.9, true], [-1.8, false]]) { if (open) { R.quad([[x0 + .05, 2.1, SZ], [x0 + .05, 2.1, SZ + .9], [x0 + .05, .2, SZ + .9], [x0 + .05, .2, SZ]], '#6f9283', { density: 30, edge: true }); continue; }
      const q = R.quad([[x0 + .06, 2.1, SZ], [x0 + 1.1, 2.1, SZ], [x0 + 1.1, .2, SZ], [x0 + .06, .2, SZ]], '#7fa292', { density: 40, edge: true, ew: 3 }); const [hx, hy] = R.p(x0 + .95, 1.1, SZ); c.fillStyle = '#b8b8b0'; c.fillRect(hx - 6, hy - 3, 12, 8); }
    // sinks + mirrors (right half of back wall)
    for (const sx of [1.2, 2.8]) { const [X, Y, w, h] = R.backRect(sx - .45, 1.5, sx + .45, 2.35); c.fillStyle = '#9ab0b8'; c.fillRect(X, Y, w, h); const g = c.createLinearGradient(X, Y, X + w, Y + h); g.addColorStop(0, 'rgba(255,255,255,.45)'); g.addColorStop(.5, 'rgba(255,255,255,.05)'); g.addColorStop(1, 'rgba(255,255,255,.25)'); c.fillStyle = g; c.fillRect(X, Y, w, h); c.strokeStyle = '#a8a8a0'; c.lineWidth = 6; c.strokeRect(X, Y, w, h);
      R.box(sx - .32, .8, 8.5, .64, .14, .5, '#f4f4ee', { density: 30, shadowA: .2 }); const [px, py] = R.p(sx, .8, 8.75); c.fillStyle = '#c8c8c0'; c.fillRect(px - 7, py, 14, R.p(sx, 0, 8.75)[1] - py); const [fx, fy] = R.p(sx, 1.05, 8.9); c.fillStyle = '#b8b8b8'; c.fillRect(fx - 4, fy, 8, 22); c.fillRect(fx - 4, fy + 18, 22, 8); }
    // high window on the right wall + beam
    { const q = [R.p(4, 2.8, 4.2), R.p(4, 2.8, 6), R.p(4, 2.2, 6), R.p(4, 2.2, 4.2)]; c.fillStyle = '#cfe4f0'; c.beginPath(); q.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fill(); c.strokeStyle = '#8a8a80'; c.lineWidth = 5; c.stroke(); glow(c, (q[0][0] + q[2][0]) / 2, (q[0][1] + q[2][1]) / 2, 300, '#fff6d8', .3); }
    { c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(30px)'; c.fillStyle = 'rgba(255,240,200,.14)'; const a = R.p(4, 2.8, 4.2), b = R.p(4, 2.2, 6), d = R.p(-.5, 0, 6.5), e = R.p(.2, 0, 3.8); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.lineTo(...d); c.lineTo(...e); c.closePath(); c.fill(); c.restore(); }
    // ceiling light
    { const [lx, ly] = R.p(0, 2.98, 5.5); c.fillStyle = '#f8f4e0'; c.fillRect(lx - 90, ly, 180, 18); glow(c, lx, ly + 20, 420, '#fff8e0', .22); }
    // floor drain
    { const [dx, dy] = R.p(.4, 0, 5); c.fillStyle = '#8a8a84'; c.beginPath(); c.ellipse(dx, dy, 34, 12, 0, 0, 7); c.fill(); c.strokeStyle = '#5a5a54'; c.lineWidth = 2; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(dx + k * 10, dy - 8); c.lineTo(dx + k * 10, dy + 8); c.stroke(); } }
    // details: paper towel box, trash can, radiator under the window, rules sign, coat hooks
    { const [X, Y, w, h] = R.backRect(1.75, 1.7, 2.25, 2.15); c.fillStyle = '#c8ccc8'; c.fillRect(X, Y, w, h); c.strokeStyle = '#5a5a54'; c.lineWidth = 3; c.strokeRect(X, Y, w, h); c.fillStyle = '#f4f0e4'; c.fillRect(X + w * .2, Y + h - 6, w * .6, 22); }
    R.box(3.1, 0, 7.6, .55, .75, .5, '#6a7a72', { density: 40 });
    { const q = [R.p(3.98, .9, 4.4), R.p(3.98, .9, 5.8), R.p(3.98, .3, 5.8), R.p(3.98, .3, 4.4)]; c.fillStyle = '#d8d4c8'; c.beginPath(); q.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fill(); c.strokeStyle = '#8a867a'; c.lineWidth = 3; c.stroke(); for (let z = 4.5; z < 5.8; z += .12) { const a = R.p(3.98, .85, z), b = R.p(3.98, .35, z); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); } }
    { const [X, Y, w, h] = R.backRect(-.4, 1.75, .45, 2.35); c.fillStyle = '#f6f0dc'; c.fillRect(X, Y, w, h); c.strokeStyle = '#2b1e16'; c.lineWidth = 3; c.strokeRect(X, Y, w, h); c.fillStyle = '#2b1e16'; c.font = `bold ${h * .2}px Georgia, serif`; c.textAlign = 'center'; c.fillText('DORM RULES', X + w / 2, Y + h * .26); c.fillStyle = 'rgba(43,30,22,.55)'; for (let k = 0; k < 4; k++) c.fillRect(X + w * .15, Y + h * (.42 + k * .14), w * (.7 - (k % 2) * .2), 4); }
    for (const z of [3, 3.6, 4.2]) { const [hx, hy] = R.p(-3.98, 1.9, z); c.fillStyle = '#7a6a50'; c.beginPath(); c.arc(hx, hy, 9, 0, 7); c.fill(); }
    { const q = [R.p(-3.97, 1.95, 3.5), R.p(-3.97, 1.95, 4), R.p(-3.97, 1.1, 4.05), R.p(-3.97, 1.1, 3.45)]; c.fillStyle = '#8a3a2e'; c.beginPath(); q.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fill(); c.strokeStyle = '#2b1e16'; c.lineWidth = 3; c.stroke(); }
    ENV.impasto(c, r, W, H, { n: 80000, edge: 20 }); P.finish(c, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .42 }); };
})(typeof window !== 'undefined' ? window : globalThis);
