// RP act 9 - Batman or Bond?: the diary clash, the studios' silence, full circle from petitions to 007, the question, end card.
// Plates: office, boardroom, protest_street, stage_blue, title (end card). No stand-ins.
const P = { office: 'office', board: 'boardroom', street: 'protest_street', stage: 'stage_blue', end: 'title' };
for (const n of new Set(Object.values(P))) K.load(n, PL + n + '.jpg');
endTitle(6);
const rr = TW.rr, txt = TW.txt;
// ---- name tag (world space): gold tile with a pointer
const ntag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7); txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); c.restore(); };
// DOUBTERS vs BELIEVERS scoreboard, screen space top-left
const BOARD = v => (c, lt) => RP.board(c, 200, 95, .8, typeof v === 'function' ? v(lt) : v);
const flashes = (c, lt, n = 30, y0 = 280, h = 560) => { for (let k = 0; k < n; k++) { const ph = (lt * .5 + k * .37) % 1; if (ph < .25) TW.glow(c, (k * 397) % 2560, y0 + (k * 131) % h, 70, '255,255,255', .45 * Math.sin(ph / .25 * Math.PI)); } };
const rain = (c, lt, n = 140) => { c.save(); c.strokeStyle = 'rgba(200,215,235,.3)'; c.lineWidth = 2; for (let k = 0; k < n; k++) { const x = (k * 173 + lt * 300) % 2700 - 70, y = (k * 97 + lt * 1400) % 1500 - 60; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 10, y + 40); c.stroke(); } c.restore(); };
const dust = (c, lt, n = 40, col = '255,240,210') => { for (let k = 0; k < n; k++) { const x = (k * 263 + lt * 12 * (1 + k % 3)) % 2560, y = (k * 151 + Math.sin(lt * .7 + k) * 40) % 1300 + 60; c.fillStyle = `rgba(${col},${.12 + .1 * Math.sin(lt * 2 + k)})`; c.fillRect(x, y, 4, 4); } };
// coat stand with a hanger holding a small bow tie (running device)
const coatStand = (c, x, y, lt, s = 1) => { c.save(); c.strokeStyle = '#3a2a1e'; c.lineWidth = 12 * s; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 420 * s); c.moveTo(x - 60 * s, y); c.lineTo(x + 60 * s, y); c.moveTo(x, y - 400 * s); c.lineTo(x - 50 * s, y - 440 * s); c.moveTo(x, y - 400 * s); c.lineTo(x + 50 * s, y - 440 * s); c.stroke();
  const sw = Math.sin(lt * 1.3) * .05; c.translate(x + 50 * s, y - 440 * s); c.rotate(sw); c.strokeStyle = '#bbb'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 16 * s); c.moveTo(-40 * s, 46 * s); c.lineTo(0, 16 * s); c.lineTo(40 * s, 46 * s); c.lineTo(-40 * s, 46 * s); c.stroke(); RP.bowtie(c, 0, 58 * s, 1.1 * s, 0, .5 + .5 * Math.sin(lt * 2)); c.restore(); };
