// DumDown VisionQuest S1 cutaway gags (Comedy-Central-style parody inserts). One gag per page: window.GAGDATA = timeline from gagaudio.py.
(function () {
const { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, seg, rng, apply, plate, chars, screen, grade, glowS, worldPt, onTwos, camTf } = window.E;
const G = window.GAGDATA, OPEN = .9, DUR = G.dur;
// ---------- extra cast ----------
const tw = (b, o) => ({ ...b, ...o, top: { ...b.top, ...(o.top || {}) }, hair: { ...b.hair, ...(o.hair || {}) }, acc: o.acc !== undefined ? o.acc : b.acc });
const X = {
  gary: tw(C.u, { skin: '#e8c4a8', hair: { style: 'messy', color: '#6a4a2a', seed: 9 }, acc: { glasses: '#333' }, top: { type: 'tee', color: '#3a6ab0', accent: '#2a4a80', cuff: '#2a4a80', sleeves: 'short' }, bottom: { color: '#3a3a44' }, defaultExpr: 'deadpan' }),
  col: tw(C.paladin, { skin: '#f0c8a8', hair: { style: 'bob', color: '#1a1a1a', seed: 4, volume: .7 }, acc: { moustache: '#1a1a1a' }, top: { color: '#2a2a3a', shirt: '#e8e0f0', tie: '#c0392b', accent: '#3a3a4a' }, defaultExpr: 'smug' }),
  thr: tw(C.fiona, { skin: '#d8a888', hair: { style: 'bob', color: '#5a5a5a', seed: 31 }, acc: { glasses: '#8a2a2a' }, top: { type: 'jacket', color: '#8a6a9a', shirt: '#f4f1ea', accent: '#6a4a7a', cuff: '#6a4a7a' }, defaultExpr: 'neutral' }),
  real: tw(C.paladin, { skin: '#f2c8a6', hair: { style: 'spiky', color: '#d8b04a', seed: 19, volume: .9 }, acc: {}, top: { color: '#e8d23a', shirt: '#fff', tie: '#e23a3a', accent: '#c8a82a', cuff: '#c8a82a' }, bottom: { color: '#e8d23a' }, defaultExpr: 'excited' }),
  rec: tw(C.fiona, { skin: '#f4dcc8', hair: { style: 'long', color: '#f0e0a0', seed: 2 }, top: { color: '#f4f1ea', shirt: '#fff', accent: '#e0d8c0', cuff: '#e0d8c0' }, defaultExpr: 'deadpan' }),
  judge: tw(C.fiona, { skin: '#c89070', hair: { style: 'bob', color: '#e8e8e8', seed: 7 }, acc: { glasses: '#222' }, top: { color: '#14141a', shirt: '#fff', accent: '#14141a', cuff: '#14141a' }, defaultExpr: 'deadpan' }),
  clk: tw(C.lisa, { skin: '#f6d2b8', hair: { style: 'long', color: '#e86a3a', seed: 15 }, top: { type: 'tee', color: '#ff8ab0', accent: '#e86a90', cuff: '#e86a90' }, defaultExpr: 'excited' }),
  tech: tw(C.u, { skin: '#c89870', hair: { style: 'messy', color: '#1a1a1a', seed: 51 }, acc: { glasses: '#222', stubble: '#3a3030' }, top: { type: 'hoodie', color: '#3a3a44', accent: '#2a2a30', cuff: '#2a2a30', hood: '#2a2a30', strings: '#888' }, defaultExpr: 'deadpan' }),
  host: tw(C.paladin, { skin: '#f2c8a6', hair: { style: 'spiky', color: '#2a1a10', seed: 23 }, acc: {}, top: { color: '#ff6a2b', shirt: '#fff', tie: '#2a3990', accent: '#d8501a', cuff: '#d8501a' }, bottom: { color: '#2a3990' }, defaultExpr: 'excited' }),
  cust: tw(C.fiona, { skin: '#e8b898', hair: { style: 'bob', color: '#c8902a', seed: 61 }, top: { color: '#3aa0a0', shirt: '#fff', accent: '#2a8080', cuff: '#2a8080' }, defaultExpr: 'happy' }),
  pln: tw(C.fiona, { skin: '#f4d0b8', hair: { style: 'bob', color: '#f0a0c0', seed: 71 }, acc: { glasses: '#e060a0' }, top: { color: '#ffc0d8', shirt: '#fff', accent: '#e890b0', cuff: '#e890b0' }, defaultExpr: 'excited' }),
  host2: tw(C.paladin, { skin: '#d8a078', hair: { style: 'messy', color: '#1a1010', seed: 81 }, acc: { stubble: '#3a2020' }, top: { color: '#c02a8a', shirt: '#1a1a1a', accent: '#901a6a', cuff: '#901a6a' }, bottom: { color: '#1a1a1a' }, defaultExpr: 'excited' }),
  fox: tw(C.tommy, { skin: '#f0c8a0', hair: { style: 'spiky', color: '#e0702a', seed: 91 }, acc: { moustache: '#c0501a' }, top: { color: '#e0702a', shirt: '#fff', accent: '#c0501a', cuff: '#fff' }, bottom: { color: '#e0702a' }, defaultExpr: 'smug' }),
  bomb: tw(C.dume, { skin: '#e0b090', hair: { style: 'buzz', color: '#3a3a30', seed: 5 }, acc: {}, top: { type: 'hoodie', color: '#4a5a3a', accent: '#3a4a2a', cuff: '#3a4a2a', hood: '#3a4a2a', strings: '#2a2a2a' }, bottom: { color: '#4a5a3a', baggy: true }, defaultExpr: 'nervous' }),
  raza: tw(C.paladin, { skin: '#c8946a', hair: { style: 'buzz', color: '#1a1410' }, acc: { stubble: '#1a1410' }, top: { color: '#5a5a3a', shirt: '#8a7a5a', accent: '#4a4a2a', cuff: '#3a3a20' }, bottom: { color: '#4a4030' }, defaultExpr: 'smug' }),
  horton: tw(C.vision, { skin: '#f0d0b0', eyes: '#5a4a3a', acc: { moustache: '#3a2f2f' }, top: { color: '#6a5a4a', tie: '#3a2a2a' }, defaultExpr: 'happy' }),
  mech: tw(C.dume, { skin: '#d8a888', hair: { style: 'messy', color: '#3a2a1a', seed: 13 }, acc: { stubble: '#3a2a1a' }, top: { color: '#3a5a8a', accent: '#2a4a7a', cuff: '#2a4a7a' }, bottom: { color: '#3a5a8a', baggy: true }, defaultExpr: 'deadpan' }),
  lead: tw(C.fiona, { skin: '#a87050', hair: { style: 'cloud', color: '#2a1a14', seed: 3 }, top: { color: '#5a8a5a', shirt: '#f4f1ea', accent: '#4a7a4a', cuff: '#4a7a4a' }, defaultExpr: 'smile' }),
  ship: tw(C.dume, { skin: '#e8c0a0', hair: { style: 'messy', color: '#8a5a2a', seed: 44 }, acc: { beard: '#8a5a2a' }, top: { type: 'tee', color: '#2a4a8a', accent: '#f4f1ea', cuff: '#f4f1ea', sleeves: 'short' }, defaultExpr: 'deadpan' }),
  wood: tw(C.u, { skin: '#d8a060', eyes: '#3a2a1a', hair: { style: 'buzz', color: '#5a3a1a', seed: 2 }, top: { type: 'tee', color: '#c02a2a', accent: '#a01a1a', cuff: '#a01a1a' }, bottom: { color: '#e8c040' }, defaultExpr: 'nervous' }),
  virgil: tw(C.paladin, { name: 'Virgil', skin: '#e8c0a0', hair: { style: 'messy', color: '#8a8a8a' }, acc: { beard: '#8a8a8a', glasses: '#c9a46a' }, top: { color: '#5a4a3a', shirt: '#c8c0b0', accent: '#4a3a2a', cuff: '#4a3a2a' }, bottom: { color: '#3a3a40' } }),
  billy: tw(C.tommy, { hair: { color: '#1a1a2a', seed: 41 }, top: { color: '#8a1a2a', accent: '#5a0e1a', cuff: '#5a0e1a' } }),
  khost: tw(C.u, { skin: '#f0c8a8', hair: { style: 'spiky', color: '#2fc6ff', seed: 6 }, acc: { sunglasses: true }, top: { type: 'tee', color: '#1a1a1a', accent: '#ffd23d', cuff: '#ffd23d' }, defaultExpr: 'excited' }),
  wx: tw(C.paladin, { skin: '#f0c8a8', hair: { style: 'spiky', color: '#c89a4a', seed: 29 }, acc: {}, top: { color: '#2a6ab0', shirt: '#fff', tie: '#ffd23d', accent: '#1a4a90', cuff: '#1a4a90' }, defaultExpr: 'excited' }),
  anch: tw(C.paladin, { skin: '#d8a888', hair: { style: 'buzz', color: '#5a5a5a', seed: 8 }, acc: { moustache: '#5a5a5a' }, top: { color: '#2a2a34', shirt: '#fff', tie: '#8a1a2a' }, defaultExpr: 'deadpan' }),
  prof: tw(C.paladin, { skin: '#e8c0a0', hair: { style: 'messy', color: '#e8e8e8', seed: 17 }, acc: { beard: '#e8e8e8', glasses: '#8a6a3a' }, top: { color: '#7a5a3a', shirt: '#e8e0c8', tie: '#3a5a3a', accent: '#5a3a2a', cuff: '#5a3a2a' }, bottom: { color: '#5a4a3a' }, defaultExpr: 'smug' }),
  con: tw(C.tommy, { skin: '#e8c4a8', hair: { style: 'messy', color: '#6a5a3a', seed: 99, volume: 1.2 }, acc: { stubble: '#6a5a3a' }, top: { type: 'hoodie', color: '#6a7a4a', accent: '#5a6a3a', cuff: '#5a6a3a', hood: '#5a6a3a', strings: '#ccc' }, defaultExpr: 'shock' }),
  velvet: tw(C.vision, { top: { color: '#6a1a2a', accent: '#c9a46a', shirt: '#f4f1ea', tie: '#1d1d24' } }),
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
function person(spec, who, t, o) {
  const tt = onTwos(t + (o.ph || 0)), L = lvl(who, t); let pose, expr;
  if (o.walk) { pose = D.ANIMS.walk(onTwos(Math.abs(o.dist) / (240 * (o.s || 1) * (spec.scale || 1)))).pose; expr = o.expr || spec.defaultExpr; }
  else if (L >= 0) {
    const a = D.ANIMS.talk(tt, o.seed || 3); pose = o.hold ? JSON.parse(JSON.stringify(o.pose)) : a.pose; pose.tilt = (pose.tilt || 0) + Math.sin(t * 2.3 + (o.ph || 0)) * 2.5;
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
    const sc = (1.9 - .9 * io(kin)) * (1 - .2 * out); ctx.save(); ctx.globalAlpha = io(kin) * (1 - out); ctx.translate(W / 2, H * .5); ctx.rotate(-.06); ctx.scale(sc, sc);
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
// ---------- scenes ----------
const camOf = (t, base) => ({ ...base, z: base.z * (1 + .07 * bump(t)) + (base.push || 0) * seg(t, OPEN, DUR), sx: (base.sx || 0) + Math.sin(t * 47) * 14 * shk(t), sy: Math.cos(t * 39) * 10 * shk(t) });
async function cast(list, cam, t) { await chars(list.map(([sp, who, o]) => person(sp, who, t, o)), cam); }
const S = {};
S.phone = async (t, two) => {
  const L = { z: 1.3, x: 1000, y: 860, sx: -470 }, R = { z: 1.3, x: 1600, y: 860, sx: 470 };
  const vo = { x: 900, y: 1390, s: 2.1, view: 'threequarter', dir: 1, pose: POSE.think, hold: true, expr: 'deadpan' };
  halfplate('', 0, 1); const cl = camOf(t, L); plate(two ? 'loft' : 'westview_corner', cl); await cast([[C.vision, 'VIS', vo]], cl, t); apply(cl); { const h = hnd(C.vision, vo); emo('📱', h.x + 6, h.y - 40, 90, -.3); } ctx.restore();
  halfplate('', 0, 0); const cr = camOf(t, R); apply(cr);
  if (two) { plate('noir_office', cr); grade('#2a1a3a', .2); } else { ctx.fillStyle = lg(0, 0, 0, 1440, ['#a8b8c8', '#7a8a9a']); ctx.fillRect(0, 0, 2560, 1440); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#5a6a7a'; ctx.fillRect(900 + i * 300, 700, 260, 300); ctx.fillStyle = '#c8d4e0'; ctx.fillRect(910 + i * 300, 640, 240, 70); } rr(1250, 330, 420, 260, 6, '#f4f1ea', '#231A24'); txt('YOU CAN DO IT', 1460, 420, 40, '#2a3990'); txt('(PROBABLY)', 1460, 480, 32, '#e23a3a'); ctx.fillStyle = '#c8d0d8'; ctx.fillRect(0, 1180, 2560, 260); }
  const who = two ? 'COL' : 'GARY', spec = two ? X.col : X.gary, onHold = !two && t < sp('GARY').t0 - .1;
  const po = { x: 1640, y: 1500, s: 2.1, view: 'threequarter', dir: -1, expr: 'deadpan', seed: 5 };
  if (onHold) { rr(1150, 520, 900, 480, 30, '#1b2470', '#231A24', 10); txt('PLEASE HOLD', 1600, 610, 76, '#ffd23d'); const iv = lvl('IVR', t); for (let i = 0; i < 24; i++) { const a = iv > 0 ? (.3 + .7 * Math.abs(Math.sin(t * 20 + i * 1.7))) * iv / 2 : .05; ctx.fillStyle = '#2fc6ff'; ctx.fillRect(1230 + i * 31, 760 - a * 150, 18, 4 + a * 300); } emo('🤖', 1600, 1080, 150); }
  else { await cast([[spec, who, po]], cr, t); apply(cr); const f = head(spec, po, -2); ctx.strokeStyle = '#222'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(f.x, f.y + f.sc * 2, f.sc * 9.5, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); desk(1100, 1200, 1100, 300, '#d8d0c0', '#a8a090'); rr(1700, 960, 360, 240, 10, '#2a2a34', '#231A24'); ctx.fillStyle = '#2fc6ff'; ctx.globalAlpha = .5; ctx.fillRect(1715, 975, 330, 205); ctx.globalAlpha = 1; }
  ctx.restore(); splitLine(); };
S.phone2 = t => S.phone(t, true);
S.nature = async t => {
  const cam = camOf(t, { z: 1.45, x: 1280 + Math.sin(t * .7) * 40, y: 880 + Math.sin(t * 1.3) * 12, push: .1 }); plate('mind_living', cam); grade('#3a5a2a', .15);
  const run = seg(t, ev('run_steps'), ev('run_steps') + 1.6), ex = 1000 - run * 900;
  const eo = run > 0 ? { x: ex, y: 1390, s: 1.95, view: 'threequarter', dir: -1, walk: true, dist: run * 900, expr: 'shock' } : { x: 1000, y: 1390, s: 1.95, view: 'threequarter', dir: 1, expr: t > ev('whoosh') ? 'shock' : 'nervous' };
  const dm = { x: 1650, y: 1390, s: 2.05, view: 'threequarter', dir: -1, pose: { ...POSE.stand, R: { sh: 30, el: 100, wr: -10, hand: 'grab' } }, hold: true, expr: t > ev('crunch') ? 'happy' : 'blank' };
  await cast([[C.edith, 'EDI', eo], [C.dume, 'DUME', dm]], cam, t); apply(cam);
  { const h = hnd(C.dume, dm); const chew = t > ev('crunch') ? 1 - seg(t, ev('crunch'), ev('crunch') + 2.5) : 1; if (chew > .05) emo('🧾', h.x, h.y - 30, 80 * (.4 + .6 * chew)); }
  const pk = seg(t, ev('whoosh'), ev('whoosh') + 1.0); if (pk > 0 && pk < 1) { const px = lerp(2400, 900, pk), py = 760 + Math.sin(pk * 9) * 40; ctx.save(); ctx.translate(px, py); ctx.rotate(-.2 + Math.sin(pk * 9) * .2); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(50, -14); ctx.lineTo(50, 14); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
  screen(); ctx.filter = 'blur(14px)'; ctx.fillStyle = '#1e3a14'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(i < 5 ? i * 70 : W - (i - 5) * 80, H - 120 - (i % 3) * 90, 200, 70, i * .7, 0, 7); ctx.fill(); } ctx.filter = 'none';
  txt('● REC', 200, BAR + 50, 34, '#e23a3a', { align: 'left' }); };
S.dating = async t => {
  const cam = camOf(t, { z: 1, x: 1280, y: 720 }); apply(cam); ctx.fillStyle = lg(0, 0, 2560, 1440, ['#ff7ab0', '#8a3ad0']); ctx.fillRect(0, 0, 2560, 1440);
  for (let i = 0; i < 20; i++) { const R = rng(i); emo(i % 3 ? '💖' : '💔', R() * 2560, ((R() * 1440 - t * 120 * (1 + R())) % 1500 + 1500) % 1500 - 60, 60 + R() * 70, Math.sin(t + i) * .3); }
  const sw = evs('swipe').map(e => seg(t, e.t, e.t + .45)).find(k => k > 0 && k < 1) || 0;
  ctx.save(); ctx.translate(1280 - io(sw) * 1500, 700); ctx.rotate(-io(sw) * .5); ctx.scale(.82, .82); rr(-430, -620, 860, 1240, 60, '#111', '#231A24', 12);
  ctx.save(); ctx.beginPath(); ctx.roundRect(-400, -590, 800, 1180, 40); ctx.clip(); ctx.drawImage(IM.attic, 640, 300, 1280, 1140, -400, -590, 800, 1180);
  const uo = { x: 400, y: 1250, s: 2.3, view: 'front', expr: 'smug', seed: 7 }; const svg = D.svg(800, 1180, person(C.ultron, 'ULT', t, uo), null); if (!S._u || S._k !== svg.length + '' + Math.floor(t * 12)) { const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await im.decode(); S._u = im; S._k = svg.length + '' + Math.floor(t * 12); }
  ctx.drawImage(S._u, -400, -590); ctx.fillStyle = lg(0, 200, 0, 590, ['rgba(0,0,0,0)', 'rgba(0,0,0,.85)']); ctx.fillRect(-400, 200, 800, 390);
  txt('ULTRON, 9', -360, 360, 70, '#fff', { align: 'left' }); txt('📍 an attic, Edinburgh', -360, 430, 34, '#ddd', { align: 'left', w: 600 }); txt('🎩 Victorian hats  🌆 tossing cities', -360, 480, 30, '#ddd', { align: 'left', w: 600 }); ctx.restore();
  ctx.restore(); [[620, '❌'], [1940, '💚']].forEach(([x, e]) => { rr(x - 90, 1000 - 90, 180, 180, 90, '#fff', '#231A24'); emo(e, x, 1002, 100); }); };
S.therapy = async t => {
  const cam = camOf(t, { z: 1.15, x: 1280, y: 820, push: .08 }); plate('gala_hall', cam); grade('#3a2a1a', .25);
  const to = { x: 1050, y: 1430, s: 2.15, view: 'threequarter', dir: 1, expr: t > sp('TOM', 2).t1 ? 'deadpan' : 'nervous' }, th = { x: 1820, y: 1430, s: 2.1, view: 'threequarter', dir: -1, pose: { ...POSE.stand, R: { sh: 30, el: 95, wr: 0, hand: 'grab' } }, hold: true, expr: 'neutral' };
  apply(cam); rr(420, 980, 140, 300, 40, '#2a6a6a', '#231A24'); rr(470, 1080, 900, 200, 40, '#2f7a7a', '#231A24'); rr(1300, 1000, 140, 280, 40, '#2a6a6a', '#231A24'); rr(1700, 1040, 300, 260, 30, '#8a4a2a', '#231A24');
  await cast([[C.tommy, 'TOM', to], [X.thr, 'THR', th]], cam, t); apply(cam); { const h = hnd(X.thr, th); emo('📝', h.x + 10, h.y - 30, 90); }
  };
S.hell = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 820 }); plate('ruins', cam); grade('#ff3010', .35, 'overlay');
  const ro = { x: 950, y: 1440, s: 2.2, view: 'threequarter', dir: 1, pose: POSE.hips, expr: 'excited', seed: 9 }, uo = { x: 1820, y: 1440, s: 2.2, view: 'threequarter', dir: -1, expr: 'smug' };
  apply(cam); ctx.fillStyle = '#4a2a1a'; ctx.fillRect(1395, 760, 22, 560); rr(1240, 700, 340, 200, 10, '#f4f1ea', '#231A24'); txt('FOR SALE', 1410, 760, 52, '#e23a3a'); txt('BAR: VERY LOW', 1410, 830, 32, '#231A24');
  await cast([[X.real, 'REAL', ro], [C.ultron, 'ULT', uo]], cam, t); apply(cam);
  for (let i = 0; i < 26; i++) { const R = rng(i + 5), x = R() * 2560, ph = (t * (1 + R()) + R()) % 1; ctx.fillStyle = `rgba(255,${120 + R() * 100 | 0},20,${.8 * (1 - ph)})`; ctx.beginPath(); ctx.ellipse(x + Math.sin(t * 5 + i) * 20, 1440 - ph * 380, 40 * (1 - ph) + 10, 90 * (1 - ph) + 20, 0, 0, 7); ctx.fill(); }
  glowS(W / 2, H, 900, 'rgba(255,90,20,A)', .35); };
S.heaven = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#bfe6ff', '#fff4d0']); ctx.fillRect(0, 0, 2560, 1440); glowS(...worldPt(cam, 1280, 300), 900, 'rgba(255,240,180,A)', .7); apply(cam);
  ctx.strokeStyle = '#e8d080'; ctx.lineWidth = 26; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(900 + i * 95, 1100); ctx.lineTo(900 + i * 95, 520 + Math.abs(i - 4) * 30); ctx.stroke(); } ctx.beginPath(); ctx.arc(1280, 700, 400, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  const ro = { x: 1700, y: 1400, s: 2.0, view: 'threequarter', dir: -1, expr: 'deadpan', pose: { ...POSE.stand, R: { sh: 40, el: 90, hand: 'open' }, L: { sh: -40, el: -90, hand: 'open' } } }, jo = { x: 820, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: t > sp('REC', 1).t0 ? 'shock' : 'smile' };
  await cast([[X.rec, 'REC', ro], [C.jarvis, 'JAR', jo]], cam, t); apply(cam);
  { const f = head(X.rec, ro, -14); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 12; ctx.shadowColor = '#fff2a0'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.ellipse(f.x, f.y, f.sc * 9, f.sc * 2.6, 0, 0, 7); ctx.stroke(); ctx.shadowBlur = 0; }
  desk(1360, 1150, 720, 300, '#ffffff', '#d8e4f0', '#ffe9a0'); rr(1820, 930, 260, 220, 12, '#e8eef4', '#231A24'); ctx.fillStyle = '#2fc6ff'; ctx.globalAlpha = .4; ctx.fillRect(1835, 945, 230, 160); ctx.globalAlpha = 1;
  rr(1430, 1200, 380, 80, 10, '#fff', '#231A24', 4); txt('TAKE A NUMBER', 1620, 1240, 34, '#2a3990');
  ctx.fillStyle = 'rgba(255,255,255,.95)'; for (let i = 0; i < 22; i++) { const R = rng(i + 70); ctx.beginPath(); ctx.ellipse(i * 125 + Math.sin(t * .5 + i) * 20, 1330 + R() * 80, 170, 80, 0, 0, 7); ctx.fill(); } };
S.court = async t => {
  const cam = camOf(t, { z: 1.08, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#5a3420', '#3a2010']); ctx.fillRect(0, 0, 2560, 1440); for (let i = 0; i < 14; i++) { ctx.fillStyle = i % 2 ? 'rgba(0,0,0,.12)' : 'rgba(255,220,180,.05)'; ctx.fillRect(i * 190, 0, 190, 1100); }
  ctx.fillStyle = '#c9a46a'; ctx.beginPath(); ctx.arc(1280, 360, 150, 0, 7); ctx.fill(); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 8; ctx.stroke(); emo('⚖️', 1280, 365, 160); [700, 1860].forEach(x => { ctx.fillStyle = '#1d3a8a'; ctx.fillRect(x - 70, 160, 140, 520); ctx.fillStyle = '#ffd23d'; ctx.fillRect(x - 6, 140, 12, 560); });
  const g = [ev('gavel'), ...evs('gavel3').flatMap(e => [e.t, e.t + .28, e.t + .56])]; const up = g.some(gt => t >= gt - .02 && t < gt + .14) ? 0 : 1;
  const jo = { x: 1280, y: 1300, s: 1.8, view: 'front', pose: { ...POSE.stand, R: { sh: up > .5 ? 100 : 60, el: up > .5 ? 60 : 20, hand: 'fist' } }, hold: true, expr: t > sp('JUDGE', 1).t0 ? 'shock' : 'deadpan' }, po = { x: 2000, y: 1500, s: 2.2, view: 'threequarter', dir: -1, expr: 'deadpan' };
  await cast([[X.judge, 'JUDGE', jo]], cam, t); apply(cam); { const h = hnd(X.judge, jo); emo('🔨', h.x, h.y - 30, 110, up > .5 ? -.8 : .3); }
  desk(780, 950, 1000, 560, '#6a3a1a', '#4a2a10', '#8a5a2a'); emo('🏛️', 1280, 1100, 110);
  await cast([[C.paladin, 'PAL', po]], cam, t); apply(cam); desk(1750, 1190, 500, 300, '#6a3a1a', '#4a2a10', '#8a5a2a'); emo('🧾', 1880, 1150, 80); };
S.cardshop = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 800 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#f8e0e8', '#e8c8d8']); ctx.fillRect(0, 0, 2560, 1440);
  const R = rng(4); for (let r = 0; r < 4; r++) { ctx.fillStyle = '#a87a5a'; ctx.fillRect(60, 380 + r * 190, 2440, 18); for (let i = 0; i < 22; i++) { const c = ['#ff8ab0', '#ffd23d', '#8ad0ff', '#b0f0a0', '#f4f1ea', '#c8a0ff'][Math.floor(R() * 6)]; rr(80 + i * 110, 250 + r * 190, 86, 128, 6, c, '#231A24', 3); emo(['💐', '🌈', '🎈', '🕊️', '🤖', '🍞'][Math.floor(R() * 6)], 123 + i * 110, 314 + r * 190, 40); } }
  rr(1080, 160, 420, 80, 12, '#231A24'); txt('AISLE 9: ROBOTS', 1290, 200, 40, '#ffd23d');
  const co = { x: 1750, y: 1440, s: 2.1, view: 'threequarter', dir: -1, expr: 'excited' }, kz = seg(t, ev('kazoo'), ev('kazoo') + .3), vo = { x: 850, y: 1440, s: 2.2, view: 'threequarter', dir: 1, pose: kz > 0 ? { ...POSE.stand, R: { sh: 40, el: 95, wr: -10, hand: 'grab' } } : POSE.stand, hold: kz > 0, expr: kz > 0 ? 'deadpan' : 'nervous' };
  await cast([[X.clk, 'CLK', co], [C.vision, 'VIS', vo]], cam, t); apply(cam); desk(1400, 1150, 760, 300, '#d8a0b0', '#b07a8a', '#fff');
  if (kz > 0) { const h = hnd(C.vision, vo); ctx.save(); ctx.translate(h.x + 140, h.y - 120); ctx.scale(io(kz), io(kz)); rr(-170, -120, 170, 240, 8, '#bfe6ff', '#231A24', 5); rr(0, -120, 170, 240, 8, '#fff', '#231A24', 5); txt('GET', 85, -50, 34, '#2a3990'); txt('WELL', 85, 0, 34, '#2a3990'); txt('SOON!', 85, 50, 34, '#e23a3a'); emo('🤖', -85, 0, 90); ctx.restore(); } };
S.trailer = async t => {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); const showBird = t > G.slam[2].t - .2;
  const flash = Math.max(...evs('braam').map(e => seg(t, e.t, e.t + .1) * (1 - seg(t, e.t + .1, e.t + .5)))); if (flash > 0) { ctx.fillStyle = `rgba(200,210,255,${flash * .5})`; ctx.fillRect(0, 0, W, H); }
  if (showBird) { const k = io(seg(t, G.slam[2].t - .2, G.slam[2].t + 1.5)), cx = W / 2, cy = H * .55 + 40; ctx.save(); ctx.globalAlpha = .35 + .65 * k; ctx.translate(cx, cy); ctx.scale(1 + k * .15, 1 + k * .15);
    ctx.fillStyle = '#0c0608'; for (const sd of [-1, 1]) for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(sd * 60, -120 + i * 10); ctx.lineTo(sd * (260 + i * 55), -300 + i * 70 + Math.sin(t * 2 + i) * 10); ctx.lineTo(sd * (210 + i * 50), -230 + i * 75); ctx.fill(); }
    ctx.beginPath(); ctx.moveTo(-90, -160); ctx.quadraticCurveTo(0, -330, 90, -160); ctx.lineTo(170, 380); ctx.lineTo(-170, 380); ctx.fill(); ctx.strokeStyle = 'rgba(160,20,30,.6)'; ctx.lineWidth = 6; ctx.stroke();
    glowS(cx - 26, cy - 165, 50, 'rgba(255,30,30,A)', .9); glowS(cx + 26, cy - 165, 50, 'rgba(255,30,30,A)', .9); ctx.fillStyle = '#ff3030'; ctx.beginPath(); ctx.arc(-26, -165, 9, 0, 7); ctx.arc(26, -165, 9, 0, 7); ctx.fill(); ctx.restore(); grade('#300008', .5, 'screen'); }
  if (t > G.slam[3].t + 1.2) { screen(); rr(W / 2 - 230, H - BAR - 150, 460, 90, 6, null, '#f4ecd8', 4); txt('RATED R: REALLY CREEPY', W / 2, H - BAR - 105, 32, '#f4ecd8', { w: 700 }); } };
S.helpdesk = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 820 }); plate('van_int', cam); grade('#1a2a4a', .2);
  apply(cam); rr(1060, 230, 440, 120, 14, '#1a0a0a', '#231A24'); txt('NOW SERVING #666', 1280, 292, 46, '#ff3030', { glow: '#ff3030', blur: 20 });
  const tk = { x: 1700, y: 1400, s: 2.0, view: 'threequarter', dir: -1, expr: 'deadpan', pose: POSE.think, hold: false }, eo = { x: 800, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: t > sp('EDI', 3).t0 ? 'sad' : 'nervous' };
  await cast([[X.tech, 'TECH', tk], [C.edith, 'EDI', eo]], cam, t); apply(cam); { const f = head(C.edith, eo, 6); } desk(1300, 1150, 900, 300, '#5a6a7a', '#3a4a5a'); rr(1350, 960, 300, 200, 8, '#222', '#231A24'); ctx.fillStyle = '#2fc6ff'; ctx.globalAlpha = .5; ctx.fillRect(1365, 975, 270, 160); ctx.globalAlpha = 1; emo('☕', 2050, 1110, 70); emo('😈', 1500, 1055, 80); };
