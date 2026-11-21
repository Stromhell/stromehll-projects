// DumDown Secret Invasion cutaway gags (parody inserts, original designs). One gag per page: window.GAGDATA = timeline from gagaudio_si.py.
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
    const sm = G.set === 'realestate' ? .55 : 1; const sc = sm * (1.9 - .9 * io(kin)) * (1 - .2 * out); ctx.save(); ctx.globalAlpha = io(kin) * (1 - out); ctx.translate(G.set === 'oscar' ? W * .3 : (G.set === 'realestate' ? W * .25 : W / 2), H * .5); ctx.rotate(-.06); ctx.scale(sc, sc);
    if (G.set === 'oscar') { txt(s.txt, 0, 0, 120, '#f4ecd8', { glow: '#ff3030', blur: 40, font: 'Georgia, serif', w: 700 }); }
    else { ctx.font = '900 104px Inter'; const w = ctx.measureText(s.txt).width + 90; rr(-w / 2 + 14, -84, w, 168, 26, '#231A24'); rr(-w / 2, -96, w, 168, 26, '#ffd23d', '#231A24', 9); txt(s.txt, 0, -12, 104, '#231A24'); }
    ctx.restore(); } }
function bug(t) { if (!G.title || ['oscar'].includes(G.set)) return; screen(); const k = io(seg(t, OPEN, OPEN + .4)); ctx.save(); ctx.globalAlpha = k; ctx.translate(W - 70, BAR + 52); ctx.font = '900 30px Inter'; const w = ctx.measureText(G.title).width + 60;
  ctx.transform(1, 0, -.18, 1, 0, 0); rr(-w, -30, w, 60, 8, 'rgba(14,12,20,.86)'); ctx.fillStyle = '#e23a3a'; ctx.fillRect(-w, -30, 14, 60); txt(G.title, -w / 2 + 8, 1, 30, '#ffd23d'); ctx.restore(); }
