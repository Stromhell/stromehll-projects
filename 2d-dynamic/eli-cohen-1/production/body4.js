const glass = (cc, s = 1.1, col) => wr => S.ecGlass(cc, wr[0], wr[1] + 2, s, .6, col);
const bottle = cc => wr => S.ecBottle(cc, wr[0] + 4, wr[1] + 16, .9, '#6a2a1a');
const note = cc => wr => { cc.save(); cc.translate(wr[0], wr[1]); cc.fillStyle = '#f0ece0'; cc.fillRect(-12, -16, 24, 30); cc.fillStyle = '#8a8a8a'; for (let k = 0; k < 4; k++) cc.fillRect(-9, -11 + k * 6, 18, 2); cc.restore(); };
const crate = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#a8865a'; c.fillRect(-40, -56, 80, 56); c.strokeStyle = '#6a4a2a'; c.lineWidth = 3; c.strokeRect(-40, -56, 80, 56); c.beginPath(); c.moveTo(-40, -56); c.lineTo(40, 0); c.stroke(); c.fillStyle = '#3a2a1a'; c.font = '12px Oswald'; c.textAlign = 'center'; c.fillText('EXPORT', 0, -30); c.restore(); };

window.SHOTS = [
  // 4.01 WIDE: Damascus from a hill; domes and minarets; a car drives into the city
  { set: 'ec_damhill', cam: { z: [1.0, 1.06], x: [640, 620], y: [380, 380], ease: E.io }, bed: [['wind_loop', .2], ['city_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; },
    draw: (c, lt, u, Sh) => { const q = seg(lt, 0, Sh.dur), x = lerp(1300, 760, q), y = lerp(548, 488, q); S.ecCar(c, x, y, lerp(.7, .4, q), '#3a4a3a', -1, lt * 8); },
    over: [(c, lt) => K.dateTag(c, 'DAMASCUS · 1962', lt, { at: .3 })],
    sfx: [[.1, 'wind_loop', .2], [.2, 'engine_loop', .25]] },

  // 4.02 MED: his window; across the street a guarded gate with army trucks; Eli behind the curtain with a notebook
  { set: 'ec_hqview', cam: { z: [1.05, 1.12], x: [640, 680], y: [380, 390], ease: E.io }, bed: [['city_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'watch', Sh.dur - 3.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      c.save(); c.beginPath(); c.rect(154, 94, 972, 466); c.clip();
      fig(c, C.SYRSOLD, 470, 500, 14, pose(lt, 1, { face: 1, holdN: S.npMusket ? (wr => S.npMusket(c, wr[0], wr[1], -1.3, .4)) : undefined }), lt, 1, L, { look: [.6, 0] });
      fig(c, C.SYRSOLD2, 790, 500, 14, pose(lt, 2, { face: -1 }), lt, 2, L, { look: [-.6, 0] });
      [0, 1].forEach(k => { const q = seg(lt, .5 + k * 3.5, 4 + k * 3.5); if (q > 0 && q < 1) S.ecTruck(c, lerp(k ? 1500 : -300, k ? -300 : 1500, q), 552, 1.3, k ? -1 : 1, '#5a6a3a', lt * 8); });
      const cq = seg(lt, Sh.tW - 1, Sh.tW + 2.4); if (cq > 0 && cq < 1) S.ecCar(c, lerp(-300, 680, E.out(cq)), 550, 1.25, '#1a1a1a', 1, cq < 1 ? lt * 8 : 0); else if (cq >= 1) S.ecCar(c, 680, 550, 1.25, '#1a1a1a', 1, 0);
      c.restore(); c.fillStyle = '#e8dcc0'; c.fillRect(630, 80, 14, 490);
      fig(c, C.ELIK, 1040, 694, 37, pose(lt, 0, { face: -1, shN: 60, elN: 70, shF: 50, elF: 80, holdN: note(c) }), lt, 0, L, { look: [-.7, -.1] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'ARMY GENERAL HEADQUARTERS', lt, { at: .8, x: 700, y: 130, px: 42, rot: -2 })],
    sfx: [[.1, 'city_loop', .2], [.5, 'engine_loop', .3], [4, 'engine_loop', .25], ['watch', 'paper', .3]] },

  // 4.03 MED: a small office with crates; then a lively party with officers, music and food
  { set: 'ec_office', cam: (lt, u, Sh) => lt < Sh.tP ? { z: [1.2], x: [640], y: [480] } : { z: [1.15], x: [640], y: [470] }, bed: [['office_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tP = at(Sh, 'parties', 2.4); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tP) { const L = SUN(lt); crate(c, 980, 680, 1.4); crate(c, 1100, 690, 1.4); crate(c, 1040, 610, 1.3); S.ecDesk(c, 560, 690, 280); S.ecCard(c, 560, 592, .5, 'THAABET IMPORT-EXPORT', 0, 1);
        fig(c, C.ELIK, 760, 680, 35, pose(lt, 0, { face: -1, shN: 50, elN: 40, lean: 6 }), lt, 0, L, { look: [-.6, .4] }); return; }
      VP.drawSet(c, 'ec_salon'); const L = CANDLE(lt), clap = Math.sin(lt * 8) > 0;
      S.ecTable(c, 640, 600, 260, 60, '#5a3a22', '#e8e0d0'); S.ecPlate(c, 580, 534, 50, '#c86a3a'); S.ecPlate(c, 680, 534, 50, '#7a9a4a'); S.ecBottle(c, 640, 530);
      fig(c, C.SYROFF, 300, 670, 33, pose(lt, 1, { face: 1, shN: clap ? 70 : 60, elN: 60, shF: clap ? 70 : 60, elF: 60 }), lt, 1, L, { look: [.6, 0], smile: 1, open: 1 });
      fig(c, C.GUESTW, 460, 676, 31, pose(lt, 2, { face: 1, shN: 30, elN: 90, holdN: glass(c) }), lt, 2, L, { look: [.5, 0], smile: 1 });
      fig(c, C.ELIK, 820, 676, 35, pose(lt, 0, { face: -1, shN: 150, elN: 20, holdN: glass(c, 1.3) }), lt, 0, L, { look: [-.5, 0], smile: 1 });
      fig(c, C.SYROFF2, 1000, 670, 34, pose(lt, 3, { face: -1, shN: 40, elN: 80, holdN: glass(c) }), lt, 3, L, { look: [-.6, 0], smile: 1, open: clap ? 1 : 0 }); },
    over: [(c, lt) => K.card(c, 'IMPORT-EXPORT', lt, { at: .4, x: 480, y: 150, px: 46, rot: -2 })],
    sfx: [[.1, 'office_loop', .15], ['parties', 'crowd_loop', .3], ['parties', 'waltz', .2], ['parties', 'laugh', .3]] },

  // 4.04 MED: officers talk with their hands; Eli laughs and refills glasses; then the dark bedroom and the radio key
  { set: 'ec_salon', cam: (lt, u, Sh) => lt < Sh.tL ? { z: [lerp(1.2, 1.3, seg(lt, 0, Sh.tL))], x: [640], y: [500] } : { z: [2.3], x: [960], y: [520] }, bed: [['crowd_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'talked', .8); Sh.tH = at(Sh, 'heard', Sh.dur - 1.6); Sh.tL = at(Sh, 'late', Sh.dur - 3.2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tL) { const L = CANDLE(lt);
        [[380, C.SYROFF, 1], [560, C.SYROFF3, 1], [920, C.SYROFF2, -1]].forEach(([x, ch, f], k) => { S.ecChair(c, x, 680, 1.1, f); fig(c, ch, x + f * 16, 680, 33, Object.assign(VP.sit(ch, lt * .3, k + 1, { seat: .4 }), { face: f, shN: 60 + 40 * Math.sin(lt * 3 + k * 2), elN: 40 + 30 * Math.sin(lt * 4 + k) }), lt, k + 1, L, { look: [f * .6, 0], open: Math.sin(lt * 7 + k * 3) > .4 ? 1 : 0 }); });
        S.ecTable(c, 700, 720, 300, 80, '#e8e0d0'); [620, 700, 780].forEach((x, k) => S.ecGlass(c, x, 626, 1.2, .3 + .6 * seg(lt, 1 + k * .6, 1.6 + k * .6)));
        fig(c, C.ELIK, 760, 650, 35, pose(lt, 0, { face: -1, shN: 80, elN: 30, lean: 12, holdN: bottle(c) }), lt, 0, L, { look: [-.5, .4], smile: 1, open: Math.sin(lt * 5) > .7 ? 1 : 0 }); return; }
      VP.drawSet(c, 'ec_bedroom'); const L = NIGHT(lt); S.ecTable(c, 980, 640, 200, 70, '#4a3020'); S.ecTin(c, 1060, 560, .8, 1, 0); S.ecKey(c, 940, 560, .55, Math.max(0, Math.sin(lt * 18))); VP.glow(c, 960, 520, 120, '#ffd890', .3); },
    over: [(c, lt, u, Sh) => K.card(c, 'HE LISTENED', lt, { at: Sh.tH - 2.5, x: 1400, y: 140, px: 50, rot: 2, until: Sh.tL })],
    sfx: [[.1, 'crowd_loop', .2], [.6, 'laugh', .3], [1.2, 'pour', .35], ['late', 'morse_loop', .35]] },

  // 4.05 MED: a plane at night; then a Tel Aviv kitchen: Eli hugs his small children; Nadia smiles
  { set: 'ec_airfield', cam: (lt, u, Sh) => lt < Sh.tN ? { z: [1.05], x: [640], y: [380] } : { z: [1.3], x: [640], y: [500] }, bed: [['engine_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tE = at(Sh, 'europe', 3); Sh.tN = at(Sh, 'nadia', 4.5); Sh.tB = at(Sh, 'believed', Sh.dur - 4); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tN) { const q = seg(lt, 0, Sh.tN); S.ecPlane(c, lerp(-200, 1500, E.inn(q)), lerp(470, 300, Math.max(0, q - .5) * 2), .9, 1, lt, 1); return; }
      VP.drawSet(c, 'ec_kitchen'); const L = SUN(lt), r = seg(lt, Sh.tN, Sh.tN + 1.4), hug = E.io(seg(lt, Sh.tN + 1.2, Sh.tN + 2));
      fig(c, C.NADIA, 900, 670, 31, pose(lt, 2, { face: -1, shN: 20, elN: 70 }), lt, 2, L, { look: [-.6, 0], smile: 1 });
      fig(c, C.ELIS, 560, 680, 35, Object.assign(pose(lt, 0, { face: 1, shN: 40 + 30 * hug, elN: 60 - 20 * hug, shF: 40 + 30 * hug, elF: 60 - 20 * hug, lean: 18 * hug })), lt, 0, L, { look: [.4, .5], smile: 1 });
      [[C.CHILD, 650], [C.CHILD2, 735]].forEach(([ch, x0], k) => { const x = lerp(1000 + k * 80, x0, E.out(r)); fig(c, ch, x, 684 - k * 4, 22, r < 1 ? walk(lt * 1.4, k + 3, { face: -1 }) : pose(lt, k + 3, { face: -1, shN: 80, elN: 30 }), lt, k + 3, L, { look: [-.5, -.6], smile: 1 }); }); },
    over: [(c, lt, u, Sh) => K.card(c, 'VIA EUROPE', lt, { at: Sh.tE - .6, x: 1360, y: 150, px: 48, rot: 2, until: Sh.tN }), (c, lt, u, Sh) => K.card(c, '“BUYING EQUIPMENT ABROAD”', lt, { at: Sh.tB, x: 1300, y: 150, px: 42, rot: 2 })],
    sfx: [[.1, 'engine_loop', .3], ['nadia', 'door_slam', .2], ['nadia', 'laugh', .3], ['believed', 'music_box', .25]] },
];
VP.build(); K.boot();
</script></body></html>
