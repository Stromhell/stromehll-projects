// Scene 13 (dark, silent): start on the real dashboard, the camera zooms into its analytics area (the dashboard itself never
// tilts or drifts), the background darkens and the comparison panel comes forward. Both rings fill from 0: 28% left, then the
// larger 90% right; labels stay; once the numbers settle a connecting line joins them. Source line last.
const T = window.TOTAL;
world('dark', {particles: 36, from: 'light', reveal: .7});
const dash = W_(`<div class="demo" style="position:relative;width:1455px"><img src="../../../storyboard/build/demo/dashboard.png"></div>`, 232, 80);
gsap.set(dash, {transformOrigin: '70% 45%'});
tl.fromTo(dash, {opacity: 0, scale: .96}, {opacity: 1, scale: 1, duration: .5, ease: 'expo.out'}, 0);
tl.to(dash, {scale: 1.55, duration: 1.6, ease: 'power2.inOut'}, .45);
// darken through the Adobe lens-blur plate + a navy overlay (no filter on the zoomed dashboard: that dropped frames)
const plate = node('<div class="w" style="left:-80px;top:-60px;width:2080px;height:1200px;background:url(../../adobe/dashboard_expand_lensblur_adobe.png) center/cover"></div>');
const shade = node('<div class="w" style="left:-200px;top:-200px;width:2320px;height:1480px;background:#0a2647"></div>');
tl.fromTo(plate, {opacity: 0, scale: 1.25}, {opacity: 1, scale: 1.15, duration: .7, ease: 'power2.inOut'}, 1.4);
tl.fromTo(shade, {opacity: 0}, {opacity: .86, duration: .7, ease: 'power2.inOut'}, 1.4);
cue(.45, 'whoosh_s', .4);
const card = W_('<div class="glass" style="position:relative;width:1400px;height:780px"></div>', 260, 150, {z: 3});
tl.fromTo(card, {opacity: 0, z: -300, filter: 'blur(14px)'}, {opacity: 1, z: 0, filter: 'blur(0px)', duration: .7, ease: 'expo.out'}, 1.5);
cue(1.5, 'whoosh', .4);
const kick = W_('<div class="kick" style="position:relative;width:1920px;text-align:center">Nubank fraud-detection recall</div>', 0, 200, {z: 4}); rise(kick, 1.7, .45);
const svg = svgLayer($('#cam'), 4);
const ring = (cx, cy, r, w, col, glow) => {
  const L = 2 * Math.PI * r;
  svg.insertAdjacentHTML('beforeend', `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="${w}"/>` +
    (glow ? `<circle class="g${cx}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(67,164,220,.4)" stroke-width="46" stroke-dasharray="0 ${L}" transform="rotate(-90 ${cx} ${cy})" style="filter:blur(10px)"/>` : '') +
    `<circle class="a${cx}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0 ${L}" transform="rotate(-90 ${cx} ${cy})"/>`);
  return L;
};
svg.insertAdjacentHTML('beforeend', '<defs><linearGradient id="tgb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe6ff"/><stop offset="1" stop-color="#43a4dc"/></linearGradient></defs>');
const L1 = ring(660, 540, 170, 20, 'rgba(255,255,255,.5)', false), L2 = ring(1270, 540, 230, 30, 'url(#tgb)', true);
tl.fromTo(svg, {opacity: 0}, {opacity: 1, duration: .4}, 1.8);
const a1 = svg.querySelector('.a660'), a2 = svg.querySelector('.a1270'), g2 = svg.querySelector('.g1270');
const o1 = {p: 0}, o2 = {p: 0};
tl.to(o1, {p: 28, duration: 1.0, ease: 'power2.out', onUpdate: () => a1.setAttribute('stroke-dasharray', `${L1 * o1.p / 100} ${L1}`)}, 2.0);
tl.to(o2, {p: 90, duration: 1.5, ease: 'power2.out', onUpdate: () => { const d = `${L2 * o2.p / 100} ${L2}`; a2.setAttribute('stroke-dasharray', d); g2.setAttribute('stroke-dasharray', d); }}, 2.6);
const lab = (cx, cy, r, label, hot) => W_(`<div style="position:relative;width:${2 * r + 160}px;text-align:center"><div class="nv" style="height:${2 * r}px;display:flex;align-items:center;justify-content:center;font-size:${hot ? 140 : 88}px;font-weight:${hot ? 700 : 300};color:${hot ? '#fff' : 'rgba(255,255,255,.65)'}">0%</div><div style="margin-top:34px;font-size:24px;letter-spacing:3px;font-weight:600;color:${hot ? '#bfe6ff' : 'rgba(255,255,255,.6)'}">${label}</div></div>`, cx - r - 80, cy - r, {z: 5});
const l1 = lab(660, 540, 170, 'WITHOUT GRAPH FEATURES', false), l2 = lab(1270, 540, 230, 'WITH GRAPH FEATURES', true);
rise(l1, 1.95, .45); rise(l2, 2.5, .45);
count(l1.querySelector('.nv'), 2.0, 0, 28, 1.0); count(l2.querySelector('.nv'), 2.6, 0, 90, 1.5);
cue(2.0, 'tick', .3); cue(2.6, 'riser', .5); cue(4.1, 'chime', .55);
tl.fromTo(l2.querySelector('.nv'), {textShadow: '0 0 0 rgba(191,230,255,0)'}, {textShadow: '0 0 40px rgba(191,230,255,.9)', duration: .4, yoyo: true, repeat: 1}, 4.1);
// connecting line once both numbers have settled
edge(svg, 840, 540, 1030, 540, '#bfe6ff', 4, '2 12', false).draw(4.3, .5, 'power2.inOut');
const src = W_('<div style="position:relative;width:1400px;text-align:center;font-size:22px;color:rgba(255,255,255,.65)">Source: TigerGraph, Real-Time Graph Analytics: Transforming Entity Resolution in Banking</div>', 260, 860, {z: 5});
rise(src, 3.6, .5, 14);
closeMove('up');
finish();
