/* Script 5 v8 film runtime: all 14 scenes on one page and one MASTER timeline.
   - One background stack (#BG): each scene's ground fades in over the last one as a lighting change, never a frame dissolve.
   - One network (#NET) for the whole film: its lines join point to point, slowly, from the first second to the last.
   - Foreground (#FG): a scene's layer fades in under its own entrances and fades out under its own exits; nothing cuts.
   - One carry layer (#CARRY): an object leaving scene N travels in one smooth Easy Ease move straight onto the real element it
     becomes in scene N+1 (the old "hold on a pose, then swap" is gone), changing its look on the way. */
const FILM = {scenes: [], total: 0};
function beginScene(p) {
  Object.assign(window, {TOTAL: p.dur, BEATS: p.beats, W: p.words, T0: p.start, TAIL: p.tail, XF: 1, PREV: p.prev, CLOSED: false,
    PORTAL: undefined, PORTAL_SLOW: undefined, PORTAL_EASE: undefined});
  const fg = document.createElement('div'), bg = document.createElement('div');
  fg.className = 'scn'; bg.className = 'scn';
  document.getElementById('FG').appendChild(fg); document.getElementById('BG').appendChild(bg);
  SC = {n: p.n, fg, bg, p}; CUES = [];
  tl = gsap.timeline(); MASTER.add(tl, p.start);
  FILM.scenes.push(SC);
}
function endScene() {
  const p = SC.p, t0 = p.start, t1 = p.start + p.dur, last = !p.tail, first = t0 === 0;
  const {fg, bg} = SC;
  // display windows (inactive scenes cost nothing to draw); fg is on a little early so the next scene's targets can be measured
  MASTER.set([fg, bg], {display: 'none'}, 0);
  MASTER.set(fg, {display: 'block'}, Math.max(0, t0 - 1.9));
  MASTER.set(bg, {display: 'block'}, t0);
  if (!last) { MASTER.set(fg, {display: 'none'}, t1 + p.tail + .05); MASTER.set(bg, {display: 'none'}, t1 + 1.6); }
  if (first) { MASTER.set([fg, bg], {display: 'block'}, 0); }
  // foreground: in with its own entrances, out under its own exits
  if (!first) { MASTER.fromTo(fg, {opacity: 0}, {opacity: 1, duration: .55, ease: 'sine.inOut', immediateRender: true}, t0); MASTER.fromTo(bg, {opacity: 0}, {opacity: 1, duration: 1.1, ease: 'sine.inOut', immediateRender: true}, t0 - .1); }
  if (!last) MASTER.to(fg, {opacity: 0, duration: p.tail + .05, ease: 'sine.inOut'}, t1);
  SC = null;
}
/* the film-long network: ~90 points, each joined to its 2 nearest; links draw one by one across the whole film */
function globalNet(T) {
  let s = 4242; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const N = [];
  for (let i = 0; i < 92; i++) N.push([-140 + rnd() * 2200, -100 + rnd() * 1280, 2 + rnd() * 3.5]);
  const E = [];
  N.forEach((a, i) => N.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2]).filter(q => q[0] > i).sort((p, q) => p[1] - q[1]).slice(0, 2).forEach(([j]) => E.push([i, j])));
  // order: a slow wave from the first point outwards, with a little shuffle, so it keeps growing everywhere
  const key = ([i, j]) => Math.hypot((N[i][0] + N[j][0]) / 2 - 300, (N[i][1] + N[j][1]) / 2 - 200) + rnd() * 700;
  E.sort((a, b) => key(a) - key(b));
  const ns = 'http://www.w3.org/2000/svg', host = document.getElementById('NET');
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('width', 1920); svg.setAttribute('height', 1080); svg.style.cssText = 'position:absolute;left:0;top:0;overflow:visible';
  host.appendChild(svg);
  const born = N.map(() => 1e9), span = T * .92, start = .2;
  E.forEach(([i, j], k) => {
    const t = start + span * k / E.length, d = 3.2;
    const l = document.createElementNS(ns, 'line');
    Object.entries({x1: N[i][0], y1: N[i][1], x2: N[i][0], y2: N[i][1], stroke: 'rgba(98,178,228,.42)', 'stroke-width': 1.4, 'stroke-linecap': 'round'}).forEach(([a, v]) => l.setAttribute(a, v));
    svg.appendChild(l);
    MASTER.fromTo(l, {attr: {x2: N[i][0], y2: N[i][1]}}, {attr: {x2: N[j][0], y2: N[j][1]}, duration: d, ease: 'sine.inOut', immediateRender: true}, t);
    born[i] = Math.min(born[i], t); born[j] = Math.min(born[j], t + d);
  });
  N.forEach((a, i) => {
    const c = document.createElementNS(ns, 'circle'); Object.entries({cx: a[0], cy: a[1], r: a[2], fill: 'rgba(140,205,242,.85)'}).forEach(([k, v]) => c.setAttribute(k, v));
    svg.appendChild(c);
    const t = Math.min(born[i], T - 1);
    MASTER.fromTo(c, {opacity: 0, attr: {r: 0}}, {opacity: 1, attr: {r: a[2]}, duration: 1.2, ease: 'sine.out', immediateRender: true}, t);
    // a soft breathing glow on each point, never still
    MASTER.to(c, {opacity: .45, duration: 2.4 + (i % 5) * .4, ease: 'sine.inOut', yoyo: true, repeat: Math.floor((T - t) / 3)}, t + 1.2);
  });
  // the whole network drifts in depth, slowly, for the whole film
  gsap.set(svg, {transformOrigin: '960px 540px'});
  MASTER.fromTo(svg, {scale: 1.0, x: 0, y: 0}, {scale: 1.12, x: -30, y: -18, duration: T, ease: 'none', immediateRender: true}, 0);
}
const samePose = (a, b) => a && b && !a.nodeType && !a.in && !b.nodeType && !b.in && Math.abs(a.x - b.x) < 3 && Math.abs(a.y - b.y) < 3;
/* scene N's outgoing chip + scene N+1's incoming chip (they meet on the same pose) become ONE object with ONE move */
function mergeCarries() {
  const out = [];
  for (let k = 0; k + 1 < FILM.scenes.length; k++) {
    const A = FILM.scenes[k], B = FILM.scenes[k + 1];
    const isPose = q => q && !q.nodeType && !q.in;
    const outs = CHIPS.filter(c => c.scene === A.n && c.segs.length), ins = CHIPS.filter(c => c.scene === B.n && c.segs.length && isPose(c.segs[0].A) && c.segs[0].t < 1);
    ins.forEach(ci => {
      const si = ci.segs[0];
      const co = outs.find(c => !c.used && samePose(c.segs[c.segs.length - 1].B, si.A));
      if (!co) { out.push(`sc${B.n}: incoming chip with no partner`); return; }
      co.used = true; ci.dead = true; ci.style.display = 'none';
      const so = co.segs[co.segs.length - 1], dT = B.p.start - A.p.start;
      const tEnd = dT + si.t + si.d;                     // in scene A's clock
      // ONE move from where it left to where it lands; the rest of the incoming path follows
      so.B = si.B; so.d = tEnd - so.t; so.ez = gsap.parseEase('power2.inOut');
      ci.segs.slice(1).forEach(g => co.segs.push(Object.assign({}, g, {t: g.t + dT})));
      // the incoming look rides inside the carried object and takes over on the way
      const lay = ci.cloneNode(true); lay.style.cssText = ci.style.cssText; lay.style.left = '0px'; lay.style.top = '0px'; lay.style.width = '100%'; lay.style.height = '100%'; lay.style.display = 'block'; lay.style.opacity = 0;
      co.appendChild(lay); co.style.overflow = 'visible';
      if (ci.fit) { const k2 = lay.lastElementChild; co.fit2 = {k: k2, W0: ci.fit.W0, H0: ci.fit.H0}; lay.style.overflow = 'visible'; }
      const a0 = A.p.start + so.t, a1 = A.p.start + tEnd;
      MASTER.fromTo(lay, {opacity: 0}, {opacity: 1, duration: (a1 - a0) * .55, ease: 'sine.inOut', immediateRender: false}, a0 + (a1 - a0) * .2);
      const own = [...co.children].filter(e => e !== lay);
      if (own.length && co.fit) MASTER.to(own, {opacity: 0, duration: (a1 - a0) * .55, ease: 'sine.inOut'}, a0 + (a1 - a0) * .2);
      // it disappears exactly when the incoming chip used to (the real element is in place by then)
      let tOff = null;
      const all = MASTER.getChildren(true, true, false).filter(t => t.targets && t.targets().includes(ci));
      const absT = t => t.startTime() + (t.parent && t.parent !== MASTER ? t.parent.startTime() : 0);
      all.forEach(t => {
        if (t.vars.opacity === 0) { const abs = absT(t); if (tOff === null || abs < tOff) tOff = abs; t.kill(); return; }
        // any other change the incoming chip made to itself (outline, radius, colour) now happens to the carried object
        const v = Object.assign({}, t.vars); ['onUpdate', 'onComplete', 'immediateRender', 'startAt', 'parent'].forEach(k => delete v[k]);
        if (Object.keys(v).some(k => !['duration', 'ease', 'delay'].includes(k)) && t.duration() > 0) { MASTER.to([co, lay], Object.assign(v, {duration: t.duration()}), absT(t)); }
        t.kill();
      });
      if (tOff === null) tOff = a1;
      tOff = Math.max(tOff, a1 - .05);
      MASTER.to(co, {opacity: 0, duration: .3, ease: 'sine.inOut'}, tOff);
      co.endAt = tOff + .35;
    });
  }
  return out;
}
function finalizeFilm() {
  FILM.total = Math.max(...FILM.scenes.map(s => s.p.start + s.p.dur + s.p.tail));
  globalNet(FILM.total);
  const report = mergeCarries();
  // every carried object is drawn only while it is in use
  CHIPS.forEach(c => {
    if (c.dead) return;
    const sc = FILM.scenes.find(s => s.n === c.scene), t0 = sc.p.start + Math.max(0, c.segs.length ? c.segs[0].t - .02 : 0);
    MASTER.set(c, {display: 'none'}, 0); MASTER.set(c, {display: 'block'}, Math.max(.001, t0));
    MASTER.set(c, {display: 'none'}, c.endAt || (sc.p.start + sc.p.dur + sc.p.tail + .05));
  });
  MASTER.set({}, {}, FILM.total);
  window.CUESBY = CUESBY; window.FILM_REPORT = report; window.DURATION = FILM.total;
  window.seek = t => { MASTER.seek(t, false); LIVE.forEach(f => f()); };
  window.seek(0);
  window.ready = true;
}
