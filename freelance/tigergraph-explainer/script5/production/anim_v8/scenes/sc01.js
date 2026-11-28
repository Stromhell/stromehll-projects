// Scene 1 (light): records glide in from the sides and settle, a slow vertical scanner plus a horizontal data scan read them,
// matching fields glow blue, Name/Address scores count up early, 93% counts inside a drawing ring, the ring becomes MERGE?, the cursor presses.
const T = window.TOTAL, B3 = window.BEATS[2];
world('light', {particles: 30});
const card = (k, n, a, rot) => `<div class="glass" style="position:relative;width:540px;padding:32px 38px;transform:rotateY(${rot}deg)">
  <div style="display:flex;gap:22px;align-items:center"><div class="av" style="width:96px;height:96px;border-radius:24px;background:radial-gradient(circle at 35% 30%,#fff,#8fd0f5 45%,#2a7fb5);flex:none;box-shadow:inset 0 -8px 16px rgba(10,38,71,.25)"></div>
  <div><div style="font-size:17px;letter-spacing:3px;font-weight:600;color:${BLUE}">${k}</div><div class="nm fld" style="font-size:44px;font-weight:700;line-height:1.05;margin-top:4px;border-radius:10px;padding:0 6px;margin-left:-6px">${n}</div></div></div>
  <div class="ad fld" style="margin-top:20px;font-size:26px;font-weight:300;border-radius:10px;padding:4px 6px;margin-left:-6px">${a}</div>
  <div class="bar1" style="margin-top:16px;height:10px;border-radius:5px;background:linear-gradient(90deg,rgba(67,164,220,.4),rgba(67,164,220,.08));width:70%"></div>
  <div class="bar2" style="margin-top:10px;height:10px;border-radius:5px;background:rgba(67,164,220,.14);width:45%"></div></div>`;