// intro card + outro whip
const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const ox = oc.getContext('2d');
const INTRO = { shellbgone: 'A WORD FROM OUR SPONSOR', realestate: 'A WORD FROM OUR SPONSOR', voicemail: 'MEANWHILE, ON SPACE STATION VOICEMAIL', skrullshow: 'TONIGHT ON CHANNEL 9', cooking: 'COOKING WITH GRAVIK', spychess: 'SPY CHESS', hotline: 'IS MY ___ A SKRULL? HOTLINE', sports: 'SUPER SKRULL SPORTS', catchup: 'RHODEY CATCHES UP', popcorn: 'MEANWHILE' };
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
const fine = (s, t) => { screen(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = '600 22px Inter'; ctx.textAlign = 'left'; ctx.fillText(s, G.set === 'realestate' ? W * .52 : 270, H - BAR - 12); };
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
// ---------- Secret Invasion gag sets ----------
const GRN = sp_ => ({ ...sp_, skin: '#5f9a5a', acc: { ...(sp_.acc || {}), skrull: true } });
const XS = {
  grandpa: tw(C.prof, { hair: { style: 'buzz', color: '#e8e8e8', seed: 9, volume: .5 }, top: { type: 'jacket', color: '#a86a4a', shirt: '#f4f1ea', accent: '#7a4a2a', cuff: '#7a4a2a' }, defaultExpr: 'smile' }),
  op: tw(C.hostW, { top: JK('#3a8ac8', '#f4f1ea', null), defaultExpr: 'smile' }),
  com2: tw(C.ex1, { top: JK('#c8202a', '#f4f1ea', '#1a1a1a'), defaultExpr: 'excited' }),
};
const topTag = (s, col = '#ffd23d', bg = 'rgba(10,10,40,.88)') => { screen(); ctx.font = '900 44px Inter'; const w = ctx.measureText(s).width + 60; rr(60, BAR + 24, w, 76, 12, bg, '#231A24', 4); txt(s, 60 + w / 2, BAR + 62, 44, col); };
const swapAt = (a, b, t0) => t => (t >= t0 ? b : a);
const holo = (x, y, w, h, t) => { rr(x, y, w, h, 24, 'rgba(40,140,255,.18)', '#7ad0ff', 6); ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#7ad0ff'; for (let yy = y + ((t * 60) % 12); yy < y + h; yy += 12) ctx.fillRect(x, yy, w, 3); ctx.restore(); };
const hatOn = (spec, o, col = '#f4f1ea', kind = 'chef') => { const f = head(spec, o, -34); ctx.save(); ctx.translate(f.x, f.y); const s = f.sc; if (kind === 'chef') { rr(-22 * s, -10 * s, 44 * s, 14 * s, 4 * s, col, '#231A24', 2.4 * s); ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.4 * s; for (const dx of [-14, 0, 14]) { ctx.beginPath(); ctx.arc(dx * s, -16 * s, 12 * s, 0, 7); ctx.fill(); ctx.stroke(); } } else { ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 2.4 * s; ctx.beginPath(); ctx.arc(0, 0, 24 * s, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); rr(-30 * s, -3 * s, 60 * s, 6 * s, 3 * s, col, '#231A24', 2.4 * s); } ctx.restore(); return f; };
const headset = (spec, o) => { const f = head(spec, o, 10); ctx.save(); ctx.translate(f.x, f.y); const s = f.sc; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(0, -10 * s, 24 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); rr(-28 * s, -10 * s, 8 * s, 16 * s, 3 * s, '#2a2a30', '#231A24', 2 * s); ctx.beginPath(); ctx.moveTo(-24 * s, 4 * s); ctx.quadraticCurveTo(-20 * s, 22 * s, -4 * s, 22 * s); ctx.stroke(); ctx.restore(); };
const pieceFace = (x, y, s, L, col = '#fff') => { ctx.fillStyle = col; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; for (const dx of [-26, 26]) { ctx.beginPath(); ctx.ellipse(x + dx * s, y, 14 * s, 18 * s, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#231A24'; ctx.beginPath(); ctx.arc(x + dx * s, y + 4 * s, 6 * s, 0, 7); ctx.fill(); ctx.fillStyle = col; } const m = L <= 0 ? 4 : L === 1 ? 12 : 22; ctx.fillStyle = '#5a1a1a'; ctx.beginPath(); ctx.ellipse(x, y + 46 * s, 20 * s, m * s, 0, 0, 7); ctx.fill(); ctx.stroke(); };
S.voicemail = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .08 }); plate('si_ship', cam, 6); apply(cam);
  const fall = seg(t, ev('thud') - .45, ev('thud')); rr(260, 900, 1000, 40, 8, '#6a5a4a', '#231A24', 6);
  ctx.save(); ctx.translate(760 + fall * 120, 900 + Math.pow(fall, 2) * 420); ctx.rotate(fall * 1.6); PR.oldPhone({ x: 0, y: 0, s: 2.2 }, t); ctx.restore();
  if (fall < .05) { rr(560, 520, 400, 150, 20, '#1a2a1a', '#231A24', 6); txt(Math.floor(t * 2) % 2 ? '999+' : '999+ ✉', 760, 595, 90, '#7aff7a', { glow: '#2fff6a', blur: 20 }); }
  const who = ['CAROL', 'TALOS', 'KID'].find(w => G.speech.some(s => s.who === w && t >= s.t0 - .2 && t < s.t1 + .5));
  if (who) { holo(1250, 330, 950, 950, t); const spc = who === 'CAROL' ? C.carolCasual : who === 'TALOS' ? C.talos : C.skrullKid2; await cast([[spc, who, { x: 1725, y: who === 'KID' ? 1560 : 1900, s: who === 'KID' ? 3.2 : 3.0, view: 'front', expr: who === 'TALOS' ? 'deadpan' : 'smile' }]], cam, t); apply(cam);
    txt(who === 'CAROL' ? 'MESSAGE 1 OF 999' : who === 'TALOS' ? (t > sp('TALOS', 1).t0 - .2 ? 'MESSAGE 3 OF 999' : 'MESSAGE 2 OF 999') : 'MESSAGE 999 OF 999', 1725, 400, 46, '#bfe8ff'); }
  else if (t < sp('ROBO').t1 + .3) { emo('🤖', 1850, 700, 300); }
  vhs(t, .25); };
S.shellbgone = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#5a1a7a', '#2a0a3a', '#ff3ab0', t);
  const green = t > ev('ding') - .1; const ho = { x: 1000, y: 1600, s: 2.99, view: 'threequarter', dir: 1, expr: green ? 'happy' : 'excited' };
  await cast([[green ? C.postmanSk : C.postman, 'HOST', ho]], cam, t); apply(cam);
  const h = hnd(C.postman, ho, 'R'); ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(-.2); rr(-40, -190, 80, 190, 18, '#3ad0ff', '#231A24', 6); rr(-22, -230, 44, 44, 8, '#f4f1ea', '#231A24', 5); txt('SHELL', 0, -130, 24, '#231A24'); txt('B-GONE', 0, -100, 22, '#231A24'); ctx.restore();
  const sk = seg(t, ev('whoosh'), ev('whoosh') + .8); if (sk > 0 && sk < 1) for (let i = 0; i < 18; i++) { ctx.fillStyle = `rgba(180,240,255,${.7 * (1 - sk)})`; ctx.beginPath(); ctx.arc(h.x - 40 - sk * 300 * ((i % 5) / 5 + .4), h.y - 300 - (i % 7) * 30 * sk, 10 + i % 4 * 4, 0, 7); ctx.fill(); }
  rr(1650, 380, 720, 460, 30, '#ffd23d', '#231A24', 8); txt('SHELL-B-GONE', 2010, 500, 84, '#c8202a'); txt('ONE SPRAY.', 2010, 610, 60, '#231A24'); txt('NO MORE FACE.', 2010, 690, 60, '#231A24'); txt('£19.99', 2010, 780, 56, '#231A24');
  if (t > sp('FAST').t0) fine('*Side effects: being found out, being chased, your mum asking why you are green.', t);
  topTag('CALL NOW: 1-800-NOT-HUMAN', '#ffd23d', 'rgba(60,10,80,.92)'); vhs(t, .5); };
S.skrullshow = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); studio('#1a3a8a', '#0a1a4a', '#ffd23d', t);
  const op = seg(t, ev('whoosh'), ev('whoosh') + .7), two = t > sp('HOST', 1).t0 - .2;
  rr(900, 300, 760, 800, 20, '#2a1a3a', '#231A24', 6);
  if (!two) { const gg = t > ev('buzzer') + .1; await cast([[gg ? GRN(XS.grandpa) : XS.grandpa, 'X', { x: 1280, y: 1180, s: 1.5, view: 'front', expr: 'smile', pose: gg ? POSE.wave : POSE.stand, hold: true }]], cam, t); apply(cam); emo('🧶', 1380, 1000, 90); }
  else { const w = t > ev('dingding'); ctx.save(); ctx.translate(1280, 1000); ctx.rotate(w ? Math.sin(t * 8) * .12 : 0); emo('🪴', 0, 0, 380); ctx.restore(); if (w) { pieceFace(1280, 860, .9, 0); emo('👋', 1420, 800 + Math.sin(t * 12) * 20, 110); } }
  if (op < 1 && !two) { const k = io(op); ctx.fillStyle = '#a01a2a'; ctx.fillRect(900, 300, 380 * (1 - k), 800); ctx.fillRect(1280 + 380 * k, 300, 380 * (1 - k), 800); }
  if (two && t < sp('CONT', 1).t0 - .3) { const k = io(seg(t, sp('HOST', 1).t0, sp('HOST', 1).t0 + .7)); ctx.fillStyle = '#a01a2a'; ctx.fillRect(900, 300, 380 * (1 - k), 800); ctx.fillRect(1280 + 380 * k, 300, 380 * (1 - k), 800); }
  const ho = { x: 450, y: 1580, s: 2.73, view: 'threequarter', dir: 1, expr: 'excited' }, co = { x: 2150, y: 1580, s: 2.6, view: 'threequarter', dir: -1, expr: t > ev('dingding') ? 'excited' : 'nervous' };
  await cast([[C.host, 'HOST', ho], [C.ex1, 'CONT', co]], cam, t); apply(cam); micAt(hnd(C.host, ho, 'R'), head(C.host, ho, 40), ho.s);
  rr(1900, 1110, 500, 330, 16, '#e23a8a', '#231A24', 6); txt('CONTESTANT', 2150, 1170, 40, '#fff');
  screen(); rr(W / 2 - 420, BAR + 20, 840, 100, 20, '#ffd23d', '#231A24', 6); txt('SKRULL OR NOT SKRULL?', W / 2, BAR + 70, 62, '#231A24'); };
