const crowd = (c, lt, n = 22, y0 = 640) => { for (let k = 0; k < n; k++) { const r = S.rng(12001 + k), x = (k / n) * 1360 - 40 + r() * 30, y = y0 + (k % 3) * 22, s = .9 + r() * .3, sw = Math.sin(lt * 1.2 + k) * 1.5;
  c.fillStyle = ['#1e1e24', '#26242a', '#2e2a2c'][k % 3]; c.beginPath(); c.ellipse(x + sw, y - 80 * s, 16 * s, 19 * s, 0, 0, TAU); c.fill(); c.beginPath(); c.moveTo(x - 38 * s, y + 80); c.quadraticCurveTo(x - 36 * s, y - 56 * s, x, y - 60 * s); c.quadraticCurveTo(x + 36 * s, y - 56 * s, x + 38 * s, y + 80); c.fill(); if (k % 4 === 1) { c.fillStyle = '#3a3a3a'; c.fillRect(x - 18 * s + sw, y - 102 * s, 36 * s, 8 * s); } } };
const sign = (c, x, y, s, q) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#5a5a5a'; c.fillRect(-4, -300, 8, 300); c.save(); c.translate(0, -290); c.scale(q, 1); c.fillStyle = '#1a4a8a'; c.beginPath(); c.roundRect(-140, 0, 280, 90, 8); c.fill(); c.strokeStyle = '#f0f0f0'; c.lineWidth = 4; c.strokeRect(-132, 8, 264, 74); c.fillStyle = '#f0f0f0'; c.font = '26px Oswald'; c.textAlign = 'center'; c.fillText('רחוב אלי כהן', 0, 40); c.fillText('ELI COHEN ST.', 0, 72); c.restore(); c.restore(); };
const watchBox = (c, x, y, s, op) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#2a1a3a'; c.fillRect(-80, -30, 160, 50); c.save(); c.translate(0, -30); c.scale(1, 1 - 1.6 * op); c.fillStyle = '#3a2a4a'; c.fillRect(-80, -30, 160, 30); c.restore(); if (op > .3) { c.fillStyle = '#4a2a5a'; c.fillRect(-70, -24, 140, 30); c.strokeStyle = '#3a2a1a'; c.lineWidth = 8; c.beginPath(); c.moveTo(-50, -10); c.lineTo(50, -10); c.stroke(); c.fillStyle = '#c8b070'; c.beginPath(); c.arc(0, -10, 18, 0, TAU); c.fill(); c.fillStyle = '#f0ece0'; c.beginPath(); c.arc(0, -10, 14, 0, TAU); c.fill(); c.strokeStyle = '#2a2a2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -10); c.lineTo(0, -20); c.moveTo(0, -10); c.lineTo(7, -8); c.stroke(); } c.restore(); };

