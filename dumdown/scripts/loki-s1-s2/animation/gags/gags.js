// DumDown Loki S1+S2 cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, seg, rng, apply, plate, chars, screen, grade, glowS, worldPt, onTwos, camTf } = window.E;
const G = window.GAGDATA, OPEN = .9, DUR = G.dur;
// ---------- extra cast ----------
const tw = (b, o) => ({ ...b, ...o, top: { ...b.top, ...(o.top || {}) }, hair: { ...b.hair, ...(o.hair || {}) }, acc: o.acc !== undefined ? o.acc : b.acc });
const PR = window.PROPS;
const X = {
  don: tw(C.mobius, { top: { type: 'tee', color: '#ff7a3a', accent: '#2fc6ff', cuff: '#2fc6ff', sleeves: 'short' }, defaultExpr: 'excited' }),
};
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
    const sc = (1.9 - .9 * io(kin)) * (1 - .2 * out); ctx.save(); ctx.globalAlpha = io(kin) * (1 - out); ctx.translate(G.set === 'trailer' ? W * .3 : W / 2, H * .5); ctx.rotate(-.06); ctx.scale(sc, sc);
    if (G.set === 'trailer') { txt(s.txt, 0, 0, 120, '#f4ecd8', { glow: '#ff3030', blur: 40, font: 'Georgia, serif', w: 700 }); }
    else { ctx.font = '900 104px Inter'; const w = ctx.measureText(s.txt).width + 90; rr(-w / 2 + 14, -84, w, 168, 26, '#231A24'); rr(-w / 2, -96, w, 168, 26, '#ffd23d', '#231A24', 9); txt(s.txt, 0, -12, 104, '#231A24'); }
    ctx.restore(); } }
function bug(t) { if (!G.title || ['trailer', 'book'].includes(G.set)) return; screen(); const k = io(seg(t, OPEN, OPEN + .4)); ctx.save(); ctx.globalAlpha = k; ctx.translate(W - 70, BAR + 52); ctx.font = '900 30px Inter'; const w = ctx.measureText(G.title).width + 60;
  ctx.transform(1, 0, -.18, 1, 0, 0); rr(-w, -30, w, 60, 8, 'rgba(14,12,20,.86)'); ctx.fillStyle = '#e23a3a'; ctx.fillRect(-w, -30, 14, 60); txt(G.title, -w / 2 + 8, 1, 30, '#ffd23d'); ctx.restore(); }
// intro card + outro whip
const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const ox = oc.getContext('2d');
const INTRO = { trailer: 'COMING SOON...ISH', book: 'A WORD FROM OUR SPONSOR' };
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
S.dmv = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 780 }); plate('tva_office', cam, 6); grade('#7a5a2a', .2);
  apply(cam); rr(1000, 330, 560, 120, 14, '#1a0a0a', '#231A24'); const n = t > sp('CLERK', 3).t0 ? '8,000,000,000' : '4,812,006'; txt('NOW SERVING ' + (t > sp('CLERK', 3).t0 ? '#8B' : '#4.8M'), 1280, 392, 40, '#ff8a3a', { glow: '#ff8a3a', blur: 18 });
  const lo = { x: 900, y: 1450, s: 2.1, view: 'threequarter', dir: 1, expr: t > sp('CLERK', 3).t0 ? 'shock' : t > sp('CLERK').t1 ? 'angry' : 'smug', pose: t < sp('LOKI').t1 ? { ...POSE.stand, R: { sh: 60, el: 60, hand: 'point' } } : undefined };
  const co = { x: 1720, y: 1450, s: 2.05, view: 'threequarter', dir: -1, expr: 'blank', noBlink: false };
  await cast([[C.ex1, 'CLERK', co], [C.loki, 'LOKI', lo]], cam, t); apply(cam);
  desk(1380, 1160, 760, 300, '#8a6a3a', '#5a4020', '#c9a046'); rr(1460, 1100, 300, 70, 8, '#f4f1ea', '#231A24', 4); txt('FORM 1A-B', 1610, 1135, 28, '#231A24');
  const st = ev('stamp'); if (t > st) { const k = seg(t, st, st + .15); ctx.save(); ctx.translate(1610, 1135); ctx.rotate(-.15); ctx.scale(1.6 - .6 * k, 1.6 - .6 * k); ctx.globalAlpha = k; rr(-130, -40, 260, 80, 8, null, '#e23a3a', 8); txt('DENIED', 0, 2, 48, '#e23a3a'); ctx.restore(); }
  PR.missMinutes({ x: 2250, y: 520, s: .45, mood: 'happy' }, t); };