S.cooking = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#f4e8d0', '#e0d0b0', 1100, '#c8b090', '#8a7050');
  for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) rr(i * 220, 150 + j * 120, 210, 110, 4, (i + j) % 2 ? '#f4f1ea' : '#cfe8e0', null);
  const out = t > ev('dingding'); const go = { x: 900, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'smug' };
  await cast([[C.gravik, 'GRAV', go]], cam, t); apply(cam); hatOn(C.gravik, go); const hh = hnd(C.gravik, go, 'R');
  ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(go.x - 120, go.y - 600); ctx.lineTo(go.x + 120, go.y - 600); ctx.lineTo(go.x + 150, go.y - 240); ctx.lineTo(go.x - 150, go.y - 240); ctx.closePath(); ctx.fill(); ctx.stroke(); txt('KISS THE CHEF', go.x, go.y - 450, 30, '#c8202a');
  desk(300, 1180, 1300, 300, '#8a6a4a', '#5a4030'); ctx.fillStyle = '#c8ccd4'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(1200, 1180, 170, 50, 0, 0, Math.PI); ctx.fill(); ctx.stroke();
  if (t > ev('boing') - .1) PR.vineArm({ x: 1200, y: 1150, s: .35, kk: .5, rot: -60 }, t); if (t > ev('ding') - .1 && t < ev('ding') + 1) glowS(1200, 1120, 160, 'rgba(255,230,120,A)', .9); if (t > ev('explode')) { const k = seg(t, ev('explode'), ev('explode') + .6); if (k < 1) PR.fireBall({ x: 1200, y: 1080, s: .6 + k }, t); }
  rr(1700, 560, 640, 620, 20, '#3a3a44', '#231A24', 8); const dk = io(seg(t, ev('dingding') + .2, ev('dingding') + .8)); rr(1760, 640, 520, 440, 14, out ? '#1a1a20' : '#ffb04a', '#231A24', 6);
  if (out) { const so = { x: 2020, y: 1600, s: 1.9 * (.6 + .4 * dk), view: 'front', expr: 'smug' }; await cast([[C.gravikSuper, 'X', so]], cam, t); apply(cam); hatOn(C.gravikSuper, so); flames(head(C.gravikSuper, so, -50).x, head(C.gravikSuper, so, -50).y, 80, t, .5); PR.vineArm({ x: so.x + 60, y: so.y - 500, s: .7, kk: 1 }, t); }
  ctx.save(); ctx.translate(1700, 560 + 620); ctx.rotate(-1.4 * dk); rr(0, -620, 30, 620, 8, '#5a5a64', '#231A24', 6); ctx.restore();
  topTag('TODAY: ONE SUPER SKRULL', '#fff', 'rgba(140,30,30,.9)'); };
