// Character rig v2: house cutout style. Big round white head (about a third of the height), short chunky body,
// white mitten hands with a thumb, thick dark-brown outline, two-tone cel shading with a warm rim light on clothes.
// Figure is placed by its ground point (x, y = sole of the feet). Height ~ 300*s px at s=1. API unchanged from v1.
(function (G) {
  const INK = '#2b1e16', SKIN = '#fffdf8', SKIN_SH = '#e9e0d2';
  const D2R = Math.PI / 180;
  const C = {};
  const hexA = (h, a) => { h = h.replace('#', ''); const n = parseInt(h, 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const shadeHex = (h, f) => { h = String(h).replace('#', ''); if (h.startsWith('rgb')) return h; let r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16); const t = f < 0 ? [20, 10, 6] : [255, 244, 225], k = Math.abs(f); r += (t[0] - r) * k; g += (t[1] - g) * k; b += (t[2] - b) * k; return `rgb(${r | 0},${g | 0},${b | 0})`; };

  // Costume presets. torso/sleeve/legs/shoes colours plus detail flags.
  const COSTUMES = {
    hide: { torso: '#9a6a42', sleeve: null, legs: SKIN, wrap: '#7a4e2e', shoes: null, belt: '#4a2e1a', skinLimbs: true, strap: '#5a3a22', fur: true, oneShoulder: true },
    hideBare: { torso: SKIN, sleeve: null, legs: SKIN, wrap: '#8b5e3a', shoes: null, belt: '#5a3a22', skinLimbs: true, strap: '#6a4428' },
    hideW: { torso: '#a8784c', sleeve: null, legs: SKIN, wrap: '#8b5e3a', shoes: null, skinLimbs: true, dressLen: .55, beads: '#e8dcc0', fur: true },
    shirt: { torso: '#e9e1d0', sleeve: '#e9e1d0', legs: '#3b4352', shoes: '#2a1d14', belt: '#2a1d14', collar: 'shirt', buttons: true },
    suit: { torso: '#2f3646', sleeve: '#2f3646', legs: '#2f3646', shoes: '#151515', shirt: '#f2efe8', tie: '#9a2e26', lapels: true, cuffs: '#f2efe8' },
    suit80: { torso: '#4a4f5c', sleeve: '#4a4f5c', legs: '#4a4f5c', shoes: '#1d1712', shirt: '#dfe6f0', tie: '#7a2b2b', lapels: true, cuffs: '#dfe6f0' },
    shirtsleeves: { torso: '#dfe6f0', sleeve: '#dfe6f0', legs: '#3e4450', shoes: '#1d1712', tie: '#7a2b2b', belt: '#1d1712', collar: 'shirt', rolled: true },
    leather: { torso: '#2a2a2e', sleeve: '#2a2a2e', legs: '#30343c', shoes: '#141414', shirt: '#3a3a3e', zip: true, collar: 'leather', sheen: true },
    farmer: { torso: '#8f7a55', sleeve: '#8f7a55', legs: '#6e5a3c', shoes: '#4a3424', belt: '#3a2a1a', patches: true, collar: 'v' },
    dress: { torso: '#7a4a5a', sleeve: '#7a4a5a', legs: SKIN, shoes: '#2a1d14', dressLen: .8, collar: 'round' },
    office: { torso: '#5d7088', sleeve: '#5d7088', legs: '#2f3540', shoes: '#1d1712', shirt: '#eef0f4', collar: 'shirt', buttons: true },
    robe: { torso: '#6b5a44', sleeve: '#6b5a44', legs: '#6b5a44', shoes: '#3a2a1a', dressLen: .95, belt: '#3a2a1a', collar: 'wrap', trim: '#c9a25a', wide: true },
    school: { torso: '#3d5a7a', sleeve: '#3d5a7a', legs: '#4a4038', shoes: '#2a1d14', collar: 'shirt', shirt: '#eef0f4' },
    kid: { torso: SKIN, sleeve: null, legs: SKIN, wrap: '#8b5e3a', skinLimbs: true },
  };
  C.COSTUMES = COSTUMES;

  // tapered capsule from a to b (kept for callers)
  function seg(ctx, ax, ay, bx, by, w0, w1, fill, outline = true) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    ctx.beginPath(); ctx.moveTo(ax + nx * w0, ay + ny * w0); ctx.lineTo(bx + nx * w1, by + ny * w1); ctx.arc(bx, by, w1, Math.atan2(ny, nx), Math.atan2(ny, nx) + Math.PI, false); ctx.lineTo(ax - nx * w0, ay - ny * w0); ctx.arc(ax, ay, w0, Math.atan2(-ny, -nx), Math.atan2(-ny, -nx) + Math.PI, false); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); if (outline) { ctx.strokeStyle = INK; ctx.lineWidth = outline === true ? 3 : outline; ctx.lineJoin = 'round'; ctx.stroke(); }
  }
  // limb with ink outline, base colour and a cel-shade band on the lower side
  function limb(ctx, pts, w, fill, o = {}) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const path = (off = 0) => { ctx.beginPath(); ctx.moveTo(pts[0][0] + off, pts[0][1] + off * .4); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0] + off, pts[i][1] + off * .4); };
    path(); ctx.strokeStyle = INK; ctx.lineWidth = w * 2 + 6; ctx.stroke();
    path(); ctx.strokeStyle = fill; ctx.lineWidth = w * 2; ctx.stroke();
    if (o.shade !== false) { ctx.save(); path(-w * .45); ctx.strokeStyle = o.shadeCol || shadeHex(fill, -.22); ctx.globalAlpha = .9; ctx.lineWidth = w * .9; ctx.stroke(); ctx.restore(); }
    if (o.rim) { ctx.save(); path(w * .7); ctx.strokeStyle = 'rgba(255,226,180,.18)'; ctx.lineWidth = w * .22; ctx.stroke(); ctx.restore(); }
  }
  // white mitten with a thumb, pointing along angle a (0 = down)
  function mitten(ctx, x, y, a, near, thumbSide = 1, mode) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-a); ctx.scale(1.28, 1.28);
    const fill = near ? SKIN : SKIN_SH; ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (mode === 'point') { // fist with the index finger out along the arm
      ctx.beginPath(); ctx.moveTo(-9, -4); ctx.bezierCurveTo(-12, 6, -10, 15, 0, 16); ctx.bezierCurveTo(10, 15, 12, 6, 9, -4); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(1, 8, 8, 20, 4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6, 9); ctx.quadraticCurveTo(-2, 12, 2, 10); ctx.stroke();
    } else if (mode === 'open') { // flat open palm, fingers together, thumb out
      ctx.beginPath(); ctx.moveTo(-9, -4); ctx.bezierCurveTo(-12, 8, -12, 24, -2, 25); ctx.bezierCurveTo(8, 25, 12, 12, 9, -4); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8 * thumbSide, 0); ctx.quadraticCurveTo(20 * thumbSide, -2, 19 * thumbSide, 6); ctx.quadraticCurveTo(16 * thumbSide, 11, 8 * thumbSide, 9); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(120,90,60,.35)'; ctx.lineWidth = 1.4; for (const fx of [-4, 1]) { ctx.beginPath(); ctx.moveTo(fx, 15); ctx.lineTo(fx, 23); ctx.stroke(); }
    } else { // relaxed mitten
      ctx.beginPath(); ctx.moveTo(-9, -4); ctx.bezierCurveTo(-13, 8, -11, 21, 0, 22); ctx.bezierCurveTo(11, 21, 13, 8, 9, -4); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8 * thumbSide, 2); ctx.quadraticCurveTo(15 * thumbSide, 3, 13 * thumbSide, 11); ctx.quadraticCurveTo(11 * thumbSide, 13, 7 * thumbSide, 10); ctx.fill(); ctx.stroke();
    }
    ctx.fillStyle = 'rgba(150,120,90,.16)'; ctx.beginPath(); ctx.ellipse(-4 * thumbSide, 10, 3.5, 6, 0, 0, 7); ctx.fill();
    ctx.restore();
  }
  const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
  function blinkAmt(t, seed) { const period = 3.1 + (seed % 7) * .37, ph = ((t + seed * .61) % period); return ph < .28 ? Math.pow(Math.sin(ph / .28 * Math.PI), 2) : 0; }

  // Pose solver: joint angles (degrees, 0 = straight down).
  function poseAngles(o, t) {
    const P = { hipL: 0, kneeL: 0, hipR: 0, kneeR: 0, shL: 10, elL: -8, shR: -10, elR: -8, bob: 0, lean: 0, footL: 0, footR: 0 };
    const breathe = Math.sin(t * 2.1 + (o.seed || 0)) * .5 + .5;
    if (o.pose === 'walk' || o.pose === 'run') {
      const run = o.pose === 'run', ph = o.phase ?? (t * (run ? 9 : 5.4)), s = Math.sin(ph), c = Math.cos(ph);
      const amp = run ? 36 : 24, arm = run ? 50 : 32;
      P.hipL = amp * s; P.hipR = -amp * s;
      P.kneeL = -(Math.max(0, c) * (run ? 70 : 40) + 6); P.kneeR = -(Math.max(0, -c) * (run ? 70 : 40) + 6);
      P.footL = Math.max(0, -s) * 18; P.footR = Math.max(0, s) * 18;
      P.shL = -arm * s * .9; P.shR = arm * s * .9; P.elL = -16 - Math.max(0, s) * 26; P.elR = -16 - Math.max(0, -s) * 26;
      P.bob = -Math.abs(Math.cos(ph)) * (run ? 9 : 5) + (run ? 0 : 3); P.lean = run ? 10 : 3;
    } else if (o.pose === 'sit') {
      P.hipL = 88; P.hipR = 84; P.kneeL = -86; P.kneeR = -90; P.sitDrop = 1; P.shL = 18 + breathe * 2; P.shR = 38 + breathe * 2; P.elL = -58; P.elR = -55; P.bob = 0;
    } else if (o.pose === 'squat' || o.pose === 'work') {
      P.hipL = 75; P.hipR = 50; P.kneeL = -140; P.kneeR = -110; P.lean = 22;
      const w = Math.sin(t * (o.workSpeed ?? 7)); P.shL = 55 + w * 14; P.elL = -40 - w * 18; P.shR = 40 - w * 10; P.elR = -60;
    } else if (o.pose === 'point') { P.shR = 92; P.elR = -4; P.shL = -3; P.elL = -8; P.handR = 'point'; }
    else if (o.pose === 'reach') { P.shR = 75; P.elR = -15; P.shL = 25; P.elL = -40; }
    else if (o.pose === 'carry') { P.shL = 30; P.elL = -75; P.shR = 35; P.elR = -75; }
    else if (o.pose === 'cheer') { P.shL = -150; P.elL = 12; P.shR = 150; P.elR = -12; P.handL = 'open'; P.handR = 'open'; }
    else if (o.pose === 'think') { P.shR = 0; P.elR = 0; P.shL = -3; P.elL = -8; P.chin = 1; }
    else if (o.pose === 'shrug') { P.shL = -30; P.elL = 78; P.shR = 30; P.elR = -78; P.handL = 'open'; P.handR = 'open'; }
    else if (o.pose === 'present') { P.shR = 58; P.elR = -24; P.shL = -3; P.elL = -8; P.handR = 'open'; }
    else if (o.pose === 'lie') { }
    else { const sw = Math.sin(t * 1.3 + (o.seed || 0)); P.hipL = -3 + sw * .8; P.hipR = 3 + sw * .8; P.kneeL = -2; P.kneeR = -2; P.shL = -3 - sw * 1.2; P.shR = 4 + sw * 1.2; P.elL = -8; P.elR = -10; P.bob = breathe * -1.5; }
    if (o.arms) Object.assign(P, o.arms(t, P));
    return P;
  }

  // Draw one figure. Options: x,y,s,facing,pose,t,costume,mood,hair,hairCol,hat,seed,hold{near,far},talk,glasses,beard,eyesClosed,lean,shadow
  C.figure = (ctx, o) => {
    const t = o.t ?? 0, s = o.s ?? 1, F = o.facing ?? 1, cos = COSTUMES[o.costume] || COSTUMES.shirt, P = poseAngles(o, t);
    const seed = o.seed ?? 1;
    ctx.save(); ctx.translate(o.x, o.y);
    if (o.shadow !== false && o.pose !== 'lie') { ctx.save(); ctx.scale(1, .22); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 80 * s); g.addColorStop(0, `rgba(25,14,6,${o.shadowAlpha ?? .4})`); g.addColorStop(1, 'rgba(25,14,6,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 80 * s, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.pose === 'lie') { ctx.rotate(-Math.PI / 2 * F); ctx.translate(0, 22 * s); }
    ctx.scale(F * s, s);
    // proportions: head ~ 1/3 of the height, short chunky body
    const shin = 46, thigh = 46, torsoH = 84, headR = 50, shW = 47, hipW = 35, armU = 42, armL = 40, LW = 13.5, AW = 12.5;
    const footRel = (h, k) => thigh * Math.cos(h * D2R) + shin * Math.cos((h + k) * D2R);
    const hipY = -9 - Math.max(footRel(P.hipL, P.kneeL), footRel(P.hipR, P.kneeR)) + (o.pose === 'walk' || o.pose === 'run' ? 0 : P.bob * .4);
    if (o.out) { o.out.hipY = hipY * s; o.out.seatY = (hipY + 12) * s; o.out.headY = (hipY - torsoH - headR * 1.6) * s; }
    const lean = (P.lean + (o.lean || 0)) * D2R;
    const neck = { x: Math.sin(lean) * torsoH, y: hipY - Math.cos(lean) * torsoH };
    const legCol = near => cos.skinLimbs ? (near ? SKIN : SKIN_SH) : (near ? cos.legs : shadeHex(cos.legs, -.22));
    const armCol = near => (cos.sleeve ? (near ? cos.sleeve : shadeHex(cos.sleeve, -.22)) : (near ? SKIN : SKIN_SH));
    const leg = (side, near) => {
      const hx = side * hipW * .56, a1 = P[side < 0 ? 'hipL' : 'hipR'] * D2R, a2 = a1 + P[side < 0 ? 'kneeL' : 'kneeR'] * D2R;
      const kx = hx + Math.sin(a1) * thigh, ky = hipY + Math.cos(a1) * thigh, fx = kx + Math.sin(a2) * shin, fy = ky + Math.cos(a2) * shin;
      const c = legCol(near);
      limb(ctx, [[hx, hipY - 4], [kx, ky], [fx, fy - 6]], LW, c, { rim: near && !cos.skinLimbs });
      if (!cos.skinLimbs && cos.legs) { // trouser crease + hem
        ctx.strokeStyle = shadeHex(cos.legs, -.38); ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx + 4, ky - 8); ctx.quadraticCurveTo(kx, ky, kx - 3, ky + 8); ctx.stroke();
        const ha = Math.atan2(fy - ky, fx - kx), nx = -Math.sin(ha), ny = Math.cos(ha); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(fx - 6 * Math.cos(ha) + nx * (LW + 2), fy - 6 * Math.sin(ha) + ny * (LW + 2)); ctx.lineTo(fx - 6 * Math.cos(ha) - nx * (LW + 2), fy - 6 * Math.sin(ha) - ny * (LW + 2)); ctx.stroke();
      }
      const fa = (P[side < 0 ? 'footL' : 'footR'] || 0) * D2R;
      ctx.save(); ctx.translate(fx, fy); ctx.rotate(-fa); const sc = cos.shoes ? (near ? cos.shoes : shadeHex(cos.shoes, -.2)) : c;
      ctx.beginPath(); ctx.moveTo(-12, -9); ctx.bezierCurveTo(-15, 4, -10, 9, 0, 9); ctx.lineTo(22, 9); ctx.bezierCurveTo(32, 9, 31, -4, 16, -9); ctx.closePath(); ctx.fillStyle = sc; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
      if (cos.shoes) { ctx.strokeStyle = 'rgba(255,240,220,.35)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(4, -5); ctx.quadraticCurveTo(16, -7, 24, -1); ctx.stroke(); ctx.fillStyle = shadeHex(sc.startsWith('#') ? sc : '#222222', -.3); ctx.fillRect(-12, 6, 40, 3); }
      ctx.restore();
    };
    const arm = (side, near) => {
      const sx = neck.x + side * shW * .84, sy = neck.y + 16; let a1 = P[side < 0 ? 'shL' : 'shR'] * D2R, a2 = a1 - P[side < 0 ? 'elL' : 'elR'] * D2R;
      if (P.chin && side > 0) { const tx = neck.x + 30, ty = neck.y + 4, dx = tx - sx, dy = ty - sy, d = Math.min(armU + armL - 1, Math.hypot(dx, dy)), base = Math.atan2(dx, dy), k = Math.acos((armU * armU + d * d - armL * armL) / (2 * armU * d)); a1 = base + k; const ex0 = sx + Math.sin(a1) * armU, ey0 = sy + Math.cos(a1) * armU; a2 = Math.atan2(tx - ex0, ty - ey0); }
      const ex = sx + Math.sin(a1) * armU, ey = sy + Math.cos(a1) * armU, hx = ex + Math.sin(a2) * armL, hy = ey + Math.cos(a2) * armL;
      const c = armCol(near);
      if (cos.sleeve && !cos.rolled) {
        limb(ctx, [[sx, sy], [ex, ey], [hx - Math.sin(a2) * 6, hy - Math.cos(a2) * 6]], AW, c, { rim: near });
        // elbow fold + cuff
        ctx.strokeStyle = shadeHex(cos.sleeve, -.4); ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey, AW * .7, a1 + 1.2, a1 + 2.2); ctx.stroke();
        const cx = hx - Math.sin(a2) * 8, cy = hy - Math.cos(a2) * 8; ctx.save(); ctx.translate(cx, cy); ctx.rotate(-a2); ctx.fillStyle = cos.cuffs || shadeHex(cos.sleeve, -.12); ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.roundRect(-AW - 2, -5, AW * 2 + 4, 9, 3); ctx.fill(); ctx.stroke(); ctx.restore();
      } else if (cos.rolled) {
        limb(ctx, [[ex, ey], [hx, hy]], AW * .82, near ? SKIN : SKIN_SH, { shadeCol: SKIN_SH });
        limb(ctx, [[sx, sy], [ex, ey]], AW, c, { rim: near }); ctx.save(); ctx.translate(ex, ey); ctx.rotate(-a1); ctx.fillStyle = shadeHex(cos.sleeve, -.08); ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.roundRect(-AW - 3, -6, AW * 2 + 6, 11, 4); ctx.fill(); ctx.stroke(); ctx.restore();
      } else limb(ctx, [[sx, sy], [ex, ey], [hx, hy]], AW * .85, near ? SKIN : SKIN_SH, { shadeCol: SKIN_SH });
      const hm = P[side < 0 ? 'handL' : 'handR']; mitten(ctx, hx, hy - 2, a2, near, hm === 'open' && Math.sin(a2) < 0 ? -1 : 1, hm);
      if (o.hold && o.hold[near ? 'near' : 'far']) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(-a2); o.hold[near ? 'near' : 'far'](ctx, t); ctx.restore(); }
    };
    const folded = o.pose === 'sit' || o.pose === 'squat' || o.pose === 'work';
    leg(-1, false); arm(-1, false); if (!folded) leg(1, true);
    // ---- torso: rounded trapezoid, two-tone cel shade, rim light, folds ----
    const tcol = cos.torso, wide = cos.wide ? 6 : 0;
    const torso = () => { ctx.beginPath(); ctx.moveTo(-hipW - 4 - wide, hipY + 10); ctx.bezierCurveTo(-hipW - 8 - wide, hipY - 20, -shW - 4 + neck.x * .4, neck.y + 40, neck.x - shW + 2, neck.y + 14); ctx.quadraticCurveTo(neck.x - shW + 6, neck.y - 2, neck.x - 14, neck.y); ctx.lineTo(neck.x + 14, neck.y); ctx.quadraticCurveTo(neck.x + shW - 6, neck.y - 2, neck.x + shW - 2, neck.y + 14); ctx.bezierCurveTo(shW + 4 + neck.x * .4, neck.y + 40, hipW + 8 + wide, hipY - 20, hipW + 4 + wide, hipY + 10); ctx.quadraticCurveTo(0, hipY + 16, -hipW - 4 - wide, hipY + 10); ctx.closePath(); };
    // neck stub
    ctx.fillStyle = SKIN_SH; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(neck.x - 10, neck.y - 16, 20, 22, 6); ctx.fill(); ctx.stroke();
    torso(); ctx.fillStyle = tcol; ctx.fill();
    ctx.save(); torso(); ctx.clip();
    // shadow side (back/left) + lower band
    ctx.fillStyle = shadeHex(tcol, -.2); ctx.beginPath(); ctx.moveTo(-shW - 10, neck.y - 10); ctx.bezierCurveTo(-shW * .2, neck.y + 30, -hipW * .4, hipY - 30, -hipW * .1, hipY + 20); ctx.lineTo(-shW - 20, hipY + 20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = shadeHex(tcol, -.1); ctx.fillRect(-shW - 20, hipY - 10, shW * 2 + 40, 30);
    if (cos.sheen) { ctx.strokeStyle = 'rgba(200,210,230,.22)'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(neck.x + 20, neck.y + 18); ctx.quadraticCurveTo(26, (neck.y + hipY) / 2, 18, hipY - 8); ctx.stroke(); }
    if (cos.shirt) { ctx.fillStyle = cos.shirt; ctx.beginPath(); ctx.moveTo(neck.x - 11, neck.y - 1); ctx.lineTo(neck.x + 11, neck.y - 1); ctx.lineTo(neck.x + 4 - lean * 40, neck.y + 56); ctx.lineTo(neck.x - 4 - lean * 40, neck.y + 56); ctx.closePath(); ctx.fill(); }
    if (cos.tie) { ctx.fillStyle = cos.tie; ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(neck.x - 5, neck.y + 4); ctx.lineTo(neck.x + 5, neck.y + 4); ctx.lineTo(neck.x + 7 - lean * 40, neck.y + 46); ctx.lineTo(neck.x - lean * 40, neck.y + 56); ctx.lineTo(neck.x - 7 - lean * 40, neck.y + 46); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = shadeHex(cos.tie, -.25); ctx.beginPath(); ctx.moveTo(neck.x - 5, neck.y + 1); ctx.lineTo(neck.x + 5, neck.y + 1); ctx.lineTo(neck.x + 3, neck.y + 9); ctx.lineTo(neck.x - 3, neck.y + 9); ctx.fill(); }
    if (cos.lapels) { const dk = shadeHex(tcol, -.35); ctx.fillStyle = shadeHex(tcol, .06); ctx.strokeStyle = INK; ctx.lineWidth = 2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(neck.x + sd * 12, neck.y - 1); ctx.lineTo(neck.x + sd * 22, neck.y + 14); ctx.lineTo(neck.x + sd * 15, neck.y + 22); ctx.lineTo(neck.x + sd * 4 - lean * 40, neck.y + 58); ctx.lineTo(neck.x + sd * 8, neck.y + 4); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.strokeStyle = dk; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(neck.x - lean * 40, neck.y + 58); ctx.lineTo(0, hipY + 10); ctx.stroke(); for (let b = 0; b < 2; b++) { ctx.fillStyle = '#1a1410'; ctx.beginPath(); ctx.arc(neck.x - lean * 40 + 7, neck.y + 66 + b * 14, 2.6, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.moveTo(neck.x + 22, neck.y + 30); ctx.lineTo(neck.x + 31, neck.y + 28); ctx.lineTo(neck.x + 30, neck.y + 33); ctx.closePath(); ctx.fill(); }
    if (cos.collar === 'shirt') { ctx.fillStyle = cos.shirt || shadeHex(tcol, .1); ctx.strokeStyle = INK; ctx.lineWidth = 2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(neck.x + sd * 2, neck.y + 10); ctx.lineTo(neck.x + sd * 14, neck.y - 2); ctx.lineTo(neck.x + sd * 18, neck.y + 12); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
    if (cos.buttons) { ctx.strokeStyle = shadeHex(tcol, -.3); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(neck.x - lean * 30, neck.y + 10); ctx.lineTo(0, hipY + 8); ctx.stroke(); ctx.fillStyle = shadeHex(tcol, -.45); for (let b = 0; b < 4; b++) { const u = (b + .6) / 4.6; ctx.beginPath(); ctx.arc(neck.x * (1 - u) + 3 - lean * 30 * (1 - u), neck.y + 10 + (hipY - neck.y) * u, 2.2, 0, 7); ctx.fill(); } }
    if (cos.collar === 'leather') { ctx.fillStyle = shadeHex(tcol, .1); ctx.strokeStyle = INK; ctx.lineWidth = 2; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(neck.x + sd * 6, neck.y + 2); ctx.lineTo(neck.x + sd * 24, neck.y + 4); ctx.lineTo(neck.x + sd * 20, neck.y + 26); ctx.lineTo(neck.x + sd * 4, neck.y + 30); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
    if (cos.collar === 'v' || cos.collar === 'round') { ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.fillStyle = SKIN_SH; ctx.beginPath(); if (cos.collar === 'v') { ctx.moveTo(neck.x - 14, neck.y); ctx.lineTo(neck.x, neck.y + 22); ctx.lineTo(neck.x + 14, neck.y); } else { ctx.moveTo(neck.x - 14, neck.y); ctx.quadraticCurveTo(neck.x, neck.y + 18, neck.x + 14, neck.y); } ctx.fill(); ctx.stroke(); }
    if (cos.collar === 'wrap') { ctx.strokeStyle = cos.trim || shadeHex(tcol, .3); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(neck.x - 14, neck.y + 1); ctx.quadraticCurveTo(neck.x + 4, neck.y + 30, neck.x + 22, neck.y + 52); ctx.stroke(); ctx.beginPath(); ctx.moveTo(neck.x + 14, neck.y + 1); ctx.lineTo(neck.x + 6, neck.y + 18); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(neck.x - 14, neck.y + 5); ctx.quadraticCurveTo(neck.x + 2, neck.y + 34, neck.x + 20, neck.y + 57); ctx.stroke(); }
    if (cos.zip) { ctx.strokeStyle = '#8a8a8e'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(neck.x + 5, neck.y + 28); ctx.lineTo(5, hipY + 8); ctx.stroke(); ctx.fillStyle = '#b8b8bc'; ctx.fillRect(neck.x + 2, neck.y + 30, 6, 8); }
    if (cos.patches) { ctx.fillStyle = shadeHex(tcol, -.15); ctx.strokeStyle = shadeHex(tcol, -.45); ctx.lineWidth = 1.4; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.rect(8, (neck.y + hipY) / 2, 16, 14); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); }
    if (cos.wrap) { ctx.fillStyle = cos.wrap; ctx.fillRect(-60, hipY - 16, 120, 44); ctx.strokeStyle = shadeHex(cos.wrap, -.35); ctx.lineWidth = 1.6; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(-40 + k * 15, hipY - 14); ctx.lineTo(-36 + k * 15, hipY + 22); ctx.stroke(); } }
    if (cos.belt) { ctx.fillStyle = cos.belt; ctx.fillRect(-60, hipY - 6, 120, 9); ctx.fillStyle = '#c9a25a'; ctx.fillRect(neck.x * .1 - 6, hipY - 7, 12, 11); }
    if (cos.fur) { ctx.strokeStyle = shadeHex(cos.torso, -.32); ctx.lineWidth = 1.6; ctx.lineCap = 'round'; for (let k = 0; k < 34; k++) { const fx = -shW + (k * 37 % 80), fy = neck.y + 14 + (k * 53 % 84); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + 4, fy + 4, fx + 3, fy + 9); ctx.stroke(); } }
    if (cos.strap) { ctx.strokeStyle = cos.strap; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(neck.x - shW * .7, neck.y + 8); ctx.lineTo(hipW + 2, hipY - 6); ctx.stroke(); ctx.strokeStyle = 'rgba(255,220,170,.25)'; ctx.lineWidth = 2; ctx.stroke(); }
    if (cos.beads) { for (let k = 0; k < 11; k++) { const a = Math.PI * .12 + k / 10 * Math.PI * .76; ctx.fillStyle = k % 2 ? cos.beads : '#b8442e'; ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(neck.x + Math.cos(a) * 22, neck.y + 4 + Math.sin(a) * 20, 3.6, 0, 7); ctx.fill(); ctx.stroke(); } }
    // fabric folds near the arm pits and waist
    ctx.strokeStyle = shadeHex(tcol, -.32); ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(neck.x + shW * .55, neck.y + 30); ctx.quadraticCurveTo(neck.x + shW * .35, neck.y + 42, neck.x + shW * .42, neck.y + 54); ctx.moveTo(-hipW * .5, hipY - 18); ctx.quadraticCurveTo(-hipW * .3, hipY - 8, -hipW * .45, hipY + 2); ctx.stroke();
    ctx.restore();
    // outline + warm rim on the lit (front) edge
    torso(); ctx.strokeStyle = INK; ctx.lineWidth = 3.4; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.save(); torso(); ctx.clip(); ctx.strokeStyle = 'rgba(255,224,176,.55)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(neck.x + shW - 3, neck.y + 18); ctx.bezierCurveTo(shW + 1 + neck.x * .4, neck.y + 42, hipW + 5 + wide, hipY - 20, hipW + 1 + wide, hipY + 6); ctx.stroke(); ctx.restore();
    if (folded) leg(1, true);
    if (cos.wrap) { ctx.fillStyle = cos.wrap; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-hipW - 6, hipY - 8); ctx.lineTo(hipW + 8, hipY - 8); ctx.lineTo(hipW + 12, hipY + 26); ctx.lineTo(hipW * .3, hipY + 34); ctx.lineTo(-hipW * .2, hipY + 24); ctx.lineTo(-hipW - 10, hipY + 30); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = shadeHex(cos.wrap, -.35); ctx.lineWidth = 1.6; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-hipW + k * 16, hipY - 4); ctx.lineTo(-hipW + 4 + k * 16, hipY + 24); ctx.stroke(); } }
    if (cos.dressLen) { const dl = cos.dressLen * 100; const dress = () => { ctx.beginPath(); ctx.moveTo(-hipW - 6, hipY - 6); ctx.lineTo(hipW + 8, hipY - 6); ctx.quadraticCurveTo(hipW + 22, hipY + dl * .6, hipW + 26, hipY + dl); ctx.quadraticCurveTo(0, hipY + dl + 10, -hipW - 24, hipY + dl); ctx.quadraticCurveTo(-hipW - 18, hipY + dl * .6, -hipW - 6, hipY - 6); ctx.closePath(); };
      dress(); ctx.fillStyle = tcol; ctx.fill(); ctx.save(); dress(); ctx.clip(); ctx.fillStyle = shadeHex(tcol, -.2); ctx.fillRect(-hipW - 30, hipY - 10, hipW + 22, dl + 30); ctx.strokeStyle = shadeHex(tcol, -.35); ctx.lineWidth = 2; for (const fx of [-12, 4, 18]) { ctx.beginPath(); ctx.moveTo(fx * .5, hipY + 6); ctx.quadraticCurveTo(fx, hipY + dl * .5, fx * 1.2, hipY + dl + 4); ctx.stroke(); } if (cos.trim) { ctx.fillStyle = cos.trim; ctx.fillRect(-hipW - 30, hipY + dl - 6, hipW * 2 + 60, 8); } ctx.restore(); dress(); ctx.strokeStyle = INK; ctx.lineWidth = 3.2; ctx.stroke(); }
    // ---- head ----
    const hx = neck.x + Math.sin(lean) * 12, hy = neck.y - headR + 8;
    const hairCol = o.hairCol || '#3a2618', hairSh = shadeHex(hairCol, -.35), hairHi = shadeHex(hairCol, .35);
    if (o.hair === 'long') { ctx.fillStyle = hairSh; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx - headR * .1, hy - headR * 1.02); ctx.bezierCurveTo(hx - headR * 1.45, hy - headR * .8, hx - headR * 1.25, hy + headR * .9, hx - headR * 1.0, hy + headR * 1.3); ctx.quadraticCurveTo(hx - headR * .6, hy + headR * 1.2, hx - headR * .3, hy + headR * .8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = hexA('#000000', .25); ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(hx - headR * (.5 + k * .15), hy - headR * .4); ctx.quadraticCurveTo(hx - headR * (1.1 + k * .05), hy + headR * .3, hx - headR * (.95 - k * .08), hy + headR * 1.15); ctx.stroke(); } }
    ctx.fillStyle = SKIN; ctx.strokeStyle = INK; ctx.lineWidth = 3.6; ctx.beginPath(); ctx.arc(hx, hy, headR, 0, 7); ctx.fill();
    // cel shade crescent on the back-lower side
    ctx.save(); ctx.beginPath(); ctx.arc(hx, hy, headR, 0, 7); ctx.clip(); ctx.fillStyle = SKIN_SH; ctx.beginPath(); ctx.arc(hx + headR * .22, hy - headR * .1, headR * 1.02, 0, 7); ctx.arc(hx, hy, headR * 1.6, 0, 7, true); ctx.fill('evenodd'); ctx.restore();
    ctx.beginPath(); ctx.arc(hx, hy, headR, 0, 7); ctx.stroke();
    // hair shapes with highlight strand
    if (o.hair && o.hair !== 'none') {
      ctx.fillStyle = hairCol; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath();
      if (o.hair === 'short') { ctx.moveTo(hx - headR * .98, hy + headR * .05); ctx.bezierCurveTo(hx - headR * 1.08, hy - headR * 1.05, hx + headR * .6, hy - headR * 1.25, hx + headR * .95, hy - headR * .35); ctx.lineTo(hx + headR * .7, hy - headR * .5); ctx.lineTo(hx + headR * .62, hy - headR * .3); ctx.lineTo(hx + headR * .4, hy - headR * .52); ctx.lineTo(hx + headR * .25, hy - headR * .34); ctx.lineTo(hx + headR * .05, hy - headR * .55); ctx.lineTo(hx - headR * .2, hy - headR * .42); ctx.quadraticCurveTo(hx - headR * .6, hy - headR * .4, hx - headR * .62, hy + headR * .1); ctx.closePath(); }
      else if (o.hair === 'long') { ctx.moveTo(hx - headR * 1.02, hy + headR * .3); ctx.bezierCurveTo(hx - headR * 1.15, hy - headR * 1.1, hx + headR * .7, hy - headR * 1.3, hx + headR * .98, hy - headR * .25); ctx.quadraticCurveTo(hx + headR * .5, hy - headR * .7, hx - headR * .1, hy - headR * .5); ctx.quadraticCurveTo(hx - headR * .55, hy - headR * .3, hx - headR * .6, hy + headR * .3); ctx.closePath(); }
      else if (o.hair === 'swept') { ctx.moveTo(hx - headR * 1.0, hy + headR * .05); ctx.bezierCurveTo(hx - headR * 1.1, hy - headR * 1.3, hx + headR * .9, hy - headR * 1.35, hx + headR * 1.02, hy - headR * .45); ctx.quadraticCurveTo(hx + headR * .4, hy - headR * .95, hx - headR * .35, hy - headR * .55); ctx.quadraticCurveTo(hx - headR * .65, hy - headR * .3, hx - headR * .68, hy + headR * .08); ctx.closePath(); }
      else if (o.hair === 'bald') { for (const sd of [-1]) { ctx.moveTo(hx + sd * headR * .98, hy - headR * .3); ctx.quadraticCurveTo(hx + sd * headR * 1.12, hy + headR * .1, hx + sd * headR * .9, hy + headR * .38); ctx.quadraticCurveTo(hx + sd * headR * .72, hy, hx + sd * headR * .98, hy - headR * .3); } }
      else if (o.hair === 'curly') { for (let k = 0; k < 11; k++) { const a = Math.PI * .95 + k / 10 * Math.PI * 1.05, cx = hx + Math.cos(a) * headR * .9, cy = hy + Math.sin(a) * headR * .9; ctx.moveTo(cx + 15, cy); ctx.arc(cx, cy, 15, 0, 7); } }
      else if (o.hair === 'bun') { ctx.moveTo(hx - headR * .98, hy + headR * .05); ctx.bezierCurveTo(hx - headR * 1.08, hy - headR * 1.05, hx + headR * .6, hy - headR * 1.25, hx + headR * .95, hy - headR * .35); ctx.quadraticCurveTo(hx + headR * .3, hy - headR * .65, hx - headR * .62, hy + headR * .1); ctx.closePath(); ctx.moveTo(hx - headR * .2 + 20, hy - headR * 1.15); ctx.arc(hx - headR * .2, hy - headR * 1.15, 20, 0, 7); }
      ctx.fill(); ctx.stroke();
      if (o.hair !== 'bald') { ctx.strokeStyle = hairHi; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx - headR * .55, hy - headR * .62); ctx.quadraticCurveTo(hx - headR * .1, hy - headR * .95, hx + headR * .4, hy - headR * .85); ctx.stroke(); ctx.strokeStyle = hairSh; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - headR * .8, hy - headR * .2); ctx.quadraticCurveTo(hx - headR * .7, hy - headR * .7, hx - headR * .3, hy - headR * .85); ctx.stroke(); }
    }
    // face: few thick ink strokes, looking toward the facing side
    const mood = o.mood || 'neutral', bl = o.eyesClosed != null ? o.eyesClosed : blinkAmt(t, seed), ex = hx + 15, ey = hy + 2;
    ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    if (mood === 'happy' && !o.glasses) { ctx.lineWidth = 4.2; for (const dx of [-13, 13]) { ctx.beginPath(); ctx.moveTo(ex + dx - 7, ey + 2); ctx.quadraticCurveTo(ex + dx, ey - 8, ex + dx + 7, ey + 2); ctx.stroke(); } }
    else { const eh = 8.5 * (1 - bl * .9); for (const dx of [-13, 13]) { ctx.beginPath(); ctx.ellipse(ex + dx, ey, 5.2, Math.max(1, eh), 0, 0, 7); ctx.fill(); if (eh > 3) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + dx + 1.6, ey - 2.6, 1.6, 0, 7); ctx.fill(); ctx.fillStyle = INK; } } }
    const bt = { neutral: [0, 0], happy: [-2, 3], sad: [6, -3], angry: [-7, 3], worried: [7, -4], focus: [-3, 1], shocked: [0, 6] }[mood] || [0, 0];
    ctx.lineWidth = 4; for (const dx of [-13, 13]) { const inner = dx < 0 ? 1 : -1; ctx.beginPath(); ctx.moveTo(ex + dx - 8, ey - 14 + (inner < 0 ? bt[0] * .25 : -bt[0] * .25)); ctx.quadraticCurveTo(ex + dx, ey - 19 - bt[1], ex + dx + 8, ey - 14 + (inner > 0 ? bt[0] * .35 : -bt[0] * .12)); ctx.stroke(); }
    const talk = o.talk ? Math.abs(Math.sin(t * 13 + seed)) : 0, my = hy + 26, mw = 11;
    if (mood === 'happy' || talk > .2 || mood === 'shocked') { const open = mood === 'happy' ? 10 + talk * 4 : mood === 'shocked' ? 14 : 4 + talk * 10; ctx.beginPath(); if (mood === 'shocked') ctx.ellipse(ex, my + 4, 7, open * .7, 0, 0, 7); else { ctx.moveTo(ex - mw - 2, my - 1); ctx.quadraticCurveTo(ex, my + open * 1.6, ex + mw + 2, my - 1); ctx.closePath(); } ctx.fillStyle = '#5a1e18'; ctx.fill(); ctx.lineWidth = 3.4; ctx.stroke();
      ctx.save(); ctx.clip(); ctx.fillStyle = '#e07a7a'; ctx.beginPath(); ctx.ellipse(ex + 2, my + open * 1.3, 8, 5, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else { const mc = { sad: -5, angry: -3, worried: -4, smug: 3 }[mood] ?? 2; ctx.lineWidth = 3.8; ctx.beginPath(); ctx.moveTo(ex - mw, my); ctx.quadraticCurveTo(ex, my + mc, ex + mw, my - (mood === 'worried' ? 2 : 0)); ctx.stroke(); }
    if (mood === 'worried' || o.sweat) { ctx.fillStyle = '#8fd0f0'; ctx.strokeStyle = INK; ctx.lineWidth = 1.8; ctx.beginPath(); const sx = hx - headR * .55, sy = hy - headR * .45 + ((t * 30) % 12); ctx.moveTo(sx, sy - 8); ctx.quadraticCurveTo(sx + 6, sy + 2, sx, sy + 5); ctx.quadraticCurveTo(sx - 6, sy + 2, sx, sy - 8); ctx.fill(); ctx.stroke(); }
    if (o.glasses) { ctx.strokeStyle = INK; ctx.lineWidth = 2.6; for (const dx of [-13, 13]) { ctx.beginPath(); ctx.arc(ex + dx, ey, 11, 0, 7); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex + dx, ey, 7.5, -2.4, -1.6); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 2.6; } ctx.beginPath(); ctx.moveTo(ex - 2, ey - 1); ctx.lineTo(ex + 2, ey - 1); ctx.moveTo(ex - 24, ey - 1); ctx.lineTo(hx - headR * .55, ey - 4); ctx.stroke(); }
    if (o.beard) { ctx.fillStyle = hairCol; ctx.strokeStyle = INK; ctx.lineWidth = 2.8; ctx.beginPath(); ctx.moveTo(hx - headR * .62, hy + 6); ctx.bezierCurveTo(hx - headR * .55, hy + headR * 1.75, hx + headR * 1.0, hy + headR * 1.8, hx + headR * .96, hy + 8); ctx.quadraticCurveTo(hx + headR * .8, my + 2, ex + 14, my + 8); ctx.quadraticCurveTo(ex, my + 16, ex - 14, my + 8); ctx.quadraticCurveTo(hx - headR * .25, my + 4, hx - headR * .62, hy + 6); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex - 16, my - 6); ctx.quadraticCurveTo(ex, my - 13, ex + 16, my - 6); ctx.quadraticCurveTo(ex + 8, my - 2, ex, my - 5); ctx.quadraticCurveTo(ex - 8, my - 2, ex - 16, my - 6); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = hairHi; ctx.lineWidth = 1.8; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(hx - headR * .2 + k * 12, my + 14); ctx.lineTo(hx - headR * .15 + k * 12, my + 28); ctx.stroke(); } }
    if (o.hat) o.hat(ctx, hx, hy, headR);
    arm(1, true);
    ctx.restore();
  };
  // Walk helper: x position and phase so feet don't slide.
  C.walkX = (t, x0, x1, t0, dur, s = 1) => { const u = Math.min(1, Math.max(0, (t - t0) / dur)), x = x0 + (x1 - x0) * u, dist = Math.abs(x - x0); const stride = 84 * s; return { x, phase: dist / stride * Math.PI, moving: u > 0 && u < 1, facing: x1 >= x0 ? 1 : -1 }; };
  C.ease = ease; C.INK = INK; C.SKIN = SKIN; C.seg = seg; C.shadeHex = shadeHex; C.hexA = hexA; C.mitten = mitten;
  G.RIG = C;
})(typeof window !== 'undefined' ? window : globalThis);
