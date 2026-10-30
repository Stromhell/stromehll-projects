const PX = S.mgPX;
const MON = [C.MONGOL, C.MONGOL2, C.MONGOL3, C.MONGOL4], MAM = [C.MAMLUK, C.MAMLUK2, C.MAMLUK3];
const cushion = (c, x, y) => { c.fillStyle = '#7a1a1a'; c.beginPath(); c.roundRect(x - 90, y - 18, 180, 26, 10); c.fill(); c.fillStyle = '#c8a040'; c.fillRect(x - 90, y - 4, 180, 4); };
const castle = (c, x, y, s, a) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(s * a, s * a); c.fillStyle = '#8a6a3a'; c.strokeStyle = '#3a2410'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-20, 0); c.lineTo(-20, -24); for (let k = 0; k < 5; k++) { c.lineTo(-20 + k * 10, -30); c.lineTo(-20 + k * 10 + 5, -30); c.lineTo(-20 + k * 10 + 5, -24); c.lineTo(-20 + k * 10 + 10, -24); } c.lineTo(20, 0); c.closePath(); c.fill(); c.stroke(); c.restore(); };
const GOLD = [[PL.cairo, 0, 90], [PL.damascus, 0, 60], [PL.aleppo, 0, 55], [PX(35.5, 33), 0, 55]];
const GREYE = [[PL.tabriz, 0, 120], [PL.baghdad, 0, 110], [PX(50, 52), 0, 140], [PL.sarai, 0, 150], [PL.samarkand, 0, 150]];

