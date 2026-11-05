const book = (cc, wr, a = 0, col = '#6a2a1a') => { cc.save(); cc.translate(wr[0], wr[1]); cc.rotate(a); cc.fillStyle = col; cc.fillRect(-12, -16, 26, 20); cc.fillStyle = '#f0e8d0'; cc.fillRect(-10, -14, 22, 16); cc.strokeStyle = S.rgba('#5a4a3a', .5); cc.lineWidth = 1; for (let k = 0; k < 4; k++) { cc.beginPath(); cc.moveTo(-8, -10 + k * 3); cc.lineTo(10, -10 + k * 3); cc.stroke(); } cc.restore(); };
const carriage = (c, x, y, s, lt, L) => { VP.horse(c, x + 150 * s, y, 130 * s, { face: 1, ph: lt * 2.2, walk: 1, t: lt, col: ['#2a1e16', '#140e0a'], tack: { cloth: ['#8a1a24', '#440c14'], trim: '#d8b040' } }, L);
  c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a1e3a'; c.beginPath(); c.moveTo(-90, -40); c.lineTo(60, -40); c.lineTo(70, -140); c.lineTo(-80, -150); c.closePath(); c.fill(); c.fillStyle = '#d8b040'; c.fillRect(-84, -150, 154, 8); c.fillRect(-90, -46, 150, 6);
  c.fillStyle = '#c8b898'; c.fillRect(-50, -126, 60, 50); c.fillStyle = '#e8c840'; c.beginPath(); c.arc(-20, -100, 10, 0, TAU); c.fill();
  for (const wx of [-60, 40]) { c.strokeStyle = '#3a2410'; c.lineWidth = 6; c.beginPath(); c.arc(wx, -20, 30, 0, TAU); c.stroke(); c.lineWidth = 2; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU + lt * 9; c.beginPath(); c.moveTo(wx, -20); c.lineTo(wx + Math.cos(a) * 30, -20 + Math.sin(a) * 30); c.stroke(); } }
  c.strokeStyle = '#3a2410'; c.lineWidth = 4; c.beginPath(); c.moveTo(60, -40); c.lineTo(150, -60); c.stroke(); c.restore(); };
const statue = (c, x, y, s) => { c.save(); c.translate(x, y); c.rotate(-.08); c.scale(s, s); c.fillStyle = '#4a5a48'; c.beginPath(); c.ellipse(0, 0, 110, 20, 0, 0, TAU); c.fill(); c.fillStyle = '#5a6e58'; c.beginPath(); c.ellipse(-70, -16, 30, 26, 0, 0, TAU); c.fill(); c.fillRect(-50, -28, 140, 30); c.fillStyle = '#c8a040'; c.beginPath(); c.moveTo(-96, -40); c.lineTo(-80, -64); c.lineTo(-70, -44); c.lineTo(-58, -66); c.lineTo(-48, -40); c.fill(); c.fillStyle = S.rgba('#ffffff', .15); c.fillRect(-40, -24, 120, 6); c.restore(); };

