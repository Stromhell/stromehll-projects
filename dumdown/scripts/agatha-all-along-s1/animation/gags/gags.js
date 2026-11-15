// DumDown Agatha All Along S1 cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
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
  for (const e of evs('sad_trombone')) { const k = seg(t, e.t, e.t + .6) * (1 - seg(t, e.t + 1.8, e.t + 2.4)); if (k > 0) { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = `rgba(128,128,128,${k * .85})`; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; } }
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
  host: tw(C.host, { top: JK('#7a2a9a', '#1a1a20', '#ffd23d'), defaultExpr: 'excited' }),
  hostW: tw(C.hostW, { top: JK('#c84a5a', '#f4f1ea', null), defaultExpr: 'smile' }),
  j1: tw(C.prof, { top: JK('#2a2a30', '#f4f1ea', '#a01a1a'), defaultExpr: 'deadpan' }),
  j2: tw(C.hostW, { top: JK('#e0a020', '#1a1a20', null), defaultExpr: 'deadpan' }),
  j3: tw(C.ex2, { top: { type: 'tee', color: '#1a1a1a', accent: '#5a5a5a', cuff: '#5a5a5a', hem: 14, sleeves: 'long' }, acc: { glasses: '#111' }, defaultExpr: 'smug' }),
  somm: tw(C.ex4, { top: JK('#5a1a2a', '#f4f1ea', '#231A24'), defaultExpr: 'smug' }),
  agent: tw(C.hostW, { top: JK('#3a7ab0', '#f4f1ea', null), defaultExpr: 'smile' }),
  guide: tw(C.ex3, { top: { type: 'tee', color: '#f0a020', accent: '#c07a10', cuff: '#c07a10', hem: 14, sleeves: 'short' }, defaultExpr: 'excited' }),
};
const ghostCast = async (list, cam, t) => { await chars(list.map(([spc, who, o, g]) => g ? `<g opacity="${g}">${person(spc, who, t, o)}</g>` : person(spc, who, t, o)), cam); };
function candleAt(h, sc, t, col = '#7ac84a') { ctx.save(); ctx.translate(h.x, h.y - 10 * sc); rr(-12 * sc, -60 * sc, 24 * sc, 70 * sc, 4 * sc, col, '#231A24', 2.5 * sc); ctx.fillStyle = '#231A24'; ctx.fillRect(-1.5 * sc, -70 * sc, 3 * sc, 10 * sc);
  const f = 1 + Math.sin(t * 23) * .12; ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.ellipse(0, -80 * sc, 6 * sc * f, 13 * sc * f, 0, 0, 7); ctx.fill(); ctx.restore(); }
function glassAt(h, sc, col = '#7a1a2a') { ctx.save(); ctx.translate(h.x, h.y - 6 * sc); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.5 * sc; ctx.fillStyle = 'rgba(230,240,255,.5)';
  ctx.beginPath(); ctx.moveTo(-14 * sc, -58 * sc); ctx.quadraticCurveTo(-16 * sc, -26 * sc, 0, -22 * sc); ctx.quadraticCurveTo(16 * sc, -26 * sc, 14 * sc, -58 * sc); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-13 * sc, -42 * sc); ctx.quadraticCurveTo(-12 * sc, -26 * sc, 0, -24 * sc); ctx.quadraticCurveTo(12 * sc, -26 * sc, 13 * sc, -42 * sc); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, -22 * sc); ctx.lineTo(0, 4 * sc); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 5 * sc, 11 * sc, 3 * sc, 0, 0, 7); ctx.stroke(); ctx.restore(); }
function flagAt(h, sc, t) { ctx.save(); ctx.translate(h.x, h.y); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4 * sc; ctx.beginPath(); ctx.moveTo(0, 20 * sc); ctx.lineTo(0, -150 * sc); ctx.stroke();
  ctx.fillStyle = '#7ac84a'; ctx.beginPath(); ctx.moveTo(0, -150 * sc); for (let i = 0; i <= 6; i++) ctx.lineTo(i * 14 * sc, -150 * sc + Math.sin(t * 6 + i) * 5 * sc); for (let i = 6; i >= 0; i--) ctx.lineTo(i * 14 * sc, -100 * sc + Math.sin(t * 6 + i) * 5 * sc); ctx.closePath(); ctx.fill(); ctx.lineWidth = 2.5 * sc; ctx.stroke(); ctx.restore(); }