S.circle = async t => {
  const cam = camOf(t, { z: 1.0, x: 1280, y: 760, push: .06 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#d8c8a0', '#a89870']); ctx.fillRect(0, 0, 2560, 1440); ctx.fillStyle = '#8a6a4a'; ctx.fillRect(0, 1150, 2560, 290);
  for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(100 + i * 320, 140, 200, 860); } rr(780, 300, 1000, 150, 12, '#f4f1ea', '#231A24'); txt('VARIANT ANONYMOUS', 1280, 360, 64, '#2a6a3a'); txt('ONE TIMELINE AT A TIME', 1280, 420, 30, '#8a5a2a');
  emo('☕', 2300, 1010, 90); emo('🍩', 2420, 1030, 70); rr(2180, 1060, 340, 40, 6, '#6a4a2a', '#231A24');
  const flip = t > ev('pop'); const pl = [[C.lokiGreen, 'L2', 520], [C.classicLoki, 'L3', 860], [C.loki, 'LOKI', 1220], [C.boastful, 'X', 1580]];
  const list = pl.map(([sp, who, x], i) => [sp, who, { x, y: 1330, s: 1.7, view: 'threequarter', dir: x < 1280 ? 1 : -1, expr: who === 'LOKI' && t > sp_('LEAD', 2) ? 'nervous' : 'neutral', ph: i * .3 }]);
  list.push([flip ? C.lokiHorns : C.ex2, 'LEAD', { x: 1980, y: 1330, s: 1.7, view: 'threequarter', dir: -1, expr: flip ? 'smug' : 'smile' }]);
  await cast(list, cam, t); if (t > ev('pop') && t < ev('pop') + .4) { screen(); emo('💥', W * .77, H * .45, 260); } };
const sp_ = (w, k) => sp(w, k).t0;
S.phone = async t => {
  const L = { z: 1.3, x: 1000, y: 860, sx: -470 }, R = { z: 1.3, x: 1600, y: 860, sx: 470 };
  const so = { x: 900, y: 1390, s: 2.1, view: 'threequarter', dir: 1, pose: { ...POSE.stand, L: { sh: 68, el: 164, wr: 0, hand: 'grab' } }, hold: true, expr: t > sp('TECH', 1).t0 ? 'angry' : 'deadpan' };
  halfplate('', 0, 1); const cl = camOf(t, L); plate('lamentis', cl); grade('#ff5a3a', .15); await cast([[C.sylvie, 'SYL', so]], cl, t); apply(cl); { const h = hnd(C.sylvie, so, 'L'), f = head(C.sylvie, so, 0); phoneAt(h, f, so.s); }
  { const m = 'rgba(255,140,60,.8)'; for (let i = 0; i < 5; i++) { const k = ((t * .5 + i * .2) % 1); ctx.strokeStyle = m; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(300 + i * 300 + k * 200, 100 + k * 700); ctx.lineTo(340 + i * 300 + k * 200, 60 + k * 700); ctx.stroke(); } } ctx.restore();
  halfplate('', 0, 0); const cr = camOf(t, R); apply(cr);
  ctx.fillStyle = lg(0, 0, 0, 1440, ['#a8b8c8', '#7a8a9a']); ctx.fillRect(0, 0, 2560, 1440); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#5a6a7a'; ctx.fillRect(900 + i * 300, 700, 260, 300); ctx.fillStyle = '#c8d4e0'; ctx.fillRect(910 + i * 300, 640, 240, 70); } rr(1250, 330, 420, 260, 6, '#f4f1ea', '#231A24'); txt('TEMPAD SUPPORT', 1460, 420, 38, '#2a3990'); txt('Est. wait: ∞', 1460, 480, 32, '#e23a3a'); ctx.fillStyle = '#c8d0d8'; ctx.fillRect(0, 1180, 2560, 260);
  const onHold = t < sp('TECH').t0 - .1; const po = { x: 1640, y: 1500, s: 2.1, view: 'threequarter', dir: -1, expr: 'deadpan', seed: 5 };
  if (onHold) { rr(1150, 520, 900, 480, 30, '#1b2470', '#231A24', 10); txt('PLEASE HOLD', 1600, 610, 76, '#ffd23d'); const iv = lvl('IVR', t); for (let i = 0; i < 24; i++) { const a = iv > 0 ? (.3 + .7 * Math.abs(Math.sin(t * 20 + i * 1.7))) * iv / 2 : .05; ctx.fillStyle = '#2fc6ff'; ctx.fillRect(1230 + i * 31, 760 - a * 150, 18, 4 + a * 300); } emo('⏳', 1600, 1080, 150); }
  else { await cast([[C.ex3, 'TECH', po]], cr, t); apply(cr); const f = head(C.ex3, po, -10); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(f.x, f.y, f.sc * 9, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.arc(f.x - f.sc * 8.5, f.y + f.sc * 1, f.sc * 2.4, 0, 7); ctx.fill(); desk(1200, 1250, 900, 200, '#d8d8d0', '#a8a8a0'); }
  ctx.restore(); splitLine(); };
S.dating = async t => {
  const cam = camOf(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#5a1a4a', '#2a0a2a', '#ff5ab0', t);
  txt('MEET YOURSELF!', 1280, 260, 110, '#ffd0e8', { glow: '#ff5ab0', blur: 30 }); txt('♥', 1280, 520, 300, 'rgba(255,90,170,.25)', { glow: '#ff5ab0', blur: 40 });
  rr(160, 820, 120, 400, 10, '#ff5ab0', '#231A24'); rr(2280, 820, 120, 400, 10, '#ff5ab0', '#231A24'); rr(1650, 560, 30, 720, 6, '#f4f1ea', '#231A24');
  const ho = { x: 420, y: 1420, s: 1.9, view: 'threequarter', dir: 1, expr: 'excited', pose: { ...POSE.stand, R: { sh: 70, el: 150, hand: 'grab' } }, hold: lvl('HOST', t) < 0 };
  const c1 = t > sp('HOST').t0 + 2.4, c2 = t > sp('HOST', 1).t0 + 1.4;
  const list = [[C.ex3, 'HOST', ho], [C.loki, 'LOKI', { x: 1250, y: 1420, s: 1.9, view: 'threequarter', dir: 1, expr: t > sp('HOST', 2).t0 ? 'deadpan' : 'smug', pose: t > sp('LOKI').t0 && t < sp('LOKI').t1 + .4 ? POSE.think : undefined }]];
  if (c1) list.push([C.lokiGreen, 'X1', { x: 1900, y: 1380, s: 1.6, view: 'threequarter', dir: -1, expr: 'smug' }]); if (c2) list.push([C.loki, 'X2', { x: 2200, y: 1380, s: 1.6, view: 'threequarter', dir: -1, expr: 'smug', ph: .7 }]);
  await cast(list, cam, t); apply(cam); { const h = hnd(C.ex3, ho), f = head(C.ex3, ho, 0); micAt(h, f, ho.s); }
  if (c1) { rr(1800, 1180, 200, 70, 10, '#231A24'); txt('#1', 1900, 1215, 44, '#ffd23d'); } if (c2) { rr(2100, 1180, 200, 70, 10, '#231A24'); txt('#2', 2200, 1215, 44, '#ffd23d'); } };
S.bbq = async t => {
  const cam = camOf(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1000, ['#7ac0f0', '#cfe8f8']); ctx.fillRect(0, 0, 2560, 1000);
  for (let i = 0; i < 40; i++) { ctx.fillStyle = i % 2 ? '#c8a070' : '#b88e5e'; ctx.fillRect(i * 66, 640, 60, 380); ctx.beginPath(); ctx.moveTo(i * 66, 640); ctx.lineTo(i * 66 + 30, 600); ctx.lineTo(i * 66 + 60, 640); ctx.fill(); }
  ctx.fillStyle = lg(0, 1000, 0, 1440, ['#6ab04a', '#3a7a2a']); ctx.fillRect(0, 1000, 2560, 440); for (let i = 0; i < 30; i++) { const R = rng(i); ctx.fillStyle = 'rgba(30,80,20,.4)'; ctx.fillRect(R() * 2560, 1020 + R() * 400, 6, 24); }
  rr(140, 260, 900, 120, 10, '#f4f1ea', '#231A24'); txt('LOKI FAMILY REUNION 🎉', 590, 320, 54, '#2a6a3a'); for (let i = 0; i < 14; i++) { ctx.fillStyle = ['#e23a3a', '#ffd23d', '#2a8a4a', '#2a3990'][i % 4]; ctx.beginPath(); ctx.moveTo(1100 + i * 100, 220); ctx.lineTo(1150 + i * 100, 220); ctx.lineTo(1125 + i * 100, 280); ctx.fill(); }
  const h1 = ev('hit'), h2 = ev('hit', 1);
  const list = [[C.kidLoki, 'KID', { x: 520, y: 1400, s: 1.6, view: 'threequarter', dir: 1, expr: t > h2 ? 'shock' : 'happy' }], [C.boastful, 'BOAST', { x: 1050, y: 1400, s: 1.75, view: 'threequarter', dir: -1, expr: t > h1 ? 'shock' : 'excited' }],
    [C.classicLoki, 'CLASSIC', { x: 1620, y: 1400, s: 1.75, view: 'threequarter', dir: -1, expr: 'smug' }], [C.loki, 'LOKI', { x: 2080, y: 1400, s: 1.75, view: 'threequarter', dir: -1, expr: 'smile' }]];
  await cast(list, cam, t); apply(cam);
  rr(1180, 1180, 300, 60, 10, '#3a3a3a', '#231A24'); ctx.fillStyle = '#231A24'; ctx.fillRect(1200, 1240, 14, 200); ctx.fillRect(1446, 1240, 14, 200); emo('🌭', 1260, 1160, 70); emo('🍔', 1400, 1160, 70); for (let i = 0; i < 4; i++) { ctx.globalAlpha = .35; ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(1330 + Math.sin(t * 2 + i) * 30, 1100 - ((t * 80 + i * 60) % 260), 30, 0, 7); ctx.fill(); ctx.globalAlpha = 1; }
  emo('🥗', 820, 1250, 80); for (const [hh, x] of [[h1, 1050], [h2, 520]]) if (t > hh) { emo('🗡️', x + 40, 1100, 110, .8); if (t < hh + .3) { screen(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(0, 0, W, H); } } };
S.diner = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 800 }); plate('diner', cam, 4); apply(cam);
  const tr = ev('thud'); const wo = { x: 1900, y: 1440, s: 2.0, view: 'threequarter', dir: -1, expr: t > tr && t < tr + 1.5 ? 'shock' : t > sp('WAIT', 2).t0 ? 'angry' : 'deadpan', pose: t > tr && t < tr + 1.2 ? { ...POSE.stand, tilt: 25, R: { sh: 120, el: 30, hand: 'open' }, L: { sh: -120, el: -30, hand: 'open' } } : undefined, hold: t > tr && t < tr + 1.2 };
  const ho = { x: 900, y: 1440, s: 2.0, view: 'threequarter', dir: 1, expr: t > sp('HWR', 4).t0 ? 'shock' : 'smug' };
  await cast([[C.hwr, 'HWR', ho], [C.ex3, 'WAIT', wo]], cam, t); apply(cam);
  desk(560, 1200, 900, 260, '#e23a3a', '#a01a1a', '#f4f1ea'); emo('🍲', 900, 1150, 110); if (t > ev('scrape')) { ctx.fillStyle = 'rgba(200,120,40,.85)'; ctx.beginPath(); ctx.ellipse(1050, 1215, 120 * Math.min(1, (t - ev('scrape')) * 3), 18, 0, 0, 7); ctx.fill(); }
  if (t > tr && t < tr + 1.2) { emo('🍽️', 2050 + (t - tr) * 300, 1100 - Math.sin((t - tr) * 3) * 200, 90, t * 6); emo('💥', 2000, 1380, 120); }
  if (t > sp('WAIT', 1).t0) { rr(1580, 1060, 160, 210, 6, '#f4f1ea', '#231A24', 4); txt('BILL', 1660, 1100, 30, '#231A24'); txt('∞ ¢', 1660, 1180, 44, '#e23a3a'); } };
S.repair = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 790 }); plate('workshop', cam, 4); apply(cam);
  rr(860, 340, 840, 140, 10, '#ffd23d', '#231A24'); txt("O.B.'S REPAIRS", 1280, 395, 64, '#231A24'); txt('NO REFUNDS · NO TIMELINES', 1280, 455, 28, '#e23a3a');
  const mo = { x: 820, y: 1450, s: 2.05, view: 'threequarter', dir: 1, expr: t > sp('OB', 1).t0 ? 'deadpan' : 'smile' }, oo = { x: 1760, y: 1450, s: 2.0, view: 'threequarter', dir: -1, expr: 'excited' };
  await cast([[C.mobius, 'MOB', mo], [C.ob, 'OB', oo]], cam, t); apply(cam);
  desk(1340, 1180, 860, 280, '#5a6a7a', '#3a4a5a', '#c9a046'); ctx.save(); ctx.translate(1560, 1100); for (let i = 0; i < 9; i++) { ctx.strokeStyle = `hsla(${40 + i * 12},90%,60%,.9)`; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-80, i * 6 - 30); ctx.bezierCurveTo(-20, -60 + i * 10, 20, 40 - i * 8, 90, i * 5 - 20 + Math.sin(t * 4 + i) * 10); ctx.stroke(); } ctx.restore();
  rr(1900, 1090, 200, 90, 8, '#f4f1ea', '#231A24', 4); txt('MULTIVERSE', 2000, 1120, 22, '#231A24'); txt('(BROKEN)', 2000, 1152, 22, '#e23a3a'); };
