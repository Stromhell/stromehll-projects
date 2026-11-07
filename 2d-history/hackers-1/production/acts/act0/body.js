for (const n of ['teen_room', 'tw_office']) K.load(n, PL + n + '.jpg');
endTitle(4.2);
const SCR = window.TW_SCREENS;
// Graham at his desk: chair, typing, two monitors with live content
const grahamDesk = (fn1, fn2) => (c, lt) => { TW.chair(c, 1640, 1232, 1112, 1); TW.monitor(c, 1780, 560, 400, 240, fn1, { stand: false }); TW.monitor(c, 2210, 600, 260, 180, fn2, { stand: false }); };
window.SHOTS = [
  // 0.01 a Twitter employee at his desk; the desk phone rings; he answers; the "help desk" voice asks him to sign in again
  { plate: 'tw_office', cam: { z: [1.15, 1.42], x: [1300, 1330], y: [820, 860] }, bed: [['office_loop', .14], ['hum_loop', .1]], light: { dir: -1, key: 'rgba(170,200,255,.2)' },
    init: S => { const tA = A.at(S, 'problem', 3.2), tS = A.at(S, 'sign', 6.6), tPick = 1.5;
      S.D.figs = [{ x: 1650, y: 1232, s: 1.9, ...TW.EMP(0), pose: 'sit', facing: -1, mood: 'neutral', anim: (o, lt) => { o.hat = lt > tPick - .3 ? TW.headset : null; if (lt > tPick) { o.arms = TW.TYPE(.3); o.mood = lt > tA ? 'worried' : 'neutral'; } else o.arms = TW.TYPE(.8); } }];
      S.D.live = [(c, lt) => { TW.chair(c, 1650, 1232, 1112, -1, '#3a4a6a'); TW.monitor(c, 1060, 700, 440, 260, (c, w, h) => { c.fillStyle = '#f4f6fa'; c.fillRect(0, 0, w, h); c.fillStyle = '#1d9bf0'; c.fillRect(0, 0, w, 34); TW.txt(c, 'INTERNAL TOOLS', 14, 17, 20, '#fff'); for (let k = 0; k < 5; k++) { c.fillStyle = '#dfe4ee'; c.fillRect(16, 50 + k * 40, w - 32 - (k * 37 % 90), 22); } if (lt > tS) { c.fillStyle = 'rgba(224,64,58,.9)'; c.fillRect(0, h - 60, w, 60); TW.txt(c, 'SESSION EXPIRED', w / 2, h - 30, 26, '#fff', 'center', 'Anton'); } }, { stand: false }); TW.deskPhone(c, 980, 1000, 1, lt < tPick, lt, false); }];
            S.D.over = [(c, lt) => TW.bubble(c, 560, 380, 'Hi, IT help desk here.|Your work login has a problem.', pop(lt, tA - .3, .4) * (1 - K.seg(lt, tS - .3, tS)), { px: 40, tail: 1 }), (c, lt) => TW.bubble(c, 560, 380, 'Could you sign in|again, please?', pop(lt, tS, .4), { px: 44, tail: 1 }), (c, lt) => K.card(c, 'TWITTER · JULY 2020', lt, { at: .3, x: 1500, y: 130, px: 40, rot: -2 })];
      S.D.sfx = [[.1, 'phone_ring', .3], [.8, 'phone_ring', .3], [tPick, 'pop', .25], [tA, 'tick', .2], [tS, 'alarm', .12]]; } },
  // 0.02 the caller's side: Graham in his dark bedroom, phone to his ear, hangs up and grins; jewelled watch glints; AGE 17
  { plate: 'teen_room', cam: { z: [1.3, 1.55], x: [1760, 1720], y: [820, 800] }, bed: [['hum_loop', .14]], light: { dir: 1, key: 'rgba(120,150,255,.24)' },
    init: S => { const tT = A.at(S, 'thanks', 1.2), tH = A.at(S, 'hangs', 2.2), tN = A.at(S, "isn't", 3.6), tR = A.at(S, 'Rolex', 7.6);
      S.D.figs = [{ x: 1640, y: 1232, s: 1.9, ...TW.GRAHAM(), pose: 'sit', facing: 1, mood: 'focus', anim: (o, lt) => { if (lt < tH + .3) o.arms = TW.EAR; else { o.arms = TW.TYPE(1.2); o.mood = 'happy'; } } }];
      S.D.live = [grahamDesk((c, w, h, lt) => { TW.techBG(c, S._lt || 0, '122,92,255', w, h); TW.txt(c, 'CALL · HELP DESK', w / 2, 40, 28, '#cfc8ff', 'center', 'Anton'); }, (c, w, h) => { c.fillStyle = '#101828'; c.fillRect(0, 0, w, h); for (let k = 0; k < 6; k++) { c.fillStyle = `rgba(58,208,255,${.3 + k % 3 * .2})`; c.fillRect(14, 16 + k * 26, w * (.3 + (k * 37 % 50) / 100), 12); } }), (c, lt) => { S._lt = lt; }, (c, lt) => { if (lt < tH + .3) { c.save(); c.translate(1556, 862); c.rotate(-.3); TW.phone(c, 0, 0, .4); c.restore(); } }];
      S.D.front = [(c, lt) => { if (lt < tH + .3) { } else { c.save(); TW.phone(c, 1755, 905, .42, (c, w, h) => { c.fillStyle = '#1a2a4a'; c.fillRect(0, 0, w, h); TW.txt(c, 'CALL ENDED', w / 2, h / 2, 16, '#fff', 'center', 'Anton'); }, { rot: 1.45 }); c.restore(); } if (lt > tR - .2) TW.sparkle(c, 1690, 960, lt, 1.2, '200,235,255'); }];
      S.D.over = [(c, lt) => TW.bubble(c, 1300, 360, 'Thanks so much. Bye!', pop(lt, tT - .2, .35) * (1 - K.seg(lt, tH + .2, tH + .5)), { px: 44, tail: 1 }), (c, lt) => K.title(c, 'AGE 17', lt, { at: tN + 1.2, x: 560, y: 300, px: 150 }), (c, lt) => K.card(c, 'NOT THE HELP DESK', lt, { at: tN, x: 560, y: 470, px: 44, rot: 2 }), (c, lt) => K.card(c, 'TAMPA, FLORIDA', lt, { at: tN + 2, x: 560, y: 560, px: 36, rot: -2 })];
      S.D.sfx = [[tH, 'tick', .3], [tN, 'drum', .3], [tN + 1.2, 'stamp', .35], [tR, 'chime', .25], ...Array.from({ length: 8 }, (_, k) => [tH + .6 + k * .3, 'typing', .12])]; } },
  // 0.03 the wall of famous accounts flips red one by one; 130 ACCOUNTS counter
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); const T = S._fl; c.save(); c.translate(960, 560); const z = 1.02 + .06 * u; c.scale(z, z); c.translate(-960, -560); TW.wall(c, lt, T, { y0: 330, gy: 205, in: .1, stagger: .05 }); c.restore(); },
    bed: [['tension', .2]],
    init: S => { const tO = A.at(S, 'Obama', 2.4), tM = A.at(S, 'Musk', 5.6), tS = A.at(S, 'scam', 8.4); const st = (tM - tO) / 4; S._fl = [tO, tO + st, tM, tO + st * 2, tO + st * 3, tM + .3, tM + .6, tM + .9, tM + 1.2, tM + 1.5, tM + 1.8, tM + 2.1];
      S.D.over = [(c, lt) => { const a = pop(lt, tO - .2, .4); if (a <= 0) return; c.save(); c.translate(1700, 110); c.scale(a, a); c.fillStyle = RED; c.strokeStyle = INK; c.lineWidth = 6; TW.rr(c, -170, -60, 340, 120, 16); c.fill(); c.stroke(); c.restore(); K.counter(c, 0, 130, lt, { at: tO, dur: Math.max(1, tS - tO), x: 1600, y: 112, px: 70 }); TW.txt(c, 'ACCOUNTS', 1765, 112, 28, '#fff', 'center', 'Anton'); }, (c, lt) => TW.stamp(c, 'BITCOIN SCAM', 960, 560, lt, tS, { px: 120 }), (c, lt) => K.card(c, 'WITHIN A DAY', lt, { at: .3, x: 960, y: 140, px: 46, rot: -2 })];
      S.D.sfx = [...S._fl.map(t => [t, 'hit', .18]), [tS, 'stamp', .35], [tS + 1.6, 'drum', .3]]; } },
  // 0.04 series title over the red wall
  { draw: (c, lt) => { TW.techBG(c, lt + 20, '224,64,58'); c.save(); c.globalAlpha = .35; c.filter = 'blur(3px)'; TW.wall(c, lt + 9, Array(12).fill(0), { y0: 330, gy: 205 }); c.restore(); }, bed: [['drone', .2]], sub: 'off',
    over: [(c, lt) => K.title(c, 'THE KIDS WHO', lt, { at: .2, y: 400, px: 130 }), (c, lt) => K.title(c, 'HACKED THE WORLD', lt, { at: .6, y: 560, px: 150 }), (c, lt) => K.card(c, 'PART 1 · THE TWITTER HACK', lt, { at: 1.3, x: 960, y: 760, px: 52, rot: -2 })],
    sfx: [[.2, 'drum', .35], [.6, 'stamp', .35], [1.3, 'whoosh', .3]] },
];