window.SHOTS = [
  // 5.01 WIDE: Marjeh Square before dawn; a silent crowd seen from behind faces the old column; nothing else is shown
  { set: 'ec2_marjeh', cam: { z: [1.05, 1.12], x: [640, 640], y: [400, 390], ease: E.io }, bed: [['wind_loop', .25], ['crowd_loop', .08]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'broadcast', Sh.dur - 1.8); },
    draw: (c, lt, u, Sh) => { c.fillStyle = S.rgba('#1a2040', .35 * (1 - seg(lt, 0, Sh.dur) * .5)); c.fillRect(0, 0, 1280, 720); crowd(c, lt); },
    over: [(c, lt) => K.dateTag(c, 'MARJEH SQUARE · 18 MAY 1965', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'BROADCAST ON TV', lt, { at: Sh.tB, x: 1400, y: 150, px: 46, rot: 2 })],
    sfx: [[.1, 'wind_loop', .25], [.2, 'crowd_loop', .08], [2, 'heartbeat', .2], ['broadcast', 'drum', .35]] },

  // 5.02 WIDE: a bare patch of ground under the night sky; no marker anywhere
  { set: 'ec2_ground', cam: { z: [1.05, 1.1], x: [640, 620], y: [400, 400], ease: E.io }, bed: [['night_loop', .25], ['wind_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'moved', Sh.dur * .6); },
    draw: (c, lt, u, Sh) => { c.fillStyle = S.rgba('#0a1030', .55); c.fillRect(0, 0, 1280, 720); VP.glow(c, 1100, 120, 80, '#f0f0d8', .3); c.fillStyle = '#f0f0d8'; c.beginPath(); c.arc(1100, 120, 18, 0, TAU); c.fill();
      if (lt > Sh.tM) [[380, 560], [700, 600], [960, 540]].forEach(([x, y], k) => { const q = seg(lt, Sh.tM + k * .6, Sh.tM + .6 + k * .6); if (q <= 0) return; c.strokeStyle = S.rgba('#e8d8b0', .7 * q); c.lineWidth = 3; c.setLineDash([8, 8]); c.beginPath(); c.ellipse(x, y, 60, 16, 0, 0, TAU); c.stroke(); c.setLineDash([]); c.fillStyle = S.rgba('#e8d8b0', .8 * q); c.font = '40px Anton'; c.textAlign = 'center'; c.fillText('?', x, y - 24); c.textAlign = 'left'; }); },
    over: [(c, lt) => K.card(c, 'BODY NEVER RETURNED', lt, { at: .6, x: 1380, y: 150, px: 46, rot: 2 }), (c, lt, u, Sh) => K.card(c, 'GRAVE MOVED', lt, { at: Sh.tM, x: 1380, y: 260, px: 42, rot: -2 })],
    sfx: [[.1, 'night_loop', .25], [.2, 'wind_loop', .15], ['moved', 'whoosh_soft', .3]] },

  // 5.03 MAP then WIDE: the 1967 war, the Golan changes hands; then a street sign with his name
  { set: 'ec_desktop', cam: (lt, u, Sh) => lt < Sh.tH ? { z: [lerp(1.02, 1.1, seg(lt, 0, Sh.tH))], x: [640], y: [340] } : { z: [1.05], x: [640], y: [380] }, bed: [['drum_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'hero', Sh.dur - 3); Sh.tC = at(Sh, 'captured', 2); },
    draw: (c, lt, u, Sh) => {
      if (lt < Sh.tH) { S.ecGolan(c, 1, 1, 0, lt); const q = E.io(seg(lt, Sh.tC, Sh.tC + 1.8)); c.fillStyle = S.rgba('#3a6ab0', .3 * q); c.beginPath(); c.moveTo(660, 90); c.lineTo(660 + 470 * q, 90); c.lineTo(660 + 470 * q, 590); c.lineTo(700, 590); c.quadraticCurveTo(650, 420, 680, 300); c.quadraticCurveTo(620, 200, 660, 90); c.fill();
        c.strokeStyle = '#2a4a8a'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(420, 340); c.lineTo(420 + 400 * q, 340 - 40 * q); c.stroke(); return; }
      VP.drawSet(c, 'ec2_ground'); sign(c, 760, 620, 1, E.back(seg(lt, Sh.tH + .2, Sh.tH + .9))); },
    over: [(c, lt) => K.dateTag(c, 'JUNE 1967', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'HOW MUCH HE HELPED: DEBATED', lt, { at: Sh.tC + 2.5, x: 1380, y: 150, px: 38, rot: -1, until: Sh.tH }), (c, lt, u, Sh) => K.card(c, 'NATIONAL HERO', lt, { at: Sh.tH + .4, x: 1400, y: 150, px: 52, rot: 2 })],
    sfx: [[.1, 'drum_loop', .15], ['captured', 'whoosh', .3], ['hero', 'swell', .35]] },

  // 5.04 MED: an archive room; a velvet box opens on his wristwatch; then boxes of files stack up
  { set: 'ec2_archive', cam: (lt, u, Sh) => lt < Sh.t5 ? { z: [lerp(1.6, 1.75, seg(lt, 0, Sh.t5))], x: [640], y: [500] } : { z: [1.08], x: [640], y: [420] }, bed: [['clock_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.t5 = at(Sh, '2025', Sh.dur * .5); },
    draw: (c, lt, u, Sh) => { S.ecTable(c, 640, 640, 420, 80, '#5a3a22'); if (lt < Sh.t5) { watchBox(c, 640, 552, 1.3, E.io(seg(lt, 1, 2.2))); VP.glow(c, 640, 530, 140, '#ffe0a0', .25); return; }
      for (let k = 0; k < 7; k++) { const q = E.out(seg(lt, Sh.t5 + k * .3, Sh.t5 + .5 + k * .3)); if (q <= 0) continue; const x = 470 + (k % 4) * 110 + (k > 3 ? 55 : 0), y = 560 - (k > 3 ? 60 : 0); c.fillStyle = '#9a9488'; c.fillRect(x - 50, lerp(y - 200, y, q) - 60, 100, 60); c.fillStyle = '#e8e4dc'; c.fillRect(x - 20, lerp(y - 200, y, q) - 44, 40, 14); } },
    over: [(c, lt) => K.dateTag(c, '2018', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'HIS WRISTWATCH', lt, { at: 2.2, x: 1400, y: 150, px: 46, rot: 2, until: Sh.t5 }), (c, lt, u, Sh) => K.card(c, '2025 · THOUSANDS OF FILES', lt, { at: Sh.t5 + .3, x: 1400, y: 150, px: 44, rot: 2 })],
    sfx: [[.1, 'clock_loop', .15], [1, 'creak', .3], ['2025', 'paper', .35], ['2025', 'thud', .25]] },

  // 5.05 CU: the bedroom windowsill at sunset; the empty tea tin; Damascus roofs beyond
  { set: 'ec_bedroom', cam: { z: [2.3, 2.5], x: [880, 880], y: [290, 296], ease: E.io }, bed: [['wind_loop', .2], ['music_box', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tH = at(Sh, 'hero', Sh.dur * .45); Sh.tT = at(Sh, 'traitor', Sh.dur * .6); Sh.tN = at(Sh, 'nobody', Sh.dur - 3); },
    draw: (c, lt) => { c.save(); c.beginPath(); c.rect(760, 110, 240, 260); c.clip(); const g = c.createLinearGradient(0, 110, 0, 370); g.addColorStop(0, S.rgba('#ff9a50', .55)); g.addColorStop(1, S.rgba('#ffd090', .35)); c.fillStyle = g; c.fillRect(760, 110, 240, 260); c.restore(); S.ecTin(c, 830, 382, .55, 1, 0); VP.glow(c, 880, 260, 160, '#ffb070', .3); },
    over: [(c, lt, u, Sh) => K.card(c, 'HERO', lt, { at: Sh.tH, x: 560, y: 180, px: 60, rot: -3 }), (c, lt, u, Sh) => K.card(c, 'TRAITOR', lt, { at: Sh.tT, x: 1380, y: 180, px: 60, rot: 3 }), (c, lt, u, Sh) => K.card(c, 'NOBODY FOOLED THEM BETTER', lt, { at: Sh.tN, x: 960, y: 820, px: 44, rot: -1 })],
    sfx: [[.1, 'wind_loop', .2], [.2, 'music_box', .15], ['hero', 'chime', .3], ['traitor', 'drum', .35], ['nobody', 'swell', .4]] },
];
VP.build(); K.boot();
</script></body></html>
