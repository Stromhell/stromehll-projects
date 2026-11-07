for (const n of ['teen_room']) K.load(n, PL + n + '.jpg');
const desk = (fn1, fn2) => (c, lt) => { TW.chair(c, 1640, 1232, 1112, 1); TW.monitor(c, 1780, 560, 400, 240, (cc, w, h) => fn1(cc, w, h, lt), { stand: false }); TW.monitor(c, 2210, 600, 260, 180, (cc, w, h) => fn2(cc, w, h, lt), { stand: false }); };
const code = (c, w, h, lt) => { c.fillStyle = '#0a1018'; c.fillRect(0, 0, w, h); for (let k = 0; k < 9; k++) { const y = 14 + ((k * 22 - lt * 30) % 200 + 200) % 200; c.fillStyle = `rgba(90,255,150,${.4 + .3 * Math.sin(k)})`; c.fillRect(12, y, w * (.3 + (k * 41 % 60) / 100), 9); } };
// office floor plan (blueprint) with a pulsing red target
const floorPlan = (c, lt, a) => { c.save(); c.translate(960, 560); c.scale(a, a); c.fillStyle = '#123a6a'; c.strokeStyle = '#cfe6ff'; c.lineWidth = 6; TW.rr(c, -640, -330, 1280, 660, 10); c.fill(); c.stroke(); c.lineWidth = 3; c.strokeStyle = 'rgba(207,230,255,.25)'; for (let x = -600; x < 640; x += 40) { c.beginPath(); c.moveTo(x, -330); c.lineTo(x, 330); c.stroke(); }
  c.strokeStyle = '#cfe6ff'; c.lineWidth = 5; for (const [x, y, w, h] of [[-600, -290, 380, 260], [-200, -290, 300, 260], [120, -290, 480, 170], [120, -100, 240, 70], [-600, 0, 520, 290], [-60, 0, 300, 290], [260, 0, 340, 290]]) c.strokeRect(x, y, w, h);
  for (let k = 0; k < 14; k++) { c.fillStyle = 'rgba(207,230,255,.5)'; c.fillRect(-560 + (k % 7) * 70, 40 + (k / 7 | 0) * 110, 46, 30); }
  TW.txt(c, 'TWITTER HQ · SAN FRANCISCO', 0, -360, 34, '#cfe6ff', 'center', 'Anton');
  const p = .5 + .5 * Math.sin(lt * 5); c.strokeStyle = RED; c.lineWidth = 8; for (let k = 0; k < 3; k++) { c.globalAlpha = 1 - k * .3; c.beginPath(); c.arc(360, -205, 30 + k * 26 + p * 12, 0, 7); c.stroke(); } c.globalAlpha = 1; c.beginPath(); c.moveTo(300, -205); c.lineTo(420, -205); c.moveTo(360, -265); c.lineTo(360, -145); c.stroke(); TW.txt(c, 'ADMIN TOOLS', 360, -110, 28, '#ffb0a8', 'center', 'Anton'); c.restore(); };
const profile = (c, x, y, k, st, a) => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 5; TW.rr(c, -130, -90, 260, 180, 16); c.fill(); c.stroke(); c.fillStyle = '#2a6ac8'; TW.rr(c, -130, -90, 260, 46, 16); c.fill(); c.fillRect(-130, -60, 260, 16);
  c.fillStyle = `hsl(${k * 47},40%,62%)`; c.beginPath(); c.arc(-74, -10, 34, 0, 7); c.fill(); c.stroke(); TW.txt(c, ['Engineer', 'Support', 'Sales', 'IT', 'Design', 'Ops', 'Support', 'Legal'][k % 8], -26, -20, 26, INK, 'left', 'Anton'); TW.txt(c, 'Twitter', -26, 14, 22, '#5a6070');
  if (st === 1) { c.fillStyle = RED; c.beginPath(); c.arc(90, 50, 30, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 6; c.beginPath(); c.arc(90, 58, 15, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); } if (st === 2) { c.fillStyle = '#e8a03a'; TW.rr(c, 10, 30, 110, 40, 8); c.fill(); TW.txt(c, 'REPORTED', 65, 51, 20, '#fff', 'center', 'Anton'); } c.restore(); };
