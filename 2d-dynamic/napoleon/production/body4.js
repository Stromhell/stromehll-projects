const paper = (cc, wr, tear = 0) => { cc.save(); cc.translate(wr[0], wr[1]); cc.fillStyle = '#f0e8d0'; if (tear > 0) { cc.save(); cc.rotate(-.3 * tear); cc.fillRect(-26 - 10 * tear, -18, 24, 34); cc.restore(); cc.save(); cc.rotate(.3 * tear); cc.fillRect(0 + 10 * tear, -18, 24, 34); cc.restore(); } else cc.fillRect(-24, -18, 48, 34); cc.restore(); };
const ally = (shirt, hat) => Object.assign({}, C.FR, { shirt, headwear: hat });
const ARMY = [C.FR, ally(['#2a2a6a', '#141434'], S.SPX.furcap ? S.SPX.furcap(null) : null), C.GUARD, ally(['#2a6a3a', '#14341c'], null), C.FR2, ally(['#e8e4da', '#a8a294'], null), C.FR, ally(['#6a1a24', '#340c12'], null)];
const tears = (c, x, y, lt) => { for (let k = 0; k < 2; k++) { const q = (lt * .8 + k * .5) % 1; c.fillStyle = S.rgba('#a8d0f0', .9 * (1 - q)); c.beginPath(); c.arc(x + k * 8, y + q * 30, 2.5, 0, TAU); c.fill(); } };

