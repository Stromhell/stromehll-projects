// DumDown Thunderbolts* cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
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
const INTRO = { limo: 'A WORD FROM OUR SPONSOR', study: 'A WORD FROM OUR SPONSOR', toys: 'A WORD FROM OUR SPONSOR', stinger: 'BREAKING NEWS' };
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
  doc: tw(C.prof, { top: JK('#f4f4f0', '#c8d8e8', '#8a9aa8'), defaultExpr: 'happy' }),
  docS: tw(C.ex2, { top: { type: 'tee', color: '#c84a5a', accent: '#8a2a3a', cuff: '#8a2a3a', hem: 14, sleeves: 'long' }, defaultExpr: 'smile' }),
  wx: tw(C.hostW, { top: JK('#2a8ac8', '#f4f1ea', null), defaultExpr: 'smile' }),
  anchor: tw(C.host, { top: JK('#2a2a34', '#f4f1ea', '#a01a1a'), defaultExpr: 'deadpan' }),
  kid: tw(C.ex4, { defaultExpr: 'excited' }),
};
const NARRC = t => t > sp('NARR').t0;
const tv = (x, y, w, h) => { rr(x - 20, y - 20, w + 40, h + 40, 26, '#1a1a20', '#231A24', 8); };
S.therapy = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#2a3a6a', '#0e1428', '#7ab0ff', t);
  rr(1500, 300, 820, 300, 20, 'rgba(10,14,40,.9)', '#7ab0ff', 6); txt('1-800-SAD-SPY', 1910, 400, 92, '#7ab0ff', { glow: '#7ab0ff', blur: 30 }); txt('trained · armed · available', 1910, 520, 40, '#fff', { w: 700 });
  sofa(900, 1200, 520, '#7a4a8a');
  const duck = t > ev('whoosh') && t < ev('whoosh') + 1.6, ho = { x: 800, y: duck ? 1500 : 1440, s: 1.75, view: 'threequarter', dir: 1, expr: duck ? 'shock' : 'smile', pose: duck ? POSE.cower || POSE.stand : undefined, hold: duck };
  await cast([[XC.hostW, 'HOSTW', ho]], cam, t); apply(cam);
  const kk = seg(t, ev('whoosh'), ev('whoosh') + .35); if (kk > 0 && kk < 1) { ctx.save(); ctx.translate(2600 - kk * 1900, 760); ctx.rotate(-.1); rr(-90, -10, 180, 20, 6, '#c8ccd4', '#231A24', 4); rr(70, -18, 60, 36, 8, '#231A24'); ctx.restore(); }
  if (t > ev('clang')) { ctx.save(); ctx.translate(700, 760); ctx.rotate(-.5); rr(-90, -10, 180, 20, 6, '#c8ccd4', '#231A24', 4); rr(70, -18, 60, 36, 8, '#231A24'); ctx.restore(); }
  banner(t > sp('HOSTW', 3).t0 ? 'DUCKING IS INCLUDED' : 'TALKING TO YOUR TARGETS? CALL NOW', '#fff', 'rgba(20,30,90,.9)'); vhs(t, .7); };
S.limo = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 820 }); plate('desert_road', cam, 3); apply(cam);
  const crash = ev('crunch'), dx = t < ev('screech') ? 0 : Math.min(1, (t - ev('screech')) / .9) * 700;
  rr(2050, 950, 30, 250, 4, '#5a5a60', '#231A24', 4); if (t < crash) rr(1990, 880, 150, 90, 12, '#2a5ac8', '#231A24', 5); else { ctx.save(); ctx.translate(2200, 1150); ctx.rotate(1.2); rr(-75, -45, 150, 90, 12, '#2a5ac8', '#231A24', 5); ctx.restore(); }
  const ao = { x: 1150 + dx, y: 1250, s: 1.35, view: 'threequarter', dir: 1, expr: t > crash ? 'shock' : 'excited' }; await cast([[C.alexeiCab, 'ALEX', ao]], cam, t); apply(cam);
  PR.limo({ x: 1000 + dx, y: 1200, s: .95, bounce: 1 }, t);
  if (t > crash) PR.pow({ x: 2100, y: 1000, s: 1.4, t0: crash }, t);
  banner(t > sp('FAST').t0 ? 'ALEXEI IS NOT RESPONSIBLE FOR MAILBOXES' : 'CALL ALEXEI · SEAT BELTS OPTIONAL', '#ffd23d', 'rgba(120,10,20,.92)'); vhs(t, .8); };
