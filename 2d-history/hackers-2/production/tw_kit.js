// Kids Who Hacked pt1 (TW) shared props: tweet cards and the "wall of famous accounts" (names only, never faces),
// screens and UI windows, phones, login pages, chat windows, the Bitcoin wallet meter, PHASE cards, stamps, the cast.
(function (G) {
  const K = G.KIT, E = K.E, INK = '#14121a', RED = '#e0403a', BLUE = '#1d9bf0', NEON = '#7a5cff', CYAN = '#3ad0ff', PAPER = '#f4f1ea';
  const TW = G.TW = { INK, RED, BLUE, NEON, CYAN, PAPER };
  const pop = (lt, at, d = .45) => E.back(K.seg(lt, at, at + d)); TW.pop = pop;
  const fade = (lt, at, d = .35) => K.clamp((lt - at) / d); TW.fade = fade;
  TW.glow = (c, x, y, rad, col, a) => { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(x, y, 0, x, y, rad); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2); c.restore(); };
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
  TW.rr = rr;
  const txt = (c, s, x, y, px, col = '#fff', al = 'left', fam = 'Oswald') => { c.font = `${px}px ${fam}`; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
  TW.txt = txt;
  // ---- dark tech backdrop (screen space) with a slow grid, floating particles and a colour wash
  TW.techBG = (c, lt, hue = '122,92,255', W = 1920, H = 1080) => { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0d0b1c'); g.addColorStop(1, '#05050c'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.strokeStyle = `rgba(${hue},.10)`; c.lineWidth = 1.5; const off = (lt * 18) % 80; for (let x = -80 + off; x < W; x += 80) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = -80 + off * .6; y < H; y += 80) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    for (let k = 0; k < 40; k++) { const x = (k * 197 + lt * (8 + k % 5 * 4)) % W, y = (k * 131 + Math.sin(lt * .5 + k) * 30 + H) % H; c.fillStyle = `rgba(${hue},${.15 + .15 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 3, 3); }
    TW.glow(c, W * .5, H * .45, 900, hue, .12); };
  // ---- monitor: bezel + clipped content drawn by fn(c, w, h); content coords start at (0,0)
  TW.monitor = (c, x, y, w, h, fn, opts = {}) => { c.save(); c.fillStyle = '#18161e'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, x - 18, y - 18, w + 36, h + 36, 16); c.fill(); c.stroke();
    if (opts.stand !== false) { c.fillStyle = '#18161e'; c.fillRect(x + w / 2 - 22, y + h + 18, 44, 70); c.beginPath(); c.ellipse(x + w / 2, y + h + 92, 120, 18, 0, 0, 7); c.fill(); c.stroke(); }
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.translate(x, y); c.fillStyle = opts.bg || '#0e1424'; c.fillRect(0, 0, w, h); fn && fn(c, w, h); c.globalAlpha = .07; c.fillStyle = '#fff'; for (let yy = 0; yy < h; yy += 4) c.fillRect(0, yy, w, 1); c.restore();
    c.globalAlpha = .12; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w * .35, y); c.lineTo(x, y + h * .5); c.fill(); c.restore(); };
  // ---- a window inside a screen: title bar + body
  TW.win = (c, x, y, w, h, title, col = '#2a2840', fn) => { c.save(); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, x + 10, y + 14, w, h, 14); c.fill(); c.fillStyle = '#f7f7fb'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, x, y, w, h, 14); c.fill(); c.stroke();
    c.fillStyle = col; rr(c, x, y, w, 52, 14); c.fill(); c.fillRect(x, y + 30, w, 22); c.strokeStyle = INK; c.lineWidth = 5; rr(c, x, y, w, h, 14); c.stroke();
    ['#ff5f57', '#febc2e', '#28c840'].forEach((cc, k) => { c.fillStyle = cc; c.beginPath(); c.arc(x + 28 + k * 28, y + 26, 9, 0, 7); c.fill(); }); txt(c, title, x + w / 2, y + 27, 26, '#fff', 'center');
    c.save(); c.beginPath(); c.rect(x, y + 52, w, h - 52); c.clip(); c.translate(x, y + 52); fn && fn(c, w, h - 52); c.restore(); c.restore(); };
  // ---- tweet card (names only). red = 0..1 how far it has flipped to the scam / hacked state
  TW.tweet = (c, x, y, w, name, body, red = 0, a = 1, opts = {}) => { if (a <= 0) return; const h = opts.h ?? w * .42; c.save(); c.translate(x, y); c.scale(a, a); c.translate(-w / 2, -h / 2);
    const flip = Math.abs(Math.cos(red * Math.PI)), hot = red > .5; c.translate(w / 2, 0); c.scale(Math.max(.02, flip), 1); c.translate(-w / 2, 0);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, 8, 12, w, h, 18); c.fill(); c.fillStyle = hot ? '#ffe9e6' : '#fff'; c.strokeStyle = hot ? RED : INK; c.lineWidth = hot ? 7 : 5; rr(c, 0, 0, w, h, 18); c.fill(); c.stroke();
    const av = h * .26; c.fillStyle = hot ? RED : (opts.avCol || '#8a94b0'); c.beginPath(); c.arc(av * 1.15, av * 1.15, av * .8, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 3; c.stroke();
    txt(c, name, av * 2.2, av * .95, h * .15, INK, 'left', 'Anton'); if (opts.tick !== false) { const tw = (c.measureText(name).width); c.fillStyle = opts.greyTick ? '#9aa0aa' : BLUE; c.beginPath(); c.arc(av * 2.2 + tw + h * .09, av * .95, h * .055, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(av * 2.2 + tw + h * .065, av * .95); c.lineTo(av * 2.2 + tw + h * .085, av * .95 + h * .022); c.lineTo(av * 2.2 + tw + h * .118, av * .95 - h * .025); c.stroke(); }
    const lines = (hot ? (opts.scam || 'Send me Bitcoin, I will send DOUBLE back!') : body).split('|'); lines.forEach((L, k) => txt(c, L, h * .1, av * 2.3 + k * h * .17, h * .12, hot ? '#8a1a14' : '#3a3a48', 'left', 'Oswald'));
    if (hot && opts.badge !== false) { c.save(); c.translate(w - h * .32, h * .22); c.rotate(.18); c.strokeStyle = RED; c.lineWidth = 5; rr(c, -h * .28, -h * .1, h * .56, h * .2, 6); c.stroke(); txt(c, 'HACKED', 0, 2, h * .12, RED, 'center', 'Anton'); c.restore(); }
    c.restore(); };
  // the wall of famous accounts (names only). flips[k] = time card k turns red
  TW.NAMES = ['Barack Obama', 'Joe Biden', 'Elon Musk', 'Bill Gates', 'Jeff Bezos', 'Kanye West', 'MrBeast', 'Apple', 'Uber', 'Binance', 'Coinbase', 'Gemini'];
  TW.wall = (c, lt, flips, opts = {}) => { const cols = opts.cols ?? 4, w = opts.w ?? 400, gx = opts.gx ?? 440, gy = opts.gy ?? 200, x0 = opts.x0 ?? 960 - (cols - 1) * gx / 2, y0 = opts.y0 ?? 300, names = opts.names || TW.NAMES;
    names.forEach((n, k) => { const x = x0 + (k % cols) * gx, y = y0 + Math.floor(k / cols) * gy + Math.sin(lt * 1.3 + k) * 4, a = pop(lt, (opts.in ?? 0) + k * (opts.stagger ?? .06), .4), f = flips && flips[k] != null ? E.io(K.seg(lt, flips[k], flips[k] + .5)) : 0;
      TW.tweet(c, x, y, w, n, opts.body || 'Just another normal day.', f, a, { avCol: `hsl(${k * 37},35%,60%)` }); if (f > .5 && f < 1) TW.glow(c, x, y, 220, '255,60,50', .35 * (1 - f)); }); };
  // ---- smartphone (portrait). fn draws its screen content in (0,0,w,h)
  TW.phone = (c, x, y, s, fn, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(opts.rot || 0); const w = 120, h = 230; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 6, -h / 2 + 10, w, h, 20); c.fill(); c.fillStyle = opts.body || '#1b1b22'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h / 2, w, h, 20); c.fill(); c.stroke();
    c.save(); rr(c, -w / 2 + 8, -h / 2 + 16, w - 16, h - 32, 10); c.clip(); c.translate(-w / 2 + 8, -h / 2 + 16); c.fillStyle = opts.scr || '#1a2a4a'; c.fillRect(0, 0, w - 16, h - 32); fn && fn(c, w - 16, h - 32); c.restore();
    c.fillStyle = '#333'; rr(c, -14, -h / 2 + 6, 28, 5, 3); c.fill(); c.restore(); };
  // desk phone handset ringing
  TW.deskPhone = (c, x, y, s, ring, lt, off = false) => { c.save(); c.translate(x + (ring ? Math.sin(lt * 60) * 3 : 0), y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 8, 80, 12, 0, 0, 7); c.fill();
    c.fillStyle = '#2a2a32'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -66, -46, 132, 52, 12); c.fill(); c.stroke(); for (let k = 0; k < 9; k++) { c.fillStyle = '#8a8a96'; c.fillRect(-36 + (k % 3) * 18, -38 + (k / 3 | 0) * 12, 12, 8); }
    if (!off) { c.fillStyle = '#3a3a44'; rr(c, -78, -78 - (ring ? Math.abs(Math.sin(lt * 30)) * 6 : 0), 156, 30, 14); c.fill(); c.stroke(); }
    if (ring) { c.strokeStyle = '#ffd24a'; c.lineWidth = 5; for (const sx of [-1, 1]) for (let k = 0; k < 2; k++) { c.beginPath(); c.arc(sx * 96, -60, 18 + k * 16, sx > 0 ? -.8 : Math.PI - .8 + 1.6 - 1.6, sx > 0 ? .8 : Math.PI + .8); c.stroke(); } }
    c.restore(); };
  // ---- speech bubble (screen or world)
  TW.bubble = (c, x, y, lines, a, opts = {}) => { if (a <= 0) return; const px = opts.px ?? 40; c.save(); c.translate(x, y); c.scale(a, a); c.font = `${px}px Oswald`; const L = lines.split('|'), w = Math.max(...L.map(s => c.measureText(s).width)) + px * 1.4, h = L.length * px * 1.3 + px * .8, tail = opts.tail ?? -1;
    c.fillStyle = opts.bg || '#fff'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -w / 2, -h, w, h, 24); c.fill(); c.stroke(); c.beginPath(); c.moveTo(tail * w * .2 - 18, -2); c.lineTo(tail * w * .32, 40); c.lineTo(tail * w * .2 + 18, -2); c.closePath(); c.fill(); c.stroke(); c.fillRect(tail * w * .2 - 15, -8, 30, 8);
    L.forEach((s, k) => txt(c, s, 0, -h + px * .4 + px * .65 + k * px * 1.3, px, opts.col || INK, 'center')); c.restore(); };
  // ---- chat window lines appear one by one. msgs = [[name, text, colour]]
  TW.chat = (c, w, h, msgs, lt, t0, dt, opts = {}) => { const lh = opts.lh ?? 74; let n = 0; msgs.forEach((m, k) => { const a = fade(lt, t0 + k * dt, .25); if (a <= 0) return; n = k; });
    const shift = Math.max(0, (n + 1) * lh - h + 20); msgs.forEach(([nm, t, col], k) => { const a = fade(lt, t0 + k * dt, .25); if (a <= 0) return; const y = 20 + k * lh - shift + (1 - a) * 20; c.globalAlpha = a; c.fillStyle = col || '#7a5cff'; c.beginPath(); c.arc(40, y + 26, 22, 0, 7); c.fill(); txt(c, nm, 76, y + 14, 24, col || '#7a5cff', 'left', 'Anton'); txt(c, t, 76, y + 44, 26, opts.dark ? '#e8e8f0' : '#2a2a38'); c.globalAlpha = 1; }); };
  // ---- login page (real vs fake twin)
  TW.login = (c, x, y, w, h, opts = {}) => { c.save(); c.translate(x, y); c.fillStyle = '#fff'; c.strokeStyle = opts.fake ? RED : INK; c.lineWidth = 6; rr(c, -w / 2, -h / 2, w, h, 18); c.fill(); c.stroke();
    c.fillStyle = '#e8ecf4'; c.fillRect(-w / 2 + 6, -h / 2 + 6, w - 12, 40); txt(c, opts.url || 'login.company.com', -w / 2 + 24, -h / 2 + 26, 22, opts.fake ? '#c0302a' : '#4a5a70');
    txt(c, 'STAFF SIGN-IN', 0, -h / 2 + 100, 40, INK, 'center', 'Anton'); for (let k = 0; k < 2; k++) { c.fillStyle = '#f2f4f8'; c.strokeStyle = '#a8b0c0'; c.lineWidth = 3; rr(c, -w * .38, -h / 2 + 150 + k * 80, w * .76, 56, 10); c.fill(); c.stroke(); if (opts.typed > k) txt(c, k ? '••••••••' : 'employee', -w * .34, -h / 2 + 178 + k * 80, 28, '#333'); }
    c.fillStyle = BLUE; rr(c, -w * .25, -h / 2 + 320, w * .5, 56, 28); c.fill(); txt(c, 'SIGN IN', 0, -h / 2 + 348, 28, '#fff', 'center', 'Anton'); c.restore(); };
  // ---- padlock
  TW.lock = (c, x, y, s, open = 0, col = '#e8b84a') => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 14; c.beginPath(); c.arc(0, -40 - open * 30, 34, Math.PI, 0); c.lineTo(34, -40 - open * 30 + (open ? 0 : 30)); c.stroke(); c.strokeStyle = '#c8ccd8'; c.lineWidth = 8; c.beginPath(); c.arc(0, -40 - open * 30, 34, Math.PI, 0); c.stroke();
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -50, -40, 100, 84, 12); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(0, -6, 10, 0, 7); c.fill(); c.fillRect(-4, -4, 8, 22); c.restore(); };
  // ---- Bitcoin coin
  TW.btc = (c, x, y, r, rot = 0) => { c.save(); c.translate(x, y); c.scale(Math.max(.15, Math.abs(Math.cos(rot))), 1); c.fillStyle = '#f7931a'; c.strokeStyle = '#8a4a0a'; c.lineWidth = r * .12; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#ffd08a'; c.beginPath(); c.arc(-r * .3, -r * .3, r * .3, 0, 7); c.globalAlpha = .4; c.fill(); c.globalAlpha = 1; txt(c, '₿', 0, r * .06, r * 1.2, '#fff', 'center', 'Anton'); c.restore(); };
  // ---- crypto wallet meter: fill 0..1, locked 0..1 (a clamp drops on)
  TW.wallet = (c, x, y, s, fill, lt, opts = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -150, -86, 316, 196, 26); c.fill(); c.fillStyle = '#5a3a2a'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -160, -100, 320, 200, 26); c.fill(); c.stroke();
    c.fillStyle = '#7a4e36'; rr(c, -160, -100, 320, 70, 26); c.fill(); c.stroke(); c.fillStyle = '#1a1420'; rr(c, -120, -10, 240, 70, 12); c.fill(); c.fillStyle = '#f7931a'; rr(c, -116, -6, 232 * K.clamp(fill), 62, 10); c.fill(); txt(c, opts.label || 'BTC WALLET', 0, -64, 34, '#ffe2b8', 'center', 'Anton');
    if (opts.amount) txt(c, opts.amount, 0, 26, 34, '#fff', 'center', 'Anton'); if (opts.locked > 0) { const d = (1 - E.back(K.clamp(opts.locked))) * -300; c.save(); c.translate(0, d); c.strokeStyle = '#c8ccd8'; c.lineWidth = 18; c.strokeRect(-178, -30, 356, 90); TW.lock(c, 0, 40, .85, 0, '#d8d8e0'); c.restore(); } c.restore(); };
  // ---- PHASE N card (screen space)
  TW.phase = (c, n, lt, at = .2, until = 99, x = 960, y = 210) => { const a = pop(lt, at, .5), o = 1 - K.seg(lt, until - .3, until); if (a <= 0 || o <= 0) return; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.rotate(-.03); c.fillStyle = RED; c.strokeStyle = INK; c.lineWidth = 8; rr(c, -260, -70, 520, 140, 18); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(-250, -62, 500, 30); txt(c, 'PHASE ' + n, 0, 6, 96, '#fff', 'center', 'Anton'); c.restore(); };
  // ---- rubber stamp (screen or world)
  TW.stamp = (c, s, x, y, lt, at, opts = {}) => { const u = K.seg(lt, at, at + .3); if (u <= 0) return; const sc = 1 + (1 - E.out(u)) * 1.4; c.save(); c.translate(x, y); c.rotate(opts.rot ?? -.14); c.scale(sc, sc); c.globalAlpha = Math.min(1, u * 2) * .92; c.strokeStyle = opts.col || RED; c.lineWidth = 10; c.font = `${opts.px ?? 110}px Anton`; const w = c.measureText(s).width + 60, h = (opts.px ?? 110) * 1.2; rr(c, -w / 2, -h / 2, w, h, 12); c.stroke(); txt(c, s, 0, 6, opts.px ?? 110, opts.col || RED, 'center', 'Anton'); c.restore(); };

  // ---- gaming / office chair. seatY = seat top (world), floorY = floor line. Draw it BEFORE the seated figure (live layer).
  TW.chair = (c, x, floorY, seatY, facing = 1, col = '#5a3aa0') => { c.save(); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x, floorY, 120, 18, 0, 0, 7); c.fill(); c.strokeStyle = TW.INK; c.lineWidth = 5;
    c.fillStyle = '#202028'; c.fillRect(x - 9, seatY + 30, 18, floorY - seatY - 44); for (const dx of [-90, -40, 40, 90]) { c.beginPath(); c.moveTo(x, floorY - 16); c.lineTo(x + dx, floorY - 4); c.lineWidth = 10; c.strokeStyle = '#202028'; c.stroke(); c.fillStyle = '#101014'; c.beginPath(); c.arc(x + dx, floorY - 2, 9, 0, 7); c.fill(); }
    const bx = x - facing * 70; c.fillStyle = col; c.strokeStyle = TW.INK; c.lineWidth = 5; TW.rr(c, bx - 40, seatY - 300, 80, 300, 26); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.12)'; TW.rr(c, bx - 26, seatY - 280, 18, 250, 9); c.fill();
    c.fillStyle = col; TW.rr(c, x - 95, seatY, 190, 36, 14); c.fill(); c.stroke(); c.restore(); };
  // arm presets for seated figures
  TW.TYPE = (sp = 1) => (t) => ({ shL: 62 + Math.sin(t * 17 * sp) * 4, elL: -58 + Math.sin(t * 13 * sp) * 6, shR: 58 + Math.sin(t * 15 * sp + 1) * 4, elR: -52 + Math.sin(t * 11 * sp + 2) * 6, handL: 'relaxed', handR: 'relaxed' });
  TW.EAR = () => ({ shR: 150, elR: -150, handR: 'fist' }); TW.EARL = () => ({ shL: 150, elL: -150, handL: 'fist' });
  // headset drawn on the head through the rig's hat hook
  TW.headset = (ctx, X, Y, r) => { ctx.save(); ctx.strokeStyle = '#2a2a32'; ctx.lineWidth = r * .16; ctx.beginPath(); ctx.arc(X, Y, r * 1.12, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.fillStyle = '#2a2a32'; ctx.beginPath(); ctx.ellipse(X - r * .62, Y + r * .1, r * .22, r * .3, 0, 0, 7); ctx.fill(); ctx.lineWidth = r * .07; ctx.beginPath(); ctx.moveTo(X - r * .55, Y + r * .3); ctx.quadraticCurveTo(X - r * .2, Y + r * 1.0, X + r * .35, Y + r * .78); ctx.stroke(); ctx.fillStyle = '#e04030'; ctx.beginPath(); ctx.arc(X + r * .38, Y + r * .78, r * .09, 0, 7); ctx.fill(); ctx.restore(); };
  // stack of cash on a desk (n notes)
  TW.cash = (c, x, y, n, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); for (let k = 0; k < n; k++) { c.fillStyle = k % 2 ? '#5aa05a' : '#6ab86a'; c.strokeStyle = '#1e4a1e'; c.lineWidth = 2.5; c.fillRect(-70 + (k % 3) * 2, -k * 9 - 9, 140, 9); c.strokeRect(-70 + (k % 3) * 2, -k * 9 - 9, 140, 9); } if (n) { c.fillStyle = '#e8d8a0'; c.fillRect(-12, -n * 9, 24, n * 9); } c.restore(); };
  // sparkle burst (gems, shine)
  TW.sparkle = (c, x, y, lt, s = 1, col = '255,255,255') => { for (let k = 0; k < 5; k++) { const a = Math.max(0, Math.sin(lt * 4 + k * 1.7)), px = x + Math.cos(k * 2.4) * 40 * s, py = y + Math.sin(k * 2.4) * 30 * s, r = (8 + 12 * a) * s; c.save(); c.globalAlpha = a; c.fillStyle = `rgb(${col})`; c.beginPath(); c.moveTo(px, py - r); c.lineTo(px + r * .25, py); c.lineTo(px, py + r); c.lineTo(px - r * .25, py); c.closePath(); c.fill(); c.beginPath(); c.moveTo(px - r, py); c.lineTo(px, py + r * .25); c.lineTo(px + r, py); c.lineTo(px, py - r * .25); c.closePath(); c.fill(); c.restore(); } };
  // jewelled watch (held in a hand via hold)
  TW.rolex = (c, s = 1) => { c.save(); c.scale(s, s); c.fillStyle = '#d8b84a'; c.strokeStyle = TW.INK; c.lineWidth = 3; c.fillRect(-9, -26, 18, 52); c.strokeRect(-9, -26, 18, 52); c.fillStyle = '#f0e0a0'; c.beginPath(); c.arc(0, 0, 17, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#9ad8ff'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(Math.cos(k * .785) * 13, Math.sin(k * .785) * 13, 3, 0, 7); c.fill(); } c.restore(); };
  // ---- cast
  const L6 = () => G.RIG6.LOOKS;
  TW.GRAHAM = () => ({ look: Object.assign({}, L6().teen, { style: 'gumball', hair: 'spiky', hairCol: '#b07a3a', streak: '#d8a050', topCol: '#3a3450', inner: '#1e1e28', innerStripe: '#7a5cff', legs: '#2a3044', shoes: '#33466e', sole: '#f2f0ea' }) });
  TW.EMP = (k = 0) => ({ look: Object.assign({}, L6().engineer, { style: 'gumball', glasses: k % 2 === 0, topCol: ['#6a8ab0', '#b06a5a', '#5aa07a', '#a08a5a'][k % 4], hairCol: ['#1d2230', '#6a3a20', '#2a1a14', '#c8a060'][k % 4], skin: ['#e9bc94', '#c99068', '#f4c7a1', '#d9a57c'][k % 4] }) });
  TW.MAN = (k = 0) => ({ look: Object.assign({}, L6().banker, { style: 'gumball', topCol: ['#4c5260', '#2f3646', '#5d7088'][k % 3], hairCol: ['#3b2a20', '#1d1712', '#8a7a6a'][k % 3], skin: ['#f2c6a0', '#c99068', '#e9bc94'][k % 3], hair: 'neat' }) });
  TW.WOMAN = (k = 0) => ({ look: Object.assign({}, L6().woman, { style: 'gumball', topCol: ['#8a2e3c', '#2e5a8a', '#3a6a4a'][k % 3], skin: ['#f0c09a', '#c99068', '#d9a57c'][k % 3] }) });
})(typeof window !== 'undefined' ? window : globalThis);
