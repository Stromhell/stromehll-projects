// North Korea Next sets (Village Painterly): a launch pad at dawn, an intelligence wall, snowy Mount Paektu, an indoor
// basketball court, the Wonsan coast estate, a briefing room, a private study, a riding ring by the sea, a ski slope,
// a banquet hall, Kim Il Sung Square at night, a satellite launch site, a Beijing review stand, a portrait hall,
// a meeting room, a night office, a street with a poster and empty stalls, a summit room and a TV studio.
(function (G) {
  const S = G.S, VP = G.VP, TAU = Math.PI * 2;
  const { sky, ridge, grain, wood } = S.JPX;
  const { cloud } = S.MGX;
  const { plaster, floorboards, tiles, win, curtain, roofs, lamp } = S.ECX;
  const nkflag = (g, x, y, s) => { g.fillStyle = '#2a4aa8'; g.fillRect(x, y, 72 * s, 40 * s); g.fillStyle = '#f0f0f0'; g.fillRect(x, y + 8 * s, 72 * s, 24 * s); g.fillStyle = '#c8202a'; g.fillRect(x, y + 10 * s, 72 * s, 20 * s); g.fillStyle = '#f0f0f0'; g.beginPath(); g.arc(x + 24 * s, y + 20 * s, 8 * s, 0, TAU); g.fill(); g.fillStyle = '#c8202a'; g.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU - Math.PI / 2, r = (i % 2 ? 2.8 : 7) * s; g.lineTo(x + 24 * s + Math.cos(a) * r, y + 20 * s + Math.sin(a) * r); } g.fill(); };
  const pines = (g, n, y0, y1, seed, cols = ['#2a4a3a', '#1a3a2a', '#3a5a4a'], snow = 0) => { const r = S.rng(seed); for (let k = 0; k < n; k++) { const x = r() * 1280, y = y0 + r() * (y1 - y0), h = 30 + (y - y0) / (y1 - y0 + 1) * 50; g.fillStyle = cols[k % cols.length]; g.beginPath(); g.moveTo(x, y - h); g.lineTo(x - h * .35, y); g.lineTo(x + h * .35, y); g.fill(); if (snow) { g.fillStyle = S.rgba('#ffffff', .8); g.beginPath(); g.moveTo(x, y - h); g.lineTo(x - h * .12, y - h * .66); g.lineTo(x + h * .12, y - h * .66); g.fill(); } } };
  const chand = (g, x, y, s) => { g.strokeStyle = '#c8a040'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, y - 30 * s); g.stroke(); g.fillStyle = '#e8c860'; g.beginPath(); g.ellipse(x, y, 46 * s, 14 * s, 0, 0, TAU); g.fill(); for (let k = 0; k < 7; k++) { g.fillStyle = '#fff4d0'; g.beginPath(); g.arc(x - 40 * s + k * 13.3 * s, y + 10 * s, 4 * s, 0, TAU); g.fill(); } const gr = g.createRadialGradient(x, y, 4, x, y, 140 * s); gr.addColorStop(0, S.rgba('#fff0c0', .45)); gr.addColorStop(1, S.rgba('#fff0c0', 0)); g.fillStyle = gr; g.fillRect(x - 140 * s, y - 140 * s, 280 * s, 280 * s); };
  const frame = (g, x, y, w, h, col = '#c8a040') => { g.fillStyle = col; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.fillStyle = '#e8dcc0'; g.fillRect(x, y, w, h); };
  const redwall = (g, w, y1, seed) => { g.fillStyle = '#7a1a1e'; g.fillRect(0, 0, w, y1); S.dabs(g, { x: 0, y: 0, w, h: y1, n: 160, cols: ['#6a1418', '#8a2428'], r0: 10, r1: 30, a0: .2, a1: .4, seed }); for (let x = 60; x < w; x += 160) { g.fillStyle = S.rgba('#c8a040', .25); g.fillRect(x, 0, 6, y1); } };
  S.NKX = { nkflag, pines, chand, frame, redwall };

  // launch pad at dawn: pale hills, a concrete apron, floodlight masts
  VP.set('nk_pad', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#3a4a6a'], [.3, '#c89a8a'], [.5, '#f0c8a0'], [1, '#c8b090']]); cloud(g, 980, 120, 1.2, '#f8d8c0', 13001);
    ridge(g, w, h, 330, 40, 260, 13002, '#7a7a8a'); ridge(g, w, h, 380, 30, 220, 13003, '#5a6a5a'); pines(g, 40, 380, 440, 13004);
    g.fillStyle = '#9a968c'; g.fillRect(0, 460, w, 260); S.dabs(g, { x: 0, y: 460, w, h: 260, n: 300, cols: ['#8a867c', '#b0aca2', '#7a766c'], r0: 6, r1: 20, a0: .2, a1: .4, seed: 13005 });
    g.strokeStyle = S.rgba('#5a564c', .5); g.lineWidth = 2; for (let k = 0; k < 8; k++) { g.beginPath(); g.moveTo(k * 180, 460); g.lineTo(k * 220 - 300, 720); g.stroke(); }
    [120, 1160].forEach(x => { g.fillStyle = '#3a3a3a'; g.fillRect(x - 3, 220, 6, 250); g.fillStyle = '#e8e4d0'; g.fillRect(x - 20, 210, 40, 16); });
    grain(g, w, h, 13006, .05); });

  // an intelligence office wall: a corkboard with pinned files, a desk lamp glow
  VP.set('nk_intel', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 540, '#4a4e58', 13101); g.fillStyle = '#8a6a42'; g.fillRect(220, 70, 840, 420); g.fillStyle = '#b8905a'; g.fillRect(234, 84, 812, 392); S.dabs(g, { x: 234, y: 84, w: 812, h: 392, n: 200, cols: ['#a88050', '#c8a070', '#9a7444'], r0: 2, r1: 6, a0: .3, a1: .6, seed: 13102 });
    floorboards(g, 540, w, h, '#3a3430', 13103); grain(g, w, h, 13104, .05); });

  // snowy Mount Paektu: a jagged white peak, pines, a snowfield
  VP.set('nk_snow', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7a8aa8'], [.5, '#c8d0dc'], [1, '#e8ecf0']]);
    g.fillStyle = '#d8dce4'; g.beginPath(); g.moveTo(0, 420); g.lineTo(240, 260); g.lineTo(380, 200); g.lineTo(460, 230); g.lineTo(560, 150); g.lineTo(700, 170); g.lineTo(820, 140); g.lineTo(940, 210); g.lineTo(1080, 250); g.lineTo(1280, 360); g.lineTo(1280, 460); g.lineTo(0, 460); g.fill();
    g.fillStyle = '#8a8e98'; [[560, 150, 620, 260], [820, 140, 760, 280], [380, 200, 420, 300], [1080, 250, 1020, 330]].forEach(([x0, y0, x1, y1]) => { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.lineTo(x1 + 30, y1); g.closePath(); g.fill(); });
    pines(g, 60, 430, 500, 13201, ['#2a3a3a', '#1a2a2a', '#3a4a48'], 1);
    g.fillStyle = '#eef0f4'; g.fillRect(0, 490, w, 230); S.dabs(g, { x: 0, y: 490, w, h: 230, n: 200, cols: ['#dce0e8', '#ffffff', '#c8ccd8'], r0: 8, r1: 24, a0: .3, a1: .5, seed: 13202 });
    grain(g, w, h, 13203, .04); });

  // indoor basketball court: wood floor, red-and-white stands, a hoop
  VP.set('nk_court', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 300, '#c8c0b0', 13301); for (let r = 0; r < 5; r++) { g.fillStyle = r % 2 ? '#a82a2a' : '#c84a3a'; g.fillRect(0, 160 + r * 30, w, 28); for (let k = 0; k < 40; k++) { const rr = S.rng(13302 + r * 40 + k); g.fillStyle = ['#2a2a30', '#4a4a50', '#1a1a20'][k % 3]; g.beginPath(); g.arc(k * 33 + rr() * 10, 160 + r * 30 + 4, 7, 0, TAU); g.fill(); } }
    nkflag(g, 590, 40, 1.4);
    wood(g, 0, 310, w, 410, '#c8904a', 13303); g.strokeStyle = S.rgba('#ffffff', .7); g.lineWidth = 4; g.beginPath(); g.ellipse(640, 520, 160, 50, 0, 0, TAU); g.moveTo(640, 310); g.lineTo(640, 720); g.stroke();
    g.fillStyle = '#5a5a5a'; g.fillRect(1180, 120, 10, 200); g.fillStyle = '#f0f0f0'; g.fillRect(1110, 100, 120, 80); g.strokeStyle = '#c84a2a'; g.lineWidth = 3; g.strokeRect(1140, 130, 50, 36); g.beginPath(); g.ellipse(1150, 186, 22, 6, 0, 0, TAU); g.stroke();
    grain(g, w, h, 13304, .04); });

  // the Wonsan coast estate: sea, beach, a white villa among pines, a moored yacht
  VP.set('nk_wonsan', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#5a9ad8'], [.45, '#d8e8f0']]); cloud(g, 300, 100, 1, '#ffffff', 13401); cloud(g, 1000, 70, .8, '#ffffff', 13402);
    g.fillStyle = '#3a7ab0'; g.fillRect(0, 280, w, 200); S.strokes(g, { x: 0, y: 280, w, h: 200, n: 300, cols: ['#5a9ad0', '#2a6aa0', '#8ac0e8'], l0: 10, l1: 30, ang: 0, jit: .1, w0: 1, w1: 2, a0: .3, a1: .6, seed: 13403 });
    g.fillStyle = '#f0f0ec'; g.beginPath(); g.moveTo(980, 300); g.lineTo(1120, 300); g.lineTo(1100, 320); g.lineTo(990, 320); g.fill(); g.fillStyle = '#e8e8e4'; g.fillRect(1010, 286, 70, 14);
    g.fillStyle = '#e8d8b0'; g.beginPath(); g.moveTo(0, 470); g.quadraticCurveTo(640, 430, 1280, 480); g.lineTo(w, h); g.lineTo(0, h); g.fill(); S.dabs(g, { x: 0, y: 450, w, h: 270, n: 300, cols: ['#d8c8a0', '#f0e4c8'], r0: 4, r1: 14, a0: .3, a1: .5, seed: 13404 });
    g.fillStyle = '#f4f0e8'; g.fillRect(60, 200, 300, 150); g.fillStyle = '#3a5a7a'; g.beginPath(); g.moveTo(40, 204); g.lineTo(210, 150); g.lineTo(380, 204); g.fill(); for (let k = 0; k < 5; k++) { g.fillStyle = '#5a7a9a'; g.fillRect(84 + k * 56, 240, 30, 50); }
    g.save(); g.beginPath(); g.rect(0, 0, 420, 720); g.clip(); pines(g, 40, 300, 380, 13405); g.restore(); grain(g, w, h, 13406, .04); });

  // a briefing room: a big screen, blinds, a long desk
  VP.set('nk_brief', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#cfd2d8', 13501); g.fillStyle = '#1a2230'; g.fillRect(300, 70, 680, 360); g.fillStyle = '#26324a'; g.fillRect(312, 82, 656, 336);
    for (let k = 0; k < 10; k++) { g.fillStyle = S.rgba('#8a9ab0', .5); g.fillRect(1060, 90 + k * 30, 160, 18); }
    floorboards(g, 520, w, h, '#4a4e58', 13502); grain(g, w, h, 13503, .04); });

  // a private study in a grand residence: tall windows, a blackboard, a globe
  VP.set('nk_study', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#e0d8c4', 13601); win(g, 900, 80, 260, 340, cc => sky(cc, 1280, 720, [[0, '#7aa8d8'], [.6, '#e8ecf0']]), '#8a6a3a'); curtain(g, 860, 70, 40, 370, '#7a2a2a'); curtain(g, 1160, 70, 40, 370, '#7a2a2a');
    g.fillStyle = '#6a4a2a'; g.fillRect(170, 110, 460, 260); g.fillStyle = '#2a4a3a'; g.fillRect(182, 122, 436, 236);
    floorboards(g, 520, w, h, '#7a5a3a', 13602); grain(g, w, h, 13603, .04); });

  // a riding ring by the sea: white rails, sand, sea and pines behind
  VP.set('nk_ring', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6aa0d8'], [.45, '#e0ecf0']]); cloud(g, 700, 90, 1, '#ffffff', 13701);
    g.fillStyle = '#3a7ab0'; g.fillRect(0, 290, w, 60); pines(g, 30, 340, 400, 13702);
    g.fillStyle = '#d8c098'; g.fillRect(0, 400, w, 320); S.dabs(g, { x: 0, y: 400, w, h: 320, n: 300, cols: ['#c8a878', '#e8d0a8'], r0: 4, r1: 14, a0: .3, a1: .5, seed: 13703 });
    g.strokeStyle = '#f4f4f0'; g.lineWidth = 6; g.beginPath(); g.ellipse(640, 520, 600, 120, 0, Math.PI, TAU); g.stroke(); g.lineWidth = 4; g.beginPath(); g.ellipse(640, 545, 600, 120, 0, Math.PI, TAU); g.stroke();
    for (let k = 0; k <= 12; k++) { const a = Math.PI + k / 12 * Math.PI, x = 640 + Math.cos(a) * 600, y = 520 + Math.sin(a) * 120; g.fillStyle = '#f4f4f0'; g.fillRect(x - 3, y, 6, 30); }
    grain(g, w, h, 13704, .04); });

  // a ski slope: snowy hill, a chairlift line, a lodge
  VP.set('nk_ski', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#6a9ad0'], [.5, '#e0e8f0']]); g.fillStyle = '#e8ecf4'; g.beginPath(); g.moveTo(0, 560); g.lineTo(900, 120); g.lineTo(1280, 300); g.lineTo(1280, 720); g.lineTo(0, 720); g.fill();
    pines(g, 50, 300, 560, 13801, ['#2a4a3a', '#1a3a2a'], 1); g.fillStyle = '#f4f6fa'; g.beginPath(); g.moveTo(80, 600); g.lineTo(880, 150); g.lineTo(960, 170); g.lineTo(240, 660); g.fill();
    g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(300, 560); g.lineTo(1000, 170); g.stroke(); [[420, 493], [640, 370], [860, 248]].forEach(([x, y]) => { g.fillStyle = '#5a5a5a'; g.fillRect(x - 3, y, 6, 90); });
    g.fillStyle = '#8a4a2a'; g.fillRect(1020, 520, 180, 100); g.fillStyle = '#e8ecf4'; g.beginPath(); g.moveTo(1000, 524); g.lineTo(1110, 460); g.lineTo(1220, 524); g.fill(); grain(g, w, h, 13802, .04); });

  // a banquet hall: chandeliers, red walls, flags, a long white top table
  VP.set('nk_banquet', 1280, 720, (g, w, h) => {
    redwall(g, w, 500, 13901); nkflag(g, 420, 120, 2); nkflag(g, 720, 120, 2); [250, 640, 1030].forEach(x => chand(g, x, 70, 1.1));
    tiles(g, 500, w, h, '#c8b890', '#a89870', 13902); grain(g, w, h, 13903, .04); });

  // Kim Il Sung Square at night: a lit colonnaded building, floodlights, portrait banners
  VP.set('nk_square', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#060a1a'], [.6, '#1a2240']]); for (let k = 0; k < 6; k++) { g.save(); g.translate(100 + k * 220, 420); g.rotate(-.3 + k * .12); const gr = g.createLinearGradient(0, 0, 0, -420); gr.addColorStop(0, S.rgba('#e8f0ff', .25)); gr.addColorStop(1, S.rgba('#e8f0ff', 0)); g.fillStyle = gr; g.beginPath(); g.moveTo(-10, 0); g.lineTo(-60, -420); g.lineTo(60, -420); g.lineTo(10, 0); g.fill(); g.restore(); }
    g.fillStyle = '#c8b898'; g.fillRect(200, 180, 880, 240); g.fillStyle = '#a89878'; g.beginPath(); g.moveTo(180, 184); g.lineTo(640, 120); g.lineTo(1100, 184); g.fill(); for (let k = 0; k < 14; k++) { g.fillStyle = '#e8dcc0'; g.fillRect(230 + k * 60, 210, 18, 200); }
    g.fillStyle = S.rgba('#ffd890', .25); g.fillRect(200, 180, 880, 240); g.fillStyle = '#5a1a1a'; g.fillRect(200, 400, 880, 30); for (let k = 0; k < 12; k++) { g.fillStyle = '#e8c040'; g.beginPath(); g.arc(240 + k * 72, 414, 4, 0, TAU); g.fill(); }
    g.fillStyle = '#4a4a50'; g.fillRect(0, 430, w, 290); for (let y = 450; y < 720; y += 40) { g.strokeStyle = S.rgba('#ffffff', .12); g.lineWidth = 2; g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    grain(g, w, h, 14001, .05); });

  // a satellite launch site at night: a gantry tower, a viewing platform, distant lights
  VP.set('nk_sat', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#040814'], [.7, '#1a2038']]); for (let k = 0; k < 90; k++) { const r = S.rng(14101 + k); g.fillStyle = S.rgba('#ffffff', .3 + r() * .5); g.fillRect(r() * w, r() * 300, 2, 2); }
    ridge(g, w, h, 400, 30, 300, 14102, '#141a24'); g.fillStyle = '#3a3a40'; g.fillRect(860, 100, 70, 370); g.strokeStyle = '#5a5a60'; g.lineWidth = 3; for (let y = 110; y < 470; y += 30) { g.beginPath(); g.moveTo(860, y); g.lineTo(930, y + 30); g.moveTo(930, y); g.lineTo(860, y + 30); g.stroke(); }
    g.fillStyle = '#2a2a30'; g.fillRect(0, 470, w, 250); g.fillStyle = '#4a4a50'; g.fillRect(0, 470, 700, 24); g.fillStyle = '#3a3a40'; for (let k = 0; k < 14; k++) g.fillRect(k * 50, 440, 4, 30); g.fillRect(0, 440, 700, 4);
    grain(g, w, h, 14103, .05); });

  // a Beijing review stand: a red gate with gold roofs, red lanterns, flags along a rail
  VP.set('nk_beijing', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#7aa8d8'], [.5, '#e0e8ec']]); cloud(g, 300, 90, 1, '#ffffff', 14201);
    g.fillStyle = '#a82a22'; g.fillRect(140, 200, 1000, 300); g.fillStyle = '#c8a040'; g.beginPath(); g.moveTo(100, 210); g.quadraticCurveTo(640, 150, 1180, 210); g.lineTo(1120, 160); g.quadraticCurveTo(640, 100, 160, 160); g.fill(); g.fillStyle = '#5a3a1a'; g.fillRect(140, 200, 1000, 14);
    for (let k = 0; k < 8; k++) { g.fillStyle = '#c84030'; g.beginPath(); g.ellipse(200 + k * 125, 250, 16, 20, 0, 0, TAU); g.fill(); }
    g.fillStyle = '#e8e0d0'; g.fillRect(0, 420, w, 40); for (let k = 0; k < 20; k++) { g.fillStyle = k % 2 ? '#c8202a' : '#e8c040'; g.fillRect(k * 66 + 10, 386, 4, 34); g.fillRect(k * 66 + 14, 386, 24, 16); }
    g.fillStyle = '#d8d0c0'; g.fillRect(0, 460, w, 260); g.fillStyle = '#c8c0b0'; for (let y = 480; y < 720; y += 36) g.fillRect(0, y, w, 3); grain(g, w, h, 14202, .04); });

  // a portrait hall: red wall with gold rails, empty for portraits drawn on top
  VP.set('nk_hall', 1280, 720, (g, w, h) => { redwall(g, w, 560, 14301); floorboards(g, 560, w, h, '#5a3a22', 14302); grain(g, w, h, 14303, .04); });

  // a meeting room: wood panels, a portrait frame, a long table along the floor
  VP.set('nk_meeting', 1280, 720, (g, w, h) => {
    wood(g, 0, 0, w, 520, '#5a3a22', 14401); for (let k = 0; k < 6; k++) { g.strokeStyle = S.rgba('#2a1a0a', .6); g.lineWidth = 3; g.strokeRect(30 + k * 210, 60, 180, 300); } nkflag(g, 580, 90, 1.7);
    tiles(g, 520, w, h, '#8a7a5a', '#6a5a3a', 14402); grain(g, w, h, 14403, .04); });

  // an office: green-shaded lamp, curtains, a big window; works at night or day
  VP.set('nk_office', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#c8bca0', 14501); win(g, 840, 90, 260, 280, cc => sky(cc, 1280, 720, [[0, '#7aa8d8'], [.6, '#e8ecf0']]), '#5a3a22'); curtain(g, 800, 80, 40, 310, '#3a4a3a'); curtain(g, 1100, 80, 40, 310, '#3a4a3a');
    g.fillStyle = '#6a4a2a'; g.fillRect(200, 100, 200, 240); g.fillStyle = '#c8bc98'; g.fillRect(212, 112, 176, 216);
    floorboards(g, 520, w, h, '#5a3a22', 14502); grain(g, w, h, 14503, .04); });

  // a street: a big propaganda billboard and a row of bare market stalls
  VP.set('nk_street', 1280, 720, (g, w, h) => {
    sky(g, w, h, [[0, '#8aa0b8'], [.6, '#d8dcd8']]); roofs(g, w, 300, 30, 14601, false);
    for (let k = 0; k < 4; k++) { g.fillStyle = S.mix('#b8b0a0', '#a8a090', k % 2); g.fillRect(k * 330, 180, 320, 260); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { g.fillStyle = '#5a6070'; g.fillRect(k * 330 + 30 + i * 72, 210 + j * 70, 30, 40); } }
    g.fillStyle = '#7a7a72'; g.fillRect(0, 440, w, 280); S.dabs(g, { x: 0, y: 440, w, h: 280, n: 200, cols: ['#6a6a62', '#8a8a82'], r0: 6, r1: 18, a0: .2, a1: .4, seed: 14602 });
    grain(g, w, h, 14603, .05); });

  // a summit room: flags of two countries behind a long table, cream walls
  VP.set('nk_summit', 1280, 720, (g, w, h) => {
    plaster(g, 0, 0, w, 520, '#e8e0cc', 14701); for (let k = 0; k < 5; k++) { g.fillStyle = '#5a5a5a'; g.fillRect(180 + k * 230, 80, 4, 220); nkflag(g, 184 + k * 230, 80, 1.3); }
    tiles(g, 520, w, h, '#a89878', '#8a7a5a', 14702); grain(g, w, h, 14703, .04); });

  // a TV studio: a blue backdrop with a gold-framed screen, a news desk
  VP.set('nk_tv', 1280, 720, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, 520); gr.addColorStop(0, '#1a3a7a'); gr.addColorStop(1, '#2a5aa0'); g.fillStyle = gr; g.fillRect(0, 0, w, 520); for (let k = 0; k < 12; k++) { g.strokeStyle = S.rgba('#ffffff', .06); g.lineWidth = 30; g.beginPath(); g.moveTo(k * 140, 0); g.lineTo(k * 140 - 200, 520); g.stroke(); }
    g.fillStyle = '#2a2a3a'; g.fillRect(0, 520, w, 200); grain(g, w, h, 14801, .04); });
})(window);
