// Scene 7 (light): the Novak pair snaps in; the gauge lifts lazily to 58% and stalls; "No match"; the cards drift apart.
const T = window.TOTAL;
world('light', {particles: 36});
openMove('whipL');
const rec = (k, n, a) => `<div class="glass rec" style="position:relative"><div class="k">${k}</div><div class="n">${n}</div><div class="a">${a}</div><div class="row"><span class="chip">KYC</span><span class="chip">Business</span></div></div>`;
const A = W_(rec('Record C', 'Lena Novak', 'Account opened online'), 150, 170), Bc = W_(rec('Record D', 'L. Novakova', 'Account opened in branch'), 1210, 170);
flyIn(A, .1, {x: -800, rotationY: 40}, .5); flyIn(Bc, .35, {x: 800, rotationY: -40}, .5);
float(A, 1.5, T, 6, 3.2); float(Bc, 1.7, T, 6, 3.6);
// gauge
const r = 210, Lr = Math.PI * (r - 26);
const g = W_(`<div class="glass" style="position:relative;width:${2 * r + 80}px;height:${r + 170}px">
 <svg style="left:40px;top:40px" width="${2 * r}" height="${r}"><path d="M26,${r} A${r - 26},${r - 26} 0 0 1 ${2 * r - 26},${r}" stroke="rgba(10,38,71,.12)" stroke-width="34" fill="none" stroke-linecap="round"/>
 <path class="arc" d="M26,${r} A${r - 26},${r - 26} 0 0 1 ${2 * r - 26},${r}" stroke="${BLUE}" stroke-width="34" fill="none" stroke-linecap="round" stroke-dasharray="0 2000"/>
 <g><line class="ndl" x1="${r}" y1="${r}" x2="${40}" y2="${r}" stroke="${NAVY}" stroke-width="9" stroke-linecap="round"/></g><circle cx="${r}" cy="${r}" r="16" fill="${NAVY}"/></svg>
 <div class="num" style="position:absolute;left:0;right:0;top:${r + 52}px;text-align:center;font-size:88px;font-weight:700;color:${BLUE};line-height:1">0%</div>
 <div style="position:absolute;left:0;right:0;top:${r + 145}px;text-align:center;font-size:20px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.7">Fuzzy-match score</div></div>`, 710, 520);
flyIn(g, 1.3, {y: 400, rotationX: -40}, .6);
const t58 = at('58'), ndl = g.querySelector('.ndl'), arc = g.querySelector('.arc'), o = {p: 0};
const setP = () => { const an = Math.PI * (1 - o.p / 100); ndl.setAttribute('x2', r + (r - 40) * Math.cos(an)); ndl.setAttribute('y2', r - (r - 40) * Math.sin(an)); arc.setAttribute('stroke-dasharray', `${Lr * o.p / 100} 2000`); };
// lazy lift, small overshoot, sag, stall
tl.fromTo(o, {p: 0}, {p: 61, duration: 1.3, ease: 'power1.inOut', onUpdate: setP, immediateRender: true}, t58 - .5)
  .to(o, {p: 56, duration: .4, ease: 'sine.inOut', onUpdate: setP}, t58 + .8).to(o, {p: 58, duration: .5, ease: 'sine.out', onUpdate: setP}, t58 + 1.2);
count(g.querySelector('.num'), t58 - .5, 0, 58, 1.6);
cue(t58 + .9, 'meh', .7);
tl.to(o, {p: 59, duration: .12, yoyo: true, repeat: 7, ease: 'sine.inOut', onUpdate: setP}, t58 + 1.7);
float(g, t58 + 1.8, T, 4, 3);
// no match: the pill pops, the cards drift apart along dotted arrows
const tG = at('lets');
const nm = pill(1380, 740, 'No match ✕', '', {z: 5}); pop(nm, tG - .2);
const svg = svgLayer($('#cam'));
edge(svg, 640, 470, 520, 700, BLUE, 3, '2 12', false).draw(tG, .6);
edge(svg, 1290, 470, 1420, 690, BLUE, 3, '2 12', false).draw(tG + .1, .6);
tl.to(A, {x: -160, y: 30, rotation: -4, duration: T - tG, ease: 'power1.in'}, tG);
tl.to(Bc, {x: 160, y: 30, rotation: 4, duration: T - tG, ease: 'power1.in'}, tG);
closeMove('dive');
finish();
