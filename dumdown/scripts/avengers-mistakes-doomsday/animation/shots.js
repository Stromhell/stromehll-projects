// Data-driven shot interpreter for the Deadpool 2 acts. window.ACT = { timing, shots:[...] } -> FILM.setup(SH)
(function () {
const E = window.E, { D, C, W, H, BAR, IM, ctx, cv, clamp, lerp, io, out3, seg, apply, plate, chars, fig, screen, grade, glowS, rainFx, worldPt, hand } = E;
const FX = window.FX, P = window.PROPS;
const LEAD = window.LEAD ?? .6;
const val = (v, u) => Array.isArray(v) ? lerp(v[0], v[1], u) : v;
const outBack = u => { u = clamp(u); const k = 1.70158; return 1 + (k + 1) * Math.pow(u - 1, 3) + k * Math.pow(u - 1, 2); };
function pop(text, lt, a, dur = 2.6, o = {}) { if (lt < a || lt > a + dur) return; const k = outBack(seg(lt, a, a + .35)), ko = io(seg(lt, a + dur - .3, a + dur)); screen(); ctx.save();
  const x = o.x ?? W - 470, y = o.y ?? BAR + 120; ctx.translate(x, y); ctx.rotate(-.05 + Math.sin(lt * 3) * .015); ctx.scale(k * (1 - ko), k * (1 - ko)); ctx.font = '800 40px Inter';
  const lines = []; let line = ''; for (const w of text.split(' ')) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > 640 && line) { lines.push(line); line = w; } else line = t; } lines.push(line);
  const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 60, bh = lines.length * 50 + 36; ctx.fillStyle = '#231A24'; ctx.fillRect(-bw / 2 + 10, -bh / 2 + 10, bw, bh); ctx.fillStyle = '#ffd23d'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh); ctx.strokeStyle = '#231A24'; ctx.lineWidth = 5; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
  ctx.fillStyle = '#231A24'; ctx.textAlign = 'center'; lines.forEach((l, i) => ctx.fillText(l, 0, -bh / 2 + 62 + i * 50)); ctx.restore(); }
function bigText(text, lt, a, b, col = '#f4ecd8', bx = null, by = null) { const al = io(seg(lt, a, a + .3)) * (1 - io(seg(lt, b - .3, b))); if (al <= 0) return; if (by == null) { window.POSTBAR = () => bigText(text, lt, a, b, col, bx, -1); return; } if (by === -1) by = null; screen(); ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.font = '900 92px "Inter Display"'; ctx.letterSpacing = '6px'; ctx.lineWidth = 14; ctx.strokeStyle = '#231A24'; ctx.strokeText(text, bx ?? W / 2, by ?? H - 36); ctx.fillStyle = col; ctx.fillText(text, bx ?? W / 2, by ?? H - 36); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; }
window.LK = { pop, bigText };
// framing rule (Pushpam 21 Nov): graphics never overlap a character and stay inside a safe frame
const SAFE = { x0: 150, x1: W - 150, y0: BAR + 24, y1: H - BAR - 24 };
const hit = (r, BB) => BB.reduce((a, b) => a + Math.max(0, Math.min(r[2], b[2]) - Math.max(r[0], b[0])) * Math.max(0, Math.min(r[3], b[3]) - Math.max(r[1], b[1])), 0);
function freeSpot(w, h, BB, pref) { const cands = [[W - 150 - w / 2, SAFE.y0 + h / 2 + 10], [150 + w / 2, SAFE.y0 + h / 2 + 10], [W / 2, SAFE.y0 + h / 2 + 10], [W - 150 - w / 2, H / 2], [150 + w / 2, H / 2], [W - 150 - w / 2, SAFE.y1 - h / 2 - 10], [150 + w / 2, SAFE.y1 - h / 2 - 10], [W / 2, SAFE.y1 - h / 2 - 10]];
  if (pref === 'L') cands.unshift(cands.splice(1, 1)[0]); BB = BB.concat([[W - 380, 0, W, BAR + 190]]); let best = cands[0], bv = 1e18; for (const [x, y] of cands) { const v = hit([x - w / 2, y - h / 2, x + w / 2, y + h / 2], BB); if (v < bv - 1) { bv = v; best = [x, y]; } if (v === 0) break; } return best; }
