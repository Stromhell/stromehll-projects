// Scene 12 (light). Part 1: one record copies itself into duplicates, they line up, slide together and merge into one clean
// master record, then "Clean, low-stakes data". Part 2: the "Add graph when" checklist sits left; each item rises with a drawn
// check while a matching visual builds on the right (shield, a record whose details change, two records sharing an address),
// and on "merges must be explained" everything links into one network that stays visible before the cut.
const T = window.TOTAL, B2 = window.BEATS[1];
world('light', {particles: 26});
gsap.set('#cam', {scale: .92, transformOrigin: '900px 540px'});
// slow push-in through part 1 (no frozen camera), easing back out as the card becomes the checklist
gsap.set('#world', {transformOrigin: '960px 500px'});
tl.fromTo('#world', {scale: 1}, {scale: 1.12, duration: B2 - .6, ease: 'sine.inOut'}, 0);
tl.to('#world', {scale: 1, duration: 1.2, ease: 'power2.inOut'}, B2 - .5);
// v5 opening: still on the blue ground, the line from the last scene's graph races in from the left and plugs into the Anna Lee card;
// the moment it touches, the light ground opens outward from the card.
const bv = node(`<div class="veil bg-blue" style="--cx:960px;--cy:500px;z-index:auto"></div>`, document.body); document.body.insertBefore(bv, $('#world'));
tl.set(bv, {"--r": -280}, 0); tl.fromTo(bv, {"--r": -280}, {'--r': 1600, duration: 1.1, ease: 'power2.inOut', immediateRender: false}, 1.0); tl.set(bv, {display: 'none'}, 2.15);
const inL = svgLayer($('#cam')); gsap.set(inL, {zIndex: 3});
const il = svgPath(inL, 'M-200,520 C200,520 420,505 700,505', '#fff', 5, .95); il.style.filter = 'drop-shadow(0 0 12px #bfe6ff)';
gsap.set(il, {opacity: 0});

