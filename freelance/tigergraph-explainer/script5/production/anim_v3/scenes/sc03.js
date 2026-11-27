// Scene 3 (blue): the question builds in three stages inside a fixed title zone (nothing crosses it).
// Left, a small fuzzy-matching visual compares two strings; right, a small network grows; a comparison line joins them.
// When "graph-based entity resolution" is spoken, a low-opacity neural network grows behind the type.
const T = window.TOTAL;
world('blue', {particles: 26, from: 'dark', reveal: .9});
const net = neuralNet($('#cam'), [{t: at('graph') - .1, n: 10}, {t: at('resolution'), n: 26}, {t: at('kyc'), n: 40}], {op: .22, gap: .04, box: [120, 90, 1680, 560]});
// title zone: three lines, each lands as it is spoken
const L1 = words('How do I decide between', 0, 170, {size: 70}), L2 = words('<em class="f">fuzzy matching</em>|and', 0, 262, {size: 70}), L3 = words('<em class="g">graph-based entity resolution</em>|for KYC?', 0, 354, {size: 70});
L2.querySelector('em').style.color = '#fff'; L3.querySelector('em').style.color = NAVY;
const tw = (box, ts) => box.ws.forEach((w, i) => tl.fromTo(w, {y: 34, opacity: 0, filter: 'blur(8px)'}, {y: 0, opacity: 1, filter: 'blur(0px)', duration: .5, ease: 'expo.out'}, ts[i] - .06));
tw(L1, [at('how'), at('do'), at('you'), at('decide'), at('between')]);
tw(L2, [at('fuzzy'), at('and')]);
tw(L3, [at('graph'), at('for')]);
tl.fromTo(L2.querySelector('em'), {textShadow: '0 0 0 rgba(255,255,255,0)'}, {textShadow: '0 0 34px rgba(255,255,255,.9)', duration: .4, yoyo: true, repeat: 1}, at('fuzzy') + .2);
cue(at('fuzzy') + .2, 'shimmer', .35); cue(at('graph') + .2, 'shimmer', .35);
// left: fuzzy matching = two strings compared letter by letter
const fz = glass(230, 600, 520, `<div style="font-size:15px;letter-spacing:3px;font-weight:600;color:${BLUE}">FUZZY MATCHING</div>
  <div class="s1" style="font-size:36px;font-weight:700;margin-top:12px;letter-spacing:2px">DANIEL REYES</div><div class="s2" style="font-size:36px;font-weight:700;margin-top:6px;letter-spacing:2px">DAN<span style="opacity:.25">IEL</span> REYES</div>
  <div style="margin-top:14px;height:10px;border-radius:5px;background:rgba(67,164,220,.15)"><div class="fb" style="height:100%;width:91%;border-radius:5px;background:${BLUE}"></div></div>`, 'padding:26px 32px');
slideIn(fz, at('fuzzy') - .2, -1, .7, 420);
tl.from(fz.querySelector('.fb'), {width: '0%', duration: .9, ease: 'power2.out'}, at('fuzzy') + .4);
float(fz, at('fuzzy') + .6, T, 4, 6);
// right: graph = a small network that grows node by node
const gbox = node('<div class="w" style="left:1170px;top:560px;width:540px;height:330px"></div>');
const gs = svgLayer(gbox); const C = [270, 165];
const ns = [[90, 70, BLUE], [450, 60, BLUE], [70, 260, BLUE], [460, 270, ORANGE], [270, 300, BLUE]];
ns.forEach(([x, y, c], i) => { const t = at('entity') + i * .14; trim(svgPath(gs, `M${C[0]},${C[1]} L${x},${y}`, '#fff', 3, .9), t, .5); const d = svgDot(gs, x, y, 18, c); tl.fromTo(d, {attr: {r: 0}}, {attr: {r: 18}, duration: .4, ease: 'expo.out'}, t + .35); });
const cn = svgDot(gs, C[0], C[1], 28, NAVY); tl.fromTo(cn, {attr: {r: 0}}, {attr: {r: 28}, duration: .45, ease: 'expo.out'}, at('graph'));
tl.fromTo(gbox, {x: 420, opacity: 0}, {x: 0, opacity: 1, duration: .7, ease: 'expo.out'}, at('graph') - .2);
cue(at('graph') - .2, 'whoosh_s', .45, .6);
const glab = node(`<div class="w kick" style="left:1170px;top:900px;width:540px;text-align:center;color:#fff">Graph</div>`); rise(glab, at('entity'), .45);
// comparison line between the two visuals
const cl = svgLayer($('#cam'));
trim(svgPath(cl, 'M760,750 L1170,730', '#fff', 2.5, .8), at('kyc') - .2, .7);
const vs = pill(965, 740, 'vs', 'w', {z: 4}); pop(vs, at('kyc') + .2);
tl.fromTo([L1, L2, L3], {scale: .98}, {scale: 1.02, duration: T, ease: 'sine.inOut'}, 0);
closeMove('dive', .35);
finish();
