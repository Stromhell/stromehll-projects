// DumDown Deadpool & Wolverine cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
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
const camOf = (t, base) => ({ ...base, x: (base.x ?? 1280) + Math.sin(t * .4) * 70, z: base.z * (1 + .07 * bump(t)) * (1 + .06 * seg(t, 0, DUR)) + (base.push || 0) * seg(t, OPEN, DUR), sx: (base.sx || 0) + Math.sin(t * 47) * 14 * shk(t), sy: Math.cos(t * 39) * 10 * shk(t) });
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
const XD = {
  sleaze: tw(C.host, { top: JK('#c8a020', '#1a1a20', '#7a2a9a'), acc: { sunglasses: true }, defaultExpr: 'smug' }),
  op: tw(C.hostW, { top: JK('#3a7ab0', '#f4f1ea', null), defaultExpr: 'deadpan' }),
  bro: tw(C.ex3, { top: { type: 'tee', color: '#2fb66a', accent: '#1a7a4a', cuff: '#1a7a4a', hem: 14, sleeves: 'short' }, defaultExpr: 'excited' }),
  sci: tw(C.prof, { top: JK('#f4f4f0', '#c8d8e8', '#8a9aa8'), defaultExpr: 'deadpan' }),
  intern: tw(C.ex1, { top: JK('#f4f4f0', '#c8d8e8', '#8a9aa8'), defaultExpr: 'nervous' }),
  judge: tw(C.ex2, { top: JK('#141418', '#f4f1ea', '#141418'), defaultExpr: 'deadpan' }),
  nova2: tw(C.cassandra, { top: JK('#2a3a6a', '#f4f1ea', '#1a2a4a'), acc: { glasses: '#2a2a2a' }, defaultExpr: 'angry' }),
};
const NARRC = t => t > sp('NARR').t0;
S.crypto = async t => {
  const cam = camW(t, { z: 1.08, x: 1280, y: 780, push: .05 }); plate('graveyard_snow', cam, 3); grade('#ffd23d', .12); apply(cam);
  rr(1280, 380, 900, 300, 16, 'rgba(10,10,30,.88)', '#ffd23d', 6); txt('BONES', 1730, 470, 110, '#ffd23d', { stroke: '#231A24' }); txt('an appreciating asset', 1730, 590, 48, '#fff', { w: 700 });
  const up = Math.min(1, Math.max(0, t - sp('SLEAZE', 1).t0) / 2); ctx.strokeStyle = '#2fb66a'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(1380, 900); for (let i = 1; i <= 8; i++) ctx.lineTo(1380 + i * 90 * up, 900 - i * 30 * up - (i % 2) * 40 * up); ctx.stroke();
  const so = { x: 680, y: 1500, s: 2.2, view: 'threequarter', dir: 1, expr: 'smug' }, ko = { x: 1180, y: 1500, s: 2.0, view: 'front', expr: 'blank', pose: POSE.wave, hold: true };
  await cast([[XD.sleaze, 'SLEAZE', so], [C.skeleton, 'X', ko]], cam, t); apply(cam);
  if (t > sp('FAST').t0) { screen(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, H - BAR - 210, W, 80); txt('PAST HEROES ≠ FUTURE RETURNS · GRAVE ROBBING IS A FELONY', W / 2, H - BAR - 170, 30, '#fff', { w: 600 }); }
  banner(NARRC(t) ? 'THE SKELETON DID NOT CONSENT' : 'CALL 1-800-DIG-A-LEGEND', '#ffd23d', 'rgba(20,10,40,.9)'); vhs(t, .9); };
