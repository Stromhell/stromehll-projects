// Scene 6 (dark): the two name labels grow into risk cards; the old network lines fly in and become the risk bars.
// "Wrong merge": the cards start moving together and a link forms, but an orange warning stops it; the link splits, they return.
// "Hide a fraud alert": a ghost merged card shows the alert swallowed; "should have fired": back apart, Dan's alert bar fills once.
const T = window.TOTAL;
world('dark', {particles: 34});
gsap.set('#cam', {scale: .88, transformOrigin: '960px 500px'});
const card = (cx, label, val, col) => {
  const b = glass(cx - 320, 400, 640, `<div class="nm" style="font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.8">${label}</div>
    <div style="margin-top:18px;height:30px;border-radius:18px;background:rgba(255,255,255,.08);overflow:hidden"><div class="fill" style="height:100%;width:0%;border-radius:18px;background:linear-gradient(90deg,${col},${col === ORANGE ? '#ff8a3d' : '#8fd0f5'});box-shadow:0 0 26px rgba(190,235,255,.3)"></div></div>
    <div class="val" style="margin-top:14px;font-size:28px;font-weight:600">${val}</div>`, 'padding:28px 34px');
  b.fill = b.querySelector('.fill'); b.val = b.querySelector('.val'); return b;
};
const A = card(470, 'Daniel Reyes · risk', 'Low', BLUE), Bc = card(1450, 'Dan Reyes · risk', 'High: fraud alert pending', ORANGE);
// v4: frosted glass body; orange only as a thin rim glow on the high-risk card
gsap.set(Bc.in.firstElementChild, {borderColor: 'rgba(255,138,61,.55)', boxShadow: '0 40px 90px rgba(0,0,0,.5), 0 0 40px rgba(236,100,8,.22), inset 0 2px 0 rgba(255,255,255,.3)'});
// labels grow into cards (same spot as the last frame of the network scene)
[[A, pose(470, 495, 640, 190)], [Bc, pose(1450, 495, 640, 190)]].forEach(([c, P], k) => {
  const ch = chipOf(c, 'border-radius:30px');
  morph(ch, P, c, .6, .45, 'power2.out'); tl.fromTo(c, {opacity: 0}, {opacity: 1, duration: .3}, .85 + k * .05); tl.to(ch, {opacity: 0, duration: .25}, 1.05 + k * .05);
});
cue(.05, 'whoosh_s', .5);
// network lines fly in from where the attributes were and become horizontal data indicators
const ls = svgLayer($('#cam'));
[[470, 0], [1450, 1]].forEach(([cx, k]) => {
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * .7 + (k ? Math.PI : 0), sx = cx + Math.cos(a) * 340, sy = 470 + Math.sin(a) * 300;
    const p = svgPath(ls, `M${sx},${sy} L${cx - 300 + i * 120},${485}`, 'rgba(190,230,255,.55)', 2, .8); trim(p, .25 + i * .06, .5, 'power2.in');
    tl.to(p, {opacity: 0, duration: .3}, .75 + i * .06);
  }
});
tl.to(A.fill, {width: '32%', duration: 1.0, ease: 'power2.out'}, .8); tl.to(Bc.fill, {width: '88%', duration: 1.2, ease: 'power2.out'}, .9);
cue(.8, 'riser', .25);
const al = W_(`<div style="position:relative;width:60px;height:60px;border-radius:50%;background:${ORANGE};display:flex;align-items:center;justify-content:center;box-shadow:0 0 34px rgba(236,100,8,.8)">${icon('alert', 34)}</div>`, 1700, 372, {z: 5});
tl.fromTo(al, {scale: .4, opacity: 0}, {scale: 1, opacity: 1, duration: .45, ease: EZO}, 1.3);
float(A, 1.2, T, 3, 6); float(Bc, 1.3, T, 3, 6.4);
// the merge attempt, interrupted
const tW = at('wrong') - .1;
tl.to(A, {x: 120, duration: 1.1, ease: 'power2.inOut'}, tW); tl.to([Bc, al], {x: -120, duration: 1.1, ease: 'power2.inOut'}, tW);
const link = svgPath(ls, 'M790,520 L1130,520', '#fff', 4, .9); link.setAttribute('stroke-dasharray', '10 10'); gsap.set(link, {opacity: 0});
tl.set(link, {opacity: .9}, tW + .3);
tl.fromTo(link, {attr: {d: 'M910,520 L910,520'}}, {attr: {d: 'M910,520 L960,520'}, duration: .5, ease: 'power2.out'}, tW + .3);
const warn = W_(`<div style="position:relative;width:96px;height:96px;border-radius:50%;background:${ORANGE};display:flex;align-items:center;justify-content:center;box-shadow:0 0 60px rgba(236,100,8,.9)">${icon('alert', 54)}</div>`, 912, 472, {z: 8});
const tWarn = at('risk') - .2;
tl.fromTo(warn, {scale: .5, opacity: 0}, {scale: 1, opacity: 1, duration: .4, ease: EZO}, tWarn);
cue(tWarn, 'alarm', .45);
tl.to(link, {opacity: 0, attr: {d: 'M810,540 L880,560'}, duration: .35, ease: 'power2.in'}, tWarn + .25);
tl.to(A, {x: 0, duration: .8, ease: 'power3.out'}, tWarn + .35); tl.to([Bc, al], {x: 0, duration: .8, ease: 'power3.out'}, tWarn + .35);
tl.to(warn, {scale: .7, opacity: 0, duration: .35, ease: 'power2.in'}, tWarn + 1.3);
const sup = words('Wrong merge =|<em>hidden risk</em>', 0, 150, {size: 72});
rise(sup.ws[0], tWarn + .3, .5); rise(sup.ws[1], tWarn + .75, .5);
cue(tWarn + .75, 'thump', .5);
// what a merge would hide: a ghost merged card swallows the alert
const tH = at('hide') - .3;
wordsOut(sup, tH - .2);
tl.to([A, Bc, al], {opacity: .25, filter: 'blur(4px)', duration: .4}, tH);
const M = glass(620, 660, 680, `<div style="font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.8">If merged · risk</div>
  <div style="margin-top:18px;height:30px;border-radius:18px;background:rgba(255,255,255,.08);overflow:hidden"><div class="mf" style="height:100%;width:0%;border-radius:18px;background:linear-gradient(90deg,${BLUE},#7fc4ea 55%,#ff8a3d)"></div></div>
  <div style="margin-top:14px;font-size:28px;font-weight:600">Medium… the alert never fires</div>`, 'padding:28px 34px;border-style:dashed');
