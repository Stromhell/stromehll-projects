const PX = S.mgPX;
// grey Mongol tide across Asia, 1206 -> 1260 (place, start q, radius)
const TIDE = [[PX(80, 46), .9, 900], [PL.steppe, 0, 170], [PX(92, 44), .05, 150], [PL.beijing, .15, 120], [PX(108, 34), .3, 110], [PL.otrar, .25, 150], [PL.samarkand, .3, 150], [PL.urgench, .32, 140], [PL.nishapur, .4, 130], [PL.sarai, .45, 150], [PL.kiev, .55, 120], [PX(50, 52), .5, 140], [PL.tabriz, .7, 120], [PL.baghdad, .8, 110], [PX(41, 37), .85, 90]];
const ENV = (c, xf, lt, k, L, ch, col, face = 1, po = {}) => { rideG(c, ch, xf, 600, 30, col, lt, L, Object.assign({ shN: 20, elN: 60 }, po), { look: [face * .8, 0] }, face, k * .3); };

window.SHOTS = [
  // 0.01 WIDE: the map; grey floods from the steppe across China, Persia, Russia and down to Syria
  { set: 'np_parch', cam: { z: [1.0, 1.06], x: [640, 600], y: [360, 360], ease: E.io }, bed: [['drone', .2], ['drum_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'china', 4.5); Sh.tP = at(Sh, 'persia', 5.5); Sh.tR = at(Sh, 'russia', 6.5); Sh.tB = at(Sh, 'baghdad', 7.5); },
    draw: (c, lt, u, Sh) => { const q = seg(lt, .6, Sh.tB + 1.6);
      S.mgAsia(c, { fill: cc => S.mgTide(cc, q, TIDE) });
      S.mgLabel(c, 'MONGOLIA', PL.steppe[0], PL.steppe[1] + 46, seg(lt, .3, .8), 30);
      [['CHINA', PX(112, 34), Sh.tC], ['PERSIA', PX(56, 33), Sh.tP], ['RUSSIA', PX(42, 53), Sh.tR]].forEach(([t, p, t0]) => S.mgLabel(c, t, p[0], p[1], seg(lt, t0, t0 + .4), 34, '#2a2a34'));
      S.mgDot(c, PL.baghdad, 'BAGHDAD', seg(lt, Sh.tB, Sh.tB + .4), 1, 24); S.mgDot(c, PL.cairo, 'CAIRO', seg(lt, Sh.tB + 1, Sh.tB + 1.4), 1, 24, 30);
      const yr = Math.round(lerp(1206, 1260, E.io(q))); c.save(); c.font = '64px Anton'; c.textAlign = 'right'; c.fillStyle = '#5a3a1a'; c.globalAlpha = .85; c.fillText(String(yr), 1150, 640); c.restore(); },
    over: [(c, lt) => K.dateTag(c, '1206 → 1260', lt, { at: .4 })],
    sfx: [[.2, 'drone', .2], [.4, 'drum_loop', .12], ['china', 'drum', .35], ['persia', 'drum', .35], ['russia', 'drum', .35], ['baghdad', 'hit', .45], ['destroyed', 'whoosh', .3]] },

  // 0.02 MED: Mongol envoys ride toward Cairo's gate; a golden tablet glints on the lead rider; townsfolk step back
  { set: 'mg_bab', cam: { z: [1.0, 1.08], x: [600, 660], y: [400, 410], ease: E.io }, bed: [['crowd_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'letter', 3.5); Sh.tS = at(Sh, 'surrender', 5.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), w = seg(lt, 0, Sh.dur * .8);
      fig(c, C.CAIRENE, 1090, 640, 30, pose(lt, 1, { face: -1, shN: 30, elN: 40, lean: -4 }), lt, 1, L, { worry: 1, look: [-.6, 0] });
      fig(c, SZC.EGWOMAN || C.CAIRENE, 960, 646, 28, pose(lt, 2, { face: -1, shN: 10, elN: 50, lean: -3 }), lt, 2, L, { worry: 1, look: [-.6, 0] });
      fig(c, C.MAMLUK, 820, 632, 30, pose(lt, 3, { face: -1, holdN: S.mgSpear(c, -1.12) }), lt, 3, L, { look: [-.8, 0] });
      const X1 = l => lerp(-120, 520, E.out(seg(l, 0, Sh.dur * .75))), X2 = l => X1(l) - 310, x1 = X1(lt);
      // the lead envoy draws the letter from his coat and holds it up as he says it
      const r = E.io(seg(lt, Sh.tL - .3, Sh.tL + .5)), op = seg(lt, Sh.tL + .2, Sh.tL + .9);
      ENV(c, X2, lt, 1, L, C.ENVOY2, BAY);
      ENV(c, X1, lt, 0, L, C.ENVOY, WHITEH, 1, { shN: lerp(20, 105, r), elN: lerp(60, 25, r), holdN: r > .05 ? (wr => S.mgScroll(c, wr[0] + 6, wr[1] - 20 * (.4 + .6 * op), .42, op, 0)) : undefined });
      S.mgPaiza(c, x1 + 14, 600 - 30 * 5 * .9 + 30 * 1.4, .32, .1, .5 + .5 * Math.sin(lt * 3), false);
      S.mgDust(c, lt, X2(lt) - 100, 640, 400, .3 * (1 - seg(lt, Sh.dur * .6, Sh.dur * .8))); },
    over: [(c, lt) => K.dateTag(c, 'CAIRO · 1260', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'SURRENDER, OR BE DESTROYED', lt, { at: Sh.tS, x: 1300, y: 160, px: 50, rot: -2 })],
    sfx: [[.2, 'crowd_loop', .12], [.3, 'hooves_loop', .35], ['letter', 'paper', .35], ['surrender', 'drum', .45]] },

  // 0.03 MED: the gate at dusk, a golden tablet hung on a hook; then the green valley of Ain Jalut with its spring
  { set: 'mg_bab', cam: (lt, u, Sh) => lt < Sh.tV ? { z: [lerp(1.2, 1.35, seg(lt, 0, Sh.tV))], x: [640], y: [330] } : { z: [lerp(1.0, 1.06, seg(lt, Sh.tV, Sh.dur))], x: [lerp(560, 620, seg(lt, Sh.tV, Sh.dur))], y: [380] }, bed: [['wind_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tV = at(Sh, 'few weeks', 4.5); Sh.tG = at(Sh, 'goliath', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tV) { DUSK(lt); c.fillStyle = S.rgba('#2a1a3a', .35); c.fillRect(0, 0, 1280, 720); c.strokeStyle = '#3a3a3a'; c.lineWidth = 4; c.beginPath(); c.moveTo(640, 236); c.lineTo(640, 262); c.stroke(); S.mgPaiza(c, 640, 340, .9, Math.sin(lt * 1.3) * .08, .3 + .3 * Math.sin(lt * 2));
        for (let k = 0; k < 2; k++) { const x = lerp(1300, 900 + k * 120, E.out(seg(lt, .5 + k * .6, 3 + k * .6))); fig(c, k ? C.CAIRENE : C.MAMLUK2, x, 640, 30, x > 900 + k * 120 + 1 ? walk(lt, k, { face: -1 }) : pose(lt, k, { face: -1 }), lt, k, VP.light('studio', lt, { set: { L: [-.7, -.6], amb: '#3a2a4a', ambA: .4, rim: '#ffb070', rimA: .9 } }), { look: [-.6, -.4], worry: 1 }); }
        return; }
      VP.drawSet(c, 'mg_ainjalut'); const L = SUN(lt); const lv = lt - Sh.tV;
      S.mgWind(c, lv, 480, 700); S.mgBirds(c, lv, 200, 150, 7, 1, 45); VP.motes(c, lt, 0, 300, 1280, 300, { n: 14 }); },
    over: [(c, lt, u, Sh) => K.card(c, 'AIN JALUT', lt, { at: Sh.tG, x: 960, y: 170, px: 60 }), (c, lt, u, Sh) => K.card(c, '“THE SPRING OF GOLIATH”', lt, { at: Sh.tG + .6, x: 960, y: 250, px: 36, rot: 1 })],
    sfx: [[.2, 'wind_loop', .25], [.6, 'bell', .2], ['executed', 'thud', .45], ['few weeks', 'whoosh', .35], ['goliath', 'drum', .45]] },

  // 0.04 TITLE: low, slow push through the grass to a paiza, a broken arrow and a dropped helmet by the spring; the title slams in
  { set: 'mg_ainjalut', cam: (lt) => ({ z: [lerp(1.45, 2.25, E.io(seg(lt, 0, 3.2)))], x: [lerp(300, 380, E.io(seg(lt, 0, 3.2)))], y: [lerp(560, 618, E.io(seg(lt, 0, 3.2)))], shake: lt > 1.2 && lt < 1.7 ? 6 * (1.7 - lt) : 0 }), bed: [['wind_loop', .3]],
    draw: (c, lt) => { const g = .5 + .5 * Math.sin(lt * 1.7);
      // ripples on the spring
      c.save(); c.beginPath(); c.ellipse(330, 636, 134, 25, 0, 0, TAU); c.clip(); c.strokeStyle = 'rgba(235,250,255,.55)'; c.lineWidth = 1.2;
      for (let k = 0; k < 4; k++) { const q = ((lt * .35 + k / 4) % 1); c.globalAlpha = 1 - q; c.beginPath(); c.ellipse(300 + k * 22, 634, 10 + q * 70, 2 + q * 12, 0, 0, TAU); c.stroke(); }
      c.restore();
      // broken arrow stuck in the ground, a dropped helmet, then the paiza
      c.save(); c.translate(660, 668); c.rotate(.5); c.strokeStyle = '#4a2e16'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -44); c.stroke(); c.fillStyle = '#d8d0c0'; [-1, 1].forEach(s => { c.beginPath(); c.moveTo(0, -44); c.lineTo(s * 7, -52); c.lineTo(0, -36); c.fill(); }); c.restore();
      c.save(); c.translate(600, 678); c.rotate(-.35); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 6, 30, 6, 0, 0, TAU); c.fill();
      const hg = c.createLinearGradient(-24, -30, 24, 0); hg.addColorStop(0, '#9a9aa6'); hg.addColorStop(1, '#4a4a56'); c.fillStyle = hg; c.beginPath(); c.moveTo(-26, 2); c.quadraticCurveTo(-24, -26, 0, -36); c.quadraticCurveTo(24, -26, 26, 2); c.closePath(); c.fill();
      c.fillStyle = '#6a3a1e'; c.fillRect(-28, -2, 56, 7); c.strokeStyle = '#2a2a30'; c.lineWidth = 1.5; c.stroke(); c.restore();
      S.mgPaiza(c, 470, 652, .8, 1.2, .3 + .5 * g, false);
      S.mgWind(c, lt, 560, 700, .15);
      // near-camera grass blades that sway across the frame
      for (let k = 0; k < 14; k++) { const bx = 150 + k * 37 + Math.sin(k * 7.3) * 12, sw = Math.sin(lt * 1.6 + k * .9) * 9, hgt = 70 + (k * 13) % 50;
        c.strokeStyle = k % 3 ? 'rgba(52,78,30,.85)' : 'rgba(84,110,44,.85)'; c.lineWidth = 3.5; c.lineCap = 'round'; c.beginPath(); c.moveTo(bx, 735); c.quadraticCurveTo(bx + sw * .4, 735 - hgt * .6, bx + sw, 735 - hgt); c.stroke(); }
      // warm sunset light and a vignette that deepens as the title lands
      const sun = c.createRadialGradient(700, 420, 20, 700, 420, 520); sun.addColorStop(0, 'rgba(255,200,120,.32)'); sun.addColorStop(1, 'rgba(255,170,90,0)'); c.fillStyle = sun; c.fillRect(0, 300, 1280, 420);
      const d = seg(lt, .8, 2.2), vg = c.createRadialGradient(400, 640, 60, 400, 640, 420); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, S.rgba('#140a04', .25 + .35 * d)); c.fillStyle = vg; c.fillRect(0, 300, 1280, 420); },
    over: [(c, lt) => { const q = seg(lt, 1.2, 1.55); if (q <= 0) return; const s = lerp(1.35, 1, E.out(q));
      c.save(); c.globalAlpha = .55 * q; c.fillStyle = '#0c0704'; c.fillRect(0, 95, 1920, 250); c.restore();
      c.save(); c.globalAlpha = q; c.translate(960, 230); c.scale(s, s); c.font = '104px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 24; c.fillText('THE BATTLE THAT', 0, -30); c.fillStyle = '#e8b04a'; c.fillText('STOPPED THE MONGOLS', 0, 80);
      c.shadowBlur = 0; c.fillStyle = '#a82a22'; c.fillRect(-300 * seg(lt, 1.5, 2), 100, 600 * seg(lt, 1.5, 2), 6); c.restore(); }],
    sfx: [[.2, 'wind_loop', .3], [.3, 'swell', .4], [1.2, 'hit', .6], [1.25, 'drum', .5]] },
];
VP.build(); K.boot();
</script></body></html>
