// DumDown Ironheart S1 cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
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
const JK = (c, sh, tie, ac) => ({ type: 'jacket', color: c, shirt: sh, tie: tie, accent: ac || shade(c), cuff: ac || shade(c), hem: -10, sleeves: 'long' });
const XC = {
  riShades: tw(C.riri, { acc: { glasses: '#111118' } }),
  hr: tw(C.hostW, { top: JK('#c84a8a', '#f4f1ea', null), defaultExpr: 'smile' }),
  host: tw(C.host, { top: JK('#c8a020', '#1a1a20', '#a01a1a'), defaultExpr: 'excited' }),
  pimp: tw(C.ex3, { top: { type: 'hoodie', color: '#1a1a1a', accent: '#ffd23d', cuff: '#ffd23d', hem: 14, sleeves: 'long' }, acc: { glasses: '#111' }, defaultExpr: 'excited' }),
  weather: tw(C.hostW, { top: JK('#2a8ad0', '#f4f1ea', null), defaultExpr: 'happy' }),
  op: tw(C.ex1, { top: { type: 'tee', color: '#5a3a8a', accent: '#3a2a5a', cuff: '#3a2a5a', hem: 14, sleeves: 'long' }, defaultExpr: 'deadpan' }),
  guy2: tw(C.ex2, { top: { type: 'tee', color: '#7a4ab0', accent: '#4a2a7a', cuff: '#4a2a7a', hem: 14, sleeves: 'short' }, defaultExpr: 'sad' }),
  guy3: tw(C.ex4, { top: { type: 'tee', color: '#3a6a4a', accent: '#2a4a3a', cuff: '#2a4a3a', hem: 14, sleeves: 'long' }, defaultExpr: 'deadpan' }),
  grp: tw(C.ex3, { top: { type: 'tee', color: '#8a6a4a', accent: '#5a4a2a', cuff: '#5a4a2a', hem: 14, sleeves: 'short' }, defaultExpr: 'neutral' }),
  robe: tw(C.parker, { top: { type: 'jacket', color: '#d89ab8', shirt: '#d89ab8', tie: null, accent: '#b07a98', cuff: '#b07a98', hem: -10, sleeves: 'long' }, defaultExpr: 'sad' }),
  kid: tw(C.ririKid, { acc: {}, defaultExpr: 'nervous' }),
};
const seen = (who, k = 0) => (t) => t > sp(who, k).t0 - .1;
const banner = (s, col = '#ffd23d', bg = 'rgba(10,10,40,.88)') => { screen(); rr(0, H - BAR - 120, W, 92, 0, bg); txt(s, W / 2, H - BAR - 74, 46, col); };
const fine = (s, t) => { screen(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '600 22px Inter'; ctx.textAlign = 'left'; ctx.fillText(s, 270, H - BAR - 12); };
function hatAt(f, col = '#3a2a8a') { ctx.save(); ctx.translate(f.x, f.y - 6 * f.sc); ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 46 * f.sc, 10 * f.sc, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-28 * f.sc, -2); ctx.lineTo(8 * f.sc, -90 * f.sc); ctx.lineTo(28 * f.sc, -2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); emo('⭐', f.x - 4 * f.sc, f.y - 50 * f.sc, 22 * f.sc); }
function headset(f) { ctx.save(); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(f.x, f.y + 20 * f.sc, 34 * f.sc, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.beginPath(); ctx.moveTo(f.x - 32 * f.sc, f.y + 30 * f.sc); ctx.quadraticCurveTo(f.x - 30 * f.sc, f.y + 70 * f.sc, f.x - 6 * f.sc, f.y + 72 * f.sc); ctx.stroke(); ctx.restore(); }
S.homework = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 780 }); plate('classroom', cam, 5); grade('#ffd080', .12); apply(cam);
  rr(1180, 330, 1100, 520, 10, '#2a4a3a', '#8a5a2a', 18); txt('HOMEWORK BY RIRI', 1730, 420, 70, '#f4f1ea', { font: 'Georgia, serif', w: 700 });
  if (t > sp('RIRI').t0) txt('CALCULUS ✓  PHYSICS ✓  ESSAYS ✓', 1730, 540, 40, '#ffd23d');
  if (t > sp('RIRI', 1).t0) { ctx.save(); ctx.translate(1730, 690); ctx.rotate(-.06); burst(0, 0, 120, t, '#e23a3a', '#ff6a6a', 14); txt('A+', 0, 4, 96, '#fff', { stroke: '#231A24' }); ctx.restore(); }
  const ro = { x: 720, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > sp('NARR').t0 ? 'shock' : 'smug', pose: lvl('RIRI', t) < 0 ? POSE.thumbsUp : undefined, hold: lvl('RIRI', t) < 0 };
  await cast([[XC.riShades, 'RIRI', ro]], cam, t); apply(cam);
  if (t > ev('cash')) for (let i = 0; i < 10; i++) emo('💵', 300 + i * 220, ((t - ev('cash')) * 500 + i * 90) % 1300 + 150, 70, i);
  banner('CALL 555-SMART · A+ OR YOUR MONEY BACK'); fine('*Not responsible for expulsions. Not affiliated with any university. Any more.', t); vhs(t, 1.1); pillar(); };
