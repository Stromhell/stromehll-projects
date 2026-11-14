// DumDown Deadpool 2 cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, seg, rng, apply, plate, chars, screen, grade, glowS, worldPt, onTwos, camTf } = window.E;
const G = window.GAGDATA, OPEN = .9, DUR = G.dur;
// ---------- extra cast ----------
const tw = (b, o) => ({ ...b, ...o, top: { ...b.top, ...(o.top || {}) }, hair: { ...b.hair, ...(o.hair || {}) }, acc: o.acc !== undefined ? o.acc : b.acc });
const PR = window.PROPS;
const X = {};
// ---------- timeline helpers ----------
const evs = n => G.sfx.filter(e => e.n === n);
const ev = (n, k = 0) => (evs(n)[k] || { t: 1e9 }).t;
const sp = (who, k = 0) => (G.speech.filter(s => s.who === who)[k] || { t0: 1e9, t1: 1e9 });
function lvl(who, t) { for (const s of G.speech) if (s.who === who && t >= s.t0 && t < s.t1) return s.lv[Math.floor((t - s.t0) * 24)] ?? 0; return -1; }
const bump = t => { let z = 0; for (const e of [...G.laugh, ...G.slam, ...evs('rimshot'), ...evs('dundun'), ...evs('scratch')]) z = Math.max(z, io(seg(t, e.t, e.t + .12)) * (1 - io(seg(t, e.t + .9, e.t + 1.5)))); return z; };
const shk = t => { let a = 0; for (const n of ['airhorn', 'braam', 'gunshot', 'gavel3', 'gavel', 'zap']) for (const e of evs(n)) if (t >= e.t) a = Math.max(a, 1 - seg(t, e.t, e.t + .45)); return a; };
// ---------- people ----------
const POSE = { ...D.POSES };
// talking hand gestures: chest-height beats, varied per line (never hands at the hips/crotch)
const GEST = [
  b => ({ R: { sh: 30 + b * 8, el: 92 + b * 16, wr: 10, hand: 'open' }, L: { sh: -10, el: 10, hand: 'relaxed' } }),
  b => ({ R: { sh: 36 + b * 6, el: 92, wr: 8, hand: 'open' }, L: { sh: -36 - b * 6, el: -92, wr: -8, hand: 'open' }, tilt: b * 3 }),
  b => ({ R: { sh: 78 + b * 6, el: 14, hand: 'point' }, L: { sh: -10, el: 10, hand: 'relaxed' }, lean: -2 }),
  b => ({ R: { sh: 26 + b * 6, el: 100 + b * 22, wr: 14, hand: 'open' }, L: { sh: -42, el: 70, hand: 'fist' } }),
  b => ({ R: { sh: 48 + b * 4, el: 58 + b * 28, wr: -6, hand: 'open' }, L: { sh: -12, el: 12, hand: 'relaxed' } }),
  b => ({ R: { sh: 24, el: 118 + b * 8, wr: 6, hand: b > 0 ? 'point' : 'peace' }, L: { sh: -26, el: -104 - b * 8, hand: 'open' } }),
  b => ({ L: { sh: -32 - b * 8, el: -96 - b * 16, wr: -10, hand: 'open' }, R: { sh: 10, el: -10, hand: 'relaxed' } }),
  b => ({ R: { sh: 44 + b * 10, el: 80, wr: 4, hand: 'grab' }, L: { sh: -44 - b * 10, el: -80, hand: 'grab' } }),
];
function talkPose(who, t, tt, o) {
  let k = 0, t0 = 0; G.speech.forEach((s, i) => { if (s.who === who && t >= s.t0 && t < s.t1) { k = i; t0 = s.t0; } });
  const h = [...who].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) + k * 5 + Math.floor((t - t0) / 1.8) * 3 + (o.seed || 0);
  const beat = Math.sin(tt * Math.PI * 2 * 0.9 + k), p = GEST[Math.abs(h) % GEST.length](beat);
  return { legL: { hip: -3 }, legR: { hip: 4 }, bob: Math.abs(beat) * -0.8, hairSway: Math.sin(t * 2.1 - .5) * .5, tilt: Math.sin(t * 2.1) * 3, ...p };
}
function person(spec, who, t, o) {
  const tt = onTwos(t + (o.ph || 0)), L = lvl(who, t); let pose, expr;
  if (o.walk) { pose = D.ANIMS.walk(onTwos(Math.abs(o.dist) / (240 * (o.s || 1) * (spec.scale || 1)))).pose; expr = o.expr || spec.defaultExpr; }
  else if (L >= 0) {
    pose = o.hold ? JSON.parse(JSON.stringify(o.pose)) : talkPose(who, t, tt, o); pose.tilt = (pose.tilt || 0) + Math.sin(t * 2.3 + (o.ph || 0)) * 2.5;
    const m = L === 0 ? 'flat' : L === 1 ? (Math.floor(t * 12) % 2 ? 'open' : 'o') : ['open', 'shout', 'o'][Math.floor(t * 12) % 3];
    expr = { base: (typeof o.talk === 'string' ? o.talk : 'talk'), mouth: m };
  } else { const a = D.ANIMS.idle(tt, o.pose || POSE.stand); pose = a.pose; const e = typeof o.expr === 'function' ? o.expr(t) : (o.expr || spec.defaultExpr); expr = a.expr === 'blink' && !o.noBlink ? 'blink' : e; }
  o._pose = pose; return D.drawCharacter(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose, expr });
}
const head = (spec, o, fy) => D.forehead(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: o._pose, fy });
const hnd = (spec, o, side = 'R') => D.wrist(spec, { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: o._pose }, side);
// ---------- drawing helpers (world coords unless noted) ----------
function rr(x, y, w, h, r, fill, stroke, lw = 6) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke(); } }
function lg(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); return g; }
function rg(x, y, r, c0, c1) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c0); g.addColorStop(1, c1); return g; }
function txt(s, x, y, sz, col, o = {}) { ctx.save(); ctx.font = `${o.w || 900} ${sz}px ${o.font || 'Inter'}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = o.blur || 30; } if (o.stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = o.lw || sz * .14; ctx.strokeStyle = o.stroke; ctx.strokeText(s, x, y); } ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore(); }
function emo(ch, x, y, sz, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.font = `${sz}px "Noto Color Emoji"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ch, 0, 0); ctx.restore(); }
function cone(x, y, w0, w1, len, col, a) { ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createLinearGradient(x, y, x, y + len); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - w0, y); ctx.lineTo(x + w0, y); ctx.lineTo(x + w1, y + len); ctx.lineTo(x - w1, y + len); ctx.fill(); ctx.restore(); }
function shadow(x, y, w) { ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(x, y, w, w * .16, 0, 0, 7); ctx.fill(); }
function desk(x, y, w, h, c1, c2, trim) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x + 14, y + 20, w, h); ctx.fillStyle = lg(0, y, 0, y + h, [c1, c2]); ctx.fillRect(x, y, w, h); ctx.fillStyle = trim || 'rgba(255,255,255,.25)'; ctx.fillRect(x - 10, y - 16, w + 20, 22); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.strokeRect(x - 10, y - 16, w + 20, 22); ctx.strokeRect(x, y + 6, w, h); }
function studio(c0, c1, c2, t, floorY = 1180) {
  ctx.fillStyle = lg(0, 0, 0, floorY, [c0, c1]); ctx.fillRect(0, 0, 2560, floorY);
  for (let i = 0; i < 9; i++) { const x = 140 + i * 290; ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(x, 120, 150, floorY - 200); ctx.fillStyle = c2; ctx.globalAlpha = .25 + .2 * Math.sin(t * 3 + i); ctx.fillRect(x + 66, 120, 18, floorY - 200); ctx.globalAlpha = 1; }
  for (let i = 0; i < 26; i++) { const x = i * 100 + 50; ctx.fillStyle = (Math.floor(t * 4) + i) % 3 ? 'rgba(255,240,200,.9)' : 'rgba(255,240,200,.25)'; ctx.beginPath(); ctx.arc(x, 90, 14, 0, 7); ctx.fill(); }
  ctx.fillStyle = lg(0, floorY, 0, 1440, [c1, '#0d0d14']); ctx.fillRect(0, floorY, 2560, 1440 - floorY);
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 3; for (let i = -10; i < 30; i++) { ctx.beginPath(); ctx.moveTo(1280 + i * 60, floorY); ctx.lineTo(1280 + i * 260, 1440); ctx.stroke(); }
  [500, 1280, 2060].forEach((x, i) => cone(x + Math.sin(t * .9 + i * 2) * 120, 0, 40, 380, floorY + 100, 'rgba(255,250,220,A)', .16)); }