window.SHOTS = [
  // 1.01 WIDE: Ajaccio; stone town above the sea; a small boy runs down to the shore, his mother calls from the path
  { set: 'costa', cam: { z: [1.0, 1.1], x: [600, 680], y: [380, 400], ease: E.io }, bed: [['ocean_loop', .3], ['birds_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tN = at(Sh, 'Napoleone', 6.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), r = seg(lt, .4, 7);
      fig(c, C.CORSW, 300, 600, 38, pose(lt, 1, { face: 1, shN: 120 + 20 * Math.sin(lt * 3), elN: 30 }), lt, 1, L, { look: [.8, 0], smile: .4 });
      const bx = lerp(340, 860, E.io(r)); fig(c, C.NAPBOY, bx, 640, 30, r < 1 && r > 0 ? Object.assign(H1.walk(lt * 2.2), { face: 1 }) : pose(lt, 0, { face: -1, shN: 40, elN: 30 }), lt, 0, L, { look: [r < 1 ? .6 : -.6, 0], smile: .8 });
      VP.motes(c, lt, 600, 200, 600, 300, { n: 10 }); },
    over: [(c, lt) => K.dateTag(c, 'AJACCIO, CORSICA · 1769', lt, { at: .4 }), (c, lt, u, Sh) => K.badge(c, 'NAPOLEONE DI BUONAPARTE', lt, { at: Sh.tN })],
    sfx: [[.2, 'ocean_loop', .3], [.5, 'birds_loop', .2], [1.0, 'run_steps', .3], ['Italian', 'pop', .3]] },

  // 1.02 MED: the dormitory at Brienne; rich boys point and laugh; the small Corsican boy sits alone on his bed with a book
  { set: 'np_dorm', cam: { z: [1.3, 1.38], x: [600, 640], y: [470, 480], ease: E.io }, bed: [['hum_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'mocked', 7); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), m = seg(lt, Sh.tM - .4, Sh.tM + .2);
      [[C.RICHBOY, 200, 0], [C.RICHBOY2, 300, 1], [C.RICHBOY3, 410, 2]].forEach(([ch, x, k]) => { const lau = Math.sin(lt * 9 + k) * .5 + .5;
        fig(c, ch, x + 120, 600 + k * 8, 46, pose(lt, k, { face: 1, shN: k === 1 ? 70 + 20 * m : 20, elN: k === 1 ? 10 : 100 + 20 * lau, lean: -4 + 6 * lau * m, bob: .01 * lau * m }), lt, k, L, { smile: .9, look: [.8, 0] }); });
      fig(c, C.NAPCADET, 880, 476, 42, Object.assign(VP.sit(C.NAPCADET, lt * .4, 2, { seat: 0 }), { face: -1, shN: 40, elN: 70, shF: 36, elF: 70, holdN: wr => book(c, wr) }), lt, 5, L, { look: [-.2, .6], worry: .5 }); },
    over: [(c, lt) => K.dateTag(c, 'BRIENNE · 1779', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'MOCKED FOR HIS ACCENT', lt, { at: Sh.tM, x: 1300, y: 150, px: 52, rot: -2 })],
    sfx: [[.4, 'laugh', .3], ['mocked', 'laugh', .35], ['money', 'coins', .2]] },

  // 1.03 MED: candlelight; the boy at a desk piled with books; then the young artillery officer by his cannon
  { set: 'study', cam: (lt, u, Sh) => lt < Sh.tO ? { z: [lerp(1.2, 1.3, seg(lt, 0, Sh.tO))], x: [520], y: [470] } : { z: [1.05], x: [640], y: [400] }, bed: [['clock_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'artillery', 3.2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tO) { const L = CANDLE(lt); c.fillStyle = S.rgba('#0a0a14', .55); c.fillRect(0, 0, 1280, 720);
        c.fillStyle = '#3a2416'; c.fillRect(440, 574, 70, 10); c.fillRect(446, 584, 8, 30); c.fillRect(496, 584, 8, 30);
        fig(c, C.NAPCADET, 480, 612, 34, Object.assign(VP.sit(C.NAPCADET, lt * .4, 6), { face: 1, shN: 40, elN: 60, holdN: wr => book(c, wr, .3) }), lt, 0, L, { look: [.5, .6] });
        c.fillStyle = '#4a3020'; c.fillRect(510, 540, 320, 18); c.fillRect(530, 556, 14, 60); c.fillRect(800, 556, 14, 60);
        [[600, '#6a2a1a'], [640, '#2a4a6a'], [680, '#5a5a2a'], [740, '#3a2a5a']].forEach(([x, col], k) => { for (let j = 0; j < 3 + k % 2; j++) { c.fillStyle = j % 2 ? col : S.mix(col, '#ffffff', .2); c.fillRect(x - 20, 540 - (j + 1) * 12, 40 - j * 2, 11); } });
        S.npHat(c, 760, 492, .5, 0);
        c.fillStyle = '#e8e0cc'; c.fillRect(560, 506, 8, 34); c.fillStyle = '#ffd070'; c.beginPath(); c.ellipse(564, 498 + Math.sin(lt * 9), 4, 9, 0, 0, TAU); c.fill(); VP.glow(c, 564, 500, 200 + 10 * Math.sin(lt * 11), '#ffb050', .5); return; }
      VP.drawSet(c, 'parley'); const L = SUN(lt); S.npCannon(c, 700, 600, 1.4, 1); S.npCannon(c, 980, 560, 1.1, 1);
      fig(c, C.NAPY, 560, 610, 40, pose(lt, 0, { face: 1, shN: 10, elN: 10, shF: 6, elF: 14 }), lt, 0, L, { look: [.6, -.1] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'ARTILLERY OFFICER AT 16', lt, { at: Sh.tO + .3, x: 1300, y: 150, px: 52, rot: -2 })],
    sfx: [[.2, 'clock_loop', .2], [.5, 'paper', .3], ['artillery', 'drum', .35]] },

  // 1.04 WIDE: Paris 1789; crowds with tricolours, a toppled royal statue, an aristocrat's carriage racing away
  { set: 'np_paris', cam: { z: [1.0, 1.06], x: [640, 640], y: [380, 390], ease: E.io }, bed: [['crowd_loop', .4], ['drum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tN = at(Sh, 'Nobles', 3); Sh.tT = at(Sh, 'talent', 6.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      statue(c, 640, 600, 1.1);
      const cx = lerp(1500, 1500, 0) - 0; const cq = seg(lt, Sh.tN, Sh.tN + 3.5); if (cq > 0 && cq < 1) carriage(c, lerp(-300, 1600, cq), 520, .8, lt, L);
      [[C.SANS, 180, 0, 1], [C.SANSW, 290, 1, 1], [C.SANS2, 400, 2, 1], [C.SANS, 880, 3, -1], [C.SANSW, 990, 4, -1], [C.SANS2, 1100, 5, -1]].forEach(([ch, x, k, f]) => { const up = Math.sin(lt * 3 + k) * .5 + .5;
        fig(c, ch, x, 640 + (k % 2) * 16, 34, pose(lt, k, { face: f, shN: 140 + 20 * up, elN: 20, shF: 20, elF: 40 }), lt, k, L, { look: [f * .3, -.5], smile: .7 });
        if (k % 2 === 0) S.npFlag(c, x + f * 20, 560 + (k % 2) * 16 - 20 * up, .8, lt + k); }); },
    over: [(c, lt) => K.dateTag(c, 'PARIS · 1789', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'TALENT > BIRTH', lt, { at: Sh.tT, x: 1340, y: 150, px: 60, rot: -2 })],
    sfx: [[.2, 'crowd_loop', .4], [.3, 'drum_loop', .2], ['Nobles', 'hooves', .4], ['heads', 'thud', .3], ['talent', 'crowd_cheer', .35]] },

  // 1.05 MED: night at Toulon; Bonaparte points from the hill; his cannons fire; the enemy ships pull away under smoke
  { set: 'np_bay', cam: { z: [1.0, 1.08], x: [600, 640], y: [400, 410], ease: E.io }, bed: [['night_loop', .2], ['ocean_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'saw', 5); Sh.tG = at(Sh, 'guns', 7.5); Sh.tM = at(Sh, 'general', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt), away = E.inn(seg(lt, Sh.tG + 1, Sh.dur + 2));
      [[880, 432, .4, 2], [700, 466, .5, 0], [1080, 506, .62, 1]].forEach(([x, y, s, k]) => S.npShip(c, x + away * (200 + k * 60), y, s, 1, lt, { flag: k === 2 ? 'uk' : 'uk', sails: .7 + .3 * away }));
      if (lt > Sh.tG) S.npSmoke(c, lt, 600, 380, 600, 120, .3, 7);
      const fire = k => { const t = lt - Sh.tG - k * .7; return t < 0 ? -1 : t % 2.1; };
      S.npCannon(c, 160, 520, 1.0, 1, fire(0)); S.npCannon(c, 420, 560, 1.0, 1, fire(1));
      if (lt > Sh.tG) for (const k of [0, 1]) { const f = fire(k); if (f >= 0 && f < .5) VP.glow(c, 900, 470, 80, '#ffb050', .6 * (1 - f * 2)); }
      fig(c, C.FR2, 90, 520, 30, pose(lt, 2, { face: 1, shN: 20, elN: 60 }), lt, 2, L, { look: [.6, 0] });
      fig(c, C.NAPY, 300, 540, 36, pose(lt, 0, { face: 1, shN: lt > Sh.tS ? 95 : 20, elN: lt > Sh.tS ? 4 : 30 }), lt, 0, L, { look: [.8, -.1] }); },
    over: [(c, lt) => K.dateTag(c, 'TOULON · 1793', lt, { at: .4 }), (c, lt, u, Sh) => K.badge(c, 'GENERAL AT 24', lt, { at: Sh.tM })],
    sfx: [[.2, 'night_loop', .2], [.3, 'ocean_loop', .2], ['saw', 'whoosh_soft', .3], ['guns', 'cannon', .6], ['drove', 'cannon', .5], ['harbour', 'cannon', .5], ['general', 'drum', .4]] },
];
VP.build(); K.boot();
</script></body></html>
