// Data-driven shot interpreter, v2 "cine" (Agatha rework after Pushpam's 15 Nov 20:03 notes).
// window.ACT = { timing, shots:[...] } -> FILM.setup(SH)
// v2 adds: a director pass (operator camera moves on every shot, coverage between same-room shots, whip pans between
// rooms), handheld drift, punch-ins on pops, depth of field, per-plate real-world scale (PLATE_META), listeners that
// face the speaker, the acting layer (acting.js), props held IN the hand (body -> prop -> arms+head layering, palm
// anchors, grip hands) and instruments played on the body with 2-bone IK hands.
(function () {
const E = window.E, { WT, D, C, W, H, BAR, IM, ctx, clamp, lerp, io, out3, seg, apply, plate, chars, screen, grade, rainFx, actPose, exprOf } = E;
const FX = window.FX, P = window.PROPS;
const META = window.PLATE_META || {};
const LEAD = window.LEAD ?? .6;
const val = (v, u) => Array.isArray(v) ? lerp(v[0], v[1], u) : v;
const v0 = v => Array.isArray(v) ? v[0] : v, v1 = v => Array.isArray(v) ? v[1] : v;
const outBack = u => { u = clamp(u); const k = 1.70158; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
// MotionMaxx-measured eases: glide (power 1.7 ease-out), operator = two pushes (fast first push, drift, second push)
const glide = u => 1 - Math.pow(1 - clamp(u), 1.7);
const op = u => .62 * glide(seg(u, 0, .42)) + .38 * io(seg(u, .48, 1));
const hsh = n => { let x = (n * 2654435761) >>> 0; x ^= x >>> 13; x = Math.imul(x, 0x5bd1e995) >>> 0; return (x ^ (x >>> 15)) >>> 0; };
const noise = (t, s) => Math.sin(t * .63 + s) * .6 + Math.sin(t * 1.37 + s * 2.1) * .3 + Math.sin(t * 2.9 + s * .7) * .1;
function pop(text, lt, a, dur = 2.6, o = {}) { if (lt < a || lt > a + dur) return; const k = outBack(seg(lt, a, a + .35)), ko = io(seg(lt, a + dur - .3, a + dur)); screen(); ctx.save();
  const x = o.x ?? W - 470, y = o.y ?? BAR + 120; ctx.translate(x, y); ctx.rotate(-.05 + Math.sin(lt * 3) * .015); ctx.scale(k * (1 - ko), k * (1 - ko)); ctx.font = '800 40px Inter';
  const lines = []; let line = ''; for (const w of text.split(' ')) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > 640 && line) { lines.push(line); line = w; } else line = t; } lines.push(line);
  const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 60, bh = lines.length * 50 + 36; ctx.fillStyle = '#231A24'; ctx.fillRect(-bw / 2 + 10, -bh / 2 + 10, bw, bh); ctx.fillStyle = '#ffd23d'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
  ctx.fillStyle = '#231A24'; ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, 0, -bh / 2 + 62 + i * 50)); ctx.restore(); }
function bigText(text, lt, a, b, col = '#f4ecd8', bx = null, by = null) { const al = io(seg(lt, a, a + .3)) * (1 - io(seg(lt, b - .3, b))); if (al <= 0) return; if (by == null) { window.POSTBAR = () => bigText(text, lt, a, b, col, bx, -1); return; } if (by === -1) by = null; screen(); ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.font = '900 92px "Inter Display"'; ctx.letterSpacing = '6px'; ctx.lineWidth = 14; ctx.strokeStyle = '#231A24'; ctx.strokeText(text, bx ?? W / 2, by ?? H - 36); ctx.fillStyle = col; ctx.fillText(text, bx ?? W / 2, by ?? H - 36); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; }
window.LK = { pop, bigText };

