// Scene 2 (dark, no VO, short): the pressed MERGE? cracks and bursts into fragments and data particles while the white ground
// opens into moving navy (gradient reveal). The particles stream left and right, the two people glide in from the sides,
// stop with a clear gap, a thin divider grows between them, labels and "Two different people" land last.
const T = window.TOTAL;
world('dark', {particles: 36, horizon: 900, from: 'light', reveal: 1.3});
gsap.set(HORIZON, {opacity: 0});
// moving radial glow behind the burst
const glow = node('<div class="w" style="left:360px;top:0;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,rgba(150,215,255,.5),rgba(67,164,220,.22) 35%,transparent 65%)"></div>');
tl.fromTo(glow, {scale: .5, opacity: 0, x: 0}, {scale: 1.25, opacity: .8, x: 80, duration: 1.6, ease: EZO}, .1);
tl.to(glow, {x: -60, y: 40, scale: 1.1, opacity: .45, duration: T - 1.7, ease: 'sine.inOut'}, 1.7);
// the button, same place as the last frame of scene 1
const btnHtml = clip => `<div style="position:relative;padding:34px 84px;border-radius:70px;font-size:64px;font-weight:700;letter-spacing:3px;color:#fff;background:linear-gradient(180deg,#ff9a4d,${ORANGE} 55%,#c85000);box-shadow:0 26px 60px rgba(236,100,8,.45),inset 0 3px 0 rgba(255,255,255,.55);clip-path:${clip}">MERGE?</div>`;
const hL = W_(btnHtml('polygon(0 0,52% 0,47% 100%,0 100%)'), 960, 600, {parent: $('#front')}), hR = W_(btnHtml('polygon(53% 0,100% 0,100% 100%,48% 100%)'), 960, 600, {parent: $('#front')});
gsap.set([hL, hR], {xPercent: -50, yPercent: -50});
cue(0, 'crack', .9);
tl.to(hL, {x: -420, y: -90, rotation: -24, opacity: 0, filter: 'blur(8px)', duration: 1.1, ease: 'power3.out'}, .18);
tl.to(hR, {x: 440, y: 110, rotation: 22, opacity: 0, filter: 'blur(8px)', duration: 1.1, ease: 'power3.out'}, .18);
// fragments with directional motion blur (stretched along their path)
for (let i = 0; i < 34; i++) {
  const a = R() * Math.PI * 2, r = 380 + R() * 700, s = 10 + R() * 34, ang = a * 180 / Math.PI;
  const f = node(`<div class="w" style="left:${950 + (R() - .5) * 150}px;top:${590 + (R() - .5) * 60}px;width:${s}px;height:${s * .8}px;transform-origin:50% 50%"><div style="width:100%;height:100%;clip-path:polygon(${R() * 40}% 0,100% ${R() * 40}%,${60 + R() * 40}% 100%,0 ${60 + R() * 40}%);background:${R() < .55 ? `linear-gradient(140deg,#ffb27a,${ORANGE})` : 'linear-gradient(140deg,#fff,rgba(190,230,255,.7))'}"></div></div>`, $('#front'));
  tl.fromTo(f, {x: 0, y: 0, rotation: ang, scaleX: 3.2, opacity: 0, filter: 'blur(3px)'}, {x: Math.cos(a) * r, y: Math.sin(a) * r * .65, scaleX: 1, opacity: 1, filter: 'blur(0px)', duration: 1.3, ease: EZO}, .2 + R() * .08);
  tl.to(f, {opacity: 0, duration: .5}, 1.0 + R() * .5);
}
for (let i = 0; i < 6; i++) cue(.22 + i * .1, 'tink', .22, (R() - .5) * 1.2);
cue(.2, 'whomp', .5);
// letters become data particles: they burst, then stream to the left (blue) and right (orange) edges
const side = i => i % 2 ? 1 : -1;
for (let i = 0; i < 44; i++) {
  const k = side(i), s = 4 + R() * 6, col = k < 0 ? '#8fd0f5' : '#ffb27a';
  const d = node(`<div class="dot" style="left:960px;top:600px;width:${s}px;height:${s}px;background:${col};box-shadow:0 0 10px ${col}"></div>`, $('#front'));
  const a = R() * Math.PI * 2, r = 120 + R() * 260;
  tl.fromTo(d, {x: 0, y: 0, opacity: 0}, {x: Math.cos(a) * r, y: Math.sin(a) * r * .6, opacity: 1, duration: .7, ease: EZO}, .25);
  tl.to(d, {x: k * (1000 + R() * 120), y: 160 + (R() - .5) * 220, opacity: 0, duration: .9, ease: 'power2.in'}, .95 + R() * .25);
}
// the ground: horizon rises, light drifts
tl.fromTo(HORIZON, {opacity: 0, yPercent: 25}, {opacity: 1, yPercent: 0, duration: 1.2, ease: EZO}, .7);
// the two people glide in from the sides (staggered 7 frames), stop with a gap
const pA = person(760, 900, 1.35, 'blue', {z: 2}), pB = person(1160, 900, 1.35, 'orange', {z: 2});
const tIn = 1.25;
tl.fromTo(pA, {y: 260, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .8, ease: 'power3.out'}, tIn - .35);
tl.fromTo(pB, {y: 260, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .8, ease: 'power3.out'}, tIn - .27);
cue(tIn, 'whoosh', .5, -.6); cue(tIn + .23, 'whoosh', .5, .6);
tl.to(pA.head.querySelectorAll('.eye'), {x: 8, duration: .3}, tIn + .9); tl.to(pB.head.querySelectorAll('.eye'), {x: -8, duration: .3}, tIn + 1.0);
float(pA, tIn + 1, T, 3, 5); float(pB, tIn + 1.1, T, 3, 5.6);
// divider grows in the gap, then widens when "different" lands
const div = node(`<div class="w" style="left:958px;top:520px;width:4px;height:380px;border-radius:2px;background:linear-gradient(180deg,transparent,#bfe6ff,transparent);box-shadow:0 0 18px rgba(190,230,255,.8);transform-origin:50% 50%"></div>`);
tl.fromTo(div, {scaleY: 0, opacity: 0}, {scaleY: 1, opacity: 1, duration: .6, ease: 'power3.out'}, tIn + .9);
// labels, one after the other
const tag = (bg, t) => `<div class="tag" style="position:relative;background:${bg};color:#fff;font-size:20px">${t}</div>`;
const tagA = W_(tag('rgba(255,255,255,.16)', 'Daniel · Harbor View'), 0, 0, {parent: pA}), tagB = W_(tag('rgba(236,100,8,.92)', 'Dan · Harbour View'), 0, 0, {parent: pB});
gsap.set([tagA, tagB], {left: 10, top: -64});
rise(tagA, tIn + 1.05, .45, 18); rise(tagB, tIn + 1.2, .45, 18);
cue(tIn + 1.05, 'pop', .4, -.4); cue(tIn + 1.2, 'pop', .4, .4);
const sup = words('Two <em>different</em> people', 0, 170, {size: 104});
sup.ws.forEach((w, i) => tl.fromTo(w, {x: (i - 1) * 60, opacity: 0, filter: 'blur(10px)'}, {x: 0, opacity: 1, filter: 'blur(0px)', duration: .5, ease: EZO}, tIn + 1.4 + i * .16));
cue(tIn + 1.4, 'thump', .5);
tl.to(div, {scaleY: 1.25, scaleX: 2, duration: .5, ease: 'power2.out'}, tIn + 1.56);
tl.to([pA], {x: -30, duration: .5, ease: 'power2.out'}, tIn + 1.56); tl.to([pB], {x: 30, duration: .5, ease: 'power2.out'}, tIn + 1.56);
const headBg = c => c === 'blue' ? 'radial-gradient(circle at 35% 30%,#ffffff 0%,#8fd0f5 45%,#2a7fb5 100%)' : 'radial-gradient(circle at 35% 30%,#ffe1c9 0%,#ff9c55 45%,#b84a00 100%)';
// v6 carry in: the two identity discs from the record cards drop onto the bodies and become the heads
[[pA, 'blue', 760], [pB, 'orange', 1160]].forEach(([p, col, x], k) => {
  const ch = chip(`border-radius:75px;background:${headBg(col)};box-shadow:0 0 46px ${col === 'blue' ? 'rgba(143,208,245,.85)' : 'rgba(255,156,85,.85)'}`);
  gsap.set(p.head, {opacity: 0});
  morph(ch, pose(x, 330, 150, 150), p.head, .6 + k * .06, 1.05, 'power2.inOut', -40);
  tl.set(p.head, {opacity: 1}, 1.65 + k * .08); tl.to(ch, {opacity: 0, duration: .12}, 1.65 + k * .08);
});
// v6 carry out: each person folds into a record card that lands on the orbit ring of the next scene (same colours)
const tX = T - .65;
tl.to([sup, div], {opacity: 0, y: -30, filter: 'blur(8px)', duration: .4, ease: 'power2.in'}, tX);
[[pA, 'blue', pose(640, 800, 250, 104), '<div style="padding:13px 18px;text-align:left;color:#fff"><div style="font-size:11px;letter-spacing:3px;font-weight:600;color:#bfe6ff">RECORD</div><div style="font-size:22px;font-weight:700;margin-top:3px">Daniel Reyes</div><div style="font-size:15px;opacity:.75;margin-top:2px">14 Harbor View Apts</div></div>'], [pB, 'orange', pose(1280, 800, 250, 104), '<div style="padding:13px 18px;text-align:left;color:#fff"><div style="font-size:11px;letter-spacing:3px;font-weight:600;color:#bfe6ff">RECORD</div><div style="font-size:22px;font-weight:700;margin-top:3px">Dan Reyes</div><div style="font-size:15px;opacity:.75;margin-top:2px">14 Harbour View Apartments</div></div>']].forEach(([p, col, P, tx], k) => {
  const ch = chip(`border-radius:75px;background:${headBg(col)}`, `<div class="cg" style="position:absolute;inset:0;background:linear-gradient(150deg,rgba(40,80,130,.95),rgba(18,40,70,.95));border:1.5px solid ${col === 'blue' ? 'rgba(143,208,245,.8)' : 'rgba(255,156,85,.8)'};border-radius:18px;opacity:0">${tx}</div>`);
  morph(ch, p.head, P, tX + k * .05, .62, 'power3.inOut', 60);
  tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .05, immediateRender: true}, tX + k * .05);
  tl.set(p.head, {opacity: 0}, tX + k * .05 + .02);
  tl.to(p, {opacity: 0, scale: .85, duration: .35, ease: 'power2.in'}, tX + .05);
  tl.to(ch, {borderRadius: '18px', duration: .5}, tX + .1); tl.to(ch.querySelector('.cg'), {opacity: 1, duration: .4}, tX + .2);
});
closeMove('tilt');
finish();
