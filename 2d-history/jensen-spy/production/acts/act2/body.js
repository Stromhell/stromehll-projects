// JH act 2 - The Photos. Plates: gov_corridor, boardroom, computex_hall, taipei_bar (photo thumbnails), neon_club (restaurant front), stage_blue.
for (const n of ['gov_corridor', 'boardroom', 'computex_hall', 'taipei_bar', 'neon_club', 'stage_blue']) K.load(n, PL + n + '.jpg');
const okImg = n => !!(K.imgs[n] && K.imgs[n].complete && K.imgs[n].naturalWidth > 0);
const rr = TW.rr, txt = TW.txt;
// ---- name tag (world or screen): gold tile with a pointer, optional small line above
const tag = (c, name, x, y, lt, at, opts = {}) => { const a = pop(lt, at, .4), o = 1 - K.seg(lt, (opts.until ?? 999) - .3, opts.until ?? 999); if (a <= 0 || o <= 0) return; const px = opts.px ?? 40; c.save(); c.globalAlpha = o; c.translate(x, y); c.scale(a, a); c.font = `${px}px Anton`;
  const w = c.measureText(name).width + px * .9, h = px * 1.45; c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 6, -h - 12, w, h, 10); c.fill(); c.fillStyle = opts.col || JH.GOLD; c.strokeStyle = INK; c.lineWidth = 4; rr(c, -w / 2, -h - 18, w, h, 10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-14, -19); c.lineTo(0, 0); c.lineTo(14, -19); c.closePath(); c.fill(); c.stroke(); c.fillRect(-12, -24, 24, 7);
  txt(c, name, 0, -h / 2 - 16, px, INK, 'center', 'Anton'); if (opts.sub) { c.font = `${px * .55}px Oswald`; const sw = c.measureText(opts.sub).width + 24; c.fillStyle = 'rgba(14,12,18,.85)'; rr(c, -sw / 2, -h - 18 - px * .85, sw, px * .78, 6); c.fill(); txt(c, opts.sub, 0, -h - 18 - px * .46, px * .55, '#f4efe2', 'center', 'Oswald'); } c.restore(); };
// ---- render a sub-scene (another location inside one shot) in screen space
const SUBS = {};
const scene = (c, key, plate, cam, u, lt, figs, live, front, light) => { const S2 = SUBS[key] || (SUBS[key] = { D: { light: light || {} } }); const m = K.camAt(cam, u); c.setTransform(m.sc, 0, 0, m.sc, m.tx, m.ty);
  if (typeof plate === 'function') plate(c, lt, u); else c.drawImage(K.imgs[plate], 0, 0, 2560, 1440);
  for (const L of live || []) { c.save(); L(c, lt, u, S2); c.restore(); } for (const f of (figs || []).slice().sort((a, b) => a.y - b.y)) { c.save(); A.figure(c, f, lt, u, S2); c.restore(); } for (const L of front || []) { c.save(); L(c, lt, u, S2); c.restore(); } c.setTransform(1, 0, 0, 1, 0, 0); };
const zbg = (name, b = .4, blur = 7) => (c, lt, u) => { const s2 = 1.06 + .05 * u; c.save(); c.filter = `blur(${blur}px) brightness(${b})`; c.translate(960, 540); c.scale(s2, s2); c.translate(-960, -540); c.drawImage(K.imgs[name], 0, 0, 1920, 1080); c.restore(); };
const box = (c, x, y, w, h, label, sub, a, col = '#f6efe2') => { if (a <= 0) return; c.save(); c.translate(x, y); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -w / 2 + 8, -h / 2 + 10, w, h, 14); c.fill(); c.fillStyle = col; c.strokeStyle = INK; c.lineWidth = 5; rr(c, -w / 2, -h / 2, w, h, 14); c.fill(); c.stroke();
  txt(c, label, 0, sub ? -14 : 2, 34, INK, 'center', 'Anton'); if (sub) txt(c, sub, 0, 26, 24, '#5a4a3a', 'center', 'Oswald'); c.restore(); };
