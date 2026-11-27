// Scene 12 (light). Part 1: one record copies itself into duplicates, they line up, slide together and merge into one clean
// master record, then "Clean, low-stakes data". Part 2: the "Add graph when" checklist sits left; each item rises with a drawn
// check while a matching visual builds on the right (shield, a record whose details change, two records sharing an address),
// and on "merges must be explained" everything links into one network that stays visible before the cut.
const T = window.TOTAL, B2 = window.BEATS[1];
world('light', {particles: 26, from: 'blue', reveal: .8});
const recHtml = (n, e, a, w = 520) => `<div class="glass" style="position:relative;width:${w}px;padding:26px 32px"><div style="display:flex;gap:18px;align-items:center"><div class="tile w" style="position:relative;width:70px;height:70px;border-radius:20px;flex:none">${icon('mail', 34, NAVY)}</div><div><div class="rn" style="font-size:32px;font-weight:700">${n}</div><div style="font-size:22px;opacity:.7;margin-top:4px">${e}</div><div style="font-size:22px;opacity:.7">${a}</div></div></div></div>`;
// part 1: one record, then copies
const master = W_(recHtml('Anna Lee', 'anna.lee@mail.com', '12 Elm Street'), 700, 430, {z: 5});
tl.fromTo(master, {scale: .7, opacity: 0, filter: 'blur(10px)'}, {scale: 1, opacity: 1, filter: 'blur(0px)', duration: .7, ease: 'expo.out'}, .2);
cue(.2, 'whoosh_s', .4);
const offs = [[-360, -170, -4], [380, -120, 3], [-300, 200, 3]];
const dups = offs.map(([dx, dy, r], i) => {
  const d = W_(recHtml('Anna Lee', 'anna.lee@mail.com', '12 Elm Street'), 700, 430, {z: 4 - i});
  tl.fromTo(d, {x: 0, y: 0, rotation: 0, opacity: 0}, {x: dx, y: dy, rotation: r, opacity: .92, duration: .7, ease: 'power3.out'}, at('fine') - .3 + i * .25);
  cue(at('fine') - .3 + i * .25, 'pop', .35, dx / 900);
  float(d, at('fine') + .6, at('deduplicating'), 3, 5);
  return d;
});
const dupTag = W_(`<div class="tag" style="position:relative;background:${ORANGE};color:#fff;font-size:20px">3 duplicates</div>`, 1180, 300, {z: 6}); rise(dupTag, at('fine') + .6, .45);
// header for part 1
const h1 = words('Fuzzy alone is fine for', 0, 120, {size: 34}), h2 = words('<em>Clean, low-stakes data</em>', 0, 165, {size: 64});
gsap.set(h1, {color: BLUE}); h2.querySelector('em').style.color = NAVY;
rise(h1, at('fuzzy'), .5); h2.ws.forEach(w => rise(w, at('clean') - .05, .55));
// align, slide together, merge into the master record
const tD = at('deduplicating') - .3;
dups.forEach((d, i) => { tl.to(d, {x: 0, y: (i + 1) * 22, rotation: 0, duration: .6, ease: 'power2.inOut'}, tD + i * .08); tl.to(d, {y: 0, opacity: 0, scale: .96, duration: .45, ease: 'power2.in'}, tD + .8 + i * .1); });
tl.to(dupTag, {opacity: 0, y: -10, duration: .3}, tD + .4);
tl.fromTo(master.in.firstElementChild, {boxShadow: '0 34px 80px rgba(10,38,71,.22)'}, {boxShadow: '0 0 70px rgba(67,164,220,.8)', duration: .3, yoyo: true, repeat: 1}, tD + 1.25);
cue(tD + 1.25, 'chime', .45);
const mt = W_(`<div class="tag" style="position:relative;background:${GREEN};color:#fff;font-size:20px;display:flex;gap:8px;align-items:center">${checkSvg(20)} 1 clean record</div>`, 1060, 395, {z: 6});
rise(mt, tD + 1.35, .45); drawCheck(mt, tD + 1.5, .35);
const cap = words('e.g. de-duplicating a mailing list', 0, 700, {size: 32}); gsap.set(cap, {color: NAVY, opacity: .75}); rise(cap, at('mailing') - .2, .5);
// part 2: checklist left, visuals right
const tO = B2 - .4;
tl.to([master, mt, cap, h1, h2], {opacity: 0, y: -40, filter: 'blur(8px)', duration: .45, ease: 'power2.in', stagger: .03}, tO);
cue(tO, 'whoosh', .45);
const items = ['KYC or AML decisions', 'Details deliberately changed', 'Shared addresses (households, companies)', 'Merges must be explained'];
const C = glass(110, 230, 760, `<div class="hd" style="font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${BLUE}">Add graph when</div>
  ${items.map(t => `<div class="it" style="display:flex;align-items:center;gap:22px;margin-top:26px;font-size:34px;font-weight:600;border-radius:16px;padding:8px 10px;margin-left:-10px"><div class="tile" style="position:relative;width:64px;height:64px;border-radius:18px;flex:none;opacity:.35">${checkSvg(34)}</div><span class="tx">${t}</span></div>`).join('')}`, 'padding:40px 46px');