function envAt(h, sc) { ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(-.15); rr(-30 * sc, -46 * sc, 60 * sc, 40 * sc, 3 * sc, '#f4ecd8', '#231A24', 2.5 * sc); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2 * sc; ctx.beginPath(); ctx.moveTo(-30 * sc, -46 * sc); ctx.lineTo(0, -24 * sc); ctx.lineTo(30 * sc, -46 * sc); ctx.stroke(); ctx.restore(); }
function cask(x, y) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#7a4a24'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, 0, 100, 80, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#a0683a'; ctx.beginPath(); ctx.ellipse(0, 0, 70, 56, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#3a3a40'; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, 0, 86, 68, 0, 0, 7); ctx.stroke(); ctx.fillStyle = '#5a1a2a'; ctx.beginPath(); ctx.arc(0, 30, 9, 0, 7); ctx.fill(); ctx.restore(); }
function sofa(x, y, w, col) { rr(x - w / 2, y - 220, w, 150, 30, shade(col), '#231A24', 6); rr(x - w / 2 - 30, y - 140, w + 60, 110, 26, col, '#231A24', 6); rr(x - w / 2 - 50, y - 200, 70, 180, 24, shade(col), '#231A24', 6); rr(x + w / 2 - 20, y - 200, 70, 180, 24, shade(col), '#231A24', 6); }
function flames(x, y, w, t, k = 1) { for (let i = 0; i < 9; i++) { const xx = x - w / 2 + (i + .5) / 9 * w, hh = (120 + 80 * Math.sin(t * 9 + i * 1.7)) * k; ctx.fillStyle = i % 2 ? '#ff6a2b' : '#ffd23d'; ctx.beginPath(); ctx.moveTo(xx - 40, y); ctx.quadraticCurveTo(xx - 30, y - hh * .6, xx + Math.sin(t * 7 + i) * 14, y - hh); ctx.quadraticCurveTo(xx + 30, y - hh * .6, xx + 40, y); ctx.fill(); } glowS(x, y - 80, w * .6, 'rgba(255,140,40,A)', .25 * k); }
function grave(x, y, s, label) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#8a8a90'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(-90, -160); ctx.arc(0, -160, 90, Math.PI, 0); ctx.lineTo(90, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); txt(label, 0, -150, 34, '#3a3a40'); ctx.restore(); }
const seen = (who, k = 0) => (t) => t > sp(who, k).t0 - .1;
const banner = (s, col = '#ffd23d', bg = 'rgba(10,10,40,.88)') => { screen(); rr(0, H - BAR - 120, W, 92, 0, bg); txt(s, W / 2, H - BAR - 74, 46, col); };
const fine = (s, t) => { screen(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '600 22px Inter'; ctx.textAlign = 'left'; ctx.fillText(s, 270, H - BAR - 12); };
const lower = (a, b, col = '#7ac84a') => { screen(); ctx.save(); ctx.translate(140, H - BAR - 190); rr(0, 0, 900, 70, 6, '#f4f1ea', '#231A24', 4); ctx.fillStyle = col; ctx.fillRect(0, 0, 16, 70); txt(a, 34, 36, 38, '#231A24', { align: 'left' }); if (b) { rr(0, 74, 900, 50, 6, '#231A24'); txt(b, 34, 100, 28, '#f4f1ea', { align: 'left', w: 600 }); } ctx.restore(); };
S.lawwitch = async t => {
  const cam = camW(t, { z: 1.12, x: 1280, y: 780, push: .08 }); plate('interrog', cam, 2); grade('#3060a0', .28); apply(cam);
  const g0 = sp('GRIM').t0, g1 = sp('GRIM', 1).t0, g2 = sp('GRIM', 2).t0, nr = t > sp('NARR').t0;
  PR.table({ x: 1280, y: 1300, w: 1100, col: '#3a3a44' });
  const ao = { x: 760, y: 1450, s: 1.95, view: 'threequarter', dir: 1, expr: t > g1 ? 'smug' : 'deadpan', pose: POSE.hips, hold: true }, no = { x: 1820, y: 1450, s: 1.95, view: 'threequarter', dir: -1, expr: nr ? 'shock' : t > g2 ? 'nervous' : 'neutral', pose: POSE.think, hold: true };
  await cast([[C.agathaRobe, 'X', ao], [C.agnes, 'X', no]], cam, t); apply(cam);
  if (t > g1) { rr(460, 560, 600, 110, 10, 'rgba(10,14,30,.85)', '#c8d8ff', 4); txt('THE WITCHES WHO DID IT', 760, 616, 40, '#f4f1ea', { font: 'Georgia, serif', w: 700 }); }
  if (t > g2) { rr(1460, 560, 720, 110, 10, 'rgba(10,14,30,.85)', '#c8d8ff', 4); txt('THE WITCHES WHO FORGOT', 1820, 616, 40, '#f4f1ea', { font: 'Georgia, serif', w: 700 }); }
  if (t < g0 + 2.2) { screen(); ctx.fillStyle = `rgba(0,0,0,${.9 * (1 - seg(t, g0 + 1.6, g0 + 2.2))})`; ctx.fillRect(0, 0, W, H); if (t > g0 - .2) txt('In the world of magic...', W / 2, H / 2, 64, '#f4f1ea', { font: 'Georgia, serif', w: 400 }); }
  if (nr) banner('NOW A REAL GENRE', '#fff', 'rgba(160,20,20,.9)');
  film(t); };
S.dating = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#d04a8a', '#5a1a4a', '#ffb0d8', t);
  txt("IT'S COMPLICATED", 1280, 400, 110, '#fff', { stroke: '#231A24', glow: '#ff6ab0' });
  rr(1000, 520, 40, 700, 6, '#f4e0ff', '#231A24', 5);
  const zp = ev('zap'), ho = { x: 520, y: 1440, s: 1.9, view: 'threequarter', dir: 1, expr: 'excited' };
  const ao = { x: 1480, y: 1440, s: 1.85, view: 'threequarter', dir: -1, expr: t > zp ? 'smile' : 'smug' }, ro = { x: 2080, y: 1440, s: 1.85, view: 'threequarter', dir: -1, expr: t > zp ? 'smile' : 'deadpan' };
  await cast([[XC.host, 'HOST', ho], [C.agatha, 'AGATHA', ao], [C.rioDeath, 'RIO', ro]], cam, t); apply(cam); { const h = hnd(XC.host, ho), f = head(XC.host, ho, 0); micAt(h, f, ho.s); }
  [[1480, 'BACHELORETTE #1', 'tried to kill her'], [2080, 'BACHELORETTE #2', 'is Death']].forEach(([x, a, b], i) => { rr(x - 260, 1180, 520, 150, 12, '#ffd23d', '#231A24', 6); txt(a, x, 1226, 38, '#231A24'); if (t > sp('HOST', i + 1).t0) txt(b, x, 1284, 32, '#a01a4a', { w: 700 }); });
  if (t > zp) for (let i = 0; i < 8; i++) emo('💘', 1780 + Math.sin(i * 2.3) * 300, 900 - ((t - zp) * 260 + i * 70) % 600, 70, Math.sin(t * 4 + i) * .3);
  if (t > sp('NARR').t0) banner('HEALTHIEST COUPLE ON THE SHOW (SOMEHOW)'); };