S.trailer = async t => {
  const cam = camOf(t, { z: 1.1 + .08 * seg(t, OPEN, DUR), x: 1280, y: 760 }); plate('london', cam, 2); grade('#1a0a20', .5, 'multiply'); grade('#ff6a2a', .2);
  const b = ev('hit'); if (t > b - .2) { apply(cam); const k = seg(t, b - .2, b + .6); for (let i = 0; i < 3; i++) glowS(1280 + (i - 1) * 300, 800, 300 + 500 * k, 'rgba(255,140,40,A)', .5 * (1 - seg(t, b + 1, b + 3))); emo('💥', 1600, 1000, 140 + 60 * k); }
  const bo = { x: lerp(1550, 1750, seg(t, sp('BRAD').t0 - 2, DUR)), y: 1440, s: 2.1, view: 'front', expr: 'smug', pose: POSE.peace, hold: true };
  if (t > ev('whoosh') - .3) await cast([[C.brad, 'BRAD', bo]], cam, t);
  vhs(t, .5); screen(); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, H - BAR - 120, W, 120);
  const lines = G.speech.filter(s => s.who === 'ANN'); let cur = -1; lines.forEach((s, i) => { if (t > s.t0) cur = i; });
  const TX = ['IN A WORLD...', 'WHERE ONE MAN...', 'HAS REALLY GREAT HAIR', 'RATED: PLEASE STOP']; if (cur >= 0 && (cur === 3 || t < lines[cur].t1 + .3)) txt(TX[cur], W / 2, H - BAR - 60, 58, cur === 3 ? '#ff4a3a' : '#f4ecd8', { font: 'Georgia, serif', w: 700 }); };
