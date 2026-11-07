const CROWD1 = [NY.PARTY, NY.PARTY2, NY.PARTY3, NY.PARTYKID, NY.PARTY4, NY.PARTY5];
window.SHOTS = [
  // 0.01 WIDE: Times Square countdown; ball slides down; on "wait" everything freezes (record scratch)
  { set: 'ny_times', cam: (lt, u, Sh) => { const f = Math.min(lt, Sh.tW); return { z: [lerp(1.0, 1.12, E.io(seg(f, 0, Sh.tW)))], x: [640], y: [lerp(380, 360, seg(f, 0, Sh.tW))], shake: lt > Sh.tW && lt < Sh.tW + .25 ? 5 : 0 }; }, bed: [['crowd_loop', .3]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.n = ['five', 'four', 'three', 'two', 'one'].map((w, i) => at(Sh, w, 1 + i * .9)); Sh.tH = at(Sh, 'happy', 6); Sh.tW = at(Sh, 'wait', 7.4); Sh.tY = at(Sh, 'why', 8.4); },
    draw: (c, lt0, u, Sh) => { const lt = Math.min(lt0, Sh.tW + .05), fr = lt0 > Sh.tW, L = PARTYL(lt);
      nyBall(c, seg(lt, Sh.n[0] - .3, Sh.n[4] + .5), lt, 1);
      // fireworks start on "happy" and freeze mid-air on "wait"
      nyRocket(c, lt, Sh.tH + .3, 330, 150, '#ff5080', 11); nyRocket(c, lt, Sh.tH + .5, 950, 120, '#60c0ff', 12);
      const ch = seg(lt, Sh.tH - .1, Sh.tH + .3);
      nyCrowd(c, lt, L, CROWD1, 716, 44, ch, 120, 208);
      if (fr) { c.fillStyle = 'rgba(40,30,70,.35)'; c.fillRect(0, 0, 1280, 720); }
      nyConfetti(c, lt, ch, 60, 5, Sh.tH); },
    over: [(c, lt, u, Sh) => { ['5', '4', '3', '2', '1'].forEach((t, i) => nyNum(c, t, lt, Sh.n[i], { hold: i < 4 ? .36 : .8, px: 420, y: 560 })); },
      (c, lt, u, Sh) => lt < Sh.tW && K.card(c, 'HAPPY NEW...', lt, { at: Sh.tH, x: 960, y: 260, px: 90 }),
      (c, lt, u, Sh) => K.card(c, 'WAIT.', lt, { at: Sh.tW, x: 960, y: 300, px: 120, rot: -3 }),
      (c, lt, u, Sh) => K.card(c, 'WHY DO WE DO THIS?', lt, { at: Sh.tY + .3, x: 960, y: 450, px: 70, rot: 2 })],
    sfx: [[.1, 'crowd_loop', .3], ['five', 'beep', .5], ['four', 'beep', .5], ['three', 'beep', .5], ['two', 'beep', .5], ['one', 'beep_long', .5], ['happy', 'crowd_cheer', .4], ['happy', 'firework', .4], ['wait', 'scratch', .7]] },

  // 0.02 MED: party guest on the sofa fighting sleep, crossing resolutions off a list
  { set: 'ny_party', cam: { z: [1.75, 1.9], x: [620, 630], y: [450, 455], ease: E.io }, bed: [['night_loop', .15]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tR = at(Sh, 'resolutions', 2); Sh.tF = at(Sh, 'february', 3.5); Sh.tB = at(Sh, 'ball', 5); },
    draw: (c, lt, u, Sh) => { const L = ROOM(lt), yw = Math.max(0, Math.sin(Math.PI * seg(lt, .4, 2.0))), dr = .5 + .5 * Math.sin(lt * 1.3);
      // the guest sits on the sofa holding a list; his head nods and yawns
      fig(c, NY.SOFA, 600, 600, 34, pose(lt, 1, { sitY: -1.75, hipN: 85, hipF: 85, kneeN: 85, kneeF: 85, shN: 40, elN: 70, shF: 20, elF: 60, lean: lerp(0, 8, dr), tilt: -6 * dr,
          holdN: wr => { c.save(); c.translate(wr[0] + 8, wr[1] - 30); c.rotate(-.12); c.fillStyle = '#fbf6e8'; c.fillRect(-28, -40, 66, 84); c.fillStyle = '#2a2a3a'; c.font = 'bold 9px Oswald, sans-serif'; c.textAlign = 'left';
            const it = ['GYM', 'READ MORE', 'SLEEP EARLY'], ts = [Sh.tR + .3, Sh.tF - .6, Sh.tF + .2]; it.forEach((s, k) => { c.fillText('□ ' + s, -22, -22 + k * 18); const q = seg(lt, ts[k], ts[k] + .35); if (q > 0) { c.strokeStyle = '#c8281e'; c.lineWidth = 2; c.beginPath(); c.moveTo(-24, -26 + k * 18); c.lineTo(-24 + 60 * q, -26 + k * 18); c.stroke(); } }); c.restore(); } }), lt, 1, L, { open: yw * .9, squint: .4 + .5 * dr, look: [.4, .3], blink: lt % 3 < .2 });
      // a droopy party horn on the cushion
      c.save(); c.translate(760, 545); c.rotate(.2 + .1 * Math.sin(lt)); c.fillStyle = '#ffd040'; c.beginPath(); c.moveTo(0, 0); c.lineTo(50, -6); c.lineTo(50, 6); c.fill(); c.strokeStyle = '#e8303a'; c.lineWidth = 3; c.beginPath(); c.moveTo(50, 0); c.quadraticCurveTo(70, 10, 64, 30); c.stroke(); c.restore();
      // the TV on the window side shows the ball dropping when the line says it
      c.save(); c.fillStyle = '#141420'; c.fillRect(960, 420, 150, 96); c.fillStyle = '#2a2050'; c.fillRect(968, 428, 134, 80); c.save(); c.beginPath(); c.rect(968, 428, 134, 80); c.clip(); c.translate(968 - 640 * .21 + 67, 428); c.scale(.21, .5); nyBall(c, seg(lt, Sh.tB - .3, Sh.tB + 1.2), lt, .8); c.restore(); c.fillStyle = '#3a3a4a'; c.fillRect(1020, 516, 30, 30); c.fillRect(1000, 544, 70, 8); c.restore(); },
    over: [(c, lt, u, Sh) => K.card(c, 'RESOLUTIONS?', lt, { at: Sh.tR, x: 420, y: 200, px: 56, rot: 3 }), (c, lt, u, Sh) => K.card(c, 'GONE BY FEBRUARY', lt, { at: Sh.tF, x: 420, y: 300, px: 46, rot: -2 })],
    sfx: [[.1, 'night_loop', .15], [.6, 'yawn', .5], ['resolutions', 'brush', .4], ['february', 'brush', .4], ['ball', 'boing', .35]] },

  // 0.03 MED: wall calendar flips backwards faster and faster, years run back to 2000 BCE, then it turns to clay
  { set: 'ny_senate', cam: (lt, u, Sh) => ({ z: [lerp(1.4, 1.65, E.io(seg(lt, 0, Sh.dur)))], x: [640], y: [lerp(300, 290, seg(lt, 0, Sh.dur))], shake: lt > Sh.tC && lt < Sh.tC + .3 ? 4 : 0 }), bed: [['clock_loop', .25]],
    init: Sh => { Sh.dur = Sh.end - Sh.start; Sh.tY = at(Sh, 'four', 2); Sh.tC = at(Sh, 'january', Sh.dur - 1.5); },
    draw: (c, lt, u, Sh) => { ROOM(lt); c.fillStyle = 'rgba(30,20,10,.25)'; c.fillRect(0, 0, 1280, 720);
      const q = E.inn(seg(lt, .4, Sh.tC)), yr = Math.round(lerp(2026, -2000, q)), lbl = yr > 0 ? String(yr) : (-yr) + ' BCE';
      if (lt < Sh.tC) { for (let k = 0; k < 6; k++) {} nyCal(c, 640, 290, 1.3, lbl, 'YEAR', { px: yr > 0 ? 54 : 34 });
        // flying pages peel off as the years run back
        const rate = lerp(2, 18, q); for (let k = 0; k < 6; k++) { const ph = ((lt * rate / 6 + k / 6) % 1); nyPage(c, 640 + (110 + ph * 420) * (k % 2 ? 1 : -1), 260 - ph * 120 + ph * ph * 300, 1.2 - ph * .4, ph * 4 * (k % 2 ? 1 : -1), String(Math.abs(yr + k * 7) || 1).slice(0, 4), 1 - ph); } }
      else { // a clay tablet with wedge marks thumps down in its place
        const d = E.out(seg(lt, Sh.tC, Sh.tC + .3)); c.save(); c.translate(640, lerp(150, 290, d)); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-76, -96, 160, 200); c.fillStyle = '#b8845a'; c.beginPath(); c.roundRect(-80, -100, 160, 200, 18); c.fill(); c.fillStyle = '#8a5a3a';
          for (let j = 0; j < 7; j++) for (let i = 0; i < 6; i++) if ((i * 7 + j * 3) % 5) { c.beginPath(); c.moveTo(-60 + i * 22, -78 + j * 26); c.lineTo(-52 + i * 22, -72 + j * 26); c.lineTo(-60 + i * 22, -66 + j * 26); c.fill(); } c.restore(); } },
    over: [(c, lt, u, Sh) => K.card(c, '4,000 YEARS', lt, { at: Sh.tY, x: 960, y: 900, px: 80 }), (c, lt, u, Sh) => K.card(c, 'NOT EVEN IN JANUARY', lt, { at: Sh.tC, x: 960, y: 1000, px: 46, rot: -2 })],
    sfx: [[.1, 'clock_loop', .25], [.4, 'rewind', .5], [1.6, 'rewind', .5], ['four', 'whoosh', .4], ['january', 'thud', .6]] },

  // 0.04 TITLE: Janus bust on a pile of calendar pages and streamers; title bounces in
  { set: 'ny_janus', cam: (lt) => ({ z: [lerp(1.5, 1.65, E.io(seg(lt, 0, 4.8)))], x: [640], y: [lerp(390, 380, seg(lt, 0, 4.8))] }), bed: [['wind_loop', .2]],
    draw: (c, lt) => { SUN(lt); const g = seg(lt, 0, 4.8);
      S.nyJanus(c, 640, 512, 1.35, { mL: Math.sin(lt * 2) * .3, mR: .6 + .4 * Math.sin(lt * 2.4), blinkL: lt % 2.8 < .15, blinkR: (lt + 1.2) % 3.1 < .15 });
      for (let k = 0; k < 14; k++) { const r = S.rng(900 + k); nyPage(c, 560 + r() * 160, 600 + r() * 10, .5, (r() - .5) * 1.4, ['1', '31', '25', '1', '14'][k % 5], 1); }
      ['#ff5060', '#ffd040', '#60c0ff'].forEach((col, k) => { c.strokeStyle = col; c.lineWidth = 4; c.beginPath(); for (let x = 470; x < 820; x += 8) c.lineTo(x, 604 - k * 6 + Math.sin(x * .05 + lt * 3 + k) * 5); c.stroke(); });
      nyConfetti(c, lt, seg(lt, 1.1, 1.6), 50, 9, 1.1); },
    over: [(c, lt) => { const q = seg(lt, 1.1, 1.45); if (q <= 0) return; const s = q < 1 ? lerp(1.5, 1, E.out(q)) * (1 + .06 * Math.sin(q * 10)) : 1;
      c.save(); c.globalAlpha = q; c.fillStyle = 'rgba(10,6,20,.55)'; c.fillRect(0, 780, 1920, 270); c.translate(960, 920); c.scale(s, s); c.font = '110px Anton'; c.textAlign = 'center'; c.fillStyle = '#f4ead4'; c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 24;
      c.fillText('WHY NEW YEAR IS ON', 0, -20); c.fillStyle = '#ffd040'; c.fillText('JANUARY 1st', 0, 100); c.restore(); }],
    sfx: [[.2, 'wind_loop', .2], [.3, 'swell', .4], [1.1, 'party_horn', .6], [1.15, 'hit', .5], [1.3, 'cheer', .3]] },
];
VP.build(); K.boot();
</script></body></html>
