// Scene 5 (dark): the camera starts inside the real TigerGraph schema, pulls out to the two Reyes records,
// each grows its own network on the spoken items; on "keep them separate" the networks slide apart.
const T = window.TOTAL, B2 = window.BEATS[1], B3 = window.BEATS[2];
world('dark', {particles: 46});
openMove('push');
// real product plate: Party at the centre of its identifiers
const demo = demoWin(360, 130, 1200, 'schema.png', 'TigerGraph · Entity_Resolution schema');
gsap.set(demo.in, {rotationY: -10, rotationX: 4});
tl.fromTo(demo, {z: -900, opacity: 0, filter: 'blur(14px)'}, {z: 0, opacity: 1, filter: 'blur(0px)', duration: .7, ease: 'expo.out'}, 0);
tl.to(demo.in, {rotationY: 6, rotationX: -2, duration: 2.6, ease: 'sine.inOut'}, .1);
const lbl = pill(560, 820, 'Party → Phone · Device · Email · DOB', 'o', {z: 4});
gsap.set(lbl.in.firstElementChild, {fontSize: 26});
pop(lbl, .7);
const tOut = at('records') + .25;
tl.to(demo, {scale: 2.6, z: 600, opacity: 0, filter: 'blur(20px)', duration: .55, ease: 'power3.in'}, tOut - .4);
tl.to(lbl, {y: 200, opacity: 0, duration: .3, ease: 'power2.in'}, tOut - .45);
cue(tOut - .4, 'whoosh', .7);
// two records + their networks
const TA = [[80, -280, 'card', 'Visa ··· 4410'], [-330, 40, 'device', 'iPhone · A71F'], [-260, -230, 'phone', '+1 415 ··· 2210'], [-220, 270, 'work', 'Northwind Logistics'], [60, 300, 'tx', 'Payroll, rent']];
const TB = [[80, -280, 'card', 'Mastercard ··· 7718'], [-330, 40, 'device', 'Android · 9C2E'], [-260, -230, 'phone', '+1 628 ··· 9034'], [-220, 270, 'work', 'Bayline Dental'], [60, 300, 'tx', 'Crypto, cash-outs']];
const tm = [tOut + .45, at('devices'), at('phones'), at('employers'), at('transactions')];
const nA = network(560, 540, 'Daniel Reyes', TA, 1, tm), nB = network(1360, 540, 'Dan Reyes', TB, -1, tm.map(t => t + .12));
flyIn(nA.name, tOut - .1, {x: -500, z: -400}); flyIn(nB.name, tOut + .05, {x: 500, z: -400});
// name nodes pulse as edges shoot out
[nA, nB].forEach((n, k) => tm.forEach(t => tl.fromTo(n.name.in, {scale: 1}, {scale: 1.07, duration: .14, yoyo: true, repeat: 1, ease: 'power2.out'}, t - .2 + k * .12)));
const div = node('<div class="w" style="left:958px;top:150px;width:4px;height:800px;background:linear-gradient(transparent,rgba(190,230,255,.6),transparent)"></div>');
tl.fromTo(div, {scaleY: 0, opacity: 0}, {scaleY: 1, opacity: 1, duration: .8, ease: 'expo.out'}, tOut + .8);
tl.to(div, {opacity: .25, duration: .5, yoyo: true, repeat: 7, ease: 'sine.inOut'}, tOut + 1.6);
// keep them separate
const tK = at('keep');
tl.to(nA.g, {x: -110, y: 30, duration: .8, ease: 'expo.inOut'}, tK - .3);
tl.to(nB.g, {x: 110, y: 30, duration: .8, ease: 'expo.inOut'}, tK - .3);
tl.to(div, {opacity: 0, duration: .3}, tK - .3);
cue(tK - .3, 'whoosh_s', .6);
const sup = words('Similar names.|<em>Separate lives.</em>', 0, 60, {size: 72});
wordsIn(sup, at('graph') - .1, .35);
const ks = pill(960, 560, 'Keep separate ✓', 'w', {z: 6});
tl.fromTo(ks, {y: -420, opacity: 0, scale: 1.4}, {y: 0, opacity: 1, scale: 1, duration: .5, ease: 'expo.out'}, at('separate'));
cue(at('separate'), 'lock', .7);
float(ks, at('separate') + .5, T, 5, 2.4);
closeMove('dive');
finish();
