const CHICK = (c, x, y, s, lt, k) => { const p = Math.max(0, Math.sin(lt * 4 + k * 2)); c.save(); c.translate(x, y); c.scale(s * (k % 2 ? -1 : 1), s); c.fillStyle = 'rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(0, 2, 14, 3, 0, 0, TAU); c.fill();
  c.fillStyle = '#f0e8d8'; c.beginPath(); c.ellipse(0, -12, 13, 10, 0, 0, TAU); c.fill(); c.save(); c.translate(10, -18); c.rotate(p * .9); c.beginPath(); c.arc(0, 0, 6, 0, TAU); c.fill(); c.fillStyle = '#c8281e'; c.fillRect(-2, -8, 4, 4); c.fillStyle = '#e8a020'; c.beginPath(); c.moveTo(5, -1); c.lineTo(10, 1); c.lineTo(5, 3); c.fill(); c.fillStyle = '#2a2020'; c.fillRect(1, -2, 2, 2); c.restore();
  c.strokeStyle = '#e8a020'; c.lineWidth = 2; c.beginPath(); c.moveTo(-3, -3); c.lineTo(-3, 2); c.moveTo(3, -3); c.lineTo(3, 2); c.stroke(); c.restore(); };
// simple painted Europe: countries as soft blobs with labels; lit 0..1 turns gold
const EU = [['PORTUGAL', 250, 470, 40, 70], ['SPAIN', 350, 470, 110, 80], ['FRANCE', 470, 340, 110, 100], ['ITALY', 640, 450, 50, 120], ['BRITAIN', 400, 200, 60, 90], ['RUSSIA', 1000, 220, 220, 150], ['GERMANY', 640, 270, 90, 80], ['POLAND', 790, 260, 80, 70]];
const europe = (c, lit, lt) => { c.fillStyle = '#9ac0d8'; c.fillRect(120, 90, 1040, 520); c.strokeStyle = '#6a8aa0'; c.lineWidth = 2; for (let k = 0; k < 8; k++) { c.beginPath(); for (let x = 140; x < 1150; x += 20) c.lineTo(x, 120 + k * 64 + Math.sin(x * .03 + lt + k) * 3); c.globalAlpha = .25; c.stroke(); c.globalAlpha = 1; }
  EU.forEach(([n, x, y, rx, ry], i) => { const q = lit[n] || 0; c.fillStyle = S.mix('#b8aa88', '#f0c040', q); c.beginPath(); for (let k = 0; k <= 24; k++) { const a = k / 24 * TAU, r = 1 + .15 * Math.sin(a * 3 + i) + .08 * Math.sin(a * 5 + i * 2); c.lineTo(x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r); } c.closePath(); c.fill(); c.strokeStyle = '#6a5a3a'; c.lineWidth = 2; c.stroke();
    if (q > 0) S.glow(c, x, y, rx * 1.4, '#ffd040', .35 * q); c.fillStyle = '#3a2a1a'; c.font = '20px Anton'; c.textAlign = 'center'; c.fillText(n, x, y + 8); });
  c.strokeStyle = '#6a5a3a'; c.lineWidth = 8; c.strokeRect(120, 90, 1040, 520); };
