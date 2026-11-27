// Scene 11 (blue): the three-stage funnel drops in line by line; record dots pour through, fewer at each stage;
// at stage 3 the survivors link into a mini graph.
const T = window.TOTAL;
world('blue', {particles: 24, from: 'light', reveal: .8});
const kick = W_('<div class="kick" style="position:relative;width:1920px;text-align:center">Use them in order</div>', 0, 80);
tl.fromTo(kick, {opacity: 0, y: -30, letterSpacing: '20px'}, {opacity: 1, y: 0, letterSpacing: '5px', duration: .6, ease: 'expo.out'}, at('order') - .3);
const step = (x, y, w, n, t, sub, cls) => {
  const bg = {w: 'linear-gradient(150deg,#fff,#e3f1fa)', b: 'linear-gradient(150deg,#7fcaf2,#43a4dc)', n: `linear-gradient(150deg,#2a5d8c,${NAVY})`}[cls], col = cls === 'w' ? NAVY : '#fff';
  return W_(`<div style="position:relative;width:${w}px;height:170px;border-radius:85px;background:${bg};color:${col};box-shadow:0 30px 60px rgba(8,40,70,.35),inset 0 3px 0 rgba(255,255,255,.6),0 0 50px rgba(255,255,255,.35);display:flex;align-items:center;gap:30px;padding:0 50px">
   <div style="font-size:84px;font-weight:700;opacity:.9">${n}</div><div><div style="font-size:42px;font-weight:700">${t}</div><div style="font-size:24px;font-weight:300;margin-top:4px">${sub}</div></div></div>`, x, y);
};
const st = [step(360, 170, 1200, 1, 'Exact identifiers', 'Tax ID, passport, verified phone: instant matches', 'w'),
            step(510, 420, 900, 2, 'Fuzzy matching', 'Finds likely candidates', 'b'),
            step(640, 670, 640, 3, 'Graph confirms', 'or rejects, with evidence', 'n')];
const ts = [at('exact'), at('fuzzy'), at('then')];
[[360, 170, 1200], [510, 420, 900], [640, 670, 640]].forEach(([x, y, w], i) => { const sl = W_(`<div style="position:relative;width:${w}px;height:170px;border-radius:85px;border:3px dashed rgba(255,255,255,.55);background:rgba(255,255,255,.06)"></div>`, x, y); tl.fromTo(sl, {opacity: 0, scale: .7, y: 60}, {opacity: 1, scale: 1, y: 0, duration: .5, ease: 'expo.out'}, .15 + i * .15); cue(.15 + i * .15, 'pop', .3); tl.to(sl, {opacity: 0, duration: .3}, ts[i] + .2); });
const q = words('So how do you decide?', 0, 900, {size: 60}); wordsIn(q, at('so') - .05, .16); wordsOut(q, at('use') - .1);
gsap.set(q, {zIndex: 2});
const net = neuralNet($('#cam'), [{t: ts[0], n: 7}, {t: ts[1], n: 18}, {t: ts[2], n: 36}], {op: .28, blur: 1.5, gap: .05, box: [80, 60, 1760, 960]});
gsap.set(net, {zIndex: 0});
const from = [{x: -900}, {x: 900}, {y: 300, scale: .7}];
st.forEach((s, i) => {
  tl.fromTo(s, Object.assign({opacity: 0, filter: 'blur(10px)'}, from[i]), {x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: .7, ease: 'power3.out'}, ts[i] - .25);
  cue(ts[i] - .25, 'whoosh_s', .45, [-.6, .6, 0][i]);
  if (i) tl.to(st[i - 1], {opacity: .55, scale: .97, duration: .5, ease: 'power2.out'}, ts[i] - .1);
  tl.fromTo(s.in.firstElementChild, {boxShadow: '0 30px 60px rgba(8,40,70,.35),0 0 0 rgba(255,255,255,0)'}, {boxShadow: '0 30px 60px rgba(8,40,70,.35),0 0 70px rgba(255,255,255,.75)', duration: .5}, ts[i] + .3);
  float(s, ts[i] + .6, T, 3, 6);
});
// small graphics per stage: an ID with a drawn check, two strings compared, (stage 3 becomes the graph below)
const g1 = W_(`<div style="position:relative;display:flex;gap:10px;align-items:center">${icon('id', 64, NAVY)}${checkSvg(46, GREEN)}</div>`, 1400, 222); rise(g1, ts[0] + .4, .45); drawCheck(g1, at('first'), .4);
const g2 = W_(`<div style="position:relative;font-size:24px;font-weight:700;color:#fff;line-height:1.3;text-align:right">D. Reyes<br>Dan Reyes <span style="color:${NAVY}">≈</span></div>`, 1210, 470); rise(g2, at('likely'), .45);
const svg = svgLayer($('#cam'));
edge(svg, 960, 345, 960, 415, '#fff', 6, '4 12', false).draw(ts[1] + .2, .4);
edge(svg, 960, 595, 960, 665, '#fff', 6, '4 12', false).draw(ts[2] + .2, .4);
edge(svg, 960, 845, 960, 900, '#fff', 6, '4 12', false).draw(at('confirm') - .4, .35);
// survivors link into a mini graph inside stage 3
const tC = at('confirm');
const G = [[760, 960], [880, 915], [1040, 975], [1160, 920], [960, 1010], [700, 1010], [1230, 1000], [1110, 1030]];
const gsvg = svgLayer($('#front'));
[[0, 1], [1, 2], [2, 3], [1, 4], [2, 4], [0, 5], [3, 6], [2, 7]].forEach(([a, b], i) => edge(gsvg, G[a][0], G[a][1], G[b][0], G[b][1], i > 4 ? '#ffb27a' : '#bfe6ff', 3).draw(i > 4 ? at('reject') + (i - 5) * .15 : tC + i * .12, .4, 'power2.inOut'));
edge(gsvg, 960, 900, 880, 915, '#bfe6ff', 3).draw(tC - .1, .3);
G.forEach(([x, y], i) => { const n = node(`<div class="dot" style="left:${x - 9}px;top:${y - 9}px;width:18px;height:18px;background:#fff;box-shadow:0 0 14px #bfe6ff"></div>`, $('#front')); if (i > 4) n.style.background = '#ffb27a'; tl.fromTo(n, {scale: 0}, {scale: 1, duration: .35, ease: 'expo.out'}, i > 4 ? at('reject') + .25 + (i - 5) * .15 : tC - .1 + i * .08); });
cue(tC, 'chime', .5);
tl.to('#world', {scale: 1.2, filter: 'blur(12px)', duration: .4, ease: 'power3.in'}, T - .4); cue(T - .35, 'whoosh', .4);
finish();
