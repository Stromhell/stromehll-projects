// Scene 13 (dark, silent): start on the real dashboard, the camera zooms into its analytics area (the dashboard itself never
// tilts or drifts), the background darkens and the comparison panel comes forward. Both rings fill from 0: 28% left, then the
// larger 90% right; labels stay; once the numbers settle a connecting line joins them. Source line last.
const T = window.TOTAL;
world('dark', {particles: 36});
// v5: the real dashboard arrives inside a tilted glass browser window flying up out of depth (refs: UI planes seen at an angle,
// camera gliding over them). A light sweep crosses the glass, the window settles flat while the camera pushes into the analytics
// area, then the ground racks out of focus and the comparison panel comes forward with a slight tilt.
const dash = W_(`<div class="demo" style="position:relative;width:1455px;border-radius:22px;overflow:hidden;box-shadow:0 60px 140px rgba(0,0,0,.55),0 0 0 1.5px rgba(191,230,255,.45),0 0 60px rgba(67,164,220,.35)">
  <div style="height:44px;background:linear-gradient(180deg,#f4f8fb,#e3ecf3);display:flex;align-items:center;gap:10px;padding:0 20px"><i style="width:13px;height:13px;border-radius:50%;background:#ff6159"></i><i style="width:13px;height:13px;border-radius:50%;background:#ffbd2e"></i><i style="width:13px;height:13px;border-radius:50%;background:#28c941"></i><div style="margin-left:24px;height:22px;width:420px;border-radius:11px;background:rgba(10,38,71,.08)"></div></div>
  <img src="../../../storyboard/build/demo/dashboard.png" style="display:block;width:100%">
  <div class="sw" style="position:absolute;top:0;left:0;width:40%;height:100%;background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 50%,rgba(255,255,255,0) 100%);mix-blend-mode:screen"></div></div>`, 232, 60);
