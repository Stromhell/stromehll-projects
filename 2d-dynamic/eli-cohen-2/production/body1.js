const euc = (c, x, y, s, g = 1) => { if (g <= 0) return; c.save(); c.translate(x, y); c.scale(s * g, s * g); c.strokeStyle = '#d8c8b0'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-4, -60, 4, -120); c.moveTo(2, -70); c.lineTo(-24, -100); c.moveTo(3, -90); c.lineTo(26, -118); c.stroke();
  [[-26, -118, 30], [24, -128, 32], [0, -150, 34], [-10, -100, 22], [18, -98, 20]].forEach(([bx, by, r], k) => { c.fillStyle = ['#5a7a6a', '#6a8a7a', '#4a6a5a'][k % 3]; c.beginPath(); c.ellipse(bx, by, r, r * .8, 0, 0, TAU); c.fill(); }); c.restore(); };
const dozer = (c, x, y, s, face = 1, lt = 0) => { c.save(); c.translate(x, y); c.scale(s * face, s); c.fillStyle = '#2a2a2a'; c.beginPath(); c.roundRect(-60, -24, 110, 24, 12); c.fill(); c.fillStyle = '#4a4a4a'; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(-46 + k * 22, -12, 7, 0, TAU); c.fill(); }
  c.fillStyle = '#d8a030'; c.fillRect(-52, -60, 90, 36); c.fillStyle = '#c89020'; c.fillRect(-40, -96, 46, 36); c.fillStyle = '#8ab0c8'; c.fillRect(-32, -90, 30, 22); c.fillStyle = '#3a3a3a'; c.fillRect(46, -50, 10, 46); c.fillStyle = '#7a7a72'; c.fillRect(56, -62, 14, 62); c.fillStyle = '#2a2a2a'; c.fillRect(20, -76, 6, 18);
  c.fillStyle = S.rgba('#5a5a5a', .3); for (let k = 0; k < 3; k++) { const p = (lt * .8 + k / 3) % 1; c.beginPath(); c.arc(23 + p * 10, -80 - p * 50, 6 + p * 10, 0, TAU); c.fill(); } c.restore(); };
const puff = (c, x, y, q) => { if (q <= 0 || q >= 1) return; c.save(); c.globalAlpha = 1 - q; [['#8a7a6a', 0, 0], ['#a89a8a', -20, -18], ['#6a5a4a', 18, -10]].forEach(([col, dx, dy]) => { c.fillStyle = col; c.beginPath(); c.arc(x + dx * (1 + q), y + dy * (1 + q) - q * 40, 16 + q * 40, 0, TAU); c.fill(); }); c.restore(); };

