// Scene 14 (blue end card): the two figures arrive from opposite sides on curved paths, a network line draws between them,
// the logo settles with opacity + scale, the line lands in two stages ("belong together" in orange), CTA and URL rise from
// below, then a stable hold to read.
const T = window.TOTAL;
world('blue', {particles: 30, horizon: 860, from: 'dark', reveal: .7});
const pA = person(420, 880, .62, 'blue'), pB = person(1500, 880, .62, 'orange');
[[pA, -1], [pB, 1]].forEach(([p, k]) => {
  tl.fromTo(p, {x: 520 * k}, {x: 0, duration: 1.3, ease: 'power3.out'}, .05);
  tl.fromTo(p, {y: -150}, {y: 0, duration: 1.3, ease: 'sine.inOut'}, .05);
  tl.fromTo(p, {opacity: 0}, {opacity: 1, duration: .3}, .05);
  cue(.05, 'whoosh_s', .3, .5 * k);
  float(p, 1.4, T, 3, 6);
});
// network connection between the two figures
const sv = svgLayer($('#cam'));
const arc = svgPath(sv, 'M500,810 C760,730 1160,730 1420,810', BLUE, 3, .9);
trim(arc, 1.0, .8);
[[700, 762], [960, 745], [1220, 762]].forEach(([x, y], i) => { const d = svgDot(sv, x, y, 11, i === 1 ? ORANGE : '#fff'); tl.fromTo(d, {attr: {r: 0}}, {attr: {r: 11}, duration: .35, ease: 'expo.out'}, 1.25 + i * .15); });
cue(1.1, 'tick', .25);
const logo = W_('<img src="../../../storyboard/build/logo_white.png" style="width:470px;display:block">', 725, 170, {z: 4});
tl.fromTo(logo, {opacity: 0, scale: .82, filter: 'blur(8px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .7, ease: 'expo.out'}, 1.5);
cue(1.5, 'shimmer', .5);
const s1 = words('Look alike', 0, 330, {size: 62}), s2 = words('<span style="font-weight:300">vs</span>|<em>belong together</em>', 0, 412, {size: 62});
s2.querySelector('em').style.color = ORANGE;
s1.ws.forEach((w, i) => rise(w, 2.2 + i * .12, .5));
s2.ws.forEach((w, i) => rise(w, 2.85 + i * .14, .5));
const cta = pill(960, 560, 'See entity resolution in action →', 'w', {z: 5}); rise(cta, 3.8, .55, 40);
cue(3.8, 'pop', .4);
const sw = node('<div class="sweep" style="width:30%"></div>', cta.in.firstElementChild);
gsap.set(cta.in.firstElementChild, {overflow: 'hidden'});
tl.fromTo(sw, {xPercent: -200}, {xPercent: 400, duration: .9, ease: 'power2.inOut'}, 4.4);
const url = W_('<div style="position:relative;width:1920px;text-align:center;font-size:30px;font-weight:500">tigergraph.com</div>', 0, 625);
rise(url, 4.0, .5, 30);
finish();
