// Spain 2: cast and helpers, including the spinning silver coin that runs through every act.
(function (G) {
  const S = G.S, K = G.KIT, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const E1 = S.ES1;
  const ruff = (c, u, f, Lt, k) => {};
  const C = {
    COLUMBUS: Object.assign({}, E1.TOWNSMAN, { name: 'Columbus', skin: X.SK.fair, hairCol: { base: '#d8d0c0', shade: '#8a8478', rim: '#ffffff' }, hair: 'swept', shirt: ['#3a4a6a', '#1a2234'], pants: ['#3a3a3a', '#1a1a1a'] }),
    PHILIP: Object.assign({}, E1.RODERIC, { name: 'Philip II', build: 'man', skin: X.SK.fair, hairCol: { base: '#c8a070', shade: '#7a5a34', rim: '#f0d0a0' }, beard: true, mustache: true, shirt: ['#1e1e24', '#0a0a0e'], pants: ['#1e1e24', '#0a0a0e'], headwear: null }),
    BANKER: Object.assign({}, E1.NOBLE1, { name: 'Banker', beard: false, mustache: true, hairCol: X.HR.grey, shirt: ['#2a4a3a', '#14241c'], pants: ['#2a2a2a', '#141414'], build: 'broad' }),
    SAILOR: Object.assign({}, E1.TOWNSMAN, { name: 'Sailor', skin: X.SK.olive, shirt: ['#e8dcc0', '#a89a7c'], pants: ['#3a4a6a', '#1a2234'], hairCol: X.HR.black }),
    SAILOR2: Object.assign({}, E1.NOBLE3, { name: 'Sailor', shirt: ['#b8582a', '#5a2410'], pants: ['#6a5a44', '#3a2c1c'] }),
    MINER: CH.miner, OFFICER: CH.officer,
  };
  // headwear: Aztec quetzal-feather crown, Inca royal fringe, a Tlaxcalan feather band
  X.feathers = (c, u, f, Lt, k) => { for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * .22, L = u * (1.2 + .2 * Math.cos(i)); c.save(); c.translate(0, -.55 * u); c.rotate(a + Math.PI / 2); c.fillStyle = i % 2 ? '#1e8a5a' : '#2aa86a'; c.beginPath(); c.ellipse(0, -L * .55, .13 * u, L * .55, 0, 0, TAU); c.fill(); c.fillStyle = S.rgba('#a8f0c8', .5); c.fillRect(-.01 * u, -L, .02 * u, L * .9); c.restore(); }
    const g = k.tone({ base: '#e8b84a', shade: '#8a6420', rim: '#fff2c0' }, Lt); k.celT(c, S.poly([[-.62 * u, -.42 * u], [-.6 * u, -.7 * u], [.6 * u, -.7 * u], [.62 * u, -.42 * u]], false), g, Lt, u, { swk: .5 }); c.fillStyle = '#2a6ab0'; c.beginPath(); c.arc(0, -.56 * u, .08 * u, 0, TAU); c.fill(); };
  X.inca = (c, u, f, Lt, k) => { const g = k.tone({ base: '#c8962a', shade: '#7a5a14', rim: '#ffe0a0' }, Lt); k.celT(c, S.poly([[-.62 * u, -.48 * u], [-.6 * u, -.66 * u], [.6 * u, -.66 * u], [.62 * u, -.48 * u]], false), g, Lt, u, { swk: .5 });
    c.fillStyle = '#c8202a'; for (let i = 0; i < 9; i++) c.fillRect((-.4 + i * .1) * u, -.48 * u, .07 * u, .32 * u); c.fillStyle = '#1a1a1a'; c.beginPath(); c.moveTo(-.08 * u, -.66 * u); c.lineTo(0, -1.25 * u); c.lineTo(.08 * u, -.66 * u); c.fill(); c.fillStyle = '#f0f0f0'; c.beginPath(); c.moveTo(.1 * u, -.66 * u); c.lineTo(.2 * u, -1.15 * u); c.lineTo(.22 * u, -.66 * u); c.fill(); };
  X.band = (c, u, f, Lt, k) => { c.fillStyle = '#e8dcc2'; c.fillRect(-.6 * u, -.62 * u, 1.2 * u, .14 * u); for (const [dx, col] of [[-.2, '#c8282a'], [0, '#e8b020'], [.2, '#2a8a4a']]) { c.save(); c.translate(dx * u, -.62 * u); c.rotate(dx * 1.5); c.fillStyle = col; c.beginPath(); c.ellipse(0, -.35 * u, .08 * u, .35 * u, 0, 0, TAU); c.fill(); c.restore(); } };
  const conq = (shirt, extra = {}) => Object.assign({}, CH.officer, { shirt, pants: ['#3a3430', '#1c1814'] }, extra);
  Object.assign(C, {
    CORTES: conq(['#6a6e78', '#34383e'], { name: 'Cortés', beard: true, mustache: true, hairCol: X.HR.black, build: 'man' }),
    PIZARRO: conq(['#5a4a3a', '#2a2018'], { name: 'Pizarro', beard: true, mustache: true, hairCol: X.HR.grey, build: 'elder' }),
    CONQ: conq(['#7a7e88', '#3a3e44']), CONQ2: conq(['#8a3a2a', '#4a1a10'], { beard: true }),
    MALINTZIN: Object.assign({}, CH.aisha, { name: 'Malintzin', skin: X.SK.andean, hairCol: X.HR.black, hair: 'bun', shirt: ['#f0ece0', '#b8b0a0'], pants: ['#2a6a8a', '#14344a'], dupatta: null, headwear: null }),
    MOCTEZUMA: Object.assign({}, CH.boabdil, { name: 'Moctezuma', skin: X.SK.andean, hairCol: X.HR.black, beard: false, mustache: false, shirt: ['#2a8a7a', '#14443a'], long: true, mundu: false, pants: ['#e8dcc2', '#a89a7c'], headwear: X.feathers }),
    TLAX: Object.assign({}, CH.miner, { name: 'Tlaxcalan', headwear: X.band, shirt: ['#e8dcc2', '#a89a7c'], pants: ['#c8282a', '#6a1010'], stoop: 0 }),
    NAHUA: Object.assign({}, CH.miner, { name: 'Nahua', headwear: null, hair: 'neat', shirt: ['#e8e0cc', '#a8a08c'], pants: ['#e8e0cc', '#a8a08c'], stoop: 0 }),
    NAHUAW: Object.assign({}, CH.aisha, { skin: X.SK.andean, hairCol: X.HR.black, shirt: ['#d8c8a8', '#988868'], pants: ['#b8682a', '#6a3410'], dupatta: null }),
    ATAHUALPA: Object.assign({}, CH.miner, { name: 'Atahualpa', headwear: X.inca, shirt: ['#c8962a', '#7a5a14'], pants: ['#3a4a8a', '#1a2244'], long: true, stoop: 0, bare: false }),
    INCA: Object.assign({}, CH.miner, { name: 'Inca', headwear: null, hair: 'neat', shirt: ['#b8282a', '#5a1010'], pants: ['#3a3a3a', '#1a1a1a'], stoop: 0, bare: false }),
  });
  S.ES2 = C;
  const H = {};
  // the piece of eight: a spinning silver coin. o.shine 0..1, o.chips n, o.fall 0..1 (falls flat and stops)
  H.coin = (c, x, y, r, t, o = {}) => {
    const fall = o.fall || 0, spin = (o.spin ?? t * 1.6) * (1 - fall), sx = Math.cos(spin), lean = fall;
    c.save(); c.translate(x, y + lean * r * .3);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, r * 1.15, r * .9, r * .16, 0, 0, TAU); c.fill();
    c.scale(Math.max(.06, Math.abs(sx)) * (1 - fall) + fall, 1 - fall * .72);
    const g = c.createLinearGradient(-r, -r, r, r); const sh = o.shine ?? .5; g.addColorStop(0, S.mix('#9aa0a8', '#ffffff', sh)); g.addColorStop(.5, S.mix('#6a7078', '#c8ced6', sh)); g.addColorStop(1, '#4a5058');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill(); c.strokeStyle = '#3a3e44'; c.lineWidth = r * .06; c.stroke();
    c.strokeStyle = S.rgba('#3a3e44', .7); c.lineWidth = r * .03; c.beginPath(); c.arc(0, 0, r * .82, 0, TAU); c.stroke();
    if (sx > 0) { c.fillStyle = '#4a5058'; c.fillRect(-r * .08, -r * .5, r * .16, r); c.fillRect(-r * .5, -r * .08, r, r * .16); c.font = `${r * .5}px Anton`; c.textAlign = 'center'; c.fillText('8', r * .45, -r * .3); }
    else { c.fillStyle = '#4a5058'; for (const dx of [-.35, .35]) { c.fillRect(r * dx - r * .06, -r * .5, r * .12, r); } c.beginPath(); c.arc(0, 0, r * .2, 0, TAU); c.fill(); }
    for (let i = 0; i < (o.chips || 0); i++) { const a = i * 2.3 + .6; c.fillStyle = '#2a1a10'; c.beginPath(); c.moveTo(Math.cos(a) * r * 1.02, Math.sin(a) * r * 1.02); c.lineTo(Math.cos(a + .12) * r * .82, Math.sin(a + .12) * r * .82); c.lineTo(Math.cos(a + .24) * r * 1.02, Math.sin(a + .24) * r * 1.02); c.fill(); }
    if (sh > .4 && fall < .5) { c.globalCompositeOperation = 'lighter'; const hx = Math.sin(t * 2.3) * r * .6; const hg = c.createRadialGradient(hx, -r * .3, 0, hx, -r * .3, r * .6); hg.addColorStop(0, `rgba(255,255,255,${.5 * sh})`); hg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = hg; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill(); }
    c.restore();
  };
  // a silver bar
  H.bar = (c, x, y, s) => { c.fillStyle = '#9aa0a8'; c.beginPath(); c.moveTo(x - 22 * s, y); c.lineTo(x + 22 * s, y); c.lineTo(x + 16 * s, y - 10 * s); c.lineTo(x - 16 * s, y - 10 * s); c.fill(); c.fillStyle = '#d8dce4'; c.fillRect(x - 16 * s, y - 10 * s, 32 * s, 2.5 * s); c.fillStyle = '#5a6068'; c.fillRect(x - 22 * s, y - 1.5 * s, 44 * s, 1.5 * s); };
  S.ES2H = H;
})(window);