tl.fromTo(C, {x: -200, opacity: 0, filter: 'blur(10px)'}, {x: 0, opacity: 1, filter: 'blur(0px)', duration: .7, ease: 'expo.out'}, B2 + .2);
const rows = [...C.querySelectorAll('.it')];
gsap.set(rows, {opacity: 0});
const tick = (i, t) => {
  const r = rows[i];
  tl.fromTo(r, {y: 22, opacity: 0}, {y: 0, opacity: 1, duration: .5, ease: 'expo.out'}, t);
  tl.to(r.querySelector('.tile'), {opacity: 1, duration: .3}, t + .2); drawCheck(r, t + .3, .4);
  tl.fromTo(r, {backgroundColor: 'rgba(67,164,220,0)'}, {backgroundColor: 'rgba(67,164,220,.12)', duration: .35}, t + .1);
  if (i) tl.to(rows[i - 1], {backgroundColor: 'rgba(67,164,220,0)', duration: .35}, t + .1);
};
float(C, B2 + 1, T, 3, 6);
const vs = svgLayer($('#cam'));
// 1. KYC / AML: a shield
const t1 = at('kyc') - .2; tick(0, t1);
const shield = W_(`<div style="position:relative;width:170px;height:170px;border-radius:44px;background:linear-gradient(150deg,#7fcaf2,${BLUE});display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px rgba(10,38,71,.25)"><svg style="position:static" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path class="ck" d="M8.5 12.5l2.5 2.5 4.5-5" stroke-dasharray="24" stroke-dashoffset="24"/></svg></div>`, 1300, 410);
tl.fromTo(shield, {scale: .6, opacity: 0, y: 30}, {scale: 1, opacity: 1, y: 0, duration: .6, ease: 'expo.out'}, t1 + .2);
drawCheck(shield, t1 + .7, .45);
const kl = W_(`<div class="kick" style="position:relative;width:400px;text-align:center">KYC · AML</div>`, 1185, 600); rise(kl, t1 + .5, .45);
// 2. details deliberately changed: a record whose name and phone are rewritten; its graph link holds
const t2 = at('people') - .2; tick(1, t2);
tl.to(shield, {x: 330, y: -190, scale: .55, duration: .8, ease: 'power3.inOut'}, t2); tl.to(kl, {opacity: 0, duration: .3}, t2);
const pr = W_(`<div class="glass" style="position:relative;width:460px;padding:26px 30px"><div style="font-size:18px;letter-spacing:3px;font-weight:600;color:${BLUE}">PROFILE</div>
  <div style="font-size:30px;font-weight:700;margin-top:8px">Name: <span class="f1 cf">Daniel Reyes</span></div><div style="font-size:26px;margin-top:6px">Phone: <span class="f2 cf">+1 415 ··· 2210</span></div></div>`, 1040, 470);
