// Scene 3 (blue): the question builds word by word from depth as it is spoken; record cards orbit on a dotted ring.
const T = window.TOTAL;
world('blue', {particles: 40, horizon: 820});
openMove('push');
// orbit ring + cards travelling around it (x and y on sine eases = ellipse)
const svg = svgLayer($('#cam'));
svg.innerHTML = '<ellipse cx="960" cy="520" rx="820" ry="300" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="3 12"/>';
tl.fromTo(svg, {opacity: 0, scale: .6, transformOrigin: '960px 520px'}, {opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out'}, .1);
tl.fromTo(svg.firstChild, {attr: {'stroke-dashoffset': 0}}, {attr: {'stroke-dashoffset': -300}, duration: T, ease: 'none'}, 0);
[['Daniel Reyes', 0], ['L. Novakova', 2.1], ['Dan Reyes', 4.2]].forEach(([n, ph], i) => {
  const c = W_(`<div class="glass" style="position:relative;padding:18px 26px;font-size:28px;font-weight:700;white-space:nowrap">${n}</div>`, 960 - 120, 520 - 30, {z: i === 1 ? 1 : 3});
  // parametric ellipse: angle advances with time, depth from the angle (behind = smaller + blurred)
  const o = {a: ph};
  const put = () => { const x = Math.cos(o.a) * 820, y = Math.sin(o.a) * 300, d = (Math.sin(o.a) + 1) / 2; gsap.set(c, {x, y, scale: .7 + d * .45, opacity: .55 + d * .45, filter: `blur(${(1 - d) * 4}px)`, zIndex: Math.round(d * 10)}); };
  tl.fromTo(o, {a: ph}, {a: ph + 1.6, duration: T, ease: 'none', onUpdate: put, immediateRender: true, onStart: put}, 0);
  put();
});
// the question, word by word on the voice
const q = words('How|do|I|decide|between|<em class="f">fuzzy matching</em>|and|<em class="g">graph-based entity resolution</em>|for|KYC?', 210, 330, {size: 78, w: 1500});
q.querySelectorAll('em.f').forEach(e => e.style.color = '#fff'); q.querySelectorAll('em.g').forEach(e => e.style.color = NAVY);
const spoken = ['how', 'do', 'you', 'decide', 'between', 'fuzzy', 'and', 'graph-based', 'for', 'kyc'];
q.ws.forEach((w, i) => {
  const t = at(spoken[i]) - .06;
  tl.fromTo(w, {opacity: 0, z: -700, y: 30, filter: 'blur(16px)'}, {opacity: 1, z: 0, y: 0, filter: 'blur(0px)', duration: .45, ease: 'expo.out'}, t);
});
// key terms flash to their colour as they are spoken
const fz = q.querySelector('em.f'), gr = q.querySelector('em.g');
tl.fromTo(fz, {textShadow: '0 0 0 rgba(255,255,255,0)'}, {textShadow: '0 0 40px rgba(255,255,255,.95)', duration: .25, yoyo: true, repeat: 1}, at('fuzzy') + .2);
tl.fromTo(gr, {textShadow: '0 0 0 rgba(255,255,255,0)'}, {textShadow: '0 0 40px rgba(255,255,255,.95)', duration: .25, yoyo: true, repeat: 1}, at('graph-based') + .3);
cue(at('fuzzy') + .2, 'shimmer', .4); cue(at('graph-based') + .3, 'shimmer', .4);
// slow push toward the question, final light sweep
tl.fromTo(q, {scale: .96}, {scale: 1.04, duration: T, ease: 'sine.inOut'}, 0);
const sw = node('<div class="sweep" style="width:30%;height:180%;top:-40%"></div>', $('#front'));
tl.fromTo(sw, {x: -700, opacity: 1}, {x: 2400, duration: 1.1, ease: 'power2.inOut'}, at('kyc') + 1.0);
cue(at('kyc') + 1.0, 'shimmer', .5);
closeMove('whipL');
finish();
