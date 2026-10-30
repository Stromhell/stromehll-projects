// Napoleon props: a hand-drawn Europe map (lon/lat projected onto the np_parch sheet), ships of the line,
// cannons with muzzle smoke, the bicorne on the ground, a crown on a cushion, tricolour flags, crosses, the Code civil.
(function (G) {
  const S = G.S, TAU = Math.PI * 2;
  // Europe on the parchment: lon -12..45, lat 71..33
  const PX = (lon, lat) => [96 + (lon + 12) * 19, 76 + (71 - lat) * 14.9];
  const LAND = [
    [[-9, 37], [-9, 39], [-9.3, 43], [-8, 43.7], [-2, 43.4], [-1.3, 46], [-4.5, 48], [-1.6, 48.7], [1.5, 50], [2.5, 51.1], [4, 51.6], [5, 53.2], [8, 53.6], [8.5, 55.5], [8.2, 57], [10.5, 57.7], [10.5, 56], [12, 54.5], [14, 54], [18.5, 54.8], [21, 55.7], [21, 57], [23, 59], [24, 59.5], [30, 60], [30, 71], [45, 71], [45, 41.5], [41.5, 41.4], [36, 41.7], [31, 41.2], [29, 41], [26, 40.5], [24, 38], [22, 36.5], [21, 38], [19.5, 40], [19, 42], [16, 43.5], [13.6, 45.6], [12.3, 45.2], [12.5, 44], [14, 42], [16, 41], [18.5, 40.2], [16.5, 39], [16, 38], [15.6, 38], [15.8, 39.5], [14.5, 40.6], [12, 41.8], [10.5, 43], [8.8, 44.4], [7.5, 43.8], [6, 43.1], [4, 43.5], [3, 43], [3.2, 41.9], [.5, 40.5], [-.5, 38.5], [-2, 36.7], [-5.5, 36], [-7, 37]],
    [[5, 58], [5, 61.5], [8, 63.5], [13, 67], [17, 69.5], [24, 71], [30, 70.5], [30, 65], [25, 65.5], [21, 63], [17.5, 61], [19, 59.5], [16.5, 56.3], [14, 55.5], [12.8, 56], [11, 58.8], [8, 58]],
    [[-5.7, 50], [-3, 50.6], [1.4, 51.2], [1.7, 52.7], [0, 53.5], [-1.5, 55], [-2, 57], [-3.5, 58.6], [-5, 58.6], [-6, 56.5], [-5, 55], [-3, 54.8], [-3.2, 53.4], [-4.5, 52.8], [-5.2, 51.7], [-3, 51.4]],
    [[-6, 52], [-6, 54], [-7.5, 55.3], [-10, 54], [-10, 51.6], [-8, 51.5]],
    [[9, 41.4], [9.6, 42.2], [9.4, 43], [8.6, 42.4]], [[8.4, 39], [9.8, 39.2], [9.8, 41.2], [8.2, 40.8]], [[12.4, 38], [15.6, 38.2], [15, 36.7]],
  ];
  const SEA = [[28, 41.2], [28, 44], [30, 46], [33, 46], [36.5, 45.3], [38, 47], [39, 47], [38, 45], [41.5, 42], [36, 41.7], [31, 41.2]];
  const path = (c, poly) => { poly.forEach((p, i) => { const [x, y] = PX(p[0], p[1]); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath(); };
  const landPath = c => { c.beginPath(); LAND.forEach(p => path(c, p)); };
  // fill(c) is called clipped to the land, e.g. to paint the empire blue
  S.npEurope = (c, o = {}) => { c.save();
    c.fillStyle = S.rgba('#5a8aa0', .35); c.fillRect(96, 76, 1092, 568);
    landPath(c); c.fillStyle = o.land || '#e8d4a4'; c.fill(); c.save(); c.clip(); if (o.fill) o.fill(c); c.restore();
    c.beginPath(); path(c, SEA); c.fillStyle = '#8ab0b8'; c.fill();
    landPath(c); c.strokeStyle = '#6a5030'; c.lineWidth = 2.5; c.stroke(); c.restore(); };
  S.npPX = PX;
  S.npPlaces = { paris: PX(2.35, 48.85), moscow: PX(37.6, 55.75), corsica: PX(9, 42.1), austerlitz: PX(16.8, 49.1), leipzig: PX(12.4, 51.3), waterloo: PX(4.4, 50.7), madrid: PX(-3.7, 40.4), neman: PX(23.9, 54.9), elba: PX(10.3, 42.8), vienna: PX(16.4, 48.2), naples: PX(14.3, 40.9), holland: PX(5, 52.3), westphalia: PX(8.8, 51.6), london: PX(-.1, 51.5), berlin: PX(13.4, 52.5), petersburg: PX(30.3, 59.9), lisbon: PX(-9.1, 38.7), stockholm: PX(18, 59.3) };
  // map label in pen
  S.npLabel = (c, txt, x, y, a = 1, px = 26, col = '#3a2410') => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = `${px}px Caveat`; c.textAlign = 'center'; c.fillStyle = col; c.fillText(txt, x, y); c.restore(); };
  // a fat painted arrow from a to b, drawn to q
  S.npArrow = (c, a, b, q, col, wd = 26) => { if (q <= 0) return; const x = S.lerp(a[0], b[0], q), y = S.lerp(a[1], b[1], q), an = Math.atan2(b[1] - a[1], b[0] - a[0]);
    c.save(); c.strokeStyle = col; c.lineCap = 'round'; c.lineWidth = wd; c.globalAlpha = .9; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(x - Math.cos(an) * wd * .8, y - Math.sin(an) * wd * .8); c.stroke();
    c.fillStyle = col; c.beginPath(); c.moveTo(x + Math.cos(an) * wd * .6, y + Math.sin(an) * wd * .6); c.lineTo(x + Math.cos(an + 2.5) * wd * 1.4, y + Math.sin(an + 2.5) * wd * 1.4); c.lineTo(x + Math.cos(an - 2.5) * wd * 1.4, y + Math.sin(an - 2.5) * wd * 1.4); c.fill(); c.restore(); };

  // ship of the line, side view; dir 1 faces right. o: {sails 0..1, burn 0..1, flag:'fr'|'uk', hull}
  S.npShip = (c, x, y, s, dir, lt, o = {}) => { c.save(); c.translate(x, y); c.scale(s * dir, s); const rock = Math.sin(lt * 1.3 + x * .01) * .02; c.rotate(rock);
    const hull = o.hull || '#3a2a1e';
    c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(0, 6, 150, 12, 0, 0, TAU); c.fill();
    c.fillStyle = hull; c.beginPath(); c.moveTo(-150, -46); c.lineTo(140, -40); c.quadraticCurveTo(170, -42, 176, -60); c.lineTo(160, -10); c.quadraticCurveTo(100, 8, -110, 6); c.quadraticCurveTo(-150, -10, -160, -60); c.closePath(); c.fill();
    c.fillStyle = '#d8b040'; c.fillRect(-150, -34, 300, 6); c.fillRect(-140, -18, 280, 5);
    c.fillStyle = '#141008'; for (let i = 0; i < 12; i++) { c.fillRect(-126 + i * 22, -29, 9, 8); c.fillRect(-120 + i * 21, -13, 8, 7); }
    c.fillStyle = S.mix(hull, '#000000', .3); c.fillRect(-160, -74, 40, 30);
    c.strokeStyle = '#2a1e14'; c.lineWidth = 6; const masts = [[-80, 190], [10, 230], [96, 180]];
    masts.forEach(([mx, mh]) => { c.beginPath(); c.moveTo(mx, -44); c.lineTo(mx, -44 - mh); c.stroke(); });
    c.lineWidth = 4; c.beginPath(); c.moveTo(150, -50); c.lineTo(230, -110); c.stroke();
    const sails = o.sails ?? 1; if (sails > 0) masts.forEach(([mx, mh], i) => { for (let k = 0; k < 3; k++) { const top = -44 - mh + 14 + k * mh * .3, hw = 44 - k * -6 - i * 2, sh = mh * .26 * sails, bil = Math.sin(lt * 2 + i + k) * 3;
      c.fillStyle = o.burn ? S.mix('#e8e0cc', '#3a2a1e', o.burn) : '#efe8d4'; c.beginPath(); c.moveTo(mx - hw, top); c.lineTo(mx + hw, top); c.quadraticCurveTo(mx + hw + 8 + bil, top + sh / 2, mx + hw, top + sh); c.lineTo(mx - hw, top + sh); c.quadraticCurveTo(mx - hw + 8 + bil, top + sh / 2, mx - hw, top); c.fill(); c.strokeStyle = S.rgba('#8a7a5a', .5); c.lineWidth = 1.5; c.stroke(); c.strokeStyle = '#2a1e14'; c.lineWidth = 3; c.beginPath(); c.moveTo(mx - hw - 4, top); c.lineTo(mx + hw + 4, top); c.stroke(); } });
    c.strokeStyle = S.rgba('#2a1e14', .6); c.lineWidth = 1; masts.forEach(([mx, mh]) => { for (const d of [-1, 1]) { c.beginPath(); c.moveTo(mx, -44 - mh); c.lineTo(mx + d * 60, -44); c.stroke(); } });
    const fl = o.flag || 'fr', fx = -80, fy = -44 - 190; const wave = k => Math.sin(lt * 5 + k) * 3;
    if (fl === 'fr') ['#2a4a9a', '#f4f0e8', '#c82a2a'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.moveTo(fx - i * 14, fy + wave(i)); c.lineTo(fx - (i + 1) * 14, fy + wave(i + 1)); c.lineTo(fx - (i + 1) * 14, fy + 26 + wave(i + 1)); c.lineTo(fx - i * 14, fy + 26 + wave(i)); c.fill(); });
    else { c.fillStyle = '#c8b898'; c.fillRect(fx - 44, fy, 44, 26); c.fillStyle = '#1e2a6a'; c.fillRect(fx - 44, fy, 22, 13); c.fillStyle = '#c82a2a'; c.fillRect(fx - 44, fy + 5, 22, 3); c.fillRect(fx - 34, fy, 3, 13); }
    if (o.burn) { const b = o.burn; for (let k = 0; k < 14; k++) { const r = S.rng(k + 7), fx2 = -140 + r() * 280, fh = (40 + r() * 80) * b * (.7 + .3 * Math.sin(lt * 12 + k)); c.fillStyle = S.rgba(k % 2 ? '#ffb030' : '#ff6a20', .85); c.beginPath(); c.moveTo(fx2 - 14, -40); c.quadraticCurveTo(fx2 - 6, -40 - fh * .6, fx2 + Math.sin(lt * 6 + k) * 6, -40 - fh); c.quadraticCurveTo(fx2 + 8, -40 - fh * .5, fx2 + 14, -40); c.fill(); } }
    c.restore(); if (o.burn) S.glow(c, x, y - 80 * s, 260 * s, '#ff8a30', .5 * o.burn); };
  // field cannon, dir 1 faces right; fire 0..1 is the time since the shot
  S.npCannon = (c, x, y, s, dir, fire = -1, col = '#3a3a3e') => { c.save(); c.translate(x, y); c.scale(s * dir, s);
    c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(0, 2, 50, 8, 0, 0, TAU); c.fill();
    const kick = fire >= 0 && fire < .3 ? -10 * (1 - fire / .3) : 0; c.translate(kick, 0);
    c.fillStyle = '#5a3a20'; c.beginPath(); c.moveTo(-50, -4); c.lineTo(10, -28); c.lineTo(20, -20); c.lineTo(-40, 2); c.fill();
    c.fillStyle = col; c.beginPath(); c.moveTo(-14, -34); c.lineTo(56, -40); c.lineTo(58, -30); c.lineTo(-12, -20); c.closePath(); c.fill(); c.fillStyle = S.rgba('#ffffff', .2); c.fillRect(-10, -34, 64, 3);
    c.strokeStyle = '#3a2410'; c.lineWidth = 5; c.fillStyle = '#6a4424'; c.beginPath(); c.arc(0, -16, 16, 0, TAU); c.fill(); c.stroke(); c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(0, -16); c.lineTo(Math.cos(k) * 16, -16 + Math.sin(k) * 16); c.stroke(); }
    c.restore();
    if (fire >= 0 && fire < 2.5) { const mx = x + 60 * s * dir, my = y - 36 * s; if (fire < .15) S.glow(c, mx, my, 70 * s, '#ffd080', .9);
      for (let k = 0; k < 8; k++) { const r = S.rng(k + 31), q = Math.min(1, fire / 2.5), rx = mx + dir * (20 + r() * 90) * s * Math.sqrt(q + .1), ry = my - (r() * 60) * s * q; c.fillStyle = S.rgba('#e8e4dc', .55 * (1 - q)); c.beginPath(); c.arc(rx, ry, (14 + r() * 26) * s * (.4 + q), 0, TAU); c.fill(); } } };
  // musket held across the body (draw it in a holdN hook)
  S.npMusket = (c, x, y, a, s = 1) => { c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = '#5a3a20'; c.fillRect(-30 * s, -3 * s, 40 * s, 7 * s); c.fillStyle = '#3a3a3e'; c.fillRect(8 * s, -2 * s, 52 * s, 4 * s); c.fillStyle = '#c8c8d0'; c.fillRect(58 * s, -1 * s, 20 * s, 2 * s); c.restore(); };
  // bicorne lying on the ground
  S.npHat = (c, x, y, s = 1, rot = 0, snow = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
    c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(0, 4, 60, 8, 0, 0, TAU); c.fill();
    c.fillStyle = '#16141a'; c.beginPath(); c.moveTo(-62, 0); c.quadraticCurveTo(-40, -10, -26, -40); c.quadraticCurveTo(0, -52, 26, -40); c.quadraticCurveTo(40, -10, 62, 0); c.quadraticCurveTo(0, -8, -62, 0); c.fill();
    c.fillStyle = S.rgba('#6a6a7a', .5); c.beginPath(); c.moveTo(-50, -4); c.quadraticCurveTo(-30, -16, -22, -36); c.lineTo(-18, -34); c.quadraticCurveTo(-26, -14, -44, -2); c.fill();
    c.fillStyle = '#2a4aa0'; c.beginPath(); c.arc(18, -28, 7, 0, TAU); c.fill(); c.fillStyle = '#e8e8e8'; c.beginPath(); c.arc(18, -28, 4.5, 0, TAU); c.fill(); c.fillStyle = '#c82a2a'; c.beginPath(); c.arc(18, -28, 2, 0, TAU); c.fill();
    if (snow > 0) { c.fillStyle = S.rgba('#ffffff', .85 * snow); c.beginPath(); c.moveTo(-40, -14); c.quadraticCurveTo(-20, -30 - 6 * snow, 0, -44); c.quadraticCurveTo(20, -30 - 6 * snow, 40, -14); c.quadraticCurveTo(0, -24, -40, -14); c.fill(); }
    c.restore(); };
  // imperial crown on a red cushion with gold tassels
  S.npCrown = (c, x, y, s = 1, lt = 0) => { c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#8a1a24'; c.beginPath(); c.ellipse(0, 0, 80, 22, 0, 0, TAU); c.fill(); c.fillStyle = S.rgba('#ffffff', .15); c.beginPath(); c.ellipse(-16, -8, 50, 8, 0, 0, TAU); c.fill();
    c.fillStyle = '#d8b040'; for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * 74, 10, 6, 0, TAU); c.fill(); c.fillRect(sx * 74 - 2, 10, 4, 18); }
    c.fillStyle = '#d8b040'; c.beginPath(); c.moveTo(-40, -10); c.lineTo(40, -10); c.lineTo(46, -50); c.lineTo(26, -32); c.lineTo(14, -66); c.lineTo(0, -40); c.lineTo(-14, -66); c.lineTo(-26, -32); c.lineTo(-46, -50); c.closePath(); c.fill();
    c.strokeStyle = '#8a6a1a'; c.lineWidth = 2; c.stroke(); c.fillStyle = '#b8222a'; c.fillRect(-40, -22, 80, 12); [['#2a6ac8', -24], ['#e8e8f0', 0], ['#2aa060', 24]].forEach(([col, gx]) => { c.fillStyle = col; c.beginPath(); c.arc(gx, -16, 5, 0, TAU); c.fill(); });
    c.fillStyle = '#d8b040'; c.beginPath(); c.arc(0, -72, 7, 0, TAU); c.fill(); c.fillRect(-2, -86, 4, 14); c.fillRect(-7, -82, 14, 4);
    c.restore(); S.glow(c, x - 10 * s, y - 50 * s, 40 * s, '#fff0b0', .3 + .2 * Math.sin(lt * 3)); };
  // waving tricolour on a pole held at (x, y)
  S.npFlag = (c, x, y, s, lt, cols = ['#2a4a9a', '#f4f0e8', '#c82a2a'], vert = true) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#4a3020'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -150); c.stroke();
    const W = 90, H = 60, N = 12; for (let i = 0; i < N; i++) { const x0 = i / N * W, x1 = (i + 1) / N * W, w0 = Math.sin(lt * 5 - i * .5) * 6 * i / N, w1 = Math.sin(lt * 5 - (i + 1) * .5) * 6 * (i + 1) / N; c.fillStyle = vert ? cols[Math.min(2, Math.floor(i / N * 3))] : cols[0];
      c.beginPath(); c.moveTo(x0, -150 + w0); c.lineTo(x1, -150 + w1); c.lineTo(x1, -150 + H + w1); c.lineTo(x0, -150 + H + w0); c.fill(); }
    c.restore(); };
  // white wooden cross in the ground
  S.npCross = (c, x, y, s, a = 1) => { c.save(); c.globalAlpha = a; c.fillStyle = S.rgba('#000000', .2); c.beginPath(); c.ellipse(x, y, 14 * s, 3 * s, 0, 0, TAU); c.fill(); c.fillStyle = '#e8e8e4'; c.fillRect(x - 3 * s, y - 50 * s, 6 * s, 50 * s); c.fillRect(x - 14 * s, y - 40 * s, 28 * s, 6 * s); c.fillStyle = S.rgba('#8a8a88', .5); c.fillRect(x + 1 * s, y - 50 * s, 2 * s, 50 * s); c.restore(); };
  // the Code civil, closed book standing on a table edge
  S.npBook = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = S.rgba('#000000', .3); c.fillRect(-70, 6, 150, 10);
    c.fillStyle = '#5a1a1e'; c.fillRect(-74, -200, 148, 206); c.fillStyle = '#3a1014'; c.fillRect(-74, -200, 16, 206); c.fillStyle = '#f0e8d0'; c.fillRect(74, -194, 8, 196);
    c.strokeStyle = '#d8b040'; c.lineWidth = 3; c.strokeRect(-50, -186, 114, 176); c.fillStyle = '#d8b040'; c.font = '26px Anton'; c.textAlign = 'center'; c.fillText('CODE', 8, -120); c.fillText('CIVIL', 8, -88); c.font = '16px Oswald'; c.fillText('1804', 8, -50);
    c.restore(); };
  // golden cradle
  S.npCradle = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(lt * 1.5) * .04);
    c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(0, 4, 80, 8, 0, 0, TAU); c.fill();
    c.fillStyle = '#c8a040'; c.beginPath(); c.moveTo(-80, -60); c.quadraticCurveTo(0, 20, 80, -60); c.lineTo(70, -60); c.quadraticCurveTo(0, 6, -70, -60); c.fill();
    c.fillStyle = '#d8b850'; c.beginPath(); c.moveTo(-70, -60); c.lineTo(70, -60); c.quadraticCurveTo(0, 10, -70, -60); c.fill();
    c.fillStyle = '#f4f0f4'; c.beginPath(); c.ellipse(0, -58, 60, 10, 0, 0, TAU); c.fill(); c.fillStyle = '#e8b890'; c.beginPath(); c.arc(-30, -64, 12, 0, TAU); c.fill();
    c.strokeStyle = '#8a6a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(60, -60); c.quadraticCurveTo(80, -140, 20, -150); c.stroke(); c.fillStyle = S.rgba('#f0e8f8', .7); c.beginPath(); c.moveTo(20, -150); c.quadraticCurveTo(-40, -100, -60, -58); c.lineTo(40, -58); c.quadraticCurveTo(50, -110, 20, -150); c.fill();
    c.restore(); };
  // snowfall over the frame; amount 0..1
  S.npSnow = (c, lt, amt, wind = 1) => { for (let k = 0; k < 160 * amt; k++) { const r = S.rng(k + 900), x = ((r() * 1400 + lt * (40 + r() * 60) * wind) % 1400) - 60, y = ((r() * 760 + lt * (50 + r() * 50)) % 760) - 20; c.fillStyle = S.rgba('#ffffff', .5 + r() * .4); c.beginPath(); c.arc(x, y, 1 + r() * 2.5, 0, TAU); c.fill(); } };
  // drifting gun smoke
  S.npSmoke = (c, lt, x, y, w, h, a = .5, seed = 1) => { for (let k = 0; k < 14; k++) { const r = S.rng(seed + k), px = x + ((r() * w + lt * 14) % w), py = y + r() * h; c.fillStyle = S.rgba('#d8d4cc', a * (.4 + r() * .6)); c.beginPath(); c.arc(px, py, 30 + r() * 50, 0, TAU); c.fill(); } };
})(window);
