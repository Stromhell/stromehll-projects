const PLC = S.ecPlaces;
const stampR = (c, x, y, q, txt = 'REFUSED') => { if (q <= 0) return; c.save(); c.translate(x, y); c.rotate(-.2); const s = lerp(2, 1, E.out(q)); c.scale(s, s); c.globalAlpha = Math.min(1, q * 2); c.strokeStyle = '#c0281a'; c.lineWidth = 6; c.strokeRect(-110, -34, 220, 68); c.fillStyle = '#c0281a'; c.font = '44px Anton'; c.textAlign = 'center'; c.fillText(txt, 0, 16); c.restore(); };
const letter = cc => wr => { cc.save(); cc.translate(wr[0], wr[1]); cc.rotate(-.3); cc.fillStyle = '#f0e8d0'; cc.fillRect(-22, -30, 44, 56); cc.strokeStyle = S.rgba('#3a3a6a', .6); cc.lineWidth = 1.5; for (let k = 0; k < 6; k++) { cc.beginPath(); cc.moveTo(-16, -20 + k * 8); cc.lineTo(16, -20 + k * 8); cc.stroke(); } cc.restore(); };

window.SHOTS = [
  // 4.01 MED: guards walk Eli down a prison corridor; then at the key under guard; then Syria's own message crosses the map
  { set: 'ec2_corridor', cam: (lt, u, Sh) => lt < Sh.tM ? { z: [1.05], x: [640], y: [420] } : lt < Sh.tT ? { z: [1.3], x: [900], y: [470] } : { z: [1.05], x: [620], y: [380] }, bed: [['tension', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'made', 4); Sh.tT = at(Sh, 'then', 8); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tM) { const L = COLD(lt), x = lerp(200, 900, seg(lt, 0, Sh.tM));
        [[C.SYRSOLD, -130, 1], [C.ELIS, 0, 0], [C.SYRSOLD2, 130, 2]].forEach(([ch, dx, k]) => fig(c, ch, x + dx, 668, 34, walk(lt * .7, k, { face: 1, shN: k ? 20 : -10, elN: k ? 30 : 80 }), lt, k, L, { look: [.6, k ? 0 : .4], worry: k ? 0 : 1 })); return; }
      if (lt < Sh.tT) { VP.drawSet(c, 'ec_bedroom'); const L = COLD(lt), pr = Math.max(0, Math.sin(lt * 18));
        S.ecChair(c, 880, 664, 1, 1); fig(c, C.ELIS, 880, 664, 34, Object.assign(VP.sit(C.ELIS, lt * .2, 0, { seat: .4 }), { face: 1, shN: 70, elN: 40, lean: 8 }), lt, 0, L, { look: [.6, .4], worry: 1 });
        fig(c, C.SYROFF3, 720, 668, 35, pose(lt, 1, { face: 1, shN: 30, elN: 60 }), lt, 1, L, { look: [.6, .3], angry: 1 });
        S.ecTable(c, 1060, 664, 170, 70, '#4a3020'); S.ecKey(c, 1010, 588, .55, pr); return; }
      S.ecLevant(c, {}); const q = E.io(seg(lt, Sh.tT + .3, Sh.dur - 1)); S.ecMorse(c, PLC.damascus, PLC.telaviv, q, '#1a1a1a');
      [['DAMASCUS', PLC.damascus, -24], ['TEL AVIV', PLC.telaviv, 40]].forEach(([t, p, dy]) => { c.fillStyle = '#c8402a'; c.beginPath(); c.arc(p[0], p[1], 9, 0, TAU); c.fill(); S.mgLabel(c, t, p[0], p[1] + dy, 1, 30, '#3a2a1a'); }); },
    over: [(c, lt, u, Sh) => K.card(c, 'INTERROGATED FOR WEEKS', lt, { at: .6, x: 1400, y: 150, px: 42, rot: 2, until: Sh.tM }), (c, lt, u, Sh) => K.card(c, 'UNDER GUARD', lt, { at: Sh.tM + .2, x: 1400, y: 150, px: 46, rot: 2, until: Sh.tT }), (c, lt, u, Sh) => K.card(c, '"YOUR AGENT IS OURS"', lt, { at: Sh.tT + 1, x: 1450, y: 160, px: 46, rot: 2 })],
    sfx: [[.1, 'tension', .25], [.2, 'footsteps', .35], ['made', 'morse', .3], ['then', 'morse_loop', .3]] },

  // 4.02 MED: a military court; three officers behind a green table; Eli stands with a guard; the verdict
  { set: 'ec2_court', cam: { z: [1.05, 1.1], x: [680, 700], y: [420, 430], ease: E.io }, bed: [['clock_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tV = at(Sh, 'verdict', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt);
      [[C.SYROFF, 420], [C.SYROFF3, 640], [C.SYROFF2, 860]].forEach(([ch, x], k) => fig(c, ch, x, 505, 32, pose(lt, k + 1, { face: x < 600 ? 1 : x > 700 ? -1 : 1, shN: 20, elN: 60 }), lt, k + 1, L, { look: [0, .2], angry: k === 1 && lt > Sh.tV ? 1 : 0, open: k === 1 && lt > Sh.tV && lt < Sh.tV + 1 ? 1 : 0 }));
      c.fillStyle = '#2a4a2a'; c.fillRect(260, 400, 760, 110); c.fillStyle = '#1a3a1a'; c.fillRect(260, 480, 760, 30); c.fillStyle = '#4a3020'; c.fillRect(260, 392, 760, 12); c.fillStyle = '#4a3020'; c.fillRect(280, 510, 14, 60); c.fillRect(986, 510, 14, 60);
      fig(c, C.ELIS, 1060, 680, 36, pose(lt, 0, { face: -1, shN: 10, elN: 20 }), lt, 0, L, { look: [-.6, -.2], worry: 1 });
      fig(c, C.SYRSOLD, 1170, 676, 35, pose(lt, 4, { face: -1, shN: 20, elN: 40 }), lt, 4, L, { look: [-.6, 0] }); },
    over: [(c, lt) => K.card(c, 'MILITARY COURT', lt, { at: .4, x: 560, y: 150, px: 44, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'VERDICT: DEATH', lt, { at: Sh.tV, x: 1400, y: 150, px: 52, rot: 2 })],
    sfx: [[.1, 'clock_loop', .2], ['verdict', 'gate_slam', .4], ['verdict', 'drum', .35]] },

  // 4.03 TOP: telegrams pile up on a desk from around the world; offers listed; then one red stamp
  { set: 'ec_desktop', cam: { z: [1.02, 1.08], x: [640, 640], y: [360, 360], ease: E.io }, bed: [['typing', .15], ['tension', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'offered', Sh.dur * .55); Sh.tR = at(Sh, 'refused', Sh.dur - 1.2); },
    draw: (c, lt, u, Sh) => { [['ISRAEL', 360, 260, -.12], ['THE VATICAN', 640, 230, .08], ['PARIS', 900, 280, -.06], ['LONDON', 480, 440, .1], ['OTTAWA', 800, 460, -.1]].forEach(([t, x, y, r], k) => { const q = E.out(seg(lt, .4 + k * .9, 1 + k * .9)); if (q <= 0) return; S.ecCard(c, lerp(x, x, q), lerp(-200, y, q), 1.3, 'PLEA: ' + t, r, 1); });
      stampR(c, 640, 360, seg(lt, Sh.tR, Sh.tR + .4)); },
    over: [(c, lt, u, Sh) => K.card(c, 'PRISONERS · MONEY · MEDICINE', lt, { at: Sh.tO, x: 960, y: 960 - 100, px: 42, rot: -1, until: Sh.tR })],
    sfx: [[.1, 'typing', .15], [.2, 'tension', .2], [.5, 'paper', .3], [2.3, 'paper', .3], [4.1, 'paper', .3], ['refused', 'stamp', .6]] },

  // 4.04 MED: the cell at night; a small lamp; Eli on his cot writes a letter
  { set: 'ec2_cell', cam: { z: [1.15, 1.3], x: [380, 420], y: [470, 480], ease: E.io }, bed: [['night_loop', .2], ['music_box', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'mourning', Sh.dur * .5); Sh.tM = at(Sh, 'marry', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => { const L = CANDLE(lt); c.fillStyle = S.rgba('#05081a', .35); c.fillRect(0, 0, 1280, 720);
      fig(c, C.ELIS, 330, 540, 34, Object.assign(VP.sit(C.ELIS, lt * .2, 0, { seat: .4 }), { face: 1, shN: 35 + 4 * Math.sin(lt * 5), elN: 95, shF: 30, elF: 95, holdN: letter(c) }), lt, 0, L, { look: [.4, .6], worry: 1 });
      c.fillStyle = '#5a4a3a'; c.fillRect(520, 560, 70, 60); c.fillStyle = '#c8a040'; c.fillRect(546, 520, 18, 40); VP.glow(c, 555, 515, 220, '#ffc070', .4 + .05 * Math.sin(lt * 7)); c.fillStyle = '#fff0c0'; c.beginPath(); c.arc(555, 512, 9, 0, TAU); c.fill(); },
    over: [(c, lt) => K.card(c, '"MY DEAR NADIA"', lt, { at: .8, x: 1400, y: 150, px: 48, rot: 2 }), (c, lt, u, Sh) => K.card(c, "DON'T MOURN · CARE FOR THE CHILDREN", lt, { at: Sh.tL, x: 1300, y: 260, px: 36, rot: -1, until: Sh.tM }), (c, lt, u, Sh) => K.card(c, 'MARRY AGAIN', lt, { at: Sh.tM, x: 1400, y: 270, px: 44, rot: -2 })],
    sfx: [[.1, 'night_loop', .2], [.2, 'music_box', .15], [.6, 'brush', .2]] },
];
VP.build(); K.boot();
</script></body></html>
