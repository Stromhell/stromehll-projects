// GTA 6 story recap (G6) kit: cast + props for the Stormi Explain Everything 2D video.
// Loaded after shared rig_v5.js, rig_leo.js, kit.js, anim.js and prime/production tw_kit.js + pr_kit.js (it reuses PR's
// figure extras: stubble, chain, scale). Every character is an ORIGINAL design: no game art, no likeness, no logos.
// Props draw in world space; each comment says where (x, y) sits (bottom centre on the ground, or centre).
// Prop scale s uses the same number you give a figure: a prop at s=1.9 next to a figure at s=1.9 is life size.
// Inside a figure's hold callback the units are rig units (0.8x smaller than world), so give hand props s = 1.25.
// hold keys: hold.near = the R arm (forward arm: shR/elR, 'point', 'present'), hold.far = the L arm (front of body).
// The hand frame has +y running out along the forearm through the palm; the palm centre is at about (0, 10).
(function (G) {
  const K = G.KIT, E = K.E, TW = G.TW, PR = G.PR, INK = TW.INK, txt = TW.txt, rr = TW.rr;
  const R6 = G.RIG6, RIG = G.RIG, sh = (h, f) => RIG.shadeHex(h, f), D = Math.PI / 180;
  const G6 = G.G6 = { INK };
  const L6 = () => R6.LOOKS;
  // base: rig preset; o: look overrides; pr: PR extras (stubble, chain, scale); g6: G6 extras (see figure wrapper below)
  const look = (base, o, pr, g6) => ({ look: Object.assign({}, L6()[base], { style: 'gumball', tie: null }, o, { pr: pr || {} }, g6 ? { g6 } : {}) });
  G6.look = look;

  // ---- shared painterly helpers
  const shadow = G6.shadow = PR.shadow;
  const cyl = (c, x0, x1, col, dk = -.32, lt = .28) => { const g = c.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, sh(col, dk)); g.addColorStop(.3, sh(col, lt)); g.addColorStop(.45, col); g.addColorStop(1, sh(col, dk * 1.2)); return g; };
  const vgr = (c, y0, y1, a, b) => { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
  const shine = (c, x0, y0, x1, y1, w = 2, a = .55) => { c.save(); c.globalAlpha = a; c.strokeStyle = '#fff'; c.lineCap = 'round'; c.lineWidth = w; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.restore(); };
  const font = (px, fam = 'Anton') => `${px}px ${fam}`;
  const fit = (c, s, maxW, px, fam = 'Anton') => { c.font = font(px, fam); const w = c.measureText(s).width; return w > maxW ? px * maxW / w : px; };
  const ink = (c, w = 2) => { c.strokeStyle = INK; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; };
  const stampPop = (t, t0, d = .3) => { const u = K.seg(t, t0, t0 + d); if (u <= 0) return 0; return u < 1 ? 2.3 - 1.3 * E.inn(u) : 1 + .16 * Math.exp(-(t - t0 - d) * 14) * Math.cos((t - t0 - d) * 30); };
  G6.RED = '#e0403a'; G6.GOLD = '#f2c14a'; G6.PINK = '#ff4fa3'; G6.TEAL = '#28c8c0';

  // ================= figure extras: look.g6 =================
  // ponytail, wig (blonde bob), hoops, curls, crop (colour band under a cropped top), tank, muscles, hawaii [cols],
  // glitter, tracksuit, bandage, belly (pregnant; bellyCol), stubble (colour, clipped to the face), bulk (sideways body stretch), polo, openCollar, badge ('chest'|'belt'), lanyard, pilot,
  // patch (jumpsuit number), watch, shades ('aviator'|'round'|'cat'), balaclava, durag, copCap, capBack, cap,
  // capBand, cheeks, headScale (bigger head on a small body, for Tommy), tash (moustache colour)
  const RX = 53, RY = 57;
  const geom = (o, s) => { const P = o.P || RIG.poseAngles(o, o.t ?? 0), fr = (h, k) => 72 * Math.cos(h * D) + 70 * Math.cos((h + k) * D), walking = o.pose === 'walk' || o.pose === 'run';
    const hipY = -12 - Math.max(fr(P.hipL, P.kneeL), fr(P.hipR, P.kneeR)) + (walking ? P.bob * 1.4 : P.bob * .5), lean = (P.lean + (o.lean || 0)) * D, nk = { x: Math.sin(lean) * 104, y: hipY - Math.cos(lean) * 104 };
    const t = o.t ?? 0, nod = o.talk ? Math.abs(Math.sin(t * 6 + (o.seed ?? 1))) * 3.5 : 0; return { P, hipY, lean, nk, hc: { x: nk.x + Math.sin(lean) * 16 + 3 + nod * .4, y: nk.y - 18 - RY * .86 + nod }, cx: nk.x * .55 + 6, walking, t }; };
  const torsoPath = (c, g, L) => { const { nk, hipY } = g, shW = 36, hem = hipY + (L.top === 'tunic' ? 30 : L.top === 'cardigan' ? 22 : 16), hw = 25 + (L.top === 'tunic' ? 14 : 11);
    c.beginPath(); c.moveTo(nk.x - 10, nk.y); c.quadraticCurveTo(nk.x - shW, nk.y + 1, nk.x - shW - 1, nk.y + 16); c.bezierCurveTo(nk.x * .5 - shW - 3, nk.y + 60, -hw - 1, hipY - 26, -hw, hem); c.quadraticCurveTo(0, hem + 6, hw, hem);
    c.bezierCurveTo(hw + 1, hipY - 26, nk.x * .5 + shW + 3, nk.y + 60, nk.x + shW + 1, nk.y + 16); c.quadraticCurveTo(nk.x + shW, nk.y + 1, nk.x + 10, nk.y); c.closePath(); return hem; };
  const headPath = (c, X, Y) => { c.beginPath(); c.moveTo(X - RX, Y - RY * .1); c.bezierCurveTo(X - RX, Y - RY * 1.05, X + RX, Y - RY * 1.05, X + RX, Y - RY * .1); c.bezierCurveTo(X + RX * 1.02, Y + RY * .55, X + RX * .55, Y + RY * 1.02, X + RX * .05, Y + RY * 1.0); c.bezierCurveTo(X - RX * .6, Y + RY * 1.0, X - RX * 1.02, Y + RY * .5, X - RX, Y - RY * .1); c.closePath(); };
  const capShape = (c, X, Y, col, dir) => { ink(c, 3); c.fillStyle = col; c.beginPath(); c.moveTo(X - RX * 1.06, Y - RY * .3); c.bezierCurveTo(X - RX * 1.05, Y - RY * 1.48, X + RX * 1.05, Y - RY * 1.48, X + RX * 1.04, Y - RY * .34); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = sh(col, .18); c.beginPath(); c.arc(X - RX * .05, Y - RY * 1.13, 6, 0, 7); c.fill(); c.stroke();
    c.fillStyle = sh(col, -.18); c.beginPath(); if (dir > 0) { c.moveTo(X + RX * .55, Y - RY * .4); c.quadraticCurveTo(X + RX * 1.55, Y - RY * .5, X + RX * 1.6, Y - RY * .26); c.lineTo(X + RX * .7, Y - RY * .26); }
    else { c.moveTo(X - RX * .55, Y - RY * .38); c.quadraticCurveTo(X - RX * 1.55, Y - RY * .48, X - RX * 1.62, Y - RY * .24); c.lineTo(X - RX * .75, Y - RY * .24); } c.closePath(); c.fill(); c.stroke(); };
  const shield = (c, x, y, k = 1) => { c.save(); c.translate(x, y); c.scale(k, k); c.fillStyle = '#f2c14a'; ink(c, 1.6); c.beginPath(); c.moveTo(0, -9); c.lineTo(7, -6); c.lineTo(6.5, 3); c.quadraticCurveTo(3, 8, 0, 10); c.quadraticCurveTo(-3, 8, -6.5, 3); c.lineTo(-7, -6); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#a87a1e'; c.beginPath(); for (let k2 = 0; k2 < 10; k2++) { const a = -Math.PI / 2 + k2 * Math.PI / 5, r = k2 % 2 ? 1.6 : 3.8; c.lineTo(Math.cos(a) * r, Math.sin(a) * r + 1); } c.closePath(); c.fill(); c.restore(); };

  const back = (c, g, L, X) => { const { hc } = g, x0 = hc.x, y0 = hc.y, sway = g.walking ? Math.sin(g.t * 5.4) * 6 : Math.sin(g.t * 1.6) * 2;
    if (X.ponytail) { const col = X.ponytail; ink(c, 3); c.fillStyle = sh(col, -.05); c.beginPath(); c.moveTo(x0 - RX * .45, y0 - RY * 1.02); c.bezierCurveTo(x0 - RX * 1.5, y0 - RY * 1.25, x0 - RX * 1.75 + sway, y0 - RY * .1, x0 - RX * 1.42 + sway * 1.4, y0 + RY * .95);
      c.bezierCurveTo(x0 - RX * 1.3 + sway, y0 + RY * .2, x0 - RX * 1.2, y0 - RY * .45, x0 - RX * .7, y0 - RY * .62); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = sh(col, .3); c.lineWidth = 2.2; c.globalAlpha = .6; c.beginPath(); c.moveTo(x0 - RX * 1.1, y0 - RY * .95); c.quadraticCurveTo(x0 - RX * 1.55 + sway, y0 - RY * .2, x0 - RX * 1.4 + sway * 1.3, y0 + RY * .6); c.stroke(); c.globalAlpha = 1; }
    if (X.wig) { const col = X.wig; ink(c, 3); c.fillStyle = sh(col, -.1); c.beginPath(); c.moveTo(x0 + RX * .2, y0 - RY * 1.05); c.bezierCurveTo(x0 - RX * 1.55, y0 - RY * 1.05, x0 - RX * 1.5, y0 + RY * .55, x0 - RX * 1.05, y0 + RY * .82); c.quadraticCurveTo(x0 - RX * .6, y0 + RY * .95, x0 - RX * .2, y0 + RY * .7); c.lineTo(x0 + RX * .1, y0); c.closePath(); c.fill(); c.stroke(); }
    if (X.durag) { const col = X.durag; ink(c, 3); c.fillStyle = sh(col, -.1); c.beginPath(); c.moveTo(x0 - RX * .9, y0 - RY * .2); c.bezierCurveTo(x0 - RX * 1.3, y0 + RY * .2, x0 - RX * 1.25 + sway, y0 + RY * .9, x0 - RX * 1.4 + sway, y0 + RY * 1.35); c.lineTo(x0 - RX * 1.05 + sway, y0 + RY * 1.32); c.bezierCurveTo(x0 - RX * .95, y0 + RY * .8, x0 - RX * .8, y0 + RY * .3, x0 - RX * .6, y0 - RY * .05); c.closePath(); c.fill(); c.stroke(); } };

  const front = (c, g, L, X, hx, hy) => { const { nk, hipY, cx, t } = g, Xh = hx, Y = hy + RY * .08, fx = Xh + RX * .3, fy = Y + RY * .06, skin = L.skin; c.save();
    // ---- torso layers (clipped to the torso)
    const clipT = (fn) => { c.save(); const hem = torsoPath(c, g, L); c.clip(); fn(hem); c.restore(); };
    if (X.hawaii) clipT(() => { const cols = X.hawaii; for (let k = 0; k < 18; k++) { const px = -44 + ((k * 37) % 92), py = nk.y + 6 + ((k * 53) % 118); c.fillStyle = '#3a8a4a'; c.beginPath(); c.ellipse(px + 6, py + 5, 7, 3, .6, 0, 7); c.fill();
      c.fillStyle = cols[k % cols.length]; for (let p = 0; p < 5; p++) { const a = p * 1.2566 + k; c.beginPath(); c.arc(px + Math.cos(a) * 4.5, py + Math.sin(a) * 4.5, 4, 0, 7); c.fill(); } c.fillStyle = '#ffe27a'; c.beginPath(); c.arc(px, py, 2.4, 0, 7); c.fill(); } });
    if (X.glitter) clipT(() => { for (let k = 0; k < 26; k++) { const px = -40 + ((k * 41) % 84), py = nk.y + 8 + ((k * 67) % 100), tw = .4 + .6 * Math.abs(Math.sin(t * 3 + k)); c.fillStyle = k % 3 ? `rgba(255,255,255,${tw})` : `rgba(255,220,120,${tw})`; c.beginPath(); c.moveTo(px, py - 4 * tw); c.lineTo(px + 1.2, py - 1.2); c.lineTo(px + 4 * tw, py); c.lineTo(px + 1.2, py + 1.2); c.lineTo(px, py + 4 * tw); c.lineTo(px - 1.2, py + 1.2); c.lineTo(px - 4 * tw, py); c.lineTo(px - 1.2, py - 1.2); c.closePath(); c.fill(); } });
    if (X.crop) clipT((hem) => { const top = hipY - (X.cropH || 30); c.fillStyle = X.crop; c.fillRect(-70, top, 140, hem - top + 10); c.fillStyle = 'rgba(0,0,0,.1)'; c.fillRect(-70, top, 140, 6); ink(c, 2.6); c.beginPath(); c.moveTo(-70, top); c.lineTo(70, top); c.stroke();
      if (X.crop === skin) { c.fillStyle = sh(skin, -.35); c.beginPath(); c.ellipse(cx + 8, hipY - 6, 1.6, 2.6, 0, 0, 7); c.fill(); } });
    if (X.tank) { c.fillStyle = skin; ink(c, 2.4); c.beginPath(); c.moveTo(nk.x - 16, nk.y - 1); c.quadraticCurveTo(nk.x + 4, nk.y + 30, nk.x + 24, nk.y - 1); c.closePath(); c.fill(); c.stroke();
      clipT(() => { c.fillStyle = skin; for (const sx of [nk.x - 38, nk.x + 38]) { c.beginPath(); c.ellipse(sx, nk.y + 22, 12, 22, 0, 0, 7); c.fill(); } ink(c, 2.2); for (const sx of [nk.x - 38, nk.x + 38]) { c.beginPath(); c.ellipse(sx, nk.y + 22, 12, 22, 0, 0, 7); c.stroke(); } }); }
    if (X.muscles) clipT(() => { c.strokeStyle = sh(L.topCol, -.35); c.lineWidth = 2.2; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - 18, nk.y + 40); c.quadraticCurveTo(cx - 4, nk.y + 50, cx + 6, nk.y + 38); c.moveTo(cx + 8, nk.y + 40); c.quadraticCurveTo(cx + 20, nk.y + 50, cx + 30, nk.y + 38); c.stroke(); });
    if (X.tracksuit) clipT((hem) => { c.strokeStyle = '#c8ccd4'; c.lineWidth = 2; c.beginPath(); c.moveTo(nk.x + 5, nk.y + 6); c.lineTo(cx + 5, hem); c.stroke(); c.strokeStyle = X.tracksuit; c.lineWidth = 3.2; c.beginPath(); c.moveTo(nk.x - 30, nk.y + 6); c.lineTo(nk.x - 33, hem); c.moveTo(nk.x + 34, nk.y + 10); c.lineTo(nk.x + 36, hem); c.stroke();
      c.fillStyle = '#d8dce4'; c.fillRect(nk.x + 2, nk.y + 2, 6, 7); });
    if (X.bandage) clipT(() => { const y0 = hipY - 50; c.fillStyle = '#f4f1e8'; c.fillRect(-70, y0, 140, 20); c.strokeStyle = 'rgba(120,110,90,.45)'; c.lineWidth = 1.4; for (let k = -70; k < 70; k += 9) { c.beginPath(); c.moveTo(k, y0); c.lineTo(k + 8, y0 + 20); c.stroke(); }
      ink(c, 2); c.beginPath(); c.moveTo(-70, y0); c.lineTo(70, y0); c.moveTo(-70, y0 + 20); c.lineTo(70, y0 + 20); c.stroke(); c.fillStyle = 'rgba(200,40,40,.85)'; c.beginPath(); c.ellipse(-16, y0 + 10, 8, 6, .3, 0, 7); c.fill(); c.fillStyle = 'rgba(200,40,40,.45)'; c.beginPath(); c.ellipse(-12, y0 + 11, 13, 8, .3, 0, 7); c.fill(); });
    if (X.belly) { const col = X.bellyCol || L.inner || L.topCol, bx = cx + 18, by = hipY - 22, brx = 30, bry = 34;
      const bg = c.createRadialGradient(bx + 8, by - 10, 2, bx, by, brx * 1.2); bg.addColorStop(0, sh(col, .15)); bg.addColorStop(1, sh(col, -.15)); c.fillStyle = bg; ink(c, 3); c.beginPath(); c.ellipse(bx, by, brx, bry, -.1, -1.75, 1.85); c.fill(); c.stroke();
      c.strokeStyle = sh(col, -.3); c.lineWidth = 1.6; c.beginPath(); c.arc(bx + 6, by + 4, 2.4, 0, 7); c.stroke(); }
    if (X.polo) { c.fillStyle = sh(L.topCol, .14); ink(c, 2); for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(nk.x + 4 + sd * 2, nk.y + 9); c.lineTo(nk.x + 4 + sd * 14, nk.y - 3); c.lineTo(nk.x + 4 + sd * 17, nk.y + 10); c.closePath(); c.fill(); c.stroke(); }
      c.strokeStyle = sh(L.topCol, -.3); c.beginPath(); c.moveTo(nk.x + 5, nk.y + 9); c.lineTo(nk.x + 6, nk.y + 30); c.stroke(); c.fillStyle = '#e8e8e8'; for (const k of [14, 24]) { c.beginPath(); c.arc(nk.x + 6, nk.y + k, 1.8, 0, 7); c.fill(); } }
    if (X.openCollar) { c.fillStyle = skin; ink(c, 1.8); c.beginPath(); c.moveTo(nk.x - 1, nk.y + 2); c.lineTo(nk.x + 11, nk.y + 2); c.lineTo(nk.x + 5, nk.y + 24); c.closePath(); c.fill(); c.stroke(); }
    if (X.pilot) { for (const [ex, ey, rot] of [[nk.x + 26, nk.y + 6, .25], [nk.x - 26, nk.y + 6, -.25]]) { c.save(); c.translate(ex, ey); c.rotate(rot); c.fillStyle = '#1e2a48'; ink(c, 1.8); rr(c, -11, -4, 22, 8, 2); c.fill(); c.stroke(); c.fillStyle = '#f2c14a'; c.fillRect(-2, -3, 2, 6); c.fillRect(2, -3, 2, 6); c.fillRect(6, -3, 2, 6); c.restore(); }
      c.fillStyle = '#f2c14a'; ink(c, 1.4); c.beginPath(); c.moveTo(cx + 14, nk.y + 30); c.lineTo(cx + 34, nk.y + 27); c.lineTo(cx + 24, nk.y + 33); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx + 34, nk.y + 27); c.lineTo(cx + 54, nk.y + 30); c.lineTo(cx + 44, nk.y + 33); c.closePath(); c.fill(); c.stroke(); }
    if (X.patch) { c.fillStyle = '#f4f1e8'; ink(c, 1.6); rr(c, cx + 16, nk.y + 30, 24, 12, 2); c.fill(); c.stroke(); txt(c, X.patch, cx + 28, nk.y + 36.5, 8.5, INK, 'center', 'Oswald'); }
    if (X.badge === 'chest') shield(c, cx + 24, nk.y + 34, 1);
    if (X.badge === 'belt') { c.fillStyle = '#2a1e16'; c.fillRect(cx + 14, hipY - 6, 22, 10); shield(c, cx + 25, hipY - 2, 1); }
    if (X.lanyard) { c.strokeStyle = X.lanyard; c.lineWidth = 3; c.beginPath(); c.moveTo(nk.x - 6, nk.y + 2); c.quadraticCurveTo(nk.x - 2, nk.y + 40, cx + 6, nk.y + 52); c.quadraticCurveTo(nk.x + 14, nk.y + 36, nk.x + 16, nk.y + 2); c.stroke(); c.save(); c.translate(cx + 6, nk.y + 64); c.rotate(-.05); c.fillStyle = '#fff'; ink(c, 1.8); rr(c, -9, -12, 18, 24, 2); c.fill(); c.stroke(); c.fillStyle = X.lanyard; c.fillRect(-8, -11, 16, 6); c.fillStyle = '#c8ccd4'; c.fillRect(-6, -1, 7, 7); c.restore(); }
    // ---- head layers
    if (X.stubble) { c.save(); headPath(c, Xh, Y); c.clip(); c.fillStyle = X.stubble; c.globalAlpha = .2; c.beginPath(); c.ellipse(Xh + RX * .22, Y + RY * .95, RX * .8, RY * .42, 0, 0, 7); c.fill(); c.globalAlpha = .5; for (let k = 0; k < 46; k++) { const a = k * 2.399, r2 = Math.sqrt(k / 46); c.fillRect(Xh + RX * .22 + Math.cos(a) * RX * .7 * r2, Y + RY * .8 + Math.abs(Math.sin(a)) * RY * .22 * r2 + 4, 1.6, 1.6); } c.restore(); }
    if (X.curls) { const col = X.curls; c.fillStyle = col; ink(c, 2.4); for (let k = 0; k <= 13; k++) { const a = (-38 - k * 13) * D, r = 1.1 + (k % 2) * .05; const px = Xh + Math.cos(a) * RX * r, py = Y + Math.sin(a) * RY * r - 4; c.beginPath(); c.arc(px, py, 9.5 + (k % 3), 0, 7); c.fill(); c.stroke(); }
      if (X.curlsLong) for (let k = 0; k < 5; k++) { const px = Xh - RX * (1.05 + (k % 2) * .12), py = Y + RY * (.1 + k * .38); c.fillStyle = col; ink(c, 2.4); c.beginPath(); c.arc(px, py, 10.5, 0, 7); c.fill(); c.stroke(); } }
    if (X.ponytail) { c.fillStyle = X.scrunchie || '#d83a5a'; ink(c, 2.2); c.beginPath(); c.ellipse(Xh - RX * .62, Y - RY * .98, 7, 10, -.7, 0, 7); c.fill(); c.stroke(); }
    if (X.hoops && L.hair !== 'long') { const ex = Xh - RX * .55 + 1, ey = Y + RY * .12 + 21; c.strokeStyle = INK; c.lineWidth = 5.2; c.beginPath(); c.arc(ex, ey, 9, 0, 7); c.stroke(); c.strokeStyle = X.hoops; c.lineWidth = 2.6; c.stroke(); }
    if (X.durag) { const col = X.durag; ink(c, 3); c.fillStyle = col; c.beginPath(); c.moveTo(Xh - RX * 1.07, Y - RY * .02); c.bezierCurveTo(Xh - RX * 1.1, Y - RY * 1.32, Xh + RX * 1.06, Y - RY * 1.36, Xh + RX * 1.02, Y - RY * .36); c.quadraticCurveTo(Xh + RX * .2, Y - RY * .5, Xh - RX * .5, Y - RY * .3); c.quadraticCurveTo(Xh - RX * .8, Y - RY * .2, Xh - RX * 1.07, Y - RY * .02); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = sh(col, .35); c.lineWidth = 2; c.beginPath(); c.moveTo(Xh - RX * .1, Y - RY * 1.1); c.quadraticCurveTo(Xh + RX * .3, Y - RY * .8, Xh + RX * .2, Y - RY * .45); c.stroke(); }
    if (X.balaclava) { const col = X.balaclava, k = 1.07; c.save(); c.translate(Xh, Y - 3); c.scale(k, k); c.translate(-Xh, -Y); c.beginPath(); c.moveTo(Xh - RX, Y - RY * .1); c.bezierCurveTo(Xh - RX, Y - RY * 1.15, Xh + RX, Y - RY * 1.15, Xh + RX, Y - RY * .1); c.bezierCurveTo(Xh + RX * 1.02, Y + RY * .55, Xh + RX * .55, Y + RY * 1.02, Xh + RX * .05, Y + RY * 1.0); c.bezierCurveTo(Xh - RX * .6, Y + RY * 1.0, Xh - RX * 1.02, Y + RY * .5, Xh - RX, Y - RY * .1); c.closePath(); c.restore();
      c.roundRect(fx - 24, fy - 18, 52, 26, 12); c.fillStyle = col; c.fill('evenodd'); ink(c, 3); c.stroke(); c.strokeStyle = sh(col, .2); c.lineWidth = 1.4; for (let k2 = 0; k2 < 6; k2++) { c.beginPath(); c.moveTo(Xh - RX * .8 + k2 * 16, Y - RY * .9); c.lineTo(Xh - RX * .85 + k2 * 16, Y - RY * .35); c.stroke(); } }
    if (X.shades) { const kind = X.shades; const eyes = [[fx - 9, .8], [fx + 14, 1]]; ink(c, 2.4);
      for (const [ex, k] of eyes) { const lg = c.createLinearGradient(0, fy - 14, 0, fy + 10); lg.addColorStop(0, kind === 'aviator' ? '#5a4a2a' : '#2a3040'); lg.addColorStop(1, kind === 'aviator' ? '#c89a4a' : '#101218'); c.fillStyle = lg; c.beginPath();
        if (kind === 'aviator') { c.moveTo(ex - 12 * k, fy - 12); c.lineTo(ex + 12 * k, fy - 12); c.quadraticCurveTo(ex + 13 * k, fy + 10, ex + 1, fy + 9); c.quadraticCurveTo(ex - 13 * k, fy + 8, ex - 12 * k, fy - 12); }
        else if (kind === 'cat') { c.moveTo(ex - 12 * k, fy - 10); c.lineTo(ex + 14 * k, fy - 13); c.quadraticCurveTo(ex + 12 * k, fy + 7, ex, fy + 6); c.quadraticCurveTo(ex - 12 * k, fy + 5, ex - 12 * k, fy - 10); }
        else c.ellipse(ex, fy - 2, 12 * k, 11, 0, 0, 7); c.closePath(); c.fill(); c.stroke(); c.save(); c.clip(); c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(ex - 10 * k, fy - 12); c.lineTo(ex - 2 * k, fy - 12); c.lineTo(ex - 10 * k, fy + 2); c.closePath(); c.fill(); c.restore(); }
      c.strokeStyle = kind === 'aviator' ? '#c8a24a' : INK; c.lineWidth = 2.4; c.beginPath(); c.moveTo(eyes[0][0] + 10, fy - 9); c.quadraticCurveTo(fx + 2.5, fy - 13, eyes[1][0] - 11, fy - 10); c.moveTo(eyes[0][0] - 10, fy - 8); c.lineTo(Xh - RX * .5, fy - 6); c.stroke(); }
    if (X.copCap) { const col = X.copCap; ink(c, 3); c.fillStyle = col; c.beginPath(); c.moveTo(Xh - RX * 1.0, Y - RY * .5); c.bezierCurveTo(Xh - RX * 1.2, Y - RY * 1.45, Xh + RX * 1.25, Y - RY * 1.5, Xh + RX * 1.08, Y - RY * .58); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = X.capBand || '#14141a'; c.beginPath(); c.moveTo(Xh - RX * 1.02, Y - RY * .5); c.lineTo(Xh + RX * 1.08, Y - RY * .58); c.lineTo(Xh + RX * 1.04, Y - RY * .8); c.lineTo(Xh - RX * .98, Y - RY * .74); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#111116'; c.beginPath(); c.moveTo(Xh + RX * .3, Y - RY * .56); c.quadraticCurveTo(Xh + RX * 1.3, Y - RY * .62, Xh + RX * 1.5, Y - RY * .36); c.quadraticCurveTo(Xh + RX * 1.0, Y - RY * .4, Xh + RX * .3, Y - RY * .5); c.closePath(); c.fill(); c.stroke(); shield(c, Xh + RX * .62, Y - RY * 1.0, .95); }
    if (X.cap) capShape(c, Xh, Y, X.cap, 1);
    if (X.capBack) capShape(c, Xh, Y, X.capBack, -1);
    if (X.cheeks) { c.fillStyle = 'rgba(240,110,110,.35)'; c.beginPath(); c.ellipse(fx - 16, fy + 15, 8, 5, 0, 0, 7); c.ellipse(fx + 30, fy + 13, 6, 4.5, 0, 0, 7); c.fill(); }
    c.restore(); };

  const watch = (c) => { c.save(); c.fillStyle = '#f2c14a'; ink(c, 1.6); rr(c, -11, -15, 22, 7, 2); c.fill(); c.stroke(); c.fillStyle = '#fff6d8'; c.beginPath(); c.arc(0, -11.5, 4.2, 0, 7); c.fill(); c.stroke(); c.restore(); };
  const F1 = R6.figure; // PR wrapper (pr extras) around the rig
  const drawOne = (ctx, o) => { const L = o.look, X = L.g6, s = (o.s ?? 1) * ((L.pr && L.pr.scale) || 1), F = o.facing ?? 1, g = geom(o, s);
    if (X.ponytail || X.wig || X.durag) { ctx.save(); ctx.translate(o.x, o.y); if (o.pose === 'lie') { ctx.rotate(-Math.PI / 2 * F); ctx.translate(0, 26 * s); } ctx.scale(F * s, s); if (o.squash) ctx.scale(1 - o.squash * .5, 1 + o.squash); back(ctx, g, L, X); ctx.restore(); }
    const o2 = Object.assign({}, o), uh = o.hat; o2.hat = (c, hx, hy, r) => { front(c, g, L, X, hx, hy); if (uh) uh(c, hx, hy, r); };
    if (X.tash) o2.tash = X.tash;
    if (X.watch) { const h = o.hold || {}; o2.hold = { near: h.near, far: (c, t) => { watch(c); if (h.far) h.far(c, t); } }; }
    return F1(ctx, o2); };
  R6.figure = (ctx, o) => { const L = o.look, X = L && L.g6; if (!X) return F1(ctx, o);
    if (!(X.headScale || X.bulk) || o.pose === 'lie') return drawOne(ctx, o);
    // big head on a small body: body pass clipped below the neck, head pass (scaled about the neck) clipped above it
    // bulk: the body pass is also stretched sideways (broad shoulders, thick arms) while the head keeps its shape
    const s = (o.s ?? 1) * ((L.pr && L.pr.scale) || 1), F = o.facing ?? 1, g = geom(o, s), hs = X.headScale || 1, bk = X.bulk || 1, s2 = s * hs, ny = o.y + g.nk.y * s;
    ctx.save(); ctx.beginPath(); ctx.rect(o.x - 1e4, ny - 2, 2e4, 2e4); ctx.clip(); ctx.translate(o.x, 0); ctx.scale(bk, 1); ctx.translate(-o.x, 0); drawOne(ctx, o); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(o.x - 1e4, ny - 2e4, 2e4, 2e4); ctx.clip(); drawOne(ctx, Object.assign({}, o, { x: o.x + F * g.nk.x * (s * bk - s2), y: o.y + g.nk.y * (s - s2), s: (o.s ?? 1) * hs, shadow: false, hold: null })); ctx.restore(); };

  // ================= cast =================
  const JS = { skin: '#e6b48c', hair: 'neat', hairCol: '#2a1e18', streak: '#4a3628', seed: 601 }, JSX = { scale: 1.05 };
  G6.JASON = () => look('banker', { ...JS, top: 'jacket', topCol: '#6e6c3e', inner: '#9a9ca2', legs: '#3a5274', cuff: '#52709a', shoes: '#6a4426', sole: '#2a1e16' }, JSX, { stubble: '#3a2a20' });
  G6.JASON_SHOT = () => look('banker', { ...JS, top: 'tee', topCol: '#9a9ca2', bareArms: true, legs: '#3a5274', cuff: '#52709a', shoes: '#6a4426', sole: '#2a1e16' }, JSX, { bandage: true, stubble: '#3a2a20' });
  G6.JASON_PRISON = () => look('banker', { ...JS, hair: 'long', beard: true, top: 'shirt', topCol: '#ee7a2a', sleeveCol: '#ee7a2a', legs: '#ee7a2a', cuff: '#d8661e', shoes: '#ecead8', sole: '#c8c4b4' }, { scale: 1.05 }, { patch: '0417' });
  const LS = { skin: '#c98e64', hair: 'neat', hairCol: '#1e1412', streak: '#3e2a22', lashes: true, seed: 602 }, LX = { ponytail: '#1e1412', hoops: '#f2c14a' };
  G6.LUCIA = () => look('woman', { ...LS, top: 'jacket', topCol: '#1e1e24', inner: '#f4f2ee', legs: '#2a3048', cuff: '#3a4462', shoes: '#1c1c1e', sole: '#e8e4dc' }, {}, { ...LX, crop: '#f4f2ee', cropH: 14 });
  G6.LUCIA_PRISON = () => look('woman', { ...LS, top: 'shirt', topCol: '#ee7a2a', sleeveCol: '#ee7a2a', legs: '#ee7a2a', cuff: '#d8661e', shoes: '#ecead8', sole: '#c8c4b4' }, {}, { ponytail: '#1e1412', scrunchie: '#ecead8', patch: '0388' });
  G6.LUCIA_GYM = () => look('woman', { ...LS, top: 'tank', topCol: '#e84a7a', bareArms: true, legs: '#22222c', cuff: '#22222c', shoes: '#f4f4f6', sole: '#e84a7a' }, {}, { ...LX, tank: true, crop: '#c98e64', cropH: 40, scrunchie: '#f4f4f6' });
  G6.LUCIA_WIG = () => look('woman', { ...LS, hair: 'soft', hairCol: '#ecc66a', streak: '#fbe6a8', top: 'jacket', topCol: '#1e1e24', inner: '#f4f2ee', legs: '#2a3048', cuff: '#3a4462', shoes: '#1c1c1e', sole: '#e8e4dc' }, {}, { wig: '#ecc66a', hoops: '#f2c14a', crop: '#f4f2ee', cropH: 14, shades: 'cat' });
  G6.TOMMY = () => look('teen', { skin: '#d8a27a', hair: 'soft', hairCol: '#4a2e1c', streak: '#6a4630', top: 'tee', topCol: '#5aa8e8', bareArms: true, print: '#f4d03a', legs: '#e8dcc0', cuff: '#d8ccb0', shoes: '#e8503a', sole: '#f4f4f4', seed: 603 }, { scale: .5 }, { headScale: 1.45, cheeks: true });
  G6.BRIAN = () => look('banker', { skin: '#e0a27a', hair: 'neat', hairCol: '#e8e4dc', streak: '#fbfaf6', beard: 'grey', top: 'tee', topCol: '#2a8a9a', bareArms: true, legs: '#c8b48a', cuff: '#b8a478', shoes: '#7a5434', sole: '#e8e0d0', seed: 604 }, { scale: 1.02 }, { hawaii: ['#ff7a8a', '#ffe27a', '#f4f4f4'], cap: '#2a3a5a', openCollar: true });
  G6.CAL = () => look('teen', { skin: '#f0c8a8', hair: 'messy', hairCol: '#3a2618', streak: '#5a3a24', glasses: true, top: 'hoodie', topCol: '#5a5e68', inner: '#d8d8d0', innerStripe: '#8a8e96', legs: '#3a3a44', shoes: '#d8d8d0', sole: '#f4f4f4', seed: 605 }, {}, { curls: '#3a2618', stubble: '#6a4a30' });
  G6.DONNY = () => look('banker', { skin: '#f0b890', hair: 'neat', hairCol: '#6a4a32', streak: '#8a6a4a', top: 'shirt', topCol: '#eef2f6', tie: '#1e2a48', belt: '#1a1a1a', legs: '#24304a', shoes: '#141414', sole: '#2a2420', seed: 606 }, { scale: 1.02 }, { shades: 'aviator', pilot: true });
  G6.CAT = () => look('woman', { skin: '#f4d0b4', hair: 'long', hairCol: '#c8502a', streak: '#e88050', top: 'cardigan', topCol: '#4a7a6a', inner: '#9a7ad0', legs: '#3a3a48', shoes: '#7a4a3a', sole: '#e8e0d0', seed: 607 }, {}, { curls: '#c8502a', curlsLong: true, belly: true });
  G6.MATTIA = () => look('banker', { skin: '#e2b48c', hair: 'neat', hairCol: '#141010', streak: '#4a4a52', top: 'shirt', topCol: '#7a2236', legs: '#24242a', shoes: '#3a2216', sole: '#1e1410', seed: 608 }, { chain: true }, { openCollar: true, watch: true });
  G6.PAROLE = () => look('banker', { skin: '#a87048', hair: 'neat', hairCol: '#1e1410', streak: '#3a2a20', top: 'tee', topCol: '#2a3a5a', bareArms: true, legs: '#b8a47e', cuff: '#a8946e', shoes: '#2a1e16', sole: '#1a1410', seed: 609 }, { scale: 1.1 }, { polo: true, badge: 'belt', tash: '#1e1410' });
  const COPS = [
    { skin: '#f0c4a0', hair: 'neat', hairCol: '#5a3a22', g: {} },
    { skin: '#8a5a3a', hair: 'neat', hairCol: '#141010', bun: true, lashes: true, base: 'woman', g: {} },
    { skin: '#d9a57c', hair: 'neat', hairCol: '#2a1e16', g: { shades: 'aviator', noCap: true }, topCol: '#8aa8d0' },
    { skin: '#e8b48c', hair: 'bald', hairCol: '#8a847e', g: { tash: '#8a847e' } },
  ];
  G6.COP = (k = 0) => { const p = COPS[k % 4], g = Object.assign({ badge: 'chest' }, p.g); if (!g.noCap) g.copCap = '#1c2436'; delete g.noCap;
    return look(p.base || 'banker', { skin: p.skin, hair: p.hair, hairCol: p.hairCol, streak: sh(p.hairCol, .25), bun: !!p.bun, lashes: !!p.lashes, top: 'shirt', topCol: p.topCol || '#2a3a5e', belt: '#141414', legs: '#1e2740', shoes: '#141414', sole: '#2a2420', seed: 610 + k }, { scale: k === 1 ? .97 : 1.02 }, g); };
  G6.SERGEANT = () => look('banker', { skin: '#c99068', hair: 'neat', hairCol: '#b8b4ae', streak: '#dcd8d2', top: 'shirt', topCol: '#2a3a5e', tie: '#141420', belt: '#141414', legs: '#1e2740', shoes: '#141414', sole: '#2a2420', seed: 615 }, { scale: 1.06 }, { badge: 'chest', copCap: '#1c2436', capBand: '#c8a23a', tash: '#cfcac2' });
  G6.MENDEZ = () => look('banker', { skin: '#c08860', hair: 'neat', hairCol: '#3e3834', streak: '#8a847e', top: 'jacket', topCol: '#d8c8a0', inner: '#a8c0dc', legs: '#5a5248', shoes: '#4a2e1c', sole: '#2a1e16', seed: 616 }, { scale: 1.03 }, { badge: 'belt', tash: '#3a3430', openCollar: true });
  G6.DREQUAN = () => look('teen', { skin: '#7a4a2e', hair: 'bald', hairCol: '#141010', top: 'tee', topCol: '#f2f2f2', bareArms: true, legs: '#2a4a7a', cuff: '#3a5a8a', shoes: '#d83a3a', sole: '#f4f4f4', seed: 617 }, { chain: true }, { durag: '#1e1e24' });
  G6.IKE = () => look('banker', { skin: '#5a3a26', hair: 'neat', hairCol: '#141010', streak: '#2a2220', top: 'jacket', topCol: '#f4f2ec', inner: '#1c1c20', legs: '#f4f2ec', cuff: '#e8e4dc', shoes: '#e8e4dc', sole: '#c8c4bc', seed: 618 }, { chain: true, scale: 1.04 }, { shades: 'round', stubble: '#141010' });
  G6.RAUL = () => look('banker', { skin: '#d8a07a', hair: 'neat', hairCol: '#9a9692', streak: '#c8c4be', top: 'sweater', topCol: '#1e1e22', sleeveCol: '#1e1e22', collarCol: '#2a2a30', legs: '#2a2a2e', shoes: '#141414', sole: '#2a2420', seed: 619 }, { scale: 1.03 }, { stubble: '#8a8682' });
  G6.VALENTINA = () => look('woman', { skin: '#e8b892', hair: 'long', hairCol: '#2a1a14', streak: '#4a3024', top: 'jacket', topCol: '#ece2cc', inner: '#1c1c20', legs: '#ece2cc', cuff: '#ece2cc', shoes: '#1c1c1c', sole: '#1c1c1c', seed: 620 }, {}, { shades: 'cat' });
  G6.KARIM = () => look('teen', { skin: '#b07a52', hair: 'neat', hairCol: '#141010', streak: '#3a3030', glasses: true, top: 'cardigan', topCol: '#8a6a4a', inner: '#e8e4d8', legs: '#3a3a44', shoes: '#5a3a24', sole: '#e8e0d0', seed: 621 }, {}, { stubble: '#141010' });
  G6.NICOLE = () => look('woman', { skin: '#f2cca8', hair: 'neat', bun: true, hairCol: '#6a4a2a', streak: '#8a6a4a', top: 'jacket', topCol: '#3a3a4c', inner: '#f4f0ea', legs: '#2a2a30', shoes: '#1c1c1c', sole: '#3a2c22', seed: 622 }, {}, {});
  G6.ABE = () => look('banker', { skin: '#cc8a58', hair: 'neat', hairCol: '#2a2420', streak: '#4a4038', top: 'jacket', topCol: '#e8dcc0', inner: '#f8f4ec', legs: '#e8dcc0', cuff: '#ddd0b0', shoes: '#7a4a2a', sole: '#3a2416', seed: 623 }, { chain: true }, { openCollar: true, watch: true });
  G6.KG = () => look('banker', { skin: '#b87a4e', hair: 'bald', hairCol: '#9a6038', top: 'tank', topCol: '#26262c', sleeveCol: '#b87a4e', legs: '#3a3a44', cuff: '#3a3a44', shoes: '#1c1c1c', sole: '#e8e4dc', seed: 624 }, { scale: 1.3 }, { tank: true, muscles: true, bulk: 1.32, stubble: '#2a1e16' });
  G6.NATE = () => look('teen', { skin: '#f0c4a0', hair: 'neat', hairCol: '#a87a4e', streak: '#c89a6a', top: 'tank', topCol: '#3a8ad0', bareArms: true, legs: '#2a2a30', cuff: '#2a2a30', shoes: '#f4f4f4', sole: '#3a8ad0', seed: 625 }, { scale: 1.12 }, { tank: true, muscles: true, capBack: '#d83a3a', bulk: 1.1 });
  G6.GALLO = () => look('banker', { skin: '#d0905e', hair: 'neat', hairCol: '#d4d2ce', streak: '#f0eeea', top: 'shirt', topCol: '#f6f2e8', legs: '#e2d6ba', cuff: '#d6caae', shoes: '#7a4a2a', sole: '#3a2416', seed: 626 }, { scale: 1.02 }, { openCollar: true, watch: true });
  G6.NIKO = () => look('banker', { skin: '#e8c0a0', hair: 'neat', hairCol: '#3a3430', streak: '#7a746e', top: 'jacket', topCol: '#24262e', inner: '#2e3038', legs: '#2a2c34', shoes: '#e8e8e8', sole: '#c8c8c8', seed: 627 }, { scale: 1.03 }, { tracksuit: '#e8e8e8', stubble: '#8a8480' });
  G6.PROSECUTOR = () => look('woman', { skin: '#e8b890', hair: 'soft', hairCol: '#3a2418', streak: '#5a3a28', top: 'jacket', topCol: '#1e2a4a', inner: '#f4f2ee', legs: '#1e2a4a', shoes: '#141414', sole: '#2a2420', seed: 628 }, {}, {});
  G6.COUNSELLOR = () => look('woman', { skin: '#f0c8a4', hair: 'long', hairCol: '#8a6a4a', streak: '#aa8a6a', glasses: true, top: 'cardigan', topCol: '#c8a060', inner: '#f0ebe0', legs: '#4a4a52', shoes: '#5a3a2a', sole: '#e8e0d0', seed: 629 }, {}, { lanyard: '#3a6ad0' });
  G6.DEALER = () => look('banker', { skin: '#f0c6a6', hair: 'neat', hairCol: '#8a7a6a', streak: '#aa9a8a', glasses: true, top: 'jacket', topCol: '#6a4428', sleeveCol: '#f4efe4', inner: '#f4efe4', tie: '#7a2a2a', legs: '#4a4038', shoes: '#3a2416', sole: '#2a1e16', seed: 630 }, {}, {});
  G6.VICKY = () => look('woman', { skin: '#c48a62', hair: 'long', hairCol: '#5a2a6a', streak: '#9a5aaa', top: 'tank', topCol: '#d84aa8', bareArms: true, legs: '#1c1c22', cuff: '#1c1c22', shoes: '#d84aa8', sole: '#f4f4f4', seed: 631 }, {}, { tank: true, glitter: true });
  G6.GUARD = () => look('banker', { skin: '#d9a57c', hair: 'neat', hairCol: '#2a1e16', streak: '#4a3628', top: 'shirt', topCol: '#7a8088', belt: '#141414', legs: '#2a2c32', shoes: '#141414', sole: '#2a2420', seed: 632 }, { scale: 1.04 }, { badge: 'chest', copCap: '#3a3e46' });
  const GUN = [['hoodie', '#1e1e22', '#2a2a30'], ['jacket', '#3a3e46', '#2a2a30'], ['jacket', '#4a5236', '#2e3226']];
  G6.GUNMAN = (k = 0) => { const [top, col, legs] = GUN[k % 3]; return look('banker', { skin: '#e0b090', hair: 'bald', hairCol: '#1e1e22', top, topCol: col, inner: col, innerStripe: sh(col, .2), legs, shoes: '#141414', sole: '#2a2420', seed: 640 + k }, { scale: 1.02 + k * .02 }, { balaclava: k === 1 ? '#2a2a30' : '#141418' }); };
  G6.CREW = (k = 0) => [
    () => look('banker', { skin: '#e9bc94', hair: 'messy', hairCol: '#3a2618', streak: '#5a3a24', top: 'tee', topCol: '#c8502a', bareArms: true, legs: '#3a4a66', shoes: '#33466e', sole: '#f2f0ea', seed: 650 }, {}, {}),
    () => look('woman', { skin: '#8a5a3a', hair: 'long', hairCol: '#141010', streak: '#3a2a20', top: 'cardigan', topCol: '#3a6a8a', inner: '#e8e2d6', legs: '#2a2a30', seed: 651 }, {}, {}),
    () => look('teen', { skin: '#f2d2b0', hair: 'neat', hairCol: '#c89a5a', streak: '#e8ba7a', top: 'hoodie', topCol: '#6a4a8a', legs: '#2a2e3a', seed: 652 }, {}, { cap: '#2a6a4a' }),
    () => look('woman', { skin: '#d9a57c', hair: 'neat', bun: true, hairCol: '#4a2a22', streak: '#6a4a36', top: 'jacket', topCol: '#7a6a4a', inner: '#f0e8d8', legs: '#4a4a52', seed: 653 }, {}, { hoops: '#e8e8f0' }),
  ][k % 4]();
  G6.CAST = ['JASON', 'JASON_SHOT', 'JASON_PRISON', 'LUCIA', 'LUCIA_PRISON', 'LUCIA_GYM', 'LUCIA_WIG', 'TOMMY', 'BRIAN', 'CAL', 'DONNY', 'CAT', 'MATTIA', 'PAROLE', 'SERGEANT', 'MENDEZ', 'DREQUAN', 'IKE', 'RAUL', 'VALENTINA', 'KARIM', 'NICOLE', 'ABE', 'KG', 'NATE', 'GALLO', 'NIKO', 'PROSECUTOR', 'COUNSELLOR', 'DEALER', 'VICKY', 'GUARD'];

  // ================= props =================
  // red X stamp, centre at 0,0 (local), size r
  const xStamp = (c, r, a = 1) => { c.save(); c.globalAlpha *= a; c.lineCap = 'round'; for (const [w, col] of [[r * .42, 'rgba(0,0,0,.3)'], [r * .34, '#d8282e']]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(-r, -r * .9); c.lineTo(r, r * .9); c.moveTo(r * .95, -r); c.lineTo(-r * .9, r); c.stroke(); } c.restore(); };
  const crackLines = (c, x0, y0, len, seed = 1) => { c.save(); c.lineCap = 'round'; for (const [w, col] of [[3, 'rgba(255,255,255,.8)'], [1.2, INK]]) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); let x = x0, y = y0; c.moveTo(x, y); for (let k = 1; k <= 6; k++) { x += len / 6 * (k % 2 ? 1 : .7); y += ((k * 37 + seed * 11) % 13 - 6) * len / 60; c.lineTo(x, y); } c.moveTo(x0 + len * .35, y0 + 2); c.lineTo(x0 + len * .42, y0 + len * .22); c.stroke(); } c.restore(); };

  // ---- savings jar; bottom centre. fill 0..1 (coins + notes). o: { label:'TOMMY', crack }  (s=1: 58 tall)
  G6.jar = (c, x, y, s = 1, fill = .5, o = {}) => { c.save(); shadow(c, x, y, 26 * s); c.translate(x, y); c.scale(s, s); const W = 21, H = 50;
    const body = () => { c.beginPath(); c.moveTo(-W + 4, 0); c.quadraticCurveTo(-W, 0, -W, -5); c.lineTo(-W, -H + 9); c.quadraticCurveTo(-W, -H + 2, -W + 7, -H + 1); c.lineTo(W - 7, -H + 1); c.quadraticCurveTo(W, -H + 2, W, -H + 9); c.lineTo(W, -5); c.quadraticCurveTo(W, 0, W - 4, 0); c.closePath(); };
    body(); c.fillStyle = 'rgba(205,232,240,.4)'; c.fill(); const f = K.clamp(fill), top = -3 - (H - 8) * f;
    c.save(); body(); c.clip(); if (f > 0) { c.fillStyle = '#8a6a2a'; c.fillRect(-W, top, W * 2, -top); for (let k = 0; k < 40; k++) { const px = -W + 3 + ((k * 29) % (W * 2 - 4)), py = -4 - ((k * 17) % 46); if (py < top) continue; if (k % 5 === 2) { c.fillStyle = '#7ab06a'; c.strokeStyle = '#3a6a3a'; c.lineWidth = .8; c.save(); c.translate(px, py); c.rotate(k); c.fillRect(-7, -3, 14, 6); c.strokeRect(-7, -3, 14, 6); c.restore(); } else { c.fillStyle = k % 3 ? '#e8b43a' : '#c8ccd0'; c.strokeStyle = 'rgba(60,40,10,.6)'; c.lineWidth = .8; c.beginPath(); c.ellipse(px, py, 4.5, 2.2, (k % 4) * .3, 0, 7); c.fill(); c.stroke(); } } } c.restore();
    if (o.label !== false) { c.save(); c.rotate(-.03); c.fillStyle = '#f6efdc'; ink(c, 1.3); rr(c, -W + 3, -32, W * 2 - 6, 15, 2); c.fill(); c.stroke(); const lb = o.label || 'TOMMY'; const px = fit(c, lb, W * 2 - 12, 13, 'Caveat'); txt(c, lb, 0, -24, px, '#2a5aa0', 'center', 'Caveat'); c.restore(); }
    body(); ink(c, 1.6); c.stroke(); shine(c, -W + 5, -H + 10, -W + 5, -8, 2.4, .55); shine(c, W - 5, -H + 14, W - 5, -36, 1.2, .35);
    c.fillStyle = cyl(c, -W - 2, W + 2, '#c8a44a', -.3, .3); ink(c, 1.4); rr(c, -W + 2, -H - 7, W * 2 - 4, 9, 2); c.fill(); c.stroke(); c.fillStyle = INK; c.fillRect(-7, -H - 6, 14, 2.4);
    if (o.crack) crackLines(c, -W + 2, -H + 16, W * 2 - 4, 3); c.restore(); };

  // ---- trust board: cork board, one pinned card per name; centre at x,y. xs = how many red X stamps (fractional: stamp k
  // slams on as xs passes k..k+0.4). t: seconds, for the board's knock when a stamp lands. (s=1: 480 wide)
  G6.trust = (c, x, y, s = 1, names = [], xs = 0, t = 0) => { const n = names.length, rowH = 70, W = 480, H = 96 + n * rowH + 10; let jolt = 0;
    for (let k = 0; k < n; k++) { const u = xs - k; if (u > .4 && u < .7) jolt = Math.max(jolt, (1 - (u - .4) / .3)); }
    c.save(); c.translate(x + Math.sin(t * 60) * 3 * jolt, y); c.rotate(Math.sin(t * 47) * .006 * jolt); c.scale(s, s); c.translate(0, -H / 2);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -W / 2 + 10, 12, W, H, 12); c.fill(); c.fillStyle = '#6a4426'; ink(c, 5); rr(c, -W / 2, 0, W, H, 12); c.fill(); c.stroke();
    const cg = c.createLinearGradient(0, 14, 0, H - 14); cg.addColorStop(0, '#c8955a'); cg.addColorStop(1, '#b07e48'); c.fillStyle = cg; rr(c, -W / 2 + 14, 14, W - 28, H - 28, 6); c.fill(); c.lineWidth = 2.5; c.stroke();
    c.fillStyle = 'rgba(80,50,20,.25)'; for (let k = 0; k < 120; k++) c.fillRect(-W / 2 + 18 + (k * 53) % (W - 36), 18 + (k * 31) % (H - 36), 2, 2);
    c.save(); c.translate(0, 52); c.rotate(-.02); c.fillStyle = '#f6efdc'; rr(c, -170, -24, 340, 48, 4); c.fill(); c.lineWidth = 2.5; c.stroke(); const hp = fit(c, 'WHO CAN THEY TRUST?', 310, 34); txt(c, 'WHO CAN THEY TRUST?', 0, 2, hp, INK, 'center', 'Anton'); c.restore();
    names.forEach((nm, k) => { const yy = 96 + k * rowH + rowH / 2, rot = ((k * 37) % 7 - 3) * .006; c.save(); c.translate(((k * 53) % 21) - 10, yy); c.rotate(rot); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-150, -24, 308, 54); c.fillStyle = '#fffdf6'; ink(c, 2.5); c.fillRect(-156, -28, 312, 54); c.strokeRect(-156, -28, 312, 54);
      const px = fit(c, String(nm).toUpperCase(), 270, 36); txt(c, String(nm).toUpperCase(), 0, 0, px, INK, 'center', 'Anton'); c.fillStyle = '#d83a3a'; c.beginPath(); c.arc(-140, -16, 6, 0, 7); c.fill(); ink(c, 1.5); c.stroke(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.arc(-142, -18, 2, 0, 7); c.fill();
      const u = xs - k; if (u > 0) { const sc = u < .4 ? 2.4 - 1.4 * E.inn(u / .4) : 1; c.save(); c.translate(100, 0); c.scale(sc, sc); xStamp(c, 26, Math.min(1, u * 4)); c.restore(); } c.restore(); });
    c.restore(); };

  // ---- 'WALK AWAY?' card with a big number stamp n that slams on at t0; centre at x,y. o: { crack, sub } (s=1: 560 wide)
  G6.walkAway = (c, x, y, s = 1, n = 1, t0 = 0, t = 99, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(-.07); const W = 560, H = 250;
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-W / 2 + 10, -H / 2 + 12, W, H); c.fillStyle = '#f6efdc'; ink(c, 5); c.fillRect(-W / 2, -H / 2, W, H); c.strokeRect(-W / 2, -H / 2, W, H);
    c.fillStyle = '#1e1a22'; c.fillRect(-W / 2, -H / 2, W, 22); c.fillStyle = '#f2c14a'; for (let k = 0; k < 14; k++) { c.beginPath(); c.moveTo(-W / 2 + k * 40, -H / 2 + 22); c.lineTo(-W / 2 + k * 40 + 20, -H / 2); c.lineTo(-W / 2 + k * 40 + 34, -H / 2); c.lineTo(-W / 2 + k * 40 + 14, -H / 2 + 22); c.fill(); }
    txt(c, 'WALK AWAY?', -W / 2 + 30, -10, fit(c, 'WALK AWAY?', 340, 76), INK, 'left', 'Anton'); txt(c, o.sub || 'CHANCE TO QUIT', -W / 2 + 38, 62, 30, '#6a5a48', 'left', 'Oswald');
    const sc = stampPop(t, t0); if (sc > 0) { c.save(); c.translate(W / 2 - 84, 24); c.rotate(.14); c.scale(sc, sc); c.globalAlpha = Math.min(1, K.seg(t, t0, t0 + .1) * 1.5 + .01);
      c.fillStyle = 'rgba(216,40,46,.12)'; c.beginPath(); c.arc(0, 0, 70, 0, 7); c.fill(); c.strokeStyle = '#d8282e'; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 66, 0, 7); c.stroke(); c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 54, 0, 7); c.stroke();
      txt(c, '#' + n, 0, 6, 70, '#d8282e', 'center', 'Anton'); c.globalCompositeOperation = 'destination-out'; c.fillStyle = 'rgba(0,0,0,.3)'; for (let k = 0; k < 40; k++) c.fillRect(((k * 97) % 130) - 65, ((k * 61) % 130) - 65, 3 + k % 3, 2); c.restore(); }
    if (o.crack) { crackLines(c, -W / 2 + 10, -30, W * .7, 5); crackLines(c, -40, 40, W * .5, 9); } c.restore(); };

  // ---- small bronze figurine (abstract, not any real artwork) on a marble block; bottom centre (s=1: 78 tall)
  G6.statue = (c, x, y, s = 1, o = {}) => { c.save(); shadow(c, x, y, 26 * s); c.translate(x, y); c.scale(s, s); if (o.glow) TW.glow(c, 0, -40, 80, '255,210,120', .4 * o.glow); ink(c, 1.6);
    c.fillStyle = cyl(c, -20, 20, '#e8e4dc', -.2, .1); rr(c, -20, -14, 40, 14, 2); c.fill(); c.stroke(); c.strokeStyle = 'rgba(120,120,130,.5)'; c.lineWidth = .8; c.beginPath(); c.moveTo(-14, -10); c.quadraticCurveTo(-4, -6, 6, -11); c.stroke();
    const bz = '#b87a3a', g = c.createLinearGradient(-14, 0, 14, 0); g.addColorStop(0, sh(bz, -.35)); g.addColorStop(.35, sh(bz, .35)); g.addColorStop(.6, bz); g.addColorStop(1, sh(bz, -.45)); c.fillStyle = g; ink(c, 1.6);
    c.beginPath(); c.moveTo(-5, -14); c.bezierCurveTo(-12, -24, -14, -34, -9, -42); c.bezierCurveTo(-16, -50, -10, -58, -5, -60); c.quadraticCurveTo(0, -62, 5, -60); c.bezierCurveTo(10, -58, 16, -50, 9, -42); c.bezierCurveTo(14, -34, 12, -24, 5, -14); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(0, -67, 5.5, 7, .1, 0, 7); c.fill(); c.stroke(); c.strokeStyle = sh(bz, -.4); c.lineWidth = 1; c.beginPath(); c.moveTo(-6, -46); c.quadraticCurveTo(0, -40, 6, -46); c.moveTo(-3, -28); c.lineTo(-1, -16); c.stroke();
    shine(c, -5, -56, -6, -46, 1.6, .7); shine(c, -7, -36, -4, -22, 1.4, .5); c.restore(); };

  // ---- portable hard drive; centre (s=1: 44 x 30). t blinks the LED
  G6.drive = (c, x, y, s = 1, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -20, -12, 44, 30, 5); c.fill(); c.fillStyle = vgr(c, -15, 15, '#4a4e58', '#24262c'); ink(c, 1.8); rr(c, -22, -15, 44, 30, 5); c.fill(); c.stroke();
    c.fillStyle = '#c8ccd4'; rr(c, -16, -9, 22, 13, 2); c.fill(); c.fillStyle = '#e84a3a'; c.fillRect(-16, -9, 22, 4); c.fillStyle = INK; c.fillRect(-14, -2, 14, 1.5); c.fillRect(-14, 1, 10, 1.5);
    c.fillStyle = Math.sin(t * 9) > 0 ? '#6cff8a' : '#2a6a3a'; c.beginPath(); c.arc(14, 8, 2.4, 0, 7); c.fill(); c.fillStyle = '#14141a'; c.fillRect(10, -14, 8, 3); shine(c, -19, -12, 18, -12, 1.2, .4); c.restore(); };

  // ---- ankle monitor: strap loop with the box; centre of the box (s=1: 60 wide). t blinks the LED
  G6.ankleTag = (c, x, y, s = 1, t = 0) => { c.save(); c.translate(x, y); c.scale(s, s); ink(c, 2);
    c.strokeStyle = INK; c.lineWidth = 11; c.beginPath(); c.ellipse(0, 4, 30, 12, 0, Math.PI, Math.PI * 2); c.stroke(); c.strokeStyle = '#2a2a30'; c.lineWidth = 7.5; c.stroke();
    c.fillStyle = vgr(c, -14, 14, '#3a3a42', '#16161c'); ink(c, 2); rr(c, -18, -12, 36, 26, 5); c.fill(); c.stroke(); c.fillStyle = '#4a4a54'; rr(c, -12, -7, 24, 4, 2); c.fill();
    const on = (t % 1.2) < .2; if (on) TW.glow(c, 9, 6, 16, '80,255,120', .7); c.fillStyle = on ? '#7aff9a' : '#2a6a3a'; c.beginPath(); c.arc(9, 6, 3, 0, 7); c.fill();
    c.strokeStyle = INK; c.lineWidth = 11; c.beginPath(); c.ellipse(0, 4, 30, 12, 0, .05, Math.PI - .05); c.stroke(); c.strokeStyle = '#34343c'; c.lineWidth = 7.5; c.stroke(); c.restore(); };

  // ---- game-style prompt card: round crosshair button + 'SHOOT?'; centre. t pulses the button ring (s=1: 380 wide)
  G6.shootPrompt = (c, x, y, s = 1, t = 0, label = 'SHOOT?') => { c.save(); c.translate(x, y); c.scale(s, s); const W = 380, H = 120, p = .5 + .5 * Math.sin(t * 6);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -W / 2 + 8, -H / 2 + 10, W, H, 22); c.fill(); c.fillStyle = 'rgba(14,14,22,.88)'; c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 4; rr(c, -W / 2, -H / 2, W, H, 22); c.fill(); c.stroke();
    const bx = -W / 2 + 68; c.strokeStyle = `rgba(255,80,70,${.6 * (1 - p)})`; c.lineWidth = 6; c.beginPath(); c.arc(bx, 0, 40 + p * 14, 0, 7); c.stroke();
    const g = c.createRadialGradient(bx - 10, -12, 4, bx, 0, 40); g.addColorStop(0, '#ff8a7a'); g.addColorStop(1, '#c82a2a'); c.fillStyle = g; c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.arc(bx, 0, 38, 0, 7); c.fill(); c.stroke();
    c.lineWidth = 4; c.beginPath(); c.arc(bx, 0, 16, 0, 7); c.moveTo(bx - 27, 0); c.lineTo(bx - 9, 0); c.moveTo(bx + 9, 0); c.lineTo(bx + 27, 0); c.moveTo(bx, -27); c.lineTo(bx, -9); c.moveTo(bx, 9); c.lineTo(bx, 27); c.stroke();
    const px = fit(c, label, W - 160, 72); txt(c, label, bx + 62, 4, px, '#fff', 'left', 'Anton'); c.restore(); };

  // ---- big choice button; centre. col: fill colour, pulse 0..1 (glow + swell) (s=1: 440 x 110)
  G6.choice = (c, x, y, s = 1, label = 'CHOOSE', col = '#2e9a4a', pulse = 0) => { c.save(); c.translate(x, y); const k = s * (1 + .06 * pulse); c.scale(k, k); const W = 440, H = 110;
    if (pulse > 0) TW.glow(c, 0, 0, 300, '255,240,200', .35 * pulse); c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -W / 2 + 6, -H / 2 + 12, W, H, H / 2); c.fill();
    c.fillStyle = sh(col, -.35); rr(c, -W / 2, -H / 2 + 8, W, H, H / 2); c.fill(); c.fillStyle = vgr(c, -H / 2, H / 2, sh(col, .25), col); ink(c, 5); rr(c, -W / 2, -H / 2, W, H, H / 2); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.28)'; rr(c, -W / 2 + 26, -H / 2 + 10, W - 52, 22, 11); c.fill(); const px = fit(c, label, W - 70, 60);
    c.save(); c.font = font(px); c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.strokeStyle = INK; c.lineWidth = 8; c.strokeText(label, 0, 5); c.fillStyle = '#fff'; c.fillText(label, 0, 5); c.restore(); c.restore(); };

  // ---- phone with a missed-calls badge; centre (s=1: 36 x 66). o: { rot, buzz: t }
  G6.phone = (c, x, y, s = 1, missed = 3, o = {}) => { c.save(); c.translate(x + (o.buzz != null ? Math.sin(o.buzz * 70) * 1.5 * s : 0), y); c.scale(s, s); c.rotate(o.rot || 0); const W = 36, H = 66;
    c.fillStyle = '#18181e'; ink(c, 2); rr(c, -W / 2, -H / 2, W, H, 6); c.fill(); c.stroke(); c.fillStyle = vgr(c, -H / 2, H / 2, '#2a4a8a', '#5a2a6a'); rr(c, -W / 2 + 3, -H / 2 + 5, W - 6, H - 10, 3); c.fill();
    txt(c, 'MISSED', 0, -12, 7, '#fff', 'center', 'Oswald'); txt(c, 'CALLS', 0, -4, 7, '#fff', 'center', 'Oswald'); c.fillStyle = '#e8463a'; for (let k = 0; k < Math.min(3, missed); k++) { rr(c, -12, 4 + k * 7, 24, 5, 2); c.fill(); }
    c.fillStyle = '#e8463a'; c.beginPath(); c.arc(W / 2 - 1, -H / 2 + 2, 9, 0, 7); c.fill(); ink(c, 1.8); c.stroke(); txt(c, String(missed), W / 2 - 1, -H / 2 + 3, 11, '#fff', 'center', 'Anton');
    c.save(); c.globalAlpha = .18; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-W / 2 + 3, -H / 2 + 5); c.lineTo(0, -H / 2 + 5); c.lineTo(-W / 2 + 3, 8); c.closePath(); c.fill(); c.restore(); c.restore(); };

  // ---- banded bundle(s) of cash; bottom centre. n stacked bundles (s=1: 46 wide)
  const bundle = (c, ox, oy, rot = 0) => { c.save(); c.translate(ox, oy); c.rotate(rot); ink(c, 1.3); for (let k = 0; k < 4; k++) { c.fillStyle = k % 2 ? '#8ac07a' : '#7ab06a'; c.fillRect(-23, -4 - k * 3.4, 46, 3.4); } c.strokeRect(-23, -17.6, 46, 17.6); c.fillStyle = '#9ad08a'; c.fillRect(-23, -20, 46, 3); c.strokeRect(-23, -20, 46, 3);
    c.fillStyle = '#f2e6c0'; c.fillRect(-6, -20.5, 12, 20.5); c.strokeRect(-6, -20.5, 12, 20.5); c.fillStyle = '#3a6a3a'; c.beginPath(); c.arc(-15, -18.5, 1.6, 0, 7); c.arc(15, -18.5, 1.6, 0, 7); c.fill(); c.restore(); };
  G6.cashBundle = (c, x, y, s = 1, n = 1) => { c.save(); shadow(c, x, y, 30 * s); c.translate(x, y); c.scale(s, s); for (let k = 0; k < n; k++) bundle(c, ((k * 7) % 5) - 2, -k * 20.5, ((k * 3) % 5 - 2) * .015); c.restore(); };

  // ---- black duffel bag; bottom centre. o: { cash } shows bundles in the open zip (s=1: 120 wide)
  G6.duffel = (c, x, y, s = 1, o = {}) => { c.save(); shadow(c, x, y, 66 * s); c.translate(x, y); c.scale(s, s); const col = o.col || '#26262c';
    if (o.cash) { bundle(c, -18, -46, -.12); bundle(c, 14, -48, .1); bundle(c, -2, -52, .02); }
    c.fillStyle = vgr(c, -56, 0, sh(col, .25), sh(col, -.25)); ink(c, 2.4); c.beginPath(); c.moveTo(-56, -6); c.quadraticCurveTo(-62, -30, -48, -48); c.quadraticCurveTo(0, -58, 48, -48); c.quadraticCurveTo(62, -30, 56, -6); c.quadraticCurveTo(54, 0, 46, 0); c.lineTo(-46, 0); c.quadraticCurveTo(-54, 0, -56, -6); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = sh(col, -.15); for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 52, -26, 8, 20, 0, 0, 7); c.fill(); c.stroke(); }
    c.strokeStyle = '#9a9ca4'; c.lineWidth = 2; c.setLineDash([3, 2]); c.beginPath(); c.moveTo(-44, -49); c.quadraticCurveTo(0, o.cash ? -44 : -57, 44, -49); c.stroke(); c.setLineDash([]);
    c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-22, -52); c.bezierCurveTo(-24, -82, 24, -82, 22, -52); c.stroke(); c.strokeStyle = sh(col, .1); c.lineWidth = 4; c.stroke();
    c.fillStyle = sh(col, .12); ink(c, 1.6); c.fillRect(-26, -30, 52, 16); c.strokeRect(-26, -30, 52, 16); shine(c, -40, -40, 30, -42, 2, .18); c.restore(); };

  // ---- grey old-person rubber mask; centre (s=1: 64 x 84)
  G6.mask = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot || 0); const g = c.createRadialGradient(-8, -14, 4, 0, 0, 50); g.addColorStop(0, '#c8c4c0'); g.addColorStop(1, '#8a8682'); c.fillStyle = g; ink(c, 2.4);
    c.beginPath(); c.moveTo(0, -42); c.bezierCurveTo(28, -42, 34, -16, 30, 4); c.bezierCurveTo(34, 18, 24, 34, 12, 40); c.quadraticCurveTo(0, 44, -12, 40); c.bezierCurveTo(-24, 34, -34, 18, -30, 4); c.bezierCurveTo(-34, -16, -28, -42, 0, -42); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#f2f0ec'; for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 30, -10, 6, 10, sx * .3, 0, 7); c.fill(); c.stroke(); }
    c.fillStyle = '#121214'; for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 11, -8, 7, 5, 0, 0, 7); c.fill(); }
    c.strokeStyle = '#5a5652'; c.lineWidth = 1.6; c.lineCap = 'round'; c.beginPath(); for (const yy of [-30, -25, -20]) { c.moveTo(-16, yy); c.quadraticCurveTo(0, yy - 3, 16, yy); } for (const sx of [-1, 1]) { c.moveTo(sx * 5, -16); c.quadraticCurveTo(sx * 11, -18, sx * 18, -15); c.moveTo(sx * 18, -4); c.quadraticCurveTo(sx * 22, 0, sx * 19, 5); c.moveTo(sx * 10, 6); c.quadraticCurveTo(sx * 16, 18, sx * 9, 28); } c.stroke();
    c.fillStyle = '#9a9692'; ink(c, 1.8); c.beginPath(); c.moveTo(-2, -6); c.quadraticCurveTo(5, 6, 7, 10); c.quadraticCurveTo(0, 14, -6, 10); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#121214'; c.beginPath(); c.moveTo(-11, 21); c.quadraticCurveTo(0, 25, 11, 21); c.quadraticCurveTo(0, 23, -11, 21); c.fill(); c.strokeStyle = '#121214'; c.lineWidth = 2.6; c.beginPath(); c.moveTo(-11, 21); c.quadraticCurveTo(0, 25, 11, 21); c.stroke();
    c.strokeStyle = '#f2f0ec'; c.lineWidth = 4; for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(sx * 4, -15); c.lineTo(sx * 17, -17); c.stroke(); } c.restore(); };

  // ---- street payphone on a post; bottom centre on the ground (s=1: 250 tall)
  G6.payphone = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 40 * s); c.translate(x, y); c.scale(s, s); ink(c, 2.4);
    c.fillStyle = cyl(c, -7, 7, '#6a7078'); c.fillRect(-7, -150, 14, 150); c.strokeRect(-7, -150, 14, 150); c.fillStyle = '#4a4e56'; c.fillRect(-16, -6, 32, 6); c.strokeRect(-16, -6, 32, 6);
    c.fillStyle = cyl(c, -46, 46, '#8a9098', -.3, .25); rr(c, -46, -250, 92, 112, 6); c.fill(); c.stroke(); c.fillStyle = '#2a5aa0'; rr(c, -46, -250, 92, 18, 5); c.fill(); c.stroke(); txt(c, 'PHONE', 0, -240, 13, '#fff', 'center', 'Anton');
    c.fillStyle = '#c8ccd2'; rr(c, -10, -222, 34, 64, 3); c.fill(); c.stroke(); c.fillStyle = '#3a3e46'; for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) { rr(c, -6 + q * 10, -216 + r * 14, 7, 9, 1.5); c.fill(); }
    c.fillStyle = '#16181c'; c.fillRect(-8, -150, 16, 4); c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(-34, -168); c.bezierCurveTo(-46, -150, -20, -150, -30, -136); c.bezierCurveTo(-40, -124, -16, -128, -18, -142); c.stroke();
    c.fillStyle = '#26282e'; ink(c, 2); c.beginPath(); c.moveTo(-40, -226); c.quadraticCurveTo(-30, -232, -26, -222); c.lineTo(-28, -172); c.quadraticCurveTo(-30, -162, -40, -168); c.quadraticCurveTo(-34, -196, -40, -226); c.closePath(); c.fill(); c.stroke(); shine(c, -40, -238, -40, -150, 2.4, .35); c.restore(); };

  // ---- desk monitor with a red padlock screen; bottom centre (s=1: 190 wide). t pulses the lock
  G6.monitorPadlock = (c, x, y, s = 1, t = 0, label = 'LOCKED') => { c.save(); shadow(c, x, y, 60 * s); c.translate(x, y); c.scale(s, s); ink(c, 2.4);
    c.fillStyle = '#2a2c32'; rr(c, -40, -8, 80, 8, 3); c.fill(); c.stroke(); c.fillRect(-8, -36, 16, 30); c.strokeRect(-8, -36, 16, 30);
    c.fillStyle = '#1c1e24'; rr(c, -95, -160, 190, 124, 8); c.fill(); c.stroke(); const sg = c.createLinearGradient(0, -152, 0, -44); sg.addColorStop(0, '#3a0c12'); sg.addColorStop(1, '#14060a'); c.fillStyle = sg; c.fillRect(-86, -152, 172, 108);
    const p = .5 + .5 * Math.sin(t * 5); TW.glow(c, 0, -100, 90, '255,60,60', .25 + .25 * p); c.save(); c.translate(0, -102); c.scale(1 + .04 * p, 1 + .04 * p); c.strokeStyle = '#ff5a5a'; c.lineWidth = 8; c.beginPath(); c.arc(0, -12, 16, Math.PI, 0); c.lineTo(16, -2); c.moveTo(-16, -2); c.lineTo(-16, -12); c.stroke();
    c.fillStyle = '#ff5a5a'; rr(c, -24, -4, 48, 36, 5); c.fill(); c.fillStyle = '#3a0c12'; c.beginPath(); c.arc(0, 10, 5, 0, 7); c.fill(); c.fillRect(-2, 10, 4, 12); c.restore(); txt(c, label, 0, -54, 16, '#ff8a8a', 'center', 'Anton');
    c.save(); c.globalAlpha = .12; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-86, -152); c.lineTo(-20, -152); c.lineTo(-86, -80); c.closePath(); c.fill(); c.restore(); c.restore(); };

  // ---- boarding pass; centre (s=1: 170 x 70). o: { from:'VCE', to:'???', name }
  G6.ticket = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot ?? -.05); const W = 170, H = 70;
    c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -W / 2 + 5, -H / 2 + 6, W, H, 6); c.fill(); c.fillStyle = '#fbf8f0'; ink(c, 2); rr(c, -W / 2, -H / 2, W, H, 6); c.fill(); c.stroke(); c.fillStyle = o.col || '#2a7ad0'; c.save(); rr(c, -W / 2, -H / 2, W, H, 6); c.clip(); c.fillRect(-W / 2, -H / 2, W, 16); c.restore();
    txt(c, 'BOARDING PASS', -W / 2 + 8, -H / 2 + 8.5, 9, '#fff', 'left', 'Anton'); txt(c, o.from || 'VCE', -W / 2 + 10, 4, 22, INK, 'left', 'Anton'); txt(c, '✈', -W / 2 + 62, 4, 15, o.col || '#2a7ad0', 'center', 'Oswald'); txt(c, o.to || 'ANY', -W / 2 + 74, 4, 22, INK, 'left', 'Anton'); txt(c, o.name || 'ONE WAY', -W / 2 + 10, 24, 9, '#6a6a72', 'left', 'Oswald');
    c.setLineDash([3, 3]); c.strokeStyle = '#9a9aa2'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(W / 2 - 46, -H / 2 + 18); c.lineTo(W / 2 - 46, H / 2 - 4); c.stroke(); c.setLineDash([]);
    c.fillStyle = INK; for (let k = 0; k < 16; k++) c.fillRect(W / 2 - 40 + k * 2.2, -10, (k * 7) % 3 ? 1.2 : 2, 30); c.restore(); };

  // ---- laptop with a progress bar; bottom centre on the desk. p 0..1 (s=1: 170 wide)
  G6.laptopProgress = (c, x, y, s = 1, p = 0, label = 'DOWNLOADING') => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s); ink(c, 2.2);
    c.fillStyle = '#2a2c34'; rr(c, -74, -112, 148, 104, 7); c.fill(); c.stroke(); c.fillStyle = vgr(c, -104, -16, '#0c1424', '#14223a'); c.fillRect(-66, -104, 132, 88);
    txt(c, label, 0, -82, 13, '#9ad0ff', 'center', 'Oswald'); c.strokeStyle = '#9ad0ff'; c.lineWidth = 2; rr(c, -54, -64, 108, 16, 4); c.stroke(); c.fillStyle = p >= 1 ? '#6cff8a' : '#3ab0ff'; rr(c, -51, -61, 102 * K.clamp(p), 10, 3); c.fill();
    txt(c, Math.round(K.clamp(p) * 100) + '%', 0, -34, 18, '#fff', 'center', 'Anton'); c.fillStyle = vgr(c, -10, 0, '#8a8e98', '#4a4e58'); ink(c, 2.2); c.beginPath(); c.moveTo(-80, -8); c.lineTo(80, -8); c.lineTo(88, 0); c.lineTo(-88, 0); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#3a3e48'; c.fillRect(-16, -6, 32, 3); c.save(); c.globalAlpha = .1; c.fillStyle = '#fff'; c.beginPath(); c.moveTo(-66, -104); c.lineTo(-10, -104); c.lineTo(-66, -40); c.closePath(); c.fill(); c.restore(); c.restore(); };

  // ---- TV on a low stand showing a WANTED news screen; bottom centre (s=1: 260 wide). t scrolls the ticker
  G6.wantedTV = (c, x, y, s = 1, t = 0, o = {}) => { c.save(); shadow(c, x, y, 90 * s); c.translate(x, y); c.scale(s, s); ink(c, 2.6);
    c.fillStyle = '#5a3e2a'; rr(c, -110, -26, 220, 26, 4); c.fill(); c.stroke(); c.fillStyle = '#2a2c32'; c.fillRect(-20, -38, 40, 12); c.strokeRect(-20, -38, 40, 12);
    c.fillStyle = '#18191e'; rr(c, -130, -200, 260, 164, 10); c.fill(); c.stroke(); const X0 = -120, Y0 = -192, W = 240, H = 148; c.save(); c.beginPath(); c.rect(X0, Y0, W, H); c.clip();
    c.fillStyle = vgr(c, Y0, Y0 + H, '#1a2a4a', '#0c1428'); c.fillRect(X0, Y0, W, H); c.fillStyle = '#d8282e'; c.fillRect(X0, Y0 + 8, 92, 20); txt(c, 'BREAKING', X0 + 46, Y0 + 19, 14, '#fff', 'center', 'Anton');
    txt(c, o.head || 'WANTED', X0 + 104, Y0 + 19, 17, '#f2c14a', 'left', 'Anton');
    for (const [k, col] of [[0, '#c98e64'], [1, '#e6b48c']]) { const fx = X0 + 52 + k * 92, fy = Y0 + 80; c.fillStyle = '#d8dce4'; c.fillRect(fx - 38, fy - 40, 76, 76); c.strokeStyle = INK; c.lineWidth = 2; c.strokeRect(fx - 38, fy - 40, 76, 76);
      c.fillStyle = '#3a3e4a'; c.beginPath(); c.arc(fx, fy - 8, 16, 0, 7); c.fill(); c.beginPath(); c.ellipse(fx, fy + 34, 30, 24, 0, Math.PI, 0); c.fill(); txt(c, '?', fx, fy - 7, 22, '#d8dce4', 'center', 'Anton'); }
    c.fillStyle = '#f2c14a'; c.fillRect(X0, Y0 + H - 22, W, 22); c.fillStyle = '#d8282e'; c.fillRect(X0, Y0 + H - 22, 38, 22); txt(c, 'LIVE', X0 + 19, Y0 + H - 10.5, 11, '#fff', 'center', 'Anton');
    const tk = o.ticker || 'COUPLE SOUGHT AFTER STRING OF ROBBERIES  •  POLICE ASK PUBLIC FOR TIPS  •  '; c.font = font(12, 'Oswald'); const tw = c.measureText(tk).width; const off = (t * 40) % tw; c.save(); c.beginPath(); c.rect(X0 + 40, Y0 + H - 22, W - 40, 22); c.clip(); for (const k of [0, 1]) txt(c, tk, X0 + 44 - off + k * tw, Y0 + H - 10.5, 12, INK, 'left', 'Oswald'); c.restore();
    c.globalAlpha = .08; c.fillStyle = '#fff'; for (let k = 0; k < H; k += 4) c.fillRect(X0, Y0 + k, W, 1.5); c.restore(); c.restore(); };

  // ---- pardon document with a seal; centre (s=1: 170 x 220). o: { sign 0..1 draws the signature, title }
  G6.pardonDoc = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot ?? .04); const W = 170, H = 220;
    c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-W / 2 + 7, -H / 2 + 9, W, H); c.fillStyle = vgr(c, -H / 2, H / 2, '#fbf6e6', '#efe4c8'); ink(c, 2.4); c.fillRect(-W / 2, -H / 2, W, H); c.strokeRect(-W / 2, -H / 2, W, H); c.strokeStyle = '#c8a24a'; c.lineWidth = 2; c.strokeRect(-W / 2 + 8, -H / 2 + 8, W - 16, H - 16);
    txt(c, 'OFFICIAL', 0, -H / 2 + 28, 12, '#6a5a48', 'center', 'Oswald'); txt(c, o.title || 'PARDON', 0, -H / 2 + 54, 36, INK, 'center', 'Anton');
    c.fillStyle = '#c8bca0'; for (let k = 0; k < 7; k++) c.fillRect(-W / 2 + 22, -H / 2 + 84 + k * 11, W - 44 - (k % 3) * 18, 3);
    c.strokeStyle = '#6a5a48'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-W / 2 + 20, H / 2 - 36); c.lineTo(20, H / 2 - 36); c.stroke();
    const sg = K.clamp(o.sign ?? 1); if (sg > 0) { c.save(); c.beginPath(); c.rect(-W / 2 + 18, H / 2 - 70, 100 * sg, 40); c.clip(); c.strokeStyle = '#1a2a6a'; c.lineWidth = 2; c.beginPath(); c.moveTo(-W / 2 + 22, H / 2 - 42); for (let k = 0; k < 9; k++) c.quadraticCurveTo(-W / 2 + 28 + k * 10, H / 2 - 64 + (k % 2) * 30, -W / 2 + 32 + k * 10, H / 2 - 42 - (k % 3) * 4); c.stroke(); c.restore(); }
    const sx = W / 2 - 38, sy = H / 2 - 42; c.fillStyle = '#b8282e'; ink(c, 1.8); c.beginPath(); for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8, r = k % 2 ? 20 : 23; c.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#e8686a'; c.lineWidth = 1.5; c.beginPath(); c.arc(sx, sy, 13, 0, 7); c.stroke(); txt(c, '★', sx, sy + 1, 14, '#ffd0c8', 'center', 'Oswald'); c.restore(); };

  // ---- confession scroll: top roller at x,y, paper unrolls downward. unroll 0..1 (s=1: 230 wide, 300 long open)
  G6.confessionScroll = (c, x, y, s = 1, unroll = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); const W = 230, L = 300 * E.out(K.clamp(unroll)), lines = o.lines || ['I, the undersigned,', 'confess to the', 'following crimes:', '— the heists', '— the bank job', '— everything else', 'Signed ........'];
    if (L > 2) { c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-W / 2 + 8, 10, W, L); c.fillStyle = vgr(c, 0, L, '#f8f0d8', '#ecdcb4'); ink(c, 2.4); c.fillRect(-W / 2, 0, W, L); c.strokeRect(-W / 2, 0, W, L);
      c.save(); c.beginPath(); c.rect(-W / 2, 0, W, L); c.clip(); txt(c, o.title || 'CONFESSION', 0, 34, 30, '#5a2a1a', 'center', 'Anton'); lines.forEach((ln, i) => txt(c, ln, -W / 2 + 22, 76 + i * 30, 24, '#3a2a1a', 'left', 'Caveat')); c.restore(); }
    for (const ry of [0, L]) { const g = c.createLinearGradient(0, ry - 12, 0, ry + 12); g.addColorStop(0, '#cfc0a0'); g.addColorStop(.45, '#fffaf0'); g.addColorStop(1, '#a8987a'); c.fillStyle = g; ink(c, 2.4); rr(c, -W / 2 - 14, ry - 12, W + 28, 24, 12); c.fill(); c.stroke();
      c.fillStyle = '#7a4a2a'; for (const sx of [-1, 1]) { rr(c, sx * (W / 2 + 14) - (sx > 0 ? 0 : 12), ry - 8, 12, 16, 4); c.fill(); c.stroke(); } if (L <= 2) break; }
    c.restore(); };

  // ---- stack of taped brick packages; bottom centre. n bricks (s=1: brick 50 x 22)
  const brick = (c, bx, by, rot, k) => { c.save(); c.translate(bx, by); c.rotate(rot); c.fillStyle = ['#b89a6a', '#a88a5a', '#c4a676'][k % 3]; ink(c, 1.6); rr(c, -25, -22, 50, 22, 4); c.fill(); c.stroke();
    c.fillStyle = 'rgba(240,230,200,.75)'; c.fillRect(-25, -14, 50, 5); c.fillRect(-4, -22, 7, 22); c.strokeStyle = 'rgba(80,60,30,.5)'; c.lineWidth = 1; c.strokeRect(-25, -14, 50, 5); c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-22, -20, 18, 3); c.restore(); };
  G6.packages = (c, x, y, s = 1, n = 6) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s); let k = 0;
    for (let row = 0; k < n; row++) { const inRow = Math.max(1, 3 - row); for (let q = 0; q < inRow && k < n; q++, k++) brick(c, (q - (inRow - 1) / 2) * 52 + ((k * 7) % 5 - 2), -row * 22, ((k * 13) % 5 - 2) * .02, k); } c.restore(); };

  // ---- cargo net bundle: packages in a rope net gathered to a ring; bottom centre (ring at y - 150*s). o: { n }
  G6.net = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); G6.packages(c, 0, 0, 1, o.n ?? 6);
    c.strokeStyle = '#d8c89a'; c.lineWidth = 2.4; c.lineCap = 'round'; c.beginPath(); const top = -150; for (let k = -4; k <= 4; k++) { c.moveTo(k * 22, 2); c.quadraticCurveTo(k * 24, -50, 0, top + 14); }
    for (let r = 0; r < 5; r++) { const yy = -8 - r * 18, w = 90 - r * 10; c.moveTo(-w, yy); c.quadraticCurveTo(0, yy + 6, w, yy); } c.stroke(); c.strokeStyle = 'rgba(60,40,20,.55)'; c.lineWidth = 1; c.stroke();
    c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.arc(0, top, 12, 0, 7); c.stroke(); c.strokeStyle = '#9aa0a8'; c.lineWidth = 3.5; c.stroke(); c.restore(); };

  // ================= vehicles (face +x; o.facing -1 flips) =================
  const wheel = (c, wx, wy, r, ang = 0) => { c.save(); c.translate(wx, wy); c.fillStyle = '#16161a'; ink(c, 2.4); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#2a2a30'; c.beginPath(); c.arc(0, 0, r * .86, 0, 7); c.fill();
    c.fillStyle = cyl(c, -r * .6, r * .6, '#c8ccd4', -.3, .2); c.beginPath(); c.arc(0, 0, r * .56, 0, 7); c.fill(); c.lineWidth = 1.6; c.stroke(); c.rotate(ang); c.strokeStyle = '#6a6e78'; c.lineWidth = r * .12; for (let k = 0; k < 5; k++) { const a = k * 1.2566; c.beginPath(); c.moveTo(Math.cos(a) * r * .14, Math.sin(a) * r * .14); c.lineTo(Math.cos(a) * r * .5, Math.sin(a) * r * .5); c.stroke(); }
    c.fillStyle = '#4a4e58'; c.beginPath(); c.arc(0, 0, r * .16, 0, 7); c.fill(); c.restore(); };
  const flash = (c, lx, ly, col, a) => { if (a <= 0) return; TW.glow(c, lx, ly, 60, col, .8 * a); };
  const glass = (c, y0, y1) => vgr(c, y0, y1, '#b8e2f4', '#4a7a9a');
  const veh = (c, x, y, s, o, fn) => { c.save(); c.translate(x, y); c.scale(s * (o.facing ?? 1), s); fn(); c.restore(); };

  // ---- generic saloon; bottom centre on the ground (s=1: 560 long, 192 tall). o: { wheelsTurning, facing, police, lights }
  G6.car = (c, x, y, s = 1, col = '#c8382e', t = 0, o = {}) => { shadow(c, x, y - 2 * s, 300 * s, .4); veh(c, x, y, s, o, () => { const ang = o.wheelsTurning ? t * 9 : 0;
    const body = () => { c.beginPath(); c.moveTo(-266, -34); c.quadraticCurveTo(-282, -38, -282, -60); c.lineTo(-278, -100); c.quadraticCurveTo(-272, -116, -246, -118); c.lineTo(-150, -122); c.lineTo(-112, -184); c.quadraticCurveTo(-100, -192, -76, -192); c.lineTo(52, -192); c.quadraticCurveTo(80, -192, 96, -180); c.lineTo(150, -124); c.lineTo(250, -114); c.quadraticCurveTo(284, -108, 284, -80); c.lineTo(282, -50); c.quadraticCurveTo(280, -34, 262, -34); c.closePath(); };
    body(); c.fillStyle = vgr(c, -192, -34, sh(col, .22), sh(col, -.18)); c.fill();
    c.save(); body(); c.clip(); if (o.police) { c.fillStyle = '#16161c'; c.fillRect(-300, -96, 600, 70); c.fillStyle = '#f4f4f4'; c.fillRect(-300, -124, 600, 30); }
    c.fillStyle = 'rgba(0,0,0,.14)'; c.fillRect(-300, -60, 600, 30); c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-300, -112, 600, 7); c.restore(); body(); ink(c, 3.2); c.stroke();
    c.fillStyle = glass(c, -180, -124); ink(c, 2.4); c.beginPath(); c.moveTo(-140, -126); c.lineTo(-106, -178); c.lineTo(-14, -178); c.lineTo(-14, -126); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-2, -126); c.lineTo(-2, -178); c.lineTo(58, -178); c.quadraticCurveTo(76, -178, 88, -168); c.lineTo(132, -126); c.closePath(); c.fill(); c.stroke();
    shine(c, -100, -170, -120, -136, 4, .4); shine(c, 60, -170, 100, -136, 4, .35);
    c.strokeStyle = sh(o.police ? '#16161c' : col, -.4); c.lineWidth = 2.2; c.beginPath(); c.moveTo(-8, -124); c.lineTo(-8, -40); c.moveTo(-150, -118); c.lineTo(-152, -44); c.moveTo(140, -120); c.lineTo(142, -44); c.stroke(); c.fillStyle = sh(col, -.45); c.fillRect(-56, -106, 22, 5); c.fillRect(88, -104, 22, 5);
    if (o.police) { const pp = fit(c, 'POLICE', 200, 44); txt(c, 'POLICE', 0, -64, pp, '#f4f4f4', 'center', 'Anton'); }
    c.fillStyle = '#fff6c8'; ink(c, 2); rr(c, 262, -98, 20, 14, 4); c.fill(); c.stroke(); c.fillStyle = '#e8463a'; rr(c, -282, -98, 14, 16, 3); c.fill(); c.stroke();
    c.fillStyle = '#3a3a42'; rr(c, 246, -54, 42, 14, 5); c.fill(); c.stroke(); rr(c, -288, -54, 40, 14, 5); c.fill(); c.stroke();
    c.fillStyle = '#121216'; for (const wx of [-172, 176]) { c.beginPath(); c.arc(wx, -34, 50, Math.PI, 0); c.fill(); } wheel(c, -172, -38, 38, ang); wheel(c, 176, -38, 38, ang);
    if (o.police || o.lights) { const ph = Math.floor(t * 6) % 2; c.fillStyle = '#2a2a30'; ink(c, 2); rr(c, -60, -204, 120, 14, 4); c.fill(); c.stroke(); c.fillStyle = ph ? '#ff3a3a' : '#7a1a1a'; rr(c, -56, -210, 52, 12, 4); c.fill(); c.stroke(); c.fillStyle = ph ? '#1a2a7a' : '#3a7aff'; rr(c, 4, -210, 52, 12, 4); c.fill(); c.stroke(); flash(c, -30, -206, '255,60,60', ph); flash(c, 30, -206, '60,120,255', 1 - ph); } }); };
  // ---- police car (two-tone, light bar flashing red/blue); bottom centre (s=1: 560 long)
  G6.policeCar = (c, x, y, s = 1, t = 0, o = {}) => G6.car(c, x, y, s, '#f4f4f4', t, Object.assign({ police: true }, o));

  // ---- pickup truck; bottom centre (s=1: 600 long, 222 tall). o: { wheelsTurning, facing, load: fn(c) drawn in the bed }
  G6.pickup = (c, x, y, s = 1, col = '#3a6a8a', t = 0, o = {}) => { shadow(c, x, y - 2 * s, 320 * s, .4); veh(c, x, y, s, o, () => { const ang = o.wheelsTurning ? t * 8 : 0;
    if (o.load) { c.save(); c.translate(-150, -120); o.load(c); c.restore(); }
    const body = () => { c.beginPath(); c.moveTo(-288, -40); c.lineTo(-292, -124); c.lineTo(-28, -124); c.lineTo(-20, -214); c.quadraticCurveTo(-16, -222, 0, -222); c.lineTo(96, -222); c.quadraticCurveTo(112, -222, 120, -210); c.lineTo(168, -136); c.lineTo(276, -126); c.quadraticCurveTo(300, -122, 300, -96); c.lineTo(298, -52); c.quadraticCurveTo(296, -40, 280, -40); c.closePath(); };
    body(); c.fillStyle = vgr(c, -222, -40, sh(col, .22), sh(col, -.2)); c.fill(); c.save(); body(); c.clip(); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(-300, -68, 620, 30); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(-300, -118, 620, 6); c.restore(); body(); ink(c, 3.2); c.stroke();
    c.strokeStyle = sh(col, -.4); c.lineWidth = 2.4; c.beginPath(); c.moveTo(-34, -122); c.lineTo(-34, -44); c.moveTo(-290, -114); c.lineTo(-34, -114); c.stroke();
    c.fillStyle = glass(c, -210, -134); ink(c, 2.4); c.beginPath(); c.moveTo(-8, -138); c.lineTo(-4, -208); c.lineTo(90, -208); c.quadraticCurveTo(102, -208, 108, -200); c.lineTo(150, -138); c.closePath(); c.fill(); c.stroke(); c.beginPath(); c.moveTo(62, -138); c.lineTo(62, -208); c.stroke(); shine(c, 80, -200, 110, -150, 4, .35);
    c.fillStyle = '#fff6c8'; ink(c, 2); rr(c, 278, -110, 20, 16, 4); c.fill(); c.stroke(); c.fillStyle = '#e8463a'; rr(c, -294, -112, 12, 18, 3); c.fill(); c.stroke(); c.fillStyle = '#3a3a42'; rr(c, 262, -60, 44, 16, 5); c.fill(); c.stroke(); rr(c, -298, -60, 30, 16, 5); c.fill(); c.stroke();
    c.fillStyle = '#121216'; for (const wx of [-190, 196]) { c.beginPath(); c.arc(wx, -40, 56, Math.PI, 0); c.fill(); } wheel(c, -190, -44, 44, ang); wheel(c, 196, -44, 44, ang); }); };

  // ---- motorbike; bottom centre (s=1: 300 long, 170 tall). o: { wheelsTurning, facing }
  G6.motorbike = (c, x, y, s = 1, col = '#d8382e', t = 0, o = {}) => { shadow(c, x, y - 2 * s, 170 * s, .4); veh(c, x, y, s, o, () => { const ang = o.wheelsTurning ? t * 10 : 0;
    wheel(c, -108, -40, 40, ang); wheel(c, 112, -40, 40, ang); ink(c, 3); c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.moveTo(-108, -40); c.lineTo(-40, -90); c.lineTo(30, -84); c.lineTo(84, -130); c.moveTo(112, -40); c.lineTo(84, -130); c.stroke(); c.strokeStyle = '#7a7e88'; c.lineWidth = 5; c.stroke();
    c.fillStyle = '#3a3a42'; ink(c, 2.4); rr(c, -36, -84, 60, 34, 8); c.fill(); c.stroke(); c.strokeStyle = '#c8ccd4'; c.lineWidth = 7; c.beginPath(); c.moveTo(-20, -52); c.quadraticCurveTo(-60, -40, -130, -54); c.stroke(); c.strokeStyle = INK; c.lineWidth = 1.6; c.stroke();
    c.fillStyle = vgr(c, -130, -86, sh(col, .25), sh(col, -.2)); ink(c, 2.6); c.beginPath(); c.moveTo(-14, -94); c.quadraticCurveTo(10, -126, 56, -118); c.quadraticCurveTo(72, -110, 66, -92); c.lineTo(-10, -86); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#1c1c20'; c.beginPath(); c.moveTo(-96, -96); c.quadraticCurveTo(-50, -108, -12, -96); c.lineTo(-14, -86); c.quadraticCurveTo(-56, -88, -94, -84); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = vgr(c, -100, -70, sh(col, .1), sh(col, -.3)); c.beginPath(); c.moveTo(-96, -94); c.lineTo(-140, -98); c.lineTo(-132, -80); c.lineTo(-92, -82); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(84, -130); c.lineTo(74, -152); c.lineTo(52, -156); c.stroke(); c.strokeStyle = '#9aa0a8'; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#fff6c8'; ink(c, 2); c.beginPath(); c.ellipse(98, -134, 10, 12, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = sh(col, -.1); c.beginPath(); c.arc(112, -40, 50, -2.6, -1.6); c.lineTo(112, -40); c.closePath(); c.stroke(); }); };

  // ---- ambulance; bottom centre (s=1: 600 long, 280 tall). t flashes the lights
  G6.ambulance = (c, x, y, s = 1, t = 0, o = {}) => { shadow(c, x, y - 2 * s, 320 * s, .4); veh(c, x, y, s, o, () => { const ang = o.wheelsTurning ? t * 8 : 0, ph = Math.floor(t * 6) % 2;
    c.fillStyle = vgr(c, -270, -40, '#ffffff', '#d8dce2'); ink(c, 3.2); rr(c, -296, -270, 380, 230, 10); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(84, -40); c.lineTo(84, -214); c.lineTo(170, -214); c.quadraticCurveTo(184, -214, 192, -200); c.lineTo(232, -132); c.lineTo(282, -124); c.quadraticCurveTo(300, -120, 300, -98); c.lineTo(298, -54); c.quadraticCurveTo(296, -40, 280, -40); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#e8463a'; c.fillRect(-294, -122, 380, 22); c.fillRect(86, -122, 212, 22); ink(c, 2); c.strokeRect(-294, -122, 592, 22);
    for (let k = 0; k < 12; k++) { c.fillStyle = k % 2 ? '#2a6ad0' : '#f2c14a'; c.fillRect(-294 + k * 31.6, -100, 31.6, 14); } c.strokeRect(-294, -100, 380, 14);
    txt(c, o.text || 'AMBULANCE', -106, -170, 56, '#2a6ad0', 'center', 'Anton'); c.fillStyle = glass(c, -206, -134); ink(c, 2.4); c.beginPath(); c.moveTo(110, -136); c.lineTo(110, -202); c.lineTo(168, -202); c.quadraticCurveTo(178, -202, 184, -192); c.lineTo(216, -136); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = '#9aa0a8'; c.lineWidth = 2; c.beginPath(); c.moveTo(-100, -268); c.lineTo(-100, -44); c.stroke(); c.fillStyle = '#fff6c8'; ink(c, 2); rr(c, 278, -112, 20, 14, 4); c.fill(); c.stroke(); c.fillStyle = '#3a3a42'; rr(c, 262, -58, 44, 16, 5); c.fill(); c.stroke();
    c.fillStyle = ph ? '#ff3a3a' : '#7a1a1a'; rr(c, -280, -286, 50, 16, 4); c.fill(); c.stroke(); c.fillStyle = ph ? '#1a2a7a' : '#3a7aff'; rr(c, 20, -286, 50, 16, 4); c.fill(); c.stroke(); flash(c, -255, -278, '255,60,60', ph); flash(c, 45, -278, '60,120,255', 1 - ph);
    c.fillStyle = '#121216'; for (const wx of [-190, 196]) { c.beginPath(); c.arc(wx, -40, 54, Math.PI, 0); c.fill(); } wheel(c, -190, -42, 42, ang); wheel(c, 196, -42, 42, ang); }); };

  // ---- helicopter, side view; centre of the cabin (s=1: 620 long incl. tail, rotor 560 wide). t spins the rotors.
  // o: { col, facing, skids:false }
  G6.helicopter = (c, x, y, s = 1, t = 0, o = {}) => { const col = o.col || '#2a4a7a'; veh(c, x, y, s, o, () => {
    c.fillStyle = vgr(c, -40, 10, sh(col, .2), sh(col, -.2)); ink(c, 3); c.beginPath(); c.moveTo(-90, -30); c.lineTo(-330, -24); c.lineTo(-330, -6); c.lineTo(-90, 18); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-300, -24); c.lineTo(-340, -90); c.lineTo(-312, -90); c.lineTo(-270, -24); c.closePath(); c.fill(); c.stroke(); c.fillRect(-300, -10, 60, 8); c.strokeRect(-300, -10, 60, 8);
    if (o.skids !== false) { c.strokeStyle = INK; c.lineWidth = 7; c.beginPath(); c.moveTo(-80, 92); c.lineTo(130, 92); c.quadraticCurveTo(150, 92, 156, 80); c.moveTo(-40, 56); c.lineTo(-50, 92); c.moveTo(70, 56); c.lineTo(80, 92); c.stroke(); c.strokeStyle = '#6a6e78'; c.lineWidth = 4; c.stroke(); }
    c.fillStyle = vgr(c, -70, 70, sh(col, .25), sh(col, -.25)); ink(c, 3.2); c.beginPath(); c.moveTo(-110, -40); c.quadraticCurveTo(-60, -76, 40, -74); c.quadraticCurveTo(150, -70, 170, 0); c.quadraticCurveTo(170, 60, 90, 64); c.lineTo(-70, 64); c.quadraticCurveTo(-120, 60, -122, 10); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = glass(c, -64, 40); ink(c, 2.4); c.beginPath(); c.moveTo(70, -64); c.quadraticCurveTo(140, -60, 160, 0); c.lineTo(160, 20); c.lineTo(80, 20); c.closePath(); c.fill(); c.stroke(); shine(c, 100, -54, 140, -10, 4, .4);
    c.fillStyle = glass(c, -50, 10); rr(c, -40, -50, 80, 56, 8); c.fill(); c.stroke(); c.strokeStyle = sh(col, -.4); c.lineWidth = 2; c.beginPath(); c.moveTo(-60, -50); c.lineTo(-60, 60); c.stroke(); c.fillStyle = '#f4f4f4'; c.fillRect(-118, 26, 286, 10);
    c.fillStyle = '#3a3a42'; ink(c, 2.4); rr(c, -60, -92, 110, 22, 8); c.fill(); c.stroke(); c.fillRect(-8, -110, 16, 20); c.strokeRect(-8, -110, 16, 20);
    const a = t * 28, L = 290; c.save(); c.globalAlpha = .18; c.fillStyle = '#d8dce4'; c.beginPath(); c.ellipse(0, -112, L, 9, 0, 0, 7); c.fill(); c.restore();
    for (const k of [0, 1]) { const e = Math.cos(a + k * Math.PI / 2) * L; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(-e, -112); c.lineTo(e, -112); c.stroke(); c.strokeStyle = '#4a4e58'; c.lineWidth = 4.5; c.stroke(); }
    c.fillStyle = '#2a2a30'; c.beginPath(); c.arc(0, -112, 9, 0, 7); c.fill(); c.stroke();
    c.save(); c.translate(-326, -40); c.globalAlpha = .22; c.fillStyle = '#d8dce4'; c.beginPath(); c.arc(0, 0, 40, 0, 7); c.fill(); c.globalAlpha = 1; c.rotate(t * 40); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-40, 0); c.lineTo(40, 0); c.stroke(); c.strokeStyle = '#4a4e58'; c.lineWidth = 3; c.stroke(); c.restore();
    c.fillStyle = '#ff3a3a'; c.beginPath(); c.arc(-330, -16, 4, 0, 7); c.fill(); }); };

  // ---- small private jet, side view; centre (s=1: 560 long). o: { col (stripe), facing, gear }
  G6.plane = (c, x, y, s = 1, o = {}) => { const col = o.col || '#c8a24a'; veh(c, x, y, s, o, () => {
    if (o.gear) { c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(180, 20); c.lineTo(180, 50); c.moveTo(-60, 26); c.lineTo(-60, 52); c.stroke(); wheel(c, 180, 54, 12); wheel(c, -60, 56, 13); }
    c.fillStyle = vgr(c, -130, -30, '#f4f4f6', '#c8ccd4'); ink(c, 3); c.beginPath(); c.moveTo(-200, -26); c.lineTo(-262, -128); c.lineTo(-226, -128); c.lineTo(-140, -24); c.closePath(); c.fill(); c.stroke(); c.fillRect(-276, -134, 66, 10); c.strokeRect(-276, -134, 66, 10);
    c.fillStyle = vgr(c, -30, 30, '#ffffff', '#c8ccd4'); c.beginPath(); c.moveTo(290, 6); c.quadraticCurveTo(270, -30, 210, -34); c.lineTo(-180, -30); c.quadraticCurveTo(-250, -26, -272, -10); c.quadraticCurveTo(-250, 14, -180, 20); c.lineTo(210, 24); c.quadraticCurveTo(268, 22, 290, 6); c.closePath(); c.fill(); c.stroke();
    c.save(); c.clip(); c.fillStyle = col; c.fillRect(-300, 2, 600, 7); c.fillStyle = sh(col, -.3); c.fillRect(-300, 10, 600, 3); c.restore();
    c.fillStyle = '#1e2a3a'; c.beginPath(); c.moveTo(262, -18); c.quadraticCurveTo(250, -28, 226, -28); c.lineTo(222, -14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#2a3a4e'; for (let k = 0; k < 8; k++) { c.beginPath(); c.ellipse(160 - k * 36, -12, 7, 9, 0, 0, 7); c.fill(); } c.strokeStyle = '#9aa0a8'; c.lineWidth = 1.5; rr(c, 186, -24, 18, 40, 3); c.stroke();
    c.fillStyle = vgr(c, -60, -30, '#e8eaee', '#a8acb4'); ink(c, 2.8); rr(c, -196, -66, 96, 32, 16); c.fill(); c.stroke(); c.fillStyle = '#3a3e46'; c.beginPath(); c.ellipse(-102, -50, 6, 14, 0, 0, 7); c.fill(); c.fillRect(-150, -38, 18, 10);
    c.fillStyle = vgr(c, 8, 30, '#d8dce2', '#9aa0a8'); ink(c, 2.6); c.beginPath(); c.moveTo(70, 10); c.lineTo(-40, 30); c.lineTo(-110, 32); c.lineTo(-20, 8); c.closePath(); c.fill(); c.stroke(); shine(c, 200, -26, -150, -24, 3, .4); }); };

  // ---- speedboat at the waterline y; centre of the hull at x (s=1: 380 long). t bobs it. o: { col, facing, water:false, wake }
  G6.boat = (c, x, y, s = 1, t = 0, o = {}) => { const col = o.col || '#d8382e', bob = Math.sin(t * 2.2) * 4; veh(c, x, y, s, o, () => { c.save(); c.translate(0, bob); c.rotate(Math.sin(t * 1.7) * .02);
    if (o.wake) { c.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 6; k++) { const ph = (t * 2 + k / 6) % 1; c.globalAlpha = 1 - ph; c.beginPath(); c.ellipse(-200 - ph * 160, 4, 30 + ph * 40, 7, 0, 0, 7); c.fill(); } c.globalAlpha = 1; }
    c.fillStyle = '#26262c'; ink(c, 2.4); rr(c, -206, -60, 24, 62, 5); c.fill(); c.stroke(); c.fillStyle = '#3a3a42'; rr(c, -218, -76, 36, 26, 6); c.fill(); c.stroke();
    const hull = () => { c.beginPath(); c.moveTo(-190, -44); c.lineTo(150, -44); c.quadraticCurveTo(200, -44, 222, -58); c.quadraticCurveTo(206, -10, 150, 12); c.lineTo(-180, 12); c.quadraticCurveTo(-192, -10, -190, -44); c.closePath(); };
    hull(); c.fillStyle = vgr(c, -50, 12, '#ffffff', '#c8ccd4'); c.fill(); c.save(); hull(); c.clip(); c.fillStyle = col; c.beginPath(); c.moveTo(-200, -20); c.lineTo(230, -42); c.lineTo(230, -30); c.lineTo(-200, -8); c.closePath(); c.fill(); c.fillStyle = sh(col, -.35); c.fillRect(-200, 0, 440, 20); c.restore(); hull(); ink(c, 3); c.stroke();
    c.fillStyle = glass(c, -84, -44); ink(c, 2.4); c.beginPath(); c.moveTo(10, -44); c.lineTo(40, -82); c.lineTo(70, -82); c.lineTo(84, -44); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#e8dcc0'; rr(c, -110, -62, 60, 20, 6); c.fill(); c.stroke(); rr(c, -40, -62, 40, 20, 6); c.fill(); c.stroke(); c.restore();
    if (o.water !== false) { c.fillStyle = 'rgba(40,120,170,.55)'; c.beginPath(); c.moveTo(-260, 0); for (let k = 0; k <= 26; k++) c.lineTo(-260 + k * 20, Math.sin(k * 1.3 + t * 3) * 3); c.lineTo(260, 30); c.lineTo(-260, 30); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 2.4; c.beginPath(); for (let k = 0; k <= 26; k++) c[k ? 'lineTo' : 'moveTo'](-260 + k * 20, Math.sin(k * 1.3 + t * 3) * 3); c.stroke(); } }); };

  // re-exports from the PR kit (same signatures): bubble(c,x,y,s,text,{thought,tail,px}), counter(c,x,y,s,from,to,t0,t1,t,{pre,suf,dec}), tag(c,x,y,s,kind,t0,t)
  G6.bubble = PR.bubble; G6.counter = PR.counter; G6.tag = PR.tag; G6.briefcase = PR.briefcase;
})(window);