cue(.5, 'chime', .4);
const recHtml = (n, e, a, w = 520) => `<div class="glass" style="position:relative;width:${w}px;padding:26px 32px"><div style="display:flex;gap:18px;align-items:center"><div class="tile w" style="position:relative;width:70px;height:70px;border-radius:20px;flex:none">${icon('mail', 34, NAVY)}</div><div><div class="rn" style="font-size:32px;font-weight:700">${n}</div><div style="font-size:22px;opacity:.7;margin-top:4px">${e}</div><div style="font-size:22px;opacity:.7">${a}</div></div></div></div>`;
// part 1: one record, then copies
const master = W_(recHtml('Anna Lee', 'anna.lee@mail.com', '12 Elm Street'), 700, 430, {z: 5});
tl.fromTo(master, {opacity: 0}, {opacity: 1, duration: .3}, .9);
const nd = chip('border-radius:22px;background:#fff;box-shadow:0 0 30px #bfe6ff, 0 0 60px rgba(255,255,255,.6)');
morph(nd, pose(960, 505, 44, 44), master, .6, .5, 'power3.inOut'); tl.to(nd, {borderRadius: '30px', duration: .4}, .65); tl.to(nd, {opacity: 0, duration: .25}, 1.15);
tl.fromTo(master.in.firstElementChild, {boxShadow: '0 0 0 rgba(67,164,220,0)'}, {boxShadow: '0 0 80px rgba(190,230,255,.9)', duration: .3, yoyo: true, repeat: 1}, .55);
cue(.2, 'whoosh_s', .4);
const offs = [[-360, -170, -4], [380, -120, 3], [-300, 200, 3]];
const dups = offs.map(([dx, dy, r], i) => {
  const d = W_(recHtml('Anna Lee', 'anna.lee@mail.com', '12 Elm Street'), 700, 430, {z: 4 - i});
  tl.fromTo(d, {x: 0, y: 0, rotation: 0, opacity: 0}, {x: dx, y: dy, rotation: r, opacity: .92, duration: 1.15, ease: 'power2.inOut'}, at('fine') - .5 + i * .3);
  cue(at('fine') - .35 + i * .3, 'whoosh_s', .3, dx / 900);
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
dups.forEach((d, i) => { tl.to(d, {x: 0, y: (i + 1) * 22, rotation: 0, duration: .8, ease: 'power2.inOut'}, tD + i * .1); tl.to(d, {y: 0, opacity: 0, scale: .96, duration: .55, ease: 'power2.inOut'}, tD + .8 + i * .1); });
tl.to(dupTag, {opacity: 0, y: -10, duration: .3}, tD + .4);
tl.fromTo(master.in.firstElementChild, {boxShadow: '0 34px 80px rgba(10,38,71,.22)'}, {boxShadow: '0 0 70px rgba(67,164,220,.8)', duration: .3, yoyo: true, repeat: 1}, tD + 1.25);
cue(tD + 1.25, 'chime', .45);
const mt = W_(`<div class="tag" style="position:relative;background:${GREEN};color:#fff;font-size:20px;display:flex;gap:8px;align-items:center">${checkSvg(20)} 1 clean record</div>`, 1060, 395, {z: 6});
rise(mt, tD + 1.35, .45); drawCheck(mt, tD + 1.5, .35);
const cap = words('e.g. de-duplicating a mailing list', 0, 700, {size: 32}); gsap.set(cap, {color: NAVY, opacity: .75}); rise(cap, at('mailing') - .2, .5);
// part 2: checklist left, visuals right
const tO = B2 - .4;
tl.to([mt, cap, h1, h2], {opacity: 0, y: -40, filter: 'blur(8px)', duration: .45, ease: 'power2.in', stagger: .03}, tO);
cue(tO, 'whoosh', .45);
const items = ['KYC or AML decisions', 'Details deliberately changed', 'Shared addresses (households, companies)', 'Merges must be explained'];
const C = glass(110, 230, 760, `<div class="hd" style="font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:600;color:${BLUE}">Add graph when</div>
  ${items.map(t => `<div class="it" style="display:flex;align-items:center;gap:22px;margin-top:26px;font-size:34px;font-weight:600;border-radius:16px;padding:8px 10px;margin-left:-10px"><div class="tile" style="position:relative;width:64px;height:64px;border-radius:18px;flex:none;opacity:.35">${checkSvg(34)}</div><span class="tx">${t}</span></div>`).join('')}`, 'padding:40px 46px');
// v5: the Anna Lee card itself becomes the checklist card: its text fades, the glass slides left and resizes into C, then C's content rises in it
const mg = master.in.firstElementChild, mIn = mg.firstElementChild, cg = C.in.firstElementChild, cH = cg.offsetHeight;
gsap.set(master, {transformOrigin: '0 0'});
tl.to(mIn, {opacity: 0, filter: 'blur(4px)', duration: .35, ease: 'power2.in'}, tO);
tl.to(master, {x: 110 - 700, y: 230 - 430, duration: .85, ease: 'power3.inOut'}, tO + .15);
tl.fromTo(mg, {width: 520, height: mg.offsetHeight}, {width: 760, height: cH, duration: .85, ease: 'power3.inOut', immediateRender: false}, tO + .15);
cue(tO + .15, 'whoosh_s', .4);
tl.fromTo(C, {opacity: 0}, {opacity: 1, duration: .01}, tO + 1);
tl.set(master, {opacity: 0}, tO + 1.02);
gsap.set(cg.querySelector('.hd'), {opacity: 0}); tl.fromTo(cg.querySelector('.hd'), {opacity: 0, y: 12}, {opacity: 1, y: 0, duration: .4, ease: EZO}, tO + 1);
// on "graph": huge faint lines sweep slowly behind everything, so the ground itself feels like a live graph
const bgL = svgLayer($('#cam')); gsap.set(bgL, {zIndex: 0});
const tGr = at('graph', 1, B2 + .4);
[0, 1, 2, 3, 4, 5].forEach(i => {
  const y = 120 + i * 170, p = svgPath(bgL, `M-400,${y} C300,${y - 260} 900,${y + 300} 1500,${y - 120} S2300,${y + 160} 2500,${y}`, BLUE, 2 + (i % 2) * 2, .13 + (i % 3) * .04);
  trim(p, tGr + i * .12, 1.4, 'power2.out');
  tl.fromTo(p, {x: 0, y: 0}, {x: (i % 2 ? -260 : 260), y: (i % 2 ? 40 : -40), duration: T - tGr + (window.TAIL || 0), ease: 'sine.inOut'}, tGr);
  const dot = svgDot(bgL, 0, 0, 6, BLUE, 0); const ob = {u: 0}, L = p.getTotalLength();
  tl.fromTo(ob, {u: 0}, {u: 1, duration: 4 + i, ease: 'none', repeat: 3, immediateRender: false, onUpdate: () => { const q = p.getPointAtLength(ob.u * L); dot.setAttribute('cx', q.x); dot.setAttribute('cy', q.y); }}, tGr + .6);
  tl.to(dot, {opacity: .35, duration: .4}, tGr + .6);
});
const rows = [...C.querySelectorAll('.it')];
gsap.set(rows, {opacity: 0});
const tick = (i, t) => {
  const r = rows[i];
  tl.fromTo(r, {opacity: .3}, {opacity: 1, duration: .45, ease: EZO, immediateRender: false}, t);
  tl.to(r.querySelector('.tile'), {opacity: 1, duration: .3}, t + .2); drawCheck(r, t + .3, .4);
  tl.fromTo(r, {backgroundColor: 'rgba(67,164,220,0)'}, {backgroundColor: 'rgba(67,164,220,.12)', duration: .35}, t + .1);
  if (i) tl.to(rows[i - 1], {backgroundColor: 'rgba(67,164,220,0)', duration: .35}, t + .1);
};
// v7: the card is never blank: all four rows land faint as soon as the card forms, each one lights up when it is spoken
rows.forEach((r, i) => tl.fromTo(r, {y: 16, opacity: 0}, {y: 0, opacity: .3, duration: .5, ease: EZO, immediateRender: false}, tO + 1.05 + i * .1));
float(C, B2 + 1, T, 3, 6);
const vs = svgLayer($('#cam'));
const lv = node('<svg width="1920" height="1080" style="position:absolute;left:0;top:0;z-index:30;pointer-events:none;overflow:visible"></svg>', document.body);
// 1. KYC / AML: a shield
const t1 = at('kyc') - .2; tick(0, t1);
const shield = W_(`<div style="position:relative;width:170px;height:170px;border-radius:44px;background:linear-gradient(150deg,#7fcaf2,${BLUE});display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px rgba(10,38,71,.25)"><svg style="position:static" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path class="ck" d="M8.5 12.5l2.5 2.5 4.5-5" stroke-dasharray="24" stroke-dashoffset="24"/></svg></div>`, 1300, 410);
tl.fromTo(shield, {scale: .6, opacity: 0, y: 30}, {scale: 1, opacity: 1, y: 0, duration: .6, ease: EZO}, t1 + .2);
drawCheck(shield, t1 + .7, .45);
const kl = W_(`<div class="kick" style="position:relative;width:400px;text-align:center">KYC · AML</div>`, 1185, 600); rise(kl, t1 + .5, .45);
// 2. details deliberately changed: a record whose name and phone are rewritten; its graph link holds
const t2 = at('people') - .2; tick(1, t2);
tl.to(shield, {x: 330, y: -190, scale: .55, duration: .8, ease: 'power3.inOut'}, t2); tl.to(kl, {opacity: 0, duration: .3}, t2);
const pr = W_(`<div class="glass" style="position:relative;width:460px;padding:26px 30px"><div style="font-size:18px;letter-spacing:3px;font-weight:600;color:${BLUE}">PROFILE</div>
  <div style="font-size:30px;font-weight:700;margin-top:8px">Name: <span class="f1 cf">Daniel Reyes</span></div><div style="font-size:26px;margin-top:6px">Phone: <span class="f2 cf">+1 415 ··· 2210</span></div></div>`, 1040, 470);
tl.fromTo(pr, {x: 120, opacity: 0}, {x: 0, opacity: 1, duration: .6, ease: EZO}, t2 + .15);
const phN = tile(1640, 760, 'device', 'Same device', '', 96);
pop(phN, t2 + .5); const pl = liveLink(lv, pr, phN, BLUE, 4, t2 + .5, .5); pl.g = pl.ls;
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
liveLink(lv, r1, ad, ORANGE, 4, at('addresses'), .5); liveLink(lv, r2, ad, ORANGE, 4, at('addresses') + .15, .5);
cue(at('addresses'), 'chime1', .4);
// 4. merges must be explained: everything links into one network, one line at a time
const t4 = at('explain') - .3; tick(3, t4);
[[pr, phN], [phN, shield], [pr, ad], [phN, ad], [r1, pr]].forEach(([a, b], i) => liveLink(lv, a, b, BLUE, 3, t4 + .3 + i * .22, .5));
for (let i = 0; i < 5; i++) cue(t4 + .3 + i * .22, 'tick', .2);
tl.fromTo([shield, pr, phN, ad, r1, r2], {filter: 'brightness(1)'}, {filter: 'brightness(1.08)', duration: .4, stagger: .08}, t4 + 1.4);
tl.to(lv, {opacity: 0, duration: .3}, T - .2);
// v6 carry out: the camera travels into the orange shared-address node; it opens into the dashboard window of the next scene
const tX = T - .75;
const dn = chip(`border-radius:28px;background:linear-gradient(150deg,#ff9c55,${ORANGE})`, '<div class="cg" style="position:absolute;inset:0;background:#0d2c4d;opacity:0"><img src="../../../storyboard/build/demo/dashboard.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:top"></div>');
dn.style.boxShadow = '0 0 0 1.5px rgba(191,230,255,.55), 0 0 60px rgba(67,164,220,.45)';
morph(dn, ad, pose(960, 560, 1164, 815), tX, .75, 'power2.inOut');
tl.fromTo(dn, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX);
tl.to(ad, {opacity: 0, duration: .15}, tX + .04);
tl.to(dn.querySelector('.cg'), {opacity: 1, duration: .3}, tX + .08); tl.to(dn, {borderRadius: '22px', duration: .5}, tX + .2);
closeMove('portal', .32, 1390, 650);
finish();
