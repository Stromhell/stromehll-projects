const PX = S.mgPX;
const ALL = [[PL.steppe, 0, 180], [PX(90, 44), 0, 170], [PL.beijing, 0, 120], [PX(108, 34), 0, 110], [PL.otrar, 0, 150], [PL.samarkand, 0, 150], [PL.nishapur, 0, 130], [PL.sarai, 0, 150], [PL.kiev, 0, 120], [PX(50, 52), 0, 140], [PL.tabriz, 0, 120], [PL.baghdad, 0, 110], [PX(41, 37), 0, 90]];
const SYR = [[PL.aleppo, 0, 60, .5], [PL.damascus, .4, 55, .9]];
const MON = [C.MONGOL, C.MONGOL2, C.MONGOL3, C.MONGOL4], MAM = [C.MAMLUK, C.MAMLUK2, C.MAMLUK3];
const arrows = (c, lt, x0, x1, y, t0, n = 6) => { for (let k = 0; k < n; k++) { const q = (lt - t0 - k * .12) / .7; if (q < 0 || q > 1) continue; const x = lerp(x0, x1, q), yy = y + k * 10 - Math.sin(q * Math.PI) * 60;
  c.strokeStyle = '#2a1a10'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 18, yy + 2); c.lineTo(x + 18, yy - 2); c.stroke(); } };
const block = (c, x, y, a) => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.fillStyle = '#e8b830'; c.strokeStyle = '#7a5a10'; c.lineWidth = 3; c.beginPath(); c.roundRect(x - 34, y - 20, 68, 40, 6); c.fill(); c.stroke(); c.restore(); };