S.hr = async t => {
  const cam = camW(t, { z: 1.1, x: 1280, y: 780 }); plate('office', cam, 5); grade('#ffe0c0', .1); apply(cam);
  rr(1250, 400, 1020, 620, 10, '#f4f1ea', '#231A24'); txt('NEW HIRE ORIENTATION', 1760, 470, 52, '#c84a8a');
  ['1. LOCK APPLICANT IN BOX', '2. REMOVE OXYGEN', '3. WATCH (WITH SNACKS)'].forEach((l, i) => { if (t > sp('HR', i).t0) txt(l, 1300, 580 + i * 110, 50, '#231A24', { align: 'left' }); });
  if (t > sp('HR', 3).t0) txt('BENEFITS: DENTAL (PROBABLY)', 1760, 940, 40, '#2a8a4a');
  const ho = { x: 760, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: 'smile' };
  await cast([[XC.hr, 'HR', ho]], cam, t); apply(cam);
  if (t > ev('crunch')) emo('🍿', 1080 + Math.sin(t * 8) * 6, 1190, 110);
  { const on = t > ev('rimshot'); screen(); rr(300, BAR + 26, 460, 90, 14, on ? '#e23a3a' : '#3a1a1a', '#231A24', 6); txt('APPLAUSE', 530, BAR + 72, 54, on && Math.floor(t * 6) % 2 ? '#fff' : '#ffb0b0', { glow: on ? '#ff3a3a' : null }); }
  vhs(t, .7); };
S.ghost = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#2a1a4a', '#0a0818', '#8a5aff', t);
  txt('GHOST OR GLITCH?', 1280, 380, 120, '#c8b0ff', { glow: '#8a5aff', blur: 40, font: 'Georgia, serif' });
  for (let i = 0; i < 10; i++) { ctx.fillStyle = `rgba(200,200,230,${.08 + .04 * Math.sin(t + i)})`; ctx.beginPath(); ctx.ellipse((i * 330 + t * 60) % 2900 - 170, 1290 + (i % 3) * 40, 320, 70, 0, 0, 7); ctx.fill(); }
  const bz = ev('buzzer');
  const ho = { x: 520, y: 1430, s: 1.9, view: 'threequarter', dir: 1, expr: 'excited' }, ro = { x: 1950, y: 1430, s: 1.9, view: 'threequarter', dir: -1, expr: t > bz ? 'shock' : 'nervous', pose: POSE.think };
  const no = { x: 1500, y: 1400, s: 1.6, view: 'threequarter', dir: -1, expr: 'smug', pose: POSE.hips };
  await cast([[XC.host, 'HOST', ho], [C.natalie, 'NAT', no], [C.riri, 'RIRI', ro]], cam, t); apply(cam); { const h = hnd(XC.host, ho), f = head(XC.host, ho, 0); micAt(h, f, ho.s); }
  rr(1800, 1180, 300, 280, 10, '#5a3aa0', '#231A24', 6); txt('RIRI', 1950, 1250, 44, '#fff');
  if (t > bz && t < bz + 1.6) { screen(); txt('✖', W / 2, H / 2, 420, '#e23a3a', { stroke: '#231A24', lw: 30 }); } };
