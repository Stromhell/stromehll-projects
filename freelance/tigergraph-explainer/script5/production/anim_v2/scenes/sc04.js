// Scene 4 (light, music only): two glass lenses roll in. Left scans the letters, right grows a network tile by tile.
const T = window.TOTAL;
world('light', {particles: 34});
openMove('whipL');
const lens = (x, inner) => W_(`<div class="glass" style="position:relative;width:620px;height:620px;border-radius:50%;overflow:hidden">${inner}</div>`, x, 120);
const L = lens(240, `<div class="txt" style="position:absolute;left:100px;top:210px;font-size:46px;font-weight:600;line-height:1.5">Daniel Reyes<br><span class="hl">Dan</span> Reyes</div>
  <div style="position:absolute;left:100px;top:390px;font-size:28px;font-weight:300;line-height:1.5">Harbo<span class="hl">u</span>r View Ap<span class="hl">artmen</span>ts</div>
  <div class="scan" style="position:absolute;top:0;left:0;width:90px;height:620px;background:linear-gradient(90deg,transparent,rgba(67,164,220,.45),transparent)"></div>`);
const Rl = lens(1060, '');
// roll in like glass discs
tl.fromTo(L, {x: -900, rotation: -200, opacity: 0}, {x: 0, rotation: 0, opacity: 1, duration: .9, ease: 'expo.out'}, .1);
tl.fromTo(Rl, {x: 900, rotation: 200, opacity: 0}, {x: 0, rotation: 0, opacity: 1, duration: .9, ease: 'expo.out'}, .3);
cue(.1, 'whoosh', .6, -.5); cue(.3, 'whoosh', .6, .5);
float(L, 1, T, 6, 3.6); float(Rl, 1.2, T, 6, 3.1);
// left: scan beam sweeps, differing letters light orange
const scan = L.querySelector('.scan');
tl.fromTo(scan, {x: -100}, {x: 640, duration: 1.6, ease: 'power1.inOut', repeat: 1, repeatDelay: .8}, 1.0);
L.querySelectorAll('.hl').forEach((h, i) => tl.fromTo(h, {color: NAVY}, {color: ORANGE, duration: .2}, 1.3 + i * .35));
for (let i = 0; i < 3; i++) cue(1.3 + i * .35, 'tick', .4, -.4);
// right: network grows outward
const net = svgLayer(Rl.in.firstElementChild);
const C = [310, 310], ends = [[150, 160, 'phone'], [470, 150, 'device'], [150, 460, 'work'], [470, 460, 'card']];
const center = tile(310, 310, 'id', '', 'n', 118, {parent: Rl.in.firstElementChild});
pop(center, 1.1);
ends.forEach(([x, y, ic], i) => {
  const t = 1.6 + i * .32;
  edge(net, C[0], C[1], x, y, BLUE, 4).draw(t, .35).pulse(t + .4, T - t - .6, '#fff', 1.3);
  const tl_ = tile(x, y, ic, '', '', 96, {parent: Rl.in.firstElementChild}); pop(tl_, t + .25);
  float(tl_, t + .7, T, 5, 2.4 + i * .3);
});
tl.to(center.in, {scale: 1.12, duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut'}, 3.2);
// vs pill bounces in, captions rise
const vs = pill(960, 430, 'vs', 'b', {z: 5}); pop(vs, 1.5);
const cap = (x, t1, t2) => W_(`<div style="position:relative;width:620px;text-align:center"><div style="font-size:44px;font-weight:700">${t1}</div><div style="font-size:26px;font-weight:300;margin-top:6px">${t2}</div></div>`, x, 770);
const c1 = cap(240, 'Look alike?', 'Fuzzy matching compares the text'), c2 = cap(1060, 'Belong together?', 'Graph looks at the network around it');
tl.fromTo([c1, c2], {y: 50, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .55, ease: 'expo.out', stagger: .5}, 2.0);
closeMove('dive');
finish();