function burst(x, y, r, t, c1, c2, n = 18) { ctx.save(); ctx.translate(x, y); ctx.rotate(t * .5); for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? c1 : c2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, i / n * 6.283, (i + 1) / n * 6.283); ctx.fill(); } ctx.restore(); }
function crowd(y, n, seed, col = '#0b0a10', sc = 1, t = 0) { const R = rng(seed); for (let i = 0; i < n; i++) { const x = (i + .5) / n * 2700 - 70 + (R() - .5) * 60, s = (.85 + R() * .3) * sc, b = Math.sin(t * 6 + i) * 4 * (R() > .5); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - 150 * s + b, 46 * s, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(x, y + 20 * s + b, 95 * s, 120 * s, 0, 0, 7); ctx.fill(); } }
function vhs(t, k = 1) { screen(); ctx.globalAlpha = .12 * k; ctx.fillStyle = '#000'; for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2); ctx.globalAlpha = 1; const ty = ((t * 260) % (H + 200)) - 100; ctx.fillStyle = `rgba(255,255,255,${.06 * k})`; ctx.fillRect(0, ty, W, 26); grade('#ffd8a0', .18 * k); }
function pillar() { screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 240, H); ctx.fillRect(W - 240, 0, 240, H); }
function film(t) { screen(); const R = rng(Math.floor(t * 24) + 3); ctx.fillStyle = `rgba(30,20,10,${.06 + R() * .08})`; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(240,230,210,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) if (R() > .4) { const x = R() * W; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + (R() - .5) * 30, H); ctx.stroke(); } for (let i = 0; i < 14; i++) { ctx.fillStyle = `rgba(${R() > .5 ? '250,240,220' : '20,10,0'},.5)`; ctx.beginPath(); ctx.arc(R() * W, R() * H, R() * 3 + 1, 0, 7); ctx.fill(); } }
function sepia(a = 1) { screen(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = `rgba(128,128,128,${a})`; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; grade('#a07040', .45 * a, 'color'); }
function halfplate(n, cam, left) { ctx.save(); screen(); ctx.beginPath(); if (left) { ctx.moveTo(0, 0); ctx.lineTo(W / 2 + 60, 0); ctx.lineTo(W / 2 - 60, H); ctx.lineTo(0, H); } else { ctx.moveTo(W / 2 + 60, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(W / 2 - 60, H); } ctx.clip(); }
function splitLine() { screen(); ctx.strokeStyle = '#f4f1ea'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(W / 2 + 60, 0); ctx.lineTo(W / 2 - 60, H); ctx.stroke(); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.stroke(); }
// emoji fx keyed to sfx
function sfxFx(t, cam) {
  screen();
  for (const e of evs('cash')) { const k = seg(t, e.t, e.t + 1.4); if (k > 0 && k < 1) for (let i = 0; i < 7; i++) emo('💸', 300 + i * 220 + Math.sin(i * 3) * 60, H - 160 - k * 600 - (i % 3) * 60, 80, Math.sin(t * 5 + i) * .3); }
  for (const e of evs('crickets')) { const k = seg(t, e.t, e.t + e.d); if (k > 0 && k < 1) emo('🦗', 300 + k * 600, H - 220 - Math.abs(Math.sin(k * 18)) * 70, 90); }
  for (const n of ['kazoo', 'robosing']) for (const e of evs(n)) { const k = seg(t, e.t, e.t + e.d + .6); if (k > 0 && k < 1) for (let i = 0; i < 5; i++) { const kk = clamp(k * 1.6 - i * .15); if (kk > 0 && kk < 1) emo(i % 2 ? '🎵' : '🎶', W * .5 + Math.sin(i * 2.1) * 400, H * .65 - kk * 420, 90, Math.sin(t * 4 + i) * .4); } }
  for (const n of ['phone_ring']) for (const e of evs(n)) { const k = seg(t, e.t, e.t + .9); if (k > 0 && k < 1) emo('☎️', W - 330, H * .5, 150, Math.sin(t * 60) * .25); }
  for (const e of evs('camera_burst')) { const k = seg(t, e.t, e.t + e.d); if (k > 0 && k < 1) { const R = rng(Math.floor(t * 24)); if (R() > .45) glowS(R() * W, H * (.25 + R() * .5), 260, 'rgba(255,255,255,A)', .9); } }
  for (const e of evs('sad_trombone')) { const k = seg(t, e.t, e.t + 1.6); if (k > 0) { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = `rgba(128,128,128,${k * .85})`; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; } }
  for (const e of evs('zap')) { const k = seg(t, e.t, e.t + .5); if (k > 0 && k < 1) { ctx.fillStyle = `rgba(255,40,40,${.35 * (1 - k)})`; ctx.fillRect(0, 0, W, H); } }
  for (const e of evs('buzzer')) { const k = seg(t, e.t, e.t + .7); if (k > 0 && k < 1) { const s = .6 + .4 * Math.min(1, k * 5); ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.globalAlpha = 1 - seg(k, .7, 1); emo('❌', 0, 0, 360); ctx.restore(); } }
  for (const n of ['ding', 'dingding']) for (const e of evs(n)) { const k = seg(t, e.t, e.t + .8); if (k > 0 && k < 1) { ctx.globalAlpha = 1 - k; emo('✨', W * .5 + 420, H * .3, 120 + k * 60); ctx.globalAlpha = 1; } }
  for (const e of evs('gunshot')) { const k = seg(t, e.t, e.t + .7); if (k > 0 && k < 1) { ctx.save(); ctx.translate(W * .72, H * .4); ctx.rotate(-.12); ctx.scale(.6 + .5 * Math.min(1, k * 6), .6 + .5 * Math.min(1, k * 6)); burst(0, 0, 230, t, '#ffd23d', '#ff6a2b', 14); txt('BLAM!', 0, 0, 120, '#fff', { stroke: '#231A24', lw: 18 }); ctx.restore(); } }
}
function slams(t) {
  for (const s of G.slam) { const k = seg(t, s.t, s.t + s.d); if (k <= 0 || k >= 1) continue; screen(); const kin = seg(t, s.t, s.t + .18), out = seg(t, s.t + s.d - .25, s.t + s.d);
    const sc = (1.9 - .9 * io(kin)) * (1 - .2 * out); ctx.save(); ctx.globalAlpha = io(kin) * (1 - out); ctx.translate(G.set === 'oscar' ? W * .3 : W / 2, H * .5); ctx.rotate(-.06); ctx.scale(sc, sc);
    if (G.set === 'oscar') { txt(s.txt, 0, 0, 120, '#f4ecd8', { glow: '#ff3030', blur: 40, font: 'Georgia, serif', w: 700 }); }
    else { ctx.font = '900 104px Inter'; const w = ctx.measureText(s.txt).width + 90; rr(-w / 2 + 14, -84, w, 168, 26, '#231A24'); rr(-w / 2, -96, w, 168, 26, '#ffd23d', '#231A24', 9); txt(s.txt, 0, -12, 104, '#231A24'); }
    ctx.restore(); } }
function bug(t) { if (!G.title || ['oscar'].includes(G.set)) return; screen(); const k = io(seg(t, OPEN, OPEN + .4)); ctx.save(); ctx.globalAlpha = k; ctx.translate(W - 70, BAR + 52); ctx.font = '900 30px Inter'; const w = ctx.measureText(G.title).width + 60;
  ctx.transform(1, 0, -.18, 1, 0, 0); rr(-w, -30, w, 60, 8, 'rgba(14,12,20,.86)'); ctx.fillStyle = '#e23a3a'; ctx.fillRect(-w, -30, 14, 60); txt(G.title, -w / 2 + 8, 1, 30, '#ffd23d'); ctx.restore(); }
// intro card + outro whip
const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const ox = oc.getContext('2d');
const INTRO = { oscar: 'A MESSAGE TO THE ACADEMY', drive: 'A WORD FROM OUR SPONSOR' };
function intro(t) {
  if (t >= OPEN) return; const save = ctx; screen(); ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, W, H);
  ox.save(); ox.translate(W / 2, H / 2); ox.rotate(t * .8); for (let i = 0; i < 24; i++) { ox.fillStyle = i % 2 ? '#ffd23d' : '#ff6a2b'; ox.beginPath(); ox.moveTo(0, 0); ox.arc(0, 0, 1500, i / 24 * 6.283, (i + 1) / 24 * 6.283); ox.fill(); } ox.restore();
  const label = INTRO[G.set] || G.title; const k = io(seg(t, 0, .25)), s = .5 + .5 * k + Math.sin(t * 30) * .01;
  ox.save(); ox.translate(W / 2, H / 2); ox.rotate(-.05); ox.scale(s, s); ox.font = '900 96px Inter'; ox.textAlign = 'center'; ox.textBaseline = 'middle'; const lines = label.length > 22 && label.includes(',') ? label.split(', ').map((l, i) => i ? l : l + ',') : [label];
  lines.forEach((l, i) => { const y = (i - (lines.length - 1) / 2) * 110; ox.lineJoin = 'round'; ox.lineWidth = 22; ox.strokeStyle = '#231A24'; ox.strokeText(l, 0, y); ox.fillStyle = '#fff'; ox.fillText(l, 0, y); }); ox.restore();
  const r = Math.pow(seg(t, .62, OPEN), 1.6) * 1300; if (r > 0) { ox.globalCompositeOperation = 'destination-out'; ox.beginPath(); ox.arc(W / 2, H / 2, r, 0, 7); ox.fill(); ox.globalCompositeOperation = 'source-over'; ox.lineWidth = 18; ox.strokeStyle = '#231A24'; ox.beginPath(); ox.arc(W / 2, H / 2, r, 0, 7); ox.stroke(); }
  ctx.drawImage(oc, 0, 0); }
function outro(t) { const k = seg(t, DUR - .35, DUR); if (k <= 0) return; screen(); ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, W, H); ox.drawImage(cv, 0, 0); for (let i = 1; i < 7; i++) { ctx.globalAlpha = .28; ctx.drawImage(oc, -i * 90 * k * 3, 0); } ctx.globalAlpha = 1; ctx.fillStyle = `rgba(255,255,255,${k * .5})`; ctx.fillRect(0, 0, W, H); }
function phoneAt(h, f, sc, skin = '#e3cfe3') { // smartphone gripped in the hand, top end at the ear
  const a = Math.atan2(f.y + 40 * f.sc - h.y, f.x - h.x) ; ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(a - Math.PI / 2 + Math.PI);
  const w = 15 * sc, L = 32 * sc; rr(-w / 2, -L * .15, w, L, 4 * sc, '#1d1d24', '#231A24', 2.5 * sc); ctx.fillStyle = '#2fc6ff'; ctx.globalAlpha = .55; ctx.fillRect(-w / 2 + 2 * sc, -L * .15 + 3 * sc, w - 4 * sc, L - 6 * sc); ctx.globalAlpha = 1;
  ctx.fillStyle = skin; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2 * sc; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-w / 2 - 1 * sc, L * .12 + i * 5.5 * sc, 4 * sc, 2.8 * sc, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(w / 2 + 1 * sc, L * .2, 3.4 * sc, 2.6 * sc, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
function micAt(h, m, sc) { // handheld mic: handle in the fist, grille at the mouth
  const a = Math.atan2(m.y - h.y, m.x - h.x), L = Math.hypot(m.x - h.x, m.y - h.y); ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(a);
  ctx.fillStyle = '#2a2a30'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.5 * sc; ctx.beginPath(); ctx.moveTo(-10 * sc, -3.5 * sc); ctx.lineTo(L - 9 * sc, -5.5 * sc); ctx.lineTo(L - 9 * sc, 5.5 * sc); ctx.lineTo(-10 * sc, 3.5 * sc); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#b8bcc8'; ctx.beginPath(); ctx.arc(L - 4 * sc, 0, 8 * sc, 0, 7); ctx.fill(); ctx.stroke(); ctx.strokeStyle = 'rgba(40,40,50,.6)'; ctx.lineWidth = 1 * sc; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(L - 4 * sc + i * 3 * sc, -7 * sc); ctx.lineTo(L - 4 * sc + i * 3 * sc, 7 * sc); ctx.stroke(); }
  ctx.fillStyle = '#1d1d24'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2 * sc; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(i * 5 * sc, -5 * sc, 3 * sc, 4 * sc, 0, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
function wrenchAt(h, sc, skin) { // spanner gripped in the fist, jaw up
  ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(-2.4); ctx.fillStyle = '#9aa0ac'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.5 * sc;
  ctx.beginPath(); ctx.roundRect(-4 * sc, -8 * sc, 8 * sc, 50 * sc, 3 * sc); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 46 * sc, 10 * sc, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#5a6a7a'; ctx.beginPath(); ctx.moveTo(-4 * sc, 58 * sc); ctx.lineTo(4 * sc, 58 * sc); ctx.lineTo(3 * sc, 44 * sc); ctx.lineTo(-3 * sc, 44 * sc); ctx.closePath(); ctx.fill();
  ctx.fillStyle = skin; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2 * sc; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-5 * sc, i * 5 * sc, 3.6 * sc, 2.8 * sc, 0, 0, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
// ---------- scenes ----------
const camOf = (t, base) => ({ ...base, z: base.z * (1 + .07 * bump(t)) + (base.push || 0) * seg(t, OPEN, DUR), sx: (base.sx || 0) + Math.sin(t * 47) * 14 * shk(t), sy: Math.cos(t * 39) * 10 * shk(t) });
async function cast(list, cam, t) { await chars(list.map(([sp, who, o]) => person(sp, who, t, o)), cam); }
const S = {};
const lineup = (t, list, cam) => cast(list, cam, t);
const camW = (t, b) => camOf(t, b);
function wall(c0, c1, floorY = 1180, f0 = '#5a4a3a', f1 = '#2a2018') { ctx.fillStyle = lg(0, 0, 0, floorY, [c0, c1]); ctx.fillRect(0, 0, 2560, floorY); ctx.fillStyle = lg(0, floorY, 0, 1440, [f0, f1]); ctx.fillRect(0, floorY, 2560, 1440 - floorY); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, floorY - 10, 2560, 14); }
function chair(x, y, s = 1, col = '#7a2a2a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rr(-50, -150, 100, 110, 10, col, '#231A24', 5); rr(-56, -50, 112, 26, 6, shade(col), '#231A24', 5); ctx.fillStyle = '#231A24'; ctx.fillRect(-46, -24, 8, 70); ctx.fillRect(38, -24, 8, 70); ctx.restore(); }
function shade(c) { return c.replace(/[0-9a-f]{2}/gi, h => Math.max(0, parseInt(h, 16) - 40).toString(16).padStart(2, '0')); }
function stars(x, y, n, sz = 56) { for (let i = 0; i < 5; i++) txt('★', x + i * sz * 1.05, y, sz, i < n ? '#ffb020' : '#c8c8c8'); }
function clip(h, sc) { ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(-.2); rr(-36 * sc, -50 * sc, 72 * sc, 96 * sc, 5 * sc, '#c89a5a', '#231A24', 2.5 * sc); rr(-30 * sc, -40 * sc, 60 * sc, 80 * sc, 3 * sc, '#f4f1ea'); ctx.fillStyle = '#888'; for (let i = 0; i < 5; i++) ctx.fillRect(-24 * sc, (-28 + i * 13) * sc, 44 * sc, 3 * sc); ctx.restore(); }
const XC = {
  agent: tw(C.ex2, { top: { type: 'jacket', color: '#3a4a6a', shirt: '#f4f1ea', tie: '#c8a020', accent: '#2a3a5a', cuff: '#2a3a5a', hem: -10, sleeves: 'long' }, acc: { glasses: '#2a2a30', beard: '#d8d8d8' } }),
  mod: tw(C.ex2, { top: { type: 'jacket', color: '#1a1a24', shirt: '#f4f1ea', tie: '#a01a1a', accent: '#111', cuff: '#111', hem: -10, sleeves: 'long' } }),
  ranger: tw(C.ex3, { top: { type: 'tee', color: '#5a6a3a', accent: '#3a4a2a', cuff: '#3a4a2a', hem: 14, sleeves: 'short' }, defaultExpr: 'happy' }),
  host: tw(C.ex3, { top: { type: 'jacket', color: '#c8a020', shirt: '#1a1a20', tie: '#a01a1a', accent: '#8a6a10', cuff: '#8a6a10', hem: -10, sleeves: 'long' }, defaultExpr: 'excited' }),
  gate: tw(C.ex1, { top: { type: 'jacket', color: '#2a5a9a', shirt: '#f4f1ea', tie: '#e23a3a', accent: '#1a3a6a', cuff: '#1a3a6a', hem: -10, sleeves: 'long' }, defaultExpr: 'smile' }),
  clerk: tw(C.ex1, { top: { type: 'tee', color: '#e23a3a', accent: '#a01a1a', cuff: '#a01a1a', hem: 14, sleeves: 'short' }, hair: { color: '#2a1a12' }, defaultExpr: 'deadpan' }),
};
S.drive = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 760 }); plate('nyc_street', cam, 3); grade('#ffd080', .15); apply(cam);
  ctx.save(); ctx.translate(1960, 600); ctx.rotate(.1); burst(0, 0, 250, t, '#ffd23d', '#ff6a2b', 16); txt('LESSONS', 0, -30, 76, '#231A24'); txt('$9.99*', 0, 50, 56, '#e23a3a'); ctx.restore();
  const th = ev('thud'); PR.cab({ x: 1500, y: 1330, s: 1.5, roll: t > th - .5 && t < th + .3 ? t * 6 : 0 }, t);
  const dp = { x: 820, y: 1450, s: 2.1, view: 'front', expr: t > th ? 'excited' : 'happy', pose: lvl('DOP', t) < 0 ? POSE.thumbsUp : undefined };
  await cast([[C.dopinder, 'DOP', dp]], cam, t); apply(cam);
  if (t > th && t < th + 1) { emo('💥', 1900, 1150, 160); }
  screen(); rr(0, H - 260, W, 120, 0, 'rgba(10,10,40,.85)'); txt("DOPINDER'S DRIVING SCHOOL · CALL 555-TAXI", W / 2, H - 200, 50, '#ffd23d'); screen(); ctx.fillStyle = '#fff'; ctx.font = '600 22px Inter'; ctx.textAlign = 'left'; ctx.fillText('*murder lessons not included', 270, H - 150); vhs(t, 1.1); pillar(); };
S.insure = async t => {
  const cam = camW(t, { z: 1.12, x: 1280, y: 780 }); plate('office', cam, 5); grade('#2a3a6a', .15); apply(cam);
  rr(700, 360, 840, 130, 12, '#f4f1ea', '#231A24'); txt('IMMORTAL MUTUAL INSURANCE', 1120, 410, 46, '#2a3990'); txt('"We cover everything. Almost."', 1120, 460, 28, '#888');
  const wo = { x: 860, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > ev('stamp') ? 'shock' : 'smug' }, ao = { x: 1760, y: 1450, s: 2.0, view: 'threequarter', dir: -1, expr: 'deadpan' };
  await cast([[C.wade, 'WADE', wo], [XC.agent, 'AGENT', ao]], cam, t); apply(cam);
  desk(1380, 1160, 760, 300, '#6a4a2a', '#4a2a10', '#c9a046'); rr(1460, 1080, 320, 90, 8, '#f4f1ea', '#231A24', 4); txt('CLAIM #14', 1620, 1110, 26, '#231A24'); txt('CAUSE: EXPLODED', 1620, 1145, 22, '#e23a3a');
  for (let i = 0; i < 13; i++) rr(1820 + (i % 3) * 8, 1150 - i * 10, 200, 14, 2, '#e8e0d0', '#888', 2);
  const st = ev('stamp'); if (t > st) { const k = seg(t, st, st + .15); ctx.save(); ctx.translate(1620, 1125); ctx.rotate(-.15); ctx.scale(1.6 - .6 * k, 1.6 - .6 * k); ctx.globalAlpha = k; rr(-130, -40, 260, 80, 8, null, '#e23a3a', 8); txt('DENIED', 0, 2, 48, '#e23a3a'); ctx.restore(); } };
S.hoa = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .08 }); plate('mansion_hall', cam, 4); apply(cam);
  rr(880, 360, 800, 120, 10, '#f4f1ea', '#231A24'); txt('X-MANSION H.O.A.', 1280, 405, 52, '#1d3a8a'); txt('MEETING TONIGHT · ALL X-MEN WELCOME', 1280, 455, 26, '#8a5a2a');
  for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) chair(420 + i * 220 + r * 30, 1250 + r * 70, .9 + r * .1);
  const yuk = t > sp('YUK').t0 - .2; const co = { x: 1950, y: 1380, s: 1.75, view: 'threequarter', dir: -1, expr: t > sp('COL', 2).t0 ? 'sad' : 'neutral' };
  await cast([[C.nega, 'NEGA', { x: 640, y: 1330, s: 1.5, view: 'threequarter', dir: 1, expr: 'deadpan' }], [C.yukio, 'YUK', { x: 900, y: 1330, s: 1.5, view: 'threequarter', dir: 1, expr: yuk ? 'excited' : 'happy', pose: yuk ? POSE.wave : undefined, hold: yuk && lvl('YUK', t) < 0 }], [C.colossus, 'COL', co]], cam, t); apply(cam);
  rr(1780, 1130, 300, 280, 10, '#6a4a2a', '#231A24'); { const h = hnd(C.colossus, co, 'L'); clip(h, 1.6); }
  screen(); rr(80, BAR + 30, 520, 90, 10, 'rgba(20,16,24,.85)'); txt('ATTENDANCE: 3', 340, BAR + 75, 44, '#ffd23d'); };