S.gps = async t => {
  const th = ev('thud'), cr = t > th; const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); plate('highway', { ...cam, x: 1280 + Math.sin(t * .5) * 40 }, 3); apply(cam);
  ctx.fillStyle = '#1a1a22'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(2560, 0); ctx.lineTo(2560, 1440); ctx.lineTo(0, 1440); ctx.closePath(); ctx.moveTo(220, 200); ctx.lineTo(220, 1000); ctx.lineTo(2340, 1000); ctx.lineTo(2340, 200); ctx.quadraticCurveTo(1280, 120, 220, 200); ctx.fill('evenodd');
  ctx.fillStyle = lg(0, 1000, 0, 1440, ['#3a3a48', '#14141a']); ctx.fillRect(0, 1000, 2560, 440);
  const ro = { x: 820, y: 1560, s: 2.2, view: 'threequarter', dir: 1, expr: cr ? 'shock' : t > sp('NAT', 2).t0 ? 'angry' : 'deadpan' };
  await cast([[C.riri, 'X', ro]], cam, t); apply(cam);
  ctx.save(); ctx.translate(780, 1260); ctx.rotate(Math.sin(t * 1.3) * .15); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, 0, 200, 0, 7); ctx.stroke(); ctx.restore();
  rr(1500, 740, 560, 340, 20, '#0a1a2a', '#231A24', 8); ctx.fillStyle = 'rgba(80,180,255,.25)'; ctx.fillRect(1520, 760, 520, 300);
  const no = { x: 1780, y: 1200, s: .9, view: 'front', expr: t > sp('NAT', 2).t0 ? 'smug' : 'deadpan', pose: POSE.point };
  await cast([[C.natalie, 'NAT', no]], cam, t); apply(cam); rr(1500, 1000, 560, 80, 0, '#0a1a2a'); txt(t > sp('NAT', 2).t0 ? 'RECALCULATING LIFE CHOICES' : t > sp('NAT', 1).t0 ? '↰ OTHER LEFT' : '← TURN LEFT', 1780, 1040, 34, '#5af0ff'); txt('BESTIE GPS', 1780, 1130, 40, '#5af0ff', { stroke: '#231A24' });
  if (cr && t < th + 1.2) { emo('💥', 1280, 600, 300); }
  vhs(t, .6); };
S.dads = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .06 }); apply(cam); wall('#c8b890', '#9a8a68', 1180, '#6a5a48', '#3a3024');
  rr(780, 300, 1000, 130, 10, '#f4f1ea', '#231A24'); txt('VILLAIN DADS ANONYMOUS', 1280, 345, 56, '#8a2a2a'); txt('Tuesdays · Coffee · No monologues', 1280, 400, 28, '#666');
  rr(2100, 760, 180, 240, 14, '#3a3a40', '#231A24', 6); txt('☕', 2190, 840, 70, '#fff'); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(2040, 1000, 300, 180);
  const jo = { x: 620, y: 1420, s: 1.7, view: 'threequarter', dir: 1, expr: t > sp('JOE', 1).t0 ? 'deadpan' : 'nervous' };
  const g1 = { x: 1060, y: 1420, s: 1.6, view: 'front', expr: 'sad' }, g2 = { x: 1500, y: 1420, s: 1.65, view: 'threequarter', dir: -1, expr: t > sp('GUY3').t0 ? 'shock' : 'sad' }, g3 = { x: 1920, y: 1420, s: 2.3, view: 'threequarter', dir: -1, expr: 'deadpan' };
  for (const x of [620, 1060, 1500, 1920]) chair(x, 1440, 1.25, '#5a6a8a');
  await cast([[C.joe, 'JOE', jo], [XC.grp, 'GRP', g1], [XC.guy2, 'GUY2', g2], [XC.guy3, 'GUY3', g3]], cam, t); apply(cam);
  if (t > sp('GUY2').t0) emo('🟣', 1500, 560, 80); if (t > sp('GUY3').t0) emo('🪐', 1920, 560, 90); };