S.profile = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); apply(cam); ctx.fillStyle = '#e8ecf2'; ctx.fillRect(0, 0, 2560, 1440);
  rr(0, 0, 2560, 150, 0, '#0a66c2'); txt('MercedIn', 260, 76, 64, '#fff', { align: 'left' }); rr(700, 40, 900, 70, 35, '#fff'); txt('search: jobs that need a mouth', 760, 76, 32, '#8a8a92', { align: 'left', w: 600 });
  rr(300, 220, 1960, 1100, 24, '#fff', '#c8ccd4', 4); rr(300, 220, 1960, 260, 24, '#c3202c');
  const wo = { x: 620, y: 1060, s: 1.35, view: 'front', expr: t > ev('sad_trombone') ? 'sad' : 'smug' }; await cast([[C.wade, 'WADE', wo]], cam, t); apply(cam);
  txt('Wade W.', 1000, 560, 64, '#231A24', { align: 'left' }); txt('Merc · Ex-X-Force founder · Open to anything', 1000, 630, 34, '#5a5a62', { align: 'left', w: 600 });
  const pc = Math.min(0, 0); rr(1000, 690, 900, 30, 15, '#e0e0e8'); txt('Profile 0% complete', 1000, 760, 30, '#c3202c', { align: 'left', w: 700 });
  if (t > sp('WADE').t0) ['• Stabbing', '• Talking', '• More talking'].forEach((l, i) => { if (t > sp('WADE').t0 + .8 * i) txt(l, 1000, 840 + i * 60, 40, '#231A24', { align: 'left', w: 700 }); });
  if (t > sp('APP', 1).t0) { txt('Endorsements: 0', 1700, 840, 40, '#8a8a92', { w: 700 }); }
  if (t > sp('APP', 2).t0) { rr(1000, 1060, 1180, 120, 14, '#fff4f4', '#c3202c', 4); txt('🔔 Your X-Force team members are no longer with the company.', 1590, 1120, 30, '#c3202c', { w: 700 }); }
  if (t > sp('WADE', 1).t0) { ctx.save(); ctx.translate(620, 1080); ctx.rotate(-.1); rr(-210, -36, 420, 72, 36, '#2fb66a', '#231A24', 4); txt('#OPENTOWORK (ANY)', 0, 2, 32, '#fff'); ctx.restore(); } };
S.hotline = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#4a1a5a', '#14061e', '#ff3ab0', t);
  txt('RENT-A-COP', 1280, 330, 120, '#ff3ab0', { glow: '#ff3ab0', blur: 50 }); txt('STRIPPERS INC.', 1280, 450, 70, '#2fc6ff', { glow: '#2fc6ff', blur: 40 });
  const dz = Math.sin(t * 7) * 30, ho = { x: 560, y: 1440, s: 1.8, view: 'threequarter', dir: 1, expr: 'smile' };
  const so = [1460, 1900].map((x, i) => ({ x: x + dz * (i ? -1 : 1), y: 1440 - Math.abs(Math.sin(t * 7 + i)) * 40, s: 1.7, view: 'front', expr: 'smug', pose: i ? POSE.wave : POSE.hips, hold: true }));
  await cast([[XC.hostW, 'HOSTW', ho], [C.tvaSoldier, 'X', so[0]], [C.tvaSoldier, 'X', so[1]]], cam, t); apply(cam);
  if (t > sp('GUY').t0) { screen(); rr(W / 2 - 420, H * .55, 840, 150, 14, '#fff', '#231A24', 5); stars(W / 2 - 360, H * .55 + 50, 1, 54); txt('"Arrested my uncle. Great abs."', W / 2, H * .55 + 115, 36, '#231A24', { w: 700 }); }
  banner(NARRC(t) ? 'TIPS GO TO THE EVIDENCE LOCKER' : 'CALL 1-800-COP-SHOP', '#fff', 'rgba(120,20,90,.9)'); vhs(t, .8); };
S.anchorapp = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); plate('tva_office', cam, 10); grade('#2a1a3a', .45); apply(cam);
  const sw = ev('swipe'), mt = ev('dingding'), k = seg(t, sw, sw + .5);
  rr(900, 230, 760, 1060, 60, '#14141c', '#231A24', 10); rr(925, 260, 710, 1000, 44, '#f4eef4'); txt('anchr', 1280, 300, 44, '#c84a8a', { font: 'Georgia, serif', w: 700 });
  if (t < mt) { const ko = { x: 1280, y: 1030, s: 1.15, view: 'front', expr: 'blank' }; await cast([[C.skeleton, 'X', ko]], cam, t); apply(cam);
    rr(955, 990, 650, 130, 0, 'rgba(10,10,10,.78)'); txt('LOGAN, 197', 1280, 1030, 34, '#fff'); txt('📍 a grave in North Dakota', 1280, 1080, 26, '#ddd', { w: 600 });
    if (t > sp('APP', 2).t0) { rr(975, 360, 610, 110, 18, 'rgba(255,255,255,.94)', '#231A24', 3); txt('Bio: Dead. Still hot. 🦴', 1280, 415, 34, '#231A24', { w: 700 }); }
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; txt('♥', 1280, 700, 300, '#2aa04a'); ctx.restore(); }
  } else { ctx.save(); ctx.beginPath(); ctx.roundRect(925, 260, 710, 1000, 44); ctx.clip(); burst(1280, 760, 700, t, '#ff6ab0', '#ffb0d8', 20); ctx.restore(); txt("IT'S A MATCH!", 1280, 440, 76, '#fff', { stroke: '#231A24' });
    const wo = { x: 1120, y: 1180, s: 1.05, view: 'threequarter', dir: 1, expr: 'happy' }, ko = { x: 1440, y: 1180, s: 1.05, view: 'threequarter', dir: -1, expr: 'blank' }; await cast([[C.wade, 'WADE', wo], [C.skeleton, 'X', ko]], cam, t); apply(cam); }
  if (t > sp('APP').t0 && t < sp('APP').t1 + .5) { rr(960, 270, 640, 70, 20, '#c84a8a'); txt('🔔 Universe collapsing nearby!', 1280, 305, 30, '#fff'); } };
