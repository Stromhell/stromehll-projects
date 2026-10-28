// Suburb street (1980s, daytime) and a savings-and-loan bank hall.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV;
  const { rgb, jitter, shade, glow, paintRegion, mix } = P;

  // one house, front-on. x = centre, y = ground line, s = scale. Returns the door and chimney points.
  function house(c, r, x, y, s, o) {
    const w = 520 * s, h = 300 * s, rh = 190 * s, wall = o.wall, roof = o.roof, trim = o.trim || '#f4efe4';
    // shadow on lawn
    c.fillStyle = 'rgba(30,40,20,.25)'; c.beginPath(); c.ellipse(x + 40 * s, y + 6, w * .62, 26 * s, 0, 0, 7); c.fill();
    // walls (siding)
    paintRegion(c, r, [[x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2, y], [x - w / 2, y]], wall, { density: 160, len: [30, 90], w: [4, 9], ang: 0, angJ: .03, al: .35, topLight: .06, botDark: -.12 });
    c.strokeStyle = rgb(shade(wall, -.18), .55); c.lineWidth = 2; for (let yy = y - h + 14 * s; yy < y; yy += 16 * s) { c.beginPath(); c.moveTo(x - w / 2, yy); c.lineTo(x + w / 2, yy); c.stroke(); }
    // roof
    const ro = 40 * s; paintRegion(c, r, [[x - w / 2 - ro, y - h + 6], [x, y - h - rh], [x + w / 2 + ro, y - h + 6]], roof, { density: 120, len: [20, 60], w: [4, 8], ang: 0, angJ: .1, al: .4, topLight: .1, botDark: -.15 });
    c.strokeStyle = rgb(shade(roof, -.3), .5); c.lineWidth = 2; for (let k = 1; k < 7; k++) { const yy = y - h - rh + k * rh / 7, f = k / 7; c.beginPath(); c.moveTo(x - (w / 2 + ro) * f, yy); c.lineTo(x + (w / 2 + ro) * f, yy); c.stroke(); }
    c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - w / 2 - ro, y - h + 6); c.lineTo(x, y - h - rh); c.lineTo(x + w / 2 + ro, y - h + 6); c.stroke();
    // chimney
    const chx = x + w * .26; c.fillStyle = '#8a4a3a'; c.fillRect(chx, y - h - rh * .75, 40 * s, rh * .55); c.strokeStyle = '#2b1e16'; c.lineWidth = 3; c.strokeRect(chx, y - h - rh * .75, 40 * s, rh * .55); c.fillStyle = '#5a3028'; c.fillRect(chx - 4, y - h - rh * .75, 48 * s, 10 * s);
    // gable window
    c.fillStyle = trim; c.beginPath(); c.arc(x, y - h - rh * .35, 26 * s, 0, 7); c.fill(); c.fillStyle = '#3a4a5a'; c.beginPath(); c.arc(x, y - h - rh * .35, 20 * s, 0, 7); c.fill(); c.strokeStyle = trim; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 20 * s, y - h - rh * .35); c.lineTo(x + 20 * s, y - h - rh * .35); c.moveTo(x, y - h - rh * .35 - 20 * s); c.lineTo(x, y - h - rh * .35 + 20 * s); c.stroke();
    // windows with shutters + curtains
    const win = (wx, wy) => { const ww = 90 * s, wh = 110 * s; c.fillStyle = o.shutter || '#2f4a3a'; c.fillRect(wx - ww / 2 - 26 * s, wy, 22 * s, wh); c.fillRect(wx + ww / 2 + 4 * s, wy, 22 * s, wh);
      c.fillStyle = trim; c.fillRect(wx - ww / 2 - 6, wy - 6, ww + 12, wh + 12); const g = c.createLinearGradient(wx, wy, wx, wy + wh); g.addColorStop(0, '#8fb0c8'); g.addColorStop(1, '#4a6478'); c.fillStyle = g; c.fillRect(wx - ww / 2, wy, ww, wh);
      c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(wx - ww / 2, wy + wh * .6); c.lineTo(wx - ww / 2 + ww * .5, wy); c.lineTo(wx - ww / 2 + ww * .7, wy); c.lineTo(wx - ww / 2, wy + wh * .9); c.fill();
      c.fillStyle = 'rgba(240,230,210,.8)'; c.fillRect(wx - ww / 2, wy, ww * .18, wh); c.fillRect(wx + ww / 2 - ww * .18, wy, ww * .18, wh); c.strokeStyle = trim; c.lineWidth = 4; c.beginPath(); c.moveTo(wx, wy); c.lineTo(wx, wy + wh); c.moveTo(wx - ww / 2, wy + wh / 2); c.lineTo(wx + ww / 2, wy + wh / 2); c.stroke();
      c.fillStyle = shade(trim, -.1).map ? rgb(shade(trim, -.1)) : trim; c.fillRect(wx - ww / 2 - 10, wy + wh + 6, ww + 20, 10 * s);
      c.fillStyle = '#4a7a3a'; for (let k = 0; k < 9; k++) { c.beginPath(); c.arc(wx - ww / 2 + k * ww / 8, wy + wh + 18 * s, 10 * s, 0, 7); c.fill(); } c.fillStyle = '#d04a5a'; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(wx - ww / 2 + 8 + k * ww / 4.5, wy + wh + 12 * s, 4 * s, 0, 7); c.fill(); } };
    win(x - w * .3, y - h + 70 * s); win(x + w * .3, y - h + 70 * s);
    // door + porch step + light
    const dx = x, dw = 80 * s, dh = 160 * s; c.fillStyle = trim; c.fillRect(dx - dw / 2 - 10, y - dh - 10, dw + 20, dh + 10); c.fillStyle = o.door || '#7a2a22'; c.fillRect(dx - dw / 2, y - dh, dw, dh);
    c.strokeStyle = rgb(shade(o.door || '#7a2a22', -.3), .8); c.lineWidth = 3; c.strokeRect(dx - dw / 2 + 10, y - dh + 12, dw - 20, dh * .4); c.strokeRect(dx - dw / 2 + 10, y - dh * .5, dw - 20, dh * .4); c.fillStyle = '#d8b050'; c.beginPath(); c.arc(dx + dw / 2 - 14, y - dh * .5, 5 * s, 0, 7); c.fill();
    c.fillStyle = '#b8b0a0'; c.fillRect(dx - dw / 2 - 30, y - 6, dw + 60, 14 * s); c.fillStyle = '#a09888'; c.fillRect(dx - dw / 2 - 44, y + 6, dw + 88, 12 * s);
    glow(c, dx + dw / 2 + 22, y - dh + 10, 60 * s, '#ffe0a0', .25); c.fillStyle = '#e8c070'; c.fillRect(dx + dw / 2 + 16, y - dh, 12 * s, 18 * s);
    // outline
    c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.strokeRect(x - w / 2, y - h, w, h);
    return { door: [dx, y - dh * .5], chimney: [chx + 20 * s, y - h - rh * .75], roof: [x, y - h - rh] };
  }
  function tree(c, r, x, y, s, col = '#4a7a3a') { c.fillStyle = 'rgba(30,40,20,.25)'; c.beginPath(); c.ellipse(x + 30 * s, y + 4, 150 * s, 20 * s, 0, 0, 7); c.fill();
    c.fillStyle = '#5a3a24'; c.beginPath(); c.moveTo(x - 16 * s, y); c.lineTo(x - 9 * s, y - 210 * s); c.lineTo(x + 9 * s, y - 210 * s); c.lineTo(x + 16 * s, y); c.fill();
    for (let k = 0; k < 60; k++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 140 * s, bx = x + Math.cos(a) * d * 1.1, by = y - 300 * s + Math.sin(a) * d * .85, rr = r.range(30, 60) * s; const g = c.createRadialGradient(bx - rr * .3, by - rr * .4, 0, bx, by, rr); const cc = jitter(col, r, 14); g.addColorStop(0, rgb(shade(cc, .25), .95)); g.addColorStop(1, rgb(shade(cc, -.2), .95)); c.fillStyle = g; c.beginPath(); c.arc(bx, by, rr, 0, 7); c.fill(); } }
  function car(c, r, x, y, s, col) { c.fillStyle = 'rgba(20,20,20,.35)'; c.beginPath(); c.ellipse(x, y + 4, 260 * s, 22 * s, 0, 0, 7); c.fill();
    c.fillStyle = col; c.strokeStyle = '#2b1e16'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 250 * s, y - 30 * s); c.lineTo(x - 245 * s, y - 85 * s); c.lineTo(x - 150 * s, y - 95 * s); c.lineTo(x - 100 * s, y - 155 * s); c.lineTo(x + 90 * s, y - 155 * s); c.lineTo(x + 140 * s, y - 95 * s); c.lineTo(x + 245 * s, y - 88 * s); c.lineTo(x + 250 * s, y - 30 * s); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#9ab4c8'; c.beginPath(); c.moveTo(x - 88 * s, y - 145 * s); c.lineTo(x - 5 * s, y - 145 * s); c.lineTo(x - 5 * s, y - 98 * s); c.lineTo(x - 128 * s, y - 98 * s); c.closePath(); c.fill(); c.beginPath(); c.moveTo(x + 8 * s, y - 145 * s); c.lineTo(x + 82 * s, y - 145 * s); c.lineTo(x + 122 * s, y - 98 * s); c.lineTo(x + 8 * s, y - 98 * s); c.closePath(); c.fill();
    c.fillStyle = '#c8c8c8'; c.fillRect(x - 255 * s, y - 42 * s, 510 * s, 12 * s); c.fillStyle = '#f0e0a0'; c.fillRect(x + 232 * s, y - 80 * s, 16 * s, 18 * s);
    for (const wx of [-150, 150]) { c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(x + wx * s, y - 20 * s, 42 * s, 0, 7); c.fill(); c.fillStyle = '#a0a0a0'; c.beginPath(); c.arc(x + wx * s, y - 20 * s, 20 * s, 0, 7); c.fill(); } }

  ENV.suburb = (ctx, r, W, H) => { const c = ctx, gy = H * .62;
    M.sky(c, r, W, gy + 40, '#7fb2e0', '#e8eef0', { strokes: 2600 }); ENV.clouds(c, r, W, H * .04, H * .3, 10, '#ffffff', '#e4eaf0', '#b8c4d4');
    glow(c, W * .85, H * .1, W * .4, '#fff4d0', .25);
    // far trees line
    for (let i = 0; i < 70; i++) { const x = r() * W, y = gy - r.range(30, 110), rr = r.range(40, 90); c.fillStyle = rgb(jitter('#6a8a5a', r, 12), .9); c.beginPath(); c.arc(x, y, rr, 0, 7); c.fill(); }
    // lawns
    paintRegion(c, r, [[0, gy - 40], [W, gy - 40], [W, H * .86], [0, H * .86]], '#6a9a48', { density: 500, len: [10, 30], w: [2, 5], ang: -Math.PI / 2, angJ: .4, al: .45, topLight: .08, botDark: -.1 });
    // houses
    const cols = [['#e8d8a8', '#5a4a48', '#2f4a3a', '#7a2a22'], ['#a8c4d8', '#4a3a3a', '#f4efe4', '#2a4a7a'], ['#f0e4d0', '#6a3a2a', '#7a3a2a', '#3a5a3a'], ['#d8b8a0', '#3a3a44', '#3a4a6a', '#8a6a2a'], ['#c8d8b0', '#5a3a2a', '#4a3a2a', '#7a2a4a']];
    ENV.suburbHouses = [];
    for (let i = 0; i < 5; i++) { const x = W * (.1 + i * .2), s = .78 + (i % 2) * .05, o = cols[i]; ENV.suburbHouses.push(house(c, r, x, gy + 40, s, { wall: o[0], roof: o[1], shutter: o[2], door: o[3] })); }
    for (let i = 0; i < 6; i++) tree(c, r, W * (i * .2) + r.range(-20, 20), gy + 70, .85);
    // picket fences + mailboxes
    for (let i = 0; i < 5; i++) { const x0 = W * (.1 + i * .2); for (let k = -9; k <= 9; k++) { if (Math.abs(k) < 2) continue; const px = x0 + k * 22; c.fillStyle = '#f6f2ea'; c.strokeStyle = '#8a8070'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(px - 7, gy + 190); c.lineTo(px - 7, gy + 132); c.lineTo(px, gy + 122); c.lineTo(px + 7, gy + 132); c.lineTo(px + 7, gy + 190); c.closePath(); c.fill(); c.stroke(); } c.fillStyle = '#f6f2ea'; c.fillRect(x0 - 210, gy + 145, 420, 8); c.fillRect(x0 - 210, gy + 172, 420, 8);
      c.fillStyle = '#5a3a24'; c.fillRect(x0 + 240, gy + 150, 8, 60); c.fillStyle = ['#2a4a8a', '#8a2a2a', '#2a2a2a', '#4a6a3a', '#8a6a2a'][i]; c.beginPath(); c.roundRect(x0 + 222, gy + 128, 46, 28, [12, 12, 2, 2]); c.fill(); c.fillStyle = '#d02a2a'; c.fillRect(x0 + 264, gy + 122, 4, 18); }
    // sidewalk + kerb + street
    paintRegion(c, r, [[0, H * .78], [W, H * .78], [W, H * .84], [0, H * .84]], '#cfc8b8', { density: 200, ang: 0, al: .3 });
    c.strokeStyle = 'rgba(120,110,100,.5)'; c.lineWidth = 2; for (let x = 0; x < W; x += 140) { c.beginPath(); c.moveTo(x, H * .78); c.lineTo(x - 10, H * .84); c.stroke(); }
    c.fillStyle = '#a8a090'; c.fillRect(0, H * .84, W, 14);
    paintRegion(c, r, [[0, H * .85], [W, H * .85], [W, H], [0, H]], '#4a4a50', { density: 300, len: [40, 140], w: [4, 10], ang: 0, angJ: .05, al: .35, botDark: -.15 });
    c.fillStyle = 'rgba(240,200,80,.8)'; for (let x = 40; x < W; x += 260) c.fillRect(x, H * .94, 140, 10);
    car(c, r, W * .63, H * .9, .95, '#8a3a2a'); car(c, r, W * .14, H * .9, .9, '#c8b890');
    ENV.impasto(c, r, W, H, { n: 90000, edge: 20 }); P.finish(c, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .35 }); };

  // savings & loan hall: marble, columns, teller cages, big wall clock, open floor in front
  ENV.bankHall = (ctx, r, W, H) => { const c = ctx;
    const R = new ENV.Room(ctx, r, W, H, { RW: 14, RH: 5.2, ch: 1.6, zf: 12, f: 1700, hor: .44 });
    R.shell({ back: '#d8ccb4', side: '#cfc2a8', ceil: '#e8e0cc', floor: '#d8d0c0', planks: false, skirting: '#6a5038' });
    // marble floor checks
    for (let z = 2.5; z < 12; z += .9) for (let x = -7; x < 7; x += .9) { if (((Math.round(z / .9) + Math.round(x / .9)) & 1) === 0) continue; const a = R.p(x, 0, z), b = R.p(x + .9, 0, z), d = R.p(x + .9, 0, z + .9), e = R.p(x, 0, z + .9); c.fillStyle = 'rgba(80,70,60,.18)'; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.lineTo(...d); c.lineTo(...e); c.fill(); }
    // coffered ceiling beams
    for (let z = 3; z < 12; z += 1.5) { const a = R.p(-7, 5.2, z), b = R.p(7, 5.2, z); c.strokeStyle = 'rgba(150,130,100,.5)'; c.lineWidth = R.s(z) * .12; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }
    // back wall: sign + clock
    { const [X, Y, w, h] = R.backRect(-3.6, 3.7, 3.6, 4.5); c.fillStyle = '#2a3a2a'; c.fillRect(X, Y, w, h); c.strokeStyle = '#c9a25a'; c.lineWidth = 6; c.strokeRect(X + 8, Y + 8, w - 16, h - 16); c.fillStyle = '#e8c878'; c.font = `bold ${h * .42}px Georgia, serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('FIRST SAVINGS & LOAN', X + w / 2, Y + h / 2 + 4); }
    { const [cx, cy] = R.p(0, 2.95, R.zf - .01), rr = R.s(R.zf) * .55; c.fillStyle = '#f4efe2'; c.strokeStyle = '#7a5a2a'; c.lineWidth = 8; c.beginPath(); c.arc(cx, cy, rr, 0, 7); c.fill(); c.stroke(); c.strokeStyle = '#2b1e16'; c.lineWidth = 3; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; c.beginPath(); c.moveTo(cx + Math.cos(a) * rr * .8, cy + Math.sin(a) * rr * .8); c.lineTo(cx + Math.cos(a) * rr * .92, cy + Math.sin(a) * rr * .92); c.stroke(); } c.lineWidth = 5; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + rr * .5, cy - rr * .2); c.moveTo(cx, cy); c.lineTo(cx - rr * .1, cy - rr * .7); c.stroke(); }
    // teller counter with brass cages across the back
    R.box(-6.6, 0, 9.4, 13.2, 1.15, .9, '#7a4a2a', { density: 60 });
    for (let x = -6.2; x <= 6.2; x += 1.55) { const a = R.p(x, 1.15, 9.45), b = R.p(x + 1.4, 2.3, 9.45); const X = a[0], Y = b[1], w = b[0] - a[0], h = a[1] - b[1]; c.strokeStyle = '#c9a25a'; c.lineWidth = 3; c.strokeRect(X, Y, w, h); for (let k = 1; k < 9; k++) { c.beginPath(); c.moveTo(X + k * w / 9, Y); c.lineTo(X + k * w / 9, Y + h * .7); c.stroke(); } c.fillStyle = 'rgba(40,30,20,.3)'; c.fillRect(X + w * .3, Y + h * .72, w * .4, h * .28);
      const [lx, ly] = R.p(x + .7, 2.45, 9.4); c.fillStyle = '#2f5a3a'; c.beginPath(); c.ellipse(lx, ly, R.s(9.4) * .22, R.s(9.4) * .08, 0, 0, 7); c.fill(); glow(c, lx, ly + 10, R.s(9.4) * .5, '#fff0b0', .15); }
    // columns
    for (const x of [-6.2, -3.4, 3.4, 6.2]) for (const z of [5.5]) { const a = R.p(x - .3, 0, z), b = R.p(x + .3, 5.2, z); const X = a[0], w = b[0] - a[0]; const g = c.createLinearGradient(X, 0, X + w, 0); g.addColorStop(0, '#b8ac94'); g.addColorStop(.35, '#f2ece0'); g.addColorStop(1, '#a89c84'); c.fillStyle = g; c.fillRect(X, b[1], w, a[1] - b[1]); c.strokeStyle = 'rgba(120,100,80,.35)'; c.lineWidth = 2; for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(X + k * w / 6, b[1]); c.lineTo(X + k * w / 6, a[1]); c.stroke(); } c.fillStyle = '#d8ccb4'; c.fillRect(X - w * .15, a[1] - w * .3, w * 1.3, w * .3); c.fillRect(X - w * .15, b[1], w * 1.3, w * .25); }
    // velvet rope stanchions
    for (const x of [-2, 0, 2]) { const [px, py] = R.p(x, 0, 7.5), s = R.s(7.5); c.fillStyle = '#c9a25a'; c.fillRect(px - s * .03, py - s * .9, s * .06, s * .9); c.beginPath(); c.arc(px, py - s * .9, s * .06, 0, 7); c.fill(); c.fillRect(px - s * .12, py - s * .03, s * .24, s * .04); }
    { const a = R.p(-2, .78, 7.5), b = R.p(0, .78, 7.5), d = R.p(2, .78, 7.5); c.strokeStyle = '#8a1a2a'; c.lineWidth = R.s(7.5) * .04; c.beginPath(); c.moveTo(...a); c.quadraticCurveTo((a[0] + b[0]) / 2, a[1] + 40, ...b); c.quadraticCurveTo((b[0] + d[0]) / 2, b[1] + 40, ...d); c.stroke(); }
    R.beam(-2, 5.2, 2, 5.2, '#fff4d0', .12);
    ENV.impasto(c, r, W, H, { n: 90000, edge: 20 }); P.finish(c, r, W, H, { oil: 0, canvas: 7, grain: 8, vig: .4 }); };
})(typeof window !== 'undefined' ? window : globalThis);
