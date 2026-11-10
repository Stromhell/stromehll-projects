// ---- act 9 plates. Stand-ins until the painted plates land: swap the right-hand names (and re-check floors) when they appear.
const P_PARTY = 'party_lawn';
const P_CORR = 'gov_corridor';
for (const n of ['newsroom', P_PARTY, 'long_table', 'worldmap', P_CORR]) K.load(n, PL + n + '.jpg');
const txt9 = TW.txt, rr9 = TW.rr;
// drifting blurred backdrop (screen space) so card-led shots still move
const drift9 = (name, b = .45, blur = 6) => (c, lt, u) => { c.save(); c.filter = `blur(${blur}px) brightness(${b})`; const s2 = (1.08 + .06 * u) * 1920 / 2560; c.setTransform(s2, 0, 0, s2, 960 - (1280 + 60 * u) * s2, 540 - 720 * s2); c.drawImage(K.imgs[name], 0, 0, 2560, 1440); c.restore(); K.screen(c); };
// newspaper front page drawn centred on the origin (plain type, no logos)
const paper9 = (c, w, h) => { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(-w / 2 + 12, -h / 2 + 16, w, h); c.fillStyle = '#f2eee2'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(-w / 2, -h / 2, w, h); c.strokeRect(-w / 2, -h / 2, w, h);
  // greeked: masthead and headline are blurred bars, never real or invented text
  c.save(); c.filter = 'blur(3px)'; c.fillStyle = '#2a2620'; c.fillRect(-w * .36, -h / 2 + 34, w * .72, 34); c.restore(); c.fillStyle = '#1a1814'; c.fillRect(-w / 2 + 24, -h / 2 + 88, w - 48, 3); c.fillRect(-w / 2 + 24, -h / 2 + 126, w - 48, 2); c.fillStyle = '#8a8478'; c.fillRect(-w * .16, -h / 2 + 102, w * .32, 12);
  c.save(); c.filter = 'blur(4px)'; c.fillStyle = '#14120e'; c.fillRect(-w * .4, -h / 2 + 152, w * .8, 50); c.fillRect(-w * .32, -h / 2 + 218, w * .64, 50); c.restore();
  c.fillStyle = '#b8b2a2'; c.fillRect(-w / 2 + 30, -h / 2 + 290, w * .46, h - 330); for (let k = 0; k < 9; k++) { c.fillStyle = '#c9c2b2'; c.fillRect(w * .04, -h / 2 + 300 + k * 26, w * .42 - (k % 3) * 20, 10); } };
// pointing hand (index finger along +x)
const hand9 = (c, x, y, ang, s, col = '#f0c49c') => { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; rr9(c, -60, -30, 80, 60, 18); c.fill(); c.stroke(); rr9(c, 10, -28, 90, 24, 12); c.fill(); c.stroke(); c.fillStyle = '#1e2433'; c.fillRect(-110, -26, 52, 52); c.strokeRect(-110, -26, 52, 52); c.restore(); };
// handheld microphone (drawn in a hand's frame)
const mic9 = (cc, col = '#2a2a30') => { cc.save(); cc.rotate(-.9); cc.fillStyle = col; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-7, -10, 14, 70); cc.strokeRect(-7, -10, 14, 70); cc.fillStyle = '#9aa0aa'; cc.beginPath(); cc.arc(0, -22, 17, 0, 7); cc.fill(); cc.stroke(); cc.fillStyle = JH.RED; cc.fillRect(-9, 12, 18, 14); cc.restore(); };
// statement card: coloured header strip + body lines, slides in from the left
const stmt9 = (c, x, y, w, head, col, lines, lt, at, until = 99) => { const a = E.out(K.seg(lt, at, at + .45)), o = 1 - K.seg(lt, until - .3, until); if (a <= 0 || o <= 0) return; const h = 76 + lines.length * 52 + 20;
  c.save(); c.globalAlpha = o; c.translate(x - (1 - a) * 700, y); c.rotate(-.012); c.fillStyle = 'rgba(0,0,0,.35)'; rr9(c, 8, 10, w, h, 14); c.fill(); c.fillStyle = JH.CREAM; c.strokeStyle = INK; c.lineWidth = 5; rr9(c, 0, 0, w, h, 14); c.fill(); c.stroke();
  c.fillStyle = col; rr9(c, 0, 0, w, 62, 14); c.fill(); c.fillRect(0, 40, w, 22); txt9(c, head, 24, 32, 34, '#fff', 'left', 'Anton'); lines.forEach((s, i) => txt9(c, s, 24, 100 + i * 52, 38, INK, 'left', 'Anton')); c.restore(); };
