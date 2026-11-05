const sit = (c, ch, x, y, uu, lt, k, L, o = {}, f = {}) => fig(c, ch, x, y, uu, Object.assign(VP.sit(ch, lt * .2, k, { seat: .4 }), o), lt, k, L, f);
const bust = (ch, x, y, w, lt, L, k, f = {}) => cc => fig(cc, ch, x, y - 80 + w * .55 * 7, w * .55, pose(0, k, { face: 1, shN: 4, elN: 6 }), lt, k, L, Object.assign({ look: [.1, 0] }, f));
const folder = cc => wr => { cc.fillStyle = '#3a5a3a'; cc.fillRect(wr[0] - 4, wr[1] - 22, 34, 26); cc.fillStyle = '#f0ece0'; cc.fillRect(wr[0], wr[1] - 20, 26, 4); };

window.SHOTS = [
  // 4.01 MED: the sister at a desk piled with statements signs a page; an aide waits, takes it and hurries out
  { set: 'nk_office', cam: { z: [1.1, 1.18], x: [600, 640], y: [440, 440], ease: E.io }, bed: [['office_loop', .2], ['typing', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tK = at(Sh, 'Kim', Sh.dur - 2.6); Sh.tO = Sh.dur * .55; },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), w = seg(lt, Sh.tO, Sh.dur);
      S.ecChair(c, 520, 664, 1, 1); sit(c, C.KYJ, 520, 664, 33, lt, 0, L, { face: 1, shN: 70 + 6 * Math.sin(lt * 9), elN: 80 }, { look: [.5, .5] });
      S.ecDesk(c, 680, 690, 240); for (let k = 0; k < 4; k++) S.ecCard(c, 640 + k * 22, 588 - k * 3, .32, '', k * .08 - .1, 1);
      fig(c, C.AIDE, w > 0 ? lerp(900, 1450, E.inn(w)) : 900, 668, 34, w > 0 ? walk(lt * 1.4, 1, { face: 1, holdN: folder(c) }) : pose(lt, 1, { face: -1, shN: 20, elN: 60 }), lt, 1, L, { look: w > 0 ? [.6, 0] : [-.6, .2] }); },
    over: [(c, lt) => K.card(c, 'THE SISTER', lt, { at: .6, x: 1450, y: 150, px: 46, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'KIM YO JONG', lt, { at: Sh.tK, x: 1450, y: 260, px: 50, rot: -2 })],
    sfx: [[.1, 'office_loop', .2], [.2, 'typing', .1], [1, 'brush', .25], ['Kim', 'stamp', .35], [5, 'footsteps', .3]] },

  // 4.02 MED: a summit table; she stands just behind her brother and hands him a folder; cameras flash
  { set: 'nk_summit', cam: { z: [1.08, 1.15], x: [640, 660], y: [430, 440], ease: E.io }, bed: [['crowd_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'side', Sh.dur * .6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), h = E.io(seg(lt, Sh.tF - .8, Sh.tF + .2));
      S.ecChair(c, 560, 640, 1, 1); fig(c, C.KYJ, 470, 660, 33, pose(lt, 1, { face: 1, shN: 30 + 60 * h, elN: 60 - 40 * h, holdN: h < .95 ? folder(c) : undefined }), lt, 1, L, { look: [.6, .2] });
      sit(c, C.KIM, 560, 640, 35, lt, 0, L, { face: 1, shN: 30, elN: 70 }, { look: [.4, 0] });
      c.fillStyle = '#5a3a22'; c.fillRect(620, 580, 520, 20); c.fillStyle = '#3a2412'; c.fillRect(630, 600, 14, 70); c.fillRect(1116, 600, 14, 70);
      if (h >= .95) folder(c)([680, 580]);
      [[200, 220], [1100, 260], [900, 160]].forEach(([fx, fy], k) => S.nkFlash(c, fx, fy, ((lt + k * .5) % 1.6) / .5)); },
    over: [(c, lt) => K.card(c, 'PROPAGANDA · FOREIGN POLICY · SUMMITS', lt, { at: .6, x: 1260, y: 150, px: 38, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .1], [1, 'camera_shutter', .3], ['side', 'paper', .35], ['side', 'camera_shutter', .35]] },

  // 4.03 MED: the portrait hall; from the leader's frame, a dotted line to his sister greys out, a solid line to the girl glows
  { set: 'nk_hall', cam: { z: [1.05, 1.1], x: [640, 640], y: [380, 380], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'sister', Sh.dur * .5); Sh.tD = at(Sh, "doesn't", Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), g = seg(lt, Sh.tS, Sh.tS + 1), o = seg(lt, Sh.tD - .3, Sh.tD + .5);
      S.nkPortrait(c, 640, 190, 160, 180, bust(C.KIMY, 640, 100, 160, lt, L, 0));
      S.nkLink(c, [600, 290], [330, 410], E.io(seg(lt, .5, 1.5)), S.mix('#e8c040', '#6a6a6a', g), 1, 5); S.nkLink(c, [680, 290], [950, 410], E.io(seg(lt, 1.5, 2.5)), '#e8c040', 0, 5 + 5 * o);
      c.save(); c.globalAlpha = 1 - .55 * g; S.nkPortrait(c, 330, 500, 150, 170, bust(C.KYJ, 330, 415, 150, lt, L, 1), S.mix('#c8a040', '#7a7a7a', g)); c.restore();
      S.nkPortrait(c, 950, 500, 150, 170, bust(C.GIRLB, 950, 415, 150 * .8, lt, L, 2)); if (o > 0) VP.glow(c, 950, 500, 160, '#ffe090', .4 * o);
      c.fillStyle = '#f0e0b0'; c.font = '28px Oswald'; c.textAlign = 'center'; c.fillText('SISTER', 330, 618); c.fillText('DAUGHTER', 950, 618); c.textAlign = 'left'; },
    over: [(c, lt) => K.card(c, 'BLOODLINE: FATHER → CHILD', lt, { at: .5, x: 1400, y: 120, px: 42, rot: 2 })],
    sfx: [[.1, 'drone', .2], [.6, 'swish', .25], [1.6, 'swish', .25], ['sister', 'whoosh_soft', .3], ["doesn't", 'chime', .4]] },

  // 4.04 MED: a row of generals stands to attention; a small girl in a black coat walks past; their heads turn
  { set: 'nk_meeting', cam: { z: [1.05, 1.1], x: [640, 640], y: [430, 430], ease: E.io }, bed: [['march', .15], ['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'royal', Sh.dur - 2.4); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt), gx = lerp(-60, 1340, seg(lt, 1, Sh.dur));
      [C.GEN1, C.GEN2, C.GEN3, C.GEN4, C.GEN2, C.GEN1, C.GEN3, C.GEN4].forEach((ch, k) => { const x = 150 + k * 140; fig(c, ch, x, 640, 31, pose(lt * .3, k, { face: gx > x ? 1 : -1, shN: 4, elN: 6 }), lt, k, L, { look: [Math.max(-.8, Math.min(.8, (gx - x) / 200)), .1] }); });
      fig(c, C.GIRLB, gx, 684, 28, walk(lt, 9, { face: 1 }), lt, 9, L, { look: [.6, 0] }); },
    over: [(c, lt) => K.card(c, 'NEVER A WOMAN IN CHARGE', lt, { at: 1, x: 1400, y: 150, px: 44, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'A ROYAL LINE', lt, { at: Sh.tR, x: 1400, y: 260, px: 50, rot: -2 })],
    sfx: [[.1, 'march', .15], [.2, 'drone', .15], [1, 'footsteps', .3], ['royal', 'swell', .35]] },
];
VP.build(); K.boot();
</script></body></html>