S.app = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 720 }); plate('vault', cam, 10); grade('#2a1a3a', .5); apply(cam);
  rr(900, 230, 760, 1060, 60, '#14141c', '#231A24', 10); rr(925, 260, 710, 1000, 44, '#fff1f1'); txt('Assassinder', 1280, 305, 44, '#e23a3a', { font: 'Georgia, serif', w: 700 });
  const s1 = ev('swipe', 0), s2 = ev('swipe', 1), mt = ev('dingding');
  const card = async (spec, name, bio, sw) => { const k = seg(t, sw, sw + .45); ctx.save(); ctx.translate(1280 + k * 900, 760); ctx.rotate(k * .5); ctx.translate(-1280, -760);
    rr(960, 360, 640, 860, 30, '#fff', '#c8ccd4', 4); await cast([[spec, 'X', { x: 1280, y: 1060, s: 1.05, view: 'front', expr: 'deadpan' }]], cam, t); apply(cam); ctx.translate(1280 + k * 900, 760); ctx.rotate(k * .5); ctx.translate(-1280, -760);
    rr(960, 1060, 640, 160, 0, 'rgba(10,10,10,.8)'); txt(name, 1280, 1110, 40, '#fff'); txt(bio, 1280, 1170, 24, '#ddd', { w: 600 }); ctx.restore(); };
  if (t < s1 + .45) await card(C.ava, 'GHOST, 30s', 'walks through walls, not your door', s1);
  else if (t < mt) await card(C.walker, 'JOHN, ex-Captain', 'loves his shield more than you', s2);
  else { ctx.save(); ctx.beginPath(); ctx.roundRect(925, 260, 710, 1000, 44); ctx.clip(); burst(1280, 760, 700, t, '#ff6a6a', '#ffb0b0', 20); ctx.restore(); txt("IT'S A MATCH!", 1280, 440, 76, '#fff', { stroke: '#231A24' });
    const fight = t > ev('clang'); await cast([[C.ava, 'X', { x: 1110, y: 1180, s: 1.0, view: 'threequarter', dir: 1, expr: 'angry', pose: fight ? D.POSES.punch : undefined, hold: fight }], [C.walker, 'X', { x: 1450, y: 1180, s: 1.0, view: 'threequarter', dir: -1, expr: 'angry', pose: D.POSES.shield, hold: true }]], cam, t); apply(cam); }
  if (t > sp('APP', 3).t0) banner('NOW FIGHT TO THE END', '#fff', 'rgba(160,20,30,.92)'); };
S.study = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#e8f4ff', '#a8c8e8', '#2fb6ff', t);
  txt('FREE STUDY!', 1720, 330, 120, '#2a7ac8', { stroke: '#fff' }); ['🍪 FREE SNACKS', '🛌 FREE PYJAMAS', '💰 $$$'].forEach((l, i) => { if (t > sp('DOC').t0 + i * .7) txt(l, 1720, 470 + i * 90, 54, '#231A24', { w: 800 }); });
  rr(1500, 760, 440, 560, 200, 'rgba(200,230,255,.6)', '#5a7a9a', 8);
  const bo = { x: 1720, y: 1260, s: 1.15, view: 'front', expr: 'happy', pose: t > sp('BOB').t0 ? D.POSES.point : undefined, hold: t > sp('BOB').t0 }, dO = { x: 650, y: 1440, s: 1.8, view: 'threequarter', dir: 1, expr: 'excited' };
  await cast([[XD.doc, 'DOC', dO], [C.bob, 'BOB', bo]], cam, t); apply(cam);
  if (t > sp('FAST').t0 && t < sp('FAST').t1 + .3) { screen(); ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(0, H - BAR - 230, W, 100); txt('SIDE EFFECTS: SECRET VAULT · FLYING · BECOMING A GOD', W / 2, H - BAR - 180, 36, '#fff', { w: 700 }); }
  banner(t > sp('BOB').t0 ? 'BOB RATES IT 10/10' : 'CALL 1-800-TEST-ME', '#fff', 'rgba(20,90,160,.92)'); vhs(t, .6); };
S.weather = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a5aa8', '#0a2a5a']); ctx.fillRect(0, 0, 2560, 1440);
  rr(1100, 260, 1300, 820, 20, '#e8c890', '#231A24', 8); ctx.fillStyle = '#c8a060'; ctx.beginPath(); ctx.ellipse(1750, 760, 520, 300, 0, 0, 7); ctx.fill(); txt('DESERT', 1750, 760, 70, '#8a5a2a');
  txt('☀️', 1400, 420, 110, '#fff'); txt('☀️', 2150, 520, 110, '#fff'); txt('0%', 1400, 540, 50, '#fff', { stroke: '#231A24' });
  const k = seg(t, ev('sonic'), ev('sonic') + 1.2); if (k > 0) { ctx.save(); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(1750, 900); ctx.lineTo(1750 + k * 300, 900 - k * 640); ctx.stroke(); ctx.restore(); if (k < 1) txt('🛌', 1750 + k * 300, 900 - k * 640, 80, '#fff'); }
  if (t > sp('WX', 1).t0) { rr(1650, 960, 600, 90, 14, '#c3202c', '#231A24', 4); txt('100% PYJAMA MAN', 1950, 1005, 44, '#fff'); }
  const wo = { x: 650, y: 1440, s: 1.85, view: 'threequarter', dir: 1, expr: t > ev('crickets') ? 'nervous' : 'smile', pose: D.POSES.point, hold: true }; await cast([[XD.wx, 'WX', wo]], cam, t); apply(cam);
  lower('WEATHER WITH BOB', 'Desert: clear, with flying pyjamas', '#2fb6ff'); };
