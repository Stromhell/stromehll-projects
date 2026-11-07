const MONTHS10 = ['MARTIUS', 'APRILIS', 'MAIUS', 'IUNIUS', 'QUINTILIS', 'SEXTILIS', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
// a carved stone calendar slab: months listed in two columns; gap: show the empty winter slot; extra: months slotted in (0..1 each)
const slab = (c, x, y, s, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-196, -126, 400, 270); c.fillStyle = '#d8d0c0'; c.fillRect(-200, -130, 400, 270); c.fillStyle = '#b8ae9a'; c.fillRect(150, -130, 50, 270);
  c.fillStyle = '#5a4a3a'; c.font = 'bold 20px serif'; c.textAlign = 'left'; const list = (o.pre || []).concat(MONTHS10);
  list.forEach((m, i) => { const col = i < 6 ? 0 : 1, row = i % 6; c.globalAlpha = i < (o.pre || []).length ? (o.preA ?? 1) : 1; c.fillStyle = i < (o.pre || []).length ? '#8a1a1a' : '#5a4a3a'; c.fillText(m, -184 + col * 190, -96 + row * 34); }); c.globalAlpha = 1;
  if (o.gap) { c.strokeStyle = '#8a1a1a'; c.setLineDash([8, 6]); c.lineWidth = 3; c.strokeRect(-10, 96, 170, 34); c.setLineDash([]); c.fillStyle = '#8a1a1a'; c.font = 'bold 24px Anton'; c.fillText('? ? ?', 40, 122); }
  c.restore(); };
