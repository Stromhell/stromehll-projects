// Spain 3: 20th-century cast (1898-1981) and headwear: tricorn, peaked cap, militia cap, fedora.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  // Guardia Civil tricorn: black patent leather, the back folded up into a flat wing
  X.tricorn = fit((c, u, f, Lt, k) => { const t = k.tone({ base: '#22222a', shade: '#08080c', rim: '#9a9ab0' }, Lt);
    const sh = k.front ? [[-.66, -.34], [-.6, -.66], [-.3, -.86], [.3, -.86], [.6, -.66], [.66, -.34], [.4, -.28], [-.4, -.28]] : [[-.7, -.34], [-.72, -.62], [-.86, -1.02], [-.6, -1.0], [-.3, -.82], [.3, -.8], [.6, -.62], [.7, -.36], [.4, -.28], [-.4, -.28]];
    k.celT(c, P(sh, u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = S.rgba('#ffffff', .45); c2.beginPath(); c2.ellipse(-.1 * u, -.66 * u, .2 * u, .05 * u, -.2, 0, TAU); c2.fill(); } });
    k.celT(c, P(k.front ? [[-.7, -.3], [.7, -.3], [.66, -.22], [-.66, -.22]] : [[-.74, -.32], [.82, -.32], [.92, -.22], [.2, -.2], [-.7, -.24]], u), t, Lt, u, { swk: .5 }); }, .74, .02);
  // military peaked cap with a dark visor and a badge
  X.peaked = col => fit((c, u, f, Lt, k) => { const t = k.tone(col, Lt), v = k.tone({ base: '#1a1a1a', shade: '#050505', rim: '#8a8a8a' }, Lt);
    k.celT(c, P(k.front ? [[-.6, -.4], [-.72, -.74], [-.3, -.86], [.3, -.86], [.72, -.74], [.6, -.4]] : [[-.62, -.42], [-.7, -.76], [-.2, -.9], [.5, -.84], [.66, -.6], [.6, -.42]], u), t, Lt, u, { swk: .6 });
    k.celT(c, P(k.front ? [[-.62, -.44], [.62, -.44], [.5, -.32], [-.5, -.32]] : [[.3, -.46], [.86, -.42], [.96, -.3], [.4, -.34]], u), v, Lt, u, { swk: .5 });
    c.fillStyle = '#d8b040'; c.beginPath(); c.arc((k.front ? 0 : .42) * u, -.6 * u, .07 * u, 0, TAU); c.fill(); }, .8, -.02);
  // militia side cap (gorrillo) with a red tassel
  X.forage = col => (c, u, f, Lt, k) => { const t = k.tone(col, Lt);
    k.celT(c, P(k.front ? [[-.6, -.48], [-.5, -.74], [.5, -.74], [.6, -.48]] : [[-.62, -.5], [-.52, -.8], [.5, -.72], [.64, -.5]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = '#c8202a'; c.beginPath(); c.arc((k.front ? 0 : .5) * u, -.72 * u, .06 * u, 0, TAU); c.fill(); };
  // fedora
  X.fedora = col => (c, u, f, Lt, k) => { const t = k.tone(col, Lt);
    k.celT(c, P(k.front ? [[-.86, -.42], [.86, -.42], [.7, -.32], [-.7, -.32]] : [[-.86, -.44], [.9, -.4], [.74, -.32], [-.72, -.34]], u), t, Lt, u, { swk: .5 });
    k.celT(c, P([[-.5, -.42], [-.52, -.8], [-.1, -.9], [0, -.8], [.1, -.9], [.52, -.8], [.5, -.42]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = S.rgba('#000000', .45); c.fillRect(-.5 * u, -.54 * u, u, .08 * u); };
  const SK = X.SK, HR = X.HR;
  const man = (o) => Object.assign({}, CH.farmer, { headwear: null, hair: 'neat', hairCol: HR.black, mustache: false, beard: false, build: 'man', shoes: ['#2a1a10', '#140a06'] }, o);
  const suit = (col, tie, o = {}) => man(Object.assign({ shirt: col, pants: col, tie, sleeves: true }, o));
  const GREEN = ['#4a5a3a', '#252e1c'], KHAKI = ['#8a7a4a', '#4a4022'], NAVY = ['#22283a', '#10141e'];
  const C = {
    TEJERO: man({ name: 'Tejero', mustache: true, shirt: GREEN, pants: GREEN, sleeves: true, headwear: X.tricorn, build: 'broad' }),
    GUARD: man({ shirt: GREEN, pants: GREEN, sleeves: true, headwear: X.tricorn }),
    GUARD2: man({ shirt: GREEN, pants: GREEN, sleeves: true, headwear: X.tricorn, mustache: true, hairCol: HR.brown }),
    DEPUTY: suit(NAVY, '#7a1a1a', { hairCol: HR.grey, glasses: true }),
    DEPUTY2: suit(['#4a4038', '#241e18'], '#2a3a6a', { mustache: true }),
    DEPUTY3: suit(['#5a5a60', '#2a2a30'], '#3a5a3a', { hairCol: HR.brown, build: 'broad' }),
    SUAREZ: suit(NAVY, '#3a3a5a', { name: 'Suárez', hairCol: { base: '#3a2a1e', shade: '#1a120a', rim: '#8a6a50' } }),
    KING: man({ name: 'Juan Carlos', skin: SK.fair, hairCol: { base: '#6a4a2a', shade: '#2e1e10', rim: '#c09a70' }, shirt: KHAKI, pants: KHAKI, sleeves: true, tie: '#3a3020' }),
    DAD: man({ shirt: ['#7a5a3a', '#3e2c1a'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, mustache: true }),
    MUM: Object.assign({}, CH.aisha, { skin: SK.fair, hairCol: HR.brown, hair: 'bun', shirt: ['#8a3a4a', '#441a24'], pants: ['#3a3a44', '#1c1c22'], dupatta: null, headwear: null }),
    KID: Object.assign({}, CH.girl, { shirt: ['#e8c040', '#8a6a10'], headwear: null }),
    LANDOWNER: suit(['#e8e0cc', '#a8a08c'], '#3a2a1a', { name: 'Landowner', headwear: X.fedora({ base: '#e8dcc0', shade: '#a89a7c', rim: '#ffffff' }), mustache: true, build: 'broad', skin: SK.fair }),
    LABOURER: man({ skin: SK.olive, shirt: ['#e8e4da', '#a8a294'], pants: ['#4a3a2a', '#241c14'], headwear: X.beret({ base: '#1f2530', shade: '#0b0e14', rim: '#6a7080' }) }),
    LABOURER2: man({ skin: SK.olive, shirt: ['#c8b898', '#887858'], pants: ['#3a3430', '#1a1614'], hairCol: HR.grey, mustache: true }),
    SOLDIER: man({ skin: SK.olive, shirt: KHAKI, pants: KHAKI, sleeves: true, headwear: X.peaked({ base: '#8a7a4a', shade: '#4a4022', rim: '#d8c890' }) }),
    PRIMO: man({ name: 'Primo de Rivera', build: 'broad', mustache: true, hairCol: HR.grey, shirt: ['#3a3a2a', '#1a1a12'], pants: ['#3a3a2a', '#1a1a12'], sleeves: true, headwear: X.peaked({ base: '#3a3a2a', shade: '#1a1a12', rim: '#8a8a70' }) }),
    ALFONSO: man({ name: 'Alfonso XIII', skin: SK.fair, mustache: true, hairCol: HR.brown, shirt: ['#2a2a4a', '#14142a'], pants: ['#2a2a4a', '#14142a'], sleeves: true, tie: '#d8b040' }),
    WORKER: man({ skin: SK.olive, shirt: ['#3a4a6a', '#1c2434'], pants: ['#3a4a6a', '#1c2434'], sleeves: true }),
    WOMAN: Object.assign({}, CH.aisha, { skin: SK.olive, hairCol: HR.black, shirt: ['#3a3a3a', '#1a1a1a'], pants: ['#3a3a3a', '#1a1a1a'], dupatta: null, headwear: null }),
  };
  S.ES3 = C; S.ES3P = { GREEN, KHAKI, NAVY, man, suit };
})(window);
