const horse = (c, x, y, h, lt, L, o = {}) => VP.figure(c, [x, y], { k: .5, sy: -.2, a: .3, blur: 3 }, cc => VP.horse(cc, x, y, h, Object.assign({ face: 1, ph: 0, walk: 0, t: lt, col: WHITEH, tack: { cloth: ['#a82a22', '#5a1410'], trim: '#c8a040' } }, o), L));

window.SHOTS = [
  // 0.01 WIDE: dawn at the launch pad; the giant missile stands on its launcher, then lifts off in flame and smoke
  { set: 'nk_pad', cam: (lt, u, Sh) => { const sh = lt > Sh.tL ? Math.sin(lt * 50) * 4 * (1 - seg(lt, Sh.tL, Sh.dur)) : 0; return { z: [lerp(1.05, 1.0, seg(lt, 0, Sh.dur))], x: [640 + sh], y: [lerp(400, 330, E.io(seg(lt, Sh.tL, Sh.dur))) + sh] }; }, bed: [['wind_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tL = at(Sh, 'tests', 2.4); Sh.tU = at(Sh, 'united', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const q = seg(lt, Sh.tL, Sh.dur + 1.5), lift = E.inn(q) * .9;
      S.nkSmoke(c, 640, 600, Math.min(1, q * 3), lt); S.nkMissile(c, 640, 560, .9, lift, lt); S.nkTEL(c, 640, 640, .9, 1); VP.glow(c, 640, 560 - lift * 810, 220, '#ffb050', q > 0 ? .5 : 0); },
    over: [(c, lt) => K.dateTag(c, 'HWASONG-17 · 18 NOV 2022', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'RANGE: THE USA', lt, { at: Sh.tU, x: 1440, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'wind_loop', .2], [1, 'alarm', .15], ['tests', 'riser', .35], ['tests', 'cannon', .5], ['tests', 'engine_loop', .3]] },

  // 0.02 MED: the leader and a small girl in a white coat walk hand in hand past the launcher; camera flashes
  { set: 'nk_pad', cam: { z: [1.25, 1.35], x: [620, 680], y: [470, 470], ease: E.io }, bed: [['crowd_loop', .1], ['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tG = at(Sh, 'girl', Sh.dur * .6); Sh.tH = at(Sh, 'hand', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = DAWN(lt), w = seg(lt, 0, Sh.dur), x = lerp(260, 860, w);
      S.nkTEL(c, 900, 560, .7, -1); S.nkMissile(c, 1000, 520, .55, 0, 0);
      fig(c, C.GEN1, x - 220, 664, 34, walk(lt * .7, 2, { face: 1 }), lt, 2, L, { look: [.6, 0] });
      fig(c, C.KIM, x, 664, 36, walk(lt * .7, 0, { face: 1, shN: 8, elN: 10 }), lt, 0, L, { look: [.4, .3], smile: 1 });
      fig(c, C.GIRL, x + 54, 668, 24, walk(lt * .7 + .2, 1, { face: 1, shN: -40, elN: 10 }), lt, 1, L, { look: [-.4, -.5], smile: 1 });
      [[300, 250], [1050, 320], [180, 400], [1150, 210]].forEach(([fx, fy], k) => S.nkFlash(c, fx, fy, ((lt + k * .37) % 1.3) / .5)); },
    over: [(c, lt, u, Sh) => K.card(c, 'WHO IS SHE?', lt, { at: Sh.tG, x: 1440, y: 150, px: 52, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .1], [.2, 'wind_loop', .15], [.4, 'footsteps', .25], [1, 'camera_shutter', .3], [3, 'camera_shutter', .3], ['girl', 'camera_shutter', .4], ['hand', 'chime', .3]] },

  // 0.03 MED: an intelligence wall; a blank silhouette card at the centre; question marks pin themselves around it
  { set: 'nk_intel', cam: { z: [1.1, 1.25], x: [640, 640], y: [300, 290], ease: E.io }, bed: [['office_loop', .15], ['tension', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tN = at(Sh, 'name', Sh.dur - 3); },
    draw: (c, lt, u, Sh) => {
      [[340, 160, -.08, 'STATE MEDIA'], [930, 150, .07, 'NIS · SEOUL'], [330, 400, .06, 'RODMAN 2013'], [940, 400, -.05, 'AGE ~10?']].forEach(([x, y, r, t], k) => { if (lt > .3 + k * .5) S.nkFile(c, x, y, 1.3, r, t, k % 2); });
      c.strokeStyle = S.rgba('#c82a1a', .7); c.lineWidth = 2; [[340, 160], [930, 150], [330, 400], [940, 400]].forEach(([x, y], k) => { if (lt > .6 + k * .5) { c.beginPath(); c.moveTo(640, 280); c.lineTo(x, y - 50); c.stroke(); } });
      S.nkSil(c, 640, 280, 1.1, 1);
      [[520, 170], [780, 170], [500, 330], [790, 340], [640, 110]].forEach(([x, y], k) => S.nkQ(c, x, y, .9, seg(lt, 2 + k * .9, 2.5 + k * .9), (k - 2) * .15)); },
    over: [(c, lt) => K.card(c, '"BELOVED CHILD"', lt, { at: .6, x: 960, y: 70, px: 40, rot: -1 }), (c, lt, u, Sh) => K.card(c, 'KIM JU AE? · BORN ~2013?', lt, { at: Sh.tN, x: 960, y: 860, px: 44, rot: -1 })],
    sfx: [[.1, 'office_loop', .15], [.2, 'tension', .2], [.4, 'paper', .3], [2, 'pop', .25], [2.9, 'pop', .25], [3.8, 'pop', .25], [4.7, 'pop', .25], [5.6, 'pop', .25]] },

  // 0.04 TITLE: a white horse stands in falling snow under the mountain
  { set: 'nk_snow', cam: { z: [1.1, 1.18], x: [640, 640], y: [420, 410], ease: E.io }, bed: [['wind_loop', .3]],
    draw: (c, lt) => { const L = COLD(lt); horse(c, 640, 640, 180, lt, L, { face: -1 }); S.nkSnow(c, lt); },
    over: [(c, lt) => { const q = seg(lt, .6, 1.6); if (q <= 0) return; c.save(); c.globalAlpha = q; c.font = '96px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 20; c.fillText('WHO WILL RULE', 960, 190); c.fillText('NORTH KOREA NEXT?', 960, 305); c.restore(); }],
    sfx: [[.1, 'wind_loop', .3], [.6, 'swell', .4], [1.5, 'hooves', .2]] },
];
VP.build(); K.boot();
</script></body></html>