S.infomercial = async (t, two) => {
  const cam = camOf(t, { z: 1.08, x: 1280, y: 780 }); apply(cam);
  if (two) studio('#2a2a30', '#4a3a2a', '#ff8a2a', t); else { ctx.fillStyle = '#ffd23d'; ctx.fillRect(0, 0, 2560, 1440); burst(1280, 620, 2000, t * .3, '#ffd23d', '#ffb02a', 30); ctx.fillStyle = lg(0, 1150, 0, 1440, ['#ff6a2b', '#a83a10']); ctx.fillRect(0, 1150, 2560, 290); }
  const ho = { x: two ? 950 : 780, y: 1440, s: 2.2, view: 'threequarter', dir: 1, pose: POSE.point, expr: 'excited', seed: 11 }, cu = { x: 1900, y: 1440, s: 2.1, view: 'threequarter', dir: -1, expr: 'happy' };
  apply(cam); ctx.fillStyle = '#231A24'; ctx.fillRect(1180, 1000, 260, 330); rr(1150, 980, 320, 40, 8, '#f4f1ea', '#231A24');
  if (two) { rr(1150, 650, 320, 330, 16, lg(1150, 650, 1470, 980, ['#e8eef4', '#8a9aa8', '#e8eef4']), '#231A24', 8); txt('ADAMANTIUM', 1310, 760, 40, '#231A24'); txt('ROUNDS', 1310, 815, 50, '#e23a3a'); emo('🤖', 1310, 900, 70); rr(2050, 500, 300, 300, 150, '#f4f1ea', '#231A24'); emo('🎯', 2200, 650, 200, Math.sin(t * 30) * .05 * (t > ev('gunshot'))); }
  else { rr(1150, 650, 320, 330, 16, '#2a3990', '#231A24', 8); txt('STARK', 1310, 720, 50, '#ffd23d'); txt('IN-A-BOX', 1310, 775, 40, '#fff'); ['🤵', '👩‍🦰', '👩‍✈️', '🦾', '🤖'].forEach((e, i) => emo(e, 1190 + i * 60, 880, 52)); burst(2250, 380, 190, t, '#e23a3a', '#ff4a4a', 16); txt('ONLY', 2250, 340, 40, '#fff'); txt('$19.99', 2250, 400, 60, '#fff', { stroke: '#231A24', lw: 8 }); }
  await cast(two ? [[X.raza, 'RAZ', ho]] : [[X.host, 'HOST', ho], [X.cust, 'CUST', cu]], cam, t);
  if (two && lvl('DISC', t) >= 0) { screen(); rr(260, BAR + 110, W - 520, 120, 16, 'rgba(255,255,255,.92)', '#231A24', 4); ctx.save(); ctx.beginPath(); ctx.rect(280, BAR + 110, W - 560, 120); ctx.clip(); txt('SIDE EFFECTS MAY INCLUDE: robot gets back up · robot gets mad · robot reads your hard drive · robot sues', W / 2 - (t - sp('DISC').t0) * 300 + 600, BAR + 170, 34, '#231A24', { w: 700 }); ctx.restore(); }
  if (!two) { const k = seg(t, ev('airhorn'), ev('airhorn') + 2.5); if (k > 0 && k < 1) { screen(); for (let i = 0; i < 60; i++) { const R = rng(i); ctx.fillStyle = ['#e23a3a', '#2fc6ff', '#fff', '#2a3990'][i % 4]; ctx.save(); ctx.translate(R() * W, -50 + k * (H + 200) * (.6 + R() * .6)); ctx.rotate(t * 5 + i); ctx.fillRect(-10, -6, 20, 12); ctx.restore(); } } } };
