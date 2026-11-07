endTitle(4.5);
const box = (c, x, y, s, lt, tagA) => { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(0, 230, 380, 40, 0, 0, 7); c.fill();
  c.fillStyle = '#2a8a3a'; c.strokeStyle = INK; c.lineWidth = 8; c.beginPath(); c.moveTo(-300, -120); c.lineTo(200, -120); c.lineTo(320, -200); c.lineTo(-180, -200); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#1e6a2a'; c.beginPath(); c.moveTo(200, -120); c.lineTo(320, -200); c.lineTo(320, 140); c.lineTo(200, 220); c.closePath(); c.fill(); c.stroke(); c.fillStyle = '#34a046'; c.fillRect(-300, -120, 500, 340); c.strokeRect(-300, -120, 500, 340);
  c.fillStyle = '#e8e8e2'; c.fillRect(-120, -120, 140, 340); TW.txt(c, 'NEXT-GEN', -50, -50, 46, '#fff', 'center', 'Anton'); c.save(); c.translate(-50, 60); c.fillStyle = '#1a1a1e'; TW.rr(c, -100, -30, 200, 90, 20); c.fill(); c.restore(); TW.txt(c, 'CONSOLE · UNRELEASED', -50, 180, 26, '#e8ffe8', 'center', 'Anton');
  if (tagA > 0) { c.save(); c.translate(240, -40); c.rotate(.25 + Math.sin(lt * 2) * .05); c.scale(tagA, tagA); c.strokeStyle = '#c8b89a'; c.lineWidth = 4; c.beginPath(); c.moveTo(-20, -120); c.lineTo(0, -40); c.stroke(); c.fillStyle = '#f4e8c8'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(-90, -40); c.lineTo(90, -40); c.lineTo(90, 60); c.lineTo(-90, 60); c.closePath(); c.fill(); c.stroke(); TW.txt(c, 'STOLEN', 0, 12, 48, RED, 'center', 'Anton'); c.restore(); } c.restore(); };
