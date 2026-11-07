for (const n of ['teen_room']) K.load(n, PL + n + '.jpg');
const KID = () => { const g = TW.GRAHAM(); g.look = Object.assign({}, g.look, { topCol: '#3a7a4a', inner: '#e8e8e2' }); return g; };
// blocky game world on a screen (no real game art: generic voxel hills, a little block avatar)
const blocky = (c, w, h, lt) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#7ac8ff'); g.addColorStop(1, '#c8ecff'); c.fillStyle = g; c.fillRect(0, 0, w, h); const B = w / 16;
  for (let i = -1; i < 18; i++) { const x = i * B - (lt * 30 % B), hh = 4 + Math.round(2 * Math.sin((i + Math.floor(lt * 30 / B)) * .7)); for (let j = 0; j < hh; j++) { c.fillStyle = j === hh - 1 ? '#5ab84a' : j > hh - 3 ? '#8a5a3a' : '#7a7a7a'; c.fillRect(x, h - (j + 1) * B, B - 1, B - 1); } }
  c.fillStyle = '#3a6ac8'; c.fillRect(w * .45, h - 7.5 * B + Math.abs(Math.sin(lt * 5)) * -8, B * .9, B * 1.6); c.fillStyle = '#f4c7a1'; c.fillRect(w * .45, h - 8.4 * B + Math.abs(Math.sin(lt * 5)) * -8, B * .9, B * .9); };