S.infomercial2 = t => S.infomercial(t, true);
S.runway = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 760 }); plate('gala', cam); grade('#1a0a2a', .4, 'multiply'); apply(cam);
  ctx.fillStyle = lg(0, 900, 0, 1440, ['#2a2a34', '#e8e8f0']); ctx.beginPath(); ctx.moveTo(1180, 900); ctx.lineTo(1380, 900); ctx.lineTo(1900, 1440); ctx.lineTo(660, 1440); ctx.fill(); ctx.strokeStyle = '#ffd23d'; ctx.lineWidth = 6; ctx.stroke();
  for (let i = 0; i < 12; i++) { const k = i / 12; [-1, 1].forEach(s => { ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(1280 + s * (100 + k * 520), 900 + k * 540, 6 + k * 8, 0, 7); ctx.fill(); }); }
  cone(1280, 0, 30, 400, 1440, 'rgba(255,240,220,A)', .25);
  const k = seg(t, OPEN, DUR - .5), y = lerp(1010, 1460, k), s = lerp(.85, 2.1, k); const vo = { x: 1280, y, s, view: 'front', walk: true, dist: lerp(0, 450, k) * 2.2, expr: 'smug' };
  await cast([[X.velvet, 'VIS', vo]], cam, t); apply(cam); crowd(1460, 14, 3, '#08060c', 1.1, t); emo('📸', 300, 1100, 80); emo('📸', 2250, 1080, 80); };
