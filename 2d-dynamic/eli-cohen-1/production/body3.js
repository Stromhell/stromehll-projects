const note = cc => wr => { cc.save(); cc.translate(wr[0], wr[1]); cc.fillStyle = '#f0ece0'; cc.fillRect(-12, -16, 24, 30); cc.fillStyle = '#8a8a8a'; for (let k = 0; k < 4; k++) cc.fillRect(-9, -11 + k * 6, 18, 2); cc.restore(); };
const glass = (cc, s = 1.1, col) => wr => S.ecGlass(cc, wr[0], wr[1] + 2, s, .6, col);

window.SHOTS = [
  // 3.01 WIDE: a Buenos Aires street; a taxi pulls up; Eli in a sharp suit steps out
  { set: 'mstreet', cam: { z: [1.06, 1.12], x: [640, 620], y: [420, 430], ease: E.io }, bed: [['city_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'community', Sh.dur - 2.2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), arr = E.out(seg(lt, 0, 2.2)), cx = lerp(1700, 760, arr), w = seg(lt, 1.2, Sh.dur);
      S.ecCar(c, lerp(-300, 1600, seg(lt, 1, Sh.dur)), 566, 1.4, '#7a2a2a', 1, lt * 9);
      fig(c, C.CAFE2, 1120, 610, 30, pose(lt, 2, { face: -1, shN: 20, elN: 60 }), lt, 2, L, { look: [-.6, 0] });
      fig(c, C.ELIK, lerp(1380, 420, E.out(w)), 612, 33, w < 1 ? walk(lt, 0, { face: -1 }) : pose(lt, 0, { face: -1, shN: 20, elN: 60 }), lt, 0, L, { look: [-.6, -.2], smile: 1 });
      S.ecCar(c, lt < 3.4 ? cx : lerp(cx, cx - 2000, E.inn(seg(lt, 3.4, Sh.dur))), 660, 2.4, '#1a1a1a', -1, arr < 1 || lt > 3.4 ? lt * 9 : 0); },
    over: [(c, lt) => K.dateTag(c, 'BUENOS AIRES · 1961', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'BIG SYRIAN & LEBANESE COMMUNITY', lt, { at: Sh.tC, x: 1300, y: 150, px: 38, rot: 2 })],
    sfx: [[.1, 'city_loop', .3], [.2, 'engine_loop', .3], [2.2, 'door_slam', .3], [2.6, 'footsteps', .3]] },

  // 3.02 MED: a café full of men in suits; Eli at the centre telling a story; others laughing; an editor taking notes
  { set: 'ec_cafe', cam: { z: [1.2, 1.28], x: [640, 660], y: [480, 480], ease: E.io }, bed: [['crowd_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tP = at(Sh, 'press', 3.5); Sh.tH = at(Sh, 'homeland', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = CANDLE(lt), talk = Math.sin(lt * 9) > 0 ? 1 : 0, laugh = Math.sin(lt * 1.3) > .3 ? 1 : 0;
      [[380, C.CAFE, 1], [900, C.CAFE3, -1]].forEach(([x, ch, f], k) => { S.ecChair(c, x, 660, 1.1, f); fig(c, ch, x + f * 18, 660, 32, Object.assign(VP.sit(ch, lt * .3, k + 1, { seat: .4 }), { face: f, shN: 30, elN: 80, holdN: glass(c, 1, '#4a2a1a') }), lt, k + 1, L, { look: [f * .6, 0], smile: 1, open: laugh }); });
      fig(c, C.ELIK, 640, 670, 35, pose(lt, 0, { face: 1, shN: 70 + 30 * Math.sin(lt * 2), elN: 30, shF: 50, elF: 40 }), lt, 0, L, { look: [Math.sin(lt * .8) * .6, 0], smile: 1, open: talk });
      S.ecTable(c, 510, 700, 140, 70, '#e8e0d0'); S.ecTable(c, 780, 700, 140, 70, '#e8e0d0'); S.ecGlass(c, 500, 616, 1, .5, '#4a2a1a'); S.ecGlass(c, 790, 616, 1, .5, '#4a2a1a');
      fig(c, C.EDITOR, 1110, 670, 33, pose(lt, 3, { face: -1, shN: 60, elN: 70, holdN: note(c) }), lt, 3, L, { look: [-.6, .3] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'CAFÉS · CLUBS · ARAB PRESS', lt, { at: Sh.tP - .6, x: 960, y: 130, px: 44, rot: -2 })],
    sfx: [[.1, 'crowd_loop', .2], [.6, 'laugh', .3], ['press', 'typing', .2], ['homeland', 'laugh', .35]] },

  // 3.03 MED: an embassy reception; Eli shakes hands with a stocky officer with medals
  { set: 'sz_palace', cam: { z: [1.15, 1.25], x: [640, 640], y: [470, 480], ease: E.io }, bed: [['waltz', .15], ['crowd_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'hafiz', 5); Sh.tD = at(Sh, 'denied', Sh.dur - 3.4); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), w = E.out(seg(lt, .3, 2)), sh = seg(lt, 2, Sh.dur), pump = sh > 0 ? Math.sin(lt * 8) * 6 * (1 - seg(lt, 4, 5)) : 0;
      fig(c, C.GUESTW2, 200, 650, 30, pose(lt, 3, { face: 1, shN: 30, elN: 90, holdN: glass(c) }), lt, 3, L, { look: [.6, 0], smile: 1 });
      fig(c, C.MINISTER2, 1080, 650, 32, pose(lt, 4, { face: -1, shN: 30, elN: 90, holdN: glass(c) }), lt, 4, L, { look: [-.6, 0], smile: 1 });
      fig(c, C.ELIK, lerp(380, 560, w), 670, 35, w < 1 ? walk(lt, 0, { face: 1 }) : pose(lt, 0, { face: 1, shN: 70 + pump, elN: 10 }), lt, 0, L, { look: [.6, -.1], smile: 1 });
      fig(c, C.HAFIZB, 700, 672, 36, pose(lt, 1, { face: -1, shN: w < 1 ? 20 : 70 + pump, elN: w < 1 ? 60 : 10 }), lt, 1, L, { look: [-.6, -.1], smile: lt > 2 ? 1 : 0 });
      for (let k = 0; k < 3; k++) { c.fillStyle = ['#c8a040', '#c82a2a', '#e8e4dc'][k]; c.beginPath(); c.arc(712 - k * 9, 672 - 36 * 3.9, 4, 0, TAU); c.fill(); } },
    over: [(c, lt, u, Sh) => K.card(c, 'AMIN AL-HAFIZ?', lt, { at: Sh.tH, x: 1360, y: 150, px: 54, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'HE ALWAYS DENIED IT', lt, { at: Sh.tD, x: 1360, y: 260, px: 40, rot: -2 })],
    sfx: [[.1, 'waltz', .15], [.2, 'crowd_loop', .12], [.4, 'footsteps', .25], ['hafiz', 'chime', .35], ['denied', 'tension', .3]] },

  // 3.04 MED: Eli packs a suitcase; letters go in; then the tea tin with the radio key into a hidden pocket
  { set: 'np_bedroom', cam: { z: [1.3, 1.45], x: [700, 740], y: [500, 500], ease: E.io }, bed: [['clock_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'letters', 1.5); Sh.tD = at(Sh, 'damascus', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), e = seg(lt, Sh.tL, Sh.tL + 1.2), t = seg(lt, Sh.tD - 1, Sh.tD + .4); let wr = [660, 560];
      S.ecTable(c, 800, 680, 260, 70, '#5a3a22'); S.ecSuitcase(c, 800, 600, 1.6, 1, '#5a3a22');
      if (e >= 1) [0, 1].forEach(k => S.ecEnvelope(c, 770 + k * 30, 572 - k * 4, .6, -.05 + k * .1));
      const held = e <= 0 ? (cc => p => { wr = p; S.ecEnvelope(cc, p[0] + 10, p[1], .55, -.1); }) : (e >= 1 && t <= 0) ? (cc => p => { wr = p; S.ecTin(cc, p[0] + 6, p[1] + 26, .45, 0, 0); }) : (cc => p => { wr = p; });
      fig(c, C.ELIK, 600, 680, 35, pose(lt, 0, { face: 1, shN: 70, elN: 50, lean: 8, holdN: held(c) }), lt, 0, L, { look: [.6, .5] });
      if (e > 0 && e < 1) S.ecEnvelope(c, lerp(wr[0] + 10, 790, E.io(e)), lerp(wr[1], 572, E.io(e)), .6, -.1);
      if (t > 0) S.ecTin(c, lerp(wr[0] + 6, 860, E.io(t)), lerp(wr[1] + 26, 594, E.io(t)), .45, 0, 0); },
    over: [(c, lt, u, Sh) => K.card(c, 'LETTERS FOR DAMASCUS', lt, { at: Sh.tL + .3, x: 1360, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'clock_loop', .15], ['letters', 'paper', .35], ['damascus', 'morse', .25], ['damascus', 'clank', .25]] },
];
VP.build(); K.boot();
</script></body></html>