S.kalekare = async t => {
  const cam = camW(t, { z: 1.12, x: 1280, y: 780 }); plate('candyshop', cam, 5); grade('#c8ffb0', .14); apply(cam);
  rr(1230, 400, 820, 520, 20, '#f4fff0', '#231A24', 8); txt('KALE KARE™', 1640, 490, 96, '#3a8a2a', { font: 'Georgia, serif', w: 700 });
  if (t > sp('JEN').t0) txt('probiotic candle', 1640, 580, 50, '#5a7a4a', { w: 600 });
  ['LIGHT IT.', 'EAT IT.', 'GLOW.'].forEach((l, i) => { if (t > sp('JEN', 1).t0 + i * .55) txt(l, 1640, 680 + i * 76, 58, '#231A24'); });
  const jo = { x: 760, y: 1500, s: 2.3, view: 'threequarter', dir: 1, expr: t > sp('NARR').t0 ? 'smug' : 'happy' };
  await cast([[C.jen, 'JEN', jo]], cam, t); apply(cam); candleAt(hnd(C.jen, jo), jo.s, t);
  if (t > ev('crunch') && t < ev('crunch') + 1.2) emo('😋', 1080, 760, 110);
  if (t > sp('FAST').t0 && t < sp('FAST').t1 + .4) { screen(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, H - BAR - 210, W, 90); txt('DO NOT EAT WHILE LIT · MAY CAUSE SKIN GRAFTS · 800 LAWSUITS PENDING', W / 2, H - BAR - 165, 30, '#fff', { w: 600 }); }
  banner('KALE KARE · NOW 40% LESS FLAMMABLE', '#e0ffc8', 'rgba(20,50,20,.9)'); fine('*Not approved by anyone. Product is a candle. Do not eat the candle.', t); vhs(t, 1.0); pillar(); };