S.profile = async t => {
  const cam = camOf(t, { z: 1, x: 1280, y: 720 }); apply(cam); ctx.fillStyle = lg(0, 0, 2560, 1440, ['#ff9ac0', '#ffc8a0']); ctx.fillRect(0, 0, 2560, 1440);
  for (let i = 0; i < 14; i++) emo('💗', (i * 211 + t * 40) % 2600, 1440 - ((t * 90 + i * 137) % 1600), 60);
  rr(880, 120, 800, 1220, 60, '#1a1a1a', '#231A24', 10); rr(910, 160, 740, 1140, 40, '#fff'); ctx.fillStyle = lg(0, 200, 0, 860, ['#ffd0a0', '#ff9a5a']); ctx.fillRect(930, 200, 700, 660);
  const mad = t > sp('MMD').t0; PR.missMinutes({ x: 1280, y: 600, s: 1.1, mood: mad ? 'mad' : 'happy' }, t);
  txt('Miss Minutes, 1,000,000+', 960, 920, 44, '#231A24', { align: 'left' }); txt('📍 The T.V.A. (all of it)', 960, 980, 32, '#555', { align: 'left', w: 600 });
  txt('⏰ long walks through time', 960, 1040, 30, '#555', { align: 'left', w: 600 }); txt('🔌 controlling every system', 960, 1090, 30, '#555', { align: 'left', w: 600 });
  const pr = t > sp('MM', 2).t0 ? seg(t, sp('MM', 2).t0, sp('MM', 2).t0 + .3) : 0; rr(1000, 1150, 180, 120, 60, '#f4f1ea', '#231A24', 4); txt('✖', 1090, 1210, 60, '#999');
  ctx.save(); ctx.translate(1470, 1210); ctx.scale(1 + .2 * Math.sin(pr * 3.14), 1 + .2 * Math.sin(pr * 3.14)); rr(-90, -60, 180, 120, 60, '#2fd07a', '#231A24', 4); txt('♥', 0, 0, 64, '#fff'); ctx.restore();
  if (mad) { grade('#ff2a00', .4 * seg(t, sp('MMD').t0, sp('MMD').t0 + .3)); } };
