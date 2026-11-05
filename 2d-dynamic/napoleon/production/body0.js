// soldiers along a pontoon bridge: from the near bank (bottom) to the far treeline; q 0 near, 1 far
const BR = [[[230, 760], [300, 540], [470, 392], 1], [[980, 760], [900, 540], [760, 392], -1]];
const bridgePt = (b, q) => q < .25 ? [lerp(b[0][0], b[1][0], q / .25), lerp(b[0][1], b[1][1], q / .25)] : [lerp(b[1][0], b[2][0], (q - .25) / .75), lerp(b[1][1], b[2][1], (q - .25) / .75)];
const CROSSERS = [C.FR, C.FR2, C.GUARD, C.FR, C.FR2, C.FR, C.FR2, C.FR];
const EMPIRE = [[PL.paris, 0, 120], [PL.holland, .1, 80], [PL.westphalia, .25, 110], [PL.naples, .3, 90], [PL.madrid, .45, 120], [PL.vienna, .55, 90], [PL.berlin, .65, 110], [[690, 330], .8, 120]];
const blue = (c, q) => { c.beginPath(); EMPIRE.forEach(([p, t0, r]) => { const f = seg(q, t0, t0 + .25); if (f > 0) { c.moveTo(p[0] + r * E.out(f), p[1]); c.arc(p[0], p[1], r * E.out(f), 0, TAU); } }); c.fillStyle = S.rgba('#3a5ab8', .6); c.fill('nonzero'); };