// string lights across the top of a set (world space)
const lights9 = (c, lt, x0, x1, y, sag, n) => { c.strokeStyle = '#2a2420'; c.lineWidth = 4; c.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40, x = x0 + (x1 - x0) * u, yy = y + sag * 4 * u * (1 - u); k ? c.lineTo(x, yy) : c.moveTo(x, yy); } c.stroke();
  for (let k = 1; k < n; k++) { const u = k / n, x = x0 + (x1 - x0) * u, yy = y + sag * 4 * u * (1 - u) + 14, f = .7 + .3 * Math.sin(lt * 3 + k * 1.9); TW.glow(c, x, yy, 60, '255,200,120', .35 * f); c.fillStyle = `rgba(255,${210 + 30 * f | 0},140,1)`; c.beginPath(); c.arc(x, yy, 9, 0, 7); c.fill(); } };
const pumpkin9 = (c, x, y, s, lt) => { c.save(); c.translate(x, y); c.scale(s, s); TW.glow(c, 0, -40, 160, '255,150,40', .3 + .1 * Math.sin(lt * 11 + x)); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(0, 0, 70, 14, 0, 0, 7); c.fill();
  c.fillStyle = '#e07a1a'; c.strokeStyle = INK; c.lineWidth = 4; for (const dx of [-30, 30, 0]) { c.beginPath(); c.ellipse(dx, -44, 40, 44, 0, 0, 7); c.fill(); c.stroke(); } c.fillStyle = '#3a6a2a'; c.fillRect(-6, -100, 12, 20);
  c.fillStyle = `rgba(255,${200 + 40 * Math.sin(lt * 13 + x) | 0},90,1)`; c.beginPath(); c.moveTo(-26, -58); c.lineTo(-12, -58); c.lineTo(-19, -70); c.fill(); c.beginPath(); c.moveTo(12, -58); c.lineTo(26, -58); c.lineTo(19, -70); c.fill(); c.beginPath(); c.moveTo(-24, -34); c.quadraticCurveTo(0, -18, 24, -34); c.quadraticCurveTo(0, -26, -24, -34); c.fill(); c.restore(); };
