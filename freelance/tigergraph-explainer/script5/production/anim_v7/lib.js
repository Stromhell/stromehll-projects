/* Script 5 v2 motion library: every object is its own layer, animated on one paused GSAP timeline (seek-safe).
   Structure: body.theme > .bg (living gradient) > #orbs > #world(perspective) > #cam(3D camera) > objects ; #front (particles, flashes, supers).
   Components return a wrapper .w (entries/exits animate it) with .in inside (idle float animates it), so moves never fight. */
const NAVY = '#0a2647', BLUE = '#43a4dc', ORANGE = '#ec6408', GREEN = '#22b573';
const tl = gsap.timeline({paused: true});
const EZO = 'power3.out', EZ = 'power2.inOut';   // v7 Easy Out / Easy Ease
const CUES = [];                                   // sound cues {t, s, g, pan} read by the mixer
const cue = (t, s, g = 1, pan = 0) => CUES.push({t: +t.toFixed(3), s, g, pan});
const $ = s => document.querySelector(s);
const R = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(7);

/* ---------- words: W = [{w, t}] spoken-word times for this scene ---------- */
function at(token, n = 1, fallback = 0) {
  const k = token.toLowerCase(); let c = 0;
  for (const x of window.W) if (x.w.toLowerCase().replace(/[^a-z0-9%-]/g, '').startsWith(k) && ++c === n) return x.t;
  console.warn('word not found', token); return fallback;
}