S.spychess = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .1 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a1a10', '#140a06']); ctx.fillRect(0, 0, 2560, 1440);
  ctx.save(); ctx.translate(1280, 900); ctx.transform(1, 0, 0, .42, 0, 0); for (let i = -4; i < 4; i++) for (let j = -4; j < 4; j++) { ctx.fillStyle = (i + j) % 2 ? '#e8d8b8' : '#5a3a24'; ctx.fillRect(i * 280, j * 280, 280, 280); } ctx.restore();
  const piece = (ch, x, y, col, who, extra) => { const L = lvl(who, t), b = L > 0 ? Math.sin(t * 20) * 8 : 0; ctx.save(); ctx.translate(x, y + b); txt(ch, 0, 0, 520, col, { glow: 'rgba(0,0,0,.6)', blur: 20 }); pieceFace(0, -60, 1.1, L); if (extra) extra(); ctx.restore(); };
  const kx = 760 + io(seg(t, ev('tick'), ev('tick') + .5)) * 140; piece('♞', kx, 880, '#1a1a1a', 'FURY', () => { ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(-26 * 1.1, -60, 22, 26, 0, 0, 7); ctx.fill(); });
  piece('♛', 1800, 860, '#f4f1ea', 'SONYA', () => { PR.teacup({ x: 120, y: 100, s: .9 }); });
  const pg = t > sp('PAWN').t0 - .2; piece('♟', 1290, 980, pg ? '#5fb05a' : '#f4f1ea', 'PAWN');
  const bk = seg(t, ev('explode'), ev('explode') + .8); if (bk > 0 && bk < 1) { glowS(2300, 500, 400, 'rgba(255,140,40,A)', 1 - bk); emo('🏠', 2300, 520, 160); emo('💥', 2300, 470, 260 * (.6 + bk)); }
  topTag(pg ? 'A WILD SKRULL APPEARS' : 'BRITISH RULES APPLY', '#ffd23d', 'rgba(20,10,5,.9)'); };