S.reviews = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); plate('icebox', cam, 10); grade('#0a1a3a', .4, 'multiply');
  screen(); rr(160, BAR + 30, W - 320, H - 2 * BAR - 60, 22, '#f4f4f6', '#231A24', 6); rr(160, BAR + 30, W - 320, 70, 22, '#2a8a5a'); txt('🦉 IceboxAdvisor', 330, BAR + 66, 34, '#fff', { align: 'left' }); txt('Icebox Super-Prison · #1 of 1 prisons nearby', 1180, BAR + 66, 26, '#e8f8f0');
  const sw = ev('swipe'), k = io(seg(t, sw, sw + .35));
  const card = (y, who, n, lines, al) => { ctx.globalAlpha = al; rr(240, y, W - 480, 230, 16, '#fff', '#d0d0d8', 3); ctx.fillStyle = '#c8d8e8'; ctx.beginPath(); ctx.arc(320, y + 60, 40, 0, 7); ctx.fill(); txt(who, 380, y + 50, 30, '#231A24', { align: 'left' }); stars(390, y + 92, n, 34);
    lines.forEach((l, i) => txt(l, 280, y + 140 + i * 40, 30, '#333', { align: 'left', w: 600 })); ctx.globalAlpha = 1; };
  const sc = t * 9; ctx.save(); ctx.translate(0, -sc);
  const r1 = seg(t, sp('READ').t0 - .2, sp('READ').t0 + .2);
  card(BAR + 130 - 300 * k, 'Russell, 14', 1, ['Room was cold. Staff were cold. Food was cold.', 'My neighbour was a giant man in the basement. Would not recommend.'], r1 * (1 - k));
  if (t > sw) card(BAR + 130 + 260 * (1 - k), 'Anonymous critic', 1, ['Too much foreshadowing.'], k);
  ctx.restore(); { const cx = 900 + Math.sin(t * .9) * 420, cy = 640 + Math.sin(t * 1.3) * 160; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 56); ctx.lineTo(cx + 14, cy + 42); ctx.lineTo(cx + 30, cy + 70); ctx.lineTo(cx + 40, cy + 64); ctx.lineTo(cx + 26, cy + 38); ctx.lineTo(cx + 44, cy + 36); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  if (t > sp('READ', 3).t0) { ctx.save(); ctx.translate(W - 420, H - BAR - 160); ctx.rotate(-.1); rr(-170, -50, 340, 100, 12, '#e23a3a', '#231A24', 6); txt('VERIFIED STAY', 0, 2, 34, '#fff'); ctx.restore(); } };
