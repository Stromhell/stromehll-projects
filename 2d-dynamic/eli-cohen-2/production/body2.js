const baby = cc => wr => { cc.save(); cc.translate(wr[0], wr[1]); cc.fillStyle = '#e8e4f0'; cc.beginPath(); cc.ellipse(0, 4, 26, 14, -.2, 0, TAU); cc.fill(); cc.fillStyle = '#d8a888'; cc.beginPath(); cc.arc(-20, -2, 9, 0, TAU); cc.fill(); cc.restore(); };
const sc = (cc, s = .55) => wr => S.ecSuitcase(cc, wr[0], wr[1] + 34 * s, s);
const clock = (c, x, y, r, t) => { c.fillStyle = '#f0ece0'; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.strokeStyle = '#3a2a1a'; c.lineWidth = 4; c.stroke(); c.lineCap = 'round'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(t) * r * .8, y - Math.cos(t) * r * .8); c.moveTo(x, y); c.lineTo(x + Math.sin(t / 12) * r * .5, y - Math.cos(t / 12) * r * .5); c.stroke(); };

window.SHOTS = [
  // 2.01 MED: a ministry office; the minister laughs with Eli; a rumour card, then NO PROOF
  { set: 'ec2_ministry', cam: { z: [1.08, 1.15], x: [640, 680], y: [430, 440], ease: E.io }, bed: [['office_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'rumours', 2.6); Sh.tP = at(Sh, 'proof', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), talk = Math.sin(lt * 8) > 0 ? 1 : 0;
      fig(c, C.MINISTER, 800, 668, 35, pose(lt, 1, { face: -1, shN: 40 + 20 * Math.sin(lt), elN: 70 }), lt, 1, L, { look: [-.7, 0], smile: 1, open: lt < Sh.tR ? talk : 0 });
      fig(c, C.ELIK, 500, 668, 35, pose(lt, 0, { face: 1, shN: 30, elN: 60 }), lt, 0, L, { look: [.7, 0], smile: 1 }); },
    over: [(c, lt) => K.dateTag(c, 'DAMASCUS · 1964', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'RUMOUR: DEPUTY DEFENCE MINISTER?', lt, { at: Sh.tR, x: 1300, y: 150, px: 40, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'NO PROOF', lt, { at: Sh.tP, x: 1500, y: 260, px: 54, rot: -4 })],
    sfx: [[.1, 'office_loop', .15], [1, 'laugh', .25], ['rumours', 'whisper', .3], ['proof', 'stamp', .45]] },

  // 2.02 MED: the bedroom at night; Eli taps the key while a wall clock spins through the hours; a warning arrives
  { set: 'ec_bedroom', cam: { z: [1.3, 1.4], x: [880, 900], y: [460, 470], ease: E.io }, bed: [['morse_loop', .3], ['clock_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'warned', Sh.dur - 2.4); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt), pr = Math.max(0, Math.sin(lt * 18)) * (Math.sin(lt * 3.1) > -.3 ? 1 : 0);
      clock(c, 470, 330, 40, lt * 3); c.fillStyle = '#f0ece0'; c.fillRect(560, 290, 80, 90); c.fillStyle = '#b82a1a'; c.fillRect(560, 290, 80, 20); c.fillStyle = '#2a2a2a'; c.font = 'bold 40px Oswald'; c.textAlign = 'center'; c.fillText(String(1 + Math.floor(lt * 1.5) % 28), 600, 362); c.textAlign = 'left';
      S.ecChair(c, 880, 664, 1, 1); fig(c, C.ELIK, 880, 664, 34, Object.assign(VP.sit(C.ELIK, lt * .2, 0, { seat: .4 }), { face: 1, shN: 70, elN: 40, shF: 60, elF: 50, lean: 8 }), lt, 0, L, { look: [.6, .4], worry: lt > Sh.tW ? 1 : 0 });
      S.ecTable(c, 1060, 664, 170, 70, '#4a3020'); S.ecTin(c, 1110, 586, .7, 1, 1); S.ecKey(c, 1010, 588, .55, lt > Sh.tW ? 0 : pr); VP.glow(c, 1040, 560, 140, '#ffd890', .28); },
    over: [(c, lt, u, Sh) => K.card(c, 'SAME HOURS · EVERY DAY', lt, { at: 1.5, x: 1400, y: 150, px: 42, rot: 2, until: Sh.tW }), (c, lt, u, Sh) => K.card(c, 'HQ: SLOW DOWN', lt, { at: Sh.tW, x: 1400, y: 150, px: 50, rot: 2 })],
    sfx: [[.1, 'morse_loop', .35], [.2, 'clock_loop', .25], ['warned', 'paper', .35]] },

  // 2.03 MED: a small kitchen in Israel; Nadia holds the baby; a tired Eli at the table reaches out for his son
  { set: 'ec_kitchen', cam: { z: [1.1, 1.18], x: [640, 660], y: [440, 450], ease: E.io }, bed: [['birds_loop', .12], ['music_box', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'tired', 4); Sh.tB = at(Sh, 'barely', Sh.dur - 2.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), r = E.io(seg(lt, Sh.tB - .5, Sh.tB + .8));
      S.ecChair(c, 520, 664, 1, 1); fig(c, C.ELIL, 520, 664, 34, Object.assign(VP.sit(C.ELIL, lt * .2, 0, { seat: .4 }), { face: 1, shN: 20 + 60 * r, elN: 70 - 40 * r }), lt, 0, L, { look: [.6, -.2], worry: lt > Sh.tT ? 1 : 0, blink: lt > Sh.tT && lt < Sh.tB ? .4 : 0 });
      S.ecTable(c, 330, 664, 180, 70, '#8a6a4a', '#e8e0d0'); S.ecGlass(c, 330, 590, 1, .5, '#c8a060');
      fig(c, C.NADIA, 780 - 40 * r, 668, 33, pose(lt, 1, { face: -1, shN: 60, elN: 90, shF: 50, elF: 100, holdN: baby(c) }), lt, 1, L, { look: [-.5, .3], smile: 1 }); },
    over: [(c, lt) => K.dateTag(c, 'ISRAEL · NOVEMBER 1964', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '"I AM TIRED"', lt, { at: Sh.tT, x: 1420, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'birds_loop', .12], [.2, 'music_box', .15], ['barely', 'breath', .25]] },

  // 2.04 MED: an airport gate; Nadia and the baby wave; Eli, suitcase in hand, walks out towards the plane
  { set: 'ec2_airport', cam: { z: [1.05, 1.1], x: [640, 680], y: [420, 420], ease: E.io }, bed: [['crowd_loop', .12], ['engine_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'one', 1.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), w = seg(lt, 1.2, Sh.dur), wave = Math.sin(lt * 6) * 25;
      fig(c, C.NADIA, 320, 668, 33, pose(lt, 1, { face: 1, shN: 150 + wave, elN: 20, shF: 60, elF: 100, holdF: baby(c) }), lt, 1, L, { look: [.6, 0], worry: 1 });
      fig(c, C.HANDLER, 980, 664, 34, pose(lt, 2, { face: -1, shN: 30, elN: 60 }), lt, 2, L, { look: [-.6, 0] });
      fig(c, C.ELIL, lerp(520, 1400, E.inn(w)), 668, 35, walk(lt, 0, { face: 1, holdN: sc(c) }), lt, 0, L, { look: [-.3, 0] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'ONE MORE TIME', lt, { at: Sh.tO, x: 1380, y: 150, px: 50, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .12], [.2, 'engine_loop', .1], [.5, 'footsteps', .3], [3, 'horn', .2]] },
];
VP.build(); K.boot();
</script></body></html>
