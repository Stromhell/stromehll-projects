const BIRDS = (c, lt, x, y, n = 6) => { for (let k = 0; k < n; k++) { const bx = (x + lt * (40 + k * 6) + k * 70) % 1400 - 60, by = y + Math.sin(lt * 1.3 + k) * 10 + k * 12, f = Math.sin(lt * 9 + k) * 5; c.strokeStyle = 'rgba(40,30,30,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(bx - 8, by - f); c.lineTo(bx, by); c.lineTo(bx + 8, by - f); c.stroke(); } };
window.SHOTS = [
  // 1.01 WIDE: Babylon at sunrise; people cross the plaza with baskets; a horn sounds from the ziggurat
  { set: 'ny_babylon', cam: { z: [1.0, 1.1], x: [620, 660], y: [380, 370], ease: E.io }, bed: [['birds_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tB = at(Sh, 'babylon', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { const L = DAWN(lt); BIRDS(c, lt, 100, 150, 7);
      const W = (ch, x0, x1, k, face, y = 640, t0 = 0, t1 = Sh.dur) => { const q = seg(lt, t0, t1), x = lerp(x0, x1, q); fig(c, ch, x, y, 28, q > 0 && q < 1 ? walk(lt, k, { face }) : pose(lt, k, { face }), lt, k, L, { smile: .6, look: [face * .6, 0] }); };
      W(NY.BAB, -60, 380, 0, 1, 650); W(NY.BABW, 1340, 900, 1, -1, 660); W(NY.BAB2, 140, 520, 2, 1, 690, .5); W(NY.BABKID, 1380, 1040, 3, -1, 700, .8);
      // horn blower on the lowest terrace
      fig(c, NY.STORY, 470, 520, 16, pose(lt, 4, { face: 1, shN: 80, elN: 20 }), lt, 4, L, {});
      VP.motes(c, lt, 0, 300, 1280, 300, { n: 14 }); },
    over: [(c, lt) => K.dateTag(c, 'BABYLON · c. 2000 BCE', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'THE FIRST NEW YEAR PARTY', lt, { at: Sh.tB, x: 960, y: 170, px: 60 })],
    sfx: [[.1, 'birds_loop', .25], [.6, 'horn', .35], [.8, 'footsteps', .25], ['babylon', 'chime', .35]] },

  // 1.02 MED: barley shoots pop up; a farmer stretches and grins; the sun rises due east
  { set: 'ny_fields', cam: { z: [1.15, 1.3], x: [640, 620], y: [450, 440], ease: E.io }, bed: [['birds_loop', .2]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'march', 2.5); Sh.tC = at(Sh, 'crops', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = DAWN(lt);
      // sprouts pop up row by row on "crops"
      for (let k = 0; k < 26; k++) { const x = 60 + k * 46 + (k % 3) * 6, y = 680 + (k % 2) * 16, q = E.out(seg(lt, Sh.tC - .6 + k * .05, Sh.tC + k * .05)), h = 34 * q * (1 + .1 * Math.sin(lt * 3 + k));
        if (q <= 0) continue; c.strokeStyle = '#5a9a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 3, y - h * .5, x + Math.sin(lt * 2 + k) * 3, y - h); c.stroke(); c.fillStyle = '#c8b040'; c.beginPath(); c.ellipse(x + Math.sin(lt * 2 + k) * 3, y - h - 5, 3, 7 * q, 0, 0, TAU); c.fill(); }
      const st = Math.max(0, Math.sin(Math.PI * seg(lt, .8, 2.4)));
      fig(c, NY.FARMER, 420, 700, 46, pose(lt, 1, { face: 1, shN: lerp(4, 165, st), shF: lerp(-4, 160, st), elN: lerp(10, 40, st), elF: lerp(10, 40, st), lean: -4 * st }), lt, 1, L, { smile: seg(lt, Sh.tC, Sh.tC + .5), open: st * .6, squint: st * .6, look: [.7, -.3] }); },
    over: [(c, lt, u, Sh) => K.card(c, 'LATE MARCH', lt, { at: Sh.tM, x: 1450, y: 200, px: 56 }), (c, lt, u, Sh) => K.card(c, 'SPRING EQUINOX', lt, { at: Sh.tM + .5, x: 1450, y: 290, px: 40, rot: 2 })],
    sfx: [[.1, 'birds_loop', .2], [.9, 'yawn', .4], ['crops', 'boing', .4], ['crops', 'pop', .35]] },

  // 1.03 MED: Akitu procession with drums and garlands carrying a statue; a wall counter ticks 1 to 11
  { set: 'ny_babylon', cam: { z: [1.5, 1.6], x: [520, 600], y: [480, 480], ease: E.io }, bed: [['drum_loop', .25], ['crowd_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tA = at(Sh, 'akitu', 1); Sh.tE = at(Sh, 'eleven', 3); Sh.tE2 = at(Sh, 'eleven!', Sh.tE + 1.3); Sh.tM = at(Sh, 'midnight', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), off = lt * 46;
      // statue on a litter carried by two bearers; drummer and harpist follow, all walking right
      const xs = [[NY.BAB2, 140], [NY.BAB, 260], [NY.BABW, 600], [NY.BAB2, 720], [NY.BABKID2, 840]];
      xs.forEach(([ch, x0], k) => { const x = x0 + off; if (x > 1400) return; fig(c, ch, x, 650, 26, walk(lt, k, { face: 1, shN: k < 2 ? 150 : 40 + Math.sin(lt * 8 + k) * 20, elN: k < 2 ? 10 : 60 }), lt, k, L, { smile: .8, look: [.6, 0] }); });
      // litter held above the first two bearers
      const lx = 200 + off, ly = 650 - 26 * 4.55; c.fillStyle = '#6a4a2a'; c.fillRect(lx - 90, ly, 180, 8); c.fillStyle = '#c8a040'; c.fillRect(lx - 24, ly - 70, 48, 70); c.beginPath(); c.arc(lx, ly - 82, 18, 0, TAU); c.fill(); c.fillStyle = '#2a4a8a'; c.fillRect(lx - 20, ly - 104, 40, 10);
      // garlands between the walkers
      c.strokeStyle = '#e8c040'; c.lineWidth = 4; c.beginPath(); c.moveTo(600 + off, 520); c.quadraticCurveTo(660 + off, 560, 720 + off, 520); c.stroke();
      // day counter carved on the wall, ticking from 1 to 11 between "eleven" and "eleven!"
      const d = Math.max(1, Math.min(11, Math.floor(lerp(1, 11.99, seg(lt, Sh.tE - .3, Sh.tE2))))); c.fillStyle = '#5a3a1a'; c.fillRect(820, 330, 140, 110); c.fillStyle = '#f0e0b0'; c.font = '26px Oswald'; c.textAlign = 'center'; c.fillText('DAY', 890, 362); c.font = '60px Anton'; c.fillText(String(d), 890, 426); },
    over: [(c, lt, u, Sh) => K.card(c, 'AKITU', lt, { at: Sh.tA, x: 960, y: 170, px: 80 }), (c, lt, u, Sh) => K.card(c, '11 DAYS!', lt, { at: Sh.tE2, x: 960, y: 270, px: 66, rot: -3 }), (c, lt, u, Sh) => K.card(c, 'US: ONE NIGHT', lt, { at: Sh.tM - .4, x: 1500, y: 900, px: 44, rot: 2 })],
    sfx: [[.1, 'drum_loop', .25], [.1, 'crowd_loop', .15], ['akitu', 'drum', .45], ['eleven', 'ding', .4], ['eleven!', 'ding', .5], ['midnight', 'yawn', .4]] },

  // 1.04 MED: a storyteller's shadow-puppet show, Marduk with a bow against the sea serpent; kids cheer
  { set: 'ny_babylon', cam: { z: [1.9, 2.0], x: [880, 860], y: [500, 500], ease: E.io }, bed: [['crowd_loop', .12]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tM = at(Sh, 'marduk', 1.5); Sh.tT = at(Sh, 'tiamat', 3); Sh.tW = at(Sh, 'wrestling', 5); Sh.tS = at(Sh, 'won', Sh.dur - 1); },
    draw: (c, lt, u, Sh) => { const L = DUSK(lt);
      // cloth screen lit from behind
      c.fillStyle = '#4a2e1a'; c.fillRect(760, 380, 8, 220); c.fillRect(1052, 380, 8, 220); c.fillStyle = '#f8e0a0'; c.fillRect(768, 390, 284, 150); S.glow(c, 910, 465, 160, '#ffd080', .3);
      c.save(); c.beginPath(); c.rect(768, 390, 284, 150); c.clip(); c.fillStyle = '#2a1a10';
      // Tiamat: coiling serpent that rears up then sinks on "won"
      const sink = seg(lt, Sh.tS - .3, Sh.tS + .7), hx = 948 + Math.sin(lt * 2) * 6, hy = 440 + 95 * E.io(sink) + Math.sin(lt * 3) * 6;
      // serpent body: thick tapering coil from the bottom right up to the head
      for (let k = 0; k < 24; k++) { const q = k / 23, x = lerp(1050, hx + 14, q) + Math.sin(q * 7 + lt * 3) * 18 * (1 - q), y = lerp(545, hy + 14, q) + Math.sin(q * 5 + lt * 2) * 10 * (1 - q); c.beginPath(); c.arc(x, y, lerp(16, 9, q), 0, TAU); c.fill(); }
      // dragon head looking left: snout, open jaw, horns, a lit eye hole
      c.save(); c.translate(hx, hy); c.rotate(-.15 + .6 * sink); c.beginPath(); c.ellipse(0, 0, 24, 15, 0, 0, TAU); c.fill(); c.beginPath(); c.moveTo(-8, -6); c.lineTo(-42, -2); c.lineTo(-38, 6); c.lineTo(-6, 6); c.fill();
      const jw = .25 + .2 * Math.sin(lt * 5) * (1 - sink); c.beginPath(); c.moveTo(-4, 8); c.lineTo(-36, 10 + jw * 30); c.lineTo(-30, 18 + jw * 30); c.lineTo(6, 12); c.fill();
      c.beginPath(); c.moveTo(8, -10); c.lineTo(22, -34); c.lineTo(16, -8); c.fill(); c.beginPath(); c.moveTo(-2, -12); c.lineTo(4, -32); c.lineTo(6, -10); c.fill();
      c.fillStyle = '#f8e0a0'; c.beginPath(); c.arc(-10, -3, 3, 0, TAU); c.fill(); c.restore(); c.fillStyle = '#2a1a10';
      // arrow flies from the bow to the serpent on "wrestling"
      const fa = seg(lt, Sh.tW, Sh.tW + .5); if (fa > 0 && fa < 1) { const ax = lerp(890, hx - 20, fa), ay = lerp(470, hy, fa); c.lineWidth = 3; c.strokeStyle = '#2a1a10'; c.beginPath(); c.moveTo(ax - 26, ay); c.lineTo(ax, ay); c.stroke(); c.beginPath(); c.moveTo(ax + 8, ay); c.lineTo(ax - 2, ay - 5); c.lineTo(ax - 2, ay + 5); c.fill(); }
      // Marduk: figure with a bow, lunges on "wrestling"
      const lu = Math.sin(Math.PI * seg(lt, Sh.tW - .2, Sh.tW + .8)) * 30, mx = 830 + lu; c.beginPath(); c.arc(mx, 440, 12, 0, TAU); c.fill(); c.fillRect(mx - 8, 452, 16, 50); c.fillRect(mx - 10, 500, 6, 40); c.fillRect(mx + 4, 500, 6, 40);
      c.lineWidth = 4; c.strokeStyle = '#2a1a10'; c.beginPath(); c.arc(mx + 26, 470, 26, -1.3, 1.3); c.stroke(); if (lt < Sh.tW) { c.beginPath(); c.moveTo(mx + 6, 470); c.lineTo(mx + 60, 470); c.stroke(); } c.restore();
      // the storyteller works the puppets; kids watch and cheer on "won"
      fig(c, NY.STORY, 700, 650, 26, pose(lt, 2, { face: 1, shN: 110 + Math.sin(lt * 3) * 10, elN: 30 }), lt, 2, L, { open: .3 + .3 * Math.sin(lt * 7), look: [.6, -.2] });
      const ch = seg(lt, Sh.tS, Sh.tS + .3); [[NY.BABKID, 860], [NY.BABKID2, 960], [NY.BABKID, 1060]].forEach(([k0, x], k) => fig(c, k0, x, 690 - ch * 6 * Math.abs(Math.sin(lt * 6 + k)), 20, pose(lt, k + 3, { face: -1, shN: lerp(10, 160, ch), shF: lerp(-4, 150, ch) }), lt, k + 3, L, { smile: ch, open: ch * .8, wide: 1 - ch * .5, look: [-.2, -.6] })); },
    over: [(c, lt, u, Sh) => K.card(c, 'MARDUK  vs  TIAMAT', lt, { at: Sh.tM, x: 960, y: 170, px: 70 }), (c, lt, u, Sh) => K.card(c, 'SKY WINS!', lt, { at: Sh.tS, x: 960, y: 270, px: 60, rot: -3 })],
    sfx: [[.1, 'crowd_loop', .12], ['marduk', 'whoosh', .4], ['tiamat', 'splash', .4], ['wrestling', 'hit', .45], ['won', 'cheer', .45]] },

  // 1.05 MED: the Nile spills over its banks; Egyptians on the bank cheer and wave palm fronds
  { set: 'sz_oldcanal', cam: { z: [1.1, 1.2], x: [640, 660], y: [400, 410], ease: E.io }, bed: [['water_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tE = at(Sh, 'egyptians', 2.5); Sh.tF = at(Sh, 'flooding', Sh.dur - 2); },
    draw: (c, lt, u, Sh) => { const L = SUN(lt), fl = E.io(seg(lt, Sh.tF - 1.2, Sh.tF + 1));
      // flood water spreading up over the near bank
      const wy = lerp(600, 560, fl); c.fillStyle = S.rgba('#5a8ab0', .75 * fl); c.beginPath(); c.moveTo(0, 600); for (let x = 0; x <= 1280; x += 20) c.lineTo(x, wy + Math.sin(x * .02 + lt * 2) * 4); c.lineTo(1280, 600); c.fill();
      c.strokeStyle = S.rgba('#ffffff', .4 * fl); c.lineWidth = 2; for (let k = 0; k < 12; k++) { const x = (k * 110 + lt * 30) % 1280; c.beginPath(); c.moveTo(x, wy + 10); c.lineTo(x + 30, wy + 10); c.stroke(); }
      const ch = seg(lt, Sh.tF, Sh.tF + .4);
      [[NY.EGY, 230, 1], [NY.EGYW, 430, 1], [NY.EGY2, 850, -1], [NY.EGY, 1050, -1]].forEach(([p, x, f], k) => fig(c, p, x, 705 - ch * 5 * Math.abs(Math.sin(lt * 6 + k)), 40, pose(lt, k, { face: f, shN: lerp(10, 160, ch) + Math.sin(lt * 5 + k) * 12 * ch, elN: 30, holdN: k % 2 ? undefined : (wr => { c.save(); c.translate(wr[0], wr[1]); c.rotate(-.3 * f + Math.sin(lt * 6 + k) * .3 * ch); c.strokeStyle = '#4a7a2a'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -60); c.stroke(); for (let j = 0; j < 8; j++) { c.beginPath(); c.moveTo(0, -20 - j * 5); c.lineTo(-14, -30 - j * 5); c.moveTo(0, -20 - j * 5); c.lineTo(14, -30 - j * 5); c.stroke(); } c.restore(); }) }), lt, k, L, { smile: .4 + .6 * ch, open: ch * .7, look: [f * .5, -.2] })); },
    over: [(c, lt) => K.dateTag(c, 'ANCIENT EGYPT', lt, { at: .4 }), (c, lt, u, Sh) => K.card(c, 'THE NILE FLOOD = NEW YEAR', lt, { at: Sh.tF, x: 960, y: 180, px: 56 })],
    sfx: [[.1, 'water_loop', .3], ['egyptians', 'chime', .3], ['flooding', 'splash', .5], ['flooding', 'crowd_cheer', .35]] },

  // 1.06 MED: Chinese village at dusk; red lanterns rise up their strings, a drummer plays, a family feasts at the gate
  { set: 'ny_china', cam: { z: [1.05, 1.15], x: [640, 640], y: [400, 390], ease: E.io }, bed: [['night_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tC = at(Sh, 'china', 1); Sh.tT = at(Sh, 'three', 2.5); },
    draw: (c, lt, u, Sh) => { const L = DUSK(lt);
      // sky lanterns floating up
      for (let k = 0; k < 7; k++) { const q = seg(lt, .5 + k * .5, Sh.dur + 2), x = 120 + k * 170 + Math.sin(lt + k) * 20, y = lerp(560, 80, q); if (q > 0) NYX.lantern(c, x, y, .8); }
      // drummer
      const hit = Math.abs(Math.sin(lt * 5)); c.fillStyle = '#b8281e'; c.beginPath(); c.ellipse(300, 610, 46, 30, 0, 0, TAU); c.fill(); c.fillStyle = '#f0d8a8'; c.beginPath(); c.ellipse(300, 584, 46, 12, 0, 0, TAU); c.fill(); c.fillStyle = '#5a3a1a'; c.fillRect(270, 620, 8, 40); c.fillRect(322, 620, 8, 40);
      fig(c, NY.CHN, 210, 670, 28, pose(lt, 1, { face: 1, shN: 60 + hit * 40, elN: 70 - hit * 40 }), lt, 1, L, { smile: .7, look: [.6, .3] });
      // family at the gate: grandpa, mother and child; the child points up at the lanterns
      fig(c, NY.CHNOLD, 640, 670, 28, pose(lt, 2, { face: 1 }), lt, 2, L, { smile: .6, look: [.3, -.4] });
      fig(c, NY.CHNW, 790, 670, 28, pose(lt, 3, { face: -1, shN: 40, elN: 60 }), lt, 3, L, { smile: .8, look: [-.3, -.4] });
      fig(c, NY.CHNKID, 920, 680, 22, pose(lt, 4, { face: -1, shN: 160, elN: 10 }), lt, 4, L, { smile: 1, open: .5, look: [-.2, -.8] }); },
    over: [(c, lt, u, Sh) => K.dateTag(c, 'CHINA', lt, { at: Sh.tC }), (c, lt, u, Sh) => K.card(c, '3,000 YEARS AGO', lt, { at: Sh.tT, x: 1450, y: 200, px: 56 })],
    sfx: [[.1, 'night_loop', .15], [.4, 'drum_loop', .3], ['china', 'bell', .3], ['three', 'firework', .3]] },
];
VP.build(); K.boot();
</script></body></html>
