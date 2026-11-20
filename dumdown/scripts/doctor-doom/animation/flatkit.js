// DumDown "flat storybook" character kit (Doctor Doom video, Nov 2026).
// Our own design: bean heads, big oval eyes, soft horizontal gradient shading, no ink lines.
// Canvas-2D only. Figure origin = point between the feet; at s=1 a grown-up is ~1000 px tall (plate space 2560x1440).
(function () {
const F = {};
// ---------- colour helpers ----------
const hex = c => { if (c.startsWith('rgb')) return c.match(/[\d.]+/g).slice(0, 3).map(Number); c = c.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(c.substr(i, 2), 16)); };
const rgb = (a) => `rgb(${a.map(v => Math.round(Math.max(0, Math.min(255, v)))).join(',')})`;
const mixc = (c, d, k) => { const a = hex(c), b = hex(d); return rgb(a.map((v, i) => v + (b[i] - v) * k)); };
const lite = (c, k = .14) => mixc(c, '#ffffff', k), dark = (c, k = .16) => mixc(c, '#1a1020', k);
F.lite = lite; F.dark = dark; F.mixc = mixc;
// horizontal soft shading: light on the left (key light), shade on the right
function sh(ctx, c, x0, x1, ang = 0) { const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, lite(c, .10)); g.addColorStop(.62, c); g.addColorStop(1, dark(c, .18)); return g; }
F.sh = sh;
function rr(ctx, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
F.rr = rr;
const D2R = Math.PI / 180;
// ---------- poses (arm angles from straight down; + = away from body; el = extra bend at elbow, + = forearm swings up/inward) ----------
const P = (L, R, o = {}) => Object.assign({ L, R }, o);
F.POSES = {
  stand: P([8, 6], [8, 6]),
  wave: P([8, 6], [150, 25], { handR: 'open' }),
  point: P([8, 6], [95, 0], { handR: 'point' }),
  pointL: P([95, 0], [8, 6], { handL: 'point' }),
  cross: P([60, -150], [60, -150], { cross: true }),
  shrug: P([45, -80], [45, -80], { handL: 'open', handR: 'open' }),
  hips: P([40, -95], [40, -95]),
  raise: P([150, 10], [150, 10], { handL: 'open', handR: 'open' }),
  cheer: P([140, 25], [140, 25], { handL: 'fist', handR: 'fist' }),
  cast: P([70, -30], [70, -30], { handL: 'open', handR: 'open', glow: true }),
  castUp: P([150, 0], [150, 0], { handL: 'open', handR: 'open', glow: true }),
  think: P([10, 6], [20, -160], { handR: 'fist' }),
  chin: P([60, -150], [20, -160], { handR: 'fist' }),
  hold: P([25, -110], [25, -110]),            // both hands forward at belly (carry / hold an object)
  holdR: P([8, 6], [25, -110]),             // right hand forward
  holdUp: P([60, -130], [60, -130]),          // both hands up at chest height, holding something up
  reach: P([8, 6], [80, 10], { handR: 'open' }),
  fist: P([8, 6], [150, -10], { handR: 'fist' }),
  facepalm: P([8, 6], [30, -170], { handR: 'open' }),
  clasp: P([25, -130], [25, -130], { clasp: true }),
  hug: P([70, -100], [70, -100]),
  armsOut: P([95, 0], [95, 0], { handL: 'open', handR: 'open' }),
  scared: P([40, -160], [40, -160], { handL: 'open', handR: 'open' }),
  sit: P([25, -110], [25, -110], { sit: true }),
  kneel: P([25, -110], [30, -110], { kneel: true }),
  lie: P([8, 6], [8, 6], { lie: true }),
  type: P([30, -110], [30, -110])
};
// ---------- animation helpers ----------
F.blink = t => ((t + 1.3) % 3.6) < .13;
// ---------- cast specs ----------
const SK = { a: '#f6c9a0', b: '#ffd7b3', c: '#e7ad84', d: '#c98b5e', e: '#a8714a', purple: '#9a6fd0', grey: '#cfd3d6' };
F.SK = SK;
// head/body sizes in px at s=1
const HW = 330, HH = 345, TW = 300, TH = 290, LH = 205;
// ---------- the figure ----------
// o: {x,y,s,view:'front'|'tq'|'back', dir:1|-1, pose, expr, t, talk, look:[dx,dy], walk:phase or null, bob, tilt, glow}
F.draw = function (ctx, spec, o) {
  const t = o.t || 0, s = (o.s || 1) * (spec.scale || 1), dir = o.dir || 1, view = o.view || 'front';
  const pose = typeof o.pose === 'string' ? (F.POSES[o.pose] || F.POSES.stand) : (o.pose || F.POSES.stand);
  const kid = spec.kid ? 1 : 0;
  const breath = Math.sin(t * 2 * Math.PI / 3.2);
  const walking = o.walk != null;
  const wph = walking ? o.walk : 0;
  const bob = (o.bob || 0) + (walking ? -Math.abs(Math.sin(wph * Math.PI)) * 14 : breath * 3) + (pose.kneel ? 120 : 0) + (pose.sit ? 130 : 0);
  const tq = view === 'tq' ? 1 : 0, back = view === 'back';
  const bw = TW * (spec.bodyW || 1) * (tq ? .9 : 1) * (kid ? .8 : 1), th = TH * (kid ? .72 : 1) * (spec.bodyH || 1), lh = LH * (kid ? .7 : 1) * (spec.legH || 1);
  const hs = (spec.headS || 1) * (kid ? 1.08 : 1), hw = HW * hs, hh = HH * hs;
  ctx.save(); ctx.translate(o.x, o.y); ctx.scale(s * dir, s);
  if (o.rot) ctx.rotate(o.rot * D2R * dir);
  if (pose.lie) { ctx.rotate(-90 * D2R); ctx.translate(-120, 0); }
  // ground shadow
  if (!o.noShadow && !pose.lie) { ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = '#1b1426'; ctx.beginPath(); ctx.ellipse(0, 6, bw * .78, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
  if (spec.glowAura) { const gr = ctx.createRadialGradient(0, -500, 50, 0, -500, 700); gr.addColorStop(0, spec.glowAura.replace('A', .55)); gr.addColorStop(1, spec.glowAura.replace('A', 0)); ctx.fillStyle = gr; ctx.fillRect(-800, -1300, 1600, 1500); }
  const hipY = -lh + bob * .2, shY = hipY - th + bob * .6, neckY = shY;
  const lean = (o.lean || 0) * D2R;
  // ---- cloak behind ----
  if (spec.cloak && !back) cloak(ctx, spec, bw, shY, t, o);
  // ---- legs ----
  legs(ctx, spec, bw, lh, hipY, wph, walking, pose, view);
  // ---- body ----
  ctx.save(); ctx.translate(0, hipY); ctx.rotate(lean); ctx.translate(0, -hipY);
  const armW = 70 * (spec.armW || 1) * (kid ? .85 : 1), armL = 140 * (kid ? .78 : 1) * (spec.armL || 1);
  const shx = bw / 2 - armW * .42;
  // far arm (tq) drawn behind torso
  const swing = walking ? Math.sin(wph * Math.PI * 2) * 22 : 0;
  const aL = [pose.L[0] + breath * 1.5 - swing, pose.L[1]], aR = [pose.R[0] + breath * 1.5 + swing, pose.R[1]];
  if (tq && !back) arm(ctx, spec, -shx * .8, shY + 30, aL, -1, armW, armL, pose.handL, t, pose, true);
  torso(ctx, spec, bw, th, hipY, shY, view, t);
  if (back) { arm(ctx, spec, -shx, shY + 30, aL, -1, armW, armL, pose.handL, t, pose); arm(ctx, spec, shx, shY + 30, aR, 1, armW, armL, pose.handR, t, pose); }
  if (back && spec.cloak) { ctx.save(); ctx.translate(0, 0); cloakBack(ctx, spec, bw, shY, hipY, t, o); ctx.restore(); }
  // ---- head ----
  const tilt = ((o.tilt || 0) + Math.sin(t * .9) * 1.2) * D2R;
  ctx.save(); ctx.translate(0, neckY + 20); ctx.rotate(tilt);
  head(ctx, spec, hw, hh, view, o, t, pose);
  ctx.restore();
  if (!back) { if (!tq) arm(ctx, spec, -shx, shY + 30, aL, -1, armW, armL, pose.handL, t, pose); arm(ctx, spec, shx, shY + 30, aR, 1, armW, armL, pose.handR, t, pose); }
  if (pose.glow || o.glow) { for (const sd of [-1, 1]) { const w = F._wr[sd]; if (!w) continue; const gr = ctx.createRadialGradient(w[0], w[1], 0, w[0], w[1], 140); const gc = spec.magic || '120,255,160'; gr.addColorStop(0, `rgba(${gc},.9)`); gr.addColorStop(.35, `rgba(${gc},.35)`); gr.addColorStop(1, `rgba(${gc},0)`); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(w[0], w[1], 140 + Math.sin(t * 8) * 10, 0, 7); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; } }
  ctx.restore();
  ctx.restore();
};
// wrist positions (local, before figure transform) of the last drawn figure, by side -1/1
F._wr = {};
F.wrist = function (spec, o, side = 1) { // world position of a hand, recomputed from the pose (for props held in hands)
  const s = (o.s || 1) * (spec.scale || 1), dir = o.dir || 1, kid = spec.kid ? 1 : 0;
  const pose = typeof o.pose === 'string' ? (F.POSES[o.pose] || F.POSES.stand) : (o.pose || F.POSES.stand);
  const lh = LH * (kid ? .7 : 1) * (spec.legH || 1), th = TH * (kid ? .72 : 1) * (spec.bodyH || 1), bw = TW * (spec.bodyW || 1) * (o.view === 'tq' ? .9 : 1) * (kid ? .8 : 1);
  const bob = (o.bob || 0) + (pose.kneel ? 120 : 0) + (pose.sit ? 130 : 0);
  const armW = 70 * (spec.armW || 1) * (kid ? .85 : 1), armL = 140 * (kid ? .78 : 1) * (spec.armL || 1);
  const hipY = -lh + bob * .2, shY = hipY - th + bob * .6, shx = bw / 2 - armW * .42;
  const a = side < 0 ? pose.L : pose.R; const sx = side * shx, sy = shY + 30;
  const a1 = a[0] * D2R, a2 = (a[0] + a[1]) * D2R;
  let ex = sx + side * Math.sin(a1) * armL, ey = sy + Math.cos(a1) * armL; let wx = ex + side * Math.sin(a2) * armL * .95, wy = ey + Math.cos(a2) * armL * .95;
  return { x: o.x + wx * s * dir, y: o.y + wy * s, s };
};
F.headTop = function (spec, o) { const s = (o.s || 1) * (spec.scale || 1), kid = spec.kid ? 1 : 0; const lh = LH * (kid ? .7 : 1) * (spec.legH || 1), th = TH * (kid ? .72 : 1) * (spec.bodyH || 1); const hh = HH * (spec.headS || 1) * (kid ? 1.08 : 1);
  const pose = typeof o.pose === 'string' ? (F.POSES[o.pose] || F.POSES.stand) : (o.pose || F.POSES.stand); const bob = (pose.kneel ? 120 : 0) + (pose.sit ? 130 : 0);
  return { x: o.x, y: o.y + (-lh + bob * .2 - th + bob * .6 + 20 - hh - 60) * s, s }; };
F.height = (spec, s = 1) => (LH * (spec.kid ? .7 : 1) * (spec.legH || 1) + TH * (spec.kid ? .72 : 1) * (spec.bodyH || 1) + HH * (spec.headS || 1) * (spec.kid ? 1.08 : 1) + 40) * s * (spec.scale || 1);

function legs(ctx, spec, bw, lh, hipY, wph, walking, pose, view) {
  const lw = 72 * (spec.legW || 1) * (spec.kid ? .82 : 1), gap = bw * .19;
  const col = spec.legs || '#3a3a46', shoe = spec.shoes || '#2a1d16';
  if (spec.robe || spec.noLegs) { // long robe: only shoes peek out
    for (const sd of [-1, 1]) { ctx.fillStyle = shoe; ctx.beginPath(); ctx.ellipse(sd * gap, -8, lw * .85, 24, 0, 0, 7); ctx.fill(); }
    return; }
  for (const sd of [-1, 1]) {
    let ang = 0; if (walking) ang = Math.sin(wph * Math.PI * 2 + (sd > 0 ? Math.PI : 0)) * 20;
    if (pose.kneel && sd > 0) ang = 0;
    ctx.save(); ctx.translate(sd * gap, hipY); ctx.rotate(ang * D2R);
    let L = -hipY; if (pose.sit) L *= .55; if (pose.kneel && sd < 0) L *= .55;
    ctx.fillStyle = sh(ctx, col, -lw / 2, lw / 2); rr(ctx, -lw / 2, -10, lw, L + 4, 30); ctx.fill();
    if (spec.armor) { ctx.fillStyle = 'rgba(255,255,255,.18)'; rr(ctx, -lw / 2 + 8, L * .45, lw - 16, 18, 8); ctx.fill(); }
    ctx.fillStyle = shoe; ctx.beginPath(); ctx.ellipse(sd * 8, L - 4, lw * .82, 26, 0, 0, 7); ctx.fill();
    if (pose.sit) { ctx.fillStyle = sh(ctx, lite(col, .08), -lw * .7, lw * .7); ctx.beginPath(); ctx.ellipse(0, 6, lw * .72, 46, 0, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.ellipse(sd * 8 - 12, L - 14, lw * .4, 8, 0, 0, 7); ctx.fill();
    ctx.restore(); }
}
function cloakBack(ctx, spec, bw, shY, hipY, t, o) { const c = spec.cloak, w = bw * .78, sway = Math.sin(t * 1.4) * 10 + (o.wind || 0) * 40;
  ctx.fillStyle = sh(ctx, c, -w, w); ctx.beginPath(); ctx.moveTo(-bw * .48, shY + 4); ctx.quadraticCurveTo(-w - 30, hipY, -w - 10 + sway, -30); ctx.quadraticCurveTo(0, -10, w + 10 + sway, -30); ctx.quadraticCurveTo(w + 30, hipY, bw * .48, shY + 4); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 8; for (const k of [-.35, .35]) { ctx.beginPath(); ctx.moveTo(k * w * .6, shY + 60); ctx.lineTo(k * w + sway * .6, -40); ctx.stroke(); } }
function cloak(ctx, spec, bw, shY, t, o) {
  const c = spec.cloak, w = bw * 1.25, sway = Math.sin(t * 1.4) * 10 + (o.wind || 0) * 40;
  ctx.fillStyle = sh(ctx, dark(c, .1), -w, w); ctx.beginPath(); ctx.moveTo(-bw * .45, shY + 10); ctx.quadraticCurveTo(-w, shY + 300, -w - 20 + sway, -10); ctx.lineTo(w + 20 + sway, -10); ctx.quadraticCurveTo(w, shY + 300, bw * .45, shY + 10); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.moveTo(-w * .2 + sway * .4, shY + 120); ctx.lineTo(-w * .35 + sway, -10); ctx.lineTo(-w * .15 + sway, -10); ctx.closePath(); ctx.fill();
}
function torso(ctx, spec, bw, th, hipY, shY, view, t) {
  const top = spec.top || '#4f86d6', type = spec.topType || 'shirt';
  const bot = (type === 'robe' || spec.robe) ? -6 : (type === 'coat' ? hipY + 150 : hipY + 30);
  ctx.fillStyle = sh(ctx, top, -bw / 2, bw / 2);
  ctx.beginPath(); ctx.moveTo(-bw / 2 + 20, shY); ctx.quadraticCurveTo(-bw / 2 - 6, shY + 10, -bw / 2 - 4, shY + 60);
  ctx.lineTo(-bw / 2 - (type === 'robe' || type === 'coat' ? 30 : 6), bot); ctx.quadraticCurveTo(0, bot + 14, bw / 2 + (type === 'robe' || type === 'coat' ? 30 : 6), bot);
  ctx.lineTo(bw / 2 + 4, shY + 60); ctx.quadraticCurveTo(bw / 2 + 6, shY + 10, bw / 2 - 20, shY); ctx.closePath(); ctx.fill();
  if (view === 'back') return;
  // details
  const neckCol = spec.armor ? spec.armorC || '#b9c0c6' : (spec.skin || SK.a);
  if (type === 'shirt' || type === 'coat') { ctx.fillStyle = spec.collar || '#e9e4da'; ctx.beginPath(); ctx.moveTo(-34, shY); ctx.lineTo(0, shY + 70); ctx.lineTo(34, shY); ctx.closePath(); ctx.fill();
    if (spec.tie) { ctx.fillStyle = spec.tie; ctx.beginPath(); ctx.moveTo(-10, shY + 20); ctx.lineTo(10, shY + 20); ctx.lineTo(14, shY + 160); ctx.lineTo(0, shY + 180); ctx.lineTo(-14, shY + 160); ctx.closePath(); ctx.fill(); }
    if (type === 'coat') { ctx.strokeStyle = dark(top, .25); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, shY + 70); ctx.lineTo(0, bot - 6); ctx.stroke(); ctx.fillStyle = dark(top, .3); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(14, shY + 110 + i * 70, 7, 0, 7); ctx.fill(); } } }
  if (type === 'jumper') { ctx.strokeStyle = spec.collar || '#ffffff'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-40, shY + 4); ctx.quadraticCurveTo(0, shY + 46, 40, shY + 4); ctx.stroke(); }
  if (type === 'robe') { ctx.fillStyle = dark(top, .12); ctx.beginPath(); ctx.moveTo(-30, shY); ctx.lineTo(0, shY + 90); ctx.lineTo(30, shY); ctx.closePath(); ctx.fill(); }
  if (type === 'suit') { ctx.fillStyle = spec.suitTrim || 'rgba(255,255,255,.85)'; ctx.fillRect(-bw / 2 + 4, shY + 130, bw - 8, 14); ctx.beginPath(); ctx.arc(0, shY + 70, 36, 0, 7); ctx.fill(); ctx.fillStyle = top; ctx.font = '900 46px Inter, Arial'; ctx.textAlign = 'center'; ctx.fillText(spec.badge || '', 0, shY + 86); }
  if (type === 'tunic') { ctx.fillStyle = dark(top, .1); ctx.fillRect(-bw / 2, shY + 150, bw, 8); }
  if (spec.apron) { ctx.fillStyle = sh(ctx, spec.apron, -bw * .38, bw * .38); rr(ctx, -bw * .36, shY + 60, bw * .72, bot - shY - 50, 18); ctx.fill(); ctx.fillStyle = dark(spec.apron, .15); rr(ctx, -bw * .2, shY + 150, bw * .4, 60, 10); ctx.fill(); }
  if (spec.belt) { ctx.fillStyle = spec.belt; rr(ctx, -bw / 2 - 2, hipY - 40, bw + 4, 34, 10); ctx.fill(); ctx.fillStyle = spec.buckle || '#e6c25a'; ctx.beginPath(); ctx.arc(0, hipY - 23, 22, 0, 7); ctx.fill(); ctx.strokeStyle = dark(spec.buckle || '#e6c25a', .3); ctx.lineWidth = 5; ctx.stroke(); }
  if (spec.armor) { ctx.fillStyle = 'rgba(255,255,255,.22)'; rr(ctx, -bw * .42, shY + 14, bw * .3, 50, 16); ctx.fill(); }
  if (spec.rock) rockCracks(ctx, -bw / 2, shY, bw, bot - shY, 3);
  if (spec.medals) { const m = spec.medals; for (let i = 0; i < m; i++) { const mx = -bw * .3 + (i % 4) * 32, my = shY + 70 + Math.floor(i / 4) * 44; ctx.fillStyle = ['#e23a3a', '#2f6fd6', '#2fb66a'][i % 3]; ctx.fillRect(mx - 9, my - 26, 18, 22); ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.arc(mx, my + 8, 13, 0, 7); ctx.fill(); } }
  if (spec.chestGlow) { const g = ctx.createRadialGradient(0, shY + 120, 0, 0, shY + 120, 90); g.addColorStop(0, spec.chestGlow); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, shY + 120, 90, 0, 7); ctx.fill(); }
}
function rockCracks(ctx, x, y, w, h, seed) { ctx.save(); ctx.strokeStyle = 'rgba(90,40,10,.45)'; ctx.lineWidth = 6; ctx.lineJoin = 'round'; let r = seed * 99; const R = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 9; i++) { const cx = x + R() * w, cy = y + R() * h, s = 40 + R() * 40; ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * 7; const px = cx + Math.cos(a) * s * (0.8 + R() * .3), py = cy + Math.sin(a) * s * .8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); ctx.stroke(); } ctx.restore(); }
function arm(ctx, spec, sx, sy, a, side, w, L, handT, t, pose, far) {
  const col = spec.sleeve || spec.top || '#4f86d6';
  const a1 = a[0] * D2R, a2 = (a[0] + a[1]) * D2R;
  const ex = sx + side * Math.sin(a1) * L, ey = sy + Math.cos(a1) * L, wx = ex + side * Math.sin(a2) * L * .95, wy = ey + Math.cos(a2) * L * .95;
  ctx.save(); if (far) ctx.globalAlpha = 1; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = far ? dark(col, .15) : col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(wx, wy); ctx.stroke();
  if (!far) { ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = w * .35; ctx.beginPath(); ctx.moveTo(sx - side * w * .18, sy); ctx.lineTo(ex - side * w * .18, ey); ctx.stroke(); }
  if (spec.cuff) { ctx.strokeStyle = spec.cuff; ctx.lineWidth = w * 1.02; ctx.beginPath(); const k = .82; ctx.moveTo(ex + (wx - ex) * k, ey + (wy - ey) * k); ctx.lineTo(wx, wy); ctx.stroke(); }
  // hand
  const hc = spec.gloves || spec.skin || SK.a; const hr = w * .62;
  ctx.translate(wx, wy); ctx.rotate(Math.atan2(wy - ey, (wx - ex) * side) * side - Math.PI / 2 * side);
  ctx.fillStyle = far ? dark(hc, .12) : sh(ctx, hc, -hr, hr);
  const ht = handT || 'relaxed';
  if (ht === 'open') { for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate((-24 + i * 16) * D2R); rr(ctx, -11, hr * .2, 22, hr * 1.25, 11); ctx.fill(); ctx.restore(); } ctx.save(); ctx.rotate(side * -60 * D2R); rr(ctx, -10, 0, 20, hr * 1.0, 10); ctx.fill(); ctx.restore(); }
  if (ht === 'point') { ctx.save(); rr(ctx, -10, hr * .3, 20, hr * 1.5, 10); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, hr * .25, hr, hr * (ht === 'fist' ? .9 : 1.0), 0, 0, 7); ctx.fill();
  ctx.restore();
  if (!far) F._wr[side] = [wx, wy];
}
// ---------- head ----------
function hair(ctx, spec, hw, hh, view, layer) {
  const st = spec.hair, c = spec.hairC || '#2b2230'; if (!st || st === 'none') return;
  ctx.fillStyle = c; const x0 = -hw / 2, y0 = -hh, R = hw / 2;
  if (layer === 'back') {
    if (st === 'long') { ctx.fillStyle = dark(c, .08); rr(ctx, x0 - 24, y0 + 40, hw + 48, hh + 120, 90); ctx.fill(); }
    if (st === 'bob') { ctx.fillStyle = dark(c, .05); rr(ctx, x0 - 26, y0 + 20, hw + 52, hh * .9, 100); ctx.fill(); }
    if (st === 'braid') { ctx.fillStyle = dark(c, .05); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(R + 10, -hh * .25 + i * 46, 26, 30, 0, 0, 7); ctx.fill(); } }
    return; }
  if (view === 'back') { ctx.fillStyle = c; if (st === 'bald') { ctx.fillRect(x0, -hh * .55, hw, hh * .35); return; } rr(ctx, x0 - 6, y0 - 16, hw + 12, hh * .85, R); ctx.fill(); return; }
  ctx.beginPath();
  if (st === 'messy') { ctx.moveTo(x0 - 10, y0 + 110); ctx.quadraticCurveTo(x0 - 25, y0 - 30, x0 + 110, y0 - 40); ctx.quadraticCurveTo(x0 + 210, y0 - 80, x0 + hw + 10, y0 + 10); ctx.quadraticCurveTo(x0 + hw + 35, y0 + 60, x0 + hw + 10, y0 + 120); ctx.quadraticCurveTo(x0 + hw - 30, y0 + 50, x0 + hw - 90, y0 + 50); ctx.quadraticCurveTo(x0 + 140, y0 + 90, x0 + 100, y0 + 40); ctx.quadraticCurveTo(x0 + 50, y0 + 80, x0 - 10, y0 + 110); }
  else if (st === 'side') { ctx.moveTo(x0 - 8, y0 + 100); ctx.quadraticCurveTo(x0 - 20, y0 - 40, x0 + 140, y0 - 38); ctx.quadraticCurveTo(x0 + hw + 20, y0 - 30, x0 + hw + 8, y0 + 120); ctx.quadraticCurveTo(x0 + hw - 20, y0 + 40, x0 + hw - 110, y0 + 40); ctx.quadraticCurveTo(x0 + 60, y0 + 30, x0 - 8, y0 + 100); }
  else if (st === 'bald') { ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x0 + 4, -hh * .48, 22, 50, 0, 0, 7); ctx.ellipse(x0 + hw - 4, -hh * .48, 22, 50, 0, 0, 7); ctx.fill(); return; }
  else if (st === 'spiky') { ctx.moveTo(x0 - 6, y0 + 90); for (let i = 0; i <= 6; i++) { const px = x0 + i * hw / 6, py = y0 - 20 - (i % 2 ? 70 : 10); ctx.lineTo(px, py); } ctx.lineTo(x0 + hw + 6, y0 + 90); ctx.quadraticCurveTo(x0 + hw / 2, y0 + 30, x0 - 6, y0 + 90); }
  else if (st === 'long' || st === 'bob' || st === 'braid') { ctx.moveTo(x0 - 16, y0 + 150); ctx.quadraticCurveTo(x0 - 20, y0 - 40, x0 + hw / 2, y0 - 34); ctx.quadraticCurveTo(x0 + hw + 20, y0 - 40, x0 + hw + 16, y0 + 150); ctx.quadraticCurveTo(x0 + hw - 10, y0 + 40, x0 + hw / 2 + 20, y0 + 30); ctx.quadraticCurveTo(x0 + hw / 2 - 30, y0 + 70, x0 + 20, y0 + 60); ctx.quadraticCurveTo(x0, y0 + 100, x0 - 16, y0 + 150); }
  else if (st === 'slick') { ctx.moveTo(x0 - 8, y0 + 110); ctx.quadraticCurveTo(x0 - 10, y0 - 40, x0 + hw / 2, y0 - 40); ctx.quadraticCurveTo(x0 + hw + 10, y0 - 40, x0 + hw + 8, y0 + 110); ctx.quadraticCurveTo(x0 + hw - 10, y0 + 30, x0 + hw / 2, y0 + 22); ctx.quadraticCurveTo(x0 + 10, y0 + 30, x0 - 8, y0 + 110); }
  else if (st === 'curly') { for (let i = 0; i < 9; i++) { ctx.moveTo(0, 0); ctx.arc(x0 + 10 + i * (hw - 20) / 8, y0 + 10 - Math.sin(i / 8 * Math.PI) * 30, 46, 0, 7); } }
  else if (st === 'stars') { const g = ctx.createRadialGradient(0, y0 + 20, 20, 0, y0 + 20, hw * .9); g.addColorStop(0, '#fff7d6'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.arc(0, y0 + 20, hw * .9, 0, 7); }
  ctx.closePath(); ctx.fill();
  if (st !== 'stars') { ctx.strokeStyle = lite(c, .18); ctx.globalAlpha = .7; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0 + 70, y0 - 12); ctx.quadraticCurveTo(x0 + hw / 2, y0 - 34, x0 + hw - 60, y0 - 8); ctx.stroke(); ctx.globalAlpha = 1; }
  if (spec.temples) { ctx.fillStyle = spec.temples; ctx.beginPath(); ctx.ellipse(x0 + 8, y0 + 120, 16, 36, 0, 0, 7); ctx.ellipse(x0 + hw - 8, y0 + 120, 16, 36, 0, 0, 7); ctx.fill(); }
}
function head(ctx, spec, hw, hh, view, o, t, pose) {
  const skin = spec.skin || SK.a, tq = view === 'tq', back = view === 'back';
  const fx = tq ? hw * .14 : 0; // face shift toward facing direction
  if (spec.hood && !back) { ctx.fillStyle = dark(spec.hood, .12); ctx.beginPath(); ctx.moveTo(-hw * .78, 30); ctx.quadraticCurveTo(-hw * .86, -hh * 1.12, 0, -hh * 1.18); ctx.quadraticCurveTo(hw * .86, -hh * 1.12, hw * .78, 30); ctx.closePath(); ctx.fill(); }
  hair(ctx, spec, hw, hh, view, 'back');
  // ears
  if (!spec.mask && !spec.noEars) { ctx.fillStyle = dark(skin, .06); for (const sd of tq ? [-1] : [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * hw / 2 + (tq ? -fx * .3 : 0), -hh * .48, 24, 36, 0, 0, 7); ctx.fill(); } }
  // skull
  const hc = spec.mask ? (spec.maskC || '#c7ccd1') : skin;
  ctx.fillStyle = sh(ctx, hc, -hw / 2, hw / 2); rr(ctx, -hw / 2, -hh, hw, hh, hw * .47); ctx.fill();
  if (spec.glowHead) { ctx.fillStyle = spec.glowHead; rr(ctx, -hw / 2, -hh, hw, hh, hw * .47); ctx.fill(); }
  if (back) { hair(ctx, spec, hw, hh, view, 'front'); if (spec.hood) { ctx.fillStyle = spec.hood; ctx.beginPath(); ctx.moveTo(-hw * .78, 30); ctx.quadraticCurveTo(-hw * .86, -hh * 1.12, 0, -hh * 1.18); ctx.quadraticCurveTo(hw * .86, -hh * 1.12, hw * .78, 30); ctx.closePath(); ctx.fill(); } return; }
  if (spec.mask) mask(ctx, spec, hw, hh, fx, o, t);
  else face(ctx, spec, hw, hh, fx, o, t);
  hair(ctx, spec, hw, hh, view, 'front');
  if (spec.hood) { ctx.fillStyle = sh(ctx, spec.hood, -hw, hw); ctx.beginPath(); ctx.moveTo(-hw * .78, 40); ctx.quadraticCurveTo(-hw * .9, -hh * 1.15, 0, -hh * 1.22); ctx.quadraticCurveTo(hw * .9, -hh * 1.15, hw * .78, 40); ctx.lineTo(hw * .56, 40); ctx.quadraticCurveTo(hw * .66, -hh * .95, 0, -hh * 1.04); ctx.quadraticCurveTo(-hw * .66, -hh * .95, -hw * .56, 40); ctx.closePath(); ctx.fill(); }
  if (spec.scarf) { ctx.fillStyle = sh(ctx, spec.scarf, -hw / 2, hw / 2); ctx.beginPath(); ctx.moveTo(-hw * .55, -hh * .62); ctx.quadraticCurveTo(0, -hh * 1.22, hw * .55, -hh * .62); ctx.quadraticCurveTo(0, -hh * .86, -hw * .55, -hh * .62); ctx.fill(); ctx.beginPath(); ctx.ellipse(hw * .5, -hh * .62, 26, 18, .5, 0, 7); ctx.fill(); }
  if (spec.hat) hat(ctx, spec, hw, hh);
  if (spec.horns) { ctx.fillStyle = spec.horns; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * hw * .3, -hh * .92); ctx.quadraticCurveTo(sd * hw * .62, -hh * 1.25, sd * hw * .5, -hh * 1.5); ctx.quadraticCurveTo(sd * hw * .44, -hh * 1.2, sd * hw * .12, -hh * .98); ctx.closePath(); ctx.fill(); } }
}
function hat(ctx, spec, hw, hh) { const k = spec.hat, c = spec.hatC || '#e6c25a';
  if (k === 'crown') { ctx.fillStyle = sh(ctx, c, -hw * .4, hw * .4); ctx.beginPath(); ctx.moveTo(-hw * .38, -hh * .92); for (let i = 0; i <= 4; i++) { ctx.lineTo(-hw * .38 + i * hw * .19, -hh * (i % 2 ? 1.05 : 1.28)); } ctx.lineTo(hw * .38, -hh * .92); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e23a3a'; ctx.beginPath(); ctx.arc(0, -hh * 1.0, 12, 0, 7); ctx.fill(); }
  if (k === 'helmet') { ctx.fillStyle = sh(ctx, c, -hw * .55, hw * .55); ctx.beginPath(); ctx.moveTo(-hw * .58, -hh * .62); ctx.quadraticCurveTo(-hw * .55, -hh * 1.1, 0, -hh * 1.32); ctx.quadraticCurveTo(hw * .55, -hh * 1.1, hw * .58, -hh * .62); ctx.closePath(); ctx.fill(); ctx.fillStyle = dark(c, .2); ctx.fillRect(-hw * .6, -hh * .66, hw * 1.2, 22); }
  if (k === 'cap') { ctx.fillStyle = sh(ctx, c, -hw * .55, hw * .55); ctx.beginPath(); ctx.ellipse(0, -hh * .86, hw * .56, hh * .3, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(-hw * .56, -hh * .9, hw * 1.25, 26); }
  if (k === 'tall') { ctx.fillStyle = sh(ctx, c, -hw * .4, hw * .4); rr(ctx, -hw * .36, -hh * 1.5, hw * .72, hh * .62, 14); ctx.fill(); ctx.fillRect(-hw * .55, -hh * .92, hw * 1.1, 22); }
}
function eyes(ctx, spec, hw, hh, fx, o, t, ex) {
  const ey = -hh * .52, ex0 = hw * .21, rx = hw * .2 * (spec.eyeS || 1), ry = hw * .19 * (spec.eyeS || 1);
  const blink = !o.noBlink && F.blink(t + (o.ph || 0));
  const lk = o.look || [0, 0];
  const big = ex === 'shock' ? 1.12 : 1, pr = rx * (ex === 'shock' ? .2 : .27);
  for (const sd of [-1, 1]) { const cx = fx + sd * ex0 * (fx ? (sd < 0 ? .86 : 1.06) : 1);
    if (blink || ex === 'closed') { ctx.strokeStyle = dark(spec.skin || SK.a, .5); ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - rx * .8, ey + 6); ctx.quadraticCurveTo(cx, ey + 22, cx + rx * .8, ey + 6); ctx.stroke(); continue; }
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(cx, ey, rx * big, ry * big, 0, 0, 7); ctx.fill();
    const px = cx + (lk[0] + (fx ? .25 : 0)) * rx * .45, py = ey + (ex === 'sad' ? .3 : 0) * ry + lk[1] * ry * .4;
    ctx.fillStyle = spec.eyeC || '#2a1d16'; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px + pr * .35, py - pr * .35, pr * .33, 0, 7); ctx.fill();
    // lids for smug / tired / angry
    const lid = ex === 'smug' || ex === 'tired' ? .45 : ex === 'angry' ? .3 : 0;
    if (lid) { ctx.fillStyle = spec.skin || SK.a; ctx.beginPath(); ctx.rect(cx - rx * 1.2, ey - ry * 1.3, rx * 2.4, ry * 2 * lid + ry * .3); ctx.fill(); }
  }
  // brows
  const bc = spec.browC || spec.hairC || '#2b2230'; ctx.strokeStyle = bc; ctx.lineWidth = 15; ctx.lineCap = 'round';
  const by = ey - ry * 1.25;
  const B = { neutral: [0, 0], happy: [-14, 6], smile: [-8, 2], angry: [16, -8], sad: [-18, 10], shock: [-30, 0], worried: [-16, 10], smug: [6, -10], talk: [-6, 0], determined: [10, -4], tired: [4, 0], closed: [0, 0], love: [-14, 8] }[ex] || [0, 0];
  for (const sd of [-1, 1]) { const cx = fx + sd * ex0; const inner = by + B[0] * (ex === 'smug' && sd > 0 ? -1.4 : 1), outer = by - B[1] + (ex === 'angry' ? 4 : 0);
    ctx.beginPath(); ctx.moveTo(cx - sd * rx * .95, outer); ctx.quadraticCurveTo(cx, Math.min(inner, outer) - 8, cx + sd * rx * .2, inner); ctx.stroke(); }
}
function mouth(ctx, spec, hw, hh, fx, o, t, ex) {
  const my = -hh * .2, mc = '#3b1a14';
  const talking = o.talk && Math.floor(t * 9 + (o.ph || 0) * 3) % 3 !== 0;
  ctx.lineCap = 'round';
  let m = ex; if (talking) m = ex === 'angry' ? 'shout' : (ex === 'sad' || ex === 'worried' ? 'talkSad' : 'talk');
  const x = fx;
  if (spec.beard) { /* beard drawn after; mouth still shows */ }
  if (m === 'happy' || m === 'love') { ctx.fillStyle = mc; ctx.beginPath(); ctx.moveTo(x - 70, my - 6); ctx.quadraticCurveTo(x, my + 90, x + 70, my - 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(x - 60, my - 2); ctx.quadraticCurveTo(x, my + 14, x + 60, my - 2); ctx.lineTo(x + 54, my + 10); ctx.quadraticCurveTo(x, my + 24, x - 54, my + 10); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#e46a6a'; ctx.beginPath(); ctx.ellipse(x, my + 50, 26, 12, 0, 0, 7); ctx.fill(); }
  else if (m === 'talk' || m === 'shout' || m === 'talkSad') { const k = m === 'shout' ? 1.3 : 1; const op = (Math.sin(t * 20 + (o.ph || 0)) * .5 + .5) * 30 * k + 14; ctx.fillStyle = mc; ctx.beginPath(); ctx.ellipse(x, my + 12, 40 * k, op, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#e46a6a'; ctx.beginPath(); ctx.ellipse(x, my + 12 + op * .55, 22 * k, op * .35, 0, 0, 7); ctx.fill(); }
  else if (m === 'shock') { ctx.fillStyle = mc; ctx.beginPath(); ctx.ellipse(x, my + 20, 28, 38, 0, 0, 7); ctx.fill(); }
  else { ctx.strokeStyle = mc; ctx.lineWidth = 10; ctx.beginPath();
    if (m === 'angry' || m === 'sad') { ctx.moveTo(x - 44, my + 18); ctx.quadraticCurveTo(x, my - 14, x + 44, my + 18); }
    else if (m === 'worried') { ctx.moveTo(x - 44, my + 10); ctx.quadraticCurveTo(x - 22, my - 4, x, my + 10); ctx.quadraticCurveTo(x + 22, my + 24, x + 44, my + 8); }
    else if (m === 'smug') { ctx.moveTo(x - 36, my + 12); ctx.quadraticCurveTo(x + 10, my + 22, x + 50, my - 6); }
    else if (m === 'determined' || m === 'neutral' || m === 'tired') { ctx.moveTo(x - 36, my + 8); ctx.lineTo(x + 36, my + 8); }
    else { ctx.moveTo(x - 46, my); ctx.quadraticCurveTo(x, my + 36, x + 46, my); }
    ctx.stroke(); }
}
function face(ctx, spec, hw, hh, fx, o, t) {
  const ex = (typeof o.expr === 'function' ? o.expr(t) : o.expr) || spec.expr || 'smile';
  if (spec.blush || ex === 'love') { ctx.fillStyle = 'rgba(240,110,110,.28)'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(fx + sd * hw * .3, -hh * .3, 30, 18, 0, 0, 7); ctx.fill(); } }
  eyes(ctx, spec, hw, hh, fx, o, t, ex);
  // nose
  ctx.strokeStyle = dark(spec.skin || SK.a, .22); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(fx - 4, -hh * .38); ctx.quadraticCurveTo(fx + 14, -hh * .3, fx - 6, -hh * .27); ctx.stroke();
  if (spec.beard) { ctx.fillStyle = sh(ctx, spec.beard, -hw / 2, hw / 2); ctx.beginPath(); ctx.moveTo(-hw * .5, -hh * .45); ctx.quadraticCurveTo(-hw * .55, hh * .2, fx, hh * .12); ctx.quadraticCurveTo(hw * .55, hh * .2, hw * .5, -hh * .45); ctx.quadraticCurveTo(hw * .3, -hh * .1, fx, -hh * .12); ctx.quadraticCurveTo(-hw * .3, -hh * .1, -hw * .5, -hh * .45); ctx.fill(); }
  if (spec.goatee) { ctx.fillStyle = spec.goatee; ctx.beginPath(); ctx.moveTo(fx - 40, -hh * .08); ctx.quadraticCurveTo(fx, hh * .14, fx + 40, -hh * .08); ctx.closePath(); ctx.fill(); }
  mouth(ctx, spec, hw, hh, fx, o, t, ex);
  if (spec.moustache) { ctx.strokeStyle = spec.moustache; ctx.lineWidth = 16; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(fx, -hh * .27); ctx.quadraticCurveTo(fx + sd * 50, -hh * .2, fx + sd * 82, -hh * .27); if (spec.curly) { ctx.stroke(); ctx.beginPath(); ctx.arc(fx + sd * 82, -hh * .31, 9, Math.PI / 2, Math.PI / 2 + sd * 5); } ctx.stroke(); } }
  if (spec.glasses) { ctx.strokeStyle = spec.glasses; ctx.lineWidth = 8; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(fx + sd * hw * .21, -hh * .52, hw * .22, 0, 7); ctx.stroke(); } }
  if (spec.scar && o.showScar !== false) { ctx.strokeStyle = 'rgba(150,60,60,.7)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(fx + hw * .1, -hh * .75); ctx.lineTo(fx + hw * .32, -hh * .2); ctx.stroke(); }
}
function mask(ctx, spec, hw, hh, fx, o, t) {
  const ex = (typeof o.expr === 'function' ? o.expr(t) : o.expr) || 'neutral';
  const ang = ex === 'angry' ? 9 : ex === 'sad' || ex === 'worried' ? -8 : ex === 'shock' ? -4 : 0;
  // brow ridge + slits
  ctx.strokeStyle = 'rgba(80,90,100,.45)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-hw * .48, -hh * .66); ctx.quadraticCurveTo(fx, -hh * .74, hw * .48, -hh * .66); ctx.stroke();
  const ey = -hh * .54;
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(fx + sd * hw * .2, ey); ctx.rotate(sd * ang * D2R); ctx.fillStyle = '#152320'; rr(ctx, -hw * .13, -12, hw * .26, ex === 'shock' ? 30 : 22, 7); ctx.fill();
    if (spec.eyeGlow) { ctx.fillStyle = spec.eyeGlow; ctx.beginPath(); ctx.arc(sd * 4 + (o.look ? o.look[0] * 8 : 0), -1, 7, 0, 7); ctx.fill(); }
    ctx.restore(); }
  ctx.strokeStyle = 'rgba(80,90,100,.55)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(fx - 9, -hh * .44); ctx.lineTo(fx - 9, -hh * .26); ctx.moveTo(fx + 9, -hh * .44); ctx.lineTo(fx + 9, -hh * .26); ctx.stroke();
  // mouth grille
  const talking = o.talk && Math.floor(t * 9 + (o.ph || 0) * 3) % 3 !== 0;
  ctx.fillStyle = '#152320'; rr(ctx, fx - hw * .25, -hh * .2, hw * .5, talking ? 22 : 14, 5); ctx.fill();
  ctx.strokeStyle = '#152320'; ctx.lineWidth = 7; ctx.beginPath(); for (let i = -2; i <= 2; i++) { ctx.moveTo(fx + i * hw * .1, -hh * .17); ctx.lineTo(fx + i * hw * .1, -hh * .1); } ctx.stroke();
  ctx.fillStyle = 'rgba(90,100,110,.6)'; for (const [dx, dy] of [[-.4, -.42], [.4, -.42], [-.37, -.15], [.37, -.15]]) { ctx.beginPath(); ctx.arc(fx * .5 + dx * hw, dy * hh, 7, 0, 7); ctx.fill(); }
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-hw * .34, -hh * .9); ctx.quadraticCurveTo(-hw * .2, -hh * .96, -hw * .05, -hh * .95); ctx.stroke();
  if (spec.maskHot) { ctx.fillStyle = `rgba(255,120,30,${spec.maskHot})`; rr(ctx, -hw / 2, -hh, hw, hh, hw * .47); ctx.fill(); }
}
window.FLAT = F;
})();