tl.fromTo(pr, {x: 120, opacity: 0}, {x: 0, opacity: 1, duration: .6, ease: 'expo.out'}, t2 + .15);
const phN = tile(1640, 760, 'device', 'Same device', '', 96);
pop(phN, t2 + .5); const pl = edge(vs, 1400, 640, 1640, 760, BLUE, 4).draw(t2 + .5, .5, 'power2.inOut');
const swap = (el, txt, t) => { tl.to(el, {opacity: 0, y: -8, duration: .2}, t).call(() => { el.textContent = txt; }, null, t + .2).fromTo(el, {y: 8}, {opacity: 1, y: 0, color: ORANGE, duration: .3}, t + .2); tl.call(() => { el.textContent = el === pr.querySelector('.f1') ? 'Daniel Reyes' : '+1 415 ··· 2210'; }, null, t + .19); };
swap(pr.querySelector('.f1'), 'D. Reyes-Ortiz', at('change') - .1); swap(pr.querySelector('.f2'), '+1 628 ··· 9034', at('details'));
cue(at('change') - .1, 'tick2', .4); cue(at('details'), 'tick2', .4);
tl.fromTo(pl.ls, {attr: {stroke: BLUE}}, {attr: {stroke: ORANGE}, duration: .3, yoyo: true, repeat: 1}, at('details') + .4);
tl.fromTo(phN.in.firstElementChild, {boxShadow: '0 0 0 rgba(236,100,8,0)'}, {boxShadow: '0 0 50px rgba(236,100,8,.9)', duration: .3, yoyo: true, repeat: 1}, at('details') + .4);
// 3. shared addresses: two records meet at one address node
const t3 = at('households') - .2; tick(2, t3);
tl.to(pr, {x: -60, y: -200, scale: .8, duration: .8, ease: 'power3.inOut'}, t3); tl.to(phN, {x: 40, y: -350, scale: .8, duration: .8, ease: 'power3.inOut'}, t3);
tl.to(pl.g, {opacity: 0, duration: .3}, t3);
const rc = (n, x, y) => W_(`<div class="glass" style="position:relative;width:300px;padding:20px 24px;font-size:26px;font-weight:700">${icon('id', 30, NAVY)} ${n}</div>`, x, y);
const r1 = rc('Reyes Household', 980, 790), r2 = rc('Novak Trading Ltd', 1500, 790);
slideIn(r1, t3 + .2, -1, .6, 300); slideIn(r2, t3 + .35, 1, .6, 300);
const ad = tile(1390, 650, 'home', 'Shared address', 'o', 100);
pop(ad, at('addresses') - .2);
const e1 = edge(vs, 1130, 790, 1360, 690, ORANGE, 4).draw(at('addresses'), .5, 'power2.inOut'), e2 = edge(vs, 1650, 790, 1420, 690, ORANGE, 4).draw(at('addresses') + .15, .5, 'power2.inOut');
cue(at('addresses'), 'chime1', .4);
// 4. merges must be explained: everything links into one network, one line at a time
const t4 = at('explain') - .3; tick(3, t4);
const net = [[1400, 350, 1650, 410], [1700, 380, 1715, 330], [1220, 430, 1360, 620], [1660, 440, 1420, 620], [1130, 790, 1180, 440]];
net.forEach(([x1, y1, x2, y2], i) => edge(vs, x1, y1, x2, y2, BLUE, 3, '', true).draw(t4 + .3 + i * .22, .5, 'power2.inOut'));
for (let i = 0; i < 5; i++) cue(t4 + .3 + i * .22, 'tick', .2);
tl.fromTo([shield, pr, phN, ad, r1, r2], {filter: 'brightness(1)'}, {filter: 'brightness(1.08)', duration: .4, stagger: .08}, t4 + 1.4);
closeMove('dive');
finish();