S.mailbag = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#3a4a6a', '#1a2440', 1180, '#5a3a24', '#2a1a10');
  rr(200, 220, 1300, 220, 20, 'rgba(255,255,255,.08)'); txt("CONGRESSMAN BUCKY'S", 850, 290, 64, '#ffd23d'); txt('MAILBAG', 850, 380, 90, '#fff', { stroke: '#231A24' });
  ctx.save(); ctx.translate(2100, 700); ctx.fillStyle = '#c3202c'; ctx.fillRect(0, 0, 120, 70); ctx.fillStyle = '#f4f1ea'; for (let i = 0; i < 4; i++) ctx.fillRect(0, 10 + i * 16, 120, 7); ctx.fillStyle = '#1e3a96'; ctx.fillRect(0, 0, 50, 36); ctx.restore();
  const hit = ev('punch'), bo = { x: 1280, y: 1340, s: 1.7, view: 'front', expr: t > sp('BUCKY', 3).t0 - 1.4 && t < sp('BUCKY', 3).t0 ? 'deadpan' : 'deadpan', pose: t > hit - .3 && t < hit + .5 ? D.POSES.punch : undefined, hold: t > hit - .3 && t < hit + .5 };
  await cast([[C.bucky, 'BUCKY', bo]], cam, t); apply(cam);
  desk(700, 1100, 1160, 340, '#6a4a2a', '#3a2614', '#8a6a4a'); if (t > hit) { ctx.save(); ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.moveTo(1240, 1100); ctx.lineTo(1280, 1180); ctx.lineTo(1250, 1260); ctx.lineTo(1300, 1330); ctx.lineWidth = 8; ctx.strokeStyle = '#231A24'; ctx.stroke(); ctx.restore(); }
  rr(900, 1060, 200, 130, 6, '#f4ecd8', '#231A24', 4); txt('✉', 1000, 1120, 70, '#231A24');
  banner(t > sp('BUCKY', 3).t0 ? 'NEXT LETTER.' : t > sp('BUCKY', 2).t0 ? '"WHY IS YOUR ARM METAL?"' : '"MY POTHOLE IS TOO BIG"', '#fff', 'rgba(20,30,80,.92)'); };
S.sunscreen = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#ff9a2a', '#a8400a', '#ffd23d', t);
  const melt = seg(t, ev('fwoosh'), ev('fwoosh') + 1.5); ctx.save(); ctx.translate(1280, 1080); ctx.scale(1 + melt * .4, 1 - melt * .7);
  rr(-120, -420, 240, 420, 40, '#ffd23d', '#231A24', 8); rr(-50, -500, 100, 90, 14, '#f4f1ea', '#231A24', 6); txt('SENTRY', 0, -300, 46, '#231A24'); txt('SCREEN', 0, -240, 40, '#c3202c'); txt('SPF', 0, -170, 36, '#231A24'); txt('1,000,000', 0, -120, 34, '#231A24'); ctx.restore();
  if (melt > 0) { ctx.fillStyle = '#ffd23d'; ctx.beginPath(); ctx.ellipse(1280, 1090, 180 + melt * 200, 30, 0, 0, 7); ctx.fill(); glowS(1280, 900, 420, 'rgba(255,240,180,A)', .25 * (1 - melt)); }
  const ho = { x: 560, y: 1440, s: 1.8, view: 'threequarter', dir: 1, expr: t > ev('gasp') ? 'shock' : 'excited' }, wo = { x: 2000, y: 1440, s: 1.75, view: 'threequarter', dir: -1, expr: t > ev('fwoosh') ? 'shock' : 'excited' };
  await cast([[XC.host, 'HOST', ho], [XC.hostW, 'HOSTW', wo]], cam, t); apply(cam);
  banner(t > ev('fwoosh') ? 'BOTTLE NOT RATED FOR GODS' : 'SPRAY BEFORE EVERY HUG', '#231A24', 'rgba(255,210,60,.95)'); vhs(t, .6); };
