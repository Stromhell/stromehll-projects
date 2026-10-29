// NVIDIA act 2 plates: CRT close-up, workbench close-up, PC-games store wall. Paint: node shared/p2/paint.js nvidia/production/plates_act2.js nvidia/production/plates all
(function (G) {
  const P = G.P2, M = G.M2, ENV = G.ENV, { hex, rgb, mix, jitter, shade, glow, poly, paintRegion } = P;
  const rect = (c, r, x, y, w, h, col, o = {}) => paintRegion(c, r, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], col, Object.assign({ density: 120, len: [10, 40], w: [3, 8], ang: 0, angJ: .2, al: .3, topLight: .06, botDark: -.16, var: 8 }, o));
  const rrect = (c, x, y, w, h, rad) => { c.beginPath(); c.roundRect(x, y, w, h, rad); };
  // pegboard wall with hanging tools
  const pegboard = (c, r, x, y, w, h) => { rect(c, r, x, y, w, h, '#b99566', { density: 260, var: 10 }); c.fillStyle = 'rgba(60,40,20,.55)'; for (let yy = y + 24; yy < y + h; yy += 40) for (let xx = x + 24; xx < x + w; xx += 40) { c.beginPath(); c.arc(xx, yy, 4.2, 0, 7); c.fill(); }
    c.strokeStyle = 'rgba(40,26,14,.5)'; c.lineWidth = 4; c.strokeRect(x, y, w, h); };
  const tool = (c, r, kind, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(30,20,10,.25)'; c.translate(8, 10);
    const draw = (fill) => { c.fillStyle = fill; c.strokeStyle = '#2a1e14'; c.lineWidth = 3;
      if (kind === 'wrench') { c.beginPath(); c.roundRect(-9, 0, 18, 170, 8); c.fill(); c.stroke(); c.beginPath(); c.arc(0, -6, 24, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#b99566'; c.fillRect(-8, -34, 16, 26); }
      if (kind === 'pliers') { for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(sd * 4, 0); c.quadraticCurveTo(sd * 22, 80, sd * 14, 170); c.lineTo(sd * 2, 170); c.quadraticCurveTo(sd * 8, 80, -sd * 2, 0); c.fill(); c.stroke(); } c.beginPath(); c.ellipse(0, -30, 12, 34, 0, 0, 7); c.fill(); c.stroke(); }
      if (kind === 'coil') { c.lineWidth = 7; for (let k = 0; k < 7; k++) { c.strokeStyle = k % 2 ? fill : '#2a1e14'; c.beginPath(); c.ellipse(0, 60, 60 - k * 2, 66 - k * 2, 0, 0, 7); c.stroke(); } }
      if (kind === 'driver') { c.beginPath(); c.roundRect(-14, 0, 28, 90, 10); c.fill(); c.stroke(); c.fillStyle = '#9aa0a8'; c.fillRect(-4, 90, 8, 110); c.strokeRect(-4, 90, 8, 110); }
      if (kind === 'saw') { c.beginPath(); c.moveTo(-60, 0); c.lineTo(60, 0); c.lineTo(60, 26); c.lineTo(-60, 26); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c8ccd0'; c.beginPath(); c.moveTo(-50, 26); c.lineTo(50, 26); c.lineTo(50, 140); c.lineTo(-50, 140); c.closePath(); c.fill(); c.stroke(); } };
    c.save(); c.globalAlpha = .3; draw('#000'); c.restore(); c.translate(-8, -10); const cols = { wrench: '#9aa2aa', pliers: '#c8402e', coil: '#d88a2a', driver: '#2a6ac8', saw: '#3a3a3a' }; draw(cols[kind]);
    c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-4, 10, 4, 60); c.restore(); };
  // beige computer gear
  const beigeBox = (c, r, x, y, w, h, o = {}) => { rect(c, r, x, y, w, h, o.col || '#d8cfb8', { density: 80, topLight: .1, botDark: -.2 }); c.strokeStyle = 'rgba(60,50,30,.55)'; c.lineWidth = 3; c.strokeRect(x, y, w, h);
    if (o.drives) for (let k = 0; k < o.drives; k++) { c.fillStyle = 'rgba(60,50,30,.25)'; c.fillRect(x + w * .12, y + h * .1 + k * h * .12, w * .76, h * .07); c.fillStyle = '#2a2a2a'; c.fillRect(x + w * .3, y + h * .13 + k * h * .12, w * .4, 4); }
    if (o.led) { c.fillStyle = '#6ad04a'; c.beginPath(); c.arc(x + w * .82, y + h * .86, 5, 0, 7); c.fill(); glow(c, x + w * .82, y + h * .86, 30, '#6ad04a', .4); } };

  // ---------- CRT close-up (screen content is drawn live inside SCREEN) ----------
  ENV.crtCU = (ctx, r, W, H) => { const c = ctx;
    { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2c3446'); g.addColorStop(.7, '#3a3e4a'); g.addColorStop(1, '#2a2a30'); c.fillStyle = g; c.fillRect(0, 0, W, H); }
    // soft background lab: pegboard + shelves, out of focus
    { const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const o = oc.getContext('2d'); pegboard(o, r, 0, 60, W, 820); for (const [k, x, s] of [['wrench', 160, 1.2], ['coil', 380, 1.1], ['pliers', 2200, 1.2], ['driver', 2380, 1.2], ['saw', 2050, 1]]) tool(o, r, k, x, 180, s); beigeBox(o, r, 2140, 560, 300, 420, { drives: 3, led: true }); beigeBox(o, r, 80, 620, 420, 300, { col: '#cfc6ae' }); c.save(); c.filter = 'blur(10px)'; c.drawImage(oc, 0, 0); c.restore(); }
    c.fillStyle = 'rgba(20,24,36,.35)'; c.fillRect(0, 0, W, H);
    // desk
    const dy = 1090; { const pts = [[0, dy], [W, dy], [W, H], [0, H]]; paintRegion(c, r, pts, '#6a5a4a', { density: 140, len: [40, 120], w: [3, 8], ang: 0, angJ: .05, al: .3, topLight: .12, botDark: -.25, var: 10 }); c.fillStyle = 'rgba(255,240,210,.18)'; c.fillRect(0, dy, W, 6); }
    // CRT body
    const X0 = 600, Y0 = 120, X1 = 1960, Y1 = 1130; c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse((X0 + X1) / 2 + 40, Y1 + 10, (X1 - X0) * .55, 40, 0, 0, 7); c.fill();
    { const g = c.createLinearGradient(X0, Y0, X0, Y1); g.addColorStop(0, '#e6dec8'); g.addColorStop(1, '#bfb498'); c.fillStyle = g; rrect(c, X0, Y0, X1 - X0, Y1 - Y0, 60); c.fill(); paintRegion(c, r, [[X0 + 30, Y0 + 20], [X1 - 30, Y0 + 20], [X1 - 30, Y1 - 20], [X0 + 30, Y1 - 20]], '#d6cdb4', { density: 60, al: .18, var: 6 }); c.strokeStyle = '#4a4232'; c.lineWidth = 6; rrect(c, X0, Y0, X1 - X0, Y1 - Y0, 60); c.stroke(); }
    c.fillStyle = 'rgba(255,255,255,.35)'; rrect(c, X0 + 24, Y0 + 16, X1 - X0 - 48, 14, 7); c.fill();
    // bezel recess + glass
    const S = ENV.crtScreen = [790, 245, 980, 715]; const [sx, sy, sw, sh] = S;
    c.fillStyle = '#9a9078'; rrect(c, sx - 46, sy - 44, sw + 92, sh + 88, 50); c.fill(); c.strokeStyle = '#5a5240'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#121a16'; rrect(c, sx, sy, sw, sh, 40); c.fill();
    // logo strip, buttons, LED, vents
    c.fillStyle = '#8a8270'; c.fillRect(sx + sw * .38, Y1 - 120, sw * .24, 16); for (let k = 0; k < 4; k++) { c.fillStyle = '#b8ae94'; c.strokeStyle = '#5a5240'; c.lineWidth = 3; rrect(c, X1 - 360 + k * 70, Y1 - 128, 46, 28, 6); c.fill(); c.stroke(); }
    c.fillStyle = '#6ad04a'; c.beginPath(); c.arc(X1 - 420, Y1 - 114, 9, 0, 7); c.fill(); glow(c, X1 - 420, Y1 - 114, 50, '#6ad04a', .5);
    c.strokeStyle = 'rgba(70,60,40,.5)'; c.lineWidth = 5; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(X0 + 60 + k * 20, Y1 - 60); c.lineTo(X0 + 60 + k * 20, Y1 - 150); c.stroke(); }
    // sticky note on the bezel
    c.save(); c.translate(X1 - 150, Y0 + 210); c.rotate(.12); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(-56, -50, 120, 120); c.fillStyle = '#f4e46a'; c.fillRect(-60, -56, 120, 120); c.strokeStyle = 'rgba(40,40,140,.7)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-40, -20); c.lineTo(36, -24); c.moveTo(-40, 6); c.lineTo(20, 4); c.moveTo(-40, 30); c.lineTo(30, 28); c.stroke(); c.restore();
    // keyboard + mouse
    { const kx = 760, ky = 1210; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(kx + 520, ky + 200, 620, 40, 0, 0, 7); c.fill(); c.fillStyle = '#d8cfb8'; poly(c, [[kx, ky + 220], [kx + 1060, ky + 220], [kx + 1000, ky], [kx + 60, ky]]); c.fill(); c.strokeStyle = '#5a5240'; c.lineWidth = 4; c.stroke();
      for (let row = 0; row < 4; row++) for (let k = 0; k < 15; k++) { const t = row / 4, x0 = kx + 70 - t * 30 + k * (62 + t * 4), y0 = ky + 18 + row * 50; c.fillStyle = '#ece4d0'; c.strokeStyle = 'rgba(80,70,50,.6)'; c.lineWidth = 2; rrect(c, x0, y0, 52 + t * 4, 38, 6); c.fill(); c.stroke(); }
      c.fillStyle = '#d8cfb8'; c.beginPath(); c.ellipse(2060, 1330, 70, 46, -.2, 0, 7); c.fill(); c.stroke(); c.strokeStyle = '#5a5240'; c.beginPath(); c.moveTo(2060, 1284); c.quadraticCurveTo(2100, 1180, 2000, 1120); c.stroke(); }
    // mug
    { const mx = 300, my = 1260; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(mx, my + 6, 110, 22, 0, 0, 7); c.fill(); c.fillStyle = '#2a5a8a'; c.fillRect(mx - 90, my - 190, 180, 196); c.beginPath(); c.ellipse(mx, my + 6, 90, 18, 0, 0, 7); c.fill(); c.fillStyle = '#3a2214'; c.beginPath(); c.ellipse(mx, my - 190, 90, 18, 0, 0, 7); c.fill(); c.strokeStyle = '#2a5a8a'; c.lineWidth = 22; c.beginPath(); c.arc(mx + 100, my - 100, 50, -1.2, 1.2); c.stroke(); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(mx - 70, my - 170, 18, 150); }
    glow(c, 1280, 600, 1100, '#6ac0a0', .1);
    ENV.impasto(ctx, r, W, H, { n: 70000, edge: 20 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .45 });
    // keep the screen clean after the paint pass (content is drawn live)
    c.fillStyle = '#101814'; rrect(c, sx, sy, sw, sh, 40); c.fill(); };

  // ---------- workbench close-up (the NV1 card is drawn live in the clear middle) ----------
  ENV.benchCU = (ctx, r, W, H) => { const c = ctx;
    pegboard(c, r, 0, 0, W, 800);
    for (const [k, x, y, s] of [['wrench', 180, 120, 1.3], ['pliers', 330, 110, 1.3], ['coil', 520, 120, 1.2], ['driver', 760, 100, 1.4], ['driver', 840, 110, 1.2], ['saw', 1900, 110, 1.2], ['wrench', 2120, 120, 1.1], ['pliers', 2260, 100, 1.2], ['coil', 2420, 140, 1]]) tool(c, r, k, x, y, s);
    // shelf with binders and a beige tower
    rect(c, r, 1000, 420, 760, 24, '#6a4a2e', { density: 40 }); for (let k = 0; k < 12; k++) { const col = ['#2a4a7a', '#7a2a2a', '#3a6a3a', '#d8cfb8', '#4a4a4a'][k % 5]; rect(c, r, 1010 + k * 56, 250 + (k % 3) * 10, 50, 170 - (k % 3) * 10, col, { density: 20, edge: false }); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(1018 + k * 56, 300, 34, 22); }
    beigeBox(c, r, 1450, 230, 260, 190, { drives: 1, led: true });
    // calendar: 1995
    { const x = 1830, y = 380; c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x + 8, y + 10, 220, 280); c.fillStyle = '#f6f0e2'; c.fillRect(x, y, 220, 280); c.fillStyle = '#c8402e'; c.fillRect(x, y, 220, 60); c.fillStyle = '#fff'; c.font = 'bold 40px Oswald, Arial'; c.textAlign = 'center'; c.fillText('1995', x + 110, y + 46); c.fillStyle = 'rgba(40,40,40,.6)'; for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) c.fillRect(x + 16 + j * 28, y + 84 + i * 36, 18, 18); c.strokeStyle = '#c8402e'; c.lineWidth = 4; c.beginPath(); c.arc(x + 25 + 3 * 28, y + 93 + 2 * 36, 18, 0, 7); c.stroke(); }
    // bench top in perspective
    const by = 780; { const pts = [[0, by], [W, by], [W, H], [0, H]]; paintRegion(c, r, pts, '#9a6e44', { density: 220, len: [60, 200], w: [4, 10], ang: 0, angJ: .03, al: .32, topLight: -.15, botDark: .1, var: 14 }); c.strokeStyle = 'rgba(60,36,18,.45)'; c.lineWidth = 3; for (let k = 0; k < 9; k++) { const y = by + Math.pow(k / 9, 1.6) * (H - by); c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      c.fillStyle = 'rgba(30,18,8,.35)'; c.fillRect(0, by, W, 30); c.fillStyle = '#6a4a2e'; c.fillRect(0, by - 14, W, 16); }
    // clutter at the edges
    { // soldering stand + iron
      const x = 300, y = 1100; c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, y + 10, 170, 34, 0, 0, 7); c.fill(); c.fillStyle = '#3a3a3a'; c.beginPath(); c.ellipse(x, y, 150, 30, 0, 0, 7); c.fill(); c.fillStyle = '#d8c060'; c.beginPath(); c.ellipse(x - 60, y - 6, 40, 12, 0, 0, 7); c.fill(); c.strokeStyle = '#9aa0a8'; c.lineWidth = 8; c.beginPath(); c.moveTo(x + 40, y - 10); for (let k = 0; k < 8; k++) c.lineTo(x + 40 + (k % 2 ? 30 : -10), y - 20 - k * 22); c.stroke(); c.save(); c.translate(x + 50, y - 120); c.rotate(-.7); c.fillStyle = '#2a6ac8'; c.fillRect(-20, -18, 200, 36); c.fillStyle = '#9aa0a8'; c.fillRect(-120, -6, 100, 12); c.restore(); }
    { // solder spool + resistors + screwdriver
      c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(560, 1320, 90, 22, 0, 0, 7); c.fill(); c.fillStyle = '#c8c8cc'; c.beginPath(); c.ellipse(560, 1290, 80, 50, 0, 0, 7); c.fill(); c.fillStyle = '#e8e8ee'; c.beginPath(); c.ellipse(560, 1270, 80, 50, 0, 0, 7); c.fill(); c.fillStyle = '#5a5a60'; c.beginPath(); c.ellipse(560, 1270, 24, 15, 0, 0, 7); c.fill();
      for (let k = 0; k < 7; k++) { const x = 2100 + k * 40, y = 1000 + (k % 3) * 30; c.strokeStyle = '#9aa0a8'; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 30, y); c.lineTo(x + 30, y); c.stroke(); c.fillStyle = '#d8b880'; c.beginPath(); c.roundRect(x - 12, y - 7, 24, 14, 6); c.fill(); for (let j = 0; j < 3; j++) { c.fillStyle = ['#c8402e', '#2a2a2a', '#d88a2a'][j]; c.fillRect(x - 8 + j * 6, y - 7, 3, 14); } }
      c.save(); c.translate(2200, 1300); c.rotate(-.25); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-150, 16, 320, 20); c.fillStyle = '#c8402e'; c.beginPath(); c.roundRect(-160, -18, 160, 36, 14); c.fill(); c.fillStyle = '#9aa0a8'; c.fillRect(0, -6, 170, 12); c.restore(); }
    { // anti-static bag + notebook with sketches
      c.save(); c.translate(2330, 880); c.rotate(.08); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-120, -60, 250, 150); c.fillStyle = '#d8a0b8'; c.fillRect(-130, -70, 250, 150); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-120, -60, 60, 130); c.restore();
      c.save(); c.translate(700, 900); c.rotate(-.06); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-150, -90, 320, 210); c.fillStyle = '#f6f0e0'; c.fillRect(-160, -100, 320, 210); c.strokeStyle = 'rgba(80,110,170,.5)'; c.lineWidth = 2; for (let k = 1; k < 9; k++) { c.beginPath(); c.moveTo(-150, -100 + k * 23); c.lineTo(150, -100 + k * 23); c.stroke(); } c.strokeStyle = '#2a2a3a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-120, 60); c.quadraticCurveTo(-40, -90, 40, 50); c.quadraticCurveTo(80, -40, 130, 40); c.stroke(); c.restore(); }
    // desk lamp at right, warm pool in the middle
    { c.strokeStyle = '#2a2a2a'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(1980, 1000); c.lineTo(2050, 620); c.lineTo(1800, 470); c.stroke(); c.fillStyle = '#2a2a2a'; c.beginPath(); c.ellipse(1980, 1006, 90, 22, 0, 0, 7); c.fill(); c.save(); c.translate(1780, 480); c.rotate(.5); c.fillStyle = '#3a6a4a'; c.beginPath(); c.moveTo(-60, 0); c.lineTo(60, 0); c.lineTo(110, 110); c.lineTo(-110, 110); c.closePath(); c.fill(); c.strokeStyle = '#1a2a1e'; c.lineWidth = 4; c.stroke(); c.fillStyle = '#fff6d0'; c.beginPath(); c.ellipse(0, 110, 110, 22, 0, 0, 7); c.fill(); c.restore(); }
    glow(c, 1280, 1060, 900, '#ffd890', .28); glow(c, 1700, 560, 300, '#fff2c0', .3);
    ENV.impasto(ctx, r, W, H, { n: 90000, edge: 22 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 7, vig: .42 }); };

  // ---------- PC games store wall (boxes drawn live on SHELVES) ----------
  ENV.storeWall = (ctx, r, W, H) => { const c = ctx;
    rect(c, r, 0, 0, W, H, '#e2dccf', { density: 300, var: 6 });
    c.fillStyle = 'rgba(120,110,90,.22)'; for (let y = 230; y < 1180; y += 34) c.fillRect(0, y, W, 6);
    // banner
    { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(380, 66, 1820, 150); const g = c.createLinearGradient(0, 50, 0, 200); g.addColorStop(0, '#d8402e'); g.addColorStop(1, '#a82a1e'); c.fillStyle = g; c.fillRect(370, 50, 1820, 150); c.strokeStyle = '#5a140e'; c.lineWidth = 6; c.strokeRect(370, 50, 1820, 150); c.fillStyle = '#fff6e0'; c.font = 'bold 104px Anton, Oswald, Impact'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('PC GAMES', 1280, 128); c.fillStyle = '#ffd24a'; c.font = 'bold 40px Oswald, Arial'; c.fillText('NEW RELEASES', 1980, 128); c.fillText('★ 1996 ★', 580, 128); }
    // shelves (lips at SHELF y values)
    ENV.storeShelves = [520, 830, 1140];
    for (const y of ENV.storeShelves) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(120, y + 10, W - 240, 30); rect(c, r, 110, y - 14, W - 220, 34, '#8a8f98', { density: 60, topLight: .3 }); c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(110, y - 14, W - 220, 5); for (let x = 200; x < W - 200; x += 260) { c.fillStyle = '#f6f2e8'; c.fillRect(x, y - 4, 70, 18); } }
    // carpet
    { const pts = [[0, 1190], [W, 1190], [W, H], [0, H]]; paintRegion(c, r, pts, '#3a4a6a', { density: 200, len: [6, 20], w: [3, 6], ang: 0, angJ: 1, al: .35, var: 18 }); for (let i = 0; i < 2600; i++) { c.fillStyle = r() < .5 ? 'rgba(200,60,60,.35)' : 'rgba(240,200,80,.3)'; c.fillRect(r() * W, 1190 + r() * 250, 4, 3); } c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(0, 1180, W, 16); }
    // fluorescent light
    glow(c, 1280, -100, 1500, '#f4fbff', .3); glow(c, 600, 300, 700, '#fffbe8', .1);
    ENV.impasto(ctx, r, W, H, { n: 70000, edge: 20 }); P.finish(ctx, r, W, H, { oil: 0, canvas: 7, grain: 6, vig: .38 }); };
})(window);
window.PLATES = {
  crt_cu: (c, r, W, H) => ENV.crtCU(c, r, W, H),
  bench_cu: (c, r, W, H) => ENV.benchCU(c, r, W, H),
  store_wall: (c, r, W, H) => ENV.storeWall(c, r, W, H),
};
