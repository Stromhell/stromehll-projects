for (const n of ['market', 'corkboard', 'chai_stall']) K.load(n, PL + n + '.jpg');
endTitle(4.2);
const crowd = [0, 1, 2, 3, 4].map(i => ({ x: 600, y: 1290 + (i % 3) * 50, s: 1.62 + (i % 3) * .08, ...MX.SHOPKEEPER(i), facing: i % 2 ? -1 : 1, mood: 'happy', walk: { x0: i % 2 ? 2800 + i * 120 : -300 - i * 140, x1: i % 2 ? -300 : 2800, t0: i * .9, dur: 9 } }));
const cracked = (c, x, y, s, lt) => { MX.phone(c, x, y, s, { kind: 'canvas', col: OR, logo: 'MICROMAX', logoCol: '#fff' }); c.save(); c.translate(x, y - 160 * s); c.strokeStyle = '#f8f8f8'; c.lineWidth = 4; c.beginPath(); c.moveTo(-50 * s, -100 * s); c.lineTo(-10 * s, -30 * s); c.lineTo(-40 * s, 20 * s); c.lineTo(10 * s, 70 * s); c.moveTo(-10 * s, -30 * s); c.lineTo(50 * s, -60 * s); c.stroke(); c.restore(); };

window.SHOTS = [
  // 0.01 a busy phone market; orange banners everywhere; 2014
  { plate: 'market', cam: { z: [1.04, 1.12], x: [1280, 1300], y: [820, 800] }, bed: [['crowd_loop', .3], ['city_loop', .2]],
    figs: crowd,
    init: S => { const tO = A.at(S, 'outsold', 2), tM = A.at(S, 'Micromax', 5);
      S.D.over = [(c, lt) => K.dateTag(c, '2014', lt, { at: .3 }), (c, lt) => K.card(c, 'OUTSOLD SAMSUNG IN INDIA', lt, { at: tO, x: 560, y: 560, px: 46, rot: -3 }), (c, lt) => { const a = pop(lt, tM, .5); if (a > 0) MX.banner(c, 1380, 470, 380 * a, OR, 'MICROMAX', { px: 56 }); }];
      S.D.sfx = [[.3, 'phone_ring', .2], [tO, 'pop', .35], [tM, 'whoosh', .35], [tM + .2, 'crowd_cheer', .25]]; } },
  // 0.02 a billboard with a star in a suit holding the phone (silhouette, no likeness); a cricket boundary board
  { draw: (c, lt, u, S) => { backdrop('market', .55, 6)(c);
      const a = pop(lt, .2, .5); if (a > 0) { c.save(); c.translate(700, 520); c.scale(a, a); c.fillStyle = '#3a3a3a'; c.fillRect(-20, 120, 40, 340); c.fillStyle = OR; c.strokeStyle = INK; c.lineWidth = 8; c.fillRect(-460, -300, 920, 440); c.strokeRect(-460, -300, 920, 440);
        c.fillStyle = '#1a1a1e'; c.beginPath(); c.arc(-220, -150, 70, 0, 7); c.fill(); c.beginPath(); c.moveTo(-340, 140); c.lineTo(-310, -60); c.quadraticCurveTo(-220, -100, -130, -60); c.lineTo(-100, 140); c.fill(); MX.phone(c, -60, 40, .6, { kind: 'canvas', col: '#2a2a2e' }); MX.label(c, 'BIG SCREEN. BIG STAR.', 180, -150, 50, '#fff'); MX.label(c, 'MICROMAX', 180, -60, 70, '#fff'); c.restore(); }
      const b = pop(lt, S.tA, .5); if (b > 0) { c.save(); c.translate(1420, 840); c.scale(b, b); for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? '#3a8a44' : '#4a9a50'; c.beginPath(); c.moveTo(-600 + k * 150, 40); c.lineTo(-450 + k * 150, 40); c.lineTo(-420 + k * 170, 260); c.lineTo(-600 + k * 170, 260); c.fill(); } c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(-600, 36, 1200, 8); c.fillStyle = '#f4f0e4'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-480, -110, 960, 150); c.strokeRect(-480, -110, 960, 150); MX.label(c, 'ASIA CUP', -220, -36, 70, '#1a4a8a'); MX.label(c, 'MICROMAX', 220, -36, 70, OR); c.restore(); }
      if (lt > S.tA + .6) { const t = (lt - S.tA - .6) % 1.6, bx = 1900 - t * 900, by = 700 - Math.sin(t / 1.6 * Math.PI) * 300; c.fillStyle = '#c8281e'; c.beginPath(); c.arc(bx, by, 18, 0, 7); c.fill(); c.strokeStyle = '#f4f0e4'; c.lineWidth = 3; c.beginPath(); c.arc(bx, by, 12, -1, 1); c.stroke(); } },
    bed: [['crowd_loop', .3]],
    init: S => { S.tA = A.at(S, 'Asia Cup', 3);
      S.D.over = [(c, lt) => K.card(c, 'A HOLLYWOOD STAR IN ITS ADS', lt, { at: .8, x: 700, y: 140, px: 40, rot: -2 }), (c, lt) => K.card(c, "ITS NAME ON CRICKET'S ASIA CUP", lt, { at: S.tA + .3, x: 1420, y: 560, px: 40, rot: 3 })];
      S.D.sfx = [[.2, 'pop', .35], [S.tA, 'crowd_cheer', .35], [S.tA + .6, 'hit', .35]]; } },
  // 0.03 the crime board: three suspects
  { plate: 'corkboard', cam: { z: [1.02, 1.1], x: [1280, 1280], y: [720, 700] }, bed: [['tension', .25]],
    init: S => { const tF = A.at(S, 'Five years', .4), tW = A.at(S, 'Who killed', 3.6);
      S.D.over = [(c, lt) => { const ph = [[440, 520, 'SUSPECT 1', (c2) => { ['#ff7a00', '#1a8a5a', '#3a6ae8'].forEach((col, k) => { c2.fillStyle = col; c2.beginPath(); c2.arc(-60 + k * 60, 0, 34, 0, 7); c2.fill(); }); }, -.06], [960, 470, 'SUSPECT 2', (c2) => MX.sim(c2, 0, 0, .9, BLUE, { label: '4G' }), .03], [1480, 520, 'SUSPECT 3', (c2) => MX.label(c2, '?', 0, 0, 150, '#f4f0e4'), .07]];
          ph.forEach(([x, y, l, d, r], k) => { const a = pop(lt, tF + .5 + k * .5); if (a > 0) MX.photo(c, x, y, a * 1.15, l, d, { rot: r }); }); MX.string(c, [[440, 380], [960, 330], [1480, 380]], K.seg(lt, tW - .6, tW + .6)); },
        (c, lt) => K.card(c, 'FIVE YEARS LATER: ALMOST NO MARKET LEFT', lt, { at: tF, x: 960, y: 120, px: 40, rot: -2 }), (c, lt) => K.title(c, 'WHO KILLED MICROMAX?', lt, { at: tW, y: 900, px: 90 })];
      S.D.sfx = [[tF + .5, 'pop', .3], [tF + 1, 'pop', .3], [tF + 1.5, 'pop', .3], [tW, 'hit', .5], [tW + .1, 'tension', .3]]; } },
  // 0.04 title over a cracked orange phone
  { draw: (c, lt) => { backdrop('chai_stall', .3, 10)(c); const a = E.back(K.seg(lt, .1, .7)); if (a > 0) { c.save(); MX.glow(c, 960, 520, 520, '#e8661a', .35); c.restore(); cracked(c, 960, 760, 1.5 * a, lt); } },
    sub: 'off', inSfx: 'whoosh', bed: [['drone', .25]],
    over: [(c, lt) => K.title(c, 'WHO KILLED MICROMAX?', lt, { at: .8, y: 150, px: 110 })], sfx: [[.3, 'scrape', .5], [.8, 'hit', .7], [.9, 'swell', .4]] },
];
