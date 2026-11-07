// New Year history cast: Babylonians, Egyptians, a Chinese family, Romans (Numa, Caesar, senators, a stonemason),
// a medieval monk and villagers, Pope Gregory XIII and astronomers, Georgian Londoners (the sleeper in his nightcap),
// Russians in 1918, and a modern party crowd in paper hats.
// New headwear: laurel wreath, king's circlet, Babylonian round cap, monk hood, nightcap, tricorne, ushanka, party cone, beanie.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  const H = {};
  H.laurel = fit((c, u, f, Lt, k) => { const t = k.tone(T('#5a8a3a', '#2a4a1a', '#b8e08a'), Lt);
    for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * .1), x = Math.cos(a) * .7 * u, y = Math.sin(a) * .5 * u - .5 * u; c.save(); c.translate(x, y); c.rotate(a + Math.PI / 2 + .5); c.fillStyle = i % 2 ? t.base : t.shade; c.beginPath(); c.ellipse(0, 0, .09 * u, .2 * u, 0, 0, TAU); c.fill(); c.restore(); } }, 1, 0);
  H.circlet = fit((c, u, f, Lt, k) => { const t = k.tone(T('#d8b040', '#8a6a1a', '#fff0a0'), Lt);
    k.celT(c, P([[-.66, -.5], [-.66, -.7], [-.4, -.9], [-.2, -.7], [0, -.95], [.2, -.7], [.4, -.9], [.66, -.7], [.66, -.5]], u), t, Lt, u, { swk: .6 }); c.fillStyle = '#c8281e'; c.beginPath(); c.arc(0, -.62 * u, .06 * u, 0, TAU); c.fill(); }, .8, .02);
  H.babcap = (col) => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#2a4a8a', '#142448', '#7a9ae0'), Lt);
    k.celT(c, P([[-.66, -.5], [-.64, -1.0], [0, -1.08], [.64, -1.0], [.66, -.5]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = '#d8b040'; c2.fillRect(-.66 * u, -.6 * u, 1.32 * u, .08 * u); } }); }, .74, .02);
  H.hood = (col) => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#6a4a32', '#34241a', '#a8886a'), Lt);
    k.celT(c, P(k.front ? [[-.9, .6], [-.92, -.4], [-.6, -1.05], [0, -1.2], [.6, -1.05], [.92, -.4], [.9, .6], [.66, .5], [.68, -.4], [0, -.8], [-.68, -.4], [-.66, .5]] : [[-.92, .6], [-.94, -.5], [-.5, -1.1], [.3, -1.16], [.7, -.8], [.5, -.4], [.2, -.7], [-.4, -.6], [-.6, .6]], u), t, Lt, u, { swk: .7 }); }, 1, 0);
  H.nightcap = fit((c, u, f, Lt, k) => { const t = k.tone(T('#e8e4dc', '#a8a49c', '#ffffff'), Lt);
    k.celT(c, P([[-.68, -.5], [-.6, -.9], [-.1, -1.1], [.5, -1.3], [.9, -1.1], [1.1, -.7], [.7, -.9], [.2, -.86], [.66, -.6], [.68, -.5]], u), t, Lt, u, { swk: .6 }); c.fillStyle = '#e8e4dc'; c.beginPath(); c.arc(1.12 * u, -.66 * u, .12 * u, 0, TAU); c.fill(); }, .78, .02);
  H.tricorne = fit((c, u, f, Lt, k) => { const t = k.tone(T('#26222a', '#0a080c', '#6a6474'), Lt);
    k.celT(c, P([[-1.0, -.6], [-.6, -.74], [-.5, -1.08], [0, -1.16], [.5, -1.08], [.6, -.74], [1.0, -.6], [.5, -.56], [0, -.62], [-.5, -.56]], u), t, Lt, u, { swk: .7, over: c2 => { c2.strokeStyle = '#c8a040'; c2.lineWidth = .04 * u; c2.beginPath(); c2.moveTo(-.96, -.6 * u); c2.lineTo(.96 * u, -.6 * u); c2.stroke(); } }); }, .8, .02);
  H.ushanka = (col) => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#5a4a3a', '#2a2018', '#9a8a7a'), Lt), fr = k.tone(T('#8a7a6a', '#4a3e32', '#c8b8a8'), Lt);
    k.celT(c, P([[-.66, -.5], [-.66, -1.0], [0, -1.12], [.66, -1.0], [.66, -.5]], u), t, Lt, u, { swk: .7 });
    k.celT(c, P([[-.8, -.36], [-.84, -.74], [0, -.8], [.84, -.74], [.8, -.36], [0, -.46]], u), fr, Lt, u, { swk: .7 }); }, .8, .02);
  // party cone sits on the crown (base inside the hair line, like the beanie), tipped a little
  H.partycone = (a, b) => fit((c, u, f, Lt, k) => { c.save(); c.translate(0, -.55 * u); c.rotate(.12); c.translate(0, .55 * u); c.fillStyle = a; c.beginPath(); c.moveTo(-.56 * u, -.6 * u); c.lineTo(.04 * u, -1.95 * u); c.lineTo(.58 * u, -.6 * u); c.quadraticCurveTo(0, -.5 * u, -.56 * u, -.6 * u); c.closePath(); c.fill();
    c.strokeStyle = b; c.lineWidth = .1 * u; [[-.4, -.9, .44, -.9], [-.26, -1.28, .3, -1.28]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1 * u, y1 * u); c.lineTo(x2 * u, y2 * u); c.stroke(); });
    c.fillStyle = 'rgba(0,0,0,.18)'; c.beginPath(); c.moveTo(.04 * u, -1.95 * u); c.lineTo(.58 * u, -.6 * u); c.lineTo(.3 * u, -.56 * u); c.closePath(); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.arc(.04 * u, -1.97 * u, .14 * u, 0, TAU); c.fill(); c.restore(); }, .76, .02);
  H.beanie = (col) => fit((c, u, f, Lt, k) => { const t = k.tone(col, Lt); k.celT(c, P([[-.68, -.52], [-.64, -.96], [0, -1.12], [.64, -.96], [.68, -.52]], u), t, Lt, u, { swk: .6 }); c.fillStyle = '#ffffff'; c.beginPath(); c.arc(0, -1.16 * u, .14 * u, 0, TAU); c.fill(); }, .76, .02);
  H.zucchetto = fit((c, u, f, Lt, k) => { const t = k.tone(T('#ffffff', '#c8c4bc', '#ffffff'), Lt); k.celT(c, P([[-.5, -.82], [-.3, -.98], [.3, -.98], [.5, -.82]], u), t, Lt, u, { swk: .5 }); }, .9, .02);
  S.NYH = H;

  const SKF = X.SK.fair, SKO = X.SK.olive, SKE = X.SK.andean, BLK = X.HR.black, BRN = X.HR.brown, GRY = X.HR.grey;
  const SKD = T('#a8784e', '#6a4428', '#e0b088'), SKC = T('#e8c098', '#a87c5a', '#fff0d0'), SKB = T('#6a4a32', '#3a2618', '#a8805a');
  const BOOT = ['#3a2416', '#1a0e08'], SAND = ['#8a5a2a', '#4a2e14'], LIN = ['#f2ead6', '#b0a68c'];
  const man = o => Object.assign({}, CH.farmer, { skin: SKO, hair: 'neat', hairCol: BLK, mustache: false, beard: false, build: 'man', shoes: BOOT, headwear: null }, o);
  const woman = o => Object.assign({}, CH.seller, { skin: SKO, hair: 'bun', hairCol: BLK, headwear: null }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: SKO, hair: 'neat', hairCol: BLK, headwear: null }, o);
  const C = {
    // Babylon
    BAB: man({ skin: SKD, beard: true, mustache: true, shirt: ['#2a4a8a', '#142448'], pants: ['#2a4a8a', '#142448'], long: true, sleeves: true, shoes: SAND, headwear: H.babcap() }),
    BAB2: man({ skin: SKD, beard: true, shirt: ['#c8a040', '#7a5a1a'], pants: ['#c8a040', '#7a5a1a'], long: true, shoes: SAND, headwear: H.babcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    BABW: woman({ skin: SKD, shirt: ['#a83a3a', '#541a1a'], pants: ['#a83a3a', '#541a1a'], dupatta: ['#e8c870', '#a08838'], long: true }),
    FARMER: man({ skin: SKD, beard: true, shirt: ['#c8b490', '#8a7454'], pants: ['#8a6a4a', '#4a3424'], shoes: SAND, headwear: H.babcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    STORY: man({ skin: SKD, build: 'elder', hair: 'elder', hairCol: GRY, beard: true, shirt: ['#6a2a6a', '#341434'], pants: ['#6a2a6a', '#341434'], long: true, sleeves: true, shoes: SAND, headwear: H.babcap(T('#c8a040', '#7a5a1a', '#fff0a0')) }),
    BABKID: kid({ skin: SKD, shirt: ['#e8dcc0', '#a4987a'], pants: ['#8a6a4a', '#4a3424'] }),
    BABKID2: kid({ skin: SKD, hair: 'curly', shirt: ['#3a7a6a', '#1c3c34'], pants: ['#e8dcc0', '#a4987a'] }),
    // Egypt
    EGY: man({ skin: SKB, shirt: LIN, pants: LIN, bare: true, shoes: SAND }),
    EGY2: man({ skin: SKB, shirt: ['#e8dcc0', '#a49a7c'], pants: LIN, bare: true, shoes: SAND, headwear: S.SPX.turban ? null : null }),
    EGYW: woman({ skin: SKB, shirt: LIN, pants: LIN, long: true, hairCol: BLK }),
    // China
    CHN: man({ skin: SKC, mustache: true, shirt: ['#b8281e', '#5a120c'], pants: ['#2a2a3a', '#14141c'], long: true, sleeves: true }),
    CHNW: woman({ skin: SKC, shirt: ['#d8a020', '#7a5a10'], pants: ['#3a2a5a', '#1c142c'], long: true }),
    CHNKID: kid({ skin: SKC, shirt: ['#c8281e', '#641410'], pants: ['#2a2a3a', '#14141c'] }),
    CHNOLD: man({ skin: SKC, build: 'elder', hair: 'elder', hairCol: GRY, beard: true, shirt: ['#2a4a4a', '#142424'], pants: ['#2a4a4a', '#142424'], long: true, sleeves: true }),
    // Rome
    TOGA: man({ skin: SKO, hairCol: BRN, shirt: ['#f2ead6', '#b0a68c'], pants: ['#f2ead6', '#b0a68c'], long: true, shoes: SAND, tie: '#a82a22' }),
    TOGA2: man({ skin: SKF, hairCol: BLK, beard: true, shirt: ['#e8dcc4', '#a89a80'], pants: ['#e8dcc4', '#a89a80'], long: true, shoes: SAND, tie: '#2a4a8a' }),
    TOGA3: man({ skin: SKO, build: 'elder', hair: 'elder', hairCol: GRY, shirt: ['#f4f0e4', '#b8b0a0'], pants: ['#f4f0e4', '#b8b0a0'], long: true, shoes: SAND, tie: '#6a2a6a' }),
    ROMW: woman({ skin: SKO, hairCol: BRN, shirt: ['#5a7a9a', '#2a3c4c'], pants: ['#5a7a9a', '#2a3c4c'], long: true }),
    NUMA: man({ name: 'Numa', build: 'broad', skin: SKO, hairCol: GRY, beard: true, mustache: true, shirt: ['#6a2a6a', '#341434'], pants: ['#6a2a6a', '#341434'], long: true, sleeves: true, shoes: SAND, tie: '#c8a040', headwear: H.circlet }),
    CAESAR: man({ name: 'Julius Caesar', skin: SKO, hair: 'elder', hairCol: BRN, shirt: ['#f2ead6', '#b0a68c'], pants: ['#f2ead6', '#b0a68c'], long: true, shoes: SAND, tie: '#7a1a4a', headwear: H.laurel }),
    MASON: man({ skin: SKO, hairCol: BLK, beard: true, shirt: ['#8a6a4a', '#4a3424'], pants: ['#6a5a4a', '#342c24'], bare: true, rolled: true, shoes: SAND, headwear: H.laurel }),
    WORKMAN: man({ skin: SKF, hairCol: BRN, shirt: ['#a89070', '#6a5438'], pants: ['#6a5a4a', '#342c24'], shoes: SAND }),
    // Medieval Europe
    MONK: man({ skin: SKF, hairCol: BRN, shirt: ['#6a4a32', '#34241a'], pants: ['#6a4a32', '#34241a'], long: true, sleeves: true, headwear: H.hood() }),
    VILL: man({ skin: SKF, hairCol: BRN, beard: true, shirt: ['#5a6a3a', '#2c341c'], pants: ['#6a4a32', '#34241a'], sleeves: true, headwear: H.beanie(T('#8a2a22', '#441410', '#c87a6a')) }),
    VILLW: woman({ skin: SKF, hairCol: BRN, shirt: ['#7a3a3a', '#3c1c1c'], pants: ['#7a3a3a', '#3c1c1c'], dupatta: ['#e8e0cc', '#a8a08a'], long: true }),
    // 1582
    GREGORY: man({ name: 'Pope Gregory XIII', skin: SKF, build: 'elder', hair: 'elder', hairCol: GRY, beard: true, shirt: ['#f4f0e8', '#b8b4ac'], pants: ['#f4f0e8', '#b8b4ac'], long: true, sleeves: true, tie: '#a8202a', headwear: H.zucchetto }),
    ASTRO: man({ skin: SKF, beard: true, hairCol: BRN, shirt: ['#2a2a3a', '#14141c'], pants: ['#2a2a3a', '#14141c'], long: true, sleeves: true }),
    ASTRO2: man({ skin: SKO, build: 'elder', hair: 'elder', hairCol: GRY, beard: true, shirt: ['#8a1a2a', '#440c14'], pants: ['#8a1a2a', '#440c14'], long: true, sleeves: true }),
    // Britain 1752
    SLEEPER: man({ skin: SKF, hairCol: BRN, shirt: ['#f0ece4', '#b0aca4'], pants: ['#f0ece4', '#b0aca4'], long: true, sleeves: true, headwear: H.nightcap }),
    GENT: man({ skin: SKF, hairCol: T('#e8e4dc', '#a8a49c', '#ffffff'), shirt: ['#2a4a6a', '#142434'], pants: ['#e8dcc0', '#a49a7c'], sleeves: true, headwear: H.tricorne }),
    GENT2: man({ skin: SKF, hairCol: BRN, shirt: ['#7a2a22', '#3c1410'], pants: ['#2a2a32', '#141418'], sleeves: true, headwear: H.tricorne }),
    LONW: woman({ skin: SKF, hairCol: BRN, shirt: ['#5a7a5a', '#2c3c2c'], pants: ['#5a7a5a', '#2c3c2c'], long: true }),
    CLERKGB: man({ name: 'Clerk', skin: SKF, hairCol: T('#e8e4dc', '#a8a49c', '#ffffff'), shirt: ['#2a2a32', '#141418'], pants: ['#2a2a32', '#141418'], sleeves: true, glasses: true }),
    // Russia 1918
    RUSCLERK: man({ skin: SKF, hairCol: BRN, mustache: true, glasses: true, shirt: ['#3a3a44', '#1c1c22'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, headwear: H.ushanka() }),
    RUS1: man({ skin: SKF, beard: true, hairCol: BRN, shirt: ['#5a4a3a', '#2c241c'], pants: ['#3a3a3a', '#1c1c1c'], sleeves: true, long: true, headwear: H.ushanka(T('#3a3a3a', '#1a1a1a', '#7a7a7a')) }),
    RUSW: woman({ skin: SKF, hairCol: BRN, shirt: ['#7a2a3a', '#3c141c'], pants: ['#7a2a3a', '#3c141c'], dupatta: ['#c8281e', '#641410'], long: true }),
    // today
    PARTY: man({ skin: SKO, hairCol: BLK, shirt: ['#2a8ae8', '#14457a'], pants: ['#2a2a3a', '#14141c'], sleeves: true, headwear: H.partycone('#e8303a', '#ffd040') }),
    PARTY2: woman({ skin: SKF, hairCol: BRN, hair: 'bun', shirt: ['#e8303a', '#741818'], pants: ['#2a2a3a', '#14141c'], headwear: H.partycone('#ffd040', '#2a8ae8') }),
    PARTY3: man({ skin: SKB, hairCol: BLK, beard: true, shirt: ['#30c080', '#186040'], pants: ['#3a3a4a', '#1c1c24'], sleeves: true, headwear: H.beanie(T('#c040c0', '#602060', '#f0a0f0')) }),
    PARTY4: woman({ skin: SKC, hairCol: BLK, shirt: ['#c040c0', '#602060'], pants: ['#2a2a3a', '#14141c'], headwear: H.partycone('#30c080', '#ffffff') }),
    PARTY5: man({ skin: SKF, hairCol: T('#c8903a', '#7a5418', '#f0c070'), shirt: ['#f0a020', '#7a5010'], pants: ['#2a3a5a', '#141c2c'], sleeves: true, glasses: true, headwear: H.partycone('#2a8ae8', '#ffd040') }),
    PARTYKID: kid({ skin: SKO, shirt: ['#ffd040', '#8a7020'], pants: ['#2a8ae8', '#14457a'], headwear: H.partycone('#e8303a', '#ffffff') }),
    SOFA: man({ name: 'Party guest', skin: SKO, hairCol: BLK, shirt: ['#e8b040', '#7a5a1a'], pants: ['#2a2a3a', '#14141c'], sleeves: true, headwear: H.partycone('#c040c0', '#ffd040') }),
  };
  S.NYC = C;

  // Janus: a stone bust with two bearded faces, one looking left (the past), one right (the future).
  // mood: -1..1 per face (0 neutral, 1 big grin); wink etc. drawn by the act.
  S.nyJanus = (c, x, y, s, o = {}) => { const st = o.col || '#d8d0c0', sh = S.mix(st, '#5a5040', .45);
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(4, 2, 70, 10, 0, 0, TAU); c.fill();
    // shoulders / herm block
    c.fillStyle = st; c.beginPath(); c.moveTo(-62, 0); c.lineTo(-56, -70); c.quadraticCurveTo(0, -96, 56, -70); c.lineTo(62, 0); c.fill(); c.fillStyle = sh; c.beginPath(); c.moveTo(20, 0); c.lineTo(24, -80); c.quadraticCurveTo(44, -76, 56, -70); c.lineTo(62, 0); c.fill();
    c.fillStyle = st; c.fillRect(-16, -110, 32, 30);
    // one wide shared head; each side is a profile looking outward, the backs of the two heads meet in a curly hair band
    c.fillStyle = st; c.beginPath(); c.ellipse(0, -146, 60, 46, 0, 0, TAU); c.fill();
    const face = (d, m, blink) => { c.save(); c.scale(d, 1);
      // forehead, round nose, lips, chin
      c.fillStyle = st; c.beginPath(); c.moveTo(48, -176); c.quadraticCurveTo(62, -168, 62, -156); c.quadraticCurveTo(80, -148, 74, -138); c.quadraticCurveTo(70, -133, 63, -134); c.quadraticCurveTo(66, -128, 62, -124); c.quadraticCurveTo(64, -116, 54, -110); c.lineTo(20, -106); c.lineTo(20, -176); c.fill();
      c.strokeStyle = S.rgba('#3a3020', .45); c.lineWidth = 2.2; c.beginPath(); c.moveTo(62, -156); c.quadraticCurveTo(80, -148, 74, -138); c.quadraticCurveTo(70, -133, 63, -134); c.stroke();
      // half of the shared curly beard
      c.fillStyle = sh; c.beginPath(); c.moveTo(0, -116); c.quadraticCurveTo(30, -122, 56, -114); c.quadraticCurveTo(58, -96, 40, -86); c.quadraticCurveTo(18, -78, 0, -82); c.fill();
      c.strokeStyle = S.rgba('#3a3020', .5); c.lineWidth = 2; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(8 + k * 10, -114); c.quadraticCurveTo(12 + k * 10, -100, 6 + k * 9, -86); c.stroke(); }
      // eye, brow, smile (near the outer edge so each side reads as its own face)
      c.strokeStyle = '#3a3020'; c.lineWidth = 3; c.lineCap = 'round';
      if (blink) { c.beginPath(); c.moveTo(42, -154); c.lineTo(52, -154); c.stroke(); } else { c.fillStyle = '#3a3020'; c.beginPath(); c.arc(48, -154, 3.6, 0, TAU); c.fill(); }
      c.beginPath(); c.moveTo(38, -166 - m * 3); c.quadraticCurveTo(47, -171 - m * 4, 57, -165); c.stroke();
      c.beginPath(); c.moveTo(50, -126); c.quadraticCurveTo(56, -123 + m * 6, 61, -128 - m * 2); c.stroke();
      // curls over the top of this half
      c.fillStyle = sh; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k + .2) * .27; c.beginPath(); c.arc(56 * Math.cos(a), -150 + 44 * Math.sin(a), 10, 0, TAU); c.fill(); }
      c.restore(); };
    // hair band down the middle where the two heads join
    c.fillStyle = sh; c.beginPath(); c.roundRect(-16, -196, 32, 84, 14); c.fill();
    c.fillStyle = S.mix(sh, '#3a3020', .2); for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(k % 2 ? 6 : -6, -188 + k * 14, 8, 0, TAU); c.fill(); }
    face(-1, o.mL || 0, o.blinkL); face(1, o.mR || 0, o.blinkR);
    c.fillStyle = S.rgba('#ffffff', .18); c.beginPath(); c.ellipse(-30, -60, 8, 26, -.2, 0, TAU); c.fill();
    c.restore(); };
})(window);
