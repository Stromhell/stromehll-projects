// DumDown Doctor Doom film engine: flat storybook look (sets drawn in code, FLAT characters, drifting particles,
// lowercase name labels with arrows), DumDown cinematic camera (constant drift + push-in, whip pans between places),
// pop captions and trading cards. window.ACT = { timing, shots:[...] } -> window.FILM for render.cjs.
(function () {
const F = window.FLAT, C = window.CAST, SETS = window.SETS, PR = window.PROPS;
const W = 1920, H = 1080, PW = 2560, PH = 1440, FPS = 24, LEAD = window.LEAD ?? .6;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, u) => a + (b - a) * u;
const io = u => { u = clamp(u); return u * u * (3 - 2 * u); }, seg = (t, a, b) => clamp((t - a) / (b - a));
const outBack = u => { u = clamp(u); const k = 1.70158; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
const val = (v, u) => Array.isArray(v) ? lerp(v[0], v[1], u) : v;
function rng(s) { s = (s ^ 0x9e3779b9) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const PLATES = {};
function plateOf(name) { if (!PLATES[name]) { const c = document.createElement('canvas'); c.width = PW; c.height = PH; const x = c.getContext('2d'); if (!SETS[name]) { console.error('missing set', name); x.fillStyle = '#f0f'; x.fillRect(0, 0, PW, PH); } else SETS[name](x); PLATES[name] = c; } return PLATES[name]; }
// camera: z zoom (1 = whole plate), x,y = plate point at screen centre
function camTf(cam) { const z = cam.z, sc = z * W / PW; const cx = clamp(cam.x, PW / 2 / z, PW - PW / 2 / z), cy = clamp(cam.y, PH / 2 / z, PH - PH / 2 / z); return { sc, tx: W / 2 - cx * sc + (cam.sx || 0), ty: H / 2 - cy * sc + (cam.sy || 0), rot: cam.rot || 0 }; }
function apply(cam, par = 1) { const m = camTf(cam); ctx.setTransform(1, 0, 0, 1, 0, 0); if (m.rot) { ctx.translate(W / 2, H / 2); ctx.rotate(m.rot * Math.PI / 180); ctx.translate(-W / 2, -H / 2); }
  const cl = (sc, tx, ty) => [sc, clamp(tx, W - PW * sc, 0), clamp(ty, H - PH * sc, 0)];
  if (par === 1) { const [sc, tx, ty] = plateClamp ? cl(m.sc, m.tx, m.ty) : [m.sc, m.tx, m.ty]; ctx.transform(sc, 0, 0, sc, tx, ty); } else { const sc = m.sc * par + (W / PW) * (1 - par); const cx = (W / 2 - m.tx) / m.sc, cy = (H / 2 - m.ty) / m.sc; const [s2, tx, ty] = cl(sc, W / 2 - (PW / 2 + (cx - PW / 2) * par) * sc, H / 2 - (PH / 2 + (cy - PH / 2) * par) * sc); ctx.transform(s2, 0, 0, s2, tx, ty); } }
let plateClamp = false;
const screen = () => ctx.setTransform(1, 0, 0, 1, 0, 0);
function worldPt(cam, x, y) { const m = camTf(cam); return [x * m.sc + m.tx, y * m.sc + m.ty]; }
// ---------- particles (screen space, drift with the camera a little) ----------
const PT = Array.from({ length: 160 }, (_, i) => { const R = rng(i * 13 + 5); return [R(), R(), R(), R()]; });
function particles(kind, t, cam, dens = 1) { screen(); const m = camTf(cam); const ox = m.tx * .15, oy = m.ty * .08;
  const n = Math.min(PT.length, Math.round(PT.length * dens * ({ snow: .9, dust: .35, sparks: .5, embers: .45, fireflies: .3, stars: .8, leaves: .12, magic: .5, ash: .5, bubbles: .25, confetti: .5, rain: .9 }[kind] || .4)));
  for (let i = 0; i < n; i++) { const [a, b, c, d] = PT[i]; let x, y, r, col, al = 1;
    if (kind === 'snow') { y = ((b * H + t * (40 + c * 70)) % (H + 40)) - 20; x = ((a * W + Math.sin(t * .8 + d * 6) * 30 + ox) % W + W) % W; r = 2 + c * 5; col = '255,255,255'; al = .55 + d * .4; }
    else if (kind === 'dust') { y = ((b * H - t * (6 + c * 10)) % H + H) % H; x = ((a * W + Math.sin(t * .4 + d * 6) * 40 + ox) % W + W) % W; r = 1.5 + c * 3; col = '255,250,230'; al = (.25 + .35 * Math.sin(t * 1.5 + d * 9) ** 2); }
    else if (kind === 'sparks' || kind === 'embers') { const sp = kind === 'sparks' ? 140 : 55; y = (((b * H - t * (sp + c * sp)) % (H + 60)) + H + 60) % (H + 60) - 30; x = ((a * W + Math.sin(t * 2 + d * 6) * 25 + ox) % W + W) % W; r = kind === 'sparks' ? 2 + c * 3 : 2.5 + c * 4; col = c > .5 ? '255,200,90' : '255,140,50'; al = .5 + .5 * Math.sin(t * 6 + d * 9) ** 2; }
    else if (kind === 'fireflies') { x = ((a * W + Math.sin(t * .5 + d * 6) * 60 + ox) % W + W) % W; y = H * (.35 + b * .6) + Math.cos(t * .7 + c * 6) * 30; r = 3 + c * 3; col = '255,240,140'; al = .25 + .75 * Math.max(0, Math.sin(t * 1.4 + d * 12)); }
    else if (kind === 'stars') { x = ((a * W + ox * .5) % W + W) % W; y = ((b * H + oy * .5) % H + H) % H; r = 1 + c * 2.5; col = '255,255,240'; al = .35 + .65 * Math.sin(t * 2 + d * 20) ** 2; if (c > .93) { ctx.globalAlpha = al; ctx.fillStyle = `rgba(${col},1)`; star4(x, y, 9 + c * 6); ctx.globalAlpha = 1; continue; } }
    else if (kind === 'leaves') { y = ((b * H + t * (50 + c * 40)) % (H + 60)) - 30; x = ((a * W + Math.sin(t * 1.2 + d * 6) * 60 + ox) % W + W) % W; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + d * 6); ctx.fillStyle = c > .5 ? '#e08a3a' : '#d9a23a'; ctx.beginPath(); ctx.ellipse(0, 0, 13, 6, 0, 0, 7); ctx.fill(); ctx.restore(); continue; }
    else if (kind === 'magic') { const k = (t * .4 + d) % 1; x = W * (.2 + a * .6) + Math.sin(t + c * 6) * 40; y = H * (.9 - k * .8); r = 2 + c * 4; col = c > .5 ? '140,255,170' : '200,255,220'; al = Math.sin(k * Math.PI); }
    else if (kind === 'ash') { y = ((b * H + t * (20 + c * 25)) % (H + 40)) - 20; x = ((a * W + Math.sin(t * .6 + d * 6) * 50 + ox) % W + W) % W; r = 2 + c * 3; col = '120,110,110'; al = .5; }
    else if (kind === 'bubbles') { y = (((b * H - t * (30 + c * 30)) % (H + 60)) + H + 60) % (H + 60) - 30; x = ((a * W + Math.sin(t + d * 6) * 30) % W + W) % W; ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 6 + c * 14, 0, 7); ctx.stroke(); continue; }
    else if (kind === 'confetti') { y = ((b * H + t * (120 + c * 80)) % (H + 40)) - 20; x = ((a * W + Math.sin(t * 2 + d * 6) * 40) % W + W) % W; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + d * 6); ctx.fillStyle = ['#ffd23d', '#e23a3a', '#2fc6ff', '#2fb66a'][i % 4]; ctx.fillRect(-7, -4, 14, 8); ctx.restore(); continue; }
    else if (kind === 'rain') { const yy = ((b * H + t * 1500 * (.7 + c * .5)) % (H + 100)) - 50; ctx.strokeStyle = `rgba(200,215,255,${.25 + c * .3})`; ctx.lineWidth = 1.5 + c; ctx.beginPath(); ctx.moveTo(a * W, yy); ctx.lineTo(a * W - 8, yy + 40); ctx.stroke(); continue; }
    ctx.globalAlpha = al; ctx.fillStyle = `rgba(${col},1)`; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    if (kind === 'fireflies' || kind === 'magic' || kind === 'embers') { const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5); g.addColorStop(0, `rgba(${col},.35)`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r * 5, y - r * 5, r * 10, r * 10); }
    ctx.globalAlpha = 1; } }