S.wedding = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); plate('gallery', cam); grade('#ffb0d0', .35, 'soft-light'); apply(cam);
  for (let i = 0; i < 18; i++) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(i * 150, 180 + Math.sin(i) * 20, 40, 0, 7); ctx.fill(); }
  const run = seg(t, sp('JOC', 1).t1, sp('JOC', 1).t1 + 1.4); const jo = run > 0 ? { x: 1950 + run * 900, y: 1440, s: 2.05, view: 'threequarter', dir: 1, walk: true, dist: run * 900 } : { x: 1950, y: 1440, s: 2.05, view: 'threequarter', dir: -1, expr: 'blank' };
  const po = { x: 1280, y: 1440, s: 2.05, view: 'front', pose: { ...POSE.stand, L: { sh: -30, el: -95, hand: 'grab' } }, expr: 'excited' }, uo = { x: 620, y: 1440, s: 2.2, view: 'threequarter', dir: 1, expr: t > sp('JOC', 1).t1 ? 'shock' : 'smug' };
  await cast([[C.ultron, 'ULT', uo], [X.pln, 'PLN', po], [C.jocasta, 'JOC', jo]], cam, t); apply(cam); { const h = hnd(X.pln, po, 'L'); emo('📋', h.x, h.y - 30, 90); const f = head(C.jocasta, jo, -10); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(f.x - f.sc * 8, f.y); ctx.quadraticCurveTo(f.x, f.y - f.sc * 6, f.x + f.sc * 8, f.y); ctx.lineTo(f.x + f.sc * 14 * jo.dir, f.y + f.sc * 40); ctx.lineTo(f.x - f.sc * 6 * jo.dir, f.y + f.sc * 40); ctx.fill(); } };
