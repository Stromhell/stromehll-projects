// NVIDIA plates: diner exterior at night, diner booth, dish room, server hall, chip on a table.
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, PR = G.PR, Room = ENV.Room, F = ENV.fin, { hex, rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const neonText = (c, txt, x, y, px, col, o = {}) => { c.save(); c.font = `${o.italic ? 'italic ' : ''}bold ${px}px ${o.fam || 'Georgia, serif'}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = col; c.shadowBlur = px * .6; c.strokeStyle = col; c.lineWidth = px * .09; c.strokeText(txt, x, y); c.shadowBlur = px * .25; c.fillStyle = mix(hex(col), [255, 255, 255], .6).length ? rgb(mix(hex(col), [255, 255, 255], .65)) : '#fff'; c.fillText(txt, x, y); c.restore(); glow(c, x, y, px * txt.length * .5, col, .18); };
  // a 1990s sedan in side-ish view (x centre, y ground), length L px
  const car = (c, r, x, y, L, col, o = {}) => { const h = L * .28; c.save(); c.translate(x, y); if (o.flip) c.scale(-1, 1); M.contactShadow(c, 0, 0, L * .55, h * .14, .5);
    const body = new Path2D(`M${-L * .5},${-h * .25} L${-L * .48},${-h * .55} L${-L * .28},${-h * .62} L${-L * .16},${-h} L${L * .2},${-h} L${L * .32},${-h * .62} L${L * .48},${-h * .55} L${L * .5},${-h * .22} L${L * .46},${-h * .12} L${-L * .46},${-h * .12} Z`);
    const g = c.createLinearGradient(0, -h, 0, 0); g.addColorStop(0, rgb(shade(col, .25))); g.addColorStop(.6, rgb(hex(col))); g.addColorStop(1, rgb(shade(col, -.45))); c.fillStyle = g; c.fill(body);
    c.fillStyle = '#1a2230'; poly(c, [[-L * .25, -h * .63], [-L * .15, -h * .94], [L * .02, -h * .94], [L * .02, -h * .63]]); c.fill(); poly(c, [[L * .05, -h * .63], [L * .05, -h * .94], [L * .18, -h * .94], [L * .29, -h * .63]]); c.fill();
    c.fillStyle = 'rgba(255,190,120,.25)'; poly(c, [[-L * .2, -h * .63], [-L * .12, -h * .9], [-L * .06, -h * .9], [-L * .14, -h * .63]]); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; c.beginPath(); c.moveTo(L * .03, -h * .6); c.lineTo(L * .03, -h * .15); c.moveTo(-L * .26, -h * .6); c.lineTo(-L * .26, -h * .15); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-L * .48, -h * .45); c.lineTo(L * .48, -h * .45); c.stroke();
    c.fillStyle = '#d8d8d8'; c.fillRect(-L * .5, -h * .3, L * .04, h * .08); c.fillRect(L * .46, -h * .3, L * .04, h * .08);
    c.fillStyle = '#ffeec0'; c.fillRect(L * .47, -h * .48, L * .03, h * .1); c.fillStyle = '#c0302a'; c.fillRect(-L * .5, -h * .48, L * .025, h * .1);
    for (const wx of [-L * .32, L * .32]) { c.fillStyle = '#121212'; c.beginPath(); c.arc(wx, -h * .12, h * .2, 0, 7); c.fill(); c.fillStyle = '#9a9a9a'; c.beginPath(); c.arc(wx, -h * .12, h * .1, 0, 7); c.fill(); c.fillStyle = '#444'; c.beginPath(); c.arc(wx, -h * .12, h * .04, 0, 7); c.fill(); }
    if (o.lights) { glow(c, L * .5, -h * .43, L * .5, '#fff2c0', .25); }
    c.restore(); };
  const palm = (c, r, x, y, h, col = '#141a14') => { c.strokeStyle = col; c.lineCap = 'round'; c.lineWidth = h * .035; c.beginPath(); c.moveTo(x, y); c.bezierCurveTo(x + h * .05, y - h * .4, x - h * .03, y - h * .7, x + h * .04, y - h); c.stroke(); const tx = x + h * .04, ty = y - h;
    for (let k = 0; k < 11; k++) { const a = -Math.PI / 2 + (k - 5) * .32 + r.gauss() * .05, L = h * r.range(.28, .4); c.lineWidth = h * .012; c.beginPath(); c.moveTo(tx, ty); const ex = tx + Math.cos(a) * L, ey = ty + Math.sin(a) * L * .55 + L * .35; c.quadraticCurveTo(tx + Math.cos(a) * L * .5, ty + Math.sin(a) * L * .6 - L * .1, ex, ey); c.stroke();
      for (let j = 1; j < 9; j++) { const t = j / 9, px = tx + (ex - tx) * t, py = ty + (ey - ty) * t - Math.sin(t * Math.PI) * L * .18; c.lineWidth = h * .006; c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(a + 1.2) * L * .14 * (1 - t * .5), py + L * .1); c.moveTo(px, py); c.lineTo(px + Math.cos(a - 1.2) * L * .14 * (1 - t * .5), py + L * .1); c.stroke(); } } };
  // ---------- diner exterior at night ----------
  ENV.dinerExt = (ctx, r, W, H) => { const c = ctx, gy = H * .66;
    M.sky(c, r, W, gy + 40, '#0e1430', '#4a3858', { strokes: 2200 }); F.stars(c, r, W, H * .35, 160);
    let g = c.createLinearGradient(0, gy - 300, 0, gy); g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, 'rgba(255,140,90,.25)'); c.fillStyle = g; c.fillRect(0, 0, W, gy);
    // distant hills + low city lights (San Jose valley)
    c.fillStyle = '#1a1c2c'; c.beginPath(); c.moveTo(0, gy - 120); for (let x = 0; x <= W; x += 40) c.lineTo(x, gy - 120 - 60 * Math.sin(x * .002 + 1) - 30 * Math.sin(x * .006)); c.lineTo(W, gy); c.lineTo(0, gy); c.fill();
    for (let i = 0; i < 500; i++) { const x = r() * W, y = gy - r() * 70; c.fillStyle = rgb(jitter(r() < .7 ? '#ffcf86' : '#cfe0ff', r, 20), r.range(.4, .9)); c.fillRect(x, y, 2.5, 2.5); }
    // parking lot asphalt
    paintRegion(c, r, [[0, gy], [W, gy], [W, H], [0, H]], '#24242c', { density: 300, len: [40, 140], w: [4, 10], ang: 0, angJ: .05, al: .35, topLight: .05, botDark: -.2 });
    for (let k = -6; k <= 6; k++) { c.strokeStyle = 'rgba(230,220,180,.45)'; c.lineWidth = 5; c.beginPath(); c.moveTo(W / 2 + k * 260, H * .82); c.lineTo(W / 2 + k * 330, H); c.stroke(); }
    // building
    const bx0 = W * .2, bx1 = W * .86, by = gy - 330, roofY = by - 40;
    paintRegion(c, r, [[bx0, by], [bx1, by], [bx1, gy + 20], [bx0, gy + 20]], '#c8b49a', { density: 300, ang: 0, al: .3, topLight: -.1, botDark: -.3 });
    // stone base + brick
    paintRegion(c, r, [[bx0, gy - 70], [bx1, gy - 70], [bx1, gy + 20], [bx0, gy + 20]], '#6a4a3a', { density: 200, al: .35 }); for (let y = gy - 66; y < gy + 20; y += 14) for (let x = bx0 + ((y / 14 | 0) % 2) * 20; x < bx1; x += 40) { c.strokeStyle = 'rgba(30,20,15,.35)'; c.lineWidth = 1.5; c.strokeRect(x, y, 40, 14); }
    // roof band w/ red-yellow stripe + mansard
    c.fillStyle = '#d8a43a'; c.fillRect(bx0 - 30, roofY, bx1 - bx0 + 60, 50); c.fillStyle = '#b83a2a'; c.fillRect(bx0 - 30, roofY + 50, bx1 - bx0 + 60, 18); for (let x = bx0 - 30; x < bx1 + 30; x += 22) { c.fillStyle = 'rgba(120,70,20,.35)'; c.fillRect(x, roofY, 3, 50); }
    // windows: warm interior with booths and silhouettes
    const ww = (bx1 - bx0) / 7; for (let i = 0; i < 7; i++) { const x = bx0 + i * ww + 14, y = by + 40, w = ww - 28, h = 210; g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#ffe2a8'); g.addColorStop(1, '#f0b060'); c.fillStyle = g; c.fillRect(x, y, w, h);
      c.fillStyle = 'rgba(160,60,40,.85)'; c.fillRect(x, y + h - 70, w, 70); c.fillStyle = 'rgba(120,40,30,.9)'; c.fillRect(x + w * .1, y + h - 110, w * .14, 50); c.fillRect(x + w * .76, y + h - 110, w * .14, 50);
      c.fillStyle = 'rgba(240,230,210,.9)'; c.fillRect(x + w * .25, y + h - 70, w * .5, 10);
      if (i !== 3 && r() < .7) { c.fillStyle = 'rgba(60,30,20,.75)'; for (const sx of [.3, .66]) if (r() < .7) { c.beginPath(); c.arc(x + w * sx, y + h - 120, 20, 0, 7); c.fill(); c.fillRect(x + w * sx - 24, y + h - 100, 48, 40); } }
      c.fillStyle = 'rgba(255,255,255,.18)'; poly(c, [[x, y], [x + w * .3, y], [x + w * .1, y + h], [x, y + h]]); c.fill(); c.strokeStyle = '#3a3a3a'; c.lineWidth = 8; c.strokeRect(x, y, w, h); c.fillStyle = 'rgba(255,200,120,.12)'; c.fillRect(x - 20, gy + 20, w + 40, 200);
      glow(c, x + w / 2, y + h / 2, w, '#ffcf80', .22); }
    // the target booth (window 3): three men in a booth
    { const x = bx0 + 3 * ww + 14, y = by + 40, w = ww - 28, h = 210; c.fillStyle = 'rgba(60,30,20,.8)'; for (const sx of [.22, .5, .78]) { c.beginPath(); c.arc(x + w * sx, y + h - 126, 19, 0, 7); c.fill(); c.fillRect(x + w * sx - 22, y + h - 108, 44, 40); } c.fillStyle = '#fff'; c.fillRect(x + w * .3, y + h - 74, 12, 12); c.fillRect(x + w * .6, y + h - 74, 12, 12); }
    // door
    { const x = bx1 - ww * .55, w = 120, y = gy - 250; c.fillStyle = '#ffe2a8'; c.fillRect(x, y, w, 270); c.strokeStyle = '#3a3a3a'; c.lineWidth = 8; c.strokeRect(x, y, w, 270); c.fillStyle = '#b83a2a'; c.font = 'bold 22px Arial'; c.textAlign = 'center'; c.fillText('OPEN', x + w / 2, y + 60); glow(c, x + w / 2, y + 140, 200, '#ffcf80', .25); }
    // roof sign
    neonText(c, 'DINER', W * .53, roofY - 70, 120, '#ff4a5a', { italic: true });
    // pylon sign
    { const px = W * .1, top = H * .18; c.fillStyle = '#2a2a2e'; c.fillRect(px - 14, top + 200, 28, gy + 30 - top - 200); c.fillStyle = '#d8a43a'; c.beginPath(); c.roundRect(px - 150, top, 300, 210, 30); c.fill(); c.fillStyle = '#b83a2a'; c.beginPath(); c.roundRect(px - 136, top + 14, 272, 182, 22); c.fill(); neonText(c, 'OPEN 24', px, top + 80, 64, '#ffe08a', { fam: 'Arial' }); neonText(c, 'HOURS', px, top + 150, 52, '#ffe08a', { fam: 'Arial' }); glow(c, px, top + 100, 500, '#ff6040', .2); }
    // palms
    palm(c, r, W * .93, gy + 10, 560); palm(c, r, W * .97, gy + 30, 480); palm(c, r, W * .16, gy + 5, 420, '#11160f');
    // lamp posts with light cones
    for (const x of [W * .05, W * .9]) { c.fillStyle = '#1a1a1e'; c.fillRect(x - 6, gy - 280, 12, 300); c.fillRect(x - 6, gy - 280, 70, 10); c.fillStyle = '#fff0c0'; c.fillRect(x + 40, gy - 272, 30, 8); c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(20px)'; c.fillStyle = 'rgba(255,220,150,.15)'; poly(c, [[x + 40, gy - 270], [x + 70, gy - 270], [x + 200, H], [x - 90, H]]); c.fill(); c.restore(); }
    // cars
    car(c, r, W * .3, H * .9, 560, '#3a5a7a'); car(c, r, W * .66, H * .93, 600, '#8a2a2a', { flip: true }); car(c, r, W * .94, H * .86, 520, '#c8c0a8');
    // wet reflections of neon and windows
    const img = c.getImageData(0, Math.max(0, gy - 500), W, 500).data; c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 7000; i++) { const x = r() * W | 0, sy = 499 - (r() * 480 | 0), k = (sy * W + x) * 4, lum = img[k] + img[k + 1] + img[k + 2]; if (lum < 420) continue; const d = 499 - sy, y = gy + 30 + d * .7 + r.gauss() * 6; if (y > H) continue; c.fillStyle = `rgba(${img[k]},${img[k + 1]},${img[k + 2]},${.18 * (1 - d / 520)})`; c.fillRect(x - 6, y, 12, r.range(2, 6)); } c.restore();
    ENV.impasto(ctx, r, W, H, { n: 110000, edge: 26 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .45 }); };

  // ---------- inside the booth (banquette faces camera) ----------
  ENV.dinerBooth = (ctx, r, W, H) => { const R = new Room(ctx, r, W, H, { RW: 7, RH: 2.9, ch: 1.25, zf: 4.2, f: 1700, hor: .42 }), c = ctx;
    R.shell({ back: '#c8a878', side: '#b89868', ceil: '#e8dcc0', floor: '#d8d0c0', planks: false });
    R.tileFloor('#ece6d8', '#2a2a2a', .35, 1.5);
    // back wall: wainscot (chrome strip) + big windows onto the parking lot
    { const [X, Y, w, h] = R.backRect(-3.5, 0, 3.5, .95); c.fillStyle = '#8a2a24'; c.fillRect(X, Y, w, h); c.fillStyle = '#d8d8d8'; c.fillRect(X, Y - 6, w, 10); for (let x = X; x < X + w; x += 26) { c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x, Y + 4, 2, h); } }
    const view = (cc, rr, X, Y, w, h) => { const gg = cc.createLinearGradient(0, Y, 0, Y + h); gg.addColorStop(0, '#0e1430'); gg.addColorStop(1, '#3a2c48'); cc.fillStyle = gg; cc.fillRect(X, Y, w, h); for (let i = 0; i < 4; i++) car(cc, rr, X + w * (.15 + i * .25), Y + h * .95, w * .22, ['#3a5a7a', '#8a2a2a', '#5a5a52', '#c8c0a8'][i]); glow(cc, X + w * .8, Y + h * .3, w * .4, '#ff4a5a', .25); cc.fillStyle = '#ffcf86'; for (let i = 0; i < 40; i++) cc.fillRect(X + rr() * w, Y + h * rr.range(.5, .62), 3, 3); };
    for (const [a, b] of [[-3.2, -1.2], [-1, 1], [1.2, 3.2]]) R.backWindow(a, b, 1.05, 2.3, view, { frame: '#d8d8d8' });
    // neon in the window, reversed
    { const [x, y] = R.p(-2.2, 2.05, R.zf); c.save(); c.translate(x, y); c.scale(-1, 1); c.font = 'italic bold 60px Georgia'; c.textAlign = 'center'; c.shadowColor = '#ff4a5a'; c.shadowBlur = 30; c.fillStyle = '#ffd0d8'; c.fillText('DINER', 0, 0); c.restore(); }
    // banquette (red vinyl, tufted, with chrome trim)
    const by0 = .45, bz = R.zf - .55; { const back = [R.p(-2.6, .98, R.zf - .25), R.p(2.6, .98, R.zf - .25), R.p(2.6, by0, R.zf - .25), R.p(-2.6, by0, R.zf - .25)]; paintRegion(c, r, back, '#b8302a', { density: 80, ang: -Math.PI / 2, al: .3, topLight: .18, botDark: -.2 });
      for (let k = 1; k < 10; k++) { const a = R.p(-2.6 + 5.2 * k / 10, .96, R.zf - .25), b = R.p(-2.6 + 5.2 * k / 10, by0 + .02, R.zf - .25); c.strokeStyle = 'rgba(60,10,8,.5)'; c.lineWidth = 3; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); c.strokeStyle = 'rgba(255,160,150,.25)'; c.lineWidth = 2; c.beginPath(); c.moveTo(a[0] + 5, a[1]); c.lineTo(b[0] + 5, b[1]); c.stroke(); }
      const t = R.p(-2.6, .98, R.zf - .25), t2 = R.p(2.6, .98, R.zf - .25); c.fillStyle = '#e0e0e0'; c.fillRect(t[0], t[1] - 6, t2[0] - t[0], 10);
      const seat = [R.p(-2.6, by0, R.zf - .25), R.p(2.6, by0, R.zf - .25), R.p(2.6, by0, bz), R.p(-2.6, by0, bz)]; paintRegion(c, r, seat, '#c8382e', { density: 60, al: .3 }); const sf = [R.p(-2.6, by0, bz), R.p(2.6, by0, bz), R.p(2.6, 0, bz), R.p(-2.6, 0, bz)]; paintRegion(c, r, sf, '#8a2420', { density: 60, al: .3 }); c.fillStyle = '#d8d8d8'; c.fillRect(sf[0][0], sf[0][1] - 4, sf[1][0] - sf[0][0], 8); }
    // wall decor: clock + pie case at right, jukebox left
    { const [x, y] = R.p(2.9, 2.45, R.zf); PR.clock(c, r, x, y, R.s(R.zf), { h: 11, m: 40, r: .16, rim: '#c8382e' }); }
    { const [x, y] = R.p(-2.9, 2.45, R.zf); c.fillStyle = '#1a1a1a'; c.fillRect(x - 140, y - 60, 280, 120); c.fillStyle = '#e8e0cc'; c.fillRect(x - 130, y - 50, 260, 100); c.fillStyle = '#2a2a2a'; c.font = 'bold 26px Arial'; c.textAlign = 'center'; c.fillText('COFFEE 49¢', x, y - 12); c.fillText('PIE 99¢', x, y + 26); c.textAlign = 'left'; }
    // pendant lamps over the table
    for (const x of [-1.2, 1.2]) { const [px, py] = R.p(x, 1.95, 3.3); const [tx, ty] = R.p(x, 2.9, 3.3); PR.pendant(c, r, px, py, R.s(3.3), { top: ty }); glow(c, px, py + 60, 520, '#ffd890', .22); }
    // warm light
    glow(c, W / 2, H * .55, 1300, '#ffcf90', .12);
    ENV.impasto(ctx, r, W, H, { n: 100000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .42 });
    ENV.boothR = R; };
  // booth table in front of the three men (sprite)
  ENV.fgBoothTable = (ctx, r, W, H) => { const R = new Room(ctx, r, W, H, { RW: 7, RH: 2.9, ch: 1.25, zf: 4.2, f: 1700, hor: .42 }), c = ctx, z0 = 2.75, z1 = 3.4, th = .74;
    const top = [R.p(-2.1, th, z0), R.p(2.1, th, z0), R.p(2.1, th, z1), R.p(-2.1, th, z1)]; c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(top[0][0] + 40, top[0][1], top[1][0] - top[0][0] - 80, H - top[0][1]);
    const g = c.createLinearGradient(0, top[3][1], 0, top[0][1]); g.addColorStop(0, '#e8e0d0'); g.addColorStop(1, '#d0c8b8'); c.fillStyle = g; poly(c, top); c.fill(); for (let i = 0; i < 300; i++) { const x = r.range(top[0][0], top[1][0]), y = r.range(top[3][1], top[0][1]); c.fillStyle = `rgba(${r() < .5 ? '120,110,100' : '200,90,60'},.25)`; c.fillRect(x, y, 4, 2); }
    { const a = R.p(-2.1, th, z0), b = R.p(2.1, 0, z0); const gg = c.createLinearGradient(0, a[1], 0, b[1]); gg.addColorStop(0, '#7a2a22'); gg.addColorStop(1, '#3a1410'); c.fillStyle = gg; c.fillRect(a[0], a[1], b[0] - a[0], b[1] - a[1]); for (let x = a[0]; x < b[0]; x += 90) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, a[1], 3, b[1] - a[1]); } c.fillStyle = '#c8c8c8'; c.fillRect(a[0], b[1] - 30, b[0] - a[0], 30); }
    const ed = R.p(-2.1, th - .06, z0), ed2 = R.p(2.1, th, z0); c.fillStyle = '#c8c8c8'; c.fillRect(ed2[0] - (ed2[0] - ed[0]), ed2[1], ed2[0] - ed[0], ed[1] - ed2[1]); c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(ed[0], ed2[1], ed2[0] - ed[0], 3);
    const s = R.s(3); for (const [x, z, k] of [[-1.3, 3.05, 'mug'], [-.25, 2.95, 'pad'], [.4, 3.1, 'mug'], [1.35, 3.0, 'mug'], [.9, 3.2, 'plate'], [-.8, 3.25, 'plate']]) { const [px, py] = R.p(x, th, z);
      if (k === 'mug') PR.mug(c, r, px, py, s * 1.2, { col: '#f2ece0' });
      if (k === 'pad') { c.fillStyle = '#f4e48a'; poly(c, [[px - .16 * s, py], [px + .16 * s, py], [px + .14 * s, py - .05 * s], [px - .14 * s, py - .05 * s]]); c.fill(); c.strokeStyle = 'rgba(80,80,160,.6)'; c.lineWidth = 2; for (let j = 1; j < 4; j++) { c.beginPath(); c.moveTo(px - .13 * s, py - j * .012 * s); c.lineTo(px + .12 * s, py - j * .012 * s); c.stroke(); } c.strokeStyle = '#222'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(px - .08 * s, py - .02 * s); for (let j = 0; j < 8; j++) c.lineTo(px - .08 * s + j * .02 * s, py - .02 * s - (j % 2) * .01 * s); c.stroke(); }
      if (k === 'plate') { c.fillStyle = '#fbfaf6'; c.beginPath(); c.ellipse(px, py - 4, .12 * s, .03 * s, 0, 0, 7); c.fill(); c.fillStyle = '#c88a3a'; c.beginPath(); c.ellipse(px - .02 * s, py - 6, .05 * s, .012 * s, 0, 0, 7); c.fill(); } }
    { const [px, py] = R.p(1.8, th, 3.25); c.fillStyle = '#c8302a'; c.fillRect(px - 10, py - 60, 20, 60); c.fillStyle = '#e8c040'; c.fillRect(px + 16, py - 54, 18, 54); c.fillStyle = '#ddd'; c.fillRect(px - 30, py - 40, 14, 40); } };

  // ---------- diner dish room ----------
  ENV.dishroom = (ctx, r, W, H) => { const R = new Room(ctx, r, W, H, { RW: 6, RH: 2.8, ch: 1.4, zf: 4.4, f: 1650, hor: .42 }), c = ctx;
    R.shell({ back: '#d8d4c8', side: '#c8c4b8', ceil: '#cfcbbf', floor: '#7a6a5a', planks: false });
    R.tileFloor('#8a3a2a', '#6a2a1e', .3, 1.4);
    R.backTiles(-3, 3, 0, 2.0, .15, .075, '#eeeae0');
    // order window on back wall with ticket rail
    { const [X, Y, w, h] = R.backRect(-2.6, 1.15, -.9, 2.1); c.fillStyle = '#ffe2a8'; c.fillRect(X, Y, w, h); c.fillStyle = 'rgba(150,90,40,.5)'; c.fillRect(X, Y + h * .6, w, h * .4); c.fillStyle = '#9a9a9a'; c.fillRect(X - 10, Y + h - 6, w + 20, 14); c.fillStyle = '#c8c8c8'; c.fillRect(X, Y + 8, w, 8); for (let i = 0; i < 6; i++) { c.save(); c.translate(X + 20 + i * w / 6, Y + 14); c.rotate(r.gauss() * .05); c.fillStyle = '#fbf8ee'; c.fillRect(0, 0, w / 8, h * .4); c.fillStyle = 'rgba(40,40,80,.5)'; for (let j = 0; j < 5; j++) c.fillRect(6, 10 + j * 12, w / 8 - 14, 3); c.restore(); } glow(c, X + w / 2, Y + h / 2, w, '#ffcf80', .2); }
    // steel shelves with plate stacks + hanging ladles
    { const [X, Y, w] = R.backRect(-.4, 2.05, 2.8, 2.1); for (const yy of [2.05, 1.6]) { const [a, b] = [R.p(-.4, yy, R.zf - .01), R.p(2.8, yy, R.zf - .01)]; c.fillStyle = '#b8bcc0'; c.fillRect(a[0], a[1], b[0] - a[0], 10); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(a[0], a[1] + 10, b[0] - a[0], 6);
        for (let x = a[0] + 20; x < b[0] - 60; x += 90) { const n = r.int(4, 9); for (let k = 0; k < n; k++) { c.fillStyle = k % 2 ? '#f4f2ec' : '#dcd8ce'; c.beginPath(); c.ellipse(x + 30, a[1] - 4 - k * 6, 34, 6, 0, 0, 7); c.fill(); } } } }
    for (let i = 0; i < 7; i++) { const [x, y] = R.p(-.2 + i * .45, 1.45, R.zf - .02); c.strokeStyle = '#9aa0a6'; c.lineWidth = 5; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 90); c.stroke(); c.fillStyle = '#9aa0a6'; c.beginPath(); c.ellipse(x, y + 98, i % 2 ? 16 : 22, 10, 0, 0, 7); c.fill(); }
    // dish machine / steel counter along back
    R.box(-3, 0, R.zf - .7, 6, .9, .68, '#a8aeb4', { density: 30 });
    { const a = R.p(-3, .9, R.zf - .7), b = R.p(3, .9, R.zf - .7); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(a[0], a[1], b[0] - a[0], 4); for (let i = 0; i < 6; i++) { const [x, y] = R.p(-2.6 + i * 1, .9, R.zf - .4); c.fillStyle = '#7a7a72'; c.fillRect(x - 60, y - 70, 120, 70); for (let k = 0; k < 8; k++) { c.fillStyle = '#f2f0ea'; c.fillRect(x - 54 + k * 14, y - 64, 8, 56); } } }
    // counter front: steel doors, kick plate, handles, dish machine hood
    { const a = R.p(-3, .78, R.zf - .7), b = R.p(3, .08, R.zf - .7), dw = (b[0] - a[0]) / 8; for (let i = 0; i < 8; i++) { const x = a[0] + i * dw; c.strokeStyle = 'rgba(60,66,72,.6)'; c.lineWidth = 3; c.strokeRect(x + 8, a[1], dw - 16, b[1] - a[1]); const gg = c.createLinearGradient(x, 0, x + dw, 0); gg.addColorStop(0, 'rgba(255,255,255,.12)'); gg.addColorStop(.5, 'rgba(255,255,255,0)'); gg.addColorStop(1, 'rgba(0,0,0,.08)'); c.fillStyle = gg; c.fillRect(x + 8, a[1], dw - 16, b[1] - a[1]); c.fillStyle = '#e8eaec'; c.fillRect(x + dw / 2 - 30, a[1] + 20, 60, 10); }
      c.fillStyle = '#5a6066'; c.fillRect(a[0], b[1], b[0] - a[0], R.p(0, 0, R.zf - .7)[1] - b[1]); }
    { const [x, y] = R.p(1.6, .9, R.zf - .4), s = R.s(R.zf - .4); c.fillStyle = '#b8bec4'; c.fillRect(x - .5 * s, y - .9 * s, s, .9 * s); c.strokeStyle = 'rgba(60,66,72,.6)'; c.lineWidth = 3; c.strokeRect(x - .5 * s, y - .9 * s, s, .9 * s); c.fillStyle = '#2a2e32'; c.fillRect(x - .45 * s, y - .85 * s, .25 * s, .12 * s); c.fillStyle = '#4af07a'; c.fillRect(x - .42 * s, y - .82 * s, .06 * s, .05 * s); c.fillStyle = '#e8eaec'; c.fillRect(x - .4 * s, y - .5 * s, .8 * s, .04 * s); }
    // mop bucket + mat
    { const [x, y] = R.p(-2.4, 0, 2.2), s = R.s(2.2); c.fillStyle = '#e0b020'; poly(c, [[x - .2 * s, y], [x + .2 * s, y], [x + .24 * s, y - .32 * s], [x - .24 * s, y - .32 * s]]); c.fill(); c.strokeStyle = '#6a5a3a'; c.lineWidth = 8; c.beginPath(); c.moveTo(x + .1 * s, y - .3 * s); c.lineTo(x + .25 * s, y - 1.1 * s); c.stroke(); }
    // fluorescent tube
    { const a = R.p(-1.5, 2.8, 2.6), b = R.p(1.5, 2.8, 2.6); c.fillStyle = '#fbfaf0'; c.fillRect(a[0], a[1] + 10, b[0] - a[0], 22); glow(c, W / 2, a[1] + 30, 900, '#f0f8ff', .2); }
    // steam haze
    c.save(); c.globalCompositeOperation = 'screen'; for (let i = 0; i < 30; i++) { const x = r() * W, y = H * r.range(.3, .7), rad = r.range(150, 380), gg = c.createRadialGradient(x, y, 0, x, y, rad); gg.addColorStop(0, 'rgba(255,255,255,.07)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = gg; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); } c.restore();
    ENV.impasto(ctx, r, W, H, { n: 90000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .4 }); };
  // the sink counter in front of the boy (sprite)
  ENV.fgSink = (ctx, r, W, H) => { const c = ctx, y0 = H * .76; let g = c.createLinearGradient(0, y0, 0, H); g.addColorStop(0, '#d8dce0'); g.addColorStop(.08, '#a8aeb4'); g.addColorStop(1, '#6a7076'); c.fillStyle = g; c.fillRect(W * .2, y0, W * .65, H - y0); c.fillStyle = '#eef0f2'; c.fillRect(W * .2, y0 - 8, W * .65, 14);
    for (let i = 0; i < 60; i++) { c.strokeStyle = `rgba(255,255,255,${r.range(.05, .15)})`; c.lineWidth = r.range(1, 3); const x = W * .2 + r() * W * .65; c.beginPath(); c.moveTo(x, y0 + 10); c.lineTo(x + r.range(-30, 30), H); c.stroke(); }
    // dish pile on the counter (left) + sudsy basin rim (right)
    for (let k = 0; k < 9; k++) { const x = W * .3 + r.gauss() * 30, y = y0 - 6 - k * 10; c.fillStyle = k % 2 ? '#f6f4ee' : '#e0dcd2'; c.beginPath(); c.ellipse(x, y, 110, 16, r.gauss() * .05, 0, 7); c.fill(); c.strokeStyle = 'rgba(80,60,40,.3)'; c.lineWidth = 2; c.stroke(); c.fillStyle = 'rgba(180,120,60,.4)'; c.beginPath(); c.ellipse(x + 20, y - 2, 30, 5, 0, 0, 7); c.fill(); }
    for (let k = 0; k < 4; k++) { const x = W * .38 + k * 50; c.fillStyle = '#d8d0c0'; c.fillRect(x, y0 - 120 - k * 4, 34, 110); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(x + 4, y0 - 116 - k * 4, 6, 100); }
    for (let i = 0; i < 40; i++) { const x = W * .55 + r() * W * .25, y = y0 - 4 + r.gauss() * 6, rad = r.range(8, 24); c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(x, y, rad, Math.PI, 0); c.fill(); c.strokeStyle = 'rgba(160,170,180,.6)'; c.lineWidth = 1.5; c.stroke(); }
    c.strokeStyle = '#c8ccd0'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(W * .82, y0); c.lineTo(W * .82, y0 - 200); c.quadraticCurveTo(W * .82, y0 - 260, W * .76, y0 - 250); c.stroke(); };

  // ---------- server hall ----------
  ENV.serverhall = (ctx, r, W, H) => { const R = new Room(ctx, r, W, H, { RW: 6.4, RH: 3.6, ch: 1.6, zf: 22, f: 1500, hor: .45 }), c = ctx;
    R.shell({ back: '#1a2a3a', side: '#162230', ceil: '#141c26', floor: '#3a4450', planks: false });
    // raised floor tiles with perforations
    for (let z = 22; z > 1.5; z -= .6) for (let x = -3.2; x < 3.2; x += .6) { const pts = [R.p(x, 0, z - .6), R.p(x + .6, 0, z - .6), R.p(x + .6, 0, z), R.p(x, 0, z)]; c.fillStyle = rgb(jitter(Math.abs(x + .3) < .5 ? '#4a5866' : '#3a4652', r, 4)); poly(c, pts); c.fill(); c.strokeStyle = 'rgba(10,20,30,.6)'; c.lineWidth = 1.5; c.stroke(); if (Math.abs(x + .3) < .5 && z < 12) { const [cx, cy] = R.p(x + .3, 0, z - .3); c.fillStyle = 'rgba(10,20,30,.35)'; for (let k = -3; k <= 3; k++) for (let j = -1; j <= 1; j++) c.fillRect(cx + k * 14 * 6 / z, cy + j * 4 * 6 / z, 5 * 6 / z, 2 * 6 / z); } }
    // end wall glow (cool light) + door
    { const [X, Y, w, h] = R.backRect(-3.2, 0, 3.2, 3.6); glow(c, X + w / 2, Y + h * .5, w * 2, '#7ab8ff', .5); c.fillStyle = 'rgba(200,230,255,.6)'; c.fillRect(X + w * .4, Y + h * .25, w * .2, h * .75); }
    // rack rows on both sides with blinking LEDs, front doors mesh
    for (const side of [-1, 1]) for (let z = 21; z > 2; z -= .7) { const x0 = side < 0 ? -3.2 : 2.0, x1 = x0 + 1.2, face = side < 0 ? x1 : x0, h = 2.3;
      const f = [R.p(face, h, z + .7), R.p(face, h, z), R.p(face, 0, z), R.p(face, 0, z + .7)]; c.fillStyle = rgb(jitter('#14181e', r, 3)); poly(c, f); c.fill(); c.strokeStyle = 'rgba(120,140,170,.35)'; c.lineWidth = Math.max(1, 6 / z); poly(c, f); c.stroke();
      const top = [R.p(x0, h, z + .7), R.p(x1, h, z + .7), R.p(x1, h, z), R.p(x0, h, z)]; c.fillStyle = '#20262e'; poly(c, top); c.fill();
      const nU = 26; for (let u = 1; u < nU; u++) { const yy = h * u / nU, a = R.p(face, yy, z + .66), b = R.p(face, yy, z + .04); c.strokeStyle = 'rgba(70,80,95,.5)'; c.lineWidth = Math.max(.6, 3 / z); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke();
        for (let k = 0; k < 3; k++) if (r() < .5) { const t = r.range(.1, .9), zz = z + .7 * (1 - t), [lx, ly] = R.p(face, yy + .03, zz); const col = r() < .7 ? '#4af0a0' : r() < .5 ? '#5ab0ff' : '#ffb040'; c.fillStyle = col; const sz = Math.max(1.2, 14 / zz); c.fillRect(lx, ly, sz, sz); if (zz < 8) glow(c, lx, ly, sz * 6, col, .25); } } }
    // overhead cable trays (yellow) + light strips
    for (const x of [-1.6, 1.6]) { for (let z = 22; z > 1.6; z -= .1) { } const a = R.p(x - .25, 2.8, 1.8), b = R.p(x + .25, 2.8, 1.8), cc = R.p(x + .25, 2.8, 22), d = R.p(x - .25, 2.8, 22); c.fillStyle = '#c8a020'; poly(c, [a, b, cc, d]); c.fill(); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 1; for (let z = 2; z < 22; z += .5) { const p1 = R.p(x - .25, 2.8, z), p2 = R.p(x + .25, 2.8, z); c.beginPath(); c.moveTo(...p1); c.lineTo(...p2); c.stroke(); } }
    { const a = R.p(-.05, 3.6, 1.8), b = R.p(.05, 3.6, 1.8), cc = R.p(.05, 3.6, 22), d = R.p(-.05, 3.6, 22); c.fillStyle = '#d8ecff'; poly(c, [a, b, cc, d]); c.fill(); }
    // haze + blue grade
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(0, H * .2, 0, H * .7); g.addColorStop(0, 'rgba(90,150,255,.0)'); g.addColorStop(.5, 'rgba(90,150,255,.12)'); g.addColorStop(1, 'rgba(90,150,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.restore();
    // floor reflection of the end glow
    c.save(); c.globalCompositeOperation = 'screen'; c.filter = 'blur(30px)'; c.fillStyle = 'rgba(120,180,255,.18)'; poly(c, [R.p(-.8, 0, 22), R.p(.8, 0, 22), R.p(1.4, 0, 3), R.p(-1.4, 0, 3)]); c.fill(); c.restore();
    ENV.impasto(ctx, r, W, H, { n: 90000, edge: 24 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 7, vig: .5 }); };

  // ---------- a single chip on a dark table (title) ----------
  ENV.chipTable = (ctx, r, W, H) => { const c = ctx; paintRegion(c, r, [[0, 0], [W, 0], [W, H], [0, H]], '#121014', { density: 300, len: [80, 260], w: [3, 9], ang: .02, angJ: .03, al: .3, topLight: -.05, botDark: .05 });
    for (let i = 0; i < 18; i++) { const x = r() * W, y = r() * H * .5, rad = r.range(30, 90); glow(c, x, y, rad, r() < .5 ? '#5a9aff' : '#76b900', .12); }
    const cx = W / 2, cy = H * .64; const sp = (x, y) => [cx + x, cy + y * .45];
    // PCB (green) in perspective
    const pcb = [sp(-700, -500), sp(700, -500), sp(800, 520), sp(-800, 520)]; paintRegion(c, r, pcb, '#1e4a2a', { density: 200, al: .3 });
    c.save(); poly(c, pcb); c.clip(); c.strokeStyle = 'rgba(200,170,90,.55)'; c.lineWidth = 3; for (let i = 0; i < 60; i++) { let [x, y] = [r.range(-700, 700), r.range(-480, 500)]; c.beginPath(); c.moveTo(...sp(x, y)); for (let k = 0; k < 4; k++) { if (k % 2) x += r.range(-200, 200); else y += r.range(-150, 150); c.lineTo(...sp(x, y)); } c.stroke(); const e = sp(x, y); c.fillStyle = '#d8b860'; c.beginPath(); c.arc(e[0], e[1], 6, 0, 7); c.fill(); }
    for (let i = 0; i < 30; i++) { const [x, y] = sp(r.range(-650, 650), r.range(-450, 470)); if (Math.abs(x - cx) < 360 && Math.abs(y - cy) < 200) continue; c.fillStyle = r() < .5 ? '#2a2a2a' : '#c8a060'; c.fillRect(x - 14, y - 6, 28, 12); }
    c.restore();
    // chip package with pins and die
    const s = 300; for (let k = -9; k <= 9; k++) for (const sd of [-1, 1]) { const [x, y] = sp(k * 30, sd * (s + 14)); c.fillStyle = '#d8b860'; c.fillRect(x - 6, y - 5, 12, 10); const [x2, y2] = sp(sd * (s + 14), k * 30); c.fillRect(x2 - 8, y2 - 4, 16, 8); }
    c.fillStyle = 'rgba(0,0,0,.6)'; poly(c, [sp(-s + 20, -s + 40), sp(s + 20, -s + 40), sp(s + 30, s + 50), sp(-s + 30, s + 50)]); c.fill();
    const pk = [sp(-s, -s), sp(s, -s), sp(s, s), sp(-s, s)]; let g = c.createLinearGradient(0, pk[0][1], 0, pk[2][1]); g.addColorStop(0, '#3a3e46'); g.addColorStop(1, '#1a1c22'); c.fillStyle = g; poly(c, pk); c.fill(); c.fillStyle = '#2a2e36'; poly(c, [pk[2], pk[3], [pk[3][0], pk[3][1] + 22], [pk[2][0], pk[2][1] + 22]]); c.fill();
    const d = [sp(-160, -160), sp(160, -160), sp(160, 160), sp(-160, 160)]; g = c.createLinearGradient(d[0][0], d[0][1], d[2][0], d[2][1]); g.addColorStop(0, '#c8ccd4'); g.addColorStop(.45, '#6a7080'); g.addColorStop(.55, '#e8ecf4'); g.addColorStop(1, '#5a606c'); c.fillStyle = g; poly(c, d); c.fill(); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 2; poly(c, d); c.stroke();
    c.save(); poly(c, d); c.clip(); c.strokeStyle = 'rgba(40,50,70,.25)'; c.lineWidth = 1; for (let k = -160; k <= 160; k += 16) { c.beginPath(); c.moveTo(...sp(k, -160)); c.lineTo(...sp(k, 160)); c.stroke(); c.beginPath(); c.moveTo(...sp(-160, k)); c.lineTo(...sp(160, k)); c.stroke(); } c.restore();
    glow(c, cx, cy - 20, 900, '#76b900', .18); glow(c, cx, cy, 400, '#e8f4ff', .15);
    ENV.impasto(ctx, r, W, H, { n: 60000, edge: 26 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 6, grain: 7, vig: .55 }); };
})(typeof window !== 'undefined' ? window : globalThis);
