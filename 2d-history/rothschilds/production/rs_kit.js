// Rothschilds props shared by every act: five-arrow crest (the recurring device), gold coins, ledgers, letters with wax seals,
// stamps (LEGEND / MYTH / FALSE), map projection helpers and gold loan lines, chests, scales, desks, top hats, candle.
(function (G) {
  const K = G.KIT, E = K.E, INK = '#1d1712', GOLD = '#e0b04a', GOLD_D = '#a87a24', RED = '#b8302a', PAPER = '#f2e8d2';
  const RS = G.RS = { INK, GOLD, RED, PAPER };
  const pop = (lt, at, d = .45) => E.back(K.seg(lt, at, at + d));
  RS.pop = pop;
  // ---- map projections (plate pixels, 2560x1440, desk sheet) for map_europe and map_world
  const proj = (v) => { const X0 = 150, Y0 = 240, X1 = 2410, Y1 = 1250, kx = (X1 - X0) / (v.lon1 - v.lon0), ky = (Y1 - Y0) / (v.lat1 - v.lat0); return (lon, lat) => [X0 + (lon - v.lon0) * kx, Y0 + (v.lat1 - lat) * ky]; };
  RS.EU = proj({ lon0: -11, lon1: 27, lat0: 37, lat1: 58 });
  RS.WD = proj({ lon0: -82, lon1: 42, lat0: -32, lat1: 62 });
  RS.CITY = { Frankfurt: [8.68, 50.11], London: [-0.12, 51.5], Paris: [2.35, 48.85], Vienna: [16.37, 48.2], Naples: [14.25, 40.85], Brussels: [4.35, 50.85], Lisbon: [-9.14, 38.72], Rio: [-43.2, -22.9], NewYork: [-74, 40.7], Suez: [32.3, 30.6], Dublin: [-6.26, 53.35], Berlin: [13.4, 52.52], Waterloo: [4.4, 50.68] };
  RS.BROTHERS = [['Amschel', 'Frankfurt'], ['Salomon', 'Vienna'], ['Nathan', 'London'], ['Carl', 'Naples'], ['James', 'Paris']];
  // ---- people (Leo style). Real people are stylised: no likeness, just period dress.
  RS.tophat = (col = '#1a1716', band = '#3a2a22') => (c, X, Y, rad) => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 2.6; c.beginPath(); c.ellipse(X, Y - rad * .62, rad * 1.18, rad * .2, 0, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(X - rad * .72, Y - rad * .66); c.lineTo(X - rad * .66, Y - rad * 1.9); c.quadraticCurveTo(X, Y - rad * 2.02, X + rad * .66, Y - rad * 1.9); c.lineTo(X + rad * .72, Y - rad * .66); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = band; c.fillRect(X - rad * .71, Y - rad * .95, rad * 1.42, rad * .22); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(X - rad * .5, Y - rad * 1.8, rad * .16, rad * .8); c.restore(); };
  RS.tricorn = (col = '#2a2420') => (c, X, Y, rad) => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 2.6; c.beginPath(); c.moveTo(X - rad * 1.2, Y - rad * .6); c.quadraticCurveTo(X, Y - rad * 1.7, X + rad * 1.2, Y - rad * .6); c.quadraticCurveTo(X, Y - rad * .9, X - rad * 1.2, Y - rad * .6); c.fill(); c.stroke(); c.restore(); };
  RS.kippah = (col = '#1d2a4a') => (c, X, Y, rad) => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 2.4; c.beginPath(); c.ellipse(X, Y - rad * .82, rad * .5, rad * .2, 0, Math.PI, 0); c.fill(); c.stroke(); c.restore(); };
  const L = o => () => o;
  RS.MAYER = { costume: 'suit', topCol: '#4a3426', hair: 'short', hairCol: '#2a2420', beard: true, seed: 4, hat: RS.kippah('#1a1a2a') };
  RS.MAYER_OLD = { costume: 'suit', topCol: '#4a3426', hair: 'short', hairCol: '#b8b4ae', beard: 'grey', seed: 4, hat: RS.kippah('#1a1a2a') };
  RS.TEEN = { costume: 'teen', hair: 'short', hairCol: '#2a2420', seed: 4 };
  RS.OPPENHEIMER = { costume: 'suit', topCol: '#2a3a4a', hair: 'short', hairCol: '#9a9690', beard: 'grey', seed: 7 };
  RS.PRINCE = { costume: 'suit', topCol: '#2a4a8a', hair: 'swept', hairCol: '#e8e4dc', seed: 11, hat: RS.tricorn('#1a1a1a') };
  RS.NOBLE = { costume: 'suit', topCol: '#6a2a3a', hair: 'swept', hairCol: '#e8e4dc', seed: 8 };
  RS.bro = (i, hat = true) => ({ costume: 'suit', topCol: ['#3a2a22', '#2a3446', '#1e2a22', '#4a3a2a', '#2a2430'][i], hair: ['short', 'swept', 'short', 'swept', 'short'][i], hairCol: ['#2a2018', '#3a2a1e', '#1e1a16', '#4a2e1e', '#2a1e16'][i], seed: 20 + i, beard: i === 0, hat: hat ? RS.tophat() : null });
  RS.NATHAN = RS.bro(2); RS.JAMES = RS.bro(4); RS.LIONEL = { costume: 'suit', topCol: '#22262e', hair: 'swept', hairCol: '#2a2018', seed: 31, hat: RS.tophat() };
  RS.DISRAELI = { costume: 'suit', topCol: '#1e1e26', hair: 'short', hairCol: '#16120e', beard: true, seed: 33 };
  RS.SECRETARY = { costume: 'suit', topCol: '#3a3e48', hair: 'short', hairCol: '#6a4a2a', seed: 35 };
  RS.MESSENGER = { costume: 'shirtsleeves', hair: 'short', hairCol: '#5a3a22', seed: 37, hat: RS.tophat('#3a3430') };
  RS.TRADER = (i) => ({ costume: 'suit', topCol: ['#3a3a44', '#4a3a2a', '#2a3a3a', '#44302a', '#33333a'][i % 5], hair: ['short', 'swept', 'short', 'long', 'swept'][i % 5], seed: 40 + i, hat: i % 2 ? RS.tophat() : null });
  // ---- props
  RS.coin = (c, x, y, r = 26, spin = 0) => { c.save(); c.translate(x, y); c.scale(Math.max(.08, Math.abs(Math.cos(spin))), 1); c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .12); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = GOLD_D; c.lineWidth = r * .08; c.beginPath(); c.arc(0, 0, r * .72, 0, 7); c.stroke(); c.fillStyle = 'rgba(255,250,220,.6)'; c.beginPath(); c.ellipse(-r * .3, -r * .35, r * .25, r * .14, -.6, 0, 7); c.fill(); c.restore(); };
  RS.coinPile = (c, x, y, s = 1, n = 18) => { for (let k = 0; k < n; k++) { const row = Math.floor(Math.sqrt(k * 2)), i = k - row * (row + 1) / 2; RS.coin(c, x + (i - row / 2) * 40 * s + ((k * 37) % 9 - 4) * s, y - (5 - row) * 18 * s - 40 * s + row * 0, 22 * s, (k % 3) * .3); } };
  RS.chest = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 4, 150, 18, 0, 0, 7); c.fill();
    c.fillStyle = o.empty ? '#5a4030' : '#6a4426'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.roundRect(-130, -130, 260, 130, 10); c.fill(); c.stroke();
    if (o.open) { if (!o.empty) { c.save(); c.beginPath(); c.rect(-124, -200, 248, 76); c.clip(); for (let k = 0; k < 16; k++) RS.coin(c, -100 + (k % 8) * 28, -136 - Math.floor(k / 8) * 18 - Math.sin(k) * 6, 18, k * .4); c.restore(); glow(c, 0, -150, 160, '#ffd870', .35); } else { c.fillStyle = '#1e140c'; c.fillRect(-124, -136, 248, 12); }
      c.fillStyle = '#5a3820'; c.beginPath(); c.moveTo(-130, -130); c.lineTo(-120, -230); c.quadraticCurveTo(0, -270, 120, -230); c.lineTo(130, -130); c.closePath(); c.fill(); c.stroke(); }
    else { c.fillStyle = '#5a3820'; c.beginPath(); c.moveTo(-136, -130); c.quadraticCurveTo(0, -200, 136, -130); c.closePath(); c.fill(); c.stroke(); }
    c.fillStyle = '#c8a040'; for (const bx of [-90, 90]) c.fillRect(bx - 8, -134, 16, 134); c.fillRect(-14, -86, 28, 32); c.strokeStyle = INK; c.lineWidth = 3; c.strokeRect(-14, -86, 28, 32); c.restore(); };
  RS.ledger = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot ?? 0); c.fillStyle = 'rgba(0,0,0,.28)'; c.fillRect(-176, -96, 360, 210);
    c.fillStyle = '#5a2a1e'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-182, -110, 364, 214); c.strokeRect(-182, -110, 364, 214);
    for (const sx of [-1, 1]) { c.fillStyle = PAPER; c.beginPath(); c.moveTo(0, -96); c.quadraticCurveTo(sx * 80, -110, sx * 170, -98); c.lineTo(sx * 170, 92); c.quadraticCurveTo(sx * 80, 82, 0, 94); c.closePath(); c.fill(); c.stroke(); }
    const n = o.lines ?? 9, u = o.u ?? 1; c.lineWidth = 2; for (let k = 0; k < n; k++) for (const sx of [-1, 1]) { const ww = 130 * Math.min(1, Math.max(0, u * n * 2 - (k * 2 + (sx > 0)))); if (ww <= 0) continue; c.strokeStyle = 'rgba(40,30,20,.6)'; c.beginPath(); c.moveTo(sx > 0 ? 18 : -150, -70 + k * 17); c.lineTo((sx > 0 ? 18 : -150) + ww * (k % 3 ? 1 : .7), -70 + k * 17); c.stroke(); c.fillStyle = 'rgba(160,40,30,.8)'; if (ww > 120) c.fillRect(sx > 0 ? 130 : -22, -76 + k * 17, 18, 8); }
    if (o.strike) { c.strokeStyle = RED; c.lineWidth = 6; c.beginPath(); c.moveTo(-160, -30); c.lineTo(-160 + 320 * o.strike, -30); c.stroke(); }
    if (o.word) { c.fillStyle = INK; c.font = '26px SourceSerif'; c.textAlign = 'center'; c.fillText(o.word, -84, -24); }
    c.restore(); };
  RS.letter = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot ?? 0); c.fillStyle = 'rgba(0,0,0,.28)'; c.fillRect(-100, -66, 210, 140); c.fillStyle = PAPER; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-106, -72, 212, 140); c.strokeRect(-106, -72, 212, 140);
    if (o.open) { c.fillStyle = 'rgba(40,30,60,.75)'; c.font = '22px SourceSerif'; c.textAlign = 'right'; const lines = o.hebrew ? ['ובכתב יד מהיר', 'שלום לאחי', 'הכסף בדרך', 'בעזרת השם'] : ['My dear brother,', 'the bills are', 'accepted. Send', 'word by return.']; lines.forEach((t, i) => { c.textAlign = o.hebrew ? 'right' : 'left'; c.fillText(t, o.hebrew ? 90 : -90, -36 + i * 28); }); }
    else { c.strokeStyle = 'rgba(40,30,20,.45)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-106, -72); c.lineTo(0, 10); c.lineTo(106, -72); c.stroke(); }
    if (o.seal !== false) { c.fillStyle = RED; c.beginPath(); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, rr = 26 + (k % 2) * 4; c.lineTo(Math.cos(a) * rr, (o.open ? 50 : 10) + Math.sin(a) * rr); } c.closePath(); c.fill(); c.strokeStyle = '#6a1a14'; c.lineWidth = 2; c.stroke(); RS.arrows(c, 0, o.open ? 50 : 10, .15, { col: '#7a1a14', ribbon: false }); }
    c.restore(); };
  // the five arrows fanned upward from a fist-tie point; o.spread 0..1 animates them fanning out; o.ribbon binds them
  RS.arrows = (c, x, y, s = 1, o = {}) => { const sp = o.spread ?? 1, col = o.col || GOLD; c.save(); c.translate(x, y); c.scale(s, s);
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * .26 * sp; c.save(); c.rotate(a + Math.PI / 2); c.strokeStyle = o.col ? col : INK; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 90); c.lineTo(0, -150); c.stroke(); c.strokeStyle = col; c.lineWidth = 8; c.beginPath(); c.moveTo(0, 90); c.lineTo(0, -150); c.stroke();
      c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = o.col ? 0 : 4; c.beginPath(); c.moveTo(0, -200); c.lineTo(-22, -146); c.lineTo(22, -146); c.closePath(); c.fill(); if (!o.col) c.stroke();
      c.beginPath(); c.moveTo(0, 70); c.lineTo(-20, 110); c.lineTo(-6, 110); c.lineTo(0, 92); c.lineTo(6, 110); c.lineTo(20, 110); c.closePath(); c.fill(); if (!o.col) c.stroke(); c.restore(); }
    if (o.ribbon !== false) { c.fillStyle = RED; c.strokeStyle = INK; c.lineWidth = o.col ? 0 : 4; c.beginPath(); c.roundRect(-46, 4, 92, 34, 8); c.fill(); if (!o.col) c.stroke(); c.beginPath(); c.moveTo(-10, 36); c.lineTo(-40, 90); c.lineTo(-20, 84); c.lineTo(-6, 98); c.lineTo(0, 38); c.fill(); if (!o.col) c.stroke(); c.beginPath(); c.moveTo(10, 36); c.lineTo(40, 90); c.lineTo(20, 84); c.lineTo(6, 98); c.lineTo(0, 38); c.fill(); if (!o.col) c.stroke(); }
    c.restore(); };
  // shield crest with the arrows (title device)
  RS.crest = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); if (o.glow) glow(c, 0, -40, 420, '#ffd070', o.glow);
    c.fillStyle = RED; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(-170, -220); c.lineTo(170, -220); c.lineTo(170, -20); c.quadraticCurveTo(170, 140, 0, 220); c.quadraticCurveTo(-170, 140, -170, -20); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = GOLD; c.lineWidth = 6; c.beginPath(); c.moveTo(-148, -200); c.lineTo(148, -200); c.lineTo(148, -20); c.quadraticCurveTo(148, 124, 0, 196); c.quadraticCurveTo(-148, 124, -148, -20); c.closePath(); c.stroke();
    RS.arrows(c, 0, 60, .78, { spread: o.spread ?? 1 }); c.restore(); };
  RS.arrow = (c, x0, y0, x1, y1, u, o = {}) => { if (u <= 0) return; const bend = o.bend ?? .18, mx = (x0 + x1) / 2 - (y1 - y0) * bend, my = (y0 + y1) / 2 + (x1 - x0) * bend; const P = t => [(1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1];
    c.save(); c.lineCap = 'round'; for (const [w, col] of [[(o.w ?? 14) + 8, INK], [o.w ?? 14, o.col || GOLD]]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); for (let k = 0; k <= 30; k++) { const [x, y] = P(u * k / 30); k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
    const [hx, hy] = P(u), [px, py] = P(Math.max(0, u - .02)), a = Math.atan2(hy - py, hx - px); c.translate(hx, hy); c.rotate(a); c.fillStyle = o.col || GOLD; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(18, 0); c.lineTo(-26, -22); c.lineTo(-26, 22); c.closePath(); c.fill(); c.stroke(); c.restore(); };
  RS.goldLine = (c, x0, y0, x1, y1, u, o = {}) => { if (u <= 0) return; const bend = o.bend ?? .12, mx = (x0 + x1) / 2 - (y1 - y0) * bend, my = (y0 + y1) / 2 + (x1 - x0) * bend;
    c.save(); c.lineCap = 'round'; c.shadowColor = 'rgba(255,210,100,.9)'; c.shadowBlur = 18; c.strokeStyle = o.col || '#ffd060'; c.lineWidth = o.w ?? 7; c.setLineDash(o.dash || []); c.beginPath(); for (let k = 0; k <= 30; k++) { const t = u * k / 30, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.restore(); };
  RS.dot = (c, x, y, lt, at, label, o = {}) => { const a = pop(lt, at); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = o.col || GOLD; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, o.r ?? 18, 0, 7); c.fill(); c.stroke(); c.restore();
    if (label) K.outlined(c, label, x + (o.dx ?? 0), y + (o.dy ?? -50), o.px ?? 46, { fill: o.fill || '#fff4dc' }); };
  // red rubber stamp that thumps down
  RS.stamp = (c, txt, x, y, lt, at, o = {}) => { const a = K.seg(lt, at, at + .22); if (a <= 0) return; const sc = 1.8 - .8 * E.out(a); c.save(); c.translate(x, y); c.rotate(o.rot ?? -.12); c.scale(sc, sc); c.globalAlpha = Math.min(1, a * 2) * (o.al ?? .92);
    c.font = `${o.px ?? 90}px Anton`; const w = c.measureText(txt).width + 50, h = (o.px ?? 90) * 1.25; c.strokeStyle = o.col || '#c8281e'; c.lineWidth = 9; c.strokeRect(-w / 2, -h / 2, w, h); c.lineWidth = 3; c.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20);
    c.fillStyle = o.col || '#c8281e'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, 0, 4); c.restore(); };
  // small corner tag: LEGEND (story that may not be true) or FACT
  RS.tag = (c, txt, lt, at = .3, o = {}) => { const a = K.seg(lt, at, at + .35); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(o.x ?? 70, o.y ?? 60); c.font = '34px Anton'; const w = c.measureText(txt).width + 40, col = txt === 'FACT' ? '#2e6a3a' : txt === 'STORY' || txt === 'LEGEND' ? '#a8701e' : '#8a2a22';
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(0, 0, w, 54, 10); c.fill(); c.stroke(); c.fillStyle = '#fff4e0'; c.textBaseline = 'middle'; c.fillText(txt, 20, 29); c.restore(); };
  RS.desk = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 6, 340, 26, 0, 0, 7); c.fill(); const col = o.col || '#5a3420';
    c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-320, -230, 640, 230); c.strokeRect(-320, -230, 640, 230); c.fillStyle = shade(col, .15); c.fillRect(-340, -256, 680, 30); c.strokeRect(-340, -256, 680, 30);
    for (const px of [-300, 120]) { c.strokeStyle = 'rgba(20,10,4,.5)'; c.lineWidth = 3; c.strokeRect(px, -200, 180, 80); c.strokeRect(px, -100, 180, 80); c.fillStyle = '#c8a040'; c.fillRect(px + 80, -164, 20, 8); c.fillRect(px + 80, -64, 20, 8); } c.restore(); };
  RS.scale = (c, x, y, s = 1, tilt = 0, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.fillStyle = '#b8902c'; c.lineWidth = 5; c.fillRect(-60, -10, 120, 16); c.strokeRect(-60, -10, 120, 16); c.fillRect(-8, -280, 16, 270); c.strokeRect(-8, -280, 16, 270);
    c.save(); c.translate(0, -270); c.rotate(tilt); c.fillRect(-200, -8, 400, 14); c.strokeRect(-200, -8, 400, 14); for (const sx of [-1, 1]) { c.save(); c.translate(sx * 190, 0); c.rotate(-tilt); c.lineWidth = 2.5; c.beginPath(); c.moveTo(0, 0); c.lineTo(-60, 150); c.moveTo(0, 0); c.lineTo(60, 150); c.stroke();
      c.lineWidth = 5; c.beginPath(); c.ellipse(0, 150, 80, 18, 0, 0, Math.PI); c.closePath(); c.fill(); c.stroke(); if (o.load && o.load[sx > 0 ? 1 : 0]) o.load[sx > 0 ? 1 : 0](c, 0, 140); c.restore(); } c.restore(); c.restore(); };
  RS.quill = (c, x, y, s = 1, rot = -.5) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = '#f0ece0'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(30, -90, 10, -200); c.quadraticCurveTo(-20, -100, 0, 0); c.fill(); c.stroke(); c.restore(); };
  RS.candle = (c, x, y, s = 1, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); glow(c, 0, -170, 360, '#ffb050', .45); c.fillStyle = '#efe6d0'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.roundRect(-34, -150, 68, 150, 6); c.fill(); c.stroke();
    c.fillStyle = 'rgba(200,180,140,.5)'; c.fillRect(14, -150, 12, 150); const f = Math.sin(t * 7) * 4 + Math.sin(t * 13) * 2; c.fillStyle = '#ffcc55'; c.beginPath(); c.moveTo(0, -150); c.quadraticCurveTo(-18, -180, f, -220); c.quadraticCurveTo(18, -180, 0, -150); c.fill(); c.fillStyle = '#fff4c0'; c.beginPath(); c.ellipse(0, -168, 6, 14, 0, 0, 7); c.fill(); c.restore(); };
  RS.flag = (c, x, y, s, cols, u = 1, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#3a2a1a'; c.fillRect(-6, -420, 12, 420); const h = 300 * u; c.save(); c.translate(6, -420 + (1 - u) * 300); for (let i = 0; i < cols.length; i++) { c.fillStyle = cols[i]; c.beginPath(); for (let k = 0; k <= 10; k++) { const xx = i * 80 + k * 8, w = Math.sin(t * 4 + xx * .03) * 8; c.lineTo(xx, w); } for (let k = 10; k >= 0; k--) { const xx = i * 80 + k * 8, w = Math.sin(t * 4 + xx * .03) * 8; c.lineTo(xx, 170 + w); } c.closePath(); c.fill(); } c.restore(); c.restore(); };
  // a newspaper whose cartoon is blurred so it cannot be read (antisemitic cartoons are never shown legibly)
  RS.paper = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-150, -196, 316, 420); c.fillStyle = '#e8e0cc'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(-158, -210, 316, 420); c.strokeRect(-158, -210, 316, 420);
    c.fillStyle = '#2a2420'; c.fillRect(-130, -190, 260, 26); c.save(); c.filter = 'blur(9px)'; for (let k = 0; k < 12; k++) { c.fillStyle = `rgba(30,24,20,${.25 + (k % 3) * .15})`; c.beginPath(); c.ellipse(-80 + (k * 53) % 170, -90 + (k * 37) % 150, 30 + k % 4 * 10, 20 + k % 3 * 12, k, 0, 7); c.fill(); } c.restore();
    c.fillStyle = 'rgba(40,30,20,.35)'; for (let k = 0; k < 7; k++) c.fillRect(-130, 90 + k * 16, 240 - (k % 3) * 40, 6); c.restore(); };
  function glow(c, x, y, r, col, al) { const g = c.createRadialGradient(x, y, 0, x, y, r); const n = parseInt(col.slice(1), 16); g.addColorStop(0, `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${al})`); g.addColorStop(1, `rgba(${n >> 16},${n >> 8 & 255},${n & 255},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); }
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); const m = v => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))); return `rgb(${m(n >> 16)},${m(n >> 8 & 255)},${m(n & 255)})`; }
  RS.glow = glow; RS.shade = shade;
  // custom coat colours go through the look (lookFrom ignores topCol on the options)
  RS.P = p => { if (!p.topCol || !G.RIG6) return p; const look = Object.assign(G.RIG6.lookFrom(p), { topCol: p.topCol }); if (p.costume === 'suit') look.legs = shade(p.topCol, -.2); return Object.assign({}, p, { look }); };
  for (const k of ['MAYER', 'MAYER_OLD', 'OPPENHEIMER', 'PRINCE', 'NOBLE', 'NATHAN', 'JAMES', 'LIONEL', 'DISRAELI', 'SECRETARY']) RS[k] = RS.P(RS[k]);
  const bro0 = RS.bro, tr0 = RS.TRADER; RS.bro = (i, hat) => RS.P(bro0(i, hat)); RS.TRADER = i => RS.P(tr0(i));
})(window);
