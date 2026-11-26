// Scene 9 (dark): activity fragments bob separately; on "never get connected" they are pulled into one profile
// and the structured-deposit pattern draws itself.
const T = window.TOTAL;
world('dark', {particles: 44});
openMove('push');
const F = [[150, 210, -6, 'ACCT ··· 5531', '$900 in'], [180, 560, 5, 'ACCT ··· 2290', '$880 in'], [500, 380, -3, 'ACCT ··· 5531', '$1,700 out'], [420, 760, 4, 'ACCT ··· 7740', '$950 in']];
const frs = F.map(([x, y, r, a, t], i) => {
  const f = glass(x, y, 250, `<div style="font-size:18px;letter-spacing:2px;font-weight:600;opacity:.7">${a}</div><div style="font-size:28px;font-weight:600;margin-top:6px">${t}</div>`, `padding:18px 22px;transform:rotate(${r}deg)`);
  flyIn(f, i * .15, {x: -300 - R() * 200, rotation: (R() - .5) * 40}, .6);
  tl.to(f.in, {y: -18 + (i % 2) * 30, x: 10 - (i % 3) * 8, rotation: (i % 2 ? 3 : -3), duration: .9 + i * .15, yoyo: true, repeat: 5, ease: 'sine.inOut'}, .8);
  return f;
});
const prof = glass(1060, 220, 700, `<div style="font-size:18px;letter-spacing:3px;font-weight:600;color:#bfe6ff">ONE PROFILE · NOVAK</div>
  <svg style="position:static;margin-top:20px" width="620" height="260"><polyline class="pl" points="0,200 90,180 180,190 270,90 360,170 450,60 540,150 620,40" fill="none" stroke="${ORANGE}" stroke-width="7" stroke-linejoin="round" stroke-dasharray="1400" stroke-dashoffset="1400"/>
  <polyline class="pl" points="0,200 90,180 180,190 270,90 360,170 450,60 540,150 620,40" fill="none" stroke="${ORANGE}" stroke-width="22" opacity=".2" stroke-dasharray="1400" stroke-dashoffset="1400"/></svg>
  <div class="pt"><span class="pill o" style="position:static;display:inline-block;margin-top:14px">Pattern: structured deposits</span></div>`, 'padding:36px 40px');
flyIn(prof, .6, {x: 600, rotationY: -40}, .7);
float(prof, 1.3, T, 5, 3.4);
const svg = svgLayer($('#cam'));
const tP = at('never');
const ends = [[1060, 400], [1060, 450], [1060, 420], [1060, 500]];
F.forEach(([x, y], i) => edge(svg, x + 250, y + 40, ends[i][0], ends[i][1], '#bfe6ff', 3, '4 12', false).draw(tP - .6 + i * .08, .5));
frs.forEach((f, i) => {
  const t = tP + .2 + i * .22;
  tl.to(f, {x: 1060 - F[i][0] + 60 + i * 30, y: 340 - F[i][1] + i * 40, scale: .3, opacity: 0, rotation: 0, duration: .55, ease: 'expo.in'}, t);
  cue(t + .55, 'chime1', .35, .3);
  tl.fromTo(prof.in, {scale: 1}, {scale: 1.03, duration: .1, yoyo: true, repeat: 1}, t + .55);
});
tl.to(svg, {opacity: 0, duration: .4}, tP + 1.4);
const tD = tP + 1.2;
tl.to(prof.querySelectorAll('.pl'), {attr: {'stroke-dashoffset': 0}, duration: 1.1, ease: 'power2.inOut'}, tD);
cue(tD, 'riser', .4);
tl.fromTo(prof.querySelector('.pt'), {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: .4, ease: 'expo.out'}, tD + 1.0);
tl.fromTo(prof.querySelector('.pill'), {boxShadow: '0 0 0 rgba(236,100,8,0)'}, {boxShadow: '0 0 50px rgba(236,100,8,.9)', duration: .3, yoyo: true, repeat: 3}, tD + 1.2);
cue(tD + 1.0, 'pop', .7);
const sup = words('Missed match =|<em>hidden activity</em>', 150, 930, {size: 64, w: 1600, align: 'left'});
wordsIn(sup, tD + .4, .3);
closeMove('whipL');
finish();
