// North Korea Next cast (Village Painterly, never photo-likenesses): the leader in a black suit or leather coat, his
// daughter in a white padded coat or black coat, his wife, his sister, generals with tall peaked caps and medals,
// a basketball star, a tutor, analysts, a TV announcer, two foreign leaders, older leaders for portraits.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  const KSK = T('#e6b88e', '#a2704c', '#ffe4c4'), DSK = T('#6e4430', '#3c2214', '#b07a5a'), FSK = T('#e8b898', '#a87458', '#ffe0c8');
  const BLK = T('#1c1a1e', '#08070a', '#5a5660'), GRY = T('#6a6a70', '#38383e', '#b0b0b8'), LGT = T('#b8a888', '#7a6a50', '#e8dcc0');
  // tall wide-crowned general's cap with a red band and gold badge
  X.nkcap = col => (c, u, f, Lt, k) => { const t = k.tone(col || T('#4a5a3a', '#222a1a', '#8a9a6a'), Lt);
    k.celT(c, P(k.front ? [[-.66, -.46], [-.86, -.86], [0, -1.02], [.86, -.86], [.66, -.46]] : [[-.62, -.46], [-.8, -.88], [.2, -1.04], [.96, -.82], [.66, -.46]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = '#a82a22'; c.fillRect(-.64 * u, -.58 * u, 1.3 * u, .12 * u);
    k.celT(c, P(k.front ? [[-.56, -.46], [.56, -.46], [.46, -.36], [-.46, -.36]] : [[.3, -.48], [.9, -.44], [.94, -.36], [.36, -.38]], u), T('#141414', '#000000', '#5a5a5a'), Lt, u, { swk: .5 });
    c.fillStyle = '#e8c040'; c.beginPath(); c.arc((k.front ? 0 : .32) * u, -.74 * u, .09 * u, 0, TAU); c.fill(); };
  const man = o => Object.assign({}, CH.farmer, { headwear: null, skin: KSK, hair: 'neat', hairCol: BLK, mustache: false, beard: false, build: 'man', shoes: ['#1a1a1e', '#08080a'] }, o);
  const woman = o => Object.assign({}, CH.seller, { skin: KSK, hair: 'bun', hairCol: BLK, dupatta: null, headwear: null, build: 'woman' }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: KSK, hair: 'bun', hairCol: BLK, headwear: null, build: 'kid' }, o);
  const suit = (col, tie, o = {}) => man(Object.assign({ shirt: col, pants: col, tie, sleeves: true }, o));
  const MAO = ['#1e1e24', '#0a0a0e'], OLIVE = ['#4a5a3a', '#222a1a'], WHITE = ['#f0eee8', '#b8b4ac'], LEATHER = ['#1a1818', '#050505'];
  const GEN = (o = {}) => man(Object.assign({ build: 'broad', shirt: OLIVE, pants: OLIVE, sleeves: true, medals: true, headwear: X.nkcap() }, o));
  const C = {
    KIM: man({ name: 'Kim Jong Un', build: 'broad', hair: 'swept', shirt: MAO, pants: MAO, sleeves: true }),
    KIML: man({ name: 'Kim Jong Un', build: 'broad', hair: 'swept', shirt: LEATHER, pants: MAO, sleeves: true, long: true }),
    KIMY: man({ name: 'Kim Jong Un', hair: 'swept', shirt: MAO, pants: MAO, sleeves: true }),
    GIRL: kid({ name: 'Daughter', shirt: WHITE, pants: ['#2a2a30', '#141418'] }),
    GIRLB: kid({ name: 'Daughter', shirt: MAO, pants: MAO }),
    GIRLL: kid({ name: 'Daughter', shirt: LEATHER, pants: MAO }),
    BABY: kid({ name: 'Baby', shirt: WHITE, pants: WHITE }),
    RSJ: woman({ name: 'Ri Sol Ju', shirt: ['#8a2a3a', '#44141c'], pants: ['#2a2a30', '#141418'] }),
    KYJ: woman({ name: 'Kim Yo Jong', shirt: MAO, pants: MAO }),
    KJI: man({ name: 'Kim Jong Il', build: 'broad', hair: 'curly', glasses: true, shirt: ['#8a8068', '#4a4434'], pants: ['#8a8068', '#4a4434'], sleeves: true }),
    KIS: suit(MAO, null, { name: 'Kim Il Sung', build: 'broad', hairCol: GRY }),
    GEN1: GEN({ hairCol: GRY }), GEN2: GEN(), GEN3: GEN({ glasses: true }), GEN4: GEN({ hairCol: GRY, mustache: true }),
    SOLD: man({ shirt: OLIVE, pants: OLIVE, sleeves: true, headwear: X.nkcap() }),
    RODMAN: man({ name: 'Rodman', skin: DSK, build: 'broad', glasses: true, hair: 'neat', hairCol: T('#c8a040', '#7a6020', '#f0d080'), shirt: ['#e8e4dc', '#a8a49c'], pants: ['#2a2a34', '#14141a'], sleeves: false, earring: true }),
    TUTOR: woman({ name: 'Tutor', glasses: true, shirt: ['#3a4a5a', '#1c242c'], pants: ['#3a4a5a', '#1c242c'] }),
    ANALYST: suit(['#3a3a44', '#1c1c22'], '#2a3a6a', { glasses: true }),
    ANALYST2: woman({ shirt: ['#5a5a62', '#2c2c32'], pants: ['#5a5a62', '#2c2c32'], hair: 'bun' }),
    ANNOUNCER: woman({ name: 'Announcer', shirt: ['#d86a8a', '#8a3a50'], pants: ['#d86a8a', '#8a3a50'], long: true }),
    XI: suit(['#2a2a34', '#14141a'], '#7a1a1a', { name: 'Xi', build: 'broad' }),
    PUTIN: suit(['#3a3a44', '#1c1c22'], '#2a3a6a', { name: 'Putin', skin: FSK, hair: 'elder', hairCol: LGT }),
    AIDE: suit(MAO, '#1a1a1e'), AIDE2: suit(['#2a2a34', '#14141a'], '#3a1a1a', { glasses: true }),
    DOCTOR: man({ name: 'Doctor', glasses: true, hairCol: GRY, shirt: ['#f4f4f0', '#c0c0b8'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, long: true }),
  };
  S.NKC = C;
})(window);
