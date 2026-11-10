// ---- act 10 plates. Stand-in until the painted plate lands: swap the right-hand name (and re-check floor/ground strip) when it appears.
const P_WH = 'white_house_night';
for (const n of ['office', 'newsroom', 'boardroom', P_WH, 'worldmap']) K.load(n, PL + n + '.jpg');
const txtA = TW.txt, rrA = TW.rr;
const driftA = (name, b = .45, blur = 6) => (c, lt, u) => { c.save(); c.filter = `blur(${blur}px) brightness(${b})`; const s2 = (1.08 + .06 * u) * 1920 / 2560; c.setTransform(s2, 0, 0, s2, 960 - (1280 + 60 * u) * s2, 540 - 720 * s2); c.drawImage(K.imgs[name], 0, 0, 2560, 1440); c.restore(); K.screen(c); };
// phone held up to read (in the hand frame), screen glows
const phoneA = (cc, lt) => TW.phone(cc, 0, -6, .36, (q, w, h) => { q.fillStyle = '#f4f6fa'; q.fillRect(0, 0, w, h); q.fillStyle = '#2a2840'; q.fillRect(0, 0, w, 30); for (let k = 0; k < 6; k++) { q.fillStyle = '#b8bcc8'; q.fillRect(10, 44 + k * 26, w - 20 - (k * 13 % 30), 8); } });
const READ = () => ({ shR: 40, elR: -105, handR: 'relaxed', shL: 10, elL: -10 });
// floating dust motes in screen space
const motesA = (c, lt, col = '255,240,210') => { for (let k = 0; k < 40; k++) { const x = (k * 197.3 + lt * (8 + k % 5 * 3)) % 1920, y = (k * 131.7 + Math.sin(lt * .4 + k) * 40) % 1080; c.fillStyle = `rgba(${col},${.12 + .12 * Math.sin(lt * 1.5 + k)})`; c.beginPath(); c.arc(x, y, 1.5 + k % 3, 0, 7); c.fill(); } };
// folder that drops onto a surface (world space)
const folderA = (c, x, y, s, lt, at, label, col = '#d8b46a') => { const u = K.seg(lt, at, at + .4); if (u <= 0) return; const dy = (1 - E.out(u)) * -260; c.save(); c.translate(x, y + dy); c.scale(s, s * .55); c.rotate(-.08); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-150, -90, 310, 200); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(-160, -100, 310, 200); c.strokeRect(-160, -100, 310, 200); c.fillRect(-160, -130, 120, 30); c.strokeRect(-160, -130, 120, 30);
  txtA(c, label, -5, 0, 40, '#3a2a10', 'center', 'Anton'); c.restore(); };
// tear-off day page with a label strip under it
const dayA = (c, x, y, day, label, col, lt, at) => { const a = TW.pop(lt, at, .45); if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a * .75, a * .75); JH.calendar(c, 0, 0, .8, day, 'NOV', { rot: (day.length % 2 ? -.03 : .03) }); c.font = '34px Anton'; const w = c.measureText(label).width + 30; c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; rrA(c, -w / 2, 104, w, 50, 10); c.fill(); c.stroke(); txtA(c, label, 0, 130, 34, '#fff', 'center', 'Anton'); c.restore(); };