window.SHOTS = [
  // 3.01 MED: snowy medieval village; a monk takes a garland down from a door; CANCELLED stamp
  { set: 'ny_snowvillage', cam: { z: [1.25, 1.35], x: [400, 420], y: [450, 450], ease: E.io }, bed: [['wind_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'medieval', 1); Sh.tC = at(Sh, 'cancelled', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt), rm = seg(lt, Sh.tC - 1.6, Sh.tC - .4);
      // garland on the cottage door, lifted down by the monk
      const gx = 380, gy = lerp(470, 560, rm); c.strokeStyle = '#2a6a2a'; c.lineWidth = 7; c.beginPath(); c.arc(gx, gy, 20, 0, TAU); c.stroke(); c.fillStyle = '#c8281e'; c.beginPath(); c.arc(gx, gy + 20, 5, 0, TAU); c.fill();
      fig(c, NY.MONK, 440, 666, 32, pose(lt, 1, { face: -1, shN: lerp(110, 50, rm), elN: 20, shF: lerp(100, 40, rm), elF: 20 }), lt, 1, L, { angry: .3, look: [-.7, -.3] });
      fig(c, NY.VILLW, 160, 670, 30, pose(lt, 2, { face: 1 }), lt, 2, L, { worry: seg(lt, Sh.tC, Sh.tC + .3), open: .4 * seg(lt, Sh.tC, Sh.tC + .3), look: [.7, 0] });
      snow(c, lt, 70, .8); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'MEDIEVAL EUROPE', lt, { at: Sh.tM }), (c, lt, u, Sh) => nyStamp(c, 'CANCELLED', lt, Sh.tC, 1300, 420)],
    sfx: [[.1, 'wind_loop', .25], [1.6, 'footsteps', .2], ['cancelled', 'stamp', .7]] },

  // 3.02 MED: inside a stone church at Christmas: evergreen, candles, choir; a cheeky card pops up
  { set: 'np_notredame', cam: { z: [1.2, 1.3], x: [640, 640], y: [420, 410], ease: E.io }, bed: [['hum_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tX = at(Sh, 'christmas', 3); Sh.tP = at(Sh, 'pagan', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = CANDLE(lt);
      // evergreen tree and candles by the altar
      [[300, 600], [980, 600]].forEach(([x, y], k) => { for (let j = 0; j < 4; j++) { c.fillStyle = S.mix('#1e4a2a', '#3a7a3a', j * .2); c.beginPath(); c.moveTo(x, y - 190 + j * 40); c.lineTo(x - 50 - j * 14, y - 100 + j * 30); c.lineTo(x + 50 + j * 14, y - 100 + j * 30); c.fill(); } c.fillStyle = '#5a3a1a'; c.fillRect(x - 8, y - 20, 16, 20); });
      for (let k = 0; k < 6; k++) { const x = 470 + k * 68, fl = 1 + .2 * Math.sin(lt * 9 + k * 2); c.fillStyle = '#f0e8d0'; c.fillRect(x - 4, 520, 8, 40); S.glow(c, x, 514, 26 * fl, '#ffb040', .5); c.fillStyle = '#ffd070'; c.beginPath(); c.ellipse(x, 512, 3 * fl, 7 * fl, 0, 0, TAU); c.fill(); }
      [[NY.MONK, 520], [NY.VILLW, 640], [NY.VILL, 760]].forEach(([ch, x], k) => fig(c, ch, x, 680, 30, pose(lt, k, { face: k === 1 ? 1 : (k ? -1 : 1), shN: 50, elN: 110 }), lt, k, L, { open: .25 + .25 * Math.sin(lt * 3 + k), squint: .4, look: [0, -.3] })); },
    over: [(c, lt, u, Sh) => K.card(c, 'CHRISTMAS', lt, { at: Sh.tX, x: 960, y: 160, px: 64 }), (c, lt, u, Sh) => K.card(c, '...ALSO PAGAN ROOTS', lt, { at: Sh.tP, x: 1460, y: 290, px: 46, rot: 5, bg: '#ffe070' })],
    sfx: [[.1, 'hum_loop', .2], ['christmas', 'chime', .4], ['pagan', 'ding', .55]] },

  // 3.03 MED: 1 January in the snowy village: a villager feeds the chickens and yawns; nothing happens
  { set: 'ny_snowvillage', cam: { z: [1.5, 1.55], x: [960, 960], y: [480, 480], ease: E.io }, bed: [['wind_loop', .15], ['crickets', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tO = at(Sh, 'ordinary', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = COLD(lt), yw = Math.max(0, Math.sin(Math.PI * seg(lt, Sh.tO - 1, Sh.tO + .6))), th = Math.max(0, Math.sin(lt * 2));
      for (let k = 0; k < 4; k++) CHICK(c, 900 + k * 70 + Math.sin(lt * .7 + k) * 10, 680 + (k % 2) * 10, 1.3, lt, k);
      fig(c, NY.VILL, 780, 670, 32, pose(lt, 1, { face: 1, shN: lerp(40, 160, yw) + 20 * th * (1 - yw), elN: 30, shF: lerp(-4, 150, yw), elF: 30 }), lt, 1, L, { open: yw, squint: .5 + .4 * yw, look: [.5, .4] });
      if (th > .9 && yw < .1) for (let k = 0; k < 6; k++) { const r = S.rng(Math.floor(lt / 3) * 9 + k); c.fillStyle = '#c8a050'; c.fillRect(860 + r() * 60, 640 + r() * 40, 3, 3); }
      snow(c, lt, 50, .6); },
    over: [(c, lt) => K.dateTag(c, '1 JANUARY', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, '...NOTHING.', lt, { at: Sh.tO, x: 760, y: 220, px: 60, rot: -3 })],
    sfx: [[.1, 'wind_loop', .15], [.1, 'crickets', .25], [.6, 'brush', .2], ['ordinary', 'yawn', .5]] },

  // 3.04 WIDE: Vatican hall, 1582: Pope Gregory XIII with astronomers around a globe and the calendar chart
  { set: 'ny_vatican', cam: { z: [1.0, 1.12], x: [640, 640], y: [390, 380], ease: E.io }, bed: [['hum_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tP = at(Sh, 'pope', 1.5); Sh.tD = at(Sh, 'drifted', 4.5); Sh.tG = at(Sh, 'gregorian', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt);
      // globe on a table, turning
      c.fillStyle = '#6a4a2a'; c.fillRect(560, 560, 160, 12); c.fillRect(600, 572, 12, 70); c.fillRect(668, 572, 12, 70); c.fillStyle = '#c8a040'; c.fillRect(636, 520, 8, 40);
      const g = c.createRadialGradient(630, 490, 4, 640, 500, 40); g.addColorStop(0, '#9ad0e8'); g.addColorStop(1, '#2a5a8a'); c.fillStyle = g; c.beginPath(); c.arc(640, 500, 38, 0, TAU); c.fill(); c.save(); c.beginPath(); c.arc(640, 500, 38, 0, TAU); c.clip(); c.fillStyle = '#7aa05a'; for (let k = 0; k < 3; k++) { const x = 600 + ((lt * 20 + k * 40) % 120); c.beginPath(); c.ellipse(x, 490 + k * 10, 14, 20, .3, 0, TAU); c.fill(); } c.restore(); c.strokeStyle = '#c8a040'; c.lineWidth = 3; c.beginPath(); c.arc(640, 500, 44, -1.9, 1.2); c.stroke();
      // a red line slips off the calendar chart on "drifted"
      const dq = seg(lt, Sh.tD - .3, Sh.tD + .6); c.strokeStyle = '#c8281e'; c.lineWidth = 4; c.beginPath(); c.moveTo(510, 300); c.lineTo(770, 300 + 60 * dq); c.stroke();
      fig(c, NY.GREGORY, 420, 660, 34, pose(lt, 1, { face: 1, shN: lerp(10, 100, seg(lt, Sh.tG - .5, Sh.tG)), elN: 10 }), lt, 1, L, { smile: .4, look: [.7, -.3] });
      fig(c, NY.ASTRO, 860, 660, 30, pose(lt, 2, { face: -1, shN: 60, elN: 90 }), lt, 2, L, { worry: dq, look: [-.7, -.2] });
      fig(c, NY.ASTRO2, 1000, 664, 30, pose(lt, 3, { face: -1, shN: 30 + 40 * dq, elN: 60 }), lt, 3, L, { raise: dq, look: [-.7, -.5] }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'POPE GREGORY XIII · 1582', lt, { at: Sh.tP }), (c, lt, u, Sh) => K.card(c, 'GREGORIAN CALENDAR', lt, { at: Sh.tG, x: 960, y: 900, px: 60 })],
    sfx: [[.1, 'hum_loop', .15], ['pope', 'bell', .35], ['drifted', 'trombone', .3], ['gregorian', 'chime', .45]] },

  // 3.05 MED: ten dates fly off the calendar like leaves; the page lands on 1 JANUARY with confetti
  { set: 'ny_vatican', cam: { z: [1.7, 1.75], x: [640, 640], y: [330, 330], ease: E.io }, bed: [['hum_loop', .1]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tT = at(Sh, 'ten', 1.5); Sh.tJ = at(Sh, 'january', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { ROOM(lt); const DAYS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      DAYS.forEach((d, k) => { const t0 = Sh.tT - .2 + k * .18, q = seg(lt, t0, t0 + 1.4); if (lt < t0) return; const r = S.rng(k + 70); nyPage(c, 640 + (r() - .5) * 600 * E.out(q), 330 - 60 * q + 380 * q * q, .7, (r() - .5) * 6 * q, String(d), 1 - seg(q, .7, 1)); });
      const land = lt > Sh.tJ - .2; nyCal(c, 640, 330, 1.05, land ? '1' : (lt > Sh.tT - .2 + 10 * .18 ? '15' : '4'), land ? 'JANUARY' : 'OCTOBER 1582', { px: 70 });
      nyConfetti(c, lt, seg(lt, Sh.tJ, Sh.tJ + .3), 60, 13, Sh.tJ); },
    over: [(c, lt, u, Sh) => K.card(c, '+10 DAYS', lt, { at: Sh.tT, x: 1460, y: 200, px: 64, rot: 4 }), (c, lt, u, Sh) => K.card(c, 'NEW YEAR: 1 JANUARY', lt, { at: Sh.tJ, x: 960, y: 940, px: 56 })],
    sfx: [[.1, 'hum_loop', .1], ['ten', 'whoosh', .35], ['ten', 'paper', .4], ['january', 'party_horn', .55], ['january', 'cheer', .35]] },

  // 3.06 MED: map of Europe: Italy, Spain, Portugal, France light gold; Britain and Russia stay grey
  { set: 'np_parch', cam: { z: [1.0, 1.06], x: [640, 640], y: [360, 360], ease: E.io }, bed: [['hum_loop', .08]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'catholic', 1.2); Sh.tO = at(Sh, 'others', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const lit = {}; ['ITALY', 'SPAIN', 'PORTUGAL', 'FRANCE', 'POLAND'].forEach((n, k) => lit[n] = seg(lt, Sh.tC + k * .35, Sh.tC + k * .35 + .3)); lit.GERMANY = .5 * seg(lt, Sh.tO - .5, Sh.tO);
      europe(c, lit, lt);
      // Britain and Russia: grumpy faces
      const g = seg(lt, Sh.tO, Sh.tO + .3); [[400, 200], [1000, 220]].forEach(([x, y]) => { if (g <= 0) return; c.save(); c.globalAlpha = g; c.fillStyle = '#3a2a1a'; c.beginPath(); c.arc(x - 14, y - 30, 4, 0, TAU); c.arc(x + 14, y - 30, 4, 0, TAU); c.fill(); c.lineWidth = 3; c.strokeStyle = '#3a2a1a'; c.beginPath(); c.moveTo(x - 22, y - 42); c.lineTo(x - 6, y - 38); c.moveTo(x + 22, y - 42); c.lineTo(x + 6, y - 38); c.moveTo(x - 10, y - 16); c.quadraticCurveTo(x, y - 22, x + 10, y - 16); c.stroke(); c.restore(); }); },
    over: [(c, lt, u, Sh) => K.card(c, 'NOT YET.', lt, { at: Sh.tO + .3, x: 1500, y: 560, px: 56, rot: -4 })],
    sfx: [[.1, 'hum_loop', .08], ['catholic', 'ding', .35]] },
];
VP.build(); K.boot();
</script></body></html>
