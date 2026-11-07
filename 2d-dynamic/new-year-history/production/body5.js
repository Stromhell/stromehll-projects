const CROWD5 = [NY.PARTY, NY.PARTY2, NY.PARTY3, NY.PARTYKID, NY.PARTY4, NY.PARTY5];
const bubble = (c, x, y, txt, q, dir = 1) => { if (q <= 0) return; c.save(); c.translate(x, y); c.scale(E.out(q), E.out(q)); c.fillStyle = '#ffffff'; c.strokeStyle = '#2a2020'; c.lineWidth = 3; c.beginPath(); c.roundRect(-80, -30, 160, 56, 16); c.fill(); c.stroke(); c.beginPath(); c.moveTo(-14 * dir, 26); c.lineTo(-30 * dir, 50); c.lineTo(6 * dir, 26); c.fill(); c.fillStyle = '#2a2020'; c.font = '26px Anton'; c.textAlign = 'center'; c.fillText(txt, 0, 8); c.restore(); };
window.SHOTS = [
  // 5.01 MED: team photo: Caesar, Pope Gregory and a British clerk line up; Janus peeks in behind; camera flash
  { set: 'ny_janus', cam: { z: [1.55, 1.62], x: [640, 640], y: [470, 470], ease: E.io }, bed: [['crowd_loop', .08]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'caesar', 3); Sh.tG = at(Sh, 'gregory', 4.5); Sh.tO = at(Sh, 'others', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), pk = seg(lt, Sh.tO - .6, Sh.tO);
      S.nyJanus(c, 640, 512, .9, { mL: pk, mR: pk, blinkL: lt % 3 < .15, blinkR: (lt + 1.3) % 3 < .15 });
      const E3 = [[NY.CAESAR, 450, Sh.tC, 1], [NY.GREGORY, 830, Sh.tG, -1], [NY.CLERKGB, 1000, Sh.tO - .8, -1]];
      E3.forEach(([ch, x, t0, f], k) => { const q = seg(lt, t0 - 1.6, t0), xx = lerp(f > 0 ? 160 : 1120, x, E.out(q)); fig(c, ch, xx, 672, 40, q > 0 && q < 1 ? walk(lt, k, { face: f }) : pose(lt, k, { face: f, shN: lt > Sh.tO ? 150 : 20, elN: 20 }), lt, k, L, { smile: lt > Sh.tO ? 1 : .5, look: [f * .4, 0] }); });
      if (lt > Sh.tO + .3 && lt < Sh.tO + .5) { c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(0, 0, 1280, 720); } },
    over: [(c, lt, u, Sh) => K.card(c, 'THE NEW YEAR TEAM', lt, { at: Sh.tO + .4, x: 960, y: 160, px: 64 })],
    sfx: [[.1, 'crowd_loop', .08], ['caesar', 'footsteps', .3], ['gregory', 'footsteps', .3], ['others', 'camera_shutter', .6]] },

  // 5.02 WIDE: Times Square tonight: lights, hats, fireworks over the skyline, the glowing ball on its pole
  { set: 'ny_times', cam: { z: [1.0, 1.08], x: [640, 640], y: [370, 360], ease: E.io }, bed: [['crowd_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'fireworks', 1.5); Sh.tM = at(Sh, 'midnight', 3.5); Sh.tB = at(Sh, 'ball', 6); Sh.tT = at(Sh, 'times', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = PARTYL(lt);
      [[300, 140, '#ff5080'], [980, 120, '#60c0ff'], [640, 90, '#ffd040'], [460, 170, '#80ff90'], [840, 160, '#c080ff']].forEach(([x, y, col], k) => nyRocket(c, lt, Sh.tF + k * .7, x, y, col, 20 + k));
      nyBall(c, 0, lt, 1 + .3 * Math.sin(lt * 4) * seg(lt, Sh.tB - .3, Sh.tB));
      nyCrowd(c, lt, L, CROWD5, 716, 44, .25 + .2 * Math.sin(lt), 120, 208); },
    over: [(c, lt, u, Sh) => K.card(c, 'FIREWORKS', lt, { at: Sh.tF, x: 420, y: 300, px: 50, rot: -3 }), (c, lt, u, Sh) => K.card(c, 'STAY UP TILL MIDNIGHT', lt, { at: Sh.tM, x: 1500, y: 340, px: 44, rot: 3 }), (c, lt, u, Sh) => K.dateTag(c, 'TIMES SQUARE · NEW YORK', lt, { at: Sh.tT })],
    sfx: [[.1, 'crowd_loop', .3], ['fireworks', 'firework', .45], ['midnight', 'clock_loop', .2], ['ball', 'chime', .4], ['times', 'firework', .4]] },

  // 5.03 MED: a painted timeline scroll unrolls: Akitu procession, Janus shrine, Times Square ball
  { set: 'np_parch', cam: { z: [1.0, 1.05], x: [640, 640], y: [360, 360], ease: E.io }, bed: [['hum_loop', .08]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tA = at(Sh, 'akitu', 1.5); Sh.tJ = at(Sh, 'janus', 3.5); Sh.tC = at(Sh, 'counting', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { ROOM(lt); const un = E.io(seg(lt, .2, Sh.tC + .5)), xr = lerp(200, 1100, un);
      c.save(); c.beginPath(); c.rect(180, 180, xr - 180, 360); c.clip(); c.fillStyle = '#f0e2c0'; c.fillRect(180, 200, 920, 320); c.strokeStyle = '#8a6a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(180, 360); c.lineTo(1100, 360); c.stroke();
      // vignette 1: ziggurat + procession dots
      c.fillStyle = '#c8945a'; [[300, 330, 120], [300, 300, 90], [300, 274, 60]].forEach(([x, y, w]) => c.fillRect(x - w / 2, y, w, 28)); c.fillStyle = '#2a4a8a'; c.fillRect(285, 252, 30, 22);
      // vignette 2: Janus
      S.nyJanus(c, 640, 350, .55, { mL: .3, mR: .8 });
      // vignette 3: the ball tower
      c.fillStyle = '#2c2a44'; c.fillRect(950, 250, 70, 100); c.strokeStyle = '#8a8aa0'; c.lineWidth = 3; c.beginPath(); c.moveTo(985, 250); c.lineTo(985, 210); c.stroke(); S.glow(c, 985, 214, 30, '#a0d0ff', .6); c.fillStyle = '#a8d8ff'; c.beginPath(); c.arc(985, 214, 9, 0, TAU); c.fill();
      c.fillStyle = '#5a3a1a'; c.font = '26px Anton'; c.textAlign = 'center'; c.fillText('c. 2000 BCE', 300, 420); c.fillText('ROME', 640, 420); c.fillText('TODAY', 985, 420); c.restore();
      // rolled ends
      [180, xr].forEach(x => { c.fillStyle = '#c8a878'; c.fillRect(x - 14, 180, 28, 360); c.fillStyle = '#8a6a3a'; c.fillRect(x - 18, 170, 36, 14); c.fillRect(x - 18, 536, 36, 14); }); },
    over: [(c, lt, u, Sh) => K.card(c, '4,000 YEARS OF PARTIES', lt, { at: Sh.tC, x: 960, y: 900, px: 56 })],
    sfx: [[.1, 'hum_loop', .08], [.2, 'paper', .5], ['akitu', 'ding', .4], ['janus', 'ding', .4], ['counting', 'ding', .45]] },

  // 5.04 MED: Janus close-up: the back-looking face says goodbye, the forward face grins and blows a party horn
  { set: 'ny_janus', cam: { z: [1.9, 2.0], x: [640, 640], y: [400, 400], ease: E.io }, bed: [['wind_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tG = at(Sh, 'goodbye', 3.5); Sh.tH = at(Sh, 'hello', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { SUN(lt); const g = seg(lt, Sh.tG - .2, Sh.tG + .2), h = seg(lt, Sh.tH - .2, Sh.tH + .2);
      S.nyJanus(c, 640, 512, .95, { mL: g * .6, mR: h, blinkL: g > 0 && lt % 1.6 < .3, blinkR: (lt + 1.3) % 3 < .15 });
      bubble(c, 520, 280, 'BYE, 2026!', g, 1); bubble(c, 760, 280, 'HELLO, 2027!', h, -1);
      if (h > 0) { const ex = .7 + .3 * Math.sin(lt * 10); c.save(); c.translate(640 + 38 * .95, 512 - 134 * .95); c.fillStyle = '#ffd040'; c.beginPath(); c.moveTo(0, 0); c.lineTo(40 * h, -6); c.lineTo(40 * h, 6); c.fill(); c.strokeStyle = '#e8303a'; c.lineWidth = 4; c.beginPath(); c.moveTo(40 * h, 0); c.lineTo(40 * h + 50 * ex * h, Math.sin(lt * 10) * 4); c.stroke(); c.restore(); nyConfetti(c, lt, h, 40, 17, Sh.tH); } },
    over: [],
    sfx: [[.1, 'wind_loop', .1], ['goodbye', 'whoosh_soft', .3], ['hello', 'party_horn', .6]] },

  // 5.05 WIDE: back in Times Square: ten to one, the ball lands, fireworks, confetti, HAPPY NEW YEAR
  { set: 'ny_times', cam: (lt, u, Sh) => ({ z: [lt < Sh.n[9] ? lerp(1.0, 1.15, E.io(seg(lt, 0, Sh.n[9]))) : lerp(1.15, 1.0, E.out(seg(lt, Sh.n[9], Sh.n[9] + 1)))], x: [640], y: [lt < Sh.n[9] ? 330 : lerp(330, 360, seg(lt, Sh.n[9], Sh.n[9] + 1))], shake: lt > Sh.tH && lt < Sh.tH + .4 ? 5 : 0 }), bed: [['crowd_loop', .35]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; const W = ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']; let prev = .6; Sh.n = W.map((w, i) => { const t = at(Sh, w, prev + .8); prev = t; return t; }); Sh.tH = at(Sh, 'happy', Sh.n[9] + .8); },
    draw: (c, lt, u, Sh) => { const L = PARTYL(lt), ch = seg(lt, Sh.tH - .1, Sh.tH + .3);
      nyBall(c, seg(lt, Sh.n[0] - .3, Sh.n[9] + .3), lt, 1 + ch);
      if (ch > 0) { const C = ['#ff5080', '#60c0ff', '#ffd040', '#80ff90', '#c080ff', '#ffffff']; for (let k = 0; k < 14; k++) { const t0 = Sh.tH + (k % 7) * .55 + Math.floor(k / 7) * 2.2; nyRocket(c, lt, t0, 160 + (k * 173) % 960, 80 + (k * 61) % 160, C[k % 6], 40 + k); } }
      nyCrowd(c, lt, L, CROWD5, 716, 44, Math.max(.25 * seg(lt, Sh.n[5], Sh.n[9]), ch), 120, 208);
      nyConfetti(c, lt, ch, 120, 23, Sh.tH); },
    over: [(c, lt, u, Sh) => { ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'].forEach((t, i) => nyNum(c, t, lt, Sh.n[i], { hold: Math.min(.8, (Sh.n[i + 1] ?? Sh.tH) - Sh.n[i]), px: 420, y: 560 })); },
      (c, lt, u, Sh) => { const q = seg(lt, Sh.tH, Sh.tH + .35); if (q <= 0) return; const s = lerp(1.8, 1, E.out(q)) * (1 + .03 * Math.sin(lt * 6));
        c.save(); c.translate(960, 470); c.scale(s, s); c.globalAlpha = q; c.font = '190px Anton'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineWidth = 20; c.strokeStyle = '#1a1030'; c.shadowColor = 'rgba(255,200,80,.8)'; c.shadowBlur = 40;
        c.strokeText('HAPPY', 0, -110); c.strokeText('NEW YEAR!', 0, 90); c.shadowBlur = 0; const g = c.createLinearGradient(0, -200, 0, 200); g.addColorStop(0, '#fff2a0'); g.addColorStop(.5, '#ffc030'); g.addColorStop(1, '#e88a10'); c.fillStyle = g; c.fillText('HAPPY', 0, -110); c.fillText('NEW YEAR!', 0, 90); c.restore(); }],
    sfx: [[.1, 'crowd_loop', .35], ['ten', 'beep', .5], ['nine', 'beep', .5], ['eight', 'beep', .5], ['seven', 'beep', .5], ['six', 'beep', .5], ['five', 'beep', .5], ['four', 'beep', .5], ['three', 'beep', .5], ['two', 'beep', .5], ['one', 'beep_long', .55], ['happy', 'crowd_cheer', .6], ['happy', 'firework', .55], ['happy', 'party_horn', .5]] },
];
// hold the last shot 4 s after the VO for the fireworks and the cheer
{ const T = window.TIMING, L = T.shots[T.shots.length - 1]; L.end += 4; T.dur = L.end; }
VP.build(); K.boot();
</script></body></html>
