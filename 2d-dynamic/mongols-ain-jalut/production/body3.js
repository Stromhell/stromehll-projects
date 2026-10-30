const PX = S.mgPX;
const books = (cc, n = 3) => wr => { for (let k = 0; k < n; k++) S.mgBook(cc, wr[0] + 4, wr[1] - 6 - k * 9, .55, .05 * k, ['#7a2a22', '#2a4a7a', '#3a6a3a'][k % 3]); };
const boat = (c, x, y, s, lt) => { c.save(); c.translate(x, y + Math.sin(lt * 1.4 + x) * 2); c.scale(s, s); c.fillStyle = '#4a2e1c'; c.beginPath(); c.moveTo(-60, -10); c.quadraticCurveTo(0, 16, 60, -10); c.lineTo(50, -2); c.quadraticCurveTo(0, 10, -50, -2); c.fill(); c.fillStyle = '#2a1a10'; c.beginPath(); c.arc(-10, -22, 8, 0, TAU); c.fill(); c.fillRect(-16, -16, 12, 12); c.strokeStyle = '#2a1a10'; c.lineWidth = 2; c.beginPath(); c.moveTo(-4, -14); c.lineTo(30, 6); c.stroke(); c.restore(); };
const stone = (c, x, y, r) => { c.fillStyle = '#6a6460'; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.fillStyle = S.rgba('#ffffff', .2); c.beginPath(); c.arc(x - r * .3, y - r * .3, r * .4, 0, TAU); c.fill(); };
const cushion = (c, x, y) => { c.fillStyle = '#2a1a2a'; c.beginPath(); c.roundRect(x - 70, y - 6, 140, 32, 10); c.fill(); c.fillStyle = '#c8a040'; c.fillRect(x - 70, y + 2, 140, 4); };
const toy = (c, x, y) => { c.save(); c.translate(x, y); c.rotate(.3); c.fillStyle = '#a8442a'; c.beginPath(); c.ellipse(0, -10, 16, 10, 0, 0, TAU); c.fill(); c.fillStyle = '#e8c070'; c.beginPath(); c.arc(14, -16, 6, 0, TAU); c.fill(); c.strokeStyle = '#3a2410'; c.lineWidth = 3; c.beginPath(); c.arc(-8, 0, 5, 0, TAU); c.arc(8, 0, 5, 0, TAU); c.stroke(); c.restore(); };

