// Spain 2, act 2 sets: Tenochtitlan, the Mexican highlands, the Andes, Cajamarca, the ransom room.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { sky, hill } = X;
  // a stepped temple pyramid with twin shrines on top: sloped tiers, stone texture, central stair with balustrades, sunlit left / shaded right
  const pyramid = (g, x, y, w, hh, col, sh, rim) => { const steps = 5, sd = Math.round(x + w);
    for (let i = 0; i < steps; i++) { const w0 = w * (1 - i * .16), w1 = w0 - w * .05, y0 = y - i * hh / steps, y1 = y0 - hh / steps;
      const gr = g.createLinearGradient(x - w0 / 2, 0, x + w0 / 2, 0); gr.addColorStop(0, S.mix(col, '#ffffff', .25)); gr.addColorStop(.55, col); gr.addColorStop(1, sh);
      g.fillStyle = gr; g.beginPath(); g.moveTo(x - w0 / 2, y0); g.lineTo(x - w1 / 2, y1); g.lineTo(x + w1 / 2, y1); g.lineTo(x + w0 / 2, y0); g.fill();
      g.fillStyle = S.rgba('#3a2a1a', .28); g.fillRect(x - w0 / 2, y0 - 2, w0, 2); g.fillStyle = rim; g.fillRect(x - w1 / 2, y1, w1, 1.5);
      // painted frieze band on each tier
      g.fillStyle = S.rgba(i % 2 ? '#b84a32' : '#3a6a9a', .55); g.fillRect(x - w1 / 2 + 2, y1 + 3, w1 - 4, Math.max(1.5, hh / steps * .12)); }
    S.strokes(g, { x: x - w / 2, y: y - hh, w, h: hh, n: Math.round(w * 2), cols: ['#ffffff', '#a89878', '#d8ccb0'], l0: 2, l1: 6, ang: 0, jit: .3, w0: .6, w1: 1.4, a0: .1, a1: .3, seed: sd, mask: (px, py) => Math.abs(px - x) < w / 2 * (1 - (y - py) / hh * .8) });
    // stairway with balustrades
    const sw = w * .16; const gs = g.createLinearGradient(0, y - hh, 0, y); gs.addColorStop(0, S.mix(col, '#ffffff', .3)); gs.addColorStop(1, S.mix(col, sh, .3)); g.fillStyle = gs; g.beginPath(); g.moveTo(x - sw / 2, y); g.lineTo(x - sw * .32, y - hh); g.lineTo(x + sw * .32, y - hh); g.lineTo(x + sw / 2, y); g.fill();
    g.strokeStyle = S.rgba('#7a6a4a', .45); g.lineWidth = .8; for (let k = 1; k < hh / 2.6; k++) { const yy = y - k * 2.6, f = 1 - k * 2.6 / hh * .36; g.beginPath(); g.moveTo(x - sw / 2 * f, yy); g.lineTo(x + sw / 2 * f, yy); g.stroke(); }
    for (const sg of [-1, 1]) { g.fillStyle = sg < 0 ? S.mix(col, '#ffffff', .2) : sh; g.beginPath(); g.moveTo(x + sg * sw / 2, y); g.lineTo(x + sg * (sw / 2 + w * .025), y); g.lineTo(x + sg * (sw * .32 + w * .02), y - hh); g.lineTo(x + sg * sw * .32, y - hh); g.fill(); }
    // twin shrines: Tlaloc (blue) and Huitzilopochtli (red), with roofs, crests, doorways and braziers
    const tw = w * .2, ty = y - hh;
    for (const dx of [-w * .14, w * .14]) { const cx = x + dx, red = dx < 0, base = red ? '#c84a3a' : '#3a6ac8';
      const gw = g.createLinearGradient(cx - tw / 2, 0, cx + tw / 2, 0); gw.addColorStop(0, S.mix(base, '#ffffff', .2)); gw.addColorStop(1, S.mix(base, '#000000', .3)); g.fillStyle = gw; g.fillRect(cx - tw / 2, ty - tw * .9, tw, tw * .9);
      g.fillStyle = '#f4ecd8'; g.fillRect(cx - tw / 2 - 2, ty - tw * .9 - 4, tw + 4, 4);
      g.fillStyle = S.mix(base, '#000000', .2); g.beginPath(); g.moveTo(cx - tw / 2 - 3, ty - tw * .9 - 4); g.lineTo(cx, ty - tw * 1.45); g.lineTo(cx + tw / 2 + 3, ty - tw * .9 - 4); g.fill();
      g.fillStyle = '#f4ecd8'; for (let k = 0; k < 5; k++) { const px = cx - tw * .4 + k * tw * .2; g.beginPath(); g.arc(px, ty - tw * .9 - 6 - (1 - Math.abs(k - 2) / 2) * tw * .3, tw * .05, 0, TAU); g.fill(); }
      g.fillStyle = '#1e140c'; g.fillRect(cx - tw * .17, ty - tw * .55, tw * .34, tw * .55); g.fillStyle = S.rgba('#ffb050', .5); g.fillRect(cx - tw * .12, ty - tw * .2, tw * .24, tw * .2);
      g.fillStyle = '#5a4a3a'; g.fillRect(cx - tw * .7, ty - tw * .18, tw * .12, tw * .18); S.glow(g, cx - tw * .64, ty - tw * .22, tw * .35, '#ffb050', .35); }
  };
  X.pyramid = pyramid;
  const volcano = (g, x, y, w, hh, col, snow) => { g.fillStyle = col; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w * .08, y - hh); g.lineTo(x + w * .08, y - hh); g.lineTo(x + w / 2, y); g.fill(); g.fillStyle = snow; g.beginPath(); g.moveTo(x - w * .19, y - hh * .62); g.lineTo(x - w * .08, y - hh); g.lineTo(x + w * .08, y - hh); g.lineTo(x + w * .2, y - hh * .6); g.lineTo(x + w * .08, y - hh * .7); g.lineTo(x, y - hh * .58); g.lineTo(x - w * .1, y - hh * .7); g.fill();
    const inV = (px, py) => py < y && py > y - hh * .58 && Math.abs(px - x) < w * .08 + (py - (y - hh)) / hh * w * .42;
    S.strokes(g, { x: x - w / 2, y: y - hh, w, h: hh, n: 260, cols: ['#a0a0bc', '#6a6a88', '#b8b8d0'], l0: 4, l1: 10, ang: .15, jit: .6, w0: 1, w1: 2, a0: .08, a1: .22, seed: Math.round(x), mask: inV });
    S.dabs(g, { x: x, y: y - hh, w: w / 2, h: hh, n: 120, cols: ['#4a4a68'], r0: 10, r1: 30, sq: .5, a0: .08, a1: .18, seed: Math.round(x) + 1, mask: (px, py) => px > x + w * .02 && inV(px, py) });
    S.glow(g, x - w * .15, y - hh * .5, hh * .5, '#fff0e0', .15); };
  // ======================== TENOCHTITLAN ON ITS LAKE ========================
  VP.set('tenoch', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a88c8'], [.45, '#b8d8e8'], [.55, '#f0e8d0']]);
    S.dabs(g, { x: 0, y: 30, w, h: 220, n: 400, cols: ['#ffffff', '#e8f0f6'], r0: 20, r1: 110, sq: .2, ang: -.05, jit: .1, a0: .06, a1: .2, seed: 411 });
    volcano(g, 1020, 330, 520, 230, '#8a8aa8', '#f4f6fa'); volcano(g, 1200, 340, 380, 170, '#7a7a98', '#eef0f6');
    hill(g, 340, 40, 160, 413, '#8a9a7a', ['#a8b890', '#6a7a5a'], w, h);
    const lake = g.createLinearGradient(0, 340, 0, h); lake.addColorStop(0, '#6aa8c0'); lake.addColorStop(1, '#2a6a88'); g.fillStyle = lake; g.fillRect(0, 340, w, h - 340);
    S.strokes(g, { x: 0, y: 340, w, h: 380, n: 900, cols: ['#e0f4f8', '#2a5a78', '#8ac8d8'], l0: 8, l1: 30, ang: 0, jit: .05, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 415 });
    // causeways
    g.fillStyle = '#d8c8a0'; g.beginPath(); g.moveTo(0, 470); g.lineTo(380, 450); g.lineTo(380, 462); g.lineTo(0, 486); g.fill(); g.beginPath(); g.moveTo(1280, 500); g.lineTo(880, 452); g.lineTo(880, 464); g.lineTo(1280, 516); g.fill(); g.beginPath(); g.moveTo(630, 720); g.lineTo(660, 480); g.lineTo(690, 480); g.lineTo(720, 720); g.fill();
    // the island city: white houses, canals, gardens
    // chinampa gardens: green raised beds fringing the island
    for (let i = 0; i < 70; i++) { const r = S.rng(i + 700), a = r() * TAU, x = 640 + Math.cos(a) * (300 + r() * 70), y = 442 + Math.sin(a) * (58 + r() * 22); if (y < 405) continue; const ww = 26 + r() * 30, hh2 = 5 + r() * 4; g.fillStyle = S.mix('#5a8a3a', '#8aaa4a', r()); g.fillRect(x - ww / 2, y - hh2 / 2, ww, hh2); g.fillStyle = S.rgba('#2a4a2a', .4); g.fillRect(x - ww / 2, y + hh2 / 2 - 1, ww, 1.5); for (let t = 0; t < 3; t++) { g.fillStyle = '#3a6a2a'; g.beginPath(); g.arc(x - ww / 2 + 4 + r() * (ww - 8), y - hh2 / 2 - 2, 2.5 + r() * 2, 0, TAU); g.fill(); } }
    // the island with a soft shore shadow
    g.fillStyle = S.rgba('#1a4a5a', .35); g.beginPath(); g.ellipse(646, 448, 304, 62, 0, 0, TAU); g.fill();
    g.fillStyle = '#c8b890'; g.beginPath(); g.ellipse(640, 440, 300, 60, 0, 0, TAU); g.fill();
    S.dabs(g, { x: 340, y: 380, w: 600, h: 120, n: 260, cols: ['#d8c8a0', '#a89870', '#e0d4b0'], r0: 3, r1: 10, sq: .4, a0: .2, a1: .45, seed: 731, mask: (px, py) => ((px - 640) / 300) ** 2 + ((py - 440) / 60) ** 2 < 1 });
    // canals cut through the city
    g.strokeStyle = S.rgba('#3a8aa8', .95); g.lineWidth = 3.5; for (const y of [418, 452, 476]) { g.beginPath(); for (let x = 360; x <= 920; x += 8) { const yy = y + Math.sin(x / 70) * 2; const inI = ((x - 640) / 300) ** 2 + ((yy - 440) / 60) ** 2 < .97; if (!inI) { g.moveTo(x, yy); continue; } g.lineTo(x, yy); } g.stroke(); }
    // houses: whitewashed flat roofs with parapets, shaded side, door, roof garden; drawn back to front
    const hs = []; for (let i = 0; i < 300; i++) { const r = S.rng(i + 420), a = r() * TAU, rr = Math.sqrt(r()), x = 640 + Math.cos(a) * 285 * rr, y = 440 + Math.sin(a) * 52 * rr; if (Math.abs(x - 640) < 110 && y < 448 && y > 395) continue; hs.push([y, x, r()]); } hs.sort((p, q) => p[0] - q[0]);
    for (const [y, x, v] of hs) { const s = .55 + (y - 390) / 95, ww = (12 + v * 8) * s, hh2 = (7 + v * 5) * s;
      g.fillStyle = S.rgba('#3a2a1a', .25); g.fillRect(x - ww / 2 + 2 * s, y - 1, ww, 2.5 * s);
      g.fillStyle = S.mix('#f8f0dc', '#e0d0b0', v); g.fillRect(x - ww / 2, y - hh2, ww, hh2);
      g.fillStyle = S.rgba('#9a8a6a', .55); g.fillRect(x + ww / 2 - ww * .28, y - hh2, ww * .28, hh2);
      g.fillStyle = '#fffaf0'; g.fillRect(x - ww / 2 - .5, y - hh2 - 1.5 * s, ww + 1, 1.5 * s);
      g.fillStyle = '#3a2a1a'; g.fillRect(x - ww * .12, y - hh2 * .55, ww * .2, hh2 * .55);
      if (v < .3) { g.fillStyle = '#4a8a3a'; g.beginPath(); g.arc(x - ww * .2, y - hh2 - 2 * s, 3 * s, 0, TAU); g.fill(); g.fillStyle = '#6aaa4a'; g.beginPath(); g.arc(x - ww * .25, y - hh2 - 2.6 * s, 1.6 * s, 0, TAU); g.fill(); }
      else if (v > .85) { g.fillStyle = '#c84a3a'; g.fillRect(x - ww * .3, y - hh2 - 1.5 * s, ww * .6, 1.5 * s); } }
    // the sacred precinct: serpent wall around the great temple, with smaller temples and the round temple of the wind
    g.fillStyle = '#e8dcc2'; g.fillRect(500, 444, 280, 6); g.fillStyle = S.rgba('#8a7a5a', .6); g.fillRect(500, 448, 280, 2);
    for (let k = 0; k < 28; k++) { g.fillStyle = '#c84a3a'; g.beginPath(); g.arc(504 + k * 10, 444, 2.2, Math.PI, 0); g.fill(); }
    g.fillStyle = '#d8ccb0'; g.fillRect(520, 410, 240, 34); S.dabs(g, { x: 520, y: 410, w: 240, h: 34, n: 80, cols: ['#e8e0c8', '#b8a888'], r0: 2, r1: 6, a0: .2, a1: .4, seed: 741 });
    pyramid(g, 470, 440, 70, 50, '#e8dcc2', '#b8a888', '#ffffff'); pyramid(g, 810, 445, 80, 56, '#e8dcc2', '#b8a888', '#ffffff');
    // round temple of Ehecatl
    g.fillStyle = '#e8dcc2'; g.fillRect(556, 412, 34, 20); g.fillStyle = '#f4ecd8'; g.beginPath(); g.ellipse(573, 404, 13, 4, 0, 0, TAU); g.fill(); g.fillStyle = '#e0d4bc'; g.fillRect(560, 392, 26, 12); g.fillStyle = '#7a4a2a'; g.beginPath(); g.moveTo(557, 393); g.lineTo(573, 378); g.lineTo(589, 393); g.fill();
    // ball court
    g.fillStyle = '#d8ccb0'; g.fillRect(690, 420, 50, 16); g.fillStyle = '#b8a888'; g.fillRect(694, 424, 42, 8); g.fillStyle = '#e8dcc2'; g.fillRect(690, 418, 50, 3);
    pyramid(g, 640, 430, 150, 110, '#efe6d2', '#b8a888', '#ffffff');
    // trees and smoke from the shrines
    for (let k = 0; k < 26; k++) { const r = S.rng(k + 760), a = r() * TAU, rr = .6 + r() * .35, x = 640 + Math.cos(a) * 290 * rr, y = 440 + Math.sin(a) * 52 * rr, s = .6 + (y - 390) / 100; g.fillStyle = '#4a6a2a'; g.fillRect(x - .8 * s, y - 10 * s, 1.6 * s, 10 * s); g.fillStyle = S.mix('#3a7a3a', '#6a9a3a', r()); g.beginPath(); g.arc(x, y - 12 * s, 5.5 * s, 0, TAU); g.fill(); g.fillStyle = S.rgba('#9acc5a', .5); g.beginPath(); g.arc(x - 1.5 * s, y - 13.5 * s, 2.5 * s, 0, TAU); g.fill(); }
    S.dabs(g, { x: 590, y: 220, w: 100, h: 90, n: 30, cols: ['#e8e4dc', '#c8c4bc'], r0: 6, r1: 16, a0: .06, a1: .14, seed: 771 });
    // canoes on the lake
    for (let k = 0; k < 16; k++) { const r = S.rng(k + 780), x = r() * w, y = 500 + r() * 140; if (Math.abs(x - 675) < 50) continue; const s = .5 + (y - 480) / 140; g.fillStyle = '#5a3a1e'; g.beginPath(); g.moveTo(x - 16 * s, y); g.quadraticCurveTo(x, y + 5 * s, x + 16 * s, y); g.lineTo(x + 13 * s, y - 2 * s); g.lineTo(x - 13 * s, y - 2 * s); g.fill(); g.fillStyle = '#e8dcc2'; g.fillRect(x - 2 * s, y - 10 * s, 4 * s, 8 * s); g.fillStyle = '#8a5a3a'; g.beginPath(); g.arc(x, y - 11 * s, 2 * s, 0, TAU); g.fill(); g.strokeStyle = '#3a2a1a'; g.lineWidth = 1.2 * s; g.beginPath(); g.moveTo(x + 2 * s, y - 8 * s); g.lineTo(x + 10 * s, y + 4 * s); g.stroke(); g.strokeStyle = S.rgba('#e0f4f8', .5); g.beginPath(); g.moveTo(x - 20 * s, y + 3 * s); g.lineTo(x - 30 * s, y + 4 * s); g.stroke(); }
    // reeds and canoes near the shore
    for (let k = 0; k < 40; k++) { const r = S.rng(k + 460), x = r() * w, y = 640 + r() * 70; g.strokeStyle = S.rgba('#5a7a3a', .8); g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - .5) * 10, y - 30 - r() * 30); g.stroke(); }
  });
  // ======================== THE MEXICAN HIGHLANDS ========================
  VP.set('valley', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a88c8'], [.5, '#c8dce8'], [.6, '#f0e4c8']]);
    volcano(g, 380, 420, 700, 300, '#8a8aa8', '#f4f6fa'); volcano(g, 800, 430, 560, 240, '#7a7a98', '#eef0f6');
    hill(g, 440, 60, 180, 431, '#9a9a6a', ['#b8b880', '#7a7a4a'], w, h);
    hill(g, 520, 40, 220, 433, '#b8a06a', ['#d0b880', '#8a7a4a'], w, h);
    const fg = g.createLinearGradient(0, 520, 0, h); fg.addColorStop(0, '#c8aa70'); fg.addColorStop(1, '#9a7a48'); g.fillStyle = fg; g.fillRect(0, 560, w, h - 560);
    S.strokes(g, { x: 0, y: 560, w, h: 160, n: 700, cols: ['#d8c088', '#7a5a30', '#e8d4a0'], l0: 6, l1: 18, ang: 0, jit: .3, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 435 });
    for (let k = 0; k < 14; k++) { const r = S.rng(k + 440), x = r() * w, y = 540 + r() * 40; g.fillStyle = '#4a7a3a'; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 7; j++) { const a = -Math.PI / 2 + (j - 3) * .35; g.lineTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30); g.lineTo(x + Math.cos(a + .17) * 6, y + Math.sin(a + .17) * 6); } g.fill(); }
  });
  // ======================== THE ANDES ========================
  VP.set('andes', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a70b8'], [.5, '#c0d8ea'], [.62, '#f0ecdc']]);
    S.dabs(g, { x: 0, y: 300, w, h: 160, n: 300, cols: ['#ffffff', '#e8f0f6'], r0: 30, r1: 140, sq: .25, a0: .08, a1: .25, seed: 451 });
    const t1 = x => 300 - 170 * Math.pow(S.fbm(x / 140, 453), 1.5) - 20 * Math.abs(Math.sin(x / 61)); g.fillStyle = '#8a90a8'; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 4) g.lineTo(x, t1(x)); g.lineTo(w, h); g.fill();
    S.dabs(g, { x: 0, y: 60, w, h: 260, n: 400, cols: ['#ffffff', '#e8eef6'], r0: 4, r1: 14, sq: .4, a0: .5, a1: .9, seed: 455, mask: (x, y) => y > t1(x) && y < t1(x) + 40 && t1(x) < 220 });
    // terraced green slopes
    const t2 = hill(g, 470, 140, 260, 457, '#6a8a4a', ['#8aaa5a', '#4a6a3a'], w, h);
    for (let j = 0; j < 9; j++) { g.strokeStyle = S.rgba('#c8d890', .55); g.lineWidth = 3; g.beginPath(); for (let x = 0; x <= w; x += 10) { const y = t2(x) + 24 + j * 26; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    // the stone road zig-zagging up
    g.strokeStyle = '#c8b898'; g.lineWidth = 10; g.lineJoin = 'round'; g.beginPath(); g.moveTo(200, 720); g.lineTo(520, 620); g.lineTo(300, 560); g.lineTo(640, 470); g.lineTo(480, 420); g.lineTo(760, 360); g.stroke();
    g.fillStyle = '#9a8a6a'; g.fillRect(0, 640, w, 80); S.dabs(g, { x: 0, y: 640, w, h: 80, n: 300, cols: ['#b8a888', '#6a5a40'], r0: 6, r1: 16, a0: .2, a1: .5, seed: 459 });
  });
  // ======================== CAJAMARCA'S SQUARE ========================
  VP.set('cajamarca', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a7ab0'], [.5, '#e8c8a0'], [.6, '#f0d8b0']]);
    hill(g, 300, 90, 200, 471, '#7a8a5a', ['#9aaa70', '#5a6a40'], w, h);
    // distant town roofs and a terraced hillside
    for (let k = 0; k < 40; k++) { const r = S.rng(k + 800), x = r() * w, y = 300 + r() * 30; g.fillStyle = S.mix('#b88a5a', '#d8aa7a', r()); g.fillRect(x - 10, y - 8, 20, 8); g.fillStyle = S.mix('#8a6a3a', '#b8945a', r()); g.beginPath(); g.moveTo(x - 13, y - 8); g.lineTo(x, y - 18); g.lineTo(x + 13, y - 8); g.fill(); }
    // long halls around the square: fitted stone base, adobe walls, thatched roofs, trapezoid doorways
    for (const [x0, y, ww, hh] of [[0, 470, 560, 140], [720, 470, 560, 140]]) {
      const gw = g.createLinearGradient(0, y - hh, 0, y); gw.addColorStop(0, '#d8a87a'); gw.addColorStop(1, '#b8885a'); g.fillStyle = gw; g.fillRect(x0, y - hh + 26, ww, hh - 26);
      S.dabs(g, { x: x0, y: y - hh + 26, w: ww, h: hh - 26, n: 260, cols: ['#e8b888', '#a8784a', '#c8986a'], r0: 4, r1: 14, sq: .5, a0: .12, a1: .3, seed: 473 + x0 });
      for (let i = 0; i < 26; i++) { const r = S.rng(i + x0 + 820), bx = x0 + (i % 13) * 44 + (Math.floor(i / 13) % 2) * 22, by = y - 28 + Math.floor(i / 13) * 14; g.fillStyle = S.mix('#8a8478', '#a8a090', r()); g.beginPath(); g.ellipse(bx + 20, by + 7, 21, 7, 0, 0, TAU); g.fill(); g.strokeStyle = S.rgba('#4a443a', .5); g.lineWidth = 1; g.stroke(); }
      // thatch: layered straw strokes with a shadow under the eave
      g.fillStyle = '#a8884a'; g.beginPath(); g.moveTo(x0 - 10, y - hh + 30); g.lineTo(x0 + 20, y - hh - 30); g.lineTo(x0 + ww - 20, y - hh - 30); g.lineTo(x0 + ww + 10, y - hh + 30); g.fill();
      S.strokes(g, { x: x0 - 10, y: y - hh - 30, w: ww + 20, h: 60, n: 700, cols: ['#d8b870', '#8a6a30', '#c8a860', '#6a5020'], l0: 8, l1: 20, ang: 1.45, jit: .15, w0: 1, w1: 2.2, a0: .3, a1: .7, seed: 830 + x0 });
      g.fillStyle = S.rgba('#3a2410', .35); g.fillRect(x0, y - hh + 30, ww, 8);
      for (let k = 0; k < 7; k++) { const dx = x0 + 30 + k * 76; g.fillStyle = '#c8b8a0'; g.beginPath(); g.moveTo(dx - 4, y - 28); g.lineTo(dx + 2, y - 86); g.lineTo(dx + 50, y - 86); g.lineTo(dx + 56, y - 28); g.fill(); g.fillStyle = '#2a1a10'; g.beginPath(); g.moveTo(dx, y - 28); g.lineTo(dx + 6, y - 80); g.lineTo(dx + 46, y - 80); g.lineTo(dx + 52, y - 28); g.fill(); g.fillStyle = S.rgba('#6a4a2a', .5); g.fillRect(dx, y - 32, 52, 4); } }
    // the square: packed earth with footpaths and scattered stones
    g.fillStyle = '#d8b888'; g.fillRect(0, 470, w, h - 470); S.dabs(g, { x: 0, y: 470, w, h: 250, n: 700, cols: ['#e8c898', '#b89868', '#f0d8b0', '#a88858'], r0: 3, r1: 16, sq: .45, a0: .2, a1: .45, seed: 477 });
    S.strokes(g, { x: 0, y: 470, w, h: 250, n: 400, cols: ['#c8a878', '#f0dcb8'], l0: 10, l1: 30, ang: 0, jit: .2, w0: 1, w1: 2, a0: .15, a1: .35, seed: 479 });
    // the ushnu: a stepped stone platform with a stair, catching the light on its left faces
    for (let i = 0; i < 3; i++) { const ww = 170 - i * 34, x = 640 - ww / 2, yy = 470 - i * 22; const gg = g.createLinearGradient(x, 0, x + ww, 0); gg.addColorStop(0, '#c8c0b0'); gg.addColorStop(1, '#7a746a'); g.fillStyle = gg; g.fillRect(x, yy - 22, ww, 22); for (let b = 0; b < ww / 18; b++) { g.strokeStyle = S.rgba('#4a443a', .45); g.lineWidth = 1; g.strokeRect(x + b * 18, yy - 22 + (b % 2) * 11, 18, 11); } g.fillStyle = '#e0d8c8'; g.fillRect(x, yy - 22, ww, 2); }
    g.fillStyle = '#b8b0a0'; g.fillRect(626, 404, 28, 66); g.strokeStyle = S.rgba('#5a544a', .6); for (let k = 0; k < 11; k++) { g.beginPath(); g.moveTo(626, 410 + k * 6); g.lineTo(654, 410 + k * 6); g.stroke(); }
    g.fillStyle = S.rgba('#3a2a1a', .25); g.beginPath(); g.ellipse(660, 474, 110, 8, 0, 0, TAU); g.fill();
  });
  // ======================== THE RANSOM ROOM ========================
  VP.set('ransom', 1280, 720, (g, w, h) => {
    g.fillStyle = '#6a5a48'; g.fillRect(0, 0, w, h);
    // fitted Inca stonework
    for (let i = 0; i < 160; i++) { const r = S.rng(i + 490), x = (i % 16) * 82 + (Math.floor(i / 16) % 2) * 40 - 20, y = Math.floor(i / 16) * 58; g.fillStyle = S.mix('#8a7a64', '#5a4a3a', r()); g.beginPath(); g.moveTo(x + 4, y + 6); g.quadraticCurveTo(x + 40, y + 2 + r() * 4, x + 78, y + 6); g.quadraticCurveTo(x + 82, y + 30, x + 78, y + 54); g.quadraticCurveTo(x + 40, y + 58, x + 4, y + 54); g.quadraticCurveTo(x, y + 30, x + 4, y + 6); g.fill(); }
    // trapezoid niches
    for (const x of [240, 640, 1040]) { g.fillStyle = '#2a2018'; g.beginPath(); g.moveTo(x - 50, 400); g.lineTo(x - 36, 240); g.lineTo(x + 36, 240); g.lineTo(x + 50, 400); g.fill(); }
    g.fillStyle = '#3a2e22'; g.fillRect(0, 600, w, 120);
    // the red line high on the wall
    g.strokeStyle = '#b8282a'; g.lineWidth = 6; g.setLineDash([24, 10]); g.beginPath(); g.moveTo(0, 210); g.lineTo(w, 210); g.stroke(); g.setLineDash([]);
  });
})(window);
