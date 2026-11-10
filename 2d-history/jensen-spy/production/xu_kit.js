// Kids Who Hacked pt2 (XU) props on top of TW (pt1 kit): car, consoles, dev kits, CRT TV, gamer-tag roster cards,
// the company name-tile wall, blueprint, auction page, parcel, discs, news ticker, FBI badge, CCTV, plane, cell door, gavel, cast.
(function (G) {
  const K = G.KIT, E = K.E, TW = G.TW, INK = TW.INK, rr = TW.rr, txt = TW.txt, pop = TW.pop, fade = TW.fade;
  const NEON = '#5ad83a', DARK = '#0b120c';
  const XU = G.XU = { NEON, DARK };
  // neon-green console-world backdrop (screen space)
  XU.bg = (c, lt, hue = '90,216,58') => TW.techBG(c, lt, hue);
  // ---- side-view family car. x,y = centre at road level, s=1 -> 4.5 m long at 205 u/m (920 u). wheel spin from distance travelled
  XU.car = (c, x, y, s, col, dist = 0, opts = {}) => { const L = 920, h = 300; c.save(); c.translate(x, y); c.scale(s * (opts.flip ? -1 : 1), s);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 4, L * .55, 26, 0, 0, 7); c.fill();
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-L / 2, -60); c.lineTo(-L / 2 + 20, -150); c.lineTo(-L * .26, -165); c.lineTo(-L * .16, -h + 10); c.lineTo(L * .2, -h + 10); c.lineTo(L * .33, -170); c.lineTo(L / 2 - 10, -150); c.lineTo(L / 2, -60); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#9ec4dc'; c.beginPath(); c.moveTo(-L * .22, -170); c.lineTo(-L * .14, -h + 30); c.lineTo(L * .01, -h + 30); c.lineTo(L * .01, -170); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(L * .04, -170); c.lineTo(L * .04, -h + 30); c.lineTo(L * .18, -h + 30); c.lineTo(L * .29, -170); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-L * .2, -h + 40, 30, 90);
    if (opts.faces) opts.faces(c); // heads drawn in the windows
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(L * .025, -165); c.lineTo(L * .025, -60); c.stroke(); c.fillStyle = '#d8d8d8'; c.fillRect(-L / 2 - 6, -90, 40, 22); c.fillRect(L / 2 - 30, -90, 36, 22); c.fillStyle = '#ffe9a0'; c.fillRect(L / 2 - 26, -130, 22, 26); c.fillStyle = '#c0302a'; c.fillRect(-L / 2 + 2, -130, 18, 26);
    for (const wx of [-L * .3, L * .3]) { c.save(); c.translate(wx, -46); c.fillStyle = '#1a1a1e'; c.beginPath(); c.arc(0, 0, 62, 0, 7); c.fill(); c.fillStyle = '#a8acb4'; c.beginPath(); c.arc(0, 0, 32, 0, 7); c.fill(); c.rotate(dist / 62); c.strokeStyle = '#4a4e56'; c.lineWidth = 7; for (let k = 0; k < 5; k++) { c.rotate(Math.PI * 2 / 5); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 30); c.stroke(); } c.restore(); }
    c.restore(); };
  // car motion: from x0 to x1 between t0 and t0+dur with ease-out stop. returns {x, dist}
  XU.drive = (lt, x0, x1, t0, dur) => { const u = E.out(K.seg(lt, t0, t0 + dur)); const x = x0 + (x1 - x0) * u; return { x, dist: Math.abs(x - x0) }; };
  // ---- original Xbox: chunky black box with a green jewel. s=1 -> 320 u wide
  XU.xbox = (c, x, y, s = 1, glow = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 4, 180, 16, 0, 0, 7); c.fill();
    c.fillStyle = '#16181a'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -160, -110, 320, 110, 18); c.fill(); c.stroke(); c.fillStyle = '#26292c'; rr(c, -150, -104, 300, 30, 10); c.fill();
    c.fillStyle = '#2f3a2f'; c.beginPath(); c.arc(0, -66, 34, 0, 7); c.fill(); c.fillStyle = `rgba(90,216,58,${.5 + glow * .5})`; c.beginPath(); c.arc(0, -66, 22, 0, 7); c.fill(); if (glow > 0) TW.glow(c, 0, -66, 120, '90,216,58', .35 * glow);
    txt(c, 'X', 0, -66, 26, '#0b120c', 'center', 'Anton'); c.fillStyle = '#3a3e42'; c.fillRect(-140, -40, 90, 12); c.restore(); };
  // Xbox 360-style dev kit: white box with a red DEV KIT sticker
  XU.devkit = (c, x, y, s = 1, rot = 0, opts = {}) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -146, -36, 300, 80, 12); c.fill();
    c.fillStyle = opts.col || '#e6e8ea'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -150, -44, 300, 80, 12); c.fill(); c.stroke(); c.fillStyle = '#c8ccd0'; c.fillRect(-140, -6, 280, 6);
    c.fillStyle = NEON; c.beginPath(); c.arc(110, -18, 10, 0, 7); c.fill(); if (opts.label !== false) { c.save(); c.translate(-40, -14); c.rotate(-.06); c.fillStyle = '#c0302a'; rr(c, -62, -16, 124, 32, 4); c.fill(); txt(c, 'DEV KIT', 0, 1, 22, '#fff', 'center', 'Anton'); c.restore(); } c.restore(); };
  // game controller (big original style)
  XU.pad = (c, x, y, s = 1, rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#1e2022'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.ellipse(-40, 10, 46, 52, -.4, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(40, 10, 46, 52, .4, 0, 7); c.fill(); c.stroke(); rr(c, -60, -30, 120, 50, 20); c.fill();
    [['#3ac04a', 30, -6], ['#e04040', 46, 6], ['#3a7ae0', 14, 6], ['#e8c23a', 30, 18]].forEach(([cc, bx, by]) => { c.fillStyle = cc; c.beginPath(); c.arc(bx, by, 7, 0, 7); c.fill(); }); c.fillStyle = '#3a3e42'; c.beginPath(); c.arc(-30, 0, 12, 0, 7); c.fill(); c.restore(); };
  // CRT TV on a stand with live screen content fn(c, w, h)
  XU.crt = (c, x, y, w, h, fn) => { c.save(); c.fillStyle = '#2a2a2e'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, x - 30, y - 30, w + 60, h + 80, 26); c.fill(); c.stroke(); c.fillStyle = '#1e1e22'; rr(c, x + w * .25, y + h + 50, w * .5, 30, 8); c.fill();
    c.save(); rr(c, x, y, w, h, 30); c.clip(); c.translate(x, y); c.fillStyle = '#0a1410'; c.fillRect(0, 0, w, h); fn && fn(c, w, h); c.globalAlpha = .1; c.fillStyle = '#fff'; for (let yy = 0; yy < h; yy += 4) c.fillRect(0, yy, w, 1); c.restore();
    c.fillStyle = '#4a4a50'; c.beginPath(); c.arc(x + w + 4, y + h + 26, 8, 0, 7); c.fill(); c.restore(); };
  // simple game world for TV screens: hills + sky; weather 0 rain .. 1 snow
  XU.gameWorld = (c, w, h, lt, weather = -1) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, weather >= .5 ? '#9aa8b8' : '#3a5a8a'); g.addColorStop(1, '#a8c4d8'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = weather >= .5 ? '#e8eef4' : '#4a7a3a'; c.beginPath(); c.moveTo(0, h * .7); for (let x = 0; x <= w; x += 20) c.lineTo(x, h * .7 - Math.sin(x * .02 + 1) * h * .1); c.lineTo(w, h); c.lineTo(0, h); c.fill();
    c.fillStyle = '#2a4a2a'; c.fillRect(w * .62, h * .5, w * .05, h * .2); c.fillStyle = '#7a8a9a'; rr(c, w * .3, h * .45, w * .12, h * .22, 6); c.fill(); // a soldier-ish block + a tree
    if (weather >= 0) for (let k = 0; k < 60; k++) { const px = (k * 53 + lt * (weather >= .5 ? 30 : 10)) % w, py = (k * 37 + lt * (weather >= .5 ? 60 : 420)) % h; if (weather >= .5) { c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.arc(px, py, 3, 0, 7); c.fill(); } else { c.strokeStyle = 'rgba(200,220,255,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, py); c.lineTo(px - 4, py + 16); c.stroke(); } } };
  // ---- gamer-tag roster card. flip 0..1: front (neon tag) turns to a grey mugshot silhouette with ARRESTED
  XU.roster = (c, x, y, tag, sub, a, flip = 0, opts = {}) => { if (a <= 0) return; const w = opts.w ?? 330, h = opts.h ?? 440; c.save(); c.translate(x, y); c.scale(a, a); c.rotate(opts.rot ?? 0);
    const f = Math.abs(Math.cos(flip * Math.PI)), back = flip > .5; c.scale(Math.max(.02, f), 1);
    c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -w / 2 + 10, -h / 2 + 14, w, h, 20); c.fill(); c.fillStyle = back ? '#c8ccd2' : '#0f1a10'; c.strokeStyle = back ? INK : NEON; c.lineWidth = 7; rr(c, -w / 2, -h / 2, w, h, 20); c.fill(); c.stroke();
    if (!back) { TW.glow(c, 0, -h * .12, w * .7, '90,216,58', .18); c.fillStyle = '#1e3a20'; c.beginPath(); c.arc(0, -h * .14, w * .26, 0, 7); c.fill(); c.strokeStyle = NEON; c.lineWidth = 5; c.stroke();
      c.fillStyle = opts.avatar || '#5ad83a'; c.beginPath(); c.arc(0, -h * .2, w * .1, 0, 7); c.fill(); c.beginPath(); c.ellipse(0, -h * .04, w * .16, w * .1, 0, Math.PI, 0); c.fill();
      txt(c, tag, 0, h * .18, Math.min(62, w * 1.5 / Math.max(4, tag.length)), '#eaffdf', 'center', 'Anton'); txt(c, sub, 0, h * .32, 26, '#9ad88a', 'center', 'Oswald');
    } else { c.fillStyle = '#9aa0a8'; for (let k = 0; k < 6; k++) c.fillRect(-w / 2 + 14, -h / 2 + 30 + k * 40, w - 28, 3); c.fillStyle = '#3a3e46'; c.beginPath(); c.arc(0, -h * .16, w * .14, 0, 7); c.fill(); c.beginPath(); c.ellipse(0, h * .06, w * .24, w * .16, 0, Math.PI, 0); c.fill();
      c.fillStyle = INK; rr(c, -w * .36, h * .12, w * .72, 56, 6); c.fill(); txt(c, tag, 0, h * .12 + 28, 34, '#fff', 'center', 'Anton'); c.save(); c.translate(0, h * .36); c.rotate(-.12); c.strokeStyle = TW.RED; c.lineWidth = 5; c.strokeRect(-w * .38, -26, w * .76, 52); txt(c, 'ARRESTED', 0, 2, 38, TW.RED, 'center', 'Anton'); c.restore(); }
    c.restore(); };
  // ---- the wall of company name tiles (names only). greens[k] = time tile k turns green
  XU.NAMES = ['MICROSOFT', 'EPIC GAMES', 'EA', 'VALVE', 'ACTIVISION', 'BLIZZARD', 'INTEL', 'AMD', 'DISNEY', 'WARNER BROS', 'GOOGLE', 'US ARMY SIM'];
  XU.tile = (c, x, y, w, h, name, g, a = 1) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); const fl = Math.abs(Math.cos(g * Math.PI)), on = g > .5; c.scale(1, Math.max(.03, fl));
    c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -w / 2 + 8, -h / 2 + 10, w, h, 12); c.fill(); c.fillStyle = on ? '#13361a' : '#e9ecef'; c.strokeStyle = on ? NEON : INK; c.lineWidth = on ? 7 : 5; rr(c, -w / 2, -h / 2, w, h, 12); c.fill(); c.stroke();
    txt(c, name, 0, on ? -8 : 2, Math.min(h * .36, w * 1.6 / Math.max(5, name.length)), on ? '#dfffd2' : '#2a2e36', 'center', 'Anton'); if (on) txt(c, 'INSIDE ✓', 0, h * .3, h * .16, NEON, 'center', 'Oswald'); c.restore(); };
  XU.wall = (c, lt, greens, opts = {}) => { const cols = opts.cols ?? 4, w = opts.w ?? 380, h = opts.h ?? 150, gx = opts.gx ?? 420, gy = opts.gy ?? 190, names = opts.names || XU.NAMES, x0 = opts.x0 ?? 960 - (cols - 1) * gx / 2, y0 = opts.y0 ?? 320;
    names.forEach((n, k) => { const x = x0 + (k % cols) * gx, y = y0 + Math.floor(k / cols) * gy + Math.sin(lt * 1.2 + k) * 3, a = pop(lt, (opts.in ?? 0) + k * (opts.stagger ?? .05), .4), g = greens && greens[k] != null ? E.io(K.seg(lt, greens[k], greens[k] + .45)) : 0;
      XU.tile(c, x, y, w, h, n, g, a); if (g > .5 && g < 1) TW.glow(c, x, y, 220, '90,216,58', .4 * (1 - g)); }); };
  // ---- blueprint sheet unrolling (u 0..1) with a console outline and a stamp
  XU.blueprint = (c, x, y, w, h, u, lt, label = 'DURANGO') => { if (u <= 0) return; c.save(); c.translate(x, y); const ww = w * E.out(u); c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(-w / 2 + 14, -h / 2 + 16, ww, h);
    c.save(); c.beginPath(); c.rect(-w / 2, -h / 2, ww, h); c.clip(); c.fillStyle = '#1d4a8a'; c.fillRect(-w / 2, -h / 2, w, h); c.strokeStyle = 'rgba(200,225,255,.18)'; c.lineWidth = 1.5; for (let gx = -w / 2; gx < w / 2; gx += 40) { c.beginPath(); c.moveTo(gx, -h / 2); c.lineTo(gx, h / 2); c.stroke(); } for (let gy = -h / 2; gy < h / 2; gy += 40) { c.beginPath(); c.moveTo(-w / 2, gy); c.lineTo(w / 2, gy); c.stroke(); }
      c.strokeStyle = '#e8f2ff'; c.lineWidth = 4; c.strokeRect(-w * .3, -h * .18, w * .6, h * .36); c.strokeRect(-w * .26, -h * .12, w * .2, h * .24); c.beginPath(); c.arc(w * .14, 0, h * .1, 0, 7); c.stroke(); c.setLineDash([12, 8]); c.beginPath(); c.moveTo(-w * .3, h * .26); c.lineTo(w * .3, h * .26); c.stroke(); c.setLineDash([]);
      txt(c, 'NEXT-GEN CONSOLE · CONFIDENTIAL', -w / 2 + 30, -h / 2 + 40, 28, '#cfe2ff', 'left', 'Oswald'); c.restore();
    c.fillStyle = '#e8f2ff'; c.beginPath(); c.ellipse(-w / 2 + ww, 0, 18, h / 2 + 6, 0, 0, 7); c.fill(); c.restore(); };
  // ---- auction page with climbing bid
  XU.auction = (c, x, y, w, h, bid, lt, opts = {}) => TW.win(c, x, y, w, h, opts.title || 'auction site · electronics', '#3a5a9a', (cc, ww, hh) => { cc.fillStyle = '#fbfbfd'; cc.fillRect(0, 0, ww, hh);
    cc.fillStyle = '#20242c'; rr(cc, 40, 40, ww * .42, hh - 80, 14); cc.fill(); XU.xboxOne(cc, 40 + ww * .21, hh * .62, ww * .0012 * 1.0 * 600 / 600); txt(cc, 'PROTOTYPE · RARE', 40 + ww * .21, 90, 30, '#9ad88a', 'center', 'Anton');
    txt(cc, opts.item || 'Next-gen console prototype', ww * .5, 80, 40, INK, 'left', 'Anton'); txt(cc, 'Current bid', ww * .5, 170, 30, '#6a7080'); txt(cc, '$' + Math.round(bid).toLocaleString('en-US'), ww * .5, 240, 84, '#1a7a2a', 'left', 'Anton');
    txt(cc, `${Math.round(bid / 700)} bids · watchers ${Math.round(bid / 90)}`, ww * .5, 320, 28, '#6a7080'); cc.fillStyle = '#3a6ad0'; rr(cc, ww * .5, hh - 140, ww * .3, 70, 35); cc.fill(); txt(cc, 'PLACE BID', ww * .65, hh - 105, 32, '#fff', 'center', 'Anton'); });
  // next-gen console (black slab) used for the prototype
  XU.xboxOne = (c, x, y, s = 1, glow = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 4, 210, 16, 0, 0, 7); c.fill(); c.fillStyle = '#121416'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -200, -96, 400, 96, 8); c.fill(); c.stroke();
    c.fillStyle = '#26292c'; c.fillRect(-196, -92, 220, 88); c.strokeStyle = '#30343a'; c.lineWidth = 2; for (let k = 0; k < 14; k++) { c.beginPath(); c.moveTo(40 + k * 11, -90); c.lineTo(40 + k * 11, -6); c.stroke(); }
    c.fillStyle = `rgba(230,240,255,${.6 + glow * .4})`; c.beginPath(); c.arc(-160, -48, 10, 0, 7); c.fill(); if (glow > 0) TW.glow(c, -160, -48, 120, '200,230,255', .4 * glow); c.restore(); };
  // ---- parcel + discs
  XU.disc = (c, x, y, r, rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); const g = c.createConicGradient ? c.createConicGradient(0, 0, 0) : null; if (g) { ['#c8d0e0', '#a8e0ff', '#e0c8ff', '#c8ffd8', '#c8d0e0'].forEach((cc, k) => g.addColorStop(k / 4, cc)); c.fillStyle = g; } else c.fillStyle = '#c8d0e0';
    c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke(); c.fillStyle = '#0b120c'; c.beginPath(); c.arc(0, 0, r * .16, 0, 7); c.fill(); c.restore(); };
  XU.parcel = (c, x, y, s, tape, lt, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 10, 230, 22, 0, 0, 7); c.fill(); c.fillStyle = '#c89a62'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-210, -170, 420, 180); c.strokeRect(-210, -170, 420, 180);
    c.fillStyle = '#b4874f'; c.fillRect(-210, -170, 420, 30); if (tape > 0) { c.fillStyle = 'rgba(230,220,180,.85)'; c.fillRect(-210, -96, 420 * tape, 34); }
    if (opts.label) { c.save(); c.rotate(-.05); c.fillStyle = '#fff'; c.fillRect(-150, -56, 300, 50); txt(c, opts.label, 0, -30, 36, '#2a2a6a', 'center', 'Caveat'); c.restore(); } c.restore(); };
  // ---- news ticker strip (screen space)
  XU.ticker = (c, y, text, lt, a = 1) => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = '#b8202a'; c.fillRect(0, y, 1920, 90); c.fillStyle = '#fff'; c.fillRect(0, y, 260, 90); txt(c, 'BREAKING', 130, y + 46, 46, '#b8202a', 'center', 'Anton');
    c.beginPath(); c.rect(270, y, 1650, 90); c.clip(); const x = 1920 - ((lt * 260) % 2600); for (const dx of [0, 1300]) txt(c, text + '   •   ', x + dx, y + 46, 50, '#fff', 'left', 'Anton'); c.restore(); };
  // ---- FBI-style badge (generic shield)
  XU.badge = (c, x, y, s, a) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(s * a, s * a); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(10, 140, 140, 20, 0, 0, 7); c.fill();
    c.fillStyle = '#d8b44a'; c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(0, -140); c.lineTo(120, -90); c.lineTo(100, 60); c.lineTo(0, 140); c.lineTo(-100, 60); c.lineTo(-120, -90); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#1f3a6a'; c.beginPath(); c.arc(0, -10, 62, 0, 7); c.fill(); txt(c, 'FBI', 0, -8, 54, '#f4e8c0', 'center', 'Anton'); txt(c, 'FEDERAL AGENT', 0, 92, 18, INK, 'center', 'Anton'); c.restore(); };
  // ---- CCTV frame (screen space): fn draws the scene; adds REC + timestamp + scanlines
  XU.cctv = (c, x, y, w, h, lt, fn, opts = {}) => { c.save(); c.fillStyle = '#111'; c.fillRect(x - 12, y - 12, w + 24, h + 24); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.translate(x, y); fn && fn(c, w, h);
    c.globalCompositeOperation = 'saturation'; c.fillStyle = '#888'; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over'; c.globalAlpha = .12; c.fillStyle = '#fff'; for (let yy = 0; yy < h; yy += 4) c.fillRect(0, yy, w, 1); c.globalAlpha = 1;
    if (Math.sin(lt * 6) > 0) { c.fillStyle = '#e02020'; c.beginPath(); c.arc(40, 40, 12, 0, 7); c.fill(); } txt(c, 'REC  CAM 07', 62, 40, 28, '#fff', 'left', 'Oswald'); txt(c, opts.stamp || '02:14:37', w - 30, h - 34, 28, '#fff', 'right', 'Oswald'); c.restore(); };
  // ---- airliner side view (screen or world), heading right
  XU.plane = (c, x, y, s, rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#f2f4f8'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-260, -10); c.quadraticCurveTo(-270, -40, -220, -40); c.lineTo(200, -40); c.quadraticCurveTo(270, -36, 280, 0); c.quadraticCurveTo(270, 20, 200, 22); c.lineTo(-230, 22); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#2a5aa0'; c.beginPath(); c.moveTo(-240, -38); c.lineTo(-280, -140); c.lineTo(-220, -140); c.lineTo(-160, -40); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#d8dce4'; c.beginPath(); c.moveTo(-20, 0); c.lineTo(90, 0); c.lineTo(-60, 90); c.lineTo(-110, 90); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#2a3a4a'; for (let k = 0; k < 12; k++) { c.beginPath(); c.arc(-170 + k * 30, -16, 6, 0, 7); c.fill(); } c.fillStyle = '#2a5aa0'; c.fillRect(-250, 4, 470, 6); c.restore(); };
  // ---- cell door sliding shut: u 0 open .. 1 shut (screen space)
  XU.cellDoor = (c, x, y, w, h, u) => { c.save(); c.fillStyle = '#2a2c30'; c.fillRect(x, y, w, h); c.fillStyle = '#4a4e56'; c.fillRect(x, y + h - 40, w, 40); const dx = (1 - E.back(K.clamp(u))) * w; c.translate(x + dx, y);
    c.fillStyle = '#6a6e76'; c.fillRect(0, 0, 30, h); c.fillRect(0, 0, w, 30); c.fillRect(0, h * .5, w, 22); for (let k = 0; k < 7; k++) { c.fillStyle = '#7a7e86'; c.fillRect(30 + k * (w - 40) / 7, 0, 18, h); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(32 + k * (w - 40) / 7, 0, 5, h); } c.restore(); };
  // ---- gavel striking at time at (world or screen); x,y = block centre
  XU.gavel = (c, x, y, s, lt, hits) => { let ang = -.9; for (const t of hits) { const u = lt - t; if (u > -.25 && u < 0) ang = -.9 + .9 * E.inn(1 + u / .25); else if (u >= 0 && u < .35) ang = -.9 * E.out(u / .35) * 0 + (u < .08 ? 0 : -.9 * E.out((u - .08) / .27)); }
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 30, 130, 16, 0, 0, 7); c.fill(); c.fillStyle = '#6a4024'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.ellipse(0, 10, 110, 26, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#7e5030'; c.fillRect(-110, 0, 220, 14);
    c.save(); c.translate(180, -10); c.rotate(ang); c.fillStyle = '#7e5030'; c.fillRect(-150, -8, 150, 16); c.strokeRect(-150, -8, 150, 16); c.save(); c.translate(-170, -10); c.fillStyle = '#6a4024'; rr(c, -40, -36, 80, 72, 10); c.fill(); c.stroke(); c.fillStyle = '#d8b44a'; c.fillRect(-40, -8, 80, 10); c.restore(); c.restore(); c.restore(); };
  // ---- legal letter envelope (world or screen)
  XU.letter = (c, x, y, s, rot = 0, opts = {}) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-116, -66, 240, 140); c.fillStyle = '#f4efe2'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-120, -72, 240, 140); c.strokeRect(-120, -72, 240, 140);
    c.beginPath(); c.moveTo(-120, -72); c.lineTo(0, 10); c.lineTo(120, -72); c.stroke(); c.save(); c.translate(40, 30); c.rotate(-.1); c.strokeStyle = '#b8202a'; c.lineWidth = 4; c.strokeRect(-60, -18, 120, 36); txt(c, opts.word || 'LEGAL', 0, 2, 26, '#b8202a', 'center', 'Anton'); c.restore(); c.restore(); };
  // ---- helicopter outline on a radar-green military screen (screen space content)
  XU.heli = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#9aff7a'; c.lineWidth = 5; c.beginPath(); c.ellipse(0, 0, 150, 46, 0, 0, 7); c.stroke(); c.beginPath(); c.moveTo(140, -10); c.lineTo(360, -20); c.lineTo(380, -70); c.moveTo(360, -20); c.lineTo(370, 20); c.stroke();
    c.beginPath(); c.moveTo(-60, 46); c.lineTo(-80, 80); c.lineTo(80, 80); c.lineTo(60, 46); c.stroke(); c.beginPath(); c.moveTo(0, -46); c.lineTo(0, -80); c.stroke(); const b = Math.sin(lt * 30); c.beginPath(); c.moveTo(-300 * b, -84); c.lineTo(300 * b, -76); c.stroke(); c.beginPath(); c.arc(-90, -6, 30, 0, 7); c.stroke(); c.restore(); };
  // ---- cast (Gumball style, names from public court records, no likeness)
  const L6 = () => G.RIG6.LOOKS;
  const teen = (o) => ({ look: Object.assign({}, L6().teen, { style: 'gumball' }, o) });
  XU.DAVID = () => teen({ hair: 'messy', hairCol: '#4a3020', streak: '#7a5034', topCol: '#3a7a3a', inner: '#1e1e28', innerStripe: '#5ad83a', legs: '#2a3044', shoes: '#33466e' });
  XU.DAVID_OLD = () => teen({ hair: 'messy', hairCol: '#4a3020', streak: '#7a5034', top: 'jacket', topCol: '#2f3a30', inner: '#e8e8e2', legs: '#2a3044', shoes: '#231a14', beard: true });
  XU.DYLAN = () => teen({ hair: 'spiky', hairCol: '#d8b060', streak: '#f0d088', topCol: '#1e1e24', inner: '#3a3a44', innerStripe: '#e83a2a', legs: '#3a4a66', skin: '#f4c7a1' });
  XU.SONIC = () => ({ look: Object.assign({}, L6().engineer, { style: 'gumball', hair: 'neat', hairCol: '#1a1410', streak: '#3a2a20', skin: '#c99068', beard: true, topCol: '#4a5a7a', sleeveCol: '#2a3448', collarCol: '#2a3448', legs: '#3a3e48' }) });
  XU.JUSTIN = () => ({ look: Object.assign({}, L6().banker, { style: 'gumball', hair: 'neat', hairCol: '#6a4a2a', topCol: '#3a3a42', inner: '#c8c8d0', tie: null, legs: '#30343c', skin: '#f2c6a0' }) });
  XU.AUSTIN = () => teen({ hair: 'messy', hairCol: '#2a1a14', streak: '#4a3020', topCol: '#c8562a', inner: '#e8e2d0', legs: '#3a4a66', skin: '#e9bc94' });
  XU.NATHAN = () => teen({ hair: 'swept', hairCol: '#3a2a20', streak: '#5a4030', topCol: '#5a4a8a', inner: '#e8e2d0', legs: '#2a3044', skin: '#f0c09a' });
  XU.FAN = () => teen({ hair: 'messy', hairCol: '#1d1712', streak: '#3a2a20', topCol: '#2a2e3a', inner: '#1a1a20', innerStripe: '#7a8090', legs: '#202430', skin: '#d9a57c' });
  XU.DAD = () => ({ look: Object.assign({}, L6().banker, { style: 'gumball', hair: 'neat', hairCol: '#5a4a3a', topCol: '#6a5a4a', inner: '#e8e2d0', tie: null, legs: '#3a3e48', glasses: true, skin: '#f2c6a0' }) });
  XU.OFFICER = (k = 0) => ({ look: Object.assign({}, L6().banker, { style: 'gumball', hair: 'neat', hairCol: ['#2a1d14', '#1d1712', '#6a5a4a'][k % 3], topCol: '#1f2e48', inner: '#2a3a58', tie: '#141c2c', legs: '#1f2e48', skin: ['#e9bc94', '#c99068', '#f2c6a0'][k % 3] }), hat: XU.cap });
  XU.AGENT = (k = 0) => ({ look: Object.assign({}, L6().banker, { style: 'gumball', hair: 'neat', topCol: '#20242e', inner: '#e8eef6', tie: '#2a2e3a', legs: '#20242e', skin: ['#e9bc94', '#c99068', '#f2c6a0'][k % 3] }) });
  // officer's peaked cap via the rig hat hook
  XU.cap = (ctx, X, Y, r) => { ctx.save(); ctx.fillStyle = '#18233a'; ctx.strokeStyle = TW.INK; ctx.lineWidth = r * .07; ctx.beginPath(); ctx.ellipse(X, Y - r * .72, r * .98, r * .36, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0e1626'; ctx.beginPath(); ctx.ellipse(X + r * .12, Y - r * .62, r * 1.08, r * .16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#d8b44a'; ctx.beginPath(); ctx.arc(X, Y - r * .86, r * .13, 0, 7); ctx.fill(); ctx.restore(); };
  // helpline card (screen space)
  XU.helpline = (c, lt, at) => { const a = fade(lt, at, .8); if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = 'rgba(12,14,22,.86)'; rr(c, 460, 700, 1000, 190, 22); c.fill(); c.strokeStyle = '#9ad0ff'; c.lineWidth = 3; rr(c, 460, 700, 1000, 190, 22); c.stroke();
    txt(c, 'NEED HELP? YOU ARE NOT ALONE.', 960, 748, 44, '#fff', 'center', 'Anton'); txt(c, 'Call or text 988 (US)  ·  findahelpline.com', 960, 820, 40, '#cfe6ff', 'center', 'Oswald'); c.restore(); };
})(typeof window !== 'undefined' ? window : globalThis);