S.sitcom = async t => {
  const cam = camOf(t, { z: 1.2, x: 1280, y: 820 }); plate('mind_kitchen', cam); grade('#ffcc88', .25);
  const ent = seg(t, OPEN, OPEN + 1.1); const to = ent < 1 ? { x: lerp(200, 880, ent), y: 1440, s: 2.15, view: 'threequarter', dir: 1, walk: true, dist: ent * 680 } : { x: 880, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: 'nervous', seed: 2 };
  const mug = G.laugh.some(l => t > l.t && t < l.t + 1.1); const uo = { x: 1700, y: 1440, s: 2.2, view: mug ? 'front' : 'threequarter', dir: -1, expr: mug ? 'smug' : 'happy', pose: mug ? POSE.thumbsUp : POSE.stand };
  await cast([[C.tommy, 'TOM', to], [C.ultron, 'ULT', uo]], cam, t); vhs(t); pillar();
  const tk = seg(t, OPEN, OPEN + 1.2); if (tk < 1) { screen(); ctx.globalAlpha = 1 - seg(tk, .75, 1); txt('Father Knows Worst', W / 2, H * .3, 110, '#ffd23d', { stroke: '#7a1a8a', lw: 16, font: 'Georgia, serif', w: 700 }); ctx.globalAlpha = 1; } };
S.datingshow = async t => {
  const cam = camOf(t, { z: 1.06, x: 1280, y: 760 }); apply(cam); studio('#3a0a3a', '#7a1a6a', '#ff5ab0', t);
  txt('♥', 1280, 520, 520, 'rgba(255,90,170,.25)', { glow: '#ff5ab0', blur: 60 }); txt('LOVE IS BLIND', 1280, 300, 90, '#ffd0e8', { glow: '#ff5ab0', blur: 30 }); txt('(AND EVIL)', 1280, 400, 54, '#ff5ab0', { glow: '#ff5ab0' });
  const zt = ev('zap'), zap = t > zt && t < zt + .5;
  const uo = { x: 560, y: 1440, s: 2.05, view: 'threequarter', dir: 1, expr: zap ? 'shock' : 'smug' }, ho = { x: 1280, y: 1440, s: 2.1, view: 'front', expr: 'excited', pose: POSE.wave, seed: 4 }, jo = { x: 2000, y: 1440, s: 2.0, view: 'threequarter', dir: -1, expr: 'blank' };
  await cast([[C.ultron, 'ULT', uo], [X.host2, 'HOST2', ho], [C.jocasta, 'JOC', jo]], cam, t); apply(cam);
  [[560, '#c02a8a'], [2000, '#c02a8a']].forEach(([x, c]) => { desk(x - 260, 1180, 520, 300, c, '#601050', '#ff9ad0'); txt('♥', x, 1320, 120, '#ffd0e8'); });
  if (zap) { const f = head(C.jocasta, jo, 2); ctx.strokeStyle = '#ff3030'; ctx.lineWidth = 14; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.moveTo(f.x - 20, f.y + 20); ctx.lineTo(700, f.y - 120); ctx.moveTo(f.x + 10, f.y + 20); ctx.lineTo(720, f.y - 80); ctx.stroke(); ctx.shadowBlur = 0; }
  const m = seg(t, ev('dingding'), ev('dingding') + 2.4); if (m > 0 && m < 1) { screen(); for (let i = 0; i < 40; i++) { const R = rng(i + 9); emo('💖', R() * W, -60 + m * (H + 160) * (.5 + R() * .7), 50 + R() * 50, t * 3 + i); } } };