S.gate = async t => {
  const cam = camW(t, { z: 1.1, x: 1280, y: 780 }); apply(cam); wall('#c8d4e0', '#9aa8b8', 1180, '#6a7480', '#3a424c');
  rr(260, 220, 1200, 600, 10, '#1a2a4a', '#231A24', 10); ctx.fillStyle = lg(0, 220, 0, 820, ['#ff9a5a', '#5a3a8a']); ctx.fillRect(270, 230, 1180, 580); ctx.fillStyle = '#231A24'; ctx.save(); ctx.translate(860 + Math.sin(t * .4) * 80, 560); ctx.beginPath(); ctx.ellipse(0, 0, 300, 40, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, -160); ctx.lineTo(120, -160); ctx.lineTo(60, 0); ctx.fill(); ctx.restore();
  rr(1520, 420, 640, 180, 10, '#1a1a24', '#231A24'); txt('GATE ∞  ·  TIME AIR', 1840, 475, 44, '#ffd23d'); txt('DEPARTS: WHENEVER', 1840, 545, 34, '#2fc6ff');
  const co = { x: 840, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > sp('CABLE', 1).t0 ? 'deadpan' : t > sp('GATE', 1).t0 ? 'angry' : 'neutral' }, go = { x: 1820, y: 1450, s: 1.95, view: 'threequarter', dir: -1, expr: 'smile' };
  await cast([[C.cable, 'CABLE', co], [XC.gate, 'GATE', go]], cam, t); apply(cam);
  desk(1440, 1150, 800, 310, '#3a4a6a', '#1a2a4a', '#c9a046'); PR.device({ x: 1600, y: 1110, s: 1.0, charges: t > sp('GATE', 1).t0 ? 0 : 2 }, t); rr(1720, 1080, 240, 70, 6, '#f4f1ea', '#231A24', 4); txt('NO REFUNDS', 1840, 1115, 26, '#e23a3a'); };
