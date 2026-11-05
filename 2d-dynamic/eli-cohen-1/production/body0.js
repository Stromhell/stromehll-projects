const PLC = S.ecPlaces;
const glass = (cc, s = 1.2) => wr => S.ecGlass(cc, wr[0], wr[1] + 2, s);
const hand = (c, kx, ky, press) => { const d = press * 4; c.save(); c.translate(0, d); c.fillStyle = '#3a3a44'; c.beginPath(); c.moveTo(1010, 470); c.lineTo(1300, 330); c.lineTo(1300, 420); c.lineTo(1030, 530); c.fill(); c.fillStyle = '#f0ece0'; c.beginPath(); c.moveTo(1004, 476); c.lineTo(1024, 466); c.lineTo(1040, 524); c.lineTo(1022, 534); c.fill();
  c.fillStyle = '#c89a78'; c.beginPath(); c.ellipse(kx + 30, ky - 30, 30, 20, -.5, 0, TAU); c.fill(); c.strokeStyle = '#c89a78'; c.lineCap = 'round'; c.lineWidth = 10; c.beginPath(); c.moveTo(kx + 14, ky - 22); c.lineTo(kx + 1, ky - 6); c.stroke(); c.lineWidth = 9; c.beginPath(); c.moveTo(kx + 26, ky - 14); c.lineTo(kx + 18, ky - 2); c.stroke(); c.strokeStyle = '#b8886a'; c.lineWidth = 2; c.beginPath(); c.arc(kx + 30, ky - 30, 18, 2.2, 3.4); c.stroke(); c.restore(); };