window.SHOTS = [
  // 1.01 WIDE: a jeep climbs the Golan and stops; Eli and an officer step round it and look out over the farms below
  { set: 'ec_golan', cam: { z: [1.05, 1.12], x: [640, 620], y: [420, 430], ease: E.io }, bed: [['wind_loop', .2], ['engine_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tP = at(Sh, 'officers', 3); Sh.tF = at(Sh, 'farms', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), j = E.out(seg(lt, 0, Sh.tP + .8)), w = seg(lt, Sh.tP + .8, Sh.tP + 3.2);
      if (w > 0) { fig(c, C.SYROFF, lerp(1000, 620, E.out(w)), 662, 34, w < 1 ? walk(lt, 1, { face: -1 }) : pose(lt, 1, { face: -1, shN: 120, elN: 10 }), lt, 1, L, { look: [-.7, -.1], smile: 1 });
        fig(c, C.ELIK, lerp(960, 450, E.out(seg(lt, Sh.tP + 1.2, Sh.tP + 3.8))), 656, 35, seg(lt, Sh.tP + 1.2, Sh.tP + 3.8) < 1 ? walk(lt, 0, { face: -1 }) : pose(lt, 0, { face: -1, shN: 20, elN: 40 }), lt, 0, L, { look: [-.7, -.2] }); }
      S.ecJeep(c, lerp(-300, 940, j), 664, 2.5, 1, '#6a7448', j < 1 ? lt * 6 : 0); },
    over: [(c, lt) => K.dateTag(c, 'GOLAN HEIGHTS · 1963', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, "ABOVE ISRAEL'S FARMS", lt, { at: Sh.tF, x: 600, y: 150, px: 44, rot: -2 })],
    sfx: [[.1, 'wind_loop', .2], [.1, 'engine_loop', .2], ['officers', 'creak', .3], ['officers', 'footsteps', .3]] },

  // 1.02 MED: a concrete bunker on the ridge; an officer shows it off; Eli studies every detail
  { set: 'ec2_bunker', cam: { z: [1.08, 1.16], x: [620, 680], y: [440, 440], ease: E.io }, bed: [['wind_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'remembered', Sh.dur - 2.4); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      fig(c, C.SYROFF2, 640, 664, 34, pose(lt, 1, { face: 1, shN: 110 + 10 * Math.sin(lt * 2), elN: 10 }), lt, 1, L, { look: [.7, -.2], smile: 1, open: Math.sin(lt * 8) > 0 && lt < Sh.tR ? 1 : 0 });
      fig(c, C.ELIK, 420, 668, 35, pose(lt, 0, { face: 1, shN: 20, elN: 60 }), lt, 0, L, { look: [.8, -.3], blink: lt > Sh.tR ? .2 : 0 });
      if (lt > Sh.tR) { const q = seg(lt, Sh.tR, Sh.tR + 1); VP.glow(c, 860, 430, 120, '#ffe0a0', .25 * q); } },
    over: [(c, lt, u, Sh) => K.card(c, 'BUNKERS · GUNS · TRENCHES', lt, { at: .6, x: 1400, y: 150, px: 42, rot: 2, until: Sh.tR }), (c, lt, u, Sh) => K.card(c, 'HE REMEMBERED EVERYTHING', lt, { at: Sh.tR, x: 1400, y: 150, px: 44, rot: 2 })],
    sfx: [[.1, 'wind_loop', .2], [1, 'footsteps', .2], ['remembered', 'morse', .3]] },

  // 1.03 MED: midday heat; soldiers fan themselves; Eli points; eucalyptus saplings rise beside the bunker
  { set: 'ec2_bunker', cam: { z: [1.05, 1.1], x: [660, 700], y: [420, 420], ease: E.io }, bed: [['wind_loop', .15], ['birds_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tE = at(Sh, 'eucalyptus', Sh.dur * .6); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), gr = E.out(seg(lt, Sh.tE, Sh.tE + 2.2));
      c.fillStyle = S.rgba('#fff0c0', .12); c.fillRect(0, 0, 1280, 720);
      [[700, 470, 1], [1010, 474, .9], [580, 480, .8]].forEach(([x, y, s], k) => euc(c, x, y, s, E.out(seg(lt, Sh.tE + k * .4, Sh.tE + 1.6 + k * .4))));
      fig(c, C.SYRSOLD, 980, 662, 33, pose(lt, 1, { face: -1, shN: 150 + 20 * Math.sin(lt * 7), elN: 100 }), lt, 1, L, { look: [-.6, -.2], worry: 1 });
      fig(c, C.SYROFF2, 760, 666, 34, pose(lt, 2, { face: -1, shN: 30, elN: 50 }), lt, 2, L, { look: [-.7, 0], smile: gr > .5 ? 1 : 0 });
      fig(c, C.ELIK, 460, 668, 35, pose(lt, 0, { face: 1, shN: lt > Sh.tE - .5 ? 100 : 20, elN: lt > Sh.tE - .5 ? 10 : 50 }), lt, 0, L, { look: [.7, -.1], smile: 1, open: Math.sin(lt * 9) > 0 && lt > Sh.tE - .5 && lt < Sh.tE + 2 ? 1 : 0 });
      VP.glow(c, 200, 80, 260, '#fff0c0', .3); },
    over: [(c, lt, u, Sh) => K.card(c, 'TREES FOR SHADE', lt, { at: Sh.tE + .5, x: 1400, y: 150, px: 48, rot: 2 })],
    sfx: [[.1, 'wind_loop', .15], [.2, 'birds_loop', .1], ['eucalyptus', 'swish', .3], ['eucalyptus', 'dig_loop', .15]] },

  // 1.04 AERIAL: brown hills seen from above; green tree clumps mark each position; red rings circle them
  { set: 'ec2_ground', cam: { z: [1.02, 1.1], x: [640, 640], y: [360, 360], ease: E.io }, bed: [['drone', .2], ['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tF = at(Sh, 'find', 3); Sh.tD = at(Sh, 'debate', Sh.dur - 2.6); },
    draw: (c, lt, u, Sh) => { c.fillStyle = '#b8a07a'; c.fillRect(0, 0, 1280, 720); S.dabs(c, { x: 0, y: 0, w: 1280, h: 720, n: 500, cols: ['#8a7454', '#c8b08a', '#7a7a5a', '#a89068'], r0: 6, r1: 26, a0: .3, a1: .6, seed: 11001 });
      c.strokeStyle = S.rgba('#5a4a32', .5); c.lineWidth = 3; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(0, 100 + k * 110); c.bezierCurveTo(300, 60 + k * 120, 800, 160 + k * 100, 1280, 90 + k * 110); c.stroke(); }
      const P = [[260, 200], [520, 320], [780, 230], [1020, 380], [400, 520], [880, 560]];
      P.forEach(([x, y], k) => { for (let j = 0; j < 4; j++) { c.fillStyle = ['#3a5a3a', '#4a6a4a', '#2a4a2a'][j % 3]; c.beginPath(); c.arc(x + Math.cos(j * 1.7) * 16, y + Math.sin(j * 1.7) * 12, 16, 0, TAU); c.fill(); } c.fillStyle = '#6a6a5a'; c.fillRect(x - 10, y + 14, 20, 8);
        const q = E.out(seg(lt, Sh.tF + k * .25, Sh.tF + .6 + k * .25)); if (q > 0) { c.strokeStyle = S.rgba('#d02a1a', .9); c.lineWidth = 5; c.beginPath(); c.arc(x, y, 44, -Math.PI / 2, -Math.PI / 2 + TAU * q); c.stroke(); } });
      const sx = lerp(-200, 1500, seg(lt, 0, Sh.dur)); c.fillStyle = S.rgba('#000000', .18); c.beginPath(); c.ellipse(sx, 420, 60, 14, 0, 0, TAU); c.ellipse(sx + 10, 420, 14, 50, 0, 0, TAU); c.fill(); },
    over: [(c, lt) => K.dateTag(c, '1967', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'LEGEND?', lt, { at: Sh.tD, x: 1500, y: 160, px: 60, rot: 3 })],
    sfx: [[.1, 'drone', .2], [.2, 'wind_loop', .15], ['find', 'chime', .3], ['debate', 'drum', .35]] },

  // 1.05 WIDE: bulldozers cut a channel near the Jordan's springs; later, dust bursts over the work sites
  { set: 'ec2_headwaters', cam: { z: [1.05, 1.12], x: [680, 640], y: [400, 410], ease: E.io }, bed: [['engine_loop', .2], ['water_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tW = at(Sh, 'water', 4.5); Sh.tA = at(Sh, 'attack', Sh.dur - 3.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      dozer(c, lerp(560, 760, seg(lt, 0, Sh.dur)), 486, 1.1, 1, lt); dozer(c, lerp(1100, 920, seg(lt, 0, Sh.dur)), 470, .9, -1, lt);
      if (lt > Sh.tA) [[700, 470], [980, 450], [1180, 446]].forEach(([x, y], k) => { const p = ((lt - Sh.tA - k * .5) / 1.6); if (p > 0) puff(c, x, y, p % 1); });
      if (lt < Sh.tA) { const q = E.io(seg(lt, Sh.tW, Sh.tW + 1.5)); if (q > 0) { c.strokeStyle = S.rgba('#c82a1a', .8); c.lineWidth = 6; c.setLineDash([16, 10]); c.beginPath(); c.moveTo(260, 470); c.lineTo(lerp(260, 1200, q), lerp(470, 420, q)); c.stroke(); c.setLineDash([]); } } },
    over: [(c, lt) => K.card(c, 'JORDAN HEADWATERS', lt, { at: .5, x: 560, y: 150, px: 44, rot: -2 }), (c, lt, u, Sh) => K.card(c, "ISRAEL'S WATER", lt, { at: Sh.tW, x: 1440, y: 150, px: 44, rot: 2, until: Sh.tA }), (c, lt, u, Sh) => K.card(c, 'SITES ATTACKED', lt, { at: Sh.tA + .3, x: 1440, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'engine_loop', .2], [.2, 'water_loop', .15], ['diversion', 'dig_loop', .2], ['attack', 'cannon', .3], ['attack', 'thud', .3]] },
];
VP.build(); K.boot();
</script></body></html>