S.hugclinic = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#f0d8e0', '#c8a8b8', 1180, '#a87a5a', '#6a4a3a');
  txt("DR. HUG'S CLINIC", 1280, 300, 100, '#c84a8a', { stroke: '#fff' }); sofa(1700, 1220, 560, '#4a8a7a');
  ['1. SHOW UP', '2. HUG', "3. THAT'S IT"].forEach((l, i) => { if (t > sp('DOC', i + 1).t0) txt(l, 1700, 520 + i * 110, 70, '#231A24', { stroke: '#fff' }); });
  const dO = { x: 750, y: 1440, s: 1.8, view: 'threequarter', dir: 1, expr: 'smile', pose: t > sp('DOC', 2).t0 && t < sp('DOC', 3).t0 ? D.POSES.hug : undefined, hold: t > sp('DOC', 2).t0 && t < sp('DOC', 3).t0 };
  await cast([[XD.docS, 'DOC', dO]], cam, t); apply(cam);
  if (t > ev('aww')) { crowd(1500, 14, 7, '#2a1a24', 1.1, t); for (let i = 0; i < 6; i++) emo('😭', 300 + i * 380, 1240 - Math.abs(Math.sin(t * 4 + i)) * 30, 70); }
  banner('THE DR. HUG METHOD', '#fff', 'rgba(160,40,100,.9)'); };
S.toys = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#ffe86a', '#ff9a2a']); ctx.fillRect(0, 0, 2560, 1440); burst(1280, 600, 1500, t * .3, 'rgba(255,255,255,.18)', 'rgba(255,255,255,0)', 24);
  txt('NEW AVENGERS', 1280, 260, 120, '#c3202c', { stroke: '#fff' }); txt('ACTION FIGURES', 1280, 380, 60, '#231A24');
  const figs = [C.yelena, C.bucky, C.alexei, C.ava, C.walker, t > ev('boing') ? C.voidm : C.bob];
  figs.forEach((f, i) => rr(260 + i * 350, 560, 300, 640, 20, 'rgba(255,255,255,.55)', '#231A24', 5));
  await cast(figs.map((f, i) => [f, 'X', { x: 410 + i * 350, y: 1170, s: 1.05, view: 'front', expr: 'happy' }]), cam, t); apply(cam);
  figs.forEach((f, i) => rr(260 + i * 350, 1160, 300, 50, 8, '#c3202c', '#231A24', 4));
  await cast([[XD.kid, 'KID', { x: 2330, y: 1480, s: 2.1, view: 'threequarter', dir: -1, expr: 'excited' }]], cam, t); apply(cam);
  if (t > sp('FAST').t0) { screen(); ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(0, H - BAR - 230, W, 100); txt('BATTERIES AND THERAPY NOT INCLUDED', W / 2, H - BAR - 180, 40, '#fff', { w: 700 }); }
  banner('WITH REAL FEELINGS ACTION!', '#fff', 'rgba(195,32,44,.92)'); vhs(t, .5); };
S.stinger = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#1a2a5a', '#0a1430']); ctx.fillRect(0, 0, 2560, 1440);
  tv(1500, 300, 820, 520); ctx.fillStyle = '#000'; ctx.fillRect(1500, 300, 820, 520); const R = rng(9); ctx.fillStyle = '#fff'; for (let i = 0; i < 60; i++) ctx.fillRect(1500 + R() * 820, 300 + R() * 520, 3, 3);
  const sh = ev('braam'); ctx.save(); ctx.translate(1910, 560); ctx.scale(1 + seg(t, sh, sh + 2) * .5, 1 + seg(t, sh, sh + 2) * .5); ctx.fillStyle = '#8a9ab0'; ctx.beginPath(); ctx.ellipse(0, 0, 260, 70, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#ffd23d'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.arc(i * 90, 10, 12, 0, 7); ctx.fill(); } ctx.restore();
  desk(300, 1100, 1300, 340, '#2a3a6a', '#141c3a', '#4a6aa8');
  const ao = { x: 950, y: 1340, s: 1.7, view: 'front', expr: t > sh ? 'nervous' : 'deadpan' }; await cast([[XD.anchor, 'ANCHOR', ao]], cam, t); apply(cam); desk(300, 1100, 1300, 340, '#2a3a6a', '#141c3a', '#4a6aa8');
  rr(1350, 1010, 70, 90, 10, '#f4f1ea', '#231A24', 4);
  if (t > sh) { const k = seg(t, sh, sh + 2.5); ctx.fillStyle = `rgba(0,0,0,${.55 * k})`; ctx.fillRect(0, 0, 2560 * k, 1440); }
  lower('BREAKING NEWS', 'Fancy spaceship appears. Probably fine.', '#e23a3a'); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