window.SHOTS = [
  // 2.01 WIDE: early Rome on its hills by the Tiber in spring; two Romans stroll and greet
  { set: 'ny_rome', cam: { z: [1.0, 1.08], x: [600, 660], y: [380, 370], ease: E.io }, bed: [['birds_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'march', 2.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), q = seg(lt, 0, Sh.dur * .7);
      fig(c, NY.TOGA, lerp(200, 520, q), 660, 30, q < 1 ? walk(lt, 0, { face: 1 }) : pose(lt, 0, { face: 1, shN: 70, elN: 30 }), lt, 0, L, { smile: .7, look: [.7, 0] });
      fig(c, NY.ROMW, lerp(1100, 700, q), 666, 29, q < 1 ? walk(lt, 1, { face: -1 }) : pose(lt, 1, { face: -1, shN: 60, elN: 40 }), lt, 1, L, { smile: .7, look: [-.7, 0] });
      fig(c, NY.TOGA3, 980, 610, 22, pose(lt, 2, { face: -1 }), lt, 2, L, { look: [-.5, 0] }); VP.motes(c, lt, 0, 300, 1280, 300, { n: 10 }); },
    over: [(c, lt) => K.dateTag(c, 'ROME', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'NEW YEAR = MARCH', lt, { at: Sh.tM, x: 960, y: 170, px: 64 })],
    sfx: [[.1, 'birds_loop', .2], [.4, 'footsteps', .25], [1.2, 'bell', .2], ['march', 'ding', .4]] },

  // 2.02 MED: stone calendar with ten months and an empty winter gap; a Roman shivers in the snow beside it
  { set: 'ny_rome', cam: { z: [1.5, 1.6], x: [600, 620], y: [460, 460], ease: E.io }, bed: [['wind_loop', .35]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'ten', 1.5); Sh.tW = at(Sh, 'winter', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt); c.fillStyle = 'rgba(200,215,235,.45)'; c.fillRect(0, 0, 1280, 720); c.fillStyle = '#eef2f8'; c.fillRect(0, 610, 1280, 110);
      c.fillStyle = '#9a8a72'; c.fillRect(520, 470, 16, 140); c.fillRect(744, 470, 16, 140); slab(c, 640, 440, .62, { gap: lt > Sh.tW });
      const sh = seg(lt, Sh.tW - .3, Sh.tW + .2);
      fig(c, NY.TOGA2, 880 + shiver(lt, sh), 660, 32, pose(lt, 3, { face: -1, shN: 60, elN: 120, shF: 60, elF: 120, lean: 6 * sh }), lt, 3, L, { worry: 1, squint: .3, look: [-.7, -.1], open: .2 * Math.abs(Math.sin(lt * 30)) * sh });
      snow(c, lt, 90, .9); },
    over: [(c, lt, u, Sh) => K.card(c, '10 MONTHS · 304 DAYS', lt, { at: Sh.tT, x: 960, y: 170, px: 60 }), (c, lt, u, Sh) => K.card(c, 'WINTER: NO MONTH', lt, { at: Sh.tW + .3, x: 520, y: 900, px: 46, rot: 3 })],
    sfx: [[.1, 'wind_loop', .35], ['ten', 'ding', .4], ['winter', 'whoosh', .3], ['winter', 'yawn', .0]] },

  // 2.03 MED: King Numa on his stone seat; two workers carry new carved tablets and slot them into the calendar wall
  { set: 'ny_senate', cam: { z: [1.38, 1.45], x: [650, 650], y: [430, 430], ease: E.io }, bed: [['hum_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tK = at(Sh, 'king', 2); Sh.tJ = at(Sh, 'januarius', Sh.dur - 2.5); Sh.tF = at(Sh, 'februarius', Sh.dur - 1.2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), qa = seg(lt, Sh.tJ - .4, Sh.tJ + .3), qb = seg(lt, Sh.tF - .4, Sh.tF + .3);
      slab(c, 640, 282, .74, { pre: ['IANUARIUS', 'FEBRUARIUS'].slice(0, (qa >= 1) + (qb >= 1)) });
      // stone seat + Numa
      c.save(); c.translate(110, 0); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(240, 662, 80, 7, 0, 0, TAU); c.fill(); c.fillStyle = '#9a8a70'; c.fillRect(168, 560, 18, 100); c.fillStyle = '#8a7a62'; c.fillRect(186, 630, 116, 30); c.fillStyle = '#b8a888'; c.fillRect(180, 622, 128, 10); c.strokeStyle = '#4a3a2a'; c.lineWidth = 2; c.strokeRect(186, 630, 116, 30); c.strokeRect(180, 622, 128, 10); c.strokeRect(168, 560, 18, 100);
      fig(c, NY.NUMA, 220, 660, 32, pose(lt, 1, { face: 1, sitY: -1.6, hipN: 85, hipF: 85, kneeN: 85, kneeF: 85, shN: lerp(10, 80, seg(lt, Sh.tK, Sh.tK + .5)), elN: 20 }), lt, 1, L, { smile: .5, look: [.8, -.3] }); c.restore();
      // workers walk in carrying tablets overhead, from the right
      [[NY.WORKMAN, Sh.tJ, 0], [NY.MASON, Sh.tF, 1]].forEach(([ch, t, k]) => { const q = seg(lt, t - 3.2, t - .3), x = lerp(1380, 770 + k * 150, E.out(q)), held = lt < t - .1;
        fig(c, ch, x, 666, 30, q > 0 && q < 1 ? walk(lt, k + 2, { face: -1, shN: 160, elN: 20, shF: 160, elF: 20 }) : pose(lt, k + 2, { face: -1, shN: held ? 160 : 20, elN: 20, shF: held ? 160 : 10 }), lt, k + 2, L, { look: [-.5, -.5], smile: held ? 0 : .7 });
        if (held) { c.fillStyle = '#d8d0c0'; c.fillRect(x - 50, 666 - 30 * 6.4, 100, 34); c.fillStyle = '#8a1a1a'; c.font = 'bold 13px serif'; c.textAlign = 'center'; c.fillText(k ? 'FEBRUARIUS' : 'IANUARIUS', x, 666 - 30 * 6.4 + 22); } }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'KING NUMA', lt, { at: Sh.tK, x: 760, y: 380 }), (c, lt, u, Sh) => K.card(c, '+ JANUARIUS', lt, { at: Sh.tJ, x: 1560, y: 150, px: 50 }), (c, lt, u, Sh) => K.card(c, '+ FEBRUARIUS', lt, { at: Sh.tF, x: 1560, y: 250, px: 50, rot: 2 })],
    sfx: [[.1, 'hum_loop', .1], ['king', 'horn', .3], ['januarius', 'scrape', .4], ['januarius', 'thud', .4], ['februarius', 'scrape', .4], ['februarius', 'thud', .45]] },

  // 2.04 MED: a harvest festival with grape baskets, in a snowstorm; confused Romans look up (sad trombone)
  { set: 'ny_rome', cam: { z: [1.45, 1.55], x: [640, 640], y: [470, 470], ease: E.io }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'sun', 2); Sh.tW = at(Sh, 'wrong', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt), sn = seg(lt, .8, 2.5); c.fillStyle = S.rgba('#c8d4e8', .4 * sn); c.fillRect(0, 0, 1280, 720); c.fillStyle = S.rgba('#eef2f8', sn); c.fillRect(0, 610, 1280, 110);
      // harvest table with grapes
      c.fillStyle = '#6a4a2a'; c.fillRect(470, 560, 340, 16); c.fillRect(490, 576, 12, 50); c.fillRect(778, 576, 12, 50);
      [[530, '#6a2a6a'], [640, '#4a7a2a'], [750, '#6a2a6a']].forEach(([x, col]) => { c.fillStyle = '#a8784a'; c.beginPath(); c.moveTo(x - 36, 528); c.lineTo(x + 36, 528); c.lineTo(x + 28, 560); c.lineTo(x - 28, 560); c.fill(); for (let k = 0; k < 9; k++) { c.fillStyle = col; c.beginPath(); c.arc(x - 20 + (k % 5) * 10, 524 - Math.floor(k / 5) * 9, 6, 0, TAU); c.fill(); } });
      NYX.snowcap(c, 470, 560, 340, 8 * sn);
      const lk = seg(lt, Sh.tW - .5, Sh.tW); [[NY.TOGA, 360, 1, 0], [NY.ROMW, 920, -1, 1], [NY.TOGA3, 1060, -1, 2]].forEach(([ch, x, f, k]) => fig(c, ch, x + shiver(lt, sn * .5), 668, 30, pose(lt, k, { face: f, shN: lerp(20, 70, lk), elN: lerp(10, 100, lk) }), lt, k, L, { raise: lk, open: .5 * lk, worry: lk, look: [f * .2, -.8 * lk] }));
      snow(c, lt, 110, sn); },
    over: [(c, lt, u, Sh) => K.card(c, 'HARVEST PARTY... IN WINTER?', lt, { at: Sh.tW - .3, x: 960, y: 170, px: 56 })],
    sfx: [[.1, 'wind_loop', .3], [.3, 'crowd_loop', .12], ['wrong', 'trombone', .55]] },

  // 2.05 MED: Caesar in the senate points at a new calendar where IANUARIUS I glows; senators clap
  { set: 'ny_senate', cam: { z: [1.35, 1.45], x: [650, 650], y: [430, 425], ease: E.io }, bed: [['crowd_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'caesar', 1.5); Sh.tJ = at(Sh, 'julian', 3); Sh.tF = at(Sh, 'first', Sh.dur - 2.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), g = seg(lt, Sh.tF - .2, Sh.tF + .5);
      c.save(); c.translate(640, 282); c.scale(.74, .74); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-196, -126, 400, 270); c.fillStyle = '#efe6d2'; c.fillRect(-200, -130, 400, 270); c.fillStyle = '#5a4a3a'; c.font = 'bold 22px serif'; c.textAlign = 'center'; c.fillText('KALENDAE IULIANAE', 0, -96);
      if (g > 0) { S.glow(c, 0, 10, 160 * g, '#ffd040', .6); } c.fillStyle = g > 0 ? '#a8201a' : '#5a4a3a'; c.font = `bold ${lerp(34, 46, g)}px Anton`; c.fillText('IANUARIUS · I', 0, 22); c.font = '16px serif'; c.fillStyle = '#5a4a3a'; c.fillText('365 DIES', 0, 90); c.restore();
      fig(c, NY.CAESAR, 400, 660, 34, pose(lt, 1, { face: 1, shN: lerp(10, 120, seg(lt, Sh.tF - .4, Sh.tF)), elN: 5, lean: -2 }), lt, 1, L, { smile: .6, look: [.7, -.4] });
      const cl = seg(lt, Sh.tF + .2, Sh.tF + .5); [[NY.TOGA, 800], [NY.TOGA2, 910], [NY.TOGA3, 1020]].forEach(([ch, x], k) => { const cp = Math.abs(Math.sin(lt * 12 + k)) * cl; fig(c, ch, x, 660, 28, pose(lt, k + 2, { face: -1, shN: 60 + 20 * cp, elN: 90 + 30 * cp, shF: 60 + 20 * cp, elF: 90 + 30 * cp }), lt, k + 2, L, { smile: cl, look: [-.6, -.3] }); }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'JULIUS CAESAR · 46 BCE', lt, { at: Sh.tC }), (c, lt, u, Sh) => K.card(c, 'JANUARY 1st!', lt, { at: Sh.tF + .2, x: 1460, y: 220, px: 64, rot: -3 })],
    sfx: [[.1, 'crowd_loop', .1], ['caesar', 'horn', .3], ['julian', 'paper', .4], ['first', 'ding', .55], ['first', 'crowd_cheer', .35]] },

  // 2.06 MED: the shrine of Janus; Romans leave honey cakes and coins at the two-faced statue
  { set: 'ny_janus', cam: { z: [1.35, 1.45], x: [640, 640], y: [430, 425], ease: E.io }, bed: [['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tJ = at(Sh, 'janus', 2.5); Sh.tB = at(Sh, 'back', 5); Sh.tN = at(Sh, 'forward', 6.5); Sh.tM = at(Sh, 'named', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), qL = seg(lt, Sh.tB - .2, Sh.tB + .4) * (1 - seg(lt, Sh.tN, Sh.tN + .4)), qR = seg(lt, Sh.tN - .2, Sh.tN + .4);
      S.nyJanus(c, 640, 512, .95, { mL: qL, mR: qR, blinkL: lt % 3 < .15, blinkR: (lt + 1.4) % 3.3 < .15 });
      // offerings appear on the plinth when each Roman reaches it
      const W = (ch, x0, x1, t0, k, face) => { const q = seg(lt, t0, t0 + 2.2), x = lerp(x0, x1, E.io(q)), bow = Math.sin(Math.PI * seg(lt, t0 + 2.2, t0 + 3.2));
        fig(c, ch, x, 668, 30, q > 0 && q < 1 ? walk(lt, k, { face }) : pose(lt, k, { face, lean: 18 * bow, shN: 50 + 30 * bow, elN: 20 }), lt, k, L, { smile: .6, look: [face * .7, .2 * bow] }); return lt > t0 + 2.6; };
      const cake = W(NY.ROMW, -60, 470, .2, 0, 1), coin = W(NY.TOGA, 1340, 810, 1.6, 1, -1);
      if (cake) { c.fillStyle = '#c88a3a'; c.beginPath(); c.ellipse(600, 506, 18, 7, 0, 0, TAU); c.fill(); c.fillStyle = '#e8b050'; c.beginPath(); c.ellipse(600, 503, 14, 4, 0, 0, TAU); c.fill(); }
      if (coin) { c.fillStyle = '#e8c860'; [[680, 507], [690, 504], [672, 503]].forEach(([x, y]) => { c.beginPath(); c.ellipse(x, y, 6, 2.5, 0, 0, TAU); c.fill(); }); } },
    over: [(c, lt, u, Sh) => K.card(c, 'JANUS', lt, { at: Sh.tJ, x: 960, y: 150, px: 80 }), (c, lt, u, Sh) => K.card(c, '← OLD YEAR', lt, { at: Sh.tB, x: 520, y: 330, px: 40, rot: -3 }), (c, lt, u, Sh) => K.card(c, 'NEW YEAR →', lt, { at: Sh.tN, x: 1400, y: 330, px: 40, rot: 3 }), (c, lt, u, Sh) => K.card(c, 'JANUS → JANUARY', lt, { at: Sh.tM, x: 960, y: 960, px: 54 })],
    sfx: [[.1, 'wind_loop', .15], ['janus', 'creak', .4], ['back', 'whoosh_soft', .3], ['forward', 'whoosh_soft', .3], [2.8, 'pour', .2], [4.2, 'coins', .4], ['named', 'ding', .45]] },

  // 2.07 MED: a Roman in a party wreath grumbles, chisels a few strokes, then puts the chisel down
  { set: 'ny_workshop', cam: { z: [1.4, 1.5], x: [620, 640], y: [470, 470], ease: E.io }, bed: [['hum_loop', .08]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'work', 2.5); Sh.tR = at(Sh, 'really', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = ROOM(lt), wk = seg(lt, Sh.tW - .6, Sh.tW) * (1 - seg(lt, Sh.tR - .6, Sh.tR - .2)), tap = wk * Math.max(0, Math.sin(lt * 9));
      // half-carved block on a bench
      c.fillStyle = '#6a4a2a'; c.fillRect(620, 580, 220, 14); c.fillRect(636, 594, 12, 60); c.fillRect(812, 594, 12, 60); c.fillStyle = '#e0d8c8'; c.fillRect(650, 500, 150, 80); c.fillStyle = '#c0b6a2'; c.fillRect(760, 500, 40, 80); c.fillStyle = '#8a8070'; c.font = 'bold 18px serif'; c.textAlign = 'center'; c.fillText('I · IAN', 705, 548);
      fig(c, NY.MASON, 560, 668, 34, pose(lt, 1, { face: 1, shN: 70 + tap * 15, elN: 40, shF: 50, elF: 70, lean: 6 * wk,
        holdN: wr => { c.save(); c.translate(wr[0], wr[1]); c.rotate(.9); c.fillStyle = '#6a4a2a'; c.fillRect(-4, -26, 8, 26); c.fillStyle = '#9aa0a6'; c.fillRect(-3, 0, 6, 20); c.restore(); } }), lt, 1, L, { angry: .5 * wk, squint: .3, look: [.8, .3] });
      // stone chips fly on each tap
      if (tap > .8) for (let k = 0; k < 5; k++) { const r = S.rng(Math.floor(lt * 9) * 7 + k); c.fillStyle = '#e8e0d0'; c.fillRect(650 + r() * 20, 520 + r() * 40 - (lt * 9 % 1) * 30, 3, 3); } },
    over: [(c, lt, u, Sh) => K.card(c, 'WORK ON NEW YEAR\'S DAY', lt, { at: Sh.tW, x: 960, y: 170, px: 56 }), (c, lt, u, Sh) => K.card(c, 'YES, REALLY.', lt, { at: Sh.tR, x: 1460, y: 290, px: 50, rot: 4 })],
    sfx: [[.1, 'hum_loop', .08], ['work', 'pick', .35], ['really', 'thud', .3]] },
];
VP.build(); K.boot();
</script></body></html>
