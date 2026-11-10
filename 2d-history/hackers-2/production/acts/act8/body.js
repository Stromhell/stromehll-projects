for (const n of ['court_ext', 'fbi_office']) K.load(n, PL + n + '.jpg');
endTitle(4.2);
// draw a figure into screen space at (x, y) with scale s (used inside split panels)
const fig = (c, f, lt, u, S) => { c.save(); A.figure(c, f, lt, u, S); c.restore(); };
window.SHOTS = [
  // 8.01 in the US the four plead guilty; the gavel bangs; sentence cards: 18 MONTHS, 18 MONTHS, PROBATION
  { plate: 'court_ext', cam: { z: [1.05, 1.15], x: [1280, 1280], y: [700, 680] }, bed: [['city_loop', .1]], light: { dir: -1 },
    init: S => { const tG = A.at(S, 'guilty', 2.0), tD = A.at(S, 'David', 3.2), tA = A.at(S, 'Austin', 6.4), tP = A.at(S, 'probation', 9.4);
      S.D.over = [(c, lt) => { const a = pop(lt, .2, .5); if (a <= 0) return; c.save(); c.translate(960, 760); c.scale(a, a); XU.gavel(c, 0, 0, 1.3, lt, [tG, tD + 1.2, tP]); c.restore(); },
        (c, lt) => K.card(c, 'GUILTY PLEAS · USA', lt, { at: tG, x: 960, y: 110, px: 50, rot: -2 }),
        (c, lt) => [['DAVID', '18 MONTHS', tD + 1.2], ['SONIC', '18 MONTHS', tD + 1.8], ['AUSTIN', 'PROBATION', tP]].forEach(([n, s2, t], k) => { const a = pop(lt, t, .4); if (a <= 0) return; c.save(); c.translate(400 + k * 560, 330); c.scale(a, a); c.rotate((k - 1) * .04); c.fillStyle = '#fbfbf6'; c.strokeStyle = INK; c.lineWidth = 6; TW.rr(c, -230, -90, 460, 180, 16); c.fill(); c.stroke(); TW.txt(c, n, 0, -40, 40, '#6a7080', 'center', 'Anton'); TW.txt(c, s2, 0, 30, 58, k < 2 ? '#b8202a' : '#2a6a3a', 'center', 'Anton'); c.restore(); }),
        (c, lt) => K.card(c, 'HELPED THE FBI', lt, { at: tA + 1.2, x: 1520, y: 500, px: 34, rot: 2 })];
      S.D.sfx = [[tG, 'thud', .4], [tD + 1.2, 'thud', .4], [tD + 1.8, 'pop', .2], [tP, 'thud', .4]]; } },
  // 8.02 David later works in cyber security (left); Sonic struggles on probation, then gets back on his feet as the light warms (right)
  { draw: (c, lt, u, S) => { const W2 = 960; c.fillStyle = '#000'; c.fillRect(0, 0, 1920, 1080);
      // left: David at a security desk
      c.save(); c.beginPath(); c.rect(0, 0, W2 - 4, 1080); c.clip(); c.save(); c.filter = 'brightness(.9)'; const s2 = 1.3 * 1920 / 2560; c.setTransform(s2, 0, 0, s2, 480 - 1100 * s2, 540 - 760 * s2); c.drawImage(K.imgs.fbi_office, 0, 0, 2560, 1440); c.restore(); K.screen(c);
      TW.monitor(c, 120, 400, 420, 250, (cc, w, h) => { cc.fillStyle = '#0c1a2a'; cc.fillRect(0, 0, w, h); TW.txt(cc, 'SECURITY OPS', w / 2, 40, 34, '#9ac4ff', 'center', 'Anton'); for (let k = 0; k < 4; k++) { cc.fillStyle = k === 2 && Math.sin(lt * 4) > 0 ? '#3ad06a' : '#2a4a6a'; cc.fillRect(30, 80 + k * 40, w - 60 - k * 30, 24); } TW.txt(cc, '✓ BLOCKED', w - 30, h - 30, 26, '#3ad06a', 'right', 'Anton'); });
      c.fillStyle = '#3a3e48'; c.fillRect(60, 730, 600, 30); fig(c, Object.assign({ x: 700, y: 1020, s: 1.3, facing: -1, mood: 'happy', pose: 'present' }, XU.DAVID_OLD()), lt, u, S); c.restore();
      // right: Sonic at a window; grey at first, then warm light and a smile
      const warm = E.io(K.seg(lt, S._tB, S._tB + 1.6)); c.save(); c.beginPath(); c.rect(W2 + 4, 0, W2 - 4, 1080); c.clip(); const g = c.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, warm > .5 ? '#5a4a3a' : '#3a3e48'); g.addColorStop(1, '#22242a'); c.fillStyle = g; c.fillRect(W2, 0, W2, 1080);
      c.fillStyle = `rgb(${120 + warm * 135 | 0},${130 + warm * 90 | 0},${150 - warm * 20 | 0})`; c.fillRect(1180, 160, 520, 520); c.strokeStyle = '#1a1a1e'; c.lineWidth = 16; c.strokeRect(1180, 160, 520, 520); c.beginPath(); c.moveTo(1440, 160); c.lineTo(1440, 680); c.moveTo(1180, 420); c.lineTo(1700, 420); c.stroke();
      if (warm > 0) TW.glow(c, 1440, 420, 700, '255,200,120', .3 * warm); c.fillStyle = '#2a2420'; c.fillRect(W2, 800, W2, 280);
      fig(c, Object.assign({ x: 1500, y: 1020, s: 1.3, facing: -1, mood: warm > .4 ? 'happy' : 'worried', pose: warm > .4 ? 'stand' : 'think' }, XU.SONIC()), lt, u, S); c.restore(); c.fillStyle = '#111'; c.fillRect(W2 - 4, 0, 8, 1080); },
    bed: [['hum_loop', .1], ['swell', .08]],
    init: S => { S._tB = A.at(S, 'finally', 6.0); const tS = A.at(S, 'Sonic', 2.8), tJ = A.at(S, 'jailed', 4.6);
      S.D.over = [(c, lt) => K.card(c, 'DAVID · CYBER SECURITY', lt, { at: .3, x: 480, y: 100, px: 40, rot: -2 }), (c, lt) => K.card(c, 'SONIC · STRICT PROBATION', lt, { at: tS, x: 1440, y: 100, px: 38, rot: 2 }), (c, lt) => K.card(c, 'JAILED AGAIN', lt, { at: tJ, x: 1440, y: 200, px: 36, rot: -2, until: S._tB + .3 }), (c, lt) => K.card(c, 'BACK ON HIS FEET', lt, { at: S._tB + .4, x: 1440, y: 200, px: 40, rot: -2 })]; S.D.sub = 'top';
      S.D.sfx = [[.3, 'typing', .12], [tS, 'whoosh_soft', .2], [tJ, 'gate_slam', .25], [S._tB, 'swell', .2]]; } },
  // 8.03 Nathan, one of the least involved, served two years; after release Holly took her own life. A single lit window at night; a helpline card
  { draw: (c, lt, u, S) => { const g = c.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#070a16'); g.addColorStop(1, '#141a2c'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080); for (let k = 0; k < 120; k++) { c.fillStyle = `rgba(255,255,255,${.2 + .25 * Math.sin(lt * .7 + k)})`; c.fillRect((k * 173) % 1920, (k * 97) % 520, 2, 2); }
      const z = 1 + .05 * u; c.save(); c.translate(960, 640); c.scale(z, z); c.translate(-960, -640); c.fillStyle = '#0b0e18'; c.beginPath(); c.moveTo(560, 1080); c.lineTo(560, 520); c.lineTo(960, 300); c.lineTo(1360, 520); c.lineTo(1360, 1080); c.closePath(); c.fill();
      for (const [x, y] of [[680, 600], [1120, 600], [680, 820]]) { c.fillStyle = '#141a28'; c.fillRect(x, y, 120, 140); } const w = .75 + .1 * Math.sin(lt * 1.2); c.fillStyle = `rgba(255,214,150,${w})`; c.fillRect(1120, 820, 120, 140); TW.glow(c, 1180, 890, 420, '255,200,120', .22 * w); c.strokeStyle = '#0b0e18'; c.lineWidth = 8; c.beginPath(); c.moveTo(1180, 820); c.lineTo(1180, 960); c.moveTo(1120, 890); c.lineTo(1240, 890); c.stroke(); c.restore();
      XU.helpline(c, lt, S._tH); },
    bed: [['night_loop', .1], ['drone', .1]], inSfx: false,
    init: S => { S._tH = A.at(S, 'struggling', 9.0) - .6; const tN = A.at(S, 'Nathan', .3);
      S.D.over = [(c, lt) => K.card(c, 'NATHAN · TWO YEARS', lt, { at: tN + .3, x: 960, y: 110, px: 42, rot: -1, until: S._tH }), (c, lt) => { const a = fade(lt, A.at(S, 'Holly', 3.6), .8) * (1 - K.seg(lt, S._tH - .4, S._tH)); if (a <= 0) return; c.save(); c.globalAlpha = a; TW.txt(c, 'HOLLY', 960, 220, 72, '#f4e8d0', 'center', 'Anton'); c.restore(); }];
      S.D.sfx = [[.4, 'swell', .12]]; } },
  // 8.04 in Australia Dylan pleads not guilty, then leaves for the Czech Republic (plane flies off); in 2017 Justin is arrested for separate frauds (cell door clangs)
  { draw: (c, lt, u, S) => { const sw = E.io(K.seg(lt, S._tJ - .4, S._tJ + .2));
      if (sw < 1) { c.save(); c.globalAlpha = 1 - sw; const g = c.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#f0a868'); g.addColorStop(.6, '#f6d6a0'); g.addColorStop(1, '#c8a878'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080); TW.glow(c, 1500, 640, 400, '255,230,180', .5);
        c.fillStyle = '#5a4a3a'; c.fillRect(0, 860, 1920, 220); c.fillStyle = '#3a3230'; c.fillRect(0, 900, 1920, 30); for (let x = 0; x < 1920; x += 140) { c.fillStyle = '#e8e0c8'; c.fillRect(x, 912, 70, 6); }
        const p = E.inn(K.seg(lt, S._tL, S._tL + 3.0)); XU.plane(c, 300 + p * 1800, 880 - p * p * 700, 1.2 - p * .5, -p * .35); c.restore(); }
      if (sw > 0) { c.save(); c.globalAlpha = sw; c.fillStyle = '#1a1c20'; c.fillRect(0, 0, 1920, 1080); XU.cellDoor(c, 460, 140, 1000, 800, K.seg(lt, S._tJ + .6, S._tJ + 1.4) * 1.0); c.restore(); } },
    bed: [['wind_loop', .1]],
    init: S => { S._tL = A.at(S, 'left', 2.4); S._tJ = A.at(S, '2017', 6.4) - .2; const tN = A.at(S, 'not', 1.4), tC = A.at(S, 'Czech', 4.0), tF = A.at(S, 'frauds', 8.4);
      S.D.over = [(c, lt) => K.card(c, 'DYLAN · PLEADED NOT GUILTY', lt, { at: tN, x: 560, y: 110, px: 40, rot: -2, until: S._tJ }), (c, lt) => K.card(c, 'PERTH → CZECH REPUBLIC', lt, { at: tC, x: 560, y: 210, px: 38, rot: 2, until: S._tJ }), (c, lt) => K.card(c, '2017 · JUSTIN', lt, { at: S._tJ + .3, x: 960, y: 70, px: 44, rot: -2 }), (c, lt) => K.card(c, 'SEPARATE FRAUDS · YEARS IN PRISON', lt, { at: tF, x: 960, y: 1000, px: 36, rot: 1 })]; S.D.sub = 'top';
      S.D.sfx = [[S._tL, 'riser', .25], [S._tL + .5, 'whoosh', .25], [S._tJ + 1.3, 'gate_slam', .45]]; } },
  // 8.05 Next: two British teenagers broke into the email of the head of the CIA. A generic agency seal with an inbox icon pings
  { draw: (c, lt, u, S) => { XU.bg(c, lt, '90,150,255'); const a = pop(lt, .2, .5); if (a > 0) { c.save(); c.translate(760, 520); c.scale(a, a); c.rotate(lt * .05); c.fillStyle = '#1f3a6a'; c.strokeStyle = '#d8b44a'; c.lineWidth = 12; c.beginPath(); c.arc(0, 0, 260, 0, 7); c.fill(); c.stroke(); c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 220, 0, 7); c.stroke();
        for (let k = 0; k < 16; k++) { c.save(); c.rotate(k * Math.PI / 8); c.fillStyle = '#d8b44a'; c.beginPath(); c.arc(0, -238, 6, 0, 7); c.fill(); c.restore(); } c.rotate(-lt * .05); c.fillStyle = '#f4f1ea'; c.fillRect(-120, -80, 240, 160); c.strokeStyle = INK; c.lineWidth = 6; c.strokeRect(-120, -80, 240, 160); c.beginPath(); c.moveTo(-120, -80); c.lineTo(0, 10); c.lineTo(120, -80); c.stroke(); c.restore(); }
      const pa = pop(lt, S._tE, .35); if (pa > 0) { c.save(); c.translate(930, 340); c.scale(pa, pa); c.fillStyle = '#d02a2a'; c.beginPath(); c.arc(0, 0, 50, 0, 7); c.fill(); TW.txt(c, '1', 0, 2, 56, '#fff', 'center', 'Anton'); c.restore(); }
      ['🇬🇧', '🇬🇧'].forEach(() => {}); },
    bed: [['tension', .14]],
    init: S => { S._tE = A.at(S, 'email', 3.2); const tB = A.at(S, 'British', 1.2);
      S.D.over = [(c, lt) => K.card(c, 'NEXT', lt, { at: .2, x: 1460, y: 300, px: 70, rot: -3 }), (c, lt) => K.card(c, 'TWO BRITISH TEENAGERS', lt, { at: tB, x: 1460, y: 440, px: 44, rot: 2 }), (c, lt) => K.title(c, 'HACKED THE CIA BOSS', lt, { at: S._tE, x: 1360, y: 620, px: 74 })]; S.D.sub = 'top';
      S.D.sfx = [[.2, 'pop', .2], [tB, 'whoosh', .25], [S._tE, 'chime', .35]]; } },
  // 8.06 end card: Part 3 next
  { draw: (c, lt) => { XU.bg(c, lt + 20); c.save(); c.globalAlpha = .3; c.filter = 'blur(3px)'; XU.wall(c, lt + 9, Array(12).fill(-9), { y0: 300, in: -5 }); c.restore(); }, bed: [['drone', .2]], sub: 'off',
    over: [(c, lt) => K.title(c, 'THE KIDS WHO', lt, { at: .2, y: 380, px: 120 }), (c, lt) => K.title(c, 'HACKED THE WORLD', lt, { at: .5, y: 530, px: 140 }), (c, lt) => K.card(c, 'PART 3 · NEXT', lt, { at: 1.1, x: 960, y: 720, px: 60, rot: -2 })],
    sfx: [[.2, 'chime', .35], [.5, 'stamp', .3], [1.1, 'whoosh', .3]] },
];
