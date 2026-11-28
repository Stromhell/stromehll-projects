/* Script 5 v9 film runtime: ONE continuous shot.
   - Every scene is a STATION placed in one 3D space (#RIG). Nothing ever fades in or out as a layer: the film camera travels
     from station to station (pull back a little, glide with a slight turn, settle), or flies forward through a lens into the next one.
   - One animated gradient ground for the whole film (#BG): soft colour fields that never stop drifting. A station's own light
     arrives with the camera move as a soft-edged wash (same direction and timing as the move), never as a dissolve.
   - One network (#NET) that keeps joining up, lighter than v8.
   - One carry layer (#CARRY): an object leaving station N travels in one move onto the real element it becomes in station N+1. */
const FILM = {scenes: [], total: 0};
const DIRS = {2: 'S', 3: 'R', 4: 'D', 5: 'Z', 6: 'R', 7: 'U', 8: 'R', 9: 'D', 10: 'R', 11: 'U', 12: 'R', 13: 'Z', 14: 'D'};
const LENS = {2: [960, 600], 5: [1370, 430], 13: [1390, 650]};
const REVEAL = {12: {t: 1.0, d: 1.3, at: [960, 500]}};      // scene 12 keeps the blue ground until its card lights up
const STEP = {R: [2500, 0, 0], L: [-2500, 0, 0], D: [0, 1560, 0], U: [0, -1560, 0]};
let POS = [0, 0, 0];
function beginScene(p) {
  Object.assign(window, {TOTAL: p.dur, BEATS: p.beats, W: p.words, T0: p.start, TAIL: p.tail, XF: 1, PREV: p.prev, CLOSED: false,
    PORTAL: undefined, PORTAL_SLOW: undefined, PORTAL_EASE: undefined});
  const d = DIRS[p.n] || '';
  if (STEP[d]) POS = POS.map((v, i) => v + STEP[d][i]);
  else if (d === 'Z') { const l = LENS[p.n]; POS = [POS[0] + l[0] - 960, POS[1] + l[1] - 540, POS[2] - 2400]; }
  const fg = document.createElement('div'), bg = document.createElement('div');
  fg.className = 'scn'; bg.className = 'scn bgl';
  fg.style.transform = `translate3d(${POS[0]}px,${POS[1]}px,${POS[2]}px)`;
  document.getElementById('RIG').appendChild(fg); document.getElementById('BG').appendChild(bg);
  SC = {n: p.n, fg, bg, p, pos: POS.slice(), dir: d}; CUES = [];
  tl = gsap.timeline(); MASTER.add(tl, p.start);
  FILM.scenes.push(SC);
}
function endScene() { SC = null; }
/* soft colour fields for one ground layer; every layer of a theme moves identically (driven by film time), so two neighbours of the same theme are one ground */
const BLOBS = [];
const BL = {
  dark: [['rgba(67,164,220,.42)', 1500, 200, 60], ['rgba(30,96,170,.55)', 1300, 1500, 760], ['rgba(120,200,245,.20)', 1000, 900, 420], ['rgba(10,38,71,.9)', 1400, 300, 900]],
  light: [['rgba(67,164,220,.34)', 1500, 400, 900], ['rgba(255,255,255,.95)', 1300, 1400, 200], ['rgba(140,205,242,.40)', 1100, 1500, 820], ['rgba(190,226,246,.6)', 1000, 300, 200]],
  blue: [['rgba(255,255,255,.40)', 1400, 500, 120], ['rgba(20,90,150,.50)', 1400, 1500, 860], ['rgba(140,215,250,.50)', 1100, 1000, 480], ['rgba(31,111,163,.5)', 1200, 200, 800]]};