S.judges = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#1a2a5a', '#0a0a20', '#ffd23d', t);
  const v = sp('J3').t0, yes = t > ev('gavel');
  if (t > v) PR.portalRing({ x: 640, y: 1120, s: 1.3 }, t);
  txt('THE RIGHT KEY', 1280, 380, 100, '#ffd23d', { stroke: '#231A24' });
  const to = { x: 640, y: 1440, s: 1.95, view: 'threequarter', dir: 1, expr: t > sp('J1').t0 && !yes ? 'nervous' : 'excited' };
  const js = [[XC.j1, 'J1', 1500], [XC.j2, 'J2', 1880], [XC.j3, 'J3', 2260]].map(([s, w, x]) => [s, w, { x, y: 1420, s: 1.55, view: 'threequarter', dir: -1, expr: yes ? 'happy' : s.defaultExpr }]);
  await cast([[C.teen, 'SING', to], ...js], cam, t); apply(cam); { const h = hnd(C.teen, to), f = head(C.teen, to, 0); micAt(h, f, to.s); }
  desk(1260, 1180, 1240, 260, '#2a2a3a', '#14141e', '#ffd23d'); [1500, 1880, 2260].forEach((x, i) => { const on = yes || (i < 2 && t > sp(i ? 'J2' : 'J1').t0); rr(x - 70, 1220, 140, 90, 14, on ? (yes ? '#2aa04a' : '#e23a3a') : '#3a3a44', '#231A24', 5); txt(on ? (yes ? '✓' : '✗') : '', x, 1266, 60, '#fff'); });
  if (t > sp('SING').t0 && t < sp('SING').t1 + .3) for (let i = 0; i < 4; i++) emo('🎵', 760 + i * 90, 700 - ((t * 120 + i * 60) % 260), 60);
  if (yes) banner("PORTAL OPENED = YOU'RE THROUGH", '#7aff9a'); };
S.wine = async t => {
  const cam = camW(t, { z: 1.06, x: 1280, y: 760, push: .05 }); apply(cam); wall('#3a2418', '#1a100a', 1180, '#4a3020', '#22140c');
  for (let i = 0; i < 9; i++) { ctx.fillStyle = 'rgba(255,200,120,.05)'; ctx.fillRect(i * 300, 0, 120, 1180); }
  for (const [x, y] of [[1050, 1080], [1250, 1080], [1150, 920], [2250, 1080], [2450, 1080], [2350, 920]]) cask(x, y); apply(cam); glowS(700, 520, 500, 'rgba(255,190,100,A)', .25); apply(cam);
  const nr = t > sp('NARR').t0;
  rr(1450, 400, 760, 170, 12, '#f4ecd8', '#231A24', 6); txt('WITCHY WINE CO.', 1830, 455, 50, '#5a1a2a', { font: 'Georgia, serif', w: 700 }); txt('Cursed Cabernet · 1693', 1830, 520, 32, '#231A24', { w: 600 });
  if (!nr) ['OAK', 'BLACKBERRY', 'ANCIENT CURSE'].forEach((l, i) => { if (t > sp('SOMM').t0 + i * 1.0) { rr(1580, 620 + i * 100, 500, 76, 38, i === 2 ? '#7a1a2a' : '#e8d8b8', '#231A24', 4); txt(l, 1830, 659 + i * 100, 36, i === 2 ? '#fff' : '#231A24'); } });
  else [['CRITICS', '99'], ['CORONER', '1']].forEach(([a, b], i) => { if (t > sp('NARR').t0 + i * 1.6) { rr(1500 + i * 360, 620, 300, 230, 16, i ? '#231A24' : '#ffd23d', '#231A24', 6); txt(b, 1650 + i * 360, 710, 100, i ? '#ff5a5a' : '#231A24'); txt(a, 1650 + i * 360, 800, 32, i ? '#fff' : '#231A24'); } });
  const so = { x: 700, y: 1500, s: 2.3, view: 'threequarter', dir: 1, expr: nr ? 'shock' : 'smug' };
  await cast([[XC.somm, 'SOMM', so]], cam, t); apply(cam); glassAt(hnd(XC.somm, so), so.s); };
