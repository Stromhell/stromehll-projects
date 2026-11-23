// GM act 5 - Threats from Every Side: Iran 1979, the Mecca siege (distant, respectful, no violence shown), bend don't break, GCC 1981, Kuwait 1990, 100 hours, the new bodyguard.
// ---- act helpers
const rr = TW.rr, txt = TW.txt;
const LD = (n, alt) => { const im = K.load(n, PL + n + '.jpg'); if (alt) { if (!K.imgs[alt]) K.load(alt, PL + alt + '.jpg'); im.onerror = () => { K.imgs[n] = K.imgs[alt]; }; } };
const CR = (st = () => [0, 0, 0, 0, 0, 0]) => (c, lt) => GM.crowns(c, 200, 95, 1.12, st(lt), lt);
const STP = (c, s, x, y, lt, at, o = {}) => { if (lt > (o.until ?? 99)) return; TW.stamp(c, s, x, y, lt, at, o); };
const tag = (c, x, y, s, lt, at, o) => GM.ntag(c, x, y, s, K.seg(lt, at, at + .4), o);
const smoke = (c, lt, x, y, n = 14, a = .35) => { c.save(); for (let k = 0; k < n; k++) { const ph = (lt * .12 + k / n) % 1, r = 30 + ph * 160; c.fillStyle = `rgba(70,64,66,${a * (1 - ph)})`; c.beginPath(); c.arc(x + Math.sin(k * 2.3 + lt * .3) * 30 + ph * 220, y - ph * 520, r, 0, 7); c.fill(); } c.restore(); };
const ticker = (c, lt, s) => { c.save(); c.fillStyle = '#b02a2a'; c.fillRect(0, 790, 1920, 56); c.fillStyle = '#1e1e24'; c.fillRect(0, 790, 230, 56); txt(c, 'NEWS', 115, 818, 34, '#fff', 'center', 'Anton'); c.beginPath(); c.rect(230, 790, 1690, 56); c.clip(); c.font = '32px Oswald'; const u = s + '   •   ', w = c.measureText(u).width, x0 = 230 - (lt * 140) % w; for (let x = x0; x < 1920; x += w) txt(c, u, x, 818, 32, '#fff', 'left', 'Oswald'); c.restore(); };
const silo = (c, x, y, s, a) => { if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s); c.fillStyle = '#1e1a1e'; c.beginPath(); c.arc(0, -150, 46, 0, 7); c.fill(); c.beginPath(); c.moveTo(-70, 0); c.quadraticCurveTo(-74, -96, 0, -104); c.quadraticCurveTo(74, -96, 70, 0); c.fill(); c.beginPath(); c.ellipse(0, -112, 60, 14, 0, 0, 7); c.fill(); c.restore(); };
const car = (c, x, y, s, t, f = 1) => { c.save(); c.translate(x, y); c.scale(s * f, s); c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(0, 0, 190, 14, 0, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 5; c.fillStyle = '#e8e4da';
  c.beginPath(); c.moveTo(-180, -30); c.lineTo(-170, -80); c.lineTo(-90, -86); c.lineTo(-50, -140); c.lineTo(70, -140); c.lineTo(120, -86); c.lineTo(180, -76); c.lineTo(186, -30); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#9ac0d8'; c.fillRect(-36, -128, 50, 38); c.fillRect(24, -128, 46, 38);
  c.fillStyle = '#ffeaa0'; c.beginPath(); c.arc(180, -60, 9, 0, 7); c.fill(); for (const wx of [-110, 110]) { c.save(); c.translate(wx, -30); c.rotate(t * 14); c.fillStyle = '#1e1e22'; c.beginPath(); c.arc(0, 0, 30, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#8a8a90'; c.fillRect(-14, -3, 28, 6); c.fillRect(-3, -14, 6, 28); c.restore(); } c.restore(); };
const cheque = cc => { cc.save(); cc.rotate(-.15); cc.fillStyle = '#e8f0d8'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-60, -30, 120, 50); cc.strokeRect(-60, -30, 120, 50); txt(cc, '$$$', 0, -5, 22, '#2a6a2a', 'center', 'Anton'); cc.restore(); };
const book = cc => { cc.save(); cc.fillStyle = '#2a5a3a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-36, -50, 72, 90); cc.strokeRect(-36, -50, 72, 90); cc.fillStyle = '#e2b23a'; cc.fillRect(-24, -36, 48, 6); cc.restore(); };

for (const n of ['tehran', 'mosque_dawn', 'summit', 'kuwait_night', 'airbase', 'card']) K.load(n, PL + n + '.jpg');
LD('majlis', 'office'); LD('desert_border', 'dhofar');
const FL = 1250, SC = 1.7, KWst = (t2, t3) => lt => [0, lt < t2 ? Math.min(1, K.seg(lt, t2 - 2.5, t2)) * .6 : lt < t3 ? 2 : Math.max(0, 1 - K.seg(lt, t3, t3 + 1)) * .4, 0, 0, 0, 0];

window.SHOTS = [
  // 5.00 Tehran 1979: crowd roars, the king's portrait on the billboard tips and falls
  { plate: 'tehran', cam: { z: [1.15, 1.3], x: [1450, 1550], y: [780, 760] }, bed: [['crowd_loop', .22], ['wind_loop', .05]], light: { dir: 1, key: 'rgba(255,220,180,.1)' },
    init: S => { const tM = A.at(S, 'money', .5), t79 = A.at(S, '1979,', 2.4), tSh = A.at(S, 'Shah', 3.2), tMi = A.at(S, 'mightiest', 4.4), tO = A.at(S, 'overthrown.', 6.6);
      S.D.figs = [0, 1, 2, 3, 4].map(k => ({ x: 700 + k * 260, y: 1260 + (k % 2) * 20, s: SC, ...GM.PROTESTER(k), facing: k % 2 ? -1 : 1, mood: 'angry', seed: 30 + k, anim: (o, lt) => { o.pose = (Math.floor(lt * 1.2 + k) % 2) ? 'cheer' : 'stand'; if (!(o.pose === 'cheer')) o.arms = () => ({ shR: 150, elR: -10, handR: 'fist' }); if (lt > tO) { o.pose = 'cheer'; o.mood = 'happy'; } } }));
      S.D.live = [(c, lt) => { // distant crowd rows
          for (let r = 0; r < 3; r++) for (let k = 0; k < 40; k++) { const x = (k * 71 + r * 33) % 2560, y = 1040 + r * 40 + Math.sin(lt * 4 + k + r) * 4; c.fillStyle = ['#3a3030', '#5a4a40', '#2a2a34'][(k + r) % 3]; c.beginPath(); c.arc(x, y - 30, 12 + r * 2, 0, 7); c.fill(); c.fillRect(x - 14 - r, y - 20, 28 + 2 * r, 40); }
          // portrait in the billboard: frame tips and drops behind the roofline
          const u = E.io(K.seg(lt, tO - .3, tO + .9)); c.save(); c.translate(2000, 560 + u * 700); c.rotate(u * .6); c.globalAlpha = 1 - K.seg(lt, tO + .6, tO + .9); c.fillStyle = '#c89a3a'; c.strokeStyle = INK; c.lineWidth = 8; c.fillRect(-170, -290, 340, 290); c.strokeRect(-170, -290, 340, 290); c.fillStyle = '#8a9aa8'; c.fillRect(-140, -260, 280, 230); silo(c, 0, -30, 1, 1); GM.crown(c, 0, -250, .8, 0, 1); c.restore(); }];
      S.D.front = [(c, lt) => tag(c, 2000, 330, 'THE SHAH', lt, tSh)];
      S.D.over = [CR(), (c, lt) => K.card(c, "MONEY DOESN'T BUY EVERYONE", lt, { at: tM, x: 820, y: 110, px: 40, rot: -2, until: t79 - .3 }), (c, lt) => K.card(c, 'IRAN · EARLY 1979', lt, { at: t79 - .2, until: tO - .1, x: 820, y: 110, px: 46, rot: 2, bg: '#e8b44a' }),
        (c, lt) => STP(c, 'OVERTHROWN', 1000, 200, lt, tO, { px: 46 })];
      S.D.sfx = [[tM, 'pop', .2], [t79, 'chime', .2], [tSh, 'pop', .2], [tO - .3, 'creak', .3], [tO + .5, 'thud', .45], [tO + .6, 'crowd_cheer', .35], [tO, 'stamp', .3]]; } },
  // 5.01 Mecca, 20 Nov 1979: the mosque far away at dawn, smoke rising, a news ticker. No people, no violence.
  { plate: 'mosque_dawn', cam: { z: [1.0, 1.08], x: [1280, 1280], y: [720, 700] }, bed: [['wind_loop', .14], ['drone', .06]], light: { dir: -1, key: 'rgba(255,190,140,.12)' },
    init: S => { const t20 = A.at(S, 'twentieth', 1.0), tS = A.at(S, 'seize', 5.0), tF = A.at(S, 'fall', 8.0), tW = A.at(S, 'weeks,', 11.8), tH = A.at(S, 'hundreds', 12.6);
      S.D.live = [(c, lt) => { const a = .2 + .3 * K.seg(lt, tS - .5, tS + 2); smoke(c, lt, 1180, 640, 12, a); smoke(c, lt + 3, 1480, 660, 10, a * .8); TW.glow(c, 1280, 560, 700, '255,200,150', .14 + .03 * Math.sin(lt * .6)); }];
      S.D.over = [CR(lt => [Math.min(.5, K.seg(lt, tF - .5, tF + .5) * .5), 0, 0, 0, 0, 0]), (c, lt) => K.card(c, 'MECCA · 20 NOV 1979', lt, { at: t20 - .2, until: tS - .1, x: 960, y: 120, px: 46, rot: -2, bg: '#e8b44a' }),
        (c, lt) => K.card(c, 'THE GRAND MOSQUE IS SEIZED', lt, { at: tS, x: 960, y: 120, px: 40, rot: 1, until: tW - .2 }), (c, lt) => K.card(c, 'SIEGE: 2 WEEKS · HUNDREDS DEAD', lt, { at: tW - .2, x: 960, y: 120, px: 40, rot: 1, bg: '#c8d0e0' }),
        (c, lt) => { if (lt > tS - .3) ticker(c, lt, 'MECCA: GRAND MOSQUE SEIZED DURING DAWN PRAYERS  •  REBELS CALL FOR THE FALL OF THE HOUSE OF SAUD'); }];
      S.D.sfx = [[t20, 'chime', .2], [tS, 'tension', .3], [tF, 'drum', .2], [tW, 'thud', .25], [tH, 'swell', .15]]; } },
  // 5.02 majlis: the king takes down a cinema poster and hands a big book to a cleric; a potted branch bends and springs back
  { plate: 'majlis', cam: { z: [1.3, 1.4], x: [1250, 1300], y: [860, 880] }, bed: [['hum_loop', .08]], light: { dir: 1, key: 'rgba(255,230,190,.12)' },
    init: S => { const tC = A.at(S, 'crush', .6), tQ = A.at(S, 'quietly,', 2.2), tW = A.at(S, 'Westernisation', 5.6), tCl = A.at(S, 'clerics', 7.4), tB = A.at(S, 'Bend,', 8.8);
      const RX = 760, CX = 1840;
      S.D.figs = [{ x: RX, y: FL, s: SC, ...GM.ROYAL(1), facing: 1, mood: 'neutral', anim: (o, lt) => { o.facing = lt > tW - 1.2 && lt < tW + .4 ? -1 : 1; if (lt > tW - 1 && lt < tW + .2) o.pose = 'reach'; else if (lt > tCl - .6 && lt < tCl + .3) { o.pose = 'present'; o.hold = { near: book }; } else o.pose = 'stand'; } },
        { x: CX, y: FL, s: SC, ...GM.CLERIC(0), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tCl + .3) { o.pose = 'carry'; o.hold = { near: book }; o.mood = 'smug'; } } }];
      S.D.live = [(c, lt) => { const u = E.io(K.seg(lt, tW - .6, tW + .3)); c.save(); c.translate(940, 720 + u * 500); c.rotate(u * .3); c.globalAlpha = 1 - u; c.fillStyle = '#2a2a50'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-120, -170, 240, 340); c.strokeRect(-120, -170, 240, 340); txt(c, 'CINEMA', 0, -110, 44, '#ffd84a', 'center', 'Anton'); txt(c, 'TONIGHT', 0, -60, 30, '#fff', 'center', 'Oswald'); c.fillStyle = '#d84a6a'; c.beginPath(); c.arc(0, 40, 60, 0, 7); c.fill(); c.restore();
          // potted branch
          const b = K.seg(lt, tB - .2, tB + 2), bend = Math.sin(b * Math.PI) * .9 * (1 - b * .3) + Math.sin(lt * 1.3) * .04; c.save(); c.fillStyle = '#a05a3a'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(2000, FL); c.lineTo(1960, FL - 120); c.lineTo(2140, FL - 120); c.lineTo(2100, FL); c.closePath(); c.fill(); c.stroke();
          c.strokeStyle = '#5a3a22'; c.lineWidth = 14; c.beginPath(); c.moveTo(2050, FL - 120); c.quadraticCurveTo(2050, FL - 320, 2050 + Math.sin(bend) * 320, FL - 120 - Math.cos(bend) * 380); c.stroke(); c.fillStyle = '#4a8a3a'; c.beginPath(); c.arc(2050 + Math.sin(bend) * 320, FL - 120 - Math.cos(bend) * 380, 50, 0, 7); c.fill(); c.restore(); }];
      S.D.over = [CR(), (c, lt) => STP(c, 'REBELS CRUSHED', 960, 110, lt, tC, { until: tQ - .1, px: 46 }), (c, lt) => K.card(c, '...THEN ADOPT THEIR AGENDA', lt, { at: tQ, until: tW - .1, x: 960, y: 110, px: 40, rot: 2 }),
        (c, lt) => K.card(c, 'LESS WESTERNISATION', lt, { at: tW, until: tB - .1, x: 1350, y: 140, px: 40, rot: -2, bg: '#c8d0e0' }), (c, lt) => K.card(c, 'MORE POWER FOR CLERICS', lt, { at: tCl, until: tB - .1, x: 1350, y: 230, px: 40, rot: 2, bg: '#c8d0e0' }),
        (c, lt) => K.card(c, "BEND, DON'T BREAK", lt, { at: tB, x: 1350, y: 140, px: 46, rot: -2, bg: '#e8b44a' })];
      S.D.sfx = [[tC, 'stamp', .35], [tQ, 'whoosh_soft', .2], [tW - .5, 'paper_tear', .3], [tCl, 'paper', .25], [tB, 'creak', .35], [tB + 1.2, 'whoosh_soft', .2]]; } },
  // 5.03 summit hall: six royals at the round table link arms; screen shows GCC, then DEFENCE PACT, then KINGS PROTECTING KINGS; pearl in a bowl on the table
  { plate: 'summit', cam: { z: [1.2, 1.3], x: [1280, 1280], y: [760, 790] }, bed: [['hum_loop', .1]], light: { dir: 1, key: 'rgba(255,240,210,.1)' },
    init: S => { const tCl = A.at(S, 'club.', 3.0), tM = A.at(S, 'May', 3.6), tG = A.at(S, 'Gulf', 5.2), tP = A.at(S, 'paper,', 7.8), tPr = A.at(S, 'practice,', 9.8);
      const seats = [[700, 1000, 1.5], [930, 930, 1.35], [1150, 900, 1.25], [1410, 900, 1.25], [1630, 930, 1.35], [1860, 1000, 1.5]];
      S.D.figs = seats.map(([x, sy, s], k) => ({ x, y: sy + 63 * s, s, ...GM.ROYAL(k % 3), pose: 'sit', facing: x < 1280 ? 1 : -1, mood: 'neutral', seed: 10 + k, anim: (o, lt) => { if (lt > tCl - .3) { o.arms = () => ({ shL: 85, elL: -10, shR: 85, elR: -10, handL: 'open', handR: 'open' }); o.mood = 'happy'; } if (lt > tPr) o.mood = 'smug'; } }));
      S.D.live = [(c, lt) => { c.save(); c.beginPath(); c.rect(880, 170, 800, 410); c.clip(); c.fillStyle = '#1e2a3a'; c.fillRect(880, 170, 800, 410); const L = lt < tG ? ['SIX KINGS', 'ONE CLUB'] : lt < tP ? ['GULF COOPERATION', 'COUNCIL · 1981'] : lt < tPr ? ['ON PAPER:', 'A DEFENCE PACT'] : ['IN PRACTICE:', 'KINGS PROTECTING KINGS'];
          txt(c, L[0], 1280, 320, 56, '#e8b44a', 'center', 'Anton'); txt(c, L[1], 1280, 420, 56, '#f4efe2', 'center', 'Anton'); c.restore(); }];
      S.D.front = [(c, lt) => { c.save(); c.fillStyle = '#6a4a2e'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.ellipse(1280, 1010, 560, 120, 0, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#5a3e26'; c.fillRect(720, 1010, 1120, 40); c.strokeRect(720, 1010, 1120, 40);
          c.fillStyle = '#d8d0c0'; c.beginPath(); c.ellipse(1280, 1000, 80, 22, 0, 0, 7); c.fill(); c.stroke(); c.restore(); GM.pearl(c, 1280, 980, 2.2, .5 + .5 * Math.sin(lt * 2)); }];
      S.D.over = [CR(), (c, lt) => K.card(c, 'GCC · MAY 1981', lt, { at: tM - .2, x: 1500, y: 120, px: 46, rot: 2, bg: '#e8b44a' })];
      S.D.sfx = [[tCl, 'whoosh_soft', .25], [tM, 'chime', .25], [tG, 'hit', .35], [tP, 'paper', .25], [tPr, 'stamp', .3]]; } },
  // 5.04 Kuwait, 2 Aug 1990, 2 am: tanks roll along the highway; a white car speeds away the other way; KW crown falls
  { plate: 'kuwait_night', cam: { z: [1.12, 1.2], x: [1250, 1350], y: [880, 900] }, bed: [['night_loop', .12], ['war_drums_loop', .08]], light: { dir: 1, key: 'rgba(120,140,220,.14)' },
    init: S => { const tT = A.at(S, 'two', 1.0), tA = A.at(S, 'August', 2.6), tSd = A.at(S, 'Saddam', 3.8), tH = A.at(S, 'hundred', 5.4), tE = A.at(S, 'emir', 8.4), tN = A.at(S, 'nineteenth', 11.4);
      S.D.live = [(c, lt) => { for (let k = 0; k < 4; k++) { const x = -600 + ((lt - k * 4.5) * 220); if (x > -600 && x < 3100) GM.tank(c, x, 1240, 1.15, lt, 1); }
          const cu = K.seg(lt, tE - .3, tE + 3.5); if (cu > 0 && cu < 1) car(c, 2900 - cu * 3600, 1150, 1.0, lt, -1); }];
      S.D.front = [(c, lt) => { silo(c, 1900, 760, 1.3, K.seg(lt, tSd - .3, tSd + .3)); tag(c, 1900, 520, 'SADDAM HUSSEIN', lt, tSd); }];
      S.D.over = [CR(KWst(tN, 999)), (c, lt) => K.card(c, 'KUWAIT · 2 AUG 1990 · 2 AM', lt, { at: tT - .3, until: tE - .1, x: 1000, y: 110, px: 46, rot: -2, bg: '#e8b44a' }),
        (c, lt) => { if (lt > tH - .2 && lt < tE - .1) { JH.counter(c, 0, 100000, 1000, 240, lt, tH, tH + 1.6, { px: 70 }); K.card(c, 'TROOPS', lt, { at: tH + .3, until: tE - .1, x: 1000, y: 320, px: 40, rot: 2 }); } },
        (c, lt) => K.card(c, 'THE EMIR ESCAPES', lt, { at: tE, x: 1000, y: 110, px: 40, rot: -1, until: tN }), (c, lt) => STP(c, "IRAQ'S 19TH PROVINCE", 1000, 240, lt, tN, { px: 46 })];
      S.D.sfx = [[.4, 'drone', .2], [tT, 'tick', .2], [tSd, 'tension', .3], [tH, 'war_drums_loop', .1], [tE, 'whoosh', .3], [tN, 'stamp', .4], [tN + .2, 'thud', .35]]; } },
  // 5.05 desert at dawn: jets streak over, the Kuwaiti ruler returns and waves; KW crown springs back
  { plate: 'desert_border', cam: { z: [1.15, 1.22], x: [1280, 1320], y: [860, 870] }, bed: [['wind_loop', .15]], light: { dir: -1, key: 'rgba(255,190,130,.14)' },
    init: S => { const tC = A.at(S, 'coalition', 1.2), tG = A.at(S, 'ground', 3.2), tHu = A.at(S, 'hundred', 4.6), tS = A.at(S, 'Sabah', 7.2), tTh = A.at(S, 'throne.', 9.0);
      S.D.figs = [{ x: 2160, y: 1262, s: SC, ...GM.GENERAL(), facing: -1, mood: 'happy', anim: (o, lt) => { if (lt > tTh - .3) o.pose = 'wave'; } }, { x: 400, y: 1260, s: SC, ...GM.ROYAL(0), facing: 1, mood: 'happy', anim: (o, lt) => { const u = K.seg(lt, .2, tS - .5); o.x = 300 + 520 * u; o.pose = u > 0 && u < 1 ? 'walk' : lt > tS - .4 ? 'wave' : 'stand'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 3; k++) { const p = K.seg(lt, tC - .4 + k * .5, tC + 1.6 + k * .5); if (p > 0 && p < 1) GM.jet(c, -200 + p * 3000, 260 + k * 90, .7, .05); } TW.glow(c, 2100, 700, 700, '255,200,140', .18); GM.tank(c, 1680, 1264, 2.4, 0, -1); }];
      S.D.front = [(c, lt) => tag(c, 820, 720, 'AL SABAH', lt, tS)];
      S.D.over = [CR(KWst(-9, tTh)), (c, lt) => K.card(c, 'US-LED COALITION', lt, { at: tC, until: tTh - .3, x: 1300, y: 110, px: 44, rot: 2 }),
        (c, lt) => { if (lt > tG - .2) { JH.counter(c, 0, 100, 1300, 240, lt, tG, tHu + .4, { px: 80, suf: ' HOURS' }); } }, (c, lt) => K.card(c, 'BACK ON THE THRONE', lt, { at: tTh - .2, x: 1300, y: 110, px: 40, rot: -2, bg: '#e8b44a' })];
      S.D.sfx = [[tC - .3, 'whoosh', .4], [tC + .2, 'whoosh', .35], [tC + .7, 'whoosh', .3], [tG, 'tick', .25], [tHu, 'drum', .3], [tS, 'pop', .2], [tTh, 'crowd_cheer', .25], [tTh, 'chime', .25]]; } },
  // 5.06 air base: a sheikh hands a cheque to a US general; a cargo plane taxis behind
  { plate: 'airbase', cam: { z: [1.2, 1.3], x: [1300, 1260], y: [820, 840] }, bed: [['wind_loop', .1], ['hum_loop', .08]], light: { dir: 1, key: 'rgba(255,240,200,.1)' },
    init: S => { const tSh = A.at(S, 'shift.', 1.0), tA = A.at(S, 'America', 1.6), tBg = A.at(S, 'bodyguard.', 3.6), tP = A.at(S, 'pay', 5.2), tU = A.at(S, 'Udeid', 6.8), tB = A.at(S, 'biggest', 7.6);
      S.D.figs = [{ x: 1000, y: FL + 10, s: SC, ...GM.ROYAL(2), facing: 1, mood: 'smug', anim: (o, lt) => { if (lt > tP - .6 && lt < tP + .2) { o.pose = 'present'; o.hold = { near: cheque }; } else o.pose = 'stand'; } },
        { x: 1500, y: FL + 10, s: SC, ...GM.GENERAL(), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tP + .2) { o.pose = 'carry'; o.hold = { near: cheque }; o.mood = 'happy'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1600, 400, 900, '255,250,220', .12); for (let k = 0; k < 12; k++) { c.fillStyle = `rgba(255,240,200,${.05 + .04 * Math.sin(lt * 3 + k)})`; c.fillRect((k * 230 + lt * 30) % 2560, 1120 + (k % 3) * 12, 140, 4); } }];
      S.D.over = [CR(), (c, lt) => K.card(c, 'THE NEW BODYGUARD', lt, { at: tBg - .2, until: tU - .3, x: 960, y: 110, px: 46, rot: -2, bg: '#e8b44a' }), (c, lt) => K.card(c, 'AND THE KINGS PAY', lt, { at: tP, until: tU - .3, x: 960, y: 220, px: 40, rot: 2 }),
        (c, lt) => K.card(c, "AL UDEID, QATAR:\nBIGGEST US BASE IN THE MIDDLE EAST", lt, { at: tU - .2, x: 960, y: 140, px: 40, rot: -1, bg: '#c8d0e0' })];
      S.D.sfx = [[tSh, 'whoosh', .25], [tA, 'pop', .2], [tBg, 'drum', .25], [tP, 'paper', .3], [tP + .2, 'coins', .3], [tU, 'chime', .2], [tB, 'whoosh_soft', .25]]; } },
];