/* ---------- DOM ---------- */
function node(html, parent) { const d = document.createElement('div'); d.innerHTML = html.trim(); const e = d.firstElementChild; (parent || $('#cam')).appendChild(e); return e; }
function W_(html, x, y, opt = {}) {                // positioned wrapper with inner layer
  const w = node(`<div class="w" style="left:${x}px;top:${y}px;${opt.z ? `z-index:${opt.z};` : ''}${opt.style || ''}"><div class="in">${html}</div></div>`, opt.parent);
  w.in = w.firstElementChild; return w;
}
const P = {
 phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
 device: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
 work: '<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2.5M3 13h18"/>',
 card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
 home: '<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
 id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.3"/><path d="M5.8 16c.5-1.7 1.7-2.6 3.2-2.6s2.7.9 3.2 2.6M14.5 10h4M14.5 13.5h4"/>',
 tx: '<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>',
 director: '<circle cx="12" cy="7" r="3.5"/><path d="M5 21c.7-4 3.5-6.5 7-6.5s6.3 2.5 7 6.5"/><path d="M12 14.5l-1.3 3 1.3 1.8 1.3-1.8z"/>',
 check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>',
 mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
 alert: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17.5v.5"/>',
 bank: '<path d="M3 9.5L12 4l9 5.5z"/><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 21h18"/>',
};
const icon = (n, s = 56, c = '#fff', sw = 2) => `<svg style="position:static" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
function tile(cx, cy, ic, label = '', cls = '', size = 118, opt = {}) {
  const col = cls === 'w' ? NAVY : '#fff';
  return W_(`<div class="tile ${cls}" style="position:relative;width:${size}px;height:${size}px;border-radius:${Math.round(size * .27)}px">${icon(ic, Math.round(size * .47), col)}${label ? `<small>${label}</small>` : ''}</div>`, cx - size / 2, cy - size / 2, opt);
}
function glass(x, y, w, inner, style = '', opt = {}) { return W_(`<div class="glass" style="position:relative;width:${w}px;${style}">${inner}</div>`, x, y, opt); }
function pill(cx, cy, text, cls = '', opt = {}) { const p = W_(`<div class="pill ${cls}" style="position:relative">${text}</div>`, cx, cy, opt); gsap.set(p, {xPercent: -50, yPercent: -50}); return p; }
function person(cx, ybase, s = 1, tone = 'blue', opt = {}) {
  const g = {blue: ['#ffffff', '#8fd0f5', '#2a7fb5'], orange: ['#ffe1c9', '#ff9c55', '#b84a00']}[tone];
  const hd = 110 * s, bw = 230 * s, bh = 150 * s;
  const eye = l => `<div class="eye" style="position:absolute;left:${hd * l}px;top:${hd * .45}px;width:${hd * .08}px;height:${hd * .12}px;border-radius:50%;background:${NAVY}"></div>`;
  const p = W_(`<div style="position:relative;width:${bw}px;height:${hd + bh}px">
    <div class="head" style="position:absolute;left:${(bw - hd) / 2}px;top:0;width:${hd}px;height:${hd}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,${g[0]} 0%,${g[1]} 45%,${g[2]} 100%);box-shadow:0 14px 30px rgba(10,38,71,.3)">${eye(.3)}${eye(.6)}</div>
    <div class="body" style="position:absolute;left:0;top:${hd * 1.08}px;width:${bw}px;height:${bh}px;border-radius:${bw / 2}px ${bw / 2}px 30px 30px;background:radial-gradient(ellipse at 40% 20%,${g[0]} 0%,${g[1]} 40%,${g[2]} 100%);box-shadow:0 20px 40px rgba(10,38,71,.3)"></div></div>`,
    cx - bw / 2, ybase - hd - bh, opt);
  p.head = p.querySelector('.head'); p.body = p.querySelector('.body'); return p;
}
/* SVG layer + edges drawn from A to B (attr tween works for solid and dashed lines) */
function svgLayer(parent, z) { return node(`<svg class="lay" width="1920" height="1080" style="${z ? 'z-index:' + z : ''}"></svg>`, parent); }
function edge(svg, x1, y1, x2, y2, col = BLUE, w = 4, dash = '', glow = true) {
  const ns = 'http://www.w3.org/2000/svg', g = document.createElementNS(ns, 'g');
  const mk = (sw, op) => { const l = document.createElementNS(ns, 'line'); Object.entries({x1, y1, x2, y2, stroke: col, 'stroke-width': sw, opacity: op, 'stroke-linecap': 'round'}).forEach(([k, v]) => l.setAttribute(k, v)); if (dash) l.setAttribute('stroke-dasharray', dash); g.appendChild(l); return l; };
  const ls = [glow ? mk(w * 4, .16) : null, mk(w, 1)].filter(Boolean);
  svg.appendChild(g);
  return {g, ls, x1, y1, x2, y2,
    draw(t, d = .45, ease = 'power3.out') { tl.fromTo(ls, {attr: {x2: x1, y2: y1}}, {attr: {x2, y2}, duration: d, ease}, t); tl.fromTo(g, {opacity: 0}, {opacity: 1, duration: .08}, t); return this; },
    pulse(t, dur, col2 = '#fff', every = 1.1) {      // a light packet travelling the edge, again and again
      const c = document.createElementNS(ns, 'circle'); c.setAttribute('r', w * 1.6); c.setAttribute('cx', x1); c.setAttribute('cy', y1); c.setAttribute('fill', col2); c.setAttribute('opacity', 0); svg.appendChild(c);
      const n = Math.max(1, Math.floor(dur / every));
      for (let i = 0; i < n; i++) tl.fromTo(c, {attr: {cx: x1, cy: y1}, opacity: 0}, {attr: {cx: x2, cy: y2}, opacity: 1, duration: every * .8, ease: 'power1.inOut'}, t + i * every).to(c, {opacity: 0, duration: .15}, t + i * every + every * .7);
      return this; },
  };
}
/* ---------- living world ---------- */
function world(theme, opt = {}) {
  document.body.className = theme;
  node('<div class="bg"></div>', document.body);
  const orbs = node('<div id="orbs"></div>', document.body);
  const oc = theme === 'dark' ? 'rgba(67,164,220,.38)' : theme === 'light' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.5)';
  const o1 = node(`<div class="orb" style="left:1300px;top:-260px;width:820px;height:820px;background:radial-gradient(circle,${oc},transparent 65%)"></div>`, orbs);
  const o2 = node(`<div class="orb" style="left:-260px;top:560px;width:700px;height:700px;background:radial-gradient(circle,${theme === 'light' ? 'rgba(67,164,220,.25)' : oc},transparent 65%)"></div>`, orbs);
  node('<div id="world"><div id="cam"></div></div>', document.body);
  node('<div id="front"></div>', document.body);
  const T = window.TOTAL;
  tl.fromTo(o1, {x: 0, y: 0, scale: 1}, {x: -260, y: 90, scale: 1.18, duration: T, ease: 'sine.inOut'}, 0);
  tl.fromTo(o2, {x: 0, y: 0}, {x: 320, y: -60, duration: T, ease: 'sine.inOut'}, 0);
  if (opt.horizon != null) {
    const h = node(`<div class="horizon" style="top:${opt.horizon}px;height:900px"></div>`, $('#cam'));
    tl.fromTo(h, {y: 60}, {y: 0, duration: T, ease: 'sine.out'}, 0);
    window.HORIZON = h;
  }
  if (opt.env !== 0) envNet(theme);
  particles(opt.particles ?? 46, theme);
  // light rays and soft light patches drifting slowly (background never static)
  const rays = node('<div id="rays" style="position:absolute;inset:0;overflow:hidden"></div>', orbs);
  for (let i = 0; i < (opt.rays ?? 3); i++) {
    const r = node(`<div class="ray" style="left:${300 + i * 560}px;opacity:${.5 + R() * .35}"></div>`, rays);
    tl.fromTo(r, {x: -40 - R() * 40, rotation: 16 + i * 4}, {x: 50 + R() * 40, rotation: 10 + i * 4, duration: T, ease: 'sine.inOut'}, 0);
  }
  const pc = theme === 'light' ? 'rgba(67,164,220,.22)' : theme === 'dark' ? 'rgba(67,164,220,.28)' : 'rgba(255,255,255,.35)';
  for (let i = 0; i < 2; i++) {
    const p = node(`<div class="patch" style="left:${i ? 1100 : 100}px;top:${i ? 120 : 640}px;width:760px;height:360px;background:${pc}"></div>`, rays);
    tl.fromTo(p, {x: 0, scale: 1}, {x: i ? -90 : 90, scale: 1.15, duration: T, ease: 'sine.inOut'}, 0);
  }
  if (opt.from && !window.XF) veil(opt.from, opt.reveal || .9, opt.cx, opt.cy, opt.veilTop);
  // one slow, continuous camera drift per scene (no back-and-forth sway)
  const c = $('#cam'), dir = opt.dir || 1;
  // v5: a stronger 3D camera (references: UI planes seen at an angle, camera gliding over them, layers at different depths)
  // v7: centre-locked camera, no sideways drift: one slow continuous Z push (with a little tilt) for the whole scene, so holds never freeze
  tl.fromTo(c, {x: 0, y: 34, z: -360, rotationY: 0, rotationX: 6},
    {x: 0, y: -26, z: 340, rotationY: 0, rotationX: -2, duration: T + (window.TAIL || 0), ease: 'power1.inOut'}, 0);
  // v7 Z push-through between scenes: the new scene arrives still travelling in the direction the last one left
  const IN = {push: .9, portal: .9, pull: 1.1, tilt: .94, orbit: .94, rise: .94}[(window.PREV || '')];
  if (IN) tl.fromTo($('#world'), {scale: IN}, {scale: 1, duration: 1.3, ease: 'power2.out', immediateRender: true}, 0);
  // foreground glass shards drift faster than the camera = parallax depth
  if (opt.shards !== 0) {
    const fg = node('<div style="position:absolute;inset:0;z-index:40;pointer-events:none;overflow:hidden"></div>', document.body);
    const lightTheme = theme === 'light';
    for (let i = 0; i < 4; i++) {
      const w = 90 + R() * 140, h = w * (.55 + R() * .5);
      const s = node(`<div style="position:absolute;left:${[60, 1620, 1500, 180][i]}px;top:${[70, 820, 90, 860][i]}px;width:${w}px;height:${h}px;border-radius:${18 + R() * 12}px;background:linear-gradient(150deg,rgba(255,255,255,${lightTheme ? .55 : .14}),rgba(67,164,220,${lightTheme ? .18 : .10}));border:1px solid rgba(255,255,255,${lightTheme ? .7 : .25});filter:blur(${6 + R() * 6}px);opacity:.7"></div>`, fg);
      tl.fromTo(s, {x: 0, y: 30, scale: .9, rotation: -8 + R() * 16}, {x: ([60, 1620, 1500, 180][i] < 960 ? -70 : 70), y: -50, scale: 1.25, rotation: -4 + R() * 8, duration: T + (window.TAIL || 0), ease: 'sine.inOut'}, 0);
    }
  }
}
/* gradient reveal: the previous scene's ground sits on top and opens as a widening circle (light <-> dark changes never cut) */
function veil(theme, d = .9, cx = '50%', cy = '50%', top = false) {
  const v = node(`<div class="veil bg-${theme}" style="--cx:${cx || '50%'};--cy:${cy || '50%'}"></div>`, document.body);
  if (!top) document.body.insertBefore(v, $('#world'));
  tl.fromTo(v, {'--r': 0}, {'--r': 1500, duration: d, ease: 'power2.inOut'}, 0);
  tl.set(v, {display: 'none'}, d + .01);
  return v;
}
function particles(n, theme, parent) {
  const col = theme === 'light' ? '67,164,220' : '190,235,255', T = window.TOTAL;
  for (let i = 0; i < n; i++) {
    const s = 2 + R() * 5, d = node(`<div class="dot" style="left:${R() * 1920}px;top:${R() * 1080}px;width:${s}px;height:${s}px;background:rgba(${col},${.35 + R() * .5});${s > 5 ? 'filter:blur(1.5px)' : ''}"></div>`, parent || $('#front'));
    tl.fromTo(d, {x: 0, y: 0}, {x: (R() - .5) * 140, y: -60 - R() * 160, duration: T, ease: 'none'}, 0);
    { const pd = 1.2 + R() * 2; tl.fromTo(d, {opacity: .2}, {opacity: 1, duration: pd, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.floor(T / pd) - 1)}, R() * .5); }
  }
}
/* idle life: bob + tiny tilt on the inner layer, phase-shifted per object */
function float(w, t0, t1, amp = 5, period = 5) {   // v3: slow drift only, no tilt, no bounce
  const el = w.in || w, ph = R(), p = Math.max(4.5, period) + R() * 1.5, a = Math.min(amp, 6);
  tl.fromTo(el, {y: -a * ph}, {y: a, duration: p / 2, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil((t1 - t0) / (p / 2)))}, t0);
}
/* ---------- entries (decelerate from oversize / depth; land in ~0.35-0.6 s) ---------- */
function flyIn(w, t, from = {}, d = .6, ease = 'expo.out') {
  tl.fromTo(w, Object.assign({opacity: 0, z: -500, filter: 'blur(14px)'}, from), {opacity: 1, x: 0, y: 0, z: 0, rotationY: 0, rotationX: 0, rotation: 0, scale: 1, filter: 'blur(0px)', duration: d, ease}, t);
  cue(t, 'whoosh_s', .5); return w;
}
function pop(w, t, d = .45, s0 = .3) {
  tl.fromTo(w, {opacity: 0, scale: Math.max(s0, .6), y: 18, filter: 'blur(6px)'}, {opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: d, ease: EZO}, t);
  cue(t, 'pop', .6, ((w.offsetLeft || 960) - 960) / 1400); return w;
}
function slam(w, t, d = .38) {          // crash in from ~3x, decelerating
  tl.fromTo(w, {opacity: 0, scale: 3.2, filter: 'blur(18px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: d, ease: EZO}, t);
  cue(t, 'thump', .8); return w;
}
function exit(w, t, to = {}, d = .4) { tl.to(w, Object.assign({opacity: 0, scale: .85, filter: 'blur(10px)', duration: d, ease: 'power2.in'}, to), t); }
/* supers: whole words land at speech rhythm (2-12 f apart) */
function words(html, x, y, opt = {}) {
  const box = node(`<div class="big super" style="left:${x}px;top:${y}px;${opt.w ? 'width:' + opt.w + 'px;' : 'left:0;right:0;'}text-align:${opt.align || 'center'};font-size:${opt.size || 72}px"></div>`, opt.parent || $('#front'));
  box.innerHTML = (html.includes('|') ? html.split('|') : html.split(/ (?![^<]*>)/)).map(x => `<span class="wd">${x}</span>`).join(' ');
  box.ws = [...box.querySelectorAll('.wd')]; return box;
}
function wordsIn(box, t, gap = .14, from = {y: 46, opacity: 0, filter: 'blur(8px)', z: -200}) {
  box.ws.forEach((s, i) => tl.fromTo(s, from, {y: 0, opacity: 1, z: 0, filter: 'blur(0px)', duration: .5, ease: EZO}, t + i * gap));
}
function wordsOut(box, t) { tl.to(box.ws, {y: -30, opacity: 0, filter: 'blur(8px)', duration: .3, stagger: .03, ease: 'power2.in'}, t); }
/* counter: steps every frame, lands exactly */
function count(el, t, a, b, d, fmt = v => Math.round(v) + '%') {
  const o = {v: a}; el.textContent = fmt(a);
  tl.fromTo(o, {v: a}, {v: b, duration: d, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v); }}, t);
}
function shock(cx, cy, t, col = ORANGE, r = 260, parent) {
  const s = node(`<div class="ring" style="left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;border:6px solid ${col};opacity:0"></div>`, parent || $('#cam'));
  tl.fromTo(s, {scale: .15, opacity: .95}, {scale: 1.2, opacity: 0, duration: .8, ease: EZO, immediateRender: false}, t);
}
function flash(t, col = '#fff', d = .5) {
  const f = node(`<div class="flash" style="background:${col}"></div>`, $('#front'));
  tl.fromTo(f, {opacity: 1}, {opacity: 0, duration: d, ease: 'power2.out', immediateRender: false}, t);
}
function sweep(el, t, d = .9) {   // light sweep across a surface
  const s = node('<div class="sweep"></div>', el.in ? el.in.firstElementChild || el.in : el);
  tl.fromTo(s, {xPercent: -160}, {xPercent: 260, duration: d, ease: 'power2.inOut'}, t);
}
/* scene head and tail: open already moving, leave on a whip so every cut lands on motion */
function openMove(kind = 'push') {
  const w = $('#world');
  if (kind === 'flash') { flash(0, '#fff', .35); tl.fromTo(w, {scale: 1.12, filter: 'blur(6px)'}, {scale: 1, filter: 'blur(0px)', duration: .5, ease: EZO}, 0); return; }
  if (kind === 'whipL') tl.fromTo(w, {x: 420, filter: 'blur(22px)'}, {x: 0, filter: 'blur(0px)', duration: .42, ease: EZO}, 0);
  else tl.fromTo(w, {scale: 1.1, filter: 'blur(14px)'}, {scale: 1, filter: 'blur(0px)', duration: .45, ease: EZO}, 0);
}
function closeMove(kind = 'dive', d = .32, cx = 960, cy = 540) {
  /* v4: the exit is a camera move that runs on into the tail, under the cross-dissolve to the next scene. Nothing is cleared. */
  const T = window.TOTAL, X = window.TAIL || 0, w = $('#world'); window.CLOSED = true;
  if (kind === 'none' || !X) return;
  gsap.set(w, {transformOrigin: `${cx}px ${cy}px`});
  const st = T - .15, du = X + .15;
  if (kind === 'whipL') tl.to(w, {x: -300, filter: 'blur(8px)', duration: du, ease: 'power2.in'}, st);
  else if (kind === 'up') tl.to(w, {y: -220, filter: 'blur(8px)', duration: du, ease: 'power2.in'}, st);
  else if (kind === 'push') tl.to(w, {scale: 1.9, filter: 'blur(6px)', duration: du + .2, ease: 'power3.in'}, st - .2);
  else if (kind === 'pull') tl.to(w, {scale: .78, y: 40, filter: 'blur(5px)', duration: du + .2, ease: 'power2.in'}, st - .2);
  else if (kind === 'orbit') tl.to(w, {rotationY: -20, scale: 1.12, transformPerspective: 1500, filter: 'blur(5px)', duration: du + .2, ease: 'power2.in'}, st - .2);
  else if (kind === 'tilt') tl.to(w, {rotationX: -18, y: 160, transformPerspective: 1500, filter: 'blur(5px)', duration: du + .2, ease: 'power2.in'}, st - .2);
  else if (kind === 'rise') tl.to(w, {rotationX: 14, y: -200, scale: 1.1, transformPerspective: 1500, filter: 'blur(1.5px)', duration: du + .2, ease: 'power2.in'}, st - .2);
  else if (kind === 'portal') tl.to(w, {scale: 8, duration: du + .25, ease: 'power3.in'}, st - .25);
  else tl.to(w, {scale: 1.25, rotationX: 16, y: -140, transformPerspective: 1600, filter: 'blur(6px)', duration: du, ease: 'power2.in'}, st);   // v5: tilt and glide over the plane
  cue(st, 'whoosh', .45);
}
/* v5 live link: a line whose ends are re-measured every frame from two elements, so it always meets the cards wherever they move */
const LIVE = [];
function liveLink(svg, a, b, col = BLUE, w = 3, t = 0, d = .5, dash = '') {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('stroke', col); p.setAttribute('stroke-width', w); p.setAttribute('fill', 'none'); p.setAttribute('stroke-linecap', 'round');
  p.setAttribute('pathLength', 1); p.setAttribute('stroke-dasharray', '1 1'); p.setAttribute('stroke-dashoffset', 1);
  if (dash) p.style.strokeDasharray = 'none';
  p.style.filter = `drop-shadow(0 0 6px ${col})`;
  svg.insertBefore(p, svg.firstChild);
  const box = el => (el.in ? el.in.firstElementChild : el).getBoundingClientRect();
  const exitPt = (r, dx, dy) => { const hw = r.width / 2 + 4, hh = r.height / 2 + 4, k = Math.min(dx ? hw / Math.abs(dx) : 1e9, dy ? hh / Math.abs(dy) : 1e9, 1); return [r.left + r.width / 2 + dx * k, r.top + r.height / 2 + dy * k]; };
  const upd = () => { const m = svg.getScreenCTM(); if (!m) return; const inv = m.inverse(), pt = svg.createSVGPoint();
    const map = ([x, y]) => { pt.x = x; pt.y = y; const q = pt.matrixTransform(inv); return [q.x, q.y]; };
    const ra = box(a), rb = box(b), ax = ra.left + ra.width / 2, ay = ra.top + ra.height / 2, bx = rb.left + rb.width / 2, by = rb.top + rb.height / 2;
    const A = map(exitPt(ra, bx - ax, by - ay)), B = map(exitPt(rb, ax - bx, ay - by)); p.setAttribute('d', `M${A[0]},${A[1]} L${B[0]},${B[1]}`); };
  LIVE.push(upd);
  tl.fromTo(p, {attr: {'stroke-dashoffset': 1}}, {attr: {'stroke-dashoffset': 0}, duration: d, ease: 'power2.inOut'}, t);
  return {ls: p};
}

/* ---------- v6 carry system: one object physically travels from scene to scene ----------
   A chip lives in a screen-space layer above the camera. Each morph segment goes from A to B, where A and B are either a pose
   {x, y, w, h} (centre + size, screen px) or an element (its live on-screen box, re-measured every frame).
   Outgoing scene: element -> handoff pose, arriving at T, holding through the cross-dissolve.
   Incoming scene: starts on the same pose, then homes onto the element it becomes. */
const XO = .6;
function carryLayer() { return document.getElementById('carry') || node('<div id="carry" style="position:absolute;inset:0;z-index:45;pointer-events:none"></div>', document.body); }
function boxOf(el) { const e = el.in ? el.in.firstElementChild : el, r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height}; }
function chip(style = '', html = '') {
  const c = node(`<div class="chip6" style="position:absolute;left:0;top:0;box-sizing:border-box;overflow:hidden;${style}">${html}</div>`, carryLayer());
  c.segs = [];
  LIVE.push(() => {
    if (!c.segs.length) return;
    const now = tl.time(); let s = c.segs[0];
    for (const g of c.segs) if (now >= g.t) s = g;
    const u = Math.max(0, Math.min(1, (now - s.t) / s.d)), e = s.ez(u);
    const A = s.A.nodeType || s.A.in ? boxOf(s.A) : s.A, B = s.B.nodeType || s.B.in ? boxOf(s.B) : s.B;
    const L = k => A[k] + (B[k] - A[k]) * e, w = L('w'), h = L('h');
    // a slight arc on the way (things travel on curves, not rails)
    const arc = Math.sin(Math.PI * e) * (s.arc || 0);
    c.style.left = (L('x') - w / 2) + 'px'; c.style.top = (L('y') - h / 2 - arc) + 'px'; c.style.width = w + 'px'; c.style.height = h + 'px';
    if (c.fit) { const f = c.fit, k = Math.min(w / f.W0, h / f.H0); f.k.style.transform = `translate(${(w - f.W0 * k) / 2}px,${(h - f.H0 * k) / 2}px) scale(${k})`; }
  });
  return c;
}
function chipOf(el, style = '') {
  const src = el.in ? el.in.firstElementChild : el, k = src.cloneNode(true);
  [k, ...k.querySelectorAll('*')].forEach(e => { if (e.style) { e.style.opacity = ''; e.style.filter = ''; e.style.transform = ''; e.style.visibility = ''; } });
  const W0 = src.offsetWidth, H0 = src.offsetHeight;
  Object.assign(k.style, {position: 'absolute', left: '0px', top: '0px', margin: '0', width: W0 + 'px', transformOrigin: '0 0'});
  const c = chip('overflow:visible;' + style); c.appendChild(k); c.fit = {k, W0, H0}; return c;
}
function morph(c, A, B, t, d, ease = 'power3.inOut', arc = 0) { c.segs.push({A, B, t, d, ez: gsap.parseEase(ease), arc}); c.segs.sort((a, b) => a.t - b.t); return c; }
const pose = (x, y, w, h) => ({x, y, w, h});

/* v6 persistent environment: the same network in every scene, drifting on global time, only its lighting changes */
function envNet(theme) {
  const g0 = window.T0 || 0, T = window.TOTAL + (window.TAIL || 0);
  let s = 99; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const N = [];
  for (let i = 0; i < 46; i++) N.push([-120 + rnd() * 2160, -80 + rnd() * 1240, 2 + rnd() * 4, rnd() * 6.28]);
  const col = theme === 'light' ? '67,164,220' : '170,220,255', op = theme === 'light' ? .22 : .2;
  const e = node(`<svg width="1920" height="1080" style="position:absolute;left:0;top:0;overflow:visible"></svg>`, $('#orbs'));
  let h = '';
  N.forEach((a, i) => { const near = N.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2]).filter(q => q[0] > i).sort((p, q) => p[1] - q[1]).slice(0, 2);
    near.forEach(([j]) => { h += `<line x1="${a[0]}" y1="${a[1]}" x2="${N[j][0]}" y2="${N[j][1]}" stroke="rgba(${col},${op})" stroke-width="1.3"/>`; }); });
  N.forEach(a => { h += `<circle cx="${a[0]}" cy="${a[1]}" r="${a[2]}" fill="rgba(${col},${op * 2.2})"/>`; });
  e.innerHTML = h;
  const o = {g: g0}, put = () => gsap.set(e, {x: Math.sin(o.g / 9) * 26, y: Math.cos(o.g / 12) * 22, scale: 1.08 + Math.sin(o.g / 14) * .06, transformOrigin: '960px 540px'});
  tl.fromTo(o, {g: g0}, {g: g0 + T, duration: T, ease: 'none', onUpdate: put, immediateRender: true}, 0); put();
  return e;
}

function finish() {
  if (!window.CLOSED) closeMove('dive');
  tl.set({}, {}, window.TOTAL + (window.TAIL || 0));
  window.CUES = CUES;
  window.seek = t => { tl.seek(t, false); LIVE.forEach(f => f()); };
  window.ready = true;
}
/* a record node that grows its own network: edges shoot out, tiles pop on their spoken times. Whole network in one group (slides as one). */
function network(cx, cy, name, tiles, side, times, opt = {}) {
  const T = window.TOTAL;
  const g = node('<div class="w" style="left:0;top:0;width:1920px;height:1080px"></div>');
  const svg = svgLayer(g);
  const out = {g, svg, tiles: [], edges: []};
  tiles.forEach(([dx, dy, ic, lab], i) => {
    const x = cx + dx * side, y = cy + dy, t = times[i];
    const e = edge(svg, cx, cy, x, y, opt.col || BLUE, 4).draw(t - .4, .6, 'power2.inOut'); e.pulse(t + .4, T - t - .6, '#bfe6ff', 2.4 + i * .15);
    const tt = tile(x, y, ic, lab, opt.cls || '', opt.size || 118, {parent: g}); pop(tt, t - .05, .7);
    tl.fromTo(tt.in.firstElementChild, {boxShadow: '0 0 0 rgba(190,235,255,0)'}, {boxShadow: '0 0 46px rgba(190,235,255,.95)', duration: .25, yoyo: true, repeat: 1, ease: 'power2.out'}, t + .15);
    float(tt, t + .5, T, 6, 2.6 + i * .37);
    out.tiles.push(tt); out.edges.push(e);
  });
  const nm = W_(`<div class="glass" style="position:relative;background:#0d2c4d;width:300px;padding:18px 0;text-align:center;font-size:34px;font-weight:700;color:#fff">${name}</div>`, cx - 150, cy - 46, {parent: g});
  out.name = nm;
  return out;
}
function demoWin(x, y, w, img, title, parent) {
  return W_(`<div class="demo" style="position:relative;width:${w}px"><div class="bar"><i></i><i></i><i></i>&nbsp;${title}</div><img src="../../../storyboard/build/demo/${img}"></div>`, x, y, {parent});
}

/* v3 helpers */
function rise(el, t, d = .5, dy = 26) {   // text/item entrance: slight upward move + opacity
  tl.fromTo(el, {y: dy, opacity: 0, filter: 'blur(6px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: d, ease: EZO}, t); return el;
}
function slideIn(el, t, from = -1, d = .65, dx = 520) {   // card entrance from a side
  tl.fromTo(el, {x: dx * from, opacity: 0, filter: 'blur(10px)'}, {x: 0, opacity: 1, filter: 'blur(0px)', duration: d, ease: EZO}, t);
  cue(t, 'whoosh_s', .45, from * .6); return el;
}
function checkSvg(size = 34, col = '#fff') { return `<svg style="position:static" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="ck" d="M5 12.5l4.5 4.5L19 7.5" stroke-dasharray="24" stroke-dashoffset="24"/></svg>`; }
function drawCheck(root, t, d = .35) { const p = root.querySelector('.ck'); tl.to(p, {attr: {'stroke-dashoffset': 0}, duration: d, ease: 'power2.out'}, t); cue(t, 'tick2', .5); }
function trim(path, t, d = .6, ease = 'power2.inOut') {   // trim-path draw for any svg path/line with a length
  const L = path.getTotalLength ? path.getTotalLength() : 1000;
  gsap.set(path, {attr: {'stroke-dasharray': L, 'stroke-dashoffset': L}});
  tl.to(path, {attr: {'stroke-dashoffset': 0}, duration: d, ease}, t); return path;
}
function svgPath(svg, d, col = BLUE, w = 3, op = 1) {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  Object.entries({d, stroke: col, 'stroke-width': w, fill: 'none', opacity: op, 'stroke-linecap': 'round'}).forEach(([k, v]) => p.setAttribute(k, v));
  svg.appendChild(p); return p;
}
function svgDot(svg, x, y, r, col, op = 1) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  Object.entries({cx: x, cy: y, r, fill: col, opacity: op}).forEach(([k, v]) => c.setAttribute(k, v)); svg.appendChild(c); return c;
}
/* background neural net: nodes + links that grow in stages (low opacity, behind type) */
function neuralNet(parent, stages, opt = {}) {   // stages: [{t, n}] cumulative node counts
  const svg = svgLayer(parent || $('#cam')); svg.style.opacity = opt.op ?? .35; if (opt.blur) svg.style.filter = `blur(${opt.blur}px)`;
  const N = stages[stages.length - 1].n, pts = [];
  const bx = opt.box || [160, 140, 1600, 800];
  for (let i = 0; i < N; i++) pts.push([bx[0] + R() * bx[2], bx[1] + R() * bx[3]]);
  let made = 0;
  stages.forEach(({t, n}, si) => {
    for (let i = made; i < n; i++) {
      const [x, y] = pts[i], tt = t + (i - made) * (opt.gap ?? .06);
      // link to the 2 nearest earlier nodes
      const near = pts.slice(0, i).map((p, j) => [Math.hypot(p[0] - x, p[1] - y), j]).sort((a, b) => a[0] - b[0]).slice(0, 2);
      near.forEach(([, j]) => { const l = svgPath(svg, `M${pts[j][0]},${pts[j][1]} L${x},${y}`, opt.col || '#fff', 1.6, .8); trim(l, tt, .5); });
      const c = svgDot(svg, x, y, 4 + R() * 4, opt.col || '#fff'); tl.fromTo(c, {attr: {r: 0}}, {attr: {r: 4 + R() * 4}, duration: .35, ease: EZO}, tt + .25);
    }
    made = n;
  });
  return svg;
}
