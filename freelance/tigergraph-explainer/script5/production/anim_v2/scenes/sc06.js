// Scene 6 (dark): two risk bars pour into one merged bar, the colours muddy and the alert disappears; split again, the alert fires.
const T = window.TOTAL, B2 = window.BEATS[1];
world('dark', {particles: 40});
openMove('push');
const bar = (x, y, w, grad, label, val, extra = '') => {
  const b = glass(x, y, w, `<div style="font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.75">${label}</div>
    <div style="margin-top:18px;height:34px;border-radius:20px;background:rgba(255,255,255,.08);overflow:hidden"><div class="fill" style="height:100%;border-radius:20px;background:${grad};background-size:300% 100%;box-shadow:0 0 30px rgba(190,235,255,.35);transform-origin:0 50%"></div></div>
    <div class="val" style="margin-top:14px;font-size:30px;font-weight:600">${val}</div>${extra}`, 'padding:30px 36px');
  b.fill = b.querySelector('.fill'); b.val = b.querySelector('.val'); return b;
};
const A = bar(180, 360, 700, `linear-gradient(90deg,${BLUE},#8fd0f5,${BLUE})`, 'Daniel Reyes · risk', 'Low');
const Bb = bar(1040, 360, 700, `linear-gradient(90deg,${ORANGE},#ffb27a,${ORANGE})`, 'Dan Reyes · risk', 'High: fraud alert pending');
gsap.set(A.fill, {width: '32%'}); gsap.set(Bb.fill, {width: '88%'});
flyIn(A, .15, {x: -700, rotationY: 30}); flyIn(Bb, .35, {x: 700, rotationY: -30});
tl.fromTo([A.fill, Bb.fill], {scaleX: 0}, {scaleX: 1, duration: 1.1, ease: 'expo.out', stagger: .2}, .6);
cue(.6, 'riser', .3);
const al = W_(`<div style="position:relative;width:64px;height:64px;border-radius:50%;background:${ORANGE};display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(236,100,8,.8)">${icon('alert', 36)}</div>`, 1690, 332, {z: 5});
pop(al, 1.4);
tl.to(al.in, {scale: 1.18, duration: .35, yoyo: true, repeat: Math.floor((at('blends') - 1.9) / .35), ease: 'sine.inOut'}, 1.9);
float(A, 1, T, 5, 3); float(Bb, 1.2, T, 5, 3.4);
// blend: both bars pour down into one merged bar
const tB = at('blends');
const M = bar(560, 600, 800, `linear-gradient(90deg,${BLUE},#9a8fb0,${ORANGE},#8a7f9c,${BLUE})`, 'Merged profile · risk', 'Medium… the alert never fires');
gsap.set(M.fill, {width: '58%'}); gsap.set(M, {opacity: 0});
tl.to(A, {x: 420, y: 220, scale: .8, opacity: 0, filter: 'blur(8px)', duration: .9, ease: 'expo.in'}, tB - .2);
tl.to(Bb, {x: -440, y: 220, scale: .8, opacity: 0, filter: 'blur(8px)', duration: .9, ease: 'expo.in'}, tB - .1);
tl.to(al, {x: -560, y: 270, duration: .9, ease: 'expo.in'}, tB - .1);
tl.fromTo(M, {opacity: 0, scale: 1.25, filter: 'blur(12px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .6, ease: 'expo.out'}, tB + .6);
tl.fromTo(M.fill, {backgroundPosition: '0% 0'}, {backgroundPosition: '100% 0', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 2}, tB + .6);
tl.fromTo(M.fill, {scaleX: .2}, {scaleX: 1, duration: .8, ease: 'expo.out'}, tB + .6);
cue(tB + .6, 'thump', .6);
float(M, tB + 1.2, T, 5, 3);
const sup = words('Wrong merge =|<em>hidden risk</em>', 0, 880, {size: 72});
wordsIn(sup, tB + 1.4, .3);
// hide: the alert is swallowed
const tH = at('hide');
tl.to(al, {scale: 0, opacity: 0, rotation: 90, duration: .45, ease: 'back.in(2)'}, tH);
cue(tH + .3, 'whomp', .8);
const hid = pill(1300, 590, '⚠ alert hidden', 'o', {z: 6}); pop(hid, tH + .45);
// split again: the alert fires
const tF = at('should') + .2;
wordsOut(sup, tF - .3);
tl.to([M, hid], {scale: .7, opacity: 0, filter: 'blur(10px)', duration: .35, ease: 'power3.in'}, tF - .2);
const A2 = bar(180, 420, 700, `linear-gradient(90deg,${BLUE},#8fd0f5)`, 'Daniel Reyes · risk', 'Low ✓');
const B2b = bar(1040, 420, 700, `linear-gradient(90deg,${ORANGE},#ffb27a)`, 'Dan Reyes · risk', '⚠ Fraud alert fired');
gsap.set(A2.fill, {width: '32%'}); gsap.set(B2b.fill, {width: '88%'});
tl.fromTo(A2, {x: 380, opacity: 0}, {x: 0, opacity: 1, duration: .55, ease: 'expo.out'}, tF);
tl.fromTo(B2b, {x: -380, opacity: 0}, {x: 0, opacity: 1, duration: .55, ease: 'expo.out'}, tF);
cue(tF, 'whoosh_s', .6);
for (let i = 0; i < 4; i++) shock(1390, 520, tF + .5 + i * .55, ORANGE, 330);
tl.fromTo(B2b.val, {color: '#fff'}, {color: '#ffb27a', duration: .2, yoyo: true, repeat: 5}, tF + .5);
cue(tF + .5, 'alarm', .6);
const sup2 = words('Keep them apart and the|<em>alert fires</em>', 0, 140, {size: 72});
wordsIn(sup2, tF + .35, .2);
closeMove('whipL');
finish();
