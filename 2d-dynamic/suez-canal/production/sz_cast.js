// Suez Canal cast, 600 BC to 2021: pharaoh's diggers, Necho, a priest, Darius, Greek and Roman engineers, Arab and
// Ottoman officials, Napoleon's surveyors, de Lesseps, Said, Egyptian labourers, Eugenie, Ismail, Disraeli, redcoats, Nasser.
// New headwear: nemes, Persian crown, Roman helmet, bicorne, top hat, fez, shako, sun helmet, skullcap.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  // pharaoh's nemes: striped blue and gold cloth with lappets falling to the shoulders, a cobra at the brow
  X.nemes = fit((c, u, f, Lt, k) => { const t = k.tone(T('#d8b040', '#8a6a1a', '#fff0a0'), Lt);
    k.celT(c, P(k.front ? [[-.7, -.3], [-.66, -.82], [0, -.98], [.66, -.82], [.7, -.3], [.82, .4], [.56, .44], [.5, -.3], [-.5, -.3], [-.56, .44], [-.82, .4]] : [[-.7, -.3], [-.7, -.84], [.1, -.98], [.66, -.8], [.66, -.36], [-.3, -.3], [-.5, .42], [-.8, .4]], u), t, Lt, u, { swk: .6, over: c2 => { c2.strokeStyle = '#2a4a8a'; c2.lineWidth = .07 * u; for (let i = 0; i < 6; i++) { c2.beginPath(); c2.moveTo(-.8 * u, (-.8 + i * .2) * u); c2.lineTo(.8 * u, (-.8 + i * .2) * u); c2.stroke(); } } });
    c.fillStyle = '#e8c040'; c.beginPath(); c.arc((k.front ? 0 : .5) * u, -.68 * u, .07 * u, 0, TAU); c.fill(); }, 0.8, 0.04);
  // tall fluted Persian crown
  X.pcrown = fit((c, u, f, Lt, k) => { const t = k.tone(T('#d8a830', '#8a6418', '#fff0a8'), Lt);
    k.celT(c, P([[-.5, -.4], [-.56, -1.3], [-.3, -1.18], [0, -1.32], [.3, -1.18], [.56, -1.3], [.5, -.4]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = '#7a2a8a'; c2.fillRect(-.5 * u, -.58 * u, u, .12 * u); c2.fillStyle = '#e8e8f0'; for (let i = 0; i < 4; i++) { c2.beginPath(); c2.arc((-.36 + i * .24) * u, -.52 * u, .04 * u, 0, TAU); c2.fill(); } } }); }, 0.74, 0.02);
  // Roman galea with a red crest
  X.galea = fit((c, u, f, Lt, k) => { const t = k.tone(T('#b8b8c0', '#6a6a74', '#ffffff'), Lt);
    k.celT(c, P(k.front ? [[-.66, -.28], [-.64, -.78], [0, -.94], [.64, -.78], [.66, -.28], [.5, -.28], [.5, -.1], [.36, -.1], [.36, -.4], [-.36, -.4], [-.36, -.1], [-.5, -.1], [-.5, -.28]] : [[-.7, -.26], [-.68, -.8], [.1, -.94], [.66, -.74], [.62, -.4], [.3, -.4], [.3, -.1], [.1, -.1], [-.2, -.26]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = '#b82a22'; c.beginPath(); c.ellipse((k.front ? 0 : .05) * u, -1.02 * u, (k.front ? .14 : .6) * u, .2 * u, 0, 0, TAU); c.fill(); c.fillStyle = S.rgba('#ffffff', .25); c.beginPath(); c.ellipse(-.1 * u, -1.08 * u, .3 * u, .05 * u, 0, 0, TAU); c.fill(); }, 0.74, 0.02);
  // Napoleonic bicorne, worn side-on
  X.bicorne = col => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#1e1e24', '#08080c', '#6a6a7a'), Lt);
    k.celT(c, P(k.front ? [[-1.1, -.5], [-.6, -.62], [-.3, -1.1], [.3, -1.1], [.6, -.62], [1.1, -.5], [.6, -.44], [-.6, -.44]] : [[-.7, -.44], [-.62, -.9], [-.2, -1.18], [.3, -1.16], [.66, -.86], [.72, -.46]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = '#2a4aa0'; c2.beginPath(); c2.arc((k.front ? .5 : .2) * u, -.82 * u, .1 * u, 0, TAU); c2.fill(); c2.fillStyle = '#e8e8e8'; c2.beginPath(); c2.arc((k.front ? .5 : .2) * u, -.82 * u, .06 * u, 0, TAU); c2.fill(); c2.fillStyle = '#c82a2a'; c2.beginPath(); c2.arc((k.front ? .5 : .2) * u, -.82 * u, .03 * u, 0, TAU); c2.fill(); } }); }, 0.74, 0.02);
  X.tophat = col => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#1e1c22', '#08080a', '#6a6a78'), Lt);
    k.celT(c, P([[-.48, -.66], [-.52, -1.5], [.52, -1.5], [.48, -.66]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = S.rgba('#ffffff', .25); c2.fillRect(-.36 * u, -1.46 * u, .08 * u, .74 * u); } });
    k.celT(c, P([[-.84, -.62], [.84, -.62], [.8, -.54], [-.8, -.54]], u), t, Lt, u, { swk: .5 }); }, 0.74, 0.02);
  X.fez = fit((c, u, f, Lt, k) => { const t = k.tone(T('#b8221e', '#6a100e', '#ff8a70'), Lt);
    k.celT(c, P([[-.5, -.56], [-.42, -1.14], [.42, -1.14], [.5, -.56]], u), t, Lt, u, { swk: .6 }); c.strokeStyle = '#1a1a1a'; c.lineWidth = .05 * u; c.beginPath(); c.moveTo(0, -1.14 * u); c.quadraticCurveTo(.3 * u, -1.1 * u, .38 * u, -.8 * u); c.stroke(); }, 0.74, 0.02);
  X.shako = col => fit((c, u, f, Lt, k) => { const t = k.tone(col || T('#1e1e24', '#08080c', '#6a6a7a'), Lt);
    k.celT(c, P([[-.56, -.5], [-.62, -1.22], [.62, -1.22], [.56, -.5]], u), t, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = '#d8b040'; c2.beginPath(); c2.arc(0, -.86 * u, .12 * u, 0, TAU); c2.fill(); c2.fillStyle = '#e8e8e8'; c2.fillRect(-.06 * u, -1.5 * u, .12 * u, .3 * u); } });
    k.celT(c, P(k.front ? [[-.56, -.5], [.56, -.5], [.46, -.38], [-.46, -.38]] : [[.2, -.52], [.8, -.48], [.86, -.38], [.3, -.4]], u), T('#08080a', '#000000', '#3a3a3a'), Lt, u, { swk: .5 }); }, 0.74, 0.02);
  X.pith = fit((c, u, f, Lt, k) => { const t = k.tone(T('#e8e0cc', '#a49a84', '#ffffff'), Lt);
    k.celT(c, P([[-.9, -.5], [-.66, -.66], [-.56, -1.04], [0, -1.18], [.56, -1.04], [.66, -.66], [.9, -.5], [.6, -.44], [-.6, -.44]], u), t, Lt, u, { swk: .6 }); }, 0.74, 0.02);
  X.skullcap = col => fit((c, u, f, Lt, k) => { const t = k.tone(col, Lt); k.celT(c, P([[-.62, -.6], [-.5, -.86], [0, -.96], [.5, -.86], [.62, -.6]], u), t, Lt, u, { swk: .6 }); }, 0.74, 0.02);
  X.headcloth = col => fit((c, u, f, Lt, k) => { const t = k.tone(col, Lt); k.celT(c, P(k.front ? [[-.66, -.3], [-.64, -.82], [0, -.96], [.64, -.82], [.66, -.3], [.5, -.46], [-.5, -.46]] : [[-.7, -.3], [-.66, -.84], [.1, -.98], [.66, -.76], [.66, -.42], [-.3, -.4], [-.62, .2], [-.8, .1]], u), t, Lt, u, { swk: .6 }); }, 0.82, 0.04);
  const turb = (b, s, r) => X.turban(T('#efe6d2', '#a99c82', '#ffffff'), T(b, s, r));
  const SKE = X.SK.andean, SKO = X.SK.olive, SKF = X.SK.fair, BLK = X.HR.black, GRY = X.HR.grey, BRN = X.HR.brown;
  const LIN = ['#f2ead6', '#b0a68c'], LIN2 = ['#e8dcc0', '#a4987a'];
  const egy = o => Object.assign({}, CH.farmer, { skin: SKE, hair: 'neat', hairCol: BLK, mustache: false, beard: false, build: 'man', shirt: LIN, pants: LIN, headwear: null, shoes: ['#6a4a2a', '#3a2a16'] }, o);
  const man = o => Object.assign({}, CH.farmer, { skin: SKF, hair: 'neat', hairCol: BRN, mustache: false, beard: false, build: 'man', shoes: ['#2a1a10', '#140a06'], headwear: null }, o);
  const C = {
    // ancient Egypt
    DIG: egy({ shirt: ['#c88a5a', '#83533a'], pants: LIN, headwear: X.headcloth(T('#efe6d2', '#a99c82', '#ffffff')) }),
    DIG2: egy({ skin: SKO, shirt: ['#b07a4a', '#704a2a'], pants: LIN2, headwear: X.headcloth(T('#d8c8a0', '#9a8a64', '#ffffff')) }),
    DIG3: egy({ skin: SKE, shirt: LIN2, pants: LIN2, mustache: true }),
    OVERSEER: egy({ shirt: LIN, pants: LIN, long: true, build: 'broad', headwear: X.headcloth(T('#3a5a8a', '#1a2a4a', '#8ab0e0')) }),
    NECHO: egy({ name: 'Necho II', shirt: ['#f4ecd8', '#b0a68c'], pants: ['#f4ecd8', '#b0a68c'], long: true, headwear: X.nemes, beard: true }),
    PRIEST: egy({ name: 'Priest', hair: 'elder', hairCol: GRY, build: 'elder', shirt: LIN, pants: LIN, long: true, stoop: 4 }),
    DARIUS: man({ name: 'Darius I', skin: SKO, hairCol: BLK, beard: true, mustache: true, shirt: ['#6a2a7a', '#341440'], pants: ['#6a2a7a', '#341440'], long: true, sleeves: true, build: 'broad', headwear: X.pcrown }),
    PERSIAN: man({ skin: SKO, hairCol: BLK, beard: true, shirt: ['#c88a2a', '#7a5214'], pants: ['#4a3a6a', '#241c34'], sleeves: true, headwear: X.skullcap(T('#e8dcc0', '#a49a7c', '#ffffff')) }),
    GREEK: man({ name: 'Engineer', skin: SKO, hairCol: BRN, beard: true, shirt: ['#f2ead6', '#b0a68c'], pants: ['#f2ead6', '#b0a68c'], long: true, build: 'man' }),
    GREEK2: man({ skin: SKO, hairCol: BLK, beard: true, shirt: ['#7a9ab8', '#3a5068'], pants: ['#7a9ab8', '#3a5068'], long: true, build: 'elder', hair: 'elder' }),
    ROMAN: man({ skin: SKO, hairCol: BRN, shirt: ['#a82a22', '#5a1410'], pants: ['#a82a22', '#5a1410'], sleeves: false, headwear: X.galea, build: 'broad' }),
    ROWER: egy({ shirt: ['#8a6a4a', '#4a3a24'], pants: LIN2 }),
    ARAB: man({ skin: SKE, hairCol: BLK, beard: true, mustache: true, shirt: ['#e8dcc0', '#a4987a'], pants: ['#e8dcc0', '#a4987a'], long: true, headwear: turb('#e8dcc0', '#a4987a', '#ffffff') }),
    ARAB2: man({ skin: SKO, hairCol: BLK, beard: true, shirt: ['#8a6a4a', '#4a3a24'], pants: ['#8a6a4a', '#4a3a24'], long: true, headwear: turb('#5a4a3a', '#2a2018', '#a08a70') }),
    SOLD: man({ skin: SKE, hairCol: BLK, beard: true, shirt: ['#3a3a4a', '#1a1a24'], pants: ['#5a4a3a', '#2a2018'], sleeves: true, headwear: turb('#2a2a32', '#0e0e14', '#8a8aa0') }),
    VIZIER: man({ name: 'Sokollu Mehmed Pasha', skin: SKF, hairCol: GRY, beard: true, mustache: true, build: 'elder', shirt: ['#2a6a4a', '#123424'], pants: ['#2a6a4a', '#123424'], long: true, sleeves: true, headwear: turb('#f4f0e4', '#b0a890', '#ffffff') }),
    SULTAN: man({ skin: SKF, hairCol: BLK, beard: true, mustache: true, build: 'broad', shirt: ['#c8a040', '#7a5a1a'], pants: ['#c8a040', '#7a5a1a'], long: true, sleeves: true, headwear: turb('#ffffff', '#c0b8a8', '#ffffff') }),
    // 1798
    NAPOLEON: man({ name: 'Napoleon', skin: SKF, hair: 'swept', hairCol: BRN, shirt: ['#1e3a7a', '#0e1c3e'], pants: ['#f2ead6', '#b0a68c'], sleeves: true, build: 'man', headwear: X.bicorne(), shoes: ['#1a1a1a', '#000000'] }),
    FRSOLD: man({ skin: SKF, shirt: ['#2a4a9a', '#14244e'], pants: ['#f2ead6', '#b0a68c'], sleeves: true, mustache: true, headwear: X.bicorne(), shoes: ['#1a1a1a', '#000000'] }),
    LEPERE: man({ name: 'Le Pere', skin: SKF, hairCol: GRY, shirt: ['#4a3a2a', '#241c14'], pants: ['#d8c8a0', '#9a8a64'], sleeves: true, build: 'elder', glasses: true }),
    // 1850s-60s
    LESSEPS: man({ name: 'de Lesseps', skin: SKF, hairCol: GRY, mustache: true, shirt: ['#2a2a32', '#0e0e14'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, tie: '#e8e8e8', build: 'man' }),
    LESSEPS_H: man({ name: 'de Lesseps', skin: SKF, hairCol: GRY, mustache: true, shirt: ['#2a2a32', '#0e0e14'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, tie: '#e8e8e8', build: 'man', headwear: X.tophat() }),
    YLESSEPS: man({ name: 'de Lesseps', skin: SKF, hairCol: BRN, mustache: true, shirt: ['#3a4a6a', '#1c2434'], pants: ['#d8c8a0', '#9a8a64'], sleeves: true, tie: '#e8e8e8' }),
    SAID: man({ name: "Sa'id", skin: SKO, hairCol: BLK, mustache: true, build: 'broad', shirt: ['#1e2a5a', '#0e142c'], pants: ['#1e2a5a', '#0e142c'], sleeves: true, headwear: X.fez }),
    YSAID: man({ name: "Sa'id", skin: SKO, hairCol: BLK, build: 'broad', shirt: ['#3a6a8a', '#1c3444'], pants: ['#f2ead6', '#b0a68c'], sleeves: true, headwear: X.fez }),
    PALM: man({ name: 'Palmerston', skin: SKF, hairCol: GRY, shirt: ['#1e1e24', '#08080c'], pants: ['#3a3a40', '#1a1a1e'], sleeves: true, tie: '#f4f4f0', build: 'elder', headwear: X.tophat() }),
    NEWSBOY: Object.assign({}, CH.girl, { skin: SKF, hair: 'neat', hairCol: BRN, shirt: ['#6a5a4a', '#352a20'], pants: ['#4a4a40', '#24241e'], headwear: X.skullcap(T('#5a4a3a', '#2a2018', '#a08a70')) }),
    FELLAH: egy({ skin: SKE, shirt: ['#5a6a8a', '#2a3444'], pants: ['#5a6a8a', '#2a3444'], long: true, headwear: X.skullcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    FELLAH2: egy({ skin: SKO, shirt: ['#e8dcc0', '#a4987a'], pants: ['#e8dcc0', '#a4987a'], long: true, mustache: true, headwear: turb('#e8dcc0', '#a4987a', '#ffffff') }),
    FELLAH3: egy({ skin: SKE, shirt: ['#8a5a3a', '#4a2e1c'], pants: ['#8a5a3a', '#4a2e1c'], long: true, headwear: X.skullcap(T('#7a2a22', '#3a1410', '#c87a6a')) }),
    RIDER: man({ skin: SKF, hairCol: BRN, mustache: true, shirt: ['#e8e0cc', '#a49a84'], pants: ['#4a3a2a', '#241c14'], sleeves: true, headwear: X.pith }),
    DOCTOR: man({ skin: SKF, hairCol: BRN, beard: true, shirt: ['#2a2a32', '#0e0e14'], pants: ['#2a2a32', '#0e0e14'], sleeves: true, glasses: true }),
    AMBASS: man({ skin: SKF, hairCol: GRY, shirt: ['#1e1e24', '#08080c'], pants: ['#3a3a40', '#1a1a1e'], sleeves: true, tie: '#f4f4f0', mustache: true }),
    SULTAN19: man({ name: 'Sultan', skin: SKF, hairCol: BLK, beard: true, mustache: true, build: 'broad', shirt: ['#1e2a4a', '#0e1424'], pants: ['#1e2a4a', '#0e1424'], sleeves: true, headwear: X.fez }),
    EUGENIE: Object.assign({}, CH.aisha, { name: 'Eugenie', skin: SKF, hair: 'bun', hairCol: BRN, shirt: ['#f4f0f4', '#b8b0bc'], pants: ['#f4f0f4', '#b8b0bc'], long: true, dupatta: null, headwear: null }),
    ISMAIL: man({ name: 'Ismail', skin: SKO, hairCol: BLK, beard: true, mustache: true, build: 'broad', shirt: ['#1e1e2a', '#0a0a10'], pants: ['#1e1e2a', '#0a0a10'], sleeves: true, tie: '#c8a040', headwear: X.fez }),
    GUEST: man({ skin: SKF, hairCol: BRN, mustache: true, shirt: ['#1e1e24', '#08080c'], pants: ['#1e1e24', '#08080c'], sleeves: true, tie: '#f4f4f0' }),
    GUESTW: Object.assign({}, CH.aisha, { skin: SKF, hair: 'bun', hairCol: BLK, shirt: ['#8a2a4a', '#4a1424'], pants: ['#8a2a4a', '#4a1424'], long: true, dupatta: null, headwear: null }),
    DISRAELI: man({ name: 'Disraeli', skin: SKF, hair: 'curly', hairCol: BLK, beard: true, shirt: ['#1e1e24', '#08080c'], pants: ['#3a3a40', '#1a1a1e'], sleeves: true, tie: '#f4f4f0', build: 'elder' }),
    BANKER: man({ name: 'Rothschild', skin: SKF, hairCol: GRY, mustache: true, beard: true, shirt: ['#2a2a32', '#0e0e14'], pants: ['#2a2a32', '#0e0e14'], sleeves: true, tie: '#e8e8e8', build: 'broad' }),
    CLERK: man({ skin: SKO, hairCol: BLK, shirt: ['#3a3a44', '#1c1c22'], pants: ['#3a3a44', '#1c1c22'], sleeves: true, headwear: X.fez, glasses: true }),
    REDCOAT: man({ skin: SKF, hairCol: BRN, mustache: true, shirt: ['#b82a22', '#5a1410'], pants: ['#2a2a3a', '#14141c'], sleeves: true, headwear: X.pith, shoes: ['#1a1a1a', '#000000'] }),
    // 1956 and today
    NASSER: man({ name: 'Nasser', skin: SKO, hairCol: X.HR.grey, mustache: true, build: 'broad', shirt: ['#4a4a52', '#24242a'], pants: ['#4a4a52', '#24242a'], sleeves: true, tie: '#2a2a3a' }),
    EGMAN: man({ skin: SKO, hairCol: BLK, mustache: true, shirt: ['#e8e4dc', '#a8a49c'], pants: ['#4a4a52', '#24242a'], sleeves: true }),
    EGMAN2: egy({ skin: SKE, shirt: ['#5a6a8a', '#2a3444'], pants: ['#5a6a8a', '#2a3444'], long: true }),
    EGWOMAN: Object.assign({}, CH.seller, { skin: SKO, hair: 'bun', hairCol: BLK }),
    PILOT: man({ skin: SKO, hairCol: BLK, shirt: ['#f4f4f0', '#b8b8b0'], pants: ['#1e2a4a', '#0e1424'], sleeves: true, headwear: X.peaked ? X.peaked(T('#f4f4f0', '#b8b8b0', '#ffffff')) : null }),
  };
  S.SZC = C;
})(window);
