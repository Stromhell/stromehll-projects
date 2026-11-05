// Mongols / Ain Jalut cast, 1206-1295: Genghis Khan, Mongol riders and envoys, Hulagu, Mongke, Kitbuqa, Berke, Ghazan,
// Khwarazmian shah, governor and guards, Silk Road merchants, the Abbasid caliph, Baghdad scholars, Qutuz, Baybars
// (one pale clouded eye), Mamluk soldiers, Kipchak slave boys, Chinese siege engineers.
// New headwear: Mongol fur-brim hat, Mongol spiked helmet, Mamluk turban-helmet, Abbasid black turban, Kipchak fur cap.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const fit = (fn, sc, dy) => (c, u, f, Lt, k) => { c.save(); c.translate(0, dy * u); c.scale(sc, sc); fn(c, u, f, Lt, k); c.restore(); };
  const T = (b, s, r) => ({ base: b, shade: s, rim: r });
  // Mongol hat: rounded felt crown, wide fur brim turned up, a little top knob
  X.mhat = (crown, fur) => fit((c, u, f, Lt, k) => { const t = k.tone(crown || T('#8a2a22', '#4a1210', '#e07a60'), Lt), fr = k.tone(fur || T('#6a4a32', '#34241a', '#b89a7a'), Lt);
    k.celT(c, P([[-.5, -.6], [-.52, -1.02], [-.24, -1.22], [.24, -1.22], [.52, -1.02], [.5, -.6]], u), t, Lt, u, { swk: .6 });
    k.celT(c, P(k.front ? [[-.86, -.42], [-.92, -.86], [-.5, -.74], [0, -.7], [.5, -.74], [.92, -.86], [.86, -.42], [0, -.36]] : [[-.84, -.4], [-.9, -.84], [-.4, -.74], [.3, -.72], [.82, -.8], [.78, -.42], [0, -.36]], u), fr, Lt, u, { swk: .7, over: c2 => {
      c2.strokeStyle = S.rgba('#000000', .18); c2.lineWidth = .03 * u; for (let i = 0; i < 10; i++) { const x = (-.8 + i * .17) * u; c2.beginPath(); c2.moveTo(x, -.42 * u); c2.lineTo(x + .04 * u, -.78 * u); c2.stroke(); } } });
    c.fillStyle = '#c8a040'; c.beginPath(); c.arc(0, -1.26 * u, .07 * u, 0, TAU); c.fill(); }, 0.86, 0.06);
  // Mongol helmet: steel bowl, tall spike with a red horsehair tassel, leather flaps over the neck
  X.mhelm = fit((c, u, f, Lt, k) => { const st = k.tone(T('#8a9096', '#3e444a', '#e8eef2'), Lt), le = k.tone(T('#5a3a24', '#2a1a10', '#9a7a5a'), Lt);
    k.celT(c, P(k.front ? [[-.74, -.4], [-.84, .3], [-.5, .34], [-.5, -.3], [.5, -.3], [.5, .34], [.84, .3], [.74, -.4]] : [[-.72, -.4], [-.86, .34], [-.3, .36], [-.2, -.3], [.4, -.36]], u), le, Lt, u, { swk: .6, over: c2 => { c2.fillStyle = S.rgba('#c8a040', .6); for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) c2.fillRect((-.8 + i * .26) * u, (-.2 + j * .2) * u, .06 * u, .06 * u); } });
    k.celT(c, P([[-.68, -.38], [-.66, -.8], [-.36, -1.1], [0, -1.22], [.36, -1.1], [.66, -.8], [.68, -.38]], u), st, Lt, u, { swk: .7, over: c2 => { c2.fillStyle = S.rgba('#ffffff', .3); c2.beginPath(); c2.ellipse(-.24 * u, -.82 * u, .08 * u, .2 * u, -.3, 0, TAU); c2.fill(); c2.fillStyle = '#c8a040'; c2.fillRect(-.68 * u, -.46 * u, 1.36 * u, .08 * u); } });
    c.strokeStyle = '#4e545a'; c.lineWidth = .07 * u; c.beginPath(); c.moveTo(0, -1.2 * u); c.lineTo(0, -1.6 * u); c.stroke();
    c.fillStyle = '#a82a22'; c.beginPath(); c.moveTo(0, -1.5 * u); c.quadraticCurveTo(-.3 * u, -1.3 * u, -.26 * u, -1.0 * u); c.quadraticCurveTo(-.1 * u, -1.25 * u, 0, -1.4 * u); c.fill(); }, 0.74, 0.02);
  // Mamluk helmet: pointed steel dome with a white turban wound round its base, nasal bar at the front
  X.mamhelm = (wrap, trim) => fit((c, u, f, Lt, k) => { const st = k.tone(T('#9aa0a6', '#454b52', '#f2f6f8'), Lt), tw = k.tone(wrap || T('#efe6d2', '#a99c82', '#ffffff'), Lt);
    k.celT(c, P([[-.62, -.6], [-.6, -.9], [-.3, -1.24], [0, -1.46], [.3, -1.24], [.6, -.9], [.62, -.6]], u), st, Lt, u, { swk: .7, over: c2 => { c2.fillStyle = S.rgba('#ffffff', .3); c2.beginPath(); c2.ellipse(-.2 * u, -1.0 * u, .07 * u, .2 * u, -.3, 0, TAU); c2.fill(); if (trim) { c2.fillStyle = trim; c2.fillRect(-.6 * u, -.98 * u, 1.2 * u, .07 * u); } } });
    k.celT(c, P([[-.74, -.36], [-.78, -.7], [-.4, -.82], [.4, -.82], [.78, -.7], [.74, -.36], [0, -.42]], u), tw, Lt, u, { swk: .7, over: c2 => { c2.strokeStyle = S.rgba(tw.shade, .6); c2.lineWidth = .03 * u; for (let i = 0; i < 3; i++) { c2.beginPath(); c2.moveTo(-.72 * u, (-.44 - i * .11) * u); c2.quadraticCurveTo(0, (-.6 - i * .08) * u, .72 * u, (-.5 - i * .1) * u); c2.stroke(); } } });
    if (k.front) { c.fillStyle = st.base; c.fillRect(-.04 * u, -.42 * u, .08 * u, .34 * u); } else { c.fillStyle = st.base; c.fillRect(.36 * u, -.42 * u, .07 * u, .32 * u); } }, 0.74, 0.02);
  // big Abbasid black turban
  X.bturban = fit((c, u, f, Lt, k) => X.turban(T('#26222a', '#0a080c', '#6a6474'), T('#c8a040', '#7a5a1a', '#fff0a0'))(c, u, f, Lt, k), 1.12, .02);
  // Kipchak steppe boy's fur cap
  X.kcap = fit((c, u, f, Lt, k) => { const t = k.tone(T('#8a6a4a', '#4a3424', '#c8a888'), Lt);
    k.celT(c, P([[-.66, -.4], [-.7, -.84], [-.3, -1.0], [.3, -1.0], [.7, -.84], [.66, -.4]], u), t, Lt, u, { swk: .7 }); }, 0.74, 0.02);
  // Chinese engineer's black cloth cap
  X.futou = fit((c, u, f, Lt, k) => { const t = k.tone(T('#26242a', '#08080a', '#6a6a78'), Lt);
    k.celT(c, P([[-.58, -.5], [-.56, -.96], [0, -1.08], [.56, -.96], [.58, -.5]], u), t, Lt, u, { swk: .6 }); c.fillStyle = t.base; c.fillRect(-.06 * u, -1.2 * u, .3 * u, .16 * u); }, 0.74, 0.02);
  // a turban wound over a Mongol hat (Berke, Ghazan)
  X.mturban = (cloth) => fit((c, u, f, Lt, k) => { X.mhat(T('#2a6a4a', '#123424', '#7ac0a0'), T('#e8e0cc', '#a8a08a', '#ffffff'))(c, u, f, Lt, k); const tw = k.tone(cloth || T('#f4f0e4', '#b0a890', '#ffffff'), Lt);
    k.celT(c, P([[-.6, -.66], [-.58, -.96], [-.2, -1.06], [.3, -1.04], [.6, -.92], [.6, -.66], [0, -.74]], u), tw, Lt, u, { swk: .6 }); }, 1, 0);
  // Baybars' pale clouded eye, drawn over the far/right eye
  const cloud = hw => (c, u, f, Lt, k) => { hw(c, u, f, Lt, k); if (k.back) return; const x = k.front ? .16 * u : .3 * u, y = .01 * u;
    c.save(); c.fillStyle = 'rgba(214,228,236,.92)'; c.beginPath(); c.ellipse(x, y, .065 * u, .05 * u, 0, 0, TAU); c.fill(); c.fillStyle = 'rgba(150,180,200,.55)'; c.beginPath(); c.arc(x, y, .03 * u, 0, TAU); c.fill(); c.restore(); };
  const SKF = X.SK.fair, SKO = X.SK.olive, SKE = X.SK.andean, BLK = X.HR.black, BRN = X.HR.brown, GRY = X.HR.grey;
  const SKM = T('#c89a6a', '#86603e', '#f4c896'); // steppe skin
  const BOOT = ['#3a2416', '#1a0e08'], MBOOT = ['#5a2a1a', '#2a120a'];
  const man = o => Object.assign({}, CH.farmer, { skin: SKO, hair: 'neat', hairCol: BLK, mustache: false, beard: false, build: 'man', shoes: BOOT, headwear: null }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: SKM, hair: 'neat', hairCol: BLK, headwear: null }, o);
  const mon = o => man(Object.assign({ skin: SKM, mustache: true, long: true, sleeves: true, shoes: MBOOT, headwear: X.mhat() }, o));
  const turb = (b, s, r) => X.turban(T(b, s, r), T('#c8a040', '#7a5a1a', '#fff0a0'));
  const C = {
    // Mongols
    GENGHIS: mon({ name: 'Genghis Khan', build: 'broad', beard: true, hairCol: T('#5a4a3a', '#2a2018', '#a08a70'), shirt: ['#2a4a7a', '#14243c'], pants: ['#2a4a7a', '#14243c'], headwear: X.mhat(T('#e8e0cc', '#a8a08a', '#ffffff'), T('#4a3424', '#24180e', '#8a6a4a')) }),
    MONGOL: mon({ shirt: ['#6a4a2a', '#34241a'], pants: ['#4a3a2a', '#241c14'], headwear: X.mhelm }),
    MONGOL2: mon({ beard: true, shirt: ['#2a4a5a', '#14242c'], pants: ['#4a3a2a', '#241c14'], headwear: X.mhelm }),
    MONGOL3: mon({ shirt: ['#7a2a22', '#3c1410'], pants: ['#4a3a2a', '#241c14'] }),
    MONGOL4: mon({ shirt: ['#4a5a3a', '#242c1c'], pants: ['#3a3028', '#1c1814'], headwear: X.mhat(T('#2a4a6a', '#142434', '#7a9ac0')) }),
    ENVOY: mon({ name: 'Envoy', shirt: ['#c8a040', '#7a5a1a'], pants: ['#4a3a2a', '#241c14'], headwear: X.mhat(T('#2a4a6a', '#142434', '#7a9ac0')) }),
    ENVOY2: mon({ name: 'Envoy', beard: true, shirt: ['#3a6a5a', '#1c342c'], pants: ['#4a3a2a', '#241c14'] }),
    HULAGU: mon({ name: 'Hulagu', build: 'broad', beard: true, shirt: ['#8a1a22', '#440c10'], pants: ['#3a2a22', '#1c1410'], headwear: X.mhelm }),
    HULAGUH: mon({ name: 'Hulagu', build: 'broad', beard: true, shirt: ['#8a1a22', '#440c10'], pants: ['#3a2a22', '#1c1410'], headwear: X.mhat(T('#c8a040', '#7a5a1a', '#fff0a0')) }),
    MONGKE: mon({ name: 'Möngke', build: 'broad', beard: true, shirt: ['#e8d8a8', '#a89868'], pants: ['#3a2a22', '#1c1410'], headwear: X.mhat(T('#e8e0cc', '#a8a08a', '#ffffff'), T('#2a2018', '#0e0a08', '#6a5a4a')) }),
    KITBUQA: mon({ name: 'Kitbuqa', beard: true, hairCol: GRY, shirt: ['#2a2a3a', '#14141c'], pants: ['#2a2a3a', '#14141c'], headwear: X.mhelm }),
    BERKE: mon({ name: 'Berke', build: 'broad', beard: true, shirt: ['#2a6a4a', '#123424'], pants: ['#3a2a22', '#1c1410'], headwear: X.mturban() }),
    GHAZAN: mon({ name: 'Ghazan', beard: true, shirt: ['#3a2a7a', '#1c143c'], pants: ['#3a2a7a', '#1c143c'], tie: '#c8a040', headwear: X.mturban(T('#ffffff', '#c0b8a8', '#ffffff')) }),
    // Khwarazm and the Silk Road
    SHAH: man({ name: 'Shah Muhammad II', build: 'broad', beard: true, mustache: true, shirt: ['#2a6a7a', '#12343c'], pants: ['#2a6a7a', '#12343c'], long: true, sleeves: true, tie: '#c8a040', headwear: turb('#f4f0e4', '#b0a890', '#ffffff') }),
    SHAHSICK: man({ name: 'Shah Muhammad II', build: 'man', beard: true, mustache: true, hairCol: GRY, shirt: ['#2a5a6a', '#122c34'], pants: ['#2a5a6a', '#122c34'], long: true, sleeves: true }),
    GOVERNOR: man({ name: 'Inalchuq', beard: true, mustache: true, shirt: ['#8a2a5a', '#44142c'], pants: ['#8a2a5a', '#44142c'], long: true, sleeves: true, headwear: turb('#e8c870', '#a08838', '#fff0b0') }),
    KGUARD: man({ beard: true, shirt: ['#5a5a6a', '#2c2c34'], pants: ['#4a3a2a', '#241c14'], sleeves: true, headwear: X.spangen }),
    KGUARD2: man({ skin: SKE, mustache: true, shirt: ['#6a4a3a', '#34241c'], pants: ['#4a3a2a', '#241c14'], sleeves: true, headwear: X.spangen }),
    MERCH: man({ skin: SKE, beard: true, shirt: ['#c88a2a', '#7a5214'], pants: ['#4a3a6a', '#241c34'], long: true, sleeves: true, headwear: turb('#e8dcc0', '#a4987a', '#ffffff') }),
    MERCH2: man({ beard: true, mustache: true, shirt: ['#3a6a4a', '#1c3424'], pants: ['#5a4a3a', '#2a2018'], long: true, sleeves: true, headwear: X.skullcap(T('#7a2a22', '#3a1410', '#c87a6a')) }),
    // Baghdad
    CALIPH: man({ name: "al-Musta'sim", build: 'broad', beard: true, mustache: true, shirt: ['#1e1a22', '#08060a'], pants: ['#1e1a22', '#08060a'], long: true, sleeves: true, tie: '#c8a040', headwear: X.bturban }),
    GENERAL: man({ name: 'General', beard: true, mustache: true, hairCol: GRY, shirt: ['#5a5a6a', '#2c2c34'], pants: ['#3a2a22', '#1c1410'], sleeves: true, headwear: X.mamhelm(T('#26222a', '#0a080c', '#6a6474')) }),
    SCHOLAR: man({ build: 'elder', beard: true, hairCol: GRY, shirt: ['#e8dcc0', '#a4987a'], pants: ['#e8dcc0', '#a4987a'], long: true, sleeves: true, headwear: turb('#ffffff', '#c0b8a8', '#ffffff') }),
    SCHOLAR2: man({ beard: true, shirt: ['#3a4a7a', '#1c243c'], pants: ['#3a4a7a', '#1c243c'], long: true, sleeves: true, headwear: turb('#e8dcc0', '#a4987a', '#ffffff') }),
    SCRIBE: man({ skin: SKE, shirt: ['#7a5a3a', '#3c2c1c'], pants: ['#7a5a3a', '#3c2c1c'], long: true, sleeves: true, headwear: X.skullcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    CHINESE: man({ skin: T('#e0b088', '#a07050', '#ffdcb8'), mustache: true, shirt: ['#3a4a5a', '#1c242c'], pants: ['#3a4a5a', '#1c242c'], long: true, sleeves: true, headwear: X.futou }),
    // Egypt and the Mamluks
    QUTUZ: man({ name: 'Qutuz', build: 'broad', beard: true, mustache: true, skin: SKF, hairCol: BRN, shirt: ['#b8862a', '#6a4a14'], pants: ['#4a3a2a', '#241c14'], sleeves: true, tie: '#8a1a22', headwear: X.mamhelm(null, '#c8a040') }),
    QUTUZB: man({ name: 'Qutuz', build: 'broad', beard: true, mustache: true, skin: SKF, hairCol: BRN, shirt: ['#b8862a', '#6a4a14'], pants: ['#4a3a2a', '#241c14'], sleeves: true, tie: '#8a1a22', headwear: null }),
    QUTUZR: man({ name: 'Qutuz', build: 'broad', beard: true, mustache: true, skin: SKF, hairCol: BRN, shirt: ['#b8862a', '#6a4a14'], pants: ['#b8862a', '#6a4a14'], long: true, sleeves: true, tie: '#8a1a22', headwear: turb('#ffffff', '#c0b8a8', '#ffffff') }),
    BAYBARS: man({ name: 'Baybars', build: 'broad', mustache: true, skin: SKF, hairCol: T('#8a6a3a', '#4a3418', '#d8b880'), shirt: ['#6a6a7a', '#34343c'], pants: ['#4a3a2a', '#241c14'], sleeves: true, tie: '#c8a040', headwear: cloud(X.mamhelm(null, '#c8a040')) }),
    BAYBARSB: man({ name: 'Baybars', build: 'broad', mustache: true, skin: SKF, hairCol: T('#8a6a3a', '#4a3418', '#d8b880'), shirt: ['#6a6a7a', '#34343c'], pants: ['#4a3a2a', '#241c14'], sleeves: true, tie: '#c8a040', headwear: cloud(() => {}) }),
    BAYBARSK: man({ name: 'Sultan Baybars', build: 'broad', mustache: true, beard: true, skin: SKF, hairCol: T('#8a6a3a', '#4a3418', '#d8b880'), shirt: ['#c8a040', '#7a5a1a'], pants: ['#c8a040', '#7a5a1a'], long: true, sleeves: true, headwear: cloud(turb('#ffffff', '#c0b8a8', '#ffffff')) }),
    MAMLUK: man({ skin: SKF, mustache: true, shirt: ['#7a7a8a', '#3c3c44'], pants: ['#c8a040', '#7a5a1a'], sleeves: true, headwear: X.mamhelm() }),
    MAMLUK2: man({ skin: SKM, beard: true, shirt: ['#6a6a7a', '#34343c'], pants: ['#8a2a22', '#441410'], sleeves: true, headwear: X.mamhelm() }),
    MAMLUK3: man({ skin: SKO, mustache: true, shirt: ['#8a8a96', '#44444c'], pants: ['#3a4a6a', '#1c2434'], sleeves: true, headwear: X.mamhelm(T('#e8c870', '#a08838', '#fff0b0')) }),
    RECRUIT: man({ skin: SKM, shirt: ['#c8b490', '#8a7454'], pants: ['#6a4a2a', '#34241a'], sleeves: true, headwear: X.skullcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    BOY: kid({ shirt: ['#8a6a4a', '#4a3424'], pants: ['#5a4a3a', '#2a2018'], headwear: X.kcap }),
    BOY2: kid({ skin: SKF, hairCol: BRN, shirt: ['#6a5a3a', '#342c1c'], pants: ['#5a4a3a', '#2a2018'] }),
    SLAVER: man({ build: 'broad', beard: true, mustache: true, shirt: ['#5a2a4a', '#2c1424'], pants: ['#5a2a4a', '#2c1424'], long: true, sleeves: true, headwear: turb('#c8a040', '#7a5a1a', '#fff0a0') }),
    BUYER: man({ skin: SKE, beard: true, shirt: ['#2a5a6a', '#142c34'], pants: ['#2a5a6a', '#142c34'], long: true, sleeves: true, headwear: turb('#ffffff', '#c0b8a8', '#ffffff') }),
    CAIRENE: man({ skin: SKE, shirt: ['#e8dcc0', '#a4987a'], pants: ['#e8dcc0', '#a4987a'], long: true, headwear: X.skullcap(T('#e8dcc0', '#a4987a', '#ffffff')) }),
    COURTIER: man({ beard: true, shirt: ['#5a3a7a', '#2c1c3c'], pants: ['#5a3a7a', '#2c1c3c'], long: true, sleeves: true, headwear: turb('#ffffff', '#c0b8a8', '#ffffff') }),
  };
  S.MGC = C;
})(window);