S.debate = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#1a2a5a', '#0a1030', '#2fc6ff', t);
  txt('THE GREAT DEBATE', 1200, 420, 96, '#f4f1ea', { glow: '#2fc6ff', blur: 26 }); txt('IS LUCK A SUPERPOWER?', 1200, 530, 54, '#ffd23d');
  const th = ev('thud'), zp = ev('zap'); const hit = t > th;
  const dom = { x: 620, y: 1400, s: 1.8, view: 'threequarter', dir: 1, expr: hit ? 'smug' : 'deadpan' }, wa = { x: 1940, y: 1400, s: 1.85, view: 'threequarter', dir: -1, expr: hit ? 'blank' : 'angry', tilt: 0 };
  const mo = { x: 1280, y: 1400, s: 1.6, view: 'front', expr: hit ? 'shock' : 'neutral' };
  await cast([[C.domino, 'DOM', dom], [XC.mod, 'MOD', mo], [C.wade, 'WADE', wa]], cam, t); apply(cam);
  for (const [x, col, nm] of [[620, '#2a8a4a', 'DOMINO'], [1940, '#a01a1a', 'WADE']]) { rr(x - 170, 1120, 340, 340, 10, col, '#231A24', 6); txt(nm, x, 1200, 48, '#fff'); }
  rr(1150, 1180, 260, 280, 10, '#3a3a4a', '#231A24', 6);
  { const f = head(C.wade, wa, 0); const k = clamp((t - th + .45) / .45); if (k > 0) { const y = lerp(f.y - 900, f.y - 40 * f.sc, k * k); ctx.save(); ctx.translate(f.x, y); ctx.rotate(k * 2.2); rr(-12, -10, 24, 140, 8, '#2a2a30', '#231A24', 4); ctx.fillStyle = '#b8bcc8'; ctx.beginPath(); ctx.arc(0, -20, 30, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); if (hit) for (let i = 0; i < 4; i++) emo('💫', f.x + Math.cos(t * 4 + i * 1.6) * 110, f.y - 120 + Math.sin(t * 4 + i * 1.6) * 30, 56); } }
  if (t > zp) { screen(); ctx.fillStyle = `rgba(0,0,0,${.85 * Math.min(1, (t - zp) * 6)})`; ctx.fillRect(W / 2 + 140, 0, W / 2, H); } };
