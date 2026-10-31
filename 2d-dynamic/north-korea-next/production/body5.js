const horse = (c, x, y, h, lt, L, o = {}) => VP.figure(c, [x, y], { k: .5, sy: -.2, a: .3, blur: 3 }, cc => VP.horse(cc, x, y, h, Object.assign({ face: 1, ph: 0, walk: 0, t: lt, col: WHITEH, tack: { cloth: ['#a82a22', '#5a1410'], trim: '#c8a040' } }, o), L));
const sit = (c, ch, x, y, uu, lt, k, L, o = {}, f = {}) => fig(c, ch, x, y, uu, Object.assign(VP.sit(ch, lt * .2, k, { seat: .4 }), o), lt, k, L, f);
const bust = (ch, x, y, w, lt, L, k, f = {}) => cc => fig(cc, ch, x, y - 80 + w * .55 * 7, w * .55, pose(0, k, { face: 1, shN: 4, elN: 6 }), lt, k, L, Object.assign({ look: [.1, 0] }, f));

window.SHOTS = [
  // 5.01 MED: a state TV studio; the announcer reads; behind her a gold-framed picture of father and daughter
  { set: 'nk_tv', cam: { z: [1.08, 1.15], x: [640, 640], y: [420, 420], ease: E.io }, bed: [['hum_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'titles', Sh.dur * .5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      S.nkPortrait(c, 900, 230, 340, 220, cc => { cc.fillStyle = '#c8b898'; cc.fillRect(730, 120, 340, 220); fig(cc, C.KIM, 860, 420, 30, pose(0, 0, { face: 1, shN: 8, elN: 10 }), 0, 0, L, { smile: 1 }); fig(cc, C.GIRL, 920, 420, 22, pose(0, 1, { face: -1, shN: -40, elN: 10 }), 0, 1, L, { smile: 1 }); }, '#d8b040');
      VP.glow(c, 1060, 130, 60, '#fff4c0', .3 + .3 * Math.max(0, Math.sin(lt * 2)));
      sit(c, C.ANNOUNCER, 420, 650, 40, lt, 0, L, { face: 1, shN: 60, elN: 90 + 6 * Math.sin(lt * 3) }, { look: [.2, .2], open: Math.sin(lt * 9) > 0 ? 1 : 0 });
      c.fillStyle = '#1a2a5a'; c.fillRect(230, 590, 400, 130); c.fillStyle = '#c8a040'; c.fillRect(230, 590, 400, 8); },
    over: [(c, lt) => K.card(c, '"RESPECTED DAUGHTER"', lt, { at: .8, x: 1400, y: 120, px: 48, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'SIGNS OF A SUCCESSOR?', lt, { at: Sh.tT + 1, x: 560, y: 120, px: 42, rot: -2 })],
    sfx: [[.1, 'hum_loop', .15], [.5, 'paper', .25], ['titles', 'chime', .3]] },

  // 5.02 MED: the intelligence wall again; the question marks are still there; one flips over and stays
  { set: 'nk_intel', cam: { z: [1.2, 1.3], x: [640, 640], y: [290, 290], ease: E.io }, bed: [['tension', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tN = at(Sh, 'confirmed', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => { [[340, 160, -.08, 'STATE MEDIA'], [930, 150, .07, 'NIS · SEOUL'], [330, 400, .06, 'RODMAN 2013'], [940, 400, -.05, 'AGE ~10?']].forEach(([x, y, r, t], k) => S.nkFile(c, x, y, 1.3, r, t, k % 2)); S.nkSil(c, 640, 280, 1.1, 1);
      [[520, 170], [780, 170], [500, 330], [790, 340], [640, 110]].forEach(([x, y], k) => { const fl = k === 4 ? Math.cos(seg(lt, 2, 3) * Math.PI * 2) : 1; c.save(); c.translate(x, y); c.scale(fl, 1); S.nkQ(c, 0, 0, .9, 1, (k - 2) * .15); c.restore(); });
      if (lt > Sh.tN) { const q = seg(lt, Sh.tN, Sh.tN + .4); c.save(); c.translate(640, 300); c.rotate(-.15); c.scale(lerp(2, 1, E.out(q)), lerp(2, 1, E.out(q))); c.globalAlpha = q; c.strokeStyle = '#c0281a'; c.lineWidth = 6; c.strokeRect(-170, -36, 340, 72); c.fillStyle = '#c0281a'; c.font = '48px Anton'; c.textAlign = 'center'; c.fillText('UNCONFIRMED', 0, 17); c.restore(); } },
    over: [(c, lt) => K.card(c, 'NOTHING OFFICIAL', lt, { at: .6, x: 1500, y: 120, px: 44, rot: 2 })],
    sfx: [[.1, 'tension', .2], [2, 'swish', .3], ['confirmed', 'stamp', .55]] },

  // 5.03 MED: the portrait hall; below the daughter's frame a new branch grows; its name tag swings, blank
  { set: 'nk_hall', cam: { z: [1.05, 1.1], x: [640, 640], y: [380, 400], ease: E.io }, bed: [['drone', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'children', Sh.dur * .6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), b = E.io(seg(lt, Sh.tC, Sh.tC + 1.2));
      S.nkPortrait(c, 640, 170, 140, 160, bust(C.KIMY, 640, 90, 140, lt, L, 0)); S.nkLink(c, [640, 260], [640, 330], 1, '#e8c040');
      S.nkPortrait(c, 640, 410, 140, 160, bust(C.GIRLB, 640, 330, 140 * .8, lt, L, 1)); c.fillStyle = '#f0e0b0'; c.font = '30px Oswald'; c.textAlign = 'center'; c.fillText('KIM', 760, 300); c.fillText('KIM', 760, 540);
      S.nkLink(c, [640, 500], [900, 560], b, '#e8c040'); if (b >= 1) { const sw = Math.sin(lt * 3) * .2; c.save(); c.translate(900, 560); c.rotate(sw); c.fillStyle = '#e8dcc0'; c.fillRect(-95, 6, 190, 50); c.fillStyle = '#c82a1a'; c.font = '22px Oswald'; c.fillText("FATHER'S NAME", 0, 40); c.restore(); } c.textAlign = 'left'; },
    over: [(c, lt) => K.card(c, "CHILDREN TAKE THE FATHER'S NAME", lt, { at: 1.5, x: 1300, y: 120, px: 40, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'END OF THE KIM NAME?', lt, { at: Sh.tC + 1.5, x: 1400, y: 260, px: 42, rot: -2 })],
    sfx: [[.1, 'drone', .2], ['children', 'swish', .3], ['name', 'chime', .3]] },

  // 5.04 WIDE: Mount Paektu in snow; a riderless white horse stands in the wind; fade out
  { set: 'nk_snow', cam: { z: [1.15, 1.02], x: [640, 640], y: [440, 400], ease: E.io }, bed: [['wind_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'only', Sh.dur * .6); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt); horse(c, 640, 640, 190, lt, L, { face: -1 }); S.nkSnow(c, lt, 120, .9); const f = seg(lt, Sh.dur - 1.5, Sh.dur); if (f > 0) { c.fillStyle = S.rgba('#000000', f); c.fillRect(0, 0, 1280, 720); } },
    over: [(c, lt) => K.card(c, 'NEXT LEADER?', lt, { at: 1, x: 520, y: 150, px: 44, rot: -2 }), (c, lt) => K.card(c, 'SOFTER FACE?', lt, { at: 3.5, x: 1400, y: 150, px: 44, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'ONLY ONE MAN DECIDES', lt, { at: Sh.tO, x: 960, y: 300, px: 50, rot: -1 })],
    sfx: [[.1, 'wind_loop', .3], [1, 'hooves', .15], ['only', 'drum', .35], ['saying', 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