const arrow = (c, x0, y0, x1, y1, u, col = '#f6efe2') => { if (u <= 0) return; const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u; c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 8; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x, y); c.stroke(); const an = Math.atan2(y1 - y0, x1 - x0); c.translate(x, y); c.rotate(an); c.beginPath(); c.moveTo(6, 0); c.lineTo(-22, -16); c.lineTo(-22, 16); c.closePath(); c.fill(); c.restore(); };
// ---- act 2 props
const CAM_H = { near: cc => { cc.save(); cc.rotate(Math.PI); cc.fillStyle = '#1e1e24'; cc.strokeStyle = INK; cc.lineWidth = 3; rr(cc, -30, -22, 60, 40, 6); cc.fill(); cc.stroke(); cc.fillStyle = '#3a3a44'; cc.beginPath(); cc.arc(0, -2, 13, 0, 7); cc.fill(); cc.stroke(); cc.fillStyle = '#2a2a30'; cc.fillRect(-26, -32, 18, 10); cc.restore(); } };
const PHONE_H = { near: cc => { cc.save(); cc.rotate(Math.PI); TW.phone(cc, 0, -6, .32, (p, w, h) => { p.fillStyle = '#2a3e5a'; p.fillRect(0, 0, w, h); }); cc.restore(); } };
const LETTER_H = { near: cc => { cc.save(); cc.rotate(Math.PI); cc.fillStyle = '#f7f3e8'; cc.strokeStyle = INK; cc.lineWidth = 3; cc.fillRect(-30, -10, 60, 80); cc.strokeRect(-30, -10, 60, 80); for (let k = 0; k < 5; k++) { cc.fillStyle = '#b8b0a0'; cc.fillRect(-22, 4 + k * 12, 44, 4); } cc.restore(); } };
// photos of Alice beside Jensen (rendered once offscreen): at the expo, and at a dinner
const PICS = {};
const pic = (k) => { if (PICS[k]) return PICS[k]; const cv = document.createElement('canvas'); cv.width = 960; cv.height = 720; const c = cv.getContext('2d'); const plate = k ? 'taipei_bar' : 'computex_hall';
  const figs = [{ x: 1180, y: 1300, s: 2.2, ...JH.JENSEN(), facing: 1, mood: 'happy', pose: k ? 'wave' : 'stand' }, { x: 1560, y: 1300, s: 2.1, ...JH.ALICE(), facing: -1, mood: 'happy', pose: 'stand' }];
  const S2 = { D: { light: { dir: 1 } } }; c.setTransform(.75, 0, 0, .75, -1350 * .75 + 480, -900 * .75 + 360); c.drawImage(K.imgs[plate], 0, 0, 2560, 1440); for (const f of figs) { c.save(); A.figure(c, f, 1, 0, S2); c.restore(); } PICS[k] = cv; return cv; };
const flashAt = (lt, k) => Math.max(0, 1 - ((lt * 1.3 + k * .37) % 1.7) * 5);