window.SHOTS = [
  // 10.01 Sunday: the staff email types out line by line over the dark office; staff stand reading it on their phones
  { plate: 'office', cam: { z: [1.12, 1.24], x: [1500, 1560], y: [900, 920] }, bed: [['office_loop', .1], ['hum_loop', .1]], light: { dir: 1, key: 'rgba(170,200,255,.2)' },
    init: S => { const tSu = A.at(S, 'Sunday', .9), tE = A.at(S, 'email', 2.6), tO = A.at(S, 'owe', 6.3), tU = A.at(S, 'was', 10.0), tAc = A.at(S, 'actions', 12.3), tTh = A.at(S, 'There', 14.8);
      const L = [['I owe my family and all of you an apology.', tO - .3], ['I was unfaithful to my wife.', tU - .3], ['My actions hurt her and our children.', tAc - .3], ['There is no excuse for what I did.', tTh - .2]];
      S.D.figs = [{ x: 1780, y: 1380, s: 1.55, ...JH.EXEC(0), facing: 1, mood: 'focus', hold: { near: phoneA }, arms: READ, anim: (o, lt) => { if (lt > tU) o.mood = 'shocked'; } },
        { x: 2140, y: 1395, s: 1.55, ...JH.WOMAN(2), facing: -1, mood: 'neutral', hold: { near: phoneA }, arms: READ, anim: (o, lt) => { if (lt > tU + .4) o.mood = 'sad'; } },
        { x: 2450, y: 1385, s: 1.55, ...JH.ENGINEER(1), facing: -1, mood: 'neutral', walk: { x0: 2950, x1: 2450, t0: tE - .4, dur: 2.2 }, anim: (o, lt) => { if (lt > tE + 2) o.pose = 'think'; if (lt > tAc) o.mood = 'worried'; } }];
      S.D.live = [(c, lt) => { for (const [x, y] of [[1840, 1060], [2200, 1070]]) TW.glow(c, x, y, 160, '190,220,255', .22 + .06 * Math.sin(lt * 3 + x)); TW.glow(c, 2300, 760, 380, '120,170,255', .12); }];
      S.D.over = [(c, lt) => K.card(c, 'SUNDAY', lt, { at: tSu, x: 1500, y: 110, px: 54, rot: 2 }),
        (c, lt) => { const a = TW.pop(lt, tE - .3, .5); if (a <= 0) return; c.save(); c.translate(560, 420); c.scale(a, a); c.translate(-560, -420); JH.email(c, 60, 150, 1040, 420, L, lt, { title: 'From: Jensen   To: everyone at Nvidia', subject: 'A personal note', px: 36, cps: 30 }); c.restore(); },
        (c, lt) => K.card(c, 'THE EMAIL', lt, { at: tE + .2, x: 260, y: 100, px: 46, rot: -3 })];
      S.D.sfx = [[tSu, 'pop', .2], [tE - .3, 'chime', .3], [tE, 'pop', .15], ...L.map(([, t]) => [t + .1, 'typing', .22]), [tE - .4, 'footsteps', .2], [tTh + 1.4, 'tick', .2]]; } },
  // 10.02 'NORMAL' ten days earlier vs the apology now; the woman's name stays blacked out; the name goes to the board in a sealed envelope
  { draw: driftA('newsroom', .4, 7), bed: [['hum_loop', .12], ['tension', .1]],
    init: S => { const tT = A.at(S, 'Ten', .3), tN = A.at(S, 'normal', 3.4), tD = A.at(S, "doesn't", 4.2), tAc = A.at(S, 'According', 6.0), tB = A.at(S, 'board', 9.0);
      S.D.over = [(c, lt, u) => motesA(c, lt),
        (c, lt) => { const sl = E.io(K.seg(lt, tT, tT + .7)), o = 1 - K.seg(lt, tD - .2, tD + .2); if (o <= 0) return; c.save(); c.globalAlpha = o; c.translate(-(1 - sl) * 900, 0); K.card(c, '10 DAYS EARLIER\nHE CALLED IT ALL\nCOMPLETELY NORMAL', lt, { at: tT, x: 520, y: 420, px: 56, rot: -2 }); c.restore(); },
        (c, lt) => { const sl = E.io(K.seg(lt, tT + .6, tT + 1.3)), o = 1 - K.seg(lt, tD - .2, tD + .2); if (o <= 0) return; c.save(); c.globalAlpha = o; c.translate((1 - sl) * 900, 0); JH.quote(c, 'I OWE MY FAMILY|AND ALL OF YOU|AN APOLOGY', 'JENSEN · SUNDAY', 1400, 420, lt, tT + .6, { px: 58, rot: .03 }); c.restore(); },
        (c, lt) => { const a = TW.pop(lt, tN - .2, .3); if (a <= 0 || lt > tD + .2) return; c.save(); c.translate(960, 420); c.scale(a, a); c.fillStyle = INK; c.beginPath(); c.arc(0, 0, 60, 0, 7); c.fill(); txtA(c, 'VS', 0, 4, 54, JH.GOLD, 'center', 'Anton'); c.restore(); },
        (c, lt) => { const a = E.out(K.seg(lt, tD, tD + .5)); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(0, (1 - a) * 60); JH.doc(c, 220, 170, 780, 480, { title: 'THE WOMAN', lines: ['Name:', '~', '~'], redact: { i: 0, reveal: 0, x: 150, w: 420, name: '' } }, lt); c.restore(); },
        (c, lt) => TW.stamp(c, 'NOT NAMED', 610, 560, lt, tD + .7, { px: 64, col: '#3a3a44' }),
        (c, lt) => JH.src(c, 'THE NEW YORK TIMES', 1440, 200, lt, tAc, { px: 30 }),
        (c, lt) => { // sealed envelope slides into a folder marked THE BOARD
          const a = TW.pop(lt, tB - 1.6, .45); if (a <= 0) return; c.save(); c.translate(1440, 500); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rrA(c, -230, -150, 470, 330, 14); c.fill(); c.fillStyle = '#c89a50'; c.strokeStyle = INK; c.lineWidth = 6; rrA(c, -240, -160, 470, 330, 14); c.fill(); c.stroke(); c.fillRect(-240, -196, 170, 40); c.strokeRect(-240, -196, 170, 40);
          const m = E.io(K.seg(lt, tB - .6, tB + .3)); c.save(); c.beginPath(); c.rect(-300, -400, 600, 470 + (1 - m) * 400); c.clip(); XU.letter(c, 0, -260 + m * 240, 1.3, -.05); c.fillStyle = JH.RED; c.beginPath(); c.arc(0, -250 + m * 240, 22, 0, 7); c.fill(); c.restore();
          c.fillStyle = '#b8883e'; rrA(c, -240, 20, 470, 150, 10); c.fill(); c.stroke(); txtA(c, 'THE BOARD', -5, 96, 60, '#3a2408', 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[tT, 'whoosh', .3], [tT + .6, 'whoosh', .3], [tN - .2, 'drum', .25], [tD, 'paper', .25], [tD + .7, 'stamp', .3], [tAc, 'pop', .2], [tB - 1.6, 'pop', .2], [tB - .2, 'paper', .3]]; } },
  // 10.03 the boardroom at night: directors and outside lawyers arrive; folders land on the table; BACKS HIM TO STAY
  { plate: 'boardroom', cam: { z: [1.02, 1.14], x: [1280, 1300], y: [800, 820] }, bed: [['hum_loop', .12], ['city_loop', .08]], light: { dir: 1, key: 'rgba(180,200,255,.2)' },
    init: S => { const tI = A.at(S, 'investigation', 1.6), tIn = A.at(S, 'independent', 3.3), tO = A.at(S, 'outside', 4.9), tR = A.at(S, 'reason', 7.7), tBk = A.at(S, 'backs', 11.3);
      S.D.figs = [{ x: 300, y: 1390, s: 1.6, ...JH.EXEC(3), facing: 1, mood: 'focus', walk: { x0: -300, x1: 300, t0: .1, dur: 2.0 }, anim: (o, lt) => { if (lt > tR) o.pose = 'present'; if (lt > tBk) { o.pose = 'stand'; o.mood = 'neutral'; } } },
        { x: 2260, y: 1390, s: 1.6, ...JH.WOMAN(0), facing: -1, mood: 'neutral', walk: { x0: 2900, x1: 2260, t0: tIn - 1.8, dur: 1.9 }, anim: (o, lt) => { if (lt > tIn + .3) o.pose = 'think'; if (lt > tBk) { o.pose = 'stand'; o.mood = 'happy'; } } },
        { x: 2000, y: 1300, s: 1.5, ...JH.EXEC(0), facing: -1, mood: 'focus', walk: { x0: 2800, x1: 2000, t0: tO - 1.6, dur: 2.0 }, hold: { far: cc => { cc.fillStyle = '#5a3a20'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-30, -6, 60, 46); cc.strokeRect(-30, -6, 60, 46); } }, anim: (o, lt) => { if (lt > tBk) o.pose = 'shrug'; } }];
      S.D.live = [(c, lt) => { for (let k = 0; k < 24; k++) { const x = 700 + (k * 233) % 1700, y = 300 + (k * 97) % 380; if (Math.sin(lt * 1.3 + k * 2.1) > .4) { c.fillStyle = 'rgba(255,220,140,.5)'; c.fillRect(x, y, 6, 8); } } TW.glow(c, 150, 600, 300, '90,220,140', .14 + .05 * Math.sin(lt * 2));
        folderA(c, 1180, 960, .75, lt, tI, 'INVESTIGATION'); folderA(c, 1420, 1020, .75, lt, tO, 'OUTSIDE COUNSEL', '#c8c0aa'); }];
      S.D.over = [(c, lt) => K.card(c, 'BOARD INVESTIGATION', lt, { at: tI, x: 520, y: 130, px: 52, rot: -2 }), (c, lt) => K.card(c, 'INDEPENDENT DIRECTORS\n+ OUTSIDE LAWYERS', lt, { at: tIn, x: 1400, y: 150, px: 40, rot: 2 }),
        (c, lt) => K.card(c, 'NO REASON TO BELIEVE\nANY SECRETS WERE LOST', lt, { at: tR, x: 960, y: 330, px: 44, rot: -1, until: tBk + .2 }), (c, lt) => TW.stamp(c, 'BACKS HIM TO STAY', 960, 340, lt, tBk, { px: 76, col: '#2a8a3a' })];
      S.D.sfx = [[.1, 'footsteps', .2], [tI + .3, 'thud', .25], [tIn - 1.8, 'footsteps', .2], [tIn, 'pop', .2], [tO + .3, 'thud', .25], [tR, 'pop', .2], [tBk, 'stamp', .35]]; } },
  // 10.04 that night at a rope line: a reporter asks; the president answers 'No, I don't think so'
  { plate: P_WH, cam: { z: [1.15, 1.28], x: [1300, 1340], y: [900, 920] }, bed: [['night_loop', .12], ['crowd_loop', .08]], light: { dir: -1, key: 'rgba(255,230,200,.2)' },
    init: S => { const tTn = A.at(S, 'night', .4), tA = A.at(S, 'asks', 1.7), tNo = A.at(S, "'no'", 6.0), tH = A.at(S, 'honourable', 10.2), tC = A.at(S, 'CEO', 13.7);
      S.D.figs = [{ x: 1700, y: 1340, s: 1.5, ...JH.PRESIDENT(), facing: -1, mood: 'neutral', walk: { x0: 2800, x1: 1700, t0: .1, dur: 1.4 }, talk: [tNo - .2, 14.5], anim: (o, lt) => { if (lt > tNo - .2 && lt < tNo + 2) o.pose = 'shrug'; if (lt > tH) { o.pose = 'present'; o.mood = 'happy'; } } },
        { x: 760, y: 1360, s: 1.5, ...JH.WOMAN(1), facing: 1, mood: 'focus', hold: { near: cc => { cc.save(); cc.rotate(-.9); cc.fillStyle = '#2a2a30'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-7, -10, 14, 70); cc.strokeRect(-7, -10, 14, 70); cc.fillStyle = '#9aa0aa'; cc.beginPath(); cc.arc(0, -22, 17, 0, 7); cc.fill(); cc.stroke(); cc.restore(); } }, arms: () => ({ shR: 78, elR: -18, handR: 'fist' }), talk: [tA - .3, tNo - .5] },
        { x: 1080, y: 1375, s: 1.52, ...JH.EXEC(1), facing: 1, mood: 'neutral', hold: { near: cc => { cc.fillStyle = '#20202a'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-36, -40, 72, 50); cc.strokeRect(-36, -40, 72, 50); cc.fillStyle = '#4a6a9a'; cc.beginPath(); cc.arc(28, -15, 14, 0, 7); cc.fill(); } }, arms: () => ({ shR: 70, elR: -50, handR: 'fist' }) }];
      S.D.live = [(c, lt) => { // ground strip + rope line (stand-in plate has only water there)
          if (P_WH !== 'white_house_night') { const g = c.createLinearGradient(0, 1150, 0, 1440); g.addColorStop(0, '#2a2a34'); g.addColorStop(1, '#16161e'); c.fillStyle = g; c.fillRect(0, 1150, 2560, 290); c.fillStyle = '#3a3a46'; c.fillRect(0, 1150, 2560, 10); }
          for (const x of [1300, 1900, 2500]) { c.fillStyle = '#c8a040'; c.strokeStyle = INK; c.lineWidth = 4; c.fillRect(x - 10, 1150, 20, 210); c.strokeRect(x - 10, 1150, 20, 210); c.beginPath(); c.ellipse(x, 1362, 40, 10, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.arc(x, 1145, 16, 0, 7); c.fill(); c.stroke(); }
          c.strokeStyle = '#8a1a24'; c.lineWidth = 12; c.beginPath(); c.moveTo(1300, 1170); c.quadraticCurveTo(1600, 1240, 1900, 1170); c.quadraticCurveTo(2200, 1240, 2500, 1170); c.stroke();
          if (Math.sin(lt * 5.3) > .96) TW.glow(c, 1150, 1100, 400, '255,255,255', .5); if (Math.sin(lt * 4.1 + 2) > .97) TW.glow(c, 600, 1000, 350, '255,255,255', .45); }];
      S.D.over = [(c, lt) => K.card(c, 'THAT NIGHT', lt, { at: tTn, x: 300, y: 110, px: 50, rot: -2 }),
        (c, lt) => K.card(c, "REPORTER ASKS: DOES HE WISH\nHE'D ACTED ON THE INTELLIGENCE?", lt, { at: tA - .2, x: 640, y: 330, px: 40, rot: -1, until: tNo }),
        (c, lt) => JH.quote(c, "NO, I DON'T|THINK SO.", 'THE PRESIDENT', 760, 330, lt, tNo, { px: 72 }),
        (c, lt) => K.card(c, 'CALLS JENSEN AN HONOURABLE GUY', lt, { at: tH, x: 1500, y: 140, px: 46, rot: 2 }), (c, lt) => K.card(c, 'SHOULD STAY ON AS CEO', lt, { at: tC - .6, x: 1500, y: 240, px: 42, rot: -2, bg: '#d8ecc8' })];
      S.D.sfx = [[.1, 'footsteps', .25], [tTn, 'pop', .2], [tA - .2, 'pop', .2], [tA + .5, 'camera_shutter', .3], [tNo, 'drum', .3], [tNo + .3, 'camera_shutter', .3], [tH, 'pop', .2], [tC - .6, 'pop', .2]]; } },
  // 10.05 Alice Huang: her neutral dossier card returns, a silent empty bubble beside it; NEVER CHARGED; Megaspeed: no reply
  { draw: driftA(P_WH, .38, 8), bed: [['night_loop', .1], ['hum_loop', .08]], inSfx: 'whoosh_soft',
    init: S => { const tW = A.at(S, 'word', 2.0), tNv = A.at(S, 'never', 2.8), tM = A.at(S, 'Megaspeed', 5.1), tF = A.at(S, 'Financial', 6.9);
      S.D.over = [(c, lt) => motesA(c, lt, '220,230,255'),
        (c, lt) => { c.save(); c.translate(660, 440); c.scale(1.3, 1.3); JH.profile(c, 0, 0, lt, .1, 'ALICE HUANG', ['NO PUBLIC COMMENT', 'NEVER CHARGED WITH ANY CRIME'], { w: 720, head: 'PROFILE', step: Math.max(.5, tNv - .6) - 0, dissolve: .15 + .1 * Math.sin(lt * 1.2) }); c.restore(); },
        (c, lt) => { // gold name highlight
          const u = E.out(K.seg(lt, .5, 1.1)); if (u <= 0) return; c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = 'rgba(232,180,74,.7)'; c.fillRect(212, 346, 380 * u, 84); c.restore(); },
        (c, lt) => { // silent bubble with a slowly blinking ellipsis
          const a = TW.pop(lt, tW - .5, .45); if (a <= 0) return; TW.bubble(c, 1400, 380, '   ', a, { px: 60, tail: -1 }); if (a > .9) for (let k = 0; k < 3; k++) { const on = .3 + .7 * Math.max(0, Math.sin(lt * 3 - k * .7)); c.fillStyle = `rgba(20,18,26,${on})`; c.beginPath(); c.arc(1360 + k * 40, 330, 9, 0, 7); c.fill(); } },
        (c, lt) => K.card(c, 'NEVER CHARGED', lt, { at: tNv + .4, x: 1400, y: 520, px: 54, rot: 2, bg: '#dfe6ee' }),
        (c, lt) => K.card(c, 'MEGASPEED: NO REPLY', lt, { at: tM, x: 1400, y: 660, px: 42, rot: -2 }), (c, lt) => JH.src(c, 'THE FINANCIAL TIMES', 1400, 760, lt, tF - .2, { px: 28 })];
      S.D.sfx = [[.1, 'paper', .2], [.6, 'tick', .15], [tW - .5, 'pop', .15], [tNv + .4, 'pop', .2], [tM, 'pop', .2], [tF - .2, 'tick', .2]]; } },
  // 10.06 next week: 17 EARNINGS, 18 CLOSED ROOM + SHENZHEN; pins drop on the world map; a plane heads to Shenzhen
  { plate: 'worldmap', cam: { z: [1.35, 1.42], x: [900, 1650], y: [520, 500] }, bed: [['tension', .12], ['hum_loop', .08]], light: { dir: -1 },
    init: S => { const t17 = A.at(S, 'seventeenth', .7), tEa = A.at(S, 'earnings', 2.7), t18 = A.at(S, 'eighteenth', 3.9), tW = A.at(S, 'Washington', 8.0), tSa = A.at(S, 'same', 9.0), tSz = A.at(S, 'Shenzhen', 12.5), tG = A.at(S, 'going', 14.1);
      const NV = [470, 610], DC = [790, 520], SZ = [1920, 650];
      const lab = (c, x, y, s, col, lt, at) => { const a = K.seg(lt, at + .3, at + .6); if (a <= 0) return; c.save(); c.globalAlpha = a; c.font = '40px Anton'; const w = c.measureText(s).width + 30; c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 4; rrA(c, x - w / 2, y - 156, w, 56, 10); c.fill(); c.stroke(); txtA(c, s, x, y - 127, 40, '#fff', 'center', 'Anton'); c.restore(); };
      S.D.live = [(c, lt) => { JH.pin(c, NV[0], NV[1], lt, tEa - .3, '', { col: JH.GREEN }); lab(c, NV[0], NV[1], 'EARNINGS', '#4a7a10', lt, tEa - .3);
          JH.pin(c, DC[0], DC[1], lt, tW - 1.2, '', { col: JH.RED }); lab(c, DC[0] + 60, DC[1], 'CLOSED ROOM', JH.RED, lt, tW - 1.2);
          JH.pin(c, SZ[0], SZ[1], lt, tSz - .3, '', { col: JH.GOLD }); lab(c, SZ[0], SZ[1], 'ASIA-PACIFIC SUMMIT', '#9a6a10', lt, tSz - .3);
          const p = E.io(K.seg(lt, tG - .8, tG + 1.4)); if (p > 0 && p < 1) { const x = DC[0] + (SZ[0] - DC[0]) * p, y = DC[1] - 40 - Math.sin(p * Math.PI) * 200 + (SZ[1] - DC[1]) * p; c.strokeStyle = 'rgba(40,30,20,.5)'; c.setLineDash([12, 10]); c.lineWidth = 4; c.beginPath(); for (let k = 0; k <= 20; k++) { const q = p * k / 20; const xx = DC[0] + (SZ[0] - DC[0]) * q, yy = DC[1] - 40 - Math.sin(q * Math.PI) * 200 + (SZ[1] - DC[1]) * q; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); c.setLineDash([]); XU.plane(c, x, y, .22, Math.cos(p * Math.PI) * -.35); }
          if (lt > tSz) TW.glow(c, SZ[0], SZ[1] - 50, 180, '255,200,80', .25 + .1 * Math.sin(lt * 4)); }];
      S.D.over = [(c, lt) => dayA(c, 210, 135, '17', 'EARNINGS', '#4a7a10', lt, t17 - .2), (c, lt) => dayA(c, 480, 135, '18', 'CLOSED ROOM', JH.RED, lt, t18 - .2),
        (c, lt) => { const a = TW.pop(lt, tSa, .4); if (a <= 0) return; c.save(); c.translate(800, 175); c.scale(a, a); c.font = '34px Anton'; const s = '+ SHENZHEN SUMMIT', w = c.measureText(s).width + 30; c.fillStyle = '#9a6a10'; c.strokeStyle = INK; c.lineWidth = 4; rrA(c, -w / 2, -25, w, 50, 10); c.fill(); c.stroke(); txtA(c, s, 0, 1, 34, '#fff', 'center', 'Anton'); c.restore(); },
        (c, lt) => K.card(c, 'TRUMP IS GOING', lt, { at: tG - .3, x: 1500, y: 140, px: 46, rot: 2 })];
      S.D.sfx = [[t17 - .2, 'paper', .25], [tEa - .3, 'pop', .2], [t18 - .2, 'paper', .25], [tW - 1.2, 'pop', .2], [tSa, 'tick', .2], [tSz - .3, 'pop', .2], [tG - .8, 'whoosh', .3], [tG + .4, 'drone', .15]]; } },
];
