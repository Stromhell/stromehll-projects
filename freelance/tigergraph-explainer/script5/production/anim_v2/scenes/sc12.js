// Scene 12 (light): "fuzzy alone is fine" card with a mailing list de-duplicating itself; then the camera slides right
// onto the "Add graph when" checklist, each 3D check tile flips in as it is spoken.
const T = window.TOTAL, B2 = window.BEATS[1];
world('light', {particles: 34});
openMove('push');
const L = glass(560, 330, 720, `<div style="font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.6">Fuzzy alone is fine for</div>
  <div style="display:flex;align-items:center;gap:26px;margin-top:28px"><div class="mails" style="position:relative;width:100px;height:100px;flex:none">
   ${[0, 1, 2].map(i => `<div class="tile w ml" style="position:absolute;left:0;top:0;width:100px;height:100px;border-radius:27px">${icon('mail', 46, NAVY)}</div>`).join('')}</div>
  <div style="font-size:38px;font-weight:600">Clean, low-stakes data<div style="font-size:26px;font-weight:300;margin-top:4px">e.g. de-duplicating a mailing list</div></div></div>`, 'padding:46px 50px');
flyIn(L, .15, {y: 300, rotationX: -40});
gsap.set(L.in, {scale: 1.3});
float(L, .9, B2, 5, 3.4);
// mailing list: three copies fan out, then collapse into one on "mailing list"
const ml = L.querySelectorAll('.ml');
tl.fromTo(ml[1], {x: 0, y: 0, rotation: 0}, {x: -14, y: 26, rotation: -8, duration: .5, ease: 'expo.out'}, at('clean'));
tl.fromTo(ml[2], {x: 0, y: 0, rotation: 0}, {x: -28, y: 52, rotation: -16, duration: .5, ease: 'expo.out'}, at('clean') + .12);
const tM = at('mailing');
tl.to([ml[1], ml[2]], {x: 0, y: 0, rotation: 0, duration: .45, ease: 'expo.in'}, tM);
tl.fromTo(ml[0], {scale: 1}, {scale: 1.15, duration: .12, yoyo: true, repeat: 1}, tM + .45);
cue(tM + .45, 'pop', .6);
const items = ['KYC or AML decisions', 'Details deliberately changed', 'Shared addresses (households, companies)', 'Merges must be explained'];
const C = glass(850, 180, 920, `<div style="font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${BLUE}">Add graph when</div>
  ${items.map(t => `<div class="it" style="display:flex;align-items:center;gap:24px;margin-top:26px;font-size:40px;font-weight:600"><div class="tile ck" style="position:relative;width:76px;height:76px;border-radius:20px;flex:none">${icon('check', 36)}</div><span class="tx">${t}</span></div>`).join('')}`, 'padding:44px 54px');
// waiting out of focus on the right during beat 1
tl.fromTo(C, {x: 520, opacity: 0, filter: 'blur(10px)', scale: .9}, {x: 520, opacity: .45, filter: 'blur(10px)', scale: .9, duration: 1, ease: 'sine.out'}, 2.2);
gsap.set(C.querySelectorAll('.it'), {opacity: .35});
// beat 2: camera slides right; left card settles small, checklist comes into focus
tl.to(L, {x: -430, y: 0, scale: .82, duration: 1, ease: 'expo.inOut'}, B2 - .1);
tl.to(L.in, {scale: 1, duration: 1, ease: 'expo.inOut'}, B2 - .1);
tl.to(C, {x: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1, ease: 'expo.inOut'}, B2 - .1);
tl.fromTo('#world', {x: 0}, {x: -60, duration: 1.2, ease: 'expo.inOut'}, B2 - .1);
cue(B2 - .1, 'whoosh', .6);
float(C, B2 + 1, T, 4, 3.8);
const it = [at('kyc'), at('deliberately'), at('households'), at('explain')];
C.querySelectorAll('.it').forEach((r, i) => {
  tl.to(r, {opacity: 1, duration: .25}, it[i] - .1);
  tl.fromTo(r.querySelector('.ck'), {rotationY: 180, scale: .6}, {rotationY: 0, scale: 1, duration: .55, ease: 'back.out(2)'}, it[i] - .1);
  tl.fromTo(r.querySelector('.tx'), {x: 30}, {x: 0, duration: .5, ease: 'expo.out'}, it[i] - .1);
  tl.fromTo(r.querySelector('.ck'), {boxShadow: '0 0 0 rgba(67,164,220,0)'}, {boxShadow: '0 0 40px rgba(67,164,220,.9)', duration: .25, yoyo: true, repeat: 1}, it[i] + .3);
  cue(it[i] - .05, 'tick2', .7);
});
closeMove('whipL');
finish();
