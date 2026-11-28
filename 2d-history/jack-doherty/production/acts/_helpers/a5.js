// JD act 5 - Banned From Golf: $100 to heckle a backswing, walked out and trespassed from the PGA Tour, "harmless prank" vs he still made the cut, the list fills the frame.
// Plates: golf_course (x3: tee, path, green), creator_room (inset), title.
const GOLF = 'golf_course';
for (const n of [GOLF, 'creator_room', 'title']) K.load(n, PL + n + '.jpg');
const FY = 1290;
const rope = (c, lt, y = 1330, x0 = 0, x1 = 2560) => { c.strokeStyle = '#f4f4f0'; c.lineWidth = 6; for (let x = x0; x <= x1; x += 260) { c.fillStyle = '#f4f4f0'; c.fillRect(x - 5, y - 70, 10, 74); } c.beginPath(); for (let x = x0; x <= x1; x += 20) c.lineTo(x, y - 60 + Math.sin((x % 260) / 260 * Math.PI) * 12 + Math.sin(lt * 2 + x * .01) * 2); c.stroke(); };
const sun = (c, lt) => { TW.glow(c, 2150, 150, 900, '255,250,220', .25); A.birds(300, 220, 4, 40, 1.1)(c, lt); };

window.SHOTS = [
  // 5.00 tee box: golfer at the top of his backswing; Jack offers a fan $100; the fan shouts; the note changes hands
  { plate: GOLF, cam: { z: [1.2, 1.32], x: [1280, 1320], y: [880, 900] }, bed: [['birds_loop', .1], ['crowd_loop', .05]], light: { dir: -1, key: 'rgba(255,245,210,.25)' },
    init: S => { const tWM = at(S, 'WM'), tRo = at(S, 'rowdiest'), tOf = at(S, 'offered'), tHu = at(S, 'hundred'), tIn = at(S, 'insult'), tBa = at(S, 'backswing.'), tDi = at(S, 'did'), tPa = at(S, 'paid');
      const swing = lt => { const up = K.seg(lt, tIn - 1.2, tBa), hit = K.seg(lt, tDi + .3, tDi + .6); return { shL: 40 + 120 * up - 200 * hit, elL: -20 - 40 * up, shR: 50 + 110 * up - 200 * hit, elR: -30 - 30 * up }; };
      S.D.figs = [{ x: 760, y: FY, s: 1.3, ...JD.GOLFER(), facing: 1, mood: 'neutral', arms: swing, hold: { near: cc => { cc.save(); unscale(cc); cc.strokeStyle = '#c8c8d0'; cc.lineWidth = 5; cc.beginPath(); cc.moveTo(0, 0); cc.lineTo(0, 150); cc.stroke(); cc.fillStyle = '#2a2a30'; cc.fillRect(-4, 146, 26, 12); cc.restore(); } }, anim: (o, lt) => { if (lt > tDi && lt < tDi + 2) o.mood = 'shock'; else if (lt > tDi + 2) o.mood = 'angry'; } },
        { x: 1500, y: FY + 20, s: 1.3, ...JD.FAN(0), facing: -1, mood: 'happy', anim: (o, lt) => { if (lt > tDi - .1 && lt < tDi + 1.2) { o.arms = () => ({ shL: 150, elL: -150, shR: 150, elR: -150 }); o.talk = true; o.mood = 'angry'; } else if (lt > tPa) { o.pose = 'cheer'; o.mood = 'happy'; } } },
        { x: 1760, y: FY + 30, s: 1.3, ...JD.JACK(), facing: -1, mood: 'smug', talk: [tOf, tIn + .5], anim: (o, lt) => { if (lt > tHu - .2 && lt < tDi) { o.pose = 'reach'; o.hold = NOTE(1.3); } if (lt > tPa - .1 && lt < tPa + 1) { o.pose = 'reach'; } if (lt > tDi && lt < tPa) o.mood = 'happy'; } }];
      S.D.live = [(c, lt) => { sun(c, lt); c.fillStyle = 'rgba(120,180,90,.5)'; c.beginPath(); c.ellipse(760, FY + 10, 300, 40, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(880, FY - 6, 9, 0, 7); c.fill(); }];
      S.D.front = [(c, lt) => rope(c, lt, 1400, 1150, 2560),
        (c, lt) => { const u = K.seg(lt, tPa, tPa + .5); if (u <= 0 || u >= 1) return; const x = 1700 - 200 * u, y = FY - 300 - Math.sin(u * Math.PI) * 60; c.save(); c.translate(x, y); c.rotate(u * 6); c.fillStyle = '#7ab86a'; c.strokeStyle = '#1e4a1e'; c.lineWidth = 3; rr(c, -40, -20, 80, 40, 4); c.fill(); c.stroke(); txt(c, '$100', 0, 0, 22, '#1e4a1e', 'center', 'Anton'); c.restore(); }];
      S.D.over = [(c, lt) => card(c, 'WM PHOENIX OPEN', lt, { at: tWM, x: 420, y: 110, px: 44, rot: -2, bg: GOLD, until: tOf + .5 }), (c, lt) => card(c, "GOLF'S ROWDIEST WEEK", lt, { at: tRo, x: 420, y: 210, px: 36, rot: 2, until: tOf + .5 }),
        (c, lt) => card(c, '$100 TO HECKLE A BACKSWING', lt, { at: tHu, x: 1000, y: 110, px: 46, rot: -1, bg: '#e2342e', color: '#fff', until: 99 }),
        (c, lt) => ntag(c, 560, 260, 'MACKENZIE HUGHES', nameOn(lt, tBa - .4, 2.6)),
        (c, lt) => bubble(c, '#@!%&!!', 1240, 330, lt, tDi, tDi + 1.4, 52, 1160, 470),
        (c, lt) => card(c, 'THE FAN DID IT · JACK PAID UP', lt, { at: tPa - .2, x: 1180, y: 220, px: 36, rot: 1, bg: GOLD, until: 99 })];
      S.D.sfx = [[.3, 'crowd_loop', .05], [tWM, 'pop', .2], [tHu, 'coins', .3], [tIn, 'whoosh_soft', .3], [tDi, 'alarm', .1], [tDi + .05, 'whoosh', .4], [tDi + .2, 'crowd_cheer', .15], [tPa, 'paper', .3], [tPa + .4, 'coins', .2]]; } },

  // 5.01 golf path: official and police walk Jack out; trespassed card; FOREVER? bubbles; list gets PGA TOUR
  { plate: GOLF, cam: { z: [1.05, 1.12], x: [1180, 1260], y: [820, 840] }, bed: [['birds_loop', .08], ['crowd_loop', .06]], light: { dir: -1, key: 'rgba(255,245,210,.22)' },
    init: S => { const tSe = at(S, 'Security'), tWa = at(S, 'walked'), tOf = at(S, 'official'), tTr = at(S, 'trespassed'), tPG = at(S, 'PGA'), tFo = at(S, 'forever?'), tFs = at(S, 'foreseeable');
      const W = (x0, x1, look, mood, k) => ({ x: x1, y: FY + k * 12, s: 1.15, ...look, facing: 1, mood, walk: { x0, x1, t0: .2, dur: Math.max(2.5, tOf - .6) } });
      S.D.figs = [{ ...W(-200, 900, JD.OFFICIAL(), 'neutral', 0), anim: (o, lt) => { if (lt > tOf) { o.facing = 1; o.pose = 'point'; o.talk = lt < tFo || lt > tFs - .2; } } },
        { ...W(-450, 1250, JD.JACK(), 'smug', 1), anim: (o, lt) => { if (lt > tOf) { o.facing = -1; o.mood = 'shock'; } if (lt > tFo - .3 && lt < tFo + 1) { o.pose = 'shrug'; o.talk = true; } } },
        { ...W(-700, 1600, JD.POLICE(), 'angry', 2), anim: (o, lt) => { if (lt > tOf) o.facing = -1; } }];
      S.D.live = [(c, lt) => { sun(c, lt); }];
      S.D.front = [(c, lt) => rope(c, lt, 1420)];
      S.D.over = [(c, lt) => card(c, 'WALKED OUT BY SECURITY AND POLICE', lt, { at: tSe, x: 760, y: 110, px: 40, rot: -1, until: tTr }),
        (c, lt) => card(c, 'TRESPASSED FROM ALL PGA TOUR EVENTS', lt, { at: tTr, x: 760, y: 110, px: 42, rot: 1, bg: '#e2342e', color: '#fff', until: 99 }),
        (c, lt) => JD.stamp(c, 560, 300, .8, 'BANNED', K.seg(lt, tPG, tPG + 1)),
        (c, lt) => bubble(c, 'FOREVER?', 1030, 330, lt, tFo - .2, tFs + 2, 44),
        (c, lt) => bubble(c, 'FOR THE FORESEEABLE\nFUTURE.', 620, 470, lt, tFs - .2, 99, 38),
        (c, lt) => clip(c, lt, 3, 4, tPG + .2, tPG + 1.3, tTr - .3)];
      S.D.sfx = [[.3, 'footsteps', .35], [tWa, 'footsteps', .3], [tOf, 'paper', .2], [tTr, 'stamp', .3], [tPG, 'stamp', .5], [tPG + .4, 'paper', .2], [tFo, 'pop', .2], [tFs, 'thud', .25]]; } },

  // 5.02 split: Jack in his creator room shrugging (inset); the golfer on the green tips his cap; putt drops
  { plate: GOLF, cam: { z: [1.35, 1.45], x: [1500, 1560], y: [860, 870] }, bed: [['birds_loop', .1], ['crowd_loop', .04]], light: { dir: -1, key: 'rgba(255,245,210,.25)' },
    init: S => { const tHa = at(S, 'harmless'), tGo = at(S, 'golfer'), tMa = at(S, 'made'), tCu = at(S, 'cut'), tSl = at(S, 'sleep');
      S.D.figs = [{ x: 1820, y: FY, s: 1.3, ...JD.GOLFER(), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tMa) { o.mood = 'happy'; } if (lt > tCu && lt < tCu + 2.4) o.pose = 'wave'; if (lt > tSl) o.pose = 'shrug'; } }];
      S.D.live = [(c, lt) => { sun(c, lt); c.fillStyle = 'rgba(110,190,90,.6)'; c.beginPath(); c.ellipse(1500, FY + 20, 420, 50, 0, 0, 7); c.fill(); c.fillStyle = '#1a1a1a'; c.beginPath(); c.ellipse(1400, FY + 20, 18, 6, 0, 0, 7); c.fill(); c.strokeStyle = '#ddd'; c.lineWidth = 4; c.beginPath(); c.moveTo(1400, FY + 20); c.lineTo(1400, FY - 200); c.stroke(); c.fillStyle = '#e2342e'; c.beginPath(); c.moveTo(1400, FY - 200); c.lineTo(1400 + 70 + Math.sin(lt * 5) * 8, FY - 175); c.lineTo(1400, FY - 150); c.fill();
          const u = K.seg(lt, tMa - 1.2, tMa); if (u < 1) { c.fillStyle = '#fff'; c.beginPath(); c.arc(1700 - 300 * u, FY + 14, 8, 0, 7); c.fill(); } }];
      S.D.over = [(c, lt) => { const a = E.out(K.seg(lt, .1, .6)); c.save(); c.translate(-(1 - a) * 900, 0); c.fillStyle = INK; rr(c, 40, 150, 820, 560, 20); c.fill(); c.save(); rr(c, 52, 162, 796, 536, 14); c.clip(); c.drawImage(K.imgs.creator_room, 1000, 300, 1400, 940, 52, 162, 796, 536);
          c.fillStyle = 'rgba(40,10,60,.3)'; c.fillRect(52, 162, 796, 536); A.figure(c, { x: 450, y: 660, s: .95, ...JD.JACK(), facing: 1, mood: 'smug', pose: lt > tHa - .3 && lt < tGo ? 'shrug' : 'stand', talk: [0, tGo] }, lt, 0, S); c.restore();
          c.fillStyle = '#e2342e'; rr(c, 64, 174, 90, 36, 8); c.fill(); txt(c, 'VIDEO', 109, 193, 24, '#fff', 'center', 'Anton'); c.restore(); },
        (c, lt) => card(c, '"MOST HARMLESS PRANK"', lt, { at: tHa - .3, x: 450, y: 90, px: 40, rot: -2, bg: '#fff', until: tSl + 3 }),
        (c, lt) => ntag(c, 1440, 160, 'MACKENZIE HUGHES', nameOn(lt, tGo, 3)),
        (c, lt) => card(c, 'HE STILL MADE THE CUT', lt, { at: tCu - .2, x: 1440, y: 260, px: 44, rot: 1, bg: GOLD, until: 99 }),
        (c, lt) => card(c, "DIDN'T LOSE MUCH SLEEP", lt, { at: tSl - .4, x: 1440, y: 360, px: 34, rot: -1, until: 99 })];
      S.D.sfx = [[.2, 'whoosh_soft', .3], [tHa, 'pop', .2], [tMa - 1.2, 'scrape', .1], [tMa, 'pop', .35], [tMa + .2, 'crowd_cheer', .12], [tCu, 'chime', .25], [tSl, 'crowd_cheer', .08]]; } },

  // 5.03 the BANNED list fills the frame; costs climb from a supermarket to a sport; the pen adds another line
  { plate: 'title', cam: { z: [1.1, 1.2], x: [1280, 1300], y: [720, 740] }, bed: [['hum_loop', .07], ['drone', .04]], light: {},
    init: S => { const tBi = at(S, 'bill.'), tSu = at(S, 'supermarket'), tSp = at(S, 'sport.'), tPt = at(S, 'pattern'), tDi = at(S, 'difference'), tLi = at(S, 'list.');
      S.D.live = [(c, lt) => { c.fillStyle = 'rgba(10,6,20,.45)'; c.fillRect(0, 0, 2560, 1440); for (let k = 0; k < 14; k++) TW.sparkle(c, (k * 331) % 2560, (k * 197) % 1440, lt * .4 + k, .4); }];
      S.D.over = [(c, lt) => card(c, 'THE LIST', lt, { at: .2, x: 960, y: 70, px: 48, rot: 0, bg: '#e2342e', color: '#fff', until: 99 }),
        (c, lt) => { const sc = 1.75 + .04 * Math.sin(lt * .6), y = 130 - 40 * K.seg(lt, tDi, tLi + 1); c.save(); c.translate(960, y); c.rotate(Math.sin(lt * .5) * .015); JD.list(c, -150 * sc, 0, sc, LIST, 4, lt);
          const p = K.seg(lt, tLi - .3, tLi + 1.5); if (p > 0) { const px = (-150 + 50 + 200 * p) * sc, py = (136 + 4 * 46) * sc + Math.sin(lt * 40) * 5; c.strokeStyle = '#1a2a5a'; c.lineWidth = 4; c.beginPath(); for (let k = 0; k <= 30 * p; k++) c.lineTo((-150 + 50 + k * 200 / 30) * sc, py - 8 + Math.sin(k * 1.7) * 9); c.stroke(); c.save(); c.translate(px, py); c.rotate(.7); c.fillStyle = '#2a2a34'; rr(c, -9, -110, 18, 110, 4); c.fill(); c.fillStyle = '#e8c040'; c.fillRect(-9, -110, 18, 18); c.restore(); } c.restore(); },
        (c, lt) => card(c, 'SUPERMARKET STUNT = 1 SUPERMARKET', lt, { at: tSu, x: 400, y: 330, px: 32, rot: -3, until: 99 }),
        (c, lt) => card(c, 'GOLF HECKLE = A WHOLE SPORT', lt, { at: tSp - .3, x: 1520, y: 330, px: 32, rot: 3, bg: '#e2342e', color: '#fff', until: 99 }),
        (c, lt) => card(c, 'SAME PATTERN AS 2017', lt, { at: tPt, x: 400, y: 520, px: 34, rot: 2, bg: GOLD, until: 99 }),
        (c, lt) => card(c, 'NOW THEY KEEP A LIST', lt, { at: tLi - .4, x: 1520, y: 520, px: 34, rot: -2, bg: GOLD, until: 99 })];
      S.D.sfx = [[.3, 'paper', .3], [tBi, 'tick', .25], [tSu, 'pop', .2], [tSp, 'thud', .35], [tPt, 'pop', .2], [tLi - .3, 'scrape', .3], [tLi + .3, 'scrape', .2]]; } },
];
