// Character rig "leo" (v6 proposal): flat cartoon style from Pushpam's Leo reference sheet.
// Skin-tone oval head, big tousled hair with a light streak, dot eyes, slim long limbs, hands with
// fingers, rolled cuffs, sneakers. 3/4 view facing +x: the facing-side arm and leg are drawn
// behind the torso, the back-side arm and leg in front. Needs rig_v5.js loaded first (poseAngles).
// Usage: RIG6.figure(ctx, { x, y, s, facing, pose, t, P, look, mood, talk, seed })
(function (G) {
  const R = G.RIG, D = Math.PI / 180; let INK = '#2a1a14';
  const sh = (h, f) => R.shadeHex(h, f);
  const C = {};
  // character presets (look)
  const LOOKS = {
    teen: { skin: '#f4c7a1', hair: 'messy', hairCol: '#5a2e1e', streak: '#8a4a26', top: 'hoodie', topCol: '#4f9a4a', inner: '#e8e8e2', innerStripe: '#7d8790', legs: '#3a4a66', cuff: '#5e7090', shoes: '#6b5a48', sole: '#f2f0ea' },
    banker: { skin: '#f2c6a0', hair: 'neat', hairCol: '#3b2a20', streak: '#6a4a36', top: 'jacket', topCol: '#4c5260', inner: '#e8eef6', tie: '#9a2e2a', legs: '#454b58', shoes: '#231a14', sole: '#3a2c22' },
    engineer: { skin: '#e9bc94', hair: 'spiky', hairCol: '#1d2230', streak: '#3a4258', top: 'sweater', topCol: '#c8b49a', sleeveCol: '#5a3e30', collarCol: '#5a3e30', legs: '#5c6068', shoes: '#33466e', sole: '#f2f0ea', glasses: true },
    hunter: { skin: '#d9a57c', hair: 'wild', hairCol: '#3d2416', streak: '#6a3e24', top: 'tunic', topCol: '#9a6a42', beard: true, bareArms: true, bareLegs: true, legs: '#d9a57c', shoes: null },
    woman: { skin: '#f0c09a', hair: 'long', hairCol: '#4a2a22', streak: '#7a4436', top: 'cardigan', topCol: '#8a2e3c', inner: '#2a2a30', legs: '#2a2a30', shoes: '#7a2a36', sole: '#f2f0ea', lashes: true },
    elder: { skin: '#eebf9a', hair: 'bald', hairCol: '#b8b4ae', streak: '#dcd8d2', top: 'cardigan', topCol: '#6e7a5a', inner: '#e8e2d2', legs: '#6a5e50', shoes: '#4a3424', sole: '#3a2c22', glasses: true, beard: 'grey' },
  };
  C.LOOKS = LOOKS;

  function limb(ctx, pts, w, fill) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const path = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
    path(); ctx.strokeStyle = INK; ctx.lineWidth = w * 2 + 5.5; ctx.stroke();
    path(); ctx.strokeStyle = fill; ctx.lineWidth = w * 2; ctx.stroke();
  }
  // hand with fingers, pointing along angle a (0 = down). mode: relaxed | open | point | fist | wave
  function hand(ctx, x, y, a, skin, mode, flip) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-a); ctx.scale(1.2, 1.2); if (flip) ctx.scale(-1, 1);
    ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.fillStyle = skin;
    const finger = (fx, fy, ang, len, w = 3.6) => { ctx.save(); ctx.translate(fx, fy); ctx.rotate(ang); ctx.beginPath(); ctx.roundRect(-w, 0, w * 2, len, w); ctx.fill(); ctx.stroke(); ctx.restore(); };
    if (mode === 'fist') { ctx.beginPath(); ctx.ellipse(0, 9, 10, 10, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-6, 12); ctx.lineTo(6, 12); ctx.moveTo(-6, 7); ctx.lineTo(4, 7); ctx.lineWidth = 1.6; ctx.stroke(); finger(8, 2, -.9, 9, 3.4); ctx.restore(); return; }
    const spread = mode === 'open' || mode === 'wave' ? 1 : mode === 'point' ? 0 : .25;
    if (mode === 'point') { finger(-1, 8, 0, 22, 3.4); for (const k of [0, 1, 2]) { ctx.beginPath(); ctx.arc(-4 + k * 4, 13, 4.2, 0, 7); ctx.fill(); ctx.stroke(); } }
    else for (let k = 0; k < 4; k++) finger(-6 + k * 4, 9, (k - 1.5) * .16 * spread, mode === 'relaxed' || !mode ? 13 - Math.abs(k - 1.5) * 1.5 : 16 - Math.abs(k - 1.5) * 2);
    ctx.beginPath(); ctx.ellipse(0, 6, 9.5, 9, 0, 0, 7); ctx.fill(); ctx.stroke(); // palm over the finger roots
    ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(0, 6, 8, 7.5, 0, 0, 7); ctx.fill();
    finger(8, 2, -.7 - spread * .4, 11, 3.4); // thumb
    ctx.restore();
  }

  C.figure = (ctx, o) => {
    const L = typeof o.look === 'string' ? LOOKS[o.look] : (o.look || LOOKS.teen), t = o.t ?? 0, s = o.s ?? 1, F = o.facing ?? 1, seed = o.seed ?? 1;
    const P = o.P || R.poseAngles(o, t), ST = L.style || 'leo'; INK = ST === 'alium' ? '#2e2428' : '#2a1a14';
    ctx.save(); ctx.translate(o.x, o.y);
    // soft contact shadow
    if (o.shadow !== false) { ctx.save(); ctx.scale(1, .2); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 90 * s); g.addColorStop(0, 'rgba(30,18,8,.35)'); g.addColorStop(1, 'rgba(30,18,8,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 90 * s, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.pose === 'lie') { ctx.rotate(-Math.PI / 2 * F); ctx.translate(0, 26 * s); }
    ctx.scale(F * s, s); if (o.squash) ctx.scale(1 - o.squash * .5, 1 + o.squash);
    const thigh = 72, shin = 70, torsoH = 104, shW = 36, hipW = 25, armU = 60, armL = 56, rx = ST === 'gumball' ? 53 : ST === 'alium' ? 42 : 44, ry = ST === 'gumball' ? 57 : ST === 'alium' ? 48 : 50;
    const legW = L.bareLegs ? 8 : 10.5, armW = L.bareArms ? 7.5 : 9.5;
    const footRel = (h, k) => thigh * Math.cos(h * D) + shin * Math.cos((h + k) * D);
    const walking = o.pose === 'walk' || o.pose === 'run';
    const hipY = -12 - Math.max(footRel(P.hipL, P.kneeL), footRel(P.hipR, P.kneeR)) + (walking ? P.bob * 1.4 : P.bob * .5);
    const lean = (P.lean + (o.lean || 0)) * D;
    const nk = { x: Math.sin(lean) * torsoH, y: hipY - Math.cos(lean) * torsoH };
    if (o.out) { o.out.hipY = hipY * s; o.out.seatY = (hipY + 12) * s; o.out.headY = (nk.y - 18 - ry * 1.8) * s; }
    const skin = L.skin, skinSh = sh(L.skin, -.12);
    const folded = o.pose === 'sit' || o.pose === 'squat' || o.pose === 'work';
    // ---- legs ----
    const leg = (side, near) => {
      const hx = side * hipW * .45, a1 = P[side < 0 ? 'hipL' : 'hipR'] * D, a2 = a1 + P[side < 0 ? 'kneeL' : 'kneeR'] * D;
      const kx = hx + Math.sin(a1) * thigh, ky = hipY + Math.cos(a1) * thigh, fx = kx + Math.sin(a2) * shin, fy = ky + Math.cos(a2) * shin;
      const col = near ? L.legs : sh(L.legs, -.16);
      limb(ctx, [[hx, hipY], [kx, ky], [fx, fy - 8]], legW, col);
      if (!L.bareLegs) { // rolled cuff
        ctx.save(); ctx.translate(fx, fy - 12); ctx.rotate(-a2); ctx.fillStyle = L.cuff || sh(L.legs, .1); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.roundRect(-legW - 2, -5, legW * 2 + 4, 10, 3); ctx.fill(); ctx.stroke(); ctx.restore();
        if (!L.cuff) { ctx.strokeStyle = sh(L.legs, -.3); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(kx + 3, ky - 10); ctx.quadraticCurveTo(kx - 1, ky, kx + 2, ky + 9); ctx.stroke(); }
      }
      const fa = (P[side < 0 ? 'footL' : 'footR'] || 0) * D;
      ctx.save(); ctx.translate(fx, fy); ctx.rotate(-fa); ctx.strokeStyle = INK; ctx.lineWidth = 2.8; ctx.lineJoin = 'round';
      if (L.shoes) { // sneaker: upper, toe cap, white sole, two stripes
        const up = near ? L.shoes : sh(L.shoes, -.15);
        ctx.fillStyle = L.sole; ctx.beginPath(); ctx.roundRect(-14, 2, 50, 9, 4); ctx.fill(); ctx.stroke();
        ctx.fillStyle = up; ctx.beginPath(); ctx.moveTo(-13, 4); ctx.bezierCurveTo(-15, -10, -6, -14, 4, -12); ctx.bezierCurveTo(18, -8, 30, -6, 34, 4); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = sh(up, .35); ctx.lineWidth = 2.2; for (const k of [0, 1]) { ctx.beginPath(); ctx.moveTo(4 + k * 7, -9); ctx.lineTo(9 + k * 7, 1); ctx.stroke(); }
      } else { ctx.fillStyle = near ? skin : skinSh; ctx.beginPath(); ctx.moveTo(-10, -8); ctx.bezierCurveTo(-14, 6, -6, 9, 6, 9); ctx.lineTo(24, 9); ctx.bezierCurveTo(32, 9, 30, 0, 18, -4); ctx.lineTo(8, -10); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.restore();
    };
    // ---- arms ----
    const arm = (side, near) => {
      const sx = nk.x + (side > 0 ? shW * .55 : -shW * .55), sy = nk.y + 12;
      let a1 = P[side < 0 ? 'shL' : 'shR'] * D, a2 = a1 - P[side < 0 ? 'elL' : 'elR'] * D;
      if (P.chin > 0 && side < 0) { // fist under the chin (2-bone IK, elbow down)
        const w = Math.min(1, P.chin), hc = headC(); const tx = hc.x + 14, ty = hc.y + ry * 1.18, dx = tx - sx, dy = ty - sy, d = Math.min(armU + armL - 1, Math.hypot(dx, dy)), base = Math.atan2(dx, dy), k = Math.acos(Math.max(-1, Math.min(1, (armU * armU + d * d - armL * armL) / (2 * armU * d))));
        const b1 = base - k, ex0 = sx + Math.sin(b1) * armU, ey0 = sy + Math.cos(b1) * armU, b2 = Math.atan2(tx - ex0, ty - ey0); a1 += (b1 - a1) * w; a2 += (b2 - a2) * w;
      }
      if (a2 < a1) a2 = a1; // elbows only ever bend forward, never backwards
      const ex = sx + Math.sin(a1) * armU, ey = sy + Math.cos(a1) * armU, hx = ex + Math.sin(a2) * armL, hy = ey + Math.cos(a2) * armL;
      const sc = L.bareArms ? (near ? skin : skinSh) : (near ? (L.sleeveCol || L.topCol) : sh(L.sleeveCol || L.topCol, -.16));
      limb(ctx, [[sx, sy], [ex, ey], [hx - Math.sin(a2) * 4, hy - Math.cos(a2) * 4]], armW, sc);
      if (L.top === 'tee') limb(ctx, [[sx, sy], [sx + Math.sin(a1) * armU * .5, sy + Math.cos(a1) * armU * .5]], armW + 3, near ? L.topCol : sh(L.topCol, -.16));
      if (!L.bareArms) { // sleeve cuff
        ctx.save(); ctx.translate(hx - Math.sin(a2) * 7, hy - Math.cos(a2) * 7); ctx.rotate(-a2); ctx.fillStyle = L.top === 'jacket' ? L.inner : sh(L.sleeveCol || L.topCol, -.1); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.roundRect(-armW - 1.5, -4, armW * 2 + 3, 8, 3); ctx.fill(); ctx.stroke(); ctx.restore();
        ctx.strokeStyle = sh(L.sleeveCol || L.topCol, -.32); ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey, armW * .6, a1 + 1.3, a1 + 2.2); ctx.stroke();
      }
      let mode = P[side < 0 ? 'handL' : 'handR'] || 'relaxed'; if (P.chin > .5 && side < 0) mode = 'fist';
      hand(ctx, hx, hy, a2, near ? skin : skinSh, mode, side < 0);
      const hk = side > 0 ? 'near' : 'far'; if (o.hold && o.hold[hk]) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(-a2); o.hold[hk](ctx, t); ctx.restore(); }
    };
    const nod = o.talk ? Math.abs(Math.sin(t * 6 + seed)) * 3.5 : 0, headC = () => ({ x: nk.x + Math.sin(lean) * 16 + 3 + nod * .4, y: nk.y - 18 - ry * .86 + nod });
    // back hair (long) and hood go behind everything
    const hc = headC();
    if (L.hair === 'long') { ctx.fillStyle = sh(L.hairCol, -.12); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hc.x + rx * .2, hc.y - ry * .9); ctx.bezierCurveTo(hc.x - rx * 1.6, hc.y - ry * .9, hc.x - rx * 1.5, hc.y + ry * 1.6, hc.x - rx * 1.1, hc.y + ry * 2.3); ctx.quadraticCurveTo(hc.x - rx * .5, hc.y + ry * 2.4, hc.x - rx * .05, hc.y + ry * 1.5); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    leg(1, false); if (!folded) leg(-1, true);
    arm(1, false);
    // ---- torso ----
    const hem = hipY + (L.top === 'tunic' ? 30 : L.top === 'cardigan' ? 22 : 16), hw = hipW + (L.top === 'tunic' ? 14 : 11);
    const torso = () => { ctx.beginPath(); ctx.moveTo(nk.x - 10, nk.y); ctx.quadraticCurveTo(nk.x - shW, nk.y + 1, nk.x - shW - 1, nk.y + 16); ctx.bezierCurveTo(nk.x * .5 - shW - 3, nk.y + 60, -hw - 1, hipY - 26, -hw, hem); ctx.quadraticCurveTo(0, hem + 6, hw, hem); ctx.bezierCurveTo(hw + 1, hipY - 26, nk.x * .5 + shW + 3, nk.y + 60, nk.x + shW + 1, nk.y + 16); ctx.quadraticCurveTo(nk.x + shW, nk.y + 1, nk.x + 10, nk.y); ctx.closePath(); };
    // neck
    ctx.fillStyle = skinSh; ctx.strokeStyle = INK; ctx.lineWidth = 2.8; ctx.beginPath(); ctx.roundRect(nk.x - 6 + 3, nk.y - 22, 12, 28, 5); ctx.fill(); ctx.stroke();
    if (L.top === 'hoodie') { ctx.fillStyle = sh(L.topCol, -.18); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(nk.x - 16, nk.y - 2, 18, 13, -.3, 0, 7); ctx.fill(); ctx.stroke(); }
    torso(); ctx.fillStyle = L.topCol; ctx.fill();
    ctx.save(); torso(); ctx.clip();
    ctx.fillStyle = sh(L.topCol, -.12); ctx.beginPath(); ctx.moveTo(-60, nk.y); ctx.lineTo(nk.x - 14, nk.y); ctx.bezierCurveTo(-18, nk.y + 40, -16, hipY - 10, -10, hem + 10); ctx.lineTo(-60, hem + 10); ctx.closePath(); ctx.fill();
    const cx = nk.x * .55 + 6; // front centre line, shifted toward the facing side
    if (L.top === 'hoodie') {
      ctx.fillStyle = L.inner; ctx.beginPath(); ctx.moveTo(nk.x - 6, nk.y); ctx.lineTo(nk.x + 14, nk.y); ctx.lineTo(nk.x + 6, nk.y + 26); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = L.innerStripe; ctx.lineWidth = 2.6; for (const k of [6, 13, 20]) { ctx.beginPath(); ctx.moveTo(nk.x - 6, nk.y + k); ctx.lineTo(nk.x + 14, nk.y + k); ctx.stroke(); }
      ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(nk.x - 8, nk.y - 1); ctx.lineTo(nk.x + 6, nk.y + 28); ctx.lineTo(nk.x + 16, nk.y - 1); ctx.stroke();
      ctx.strokeStyle = '#f2efe6'; ctx.lineWidth = 2.2; for (const k of [0, 11]) { ctx.beginPath(); ctx.moveTo(nk.x + k, nk.y + 12); ctx.lineTo(nk.x + k - 1, nk.y + 44); ctx.stroke(); }
      ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx - 20, hipY - 6); ctx.quadraticCurveTo(cx - 14, hipY - 34, cx + 2, hipY - 34); ctx.lineTo(cx + 22, hipY - 34); ctx.quadraticCurveTo(cx + 34, hipY - 32, cx + 34, hipY - 6); ctx.stroke();
      ctx.fillStyle = sh(L.topCol, -.25); ctx.fillRect(-60, hem - 10, 120, 16); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-60, hem - 10); ctx.lineTo(60, hem - 10); ctx.stroke();
    } else if (L.top === 'jacket') {
      ctx.fillStyle = L.inner; ctx.beginPath(); ctx.moveTo(nk.x - 8, nk.y); ctx.lineTo(nk.x + 16, nk.y); ctx.lineTo(cx + 8, hipY - 30); ctx.lineTo(cx - 2, hipY - 30); ctx.closePath(); ctx.fill();
      if (L.tie) { ctx.fillStyle = L.tie; ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(nk.x + 1, nk.y + 3); ctx.lineTo(nk.x + 9, nk.y + 3); ctx.lineTo(nk.x + 10, nk.y + 44); ctx.lineTo(nk.x + 5, nk.y + 52); ctx.lineTo(nk.x, nk.y + 44); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.strokeStyle = INK; ctx.fillStyle = sh(L.topCol, .08); ctx.lineWidth = 2.2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(nk.x + 4 + sd * 11, nk.y - 1); ctx.lineTo(nk.x + 4 + sd * 19, nk.y + 18); ctx.lineTo(nk.x + 4 + sd * 13, nk.y + 24); ctx.lineTo(cx + 3 + sd * 3, hipY - 30); ctx.lineTo(nk.x + 4 + sd * 5, nk.y + 6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = '#1a1410'; for (const k of [0, 1]) { ctx.beginPath(); ctx.arc(cx + 9, hipY - 22 + k * 14, 2.6, 0, 7); ctx.fill(); }
      ctx.strokeStyle = sh(L.topCol, -.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + 3, hipY - 30); ctx.lineTo(cx + 4, hem); ctx.moveTo(cx + 14, hipY - 4); ctx.lineTo(cx + 30, hipY - 4); ctx.stroke();
    } else if (L.top === 'shirt') {
      ctx.fillStyle = sh(L.topCol, .12); ctx.strokeStyle = INK; ctx.lineWidth = 2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(nk.x + 4 + sd * 2, nk.y + 9); ctx.lineTo(nk.x + 4 + sd * 13, nk.y - 2); ctx.lineTo(nk.x + 4 + sd * 15, nk.y + 11); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      if (L.tie) { ctx.fillStyle = L.tie; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(nk.x + 1, nk.y + 8); ctx.lineTo(nk.x + 8, nk.y + 8); ctx.lineTo(nk.x + 10, nk.y + 48); ctx.lineTo(nk.x + 5, nk.y + 56); ctx.lineTo(nk.x, nk.y + 48); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      else { ctx.strokeStyle = sh(L.topCol, -.3); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(nk.x + 5, nk.y + 10); ctx.lineTo(cx + 5, hem); ctx.stroke(); ctx.fillStyle = sh(L.topCol, -.4); for (let k = 0; k < 4; k++) { const u = (k + .5) / 4.5; ctx.beginPath(); ctx.arc(nk.x + 8 + (cx - nk.x) * u, nk.y + 12 + (hem - nk.y - 12) * u, 2, 0, 7); ctx.fill(); } }
      if (L.belt) { ctx.fillStyle = L.belt; ctx.fillRect(-60, hipY - 4, 120, 8); ctx.fillStyle = '#c9a25a'; ctx.fillRect(cx - 2, hipY - 5, 10, 10); }
    } else if (L.top === 'tee') {
      ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(nk.x - 9, nk.y); ctx.quadraticCurveTo(nk.x + 4, nk.y + 12, nk.x + 15, nk.y); ctx.stroke(); ctx.strokeStyle = sh(L.topCol, -.3); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-60, hem - 8); ctx.lineTo(60, hem - 8); ctx.stroke();
      if (L.print) { ctx.fillStyle = L.print; ctx.beginPath(); ctx.arc(cx + 6, nk.y + 48, 11, 0, 7); ctx.fill(); }
    } else if (L.top === 'sweater') {
      ctx.fillStyle = L.collarCol; ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.roundRect(nk.x - 14, nk.y - 8, 32, 16, 7); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = sh(L.collarCol, .2); ctx.lineWidth = 1.4; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(nk.x - 10 + k * 5, nk.y - 5); ctx.lineTo(nk.x - 10 + k * 5, nk.y + 5); ctx.stroke(); }
      ctx.fillStyle = L.collarCol; ctx.fillRect(-60, hem - 11, 120, 14); ctx.strokeStyle = sh(L.collarCol, .2); for (let k = 0; k < 24; k++) { ctx.beginPath(); ctx.moveTo(-58 + k * 5, hem - 10); ctx.lineTo(-58 + k * 5, hem + 2); ctx.stroke(); }
      ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-60, hem - 11); ctx.lineTo(60, hem - 11); ctx.stroke();
    } else if (L.top === 'cardigan') {
      ctx.fillStyle = L.inner; ctx.beginPath(); ctx.moveTo(nk.x - 8, nk.y); ctx.lineTo(nk.x + 16, nk.y); ctx.lineTo(cx + 10, hem); ctx.lineTo(cx - 4, hem); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(nk.x - 8, nk.y); ctx.lineTo(cx - 4, hem); ctx.moveTo(nk.x + 16, nk.y); ctx.lineTo(cx + 10, hem); ctx.stroke();
      ctx.fillStyle = sh(L.topCol, .25); for (let k = 0; k < 4; k++) { const u = (k + .5) / 4; ctx.beginPath(); ctx.arc(nk.x + 16 + (cx + 10 - nk.x - 16) * u + 4, nk.y + (hem - nk.y) * u, 2.6, 0, 7); ctx.fill(); ctx.stroke(); }
      ctx.strokeStyle = sh(L.topCol, -.3); ctx.lineWidth = 1.6; for (let k = 0; k < 9; k++) { ctx.beginPath(); ctx.moveTo(-40 + k * 10, hem - 9); ctx.lineTo(-40 + k * 10, hem + 2); ctx.stroke(); }
    } else if (L.top === 'tunic') {
      ctx.strokeStyle = sh(L.topCol, -.3); ctx.lineWidth = 1.6; ctx.lineCap = 'round'; for (let k = 0; k < 40; k++) { const fx = -40 + (k * 37 % 84), fy = nk.y + 12 + (k * 53 % (hem - nk.y - 10)); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + 3, fy + 4, fx + 2, fy + 9); ctx.stroke(); }
      ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(nk.x - 22, nk.y + 4); ctx.lineTo(hw - 4, hipY - 4); ctx.stroke();
      ctx.fillStyle = '#4a2e1a'; ctx.fillRect(-60, hipY - 8, 120, 8);
      ctx.fillStyle = sh(L.topCol, -.2); ctx.beginPath(); for (let k = 0; k < 8; k++) { const x0 = -hw + k * (hw * 2 / 8); ctx.moveTo(x0, hem - 4); ctx.lineTo(x0 + hw / 8, hem + 8); ctx.lineTo(x0 + hw / 4, hem - 4); } ctx.fill();
    }
    ctx.restore();
    torso(); ctx.strokeStyle = INK; ctx.lineWidth = 3.2; ctx.lineJoin = 'round'; ctx.stroke();
    if (folded) leg(-1, true);
    // ---- head ----
    const X = hc.x, Y = hc.y;
    const head = () => { ctx.beginPath(); ctx.moveTo(X - rx, Y - ry * .1); ctx.bezierCurveTo(X - rx, Y - ry * 1.05, X + rx, Y - ry * 1.05, X + rx, Y - ry * .1); ctx.bezierCurveTo(X + rx * 1.02, Y + ry * .55, X + rx * .55, Y + ry * 1.02, X + rx * .05, Y + ry * 1.0); ctx.bezierCurveTo(X - rx * .6, Y + ry * 1.0, X - rx * 1.02, Y + ry * .5, X - rx, Y - ry * .1); ctx.closePath(); };
    head(); ctx.fillStyle = skin; ctx.fill(); ctx.save(); head(); ctx.clip(); ctx.fillStyle = skinSh; ctx.beginPath(); ctx.ellipse(X - rx * .95, Y + ry * .2, rx * .35, ry * 1.1, 0, 0, 7); ctx.fill(); ctx.restore();
    head(); ctx.strokeStyle = INK; ctx.lineWidth = 3.2; ctx.stroke();
    // ear on the back half of the head
    if (L.hair !== 'long') { ctx.fillStyle = skin; ctx.beginPath(); ctx.ellipse(X - rx * .55, Y + ry * .12, ST === 'gumball' ? 10 : 7, ST === 'gumball' ? 14 : 10, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(X - rx * .55, Y + ry * .12, 4, -1.2, 1.4); ctx.stroke(); }
    // hair
    const hairPath = () => {
      ctx.beginPath(); const H = L.hair;
      if (H === 'bald') { ctx.moveTo(X - rx * 1.02, Y - ry * .2); ctx.quadraticCurveTo(X - rx * 1.15, Y + ry * .25, X - rx * .78, Y + ry * .55); ctx.quadraticCurveTo(X - rx * .62, Y + ry * .1, X - rx * .62, Y - ry * .15); ctx.closePath(); return; }
      const spikes = H === 'spiky' ? 9 : H === 'wild' ? 10 : H === 'neat' ? 3 : 7, amp = H === 'spiky' ? .26 : H === 'wild' ? .24 : H === 'neat' ? .05 : .14;
      const a0 = -20 * D, a1 = (H === 'long' ? -205 : H === 'wild' ? -230 : H === 'soft' ? -222 : -200) * D;
      const pointy = H === 'spiky' || H === 'wild';
      if (pointy) for (let k = 0; k <= spikes * 2; k++) { const a = a0 + (a1 - a0) * k / (spikes * 2), out = k % 2 ? 1.12 + amp : 1.08; const jx = Math.cos(a) * rx * out, jy = Math.sin(a) * ry * out; k ? ctx.lineTo(X + jx, Y + jy - 4) : ctx.moveTo(X + jx, Y + jy - 4); }
      else { const n = H === 'neat' ? 4 : H === 'soft' ? 5 : 7, puff = H === 'neat' ? .08 : H === 'soft' ? .12 : .2; ctx.moveTo(X + Math.cos(a0) * rx * 1.08, Y + Math.sin(a0) * ry * 1.08 - 4); for (let k = 1; k <= n; k++) { const a = a0 + (a1 - a0) * k / n, am = a0 + (a1 - a0) * (k - .5) / n, w = 1.1 + ((k * 7 + seed) % 3) * .03; ctx.quadraticCurveTo(X + Math.cos(am) * rx * (w + puff), Y + Math.sin(am) * ry * (w + puff) - 4, X + Math.cos(a) * rx * 1.08, Y + Math.sin(a) * ry * 1.08 - 4); } }
      // inner edge: down the back, over the ear, then the fringe across the forehead
      if (H === 'wild') ctx.lineTo(X - rx * .75, Y + ry * .5); if (H === 'soft') ctx.lineTo(X - rx * .62, Y + ry * .55);
      ctx.lineTo(X - rx * .42, Y - ry * .05); ctx.quadraticCurveTo(X - rx * .3, Y - ry * .45, X - rx * .05, Y - ry * .48);
      const bangs = H === 'soft' ? [[.1, -.3], [.4, -.42], [.7, -.25], [.95, -.18]] : H === 'neat' ? [[.3, -.62], [.85, -.4]] : H === 'spiky' ? [[.12, -.18], [.3, -.42], [.5, -.12], [.68, -.4], [.86, -.2]] : [[.15, -.25], [.32, -.5], [.5, -.22], [.68, -.48], [.9, -.3]];
      for (const [bx, by] of bangs) ctx.lineTo(X + rx * bx, Y + ry * by);
      ctx.closePath();
    };
    hairPath(); ctx.fillStyle = L.hairCol; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
    if (L.bun) { ctx.fillStyle = L.hairCol; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(X - rx * .55, Y - ry * 1.05, 17, 0, 7); ctx.fill(); ctx.stroke(); }
    if (L.hair !== 'bald') { ctx.save(); hairPath(); ctx.clip(); ctx.strokeStyle = L.streak; ctx.globalAlpha = ST === 'leo' ? 1 : ST === 'alium' ? .45 : .3; ctx.lineWidth = ST === 'leo' ? 12 : 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(X - rx * .9, Y - ry * .35); ctx.quadraticCurveTo(X - rx * .2, Y - ry * 1.15, X + rx * .7, Y - ry * .85); ctx.stroke(); ctx.restore(); }
    // face (3/4 toward +x)
    const mood = o.mood || 'neutral', blink = o.eyesClosed ?? (((t + seed * .61) % (3.2 + (seed % 5) * .4)) < .14 ? 1 : 0), fx = X + rx * .3, fy = Y + ry * .06;
    ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    const eyes = ST === 'gumball' ? [[fx - 9, .8], [fx + 14, 1]] : [[fx - 13, .82], [fx + 12, 1]];
    if (ST === 'gumball') { // big white eyes with pupils, thick brows
      const bt = { neutral: [0, 0], happy: [0, 3], shocked: [0, 8], worried: [7, 2], angry: [-8, 0], focus: [-4, 0], sad: [7, -2] }[mood] || [0, 0];
      for (const [ex, k] of eyes) {
        const big = mood === 'shocked' ? 1.18 : 1, ew = 10.5 * k * big, eh = 14 * big;
        if (mood === 'happy') { ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex - 7 * k, fy + 3); ctx.quadraticCurveTo(ex, fy - 8, ex + 7 * k, fy + 3); ctx.stroke(); }
        else if (blink) { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - ew, fy); ctx.quadraticCurveTo(ex, fy + 5, ex + ew, fy); ctx.stroke(); }
        else { ctx.fillStyle = '#fff'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(ex, fy - 2, ew, eh, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(ex + 4 * k, fy, 4.6 * k, 5.6, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + 5.5 * k, fy - 2, 1.5, 0, 7); ctx.fill(); ctx.fillStyle = INK; }
        const inner = ex < fx ? 1 : -1; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(ex - 8 * k, fy - 19 - bt[1] + (inner < 0 ? bt[0] * .6 : 0)); ctx.quadraticCurveTo(ex, fy - 23 - bt[1], ex + 8 * k, fy - 19 - bt[1] + (inner > 0 ? bt[0] * .6 : 0)); ctx.stroke();
      }
    } else if (ST === 'alium') { // dark irises under a heavy upper lid, rosy cheeks
      const bt = { neutral: [0, 0], happy: [0, 2], shocked: [0, 6], worried: [5, 2], angry: [-5, 0], focus: [-3, 0], sad: [5, -2] }[mood] || [0, 0];
      ctx.fillStyle = 'rgba(232,120,120,.35)'; for (const [ex, k] of eyes) { ctx.beginPath(); ctx.ellipse(ex - 1, fy + 12, 7 * k, 4, 0, 0, 7); ctx.fill(); }
      for (const [ex, k] of eyes) {
        if (mood === 'happy') { ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(ex - 6 * k, fy + 2); ctx.quadraticCurveTo(ex, fy - 5, ex + 6 * k, fy + 2); ctx.stroke(); }
        else if (blink) { ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(ex - 6, fy + 1); ctx.lineTo(ex + 6, fy + 1); ctx.stroke(); }
        else { const lid = mood === 'shocked' ? -7 : mood === 'focus' || mood === 'angry' ? -1 : -4; ctx.save(); ctx.beginPath(); ctx.rect(ex - 12, fy + lid, 24, 20); ctx.clip(); ctx.fillStyle = '#fbf6f0'; ctx.beginPath(); ctx.ellipse(ex, fy, 6.5 * k, 7.5, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#3b3d58'; ctx.beginPath(); ctx.ellipse(ex + 1.5 * k, fy + .5, 4.6 * k, 6.4, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#16141c'; ctx.beginPath(); ctx.ellipse(ex + 1.8 * k, fy + 1, 2.2 * k, 3.2, 0, 0, 7); ctx.fill(); ctx.restore();
          ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + 3 * k, fy - 1 - lid * .1, 1.3, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.8; ctx.beginPath(); ctx.moveTo(ex - 7.5 * k, fy + lid + 1); ctx.quadraticCurveTo(ex, fy + lid - 2, ex + 8 * k, fy + lid + 2); ctx.stroke(); }
        const inner = ex < fx ? 1 : -1; ctx.strokeStyle = sh(L.hairCol, -.2); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(ex - 6 * k, fy - 13 - bt[1] + (inner < 0 ? bt[0] * .5 : 0)); ctx.lineTo(ex + 6 * k, fy - 13 - bt[1] + (inner > 0 ? bt[0] * .5 : 0)); ctx.stroke();
      }
      ctx.strokeStyle = INK; ctx.fillStyle = INK;
    } else {
    for (const [ex, k] of eyes) {
      if (mood === 'happy') { ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(ex - 5 * k, fy + 2); ctx.quadraticCurveTo(ex, fy - 6, ex + 5 * k, fy + 2); ctx.stroke(); }
      else if (blink) { ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex - 5, fy); ctx.lineTo(ex + 5, fy); ctx.stroke(); }
      else { const big = mood === 'shocked' ? 1.35 : 1; ctx.beginPath(); ctx.ellipse(ex, fy, 4 * k * big, 6 * big, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + 1.2, fy - 2.4, 1.4, 0, 7); ctx.fill(); ctx.fillStyle = INK; }
      if (L.lashes && !blink) { ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ex + 3 * k, fy - 6); ctx.lineTo(ex + 7 * k, fy - 9); ctx.stroke(); }
    }
    const bt = { neutral: [0, 0], happy: [0, 3], shocked: [0, 7], worried: [6, 2], angry: [-6, 0], focus: [-3, 0], sad: [6, -2] }[mood] || [0, 0];
    ctx.lineWidth = 3; for (const [ex, k] of eyes) { const inner = ex < fx ? 1 : -1; ctx.beginPath(); ctx.moveTo(ex - 6 * k, fy - 12 - bt[1] + (inner < 0 ? bt[0] * .5 : 0)); ctx.lineTo(ex + 6 * k, fy - 12 - bt[1] + (inner > 0 ? bt[0] * .5 : 0)); ctx.stroke(); }
    }
    if (L.glasses) { const gr = ST === 'gumball' ? 15 : 9.5; ctx.strokeStyle = INK; ctx.lineWidth = 2.4; for (const [ex, k] of eyes) { ctx.beginPath(); ctx.ellipse(ex, fy - (ST === 'gumball' ? 2 : 0), gr * k, gr, 0, 0, 7); ctx.stroke(); } const [e0, e1] = eyes; ctx.beginPath(); ctx.moveTo(e0[0] + gr * e0[1], fy - 1); ctx.lineTo(e1[0] - gr, fy - 1); ctx.moveTo(e0[0] - gr * e0[1], fy - 2); ctx.lineTo(X - rx * .5, fy - 4); ctx.stroke(); }
    // nose: leo = small bump, gumball = round button nose, alium = none
    if (ST === 'gumball') { ctx.fillStyle = sh(skin, -.18); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(fx + 19, fy + 14, 6.5, 0, 7); ctx.fill(); ctx.stroke(); }
    else if (ST !== 'alium') { ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(fx + 22, fy + 6); ctx.quadraticCurveTo(fx + 29, fy + 12, fx + 22, fy + 15); ctx.stroke(); }
    const talk = o.talk ? Math.abs(Math.sin(t * 12 + seed)) : 0, my = fy + (ST === 'gumball' ? 30 : ST === 'alium' ? 24 : 26), mx = fx + (ST === 'gumball' ? 8 : 4);
    if (L.beard) { const bc = L.beard === 'grey' ? '#cfcac2' : L.hairCol; ctx.fillStyle = bc; ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(X - rx * .55, Y + ry * .25); ctx.bezierCurveTo(X - rx * .5, Y + ry * 1.45, X + rx * .9, Y + ry * 1.4, X + rx * .9, Y + ry * .35); ctx.quadraticCurveTo(mx + 14, my - 6, mx, my - 8); ctx.quadraticCurveTo(mx - 16, my - 6, X - rx * .55, Y + ry * .25); ctx.fill(); ctx.stroke(); }
    if (mood === 'happy' || mood === 'shocked' || talk > .15) {
      const open = mood === 'shocked' ? 13 : mood === 'happy' ? 9 + talk * 4 : 3 + talk * 9;
      ctx.beginPath(); if (mood === 'shocked') ctx.ellipse(mx, my + 4, 8, open * .75, 0, 0, 7); else { ctx.moveTo(mx - 12, my - 1); ctx.quadraticCurveTo(mx, my + open * 1.7, mx + 13, my - 2); ctx.closePath(); }
      ctx.fillStyle = '#6a1e1a'; ctx.fill(); ctx.lineWidth = 2.8; ctx.strokeStyle = INK; ctx.stroke();
      ctx.save(); ctx.clip(); if (mood === 'happy') { ctx.fillStyle = '#fff'; ctx.fillRect(mx - 14, my - 3, 28, 5); } ctx.fillStyle = '#e07a74'; ctx.beginPath(); ctx.ellipse(mx + 1, my + open * 1.4, 8, 5, 0, 0, 7); ctx.fill(); ctx.restore();
    } else { const mc = { sad: -5, worried: -3, angry: -4, focus: 0 }[mood] ?? 3; ctx.lineWidth = 2.8; ctx.beginPath(); ctx.moveTo(mx - 9, my); ctx.quadraticCurveTo(mx, my + mc, mx + 9, my - (mood === 'worried' ? 2 : 0)); ctx.stroke(); }
    if (mood === 'worried' || mood === 'shocked') { ctx.fillStyle = '#9ed6f2'; ctx.strokeStyle = INK; ctx.lineWidth = 1.8; const sx = X - rx * .2, sy = Y - ry * .2 + ((t * 26) % 10); ctx.beginPath(); ctx.moveTo(sx, sy - 7); ctx.quadraticCurveTo(sx + 5, sy + 2, sx, sy + 4); ctx.quadraticCurveTo(sx - 5, sy + 2, sx, sy - 7); ctx.fill(); ctx.stroke(); }
    arm(-1, true);
    ctx.restore();
  };
  C.walkX = (t, x0, x1, t0, dur, s = 1) => { const u = Math.min(1, Math.max(0, (t - t0) / dur)), x = x0 + (x1 - x0) * u; return { x, phase: Math.abs(x - x0) / (118 * s) * Math.PI, moving: u > 0 && u < 1, facing: x1 >= x0 ? 1 : -1 }; };
  // Map the old round-head options (costume, hair, glasses, beard) onto a Leo-style look.
  const SKINS = ['#f4c7a1', '#e9bc94', '#f0c09a', '#d9a57c', '#c99068', '#f2c6a0'];
  const COST = {
    shirt: { top: 'shirt', topCol: '#e9e1d0', legs: '#3b4352', shoes: '#4a3424', sole: '#3a2c22', belt: '#2a1d14' },
    shirtsleeves: { top: 'shirt', topCol: '#dfe6f0', tie: '#8a2b2b', legs: '#3e4450', shoes: '#231a14', sole: '#3a2c22', belt: '#1d1712' },
    office: { top: 'jacket', topCol: '#5d7088', inner: '#eef0f4', legs: '#2f3540', shoes: '#231a14', sole: '#3a2c22' },
    suit: { top: 'jacket', topCol: '#2f3646', inner: '#f2efe8', tie: '#9a2e26', legs: '#2f3646', shoes: '#151515', sole: '#2a2420' },
    suit80: { top: 'jacket', topCol: '#4c5260', inner: '#e8eef6', tie: '#9a2e2a', legs: '#454b58', shoes: '#231a14', sole: '#3a2c22' },
    leather: { top: 'jacket', topCol: '#2a2a2e', inner: '#3a3a3e', legs: '#30343c', shoes: '#141414', sole: '#2a2a2a' },
    farmer: { top: 'shirt', topCol: '#8f7a55', legs: '#6e5a3c', shoes: '#4a3424', sole: '#3a2c22', belt: '#3a2a1a' },
    school: { top: 'sweater', topCol: '#3d5a7a', sleeveCol: '#3d5a7a', collarCol: '#eef0f4', legs: '#4a4038', shoes: '#2a1d14', sole: '#f2f0ea' },
    dress: { top: 'cardigan', topCol: '#7a4a5a', inner: '#e8dcd0', legs: '#3a2a30', shoes: '#2a1d14', sole: '#3a2c22', lashes: true },
    robe: { top: 'tunic', topCol: '#6b5a44', bareLegs: true, legs: null, shoes: null },
    hide: { top: 'tunic', topCol: '#9a6a42', bareArms: true, bareLegs: true, shoes: null },
    hideW: { top: 'tunic', topCol: '#a8784c', bareArms: true, bareLegs: true, shoes: null, lashes: true },
    hideBare: { top: 'tunic', topCol: '#8b5e3a', bareArms: true, bareLegs: true, shoes: null },
    kid: { top: 'tunic', topCol: '#8b5e3a', bareArms: true, bareLegs: true, shoes: null },
  };
  const HAIR = { short: 'messy', swept: 'neat', curly: 'messy', bald: 'bald', long: 'long', bun: 'neat', none: 'bald' };
  const mute = (h, k) => { if (!h || typeof h !== 'string' || !h.startsWith('#')) return h; const n = parseInt(h.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = (r + g + b) / 3; r += (m - r) * k + (138 - m) * k * .3; g += (m - g) * k + (134 - m) * k * .3; b += (m - b) * k + (140 - m) * k * .3; return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v | 0)).toString(16).padStart(2, '0')).join(''); };
  C.lookFrom = o => {
    const c = COST[o.costume] || COST.shirt, seed = o.seed ?? 1, skin = o.skin || SKINS[(seed * 7) % SKINS.length];
    const hairCol = o.hairCol || ['#3a2618', '#5a2e1e', '#1d2230', '#4a2a22'][seed % 4];
    const L = Object.assign({ skin, inner: '#e8e8e2', innerStripe: '#7d8790', cuff: null }, c, { hair: HAIR[o.hair] || 'messy', hairCol, streak: R.shadeHex(hairCol, .25), glasses: !!o.glasses, beard: o.beard ? (o.beard === 'grey' ? 'grey' : true) : false, bun: o.hair === 'bun' });
    if (L.bareLegs || L.legs == null) L.legs = skin;
    const ST = o.style || G.RIGSTYLE || 'leo'; L.style = ST === 'round' ? 'leo' : ST;
    if (ST === 'gumball') { if ((L.hair === 'messy' || L.hair === 'neat') && !L.bun) L.hair = o.hair === 'swept' ? 'neat' : 'spiky'; if (L.top === 'shirt' && !L.tie) { L.top = 'tee'; L.bareArms = true; } if (L.shoes && L.sole === '#f2f0ea') L.shoes = '#33466e'; }
    if (ST === 'alium') { for (const k of ['topCol', 'sleeveCol', 'legs', 'shoes', 'inner', 'tie', 'collarCol']) if (L[k] && !(k === 'legs' && L.bareLegs)) L[k] = mute(L[k], .28); if (L.hair === 'messy' || L.hair === 'neat') L.hair = 'soft'; L.hairCol = mute(L.hairCol, .15); }
    return L;
  };
  C.figureCompat = (ctx, o) => C.figure(ctx, Object.assign({}, o, { look: o.look || C.lookFrom(o), s: (o.s ?? 1) * .8 }));
  const round = R.figure; R.figureRound = round; R.figure = (ctx, o) => (G.RIGSTYLE && G.RIGSTYLE !== 'round' ? C.figureCompat : round)(ctx, o);
  G.RIG6 = C;
})(typeof window !== 'undefined' ? window : globalThis);