// held-prop table: palm anchor offset (prop units), real-world scale per character scale unit, grip hand
const HOLD = { wine: { oy: 14, k: .62, grip: 'grab' }, phone: { oy: 8, k: .42, grip: 'grab' }, libcard: { oy: 30, k: .34, grip: 'grab', rot: -.1 }, broom: { oy: 0, k: .9, grip: 'fist' }, tarot: { oy: 20, k: .4, grip: 'grab' },
  antidote: { oy: 10, k: .5, grip: 'grab' }, bottle: { oy: 20, k: .6, grip: 'grab' }, flowers: { oy: 10, k: .6, grip: 'fist' }, vinyl: { oy: 0, k: .5, grip: 'grab' }, mic: { oy: 0, k: .5, grip: 'fist' } };
const INSTR = { guitar: 1, cymbals: 1 };
const onProp = (o, ang, g, lx, ly) => [o.x + (Math.cos(ang) * lx - Math.sin(ang) * ly) * g, o.y + (Math.sin(ang) * lx + Math.cos(ang) * ly) * g];

function build(ACT) {
  const T = ACT.timing, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.2);
  const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
  const SH = ACT.shots.map((s, i) => ({ s, a: s.t0 ?? at(s.p, s.f || 0) }));
  SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
  const actSeed = (window.ACT_NO ?? 0) * 101;
  // ---------- director pass: a motivated camera move for every shot ----------
  SH.forEach((X, i) => { const s = X.s, cm = s.cam || {}, d = X.b - X.a, ch = s.chars || [];
    const talker = ch.find(c => c.talk) || ch.find(c => c.pose) || ch[0];
    const fx = talker ? v0(talker.x) : 1280, fy = talker ? v0(talker.y) - 330 * v0(talker.s ?? 1.4) : 720;
    let z0 = v0(cm.z ?? 1), z1 = v1(cm.z ?? 1), x0 = v0(cm.x ?? 1280), x1 = v1(cm.x ?? 1280), y0 = v0(cm.y ?? 720), y1 = v1(cm.y ?? 720);
    const prev = SH[i - 1]?.s; const sameRoom = prev && prev.plate && prev.plate === s.plate;
    const h = hsh(actSeed + i * 7 + 3);
    if (!s.lockCam && !(s.cards || []).length && talker && !ch.some(c => Array.isArray(c.x))) {
      // coverage: a second shot in the same room cuts to a tighter (or wider) framing on the speaker
      if (sameRoom && Math.abs(z0 - v0(prev.cam?.z ?? 1)) < .18 && d > 2) { const tight = z0 < 1.45; const k = tight ? 1.3 : .84; z0 *= k; z1 *= k; x0 = lerp(x0, fx, tight ? .55 : .2); x1 = lerp(x1, fx, tight ? .55 : .2); y0 = lerp(y0, fy + 150, tight ? .45 : .1); y1 = lerp(y1, fy + 150, tight ? .45 : .1); }
      const still = Math.abs(z1 / z0 - 1) < .05 && Math.abs(x1 - x0) < 40 && Math.abs(y1 - y0) < 40;
      if (still) { const m = h % 4, mag = clamp(d / 6, .55, 1.2);
        if (m === 0) { z1 = z0 * (1 + .16 * mag); x1 = lerp(x0, fx, .35); y1 = lerp(y0, fy + 150, .3); }
        else if (m === 1) { const dx = (h & 8 ? 1 : -1) * 80 * mag / z0; x0 -= dx; x1 += dx; z1 = z0 * 1.05; }
        else if (m === 2) { const zz = z0 * (1 + .15 * mag); x1 = x0; y1 = y0; x0 = lerp(x0, fx, .35); y0 = lerp(y0, fy + 150, .3); z1 = z0; z0 = zz; }
        else { z1 = z0 * (1 + .1 * mag); x1 = lerp(x0, fx, .25) + (h & 16 ? 50 : -50); X.arc = (h & 32 ? 1 : -1) * .6; } } }
    X.cam = { z0, z1, x0, x1, y0, y1 };
    if (i > 0 && !s.fadeIn && !s.noWhip && prev && prev.plate !== s.plate && d > 1.4 && (X.a - SH[i - 1].a) > 1.4 && h % 3 !== 0) X.whip = (h & 64) ? 1 : -1;
  });
  return SH.map((X, idx) => { const { s, a, b } = X; return { a, b, whip: X.whip, async draw(tt, lt, u) {
    const d = b - a, ue = s.ease === 'lin' ? u : op(u), cm = s.cam || {}, K = X.cam, m = META[s.plate] || {};
    const cam = { z: Math.exp(lerp(Math.log(K.z0), Math.log(K.z1), ue)), x: lerp(K.x0, K.x1, ue), y: lerp(K.y0, K.y1, ue), rot: val(cm.rot ?? 0, ue) + (X.arc ? X.arc * (1 - 2 * ue) : 0) };
    const hits = [...(s.pops || []).map(p => p.at), ...(s.big ? [s.big[1]] : []), ...(s.cards || []).map(c => c.at ?? .4)];
    for (const h of hits) { const dt = lt - h; if (dt >= 0) cam.z *= 1 + .065 * (dt < 1 / 24 ? 1 : 1 - .45 * out3((dt - 1 / 24) / .5)); }
    const cam0y = cam.y;
    if (!s.noHeadFit) for (const c of (s.chars || [])) { const ch = (C[c.c] || {}).acc || {}, hs = ch.hornStyle, hx = ch.horns ? (hs === 'huge' ? 230 : hs === 'small' ? 70 : hs === 'broken' ? 90 : 150) : 0;
      const sc = val(c.s ?? 1.4, ue), cy = val(c.y, ue), lim = (165 - 540) / (cam.z * .75); let need = cy - (410 + hx) * sc - lim;
      if (cam0y - need > .3 * 720 / cam.z) need = cy - 410 * sc - lim;
      if (cam.y > need) cam.y = Math.max(need, 720 / cam.z); }
    cam.sx = noise(lt, idx * 3.1) * 6 + (window.WHIPX || 0); cam.sy = noise(lt + 9, idx * 1.7) * 4; cam.rot += noise(lt + 4, idx) * .22;
    if (cm.shake) { cam.sx += Math.sin(lt * 41) * cm.shake; cam.sy += Math.cos(lt * 33) * cm.shake * .7; }
    const k = m.k ?? 1, fy = m.fy ?? 1270; WT.k = k; WT.tx = 1280 - 1280 * k; WT.ty = fy - 1270 * k;
    const pc = Object.assign({}, cam, { x: 1280 + (cam.x - 1280) * k, y: fy + (cam.y - 1270) * k, z: Math.max(1, cam.z / k) });
    const dof = s.blur ?? (m.dof === false ? 0 : clamp((pc.z - 1.12) * 2.4, 0, 2.6));
    if (s.plate) plate(m.img || s.plate, pc, dof, s.par ?? 1); else { screen(); ctx.fillStyle = s.bg || '#000'; ctx.fillRect(0, 0, W, H); }
    if (s.pre) await s.pre(lt, pc, u, d);
    const PR = s.props || [], CH = s.chars || [], vis = p => lt >= (p.t0 || 0) && lt <= (p.t1 ?? 1e9);
    const drawLoose = p => { apply(pc); P[p.k](Object.assign({}, p, { x: val(p.x, ue), y: val(p.y, ue) }, { s: val(p.s ?? 1, ue), k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); };
    for (const p of PR) if (vis(p) && p.on == null && p.onHead == null && (p.layer || 'back') === 'back') drawLoose(p);
    const talker = CH.find(c => c.talk && (Array.isArray(c.talk) ? c.talk.some(([p, q]) => lt >= p && lt <= q) : true));
    const held = {}; PR.forEach(p => { if (p.on != null && vis(p) && p.layer !== 'back') (held[p.on] = held[p.on] || []).push(p); });
    const L1 = [], L2 = [], HP = [], CO = [];
    for (let ci = 0; ci < CH.length; ci++) { const c = CH[ci]; if (lt < (c.t0 || 0) || lt > (c.t1 ?? 1e9)) continue; const spec = C[c.c];
      const rng_ = Array.isArray(c.x) ? Math.abs(c.x[1] - c.x[0]) : 0, span = (c.t1 ?? d) - (c.t0 || 0), wEnd = rng_ > 20 && rng_ / span < 140 ? (c.t0 || 0) + Math.max(.8, rng_ / 160) : (c.t1 ?? d); const cu = c.t0 || c.t1 || wEnd < d ? clamp((lt - (c.t0 || 0)) / (wEnd - (c.t0 || 0))) : ue; const cue = c.lin ? cu : io(cu);
      const x = val(c.x, cue), moving = Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20 && cu > 0 && cu < 1;
      const talk = c.talk && (Array.isArray(c.talk) ? c.talk.some(([p, q]) => lt >= p && lt <= q) : true);
      let view = c.view || 'front', dir = c.dir || 1;
      if (!c.view && !moving && talker && talker !== c && !c.lockView) { const tx_ = v0(talker.x); if (Math.abs(tx_ - x) > 60) { view = 'threequarter'; dir = tx_ > x ? 1 : -1; } }
      const hp = held[ci] || [], ins = hp.find(p => INSTR[p.k]);
      const fo = { x, y: val(c.y, cue), s: val(c.s ?? 1.4, cue), view, dir, expr: (typeof c.expr === 'function' ? c.expr(lt) : c.expr) || (talk ? 'talk' : undefined), anim: moving ? 'walk' : c.anim || (talk ? 'talk' : null), pose: c.pose ? D.POSES[c.pose] : undefined, hold: c.hold, lean: c.lean, tilt: c.tilt, seed: c.seed, grip: {} };
      if (ins) fo.play = ins.k === 'guitar' ? 'guitar' : 'cymbals';
      for (const p of hp) if (!INSTR[p.k]) fo.grip[p.side || 'R'] = (HOLD[p.k] || {}).grip || 'grab';
      const tl = lt + (c.ph || 0); const a = actPose(spec, tl, fo); let pose = a.pose;
      const sc = fo.s * (spec.scale || 1), FO = { view, dir, x: fo.x, y: fo.y, scale: fo.s };
      if (ins) { const J = D.joints(spec, Object.assign({ pose }, FO)), g = .66 * sc;
        if (ins.k === 'guitar') { const ang = dir > 0 ? Math.PI + .42 : -.42, o = { x: J.pelvis.x + dir * 22 * sc, y: J.pelvis.y - 18 * sc }, strum = Math.sin(tl * Math.PI * 2 * 3.2) * 14;
          pose = D.ikArm(spec, Object.assign({ pose }, FO), 'R', ...onProp(o, ang, g, -26, strum), { hand: 'fist' });
          pose = D.ikArm(spec, Object.assign({ pose }, FO), 'L', ...onProp(o, ang, g, 205 + Math.sin(tl * 1.3) * 30, 0), { hand: 'grab' });
          HP.push(() => P.guitar(Object.assign({}, ins, { x: o.x, y: o.y, s: g, ang, k: 1 }), lt)); }
        else { const o = { x: J.chest.x + dir * 6 * sc, y: J.chest.y + 30 * sc }, gap = Math.abs(Math.sin(lt * 6)) * 30, cs = .55 * sc;
          pose = D.ikArm(spec, Object.assign({ pose }, FO), 'R', o.x + dir * (40 + gap) * cs, o.y, { hand: 'fist' });
          pose = D.ikArm(spec, Object.assign({ pose }, FO), 'L', o.x - dir * (40 + gap) * cs, o.y, { hand: 'fist' });
          HP.push(() => P.cymbals(Object.assign({}, ins, { x: o.x, y: o.y, s: cs, k: 1 }), lt)); } }
      for (const p of PR) if (p.grab === ci && vis(p)) { const px = val(p.x, ue), py = val(p.y, ue) - (p.gy ?? 405) * (p.s ?? 1); pose = D.ikArm(spec, Object.assign({ pose }, FO), p.side || 'R', px, py + (p.gdy || 0), { hand: 'fist' }); }   // hand grabs a loose prop (mic stand, door, rail)
      CO[ci] = [spec, tl, Object.assign({}, fo, { _pose: pose })];
      for (const p of hp) if (!INSTR[p.k]) { const hd = HOLD[p.k] || { oy: 0, k: .6 }, w = D.wrist(spec, Object.assign({ pose }, FO), p.side || 'R'), ps = (p.s ?? 1) * hd.k * sc;
        HP.push(() => P[p.k](Object.assign({}, p, { x: w.px + (p.dx || 0), y: w.py + (p.dy || 0) + hd.oy * ps, s: ps, rot: hd.rot ?? p.rot, k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt)); }
      const e = exprOf(spec, a, fo), base = { view, dir, x: fo.x, y: fo.y, scale: fo.s, pose, expr: e };
      const wrap = sv => c.ghost ? `<g opacity="${typeof c.ghost === 'number' ? c.ghost : .62}">${sv}</g>` : sv;
      if (hp.length) { L1.push(wrap(D.drawCharacter(spec, Object.assign({ part: 'body' }, base)))); L2.push(wrap(D.drawCharacter(spec, Object.assign({ part: 'front' }, base)))); }
      else L1.push(wrap(D.drawCharacter(spec, base)));
      if (pose._ikShort) console.warn('IKREACH', s.plate, ci, pose._ikShort | 0);
    }
    if (L1.length) await chars(L1, pc, s.cblur || 0);
    for (const f of HP) { apply(pc); f(); }
    if (L2.length) await chars(L2, pc, s.cblur || 0);
    for (const p of PR) if (vis(p) && p.onHead != null) { const k_ = CO[p.onHead]; if (!k_) continue; const o = k_[2], f = D.forehead(k_[0], { view: o.view, dir: o.dir, x: o.x, y: o.y, scale: o.s, pose: o._pose, fy: p.fy ?? 36 }); apply(pc); P[p.k](Object.assign({}, p, { x: f.x + (p.dx || 0), y: f.y + (p.dy || 0), s: (p.s ?? 1) * f.sc / 1.9, k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); }
    for (const p of PR) if (vis(p) && p.on == null && p.onHead == null && p.layer === 'front') drawLoose(p);
    if (s.fg && IM[s.fg]) { apply(pc, 1, true); ctx.drawImage(IM[s.fg], 0, 0, 2560, 1440); }
    if (s.post) await s.post(lt, pc, u, d);
    WT.k = 1; WT.tx = 0; WT.ty = 0;
    for (const f of (s.fx || [])) { if (f === 'rain') rainFx(lt, .35); else if (f === 'snow') FX.snow(lt); else if (f === 'sparks') FX.sparks(W / 2, H / 2, lt); else if (f === 'flash') FX.white(1 - seg(lt, 0, .5)); else if (f === 'whiteout') FX.white(seg(lt, d - 1.2, d)); }
    if (s.grade) grade(s.grade[0], s.grade[1], s.grade[2] || 'soft-light');
    if (m.grade) grade(m.grade[0], m.grade[1], m.grade[2] || 'soft-light');
    if (s.title) FX.title(s.title[0], s.title[1], lt, .4, Math.min(3.2, d - .6), 138 + 150);
    for (const c of (s.cards || [])) await FX.intro(c.c ? C[c.c] : null, c.name, c.sub, lt, c.at ?? .4, Object.assign({ side: c.side || 'R', dur: c.dur || 3.6 }, c));
    for (const p of (s.pops || [])) pop(p.t, lt, p.at, p.dur || 2.6, p);
    if (s.big) bigText(s.big[0], lt, s.big[1], s.big[2], s.big[3], s.big[4], s.big[5]);
    return { fade: (s.fadeIn ? io(lt / (s.fadeIn === true ? .5 : s.fadeIn)) : 1) * (s.fadeOut ? 1 - io(seg(lt, d - .6, d)) : 1) };
  } }; });
}
FILM.setup(build(window.ACT));
})();