function star4(x, y, r) { ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); }
// ---------- overlays ----------
function label(text, sx, sy, lt, a, dur, side = 1) { // lowercase name + curved arrow to (sx,sy) screen point (head top)
  if (lt < a || lt > a + dur) return; const k = io(seg(lt, a, a + .35)) * (1 - io(seg(lt, a + dur - .35, a + dur))); screen(); ctx.save(); ctx.globalAlpha = k;
  const tx = clamp(sx + side * 210, 140, W - 140), ty = clamp(sy - 120, 80, H - 120);
  ctx.font = '600 64px Fredoka, Nunito, Inter'; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(30,20,40,.28)'; ctx.lineWidth = 10; ctx.strokeText(text, tx, ty); ctx.fillStyle = '#fff'; ctx.fillText(text, tx, ty);
  // arrow: from under the text to near the target, drawn on progressively
  const p = io(seg(lt, a + .15, a + .6)); const x0 = tx - side * 40, y0 = ty + 22, x1 = sx + side * 40, y1 = sy - 10; const cx = x0 + (x1 - x0) * .1, cy = y1 + 10;
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); const N = 20; for (let i = 0; i <= N * p; i++) { const u = i / N, bx = (1 - u) ** 2 * x0 + 2 * (1 - u) * u * cx + u * u * x1, by = (1 - u) ** 2 * y0 + 2 * (1 - u) * u * cy + u * u * y1; i ? ctx.lineTo(bx, by) : ctx.moveTo(bx, by); } ctx.stroke();
  if (p > .95) { const ang = Math.atan2(y1 - cy, x1 - cx); ctx.beginPath(); ctx.moveTo(x1 - Math.cos(ang - .5) * 30, y1 - Math.sin(ang - .5) * 30); ctx.lineTo(x1, y1); ctx.lineTo(x1 - Math.cos(ang + .5) * 30, y1 - Math.sin(ang + .5) * 30); ctx.stroke(); }
  ctx.restore(); }
