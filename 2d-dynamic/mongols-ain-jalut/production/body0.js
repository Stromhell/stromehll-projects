const PX = S.mgPX;
// grey Mongol tide across Asia, 1206 -> 1260 (place, start q, radius)
const TIDE = [[PL.steppe, 0, 170], [PX(92, 44), .05, 150], [PL.beijing, .15, 120], [PX(108, 34), .3, 110], [PL.otrar, .25, 150], [PL.samarkand, .3, 150], [PL.urgench, .32, 140], [PL.nishapur, .4, 130], [PL.sarai, .45, 150], [PL.kiev, .55, 120], [PX(50, 52), .5, 140], [PL.tabriz, .7, 120], [PL.baghdad, .8, 110], [PX(41, 37), .85, 90]];
const ENV = (c, x, lt, k, L, ch, col, face = 1) => { ride(c, ch, x, 600, 30, col, lt, lt * 1.1 + k * .3, 1, L, { shN: 20, elN: 60 }, { look: [face * .8, 0] }, face); };

window.SHOTS = [
  // 0.01 WIDE: the map; grey floods from the steppe across China, Persia, Russia and down to Syria
  { set: 'np_parch', cam: { z: [1.0, 1.06], x: [640, 600], y: [360, 360], ease: E.io }, bed: [['drone', .2], ['drum_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'china', 4.5); Sh.tP = at(Sh, 'persia', 5.5); Sh.tR = at(Sh, 'russia', 6.5); Sh.tB = at(Sh, 'baghdad', 7.5); },
    draw: (c, lt, u, Sh) => { const q = seg(lt, .6, Sh.tB + 1.6);
      S.mgAsia(c, { fill: cc => S.mgTide(cc, q, TIDE) });
      S.mgLabel(c, 'MONGOLIA', PL.steppe[0], PL.steppe[1] + 46, seg(lt, .3, .8), 30);
      [['CHINA', PX(112, 34), Sh.tC], ['PERSIA', PX(56, 33), Sh.tP], ['RUSSIA', PX(42, 53), Sh.tR]].forEach(([t, p, t0]) => S.mgLabel(c, t, p[0], p[1], seg(lt, t0, t0 + .4), 34, '#2a2a34'));
      S.mgDot(c, PL.baghdad, 'BAGHDAD', seg(lt, Sh.tB, Sh.tB + .4), 1, 24); S.mgDot(c, PL.cairo, 'CAIRO', seg(lt, Sh.tB + 1, Sh.tB + 1.4), 1, 24, 30);
      const yr = Math.round(lerp(1206, 1260, E.io(q))); c.save(); c.font = '64px Anton'; c.textAlign = 'right'; c.fillStyle = '#5a3a1a'; c.globalAlpha = .85; c.fillText(String(yr), 1220, 660); c.restore(); },
    over: [(c, lt) => K.dateTag(c, '1206 → 1260', lt, { at: .4 })],
    sfx: [[.2, 'drone', .2], [.4, 'drum_loop', .12], ['china', 'drum', .35], ['persia', 'drum', .35], ['russia', 'drum', .35], ['baghdad', 'hit', .45], ['destroyed', 'whoosh', .3]] },

  // 0.02 MED: Mongol envoys ride toward Cairo's gate; a golden tablet glints on the lead rider; townsfolk step back
  { set: 'mg_bab', cam: { z: [1.0, 1.08], x: [600, 660], y: [400, 410], ease: E.io }, bed: [['crowd_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'letter', 3.5); Sh.tS = at(Sh, 'surrender', 5.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), w = seg(lt, 0, Sh.dur * .8);
      fig(c, C.CAIRENE, 200, 640, 30, pose(lt, 1, { face: 1, shN: 30, elN: 40, lean: -4 }), lt, 1, L, { worry: 1, look: [.6, 0] });
      fig(c, SZC.EGWOMAN || C.CAIRENE, 960, 646, 28, pose(lt, 2, { face: -1, shN: 10, elN: 50, lean: -3 }), lt, 2, L, { worry: 1, look: [-.6, 0] });
      fig(c, C.MAMLUK, 820, 632, 30, pose(lt, 3, { face: -1, holdN: S.mgSpear(c, -1.45) }), lt, 3, L, { look: [-.8, 0] });
      const x1 = lerp(-120, 520, w), x2 = x1 - 210;
      ENV(c, x2, lt, 1, L, C.ENVOY2, BAY); ENV(c, x1, lt, 0, L, C.ENVOY, WHITEH);
      S.mgPaiza(c, x1 + 14, 600 - 30 * 5 * .9 + 30 * 1.4, .32, .1, .5 + .5 * Math.sin(lt * 3), false);
      if (lt > Sh.tL) S.mgScroll(c, x1 + 40, 600 - 30 * 5 * .9 + 30 * .4, .5, seg(lt, Sh.tL, Sh.tL + .6), -.3);
      S.mgDust(c, lt, x2 - 100, 640, 400, .3); },
    over: [(c, lt) => K.dateTag(c, 'CAIRO · 1260', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'SURRENDER, OR BE DESTROYED', lt, { at: Sh.tS, x: 1300, y: 160, px: 50, rot: -2 })],
    sfx: [[.2, 'crowd_loop', .12], [.3, 'hooves_loop', .35], ['letter', 'paper', .35], ['surrender', 'drum', .45]] },

  // 0.03 MED: the gate at dusk, a golden tablet hung on a hook; then the green valley of Ain Jalut with its spring
  { set: 'mg_bab', cam: (lt, u, Sh) => lt < Sh.tV ? { z: [lerp(1.2, 1.35, seg(lt, 0, Sh.tV))], x: [640], y: [330] } : { z: [lerp(1.0, 1.06, seg(lt, Sh.tV, Sh.dur))], x: [lerp(560, 620, seg(lt, Sh.tV, Sh.dur))], y: [380] }, bed: [['wind_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tV = at(Sh, 'few weeks', 4.5); Sh.tG = at(Sh, 'goliath', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tV) { DUSK(lt); c.fillStyle = S.rgba('#2a1a3a', .35); c.fillRect(0, 0, 1280, 720); c.strokeStyle = '#3a3a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(640, 236); c.lineTo(640, 262); c.stroke(); S.mgPaiza(c, 640, 340, .9, Math.sin(lt * 1.3) * .08, .3 + .3 * Math.sin(lt * 2));
        for (let k = 0; k < 2; k++) { const x = lerp(1300, 900 + k * 120, E.out(seg(lt, .5 + k * .6, 3 + k * .6))); fig(c, k ? C.CAIRENE : C.MAMLUK2, x, 640, 30, x > 900 + k * 120 + 1 ? walk(lt, k, { face: -1 }) : pose(lt, k, { face: -1 }), lt, k, VP.light('studio', lt, { set: { L: [-.7, -.6], amb: '#3a2a4a', ambA: .4, rim: '#ffb070', rimA: .9 } }), { look: [-.6, -.4], worry: 1 }); }
        return; }
      VP.drawSet(c, 'mg_ainjalut'); const L = SUN(lt);
      VP.motes(c, lt, 0, 300, 1280, 300, { n: 14 }); },
    over: [(c, lt, u, Sh) => K.card(c, 'AIN JALUT', lt, { at: Sh.tG, x: 960, y: 170, px: 60 }), (c, lt, u, Sh) => K.card(c, '“THE SPRING OF GOLIATH”', lt, { at: Sh.tG + .6, x: 960, y: 250, px: 36, rot: 1 })],
    sfx: [[.2, 'wind_loop', .25], [.6, 'bell', .2], ['executed', 'thud', .45], ['few weeks', 'whoosh', .35], ['goliath', 'drum', .45]] },

  // 0.04 TITLE: a paiza lying in the grass beside the spring
  { set: 'mg_ainjalut', cam: { z: [1.9, 2.05], x: [330, 340], y: [600, 606], ease: E.io }, bed: [['wind_loop', .3]],
    draw: (c, lt) => { S.mgPaiza(c, 470, 652, .8, 1.2, .3 + .3 * Math.sin(lt * 2), false); },
    over: [(c, lt) => { const q = seg(lt, .8, 1.8); if (q <= 0) return; c.save(); c.globalAlpha = q; c.font = '96px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 20; c.fillText('THE BATTLE THAT', 960, 190); c.fillText('STOPPED THE MONGOLS', 960, 300); c.restore(); }],
    sfx: [[.2, 'wind_loop', .3], [.8, 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