window.SHOTS = [
  // 5.01 WIDE: the green valley at the Spring of Goliath; Mamluks with yellow banners on the hills, Mongol riders on the valley floor
  { set: 'mg_ainjalut', cam: { z: [1.0, 1.08], x: [640, 680], y: [380, 390], ease: E.io }, bed: [['wind_loop', .25], ['drone', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'september', 5); Sh.tV = at(Sh, 'valley', 7); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt); S.mgTug(c, 1240, 560, 120, lt, '#1a1a1e');
      for (let i = 0; i < 9; i++) { const x0 = 120 + i * 52, w = seg(lt, .3 + i * .25, 2.8 + i * .25), x = lerp(-60 - i * 20, x0, E.out(w));
        fig(c, MAM[i % 3], x, 440 + (i % 2) * 8, 13, w < 1 ? walk(lt, i, { face: 1, holdN: S.mgSpear(c, -1.45) }) : pose(lt, i, { face: 1, holdN: S.mgSpear(c, -1.45) }), lt, i, L, { look: [.6, 0] }); }
      S.mgBanner(c, 150, 450, 90, lt); S.mgBanner(c, 400, 446, 90, lt + 1);
      for (let i = 0; i < 6; i++) { const x0 = 700 + i * 95, w = seg(lt, Sh.tV - 2 + i * .2, Sh.tV + .6 + i * .2), x = lerp(1400 + i * 60, x0, E.out(w));
        ride(c, MON[i % 4], x, 580 + (i % 2) * 22, 20, i % 2 ? BAY : GREYH, lt, lt * 1.4 + i, w > 0 && w < 1 ? 1 : 0, L, { shN: 20, elN: 60 }, { look: [-.7, -.1] }, -1); }
      },
    over: [(c, lt, u, Sh) => K.card(c, 'AIN JALUT · 3 SEPT 1260', lt, { at: Sh.tS, x: 960, y: 140, px: 56, rot: -2 })],
    sfx: [[.2, 'wind_loop', .25], [.3, 'drone', .15], [.6, 'march_loop', .25], ['valley', 'hooves', .35], ['september', 'drum', .45]] },

  // 5.02 MED: Baybars' riders charge, loose arrows, then wheel and gallop back toward the hills
  { set: 'mg_ainjalut', cam: { z: [1.15, 1.2], x: [760, 740], y: [430, 430], ease: E.io }, bed: [['battle_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'turned', 2.8); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), inq = E.out(seg(lt, 0, 1.6)), back = seg(lt, Sh.tT, Sh.dur - .2), turned = lt > Sh.tT;
      for (let i = 0; i < 5; i++) { const x0 = 1010 + i * 60; ride(c, MON[i % 4], x0, 520 + (i % 2) * 26, 20, i % 2 ? GREYH : BAY, lt, lt + i, 0, L, { shN: 60, elN: 30, holdN: S.mgBow(c) }, { look: [-.8, 0] }, -1); }
      for (let i = 0; i < 4; i++) { const xs = 640 - i * 120, x = turned ? xs - E.io(back) * (1100 + i * 40) : lerp(-260 - i * 140, xs, inq), y = 520 + (i % 2) * 34;
        ride(c, i ? MAM[i % 3] : C.BAYBARSB, x, y, i ? 21 : 23, i % 2 ? BAY : WHITEH, lt, lt * 2.4 + i, (inq < 1 || turned) ? 1.6 : 0, L, { shN: 70, elN: 20, lean: 12, holdN: S.mgBow(c) }, { look: [turned ? -.8 : .8, 0], angry: 1 }, turned ? -1 : 1); }
      arrows(c, lt, 560, 1020, 430, 1.4, 7); S.mgDust(c, lt, 120, 560, 520, .3); },
    over: [(c, lt) => K.card(c, 'BAYBARS · VANGUARD', lt, { at: .5, x: 480, y: 150, px: 46, rot: -2 })],
    sfx: [[.1, 'battle_loop', .25], [.2, 'hooves_loop', .4], [1.4, 'swish', .4], [1.7, 'swish', .35], ['turned', 'horn', .35]] },

  // 5.03 MED: battle map; a grey arrow chases a gold arrow into the hills, where hidden gold blocks close a ring around it
  { set: 'np_parch', cam: { z: [1.05, 1.12], x: [640, 640], y: [370, 370], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'chased', 2.5); Sh.tH = at(Sh, 'main', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => {
      c.fillStyle = S.rgba('#7a8a4a', .35); [[260, 260, 200], [1020, 260, 210], [640, 160, 260]].forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, r, r * .55, 0, 0, TAU); c.fill(); });
      S.mgLabel(c, 'HILLS', 640, 120, 1, 28, '#4a5a2a'); S.mgLabel(c, 'VALLEY', 640, 520, 1, 28, '#5a3a1a');
      const g = E.io(seg(lt, .3, Sh.tC + 1.5)), m = E.io(seg(lt, Sh.tC - .3, Sh.tH + .3));
      S.mgArrow(c, [1000, 520], [640, 300], g, S.rgba('#c89a20', .9), 20, .15);
      S.mgArrow(c, [1180, 560], [700, 330], m, S.rgba('#3a3a40', .85), 26, .15);
      const cl = E.io(seg(lt, Sh.tH, Sh.tH + 1.4));
      for (let k = 0; k < 8; k++) { const a = k / 8 * TAU, r = lerp(300, 150, cl), x = 690 + Math.cos(a) * r, y = 320 + Math.sin(a) * r * .6; block(c, x, y, seg(lt, Sh.tH - .4 + k * .05, Sh.tH + k * .05)); } },
    over: [(c, lt, u, Sh) => K.card(c, 'THEIR OWN TRICK', lt, { at: .6, x: 1400, y: 900, px: 48, rot: 2, until: Sh.tH })],
    sfx: [[.2, 'drone', .2], [.4, 'whoosh', .3], ['chased', 'whoosh', .3], ['main', 'drum', .45], ['main', 'tension', .3]] },

  // 5.04 MED: Qutuz pulls off his helmet in the middle of the fight and charges; his men turn back to follow him
  { set: 'mg_ainjalut', cam: (lt, u, Sh) => ({ z: [lerp(1.2, 1.35, E.io(seg(lt, Sh.tH - 1, Sh.tH + .6)))], x: [lerp(700, 640, E.io(seg(lt, Sh.tH - 1, Sh.tH + .6)))], y: [440] }), bed: [['battle_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'helmet', 3.6); Sh.tI = at(Sh, 'islam', Sh.dur - 2.4); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), bare = lt > Sh.tH, ch = seg(lt, Sh.tI, Sh.dur), push = E.io(seg(lt, 0, Sh.tH)) * (1 - E.io(ch));
      for (let i = 0; i < 4; i++) { const x = 980 + i * 90 - push * 120 + E.io(ch) * 700; if (x > 1400) continue; ride(c, MON[i % 4], x, 500 + (i % 2) * 40, 21, i % 2 ? BAY : GREYH, lt, lt * 2 + i, ch > 0 ? 1.6 : .6, L, { shN: 60, elN: 30, holdN: S.mgSpear(c, -.2) }, { look: [-.8, 0], angry: 1 }, ch > 0 ? 1 : -1); }
      for (let i = 0; i < 3; i++) { const x = 380 - i * 130 + E.io(ch) * 900, f = bare ? 1 : -1; if (x > 1400) continue; ride(c, MAM[i], x, 500 + (i % 2) * 40, 21, i % 2 ? GREYH : BAY, lt, lt * 2 + i, ch > 0 ? 1.6 : 0, L, { shN: 60, elN: 30, holdN: S.mgSpear(c, -.2) }, { look: [f * .8, 0], worry: bare ? 0 : 1 }, ch > 0 ? 1 : f); }
      const qx = 640 + E.io(ch) * 800; ride(c, bare ? C.QUTUZB : C.QUTUZ, qx, 540, 25, WHITEH, lt, lt * 2.4, ch > 0 ? 1.6 : 0, L, { shN: bare && !ch ? 150 : 70, elN: bare && !ch ? 10 : 30, lean: ch > 0 ? 14 : 0 }, { look: [.8, -.2], angry: bare ? 1 : 0, open: lt > Sh.tI && lt < Sh.tI + 1.5 ? 1 : 0 }, 1);
      S.mgBanner(c, 230 + E.io(ch) * 900, 520, 150, lt); S.mgDust(c, lt, 300, 560, 700, .25); },
    over: [(c, lt, u, Sh) => K.card(c, '“O ISLAM!”', lt, { at: Sh.tI, x: 960, y: 150, px: 72, rot: -2 })],
    sfx: [[.1, 'battle_loop', .3], [.2, 'hooves_loop', .35], ['helmet', 'clank', .4], ['islam', 'crowd_cheer', .4], ['islam', 'horn', .4]] },

  // 5.05 MED: Mongol banners fall in the grass; the golden tablet lies by the spring
  { set: 'mg_ainjalut', cam: { z: [1.35, 1.45], x: [440, 420], y: [520, 520], ease: E.io }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'captured', 1); Sh.tD = at(Sh, 'destroyed', 3); },
    draw: (c, lt, u, Sh) => {
      S.mgTug(c, 560, 600, 150, lt, '#1a1a1e', E.inn(seg(lt, Sh.tC, Sh.tC + .9)));
      S.mgTug(c, 660, 590, 140, lt + 1, '#e8e4dc', E.inn(seg(lt, Sh.tD, Sh.tD + .9)));
      S.mgPaiza(c, 400, 600, .55, -.5, .2 + .25 * Math.sin(lt * 2), false); VP.motes(c, lt, 260, 420, 500, 160, { n: 8 }); },
    over: [],
    sfx: [[.2, 'wind_loop', .3], ['captured', 'thud', .45], ['destroyed', 'thud', .45], ['destroyed', 'drone', .25]] },

  // 5.06 WIDE: the map; the grey tide halts at a bright line through Syria and pulls back
  { set: 'np_parch', cam: { z: [1.5, 1.6], x: [340, 340], y: [330, 335], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'beaten', 2); Sh.tS = at(Sh, 'stopped', Sh.dur - 3.5); },
    draw: (c, lt, u, Sh) => { const back = E.io(seg(lt, Sh.tS, Sh.tS + 2.4)), ln = E.io(seg(lt, Sh.tL - .4, Sh.tL + .6));
      S.mgAsia(c, { fill: cc => { S.mgTide(cc, 1, ALL); S.mgTide(cc, 1 - back, SYR); cc.fillStyle = S.rgba('#e8b830', .45); cc.beginPath(); cc.arc(PL.cairo[0] - 10, PL.cairo[1] + 40, 80, 0, TAU); cc.fill(); } });
      const a = PX(33.5, 31.2), b = PX(38.5, 33.6); c.save(); c.strokeStyle = S.rgba('#ffd860', .95); c.lineWidth = 8; c.shadowColor = '#ffd860'; c.shadowBlur = 18; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(lerp(a[0], b[0], ln), lerp(a[1], b[1], ln)); c.stroke(); c.restore();
      S.mgDot(c, PL.ainjalut, 'AIN JALUT', 1, 1, 20, 26, -40); S.mgDot(c, PL.cairo, 'CAIRO', 1, 1, 20, 30); },
    over: [(c, lt, u, Sh) => K.card(c, 'FIRST DEFEAT THAT STUCK', lt, { at: Sh.tL + .4, x: 1360, y: 150, px: 46, rot: 2 })],
    sfx: [[.2, 'drone', .2], ['beaten', 'chime', .45], ['stopped', 'swell', .35], ['stopped', 'whoosh', .3]] },
];
VP.build(); K.boot();
</script></body></html>