const easeV = (lt, t0, a, b, d = .8) => a + (b - a) * E.io(K.seg(lt, t0, t0 + d));
const DIARY = { near: cc => { cc.fillStyle = '#7a2a2a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-22, -30, 44, 56); cc.strokeRect(-22, -30, 44, 56); cc.fillStyle = '#f2e8d0'; cc.fillRect(18, -26, 4, 48); cc.fillStyle = '#d8b64a'; cc.fillRect(-14, -8, 28, 6); } };
// whiteboard with a year timeline (world space). bars appear at times
const timeline = (c, lt, tB, tF, tBo, tCl) => { const x0 = 1080, x1 = 2340, y0 = 440, y1 = 1000; c.save();
  c.strokeStyle = '#8a8a92'; c.lineWidth = 12; c.beginPath(); c.moveTo(x0 + 80, y1); c.lineTo(x0 + 40, 1330); c.moveTo(x1 - 80, y1); c.lineTo(x1 - 40, 1330); c.stroke();
  c.fillStyle = '#f4f4f0'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(x0, y0, x1 - x0, y1 - y0); c.strokeRect(x0, y0, x1 - x0, y1 - y0);
  const yr = ['2026', '2027', '2028'], cx = i => x0 + 140 + i * 400; yr.forEach((y, i) => { txt(c, y, cx(i) + 200, y0 + 60, 48, '#3a3a44', 'center', 'Anton'); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx(i), y0 + 100); c.lineTo(cx(i), y1 - 30); c.stroke(); });
  const bar = (t, xa, xb, y, col, label) => { const u = E.out(K.seg(lt, t, t + .8)); if (u <= 0) return; c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; rr(c, xa, y, (xb - xa) * u, 90, 14); c.fill(); c.stroke(); if (u > .6) txt(c, label, xa + 20, y + 46, 38, '#fff', 'left', 'Anton'); };
  bar(tB, cx(0) + 120, cx(2) - 20, y0 + 130, '#3a3a48', 'BATMAN PART II · FILMING');
  const m = pop(lt, tF, .4); if (m > 0) { c.fillStyle = JH.RED; c.beginPath(); c.arc(cx(2) + 80, y0 + 175, 24 * m, 0, 7); c.fill(); txt(c, 'IN CINEMAS', cx(2) + 200, y0 + 300, 40 * m, JH.RED, 'center', 'Anton'); txt(c, 'FEB 2028', cx(2) + 200, y0 + 350, 40 * m, JH.RED, 'center', 'Anton'); }
  bar(tBo, cx(1) + 20, cx(2) - 40, y0 + 270, '#b8902a', 'BOND · SHOOTS 2027');
  if (lt > tCl) { const p = .5 + .5 * Math.sin(lt * 8); c.strokeStyle = `rgba(230,50,40,${.6 + .4 * p})`; c.lineWidth = 8; c.setLineDash([16, 10]); c.strokeRect(cx(1) + 10, y0 + 115, 380, 260); c.setLineDash([]); }
  c.restore(); };

window.SHOTS = [
  // 9.00 the diary problem: Rob studies a whiteboard timeline; Batman and Bond overlap in 2027
  { plate: P.office, cam: { z: [1.2, 1.32], x: [1380, 1480], y: [900, 930] }, bed: [['office_loop', .1]], light: { dir: 1, key: 'rgba(255,230,200,.12)' },
    init: S => { const tPr = A.at(S, 'problem.', 1.6), tBa = A.at(S, 'Batman', 2.2), tFe = A.at(S, 'February', 5.6), tBo = A.at(S, 'Bond', 7.8), tSh = A.at(S, 'shooting', 9.0), tTo = A.at(S, 'too.', 10.6);
      S.D.figs = [{ x: 760, y: 1330, s: 1.9, ...RP.ROB('casual'), facing: 1, mood: 'neutral', walk: { x0: -200, x1: 760, t0: .1, dur: 2.0 }, anim: (o, lt) => { if (lt > tBa) o.pose = 'point'; if (lt > tBo) { o.pose = 'think'; o.mood = 'shocked'; } if (lt > tTo) { o.pose = 'shrug'; o.mood = 'sad'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1700, 700, 800, '255,240,220', .1); timeline(c, lt, tBa, tFe, tBo, tSh + .3); }];
      S.D.front = [(c, lt) => TW.stamp(c, 'CLASH!', 1900, 960, lt, tSh + .3, { px: 80 })];
      S.D.over = [BOARD(1), (c, lt) => K.card(c, 'ONE BIG PROBLEM', lt, { at: tPr - .3, x: 600, y: 150, px: 52, rot: -2, bg: JH.GOLD })];
      S.D.sfx = [[.2, 'footsteps', .2], [tPr, 'tension', .25], [tBa, 'scrape', .2], [tFe, 'pop', .2], [tBo, 'scrape', .2], [tSh + .3, 'stamp', .35], [tTo, 'thud', .2]]; } },
  // 9.01 two studios, one diary: execs either side shrug; Rob holds the one diary
  { plate: P.board, cam: { z: [1.2, 1.3], x: [1280, 1280], y: [960, 990] }, bed: [['hum_loop', .08], ['office_loop', .06]], light: { dir: -1, key: 'rgba(200,210,255,.12)' },
    init: S => { const tN = A.at(S, 'Neither', .4), tSh = A.at(S, 'share', 2.4), tO = A.at(S, 'One', 3.8), tTw = A.at(S, 'two', 4.6), tDi = A.at(S, 'diary.', 7.8);
      S.D.figs = [{ x: 620, y: 1400, s: 1.85, ...RP.EXEC(0), facing: 1, mood: 'neutral', anim: (o, lt) => { if (lt > tSh) { o.pose = 'shrug'; o.mood = 'sad'; } if (lt > tTw) { o.pose = 'point'; o.mood = 'neutral'; } } },
        { x: 1280, y: 1400, s: 1.9, ...RP.ROB('casual'), facing: 1, mood: 'neutral', hold: DIARY, anim: (o, lt) => { o.facing = Math.sin(lt * 1.6) > 0 ? 1 : -1; if (lt > tO) o.mood = 'shocked'; if (lt > tDi) { o.arms = () => ({ shR: 150, elR: -20 }); o.mood = 'neutral'; } } },
        { x: 1940, y: 1400, s: 1.85, ...RP.EXEC(2), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tSh + .2) { o.pose = 'shrug'; o.mood = 'sad'; } if (lt > tTw + .3) { o.pose = 'point'; o.mood = 'neutral'; } } }];
      S.D.live = [(c, lt) => { TW.glow(c, 1280, 500, 900, '120,160,255', .1); dust(c, lt, 25); }];
      S.D.front = [(c, lt) => ntag(c, 'BATMAN STUDIO', 620, 820, lt, tN, { px: 30, col: '#f2ead8' }), (c, lt) => ntag(c, 'BOND STUDIO', 1940, 820, lt, tN + .3, { px: 30, col: '#f2ead8' }),
        (c, lt) => { for (const [x, t] of [[760, tSh], [2080, tSh + .2]]) { const a = pop(lt, t, .3) * (1 - K.seg(lt, tTw - .3, tTw)); if (a > 0) txt(c, '?', x, 640 - 10 * Math.sin(lt * 3), 110 * a, '#fff', 'center', 'Anton'); } }];
      S.D.over = [BOARD(1), (c, lt) => K.card(c, 'NO PLAN ANNOUNCED', lt, { at: tN, x: 960, y: 140, px: 50, rot: -2, until: tO }),
        (c, lt) => K.card(c, 'ONE MAN', lt, { at: tO, x: 520, y: 150, px: 52, rot: -3 }), (c, lt) => K.card(c, 'TWO FRANCHISES', lt, { at: tTw, x: 980, y: 150, px: 52, rot: 2 }), (c, lt) => K.card(c, 'ONE DIARY', lt, { at: tDi - .2, x: 1440, y: 150, px: 52, rot: -2, bg: JH.GOLD })];
      S.D.sfx = [[tN, 'whoosh_soft', .2], [tSh, 'pop', .2], [tSh + .2, 'pop', .2], [tO, 'drum', .25], [tTw, 'drum', .25], [tDi, 'paper', .3]]; } },
  // 9.02 full circle: petitioners outside the cinema (2019) -> camera slides to 007 under the marquee; fans cheer; fifteen years
  { plate: P.street, cam: { z: [1.35, 1.2], x: [900, 1500], y: [900, 860], ease: u => u < .3 ? u * .1 : .03 + E.io(K.seg(u, .3, .45)) * .97 }, bed: [['rain_loop', .14], ['city_loop', .08]], light: { dir: -1, key: 'rgba(180,200,255,.15)' },
    init: S => { const tTh = A.at(S, 'think', .7), tSe = A.at(S, 'Seven', 2.5), tPe = A.at(S, 'petitions', 3.7), tCa = A.at(S, 'cape.', 5.4), tNo = A.at(S, 'Now', 6.0), tFa = A.at(S, 'face', 6.9), tSp = A.at(S, 'spy.', 9.2), tLu = A.at(S, 'lucky.', 10.6), tFi = A.at(S, 'fifteen', 11.4), tSt = A.at(S, 'strange', 13.1), tGr = A.at(S, 'great', 14.2), tNb = A.at(S, 'nobody', 16.2);
      const crowd = [0, 1, 2, 3, 4].map(i => ({ x: 360 + i * 230, y: 1250, s: 1.6, ...RP.FAN(i), facing: 1, mood: 'neutral', seed: 600 + i, anim: (o, lt) => { o.lean = Math.sin(lt * 2 + i) * 2; if (lt < tNo) { if (i === 1) { o.arms = () => ({ shR: 60, elR: -40, handR: 'fist' }); o.hold = lt > tPe ? { near: cc => { cc.save(); const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); RP.scroll(cc, 0, 0, 120, 60 + 200 * E.out(K.seg(lt, tPe, tCa)), .8); cc.restore(); } } : null; } else if (i % 2 === 0) { o.arms = () => ({ shR: 160 + 6 * Math.sin(lt * 5 + i), elR: 0, handR: 'fist' }); const T = ['NO!', 'NOT HIM', 'NO BAT'][i / 2]; o.hold = lt > tPe + i * .15 ? { near: cc => SIGN(cc, T) } : null; } } else o.hold = null; if (lt > tNo + .6) { o.facing = 1; o.mood = 'happy'; o.pose = 'cheer'; o.arms = null; } } }));
      S.D.figs = [...crowd, { x: 1900, y: 1250, s: 1.8, ...RP.ROB('tux', { bow: 1 }), facing: -1, mood: 'smug', anim: (o, lt) => { if (lt > tSp) o.pose = 'wave'; if (lt > tFi) { o.pose = 'stand'; o.mood = 'happy'; } if (lt > tNb) o.pose = 'cheer'; } }];
      const SIGN = (cc, t) => { cc.save(); const m = cc.getTransform(); cc.setTransform(Math.hypot(m.a, m.b), 0, 0, Math.hypot(m.c, m.d), m.e, m.f); cc.strokeStyle = '#6a4a2a'; cc.lineWidth = 7; cc.beginPath(); cc.moveTo(0, 40); cc.lineTo(0, -150); cc.stroke(); cc.fillStyle = '#f2ead8'; cc.strokeStyle = INK; cc.lineWidth = 4; cc.fillRect(-95, -250, 190, 105); cc.strokeRect(-95, -250, 190, 105); txt(cc, t, 0, -197, 34, JH.RED, 'center', 'Anton'); cc.restore(); };
      const sign = (c, x, y, t, a) => { if (a <= 0) return; c.save(); c.strokeStyle = '#6a4a2a'; c.lineWidth = 8; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 260); c.stroke(); c.fillStyle = '#f2ead8'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - 110, y - 380, 220, 120); c.strokeRect(x - 110, y - 380, 220, 120); txt(c, t, x, y - 320, 40, JH.RED, 'center', 'Anton'); c.restore(); };
      S.D.live = [(c, lt) => { const m = K.seg(lt, tNo, tNo + .6); c.save(); c.fillStyle = '#121216'; c.fillRect(820, 345, 920, 110); for (let k = 0; k < 20; k++) { c.fillStyle = (k + Math.floor(lt * 5)) % 3 ? 'rgba(255,220,120,.9)' : 'rgba(255,220,120,.3)'; c.beginPath(); c.arc(840 + k * 46, 340, 6, 0, 7); c.fill(); c.beginPath(); c.arc(840 + k * 46, 462, 6, 0, 7); c.fill(); }
          txt(c, lt < tNo ? 'NO CAPE FOR HIM!' : 'BRITAIN’S NEW 007', 1280, 402, 64, lt < tNo ? '#ff8a7a' : '#f2d06a', 'center', 'Anton'); c.restore(); TW.glow(c, 1280, 400, 500, '255,210,120', .15 + .25 * m); TW.glow(c, 1900, 900, 380, '255,240,200', .3 * m); }];
      S.D.front = [(c, lt) => { if (lt > tNo + .6) flashes(c, lt, 25, 800, 400); }, (c, lt) => rain(c, lt, 90)];
      S.D.over = [BOARD(1), (c, lt) => K.card(c, '2019: PETITIONS', lt, { at: tSe, x: 560, y: 150, px: 50, rot: -2, until: tNo }), (c, lt) => K.card(c, 'NOW: THE FACE OF 007', lt, { at: tFa, x: 1000, y: 150, px: 52, rot: 2, bg: JH.GOLD, until: tFi - .2 }),
        (c, lt) => K.card(c, 'NOT LUCK', lt, { at: tLu - .3, x: 520, y: 290, px: 44, rot: -3, until: tFi - .2 }),
        (c, lt) => K.card(c, '15 YEARS', lt, { at: tFi, x: 480, y: 150, px: 50, rot: -2 }), (c, lt) => K.card(c, 'STRANGE CHOICES', lt, { at: tSt, x: 930, y: 150, px: 46, rot: 2 }), (c, lt) => K.card(c, 'GREAT DIRECTORS', lt, { at: tGr, x: 1400, y: 150, px: 46, rot: -2 }),
        (c, lt) => TW.stamp(c, 'NOBODY COULD SAY NO', 960, 330, lt, tNb, { px: 70, col: '#3ad06a' })];
      S.D.sfx = [[tTh, 'whoosh_soft', .2], [tPe, 'paper_tear', .2], [tPe + .2, 'crowd_loop', .15], [tNo, 'whoosh', .3], [tNo + .4, 'crowd_cheer', .3], [tNo + .6, 'camera_shutter', .25], [tFi, 'chime', .25], [tSt, 'pop', .2], [tGr, 'pop', .2], [tNb, 'stamp', .35], [tNb + .3, 'crowd_cheer', .2]]; } },
  // 9.03 the question: Batman (left) or Bond (right)? comment + subscribe
  { plate: P.stage, cam: { z: [1.15, 1.25], x: [1280, 1280], y: [700, 720] }, bed: [['hum_loop', .08]], light: { dir: 1, key: 'rgba(200,210,255,.12)' },
    init: S => { const tBa = A.at(S, 'Batman', .6), tBo = A.at(S, 'Bond?', 1.4), tPi = A.at(S, 'pick', 3.0), tCo = A.at(S, 'comments,', 6.2), tSu = A.at(S, 'subscribe', 7.0), tEnd = A.at(S, 'this.', 11.6);
      const leave = tEnd + .3;
      S.D.figs = [{ x: 920, y: 890, s: 1.65, ...RP.ROB('bat'), facing: 1, mood: 'smug', walk: { x0: 920, x1: -300, t0: leave, dur: 3.2 }, anim: (o, lt) => { if (lt > tBa && lt < tBo + .8) o.pose = 'wave'; if (lt > tPi && lt < leave) o.pose = 'point'; } },
        { x: 1640, y: 890, s: 1.65, ...RP.ROB('tux', { bow: 1 }), facing: -1, mood: 'smug', walk: { x0: 1640, x1: 2860, t0: leave, dur: 3.2 }, anim: (o, lt) => { if (lt > tBo && lt < tPi) o.pose = 'wave'; if (lt > tPi && lt < leave) o.pose = 'point'; } }];
      S.D.live = [(c, lt) => { const x = lt < leave ? 920 : 920 - 1220 * K.clamp((lt - leave) / 3.2); c.save(); c.translate(x, 0); c.scale(.6, 1); c.translate(-x, 0); RP.cape(c, x, 890, 1.65, lt, 1); c.restore(); },
        (c, lt) => { TW.glow(c, 920, 700, 420, '120,140,200', .25 * pop(lt, tBa, .4)); TW.glow(c, 1640, 700, 420, '255,210,130', .3 * pop(lt, tBo, .4)); }];
      S.D.over = [BOARD(1), (c, lt) => K.card(c, 'BATMAN', lt, { at: tBa, x: 260, y: 330, px: 60, rot: -3, bg: '#3a3a48', color: '#fff', until: leave }), (c, lt) => K.card(c, 'OR', lt, { at: tBo - .3, x: 960, y: 200, px: 50, until: leave }),
        (c, lt) => K.card(c, 'BOND?', lt, { at: tBo, x: 1680, y: 330, px: 60, rot: 3, bg: JH.GOLD, until: leave }),
        (c, lt) => K.card(c, 'TELL US IN THE COMMENTS ↓', lt, { at: tCo, x: 960, y: 740, px: 44, rot: -1, until: leave }),
        (c, lt) => K.card(c, '▶ SUBSCRIBE', lt, { at: tSu, x: 1500, y: 110, px: 46, rot: 2, bg: JH.RED, color: '#fff', until: leave })];
      S.D.sfx = [[tBa, 'whoosh_soft', .2], [tBo, 'whoosh_soft', .2], [tPi, 'tension', .2], [tCo, 'pop', .3], [tSu, 'chime', .3], [leave, 'footsteps', .2]]; } },
  // 9.04 end card hold: calm title plate, no text, no speech (YouTube end screen)
  { plate: P.end, cam: { z: [1.2, 1.3], x: [1350, 1250], y: [740, 700] }, bed: [['hum_loop', .05]], sub: 'off', light: {},
    init: S => { S.D.live = [(c, lt) => { for (let k = 0; k < 24; k++) TW.sparkle(c, (k * 331) % 2560, (k * 197) % 1440, lt + k, .5 + .3 * Math.sin(lt + k)); }]; } },
];