S.weather = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a6ab0', '#1a3a7a']); ctx.fillRect(0, 0, 2560, 1440);
  ctx.fillStyle = '#5aa04a'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1150, 300); ctx.bezierCurveTo(1700, 180, 2400, 320, 2300, 700); ctx.bezierCurveTo(2250, 1000, 1700, 1100, 1300, 960); ctx.bezierCurveTo(1050, 860, 950, 420, 1150, 300); ctx.fill(); ctx.stroke();
  txt('CANADA-ISH', 1700, 640, 40, 'rgba(255,255,255,.7)'); for (let i = 0; i < 5; i++) { const x = 1300 + ((t * 260 + i * 260) % 1100), y = 400 + i * 110; ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x - 120, y); ctx.lineTo(x, y); ctx.lineTo(x - 30, y - 24); ctx.moveTo(x, y); ctx.lineTo(x - 30, y + 24); ctx.stroke(); }
  emo('🌬️', 1400, 420, 120); emo('🪁', 2150, 420 + Math.sin(t * 3) * 40, 110); txt('WIND: YES', 1750, 1020, 54, '#ffd23d');
  const wh = ev('whoosh'); if (t > wh) { const k = seg(t, wh, wh + 1.6); emo('🪂', lerp(1250, 2500, k), 500 + Math.sin(k * 12) * 80, 90, k * 8); }
  const ro = { x: 720, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > wh + .4 ? 'nervous' : 'happy' };
  await cast([[XC.ranger, 'RANGER', ro]], cam, t); apply(cam);
  { const f = head(XC.ranger, ro, -14); ctx.save(); ctx.translate(f.x, f.y - 4 * f.sc); ctx.fillStyle = '#8a6a3a'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 40 * f.sc, 9 * f.sc, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20 * f.sc, 0); ctx.lineTo(-12 * f.sc, -24 * f.sc); ctx.lineTo(12 * f.sc, -24 * f.sc); ctx.lineTo(20 * f.sc, 0); ctx.fill(); ctx.stroke(); ctx.restore(); }
  screen(); rr(0, H - BAR - 110, W, 80, 0, 'rgba(10,20,60,.85)'); txt('⚠ HIGH WIND ADVISORY · DO NOT SKYDIVE · SERIOUSLY', W / 2 - ((t * 120) % 400) + 200, H - BAR - 70, 40, '#ffd23d'); };
