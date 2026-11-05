// Eli Cohen cast, 1924-1965: Eli (thin moustache) as a boy, a young man and as "Kamel", his parents, Nadia and the
// children, Israeli handlers and instructors, Egyptian police, Buenos Aires café men, Syrian officers in olive
// uniforms and berets, Amin al-Hafiz, ministers and party guests. New headwear: beret, garrison cap, keffiyeh.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  // soft army beret pulled down to one side, with a small badge
  X.beret = col => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#2a3a24', '#121a10', '#6a8a5a'), Lt);
    k.celT(c, P(k.front ? [[-.62, -.44], [-.74, -.68], [-.3, -.9], [.4, -.88], [.86, -.66], [.62, -.44]] : [[-.64, -.44], [-.8, -.7], [-.3, -.92], [.5, -.86], [.8, -.6], [.62, -.44]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = '#d8b040'; c.beginPath(); c.arc((k.front ? -.3 : .3) * u, -.6 * u, .07 * u, 0, TAU); c.fill(); }, .8, 0);
  // folded garrison cap
  X.garrison = col => fit((c, u, f, Lt, k) => { const t = k.tone(col, Lt);
    k.celT(c, P(k.front ? [[-.56, -.46], [-.46, -.78], [.46, -.78], [.56, -.46]] : [[-.64, -.46], [-.5, -.82], [.56, -.72], [.66, -.46]], u), t, Lt, u, { swk: .6 }); }, .8, 0);
  const SK = X.SK, HR = X.HR;
  const man = o => Object.assign({}, CH.farmer, { headwear: null, skin: SK.olive, hair: 'neat', hairCol: HR.black, mustache: false, beard: false, build: 'man', shoes: ['#2a1a10', '#140a06'] }, o);
  const suit = (col, tie, o = {}) => man(Object.assign({ shirt: col, pants: col, tie, sleeves: true }, o));
  const woman = o => Object.assign({}, CH.aisha, { skin: SK.olive, hairCol: HR.black, hair: 'bun', dupatta: null, headwear: null }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: SK.olive, hair: 'neat', hairCol: HR.black, headwear: null }, o);
  const OLIVE = ['#5a6a3a', '#2c341c'], KHAKI = ['#a8946a', '#5a4e34'], NAVY = ['#22283a', '#10141e'], CREAM = ['#e8dcc0', '#a8987a'], GREY = ['#5a5a62', '#2c2c32'], BROWN = ['#5a4232', '#2c2018'];
  const ELIH = T('#1c1a1e', '#08070a', '#5a5660');
  const C = {
    ELI: suit(GREY, '#7a1a22', { name: 'Eli', mustache: true, hairCol: ELIH }),
    ELIK: suit(['#3a3a44', '#1c1c22'], '#a8862a', { name: 'Kamel', mustache: true, hairCol: ELIH }),
    ELIL: man({ name: 'Eli', mustache: true, hairCol: ELIH, shirt: CREAM, pants: ['#8a7a5a', '#443c2c'], sleeves: true }),
    ELIS: man({ name: 'Eli', mustache: true, hairCol: ELIH, shirt: ['#e8e4dc', '#a8a49c'], pants: ['#3a3a44', '#1c1c22'], sleeves: true }),
    ELIBOY: kid({ name: 'Eli', shirt: ['#e8e4dc', '#a8a49c'], pants: ['#3a3a44', '#1c1c22'] }),
    ELIDAD: suit(['#4a4038', '#241e1a'], '#3a2a1a', { name: 'Father', mustache: true, hairCol: HR.grey, headwear: X.fez }),
    ELIMUM: woman({ name: 'Mother', shirt: ['#3a4a6a', '#1c2434'], pants: ['#3a4a6a', '#1c2434'] }),
    BROTHER: man({ shirt: ['#7a6a52', '#3e3426'], pants: ['#3a3a44', '#1c1c22'], sleeves: true }),
    NADIA: woman({ name: 'Nadia', hair: 'bun', hairCol: HR.brown, shirt: ['#8a3a4a', '#441a24'], pants: ['#8a3a4a', '#441a24'] }),
    CHILD: kid({ name: 'Sophie', shirt: ['#e8b8c8', '#a87888'], pants: ['#e8b8c8', '#a87888'] }),
    CHILD2: kid({ name: 'Irit', shirt: ['#8ab8e8', '#4a78a8'], pants: ['#3a3a44', '#1c1c22'] }),
    HANDLER: suit(['#4a4a3a', '#24241c'], '#2a2a3a', { name: 'Handler', skin: SK.fair, hairCol: HR.brown }),
    HANDLER2: suit(['#3a3a44', '#1c1c22'], '#5a2a2a', { skin: SK.fair, hairCol: HR.grey, glasses: true }),
    INSTR: man({ name: 'Instructor', mustache: true, hairCol: HR.grey, shirt: KHAKI, pants: KHAKI, sleeves: true }),
    TEACHER: suit(BROWN, '#1a1a2a', { hairCol: HR.grey, glasses: true, mustache: true }),
    EGCOP: man({ name: 'Officer', mustache: true, build: 'broad', shirt: ['#e8e0c8', '#a8a088'], pants: ['#e8e0c8', '#a8a088'], sleeves: true, headwear: X.peaked(T('#1a1a22', '#08080c', '#5a5a6a')) }),
    PORTER: man({ shirt: ['#7a6a52', '#3e3426'], pants: ['#7a6a52', '#3e3426'], sleeves: true, headwear: X.fez }),
    CAFE: suit(NAVY, '#6a1a1a', { mustache: true, headwear: X.fedora(T('#4a3a2a', '#241c14', '#8a7a6a')) }),
    CAFE2: suit(['#5a4a3a', '#2c241c'], '#1a3a5a', { hairCol: HR.grey }),
    CAFE3: suit(GREY, '#3a2a1a', { glasses: true, mustache: true }),
    EDITOR: man({ name: 'Editor', glasses: true, hairCol: HR.grey, shirt: ['#e8e4dc', '#a8a49c'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, tie: '#3a1a1a' }),
    HAFIZ: man({ name: 'Amin al-Hafiz', build: 'broad', mustache: true, shirt: OLIVE, pants: OLIVE, sleeves: true, tie: '#2a3020', medals: true, headwear: X.peaked(T('#5a6a3a', '#2c341c', '#9aaa7a')) }),
    HAFIZB: man({ name: 'Amin al-Hafiz', build: 'broad', mustache: true, shirt: OLIVE, pants: OLIVE, sleeves: true, tie: '#2a3020', medals: true }),
    SYROFF: man({ name: 'Officer', mustache: true, shirt: OLIVE, pants: OLIVE, sleeves: true, headwear: X.beret() }),
    SYROFF2: man({ build: 'broad', mustache: true, shirt: OLIVE, pants: OLIVE, sleeves: true, headwear: X.peaked(T('#5a6a3a', '#2c341c', '#9aaa7a')) }),
    SYROFF3: man({ hairCol: HR.grey, shirt: OLIVE, pants: OLIVE, sleeves: true, glasses: true }),
    SYRSOLD: man({ shirt: OLIVE, pants: OLIVE, sleeves: true, headwear: X.garrison(T('#5a6a3a', '#2c341c', '#9aaa7a')) }),
    SYRSOLD2: man({ mustache: true, shirt: OLIVE, pants: OLIVE, sleeves: true, headwear: X.beret(T('#7a1a22', '#3a0a10', '#c86a6a')) }),
    MINISTER: suit(['#2a2a34', '#12121a'], '#7a1a1a', { hairCol: HR.grey, mustache: true, build: 'broad' }),
    MINISTER2: suit(['#4a4a52', '#24242a'], '#1a3a5a', { glasses: true }),
    GUESTW: woman({ shirt: ['#2a5a6a', '#142c34'], pants: ['#2a5a6a', '#142c34'] }),
    GUESTW2: woman({ hairCol: HR.brown, shirt: ['#c8a040', '#7a5a1a'], pants: ['#c8a040', '#7a5a1a'] }),
    WAITER: man({ shirt: ['#ffffff', '#c8c8c8'], pants: ['#1a1a1e', '#08080a'], sleeves: true, tie: '#1a1a1e' }),
    SHEIKH: man({ name: 'Instructor', beard: true, hairCol: HR.grey, shirt: CREAM, pants: CREAM, long: true, headwear: X.skullcap(T('#ffffff', '#c8c8c8', '#ffffff')) }),
  };
  S.ECC = C;
})(window);
