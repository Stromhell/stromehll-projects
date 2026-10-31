// Spain 1: cast and small helpers shared by acts 1 onward.
(function (G) {
  const S = G.S, K = G.KIT, X = S.SPX, CH = S.SPAIN, TAU = Math.PI * 2;
  const turb = (b, s, r) => X.turban({ base: '#efe6d2', shade: '#a99c82', rim: '#ffffff' }, { base: b, shade: s, rim: r });
  const blackTurb = X.turban({ base: '#2a2a32', shade: '#0e0e14', rim: '#8a8aa0' }, { base: '#c8962a', shade: '#7a5a14', rim: '#ffe0a0' });
  const moor = (shirt, band, extra = {}) => Object.assign({}, CH.boabdil, { mustache: true, beard: true, shirt, headwear: turb(...band) }, extra);
  const goth = (shirt, extra = {}) => Object.assign({}, CH.farmer, { hair: 'swept', hairCol: X.HR.brown, mustache: true, beard: true, shirt, pants: ['#5a4a3a', '#2a2018'], shoes: ['#3b2116', '#1e100a'], headwear: null }, extra);
  const C = {
    RODERIC: goth(['#9a2a22', '#4a1210'], { name: 'Roderic', hairCol: { base: '#b8864a', shade: '#6a4a22', rim: '#f0c890' }, build: 'man' }),
    NOBLE1: goth(['#2a4a7a', '#14243e']), NOBLE2: goth(['#3a6a3a', '#1a341a'], { hairCol: X.HR.grey }), NOBLE3: goth(['#7a5a2a', '#3e2c12'], { build: 'man', hairCol: { base: '#c8a060', shade: '#7a5a2a', rim: '#ffe0a0' } }),
    BISHOP: Object.assign({}, CH.aisha, { build: 'elder', hair: 'elder', hairCol: X.HR.grey, beard: true, shirt: ['#f2ead6', '#a89c80'], pants: ['#f2ead6', '#a89c80'], dupatta: null, long: true, headwear: X.mitre, skin: X.SK.fair }),
    MUSA: Object.assign({}, CH.boabdil, { build: 'elder', hairCol: X.HR.grey, beard: true, mustache: true, shirt: ['#3a2a4a', '#1a1222'], long: true, mundu: false, pants: ['#3a2a4a', '#1a1222'], headwear: blackTurb, stoop: 4 }),
    TARIQ: moor(['#2f4a6a', '#152438'], ['#1e2a4a', '#0a1020', '#7a90c0'], { skin: X.SK.andean, hairCol: X.HR.black, mundu: false, pants: ['#5a4a38', '#2a2018'], name: 'Tariq' }),
    BERBER: moor(['#c8b490', '#8a7454'], ['#3a3a5a', '#1a1a2a', '#a0a0d0'], { skin: X.SK.andean, mundu: false, pants: ['#8a7454', '#4a3a24'] }),
    BERBER2: moor(['#e8dcc2', '#a89a7c'], ['#6a2a22', '#3a1410', '#e0a090'], { skin: X.SK.olive, mundu: false, pants: ['#6a5a44', '#3a2c1c'] }),
    SOLDIER: goth(['#7a6a5a', '#3a3028'], { headwear: X.spangen, build: 'man' }),
    PELAYO: goth(['#6a4a2a', '#34220e'], { build: 'broad', hairCol: { base: '#3a2416', shade: '#1a0e08', rim: '#8a6a4a' } }),
    TOWNSMAN: goth(['#8a7a5a', '#4a3e2a'], { beard: false, build: 'man' }),
  };
  S.ES1 = C;
  // helpers
  const H = {};
  H.pulse = (lt, a, d) => { const v = (lt - a) / d; return v < 0 || v > 1 ? 0 : Math.sin(v * Math.PI); };
  H.walk = (p, k = .32) => { const r = S.run(p, k), a = p * TAU; r.lean = 2; r.bob *= .4; r.shN = -14 * Math.sin(a); r.shF = -14 * Math.sin(a + Math.PI); r.elN = 14 + 12 * Math.max(0, Math.sin(a)); r.elF = 14 + 12 * Math.max(0, Math.sin(a + Math.PI)); r.kneeN = 8 + (r.kneeN - 8) * .55; r.kneeF = 8 + (r.kneeF - 8) * .55; return r; };
  // tiny distant soldier; col = tunic, helm = helmet colour, pike
  H.tiny = (c, x, y, s, col, t, i, o = {}) => {
    c.fillStyle = S.rgba('#2a1a10', .3); c.beginPath(); c.ellipse(x + (o.sk ?? 6) * s, y, 7 * s, 1.4 * s, 0, 0, TAU); c.fill();
    const st = o.walk ? Math.sin(t * 8 + i) * 1.2 * s : 0;
    c.fillStyle = col; c.fillRect(x - 2 * s, y - 9 * s, 4 * s, 7 * s); c.fillStyle = '#2a2018'; c.fillRect(x - 2 * s + st, y - 2.4 * s, 1.6 * s, 2.4 * s); c.fillRect(x + .4 * s - st, y - 2.4 * s, 1.6 * s, 2.4 * s);
    c.fillStyle = o.skin || '#d0a080'; c.beginPath(); c.arc(x, y - 11 * s, 1.8 * s, 0, TAU); c.fill(); c.fillStyle = o.helm || '#a8a8b0'; c.beginPath(); c.arc(x, y - 11.6 * s, 2.1 * s, Math.PI, 0); c.fill();
    c.fillStyle = S.rgba('#ffe0b0', .45); c.fillRect(x - 2 * s, y - 9 * s, 1 * s, 7 * s);
    if (o.pike !== false) { const lean = o.lean ?? 0; c.strokeStyle = '#3a2a1a'; c.lineWidth = .5 * s; c.beginPath(); c.moveTo(x + 2.6 * s, y); c.lineTo(x + 2.6 * s + lean * s + Math.sin(t * .8 + i) * .4 * s, y - 24 * s); c.stroke(); c.fillStyle = '#c8c8d0'; c.fillRect(x + 2.2 * s + lean * s, y - 26 * s, .9 * s, 2.4 * s); }
    if (o.shield) { c.fillStyle = o.shield; c.beginPath(); c.arc(x - 2.4 * s, y - 6 * s, 2.6 * s, 0, TAU); c.fill(); }
  };
  // fire: flames, glow and sparks at (x, y) with size s
  H.fire = (c, x, y, s, t, seed = 0) => {
    const f = G.VP.flicker(t, seed);
    G.VP.glow(c, x, y - 30 * s, 160 * s, '#ff9a40', .45 + .2 * f);
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 9; k++) { const r = S.rng(k + seed * 31), ph = (t * (1.6 + r()) + r()) % 1, fx = x + (r() - .5) * 50 * s + Math.sin(t * 6 + k) * 6 * s, fy = y - ph * 90 * s, rad = (26 - ph * 20) * s * (.7 + r() * .6);
      const g = c.createRadialGradient(fx, fy, 0, fx, fy, rad); g.addColorStop(0, `rgba(255,${Math.round(230 - ph * 120)},120,${.8 * (1 - ph)})`); g.addColorStop(1, 'rgba(255,90,20,0)'); c.fillStyle = g; c.beginPath(); c.arc(fx, fy, rad, 0, TAU); c.fill(); }
    for (let k = 0; k < 8; k++) { const r = S.rng(k + 90 + seed), ph = (t * .5 + r()) % 1; c.fillStyle = `rgba(255,200,120,${1 - ph})`; c.beginPath(); c.arc(x + (r() - .5) * 60 * s + Math.sin(t * 2 + k) * 20 * s * ph, y - 40 * s - ph * 200 * s, 1.6 * s, 0, TAU); c.fill(); }
    c.restore();
  };
  H.smoke = (c, x, y, s, t, col = '60,50,48') => { for (let k = 0; k < 10; k++) { const life = (t * .12 + k / 10) % 1, sx = x + Math.sin(life * 5 + k) * 20 * s * life + life * 80 * s, sy = y - life * 360 * s, rad = (16 + life * 70) * s; const g = c.createRadialGradient(sx, sy, 0, sx, sy, rad); g.addColorStop(0, `rgba(${col},${.35 * (1 - life)})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.beginPath(); c.arc(sx, sy, rad, 0, TAU); c.fill(); } };
  // a stamped place name on a map
  H.stamp = (c, txt, x, y, lt, at, o = {}) => { const a = K.seg(lt, at, at + .25); if (a <= 0) return; const sc = 1 + 1.2 * (1 - K.E.out(a)); c.save(); c.translate(x, y); c.scale(sc, sc); c.globalAlpha = Math.min(1, a * 2); c.fillStyle = o.ink || '#3a2412'; c.beginPath(); c.arc(0, 0, 5, 0, TAU); c.fill(); c.font = `${o.px || 30}px Caveat`; c.textAlign = o.align || 'center'; c.fillText(txt, o.dx ?? 0, o.dy ?? -14); c.restore(); };
  // a simple wooden boat with a lateen sail, bow to the right
  H.boat = (c, x, y, s, t, o = {}) => { c.fillStyle = o.hull || '#5a3420'; c.beginPath(); c.moveTo(x - 80 * s, y - 14 * s); c.quadraticCurveTo(x, y + 18 * s, x + 90 * s, y - 20 * s); c.lineTo(x + 70 * s, y - 2 * s); c.quadraticCurveTo(x, y + 8 * s, x - 70 * s, y); c.fill();
    c.fillStyle = S.rgba('#ffe0b0', .3); c.fillRect(x - 70 * s, y - 12 * s, 150 * s, 2 * s);
    if (o.sail !== false) { c.strokeStyle = '#3a2010'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo(x, y - 6 * s); c.lineTo(x, y - 120 * s); c.stroke(); c.fillStyle = o.sailCol || S.rgba('#f4e8d0', .95); c.beginPath(); c.moveTo(x - 4 * s, y - 116 * s); c.lineTo(x + 80 * s, y - 40 * s + Math.sin(t * 2) * 3 * s); c.lineTo(x - 2 * s, y - 26 * s); c.fill(); } };
  S.ES1H = H;
})(window);