S.realestate = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .06 }); plate('si_plant_ext', cam); apply(cam); glowS(1700, 800, 700, 'rgba(90,255,140,A)', .25 + .1 * Math.sin(t * 3));
  const ao = { x: 820, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'excited' }; await cast([[C.agent, 'AGENT', ao]], cam, t); apply(cam); hatOn(C.agent, ao, '#ffd23d', 'hard');
  rr(1450, 380, 760, 330, 16, '#f4f1ea', '#231A24', 8); txt('FOR SALE', 1830, 470, 90, '#c8202a'); txt('GLOWS AT NIGHT!', 1830, 580, 60, '#231A24'); txt('★★★★★ (radioactive)', 1830, 660, 40, '#5a5a5a');
  if (t > ev('ding') - .1) { rr(1600, 820, 260, 480, 20, '#e8ecf0', '#231A24', 6); glowS(1730, 1060, 220, 'rgba(90,255,140,A)', .6 + .3 * Math.sin(t * 9)); txt('hmmmm', 1730, 1060 + Math.sin(t * 30) * 3, 40, '#2a8a3a'); }
  if (t > ev('boing') - .1) emo('💪', 2200, 950, 160, Math.sin(t * 4) * .2);
  if (t > sp('AGENT', 2).t0) fine('*Not suitable for humans, plants, or humans.', t);
  topTag('NEW SKRULLOS REAL ESTATE', '#7aff9a', 'rgba(10,40,20,.9)'); };
S.hotline = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); wall('#dfe8f0', '#c0ccd8', 1150, '#7a8a9a', '#4a5a6a');
  for (let i = 0; i < 6; i++) { rr(80 + i * 420, 250, 380, 300, 10, '#c8d4e0', '#231A24', 4); txt('☎', 270 + i * 420, 400, 90, '#8a9aa8'); }
  const oo = { x: 760, y: 1600, s: 2.86, view: 'threequarter', dir: 1, expr: 'smile' }; await cast([[XS.op, 'OP', oo]], cam, t); apply(cam); headset(XS.op, oo); desk(200, 1200, 1200, 300, '#e8e8ea', '#b8bcc8');
  const who = ['CALL1', 'CALL2', 'RHODES'].find(w => G.speech.some(s => s.who === w && t >= s.t0 - .3 && t < s.t1 + .6 + (w !== 'RHODES' ? 1.6 : 2.4)));
  if (who) { rr(1300, 330, 900, 880, 30, '#1a1a24', '#231A24', 8); const spc = who === 'CALL1' ? C.ex4 : who === 'CALL2' ? C.dogLady : C.rhodes; await cast([[spc, who, { x: 1750, y: who === 'CALL1' ? 1480 : 1600, s: who === 'CALL1' ? 2.6 : 1.9, view: 'front', expr: who === 'RHODES' ? 'smug' : 'nervous' }]], cam, t); apply(cam); if (who === 'CALL2') emo('🐈', 2020, 1000, 160); txt(who === 'RHODES' ? 'CALLER: "COLONEL"' : 'CALLER ' + (who === 'CALL1' ? 1 : 2), 1750, 400, 44, '#fff'); }
  topTag('IS MY ___ A SKRULL? HOTLINE · 0800 GREEN', '#fff', 'rgba(20,60,120,.92)'); };