S.store = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); apply(cam); ctx.fillStyle = '#fff8e8'; ctx.fillRect(0, 0, 2560, 1440); rr(0, 0, 2560, 150, 0, '#f2c21e'); txt('CLAWS R US', 260, 76, 64, '#1e3a96', { align: 'left' }); txt('🛒', 2380, 76, 70, '#231A24');
  const items = [[C.logShort, 'SHORT', '$9.99'], [C.logan, 'TALL', '$19.99'], [C.logHot, 'HOT', '$99.99'], [C.loganDrunk, 'DIVORCED', 'FREE']];
  const list = items.map(([c], i) => [c, 'X', { x: 420 + i * 580, y: 1060, s: 1.05, view: 'front', expr: c.defaultExpr }]);
  items.forEach(([c, l, p], i) => { rr(220 + i * 580, 220, 400, 1000, 20, '#fff', '#c8ccd4', 4); }); await cast(list, cam, t); apply(cam);
  items.forEach(([c, l, p], i) => { const x = 420 + i * 580; if (t > sp('ANN').t0 + i * .5) { txt(l, x, 1110, 46, '#231A24'); txt(p, x, 1170, 40, '#c3202c', { w: 700 }); } });
  if (t > ev('buzzer')) items.forEach((x, i) => { ctx.save(); ctx.translate(420 + i * 580, 700); ctx.rotate(-.3); rr(-200, -40, 400, 80, 8, '#c3202c', '#231A24', 4); txt('SOLD OUT', 0, 2, 44, '#fff'); ctx.restore(); });
  if (NARRC(t)) banner('RETURNS POLICY: A SHOVEL', '#fff', 'rgba(30,58,150,.92)'); };
S.reviews = async t => {
  const cam = camW(t, { z: 1.08, x: 1280 + t * 8, y: 780 }); plate('void_desert', cam, 4); grade('#ffd890', .16); apply(cam);
  rr(1240, 350, 880, 120, 16, '#34e0a1', '#231A24', 6); txt('THE VOID · TRAVEL REVIEWS', 1680, 412, 50, '#231A24');
  [['GUY', 1, 'Got eaten by a cloud.'], ['HOSTW', 2, 'Great sunsets. Terrible bald lady.'], ['GRIM', 5, "I'm an old studio logo. Finally at peace."]].forEach(([w, n, l], i) => { if (t > sp(w).t0) { const y = 510 + i * 215; rr(1240, y, 1100, 200, 14, '#fff', '#231A24', 5); stars(1290, y + 55, n, 50); txt('"' + l + '"', 1290, y + 135, 38, '#231A24', { align: 'left', w: 700 }); } });
  const wo = { x: 620, y: 1500, s: 2.1, view: 'threequarter', dir: 1, expr: 'deadpan' }; await cast([[C.loganFace, 'X', wo]], cam, t); apply(cam);
  if (NARRC(t)) banner('NO WIFI · NO EXIT · 2.6 STARS'); vhs(t, .6); };