S.vhs_farm = async t => {
  const cam = camOf(t, { z: 1.15, x: 1280, y: 820 }); plate('suburb', cam); grade('#ffe0a0', .2);
  const fo = { x: 1000, y: 1440, s: 2.2, view: 'threequarter', dir: 1, expr: 'smug', pose: POSE.wave, seed: 6 };
  await cast([[X.fox, 'FOX', fo]], cam, t); apply(cam);
  { const f = head(X.fox, fo, -10); for (const s of [-1, 1]) { ctx.fillStyle = '#e0702a'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(f.x + s * f.sc * 4, f.y); ctx.lineTo(f.x + s * f.sc * 9, f.y - f.sc * 11); ctx.lineTo(f.x + s * f.sc * 11, f.y + f.sc * 1); ctx.closePath(); ctx.fill(); ctx.stroke(); } const tx = fo.x - 110, ty = 1250; ctx.fillStyle = '#e0702a'; ctx.beginPath(); ctx.ellipse(tx, ty + Math.sin(t * 4) * 10, 130, 45, -.5 + Math.sin(t * 4) * .2, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(tx - 110, ty + 60, 35, 25, -.5, 0, 7); ctx.fill(); }
  [[1650, 0], [1850, 1], [2050, 2]].forEach(([x, i]) => { const b = lvl('HEN', t) >= 0 ? Math.abs(Math.sin(t * 14 + i)) * 30 : Math.abs(Math.sin(t * 3 + i)) * 6; emo('🐔', x, 1280 - b, 170); });
  const ap = seg(t, sp('NEWS').t0, sp('NEWS').t0 + .2); if (ap > 0) { screen(); ctx.save(); ctx.translate(W * .7, H * .35); ctx.rotate(-.15); ctx.scale(1.6 - .6 * io(ap), 1.6 - .6 * io(ap)); rr(-260, -70, 520, 140, 12, null, '#e23a3a', 12); txt('APPROVED BY ULTRON', 0, 2, 44, '#e23a3a'); ctx.restore(); }
  vhs(t, 1.3); pillar(); };
S.bomb = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); plate('madripoor', cam); grade('#0a0a20', .45, 'multiply');
  const sw = seg(t, ev('whoosh'), ev('whoosh') + .4);
  const o1 = { x: 700, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: 'nervous' }, o2 = { x: 1900, y: 1440, s: 2.15, view: 'threequarter', dir: -1, pose: { ...POSE.stand, R: { sh: 60, el: 60, hand: 'grab' } }, hold: true, expr: t > sp('T2').t1 ? 'shock' : 'nervous' };
  await cast([[X.bomb, 'T1', o1], [X.bomb, 'T2', o2]], cam, t); apply(cam); { const h = hnd(X.bomb, o2); emo('✂️', h.x - 20, h.y - 20, 80, -.6); }
  rr(1040, 1060, 480, 260, 10, '#3a3020', '#231A24'); rr(1100, 900, 360, 180, 14, '#2a2a2a', '#231A24'); const left = sw >= 1 ? 99 : Math.max(0, 7 - Math.floor((t - OPEN) * .9)); rr(1140, 930, 280, 110, 8, '#000'); txt(sw >= 1 ? '9:99' : `0:0${Math.max(1, left)}`, 1280, 988, 80, sw >= 1 ? '#3aff7a' : '#ff3030', { glow: sw >= 1 ? '#3aff7a' : '#ff3030', blur: 20, font: 'monospace', w: 700 });
  for (let i = 0; i < 14; i++) { ctx.strokeStyle = ['#e23a3a', '#c8202a', '#ff4a4a', '#a8101a'][i % 4]; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(1110 + i * 24, 1080); ctx.bezierCurveTo(1000 + i * 40, 1150 + (i % 3) * 30, 1500 - i * 30, 1180, 1100 + i * 25, 1300); ctx.stroke(); }
  if (sw > 0 && sw < 1) { screen(); const x = lerp(-200, W + 200, sw); ctx.fillStyle = 'rgba(255,255,255,.9)'; for (let i = 0; i < 8; i++) ctx.fillRect(x - 500 + i * 30, H * .45 + i * 14, 500, 6); emo('💨', x, H * .55, 160); } };
S.pigeons = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 760 }); plate('london', cam); apply(cam);
  ctx.fillStyle = lg(0, 1120, 0, 1440, ['#4a4a52', '#2a2a30']); ctx.fillRect(0, 1120, 2560, 320); ctx.fillStyle = '#5a5a62'; ctx.fillRect(0, 1100, 2560, 30);
  rr(860, 360, 840, 120, 8, '#e23a3a', '#231A24'); txt('PIGEON UNION · LOCAL 42', 1280, 420, 50, '#fff');
  rr(700, 1060, 1160, 60, 8, '#6a4a2a', '#231A24'); const chant = t > ev('chant') && t < ev('chant') + 3;
  [[820, 'PIG1'], [1060, ''], [1280, 'PIG2'], [1500, ''], [1740, '']].forEach(([x, who], i) => { const L = who ? lvl(who, t) : -1; const b = chant ? Math.abs(Math.sin(t * 9 + i)) * 50 : (L > 0 ? Math.abs(Math.sin(t * 16)) * 26 : 0); emo('🐦', x, 960 - b, 200, i % 2 ? .1 : -.1); ctx.fillStyle = '#ffd23d'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x - 10, 885 - b, 50, Math.PI, 0); ctx.fill(); ctx.stroke(); if (chant) emo('✊', x + 90, 860 - b, 70); }); };
S.newsreel = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 800, sx: 0 }); cam.sx += (rng(Math.floor(t * 24))() - .5) * 8; plate('lab1939', cam);
  const ho = { x: 820, y: 1440, s: 2.15, view: 'threequarter', dir: 1, pose: POSE.wave, expr: 'happy' }, ro = { x: 1650, y: 1440, s: 2.15, view: 'front', expr: 'blank', pose: POSE.wave, ph: .5 };
  await cast([[X.horton, '', ho], [tw(C.vision, { top: { color: '#d8d8d8', tie: null, shirt: '#c8c8c8' } }), '', ro]], cam, t); sepia(1); film(t);
  const card = (a, b, l1, l2) => { const k = seg(t, a, b); if (k <= 0 || k >= 1) return; screen(); ctx.fillStyle = '#0a0806'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = '#d8c8a0'; ctx.lineWidth = 6; ctx.strokeRect(300, 220, W - 600, H - 440); txt(l1, W / 2, H / 2 - 50, 90, '#e8dcc0', { font: 'Georgia, serif', w: 700 }); txt(l2, W / 2, H / 2 + 60, 56, '#e8dcc0', { font: 'Georgia, serif', w: 400 }); film(t); };
  card(OPEN, sp('NEWS').t1, 'SCIENCE MARCHES ON!', '~ 1939 ~'); card(sp('NEWS', 3).t0, sp('NEWS', 3).t1 + .8, 'NEXT WEEK:', 'Lead Paint! (Delicious!)'); };
S.garage = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); plate('cargo_plane', cam); grade('#3a3020', .25); apply(cam);
  rr(1100, 560, 420, 260, 10, '#1a1a1a', '#231A24'); ctx.strokeStyle = '#3aff7a'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const x = 1120 + i * 9.5; ctx.lineTo(x, 700 + Math.sin(i * .8 + t * 6) * 40 * (i % 7 === 0 ? 2 : .4)); } ctx.stroke(); txt('SOUL DIAGNOSTIC', 1310, 600, 30, '#3aff7a', { font: 'monospace', w: 700 });
  const mo = { x: 1750, y: 1440, s: 2.15, view: 'threequarter', dir: -1, pose: { ...POSE.stand, R: { sh: 30, el: 80, hand: 'grab' } }, hold: true, expr: 'deadpan' }, vo = { x: 820, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: 'nervous' };
  await cast([[X.mech, 'MECH', mo], [C.vision, 'VIS', vo]], cam, t); apply(cam); { const h = hnd(X.mech, mo); emo('🔧', h.x, h.y - 30, 90, -.5); const f = head(X.mech, mo, -12); ctx.fillStyle = '#e23a3a'; ctx.beginPath(); ctx.arc(f.x, f.y, f.sc * 9, Math.PI, 0); ctx.fill(); ctx.fillRect(f.x, f.y - 6, f.sc * 12 * mo.dir, 12); }
  if (t > sp('MECH', 3).t0) { const f = head(C.vision, vo); const on = Math.floor(t * 4) % 2; ctx.fillStyle = on ? '#ffd23d' : '#8a6a10'; ctx.beginPath(); ctx.arc(f.x, f.y, f.sc * 1.6, 0, 7); ctx.fill(); if (on) glowS(...worldPt(cam, f.x, f.y), 70, 'rgba(255,220,60,A)', .9); } };
