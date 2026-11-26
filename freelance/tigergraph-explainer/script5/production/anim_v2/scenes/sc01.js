// Scene 1 (light): two records fly in, a scanner reads them letter by letter, 93% punches up, MERGE? inflates, the cursor presses.
const T = window.TOTAL, B2 = window.BEATS[1], B3 = window.BEATS[2];
world('light', {particles: 40});
openMove('push');
const card = (k, n, a, rot) => `<div class="glass" style="position:relative;width:540px;padding:32px 38px;transform:rotateY(${rot}deg) rotateZ(${rot / -4}deg)">
  <div style="display:flex;gap:22px;align-items:center"><div class="av" style="width:96px;height:96px;border-radius:24px;background:radial-gradient(circle at 35% 30%,#fff,#8fd0f5 45%,#2a7fb5);flex:none;box-shadow:inset 0 -8px 16px rgba(10,38,71,.25)"></div>
  <div><div style="font-size:17px;letter-spacing:3px;font-weight:600;color:${BLUE}">${k}</div><div class="nm" style="font-size:44px;font-weight:700;line-height:1.05;margin-top:4px">${n}</div></div></div>
  <div class="ad" style="margin-top:20px;font-size:26px;font-weight:300">${a}</div>
  <div class="bar1" style="margin-top:16px;height:10px;border-radius:5px;background:linear-gradient(90deg,rgba(67,164,220,.4),rgba(67,164,220,.08));width:70%"></div>
  <div class="bar2" style="margin-top:10px;height:10px;border-radius:5px;background:rgba(67,164,220,.14);width:45%"></div></div>`;
const A = W_(card('RECORD A', 'Daniel Reyes', '14 Harbor View Apts', 14), 150, 330);
const Bc = W_(card('RECORD B', 'Dan Reyes', '14 Harbour View Apartments', -14), 1230, 330);
// letters as spans so the scanner can light them
gsap.set([A.in, Bc.in], {scale: 1.18});
[A, Bc].forEach(c => ['.nm', '.ad'].forEach(s => { const e = c.querySelector(s); e.innerHTML = [...e.textContent].map(ch => `<span class="ch">${ch === ' ' ? '&nbsp;' : ch}</span>`).join(''); }));
flyIn(A, .08, {x: -1100, rotationY: 60, z: -300}, .7);
flyIn(Bc, .4, {x: 1100, rotationY: -60, z: -300}, .7);
[A, Bc].forEach((c, i) => { tl.from(c.querySelectorAll('.av,.bar1,.bar2'), {scaleX: 0, transformOrigin: '0 50%', opacity: 0, duration: .5, stagger: .08, ease: 'expo.out'}, .7 + i * .3); float(c, 1, T, 7, 3.4 + i * .5); });

// scanner beam: sweeps across both cards, letters light up as it passes
const beam = node(`<div class="w" style="left:0;top:180px;width:70px;height:760px;opacity:0;background:linear-gradient(90deg,transparent,rgba(67,164,220,.55) 40%,rgba(255,255,255,.95) 50%,rgba(67,164,220,.55) 60%,transparent);filter:blur(2px)"></div>`);
const scan = (t0, d, sel) => {
  tl.fromTo(beam, {x: 120, opacity: 0}, {x: 1760, opacity: 1, duration: d, ease: 'power1.inOut'}, t0);
  tl.to(beam, {opacity: 0, duration: .25}, t0 + d - .2);
  [A, Bc].forEach((c, k) => {
    const chs = [...c.querySelectorAll(sel + ' .ch')];
    chs.forEach((ch, i) => {
      const tt = t0 + d * ((k ? 1080 : 0) + 200 + i * 18) / 1900;
      tl.fromTo(ch, {color: 'inherit', textShadow: 'none'}, {color: BLUE, textShadow: '0 0 14px rgba(67,164,220,.8)', duration: .12}, tt).to(ch, {color: NAVY, textShadow: 'none', duration: .5}, tt + .25);
    });
    for (let j = 0; j < 6; j++) cue(t0 + d * ((k ? 1080 : 0) + 200 + j * 50) / 1900, 'tick', .25, k ? .5 : -.5);
  });
};
const svg = svgLayer($('#cam'));
const nameLine = edge(svg, 700, 422, 1240, 422, BLUE, 3, '3 10', false);
const addrLine = edge(svg, 640, 510, 1255, 510, BLUE, 3, '3 10', false);
const tagN = W_(`<div class="tag" style="position:relative;background:${NAVY};color:#fff;font-size:20px">Name ≈ 0.91</div>`, 878, 266);
const tagA = W_(`<div class="tag" style="position:relative;background:${BLUE};color:#fff;font-size:20px">Address ≈ 0.95</div>`, 858, 546);
gsap.set([tagN, tagA, svg], {opacity: 0});
const tS = at('similar'), tA = at('address');
tl.set(svg, {opacity: 1}, tS);
scan(tS - .1, 1.6, '.nm'); nameLine.draw(tS + 1.0, .7, 'power2.out'); pop(tagN, tS + 1.3);
scan(tA - .2, 1.7, '.ad'); addrLine.draw(tA + 1.0, .7, 'power2.out'); pop(tagA, tA + 1.3);
nameLine.pulse(tS + 1.8, 5, BLUE, 1.2); addrLine.pulse(tA + 1.8, 3, BLUE, 1.2);
float(tagN, tS + 1.8, T, 5, 2.4); float(tagA, tA + 1.8, T, 5, 2.8);

