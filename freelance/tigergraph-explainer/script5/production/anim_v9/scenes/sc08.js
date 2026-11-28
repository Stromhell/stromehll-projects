// Scene 8 (dark): the Novak networks grow; the shared phone, device and company slide in from both sides and collide
// in the centre, edges turn orange; on "Different names. Same person." the records lock together.
const T = window.TOTAL, B2 = window.BEATS[1];
world('dark', {particles: 34});
gsap.set('#cam', {scale: .84, transformOrigin: '960px 400px'});   // v5: networks smaller so the type has room
const NA = [[-300, -200, 'mail', 'lena.n@···'], [-320, 120, 'card', 'Visa ··· 2290'], [-120, 300, 'tx', 'Small transfers']];
const NB = [[-300, -200, 'home', 'Branch: Riverside'], [-320, 120, 'bank', 'Acct ··· 5531'], [-120, 300, 'tx', 'Cash-outs']];
const svg = svgLayer($('#cam'));
const nA = network(470, 520, 'Lena Novak', NA, 1, [.6, .85, 1.1]), nB = network(1450, 520, 'L. Novakova', NB, -1, [.7, .95, 1.2]);
[[nA.name, 'Lena Novak', pose(548, 501, 230, 60)], [nB.name, 'L. Novakova', pose(1372, 501, 240, 60)]].forEach(([n, nm, P], k) => {
  const ch = chip('border-radius:30px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;white-space:nowrap;color:#fff;background:linear-gradient(150deg,#2a5d8c,#0a2647);box-shadow:0 0 30px rgba(67,164,220,.5)', nm);
  morph(ch, P, n, .6, .4, 'power2.out'); tl.fromTo(n, {opacity: 0}, {opacity: 1, duration: .2}, .85); tl.to(ch, {opacity: 0, duration: .2}, 1.0);
});
const S = [[960, 300, 'phone', 'Same verified phone', at('phone')], [960, 520, 'device', 'Same device', at('device')], [960, 740, 'director', 'Director · Novak Trading Ltd', at('company')]];
const OT = [];
S.forEach(([x, y, ic, lab, t], i) => {
  // two copies, one from each record, meet in the middle and become one orange tile
  const l = tile(x, y, ic, '', '', 118), r = tile(x, y, ic, '', '', 118);
  tl.fromTo(l, {x: -490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .95, ease: 'sine.inOut'}, t - .95);
  tl.fromTo(r, {x: 490, y: 520 - y, opacity: 0, scale: .6}, {x: 0, y: 0, opacity: 1, scale: 1, duration: .95, ease: 'sine.inOut'}, t - .95);
  tl.set([l, r], {opacity: 0}, t);
  const o = tile(x, y, ic, lab, 'o', 118, {z: 4}); OT.push(o);
  tl.fromTo(o, {opacity: 0, scale: 1.15}, {opacity: 1, scale: 1, duration: .45, ease: EZO}, t); tl.fromTo(o, {opacity: 0}, {opacity: 1, duration: .12}, t);
  tl.fromTo(o.in.firstElementChild, {boxShadow: '0 0 0 rgba(236,100,8,0)'}, {boxShadow: '0 0 54px rgba(255,150,70,.8)', duration: .7, yoyo: true, repeat: 1, ease: 'sine.inOut'}, t + .05); cue(t, 'clack', .7); shock(x, y, t, 'rgba(255,138,61,.6)', 170);
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
// v6 carry out: each orange evidence node becomes one transaction card of the next scene (the camera follows them)
const tX = T - .72;
if (0) tl.to([sup, svg, nA.g, nB.g], {opacity: .25, duration: .5}, tX);
[[0, pose(280, 278, 260, 96)], [1, pose(550, 468, 260, 96)], [2, pose(300, 648, 260, 96)]].forEach(([i, P]) => {
  const o = OT[i], ch = chip(`border-radius:32px;background:linear-gradient(150deg,#ff9c55,${ORANGE});box-shadow:0 0 40px rgba(236,100,8,.6)`, '<div class="cg" style="position:absolute;inset:0;background:linear-gradient(150deg,rgba(255,255,255,.16),rgba(67,164,220,.10));border:1.5px solid rgba(190,230,255,.55);border-radius:30px;opacity:0"></div>');
  morph(ch, o.in.firstElementChild, P, tX + i * .05, .68, 'power3.inOut', 50);
  tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX + i * .05); tl.to(o, {opacity: 0, duration: .1}, tX + i * .05 + .03);
  tl.to(ch, {borderRadius: '30px', background: 'rgba(255,255,255,.06)', boxShadow: '0 0 24px rgba(236,100,8,.55), inset 0 0 0 1.5px rgba(255,138,61,.8)', duration: .55}, tX + .15); tl.to(ch.querySelector('.cg'), {opacity: 1, duration: .45}, tX + .2);
});
closeMove('orbit');
finish();