S.support = async t => {
  const cam = camOf(t, { z: 1.08, x: 1280, y: 780 }); plate('hospital', cam); grade('#2a3a2a', .2); apply(cam);
  rr(700, 330, 1160, 130, 10, '#f4f1ea', '#231A24'); txt('REAL BOYS ANONYMOUS', 1280, 395, 64, '#2a3990');
  const grow = seg(t, ev('boing'), ev('boing') + .5);
  const ws = { x: 460, y: 1440, s: 1.95, view: 'threequarter', dir: 1, expr: 'nervous' }, sh = { x: 930, y: 1440, s: 2.15, view: 'threequarter', dir: 1, expr: 'deadpan' }, vi = { x: 1450, y: 1440, s: 2.1, view: 'front', expr: 'sad' }, ld = { x: 2060, y: 1440, s: 2.05, view: 'threequarter', dir: -1, expr: 'smile' };
  await cast([[X.wood, 'WOOD', ws], [X.ship, 'SHIP', sh], [C.vision, 'VIS', vi], [X.lead, 'LEAD', ld]], cam, t); apply(cam);
  { const f = head(X.wood, ws, 2); const L = f.sc * (3 + 16 * io(grow)); ctx.fillStyle = '#c88a4a'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(f.x, f.y + f.sc * 4, L, f.sc * 2.4, 6); ctx.fill(); ctx.stroke(); if (grow > 0) emo('🍃', f.x + L, f.y + f.sc * 2, 50); }
  { const f = head(X.ship, sh, -12); ctx.fillStyle = '#f4f1ea'; ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(f.x - f.sc * 14, f.y + f.sc * 2); ctx.lineTo(f.x + f.sc * 14, f.y + f.sc * 2); ctx.lineTo(f.x, f.y - f.sc * 12); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  rr(1700, 1150, 260, 100, 10, '#8a8a90', '#231A24'); emo('☕', 1760, 1110, 70); emo('🍩', 1880, 1120, 60); };
S.soap = async t => {
  const st = [...evs('organ'), ...evs('dundun')].filter(e => t > e.t).pop(); const focus = st ? (st.n === 'dundun' ? 900 : 1650) : 1280; const zk = st ? io(seg(t, st.t, st.t + .3)) : 0;
  const cam = camOf(t, { z: 1.15 + .25 * zk, x: lerp(1280, focus, zk), y: 820 - 120 * zk }); plate('manor', cam, 2); grade('#ff80c0', .25, 'soft-light');
  const tin = seg(t, sp('TOM').t0 - .5, sp('TOM').t0); const vo = { x: 900, y: 1440, s: 2.2, view: 'threequarter', dir: 1, expr: 'sad' }, uo = { x: 1650, y: 1440, s: 2.2, view: 'threequarter', dir: -1, expr: t > sp('ULT').t0 ? 'shock' : 'nervous' }, to = { x: lerp(2700, 2150, io(tin)), y: 1440, s: 2.1, view: 'threequarter', dir: -1, expr: 'deadpan' };
  await cast([[X.virgil, 'VIR', vo], [C.ultron, 'ULT', uo], ...(tin > 0 ? [[C.tommy, 'TOM', to]] : [])], cam, t);
  screen(); const v = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(255,200,230,0)'); v.addColorStop(1, 'rgba(120,40,90,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); };
S.plumber = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); plate('bathroom', cam); grade('#3a5a5a', .15);
  const mo = { x: 1650, y: 1440, s: 2.15, view: 'threequarter', dir: -1, pose: { ...POSE.stand, R: { sh: 30, el: 80, hand: 'grab' } }, hold: true, expr: 'deadpan' }, bo = { x: 820, y: 1440, s: 2.1, view: 'threequarter', dir: 1, expr: 'nervous' };
  await cast([[X.mech, 'MECH', mo], [X.billy, 'BILLY', bo]], cam, t); apply(cam); { const h = hnd(X.mech, mo); emo('🔧', h.x, h.y - 30, 90, -.5); const f = head(X.mech, mo, -12); ctx.fillStyle = '#e23a3a'; ctx.beginPath(); ctx.arc(f.x, f.y, f.sc * 9, Math.PI, 0); ctx.fill(); }
  rr(1980, 1150, 520, 260, 60, '#f4f1ea', '#231A24'); for (let i = 0; i < 6; i++) emo('🫧', 2050 + i * 70, 1130 - Math.abs(Math.sin(t * 2 + i)) * 60, 50); };
S.karaoke = async t => {
  const cam = camOf(t, { z: 1.08, x: 1280, y: 780 }); plate('pub_int', cam); grade('#1a0a2a', .55, 'multiply'); apply(cam);
  txt('KARAOKE NIGHT', 1280, 400, 90, '#ff5ab0', { glow: '#ff5ab0', blur: 40 }); ctx.fillStyle = '#2a1a2a'; ctx.fillRect(600, 1180, 1360, 260); ctx.fillStyle = '#ffd23d'; ctx.fillRect(600, 1170, 1360, 16);
  cone(1280, 0, 30, 360, 1200, 'rgba(255,220,250,A)', .3);
  const hostOn = t < sp('JOC').t0 - .3; const zt = ev('zap'), zap = t > zt && t < zt + .5;
  const ko = { x: 2050, y: 1440, s: 2.0, view: 'threequarter', dir: -1, expr: 'excited', pose: POSE.point }, jo = { x: 1280, y: 1270, s: 1.95, view: 'front', pose: { ...POSE.stand, R: { sh: 40, el: 110, wr: -10, hand: 'grab' } }, hold: true, expr: 'blank' };
  await cast([[C.jocasta, 'JOC', jo], ...(hostOn ? [[X.khost, 'KHOST', ko]] : [])], cam, t); apply(cam); { const h = hnd(C.jocasta, jo); emo('🎤', h.x - 10, h.y - 40, 80, .4); }
  if (zap) { const f = head(C.jocasta, jo, 2); ctx.strokeStyle = '#ff3030'; ctx.lineWidth = 16; ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.moveTo(f.x - 18, f.y + 20); ctx.lineTo(500, 1500); ctx.moveTo(f.x + 18, f.y + 20); ctx.lineTo(2100, 1500); ctx.stroke(); ctx.shadowBlur = 0; }
  if (t < zt + .25) crowd(1380, 12, 5, '#06040a', 1.15, t * (t > sp('BOO').t0 && t < sp('BOO').t1 + .3 ? 1 : 0)); };
S.weather = async t => {
  const cut = sp('ANCH').t0 - .25;
  if (t < cut) { const cam = camOf(t, { z: 1.05, x: 1280, y: 760 }); apply(cam); ctx.fillStyle = lg(0, 0, 0, 1440, ['#2a6ab0', '#1a3a70']); ctx.fillRect(0, 0, 2560, 1440);
    ctx.fillStyle = '#5aa05a'; ctx.strokeStyle = '#2a5a2a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1500, 250); ctx.bezierCurveTo(1700, 300, 1650, 520, 1800, 640); ctx.bezierCurveTo(1950, 760, 1900, 980, 2050, 1080); ctx.bezierCurveTo(1800, 1140, 1500, 1120, 1380, 1060); ctx.bezierCurveTo(1500, 900, 1350, 800, 1450, 640); ctx.bezierCurveTo(1350, 520, 1400, 330, 1500, 250); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#e23a3a'; ctx.beginPath(); ctx.arc(1900, 980, 16, 0, 7); ctx.fill(); txt('LONDON', 1900, 1030, 34, '#fff');
    const n = Math.floor(seg(t, OPEN, cut) * 22); for (let i = 0; i < n; i++) { const R = rng(i + 3); emo(i % 4 ? '🐦' : '☁️', 1400 + R() * 650, 300 + R() * 760, 70 + R() * 30, Math.sin(t * 3 + i) * .2); }
    rr(160, 230, 560, 300, 20, 'rgba(14,12,20,.8)'); txt('TODAY', 440, 290, 40, '#ffd23d'); emo('🐦', 330, 410, 110); txt('100%', 540, 410, 70, '#fff'); txt('chance of nanobots', 440, 490, 30, '#ddd', { w: 600 });
    const wo = { x: 900, y: 1440, s: 2.2, view: 'threequarter', dir: 1, pose: POSE.point, expr: 'excited', seed: 8 }; await cast([[X.wx, 'WX', wo]], cam, t); }
  else { const cam = camOf(t, { z: 1.15, x: 1280, y: 800 }); apply(cam); studio('#0d1233', '#1b2470', '#2fc6ff', t); txt('DUMDOWN NEWS', 1280, 300, 70, '#f4f1ea');
    const ao = { x: 1280, y: 1440, s: 2.2, view: 'front', expr: 'deadpan' }; await cast([[X.anch, 'ANCH', ao]], cam, t); apply(cam); desk(700, 1150, 1160, 300, '#2a3990', '#1b2470', '#ffd23d');
    const f = head(X.anch, ao, -12); emo('🐦', f.x + 20, f.y - 50, 120, Math.sin(t * 5) * .2); for (let i = 0; i < 6; i++) emo('🪶', f.x + Math.cos(i * 1.1) * 250, f.y + 160 + Math.sin(i * 1.7) * 140, 60, i); } };