S.weather = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a6ab0', '#1a3a7a']); ctx.fillRect(0, 0, 2560, 1440);
  ctx.fillStyle = '#6aa85a'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1000, 260); ctx.lineTo(2000, 260); ctx.lineTo(2000, 1100); ctx.lineTo(1000, 1100); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3a7ad8'; ctx.beginPath(); ctx.moveTo(1700, 260); ctx.lineTo(2000, 260); ctx.lineTo(2000, 1100); ctx.lineTo(1800, 1100); ctx.bezierCurveTo(1760, 800, 1650, 600, 1700, 260); ctx.fill(); ctx.stroke(); txt('LAKE', 1880, 600, 40, 'rgba(255,255,255,.6)');
  txt('CHICAGO', 1350, 360, 60, '#fff', { stroke: '#231A24' }); ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.arc(1560, 700, 16, 0, 7); ctx.fill();
  const k = seg(t, sp('WEATHER', 1).t0, sp('WEATHER', 1).t0 + .6); ctx.save(); ctx.translate(1560, lerp(500, 640, k)); ctx.fillStyle = '#9ab89a'; for (const [x, y, r] of [[-60, 0, 60], [0, -30, 75], [60, 0, 60]]) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); } ctx.fillStyle = '#7a0c14'; ctx.beginPath(); ctx.moveTo(-40, -70); ctx.quadraticCurveTo(0, -140, 40, -70); ctx.fill(); ctx.restore();
  txt('100%', 1350, 1000, 70, '#ffd23d', { stroke: '#231A24' });
  if (t > sp('WEATHER', 2).t0) { const x = lerp(2300, 1700, seg(t, sp('WEATHER', 2).t0, sp('WEATHER', 2).t1)); txt('❄ GUILT FRONT ❄', x, 900, 46, '#bfe8ff', { stroke: '#231A24' }); }
  const wo = { x: 620, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: 'happy', pose: lvl('WEATHER', t) < 0 ? { ...POSE.stand, R: { sh: 80, el: 10, hand: 'point' } } : undefined, hold: lvl('WEATHER', t) < 0 };
  await cast([[XC.weather, 'WEATHER', wo]], cam, t);
  screen(); rr(0, H - BAR - 110, W, 80, 0, 'rgba(10,20,60,.85)'); txt('DUMDOWN WEATHER · ONE BUILDING · VERY SPECIFIC', W / 2 - ((t * 120) % 400) + 200, H - BAR - 70, 40, '#ffd23d'); };
S.callcentre = async t => {
  const cam = camW(t, { z: 1.1, x: 1280, y: 780 }); plate('office', cam, 4); grade('#3a2a6a', .25, 'multiply'); apply(cam);
  rr(1180, 400, 960, 560, 12, '#14102a', '#231A24'); txt('☎ DARK DIMENSION SUPPORT', 1660, 470, 44, '#c86aff');
  ['1 · POSSESSION', '2 · CURSES', '3 · REFUNDS (HOLD FOREVER)'].forEach((l, i) => { if (t > sp('OP', 1).t0 + i * (i < 2 ? .9 : 0) && (i < 2 || t > sp('OP', 2).t0)) txt(l, 1240, 580 + i * 100, 46, i === 2 ? '#ff8a8a' : '#e8e0ff', { align: 'left' }); });
  if (t > ev('organ')) { const h = Math.floor((t - ev('organ')) * 7); txt('HOLD TIME: ' + (h > 5 ? '∞' : h + ' YEARS'), 1660, 910, 40, '#ffd23d'); emo('🎹', 2040, 800 + Math.sin(t * 6) * 10, 70); }
  const oo = { x: 820, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: 'deadpan' };
  await cast([[XC.op, 'OP', oo]], cam, t); apply(cam); { const f = head(XC.op, oo, -14); hatAt(f); const f2 = head(XC.op, oo, 0); headset(f2); }
  desk(380, 1180, 900, 280, '#3a3a4a', '#1a1a24', '#8a5aff'); };
