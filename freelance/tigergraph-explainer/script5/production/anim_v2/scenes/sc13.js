// Scene 13 (dark, data card): rack focus from the real dashboard (Adobe-expanded plate) to the glass card;
// 28% ring draws thin and muted, a dotted arrow streaks, the 90% ring sweeps round while the number counts up.
const T = window.TOTAL;
world('dark', {particles: 40});
openMove('push');
const back = node('<div class="w" style="left:-80px;top:-60px;width:2080px;height:1200px;background:url(../../adobe/dashboard_expand_lensblur_adobe.png) center/cover;filter:blur(18px) brightness(.35) saturate(.8)"></div>');
tl.fromTo(back, {opacity: 0, scale: 1.1}, {opacity: .7, scale: 1, duration: 1.2, ease: 'sine.out'}, 0);
const dash = W_(`<div class="demo" style="position:relative;width:1455px"><img src="../../../storyboard/build/demo/dashboard.png"></div>`, 232, 80);
gsap.set(dash.in, {rotationX: 14});
tl.fromTo(dash, {opacity: 0, z: -300}, {opacity: 1, z: -120, duration: .5, ease: 'expo.out'}, 0);
tl.fromTo(dash, {filter: 'blur(0px) brightness(1)'}, {filter: 'blur(9px) brightness(.45)', duration: .8, ease: 'power2.inOut'}, .8);
tl.to(dash, {z: -260, duration: T, ease: 'sine.inOut'}, .5);
const card = W_('<div class="glass" style="position:relative;width:1400px;height:820px"></div>', 260, 130, {z: 3});
tl.fromTo(card, {opacity: 0, filter: 'blur(16px)', scale: 1.08}, {opacity: 1, filter: 'blur(0px)', scale: 1, duration: .8, ease: 'power2.inOut'}, .8);
cue(.8, 'whoosh_s', .5);
const kick = W_('<div class="kick" style="position:relative;width:1920px;text-align:center">Nubank fraud-detection recall</div>', 0, 180, {z: 4});
tl.fromTo(kick, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: .5, ease: 'expo.out'}, 1.2);
const svg = svgLayer($('#cam'), 4);
const ring = (cx, cy, r, w, col, glow) => {
  const L = 2 * Math.PI * r;
  svg.insertAdjacentHTML('beforeend', `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="${w}"/>` +
    (glow ? `<circle class="g${cx}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(67,164,220,.4)" stroke-width="46" stroke-dasharray="0 ${L}" transform="rotate(-90 ${cx} ${cy})" style="filter:blur(10px)"/>` : '') +
    `<circle class="a${cx}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0 ${L}" transform="rotate(-90 ${cx} ${cy})"/>`);
  return L;
};
svg.insertAdjacentHTML('beforeend', '<defs><linearGradient id="tgb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#43a4dc"/></linearGradient></defs>');
const L1 = ring(640, 520, 190, 22, 'rgba(255,255,255,.45)', false), L2 = ring(1280, 520, 230, 30, 'url(#tgb)', true);
tl.fromTo(svg, {opacity: 0}, {opacity: 1, duration: .3}, 1.3);
const o1 = {p: 0}, o2 = {p: 28};
const a1 = svg.querySelector('.a640'), a2 = svg.querySelector('.a1280'), g2 = svg.querySelector('.g1280');
tl.fromTo(o1, {p: 0}, {p: 28, duration: .8, ease: 'power2.out', onUpdate: () => a1.setAttribute('stroke-dasharray', `${L1 * o1.p / 100} ${L1}`)}, 1.5);
const lab = (cx, cy, r, num, label, hot) => W_(`<div style="position:relative;width:${2 * r + 120}px;text-align:center"><div class="nv" style="height:${2 * r}px;display:flex;align-items:center;justify-content:center;font-size:${hot ? 130 : 96}px;font-weight:${hot ? 700 : 300};color:${hot ? '#fff' : 'rgba(255,255,255,.6)'}">${num}</div><div style="margin-top:40px;font-size:24px;letter-spacing:3px;font-weight:600;color:${hot ? '#bfe6ff' : 'rgba(255,255,255,.55)'}">${label}</div></div>`, cx - r - 60, cy - r, {z: 5});
const l1 = lab(640, 520, 190, '28%', 'WITHOUT GRAPH FEATURES', false), l2 = lab(1280, 520, 230, '28%', 'WITH GRAPH FEATURES', true);
tl.fromTo(l1, {opacity: 0, scale: .8}, {opacity: 1, scale: 1, duration: .5, ease: 'expo.out'}, 1.5);
count(l1.querySelector('.nv'), 1.5, 0, 28, .8);
const ar = edge(svg, 860, 520, 1020, 520, '#bfe6ff', 5, '2 12', false).draw(2.4, .35, 'expo.out');
cue(2.4, 'whoosh_s', .5);
tl.fromTo(l2, {opacity: 0, scale: .8}, {opacity: 1, scale: 1, duration: .5, ease: 'expo.out'}, 2.6);
const set2 = () => { a2.setAttribute('stroke-dasharray', `${L2 * o2.p / 100} ${L2}`); g2.setAttribute('stroke-dasharray', `${L2 * o2.p / 100} ${L2}`); };
tl.fromTo(o2, {p: 28}, {p: 90, duration: 1.3, ease: 'power2.out', onUpdate: set2, immediateRender: false}, 2.7);
count(l2.querySelector('.nv'), 2.7, 28, 90, 1.3);
cue(2.7, 'riser', .6); cue(4.0, 'chime', .6);
tl.fromTo(l2.querySelector('.nv'), {textShadow: '0 0 0 rgba(191,230,255,0)'}, {textShadow: '0 0 40px rgba(191,230,255,.9)', duration: .4, yoyo: true, repeat: 1}, 4.0);
const src = W_('<div style="position:relative;width:1400px;text-align:center;font-size:22px;color:rgba(255,255,255,.65)">Source: TigerGraph, Real-Time Graph Analytics: Transforming Entity Resolution in Banking</div>', 260, 880, {z: 5});
tl.fromTo(src, {opacity: 0}, {opacity: 1, duration: .5}, 3.4);
closeMove('up');
finish();