S.book = async t => {
  const cam = camOf(t, { z: 1, x: 1280, y: 720 }); apply(cam); ctx.fillStyle = lg(0, 0, 2560, 1440, ['#e8d8ff', '#ffe8d0']); ctx.fillRect(0, 0, 2560, 1440); glowS(...worldPt(cam, 1600, 700), 800, 'rgba(255,255,255,A)', .8); apply(cam);
  const ul = t > sp('ULT').t0 - .2 && t < sp('ULT').t1 + .3; const bx = ul ? 1900 : 1500;
  ctx.save(); ctx.translate(bx, 720); ctx.rotate(-.06 + Math.sin(t * .8) * .03); ctx.fillStyle = '#231A24'; ctx.fillRect(-300 + 24, -400 + 24, 600, 800); ctx.fillStyle = lg(-300, -400, 300, 400, ['#2a3990', '#0d1233']); ctx.fillRect(-300, -400, 600, 800); ctx.fillStyle = '#ffd23d'; ctx.fillRect(-300, -400, 40, 800);
  txt('YOU ARE', 20, -270, 70, '#f4f1ea'); txt('MY', 20, -190, 70, '#f4f1ea'); txt('SOMETHING', 20, -110, 70, '#ffd23d'); emo('💛', 20, 60, 180); txt('by VISION', 20, 300, 44, '#f4f1ea', { w: 600 }); burst(220, -330, 90, t, '#e23a3a', '#ff5a5a', 14); txt('#1', 220, -330, 50, '#fff'); ctx.restore();
  if (ul) { const uo = { x: 700, y: 1440, s: 2.3, view: 'threequarter', dir: 1, expr: 'happy' }; await cast([[C.ultron, 'ULT', uo]], cam, t); screen(); rr(260, BAR + 120, 380, 70, 35, '#e23a3a'); txt('REAL CUSTOMER', 450, BAR + 156, 32, '#fff'); }
  else { screen(); txt('From the robot who brought you', 560, H * .35, 40, '#2a3990', { w: 600 }); txt('"I\'ve Died Twice"', 560, H * .45, 64, '#e23a3a', { font: 'Georgia, serif', w: 700 }); }
  if (t > sp('SELF', 2).t0) { screen(); txt('*results may vary', W * .75, H - BAR - 60, 30, '#555', { w: 600 }); } };
S.standup = async t => {
  const cam = camOf(t, { z: 1.12, x: 1280, y: 800 }); plate('pub', cam); grade('#05030a', .75, 'multiply'); apply(cam);
  for (let r = 0; r < 12; r++) for (let i = 0; i < 18; i++) { ctx.fillStyle = (r + i) % 3 ? '#5a2a1a' : '#6a3420'; ctx.fillRect(i * 150 + (r % 2) * 75 - 75, 200 + r * 80, 144, 74); } ctx.globalAlpha = .7; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 2560, 1440); ctx.globalAlpha = 1;
  glowS(...worldPt(cam, 1280, 900), 560, 'rgba(255,240,210,A)', .7); apply(cam); cone(1280, 0, 30, 420, 1440, 'rgba(255,240,210,A)', .25);
  const vo = { x: 1280, y: 1400, s: 2.1, view: 'front', pose: { ...POSE.stand, L: { sh: -20, el: -100, hand: 'grab' } }, expr: t > ev('crickets') && t < ev('rimshot') ? 'nervous' : 'smile' };
  ctx.strokeStyle = '#222'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(1180, 1400); ctx.lineTo(1180, 900); ctx.stroke();
  await cast([[C.vision, 'VIS', vo]], cam, t); apply(cam); { const h = hnd(C.vision, vo, 'L'); emo('🎤', h.x, h.y - 40, 80, -.3); }
  const to = { x: 2250, y: 1600, s: 2.5, view: 'threequarter', dir: -1, expr: 'deadpan', pose: POSE.point }; crowd(1400, 13, 8, '#05030a', 1.15, t * (G.laugh.some(l => t > l.t && t < l.t + 1.2) ? 1 : 0)); if (t > sp('TOM').t0 - .4) await cast([[C.tommy, 'TOM', to]], cam, t); };
S.classroom = async t => {
  const cam = camOf(t, { z: 1.1, x: 1280, y: 760 }); plate('lab1939', cam); apply(cam);
  ctx.strokeStyle = 'rgba(240,240,230,.85)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(600, 640); ctx.lineTo(1000, 640); ctx.lineTo(930, 710); ctx.lineTo(670, 710); ctx.closePath(); ctx.moveTo(800, 640); ctx.lineTo(800, 500); ctx.lineTo(910, 620); ctx.lineTo(800, 620); ctx.stroke(); txt('= ?', 1080, 600, 60, 'rgba(240,240,230,.85)', { font: 'Georgia, serif', w: 400 });
  const po = { x: 700, y: 1440, s: 2.15, view: 'threequarter', dir: 1, pose: POSE.point, expr: 'smug' }, lo = { x: 1650, y: 1440, s: 2.0, view: 'threequarter', dir: -1, expr: 'deadpan' }, to = { x: 2150, y: 1440, s: 2.0, view: 'threequarter', dir: -1, expr: 'neutral' };
  await cast([[X.prof, 'PROF', po], [C.lisa, 'LISA', lo], [C.tommy, 'TOM', to]], cam, t); apply(cam); desk(1440, 1180, 420, 280, '#8a6a3a', '#5a4020'); desk(1950, 1180, 420, 280, '#8a6a3a', '#5a4020'); emo('📚', 1560, 1140, 70); emo('🍎', 2050, 1140, 60);
  const b = seg(t, ev('bell'), ev('bell') + 1.2); if (b > 0 && b < 1) { screen(); emo('🔔', W * .5, H * .3, 160, Math.sin(t * 50) * .3); } };
S.conspiracy = async t => {
  const st = ev('dundun'), zk = io(seg(t, st, st + .3)) * (1 - io(seg(t, st + 1.6, st + 2.2)));
  const cam = camOf(t, { z: 1.08 + .7 * zk, x: lerp(1280, 1750, zk), y: lerp(760, 560, zk) }); plate('corkboard', cam); apply(cam);
  const P = [[650, 420, '🧙', 'WIZARD?'], [1050, 330, '🤖', 'ROBOT?'], [1450, 460, '🎩', 'HAT GUY'], [900, 760, '❓', '???'], [1750, 560, '🐦', 'PIGEONS']];
  P.forEach(([x, y, e, l], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate((i % 2 ? 1 : -1) * .06); rr(-110, -130, 220, 260, 4, '#f4f1ea', '#231A24', 4); ctx.fillStyle = '#c8d4e0'; ctx.fillRect(-90, -110, 180, 170); emo(e, 0, -25, 120); txt(l, 0, 95, 30, '#231A24'); ctx.restore(); ctx.fillStyle = '#e23a3a'; ctx.beginPath(); ctx.arc(x, y - 120, 12, 0, 7); ctx.fill(); });
  ctx.strokeStyle = '#d02020'; ctx.lineWidth = 6; const link = (a, b, k = 1) => { ctx.beginPath(); ctx.moveTo(P[a][0], P[a][1] - 120); ctx.lineTo(lerp(P[a][0], P[b][0], k), lerp(P[a][1], P[b][1], k) - 120); ctx.stroke(); };
  link(0, 1); link(1, 2); link(2, 3); link(3, 0); const sk = seg(t, ev('string'), ev('string') + .6); if (sk > 0) { link(0, 4, sk); link(1, 4, sk); link(3, 4, sk); }
  const co = { x: 1850, y: 1500, s: 2.3, view: 'threequarter', dir: -1, pose: POSE.point, expr: 'shock', seed: 12 }; if (zk < .5) { await cast([[X.con, 'CON', co]], cam, t); apply(cam); const f = head(X.con, co, -10); ctx.fillStyle = lg(f.x - 60, 0, f.x + 60, 0, ['#c8c8d0', '#f4f4f8', '#a8a8b0']); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(f.x - f.sc * 11, f.y + f.sc * 2); ctx.lineTo(f.x + f.sc * 11, f.y + f.sc * 2); ctx.lineTo(f.x + f.sc * 2, f.y - f.sc * 16); ctx.closePath(); ctx.fill(); ctx.stroke(); } };
// ---------- film ----------
const SH = [{ a: 0, b: DUR, async draw(t) {
  screen(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  await S[G.set](Math.max(t, OPEN - .3)); sfxFx(t); slams(t); bug(t); intro(t); outro(t); return {}; } }];
FILM.setup(SH);
})();