S.concert = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#2a0a3a', '#08040e', '#7ac84a', t);
  const br = ev('braam'), lit = t > br;
  txt('BAND OF WITCHES', 1280, 370, 116, '#7ac84a', { stroke: '#231A24', glow: '#5aff7a' }); txt('LIVE! ONE NIGHT ONLY', 1280, 480, 52, '#fff', { stroke: '#231A24' });
  if (t > sp('ANN', 1).t0) { ctx.save(); ctx.translate(2220, 640); ctx.rotate(.12); rr(-200, -60, 400, 120, 14, '#e23a3a', '#231A24', 6); txt('0 REHEARSALS', 0, 2, 40, '#fff'); ctx.restore(); }
  if (lit) flames(1280, 1250, 2300, t, Math.min(1, (t - br) * 3));
  const band = [[C.agathaHat, 400], [C.teen, 840], [C.lilia, 1280], [C.jen, 1720], [C.alice, 2160]].map(([s, x], i) => [s, 'X', { x, y: 1440, s: 1.6, view: 'front', expr: lit ? 'shock' : 'excited', pose: i % 2 ? POSE.fistPump : POSE.wave, hold: true, ph: i }]);
  await cast(band, cam, t); apply(cam);
  for (let i = 0; i < 5; i++) cone(400 + i * 440, 0, 30, 220, 1300, i % 2 ? 'rgba(120,255,140,A)' : 'rgba(200,120,255,A)', .14 + .08 * Math.sin(t * 5 + i));
  if (t > sp('ANN', 2).t0) banner('TICKETS INCLUDE FREE FIRE 🔥', '#ffd23d', 'rgba(40,10,10,.9)'); };
S.talkshow = async t => {
  const cam = camW(t, { z: 1.02, x: 1280, y: 760 }); apply(cam); studio('#c87a4a', '#5a2a1a', '#ffd0a0', t);
  txt('DR. WITCH', 1280, 380, 110, '#fff', { stroke: '#231A24', font: 'Georgia, serif' });
  sofa(1700, 1300, 900, '#7a3a5a'); chair(560, 1320, 1.6, '#3a5a7a');
  const ho = { x: 560, y: 1440, s: 1.85, view: 'threequarter', dir: 1, expr: t > sp('MOM').t0 ? 'shock' : 'neutral' };
  const mo = { x: 1450, y: 1440, s: 1.85, view: 'threequarter', dir: -1, expr: 'angry' }, ao = { x: 1980, y: 1440, s: 1.85, view: 'threequarter', dir: -1, expr: t > sp('AGATHA').t0 ? 'smug' : 'deadpan', pose: POSE.hips };
  await cast([[XC.hostW, 'HOSTW', ho], [C.evanora, 'MOM', mo], [C.agathaRobe, 'AGATHA', ao]], cam, t); apply(cam);
  if (t > sp('MOM').t0) lower('MOM TRIED TO EXECUTE ME', 'Salem, 1693 · family therapy, session 1', '#e23a3a');
  if (t > sp('NARR').t0) banner('NEXT WEEK: THERAPIST OR EXORCIST?'); };
S.maury = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#2a3a6a', '#0e1428', '#5ad0ff', t);
  const ah = ev('airhorn'), rev = t > ah;
  txt('THE RESULTS SHOW', 1000, 400, 96, '#fff', { stroke: '#231A24' }); txt('SOUL EDITION', 1000, 490, 50, '#5ad0ff', { stroke: '#231A24' });
  rr(1500, 560, 760, 380, 16, '#0a1428', '#231A24', 8); txt('RESULTS', 1880, 620, 40, '#5ad0ff');
  txt(rev ? 'NOT JUST WILLIAM' : t > sp('HOST').t0 ? 'WILLIAM KAPLAN, 16' : '???', 1880, 740, rev ? 66 : 52, rev ? '#ff5a5a' : '#fff');
  if (rev) txt('1 BODY · 2 SOULS · 0 DNA SENSE', 1880, 850, 32, '#ffd23d');
  const jump = rev ? Math.abs(Math.sin((t - ah) * 7)) * 90 * (1 - seg(t, ah, ah + 2)) : 0;
  const ho = { x: 520, y: 1440, s: 1.9, view: 'threequarter', dir: 1, expr: 'excited' }, bo = { x: 1180, y: 1440 - jump, s: 1.75, view: 'threequarter', dir: -1, expr: rev ? 'excited' : 'nervous', pose: rev ? POSE.fistPump : undefined, hold: rev };
  await cast([[XC.host, 'HOST', ho], [C.billy, 'BILLY', bo]], cam, t); apply(cam); envAt(hnd(XC.host, ho), ho.s);
  if (t > sp('NARR').t0) banner('THE DNA TEST HAS LEFT THE BUILDING'); };