const chatApp = (c, w0, h0, msgs, lt, t0, dt, title) => { c.scale(1.45, 1.45); const w = w0 / 1.45, h = h0 / 1.45; c.fillStyle = '#2a2d36'; c.fillRect(0, 0, w, h); c.fillStyle = '#1f2128'; c.fillRect(0, 0, 220, h); TW.txt(c, title, 24, 36, 26, '#fff', 'left', 'Anton'); ['# general', '# deals', '# voice'].forEach((s, k) => TW.txt(c, s, 24, 90 + k * 46, 24, k ? '#8a8e9a' : '#fff')); c.save(); c.translate(240, 0); TW.chat(c, w - 260, h, msgs, lt, t0, dt, { dark: true }); c.restore(); };
window.SHOTS = [
  // 3.01 PHASE 1: July 2020, forget hacking stars one by one: target Twitter itself
  { draw: (c, lt, u) => { TW.techBG(c, lt, '58,140,255'); floorPlan(c, lt, pop(lt, .8, .6) * (1 + .04 * u)); }, bed: [['tension', .18]],
    init: S => { const tS = A.at(S, 'stars', 2.2), tI = A.at(S, 'inside', 5);
      S.D.over = [(c, lt) => TW.phase(c, 1, lt, .1, tS), (c, lt) => K.card(c, 'JULY 2020', lt, { at: .3, x: 300, y: 110, px: 46, rot: -2 }),
        (c, lt) => { const a = pop(lt, tS, .35), o = 1 - K.seg(lt, tI - .3, tI); if (a <= 0 || o <= 0) return; c.save(); c.globalAlpha = o; ['ONE STAR', 'AT A TIME?'].forEach((s, k) => K.outlined(c, s, 960, 470 + k * 110, 100, {})); TW.stamp(c, 'NO', 960, 520, lt, tS + .8, { px: 200 }); c.restore(); },
        (c, lt) => K.card(c, 'GET INSIDE TWITTER ITSELF', lt, { at: tI, x: 960, y: 140, px: 46, rot: -2 })];
      S.D.sfx = [[.1, 'stamp', .35], [.8, 'whoosh', .3], [tS, 'pop', .25], [tS + .8, 'stamp', .35], [tI, 'drum', .3]]; } },
  // 3.02 he claims to work at Twitter; a small crew forms in a chat app
  { draw: (c, lt, u) => { TW.techBG(c, lt, '122,92,255'); c.save(); c.translate(960, 540); c.scale(1 + .04 * u, 1 + .04 * u); c.translate(-960, -540);
      TW.win(c, 260, 140, 1400, 760, 'crew chat', '#5865f2', (cc, w, h) => chatApp(cc, w, h, [['graham', 'I work at Twitter ;)', '#7a5cff'], ['—', 'user_01 joined', '#5ad86a'], ['—', 'user_02 joined', '#5ad86a'], ['—', 'user_03 joined', '#5ad86a'], ['user_02', 'wait, for real??', '#3ad0ff'], ['graham', 'I can get any name', '#7a5cff'], ['user_03', "I'm in", '#e8b84a']], lt, .4, (S2.dur - 1) / 7, 'THE CREW')); c.restore(); },
    bed: [['hum_loop', .12]],
    init: S => { S2.dur = S.end - S.start; S.D.over = [(c, lt) => K.card(c, 'THE CREW', lt, { at: A.at(S, 'crew', 3.2), x: 1500, y: 90, px: 50, rot: 2 })]; S.D.sfx = Array.from({ length: 7 }, (_, k) => [.4 + k * (S2.dur - 1) / 7, 'pop', .22]); } },
  // 3.03 he finds staff online and phones them as the "help desk"; most hang up, a few report him
  { plate: 'teen_room', cam: { z: [1.25, 1.35], x: [1500, 1560], y: [760, 780] }, bed: [['hum_loop', .12]], light: { dir: 1, key: 'rgba(120,150,255,.24)' },
    init: S => { const tP = A.at(S, 'phones', 3.0), tH = A.at(S, 'hang', 6.2), tR = A.at(S, 'report', 7.6);
      S.D.figs = [{ x: 1640, y: 1232, s: 1.9, ...TW.GRAHAM(), pose: 'sit', facing: 1, mood: 'focus', anim: (o, lt) => { if (lt > tP) o.arms = TW.EAR; else o.arms = TW.TYPE(1); if (lt > tH) o.mood = 'worried'; } }];
      S.D.live = [desk((c, w, h) => { c.fillStyle = '#eef2f8'; c.fillRect(0, 0, w, h); c.fillStyle = '#2a6ac8'; c.fillRect(0, 0, w, 30); TW.txt(c, 'PROFILES · TWITTER STAFF', 12, 15, 18, '#fff', 'left', 'Anton'); for (let k = 0; k < 6; k++) { c.fillStyle = '#fff'; c.fillRect(14 + (k % 3) * 128, 44 + (k / 3 | 0) * 96, 116, 84); c.fillStyle = `hsl(${k * 47},40%,62%)`; c.beginPath(); c.arc(40 + (k % 3) * 128, 76 + (k / 3 | 0) * 96, 16, 0, 7); c.fill(); } }, code)];
      S.D.live.push((c, lt) => { if (lt > tP) { c.save(); c.translate(1556, 862); c.rotate(-.3); TW.phone(c, 0, 0, .4); c.restore(); } });
      S.D.over = [(c, lt) => { for (let k = 0; k < 6; k++) { const at = .6 + k * .35, st = lt > tH + k * .25 ? (k === 2 || k === 4 ? 2 : (k === 5 && lt > tR ? 2 : 1)) : 0; profile(c, 230 + (k % 2) * 290, 170 + (k / 2 | 0) * 210, k, k === 5 && lt < tR ? 1 : st, pop(lt, at, .35)); } },
        (c, lt) => K.card(c, 'PRETENDING TO BE THE HELP DESK', lt, { at: tP, x: 1350, y: 120, px: 38, rot: 2 }), (c, lt) => K.card(c, 'MOST HANG UP', lt, { at: tH, x: 1450, y: 210, px: 40, rot: -2 })];
      S.D.sfx = [...Array.from({ length: 6 }, (_, k) => [.6 + k * .35, 'pop', .18]), [tP, 'phone_ring', .25], ...Array.from({ length: 6 }, (_, k) => [tH + k * .25, 'tick', .22]), [tR, 'alarm', .1]]; } },
  // 3.04 one employee believes him and signs in on a fake page; the details and phone code copy across to Graham
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); const tY = S._tY, tK = S._tK; const a1 = pop(lt, .3, .45), a2 = pop(lt, .9, .45);
      if (a1 > 0) { c.save(); c.translate(520, 470); c.scale(a1, a1); TW.login(c, 0, 0, 560, 420, { url: 'twitter-help.vpn-login.co', fake: true, typed: lt > tY ? (lt > tY + .8 ? 2 : 1) : 0 }); c.restore(); }
      if (a2 > 0) { c.save(); c.translate(1400, 470); c.scale(a2, a2); TW.login(c, 0, 0, 560, 420, { url: 'graham · copied', typed: lt > tK + .6 ? 2 : 0 }); c.restore(); }
      const k = E.io(K.seg(lt, tK, tK + 1.2)); if (k > 0 && k < 1) { const x = 520 + 880 * k, y = 470 - Math.sin(k * Math.PI) * 200; c.save(); c.translate(x, y); c.rotate(k * 6); c.strokeStyle = '#ffd24a'; c.lineWidth = 16; c.beginPath(); c.arc(-40, 0, 30, 0, 7); c.moveTo(-10, 0); c.lineTo(60, 0); c.moveTo(40, 0); c.lineTo(40, 24); c.moveTo(56, 0); c.lineTo(56, 18); c.stroke(); c.restore(); }
      const pk = E.io(K.seg(lt, S._tC, S._tC + 1.2)); if (lt > S._tC - .4) { const x = 520 + 880 * pk, y = 830 - Math.sin(pk * Math.PI) * 120; TW.phone(c, x, y, .7, (cc, w, h) => { TW.txt(cc, 'CODE', w / 2, 70, 22, '#fff', 'center', 'Anton'); TW.txt(cc, '731 204', w / 2, 110, 20, '#3ad0ff', 'center', 'Anton'); }); } },
    bed: [['tension', .16]],
    init: S => { S._tY = A.at(S, 'signs', 2.6); S._tK = A.at(S, 'details', 5.0); S._tC = A.at(S, 'code', 6.8);
      S.D.over = [(c, lt) => K.card(c, 'FAKE PAGE', lt, { at: .5, x: 520, y: 170, px: 42, rot: -2 }), (c, lt) => K.card(c, "GRAHAM'S SIDE", lt, { at: 1.1, x: 1400, y: 170, px: 42, rot: 2 }), (c, lt) => K.title(c, 'ONE YES IS ENOUGH', lt, { at: A.at(S, 'network', 8.6), y: 120, px: 76 })];
      S.D.sfx = [[.3, 'pop', .25], [.9, 'pop', .25], [S._tY, 'typing', .2], [S._tK, 'whoosh', .3], [S._tC, 'whoosh', .3], [S._tC + 1.2, 'chime', .3]]; } },
  // 3.05 that account is too weak; he scrolls internal messages until one line glows: someone with far more access
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '58,208,255'); const tJ = S._tJ, scroll = Math.min(lt, tJ) * 120; c.save(); c.translate(960, 540); const z = 1 + .12 * E.io(K.seg(lt, tJ, tJ + 1.2)); c.scale(z, z); c.translate(-960, -540);
      TW.win(c, 300, 120, 1320, 800, 'internal chat', '#3a4a6a', (cc, w, h) => { cc.fillStyle = '#f6f7fb'; cc.fillRect(0, 0, w, h); const lines = ['lunch at 1?', 'deploy moved to Friday', 'can someone check ticket 4471', 'reminder: all-hands at 3', 'printer on 7 is broken again', 'new laptop request', 'ADMIN LOGIN DETAILS ← (pinned)', 'thanks!', 'who has the meeting room?', 'weekend on-call list']; for (let k = 0; k < 26; k++) { const L = lines[k % lines.length], y = 30 + k * 70 - scroll, hot = k === 16; if (y < -60 || y > h + 40) continue; if (hot && lt > tJ) { cc.fillStyle = `rgba(255,210,74,${.5 + .3 * Math.sin(lt * 8)})`; cc.fillRect(10, y - 6, w - 20, 62); } cc.fillStyle = `hsl(${k * 53},40%,62%)`; cc.beginPath(); cc.arc(44, y + 24, 20, 0, 7); cc.fill(); TW.txt(cc, hot ? 'ADMIN ACCESS DETAILS (pinned)' : L, 84, y + 24, 30, hot ? '#7a1a14' : '#2a2a38', 'left', hot ? 'Anton' : 'Oswald'); } }); c.restore(); },
    bed: [['hum_loop', .12]],
    init: S => { S._tJ = A.at(S, 'finds', 6.2) - .2;
      S.D.over = [(c, lt) => K.card(c, "CAN'T REACH THE CONTROLS", lt, { at: .4, x: 960, y: 70, px: 40, rot: -2, until: S._tJ }), (c, lt) => K.title(c, 'JACKPOT', lt, { at: S._tJ + .6, x: 1500, y: 560, px: 130 })];
      S.D.sfx = [[.4, 'scrape', .15], [S._tJ, 'chime', .35], [S._tJ + .6, 'coins', .3]]; } },
  // 3.06 Twitter's admin tool: the cursor hovers over "change email"; ANY ACCOUNT
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); c.save(); c.translate(960, 540); const z = 1.04 + .08 * u; c.scale(z, z); c.translate(-960, -540);
      TW.win(c, 300, 220, 1320, 700, 'ADMIN PANEL · internal', '#7a1a1a', (cc, w, h) => { cc.fillStyle = '#f6f2f2'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#fff'; cc.strokeStyle = '#c8c0c0'; cc.lineWidth = 3; TW.rr(cc, 40, 30, w - 80, 80, 12); cc.fill(); cc.stroke(); TW.txt(cc, 'Search any account:  @________', 70, 70, 34, '#5a5050');
        ['Change email', 'Reset password', 'Turn off 2-step login', 'View account'].forEach((b, k) => { const hot = k === 0 && lt > S._tH; cc.fillStyle = hot ? RED : '#3a4a6a'; TW.rr(cc, 60 + (k % 2) * 600, 170 + (k / 2 | 0) * 150, 540, 110, 16); cc.fill(); TW.txt(cc, b, 330 + (k % 2) * 600, 225 + (k / 2 | 0) * 150, 44, '#fff', 'center', 'Anton'); });
        const cu = E.io(K.seg(lt, .6, S._tH)); const cx = 900 - 520 * cu, cy = 600 - 330 * cu + (lt > S._tH ? Math.sin(lt * 6) * 4 : 0); cc.fillStyle = '#fff'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(cx, cy); cc.lineTo(cx, cy + 46); cc.lineTo(cx + 12, cy + 34); cc.lineTo(cx + 22, cy + 56); cc.lineTo(cx + 30, cy + 52); cc.lineTo(cx + 20, cy + 30); cc.lineTo(cx + 36, cy + 30); cc.closePath(); cc.fill(); cc.stroke(); }); c.restore(); },
    bed: [['tension', .2]],
    init: S => { S._tH = A.at(S, 'email', 3.4);
      S.D.over = [(c, lt) => K.title(c, 'ANY ACCOUNT', lt, { at: A.at(S, 'world', 5.4) - .4, y: 110, px: 110 })];
      S.D.sfx = [[.6, 'scrape', .1], [S._tH, 'tick', .3], [A.at(S, 'world', 5.4) - .4, 'drum', .35]]; } },
];
const S2 = {};