S.pimp = async t => {
  const cam = camW(t, { z: 1.05, x: 1280, y: 760 }); plate('garage', cam, 4); grade('#ff3aa0', .12); apply(cam);
  txt('PIMP MY CYBORG', 1280, 500, 110, '#ffd23d', { stroke: '#231A24', glow: '#ff3aa0', blur: 30 });
  const zp = ev('zap'), wr = ev('wrench');
  const ho = { x: 700, y: 1440, s: 1.95, view: 'threequarter', dir: 1, expr: 'excited', pose: lvl('HOST2', t) < 0 ? POSE.fistPump : undefined, hold: lvl('HOST2', t) < 0 };
  const zo = { x: 1820, y: 1440, s: 1.95, view: 'threequarter', dir: -1, expr: t > sp('HOST2', 2).t0 ? 'sad' : t > zp ? 'shock' : 'smug' };
  await cast([[XC.pimp, 'HOST2', ho], [C.zeke, 'ZEKE', zo]], cam, t); apply(cam);
  if (t > wr) for (let i = 0; i < 4; i++) { const k = seg(t, wr + i * .25, wr + i * .25 + .5); if (k > 0 && k < 1) PR.armorPart({ x: lerp(1300, 1820 + (i - 1.5) * 80, k), y: lerp(1500, 900 + i * 60, k) - Math.sin(k * 3.14) * 200, s: .8, rot: k * 6 }, t); }
  if (t > zp && t < zp + .7) for (let i = 0; i < 12; i++) { ctx.strokeStyle = '#ffe85a'; ctx.lineWidth = 6; const a = i * .52 + t * 20; ctx.beginPath(); ctx.moveTo(1820, 900); ctx.lineTo(1820 + Math.cos(a) * 200, 900 + Math.sin(a) * 200); ctx.stroke(); }
  if (t > sp('HOST2', 2).t0) { screen(); ctx.save(); ctx.translate(W / 2, H - BAR - 90); ctx.rotate(-.02); rr(-430, -50, 860, 100, 12, '#ffd23d', '#231A24', 6); txt('RATING: STORE-BRAND', 0, 2, 52, '#231A24'); ctx.restore(); } };
S.terms = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#3a0a1a', '#120408', '#ff3a5a', t);
  const j = sp('JING'), hap = t > j.t0 - .1;
  ctx.save(); ctx.translate(1280, 640); burst(0, 0, 360, t, hap ? '#ffd23d' : '#3a1020', hap ? '#ff6a2b' : '#24080e', 20); ctx.restore();
  rr(1080, 960, 400, 240, 10, '#c9a046', '#231A24', 8); PR.cape({ x: 1280, y: 960, s: 1.6 }, t);
  if (hap) txt('HOOD™', 1280, 430, 110, '#fff', { stroke: '#231A24', glow: '#ff3a5a' });
  if (!hap) { screen(); const L = ['By wearing this hood you agree to: scars, visions, bad decisions,', 'the loss of your soul, a mandatory subscription to Dark Dimension Plus,', 'whispering, purple glowing, trust issues, one (1) devil pizza party,', 'cancellation is not possible, cancellation was never possible,', 'side effects may include becoming the villain of a TV show.'];
    rr(250, H - BAR - 250, 1050, 230, 10, 'rgba(10,4,8,.8)'); ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.font = '600 26px Inter'; ctx.textAlign = 'left'; const y0 = H - BAR - 40 - ((t - OPEN) * 60) % 260; L.forEach((l, i) => ctx.fillText(l, 280, y0 - (L.length - i) * 34)); }
  else banner("HOOD! IT'S TO DIE FOR!", '#231A24', '#ffd23d'); vhs(t, .9); };
S.rehab = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 780 }); plate('ri_bedroom', cam, 4); grade('#2a3a6a', .3, 'multiply'); apply(cam);
  const po = { x: 1600, y: 1450, s: 2.05, view: 'threequarter', dir: -1, expr: 'sad', pose: { ...POSE.stand, R: { sh: 30, el: 130, hand: 'grab' }, L: { sh: -30, el: -130, hand: 'grab' } }, hold: lvl('PARKER', t) < 0 };
  await cast([[XC.robe, 'PARKER', po]], cam, t); apply(cam);
  ctx.save(); ctx.translate(1600, 1150); ctx.rotate(.05 + Math.sin(t * 2) * .02); rr(-180, -140, 360, 300, 40, '#7ab0e0', '#231A24', 6); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-160, -100 + i * 70); ctx.lineTo(160, -100 + i * 70); ctx.stroke(); } ctx.restore();
  if (t > sp('PARKER').t0) emo('😈', 1300 + Math.sin(t * 3) * 30, 760, 70);
  if (t > sp('ANN', 2).t0) { ctx.save(); ctx.translate(820, 640); ctx.rotate(-.08); burst(0, 0, 240, t, '#ffd23d', '#2fc6ff', 16); txt('UN-CURSED', 0, -20, 58, '#231A24'); txt('BLANKETS', 0, 40, 50, '#231A24'); ctx.restore(); }
  banner('CALL 1-800-HOOD-GONE', '#ffd23d'); if (t > sp('ANN', 3).t0) fine('*Mostly.', t); vhs(t, 1); pillar(); };