S.callcenter = async t => {
  const cam = camW(t, { z: 1.06, x: 1280, y: 780 }); plate('office', cam, 3); grade('#c8d8ff', .15); apply(cam);
  desk(300, 1160, 1300, 240, '#5a6470', '#3a4450', '#c8d8e8');
  const oo = { x: 900, y: 1440, s: 2.0, view: 'front', expr: 'deadpan' }; await cast([[XD.op, 'OP', oo]], cam, t); apply(cam);
  rr(1620, 360, 760, 640, 16, '#14141c', '#231A24', 8); txt('PRESS', 2000, 430, 54, '#ffd23d');
  [['1', 'killed in < 5 min'], ['2', 'back from 2005 for this'], ['3', 'just here for the budget']].forEach(([n, l], i) => { const lit = (i === 0 && t > ev('dtmf')) || (i === 1 && t > ev('dtmf', 1)); rr(1680, 500 + i * 150, 110, 110, 20, lit ? '#2fb66a' : '#3a3a44', '#231A24', 4); txt(n, 1735, 556 + i * 150, 60, '#fff'); txt(l, 1820, 556 + i * 150, 32, '#fff', { align: 'left', w: 700 }); });
  if (NARRC(t)) banner('CURRENT WAIT TIME: ONE REBOOT', '#fff', 'rgba(30,60,100,.9)'); else banner('CAMEO COMPLAINTS LINE · 1-800-RIP-CAMEO', '#fff', 'rgba(30,60,100,.9)'); vhs(t, .5); };
S.crashtest = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#e8e8e0', '#c8c8c0', 1100, '#8a8a90', '#5a5a60'); for (let x = 0; x < 2560; x += 160) { ctx.fillStyle = (x / 160) % 2 ? '#ffd23d' : '#231A24'; ctx.fillRect(x, 1080, 160, 30); }
  txt('CRASH TEST LAB', 1280, 260, 80, '#231A24'); const sh = Math.sin(t * 30) * 8 * (t > ev('gunshot') ? 1 : 0);
  ctx.save(); ctx.translate(sh, 0); PR.cab({ x: 1280, y: 1300, s: 1.5, dir: 1 }, t); ctx.restore();
  const wo = { x: 1080 + sh, y: 1180, s: 1.0, view: 'threequarter', dir: 1, expr: 'angry', pose: POSE.point, hold: true }, lo = { x: 1480 + sh, y: 1180, s: 1.0, view: 'threequarter', dir: -1, expr: 'angry' };
  await cast([[C.wade, 'X', wo], [C.logan, 'X', lo]], cam, t); apply(cam);
  if (t > sp('ANN').t0) { ctx.save(); ctx.translate(2100, 500); ctx.rotate(.08); rr(-260, -60, 520, 120, 14, '#fff', '#231A24', 5); stars(-220, 0, 5, 60); ctx.restore(); }
  if (t > sp('FAST').t0) { screen(); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, H - BAR - 210, W, 80); txt('DO NOT STAB YOUR PASSENGER · PASSENGER MAY STAB BACK', W / 2, H - BAR - 170, 30, '#fff', { w: 600 }); }
  banner(NARRC(t) ? 'LANE ASSIST: OK · MARRIAGE: NOT' : 'THE FAMILY MINIVAN · 5★ SAFETY'); };
S.support = async t => {
  const cam = camW(t, { z: 1.04, x: 1280, y: 780 }); plate('rebel_camp', cam, 4); grade('#ffb070', .12); apply(cam);
  rr(980, 380, 600, 140, 10, '#f4ecd8', '#231A24', 5); txt('WE STILL MATTER', 1280, 452, 52, '#231A24');
  const seat = [[XC.hostW, 'HOSTW', 520], [C.johnny, 'GUY', 940], [C.gambit, 'GAMBIT', 1360], [C.blade, 'X', 1780], [C.elektra, 'X', 2160]];
  seat.forEach(([, , x]) => chair(x, 1400, 1.4, '#5a6a7a'));
  const nod = NARRC(t) || (t > sp('HOSTW', 1).t0) ? Math.sin(t * 9) * 4 : 0;
  await cast(seat.map(([c, w, x], i) => [c, w, { x, y: 1420, s: 1.55, view: 'front', expr: i === 2 ? 'smug' : (t > sp('GAMBIT').t1 ? 'deadpan' : c.defaultExpr), tilt: nod }]), cam, t); apply(cam);
  if (t > sp('GAMBIT').t0 && t < sp('GAMBIT').t1) for (let i = 0; i < 3; i++) emo('❓', 900 + i * 500, 640 + Math.sin(t * 5 + i) * 20, 90);
  if (NARRC(t)) banner('EVERYONE NODDED. NOBODY UNDERSTOOD.', '#fff', 'rgba(60,30,10,.9)'); };
