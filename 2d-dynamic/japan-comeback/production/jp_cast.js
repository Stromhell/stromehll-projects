// Japan comeback cast (1945-1964): the Sakai family, MacArthur, workers, engineers, salarymen.
(function (G) {
  const S = G.S, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const P = (pts, u) => S.poly(pts.map(p => [p[0] * u, p[1] * u]));
  const JSK = { base: '#e6b88e', shade: '#a2704c', rim: '#ffe4c4' }, JSK2 = { base: '#d8a47a', shade: '#93603e', rim: '#f8d4ac' };
  const BLK = { base: '#1c1a1e', shade: '#08070a', rim: '#5a5660' }, GRY = { base: '#6a6a70', shade: '#38383e', rim: '#b0b0b8' };
  // army field cap with a short peak and a yellow star
  X.senbo = (c, u, f, Lt, k) => { const t = k.tone({ base: '#7a6a3e', shade: '#3e3420', rim: '#c8b880' }, Lt);
    k.celT(c, P(k.front ? [[-.62, -.42], [-.6, -.8], [0, -.9], [.6, -.8], [.62, -.42]] : [[-.64, -.44], [-.6, -.82], [.1, -.92], [.6, -.76], [.64, -.44]], u), t, Lt, u, { swk: .6 });
    k.celT(c, P(k.front ? [[-.5, -.44], [.5, -.44], [.4, -.34], [-.4, -.34]] : [[.3, -.46], [.84, -.42], [.9, -.34], [.4, -.36]], u), t, Lt, u, { swk: .5 });
    c.fillStyle = '#e8c030'; c.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU - Math.PI / 2, r = (i % 2 ? .04 : .1) * u; c.lineTo((k.front ? 0 : .3) * u + Math.cos(a) * r, -.66 * u + Math.sin(a) * r); } c.fill(); };
  // school cap (gakubo): black with a shiny peak
  X.gakubo = (c, u, f, Lt, k) => { const t = k.tone({ base: '#1e2028', shade: '#08080c', rim: '#6a6a80' }, Lt);
    k.celT(c, P(k.front ? [[-.6, -.44], [-.64, -.78], [.64, -.78], [.6, -.44]] : [[-.62, -.46], [-.66, -.8], [.6, -.8], [.62, -.46]], u), t, Lt, u, { swk: .6 });
    k.celT(c, P(k.front ? [[-.56, -.46], [.56, -.46], [.46, -.34], [-.46, -.34]] : [[.28, -.48], [.86, -.44], [.92, -.34], [.36, -.38]], u), t, Lt, u, { swk: .5 });
    c.fillStyle = '#d8b040'; c.beginPath(); c.arc((k.front ? 0 : .3) * u, -.62 * u, .06 * u, 0, TAU); c.fill(); };
  // headscarf (tenugui) tied over the hair
  X.tenugui = col => (c, u, f, Lt, k) => { const t = k.tone(col, Lt);
    k.celT(c, P(k.front ? [[-.66, -.3], [-.62, -.8], [0, -.94], [.62, -.8], [.66, -.3], [.4, -.5], [-.4, -.5]] : [[-.68, -.3], [-.64, -.82], [.1, -.96], [.66, -.74], [.68, -.36], [.36, -.52], [-.4, -.5]], u), t, Lt, u, { swk: .6 });
    c.fillStyle = S.rgba('#ffffff', .5); for (let i = 0; i < 5; i++) { c.beginPath(); c.arc((-.4 + i * .2) * u, (-.66 - .06 * Math.sin(i)) * u, .035 * u, 0, TAU); c.fill(); } };
  const man = o => Object.assign({}, CH.farmer, { headwear: null, skin: JSK, hair: 'neat', hairCol: BLK, mustache: false, beard: false, build: 'man', shoes: ['#2a1a10', '#140a06'] }, o);
  const woman = o => Object.assign({}, CH.seller, { skin: JSK, hair: 'bun', hairCol: BLK, dupatta: null, headwear: null }, o);
  const kid = o => Object.assign({}, CH.girl, { skin: JSK, hair: 'neat', hairCol: BLK, headwear: null }, o);
  const suit = (col, tie, o = {}) => man(Object.assign({ shirt: col, pants: col, tie, sleeves: true }, o));
  const KHAKI = ['#8a7a4a', '#4a4022'], ARMY = ['#7a6a3e', '#3e3420'], INDIGO = ['#2e3a5a', '#141a2c'], MONPE = ['#4a3a4a', '#241a24'];
  const C = {
    // the Sakai family
    MOTHER: woman({ name: 'Mother', shirt: ['#6a5a4a', '#352a20'], pants: MONPE, headwear: X.tenugui({ base: '#c8c0b0', shade: '#7a7464', rim: '#ffffff' }) }),
    MOTHER64: woman({ name: 'Mother', shirt: ['#5a7a8a', '#2a3e48'], pants: ['#3a3a44', '#1c1c22'], hairCol: GRY }),
    SON: kid({ name: 'Kenji', build: 'kid', shirt: ['#7a6a52', '#3e3426'], pants: ['#4a4a40', '#24241e'] }),
    DAUGHTER: kid({ name: 'Hana', build: 'kid', hair: 'bun', shirt: ['#a85a5a', '#5a2a2a'], pants: MONPE }),
    FATHER: man({ name: 'Father', shirt: ARMY, pants: ARMY, sleeves: true, headwear: X.senbo, build: 'man' }),
    FATHER_W: man({ name: 'Father', shirt: ['#3a4a5a', '#1c2430'], pants: ['#3a4a5a', '#1c2430'], sleeves: true }),
    KENJI: man({ name: 'Kenji', shirt: ['#3a5a7a', '#1c2c3e'], pants: ['#3a5a7a', '#1c2c3e'], sleeves: true, headwear: X.tenugui({ base: '#e8e4d8', shade: '#a09a8a', rim: '#ffffff' }) }),
    HANA: woman({ name: 'Hana', hair: 'bun', shirt: ['#e8e4dc', '#a8a49c'], pants: ['#2a3a4a', '#141c24'], glasses: true }),
    STUDENT: man({ shirt: ['#1e2028', '#0a0a10'], pants: ['#1e2028', '#0a0a10'], sleeves: true, headwear: X.gakubo, build: 'man' }),
    // the occupation
    MACARTHUR: man({ name: 'MacArthur', skin: { base: '#e8b494', shade: '#a8705a', rim: '#ffdcc0' }, hairCol: GRY, shirt: KHAKI, pants: KHAKI, sleeves: true, glasses: true, headwear: X.peaked ? X.peaked({ base: '#8a7a4a', shade: '#4a4022', rim: '#d8c890' }) : null, build: 'broad' }),
    GI: man({ skin: { base: '#e8b494', shade: '#a8705a', rim: '#ffdcc0' }, hairCol: { base: '#6a4a2a', shade: '#2e1e10', rim: '#c09a70' }, shirt: ['#5a5a3a', '#2c2c1c'], pants: ['#5a5a3a', '#2c2c1c'], sleeves: true }),
    HIROHITO: man({ name: 'Hirohito', shirt: ['#1a1a20', '#08080c'], pants: ['#3a3a40', '#1a1a1e'], sleeves: true, tie: '#5a5a5a', glasses: true, mustache: true, build: 'man' }),
    FARMER: man({ skin: JSK2, shirt: ['#5a6a5a', '#2c342c'], pants: ['#4a4a3a', '#24241c'], sleeves: true, headwear: X.tenugui({ base: '#d8d0c0', shade: '#908878', rim: '#ffffff' }) }),
    OLDFARMER: Object.assign(man({ skin: JSK2, hairCol: GRY, shirt: ['#6a5a40', '#34281c'], pants: ['#4a4a3a', '#24241c'], sleeves: true }), { build: 'elder', hair: 'elder' }),
    DODGE: suit(['#3a3a44', '#1a1a22'], '#7a2a2a', { name: 'Dodge', skin: { base: '#e8b494', shade: '#a8705a', rim: '#ffdcc0' }, hairCol: GRY, glasses: true, build: 'broad' }),
    TOYODA: suit(['#2a2a30', '#121216'], '#3a3a5a', { name: 'Kiichiro Toyoda', glasses: true, mustache: true }),
    YOSHIDA: suit(['#1a1a20', '#08080c'], '#5a5a5a', { name: 'Yoshida', hairCol: GRY, glasses: true, build: 'broad' }),
    INDIAN: suit(['#e8e4d8', '#a8a498'], '#2a3a5a', { skin: { base: '#b07850', shade: '#704428', rim: '#e8b088' }, hairCol: BLK, mustache: true }),
    IBUKA: man({ name: 'Ibuka', shirt: ['#e8e4d8', '#a8a498'], pants: ['#4a4a50', '#22222a'], sleeves: true, glasses: true, hairCol: GRY, build: 'broad' }),
    MORITA: suit(['#3a4250', '#1a2028'], '#7a2a2a', { name: 'Morita', hair: 'swept' }),
    HONDA: man({ name: 'Honda', shirt: ['#5a6a7a', '#2a343e'], pants: ['#5a6a7a', '#2a343e'], sleeves: true, headwear: X.peaked ? X.peaked({ base: '#e8e4d8', shade: '#9a9488', rim: '#ffffff' }) : null }),
    BUYER: suit(['#6a5a4a', '#342a20'], '#c8a040', { skin: { base: '#e8b494', shade: '#a8705a', rim: '#ffdcc0' }, hairCol: { base: '#8a6a3a', shade: '#4a3418', rim: '#d8b880' }, build: 'broad' }),
    IKEDA: suit(['#4a4a52', '#22222a'], '#7a2a2a', { name: 'Ikeda', hairCol: GRY, glasses: true, build: 'broad' }),
    SCHOOLGIRL: woman({ name: 'Hana', shirt: ['#1e2a4a', '#0e1428'], pants: ['#1e2a4a', '#0e1428'], hair: 'bun' }),
    SCHOOLGIRL2: woman({ shirt: ['#1e2a4a', '#0e1428'], pants: ['#1e2a4a', '#0e1428'] }),
    TEEN: man({ name: 'Kenji', shirt: ['#1e2028', '#0a0a10'], pants: ['#1e2028', '#0a0a10'], sleeves: true, build: 'man' }),
    // workers and bosses
    WORKER: man({ shirt: ['#5a6a7a', '#2c343e'], pants: ['#5a6a7a', '#2c343e'], sleeves: true, headwear: X.tenugui({ base: '#e8e4d8', shade: '#a09a8a', rim: '#ffffff' }) }),
    WORKER2: man({ skin: JSK2, shirt: ['#7a6a4a', '#3e3424'], pants: ['#4a4a40', '#24241e'], sleeves: true, build: 'broad' }),
    SALARY: suit(['#2a2e38', '#12141a'], '#5a2a2a', { glasses: true }),
    SALARY2: suit(['#4a4a4e', '#222226'], '#2a3a5a', { skin: JSK2 }),
    SELLER: woman({ skin: JSK2, shirt: INDIGO, pants: MONPE, headwear: X.tenugui({ base: '#3a4a6a', shade: '#1a2234', rim: '#8a9ac0' }) }),
    ELDER: Object.assign(man({ hairCol: GRY, shirt: ['#5a4a3a', '#2a2218'], pants: ['#5a4a3a', '#2a2218'], sleeves: true }), { build: 'elder', hair: 'elder' }),
  };
  S.JP = C;
  // the daruma doll: red body, white face, it can tip and rock back
  S.daruma = (c, x, y, s, tilt = 0) => { c.save(); c.translate(x, y); c.rotate(tilt); c.translate(0, -30 * s);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, 30 * s, 26 * s, 5 * s, 0, 0, TAU); c.fill();
    const g = c.createRadialGradient(-10 * s, -12 * s, 4 * s, 0, 0, 34 * s); g.addColorStop(0, '#ff5a4a'); g.addColorStop(1, '#a01818'); c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, 27 * s, 31 * s, 0, 0, TAU); c.fill();
    c.fillStyle = '#f8f0e0'; c.beginPath(); c.ellipse(0, -6 * s, 15 * s, 13 * s, 0, 0, TAU); c.fill();
    c.fillStyle = '#1a1a1a'; c.beginPath(); c.arc(-6 * s, -8 * s, 3.2 * s, 0, TAU); c.fill(); c.strokeStyle = '#1a1a1a'; c.lineWidth = 1.6 * s; c.beginPath(); c.arc(6 * s, -8 * s, 3.2 * s, 0, TAU); c.stroke();
    c.beginPath(); c.moveTo(-10 * s, -14 * s); c.quadraticCurveTo(-6 * s, -17 * s, -2 * s, -14 * s); c.moveTo(2 * s, -14 * s); c.quadraticCurveTo(6 * s, -17 * s, 10 * s, -14 * s); c.stroke();
    c.strokeStyle = '#e8c040'; c.lineWidth = 2 * s; c.beginPath(); c.moveTo(-14 * s, 14 * s); c.quadraticCurveTo(0, 22 * s, 14 * s, 14 * s); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-14 * s, -14 * s, 5 * s, 9 * s, -.4, 0, TAU); c.fill(); c.restore(); };
  // a darurma that tips over at t0 and rocks back upright
  S.darumaTilt = (lt, t0) => { const q = lt - t0; if (q < 0) return 0; if (q < .3) return -1.1 * q / .3; const r = q - .3; return -1.1 * Math.exp(-2.2 * r) * Math.cos(r * 7); };
})(window);