window.SHOTS = [
  // 3.01 WIDE: Baghdad on the Tigris at sunset; boats; scholars carry books along the bank; then the House of Wisdom
  { set: 'mg_baghdad', cam: (lt, u, Sh) => lt < Sh.tH ? { z: [lerp(1.0, 1.08, seg(lt, 0, Sh.tH))], x: [640], y: [380] } : { z: [lerp(1.05, 1.12, seg(lt, Sh.tH, Sh.dur))], x: [640], y: [400] }, bed: [['city_loop', .15], ['water_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'five hundred', 3.5); Sh.tH = at(Sh, 'house of wisdom', 7.5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tH) { const L = DUSK(lt); boat(c, (200 + lt * 18) % 1400, 520, 1, lt); boat(c, 1100 - (lt * 12) % 1400, 556, .8, lt);
        [C.SCHOLAR, C.SCHOLAR2, C.SCRIBE].forEach((ch, k) => { const x = -60 + ((lt * 30 + k * 160) % 1500); if (x > 1340) return; fig(c, ch, x, 660 + (k % 2) * 16, 30, walk(lt, k, { face: 1, shN: 40, elN: 100, holdN: books(c, 2 + k % 2) }), lt, k, L, { look: [.6, 0] }); });
        VP.motes(c, lt, 0, 300, 1280, 300, { n: 12 }); return; }
      VP.drawSet(c, 'library'); const L = CANDLE(lt);
      c.fillStyle = '#5a3a1e'; c.fillRect(420, 600, 440, 14); c.fillRect(440, 614, 12, 60); c.fillRect(828, 614, 12, 60);
      fig(c, C.SCHOLAR, 330, 690, 34, pose(lt, 1, { face: 1, shN: 40, elN: 100, holdN: books(c, 3) }), lt, 1, L, { look: [.6, .2] });
      fig(c, C.SCHOLAR2, 640, 690, 34, pose(lt, 2, { face: -1, shN: 50, elN: 70, lean: 8 }), lt, 2, L, { look: [-.2, .6] }); S.mgScroll(c, 600, 594, .7, 1, 1.5);
      const w = seg(lt, Sh.tH + .3, Sh.dur - 1); fig(c, C.SCRIBE, lerp(1340, 960, E.out(w)), 690, 34, w < 1 ? walk(lt, 3, { face: -1, shN: 40, elN: 100, holdN: books(c, 2) }) : pose(lt, 3, { face: -1, shN: 40, elN: 100, holdN: books(c, 2) }), lt, 3, L, { look: [-.6, 0] }); },
    over: [(c, lt) => K.dateTag(c, 'BAGHDAD', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'CAPITAL FOR 500 YEARS', lt, { at: Sh.tF, x: 1340, y: 150, px: 46, rot: -2, until: Sh.tH }), (c, lt, u, Sh) => K.card(c, 'THE HOUSE OF WISDOM', lt, { at: Sh.tH + .2, x: 960, y: 140, px: 54 })],
    sfx: [[.2, 'city_loop', .15], [.3, 'water_loop', .15], ['five hundred', 'chime', .3], ['house of wisdom', 'paper', .35]] },

  // 3.02 MED: the caliph on a cushioned seat waves away a worried general holding a map
  { set: 'throne', cam: { z: [1.12, 1.2], x: [640, 660], y: [450, 450], ease: E.io }, bed: [['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'weak army', 4); Sh.tR = at(Sh, 'rise', 7); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), wave = lt > Sh.tR ? Math.sin(lt * 6) : 0;
      cushion(c, 560, 600); fig(c, C.CALIPH, 560, 600, 36, Object.assign(VP.sit(C.CALIPH, lt * .3, 2, { seat: .2 }), { face: 1, shN: lt > Sh.tR ? 70 + 20 * wave : 20, elN: lt > Sh.tR ? 40 : 30 }), lt, 0, L, { look: [.6, -.2], smile: lt > Sh.tR ? .4 : 0 });
      const w = seg(lt, .3, 2.5); fig(c, C.GENERAL, lerp(1340, 860, E.out(w)), 670, 36, w < 1 ? walk(lt, 1, { face: -1 }) : pose(lt, 1, { face: -1, shN: 60, elN: 60, lean: 6 }), lt, 1, L, { look: [-.7, -.1], worry: 1 });
      if (w >= 1) { c.save(); c.translate(800, 520); c.rotate(-.1); K.parchment(c, -60, -40, 120, 80); c.strokeStyle = '#8a5a2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(-40, 0); c.quadraticCurveTo(0, -30, 40, 10); c.stroke(); c.restore(); }
      fig(c, C.COURTIER, 320, 670, 32, pose(lt, 3, { face: 1, shN: 10, elN: 40 }), lt, 3, L, { look: [.6, 0] }); },
    over: [(c, lt) => K.card(c, "CALIPH AL-MUSTA'SIM", lt, { at: .6, x: 520, y: 150, px: 50, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'WEAK ARMY', lt, { at: Sh.tW, x: 1360, y: 160, px: 46, rot: 2 })],
    sfx: [[.2, 'drone', .15], [.5, 'footsteps', .3], ['weak army', 'tick', .3], ['rise', 'paper', .3]] },

  // 3.03 WIDE: siege engines on the riverbank; stones arc over the walls; then a white flag over the gate
  { set: 'mg_baghdad', cam: (lt, u, Sh) => lt < Sh.tS ? { z: [lerp(1.0, 1.06, seg(lt, 0, Sh.tS))], x: [640], y: [400] } : { z: [1.1], x: [640], y: [380] }, bed: [['battle_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'chinese', 2); Sh.tS = at(Sh, 'tenth', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tS) { const L = DUSK(lt); c.fillStyle = S.rgba('#3a2a3a', .2); c.fillRect(0, 0, 1280, 720);
        [[260, 0], [700, .9]].forEach(([x, ph]) => { const f = ((lt * .5 + ph) % 1.6); const fire = f < .4 ? E.io(f / .4) : 1 - seg(f, .4, 1.6) * 1; S.mgTrebuchet(c, x, 640, .9, fire, 1);
          const q = seg(f, .25, 1.1); if (q > 0 && q < 1) stone(c, lerp(x + 140, x + 380, q), 500 - Math.sin(q * Math.PI) * 300 + q * 30, 9); });
        fig(c, C.CHINESE, 470, 680, 30, pose(lt, 1, { face: 1, shN: 80, elN: 20 }), lt, 1, L, { look: [.5, -.4] });
        fig(c, C.MONGOL, 980, 680, 30, pose(lt, 2, { face: -1, holdN: S.mgSpear(c, -1.45) }), lt, 2, L, { look: [-.4, -.3] });
        fig(c, C.MONGOL2, 1100, 690, 30, pose(lt, 3, { face: -1, shN: 30, elN: 60 }), lt, 3, L, { look: [-.6, -.3] });
        S.mgSmoke(c, lt, 400, 420, 5, .35); S.mgSmoke(c, lt + 3, 900, 430, 5, .35); return; }
      VP.drawSet(c, 'towngate'); const L = GREY(lt); S.mgFlag(c, 640, 330, 110, lt); },
    over: [(c, lt, u, Sh) => K.card(c, 'CHINESE SIEGE ENGINEERS', lt, { at: Sh.tC, x: 520, y: 150, px: 44, rot: -2, until: Sh.tS }), (c, lt, u, Sh) => K.dateTag(c, '10 FEB 1258', lt, { at: Sh.tS + .3 })],
    sfx: [[.2, 'battle_loop', .2], [.6, 'creak', .3], [1.2, 'thud', .35], [3.2, 'thud', .35], ['tenth', 'bell', .4]] },

  // 3.04 MED: empty streets full of smoke; a dropped child's toy; doors hanging open
  { set: 'mg_alley', cam: { z: [1.0, 1.12], x: [640, 640], y: [420, 440], ease: E.io }, bed: [['fire_loop', .2], ['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tE = at(Sh, 'estimates', 3.5); },
    draw: (c, lt) => { c.fillStyle = S.rgba('#3a2a1a', .25); c.fillRect(0, 0, 1280, 720); toy(c, 780, 606); S.mgBook(c, 470, 612, .9, .5); S.mgBook(c, 640, 590, .7, -.3, '#2a4a7a');
      S.mgSmoke(c, lt, 200, 560, 7, .45); S.mgSmoke(c, lt + 2, 1080, 560, 7, .45); S.mgSmoke(c, lt + 4, 640, 500, 5, .3); VP.glow(c, 640, 420, 200, '#ff9a40', .2 + .1 * Math.sin(lt * 3)); },
    over: [(c, lt, u, Sh) => K.card(c, 'TENS OF THOUSANDS → HUNDREDS OF THOUSANDS?', lt, { at: Sh.tE, x: 960, y: 150, px: 42, rot: -1 })],
    sfx: [[.2, 'fire_loop', .2], [.3, 'wind_loop', .3], [1.5, 'creak', .3], ['estimates', 'drone', .3]] },

  // 3.05 MED: pages and books float on the dark river; ink spreads in the water
  { set: 'mg_baghdad', cam: { z: [1.8, 1.9], x: [640, 660], y: [560, 560], ease: E.io }, bed: [['water_loop', .35]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'later writers', 3); },
    draw: (c, lt, u, Sh) => { const ink = seg(lt, .5, Sh.dur);
      c.fillStyle = S.rgba('#1a1a2a', .35 + .3 * ink); c.fillRect(0, 470, 1280, 120);
      for (let k = 0; k < 9; k++) { const x = (k * 140 + lt * 14) % 1400 - 60, y = 500 + (k * 37) % 70; c.fillStyle = S.rgba('#0a0a14', .25 * ink); c.beginPath(); c.ellipse(x - 20, y + 4, 30 + 40 * ink, 8 + 6 * ink, 0, 0, TAU); c.fill(); S.mgBook(c, x, y + Math.sin(lt * 1.5 + k) * 3, .9, Math.sin(lt * .5 + k) * .4, ['#7a2a22', '#2a4a7a', '#3a6a3a', '#6a4a2a'][k % 4]); }
      for (let k = 0; k < 6; k++) { const x = (k * 220 + 80 + lt * 10) % 1400 - 60, y = 540 + (k * 23) % 40; c.save(); c.translate(x, y); c.rotate(Math.sin(lt + k) * .3); c.fillStyle = '#efe2c0'; c.fillRect(-14, -9, 28, 18); c.restore(); } },
    over: [(c, lt, u, Sh) => K.card(c, '“THE TIGRIS RAN BLACK WITH INK”', lt, { at: Sh.tL, x: 960, y: 150, px: 46, rot: -1 }), (c, lt, u, Sh) => K.card(c, '(LATER CHRONICLERS)', lt, { at: Sh.tL + .6, x: 960, y: 230, px: 30, rot: 1 })],
    sfx: [[.2, 'water_loop', .35], [1, 'splash', .3], [3.5, 'splash', .25], ['ink', 'drone', .3]] },

  // 3.06 MED: a rolled carpet on the ground; horses pass in the dust beyond; then the empty seat of the caliphs
  { set: 'mg_camp', cam: (lt, u, Sh) => lt < Sh.tA ? { z: [lerp(1.05, 1.12, seg(lt, 0, Sh.tA))], x: [640], y: [460] } : { z: [lerp(1.1, 1.2, seg(lt, Sh.tA, Sh.dur))], x: [600], y: [440] }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tA = at(Sh, 'abbasid caliphate', Sh.dur - 3.5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tA) { const L = GREY(lt);
        for (let i = 0; i < 3; i++) { const x = -200 + ((lt * 60 + i * 520) % 1700); VP.horse(c, x, 500, 96, { face: 1, walk: 1, ph: lt * 1.2 + i * .4, t: lt, col: i % 2 ? GREYH : BAY }); }
        S.mgDust(c, lt, 0, 520, 1280, .35); S.mgCarpet(c, 640, 590, 1.0); return; }
      VP.drawSet(c, 'throne'); const L = SUN(lt); cushion(c, 640, 586); VP.motes(c, lt, 400, 300, 480, 300, { n: 10 }); },
    over: [(c, lt, u, Sh) => K.card(c, '“NO ROYAL BLOOD SPILT”', lt, { at: 4, x: 1340, y: 150, px: 44, rot: 2, until: Sh.tA }), (c, lt, u, Sh) => K.card(c, 'THE END OF THE ABBASIDS IN BAGHDAD', lt, { at: Sh.tA + .3, x: 960, y: 150, px: 50 })],
    sfx: [[.2, 'wind_loop', .3], [.4, 'hooves_loop', .35], ['abbasid caliphate', 'drum', .45]] },
];
VP.build(); K.boot();
</script></body></html>
