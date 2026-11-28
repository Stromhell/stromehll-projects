// Scene 4 (light, music only): two glass lenses roll in. Left scans the letters, right grows a network tile by tile.
const T = window.TOTAL;
world('light', {particles: 30});
const lens = (x, inner) => W_(`<div class="glass" style="position:relative;width:620px;height:620px;border-radius:50%;overflow:hidden">${inner}</div>`, x, 120);
const L = lens(240, `<div class="txt" style="position:absolute;left:100px;top:210px;font-size:46px;font-weight:600;line-height:1.5">Daniel Reyes<br><span class="hl">Dan</span> Reyes</div>
  <div style="position:absolute;left:100px;top:390px;font-size:28px;font-weight:300;line-height:1.5">Harbo<span class="hl">u</span>r View Ap<span class="hl">artmen</span>ts</div>
  <div class="scan" style="position:absolute;top:0;left:0;width:90px;height:620px;background:linear-gradient(90deg,transparent,rgba(67,164,220,.45),transparent)"></div>`);
const Rl = lens(1060, '');
// roll in like glass discs
tl.fromTo(L, {opacity: 0}, {opacity: 1, duration: .35}, .8);
tl.fromTo(Rl, {opacity: 0}, {opacity: 1, duration: .35}, .84);
[[L, pose(550, 430, 620, 620)], [Rl, pose(1370, 430, 620, 620)]].forEach(([el, P]) => {
  const ch = chip('border-radius:310px;background:rgba(255,255,255,.78);border:1.5px solid rgba(190,230,255,.7);box-shadow:0 34px 80px rgba(10,38,71,.25), inset 0 2px 0 #fff');
  morph(ch, P, el, .6, .45, 'power2.out'); tl.to(ch, {opacity: 0, duration: .3}, 1.05);
});
cue(.1, 'whoosh', .6, -.5); cue(.3, 'whoosh', .6, .5);
float(L, 1, T, 4, 6); float(Rl, 1.2, T, 4, 6.4);
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
// small data points travel around the left profile (comparing text), the right side keeps growing links
for (let i = 0; i < 6; i++) {
  const d = node(`<div class="dot" style="left:0;top:0;width:12px;height:12px;background:${BLUE};box-shadow:0 0 10px ${BLUE}"></div>`, L.in.firstElementChild);
  const o = {a: i * 1.05};
  const put = () => gsap.set(d, {x: 304 + Math.cos(o.a) * 282, y: 304 + Math.sin(o.a) * 282});
  tl.fromTo(o, {a: i * 1.05}, {a: i * 1.05 + 3.2, duration: T, ease: 'none', onUpdate: put, immediateRender: true}, 0); put();
  tl.fromTo(d, {opacity: 0}, {opacity: 1, duration: .4}, 1.1 + i * .08);
}
[[150, 160, 470, 150], [150, 460, 470, 460], [150, 160, 150, 460]].forEach(([x1, y1, x2, y2], i) => edge(net, x1, y1, x2, y2, 'rgba(67,164,220,.55)', 3, '4 8', false).draw(3.0 + i * .25, .6, 'power2.inOut'));
// vs pill bounces in, captions rise
// v4 VS: a clean frosted-glass disc with a 1 px specular rim (vector, no matte edges)
const vs = W_(`<div style="position:relative;width:120px;height:120px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:700;color:${NAVY};background:linear-gradient(150deg,rgba(255,255,255,.95),rgba(220,238,250,.75));border:1px solid rgba(255,255,255,1);box-shadow:0 18px 40px rgba(10,38,71,.18),inset 0 1px 0 #fff">vs</div>`, 900, 370, {z: 5});
pop(vs, 1.5);
tl.fromTo(vs.in.firstElementChild, {boxShadow: '0 18px 40px rgba(10,38,71,.18), 0 0 0 rgba(67,164,220,0)'}, {boxShadow: '0 18px 40px rgba(10,38,71,.18), 0 0 46px rgba(67,164,220,.55)', duration: .6}, 1.8);
const cap = (x, t1, t2) => W_(`<div style="position:relative;width:620px;text-align:center"><div style="font-size:44px;font-weight:700">${t1}</div><div style="font-size:26px;font-weight:300;margin-top:6px">${t2}</div></div>`, x, 770);
const c1 = cap(240, 'Look alike?', 'Fuzzy matching compares the text'), c2 = cap(1060, 'Belong together?', 'Graph looks at the network around it');
tl.fromTo([c1, c2], {y: 50, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .55, ease: 'expo.out', stagger: .5}, 2.0);
// the camera pushes toward the right lens: the network becomes the next scene's graph interface
// v4 node-through push: the camera dives into the Graph lens; its inside turns deep navy and becomes the next scene's network space
const deep = node(`<div style="position:absolute;inset:0;border-radius:50%;background:#fff url(../../../storyboard/build/demo/schema.png) 46% 52%/260% auto no-repeat;opacity:0"></div>`, Rl.in.firstElementChild);
tl.to(deep, {opacity: 1, duration: .45, ease: 'power1.inOut'}, T - .6);   // v5: the schema appears inside the Graph lens as the camera dives in
tl.to([L, c1, c2, vs], {opacity: 0, duration: .4}, T - .3);
closeMove('portal', .5, 1370, 430);
finish();
