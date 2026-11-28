// Scene 9 (dark): transaction cards arrive one by one; each sends a line to the evidence panel, travels along it while the line
// shortens, shrinks and is absorbed. Then the chart builds: bars one by one, a line drawn through them, the repeated deposits
// get orange points and a bracket, and "Pattern: structured deposits" lands once the pattern is visible.
const T = window.TOTAL;
world('dark', {particles: 30});
const F = [[150, 230, 'ACCT ··· 5531', '$900 in'], [420, 420, 'ACCT ··· 2290', '$880 in'], [170, 600, 'ACCT ··· 7740', '$950 in'], [440, 780, 'ACCT ··· 5531', '$1,700 out']];
const frs = F.map(([x, y, a, t], i) => {
  const f = glass(x, y, 260, `<div style="font-size:17px;letter-spacing:2px;font-weight:600;opacity:.7">${a}</div><div style="font-size:28px;font-weight:600;margin-top:6px">${t}</div>`, 'padding:18px 22px');
  if (i < 3) {
    const ch = chip('border-radius:30px;background:rgba(255,255,255,.06);box-shadow:0 0 24px rgba(236,100,8,.55), inset 0 0 0 1.5px rgba(255,138,61,.8)');
    morph(ch, pose([280, 550, 300][i], [278, 468, 648][i], 260, 96), f, .6, .45, 'power2.out'); tl.fromTo(f, {opacity: 0}, {opacity: 1, duration: .3}, .85); tl.to(ch, {opacity: 0, duration: .25}, 1.05);
  } else slideIn(f, .15 + i * .22, -1, .55, 360);
  float(f, .8, T, 3, 5 + i * .4); return f;
});
const PX = 1020, PY = 190, PW = 760, PH = 560;
const prof = glass(PX, PY, PW, `<div style="font-size:18px;letter-spacing:3px;font-weight:600;color:#bfe6ff">ONE PROFILE · NOVAK</div><div style="height:${PH - 70}px"></div>`, 'padding:30px 36px');
slideIn(prof, .6, 1, .7, 500);
const tA = at('activit') - 1.2, svg = svgLayer($('#cam'));
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
// v4 connected graph: faint axes draw first, each absorbed card feeds a curved data trail down into its point on the chart,
// then a smooth line draws left to right with a glowing orb leading it and a soft gradient fill underneath;
// the repeated just-under deposits pulse orange with small callout tags.
const tC = tA + 3 * .32 + 1.2, cs = svgLayer(prof.in.firstElementChild);
cs.insertAdjacentHTML('afterbegin', '<defs><linearGradient id="af" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43a4dc" stop-opacity=".55"/><stop offset="1" stop-color="#43a4dc" stop-opacity="0"/></linearGradient><clipPath id="wipe"><rect class="wr" x="0" y="0" width="0" height="600"/></clipPath></defs>');
const by = 480, k = .2, X = i => 90 + i * 118;
[0, 1, 2, 3].forEach(i => { const g = svgPath(cs, `M60,${by - i * 95} L720,${by - i * 95}`, 'rgba(190,230,255,.2)', 1.5); trim(g, tA - .4 + i * .08, .6); });
const ax = svgPath(cs, `M60,${by} L720,${by}`, 'rgba(190,230,255,.45)', 2); trim(ax, tA - .5, .7);
const vals = [900, 880, 950, 920, 1700, 890], Q = vals.map((v, i) => [X(i), by - v * k]);
// smooth curve through the points (catmull-rom to bezier)
let d = `M${Q[0][0]},${Q[0][1]}`;
for (let i = 0; i < Q.length - 1; i++) { const p0 = Q[Math.max(0, i - 1)], p1 = Q[i], p2 = Q[i + 1], p3 = Q[Math.min(Q.length - 1, i + 2)];
  d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`; }
const area = svgPath(cs, d + ` L${Q[Q.length - 1][0]},${by} L${Q[0][0]},${by} Z`, 'none', 0); area.setAttribute('fill', 'url(#af)'); area.setAttribute('clip-path', 'url(#wipe)');
const wr = cs.querySelector('.wr');
const line = svgPath(cs, d, '#fff', 4, .95); line.style.filter = 'drop-shadow(0 0 8px rgba(67,164,220,.9))';
const DUR = 1.6, Ll = line.getTotalLength();
trim(line, tC, DUR, 'power1.inOut');
tl.fromTo(wr, {attr: {width: 0}}, {attr: {width: 760}, duration: DUR, ease: 'power1.inOut'}, tC);
const orb = svgDot(cs, Q[0][0], Q[0][1], 10, '#fff', 0); orb.style.filter = 'drop-shadow(0 0 14px #43a4dc)';
const ob = {u: 0};
tl.fromTo(ob, {u: 0}, {u: 1, duration: DUR, ease: 'power1.inOut', immediateRender: false, onUpdate: () => { const q = line.getPointAtLength(ob.u * Ll); orb.setAttribute('cx', q.x); orb.setAttribute('cy', q.y); }}, tC);
tl.fromTo(orb, {opacity: 0}, {opacity: 1, duration: .15}, tC).to(orb, {opacity: 0, duration: .4}, tC + DUR + .3);
cue(tC, 'riser', .3);
// anomaly vertices + callout tags on the repeated just-under deposits
[0, 1, 2, 3, 5].forEach((j, i) => {
  const t = tC + DUR * j / 5 + .1;
  const dt = svgDot(cs, Q[j][0], Q[j][1], 0, ORANGE); dt.style.filter = 'drop-shadow(0 0 10px rgba(255,138,61,.95))';
  tl.to(dt, {attr: {r: 10}, duration: .3, ease: 'expo.out'}, t);
  const tg = W_(`<div style="position:relative;padding:4px 10px;border-radius:10px;background:rgba(236,100,8,.9);color:#fff;font-size:16px;font-weight:600">$${vals[j]}</div>`, PX + Q[j][0] - 30, PY + Q[j][1] - 52, {z: 7});
  rise(tg, t + .1, .4, 12); cue(t, 'tink', .25);
});
const lab = W_(`<div class="pill o" style="position:relative">Pattern: structured deposits</div>`, PX + 40, PY + PH - 40, {z: 6});
rise(lab, tC + 1.5, .5); cue(tC + 1.5, 'pop', .5);
const sup = words('Missed match =|<em>hidden activity</em>', 0, 900, {size: 64});
sup.ws.forEach((w, i) => rise(w, at('never') - .2 + i * .4, .5));
// v6 carry out: the profile panel, chart and all, pulls in to the centre and becomes the 92% score card
const tX = T - .72;
tl.to([sup, lab, svg], {opacity: 0, duration: .35}, tX);
const ch = chip('border-radius:30px;background:linear-gradient(150deg,rgba(255,255,255,.16),rgba(67,164,220,.10));border:1.5px solid rgba(190,230,255,.55)', '<div class="cg" style="position:absolute;inset:0;background:linear-gradient(150deg,rgba(255,255,255,.97),rgba(222,240,251,.9));opacity:0"></div>');
morph(ch, prof, pose(960, 490, 460, 470), tX, .7, 'power3.inOut', 30);
tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX); tl.to(prof, {opacity: 0, duration: .25}, tX + .05);
tl.to(document.querySelectorAll('.w'), {opacity: 0, duration: .3}, tX + .1);
tl.to(ch.querySelector('.cg'), {opacity: 1, duration: .5}, tX + .2);
closeMove('pull');
finish();