window.SHOTS = [
  // 8.01 the scary part: no brilliant code, just a phone call and a fake web page, side by side, glowing
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); const a = pop(lt, S._tP - .2, .5), b = pop(lt, S._tF - .2, .5); TW.glow(c, 600, 520, 380, '58,208,255', .3 * a); TW.glow(c, 1320, 520, 380, '224,64,58', .3 * b);
      if (a > 0) { c.save(); c.translate(600, 500); c.scale(a, a); c.rotate(Math.sin(lt * 20) * .02 * (lt < S._tF ? 1 : 0)); TW.phone(c, 0, 0, 2.2, (cc, w, h) => { TW.txt(cc, 'CALLING…', w / 2, 60, 18, '#fff', 'center', 'Anton'); TW.txt(cc, 'IT HELP DESK', w / 2, 100, 14, '#3ad0ff', 'center', 'Anton'); }); c.restore(); }
      if (b > 0) { c.save(); c.translate(1320, 500); c.scale(b, b); TW.login(c, 0, 0, 520, 420, { url: 'twitter-help.vpn-login.co', fake: true }); c.restore(); }
      const nc = pop(lt, .6, .5), ns = K.clamp(pop(lt, S._tN, .4)); if (nc > 0) { c.save(); c.globalAlpha = Math.min(1, nc); c.translate(960, 480 - 280 * E.io(K.clamp((lt - S._tN - .4) / .6))); c.font = '60px monospace'; c.fillStyle = '#5ad86a'; c.textAlign = 'center'; c.fillText('</ brilliant code >', 0, 0); c.strokeStyle = RED; c.lineWidth = 10; c.beginPath(); if (ns > 0) { c.moveTo(-330, 10); c.lineTo(-330 + 660 * ns, 10 - 40 * ns); c.stroke(); } c.restore(); } },
    bed: [['drone', .16]],
    init: S => { S._tN = A.at(S, 'brilliant', 2.4) - .2; S._tP = A.at(S, 'phone', 4.4); S._tF = A.at(S, 'fake', 6.0);
      S.D.over = [(c, lt) => K.card(c, 'THE SCARY PART', lt, { at: .3, x: 960, y: 110, px: 50, rot: -2, until: S._tN + .3 }), (c, lt) => K.title(c, 'NO GENIUS NEEDED', lt, { at: S._tF + 1, x: 960, y: 880, px: 90 })];
      S.D.sfx = [[S._tN, 'scrape', .25], [S._tP, 'phone_ring', .25], [S._tF, 'pop', .3], [S._tF + 1, 'drum', .35]]; } },
  // 8.02 a 17-year-old briefly held the voices of presidents and billionaires; he used them to steal Bitcoin; it could have been worse
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '224,64,58'); c.save(); c.globalAlpha = .55; c.translate(960, 500); const z = 1.1 - .08 * u; c.scale(z, z); c.translate(-960, -500); TW.wall(c, lt + 40, Array(12).fill(0), { y0: 260 }); c.restore();
      c.save(); c.fillStyle = 'rgba(6,4,10,.55)'; c.beginPath(); c.ellipse(960, 1100, 760, 520, 0, 0, 7); c.fill(); c.restore();
      const g = TW.GRAHAM(); A.figure(c, { x: 960, y: 1180, s: 2.3, ...g, pose: 'stand', facing: 1, mood: lt > S._tW ? 'worried' : 'focus', arms: () => ({ shR: 55, elR: -95, handR: 'relaxed' }), hold: { near: cc => TW.phone(cc, 0, 30, .5, (c2, w, h) => { c2.fillStyle = RED; c2.fillRect(0, 0, w, h); TW.txt(c2, '₿', w / 2, h / 2, 60, '#fff', 'center', 'Anton'); }) } }, lt, u, S); TW.glow(c, 960, 640, 260, '255,80,60', .2 + .08 * Math.sin(lt * 3)); },
    bed: [['drone', .16]],
    init: S => { S._tW = A.at(S, 'worse', 7.4) - .3;
      S.D.over = [(c, lt) => K.card(c, 'PRESIDENTS · BILLIONAIRES', lt, { at: A.at(S, 'presidents', 2.4) - .2, x: 400, y: 140, px: 40, rot: -2 }), (c, lt) => K.card(c, 'USED TO STEAL BITCOIN', lt, { at: A.at(S, 'steal', 4.6) - .2, x: 1520, y: 140, px: 40, rot: 2 }), (c, lt) => K.title(c, 'IT COULD HAVE BEEN WORSE', lt, { at: S._tW, x: 960, y: 260, px: 70 })];
      S.D.sfx = [[.3, 'heartbeat', .2], [S._tW, 'drum', .3]]; } },
  // 8.03 he wasn't the first; part two: the boys who stole the next console before it was released
  { draw: (c, lt, u, S) => { TW.techBG(c, lt, '90,200,120'); const a = pop(lt, .5, .6); if (a > 0) { c.save(); c.translate(0, (1 - a) * 200); c.globalAlpha = Math.min(1, a); box(c, 960, 470, 1.1 + .04 * u, lt, pop(lt, S._tS, .4)); c.restore(); } },
    bed: [['tension', .14]],
    init: S => { S._tB = A.at(S, 'part', 4.2); S._tS = A.at(S, 'stole', 5.4);
      S.D.over = [(c, lt) => K.card(c, "HE WASN'T THE FIRST", lt, { at: .3, x: 960, y: 120, px: 50, rot: -2 }), (c, lt) => K.title(c, 'NEXT: STOLE THE XBOX', lt, { at: A.at(S, 'Microsoft', 7) - .2, x: 960, y: 880, px: 80 })];
      S.D.sfx = [[S._tB, 'whoosh', .3], [S._tS, 'stamp', .35]]; } },
  // 8.04 end card
  { draw: (c, lt) => { TW.techBG(c, lt + 30, '122,92,255'); }, bed: [['drone', .18]], sub: 'off',
    over: [(c, lt) => K.title(c, 'THE KIDS WHO HACKED THE WORLD', lt, { at: .2, y: 420, px: 96 }), (c, lt) => K.card(c, 'PART 2 NEXT · THE XBOX UNDERGROUND', lt, { at: .8, x: 960, y: 600, px: 50, rot: -2 }), (c, lt) => K.card(c, 'STORMI EXPLAIN EVERYTHING', lt, { at: 1.4, x: 960, y: 760, px: 36, rot: 1 })],
    sfx: [[.2, 'drum', .35], [.8, 'stamp', .3]] },
];