window.SHOTS = [
  // 6.01 MED: a hunting party in the desert; officers close around Qutuz; then Baybars crowned in Cairo
  { set: 'sz_dunes', cam: (lt, u, Sh) => lt < Sh.tS ? { z: [lerp(1.05, 1.2, seg(lt, 0, Sh.tS))], x: [640], y: [430] } : { z: [1.1], x: [640], y: [450] }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'officers', 3.2); Sh.tS = at(Sh, 'became', Sh.dur - 2.8); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tS) { const L = SUN(lt), cl = E.io(seg(lt, Sh.tO - .3, Sh.tO + 1.4));
        ride(c, C.QUTUZ, 640, 600, 26, WHITEH, lt, lt * 1.2, cl < 1 ? .5 : 0, L, { shN: 20, elN: 60 }, { look: [cl > .5 ? -.6 : .7, 0], worry: cl > .6 ? 1 : 0 }, 1);
        ride(c, C.BAYBARS, lerp(260, 470, cl), 590, 25, BAY, lt, lt * 1.2 + 1, cl > 0 && cl < 1 ? 1 : .5, L, { shN: 20, elN: 60 }, { look: [.7, 0], angry: cl > .5 ? 1 : 0 }, 1);
        ride(c, MAM[1], lerp(1080, 820, cl), 610, 25, GREYH, lt, lt * 1.2 + 2, cl > 0 && cl < 1 ? 1 : .5, L, { shN: 20, elN: 60 }, { look: [-.7, 0], angry: cl > .5 ? 1 : 0 }, -1);
        ride(c, MAM[2], lerp(1300, 1000, cl), 560, 23, BAY, lt, lt * 1.2 + 3, cl > 0 && cl < 1 ? 1 : .5, L, { shN: 20, elN: 60 }, { look: [-.7, 0] }, -1);
        c.fillStyle = S.rgba('#1a0a08', .55 * seg(lt, Sh.tO + 1.6, Sh.tS)); c.fillRect(0, 0, 1280, 720); return; }
      const L = CANDLE(lt), bw = E.io(seg(lt, Sh.tS + .4, Sh.tS + 1.4)); VP.drawSet(c, 'throne'); cushion(c, 640, 600);
      fig(c, C.BAYBARSK, 640, 600, 34, Object.assign(VP.sit(C.BAYBARSK, lt * .3, 2, { seat: .2 }), { face: 1, shN: 20, elN: 30 }), lt, 0, L, { look: [.3, .1] });
      [[330, 1], [460, 1], [840, -1], [970, -1]].forEach(([x, f], k) => fig(c, k % 2 ? C.COURTIER : MAM[k % 3], x, 670, 32, pose(lt, k + 2, { face: f, lean: 26 * bw, shN: 20, elN: 60 }), lt, k + 2, L, { look: [f * .5, .4 * bw] })); },
    over: [(c, lt) => K.dateTag(c, 'OCTOBER 1260', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'SULTAN BAYBARS', lt, { at: Sh.tS + .5, x: 1360, y: 150, px: 52, rot: 2 })],
    sfx: [[.2, 'wind_loop', .3], [.3, 'hooves', .3], ['officers', 'tension', .35], ['officers', 'heartbeat', .3], ['became', 'swell', .35], ['became', 'bell', .3]] },

  // 6.02 MED: Baybars rides along ranks of Mamluk cavalry; then the map, castles rising and Egypt and Syria staying gold
  { set: 'mg_square', cam: (lt, u, Sh) => lt < Sh.tM ? { z: [lerp(1.0, 1.06, seg(lt, 0, Sh.tM))], x: [640], y: [400] } : { z: [1.6], x: [330], y: [330] }, bed: [['march_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'strongest', 5); Sh.tA = at(Sh, 'again', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tM) { const L = SUN(lt);
        for (let i = 0; i < 6; i++) ride(c, MAM[i % 3], 420 + i * 140, 540, 20, i % 2 ? BAY : GREYH, lt, lt + i, 0, L, { shN: 10, elN: 40, holdN: S.mgSpear(c, -1.45) }, { look: [-.3, 0] }, -1);
        const w = seg(lt, .2, Sh.tM), bx = lerp(1360, 260, w); ride(c, C.BAYBARSK, bx, 640, 26, WHITEH, lt, lt * 1.1, w < 1 ? .6 : 0, L, { shN: 20, elN: 60 }, { look: [-.5, -.2] }, -1); return; }
      VP.drawSet(c, 'np_parch');
      S.mgAsia(c, { fill: cc => { S.mgTide(cc, 1, GREYE); S.mgTide(cc, 1, GOLD, '#e8b830', .5); } });
      [[PX(37.2, 37.6), 0], [PX(36.2, 34.2), .4], [PX(34.6, 31.4), .8], [PX(39.6, 35.4), 1.2]].forEach(([p, d]) => castle(c, p[0], p[1], .55, E.out(seg(lt, Sh.tM + .6 + d, Sh.tM + 1.2 + d))));
      [0, 1, 2].forEach(k => { const q = seg(lt, Sh.tA + k * .5, Sh.tA + k * .5 + .6); if (q > 0 && q < 1) { const p = PX(39 - k * .8, 35.5 - k * .6); VP.glow(c, p[0], p[1], 40, '#ffd860', .6 * Math.sin(q * Math.PI)); } });
      S.mgDot(c, PL.cairo, 'CAIRO', 1, 1, 20, 30); },
    over: [(c, lt) => K.card(c, '1260–1277', lt, { at: .6, x: 480, y: 150, px: 50, rot: -2 })],
    sfx: [[.2, 'march_loop', .25], [.4, 'hooves', .3], ['strongest', 'whoosh', .35], ['strongest', 'clank', .3], ['again', 'drum', .4]] },

  // 6.03 MED: two Mongol armies face each other across a frozen river; Berke in a turban over his fur hat
  { set: 'mg_steppe', cam: { z: [1.0, 1.08], x: [640, 640], y: [410, 420], ease: E.io }, bed: [['wind_loop', .35]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'berke', 3); Sh.tW = at(Sh, 'war', Sh.dur - 3.2); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt);
      c.fillStyle = '#c8d8e4'; c.beginPath(); c.moveTo(600, 400); c.lineTo(680, 400); c.lineTo(760, 720); c.lineTo(540, 720); c.closePath(); c.fill();
      c.strokeStyle = S.rgba('#ffffff', .7); c.lineWidth = 2; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(610 + k * 12, 430 + k * 50); c.lineTo(640 + k * 10, 460 + k * 50); c.stroke(); }
      for (let i = 0; i < 5; i++) { const x = 160 + i * 75, y = 520 + (i % 2) * 40; ride(c, i === 2 ? C.BERKE : MON[i % 4], x, y, i === 2 ? 24 : 20, i % 2 ? BAY : GREYH, lt, lt + i, 0, L, { shN: 10, elN: 40 }, { look: [.8, 0], angry: lt > Sh.tW ? 1 : 0 }, 1); }
      for (let i = 0; i < 5; i++) { const x = 840 + i * 75, y = 520 + (i % 2) * 40; ride(c, i === 2 ? C.HULAGUH : MON[(i + 1) % 4], x, y, i === 2 ? 24 : 20, i % 2 ? GREYH : BAY, lt, lt + i + 2, 0, L, { shN: 10, elN: 40 }, { look: [-.8, 0], angry: lt > Sh.tW ? 1 : 0 }, -1); }
      S.mgTug(c, 70, 600, 150, lt, '#e8e4dc'); S.mgTug(c, 1230, 600, 150, lt + 1, '#1a1a1e');
      VP.motes(c, lt, 0, 0, 1280, 500, { n: 14 }); },
    over: [(c, lt) => K.card(c, 'MONGOL VS MONGOL · 1262', lt, { at: .5, x: 960, y: 130, px: 54, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'BERKE · GOLDEN HORDE', lt, { at: Sh.tB, x: 520, y: 280, px: 40, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'HULAGU', lt, { at: Sh.tW, x: 1440, y: 280, px: 40, rot: 2 })],
    sfx: [[.2, 'wind_loop', .35], [.4, 'drone', .2], ['berke', 'chime', .3], ['war', 'horn', .45], ['war', 'drum', .4]] },

  // 6.04 MED: a Persian court; Ghazan Khan in rich robes; scholars and courtiers bow
  { set: 'mg_iwan', cam: { z: [1.08, 1.18], x: [640, 640], y: [450, 450], ease: E.io }, bed: [['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tG = at(Sh, 'ghazan', 4.5); Sh.tF = at(Sh, 'followed', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), bw = E.io(seg(lt, Sh.tF - .4, Sh.tF + .8));
      fig(c, C.GHAZAN, 640, 650, 38, pose(lt, 0, { face: 1, shN: 30, elN: 70 }), lt, 0, L, { look: [.2, .1] });
      [[330, 1, C.SCHOLAR], [460, 1, C.COURTIER], [830, -1, C.SCHOLAR2], [960, -1, C.SCRIBE]].forEach(([x, f, ch], k) => {
        const w = seg(lt, .2 + k * .3, 2 + k * .3), xx = lerp(f > 0 ? -80 - k * 60 : 1360 + k * 60, x, E.out(w));
        fig(c, ch, xx, 670, 32, w < 1 ? walk(lt, k + 1, { face: f }) : pose(lt, k + 1, { face: f, lean: 30 * bw, shN: 20, elN: 70 }), lt, k + 1, L, { look: [f * .5, .4 * bw] }); });
      VP.motes(c, lt, 300, 260, 680, 300, { n: 10 }); },
    over: [(c, lt, u, Sh) => K.card(c, 'GHAZAN KHAN · 1295', lt, { at: Sh.tG, x: 1360, y: 150, px: 52, rot: 2 })],
    sfx: [[.2, 'drone', .15], [.3, 'footsteps', .25], ['ghazan', 'chime', .4], ['followed', 'swell', .3]] },

  // 6.05 WIDE: the valley at sunset; the golden tablet in the grass by the spring
  { set: 'mg_ainjalut', cam: { z: [1.0, 1.4], x: [640, 420], y: [380, 520], ease: E.io }, bed: [['wind_loop', .25], ['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'slaves', Sh.dur - 5); },
    draw: (c, lt, u, Sh) => { c.fillStyle = S.rgba('#e07830', .28); c.fillRect(0, 0, 1280, 720); c.fillStyle = S.rgba('#3a1a3a', .12 + .1 * seg(lt, 0, Sh.dur)); c.fillRect(0, 0, 1280, 720);
      S.mgPaiza(c, 400, 600, .55, -.5, .35 + .3 * Math.sin(lt * 1.5), false); VP.glow(c, 400, 600, 90, '#ffc070', .3);
      VP.motes(c, lt, 200, 300, 700, 300, { n: 12 }); },
    over: [],
    sfx: [[.2, 'wind_loop', .25], [.3, 'drone', .15], ['slaves', 'swell', .35], ['conquered', 'chime', .35]] },
];
VP.build(); K.boot();
</script></body></html>
