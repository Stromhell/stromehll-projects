// Shot framework on top of KIT + RIG. An act page sets window.TIMING (timing.json) and window.SHOTS (one object per shot),
// then calls ANIM.build(). Each shot becomes a KIT scene timed to its VO.
// Shot fields:
//   plate: name of painted plate (KIT.imgs) | draw: (c, lt, u, S) custom background in screen space
//   cam: {z:[z0,z1], x:[..], y:[..], ease}  camera over the 2560x1440 plate (world coords)
//   figs: [{x, y, s, pose, costume, facing, hair, ..., walk:{x0,x1,t0,dur}, talk:[t0,t1], anim:(o,lt,u)=>{}}]  world coords
//   live: [(c, lt, u, S) => {}]   world-space animated layers drawn after the plate, before figures (fire, smoke, props)
//   front: [(c, lt, u, S) => {}]  world-space layers drawn after figures (foreground)
//   over: [(c, lt, u, S) => {}]   screen-space overlays (cards, titles, counters)
//   sfx: [[time|'phrase', name, gain]]  time in seconds from the shot start, or a VO phrase (cue at that word)
//   bed: 'wind_loop' | [name, gain]   ambience bed under the shot
//   sub: 'top' | 'off'              subtitle position
//   inSfx: name | false             transition sound at the cut (default whoosh_soft)
(function (G) {
  const K = G.KIT, R = G.RIG, A = {};
  A.beds = [];
  // phrase time inside a shot (seconds from shot start), searching only this shot's words
  A.at = (S, phrase, dflt = 0) => { const t = K.W(phrase, S.vo_start - .05); return t == null || t > S.end ? dflt : t - S.start; };
  A.figure = (c, f, lt, u, S) => {
    const make = (tt) => { const o = Object.assign({ t: tt + (f.phase ?? 0), phase: f.phase ?? 0, seed: f.seed ?? 3, shadowAlpha: .3 }, f);
      if (f.walk) { const w = f.walk, x = R.walkX ? R.walkX(tt, w.x0, w.x1, w.t0 ?? 0, w.dur, f.s) : null; if (x) { o.x = x.x; o.t = x.phase; o.walkPhase = x.phase; o.pose = tt >= (w.t0 ?? 0) && tt <= (w.t0 ?? 0) + w.dur ? (w.pose || 'walk') : (f.pose || 'stand'); o.facing = Math.sign(w.x1 - w.x0) || f.facing; } }
      if (f.talk) { const [a, b] = Array.isArray(f.talk) ? f.talk : [0, 99]; o.talk = tt >= a && tt <= b; }
      if (f.anim) f.anim(o, tt, u, S); return o; };
    const o = make(lt);
    if (!G.RIGSTYLE || G.RIGSTYLE === 'round') { // original round-head path
    // smooth the joints: average the pose over the last ~0.3 s so pose changes ease in instead of snapping
    if (R.poseAngles && o.pose !== 'walk' && o.pose !== 'run' && !f.noSmooth) {
      const N = 7, dt = .045, acc = {}, P0 = R.poseAngles(o, o.t); let ws = 0;
      for (let k = 0; k <= N; k++) { const ok = k ? make(lt - k * dt) : o, P = k ? R.poseAngles(ok, ok.t) : P0, w = 1 - k / (N + 1) * .6;
        if (ok.pose === 'walk' || ok.pose === 'run') continue;
        for (const key in P0) if (typeof P0[key] === 'number' || typeof P[key] === 'number') acc[key] = (acc[key] || 0) + (+P[key] || 0) * w; ws += w; }
      const P = Object.assign({}, P0); for (const key in acc) P[key] = acc[key] / ws; if (!P0.chin) P.chin = acc.chin ? acc.chin / ws : 0; o.P = P; }
    R.figure(c, o); return; }
    // Spring-smoothed joints: weight past poses by an underdamped impulse response so a move
    // starts with a little lag, swings slightly past the target and settles (follow-through).
    if (R.poseAngles && o.pose !== 'walk' && o.pose !== 'run' && !f.noSmooth) {
      // two springs: the upper arm, legs and lean follow fast; forearms and hands follow slower, so they drag
      // behind and overshoot a touch (overlapping action from the reference clips).
      const N = 22, dt = .04, z = .5, spring = w0 => { const wd = w0 * Math.sqrt(1 - z * z); return tau => Math.exp(-z * w0 * tau) * Math.sin(wd * tau); };
      const fast = spring(11), slow = spring(7.5), isSlow = key => /^el/.test(key);
      const accF = {}, accS = {}, P0 = R.poseAngles(o, o.t); let wsF = 0, wsS = 0;
      for (let k = 0; k <= N; k++) { const tau = (k + .5) * dt, wf = fast(tau), wl = slow(tau); const ok = k ? make(lt - k * dt) : o; if (ok.pose === 'walk' || ok.pose === 'run') continue; const P = k ? R.poseAngles(ok, ok.t) : P0;
        for (const key in P0) if (typeof P0[key] === 'number' || typeof P[key] === 'number') { const v = +P[key] || 0; accF[key] = (accF[key] || 0) + v * wf; accS[key] = (accS[key] || 0) + v * wl; }
        wsF += wf; wsS += wl; }
      if (wsF > .25) { const P = Object.assign({}, P0); let E = 0;
        for (const key in accF) { P[key] = isSlow(key) && wsS > .25 ? accS[key] / wsS : accF[key] / wsF; if (/^(sh|el|hip|knee)/.test(key)) E += Math.abs(P[key] - (+P0[key] || 0)); }
        // anticipation: just before a big change, ease a little the opposite way first (wind-up), like the sword swing and the shout
        const TA = .2, ok2 = make(lt + TA); if (ok2.pose !== 'walk' && ok2.pose !== 'run') { const PF = R.poseAngles(ok2, ok2.t);
          for (const key in P) { if (!/^(sh|el|hip|knee|lean)/.test(key) || typeof PF[key] !== 'number') continue; const now = +P0[key] || 0, ahead = PF[key] - P[key], lag = Math.abs(now - P[key]);
            if (Math.abs(ahead) > 12 && lag < 15) { let v = P[key] - ahead * .16 * (1 - lag / 15); if (/^el/.test(key)) v = Math.min(v, 0); P[key] = v; } } }
        if (!P0.chin) P.chin = Math.max(0, Math.min(1, accF.chin ? accF.chin / wsF : 0)); o.P = P; o.squash = Math.min(.045, E / 1400); }
    }
    A.lit(c, o, S);
  };
  // Draw a figure so it sits in the set: cast shadow on the floor, ambient colour from the plate,
  // key light on one side, darker feet. light = { dir: -1 (from the left) | 1, key, amb, shadow }.
  const OC = document.createElement('canvas'), SC = document.createElement('canvas'), PX = document.createElement('canvas'); PX.width = PX.height = 1;
  A.lit = (c, o, S) => {
    const L = Object.assign({ dir: -1, key: 'rgba(255,236,204,.20)', shadow: .32 }, G.LIGHT || {}, (S && S.D && S.D.light) || {});
    if (S && !S._amb) { try { const px = PX.getContext('2d', { willReadFrequently: true }); px.drawImage(c.canvas, 0, 0, 1, 1); const d = px.getImageData(0, 0, 1, 1).data; S._amb = `rgb(${d[0]},${d[1]},${d[2]})`; } catch (e) { S._amb = 'rgb(90,80,70)'; } }
    const amb = L.amb || (S && S._amb) || 'rgb(90,80,70)';
    const M = c.getTransform(), gx = M.a * o.x + M.c * o.y + M.e, gy = M.b * o.x + M.d * o.y + M.f, sc = Math.abs(M.a) * (o.s ?? 1) * .8;
    if (o.pose === 'lie' || sc < .05) { R.figure(c, o); return; }
    const w = Math.ceil(560 * sc), h = Math.ceil(620 * sc), left = Math.floor(gx - w / 2), top = Math.floor(gy - h + 40 * sc);
    if (OC.width < w || OC.height < h) { OC.width = SC.width = Math.max(w, OC.width); OC.height = SC.height = Math.max(h, OC.height); }
    const oc = OC.getContext('2d'), sx = SC.getContext('2d');
    oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, OC.width, OC.height); oc.setTransform(M.a, M.b, M.c, M.d, M.e - left, M.f - top);
    R.figure(oc, Object.assign({}, o, { shadow: false }));
    oc.setTransform(1, 0, 0, 1, 0, 0);
    // cast shadow from the silhouette
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.clearRect(0, 0, SC.width, SC.height); sx.drawImage(OC, 0, 0); sx.globalCompositeOperation = 'source-in'; sx.fillStyle = 'rgb(18,12,10)'; sx.fillRect(0, 0, SC.width, SC.height); sx.globalCompositeOperation = 'source-over';
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalAlpha = L.shadow; c.filter = `blur(${Math.max(1, 5 * sc)}px)`;
    c.translate(gx, gy); c.transform(1, 0, .55 * L.dir, -.26, 0, 0); c.drawImage(SC, 0, 0, w, h, left - gx, top - gy, w, h); c.restore();
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); const cg = c.createRadialGradient(gx, gy, 0, gx, gy, 70 * sc); cg.addColorStop(0, 'rgba(18,12,10,.38)'); cg.addColorStop(1, 'rgba(18,12,10,0)'); c.translate(0, gy); c.scale(1, .22); c.translate(0, -gy); c.fillStyle = cg; c.beginPath(); c.arc(gx, gy, 70 * sc, 0, 7); c.fill(); c.restore();
    // light the figure: ambient wash, key light on the lit side, shade on the far side, darker toward the feet
    oc.globalCompositeOperation = 'source-atop';
    oc.globalAlpha = .16; oc.fillStyle = amb; oc.fillRect(0, 0, w, h); oc.globalAlpha = 1;
    const kx = L.dir < 0 ? 0 : w, lg = oc.createLinearGradient(kx, 0, w - kx, 0); lg.addColorStop(0, L.key); lg.addColorStop(.45, 'rgba(255,236,204,0)'); lg.addColorStop(.62, 'rgba(20,18,40,0)'); lg.addColorStop(1, 'rgba(20,18,40,.16)'); oc.fillStyle = lg; oc.fillRect(0, 0, w, h);
    const fg = oc.createLinearGradient(0, h - 200 * sc, 0, h - 40 * sc); fg.addColorStop(0, 'rgba(10,8,6,0)'); fg.addColorStop(1, 'rgba(10,8,6,.22)'); oc.fillStyle = fg; oc.fillRect(0, 0, w, h);
    oc.globalCompositeOperation = 'source-over';
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(OC, 0, 0, w, h, left, top, w, h); c.restore();
  };
  A.build = () => {
    const T = G.TIMING, SH = G.SHOTS; K.setWords(T.words);
    T.shots.forEach((S, i) => {
      const D = SH[i] || {}; S.D = D;
      const sc = K.scene('s' + (i + 1), S.start, S.end, (c, lt, t, u) => {
        if (D.plate) K.plate(c, D.plate, D.cam || {}, u);
        else if (D.draw) { K.screen(c); D.draw(c, lt, u, S); }
        K.world(c, D.cam || {}, u);
        for (const L of D.live || []) { c.save(); L(c, lt, u, S); c.restore(); }
        const figs = (D.figs || []).slice().sort((a, b) => a.y - b.y);
        for (const f of figs) { c.save(); A.figure(c, f, lt, u, S); c.restore(); }
        for (const L of D.front || []) { c.save(); L(c, lt, u, S); c.restore(); }
        K.screen(c);
        for (const L of D.over || []) { c.save(); L(c, lt, u, S); c.restore(); }
      }, { whoosh: false, xfade: D.xfade });
      if (D.inSfx !== false && i > 0) K.cue(S.start + .1, D.inSfx || 'whoosh_soft', .5);
      for (const [when, name, gain] of D.sfx || []) { const tt = typeof when === 'string' ? A.at(S, when, 0) : when; K.cue(S.start + tt, name, gain ?? 1); }
      if (D.bed) { const list = Array.isArray(D.bed) && Array.isArray(D.bed[0]) ? D.bed : [D.bed]; for (const b of list) { const [n, g] = Array.isArray(b) ? b : [b, 1]; A.beds.push({ start: S.start, end: S.end + .8, name: n, gain: g ?? 1 }); } }
      if (D.sub) K.SUBPOS[sc.id] = D.sub;
    });
    K.dur = T.dur; G.KIT_BEDS = A.beds;
  };
  // ----- reusable live layers -----
  // flickering campfire in world coords (flames, embers, glow)
  A.fire = (x, y, s = 1, opts = {}) => (c, lt) => {
    const P = G.P2; const fl = .85 + .15 * Math.sin(lt * 13) * Math.sin(lt * 7.3 + 1);
    c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(x, y - 40 * s, 0, x, y - 40 * s, (opts.glow ?? 520) * s * fl); g.addColorStop(0, `rgba(255,150,60,${.5 * fl})`); g.addColorStop(.4, 'rgba(255,120,40,.15)'); g.addColorStop(1, 'rgba(255,100,30,0)'); c.fillStyle = g; c.fillRect(x - 600 * s, y - 650 * s, 1200 * s, 1200 * s); c.restore();
    for (let k = 0; k < 7; k++) { const ph = lt * (2.2 + k * .37) + k * 1.7, h = (70 + 50 * Math.sin(ph) + k * 8) * s * fl, w = (22 + 6 * Math.sin(ph * 1.3)) * s, dx = (k - 3) * 11 * s + Math.sin(ph * 1.7) * 5 * s;
      const gr = c.createLinearGradient(x + dx, y, x + dx, y - h); gr.addColorStop(0, 'rgba(255,240,170,.95)'); gr.addColorStop(.35, 'rgba(255,170,60,.9)'); gr.addColorStop(1, 'rgba(220,60,20,0)'); c.fillStyle = gr;
      c.beginPath(); c.moveTo(x + dx - w, y - 6 * s); c.quadraticCurveTo(x + dx - w * .8, y - h * .5, x + dx + Math.sin(ph * 2) * 8 * s, y - h); c.quadraticCurveTo(x + dx + w * .8, y - h * .5, x + dx + w, y - 6 * s); c.closePath(); c.fill(); }
    for (let k = 0; k < 16; k++) { const life = ((lt * .6 + k * .137) % 1), ex = x + Math.sin(k * 3.1 + lt * 1.3) * 40 * s * life + (k - 8) * 3 * s, ey = y - 60 * s - life * 380 * s; c.fillStyle = `rgba(255,${180 - life * 100 | 0},80,${(1 - life) * .9})`; c.fillRect(ex, ey, 3 * s, 3 * s); }
  };
  // rising smoke wisps
  A.smoke = (x, y, s = 1, col = '230,220,205') => (c, lt) => { for (let k = 0; k < 14; k++) { const life = ((lt * .12 + k / 14) % 1), sx = x + Math.sin(life * 5 + k) * 30 * s * life + life * 120 * s, sy = y - life * 600 * s, rad = (20 + life * 90) * s; const g = c.createRadialGradient(sx, sy, 0, sx, sy, rad); g.addColorStop(0, `rgba(${col},${.14 * (1 - life)})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(sx - rad, sy - rad, rad * 2, rad * 2); } };
  // drifting mist band
  A.mist = (y, h, al = .25, speed = 18) => (c, lt) => { for (let k = 0; k < 10; k++) { const x = ((k * 400 + lt * speed * (1 + k % 3 * .4)) % 3200) - 320, rad = 300 + k % 4 * 60; const g = c.createRadialGradient(x, y + (k % 3) * h / 3, 0, x, y + (k % 3) * h / 3, rad); g.addColorStop(0, `rgba(255,236,215,${al})`); g.addColorStop(1, 'rgba(255,236,215,0)'); c.fillStyle = g; c.fillRect(x - rad, y - rad, rad * 2, rad * 2 + h); } };
  // birds flapping across the sky
  A.birds = (x0, y0, n = 5, speed = 60, s = 1) => (c, lt) => { c.strokeStyle = 'rgba(40,30,30,.75)'; c.lineCap = 'round'; c.lineWidth = 2.4 * s; for (let k = 0; k < n; k++) { const x = x0 + lt * speed + k * 46 * s + Math.sin(k * 2) * 20, y = y0 + Math.sin(k * 1.7) * 30 * s + Math.sin(lt * 1.3 + k) * 6, f = Math.sin(lt * 9 + k * 1.3) * 7 * s, w = 13 * s; c.beginPath(); c.moveTo(x - w, y - f); c.quadraticCurveTo(x - w * .4, y - f * .6 - 3, x, y); c.quadraticCurveTo(x + w * .4, y - f * .6 - 3, x + w, y - f); c.stroke(); } };
  // dust particles floating in a light beam
  A.dust = (x, y, w, h, n = 40) => (c, lt) => { for (let k = 0; k < n; k++) { const px = x + ((k * 97.3 + lt * (6 + k % 5)) % w), py = y + ((k * 53.1 + Math.sin(lt * .5 + k) * 20) % h); c.fillStyle = `rgba(255,240,210,${.25 + .25 * Math.sin(lt * 2 + k)})`; c.beginPath(); c.arc(px, py, 1.5 + k % 3, 0, 7); c.fill(); } };
  // glowing screen/rectangle with flicker (world coords)
  A.glowRect = (x, y, w, h, col = '120,200,255', al = .5) => (c, lt) => { const f = al * (.9 + .1 * Math.sin(lt * 20)); c.save(); c.globalCompositeOperation = 'screen'; const g = c.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, Math.max(w, h)); g.addColorStop(0, `rgba(${col},${f})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x - w, y - h, w * 3, h * 3); c.restore(); };
  // screen-space helpers: dim the frame, letterbox, colour grade
  A.grade = (col = '20,40,90', al = .25, mode = 'multiply') => (c) => { c.save(); c.globalCompositeOperation = mode; c.fillStyle = `rgba(${col},${al})`; c.fillRect(0, 0, K.ctx.canvas.width, K.H); c.restore(); };
  A.dim = (al = .45) => (c) => { c.fillStyle = `rgba(10,6,4,${al})`; c.fillRect(0, 0, K.ctx.canvas.width, K.H); };
  // split screen: two draws side by side with a wipe from the centre
  A.split = (left, right, opts = {}) => (c, lt, u, S) => { const a = K.E.out(K.seg(lt, opts.at ?? 0, (opts.at ?? 0) + .8)), half = K.ctx.canvas.width / 2;
    c.save(); c.beginPath(); c.rect(half - half * a, 0, half * a, K.H); c.clip(); c.translate(-half / 2 * (1 - a) * 0, 0); left(c, lt, u, S); c.restore();
    c.save(); c.beginPath(); c.rect(half, 0, half * a, K.H); c.clip(); right(c, lt, u, S); c.restore();
    c.fillStyle = '#1d1712'; c.fillRect(half - 4, 0, 8, K.H * a); };
  G.ANIM = A;
})(window);
