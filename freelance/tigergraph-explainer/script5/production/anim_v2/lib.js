/* Script 5 v2 motion library: every object is its own layer, animated on one paused GSAP timeline (seek-safe).
   Structure: body.theme > .bg (living gradient) > #orbs > #world(perspective) > #cam(3D camera) > objects ; #front (particles, flashes, supers).
   Components return a wrapper .w (entries/exits animate it) with .in inside (idle float animates it), so moves never fight. */
const NAVY = '#0a2647', BLUE = '#43a4dc', ORANGE = '#ec6408', GREEN = '#22b573';
const tl = gsap.timeline({paused: true});
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
  particles(opt.particles ?? 46, theme);
  // slow continuous camera travel so nothing ever parks
  const c = $('#cam'), dir = opt.dir || 1;
  // camera travels in ~3 s legs (truck left/right, rise/fall, push in), so no shot ever holds still
  const legs = Math.max(2, Math.round(T / 3)), ld = T / legs;
  gsap.set(c, {x: -80 * dir, y: 14, z: -120, rotationY: 4 * dir, rotationX: 1.5});
  for (let j = 0; j < legs; j++) {
    const s = (j % 2 ? -1 : 1) * dir;
    tl.to(c, {x: 80 * s, y: j % 2 ? 16 : -16, z: -120 + 240 * (j + 1) / legs, rotationY: -4 * s, rotationX: j % 2 ? 1.5 : -1.2,
      duration: ld, ease: 'sine.inOut'}, j * ld);
  }
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
function float(w, t0, t1, amp = 8, period = 3.2) {
  const el = w.in || w, ph = R();
  tl.fromTo(el, {y: -amp * ph}, {y: amp, rotation: (R() - .5) * 1.6, duration: period / 2, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.ceil((t1 - t0) / (period / 2)))}, t0);
}
/* ---------- entries (decelerate from oversize / depth; land in ~0.35-0.6 s) ---------- */
function flyIn(w, t, from = {}, d = .6, ease = 'expo.out') {
  tl.fromTo(w, Object.assign({opacity: 0, z: -500, filter: 'blur(14px)'}, from), {opacity: 1, x: 0, y: 0, z: 0, rotationY: 0, rotationX: 0, rotation: 0, scale: 1, filter: 'blur(0px)', duration: d, ease}, t);
  cue(t, 'whoosh_s', .5); return w;
}
function pop(w, t, d = .45, s0 = .3) {
  tl.fromTo(w, {opacity: 0, scale: s0, filter: 'blur(6px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: d, ease: 'back.out(2.2)'}, t);
  cue(t, 'pop', .6, ((w.offsetLeft || 960) - 960) / 1400); return w;
}
function slam(w, t, d = .38) {          // crash in from ~3x, decelerating
  tl.fromTo(w, {opacity: 0, scale: 3.2, filter: 'blur(18px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: d, ease: 'expo.out'}, t);
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
  box.ws.forEach((s, i) => tl.fromTo(s, from, {y: 0, opacity: 1, z: 0, filter: 'blur(0px)', duration: .5, ease: 'expo.out'}, t + i * gap));
}
function wordsOut(box, t) { tl.to(box.ws, {y: -30, opacity: 0, filter: 'blur(8px)', duration: .3, stagger: .03, ease: 'power2.in'}, t); }
/* counter: steps every frame, lands exactly */
function count(el, t, a, b, d, fmt = v => Math.round(v) + '%') {
  const o = {v: a}; el.textContent = fmt(a);
  tl.fromTo(o, {v: a}, {v: b, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); }}, t);
}
function shock(cx, cy, t, col = ORANGE, r = 260, parent) {
  const s = node(`<div class="ring" style="left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;border:6px solid ${col};opacity:0"></div>`, parent || $('#cam'));
  tl.fromTo(s, {scale: .15, opacity: .95}, {scale: 1.2, opacity: 0, duration: .8, ease: 'expo.out', immediateRender: false}, t);
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
  if (kind === 'flash') { flash(0, '#fff', .35); tl.fromTo(w, {scale: 1.12, filter: 'blur(6px)'}, {scale: 1, filter: 'blur(0px)', duration: .5, ease: 'expo.out'}, 0); return; }
  if (kind === 'whipL') tl.fromTo(w, {x: 420, filter: 'blur(22px)'}, {x: 0, filter: 'blur(0px)', duration: .42, ease: 'expo.out'}, 0);
  else tl.fromTo(w, {scale: 1.1, filter: 'blur(14px)'}, {scale: 1, filter: 'blur(0px)', duration: .45, ease: 'expo.out'}, 0);
}
function closeMove(kind = 'whipL', d = .32) {
  const T = window.TOTAL, w = $('#world');
  if (kind === 'none') return;
  if (kind === 'whipL') tl.to(w, {x: -380, filter: 'blur(22px)', duration: d, ease: 'power3.in'}, T - d);
  else if (kind === 'dive') tl.to(w, {scale: 1.25, filter: 'blur(16px)', duration: d, ease: 'power3.in'}, T - d);
  else if (kind === 'up') tl.to(w, {y: -300, filter: 'blur(18px)', duration: d, ease: 'power3.in'}, T - d);
  cue(T - d * .8, 'whoosh', .55);
}
function finish() {
  tl.set({}, {}, window.TOTAL);
  window.CUES = CUES;
  window.seek = t => { tl.seek(t, false); };
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
    const e = edge(svg, cx, cy, x, y, opt.col || BLUE, 4).draw(t - .2, .35); e.pulse(t + .3, T - t - .5, '#bfe6ff', 1.4 + i * .1);
    const tt = tile(x, y, ic, lab, opt.cls || '', 118, {parent: g}); pop(tt, t);
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