const A = W_(card('RECORD A', 'Daniel Reyes', '14 Harbor View Apts', 8), 170, 330);
const Bc = W_(card('RECORD B', 'Dan Reyes', '14 Harbour View Apartments', -8), 1210, 330);
gsap.set([A.in, Bc.in], {scale: 1.05, transformOrigin: '50% 50%'});
[A, Bc].forEach(c => ['.nm', '.ad'].forEach(s => { const e = c.querySelector(s); e.innerHTML = [...e.textContent].map(ch => `<span class="ch">${ch === ' ' ? '&nbsp;' : ch}</span>`).join(''); }));
// v4 top-down neural cascade: a parent node ignites, curved edges branch down with a travelling spark,
// each record card blooms at its branch end with a 3D settle, then its details cascade in.
const cs = svgLayer($('#cam'));
const PN = [960, 150];
const pn = svgDot(cs, PN[0], PN[1], 22, BLUE); const pnG = svgDot(cs, PN[0], PN[1], 46, 'rgba(67,164,220,.25)');
tl.fromTo([pn, pnG], {attr: {r: 0}}, {attr: {r: (i, e) => e === pn ? 22 : 46}, duration: .45, ease: EZO}, .15);
tl.fromTo(pnG, {opacity: 1}, {opacity: .35, duration: .6, yoyo: true, repeat: 7, ease: 'sine.inOut'}, .6);
cue(.15, 'tink', .5);
const br = [[`M960,172 C960,260 440,220 440,318`, 440], [`M960,172 C960,260 1480,220 1480,318`, 1480]];
br.forEach(([d, x], i) => {
  const p = svgPath(cs, d, BLUE, 3, .85); trim(p, .4 + i * .12, .55, 'power2.inOut');
  const L = p.getTotalLength(), sp = svgDot(cs, 960, 172, 9, '#fff'); sp.style.filter = 'drop-shadow(0 0 10px #43a4dc)';
  const o = {u: 0}; tl.fromTo(o, {u: 0}, {u: 1, duration: .55, ease: 'power2.inOut', onUpdate: () => { const q = p.getPointAtLength(L * o.u); sp.setAttribute('cx', q.x); sp.setAttribute('cy', q.y); }}, .4 + i * .12);
  tl.fromTo(sp, {opacity: 1}, {opacity: 0, duration: .25}, .95 + i * .12);
  cue(.4 + i * .12, 'whoosh_s', .3, i ? .5 : -.5);
});
[A, Bc].forEach((c, i) => {
  const t = .9 + i * .14;
  tl.fromTo(c, {opacity: 0, scale: .55, y: -90, rotationY: -12, filter: 'blur(8px)'}, {opacity: 1, scale: 1, y: 0, rotationY: 0, filter: 'blur(0px)', duration: .7, ease: EZO}, t);
  cue(t, 'pop', .35, i ? .5 : -.5);
  const det = [...c.querySelectorAll('.av, .nm, .ad, .bar1, .bar2')];
  det.forEach((e, j) => tl.fromTo(e, {opacity: 0, y: 14}, {opacity: 1, y: 0, duration: .45, ease: EZO}, t + .3 + j * .13));
  float(c, 1.8, T, 4, 6);
});
tl.to(cs, {opacity: .35, duration: 1.2}, 2.4);
// letter-level data read (no scan bar): matching letters light up in a cascade, the matching field glows
const glowOn = (els, t) => tl.fromTo(els, {backgroundColor: 'rgba(67,164,220,0)', boxShadow: '0 0 0 rgba(67,164,220,0)'}, {backgroundColor: 'rgba(67,164,220,.14)', boxShadow: '0 0 28px rgba(67,164,220,.55)', duration: .45, ease: 'power2.out'}, t);
const scan = (t0, d, sel) => {
  [A, Bc].forEach((c, k) => {
    const chs = [...c.querySelectorAll(sel + ' .ch')];
    chs.forEach((ch, i) => {
      const tt = t0 + d * ((k ? 1040 : 0) + 260 + i * 17) / 1900;
      tl.fromTo(ch, {color: NAVY}, {color: BLUE, duration: .15}, tt).to(ch, {color: NAVY, duration: .6}, tt + .3);
    });
    glowOn(c.querySelector(sel), t0 + d * ((k ? 1040 : 0) + 480) / 1900);
    cue(t0 + d * ((k ? 1040 : 0) + 260) / 1900, 'tick', .25, k ? .5 : -.5);
  });
};
const svg = svgLayer($('#cam'));
const nameLine = edge(svg, 720, 422, 1250, 422, BLUE, 3, '3 10', false);
const addrLine = edge(svg, 660, 520, 1250, 520, BLUE, 3, '3 10', false);
const tag = (bg, label) => `<div class="tag" style="position:relative;background:${bg};color:#fff;font-size:22px">${label} ≈ <b class="v">0.00</b></div>`;
const tagN = W_(tag(NAVY, 'Name'), 885, 262), tagA = W_(tag(BLUE, 'Address'), 860, 558);
gsap.set([tagN, tagA], {opacity: 0});
const v2 = v => v.toFixed(2);
// name: scanned from 0.9 s, score counts while "similar name" is said
scan(1.6, 2.0, '.nm'); nameLine.draw(2.2, .8, 'power2.inOut'); rise(tagN, 2.3, .5); count(tagN.querySelector('.v'), 2.3, .5, .91, 1.0, v2);
// address: earlier and slower; counts up to 0.95 as "same address" is spoken
const tA = at('address');
scan(2.7, 2.0, '.ad'); addrLine.draw(tA - .2, .8, 'power2.inOut'); rise(tagA, tA - .2, .5); count(tagA.querySelector('.v'), tA - .2, .6, .95, 1.3, v2);
tl.fromTo(tagA.in, {boxShadow: '0 0 0 rgba(67,164,220,0)'}, {boxShadow: '0 0 30px rgba(67,164,220,.9)', duration: .4}, tA + 1.1);
cue(tA + 1.1, 'chime1', .45);
nameLine.pulse(3.2, 3, BLUE, 2.2); addrLine.pulse(tA + 1.2, 2, BLUE, 2.2);

