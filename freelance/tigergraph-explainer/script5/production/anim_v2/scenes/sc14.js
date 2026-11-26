// Scene 14 (blue, end card): the two figures walk toward each other on the horizon and dissolve into the logo;
// the line lands word by word, the CTA pops with a light sweep.
const T = window.TOTAL;
world('blue', {particles: 34, horizon: 780});
openMove('push');
const pA = person(960, 790, .8, 'blue'), pB = person(960, 790, .8, 'orange');
[pA, pB].forEach((p, k) => {
  tl.fromTo(p, {x: k ? 620 : -620}, {x: k ? 70 : -70, duration: 1.9, ease: 'power1.out'}, 0);
  tl.fromTo(p, {opacity: 0}, {opacity: 1, duration: .25}, 0);
  tl.to(p.in, {y: -10, duration: .15, yoyo: true, repeat: 11, ease: 'sine.out'}, .05);
  for (let i = 0; i < 6; i++) cue(.2 + i * .3, 'step', .14, k ? .4 : -.4);
  tl.to(p, {x: 0, y: -380, scale: .2, opacity: 0, filter: 'blur(10px)', duration: .55, ease: 'power3.in'}, 1.85);
});
const logo = W_('<img src="../../../storyboard/build/logo_white.png" style="width:500px;display:block">', 710, 250, {z: 4});
tl.fromTo(logo, {opacity: 0, scale: 2.2, filter: 'blur(16px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .55, ease: 'expo.out'}, 2.3);
shock(960, 300, 2.35, '#fff', 300); cue(2.35, 'shimmer', .7); cue(2.35, 'thump', .5);
const line = words('Look alike|<span style="font-weight:300">vs</span>|<em>belong together</em>', 0, 420, {size: 66});
wordsIn(line, 2.9, .22);
const cta = pill(960, 625, 'See entity resolution in action →', 'w', {z: 5});
tl.fromTo(cta, {opacity: 0, scale: .5}, {opacity: 1, scale: 1, duration: .5, ease: 'back.out(2.2)'}, 3.7);
cue(3.7, 'pop', .7);
const sw = node('<div class="sweep" style="width:30%"></div>', cta.in.firstElementChild);
gsap.set(cta.in.firstElementChild, {overflow: 'hidden'});
tl.fromTo(sw, {xPercent: -200}, {xPercent: 400, duration: .9, ease: 'power2.inOut'}, 4.2);
const url = W_('<div style="position:relative;width:1920px;text-align:center;font-size:30px;font-weight:500">tigergraph.com</div>', 0, 700);
tl.fromTo(url, {opacity: 0, y: 16}, {opacity: 1, y: 0, duration: .5, ease: 'expo.out'}, 4.0);
finish();