window.SHOTS = [
  // 4.01 MED: Josephine in tears signs the divorce; a royal wedding with Marie Louise; a baby in a golden cradle
  { set: 'sz_palace', cam: { z: [1.05, 1.12], x: [640, 640], y: [420, 430], ease: E.io }, bed: [['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tD = at(Sh, 'divorced', 4); Sh.tM = at(Sh, 'married', 5.5); Sh.tH = at(Sh, 'heir', Sh.dur - 1.2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      if (lt < Sh.tM) { c.fillStyle = '#5a3a24'; c.fillRect(470, 560, 220, 16); c.fillRect(486, 574, 12, 60); c.fillRect(664, 574, 12, 60); c.fillStyle = '#f0e8d0'; c.fillRect(540, 550, 60, 10);
        fig(c, C.JOSEPHINE, 420, 640, 40, pose(lt, 1, { face: 1, shN: 50, elN: 70, lean: 10, holdN: wr => { c.strokeStyle = '#2a1a10'; c.lineWidth = 2; c.beginPath(); c.moveTo(wr[0], wr[1]); c.lineTo(wr[0] + 14, wr[1] - 24); c.stroke(); } }), lt, 1, L, { worry: 1, look: [.6, .6] }); tears(c, 432, 530, lt);
        fig(c, C.NAP, 800, 640, 40, pose(lt, 0, { face: -1, shN: -6, elN: 120, shF: -4, elF: 110 }), lt, 0, L, { look: [-.6, .3] }); return; }
      if (lt < Sh.tH) { fig(c, C.PRIEST, 640, 590, 34, pose(lt, 2, { face: 1, shN: 120, elN: 40 }), lt, 2, L, { look: [0, .2] });
        fig(c, C.NAPEMP, 530, 650, 40, pose(lt, 0, { face: 1, shN: 40, elN: 40 }), lt, 0, L, { look: [.5, 0], smile: .4 }); fig(c, C.MARIEL, 750, 650, 38, pose(lt, 3, { face: -1, shN: 30, elN: 60 }), lt, 3, L, { look: [-.5, 0], smile: .5 });
        fig(c, C.COURTIER, 300, 670, 38, pose(lt, 4, { face: 1 }), lt, 4, L, { look: [.7, -.1] }); fig(c, C.LADY, 980, 670, 36, pose(lt, 5, { face: -1 }), lt, 5, L, { look: [-.7, -.1] }); return; }
      S.npCradle(c, 640, 640, 1.3, lt); fig(c, C.MARIEL, 860, 660, 40, pose(lt, 3, { face: -1, shN: 40, elN: 80, lean: 10 }), lt, 3, L, { look: [-.7, .5], smile: .8 });
      fig(c, C.NAPEMP, 420, 660, 42, pose(lt, 0, { face: 1, shN: 20, elN: 40 }), lt, 0, L, { look: [.7, .5], smile: .9 }); },
    over: [(c, lt) => K.dateTag(c, '1809 – 1811', lt, { at: .4 }), (c, lt, u, Sh) => K.badge(c, 'DIVORCE', lt, { at: Sh.tD, until: Sh.tM }), (c, lt, u, Sh) => K.badge(c, 'MARIE LOUISE OF AUSTRIA', lt, { at: Sh.tM + .3, until: Sh.tH }), (c, lt, u, Sh) => K.card(c, 'AN HEIR · 1811', lt, { at: Sh.tH, x: 1340, y: 150, px: 56, rot: -2 })],
    sfx: [[.2, 'drone', .15], ['divorced', 'paper', .35], ['married', 'bell', .4], ['heir', 'music_box', .35]] },

  // 4.02 MED: the Tsar tears up a paper; then troops in many uniforms march past Napoleon
  { set: 'sz_office', cam: (lt, u, Sh) => lt < Sh.tG ? { z: [1.15], x: [640], y: [440] } : { z: [1.0], x: [640], y: [400] }, bed: [['clock_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'Britain', 3); Sh.tG = at(Sh, 'Grande', 5.5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tG) { const L = SUN(lt), t = seg(lt, Sh.tB, Sh.tB + .5); fig(c, C.TSAR, 640, 640, 44, pose(lt, 0, { face: 1, shN: 60, elN: 70, shF: 60, elF: 70, holdN: wr => paper(c, wr, t) }), lt, 0, L, { look: [.3, .4], angry: .5 }); return; }
      VP.drawSet(c, 'plain'); const L = SUN(lt);
      ride(c, C.NAP, 1080, 640, 30, WHITEH, lt, 0, 0, L, { shN: 60, elN: 30 }, { look: [-.8, 0] }, -1);
      ARMY.forEach((ch, i) => { const x = ((lt * 50 + i * 125) % 1000) - 120; fig(c, ch, x, 600 + (i % 2) * 20, 30, walk(lt, i, { face: 1, holdN: musket(c, -1.3) }), lt, i, L, { look: [.6, 0] }); }); },
    over: [(c, lt, u, Sh) => K.badge(c, 'TSAR ALEXANDER I', lt, { at: .5, until: Sh.tG }), (c, lt, u, Sh) => K.dateTag(c, 'LA GRANDE ARMÉE', lt, { at: Sh.tG + .2 })],
    sfx: [[.2, 'clock_loop', .15], ['Britain', 'paper_tear', .5], ['Grande', 'drum_loop', .35], ['Grande', 'march_loop', .4]] },

  // 4.03 MED: burning fields and villages; then Borodino: smoke over a redoubt, cannon fire, the Russian line withdrawing
  { set: 'estate', cam: (lt, u, Sh) => lt < Sh.tB ? { z: [lerp(1.0, 1.06, seg(lt, 0, Sh.tB))], x: [640], y: [400] } : { z: [lerp(1.0, 1.06, seg(lt, Sh.tB, Sh.dur))], x: [640], y: [380] }, bed: [['fire_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'Borodino', 4); Sh.tP = at(Sh, 'pulled', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tB) { const L = FIRE(lt); c.fillStyle = S.rgba('#3a1a10', .3); c.fillRect(0, 0, 1280, 720); H1.fire(c, 1000, 400, 1.6, lt, 1); H1.fire(c, 720, 470, 1.0, lt, 2); H1.fire(c, 300, 480, .9, lt, 3); H1.smoke(c, 1000, 300, 1.2, lt);
        [C.RUS, C.COSSACK].forEach((ch, k) => { const x = lerp(600 + k * 130, 1400 + k * 130, seg(lt, .5, Sh.tB)); fig(c, ch, x, 640 + k * 14, 36, walk(lt, k, { face: 1, shN: 140, elN: 20, holdF: null }), lt, k, L, { look: [-.5, 0] }); }); return; }
      VP.drawSet(c, 'trench'); const L = FIRE(lt), fire = k => { const t = lt - Sh.tB - k * .6; return t < 0 ? -1 : t % 2; };
      S.npSmoke(c, lt, 200, 280, 900, 120, .4, 11);
      S.npCannon(c, 200, 560, 1.1, 1, fire(0)); S.npCannon(c, 420, 590, 1.1, 1, fire(1));
      const w = seg(lt, Sh.tP, Sh.dur); [0, 1, 2, 3].forEach(k => { const x = 760 + k * 110 + w * 400; fig(c, k % 2 ? C.RUS : C.COSSACK, x, 560 + (k % 2) * 16, 30, w > 0 ? walk(lt, k, { face: 1, holdN: musket(c, -1.3) }) : pose(lt, k, { face: -1, shN: 80, elN: 10, holdN: musket(c, .1) }), lt, k, L, { look: [-.5, 0] }); }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'BORODINO · 7 SEPT 1812', lt, { at: Sh.tB + .2 }), (c, lt, u, Sh) => K.card(c, 'TENS OF THOUSANDS DEAD IN ONE DAY', lt, { at: Sh.tB + 3, x: 1220, y: 150, px: 44, rot: -2 })],
    sfx: [[.2, 'fire_loop', .3], ['burned', 'whoosh', .3], ['Borodino', 'cannon', .6], ['Borodino', 'battle_loop', .4], ['died', 'cannon', .5], ['pulled', 'drum', .35]] },

  // 4.04 WIDE: Napoleon on a hill looks at the domes of Moscow; at night the city glows with fire
  { set: 'np_moscow', cam: { z: [1.0, 1.08], x: [640, 640], y: [380, 380], ease: E.io }, bed: [['wind_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tE = at(Sh, 'empty', 2); Sh.tB = at(Sh, 'burned', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const b = seg(lt, Sh.tB - .3, Sh.tB + 1.2);
      if (b > 0) { c.fillStyle = S.rgba('#1a0a14', .55 * b); c.fillRect(0, 0, 1280, 720); for (let k = 0; k < 7; k++) { H1.fire(c, 260 + k * 130, 410, 1.0 + (k % 2) * .4, lt, k); } VP.glow(c, 640, 380, 600, '#ff6a20', .4 * b); H1.smoke(c, 640, 300, 1.4, lt, '40,30,30'); }
      const L = b > .5 ? FIRE(lt) : DUSK(lt);
      fig(c, C.MARSHAL2, 140, 640, 38, pose(lt, 1, { face: 1 }), lt, 1, L, { look: [.6, -.2], worry: .4 });
      fig(c, C.NAPG, 260, 650, 40, pose(lt, 0, { face: 1, shN: -4, elN: 110, shF: -4, elF: 110 }), lt, 0, L, { look: [.7, -.2], worry: b }); },
    over: [(c, lt) => K.dateTag(c, 'MOSCOW · SEPT 1812', lt, { at: .4 }), (c, lt, u, Sh) => K.badge(c, 'NEARLY EMPTY', lt, { at: Sh.tE, until: Sh.tB })],
    sfx: [[.2, 'wind_loop', .2], ['empty', 'whoosh_soft', .3], ['burned', 'fire_loop', .5], ['burned', 'bell', .3]] },

  // 4.05 MED: Napoleon pacing in a Kremlin room by a fire; snowflakes start at the window
  { set: 'study', cam: { z: [1.05, 1.12], x: [620, 640], y: [420, 430], ease: E.io }, bed: [['fire_loop', .2], ['clock_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'turned', 5); Sh.tW = at(Sh, 'winter', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = FIRE(lt);
      c.fillStyle = '#6a5a4a'; c.fillRect(800, 470, 220, 170); c.fillStyle = '#1a1210'; c.fillRect(840, 520, 140, 120); H1.fire(c, 910, 640, .7, lt, 4); VP.glow(c, 910, 600, 260, '#ff9a40', .35);
      if (lt > Sh.tW - 2) { c.save(); c.beginPath(); c.rect(130, 40, 200, 300); c.clip(); S.npSnow(c, lt, seg(lt, Sh.tW - 2, Sh.tW), .6); c.restore(); }
      const p = Math.sin(lt * .7), x = 520 + p * 180, f = Math.cos(lt * .7) > 0 ? 1 : -1;
      fig(c, C.NAPBARE, x, 650, 42, Object.assign(H1.walk(lt * .9), { face: f, shN: -10, elN: 120, shF: -10, elF: 120 }), lt, 0, L, { look: [f * .5, .3], worry: .6 }); },
    over: [(c, lt, u, Sh) => K.card(c, '5 WEEKS. NO PEACE OFFER.', lt, { at: 1.5, until: Sh.tT, x: 1300, y: 150, px: 50, rot: -2 }), (c, lt, u, Sh) => K.badge(c, 'RETREAT · OCTOBER', lt, { at: Sh.tT })],
    sfx: [[.2, 'fire_loop', .2], [.3, 'clock_loop', .25], [1.0, 'footsteps', .3], ['turned', 'thud', .35], ['winter', 'wind_loop', .4]] },

  // 4.06 WIDE: the snow road and the Berezina; soldiers in blankets crowd across a broken wooden bridge over an icy river
  { set: 'np_berezina', cam: { z: [1.0, 1.06], x: [640, 640], y: [400, 410], ease: E.io }, bed: [['wind_loop', .5], ['water_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'Berezina', 3.5); Sh.tG = at(Sh, 'gone', Sh.dur - .8); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt);
      for (let k = 0; k < 7; k++) { const q = (lt * .05 + k / 7) % 1, x = lerp(120, 640, q), y = 392 - q * 6; fig(c, k % 3 ? C.FRCOLD : C.FRRAG, x, y, 16, Object.assign(H1.walk(lt * .6 + k), { face: 1, shN: -4, elN: 130 }), lt, k, L, { worry: 1 }); }
      c.save(); c.translate(980, 640); c.rotate(.04); c.fillStyle = '#4a3020'; c.beginPath(); c.ellipse(0, 0, 90, 20, 0, 0, TAU); c.fill(); c.fillStyle = S.rgba('#ffffff', .8); c.beginPath(); c.ellipse(-10, -12, 70, 10, 0, 0, TAU); c.fill(); c.restore();
      [C.FRCOLD, C.FRRAG, C.FRCOLD, C.FRCOLD].forEach((ch, k) => { const x = ((lt * 22 + k * 200) % 1000) - 60, y = 610 + (k % 2) * 30; fig(c, ch, x, y, 36, Object.assign(H1.walk(lt * .55 + k), { face: 1, shN: -4, elN: 135, shF: -2, elF: 130, lean: 12 }), lt, k + 7, L, { worry: 1, look: [.3, .4] }); });
      S.npSnow(c, lt, 1, 1.6); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'THE BEREZINA · NOV 1812', lt, { at: Sh.tB }), (c, lt, u, Sh) => K.card(c, 'THE GRANDE ARMÉE IS GONE', lt, { at: Sh.tG, x: 1300, y: 150, px: 52, rot: -2 })],
    sfx: [[.2, 'wind_loop', .5], [.4, 'water_loop', .2], ['Cossack', 'hooves', .4], ['Berezina', 'creak', .4], ['gone', 'thud', .45]] },
];
VP.build(); K.boot();
</script></body></html>