// 93%: cards rise to the top, the score counts inside a ring that draws around it, then a very subtle scale-up
const tSc = at('score'), t93 = at('93');
tl.to([tagN, tagA, svg, cs], {opacity: 0, y: -30, duration: .45, ease: 'power2.in'}, tSc - .55);
tl.to(A, {x: 160, y: -250, scale: .7, duration: 1.0, ease: 'power3.inOut'}, tSc - .55);
tl.to(Bc, {x: -160, y: -250, scale: .7, duration: 1.0, ease: 'power3.inOut'}, tSc - .55);
const RC = [960, 640], RR = 290;
const ringSvg = svgLayer($('#cam'));
const track = svgDot(ringSvg, RC[0], RC[1], RR, 'none'); track.setAttribute('stroke', 'rgba(236,100,8,.15)'); track.setAttribute('stroke-width', 10);
const ring = svgPath(ringSvg, `M${RC[0]},${RC[1] - RR} a${RR},${RR} 0 1,1 -0.1,0`, ORANGE, 10);
gsap.set(ringSvg, {opacity: 0});
tl.to(ringSvg, {opacity: 1, duration: .3}, tSc - .1);
const kick = W_(`<div class="kick" style="position:relative;font-size:22px;width:1920px;text-align:center">Fuzzy-match score</div>`, 0, 520);
const big = W_(`<div class="num" style="position:relative;width:1920px;text-align:center;font-size:170px;font-weight:700;color:${ORANGE};letter-spacing:-4px;line-height:1">0%</div>`, 0, 562);
const num = big.querySelector('.num');
rise(kick, tSc, .5);
tl.fromTo(big, {opacity: 0, y: 40, filter: 'blur(10px)'}, {opacity: 1, y: 0, filter: 'blur(0px)', duration: .6, ease: EZO}, tSc);
count(num, tSc, 0, 93, t93 - tSc + .6);
trim(ring, tSc, t93 - tSc + .6, 'power2.out');
for (let i = 0; i < 8; i++) cue(tSc + .1 + i * (t93 - tSc + .5) / 8, 'tick', .22);
tl.to(big.in, {scale: 1.04, duration: .9, ease: 'sine.out'}, t93 + .5);
cue(t93 + .5, 'chime', .5);