S.fitness = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a0a4a', '#ff3aa0']); ctx.fillRect(0, 0, 2560, 1440);
  ctx.strokeStyle = 'rgba(80,255,240,.6)'; ctx.lineWidth = 4; for (let i = -12; i < 30; i++) { ctx.beginPath(); ctx.moveTo(1280 + i * 40, 1000); ctx.lineTo(1280 + i * 220, 1440); ctx.stroke(); } for (let j = 0; j < 8; j++) { const y = 1000 + j * j * 7 + ((t * 40) % 20); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(2560, y); ctx.stroke(); }
  ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.arc(1280, 900, 360, Math.PI, 0); ctx.fill(); txt('BABY LEGS FITNESS', 1280, 300, 120, '#5afff0', { glow: '#ff3aa0', blur: 36, font: 'Georgia, serif', w: 900 });
  rr(780, 1140, 1000, 60, 20, '#2fc6ff', '#231A24', 6);
  const kick = t < ev('thud') && lvl('WADE', t) >= 0; const b = Math.sin(t * 9);
  const wo = { x: 1280, y: 1160, s: 2.0, view: 'front', expr: t > ev('thud') ? 'deadpan' : 'excited', pose: kick ? { ...POSE.stand, R: { sh: 150, el: 20, hand: 'fist' }, L: { sh: -150, el: -20, hand: 'fist' }, legR: { hip: b > 0 ? 40 : 4 }, legL: { hip: b < 0 ? -40 : -3 } } : undefined, hold: kick };
  await cast([[C.wadeBaby, 'WADE', wo]], cam, t); vhs(t, .8); };
S.clock = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#4a1a6a', '#1a0a2a', '#ffd23d', t);
  const st = ev('tick'), bz = ev('buzzer'); const k = t < st ? 0 : t > bz ? 1 : (t - st) / Math.max(.1, bz - st);
  ctx.save(); ctx.translate(1280, 520); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(0, 0, 300, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(226,58,58,.75)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 280, -Math.PI / 2, -Math.PI / 2 + k * 6.283); ctx.fill();
  ctx.rotate(-Math.PI / 2 + Math.floor(k * 30) / 30 * 6.283 + Math.PI / 2); ctx.fillStyle = '#231A24'; ctx.fillRect(-8, -270, 16, 270); ctx.restore(); txt(String(Math.max(0, 30 - Math.floor(k * 30))), 1280, 920, 90, '#ffd23d', { glow: '#ff6a2b', blur: 20 });
  const ho = { x: 460, y: 1430, s: 1.95, view: 'threequarter', dir: 1, expr: 'excited', pose: { ...POSE.stand, R: { sh: 70, el: 150, hand: 'grab' } }, hold: lvl('HOST', t) < 0 };
  const wo = { x: 2060, y: 1430, s: 1.95, view: 'threequarter', dir: -1, expr: t > bz ? 'shock' : 'nervous' };
  await cast([[XC.host, 'HOST', ho], [C.wade, 'WADE', wo]], cam, t); apply(cam); { const h = hnd(XC.host, ho), f = head(XC.host, ho, 0); micAt(h, f, ho.s); }
  rr(1880, 1150, 360, 300, 10, '#c8a020', '#231A24', 6); txt('CONTESTANT', 2060, 1210, 34, '#231A24');
  if (t > sp('HOST', 2).t0) { rr(1100, 1180, 360, 260, 10, '#e23a3a', '#231A24', 6); emo('🏆', 1280, 1100, 100); ctx.save(); ctx.translate(1280, 1290); ctx.rotate(-.5); rr(-70, -18, 120, 36, 18, '#c8a020', '#231A24', 4); rr(40, -18, 40, 36, 18, '#8a6a10', '#231A24', 4); ctx.restore(); } };
