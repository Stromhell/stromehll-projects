// Detail pass (6 Nov QA): extra painted layers on the most-used Mongols sets so none of them reads flat or blocky.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2, MX = S.MGX;
  const wrap = (name, extra) => { const s = VP.sets[name]; if (!s) return; const fn = s.fn; s.fn = (g, w, h) => { fn(g, w, h); extra(g, w, h); }; };
  const rock = (g, x, y, rw, rh, base, seed) => { const r = S.rng(seed); g.fillStyle = S.rgba('#000000', .18); g.beginPath(); g.ellipse(x + rw * .2, y + rh * .35, rw * 1.05, rh * .35, 0, 0, TAU); g.fill();
    g.fillStyle = base; g.beginPath(); g.moveTo(x - rw, y + rh * .3); g.quadraticCurveTo(x - rw * (.9 + r() * .2), y - rh * .7, x - rw * .2, y - rh); g.quadraticCurveTo(x + rw * (.7 + r() * .3), y - rh * .9, x + rw, y + rh * .3); g.closePath(); g.fill();
    g.fillStyle = S.rgba('#ffffff', .22); g.beginPath(); g.moveTo(x - rw * .7, y - rh * .3); g.quadraticCurveTo(x - rw * .5, y - rh * .85, x - rw * .1, y - rh * .9); g.quadraticCurveTo(x - rw * .3, y - rh * .5, x - rw * .7, y - rh * .3); g.fill();
    g.fillStyle = S.rgba('#000000', .16); g.beginPath(); g.moveTo(x + rw * .2, y - rh * .7); g.quadraticCurveTo(x + rw * .8, y - rh * .6, x + rw, y + rh * .3); g.lineTo(x + rw * .1, y + rh * .3); g.fill(); };
  const cypress = (g, x, y, s) => { g.fillStyle = '#2e4224'; g.beginPath(); g.moveTo(x, y - 70 * s); g.quadraticCurveTo(x + 13 * s, y - 30 * s, x + 8 * s, y); g.lineTo(x - 8 * s, y); g.quadraticCurveTo(x - 13 * s, y - 30 * s, x, y - 70 * s); g.fill(); g.fillStyle = S.rgba('#8aa060', .35); g.beginPath(); g.moveTo(x, y - 66 * s); g.quadraticCurveTo(x - 10 * s, y - 30 * s, x - 6 * s, y - 4 * s); g.lineTo(x - 2 * s, y - 4 * s); g.quadraticCurveTo(x - 4 * s, y - 34 * s, x, y - 66 * s); g.fill(); };
  const house = (g, x, y, s, col) => { g.fillStyle = col; g.fillRect(x - 14 * s, y - 16 * s, 28 * s, 16 * s); g.fillStyle = S.mix(col, '#000000', .25); g.fillRect(x + 6 * s, y - 16 * s, 8 * s, 16 * s); g.fillStyle = S.mix(col, '#ffffff', .2); g.fillRect(x - 15 * s, y - 18 * s, 30 * s, 3 * s); g.fillStyle = '#4a3a2a'; g.fillRect(x - 6 * s, y - 9 * s, 4 * s, 9 * s); };
  const flowers = (g, x, y, w, hh, cols, n, seed) => { const r = S.rng(seed); for (let k = 0; k < n; k++) { const fx = x + r() * w, fy = y + r() * hh, s = 2 + (fy - y) / hh * 4; g.strokeStyle = '#4a6a2a'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx + (r() - .5) * 4, fy + s * 3); g.stroke(); g.fillStyle = cols[k % cols.length]; g.beginPath(); g.arc(fx, fy, s, 0, TAU); g.fill(); g.fillStyle = '#3a2a10'; g.beginPath(); g.arc(fx, fy, s * .35, 0, TAU); g.fill(); } };
  const tufts = (g, y0, w, seed) => S.strokes(g, { x: 0, y: y0, w, h: 720 - y0, n: 260, cols: ['#4a6a2a', '#6a8a3a', '#9ab85a', '#c8c878'], l0: 26, l1: 70, ang: -Math.PI / 2, jit: .35, w0: 2, w1: 4, a0: .55, a1: .95, seed });

  wrap('mg_ainjalut', (g, w, h) => {
    // terraces and rock outcrops on Mount Gilboa, olive groves and cypress on its slope, a hamlet on the left hills
    g.save(); g.beginPath(); g.moveTo(620, 420); g.quadraticCurveTo(860, 230, 1040, 220); g.quadraticCurveTo(1180, 215, 1280, 260); g.lineTo(1280, 460); g.clip();
    g.strokeStyle = S.rgba('#5a5a3a', .35); g.lineWidth = 2; for (let k = 0; k < 7; k++) { g.beginPath(); g.moveTo(700 + k * 30, 420 - k * 22); g.quadraticCurveTo(980, 300 - k * 14, 1280, 330 - k * 12); g.stroke(); }
    const r = S.rng(5801); for (let k = 0; k < 26; k++) { const x = 760 + r() * 520, y = 270 + r() * 170; if (y < 230 + (1280 - x) * .02) continue; rock(g, x, y, 10 + r() * 16, 7 + r() * 9, S.mix('#a89a7a', '#7a705a', r()), 5810 + k); }
    for (let k = 0; k < 14; k++) MX.olive(g, 790 + k * 34 + (k % 3) * 8, 410 - k * 9 + (k % 2) * 14, .45 + (k % 3) * .06, 5840 + k);
    g.restore();
    [[60, 352], [96, 348], [130, 356], [170, 350], [210, 360], [250, 366]].forEach(([x, y], k) => house(g, x, y, .9 + (k % 2) * .2, k % 2 ? '#d8c8a0' : '#e4d6b4'));
    [[300, 380], [330, 384], [560, 428], [590, 432], [1000, 444], [1040, 448]].forEach(([x, y], k) => cypress(g, x, y, .7 + (k % 2) * .25));
    // valley floor: worn path, wildflowers, foreground boulders and tall grass framing the bottom corners
    g.fillStyle = S.rgba('#b8a070', .45); g.beginPath(); g.moveTo(560, 450); g.quadraticCurveTo(820, 540, 780, 720); g.lineTo(900, 720); g.quadraticCurveTo(900, 540, 600, 450); g.fill();
    flowers(g, 0, 470, w, 220, ['#d83a2a', '#e8d870', '#f4f0e8', '#c87ab0'], 120, 5870);
    rock(g, 1180, 690, 90, 46, '#9a8e72', 5880); rock(g, 1060, 704, 50, 26, '#8a7e64', 5881); rock(g, 40, 700, 70, 34, '#9a8e72', 5882);
    tufts(g, 640, w, 5890);
    const lg = g.createRadialGradient(180, 60, 40, 180, 60, 900); lg.addColorStop(0, S.rgba('#fff0c0', .22)); lg.addColorStop(1, S.rgba('#fff0c0', 0)); g.fillStyle = lg; g.fillRect(0, 0, w, h); });

  wrap('mg_bab', (g, w, h) => {
    // carved band and inscription strip over the arch, hanging lamps, shadows under the merlons, palms and a minaret behind the wall
    g.fillStyle = '#9a7a52'; g.fillRect(470, 176, 340, 22); g.fillStyle = '#e8d0a0'; for (let k = 0; k < 17; k++) { g.beginPath(); g.moveTo(474 + k * 20, 196); g.lineTo(484 + k * 20, 180); g.lineTo(494 + k * 20, 196); g.fill(); }
    g.fillStyle = S.rgba('#3a2a1a', .5); g.fillRect(560, 206, 160, 4);
    [[470, 160], [810, 160]].forEach(([x, y]) => { g.fillStyle = S.rgba('#000000', .2); g.fillRect(x - 2, y, 4, 440); });
    g.fillStyle = S.rgba('#000000', .14); g.fillRect(0, 160, w, 14); g.fillRect(250, 120, 220, 12); g.fillRect(810, 120, 220, 12);
    [[505, 260], [775, 260]].forEach(([x, y]) => { g.strokeStyle = '#3a2a1a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 40); g.lineTo(x, y); g.stroke(); g.fillStyle = '#8a6a2a'; g.beginPath(); g.moveTo(x - 10, y); g.lineTo(x + 10, y); g.lineTo(x + 6, y + 22); g.lineTo(x - 6, y + 22); g.fill(); g.fillStyle = S.rgba('#ffd890', .8); g.fillRect(x - 5, y + 4, 10, 14); const lg = g.createRadialGradient(x, y + 10, 2, x, y + 10, 60); lg.addColorStop(0, S.rgba('#ffd890', .35)); lg.addColorStop(1, S.rgba('#ffd890', 0)); g.fillStyle = lg; g.fillRect(x - 60, y - 50, 120, 120); });
    // banners hung on the towers
    [[300, 200, '#c8402a'], [420, 200, '#e8b830'], [860, 200, '#e8b830'], [980, 200, '#c8402a']].forEach(([x, y, col]) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - 18, y); g.lineTo(x + 18, y); g.lineTo(x + 18, y + 110); g.lineTo(x, y + 96); g.lineTo(x - 18, y + 110); g.fill(); g.fillStyle = S.rgba('#000000', .18); g.fillRect(x + 6, y, 12, 104); g.fillStyle = '#5a3a1a'; g.fillRect(x - 24, y - 4, 48, 6); });
    // street life at the wall foot: baskets, jars, a cloth awning
    [[90, 600], [140, 604], [1150, 600], [1205, 604]].forEach(([x, y], k) => { g.fillStyle = S.rgba('#000000', .2); g.beginPath(); g.ellipse(x + 4, y + 2, 22, 6, 0, 0, TAU); g.fill(); g.fillStyle = k % 2 ? '#8a5a3a' : '#b8844a'; g.beginPath(); g.moveTo(x - 18, y); g.quadraticCurveTo(x - 22, y - 34, x - 8, y - 42); g.lineTo(x + 8, y - 42); g.quadraticCurveTo(x + 22, y - 34, x + 18, y); g.fill(); g.fillStyle = S.rgba('#ffffff', .15); g.fillRect(x - 12, y - 34, 6, 26); });
    g.fillStyle = '#a8402a'; g.beginPath(); g.moveTo(40, 470); g.lineTo(220, 470); g.lineTo(240, 520); g.lineTo(20, 520); g.fill(); g.fillStyle = '#e8d0a0'; for (let k = 0; k < 6; k++) g.fillRect(40 + k * 34, 470, 14, 50); g.strokeStyle = '#4a3020'; g.lineWidth = 5; [30, 230].forEach(x => { g.beginPath(); g.moveTo(x, 520); g.lineTo(x, 600); g.stroke(); });
    S.dabs(g, { x: 0, y: 610, w, h: 110, n: 140, cols: ['#7a5a3a', '#d8c098'], r0: 2, r1: 6, a0: .3, a1: .6, seed: 5960 });
    const lg = g.createLinearGradient(0, 0, w, 0); lg.addColorStop(0, S.rgba('#ffd8a0', .16)); lg.addColorStop(.6, S.rgba('#ffd8a0', 0)); lg.addColorStop(1, S.rgba('#3a2a4a', .14)); g.fillStyle = lg; g.fillRect(0, 0, w, h); });

  wrap('mg_alley', (g, w, h) => {
    // after the sack: soot above doors and windows, torn awnings, broken pots, scattered cloth and rubble, smoke haze
    [[120, 360], [280, 380], [1000, 360], [1150, 380], [60, 160], [300, 180], [980, 160], [1180, 190]].forEach(([x, y]) => { const sg = g.createLinearGradient(0, y - 120, 0, y + 10); sg.addColorStop(0, S.rgba('#1a1410', 0)); sg.addColorStop(1, S.rgba('#1a1410', .45)); g.fillStyle = sg; g.beginPath(); g.moveTo(x - 40, y); g.quadraticCurveTo(x - 50, y - 70, x - 10, y - 120); g.quadraticCurveTo(x + 30, y - 80, x + 46, y); g.fill(); });
    [[210, 300, '#7a3a2a'], [1070, 300, '#3a5a6a']].forEach(([x, y, col]) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - 80, y); g.lineTo(x + 80, y); g.lineTo(x + 70, y + 30); g.lineTo(x + 40, y + 60); g.lineTo(x + 20, y + 34); g.lineTo(x - 20, y + 70); g.lineTo(x - 40, y + 30); g.lineTo(x - 80, y + 36); g.fill(); g.strokeStyle = '#3a2a1a'; g.lineWidth = 4; g.beginPath(); g.moveTo(x - 84, y); g.lineTo(x + 84, y); g.stroke(); });
    const r = S.rng(5990); for (let k = 0; k < 18; k++) { const x = 60 + r() * 1160, y = 630 + r() * 80; if (x > 520 && x < 760 && y < 650) continue; const kind = k % 3;
      if (kind === 0) { g.fillStyle = '#a8603a'; g.beginPath(); g.arc(x, y, 10 + r() * 8, Math.PI, TAU); g.fill(); g.fillStyle = S.rgba('#000000', .2); g.fillRect(x - 12, y, 24, 3); }
      else if (kind === 1) { g.fillStyle = ['#c8402a', '#3a6a8a', '#e8d0a0'][k % 3]; g.beginPath(); g.moveTo(x - 24, y); g.quadraticCurveTo(x, y - 10, x + 26, y + 2); g.lineTo(x + 18, y + 8); g.quadraticCurveTo(x, y + 2, x - 20, y + 8); g.fill(); }
      else { for (let j = 0; j < 4; j++) { g.fillStyle = S.mix('#9a8060', '#c8b088', r()); g.fillRect(x + (r() - .5) * 30, y - r() * 10, 10 + r() * 10, 6 + r() * 6); } } }
    const hz = g.createLinearGradient(0, 200, 0, 720); hz.addColorStop(0, S.rgba('#6a5a4a', .25)); hz.addColorStop(1, S.rgba('#6a5a4a', 0)); g.fillStyle = hz; g.fillRect(0, 0, w, h); });
  // a loose flock of birds crossing the sky (ambient motion for empty landscape shots)
  S.mgBirds = (c, lt, x0, y0, n = 7, dir = 1, sp = 40) => { c.save(); c.strokeStyle = S.rgba('#2a2a2a', .75); c.lineCap = 'round'; for (let k = 0; k < n; k++) { const r = S.rng(900 + k), x = x0 + dir * (lt * sp * (0.9 + r() * .2)) + (r() - .5) * 160, y = y0 + (r() - .5) * 70 + Math.sin(lt * 1.5 + k) * 6, s = 5 + r() * 4, f = Math.sin(lt * 9 + k * 2) * .6;
    c.lineWidth = 1.8; c.beginPath(); c.moveTo(x - s, y - s * f); c.quadraticCurveTo(x - s * .4, y - s * .2, x, y); c.quadraticCurveTo(x + s * .4, y - s * .2, x + s, y - s * f); c.stroke(); } c.restore(); };
  // wind ripples across tall grass: soft light streaks drifting sideways
  S.mgWind = (c, lt, y0, y1, a = .12) => { c.save(); for (let k = 0; k < 5; k++) { const x = ((lt * 120 + k * 330) % 1700) - 200, y = y0 + (y1 - y0) * ((k * .37) % 1); const g = c.createRadialGradient(x, y, 10, x, y, 180); g.addColorStop(0, S.rgba('#f8f0c8', a)); g.addColorStop(1, S.rgba('#f8f0c8', 0)); c.fillStyle = g; c.beginPath(); c.ellipse(x, y, 220, 40, 0, 0, TAU); c.fill(); } c.restore(); };
})(window);