// curved arrow between two points that draws on (u 0..1), with head
const arrow9 = (c, x0, y0, x1, y1, u, col, bend = -.25) => { if (u <= 0) return; const mx = (x0 + x1) / 2 + (y1 - y0) * bend, my = (y0 + y1) / 2 - (x1 - x0) * bend, P = t => [(1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1];
  c.save(); c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 18; c.beginPath(); for (let k = 0; k <= 30; k++) { const [x, y] = P(u * k / 30); k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.strokeStyle = col; c.lineWidth = 10; c.stroke();
  const [ax, ay] = P(u), [bx, by] = P(Math.max(0, u - .04)), an = Math.atan2(ay - by, ax - bx); c.translate(ax, ay); c.rotate(an); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(22, 0); c.lineTo(-22, -20); c.lineTo(-22, 20); c.closePath(); c.fill(); c.stroke(); c.restore(); };
// labelled place tag on the map (world space)
const tag9 = (c, x, y, s, col, lt, at, sub) => { const a = TW.pop(lt, at, .4); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.font = '44px Anton'; const w = c.measureText(s).width + 50, h = sub ? 104 : 70; c.fillStyle = 'rgba(0,0,0,.35)'; rr9(c, -w / 2 + 6, -h / 2 + 8, w, h, 12); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; rr9(c, -w / 2, -h / 2, w, h, 12); c.fill(); c.stroke();
  txt9(c, s, 0, sub ? -16 : 2, 44, '#fff', 'center', 'Anton'); if (sub) txt9(c, sub, 0, 30, 26, '#f4efe2', 'center', 'Oswald'); c.restore(); };
const CARRY9 = () => ({ shL: 30, elL: -75, shR: 35, elR: -75, handL: 'relaxed', handR: 'relaxed' });

window.SHOTS = [
  // 9.01 29 Oct: newsroom at night, wall of red screens; the calendar flips to 29 OCT; front pages slam down on the desk; a reporter points at the wall
  { plate: 'newsroom', cam: { z: [1.02, 1.16], x: [1280, 1290], y: [760, 720] }, bed: [['office_loop', .14], ['hum_loop', .1]], light: { dir: 1, key: 'rgba(255,120,110,.18)' },
    init: S => { const tTh = A.at(S, 'Thursday', .6), tOne = A.at(S, 'One', 3.0), tTr = A.at(S, 'company', 7.9) - 1, tT = A.at(S, 'Times', 9.5), tB = A.at(S, 'breaks', 9.9);
      S.D.figs = [{ x: 470, y: 1400, s: 1.7, ...JH.WOMAN(0), facing: 1, mood: 'focus', anim: (o, lt) => { o.pose = lt > tT ? 'point' : 'think'; if (lt > tB) o.mood = 'shocked'; } },
        { x: 2120, y: 1405, s: 1.7, ...JH.EXEC(1), facing: -1, mood: 'neutral', walk: { x0: 2750, x1: 2120, t0: .3, dur: 2.6 }, anim: (o, lt) => { if (lt > 3) o.pose = 'think'; if (lt > tT + .2) { o.pose = 'shrug'; o.mood = 'shocked'; } } }];
      S.D.live = [(c, lt) => { // the wall screens pulse; falling red lines glow
        const f = .5 + .5 * Math.sin(lt * 2.2); TW.glow(c, 1280, 560, 1100, '255,60,60', .12 + .06 * f); for (let k = 0; k < 6; k++) { const x = 300 + k * 330 + ((lt * 60) % 330); c.fillStyle = `rgba(255,90,90,${.25 + .2 * Math.sin(lt * 3 + k)})`; c.fillRect(x, 470, 6, 6); } }];
      S.D.over = [(c, lt) => { // calendar flip 28 -> 29 OCT
          const a = TW.pop(lt, tTh - .3, .4); if (a <= 0) return; c.save(); c.translate(230, 220); c.scale(a, a); JH.calendar(c, 0, 0, .95, '29', 'OCT'); const fl = K.seg(lt, tTh + .3, tTh + .8); if (fl < 1) { c.save(); c.translate(0, -50); c.scale(1, 1 - fl); JH.calendar(c, 0, 50, .95, '28', 'OCT'); c.restore(); } c.restore(); },
        (c, lt) => K.card(c, 'ONE YEAR AFTER', lt, { at: tOne, x: 560, y: 150, px: 40, rot: -2, until: tT + .3 }), (c, lt) => K.card(c, '$5 TRILLION', lt, { at: tTr, x: 560, y: 240, px: 60, rot: 2, bg: JH.GOLD, until: tT + .3 }),
        (c, lt) => { // three front pages fly in and stack on the desk
          for (let k = 0; k < 3; k++) { const t0 = tT - .5 + k * .18, u = K.seg(lt, t0, t0 + .5); if (u <= 0) continue; const e = E.out(u); c.save(); c.translate(980 + (k - 1) * 14 + (1 - e) * 300, 470 + (1 - e) * -700); c.rotate(-.06 + k * .03 + (1 - e) * .8); const sc = .72 + (1 - e) * .3; c.scale(sc, sc); paper9(c, 700, 640); c.restore(); } },
        (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 980, 760, lt, tB, { px: 30 }), (c, lt) => TW.stamp(c, 'BREAKING', 1560, 200, lt, tB + .3, { px: 70 }), (c, lt) => K.card(c, '29 OCT', lt, { at: tT + .2, x: 1560, y: 330, px: 80, rot: 3, bg: JH.GOLD })];
      S.D.sfx = [[tTh - .3, 'pop', .2], [tTh + .3, 'paper', .3], [tOne, 'tick', .25], [tTr, 'coins', .2], [.4, 'footsteps', .2], [tT - .5, 'whoosh', .3], [tT, 'thud', .3], [tT + .2, 'paper', .25], [tB, 'pop', .2], [tB + .3, 'stamp', .3]]; } },
  // 9.02 the replies: NVIDIA / JENSEN / BEIJING statement cards slide in; Jensen shrugs 'normal'; then the stock line on the wall dips 4%
  { plate: 'newsroom', cam: { z: [1.3, 1.4], x: [1640, 1700], y: [940, 925] }, bed: [['office_loop', .12], ['trading_loop', .1]], light: { dir: 1, key: 'rgba(255,120,110,.18)' },
    init: S => { const tN = A.at(S, 'investigated', 3.0) - .4, tJ = A.at(S, 'Jensen', 5.7), tNo = A.at(S, 'normal', 8.4), tC = A.at(S, "China's", 8.9), tG = A.at(S, 'groundless', 11.6), tS = A.at(S, 'stock', 15.5);
      S.D.figs = [{ x: 2180, y: 1400, s: 1.5, ...JH.JENSEN(), facing: -1, mood: 'neutral', walk: { x0: 2800, x1: 2180, t0: .2, dur: 2.0 }, anim: (o, lt) => { if (lt > tNo - .3 && lt < tC + .6) o.pose = 'shrug'; if (lt > tS) { o.mood = 'worried'; o.pose = 'think'; } o.talk = lt > tNo - .4 && lt < tNo + .5; } }];
      S.D.live = [(c, lt) => TW.glow(c, 1500, 560, 900, '255,60,60', .12 + .05 * Math.sin(lt * 2))];
      S.D.over = [(c, lt) => stmt9(c, 90, 150, 760, 'NVIDIA', '#4a7a10', ['MEGASPEED CLAIMS: INVESTIGATED,', 'DISMISSED A YEAR AGO'], lt, tN, tS),
        (c, lt) => stmt9(c, 90, 370, 760, 'JENSEN HUANG', '#24242c', ['CALLS DEALINGS WITH', 'MEGASPEED NORMAL'], lt, tNo - .4, tS),
        (c, lt) => stmt9(c, 90, 590, 760, "CHINA'S FOREIGN MINISTRY", JH.RED, ['GROUNDLESS SPECULATION,', 'AN ATTEMPT TO SMEAR CHINA'], lt, tG - .3, tS),
        (c, lt) => { // stock chart panel
          const a = E.out(K.seg(lt, tS - .4, tS + .1)); if (a <= 0) return; c.save(); c.translate(-(1 - a) * 900, 0); c.fillStyle = 'rgba(0,0,0,.4)'; rr9(c, 98, 168, 800, 640, 18); c.fill(); c.fillStyle = '#0e1220'; c.strokeStyle = INK; c.lineWidth = 6; rr9(c, 90, 160, 800, 640, 18); c.fill(); c.stroke();
          txt9(c, 'NVDA', 130, 210, 44, '#e8eef8', 'left', 'Anton'); c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 2; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(130, 290 + k * 80); c.lineTo(850, 290 + k * 80); c.stroke(); }
          const u = K.seg(lt, tS, tS + 2.2); c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath(); const N = 60; for (let k = 0; k <= N * Math.max(.35, u); k++) { const x = 130 + k * 12, y = 380 + Math.sin(k * .9) * 14 + (k > N * .35 ? (k - N * .35) * 6.2 : 0); k ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = u > .1 ? '#ff5a52' : '#7ad85a'; c.stroke();
          c.restore(); JH.counter(c, 0, -4.1, 640, 220, lt, tS + .2, tS + 2.4, { px: 90, col: '#ff5a52', fmt: v => v.toFixed(1) + '%' }); }];
      S.D.sfx = [[.2, 'footsteps', .2], [tN, 'whoosh_soft', .3], [tN + .2, 'paper', .2], [tNo - .4, 'whoosh_soft', .3], [tNo - .3, 'pop', .2], [tG - .3, 'whoosh_soft', .3], [tG, 'stamp', .2], [tS - .4, 'whoosh', .3], [tS + .4, 'tension', .25], [tS + 1.6, 'thud', .25]]; } },
  // 9.03 Saturday, Halloween party at Mar-a-Lago: string lights, pumpkins; the president at a forest of microphones; quote card
  { plate: P_PARTY, cam: { z: [1.12, 1.3], x: [1350, 1420], y: [860, 900] }, bed: [['crowd_loop', .12], ['night_loop', .1]], light: { dir: -1, key: 'rgba(255,200,140,.22)' },
    init: S => { const tSa = A.at(S, 'Saturday', .4), tH = A.at(S, 'Halloween', 1.6), tK = A.at(S, 'know', 5.0), tSh = A.at(S, 'Should', 7.2), tY = A.at(S, 'yes', 11.1), tU = A.at(S, 'unless', 11.5);
      S.D.figs = [{ x: 1560, y: 1330, s: 1.45, ...JH.PRESIDENT(), facing: -1, mood: 'neutral', talk: [tK - .6, 15], anim: (o, lt) => { o.pose = lt > tY - .2 && lt < tU + .8 ? 'shrug' : lt > tSh + 1 ? 'present' : 'stand'; if (lt > tU) o.mood = 'focus'; } },
        { x: 700, y: 1345, s: 1.4, ...JH.WOMAN(1), facing: 1, mood: 'focus', hold: { near: cc => mic9(cc) }, arms: () => ({ shR: 75, elR: -20, handR: 'fist' }), anim: (o, lt) => { o.talk = lt > tSh - .2 && lt < tSh + 1.6; } },
        { x: 1060, y: 1360, s: 1.42, ...JH.EXEC(2), facing: 1, mood: 'neutral', hold: { near: cc => mic9(cc, '#3a3a4a') }, arms: () => ({ shR: 82, elR: -12, handR: 'fist' }) }];
      S.D.live = [(c, lt) => { // flicker the painted pumpkins, string lights and lanterns
        [[213, 1000], [320, 1048], [560, 960], [2000, 952], [2267, 1008], [2400, 1067], [160, 1200], [2440, 1205]].forEach(([x, y], k) => TW.glow(c, x, y, 110, '255,150,40', .22 + .12 * Math.sin(lt * 9 + k * 2.3)));
        for (let k = 0; k < 22; k++) { const x = 230 + k * 96, y = 250 + 60 * Math.sin(k * .45); TW.glow(c, x, y, 50, '255,220,150', .18 * (.6 + .4 * Math.sin(lt * 3 + k * 1.7))); }
        for (const x of [693, 1040, 1493, 1853]) TW.glow(c, x, 480, 90, '255,120,60', .2 + .06 * Math.sin(lt * 2 + x)); }];
      S.D.front = [(c, lt) => { // boom mics from the edges push in
        const push = E.io(K.seg(lt, tK - 1, tK + 2)); [[2620, 640, -2.75], [2620, 820, -2.95]].forEach(([x0, y0, an], k) => { const L = 560 + push * 120 + Math.sin(lt * 1.3 + k) * 10; c.save(); c.translate(x0, y0); c.rotate(an); c.fillStyle = '#2a2a2e'; c.fillRect(0, -7, L, 14); c.fillStyle = '#4a4a52'; c.strokeStyle = INK; c.lineWidth = 4; rr9(c, L, -26, 80, 52, 24); c.fill(); c.stroke(); c.restore(); }); }];
      S.D.over = [(c, lt) => K.card(c, 'SATURDAY · HALLOWEEN PARTY', lt, { at: tSa, x: 520, y: 120, px: 44, rot: -2 }), (c, lt) => K.card(c, 'MAR-A-LAGO', lt, { at: tH + .6, x: 520, y: 210, px: 56, rot: 2, bg: JH.GOLD }),
        (c, lt) => K.card(c, "TRUMP: DIDN'T KNOW ABOUT\nTHE SPECIFIC THING", lt, { at: tK, x: 1480, y: 170, px: 44, rot: 2, until: tSh - .05 }),
        (c, lt) => K.card(c, 'JENSEN STAY ON HIS COUNCIL?', lt, { at: tSh + .2, x: 1480, y: 170, px: 48, rot: -2, until: tU }),
        (c, lt) => stmt9(c, 900, 120, 900, 'TRUMP, IN SUMMARY', '#1c2440', ['YES, UNLESS THEY FIND OUT', 'SOMETHING TO THE CONTRARY'], lt, tU)];
      S.D.sfx = [[tSa, 'pop', .2], [tH + .6, 'stamp', .25], [tK - 1, 'whoosh_soft', .2], [tK, 'pop', .2], [tSh, 'pop', .2], [tY, 'tick', .2], [tU, 'drum', .25], [tU + .2, 'camera_shutter', .3]]; } },
  // 9.04 the blame circle spins over the ballroom; a Democrat points; then a $20M tag swings on the ballroom chandelier
  { plate: 'long_table', cam: { z: [1.05, 1.3], x: [1280, 1280], y: [820, 640] }, bed: [['hum_loop', .1], ['tension', .12]], light: { dir: -1, key: 'rgba(255,230,180,.22)' },
    init: S => { const tB = A.at(S, 'blame', 2.0), tD = A.at(S, 'Democrats', 2.5), tBr = A.at(S, 'briefed', 5.3), tP = A.at(S, 'point', 7.1), tA = A.at(S, 'according', 8.7), tTw = A.at(S, 'twenty', 13.5), tBa = A.at(S, 'ballroom', 17.0);
      S._tP = tP;
      S.D.figs = [{ x: 380, y: 1360, s: 1.45, ...JH.OFFICIAL(1), facing: 1, mood: 'angry', walk: { x0: -250, x1: 380, t0: tD - 1.6, dur: 1.5 }, anim: (o, lt) => { if (lt > tD) o.pose = 'point'; if (lt > tTw) { o.pose = 'point'; o.mood = 'shocked'; } o.talk = lt > tD && lt < tP; } },
        { x: 2200, y: 1360, s: 1.45, ...JH.OFFICIAL(0), facing: -1, mood: 'worried', walk: { x0: 2850, x1: 2200, t0: tD - 1.2, dur: 1.5 }, anim: (o, lt) => { if (lt > tBr) o.pose = 'shrug'; if (lt > tTw) { o.pose = 'think'; o.mood = 'neutral'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 360, 420, '255,230,160', .3 + .06 * Math.sin(lt * 2)); TW.sparkle(c, 1280, 380, lt, 1.2, '255,240,200');
        // tag swinging from the chandelier
        const a = K.seg(lt, tTw - .4, tTw); if (a <= 0) return; const sw = Math.sin(lt * 2.2) * .12 * (1 - K.seg(lt, tTw, tTw + 4) * .6); c.save(); c.translate(1280, 400); c.rotate(sw); const dy = (1 - E.back(a)) * -120; c.strokeStyle = '#c8a040'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 120 + dy); c.stroke();
        c.translate(0, 120 + dy); c.fillStyle = 'rgba(0,0,0,.3)'; rr9(c, -150, 14, 310, 140, 14); c.fill(); c.fillStyle = JH.GOLD; c.strokeStyle = INK; c.lineWidth = 5; rr9(c, -155, 6, 310, 140, 14); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(0, 26, 9, 0, 7); c.fill();
        const v = 20 * E.out(K.seg(lt, tTw, tTw + 1.2)); txt9(c, '$' + Math.round(v) + 'M+', 0, 92, 72, INK, 'center', 'Anton'); c.restore(); },
        (c, lt) => { const t0 = tTw + .3; if (lt < t0) return; for (let k = 0; k < 26; k++) { const u = ((lt - t0) * .7 + k / 26) % 1, x = 1100 + (k * 47 % 360), y = 560 + u * 560; if (lt - t0 < k / 26 / .7) continue; c.fillStyle = `rgba(232,180,74,${1 - u * .6})`; c.strokeStyle = 'rgba(80,50,10,.7)'; c.lineWidth = 2; c.beginPath(); c.ellipse(x, y, 16, 16 * Math.abs(Math.sin(lt * 6 + k)), 0, 0, 7); c.fill(); c.stroke(); } }];
      S.D.over = [(c, lt) => { // blame circle: four labelled hands, each pointing at the next, rotating
          const a = E.out(K.seg(lt, tB - 1.2, tB - .6)), o = 1 - K.seg(lt, tP - .2, tP + .3); if (a <= 0 || o <= 0) return; c.save(); c.globalAlpha = o; c.translate(960, 420); c.scale(a, a); const rot = lt * .5;
          c.fillStyle = 'rgba(14,10,8,.55)'; c.beginPath(); c.arc(0, 0, 330, 0, 7); c.fill(); c.strokeStyle = 'rgba(232,180,74,.6)'; c.lineWidth = 4; c.setLineDash([16, 12]); c.beginPath(); c.arc(0, 0, 200, 0, 7); c.stroke(); c.setLineDash([]);
          ['DEMOCRATS', 'WHITE HOUSE', 'NVIDIA', 'BEIJING'].forEach((s, k) => { const an = rot + k * Math.PI / 2, x = Math.cos(an) * 200, y = Math.sin(an) * 200; hand9(c, x, y, an + Math.PI / 2 + .2, .9); const lx = Math.cos(an) * 285, ly = Math.sin(an) * 285; c.font = '32px Anton'; const w = c.measureText(s).width + 26; c.fillStyle = k === 0 && lt > tD ? JH.RED : '#1e1e24'; rr9(c, lx - w / 2, ly - 22, w, 44, 8); c.fill(); txt9(c, s, lx, ly + 1, 32, '#fff', 'center', 'Anton'); });
          txt9(c, 'BLAME', 0, 0, 64, JH.GOLD, 'center', 'Anton'); c.restore(); },
        (c, lt) => stmt9(c, 40, 640, 620, 'DEMOCRATS ASK', '#2a3a6a', ['BRIEFED, SO WHY', 'DID HE DO NOTHING?'], lt, tBr - .4, tP + .3),
        (c, lt) => JH.src(c, 'THE NEW YORK TIMES (ONE SOURCE)', 960, 820, lt, tA, { px: 28 }),
        (c, lt) => K.card(c, 'WHITE HOUSE BALLROOM', lt, { at: tBa - .2, x: 1480, y: 170, px: 46, rot: 2 }), (c, lt) => K.card(c, 'FROM NVIDIA', lt, { at: tTw + .8, x: 440, y: 170, px: 46, rot: -2 })];
      S.D.sfx = [[tB - 1.2, 'whoosh', .3], [tB, 'drum', .2], [tD - 1.6, 'footsteps', .2], [tD, 'pop', .15], [tBr - .4, 'pop', .2], [tP, 'whoosh_soft', .3], [tA, 'paper', .2], [tTw - .3, 'chime', .25], [tTw + .3, 'coins_cascade', .3], [tBa - .2, 'stamp', .25]]; } },
  // 9.05 arrows ping-pong across the map: NVIDIA -> WASHINGTON, BEIJING -> AMERICAN PRESS, HOUSE REPUBLICANS -> NVIDIA
  { plate: 'worldmap', cam: { z: [1.35, 1.42], x: [1100, 1150], y: [640, 615] }, bed: [['tension', .14], ['hum_loop', .08]], light: { dir: -1 },
    init: S => { const tN = A.at(S, 'points', .8), tW = A.at(S, 'warned', 3.9), tB = A.at(S, 'Beijing', 4.4), tP = A.at(S, 'press', 6.2), tR = A.at(S, 'Republicans', 7.0), tAf = A.at(S, 'after', 9.1);
      const NV = [470, 610], DC = [790, 520], BJ = [1890, 520], PR = [1260, 700];
      S.D.live = [(c, lt) => { arrow9(c, NV[0] + 40, NV[1] - 50, DC[0] - 20, DC[1] - 60, E.io(K.seg(lt, tN, tN + .8)), JH.GREEN, -.5);
          arrow9(c, BJ[0] - 70, BJ[1] + 40, PR[0] + 110, PR[1] - 30, E.io(K.seg(lt, tB, tB + 1)), JH.RED, .2);
          arrow9(c, DC[0] - 10, DC[1] + 50, NV[0] + 70, NV[1] + 60, E.io(K.seg(lt, tR + .2, tR + 1)), '#3a5aa8', -.5);
          tag9(c, NV[0] - 40, NV[1] + 150, 'NVIDIA', '#4a7a10', lt, .2); tag9(c, DC[0] + 60, DC[1] - 150, 'WASHINGTON', '#2a3a6a', lt, .5);
          tag9(c, BJ[0], BJ[1] - 140, 'BEIJING', JH.RED, lt, .8); const a = TW.pop(lt, tP - .5, .4); if (a > 0) { c.save(); c.translate(PR[0], PR[1]); c.scale(a * .36, a * .36); c.rotate(-.06); paper9(c, 700, 640); c.restore(); tag9(c, PR[0], PR[1] + 160, 'AMERICAN PRESS', '#3a342a', lt, tP - .3); }
          if (lt > tR) tag9(c, DC[0] + 30, DC[1] + 170, 'HOUSE REPUBLICANS', '#2a3a6a', lt, tR, 'COMMITTEE CHAIRS');
          if (lt > tAf) JH.target(c, NV[0] - 40, NV[1] + 150, lt, tAf, { r0: 300, r1: 130, d: .8 }); }];
      S.D.over = [(c, lt) => stmt9(c, 60, 380, 640, 'NVIDIA SAYS', '#4a7a10', ["IT WOULD HAVE", "BEEN WARNED"], lt, tW - 1, tB + .3),
        (c, lt) => stmt9(c, 1230, 620, 660, 'BEIJING BLAMES', JH.RED, ['THE AMERICAN PRESS'], lt, tP - .7, tR + .3)];
      S.D.sfx = [[.2, 'pop', .15], [.5, 'pop', .15], [.8, 'pop', .15], [tN, 'arrow', .3], [tW - 1, 'pop', .2], [tB, 'arrow', .3], [tP - .5, 'paper', .2], [tR + .2, 'arrow', .3], [tAf, 'drum', .3]]; } },
  // 9.06 the committee letter: three chairs sign; the phrase is underlined; a closed briefing-room door shuts with 18 NOV on it; Jensen walks up to it
  { draw: drift9(P_CORR, .42, 6), bed: [['hum_loop', .12], ['tension', .14]],
    init: S => { const tTh = A.at(S, 'Three', .3), tW = A.at(S, 'write', 2.5), tCa = A.at(S, 'call', 4.1), tPu = A.at(S, 'publicly', 5.1), tWa = A.at(S, 'want', 8.2), tCl = A.at(S, 'closed', 9.5), tE = A.at(S, 'eighteenth', 11.1), tBr = A.at(S, 'brief', 12.9);
      const SIG = ['COMMITTEE CHAIR', 'COMMITTEE CHAIR', 'COMMITTEE CHAIR'];
      S.D.over = [(c, lt) => { const a = E.out(K.seg(lt, tTh - .3, tTh + .3)); if (a <= 0) return; c.save(); c.translate(-(1 - a) * 900, 0);
          JH.doc(c, 90, 110, 780, 740, { top: 'U.S. HOUSE OF REPRESENTATIVES', title: 'Dear Mr. Huang,', lines: ['~', '~', 'a publicly reported Chinese intelligence asset', '~', '~'], hi: lt > tPu ? 2 : -1, hiU: E.out(K.seg(lt, tPu, tPu + 1.4)) }, lt);
          SIG.forEach((s, k) => { const u = K.seg(lt, tTh + .5 + k * .5, tTh + 1.1 + k * .5); if (u <= 0) return; const x = 130 + k * 245; c.save(); c.beginPath(); c.rect(x, 640, 220 * u, 80); c.clip(); c.strokeStyle = '#1a2a6a'; c.lineWidth = 4; c.beginPath(); for (let q = 0; q <= 24; q++) { const px = x + 10 + q * 8, py = 690 + Math.sin(q * (1.3 + k * .4)) * 18 * (q % 5 ? 1 : -.6); q ? c.lineTo(px, py) : c.moveTo(px, py); } c.stroke(); c.restore(); c.fillStyle = '#6a6458'; c.fillRect(x, 724, 210, 2); txt9(c, s, x, 748, 18, '#5a5448', 'left', 'Oswald'); });
          c.restore(); },
        (c, lt) => K.card(c, '3 COMMITTEE CHAIRS', lt, { at: tTh + .2, x: 640, y: 590, px: 36, rot: -3 }),
        (c, lt) => K.card(c, 'PUBLICLY REPORTED\nCHINESE INTELLIGENCE ASSET', lt, { at: tPu + .3, x: 480, y: 450, px: 40, rot: 2, bg: JH.CREAM }),
        (c, lt) => { // briefing-room door panel (marble wall + double doors that swing shut)
          const a = E.out(K.seg(lt, tWa - .6, tWa)); if (a <= 0) return; c.save(); c.translate((1 - a) * 900, 0); const X = 1000, Y = 110, W = 840, H = 740;
          c.fillStyle = 'rgba(0,0,0,.4)'; rr9(c, X + 10, Y + 14, W, H, 16); c.fill(); const g = c.createLinearGradient(X, Y, X + W, Y + H); g.addColorStop(0, '#d8d4cc'); g.addColorStop(1, '#a8a49c'); c.fillStyle = g; c.strokeStyle = INK; c.lineWidth = 6; rr9(c, X, Y, W, H, 16); c.fill(); c.stroke();
          c.strokeStyle = 'rgba(120,110,100,.35)'; c.lineWidth = 3; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(X + 40 + k * 170, Y); c.quadraticCurveTo(X + 120 + k * 160, Y + 300, X + 60 + k * 175, Y + H); c.stroke(); }
          c.fillStyle = '#8a7a64'; c.fillRect(X, Y + H - 110, W, 110); c.fillStyle = '#6a5a48'; c.fillRect(X, Y + H - 110, W, 8);
          const dx = X + 180, dy = Y + 120, dw = 400, dh = H - 230; c.fillStyle = '#14100c'; c.fillRect(dx, dy, dw, dh); TW.glow(c, dx + dw / 2, dy + dh * .6, 260, '255,220,160', .25 * (1 - K.seg(lt, tCl, tCl + .4)));
          const sh = E.out(K.seg(lt, tCl - .1, tCl + .4)), lw = dw / 2 * (.25 + .75 * sh); c.fillStyle = '#6a3a1e'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(dx, dy, lw, dh); c.strokeRect(dx, dy, lw, dh); c.fillRect(dx + dw - lw, dy, lw, dh); c.strokeRect(dx + dw - lw, dy, lw, dh);
          if (sh > .9) { c.fillStyle = JH.GOLD; for (const hx of [dx + dw / 2 - 22, dx + dw / 2 + 22]) { c.beginPath(); c.arc(hx, dy + dh / 2, 9, 0, 7); c.fill(); } }
          c.fillStyle = '#5a2a14'; c.fillRect(dx - 20, dy - 24, dw + 40, 24); c.strokeRect(dx - 20, dy - 24, dw + 40, 24);
          const sa = TW.pop(lt, tCl + .2, .4); if (sa > 0) { c.save(); c.translate(dx + dw / 2, dy + 120); c.scale(sa, sa); c.fillStyle = '#1e1e24'; rr9(c, -150, -38, 300, 76, 10); c.fill(); txt9(c, 'CLOSED BRIEFING', 0, 2, 38, '#f4efe2', 'center', 'Anton'); c.restore(); }
          // Jensen walks up and stops beside the door (screen-space figure on the panel floor)
          A.figure(c, { x: 1660, y: Y + H - 30, s: .95, ...JH.JENSEN(), facing: -1, mood: 'worried', walk: { x0: 1900, x1: 1660, t0: tWa - .2, dur: 1.6 }, anim: (o, t) => { if (t > tBr) o.pose = 'think'; } }, lt, 0, S);
          c.restore(); },
        (c, lt) => { const a = TW.pop(lt, tE - .3, .45); if (a <= 0) return; c.save(); c.translate(1720, 260); c.scale(a, a); JH.calendar(c, 0, 0, .8, '18', 'NOV', { rot: .06 }); c.restore(); },
        (c, lt) => K.card(c, 'IN PERSON', lt, { at: tBr, x: 1420, y: 80, px: 44, rot: 2 })];
      S.D.sfx = [[tTh - .3, 'whoosh_soft', .3], [tTh + .5, 'paper', .2], [tTh + 1, 'paper', .15], [tTh + 1.5, 'paper', .15], [tPu, 'tick', .25], [tWa - .6, 'whoosh_soft', .3], [tWa, 'footsteps', .25], [tCl + .3, 'door_slam', .4], [tCl + .4, 'thud', .25], [tE - .3, 'pop', .2], [tBr, 'stamp', .2]]; } },
];