gsap.set(dash, {transformOrigin: '70% 45%', transformStyle: 'flat'}); gsap.set(dash.in, {transformOrigin: '50% 50%', transformPerspective: 1800});
tl.fromTo(dash, {opacity: 0}, {opacity: 1, duration: .35}, .55);
tl.fromTo(dash.in, {rotationX: 0, rotationY: 0}, {rotationX: 7, rotationY: -6, duration: .8, ease: 'sine.inOut'}, .55);
{ const ch = chip('border-radius:22px;overflow:hidden;background:#0d2c4d;box-shadow:0 0 0 1.5px rgba(191,230,255,.55), 0 0 60px rgba(67,164,220,.45)', '<img src="../../../storyboard/build/demo/dashboard.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:top">'); morph(ch, pose(960, 560, 1164, 815), dash, .6, .35, 'power2.out'); tl.to(ch, {opacity: 0, duration: .3}, .8); }
tl.fromTo(dash, {scale: .8}, {scale: 1, duration: .85, ease: EZ, immediateRender: true}, 0);
tl.fromTo(dash.querySelector('.sw'), {xPercent: -120}, {xPercent: 320, duration: .9, ease: 'power2.inOut'}, .8);
tl.to(dash.in, {rotationX: 0, rotationY: 0, duration: 1.0, ease: 'power2.inOut'}, .85);
tl.to(dash, {scale: 1.55, duration: 1.3, ease: 'power2.inOut'}, .9);
// two floating glass panes at different depths move faster than the window = parallax
[[120, 760, 300, 180, -1], [1560, 140, 260, 160, 1]].forEach(([x, y, w, h, d], i) => {
  const g = node(`<div class="w" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:24px;background:linear-gradient(150deg,rgba(255,255,255,.16),rgba(67,164,220,.08));border:1px solid rgba(191,230,255,.35);box-shadow:0 0 40px rgba(67,164,220,.25);z-index:6"></div>`);
  tl.fromTo(g, {opacity: 0, x: 200 * d, y: 120 * -d, rotationY: 25 * d, transformPerspective: 1200}, {opacity: .8, x: -60 * d, y: -40 * -d, rotationY: 10 * d, duration: 1.4, ease: 'power3.out'}, .15 + i * .1);
  tl.to(g, {x: -420 * d, opacity: 0, filter: 'blur(8px)', duration: .7, ease: 'power2.in'}, 1.35);
});
// rack focus: the blurred plate + navy shade come up behind the panel (no filter on the zoomed dashboard: that dropped frames)
const plate = node('<div class="w" style="left:-80px;top:-60px;width:2080px;height:1200px;background:url(../../adobe/dashboard_expand_lensblur_adobe.png) center/cover"></div>');
const shade = node('<div class="w" style="left:-200px;top:-200px;width:2320px;height:1480px;background:#0a2647"></div>');
tl.fromTo(plate, {opacity: 0, scale: 1.25}, {opacity: 1, scale: 1.15, duration: .7, ease: 'power2.inOut'}, 1.45);
tl.fromTo(shade, {opacity: 0}, {opacity: .86, duration: .7, ease: 'power2.inOut'}, 1.45);
cue(0, 'whoosh', .45); cue(.4, 'shimmer', .3);
const card = W_('<div class="glass" style="position:relative;width:1400px;height:780px"></div>', 260, 150, {z: 3});
gsap.set(card, {transformStyle: 'flat'}); gsap.set(card.in, {transformPerspective: 1600});
tl.fromTo(card, {opacity: 0, filter: 'blur(14px)'}, {opacity: 1, filter: 'blur(0px)', duration: .9, ease: EZO}, 1.5);
tl.fromTo(card.in, {z: -420, rotationX: 14, rotationY: -8}, {z: 0, rotationX: 0, rotationY: 0, duration: .9, ease: EZO}, 1.5);
tl.to(card.in, {rotationY: 2.5, rotationX: -1.5, duration: T - 2.4, ease: 'sine.inOut'}, 2.4);
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
l1.querySelector('.nv').textContent = '28%'; tl.fromTo(l1.querySelector('.nv'), {scale: .96}, {scale: 1, duration: .6, ease: EZO}, 1.95); count(l2.querySelector('.nv'), 2.6, 0, 90, 1.5);
cue(2.0, 'tick', .3); cue(2.6, 'riser', .5); cue(4.1, 'chime', .55);
tl.fromTo(l2.querySelector('.nv'), {textShadow: '0 0 0 rgba(191,230,255,0)'}, {textShadow: '0 0 40px rgba(191,230,255,.9)', duration: .4, yoyo: true, repeat: 1}, 4.1);
// connecting line once both numbers have settled
{ const arc = svgPath(svg, 'M800,440 Q930,330 1060,420', '#bfe6ff', 4, .9); arc.setAttribute('stroke-dasharray', '2 12'); arc.setAttribute('stroke-linecap', 'round'); arc.style.filter = 'drop-shadow(0 0 8px #43a4dc)'; tl.fromTo(arc, {opacity: 0}, {opacity: 1, duration: .5}, 4.3); }
const src = W_('<div style="position:relative;width:1400px;text-align:center;font-size:22px;color:rgba(255,255,255,.65)">Source: TigerGraph, Real-Time Graph Analytics: Transforming Entity Resolution in Banking</div>', 260, 860, {z: 5});
rise(src, 3.6, .5, 14);
// v6 carry out: the 90% ring pulls away from the panel; it becomes the glowing arc of the end card
const tX = T - .7;
const rg = chip('border-radius:50%;border:12px solid #8fd0f5;box-shadow:0 0 50px rgba(67,164,220,.8), inset 0 0 40px rgba(67,164,220,.5)');
morph(rg, a2, pose(960, 600, 560, 560), tX, .7, 'power3.inOut');
tl.fromTo(rg, {opacity: 0}, {opacity: 1, duration: .1, immediateRender: true}, tX);
tl.to([card, l1, l2, svg, src, kick], {opacity: 0, filter: 'blur(6px)', duration: .45}, tX + .05);
closeMove('pull');
finish();