S.manners = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 780 }); plate('classroom', cam, 5); apply(cam);
  rr(980, 360, 1240, 500, 10, '#2a4a3a', '#8a5a2a', 18); txt('NICE WORDS', 1500, 430, 60, '#f4f1ea', { font: 'Georgia, serif', w: 700 });
  const L = [['F*@#', 'FUDGE'], ['S.O.B.', 'SON OF A BISCUIT']]; L.forEach(([a, b], i) => { if (t > sp('COL', i).t0) { txt(a, 1260, 540 + i * 110, 46, 'rgba(244,241,234,.6)'); ctx.strokeStyle = '#ff6a6a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1160, 540 + i * 110); ctx.lineTo(1360, 540 + i * 110); ctx.stroke(); txt('→ ' + b, 1720, 540 + i * 110, 46, '#ffd23d'); } });
  if (t > sp('COL', 2).t0) txt('...STILL BISCUIT', 1600, 790, 44, '#f4f1ea');
  const co = { x: 900, y: 1450, s: 1.9, view: 'threequarter', dir: 1, expr: t > sp('COL', 2).t0 ? 'deadpan' : 'smile', pose: lvl('COL', t) < 0 ? { ...POSE.stand, R: { sh: 80, el: 20, hand: 'point' } } : undefined, hold: lvl('COL', t) < 0 };
  const ko = { x: 2200, y: 1430, s: 1.7, view: 'threequarter', dir: -1, expr: t > sp('KID').t0 ? 'nervous' : 'neutral', pose: t > sp('KID').t0 - .3 && t < sp('KID').t1 + .2 ? POSE.wave : undefined, hold: t > sp('KID').t0 - .3 && t < sp('KID').t1 + .2 };
  await cast([[C.colossus, 'COL', co], [C.russell, 'KID', ko]], cam, t); apply(cam); desk(1960, 1250, 480, 210, '#8a6a3a', '#5a4020', '#c9a046'); };
S.oscar = async t => {
  const cam = camW(t, { z: 1.1 + .06 * seg(t, OPEN, DUR), x: 1280, y: 760 }); plate('heaven', cam, 6); grade('#1a1008', .7, 'multiply'); grade('#ffb040', .25);
  const wo = { x: 1780, y: 1440, s: 2.1, view: 'threequarter', dir: -1, expr: 'sad', pose: { ...POSE.stand, R: { sh: 30, el: 150, hand: 'open' }, L: { sh: -120, el: -30, hand: 'open' }, tilt: -8 }, hold: true };
  apply(cam); cone(1780, 0, 60, 420, 1500, 'rgba(255,230,170,A)', .3); await cast([[C.wade, 'X', wo]], cam, t);
  screen(); const lines = G.speech.filter(s => s.who === 'ANN'); const TX = ['FOR YOUR CONSIDERATION', 'BEST ACTOR IN A VERY LONG DEATH', '40 MIN OF DYING · 4 COSTUMES · 1 SONG', '— THE NEW PORK TIMES'];
  lines.forEach((s, i) => { if (t > s.t0) { const a = io(seg(t, s.t0, s.t0 + .5)); ctx.globalAlpha = a; txt(TX[i], 720, BAR + 150 + i * 100, i ? 40 : 58, '#e8c060', { font: 'Georgia, serif', w: 700, glow: '#8a5a10', blur: 16 }); ctx.globalAlpha = 1; } });
  film(t); };
S.returns = async t => {
  const cam = camW(t, { z: 1.1, x: 1280, y: 780 }); apply(cam); wall('#e8e0c8', '#c8b898', 1180, '#8a7a6a', '#4a3a2a');
  for (let r = 0; r < 3; r++) { ctx.fillStyle = '#8a5a2a'; ctx.fillRect(120, 340 + r * 220, 900, 20); for (let i = 0; i < 6; i++) rr(140 + i * 145, 230 + r * 220, 120, 110, 6, ['#e23a3a', '#2a8a4a', '#2a3990', '#ffd23d'][(i + r) % 4], '#231A24', 4); }
  rr(1400, 400, 760, 140, 10, '#e23a3a', '#231A24'); txt('RETURNS & EXCHANGES', 1780, 450, 46, '#fff'); txt('Receipt required. Timeline optional.', 1780, 505, 26, '#ffe0e0');
  const wo = { x: 860, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > sp('WADE', 2).t0 ? 'smug' : 'happy' }, co = { x: 1820, y: 1450, s: 1.95, view: 'threequarter', dir: -1, expr: t > sp('WADE', 2).t1 ? 'blank' : 'deadpan' };
  await cast([[C.wade, 'WADE', wo], [XC.clerk, 'CLERK', co]], cam, t); apply(cam);
  desk(1180, 1160, 1000, 300, '#c8c0a8', '#8a8070', '#e23a3a'); PR.device({ x: 1380, y: 1110, s: 1.1, charges: 2 }, t); rr(1560, 1060, 180, 100, 6, '#f4f1ea', '#231A24', 4); txt('RECEIPT', 1650, 1095, 24, '#231A24'); txt('(2019)', 1650, 1130, 22, '#888'); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
