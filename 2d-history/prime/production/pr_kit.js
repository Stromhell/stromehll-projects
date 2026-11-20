// Prime drink story (PR) kit: cast + props. Loaded after tw_kit.js, xu_kit.js, jh_kit.js.
// Real people are stylised stand-ins (no likeness, no real logos or badges). The drink is drawn as a generic sports
// bottle with plain chunky 'PRIME' type only.
// Props draw in world space at (x, y) = bottom centre on the ground (gauges, tags, counters, bubbles: centre).
// Prop scale s uses the same number you give a figure: a bottle at s=1.9 is about forearm length next to a figure at s=1.9.
(function (G) {
  const K = G.KIT, E = K.E, TW = G.TW, INK = TW.INK, txt = TW.txt, rr = TW.rr;
  const R6 = G.RIG6, sh = (h, f) => G.RIG.shadeHex(h, f);
  const PR = G.PR = {};
  const L6 = () => R6.LOOKS;
  const look = (base, o, pr) => ({ look: Object.assign({}, L6()[base], { style: 'gumball' }, o, pr ? { pr } : {}) });
  PR.COLS = { blue: '#3fb4ea', ice: '#3fb4ea', red: '#e8473c', tropical: '#ee5a3a', lime: '#9ccf34', orange: '#f59a26', purple: '#8c4fd2', grape: '#8c4fd2' };
  const colOf = k => PR.COLS[k] || k || PR.COLS.blue;
  PR.GOLD = '#f2c14a'; PR.INK = INK;

  // ---- shared painterly helpers
  const shadow = PR.shadow = (c, x, y, w, a = .32) => { c.save(); c.translate(x, y); c.scale(1, .22); const g = c.createRadialGradient(0, 0, 0, 0, 0, w); g.addColorStop(0, `rgba(30,18,8,${a})`); g.addColorStop(1, 'rgba(30,18,8,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, w, 0, 7); c.fill(); c.restore(); };
  const cyl = (c, x0, x1, col, dk = -.32, lt = .28) => { const g = c.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, sh(col, dk)); g.addColorStop(.3, sh(col, lt)); g.addColorStop(.45, col); g.addColorStop(1, sh(col, dk * 1.2)); return g; };
  const shine = (c, x, y0, y1, w = 2, a = .55) => { c.save(); c.globalAlpha = a; c.strokeStyle = '#fff'; c.lineCap = 'round'; c.lineWidth = w; c.beginPath(); c.moveTo(x, y0); c.lineTo(x, y1); c.stroke(); c.restore(); };
  const font = (px, fam = 'Anton') => `${px}px ${fam}`;
  const fit = (c, s, maxW, px, fam = 'Anton') => { c.font = font(px, fam); const w = c.measureText(s).width; return w > maxW ? px * maxW / w : px; };

  // ---- figure extras: look.pr = { stubble, chain, headset, gloves, shorts, cap, beanie, scale }
  const F0 = R6.figure;
  R6.figure = (ctx, o) => {
    const L = o.look, X = L && L.pr; if (!X) return F0(ctx, o);
    const o2 = Object.assign({}, o); if (X.scale) o2.s = (o.s ?? 1) * X.scale; const s = o2.s ?? 1;
    o2.out = o.out || {}; const userHat = o.hat, out = o2.out;
    o2.hat = (c, hx, hy, r) => { const Xh = hx, Y = hy + 57 * .08, rx = 53, ry = 57; c.save(); c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round';
      if (X.shorts) { const hp = out.hipY / s; c.fillStyle = X.shorts; c.lineWidth = 3; c.beginPath(); c.moveTo(-34, hp - 8); c.lineTo(34, hp - 8); c.lineTo(38, hp + 56); c.lineTo(4, hp + 58); c.lineTo(0, hp + 30); c.lineTo(-4, hp + 58); c.lineTo(-38, hp + 56); c.closePath(); c.fill(); c.stroke();
        c.fillStyle = X.band || '#f4f4f4'; c.fillRect(-34, hp - 8, 68, 12); c.strokeRect(-34, hp - 8, 68, 12); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-36, hp + 46, 74, 8); }
      if (X.abs) { c.strokeStyle = sh(L.skin, -.3); c.lineWidth = 2.2; c.beginPath(); c.moveTo(Xh - 4, Y + ry + 58); c.quadraticCurveTo(Xh + 14, Y + ry + 66, Xh + 28, Y + ry + 58); c.moveTo(Xh + 10, Y + ry + 80); c.lineTo(Xh + 10, Y + ry + 104); c.stroke(); }
      if (X.chain) { c.strokeStyle = '#8a6a1e'; c.lineWidth = 4.5; c.beginPath(); c.ellipse(Xh + 2, Y + ry * .95 + 10, 20, 22, 0, .25, Math.PI - .25); c.stroke(); c.strokeStyle = '#f2d06a'; c.lineWidth = 2.4; c.setLineDash([3, 2]); c.stroke(); c.setLineDash([]); c.fillStyle = '#f2d06a'; c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.arc(Xh + 2, Y + ry * .95 + 33, 4, 0, 7); c.fill(); c.stroke(); }
      if (X.stubble) { c.save(); c.beginPath(); c.ellipse(Xh + rx * .22, Y + ry * .66, rx * .72, ry * .36, 0, 0, 7); c.clip(); c.fillStyle = X.stubble === true ? sh(L.hairCol, -.1) : X.stubble; c.globalAlpha = .22; c.beginPath(); c.ellipse(Xh + rx * .22, Y + ry * .95, rx * .8, ry * .42, 0, 0, 7); c.fill(); c.globalAlpha = .45; for (let k = 0; k < 40; k++) { const a = k * 2.399, rr2 = Math.sqrt(k / 40); c.fillRect(Xh + rx * .22 + Math.cos(a) * rx * .7 * rr2, Y + ry * .8 + Math.abs(Math.sin(a)) * ry * .22 * rr2 + 4, 1.6, 1.6); } c.restore(); }
      if (X.beanie || X.cap) { const col = X.beanie || X.cap; c.fillStyle = col; c.lineWidth = 3; c.beginPath(); c.moveTo(Xh - rx * 1.06, Y - ry * .32); c.bezierCurveTo(Xh - rx * 1.05, Y - ry * 1.45, Xh + rx * 1.05, Y - ry * 1.45, Xh + rx * 1.04, Y - ry * .36); c.closePath(); c.fill(); c.stroke();
        if (X.beanie) { c.fillStyle = sh(col, -.18); rr(c, Xh - rx * 1.1, Y - ry * .5, rx * 2.2, ry * .3, 8); c.fill(); c.stroke(); c.fillStyle = sh(col, .2); c.beginPath(); c.arc(Xh, Y - ry * 1.2, 9, 0, 7); c.fill(); c.stroke(); }
        else { c.fillStyle = sh(col, -.15); c.beginPath(); c.moveTo(Xh + rx * .6, Y - ry * .4); c.quadraticCurveTo(Xh + rx * 1.5, Y - ry * .5, Xh + rx * 1.55, Y - ry * .28); c.lineTo(Xh + rx * .7, Y - ry * .28); c.closePath(); c.fill(); c.stroke(); } }
      if (X.headset) { const col = X.headset === true ? '#26262e' : X.headset; c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.ellipse(Xh - rx * .3, Y - ry * .1, rx * .72, ry * 1.02, -.12, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); c.strokeStyle = col; c.lineWidth = 5.5; c.stroke();
        c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 2.8; rr(c, Xh - rx * .55 - 13, Y + ry * .12 - 19, 26, 38, 10); c.fill(); c.stroke(); c.fillStyle = X.glow || '#3ae0ff'; c.fillRect(Xh - rx * .55 - 4, Y + ry * .12 - 10, 8, 20);
        c.lineWidth = 3.5; c.strokeStyle = col; c.beginPath(); c.moveTo(Xh - rx * .5, Y + ry * .3); c.quadraticCurveTo(Xh - rx * .2, Y + ry * .85, Xh + rx * .3, Y + ry * .72); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(Xh + rx * .3, Y + ry * .72, 4.5, 0, 7); c.fill(); }
      c.restore(); if (userHat) userHat(c, hx, hy, r); };
    if (X.gloves) { const uh = o.hold || {}; const glove = (c, t) => { c.save(); c.strokeStyle = INK; c.lineWidth = 3; const g = c.createRadialGradient(-5, 6, 2, 0, 12, 22); g.addColorStop(0, sh(X.gloves, .35)); g.addColorStop(1, sh(X.gloves, -.25)); c.fillStyle = g; c.beginPath(); c.ellipse(0, 12, 17, 19, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(11, 6, 7, 10, -.5, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#f4f4f4'; rr(c, -14, -8, 28, 9, 3); c.fill(); c.stroke(); c.restore(); };
      o2.hold = { near: (c, t) => { glove(c, t); uh.near && uh.near(c, t); }, far: (c, t) => { glove(c, t); uh.far && uh.far(c, t); } }; }
    return F0(ctx, o2);
  };

  // ---- cast
  PR.LOGAN = (o = {}) => look('banker', { hair: 'neat', hairCol: '#a87a4e', streak: '#d2a874', skin: '#f2c8a4', top: 'hoodie', topCol: o.blue ? '#3e78c8' : '#f2f2f4', inner: o.blue ? '#3e78c8' : '#f2f2f4', innerStripe: o.blue ? '#2a5aa0' : '#c8ccd4', tie: null, legs: '#2a3a5a', cuff: '#3a4a6a', shoes: '#f0f0f0', sole: '#d8d8d8', seed: 101 }, { stubble: '#8a6440', scale: 1.06 });
  PR.LOGAN_BOX = () => look('banker', { hair: 'neat', hairCol: '#a87a4e', streak: '#d2a874', skin: '#f2c8a4', top: 'tee', topCol: '#f2c8a4', inner: '#f2c8a4', tie: null, bareArms: true, bareLegs: true, legs: '#f2c8a4', shoes: '#f4f4f6', sole: '#d0d0d4', seed: 102 }, { stubble: '#8a6440', scale: 1.06, shorts: '#2f6fd0', band: '#f4f4f4', gloves: '#2f6fd0', abs: true });
  PR.KSI = () => look('banker', { hair: 'neat', hairCol: '#141010', streak: '#2a2220', skin: '#8a5a3a', top: 'tee', topCol: '#1a1a1e', inner: '#1a1a1e', tie: null, bareArms: true, legs: '#2a2a30', shoes: '#f0f0f0', sole: '#d8d8d8', seed: 111 }, { chain: true, stubble: '#1a1210', scale: 1.02 });
  PR.KSI_BOX = () => look('banker', { hair: 'neat', hairCol: '#141010', streak: '#2a2220', skin: '#8a5a3a', top: 'tee', topCol: '#8a5a3a', inner: '#8a5a3a', tie: null, bareArms: true, bareLegs: true, legs: '#8a5a3a', shoes: '#1c1c1c', sole: '#b02a2a', seed: 112 }, { stubble: '#1a1210', scale: 1.02, shorts: '#c8262e', band: '#1a1a1a', gloves: '#c8262e', abs: true });
  PR.HOST = (k = 0) => [
    () => look('banker', { hair: 'neat', hairCol: '#3b2a20', skin: '#f0c4a0', topCol: '#2a3040', inner: '#eef0f6', tie: '#7a2a3a', legs: '#2a3040', seed: 121 }, { headset: '#2a2a30' }),
    () => look('woman', { hair: 'long', hairCol: '#c28a4a', streak: '#e2b070', skin: '#f2cca8', top: 'jacket', topCol: '#b8483e', inner: '#f4ece2', legs: '#2a2a30', seed: 122 }, { headset: '#2a2a30' }),
    () => look('teen', { hair: 'messy', hairCol: '#2a1a12', skin: '#c99068', top: 'hoodie', topCol: '#5a7a5a', legs: '#3a4050', seed: 123 }, { headset: '#2a2a30', stubble: true }),
  ][k % 3]();
  PR.SENATOR = () => look('banker', { hair: 'neat', hairCol: '#c8c6c2', streak: '#e8e6e2', skin: '#f0c2a0', glasses: true, topCol: '#1e2a48', inner: '#f4f6fa', tie: '#8a2a34', legs: '#1e2a48', shoes: '#141414', seed: 131 });
  PR.FOOTBALLER = () => look('teen', { hair: 'neat', hairCol: '#3a2416', streak: '#5a3a24', skin: '#ecc09a', beard: true, top: 'tee', topCol: '#8ccbf0', inner: '#8ccbf0', bareArms: true, bareLegs: true, legs: '#ecc09a', shoes: '#f4f4f4', sole: '#e8b44a', print: '#f4f4f4', seed: 141 }, { shorts: '#f4f6fa', band: '#8ccbf0', scale: .96 });
  PR.BOXER2 = () => look('teen', { hair: 'spiky', hairCol: '#1a1410', streak: '#3a2a20', skin: '#e2ae84', top: 'hoodie', topCol: '#d8dce4', inner: '#d8dce4', innerStripe: '#1e1e24', legs: '#d8dce4', cuff: '#1e1e24', shoes: '#1e1e24', sole: '#f2f0ea', seed: 151 });
  const KSK = ['#f4c7a1', '#8a5a3a', '#e9bc94', '#c99068', '#f2d2b0', '#6a4228'], KHC = ['#5a2e1e', '#141010', '#c89a5a', '#1d1712', '#a85a2a', '#141010'];
  PR.KID = (k = 0) => { const girl = k % 2 === 1, blazer = k % 3 !== 2; return look(girl ? 'woman' : 'teen', { hair: girl ? (k % 4 === 1 ? 'long' : 'neat') : ['spiky', 'messy', 'neat'][k % 3], bun: girl && k % 4 === 3, hairCol: KHC[k % 6], streak: sh(KHC[k % 6], .25), skin: KSK[k % 6], top: blazer ? 'jacket' : 'sweater', topCol: blazer ? '#1f2c52' : '#24345e', sleeveCol: blazer ? null : '#24345e', collarCol: '#f4f4f4', inner: '#f4f6fa', tie: ['#c8a23a', '#8a2a3a', '#2a6a3a'][k % 3], legs: girl ? '#3a3a44' : '#4a4a52', shoes: '#1a1614', sole: '#2a2420', lashes: girl, seed: 160 + k }, { scale: .8 }); };
  PR.SHOPPER = (k = 0) => look(k % 2 ? 'woman' : 'banker', { hair: ['neat', 'long', 'bald', 'bun', 'messy', 'long'][k % 6], bun: k % 6 === 3, hairCol: ['#6a6a6a', '#4a2a22', '#8a7a6a', '#c89a5a', '#1d1712', '#141010'][k % 6], skin: ['#f2c6a0', '#e9bc94', '#c99068', '#f4cfae', '#d9a57c', '#8a5a3a'][k % 6], top: ['jacket', 'cardigan', 'jacket', 'cardigan', 'hoodie', 'jacket'][k % 6], topCol: ['#5a4a3a', '#3a5a7a', '#2a4a3a', '#8a3a3a', '#4a4a5a', '#7a6a4a'][k % 6], inner: '#e8e2d6', tie: null, legs: ['#3a3a44', '#2a2a30', '#5a5040', '#2a2e3a', '#3a4a66', '#2a2a30'][k % 6], seed: 170 + k },
    [{ cap: '#4a5a4a' }, {}, { beanie: '#c8462e' }, {}, { beanie: '#2a4a7a' }, { cap: '#6a4a2a' }][k % 6]);
  PR.DIRECTOR = (k = 0) => look(k === 2 ? 'woman' : 'banker', { hair: ['neat', 'bald', 'bun', 'neat'][k % 4], bun: k % 4 === 2, hairCol: ['#3b2a20', '#9a948a', '#1d1712', '#c8c0b0'][k % 4], skin: ['#f2c6a0', '#c99068', '#f0c09a', '#e9bc94'][k % 4], top: 'jacket', topCol: ['#24303a', '#3a3a42', '#2a2a3a', '#1e2433'][k % 4], inner: '#eef0f6', tie: ['#2a3a6a', '#6a2a2a', null, '#2a5a4a'][k % 4], legs: ['#24303a', '#3a3a42', '#2a2a3a', '#1e2433'][k % 4], glasses: k === 1, seed: 180 + k });
  PR.STREAMER = (k = 0) => look('teen', { hair: k ? 'long' : 'spiky', hairCol: k ? '#6a2a8a' : '#1d2230', streak: k ? '#a05ac8' : '#3a4258', skin: k ? '#f2d2b0' : '#d9a57c', top: 'hoodie', topCol: k ? '#2a2a36' : '#5a2ad0', lashes: !!k, legs: '#2a2a36', seed: 190 + k }, { headset: k ? '#f2f2f6' : '#1e1e24', glow: k ? '#ff5ad0' : '#3ae0ff' });

  // ---- bottle: tall slim PET bottle; bottom centre at x,y. o: { col, glow, rot, label:false, shadow:false }
  PR.bottle = (c, x, y, s = 1, o = {}) => { const col = colOf(o.col); c.save(); if (o.shadow !== false) shadow(c, x, y, 13 * s); c.translate(x, y); c.rotate(o.rot || 0); c.scale(s, s);
    if (o.glow) TW.glow(c, 0, -26, 46, '255,240,200', .35 * (o.glow === true ? 1 : o.glow));
    const body = () => { c.beginPath(); c.moveTo(-7.5, -2); c.quadraticCurveTo(-7.5, 0, -5, 0); c.lineTo(5, 0); c.quadraticCurveTo(7.5, 0, 7.5, -2); c.lineTo(7.5, -16); c.quadraticCurveTo(6.3, -19, 7.5, -22); c.lineTo(7.5, -37); c.bezierCurveTo(7.5, -42, 3.6, -43, 3.6, -46); c.lineTo(-3.6, -46); c.bezierCurveTo(-3.6, -43, -7.5, -42, -7.5, -37); c.lineTo(-7.5, -22); c.quadraticCurveTo(-6.3, -19, -7.5, -16); c.closePath(); };
    body(); c.fillStyle = cyl(c, -7.5, 7.5, col); c.fill();
    c.save(); body(); c.clip(); c.fillStyle = 'rgba(255,255,255,.28)'; c.fillRect(-8, -42, 16, 4); // headspace air
    if (o.label !== false) { c.fillStyle = cyl(c, -7.5, 7.5, '#f6f6f8', -.18, .1); c.fillRect(-8, -33, 16, 15); c.fillStyle = sh(col, -.1); c.fillRect(-8, -33, 16, 2.4); c.fillRect(-8, -20.4, 16, 2.4);
      c.save(); c.translate(0, -25.6); const px = fit(c, 'PRIME', 11.5, 7); c.font = font(px); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK; c.fillText('PRIME', .3, .4); c.fillStyle = sh(col, -.35); c.fillText('PRIME', 0, 0); c.restore(); }
    c.restore();
    body(); c.strokeStyle = INK; c.lineWidth = 1.3; c.stroke();
    c.fillStyle = cyl(c, -4.4, 4.4, '#f4f4f6', -.25, .1); rr(c, -4.4, -52, 8.8, 6.4, 1.4); c.fill(); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = .6; for (let k = -3; k <= 3; k += 1.5) { c.beginPath(); c.moveTo(k, -51); c.lineTo(k, -46.6); c.stroke(); }
    shine(c, -4.6, -38, -4, 1.6, .6); shine(c, 4.8, -36, -24, .8, .35); c.restore(); };

  // ---- slim energy can; bottom centre. o: { col, glow }
  PR.can = (c, x, y, s = 1, o = {}) => { const col = colOf(o.col); c.save(); shadow(c, x, y, 12 * s); c.translate(x, y); c.rotate(o.rot || 0); c.scale(s, s); if (o.glow) TW.glow(c, 0, -22, 42, '255,240,200', .35);
    c.fillStyle = cyl(c, -6.5, 6.5, col); c.strokeStyle = INK; c.lineWidth = 1.3; rr(c, -6.5, -42, 13, 42, 2.5); c.fill(); c.stroke();
    c.fillStyle = cyl(c, -6.5, 6.5, '#d8dce2', -.3, .2); c.beginPath(); c.moveTo(-6.5, -42); c.lineTo(-5.4, -45); c.lineTo(5.4, -45); c.lineTo(6.5, -42); c.closePath(); c.fill(); c.stroke(); c.fillRect(-6.5, -2.4, 13, 2.4);
    c.save(); c.translate(0, -21); c.rotate(-Math.PI / 2); c.textAlign = 'center'; c.textBaseline = 'middle'; const px = fit(c, 'PRIME', 28, 9); c.font = font(px); c.fillStyle = '#fff'; c.fillText('PRIME', 0, -1.2); c.font = font(3.4, 'Oswald'); c.fillText('ENERGY', 0, 4.4); c.restore();
    c.fillStyle = INK; rr(c, -5, -6.6, 6, 3.6, .8); c.fill(); c.font = font(2.6, 'Oswald'); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('18+', -2, -4.7);
    shine(c, -3.8, -39, -4, 1.4, .55); c.restore(); };

  // ---- HYPE METER: centre of the dial pivot at x,y, v 0..1 (s=1: about 260 px wide)
  PR.hype = (c, x, y, s = 1, v = 0) => { v = K.clamp(v); c.save(); c.translate(x, y); c.scale(s, s); const R = 110;
    if (v > .7) TW.glow(c, 0, -40, 240, '255,90,40', (v - .7) * 1.2);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -R - 16, -R - 44, R * 2 + 40, R + 90, 22); c.fill();
    const g = c.createLinearGradient(0, -R - 50, 0, 40); g.addColorStop(0, '#2c2a38'); g.addColorStop(1, '#14121c'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -R - 22, -R - 50, R * 2 + 44, R + 92, 22); c.fill(); c.stroke();
    const segs = ['#3aa0e8', '#4ac08a', '#c8d23a', '#f5a524', '#ee4a3a'];
    segs.forEach((cl, i) => { c.strokeStyle = cl; c.lineWidth = 22; c.beginPath(); c.arc(0, 0, R - 14, Math.PI + i * Math.PI / 5 + .02, Math.PI + (i + 1) * Math.PI / 5 - .02); c.stroke(); });
    c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2.5; for (let k = 0; k <= 10; k++) { const a = Math.PI + k * Math.PI / 10; c.beginPath(); c.moveTo(Math.cos(a) * (R - 30), Math.sin(a) * (R - 30)); c.lineTo(Math.cos(a) * (R - (k % 5 ? 38 : 44)), Math.sin(a) * (R - (k % 5 ? 38 : 44))); c.stroke(); }
    txt(c, 'EMPTY', -R + 14, 24, 19, '#9aa0b4', 'center', 'Oswald'); txt(c, 'MAX', R - 14, 24, 19, v > .85 ? '#ff7a5a' : '#9aa0b4', 'center', 'Oswald');
    txt(c, 'HYPE METER', 0, -R - 24, 28, PR.GOLD, 'center', 'Anton');
    const a = Math.PI + v * Math.PI; c.save(); c.rotate(a); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.moveTo(3, 7); c.lineTo(R - 22, 3); c.lineTo(3, -1); c.fill();
    c.fillStyle = '#f4f0e8'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-10, -6); c.lineTo(R - 24, 0); c.lineTo(-10, 6); c.closePath(); c.fill(); c.stroke(); c.restore();
    c.fillStyle = '#e8463a'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 12, 0, 7); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(-3, -4, 4, 0, 7); c.fill();
    txt(c, Math.round(v * 100) + '%', 0, 30, 24, '#fff', 'center', 'Anton'); c.restore(); };

  // ---- stamped verdict tag; centre at x,y. kind: claim | court | settled | dismissed. Stamps in from t0 with a squash pop.
  const TAGS = { claim: ['CLAIM', '#e8a21e'], court: ['COURT SAID', '#2e9a4a'], settled: ['SETTLED', '#2e6ad0'], dismissed: ['DISMISSED', '#7a7a80'] };
  PR.tag = (c, x, y, s = 1, kind = 'claim', t0 = 0, t = 99) => { const u = K.seg(t, t0, t0 + .32); if (u <= 0) return; const [label, col] = TAGS[kind] || [String(kind).toUpperCase(), '#e8a21e'];
    const sc = u < 1 ? 2.4 - 1.4 * E.inn(u) : 1, sq = u >= 1 ? 1 + .22 * Math.exp(-(t - t0 - .32) * 14) * Math.cos((t - t0 - .32) * 30) : 1;
    c.save(); c.translate(x, y); c.rotate(-.07); c.scale(s * sc * sq, s * sc / sq); c.globalAlpha = Math.min(1, u * 2); c.font = font(46); const w = c.measureText(label).width + 52, h = 74;
    c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 6, -h / 2 + 8, w, h, 10); c.fill(); c.fillStyle = sh(col, .55); rr(c, -w / 2, -h / 2, w, h, 10); c.fill();
    c.strokeStyle = col; c.lineWidth = 6; rr(c, -w / 2 + 5, -h / 2 + 5, w - 10, h - 10, 7); c.stroke(); c.lineWidth = 2.5; rr(c, -w / 2 + 13, -h / 2 + 13, w - 26, h - 26, 4); c.stroke();
    txt(c, label, 0, 3, 46, col, 'center', 'Anton'); c.globalCompositeOperation = 'destination-out'; c.fillStyle = 'rgba(0,0,0,.25)'; for (let k = 0; k < 50; k++) { const px = ((k * 97) % 100) / 100 * w - w / 2, py = ((k * 61) % 100) / 100 * h - h / 2; c.fillRect(px, py, 3 + k % 4, 2); }
    c.restore(); };

  // ---- odometer money counter; centre at x,y. o: { pre:'$'|'£', suf:'M'|'B', dec:0, digits, px }
  PR.counter = (c, x, y, s = 1, from = 0, to = 100, t0 = 0, t1 = 1, t = 0, o = {}) => { const dec = o.dec ?? 0, u = E.io(K.seg(t, t0, t1)), v = from + (to - from) * u, n = v * Math.pow(10, dec);
    const nd = o.digits ?? Math.max(1, String(Math.floor(Math.max(from, to))).length) + dec, cw = 54, ch = 84, pre = o.pre ?? '$', suf = o.suf ?? '';
    c.save(); c.translate(x, y); c.scale(s, s); const ext = (pre ? 46 : 0) + (suf ? 58 : 0) + (dec ? 16 : 0), W = nd * cw + ext + 30, x0 = -W / 2 + 15 + (pre ? 46 : 0);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -W / 2 + 7, -ch / 2 - 10, W, ch + 28, 14); c.fill(); const g = c.createLinearGradient(0, -ch / 2, 0, ch / 2); g.addColorStop(0, '#3a3644'); g.addColorStop(1, '#16141c'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -W / 2, -ch / 2 - 16, W, ch + 32, 14); c.fill(); c.stroke();
    if (pre) txt(c, pre, -W / 2 + 36, 2, 64, PR.GOLD, 'center', 'Anton');
    let xx = x0; for (let p = nd - 1; p >= 0; p--) { if (dec && p === dec - 1) { txt(c, '.', xx + 6, 22, 60, '#f4f0e8', 'center', 'Anton'); xx += 16; } const P = Math.pow(10, p), val = n / P, d = Math.floor(val) % 10, low = n % P, fr = p === 0 ? val % 1 : (low > P - 1 ? low - (P - 1) : 0);
      c.save(); const dg = c.createLinearGradient(0, -ch / 2, 0, ch / 2); dg.addColorStop(0, '#9a968e'); dg.addColorStop(.25, '#f6f2ea'); dg.addColorStop(.75, '#f6f2ea'); dg.addColorStop(1, '#8a867e'); c.fillStyle = dg; rr(c, xx, -ch / 2, cw - 6, ch, 6); c.fill(); c.clip();
      for (const [dd, oy] of [[d, -fr * ch], [(d + 1) % 10, (1 - fr) * ch]]) txt(c, String(dd), xx + (cw - 6) / 2, oy + 4, 70, INK, 'center', 'Anton');
      c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(xx, -ch / 2, cw, 10); c.fillRect(xx, ch / 2 - 10, cw, 10); c.restore(); c.strokeStyle = INK; c.lineWidth = 2.5; rr(c, xx, -ch / 2, cw - 6, ch, 6); c.stroke(); xx += cw; }
    if (suf) txt(c, suf, xx + 28, 2, 64, PR.GOLD, 'center', 'Anton'); c.restore(); };

  // ---- unrolled ingredients label scroll; centre-top at x,y. hi: highlighter sweep, line i is lit by clamp(hi - i)
  PR.label = (c, x, y, s = 1, lines = [], hi = -1) => { const w = 420, lh = 40, h = lines.length * lh + 80; c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-w / 2 + 10, 16, w, h); const g = c.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, '#e4ddcc'); g.addColorStop(.15, '#faf7ee'); g.addColorStop(.85, '#faf7ee'); g.addColorStop(1, '#ddd5c2'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-w / 2, 6, w, h); c.strokeRect(-w / 2, 6, w, h);
    for (const ry of [6, h + 6]) { const rg = c.createLinearGradient(0, ry - 14, 0, ry + 14); rg.addColorStop(0, '#cfc6b0'); rg.addColorStop(.4, '#fffdf6'); rg.addColorStop(1, '#a8a08a'); c.fillStyle = rg; rr(c, -w / 2 - 14, ry - 14, w + 28, 28, 14); c.fill(); c.stroke(); }
    txt(c, 'INGREDIENTS', -w / 2 + 30, 48, 30, INK, 'left', 'Anton');
    lines.forEach((ln, i) => { const yy = 92 + i * lh, a = K.clamp(hi - i); c.font = font(26, 'Oswald'); const tw = c.measureText(ln).width; if (a > 0) { c.fillStyle = 'rgba(255,226,40,.75)'; rr(c, -w / 2 + 24, yy - 16, (tw + 14) * a, 32, 6); c.fill(); } txt(c, ln, -w / 2 + 30, yy, 26, a > .5 ? '#1a1410' : '#4a4438', 'left', 'Oswald'); });
    c.restore(); };

  // ---- hanging price tag; string top at x,y. spin: angle (rad), the tag swings and flips
  PR.priceTag = (c, x, y, s = 1, text = '£1.99', spin = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(spin) * .25); c.strokeStyle = '#6a5a48'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 40); c.stroke(); c.translate(0, 40); c.scale(Math.cos(spin) || .02, 1);
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.moveTo(6, 6); c.lineTo(66, 36); c.lineTo(66, 146); c.lineTo(-54, 146); c.lineTo(-54, 36); c.closePath(); c.fill();
    const g = c.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, '#f4ead0'); g.addColorStop(.5, '#fffaf0'); g.addColorStop(1, '#e2d6b8'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(60, 30); c.lineTo(60, 140); c.lineTo(-60, 140); c.lineTo(-60, 30); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#8a7a64'; c.beginPath(); c.arc(0, 18, 6, 0, 7); c.fill(); const px = fit(c, text, 104, 46); txt(c, text, 0, 88, px, '#c8282e', 'center', 'Anton'); c.restore(); };

  // ---- yellow REDUCED sticker that slaps on from t0; centre at x,y
  PR.reduced = (c, x, y, s = 1, t0 = 0, t = 99) => { const u = K.seg(t, t0, t0 + .18); if (u <= 0) return; const bounce = u >= 1 ? 1 + .12 * Math.exp(-(t - t0 - .18) * 12) * Math.cos((t - t0 - .18) * 34) : 1.9 - .9 * E.inn(u);
    c.save(); c.translate(x, y); c.rotate(-.18 + (1 - u) * .3); c.scale(s * bounce, s * bounce); c.globalAlpha = Math.min(1, u * 3);
    const star = (r0, r1) => { c.beginPath(); for (let k = 0; k < 32; k++) { const a = k * Math.PI / 16, r = k % 2 ? r0 : r1; c.lineTo(Math.cos(a) * r * 1.25, Math.sin(a) * r * .8); } c.closePath(); };
    c.fillStyle = 'rgba(0,0,0,.3)'; c.save(); c.translate(6, 8); star(76, 88); c.fill(); c.restore(); const g = c.createRadialGradient(-20, -24, 4, 0, 0, 100); g.addColorStop(0, '#fff7a0'); g.addColorStop(1, '#f2c81e'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 4; star(76, 88); c.fill(); c.stroke();
    txt(c, 'REDUCED', 0, -6, 44, '#c8282e', 'center', 'Anton'); txt(c, 'TO CLEAR', 0, 34, 22, INK, 'center', 'Oswald'); c.restore(); };

  // ---- vertical caffeine meter; bottom centre at x,y. v: mg if > 1, else fraction of o.max (250 mg)
  PR.meter = (c, x, y, s = 1, v = 0, label = 'CAFFEINE', o = {}) => { const max = o.max ?? 250, mg = v > 1 ? v : v * max, f = K.clamp(mg / max), H = 300, W = 56; c.save(); shadow(c, x, y, 60 * s); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#3a3a44'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -W / 2 - 14, -18, W + 28, 18, 6); c.fill(); c.stroke();
    c.fillStyle = 'rgba(220,235,245,.35)'; rr(c, -W / 2, -H - 18, W, H, W / 2); c.fill();
    c.save(); rr(c, -W / 2, -H - 18, W, H, W / 2); c.clip(); const fh = (H - 10) * f, lg = c.createLinearGradient(-W / 2, 0, W / 2, 0), lc = f > .75 ? '#e8463a' : f > .45 ? '#f5a524' : '#5ac06a'; lg.addColorStop(0, sh(lc, -.3)); lg.addColorStop(.35, sh(lc, .25)); lg.addColorStop(1, sh(lc, -.35)); c.fillStyle = lg; c.fillRect(-W / 2, -18 - 5 - fh, W, fh + 5); c.restore();
    c.strokeStyle = INK; c.lineWidth = 4; rr(c, -W / 2, -H - 18, W, H, W / 2); c.stroke(); shine(c, -W / 2 + 12, -H + 10, -40, 5, .55);
    for (let m = 0; m <= max; m += 50) { const yy = -18 - 5 - (H - 10) * m / max; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(W / 2, yy); c.lineTo(W / 2 + 14, yy); c.stroke(); txt(c, m + 'mg', W / 2 + 20, yy, 20, '#f4f0e8', 'left', 'Oswald'); }
    txt(c, label, 0, 26, 28, '#f4f0e8', 'center', 'Anton'); txt(c, Math.round(mg) + ' MG', 0, -H - 46, 34, PR.GOLD, 'center', 'Anton'); c.restore(); };

  // ---- takeaway coffee cup with steam; bottom centre
  PR.coffee = (c, x, y, s = 1, t = 0) => { c.save(); shadow(c, x, y, 16 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 1.3;
    c.fillStyle = cyl(c, -8, 8, '#f2ede4', -.2, .1); c.beginPath(); c.moveTo(-6, 0); c.lineTo(6, 0); c.lineTo(8.5, -28); c.lineTo(-8.5, -28); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = cyl(c, -8, 8, '#a8743e', -.3, .2); c.beginPath(); c.moveTo(-7.2, -8); c.lineTo(7.2, -8); c.lineTo(7.9, -20); c.lineTo(-7.9, -20); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = cyl(c, -9.5, 9.5, '#3a2c24', -.3, .3); rr(c, -9.6, -32, 19.2, 4.6, 1.5); c.fill(); c.stroke(); shine(c, -5, -26, -3, 1.2, .5);
    c.lineCap = 'round'; for (let k = 0; k < 3; k++) { const ph = (t * .6 + k / 3) % 1; c.strokeStyle = `rgba(255,255,255,${.5 * Math.sin(ph * Math.PI)})`; c.lineWidth = 2.2; c.beginPath(); const bx = -4 + k * 4; c.moveTo(bx, -34 - ph * 4); c.bezierCurveTo(bx + 4, -40 - ph * 10, bx - 4, -46 - ph * 14, bx + 1, -52 - ph * 16); c.stroke(); } c.restore(); };

  // ---- gold trophy cup; bottom centre
  PR.trophy = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 28 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 1.8; const gold = '#e8b43a';
    c.fillStyle = cyl(c, -18, 18, '#3a2a22', -.3, .3); rr(c, -18, -12, 36, 12, 2); c.fill(); c.stroke(); c.fillStyle = '#d8c48a'; c.fillRect(-10, -9, 20, 6);
    c.fillStyle = cyl(c, -11, 11, gold); rr(c, -11, -18, 22, 6, 2); c.fill(); c.stroke(); c.fillRect(-3.5, -32, 7, 14); c.strokeRect(-3.5, -32, 7, 14);
    c.lineWidth = 4.5; c.strokeStyle = INK; for (const d of [-1, 1]) { c.beginPath(); c.arc(d * 19, -52, 8, d > 0 ? -1.6 : 1.6 + Math.PI * 0, d > 0 ? 1.6 : 4.7); c.stroke(); } c.strokeStyle = gold; c.lineWidth = 2.6; for (const d of [-1, 1]) { c.beginPath(); c.arc(d * 19, -52, 8, d > 0 ? -1.6 : 1.6, d > 0 ? 1.6 : 4.7); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 1.8; c.fillStyle = cyl(c, -20, 20, gold); c.beginPath(); c.moveTo(-20, -64); c.lineTo(20, -64); c.bezierCurveTo(20, -42, 10, -32, 0, -32); c.bezierCurveTo(-10, -32, -20, -42, -20, -64); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = sh(gold, -.35); c.beginPath(); c.ellipse(0, -64, 20, 3.4, 0, 0, 7); c.fill(); c.stroke(); shine(c, -11, -60, -42, 2.2, .7); c.fillStyle = '#fff8d0'; c.font = font(9); c.textAlign = 'center'; c.fillText('★', 2, -47); c.restore(); };

  // ---- stack of legal folders, n folders, one thuds down every 0.25 s from t0; bottom centre
  PR.folders = (c, x, y, s = 1, n = 5, t0 = 0, t = 99) => { c.save(); shadow(c, x, y, 50 * s); c.translate(x, y); c.scale(s, s); const cols = ['#d8b66a', '#c8a458', '#e2c27a', '#b89a5a'];
    for (let i = 0; i < n; i++) { const ti = t0 + i * .25, u = K.seg(t, ti, ti + .16); if (u <= 0) break; const dy = (1 - E.inn(u)) * -160, sq = u >= 1 ? 1 + .1 * Math.exp(-(t - ti - .16) * 20) : 1, yy = -i * 9 + dy, ox = ((i * 37) % 9) - 4;
      c.save(); c.translate(ox, yy); c.scale(sq, 1 / sq); c.globalAlpha = Math.min(1, u * 3); c.fillStyle = sh(cols[i % 4], -.25); c.strokeStyle = INK; c.lineWidth = 1.8; c.fillRect(-42, -9, 84, 9); c.strokeRect(-42, -9, 84, 9);
      c.fillStyle = '#f6f2e6'; c.fillRect(-38, -11, 76, 3); c.fillStyle = cols[i % 4]; rr(c, -44, -12, 88, 5, 1.5); c.fill(); c.stroke(); c.fillStyle = sh(cols[i % 4], -.1); rr(c, 10 + (i % 3) * 8 - 20, -15, 20, 4, 1.5); c.fill(); c.stroke();
      c.fillStyle = '#fff'; c.fillRect(-12, -6, 24, 4); c.restore(); }
    c.restore(); };

  // ---- stainless conveyor segment; top of the belt at y, from x to x+w. o: { empty, col, speed, gap }
  PR.conveyor = (c, x, y, w = 800, s = 1, t = 0, o = {}) => { const sp = o.speed ?? 60, gap = (o.gap ?? 30) * s, rr0 = 7 * s; c.save(); shadow(c, x + w / 2, y + 70 * s, w * .55, .25);
    c.fillStyle = '#5a5e66'; c.strokeStyle = INK; c.lineWidth = 2 * s; for (let lx = x + 30 * s; lx < x + w; lx += 180 * s) { c.fillRect(lx, y + 14 * s, 6 * s, 56 * s); c.strokeRect(lx, y + 14 * s, 6 * s, 56 * s); }
    const fg = c.createLinearGradient(0, y + 4 * s, 0, y + 22 * s); fg.addColorStop(0, '#eef2f6'); fg.addColorStop(.4, '#a8b0ba'); fg.addColorStop(1, '#6a7280'); c.fillStyle = fg; c.fillRect(x, y + 4 * s, w, 18 * s); c.strokeRect(x, y + 4 * s, w, 18 * s);
    c.fillStyle = '#2a2a30'; c.fillRect(x, y, w, 4 * s); const off = (t * sp * s) % (14 * s); c.fillStyle = '#3c3c44'; for (let bx = x - off + 14 * s; bx < x + w; bx += 14 * s) c.fillRect(bx, y, 2 * s, 4 * s);
    for (let rx = x + 12 * s; rx < x + w - 6 * s; rx += 26 * s) { c.fillStyle = '#7a828e'; c.beginPath(); c.arc(rx, y + 13 * s, rr0, 0, 7); c.fill(); c.lineWidth = 1.2 * s; c.stroke(); const a = t * sp / 7; c.strokeStyle = '#dfe4ea'; c.beginPath(); c.moveTo(rx, y + 13 * s); c.lineTo(rx + Math.cos(a) * rr0, y + 13 * s + Math.sin(a) * rr0); c.stroke(); c.strokeStyle = INK; }
    shine(c, x + 4, y + 8 * s, y + 8 * s, 0, 0); c.save(); c.globalAlpha = .5; c.strokeStyle = '#fff'; c.lineWidth = 2 * s; c.beginPath(); c.moveTo(x, y + 7 * s); c.lineTo(x + w, y + 7 * s); c.stroke(); c.restore();
    if (!o.empty) { c.save(); c.beginPath(); c.rect(x, y - 80 * s, w, 80 * s); c.clip(); const step = 15 * s + gap, sh0 = (t * sp * s) % step; for (let bx = x - step + sh0; bx < x + w + step; bx += step) PR.bottle(c, bx, y, s, { col: o.col, shadow: false }); c.restore(); }
    c.restore(); };

  // ---- briefcase; bottom centre. open 0..1 (lid swings up, cash + papers inside)
  PR.briefcase = (c, x, y, s = 1, open = 0) => { c.save(); shadow(c, x, y, 34 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 1.8; const lc = '#5a3a24';
    const bg = c.createLinearGradient(0, -30, 0, 0); bg.addColorStop(0, sh(lc, .25)); bg.addColorStop(1, sh(lc, -.25)); c.fillStyle = bg; rr(c, -30, -26, 60, 26, 3); c.fill(); c.stroke();
    if (open > .05) { c.fillStyle = '#2a1a12'; c.fillRect(-27, -27, 54, 4); for (let k = 0; k < 5; k++) { c.fillStyle = '#7ab06a'; c.fillRect(-24 + k * 10, -31, 9, 5); c.strokeRect(-24 + k * 10, -31, 9, 5); } c.fillStyle = '#f6f2e6'; c.fillRect(-26, -34, 16, 4); }
    c.save(); c.translate(30, -26); c.scale(1, Math.cos(open * 1.9) || .01); c.fillStyle = open > .83 ? '#3a2416' : bg; rr(c, -60, -10, 60, 10, 3); c.fill(); c.stroke(); c.restore();
    if (open < .3) { c.fillStyle = '#c8a24a'; c.fillRect(-16, -28, 6, 5); c.fillRect(10, -28, 6, 5); c.strokeRect(-16, -28, 6, 5); c.strokeRect(10, -28, 6, 5); c.lineWidth = 3.5; c.beginPath(); c.moveTo(-9, -36); c.quadraticCurveTo(0, -42, 9, -36); c.stroke(); c.strokeStyle = lc; c.lineWidth = 2; c.stroke(); }
    c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-27, -22); c.lineTo(27, -22); c.stroke(); c.restore(); };

  // ---- speech / thought bubble; centre at x,y. text uses | for line breaks. o: { thought, tail: [dx,dy], px }
  PR.bubble = (c, x, y, s = 1, text = '', o = {}) => { const px = o.px ?? 44, L = String(text).split('|'); c.save(); c.translate(x, y); c.scale(s, s); c.font = font(px); const w = Math.max(...L.map(l => c.measureText(l).width)) + 70, h = L.length * px * 1.15 + 50, [tx, ty] = o.tail || [-w * .3, h * .5 + 50];
    const shape = () => { c.beginPath(); if (o.thought) { const n = Math.max(8, Math.round((w + h) / 60)); for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2, bx = Math.cos(a) * w * .5, by = Math.sin(a) * h * .5; c.moveTo(bx + 30, by); c.arc(bx, by, 30, 0, 7); } c.moveTo(w / 2, 0); c.ellipse(0, 0, w / 2, h / 2, 0, 0, 7); } else { rr(c, -w / 2, -h / 2, w, h, h * .42); c.moveTo(tx * .35 - 18, h / 2 - 4); c.lineTo(tx, ty); c.lineTo(tx * .35 + 22, h / 2 - 4); } };
    c.save(); c.translate(6, 8); c.fillStyle = 'rgba(0,0,0,.3)'; shape(); c.fill(); c.restore(); c.fillStyle = '#fffdf6'; c.strokeStyle = INK; c.lineWidth = 5; shape(); c.stroke(); c.fill();
    if (o.thought) for (const [k, r] of [[.55, 13], [.82, 8]]) { c.beginPath(); c.arc(tx * k, h / 2 * (1 - k) + ty * k, r, 0, 7); c.fill(); c.stroke(); }
    L.forEach((l, i) => txt(c, l, 0, -h / 2 + 25 + px * .58 + i * px * 1.15, px, INK, 'center', 'Anton')); c.restore(); };

  // ---- phone showing scrolling post cards; bottom centre of the phone at x,y (s=1: 200 x 400 px)
  PR.phonePost = (c, x, y, s = 1, lines = [], t = 0, o = {}) => { const W = 200, H = 400; c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot || 0);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -W / 2 + 8, -H + 10, W, H, 28); c.fill(); c.fillStyle = '#1a1a20'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -W / 2, -H, W, H, 28); c.fill(); c.stroke();
    c.save(); rr(c, -W / 2 + 10, -H + 14, W - 20, H - 28, 20); c.clip(); c.fillStyle = '#f2f3f6'; c.fillRect(-W / 2, -H, W, H);
    const ch = 118, off = (t * (o.speed ?? 40)) % Math.max(1, lines.length * ch); for (let r = -1; r < 5; r++) { const n = lines.length; if (!n) break; const idx = ((Math.floor(off / ch) + r) % n + n) % n, yy = -H + 64 + r * ch - (off % ch);
      c.fillStyle = '#fff'; c.strokeStyle = '#d4d6de'; c.lineWidth = 2; rr(c, -W / 2 + 18, yy, W - 36, ch - 12, 10); c.fill(); c.stroke(); c.fillStyle = ['#3fb4ea', '#ee5a3a', '#9ccf34', '#8c4fd2'][idx % 4]; c.beginPath(); c.arc(-W / 2 + 38, yy + 20, 11, 0, 7); c.fill();
      c.fillStyle = '#c4c8d2'; c.fillRect(-W / 2 + 56, yy + 14, 60, 8); const L = String(lines[idx]).split('|'); L.slice(0, 3).forEach((l, i) => { const fp = fit(c, l, W - 56, 17, 'Oswald'); txt(c, l, -W / 2 + 28, yy + 48 + i * 20, fp, '#1a1a22', 'left', 'Oswald'); });
      txt(c, '♥ ' + (((idx + 3) * 7919) % 90 + 9) + 'K', -W / 2 + 28, yy + ch - 26, 14, '#e0405a', 'left', 'Oswald'); }
    c.fillStyle = '#fff'; c.fillRect(-W / 2, -H, W, 50); c.fillStyle = '#1a1a20'; rr(c, -24, -H + 18, 48, 12, 6); c.fill(); c.fillStyle = '#d4d6de'; c.fillRect(-W / 2, -H + 50, W, 2); c.restore();
    c.save(); c.globalAlpha = .18; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-W / 2 + 10, -H + 14); c.lineTo(-W / 2 + 80, -H + 14); c.lineTo(-W / 2 + 10, -H + 160); c.closePath(); c.fill(); c.restore(); c.restore(); };

  // ---- giant generic red cola can (no real logo); bottom centre. s=1: 130 px tall
  PR.cola = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 60 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 3;
    c.fillStyle = cyl(c, -40, 40, '#d8202a', -.35, .25); c.beginPath(); c.moveTo(-36, -2); c.quadraticCurveTo(-40, -6, -40, -14); c.lineTo(-40, -112); c.quadraticCurveTo(-40, -118, -34, -122); c.lineTo(34, -122); c.quadraticCurveTo(40, -118, 40, -112); c.lineTo(40, -14); c.quadraticCurveTo(40, -6, 36, -2); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = cyl(c, -40, 40, '#d4d8de', -.35, .25); c.beginPath(); c.moveTo(-34, -122); c.lineTo(-30, -130); c.lineTo(30, -130); c.lineTo(34, -122); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-36, -2); c.lineTo(36, -2); c.lineTo(32, 0); c.lineTo(-32, 0); c.closePath(); c.fill(); c.stroke();
    c.save(); c.translate(0, -64); c.rotate(-.08); txt(c, 'COLA', 2, 3, 40, 'rgba(0,0,0,.25)', 'center', 'Anton'); txt(c, 'COLA', 0, 0, 40, '#fff', 'center', 'Anton'); c.restore();
    c.strokeStyle = '#fff'; c.lineWidth = 2.5; c.globalAlpha = .9; c.beginPath(); c.moveTo(-34, -36); c.lineTo(34, -36); c.stroke(); c.globalAlpha = 1; shine(c, -24, -114, -12, 5, .5); shine(c, 26, -110, -20, 2, .25); c.restore(); };
})(window);
