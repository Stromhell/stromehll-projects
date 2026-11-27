// Scene 8 (dark): the Novak networks grow; the shared phone, device and company slide in from both sides and collide
// in the centre, edges turn orange; on "Different names. Same person." the records lock together.
const T = window.TOTAL, B2 = window.BEATS[1];
world('dark', {particles: 34});
const NA = [[-300, -200, 'mail', 'lena.n@···'], [-320, 120, 'card', 'Visa ··· 2290'], [-120, 300, 'tx', 'Small transfers']];
const NB = [[-300, -200, 'home', 'Branch: Riverside'], [-320, 120, 'bank', 'Acct ··· 5531'], [-120, 300, 'tx', 'Cash-outs']];
const svg = svgLayer($('#cam'));
const nA = network(470, 520, 'Lena Novak', NA, 1, [.6, .85, 1.1]), nB = network(1450, 520, 'L. Novakova', NB, -1, [.7, .95, 1.2]);
slideIn(nA.name, .05, 1, .7, 300); slideIn(nB.name, .15, -1, .7, 300);  // names start near the centre and move out to their places
const S = [[960, 300, 'phone', 'Same verified phone', at('phone')], [960, 520, 'device', 'Same device', at('device')], [960, 740, 'director', 'Director · Novak Trading Ltd', at('company')]];
S.forEach(([x, y, ic, lab, t], i) => {
  // two copies, one from each record, meet in the middle and become one orange tile
  const l = tile(x, y, ic, '', '', 118), r = tile(x, y, ic, '', '', 118);
  tl.fromTo(l, {x: -490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .6, ease: 'power2.inOut'}, t - .6);
  tl.fromTo(r, {x: 490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .6, ease: 'power2.inOut'}, t - .6);
  tl.set([l, r], {opacity: 0}, t);
  const o = tile(x, y, ic, lab, 'o', 118, {z: 4});
  tl.fromTo(o, {opacity: 0, scale: 1.15}, {opacity: 1, scale: 1, duration: .45, ease: 'expo.out'}, t); tl.fromTo(o, {opacity: 0}, {opacity: 1, duration: .12}, t);
  tl.fromTo(o.in.firstElementChild, {boxShadow: '0 0 0 rgba(236,100,8,0)'}, {boxShadow: '0 0 60px rgba(255,150,70,.95)', duration: .3, yoyo: true, repeat: 1}, t + .05); cue(t, 'clack', .7); shock(x, y, t, ORANGE, 200);
  edge(svg, 470, 520, x, y, ORANGE, 5).draw(t + .05, .6, 'power2.inOut');
  edge(svg, 1450, 520, x, y, ORANGE, 5).draw(t + .1, .6, 'power2.inOut');
  float(o, t + .5, T, 3, 6);
});
// name glows warm once linked
[nA, nB].forEach(n => tl.to(n.name.in.firstElementChild, {boxShadow: '0 0 40px rgba(236,100,8,.45)', borderColor: 'rgba(255,178,122,.9)', duration: .6}, at('company') + .3));
const inv = pill(960, 960, '🔍 Investigate before merging', 'w', {z: 6});
gsap.set(inv.in.firstElementChild, {fontSize: 26});
rise(inv, at('investigate') - .1, .5);
// one orange connection travels from Lena through every shared node to Novakova
const tP = at('merging') + .1;
const path = svgPath(svg, 'M590,520 C760,420 900,300 960,300 C1020,300 1000,520 960,520 C920,520 900,740 960,740 C1040,740 1180,620 1330,520', '#ffb27a', 7);
path.style.filter = 'drop-shadow(0 0 10px rgba(236,100,8,.9))';
trim(path, tP, 1.3, 'power1.inOut'); cue(tP, 'shimmer', .5);
tl.to(path, {opacity: .3, duration: .6}, tP + 1.4);
const comet = svgDot(svg, 590, 520, 12, '#fff', 0); comet.style.filter = 'drop-shadow(0 0 12px #ffb27a)';
const cp = {p: 0}, Lp = path.getTotalLength();
tl.fromTo(cp, {p: 0}, {p: 1, duration: 1.3, ease: 'power1.inOut', onUpdate: () => { const q = path.getPointAtLength(cp.p * Lp); comet.setAttribute('cx', q.x); comet.setAttribute('cy', q.y); }, immediateRender: false}, tP);
tl.fromTo(comet, {opacity: 0}, {opacity: 1, duration: .15}, tP).to(comet, {opacity: 0, duration: .3}, tP + 1.2);
const tL = at('different');
tl.to(inv, {opacity: 0, y: 30, duration: .3}, tL - .6);
tl.to(nA.g, {x: 60, duration: 1.2, ease: 'power2.inOut'}, tL - .7); tl.to(nB.g, {x: -60, duration: 1.2, ease: 'power2.inOut'}, tL - .7);
[nA, nB].forEach(n => tl.to(n.name.in.firstElementChild, {borderColor: '#ff8a3d', boxShadow: '0 0 60px rgba(236,100,8,.6), inset 0 0 0 1px rgba(255,138,61,.7)', duration: .5}, tL));
cue(tL - .05, 'lock', .6);
const sup = words('Different names.|<em>Same person.</em>', 0, 930, {size: 64});
sup.ws.forEach((w, i) => rise(w, [at('different'), at('same')][i] - .1, .5));
closeMove('dive');
finish();
