// Scene 10 (light): the 92% card sits centre; a magnifier enters from the right and scans it, each stop revealing what the
// score is made of (text similarity only). The score fades back; "A score" then "isn't a reason" come forward.
// Then three evidence cards arrive around the score, linked to it by thin lines; the real graph interface grows from a thumbnail,
// zooms into the matching nodes, and the "kept in the graph" panel lands line by line.
const T = window.TOTAL, B2 = window.BEATS[1];
world('light', {particles: 28});
// v5: a living neural network around the scene (grows in stages, drifts slower than the cards = depth)
const nn = neuralNet($('#cam'), [{t: .1, n: 16}, {t: 3, n: 32}, {t: 7, n: 48}, {t: 11, n: 60}], {op: .32, col: BLUE, gap: .05, box: [20, 20, 1880, 1040]});
tl.fromTo(nn, {x: -50, y: 10, scale: 1.04, transformOrigin: '960px 540px'}, {x: 50, y: -10, scale: 1, duration: T + .6, ease: 'sine.inOut'}, 0);
const sc = glass(730, 260, 460, `<div style="height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div style="font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:600;opacity:.6">Match score</div>
  <div class="sv" style="font-size:150px;font-weight:700;color:${BLUE}">92%</div><div class="bc" style="font-size:28px;opacity:.7">…because?</div></div>`);
{ const ch = chipOf(sc, 'border-radius:30px');
  morph(ch, pose(960, 490, 460, 470), sc, .6, .4, 'power2.out'); tl.fromTo(sc, {opacity: 0}, {opacity: 1, duration: .3}, .8); tl.to(ch, {opacity: 0, duration: .25}, 1.0); }
