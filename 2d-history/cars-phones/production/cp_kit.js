// Cars into Phones (CP) kit: cast + props. Loaded after tw_kit.js, xu_kit.js, jh_kit.js, pr_kit.js.
// Real people are stylised stand-ins (no likeness, no logos, no badges). Brand names only as plain text, never drawn here.
// World props: (x, y) = bottom centre on the ground unless noted; s = the same number you give a figure
// (a figure at s=1 is ~380 units tall; a car at s=1 is ~990 long = 2.6x).
// Screen props (dashes, meters, popups, boards): noted per function.
(function (G) {
  const K = G.KIT, TW = G.TW, PR = G.PR, INK = TW.INK, txt = TW.txt, rr = TW.rr;
  const R6 = G.RIG6, sh = (h, f) => G.RIG.shadeHex(h, f);
  const CP = G.CP = {}; CP.INK = INK;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const shadow = CP.shadow = (c, x, y, w, a = .35) => { c.save(); c.translate(x, y); c.scale(1, .16); const g = c.createRadialGradient(0, 0, 0, 0, 0, w); g.addColorStop(0, `rgba(20,12,6,${a})`); g.addColorStop(.7, `rgba(20,12,6,${a * .5})`); g.addColorStop(1, 'rgba(20,12,6,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, w, 0, 7); c.fill(); c.restore(); };
  const fit = (c, s, maxW, px, fam = 'Anton') => { c.font = `${px}px ${fam}`; const w = c.measureText(s).width; return w > maxW ? px * maxW / w : px; };
  const ftxt = (c, s, x, y, maxW, px, col, al = 'center', fam = 'Anton') => { txt(c, s, x, y, fit(c, s, maxW, px, fam), col, al, fam); };
  const lines = (c, s, x, y, maxW, px, col, lh = 1.15, fam = 'Anton') => { const L = String(s).split('|'); const p = Math.min(...L.map(l => fit(c, l, maxW, px, fam))); L.forEach((l, i) => txt(c, l, x, y + (i - (L.length - 1) / 2) * p * lh, p, col, 'center', fam)); };
  // rounded polygon through points (corner radius r)
  const rpoly = CP.rpoly = (c, P, r = 20) => { const n = P.length; c.beginPath();
    for (let i = 0; i < n; i++) { const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n];
      const l1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) || 1, l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1, q = Math.min(r, l1 * .45, l2 * .45);
      const a = [p1[0] - (p1[0] - p0[0]) / l1 * q, p1[1] - (p1[1] - p0[1]) / l1 * q], b = [p1[0] + (p2[0] - p1[0]) / l2 * q, p1[1] + (p2[1] - p1[1]) / l2 * q];
      i ? c.lineTo(a[0], a[1]) : c.moveTo(a[0], a[1]); c.quadraticCurveTo(p1[0], p1[1], b[0], b[1]); }
    c.closePath(); };

  // ---- cast (look.pr extras from PR kit; look.cp extras below)
  const L6 = () => R6.LOOKS;
  const look = (base, o, pr, cp) => ({ look: Object.assign({}, L6()[base], { style: 'gumball' }, o, pr ? { pr } : { pr: {} }, cp ? { cp } : {}) });
  const F0 = R6.figure;
  R6.figure = (ctx, o) => { const X = o.look && o.look.cp; if (!X) return F0(ctx, o);
    const o2 = Object.assign({}, o), uh = o.hat; o2.out = o.out || {}; const out = o2.out, s = (o.s ?? 1) * ((o.look.pr && o.look.pr.scale) || 1);
    o2.hat = (c, hx, hy, r) => { const rx = 53, ry = 57, ey = hy + ry * .14; c.save(); c.strokeStyle = INK; c.lineJoin = 'round'; c.lineCap = 'round';
      if (X.vest) { const hp = out.hipY / s, ny = hp - 104; c.save(); c.globalAlpha = .95; c.fillStyle = '#c8ccd0'; c.strokeStyle = 'rgba(40,40,40,.6)'; c.lineWidth = 1.5;
        for (const yy of [hp - 30, hp - 10]) { c.fillRect(-36, yy, 70, 7); c.strokeRect(-36, yy, 70, 7); }
        c.fillStyle = '#2a7ac0'; c.fillRect(-36, hp - 54, 70, 5); c.fillStyle = '#f2f2f2'; for (let k = 0; k < 7; k++) c.fillRect(-36 + k * 10, hp - 54, 5, 5); c.restore(); }
      if (X.shiny) { const hp = out.hipY / s; c.save(); c.globalAlpha = .55; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(-22, hp - 92); c.quadraticCurveTo(-28, hp - 50, -20, hp - 6); c.stroke(); c.globalAlpha = .35; c.lineWidth = 6; c.beginPath(); c.moveTo(14, hp - 86); c.lineTo(10, hp - 40); c.stroke(); c.restore(); }
      if (X.shades) { c.fillStyle = '#121216'; c.lineWidth = 2.4; for (const [dx, k] of [[7 - 9 + 9, .8], [30, 1]]) { c.beginPath(); c.ellipse(hx + rx * .3 + (dx === 30 ? 14 : -9), ey, 16 * k, 13, 0, 0, 7); c.fill(); c.stroke(); }
        c.beginPath(); c.moveTo(hx + rx * .3 - 2, ey - 2); c.lineTo(hx + rx * .3 + 2, ey - 2); c.moveTo(hx + rx * .3 - 22, ey - 2); c.lineTo(hx - rx * .6, ey - 8); c.stroke();
        c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); c.arc(hx + rx * .3 + 10, ey - 3, 8, -2.6, -1.8); c.stroke(); }
      if (X.policeCap) { const Y = hy + ry * .08; c.fillStyle = '#16181e'; c.lineWidth = 3; c.beginPath(); c.moveTo(hx - rx * 1.08, Y - ry * .4); c.bezierCurveTo(hx - rx * 1.2, Y - ry * 1.5, hx + rx * 1.2, Y - ry * 1.5, hx + rx * 1.08, Y - ry * .42); c.closePath(); c.fill(); c.stroke();
        c.save(); rr(c, hx - rx * 1.08, Y - ry * .62, rx * 2.16, ry * .26, 4); c.clip(); for (let k = 0; k < 14; k++) for (let j = 0; j < 2; j++) { c.fillStyle = (k + j) % 2 ? '#f4f4f4' : '#1a1a1a'; c.fillRect(hx - rx * 1.08 + k * rx * .16, Y - ry * .62 + j * ry * .13, rx * .16, ry * .13); } c.restore(); rr(c, hx - rx * 1.08, Y - ry * .62, rx * 2.16, ry * .26, 4); c.stroke();
        c.fillStyle = '#0c0c10'; c.beginPath(); c.moveTo(hx + rx * .3, Y - ry * .36); c.quadraticCurveTo(hx + rx * 1.5, Y - ry * .4, hx + rx * 1.5, Y - ry * .22); c.lineTo(hx + rx * .5, Y - ry * .26); c.closePath(); c.fill(); c.stroke(); }
      if (X.helmet) { const Y = hy, col = X.helmet; const g = c.createRadialGradient(hx - 10, Y - ry * .9, 4, hx, Y - ry * .4, rx * 1.3); g.addColorStop(0, sh(col, .4)); g.addColorStop(1, sh(col, -.25)); c.fillStyle = g; c.lineWidth = 3; c.beginPath(); c.moveTo(hx - rx * 1.12, Y - ry * .1); c.bezierCurveTo(hx - rx * 1.2, Y - ry * 1.62, hx + rx * 1.25, Y - ry * 1.6, hx + rx * 1.12, Y - ry * .28); c.lineTo(hx + rx * .5, Y - ry * .36); c.lineTo(hx - rx * .3, Y - ry * .1); c.closePath(); c.fill(); c.stroke();
        c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 4; c.beginPath(); c.arc(hx - 4, Y - ry * .6, rx * .8, -2.7, -1.9); c.stroke(); c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(hx - rx * .5, Y); c.quadraticCurveTo(hx - rx * .2, Y + ry * 1.05, hx + rx * .4, Y + ry * 1.02); c.stroke(); }
      c.restore(); if (uh) uh(c, hx, hy, r); };
    return F0(ctx, o2); };
  // clipboard to give a figure: fig.hold = { near: CP.clipboardHold }
  CP.clipboardHold = (c) => { c.save(); c.rotate(-.15); c.fillStyle = '#9a6a3a'; c.strokeStyle = INK; c.lineWidth = 2.5; rr(c, -18, -6, 40, 54, 4); c.fill(); c.stroke(); c.fillStyle = '#f6f4ee'; c.fillRect(-14, 0, 32, 44); c.fillStyle = '#b8b8c0'; rr(c, -6, -10, 16, 9, 2); c.fill(); c.stroke(); c.strokeStyle = '#7a8aa0'; c.lineWidth = 1.4; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(-10, 8 + k * 6); c.lineTo(12 - (k % 3) * 4, 8 + k * 6); c.stroke(); } c.restore(); };

  CP.DAVE = () => look('banker', { hair: 'messy', hairCol: '#6a4428', streak: '#8e6240', skin: '#f0c6a2', top: 'jacket', topCol: '#26324e', inner: '#9aa0a8', innerStripe: '#8a9098', tie: null, legs: '#3a4a66', cuff: '#4a5a7a', shoes: '#5a4232', sole: '#efe8dc', seed: 301 }, { stubble: '#6a4428' });
  CP.SALESMAN = () => look('banker', { hair: 'swept', hairCol: '#2a1c14', streak: '#5a3a26', skin: '#eab892', topCol: '#7f8fa8', inner: '#f2e6f2', tie: '#d23a7a', legs: '#7f8fa8', shoes: '#1a1210', seed: 311 }, {}, { shiny: true });
  CP.COP = () => look('banker', { hair: 'neat', hairCol: '#3a2a1e', skin: '#e6b48c', top: 'jacket', topCol: '#d8e43a', inner: '#1c1e26', tie: null, legs: '#1c1e26', shoes: '#101012', sole: '#1c1c1c', seed: 321 }, {}, { vest: true, policeCap: true });
  CP.TESTER = (o = {}) => look('banker', { hair: 'neat', hairCol: '#e2c48a', streak: '#f4e0b0', skin: '#f6d2b2', top: 'jacket', topCol: '#c23a2e', inner: '#f4f4f4', tie: null, legs: '#2a3040', shoes: '#f0f0f0', sole: '#c8c8c8', seed: 331 }, { stubble: '#c8a870' }, o.helmet === false ? null : { helmet: '#f4f4f6' });
  CP.ENGINEER = (k = 0) => look(k === 1 ? 'woman' : 'engineer', [{ hair: 'spiky', hairCol: '#1d2230', topCol: '#5a7aa0', sleeveCol: null, collarCol: '#f4f4f4', seed: 341 }, { hair: 'bun', bun: true, hairCol: '#2a1a14', skin: '#c99068', top: 'shirt', topCol: '#e8e2d6', inner: '#e8e2d6', legs: '#3a3a44', glasses: true, seed: 342 }, { hair: 'neat', hairCol: '#b0aaa0', skin: '#f2c6a0', top: 'cardigan', topCol: '#4a6a4a', inner: '#e8e2d6', glasses: false, beard: true, seed: 343 }][k % 3]);
  CP.EXEC = (k = 0) => look(k === 2 ? 'woman' : 'banker', { hair: ['neat', 'swept', 'long', 'bald'][k % 4], hairCol: ['#2a2018', '#8a8a8a', '#5a3022', '#a8a29a'][k % 4], skin: ['#f2c6a0', '#e0ae86', '#f0c09a', '#b07850'][k % 4], top: 'jacket', topCol: ['#1c2230', '#3a3a44', '#4a2a3a', '#20303a'][k % 4], inner: '#f2f4f8', tie: ['#b0302a', '#2a4a8a', null, '#c8a23a'][k % 4], legs: ['#1c2230', '#3a3a44', '#2a2a30', '#20303a'][k % 4], glasses: k === 1, shoes: '#141010', seed: 351 + k });
  CP.DESIGNER_VW = () => look('banker', { hair: 'swept', hairCol: '#9a9690', streak: '#c8c4be', skin: '#f2caa8', topCol: '#1e1e24', inner: '#e8e8ec', tie: null, legs: '#26262c', glasses: true, shoes: '#1a1210', seed: 361 }, { stubble: '#9a9690' });
  CP.DESIGNER_IVE = () => look('banker', { hair: 'bald', hairCol: '#a08670', streak: '#c4ac94', skin: '#eebd98', top: 'sweater', topCol: '#7c8088', sleeveCol: '#7c8088', collarCol: '#6a6e76', inner: '#7c8088', tie: null, legs: '#3a3c44', glasses: true, shoes: '#e8e4dc', sole: '#d8d2c8', seed: 371 }, { stubble: '#8a7462' });
  CP.ENZO = () => look('elder', { hair: 'swept', hairCol: '#c8c4bc', streak: '#e8e4de', skin: '#e6b892', top: 'jacket', topCol: '#2a2a30', inner: '#e8e4dc', tie: '#3a3a40', beard: false, glasses: false, legs: '#2a2a30', shoes: '#141010', seed: 381 }, {}, { shades: true });
  CP.OWNER = (k = 0) => look(k % 2 ? 'woman' : 'teen', { hair: ['messy', 'long', 'neat', 'bun'][k % 4], bun: k % 4 === 3, hairCol: ['#1d1712', '#c89a5a', '#7a4a2a', '#141010'][k % 4], skin: ['#d9a57c', '#f4cfae', '#f2c6a0', '#8a5a3a'][k % 4], top: ['hoodie', 'cardigan', 'sweater', 'jacket'][k % 4], topCol: ['#c84a2a', '#3a6a8a', '#6a8a3a', '#5a3a6a'][k % 4], sleeveCol: null, inner: '#e8e2d6', tie: null, legs: ['#2a3a5a', '#2a2a30', '#5a5040', '#3a3a44'][k % 4], seed: 391 + k }, [{ stubble: true }, {}, { cap: '#2a3a2a' }, {}][k % 4]);
  CP.PASSENGER = () => look('woman', { hair: 'long', hairCol: '#3a2014', streak: '#6a3a22', skin: '#f2cca8', top: 'cardigan', topCol: '#c89a3a', inner: '#f4ece2', legs: '#2a3040', seed: 401 });

  // ---- car (side view). bottom centre at x,y (ground). o: { kind, col, t, speed (world px/s, wheels roll), wheelSpin (rad/s override), dir (1 faces right), lights, interior:false, shadow:false }
  const KINDS = {
    estate2005: { col: '#8c9aa6', body: [[-482, -58], [-494, -118], [-484, -300], [-450, -326], [40, -326], [110, -312], [246, -222], [452, -196], [492, -150], [494, -96], [482, -58]], glass: [[-462, -292], [-440, -310], [40, -310], [100, -298], [222, -222], [-462, -222]], pillars: [-300, -80], chrome: true, rimCol: '#b8bcc4', spokes: 5, shoul: -222, tail: 'tall' },
    tesla_like: { col: '#e8eaee', body: [[-482, -64], [-496, -128], [-488, -210], [-430, -232], [-240, -304], [-70, -320], [90, -306], [270, -214], [462, -176], [496, -126], [484, -64]], glass: [[-420, -232], [-236, -292], [-70, -306], [80, -294], [246, -216], [-420, -216]], pillars: [-120], rimCol: '#3a3c42', spokes: 0, shoul: -214, flush: true },
    suv_screen: { col: '#2a3a52', body: [[-486, -84], [-496, -160], [-484, -358], [-450, -380], [80, -380], [140, -364], [262, -262], [468, -236], [496, -176], [496, -104], [484, -84]], glass: [[-464, -350], [-444, -364], [80, -364], [130, -350], [240, -262], [-464, -262]], pillars: [-300, -90], rimCol: '#c8ccd2', spokes: 6, shoul: -262, cladding: true, wR: 78 },
    saloon_ev: { col: '#5a1e24', body: [[-480, -62], [-494, -120], [-486, -214], [-300, -232], [-200, -306], [40, -316], [110, -304], [264, -216], [466, -184], [496, -130], [484, -62]], glass: [[-290, -226], [-194, -294], [40, -302], [100, -290], [240, -220], [-290, -220]], pillars: [-70], rimCol: '#c4c8d0', spokes: 5, shoul: -218 },
    supercar_ev: { col: '#e0a020', body: [[-476, -58], [-494, -110], [-486, -188], [-300, -214], [-170, -262], [-20, -266], [190, -196], [462, -128], [494, -96], [480, -54]], glass: [[-280, -210], [-166, -252], [-24, -254], [160, -196], [-280, -196]], pillars: [], rimCol: '#1e1e22', spokes: 10, shoul: -190, low: true, wR: 72 },
    mission_s: { col: '#c8ccd4', body: [[-484, -60], [-496, -122], [-480, -196], [-260, -272], [-60, -284], [180, -214], [466, -138], [496, -102], [484, -58]], glass: [[-440, -200], [-252, -262], [-62, -272], [150, -210], [-440, -200]], pillars: [-250, -60], rimCol: '#e8eaee', spokes: 0, shoul: -190, flush: true, lightbar: true },
  };
  CP.CAR_KINDS = Object.keys(KINDS);
  const wheel = (c, x, y, R, ang, K2) => { c.save(); c.translate(x, y);
    c.fillStyle = '#1a1a1e'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, R, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = '#2c2c32'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, R * .86, 0, 7); c.stroke();
    const rR = R * .64, g = c.createRadialGradient(-rR * .3, -rR * .3, 2, 0, 0, rR); g.addColorStop(0, sh(K2.rimCol, .35)); g.addColorStop(1, sh(K2.rimCol, -.3)); c.fillStyle = g; c.beginPath(); c.arc(0, 0, rR, 0, 7); c.fill(); c.lineWidth = 2.5; c.strokeStyle = INK; c.stroke();
    c.rotate(ang); const n = K2.spokes;
    if (n) { c.fillStyle = sh(K2.rimCol, -.55); for (let k = 0; k < n; k++) { c.save(); c.rotate(k * Math.PI * 2 / n + Math.PI / n); c.beginPath(); c.moveTo(-rR * .16, rR * .3); c.lineTo(rR * .16, rR * .3); c.lineTo(rR * .28, rR * .9); c.lineTo(-rR * .28, rR * .9); c.closePath(); c.fill(); c.restore(); } }
    else { c.fillStyle = sh(K2.rimCol, -.25); c.beginPath(); c.arc(0, 0, rR * .8, 0, 7); c.fill(); c.strokeStyle = sh(K2.rimCol, -.5); c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(0, 0, rR * .55, k * 1.57, k * 1.57 + .9); c.stroke(); } }
    c.fillStyle = sh(K2.rimCol, .2); c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, rR * .22, 0, 7); c.fill(); c.stroke();
    c.fillStyle = '#2a2a2e'; for (let k = 0; k < 5; k++) { const a = k * 1.2566; c.beginPath(); c.arc(Math.cos(a) * rR * .13, Math.sin(a) * rR * .13, 2, 0, 7); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.arc(-R * .4, -R * .62, R * .08, 0, 7); c.fill(); // tread nick: visibly rotates
    c.restore();
    c.save(); c.translate(x, y); c.fillStyle = '#c8302a'; c.strokeStyle = INK; c.lineWidth = 1.5; c.beginPath(); c.arc(0, 0, R * .5, -2.3, -1.5); c.arc(0, 0, R * .36, -1.5, -2.3, true); c.closePath(); c.fill(); c.stroke();
    c.globalAlpha = .35; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, R * .94, -2.6, -2); c.stroke(); c.restore(); };
  CP.car = (c, x, y, s = 1, o = {}) => { const K2 = KINDS[o.kind] || KINDS.estate2005, col = o.col || K2.col, t = o.t ?? 0, dir = o.dir ?? 1, R = K2.wR || 70, wy = -R, wx = [-300, 290];
    const ang = o.wheelSpin != null ? o.wheelSpin * t : (o.speed || 0) * t / (R * s);
    if (o.shadow !== false) { shadow(c, x, y + 2 * s, 560 * s, .45); shadow(c, x + wx[0] * s * dir, y, 120 * s, .5); shadow(c, x + wx[1] * s * dir, y, 120 * s, .5); }
    c.save(); c.translate(x, y); c.scale(dir * s, s); c.lineJoin = 'round'; c.lineCap = 'round';
    // body
    const top = Math.min(...K2.body.map(p => p[1]));
    const g = c.createLinearGradient(0, top, 0, -50); g.addColorStop(0, sh(col, .3)); g.addColorStop(.45, sh(col, .08)); g.addColorStop(.5, sh(col, -.06)); g.addColorStop(1, sh(col, -.42)); c.fillStyle = g;
    rpoly(c, K2.body, 34); c.fill();
    c.save(); rpoly(c, K2.body, 34); c.clip();
    // lower body shade + sill
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(-520, -110, 1040, 60); if (K2.cladding) { c.fillStyle = '#26262a'; c.fillRect(-520, -122, 1040, 70); }
    // reflection band (painterly sky/ground)
    const rg = c.createLinearGradient(0, K2.shoul, 0, K2.shoul + 70); rg.addColorStop(0, 'rgba(255,255,255,.42)'); rg.addColorStop(.25, 'rgba(255,255,255,.08)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = rg; c.fillRect(-520, K2.shoul + 4, 1040, 70);
    c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.moveTo(-200, -60); c.lineTo(-120, K2.shoul + 10); c.lineTo(-60, K2.shoul + 10); c.lineTo(-140, -60); c.fill(); c.beginPath(); c.moveTo(150, -60); c.lineTo(190, K2.shoul + 10); c.lineTo(205, K2.shoul + 10); c.lineTo(165, -60); c.fill();
    // glass
    rpoly(c, K2.glass, 16); const gg = c.createLinearGradient(-300, -330, 200, -200); gg.addColorStop(0, '#5a6a7c'); gg.addColorStop(.45, '#1e2834'); gg.addColorStop(.55, '#3a4a5c'); gg.addColorStop(1, '#141a22'); c.fillStyle = gg; c.fill();
    c.save(); rpoly(c, K2.glass, 16); c.clip();
    if (o.interior !== false) { c.fillStyle = 'rgba(10,12,16,.6)'; for (const hx of [-140, 40]) { c.beginPath(); c.ellipse(hx, K2.shoul - 40, 24, 30, 0, 0, 7); c.fill(); c.fillRect(hx - 30, K2.shoul - 22, 50, 30); }
      if (o.kind === 'tesla_like' || o.kind === 'suv_screen' || o.kind === 'mission_s') { c.fillStyle = 'rgba(120,220,255,.55)'; c.fillRect(90, K2.shoul - 30, 34, 22); } }
    c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(-200, -400); c.lineTo(-120, -400); c.lineTo(-260, -150); c.lineTo(-340, -150); c.fill(); c.beginPath(); c.moveTo(-80, -400); c.lineTo(-50, -400); c.lineTo(-190, -150); c.lineTo(-220, -150); c.fill();
    c.restore(); rpoly(c, K2.glass, 16); c.strokeStyle = K2.chrome ? '#d8dce2' : '#16181c'; c.lineWidth = 6; c.stroke(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke();
    // pillars
    c.fillStyle = sh(col, -.35); for (const px of K2.pillars) { c.beginPath(); c.moveTo(px - 10, K2.shoul); c.lineTo(px + 12, K2.shoul); c.lineTo(px + 18, top + 8); c.lineTo(px - 4, top + 8); c.closePath(); c.fill(); }
    // door shut lines + handles
    c.strokeStyle = sh(col, -.5); c.lineWidth = 2.5; for (const dx of [-250, -40, 160]) { if (K2.low && dx === -250) continue; c.beginPath(); c.moveTo(dx, K2.shoul + 2); c.quadraticCurveTo(dx - 6, -100, dx + 4, -72); c.stroke(); }
    for (const hx of K2.low ? [10] : [-170, 40]) { if (K2.flush) { c.fillStyle = sh(col, -.25); rr(c, hx, K2.shoul + 28, 46, 7, 3); c.fill(); c.strokeStyle = sh(col, -.5); c.lineWidth = 1.5; c.stroke(); } else { c.fillStyle = K2.chrome ? '#cfd4da' : sh(col, -.3); rr(c, hx, K2.shoul + 24, 40, 11, 5); c.fill(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke(); } }
    if (K2.chrome) { c.strokeStyle = '#dfe3e8'; c.lineWidth = 4; c.beginPath(); c.moveTo(-480, -128); c.lineTo(490, -128); c.stroke(); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 1.5; c.stroke(); }
    // lamps
    const fl = K2.body.find(p => p[0] > 450) || [480, -150], lampY = K2.low ? -112 : K2.cladding ? -200 : -164;
    const lg = c.createLinearGradient(440, 0, 500, 0); lg.addColorStop(0, '#d8dce0'); lg.addColorStop(1, o.lights ? '#fffbe0' : '#f6f8fa'); c.fillStyle = lg; c.beginPath(); c.ellipse(476, lampY, 26, K2.lightbar ? 6 : 13, -.15, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke();
    c.fillStyle = '#d02828'; if (K2.lightbar) { c.fillRect(-500, lampY - 30, 40, 7); } else { rr(c, -498, lampY - (K2.tail === 'tall' ? 70 : 14), 26, K2.tail === 'tall' ? 72 : 26, 6); c.fill(); c.stroke(); }
    c.fillStyle = 'rgba(255,170,150,.6)'; c.fillRect(-494, lampY - (K2.tail === 'tall' ? 64 : 10), 6, K2.tail === 'tall' ? 30 : 10);
    c.restore();
    // wheel arches
    c.fillStyle = '#0e0e12'; for (const ax of wx) { c.beginPath(); c.arc(ax, wy, R * 1.2, Math.PI, 0); c.lineTo(ax + R * 1.2, -40); c.lineTo(ax - R * 1.2, -40); c.closePath(); c.fill(); }
    rpoly(c, K2.body, 34); c.strokeStyle = INK; c.lineWidth = 4.5; c.stroke();
    c.strokeStyle = sh(col, -.5); c.lineWidth = 3; for (const ax of wx) { c.beginPath(); c.arc(ax, wy, R * 1.2, Math.PI + .05, -.05); c.stroke(); }
    // gloss highlight along roof/shoulder
    c.save(); c.globalAlpha = .7; c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.moveTo(-380, K2.shoul + 10); c.lineTo(300, K2.shoul + 18); c.stroke(); c.lineWidth = 3; c.globalAlpha = .5; c.beginPath(); c.moveTo(-200, top + 6); c.lineTo(0, top + 5); c.stroke(); c.restore();
    // mirror
    const mx = K2.glass.reduce((m, p) => p[0] > m[0] ? p : m, [-999, 0]); c.fillStyle = sh(col, -.1); c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.ellipse(mx[0] - 30, K2.shoul - 14, 22, 14, -.2, 0, 7); c.fill(); c.stroke();
    // wheels
    for (const ax of wx) wheel(c, ax, wy, R, ang, K2);
    c.restore(); };

  // ---- dashboard bits. All dashes: x,y = TOP-LEFT in screen/world px, w = width.
  const knob = (c, x, y, r, a, col = '#2a2a2e') => { const g = c.createRadialGradient(x - r * .3, y - r * .4, 1, x, y, r); g.addColorStop(0, sh(col, .5)); g.addColorStop(1, sh(col, -.3)); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 1.5; for (let k = 0; k < 18; k++) { const q = k / 18 * 6.283; c.beginPath(); c.moveTo(x + Math.cos(q) * r * .86, y + Math.sin(q) * r * .86); c.lineTo(x + Math.cos(q) * r, y + Math.sin(q) * r); c.stroke(); }
    c.strokeStyle = '#f4f0e0'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(a) * r * .75, y - Math.cos(a) * r * .75); c.stroke(); };
  const btn = (c, x, y, w, h, label, lit, px) => { c.fillStyle = lit ? '#3a3a40' : '#2e2e34'; c.strokeStyle = INK; c.lineWidth = 2; rr(c, x, y, w, h, 5); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x + 3, y + 3, w - 6, h * .35);
    c.fillStyle = lit ? '#ffb02a' : '#5a4a2a'; c.fillRect(x + w * .3, y + h * .14, w * .4, h * .1); if (lit) TW.glow(c, x + w / 2, y + h * .19, w * .6, '255,170,40', .6); ftxt(c, label, x + w / 2, y + h * .62, w * .8, px, '#e8e4d8', 'center', 'Oswald'); };
  CP.dashOld = (c, x, y, w = 800, t = 0, o = {}) => { const s = w / 800, press = o.press ? 1 : 0; c.save(); c.translate(x, y); c.scale(s, s);
    const g = c.createLinearGradient(0, 0, 0, 260); g.addColorStop(0, '#4a4a50'); g.addColorStop(1, '#26262a'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 4; rr(c, 0, 0, 800, 260, 26); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.04)'; for (let k = 0; k < 300; k++) c.fillRect((k * 97) % 800, (k * 61) % 260, 2, 2); // grain
    // radio + LCD
    c.fillStyle = '#18181c'; rr(c, 200, 22, 400, 92, 10); c.fill(); c.stroke();
    const lg = c.createLinearGradient(0, 36, 0, 82); lg.addColorStop(0, '#9ad07a'); lg.addColorStop(1, '#6aa04a'); c.fillStyle = lg; rr(c, 290, 36, 220, 48, 4); c.fill(); c.stroke();
    c.font = '30px Oswald'; c.fillStyle = '#1e3a14'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(o.lcd || ('FM 98.' + (Math.floor(t * 2) % 10)), 400, 60);
    knob(c, 245, 68, 30, t * .4); knob(c, 555, 68, 30, -.6);
    ['1', '2', '3', '4', '5', '6'].forEach((n, i) => btn(c, 290 + i * 37, 88, 32, 20, n, false, 13));
    // climate: 3 big knobs + buttons
    knob(c, 140, 180, 46, -1 + Math.sin(t * .5) * .1, '#303036'); knob(c, 400, 180, 46, .4); knob(c, 660, 180, 46, 1.2, '#303036');
    for (let k = 0; k < 9; k++) { const q = -2.4 + k * .6, cx2 = 140, rr2 = 58; c.fillStyle = k < 4 ? '#4aa0ff' : k > 5 ? '#ff5a3a' : '#c8c8c8'; c.beginPath(); c.arc(cx2 + Math.sin(q) * rr2, 180 - Math.cos(q) * rr2, 3, 0, 7); c.fill(); }
    btn(c, 220, 150, 70, 56, 'A/C', true, 20); btn(c, 510, 150, 70, 56, 'DEMIST', press, 15); btn(c, 220, 214, 70, 30, 'RECIRC', false, 13); btn(c, 510, 214, 70, 30, 'REAR', false, 13);
    if (press) { TW.glow(c, 545, 178, 90, '255,150,40', .35); }
    // demist icon
    c.strokeStyle = press ? '#ffd07a' : '#a8a498'; c.lineWidth = 2; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(528 + k * 10, 168); c.quadraticCurveTo(532 + k * 10, 160, 528 + k * 10, 154); c.stroke(); }
    // vents
    for (const vx of [20, 700]) { c.fillStyle = '#1a1a1e'; rr(c, vx, 20, 80, 90, 10); c.fill(); c.stroke(); c.strokeStyle = '#3a3a40'; c.lineWidth = 4; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(vx + 8, 34 + k * 13); c.lineTo(vx + 72, 34 + k * 13); c.stroke(); } }
    c.globalAlpha = .25; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(30, 8); c.lineTo(770, 8); c.stroke(); c.restore(); };
  // tablet dash. pages: home climate menu ad call popup. o.glow 0..1, o.slide 0..1 (menu slide), o.t0 page start time
  CP.dashTablet = (c, x, y, w = 800, t = 0, o = {}) => { const s = w / 800, H = 500, page = o.page || 'home', glow = o.glow ?? 1, lt = t - (o.t0 || 0); c.save(); c.translate(x, y); c.scale(s, s);
    TW.glow(c, 400, 250, 620, '120,200,255', .28 * glow);
    c.fillStyle = '#0c0e12'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -14, -14, 828, H + 28, 30); c.fill(); c.stroke();
    const bg = c.createLinearGradient(0, 0, 800, H); bg.addColorStop(0, '#16263a'); bg.addColorStop(1, '#0a121e'); c.fillStyle = bg; rr(c, 0, 0, 800, H, 18); c.fill();
    c.save(); rr(c, 0, 0, 800, H, 18); c.clip();
    // status bar
    c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(0, 0, 800, 44); txt(c, '12:4' + (Math.floor(t / 30) % 10), 24, 22, 22, '#dfe8f4', 'left', 'Oswald'); txt(c, '21°C   LTE ▮▮▮', 776, 22, 20, '#9ab0c8', 'right', 'Oswald');
    const tile = (tx, ty, tw, th, col, label, icon) => { c.fillStyle = col; rr(c, tx, ty, tw, th, 16); c.fill(); c.fillStyle = 'rgba(255,255,255,.12)'; rr(c, tx, ty, tw, th * .4, 16); c.fill(); c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 2; rr(c, tx, ty, tw, th, 16); c.stroke(); if (icon) icon(tx + tw / 2, ty + th * .42); ftxt(c, label, tx + tw / 2, ty + th - 22, tw - 16, 20, '#fff', 'center', 'Oswald'); };
    const ic = { fan: (cx, cy) => { c.save(); c.translate(cx, cy); c.rotate(t * 3); c.fillStyle = '#fff'; for (let k = 0; k < 3; k++) { c.rotate(2.094); c.beginPath(); c.ellipse(0, -14, 7, 14, 0, 0, 7); c.fill(); } c.restore(); },
      note: (cx, cy) => { c.fillStyle = '#fff'; c.beginPath(); c.arc(cx - 8, cy + 10, 7, 0, 7); c.fill(); c.fillRect(cx - 2, cy - 18, 4, 28); c.fillRect(cx - 2, cy - 18, 16, 5); },
      pin: (cx, cy) => { c.fillStyle = '#fff'; c.beginPath(); c.arc(cx, cy - 6, 13, Math.PI, 0); c.lineTo(cx, cy + 18); c.closePath(); c.fill(); c.fillStyle = '#2a7a4a'; c.beginPath(); c.arc(cx, cy - 6, 5, 0, 7); c.fill(); },
      phone: (cx, cy) => { c.strokeStyle = '#fff'; c.lineWidth = 7; c.beginPath(); c.arc(cx, cy, 14, 2.2, 5.6); c.stroke(); },
      seat: (cx, cy) => { c.fillStyle = '#fff'; rr(c, cx - 12, cy - 18, 12, 30, 5); c.fill(); rr(c, cx - 12, cy + 6, 26, 10, 4); c.fill(); for (let k = 0; k < 3; k++) { c.strokeStyle = '#ffb04a'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(cx + 6 + k * 6, cy); c.quadraticCurveTo(cx + 10 + k * 6, cy - 8, cx + 6 + k * 6, cy - 16); c.stroke(); } },
      gear: (cx, cy) => { c.fillStyle = '#fff'; for (let k = 0; k < 8; k++) { c.save(); c.translate(cx, cy); c.rotate(k * .785); c.fillRect(-4, -18, 8, 8); c.restore(); } c.beginPath(); c.arc(cx, cy, 12, 0, 7); c.fill(); c.fillStyle = '#3a4a5a'; c.beginPath(); c.arc(cx, cy, 5, 0, 7); c.fill(); } };
    if (page === 'home' || page === 'popup' || page === 'ad') {
      // map left
      c.fillStyle = '#d8e0c8'; rr(c, 20, 60, 440, 420, 14); c.fill(); c.save(); rr(c, 20, 60, 440, 420, 14); c.clip(); c.strokeStyle = '#fff'; c.lineWidth = 14; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(20, 100 + k * 90 + Math.sin(k) * 30); c.lineTo(460, 80 + k * 80); c.stroke(); } c.lineWidth = 10; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(60 + k * 110, 60); c.lineTo(100 + k * 100, 480); c.stroke(); }
        c.fillStyle = '#a8c8e8'; c.beginPath(); c.ellipse(380, 400, 90, 50, .3, 0, 7); c.fill(); c.strokeStyle = '#3a8aff'; c.lineWidth = 8; c.beginPath(); c.moveTo(240, 460); c.lineTo(250, 300); c.lineTo(350, 200); c.lineTo(360, 90); c.stroke();
        c.fillStyle = '#3a8aff'; c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(250, 300 - 16 + Math.sin(t * 3) * 2); c.lineTo(262, 314); c.lineTo(238, 314); c.closePath(); c.fill(); c.stroke(); c.restore();
      tile(480, 60, 145, 130, '#2a5a8a', 'CLIMATE', ic.fan); tile(640, 60, 140, 130, '#7a3a8a', 'MUSIC', ic.note); tile(480, 205, 145, 130, '#2a7a4a', 'NAV', ic.pin); tile(640, 205, 140, 130, '#8a5a2a', 'PHONE', ic.phone); tile(480, 350, 145, 130, '#8a2a3a', 'SEATS', ic.seat); tile(640, 350, 140, 130, '#4a4a5a', 'SETTINGS', ic.gear);
    } else if (page === 'climate' || page === 'menu') {
      const sl = page === 'menu' ? E3(clamp(o.slide ?? lt / .5)) : 1;
      c.fillStyle = '#122030'; c.fillRect(0, 44, 800, H);
      // sliding side menu
      c.save(); c.translate(-260 * (1 - sl), 0); c.fillStyle = '#1c3048'; c.fillRect(0, 44, 250, H); ['Vehicle', 'Comfort', 'Climate >', 'Seats >', 'Lights', 'Wipers', 'Demist >', 'Mirrors'].forEach((n, i) => { const hl = i === 6 && page === 'menu'; if (hl) { c.fillStyle = 'rgba(80,170,255,.35)'; c.fillRect(0, 60 + i * 52, 250, 46); } txt(c, n, 26, 83 + i * 52, 24, hl ? '#fff' : '#a8c0d8', 'left', 'Oswald'); c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(16, 108 + i * 52, 220, 1.5); }); c.restore();
      if (page === 'climate') { txt(c, '21.5°', 400, 170, 110, '#fff', 'center', 'Oswald'); [['−', 160], ['+', 640]].forEach(([l, bx]) => { c.fillStyle = '#244060'; c.beginPath(); c.arc(bx, 170, 50, 0, 7); c.fill(); txt(c, l, bx, 168, 60, '#fff', 'center', 'Oswald'); });
        for (let k = 0; k < 7; k++) { c.fillStyle = k < 4 ? '#5ab0ff' : '#2a3a4a'; rr(c, 200 + k * 60, 290, 48, 26, 6); c.fill(); } ic.fan(150, 303);
        [['AUTO', 140], ['A/C', 300], ['DEMIST', 460], ['RECIRC', 620]].forEach(([l, bx], i) => { c.fillStyle = i === 2 ? '#3a6a9a' : '#203448'; rr(c, bx - 70, 370, 140, 80, 12); c.fill(); ftxt(c, l, bx, 410, 120, 26, '#dfe8f4', 'center', 'Oswald'); }); }
      else { c.fillStyle = 'rgba(255,255,255,.06)'; for (let k = 0; k < 6; k++) { rr(c, 280, 70 + k * 70, 500, 56, 10); c.fill(); } ['Front demist', 'Rear demist', 'Mirror heat', 'Auto demist', 'Screen heat schedule', 'More...'].forEach((n, i) => { txt(c, n, 300, 98 + i * 70, 24, '#dfe8f4', 'left', 'Oswald'); c.fillStyle = i === 0 ? '#3a8aff' : '#3a4a5a'; rr(c, 700, 84 + i * 70, 56, 28, 14); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(i === 0 ? 742 : 714, 98 + i * 70, 11, 0, 7); c.fill(); }); }
    } else if (page === 'call') { c.fillStyle = '#0e1a14'; c.fillRect(0, 44, 800, H); c.fillStyle = '#2a4a3a'; c.beginPath(); c.arc(400, 180, 80, 0, 7); c.fill(); c.fillStyle = '#9ac8a8'; c.beginPath(); c.arc(400, 160, 30, 0, 7); c.fill(); c.beginPath(); c.ellipse(400, 230, 50, 28, 0, Math.PI, 0); c.fill();
      txt(c, o.caller || 'INCOMING CALL', 400, 300, 40, '#fff', 'center', 'Oswald'); txt(c, '00:0' + Math.floor(lt % 10), 400, 345, 26, '#9ac8a8', 'center', 'Oswald');
      [['#d83a3a', 280], ['#2aaa5a', 520]].forEach(([cl, bx]) => { c.fillStyle = cl; c.beginPath(); c.arc(bx, 420, 44 + Math.sin(t * 6) * 3, 0, 7); c.fill(); ic.phone(bx, 420); }); }
    if (page === 'ad' || page === 'popup') { const a = E3(clamp(lt / .4)); c.fillStyle = `rgba(0,0,0,${.45 * a})`; c.fillRect(0, 0, 800, H);
      CP.popup(c, 140, 110, 520, 280, o.text || (page === 'ad' ? 'UPGRADE TO|PREMIUM CONNECT|£9.99/month' : 'SOFTWARE UPDATE|AVAILABLE'), o.t0 || 0, t); }
    // glass reflection
    c.fillStyle = 'rgba(255,255,255,.06)'; c.beginPath(); c.moveTo(0, 0); c.lineTo(340, 0); c.lineTo(120, H); c.lineTo(0, H); c.fill();
    c.restore(); c.restore(); };
  const E3 = v => 1 - Math.pow(1 - v, 3);
  CP.dashHyper = (c, x, y, w = 1600, t = 0, o = {}) => { const s = w / 1600, H = 260; c.save(); c.translate(x, y); c.scale(s, s);
    TW.glow(c, 800, 130, 1000, '140,120,255', .25);
    c.fillStyle = '#060608'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -10, -10, 1620, H + 20, 40); c.fill(); c.stroke();
    const g = c.createLinearGradient(0, 0, 1600, 0); g.addColorStop(0, '#120a2a'); g.addColorStop(.5, '#0a1a2e'); g.addColorStop(1, '#1a0a26'); c.fillStyle = g; rr(c, 0, 0, 1600, H, 32); c.fill();
    c.save(); rr(c, 0, 0, 1600, H, 32); c.clip();
    // three zones: instruments, centre, passenger
    CP.analogDial(c, 170, 130, 95, .3 + Math.sin(t) * .03, 'km/h', { screen: true }); CP.analogDial(c, 400, 130, 80, .55, 'kW', { screen: true });
    for (let k = 0; k < 9; k++) { const cx = 600 + k * 50; c.fillStyle = `hsla(${200 + k * 18},80%,60%,.85)`; rr(c, cx, 60 + Math.sin(t * 2 + k) * 6, 40, 40, 10); c.fill(); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.arc(cx + 20, 80 + Math.sin(t * 2 + k) * 6, 8, 0, 7); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.08)'; rr(c, 600, 130, 440, 100, 14); c.fill(); txt(c, 'NOW PLAYING', 620, 156, 20, '#b8a8ff', 'left', 'Oswald'); c.fillStyle = '#7a5aff'; c.fillRect(620, 190, 400 * ((t * .05) % 1), 6); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(620, 190, 400, 6);
    c.fillStyle = '#1a2a3a'; rr(c, 1090, 30, 480, 200, 16); c.fill(); for (let k = 0; k < 4; k++) { c.fillStyle = `hsla(${(k * 70 + t * 30) % 360},60%,40%,.9)`; rr(c, 1110 + k * 115, 50, 100, 140, 10); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.07)'; c.beginPath(); c.moveTo(200, 0); c.lineTo(520, 0); c.lineTo(380, H); c.lineTo(60, H); c.fill();
    c.restore(); c.restore(); };

  // steering wheel, centre x,y, diameter 82*s (~38 cm). o.turn radians. Hands drawn by caller (grip points at ±41*s rim, 9 and 3 o'clock).
  CP.steering = (c, x, y, s = 1, t = 0, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.turn || 0); const R = 41;
    c.strokeStyle = INK; c.lineWidth = 13; c.beginPath(); c.arc(0, 0, R, 0, 7); c.stroke(); c.strokeStyle = '#2a2a30'; c.lineWidth = 9; c.stroke(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, R + 1, -2.6, -1.4); c.stroke();
    c.fillStyle = '#34343a'; c.strokeStyle = INK; c.lineWidth = 2; for (const a of [Math.PI / 2 + .9, Math.PI / 2 - .9, Math.PI * 1.5 + 1.4, Math.PI * 1.5 - 1.4].slice(0, 3)) { c.save(); c.rotate(a - Math.PI / 2); rr(c, -6, 8, 12, R - 12, 4); c.fill(); c.stroke(); c.restore(); }
    c.fillStyle = '#3a3a42'; rr(c, -15, -12, 30, 24, 8); c.fill(); c.stroke(); c.fillStyle = '#5a5a62'; c.beginPath(); c.arc(0, 0, 5, 0, 7); c.fill();
    c.fillStyle = '#8a8a94'; for (const bx of [-24, 24]) { c.beginPath(); c.arc(bx, 4, 3, 0, 7); c.fill(); } c.restore(); };

  // nodding dashboard dog, bottom centre, ~34*s tall (15 cm). mode nod|shake|idle; o.t0 start time
  CP.dog = (c, x, y, s = 1, t = 0, mode = 'idle', o = {}) => { const lt = t - (o.t0 || 0), damp = Math.exp(-Math.max(0, lt) * .9);
    const nod = mode === 'nod' ? Math.sin(lt * 11) * .35 * (.4 + .6 * damp) : mode === 'idle' ? Math.sin(t * 2.2) * .06 : 0;
    const shake = mode === 'shake' ? Math.sin(lt * 13) * .45 * (.4 + .6 * damp) : 0;
    c.save(); shadow(c, x, y, 18 * s, .4); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineJoin = 'round'; c.lineWidth = 1.6;
    const fur = '#9a6a3a', furD = '#6a4422', furL = '#c89a64';
    // body (sitting)
    const bg = c.createRadialGradient(-3, -14, 1, 0, -10, 16); bg.addColorStop(0, furL); bg.addColorStop(1, furD); c.fillStyle = bg;
    c.beginPath(); c.ellipse(0, -10, 11, 10, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = fur; c.beginPath(); c.ellipse(-5, -2, 5, 2.6, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(6, -2, 5, 2.6, 0, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = furD; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, -8); c.quadraticCurveTo(-17, -12, -15, -18 + Math.sin(t * 6) * 2); c.stroke();
    // spring
    c.strokeStyle = '#b8bcc4'; c.lineWidth = 1.3; c.beginPath(); for (let k = 0; k <= 12; k++) { const yy = -18 - k * .7, xx = Math.sin(k * 1.6) * 2.5 + Math.sin(shake) * k * .3; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke();
    // head
    c.save(); c.translate(Math.sin(shake) * 3, -27); c.rotate(nod + shake * .3); c.scale(Math.cos(shake) * .25 + .75, 1);
    const hg = c.createRadialGradient(-2, -4, 1, 0, 0, 13); hg.addColorStop(0, furL); hg.addColorStop(1, fur); c.fillStyle = hg; c.strokeStyle = INK; c.lineWidth = 1.6;
    c.fillStyle = furD; c.beginPath(); c.ellipse(-10, 1, 4, 8, .35, 0, 7); c.fill(); c.stroke(); c.fillStyle = hg; c.beginPath(); c.ellipse(0, -2, 11, 10, 0, 0, 7); c.fill(); c.stroke();
    c.fillStyle = furL; c.beginPath(); c.ellipse(7, 3, 7, 5, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#1a1210'; c.beginPath(); c.ellipse(12, 1.5, 2.5, 2, 0, 0, 7); c.fill();
    c.beginPath(); c.arc(3, -5, 1.8, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(3.5, -5.6, .6, 0, 7); c.fill(); c.fillStyle = furD; c.strokeStyle = INK; c.beginPath(); c.ellipse(-4, -1, 4, 7, -.3, 0, 7); c.fill(); c.stroke();
    if (mode === 'shake' && lt > 0 && lt < 2.5) { c.fillStyle = '#e85a6a'; c.beginPath(); c.ellipse(9, 8, 2, 1.4, 0, 0, 7); c.fill(); }
    c.restore(); c.restore(); };

  // EYES OFF ROAD meter, centre x,y (screen space). ~ 300*s x 120*s.
  CP.eyesMeter = (c, x, y, s = 1, m = 0) => { const red = m > 300, W = 300, H = 120; c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -W / 2 + 6, -H / 2 + 8, W, H, 16); c.fill();
    const g = c.createLinearGradient(0, -H / 2, 0, H / 2); g.addColorStop(0, red ? '#4a1214' : '#1e2630'); g.addColorStop(1, red ? '#2a0608' : '#0e1218'); c.fillStyle = g; c.strokeStyle = red ? '#ff4a3a' : '#e8e4d8'; c.lineWidth = 4; rr(c, -W / 2, -H / 2, W, H, 16); c.fill(); c.stroke();
    if (red) TW.glow(c, 0, 0, 220, '255,60,40', .35);
    // eye icon with slash
    c.save(); c.translate(-110, -2); c.strokeStyle = red ? '#ff6a5a' : '#e8e4d8'; c.lineWidth = 4; c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(0, -20, 22, 0); c.quadraticCurveTo(0, 20, -22, 0); c.stroke(); c.fillStyle = c.strokeStyle; c.beginPath(); c.arc(0, 0, 7, 0, 7); c.fill(); c.beginPath(); c.moveTo(-20, 18); c.lineTo(20, -18); c.stroke(); c.restore();
    txt(c, 'EYES OFF ROAD', 34, -32, 24, red ? '#ffb0a8' : '#c8c4b8', 'center', 'Oswald');
    txt(c, Math.round(m) + ' m', 34, 18, 62, red ? '#ff5a4a' : '#fff', 'center', 'Anton');
    c.restore(); };

  // ad pop-up, x,y TOP-LEFT, w,h; slides in from the right from t0 over .45 s. text uses | for lines
  CP.popup = (c, x, y, w, h, text, t0 = 0, t = 0) => { const lt = t - t0; if (lt < 0) return; const a = E3(clamp(lt / .45)), bounce = Math.sin(clamp(lt / .45) * Math.PI) * 10;
    c.save(); c.translate(x + (1 - a) * (w + 200) - bounce, y); c.globalAlpha = clamp(lt / .2);
    c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, 10, 14, w, h, 18); c.fill();
    c.fillStyle = '#f6f4f0'; c.strokeStyle = INK; c.lineWidth = 4; rr(c, 0, 0, w, h, 18); c.fill(); c.stroke();
    c.fillStyle = '#e8453a'; rr(c, 0, 0, w, h * .2, { upperLeft: 18, upperRight: 18 }); c.fill(); txt(c, 'OFFER', 20, h * .1, h * .11, '#fff', 'left', 'Oswald');
    c.fillStyle = '#fff'; c.beginPath(); c.arc(w - h * .1, h * .1, h * .065, 0, 7); c.fill(); c.strokeStyle = '#e8453a'; c.lineWidth = 3; c.beginPath(); c.moveTo(w - h * .13, h * .07); c.lineTo(w - h * .07, h * .13); c.moveTo(w - h * .07, h * .07); c.lineTo(w - h * .13, h * .13); c.stroke();
    lines(c, text, w / 2, h * .52, w - 50, h * .15, INK);
    const pulse = 1 + Math.sin(t * 6) * .03; c.save(); c.translate(w / 2, h * .85); c.scale(pulse, pulse); c.fillStyle = '#2a7aff'; rr(c, -w * .25, -h * .07, w * .5, h * .14, h * .07); c.fill(); txt(c, 'BUY NOW', 0, 0, h * .08, '#fff', 'center', 'Oswald'); c.restore();
    c.restore(); };
  // hanging price tag, centre; swing radians
  CP.priceTag = (c, x, y, s = 1, text = '£9.99', swing = 0) => { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(swing); c.strokeStyle = '#6a5a48'; c.lineWidth = 2; c.beginPath(); c.moveTo(-40, -36); c.lineTo(-60, -60); c.stroke();
    c.fillStyle = '#f4e8c8'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(-60, -30); c.lineTo(-30, -45); c.lineTo(80, -45); c.lineTo(80, 45); c.lineTo(-30, 45); c.lineTo(-60, 30); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(-38, 0, 7, 0, 7); c.fill(); c.stroke(); ftxt(c, text, 25, 3, 96, 46, '#c8262e'); c.restore(); };
  // padlock, centre, ~60*s tall
  CP.padlock = (c, x, y, s = 1, open = false) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 3;
    c.save(); if (open) { c.translate(14, -12); c.rotate(-.5); } c.lineWidth = 12; c.beginPath(); c.moveTo(-14, -4); c.lineTo(-14, -20); c.arc(0, -20, 14, Math.PI, 0); c.lineTo(14, -4); c.stroke(); c.strokeStyle = '#c8ccd4'; c.lineWidth = 7; c.stroke(); c.restore();
    const g = c.createLinearGradient(-24, 0, 24, 0); g.addColorStop(0, '#b8861e'); g.addColorStop(.35, '#f4d06a'); g.addColorStop(1, '#8a6214'); c.fillStyle = g; rr(c, -24, -6, 48, 40, 7); c.fill(); c.lineWidth = 3; c.stroke();
    c.fillStyle = '#2a1a0a'; c.beginPath(); c.arc(0, 8, 5, 0, 7); c.fill(); c.fillRect(-2, 8, 4, 12); c.restore(); };
  // car seat with heating, bottom centre (~ 260*s tall). o.locked shows padlock + paywall price, o.warm 0..1 heat waves
  CP.seatHeated = (c, x, y, s = 1, t = 0, o = {}) => { const warm = o.warm ?? 0; c.save(); shadow(c, x, y, 120 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 3.5; c.lineJoin = 'round';
    const col = '#3a3a44'; const g = c.createLinearGradient(-60, 0, 60, 0); g.addColorStop(0, sh(col, -.2)); g.addColorStop(.4, sh(col, .25)); g.addColorStop(1, sh(col, -.3));
    c.fillStyle = '#26262a'; c.fillRect(-50, -30, 14, 30); c.fillRect(36, -30, 14, 30);
    c.fillStyle = g; rpoly(c, [[-90, -40], [90, -40], [96, -96], [-80, -100]], 20); c.fill(); c.stroke();
    rpoly(c, [[-80, -90], [-30, -96], [-10, -250], [-70, -250]], 18); c.fill(); c.stroke(); rr(c, -76, -300, 62, 44, 14); c.fill(); c.stroke();
    if (warm > 0) { c.fillStyle = `rgba(255,120,40,${.35 * warm})`; rpoly(c, [[-80, -92], [-32, -98], [-14, -240], [-66, -240]], 14); c.fill(); c.fillStyle = `rgba(255,120,40,${.3 * warm})`; c.fillRect(-80, -94, 160, 44);
      for (let k = 0; k < 3; k++) { const ph = (t * 1.3 + k * .33) % 1; c.strokeStyle = `rgba(255,150,60,${(1 - ph) * warm})`; c.lineWidth = 5; c.beginPath(); const bx = 10 + k * 30, by = -110 - ph * 90; c.moveTo(bx, by); c.quadraticCurveTo(bx + 12, by - 20, bx, by - 40); c.quadraticCurveTo(bx - 12, by - 60, bx, by - 80); c.stroke(); } }
    c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-70 + k * 4, -130 - k * 30); c.lineTo(-22 + k * 2, -134 - k * 30); c.stroke(); }
    c.restore(); if (o.locked) { CP.padlock(c, x + 20 * s, y - 160 * s, 1.4 * s, false); } };
  // phone mast, bottom centre, ~900*s tall; o.off -> dead panels, sparks
  CP.mast = (c, x, y, s = 1, t = 0, o = {}) => { c.save(); shadow(c, x, y, 120 * s); c.translate(x, y); c.scale(s, s); c.strokeStyle = '#6a6e76'; c.lineWidth = 8; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-90, 0); c.lineTo(-18, -860); c.moveTo(90, 0); c.lineTo(18, -860); c.stroke(); c.lineWidth = 4; for (let k = 0; k < 10; k++) { const y0 = -k * 86, y1 = -(k + 1) * 86, w0 = 90 - k * 7.2, w1 = 90 - (k + 1) * 7.2; c.beginPath(); c.moveTo(-w0, y0); c.lineTo(w1, y1); c.moveTo(w0, y0); c.lineTo(-w1, y1); c.moveTo(-w1, y1); c.lineTo(w1, y1); c.stroke(); }
    c.strokeStyle = INK; c.lineWidth = 2; c.globalAlpha = .5; c.beginPath(); c.moveTo(-90, 0); c.lineTo(-18, -860); c.moveTo(90, 0); c.lineTo(18, -860); c.stroke(); c.globalAlpha = 1;
    for (const [px, py] of [[-46, -820], [46, -820], [0, -840], [-40, -680], [40, -680]]) { c.fillStyle = '#e8e8ec'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, px - 14, py - 50, 28, 100, 6); c.fill(); c.stroke(); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(px + 4, py - 46, 8, 92); }
    c.fillStyle = o.off ? '#3a1010' : (Math.sin(t * 4) > 0 ? '#ff3a2a' : '#7a1a14'); c.beginPath(); c.arc(0, -900, 10, 0, 7); c.fill(); c.strokeStyle = INK; c.stroke(); if (!o.off && Math.sin(t * 4) > 0) TW.glow(c, 0, -900, 60, '255,60,40', .6);
    if (!o.off) { c.strokeStyle = 'rgba(140,210,255,.6)'; c.lineWidth = 6; for (let k = 0; k < 3; k++) { const ph = (t * .8 + k / 3) % 1, rr2 = 60 + ph * 260; c.globalAlpha = 1 - ph; c.beginPath(); c.arc(0, -820, rr2, -.6, .6); c.stroke(); c.beginPath(); c.arc(0, -820, rr2, Math.PI - .6, Math.PI + .6); c.stroke(); } c.globalAlpha = 1; }
    else { for (let k = 0; k < 14; k++) { const ph = (t * 1.7 + k * .137) % 1, a = k * 2.4; if ((Math.floor(t * 3 + k) % 3) === 0) continue; c.strokeStyle = `rgba(255,${200 - ph * 120},60,${1 - ph})`; c.lineWidth = 3; const sx = Math.cos(a) * ph * 110, sy = -820 + Math.sin(a) * ph * 60 + ph * ph * 140; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx - Math.cos(a) * 14, sy - 8); c.stroke(); }
      if (Math.sin(t * 23) > .3) { TW.glow(c, -46, -820, 80, '255,200,80', .7); c.strokeStyle = '#fff6c0'; c.lineWidth = 3; c.beginPath(); c.moveTo(-46, -860); c.lineTo(-30, -840); c.lineTo(-50, -820); c.lineTo(-34, -800); c.stroke(); } }
    c.restore(); };
  // invoice sheet, centre, ~ 220x300*s; text lines with |
  CP.invoice = (c, x, y, s = 1, text = 'SUBSCRIPTION|£15/month', rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-104, -142, 220, 300); c.fillStyle = '#fbf8f0'; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(-110, -150); c.lineTo(110, -150); c.lineTo(110, 130); for (let k = 0; k < 11; k++) c.lineTo(110 - k * 20 - 10, 150 - (k % 2) * 12); c.lineTo(-110, 150); c.closePath(); c.fill(); c.stroke();
    txt(c, 'INVOICE', 0, -118, 34, '#c8262e', 'center', 'Anton'); c.fillStyle = '#c8262e'; c.fillRect(-90, -96, 180, 3);
    c.strokeStyle = '#b0aca0'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-90, -76 + k * 14); c.lineTo(40 - k * 15, -76 + k * 14); c.stroke(); }
    lines(c, text, 0, 40, 180, 34, INK, 1.25); c.fillStyle = '#c8262e'; c.fillRect(-90, 108, 180, 3); c.restore(); };
  // dashboard phone holder (vent clip), bottom centre ~ 140*s tall. o.phone: true | 'map' | 'call'
  CP.phoneHolder = (c, x, y, s = 1, o = {}) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 2.5;
    c.fillStyle = '#26262a'; rr(c, -8, -30, 16, 30, 4); c.fill(); c.stroke(); c.beginPath(); c.arc(0, -36, 10, 0, 7); c.fill(); c.stroke();
    c.fillStyle = '#34343a'; rr(c, -46, -150, 92, 18, 5); c.fill(); c.stroke(); rr(c, -46, -48, 92, 14, 5); c.fill(); c.stroke(); c.fillRect(-4, -136, 8, 90);
    if (o.phone) { c.fillStyle = '#121216'; rr(c, -38, -150 + 6, 76, 106 - 6 + 4, 10); c.fill(); c.stroke(); const g = c.createLinearGradient(0, -140, 0, -50); g.addColorStop(0, o.phone === 'call' ? '#1e4a30' : '#2a5a8a'); g.addColorStop(1, '#0e1a2a'); c.fillStyle = g; rr(c, -33, -139, 66, 92, 6); c.fill();
      if (o.phone === 'map' || o.phone === true) { c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(-28, -60); c.lineTo(10, -110); c.lineTo(20, -138); c.stroke(); c.fillStyle = '#3a8aff'; c.beginPath(); c.arc(0, -96, 5, 0, 7); c.fill(); }
      c.fillStyle = 'rgba(255,255,255,.15)'; c.beginPath(); c.moveTo(-33, -139); c.lineTo(0, -139); c.lineTo(-33, -80); c.fill(); }
    c.fillStyle = '#4a4a52'; for (const sx of [-50, 42]) { rr(c, sx, -132, 8, 70, 3); c.fill(); c.stroke(); } c.restore(); };
  // analog dial with real needle, centre x,y radius r, v 0..1. o.screen draws a digital-styled ring
  CP.analogDial = (c, x, y, r = 80, v = 0, label = '', o = {}) => { c.save(); c.translate(x, y); const scr = o.screen;
    const g = c.createRadialGradient(0, -r * .3, r * .1, 0, 0, r); g.addColorStop(0, scr ? '#1a2a44' : '#3a3a40'); g.addColorStop(1, scr ? '#080c18' : '#121216'); c.fillStyle = g; c.strokeStyle = scr ? '#5ab0ff' : '#c8ccd4'; c.lineWidth = r * .06; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.stroke(); c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.arc(0, 0, r * 1.03, 0, 7); c.stroke();
    const a0 = Math.PI * .75, a1 = Math.PI * 2.25; for (let k = 0; k <= 20; k++) { const a = a0 + (a1 - a0) * k / 20, big = k % 5 === 0; c.strokeStyle = k > 16 ? '#ff4a3a' : (scr ? '#a8d8ff' : '#f0ece0'); c.lineWidth = big ? 3 : 1.5; c.beginPath(); c.moveTo(Math.cos(a) * r * (big ? .72 : .8), Math.sin(a) * r * (big ? .72 : .8)); c.lineTo(Math.cos(a) * r * .9, Math.sin(a) * r * .9); c.stroke(); }
    if (scr) { c.strokeStyle = '#5ab0ff'; c.lineWidth = r * .08; c.beginPath(); c.arc(0, 0, r * .62, a0, a0 + (a1 - a0) * clamp(v)); c.stroke(); }
    if (label) txt(c, label, 0, r * .42, r * .2, scr ? '#a8d8ff' : '#e8e4d8', 'center', 'Oswald');
    const a = a0 + (a1 - a0) * clamp(v); c.save(); c.rotate(a); c.fillStyle = '#ff5a2a'; c.strokeStyle = INK; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-r * .14, -r * .035); c.lineTo(r * .84, 0); c.lineTo(-r * .14, r * .035); c.closePath(); c.fill(); c.stroke(); c.restore();
    c.fillStyle = '#2a2a30'; c.beginPath(); c.arc(0, 0, r * .09, 0, 7); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.1)'; c.beginPath(); c.ellipse(-r * .2, -r * .45, r * .55, r * .3, -.4, 0, 7); c.fill(); c.restore(); };
  // stock board, x,y TOP-LEFT w,h; o.drop 0..1 progress of the falling red line
  CP.stockBoard = (c, x, y, w = 600, h = 360, t = 0, o = {}) => { const d = clamp(o.drop ?? 1); c.save(); c.translate(x, y);
    c.fillStyle = '#0e1218'; c.strokeStyle = INK; c.lineWidth = 5; rr(c, 0, 0, w, h, 14); c.fill(); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.07)'; c.lineWidth = 1; for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(20, k * h / 6); c.lineTo(w - 20, k * h / 6); c.stroke(); c.beginPath(); c.moveTo(k * w / 6, 20); c.lineTo(k * w / 6, h - 20); c.stroke(); }
    txt(c, o.label || 'SHARE PRICE', 24, 30, 26, '#a8b0c0', 'left', 'Oswald');
    const N = 40, pt = k => { const f = k / N, base = f < .55 ? .3 + f * .4 + Math.sin(k * 1.7) * .03 : .52 - (f - .55) / .45 * .45 + Math.sin(k * 2.3) * .025; return [24 + f * (w - 48), h - 30 - base * (h - 80)]; };
    const n = Math.max(2, Math.round(N * (.55 + .45 * d)));
    c.lineWidth = 5; c.lineJoin = 'round'; for (const pass of [0, 1]) { c.beginPath(); for (let k = 0; k <= (pass ? n : Math.round(N * .55)); k++) { const [px, py] = pt(k); k ? c.lineTo(px, py) : c.moveTo(px, py); } c.strokeStyle = pass ? '#ff3a30' : '#3ad06a'; if (pass) { c.shadowColor = '#ff3a30'; c.shadowBlur = 14; } c.stroke(); c.shadowBlur = 0; }
    const [ex, ey] = pt(n); c.fillStyle = '#ff3a30'; c.beginPath(); c.arc(ex, ey, 8 + Math.sin(t * 8) * 2, 0, 7); c.fill();
    txt(c, '▼ ' + (d * (o.pct ?? 38)).toFixed(1) + '%', w - 24, 30, 30, '#ff5a4a', 'right', 'Anton'); c.restore(); };
  // penalty notice ticket, centre
  CP.ticket = (c, x, y, s = 1, text = '£100|3 POINTS', rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(-84, -112, 180, 240); c.fillStyle = '#fff6b8'; c.strokeStyle = INK; c.lineWidth = 3; rr(c, -90, -120, 180, 240, 6); c.fill(); c.stroke();
    c.fillStyle = '#1a1a1a'; c.fillRect(-90, -120, 180, 46); lines(c, 'PENALTY|NOTICE', 0, -97, 160, 20, '#ffd84a', 1.1);
    c.strokeStyle = '#c8b870'; c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(-74, -56 + k * 14); c.lineTo(74, -56 + k * 14); c.stroke(); }
    lines(c, text, 0, 40, 150, 38, '#c8262e', 1.2); c.setLineDash([6, 5]); c.strokeStyle = '#8a8060'; c.beginPath(); c.moveTo(-90, 96); c.lineTo(90, 96); c.stroke(); c.setLineDash([]); c.restore(); };
  // road/rule sign on a post, bottom centre, ~ 520*s tall. text with |
  CP.ruleSign = (c, x, y, s = 1, text = 'EYES ON|THE ROAD', o = {}) => { c.save(); shadow(c, x, y, 40 * s); c.translate(x, y); c.scale(s, s);
    const pg = c.createLinearGradient(-7, 0, 7, 0); pg.addColorStop(0, '#6a6e76'); pg.addColorStop(.4, '#d0d4da'); pg.addColorStop(1, '#5a5e66'); c.fillStyle = pg; c.strokeStyle = INK; c.lineWidth = 2.5; c.fillRect(-7, -360, 14, 360); c.strokeRect(-7, -360, 14, 360);
    const col = o.col || '#1e5aa8'; c.fillStyle = col; c.lineWidth = 4; rr(c, -140, -520, 280, 180, 14); c.fill(); c.stroke(); c.strokeStyle = '#fff'; c.lineWidth = 5; rr(c, -130, -510, 260, 160, 9); c.stroke();
    lines(c, text, 0, -430, 230, 52, '#fff', 1.15, 'Oswald'); c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.moveTo(-130, -510); c.lineTo(-20, -510); c.lineTo(-90, -350); c.lineTo(-130, -350); c.fill(); c.restore(); };
})(window);
