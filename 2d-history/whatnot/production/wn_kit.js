// Whatnot (WN) kit: cast + props for "The $20 Billion App Accused of Being a Casino". Loaded after pr_kit.js. window.WN.
// All people are stylised Gumball-rig stand-ins: NO likeness of real people, no real logos, badges or app branding.
// The chase card is a generic gold '1/1' card with an abstract player silhouette (no league/brand marks).
//
// CAST (each returns { look } (INSPECTOR also { hold }); spread into a figure: { x, y, s, ...WN.HOST(0), pose, mood, t }):
//   WN.SEAN(age)        narrator stand-in: white American man, 40s, short brown hair, light stubble. age: 'adult' (default, hoodie),
//                       'polo' (adult in a polo), 'boy' (9-year-old, red baseball cap, striped tee, scaled .78)
//   WN.HOST(k)          card-break streamer. k%3: 0 black hoodie + backwards cap + headset, 1 tee + gold chain, 2 woman with bright pink hair + headset
//   WN.VIEWER(k)        teen/adult viewer in casual clothes (k cycles skin, hair, hoodie/tee colours; odd k%4==1 is a woman)
//   WN.COLLECTOR(k)     card-shop customer (k%4: 0 older man in cap + vest, 1 woman in cardigan, 2 young man with beard, 3 man in glasses + flannel)
//   WN.LAWYER(k)        suit. k%4: 0 man light skin, 1 woman dark skin, 2 man dark skin, 3 woman light skin
//   WN.LESKO()          middle-aged plaintiffs' lawyer: grey suit, glasses, receding hair
//   WN.LEISER()         academic: tweed blazer, glasses, short beard
//   WN.SPOKES()         tech-company spokesperson: smart-casual blazer over tee, lanyard
//   WN.PARENT(k)        parent. even k mum (cardigan), odd k dad (quarter-zip); k varies skin
//   WN.KID()            13-year-old boy, hoodie, scaled .86
//   WN.CELEB()          flashy celebrity type: sunglasses, gold chain, black puffer jacket
//   WN.CREATOR(k)       colourful YouTuber (k%3: 0 orange hoodie + beanie, 1 woman purple hair + headset, 2 green tee + backwards cap)
//   WN.BEAST()          big-creator type: blue hoodie, short beard (stylised, no likeness)
//   WN.LOGAN()          blond influencer type in a white tank top (stylised, no likeness)
//   WN.AUCTIONEER()     auction-house man: navy suit, bow tie
//   WN.PRESENTER()      TV presenter woman: red blazer
//   WN.ARBITRATOR()     older arbitrator: dark suit, grey hair, glasses
//   WN.OFFICIAL(k)      government official in suit. k%2: 0 UK (grey suit, glasses), 1 US (navy, lanyard); k varies skin
//   WN.INSPECTOR()      Chinese market inspector: navy uniform jacket, peaked cap, chest badge, clipboard in the near hand (hold)
//   WN.STREAMER_CN(k)   Chinese live-commerce host. k%3: 0 woman red dress-jacket + headset, 1 man white shirt + headset, 2 woman long hair, pink
//   WN.COUNSELLOR()     gambling-addiction counsellor: soft cardigan, glasses, bun
//   WN.SHOPPER()        ordinary adult shopper
//   WN.PACKER()         warehouse worker: grey tee, orange work apron
//   Extra look flags (look.wn): backcap (cap colour, brim to the back), peak (uniform cap colour), sunglasses, lanyard (colour), apron (colour),
//     puffer (quilt lines on the jacket), beard ('short'), beardCol, tweed (herringbone on the jacket), bowtie (colour), badge (chest badge), scale.
//   PR flags still work through look.pr: stubble, chain, headset, cap, beanie.
//   WN.CLIPBOARD   hold-hand prop: { hold: { near: WN.CLIPBOARD } }
//
// PROPS (bottom-centre at x,y unless said; s = same scale number as figures; a card at s 1 is ~120x168 px):
//   WN.goldCard(c, x, y, s, rot, glint)     THE golden 1-of-1 chase card (gold foil, star, silhouette, '1/1'). rot around its base, glint 0..1 sheen + sparkles
//   WN.card(c, x, y, s, col, rot)           generic trading card, col = inner panel colour
//   WN.cardFan(c, x, y, s, n, gold)         fan of n cards (default 5); gold=true makes the middle one the gold 1/1
//   WN.pack(c, x, y, s, col, torn)          foil pack; torn 0..1 rips the top strip off and pushes cards up out of it
//   WN.box(c, x, y, s, col, open)           sealed hobby box with glossy shrink-wrap; open 0..1 lifts the lid (wrap gone when open>0) and shows packs
//   WN.slab(c, x, y, s, grade, gold)        graded card in a clear plastic slab with a label ('GEM MT 10'); gold=true holds the gold card
//   WN.phone(c, x, y, s, screenFn)          big floating phone (~400x800 at s 1). screenFn(c, w, h) draws the screen, origin top-left, clipped
//   WN.swipe(c, x, y, s, p)                 'SWIPE TO BID' pill button, CENTRE; p 0..1 thumb slides right, turns green at 1
//   WN.countdown(c, x, y, s, secs, max)     red ring timer, CENTRE; ring = secs/max (max default 15), pulses under 4
//   WN.wheel(c, x, y, s, angle, segs)       randomiser wheel, CENTRE, with ticker on top. segs = number (default 12) or array of colours
//   WN.chat(c, x, y, w, h, t, seed)         live chat column, x,y = TOP-LEFT; bubbles with names, text, hearts/fire scroll up driven by t
//   WN.spent(c, x, y, s, value)             red SPENT tracker panel, x,y = TOP-LEFT (~330x110 at s 1); value number -> '$12,400'
//   WN.envelope(c, x, y, s, open)           envelope, open 0..1 lifts the flap and pulls a letter up
//   WN.supercar(c, x, y, s, t, rot)         generic red supercar side view, no badge; wheels spin with t; rot tilts around the base
//   WN.gavel(c, x, y, s, ang)               gavel resting over its sound block (ang raises the head, 0 = down on the block)
//   WN.lectern(c, x, y, s, col)             wooden lectern with a plain front panel
//   WN.paddle(c, x, y, s, num)              auction bid paddle with a number
//   WN.chip(c, x, y, s, col)                casino chip, CENTRE
//   WN.dice(c, x, y, s, a, b)               two dice showing a and b (default 6, 5)
//   WN.files(c, x, y, s, n)                 stack of n claim files / folders (default 6), paper edges + red tabs
//   WN.dragon(c, x, y, s, t)                paper Chinese-style dragon flying right, CENTRE, holding the gold card in its mouth
//   WN.stamp(c, x, y, s, text, col)         rubber-stamp mark, CENTRE, tilted (col default red)
//   WN.creditCard(c, x, y, s, col, maxed)   credit card, CENTRE; maxed=true adds red DECLINED band and a crack
//   WN.basementBoxes(c, x, y, s, n)         pile of n cardboard shipping boxes (default 6)
//   WN.lootChest(c, x, y, s, open)          game-style loot chest; open 0..1 opens the lid with a gold glow
//   WN.laptop(c, x, y, s, screenFn)         open laptop; screenFn(c, w, h) draws the screen
//   WN.turkey(c, x, y, s, t)                cartoon turkey waddling (t drives the waddle; pass 0 to stand)
//   WN.broccoli(c, x, y, s)                 broccoli floret
//   WN.shadow(c, x, y, w, a)                soft ground shadow
(function (G) {
  const K = G.KIT, TW = G.TW, INK = TW.INK, R6 = G.RIG6, R = G.RIG, sh = (h, f) => R.shadeHex(h, f), D = Math.PI / 180;
  const WN = G.WN = {};
  const GOLD = '#f2c14a', GOLD_D = '#a8781e', GOLD_L = '#fff0b0', RED = '#e2342e';
  const shadow = WN.shadow = (c, x, y, w, a = .32) => { c.save(); c.translate(x, y); c.scale(1, .22); const g = c.createRadialGradient(0, 0, 0, 0, 0, w); g.addColorStop(0, `rgba(30,18,8,${a})`); g.addColorStop(1, 'rgba(30,18,8,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, w, 0, 7); c.fill(); c.restore(); };
  const ink = (c, w = 3) => { c.strokeStyle = INK; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); };
  const txt = (c, s, x, y, px, col, al = 'center', fam = 'Anton') => TW.txt(c, s, x, y, px, col, al, fam);
  const rrp = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
  const lin = (c, x0, y0, x1, y1, stops) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s)); return g; };
  const look = (base, o, wn, pr) => ({ look: Object.assign({}, R6.LOOKS[base], { style: 'gumball' }, o, wn ? { wn } : {}, pr ? { pr } : {}) });
  const heart = (c, x, y, r, col = '#ff3a5a') => { c.save(); c.translate(x, y); c.fillStyle = col; c.beginPath(); c.moveTo(0, r * .9); c.bezierCurveTo(-r * 1.4, -r * .1, -r * .6, -r * 1.1, 0, -r * .35); c.bezierCurveTo(r * .6, -r * 1.1, r * 1.4, -r * .1, 0, r * .9); c.fill(); c.strokeStyle = INK; c.lineWidth = Math.max(1.2, r * .16); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-r * .4, -r * .3, r * .22, r * .14, -.6, 0, 7); c.fill(); c.restore(); };
  const fire = (c, x, y, r) => { c.save(); c.translate(x, y); const fl = (k, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, r * k); c.bezierCurveTo(-r * k, r * k, -r * k, -r * .1 * k, -r * .2 * k, -r * 1.1 * k); c.quadraticCurveTo(0, -r * .4 * k, r * .3 * k, -r * .7 * k); c.bezierCurveTo(r * k, -r * .2 * k, r * k, r * k, 0, r * k); c.fill(); };
    fl(1, '#ff6a1a'); c.strokeStyle = INK; c.lineWidth = Math.max(1.2, r * .14); c.stroke(); fl(.6, '#ffd23a'); c.restore(); };
  const star = (c, x, y, r, col) => { c.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * .45 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); if (col) { c.fillStyle = col; c.fill(); } };
  WN.heart = heart; WN.fire = fire;

  // ---- figure wrapper: torso extras + headwear + face extras through the hat hook (figure-local coords)
  const F0 = R6.figure;
  R6.figure = (ctx, o) => { const L = o.look, X = L && L.wn; if (!X) return F0(ctx, o);
    const o2 = Object.assign({}, o); if (X.scale) o2.s = (o.s ?? 1) * X.scale; const s = o2.s ?? 1; o2.out = o.out || {}; const out = o2.out, userHat = o.hat;
    o2.hat = (c, hx, hy, r) => { const rx = 53, ry = 57, Xh = hx, Y = hy + ry * .08, hipY = (out.hipY ?? 0) / s, nk = { x: 0, y: hipY - 104 }, cx = 6;
      c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
      const torso = () => { c.beginPath(); c.ellipse(cx - 2, (nk.y + hipY) / 2 + 2, 37, 60, 0, 0, 7); };
      if (X.puffer) { c.save(); torso(); c.clip(); const col = L.topCol; for (let k = 0; k < 6; k++) { const yy = nk.y + 14 + k * 17; c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(cx, yy + 2, 40, 5, 0, Math.PI, 0); c.fill(); c.strokeStyle = sh(col, -.45); c.lineWidth = 2.4; c.beginPath(); c.moveTo(cx - 44, yy + 8); c.quadraticCurveTo(cx, yy + 13, cx + 44, yy + 8); c.stroke(); } c.restore();
        c.fillStyle = L.topCol; c.beginPath(); c.ellipse(nk.x + 6, nk.y + 4, 30, 11, 0, 0, 7); c.fill(); ink(c, 2.6); c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(nk.x - 2, nk.y + 1, 16, 4, 0, 0, 7); c.fill(); }
      if (X.tweed) { c.save(); torso(); c.clip(); c.strokeStyle = sh(L.topCol, -.22); c.lineWidth = 1.3; for (let yy = nk.y; yy < hipY; yy += 7) for (let xx = -40; xx < 50; xx += 10) { c.beginPath(); c.moveTo(xx, yy); c.lineTo(xx + 4, yy + 4); c.lineTo(xx + 8, yy); c.stroke(); } c.restore(); }
      if (X.apron) { const col = X.apron, ty = nk.y + 34; c.strokeStyle = sh(col, -.3); c.lineWidth = 3; c.beginPath(); c.moveTo(cx - 14, ty); c.lineTo(nk.x - 4, nk.y + 4); c.moveTo(cx + 18, ty); c.lineTo(nk.x + 16, nk.y + 4); c.stroke();
        c.beginPath(); c.moveTo(cx - 18, ty); c.lineTo(cx + 22, ty); c.lineTo(cx + 34, hipY + 46); c.quadraticCurveTo(cx + 2, hipY + 52, cx - 30, hipY + 46); c.closePath(); c.fillStyle = col; c.fill(); ink(c, 2.8);
        c.fillStyle = sh(col, -.15); c.beginPath(); c.roundRect(cx - 14, hipY - 4, 34, 22, 3); c.fill(); ink(c, 2); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(cx - 14, ty + 4, 6, hipY + 30 - ty);
        c.strokeStyle = sh(col, -.3); c.lineWidth = 4; c.beginPath(); c.moveTo(cx - 34, hipY - 18); c.lineTo(cx + 40, hipY - 18); c.stroke(); }
      if (X.lanyard) { const col = X.lanyard; c.strokeStyle = col; c.lineWidth = 4; c.beginPath(); c.moveTo(nk.x - 10, nk.y + 2); c.lineTo(cx + 6, nk.y + 50); c.lineTo(nk.x + 22, nk.y + 2); c.stroke();
        c.fillStyle = '#f6f6f2'; c.beginPath(); c.roundRect(cx - 8, nk.y + 48, 28, 36, 3); c.fill(); ink(c, 2); c.fillStyle = col; c.fillRect(cx - 8, nk.y + 48, 28, 9); c.fillStyle = '#9aa0aa'; c.fillRect(cx - 3, nk.y + 62, 10, 12); c.fillRect(cx + 9, nk.y + 64, 8, 3); c.fillRect(cx + 9, nk.y + 70, 8, 3); }
      if (X.badge) { c.save(); c.translate(cx + 20, nk.y + 36); star(c, 0, 0, 10, GOLD); ink(c, 1.8); c.restore(); c.fillStyle = '#c8302a'; c.fillRect(cx - 24, nk.y + 30, 18, 6); }
      if (X.bowtie) { const bx = nk.x + 10, by = nk.y + 8; c.fillStyle = X.bowtie; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - 14, by - 8); c.lineTo(bx - 14, by + 8); c.closePath(); c.moveTo(bx, by); c.lineTo(bx + 14, by - 8); c.lineTo(bx + 14, by + 8); c.closePath(); c.fill(); ink(c, 2); c.beginPath(); c.arc(bx, by, 4, 0, 7); c.fill(); ink(c, 1.6); }
      // face extras
      const fx = Xh + rx * .3, fy = Y + ry * .06, mx = fx + 8, my = fy + 30, bc = X.beardCol || L.hairCol;
      if (X.beard === 'short') { c.fillStyle = bc; c.beginPath(); c.moveTo(Xh - rx * .5, Y + ry * .35); c.bezierCurveTo(Xh - rx * .4, Y + ry * 1.18, Xh + rx * .85, Y + ry * 1.15, Xh + rx * .85, Y + ry * .5); c.quadraticCurveTo(mx + 12, my + 10, mx, my + 8); c.quadraticCurveTo(mx - 18, my + 6, Xh - rx * .5, Y + ry * .35); c.fill(); ink(c, 2.4);
        c.strokeStyle = sh(bc, .25); c.lineWidth = 1.6; c.beginPath(); c.moveTo(Xh - rx * .2, Y + ry * .8); c.quadraticCurveTo(Xh + rx * .1, Y + ry * 1.0, Xh + rx * .4, Y + ry * .95); c.stroke(); }
      if (X.sunglasses) { for (const [ex, k] of [[fx - 9, .8], [fx + 14, 1]]) { c.fillStyle = '#141418'; c.beginPath(); c.roundRect(ex - 14 * k, fy - 13, 28 * k, 22, 7); c.fill(); ink(c, 2.4); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(ex - 7 * k, fy - 8); c.lineTo(ex - 1 * k, fy - 2); c.stroke(); }
        c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(fx - 9 + 11, fy - 6); c.lineTo(fx + 14 - 13, fy - 6); c.moveTo(fx - 9 - 11, fy - 6); c.lineTo(Xh - rx * .5, fy - 8); c.stroke(); }
      // headwear
      if (X.backcap) { const col = X.backcap; c.fillStyle = col; c.beginPath(); c.moveTo(Xh - rx * 1.07, Y - ry * .3); c.bezierCurveTo(Xh - rx * 1.06, Y - ry * 1.48, Xh + rx * 1.06, Y - ry * 1.48, Xh + rx * 1.05, Y - ry * .34); c.quadraticCurveTo(Xh, Y - ry * .5, Xh - rx * 1.07, Y - ry * .3); c.closePath(); c.fill(); ink(c, 3);
        c.fillStyle = sh(col, -.2); c.beginPath(); c.moveTo(Xh - rx * .55, Y - ry * .42); c.quadraticCurveTo(Xh - rx * 1.5, Y - ry * .55, Xh - rx * 1.62, Y - ry * .22); c.lineTo(Xh - rx * .8, Y - ry * .2); c.closePath(); c.fill(); ink(c, 2.6);
        c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.ellipse(Xh + rx * .2, Y - ry * 1.02, rx * .38, ry * .1, -.2, 0, 7); c.fill(); c.fillStyle = sh(col, .3); c.beginPath(); c.arc(Xh, Y - ry * 1.18, 5, 0, 7); c.fill(); ink(c, 1.6);
        c.strokeStyle = sh(col, -.3); c.lineWidth = 1.8; c.beginPath(); c.moveTo(Xh, Y - ry * 1.15); c.quadraticCurveTo(Xh + rx * .5, Y - ry * .9, Xh + rx * .7, Y - ry * .45); c.moveTo(Xh, Y - ry * 1.15); c.quadraticCurveTo(Xh - rx * .5, Y - ry * .9, Xh - rx * .7, Y - ry * .45); c.stroke(); }
      if (X.peak) { const col = X.peak; c.fillStyle = col; c.beginPath(); c.moveTo(Xh - rx * 1.12, Y - ry * .45); c.bezierCurveTo(Xh - rx * 1.25, Y - ry * 1.5, Xh + rx * 1.25, Y - ry * 1.55, Xh + rx * 1.15, Y - ry * .5); c.closePath(); c.fill(); ink(c, 3);
        c.fillStyle = '#16161c'; c.beginPath(); c.roundRect(Xh - rx * 1.1, Y - ry * .62, rx * 2.24, 13, 4); c.fill(); ink(c, 2.4);
        c.fillStyle = '#16161c'; c.beginPath(); c.moveTo(Xh + rx * .3, Y - ry * .45); c.quadraticCurveTo(Xh + rx * 1.3, Y - ry * .52, Xh + rx * 1.6, Y - ry * .22); c.quadraticCurveTo(Xh + rx * 1.1, Y - ry * .2, Xh + rx * .3, Y - ry * .32); c.fill(); ink(c, 2.4);
        c.save(); c.translate(Xh + rx * .55, Y - ry * .95); star(c, 0, 0, 9, GOLD); ink(c, 1.6); c.restore(); c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.ellipse(Xh - rx * .3, Y - ry * 1.15, rx * .4, ry * .09, -.2, 0, 7); c.fill(); }
      c.restore(); if (userHat) userHat(c, hx, hy, r); };
    return F0(ctx, o2); };

  // ---- cast
  const SK = ['#f2c6a0', '#8a5a3a', '#e2ae84', '#c99068', '#f6d2b4', '#6a4228', '#e9bc94', '#a8724c'];
  const HC = ['#3b2a20', '#141010', '#c89a5a', '#1d1712', '#a85a2a', '#141010', '#6a4a30', '#2a1a12'];
  const jeans = '#3a4a66', snk = '#f2f2f0';
  WN.SEAN = (age = 'adult') => { const skin = '#f2c6a0', hc = '#6a4a30';
    if (age === 'boy') return look('teen', { hair: 'short', hairCol: hc, streak: '#8a6a4a', skin, top: 'tee', topCol: '#3a78c8', inner: '#3a78c8', print: '#f4f4f4', bareArms: true, legs: '#4a5a7a', shoes: '#e8e8e4', sole: '#c8302a', seed: 601 }, { scale: .78 }, { cap: '#c8302a' });
    const polo = age === 'polo';
    return look('banker', { hair: 'short', hairCol: hc, streak: '#8a6a4a', skin, top: polo ? 'shirt' : 'hoodie', topCol: polo ? '#2e5a7a' : '#5a6a7a', sleeveCol: polo ? '#2e5a7a' : undefined, inner: polo ? '#2e5a7a' : '#5a6a7a', innerStripe: '#3e4a58', tie: null, legs: jeans, cuff: '#4e6080', shoes: '#6a5a48', sole: snk, seed: 600 }, null, { stubble: '#7a5a3a' }); };
  WN.HOST = (k = 0) => [
    () => look('teen', { hair: 'short', hairCol: '#1d1712', skin: '#e2ae84', top: 'hoodie', topCol: '#1e1e24', inner: '#1e1e24', innerStripe: '#e2342e', legs: '#2a2a30', shoes: '#f2f2f0', sole: '#e2342e', seed: 610 }, { backcap: '#e2342e' }, { headset: '#2a2a30', stubble: true }),
    () => look('banker', { hair: 'neat', hairCol: '#141010', skin: '#8a5a3a', top: 'tee', topCol: '#f4f4f0', inner: '#f4f4f0', bareArms: true, tie: null, legs: '#2a2a30', shoes: '#1e1e1e', sole: '#f2f2f0', seed: 611 }, null, { chain: true, stubble: '#1a1210' }),
    () => look('woman', { hair: 'long', hairCol: '#ff4aa8', streak: '#ffa0d8', skin: '#f6d2b4', top: 'hoodie', topCol: '#7a3ac8', inner: '#7a3ac8', innerStripe: '#f4f4f4', legs: '#2a2a30', shoes: '#f2f2f0', sole: '#ff4aa8', seed: 612 }, null, { headset: '#f4f4f4', glow: '#ff4aa8' }),
  ][k % 3]();
  WN.VIEWER = (k = 0) => { const skin = SK[(k * 3) % 8], tops = ['#3a6a4a', '#c8462e', '#2a4a7a', '#e8a83a', '#5a5a62', '#8a3a7a'];
    if (k % 4 === 1) return look('woman', { hair: ['long', 'bun', 'long'][k % 3], bun: k % 3 === 1, hairCol: HC[(k + 2) % 8], skin, top: 'hoodie', topCol: tops[k % 6], inner: tops[k % 6], legs: jeans, shoes: snk, sole: '#d8d8d8', seed: 620 + k });
    return look('teen', { hair: ['messy', 'spiky', 'short', 'curly'][k % 4], hairCol: HC[k % 8], skin, top: k % 2 ? 'tee' : 'hoodie', topCol: tops[k % 6], inner: k % 2 ? tops[k % 6] : '#e8e8e2', bareArms: k % 2 === 1, legs: ['#3a4a66', '#2a2a30', '#5a6a3a'][k % 3], shoes: snk, sole: '#d8d8d8', seed: 620 + k }); };
  WN.COLLECTOR = (k = 0) => [
    () => look('banker', { hair: 'short', hairCol: '#b8b2aa', streak: '#dcd6ce', skin: '#f0c6a4', top: 'shirt', topCol: '#7a8a9a', sleeveCol: '#7a8a9a', tie: null, legs: '#5a4a3a', shoes: '#3a2a1a', seed: 630 }, { beard: 'short', beardCol: '#c8c2ba' }, { cap: '#2a4a3a' }),
    () => look('woman', { hair: 'bun', bun: true, hairCol: '#6a3a20', skin: '#c99068', top: 'cardigan', topCol: '#c86a4a', inner: '#f4ece2', legs: jeans, seed: 631 }),
    () => look('teen', { hair: 'curly', hairCol: '#141010', skin: '#8a5a3a', top: 'tee', topCol: '#e8a83a', inner: '#e8a83a', bareArms: true, legs: '#2a2a30', shoes: snk, seed: 632 }, { beard: 'short' }),
    () => look('banker', { hair: 'neat', hairCol: '#1d1712', skin: '#e9bc94', glasses: true, top: 'shirt', topCol: '#a83a3a', sleeveCol: '#a83a3a', tie: null, legs: jeans, shoes: '#3a2a1a', seed: 633 }, { tweed: true }),
  ][k % 4]();
  WN.LAWYER = (k = 0) => { const w = k % 2 === 1, skin = ['#f2c6a0', '#6a4228', '#8a5a3a', '#f6d2b4'][k % 4], suit = ['#1e2433', '#2a2a32', '#26304a', '#3a3a44'][k % 4];
    return w ? look('woman', { hair: k % 4 === 1 ? 'bun' : 'long', bun: k % 4 === 1, hairCol: k % 4 === 1 ? '#141010' : '#a8743a', skin, top: 'jacket', topCol: suit, inner: '#f4f2ee', legs: suit, shoes: '#141414', seed: 640 + k })
      : look('banker', { hair: k % 4 === 2 ? 'short' : 'neat', hairCol: HC[k % 8], skin, top: 'jacket', topCol: suit, inner: '#eef0f6', tie: ['#8a2a34', '#2a5a8a', '#6a4a8a', '#3a6a4a'][k % 4], legs: suit, shoes: '#141414', seed: 640 + k }); };
  WN.LESKO = () => look('banker', { hair: 'neat', hairCol: '#7a6a5a', streak: '#a8988a', skin: '#efc39c', glasses: true, top: 'jacket', topCol: '#6a6e76', inner: '#eef0f6', tie: '#2a3a6a', legs: '#6a6e76', shoes: '#141414', seed: 650 });
  WN.LEISER = () => look('banker', { hair: 'swept', hairCol: '#5a3a24', streak: '#7a5a3a', skin: '#f0c6a4', glasses: true, top: 'jacket', topCol: '#8a6a48', inner: '#e8e2d2', tie: '#5a2a2a', legs: '#4a4038', shoes: '#4a3424', seed: 651 }, { tweed: true, beard: 'short' });
  WN.SPOKES = () => look('banker', { hair: 'short', hairCol: '#1d1712', skin: '#e2ae84', top: 'jacket', topCol: '#2a3a4a', inner: '#f4f4f0', tie: null, legs: '#c8b898', shoes: '#f2f2f0', sole: '#d8d8d8', seed: 652 }, { lanyard: '#3ab0e8' });
  WN.PARENT = (k = 0) => { const skin = SK[(k * 5 + 1) % 8];
    return k % 2 === 0 ? look('woman', { hair: ['long', 'bun'][(k >> 1) % 2], bun: (k >> 1) % 2 === 1, hairCol: HC[(k + 4) % 8], skin, top: 'cardigan', topCol: ['#4a7a8a', '#8a4a5a'][(k >> 1) % 2], inner: '#f4ece2', legs: jeans, seed: 660 + k })
      : look('banker', { hair: ['short', 'neat', 'bald'][(k >> 1) % 3], hairCol: HC[(k + 1) % 8], skin, top: 'sweater', topCol: ['#5a6a4a', '#2a4a6a'][(k >> 1) % 2], collarCol: '#e8e8e2', sleeveCol: ['#5a6a4a', '#2a4a6a'][(k >> 1) % 2], tie: null, legs: '#5a5a62', shoes: '#4a3424', seed: 660 + k }, null, { stubble: true }); };
  WN.KID = () => look('teen', { hair: 'messy', hairCol: '#6a4a30', streak: '#8a6a4a', skin: '#f2c6a0', top: 'hoodie', topCol: '#2a8a6a', inner: '#2a8a6a', innerStripe: '#f4f4f4', legs: '#3a4a66', shoes: snk, sole: '#2a8a6a', seed: 670 }, { scale: .86 });
  WN.CELEB = () => look('banker', { hair: 'short', hairCol: '#141010', skin: '#8a5a3a', top: 'jacket', topCol: '#1a1a20', inner: '#f4f4f4', tie: null, legs: '#2a2a30', shoes: '#f4f4f4', sole: '#e2342e', seed: 680 }, { puffer: true, sunglasses: true, beard: 'short' }, { chain: true });
  WN.CREATOR = (k = 0) => [
    () => look('teen', { hair: 'messy', hairCol: '#3b2a20', skin: '#e9bc94', top: 'hoodie', topCol: '#f07a1a', inner: '#f07a1a', innerStripe: '#ffd23a', legs: '#2a2a30', shoes: snk, sole: '#f07a1a', seed: 690 }, null, { beanie: '#2ab0a0' }),
    () => look('woman', { hair: 'long', hairCol: '#8a4aff', streak: '#c0a0ff', skin: '#c99068', top: 'tee', topCol: '#ffd23a', inner: '#ffd23a', bareArms: true, legs: '#3a4a66', shoes: snk, seed: 691 }, null, { headset: '#f4f4f4', glow: '#8a4aff' }),
    () => look('teen', { hair: 'short', hairCol: '#141010', skin: '#6a4228', top: 'tee', topCol: '#4ac84a', inner: '#4ac84a', print: '#f4f4f4', bareArms: true, legs: '#2a2a30', shoes: snk, seed: 692 }, { backcap: '#f4f4f4' }),
  ][k % 3]();
  WN.BEAST = () => look('banker', { hair: 'short', hairCol: '#5a3a24', streak: '#7a5a3a', skin: '#f2c6a0', top: 'hoodie', topCol: '#2f7ae0', inner: '#2f7ae0', innerStripe: '#1e5ab0', tie: null, legs: '#2a2a30', shoes: snk, sole: '#2f7ae0', seed: 700 }, { beard: 'short', beardCol: '#6a4a30', scale: 1.06 });
  WN.LOGAN = () => look('banker', { hair: 'swept', hairCol: '#e2c878', streak: '#f6e2a8', skin: '#f0c09a', top: 'tee', topCol: '#f8f8f6', inner: '#f8f8f6', bareArms: true, tie: null, legs: '#2a3a5a', shoes: snk, sole: '#d8d8d8', seed: 701 }, { scale: 1.04 }, { stubble: '#b8964a', chain: true });
  WN.AUCTIONEER = () => look('banker', { hair: 'swept', hairCol: '#8a8680', streak: '#b8b4ae', skin: '#f0c6a4', top: 'jacket', topCol: '#1e2a48', inner: '#f8f8f6', tie: null, legs: '#1e2a48', shoes: '#141414', seed: 710 }, { bowtie: '#a8202a' });
  WN.PRESENTER = () => look('woman', { hair: 'long', hairCol: '#3a2418', streak: '#6a4430', skin: '#e2ae84', top: 'jacket', topCol: '#c8302a', inner: '#f4ece2', legs: '#1e1e24', shoes: '#1e1e24', seed: 711 });
  WN.ARBITRATOR = () => look('banker', { hair: 'neat', hairCol: '#d8d4cc', streak: '#f0ece6', skin: '#c99068', glasses: true, top: 'jacket', topCol: '#22242c', inner: '#eef0f6', tie: '#5a5a6a', legs: '#22242c', shoes: '#141414', seed: 712 });
  WN.OFFICIAL = (k = 0) => { const us = k % 2 === 1, skin = SK[(k * 3 + 2) % 8];
    return look('banker', { hair: ['neat', 'short', 'bald'][k % 3], hairCol: HC[(k + 3) % 8], skin, glasses: !us, top: 'jacket', topCol: us ? '#1e2a48' : '#5a5e66', inner: '#f4f6fa', tie: us ? '#a8202a' : '#2a4a3a', legs: us ? '#1e2a48' : '#5a5e66', shoes: '#141414', seed: 720 + k }, us ? { lanyard: '#1e2a48' } : null); };
  WN.CLIPBOARD = (c) => { c.save(); c.rotate(-.2); c.fillStyle = '#8a5a32'; c.beginPath(); c.roundRect(-30, 2, 60, 80, 5); c.fill(); ink(c, 2.6); c.fillStyle = '#f8f6ee'; c.fillRect(-24, 12, 48, 64); c.fillStyle = '#9aa0aa'; for (let k = 0; k < 5; k++) c.fillRect(-18, 22 + k * 11, 36 - (k % 2) * 10, 3); c.fillStyle = '#b8bcc4'; c.beginPath(); c.roundRect(-12, -2, 24, 10, 3); c.fill(); ink(c, 2); c.restore(); };
  WN.INSPECTOR = () => Object.assign(look('banker', { hair: 'short', hairCol: '#141010', skin: '#efc39c', top: 'jacket', topCol: '#1e2a4a', inner: '#e8eef6', tie: '#1e2a4a', legs: '#1e2a4a', shoes: '#141414', seed: 730 }, { peak: '#1e2a4a', badge: true }), { hold: { near: WN.CLIPBOARD } });
  WN.STREAMER_CN = (k = 0) => [
    () => look('woman', { hair: 'long', hairCol: '#141010', streak: '#3a2a2a', skin: '#f6d8bc', top: 'jacket', topCol: '#d8282e', inner: '#f8e8c8', legs: '#1e1e24', shoes: '#d8282e', seed: 740 }, null, { headset: '#f4f4f4', glow: '#ff4a6a' }),
    () => look('banker', { hair: 'neat', hairCol: '#141010', skin: '#efc39c', top: 'shirt', topCol: '#f8f8f6', sleeveCol: '#f8f8f6', tie: null, legs: '#2a2a30', shoes: '#141414', seed: 741 }, null, { headset: '#2a2a30' }),
    () => look('woman', { hair: 'long', hairCol: '#2a1a14', skin: '#f2d0b0', top: 'cardigan', topCol: '#f08ab0', inner: '#fff4f8', legs: '#f4f4f0', shoes: '#f08ab0', seed: 742 }),
  ][k % 3]();
  WN.COUNSELLOR = () => look('woman', { hair: 'bun', bun: true, hairCol: '#8a5a3a', streak: '#aa7a5a', skin: '#e9bc94', glasses: true, top: 'cardigan', topCol: '#7a9a8a', inner: '#f4ece2', legs: '#4a4a52', seed: 750 });
  WN.SHOPPER = () => look('banker', { hair: 'short', hairCol: '#3b2a20', skin: '#c99068', top: 'sweater', topCol: '#a83a3a', collarCol: '#f4f4f4', sleeveCol: '#a83a3a', tie: null, legs: jeans, shoes: '#4a3424', seed: 760 });
  WN.PACKER = () => look('banker', { hair: 'short', hairCol: '#141010', skin: '#a8724c', top: 'tee', topCol: '#7a7e86', inner: '#7a7e86', bareArms: true, tie: null, legs: '#3a3e46', shoes: '#3a2a1a', seed: 770 }, { apron: '#e8742a' });

  // ---- cards
  const silhouette = (c, col) => { c.fillStyle = col; c.beginPath(); c.arc(4, -98, 13, 0, 7); c.fill(); c.beginPath(); c.moveTo(-16, -84); c.quadraticCurveTo(6, -90, 20, -80); c.lineTo(36, -100); c.lineTo(42, -94); c.lineTo(24, -66); c.lineTo(20, -42); c.lineTo(32, -20); c.lineTo(22, -16); c.lineTo(6, -38); c.lineTo(-10, -16); c.lineTo(-20, -22); c.lineTo(-6, -46); c.lineTo(-8, -66); c.lineTo(-30, -56); c.lineTo(-32, -64); c.closePath(); c.fill(); };
  const cardBase = (c, s, rot, x, y) => { c.save(); c.translate(x, y); c.rotate(rot || 0); c.scale(s, s); };
  WN.goldCard = (c, x, y, s = 1, rot = 0, glint = 0) => { if (glint > 0) TW.glow(c, x, y - 84 * s, 160 * s * (.6 + glint * .6), '255,220,120', .55 * glint);
    cardBase(c, s, rot, x, y); c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.roundRect(-56, -164, 120, 168, 10); c.fill();
    c.fillStyle = lin(c, -60, -168, 60, 0, ['#fff2b0', '#e8b23a', '#a8701a', '#f6d870', '#c08a24']); c.beginPath(); c.roundRect(-60, -168, 120, 168, 10); c.fill(); ink(c, 3.2);
    c.save(); c.beginPath(); c.roundRect(-50, -158, 100, 128, 6); c.clip(); const g = c.createRadialGradient(0, -96, 4, 0, -96, 90); g.addColorStop(0, '#fff4c8'); g.addColorStop(.5, '#d89a2a'); g.addColorStop(1, '#6a4210'); c.fillStyle = g; c.fillRect(-50, -158, 100, 128);
    c.fillStyle = 'rgba(255,245,200,.25)'; for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; c.beginPath(); c.moveTo(0, -96); c.lineTo(Math.cos(a) * 110, -96 + Math.sin(a) * 110); c.lineTo(Math.cos(a + .2) * 110, -96 + Math.sin(a + .2) * 110); c.fill(); }
    silhouette(c, '#5a3608'); c.restore(); c.beginPath(); c.roundRect(-50, -158, 100, 128, 6); ink(c, 2.4);
    star(c, -34, -142, 11, '#fffbe8'); ink(c, 1.8);
    c.fillStyle = '#2a1a08'; c.beginPath(); c.roundRect(-46, -26, 92, 20, 5); c.fill(); txt(c, '1/1', 0, -15.5, 16, GOLD_L);
    const sx = -80 + ((glint * 220) % 220); c.save(); c.beginPath(); c.roundRect(-60, -168, 120, 168, 10); c.clip(); c.globalCompositeOperation = 'screen'; c.fillStyle = lin(c, sx - 30, 0, sx + 30, 0, ['rgba(255,255,255,0)', 'rgba(255,255,255,.75)', 'rgba(255,255,255,0)']); c.beginPath(); c.moveTo(sx - 30, 10); c.lineTo(sx + 30, 10); c.lineTo(sx + 90, -180); c.lineTo(sx + 30, -180); c.fill(); c.restore();
    c.restore(); if (glint > 0) TW.sparkle(c, x, y - 90 * s, glint * 4, s * 1.1, '255,250,220'); };
  WN.card = (c, x, y, s = 1, col = '#3a78c8', rot = 0) => { cardBase(c, s, rot, x, y); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.roundRect(-56, -164, 120, 168, 10); c.fill();
    c.fillStyle = '#f8f6f0'; c.beginPath(); c.roundRect(-60, -168, 120, 168, 10); c.fill(); ink(c, 3);
    c.save(); c.beginPath(); c.roundRect(-50, -158, 100, 124, 6); c.clip(); c.fillStyle = lin(c, 0, -158, 0, -34, [sh(col, .35), col, sh(col, -.35)]); c.fillRect(-50, -158, 100, 124);
    c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 6; for (let k = -4; k < 6; k++) { c.beginPath(); c.moveTo(-60 + k * 24, -30); c.lineTo(-20 + k * 24, -160); c.stroke(); } silhouette(c, sh(col, -.55)); c.restore(); c.beginPath(); c.roundRect(-50, -158, 100, 124, 6); ink(c, 2.2);
    c.fillStyle = sh(col, -.2); c.beginPath(); c.roundRect(-46, -28, 92, 18, 4); c.fill(); c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(-38, -21, 50, 4); c.fillStyle = INK; c.beginPath(); c.arc(36, -19, 5, 0, 7); c.fill(); c.restore(); };
  WN.cardFan = (c, x, y, s = 1, n = 5, gold = false) => { const cols = ['#3a78c8', '#c8302a', '#2a9a5a', '#8a4ac8', '#e8742a', '#2ab0c0', '#d8b030']; const mid = (n - 1) / 2;
    for (let k = 0; k < n; k++) { const a = (k - mid) * .22; if (gold && k === Math.round(mid)) WN.goldCard(c, x + (k - mid) * 18 * s, y, s, a, 0); else WN.card(c, x + (k - mid) * 18 * s, y, s, cols[k % 7], a); } };
  WN.pack = (c, x, y, s = 1, col = '#c8302a', torn = 0) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s); const W = 110, H = 190;
    if (torn > 0) { const up = Math.min(1, torn) * 70; for (const [dx, cc, a] of [[-12, '#2a9a5a', -.12], [10, '#3a78c8', .1]]) WN.card(c, dx, -60 - up, .8, cc, a); }
    const body = () => { c.beginPath(); c.moveTo(-W / 2, -H + 22); c.lineTo(W / 2, -H + 22); c.lineTo(W / 2 + 3, -14); c.lineTo(-W / 2 - 3, -14); c.closePath(); };
    body(); c.fillStyle = lin(c, -W / 2, 0, W / 2, 0, [sh(col, -.35), sh(col, .3), col, sh(col, .45), sh(col, -.3)]); c.fill(); ink(c, 3);
    c.save(); body(); c.clip(); c.globalCompositeOperation = 'screen'; c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-30, -H); c.lineTo(-10, -H); c.lineTo(20, 0); c.lineTo(0, 0); c.fill(); c.restore();
    c.save(); c.translate(0, -H / 2 - 6); star(c, 0, -14, 26, '#ffe070'); ink(c, 2.4); c.restore(); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.roundRect(-38, -66, 76, 22, 6); c.fill(); txt(c, 'HOBBY', 0, -54, 16, '#fff');
    const crimp = (yy) => { c.fillStyle = sh(col, -.2); c.beginPath(); c.moveTo(-W / 2 - 3, yy); for (let k = 0; k <= 14; k++) c.lineTo(-W / 2 - 3 + k * (W + 6) / 14, yy + (k % 2 ? 6 : 0)); c.lineTo(W / 2 + 3, yy + 18); c.lineTo(-W / 2 - 3, yy + 18); c.closePath(); c.fill(); ink(c, 2.4); };
    crimp(-16);
    if (torn < .05) crimp(-H + 4); else { const u = Math.min(1, torn); c.save(); c.translate(W / 2 + u * 30, -H + 10 - u * 60); c.rotate(u * .9); c.translate(-W / 2, 0); c.fillStyle = sh(col, -.2); c.beginPath(); c.moveTo(-W / 2, -6); c.lineTo(W / 2, -6); c.lineTo(W / 2, 14); for (let k = 10; k >= 0; k--) c.lineTo(-W / 2 + k * W / 10, 14 + (k % 2 ? 5 : -2)); c.closePath(); c.fill(); ink(c, 2.4); c.restore(); }
    c.restore(); };
  WN.box = (c, x, y, s = 1, col = '#1e2a4a', open = 0) => { c.save(); shadow(c, x, y, 150 * s, .38); c.translate(x, y); c.scale(s, s); const W = 220, H = 150, Dp = 60;
    const front = () => { c.beginPath(); c.rect(-W / 2, -H, W, H); }, side = () => { c.beginPath(); c.moveTo(W / 2, -H); c.lineTo(W / 2 + Dp, -H - Dp * .55); c.lineTo(W / 2 + Dp, -Dp * .55); c.lineTo(W / 2, 0); c.closePath(); };
    side(); c.fillStyle = sh(col, -.3); c.fill(); ink(c, 3); front(); c.fillStyle = lin(c, 0, -H, 0, 0, [sh(col, .25), col, sh(col, -.15)]); c.fill(); ink(c, 3);
    c.save(); front(); c.clip(); c.fillStyle = 'rgba(255,215,90,.9)'; c.fillRect(-W / 2, -H + 18, W, 10); c.fillRect(-W / 2, -26, W, 6); c.translate(-50, -70); star(c, 0, 0, 30, GOLD); ink(c, 2.4); c.restore();
    txt(c, 'HOBBY BOX', 30, -84, 26, '#fff'); txt(c, '24 PACKS', 30, -54, 16, '#ffd860', 'center', 'Oswald');
    const lidLift = open * 120, lidA = open * -.5;
    if (open > 0) { c.fillStyle = sh(col, -.5); c.beginPath(); c.moveTo(-W / 2, -H); c.lineTo(-W / 2 + Dp, -H - Dp * .55); c.lineTo(W / 2 + Dp, -H - Dp * .55); c.lineTo(W / 2, -H); c.closePath(); c.fill(); ink(c, 2.6);
      for (let k = 0; k < 5; k++) { c.save(); c.translate(-W / 2 + 34 + k * 42 + 10, -H - 6); c.scale(.55, .45); WN.pack(c, 0, 0, 1, ['#c8302a', '#3a78c8', '#2a9a5a', '#8a4ac8', '#e8742a'][k], 0); c.restore(); } }
    c.save(); c.translate(-W / 2, -H - lidLift); c.rotate(lidA); c.translate(W / 2, H);
    c.fillStyle = sh(col, .15); c.beginPath(); c.moveTo(-W / 2, -H); c.lineTo(-W / 2 + Dp, -H - Dp * .55); c.lineTo(W / 2 + Dp, -H - Dp * .55); c.lineTo(W / 2, -H); c.closePath(); c.fill(); ink(c, 3); c.restore();
    if (open <= 0) { c.save(); c.globalAlpha = .9; c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(-W / 2 + 14, -H + 10); c.quadraticCurveTo(-W / 2 + 20, -H / 2, -W / 2 + 12, -30); c.moveTo(W / 2 - 40, -H + 30); c.lineTo(W / 2 - 22, -H + 70); c.moveTo(W / 2 + 14, -H - 2); c.lineTo(W / 2 + Dp - 10, -H - Dp * .4); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(-W / 2 + 30, -H); c.lineTo(-W / 2 + 80, -H); c.lineTo(-W / 2 + 20, 0); c.lineTo(-W / 2 - 4, 0); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(W / 2 - 4, -H + 4); c.lineTo(W / 2 + 6, -H + 14); c.lineTo(W / 2 - 2, -H + 22); c.stroke(); c.restore(); }
    c.restore(); };
  WN.slab = (c, x, y, s = 1, grade = '10', gold = false) => { c.save(); shadow(c, x, y, 80 * s); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(220,235,245,.45)'; c.beginPath(); c.roundRect(-74, -250, 148, 250, 12); c.fill(); ink(c, 3.4);
    c.fillStyle = '#c8302a'; c.beginPath(); c.roundRect(-64, -240, 128, 44, 6); c.fill(); ink(c, 2.4); c.fillStyle = '#fff'; c.beginPath(); c.roundRect(-58, -234, 86, 32, 4); c.fill(); c.fillStyle = '#9aa0aa'; c.fillRect(-52, -228, 60, 5); c.fillRect(-52, -218, 44, 5); c.fillRect(-52, -210, 52, 4);
    txt(c, grade, 46, -217, 26, '#fff'); if (gold) WN.goldCard(c, 0, -14, .98, 0, 0); else WN.card(c, 0, -14, .98, '#3a78c8', 0);
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-64, -186); c.lineTo(-64, -40); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 8; c.beginPath(); c.moveTo(40, -190); c.lineTo(-10, -20); c.stroke(); c.restore(); };
  // ---- UI
  WN.phone = (c, x, y, s = 1, fn) => { const W = 400, H = 800; c.save(); shadow(c, x, y + 30 * s, 220 * s, .3); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.roundRect(-W / 2 + 14, -H + 14, W, H, 56); c.fill();
    c.fillStyle = lin(c, -W / 2, 0, W / 2, 0, ['#3a3a44', '#5a5a66', '#26262e']); c.beginPath(); c.roundRect(-W / 2, -H, W, H, 56); c.fill(); ink(c, 5);
    c.fillStyle = '#0e0e12'; c.beginPath(); c.roundRect(-W / 2 + 14, -H + 14, W - 28, H - 28, 44); c.fill();
    const sw = W - 40, shh = H - 40; c.save(); c.translate(-W / 2 + 20, -H + 20); c.beginPath(); c.roundRect(0, 0, sw, shh, 38); c.clip(); c.fillStyle = '#16141c'; c.fillRect(0, 0, sw, shh); if (fn) fn(c, sw, shh);
    c.fillStyle = 'rgba(255,255,255,.07)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(sw * .55, 0); c.lineTo(0, shh * .45); c.fill(); c.restore();
    c.fillStyle = '#0a0a0c'; c.beginPath(); c.roundRect(-46, -H + 30, 92, 26, 13); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-W / 2 - 4, -H + 170, 6, 70); c.fillRect(W / 2 - 2, -H + 200, 6, 100); c.restore(); };
  WN.swipe = (c, x, y, s = 1, p = 0) => { p = K.clamp(p); const W = 520, H = 96; c.save(); c.translate(x, y); c.scale(s, s); const done = p >= 1;
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.roundRect(-W / 2 + 6, -H / 2 + 8, W, H, H / 2); c.fill();
    c.fillStyle = done ? lin(c, 0, -H / 2, 0, H / 2, ['#5ae07a', '#1ea84a']) : lin(c, 0, -H / 2, 0, H / 2, ['#ffe25a', '#f2a81a']); c.beginPath(); c.roundRect(-W / 2, -H / 2, W, H, H / 2); c.fill(); ink(c, 4);
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.roundRect(-W / 2 + 20, -H / 2 + 8, W - 40, 16, 8); c.fill();
    c.save(); c.globalAlpha = 1 - p * .7; txt(c, done ? 'BID PLACED!' : 'SWIPE TO BID', 40, 2, 40, '#1a1208'); c.restore();
    for (let k = 0; k < 3; k++) { c.strokeStyle = `rgba(26,18,8,${.25 + k * .2})`; c.lineWidth = 5; const cx = W / 2 - 70 + k * 18; c.beginPath(); c.moveTo(cx - 8, -14); c.lineTo(cx + 4, 0); c.lineTo(cx - 8, 14); c.stroke(); }
    const tx = -W / 2 + H / 2 + p * (W - H); c.fillStyle = '#fff'; c.beginPath(); c.arc(tx, 0, H / 2 - 8, 0, 7); c.fill(); ink(c, 3.4); c.strokeStyle = done ? '#1ea84a' : '#f2a81a'; c.lineWidth = 7; c.beginPath(); c.moveTo(tx - 10, -14); c.lineTo(tx + 6, 0); c.lineTo(tx - 10, 14); c.stroke(); c.restore(); };
  WN.countdown = (c, x, y, s = 1, secs = 10, max = 15) => { c.save(); c.translate(x, y); const pulse = secs < 4 ? 1 + Math.abs(Math.sin(secs * Math.PI)) * .1 : 1; c.scale(s * pulse, s * pulse); const f = K.clamp(secs / max);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(5, 7, 72, 0, 7); c.fill(); c.fillStyle = '#1a1418'; c.beginPath(); c.arc(0, 0, 72, 0, 7); c.fill(); ink(c, 4);
    c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 14; c.beginPath(); c.arc(0, 0, 56, 0, 7); c.stroke(); c.strokeStyle = secs < 4 ? '#ff3a2a' : '#ff6a3a'; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, 56, -Math.PI / 2, -Math.PI / 2 + f * Math.PI * 2); c.stroke();
    if (secs < 4) TW.glow(c, 0, 0, 110, '255,60,40', .4); txt(c, String(Math.ceil(Math.max(0, secs))), 0, 4, 58, '#fff'); c.restore(); };
  WN.wheel = (c, x, y, s = 1, angle = 0, segs = 12) => { const cols = Array.isArray(segs) ? segs : Array.from({ length: segs }, (_, k) => ['#e2342e', '#f2a81a', '#ffe25a', '#4ac84a', '#2ab0c0', '#2f7ae0', '#8a4ac8', '#ff4aa8'][k % 8]); const n = cols.length, R0 = 200;
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(10, 14, R0 + 16, 0, 7); c.fill();
    c.fillStyle = lin(c, 0, -R0, 0, R0, ['#fff0b0', GOLD, GOLD_D]); c.beginPath(); c.arc(0, 0, R0 + 16, 0, 7); c.fill(); ink(c, 4);
    c.save(); c.rotate(angle); for (let k = 0; k < n; k++) { const a0 = k / n * Math.PI * 2, a1 = (k + 1) / n * Math.PI * 2; c.fillStyle = cols[k]; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R0, a0, a1); c.closePath(); c.fill(); c.strokeStyle = INK; c.lineWidth = 2.6; c.stroke();
      c.save(); c.rotate((a0 + a1) / 2); c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(30, 0); c.arc(0, 0, R0 - 10, -.12, .12); c.closePath(); c.fill(); txt(c, String(k + 1), R0 - 40, 0, 26, '#fff'); c.restore(); }
    c.restore(); c.fillStyle = '#fff6d8'; for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; c.beginPath(); c.arc(Math.cos(a) * (R0 + 8), Math.sin(a) * (R0 + 8), 4, 0, 7); c.fill(); }
    const g = c.createRadialGradient(-8, -8, 2, 0, 0, 34); g.addColorStop(0, '#fff8d0'); g.addColorStop(1, GOLD_D); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 32, 0, 7); c.fill(); ink(c, 3); star(c, 0, 0, 16, '#fff'); ink(c, 1.8);
    c.fillStyle = RED; c.beginPath(); c.moveTo(-20, -R0 - 40); c.lineTo(20, -R0 - 40); c.lineTo(0, -R0 + 14); c.closePath(); c.fill(); ink(c, 3.4); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.moveTo(-12, -R0 - 34); c.lineTo(-4, -R0 - 34); c.lineTo(-2, -R0 - 8); c.fill(); c.restore(); };
  const NAMES = ['cardking88', 'rip_city', 'pullsquad', 'mojo_hunter', 'slabdaddy', 'boxbreaker', 'gemmint10', 'chasecard', 'lucky_rips', 'hobbyhead', 'pc_builder', 'nightbreaks'];
  const LINES = ['LETS GOOO', 'one more box!!', 'I need that 1/1', 'RIP IT', 'my spot pls', 'no way', 'run it back', 'hit incoming', 'so close', 'buying 3 more', 'GG', 'insane pull'];
  const NCOL = ['#ffd23a', '#5ae0ff', '#ff7ab0', '#8aff8a', '#ffa05a', '#c0a0ff'];
  WN.chat = (c, x, y, w = 420, h = 600, t = 0, seed = 0) => { const lh = 74, sp = 1.6, off = t * sp * lh / 2; c.save(); c.translate(x, y); c.beginPath(); c.rect(0, 0, w, h); c.clip();
    const n0 = Math.floor(off / lh); for (let i = n0; i < n0 + Math.ceil(h / lh) + 2; i++) { const k = i + seed * 7, yy = h - (i * lh - off) - lh, nm = NAMES[(k * 5) % NAMES.length], ln = LINES[(k * 7 + 3) % LINES.length];
      const fadeA = K.clamp(yy / (h * .35)); if (fadeA <= 0) continue; c.globalAlpha = fadeA; const bw = Math.min(w - 20, 120 + ln.length * 13);
      c.fillStyle = 'rgba(10,8,16,.62)'; c.beginPath(); c.roundRect(6, yy + 4, bw, lh - 12, 18); c.fill(); c.fillStyle = NCOL[k % 6]; c.beginPath(); c.arc(32, yy + lh / 2 - 2, 16, 0, 7); c.fill(); ink(c, 2); txt(c, nm[0].toUpperCase(), 32, yy + lh / 2 - 1, 18, '#1a1208');
      TW.txt(c, nm, 58, yy + 22, 18, NCOL[k % 6], 'left', 'Oswald'); TW.txt(c, ln, 58, yy + 46, 22, '#fff', 'left', 'Oswald');
      const ex = 6 + bw + 22, ey = yy + lh / 2 - 4; if (ex < w - 10) { if (k % 3 === 0) heart(c, ex, ey, 14); else if (k % 3 === 1) fire(c, ex, ey + 4, 15); else { heart(c, ex, ey, 11, '#ff7ab0'); } } }
    c.globalAlpha = 1; for (let k = 0; k < 6; k++) { const u = ((t * .6 + k * .37 + seed * .13) % 1), hx = w - 40 + Math.sin(u * 9 + k) * 18, hy = h - u * h * .8; c.globalAlpha = 1 - u; heart(c, hx, hy, 12 + (k % 3) * 4, ['#ff3a5a', '#ff7ab0', '#ffd23a'][k % 3]); }
    c.restore(); };
  WN.spent = (c, x, y, s = 1, value = 0) => { c.save(); c.translate(x, y); c.scale(s, s); const W = 330, H = 110;
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.roundRect(8, 10, W, H, 16); c.fill(); c.fillStyle = lin(c, 0, 0, 0, H, ['#e8443a', '#a8161a']); c.beginPath(); c.roundRect(0, 0, W, H, 16); c.fill(); ink(c, 4);
    c.strokeStyle = 'rgba(255,220,200,.5)'; c.lineWidth = 1.6; c.beginPath(); c.roundRect(5, 5, W - 10, H - 10, 12); c.stroke(); c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.roundRect(10, 8, W - 20, 22, 10); c.fill();
    TW.txt(c, 'SPENT', 18, 28, 22, '#ffd8c8', 'left', 'Oswald'); txt(c, '$' + Math.round(value).toLocaleString('en-US'), W - 18, 68, 52, '#fff', 'right');
    c.save(); c.translate(36, 72); c.fillStyle = '#ffe25a'; c.beginPath(); c.arc(0, 0, 18, 0, 7); c.fill(); ink(c, 2.4); txt(c, '$', 0, 1, 22, '#a8701a'); c.restore(); c.restore(); };
  // ---- objects
  WN.envelope = (c, x, y, s = 1, open = 0) => { c.save(); shadow(c, x, y, 110 * s); c.translate(x, y); c.scale(s, s); const W = 220, H = 140; open = K.clamp(open);
    c.fillStyle = sh('#e8dcc0', -.1); c.beginPath(); c.rect(-W / 2, -H, W, H); c.fill(); ink(c, 3);
    if (open > 0) { const ly = -H + 30 - open * 90; c.fillStyle = '#fbfaf6'; c.beginPath(); c.rect(-W / 2 + 16, ly, W - 32, H - 20); c.fill(); ink(c, 2.4); c.fillStyle = '#9aa0aa'; for (let k = 0; k < 4; k++) c.fillRect(-W / 2 + 32, ly + 18 + k * 14, W - 80 - (k % 2) * 30, 4); }
    c.fillStyle = '#f0e6cc'; c.beginPath(); c.moveTo(-W / 2, -H); c.lineTo(0, -H * .42); c.lineTo(W / 2, -H); c.lineTo(W / 2, 0); c.lineTo(-W / 2, 0); c.closePath(); c.fill(); ink(c, 3);
    c.strokeStyle = 'rgba(120,100,60,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-W / 2, 0); c.lineTo(-8, -H * .5); c.moveTo(W / 2, 0); c.lineTo(8, -H * .5); c.stroke();
    const fl = 1 - open * 2; c.fillStyle = fl > 0 ? '#e8dcc0' : '#d8ccb0'; c.beginPath(); c.moveTo(-W / 2, -H); c.lineTo(0, -H + fl * H * .55); c.lineTo(W / 2, -H); c.closePath(); c.fill(); ink(c, 3);
    if (open < .3) { c.fillStyle = '#b8282e'; c.beginPath(); c.arc(0, -H * .48, 14, 0, 7); c.fill(); ink(c, 2.2); c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.arc(-4, -H * .48 - 4, 4, 0, 7); c.fill(); } c.restore(); };
  const wheelS = (c, x, y, r, ang) => { c.save(); c.translate(x, y); c.fillStyle = '#16161a'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); ink(c, 3); c.rotate(ang); c.fillStyle = lin(c, 0, -r, 0, r, ['#e8eaee', '#8a8e96']); c.beginPath(); c.arc(0, 0, r * .62, 0, 7); c.fill(); ink(c, 2);
    c.strokeStyle = '#4a4e56'; c.lineWidth = 4; for (let k = 0; k < 5; k++) { const a = k * Math.PI * 2 / 5; c.beginPath(); c.moveTo(Math.cos(a) * r * .14, Math.sin(a) * r * .14); c.lineTo(Math.cos(a) * r * .56, Math.sin(a) * r * .56); c.stroke(); } c.fillStyle = '#c8302a'; c.beginPath(); c.arc(0, 0, r * .14, 0, 7); c.fill(); c.restore(); };
  WN.supercar = (c, x, y, s = 1, t = 0, rot = 0) => { c.save(); shadow(c, x, y, 260 * s, .45); c.translate(x, y); c.rotate(rot); c.scale(s, s); const col = '#e2242a';
    const body = () => { c.beginPath(); c.moveTo(-250, -40); c.lineTo(-256, -78); c.quadraticCurveTo(-200, -96, -110, -106); c.quadraticCurveTo(-40, -158, 40, -156); c.quadraticCurveTo(120, -150, 170, -104); c.quadraticCurveTo(240, -96, 262, -64); c.lineTo(258, -36); c.quadraticCurveTo(250, -22, 230, -22); c.lineTo(-236, -22); c.quadraticCurveTo(-252, -24, -250, -40); c.closePath(); };
    body(); c.fillStyle = lin(c, 0, -160, 0, -20, [sh(col, .35), col, sh(col, -.35)]); c.fill(); ink(c, 3.4);
    c.fillStyle = lin(c, 0, -150, 0, -104, ['#a8d8f0', '#2a3a50']); c.beginPath(); c.moveTo(-96, -108); c.quadraticCurveTo(-36, -148, 36, -148); c.quadraticCurveTo(100, -144, 140, -108); c.closePath(); c.fill(); ink(c, 2.6); c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(30, -148); c.lineTo(22, -108); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.moveTo(-60, -116); c.lineTo(-30, -140); c.lineTo(-14, -140); c.lineTo(-44, -116); c.fill();
    c.fillStyle = sh(col, -.4); c.beginPath(); c.moveTo(-40, -80); c.quadraticCurveTo(0, -96, 50, -84); c.lineTo(40, -60); c.quadraticCurveTo(0, -70, -30, -60); c.closePath(); c.fill(); c.fillStyle = '#1a1a1e'; c.beginPath(); c.moveTo(-6, -84); c.lineTo(36, -84); c.lineTo(30, -66); c.lineTo(0, -70); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-230, -84); c.quadraticCurveTo(-120, -100, -100, -104); c.moveTo(170, -98); c.quadraticCurveTo(220, -90, 250, -70); c.stroke();
    c.fillStyle = '#ffe8a0'; c.beginPath(); c.moveTo(236, -76); c.lineTo(258, -66); c.lineTo(234, -64); c.closePath(); c.fill(); ink(c, 2); c.fillStyle = '#ff4a3a'; c.fillRect(-256, -74, 12, 10);
    c.fillStyle = '#1a1a1e'; c.beginPath(); c.moveTo(-250, -96); c.lineTo(-210, -98); c.lineTo(-206, -90); c.lineTo(-250, -86); c.fill();
    for (const wx of [-160, 160]) { c.fillStyle = '#16161a'; c.beginPath(); c.arc(wx, -30, 50, Math.PI, 0); c.fill(); wheelS(c, wx, -32, 44, t * 8); }
    c.restore(); };
  WN.gavel = (c, x, y, s = 1, ang = 0) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s);
    c.fillStyle = lin(c, 0, -26, 0, 0, ['#a8703a', '#6a4220']); c.beginPath(); c.ellipse(0, -12, 58, 14, 0, 0, 7); c.fill(); ink(c, 2.6); c.fillStyle = '#8a5a2e'; c.beginPath(); c.ellipse(0, -18, 54, 11, 0, 0, 7); c.fill(); ink(c, 2.4);
    c.save(); c.translate(70, -40); c.rotate(-ang); c.fillStyle = '#7a4a24'; c.beginPath(); c.roundRect(-110, -6, 110, 12, 6); c.fill(); ink(c, 2.4);
    c.fillStyle = lin(c, 0, -30, 0, 30, ['#c88a4a', '#7a4a24']); c.beginPath(); c.roundRect(-140, -26, 44, 52, 8); c.fill(); ink(c, 2.8); c.fillStyle = '#e8b44a'; c.fillRect(-140, -16, 44, 6); c.fillRect(-140, 10, 44, 6); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(-134, -22, 6, 40); c.restore(); c.restore(); };
  WN.lectern = (c, x, y, s = 1, col = '#7a4a2a') => { c.save(); shadow(c, x, y, 130 * s, .4); c.translate(x, y); c.scale(s, s);
    c.fillStyle = sh(col, -.3); c.beginPath(); c.roundRect(-110, -14, 220, 14, 4); c.fill(); ink(c, 2.6);
    c.fillStyle = lin(c, -90, 0, 90, 0, [sh(col, -.25), sh(col, .2), col, sh(col, -.3)]); c.beginPath(); c.moveTo(-80, -14); c.lineTo(-96, -250); c.lineTo(96, -250); c.lineTo(80, -14); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(col, .15); c.beginPath(); c.moveTo(-124, -246); c.lineTo(124, -246); c.lineTo(110, -282); c.lineTo(-110, -282); c.closePath(); c.fill(); ink(c, 3);
    c.strokeStyle = sh(col, -.4); c.lineWidth = 3; c.beginPath(); c.roundRect(-60, -210, 120, 150, 8); c.stroke(); c.fillStyle = '#e8b44a'; c.beginPath(); c.arc(0, -136, 24, 0, 7); c.fill(); ink(c, 2.4); star(c, 0, -136, 13, '#fff4c8');
    c.fillStyle = '#2a2a30'; c.fillRect(-4, -330, 8, 50); c.beginPath(); c.ellipse(0, -334, 9, 14, 0, 0, 7); c.fill(); ink(c, 2); c.restore(); };
  WN.paddle = (c, x, y, s = 1, num = 27) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a4220'; c.beginPath(); c.roundRect(-8, -130, 16, 130, 6); c.fill(); ink(c, 2.6);
    c.fillStyle = '#fbfaf4'; c.beginPath(); c.ellipse(0, -190, 64, 70, 0, 0, 7); c.fill(); ink(c, 3.4); c.strokeStyle = '#c8302a'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, -190, 54, 60, 0, 0, 7); c.stroke();
    txt(c, String(num), 0, -186, 54, INK); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(-30, -224, 12, 6, -.6, 0, 7); c.fill(); c.restore(); };
  WN.chip = (c, x, y, s = 1, col = '#c8302a') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = sh(col, -.4); c.beginPath(); c.ellipse(0, 8, 50, 50, 0, 0, 7); c.fill(); ink(c, 3);
    c.fillStyle = col; c.beginPath(); c.arc(0, 0, 50, 0, 7); c.fill(); ink(c, 3); c.fillStyle = '#fff'; for (let k = 0; k < 8; k++) { c.save(); c.rotate(k * Math.PI / 4); c.fillRect(-7, -50, 14, 13); c.restore(); }
    c.fillStyle = sh(col, .2); c.beginPath(); c.arc(0, 0, 32, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2.4; c.setLineDash([5, 4]); c.beginPath(); c.arc(0, 0, 28, 0, 7); c.stroke(); c.setLineDash([]); txt(c, '$', 0, 2, 30, '#fff');
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-20, -24, 14, 6, -.6, 0, 7); c.fill(); c.restore(); };
  const die = (c, x, y, r, v, rot) => { c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = lin(c, -r, -r, r, r, ['#ffffff', '#e2e2e8']); c.beginPath(); c.roundRect(-r, -r, r * 2, r * 2, r * .3); c.fill(); ink(c, 3);
    const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[v] || [];
    c.fillStyle = v === 1 ? '#c8302a' : INK; for (const [px, py] of P) { c.beginPath(); c.arc(px * r * .5, py * r * .5, r * .16, 0, 7); c.fill(); } c.restore(); };
  WN.dice = (c, x, y, s = 1, a = 6, b = 5) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s); die(c, -30, -32, 30, a, -.18); die(c, 36, -28, 26, b, .3); c.restore(); };
  WN.files = (c, x, y, s = 1, n = 6) => { c.save(); shadow(c, x, y, 120 * s, .35); c.translate(x, y); c.scale(s, s);
    for (let k = 0; k < n; k++) { const yy = -k * 22, dx = Math.sin(k * 2.3) * 8; c.fillStyle = ['#e8c878', '#d8b868', '#ecd08a'][k % 3]; c.beginPath(); c.roundRect(-100 + dx, yy - 22, 200, 22, 3); c.fill(); ink(c, 2.4);
      c.fillStyle = '#fbfaf4'; c.fillRect(-92 + dx, yy - 25, 184, 4); c.fillStyle = '#c8302a'; c.beginPath(); c.roundRect(50 + dx - (k % 3) * 40, yy - 30, 34, 10, 2); c.fill(); ink(c, 1.6); }
    c.fillStyle = '#fbfaf4'; c.save(); c.translate(0, -n * 22 - 4); c.rotate(-.06); c.beginPath(); c.rect(-80, -10, 160, 10); c.fill(); ink(c, 2); txt(c, 'CLAIM', 0, -5, 11, '#c8302a', 'center', 'Oswald'); c.restore(); c.restore(); };
  WN.dragon = (c, x, y, s = 1, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); const N = 11, pts = [];
    for (let k = 0; k <= N; k++) pts.push([-k * 46, Math.sin(t * 3 - k * .6) * 36]);
    for (let k = N; k >= 1; k--) { const [px, py] = pts[k], r = 40 - k * 1.8; c.fillStyle = k % 2 ? '#d8282e' : '#f2c14a'; c.beginPath(); c.ellipse(px, py, r + 6, r, Math.atan2(pts[k - 1][1] - py, 46), 0, 7); c.fill(); ink(c, 2.8);
      c.fillStyle = k % 2 ? '#f2c14a' : '#d8282e'; c.beginPath(); c.moveTo(px - 10, py - r); c.lineTo(px, py - r - 18); c.lineTo(px + 10, py - r); c.closePath(); c.fill(); ink(c, 2);
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; c.beginPath(); c.ellipse(px, py - r * .3, r * .6, r * .3, 0, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
    const [tx, ty] = pts[N]; c.fillStyle = '#f2c14a'; c.beginPath(); c.moveTo(tx - 10, ty); c.lineTo(tx - 60, ty - 30); c.lineTo(tx - 44, ty); c.lineTo(tx - 60, ty + 30); c.closePath(); c.fill(); ink(c, 2.4);
    const [hx, hy] = pts[0]; c.save(); c.translate(hx + 10, hy); c.rotate(Math.sin(t * 3 + .6) * .15);
    c.strokeStyle = '#f2c14a'; c.lineWidth = 4; c.beginPath(); c.moveTo(30, -30); c.bezierCurveTo(10, -80, -30, -70, -50, -90); c.moveTo(20, -36); c.bezierCurveTo(30, -80, 60, -70, 50, -100); c.stroke();
    c.save(); c.translate(76, 4); c.rotate(.25); WN.goldCard(c, 0, 70, .6, 0, .5 + .5 * Math.sin(t * 4)); c.restore();
    c.fillStyle = '#d8282e'; c.beginPath(); c.moveTo(-30, -26); c.quadraticCurveTo(10, -50, 50, -26); c.lineTo(90, -14); c.quadraticCurveTo(96, 0, 84, 6); c.lineTo(40, 6); c.lineTo(84, 18); c.quadraticCurveTo(70, 36, 30, 30); c.quadraticCurveTo(-20, 34, -30, 10); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = '#f2c14a'; c.beginPath(); c.moveTo(-34, -20); c.lineTo(-60, -40); c.lineTo(-48, -10); c.lineTo(-64, 4); c.lineTo(-34, 10); c.closePath(); c.fill(); ink(c, 2.4);
    c.fillStyle = '#fff'; c.beginPath(); c.ellipse(36, -22, 11, 9, 0, 0, 7); c.fill(); ink(c, 2.2); c.fillStyle = INK; c.beginPath(); c.arc(40, -22, 4.5, 0, 7); c.fill();
    c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(86, -8); c.quadraticCurveTo(120, -20, 130, 0); c.moveTo(86, 0); c.quadraticCurveTo(116, 10, 124, 30); c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(60, 6); c.lineTo(64, 14); c.lineTo(68, 6); c.fill(); c.restore(); c.restore(); };
  WN.stamp = (c, x, y, s = 1, text = 'GAMBLING?', col = '#d8282e') => { c.save(); c.translate(x, y); c.rotate(-.16); c.scale(s, s); c.font = '64px Anton'; const w = c.measureText(text).width + 50;
    c.globalAlpha = .9; c.strokeStyle = col; c.lineWidth = 8; c.beginPath(); c.roundRect(-w / 2, -50, w, 100, 12); c.stroke(); c.lineWidth = 2.5; c.beginPath(); c.roundRect(-w / 2 + 10, -40, w - 20, 80, 8); c.stroke(); txt(c, text, 0, 3, 64, col);
    c.globalCompositeOperation = 'destination-out'; c.fillStyle = 'rgba(0,0,0,.35)'; for (let k = 0; k < 40; k++) { c.beginPath(); c.arc(((k * 97) % w) - w / 2, ((k * 53) % 100) - 50, 2 + (k % 3), 0, 7); c.fill(); } c.restore(); };
  WN.creditCard = (c, x, y, s = 1, col = '#2a3a8a', maxed = false) => { c.save(); c.translate(x, y); c.rotate(-.06); c.scale(s, s); const W = 300, H = 190;
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.roundRect(-W / 2 + 8, -H / 2 + 10, W, H, 16); c.fill(); c.fillStyle = lin(c, -W / 2, -H / 2, W / 2, H / 2, [sh(col, .35), col, sh(col, -.35)]); c.beginPath(); c.roundRect(-W / 2, -H / 2, W, H, 16); c.fill(); ink(c, 3.4);
    c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.arc(W / 2 - 20, -H / 2 + 10, 120, 0, 7); c.fill();
    c.fillStyle = lin(c, 0, -20, 0, 20, ['#fff0b0', GOLD_D]); c.beginPath(); c.roundRect(-W / 2 + 26, -30, 50, 38, 6); c.fill(); ink(c, 2); c.strokeStyle = GOLD_D; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-W / 2 + 26, -11); c.lineTo(-W / 2 + 76, -11); c.moveTo(-W / 2 + 51, -30); c.lineTo(-W / 2 + 51, 8); c.stroke();
    TW.txt(c, '4000  1234  5678  9010', -W / 2 + 26, 40, 22, '#f4f4f4', 'left', 'Oswald'); c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(-W / 2 + 26, 62, 110, 6);
    c.fillStyle = '#e2342e'; c.beginPath(); c.arc(W / 2 - 64, 58, 18, 0, 7); c.fill(); c.fillStyle = 'rgba(242,168,26,.9)'; c.beginPath(); c.arc(W / 2 - 42, 58, 18, 0, 7); c.fill();
    if (maxed) { c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(40, -H / 2); c.lineTo(20, -40); c.lineTo(50, -10); c.lineTo(24, 30); c.lineTo(46, H / 2); c.stroke(); c.save(); c.rotate(-.18); c.fillStyle = 'rgba(216,32,40,.92)'; c.fillRect(-W / 2 - 20, -24, W + 40, 48); c.strokeStyle = INK; c.lineWidth = 3; c.strokeRect(-W / 2 - 20, -24, W + 40, 48); txt(c, 'DECLINED', 0, 2, 38, '#fff'); c.restore(); }
    c.restore(); };
  WN.basementBoxes = (c, x, y, s = 1, n = 6) => { c.save(); shadow(c, x, y, 200 * s, .4); c.translate(x, y); c.scale(s, s); const B = (bx, by, w, h, r) => { c.save(); c.translate(bx, by); c.rotate(r);
      c.fillStyle = lin(c, 0, -h, 0, 0, ['#d8a868', '#b8844a']); c.beginPath(); c.rect(-w / 2, -h, w, h); c.fill(); ink(c, 3); c.fillStyle = 'rgba(200,170,110,.9)'; c.fillRect(-12, -h, 24, h); c.strokeStyle = 'rgba(90,60,30,.5)'; c.lineWidth = 2; c.strokeRect(-12, -h, 24, h);
      c.fillStyle = '#fbfaf4'; c.fillRect(w / 2 - 54, -h + 16, 40, 26); c.fillStyle = '#9aa0aa'; c.fillRect(w / 2 - 50, -h + 22, 30, 3); c.fillRect(w / 2 - 50, -h + 30, 22, 3); c.restore(); };
    const L = [[-130, 0, 150, 110, 0], [30, 0, 170, 120, 0], [170, 0, 120, 90, 0], [-60, -110, 140, 100, -.05], [100, -120, 130, 96, .06], [20, -216, 120, 86, -.04], [-170, -110, 90, 70, .1], [180, -90, 90, 70, -.08]];
    for (let k = 0; k < Math.min(n, L.length); k++) B(...L[k]); c.restore(); };
  WN.lootChest = (c, x, y, s = 1, open = 0) => { c.save(); shadow(c, x, y, 120 * s, .4); c.translate(x, y); c.scale(s, s); open = K.clamp(open); const W = 180, H = 100;
    if (open > 0) { TW.glow(c, 0, -H - 20, 160, '255,210,90', .8 * open); c.save(); c.globalAlpha = open * .6; c.fillStyle = '#fff2b0'; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(k * 18, -H); c.lineTo(k * 60 - 20, -H - 200); c.lineTo(k * 60 + 20, -H - 200); c.closePath(); c.fill(); } c.restore(); }
    c.fillStyle = lin(c, 0, -H, 0, 0, ['#8a4ac8', '#4a1a8a']); c.beginPath(); c.roundRect(-W / 2, -H, W, H, 8); c.fill(); ink(c, 3.4);
    c.fillStyle = GOLD; for (const bx of [-W / 2 + 16, W / 2 - 30]) { c.beginPath(); c.rect(bx, -H, 14, H); c.fill(); ink(c, 2.2); } c.beginPath(); c.roundRect(-18, -H + 10, 36, 40, 6); c.fill(); ink(c, 2.6); c.fillStyle = INK; c.beginPath(); c.arc(0, -H + 26, 5, 0, 7); c.fill(); c.fillRect(-2, -H + 26, 4, 14);
    if (open > 0) { c.fillStyle = '#ffe070'; c.beginPath(); c.ellipse(0, -H, W / 2 - 10, 16, 0, 0, 7); c.fill(); for (let k = 0; k < 7; k++) { c.fillStyle = k % 2 ? GOLD : '#fff2b0'; c.beginPath(); c.arc(-60 + k * 20, -H - 4 - (k % 3) * 6, 10, 0, 7); c.fill(); ink(c, 1.6); } }
    c.save(); c.translate(0, -H); c.translate(0, -open * 30); c.rotate(-open * .5); c.translate(W / 2 * open * .4, 0);
    c.fillStyle = lin(c, 0, -70, 0, 0, ['#a86ae8', '#5a2a9a']); c.beginPath(); c.moveTo(-W / 2, 0); c.lineTo(-W / 2, -36); c.quadraticCurveTo(0, -80, W / 2, -36); c.lineTo(W / 2, 0); c.closePath(); c.fill(); ink(c, 3.4);
    c.fillStyle = GOLD; for (const bx of [-W / 2 + 16, W / 2 - 30]) { c.beginPath(); c.rect(bx, -50, 14, 50); c.fill(); ink(c, 2.2); } c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(-30, -46, 40, 8, -.2, 0, 7); c.fill(); c.restore(); c.restore(); };
  WN.laptop = (c, x, y, s = 1, fn) => { c.save(); shadow(c, x, y, 200 * s, .35); c.translate(x, y); c.scale(s, s); const W = 340, H = 220;
    c.fillStyle = lin(c, 0, -H - 20, 0, -20, ['#5a5e68', '#2a2c32']); c.beginPath(); c.roundRect(-W / 2, -H - 24, W, H, 12); c.fill(); ink(c, 3.4);
    c.save(); c.translate(-W / 2 + 14, -H - 10); c.beginPath(); c.rect(0, 0, W - 28, H - 28); c.clip(); c.fillStyle = '#101018'; c.fillRect(0, 0, W - 28, H - 28); if (fn) fn(c, W - 28, H - 28); c.fillStyle = 'rgba(255,255,255,.07)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(W * .5, 0); c.lineTo(0, H * .6); c.fill(); c.restore();
    c.fillStyle = lin(c, 0, -24, 0, 0, ['#c8ccd4', '#7a7e88']); c.beginPath(); c.moveTo(-W / 2 - 10, -24); c.lineTo(W / 2 + 10, -24); c.lineTo(W / 2 + 34, 0); c.lineTo(-W / 2 - 34, 0); c.closePath(); c.fill(); ink(c, 3); c.fillStyle = '#5a5e68'; c.fillRect(-30, -10, 60, 6); c.restore(); };
  WN.turkey = (c, x, y, s = 1, t = 0) => { const w = Math.sin(t * 8); c.save(); shadow(c, x, y, 60 * s); c.translate(x, y - Math.abs(w) * 4 * s); c.rotate(w * .06); c.scale(s, s);
    for (const [lx, ph] of [[-12, 0], [12, Math.PI]]) { const a = Math.sin(t * 8 + ph) * .4; c.save(); c.translate(lx, -40); c.rotate(a); c.strokeStyle = '#e8a83a'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 38); c.stroke(); c.lineWidth = 4; c.beginPath(); c.moveTo(-10, 40); c.lineTo(0, 36); c.lineTo(10, 40); c.stroke(); c.restore(); }
    const fan = ['#8a4a20', '#c87a2a', '#e8b44a', '#a8302a', '#6a3a1a']; for (let k = 0; k < 9; k++) { const a = -Math.PI * .95 + k * Math.PI * .9 / 8; c.save(); c.translate(-14, -70); c.rotate(a + Math.PI / 2); c.fillStyle = fan[k % 5]; c.beginPath(); c.ellipse(0, -52, 16, 46, 0, 0, 7); c.fill(); ink(c, 2.4); c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.ellipse(-4, -72, 4, 18, 0, 0, 7); c.fill(); c.restore(); }
    c.fillStyle = lin(c, 0, -110, 0, -30, ['#8a5a32', '#5a3418']); c.beginPath(); c.ellipse(0, -70, 44, 40, 0, 0, 7); c.fill(); ink(c, 3); c.fillStyle = '#6a4020'; c.beginPath(); c.ellipse(-8, -62, 26, 22, .3, 0, 7); c.fill(); ink(c, 2);
    c.fillStyle = '#d8a084'; c.beginPath(); c.ellipse(30, -118, 16, 20, 0, 0, 7); c.fill(); ink(c, 2.6); c.strokeStyle = INK; c.lineWidth = 2.4; c.fillStyle = '#d8a084'; c.beginPath(); c.moveTo(24, -102); c.quadraticCurveTo(26, -90, 30, -84); c.stroke();
    c.fillStyle = '#e8a83a'; c.beginPath(); c.moveTo(44, -122); c.lineTo(58, -116); c.lineTo(44, -110); c.closePath(); c.fill(); ink(c, 2); c.fillStyle = '#d8282e'; c.beginPath(); c.moveTo(44, -112); c.quadraticCurveTo(52, -96, 42, -92); c.quadraticCurveTo(38, -102, 42, -112); c.fill(); ink(c, 1.8);
    c.fillStyle = '#fff'; c.beginPath(); c.arc(34, -124, 6, 0, 7); c.fill(); ink(c, 1.8); c.fillStyle = INK; c.beginPath(); c.arc(36, -124, 2.8, 0, 7); c.fill(); c.restore(); };
  WN.broccoli = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 40 * s); c.translate(x, y); c.scale(s, s); c.fillStyle = '#a8d878'; c.beginPath(); c.moveTo(-14, 0); c.lineTo(-10, -50); c.lineTo(-30, -70); c.lineTo(30, -70); c.lineTo(10, -50); c.lineTo(14, 0); c.closePath(); c.fill(); ink(c, 2.6);
    for (const [bx, by, r, col] of [[-30, -84, 22, '#3a8a3a'], [30, -84, 22, '#3a8a3a'], [0, -100, 26, '#4a9a40'], [-18, -112, 20, '#58aa48'], [20, -110, 20, '#58aa48']]) { c.fillStyle = col; c.beginPath(); c.arc(bx, by, r, 0, 7); c.fill(); ink(c, 2.4); c.fillStyle = 'rgba(255,255,255,.2)'; c.beginPath(); c.arc(bx - r * .3, by - r * .3, r * .35, 0, 7); c.fill(); } c.restore(); };
})(window);
