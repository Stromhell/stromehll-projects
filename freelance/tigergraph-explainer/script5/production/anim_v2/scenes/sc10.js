// Scene 10 (light): a magnifier searches the score and finds nothing; the evidence panel ticks in line by line;
// then the real Party record in TigerGraph zooms toward camera.
const T = window.TOTAL, B2 = window.BEATS[1];
world('light', {particles: 34});
openMove('push');
const sc = glass(200, 330, 460, `<div style="height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div style="font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.6">Score</div>
  <div class="sv" style="font-size:150px;font-weight:700;color:${BLUE}">92%</div><div class="bc" style="font-size:28px;opacity:.7">…because?</div></div>`);
flyIn(sc, .15, {x: -500, rotationY: 40});
gsap.set(sc.in, {x: 500, scale: 1.35});
tl.to(sc.in, {x: 0, scale: 1, duration: .9, ease: 'expo.inOut'}, B2 - .3);
float(sc, .9, T, 5, 3.2);
const magBox = node('<div class="w" style="left:0;top:0"></div>');
tl.fromTo(magBox, {x: 500, scale: 1.35, transformOrigin: '430px 540px'}, {x: 500, scale: 1.35, duration: .01}, 0);
const mag = W_(`<div style="position:relative;width:200px;height:200px;border-radius:50%;border:10px solid ${NAVY};background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.7),rgba(191,226,246,.35));box-shadow:0 20px 50px rgba(10,38,71,.3)"><div style="position:absolute;left:170px;top:170px;width:120px;height:26px;border-radius:13px;background:${NAVY};transform:rotate(45deg);transform-origin:0 50%"></div></div>`, 330, 420, {z: 6, parent: magBox});
const tR = at('regulator');
tl.fromTo(mag, {x: 700, y: -300, scale: 2.4, opacity: 0}, {x: 0, y: 0, scale: 1, opacity: 1, duration: .8, ease: 'expo.out'}, tR - .3);
cue(tR - .3, 'whoosh_s', .6);
tl.to(mag, {keyframes: [{x: -90, y: -60, duration: .7}, {x: 60, y: 40, duration: .7}, {x: -40, y: 80, duration: .6}, {x: 30, y: -20, duration: .6}], ease: 'sine.inOut'}, tR + .5);
const tS = at('score');
tl.to(sc.querySelector('.sv'), {color: '#9fb3c3', duration: .5}, tS);
tl.to(sc.in.firstElementChild, {filter: 'grayscale(1)', opacity: .75, duration: .5}, tS);
tl.fromTo(sc.querySelector('.bc'), {scale: 1}, {scale: 1.25, color: ORANGE, duration: .2, yoyo: true, repeat: 1}, tS + .3);
tl.to(mag, {x: 400, y: 300, scale: .6, opacity: 0, duration: .5, ease: 'power3.in'}, at('answer') + .3);
cue(tS + .3, 'meh', .5);
const sup = words("A score isn't|<em>a reason.</em>", 200, 870, {size: 64, w: 1500, align: 'left'});
wordsIn(sup, at('answer') - .1, .3);
// evidence panel
const lines = ['Verified phone number matches', 'Same device fingerprint', 'Same company director role', '3 linked accounts, 2 hops'];
const ev = glass(780, 220, 940, `<div style="font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${BLUE}">Evidence · why these records were merged</div>
  ${lines.map(t => `<div class="ln" style="display:flex;align-items:center;gap:18px;margin-top:22px;font-size:30px;font-weight:500"><span class="ck">${icon('check', 40, GREEN, 3)}</span>${t}</div>`).join('')}
  <div class="mt" style="margin-top:34px;display:flex;gap:16px">${['phone', 'device', 'director'].map((ic, i) => `<div class="tile ${i === 2 ? 'o' : ''}" style="position:relative;width:80px;height:80px;border-radius:22px">${icon(ic, 38)}</div>`).join('')}</div>`, 'padding:44px 52px');
flyIn(ev, B2 + .1, {x: 700, rotationY: -35});
const lt = [at('identifiers'), at('identifiers') + .6, at('relationships'), at('confirmed')];
ev.querySelectorAll('.ln').forEach((l, i) => {
  tl.fromTo(l, {opacity: 0, x: 40}, {opacity: 1, x: 0, duration: .4, ease: 'expo.out'}, lt[i]);
  tl.fromTo(l.querySelector('.ck'), {scale: 0, rotation: -90}, {scale: 1, rotation: 0, duration: .35, ease: 'back.out(3)'}, lt[i] + .1);
  cue(lt[i] + .1, 'tick2', .7);
});
ev.querySelectorAll('.mt .tile').forEach((t, i) => { tl.fromTo(t, {opacity: .15, scale: .7}, {opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)'}, lt[3] + .4 + i * .15); cue(lt[3] + .4 + i * .15, 'pop', .4); });
float(ev, B2 + .8, T, 4, 3.6);
// the real product: Party record and its attributes
const tD = B2 + 5.95;
tl.to([sc, ev, mag], {y: -900, opacity: 0, filter: 'blur(14px)', duration: .45, ease: 'power3.in', stagger: .04}, tD - .45);
wordsOut(sup, tD - .45);
cue(tD - .45, 'whoosh', .7);
const dm = demoWin(160, 140, 1000, 'party.png', 'TigerGraph · Party attributes');
gsap.set(dm.in, {rotationY: 12});
tl.fromTo(dm, {opacity: 0, z: -800, y: 400}, {opacity: 1, z: 0, y: 0, duration: .6, ease: 'expo.out'}, tD - .1);
tl.to(dm, {z: 260, x: 60, duration: T - tD, ease: 'sine.inOut'}, tD + .5);
tl.to(dm.in, {rotationY: 2, duration: T - tD, ease: 'sine.inOut'}, tD + .3);
const kc = glass(1240, 300, 540, `<div style="font-size:22px;letter-spacing:3px;font-weight:600;color:${BLUE}">KEPT IN THE GRAPH</div><div style="font-size:34px;font-weight:600;margin-top:16px;line-height:1.4"><span class="kw">Every identifier,</span><br><span class="kw">Every relationship,</span><br><span class="kw">Every merge decision.</span></div>`, 'padding:34px 38px', {z: 5});
flyIn(kc, tD + .3, {x: 500});
kc.querySelectorAll('.kw').forEach((k, i) => tl.fromTo(k, {opacity: 0, y: 14}, {opacity: 1, y: 0, duration: .35, ease: 'expo.out'}, tD + .6 + i * .3));
closeMove('whipL');
finish();
