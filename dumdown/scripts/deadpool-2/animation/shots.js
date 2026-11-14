// Data-driven shot interpreter for the Loki acts. window.ACT = { timing, shots:[...] } -> FILM.setup(SH)
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
function bigText(text, lt, a, b, col = '#f4ecd8', bx = null, by = null) { const al = io(seg(lt, a, a + .3)) * (1 - io(seg(lt, b - .3, b))); if (al <= 0) return; screen(); ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.font = '900 120px "Inter Display"'; ctx.letterSpacing = '6px'; ctx.lineWidth = 14; ctx.strokeStyle = '#231A24'; ctx.strokeText(text, bx ?? W / 2, by ?? H / 2 + 40); ctx.fillStyle = col; ctx.fillText(text, bx ?? W / 2, by ?? H / 2 + 40); ctx.letterSpacing = '0px'; ctx.globalAlpha = 1; }
window.LK = { pop, bigText };
function build(ACT) {
  const T = ACT.timing, starts = []; let t = 0; T.durs.forEach(d => { starts.push(t); t += d + T.gap; }); const total = t + (ACT.tail ?? 1.2);
  const at = (p, f = 0) => LEAD + (p >= starts.length ? total : starts[p] + (p < T.durs.length ? T.durs[p] * f : 0));
  const SH = ACT.shots.map((s, i) => ({ s, a: s.t0 ?? at(s.p, s.f || 0) }));
  SH.forEach((x, i) => { x.b = i + 1 < SH.length ? SH[i + 1].a : LEAD + total; if (i === 0) x.a = 0; });
  return SH.map(({ s, a, b }) => ({ a, b, async draw(tt, lt, u) {
    const d = b - a, ue = s.ease === 'lin' ? u : io(u), cm = s.cam || {};
    const cam = { z: val(cm.z ?? 1, ue), x: val(cm.x ?? 1280, ue), y: val(cm.y ?? 720, ue), rot: val(cm.rot ?? 0, ue) };
    // keep every head (and horns) below the top letterbox: lower cam.y if needed (continuous in ue, so no jumps)
    const cam0y = cam.y;
    if (!s.noHeadFit) for (const c of (s.chars || [])) { const ch = (C[c.c] || {}).acc || {}, hs = ch.hornStyle, hx = ch.horns ? (hs === 'huge' ? 230 : hs === 'small' ? 70 : hs === 'broken' ? 90 : 150) : 0;
      const sc = val(c.s ?? 1.4, ue), cy = val(c.y, ue), lim = (165 - 540) / (cam.z * .75); let need = cy - (410 + hx) * sc - lim;
      if (cam0y - need > .3 * 720 / cam.z) need = cy - 410 * sc - lim; // close-up: keep the face framed, let horn tips leave the frame
      if (cam.y > need) cam.y = Math.max(need, 720 / cam.z); }
    if (cm.shake) { cam.sx = Math.sin(lt * 41) * cm.shake; cam.sy = Math.cos(lt * 33) * cm.shake * .7; }
    if (s.plate) plate(s.plate, cam, s.blur || 0, s.par ?? 1); else { screen(); ctx.fillStyle = s.bg || '#000'; ctx.fillRect(0, 0, W, H); }
    if (s.pre) await s.pre(lt, cam, u, d);
    const list = [], fronts = [];
    for (const p of (s.props || [])) if ((p.layer || 'back') === 'back' && lt >= (p.t0 || 0) && lt <= (p.t1 ?? 1e9)) { apply(cam); P[p.k](Object.assign({}, p, { x: val(p.x, ue), y: val(p.y, ue), s: val(p.s ?? 1, ue), k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); }
    for (const c of (s.chars || [])) { if (lt < (c.t0 || 0) || lt > (c.t1 ?? 1e9)) continue; const rng_ = Array.isArray(c.x) ? Math.abs(c.x[1] - c.x[0]) : 0, span = (c.t1 ?? d) - (c.t0 || 0), wEnd = rng_ > 20 && rng_ / span < 140 ? (c.t0 || 0) + Math.max(.8, rng_ / 160) : (c.t1 ?? d); const cu = c.t0 || c.t1 || wEnd < d ? clamp((lt - (c.t0 || 0)) / (wEnd - (c.t0 || 0))) : ue; const cue = c.lin ? cu : io(cu);
      const x = val(c.x, cue), moving = Array.isArray(c.x) && Math.abs(c.x[1] - c.x[0]) > 20 && cu > 0 && cu < 1;
      const talk = c.talk && (Array.isArray(c.talk) ? c.talk.some(([p, q]) => lt >= p && lt <= q) : true);
      list.push(fig(C[c.c], lt + (c.ph || 0), { x, y: val(c.y, cue), s: val(c.s ?? 1.4, cue), view: c.view || 'front', dir: c.dir || 1, expr: (typeof c.expr === 'function' ? c.expr(lt) : c.expr) || (talk ? 'talk' : undefined), anim: moving ? 'walk' : c.anim || (talk ? 'talk' : null), pose: c.pose ? D.POSES[c.pose] : undefined, lean: c.lean, tilt: c.tilt })); }
    if (list.length) await chars(list, cam, s.cblur || 0);
    for (const p of (s.props || [])) if (p.layer === 'front' && lt >= (p.t0 || 0) && lt <= (p.t1 ?? 1e9)) { apply(cam); P[p.k](Object.assign({}, p, { x: val(p.x, ue), y: val(p.y, ue), s: val(p.s ?? 1, ue), k: p.kk === undefined ? 1 : val(p.kk, ue) }), lt); }
    if (s.fg && IM[s.fg]) { apply(cam); ctx.drawImage(IM[s.fg], 0, 0, 2560, 1440); }
    if (s.post) await s.post(lt, cam, u, d);
    for (const f of (s.fx || [])) { if (f === 'rain') rainFx(lt, .35); else if (f === 'snow') FX.snow(lt); else if (f === 'sparks') FX.sparks(W / 2, H / 2, lt); else if (f === 'flash') FX.white(1 - seg(lt, 0, .5)); else if (f === 'whiteout') FX.white(seg(lt, d - 1.2, d)); }
    if (s.grade) grade(s.grade[0], s.grade[1], s.grade[2] || 'soft-light');
    if (s.title) FX.title(s.title[0], s.title[1], lt, .4, Math.min(3.2, d - .6));
    for (const c of (s.cards || [])) await FX.intro(c.c ? C[c.c] : null, c.name, c.sub, lt, c.at ?? .4, Object.assign({ side: c.side || 'R', dur: c.dur || 3.6 }, c));
    for (const p of (s.pops || [])) pop(p.t, lt, p.at, p.dur || 2.6, p);
    if (s.big) bigText(s.big[0], lt, s.big[1], s.big[2], s.big[3], s.big[4], s.big[5]);
    const fin = s.fin ?? (b - a > 1.2 ? .35 : 0);
    return { fade: (s.fadeIn ? io(lt / (s.fadeIn === true ? .5 : s.fadeIn)) : 1) * (s.fadeOut ? 1 - io(seg(lt, d - .6, d)) : 1) };
  } }));
}
FILM.setup(build(window.ACT));
})();
