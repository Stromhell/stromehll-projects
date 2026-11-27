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
// A from the left, B from the right: a long glide that eases into a controlled stop
tl.fromTo(A, {x: -900, opacity: 0, filter: 'blur(12px)'}, {x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out'}, .05);
tl.fromTo(Bc, {x: 900, opacity: 0, filter: 'blur(12px)'}, {x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out'}, .2);
cue(.05, 'whoosh', .5, -.6); cue(.2, 'whoosh', .5, .6);
[A, Bc].forEach((c, i) => { tl.from(c.querySelectorAll('.av,.bar1,.bar2'), {scaleX: 0, transformOrigin: '0 50%', opacity: 0, duration: .6, stagger: .1, ease: 'expo.out'}, .7 + i * .15); float(c, 1.3, T, 4, 6); });

// slow vertical scanner: glides across both cards once per field; letters it passes light up, the matching field glows
const beam = node(`<div class="w" style="left:0;top:200px;width:80px;height:720px;opacity:0;background:linear-gradient(90deg,transparent,rgba(67,164,220,.45) 40%,rgba(255,255,255,.95) 50%,rgba(67,164,220,.45) 60%,transparent);filter:blur(2px)"></div>`);
const glowOn = (els, t) => tl.fromTo(els, {backgroundColor: 'rgba(67,164,220,0)', boxShadow: '0 0 0 rgba(67,164,220,0)'}, {backgroundColor: 'rgba(67,164,220,.14)', boxShadow: '0 0 28px rgba(67,164,220,.55)', duration: .45, ease: 'power2.out'}, t);
const scan = (t0, d, sel) => {
  tl.fromTo(beam, {x: 100, opacity: 0}, {x: 1780, opacity: 1, duration: d, ease: 'sine.inOut'}, t0);
  tl.to(beam, {opacity: 0, duration: .3}, t0 + d - .3);
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
// horizontal data scan: a thin line travels down both records and brushes the matching rows
const hscan = node(`<div class="w" style="left:140px;top:340px;width:1640px;height:3px;opacity:0;background:linear-gradient(90deg,transparent,${BLUE} 15%,#fff 50%,${BLUE} 85%,transparent);box-shadow:0 0 24px ${BLUE}"></div>`);
tl.fromTo(hscan, {y: 0, opacity: 0}, {y: 290, opacity: .9, duration: 2.4, ease: 'sine.inOut'}, 1.0).to(hscan, {opacity: 0, duration: .4}, 3.1);
const svg = svgLayer($('#cam'));
const nameLine = edge(svg, 720, 422, 1250, 422, BLUE, 3, '3 10', false);
const addrLine = edge(svg, 660, 520, 1250, 520, BLUE, 3, '3 10', false);
const tag = (bg, label) => `<div class="tag" style="position:relative;background:${bg};color:#fff;font-size:22px">${label} ≈ <b class="v">0.00</b></div>`;
const tagN = W_(tag(NAVY, 'Name'), 885, 262), tagA = W_(tag(BLUE, 'Address'), 860, 558);
gsap.set([tagN, tagA], {opacity: 0});
const v2 = v => v.toFixed(2);
// name: scanned from 0.9 s, score counts while "similar name" is said
scan(.9, 2.2, '.nm'); nameLine.draw(2.2, .8, 'power2.inOut'); rise(tagN, 2.3, .5); count(tagN.querySelector('.v'), 2.3, .5, .91, 1.0, v2);
// address: earlier and slower; counts up to 0.95 as "same address" is spoken
const tA = at('address');
scan(2.7, 2.0, '.ad'); addrLine.draw(tA - .2, .8, 'power2.inOut'); rise(tagA, tA - .2, .5); count(tagA.querySelector('.v'), tA - .2, .6, .95, 1.3, v2);
tl.fromTo(tagA.in, {boxShadow: '0 0 0 rgba(67,164,220,0)'}, {boxShadow: '0 0 30px rgba(67,164,220,.9)', duration: .4}, tA + 1.1);
cue(tA + 1.1, 'chime1', .45);
nameLine.pulse(3.2, 3, BLUE, 2.2); addrLine.pulse(tA + 1.2, 2, BLUE, 2.2);

// 93%: cards rise to the top, the score counts inside a ring that draws around it, then a very subtle scale-up
const tSc = at('score'), t93 = at('93');
tl.to([tagN, tagA, svg, beam], {opacity: 0, y: -30, duration: .45, ease: 'power2.in'}, tSc - .55);
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
tl.fromTo(big, {opacity: 0, y: 40, filter: 'blur(10px)'}, {opacity: 1, y: 0, filter: 'blur(0px)', duration: .6, ease: 'expo.out'}, tSc);
count(num, tSc, 0, 93, t93 - tSc + .6);
trim(ring, tSc, t93 - tSc + .6, 'power2.out');
for (let i = 0; i < 8; i++) cue(tSc + .1 + i * (t93 - tSc + .5) / 8, 'tick', .22);
tl.to(big.in, {scale: 1.04, duration: .9, ease: 'sine.out'}, t93 + .5);
cue(t93 + .5, 'chime', .5);

// the ring closes into the MERGE? button (no wobble: one smooth morph)
const tB = B3 - .25;
tl.to([big, kick], {opacity: 0, scale: .9, filter: 'blur(8px)', duration: .4, ease: 'power2.in'}, tB);
tl.to(ringSvg, {scale: .32, opacity: 0, transformOrigin: `${RC[0]}px ${RC[1]}px`, duration: .55, ease: 'power3.in'}, tB);
const btn = W_(`<div class="mb" style="position:relative;padding:34px 84px;border-radius:70px;font-size:64px;font-weight:700;letter-spacing:3px;color:#fff;background:linear-gradient(180deg,#ff9a4d,${ORANGE} 55%,#c85000);box-shadow:0 26px 60px rgba(236,100,8,.45),inset 0 3px 0 rgba(255,255,255,.55)">MERGE?</div>`, 960, 600, {z: 5, parent: $('#front')});
gsap.set(btn, {xPercent: -50, yPercent: -50});
tl.fromTo(btn, {scale: .5, opacity: 0, filter: 'blur(8px)'}, {scale: 1, opacity: 1, filter: 'blur(0px)', duration: .6, ease: 'expo.out'}, tB + .35);
cue(tB + .35, 'pop', .7);
tl.to(A, {x: 330, y: -230, scale: .62, duration: 2.2, ease: 'sine.inOut'}, tB);
tl.to(Bc, {x: -330, y: -230, scale: .62, duration: 2.2, ease: 'sine.inOut'}, tB);
const q = words('Would you merge them?', 0, 790, {size: 58});
gsap.set(q, {color: NAVY});
q.ws.forEach((w, i) => rise(w, at(['would', 'you', 'merge', 'them'][i]) - .05, .45));
// cursor enters oversize, parks, presses; the button answers with a squash and one light ripple
const cur = W_(`<svg style="position:static" width="58" height="72" viewBox="0 0 24 30"><path d="M2 2v22l6-6 4 9 4-2-4-9h8z" fill="#fff" stroke="${NAVY}" stroke-width="1.6" stroke-linejoin="round"/></svg>`, 1010, 610, {z: 9, parent: $('#front')});
const tPress = T - .55;
tl.fromTo(cur, {x: 640, y: 360, scale: 3, opacity: 0}, {x: 0, y: 0, scale: 1, opacity: 1, duration: .8, ease: 'expo.out'}, tPress - 1.0);
tl.to(cur, {scale: .85, duration: .07, ease: 'power2.in'}, tPress).to(cur, {scale: 1, duration: .12}, tPress + .07);
tl.to(btn.in, {scale: .94, duration: .08, ease: 'power2.in'}, tPress + .03).to(btn.in, {scale: 1, duration: .14, ease: 'power2.out'}, tPress + .11);
const rip = node(`<div class="ring" style="left:${960 - 260}px;top:${600 - 260}px;width:520px;height:520px;border:3px solid rgba(236,100,8,.7);opacity:0"></div>`, $('#front'));
tl.fromTo(rip, {scale: .3, opacity: .8}, {scale: 1.1, opacity: 0, duration: .6, ease: 'expo.out', immediateRender: false}, tPress + .05);
cue(tPress, 'click', 1);
// everything but the button clears, so the next scene starts on the same frame
tl.to([A, Bc, q, cur], {opacity: 0, filter: 'blur(8px)', duration: .35, ease: 'power2.in'}, tPress + .15);
finish();
