// JD thumbnail: shot 0 = v1 PAID TO QUIT, shot 1 = v2 PAID TO DISAPPEAR. Static frames for snap (t=1, t=3). World 2560x1440.
K.load('boardroom', PL + 'boardroom.jpg');
const GOLD = '#f2c21a', RD = '#e8282e';
const big = (c, s, x, y, px, col, al = 'center') => { c.save(); c.font = `${px}px Anton`; c.textAlign = al; c.textBaseline = 'middle'; c.lineJoin = 'round';
  c.fillStyle = 'rgba(0,0,0,.75)'; c.fillText(s, x + 12, y + 14); c.strokeStyle = '#000'; c.lineWidth = px * .16; c.strokeText(s, x, y); c.fillStyle = col; c.fillText(s, x, y); c.restore(); };
const tag = (c, s, x, y, px, bg, fg, rot) => { c.save(); c.font = `${px}px Anton`; const w = c.measureText(s).width + px * .9, h = px * 1.45; c.translate(x, y); c.rotate(rot); c.fillStyle = '#000'; TW.rr(c, -w / 2 + 8, -h / 2 + 8, w, h, 12); c.fill(); c.fillStyle = bg; TW.rr(c, -w / 2, -h / 2, w, h, 12); c.fill(); c.strokeStyle = '#000'; c.lineWidth = 6; c.stroke(); TW.txt(c, s, 0, -px * .05, px, fg, 'center', 'Anton'); c.restore(); };
const ytScreen = (c, w, h) => { c.fillStyle = '#16161c'; c.fillRect(0, 0, w, h); c.fillStyle = '#e2342e'; TW.rr(c, w / 2 - 110, h * .3, 220, 150, 40); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.moveTo(w / 2 - 35, h * .3 + 35); c.lineTo(w / 2 + 50, h * .3 + 75); c.lineTo(w / 2 - 35, h * .3 + 115); c.closePath(); c.fill();
  big(c, '15M', w / 2, h * .8, 90, '#fff'); TW.txt(c, 'SUBSCRIBERS', w / 2, h * .88, 34, '#bbb', 'center', 'Oswald');
  c.globalAlpha = .8; c.strokeStyle = RD; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(40, 60); c.lineTo(w - 40, h - 60); c.moveTo(w - 40, 60); c.lineTo(40, h - 60); c.stroke(); };
const shot = (l1, l2) => ({ plate: 'boardroom', sub: 'off', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, bed: [], light: {},
  init: S => { S.D.figs = [{ x: 560, y: 2330, s: 7.0, ...JD.JACK(), facing: 1, mood: 'shocked', eyesClosed: 0, arms: () => ({ shR: 160, elR: 120, shL: 25, elL: -20 }) }];
    S.D.live = [(c) => { c.save(); c.fillStyle = 'rgba(8,6,20,.55)'; c.fillRect(0, 0, 2560, 1440); c.restore(); TW.glow(c, 1750, 800, 1100, '120,230,120', .35); TW.glow(c, 560, 1500, 700, '255,200,90', .3); }];
    S.D.over = [(c) => { // screen space 1920x1080
      TW.glow(c, 1450, 640, 420, '90,220,110', .5); JD.briefcase(c, 1440, 1000, 2.6, 1);
      for (let i = 0; i < 9; i++) { c.save(); c.translate(1080 + i * 95, 260 + (i * 73) % 220); c.rotate(-.5 + (i % 4) * .3); c.fillStyle = '#6ab45a'; c.strokeStyle = '#000'; c.lineWidth = 4; TW.rr(c, -60, -28, 120, 56, 6); c.fill(); c.stroke(); c.fillStyle = '#d8f0c8'; c.beginPath(); c.arc(0, 0, 16, 0, 7); c.fill(); c.restore(); }
      WN.phone(c, 1000, 760, .62, ytScreen);
      big(c, l1, 1430, 150, 150, '#fff'); big(c, l2, 1430, 320, 190, GOLD);
      tag(c, 'JACK DOHERTY', 1500, 500, 70, GOLD, '#111', -.04);
      JD.stamp(c, 1020, 1010, .75, 'BANNED', 1); }];
  } });
window.SHOTS = [shot('PAID TO', 'QUIT'), shot('PAID TO', 'VANISH')];
