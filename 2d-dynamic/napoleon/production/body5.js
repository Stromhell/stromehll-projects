const LEIP = PL.leipzig;
const ALLIES = [[[1100, 300], 'RUSSIA', '#2a6a3a'], [[720, 150], 'SWEDEN', '#d8b040'], [[700, 260], 'PRUSSIA', '#2a2a2a'], [[760, 560], 'AUSTRIA', '#e8e4da'], [[250, 330], 'BRITAIN', '#b82a22']];
const ROYAL = Object.assign({}, C.FR, { shirt: ['#e8e4da', '#a8a294'] }), ROYAL2 = Object.assign({}, C.FR2, { shirt: ['#e8e4da', '#a8a294'] });
const CUIR = Object.assign({}, C.FR, { shirt: ['#c8c8d0', '#7a7a84'], headwear: S.SPX.galea || C.FR.headwear });
const square = (c, x, y, n, s, lt, col = '#b82a22') => { for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) { const px = x + (k - r) * 9 * s, py = y + (k + r) * 4 * s; c.fillStyle = col; c.fillRect(px - 3 * s, py - 16 * s, 6 * s, 14 * s); c.fillStyle = '#1e1e24'; c.fillRect(px - 3 * s, py - 20 * s, 6 * s, 5 * s); c.fillStyle = '#2a2a3a'; c.fillRect(px - 3 * s, py - 2 * s, 6 * s, 4 * s); } };

