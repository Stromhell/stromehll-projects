// Scene 2 (dark, no VO): the press shatters MERGE into glass; one silhouette splits into two different people who walk apart.
const T = window.TOTAL, B2 = window.BEATS[1];
world('dark', {particles: 50, horizon: 900});
gsap.set(HORIZON, {opacity: 0});
openMove('flash'); cue(0, 'crack', 1);
const glow = node('<div class="w" style="left:360px;top:-80px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(190,235,255,.55),rgba(67,164,220,.25) 35%,transparent 65%)"></div>');
tl.fromTo(glow, {scale: .6, opacity: 1}, {scale: 1.3, opacity: .55, duration: 4, ease: 'expo.out'}, 0);
// stamp halves
const half = (clip, x) => W_(`<div class="stamp" style="position:relative;transform:rotate(-10deg);clip-path:${clip}">Merge</div>`, 960, 470, {z: 3});
const hL = half('polygon(0 0,52% 0,47% 100%,0 100%)'), hR = half('polygon(53% 0,100% 0,100% 100%,48% 100%)');
gsap.set([hL, hR], {xPercent: -50, yPercent: -50});
const svg = svgLayer($('#cam'), 4);
const crack = document.createElementNS('http://www.w3.org/2000/svg', 'path');
crack.setAttribute('d', 'M985,360 L955,430 L1000,480 L950,540 L990,590'); crack.setAttribute('stroke', '#fff'); crack.setAttribute('stroke-width', 9); crack.setAttribute('fill', 'none');
crack.setAttribute('stroke-dasharray', 400); svg.appendChild(crack);
tl.fromTo(crack, {attr: {'stroke-dashoffset': 400}}, {attr: {'stroke-dashoffset': 0}, duration: .18, ease: 'none'}, .05);
tl.to(crack, {opacity: 0, duration: .3}, .45);
tl.to(hL, {x: -520, y: -120, rotation: -38, z: 200, opacity: 0, filter: 'blur(6px)', duration: 2.6, ease: 'expo.out'}, .3);
tl.to(hR, {x: 560, y: 160, rotation: 34, z: 200, opacity: 0, filter: 'blur(6px)', duration: 2.6, ease: 'expo.out'}, .3);
// glass shards fly outward in slow motion
for (let i = 0; i < 22; i++) {
  const s = 30 + R() * 70, a = R() * Math.PI * 2, r = 350 + R() * 650;
  const pts = Array.from({length: 4}, () => `${Math.round(R() * 100)}% ${Math.round(R() * 100)}%`).join(',');
  const sh = node(`<div class="w" style="left:${940 + (R() - .5) * 120}px;top:${470 + (R() - .5) * 80}px;width:${s}px;height:${s * 1.3}px;clip-path:polygon(${pts});background:linear-gradient(140deg,rgba(255,255,255,.95),rgba(190,230,255,.45) 50%,${R() < .35 ? 'rgba(236,100,8,.8)' : 'rgba(67,164,220,.5)'});box-shadow:0 0 20px #fff"></div>`);
  tl.fromTo(sh, {x: 0, y: 0, z: 0, rotation: 0, rotationX: 0, opacity: 0}, {x: Math.cos(a) * r, y: Math.sin(a) * r * .7, z: (R() - .3) * 700, rotation: (R() - .5) * 720, rotationX: (R() - .5) * 540, opacity: 1, duration: 3.6, ease: 'expo.out'}, .12);
  tl.to(sh, {opacity: 0, duration: 1.2}, 2.6 + R());
}
for (let i = 0; i < 8; i++) cue(.2 + i * .13, 'tink', .25, (R() - .5) * 1.2);
// camera dollies back through the burst
tl.fromTo('#world', {scale: 1}, {scale: .9, duration: 5.2, ease: 'sine.out'}, .5);
tl.to('#world', {scale: 1, duration: 1.2, ease: 'sine.inOut'}, 5.7);
// the horizon rises, one silhouette appears and splits into two
tl.fromTo(HORIZON, {opacity: 0, yPercent: 30}, {opacity: 1, yPercent: 0, duration: 2.2, ease: 'expo.out'}, 2.3);
cue(2.3, 'riser', .5);
const pA = person(960, 900, 1.45, 'blue', {z: 2}), pB = person(960, 900, 1.45, 'orange', {z: 1});
[pA, pB].forEach(p => gsap.set(p.in, {transformOrigin: '50% 100%'}));
tl.fromTo([pA, pB], {y: 200, opacity: 0, filter: 'blur(14px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out'}, 3.1);
tl.fromTo(pA.in, {scaleY: .9}, {scaleY: 1, duration: .5, ease: 'back.out(3)'}, 3.8);
const split = B2 - .4;
tl.to(pB, {x: 90, duration: .5, ease: 'power3.out'}, split); tl.to(pA, {x: -90, duration: .5, ease: 'power3.out'}, split);
cue(split, 'whoosh_s', .6);
// they turn away and walk apart, bobbing on every step
const walkT = split + .5, walkD = T - walkT;
tl.to(pA, {x: -620, duration: walkD, ease: 'power1.in'}, walkT);
tl.to(pB, {x: 620, duration: walkD, ease: 'power1.in'}, walkT);
[pA, pB].forEach((p, k) => {
  const steps = Math.floor(walkD / .32);
  tl.to(p.in, {y: -16, rotation: k ? 4 : -4, duration: .16, ease: 'sine.out', yoyo: true, repeat: steps * 2 - 1}, walkT);
  tl.to(p.head.querySelectorAll('.eye'), {x: k ? 10 : -10, duration: .3}, split);
  for (let i = 0; i < steps; i++) cue(walkT + i * .32 + .16, 'step', .18, k ? .5 : -.5);
});
const tagA = W_(`<div class="tag" style="position:relative;background:rgba(255,255,255,.16);color:#fff;font-size:20px">Daniel · Harbor View</div>`, 0, 0, {parent: pA});
const tagB = W_(`<div class="tag" style="position:relative;background:rgba(236,100,8,.92);color:#fff;font-size:20px">Dan · Harbour View</div>`, 0, 0, {parent: pB});
gsap.set([tagA, tagB], {left: 20, top: -70});
pop(tagA, walkT + .3); pop(tagB, walkT + .45);
const sup = words('Two <em>different</em> people', 0, 150, {size: 110});
sup.ws.forEach((w, i) => tl.fromTo(w, {y: -260, opacity: 0, scale: 1.6, filter: 'blur(12px)'}, {y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .45, ease: 'expo.out'}, walkT + .7 + i * .16));
cue(walkT + .7, 'thump', .6);
closeMove('up');
finish();
