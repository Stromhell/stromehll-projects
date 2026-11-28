// Scene 14 (v4 end slate, storyboard v5 centred lockup): glowing TG Blue horizon, centred white logo, "Look alike vs belong
// together" beneath, centred CTA pill, tigergraph.com at the bottom. Horizon particles converge, the whole lockup settles
// 96% -> 100%, then a clean hold with only a light sweep across the CTA.
const T = window.TOTAL;
world('dark', {particles: 24, horizon: 860});
document.querySelector('.bg').style.background = 'radial-gradient(1200px 700px at 50% 110%,rgba(67,164,220,.55),transparent 60%),linear-gradient(180deg,#0A1628 0%,#0a2647 100%)';
// particles converge toward the centre axis along the horizon
for (let i = 0; i < 26; i++) {
  const side = i % 2 ? 1 : -1, x0 = 960 + side * (420 + R() * 600), y0 = 820 + R() * 90;
  const p = node(`<div class="dot" style="left:${x0}px;top:${y0}px;width:5px;height:5px;background:#bfe6ff;box-shadow:0 0 8px #43a4dc"></div>`);
  tl.fromTo(p, {x: 0, opacity: 0}, {x: (960 - x0) * .85, opacity: .9, duration: 1.6 + R() * .6, ease: 'power2.inOut'}, .1 + R() * .5);
  tl.to(p, {opacity: 0, duration: .4}, 2.0 + R() * .3);
}
// v6 carry in: the 90% ring sweeps past camera and settles as the glowing horizon arc under the brand
{ const rg = chip('border-radius:50%;border:12px solid #8fd0f5;box-shadow:0 0 50px rgba(67,164,220,.8), inset 0 0 40px rgba(67,164,220,.5)');
  morph(rg, pose(960, 600, 560, 560), pose(960, 860 + 1700, 3400, 3400), .6, 1.0, 'power2.inOut');
  tl.to(rg, {borderWidth: '5px', duration: .9}, .6); tl.to(rg, {opacity: 0, duration: .5}, 1.4); }
const lock = node('<div class="w" style="left:0;top:0;width:1920px;height:1080px"></div>');
gsap.set(lock, {transformOrigin: '960px 430px', y: 70});
tl.fromTo(lock, {scale: .96}, {scale: 1, duration: 1.2, ease: 'sine.out'}, .6);
const logo = W_('<img src="../../../storyboard/build/logo_white.png" style="width:460px;display:block">', 730, 190, {z: 4, parent: lock});
tl.fromTo(logo, {opacity: 0, scale: .9, filter: 'blur(8px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .8, ease: 'expo.out'}, .5);
cue(.5, 'shimmer', .45);
const s1 = W_(`<div style="position:relative;width:1920px;text-align:center;font-size:64px;font-weight:700;color:#fff">Look alike <span style="font-weight:300;opacity:.85">vs</span> <span class="bt" style="color:${ORANGE}">belong together</span></div>`, 0, 380, {parent: lock});
const bt = s1.querySelector('.bt');
tl.fromTo(s1, {opacity: 0, y: 24}, {opacity: 1, y: 0, duration: .6, ease: 'expo.out'}, 1.0);
tl.fromTo(bt, {opacity: 0}, {opacity: 1, duration: .5}, 1.45);
const cta = pill(960, 560, 'See entity resolution in action →', 'w', {z: 5, parent: lock}); rise(cta, 1.9, .55, 30);
gsap.set(cta.in.firstElementChild, {overflow: 'hidden', fontSize: 30, padding: '20px 44px'});
const sw = node('<div class="sweep" style="width:30%"></div>', cta.in.firstElementChild);
tl.fromTo(sw, {xPercent: -200}, {xPercent: 400, duration: 1.1, ease: 'power2.inOut'}, 3.4);
const url = W_('<div style="position:relative;width:1920px;text-align:center;font-size:30px;font-weight:500;color:#d6eefb">tigergraph.com</div>', 0, 650, {parent: lock});
rise(url, 2.2, .5, 24);
cue(1.9, 'pop', .35);
finish();
