const van = (c, x, y, s, face = 1, lt = 0) => { c.save(); c.translate(x, y); c.scale(s * face, s); c.fillStyle = '#4a4a42'; c.beginPath(); c.roundRect(-70, -64, 140, 54, 8); c.fill(); c.fillStyle = '#3a3a34'; c.fillRect(30, -60, 40, 26); c.fillStyle = '#8ab0c8'; c.fillRect(40, -56, 26, 18);
  c.fillStyle = '#1a1a1a'; [-40, 44].forEach(wx => { c.beginPath(); c.arc(wx, -10, 13, 0, TAU); c.fill(); }); c.strokeStyle = '#2a2a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, -64); c.lineTo(-10, -84); c.stroke(); c.save(); c.translate(-10, -88); c.scale(Math.cos(lt * 2), 1); c.beginPath(); c.arc(0, 0, 12, 0, TAU); c.stroke(); c.restore(); c.restore(); };
const torch = (c, x, y, a, len = 420, al = .35) => { c.save(); c.translate(x, y); c.rotate(a); const g = c.createLinearGradient(0, 0, len, 0); g.addColorStop(0, S.rgba('#fff4c8', al)); g.addColorStop(1, S.rgba('#fff4c8', 0)); c.fillStyle = g; c.beginPath(); c.moveTo(0, -6); c.lineTo(len, -len * .28); c.lineTo(len, len * .28); c.lineTo(0, 6); c.fill(); c.restore(); };
const door = (c, op) => { c.fillStyle = '#1a1410'; c.fillRect(30, 240, 110, 320); if (op > 0) { const g = c.createLinearGradient(140, 0, 600, 0); g.addColorStop(0, S.rgba('#ffe8b0', .45 * op)); g.addColorStop(1, S.rgba('#ffe8b0', 0)); c.fillStyle = g; c.beginPath(); c.moveTo(140, 240); c.lineTo(600, 420); c.lineTo(600, 720); c.lineTo(140, 560); c.fill(); c.fillStyle = S.rgba('#ffe8b0', .7 * op); c.fillRect(36, 246, 98, 308); }
  c.save(); c.translate(140, 240); c.scale(1 - .85 * op, 1); c.fillStyle = '#5a3a22'; c.fillRect(-110, 0, 110, 320); c.strokeStyle = '#3a2412'; c.lineWidth = 3; c.strokeRect(-100, 14, 90, 130); c.strokeRect(-100, 170, 90, 136); c.restore(); };

window.SHOTS = [
  // 0.01 MED: before dawn; Eli at a small table by the window taps the key; a van with a turning aerial creeps past outside
  { set: 'ec_bedroom', cam: { z: [1.45, 1.6], x: [940, 960], y: [480, 490], ease: E.io }, bed: [['night_loop', .25], ['morse_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tI = at(Sh, 'israel', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt), pr = Math.max(0, Math.sin(lt * 18)) * (Math.sin(lt * 3.1) > -.3 ? 1 : 0);
      c.save(); c.beginPath(); c.rect(760, 110, 240, 260); c.clip(); van(c, lerp(700, 1080, seg(lt, 0, Sh.dur)), 362, .4, 1, lt); c.restore();
      S.ecChair(c, 880, 664, 1, 1); fig(c, C.ELIK, 880, 664, 34, Object.assign(VP.sit(C.ELIK, lt * .2, 0, { seat: .4 }), { face: 1, shN: 70, elN: 40, shF: 60, elF: 50, lean: 8 }), lt, 0, L, { look: [.6, .4] });
      S.ecTable(c, 1060, 664, 170, 70, '#4a3020'); S.ecTin(c, 1110, 586, .7, 1, 1); S.ecKey(c, 1010, 588, .55, pr); VP.glow(c, 1040, 560, 140, '#ffd890', .28); },
    over: [(c, lt) => K.dateTag(c, 'DAMASCUS · JANUARY 1965', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '· — · · — —  TO ISRAEL', lt, { at: Sh.tI, x: 1380, y: 150, px: 40, rot: 2 })],
    sfx: [[.1, 'night_loop', .25], [.2, 'morse_loop', .3], [1.5, 'engine_loop', .12]] },

  // 0.02 MED: the door bursts open; officers rush in with torches; Eli stands up from the key
  { set: 'ec_bedroom', cam: { z: [1.05, 1.12], x: [640, 660], y: [430, 430], ease: E.io }, bed: [['tension', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'bursts', .5); Sh.tO = at(Sh, 'officers', 2); },
    draw: (c, lt, u, Sh) => { const L = NIGHT(lt), op = E.out(seg(lt, Sh.tB, Sh.tB + .35)), up = E.io(seg(lt, Sh.tB + .3, Sh.tB + 1.1));
      door(c, op);
      S.ecTable(c, 1060, 664, 170, 70, '#4a3020'); S.ecTin(c, 1110, 586, .7, 1, 1); S.ecKey(c, 1010, 588, .55, 0);
      if (up < 1) S.ecChair(c, 880, 664, 1, 1);
      fig(c, C.ELIK, 880 + 20 * up, 664 + 6 * up, 34, up < .5 ? Object.assign(VP.sit(C.ELIK, 0, 0, { seat: .4 }), { face: 1, shN: 70, elN: 40 }) : pose(lt, 0, { face: -1, shN: 150 * up, elN: 30, shF: 140 * up, elF: 30 }), lt, 0, L, { look: [-.7, 0], worry: 1, open: up > .5 ? 1 : 0 });
      if (up >= 1) S.ecChair(c, 840, 664, 1, 1);
      [[C.SYROFF3, 420, 0], [C.SYRSOLD, 300, .35], [C.SYRSOLD2, 560, .7]].forEach(([ch, x, d], k) => { const w = seg(lt, Sh.tO - .6 + d, Sh.tO + .8 + d); if (w <= 0) return; const fx = lerp(40, x, E.out(w));
        fig(c, ch, fx, 668, 34, w < 1 ? walk(lt * 1.6, k + 1, { face: 1, shN: 80, elN: 10 }) : pose(lt, k + 1, { face: 1, shN: 80, elN: 10 }), lt, k + 1, L, { look: [.7, 0], angry: 1, open: k === 0 && w >= 1 ? 1 : 0 });
        torch(c, fx + 40, 668 - 34 * 4.2, -.08 + .05 * Math.sin(lt * 3 + k), 520, .3 * Math.min(1, w * 2)); }); },
    over: [],
    sfx: [[.1, 'tension', .3], ['bursts', 'door_slam', .6], ['bursts', 'hit', .3], ['officers', 'run_steps', .4], ['officers', 'whisper', .2]] },

  // 0.03 MED: a rooftop toast in his honour; then the same city at dawn: an empty square
  { set: 'ec_roof', cam: (lt, u, Sh) => lt < Sh.tF ? { z: [lerp(1.2, 1.28, seg(lt, 0, Sh.tF))], x: [640], y: [470] } : { z: [lerp(1.05, 1.12, seg(lt, Sh.tF, Sh.dur))], x: [640], y: [400] }, bed: [['crowd_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'four', Sh.dur * .55); Sh.tH = at(Sh, 'hanged', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tF) { const L = NIGHT(lt), up = E.io(seg(lt, .4, 1.4)), gl = cc => wr => S.ecGlass(cc, wr[0], wr[1] + 2, 1.2);
        S.ecTable(c, 300, 560, 180, 56, '#5a3a22', '#e8e0d0'); S.ecBottle(c, 270, 496); S.ecGlass(c, 320, 496);
        [[C.SYROFF, 400, 1, 33], [C.MINISTER, 880, -1, 34], [C.SYROFF2, 1060, -1, 34]].forEach(([ch, x, f, uu], k) => fig(c, ch, x, 664, uu, pose(lt, k + 1, { face: f, shN: 50 + 90 * up, elN: 40, holdN: gl(c) }), lt, k + 1, L, { look: [f * .5, -.1], smile: 1 }));
        fig(c, C.ELIK, 640, 660, 35, pose(lt, 0, { face: 1, shN: 50 + 100 * up, elN: 40, holdN: gl(c) }), lt, 0, L, { look: [0, 0], smile: 1 }); return; }
      VP.drawSet(c, 'ec2_marjeh'); VP.glow(c, 640, 240, 300, '#ffd8b0', .2);
      for (let k = 0; k < 4; k++) { const p = (lt * .3 + k * .25) % 1; c.fillStyle = '#3a3a40'; c.beginPath(); c.arc(lerp(200 + k * 200, 900 + k * 80, p), 160 - Math.sin(p * Math.PI) * 50, 4, 0, TAU); c.fill(); } },
    over: [(c, lt, u, Sh) => K.card(c, '3 YEARS AT THE TOP', lt, { at: .6, x: 1380, y: 150, px: 46, rot: 2, until: Sh.tF }), (c, lt, u, Sh) => K.card(c, 'MAY 1965', lt, { at: Sh.tF + .4, x: 1380, y: 150, px: 52, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .2], [.5, 'laugh', .25], ['four', 'whoosh', .3], ['four', 'wind_loop', .2], ['hanged', 'drum', .4]] },

  // 0.04 TITLE: the floor at dawn: the open tea tin, the key, scattered papers
  { set: 'ec_bedroom', cam: { z: [2.3, 2.45], x: [900, 900], y: [610, 616], ease: E.io }, bed: [['wind_loop', .2]],
    draw: (c, lt) => { const L = DAWN(lt); [[820, 640, -.3, 'K.A.T.'], [990, 660, .25, ''], [900, 690, .1, '']].forEach(([x, y, r, t]) => S.ecCard(c, x, y, .9, t, r, 1)); S.ecTin(c, 860, 640, .6, 1, 1); S.ecKey(c, 960, 628, .5, 0, true); VP.glow(c, 900, 600, 200, '#ffd8b0', .2); },
    over: [(c, lt) => { const q = seg(lt, .8, 1.8); if (q <= 0) return; c.save(); c.globalAlpha = q; c.font = '96px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 20; c.fillText('WHY SYRIA HANGED', 960, 190); c.fillText('ELI COHEN', 960, 305); c.restore(); }],
    sfx: [[.2, 'wind_loop', .2], [.4, 'morse', .2], [.8, 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