S.fans = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 790 }); plate('fair1893', cam, 5); apply(cam); crowd(1240, 10, 3, 'rgba(20,16,24,.6)', .8, t);
  const th = ev('thud'), th2 = ev('thud', 1); const down = (tt, x, sp_, who) => tt;
  const oo = { x: 980, y: 1450, s: 2.0, view: 'threequarter', dir: 1, expr: t > th ? 'blank' : t > sp('OB', 1).t0 ? 'nervous' : 'excited', pose: { ...POSE.stand, R: { sh: 70, el: 60, hand: 'grab' } }, hold: lvl('OB', t) < 0 };
  const to = { x: 1600, y: 1450, s: 2.0, view: 'threequarter', dir: -1, expr: t > th2 ? 'blank' : 'nervous', pose: { ...POSE.stand, R: { sh: 70, el: 60, hand: 'grab' } }, hold: lvl('TIM', t) < 0 };
  const sink = (tt) => Math.min(1, Math.max(0, (t - tt) * 3));
  oo.y += 600 * sink(th); to.y += 600 * sink(th2);
  await cast([[C.ob, 'OB', oo], [C.timely, 'TIM', to]], cam, t); apply(cam);
  if (t < th) { for (const [sp2, o] of [[C.ob, oo], [C.timely, to]]) { const h = hnd(sp2, o); rr(h.x - 50, h.y - 70, 100, 130, 4, '#f4ecd8', '#231A24', 3); ctx.strokeStyle = '#2a3990'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(h.x - 30, h.y); ctx.bezierCurveTo(h.x - 10, h.y - 30, h.x + 10, h.y + 20, h.x + 30, h.y - 10); ctx.stroke(); } }
  rr(1080, 1300, 420, 160, 6, '#8a5a2a', '#231A24'); for (const [tt, x] of [[th, 980], [th2, 1600]]) if (t > tt) { for (let i = 0; i < 4; i++) emo('💫', x + Math.cos(t * 4 + i * 1.6) * 120, 1260 + Math.sin(t * 4 + i * 1.6) * 30, 60); }
  screen(); rr(80, BAR + 30, 640, 90, 10, 'rgba(20,16,24,.85)'); txt('🔁 LOOP #' + (1 + Math.floor(t * 3)), 400, BAR + 75, 42, '#ffd23d'); };