// the ring closes into the MERGE? button (no wobble: one smooth morph)
const tB = B3 - .25;
tl.to([big, kick], {opacity: 0, scale: .9, filter: 'blur(8px)', duration: .4, ease: 'power2.in'}, tB);
tl.to(ringSvg, {scale: .32, opacity: 0, transformOrigin: `${RC[0]}px ${RC[1]}px`, duration: .55, ease: 'power3.in'}, tB);
const btn = W_(`<div class="mb" style="position:relative;overflow:hidden;padding:34px 84px;border-radius:70px;font-size:64px;font-weight:700;letter-spacing:3px;color:#fff;background:linear-gradient(180deg,#7cc8f2,${BLUE} 55%,#2a7fb5);box-shadow:0 26px 60px rgba(10,38,71,.35),inset 0 3px 0 rgba(255,255,255,.55)"><div class="og" style="position:absolute;inset:0;background:linear-gradient(180deg,#ff9a4d,${ORANGE} 55%,#c85000);-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 calc(var(--r,0) * 1%),transparent calc(var(--r,0) * 1% + 14%));--r:-20"></div><div class="sw" style="position:absolute;top:-20%;bottom:-20%;width:26%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg)"></div><span style="position:relative">MERGE?</span></div>`, 960, 600, {z: 5, parent: $('#front')});
gsap.set(btn, {xPercent: -50, yPercent: -50});
tl.fromTo(btn, {scale: .5, opacity: 0, filter: 'blur(8px)'}, {scale: 1, opacity: 1, filter: 'blur(0px)', duration: .6, ease: EZO}, tB + .35);
tl.fromTo(btn.querySelector('.sw'), {xPercent: -150, left: '0%'}, {left: '100%', xPercent: 50, duration: .9, ease: 'power2.inOut'}, tB + .7);
cue(tB + .35, 'pop', .7);
tl.to(A, {x: 330, y: -230, scale: .62, duration: 2.2, ease: 'sine.inOut'}, tB);
tl.to(Bc, {x: -330, y: -230, scale: .62, duration: 2.2, ease: 'sine.inOut'}, tB);
const q = words('Would you merge them?', 0, 790, {size: 58});
gsap.set(q, {color: NAVY});
q.ws.forEach((w, i) => rise(w, at(['would', 'you', 'merge', 'them'][i]) - .05, .45));
// cursor enters oversize, parks, presses; the button answers with a squash and one light ripple
const cur = W_(`<svg style="position:static" width="58" height="72" viewBox="0 0 24 30"><path d="M2 2v22l6-6 4 9 4-2-4-9h8z" fill="#fff" stroke="${NAVY}" stroke-width="1.6" stroke-linejoin="round"/></svg>`, 1010, 610, {z: 9, parent: $('#front')});
const tPress = T - .55;
tl.fromTo(cur, {x: 640, y: 360, scale: 3, opacity: 0}, {x: 0, y: 0, scale: 1, opacity: 1, duration: .8, ease: EZO}, tPress - 1.0);
tl.to(cur, {scale: .85, duration: .07, ease: 'power2.in'}, tPress).to(cur, {scale: 1, duration: .12}, tPress + .07);
// hover: letters track out, the orange energy wave floods outward from the cursor; press 100 -> 96 -> 104 -> 100
tl.to(btn.querySelector('span'), {letterSpacing: '9px', duration: .6, ease: 'power2.out'}, tPress - .55);
tl.fromTo(btn.querySelector('.og'), {'--r': -20}, {'--r': 120, duration: .7, ease: 'power2.inOut', immediateRender: true}, tPress - .45);
tl.to(btn.querySelector('.mb'), {boxShadow: '0 26px 70px rgba(236,100,8,.5)', duration: .5}, tPress - .4);
tl.to(btn.in, {scale: .96, duration: .08, ease: 'power2.in'}, tPress + .03).to(btn.in, {scale: 1.04, duration: .14, ease: 'power2.out'}, tPress + .11).to(btn.in, {scale: 1, duration: .25, ease: 'power2.inOut'}, tPress + .25);
cue(tPress - .45, 'shimmer', .35);
const rip = node(`<div class="ring" style="left:${960 - 260}px;top:${600 - 260}px;width:520px;height:520px;border:3px solid rgba(236,100,8,.7);opacity:0"></div>`, $('#front'));
tl.fromTo(rip, {scale: .3, opacity: .8}, {scale: 1.1, opacity: 0, duration: .6, ease: EZO, immediateRender: false}, tPress + .05);
cue(tPress, 'click', 1);
// everything but the button clears, so the next scene starts on the same frame
tl.to([A, Bc, q, cur], {opacity: 0, filter: 'blur(8px)', duration: .35, ease: 'power2.in'}, tPress + .15);
const headBg = c => c === 'blue' ? 'radial-gradient(circle at 35% 30%,#ffffff 0%,#8fd0f5 45%,#2a7fb5 100%)' : 'radial-gradient(circle at 35% 30%,#ffe1c9 0%,#ff9c55 45%,#b84a00 100%)';
// v6 carry: each record card folds into a glowing identity disc; the discs become the two people's heads in the next scene
[[A, 'blue', 760], [Bc, 'orange', 1160]].forEach(([c, col, x], k) => {
  const ch = chip('border-radius:24px', `<div class="hg" style="position:absolute;inset:0;background:${headBg(col)};opacity:0"></div>`);
  ch.style.background = 'rgba(255,255,255,.92)';
  morph(ch, c, pose(x, 330, 150, 150), tPress + .1, .62, 'power3.inOut', 40);
  tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .08, immediateRender: true}, tPress + .1);
  tl.to(ch, {borderRadius: '75px', duration: .45, ease: 'power2.inOut'}, tPress + .18);
  tl.to(ch.querySelector('.hg'), {opacity: 1, duration: .4}, tPress + .22);
  tl.to(ch, {boxShadow: `0 0 46px ${col === 'blue' ? 'rgba(143,208,245,.85)' : 'rgba(255,156,85,.85)'}`, duration: .4}, tPress + .3);
});
closeMove('push', .32, 960, 600);
finish();
