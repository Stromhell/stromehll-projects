// Robert Pattinson / Bond video (RP) kit: cast + a few props. Loaded after pr_kit.js (reuses PR.* props, PR.DIRECTOR, PR.HOST, PR.SHOPPER, PR.KID).
// Real people are stylised stand-ins: no likeness, no real logos/posters. Same Gumball rig as Prime.
// Extra look flags (look.rp): bowtie (0..1, 1 = neatly tied, <1 = loose ends), cowl (bat-like hood, plain, NO emblem), wreath (laurel), hood (cloak hood).
(function (G) {
  const K = G.KIT, TW = G.TW, INK = TW.INK, rr = TW.rr, R6 = G.RIG6, sh = (h, f) => G.RIG.shadeHex(h, f);
  const RP = G.RP = {};
  const look = (base, o, pr, rp) => ({ look: Object.assign({}, R6.LOOKS[base], { style: 'gumball' }, o, pr ? { pr } : {}, rp ? { rp } : {}) });
  // wrap figure (outside PR's wrapper) to add rp extras through the hat hook (head-local coords, same frame PR uses for the chain)
  const F0 = R6.figure;
  R6.figure = (ctx, o) => { const L = o.look, X = L && L.rp; if (!X) return F0(ctx, o);
    const o2 = Object.assign({}, o), userHat = o.hat;
    o2.hat = (c, hx, hy, r) => { const Xh = hx, Y = hy + 57 * .08, rx = 53, ry = 57; c.save(); c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round';
      if (X.cowl) { const col = X.cowl === true ? '#26262c' : X.cowl; c.fillStyle = col; c.lineWidth = 3;
        c.beginPath(); c.moveTo(Xh - rx * 1.08, Y + ry * .25); c.bezierCurveTo(Xh - rx * 1.1, Y - ry * 1.2, Xh + rx * 1.1, Y - ry * 1.2, Xh + rx * 1.08, Y + ry * .25); c.lineTo(Xh + rx * .9, Y + ry * .05); c.quadraticCurveTo(Xh, Y - ry * .15, Xh - rx * .9, Y + ry * .05); c.closePath(); c.fill(); c.stroke();
        for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(Xh + sx * rx * .35, Y - ry * .95); c.lineTo(Xh + sx * rx * .55, Y - ry * 1.55); c.lineTo(Xh + sx * rx * .72, Y - ry * .82); c.closePath(); c.fill(); c.stroke(); }
        c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(Xh - rx * .4, Y - ry * .6, rx * .25, ry * .12, -.4, 0, 7); c.fill(); }
      if (X.hood) { const col = X.hood; c.fillStyle = col; c.lineWidth = 3; c.beginPath(); c.moveTo(Xh - rx * 1.15, Y + ry * .9); c.bezierCurveTo(Xh - rx * 1.3, Y - ry * 1.5, Xh + rx * 1.3, Y - ry * 1.5, Xh + rx * 1.15, Y + ry * .9); c.quadraticCurveTo(Xh + rx * .9, Y - ry * .7, Xh, Y - ry * .85); c.quadraticCurveTo(Xh - rx * .9, Y - ry * .7, Xh - rx * 1.15, Y + ry * .9); c.fill(); c.stroke(); }
      if (X.wreath) { c.fillStyle = '#c9a84a'; c.lineWidth = 1.6; for (let k = -4; k <= 4; k++) { const a = -Math.PI / 2 + k * .32; const x = Xh + Math.cos(a) * rx * .98, y = Y - ry * .2 + Math.sin(a) * ry * .78; c.save(); c.translate(x, y); c.rotate(a + Math.PI / 2 + (k < 0 ? .5 : -.5)); c.beginPath(); c.ellipse(0, 0, 5, 11, 0, 0, 7); c.fill(); c.stroke(); c.restore(); } }
      if (X.bowtie !== undefined && X.bowtie !== null) { const b = Math.max(0, Math.min(1, X.bowtie)), bx = Xh + 3, by = Y + ry * .95 + 16, col = X.bowCol || '#121216';
        c.fillStyle = col; c.lineWidth = 2.2;
        if (b < .5) { const sw = Math.sin((o.t || 0) * 3) * 3; for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(bx + sx * 3, by - 3); c.quadraticCurveTo(bx + sx * 8 + sw, by + 18, bx + sx * 5 + sw, by + 34); c.lineTo(bx + sx * 11 + sw, by + 34); c.quadraticCurveTo(bx + sx * 14 + sw, by + 16, bx + sx * 7, by - 3); c.closePath(); c.fill(); c.stroke(); } }
        else { const k = (b - .5) * 2, w = 12 + 8 * k, h = 9; for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + sx * w, by - h); c.quadraticCurveTo(bx + sx * (w + 3), by, bx + sx * w, by + h); c.closePath(); c.fill(); c.stroke(); }
          c.beginPath(); c.ellipse(bx, by, 4.5, 5.5, 0, 0, 7); c.fill(); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(bx - w * .7, by - h * .5); c.lineTo(bx - 4, by - 2); c.stroke(); } }
      c.restore(); if (userHat) userHat(c, hx, hy, r); };
    return F0(ctx, o2); };

  // ---- Robert (stylised: tall, thin, messy brown quiff, angular jaw via light stubble). RP.ROB(kind, o)
  // kinds: kid (age ~12, scale .78), teen (drama club, scale .92), cedric (yellow/black champion jersey), vamp (pale, bronze quiff, dark jacket),
  // casual (jacket + tee), crook (bleached hair, hoodie, stubble), suit (navy suit, no tie, Tenet), tux (black dinner suit; o.bow 0..1),
  // bat (dark armoured suit + cowl, add a cape in the act), toga (Greek chiton + wreath), parka (orange expedition parka), cloak (desert hooded cloak), host (grey suit TV host, Primetime)
  const SKIN = '#f2c8a6', HAIR = '#6a4a32';
  RP.ROB = (kind = 'casual', o = {}) => { const base = { hair: 'messy', hairCol: HAIR, streak: '#8e6a4a', skin: SKIN, tie: null, seed: 301 };
    const pr = { stubble: '#6a4a32', scale: 1.05 };
    switch (kind) {
      case 'kid': return look('teen', { ...base, top: 'sweater', topCol: '#3a5a8a', legs: '#4a4a52', shoes: '#33466e', seed: 302 }, { scale: .78 });
      case 'teen': return look('teen', { ...base, top: 'hoodie', topCol: '#7a8a9a', inner: '#e8e8e2', legs: '#3a4a66', seed: 303 }, { scale: .94 });
      case 'cedric': return look('teen', { ...base, top: 'tee', topCol: '#f2c230', inner: '#f2c230', bareArms: false, sleeveCol: '#141414', legs: '#1a1a1e', shoes: '#141414', seed: 304 }, { scale: .97 });
      case 'vamp': return look('banker', { ...base, skin: '#f4e6dc', hairCol: '#8a5a32', streak: '#b07a48', top: 'jacket', topCol: '#2a2a30', inner: '#cfd8e0', legs: '#24242a', shoes: '#141414', sole: '#2a2a2a', seed: 305 }, { scale: 1.05 });
      case 'crook': return look('teen', { ...base, hairCol: '#e8d8a8', streak: '#fff0c8', top: 'hoodie', topCol: '#3a3a40', inner: '#e8e8e2', legs: '#2a3a5a', seed: 306 }, { stubble: '#8a7a5a', scale: 1.05 });
      case 'suit': return look('banker', { ...base, topCol: '#1e2a40', inner: '#e8eef6', legs: '#1e2a40', shoes: '#141414', sole: '#2a2a2a', seed: 307 }, pr, o.bow !== undefined ? { bowtie: o.bow } : null);
      case 'tux': return look('banker', { ...base, hair: 'neat', topCol: '#141418', inner: '#f8f8f6', legs: '#141418', shoes: '#0c0c0c', sole: '#222', seed: 308 }, pr, { bowtie: o.bow ?? 1 });
      case 'bat': return look('banker', { ...base, topCol: '#2a2a30', inner: '#2a2a30', legs: '#2a2a30', shoes: '#141414', sole: '#222', belt: '#4a4232', seed: 309 }, pr, { cowl: true });
      case 'toga': return look('hunter', { ...base, beard: false, top: 'tunic', topCol: '#e8dcc0', bareArms: true, bareLegs: true, legs: SKIN, shoes: '#7a5a3a', seed: 310 }, pr, { wreath: true });
      case 'parka': return look('teen', { ...base, top: 'hoodie', topCol: '#e8742a', inner: '#f2f2f2', legs: '#3a3a44', shoes: '#2a2a2a', seed: 311 }, pr);
      case 'cloak': return look('hunter', { ...base, beard: false, top: 'tunic', topCol: '#6a5a46', bareArms: false, sleeveCol: '#5a4a38', legs: '#4a3e30', shoes: '#3a2e22', seed: 312 }, pr, { hood: '#5a4a38' });
      case 'host': return look('banker', { ...base, hair: 'neat', hairCol: '#9a8a7a', topCol: '#5a5e66', inner: '#eef0f6', tie: '#2a3a6a', legs: '#5a5e66', seed: 313 }, pr);
      default: return look('banker', { ...base, top: 'jacket', topCol: '#3a3430', inner: '#d8d2c8', legs: '#2a3a5a', shoes: '#3a2a20', sole: '#2a2018', seed: 300 }, pr);
    } };
  // producer: young (2005) or older (2025, greyer)
  RP.HEYMAN = (old = false) => look('banker', { hair: 'neat', hairCol: old ? '#b8b0a6' : '#5a4a3a', streak: old ? '#dcd6ce' : '#7a6a58', skin: '#f0c6a2', glasses: true, topCol: '#3a4250', inner: '#eef0f6', tie: null, legs: '#3a4250', seed: 320 + (old ? 1 : 0) });
  // directors: k 0 cap (Reeves-like), 1 scarf (Villeneuve-like), 2 suit (Nolan-like), 3 woman, 4 beanie, 5 glasses
  RP.DIR = (k = 0) => look(k === 3 ? 'woman' : 'banker', { hair: ['neat', 'neat', 'swept', 'long', 'neat', 'bald'][k % 6], hairCol: ['#2a2420', '#3a3430', '#c8c2b8', '#4a3028', '#1d1712', '#8a847a'][k % 6], skin: ['#f2c6a0', '#eec4a4', '#f4cfae', '#f0c09a', '#d9a57c', '#e9bc94'][k % 6], glasses: k === 5 || k === 0,
    top: 'jacket', topCol: ['#2a3038', '#3a4a5a', '#2a2a30', '#5a2a34', '#4a4a3a', '#30343c'][k % 6], inner: ['#5a6a7a', '#e8e2d6', '#f2f2f4', '#2a2a30', '#c8b49a', '#eef0f6'][k % 6], tie: null, legs: '#2a2a32', seed: 330 + k },
    [{ cap: '#2a2a30' }, {}, {}, {}, { beanie: '#6a2a2a' }, {}][k % 6]);
  RP.FAN = (k = 0) => G.PR.SHOPPER(k);
  RP.CRITIC = (k = 0) => look(k % 2 ? 'woman' : 'banker', { hair: ['neat', 'bun', 'bald', 'long'][k % 4], bun: k % 4 === 1, hairCol: ['#4a3a2a', '#2a2020', '#9a948a', '#a85a2a'][k % 4], skin: ['#f2c6a0', '#c99068', '#eebf9a', '#f4cfae'][k % 4], glasses: true, top: k % 2 ? 'cardigan' : 'jacket', topCol: ['#5a4a3a', '#2a4a5a', '#6a3a3a', '#3a5a4a'][k % 4], tie: k % 2 ? null : '#6a2a2a', seed: 340 + k });
  RP.EXEC = (k = 0) => look(k % 3 === 2 ? 'woman' : 'banker', { hair: ['neat', 'bald', 'long', 'neat'][k % 4], hairCol: ['#2a2420', '#8a847a', '#3a2a22', '#c8c2b8'][k % 4], skin: ['#f2c6a0', '#8a5a3a', '#f0c09a', '#e9bc94'][k % 4], top: 'jacket', topCol: ['#1e2433', '#2a2a30', '#3a2a40', '#24303a'][k % 4], inner: '#eef0f6', tie: k % 3 === 2 ? null : ['#7a2a2a', '#2a4a7a', null, '#4a2a5a'][k % 4], seed: 350 + k });
  RP.HANSEN = () => look('banker', { hair: 'neat', hairCol: '#a8a29a', streak: '#d0cac2', skin: '#f0c2a0', topCol: '#2a2e38', inner: '#eef0f6', tie: '#8a2a34', legs: '#2a2e38', seed: 360 });

  // ---- props (bottom-centre at x,y unless said). s = same scale number as the figure.
  // bow tie on its own (centre x,y): flying/spinning symbol
  RP.bowtie = (c, x, y, s = 1, rot = 0, glint = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#121216'; c.strokeStyle = INK; c.lineWidth = 2.5;
    for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(0, 0); c.lineTo(sx * 30, -16); c.quadraticCurveTo(sx * 36, 0, sx * 30, 16); c.closePath(); c.fill(); c.stroke(); }
    c.beginPath(); c.ellipse(0, 0, 7, 9, 0, 0, 7); c.fill(); c.stroke(); if (glint > 0) TW.sparkle(c, 18, -10, glint * 6, .6 * glint); c.restore(); };
  // score/ticket style card held up by critics: number 0-10 (centre-bottom at hand)
  RP.score = (c, x, y, s, v, col = '#f6f2e8') => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.25)'; rr(c, -24, -66, 52, 64, 6); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 3; rr(c, -26, -70, 52, 64, 6); c.fill(); c.stroke();
    c.font = '44px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = v >= 7 ? '#2a8a3a' : v >= 5 ? '#c8902a' : '#c8302a'; c.fillText(String(v), 0, -37); c.restore(); };
  // scoreboard DOUBTERS vs BELIEVERS (screen space, top-left). v: 0 = all doubters, 1 = all believers
  RP.board = (c, x, y, s, v) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(10,10,16,.78)'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -150, -46, 300, 92, 14); c.fill(); c.stroke();
    c.font = '22px Oswald'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ff7a6a'; c.fillText('DOUBTERS', -72, -24); c.fillStyle = '#7ae08a'; c.fillText('BELIEVERS', 72, -24);
    c.fillStyle = '#3a3a44'; rr(c, -130, 4, 260, 22, 11); c.fill(); const w = 260 * Math.max(0, Math.min(1, v)); c.fillStyle = '#c8302a'; rr(c, -130, 4, 260, 22, 11); c.fill(); if (w > 2) { c.fillStyle = '#2aa84a'; rr(c, 130 - w, 4, w, 22, 11); c.fill(); }
    c.fillStyle = '#fff'; c.beginPath(); c.arc(130 - w, 15, 14, 0, 7); c.fill(); c.stroke(); c.restore(); };
  // petition scroll unrolling downward from (x,y top) to length L (px world), with tiny signature scribbles
  RP.scroll = (c, x, y, w, L, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f2e8d0'; c.strokeStyle = INK; c.lineWidth = 3; c.fillRect(-w / 2, 0, w, L); c.strokeRect(-w / 2, 0, w, L);
    c.strokeStyle = 'rgba(40,40,90,.55)'; c.lineWidth = 2; for (let yy = 30; yy < L - 10; yy += 22) { c.beginPath(); const x0 = -w / 2 + 14 + (yy * 7) % 30; c.moveTo(x0, yy); for (let k = 0; k < 6; k++) c.lineTo(x0 + k * 12, yy + (k % 2 ? -6 : 4)); c.stroke(); }
    c.fillStyle = '#e2d4b0'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, -w / 2 - 10, L - 14, w + 20, 28, 14); c.fill(); c.stroke(); c.font = '26px Anton'; c.textAlign = 'center'; c.fillStyle = '#8a2a2a'; c.fillText('PETITION', 0, 26); c.restore(); };
  // golden ticket/card '007' style (centre)
  RP.oo7 = (c, x, y, s, a = 1) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(s * a, s * a); TW.glow(c, 0, 0, 180, '255,220,140', .35); c.fillStyle = '#121216'; c.strokeStyle = '#d8b64a'; c.lineWidth = 6; rr(c, -150, -70, 300, 140, 16); c.fill(); c.stroke();
    c.font = '96px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#f2d06a'; c.fillText('007', 0, 6); c.restore(); };
  // cape behind a figure: draw in live layer before figs. (x,y) = shoulder-ish anchor of figure feet x,y, s fig scale, flutter t
  RP.cape = (c, x, y, s, t, facing = 1) => { c.save(); c.translate(x, y); c.scale(s * facing, s); const f = Math.sin(t * 3) * 6, g = Math.sin(t * 2.2 + 1) * 10;
    c.fillStyle = '#18181e'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-30, -250); c.quadraticCurveTo(-70 + f, -120, -82 + g, -6); c.lineTo(-40 + g * .5, -14); c.lineTo(-10, -2); c.lineTo(30 + g * .5, -14); c.lineTo(70 + g, -6); c.quadraticCurveTo(60 + f, -120, 30, -250); c.closePath(); c.fill(); c.stroke();
    c.restore(); };
})(window);
