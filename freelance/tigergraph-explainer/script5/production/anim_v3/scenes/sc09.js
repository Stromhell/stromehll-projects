// Scene 9 (dark): transaction cards arrive one by one; each sends a line to the evidence panel, travels along it while the line
// shortens, shrinks and is absorbed. Then the chart builds: bars one by one, a line drawn through them, the repeated deposits
// get orange points and a bracket, and "Pattern: structured deposits" lands once the pattern is visible.
const T = window.TOTAL;
world('dark', {particles: 30, from: 'dark'});
const F = [[150, 230, 'ACCT ··· 5531', '$900 in'], [420, 420, 'ACCT ··· 2290', '$880 in'], [170, 600, 'ACCT ··· 7740', '$950 in'], [440, 780, 'ACCT ··· 5531', '$1,700 out']];
const frs = F.map(([x, y, a, t], i) => {
  const f = glass(x, y, 260, `<div style="font-size:17px;letter-spacing:2px;font-weight:600;opacity:.7">${a}</div><div style="font-size:28px;font-weight:600;margin-top:6px">${t}</div>`, 'padding:18px 22px');
  slideIn(f, .15 + i * .22, -1, .55, 360); float(f, .8, T, 3, 5 + i * .4); return f;
});
const PX = 1020, PY = 190, PW = 760, PH = 560;
const prof = glass(PX, PY, PW, `<div style="font-size:18px;letter-spacing:3px;font-weight:600;color:#bfe6ff">ONE PROFILE · NOVAK</div><div style="height:${PH - 70}px"></div>`, 'padding:30px 36px');
slideIn(prof, .6, 1, .7, 500);
const tA = at('activities') - 1.2, svg = svgLayer($('#cam'));
frs.forEach((f, i) => {
  const x0 = F[i][0] + 260, y0 = F[i][1] + 45, x1 = PX + 30, y1 = PY + 120 + i * 90, t = tA + i * .32;
  const ln = svgPath(svg, `M${x0},${y0} L${x1},${y1}`, '#bfe6ff', 3, .9); ln.setAttribute('stroke-dasharray', '4 10');
  tl.fromTo(ln, {attr: {d: `M${x0},${y0} L${x0},${y0}`}}, {attr: {d: `M${x0},${y0} L${x1},${y1}`}, duration: .35, ease: 'power2.out'}, t);
  // the card travels along its line; the line's tail follows it, so the line gets shorter as the card goes in
  const o = {p: 0};
  tl.fromTo(o, {p: 0}, {p: 1, duration: .75, ease: 'power2.in', immediateRender: false, onUpdate: () => {
    const sx = x0 + (x1 - x0) * o.p, sy = y0 + (y1 - y0) * o.p; ln.setAttribute('d', `M${sx},${sy} L${x1},${y1}`); }}, t + .35);
  tl.to(f, {x: x1 - x0 + 20, y: y1 - y0, scale: .15, opacity: 0, duration: .75, ease: 'power2.in'}, t + .35);
  tl.to(ln, {opacity: 0, duration: .1}, t + 1.1);
  tl.fromTo(prof.in.firstElementChild, {boxShadow: '0 0 0 rgba(190,235,255,0)'}, {boxShadow: '0 0 60px rgba(190,235,255,.55)', duration: .2, yoyo: true, repeat: 1}, t + 1.05);
  cue(t + 1.05, 'chime1', .3, .3);
});
// the chart
const tC = tA + 3 * .32 + 1.3, cs = svgLayer(prof.in.firstElementChild);
[0, 1, 2, 3].forEach(i => { const g = svgPath(cs, `M60,${470 - i * 90} L700,${470 - i * 90}`, 'rgba(190,230,255,.25)', 1.5); trim(g, 1.2 + i * .1, .6); });
const vals = [900, 880, 950, 920, 1700, 890], bx = 70, by = 470, bw = 70, gap = 30, k = .19;
const tops = vals.map((v, i) => [bx + i * (bw + gap) + bw / 2, by - v * k]);
vals.forEach((v, i) => {
  const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  Object.entries({x: bx + i * (bw + gap), y: by - v * k, width: bw, height: v * k, rx: 10, fill: i === 4 ? 'rgba(190,230,255,.35)' : 'rgba(67,164,220,.75)'}).forEach(([a, b]) => r.setAttribute(a, b));
  cs.appendChild(r);
  tl.fromTo(r, {attr: {y: by, height: 0}}, {attr: {y: by - v * k, height: v * k}, duration: .4, ease: 'expo.out'}, tC + i * .12);
  cue(tC + i * .14, 'tick', .2);
});
const pl = svgPath(cs, 'M' + tops.map(p => p.join(',')).join(' L'), '#fff', 4, .95);
trim(pl, tC + .4, .8, 'power1.inOut');
const rep = [0, 1, 2, 3, 5];
rep.forEach((j, i) => { const d = svgDot(cs, tops[j][0], tops[j][1], 0, ORANGE); tl.to(d, {attr: {r: 11}, duration: .3, ease: 'expo.out'}, tC + 1.1 + i * .08); });
const br = svgPath(cs, `M${tops[0][0] - 30},${by - 960 * k - 30} L${tops[0][0] - 30},${by - 960 * k - 50} L${tops[3][0] + 30},${by - 960 * k - 50} L${tops[3][0] + 30},${by - 960 * k - 30}`, ORANGE, 3);
trim(br, tC + 1.3, .4);
const lab = W_(`<div class="pill o" style="position:relative">Pattern: structured deposits</div>`, PX + 40, PY + PH - 40, {z: 6});
rise(lab, tC + 1.5, .5); cue(tC + 1.5, 'pop', .5);
const sup = words('Missed match =|<em>hidden activity</em>', 0, 900, {size: 64});
sup.ws.forEach((w, i) => rise(w, at('never') - .2 + i * .4, .5));
tl.to('#world', {scale: 1.12, filter: 'blur(12px)', duration: .35, ease: 'power3.in'}, T - .35); cue(T - .3, 'whoosh', .4);
finish();
