const CAT = (c, x, y, s, shock, lt) => { c.save(); c.translate(x, y); c.scale(s, s); const j = shock * 18; c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 2, 26, 5, 0, 0, TAU); c.fill(); c.translate(0, -j);
  c.fillStyle = '#e89a4a'; c.beginPath(); c.ellipse(0, -18, 24, 16 + shock * 4, 0, 0, TAU); c.fill(); c.beginPath(); c.arc(20, -40, 14, 0, TAU); c.fill(); [[12, -52], [28, -52]].forEach(([a, b]) => { c.beginPath(); c.moveTo(a - 5, b + 4); c.lineTo(a, b - 10 - shock * 4); c.lineTo(a + 5, b + 4); c.fill(); });
  c.strokeStyle = '#e89a4a'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-22, -18); c.quadraticCurveTo(-44, -30 - shock * 20, -36, -50 - shock * 10 + Math.sin(lt * 3) * 4); c.stroke();
  c.fillStyle = '#2a2020'; const er = 2.5 + shock * 2.5; c.beginPath(); c.arc(15, -42, er, 0, TAU); c.arc(26, -42, er, 0, TAU); c.fill(); if (shock > .3) { c.beginPath(); c.ellipse(21, -32, 3, 4 * shock, 0, 0, TAU); c.fill(); }
  c.restore(); };
const WINDOW = (c, day) => { const sky = c.createLinearGradient(0, 110, 0, 350); if (day) { sky.addColorStop(0, '#8ac0f0'); sky.addColorStop(1, '#ffe8c0'); } else { sky.addColorStop(0, '#0a1430'); sky.addColorStop(1, '#2a3a6a'); } c.fillStyle = sky; c.fillRect(145, 115, 190, 230);
  if (day) { S.glow(c, 290, 300, 60, '#fff0c0', .8); } else { c.fillStyle = '#f0f0d8'; c.beginPath(); c.arc(190, 160, 14, 0, TAU); c.fill(); c.fillStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 10; k++) c.fillRect(150 + (k * 37) % 180, 130 + (k * 53) % 200, 2, 2); }
  c.strokeStyle = '#e8e0d0'; c.lineWidth = 10; c.strokeRect(140, 110, 200, 240); c.fillStyle = '#e8e0d0'; c.fillRect(236, 110, 8, 240); c.fillRect(140, 226, 200, 8); };