window.FREESPOT = freeSpot;
function build(ACT) {
  const T = ACT.timing, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.2);
  const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
  // word clock: chunk timings from the VO json (Chatterbox chunks), char-proportional inside a chunk
  const norm = x => x.toLowerCase().replace(/[^a-z0-9' -]/g, '');
  const wordAt = (p, w, nth = 0) => { const ch = (T.chunks || [])[p]; const ww = norm(w); if (ch) { let k = 0; for (const [cs, cd, tx] of ch) { const n = norm(tx); let i = -1, from = 0; while ((i = n.indexOf(ww, from)) >= 0) { if (k++ === nth) return LEAD + starts[p] + cs + cd * (i / Math.max(1, n.length)); from = i + 1; } } }
    const para = norm((T.paras || [])[p] || ''); const i = para.indexOf(ww); console.error('word not found', p, w); return LEAD + starts[p] + (i >= 0 ? T.durs[p] * i / para.length : 0); };
  window.WORD_AT = wordAt;
  if (ACT.meterEv) ACT.meter = ACT.meterEv.map(e => [e.at != null ? e.at : wordAt(e.p, e.w, e.n_ || 0), e.n]);
  const SH = ACT.shots.map((s, i) => ({ s, a: s.t0 ?? at(s.p, s.f || 0) }));
  SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
  const tOf = (q, s, a) => q.at != null ? q.at : wordAt(q.p ?? s.p, q.w, q.n || 0) - a + (q.d || 0);
  for (const { s, a } of SH) { for (const c of (s.chars || [])) if (c.swap) c._swap = c.swap.map(q => [tOf(q, s, a), q.to, q.dur]); for (const p of (s.props || [])) if (p.tw) p.t0 = wordAt(p.p ?? s.p, p.tw, p.n || 0) - a + (p.d || 0); for (const p of (s.pops || [])) if (p.w) p.at = wordAt(p.p ?? s.p, p.w, p.n || 0) - a + (p.d || 0); for (const c of (s.cards || [])) if (c.w) c.at = wordAt(c.p ?? s.p, c.w, c.n || 0) - a; }
  for (const { s, a } of SH) for (const c of (s.chars || [])) if (c.acts || c.seat) c._acts = (c.acts || []).map(q => [q.a, q.at != null ? q.at : wordAt(q.p ?? s.p, q.w, q.n || 0) - a + (q.d || 0)]);
  return SH.map(({ s, a, b }, si) => ({ a, b, async draw(tt, lt, u) {
    const d = b - a, ue = s.ease === 'lin' ? u : io(u), cm = s.cam || {};
    const zr_ = [].concat(cm.z ?? 1), zk = !s.still && !cm.frame && (zr_.length < 2 || Math.abs(zr_[1] - zr_[0]) < .12) ? 1 + .07 * ue : 1;
    const cam = { z: val(cm.z ?? 1, ue) * zk, x: val(cm.x ?? 1280, ue), y: val(cm.y ?? 720, ue), rot: val(cm.rot ?? 0, ue) };
    // AUTO FRAMING (rule 2): frame = full | med | mcu | cu | ecu on chars[on] (or 'two' on chars[on] + chars[on2])
    if (cm.frame) { const ch = (s.chars || [])[cm.on || 0], spc = C[ch.c] || {}, cy0 = val(ch.y, 0), fh = D.forehead(spc, { view: ch.view || 'front', dir: ch.dir || 1, x: val(ch.x, 0), y: cy0, scale: val(ch.s ?? 1.4, 0), fy: -30 }), h = Math.max(50, cy0 - fh.y);
      const F = { full: [1.3, .5], med: [.85, .66], mcu: [.6, .76], cu: [.42, .86], ecu: [.26, .9] }[cm.frame === 'two' ? 'full' : cm.frame];
      const xNow = c_ => { if (!Array.isArray(c_.x)) return c_.x; const r_ = Math.abs(c_.x[1] - c_.x[0]), sp_ = (c_.t1 ?? d) - (c_.t0 || 0), we_ = r_ > 20 && r_ / sp_ < 140 ? (c_.t0 || 0) + Math.max(.8, r_ / 160) : (c_.t1 ?? d); const u_ = clamp((lt - (c_.t0 || 0)) / (we_ - (c_.t0 || 0))); return lerp(c_.x[0], c_.x[1], c_.lin ? u_ : io(u_)); };
      let z = 804 / (.75 * h * F[0]), cx = xNow(ch);
      if (cm.frame === 'two') { const c2 = s.chars[cm.on2 ?? 1]; const x2 = xNow(c2); cx = (cx + x2) / 2; const wneed = Math.abs(x2 - xNow(ch)) + 520 * val(ch.s ?? 1.4, 0); z = Math.min(z, 1920 / (.75 * wneed)); }
      const pz = [].concat(cm.push ?? [1, 1.1]); z *= val(pz.length > 1 ? pz : [pz[0], pz[0]], ue); cam.z = Math.max(1, z); cam.y = cy0 - h * F[1] + (cm.dy || 0); if (cm.x == null) cam.x = cx + (cm.dx || 0) / (Math.max(1, cam.z) * .75); }
    // keep every head (and horns) below the top letterbox: lower cam.y if needed (continuous in ue, so no jumps)
    const cam0y = cam.y;
    if (!s.noHeadFit && !cm.frame) for (const c of (s.chars || [])) { const ch = (C[c.c] || {}).acc || {}, hs = ch.hornStyle, hx = ch.horns ? (hs === 'huge' ? 230 : hs === 'small' ? 70 : hs === 'broken' ? 90 : 150) : 0;
      const sc = val(c.s ?? 1.4, ue), cy = val(c.y, ue), lim = (165 - 540) / (cam.z * .75); let need = cy - (410 + hx) * sc - lim;
      if (cam0y - need > .3 * 720 / cam.z) need = cy - 410 * sc - lim; // close-up: keep the face framed, let horn tips leave the frame
      if (cam.y > need) cam.y = Math.max(need, 720 / cam.z); }
    // CINEMATIC v2 (Pushpam 15 Nov: no slideshow): every shot keeps moving (dolly drift + push-in), plates parallax behind
    // the cast, and cuts to a new place whip-pan (blurred slide in/out) instead of hard-cutting.
    if (!s.still) { const dirv = s.drift ?? (si % 2 ? -1 : 1);
      if (!Array.isArray(cm.x)) cam.x += dirv * lerp(-120, 120, ue) / Math.max(1, cam.z * .9);
      cam.sy = (cam.sy || 0) + Math.sin(lt * 1.3 + si) * 3; }
    let whip = 0; const prevS = si ? SH[si - 1].s : null, nextS = SH[si + 1] ? SH[si + 1].s : null, WD = .22;
    if (prevS && prevS.plate !== s.plate && !s.noWhip && lt < WD) whip = (si % 2 ? -1 : 1) * (1 - io(lt / WD));
    if (nextS && nextS.plate !== s.plate && !nextS.noWhip && d - lt < WD) whip = ((si + 1) % 2 ? 1 : -1) * io(1 - (d - lt) / WD);
    if (whip) { const m = Math.max(0, (2560 - 2560 / cam.z) / 2) * cam.z * .75; cam.sx = (cam.sx || 0) + whip * Math.min(m * .6, 150); }
    if (cm.shake) { cam.sx = Math.sin(lt * 41) * cm.shake; cam.sy = Math.cos(lt * 33) * cm.shake * .7; }
    if (s.plate) plate(s.plate, cam, (s.blur || 0) + Math.abs(whip) * 22, s.par ?? .86); else { screen(); ctx.fillStyle = s.bg || '#000'; ctx.fillRect(0, 0, W, H); }
    if (s.pre) await s.pre(lt, cam, u, d);
    const list = [], fronts = [], CO = [], BB = [];
    const at = p => { if (p.onHead != null) { const k = CO[p.onHead]; if (!k) return null; const o = k[2], f = D.forehead(k[0], { view: o.view || 'front', dir: o.dir || 1, x: o.x, y: o.y, scale: o.s, pose: E.figPose(k[0], k[1], o), fy: p.fy ?? 36 }); return { x: f.x + (p.dx || 0), y: f.y + (p.dy || 0), s: (p.s ?? 1) * f.sc / 1.9 }; } if (p.on == null) return null; const k = CO[p.on]; if (!k) return null; const w = hand(k[0], k[1], k[2], p.side || 'R'); return { x: w.x + (p.dx || 0), y: w.y + (p.dy || 0) }; };
    ctx.filter = whip ? `blur(${(Math.abs(whip) * 16).toFixed(1)}px)` : 'none';
    for (const p of (s.props || [])) if ((p.layer || (p.on != null || p.onHead != null ? 'front' : 'back')) === 'back' && lt >= (p.t0 || 0) && lt <= (p.t1 ?? 1e9)) { apply(cam); P[p.k](Object.assign({}, p, at(p) || { x: val(p.x, ue), y: val(p.y, ue) }, { s: val(p.s ?? 1, ue), rot: p.rot == null ? 0 : val(p.rot, ue), k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); }
    ctx.filter = 'none';
    for (const c of (s.chars || [])) { if (lt < (c.t0 || 0) || lt > (c.t1 ?? 1e9)) continue; const rng_ = Array.isArray(c.x) ? Math.abs(c.x[1] - c.x[0]) : 0, span = (c.t1 ?? d) - (c.t0 || 0), wEnd = rng_ > 20 && rng_ / span < 140 ? (c.t0 || 0) + Math.max(.8, rng_ / 160) : (c.t1 ?? d); const cu = c.t0 || c.t1 || wEnd < d ? clamp((lt - (c.t0 || 0)) / (wEnd - (c.t0 || 0))) : ue; const cue = c.lin ? cu : io(cu);
      let spec = C[c.c]; if (c._swap) for (const [t_, to, du] of c._swap) if (lt >= t_ && (du == null || lt < t_ + du)) spec = C[to] || spec;
      const x = val(c.x, cue), moving = Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20 && cu > 0 && cu < 1;
      const talk = c.talk && (Array.isArray(c.talk) ? c.talk.some(([p, q]) => lt >= p && lt <= q) : true);
      const fo = { x, y: val(c.y, cue), s: val(c.s ?? 1.4, cue), view: c.view || 'front', dir: c.dir || 1, expr: (typeof c.expr === 'function' ? c.expr(lt) : c.expr) || (talk ? 'talk' : undefined), anim: c.anim || (moving ? 'walk' : (talk ? 'talk' : null)), pose: c.pose ? D.POSES[c.pose] : undefined, lean: c.lean, tilt: c.tilt, rot: c.rot == null ? 0 : val(c.rot, cue) }; if (c._acts) { const base = JSON.parse(JSON.stringify(E.figPose(spec, lt + (c.ph || 0), fo))); if (c.seat) { base.L = { sh: 4, el: 66, wr: 0, hand: 'relaxed' }; base.R = { sh: 0, el: 70, wr: 0, hand: 'relaxed' }; } const r = D.ACT.apply(base, c._acts, lt); if (c.seat && r.pose) { const sp = D.ACT.apply(JSON.parse(JSON.stringify(base)), [['sitS', -5]], lt).pose; r.pose.legL = sp.legL; r.pose.legR = sp.legR; r.pose.bob = sp.bob; r.pose.lean = Math.min(r.pose.lean || 0, 4) - 3; } const sc = fo.s * (spec.scale || 1); fo.poseFinal = r.pose; fo.x += r.body.dx * sc * fo.dir; fo.y += r.body.dy * sc; fo.rot = (fo.rot || 0) + r.body.rot; if (r.expr && !c.exprLock) fo.exprForce = r.expr; }
      { const ci = (s.chars || []).indexOf(c), hs = (s.props || []).filter(q => q.on === ci).map(q => q.side || 'R'); if (hs.length) { if (fo.view === 'threequarter') fo.view = 'side'; const pf = JSON.parse(JSON.stringify(E.figPose(spec, lt + (c.ph || 0), fo))); for (const sd of hs) pf[sd] = Object.assign({}, pf[sd], { hand: 'fist' }); fo.poseFinal = pf; } }
      CO[(s.chars || []).indexOf(c)] = [spec, lt + (c.ph || 0), fo];
      { const sc = fo.s * (spec.scale || 1), [px, py] = worldPt(cam, fo.x, fo.y), m = E.camTf(cam).sc, hh = 440 * sc * m, ww = 230 * sc * m; BB.push([px - ww / 2, py - hh, px + ww / 2, py]); } const fg_ = fig(spec, lt + (c.ph || 0), fo); list.push(c.ghost ? `<g opacity="${typeof c.ghost === 'number' ? c.ghost : (Array.isArray(c.ghost) ? val(c.ghost, cue) : .62)}">${fg_}</g>` : fg_); }
    if (list.length) await chars(list, cam, (s.cblur || 0) + Math.abs(whip) * 16);
    ctx.filter = whip ? `blur(${(Math.abs(whip) * 16).toFixed(1)}px)` : 'none';
    for (const p of (s.props || [])) if ((p.layer || (p.on != null || p.onHead != null ? 'front' : 'back')) === 'front' && lt >= (p.t0 || 0) && lt <= (p.t1 ?? 1e9)) { apply(cam); P[p.k](Object.assign({}, p, at(p) || { x: val(p.x, ue), y: val(p.y, ue) }, { s: val(p.s ?? 1, ue), rot: p.rot == null ? 0 : val(p.rot, ue), k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); }
    ctx.filter = 'none';
    if (s.fg && IM[s.fg]) { apply(cam); ctx.drawImage(IM[s.fg], 0, 0, 2560, 1440); }
    if (s.post) await s.post(lt, cam, u, d);
    for (const f of (s.fx || [])) { if (f === 'rain') rainFx(lt, .35); else if (f === 'snow') FX.snow(lt); else if (f === 'sparks') FX.sparks(W / 2, H / 2, lt); else if (f === 'flash') FX.white(1 - seg(lt, 0, .5)); else if (f === 'whiteout') FX.white(seg(lt, d - 1.2, d)); }
    if (s.grade) grade(s.grade[0], s.grade[1], s.grade[2] || 'soft-light');
    if (s.title) { const _p = window.POSTBAR, _t = s.title, _d = Math.min(3.2, d - .6); window.POSTBAR = () => { if (_p) _p(); screen(); const al = io(seg(lt, .4, 1)) * (1 - seg(lt, _d, _d + .6)); if (al <= 0) return; ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd23d'; ctx.font = '600 20px Inter'; ctx.letterSpacing = '12px'; ctx.fillText(_t[0], W / 2, H - 138 + 40); ctx.fillStyle = '#f4ecd8'; ctx.font = '700 50px Georgia'; ctx.letterSpacing = '4px'; ctx.fillText(_t[1], W / 2, H - 138 + 100); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; }; }
    for (const c of (s.cards || [])) { let side = c.side; if (!side) { const r = [W / 2 + 600 - 180, H / 2 - 255, W / 2 + 600 + 180, H / 2 + 255], l = [W / 2 - 600 - 180, H / 2 - 255, W / 2 - 600 + 180, H / 2 + 255]; side = hit(r, BB) <= hit(l, BB) ? 'R' : 'L'; c.side = side; } await FX.intro(c.c ? C[c.c] : null, c.name, c.sub, lt, c.at ?? .4, Object.assign({ dur: c.dur || 3.6, dx: 600 }, c, { side })); }
    for (const p of (s.pops || [])) { if (p.x == null && !p._xy && lt >= (p.at || 0) - .05) { ctx.font = '800 40px Inter'; const tw = Math.min(700, ctx.measureText(p.t).width + 60), th = tw >= 700 ? 136 : 86; p._xy = freeSpot(tw + 40, th + 40, BB, p.pref); BB.push([p._xy[0] - tw / 2 - 20, p._xy[1] - th / 2 - 20, p._xy[0] + tw / 2 + 20, p._xy[1] + th / 2 + 20]); } const q = p._xy ? Object.assign({}, p, { x: p._xy[0], y: p._xy[1] }) : p; pop(p.t, lt, p.at, p.dur || 2.6, q); }
    if (ACT.meter) { let n = null, at = -1; for (const [t_, v] of ACT.meter) if (tt >= t_) { n = v; at = t_; } if (n != null && tt - at < 3.6 && !s.noMeter) window.METER(n, tt - at); }
    if (s.big) bigText(s.big[0], lt, s.big[1], s.big[2], s.big[3], s.big[4], s.big[5]);
    const fin = s.fin ?? (b - a > 1.2 ? .35 : 0);
    return { fade: (s.fadeIn ? io(lt / (s.fadeIn === true ? .5 : s.fadeIn)) : 1) * (s.fadeOut ? 1 - io(seg(lt, d - .6, d)) : 1) };
  } }));
}
FILM.setup(build(window.ACT));
})();
