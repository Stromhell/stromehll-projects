const sc = (cc, s = .55) => wr => S.ecSuitcase(cc, wr[0], wr[1] + 34 * s, s);
const kidDesk = (c, x, y, s = 1.4) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a4a2a'; c.fillRect(-46, -52, 92, 10); c.fillStyle = '#4a3020'; c.fillRect(-40, -42, 80, 42); c.fillStyle = S.rgba('#000000', .2); c.fillRect(-40, -42, 80, 6); c.restore(); };

window.SHOTS = [
  // 1.01 WIDE: Alexandria's corniche; a tram, the sea; a family walking, the boy holding his father's hand
  { set: 'ec_corniche', cam: { z: [1.08, 1.14], x: [620, 680], y: [430, 430], ease: E.io }, bed: [['ocean_loop', .25], ['city_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tA = at(Sh, 'aleppo', Sh.dur - 2.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), tx = lerp(1500, -300, seg(lt, .5, Sh.dur * .9));
      S.ecTram(c, tx, 566, .8);
      const fx = lerp(-60, 620, seg(lt, 0, Sh.dur));
      fig(c, C.ELIMUM, fx - 110, 660, 31, walk(lt * .8, 2, { face: 1 }), lt, 2, L, { look: [.6, 0], smile: 1 });
      fig(c, C.ELIDAD, fx, 664, 34, walk(lt * .8, 0, { face: 1, shF: 10, elF: 10 }), lt, 0, L, { look: [.6, .1] });
      fig(c, C.ELIBOY, fx + 46, 670, 22, walk(lt * .8 + .3, 1, { face: 1, shN: -10, elN: 10 }), lt, 1, L, { look: [-.2, -.5], smile: 1 });
      fig(c, C.PORTER, 1100, 650, 30, pose(lt, 3, { face: -1, shN: 20, elN: 60 }), lt, 3, L, { look: [-.6, 0] }); },
    over: [(c, lt) => K.dateTag(c, 'ALEXANDRIA · 1924', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'FAMILY FROM ALEPPO, SYRIA', lt, { at: Sh.tA, x: 1360, y: 150, px: 44, rot: 2 })],
    sfx: [[.1, 'ocean_loop', .25], [.2, 'city_loop', .15], [.6, 'bell', .25], [1, 'footsteps', .2]] },

  // 1.02 MED: a classroom; the boy recites from memory while classmates look on
  { set: 'ec_class', cam: { z: [1.08, 1.16], x: [640, 700], y: [440, 450], ease: E.io }, bed: [['clock_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'memory', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), talk = Math.sin(lt * 9) > 0 ? 1 : 0;
      fig(c, C.TEACHER, 300, 640, 34, pose(lt, 0, { face: 1, shN: 40 + 10 * Math.sin(lt), elN: 80 }), lt, 0, L, { look: [.6, 0], smile: lt > Sh.tM ? 1 : 0 });
      [[560, C.CHILD], [1080, C.CHILD2]].forEach(([x, ch], k) => { fig(c, ch, x, 660, 30, Object.assign(VP.sit(ch, lt * .3, k + 2, { seat: .2 }), { face: x < 800 ? 1 : -1 }), lt, k + 2, L, { look: [x < 800 ? .7 : -.7, -.2], smile: lt > Sh.tM ? 1 : 0 }); kidDesk(c, x + (x < 800 ? 44 : -44), 676); });
      fig(c, C.ELIBOY, 820, 668, 31, pose(lt, 1, { face: -1, shN: 30, elN: 60 }), lt, 1, L, { look: [-.6, -.2], open: talk });
      kidDesk(c, 820, 712); },
    over: [(c, lt, u, Sh) => K.card(c, 'ARABIC · FRENCH · HEBREW', lt, { at: .8, x: 1400, y: 140, px: 42, rot: 2, until: Sh.tM }), (c, lt, u, Sh) => K.card(c, 'A MEMORY FOR DETAIL', lt, { at: Sh.tM, x: 1400, y: 140, px: 46, rot: 2 })],
    sfx: [[.1, 'clock_loop', .15], [.5, 'whisper', .2], ['memory', 'chime', .35]] },

  // 1.03 MED: the harbour; the family walks up the gangway; Eli stays on the dock and waves
  { set: 'ec_dock', cam: { z: [1.05, 1.1], x: [640, 620], y: [420, 420], ease: E.io }, bed: [['ocean_loop', .25], ['crowd_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'stayed', Sh.dur - 2.4); Sh.tL = at(Sh, 'left', 4.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      [[C.ELIDAD, 0, 30], [C.ELIMUM, .5, 29], [C.BROTHER, 1, 29]].forEach(([ch, d, uu], k) => { const a = seg(lt, .3 + d, 2.6 + d), b = seg(lt, 2.6 + d, Sh.tL + 2 + d); if (b >= 1) return;
        const x = b > 0 ? lerp(400, 585, b) : lerp(-80 - k * 60, 400, a), y = b > 0 ? lerp(520, 300, b) : 560, s = b > 0 ? lerp(uu, uu * .6, b) : uu; fig(c, ch, x, y, s, walk(lt, k, { face: 1 }), lt, k, L, { look: [.6, -.2] }); });
      const wave = lt > 1 ? Math.sin(lt * 6) * 25 : 0; fig(c, C.ELIS, 880, 670, 34, pose(lt, 4, { face: -1, shN: lt > 1 ? 150 + wave : 20, elN: lt > 1 ? 20 : 60 }), lt, 4, L, { look: [-.6, -.4], worry: lt > Sh.tS ? 1 : 0 }); },
    over: [(c, lt) => K.dateTag(c, '1949', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'ELI STAYS BEHIND', lt, { at: Sh.tS, x: 1360, y: 150, px: 48, rot: 2 })],
    sfx: [[.1, 'ocean_loop', .25], [.2, 'crowd_loop', .1], [.4, 'footsteps', .3], [2.8, 'creak', .3], ['left', 'horn', .35]] },

  // 1.04 MED: a Cairo police office; Eli sits calmly under a lamp while an officer shouts; then he walks out into the sun
  { set: 'ec_police', cam: (lt, u, Sh) => lt < Sh.tR ? { z: [lerp(1.12, 1.25, seg(lt, 0, Sh.tR))], x: [660], y: [460] } : { z: [1.05], x: [640], y: [420] }, bed: [['hum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tA = at(Sh, 'arrested', 5.5); Sh.tR = at(Sh, 'released', Sh.dur - 2.4); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tR) { const L = CANDLE(lt), sh = Math.sin(lt * 7) > .2 ? 1 : 0;
        S.ecChair(c, 640, 640, 1, 1); fig(c, C.ELIS, 640, 640, 33, Object.assign(VP.sit(C.ELIS, lt * .2, 0, { seat: .4 }), { face: 1, shN: 20, elN: 60 }), lt, 0, L, { look: [.6, -.1], blink: .3 });
        fig(c, C.EGCOP, 880, 670, 35, pose(lt, 1, { face: -1, shN: 60 + 40 * sh, elN: 30, lean: 10 }), lt, 1, L, { look: [-.7, .1], angry: 1, open: sh });
        S.ecDesk(c, 1110, 690, 200); return; }
      VP.drawSet(c, 'sz_cairo'); const L = SUN(lt), w = seg(lt, Sh.tR, Sh.dur);
      fig(c, C.ELIS, lerp(260, 780, w), 660, 34, walk(lt, 0, { face: 1 }), lt, 0, L, { look: [.6, -.3] }); VP.glow(c, 1100, 120, 260, '#fff0c0', .3); },
    over: [(c, lt) => K.dateTag(c, '1954', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'ARRESTED · QUESTIONED', lt, { at: Sh.tA, x: 1360, y: 150, px: 44, rot: 2, until: Sh.tR }), (c, lt, u, Sh) => K.card(c, 'RELEASED', lt, { at: Sh.tR + .3, x: 1360, y: 150, px: 52, rot: 2 })],
    sfx: [[.1, 'hum_loop', .2], [.6, 'door_slam', .3], ['arrested', 'stamp', .4], ['released', 'door_slam', .3], ['released', 'city_loop', .2]] },

  // 1.05 MED: a crowded ship deck; Eli with a small suitcase looks at the Haifa coast
  { set: 'ec_ship', cam: { z: [1.1, 1.18], x: [600, 660], y: [440, 430], ease: E.io }, bed: [['ocean_loop', .3], ['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'israel', Sh.dur - 2.6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), bob = Math.sin(lt * 1.2) * 3;
      c.save(); c.translate(0, bob);
      [[160, C.BROTHER, 30], [300, C.GUESTW, 29], [880, C.CAFE2, 31], [1060, C.EDITOR, 30]].forEach(([x, ch, uu], k) => fig(c, ch, x, 650 + (k % 2) * 14, uu, pose(lt, k + 1, { face: x < 640 ? 1 : -1, shN: 20, elN: 60 }), lt, k + 1, L, { look: [.2, -.3] }));
      fig(c, C.ELIL, 600, 680, 35, pose(lt, 0, { face: 1, shN: 10, elN: 20, holdN: sc(c) }), lt, 0, L, { look: [.6, -.3], smile: lt > Sh.tH ? 1 : 0 }); c.restore(); },
    over: [(c, lt) => K.dateTag(c, '1957', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'HAIFA', lt, { at: Sh.tH, x: 1300, y: 330, px: 46, rot: -2 })],
    sfx: [[.1, 'ocean_loop', .3], [.2, 'wind_loop', .15], ['israel', 'horn', .35]] },
];
VP.build(); K.boot();
</script></body></html>