S.app = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); plate('snow_forest', cam, 10); grade('#2a1a3a', .45); apply(cam);
  const sw = ev('swipe'), mt = ev('dingding'), k = seg(t, sw, sw + .5);
  rr(900, 230, 760, 1060, 60, '#14141c', '#231A24', 10); rr(925, 260, 710, 1000, 44, '#f4eef4');
  txt('witchr', 1280, 300, 44, '#c84a8a', { font: 'Georgia, serif', w: 700 });
  if (t < mt) { ctx.save(); ctx.translate(k * 900, 0); ctx.rotate(k * .25); rr(955, 340, 650, 780, 26, '#2a3a2a', '#231A24', 6); ctx.restore();
    const ro = { x: 1280 + k * 900, y: 1030, s: 1.15, view: 'front', expr: 'smile' }; await cast([[C.rioDeath, 'RIO', ro]], cam, t); apply(cam);
    ctx.save(); ctx.translate(k * 900, 0); ctx.rotate(k * .25); rr(955, 990, 650, 130, 0, 'rgba(10,10,10,.78)'); txt('RIO, 30-ish (actually eternal)', 1280, 1030, 30, '#fff'); txt('📍 everywhere, eventually', 1280, 1080, 26, '#c8ffc8', { w: 600 }); ctx.restore();
    if (t > sp('RIO').t0 && k === 0) { rr(975, 360, 610, 110, 18, 'rgba(255,255,255,.94)', '#231A24', 3); txt(t > sp('RIO', 1).t0 ? 'Seeking: someone who never leaves 💀' : 'Into: forests, cycles, decay 🍂', 1280, 415, 27, '#231A24', { w: 700 }); }
    for (const [x, c, sy] of [[1120, '#e23a3a', '✖'], [1440, '#2aa04a', '♥']]) { ctx.beginPath(); ctx.arc(x, 1190, 46, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = c; ctx.stroke(); txt(sy, x, 1192, 46, c); }
  } else {
    ctx.save(); ctx.beginPath(); ctx.roundRect(925, 260, 710, 1000, 44); ctx.clip(); burst(1280, 760, 700, t, '#ff6ab0', '#ffb0d8', 20); ctx.restore(); txt("IT'S A MATCH!", 1280, 440, 76, '#fff', { stroke: '#c84a8a' });
    const ao = { x: 1120, y: 1180, s: 1.05, view: 'threequarter', dir: 1, expr: 'smug' }, ro = { x: 1440, y: 1180, s: 1.05, view: 'threequarter', dir: -1, expr: 'smile' };
    await cast([[C.agatha, 'AGATHA', ao], [C.rioDeath, 'RIO', ro]], cam, t); apply(cam); }
  if (t > sp('APP').t0 && t < sp('APP').t1 + .5) { rr(960, 270, 640, 70, 20, '#c84a8a'); txt('🔔 New match nearby!', 1280, 305, 32, '#fff'); }
  if (t > sp('NARR').t0) for (let i = 0; i < 8; i++) { const x = i < 4 ? 260 + (i % 2) * 330 : 1980 + (i % 2) * 330, y = 520 + Math.floor((i % 4) / 2) * 420; emo('🚩', x, y + Math.sin(t * 5 + i) * 20, 120); } };
S.insurance = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 780, push: .05 }); plate('backyard', cam, 5); grade('#ffe8c0', .2); apply(cam);
  grave(2080, 1250, 1.4, 'R.I.P.'); glowS(2080, 900, 400, 'rgba(255,255,230,A)', .2);
  rr(1150, 400, 820, 230, 16, 'rgba(255,255,255,.9)', '#231A24', 5); txt('WITCH LIFE', 1560, 470, 80, '#3a7ab0', { font: 'Georgia, serif', w: 700 }); txt('insurance for the eventually dead', 1560, 560, 36, '#5a5a6a', { w: 600 });
  const ao = { x: 700, y: 1500, s: 2.3, view: 'threequarter', dir: 1, expr: t > sp('FAST').t0 ? 'nervous' : 'smile' };
  await cast([[XC.agent, 'AGENT', ao]], cam, t); apply(cam);
  if (t > sp('AGENT', 1).t0) emo('💐', 2080, 1200, 110);
  if (t > sp('FAST').t0) { screen(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, H - BAR - 210, W, 80); txt('*COVERAGE VOID IF YOU DATE, KISS, OR ARE DEATH', W / 2, H - BAR - 170, 30, '#fff', { w: 600 }); }
  banner('CALL 1-800-NOT-YET · WITCH LIFE', '#fff', 'rgba(30,60,100,.9)'); fine('*Read the fine print, ladies. Then read it again.', t); vhs(t, .8); };
