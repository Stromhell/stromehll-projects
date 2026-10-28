// Scene kit: timeline of scenes drawn on one 1920x1080 canvas, frame by frame.
// An act page loads: rig.js, kit.js, (video kit), timing, scenes, subs; then calls KIT.boot().
(function (G) {
  const W = 1920, H = 1080, FPS = 30;
  const K = { W, H, FPS, scenes: [], cues: [], imgs: {}, words: [], subs: [], dur: 0, xfade: .8 };
  const cv = document.getElementById('c') || Object.assign(document.body.appendChild(document.createElement('canvas')), { id: 'c', width: W, height: H });
  cv.width = W; cv.height = H; const ctx = cv.getContext('2d'); K.ctx = ctx;
  const off = document.createElement('canvas'); off.width = W; off.height = H; const octx = off.getContext('2d');

  // easing
  const E = K.E = { lin: t => t, io: t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t), out: t => { t = Math.min(1, Math.max(0, t)); return 1 - Math.pow(1 - t, 3); }, inn: t => { t = Math.min(1, Math.max(0, t)); return t * t * t; },
    back: t => { t = Math.min(1, Math.max(0, t)); const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }, sine: t => .5 - .5 * Math.cos(Math.PI * Math.min(1, Math.max(0, t))) };
  K.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  K.seg = (t, a, b) => K.clamp((t - a) / (b - a)); // 0..1 progress of t through [a,b]
  K.lerp = (a, b, u) => a + (b - a) * u;

  // assets
  K.load = (name, src) => { const im = new Image(); im.src = src; K.imgs[name] = im; return im; };
  K.ready = () => Promise.all(Object.values(K.imgs).map(im => im.decode().catch(e => console.error('img', im.src, e))));

  // scenes
  K.scene = (id, start, end, draw, opts = {}) => { const s = { id, start, end, draw, ...opts }; K.scenes.push(s); K.dur = Math.max(K.dur, end); if (opts.whoosh !== false) K.cue(start, opts.inSfx || 'whoosh'); return s; };
  K.cue = (t, name, gain = 1) => K.cues.push({ t: +t.toFixed(3), name, gain });

  // Camera over a 2560x1440 plate: eased push/pan. World coordinates = plate pixels.
  // cam = {z:[z0,z1], x:[cx0,cx1], y:[cy0,cy1]} where cx,cy = plate point at screen centre.
  K.camAt = (cam, u) => { const e = (cam.ease || E.sine)(u); const z = K.lerp(cam.z?.[0] ?? 1, cam.z?.[1] ?? 1, e), cx = K.lerp(cam.x?.[0] ?? 1280, cam.x?.[1] ?? 1280, e), cy = K.lerp(cam.y?.[0] ?? 720, cam.y?.[1] ?? 720, e); const sc = z * W / 2560; return { sc, tx: W / 2 - cx * sc, ty: H / 2 - cy * sc }; };
  K.world = (c, cam, u, par = 1) => { const m = K.camAt(cam, u); const sc = 1 + (m.sc / (W / 2560) - 1) * par; const s2 = sc * W / 2560, cx = (W / 2 - m.tx) / m.sc, cy = (H / 2 - m.ty) / m.sc; c.setTransform(s2, 0, 0, s2, W / 2 - (1280 + (cx - 1280) * par) * s2, H / 2 - (720 + (cy - 720) * par) * s2); };
  K.plate = (c, name, cam, u) => { K.world(c, cam, u); c.drawImage(K.imgs[name], 0, 0, 2560, 1440); };
  K.screen = c => c.setTransform(1, 0, 0, 1, 0, 0);

  // ---------- type and graphics in the house style ----------
  const INK = '#1d1712', PAPER = '#f3e7cc';
  K.font = (px, fam = 'Anton') => `${px}px ${fam}, Oswald, 'Arial Narrow', sans-serif`;
  K.outlined = (c, txt, x, y, px, opts = {}) => { c.save(); c.font = K.font(px, opts.fam); c.textAlign = opts.align || 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.globalAlpha *= opts.alpha ?? 1;
    if (opts.track) c.letterSpacing = opts.track + 'px';
    c.strokeStyle = opts.ink || INK; c.lineWidth = px * (opts.ow ?? .16); c.strokeText(txt, x, y); c.fillStyle = opts.fill || '#fffaf0'; c.fillText(txt, x, y); c.restore(); };
  // Title: scales in with small overshoot, holds, fades.
  K.title = (c, txt, lt, opts = {}) => { const a = K.seg(lt, opts.at ?? 0, (opts.at ?? 0) + .5), out = 1 - K.seg(lt, (opts.until ?? 99) - .4, opts.until ?? 99); const sc = .85 + .15 * E.back(a); c.save(); c.translate(opts.x ?? W / 2, opts.y ?? H / 2); c.scale(sc, sc); c.globalAlpha = a * out; K.outlined(c, txt, 0, 0, opts.px ?? 120, opts); if (opts.sub) K.outlined(c, opts.sub, 0, (opts.px ?? 120) * .78, (opts.px ?? 120) * .32, { fam: 'Oswald', ow: .12 }); c.restore(); };
  // Callout card: off-white paper with ink border, rotated about -4 degrees, pops in on its word.
  K.card = (c, txt, lt, opts = {}) => { const at = opts.at ?? 0, a = K.seg(lt, at, at + .35), out = 1 - K.seg(lt, (opts.until ?? 99) - .3, opts.until ?? 99); if (a <= 0 || out <= 0) return; const px = opts.px ?? 54;
    c.save(); c.font = K.font(px, opts.fam || 'Anton'); const lines = String(txt).split('\n'), w = Math.max(...lines.map(l => c.measureText(l).width)) + px * 1.1, h = lines.length * px * 1.15 + px * .7;
    c.translate(opts.x ?? W / 2, opts.y ?? H * .3); c.rotate((opts.rot ?? -4) * Math.PI / 180); const sc = E.back(a); c.scale(sc, sc); c.globalAlpha = out;
    c.fillStyle = 'rgba(20,12,6,.35)'; c.fillRect(-w / 2 + 8, -h / 2 + 10, w, h); c.fillStyle = opts.bg || '#f6eedc'; c.fillRect(-w / 2, -h / 2, w, h); c.strokeStyle = INK; c.lineWidth = 5; c.strokeRect(-w / 2, -h / 2, w, h);
    c.fillStyle = opts.color || INK; c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, i) => c.fillText(l, 0, (i - (lines.length - 1) / 2) * px * 1.15)); c.restore(); };
  // Dark era badge top-left
  K.badge = (c, txt, lt, opts = {}) => { const a = K.seg(lt, opts.at ?? .3, (opts.at ?? .3) + .4); if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = K.font(34); const w = c.measureText(txt).width + 44; c.fillStyle = 'rgba(29,23,18,.88)'; c.fillRect(56, 52, w, 60); c.fillStyle = '#e9b54a'; c.fillRect(56, 52, 8, 60); c.fillStyle = '#f6eedc'; c.textBaseline = 'middle'; c.fillText(txt, 78, 84); c.restore(); };
  // Slanted white date tag bottom-right
  K.dateTag = (c, txt, lt, opts = {}) => { const a = K.seg(lt, opts.at ?? .4, (opts.at ?? .4) + .4); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(W - 90, H - 120); c.transform(1, 0, -.18, 1, 0, 0); c.font = K.font(46); const w = c.measureText(txt).width + 50; c.fillStyle = '#fffaf0'; c.fillRect(-w, -34, w, 68); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(-w, -34, w, 68); c.fillStyle = INK; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(txt, -25, 2); c.restore(); };
  // Number that counts up, eased
  K.counter = (c, from, to, lt, opts = {}) => { const u = E.out(K.seg(lt, opts.at ?? 0, (opts.at ?? 0) + (opts.dur ?? 1.6))); const v = from + (to - from) * u; K.outlined(c, (opts.pre || '') + (opts.fmt ? opts.fmt(v) : Math.round(v).toLocaleString('en-US')) + (opts.post || ''), opts.x ?? W / 2, opts.y ?? H / 2, opts.px ?? 140, opts); };
  // Horizontal bars that grow to their values
  K.bars = (c, items, lt, opts = {}) => { const x0 = opts.x ?? 420, y0 = opts.y ?? 380, bw = opts.w ?? 1100, bh = opts.h ?? 74, gap = opts.gap ?? 34, max = opts.max ?? Math.max(...items.map(i => i.v));
    items.forEach((it, i) => { const a = E.out(K.seg(lt, (opts.at ?? 0) + i * (opts.stagger ?? .35), (opts.at ?? 0) + i * (opts.stagger ?? .35) + 1)); if (a <= 0) return; const y = y0 + i * (bh + gap);
      c.save(); c.globalAlpha = Math.min(1, a * 2); c.font = K.font(40, 'Oswald'); c.fillStyle = opts.labelCol || '#fffaf0'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.lineWidth = 6; c.strokeStyle = INK; c.strokeText(it.label, x0 - 24, y + bh / 2); c.fillText(it.label, x0 - 24, y + bh / 2);
      c.fillStyle = 'rgba(29,23,18,.55)'; c.fillRect(x0, y, bw, bh); c.fillStyle = it.col || '#e9b54a'; c.fillRect(x0, y, bw * it.v / max * a, bh); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x0, y, bw, bh);
      c.textAlign = 'left'; c.font = K.font(44); c.fillStyle = '#fffaf0'; c.strokeText(it.text ?? String(it.v), x0 + bw * it.v / max * a + 18, y + bh / 2 + 2); c.fillText(it.text ?? String(it.v), x0 + bw * it.v / max * a + 18, y + bh / 2 + 2); c.restore(); }); };
  // Parchment panel (for charts/maps)
  K.parchment = (c, x, y, w, h, alpha = 1) => { c.save(); c.globalAlpha = alpha; const g = c.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#ead8ae'); g.addColorStop(1, '#dcc28f'); c.fillStyle = g; c.fillRect(x, y, w, h); c.strokeStyle = 'rgba(80,50,20,.6)'; c.lineWidth = 6; c.strokeRect(x + 8, y + 8, w - 16, h - 16); c.restore(); };
  K.pie = (c, x, y, r, slices, lt, opts = {}) => { const u = E.out(K.seg(lt, opts.at ?? 0, (opts.at ?? 0) + 1.4)); let a0 = -Math.PI / 2; const tot = slices.reduce((s, q) => s + q.v, 0);
    c.save(); c.lineWidth = 5; c.strokeStyle = INK; for (const q of slices) { const a1 = a0 + q.v / tot * Math.PI * 2 * u; c.fillStyle = q.col; c.beginPath(); c.moveTo(x, y); c.arc(x, y, r, a0, a1); c.closePath(); c.fill(); c.stroke(); const m = (a0 + a1) / 2; if (u > .9 && q.label) K.outlined(c, q.label, x + Math.cos(m) * r * 1.35, y + Math.sin(m) * r * 1.2, 34, { fam: 'Oswald', ow: .18 }); a0 = a1; } c.restore(); };

  // ---------- subtitles: VO-timed, 2 lines max, move top/bottom to avoid characters ----------
  K.setWords = (words, offset = 0) => { K.words = words.map(w => ({ w: w.w, s: w.s + offset, e: w.e + offset })); const subs = []; let cur = [];
    for (const w of K.words) { cur.push(w); const txt = cur.map(x => x.w).join(' '); if (txt.length > 34 || /[.!?]$/.test(w.w) || (/,$/.test(w.w) && txt.length > 18)) { subs.push(cur); cur = []; } } if (cur.length) subs.push(cur);
    K.subs = subs.map(g => ({ s: g[0].s, e: g[g.length - 1].e + .25, words: g })); };
  K.SUBPOS = {}; // sceneId -> 'top' | 'off'
  K.drawSubs = (c, t, sc) => { const pos = sc && K.SUBPOS[sc.id]; if (pos === 'off') return; const sub = K.subs.find(s => t >= s.s && t < s.e); if (!sub) return;
    c.save(); K.screen(c); c.font = K.font(50, 'Oswald'); c.textAlign = 'center'; c.textBaseline = 'middle'; const txt = sub.words.map(w => w.w).join(' '), y = pos === 'top' ? 120 : H - 96, w = c.measureText(txt).width;
    c.fillStyle = 'rgba(20,14,10,.55)'; c.fillRect(W / 2 - w / 2 - 28, y - 40, w + 56, 80);
    let x = W / 2 - w / 2; c.textAlign = 'left'; for (const wd of sub.words) { const ww = c.measureText(wd.w + ' ').width; c.fillStyle = t >= wd.s ? '#fffaf0' : 'rgba(255,250,240,.55)'; c.fillText(wd.w, x, y + 2); x += ww; } c.restore(); };
  // Find time of a phrase in the VO words (first word match after `after`), for timing cards to speech.
  K.W = (phrase, after = 0) => { const p = phrase.toLowerCase().replace(/[^a-z0-9' ]/g, '').split(/\s+/).filter(Boolean); const norm = s => s.toLowerCase().replace(/[^a-z0-9']/g, '');
    for (let i = 0; i < K.words.length; i++) { if (K.words[i].s < after) continue; let ok = true; for (let j = 0; j < p.length; j++) if (!K.words[i + j] || norm(K.words[i + j].w) !== p[j]) { ok = false; break; } if (ok) return K.words[i].s; } console.warn('W miss', phrase); return null; };

  // ---------- post: grain + vignette ----------
  const grains = []; for (let g = 0; g < 6; g++) { const gc = document.createElement('canvas'); gc.width = 480; gc.height = 270; const gx = gc.getContext('2d'), id = gx.createImageData(480, 270); for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 34; } gx.putImageData(id, 0, 0); grains.push(gc); }
  K.post = (c, t) => { K.screen(c); c.save(); c.globalCompositeOperation = 'overlay'; c.globalAlpha = .5; c.imageSmoothingEnabled = true; c.drawImage(grains[Math.floor(t * FPS) % grains.length], 0, 0, W, H); c.restore();
    const v = c.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, H * 1.05); v.addColorStop(0, 'rgba(20,12,6,0)'); v.addColorStop(1, 'rgba(20,12,6,.42)'); c.fillStyle = v; c.fillRect(0, 0, W, H); };

  // ---------- frame ----------
  const drawScene = (c, s, t) => { c.save(); K.screen(c); c.clearRect(0, 0, W, H); c.fillStyle = '#120c08'; c.fillRect(0, 0, W, H); const lt = t - s.start; s.draw(c, lt, t, K.clamp(lt / (s.end - s.start))); c.restore(); };
  K.frame = (t) => { const cur = K.scenes.filter(s => t >= s.start && t < s.end + K.xfade).sort((a, b) => a.start - b.start);
    const main = cur.filter(s => t < s.end).pop() || K.scenes[K.scenes.length - 1]; const prev = cur.find(s => s !== main && t >= s.end && t < s.end + K.xfade && main.start >= s.end - .01);
    drawScene(ctx, main, t);
    if (prev && main.start <= t && t < main.start + K.xfade) { drawScene(octx, prev, t); ctx.save(); K.screen(ctx); ctx.globalAlpha = 1 - E.sine((t - main.start) / K.xfade); ctx.drawImage(off, 0, 0); ctx.restore(); }
    if (K.overlay) { ctx.save(); K.screen(ctx); K.overlay(ctx, t, main); ctx.restore(); }
    K.drawSubs(ctx, t, main); K.post(ctx, t); };
  K.boot = async () => { await document.fonts.ready; await Promise.all(['Anton', 'Oswald', 'Caveat'].map(f => document.fonts.load(`40px ${f}`))); await K.ready(); window.KIT_READY = true; };
  G.KIT = K;
})(window);
