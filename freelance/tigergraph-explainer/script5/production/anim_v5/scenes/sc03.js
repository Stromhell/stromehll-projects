// Scene 3 (v4, deep navy, high contrast): the question builds in three lines of crisp white type over a dark vignette.
// Key phrases get glowing pill highlights as they are spoken. Below, record cards orbit slowly on a dotted 3D ring above a
// glowing horizon; a faint neural network grows behind as "graph-based entity resolution" is said.
const T = window.TOTAL;
world('dark', {particles: 30, horizon: 930});
document.querySelector('.bg').style.background = 'radial-gradient(1100px 700px at 50% 0%,rgba(67,164,220,.30),transparent 65%),linear-gradient(180deg,#0A1628 0%,#060e1c 100%)';
node('<div style="position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse 70% 60% at 50% 32%,transparent 40%,rgba(2,6,14,.75) 100%)"></div>', document.body);
neuralNet($('#cam'), [{t: at('graph') - .1, n: 10}, {t: at('resolution'), n: 26}, {t: at('kyc'), n: 40}], {op: .16, gap: .04, box: [120, 60, 1680, 520]});
// title zone (nothing crosses it): three lines, each word lands as it is spoken
const L1 = words('How do you decide between', 0, 140, {size: 72}), L2 = words('<em class="f">fuzzy matching</em>|and', 0, 236, {size: 72}), L3 = words('<em class="g">graph-based entity resolution</em>|for KYC?', 0, 332, {size: 72});
[L1, L2, L3].forEach(l => { l.style.color = '#fff'; l.style.textShadow = '0 2px 24px rgba(0,0,0,.6)'; });
const tw = (box, ts) => box.ws.forEach((w, i) => tl.fromTo(w, {y: 30, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .55, ease: 'expo.out'}, ts[i] - .06));
tw(L1, [at('how'), at('do'), at('you'), at('decide'), at('between')]);
tw(L2, [at('fuzzy'), at('and')]);
tw(L3, [at('graph'), at('for')]);
// glowing pill highlights behind the two key phrases
[[L2, 'fuzzy', '236,100,8', ORANGE], [L3, 'graph', '67,164,220', '#fff']].forEach(([l, w, rgb, col]) => {
  const em = l.querySelector('em'); Object.assign(em.style, {color: col, padding: '0 18px', borderRadius: '40px', fontStyle: 'normal'});
  tl.fromTo(em, {backgroundColor: `rgba(${rgb},0)`, boxShadow: `0 0 0 rgba(${rgb},0)`}, {backgroundColor: `rgba(${rgb},.16)`, boxShadow: `0 0 40px rgba(${rgb},.45), inset 0 0 0 1px rgba(${rgb},.6)`, duration: .6, ease: 'power2.out'}, at(w) + .35);
  cue(at(w) + .35, 'shimmer', .3);
});
// dotted 3D ring with orbiting record cards
const RCX = 960, RCY = 700, RX = 640, RY = 120;
const rs = svgLayer($('#cam'));
const ring = svgPath(rs, `M${RCX - RX},${RCY} a${RX},${RY} 0 1,0 ${2 * RX},0 a${RX},${RY} 0 1,0 ${-2 * RX},0`, 'rgba(190,230,255,.55)', 2.5);
ring.setAttribute('stroke-dasharray', '2 12'); ring.setAttribute('stroke-linecap', 'round');
tl.fromTo(rs, {opacity: 0, scaleX: .6, transformOrigin: `${RCX}px ${RCY}px`}, {opacity: 1, scaleX: 1, duration: 1.1, ease: 'expo.out'}, .2);
const recs = [['Daniel Reyes', '14 Harbor View Apts'], ['Dan Reyes', '14 Harbour View Apartments'], ['Lena Novak', 'Novak Trading Ltd'], ['L. Novakova', 'verified phone ···0482'], ['D. Reyes-Ortiz', 'same device'], ['Anna Lee', '12 Elm Street']];
const orbit = {a: 0}, fade = recs.map(() => ({v: 0}));
const cards = recs.map(([n, s]) => node(`<div class="glass" style="position:absolute;left:0;top:0;width:270px;padding:16px 20px;border-radius:18px"><div style="font-size:12px;letter-spacing:3px;font-weight:600;color:#bfe6ff">RECORD</div><div style="font-size:24px;font-weight:700;margin-top:4px">${n}</div><div style="font-size:16px;opacity:.75;margin-top:2px">${s}</div></div>`));
const place = () => cards.forEach((c, i) => {
  const a = orbit.a + i * Math.PI * 2 / cards.length, z = Math.sin(a);   // z: -1 back, +1 front
  gsap.set(c, {x: RCX + Math.cos(a) * RX - 135, y: RCY + z * RY - 48, scale: .72 + .28 * (z + 1) / 2, zIndex: Math.round(10 + z * 5), opacity: (.7 + .3 * (z + 1) / 2) * fade[i].v, filter: `blur(${(1 - z) * .7}px)`});
});
tl.fromTo(orbit, {a: 0}, {a: -Math.PI * .9, duration: T + .6, ease: 'none', onUpdate: place, immediateRender: true}, 0); place();
fade.forEach((f, i) => tl.fromTo(f, {v: 0}, {v: 1, duration: .6, ease: 'power1.out', onUpdate: place, immediateRender: false}, .4 + i * .12));
cue(.3, 'whoosh_s', .35);
tl.fromTo([L1, L2, L3], {scale: .99}, {scale: 1.02, duration: T, ease: 'sine.inOut'}, 0);
closeMove('dive', .35, 960, 620);
finish();
