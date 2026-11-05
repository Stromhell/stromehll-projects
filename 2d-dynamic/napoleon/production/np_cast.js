// Napoleon cast, 1769-1821: Napoleon at 8, 24, 35 and 50, schoolboys, revolutionaries, French line infantry,
// the Imperial Guard (bearskins), Russians, British redcoats, Spanish guerrillas, Josephine, Marie Louise,
// Pope Pius VII, Tsar Alexander, marshals, servants. New headwear: bearskin, laurel crown, Cossack fur cap.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  // tall black bearskin of the Imperial Guard, with a red plume and a brass plate
  X.bearskin = fit((c, u, f, Lt, k) => { const t = k.tone(T('#1c1a1e', '#060508', '#5a5660'), Lt);
    k.celT(c, P(k.front ? [[-.62, -.4], [-.72, -1.2], [-.5, -1.62], [0, -1.74], [.5, -1.62], [.72, -1.2], [.62, -.4]] : [[-.66, -.4], [-.76, -1.2], [-.4, -1.68], [.2, -1.72], [.66, -1.4], [.7, -.4]], u), t, Lt, u, { swk: .6, over: c2 => {
      c2.strokeStyle = S.rgba('#5a5660', .5); c2.lineWidth = .04 * u; for (let i = 0; i < 9; i++) { c2.beginPath(); c2.moveTo((-.5 + i * .12) * u, -.5 * u); c2.lineTo((-.56 + i * .13) * u, -1.5 * u); c2.stroke(); }
      if (k.front) { c2.fillStyle = '#c8a040'; c2.beginPath(); c2.moveTo(-.34 * u, -.44 * u); c2.lineTo(0, -.9 * u); c2.lineTo(.34 * u, -.44 * u); c2.fill(); } } });
    c.fillStyle = '#c82a22'; c.beginPath(); c.ellipse((k.front ? -.56 : -.62) * u, -1.36 * u, .1 * u, .34 * u, -.1, 0, TAU); c.fill(); }, 0.74, 0.02);
  // golden laurel wreath (the coronation)
  X.laurel = (c, u, f, Lt, k) => { c.save(); c.translate(0, -.62 * u); c.fillStyle = '#d8b040'; c.strokeStyle = '#8a6a1a'; c.lineWidth = .02 * u;
    for (let i = 0; i < 12; i++) { const a = Math.PI + (i + .5) / 12 * Math.PI, x = Math.cos(a) * .66 * u, y = Math.sin(a) * .2 * u; c.save(); c.translate(x, y); c.rotate(a + Math.PI / 2 + (i < 6 ? .5 : -.5)); c.beginPath(); c.ellipse(0, 0, .07 * u, .16 * u, 0, 0, TAU); c.fill(); c.stroke(); c.restore(); }
    c.restore(); };
  // Cossack fur cap
  X.furcap = col => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#3a2a22', '#1a120e', '#8a7060'), Lt);
    k.celT(c, P([[-.66, -.46], [-.7, -1.08], [-.3, -1.2], [.3, -1.2], [.7, -1.08], [.66, -.46]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = '#b82a22'; c.beginPath(); c.ellipse(0, -1.18 * u, .4 * u, .08 * u, 0, 0, TAU); c.fill(); }, 0.74, 0.02);
  // red Phrygian liberty cap of 1789
  X.liberty = fit((c, u, f, Lt, k) => { const t = k.tone(T('#c22a24', '#6a1210', '#ff8a70'), Lt);
    k.celT(c, P(k.front ? [[-.66, -.4], [-.62, -.9], [-.2, -1.1], [.3, -1.06], [.5, -.86], [.66, -.4]] : [[-.68, -.4], [-.6, -.94], [-.1, -1.12], [.5, -1.02], [.84, -.72], [.66, -.62], [.66, -.4]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = '#2a4a9a'; c2.beginPath(); c2.arc(.3 * u, -.62 * u, .1 * u, 0, TAU); c2.fill(); c2.fillStyle = '#ffffff'; c2.beginPath(); c2.arc(.3 * u, -.62 * u, .05 * u, 0, TAU); c2.fill(); } }); }, 0.78, 0.03);
  const SKF = X.SK.fair, SKO = X.SK.olive, BLK = X.HR.black, BRN = X.HR.brown, GRY = X.HR.grey;
  const BLUE = ['#1e3a7a', '#0e1c3e'], WHITE = ['#f2ead6', '#b0a68c'], GREYC = ['#7a7a80', '#3e3e44'], BOOT = ['#1a1a1a', '#000000'];
  const man = o => Object.assign({}, CH.farmer, { skin: SKF, hair: 'neat', hairCol: BRN, mustache: false, beard: false, build: 'man', shoes: ['#2a1a10', '#140a06'], headwear: null }, o);
  const lady = o => Object.assign({}, CH.aisha, { skin: SKF, hair: 'bun', hairCol: BRN, long: true, dupatta: null, headwear: null }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: SKF, hair: 'neat', hairCol: BRN, headwear: null }, o);
  const C = {
    // Napoleon through his life
    NAPBOY: kid({ name: 'Napoleone', skin: SKO, hairCol: BLK, shirt: ['#e8e0cc', '#a49a84'], pants: ['#5a4a3a', '#2a2018'] }),
    NAPCADET: kid({ name: 'Napoleone', skin: SKO, hairCol: BLK, shirt: ['#2a3a6a', '#141c34'], pants: ['#2a3a6a', '#141c34'], sleeves: true }),
    NAPY: man({ name: 'Bonaparte', skin: SKO, hair: 'swept', hairCol: BLK, shirt: BLUE, pants: WHITE, sleeves: true, headwear: X.bicorne(), shoes: BOOT, build: 'man' }),
    NAP: man({ name: 'Napoleon', skin: SKF, hair: 'swept', hairCol: BRN, shirt: BLUE, pants: WHITE, sleeves: true, headwear: X.bicorne(), shoes: BOOT }),
    NAPG: man({ name: 'Napoleon', skin: SKF, hair: 'swept', hairCol: BRN, shirt: GREYC, pants: WHITE, long: true, sleeves: true, headwear: X.bicorne(), shoes: BOOT }),
    NAPEMP: man({ name: 'Napoleon', skin: SKF, hair: 'swept', hairCol: BRN, shirt: ['#8a1a2a', '#440c14'], pants: WHITE, long: true, sleeves: true, shoes: ['#e8e0cc', '#a49a84'] }),
    NAPBARE: man({ name: 'Napoleon', skin: SKF, hair: 'swept', hairCol: BRN, shirt: BLUE, pants: WHITE, sleeves: true, shoes: BOOT }),
    NAPOLD: man({ name: 'Napoleon', skin: SKF, hair: 'elder', hairCol: BRN, shirt: ['#e8e4da', '#a8a294'], pants: WHITE, sleeves: true, build: 'broad', headwear: null }),
    NAPOLDH: man({ name: 'Napoleon', skin: SKF, hair: 'elder', hairCol: BRN, shirt: GREYC, pants: WHITE, long: true, sleeves: true, build: 'broad', headwear: X.bicorne(), shoes: BOOT }),
    // school, Paris 1789
    RICHBOY: kid({ shirt: ['#6a2a3a', '#34141c'], pants: ['#e8e0cc', '#a49a84'], sleeves: true, hairCol: { base: '#c89a5a', shade: '#7a5a2a', rim: '#f8d8a0' } }),
    RICHBOY2: kid({ shirt: ['#2a5a4a', '#142c24'], pants: ['#e8e0cc', '#a49a84'], sleeves: true }),
    RICHBOY3: kid({ shirt: ['#5a4a7a', '#2c243c'], pants: ['#e8e0cc', '#a49a84'], sleeves: true, hairCol: BLK }),
    SANS: man({ skin: SKF, mustache: true, shirt: ['#e8e4da', '#a8a294'], pants: ['#3a4a6a', '#1c2434'], headwear: X.liberty }),
    SANS2: man({ skin: SKO, hairCol: BLK, shirt: ['#8a5a3a', '#4a2e1c'], pants: ['#e8e4da', '#a8a294'], headwear: X.liberty }),
    SANSW: lady({ shirt: ['#c8b89a', '#8a7a5c'], pants: ['#6a3a2a', '#341c14'], hair: 'bun' }),
    ARISTO: man({ skin: SKF, hairCol: { base: '#e8e4dc', shade: '#a8a49c', rim: '#ffffff' }, shirt: ['#c8a0b8', '#8a6078'], pants: ['#f2ead6', '#b0a68c'], sleeves: true, build: 'broad' }),
    // armies
    FR: man({ shirt: BLUE, pants: WHITE, sleeves: true, mustache: true, headwear: X.shako(), shoes: BOOT }),
    FR2: man({ skin: SKO, hairCol: BLK, shirt: BLUE, pants: WHITE, sleeves: true, headwear: X.shako(), shoes: BOOT }),
    FRRAG: man({ skin: SKO, hairCol: BLK, mustache: true, shirt: ['#3a4a6a', '#1c2434'], pants: ['#8a7a5a', '#4a3e2a'], sleeves: true, headwear: X.bicorne(T('#2a2a2a', '#0a0a0a', '#6a6a6a')) }),
    FRCOLD: man({ shirt: ['#8a7a6a', '#4a3e34'], pants: ['#5a5048', '#2c2824'], long: true, sleeves: true, mustache: true, beard: true, headwear: X.shako(), shoes: BOOT }),
    GUARD: man({ shirt: BLUE, pants: WHITE, sleeves: true, mustache: true, build: 'broad', headwear: X.bearskin, shoes: BOOT }),
    MARSHAL: man({ name: 'Marshal', hairCol: GRY, mustache: true, build: 'broad', shirt: ['#1e2a5a', '#0e142c'], pants: WHITE, sleeves: true, tie: '#c8a040', headwear: X.bicorne(), shoes: BOOT }),
    MARSHAL2: man({ name: 'Marshal', hairCol: BRN, build: 'man', shirt: ['#1e2a5a', '#0e142c'], pants: WHITE, sleeves: true, tie: '#c8a040', shoes: BOOT }),
    AIDE: man({ shirt: ['#2a4a9a', '#14244e'], pants: WHITE, sleeves: true, shoes: BOOT, build: 'man' }),
    RUS: man({ shirt: ['#2a4a2a', '#142414'], pants: ['#2a4a2a', '#142414'], sleeves: true, mustache: true, headwear: X.shako(T('#1e1e24', '#08080c', '#6a6a7a')), shoes: BOOT }),
    COSSACK: man({ beard: true, mustache: true, shirt: ['#2a2a4a', '#141424'], pants: ['#2a2a4a', '#141424'], long: true, sleeves: true, headwear: X.furcap() }),
    BRIT: man({ shirt: ['#b82a22', '#5a1410'], pants: ['#2a2a3a', '#14141c'], sleeves: true, headwear: X.shako(), shoes: BOOT }),
    BRIT2: man({ hairCol: { base: '#b8864a', shade: '#6a4a22', rim: '#f0c890' }, mustache: true, shirt: ['#b82a22', '#5a1410'], pants: ['#2a2a3a', '#14141c'], sleeves: true, headwear: X.shako(), shoes: BOOT }),
    BRITOFF: man({ name: 'Governor', hairCol: GRY, shirt: ['#b82a22', '#5a1410'], pants: WHITE, sleeves: true, build: 'elder', headwear: X.bicorne(), shoes: BOOT }),
    GUERR: man({ skin: SKO, hairCol: BLK, mustache: true, shirt: ['#e8e4da', '#a8a294'], pants: ['#4a3a2a', '#241c14'], headwear: X.beret(T('#1f2530', '#0b0e14', '#6a7080')) }),
    GUERR2: man({ skin: SKO, hairCol: BLK, beard: true, shirt: ['#6a3a2a', '#341c14'], pants: ['#3a3430', '#1a1614'], headwear: X.beret(T('#7a2a22', '#3a1410', '#c87a6a')) }),
    SCHOLAR: man({ name: 'Scholar', hairCol: GRY, glasses: true, shirt: ['#2a2a32', '#0e0e14'], pants: WHITE, sleeves: true, build: 'elder' }),
    SMUG: man({ skin: SKO, beard: true, shirt: ['#3a3a44', '#1c1c22'], pants: ['#4a3a2a', '#241c14'], headwear: X.beret(T('#2a2a2a', '#0e0e0e', '#6a6a6a')) }),
    POL: man({ hairCol: { base: '#e8e4dc', shade: '#a8a49c', rim: '#ffffff' }, shirt: ['#c82a2a', '#641414'], pants: ['#f2ead6', '#b0a68c'], long: true, sleeves: true }),
    POL2: man({ hairCol: { base: '#e8e4dc', shade: '#a8a49c', rim: '#ffffff' }, shirt: ['#2a2a6a', '#141434'], pants: ['#f2ead6', '#b0a68c'], long: true, sleeves: true, build: 'elder' }),
    // court
    JOSEPHINE: lady({ name: 'Josephine', hairCol: BLK, shirt: ['#f4f0f4', '#b8b0bc'], pants: ['#f4f0f4', '#b8b0bc'] }),
    MARIEL: lady({ name: 'Marie Louise', hairCol: { base: '#b8864a', shade: '#6a4a22', rim: '#f0c890' }, shirt: ['#f4ecd0', '#b8ac8c'], pants: ['#f4ecd0', '#b8ac8c'] }),
    POPE: man({ name: 'Pius VII', hair: 'elder', hairCol: GRY, build: 'elder', shirt: ['#f4f0e8', '#b8b4ac'], pants: ['#f4f0e8', '#b8b4ac'], long: true, sleeves: true, headwear: X.skullcap ? X.skullcap(T('#ffffff', '#c8c4bc', '#ffffff')) : null }),
    PRIEST: man({ hairCol: GRY, shirt: ['#8a1a2a', '#440c14'], pants: ['#8a1a2a', '#440c14'], long: true, sleeves: true, build: 'elder', hair: 'elder' }),
    TSAR: man({ name: 'Alexander I', hairCol: { base: '#b8864a', shade: '#6a4a22', rim: '#f0c890' }, shirt: ['#2a4a2a', '#142414'], pants: WHITE, sleeves: true, tie: '#c8a040', shoes: BOOT }),
    COURTIER: man({ hairCol: { base: '#e8e4dc', shade: '#a8a49c', rim: '#ffffff' }, shirt: ['#3a2a5a', '#1c142c'], pants: WHITE, sleeves: true }),
    LADY: lady({ hairCol: BRN, shirt: ['#8a4a6a', '#442434'], pants: ['#8a4a6a', '#442434'] }),
    SERVANT: man({ hairCol: GRY, shirt: ['#2a2a32', '#0e0e14'], pants: ['#2a2a32', '#0e0e14'], sleeves: true, build: 'elder', hair: 'elder' }),
    MAID: lady({ hairCol: BRN, shirt: ['#3a3a44', '#1c1c22'], pants: ['#3a3a44', '#1c1c22'] }),
    CORSW: lady({ skin: SKO, hairCol: BLK, shirt: ['#2a2a2a', '#0e0e0e'], pants: ['#6a2a24', '#341410'] }),
  };
  S.NPC = C;
})(window);
