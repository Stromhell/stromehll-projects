const horse = (c, x, y, h, lt, L, o = {}) => VP.figure(c, [x, y], { k: .5, sy: -.2, a: .3, blur: 3 }, cc => VP.horse(cc, x, y, h, Object.assign({ face: 1, ph: 0, walk: 0, t: lt, col: WHITEH, tack: { cloth: ['#a82a22', '#5a1410'], trim: '#c8a040' } }, o), L));
const baby = cc => wr => { cc.save(); cc.translate(wr[0], wr[1]); cc.fillStyle = '#f0ece4'; cc.beginPath(); cc.ellipse(0, 4, 26, 14, -.2, 0, TAU); cc.fill(); cc.fillStyle = '#e6b88e'; cc.beginPath(); cc.arc(-20, -2, 9, 0, TAU); cc.fill(); cc.restore(); };
const chair = (c, x, y, f) => S.ecChair(c, x, y, 1, f, '#8a2a2a');

window.SHOTS = [
  // 1.01 MED: a Pyongyang basketball court; a tall American in sunglasses sits courtside with the leader; both laugh and clap
  { set: 'nk_court', cam: { z: [1.08, 1.15], x: [640, 680], y: [450, 450], ease: E.io }, bed: [['crowd_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'rodman', 3.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), cl = Math.sin(lt * 10) > 0 && Math.sin(lt * .9) > .3, bx = 900 + Math.sin(lt * .8) * 180, by = 520 - Math.abs(Math.sin(lt * 5)) * 90;
      S.nkBall(c, bx, by, 13); c.fillStyle = S.rgba('#000000', .2); c.beginPath(); c.ellipse(bx, 530, 12, 3, 0, 0, TAU); c.fill();
      chair(c, 380, 664, 1); chair(c, 520, 664, 1);
      fig(c, C.RODMAN, 380, 664, 38, Object.assign(VP.sit(C.RODMAN, lt * .2, 0, { seat: .4 }), { face: 1, shN: cl ? 60 : 20, elN: cl ? 90 : 60, shF: cl ? 60 : 20, elF: cl ? 90 : 60 }), lt, 0, L, { look: [.6, 0], smile: 1, open: cl ? 1 : 0 });
      fig(c, C.KIM, 520, 664, 35, Object.assign(VP.sit(C.KIM, lt * .2, 1, { seat: .4 }), { face: 1, shN: cl ? 60 : 20, elN: cl ? 90 : 60 }), lt, 1, L, { look: [.6, 0], smile: 1, open: cl ? 1 : 0 }); },
    over: [(c, lt) => K.dateTag(c, 'PYONGYANG · 2013', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'BASKETBALL STAR · FRIEND', lt, { at: Sh.tR, x: 1400, y: 150, px: 42, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .2], [.3, 'thud', .15], [1.5, 'thud', .15], [2.7, 'thud', .15], ['rodman', 'cheer', .3], ['friends', 'laugh', .3]] },

  // 1.02 MED: the Wonsan coast estate; the tall American cradles a baby; the mother smiles; waves roll in
  { set: 'nk_wonsan', cam: { z: [1.08, 1.15], x: [700, 660], y: [440, 440], ease: E.io }, bed: [['ocean_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tJ = at(Sh, 'Ju', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      fig(c, C.RSJ, 860, 664, 33, pose(lt, 1, { face: -1, shN: 20, elN: 60 }), lt, 1, L, { look: [-.6, .2], smile: 1 });
      fig(c, C.KIM, 1010, 662, 36, pose(lt, 2, { face: -1, shN: 30, elN: 50 }), lt, 2, L, { look: [-.6, .2], smile: 1 });
      fig(c, C.RODMAN, 620, 668, 38, pose(lt, 0, { face: 1, shN: 50 + 4 * Math.sin(lt * 2), elN: 100, shF: 40, elF: 110, holdN: baby(c) }), lt, 0, L, { look: [.3, .6], smile: 1 }); },
    over: [(c, lt) => K.dateTag(c, 'WONSAN', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'NAMED HER: "JU AE"', lt, { at: Sh.tJ, x: 1400, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'ocean_loop', .3], [.3, 'birds_loop', .12], [3, 'laugh', .2]] },

  // 1.03 MED: a Seoul briefing room; an analyst points at three silhouettes dated 2010, 2013, 2017; one flickers
  { set: 'nk_brief', cam: { z: [1.05, 1.12], x: [640, 660], y: [420, 420], ease: E.io }, bed: [['office_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tD = at(Sh, 'doubt', Sh.dur - 2.5); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt);
      [[460, '2010'], [640, '2013'], [820, '2017']].forEach(([x, t], k) => { const q = seg(lt, 1 + k * .6, 1.5 + k * .6); if (q <= 0) return; c.save(); c.globalAlpha = q * (k === 0 && lt > Sh.tD ? .5 + .4 * Math.sin(lt * 12) : 1); S.nkSil(c, x, 230, .8, k > 0); c.fillStyle = '#e8e4dc'; c.font = '30px Oswald'; c.textAlign = 'center'; c.fillText(t, x, 340); c.restore(); if (k === 0 && lt > Sh.tD) S.nkQ(c, x, 220, 1, seg(lt, Sh.tD, Sh.tD + .5)); });
      fig(c, C.ANALYST, 1090, 668, 35, pose(lt, 0, { face: -1, shN: 120, elN: 10 }), lt, 0, L, { look: [-.6, -.3], open: Math.sin(lt * 8) > 0 ? 1 : 0 }); },
    over: [(c, lt) => K.card(c, "SOUTH KOREA'S NIS", lt, { at: .4, x: 480, y: 150, px: 42, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'A SON?', lt, { at: Sh.tD + .4, x: 1500, y: 150, px: 50, rot: 2 })],
    sfx: [[.1, 'office_loop', .15], [1, 'pop', .25], [1.6, 'pop', .25], [2.2, 'pop', .25], ['doubt', 'whoosh_soft', .3]] },

  // 1.04 MED: the mother in an elegant coat in a red hall; then a private study where a tutor teaches the girl
  { set: 'nk_hall', cam: (lt, u, Sh) => lt < Sh.tS ? { z: [lerp(1.15, 1.22, seg(lt, 0, Sh.tS))], x: [640], y: [450] } : { z: [1.08], x: [640], y: [430] }, bed: [['waltz', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'schooled', Sh.dur * .45); Sh.tW = at(Sh, 'Switzerland', Sh.dur - 1.6); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tS) { const L = SUN(lt); [300, 980].forEach(x => S.nkPortrait(c, x, 250, 200, 140, cc => { VP.drawSet; cc.fillStyle = '#7a9ab8'; cc.fillRect(x - 100, 180, 200, 140); cc.fillStyle = '#e8ecf0'; cc.beginPath(); cc.moveTo(x - 100, 320); cc.lineTo(x - 20, 200); cc.lineTo(x + 30, 240); cc.lineTo(x + 100, 320); cc.fill(); })); fig(c, C.RSJ, lerp(420, 640, E.out(seg(lt, 0, 3))), 664, 35, seg(lt, 0, 3) < 1 ? walk(lt, 0, { face: 1 }) : pose(lt, 0, { face: 1, shN: 20, elN: 50 }), lt, 0, L, { look: [.3, 0], smile: 1 }); return; }
      VP.drawSet(c, 'nk_study'); const L = SUN(lt), wr = Math.sin(lt * 4);
      c.strokeStyle = S.rgba('#f0f0e8', .85); c.lineWidth = 3; c.font = '40px Caveat'; c.fillStyle = S.rgba('#f0f0e8', .9); const n = Math.floor(seg(lt, Sh.tS, Sh.tS + 3) * 9); c.fillText('가 나 다 라 1 2 3'.slice(0, n), 220, 200);
      fig(c, C.TUTOR, 660, 664, 34, pose(lt, 1, { face: -1, shN: 140 + 10 * wr, elN: 20 }), lt, 1, L, { look: [-.5, -.4] });
      S.ecDesk(c, 860, 690, 90, '#6a4a2a'); S.ecChair(c, 920, 664, 1, -1); fig(c, C.GIRLB, 920, 664, 24, Object.assign(VP.sit(C.GIRLB, lt * .2, 0, { seat: .4 }), { face: -1, shN: 30, elN: 60 }), lt, 0, L, { look: [-.6, -.3] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'RI SOL JU · "RESPECTED FIRST LADY"', lt, { at: .6, x: 1300, y: 150, px: 40, rot: 2, until: Sh.tS }), (c, lt, u, Sh) => K.card(c, 'TAUGHT AT HOME', lt, { at: Sh.tS + .4, x: 1450, y: 150, px: 46, rot: 2, until: Sh.tW }), (c, lt, u, Sh) => K.card(c, 'HIS SCHOOL: BERN', lt, { at: Sh.tW, x: 1450, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'waltz', .12], [.3, 'footsteps', .25], ['schooled', 'brush', .3], ['schooled', 'clock_loop', .12]] },

  // 1.05 WIDE: a riding ring by the sea; a groom leads the white horse round; then a ski slope with a turning lift
  { set: 'nk_ring', cam: (lt, u, Sh) => lt < Sh.tK ? { z: [1.05], x: [640], y: [430] } : { z: [lerp(1.02, 1.08, seg(lt, Sh.tK, Sh.dur))], x: [640], y: [380] }, bed: [['ocean_loop', .2], ['hooves_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tK = at(Sh, 'skiing', Sh.dur * .3); Sh.tR = at(Sh, 'ring', Sh.dur * .5); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tK || lt > Sh.tR && lt < Sh.tR + 2.5) { const L = SUN(lt), x = lerp(200, 1000, seg(lt, 0, Sh.dur * .6));
        horse(c, x, 620, 170, lt, L, { walk: 1, ph: lt * 1.4 }); fig(c, C.AIDE, x + 120, 640, 33, walk(lt * 1.2, 0, { face: 1, shN: -50, elN: 10 }), lt, 0, L, { look: [-.5, 0] }); return; }
      VP.drawSet(c, 'nk_ski'); for (let k = 0; k < 7; k++) { const p = (lt * .05 + k / 7) % 1, x = lerp(300, 1000, p), y = lerp(560, 170, p); c.strokeStyle = '#3a3a3a'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 16); c.stroke(); c.fillStyle = '#c8402a'; c.fillRect(x - 10, y + 16, 20, 8); } },
    over: [(c, lt, u, Sh) => K.card(c, 'RIDING · SKIING', lt, { at: .6, x: 1450, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'ocean_loop', .2], [.2, 'hooves_loop', .15], ['skiing', 'wind_loop', .2], ['ski', 'clank', .2]] },
];
VP.build(); K.boot();
</script></body></html>