rise(M, tH + .1, .55, 40);
tl.to(M.querySelector('.mf'), {width: '58%', duration: .9, ease: 'power2.out'}, tH + .3);
tl.to(al, {opacity: 1, filter: 'blur(0px)', x: -600, y: 330, scale: .3, duration: .8, ease: 'power3.in'}, tH + .5);
tl.to(al, {opacity: 0, duration: .2}, tH + 1.25);
cue(tH + 1.2, 'whomp', .6);
// back apart: the alert fires once on Dan's card
const tF = at('should') - .2;
tl.to(M, {opacity: 0, y: 40, filter: 'blur(8px)', duration: .4, ease: 'power2.in'}, tF);
tl.to([A, Bc], {opacity: 1, filter: 'blur(0px)', duration: .4}, tF);
tl.set(al, {x: 0, y: 0, scale: .4}, tF);
tl.to(Bc.fill, {width: '100%', duration: .6, ease: 'power2.inOut'}, tF + .3);
tl.to(al, {opacity: 1, scale: 1.15, duration: .4, ease: EZO}, tF + .5).to(al, {scale: 1, duration: .4, ease: 'sine.out'}, tF + .9);
tl.fromTo(al.in.firstElementChild, {boxShadow: '0 0 34px rgba(236,100,8,.8)'}, {boxShadow: '0 0 80px rgba(255,140,60,1)', duration: .5, ease: 'power2.out'}, tF + .5);
tl.to(Bc.val, {opacity: 0, duration: .15}, tF + .45).call(() => { Bc.val.textContent = '⚠ Fraud alert fired'; }, null, tF + .6).to(Bc.val, {opacity: 1, color: '#ffb27a', duration: .25}, tF + .6);
tl.call(() => { Bc.val.textContent = 'High: fraud alert pending'; }, null, tF + .59);
cue(tF + .5, 'alarm', .55);
const sup2 = words('Keep them apart and the|<em>alert fires</em>', 0, 150, {size: 68});
rise(sup2.ws[0], tF + .2, .5); rise(sup2.ws[1], tF + .7, .5);
// v6 carry out: both risk cards travel up into the record cards of the next scene; the orange risk bar drops to seed the gauge
const tX = T - .7;
tl.to(sup2, {opacity: 0, y: -30, filter: 'blur(8px)', duration: .4, ease: 'power2.in'}, tX);
[[A, pose(450, 295, 560, 250)], [Bc, pose(1470, 295, 560, 250)]].forEach(([c, P], k) => {
  const ch = chipOf(c, 'border-radius:30px');
  morph(ch, c, P, tX + k * .05, .7, 'power3.inOut', 40);
  tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX + k * .05); tl.to(c, {opacity: 0, duration: .15}, tX + .06);
});
const bar = chip(`border-radius:15px;background:linear-gradient(90deg,${ORANGE},#ff8a3d);box-shadow:0 0 26px rgba(236,100,8,.6)`);
morph(bar, Bc.fill, pose(960, 760, 420, 28), tX + .05, .7, 'power3.inOut', -60);
tl.fromTo(bar, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX + .05); tl.to(al, {opacity: 0, scale: .6, duration: .3}, tX);
closeMove('pull');
finish();