S.ad = async t => {
  const cam = camOf(t, { z: 1.08, x: 1280, y: 720 }); plate('jetski', cam); grade('#ffd080', .15); apply(cam);
  const dn = { x: 1000, y: 1450, s: 2.1, view: 'front', expr: 'excited', pose: lvl('DON', t) < 0 ? POSE.thumbsUp : undefined };
  await cast([[X.don, 'DON', dn]], cam, t); apply(cam);
  ctx.save(); ctx.translate(1950, 700); ctx.rotate(.12); burst(0, 0, 260, t, '#ffd23d', '#ff6a2b', 16); txt('0%', 0, -30, 120, '#231A24'); txt('FINANCING', 0, 70, 46, '#231A24'); ctx.restore();
  if (t > sp('DON', 2).t0) { ctx.save(); ctx.translate(1900, 1000); ctx.rotate(-.08); rr(-320, -70, 640, 140, 16, '#2fc6ff', '#231A24', 8); txt('100% WET', 0, 0, 70, '#fff'); ctx.restore(); }
  screen(); rr(0, H - 260, W, 120, 0, 'rgba(10,10,40,.85)'); txt("DON'S JET SKIS · 555-0199 · KANSAS", W / 2, H - 200, 52, '#ffd23d'); vhs(t, 1.1); pillar(); };