// 93%: cards lift away to the top, the number punches up from below with orange particles
const t93 = at('93'), tSc = at('score');
tl.to([tagN, tagA, svg, beam], {opacity: 0, y: -40, duration: .35, ease: 'power2.in'}, tSc - .3);
tl.to(A, {x: 130, y: -240, scale: .72, duration: .8, ease: 'expo.inOut'}, tSc - .3);
tl.to(Bc, {x: -130, y: -240, scale: .72, duration: .8, ease: 'expo.inOut'}, tSc - .3);
const kick = W_(`<div class="kick" style="position:relative;font-size:24px;width:1920px;text-align:center">Fuzzy-match score</div>`, 0, 470);
const big = W_(`<div class="num" style="position:relative;width:1920px;text-align:center;font-size:290px;font-weight:700;color:${ORANGE};letter-spacing:-6px;line-height:1">0%</div>`, 0, 520);
const num = big.querySelector('.num');
tl.fromTo(kick, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: .5, ease: 'expo.out'}, tSc);
tl.fromTo(big, {opacity: 0, y: 260, scale: .6, filter: 'blur(14px)'}, {opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: .55, ease: 'expo.out'}, tSc + .05);
count(num, tSc + .05, 0, 93, t93 - tSc + .15);
for (let i = 0; i < 9; i++) cue(tSc + .1 + i * (t93 - tSc) / 9, 'tick', .3);
tl.fromTo(big.in, {scale: 1}, {scale: 1.08, duration: .12, yoyo: true, repeat: 1, ease: 'power2.out'}, t93 + .1);
cue(t93 + .1, 'thump', .9);
// orange spark burst from the number
for (let i = 0; i < 26; i++) {
  const a = R() * Math.PI * 2, r = 260 + R() * 420, s = 6 + R() * 10;
  const d = node(`<div class="dot" style="left:960px;top:680px;width:${s}px;height:${s}px;background:${R() < .6 ? ORANGE : '#ffb27a'}"></div>`);
  tl.fromTo(d, {x: 0, y: 0, opacity: 0}, {x: Math.cos(a) * r, y: Math.sin(a) * r * .6, opacity: 1, duration: .9, ease: 'expo.out'}, t93 + .1).to(d, {opacity: 0, duration: .6}, t93 + .8);
}
// equaliser ticks breathing under the number
for (let i = 0; i < 9; i++) {
  const b = node(`<div class="w" style="left:${900 + i * 15}px;top:870px;width:6px;height:46px;border-radius:3px;background:${ORANGE};opacity:.7;transform-origin:50% 100%"></div>`);
  tl.fromTo(b, {scaleY: 0}, {scaleY: .3 + R() * .7, duration: .25, ease: 'power2.out', yoyo: true, repeat: Math.ceil((B3 - t93) / .25), delay: i * .03}, tSc + .2);
  tl.to(b, {opacity: 0, duration: .3}, B3 - .3);
}
float(big, t93 + .5, B3, 6, 2.6);

// beat 3: number leaves upward, cards pulled inward on curved paths, MERGE? inflates, cursor parks and presses
tl.to([big, kick], {y: -340, scale: .5, opacity: 0, filter: 'blur(10px)', duration: .45, ease: 'power3.in'}, B3 - .2);
tl.to(A, {x: 300, y: -220, scale: .66, rotation: 3, duration: 2.6, ease: 'sine.inOut'}, B3);
tl.to(Bc, {x: -300, y: -220, scale: .66, rotation: -3, duration: 2.6, ease: 'sine.inOut'}, B3);
const btn = W_(`<div style="position:relative;padding:34px 84px;border-radius:70px;font-size:64px;font-weight:700;letter-spacing:3px;color:#fff;background:linear-gradient(180deg,#ff9a4d,${ORANGE} 55%,#c85000);box-shadow:0 26px 60px rgba(236,100,8,.45),inset 0 3px 0 rgba(255,255,255,.55)">MERGE?</div>`, 960, 600, {z: 5});
gsap.set(btn, {xPercent: -50, yPercent: -50});
tl.fromTo(btn, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: .7, ease: 'elastic.out(1,.55)'}, B3 + .25);
cue(B3 + .25, 'pop', .9);
for (let i = 0; i < 4; i++) shock(960, 600, B3 + .5 + i * .9, ORANGE, 300);
const q = words('Would you merge them?', 0, 790, {size: 58});
gsap.set(q, {color: NAVY});
wordsIn(q, at('would') - .05, .17);
const cur = W_(`<svg style="position:static" width="58" height="72" viewBox="0 0 24 30"><path d="M2 2v22l6-6 4 9 4-2-4-9h8z" fill="#fff" stroke="${NAVY}" stroke-width="1.6" stroke-linejoin="round"/></svg>`, 1010, 610, {z: 9});
const tPark = at('them') + .5, tPress = T - .5;
tl.fromTo(cur, {x: 700, y: 380, scale: 3.2, opacity: 0}, {x: 0, y: 0, scale: 1, opacity: 1, duration: .9, ease: 'expo.out'}, tPark - .9);
tl.to(cur, {scale: .85, duration: .07, ease: 'power2.in'}, tPress).to(cur, {scale: 1, duration: .12}, tPress + .07);
tl.to(btn.in, {scaleX: 1.06, scaleY: .9, duration: .07, ease: 'power2.in'}, tPress + .03).to(btn.in, {scaleX: 1, scaleY: 1, duration: .1}, tPress + .1);
cue(tPress, 'click', 1);
tl.to('#world', {scale: 1.18, duration: T - tPress, ease: 'power3.in'}, tPress);
finish();
