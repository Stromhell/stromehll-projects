// Scene 11 (blue): the three-stage funnel drops in line by line; record dots pour through, fewer at each stage;
// at stage 3 the survivors link into a mini graph.
const T = window.TOTAL;
world('blue', {particles: 30});
openMove('whipL');
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
st.forEach((s, i) => {
  tl.fromTo(s, {y: -500, opacity: 0, scaleY: 1.3}, {y: 0, opacity: 1, scaleY: 1, duration: .7, ease: 'back.out(1.6)'}, ts[i] - .2);
  cue(ts[i] - .2 + .4, 'thump', .45);
  float(s, ts[i] + .6, T, 4, 3 + i * .4);
});
const svg = svgLayer($('#cam'));
edge(svg, 960, 345, 960, 415, '#fff', 6, '4 12', false).draw(ts[1] + .2, .4);
edge(svg, 960, 595, 960, 665, '#fff', 6, '4 12', false).draw(ts[2] + .2, .4);
// dots pour through the stages: each dot falls to a depth set by its stage
const lv = [[230, 1200, 360], [480, 900, 510], [730, 640, 640]];
for (let i = 0; i < 46; i++) {
  const d = i < 24 ? 0 : i < 38 ? 1 : 2, x = 960 + (R() - .5) * 900, s = 10 + R() * 6;
  const dot = node(`<div class="dot" style="left:0;top:0;width:${s}px;height:${s}px;background:#fff;box-shadow:0 0 12px #fff;z-index:5"></div>`, $('#front'));
  const t0 = ts[0] + .4 + R() * (T - ts[0] - 2.5);
  const xs = [x, 960 + (x - 960) * .65, 960 + (x - 960) * .35];
  const kf = [{x: xs[0], y: 0, opacity: 0, duration: 0}, {x: xs[0], y: 250, opacity: 1, duration: .45, ease: 'power2.in'}];
  if (d >= 1) kf.push({x: xs[1], y: 500, duration: .45, ease: 'power2.in'});
  if (d >= 2) kf.push({x: xs[2], y: 750, duration: .45, ease: 'power2.in'});
  kf.push({opacity: 0, scale: .2, duration: .25});
  if (d < 2 || i % 2) tl.to(dot, {keyframes: kf}, Math.max(t0, ts[d] + .3));
}
// survivors link into a mini graph inside stage 3
const tC = at('confirm');
const G = [[860, 940], [930, 900], [1010, 950], [1080, 905], [960, 985]];
const gsvg = svgLayer($('#front'));
[[0, 1], [1, 2], [2, 3], [1, 4], [2, 4]].forEach(([a, b], i) => edge(gsvg, G[a][0], G[a][1], G[b][0], G[b][1], '#bfe6ff', 3).draw(tC + i * .12, .3));
G.forEach(([x, y], i) => { const n = node(`<div class="dot" style="left:${x - 9}px;top:${y - 9}px;width:18px;height:18px;background:#fff;box-shadow:0 0 14px #bfe6ff"></div>`, $('#front')); tl.fromTo(n, {scale: 0}, {scale: 1, duration: .3, ease: 'back.out(3)'}, tC - .1 + i * .08); });
cue(tC, 'chime', .5);
closeMove('dive');
finish();