float(sc, .9, T, 3, 6);
// magnifier: from the right, scans three spots; each spot reveals a factor chip
const mag = W_(`<div style="position:relative;width:190px;height:190px;border-radius:50%;border:10px solid ${NAVY};background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.7),rgba(191,226,246,.35));box-shadow:0 20px 50px rgba(10,38,71,.3)"><div style="position:absolute;left:160px;top:160px;width:110px;height:24px;border-radius:12px;background:${NAVY};transform:rotate(45deg);transform-origin:0 50%"></div></div>`, 870, 380, {z: 6});
const tR = at('regulator');
tl.fromTo(mag, {x: 1100, y: 60, opacity: 0}, {x: 0, y: 0, opacity: 1, duration: .9, ease: 'power3.out'}, tR - .3);
cue(tR - .3, 'whoosh_s', .5, .6);
const stops = [[-150, -110, 'Name ≈ 0.94', 430, 250], [150, -40, 'Address ≈ 0.90', 1230, 330], [-60, 150, 'DOB · not checked', 470, 640]];
stops.forEach(([dx, dy, lab, cx, cy], i) => {
  const t = tR + .8 + i * .75;
  tl.to(mag, {x: dx, y: dy, duration: .6, ease: 'power2.inOut'}, t);
  const ch = W_(`<div class="tag" style="position:relative;background:#fff;color:${NAVY};font-size:22px;box-shadow:0 10px 30px rgba(10,38,71,.18)">${lab}</div>`, cx, cy, {z: 5});
  rise(ch, t + .45, .45, 16); cue(t + .45, 'tick2', .35, (cx - 960) / 1000);
  tl.to(ch, {opacity: 0, y: -10, duration: .35}, at('score') + .4 + i * .05);
});
tl.to(mag, {x: 700, y: 300, opacity: 0, duration: .5, ease: 'power3.in'}, at('score') - .35);
// the score steps back
const tS = at('score');
tl.to(sc.querySelector('.sv'), {color: '#a9bccb', duration: .6}, tS); tl.to(sc, {scale: .86, duration: .9, ease: 'power2.inOut'}, tS);
tl.to(sc.querySelector('.bc'), {color: ORANGE, opacity: 1, duration: .4}, tS + .3);
// "A score" first, pushed back; "isn't a reason" forward, "reason" orange
const s1 = words('A score', 0, 760, {size: 64}), s2 = words("isn't a <em>reason.</em>", 0, 840, {size: 84});
rise(s1, tS - .05, .5); tl.to(s1, {opacity: .45, scale: .85, y: -14, duration: .5, ease: 'power2.inOut'}, at('isn') + .2);
tl.fromTo(s2, {opacity: 0, scale: 1.25, filter: 'blur(10px)'}, {opacity: 1, scale: 1, filter: 'blur(0px)', duration: .55, ease: EZO}, at('isn') + .1);
cue(at('isn') + .1, 'thump', .5);
// part 2: evidence cards around the score, linked by thin lines
const tE = B2 - .2;
tl.to([s1, s2], {opacity: 0, y: 30, filter: 'blur(8px)', duration: .35, ease: 'power2.in'}, tE);
tl.to(sc.querySelector('.sv'), {color: BLUE, duration: .5}, tE + .3);
const ev = [['phone', 'Verified phone number', 'matches on both records', 210, 240, at('evidence')], ['device', 'Same device fingerprint', 'seen on both accounts', 1270, 300, at('identifiers')], ['director', 'Shared relationships', 'same director · 2 hops', 260, 660, at('relationships')]];
const ls = svgLayer($('#cam'));
const evc = ev.map(([ic, h, sub, x, y, t]) => {
  const c = glass(x, y, 450, `<div style="display:flex;gap:18px;align-items:center"><div class="tile ${ic === 'director' ? 'o' : ''}" style="position:relative;width:70px;height:70px;border-radius:20px;flex:none">${icon(ic, 34)}</div><div><div style="font-size:24px;font-weight:700;white-space:nowrap">${h}</div><div style="font-size:20px;opacity:.65;margin-top:4px">${sub}</div></div></div>`, 'padding:22px 26px');
  slideIn(c, t - .35, x < 900 ? -1 : 1, .6, 360);
  const ex = x < 900 ? x + 450 : x, ey = y + 57;
  trim(svgPath(ls, `M${ex},${ey} L${x < 900 ? 760 : 1160},${460}`, BLUE, 2.5, .9), t + .05, .5);
  cue(t + .2, 'chime1', .35, (x - 960) / 1000);
  return c;
});
// the real graph interface grows from a thumbnail and zooms into the matching nodes
const tG = at('confirmed') - .2;
tl.to([sc, ls, ...evc], {opacity: 0, scale: .9, filter: 'blur(10px)', duration: .45, ease: 'power2.in'}, tG);
const dm = demoWin(140, 150, 1080, 'party.png', 'TigerGraph · Party attributes');
tl.fromTo(dm, {scale: .22, x: 600, y: 360, opacity: 0}, {scale: 1, x: 0, y: 0, opacity: 1, duration: .8, ease: 'power3.inOut'}, tG + .1);
cue(tG + .1, 'whoosh', .5);
tl.to(dm, {scale: 1.1, x: 40, y: 20, duration: T - tG - .9, ease: 'sine.inOut'}, tG + .9);
const hl = node(`<div class="ring" style="left:520px;top:300px;width:300px;height:300px;border:5px solid ${ORANGE};opacity:0;box-shadow:0 0 30px rgba(236,100,8,.6)"></div>`, dm.in.firstElementChild);
tl.fromTo(hl, {scale: .5, opacity: 0}, {scale: 1, opacity: 1, duration: .45, ease: EZO}, tG + 1.0);
const kc = glass(1270, 330, 520, `<div style="font-size:22px;letter-spacing:3px;font-weight:600;color:${BLUE}">KEPT IN THE GRAPH</div><div style="font-size:34px;font-weight:600;margin-top:16px;line-height:1.45"><span class="kw">Every identifier.</span><br><span class="kw">Every relationship.</span><br><span class="kw">Every merge decision.</span></div>`, 'padding:34px 38px', {z: 5});
slideIn(kc, tG + .6, 1, .6, 400);
kc.querySelectorAll('.kw').forEach((k, i) => { rise(k, tG + .9 + i * .3, .4, 14); });
// v6 carry out: the three "kept in the graph" lines lift out and stretch into the three empty workflow slots
const tX = T - .75;
tl.to([dm, kc.in.firstElementChild], {opacity: .2, duration: .5}, tX + .1);
[...kc.querySelectorAll('.kw')].forEach((k, i) => {
  const P = [pose(960, 255, 1200, 170), pose(960, 505, 900, 170), pose(960, 755, 640, 170)][i];
  const ch = chip('border-radius:10px;background:rgba(67,164,220,.2);border:3px dashed rgba(67,164,220,1)');
  morph(ch, k, P, tX + i * .05, .7, 'power3.inOut', 30);
  tl.fromTo(ch, {opacity: 0}, {opacity: 1, duration: .06, immediateRender: true}, tX + i * .05); tl.to(k, {opacity: 0, duration: .1}, tX + i * .05 + .03);
  tl.to(ch, {borderRadius: '85px', background: 'rgba(67,164,220,.2)', borderColor: 'rgba(67,164,220,.9)', duration: .55}, tX + .15);
});
closeMove('rise');
finish();