function ground(sc) {
  (BL[sc.theme] || BL.dark).forEach(([c, s, x, y], i) => {
    const b = document.createElement('div');
    b.style.cssText = `position:absolute;left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle,${c} 0%,transparent 68%);will-change:transform`;
    sc.bg.appendChild(b); BLOBS.push({b, i, sc});
  });
}
function moveGround() {
  const t = MASTER.time();
  for (const {b, i, sc} of BLOBS) {
    if (sc.bg.style.display === 'none') continue;
    const x = Math.sin(t / (9 + i * 2.3) + i * 1.7) * 330 + Math.sin(t / (23 + i) + i) * 150, y = Math.cos(t / (11 + i * 1.9) + i * 2.1) * 210 + Math.sin(t / 19 + i * 3) * 90;
    b.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${(1.08 + Math.sin(t / (13 + i * 3) + i) * .16).toFixed(4)})`;
  }
}
/* the film-long network: lighter than v8; links draw one by one across the whole film */
function globalNet(T) {
  let s = 4242; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const N = [];
  for (let i = 0; i < 54; i++) N.push([-140 + rnd() * 2200, -100 + rnd() * 1280, 1.6 + rnd() * 2.6]);
  const E = [];
  N.forEach((a, i) => N.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2]).filter(q => q[0] > i).sort((p, q) => p[1] - q[1]).slice(0, 2).forEach(([j]) => E.push([i, j])));
  const key = ([i, j]) => Math.hypot((N[i][0] + N[j][0]) / 2 - 300, (N[i][1] + N[j][1]) / 2 - 200) + rnd() * 700;
  E.sort((a, b) => key(a) - key(b));
  const ns = 'http://www.w3.org/2000/svg', host = document.getElementById('NET');
  const svg = document.createElementNS(ns, 'svg'); svg.setAttribute('width', 1920); svg.setAttribute('height', 1080); svg.style.cssText = 'position:absolute;left:0;top:0;overflow:visible';
  host.appendChild(svg);
  const born = N.map(() => 1e9), span = T * .92, start = .2;
  E.forEach(([i, j], k) => {
    const t = start + span * k / E.length, d = 4.5;
    const l = document.createElementNS(ns, 'line');
    Object.entries({x1: N[i][0], y1: N[i][1], x2: N[i][0], y2: N[i][1], stroke: 'rgba(98,178,228,.30)', 'stroke-width': 1.2, 'stroke-linecap': 'round'}).forEach(([a, v]) => l.setAttribute(a, v));
    svg.appendChild(l);
    MASTER.fromTo(l, {attr: {x2: N[i][0], y2: N[i][1]}}, {attr: {x2: N[j][0], y2: N[j][1]}, duration: d, ease: 'sine.inOut', immediateRender: true}, t);
    born[i] = Math.min(born[i], t); born[j] = Math.min(born[j], t + d);
  });
  N.forEach((a, i) => {
    const c = document.createElementNS(ns, 'circle'); Object.entries({cx: a[0], cy: a[1], r: a[2], fill: 'rgba(140,205,242,.6)'}).forEach(([k, v]) => c.setAttribute(k, v));
    svg.appendChild(c);
    const t = Math.min(born[i], T - 1);
    MASTER.fromTo(c, {opacity: 0}, {opacity: 1, duration: 1.6, ease: 'sine.out', immediateRender: true}, t);
  });
  gsap.set(svg, {transformOrigin: '960px 540px'});
  MASTER.fromTo(svg, {scale: 1.0, x: 0, y: 0}, {scale: 1.1, x: -30, y: -18, duration: T, ease: 'none', immediateRender: true}, 0);
  return svg;
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
      co.used = true; ci.dead = true; const disp0 = ci.style.display; ci.style.display = 'none';
      const so = co.segs[co.segs.length - 1], dT = B.p.start - A.p.start;
      const tEnd = dT + si.t + si.d;                     // in scene A's clock
      // ONE move from where it left to where it lands; the rest of the incoming path follows
      so.B = si.B; so.d = tEnd - so.t; so.ez = gsap.parseEase('power2.inOut');
      ci.segs.slice(1).forEach(g => co.segs.push(Object.assign({}, g, {t: g.t + dT})));
      // the incoming look rides inside the carried object and takes over on the way
      const lay = ci.cloneNode(true); lay.style.cssText = ci.style.cssText; lay.style.left = '0px'; lay.style.top = '0px'; lay.style.width = '100%'; lay.style.height = '100%'; lay.style.display = disp0 || 'block'; lay.style.opacity = 0;
      if (!co.children.length && co.textContent.trim() && co.textContent.trim() === lay.textContent.trim()) { [...lay.childNodes].forEach(n => { if (n.nodeType === 3) n.textContent = ''; }); lay.style.zIndex = -1; co.style.isolation = 'isolate'; }   // same words: keep one copy
      co.appendChild(lay); if (!co.keepClip) co.style.overflow = 'visible';
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
/* the one camera: travels between stations; the ground's light arrives with it */
function camera(net) {
  const rig = document.getElementById('RIG'), dolly = document.getElementById('DOLLY'), S = FILM.scenes;
  gsap.set(rig, {x: 0, y: 0, z: 0}); gsap.set(dolly, {z: 0, rotationY: 0, rotationX: 0, transformOrigin: '960px 540px'});
  const mask = (bg, css) => { bg.style.webkitMaskImage = css; bg.style.maskImage = css; };
  S.forEach((B, k) => {
    const {fg, bg} = B, t0s = B.p.start, t1 = t0s + B.p.dur + B.p.tail, last = k === S.length - 1;
    ground(B);
    MASTER.set([fg, bg], {display: k ? 'none' : 'block'}, 0);
    if (!k) return;
    const A = S[k - 1], d = B.dir, lens = LENS[B.n];
    let t0, du, ease = 'power2.inOut';
    if (d === 'S') { t0 = t0s; du = 1.5; }
    else if (d === 'Z') { t0 = t0s - 1.15; du = 2.5; ease = 'power2.inOut'; }
    else { t0 = t0s - .75; du = 2.1; }
    MASTER.set(fg, {display: 'block'}, Math.max(0, Math.min(t0, t0s - 1.9)));
    // camera
    if (d !== 'S') {
      MASTER.fromTo(rig, {x: -A.pos[0], y: -A.pos[1], z: -A.pos[2]}, {x: -B.pos[0], y: -B.pos[1], z: -B.pos[2], duration: du, ease, immediateRender: false}, t0);
      if (d === 'Z') {
        // fly through: the old station passes the lens and is gone behind the camera
        MASTER.to(A.fg, {opacity: 0, duration: du * .2, ease: 'sine.in'}, t0 + du * .5);
        MASTER.set(A.fg, {display: 'none'}, t0 + du * .72);
      } else {
        // pull back a little, turn slightly into the move, settle (one soft arc, no stop in the middle)
        const sx = d === 'R' ? 1 : d === 'L' ? -1 : 0, sy = d === 'D' ? 1 : d === 'U' ? -1 : 0, h = du / 2;
        MASTER.to(dolly, {z: -300, rotationY: sx * 7, rotationX: -sy * 6, duration: h, ease: 'sine.inOut'}, t0);
        MASTER.to(dolly, {z: 0, rotationY: 0, rotationX: 0, duration: h, ease: 'sine.inOut'}, t0 + h);
        MASTER.to(net, {x: `-=${sx * 46}`, y: `-=${sy * 34}`, duration: du, ease}, t0);     // far layer: slow parallax
        MASTER.set(A.fg, {display: 'none'}, t0 + du + .3);
      }
    } else MASTER.set(A.fg, {display: 'none'}, t0s + .02);
    // ground light
    const rv = REVEAL[B.n], rt = rv ? t0s + rv.t : t0, rd = rv ? rv.d : du;
    MASTER.set(bg, {display: 'block'}, Math.max(0, rt - .02));
    if (A.theme === B.theme && !B.customBg && !A.customBg) { /* same ground: nothing to reveal */ }
    else if (rv || d === 'Z' || d === 'S') {
      const [cx, cy] = rv ? rv.at : (d === 'Z' ? [960, 540] : lens);
      mask(bg, `radial-gradient(circle at ${cx}px ${cy}px, #000 calc(var(--r) * 1px - 620px), transparent calc(var(--r) * 1px))`);
      MASTER.fromTo(bg, {'--r': 0}, {'--r': 3100, duration: rd, ease: d === 'Z' ? 'power2.in' : 'sine.inOut', immediateRender: true}, rt + (d === 'Z' ? du * .18 : 0));
    } else {
      const ang = {R: 270, L: 90, D: 0, U: 180}[d];
      mask(bg, `linear-gradient(${ang}deg, #000 calc(var(--r) * 1% - 70%), transparent calc(var(--r) * 1%))`);
      MASTER.fromTo(bg, {'--r': 0}, {'--r': 172, duration: rd, ease, immediateRender: true}, rt);
    }
    MASTER.set(A.bg, {display: 'none'}, rt + rd + (d === 'Z' ? du * .18 : 0) + .1);
  });
}
function finalizeFilm() {
  FILM.total = Math.max(...FILM.scenes.map(s => s.p.start + s.p.dur + s.p.tail));
  const net = globalNet(FILM.total);
  camera(net);
  const report = mergeCarries();
  CHIPS.forEach(c => {
    if (c.dead) return;
    const sc = FILM.scenes.find(s => s.n === c.scene), t0 = sc.p.start + Math.max(0, c.segs.length ? c.segs[0].t - .02 : 0);
    const d0 = c.style.display && c.style.display !== 'none' ? c.style.display : 'block';   // keep flex chips flex (their text stays centred)
    MASTER.set(c, {display: 'none'}, 0); MASTER.set(c, {display: d0}, Math.max(.001, t0));
    MASTER.set(c, {display: 'none'}, c.endAt || (sc.p.start + sc.p.dur + sc.p.tail + .05));
  });
  MASTER.set({}, {}, FILM.total);
  LIVE.unshift(moveGround);
  window.CUESBY = CUESBY; window.FILM_REPORT = report; window.DURATION = FILM.total;
  window.seek = t => { MASTER.seek(t, false); LIVE.forEach(f => f()); };
  window.__seek = window.seek;
  window.seek(0);
  window.ready = true;
}
