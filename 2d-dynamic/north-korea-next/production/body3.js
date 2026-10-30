const sit = (c, ch, x, y, uu, lt, k, L, o = {}, f = {}) => fig(c, ch, x, y, uu, Object.assign(VP.sit(ch, lt * .2, k, { seat: .4 }), o), lt, k, L, f);
const bust = (ch, x, y, w, h, lt, L, k, f = {}) => cc => fig(cc, ch, x, y - 80 + w * .55 * 7, w * .55, pose(0, k, { face: 1, shN: 4, elN: 6 }), lt, k, L, Object.assign({ look: [.1, 0] }, f));

window.SHOTS = [
  // 3.01 MED: a red hall of portraits; grandfather, father, son; gold arrows draw on to an empty frame
  { set: 'nk_hall', cam: { z: [1.05, 1.12], x: [640, 700], y: [380, 380], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tD = at(Sh, 'died', Sh.dur * .5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), F = [[230, C.KIS, '1948'], [500, C.KJI, '1994'], [770, C.KIMY, '2011'], [1040, null, '?']];
      F.forEach(([x, ch, y], k) => { const q = seg(lt, k * .8, .5 + k * .8); if (q <= 0) return; c.save(); c.globalAlpha = q; S.nkPortrait(c, x, 300, 180, 230, ch ? bust(ch, x, 300 - 115, 180, 230, lt, L, k) : null, '#c8a040', ch ? '#c8b898' : '#3a1418'); c.fillStyle = '#f0e0b0'; c.font = '34px Oswald'; c.textAlign = 'center'; c.fillText(y, x, 470); c.restore(); if (!ch) S.nkQ(c, x, 300, 1.3, q); });
      for (let k = 0; k < 3; k++) S.nkLink(c, [F[k][0] + 100, 300], [F[k + 1][0] - 100, 300], E.io(seg(lt, 1 + k * 1.2, 2 + k * 1.2)), '#e8c040'); },
    over: [(c, lt, u, Sh) => K.card(c, 'FATHER TO SON · TWICE', lt, { at: 1.2, x: 1400, y: 120, px: 42, rot: 2, until: Sh.tD }), (c, lt, u, Sh) => K.card(c, '2011: LATE 20s, ALMOST UNKNOWN', lt, { at: Sh.tD, x: 1300, y: 120, px: 40, rot: 2 })],
    sfx: [[.1, 'drone', .2], [1, 'swish', .25], [2.2, 'swish', .25], [3.4, 'swish', .25], ['died', 'bell', .3]] },

  // 3.02 MED: the young leader at the head of a long table; older generals glance at each other, then leave one by one
  { set: 'nk_meeting', cam: { z: [1.05, 1.1], x: [640, 640], y: [430, 430], ease: E.io }, bed: [['clock_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tP = at(Sh, 'push', Sh.dur * .45); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt), G = [C.GEN1, C.GEN4, C.GEN3, C.GEN2];
      G.forEach((ch, k) => { const x0 = 520 + k * 150, t0 = Sh.tP + k * .9, w = seg(lt, t0, t0 + 2.4); S.ecChair(c, x0, 640, 1, -1);
        if (w <= 0) sit(c, ch, x0, 640, 32, lt, k + 1, L, { face: -1, shN: 30, elN: 70 }, { look: [k % 2 ? .4 : -.6, 0], worry: lt > 2 ? 1 : 0 });
        else if (w < 1) fig(c, ch, lerp(x0, 1450, w), 668, 33, walk(lt, k + 1, { face: 1 }), lt, k + 1, L, { look: [.6, 0] }); });
      S.ecChair(c, 330, 640, 1, 1); sit(c, C.KIMY, 330, 640, 34, lt, 0, L, { face: 1, shN: 30, elN: 70 }, { look: [.6, 0], angry: lt > Sh.tP ? 1 : 0 });
      c.fillStyle = '#5a3a22'; c.fillRect(400, 590, 700, 20); c.fillStyle = '#3a2412'; c.fillRect(410, 610, 14, 60); c.fillRect(1076, 610, 14, 60); },
    over: [(c, lt) => K.card(c, 'MONTHS OF PREPARATION', lt, { at: .5, x: 1400, y: 150, px: 44, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'GENERALS · RELATIVES PUSHED ASIDE', lt, { at: Sh.tP + 1, x: 1300, y: 260, px: 38, rot: -2 })],
    sfx: [[.1, 'clock_loop', .2], ['push', 'creak', .3], ['push', 'footsteps', .3], ['generals', 'door_slam', .25]] },

  // 3.03 MED: an office at night; the leader smokes at his desk; a medical chart with a wobbling heart line
  { set: 'nk_office', cam: { z: [1.15, 1.25], x: [560, 600], y: [450, 450], ease: E.io }, bed: [['night_loop', .2], ['heartbeat', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'health', 4); Sh.tR = at(Sh, 'heart', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt); c.fillStyle = S.rgba('#0a1030', .45); c.fillRect(0, 0, 1280, 720); VP.glow(c, 560, 520, 220, '#ffd890', .3);
      S.ecChair(c, 470, 664, 1.1, 1); sit(c, C.KIM, 470, 664, 36, lt, 0, L, { face: 1, shN: 60 + 30 * Math.max(0, Math.sin(lt * .8)), elN: 120, lean: 6 }, { look: [.5, .3], blink: .2 });
      S.ecDesk(c, 680, 690, 260); S.nkAsh(c, 640, 596, lt); S.ecBottle(c, 720, 596, 1, '#5a3a1a'); S.ecGlass(c, 760, 598, 1, .4, '#c89040');
      if (lt > Sh.tR) { const q = seg(lt, Sh.tR, Sh.tR + .5); c.save(); c.globalAlpha = q; c.fillStyle = '#f0ece0'; c.fillRect(220, 110, 360, 200); c.strokeStyle = '#c82a1a'; c.lineWidth = 4; c.beginPath(); for (let x = 0; x <= 320; x += 4) { const p = (x + lt * 120) % 80, y = p > 30 && p < 40 ? -60 * Math.sin((p - 30) / 10 * Math.PI) * (1 + .4 * Math.sin(lt * 3)) : 0; x ? c.lineTo(240 + x, 220 + y) : c.moveTo(240, 220 + y); } c.stroke(); c.restore(); } },
    over: [(c, lt, u, Sh) => K.card(c, 'SMOKING · DRINKING · WEIGHT', lt, { at: Sh.tH + 2, x: 1350, y: 150, px: 42, rot: 2, until: Sh.tR }), (c, lt, u, Sh) => K.card(c, 'HEART PROBLEMS RUN IN THE FAMILY', lt, { at: Sh.tR + .4, x: 1300, y: 150, px: 38, rot: 2 })],
    sfx: [[.1, 'night_loop', .2], [.5, 'breath', .2], ['heart', 'heartbeat', .35]] },

  // 3.04 WIDE: a big poster of father and daughter before a rising sun; the camera pulls back to empty market stalls
  { set: 'nk_street', cam: { z: [2.0, 1.05], x: [640, 640], y: [250, 400], ease: E.io }, bed: [['wind_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'shortages', Sh.dur - 3.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      c.fillStyle = '#5a5a5a'; c.fillRect(500, 340, 10, 120); c.fillRect(770, 340, 10, 120);
      S.nkPortrait(c, 640, 250, 400, 200, cc => { cc.fillStyle = '#e8b040'; cc.fillRect(440, 150, 400, 200); for (let k = 0; k < 14; k++) { cc.fillStyle = k % 2 ? '#d84030' : '#e8803a'; cc.beginPath(); cc.moveTo(640, 340); const a = Math.PI + k / 14 * Math.PI; cc.lineTo(640 + Math.cos(a) * 400, 340 + Math.sin(a) * 400); cc.lineTo(640 + Math.cos(a + .22) * 400, 340 + Math.sin(a + .22) * 400); cc.fill(); }
        fig(cc, C.KIM, 600, 400, 34, pose(0, 0, { face: 1, shN: 8, elN: 10 }), 0, 0, L, { smile: 1 }); fig(cc, C.GIRL, 660, 400, 24, pose(0, 1, { face: -1, shN: -40, elN: 10 }), 0, 1, L, { smile: 1 }); }, '#c82a1a');
      [200, 470, 740, 1010].forEach(x => S.nkStall(c, x, 640, 1, 0)); fig(c, C.RSJ, 1180, 668, 32, pose(lt, 2, { face: -1, shN: 20, elN: 60 }), lt, 2, L, { look: [-.6, .3], worry: 1 }); },
    over: [(c, lt) => K.card(c, 'A FAMILY MAN', lt, { at: 1, x: 1450, y: 150, px: 46, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'SHORTAGES · CLOSED BORDERS', lt, { at: Sh.tS, x: 1350, y: 260, px: 40, rot: -2 })],
    sfx: [[.1, 'wind_loop', .2], [1, 'swell', .25], ['shortages', 'whoosh_soft', .3]] },
];
VP.build(); K.boot();
</script></body></html>
