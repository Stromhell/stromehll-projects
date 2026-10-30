const PX = S.mgPX;
const bale = (c, x, y, s, col = '#c8a070', rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); c.fillStyle = S.rgba('#000000', .25); c.beginPath(); c.ellipse(0, 4, 34, 6, 0, 0, TAU); c.fill(); c.fillStyle = col; c.beginPath(); c.roundRect(-30, -34, 60, 36, 8); c.fill(); c.strokeStyle = '#5a3a1e'; c.lineWidth = 3; c.beginPath(); c.moveTo(-30, -18); c.lineTo(30, -18); c.moveTo(0, -34); c.lineTo(0, 2); c.stroke(); c.restore(); };
const felt = (c, x, y, w) => { c.fillStyle = '#f4efe4'; c.beginPath(); c.ellipse(x, y, w, 14, 0, 0, TAU); c.fill(); c.strokeStyle = '#b8b0a0'; c.lineWidth = 2; c.stroke(); };
const cushion = (c, x, y) => { c.fillStyle = '#7a1a22'; c.beginPath(); c.roundRect(x - 60, y - 6, 120, 30, 10); c.fill(); c.fillStyle = '#c8a040'; c.fillRect(x - 60, y + 2, 120, 4); };

window.SHOTS = [
  // 1.01 WIDE: the 1206 gathering; felt tents, horsetail standards, a crowd; Temujin lifted on a white felt
  { set: 'mg_steppe', cam: { z: [1.0, 1.12], x: [640, 640], y: [400, 430], ease: E.io }, bed: [['crowd_loop', .2], ['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tU = at(Sh, 'united', 2.5); Sh.tG = at(Sh, 'genghis', 5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), up = E.io(seg(lt, Sh.tU, Sh.tU + 1.6));
      [[150, 560], [330, 548], [960, 548], [1140, 560]].forEach(([x, y], k) => S.mgTug(c, x, y, 150, lt + k, k % 2 ? '#1a1a1e' : '#e8e4dc'));
      const crowd = [C.MONGOL, C.MONGOL3, C.MONGOL4, C.MONGOL2, C.MONGOL3, C.MONGOL4, C.MONGOL, C.MONGOL2];
      crowd.forEach((ch, i) => { const x = i < 4 ? 120 + i * 90 : 820 + (i - 4) * 90, y = 600 + (i % 2) * 22; fig(c, ch, x, y, 28, pose(lt, i, { face: x < 640 ? 1 : -1, shN: lt > Sh.tG ? 150 + 10 * Math.sin(lt * 5 + i) : 20, elN: lt > Sh.tG ? 20 : 30 }), lt, i, L, { look: [x < 640 ? .7 : -.7, -.4], smile: lt > Sh.tG ? .6 : 0 }); });
      // four bearers lift the felt over their heads; two behind it, two in front at its ends
      const fy = 612 - 180 * up, B = [[590, 1, C.MONGOL4], [690, -1, C.MONGOL3], [530, 1, C.MONGOL3], [750, -1, C.MONGOL4]];
      const bearer = ([x, f, ch], k) => fig(c, ch, x, 650, 30, pose(lt, k + 10, { face: f, shN: 70 + 100 * up, elN: 40 - 30 * up, shF: 70 + 100 * up, elF: 40 - 30 * up }), lt, k + 10, L, { look: [f * .3, -.6] });
      bearer(B[0], 0); bearer(B[1], 1);
      felt(c, 640, fy, 120);
      fig(c, C.GENGHIS, 640, fy, 32, pose(lt, 20, { face: 1, shN: 20 + 60 * up, elN: 40 }), lt, 20, L, { look: [.4, -.2], smile: .3 * up });
      bearer(B[2], 2); bearer(B[3], 3);
      VP.motes(c, lt, 0, 300, 1280, 300, { n: 10 }); },
    over: [(c, lt) => K.dateTag(c, 'MONGOLIA · 1206', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'TEMÜJIN → GENGHIS KHAN', lt, { at: Sh.tG, x: 1300, y: 160, px: 52, rot: -2 })],
    sfx: [[.2, 'crowd_loop', .2], [.3, 'wind_loop', .15], ['united', 'drum', .4], ['genghis', 'crowd_cheer', .45]] },

  // 1.02 MED: a camel caravan with silk and furs crosses the desert toward a walled city
  { set: 'outpost', cam: { z: [1.0, 1.06], x: [600, 680], y: [400, 400], ease: E.io }, bed: [['wind_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'khwarazmian', 2); Sh.tN = at(Sh, 'four hundred', 7); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      for (let i = 0; i < 5; i++) { const x = -160 + ((lt * 34 + i * 230) % 1500) - 80, y = 640 + (i % 2) * 18; if (x < -200 || x > 1380) continue;
        S.szCamel(c, x, y, .78, 1, lt * .9 + i * .3, i % 2 ? '#a87a44' : '#b8884e'); bale(c, x - 8, y - 112, .9, i % 3 ? '#a82a3a' : '#2a6a8a'); bale(c, x + 22, y - 112, .7, '#c8a070');
        fig(c, i % 2 ? C.MERCH : C.MERCH2, x + 118, y + 10, 28, walk(lt, i, { face: 1 }), lt, i, L, { look: [.6, 0] }); }
      S.mgDust(c, lt, 0, 680, 1280, .18); },
    over: [(c, lt) => K.dateTag(c, '1218', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'KHWARAZMIAN EMPIRE', lt, { at: Sh.tW, x: 1300, y: 150, px: 50, rot: -2 }), (c, lt, u, Sh) => K.card(c, '~450 MERCHANTS', lt, { at: Sh.tN, x: 1360, y: 250, px: 46, rot: 2 })],
    sfx: [[.2, 'wind_loop', .2], [.4, 'camel_bell', .3], [2, 'footsteps', .15], ['four hundred', 'coins', .3]] },

  // 1.03 MED: Otrar; the governor in silk points; guards close in; then the gate is shut and the bales lie scattered
  { set: 'towngate', cam: { z: [1.05, 1.12], x: [640, 640], y: [430, 430], ease: E.io }, bed: [['tension', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'spying', 2.5); Sh.tK = at(Sh, 'killed', 5); },
    draw: (c, lt, u, Sh) => { const L = GREY(lt), cl = E.io(seg(lt, Sh.tK, Sh.tK + 1));
      if (cl < 1) { const q = E.io(seg(lt, Sh.tS, Sh.tS + 2));
        fig(c, C.GOVERNOR, 300, 640, 34, pose(lt, 0, { face: 1, shN: lt > Sh.tS ? 95 : 20, elN: lt > Sh.tS ? 5 : 40 }), lt, 0, L, { look: [.8, 0], angry: 1 });
        [C.KGUARD, C.KGUARD2].forEach((ch, k) => { const x = lerp(160 + k * 60, 760 + k * 70, q); fig(c, ch, x, 650, 32, q > 0 && q < 1 ? walk(lt, k + 2, { face: 1, holdN: S.mgSpear(c, -.5) }) : pose(lt, k + 2, { face: 1, holdN: S.mgSpear(c, -.5) }), lt, k + 2, L, { look: [.8, 0], angry: 1 }); });
        [C.MERCH, C.MERCH2].forEach((ch, k) => fig(c, ch, 960 + k * 120, 650, 32, pose(lt, k + 5, { face: -1, shN: 60 + 40 * q, elN: 90, lean: -6 * q }), lt, k + 5, L, { look: [-.8, 0], worry: 1 })); }
      bale(c, 880, 660, 1.1, '#a82a3a', .3 * cl); bale(c, 1000, 672, 1.0, '#2a6a8a', -.4 * cl); bale(c, 1120, 664, 1.1, '#c8a070', .6 * cl);
      if (cl > 0) { c.save(); c.globalAlpha = 1; c.fillStyle = '#3a2416'; const w = 70 * cl; c.fillRect(560, 470, w, 220); c.fillRect(720 - w, 470, w, 220); c.restore(); } },
    over: [(c, lt) => K.dateTag(c, 'OTRAR', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '“SPIES”', lt, { at: Sh.tS, x: 520, y: 170, px: 56, rot: -3 })],
    sfx: [[.2, 'tension', .25], ['spying', 'drum', .35], ['killed', 'gate_slam', .5]] },

  // 1.04 MED: the shah's throne room; a Mongol envoy wearing a golden tablet stands before the throne; guards step forward
  { set: 'throne', cam: { z: [1.05, 1.15], x: [640, 640], y: [440, 440], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tX = at(Sh, 'executed', 4); Sh.tH = at(Sh, 'humiliated', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), g = E.io(seg(lt, Sh.tX, Sh.tX + 1.2)), go = seg(lt, Sh.tH - .4, Sh.dur);
      cushion(c, 640, 600); fig(c, C.SHAH, 640, 600, 34, Object.assign(VP.sit(C.SHAH, lt * .3, 2, { seat: .2 }), { face: 1, shN: lt > Sh.tX ? 80 : 20, elN: 20 }), lt, 0, L, { look: [.6, .1], angry: lt > Sh.tX ? 1 : 0 });
      const ex = 920, ey = 660; if (g < 1) { fig(c, C.ENVOY, ex, ey, 34, pose(lt, 1, { face: -1, shN: 30, elN: 60 }), lt, 1, L, { look: [-.8, -.2] }); S.mgPaiza(c, ex - 4, ey - 34 * 3.6, .3, 0, .4 + .4 * Math.sin(lt * 3), false); }
      [[430, 1], [850, -1]].forEach(([x, f], k) => { const xx = k ? lerp(1180, ex - 40, g) : lerp(430, ex - 140, g); fig(c, k ? C.KGUARD : C.KGUARD2, xx, 660, 34, g > 0 && g < 1 ? walk(lt, k + 3, { face: k ? -1 : 1, holdN: S.mgSpear(c, -1.4) }) : pose(lt, k + 3, { face: k ? -1 : 1, holdN: S.mgSpear(c, -1.4) }), lt, k + 3, L, { look: [k ? -.6 : .6, 0], angry: 1 }); });
      if (g >= 1) { // the lead envoy has been taken away; the other two leave, heads down
        [C.ENVOY2, C.MONGOL4].forEach((ch, k) => { const x = lerp(1000 + k * 100, 1400 + k * 100, E.inn(go)); fig(c, ch, x, 660, 32, go > 0 ? walk(lt, k + 7, { face: 1, lean: 8 }) : pose(lt, k + 7, { face: -1, lean: 6 }), lt, k + 7, L, { look: [.5, .6], worry: 1 }); }); } },
    over: [(c, lt) => K.card(c, 'SHAH MUHAMMAD II', lt, { at: .6, x: 480, y: 170, px: 52, rot: -2 })],
    sfx: [[.2, 'drone', .2], [.8, 'footsteps', .25], ['justice', 'paper', .3], ['executed', 'hit', .45], ['humiliated', 'footsteps', .3]] },

  // 1.05 WIDE: endless Mongol cavalry crossing a mountain pass, spare horses beside each rider
  { set: 'pass', cam: { z: [1.0, 1.08], x: [640, 640], y: [400, 380], ease: E.io }, bed: [['hooves_loop', .45], ['drum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'worst crime', 3); Sh.tR = at(Sh, 'rode west', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      // a far column winding down the pass (small silhouettes), then two lanes of riders crossing, each leading a spare horse
      for (let i = 0; i < 26; i++) { const q = ((lt * .04) + i / 26) % 1, y = lerp(470, 560, q), x = 640 + Math.sin(q * 5 + 1) * 60 * q, s = lerp(4, 9, q); c.fillStyle = S.rgba('#3a2a1a', .85); c.fillRect(x - s * 1.6, y - s * 2.4, s * 3.2, s * 1.4); c.fillRect(x - s * .4, y - s * 4.4, s * .8, s * 2.2); c.fillRect(x - s * 1.4, y - s, s * .5, s); c.fillRect(x + s * .9, y - s, s * .5, s); }
      for (let k = 0; k < 4; k++) S.mgTug(c, 600 + k * 30, 520 + k * 4, 40 + k * 6, lt + k, '#1a1a1e');
      [[612, 28, 70, 0], [700, 38, 95, 1]].forEach(([y, uu, sp, lane]) => { for (let i = 0; i < 4; i++) { const x = -260 + ((lt * sp + i * 430 + lane * 200) % 1720); if (x < -300 || x > 1500) continue;
        VP.horse(c, x - uu * 8.5, y - 2, uu * 4.4, { face: 1, walk: 1, ph: lt * 1.3 + i * .37 + lane, t: lt, col: (i + lane) % 2 ? GREYH : BAY });
        ride(c, [C.MONGOL, C.MONGOL2, C.MONGOL3, C.MONGOL4][(i + lane) % 4], x, y, uu, (i + lane) % 3 ? BAY : WHITEH, lt, lt * 1.3 + i * .3 + lane, 1, L, { shN: 20, elN: 60 }, { look: [.7, .1] }, 1); } });
      S.mgDust(c, lt, 300, 720, 700, .2); },
    over: [(c, lt) => K.dateTag(c, '1219', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'KILLING AN ENVOY = THE WORST CRIME', lt, { at: Sh.tC, x: 960, y: 150, px: 46, rot: -2 })],
    sfx: [[.2, 'hooves_loop', .45], [.3, 'drum_loop', .2], ['worst crime', 'drum', .4], ['rode west', 'horn', .45]] },
];
VP.build(); K.boot();
</script></body></html>