const desk = (fn1, fn2) => (c, lt) => { TW.chair(c, 1640, 1232, 1112, 1, '#3a7a4a'); TW.monitor(c, 1780, 560, 400, 240, (cc, w, h) => fn1(cc, w, h, lt), { stand: false }); TW.monitor(c, 2210, 600, 260, 180, (cc, w, h) => fn2(cc, w, h, lt), { stand: false }); };
const side = (c, w, h, lt) => { c.fillStyle = '#101828'; c.fillRect(0, 0, w, h); TW.txt(c, 'GAME CHAT', 12, 18, 18, '#7ad0ff', 'left', 'Anton'); for (let k = 0; k < 5; k++) { c.fillStyle = `rgba(255,255,255,${.25 + .2 * Math.sin(lt * 2 + k)})`; c.fillRect(12, 40 + k * 26, w * (.4 + (k * 37 % 40) / 100), 10); } };
window.SHOTS = [
  // 1.01 2016, Tampa: 13-year-old Graham plays a blocky game for hours; a family photo on screen splits in two
  { plate: 'teen_room', cam: { z: [1.0, 1.22], x: [1280, 1600], y: [720, 760] }, bed: [['hum_loop', .14], ['night_loop', .1]], light: { dir: 1, key: 'rgba(120,150,255,.24)' },
    figs: [{ x: 1640, y: 1232, s: 1.68, ...KID(), pose: 'sit', facing: 1, mood: 'focus', arms: TW.TYPE(1.4) }],
    init: S => { const tH = A.at(S, 'hours', 4.2), tP = A.at(S, 'parents', 5.4);
      S.D.live = [desk(blocky, side)];
      S.D.over = [(c, lt) => K.card(c, 'TAMPA · 2016', lt, { at: .3, x: 330, y: 140, px: 54, rot: -2 }), (c, lt) => K.card(c, 'AGE 13 · HOME-SCHOOLED', lt, { at: A.at(S, '13', 2.2), x: 330, y: 240, px: 36, rot: 2 }), (c, lt) => K.card(c, 'HOURS EVERY DAY', lt, { at: tH, x: 330, y: 320, px: 34, rot: -1 }),
        (c, lt) => { const a = pop(lt, tP, .4); if (a <= 0) return; const sp = E.io(K.seg(lt, tP + 1, tP + 2)); c.save(); c.translate(420, 640); c.scale(a, a); for (const sd of [-1, 1]) { c.save(); c.translate(sd * sp * 60, sd * sp * 10); c.rotate(sd * sp * .12); c.beginPath(); c.moveTo(0, -150); for (let k = 0; k <= 10; k++) c.lineTo((k % 2 ? 10 : -10), -150 + k * 30); c.lineTo(sd * 220, 150); c.lineTo(sd * 220, -150); c.closePath(); c.clip(); c.fillStyle = '#f4f1ea'; c.fillRect(-220, -150, 440, 300); c.fillStyle = '#9ac8e8'; c.fillRect(-200, -130, 400, 260);
          const fig = (x, h, col) => { c.fillStyle = col; c.fillRect(x - 24, 130 - h, 48, h - 40); c.fillStyle = '#f4c7a1'; c.beginPath(); c.arc(x, 130 - h - 20, 26, 0, 7); c.fill(); }; fig(-110, 200, '#7a4a3a'); fig(110, 190, '#4a6a9a'); fig(0, 130, '#3a7a4a'); c.restore(); } c.restore(); }];
      S.D.sfx = [[.3, 'typing', .14], [2, 'typing', .14], [tH, 'pop', .2], [tP + 1, 'paper_tear', .35]]; } },
  // 1.02 his in-game shop sells rare items; buyers never get them; angry chat piles up: SCAMMER
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '90,200,120'); c.save(); c.translate(960, 540); const z = 1 + .05 * u; c.scale(z, z); c.translate(-960, -540);
      TW.monitor(c, 260, 120, 1400, 760, (cc, w, h) => { blocky(cc, w, h, lt); const a = pop(lt, .3, .5); cc.save(); cc.translate(w * .5, h * .3); cc.scale(a, a); cc.fillStyle = '#5a3a2a'; cc.strokeStyle = INK; cc.lineWidth = 8; TW.rr(cc, -330, -90, 660, 180, 16); cc.fill(); cc.stroke(); TW.txt(cc, 'RARE SKINS · COOL NAMES', 0, -24, 60, '#ffe08a', 'center', 'Anton'); TW.txt(cc, 'PAY FIRST!', 0, 46, 40, '#fff', 'center', 'Anton'); cc.restore(); }, { stand: false });
      c.restore(); },
    bed: [['hum_loop', .12]],
    init: S => { const tC = A.at(S, 'catch', 3.0), tV = A.at(S, 'videos', 6.8); const msgs = ['where is my item??', 'I PAID. nothing came', 'scammer!!', 'he took my money', 'do NOT buy from him', 'reported', 'SCAMMER'];
      S.D.over = [(c, lt) => { msgs.forEach((m, k) => { const at = tC + .6 + k * ((tV + 1.2 - tC) / msgs.length); const P2 = [[420, 330], [1500, 330], [420, 640], [1500, 640], [960, 870], [420, 900], [1500, 900]][k]; TW.bubble(c, P2[0], P2[1], m, pop(lt, at, .35), { px: 38, bg: k % 2 ? '#ffe6e2' : '#fff', tail: k % 2 ? 1 : -1 }); }); }, (c, lt) => TW.stamp(c, 'SCAMMER', 960, 520, lt, tV + 1, { px: 140 }), (c, lt) => K.card(c, 'BUYERS GET NOTHING', lt, { at: tC + .3, x: 960, y: 70, px: 42, rot: -2 })];
      S.D.sfx = [[.3, 'pop', .25], ...msgs.map((m, k) => [tC + .6 + k * ((tV + 1.2 - tC) / msgs.length), 'tick', .2]), [tV + 1, 'stamp', .4]]; } },
  // 1.03 about $5,000 a month: cash stack grows next to the keyboard
  { plate: 'teen_room', cam: { z: [1.55, 1.68], x: [1700, 1760], y: [820, 820] }, bed: [['hum_loop', .14]], light: { dir: 1, key: 'rgba(120,150,255,.24)' },
    figs: [{ x: 1640, y: 1232, s: 1.74, ...KID(), pose: 'sit', facing: 1, mood: 'happy', arms: TW.TYPE(1.4) }],
    init: S => { const t5 = A.at(S, '5,000', 2.8);
      S.D.live = [desk((c, w, h, lt) => { c.fillStyle = '#0e1a10'; c.fillRect(0, 0, w, h); TW.txt(c, 'SALES', 20, 26, 26, '#8aff9a', 'left', 'Anton'); for (let k = 0; k < 8; k++) { const hh = (20 + k * 22) * K.clamp(lt / 3); c.fillStyle = '#5ad86a'; c.fillRect(30 + k * 44, h - 20 - hh, 30, hh); } }, side)];
      S.D.front = [(c, lt) => { const n = Math.floor(16 * E.out(K.seg(lt, .5, S.end - S.start - 1))); TW.cash(c, 2290, 918, n, .9); if (n > 0) for (let k = 0; k < 3; k++) { const u = ((lt * .8 + k / 3) % 1); c.save(); c.globalAlpha = 1 - u; c.translate(2290 + Math.sin(k * 3 + lt) * 40, 700 + u * 200); c.rotate(u * 3 + k); c.fillStyle = '#6ab86a'; c.fillRect(-40, -12, 80, 24); c.restore(); } }];
      S.D.over = [(c, lt) => K.title(c, '$5,000 / MONTH', lt, { at: t5, x: 560, y: 330, px: 100 }), (c, lt) => K.card(c, 'AGE 14 · HIS OWN CLAIM', lt, { at: .3, x: 560, y: 180, px: 40, rot: -2 })];
      S.D.sfx = [[.6, 'coins', .3], [t5, 'coins_cascade', .3], [t5 + .2, 'stamp', .3]]; } },
  // 1.04 OGUsers: a shady forum on a giant screen; he is banned within days (BANNED stamp)
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '150,70,230'); c.save(); c.translate(960, 540); const z = 1.08 - .06 * u; c.scale(z, z); c.translate(-960, -540);
      TW.win(c, 300, 150, 1320, 690, 'OGUsers · forum', '#3a2a5a', (cc, w, h) => { cc.fillStyle = '#16121f'; cc.fillRect(0, 0, w, h); const rows = ['WTS rare 3-letter name', 'Selling stolen gaming accounts', 'WTB short usernames, paying BTC', 'Rare OG handle for sale', 'Middleman service, trusted', 'Account trades, DM me', 'New seller: GRAHAM']; rows.forEach((r2, k) => { const a = fade(lt, .4 + k * .25, .3); cc.globalAlpha = a; cc.fillStyle = k === 6 ? '#3a1e2a' : (k % 2 ? '#1e1a2a' : '#221d30'); cc.fillRect(20, 14 + k * 88, w - 40, 78); TW.txt(cc, r2, 50, 53 + k * 88, 36, k === 6 ? '#ffb0a8' : '#e8e2ff'); TW.txt(cc, (k * 37 % 90 + 3) + ' replies', w - 60, 53 + k * 88, 28, '#8a80aa', 'right'); }); cc.globalAlpha = 1; });
      c.restore(); },
    bed: [['tension', .16]],
    init: S => { const tB = A.at(S, 'banned', 5.6), tT = A.at(S, 'taking', 7.0);
      S.D.over = [(c, lt) => TW.stamp(c, 'BANNED', 960, 560, lt, tB, { px: 180 }), (c, lt) => K.card(c, 'BANNED WITHIN DAYS', lt, { at: tB + .6, x: 640, y: 895, px: 44, rot: -2 }), (c, lt) => K.card(c, 'TOOK MONEY · NEVER DELIVERED', lt, { at: tT, x: 1300, y: 895, px: 38, rot: 2 }), (c, lt) => K.card(c, 'STOLEN ACCOUNTS · RARE NAMES', lt, { at: A.at(S, 'trade', 2.4), x: 960, y: 70, px: 36, rot: -1 })];
      S.D.sfx = [[.4, 'tick', .2], [.65, 'tick', .2], [.9, 'tick', .2], [1.15, 'tick', .2], [tB, 'stamp', .45], [tB + .1, 'thud', .3]]; } },
];