window.SHOTS = [
  // 5.01 MED: allied arrows close in on Leipzig; then a vast smoky battlefield around the city
  { set: 'np_parch', cam: (lt, u, Sh) => lt < Sh.tL ? { z: [lerp(1.0, 1.1, seg(lt, 0, Sh.tL))], x: [lerp(640, 600, seg(lt, 0, Sh.tL))], y: [380] } : { z: [lerp(1.0, 1.06, seg(lt, Sh.tL, Sh.dur))], x: [640], y: [400] }, bed: [['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tJ = at(Sh, 'joined', 4); Sh.tL = at(Sh, 'Leipzig', 7); Sh.tO = at(Sh, 'lost', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tL) { S.npEurope(c, { fill: cc => { cc.fillStyle = S.rgba('#3a5ab8', .55); cc.beginPath(); cc.arc(PL.paris[0], PL.paris[1], 140, 0, TAU); cc.arc(LEIP[0] - 30, LEIP[1], 90, 0, TAU); cc.fill(); } });
        ALLIES.forEach(([p, nm, col], k) => { const q = E.io(seg(lt, .8 + k * .6, Sh.tJ + 1.5)); S.npArrow(c, p, [lerp(p[0], LEIP[0], .85), lerp(p[1], LEIP[1], .85)], q, col === '#e8e4da' ? '#8a8a84' : col, 18); S.npLabel(c, nm, p[0], p[1] - 20, seg(lt, .8 + k * .6, 1.3 + k * .6), 30); });
        S.npLabel(c, 'LEIPZIG', LEIP[0], LEIP[1] + 40, seg(lt, Sh.tJ, Sh.tJ + .5), 30, '#b82a22'); return; }
      VP.drawSet(c, 'plain'); const L = DUSK(lt), f = k => { const t = lt - Sh.tL - k * .5; return t < 0 ? -1 : t % 1.8; };
      c.fillStyle = '#6a5a5a'; for (let k = 0; k < 12; k++) c.fillRect(480 + k * 30, 300 - (k % 3) * 14, 26, 40 + (k % 3) * 14); c.fillRect(620, 220, 16, 120); c.beginPath(); c.moveTo(614, 222); c.lineTo(628, 186); c.lineTo(642, 222); c.fill();
      S.npSmoke(c, lt, 0, 280, 1280, 160, .45, 21);
      for (let k = 0; k < 4; k++) S.npCannon(c, 150 + k * 300, 560 + (k % 2) * 40, .9, k < 2 ? 1 : -1, f(k));
      fig(c, C.FR, 300, 620, 30, pose(lt, 1, { face: 1, holdN: musket(c, -.2) }), lt, 1, L, { look: [.6, 0] }); fig(c, C.RUS, 980, 620, 30, pose(lt, 2, { face: -1, holdN: musket(c, -.2) }), lt, 2, L, { look: [-.6, 0] }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'LEIPZIG · OCT 1813', lt, { at: Sh.tL + .2 }), (c, lt, u, Sh) => K.card(c, '~500,000 SOLDIERS · 3 DAYS', lt, { at: Sh.tL + 1.5, until: Sh.tO, x: 1300, y: 150, px: 50, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'NAPOLEON LOSES', lt, { at: Sh.tO, x: 1340, y: 150, px: 56, rot: 2 })],
    sfx: [[.2, 'drone', .15], ['Russia', 'whoosh', .3], ['Britain', 'whoosh', .3], ['joined', 'drum', .4], ['Leipzig', 'battle_loop', .45], ['Leipzig', 'cannon', .55], ['lost', 'thud', .45]] },

  // 5.02 MED: Fontainebleau; Napoleon alone at a desk, pen in hand; his marshals by the door, looking away
  { set: 'sz_palace', cam: { z: [1.08, 1.18], x: [600, 620], y: [430, 440], ease: E.io }, bed: [['clock_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'refusing', 3.5); Sh.tG = at(Sh, 'gave up', 6); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt), w = seg(lt, Sh.tG, Sh.tG + 1);
      c.fillStyle = '#4a3020'; c.fillRect(300, 470, 74, 10); c.fillRect(306, 480, 8, 160); c.fillRect(362, 480, 8, 160); c.fillRect(300, 380, 10, 100);
      fig(c, C.NAP, 350, 650, 40, Object.assign(VP.sit(C.NAP, lt * .3, 6, { seat: .1 }), { face: 1, shN: 50 + 10 * w, elN: 70, holdN: wr => { c.strokeStyle = '#f0f0f0'; c.lineWidth = 2; c.beginPath(); c.moveTo(wr[0], wr[1]); c.lineTo(wr[0] + 10, wr[1] - 22); c.stroke(); } }), lt, 0, L, { look: [.5, .7], worry: .8 });
      c.fillStyle = '#5a3a24'; c.fillRect(400, 560, 240, 16); c.fillRect(414, 574, 12, 80); c.fillRect(612, 574, 12, 80); c.fillStyle = '#f0e8d0'; c.fillRect(430, 550, 70, 10);
      fig(c, C.MARSHAL, 900, 640, 40, pose(lt, 1, { face: 1, shN: -4, elN: 20 }), lt, 1, L, { look: [.8, 0] }); fig(c, C.MARSHAL2, 1020, 650, 40, pose(lt, 2, { face: 1, shN: -6, elN: 110, shF: -6, elF: 110 }), lt, 2, L, { look: [.8, .2] }); },
    over: [(c, lt) => K.dateTag(c, 'FONTAINEBLEAU · APRIL 1814', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'HE ABDICATES', lt, { at: Sh.tG + .4, x: 1340, y: 150, px: 56, rot: -2 })],
    sfx: [[.2, 'clock_loop', .25], ['refusing', 'door_slam', .3], ['gave up', 'scrape', .4]] },

  // 5.03 MED: Elba; a small harbour; Napoleon walks on a terrace staring at the sea towards France
  { set: 'beach', cam: { z: [1.0, 1.08], x: [640, 680], y: [380, 400], ease: E.io }, bed: [['ocean_loop', .3], ['birds_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'lasted', 4); },
    draw: (c, lt, u, Sh) => { const L = DUSK(lt);
      [[860, 440, .3], [980, 452, .22]].forEach(([x, y, s]) => H1.boat(c, x + Math.sin(lt * .5) * 10, y, s, lt, {}));
      c.fillStyle = '#c8b090'; c.fillRect(0, 600, 1280, 120); for (let k = 0; k < 32; k++) { c.fillStyle = S.rgba(k % 2 ? '#a89070' : '#d8c0a0', .8); c.fillRect(k * 40, 600, 38, 20); } c.fillStyle = '#a89070'; c.fillRect(0, 618, 1280, 6);
      const w = seg(lt, .3, 3.5); fig(c, C.NAPG, lerp(200, 560, E.out(w)), 604, 40, w < 1 ? walk(lt, 0, { face: 1, shN: -6, elN: 120, shF: -6, elF: 120 }) : pose(lt, 0, { face: 1, shN: -6, elN: 120, shF: -6, elF: 120 }), lt, 0, L, { look: [1, -.1] }); },
    over: [(c, lt) => K.dateTag(c, 'ELBA · 1814', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'LESS THAN A YEAR', lt, { at: Sh.tL, x: 1340, y: 150, px: 54, rot: -2 })],
    sfx: [[.2, 'ocean_loop', .3], [.3, 'birds_loop', .15], [.5, 'footsteps', .3], ['lasted', 'tick', .3]] },

  // 5.04 MED: Laffrey; a line of the king's soldiers with muskets raised; Napoleon walks toward them alone and opens his coat
  { set: 'parley', cam: (lt, u, Sh) => ({ z: [lerp(1.0, 1.25, E.io(seg(lt, Sh.tW, Sh.dur)))], x: [lerp(640, 700, E.io(seg(lt, Sh.tW, Sh.dur)))], y: [lerp(400, 450, E.io(seg(lt, Sh.tW, Sh.dur)))] }), bed: [['wind_loop', .2], ['tension', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'blocked', 5); Sh.tW = at(Sh, 'walked', 8); Sh.tO = at(Sh, 'opened', 10); Sh.tH = at(Sh, 'here I am', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), aim = seg(lt, Sh.tB - .5, Sh.tB + .3), o = E.io(seg(lt, Sh.tO, Sh.tO + .8));
      [ROYAL, ROYAL2, ROYAL, ROYAL2, ROYAL].forEach((ch, k) => fig(c, ch, 880 + k * 88, 600 + (k % 2) * 16, 34, pose(lt, k, { face: -1, shN: lerp(10, 85, aim), elN: lerp(30, 0, aim), shF: lerp(10, 80, aim), elF: lerp(20, 10, aim), holdN: musket(c, lerp(-1.3, 0, aim)) }), lt, k, L, { look: [-.6, 0], worry: o }));
      [C.FR, C.GUARD, C.FR2].forEach((ch, k) => fig(c, ch, 80 + k * 70, 590 + (k % 2) * 14, 28, pose(lt, k + 5, { face: 1, holdN: musket(c, -1.3) }), lt, k + 5, L, { look: [.6, 0] }));
      const w = seg(lt, Sh.tW - .5, Sh.tO); fig(c, C.NAPG, lerp(330, 640, E.io(w)), 620, 38, w > 0 && w < 1 ? walk(lt, 0, { face: 1 }) : pose(lt, 0, { face: 1, shN: lerp(-6, 45, o), elN: lerp(110, 10, o), shF: lerp(-6, -35, o), elF: lerp(110, 10, o) }), lt, 0, L, { look: [.7, 0] }); },
    over: [(c, lt) => K.dateTag(c, 'LAFFREY · 7 MARCH 1815', lt, { at: .4 }), (c, lt, u, Sh) => K.badge(c, 'ABOUT 1,000 MEN', lt, { at: 2, until: Sh.tB }), (c, lt, u, Sh) => K.card(c, '"IF ANY OF YOU WANTS TO KILL HIS EMPEROR, HERE I AM."', lt, { at: Sh.tO + 1.2, x: 960, y: 150, px: 40, rot: -1 })],
    sfx: [[.2, 'wind_loop', .2], [.3, 'tension', .25], ['blocked', 'clank', .4], ['walked', 'footsteps', .35], ['opened', 'heartbeat', .5], ['here I am', 'heartbeat', .5]] },

  // 5.05 MED: nobody fires; soldiers throw their caps in the air and run to him; then the Paris crowds
  { set: 'parley', cam: (lt, u, Sh) => lt < Sh.tP ? { z: [1.15], x: [700], y: [440] } : { z: [1.0], x: [640], y: [390] }, bed: [['crowd_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'cheered', 1.5); Sh.tP = at(Sh, 'Paris', 4.5); Sh.tK = at(Sh, 'fled', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tP) { const L = SUN(lt), r = seg(lt, Sh.tC, Sh.tC + 2);
        fig(c, C.NAPG, 700, 620, 38, pose(lt, 0, { face: 1, shN: 60, elN: 20, shF: 60, elF: 20 }), lt, 0, L, { look: [.7, 0], smile: 1 });
        [ROYAL, ROYAL2, ROYAL, ROYAL2].forEach((ch, k) => { const x = lerp(900 + k * 80, 790 + k * 70, E.out(r)), up = r > 0; fig(c, ch, x, 600 + (k % 2) * 16, 34, up && r < 1 ? Object.assign(H1.walk(lt * 2 + k), { face: -1, shN: 160, elN: 10 }) : pose(lt, k, { face: -1, shN: up ? 150 : 10, elN: 10 }), lt, k, L, { look: [-.6, -.3], smile: up ? 1 : 0 });
          const hq = seg(lt, Sh.tC + k * .15, Sh.tC + k * .15 + 1.6); if (hq > 0 && hq < 1) { c.save(); c.translate(x, 520 - Math.sin(hq * Math.PI) * 160); c.rotate(hq * 8); c.fillStyle = '#1e1e24'; c.fillRect(-10, -12, 20, 24); c.restore(); } }); return; }
      VP.drawSet(c, 'np_paris'); const L = SUN(lt);
      [[C.SANS, 160, 0], [C.SANSW, 290, 1], [C.FR, 420, 2], [C.SANS2, 860, 3], [C.SANSW, 990, 4], [C.FR2, 1120, 5]].forEach(([ch, x, k]) => { const j = Math.abs(Math.sin(lt * 5 + k)); fig(c, ch, x, 640 + (k % 2) * 14, 36, pose(lt, k, { face: x < 640 ? 1 : -1, shN: 150 + 20 * j, elN: 20, bob: .03 * j }), lt, k, L, { smile: 1, look: [0, -.4] }); }); },
    over: [(c, lt) => K.dateTag(c, 'THE HUNDRED DAYS', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'THE KING FLEES', lt, { at: Sh.tK, x: 1340, y: 150, px: 54, rot: -2 })],
    sfx: [[.2, 'crowd_loop', .3], ['cheered', 'crowd_cheer', .5], ['Paris', 'crowd_cheer', .45], ['fled', 'hooves', .35]] },

  // 5.06 WIDE: Waterloo; British squares on the ridge; French cavalry charging; Prussian columns come out of a wood
  { set: 'np_waterloo', cam: { z: [1.0, 1.08], x: [640, 680], y: [400, 400], ease: E.io }, bed: [['battle_loop', .4], ['hooves_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'held', 6); Sh.tP = at(Sh, 'Prussians', Sh.dur - 2.5); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt);
      square(c, 560, 380, 5, 1, lt); square(c, 780, 390, 5, 1, lt); square(c, 1000, 400, 4, 1, lt);
      S.npSmoke(c, lt, 400, 330, 700, 80, .3, 31);
      const p = seg(lt, Sh.tP - .5, Sh.dur); if (p > 0) for (let k = 0; k < 10; k++) { const x = 1240 - p * 140 - k * 14, y = 372 + (k % 2) * 6; c.fillStyle = '#1e2a4a'; c.fillRect(x - 3, y - 16, 6, 16); c.fillStyle = '#1a1a1a'; c.fillRect(x - 3, y - 20, 6, 5); }
      for (let k = 0; k < 4; k++) { const x = ((lt * 140 + k * 300) % 1500) - 200; ride(c, CUIR, x, 600 + (k % 2) * 40, 26, k % 2 ? BAY : ['#2a1e16', '#140e0a'], lt, lt * 2.4 + k, 1, L, { shN: 120, elN: 10 }, { look: [.6, 0] }); } },
    over: [(c, lt) => K.dateTag(c, 'WATERLOO · 18 JUNE 1815', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, "WELLINGTON'S LINE HOLDS", lt, { at: Sh.tH, until: Sh.tP, x: 1300, y: 150, px: 52, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'THE PRUSSIANS ARRIVE', lt, { at: Sh.tP, x: 1320, y: 150, px: 52, rot: 2 })],
    sfx: [[.2, 'battle_loop', .4], [.3, 'hooves_loop', .3], ['Wellington', 'volley', .4], ['held', 'volley', .4], ['Prussians', 'drum', .45]] },

  // 5.07 MED: the bearskin Guard marches uphill; redcoats rise from the wheat and fire; the Guard turns; the bicorne in the mud
  { set: 'np_waterloo', cam: (lt, u, Sh) => lt < Sh.tB ? { z: [lerp(1.15, 1.25, seg(lt, 0, Sh.tB))], x: [640], y: [460] } : { z: [lerp(1.6, 1.7, seg(lt, Sh.tB, Sh.dur))], x: [400], y: [600] }, bed: [['drum_loop', .35], ['battle_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'stood up', 3); Sh.tF = at(Sh, 'fired', 4); Sh.tR = at(Sh, 'fell back', 6); Sh.tB = at(Sh, 'broke', Sh.dur - 1.2); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt);
      if (lt >= Sh.tB) { S.npHat(c, 400, 640, 1.2, .15); return; }
      const rise = E.out(seg(lt, Sh.tS, Sh.tS + .6)), back = seg(lt, Sh.tR, Sh.tR + 2);
      [C.BRIT, C.BRIT2, C.BRIT, C.BRIT2].forEach((ch, k) => { const x = 820 + k * 90, y = 560 + (k % 2) * 10 + (1 - rise) * 60; c.save(); c.beginPath(); c.rect(0, 0, 1280, 590 + (k % 2) * 10); c.clip(); fig(c, ch, x, y, 32, pose(lt, k, { face: -1, shN: rise > .9 ? 85 : 20, elN: rise > .9 ? 0 : 40, shF: rise > .9 ? 80 : 10, holdN: musket(c, rise > .9 ? 0 : -1.3) }), lt, k, L, { look: [-.6, 0] }); c.restore();
        const t = lt - Sh.tF - k * .1; if (t > 0 && t < .2) VP.glow(c, x - 60, 520, 40, '#ffd080', .8); });
      if (lt > Sh.tF) S.npSmoke(c, lt, 700, 470, 400, 80, .35 * (1 - seg(lt, Sh.tF + 3, Sh.tB)), 41);
      [C.GUARD, C.GUARD, C.GUARD, C.GUARD].forEach((ch, k) => { const x0 = 160 + k * 110 + lt * 18 * (1 - back), x = x0 - back * 300, y = 640 - k * 6; fig(c, ch, x, y, 34, lt < Sh.tR ? walk(lt * .8, k, { face: 1, holdN: musket(c, -1.3) }) : Object.assign(H1.walk(lt * 1.8 + k), { face: -1, holdN: musket(c, -1.3) }), lt, k + 4, L, { look: [.5, -.2], worry: back > 0 ? 1 : 0 }); }); },
    over: [(c, lt, u, Sh) => K.badge(c, 'THE IMPERIAL GUARD', lt, { at: .5, until: Sh.tS }), (c, lt, u, Sh) => K.card(c, 'THE ARMY BREAKS', lt, { at: Sh.tB + .2, x: 1340, y: 150, px: 56, rot: -2 })],
    sfx: [[.2, 'drum_loop', .35], [.3, 'battle_loop', .3], ['stood up', 'swish', .4], ['fired', 'volley', .7], ['fell back', 'drum', .3], ['broke', 'thud', .5]] },
];
VP.build(); K.boot();
</script></body></html>
