const van = (c, x, y, s, face = 1, lt = 0) => { c.save(); c.translate(x, y); c.scale(s * face, s); c.fillStyle = '#4a4a42'; c.beginPath(); c.roundRect(-70, -64, 140, 54, 8); c.fill(); c.fillStyle = '#3a3a34'; c.fillRect(30, -60, 40, 26); c.fillStyle = '#8ab0c8'; c.fillRect(40, -56, 26, 18);
  c.fillStyle = '#1a1a1a'; [-40, 44].forEach(wx => { c.beginPath(); c.arc(wx, -10, 13, 0, TAU); c.fill(); }); c.strokeStyle = '#2a2a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, -64); c.lineTo(-10, -84); c.stroke(); c.save(); c.translate(-10, -88); c.scale(Math.cos(lt * 2), 1); c.beginPath(); c.arc(0, 0, 12, 0, TAU); c.stroke(); c.restore(); c.restore(); };
const torch = (c, x, y, a, len = 420, al = .35) => { c.save(); c.translate(x, y); c.rotate(a); const g = c.createLinearGradient(0, 0, len, 0); g.addColorStop(0, S.rgba('#fff4c8', al)); g.addColorStop(1, S.rgba('#fff4c8', 0)); c.fillStyle = g; c.beginPath(); c.moveTo(0, -6); c.lineTo(len, -len * .28); c.lineTo(len, len * .28); c.lineTo(0, 6); c.fill(); c.restore(); };
const waves = (c, x, y, lt, col = '#f0d060', a = .8) => { c.strokeStyle = S.rgba(col, a); c.lineWidth = 3; for (let k = 0; k < 3; k++) { const r = ((lt * 40 + k * 20) % 60) + 10; c.globalAlpha = 1 - r / 70; c.beginPath(); c.arc(x, y, r, -2.2, -.9); c.stroke(); } c.globalAlpha = 1; };

window.SHOTS = [
  // 3.01 MED: the Indian embassy radio room; a clerk at the set winces as static drowns the signal
  { set: 'ec2_radio', cam: { z: [1.1, 1.18], x: [640, 660], y: [440, 450], ease: E.io }, bed: [['hum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tJ = at(Sh, 'jammed', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = CANDLE(lt), st = lt > 1.5;
      S.ecChair(c, 560, 664, 1, 1); fig(c, C.EDITOR, 560, 664, 34, Object.assign(VP.sit(C.EDITOR, lt * .2, 0, { seat: .4 }), { face: 1, shN: st ? 150 : 70, elN: st ? 120 : 40, shF: 70, elF: 40 }), lt, 0, L, { look: [.6, .2], angry: st ? 1 : 0 });
      S.ecDesk(c, 780, 668, 240); S.ecSet(c, 790, 568, 1.1, 1);
      if (st) { c.save(); c.globalAlpha = .7; for (let k = 0; k < 14; k++) { const r = S.rng(Math.floor(lt * 20) * 31 + k); c.fillStyle = r() > .5 ? '#ffffff' : '#c8c8c8'; c.fillRect(740 + r() * 100, 520 + r() * 40, 4 + r() * 10, 2); } c.restore(); } },
    over: [(c, lt) => K.card(c, 'INDIAN EMBASSY', lt, { at: .4, x: 560, y: 150, px: 44, rot: -2 }), (c, lt, u, Sh) => K.card(c, 'SIGNAL JAMMED', lt, { at: Sh.tJ, x: 1420, y: 150, px: 48, rot: 2 })],
    sfx: [[.1, 'hum_loop', .2], [1.5, 'tension', .2], ['jammed', 'whoosh_soft', .3]] },

  // 3.02 CU then WIDE: inside a van, a needle sweeps on a glowing dial; outside, the van creeps down the night street
  { set: 'ec2_van', cam: (lt, u, Sh) => lt < Sh.tH ? { z: [lerp(1.1, 1.2, seg(lt, 0, Sh.tH))], x: [640], y: [380] } : { z: [1.05], x: [640], y: [420] }, bed: [['hum_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'hunting', Sh.dur * .55); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tH) { const L = COLD(lt), a = Math.sin(lt * 1.3) * .9; c.fillStyle = '#0a2a1a'; c.beginPath(); c.arc(640, 300, 120, 0, TAU); c.fill(); c.strokeStyle = '#4ad070'; c.lineWidth = 2; for (let r = 40; r <= 120; r += 40) { c.beginPath(); c.arc(640, 300, r, 0, TAU); c.stroke(); } c.lineWidth = 4; c.beginPath(); c.moveTo(640, 300); c.lineTo(640 + Math.sin(a) * 118, 300 - Math.cos(a) * 118); c.stroke(); VP.glow(c, 640, 300, 160, '#4ad070', .25);
        [[C.SYRSOLD, 380, 1], [C.SYRSOLD2, 900, -1]].forEach(([ch, x, f], k) => { S.ecChair(c, x, 664, 1, f); fig(c, ch, x, 664, 34, Object.assign(VP.sit(ch, lt * .2, k, { seat: .4 }), { face: f, shN: 70, elN: 50 }), lt, k, L, { look: [f * .6, -.2] }); }); return; }
      VP.drawSet(c, 'ec2_nightst'); van(c, lerp(-150, 600, E.out(seg(lt, Sh.tH, Sh.dur))), 650, 1.6, 1, lt); },
    over: [(c, lt, u, Sh) => K.card(c, 'SOVIET DIRECTION-FINDER', lt, { at: .8, x: 1400, y: 150, px: 42, rot: 2, until: Sh.tH }), (c, lt, u, Sh) => K.card(c, 'HUNTING A TRANSMITTER', lt, { at: Sh.tH + .3, x: 1400, y: 150, px: 44, rot: 2 })],
    sfx: [[.1, 'hum_loop', .25], [.5, 'tick', .2], ['hunting', 'engine_loop', .2]] },

  // 3.03 WIDE: the night street; block by block the windows and lamps go dark; Eli's window keeps sending until the last
  { set: 'ec2_nightst', cam: { z: [1.02, 1.06], x: [640, 640], y: [380, 380], ease: E.io }, bed: [['night_loop', .25], ['morse_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.t1 = Sh.dur * .3; Sh.t2 = Sh.dur * .55; Sh.t3 = Sh.dur * .8; },
    draw: (c, lt, u, Sh) => { van(c, 600, 650, 1.6, 1, lt);
      const dk = (x, y, w, h, t) => { const q = seg(lt, t, t + .25); if (q > 0) { c.fillStyle = S.rgba('#05081a', .75 * q); c.fillRect(x, y, w, h); } };
      dk(720, 120, 560, 380, Sh.t1); dk(560, 0, 160, 480, Sh.t2); dk(0, 480, 1280, 240, Sh.t2);
      if (lt < Sh.t3) waves(c, 302, 300, lt); dk(80, 140, 420, 340, Sh.t3); },
    over: [(c, lt, u, Sh) => K.card(c, 'BLOCK BY BLOCK', lt, { at: 1, x: 1400, y: 150, px: 46, rot: 2, until: Sh.t3 }), (c, lt, u, Sh) => K.card(c, 'SIGNAL STOPS', lt, { at: Sh.t3 + .2, x: 1400, y: 150, px: 50, rot: 2 })],
    sfx: [[.1, 'night_loop', .25], [.2, 'morse_loop', .2], [3, 'clank', .3], [6, 'clank', .3], [8, 'clank', .35]] },

  // 3.04 MED: the bedroom at first light; Eli at the key; officers burst through the door
  { set: 'ec_bedroom', cam: { z: [1.1, 1.2], x: [700, 760], y: [440, 450], ease: E.io }, bed: [['tension', .3], ['morse_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'broke', 2.6); },
    draw: (c, lt, u, Sh) => { const L = DAWN(lt), op = E.out(seg(lt, Sh.tB, Sh.tB + .35)), up = E.io(seg(lt, Sh.tB + .3, Sh.tB + 1.1)), pr = lt < Sh.tB ? Math.max(0, Math.sin(lt * 18)) : 0;
      c.fillStyle = '#1a1410'; c.fillRect(30, 240, 110, 320); if (op > 0) { c.fillStyle = S.rgba('#ffe8b0', .7 * op); c.fillRect(36, 246, 98, 308); } c.save(); c.translate(140, 240); c.scale(1 - .85 * op, 1); c.fillStyle = '#5a3a22'; c.fillRect(-110, 0, 110, 320); c.restore();
      S.ecTable(c, 1060, 664, 170, 70, '#4a3020'); S.ecTin(c, 1110, 586, .7, 1, 1); S.ecKey(c, 1010, 588, .55, pr);
      if (up < 1) S.ecChair(c, 880, 664, 1, 1);
      fig(c, C.ELIK, 880, 664, 34, up < .5 ? Object.assign(VP.sit(C.ELIK, 0, 0, { seat: .4 }), { face: 1, shN: 70, elN: 40, lean: 8 }) : pose(lt, 0, { face: -1, shN: 150 * up, elN: 30, shF: 140 * up, elF: 30 }), lt, 0, L, { look: up > .3 ? [-.7, 0] : [.6, .4], worry: up > .3 ? 1 : 0 });
      [[C.SYROFF3, 560, 0], [C.SYRSOLD, 420, .3], [C.SYRSOLD2, 300, .6]].forEach(([ch, x, d], k) => { const w = seg(lt, Sh.tB + .2 + d, Sh.tB + 1.4 + d); if (w <= 0) return; const fx = lerp(40, x, E.out(w)); fig(c, ch, fx, 668, 34, w < 1 ? walk(lt * 1.6, k + 1, { face: 1, shN: 80, elN: 10 }) : pose(lt, k + 1, { face: 1, shN: 80, elN: 10 }), lt, k + 1, L, { look: [.7, 0], angry: 1 }); torch(c, fx + 40, 668 - 34 * 4.2, -.08, 420, .2); }); },
    over: [(c, lt) => K.dateTag(c, '24 JANUARY 1965', lt, { at: .4 })],
    sfx: [[.1, 'tension', .3], [.2, 'morse_loop', .2], ['broke', 'door_slam', .6], ['broke', 'run_steps', .4]] },

  // 3.05 MED: the presidential office; Hafiz slams the report down beside a party photo; officials look away
  { set: 'sz_palace', cam: { z: [1.08, 1.16], x: [640, 680], y: [430, 440], ease: E.io }, bed: [['tension', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tS = at(Sh, 'spy', 2.4); Sh.tU = at(Sh, 'humiliation', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), sl = E.io(seg(lt, Sh.tS - .4, Sh.tS + .2));
      S.ecDesk(c, 640, 672, 300); S.ecPhoto(c, 580, 556, 1.2, -.05); S.ecCard(c, lerp(720, 690, sl), lerp(470, 556, sl), .8, 'AGENT', .1, 1);
      fig(c, C.HAFIZ, 900, 668, 36, pose(lt, 0, { face: -1, shN: lerp(140, 40, sl), elN: lerp(30, 60, sl), lean: 10 * sl }), lt, 0, L, { look: [-.6, .4], angry: 1, open: lt > Sh.tU ? (Math.sin(lt * 9) > 0 ? 1 : 0) : 0 });
      fig(c, C.MINISTER, 360, 668, 34, pose(lt, 1, { face: 1, shN: 20, elN: 40 }), lt, 1, L, { look: [-.4, .5], worry: 1 });
      fig(c, C.SYROFF, 1060, 664, 34, pose(lt, 2, { face: -1, shN: 20, elN: 40 }), lt, 2, L, { look: [.5, .5], worry: 1 }); },
    over: [(c, lt, u, Sh) => K.card(c, 'AN ISRAELI SPY', lt, { at: Sh.tS, x: 1400, y: 150, px: 48, rot: 2, until: Sh.tU }), (c, lt, u, Sh) => K.card(c, 'HUMILIATION', lt, { at: Sh.tU, x: 1400, y: 150, px: 54, rot: 2 })],
    sfx: [[.1, 'tension', .25], ['spy', 'thud', .5], ['humiliation', 'drum', .4]] },
];
VP.build(); K.boot();
</script></body></html>