window.SHOTS = [
  // 0.01 WIDE: the Neman at dawn; two columns cross the pontoon bridges; Napoleon watches on horseback
  { set: 'np_neman', cam: { z: [1.0, 1.1], x: [640, 640], y: [400, 420], ease: E.io }, bed: [['march_loop', .35], ['water_loop', .15], ['drum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tN = at(Sh, 'six hundred', 5); },
    draw: (c, lt, u, Sh) => { const L = DAWN(lt), list = [];
      BR.forEach((b, bi) => CROSSERS.forEach((ch, i) => { const q = ((lt * .045) + i / CROSSERS.length + bi * .06) % 1, [x0, y] = bridgePt(b, q), x = x0 + (i % 2 ? 1 : -1) * lerp(22, 7, q); list.push([y, () => { const uu = lerp(30, 6, Math.pow(q, .6)); if (uu < 7) { c.fillStyle = S.rgba('#1e2a5a', .8); c.fillRect(x - 2, y - uu * 7, 4, uu * 7); return; }
        fig(c, ch, x, y, uu, walk(lt, i + bi, { face: q < .25 ? (bi ? -1 : 1) * .6 + (bi ? 1 : -1) * 0 : b[3], holdN: musket(c, -1.3) }), lt, i, L, { look: [b[3] * .5, -.2] }); }]); }));
      list.sort((a, b) => a[0] - b[0]).forEach(f => f[1]());
      // cannon teams waiting on the near bank
      S.npCannon(c, 560, 620, .9, 1); S.npCannon(c, 690, 640, .9, 1);
      fig(c, C.FR2, 620, 640, 30, pose(lt, 5, { face: 1, shN: 30, elN: 60 }), lt, 5, L, { look: [.4, -.3] });
      ride(c, C.NAP, 1120, 660, 28, WHITEH, lt, 0, 0, L, { shN: 70, elN: 30 }, { look: [-.8, -.3] }, -1);
      VP.motes(c, lt, 0, 300, 1280, 200, { n: 14 }); },
    over: [(c, lt) => K.dateTag(c, 'RIVER NEMAN · JUNE 1812', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '600,000+ MEN', lt, { at: Sh.tN, x: 1500, y: 140, px: 60, rot: -2 })],
    sfx: [[.2, 'march_loop', .35], [.3, 'drum_loop', .2], [2.2, 'hooves', .3], ['six hundred', 'drum', .4]] },

  // 0.02 MED: the same road in winter; a thin line of ragged soldiers; a broken cart; a black hat in the snow
  { set: 'steppe', cam: { z: [1.06, 1.0], x: [640, 620], y: [400, 400], ease: E.io }, bed: [['wind_loop', .5]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'fraction', 3); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt);
      c.fillStyle = S.rgba('#4a5060', .2); c.fillRect(0, 0, 1280, 720);
      // broken cart, tipped, one wheel off
      c.save(); c.translate(940, 560); c.rotate(-.18); c.fillStyle = '#5a4030'; c.fillRect(-90, -50, 180, 40); c.strokeStyle = '#3a2818'; c.lineWidth = 6; c.beginPath(); c.arc(-50, -6, 30, 0, TAU); c.stroke(); c.restore();
      c.save(); c.translate(1050, 590); c.rotate(.9); c.strokeStyle = '#3a2818'; c.lineWidth = 6; c.beginPath(); c.ellipse(0, 0, 30, 12, 0, 0, TAU); c.stroke(); c.restore();
      c.fillStyle = S.rgba('#ffffff', .8); c.beginPath(); c.ellipse(940, 512, 80, 10, -.18, 0, TAU); c.fill();
      [C.FRCOLD, C.FRCOLD, C.FRRAG, C.FRCOLD, C.FRRAG].forEach((ch, i) => { const x = -80 + ((lt * 26 + i * 170) % 1500) - 100, y = 590 + (i % 2) * 14; if (x < -60 || x > 1340) return;
        fig(c, ch, x, y, 30, Object.assign(H1.walk(lt * .55 + i), { face: 1, shN: -4, elN: 135, shF: -2, elF: 130, lean: 12 }), lt, i, L, { worry: 1, look: [.3, .5] }); });
      S.npHat(c, 190, 640, 1.1, -.12, .4 + .4 * seg(lt, 0, Sh.dur));
      S.npSnow(c, lt, .9, 1.4); },
    over: [(c, lt) => K.dateTag(c, 'DECEMBER 1812', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '600,000 → FEWER THAN 100,000?', lt, { at: Sh.tF, x: 1260, y: 160, px: 50, rot: -2 })],
    sfx: [[.2, 'wind_loop', .5], [1.0, 'footsteps', .2], ['fraction', 'thud', .35]] },

  // 0.03 MED: quick images; a crown on a cushion, the palace, the map of Europe turning blue
  { set: 'sz_palace', cam: (lt, u, Sh) => lt < Sh.tP ? { z: [lerp(1.5, 1.6, seg(lt, 0, Sh.tP))], x: [640], y: [500] } : lt < Sh.tE ? { z: [lerp(1.0, 1.05, seg(lt, Sh.tP, Sh.tE))], x: [640], y: [380] } : { z: [lerp(1.0, 1.08, seg(lt, Sh.tE, Sh.dur))], x: [600], y: [370] }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'crowns', 3.5); Sh.tP = at(Sh, 'palaces', 4.3); Sh.tE = at(Sh, 'empire', 5.5); Sh.tM = at(Sh, 'more', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tP) { const L = SUN(lt); c.fillStyle = '#6a3a24'; c.fillRect(480, 520, 320, 200); c.fillStyle = '#8a1a24'; c.fillRect(470, 510, 340, 16); S.npCrown(c, 640, 500, 1.1, lt); return; }
      if (lt < Sh.tE) { const L = SUN(lt), w = seg(lt, Sh.tP, Sh.tP + 2.5);
        fig(c, C.SERVANT, 300, 560, 34, pose(lt, 1, { face: 1, shN: 10, elN: 20, lean: 12 }), lt, 1, L, { look: [.6, .2] });
        fig(c, C.COURTIER, 980, 570, 34, pose(lt, 2, { face: -1, shN: 10, elN: 20, lean: 10 }), lt, 2, L, { look: [-.6, .2] });
        fig(c, C.NAPEMP, lerp(1360, 640, E.out(w)), 600, 36, w < 1 ? walk(lt, 0, { face: -1 }) : pose(lt, 0, { face: -1, shN: 20, elN: 100 }), lt, 0, L, { look: [-.2, -.1] }); return; }
      VP.drawSet(c, 'np_parch'); const q = seg(lt, Sh.tE, Sh.tM + .6);
      S.npEurope(c, { fill: cc => blue(cc, q) });
      S.npArrow(c, PL.berlin, PL.moscow, E.io(seg(lt, Sh.tM - .2, Sh.tM + 1)), '#2a4aa0', 22);
      S.npLabel(c, 'FRANCE', PL.paris[0] - 20, PL.paris[1] + 40, seg(lt, Sh.tE, Sh.tE + .5), 30);
      S.npLabel(c, 'RUSSIA', 1000, 260, seg(lt, Sh.tM - .3, Sh.tM + .2), 30); },
    over: [],
    sfx: [[.2, 'drone', .2], ['crowns', 'chime', .3], ['palaces', 'footsteps', .3], ['empire', 'whoosh', .4], ['more', 'drum', .4]] },

  // 0.04 TITLE: the bicorne in the snow, wind lifting flakes
  { set: 'steppe', cam: { z: [1.5, 1.65], x: [420, 420], y: [600, 610], ease: E.io }, bed: [['wind_loop', .5]],
    draw: (c, lt) => { c.fillStyle = S.rgba('#3a4050', .3); c.fillRect(0, 0, 1280, 720); S.npHat(c, 420, 640, 1.6, -.12, .8); S.npSnow(c, lt, 1, 2); },
    over: [(c, lt) => { const q = seg(lt, 1.0, 2.0); if (q <= 0) return; c.save(); c.globalAlpha = q; c.font = '110px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 20; c.fillText('NAPOLEON', 960, 200); c.font = '56px Oswald'; c.fillText("IT WASN'T ENOUGH", 960, 280); c.restore(); }],
    sfx: [[.2, 'wind_loop', .5], [1.0, 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
