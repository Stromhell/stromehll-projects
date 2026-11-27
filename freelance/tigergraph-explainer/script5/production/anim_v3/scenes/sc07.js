// Scene 7 (light): Lena Novak from the left, L. Novakova from the right, details revealed line by line. A dotted link checks them,
// the gauge rises smoothly to 58%, the differences light up orange (why the match fails), "No match" lands, the link breaks.
const T = window.TOTAL;
world('light', {particles: 30, from: 'dark', reveal: .8});
const rec = (k, n, a) => `<div class="glass rec" style="position:relative"><div class="k">${k}</div><div class="n">${n}</div><div class="a">${a}</div><div class="row"><span class="chip">KYC</span><span class="chip">Business</span></div></div>`;
const A = W_(rec('Record C', 'Lena Novak', 'Account opened <span class="df">online</span>'), 170, 170), Bc = W_(rec('Record D', 'L. Novak<span class="df">ova</span>', 'Account opened <span class="df">in branch</span>'), 1190, 170);
slideIn(A, .1, -1, .75, 700); slideIn(Bc, .3, 1, .75, 700);
[A, Bc].forEach((c, i) => { c.querySelectorAll('.k,.n,.a,.row').forEach((e, j) => rise(e, .45 + i * .2 + j * .14, .45, 16)); float(c, 1.2, T, 3, 6); });
// dotted link with a checking pulse travelling along it
const svg = svgLayer($('#cam'));
const link = svgPath(svg, 'M720,300 L1200,300', BLUE, 3, .9); link.setAttribute('stroke-dasharray', '3 11');
tl.fromTo(link, {attr: {d: 'M720,300 L720,300'}}, {attr: {d: 'M720,300 L1200,300'}, duration: .7, ease: 'power2.inOut'}, at('novakova') - .3);
const pk = svgDot(svg, 720, 300, 9, BLUE, 0);
tl.fromTo(pk, {attr: {cx: 720}, opacity: 0}, {attr: {cx: 1200}, opacity: 1, duration: .9, ease: 'sine.inOut', repeat: 2, yoyo: true}, at('novakova') + .4);
cue(at('novakova') - .3, 'shimmer', .3);
// gauge: rises smoothly to 58% and settles (no stall jitter)
const r = 210, Lr = Math.PI * (r - 26);
const g = W_(`<div class="glass" style="position:relative;width:${2 * r + 80}px;height:${r + 170}px">
 <svg style="left:40px;top:40px" width="${2 * r}" height="${r}"><path d="M26,${r} A${r - 26},${r - 26} 0 0 1 ${2 * r - 26},${r}" stroke="rgba(10,38,71,.12)" stroke-width="34" fill="none" stroke-linecap="round"/>
 <path class="arc" d="M26,${r} A${r - 26},${r - 26} 0 0 1 ${2 * r - 26},${r}" stroke="${BLUE}" stroke-width="34" fill="none" stroke-linecap="round" stroke-dasharray="0 2000"/>
 <g><line class="ndl" x1="${r}" y1="${r}" x2="${40}" y2="${r}" stroke="${NAVY}" stroke-width="9" stroke-linecap="round"/></g><circle cx="${r}" cy="${r}" r="16" fill="${NAVY}"/></svg>
 <div class="num" style="position:absolute;left:0;right:0;top:${r + 52}px;text-align:center;font-size:88px;font-weight:700;color:${BLUE};line-height:1">0%</div>
 <div style="position:absolute;left:0;right:0;top:${r + 145}px;text-align:center;font-size:20px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.7">Fuzzy-match score</div></div>`, 710, 520);
rise(g, 1.4, .6, 60);
const t58 = at('58'), ndl = g.querySelector('.ndl'), arc = g.querySelector('.arc'), o = {p: 0};
const setP = () => { const an = Math.PI * (1 - o.p / 100); ndl.setAttribute('x2', r + (r - 40) * Math.cos(an)); ndl.setAttribute('y2', r - (r - 40) * Math.sin(an)); arc.setAttribute('stroke-dasharray', `${Lr * o.p / 100} 2000`); };
tl.fromTo(o, {p: 0}, {p: 58, duration: 1.6, ease: 'power2.out', onUpdate: setP, immediateRender: true}, t58 - .6);
count(g.querySelector('.num'), t58 - .6, 0, 58, 1.6);
for (let i = 0; i < 6; i++) cue(t58 - .5 + i * .22, 'tick', .2);
cue(t58 + 1.0, 'meh', .6);
float(g, t58 + 1.2, T, 3, 6);
// at 58%: the differences light up
const dfs = [...document.querySelectorAll('.df')];
tl.fromTo(dfs, {color: NAVY, backgroundColor: 'rgba(236,100,8,0)'}, {color: '#fff', backgroundColor: ORANGE, borderRadius: 6, duration: .35, stagger: .15, ease: 'power2.out'}, t58 + 1.0);
cue(t58 + 1.0, 'tick2', .4, -.3); cue(t58 + 1.3, 'tick2', .4, .3);
// No match, the link breaks, the cards ease apart
const tG = at('lets') - .3;
const nm = pill(1400, 740, `No match ✕`, '', {z: 5}); rise(nm, tG, .5);
tl.to(link, {attr: {d: 'M720,300 L900,330'}, opacity: 0, duration: .45, ease: 'power2.in'}, tG + .3);
tl.to(pk, {opacity: 0, duration: .2}, tG + .3);
cue(tG + .3, 'crack', .35);
tl.to(A, {x: -40, duration: T - tG, ease: 'sine.inOut'}, tG); tl.to(Bc, {x: 40, duration: T - tG, ease: 'sine.inOut'}, tG);
finish();