S.travel = async t => {
  const cam = camW(t, { z: 1.08, x: 1280 + t * 8, y: 780 }); plate('road', cam, 3); grade('#ffd890', .16); apply(cam);
  rr(1180, 400, 880, 520, 16, '#7ac84a', '#231A24', 8); txt("WITCHES' ROAD TOURS", 1620, 470, 60, '#231A24', { font: 'Georgia, serif', w: 700 });
  ['✓ 5 FANTASTIC TRIALS', '✓ FREE POISON', '✓ OPTIONAL DEATH'].forEach((l, i) => { if (t > sp('GUIDE').t0 + i * 1.1) txt(l, 1240, 580 + i * 80, 46, '#fff', { align: 'left', stroke: '#231A24', lw: 8 }); });
  if (t > sp('GUIDE', 1).t0) { ctx.save(); ctx.translate(1620, 840); ctx.rotate(-.05); rr(-380, -40, 760, 80, 10, '#ffd23d', '#231A24', 5); txt('FULL REFUND IF YOU DON\'T SURVIVE', 0, 2, 34, '#231A24'); ctx.restore(); }
  const go = { x: 700, y: 1500, s: 2.3, view: 'threequarter', dir: 1, expr: t > sp('NARR').t0 ? 'sad' : 'excited' };
  await cast([[XC.guide, 'GUIDE', go]], cam, t); apply(cam); flagAt(hnd(XC.guide, go), go.s, t);
  if (t > sp('NARR').t0) { screen(); rr(W / 2 - 360, H - BAR - 150, 720, 110, 14, '#fff', '#231A24', 5); stars(W / 2 - 300, H - BAR - 95, 1, 60); txt('"Would not walk again."', W / 2 + 90, H - BAR - 95, 32, '#231A24', { w: 600 }); }
  vhs(t, .7); pillar(); };
S.sitcom = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 790 }); plate('living', cam, 2); grade('#ffe0a0', .2); apply(cam);
  const boo = sp('AGATHA').t0, jmp = t > boo ? Math.abs(Math.sin((t - boo) * 8)) * 70 * (1 - seg(t, boo, boo + 1.4)) : 0;
  sofa(1500, 1330, 800, '#c86a3a');
  const bo = { x: 1250, y: 1460 - jmp, s: 1.95, view: 'threequarter', dir: -1, expr: t > boo ? (t > sp('BILLY').t0 ? 'deadpan' : 'shock') : 'neutral' };
  const ao = { x: 1760, y: 1440 + Math.sin(t * 2) * 12, s: 1.95, view: 'threequarter', dir: -1, expr: 'smug', pose: t > boo && t < boo + 1.2 ? POSE.wave : undefined, hold: t > boo && t < boo + 1.2 };
  await ghostCast([[C.billy, 'BILLY', bo], [C.agathaGhost, 'AGATHA', ao, .62]], cam, t); apply(cam);
  const card = t < sp('ANN', 2).t1 + .2; if (card) { screen(); const a = 1 - seg(t, sp('ANN', 2).t1 - .1, sp('ANN', 2).t1 + .2); ctx.globalAlpha = a;
    ctx.save(); ctx.translate(W / 2, H * .3); ctx.rotate(-.04); txt('Ghost', -120, 0, 120, '#ffd23d', { stroke: '#231A24', font: 'Georgia, serif' }); txt('Roommates', 120, 110, 120, '#ff6a2b', { stroke: '#231A24', font: 'Georgia, serif' }); ctx.restore(); ctx.globalAlpha = 1; }
  if (t > sp('NARR').t0) banner('COMING THIS FALL · NEVER', '#ffd23d', 'rgba(60,20,10,.9)');
  vhs(t, .9); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
