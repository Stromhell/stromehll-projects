// Scene 5 (dark): the camera pushes into the real TigerGraph schema (relevant area large), pulls out to the two Reyes records.
// Each side grows a DIFFERENT network, node by node, each node lighting as its line reaches it. On "completely different
// transactions" the networks slide together, a temporary link tests them, mismatches flag, the link breaks, they move apart.
const T = window.TOTAL;
world('dark', {particles: 36});
const demo = demoWin(260, 110, 1400, 'schema.png', 'TigerGraph · Entity_Resolution schema');
gsap.set(demo.in, {rotationY: -9, rotationX: 4, transformPerspective: 1800});
tl.fromTo(demo, {opacity: 0, scale: .8, filter: 'blur(12px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .6, ease: 'expo.out'}, 0);
tl.to(demo.in, {rotationY: 0, rotationX: 0, duration: 1.6, ease: 'sine.inOut'}, .3);
const sweepG = node('<div style="position:absolute;top:-10%;bottom:-10%;width:22%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-18deg)"></div>', demo.in.firstElementChild);
gsap.set(demo.in.firstElementChild, {overflow: 'hidden'});
tl.fromTo(sweepG, {left: '-30%'}, {left: '120%', duration: 1.2, ease: 'power2.inOut'}, .5);
// zoom toward the Party hub so the identifiers read
tl.to(demo, {scale: 1.9, x: -80, y: 120, duration: 1.4, ease: 'power2.inOut'}, .45);
const lbl = pill(960, 900, 'Party → Phone · Device · Email · DOB', 'o', {z: 4, parent: $('#front')});
gsap.set(lbl.in.firstElementChild, {fontSize: 28});
rise(lbl, .9, .5);
const tOut = at('records') + .1;
tl.to(demo, {scale: 3.2, opacity: 0, filter: 'blur(18px)', duration: .5, ease: 'power3.in'}, tOut - .4);
tl.to(lbl, {y: 60, opacity: 0, duration: .3, ease: 'power2.in'}, tOut - .4);
cue(tOut - .4, 'whoosh', .6);
// different structures on each side
const TA = [[-300, -200, 'phone', '+1 415 ··· 2210'], [-340, 90, 'device', 'iPhone · A71F'], [40, -290, 'home', 'Harbor View, Apt 4'], [-180, 280, 'work', 'Northwind Logistics'], [110, 290, 'tx', 'Payroll, rent']];
const TB = [[-260, -250, 'phone', '+1 628 ··· 9034'], [-360, 20, 'device', 'Android · 9C2E'], [60, -300, 'mail', 'dreyes@mailbox.io'], [-250, 270, 'work', 'Bayline Dental'], [90, 300, 'tx', 'Crypto, cash-outs']];
const tm = [at('devices') - .9, at('devices'), at('phones'), at('employers'), at('transactions')];
tm[0] = tOut + .6;
const nA = network(560, 540, 'Daniel Reyes', TA, 1, [tm[2], tm[1], tm[0], tm[3], tm[4]]), nB = network(1360, 540, 'Dan Reyes', TB, -1, [tm[2], tm[1], tm[0], tm[3], tm[4]].map(t => t + .15));
slideIn(nA.name, tOut - .1, -1, .7, 400); slideIn(nB.name, tOut + .05, 1, .7, 400);
// slow camera push on the whole network
tl.fromTo([nA.g, nB.g], {scale: .94, transformOrigin: '960px 540px'}, {scale: 1, duration: 7, ease: 'sine.inOut'}, tOut);
// the test: networks drift together, a temporary link forms between the names
const tC = at('completely') - .1;
tl.to(nA.g, {x: 120, duration: 1.0, ease: 'power2.inOut'}, tC); tl.to(nB.g, {x: -120, duration: 1.0, ease: 'power2.inOut'}, tC);
const ls = svgLayer($('#cam'));
const link = svgPath(ls, 'M830,540 L1090,540', '#fff', 4, .9); link.setAttribute('stroke-dasharray', '10 10');
gsap.set(ls, {opacity: 0}); tl.set(ls, {opacity: 1}, tC + .6);
tl.fromTo(link, {attr: {d: 'M830,540 L830,540'}}, {attr: {d: 'M830,540 L1090,540'}, duration: .6, ease: 'power2.inOut'}, tC + .6);
cue(tC + .6, 'shimmer', .4);
// mismatches flag on each attribute pair
[0, 1, 3, 4].forEach((k, i) => {
  const t = tC + 1.1 + i * .22;
  [nA, nB].forEach(n => { const x = n.tiles[k]; const b = W_(`<div style="position:relative;width:38px;height:38px;border-radius:50%;background:${ORANGE};color:#fff;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(236,100,8,.8)">✕</div>`, 84, -12, {parent: x.in.firstElementChild}); pop(b, t, .35); tl.to(b, {opacity: 0, duration: .3}, at('separate') - .2); });
  cue(t, 'tick2', .35);
});
// the link breaks: two halves fall away
const tBk = at('graph') - .2;
tl.to(link, {attr: {d: 'M830,540 L930,575'}, opacity: 0, duration: .45, ease: 'power2.in'}, tBk);
const link2 = svgPath(ls, 'M990,540 L1090,540', '#fff', 4, 0); link2.setAttribute('stroke-dasharray', '10 10');
tl.fromTo(link2, {opacity: .9}, {attr: {d: 'M1000,505 L1090,540'}, opacity: 0, duration: .45, ease: 'power2.in'}, tBk);
cue(tBk, 'crack', .45);
// they move apart
const tK = at('keep') - .1;
tl.to(nA.g, {x: -10, duration: .9, ease: 'power3.inOut'}, tK); tl.to(nB.g, {x: 10, duration: .9, ease: 'power3.inOut'}, tK);
cue(tK, 'whoosh_s', .5);
const sup = words('Similar names.|<em>Separate lives.</em>', 0, 60, {size: 72});
sup.ws.forEach((w, i) => rise(w, at('graph') + .1 + i * .35, .5));
const ks = pill(960, 560, `${checkSvg(30, NAVY)} Keep separate`, 'w', {z: 6});
gsap.set(ks.in.firstElementChild, {display: 'flex', alignItems: 'center', gap: '10px'});
rise(ks, at('separate') - .15, .5, 30); drawCheck(ks, at('separate') + .2, .4);
cue(at('separate'), 'lock', .6);
// tail: every attribute collapses into its name label, which carries into the next scene's risk cards
const tE = T - .65;
[nA, nB].forEach((n, k) => {
  n.tiles.forEach(x => tl.to(x, {x: (k ? 1360 : 560) - (x.offsetLeft + 59) + (k ? 40 : -40) - (k ? 40 : -40), y: 540 - (x.offsetTop + 59), scale: .2, opacity: 0, duration: .5, ease: 'power3.in'}, tE));
  tl.to(n.svg, {opacity: 0, duration: .4}, tE);
});
tl.to([sup, ks, ls], {opacity: 0, y: -20, duration: .35, ease: 'power2.in'}, tE);
cue(tE, 'whoosh_s', .4);
finish();