window.SHOTS = [
  // 2.01 a senator in a marble corridor holds up a letter; the letter fills the frame and one passage highlights; chips start flowing
  { plate: 'gov_corridor', cam: { z: [1.25, 1.35], x: [900, 960], y: [900, 920] }, bed: [['office_loop', .08], ['drone', .1]], light: { dir: 1, key: 'rgba(255,244,220,.2)' },
    init: S => { const tS = A.at(S, 'senator', .6), tW = A.at(S, 'writes', 1.5), tF = A.at(S, 'flowing', 3.6), tSu = A.at(S, 'supplier', 5.4), tR = A.at(S, 'reporter', 7.9), tX = A.at(S, 'executives.', 9.5);
      S.D.figs = [{ x: 620, y: 1320, s: 2.2, ...JH.OFFICIAL(1), facing: 1, mood: 'focus', hold: LETTER_H, walk: { x0: -200, x1: 620, t0: 0, dur: Math.max(1.4, tS + .3) }, anim: (o, lt) => { if (lt > tS + .4) o.arms = () => ({ shR: 80, elR: -60, handR: 'fist' }); } }];
      S.D.front = [(c, lt) => tag(c, 'A US SENATOR', 640, 650, lt, tS + .2, { px: 40, col: '#f6efe2' })];
      S.D.over = [(c, lt) => { const a = E.out(K.seg(lt, tW - .2, tW + .5)); if (a <= 0) return; c.save(); c.translate(1340 + (1 - a) * 800, 450); c.rotate(.02);
          const L = ['To the Secretary of Commerce:', '~', 'the chips started flowing after an', 'American supplier met a former', 'state media reporter among', "Megaspeed's executives.", '~'];
          JH.doc(c, -420, -330, 840, 640, { top: "A SENATOR'S LETTER", lines: L }, lt);
          const hs = [[tF - .3, 2], [tSu - .3, 3], [tR - .6, 4], [tX - .5, 5]]; for (const [t0, i] of hs) { const u = E.io(K.seg(lt, t0, t0 + .7)); if (u <= 0) continue; c.fillStyle = 'rgba(255,214,40,.42)'; c.fillRect(-386, -330 + 140 + i * 52 - 22, 700 * u, 42); } c.restore();
          for (let k = 0; k < 6; k++) { const ph = ((lt - tF) * .5 + k / 6) % 1; if (lt < tF) break; JH.chip(c, 900 + ph * 1100, 830 - Math.sin(ph * Math.PI) * 40, .2, { rot: ph * 4 }); } },
        (c, lt) => K.card(c, 'FORMER STATE MEDIA REPORTER', lt, { at: tR + .2, x: 1340, y: 800, px: 40, rot: 2, bg: JH.GOLD })];
      S.D.sfx = [[.1, 'footsteps', .25], [tW - .2, 'paper', .35], [tF - .3, 'scrape', .15], [tF, 'coins', .15], [tSu, 'scrape', .15], [tR, 'pop', .25], [tX, 'scrape', .15]]; } },
  // 2.02 an investor scrolls a feed of photos of Alice beside Jensen; the Megaspeed fundraising meter fills with coins
  { plate: 'boardroom', cam: { z: [1.2, 1.3], x: [1500, 1460], y: [900, 900] }, bed: [['office_loop', .1], ['night_loop', .06]], light: { dir: -1, key: 'rgba(200,220,255,.2)' },
    init: S => { const tR = A.at(S, 'reports', 1.3), tM = A.at(S, 'money', 2.6), tP = A.at(S, 'posting', 4.3), tJ = A.at(S, 'Jensen', 6.4);
      S.D.figs = [{ x: 2060, y: 1380, s: 2.2, ...JH.EXEC(1), facing: -1, mood: 'neutral', hold: PHONE_H, anim: (o, lt) => { o.arms = () => ({ shR: 70, elR: -95, handR: 'fist' }); if (lt > tJ) o.mood = 'happy'; } }];
      S.D.over = [(c, lt) => JH.src(c, 'MULTIPLE OUTLETS', 360, 90, lt, tR - .2, { px: 28 }),
        (c, lt) => { const a = pop(lt, .3, .5); if (a <= 0) return; c.save(); c.translate(620, 470); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.4)'; rr(c, -232, -372, 480, 760, 44); c.fill(); c.fillStyle = '#16161c'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -240, -380, 480, 760, 44); c.fill(); c.stroke();
          c.save(); rr(c, -216, -340, 432, 690, 20); c.clip(); c.fillStyle = '#eef0f4'; c.fillRect(-216, -340, 432, 690); const off = E.io(K.seg(lt, tP - .5, tJ + .8)) * 520 + lt * 6;
          for (let k = 0; k < 4; k++) { const y = -320 + k * 300 - off; c.fillStyle = '#fff'; c.fillRect(-206, y, 412, 290); c.fillStyle = '#7a6a9a'; c.beginPath(); c.arc(-176, y + 26, 18, 0, 7); c.fill(); txt(c, 'Alice H. · posted a photo', -150, y + 26, 22, '#333', 'left', 'Oswald');
            c.drawImage(pic(k % 2), -196, y + 52, 392, 200); c.strokeStyle = '#999'; c.lineWidth = 2; c.strokeRect(-196, y + 52, 392, 200); txt(c, ['With Jensen at the expo!', 'Dinner with Jensen Huang', 'Big week in Taipei', 'AI friends'][k], -196, y + 270, 20, '#555', 'left', 'Oswald'); }
          c.restore(); c.restore(); },
        (c, lt) => { const a = pop(lt, tM - .3, .45); if (a <= 0) return; const f = E.out(K.seg(lt, tM, tJ + 1.4)); c.save(); c.translate(1150, 470); c.scale(a, a); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -82, -282, 180, 580, 20); c.fill(); c.fillStyle = '#1e1e24'; c.strokeStyle = INK; c.lineWidth = 6; rr(c, -90, -290, 180, 580, 20); c.fill(); c.stroke();
          const g = c.createLinearGradient(0, 270, 0, -270); g.addColorStop(0, '#5aa05a'); g.addColorStop(1, JH.GOLD); c.fillStyle = g; rr(c, -70, 270 - 540 * f, 140, 540 * f, 12); c.fill(); txt(c, 'FUNDS RAISED', 0, 330, 30, '#fff', 'center', 'Anton');
          for (let k = 0; k < 6; k++) { const ph = ((lt - tM) * .9 + k / 6) % 1; if (lt < tM) break; c.fillStyle = JH.GOLD; c.strokeStyle = '#7a5a10'; c.lineWidth = 3; c.beginPath(); c.ellipse(Math.sin(k * 2) * 40, -420 + ph * (690 - 540 * f), 22, 9, 0, 0, 7); c.fill(); c.stroke(); } c.restore(); },
        (c, lt) => K.card(c, 'PHOTOS = MONEY FOR MEGASPEED', lt, { at: tJ - .2, x: 1500, y: 130, px: 40, rot: 2 })];
      S.D.sfx = [[tR - .2, 'stamp', .25], [tM, 'coins', .25], [tP, 'whoosh_soft', .2], [tP + .8, 'tick', .2], [tJ, 'coins_cascade', .25], [tJ + .2, 'chime', .2]]; } },
  // 2.03 Computex 2025: photographers' flashes; Jensen stops on the carpet; the camera pushes to the woman behind him
  { plate: 'computex_hall', cam: { z: [1.15, 1.75], x: [1280, 1440], y: [960, 900] }, bed: [['crowd_loop', .2], ['office_loop', .06]], light: { dir: 1, key: 'rgba(255,240,220,.24)' },
    init: S => { const tC = A.at(S, 'Computex', 2.2), tJ = A.at(S, 'Jensen', 3.4), tSt = A.at(S, 'stops', 3.9), tL = A.at(S, 'closely', 6.4), tW = A.at(S, 'woman', 7.5), tAl = A.at(S, 'Alice', 10.0);
      const ph = (x, k, f) => ({ x, y: 1430, s: 2.1, ...[JH.EXEC(0), JH.WOMAN(1), JH.EXEC(2), JH.WOMAN(2)][k], facing: f, mood: 'focus', hold: CAM_H, seed: 70 + k, anim: (o, lt) => { o.arms = () => ({ shR: 128 + 4 * Math.sin(lt * 2 + k), elR: -78, handR: 'fist' }); } });
      S.D.figs = [{ x: 1280, y: 1200, s: 1.7, ...JH.JENSEN(), facing: 1, mood: 'happy', walk: { x0: 760, x1: 1280, t0: 0, dur: Math.max(1.5, tSt) }, anim: (o, lt) => { if (lt > tSt + .3) { o.pose = 'wave'; o.facing = -1; } } },
        { x: 1480, y: 1130, s: 1.58, ...JH.ALICE(), facing: 1, mood: 'neutral', walk: { x0: 1220, x1: 1480, t0: .6, dur: Math.max(1.5, tSt) }, anim: (o, lt) => { if (lt > tSt + .4) o.facing = -1; if (lt > tAl) o.mood = 'smug'; } },
        ph(260, 0, 1), ph(620, 1, 1), ph(2020, 2, -1), ph(2340, 3, -1)];
      S.D.live = [(c, lt) => { for (let k = 0; k < 8; k++) TW.glow(c, 120 + k * 320, 780, 90, '255,255,255', .25 * Math.max(0, Math.sin(lt * 2.3 + k * 1.7))); c.strokeStyle = '#c8a040'; c.lineWidth = 6; for (const px of [560, 2000]) { c.fillStyle = '#c8a040'; c.fillRect(px - 8, 1060, 16, 140); c.beginPath(); c.arc(px, 1056, 14, 0, 7); c.fill(); } c.strokeStyle = '#8a1a1a'; c.lineWidth = 10; c.beginPath(); c.moveTo(560, 1080); c.quadraticCurveTo(1280, 1150, 2000, 1080); c.stroke(); }];
      S.D.front = [(c, lt) => { [260, 620, 2020, 2340].forEach((x, k) => { const f = flashAt(lt, k); if (f > 0) TW.glow(c, x + (k < 2 ? 150 : -150), 930, 260, '255,255,255', .9 * f); }); },
        (c, lt) => tag(c, 'JENSEN HUANG', 1280, 700, lt, tJ, { px: 40 }), (c, lt) => { if (lt > tW - .2) JH.target(c, 1480, 960, lt, tW - .2, { r0: 340, r1: 170, d: 1 }); }, (c, lt) => tag(c, 'ALICE HUANG', 1490, 690, lt, tAl, { px: 34 })];
      S.D.over = [(c, lt) => K.card(c, 'COMPUTEX 2025', lt, { at: tC - .2, x: 340, y: 110, px: 54, rot: -2 }), (c, lt) => K.card(c, 'A YEAR AFTER THE BAR', lt, { at: .3, x: 340, y: 210, px: 36, rot: 2 }), (c, lt) => K.card(c, 'RIGHT BEHIND HIM', lt, { at: tW + .6, x: 1560, y: 120, px: 44, rot: 2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[.3, 'camera_shutter', .25], [1.4, 'camera_shutter', .2], [tC, 'pop', .2], [tSt, 'camera_shutter', .35], [tSt + .5, 'camera_shutter', .3], [tSt + 1.2, 'camera_shutter', .3], [tL, 'tension', .15], [tW - .2, 'whoosh', .2], [tAl, 'hit', .25]]; } },
  // 2.04 a Taipei restaurant at night: the door opens, the two of them step out and walk off, apart; a viewfinder 'seen' them; fade to NOT PUBLIC
  { plate: 'neon_club', cam: { z: [1.7, 1.55], x: [1220, 1080], y: [880, 880] }, bed: [['night_loop', .14], ['city_loop', .1]], light: { dir: 1, key: 'rgba(255,170,120,.24)' },
    init: S => { const tD = A.at(S, 'dinner', 1.5), tSe = A.at(S, 'seen', 5.1), tLv = A.at(S, 'leaving', 5.5), tPr = A.at(S, 'private', 9.5), tPu = A.at(S, 'public.', 10.4);
      const tO = tLv - 1.0; const Jw = { x0: 1420, x1: 300, t0: tO + .1, dur: 6.2 }, Aw = { x0: 1420, x1: 520, t0: tO + 1.2, dur: 5.3 };
      const J = { x: 1420, y: 1052, s: .68, ...JH.JENSEN(), facing: -1, mood: 'neutral', walk: Jw }, Al = { x: 1420, y: 1052, s: .64, ...JH.ALICE(), facing: -1, mood: 'neutral', walk: Aw };
      S.D.live = [(c, lt) => { // restaurant sign + lanterns over the club front, the door opening with warm light
          c.fillStyle = '#2a1414'; c.strokeStyle = INK; c.lineWidth = 6; c.fillRect(1000, 550, 560, 200); c.strokeRect(1000, 550, 560, 200); txt(c, '餐廳', 1280, 615, 70, `rgba(255,${190 + 20 * Math.sin(lt * 9) | 0},120,1)`, 'center', 'Anton'); txt(c, 'RESTAURANT', 1280, 700, 46, '#f6d090', 'center', 'Anton'); TW.glow(c, 1280, 650, 380, '255,140,80', .3);
          for (const lx of [900, 1660]) { const sw = Math.sin(lt * 1.6 + lx) * .06; c.save(); c.translate(lx, 790); c.rotate(sw); c.strokeStyle = '#1a1a1a'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -50); c.lineTo(0, 0); c.stroke(); c.fillStyle = '#d0302a'; c.beginPath(); c.ellipse(0, 40, 34, 44, 0, 0, 7); c.fill(); c.stroke(); TW.glow(c, 0, 40, 120, '255,120,60', .5); c.fillStyle = '#e8b44a'; c.fillRect(-14, 80, 28, 10); c.restore(); }
          const op = E.io(K.seg(lt, tO - .4, tO + .2)) * (1 - E.io(K.seg(lt, tO + 3.2, tO + 3.8))); c.fillStyle = '#ffd48a'; c.fillRect(1186, 846, 142, 186); TW.glow(c, 1257, 1000, 300 * op + 1, '255,200,120', .6 * op);
          c.save(); c.translate(1186, 846); c.scale(1 - op * .85, 1); c.fillStyle = '#5a1a2e'; c.strokeStyle = INK; c.lineWidth = 5; c.fillRect(0, 0, 142, 186); c.strokeRect(0, 0, 142, 186); c.restore();
          c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = op * .5; c.fillStyle = '#ffd48a'; c.beginPath(); c.moveTo(1186, 1032); c.lineTo(1328, 1032); c.lineTo(1480, 1300); c.lineTo(1040, 1300); c.closePath(); c.fill(); c.restore();
          for (const [f, w] of [[Al, Aw], [J, Jw]]) { const x = R.walkX(lt, w.x0, w.x1, w.t0, w.dur, f.s).x; c.save(); if (x > 1250) { c.beginPath(); c.rect(1186, 0, 142, 1090); c.clip(); } A.figure(c, f, lt, 0, S); c.restore(); } }];
      S.D.over = [(c, lt) => K.card(c, 'THAT WEEK · TAIPEI', lt, { at: .3, x: 330, y: 110, px: 48, rot: -2 }), (c, lt) => K.card(c, 'AFTER A DINNER WITH AI SUPPLIERS', lt, { at: tD, x: 520, y: 210, px: 36, rot: 2 }),
        (c, lt) => { const a = fade(lt, tSe - .2, .3) * (1 - fade(lt, tPr - 1, .4)); if (a <= 0) return; c.save(); c.globalAlpha = a; c.strokeStyle = '#fff'; c.lineWidth = 6; for (const [x, y, dx, dy] of [[160, 300, 1, 1], [1760, 300, -1, 1], [160, 860, 1, -1], [1760, 860, -1, -1]]) { c.beginPath(); c.moveTo(x, y + dy * 70); c.lineTo(x, y); c.lineTo(x + dx * 70, y); c.stroke(); }
          c.fillStyle = Math.sin(lt * 6) > 0 ? '#e0403a' : 'rgba(224,64,58,.3)'; c.beginPath(); c.arc(210, 350, 14, 0, 7); c.fill(); txt(c, 'SEEN LEAVING TOGETHER', 240, 352, 30, '#fff', 'left', 'Oswald'); c.restore(); },
        (c, lt) => { const b = E.io(K.seg(lt, tPr - .6, tPr + .4)); if (b <= 0) return; c.fillStyle = `rgba(6,5,8,${b * .94})`; c.fillRect(0, 0, 1920, 1080); K.card(c, 'WHAT HAPPENS IN PRIVATE', lt, { at: tPr - .2, x: 960, y: 420, px: 54, rot: -1 }); K.card(c, "ISN'T PUBLIC", lt, { at: tPu - .3, x: 960, y: 560, px: 64, rot: 2, bg: JH.RED, color: '#fff' }); }];
      S.D.sfx = [[.2, 'pop', .2], [tD, 'pop', .2], [tO - .4, 'creak', .3], [tO + .3, 'footsteps', .25], [tSe, 'camera_shutter', .3], [tO + 3.4, 'door_slam', .15], [tPr - .5, 'whoosh_soft', .25], [tPu, 'thud', .25]]; } },
  // 2.05 a man in a leather jacket alone on a big stage; a question mark over him; a red ring tightens: why would China want him?
  { plate: 'stage_blue', cam: { z: [1.35, 1.6], x: [1300, 1340], y: [760, 760] }, bed: [['drone', .2], ['crowd_loop', .06]], light: { dir: 1, key: 'rgba(160,190,255,.26)' },
    init: S => { const tW = A.at(S, 'who', .3), tB = A.at(S, 'bet', 2.1), tC = A.at(S, 'China', 3.9);
      S.D.figs = [{ x: 1340, y: 905, s: 1.3, ...JH.JENSEN(), facing: -1, mood: 'neutral', anim: (o, lt) => { if (lt > tC) o.mood = 'worried'; } }];
      S.D.live = [(c, lt) => { c.save(); c.globalCompositeOperation = 'screen'; const g = c.createLinearGradient(1340, 0, 1340, 905); g.addColorStop(0, 'rgba(220,235,255,.0)'); g.addColorStop(1, 'rgba(220,235,255,.35)'); c.fillStyle = g; c.beginPath(); c.moveTo(1300, 0); c.lineTo(1380, 0); c.lineTo(1520, 905); c.lineTo(1160, 905); c.closePath(); c.fill(); c.restore(); c.fillStyle = 'rgba(220,235,255,.25)'; c.beginPath(); c.ellipse(1340, 905, 170, 22, 0, 0, 7); c.fill(); }];
      S.D.front = [(c, lt) => { const a = pop(lt, tW, .5); if (a > 0) { c.save(); c.translate(1340, 470 + Math.sin(lt * 2) * 8); c.scale(a, a); txt(c, '?', 6, 8, 220, 'rgba(0,0,0,.4)', 'center', 'Anton'); txt(c, '?', 0, 0, 220, JH.GOLD, 'center', 'Anton'); c.restore(); } JH.target(c, 1340, 760, lt, tC - .2, { r0: 500, r1: 200, d: 1.2 }); }];
      S.D.over = [(c, lt) => K.card(c, 'WHO IS HE?', lt, { at: tW + .2, x: 400, y: 150, px: 64, rot: -2 }), (c, lt) => K.card(c, 'WHY WOULD CHINA WANT HIM?', lt, { at: tC, x: 1480, y: 820, px: 44, rot: 2, bg: JH.RED, color: '#fff' })];
      S.D.sfx = [[tW, 'pop', .3], [tB, 'drum', .25], [tC - .2, 'tension', .25], [tC, 'hit', .3]]; } },
];