S.sports = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = '#1a2230'; ctx.fillRect(0, 0, 2560, 1440);
  rr(200, 120, 2160, 820, 20, '#2a3a5a', '#231A24', 10); ctx.save(); ctx.beginPath(); ctx.rect(210, 130, 2140, 800); ctx.clip(); plate('si_plant_int', { z: 1, x: 1280, y: 720 }, 2); apply(cam);
  const slow = t > ev('whoosh'), tt = slow ? ev('whoosh') + (t - ev('whoosh')) * .3 : t; const gx = 1000 + Math.sin(tt * 3) * 60;
  await cast([[C.giahSuper, 'X', { x: gx, y: 920, s: 1.1, view: 'threequarter', dir: 1, expr: 'angry', pose: POSE.fistPump, hold: true }], [C.gravikSuper, 'X', { x: 1500, y: 920, s: 1.15, view: 'threequarter', dir: -1, expr: slow ? 'shock' : 'angry', pose: POSE.point, hold: true }]], cam, t); apply(cam);
  PR.iceBurst({ x: 1250, y: 650, s: .8, kk: .5 + .5 * Math.abs(Math.sin(tt * 2)) }, tt); PR.vineArm({ x: 1450, y: 620, s: .5, kk: .8, dir: -1 }, tt);
  if (slow) { txt('REPLAY', 400, 220, 70, '#ffd23d'); txt('◀◀ SLOW-MO', 2150, 220, 50, '#fff'); } ctx.restore(); apply(cam);
  desk(0, 1150, 2560, 300, '#c8202a', '#8a1a20', '#ffd23d'); const j = { x: 760, y: 1640, s: 2.47, view: 'threequarter', dir: 1, expr: 'excited' }, b = { x: 1800, y: 1640, s: 2.41, view: 'threequarter', dir: -1, expr: 'excited' };
  await cast([[C.host, 'JIM', j], [XS.com2, 'BOB', b]], cam, t); apply(cam); headset(C.host, j); headset(XS.com2, b); desk(0, 1300, 2560, 200, '#c8202a', '#8a1a20', '#ffd23d');
  screen(); rr(80, H - BAR - 170, 760, 86, 10, '#ffd23d', '#231A24', 5); txt('GIAH 1 — 0 GRAVIK', 460, H - BAR - 127, 50, '#231A24'); };
S.catchup = async t => {
  const cam = camW(t, { z: 1.0, x: 1280, y: 760, push: .06 }); plate('si_hospital', cam, 3); apply(cam);
  rr(250, 1050, 1150, 160, 20, '#f4f1ea', '#231A24', 6); rr(250, 980, 260, 110, 30, '#e8ecf4', '#231A24', 5); rr(280, 1210, 30, 200, 6, '#8a9aa8', '#231A24', 4); rr(1340, 1210, 30, 200, 6, '#8a9aa8', '#231A24', 4);
  const did2 = t > sp('RHODEY', 1).t0 - .1, last = t > sp('RHODEY', 2).t0 - .1; const ro = { x: 820, y: 1580, s: 2.6, view: 'threequarter', dir: 1, expr: last ? 'smug' : did2 ? 'shock' : 'nervous' };
  emo('📰', 1250, 1000, 130, .2); emo('📰', 1190, 960, 120, -.15);
  const no = { x: 1900, y: 1600, s: 2.73, view: 'threequarter', dir: -1, expr: 'deadpan' }; await cast([[C.rhodesReal, 'RHODEY', ro], [C.nurse, 'NURSE', no]], cam, t); apply(cam); clip(hnd(C.nurse, no, 'R'), no.s);
  if (t > sp('NURSE', 2).t0) emo('🧥', 2350, 700, 200, Math.sin(t * 3) * .2);
  topTag(last ? 'FINALLY, SOMETHING HE DID' : 'WHILE YOU WERE ASLEEP...', '#fff', 'rgba(20,80,90,.9)'); };
S.popcorn = async t => {
  const cam = camW(t, { z: 1.25, x: 1280, y: 820 }); plate('si_sofa', cam, 2); apply(cam);
  const sc = sp('MASC').t0, th = ev('thud'), fly = seg(t, sc + .1, th); const mo = { x: 1050, y: 1520, s: 2.7, view: 'front', expr: t > sc - .1 && t < th + .6 ? 'shock' : t > ev('boing') ? 'nervous' : 'happy', pose: t > sc && t < sc + .5 ? POSE.wave : POSE.stand, hold: t > sc && t < sc + .5 };
  await cast([[C.mascot, 'MASC', mo]], cam, t); apply(cam);
  const bx = lerp(1500, 1500, fly), by = 1220 - Math.sin(fly * Math.PI) * 700; ctx.save(); ctx.translate(bx, by); ctx.rotate(fly * 6.28 * 1.5); PR.popcorn({ x: 0, y: 0, s: 1.1, green: ev('boing') }, t); ctx.restore();
  if (t > ev('boing')) emo('👋', bx + 70, by - 220 + Math.sin(t * 10) * 10, 90, Math.sin(t * 9) * .4); };
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
