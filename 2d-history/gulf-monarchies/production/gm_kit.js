// Gulf monarchies (GM) kit: cast + props for "Why Gulf Kings Never Fall". Loaded after pr_kit.js. window.GM.
// All people are stylised Gumball-rig stand-ins: NO likeness of real people, no real logos or emblems.
//
// CAST (each returns { look }; spread into a figure: { x, y, s, ...GM.ROYAL(1), pose, mood, t }):
//   GM.SHEIKH(k, o)   Gulf elder/ruler. k: 0 elder grey beard, 1 middle-aged black beard, 2 young short beard (cycles; k also varies skin).
//                     o: { robe, check (true = red-white ghutra), bisht (cloak colour), trim, old (1800s earthy), beardCol, glasses, agal (default true) }
//   GM.ROYAL(k)       SHEIKH + dark bisht with gold trim (k 0 elder, 1 middle-aged, 2 crown-prince type)
//   GM.SULTAN(old, o) Omani: colourful massar turban, white dishdasha, khanjar. old=true grey beard; false young dark beard. o.uniform = olive military jacket
//   GM.CLERIC(k)      robe + bisht, plain headcloth without agal, long beard
//   GM.DIVER(k, o)    1800s pearl diver: bare chest, izar wrap to the knees, bare legs. o.clip (nose clip, default on for even k)
//   GM.CAPTAIN()      pearl-boat captain: thobe + turban
//   GM.OFFICER(era, o) British officer. '1820': navy coat, gold buttons, bicorne. '1960': khaki shirt, beret (o.cap = peaked cap), o.shorts, moustache
//   GM.PM(o)          1960s British PM type, grey suit. o.pipe = pipe in mouth
//   GM.SOLDIER(k)     mid-century Arab army, olive fatigues + cap/beret
//   GM.GENERAL()      modern desert-camo uniform + cap
//   GM.GUARD(k)       dark uniform, maroon beret
//   GM.LABOURER(k)    blue/orange coveralls, hard hat, South Asian skin tones
//   GM.BOSS(suit)     businessman: thobe + ghutra (suit=true: dark suit)
//   GM.CITIZEN(k)     even k: young man in thobe + ghutra; odd k: woman in abaya + shayla
//   GM.CLERK(k)       office worker in thobe + ghutra
//   GM.PROTESTER(k)   casual clothes; k%3==1 woman in headscarf
//   GM.REBEL()        1970s Dhofar fighter: khaki, headwrap
//   Extra look flags (look.gm): robe, izar, bisht, trim, head ('ghutra'|'massar'|'turban'|'bicorne'|'beret'|'peak'|'hardhat'|'shayla'|'wrap'),
//     hcol, hcol2, check, agal, khanjar, belt, beard ('short'|'long'), beardCol, tash, clip, pipe, epaulettes, buttons, camo, scale
//
// PROPS (bottom-centre at x,y unless said; s = same scale number as figures):
//   GM.crowns(c, x, y, s, st, t)       tracker panel, x,y = TOP-LEFT (about 300x96 at s 1). st: 6 numbers, 0 standing, 0..1 wobble, 2 fallen. Shows n/6
//   GM.crown(c, x, y, s, rot, glint)   gold crown (rot around its base)
//   GM.pearl(c, x, y, s, glint)        glossy pearl (centre)
//   GM.dhow(c, x, y, s, t)             wooden dhow with lateen sail, bobbing (x,y = waterline centre)
//   GM.tank(c, x, y, s, t, facing)     olive tank, wheels/tracks driven by t (pass 0 to stand still)
//   GM.apc / GM.truck(c, x, y, s, t, facing)  armoured vehicle, turning wheels
//   GM.jet(c, x, y, s, rot)            fighter jet top view, CENTRE, nose along +x rotated by rot
//   GM.cargo(c, x, y, s)               cargo plane side view (on its wheels)
//   GM.streak(c, x0, y0, x1, y1, p)    missile/interceptor streak along an arc, p 0..1 travel, 1..1.6 burst fading
//   GM.barrel(c, x, y, s)  GM.chest(c, x, y, s, open)  GM.coins(c, x, y, s, n, t) pouring coins onto a pile
//   GM.passport(c, x, y, s)  GM.ballot(c, x, y, s, locked)  GM.hourglass(c, x, y, s, level 0..1 of oil in the top)
//   GM.scroll(c, x, y, s)  treaty scroll with seal   GM.flag(c, x, y, s, col1, col2, t)  plain waving flag on a pole
//   GM.dallah(c, x, y, s)  coffee pot   GM.suitcase(c, x, y, s, open)   GM.pipe(c, x, y, s) (hand prop, e.g. in hold)
//   GM.ntag(c, x, y, text, a, o)       name tag pill, a = 0..1 pop/alpha; o: { px, col, bg }
(function (G) {
  const K = G.KIT, TW = G.TW, INK = TW.INK, rr = TW.rr, R6 = G.RIG6, R = G.RIG, sh = (h, f) => R.shadeHex(h, f), D = Math.PI / 180;
  const GM = G.GM = {};
  const shadow = (c, x, y, w, a = .32) => { c.save(); c.translate(x, y); c.scale(1, .22); const g = c.createRadialGradient(0, 0, 0, 0, 0, w); g.addColorStop(0, `rgba(30,18,8,${a})`); g.addColorStop(1, 'rgba(30,18,8,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, w, 0, 7); c.fill(); c.restore(); };
  GM.shadow = shadow;
  const look = (base, o, gm) => ({ look: Object.assign({}, R6.LOOKS[base], { style: 'gumball' }, o, gm ? { gm } : {}) });
  const ink = (c, w = 3) => { c.strokeStyle = INK; c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke(); };
  const GOLD = '#e2b23a', GOLD_D = '#a8781e';

  // ---- figure wrapper: draws robe skirt, izar, bisht, khanjar, uniform bits and headwear through the hat hook (figure-local coords)
  const F0 = R6.figure;
  R6.figure = (ctx, o) => { const L = o.look, X = L && L.gm; if (!X) return F0(ctx, o);
    const o2 = Object.assign({}, o), userHat = o.hat, t = o.t ?? 0; if (X.scale) o2.s = (o.s ?? 1) * X.scale;
    if (X.tash && o.tash === undefined) o2.tash = X.tash;
    const P = o.P || R.poseAngles(o, t); o2.P = P;
    o2.hat = (c, hx, hy) => { const rx = 53, ry = 57, Xh = hx, Y = hy + ry * .08;
      const thigh = 72, shin = 70, hipW = 25, shW = 36, walking = o.pose === 'walk' || o.pose === 'run';
      const footRel = (h, k) => thigh * Math.cos(h * D) + shin * Math.cos((h + k) * D);
      const hipY = -12 - Math.max(footRel(P.hipL, P.kneeL), footRel(P.hipR, P.kneeR)) + (walking ? P.bob * 1.4 : P.bob * .5);
      const lean = (P.lean + (o.lean || 0)) * D, nk = { x: Math.sin(lean) * 104, y: hipY - Math.cos(lean) * 104 }, cx = nk.x * .55 + 6;
      const legs = [-1, 1].map(sd => { const hx2 = sd * hipW * .45, a1 = P[sd < 0 ? 'hipL' : 'hipR'] * D, a2 = a1 + P[sd < 0 ? 'kneeL' : 'kneeR'] * D; const kx = hx2 + Math.sin(a1) * thigh, ky = hipY + Math.cos(a1) * thigh; return { kx, ky, fx: kx + Math.sin(a2) * shin, fy: ky + Math.cos(a2) * shin }; });
      const fr = legs[0].kx > legs[1].kx ? legs[0] : legs[1], bk = fr === legs[0] ? legs[1] : legs[0];
      c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
      // skirt from the hips to (ankles | knees)
      const skirt = (col, toKnee) => { const hw = 37, top = hipY - 14;
        const pts = toKnee ? [[Math.max(fr.kx + 16, 34), Math.max(fr.ky, bk.ky) + 6], [Math.min(bk.kx - 16, -34), Math.max(fr.ky, bk.ky) + 6]]
          : [[Math.max(fr.kx + 17, 36), fr.ky], [Math.max(fr.fx + 21, 32), fr.fy - 13], [Math.min(bk.fx - 19, -32), bk.fy - 13], [Math.min(bk.kx - 17, -38), bk.ky]];
        const path = (close) => { c.beginPath(); c.moveTo(hw, top); for (const p of pts) c.lineTo(p[0], p[1]); c.lineTo(-hw, top); if (close) c.closePath(); };
        path(true); c.fillStyle = col; c.fill();
        c.save(); path(true); c.clip(); c.fillStyle = sh(col, -.12); c.beginPath(); c.moveTo(-60, top); c.lineTo(-12, top); c.lineTo(Math.min(bk.fx, -4), 10); c.lineTo(-60, 10); c.fill();
        c.strokeStyle = sh(col, -.28); c.lineWidth = 1.8; c.beginPath(); c.moveTo(cx + 2, top + 4); c.lineTo((fr.fx + bk.fx) / 2 + 6, toKnee ? fr.ky : -14); c.moveTo(-18, top + 20); c.lineTo(Math.min(bk.fx - 6, -14), toKnee ? fr.ky : -16); c.stroke(); c.restore();
        c.beginPath(); c.moveTo(hw, top); for (const p of pts) c.lineTo(p[0], p[1]); c.lineTo(-hw, top); ink(c, 3); };
      if (X.robe) skirt(X.robe, false);
      if (X.izar) { skirt(X.izar, true); c.strokeStyle = sh(X.izar, -.35); c.lineWidth = 6; c.beginPath(); c.moveTo(-36, hipY - 10); c.lineTo(36, hipY - 10); c.stroke(); }
      if (X.belt) { c.fillStyle = X.belt; c.beginPath(); c.roundRect(-37, hipY - 16, 74, 10, 3); c.fill(); ink(c, 2.2); }
      if (X.camo) { c.save(); c.beginPath(); c.ellipse(nk.x * .5 + 2, (nk.y + hipY) / 2 + 4, 34, 58, 0, 0, 7); c.clip(); for (let k = 0; k < 14; k++) { c.fillStyle = X.camo[k % X.camo.length]; c.beginPath(); c.ellipse(-30 + (k * 37) % 62, nk.y + 8 + (k * 53) % (hipY - nk.y), 8 + (k % 3) * 3, 5 + (k % 2) * 3, k, 0, 7); c.fill(); } c.restore(); }
      if (X.bisht) { const col = X.bisht, tr = X.trim || GOLD, by = Math.min(-46, hipY + 104);
        const back = () => { c.beginPath(); c.moveTo(nk.x + 10, nk.y - 3); c.quadraticCurveTo(nk.x - shW - 4, nk.y - 2, nk.x - shW - 9, nk.y + 18); c.lineTo(-50, by); c.quadraticCurveTo(-26, by + 5, -4, by); c.lineTo(nk.x - 2, nk.y + 34); c.closePath(); };
        const front = () => { c.beginPath(); c.moveTo(nk.x + 18, nk.y - 1); c.quadraticCurveTo(nk.x + shW + 6, nk.y + 2, nk.x + shW + 9, nk.y + 20); c.lineTo(52, by); c.lineTo(34, by + 2); c.lineTo(nk.x + 24, nk.y + 26); c.closePath(); };
        for (const f of [back, front]) { f(); c.fillStyle = f === back ? sh(col, -.06) : col; c.fill(); ink(c, 3); }
        c.strokeStyle = tr; c.lineWidth = 5; c.beginPath(); c.moveTo(nk.x - 2, nk.y + 34); c.lineTo(-4, by); c.moveTo(nk.x + 24, nk.y + 26); c.lineTo(34, by + 2); c.moveTo(nk.x - 14, nk.y - 2); c.quadraticCurveTo(nk.x + 6, nk.y + 6, nk.x + 24, nk.y + 2); c.stroke();
        c.strokeStyle = 'rgba(255,240,200,.5)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(nk.x - 1, nk.y + 36); c.lineTo(-3, by - 4); c.stroke(); }
      if (X.khanjar) { const bx = cx + 4, by = hipY - 10; c.fillStyle = '#8a5a2a'; c.beginPath(); c.roundRect(-37, by - 6, 74, 12, 4); c.fill(); ink(c, 2.2);
        c.fillStyle = '#d8dce2'; c.beginPath(); c.moveTo(bx - 7, by - 10); c.lineTo(bx + 7, by - 10); c.lineTo(bx + 8, by + 24); c.bezierCurveTo(bx + 10, by + 44, bx + 34, by + 46, bx + 36, by + 28); c.bezierCurveTo(bx + 30, by + 36, bx + 16, by + 34, bx - 6, by + 22); c.closePath(); c.fill(); ink(c, 2.4);
        c.fillStyle = '#e8d8b0'; c.beginPath(); c.roundRect(bx - 8, by - 26, 16, 18, 6); c.fill(); ink(c, 2.2); c.fillStyle = GOLD; c.beginPath(); c.arc(bx, by + 8, 3.5, 0, 7); c.fill(); }
      if (X.buttons) { c.fillStyle = GOLD; for (let k = 0; k < 4; k++) { c.beginPath(); c.arc(cx + 13, nk.y + 34 + k * 15, 3.2, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 1.2; c.stroke(); } }
      if (X.epaulettes) { c.fillStyle = GOLD; c.beginPath(); c.ellipse(nk.x + shW * .45, nk.y + 6, 15, 6, -.1, 0, 7); c.fill(); ink(c, 2); c.strokeStyle = GOLD_D; c.lineWidth = 2; for (let k = -3; k <= 3; k++) { c.beginPath(); c.moveTo(nk.x + shW * .45 + k * 4, nk.y + 10); c.lineTo(nk.x + shW * .45 + k * 4.4, nk.y + 20); c.stroke(); } }
      // ---- face extras
      const fx = Xh + rx * .3, fy = Y + ry * .06, mx = fx + 8, my = fy + 30, bc = X.beardCol || L.hairCol;
      if (X.beard === 'short') { c.fillStyle = bc; c.beginPath(); c.moveTo(Xh - rx * .5, Y + ry * .35); c.bezierCurveTo(Xh - rx * .4, Y + ry * 1.18, Xh + rx * .85, Y + ry * 1.15, Xh + rx * .85, Y + ry * .5); c.quadraticCurveTo(mx + 12, my + 10, mx, my + 8); c.quadraticCurveTo(mx - 18, my + 6, Xh - rx * .5, Y + ry * .35); c.fill(); ink(c, 2.4); }
      if (X.beard === 'long') { c.fillStyle = bc; c.beginPath(); c.moveTo(Xh - rx * .4, Y + ry * .9); c.bezierCurveTo(Xh - rx * .2, Y + ry * 1.9, Xh + rx * .5, Y + ry * 2.05, Xh + rx * .8, Y + ry * .9); c.closePath(); c.fill(); ink(c, 2.6); c.strokeStyle = sh(bc, -.25); c.lineWidth = 1.6; for (const k of [0, 1, 2]) { c.beginPath(); c.moveTo(Xh + rx * (0 + k * .25), Y + ry * 1.1); c.lineTo(Xh + rx * (.05 + k * .22), Y + ry * 1.6); c.stroke(); } }
      if (X.clip) { c.fillStyle = '#6a4a2a'; c.beginPath(); c.roundRect(fx + 12, fy + 9, 16, 9, 3); c.fill(); ink(c, 1.8); }
      if (X.pipe) { c.save(); c.translate(mx + 8, my + 2); GM.pipe(c, 0, 0, .9); c.restore(); }
      // ---- headwear
      const H = X.head, hc = X.hcol || '#f6f4ee';
      const cloth = (path, col, check, rule) => { path(); c.fillStyle = col; c.fill(rule || 'nonzero'); if (check) { c.save(); path(); c.clip(rule || 'nonzero'); c.strokeStyle = check; c.lineWidth = 3; c.globalAlpha = .75; for (let k = -12; k < 12; k++) { c.beginPath(); c.moveTo(Xh + k * 12, Y - ry * 1.6); c.lineTo(Xh + k * 12 + 40, Y + ry * 2.2); c.moveTo(Xh + k * 12 + 40, Y - ry * 1.6); c.lineTo(Xh + k * 12, Y + ry * 2.2); c.stroke(); } c.restore(); } path(); ink(c, 3); };
      if (H === 'ghutra') { const ck = X.check ? (X.check === true ? '#c8302a' : X.check) : null;
        cloth(() => { c.beginPath(); c.moveTo(Xh - rx * .3, Y - ry * .5); c.bezierCurveTo(Xh - rx * 1.25, Y - ry * .6, Xh - rx * 1.3, Y + ry * .9, Xh - rx * 1.42, Y + ry * 1.85); c.quadraticCurveTo(Xh - rx * .9, Y + ry * 2.0, Xh - rx * .32, Y + ry * 1.7); c.quadraticCurveTo(Xh - rx * .5, Y + ry * .9, Xh - rx * .34, Y + ry * .2); c.closePath(); }, hc, ck);
        cloth(() => { c.beginPath(); c.moveTo(Xh + rx * .98, Y - ry * .35); c.quadraticCurveTo(Xh + rx * 1.22, Y + ry * .5, Xh + rx * 1.06, Y + ry * 1.45); c.lineTo(Xh + rx * .8, Y + ry * 1.38); c.quadraticCurveTo(Xh + rx * 1.0, Y + ry * .5, Xh + rx * .86, Y - ry * .2); c.closePath(); }, sh(hc, -.06), ck);
        cloth(() => { c.beginPath(); c.moveTo(Xh - rx * 1.14, Y + ry * .1); c.bezierCurveTo(Xh - rx * 1.2, Y - ry * 1.42, Xh + rx * 1.18, Y - ry * 1.42, Xh + rx * 1.1, Y - ry * .26); c.quadraticCurveTo(Xh + rx * .3, Y - ry * .58, Xh - rx * .32, Y - ry * .4); c.quadraticCurveTo(Xh - rx * .6, Y - ry * .3, Xh - rx * 1.14, Y + ry * .1); c.closePath(); }, hc, ck);
        c.save(); c.beginPath(); c.moveTo(Xh - rx * 1.14, Y + ry * .1); c.bezierCurveTo(Xh - rx * 1.2, Y - ry * 1.42, Xh + rx * 1.18, Y - ry * 1.42, Xh + rx * 1.1, Y - ry * .26); c.lineTo(Xh + rx * 1.1, Y + ry); c.lineTo(Xh - rx * 1.2, Y + ry); c.clip(); c.fillStyle = 'rgba(0,0,0,.08)'; c.beginPath(); c.ellipse(Xh - rx * .7, Y - ry * .5, rx * .4, ry * .7, 0, 0, 7); c.fill(); c.restore();
        if (X.agal !== false) for (const d of [0, 10]) { c.beginPath(); c.ellipse(Xh + rx * .02, Y - ry * .7 - d, rx * 1.1, ry * .2, -.06, -.15, Math.PI + .15); c.strokeStyle = INK; c.lineWidth = 9; c.stroke(); c.strokeStyle = '#242226'; c.lineWidth = 5.5; c.stroke(); } }
      else if (H === 'shayla') { cloth(() => { c.beginPath(); c.moveTo(Xh + rx * 1.12, Y - ry * .2); c.bezierCurveTo(Xh + rx * 1.1, Y - ry * 1.42, Xh - rx * 1.25, Y - ry * 1.45, Xh - rx * 1.25, Y + ry * .1); c.bezierCurveTo(Xh - rx * 1.3, Y + ry * 1.1, Xh - rx * 1.2, Y + ry * 1.75, Xh - rx * .6, Y + ry * 2.05); c.quadraticCurveTo(Xh + rx * .4, Y + ry * 2.0, Xh + rx * .75, Y + ry * 1.45); c.quadraticCurveTo(Xh + rx * 1.15, Y + ry * .8, Xh + rx * 1.12, Y - ry * .2); c.closePath(); c.ellipse(Xh + rx * .33, Y + ry * .24, rx * .7, ry * .8, 0, 0, 7); }, hc, null, 'evenodd');
        c.strokeStyle = sh(hc, .25); c.lineWidth = 2; c.beginPath(); c.moveTo(Xh - rx * 1.05, Y - ry * .3); c.quadraticCurveTo(Xh - rx * .9, Y + ry, Xh - rx * .5, Y + ry * 1.8); c.stroke(); }
      else if (H === 'massar' || H === 'turban' || H === 'wrap') { const c2 = X.hcol2 || sh(hc, -.25), c3 = X.hcol3 || c2;
        const dome = () => { c.beginPath(); c.moveTo(Xh - rx * 1.13, Y - ry * .18); c.bezierCurveTo(Xh - rx * 1.25, Y - (H === 'wrap' ? 1.3 : 1.6) * ry, Xh + rx * 1.25, Y - (H === 'wrap' ? 1.3 : 1.6) * ry, Xh + rx * 1.14, Y - ry * .32); c.quadraticCurveTo(Xh + rx * .2, Y - ry * .6, Xh - rx * 1.13, Y - ry * .18); c.closePath(); };
        if (H !== 'turban') cloth(() => { c.beginPath(); c.moveTo(Xh - rx * .95, Y - ry * .4); c.quadraticCurveTo(Xh - rx * 1.5, Y + ry * .2, Xh - rx * 1.4, Y + ry * (H === 'wrap' ? 1.2 : .7)); c.lineTo(Xh - rx * 1.08, Y + ry * .5); c.quadraticCurveTo(Xh - rx * 1.1, Y, Xh - rx * .7, Y - ry * .3); c.closePath(); }, c2);
        dome(); c.fillStyle = hc; c.fill(); c.save(); dome(); c.clip();
        for (let k = 0; k < 7; k++) { const yy = Y - ry * .3 - k * ry * .19; c.strokeStyle = H === 'massar' ? [c2, c3, sh(hc, .3)][k % 3] : sh(hc, -.2); c.lineWidth = H === 'massar' ? 7 : 2.2; c.beginPath(); c.moveTo(Xh - rx * 1.3, yy + 14); c.quadraticCurveTo(Xh, yy - 10 - k * 2, Xh + rx * 1.3, yy + 4); c.stroke(); }
        c.fillStyle = 'rgba(0,0,0,.1)'; c.beginPath(); c.ellipse(Xh - rx * .8, Y - ry * .6, rx * .4, ry * .8, 0, 0, 7); c.fill(); c.restore(); dome(); ink(c, 3); }
      else if (H === 'bicorne') { c.fillStyle = '#16161c'; c.beginPath(); c.moveTo(Xh - rx * 1.45, Y - ry * .55); c.quadraticCurveTo(Xh, Y - ry * 2.0, Xh + rx * 1.45, Y - ry * .6); c.quadraticCurveTo(Xh, Y - ry * .85, Xh - rx * 1.45, Y - ry * .55); c.fill(); ink(c, 3);
        c.strokeStyle = GOLD; c.lineWidth = 3; c.beginPath(); c.moveTo(Xh - rx * 1.3, Y - ry * .62); c.quadraticCurveTo(Xh, Y - ry * .9, Xh + rx * 1.3, Y - ry * .66); c.stroke(); c.fillStyle = GOLD; c.beginPath(); c.arc(Xh + rx * .35, Y - ry * 1.05, 8, 0, 7); c.fill(); ink(c, 2); }
      else if (H === 'beret') { const col = X.hcol || '#7a1e2a'; c.fillStyle = col; c.beginPath(); c.ellipse(Xh - rx * .05, Y - ry * .78, rx * 1.12, ry * .42, -.18, 0, 7); c.fill(); ink(c, 3); c.fillStyle = sh(col, -.3); c.beginPath(); c.moveTo(Xh - rx * 1.0, Y - ry * .45); c.quadraticCurveTo(Xh, Y - ry * .7, Xh + rx * 1.0, Y - ry * .6); c.lineTo(Xh + rx * .98, Y - ry * .48); c.quadraticCurveTo(Xh, Y - ry * .55, Xh - rx * .98, Y - ry * .32); c.closePath(); c.fill(); ink(c, 2.2); if (X.badge !== false) { c.fillStyle = GOLD; c.beginPath(); c.arc(Xh + rx * .5, Y - ry * .78, 6, 0, 7); c.fill(); ink(c, 1.6); } }
      else if (H === 'peak' || H === 'hardhat') { const col = X.hcol || (H === 'hardhat' ? '#f2c230' : '#5a6a3a');
        c.fillStyle = col; c.beginPath(); c.moveTo(Xh - rx * 1.08, Y - ry * .3); c.bezierCurveTo(Xh - rx * 1.1, Y - ry * (H === 'hardhat' ? 1.5 : 1.35), Xh + rx * 1.08, Y - ry * (H === 'hardhat' ? 1.5 : 1.35), Xh + rx * 1.06, Y - ry * .36); c.closePath(); c.fill(); ink(c, 3);
        c.fillStyle = H === 'hardhat' ? col : sh(col, -.25); c.beginPath(); if (H === 'hardhat') c.roundRect(Xh - rx * 1.2, Y - ry * .42, rx * 2.45, 11, 5); else { c.moveTo(Xh + rx * .3, Y - ry * .38); c.quadraticCurveTo(Xh + rx * 1.3, Y - ry * .5, Xh + rx * 1.55, Y - ry * .22); c.quadraticCurveTo(Xh + rx * 1.1, Y - ry * .18, Xh + rx * .3, Y - ry * .3); } c.fill(); ink(c, 2.6);
        c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.ellipse(Xh - rx * .3, Y - ry * 1.0, rx * .35, ry * .1, -.3, 0, 7); c.fill();
        if (H === 'hardhat') { c.strokeStyle = sh(col, -.25); c.lineWidth = 5; c.beginPath(); c.moveTo(Xh - rx * .05, Y - ry * 1.27); c.lineTo(Xh + rx * .05, Y - ry * .45); c.stroke(); } }
      c.restore(); if (userHat) userHat(c, hx, hy); };
    return F0(ctx, o2); };

  // ---- cast
  const GSK = ['#d6a47c', '#c4906a', '#e2b690', '#b47c56', '#a86e4a', '#dcae86'];
  const SASK = ['#8a5a3a', '#9e6844', '#74482e', '#a8724c', '#6a4028'];
  const robeLook = (o) => ({ hair: 'bald', top: 'shirt', topCol: o.robe, sleeveCol: o.sleeve || o.robe, bareLegs: true, legs: o.skin, shoes: null, tie: null, belt: null, inner: o.robe, glasses: !!o.glasses });
  GM.SHEIKH = (k = 0, o = {}) => { const age = k % 3, skin = o.skin || GSK[k % 6], old = !!o.old;
    const bc = o.beardCol || ['#d8d4cc', '#1c1614', '#2a1e16'][age], robe = o.robe || (old ? ['#d8c8a2', '#cbb994', '#e0d2b0'][k % 3] : ['#f6f5f0', '#f2ecdc', '#f8f8f6'][k % 3]);
    const check = o.check ?? (old ? '#8a5a3a' : (k % 2 === 1)), bisht = o.bisht ?? (old && age === 0 ? '#6a4a2e' : null);
    return look('banker', { ...robeLook({ robe, skin, glasses: o.glasses, sleeve: bisht || robe }), skin, hairCol: bc, streak: bc, beard: age === 0 ? 'grey' : age === 1, seed: 400 + k },
      { robe, head: 'ghutra', hcol: old ? '#ece2c8' : '#fbfbf8', check, agal: o.agal ?? true, bisht, trim: o.trim || (old ? '#c8a050' : GOLD), beard: age === 2 ? 'short' : null, beardCol: bc, tash: age === 0 ? '#d8d4cc' : bc }); };
  GM.ROYAL = (k = 0) => GM.SHEIKH(k, { bisht: ['#2a2018', '#1a1816', '#3a2a1a'][k % 3], trim: GOLD, check: k === 1 ? true : false });
  GM.SULTAN = (old = true, o = {}) => { const skin = o.skin || '#c8946c', bc = old ? '#d8d4cc' : '#1c1614';
    const gm = { head: 'massar', hcol: '#7a3a8a', hcol2: '#e8b830', hcol3: '#c8302a', khanjar: !o.uniform, beard: old ? null : 'short', beardCol: bc, tash: bc };
    if (o.uniform) return look('banker', { hair: 'bald', skin, hairCol: bc, top: 'jacket', topCol: '#4a5a34', inner: '#d8d0b0', tie: '#3a4426', legs: '#4a5a34', shoes: '#141414', sole: '#222', beard: false, seed: 420 }, { ...gm, buttons: true, epaulettes: true });
    return look('banker', { ...robeLook({ robe: '#f8f8f4', skin }), skin, hairCol: bc, beard: old ? 'grey' : false, seed: 421 + (old ? 1 : 0) }, { ...gm, robe: '#f8f8f4' }); };
  GM.CLERIC = (k = 0) => { const skin = GSK[(k + 2) % 6], bc = k % 2 ? '#d8d4cc' : '#1c1614', robe = ['#ece6d6', '#d8d0bc'][k % 2];
    return look('banker', { ...robeLook({ robe, skin, sleeve: '#2a2420' }), skin, hairCol: bc, beard: k % 2 ? 'grey' : true, glasses: k % 3 === 2, seed: 430 + k }, { robe, head: 'ghutra', hcol: '#fbfbf8', agal: false, bisht: '#2a2420', trim: '#8a7a5a', beard: 'long', beardCol: k % 2 ? '#d8d4cc' : bc, tash: k % 2 ? '#d8d4cc' : bc }); };
  GM.DIVER = (k = 0, o = {}) => { const skin = ['#a86e4a', '#8a5a3a', '#b47c56', '#7a4e32'][k % 4];
    return look('hunter', { hair: ['spiky', 'bald', 'messy'][k % 3], hairCol: '#1c1614', streak: '#3a2a22', skin, beard: false, top: 'tee', topCol: skin, inner: skin, bareArms: true, bareLegs: true, legs: skin, shoes: null, seed: 440 + k },
      { izar: ['#e8e0cc', '#8a6a4a', '#5a7a8a', '#c8b48a'][k % 4], clip: o.clip ?? (k % 2 === 0), tash: k % 2 ? '#1c1614' : null, head: k % 3 === 1 ? 'wrap' : null, hcol: '#e8e0cc', scale: .95 }); };
  GM.CAPTAIN = () => look('banker', { ...robeLook({ robe: '#d8ccb0', skin: '#b47c56', sleeve: '#d8ccb0' }), skin: '#b47c56', hairCol: '#1c1614', beard: true, seed: 450 }, { robe: '#d8ccb0', head: 'turban', hcol: '#f2ecdc', tash: '#1c1614', belt: '#6a4a2a', khanjar: false });
  GM.OFFICER = (era = '1820', o = {}) => { const skin = o.skin || '#f2c8a6';
    if (era === '1820') return look('banker', { hair: 'neat', hairCol: '#6a4a32', streak: '#8a6a4a', skin, top: 'jacket', topCol: '#1e2a50', inner: '#f4f2ea', tie: null, legs: '#eeeae0', cuff: '#e0dccf', shoes: '#141414', sole: '#2a2a2a', seed: 460 }, { head: 'bicorne', buttons: true, epaulettes: true, tash: o.tash ?? null });
    const kh = '#c8b48a'; return look('banker', { hair: 'neat', hairCol: '#8a6a4a', streak: '#a88a6a', skin, top: 'shirt', topCol: kh, sleeveCol: kh, tie: null, legs: o.shorts ? skin : '#b8a47a', bareLegs: !!o.shorts, shoes: '#3a2a1a', sole: '#2a2018', belt: '#5a4430', seed: 461 },
      { head: o.cap ? 'peak' : 'beret', hcol: o.cap ? '#c8b48a' : '#4a5a3a', tash: '#7a5a3a', izar: o.shorts ? '#b8a47a' : null, belt: '#5a4430' }); };
  GM.PM = (o = {}) => look('banker', { hair: 'neat', hairCol: '#b8b2aa', streak: '#dcd6ce', skin: '#f0c6a4', top: 'jacket', topCol: '#62666e', inner: '#eef0f4', tie: '#2a2e3a', legs: '#62666e', shoes: '#141414', sole: '#2a2a2a', seed: 470 }, { pipe: !!o.pipe });
  GM.SOLDIER = (k = 0) => { const ol = ['#5a6a3a', '#66704a', '#4e5a36'][k % 3], skin = GSK[(k + 1) % 6];
    return look('banker', { hair: 'bald', hairCol: '#1c1614', skin, top: 'shirt', topCol: ol, sleeveCol: ol, tie: null, legs: ol, cuff: sh(ol, -.2), shoes: '#1a1a1a', sole: '#2a2a2a', seed: 480 + k }, { head: k % 2 ? 'beret' : 'peak', hcol: k % 2 ? '#7a2a2a' : ol, belt: '#3a3020', tash: k % 3 !== 2 ? '#1c1614' : null }); };
  GM.GENERAL = () => look('banker', { hair: 'bald', hairCol: '#b8b2aa', skin: '#f0c6a4', top: 'shirt', topCol: '#c8b088', sleeveCol: '#c0a880', tie: null, legs: '#c0a880', cuff: '#a8946c', shoes: '#8a6a44', sole: '#5a4430', seed: 490 }, { head: 'peak', hcol: '#c0a880', camo: ['#9a8058', '#7a6a4a', '#d8c8a0'], belt: '#7a6040' });
  GM.GUARD = (k = 0) => look('banker', { hair: 'bald', hairCol: '#1c1614', skin: GSK[(k + 3) % 6], top: 'shirt', topCol: '#22262e', sleeveCol: '#22262e', tie: null, legs: '#22262e', cuff: '#1a1c22', shoes: '#0e0e0e', sole: '#222', seed: 495 + k }, { head: 'beret', hcol: '#7a1e2a', belt: '#141414', tash: '#1c1614' });
  GM.LABOURER = (k = 0) => { const col = ['#2f5fa8', '#e8742a', '#3a6ab8', '#d8602a'][k % 4];
    return look('banker', { hair: 'bald', hairCol: '#1c1614', skin: SASK[k % 5], top: 'shirt', topCol: col, sleeveCol: col, tie: null, legs: col, cuff: sh(col, -.2), shoes: '#3a2a1a', sole: '#2a2018', seed: 500 + k }, { head: 'hardhat', hcol: k % 3 === 2 ? '#f4f4f0' : '#f2c230', belt: sh(col, -.35), tash: k % 2 ? '#1c1614' : null }); };
  GM.BOSS = (suit = false) => suit ? look('banker', { hair: 'neat', hairCol: '#1c1614', skin: '#d6a47c', top: 'jacket', topCol: '#1e2433', inner: '#eef0f6', tie: '#8a6a2a', legs: '#1e2433', glasses: true, seed: 510 }, { beard: 'short', beardCol: '#1c1614', tash: '#1c1614' })
    : look('banker', { ...robeLook({ robe: '#fbfbf8', skin: '#d6a47c', glasses: true }), skin: '#d6a47c', hairCol: '#1c1614', seed: 511 }, { robe: '#fbfbf8', head: 'ghutra', hcol: '#fbfbf8', beard: 'short', beardCol: '#1c1614', tash: '#1c1614' });
  GM.CITIZEN = (k = 0) => { const skin = GSK[(k * 2 + 1) % 6];
    if (k % 2) { const ab = '#1a181e'; return look('woman', { ...robeLook({ robe: ab, skin }), skin, hairCol: '#1a1412', lashes: true, seed: 520 + k }, { robe: ab, head: 'shayla', hcol: ['#1a181e', '#3a2a3a', '#1a181e', '#2a2a3a'][(k >> 1) % 4] }); }
    return look('banker', { ...robeLook({ robe: '#fbfbf8', skin }), skin, hairCol: '#1c1614', seed: 520 + k }, { robe: '#fbfbf8', head: 'ghutra', hcol: '#fbfbf8', check: k % 4 === 2, beard: 'short', beardCol: '#1c1614', tash: '#1c1614' }); };
  GM.CLERK = (k = 0) => { const skin = GSK[(k + 4) % 6]; return look('banker', { ...robeLook({ robe: '#f6f6f2', skin, glasses: k % 2 === 1 }), skin, hairCol: '#1c1614', seed: 530 + k }, { robe: '#f6f6f2', head: 'ghutra', hcol: '#fbfbf8', check: k % 3 === 2, beard: k % 2 ? 'short' : null, beardCol: '#1c1614', tash: '#1c1614' }); };
  GM.PROTESTER = (k = 0) => { const skin = [...GSK, ...SASK][(k * 3) % 11];
    if (k % 3 === 1) return look('woman', { hair: 'bald', skin, hairCol: '#1a1412', top: 'cardigan', topCol: ['#5a3a6a', '#2a5a6a', '#7a3a2a'][k % 3], inner: '#e8e2d6', legs: '#2a3a5a', shoes: '#3a2a20', sole: '#e8e4dc', lashes: true, seed: 540 + k }, { head: 'shayla', hcol: ['#c8a8b8', '#3a4a6a', '#e8dcc8', '#6a2a3a'][k % 4] });
    return look('teen', { hair: ['spiky', 'neat', 'messy'][k % 3], hairCol: '#1c1614', streak: '#3a2a22', skin, top: k % 2 ? 'tee' : 'hoodie', topCol: ['#3a6a4a', '#c8462e', '#2a4a7a', '#7a6a4a', '#5a5a62'][k % 5], inner: '#e8e8e2', bareArms: k % 2 === 1, legs: '#3a4a66', seed: 540 + k }, { tash: k % 4 === 0 ? '#1c1614' : null }); };
  GM.REBEL = () => look('banker', { hair: 'bald', hairCol: '#1c1614', skin: '#a86e4a', top: 'shirt', topCol: '#a8946a', sleeveCol: '#a8946a', tie: null, legs: '#8a7a56', cuff: '#7a6a48', shoes: '#4a3424', sole: '#2a2018', beard: true, seed: 550 }, { head: 'wrap', hcol: '#8a7a5a', hcol2: '#6a5a40', belt: '#4a3a24', tash: '#1c1614' });

  // ---- props
  GM.crown = (c, x, y, s = 1, rot = 0, glint = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
    c.fillStyle = GOLD; c.beginPath(); c.moveTo(-32, 0); c.lineTo(-36, -40); c.lineTo(-18, -22); c.lineTo(0, -48); c.lineTo(18, -22); c.lineTo(36, -40); c.lineTo(32, 0); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = GOLD_D; c.beginPath(); c.roundRect(-33, -12, 66, 12, 3); c.fill(); ink(c, 2.4);
    c.fillStyle = 'rgba(255,250,220,.55)'; c.beginPath(); c.moveTo(-28, -16); c.lineTo(-31, -34); c.lineTo(-22, -24); c.closePath(); c.fill();
    for (const [jx, jy, col] of [[-36, -42, '#d83a3a'], [0, -50, '#3a8ad8'], [36, -42, '#d83a3a'], [0, -6, '#2aa86a']]) { c.fillStyle = col; c.beginPath(); c.arc(jx, jy, 5, 0, 7); c.fill(); ink(c, 1.8); }
    if (glint > 0) TW.glow(c, 20, -30, 40 * glint, '255,240,180', .7 * glint); c.restore(); };
  GM.crowns = (c, x, y, s = 1, st = [0, 0, 0, 0, 0, 0], t = 0) => { c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(14,12,20,.8)'; rr(c, 0, 0, 300, 96, 14); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); c.strokeStyle = 'rgba(226,178,58,.6)'; c.lineWidth = 1.5; rr(c, 4, 4, 292, 88, 11); c.stroke();
    TW.txt(c, 'CROWNS STANDING', 14, 17, 16, '#f2d06a', 'left', 'Oswald'); const n = st.filter(v => v < 2).length; TW.txt(c, n + '/6', 286, 17, 20, n === 6 ? '#8ae08a' : '#ff8a6a', 'right', 'Anton');
    ['SA', 'KW', 'BH', 'QA', 'AE', 'OM'].forEach((lab, i) => { const v = st[i] || 0, cx = 30 + i * 48, fell = v >= 2, rot = fell ? 1.35 : Math.sin(t * 13 + i * 1.7) * .32 * v;
      if (fell) c.globalAlpha = .55; GM.crown(c, cx + (fell ? 10 : 0), 66, .42, rot, 0); c.globalAlpha = 1; TW.txt(c, lab, cx, 82, 13, fell ? '#8a8a90' : '#f4f1ea', 'center', 'Oswald'); });
    c.restore(); };
  GM.pearl = (c, x, y, s = 1, glint = 0) => { c.save(); c.translate(x, y); c.scale(s, s); if (glint > 0) TW.glow(c, 0, 0, 50, '255,245,235', .5 * glint);
    const g = c.createRadialGradient(-5, -6, 1, 0, 0, 16); g.addColorStop(0, '#ffffff'); g.addColorStop(.5, '#f4ece6'); g.addColorStop(1, '#cbbcc6'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 14, 0, 7); c.fill(); c.beginPath(); c.arc(0, 0, 14, 0, 7); ink(c, 2.6);
    c.fillStyle = 'rgba(255,255,255,.95)'; c.beginPath(); c.ellipse(-5, -6, 4, 2.6, -.6, 0, 7); c.fill(); if (glint > 0) TW.sparkle(c, 0, 0, glint * 3, .3); c.restore(); };
  GM.dhow = (c, x, y, s = 1, t = 0) => { const bob = Math.sin(t * 1.6) * 5, rk = Math.sin(t * 1.2) * .03; c.save(); c.translate(x, y + bob); c.rotate(rk); c.scale(s, s);
    c.fillStyle = 'rgba(20,40,60,.25)'; c.beginPath(); c.ellipse(0, 6, 210, 12, 0, 0, 7); c.fill();
    c.fillStyle = '#4a3020'; c.fillRect(-6, -330, 10, 300); c.beginPath(); c.rect(-6, -330, 10, 300); ink(c, 2.4);
    c.fillStyle = '#f2e8d0'; c.beginPath(); c.moveTo(-150, -120); c.lineTo(90, -350); c.quadraticCurveTo(110, -170, 150, -60); c.quadraticCurveTo(10, -80, -150, -120); c.closePath(); c.fill(); ink(c, 3);
    c.strokeStyle = 'rgba(120,90,60,.35)'; c.lineWidth = 2; for (const k of [.3, .55, .8]) { c.beginPath(); c.moveTo(-150 + 240 * k, -120 - 230 * k); c.lineTo(-150 + 300 * k, -110 + 50 * k); c.stroke(); }
    c.strokeStyle = '#5a3a22'; c.lineWidth = 6; c.beginPath(); c.moveTo(-160, -112); c.lineTo(100, -362); c.stroke();
    c.fillStyle = '#8a5a32'; c.beginPath(); c.moveTo(-210, -60); c.quadraticCurveTo(-150, -46, -120, -40); c.lineTo(160, -40); c.lineTo(200, -84); c.lineTo(220, -84); c.quadraticCurveTo(190, 4, 120, 6); c.lineTo(-120, 6); c.quadraticCurveTo(-180, 0, -210, -60); c.closePath(); c.fill(); ink(c, 3);
    c.strokeStyle = '#5a3a20'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-170, -30); c.lineTo(190, -30); c.moveTo(-140, -14); c.lineTo(170, -14); c.stroke(); c.fillStyle = '#c89a5a'; c.fillRect(-120, -46, 280, 7);
    c.fillStyle = 'rgba(255,255,255,.7)'; for (let k = 0; k < 6; k++) { const wx = -200 + k * 80 + ((t * 30) % 80); c.beginPath(); c.ellipse(wx, 8, 22, 3, 0, 0, 7); c.fill(); } c.restore(); };
  const wheel = (c, x, y, r, ang, col = '#3a3a34') => { c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = col; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); ink(c, 2.6); c.fillStyle = sh(col, .3); c.beginPath(); c.arc(0, 0, r * .45, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 2; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(k * Math.PI / 2) * r * .8, Math.sin(k * Math.PI / 2) * r * .8); c.stroke(); } c.restore(); };
  GM.tank = (c, x, y, s = 1, t = 0, facing = 1) => { c.save(); shadow(c, x, y, 220 * s, .4); c.translate(x, y); c.scale(s * facing, s); const ol = '#5e6a3a', ang = t * 4;
    c.fillStyle = '#2a2a26'; c.beginPath(); c.roundRect(-170, -62, 340, 62, 31); c.fill(); ink(c, 3);
    c.save(); c.beginPath(); c.roundRect(-170, -62, 340, 62, 31); c.clip(); c.strokeStyle = '#4a4a42'; c.lineWidth = 4; const off = (t * 4 * 26) % 18; for (let k = -2; k < 22; k++) { c.beginPath(); c.moveTo(-170 + k * 18 - off, -62); c.lineTo(-170 + k * 18 - off, -54); c.moveTo(-170 + k * 18 + off, 0); c.lineTo(-170 + k * 18 + off, -8); c.stroke(); } c.restore();
    for (let k = 0; k < 6; k++) wheel(c, -128 + k * 51, -28, 20, ang, '#4a4a40');
    c.fillStyle = ol; c.beginPath(); c.moveTo(-180, -62); c.lineTo(-160, -104); c.lineTo(170, -104); c.lineTo(196, -62); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(ol, -.15); c.beginPath(); c.moveTo(-90, -104); c.lineTo(-70, -150); c.lineTo(60, -150); c.lineTo(90, -104); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(ol, -.25); c.beginPath(); c.roundRect(80, -136, 190, 14, 5); c.fill(); ink(c, 2.6); c.beginPath(); c.roundRect(262, -140, 22, 22, 4); c.fill(); ink(c, 2.4);
    c.fillStyle = sh(ol, .15); c.beginPath(); c.roundRect(-40, -170, 50, 22, 8); c.fill(); ink(c, 2.4); c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-150, -98, 310, 8); c.restore(); };
  GM.apc = GM.truck = (c, x, y, s = 1, t = 0, facing = 1) => { c.save(); shadow(c, x, y, 200 * s, .4); c.translate(x, y); c.scale(s * facing, s); const col = '#6a6a4a', ang = t * 5;
    c.fillStyle = col; c.beginPath(); c.moveTo(-170, -40); c.lineTo(-170, -130); c.lineTo(80, -130); c.lineTo(150, -90); c.lineTo(175, -40); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(col, -.2); c.fillRect(-170, -60, 345, 20); c.fillStyle = '#2a3440'; c.beginPath(); c.moveTo(88, -122); c.lineTo(140, -94); c.lineTo(100, -94); c.closePath(); c.fill(); ink(c, 2.2);
    c.fillStyle = sh(col, .12); c.beginPath(); c.roundRect(-110, -160, 70, 30, 6); c.fill(); ink(c, 2.6); c.fillStyle = sh(col, -.3); c.beginPath(); c.roundRect(-44, -152, 70, 9, 4); c.fill(); ink(c, 2);
    c.strokeStyle = sh(col, -.35); c.lineWidth = 2; for (const k of [-110, -40, 30]) { c.beginPath(); c.moveTo(k, -126); c.lineTo(k, -64); c.stroke(); }
    for (const wx of [-120, -30, 110]) wheel(c, wx, -30, 30, ang, '#26262a'); c.restore(); };
  GM.jet = (c, x, y, s = 1, rot = 0) => { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); const col = '#9aa2ac';
    c.fillStyle = 'rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(10, 30, 110, 22, 0, 0, 7); c.fill();
    c.fillStyle = sh(col, -.1); c.beginPath(); c.moveTo(10, 0); c.lineTo(-40, -78); c.lineTo(-62, -78); c.lineTo(-40, 0); c.lineTo(-62, 78); c.lineTo(-40, 78); c.closePath(); c.fill(); ink(c, 2.6);
    c.beginPath(); c.moveTo(-80, 0); c.lineTo(-104, -34); c.lineTo(-116, -34); c.lineTo(-104, 0); c.lineTo(-116, 34); c.lineTo(-104, 34); c.closePath(); c.fill(); ink(c, 2.4);
    c.fillStyle = col; c.beginPath(); c.moveTo(110, 0); c.quadraticCurveTo(70, -14, 0, -14); c.lineTo(-110, -10); c.lineTo(-110, 10); c.lineTo(0, 14); c.quadraticCurveTo(70, 14, 110, 0); c.closePath(); c.fill(); ink(c, 2.8);
    c.fillStyle = '#2a4a6a'; c.beginPath(); c.ellipse(50, 0, 20, 6, 0, 0, 7); c.fill(); ink(c, 2); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-90, -6, 150, 3); c.restore(); };
  GM.cargo = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 260 * s, .35); c.translate(x, y); c.scale(s, s); const col = '#8a929a';
    c.strokeStyle = INK; c.lineWidth = 5; for (const wx of [-60, 40]) { c.beginPath(); c.moveTo(wx, -40); c.lineTo(wx, -12); c.stroke(); } wheel(c, -60, -12, 12, 0, '#222'); wheel(c, 40, -12, 12, 0, '#222'); c.beginPath(); c.moveTo(190, -40); c.lineTo(190, -12); c.stroke(); wheel(c, 190, -12, 10, 0, '#222');
    c.fillStyle = col; c.beginPath(); c.moveTo(250, -70); c.quadraticCurveTo(250, -122, 200, -128); c.lineTo(-180, -128); c.lineTo(-260, -175); c.lineTo(-290, -175); c.lineTo(-262, -110); c.quadraticCurveTo(-240, -40, -160, -38); c.lineTo(200, -38); c.quadraticCurveTo(250, -40, 250, -70); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(col, -.12); c.beginPath(); c.moveTo(-250, -175); c.lineTo(-240, -240); c.lineTo(-210, -240); c.lineTo(-200, -128); c.closePath(); c.fill(); ink(c, 2.6); c.beginPath(); c.roundRect(-290, -246, 110, 12, 5); c.fill(); ink(c, 2.4);
    c.fillStyle = sh(col, -.2); c.beginPath(); c.moveTo(-40, -132); c.lineTo(110, -132); c.lineTo(60, -118); c.lineTo(-60, -118); c.closePath(); c.fill(); ink(c, 2.6);
    for (const ex of [-20, 70]) { c.fillStyle = sh(col, -.3); c.beginPath(); c.roundRect(ex - 22, -116, 48, 18, 8); c.fill(); ink(c, 2.2); }
    c.fillStyle = '#2a4a6a'; c.beginPath(); c.moveTo(210, -116); c.lineTo(238, -96); c.lineTo(214, -96); c.closePath(); c.fill(); ink(c, 2); c.fillStyle = '#2a3a4a'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(-120 + k * 38, -92, 4.5, 0, 7); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(-170, -122, 360, 8); c.restore(); };
  GM.streak = (c, x0, y0, x1, y1, p) => { const mx = (x0 + x1) / 2, my = Math.min(y0, y1) - Math.abs(x1 - x0) * .35 - 120, pt = u => [(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1];
    c.save(); c.lineCap = 'round'; if (p > 0) { const e = Math.min(1, p), b = Math.max(0, e - .4), fade = p > 1 ? Math.max(0, 1 - (p - 1) * 2) : 1, N = 24;
      for (let k = 0; k < N; k++) { const u0 = b + (e - b) * k / N, u1 = b + (e - b) * (k + 1) / N, [ax, ay] = pt(u0), [bx, by] = pt(u1), w = k / N; c.strokeStyle = `rgba(255,${200 + 40 * w | 0},${150 + 80 * w | 0},${(.15 + .7 * w) * fade})`; c.lineWidth = 2 + 6 * w; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); }
      if (p < 1) { const [hx, hy] = pt(e); TW.glow(c, hx, hy, 40, '255,220,150', .9); c.fillStyle = '#fffbe8'; c.beginPath(); c.arc(hx, hy, 6, 0, 7); c.fill(); } }
    if (p >= 1 && p < 1.6) { const q = (p - 1) / .6, a = 1 - q; TW.glow(c, x1, y1, 60 + 160 * q, '255,190,110', .95 * a); c.strokeStyle = `rgba(255,236,190,${a})`; c.lineWidth = 4; for (let k = 0; k < 10; k++) { const an = k * .628, r0 = 20 + 70 * q, r1 = 40 + 120 * q; c.beginPath(); c.moveTo(x1 + Math.cos(an) * r0, y1 + Math.sin(an) * r0); c.lineTo(x1 + Math.cos(an) * r1, y1 + Math.sin(an) * r1); c.stroke(); } c.fillStyle = `rgba(255,255,240,${a})`; c.beginPath(); c.arc(x1, y1, 22 * (1 - q * .5), 0, 7); c.fill(); }
    c.restore(); };
  GM.barrel = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 46 * s); c.translate(x, y); c.scale(s, s); const col = '#2a3a5a';
    c.fillStyle = col; c.beginPath(); c.moveTo(-34, -4); c.quadraticCurveTo(-40, -50, -34, -96); c.lineTo(34, -96); c.quadraticCurveTo(40, -50, 34, -4); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(col, -.2); c.fillRect(-36, -96, 18, 92); c.strokeStyle = INK; c.lineWidth = 3; for (const yy of [-34, -66]) { c.beginPath(); c.moveTo(-38, yy); c.lineTo(38, yy); c.stroke(); }
    c.fillStyle = sh(col, .2); c.beginPath(); c.ellipse(0, -96, 34, 8, 0, 0, 7); c.fill(); ink(c, 2.6); c.fillStyle = '#141418'; c.beginPath(); c.arc(14, -97, 4, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.2)'; c.fillRect(12, -90, 6, 80); c.restore(); };
  GM.chest = (c, x, y, s = 1, open = 0) => { c.save(); shadow(c, x, y, 80 * s); c.translate(x, y); c.scale(s, s); const wd = '#8a5a32';
    if (open) { TW.glow(c, 0, -70, 110, '255,220,120', .5 * open); c.fillStyle = sh(wd, -.25); c.beginPath(); c.moveTo(-70, -64); c.lineTo(-62, -64 - 60 * open); c.quadraticCurveTo(0, -84 - 70 * open, 62, -64 - 60 * open); c.lineTo(70, -64); c.closePath(); c.fill(); ink(c, 3); c.fillStyle = GOLD; c.beginPath(); c.moveTo(-64, -62); c.quadraticCurveTo(0, -96, 64, -62); c.closePath(); c.fill(); ink(c, 2.4); for (let k = 0; k < 9; k++) { c.fillStyle = k % 2 ? GOLD : '#f2d06a'; c.beginPath(); c.ellipse(-48 + k * 12, -66 - (k % 3) * 5, 8, 4, 0, 0, 7); c.fill(); ink(c, 1.4); } }
    c.fillStyle = wd; c.beginPath(); c.roundRect(-70, -64, 140, 64, 6); c.fill(); ink(c, 3); c.strokeStyle = sh(wd, -.35); c.lineWidth = 2; for (const yy of [-44, -22]) { c.beginPath(); c.moveTo(-66, yy); c.lineTo(66, yy); c.stroke(); }
    if (!open) { c.fillStyle = sh(wd, .08); c.beginPath(); c.moveTo(-72, -62); c.quadraticCurveTo(0, -112, 72, -62); c.closePath(); c.fill(); ink(c, 3); }
    c.fillStyle = GOLD_D; for (const bx of [-58, 50]) { c.fillRect(bx, open ? -64 : -94, 8, open ? 64 : 94); } c.fillStyle = GOLD; c.beginPath(); c.roundRect(-10, -70, 20, 22, 4); c.fill(); ink(c, 2.2); c.restore(); };
  GM.coins = (c, x, y, s = 1, n = 12, t = 0) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s);
    const pile = Math.min(60, 8 + n * 2); c.fillStyle = GOLD; c.beginPath(); c.moveTo(-pile, 0); c.quadraticCurveTo(0, -pile * .9, pile, 0); c.closePath(); c.fill(); ink(c, 2.6);
    for (let k = 0; k < Math.min(14, n); k++) { const a = k * 2.4, rr2 = Math.sqrt((k + 1) / 15) * pile * .7; c.fillStyle = k % 2 ? '#f2d06a' : GOLD; c.beginPath(); c.ellipse(Math.cos(a) * rr2, -Math.abs(Math.sin(a)) * rr2 * .45 - 6, 9, 4.5, 0, 0, 7); c.fill(); ink(c, 1.4); }
    for (let k = 0; k < n; k++) { const u = ((t * 1.3 + k / n) % 1), cy = -320 + u * (320 - pile * .4), cxp = Math.sin(k * 3.1) * 10, sp = t * 9 + k; c.save(); c.translate(cxp, cy); c.scale(Math.cos(sp), 1); c.fillStyle = Math.cos(sp) > 0 ? '#f2d06a' : GOLD_D; c.beginPath(); c.arc(0, 0, 10, 0, 7); c.fill(); c.lineWidth = 2; c.strokeStyle = INK; c.stroke(); c.restore(); }
    c.restore(); };
  GM.passport = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 40 * s); c.translate(x, y); c.scale(s, s); c.fillStyle = '#6a1e2a'; c.beginPath(); c.roundRect(-36, -100, 72, 100, 6); c.fill(); ink(c, 3);
    c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(-36, -100, 8, 100); c.strokeStyle = GOLD; c.lineWidth = 2.4; c.beginPath(); c.arc(4, -58, 16, 0, 7); c.stroke(); c.beginPath(); c.arc(4, -58, 8, 0, 7); c.stroke();
    TW.txt(c, 'PASSPORT', 4, -86, 12, GOLD, 'center', 'Oswald'); c.fillStyle = GOLD; c.fillRect(-14, -22, 36, 4); c.restore(); };
  GM.ballot = (c, x, y, s = 1, locked = false) => { c.save(); shadow(c, x, y, 70 * s); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#f2f0ea'; c.beginPath(); c.moveTo(-36, -120); c.lineTo(10, -134); c.lineTo(8, -96); c.lineTo(-30, -84); c.closePath(); c.fill(); ink(c, 2.4); c.strokeStyle = '#3a6ab8'; c.lineWidth = 3; c.beginPath(); c.moveTo(-20, -108); c.lineTo(-14, -100); c.lineTo(-2, -118); c.stroke();
    c.fillStyle = '#e8ecf2'; c.beginPath(); c.rect(-60, -100, 120, 100); c.fill(); ink(c, 3); c.fillStyle = sh('#e8ecf2', -.12); c.fillRect(-60, -100, 22, 100); c.fillStyle = '#d4dae4'; c.beginPath(); c.rect(-64, -108, 128, 12); c.fill(); ink(c, 2.6); c.fillStyle = INK; c.fillRect(-30, -104, 60, 4);
    c.fillStyle = '#3a6ab8'; c.fillRect(-40, -62, 80, 22); TW.txt(c, 'VOTE', 0, -51, 18, '#fff', 'center', 'Anton');
    if (locked) { c.strokeStyle = '#7a7e86'; c.lineWidth = 7; c.beginPath(); c.moveTo(-66, -100); c.lineTo(66, -14); c.moveTo(66, -100); c.lineTo(-66, -14); c.stroke(); c.strokeStyle = INK; c.lineWidth = 2; c.stroke(); c.strokeStyle = '#5a5e66'; c.lineWidth = 6; c.beginPath(); c.arc(0, -64, 13, Math.PI, 0); c.stroke(); c.fillStyle = '#c8a23a'; c.beginPath(); c.roundRect(-18, -64, 36, 30, 5); c.fill(); ink(c, 2.6); c.fillStyle = INK; c.beginPath(); c.arc(0, -52, 4, 0, 7); c.fill(); c.fillRect(-1.5, -52, 3, 9); }
    c.restore(); };
  GM.hourglass = (c, x, y, s = 1, level = .5) => { level = K.clamp(level); c.save(); shadow(c, x, y, 60 * s); c.translate(x, y); c.scale(s, s); const wd = '#7a5232';
    const glass = () => { c.beginPath(); c.moveTo(-40, -186); c.quadraticCurveTo(-40, -120, -6, -100); c.quadraticCurveTo(-40, -80, -40, -14); c.lineTo(40, -14); c.quadraticCurveTo(40, -80, 6, -100); c.quadraticCurveTo(40, -120, 40, -186); c.closePath(); };
    glass(); c.fillStyle = 'rgba(200,230,250,.35)'; c.fill(); c.save(); glass(); c.clip(); c.fillStyle = '#121216';
    const topH = 80 * level; c.fillRect(-50, -100 - topH, 100, topH); const botH = 80 * (1 - level); c.beginPath(); c.moveTo(-50, -14); c.lineTo(-50, -14 - botH * .7); c.quadraticCurveTo(0, -14 - botH * 1.25, 50, -14 - botH * .7); c.lineTo(50, -14); c.fill();
    if (level > 0 && level < 1) c.fillRect(-2, -100, 4, 86); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(-30, -176, 6, 50); c.restore(); glass(); ink(c, 3);
    for (const yy of [-200, -14]) { c.fillStyle = wd; c.beginPath(); c.roundRect(-54, yy, 108, 14, 5); c.fill(); ink(c, 2.6); } c.fillStyle = sh(wd, -.15); for (const px of [-48, 42]) { c.fillRect(px, -186, 6, 172); c.strokeStyle = INK; c.lineWidth = 2; c.strokeRect(px, -186, 6, 172); } c.restore(); };
  GM.scroll = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 120 * s); c.translate(x, y); c.scale(s, s); c.fillStyle = '#f2e6c8'; c.beginPath(); c.rect(-110, -150, 220, 140); c.fill(); ink(c, 3);
    c.strokeStyle = 'rgba(60,40,30,.5)'; c.lineWidth = 2.4; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(-88, -128 + k * 16); c.lineTo(k === 5 ? 20 : 88, -128 + k * 16); c.stroke(); }
    for (const yy of [-150, -10]) { c.fillStyle = '#d8c8a0'; c.beginPath(); c.roundRect(-122, yy - 10, 244, 20, 10); c.fill(); ink(c, 2.6); c.fillStyle = '#7a5232'; for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * 128, yy, 7, 0, 7); c.fill(); ink(c, 2); } }
    c.fillStyle = '#b8262a'; c.beginPath(); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, r = k % 2 ? 18 : 22; c.lineTo(70 + Math.cos(a) * r, -40 + Math.sin(a) * r); } c.closePath(); c.fill(); ink(c, 2.4); c.fillStyle = '#8a1a1e'; c.beginPath(); c.arc(70, -40, 10, 0, 7); c.fill();
    c.fillStyle = '#b8262a'; c.beginPath(); c.moveTo(62, -22); c.lineTo(56, 2); c.lineTo(66, -6); c.lineTo(72, 4); c.lineTo(76, -22); c.fill(); c.restore(); };
  GM.flag = (c, x, y, s = 1, col1 = '#c8302a', col2 = '#f4f4f0', t = 0) => { c.save(); shadow(c, x, y, 30 * s); c.translate(x, y); c.scale(s, s);
    c.fillStyle = '#8a8e96'; c.fillRect(-4, -300, 8, 300); c.strokeStyle = INK; c.lineWidth = 2.4; c.strokeRect(-4, -300, 8, 300); c.fillStyle = GOLD; c.beginPath(); c.arc(0, -304, 8, 0, 7); c.fill(); ink(c, 2);
    const W = 170, H = 110, N = 18, wave = (u) => Math.sin(t * 4 - u * 6) * 9 * u; for (const [col, a, b] of [[col1, 0, .5], [col2, .5, 1]]) { c.fillStyle = col; c.beginPath(); for (let k = 0; k <= N; k++) { const u = k / N; c.lineTo(4 + u * W, -292 + a * H + wave(u)); } for (let k = N; k >= 0; k--) { const u = k / N; c.lineTo(4 + u * W, -292 + b * H + wave(u)); } c.closePath(); c.fill(); }
    c.beginPath(); for (let k = 0; k <= N; k++) { const u = k / N; c.lineTo(4 + u * W, -292 + wave(u)); } for (let k = N; k >= 0; k--) { const u = k / N; c.lineTo(4 + u * W, -292 + H + wave(u)); } c.closePath(); ink(c, 3);
    c.fillStyle = 'rgba(0,0,0,.12)'; for (let k = 0; k < N; k++) { const u = k / N; if (Math.cos(t * 4 - u * 6) > .4) c.fillRect(4 + u * W, -292 + wave(u), W / N + 1, H); } c.restore(); };
  GM.dallah = (c, x, y, s = 1) => { c.save(); shadow(c, x, y, 40 * s); c.translate(x, y); c.scale(s, s); const br = '#d8a840';
    c.fillStyle = br; c.beginPath(); c.moveTo(-30, -60); c.bezierCurveTo(-60, -100, 30, -100, 54, -140); c.lineTo(62, -136); c.bezierCurveTo(44, -90, 40, -70, 24, -50); c.closePath(); c.fill(); ink(c, 2.6);
    c.strokeStyle = INK; c.lineWidth = 9; c.beginPath(); c.moveTo(-30, -96); c.bezierCurveTo(-74, -96, -70, -30, -34, -24); c.stroke(); c.strokeStyle = sh(br, -.2); c.lineWidth = 5; c.stroke();
    c.fillStyle = br; c.beginPath(); c.moveTo(-36, 0); c.bezierCurveTo(-46, -40, -20, -54, -14, -70); c.lineTo(-18, -100); c.lineTo(18, -100); c.lineTo(14, -70); c.bezierCurveTo(20, -54, 46, -40, 36, 0); c.closePath(); c.fill(); ink(c, 3);
    c.fillStyle = sh(br, -.2); c.fillRect(-36, -12, 72, 10); c.beginPath(); c.moveTo(-22, -100); c.quadraticCurveTo(0, -128, 22, -100); c.closePath(); c.fill(); ink(c, 2.4); c.fillStyle = br; c.beginPath(); c.arc(0, -130, 6, 0, 7); c.fill(); ink(c, 2);
    c.fillStyle = 'rgba(255,250,220,.55)'; c.beginPath(); c.ellipse(-16, -34, 5, 14, .3, 0, 7); c.fill(); c.restore(); };
  GM.suitcase = (c, x, y, s = 1, open = false) => { c.save(); shadow(c, x, y, 80 * s); c.translate(x, y); c.scale(s, s); const col = '#8a4a2a';
    if (open) { c.fillStyle = sh(col, -.2); c.beginPath(); c.roundRect(-80, -150, 160, 86, 10); c.fill(); ink(c, 3); c.fillStyle = '#c8bca8'; c.beginPath(); c.roundRect(-70, -140, 140, 70, 6); c.fill(); }
    c.fillStyle = col; c.beginPath(); c.roundRect(-80, -70, 160, 70, 10); c.fill(); ink(c, 3);
    if (open) { for (const [cx2, cl] of [[-40, '#3a6ab8'], [0, '#e8e2d6'], [40, '#c8462e']]) { c.fillStyle = cl; c.beginPath(); c.roundRect(cx2 - 22, -84, 44, 22, 6); c.fill(); ink(c, 2); } }
    else { c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(-22, -70); c.quadraticCurveTo(-22, -92, 0, -92); c.quadraticCurveTo(22, -92, 22, -70); c.stroke(); c.strokeStyle = '#3a2a1a'; c.lineWidth = 3; c.stroke(); }
    c.fillStyle = '#c8a050'; for (const bx of [-50, 42]) { c.beginPath(); c.roundRect(bx, -66, 8, 16, 2); c.fill(); ink(c, 1.6); } c.fillStyle = sh(col, -.2); for (const bx of [-30, 26]) c.fillRect(bx, -70, 4, 70); c.restore(); };
  GM.pipe = (c, x, y, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(14, 8, 24, 4); c.stroke(); c.strokeStyle = '#3a2418'; c.lineWidth = 3.2; c.stroke();
    c.fillStyle = '#6a3e22'; c.beginPath(); c.roundRect(20, -12, 16, 20, 4); c.fill(); ink(c, 2.2); c.fillStyle = '#2a1a10'; c.fillRect(22, -12, 12, 4); c.restore(); };
  GM.ntag = (c, x, y, text, a = 1, o = {}) => { a = K.clamp(a); if (a <= 0) return; const px = o.px ?? 34; c.save(); c.globalAlpha = Math.min(1, a * 1.4); c.translate(x, y); c.scale(.7 + .3 * a, .7 + .3 * a);
    c.font = `${px}px Anton`; const w = c.measureText(text).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.3)'; rr(c, -w / 2 + 4, -h / 2 + 5, w, h, h / 2); c.fill();
    c.fillStyle = o.bg || '#f4f1ea'; rr(c, -w / 2, -h / 2, w, h, h / 2); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); TW.txt(c, text, 0, 2, px, o.col || INK, 'center', 'Anton'); c.restore(); };
})(window);