window.SHOTS = [
  // 0.01 MED: a rooftop party at night; officers, men in suits, music; the smiling host raises a glass
  { set: 'ec_roof', cam: { z: [1.22, 1.3], x: [640, 660], y: [470, 470], ease: E.io }, bed: [['crowd_loop', .2], ['waltz', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tK = at(Sh, 'kamel', Sh.dur - 2.6); Sh.tR = at(Sh, 'parties', 3); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt), up = E.io(seg(lt, Sh.tK - .6, Sh.tK + .3));
      S.ecTable(c, 300, 560, 180, 56, '#5a3a22', '#e8e0d0'); S.ecTable(c, 990, 560, 180, 56, '#5a3a22', '#e8e0d0'); S.ecBottle(c, 270, 496); S.ecGlass(c, 320, 496); S.ecPlate(c, 350, 500); S.ecBottle(c, 1010, 496, 1, '#6a2a1a'); S.ecGlass(c, 960, 496); S.ecPlate(c, 1040, 500, 40, '#7a9a4a');
      fig(c, C.SYROFF, 180, 660, 33, pose(lt, 1, { face: 1, shN: 40, elN: 80, holdN: glass(c) }), lt, 1, L, { look: [.6, 0], smile: 1 });
      fig(c, C.GUESTW, 380, 670, 31, pose(lt, 2, { face: 1, shN: 30, elN: 90, holdN: glass(c) }), lt, 2, L, { look: [.5, 0], smile: 1, open: lt > Sh.tR && lt < Sh.tR + 1 ? 1 : 0 });
      fig(c, C.ELIK, 640, 660, 35, pose(lt, 0, { face: 1, shN: 40 + 110 * up, elN: 70 - 50 * up, holdN: glass(c, 1.3) }), lt, 0, L, { look: [.1, 0], smile: 1 });
      fig(c, C.MINISTER, 880, 670, 34, pose(lt, 3, { face: -1, shN: 30, elN: 80, holdN: glass(c) }), lt, 3, L, { look: [-.5, 0], smile: 1, open: lt > Sh.tR + 1.5 && lt < Sh.tR + 2.3 ? 1 : 0 });
      fig(c, C.SYROFF2, 1080, 660, 34, pose(lt, 4, { face: -1, shN: 50 + 60 * up, elN: 60, holdN: glass(c) }), lt, 4, L, { look: [-.6, 0], smile: 1 }); },
    over: [(c, lt) => K.dateTag(c, 'DAMASCUS · 1960s', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'KAMEL AMIN THAABET', lt, { at: Sh.tK, x: 960, y: 150, px: 52, rot: -2 })],
    sfx: [[.1, 'crowd_loop', .2], [.2, 'waltz', .15], ['parties', 'laugh', .3], ['kamel', 'chime', .35]] },

  // 0.02 MED: the empty party room; then a bedroom, he lifts a false bottom from a tea tin and wires up a Morse key
  { set: 'ec_salon', cam: (lt, u, Sh) => lt < Sh.tB ? { z: [1.05], x: [640], y: [420] } : { z: [lerp(1.15, 1.45, E.io(seg(lt, Sh.tB, Sh.dur)))], x: [lerp(820, 900, E.io(seg(lt, Sh.tB, Sh.dur)))], y: [480] }, bed: [['night_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'bedroom', 3.2); Sh.tT = at(Sh, 'tea', 4.6); Sh.tR = at(Sh, 'radio', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tB) { const L = CANDLE(lt), go = seg(lt, .3, Sh.tB);
        S.ecTable(c, 420, 600, 200, 60, '#5a3a22', '#e8e0d0'); S.ecGlass(c, 380, 530, 1, .2); S.ecGlass(c, 440, 530, 1, 0); S.ecPlate(c, 480, 534, 40, '#8a6a4a'); S.ecChair(c, 300, 640, 1, 1); S.ecChair(c, 560, 640, 1, -1);
        fig(c, C.ELIK, lerp(820, 1420, go), 670, 34, walk(lt, 0, { face: 1 }), lt, 0, L, { look: [.6, 0] }); return; }
      VP.drawSet(c, 'ec_bedroom'); const L = NIGHT(lt), w = seg(lt, Sh.tB, Sh.tB + 1.4), tin = E.io(seg(lt, Sh.tT - .4, Sh.tT + .6)), fb = E.io(seg(lt, Sh.tT + .8, Sh.tT + 1.8)), key = E.out(seg(lt, Sh.tR - .6, Sh.tR + .4));
      S.ecTable(c, 980, 640, 200, 70, '#4a3020');
      fig(c, C.ELIK, lerp(560, 840, E.out(w)), 680, 36, w < 1 ? walk(lt, 0, { face: 1 }) : pose(lt, 0, { face: 1, shN: 70, elN: 50, shF: 60, elF: 60, lean: 10 }), lt, 0, L, { look: [.5, .4] });
      S.ecKey(c, lerp(1010, 920, E.io(seg(lt, Sh.tT + .8, Sh.tR + .2))), 560, .55, 0, key > .9); S.ecTin(c, 1010, 560, .8, tin, 0);
      VP.glow(c, 980, 520, 160, '#ffd890', .25); },
    over: [],
    sfx: [[.2, 'night_loop', .2], [.3, 'footsteps', .3], ['bedroom', 'door_slam', .15], ['tea', 'scrape', .35], ['radio', 'clank', .3]] },

  // 0.03 CU: his finger taps the key; the dots and dashes become a line across a map from Damascus to Tel Aviv
  { set: 'ec_bedroom', cam: (lt, u, Sh) => lt < Sh.tI ? { z: [lerp(2.4, 2.6, seg(lt, 0, Sh.tI))], x: [960], y: [520] } : { z: [lerp(1.05, 1.15, seg(lt, Sh.tI, Sh.dur))], x: [620], y: [380] }, bed: [['morse_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tI = at(Sh, 'israel', 2.4); Sh.tE = at(Sh, 'eli', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tI) { const L = NIGHT(lt); S.ecTable(c, 980, 640, 200, 70, '#4a3020'); S.ecTin(c, 1060, 560, .8, 1, 1); const pr = Math.max(0, Math.sin(lt * 18)) * (Math.sin(lt * 3.1) > -.3 ? 1 : 0); S.ecKey(c, 940, 560, .55, pr); hand(c, 962, 540, pr); VP.glow(c, 960, 520, 120, '#ffd890', .3); return; }
      S.ecLevant(c, { golan: 0 }); const q = E.io(seg(lt, Sh.tI + .2, Sh.tE));
      S.ecMorse(c, PLC.damascus, PLC.telaviv, q);
      [['DAMASCUS', PLC.damascus, -24], ['TEL AVIV', PLC.telaviv, 40]].forEach(([t, p, dy]) => { c.fillStyle = '#c8402a'; c.beginPath(); c.arc(p[0], p[1], 9, 0, TAU); c.fill(); S.mgLabel(c, t, p[0], p[1] + dy, 1, 30, '#3a2a1a'); });
      if (q >= 1) VP.glow(c, PLC.telaviv[0], PLC.telaviv[1], 60, '#ff6040', .4 + .3 * Math.sin(lt * 8)); },
    over: [(c, lt, u, Sh) => K.card(c, 'AGENT 88', lt, { at: Sh.tI + .6, x: 1500, y: 160, px: 56, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'ELI COHEN', lt, { at: Sh.tE, x: 1400, y: 860, px: 64, rot: -2 })],
    sfx: [[.1, 'morse_loop', .35], ['israel', 'whoosh', .3], ['eli', 'drum', .45]] },

  // 0.04 TITLE: the tea tin on the windowsill, Damascus rooftops beyond
  { set: 'ec_bedroom', cam: { z: [2.5, 2.65], x: [880, 880], y: [290, 296], ease: E.io }, bed: [['night_loop', .25]],
    draw: (c, lt) => { S.ecTin(c, 830, 382, .55, 0, 0); VP.glow(c, 940, 160, 60, '#f0f0d8', .3); },
    over: [(c, lt) => { const q = seg(lt, .8, 1.8); if (q <= 0) return; c.save(); c.globalAlpha = q; c.font = '92px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 20; c.fillText('THE SPY WHO FOOLED', 960, 190); c.fillText('AN ENTIRE COUNTRY', 960, 300); c.restore(); }],
    sfx: [[.2, 'night_loop', .25], [.4, 'morse', .2], [.8, 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