function pop(text, lt, a, dur = 2.6, o = {}) { if (lt < a || lt > a + dur) return; const k = outBack(seg(lt, a, a + .35)), ko = io(seg(lt, a + dur - .3, a + dur)); screen(); ctx.save();
  const x = o.x ?? W - 430, y = o.y ?? 150; ctx.translate(x, y); ctx.rotate(-.04 + Math.sin(lt * 3) * .012); ctx.scale(k * (1 - ko), k * (1 - ko)); ctx.font = '700 40px Fredoka, Inter';
  const lines = []; let line = ''; for (const w of text.split(' ')) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > 620 && line) { lines.push(line); line = w; } else line = t; } lines.push(line);
  const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 64, bh = lines.length * 50 + 40; ctx.fillStyle = 'rgba(30,20,40,.25)'; F.rr(ctx, -bw / 2 + 8, -bh / 2 + 10, bw, bh, 26); ctx.fill();
  ctx.fillStyle = '#ffd23d'; F.rr(ctx, -bw / 2, -bh / 2, bw, bh, 26); ctx.fill(); ctx.fillStyle = '#2a1d2e'; ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, 0, -bh / 2 + 62 + i * 50)); ctx.restore(); }
function card(spec, name, type, move, weak, lt, a, side = 1, dur = 4.2) { // trading card slides in from the side
  if (lt < a || lt > a + dur) return; const k = outBack(seg(lt, a, a + .45)), ko = io(seg(lt, a + dur - .35, a + dur)); screen(); ctx.save();
  const CW = 400, CH = 560; const x = side > 0 ? W - 60 - CW / 2 + (1 - k + ko) * 600 : 60 + CW / 2 - (1 - k + ko) * 600, y = H / 2 + 10; ctx.translate(x, y); ctx.rotate((side > 0 ? 1 : -1) * (.04 + Math.sin(lt * 2) * .01));
  ctx.fillStyle = 'rgba(20,10,30,.3)'; F.rr(ctx, -CW / 2 + 10, -CH / 2 + 14, CW, CH, 28); ctx.fill();
  const gg = ctx.createLinearGradient(-CW / 2, -CH / 2, CW / 2, CH / 2); gg.addColorStop(0, '#fff0a0'); gg.addColorStop(.5, '#ffd23d'); gg.addColorStop(1, '#e09a20'); ctx.fillStyle = gg; F.rr(ctx, -CW / 2, -CH / 2, CW, CH, 28); ctx.fill();
  ctx.fillStyle = '#2a3990'; F.rr(ctx, -CW / 2 + 16, -CH / 2 + 16, CW - 32, CH - 32, 18); ctx.fill();
  ctx.fillStyle = '#9fd4f2'; F.rr(ctx, -CW / 2 + 32, -CH / 2 + 82, CW - 64, 230, 14); ctx.fill();
  ctx.save(); ctx.beginPath(); F.rr(ctx, -CW / 2 + 32, -CH / 2 + 82, CW - 64, 230, 14); ctx.clip(); if (spec) F.draw(ctx, spec, { x: 0, y: -CH / 2 + 82 + 230 + 250, s: .5, t: lt, pose: 'stand', expr: spec.expr === 'neutral' ? 'neutral' : 'happy', noShadow: true }); ctx.restore();
  ctx.fillStyle = '#fff6dc'; ctx.textAlign = 'left'; ctx.font = '700 38px Fredoka, Inter'; ctx.fillText(name, -CW / 2 + 34, -CH / 2 + 62);
  ctx.font = '600 24px Fredoka, Inter'; ctx.fillStyle = '#ffd23d'; ctx.fillText('TYPE: ' + type, -CW / 2 + 34, -CH / 2 + 350);
  ctx.fillStyle = '#fff6dc'; ctx.fillText('MOVE: ' + move, -CW / 2 + 34, -CH / 2 + 395); ctx.fillStyle = '#ff9a9a'; ctx.fillText('WEAKNESS: ' + weak, -CW / 2 + 34, -CH / 2 + 440);
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '600 18px Fredoka, Inter'; ctx.fillText('DUMDOWN COLLECTOR SERIES', -CW / 2 + 34, CH / 2 - 40); ctx.restore(); }
function bigText(text, lt, a, b, col = '#fff') { const al = io(seg(lt, a, a + .3)) * (1 - io(seg(lt, b - .3, b))); if (al <= 0) return; screen(); ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.font = '700 96px Fredoka, Inter'; ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(30,20,40,.55)'; ctx.strokeText(text, W / 2, H - 90); ctx.fillStyle = col; ctx.fillText(text, W / 2, H - 90); ctx.globalAlpha = 1; }
function white(a, col = '255,255,255') { if (a <= 0) return; screen(); ctx.fillStyle = `rgba(${col},${a})`; ctx.fillRect(0, 0, W, H); }
function glow(x, y, r, col, a) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.restore(); }
function finish(fade) { screen(); const v = ctx.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, W * .72); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(10,5,20,.32)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H); if (fade < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - fade})`; ctx.fillRect(0, 0, W, H); } }
window.E = { F, C, W, H, PW, PH, ctx, clamp, lerp, io, seg, val, apply, screen, worldPt, particles, label, pop, card, bigText, white, glow, rng, outBack, plateOf };
// ---------- shot builder ----------
function build(ACT) {
  const T = ACT.timing, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.0);
  const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
  const SH = ACT.shots.map(s => ({ s, a: s.t0 ?? at(s.p, s.f || 0) }));
  SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
  return SH.map(({ s, a, b }, si) => ({ a, b, s, async draw(tt, lt, u) {
    const d = b - a, ue = s.ease === 'lin' ? u : io(u), cm = s.cam || {};
    const zr = [].concat(cm.z ?? 1), zk = !s.still && (zr.length < 2 || Math.abs(zr[1] - zr[0]) < .1) ? 1 + .06 * ue : 1;
    const CO = [];
    const charO = (c) => { const rngx = Array.isArray(c.x) ? Math.abs(c.x[1] - c.x[0]) : 0; const t0 = c.t0 || 0, t1 = c.t1 ?? d; const wEnd = c.walkT ? t0 + c.walkT : (rngx > 20 ? t0 + Math.max(.8, rngx / (c.speed || 260)) : t1);
      const cu = clamp((lt - t0) / (wEnd - t0)); const cue = c.lin ? cu : io(cu); const x = val(c.x, cue), y = val(c.y, cue); const moving = rngx > 20 && cu > 0 && cu < 1;
      const talk = c.talk === true || (Array.isArray(c.talk) && c.talk.some(([p, q]) => lt >= p && lt <= q));
      return { x, y, s: val(c.s ?? 1, cue), view: c.view || 'front', dir: c.dir || 1, pose: typeof c.pose === 'function' ? c.pose(lt) : c.pose, expr: c.expr, talk, t: lt + (c.ph || 0), ph: c.ph || 0, look: typeof c.look === 'function' ? c.look(lt) : c.look, tilt: c.tilt, lean: c.lean, rot: c.rot == null ? 0 : val(c.rot, cue), bob: typeof c.bob === 'function' ? c.bob(lt) : c.bob, walk: moving || c.walking ? (Math.abs(x) / (210 * (c.s ?? 1))) : null, glow: c.glow, wind: c.wind, noShadow: c.noShadow }; };
    (s.chars || []).forEach((c, i) => { if (C[c.c]) CO[i] = [C[c.c], charO(c)]; else console.error('missing cast', c.c); });
    const cam = { z: val(cm.z ?? 1, ue) * zk, x: val(cm.x ?? PW / 2, ue), y: val(cm.y ?? PH / 2, ue), rot: val(cm.rot ?? 0, ue) };
    if (cm.on != null && CO[cm.on]) { const [sp, o] = CO[cm.on]; const ht = F.headTop(sp, o); cam.x = ht.x + val(cm.ox ?? 0, ue); cam.y = ht.y + val(cm.oy ?? F.height(sp, o.s) * .15, ue); }
    if (!s.still) { const dv = s.drift ?? (si % 2 ? -1 : 1); if (!Array.isArray(cm.x)) cam.x += dv * lerp(-90, 90, ue) / cam.z * (cm.on == null ? 1 : .7); cam.sy = Math.sin(lt * 1.1 + si) * 2.5; }
    let whip = 0; const prevS = si ? SH[si - 1].s : null, nextS = SH[si + 1] ? SH[si + 1].s : null, WD = .2;
    if (prevS && prevS.set !== s.set && !s.noWhip && lt < WD) whip = (si % 2 ? -1 : 1) * (1 - io(lt / WD));
    if (nextS && nextS.set !== s.set && !nextS.noWhip && d - lt < WD) whip = ((si + 1) % 2 ? 1 : -1) * io(1 - (d - lt) / WD);
    if (whip) cam.sx = (cam.sx || 0) + whip * 160;
    if (cm.shake) { const k = typeof cm.shake === 'number' ? cm.shake : 10; cam.sx = (cam.sx || 0) + Math.sin(lt * 41) * k; cam.sy += Math.cos(lt * 33) * k * .7; }
    if (s.shakeAt) for (const [t0, k] of s.shakeAt) if (lt > t0 && lt < t0 + .5) { const e = 1 - (lt - t0) / .5; cam.sx = (cam.sx || 0) + Math.sin(lt * 50) * k * e; cam.sy += Math.cos(lt * 41) * k * e; }
    const blurPx = Math.abs(whip) * 18;
    screen(); ctx.fillStyle = s.bg || '#000'; ctx.fillRect(0, 0, W, H);
    if (blurPx) ctx.filter = `blur(${blurPx.toFixed(1)}px)`;
    if (s.set) { plateClamp = true; apply(cam, s.par ?? .9); plateClamp = false; ctx.drawImage(plateOf(s.set), 0, 0); }
    if (s.pre) { apply(cam); s.pre(ctx, lt, u, cam, d); }
    const drawProps = layer => { for (const p of (s.props || [])) { const L = p.layer || (p.on != null ? 'front' : 'back'); if (L !== layer || lt < (p.t0 || 0) || lt > (p.t1 ?? 1e9)) continue; let x = val(p.x, ue), y = val(p.y, ue);
      if (p.on != null && CO[p.on]) { const [sp, o] = CO[p.on]; const w = F.wrist(sp, o, p.side || 1); x = w.x + (p.dx || 0) * w.s; y = w.y + (p.dy || 0) * w.s; }
      apply(cam); ctx.save(); if (blurPx) ctx.filter = `blur(${blurPx.toFixed(1)}px)`; ctx.translate(x, y); if (p.rot != null) ctx.rotate(val(p.rot, ue) * Math.PI / 180); const sc = val(p.s ?? 1, ue); ctx.scale(sc * (p.flip ? -1 : 1), sc); if (!PR[p.k]) console.error('missing prop', p.k); else PR[p.k](ctx, lt, p.kk == null ? 1 : val(p.kk, typeof p.kk === 'object' && p.kt ? clamp((lt - p.kt[0]) / (p.kt[1] - p.kt[0])) : ue), p); ctx.restore(); } };
    drawProps('back');
    const order = (s.chars || []).map((c, i) => i).sort((i, j) => ((s.chars[i].zz ?? val(s.chars[i].y, 1)) - (s.chars[j].zz ?? val(s.chars[j].y, 1))));
    for (const i of order) { const c = s.chars[i]; if (!CO[i] || lt < (c.t0 || 0) || lt > (c.t1 ?? 1e9)) continue; apply(cam); ctx.save(); if (blurPx) ctx.filter = `blur(${blurPx.toFixed(1)}px)`; if (c.alpha != null) ctx.globalAlpha = typeof c.alpha === 'function' ? c.alpha(lt) : c.alpha; F.draw(ctx, CO[i][0], CO[i][1]); ctx.restore(); }
    drawProps('front');
    ctx.filter = 'none';
    if (s.post) { apply(cam); s.post(ctx, lt, u, cam, d); }
    for (const f of [].concat(s.fx || [])) { const [k, dn] = Array.isArray(f) ? f : [f, 1]; particles(k, tt, cam, dn); }
    if (s.flash) for (const t0 of [].concat(s.flash)) white(1 - seg(lt, t0, t0 + .5) - (lt < t0 ? 1 : 0));
    if (s.grade) { screen(); ctx.globalCompositeOperation = s.grade[2] || 'soft-light'; ctx.globalAlpha = s.grade[1]; ctx.fillStyle = s.grade[0]; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
    for (const l of (s.labels || [])) { let sx, sy; if (l.c != null && CO[l.c]) { const [sp, o] = CO[l.c]; const ht = F.headTop(sp, o); [sx, sy] = worldPt(cam, ht.x, ht.y); } else [sx, sy] = worldPt(cam, l.x, l.y); label(l.t, sx, sy, lt, l.at ?? .5, l.dur ?? 3.2, l.side ?? (sx > W / 2 ? -1 : 1)); }
    for (const cd of (s.cards || [])) card(C[cd.c], cd.name, cd.type, cd.move, cd.weak, lt, cd.at ?? .6, cd.side ?? 1, cd.dur ?? 4.2);
    for (const p of (s.pops || [])) pop(p.t, lt, p.at, p.dur || 2.6, p);
    if (s.big) bigText(s.big[0], lt, s.big[1], s.big[2], s.big[3]);
    if (s.bug) { screen(); ctx.save(); ctx.font = '700 30px Fredoka, Inter'; const w = ctx.measureText(s.bug).width + 80; ctx.fillStyle = 'rgba(20,10,30,.55)'; F.rr(ctx, 40, 36, w, 54, 27); ctx.fill(); ctx.fillStyle = Math.sin(tt * 5) > 0 ? '#ff3b3b' : '#a01010'; ctx.beginPath(); ctx.arc(70, 63, 10, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.fillText(s.bug, 92, 74); ctx.restore(); }
    if (s.gagTitle && tt < 1.05) { screen(); const k = outBack(seg(tt, 0, .3)), ko = io(seg(tt, .8, 1.05)); ctx.save(); ctx.fillStyle = `rgba(255,210,61,${1 - ko})`; ctx.fillRect(0, 0, W, H); ctx.translate(W / 2, H / 2); ctx.rotate(-.03); ctx.scale(k * (1 - ko * .3), k * (1 - ko * .3)); ctx.globalAlpha = 1 - ko; ctx.fillStyle = '#2a1d2e'; ctx.textAlign = 'center'; ctx.font = '700 104px Fredoka, Inter'; ctx.fillText(s.gagTitle, 0, 30); ctx.font = '600 40px Fredoka, Inter'; ctx.fillText('meanwhile, on doom tv...', 0, -80); ctx.restore(); }
    return { fade: (s.fadeIn ? io(lt / (s.fadeIn === true ? .5 : s.fadeIn)) : 1) * (s.fadeOut ? 1 - io(seg(lt, d - (s.fadeOut === true ? .7 : s.fadeOut), d)) : 1) };
  } }));
}
window.FILM = {};
FILM.load = async () => { await document.fonts.load('600 64px Fredoka'); await document.fonts.load('700 40px Fredoka'); for (const s of window.ACT.shots) if (s.set) plateOf(s.set); };
const SH = build(window.ACT);
FILM.dur = SH[SH.length - 1].b; FILM.frames = Math.round(FILM.dur * FPS); FILM.shots = SH.map(x => ({ a: x.a, b: x.b, set: x.s.set, p: x.s.p, sfx: x.s.sfx || [], mood: x.s.mood }));
FILM.frame = async (f) => { const t = f / FPS; const sh = SH.find(x => t >= x.a && t < x.b) || SH[SH.length - 1]; const lt = t - sh.a, u = lt / (sh.b - sh.a); screen(); ctx.filter = 'none'; ctx.globalAlpha = 1; const r = (await sh.draw(t, lt, u)) || {}; finish(r.fade ?? 1); return cv.toDataURL('image/jpeg', .92); };
})();