S.study = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 790 }); plate('archive', cam, 5); grade('#2a2a5a', .2); apply(cam);
  rr(1900, 380, 340, 360, 10, '#f4f1ea', '#231A24'); rr(1900, 380, 340, 90, 10, '#e23a3a', '#231A24'); txt('EXAM DAY', 2070, 425, 40, '#fff'); txt('TOMORROW', 2070, 580, 54, '#231A24'); txt('(always)', 2070, 660, 32, '#888');
  const lo = { x: 960, y: 1450, s: 2.0, view: 'threequarter', dir: 1, expr: t > sp('LOKI', 2).t0 ? 'sad' : 'deadpan' }, oo = { x: 1720, y: 1450, s: 1.95, view: 'threequarter', dir: -1, expr: 'excited' };
  await cast([[C.loki, 'LOKI', lo], [C.ob, 'OB', oo]], cam, t); apply(cam);
  desk(560, 1200, 1500, 260, '#6a4a2a', '#4a2a10', '#8a5a2a'); ctx.save(); ctx.translate(1000, 1080); ctx.rotate(-.04); rr(-220, -110, 440, 200, 10, '#2a3990', '#231A24', 6); rr(-200, -100, 400, 30, 4, '#f4f1ea'); txt('TIME PHYSICS · VOL. 9,000', 0, -30, 28, '#ffd23d'); txt('(abridged)', 0, 20, 24, '#f4f1ea'); ctx.restore();
  for (let i = 0; i < 6; i++) { rr(1300 + i * 110, 1160 - (i % 2) * 20, 90, 40, 4, ['#e23a3a', '#2a8a4a', '#ffd23d'][i % 3], '#231A24', 3); } emo('☕', 1960, 1150, 70);
  screen(); rr(80, BAR + 30, 560, 90, 10, 'rgba(20,16,24,.85)'); txt('YEAR ' + (300 + Math.floor(t * 41)), 360, BAR + 75, 46, '#ffd23d'); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
