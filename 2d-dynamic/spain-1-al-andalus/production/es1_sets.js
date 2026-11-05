// Spain 1 (Al-Andalus): painted sets in the Village Painterly look, shared by the act pages.
(function (G) {
  const S = G.S, VP = G.VP, X = S.SPX, TAU = Math.PI * 2;
  const { crisp, ridge, cypress, tower, town } = X;
  const sky = (g, w, h, stops) => { const gr = g.createLinearGradient(0, 0, 0, h); stops.forEach(([q, col]) => gr.addColorStop(q, col)); g.fillStyle = gr; g.fillRect(0, 0, w, h); };
  const jag = (g, y0, amp, seed, col, w, h, k = 130) => { const top = x => y0 - amp * Math.pow(S.fbm(x / k, seed), 1.7) * 1.5 - amp * .12 * Math.abs(Math.sin(x / 47 + seed)); g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 4) g.lineTo(x, top(x)); g.lineTo(w, h); g.closePath(); g.fill(); return top; };
  const snow = (g, top, line, w, seed) => {
    g.fillStyle = '#f6eef4'; g.beginPath();
    for (let x = 0; x <= w; x += 4) { const y = top(x); if (y < line) { g.moveTo(x, y); g.lineTo(x + 4, top(x + 4)); g.lineTo(x + 4, Math.min(top(x + 4) + (line - top(x + 4)) * .5, line)); g.lineTo(x, Math.min(y + (line - y) * .5, line)); } }
    g.fill();
    S.strokes(g, { x: 0, y: line - 220, w, h: 220, n: 600, cols: ['#d8c4dc', '#ffffff', '#b8a4c4'], l0: 4, l1: 12, ang: 1.2, jit: .5, w0: 1, w1: 2, a0: .3, a1: .7, seed, mask: (x, y) => top(x) < line && y > top(x) && y < Math.min(top(x) + (line - top(x)) * .5, line) });
  };
  // horseshoe arch path
  const arch = (x, y, w, h) => { const p = new Path2D(), r = w / 2; p.moveTo(x - r * .86, y); p.lineTo(x - r * .86, y - h + r); p.arc(x, y - h + r, r, Math.PI * .83, Math.PI * .17); p.lineTo(x + r * .86, y); p.closePath(); return p; };
  X.arch = arch;
  // Nasrid tower with crenels and a lit face
  const ntower = (g, x, y, w, h, o = {}) => {
    const wall = o.wall || '#c8684a', sh = o.sh || '#7a3a30', rim = o.rim || '#ffd2a0';
    g.fillStyle = wall; g.fillRect(x - w / 2, y - h, w, h);
    g.fillStyle = S.rgba(sh, .85); g.fillRect(x + w * .18, y - h, w * .32, h);
    g.fillStyle = S.rgba(rim, .55); g.fillRect(x - w / 2, y - h, w * .1, h);
    for (let i = 0; i < Math.round(w / 10); i++) { g.fillStyle = i % 2 ? sh : wall; g.fillRect(x - w / 2 + i * w / Math.round(w / 10), y - h - 7, w / Math.round(w / 10) * .6, 8); }
    S.strokes(g, { x: x - w / 2, y: y - h, w, h, n: Math.round(w * h / 60), cols: [S.mix(wall, '#ffffff', .2), sh], l0: 4, l1: 10, ang: 0, jit: .2, w0: 1, w1: 2, a0: .1, a1: .3, seed: Math.round(x) });
    if (o.win) { g.fillStyle = '#2a1410'; g.fill(arch(x - w * .12, y - h * .55, w * .16, w * .28)); }
  };
  X.ntower = ntower;

  // ======================== DAWN OVER THE ALHAMBRA (tall set for a crane down) ========================
  VP.set('dawn', 1280, 1300, (g, w, h) => {
    sky(g, w, 700, [[0, '#1d2448'], [.35, '#4a4a7a'], [.62, '#c8788a'], [.8, '#f2a878'], [1, '#ffd29a']]);
    S.dabs(g, { x: 0, y: 160, w, h: 380, n: 700, cols: ['#ffc8a8', '#e890a0', '#8a6a9a', '#ffe0c0'], r0: 30, r1: 170, sq: .1, ang: -.04, jit: .08, a0: .03, a1: .1, seed: 5 });
    S.glow(g, 250, 640, 520, '#ffcf90', .5); S.glow(g, 250, 640, 140, '#fff4d8', .7);
    const top = jag(g, 650, 190, 8, '#8a6c96', w, h);
    S.strokes(g, { x: 0, y: 420, w, h: 260, n: 900, cols: ['#a888b0', '#6c5280', '#c4a0b8'], l0: 10, l1: 30, ang: .5, jit: 1.2, w0: 2, w1: 5, a0: .06, a1: .16, seed: 9, mask: (x, y) => y > top(x) + 4 });
    snow(g, top, 560, w, 11);
    S.glow(g, 250, 560, 380, '#ffc8a8', .25);
    const hill = (y0, amp, k, seed, col, dab) => { const top = x => y0 - amp * S.fbm(x / k, seed); g.fillStyle = col; g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w; x += 6) g.lineTo(x, top(x)); g.lineTo(w, h); g.closePath(); g.fill();
      S.dabs(g, { x: 0, y: y0 - amp, w, h: amp + 80, n: 500, cols: dab, r0: 8, r1: 26, sq: .5, a0: .12, a1: .3, seed: seed + 1, mask: (x, y) => y > top(x) + 3 }); };
    hill(740, 90, 190, 13, '#8a6a84', ['#a888a0', '#6a4c66', '#c8a0a8']);
    S.glow(g, 250, 700, 400, '#ffc8a0', .18);
    hill(800, 60, 140, 15, '#7a5a5e', ['#9a7470', '#5a4048', '#b88a78', '#6a6a48']);
    // the Alhambra hill on the left
    g.fillStyle = '#7a4a3a'; g.beginPath(); g.moveTo(0, h); g.lineTo(0, 860); g.bezierCurveTo(160, 820, 330, 805, 520, 812); g.bezierCurveTo(640, 818, 760, 860, 860, 930); g.lineTo(880, h); g.closePath(); g.fill();
    S.dabs(g, { x: 0, y: 800, w: 880, h: 200, n: 500, cols: ['#9a6248', '#5a3428', '#b8784e', '#4a5a30'], r0: 6, r1: 20, sq: .6, a0: .2, a1: .5, seed: 17 });
    // long red walls and towers
    const wall = '#c0644a';
    g.fillStyle = wall; crisp(g, [[40, 830], [700, 836], [700, 860], [40, 858]]); g.fill();
    for (let i = 0; i < 33; i++) { g.fillStyle = wall; g.fillRect(40 + i * 20, 823, 10, 8); }
    ntower(g, 90, 845, 60, 80); ntower(g, 220, 840, 44, 52); ntower(g, 330, 838, 80, 118, { win: 1 }); ntower(g, 470, 838, 50, 64); ntower(g, 600, 840, 66, 86, { win: 1 });
    // palace roofs inside the walls
    for (let i = 0; i < 10; i++) { const x = 120 + i * 52, y = 830; g.fillStyle = '#9a4a34'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 22, y - 14); g.lineTo(x + 44, y); g.fill(); }
    for (let i = 0; i < 9; i++) cypress(g, 30 + i * 80 + (i % 3) * 13, 880 + (i % 2) * 8, 46 + (i % 4) * 12, '#2e3a24', '#c89060');
    // the gate tower, near and big
    ntower(g, 470, 1010, 170, 150, { wall: '#c8704e', sh: '#7a3a2c' });
    g.fillStyle = '#2a1410'; g.fill(arch(470, 1010, 82, 112));
    g.strokeStyle = '#e8b878'; g.lineWidth = 3; g.stroke(arch(470, 1010, 96, 124));
    g.fillStyle = S.rgba('#ffcf90', .18); g.fill(arch(470, 1010, 82, 112));
    // walls running away from the gate
    g.fillStyle = '#b05a40'; crisp(g, [[0, 920], [385, 905], [385, 1010], [0, 1020]]); g.fill();
    g.fillStyle = '#b05a40'; crisp(g, [[555, 905], [760, 930], [760, 1000], [555, 1010]]); g.fill();
    S.strokes(g, { x: 0, y: 900, w: 770, h: 120, n: 600, cols: ['#d8806a', '#7a3a2c'], l0: 4, l1: 12, ang: 0, jit: .2, w0: 1, w1: 2, a0: .1, a1: .3, seed: 19, mask: (x, y) => !(x > 385 && x < 555) });
    for (let i = 0; i < 19; i++) { g.fillStyle = '#b05a40'; g.fillRect(i * 20, 898 + i * .8, 10, 8); }
    // the plain below with the waiting army
    const pl = g.createLinearGradient(0, 940, 0, h); pl.addColorStop(0, '#b89a6a'); pl.addColorStop(1, '#8a6a42'); g.fillStyle = pl;
    g.beginPath(); g.moveTo(760, 940); g.bezierCurveTo(900, 930, 1100, 925, w, 930); g.lineTo(w, h); g.lineTo(0, h); g.lineTo(0, 1015); g.lineTo(760, 1000); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 930, w, h: 370, n: 1600, cols: ['#d0b47e', '#8a6a3e', '#e8cc94', '#6a5a30'], l0: 6, l1: 16, ang: 0, jit: .25, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 23 });
    // army tents
    for (let i = 0; i < 26; i++) { const r = S.rng(i + 70), x = 860 + r() * 400, y = 960 + r() * 60, s = .6 + (y - 960) / 60 * .5;
      g.fillStyle = r() < .5 ? '#efe6d4' : '#d8c8a8'; g.beginPath(); g.moveTo(x - 16 * s, y); g.lineTo(x, y - 20 * s); g.lineTo(x + 16 * s, y); g.fill(); g.fillStyle = '#9a8a6a'; g.beginPath(); g.moveTo(x, y - 20 * s); g.lineTo(x + 16 * s, y); g.lineTo(x + 4 * s, y); g.fill(); }
    // the road from the gate down to the plain
    g.fillStyle = '#d8b88a'; g.beginPath(); g.moveTo(430, 1010); g.bezierCurveTo(520, 1060, 700, 1080, 900, 1090); g.lineTo(1280, 1110); g.lineTo(1280, 1150); g.lineTo(900, 1140); g.bezierCurveTo(680, 1130, 520, 1100, 510, 1010); g.closePath(); g.fill();
    S.strokes(g, { x: 420, y: 1005, w: 860, h: 150, n: 500, cols: ['#f0d8aa', '#a88a5e'], l0: 6, l1: 18, ang: .1, jit: .2, w0: 1, w1: 2, a0: .2, a1: .5, seed: 29, mask: (x, y) => y > 1010 });
    // olive trees and rocks in the foreground
    for (let i = 0; i < 40; i++) { const r = S.rng(i + 600), x = r() * w, y = 1170 + r() * 120; S.dabs(g, { x: x - 18, y: y - 26, w: 36, h: 26, n: 14, cols: ['#5a6a3a', '#7a8a52', '#3a4a2a', '#a8b07a'], r0: 5, r1: 11, sq: .7, a0: .5, a1: .9, seed: i + 650 }); g.fillStyle = '#4a3020'; g.fillRect(x - 1.5, y - 6, 3, 10); }
    S.dabs(g, { x: 0, y: 1230, w, h: 70, n: 200, cols: ['#6a4a32', '#3a2418', '#8a6242'], r0: 10, r1: 30, sq: .5, a0: .4, a1: .8, seed: 31 });
    const hz = g.createLinearGradient(0, 880, 0, 1000); hz.addColorStop(0, 'rgba(255,210,170,0)'); hz.addColorStop(1, 'rgba(255,200,160,.25)'); g.fillStyle = hz; g.fillRect(760, 880, 520, 120);
  });

  // ======================== THE GATE (medium close on Boabdil) ========================
  VP.set('gate', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#4a5a8a'], [.5, '#e8a088'], [1, '#ffd8a0']]);
    S.dabs(g, { x: 0, y: 0, w, h: 300, n: 300, cols: ['#ffd0b0', '#c890a8'], r0: 30, r1: 120, sq: .12, a0: .04, a1: .1, seed: 41 });
    // the great gate fills the frame
    const wall = '#c46c4c', sh = '#6a3026';
    g.fillStyle = wall; g.fillRect(300, 0, 980, h);
    S.strokes(g, { x: 300, y: 0, w: 980, h, n: 2600, cols: ['#e08868', '#8a4232', '#d8785a', '#f0a080'], l0: 6, l1: 18, ang: 0, jit: .15, w0: 1.5, w1: 3, a0: .12, a1: .35, seed: 43 });
    // brick courses
    g.strokeStyle = S.rgba('#7a3a2a', .35); g.lineWidth = 1.5; for (let y = 20; y < h; y += 26) { g.beginPath(); g.moveTo(300, y); g.lineTo(w, y); g.stroke(); }
    // tiled frame and the horseshoe arch
    const A = arch(820, 760, 420, 600);
    g.save(); g.lineWidth = 34; g.strokeStyle = '#e8c890'; g.stroke(A); g.lineWidth = 14; g.strokeStyle = '#2f6b5a'; g.stroke(A); g.restore();
    g.save(); g.clip(A); const dk = g.createLinearGradient(0, 160, 0, h); dk.addColorStop(0, '#1e0e0a'); dk.addColorStop(1, '#3a2018'); g.fillStyle = dk; g.fillRect(0, 0, w, h);
    // light at the far end of the passage
    S.glow(g, 840, 600, 220, '#ffcf90', .35); g.fillStyle = '#5a3020'; g.fill(arch(840, 760, 160, 260)); S.glow(g, 840, 640, 120, '#ffe2b0', .6); g.restore();
    // voussoir stripes
    for (let i = 0; i < 22; i++) { const a0 = Math.PI * (.8 + i / 22 * 1.4), a1 = Math.PI * (.8 + (i + 1) / 22 * 1.4), r0 = 228, r1 = 282, cx = 820, cy = 370; g.fillStyle = i % 2 ? '#c8603e' : '#f0e0c0'; g.beginPath(); g.arc(cx, cy, r1, a0, a1); g.arc(cx, cy, r0, a1, a0, true); g.closePath(); g.fill(); g.strokeStyle = S.rgba('#5a2a1a', .5); g.lineWidth = 1.5; g.stroke(); }
    // calligraphy band and the hand symbol above the arch
    g.fillStyle = '#2f6b5a'; g.fillRect(560, 60, 520, 34); g.strokeStyle = '#e8c890'; g.lineWidth = 2; for (let i = 0; i < 26; i++) { const x = 572 + i * 19; g.beginPath(); g.moveTo(x, 86); g.quadraticCurveTo(x + 6, 64, x + 12, 80); g.stroke(); }
    // left: dark cypress and sky edge
    for (let i = 0; i < 3; i++) cypress(g, 80 + i * 90, 760, 380 - i * 50, '#2a3420', '#c89060');
    // ground
    g.fillStyle = '#9a7a56'; g.fillRect(0, 640, w, 80);
    S.strokes(g, { x: 0, y: 640, w, h: 80, n: 500, cols: ['#c8a478', '#6a5032'], l0: 6, l1: 16, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .5, seed: 47 });
  });

  // ======================== THE MOOR'S LAST SIGH (rebuild the approved style frame at 2x) ========================
  VP.fromScene = (name, scene) => VP.set(name, 1280, 720, g => { const off0 = S.off; S.off = (w, h, fn) => { fn(g, w, h); return null; }; try { const sc = S.SCENES[scene]; sc.bg = null; sc.init(); } finally { S.off = off0; } });
  VP.fromScene('sigh', 'es1-sigh');

  // ======================== THE MAP ========================
  const LL = (lon, lat) => [250 + (lon + 10) * 55, 80 + (44 - lat) * 60];
  X.LL = LL;
  const IB = [[-1.25, 44.6], [4.5, 44.6], [4.5, 43.5], [3.1, 43.1], [3.2, 42.3], [3.0, 41.9], [2.2, 41.4], [1.0, 41.1], [0.2, 40.2], [-0.3, 39.5], [0.2, 38.8], [-0.5, 38.3], [-0.8, 37.6], [-1.6, 37.3], [-2.1, 36.7], [-3.5, 36.7], [-4.4, 36.7], [-5.0, 36.4], [-5.6, 36.0], [-6.0, 36.3], [-6.4, 36.8], [-7.0, 37.2], [-7.9, 37.0], [-8.9, 37.0], [-8.8, 38.0], [-9.4, 38.7], [-9.0, 39.6], [-8.7, 40.7], [-8.8, 42.0], [-9.3, 43.0], [-8.0, 43.7], [-5.8, 43.6], [-3.8, 43.45], [-1.8, 43.4]].map(q => LL(q[0], q[1]));
  const AF = [[-10.5, 34.0], [-6.4, 34.0], [-6.4, 35.0], [-6.2, 35.5], [-5.9, 35.8], [-5.3, 35.9], [-4.5, 35.2], [-3.0, 35.3], [-2.0, 35.1], [-1.0, 35.6], [0.5, 35.9], [2.0, 36.5], [4.5, 36.9], [4.5, 34.0]].map(q => LL(q[0], q[1]));
  X.IBERIA = IB; X.AFRICA = AF;
  VP.set('map', 1280, 720, (g, w, h) => {
    g.fillStyle = '#2a1a10'; g.fillRect(0, 0, w, h);
    // parchment
    const pp = S.poly([[60, 40], [640, 22], [1222, 44], [1250, 360], [1226, 684], [640, 700], [52, 680], [34, 360]]);
    const pg = g.createLinearGradient(0, 0, w, h); pg.addColorStop(0, '#ecd9ac'); pg.addColorStop(1, '#d8bd88'); g.fillStyle = pg; g.fill(pp);
    g.save(); g.clip(pp);
    S.dabs(g, { x: 0, y: 0, w, h, n: 600, cols: ['#c8a46a', '#f4e4c0', '#b8925a'], r0: 20, r1: 90, sq: .6, a0: .04, a1: .12, seed: 51 });
    // sea wash
    g.fillStyle = S.rgba('#7aa0a0', .35); g.fillRect(0, 0, w, h);
    S.strokes(g, { x: 0, y: 0, w, h, n: 900, cols: ['#5a8a8c', '#9ac0b8'], l0: 10, l1: 30, ang: 0, jit: .15, w0: 1, w1: 3, a0: .08, a1: .2, seed: 53 });
    // land
    for (const L of [IB, AF]) { const p = S.poly(L, false); g.fillStyle = '#e2c890'; g.fill(p); g.save(); g.clip(p); S.dabs(g, { x: 0, y: 0, w, h, n: 500, cols: ['#c8a868', '#f0dca8', '#a88a54'], r0: 8, r1: 40, sq: .5, a0: .1, a1: .25, seed: 55 }); g.restore();
      g.strokeStyle = '#6a4a2a'; g.lineWidth = 2.4; g.stroke(p); g.strokeStyle = S.rgba('#4a7a7a', .35); g.lineWidth = 8; g.stroke(p); }
    // mountains as little hatched peaks
    g.strokeStyle = S.rgba('#6a4a2a', .7); g.lineWidth = 1.6;
    for (let i = 0; i < 60; i++) { const r = S.rng(i + 80), lon = -8 + r() * 10, lat = 37 + r() * 6, [x, y] = LL(lon, lat); if (!g.isPointInPath(S.poly(IB, false), x * 2, y * 2)) continue; g.beginPath(); g.moveTo(x - 7, y + 4); g.lineTo(x, y - 6); g.lineTo(x + 7, y + 4); g.stroke(); }
    // rivers
    g.strokeStyle = S.rgba('#4a7a8a', .6); g.lineWidth = 2;
    for (const R of [[[-8.6, 41.1], [-6.0, 41.5], [-3.5, 41.6], [-2.5, 41.9]], [[-9.2, 38.7], [-6.5, 39.6], [-4.0, 39.9], [-2.0, 40.6]], [[-6.3, 36.8], [-5.0, 37.6], [-3.5, 37.9], [-2.6, 38.0]], [[0.8, 40.7], [-0.9, 41.6], [-2.5, 42.6]]]) { g.beginPath(); R.forEach((q, i) => { const [x, y] = LL(q[0], q[1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); }
    g.restore();
    g.strokeStyle = '#7a5a34'; g.lineWidth = 3; g.stroke(pp);
    // compass rose
    g.save(); g.translate(1130, 150); g.strokeStyle = '#6a4a2a'; g.lineWidth = 1.5; g.beginPath(); g.arc(0, 0, 40, 0, TAU); g.stroke(); g.fillStyle = '#8a3a2a'; g.beginPath(); g.moveTo(0, -52); g.lineTo(7, 0); g.lineTo(0, 52); g.lineTo(-7, 0); g.fill(); g.fillStyle = '#6a4a2a'; g.beginPath(); g.moveTo(-52, 0); g.lineTo(0, 7); g.lineTo(52, 0); g.lineTo(0, -7); g.fill(); g.restore();
  });

  // ======================== CORDOBA AT DUSK (left half) and A NORTHERN TOWN (right half) ========================
  VP.CORDOBA_LAMPS = [[100, 330], [250, 330], [400, 330], [560, 330], [720, 330], [880, 330], [1030, 330], [1180, 330]];
  VP.set('cordoba', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#26345e'], [.4, '#6a5a8a'], [.7, '#d88a6a'], [1, '#f2b880']]);
    S.dabs(g, { x: 0, y: 0, w, h: 260, n: 200, cols: ['#8a7aa8', '#d89a8a'], r0: 30, r1: 120, sq: .12, a0: .05, a1: .12, seed: 61 });
    // mosque minaret and domes far off
    tower(g, 900, 300, 50, 210, '#e8d4b4', '#a8906c', '#fff0d8'); g.fillStyle = '#e8d4b4'; g.fillRect(888, 72, 24, 20); g.fillStyle = '#c8a04a'; g.beginPath(); g.arc(900, 70, 9, Math.PI, 0); g.fill();
    for (const [x, r] of [[300, 60], [450, 44], [600, 52], [1100, 48]]) { g.fillStyle = '#d8c4a0'; g.beginPath(); g.arc(x, 300, r, Math.PI, 0); g.fill(); g.fillStyle = S.rgba('#8a6a5a', .4); g.beginPath(); g.arc(x + r * .3, 300, r * .7, Math.PI * 1.3, 0); g.fill(); }
    // white walls with arcades both sides of the street
    g.fillStyle = '#f2e6d0'; g.fillRect(0, 280, w, 300);
    S.strokes(g, { x: 0, y: 280, w, h: 300, n: 900, cols: ['#ffffff', '#d8c4a4', '#e8d8bc'], l0: 6, l1: 18, ang: 0, jit: .2, w0: 1, w1: 3, a0: .1, a1: .3, seed: 63 });
    for (let i = 0; i < 10; i++) { const x = 60 + i * 130; g.fillStyle = '#5a3a2a'; g.fill(arch(x, 520, 80, 150)); g.lineWidth = 6; g.strokeStyle = '#c8704e'; g.stroke(arch(x, 520, 92, 160)); g.strokeStyle = '#f0e0c0'; g.lineWidth = 2; g.stroke(arch(x, 520, 92, 160)); }
    // tile band
    for (let i = 0; i < w / 16; i++) { g.fillStyle = ['#2f6b8a', '#e8c070', '#2f7a5a', '#f0e8d4'][i % 4]; g.fillRect(i * 16, 540, 16, 16); }
    // paved street
    const st = g.createLinearGradient(0, 556, 0, h); st.addColorStop(0, '#b8a080'); st.addColorStop(1, '#8a7258'); g.fillStyle = st; g.fillRect(0, 556, w, h - 556);
    for (let y = 566; y < h; y += 16) for (let x = (y / 16 % 2) * 14; x < w; x += 28) { g.fillStyle = S.rgba(S.mix('#d8c0a0', '#6a5440', S.rng(x * 7 + y)()), .5); g.beginPath(); g.ellipse(x, y, 12, 6, 0, 0, TAU); g.fill(); }
    // fountain in the middle
    g.fillStyle = '#2f7a8a'; g.beginPath(); g.ellipse(640, 640, 110, 26, 0, 0, TAU); g.fill(); g.strokeStyle = '#f0e0c0'; g.lineWidth = 6; g.stroke();
    for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#2f6b8a' : '#e8c070'; g.fillRect(532 + i * 15.5, 640, 15, 14); }
    g.fillStyle = '#e8dcc4'; g.fillRect(632, 584, 16, 56); g.beginPath(); g.ellipse(640, 586, 30, 8, 0, 0, TAU); g.fill();
    // potted plants
    for (const x of [30, 180, 400, 880, 1100, 1250]) { g.fillStyle = '#b8603a'; g.fillRect(x - 12, 600, 24, 26); S.dabs(g, { x: x - 22, y: 570, w: 44, h: 34, n: 20, cols: ['#3a6a3a', '#5a8a4a', '#d84a5a'], r0: 4, r1: 9, sq: .7, a0: .6, a1: .9, seed: x }); }
    // lamp posts (lit later in the shot)
    for (const [x, y] of VP.CORDOBA_LAMPS) { g.strokeStyle = '#2a1a10'; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y + 10); g.lineTo(x, y + 26); g.stroke(); g.fillStyle = '#3a2a1a'; g.beginPath(); g.moveTo(x - 9, y); g.lineTo(x + 9, y); g.lineTo(x + 6, y + 14); g.lineTo(x - 6, y + 14); g.closePath(); g.fill(); }
  });
  VP.set('north', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#2a2e36'], [.6, '#4a4e56'], [1, '#5a5a5a']]);
    S.dabs(g, { x: 0, y: 0, w, h: 360, n: 400, cols: ['#3a3e46', '#5a5e66', '#22262e'], r0: 40, r1: 140, sq: .3, a0: .1, a1: .3, seed: 71 });
    ridge(g, 330, 40, 120, 73, '#2e3236', w);
    // crooked timber and stone huts with thatch
    const hut = (x, y, ww, hh, seed) => { const r = S.rng(seed); g.fillStyle = '#5a5248'; g.fillRect(x, y - hh, ww, hh); S.dabs(g, { x, y: y - hh, w: ww, h: hh, n: 40, cols: ['#3a342e', '#6a6258', '#4a4038'], r0: 4, r1: 10, sq: .6, a0: .3, a1: .6, seed });
      g.fillStyle = '#4a3e2a'; g.beginPath(); g.moveTo(x - 14, y - hh); g.lineTo(x + ww * .5 + (r() - .5) * 10, y - hh - hh * .8); g.lineTo(x + ww + 14, y - hh); g.closePath(); g.fill();
      S.strokes(g, { x: x - 10, y: y - hh - hh * .8, w: ww + 20, h: hh * .8, n: 80, cols: ['#6a5a3a', '#2a2214'], l0: 8, l1: 18, ang: 1.4, jit: .3, w0: 1, w1: 2, a0: .3, a1: .6, seed: seed + 1 });
      g.fillStyle = '#1e1a16'; g.fillRect(x + ww * .4, y - hh * .6, ww * .22, hh * .6); };
    hut(-40, 470, 170, 110, 74); hut(340, 470, 170, 110, 75); hut(600, 440, 120, 80, 77); hut(820, 480, 200, 130, 79); hut(1130, 450, 150, 100, 83);
    // a dim window
    g.fillStyle = '#a07a3a'; g.fillRect(890, 410, 22, 18);
    // mud, puddles, ruts
    const md = g.createLinearGradient(0, 460, 0, h); md.addColorStop(0, '#4a3e30'); md.addColorStop(1, '#2e261e'); g.fillStyle = md; g.fillRect(0, 460, w, h - 460);
    S.strokes(g, { x: 0, y: 470, w, h: 250, n: 900, cols: ['#5a4a38', '#1e1812', '#6a5a46'], l0: 10, l1: 30, ang: 0, jit: .3, w0: 2, w1: 5, a0: .2, a1: .5, seed: 81 });
    for (const [x, y, rx] of [[200, 600, 90], [520, 660, 120], [680, 530, 60], [1000, 620, 110]]) { g.fillStyle = S.rgba('#6a7480', .55); g.beginPath(); g.ellipse(x, y, rx, rx * .18, 0, 0, TAU); g.fill(); g.fillStyle = S.rgba('#9aa4ae', .25); g.beginPath(); g.ellipse(x - rx * .2, y - 2, rx * .5, rx * .06, 0, 0, TAU); g.fill(); }
    // a broken fence
    g.strokeStyle = '#2a2016'; g.lineWidth = 5; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(320 + i * 34, 520); g.lineTo(324 + i * 34 + (i % 2) * 6, 470); g.stroke(); } g.lineWidth = 4; g.beginPath(); g.moveTo(310, 492); g.lineTo(500, 488); g.stroke();
  });

  // ======================== QUICK CARDS: the beach, the library, the keys ========================
  VP.set('beach', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a4a7a'], [.45, '#e8a080'], [.6, '#ffd8a0'], [1, '#e8c890']]);
    S.glow(g, 960, 360, 300, '#ffe0a0', .6);
    // African mountains far behind across the strait
    ridge(g, 370, 50, 140, 91, '#9a7a8a', w);
    // the sea
    const sea = g.createLinearGradient(0, 380, 0, 520); sea.addColorStop(0, '#5a7a9a'); sea.addColorStop(1, '#2f5a6a'); g.fillStyle = sea; g.fillRect(0, 380, w, 140);
    S.strokes(g, { x: 0, y: 380, w, h: 140, n: 600, cols: ['#ffe0b0', '#8ab0c0', '#1e3a4a'], l0: 10, l1: 40, ang: 0, jit: .05, w0: 1, w1: 2.4, a0: .2, a1: .5, seed: 93 });
    // sand
    const sd = g.createLinearGradient(0, 500, 0, h); sd.addColorStop(0, '#e8cc98'); sd.addColorStop(1, '#c8a46a'); g.fillStyle = sd; g.beginPath(); g.moveTo(0, 530); g.bezierCurveTo(400, 500, 800, 520, w, 500); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
    S.strokes(g, { x: 0, y: 500, w, h: 220, n: 900, cols: ['#f4e0b4', '#b08a58'], l0: 6, l1: 16, ang: 0, jit: .2, w0: 1, w1: 2, a0: .2, a1: .5, seed: 95 });
    // foam line
    g.strokeStyle = S.rgba('#ffffff', .7); g.lineWidth = 3; g.beginPath(); g.moveTo(0, 528); g.bezierCurveTo(400, 498, 800, 518, w, 498); g.stroke();
    // the Rock of Gibraltar on the left
    g.fillStyle = '#7a6a6a'; g.beginPath(); g.moveTo(0, 520); g.lineTo(0, 210); g.bezierCurveTo(80, 200, 160, 240, 240, 330); g.bezierCurveTo(300, 400, 340, 470, 380, 520); g.closePath(); g.fill();
    S.dabs(g, { x: 0, y: 200, w: 380, h: 320, n: 400, cols: ['#9a8a84', '#5a4a4a', '#b8a4a0', '#5a6a4a'], r0: 6, r1: 18, sq: .6, ang: .8, a0: .2, a1: .5, seed: 97, mask: (x, y) => y > 210 + x * .8 });
  });
  VP.set('library', 1280, 720, (g, w, h) => {
    g.fillStyle = '#3a2418'; g.fillRect(0, 0, w, h);
    // arcade of striped arches (like the mosque of Cordoba)
    for (let i = 0; i < 6; i++) { const x = 110 + i * 212; for (let j = 0; j < 18; j++) { const a = Math.PI * (1 + j / 17), r0 = 70, r1 = 100; g.strokeStyle = j % 2 ? '#c8503a' : '#f0e0c0'; g.lineWidth = 12; g.beginPath(); g.moveTo(x + Math.cos(a) * r0, 200 + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, 200 + Math.sin(a) * r1); g.stroke(); }
      g.fillStyle = '#d8b890'; g.fillRect(x - 108, 200, 16, 420); g.fillRect(x + 92, 200, 16, 420); }
    // shelves of books and scrolls
    for (let s = 0; s < 3; s++) for (let i = 0; i < 6; i++) { const x0 = 20 + i * 212, y = 300 + s * 100; g.fillStyle = '#5a3420'; g.fillRect(x0, y + 70, 170, 10);
      for (let b = 0; b < 14; b++) { const r = S.rng(s * 100 + i * 14 + b), bw = 8 + r() * 6, bh = 40 + r() * 28; g.fillStyle = ['#8a2a22', '#2f5a4a', '#c8963a', '#4a3a6a', '#6a4a2a', '#e8d8b0'][Math.floor(r() * 6)]; g.fillRect(x0 + 6 + b * 11.5, y + 70 - bh, bw, bh); g.fillStyle = S.rgba('#ffe0a0', .3); g.fillRect(x0 + 6 + b * 11.5, y + 70 - bh, 2, bh); } }
    // tiled floor
    for (let y = 620; y < h; y += 20) for (let x = 0; x < w; x += 20) { g.fillStyle = (x / 20 + y / 20) % 2 ? '#8a5a3a' : '#c8a070'; g.fillRect(x, y, 20, 20); }
    // a reading desk
    g.fillStyle = '#5a3420'; g.fillRect(560, 560, 220, 16); g.fillRect(570, 576, 12, 70); g.fillRect(758, 576, 12, 70);
    g.fillStyle = '#f2e6c8'; g.beginPath(); g.moveTo(600, 560); g.quadraticCurveTo(650, 540, 670, 556); g.quadraticCurveTo(690, 540, 740, 560); g.closePath(); g.fill();
    g.strokeStyle = S.rgba('#3a2a1a', .5); g.lineWidth = 1; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(610, 552 + i * 1.5); g.lineTo(660, 550 + i * 1.5); g.moveTo(680, 550 + i * 1.5); g.lineTo(730, 552 + i * 1.5); g.stroke(); }
  });
  VP.set('stone', 1280, 720, (g, w, h) => {
    const fl = g.createLinearGradient(0, 0, 0, h); fl.addColorStop(0, '#5a4a3e'); fl.addColorStop(1, '#3a2c22'); g.fillStyle = fl; g.fillRect(0, 0, w, h);
    // big worn flagstones in perspective
    for (let r = 0; r < 6; r++) for (let i = -2; i < 8; i++) { const y0 = 140 + r * r * 18 + r * 50, y1 = 140 + (r + 1) * (r + 1) * 18 + (r + 1) * 50, x0 = 640 + (i * 200 - 640) * (1 + r * .25), x1 = 640 + ((i + 1) * 200 - 640) * (1 + r * .25);
      g.fillStyle = S.mix('#8a7462', '#5a4a3c', S.rng(r * 10 + i + 50)()); g.beginPath(); g.moveTo(x0 + 4, y0 + 3); g.lineTo(x1 - 4, y0 + 3); g.lineTo(640 + ((i + 1) * 200 - 640) * (1 + (r + 1) * .25) - 4, y1 - 3); g.lineTo(640 + (i * 200 - 640) * (1 + (r + 1) * .25) + 4, y1 - 3); g.closePath(); g.fill(); }
    S.dabs(g, { x: 0, y: 0, w, h, n: 800, cols: ['#9a8470', '#3a2c20', '#b8a088'], r0: 4, r1: 18, sq: .6, a0: .1, a1: .3, seed: 111 });
    S.strokes(g, { x: 0, y: 0, w, h, n: 400, cols: ['#2a1e16'], l0: 8, l1: 30, ang: .3, jit: 1.5, w0: 1, w1: 2, a0: .2, a1: .4, seed: 113 });
    S.glow(g, 640, 420, 500, '#ffcf90', .18);
  });

  // ======================== shared props ========================
  // the iron key of Granada (drawn along +x from the bow at 0,0; s = length)
  X.key = (c, s, Lt, glint = 0) => {
    const tn = S.tone(['#5a5a62', '#22222a'], Lt), cel = p => S.cel(c, p, { base: tn.base, shade: tn.shade, rim: tn.rim, L: Lt.L, sw: s * .05, rw: Math.max(1, s * .02), ink: '#141418', lw: Math.max(1, s * .015) });
    const bow = new Path2D(); bow.ellipse(0, 0, s * .16, s * .13, 0, 0, TAU); bow.ellipse(0, 0, s * .09, s * .07, 0, 0, TAU);
    c.save(); c.fillStyle = tn.base; c.fill(bow, 'evenodd'); c.strokeStyle = '#141418'; c.lineWidth = Math.max(1, s * .015); c.stroke(bow); c.restore();
    cel(S.poly([[s * .14, -s * .035], [s * .96, -s * .03], [s * .96, s * .03], [s * .14, s * .035]], false));
    cel(S.poly([[s * .72, s * .02], [s * .86, s * .02], [s * .86, s * .2], [s * .8, s * .2], [s * .8, s * .12], [s * .76, s * .12], [s * .76, s * .2], [s * .72, s * .2]], false));
    c.fillStyle = '#c8a04a'; c.fillRect(s * .18, -s * .05, s * .05, s * .1);
    if (glint > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(s * .45, -s * .03); c.rotate(glint * 2); c.fillStyle = S.rgba('#fff6e0', glint); for (const r of [0, Math.PI / 2]) { c.save(); c.rotate(r); c.beginPath(); c.moveTo(-s * .25 * glint, 0); c.lineTo(0, -s * .02); c.lineTo(s * .25 * glint, 0); c.lineTo(0, s * .02); c.fill(); c.restore(); } S.glow(c, 0, 0, s * .2, '#fff0c0', glint * .8); c.restore(); }
  };
})(window);
