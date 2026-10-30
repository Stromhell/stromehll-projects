// Mongol Empire props shared by every act: costumes, fur hat, horse, ger, cart, bow, arrows, empire map helpers, snow.
(function (G) {
  const R = G.RIG, INK = '#1d1712';
  const MG = G.MG = {};
  // ---- costumes (added to the rig's table) ----
  Object.assign(R.COSTUMES, {
    deel: { torso: '#3f5f8a', sleeve: '#3f5f8a', legs: '#3f5f8a', shoes: '#4a2e1a', dressLen: .78, belt: '#d9a032', collar: 'wrap', trim: '#c84a32', wide: true },
    deelRed: { torso: '#9a3a2e', sleeve: '#9a3a2e', legs: '#9a3a2e', shoes: '#3a2414', dressLen: .78, belt: '#e0b040', collar: 'wrap', trim: '#2f4f6a', wide: true },
    deelBrown: { torso: '#7a5a3a', sleeve: '#7a5a3a', legs: '#7a5a3a', shoes: '#3a2414', dressLen: .78, belt: '#3a2a1a', collar: 'wrap', trim: '#b88a4a', wide: true },
    deelGreen: { torso: '#4f6a46', sleeve: '#4f6a46', legs: '#4f6a46', shoes: '#3a2414', dressLen: .78, belt: '#c9a25a', collar: 'wrap', trim: '#8a3a2a', wide: true },
    deelKid: { torso: '#6a7f9a', sleeve: '#6a7f9a', legs: '#6a7f9a', shoes: '#4a2e1a', dressLen: .7, belt: '#9a6a3a', collar: 'wrap', trim: '#8a4a32', wide: true, patches: true },
    hanRobe: { torso: '#b8862a', sleeve: '#b8862a', legs: '#b8862a', shoes: '#1d1712', dressLen: .95, belt: '#7a1e1e', collar: 'wrap', trim: '#7a1e1e', wide: true },
    persian: { torso: '#2f7a6a', sleeve: '#2f7a6a', legs: '#2f7a6a', shoes: '#5a2a1a', dressLen: .9, belt: '#e8c060', collar: 'wrap', trim: '#e8c060', wide: true },
    rus: { torso: '#8a2a2a', sleeve: '#8a2a2a', legs: '#3a3a5a', shoes: '#2a1a10', dressLen: .6, belt: '#d9b040', collar: 'round', trim: '#d9b040' },
    knight: { torso: '#9aa2ac', sleeve: '#8a929c', legs: '#8a929c', shoes: '#5a626c', belt: '#4a2e1a', collar: 'round', sheen: true, tabard: '#e8e2d2' },
  });
  // ---- Leo-style looks for figures: pass as { look: MG.look('deel') } ----
  const LK = {
    deel: { top: 'tunic', topCol: '#3f5f8a', legs: '#2a2420', shoes: '#4a2e1a', sole: '#2a1d14' },
    deelRed: { top: 'tunic', topCol: '#9a3a2e', legs: '#2a2420', shoes: '#3a2414', sole: '#2a1d14' },
    deelBrown: { top: 'tunic', topCol: '#7a5a3a', legs: '#2a2420', shoes: '#3a2414', sole: '#2a1d14' },
    deelGreen: { top: 'tunic', topCol: '#4f6a46', legs: '#2a2420', shoes: '#3a2414', sole: '#2a1d14' },
    deelKid: { top: 'tunic', topCol: '#6a7f9a', legs: '#3a3028', shoes: '#4a2e1a', sole: '#2a1d14' },
    hanRobe: { top: 'jacket', topCol: '#b8862a', inner: '#7a1e1e', legs: '#7a5a1a', shoes: '#1d1712', sole: '#1d1712' },
    persian: { top: 'jacket', topCol: '#2f7a6a', inner: '#e8c060', legs: '#2a4a40', shoes: '#5a2a1a', sole: '#2a1d14' },
    rus: { top: 'jacket', topCol: '#8a2a2a', inner: '#d9b040', legs: '#3a3a5a', shoes: '#2a1a10', sole: '#2a1d14' },
    knight: { top: 'sweater', topCol: '#9aa2ac', sleeveCol: '#8a929c', collarCol: '#c8ccd2', legs: '#7a828c', shoes: '#5a626c', sole: '#3a3a3a' },
  };
  MG.look = (kind, o = {}) => { const base = G.RIG6.lookFrom(Object.assign({ costume: 'farmer', hair: o.hair || 'short', seed: o.seed ?? 3, beard: o.beard, hairCol: o.hairCol || '#1d1a18', skin: o.skin }, o)); return Object.assign(base, LK[kind] || {}, o.over || {}); };
  // ---- hats: fn(ctx, hx, hy, headR) ----
  MG.furHat = (fur = '#6a4a2e', top = '#c84a32') => (c, hx, hy, r) => { c.save(); c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .06);
    c.fillStyle = top; c.beginPath(); c.moveTo(hx - r * .62, hy - r * .78); c.quadraticCurveTo(hx - r * .5, hy - r * 1.55, hx + r * .05, hy - r * 1.62); c.quadraticCurveTo(hx + r * .6, hy - r * 1.5, hx + r * .66, hy - r * .78); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#e0b040'; c.beginPath(); c.arc(hx + r * .05, hy - r * 1.64, r * .12, 0, 7); c.fill(); c.stroke();
    c.fillStyle = fur; c.beginPath(); c.moveTo(hx - r * 1.05, hy - r * .55); for (let k = 0; k <= 12; k++) { const t = k / 12, x = hx - r * 1.05 + t * r * 2.1, y = hy - r * .62 - Math.sin(t * Math.PI) * r * .28 + (k % 2 ? -r * .06 : r * .04); c.lineTo(x, y); }
    c.lineTo(hx + r * 1.05, hy - r * .4); c.quadraticCurveTo(hx, hy - r * .58, hx - r * 1.05, hy - r * .4); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(255,240,210,.25)'; c.lineWidth = Math.max(1, r * .03); for (let k = 0; k < 9; k++) { const x = hx - r * .85 + k * r * .21; c.beginPath(); c.moveTo(x, hy - r * .48); c.lineTo(x + r * .05, hy - r * .74); c.stroke(); }
    c.restore(); };
  MG.turban = (col = '#f2ead8') => (c, hx, hy, r) => { c.save(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .06); c.beginPath(); c.ellipse(hx, hy - r * .8, r * 1.02, r * .55, 0, Math.PI, 0); c.lineTo(hx + r * .98, hy - r * .55); c.quadraticCurveTo(hx, hy - r * .45, hx - r * .98, hy - r * .55); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(120,100,70,.5)'; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(hx, hy - r * (.7 + k * .17), r * (.95 - k * .12), r * .25, 0, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); } c.fillStyle = '#c83a2a'; c.beginPath(); c.arc(hx, hy - r * 1.05, r * .1, 0, 7); c.fill(); c.restore(); };
  MG.hanHat = (c, hx, hy, r) => { c.save(); c.fillStyle = '#1d1712'; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.roundRect(hx - r * .45, hy - r * 1.45, r * .9, r * .8, r * .12); c.fill(); c.fillRect(hx - r * 1.25, hy - r * 1.02, r * 2.5, r * .1); c.restore(); };
  MG.helm = (c, hx, hy, r) => { c.save(); const g = c.createLinearGradient(hx - r, 0, hx + r, 0); g.addColorStop(0, '#6a727c'); g.addColorStop(.45, '#d8dee6'); g.addColorStop(1, '#5a626c'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .06);
    c.beginPath(); c.moveTo(hx - r * 1.02, hy + r * .5); c.lineTo(hx - r * 1.02, hy - r * .6); c.quadraticCurveTo(hx, hy - r * 1.45, hx + r * 1.02, hy - r * .6); c.lineTo(hx + r * 1.02, hy + r * .5); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#141414'; c.fillRect(hx - r * .7, hy - r * .2, r * 1.4, r * .14); c.fillRect(hx - r * .04, hy - r * .2, r * .08, r * .6); c.restore(); };
  MG.rusHat = (c, hx, hy, r) => { c.save(); c.fillStyle = '#c8302a'; c.strokeStyle = INK; c.lineWidth = Math.max(2, r * .06); c.beginPath(); c.ellipse(hx, hy - r * .9, r * .78, r * .62, 0, Math.PI, 0); c.fill(); c.stroke();
    c.fillStyle = '#4a3020'; c.beginPath(); c.roundRect(hx - r * 1.02, hy - r * .95, r * 2.04, r * .38, r * .18); c.fill(); c.stroke(); c.restore(); };

  // ---- horse (side view, faces +x at facing 1). o: x,y (ground), s, facing, t, gait 'stand'|'walk'|'gallop'|'graze', col, mane, speed, rider(c) drawn in horse space at saddle, sil (silhouette colour) ----
  MG.horse = (c, o) => { const s = o.s ?? 1, F = o.facing ?? 1, t = o.t ?? 0, gait = o.gait || 'stand', sil = o.sil;
    const col = sil || o.col || '#7a4a2a', dark = sil || shade(col, -.32), light = sil || shade(col, .22), mane = sil || o.mane || '#2a1a10', hoof = sil || '#2a2420';
    const sp = o.speed ?? (gait === 'gallop' ? 9 : gait === 'walk' ? 4.2 : 0), ph = (o.dist != null && sp ? o.dist / (s * (gait === 'gallop' ? 74 : 36)) : t * sp) + (o.phase || 0);
    const bob = gait === 'gallop' ? -Math.abs(Math.sin(ph)) * 16 : gait === 'walk' ? -Math.abs(Math.sin(ph)) * 4 : Math.sin(t * 1.3) * 1.5;
    const pitch = gait === 'gallop' ? Math.sin(ph) * .05 : 0;
    c.save(); c.translate(o.x, o.y); c.scale(s * F, s);
    // ground shadow
    if (!sil && o.shadow !== false) { c.fillStyle = 'rgba(20,14,8,.32)'; c.beginPath(); c.ellipse(0, 4, 175, 18, 0, 0, 7); c.fill(); }
    const lw = 4.5;
    const leg = (hx, hy, front, off, far) => { let u, l;
      if (gait === 'gallop') { const p = ph + off; u = .62 * Math.sin(p); l = front ? u - 1.1 * Math.max(0, Math.sin(p + 1.4)) : u + .9 * Math.max(0, Math.sin(p - 1.2)) - .3; }
      else if (gait === 'walk') { const p = ph + off; u = .3 * Math.sin(p); l = front ? u - .8 * Math.max(0, Math.sin(p + 1.3)) : u + .5 * Math.max(0, Math.sin(p - 1.1)) - .1; }
      else { u = front ? .04 : -.05; l = front ? .02 : .12; }
      const L1 = 92, L2 = 96, kx = hx + Math.sin(u) * L1, ky = hy + Math.cos(u) * L1, fx = kx + Math.sin(l) * L2, fy = ky + Math.cos(l) * L2;
      const fill = far ? dark : col; c.lineCap = 'round'; c.lineJoin = 'round';
      c.strokeStyle = INK; c.lineWidth = (front ? 34 : 40) + lw * 2; c.beginPath(); c.moveTo(hx, hy - 20); c.lineTo(kx, ky); c.stroke(); c.lineWidth = 20 + lw * 2; c.beginPath(); c.moveTo(kx, ky); c.lineTo(fx, fy - 8); c.stroke();
      c.strokeStyle = fill; c.lineWidth = front ? 34 : 40; c.beginPath(); c.moveTo(hx, hy - 20); c.lineTo(kx, ky); c.stroke(); c.lineWidth = 20; c.beginPath(); c.moveTo(kx, ky); c.lineTo(fx, fy - 8); c.stroke();
      c.fillStyle = fill; c.strokeStyle = INK; c.lineWidth = lw * .7; c.beginPath(); c.arc(kx, ky, 15, 0, 7); c.fill();
      c.save(); c.translate(fx, fy - 8); c.rotate(l * .8); c.fillStyle = hoof; c.beginPath(); c.moveTo(-13, -6); c.lineTo(13, -6); c.lineTo(17, 10); c.lineTo(-15, 10); c.closePath(); c.fill(); c.stroke(); c.restore(); };
    c.save(); c.translate(0, bob - 6); c.rotate(pitch);
    // far legs
    leg(70, -190, true, Math.PI * .5, true); leg(-108, -195, false, Math.PI * 1.5, true);
    // tail
    const sw = gait === 'gallop' ? .35 + Math.sin(ph * .7) * .1 : Math.sin(t * 1.7) * .12;
    c.save(); c.translate(-158, -262); c.rotate(sw); c.fillStyle = mane; c.strokeStyle = INK; c.lineWidth = lw; c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-40, 10, -58, 70, -46, 150); c.quadraticCurveTo(-30, 168, -18, 150); c.bezierCurveTo(-26, 90, -6, 40, 14, 14); c.closePath(); c.fill(); c.stroke();
    if (!sil) { c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-8 - k * 6, 14); c.quadraticCurveTo(-34 - k * 4, 70, -30 - k * 4, 140); c.stroke(); } } c.restore();
    // body
    const body = new Path2D('M-160,-262 C-150,-292 -60,-286 10,-280 C60,-276 100,-292 128,-300 L168,-238 C178,-200 160,-170 128,-165 C80,-150 -40,-152 -110,-160 C-160,-166 -178,-200 -172,-232 Z');
    const g = c.createLinearGradient(0, -300, 0, -150); g.addColorStop(0, light); g.addColorStop(.55, col); g.addColorStop(1, dark); c.fillStyle = sil ? sil : g; c.fill(body);
    if (!sil) { c.save(); c.clip(body); c.fillStyle = 'rgba(255,240,220,.16)'; c.beginPath(); c.ellipse(-90, -250, 60, 30, -.1, 0, 7); c.fill(); c.beginPath(); c.ellipse(110, -240, 40, 32, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-110, -230); c.quadraticCurveTo(-60, -200, -100, -170); c.stroke(); c.beginPath(); c.moveTo(80, -250); c.quadraticCurveTo(60, -205, 90, -170); c.stroke(); c.restore(); }
    c.strokeStyle = INK; c.lineWidth = lw; c.stroke(body);
    // neck + head (rotates around withers; graze lowers it)
    const nk = gait === 'graze' ? .95 + Math.sin(t * .9) * .05 : gait === 'gallop' ? .25 + Math.sin(ph) * .06 : Math.sin(t * .8) * .03;
    c.save(); c.translate(120, -270); c.rotate(nk);
    const neck = new Path2D('M-10,-30 C10,-70 40,-120 70,-150 L118,-128 C100,-90 80,-40 52,30 L0,24 Z');
    c.fillStyle = sil ? sil : col; c.fill(neck); c.strokeStyle = INK; c.lineWidth = lw; c.stroke(neck);
    const head = new Path2D('M58,-160 C78,-178 108,-176 122,-158 C138,-130 160,-96 166,-78 C170,-62 156,-52 140,-56 C120,-60 108,-74 96,-92 C84,-110 66,-120 58,-136 Z');
    const gh = c.createLinearGradient(60, -170, 160, -60); gh.addColorStop(0, light); gh.addColorStop(1, col); c.fillStyle = sil ? sil : gh; c.fill(head); c.stroke(head);
    // ears
    c.fillStyle = sil ? sil : col; c.beginPath(); c.moveTo(70, -164); c.lineTo(66, -200); c.lineTo(86, -170); c.closePath(); c.fill(); c.stroke();
    if (!sil) { c.fillStyle = '#1a1210'; c.beginPath(); c.ellipse(100, -138, 7, 5.5, .5, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(102, -140, 2, 0, 7); c.fill();
      c.fillStyle = 'rgba(0,0,0,.5)'; c.beginPath(); c.ellipse(156, -76, 5, 3.5, .7, 0, 7); c.fill(); c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(146, -60); c.quadraticCurveTo(136, -64, 130, -58); c.stroke();
      // bridle
      c.strokeStyle = '#3a2214'; c.lineWidth = 4; c.beginPath(); c.moveTo(78, -160); c.lineTo(120, -90); c.moveTo(108, -112); c.lineTo(146, -92); c.stroke(); }
    // mane
    c.fillStyle = mane; c.strokeStyle = INK; c.lineWidth = lw * .8; c.beginPath(); c.moveTo(62, -168); for (let k = 0; k <= 8; k++) { const tt = k / 8, x = 62 - tt * 78, y = -168 + tt * 150, fl = gait === 'gallop' ? Math.sin(ph * 1.3 + k) * 6 - 12 : Math.sin(t * 2 + k) * 2; c.lineTo(x - 22 + fl, y + 4); c.lineTo(x - 4, y + 14); } c.lineTo(-4, -10); c.quadraticCurveTo(30, -90, 62, -168); c.closePath(); c.fill(); c.stroke();
    c.restore();
    // saddle + rider
    if (o.saddle !== false && !sil) { c.fillStyle = '#5a2e1a'; c.strokeStyle = INK; c.lineWidth = lw * .8; c.beginPath(); c.moveTo(-40, -285); c.quadraticCurveTo(-30, -305, -10, -296); c.lineTo(40, -296); c.quadraticCurveTo(58, -310, 64, -286); c.quadraticCurveTo(10, -270, -40, -285); c.fill(); c.stroke(); c.fillStyle = '#c84a32'; c.beginPath(); c.moveTo(-50, -280); c.lineTo(70, -282); c.lineTo(60, -232); c.lineTo(-44, -232); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#e0b040'; c.fillRect(-44, -244, 104, 8); }
    if (o.rider) o.rider(c, ph);
    // near legs
    leg(100, -190, true, 0, false); leg(-82, -195, false, Math.PI, false);
    c.restore(); c.restore(); };
  // a horse archer silhouette or coloured rider (drawn in horse space, saddle at 10,-300)
  MG.archer = (o = {}) => (c, ph) => { const col = o.sil || o.col || '#3f5f8a', skin = o.sil || '#f1d9b8', hat = o.sil || '#6a4a2e', ink = o.sil ? o.sil : INK, b = Math.sin(ph) * 3;
    c.save(); c.translate(10, -300 + b); c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = ink; c.lineWidth = 4;
    // leg + boot
    c.fillStyle = col; c.beginPath(); c.moveTo(-26, -6); c.quadraticCurveTo(10, 30, 26, 64); c.lineTo(46, 60); c.quadraticCurveTo(30, 18, 14, -10); c.closePath(); c.fill(); c.stroke(); c.fillStyle = o.sil || '#2a1a10'; c.beginPath(); c.roundRect(24, 54, 34, 18, 6); c.fill(); c.stroke();
    // torso (deel)
    c.fillStyle = col; c.beginPath(); c.moveTo(-34, 0); c.quadraticCurveTo(-40, -70, -8, -112); c.lineTo(26, -108); c.quadraticCurveTo(44, -60, 30, 2); c.closePath(); c.fill(); c.stroke(); if (!o.sil) { c.fillStyle = '#d9a032'; c.fillRect(-36, -30, 70, 10); c.strokeStyle = '#c84a32'; c.lineWidth = 6; c.beginPath(); c.moveTo(18, -108); c.quadraticCurveTo(0, -70, 30, -34); c.stroke(); c.strokeStyle = ink; c.lineWidth = 4; }
    // head
    c.fillStyle = skin; c.beginPath(); c.arc(6, -142, 34, 0, 7); c.fill(); c.stroke(); MG.furHat(o.sil || '#6a4a2e', o.sil || '#c84a32')(c, 6, -142, 34);
    if (!o.sil) { c.fillStyle = INK; c.beginPath(); c.arc(20, -144, 3.5, 0, 7); c.fill(); c.beginPath(); c.moveTo(14, -128); c.lineTo(28, -128); c.stroke(); }
    // drawing arm + bow
    const draw = o.draw ?? .7;
    c.save(); c.translate(70 + 10 * draw, -92); c.strokeStyle = o.sil || '#4a2e1a'; c.lineWidth = 7; c.beginPath(); c.moveTo(0, -78); c.bezierCurveTo(26, -60, 26, -20, 14, 0); c.bezierCurveTo(26, 20, 26, 60, 0, 78); c.stroke(); c.strokeStyle = o.sil || '#e8dcc0'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -78); c.lineTo(-60 * draw, 0); c.lineTo(0, 78); c.stroke(); c.restore();
    c.strokeStyle = ink; c.lineWidth = 4; c.fillStyle = col; c.beginPath(); c.moveTo(14, -96); c.lineTo(80 + 10 * draw, -92); c.stroke(); c.lineWidth = 18; c.strokeStyle = col; c.beginPath(); c.moveTo(14, -96); c.lineTo(80 + 10 * draw, -92); c.stroke(); c.lineWidth = 4; c.strokeStyle = ink;
    c.fillStyle = skin; c.beginPath(); c.arc(84 + 10 * draw, -92, 9, 0, 7); c.fill(); c.stroke();
    if (draw > .2) { c.strokeStyle = o.sil || '#6a4a2e'; c.lineWidth = 3; c.beginPath(); c.moveTo(80 + 10 * draw - 60 * draw - 10, -92); c.lineTo(120 + 10 * draw, -92); c.stroke(); }
    c.restore(); };
  // ---- ger (yurt): x,y ground centre, s, door colour, smoke handled by caller ----
  MG.ger = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(20,14,8,.3)'; c.beginPath(); c.ellipse(10, 4, 190, 22, 0, 0, 7); c.fill();
    const wall = c.createLinearGradient(-160, 0, 160, 0); wall.addColorStop(0, '#cfc4ae'); wall.addColorStop(.5, '#f2ead8'); wall.addColorStop(1, '#b8ad96'); c.fillStyle = wall; c.strokeStyle = INK; c.lineWidth = 4;
    c.beginPath(); c.moveTo(-160, 0); c.lineTo(-160, -120); c.lineTo(160, -120); c.lineTo(160, 0); c.closePath(); c.fill(); c.stroke();
    const roof = c.createLinearGradient(0, -220, 0, -120); roof.addColorStop(0, '#e8e0cc'); roof.addColorStop(1, '#c8bca4'); c.fillStyle = roof; c.beginPath(); c.moveTo(-172, -118); c.quadraticCurveTo(-90, -190, -24, -214); c.lineTo(24, -214); c.quadraticCurveTo(90, -190, 172, -118); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#6a3a22'; c.lineWidth = 5; for (const yy of [-100, -40]) { c.beginPath(); c.moveTo(-160, yy); c.lineTo(160, yy); c.stroke(); } c.beginPath(); c.moveTo(-120, -150); c.quadraticCurveTo(0, -130, 120, -150); c.stroke();
    c.fillStyle = '#5a4a3a'; c.beginPath(); c.ellipse(0, -214, 26, 7, 0, 0, 7); c.fill();
    c.fillStyle = o.door || '#c84a32'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.roundRect(-34, -104, 68, 104, 4); c.fill(); c.stroke(); c.strokeStyle = '#e0b040'; c.lineWidth = 3; c.strokeRect(-24, -94, 48, 84); if (o.glow) { c.fillStyle = 'rgba(255,190,90,.85)'; c.fillRect(-24, -94, 48, 84); }
    c.restore(); };
  // ---- two-wheeled cart; broken: one wheel off and tilted ----
  MG.cart = (c, x, y, s = 1, broken = false) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(20,14,8,.3)'; c.beginPath(); c.ellipse(0, 4, 230, 20, 0, 0, 7); c.fill();
    const wheel = (wx, wy, r, rot, cracked) => { c.save(); c.translate(wx, wy); c.rotate(rot); c.strokeStyle = INK; c.lineWidth = 16; c.beginPath(); c.arc(0, 0, r, 0, 7); c.stroke(); c.strokeStyle = '#7a5232'; c.lineWidth = 10; c.beginPath(); c.arc(0, 0, r, cracked ? .4 : 0, cracked ? 5.6 : 7); c.stroke(); for (let k = 0; k < 8; k++) { if (cracked && (k === 0 || k === 5)) continue; const a = k / 8 * Math.PI * 2; c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * r, Math.sin(a) * r); c.stroke(); c.strokeStyle = '#8a6240'; c.lineWidth = 5; c.stroke(); } c.fillStyle = '#5a3a22'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 16, 0, 7); c.fill(); c.stroke(); c.restore(); };
    if (broken) { wheel(150, -88, 88, .3, false); c.fillStyle = '#8a6240'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-215, -4); c.lineTo(160, -158); c.lineTo(168, -122); c.lineTo(-205, 4); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2; for (let k = 0; k < 7; k++) { const u = k / 7, x = -210 + u * 372, y = -2 - u * 152; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 6, y + 34); c.stroke(); }
      c.strokeStyle = INK; c.lineWidth = 12; c.beginPath(); c.moveTo(160, -140); c.lineTo(330, -170); c.stroke(); c.strokeStyle = '#7a5232'; c.lineWidth = 7; c.stroke();
      c.save(); c.translate(-360, -10); c.scale(1, .26); c.strokeStyle = INK; c.lineWidth = 18; c.beginPath(); c.arc(0, 0, 88, 0, 7); c.stroke(); c.strokeStyle = '#7a5232'; c.lineWidth = 11; c.beginPath(); c.arc(0, 0, 88, .5, 5.5); c.stroke(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28; c.strokeStyle = '#8a6240'; c.lineWidth = 7; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 88, Math.sin(a) * 88); c.stroke(); } c.restore(); c.restore(); return; }
    c.save();
    // bed of planks
    c.fillStyle = '#8a6240'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(-200, -150); c.lineTo(160, -150); c.lineTo(150, -110); c.lineTo(-190, -110); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2; for (let k = -180; k < 150; k += 44) { c.beginPath(); c.moveTo(k, -150); c.lineTo(k - 2, -110); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 12; c.beginPath(); c.moveTo(150, -130); c.lineTo(330, -60); c.stroke(); c.strokeStyle = '#7a5232'; c.lineWidth = 7; c.stroke();
    if (!broken) wheel(-20, -88, 88, 0, false); c.restore();
    c.restore(); };
  // ---- composite bow lying or held ----
  // ---- arrow flying from (x0,y0) to (x1,y1), u 0..1 ----
  MG.arrow = (c, x0, y0, x1, y1, u, s = 1) => { if (u <= 0) return; const x = x0 + (x1 - x0) * Math.min(1, u), y = y0 + (y1 - y0) * Math.min(1, u) - Math.sin(Math.min(1, u) * Math.PI) * 60 * s, a = Math.atan2(y1 - y0 - Math.cos(Math.min(1, u) * Math.PI) * 60 * s * Math.PI / 1, x1 - x0);
    c.save(); c.translate(x, y); c.rotate(Math.atan2(y1 - y0, x1 - x0) - Math.cos(Math.min(1, u) * Math.PI) * .25); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-110, 0); c.lineTo(0, 0); c.stroke(); c.strokeStyle = '#a07a4a'; c.lineWidth = 4; c.stroke();
    c.fillStyle = '#5a5a60'; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.moveTo(0, -8); c.lineTo(22, 0); c.lineTo(0, 8); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#c84a32'; for (const sy of [-1, 1]) { c.beginPath(); c.moveTo(-108, 0); c.lineTo(-92, sy * 12); c.lineTo(-74, sy * 12); c.lineTo(-84, 0); c.closePath(); c.fill(); c.stroke(); } c.restore(); };
  // ---- map helpers for map_eurasia (view lon -12..148, lat 8..68, desk) ----
  MG.EU = { lon0: -12, lon1: 148, lat0: 8, lat1: 68 };
  MG.proj = (v = MG.EU) => { const X0 = 150, Y0 = 240, X1 = 2410, Y1 = 1250, kx = (X1 - X0) / (v.lon1 - v.lon0), ky = (Y1 - Y0) / (v.lat1 - v.lat0); return (lon, lat) => [X0 + (lon - v.lon0) * kx, Y0 + (v.lat1 - lat) * ky]; };
  // the empire at its height (c. 1279), rough outline in lon/lat
  MG.EMPIRE = [[129, 35], [130, 42], [135, 47], [132, 52], [122, 54], [110, 55], [98, 54], [88, 55], [78, 56], [68, 57], [58, 59], [50, 60], [42, 58], [34, 55], [29, 51], [27, 47], [30, 46], [34, 45], [38, 45], [41, 43], [42, 41], [36, 41], [30, 40], [29, 38], [36, 36.5], [37, 34], [40, 32], [44, 30], [48, 29.5], [52, 27], [57, 26], [62, 25], [66, 26], [70, 30], [72, 34], [75, 36], [80, 34], [86, 29], [92, 27.5], [97, 28], [98, 24], [101, 22], [106, 22.5], [109, 21], [111, 20], [113, 22], [117, 23.5], [120, 26.5], [121.5, 30], [121, 32.5], [120, 35], [122.5, 37], [121, 39.5], [124.5, 40], [126.5, 37.5], [126.5, 34.5]];
  MG.empirePath = (pr, pts = MG.EMPIRE) => { const p = new Path2D(); pts.forEach(([lo, la], i) => { const [x, y] = pr(lo, la); i ? p.lineTo(x, y) : p.moveTo(x, y); }); p.closePath(); return p; };
  // red ink that bleeds out from (cx,cy) to radius rad (wobbly edge)
  MG.inkClip = (c, cx, cy, rad, seed = 3) => { c.beginPath(); for (let k = 0; k <= 72; k++) { const a = k / 72 * Math.PI * 2, w = 1 + .12 * Math.sin(a * 5 + seed) + .07 * Math.sin(a * 11 + seed * 2) + .04 * Math.sin(a * 23); const x = cx + Math.cos(a) * rad * w, y = cy + Math.sin(a) * rad * w * .8; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); c.clip(); };
  MG.ink = (c, path, alpha = .62) => { c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgba(178,34,30,${alpha})`; c.fill(path); c.restore(); c.save(); c.strokeStyle = 'rgba(120,14,12,.85)'; c.lineWidth = 5; c.setLineDash([16, 8]); c.stroke(path); c.restore(); };
  // ---- snow: world-space flakes drifting with wind ----
  MG.snow = (n = 160, wind = 120, x0 = 0, x1 = 2560, y0 = 0, y1 = 1440, big = 1) => (c, lt) => { c.save(); for (let k = 0; k < n; k++) { const sp = 50 + (k * 37 % 70), r = (1.5 + (k % 5) * .9) * big, x = x0 + (((k * 263) + lt * wind * (.6 + (k % 4) * .2)) % (x1 - x0)), y = y0 + (((k * 151) + lt * sp) % (y1 - y0)); c.globalAlpha = .55 + (k % 3) * .15; c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x + Math.sin(lt * 2 + k) * 8, y, r, 0, 7); c.fill(); } c.restore(); };
  MG.windStreaks = (n = 18, al = .18) => (c, lt) => { c.save(); c.strokeStyle = `rgba(255,255,255,${al})`; c.lineCap = 'round'; for (let k = 0; k < n; k++) { const y = (k * 97) % 1440, x = ((k * 400 + lt * 900) % 3400) - 400, L = 120 + (k % 4) * 60; c.lineWidth = 2 + k % 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + L / 2, y - 10, x + L, y); c.stroke(); } c.restore(); };
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = n >> 8 & 255, b = n & 255; const m = v => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))); return '#' + ((1 << 24) + (m(r) << 16) + (m(g) << 8) + m(b)).toString(16).slice(1); }
  MG.shade = shade;
})(window);
