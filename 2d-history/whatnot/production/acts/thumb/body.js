// WN thumbnail: shot 0 = v1 SHOPPING APP?, shot 1 = v2 IT'S A CASINO? Static frames for snap (t=1, t=3). World 2560x1440.
K.load('break_studio', PL + 'break_studio.jpg');
const GOLD = '#f2c21a', RD = '#e8282e';
const big = (c, s, x, y, px, col, al = 'center') => { c.save(); c.font = `${px}px Anton`; c.textAlign = al; c.textBaseline = 'middle'; c.lineJoin = 'round';
  c.fillStyle = 'rgba(0,0,0,.75)'; c.fillText(s, x + 12, y + 14); c.strokeStyle = '#000'; c.lineWidth = px * .16; c.strokeText(s, x, y); c.fillStyle = col; c.fillText(s, x, y); c.restore(); };
const tag = (c, s, x, y, px, bg, fg, rot) => { c.save(); c.font = `${px}px Anton`; const w = c.measureText(s).width + px * .9, h = px * 1.45; c.translate(x, y); c.rotate(rot); c.fillStyle = '#000'; TW.rr(c, -w / 2 + 8, -h / 2 + 8, w, h, 12); c.fill(); c.fillStyle = bg; TW.rr(c, -w / 2, -h / 2, w, h, 12); c.fill(); c.strokeStyle = '#000'; c.lineWidth = 6; c.stroke(); TW.txt(c, s, 0, -px * .05, px, fg, 'center', 'Anton'); c.restore(); };
const slot = (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3a0a4a'); g.addColorStop(1, '#0a0410'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  // slot frame
  c.fillStyle = '#c8302a'; c.strokeStyle = '#000'; c.lineWidth = 6; TW.rr(c, 14, h * .2, w - 28, h * .5, 24); c.fill(); c.stroke();
  for (let i = 0; i < 14; i++) { const lx = 30 + i * (w - 60) / 13; TW.glow(c, lx, h * .2 + 14, 16, '255,230,120', 1); TW.glow(c, lx, h * .7 - 14, 16, '255,230,120', 1); }
  const rw = (w - 70) / 3; for (let k = 0; k < 3; k++) { const rx = 35 + k * rw; c.fillStyle = '#f4efe2'; c.fillRect(rx + 4, h * .24, rw - 8, h * .42); c.strokeRect(rx + 4, h * .24, rw - 8, h * .42); }
  WN.card(c, 35 + rw * .5, h * .62, .95, '#2a6ac8', 0); WN.card(c, 35 + rw * 2.5, h * .62, .95, '#2a9a5a', 0);
  TW.glow(c, w / 2, h * .45, 260, '255,210,80', .9); WN.goldCard(c, w / 2, h * .67, 1.45, 0, 1);
  c.strokeStyle = RD; c.lineWidth = 8; c.beginPath(); c.moveTo(20, h * .45); c.lineTo(w - 20, h * .45); c.globalAlpha = .5; c.stroke(); c.globalAlpha = 1;
  big(c, 'LIVE', 70, 60, 50, '#fff', 'center'); WN.swipe(c, w / 2, h - 120, .55, 0); };
const shot = (l1, l2, c1, c2) => ({ plate: 'break_studio', sub: 'off', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, bed: [], light: {},
  init: S => { S.D.figs = [{ x: 520, y: 2280, s: 7.2, ...WN.SEAN(), facing: 1, mood: 'shocked', eyesClosed: 0, arms: () => (window.ARMS || { shR: 165, elR: 125, shL: 25, elL: -20 }) }];
    S.D.live = [(c) => { c.save(); c.fillStyle = 'rgba(8,4,20,.62)'; c.fillRect(0, 0, 2560, 1440); c.restore(); TW.glow(c, 1700, 900, 1100, '255,190,60', .35); TW.glow(c, 560, 1500, 700, '90,230,120', .35); }];
    S.D.front = [(c) => { TW.glow(c, 560, 1440, 600, '200,230,90', .3); }];
    S.D.over = [(c) => { const coins = (x, y, r) => { c.save(); c.fillStyle = GOLD; c.strokeStyle = '#000'; c.lineWidth = 5; c.beginPath(); c.ellipse(x, y, r, r * .8, .3, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#ffe98a'; c.beginPath(); c.ellipse(x - r * .2, y - r * .2, r * .45, r * .3, .3, 0, 7); c.fill(); c.restore(); };
      c.save(); TW.glow(c, 1380, 640, 700, '255,200,70', .55); c.translate(1420, 1190); c.rotate(.1); WN.phone(c, 0, 0, 1.22, slot); c.restore();
      [[930, 520, 1.3, '#c8302a'], [1810, 470, 1.2, '#2a6ac8'], [1010, 790, 1.05, '#1a1a1a'], [1830, 760, 1.25, '#c8302a'], [1000, 330, .9, '#2a9a5a']].forEach(([x, y, s, col]) => WN.chip(c, x, y, s, col));
      [[880, 690, 38], [1870, 620, 34], [1110, 430, 30], [1870, 330, 30], [960, 960, 34], [1080, 620, 26]].forEach(([x, y, r]) => coins(x, y, r));
      c.font = '190px Anton'; const w1 = c.measureText(l1 + ' ').width, w2 = c.measureText(l2).width, x0 = 1890 - w1 - w2; big(c, l1, x0, 130, 190, c1, 'left'); big(c, l2, x0 + w1, 130, 190, c2, 'left');
      tag(c, 'WHATNOT', 820, 290, 84, '#ffe21a', '#000', -.04); tag(c, '$25,000 IN 1 CLICK', 320, 990, 58, RD, '#fff', -.03); }]; } });
window.SHOTS = [shot('SHOPPING', 'APP?', '#fff', RD), shot("IT'S A", 'CASINO?', '#fff', RD)];
