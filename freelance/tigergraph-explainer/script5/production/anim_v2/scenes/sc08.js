// Scene 8 (dark): the Novak networks grow; the shared phone, device and company slide in from both sides and collide
// in the centre, edges turn orange; on "Different names. Same person." the records lock together.
const T = window.TOTAL, B2 = window.BEATS[1];
world('dark', {particles: 46});
openMove('push');
const NA = [[-300, -200, 'mail', 'lena.n@···'], [-320, 120, 'card', 'Visa ··· 2290'], [-120, 300, 'tx', 'Small transfers']];
const NB = [[-300, -200, 'home', 'Branch: Riverside'], [-320, 120, 'bank', 'Acct ··· 5531'], [-120, 300, 'tx', 'Cash-outs']];
const svg = svgLayer($('#cam'));
const nA = network(470, 520, 'Lena Novak', NA, 1, [.6, .85, 1.1]), nB = network(1450, 520, 'L. Novakova', NB, -1, [.7, .95, 1.2]);
flyIn(nA.name, .1, {x: -500}); flyIn(nB.name, .25, {x: 500});
const S = [[960, 300, 'phone', 'Same verified phone', at('phone')], [960, 520, 'device', 'Same device', at('device')], [960, 740, 'director', 'Director · Novak Trading Ltd', at('company')]];
S.forEach(([x, y, ic, lab, t], i) => {
  // two copies, one from each record, meet in the middle and become one orange tile
  const l = tile(x, y, ic, '', '', 118), r = tile(x, y, ic, '', '', 118);
  tl.fromTo(l, {x: -490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .5, ease: 'power3.in'}, t - .5);
  tl.fromTo(r, {x: 490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .5, ease: 'power3.in'}, t - .5);
  tl.set([l, r], {opacity: 0}, t);
  const o = tile(x, y, ic, lab, 'o', 118, {z: 4});
  tl.fromTo(o, {opacity: 0, scale: 1.35}, {opacity: 1, scale: 1, duration: .4, ease: 'expo.out'}, t);
  shock(x, y, t, ORANGE, 160); cue(t, 'clack', .9);
  edge(svg, 470, 520, x, y, ORANGE, 5).draw(t + .05, .35).pulse(t + .4, T - t - .5, '#ffd2b0', 1.2);
  edge(svg, 1450, 520, x, y, ORANGE, 5).draw(t + .05, .35).pulse(t + .5, T - t - .6, '#ffd2b0', 1.25);
  float(o, t + .5, T, 5, 2.4 + i * .4);
});
// name glows warm once linked
[nA, nB].forEach(n => tl.to(n.name.in.firstElementChild, {boxShadow: '0 0 60px rgba(236,100,8,.65)', borderColor: 'rgba(255,178,122,.9)', duration: .6}, at('company') + .3));
const inv = pill(960, 960, '🔍 Investigate before merging', 'w', {z: 6});
gsap.set(inv.in.firstElementChild, {fontSize: 26});
pop(inv, at('investigate'));
// lock together
const tL = at('different');
tl.to(inv, {opacity: 0, y: 30, duration: .3}, tL - .5);
tl.to(nA.g, {x: 140, duration: .5, ease: 'expo.in'}, tL - .55); tl.to(nB.g, {x: -140, duration: .5, ease: 'expo.in'}, tL - .55);
tl.to(svg, {scaleX: .86, transformOrigin: '960px 520px', duration: .5, ease: 'expo.in'}, tL - .55);
cue(tL - .05, 'lock', 1);
shock(960, 520, tL - .05, ORANGE, 520); shock(960, 520, tL + .15, '#ffb27a', 700); flash(tL - .05, 'rgba(236,100,8,.35)', .5);
tl.fromTo('#world', {x: 0}, {x: 8, duration: .05, yoyo: true, repeat: 5}, tL - .05);
const sup = words('Different names.|<em>Same person.</em>', 0, 930, {size: 64});
wordsIn(sup, tL, .45);
closeMove('dive');
finish();