window.SHOTS = [
  // 4.01 MED: Georgian London street; a gentleman checks his calendar: New Year on 25 March
  { set: 'ny_london', cam: { z: [1.45, 1.55], x: [640, 660], y: [470, 470], ease: E.io }, bed: [['city_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'hundred', 2.5); Sh.tM = at(Sh, 'march', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt), q = seg(lt, 0, Sh.dur * .6);
      fig(c, NY.LONW, lerp(1100, 860, q), 668, 36, q < 1 ? walk(lt, 2, { face: -1 }) : pose(lt, 2, { face: -1 }), lt, 2, L, { look: [-.7, 0] });
      fig(c, NY.GENT2, 380, 666, 36, pose(lt, 3, { face: 1, shN: 30, elN: 60 }), lt, 3, L, { look: [.7, 0] });
      const up = seg(lt, Sh.tM - 1, Sh.tM - .4);
      fig(c, NY.GENT, 530, 668, 38, pose(lt, 1, { face: 1, shN: lerp(20, 80, up), elN: lerp(20, 70, up), holdN: up > .05 ? (wr => nyCal(c, wr[0] + 20, wr[1] - 40, .45 * up + .01, '25', 'MARCH', { px: 56 })) : undefined }), lt, 1, L, { smile: .5, look: [.7, -.2] }); },
    over: [(c, lt) => K.dateTag(c, 'LONDON', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'BRITISH NEW YEAR: 25 MARCH', lt, { at: Sh.tM, x: 1300, y: 180, px: 50 })],
    sfx: [[.1, 'city_loop', .15], [.4, 'hooves', .25], [.6, 'footsteps', .2], ['march', 'paper', .4]] },

  // 4.02 MED: night, 2 September 1752: a man in a nightcap blows out his candle and climbs into bed
  { set: 'ny_bedroom', cam: { z: [1.25, 1.35], x: [640, 640], y: [420, 420], ease: E.io }, bed: [['clock_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'september', 3.5); Sh.tB = at(Sh, 'bed', 2.5); },
    draw: (c, lt, u, Sh) => { const lit = 1 - seg(lt, Sh.tB, Sh.tB + .15), L = lit > .5 ? CANDLE(lt) : NIGHT(lt); WINDOW(c, false);
      nyCal(c, 935, 245, .8, '2', 'SEPT 1752', { px: 70 });
      if (lit > 0) { S.glow(c, 910, 412, 160, '#ffb040', .4 * lit); c.fillStyle = '#ffd070'; c.beginPath(); c.ellipse(910, 412, 4, 9, 0, 0, TAU); c.fill(); } else { c.strokeStyle = 'rgba(200,200,210,.5)'; c.lineWidth = 2; c.beginPath(); c.moveTo(910, 418); c.quadraticCurveTo(904 + Math.sin(lt * 3) * 6, 380, 912, 340 - (lt - Sh.tB) * 10); c.stroke(); }
      const blow = Math.sin(Math.PI * seg(lt, Sh.tB - .4, Sh.tB + .2)), q = seg(lt, Sh.tB + .4, Sh.tB + 2);
      fig(c, NY.SLEEPER, lerp(850, 640, E.io(q)), 668, 32, q > 0 && q < 1 ? walk(lt, 1, { face: -1 }) : pose(lt, 1, { face: -1, lean: 10 * blow }), lt, 1, L, { open: .3 * blow, squint: .6, blink: lt > Sh.tB + 2.2 && lt % 2 < .8, look: [-.6, -.1] });
      if (lit <= 0) { c.fillStyle = 'rgba(10,15,40,.4)'; c.fillRect(0, 0, 1280, 720); } },
    over: [(c, lt, u, Sh) => K.card(c, 'WEDNESDAY 2 SEPTEMBER 1752', lt, { at: Sh.tS, x: 960, y: 160, px: 50 })],
    sfx: [[.1, 'clock_loop', .3], ['bed', 'breath', .4], ['september', 'tick', .3]] },

  // 4.03 MED: morning; he wakes, stretches, looks at the calendar: 14 SEPTEMBER. Double take; the cat too
  { set: 'ny_bedroom', cam: (lt, u, Sh) => ({ z: [lt > Sh.tF ? lerp(1.3, 1.7, E.out(seg(lt, Sh.tF, Sh.tF + .3))) : 1.3], x: [lt > Sh.tF ? lerp(640, 780, E.out(seg(lt, Sh.tF, Sh.tF + .3))) : 640], y: [lt > Sh.tF ? lerp(420, 380, E.out(seg(lt, Sh.tF, Sh.tF + .3))) : 420], shake: lt > Sh.tF && lt < Sh.tF + .3 ? 6 : 0 }), bed: [['birds_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'fourteenth', 1.5); Sh.tE = at(Sh, 'eleven', 3); Sh.tB = at(Sh, 'birthday', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt); WINDOW(c, true);
      nyCal(c, 935, 245, .8, lt > Sh.tF - .2 ? '14' : '2', 'SEPT 1752', { px: 70 });
      const st = Math.max(0, Math.sin(Math.PI * seg(lt, .1, Sh.tF - .4))), dt = seg(lt, Sh.tF, Sh.tF + .25), jump = Math.max(0, Math.sin(Math.PI * seg(lt, Sh.tF, Sh.tF + .5)));
      fig(c, NY.SLEEPER, 700, 668 - jump * 20, 32, pose(lt, 1, { face: 1, shN: lerp(4, 165, st) + dt * 60, shF: lerp(-4, 160, st) + dt * 50, elN: lerp(10, 40, st) + 60 * dt, elF: 40 * st + 60 * dt, lean: -6 * dt }), lt, 1, L, { open: Math.max(st * .7, dt), wide: dt, raise: dt, squint: st * .7 * (1 - dt), look: [lerp(.2, .9, dt), -.3 * dt] });
      CAT(c, 560, 668, 1.2, seg(lt, Sh.tF + .15, Sh.tF + .35), lt); },
    over: [(c, lt, u, Sh) => K.card(c, 'THURSDAY 14 SEPTEMBER?!', lt, { at: Sh.tF, x: 960, y: 160, px: 56, rot: -3 }), (c, lt, u, Sh) => K.card(c, '11 DAYS, GONE', lt, { at: Sh.tE, x: 1460, y: 900, px: 54, rot: 3 })],
    sfx: [[.1, 'birds_loop', .2], [.2, 'rooster', .5], [.6, 'yawn', .45], ['fourteenth', 'scratch', .65], ['fourteenth', 'meow', .45], ['birthday', 'trombone', .4]] },

  // 4.04 MED: snowy Moscow 1918; a clerk rips a stack of pages off a big calendar while people in fur hats watch
  { set: 'ny_moscow', cam: { z: [1.2, 1.3], x: [640, 640], y: [430, 430], ease: E.io }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'russia', .8); Sh.tV = at(Sh, 'revolution', Sh.dur - 2.5); Sh.tY = at(Sh, '1918', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt), rip = seg(lt, Sh.tV - .4, Sh.tY + .4);
      nyCal(c, 640, 430, 1.1, lt > Sh.tY ? '14' : '31', lt > Sh.tY ? 'FEB 1918' : 'JAN 1918', { px: 66 });
      for (let k = 0; k < 8; k++) { const t0 = Sh.tV - .4 + k * .25; if (lt < t0) continue; const q = seg(lt, t0, t0 + 1.2), r = S.rng(k + 300); nyPage(c, 640 + 300 * q * (r() - .3), 430 - 80 * q + 300 * q * q, .7, (r() - .5) * 5 * q, String(1 + k), 1 - seg(q, .7, 1)); }
      fig(c, NY.RUSCLERK, 780, 670, 32, pose(lt, 1, { face: -1, shN: 90 + 30 * Math.abs(Math.sin(lt * 6)) * (rip > 0 && rip < 1), elN: 20 }), lt, 1, L, { angry: .3, look: [-.7, -.4] });
      [[NY.RUS1, 260, 1], [NY.RUSW, 400, 1], [NY.RUS1, 1050, -1]].forEach(([ch, x, f], k) => fig(c, ch, x, 674, 30, pose(lt, k + 2, { face: f, shN: 50, elN: 110 }), lt, k + 2, L, { raise: rip, open: .4 * rip, look: [f * .7, -.3] }));
      snow(c, lt, 90, .9); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'RUSSIA · 1918', lt, { at: Sh.tR }), (c, lt, u, Sh) => K.card(c, 'FINALLY!', lt, { at: Sh.tY, x: 1460, y: 220, px: 60, rot: -3 })],
    sfx: [[.1, 'wind_loop', .3], ['russia', 'bell', .3], ['revolution', 'paper_tear', .5], ['1918', 'paper_tear', .5], ['1918', 'ding', .4]] },
];
VP.build(); K.boot();
</script></body></html>
