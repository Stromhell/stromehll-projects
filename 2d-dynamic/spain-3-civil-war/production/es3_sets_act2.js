// Spain 3 sets for act 2 (the Republic, 1931-1936): a ministry office, a Madrid street, the Asturias valley, a parish church.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill, wood } = X;
  // ======================== A MINISTRY OFFICE, 1931 ========================
  VP.set('office', 1280, 720, (g, w, h) => {
    // green damask wall
    g.fillStyle = '#4a5a44'; g.fillRect(0, 0, w, 520);
    S.dabs(g, { x: 0, y: 0, w, h: 520, n: 500, cols: ['#5a6a50', '#3a4a34'], r0: 6, r1: 22, a0: .15, a1: .3, seed: 601 });
    for (let x = 0; x < w; x += 80) for (let y = 30; y < 500; y += 90) { g.fillStyle = S.rgba('#c8d0a0', .08); g.beginPath(); g.ellipse(x + 40 + (y % 180 ? 40 : 0), y, 14, 22, 0, 0, TAU); g.fill(); }
    // dado rail and wood panelling below
    wood(g, 0, 400, w, 120, '#5a3420', 603); g.fillStyle = '#3a2214'; g.fillRect(0, 396, w, 8);
    // tall window, right, with heavy curtains
    g.fillStyle = '#c8d8e0'; g.fillRect(900, 60, 220, 330); const wg = g.createLinearGradient(900, 60, 1120, 390); wg.addColorStop(0, '#e8f0f4'); wg.addColorStop(1, '#a8b8c4'); g.fillStyle = wg; g.fillRect(906, 66, 208, 318);
    g.fillStyle = '#d8c8a8'; g.fillRect(906, 250, 208, 134); for (let i = 0; i < 8; i++) { g.fillStyle = '#b8a888'; g.fillRect(910 + i * 26, 280 - (i % 3) * 18, 20, 104 + (i % 3) * 18); }
    g.strokeStyle = '#3a2a1a'; g.lineWidth = 8; g.strokeRect(900, 60, 220, 330); g.lineWidth = 5; g.beginPath(); g.moveTo(1010, 60); g.lineTo(1010, 390); g.moveTo(900, 220); g.lineTo(1120, 220); g.stroke();
    for (const [x0, dir] of [[860, 1], [1120, -1]]) { g.fillStyle = '#7a2a24'; g.beginPath(); g.moveTo(x0, 40); g.lineTo(x0 + 70 * dir, 40); g.quadraticCurveTo(x0 + 30 * dir, 220, x0 + 60 * dir, 400); g.lineTo(x0, 400); g.fill(); S.strokes(g, { x: Math.min(x0, x0 + 70 * dir), y: 40, w: 70, h: 360, n: 60, cols: ['#9a3a30', '#4a1410'], l0: 40, l1: 120, ang: Math.PI / 2, jit: .05, w0: 2, w1: 5, a0: .2, a1: .45, seed: 605 + x0 }); }
    // bookcase, left
    wood(g, 60, 80, 300, 330, '#4a2a18', 607);
    for (let r = 0; r < 4; r++) { g.fillStyle = '#2a160c'; g.fillRect(70, 100 + r * 78, 280, 64); for (let i = 0; i < 22; i++) { const rr = S.rng(i + r * 40 + 609), bw = 8 + rr() * 6, bh = 44 + rr() * 18; g.fillStyle = ['#7a2a24', '#2a4a6a', '#3a5a2a', '#8a6a2a', '#5a3a5a'][Math.floor(rr() * 5)]; g.fillRect(74 + i * 12.6, 164 + r * 78 - bh, bw, bh); g.fillStyle = S.rgba('#ffe0a0', .3); g.fillRect(74 + i * 12.6, 164 + r * 78 - bh + 8, bw, 2); } }
    // tricolour flag on a stand and a framed portrait
    g.strokeStyle = '#2a1a0a'; g.lineWidth = 5; g.beginPath(); g.moveTo(780, 80); g.lineTo(780, 400); g.stroke();
    for (let b = 0; b < 3; b++) { g.fillStyle = ['#b8202a', '#e8b820', '#6a2a7a'][b]; g.beginPath(); g.moveTo(782, 90 + b * 30); g.quadraticCurveTo(820, 100 + b * 30, 830, 140 + b * 40); g.lineTo(830, 170 + b * 40); g.quadraticCurveTo(820, 130 + b * 30, 782, 120 + b * 30); g.fill(); }
    g.fillStyle = '#8a6a2a'; g.fillRect(500, 100, 160, 200); g.fillStyle = '#3a3428'; g.fillRect(512, 112, 136, 176); g.fillStyle = '#c8a888'; g.beginPath(); g.arc(580, 180, 34, 0, TAU); g.fill(); g.fillStyle = '#2a2a2a'; g.fillRect(540, 214, 80, 74);
    // parquet floor
    g.fillStyle = '#6a4024'; g.fillRect(0, 520, w, 200);
    for (let y = 520; y < h; y += 20) for (let x = (y / 20 % 2) * 30; x < w; x += 60) { g.fillStyle = S.mix('#7a4a2a', '#5a3018', S.rng(x * 7 + y)()); g.fillRect(x, y, 58, 18); }
    const sh = g.createLinearGradient(0, 520, 0, h); sh.addColorStop(0, 'rgba(0,0,0,.35)'); sh.addColorStop(.3, 'rgba(0,0,0,0)'); g.fillStyle = sh; g.fillRect(0, 520, w, 200);
  });
  // ======================== A MADRID STREET ========================
  VP.set('mstreet', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a8ab8'], [.3, '#c8c8c8']]);
    // distant rooftops and a dome over the gap
    g.fillStyle = '#9aa0a8'; g.fillRect(560, 70, 120, 60); g.beginPath(); g.ellipse(620, 70, 46, 40, 0, Math.PI, TAU); g.fill(); g.fillRect(614, 18, 12, 18);
    // apartment blocks: stone texture, cornices, string courses, framed windows with shutters, iron balconies
    const blocks = [[0, 80, 300, '#c8a888', 4], [300, 40, 340, '#d8c0a0', 4], [640, 100, 280, '#b8987a', 3], [920, 60, 360, '#d0b090', 4]];
    for (const [x, y, bw, col, nw] of blocks) {
      const bg = g.createLinearGradient(x, 0, x + bw, 0); bg.addColorStop(0, S.mix(col, '#ffffff', .08)); bg.addColorStop(1, S.mix(col, '#000000', .12)); g.fillStyle = bg; g.fillRect(x, y, bw, 520 - y);
      S.dabs(g, { x, y, w: bw, h: 520 - y, n: 220, cols: [S.mix(col, '#ffffff', .15), S.mix(col, '#000000', .15), S.mix(col, '#806040', .2)], r0: 4, r1: 16, a0: .08, a1: .22, seed: x + 611 });
      g.strokeStyle = S.rgba(S.mix(col, '#000000', .35), .25); g.lineWidth = 1; for (let yy = y + 20; yy < 420; yy += 14) { g.beginPath(); g.moveTo(x, yy); g.lineTo(x + bw, yy); g.stroke(); }
      // cornice with dentils and its shadow
      g.fillStyle = S.mix(col, '#ffffff', .2); g.fillRect(x - 4, y - 6, bw + 8, 14); g.fillStyle = S.mix(col, '#000000', .25); for (let d = x; d < x + bw; d += 12) g.fillRect(d, y + 8, 7, 7);
      g.fillStyle = S.rgba('#000000', .22); g.fillRect(x, y + 15, bw, 10);
      g.fillStyle = S.mix(col, '#000000', .15); g.fillRect(x + bw - 8, y, 8, 520 - y); // building edge shade
      const gap = bw / nw;
      for (let r = 0; y + 40 + r * 100 < 400; r++) {
        const wy = y + 44 + r * 100; g.fillStyle = S.mix(col, '#ffffff', .18); g.fillRect(x, wy + 82, bw, 5); // string course
        for (let i = 0; i < nw; i++) {
          const wx = x + gap * i + gap / 2 - 20;
          g.fillStyle = S.mix(col, '#ffffff', .25); g.fillRect(wx - 7, wy - 8, 54, 80); g.fillStyle = S.mix(col, '#000000', .2); g.beginPath(); g.moveTo(wx - 10, wy - 8); g.lineTo(wx + 20, wy - 22); g.lineTo(wx + 50, wy - 8); g.fill();
          const gl = g.createLinearGradient(wx, wy, wx + 40, wy + 64); gl.addColorStop(0, '#5a6a78'); gl.addColorStop(.5, '#2a3440'); gl.addColorStop(1, '#3a4450'); g.fillStyle = gl; g.fillRect(wx, wy, 40, 64);
          g.fillStyle = S.rgba('#ffffff', .18); g.beginPath(); g.moveTo(wx + 4, wy + 4); g.lineTo(wx + 16, wy + 4); g.lineTo(wx + 4, wy + 30); g.fill();
          g.strokeStyle = '#e8e0d0'; g.lineWidth = 2; g.beginPath(); g.moveTo(wx + 20, wy); g.lineTo(wx + 20, wy + 64); g.moveTo(wx, wy + 24); g.lineTo(wx + 40, wy + 24); g.stroke();
          const shc = ['#3a5a44', '#5a3a2a', '#3a4a6a'][(i + r) % 3];
          for (const sx of [wx - 18, wx + 42]) { g.fillStyle = shc; g.fillRect(sx, wy, 16, 64); g.fillStyle = S.mix(shc, '#000000', .35); for (let k = 0; k < 9; k++) g.fillRect(sx + 2, wy + 4 + k * 7, 12, 2); }
          // balcony slab + shadow + iron railing
          g.fillStyle = S.mix(col, '#ffffff', .1); g.fillRect(wx - 12, wy + 62, 64, 6); g.fillStyle = S.rgba('#000000', .25); g.fillRect(wx - 10, wy + 68, 60, 6);
          g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; g.strokeRect(wx - 10, wy + 46, 60, 16); g.lineWidth = 1.3;
          for (let k = 0; k < 7; k++) { const bx = wx - 6 + k * 8.5; g.beginPath(); g.moveTo(bx, wy + 46); g.bezierCurveTo(bx + 4, wy + 50, bx - 4, wy + 58, bx, wy + 62); g.stroke(); }
          if ((i * 7 + r * 3 + x) % 5 === 0) { g.fillStyle = '#8a4a2a'; g.fillRect(wx + 30, wy + 38, 12, 9); S.dabs(g, { x: wx + 26, y: wy + 28, w: 20, h: 12, n: 14, cols: ['#3a7a3a', '#c83a4a'], r0: 2, r1: 5, a0: .7, a1: 1, seed: wx + wy }); }
        }
      }
      // drainpipe
      g.fillStyle = '#4a4440'; g.fillRect(x + bw - 18, y + 20, 5, 500 - y); for (let yy = y + 60; yy < 520; yy += 90) g.fillRect(x + bw - 21, yy, 11, 4);
    }
    // ground floor shop fronts: awnings, painted signs, lit windows with goods
    const shops = ['FARMACIA', 'CAFÉ', 'ULTRAMARINOS', 'LIBRERÍA', 'SASTRERÍA', 'PANADERÍA'];
    for (let i = 0; i < 6; i++) {
      const x = 22 + i * 210; g.fillStyle = '#2a2018'; g.fillRect(x, 430, 150, 90); wood(g, x, 430, 150, 90, '#4a2e1c', 640 + i);
      const sw = g.createLinearGradient(0, 446, 0, 500); sw.addColorStop(0, '#d8c8a0'); sw.addColorStop(1, '#8a7a5a'); g.fillStyle = sw; g.fillRect(x + 8, 446, 86, 54);
      for (let k = 0; k < 5; k++) { g.fillStyle = ['#b83a2a', '#e8c040', '#5a7a3a', '#f0e8d8', '#7a4a2a'][(k + i) % 5]; g.fillRect(x + 12 + k * 16, 480 - (k % 2) * 8, 12, 16 + (k % 2) * 8); }
      g.strokeStyle = '#2a1a10'; g.lineWidth = 3; g.strokeRect(x + 8, 446, 86, 54); g.beginPath(); g.moveTo(x + 51, 446); g.lineTo(x + 51, 500); g.stroke();
      g.fillStyle = '#1a120c'; g.fillRect(x + 104, 446, 38, 74); g.fillStyle = '#c8a040'; g.beginPath(); g.arc(x + 136, 484, 2.5, 0, TAU); g.fill();
      g.fillStyle = '#1a1410'; g.fillRect(x - 4, 404, 158, 22); g.fillStyle = '#e8c870'; g.font = 'bold 13px Georgia'; g.textAlign = 'center'; g.fillText(shops[i], x + 75, 420);
      const ac = ['#a82a24', '#2a5a4a', '#c88a2a'][i % 3];
      for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? '#f0e8d8' : ac; g.beginPath(); g.moveTo(x - 6 + k * 20.5, 426); g.lineTo(x + 14.5 + k * 20.5, 426); g.lineTo(x + 18 + k * 21, 446); g.lineTo(x - 2 + k * 21, 446); g.fill(); }
      for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? '#f0e8d8' : ac; g.beginPath(); g.arc(x + 8 + k * 21, 446, 10.5, 0, Math.PI); g.fill(); }
      g.fillStyle = S.rgba('#000000', .3); g.fillRect(x - 2, 456, 154, 8);
    }
    // posters pasted on the walls, a little torn
    for (const [x, y, c1, tx] of [[175, 340, '#d8b048', 'TEATRO'], [455, 330, '#2a5a7a', 'CINE'], [745, 350, '#b8402a', 'CORRIDA'], [1080, 336, '#e8d8b0', 'ANÍS']]) { g.save(); g.translate(x + 30, y + 40); g.rotate((x % 7 - 3) * .01); g.fillStyle = c1; g.fillRect(-30, -40, 60, 80); g.fillStyle = S.rgba('#ffffff', .85); g.font = 'bold 12px Georgia'; g.textAlign = 'center'; g.fillText(tx, 0, -18); g.fillRect(-20, 12, 40, 4); g.fillRect(-16, 20, 32, 3); g.fillStyle = S.rgba('#000000', .15); g.beginPath(); g.moveTo(18, 40); g.lineTo(30, 26); g.lineTo(30, 40); g.fill(); g.restore(); }
    // overhead tram and telephone wires
    g.strokeStyle = S.rgba('#1a1a1a', .55); g.lineWidth = 1.2; for (const [y0, y1] of [[150, 175], [190, 200]]) { g.beginPath(); g.moveTo(0, y0); g.quadraticCurveTo(640, y1 + 30, w, y0); g.stroke(); }
    // pavement with kerbstones, cobbled road with tram rails
    g.fillStyle = '#a8a098'; g.fillRect(0, 520, w, 40); for (let x = 0; x < w; x += 46) { g.strokeStyle = S.rgba('#6a6460', .5); g.lineWidth = 1; g.strokeRect(x, 520, 46, 36); }
    g.fillStyle = S.rgba('#000000', .25); g.fillRect(0, 520, w, 6); g.fillStyle = '#8a847c'; g.fillRect(0, 552, w, 10); g.fillStyle = '#5a5450'; g.fillRect(0, 560, w, 3);
    g.fillStyle = '#6a645c'; g.fillRect(0, 562, w, h - 562);
    for (let y = 566; y < h; y += 12 + (y - 566) * .04) { const sz = 8 + (y - 566) * .05; for (let x = ((y | 0) % 24) / 2; x < w; x += sz * 2.1) { const rr = S.rng(x * 3 + y * 11); g.fillStyle = S.mix('#8a847c', '#4a4440', rr()); g.beginPath(); g.ellipse(x, y, sz, sz * .55, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#ffffff', .08); g.beginPath(); g.ellipse(x - sz * .2, y - sz * .2, sz * .5, sz * .25, 0, 0, TAU); g.fill(); } }
    for (const ry of [620, 640, 676, 700]) { g.fillStyle = '#9a948a'; g.fillRect(0, ry, w, 3); g.fillStyle = '#3a3430'; g.fillRect(0, ry + 3, w, 2); }
    // ornate street lamps
    for (const x of [150, 640, 1130]) { g.fillStyle = '#1a1a1a'; g.fillRect(x - 10, 528, 20, 12); g.fillRect(x - 4, 380, 8, 150); g.fillRect(x - 7, 450, 14, 6); g.beginPath(); g.moveTo(x - 4, 380); g.quadraticCurveTo(x - 20, 372, x - 14, 362); g.moveTo(x + 4, 380); g.quadraticCurveTo(x + 20, 372, x + 14, 362); g.lineWidth = 2; g.strokeStyle = '#1a1a1a'; g.stroke(); g.fillRect(x - 12, 372, 24, 8); g.fillStyle = '#f0e0b0'; g.fillRect(x - 9, 348, 18, 26); g.strokeStyle = '#1a1a1a'; g.lineWidth = 2; g.strokeRect(x - 9, 348, 18, 26); g.fillStyle = '#1a1a1a'; g.beginPath(); g.moveTo(x - 15, 348); g.lineTo(x, 334); g.lineTo(x + 15, 348); g.fill(); g.fillRect(x - 2, 326, 4, 10); }
    // street-level shadow band
    const ao = g.createLinearGradient(0, 470, 0, 530); ao.addColorStop(0, 'rgba(0,0,0,0)'); ao.addColorStop(1, 'rgba(0,0,0,.18)'); g.fillStyle = ao; g.fillRect(0, 470, w, 60);
  });
  // ======================== THE ASTURIAS VALLEY ========================
  VP.set('asturias', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8aa8c8'], [.45, '#d8e0e0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 200, n: 120, cols: ['#ffffff', '#c8d0d8', '#e8ecf0'], r0: 30, r1: 90, sq: .4, a0: .2, a1: .5, seed: 621 });
    // Picos: far grey limestone peaks with snow, rock strokes and haze
    const pk = x => 230 - 130 * S.fbm(x / 140, 631) - 40 * Math.abs(Math.sin(x / 90));
    g.fillStyle = '#8a96a6'; g.beginPath(); g.moveTo(0, 420); for (let x = 0; x <= w; x += 6) g.lineTo(x, pk(x)); g.lineTo(w, 420); g.fill();
    S.strokes(g, { x: 0, y: 100, w, h: 260, n: 900, cols: ['#a8b2c0', '#6a7686', '#c8d0da'], l0: 8, l1: 30, ang: 1.1, jit: .5, w0: 1, w1: 2.5, a0: .2, a1: .45, seed: 633, mask: (px, py) => py > pk(px) + 4 });
    S.dabs(g, { x: 0, y: 80, w, h: 120, n: 260, cols: ['#ffffff', '#e8eef4'], r0: 4, r1: 12, a0: .5, a1: .9, seed: 635, mask: (px, py) => py > pk(px) + 2 && py < pk(px) + 26 });
    const hz = g.createLinearGradient(0, 200, 0, 360); hz.addColorStop(0, 'rgba(216,224,232,0)'); hz.addColorStop(1, 'rgba(216,224,232,.55)'); g.fillStyle = hz; g.fillRect(0, 200, w, 160);
    // mid hills: wooded slopes in patchwork
    const mh = x => 330 - 70 * S.fbm(x / 220, 637);
    g.fillStyle = '#4a7a3a'; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 6) g.lineTo(x, mh(x)); g.lineTo(w, h); g.fill();
    for (let i = 0; i < 26; i++) { const r = S.rng(i + 639), x = r() * w, y = mh(x) + 20 + r() * 70, pw = 60 + r() * 90; g.fillStyle = S.rgba(['#6a9a4a', '#8aaa5a', '#3a6a2a', '#a8a050'][i % 4], .55); g.beginPath(); g.moveTo(x, y); g.lineTo(x + pw, y - 10); g.lineTo(x + pw + 20, y + 22); g.lineTo(x + 10, y + 30); g.fill(); }
    S.dabs(g, { x: 0, y: 250, w, h: 170, n: 700, cols: ['#2a4a24', '#3a5a2a', '#4a6a34'], r0: 6, r1: 14, sq: .7, a0: .6, a1: .95, seed: 641, mask: (px, py) => py > mh(px) + 2 && (S.fbm(px / 80, 643) > .45 || py < mh(px) + 30) });
    // miners' terraces climbing the slope, with smoking chimneys
    X.town(g, { x: 40, y: 360, w: 460, h: 50, n: 26, seed: 645, scale: 1.3, wall: '#d8c8b0', wall2: '#b8a890', roof: '#8a4a32', roof2: '#6a3a2a', shade: '#3a2a20', rim: '#ffe8c0', dark: '#2a1e18' });
    for (const [sx, sy] of [[120, 360], [260, 372], [420, 366]]) S.dabs(g, { x: sx - 10, y: sy - 90, w: 40, h: 80, n: 18, cols: ['#e8e8e8', '#c8c8cc'], r0: 6, r1: 16, a0: .2, a1: .4, seed: sx });
    // spoil heap with streaks of coal and a conveyor
    g.fillStyle = '#34322e'; g.beginPath(); g.moveTo(900, 430); g.quadraticCurveTo(1000, 290, 1030, 286); g.quadraticCurveTo(1080, 300, 1180, 430); g.fill();
    S.strokes(g, { x: 900, y: 290, w: 280, h: 140, n: 260, cols: ['#4a4842', '#1e1c1a', '#5a5650'], l0: 8, l1: 26, ang: 1.0, jit: .9, w0: 1, w1: 3, a0: .3, a1: .7, seed: 647, mask: (px, py) => py > 300 + Math.abs(px - 1030) * 1.0 });
    g.strokeStyle = '#2a2018'; g.lineWidth = 4; g.beginPath(); g.moveTo(880, 400); g.lineTo(1024, 296); g.stroke(); g.lineWidth = 2; for (let k = 0; k < 7; k++) { const t = k / 6; g.beginPath(); g.moveTo(880 + 144 * t, 400 - 104 * t); g.lineTo(880 + 144 * t, 430); g.stroke(); }
    // engine house: brick with arched windows and a tall chimney trailing smoke
    g.fillStyle = '#8a4a32'; g.fillRect(830, 330, 110, 100); S.strokes(g, { x: 830, y: 330, w: 110, h: 100, n: 120, cols: ['#6a3422', '#a85a3a'], l0: 6, l1: 10, ang: 0, jit: .05, w0: 2, w1: 3, a0: .3, a1: .55, seed: 649 });
    g.fillStyle = '#5a2a1a'; g.beginPath(); g.moveTo(822, 332); g.lineTo(885, 300); g.lineTo(948, 332); g.fill();
    for (let k = 0; k < 3; k++) { const wx = 846 + k * 32; g.fillStyle = '#2a1a14'; g.fillRect(wx, 356, 18, 30); g.beginPath(); g.arc(wx + 9, 356, 9, Math.PI, TAU); g.fill(); g.fillStyle = S.rgba('#ffd890', .35); g.fillRect(wx + 2, 360, 6, 24); }
    g.fillStyle = '#7a3a28'; g.beginPath(); g.moveTo(920, 330); g.lineTo(926, 190); g.lineTo(944, 190); g.lineTo(950, 330); g.fill(); g.fillStyle = '#4a2214'; g.fillRect(922, 186, 26, 8); g.fillStyle = S.rgba('#000000', .25); g.fillRect(940, 190, 8, 140);
    S.dabs(g, { x: 900, y: 70, w: 240, h: 120, n: 60, cols: ['#d8d8d8', '#a8a8a8', '#c8c8c0'], r0: 10, r1: 30, a0: .2, a1: .45, seed: 651, mask: (px, py) => Math.abs(py - (180 - (px - 935) * .45)) < 18 + (px - 935) * .12 && px > 925 });
    // steel lattice headframe with its sheave wheel and cables
    const hf = (ax, ay, bx, by) => { g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke(); };
    g.strokeStyle = '#2a2420'; g.lineWidth = 5; hf(730, 430, 770, 220); hf(810, 430, 770, 220); hf(800, 430, 840, 300);
    g.lineWidth = 2; for (let k = 0; k < 6; k++) { const t0 = k / 6, t1 = (k + 1) / 6, l = (t) => [730 + 40 * t, 430 - 210 * t], r = (t) => [810 - 40 * t, 430 - 210 * t]; hf(...l(t0), ...r(t1)); hf(...r(t0), ...l(t1)); hf(...l(t1), ...r(t1)); }
    g.fillStyle = '#2a2420'; g.fillRect(756, 214, 28, 8);
    g.save(); g.translate(770, 208); g.strokeStyle = '#2a2420'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 22, 0, TAU); g.stroke(); g.lineWidth = 2; for (let k = 0; k < 8; k++) { const a = k / 8 * TAU; hf(0, 0, Math.cos(a) * 22, Math.sin(a) * 22); } g.fillStyle = '#5a5450'; g.beginPath(); g.arc(0, 0, 5, 0, TAU); g.fill(); g.restore();
    g.strokeStyle = S.rgba('#1a1a1a', .7); g.lineWidth = 1.2; hf(790, 204, 872, 340); hf(790, 212, 872, 346);
    // valley floor: meadow, a rail track with coal wagons, a dirt road, fence and an Asturian granary
    const fg = g.createLinearGradient(0, 420, 0, h); fg.addColorStop(0, '#5a8a3a'); fg.addColorStop(1, '#3a6a2a'); g.fillStyle = fg; g.fillRect(0, 425, w, h - 425);
    S.strokes(g, { x: 0, y: 430, w, h: 290, n: 2200, cols: ['#6a9a4a', '#3a5a2a', '#8aaa5a', '#4a7a34'], l0: 6, l1: 18, ang: -1.5, jit: .4, w0: 1, w1: 2.2, a0: .3, a1: .65, seed: 627 });
    S.dabs(g, { x: 0, y: 440, w, h: 260, n: 120, cols: ['#f0e8a0', '#ffffff', '#c8a8d8'], r0: 1.5, r1: 3, a0: .6, a1: .9, seed: 653 });
    g.fillStyle = '#6a5a4a'; g.fillRect(640, 446, 640, 6); g.strokeStyle = '#3a3430'; g.lineWidth = 2; hf(640, 446, 1280, 446); hf(640, 452, 1280, 452); for (let x = 644; x < w; x += 14) { g.fillStyle = '#4a3a2a'; g.fillRect(x, 444, 6, 10); }
    for (const wx of [1000, 1090, 1180]) { g.fillStyle = '#3a3430'; g.beginPath(); g.moveTo(wx, 412); g.lineTo(wx + 76, 412); g.lineTo(wx + 70, 440); g.lineTo(wx + 6, 440); g.fill(); g.fillStyle = '#1a1816'; g.beginPath(); g.ellipse(wx + 38, 412, 36, 8, 0, Math.PI, TAU); g.fill(); g.fillStyle = S.rgba('#ffffff', .12); g.fillRect(wx + 4, 416, 68, 3); for (const ox of [16, 60]) { g.fillStyle = '#1a1a1a'; g.beginPath(); g.arc(wx + ox, 442, 7, 0, TAU); g.fill(); g.fillStyle = '#6a6460'; g.beginPath(); g.arc(wx + ox, 442, 2.5, 0, TAU); g.fill(); } }
    // horreo: granary on stone stilts
    { const x = 140, y = 470; g.fillStyle = S.rgba('#000000', .25); g.beginPath(); g.ellipse(x + 50, y + 4, 70, 10, 0, 0, TAU); g.fill(); for (const px of [x + 4, x + 84]) { g.fillStyle = '#9a9488'; g.beginPath(); g.moveTo(px, y); g.lineTo(px + 4, y - 30); g.lineTo(px + 12, y - 30); g.lineTo(px + 16, y); g.fill(); g.fillStyle = '#c8c0b0'; g.fillRect(px - 2, y - 36, 20, 6); } wood(g, x - 6, y - 80, 112, 44, '#7a4a2a', 655); g.fillStyle = '#9a4a2a'; g.beginPath(); g.moveTo(x - 20, y - 78); g.lineTo(x + 50, y - 112); g.lineTo(x + 120, y - 78); g.fill(); S.strokes(g, { x: x - 18, y: y - 110, w: 136, h: 32, n: 40, cols: ['#7a3a22', '#b85a3a'], l0: 6, l1: 12, ang: .3, jit: .2, w0: 2, w1: 3, a0: .3, a1: .6, seed: 657 }); g.fillStyle = '#3a2214'; g.fillRect(x + 40, y - 74, 20, 34); }
    // dirt road with ruts and a stone wall/fence
    g.fillStyle = '#a8906a'; g.beginPath(); g.moveTo(0, 640); g.quadraticCurveTo(640, 560, 1280, 600); g.lineTo(1280, 650); g.quadraticCurveTo(640, 610, 0, 700); g.fill();
    S.strokes(g, { x: 0, y: 580, w, h: 120, n: 400, cols: ['#8a7050', '#c8b08a', '#7a6044'], l0: 10, l1: 30, ang: -.05, jit: .1, w0: 1, w1: 2.5, a0: .3, a1: .6, seed: 659, mask: (px, py) => { const t = px / 1280, top = (1 - t) * (1 - t) * 640 + 2 * (1 - t) * t * 560 + t * t * 600, bot = (1 - t) * (1 - t) * 700 + 2 * (1 - t) * t * 610 + t * t * 650; return py > top && py < bot; } });
    for (let x = 300; x < 1280; x += 60) { const y = 560 - (x - 300) * .012; g.fillStyle = '#5a4a3a'; g.fillRect(x, y - 34, 6, 36); } g.strokeStyle = '#5a4a3a'; g.lineWidth = 2; hf(300, 538, 1280, 526); hf(300, 550, 1280, 538);
    for (let i = 0; i < 9; i++) { const r = S.rng(i + 629), x = r() * w, y = 436 + r() * 20, s = 30 + r() * 30; g.fillStyle = '#4a3420'; g.fillRect(x - 3, y - s * .3, 6, s * .35); S.dabs(g, { x: x - s * .6, y: y - s * 1.1, w: s * 1.2, h: s * .9, n: 26, cols: ['#2a5a24', '#3a6a2a', '#5a8a3a'], r0: s * .12, r1: s * .25, sq: .8, a0: .8, a1: 1, seed: i * 13 + 661 }); }
  });
  // ======================== A PARISH CHURCH ON A SQUARE AT NIGHT ========================
  VP.set('parish', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#0e1228'], [.5, '#2a2a48']]);
    for (let i = 0; i < 80; i++) { const r = S.rng(i + 641); g.fillStyle = S.rgba('#ffffff', .3 + r() * .5); g.fillRect(r() * w, r() * 300, 2, 2); }
    // the church: nave, bell tower, rose window, big door
    g.fillStyle = '#8a8070'; g.fillRect(420, 220, 440, 300); g.beginPath(); g.moveTo(410, 222); g.lineTo(640, 130); g.lineTo(870, 222); g.fill();
    g.fillRect(820, 90, 120, 430); g.fillStyle = '#6a6050'; g.beginPath(); g.moveTo(812, 92); g.lineTo(880, 30); g.lineTo(948, 92); g.fill(); g.fillStyle = '#2a2420'; g.beginPath(); g.arc(880, 150, 24, Math.PI, 0); g.fillRect(856, 150, 48, 30); g.fill();
    S.dabs(g, { x: 420, y: 130, w: 520, h: 390, n: 200, cols: ['#a89a88', '#6a6050'], r0: 6, r1: 20, a0: .15, a1: .3, seed: 643 });
    g.fillStyle = '#3a2a30'; g.beginPath(); g.arc(640, 260, 40, 0, TAU); g.fill(); g.strokeStyle = '#8a7a5a'; g.lineWidth = 3; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(640, 260); g.lineTo(640 + Math.cos(k * TAU / 8) * 40, 260 + Math.sin(k * TAU / 8) * 40); g.stroke(); }
    g.fillStyle = '#2a1a10'; g.beginPath(); g.moveTo(580, 520); g.lineTo(580, 400); g.arc(640, 400, 60, Math.PI, 0); g.lineTo(700, 520); g.fill();
    for (const x of [500, 760]) { g.fillStyle = '#2a2430'; g.beginPath(); g.moveTo(x - 16, 400); g.lineTo(x - 16, 330); g.arc(x, 330, 16, Math.PI, 0); g.lineTo(x + 16, 400); g.fill(); }
    // houses either side
    for (const [x, bw, col] of [[0, 220, '#5a5048'], [200, 200, '#4a4440'], [960, 320, '#544a42']]) { g.fillStyle = col; g.fillRect(x, 280, bw, 240); for (let i = 0; i < bw / 70 - .5; i++) { g.fillStyle = '#1a1a24'; g.fillRect(x + 20 + i * 70, 320, 30, 46); g.fillRect(x + 20 + i * 70, 410, 30, 46); } }
    // cobbled square
    g.fillStyle = '#3a3634'; g.fillRect(0, 520, w, h - 520);
    for (let y = 524; y < h; y += 14) for (let x = (y % 28) / 2; x < w; x += 22) { g.fillStyle = S.mix('#4a4644', '#2a2624', S.rng(x * 5 + y * 13)()); g.beginPath(); g.ellipse(x, y, 10, 6, 0, 0, TAU); g.fill(); }
  });
})(window);
// Spain 3 sets for act 3 (the coup): the Strait of Gibraltar from above.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  VP.set('strait', 1280, 720, (g, w, h) => {
    const sg = g.createLinearGradient(0, 0, 0, h); sg.addColorStop(0, '#3a6a8a'); sg.addColorStop(1, '#2a5a7a'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
    S.strokes(g, { x: 0, y: 0, w, h, n: 1400, cols: ['#5a8aaa', '#1e4a6a', '#7aaac0'], l0: 10, l1: 34, ang: 0, jit: .2, w0: 1, w1: 2.5, a0: .15, a1: .35, seed: 661 });
    // Spain at the top with the Rock, Morocco at the bottom
    const land = (pts, col, seed) => { const p = S.poly(pts); g.fillStyle = col; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 300, cols: ['#a8986a', '#6a7a4a', '#c8b888'], r0: 8, r1: 40, sq: .5, a0: .15, a1: .3, seed }); g.restore(); g.strokeStyle = S.rgba('#e8f0f0', .5); g.lineWidth = 6; g.stroke(p); };
    land([[0, 0], [1280, 0], [1280, 150], [1000, 190], [820, 170], [760, 230], [700, 240], [660, 180], [420, 200], [200, 170], [0, 210]], '#8a8a5a', 663);
    g.fillStyle = '#7a7a6a'; g.beginPath(); g.moveTo(690, 236); g.lineTo(720, 196); g.lineTo(760, 228); g.fill();
    land([[0, 720], [0, 560], [300, 520], [520, 560], [640, 520], [780, 540], [1000, 500], [1280, 540], [1280, 720]], '#a8885a', 665);
    // wave crests, coastal foam, relief strokes, the Rock's shadow and white coastal towns
    for (let i = 0; i < 120; i++) { const r = S.rng(i + 667), x = r() * w, y = 240 + r() * 270, l = 10 + r() * 22; g.strokeStyle = S.rgba('#e8f4f8', .25 + r() * .35); g.lineWidth = 1.5; g.beginPath(); g.moveTo(x - l, y + 3); g.quadraticCurveTo(x, y - 4, x + l, y + 3); g.stroke(); }
    const foam = (pts) => { g.strokeStyle = S.rgba('#ffffff', .55); g.lineWidth = 3; g.setLineDash([10, 7]); g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y + 9) : g.moveTo(x, y + 9)); g.stroke(); g.setLineDash([]); };
    foam([[0, 210], [200, 170], [420, 200], [660, 180], [700, 240], [760, 230], [820, 170], [1000, 190], [1280, 150]]);
    foam([[0, 542], [300, 502], [520, 542], [640, 502], [780, 522], [1000, 482], [1280, 522]].map(([x, y]) => [x, y + 0]));
    S.strokes(g, { x: 0, y: 0, w, h: 240, n: 500, cols: ['#6a6a40', '#b8a878', '#5a6a3a'], l0: 8, l1: 24, ang: .8, jit: .7, w0: 1, w1: 2.5, a0: .2, a1: .45, seed: 669, mask: (px, py) => py < 150 + Math.sin(px / 140) * 20 });
    S.strokes(g, { x: 0, y: 560, w, h: 160, n: 400, cols: ['#8a6a3a', '#c8a878', '#7a7a4a'], l0: 8, l1: 24, ang: -.8, jit: .7, w0: 1, w1: 2.5, a0: .2, a1: .45, seed: 671 });
    g.fillStyle = S.rgba('#000000', .25); g.beginPath(); g.moveTo(720, 196); g.lineTo(760, 228); g.lineTo(735, 232); g.fill(); g.fillStyle = S.rgba('#ffffff', .25); g.beginPath(); g.moveTo(690, 236); g.lineTo(720, 196); g.lineTo(712, 232); g.fill();
    for (const [tx, ty, n, sd] of [[610, 175, 26, 673], [300, 172, 18, 675], [1040, 160, 22, 677], [690, 560, 24, 679], [330, 545, 26, 681], [1120, 535, 18, 683]]) { S.dabs(g, { x: tx - 40, y: ty - 18, w: 80, h: 30, n, cols: ['#f8f4ec', '#e8dcc8', '#c87a5a'], r0: 2, r1: 4.5, sq: .9, a0: .8, a1: 1, seed: sd }); }
  });
})(window);