S.court = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#6a4a2a', '#3a2414', 1180); txt('SIBLING RIVALRY COURT', 1280, 360, 64, '#ffd23d', { stroke: '#231A24', font: 'Georgia, serif' });
  const jo = { x: 1280, y: 1110, s: 1.2, view: 'front', expr: t > ev('gavel3') ? 'angry' : 'deadpan' }, no = { x: 520, y: 1460, s: 1.85, view: 'threequarter', dir: 1, expr: 'angry', pose: POSE.point, hold: t > sp('NOVA').t0 }, co = { x: 2040, y: 1460, s: 1.85, view: 'threequarter', dir: -1, expr: t > sp('NOVA', 1).t0 ? 'shock' : 'smug' };
  await cast([[XD.judge, 'JUDGE', jo], [XD.nova2, 'NOVA', no], [C.cassandra, 'CASS', co]], cam, t); apply(cam); desk(980, 900, 600, 300, '#7a4a24', '#4a2a14', '#c8a060');
  rr(380, 440, 400, 70, 8, '#f4ecd8', '#231A24', 4); txt('THE GOOD TWIN', 580, 477, 32, '#231A24'); rr(1780, 440, 400, 70, 8, '#f4ecd8', '#231A24', 4); txt('THE WOMB STRANGLER', 1980, 477, 28, '#c3202c');
  if (NARRC(t)) banner('VERDICT: BOTH NEED THERAPY', '#fff', 'rgba(60,30,10,.9)'); };
S.recruit = async t => {
  const cam = camW(t, { z: 1.04, x: 1280, y: 780 }); plate('subway', cam, 3); grade('#ff3a3a', .18); apply(cam);
  burst(1280, 640, 1400, t * .3, 'rgba(195,32,44,.35)', 'rgba(255,210,61,.2)', 24);
  txt('THE MERC CORPS', 1280, 330, 110, '#fff', { stroke: '#231A24' }); txt('WANTS YOU', 1280, 450, 80, '#ffd23d', { stroke: '#231A24' });
  const row = [[C.ladypool, 560], [C.cowboypool, 960], [C.wade, 1600], [C.nicepool, 2000]].map(([c, x]) => [c, 'X', { x, y: 1440, s: 1.7, view: 'front', expr: c.defaultExpr, pose: POSE.salute || POSE.wave, hold: true }]);
  const ko = { x: 1280, y: 1440, s: 1.7, view: 'front', expr: 'angry' }; await cast([...row, [C.kidpool, 'KID', ko]], cam, t); apply(cam);
  if (NARRC(t)) banner('DENTAL NOT INCLUDED · NEITHER ARE FACES', '#fff', 'rgba(140,20,30,.92)'); vhs(t, .7); };
S.drink = async t => {
  const cam = camW(t, { z: 1.04, x: 1280, y: 780 }); apply(cam); studio('#1a7a4a', '#06301a', '#9aff6a', t);
  rr(1960, 420, 300, 640, 60, '#2fb66a', '#231A24', 8); rr(1990, 560, 240, 300, 20, '#ffd23d', '#231A24', 5); txt('BFF', 2110, 660, 80, '#231A24'); txt('ENERGY', 2110, 760, 40, '#231A24');
  const wo = { x: 700, y: 1440, s: 1.8, view: 'threequarter', dir: 1, expr: 'happy' }, lo = { x: 1060, y: 1440, s: 1.8, view: 'threequarter', dir: -1, expr: 'deadpan' };
  const sc = t > sp('SCI').t0, so = { x: 1480, y: 1440, s: 1.7, view: 'threequarter', dir: 1, expr: t > sp('SCI', 1).t0 ? 'happy' : 'deadpan' }, io2 = { x: 1760, y: 1440, s: 1.65, view: 'threequarter', dir: -1, expr: 'nervous' };
  await cast(sc ? [[C.wade, 'X', wo], [C.logan, 'X', lo], [XD.sci, 'SCI', so], [XD.intern, 'X', io2]] : [[XD.bro, 'BRO', { x: 640, y: 1440, s: 1.85, view: 'threequarter', dir: 1, expr: 'excited' }], [C.wade, 'X', { ...wo, x: 1060 }], [C.logan, 'X', { ...lo, x: 1420 }]], cam, t); apply(cam);
  if (t > ev('zap')) for (let i = 0; i < 5; i++) emo('⚡', 400 + i * 380, 500 + Math.sin(t * 6 + i) * 30, 90);
  banner(NARRC(t) ? 'SIDE EFFECTS INCLUDE A SEQUEL' : 'BFF ENERGY · HOLD HANDS · LIVE FOREVER', '#fff', 'rgba(10,60,30,.92)'); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
