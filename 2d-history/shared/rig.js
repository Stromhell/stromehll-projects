// Character rig: round white-headed ink characters drawn on canvas.
// Figure is placed by its ground point (x, y = sole of the feet). Height ~ 300*s px at s=1.
(function (G) {
  const INK = '#1d1712', SKIN = '#fffdf8';
  const D2R = Math.PI / 180;
  const C = {};
  const hexA = (h, a) => { h = h.replace('#', ''); const n = parseInt(h, 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const shadeHex = (h, f) => { h = h.replace('#', ''); let r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16); const t = f < 0 ? [12, 8, 6] : [255, 248, 235], k = Math.abs(f); r += (t[0] - r) * k; g += (t[1] - g) * k; b += (t[2] - b) * k; return `rgb(${r | 0},${g | 0},${b | 0})`; };

  // Costume presets: colours for each part. Missing keys fall back to 'shirt'.
  const COSTUMES = {
    hide: { torso: '#9a6a42', sleeve: null, legs: SKIN, wrap: '#7a4e2e', shoes: null, belt: '#4a2e1a', skinLimbs: true, strap: '#5a3a22', fur: true },
    hideBare: { torso: SKIN, sleeve: null, legs: SKIN, wrap: '#8b5e3a', shoes: null, belt: '#5a3a22', skinLimbs: true, strap: '#6a4428' },
    hideW: { torso: '#a8784c', sleeve: null, legs: SKIN, wrap: '#8b5e3a', shoes: null, skinLimbs: true, dressLen: .55, beads: '#e8dcc0', fur: true },
    shirt: { torso: '#e9e1d0', sleeve: '#e9e1d0', legs: '#3b4352', shoes: '#2a1d14', belt: '#2a1d14' },
    suit: { torso: '#2e3440', sleeve: '#2e3440', legs: '#2e3440', shoes: '#151515', shirt: '#f2efe8', tie: '#8a2a24', lapels: true },
    suit80: { torso: '#4a4f5c', sleeve: '#4a4f5c', legs: '#4a4f5c', shoes: '#1d1712', shirt: '#dfe6f0', tie: '#7a2b2b', lapels: true },
    shirtsleeves: { torso: '#dfe6f0', sleeve: '#dfe6f0', legs: '#3e4450', shoes: '#1d1712', tie: '#7a2b2b', belt: '#1d1712' },
    leather: { torso: '#161616', sleeve: '#161616', legs: '#2a2e36', shoes: '#111', shirt: '#2b2b2b', zip: true },
    farmer: { torso: '#8f7a55', sleeve: '#8f7a55', legs: '#6e5a3c', shoes: '#4a3424', belt: '#3a2a1a' },
    dress: { torso: '#7a4a5a', sleeve: '#7a4a5a', legs: SKIN, shoes: '#2a1d14', dressLen: .8 },
    office: { torso: '#5d7088', sleeve: '#5d7088', legs: '#2f3540', shoes: '#1d1712', shirt: '#eef0f4' },
    robe: { torso: '#6b5a44', sleeve: '#6b5a44', legs: '#6b5a44', shoes: '#3a2a1a', dressLen: .95, belt: '#3a2a1a' },
    school: { torso: '#3d5a7a', sleeve: '#3d5a7a', legs: '#4a4038', shoes: '#2a1d14' },
    kid: { torso: SKIN, sleeve: null, legs: SKIN, wrap: '#8b5e3a', skinLimbs: true },
  };
  C.COSTUMES = COSTUMES;

  // limb as a tapered capsule from a to b
  function seg(ctx, ax, ay, bx, by, w0, w1, fill, outline = true) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    ctx.beginPath(); ctx.moveTo(ax + nx * w0, ay + ny * w0); ctx.lineTo(bx + nx * w1, by + ny * w1); ctx.arc(bx, by, w1, Math.atan2(ny, nx), Math.atan2(ny, nx) + Math.PI, false); ctx.lineTo(ax - nx * w0, ay - ny * w0); ctx.arc(ax, ay, w0, Math.atan2(-ny, -nx), Math.atan2(-ny, -nx) + Math.PI, false); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); if (outline) { ctx.strokeStyle = INK; ctx.lineWidth = outline === true ? 2.2 : outline; ctx.lineJoin = 'round'; ctx.stroke(); }
  }
  function limb(ctx, pts, w, fill, ink = true) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const path = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
    if (ink) { path(); ctx.strokeStyle = INK; ctx.lineWidth = w * 2 + 4.6; ctx.stroke(); }
    path(); ctx.strokeStyle = fill; ctx.lineWidth = w * 2; ctx.stroke();
  }
  const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
  // Eased blink: closes for ~0.28 s, sin^2 curve, on its own timer per figure.
  function blinkAmt(t, seed) { const period = 3.1 + (seed % 7) * .37, ph = ((t + seed * .61) % period); return ph < .28 ? Math.pow(Math.sin(ph / .28 * Math.PI), 2) : 0; }

  // Pose solver: returns joint angles (degrees, 0 = straight down) for a pose at time t.
  function poseAngles(o, t) {
    const P = { hipL: 0, kneeL: 0, hipR: 0, kneeR: 0, shL: 8, elL: -6, shR: -8, elR: -6, bob: 0, lean: 0, footL: 0, footR: 0 };
    const breathe = Math.sin(t * 2.1 + (o.seed || 0)) * .5 + .5;
    if (o.pose === 'walk' || o.pose === 'run') {
      const run = o.pose === 'run', ph = o.phase ?? (t * (run ? 9 : 5.4)), s = Math.sin(ph), c = Math.cos(ph);
      const amp = run ? 38 : 26, arm = run ? 50 : 34;
      P.hipL = amp * s; P.hipR = -amp * s;
      // knee bends in swing (when the leg moves forward) and slightly at contact
      P.kneeL = -(Math.max(0, c) * (run ? 70 : 42) + 6); P.kneeR = -(Math.max(0, -c) * (run ? 70 : 42) + 6);
      P.footL = Math.max(0, -s) * 18; P.footR = Math.max(0, s) * 18;
      P.shL = -arm * s * .9; P.shR = arm * s * .9; P.elL = -14 - Math.max(0, s) * 26; P.elR = -14 - Math.max(0, -s) * 26;
      P.bob = -Math.abs(Math.cos(ph)) * (run ? 10 : 6) + (run ? 0 : 3); P.lean = run ? 10 : 3;
    } else if (o.pose === 'sit') {
      P.hipL = 88; P.hipR = 84; P.kneeL = -86; P.kneeR = -90; P.sitDrop = 1; P.shL = 18 + breathe * 2; P.shR = 12; P.elL = -50; P.elR = -46; P.bob = 0;
    } else if (o.pose === 'squat' || o.pose === 'work') {
      P.hipL = 75; P.hipR = 50; P.kneeL = -140; P.kneeR = -110; P.lean = 24;
      const w = Math.sin(t * (o.workSpeed ?? 7)); P.shL = 55 + w * 14; P.elL = -40 - w * 18; P.shR = 40 - w * 10; P.elR = -60;
    } else if (o.pose === 'point') { P.shR = 95; P.elR = -5; P.shL = 8; P.elL = -10; }
    else if (o.pose === 'reach') { P.shR = 75; P.elR = -15; P.shL = 25; P.elL = -40; }
    else if (o.pose === 'carry') { P.shL = 30; P.elL = -75; P.shR = 35; P.elR = -75; }
    else if (o.pose === 'cheer') { P.shL = 160; P.elL = 10; P.shR = -160; P.elR = -10; }
    else if (o.pose === 'think') { P.shR = 25; P.elR = -150; P.shL = 10; P.elL = -60; }
    else if (o.pose === 'lie') { /* handled in draw */ }
    else { // stand idle: weight shift, small arm sway
      const sw = Math.sin(t * 1.3 + (o.seed || 0));
      P.hipL = 3 + sw * 1.5; P.hipR = -3 + sw * 1.5; P.kneeL = -2; P.kneeR = -2; P.shL = 7 + sw * 2; P.shR = -7 + sw * 2; P.elL = -8; P.elR = -8; P.bob = breathe * -1.5;
    }
    if (o.arms) Object.assign(P, o.arms(t, P));
    return P;
  }

  // Draw one figure. Options: x,y,s,facing(1 right,-1 left),pose,t,costume,mood,hair,hat,seed,props(fn for hand items),talk(bool)
  C.figure = (ctx, o) => {
    const t = o.t ?? 0, s = o.s ?? 1, F = o.facing ?? 1, cos = COSTUMES[o.costume] || COSTUMES.shirt, P = poseAngles(o, t);
    const seed = o.seed ?? 1;
    ctx.save(); ctx.translate(o.x, o.y);
    // contact shadow sits on the ground under the feet
    if (o.shadow !== false && o.pose !== 'lie') { ctx.save(); ctx.scale(1, .22); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 70 * s); g.addColorStop(0, `rgba(25,14,6,${o.shadowAlpha ?? .38})`); g.addColorStop(1, 'rgba(25,14,6,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 70 * s, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.pose === 'lie') { ctx.rotate(-Math.PI / 2 * F); ctx.translate(0, 18 * s); }
    ctx.scale(F * s, s);
    // proportions (unit = px at s=1)
    const shin = 60, thigh = 62, torsoH = 96, headR = 40, shW = 33, hipW = 22, armU = 50, armL = 48;
    const sitting = o.pose === 'sit', squat = o.pose === 'squat' || o.pose === 'work';
    // place the hips so the lowest foot rests exactly on the ground line (no floating, no sinking)
    const footRel = (h, k) => thigh * Math.cos(h * D2R) + shin * Math.cos((h + k) * D2R);
    const hipY = -5 - Math.max(footRel(P.hipL, P.kneeL), footRel(P.hipR, P.kneeR)) + (o.pose === 'walk' || o.pose === 'run' ? 0 : P.bob * .4);
    if (o.out) { o.out.hipY = hipY * s; o.out.seatY = (hipY + 12) * s; o.out.headY = (hipY - torsoH - 80) * s; }
    const lean = (P.lean + (o.lean || 0)) * D2R;
    const neck = { x: Math.sin(lean) * torsoH, y: hipY - Math.cos(lean) * torsoH };
    const legCol = (near) => cos.skinLimbs ? (near ? SKIN : shadeHex('fffdf8', -.12)) : (near ? cos.legs : shadeHex(cos.legs, -.25));
    const armCol = (near) => (cos.sleeve ? (near ? cos.sleeve : shadeHex(cos.sleeve, -.25)) : (near ? SKIN : shadeHex('fffdf8', -.12)));
    const leg = (side, near) => {
      const hx = side * hipW * .5, a1 = P[side < 0 ? 'hipL' : 'hipR'] * D2R, a2 = a1 + P[side < 0 ? 'kneeL' : 'kneeR'] * D2R;
      const kx = hx + Math.sin(a1) * thigh, ky = hipY + Math.cos(a1) * thigh, fx = kx + Math.sin(a2) * shin, fy = ky + Math.cos(a2) * shin;
      const c = legCol(near);
      // shoe / foot first so the leg overlaps its top
      const fa = (P[side < 0 ? 'footL' : 'footR'] || 0) * D2R;
      ctx.save(); ctx.translate(fx, fy); ctx.rotate(-fa); ctx.fillStyle = cos.shoes ? (near ? cos.shoes : shadeHex(cos.shoes, -.2)) : c; ctx.strokeStyle = INK; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(-9, -8); ctx.quadraticCurveTo(-11, 6, 0, 6); ctx.lineTo(21, 6); ctx.quadraticCurveTo(25, -3, 13, -8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      limb(ctx, [[hx, hipY], [kx, ky], [fx, fy - 4]], 10.5, c);
      if (!cos.skinLimbs && cos.legs) { ctx.strokeStyle = shadeHex(cos.legs.replace('#',''), -.35); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(kx + 3, ky - 6); ctx.lineTo(kx - 2, ky + 6); ctx.stroke(); }
    };
    const arm = (side, near) => {
      const sx = neck.x + side * shW * .62, sy = neck.y + 14, a1 = P[side < 0 ? 'shL' : 'shR'] * D2R, a2 = a1 - P[side < 0 ? 'elL' : 'elR'] * D2R;
      const ex = sx + Math.sin(a1) * armU, ey = sy + Math.cos(a1) * armU, hx = ex + Math.sin(a2) * armL, hy = ey + Math.cos(a2) * armL;
      const c = armCol(near), skin = near ? SKIN : shadeHex('fffdf8', -.12);
      if (cos.sleeve && !cos.short) { limb(ctx, [[sx, sy], [ex, ey], [hx - Math.sin(a2) * 8, hy - Math.cos(a2) * 8]], 8.6, c); }
      else limb(ctx, [[sx, sy], [ex, ey], [hx, hy]], 7.6, skin);
      ctx.fillStyle = skin; ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.ellipse(hx + Math.sin(a2) * 2, hy + Math.cos(a2) * 2, 8.5, 9.5, -a2, 0, 7); ctx.fill(); ctx.stroke();
      if (o.hold && o.hold[near ? 'near' : 'far']) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(-a2); o.hold[near ? 'near' : 'far'](ctx, t); ctx.restore(); }
    };
    // far limbs first (darker), body, near limbs in front
    leg(-1, false); arm(-1, false);
    // torso as a tapered bezier shape
    const tcol = cos.torso;
    ctx.save(); ctx.beginPath(); const bx = Math.sin(lean) * 0;
    ctx.moveTo(-hipW - 2, hipY + 8); ctx.quadraticCurveTo(-shW - 6 + neck.x * .5, (hipY + neck.y) / 2, neck.x - shW, neck.y + 10);
    ctx.quadraticCurveTo(neck.x, neck.y - 4, neck.x + shW, neck.y + 10); ctx.quadraticCurveTo(shW + 8 + neck.x * .5, (hipY + neck.y) / 2, hipW + 4, hipY + 8); ctx.closePath();
    const tg = ctx.createLinearGradient(-shW, 0, shW, 0); tg.addColorStop(0, shadeHex(tcol, -.18)); tg.addColorStop(.6, tcol); tg.addColorStop(1, shadeHex(tcol, .08)); ctx.fillStyle = tg; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.clip();
    if (cos.shirt) { ctx.fillStyle = cos.shirt; ctx.beginPath(); ctx.moveTo(neck.x - 9, neck.y + 4); ctx.lineTo(neck.x + 9, neck.y + 4); ctx.lineTo(neck.x + 3 + Math.sin(lean) * -40, neck.y + 52); ctx.lineTo(neck.x - 3 + Math.sin(lean) * -40, neck.y + 52); ctx.fill(); }
    if (cos.tie) { ctx.fillStyle = cos.tie; ctx.beginPath(); ctx.moveTo(neck.x - 4, neck.y + 8); ctx.lineTo(neck.x + 4, neck.y + 8); ctx.lineTo(neck.x + 6 - lean * 30, neck.y + 46); ctx.lineTo(neck.x - lean * 30, neck.y + 54); ctx.lineTo(neck.x - 6 - lean * 30, neck.y + 46); ctx.fill(); }
    if (cos.lapels) { ctx.strokeStyle = shadeHex(tcol, -.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(neck.x - 12, neck.y + 6); ctx.lineTo(neck.x - 4 - lean * 30, neck.y + 50); ctx.moveTo(neck.x + 12, neck.y + 6); ctx.lineTo(neck.x + 4 - lean * 30, neck.y + 50); ctx.stroke(); for (let b = 0; b < 2; b++) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(neck.x - lean * 40 + 8, neck.y + 58 + b * 14, 2, 0, 7); ctx.fill(); } }
    if (cos.zip) { ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(neck.x + 4, neck.y + 6); ctx.lineTo(4, hipY + 6); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(neck.x + 16, neck.y + 18); ctx.lineTo(18, hipY - 10); ctx.stroke(); }
    if (cos.wrap) { ctx.fillStyle = cos.wrap; ctx.fillRect(-40, hipY - 14, 80, 40); ctx.strokeStyle = shadeHex(cos.wrap, -.35); ctx.lineWidth = 1.5; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-30 + k * 16, hipY - 12); ctx.lineTo(-26 + k * 16, hipY + 22); ctx.stroke(); } }
    if (cos.belt) { ctx.fillStyle = cos.belt; ctx.fillRect(-40, hipY - 4, 80, 7); }
    if (cos.fur) { ctx.strokeStyle = shadeHex(cos.torso.replace('#',''), -.3); ctx.lineWidth = 1.3; for (let k = 0; k < 26; k++) { const fx = -shW + (k * 37 % 66), fy = neck.y + 20 + (k * 53 % 90); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + 3, fy + 7); ctx.stroke(); } }
    if (cos.strap) { ctx.strokeStyle = cos.strap; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(neck.x - shW * .7, neck.y + 10); ctx.lineTo(hipW + 2, hipY - 6); ctx.stroke(); }
    if (cos.beads) { for (let k = 0; k < 9; k++) { const a = Math.PI * .15 + k / 8 * Math.PI * .7; ctx.fillStyle = k % 2 ? cos.beads : '#b8442e'; ctx.beginPath(); ctx.arc(neck.x + Math.cos(a) * 20, neck.y + 6 + Math.sin(a) * 18, 3.2, 0, 7); ctx.fill(); } }
    ctx.restore();
    if (cos.wrap) { ctx.fillStyle = cos.wrap; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-hipW - 4, hipY - 6); ctx.lineTo(hipW + 6, hipY - 6); ctx.lineTo(hipW + 8, hipY + 26); ctx.lineTo(2, hipY + 32); ctx.lineTo(-hipW - 6, hipY + 26); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    if (cos.dressLen) { const dl = cos.dressLen * 110; ctx.fillStyle = cos.torso; ctx.strokeStyle = INK; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-hipW - 4, hipY - 4); ctx.lineTo(hipW + 6, hipY - 4); ctx.lineTo(hipW + 22, hipY + dl); ctx.quadraticCurveTo(0, hipY + dl + 8, -hipW - 20, hipY + dl); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    leg(1, true);
    // head
    const hx = neck.x + Math.sin(lean) * 10, hy = neck.y - headR + 4;
    if (o.hair === 'long') { ctx.fillStyle = o.hairCol || '#2a1d14'; ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - headR * .2, hy - headR * 1.02); ctx.quadraticCurveTo(hx - headR * 1.35, hy - headR * .6, hx - headR * 1.05, hy + headR * 1.25); ctx.lineTo(hx - headR * .2, hy + headR * .9); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = SKIN; ctx.strokeStyle = INK; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(hx, hy, headR * .92, headR, 0, 0, 7); ctx.fill(); ctx.stroke();
    const sh = ctx.createRadialGradient(hx + 12, hy - 14, 4, hx, hy, headR); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(120,90,60,.16)'); ctx.fillStyle = sh; ctx.beginPath(); ctx.ellipse(hx, hy, headR * .92, headR, 0, 0, 7); ctx.fill();
    // hair
    if (o.hair) { ctx.fillStyle = o.hairCol || '#2a1d14'; ctx.beginPath(); if (o.hair === 'short') { ctx.ellipse(hx - 4, hy - headR * .55, headR * .9, headR * .5, -.15, Math.PI * .95, Math.PI * 2.05); } else if (o.hair === 'long') { ctx.ellipse(hx - 6, hy - headR * .5, headR * .95, headR * .6, -.1, Math.PI * .92, Math.PI * 2.08); } else if (o.hair === 'bald') { ctx.ellipse(hx - 26, hy - 4, 10, 18, 0, 0, 7); } else if (o.hair === 'curly') { for (let k = 0; k < 10; k++) { const a = Math.PI + k / 9 * Math.PI; ctx.moveTo(hx + Math.cos(a) * headR * .85, hy + Math.sin(a) * headR * .85); ctx.arc(hx + Math.cos(a) * headR * .85, hy + Math.sin(a) * headR * .85, 11, 0, 7); } } else if (o.hair === 'swept') { ctx.moveTo(hx - headR, hy - 4); ctx.quadraticCurveTo(hx - headR, hy - headR * 1.25, hx + headR * .4, hy - headR * 1.05); ctx.quadraticCurveTo(hx + headR * .9, hy - headR * .9, hx + headR * .8, hy - headR * .55); ctx.quadraticCurveTo(hx, hy - headR * .8, hx - headR * .7, hy - 2); } ctx.fill(); }
    // face (looks toward facing direction)
    const bl = blinkAmt(t, seed), ex = hx + 13, ey = hy - 2, eh = 7.5 * (1 - bl * .92);
    ctx.fillStyle = INK; for (const dx of [-11, 11]) { ctx.beginPath(); ctx.ellipse(ex + dx, ey, 4.6, Math.max(.8, eh), 0, 0, 7); ctx.fill(); }
    const mood = o.mood || 'neutral', bt = { neutral: [0, 0], happy: [-2, 2], sad: [5, -3], angry: [-6, 3], worried: [6, -4], focus: [-3, 1] }[mood] || [0, 0];
    ctx.lineCap = 'round'; for (const dx of [-11, 11]) { const inner = dx < 0 ? 1 : -1; ctx.beginPath(); ctx.moveTo(ex + dx - 7, ey - 13 + (inner < 0 ? bt[0] * .2 : -bt[0] * .2)); ctx.quadraticCurveTo(ex + dx, ey - 17 - bt[1], ex + dx + 7, ey - 13 + (inner > 0 ? bt[0] * .3 : -bt[0] * .1)); ctx.strokeStyle = INK; ctx.lineWidth = 3.4; ctx.stroke(); }
    const talk = o.talk ? Math.abs(Math.sin(t * 13 + seed)) : 0, mw = 9, mc = { happy: 5, sad: -4, angry: -2, worried: -3 }[mood] || 1;
    ctx.beginPath(); ctx.moveTo(ex - mw, hy + 18); ctx.quadraticCurveTo(ex, hy + 18 + mc + talk * 6, ex + mw, hy + 18); if (talk > .2) { ctx.quadraticCurveTo(ex, hy + 18 + mc + talk * 10, ex - mw, hy + 18); ctx.fillStyle = INK; ctx.fill(); } ctx.lineWidth = 3; ctx.stroke();
    if (o.glasses) { ctx.strokeStyle = INK; ctx.lineWidth = 2; for (const dx of [-11, 11]) { ctx.beginPath(); ctx.arc(ex + dx, ey, 9, 0, 7); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(ex - 2, ey); ctx.lineTo(ex + 2, ey); ctx.stroke(); }
    if (o.beard) { ctx.fillStyle = o.hairCol || '#2a1d14'; ctx.beginPath(); ctx.moveTo(hx - headR * .7, hy + 6); ctx.quadraticCurveTo(hx + 8, hy + headR * 1.25, hx + headR * .85, hy + 4); ctx.quadraticCurveTo(hx + 10, hy + 28, hx - headR * .7, hy + 6); ctx.fill(); }
    if (o.hat) o.hat(ctx, hx, hy, headR);
    arm(1, true);
    ctx.restore();
  };
  // Walk helper: returns x position and phase so feet don't slide (stride matched to distance).
  C.walkX = (t, x0, x1, t0, dur, s = 1) => { const u = Math.min(1, Math.max(0, (t - t0) / dur)), x = x0 + (x1 - x0) * u, dist = Math.abs(x - x0); const stride = 118 * s; return { x, phase: dist / stride * Math.PI, moving: u > 0 && u < 1, facing: x1 >= x0 ? 1 : -1 }; };
  C.ease = ease; C.INK = INK; C.SKIN = SKIN; C.seg = seg; C.shadeHex = shadeHex; C.hexA = hexA;
  G.RIG = C;
})(typeof window !== 'undefined' ? window : globalThis);