S.hellTank = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#4a0a0a', '#1a0404', '#ff5a1a', t);
  for (let i = 0; i < 14; i++) { const x = i * 190 + 60, h = 160 + 60 * Math.sin(t * 7 + i * 1.7); ctx.fillStyle = lg(0, 1180 - h, 0, 1180, ['rgba(255,220,80,.0)', 'rgba(255,120,30,.9)']); ctx.beginPath(); ctx.moveTo(x - 70, 1180); ctx.quadraticCurveTo(x, 1180 - h * 1.4, x + 70, 1180); ctx.fill(); }
  txt('SHARK TANK', 1280, 330, 90, '#ffd0a0', { glow: '#ff3a1a', blur: 30 }); txt('HELL EDITION', 1280, 430, 56, '#ff6a3a');
  const gv = ev('gavel3'); const mo = { x: 1820, y: 1430, s: 1.95, view: 'threequarter', dir: -1, expr: t > gv ? 'happy' : 'smug' }, ro = { x: 720, y: 1430, s: 1.9, view: 'threequarter', dir: 1, expr: t > gv ? 'smug' : 'deadpan', pose: lvl('RIRI', t) >= 0 ? undefined : POSE.hips };
  rr(1640, 1000, 360, 320, 40, '#2a0a0a', '#231A24', 8);
  await cast([[C.riri, 'RIRI', ro], [C.mephisto, 'MEPH', mo]], cam, t); apply(cam);
  rr(1080, 940, 400, 170, 10, '#3a1a1a', '#231A24', 6); txt('ASK: 1 BESTIE', 1280, 990, 32, '#ffd23d'); txt(t > sp('RIRI').t0 ? 'OFFER: 50% SOUL' : 'OFFER: 100% SOUL', 1280, 1050, 32, '#ff8a6a');
  if (t > gv) { screen(); ctx.save(); ctx.translate(W / 2, BAR + 130); ctx.rotate(-.05); rr(-260, -60, 520, 120, 14, '#e23a3a', '#231A24', 8); txt('DEAL!', 0, 4, 80, '#fff'); ctx.restore(); } };
S.quiz = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#2aa0e0', '#1a5aa0', '#ffd23d', t);
  txt('DUMDOWN DEAL CHECKER', 1280, 330, 90, '#fff', { stroke: '#231A24' });
  const bz = ev('buzzer'); [['A · EAT IT 🍕', 900, '#2a8a4a'], ['B · RUN 🏃', 1660, '#e23a3a']].forEach(([s, x, c]) => { rr(x - 320, 470, 640, 130, 20, c, '#231A24', 8); txt(s, x, 535, 52, '#fff'); });
  const ho = { x: 520, y: 1430, s: 1.9, view: 'threequarter', dir: 1, expr: t > bz ? 'smug' : 'excited' }, ko = { x: 2000, y: 1430, s: 2.6, view: 'threequarter', dir: -1, expr: t > bz ? 'shock' : 'nervous' };
  await cast([[XC.host, 'HOST', ho], [XC.kid, 'KID', ko]], cam, t); apply(cam); { const h = hnd(XC.host, ho), f = head(XC.host, ho, 0); micAt(h, f, ho.s); }
  rr(1880, 1260, 240, 200, 10, '#ffd23d', '#231A24', 6); PR.pizza({ x: 1280, y: 1150, s: 1.1, n: 1 }, t);
  if (t > bz && t < bz + 1.8) { screen(); txt('✖', 900 * W / 2560 + 0, 535 * H / 1440, 260, '#e23a3a', { stroke: '#231A24', lw: 24 }); } };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
