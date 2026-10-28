// Rough pencil storyboard frames from a tiny spec language. Draws at 960x540, then greys it like graphite on paper.
// Spec tokens (separated by ';'):
//   bg:<type>[|<type2>]   background (two types = split frame, left|right)
//   fig:x,y,pose,costume[,facing,scale,hair]   character (x,y = feet, 0..1 of frame)
//   prop:name,x,y[,size,label]   prop or icon
//   txt:x,y,TEXT          where on-screen text sits
//   cam:push|pull|panL|panR|up|down|static   camera move (drawn as frame guides/arrows)
//   arr:x1,y1,x2,y2       motion arrow
(function (G) {
  const W = 960, H = 540;
  let R = Math.random;
  const seed = s => { let x = 0; for (const ch of s) x = (x * 31 + ch.charCodeAt(0)) >>> 0; x = x || 7; R = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; };
  const j = (a = 1.6) => (R() - .5) * 2 * a;
  const GR = 'rgba(40,36,32,', ln = (c, pts, w = 1.6, al = .8) => { for (let pass = 0; pass < 2; pass++) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x + j(), y + j()) : c.moveTo(x + j(), y + j())); c.strokeStyle = GR + (al * (pass ? .55 : 1)) + ')'; c.lineWidth = w * (pass ? .7 : 1); c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); } };
  const rect = (c, x, y, w, h, wd = 1.6) => ln(c, [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], wd);
  const circ = (c, x, y, r, wd = 1.6) => { const p = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; p.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); } ln(c, p, wd); };
  const ell = (c, x, y, rx, ry, a0 = 0, a1 = Math.PI * 2, wd = 1.6) => { const p = []; for (let i = 0; i <= 24; i++) { const a = a0 + (a1 - a0) * i / 24; p.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry]); } ln(c, p, wd); };
  const hatch = (c, x, y, w, h, dens = 7, al = .25, ang = 1) => { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); for (let k = -h; k < w; k += dens) { c.beginPath(); c.moveTo(x + k + j(1), y + h); c.lineTo(x + k + h * ang + j(1), y); c.strokeStyle = GR + al + ')'; c.lineWidth = 1; c.stroke(); } c.restore(); };
  const label = (c, txt, x, y, px = 15, al = .8) => { c.save(); c.font = `${px}px Caveat, cursive`; c.fillStyle = GR + al + ')'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt, x, y); c.restore(); };
  const ground = (c, y) => { ln(c, [[0, y], [W * .3, y + j(4)], [W * .7, y + j(4)], [W, y]], 1.4); for (let i = 0; i < 26; i++) { const x = R() * W, yy = y + 8 + R() * (H - y - 8); ln(c, [[x, yy], [x + 8 + R() * 12, yy]], .9, .35); } };
  const tree = (c, x, y, s = 1) => { ln(c, [[x, y], [x + j(3), y - 70 * s]], 2.2); ln(c, [[x, y - 50 * s], [x - 30 * s, y - 78 * s]], 1.4); ln(c, [[x, y - 55 * s], [x + 34 * s, y - 80 * s]], 1.4); ell(c, x, y - 86 * s, 80 * s, 16 * s); hatch(c, x - 70 * s, y - 92 * s, 140 * s, 14 * s, 5, .3); };
  const hut = (c, x, y, s = 1) => { ell(c, x, y, 55 * s, 45 * s, Math.PI, Math.PI * 2); ln(c, [[x - 55 * s, y], [x + 55 * s, y]]); ell(c, x + 10 * s, y, 10 * s, 22 * s, Math.PI, Math.PI * 2); hatch(c, x - 50 * s, y - 40 * s, 100 * s, 40 * s, 9, .18, -1); };
  const fire = (c, x, y, s = 1) => { for (let k = 0; k < 3; k++) ln(c, [[x - 16 * s + k * 14 * s, y], [x - 6 * s + k * 6 * s + j(2), y - 26 * s - k * 6 * s], [x + 2 * s + k * 4 * s, y]], 1.3); ell(c, x, y + 3, 30 * s, 6 * s); };
  const building = (c, x, y, w, h, win = true) => { rect(c, x, y - h, w, h); if (win) for (let yy = y - h + 10; yy < y - 12; yy += 18) for (let xx = x + 8; xx < x + w - 10; xx += 16) rect(c, xx, yy, 8, 10, .8); };
  const person = (c, x, y, pose, cos, facing, s, hair) => { RIG.figure(c, { x, y, s: s * .62, pose, costume: cos || 'shirt', facing: facing || 1, t: .4, phase: 1.2, seed: 3, hair: hair || 'short', shadowAlpha: .25 }); };
  const icon = (c, name, x, y, s = 1, lab) => {
    const S = 40 * s;
    switch (name) {
      case 'fire': fire(c, x, y, s); break;
      case 'tree': tree(c, x, y, s); break;
      case 'hut': hut(c, x, y, s); break;
      case 'rock': ell(c, x, y, S * .8, S * .4, Math.PI, Math.PI * 2); ln(c, [[x - S * .8, y], [x + S * .8, y]]); break;
      case 'phone': rect(c, x - S * .3, y - S * .55, S * .6, S * 1.1); rect(c, x - S * .22, y - S * .45, S * .44, S * .8, 1); break;
      case 'clock': circ(c, x, y, S * .5); ln(c, [[x, y], [x, y - S * .35]]); ln(c, [[x, y], [x + S * .25, y]]); break;
      case 'calendar': rect(c, x - S, y - S * .7, S * 2, S * 1.4); for (let i = 0; i < 4; i++) ln(c, [[x - S, y - S * .3 + i * S * .25], [x + S, y - S * .3 + i * S * .25]], .8); for (let i = 1; i < 7; i++) ln(c, [[x - S + i * S * 2 / 7, y - S * .3], [x - S + i * S * 2 / 7, y + S * .7]], .8); break;
      case 'skeleton': circ(c, x, y - S * 1.6, S * .22); ln(c, [[x, y - S * 1.38], [x, y - S * .5]], 2); for (let i = 0; i < 4; i++) ln(c, [[x - S * .3, y - S * 1.2 + i * S * .15], [x + S * .3, y - S * 1.2 + i * S * .15]], 1); ln(c, [[x, y - S * .5], [x - S * .2, y]], 1.6); ln(c, [[x, y - S * .5], [x + S * .2, y]], 1.6); break;
      case 'bones': ln(c, [[x - S, y], [x + S, y]], 2.4); circ(c, x - S, y - 4, 6); circ(c, x - S, y + 4, 6); circ(c, x + S, y - 4, 6); circ(c, x + S, y + 4, 6); break;
      case 'spear': ln(c, [[x - S * 1.2, y + S * .4], [x + S * 1.2, y - S * .4]], 1.8); ln(c, [[x + S * 1.2, y - S * .4], [x + S * .95, y - S * .45], [x + S * 1.05, y - S * .25], [x + S * 1.2, y - S * .4]]); break;
      case 'book': rect(c, x - S * .8, y - S * .5, S * 1.6, S); ln(c, [[x, y - S * .5], [x, y + S * .5]]); for (let i = 0; i < 4; i++) { ln(c, [[x - S * .7, y - S * .3 + i * 10], [x - S * .1, y - S * .3 + i * 10]], .7); ln(c, [[x + S * .1, y - S * .3 + i * 10], [x + S * .7, y - S * .3 + i * 10]], .7); } break;
      case 'bars': for (let i = 0; i < 4; i++) { const h = S * (.6 + i * .35); rect(c, x - S * 1.2 + i * S * .65, y - h, S * .45, h); hatch(c, x - S * 1.2 + i * S * .65, y - h, S * .45, h, 6, .2); } ln(c, [[x - S * 1.4, y], [x + S * 1.5, y]]); break;
      case 'pie': circ(c, x, y, S); ln(c, [[x, y], [x, y - S]]); ln(c, [[x, y], [x + S * .9, y + S * .4]]); hatch(c, x, y - S, S, S * 1.3, 6, .2); break;
      case 'map': rect(c, x - S * 2, y - S * 1.3, S * 4, S * 2.6, 2); ln(c, [[x - S * 1.4, y - S * .8], [x - S * .5, y - S], [x + S * .2, y - S * .5], [x + S * 1.2, y - S * .7], [x + S * 1.5, y + S * .2], [x + S * .6, y + S * .9], [x - S * .4, y + S * .6], [x - S * 1.3, y + S * .1], [x - S * 1.4, y - S * .8]], 1.2); circ(c, x + (lab ? 0 : 0), y, 6, 2); hatch(c, x - S * 2, y - S * 1.3, S * 4, S * 2.6, 14, .08); break;
      case 'pin': circ(c, x, y - 10, 7, 2); ln(c, [[x, y - 3], [x, y + 6]], 2); break;
      case 'coins': for (let i = 0; i < 6; i++) ell(c, x, y - i * 7, S * .5, S * .15); break;
      case 'server': for (let i = 0; i < 3; i++) { rect(c, x - S * 1.4 + i * S, y - S * 2, S * .8, S * 2); for (let k = 0; k < 6; k++) ln(c, [[x - S * 1.3 + i * S, y - S * 1.8 + k * S * .3], [x - S * .7 + i * S, y - S * 1.8 + k * S * .3]], .7); } break;
      case 'chip': rect(c, x - S * .7, y - S * .7, S * 1.4, S * 1.4, 2); rect(c, x - S * .35, y - S * .35, S * .7, S * .7); for (let i = 0; i < 5; i++) { const o = -S * .55 + i * S * .27; ln(c, [[x + o, y - S * .7], [x + o, y - S * .95]], 1); ln(c, [[x + o, y + S * .7], [x + o, y + S * .95]], 1); ln(c, [[x - S * .7, y + o], [x - S * .95, y + o]], 1); ln(c, [[x + S * .7, y + o], [x + S * .95, y + o]], 1); } break;
      case 'card': rect(c, x - S * 2.2, y - S * .55, S * 4.4, S * 1.1, 2.2); break;
      case 'doc': rect(c, x - S * .6, y - S * .8, S * 1.2, S * 1.6); for (let i = 0; i < 6; i++) ln(c, [[x - S * .45, y - S * .55 + i * S * .2], [x + S * .45, y - S * .55 + i * S * .2]], .7); break;
      case 'tower': building(c, x - S * .7, y, S * 1.4, S * 5); hatch(c, x - S * .7, y - S * 5, S * 1.4, S * 5, 5, .35); break;
      case 'arrowcycle': ell(c, x, y, S * 1.6, S * 1.1); for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2; circ(c, x + Math.cos(a) * S * 1.6, y + Math.sin(a) * S * 1.1, S * .32); } break;
      case 'flute': ln(c, [[x - S * 1.3, y + 6], [x + S * 1.3, y - 6]], 6, .5); for (let i = 0; i < 5; i++) circ(c, x - S * .5 + i * S * .3, y + 2 - i * 1.5, 3); break;
      case 'beads': for (let i = 0; i < 9; i++) { const a = Math.PI * .1 + i / 8 * Math.PI * .8; circ(c, x + Math.cos(a) * S, y + Math.sin(a) * S * .5, 5); } break;
      case 'car': rect(c, x - S * 1.2, y - S * .5, S * 2.4, S * .5); ln(c, [[x - S * .7, y - S * .5], [x - S * .4, y - S * .9], [x + S * .5, y - S * .9], [x + S * .8, y - S * .5]]); circ(c, x - S * .7, y, S * .2); circ(c, x + S * .7, y, S * .2); break;
      case 'desk': ln(c, [[x - S * 1.6, y - S * .8], [x + S * 1.6, y - S * .8]], 2.2); ln(c, [[x - S * 1.4, y - S * .8], [x - S * 1.4, y]]); ln(c, [[x + S * 1.4, y - S * .8], [x + S * 1.4, y]]); break;
      case 'chair': ln(c, [[x - S * .4, y - S * .9], [x + S * .4, y - S * .9]], 2); ln(c, [[x - S * .4, y - S * .9], [x - S * .4, y]]); ln(c, [[x + S * .4, y - S * .9], [x + S * .4, y]]); ln(c, [[x - S * .4, y - S * .9], [x - S * .45, y - S * 1.8]]); break;
      case 'screen': rect(c, x - S * 1.2, y - S * .8, S * 2.4, S * 1.5, 2); hatch(c, x - S * 1.2, y - S * .8, S * 2.4, S * 1.5, 8, .12); break;
      case 'gate': for (let i = 0; i < 6; i++) ln(c, [[x - S + i * S * .4, y], [x - S + i * S * .4, y - S * 1.4]], 2); ln(c, [[x - S, y - S * .5], [x + S, y - S * .5]], 1.6); break;
      case 'plough': ln(c, [[x - S, y - S * .8], [x + S * .3, y]], 2.2); ln(c, [[x + S * .3, y], [x + S * .8, y - S * .1]], 2.2); break;
      case 'sacks': for (let i = 0; i < 3; i++) ell(c, x - S * .6 + i * S * .6, y - S * .4, S * .32, S * .45); break;
      case 'log': ell(c, x, y - S * .2, S * .9, S * .22); ell(c, x + S * .9, y - S * .2, S * .1, S * .22); break;
      case 'bed': rect(c, x - S * 1.6, y - S * .6, S * 3.2, S * .4); ln(c, [[x - S * 1.6, y - S * .2], [x - S * 1.6, y]]); ln(c, [[x + S * 1.6, y - S * .2], [x + S * 1.6, y]]); ell(c, x - S * 1.2, y - S * .7, S * .35, S * .15); break;
      case 'stamp': rect(c, x - S, y - S * .4, S * 2, S * .8, 3); break;
      default: rect(c, x - S * .8, y - S * .6, S * 1.6, S * 1.2); hatch(c, x - S * .8, y - S * .6, S * 1.6, S * 1.2, 9, .12);
    }
    if (lab) label(c, lab, x, y + S * .9 + 12, 17);
  };
  const BG = {
    savanna: (c, x0, w) => { ln(c, [[x0, 280], [x0 + w * .3, 268], [x0 + w * .6, 276], [x0 + w, 266]], 1.2, .5); ground(c, 300); circ(c, x0 + w * .75, 250, 18, 1.2); tree(c, x0 + w * .18, 330, .9); },
    savannaNight: (c, x0, w) => { hatch(c, x0, 0, w, 300, 5, .28); BG.savanna(c, x0, w); },
    night: (c, x0, w) => { hatch(c, x0, 0, w, H, 5, .3); ground(c, 330); },
    bedroom: (c, x0, w) => { hatch(c, x0, 0, w, H, 6, .22); ln(c, [[x0, 380], [x0 + w, 380]]); rect(c, x0 + w * .15, 300, w * .6, 80); rect(c, x0 + w * .78, 160, w * .12, w * .12); },
    office: (c, x0, w) => { ln(c, [[x0, 360], [x0 + w, 360]]); rect(c, x0 + w * .1, 90, w * .25, 150); rect(c, x0 + w * .62, 90, w * .25, 150); icon(c, 'desk', x0 + w * .5, 420, 1.3); },
    kitchen: (c, x0, w) => { ln(c, [[x0, 340], [x0 + w, 340]]); rect(c, x0 + w * .05, 260, w * .9, 80); for (let i = 0; i < 4; i++) rect(c, x0 + w * (.1 + i * .22), 120, w * .16, 90); },
    museum: (c, x0, w) => { ln(c, [[x0, 380], [x0 + w, 380]]); for (let i = 0; i < 3; i++) rect(c, x0 + w * (.1 + i * .3), 120, w * .18, 120); },
    lab: (c, x0, w) => { ln(c, [[x0, 360], [x0 + w, 360]]); icon(c, 'desk', x0 + w * .5, 420, 2); },
    dig: (c, x0, w) => { ground(c, 200); rect(c, x0 + w * .15, 280, w * .7, 180); for (let i = 1; i < 6; i++) ln(c, [[x0 + w * .15 + i * w * .7 / 6, 280], [x0 + w * .15 + i * w * .7 / 6, 460]], .7, .5); },
    cave: (c, x0, w) => { hatch(c, x0, 0, w, H, 6, .3); ell(c, x0 + w * .5, 420, w * .38, 300, Math.PI, Math.PI * 2, 2); },
    coast: (c, x0, w) => { ln(c, [[x0, 300], [x0 + w, 300]]); for (let i = 0; i < 6; i++) ln(c, [[x0 + R() * w, 320 + i * 20], [x0 + R() * w * .3 + w * .2, 320 + i * 20]], .8, .4); ln(c, [[x0 + w * .55, 540], [x0 + w * .7, 300], [x0 + w, 280]], 2); },
    iceage: (c, x0, w) => { ln(c, [[x0, 260], [x0 + w * .2, 150], [x0 + w * .4, 240], [x0 + w * .65, 130], [x0 + w, 250]], 1.4); ground(c, 330); },
    field: (c, x0, w) => { ground(c, 260); for (let i = 0; i < 9; i++) ln(c, [[x0 + w * .5, 260], [x0 + i * w / 8, H]], .9, .5); },
    village: (c, x0, w) => { ground(c, 340); for (let i = 0; i < 6; i++) building(c, x0 + w * (.05 + i * .16), 340, 70, 60 + R() * 40, false); },
    city: (c, x0, w) => { ground(c, 380); for (let i = 0; i < 9; i++) building(c, x0 + i * w / 9, 380, w / 10, 120 + R() * 180); },
    skyline: (c, x0, w) => { hatch(c, x0, 0, w, H, 6, .25); for (let i = 0; i < 12; i++) building(c, x0 + i * w / 12, 420, w / 13, 140 + R() * 220); },
    trading: (c, x0, w) => { ln(c, [[x0, 360], [x0 + w, 360]]); for (let i = 0; i < 4; i++) icon(c, 'screen', x0 + w * (.15 + i * .23), 200, .9); for (let i = 0; i < 3; i++) icon(c, 'desk', x0 + w * (.2 + i * .3), 430, 1.2); },
    diner: (c, x0, w) => { ln(c, [[x0, 380], [x0 + w, 380]]); rect(c, x0 + w * .1, 80, w * .8, 140); for (let i = 1; i < 4; i++) ln(c, [[x0 + w * (.1 + i * .2), 80], [x0 + w * (.1 + i * .2), 220]]); rect(c, x0 + w * .25, 330, w * .5, 30); },
    boardroom: (c, x0, w) => { ln(c, [[x0, 360], [x0 + w, 360]]); rect(c, x0 + w * .05, 60, w * .9, 200); for (let i = 1; i < 6; i++) ln(c, [[x0 + w * (.05 + i * .15), 60], [x0 + w * (.05 + i * .15), 260]], .8); ell(c, x0 + w * .5, 420, w * .35, 40); },
    serverhall: (c, x0, w) => { for (let i = 0; i < 6; i++) { const xx = x0 + w * (.5 + (i - 2.5) * .16); ln(c, [[xx, 120], [x0 + w * .5 + (i - 2.5) * 30, 300]], 1.2); } ln(c, [[x0, 420], [x0 + w * .5, 300], [x0 + w, 420]], 1.2); hatch(c, x0, 0, w, 120, 6, .2); },
    school: (c, x0, w) => { ground(c, 360); building(c, x0 + w * .2, 360, w * .6, 200); ln(c, [[x0 + w * .2, 160], [x0 + w * .5, 100], [x0 + w * .8, 160]], 1.8); },
    street: (c, x0, w) => { ln(c, [[x0, 380], [x0 + w, 380]]); for (let i = 0; i < 5; i++) building(c, x0 + i * w / 5, 380, w / 5.5, 200 + R() * 80); },
    court: (c, x0, w) => { ground(c, 400); rect(c, x0 + w * .2, 160, w * .6, 40); for (let i = 0; i < 6; i++) ln(c, [[x0 + w * (.25 + i * .1), 200], [x0 + w * (.25 + i * .1), 400]], 2); ln(c, [[x0 + w * .18, 160], [x0 + w * .5, 90], [x0 + w * .82, 160]], 2); },
    fab: (c, x0, w) => { ln(c, [[x0, 380], [x0 + w, 380]]); for (let i = 0; i < 4; i++) rect(c, x0 + w * (.08 + i * .23), 160, w * .18, 220); },
    map: (c, x0, w) => { hatch(c, x0, 0, w, H, 14, .08); icon(c, 'map', x0 + w / 2, 270, w / 300); },
    chart: (c, x0, w) => { rect(c, x0 + 40, 40, w - 80, H - 80, 1.2); hatch(c, x0 + 40, 40, w - 80, H - 80, 16, .06); },
    card: (c, x0, w) => { hatch(c, x0, 0, w, H, 10, .1); },
    title: (c, x0, w) => { hatch(c, x0, 0, w, H, 5, .3); },
    blank: () => { },
  };
  const camGuide = (c, cam) => { const al = .6; c.save(); c.setLineDash([8, 6]); c.strokeStyle = `rgba(160,40,30,${al})`; c.lineWidth = 2;
    const arrow = (x1, y1, x2, y2) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); c.setLineDash([]); c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - Math.cos(a - .4) * 14, y2 - Math.sin(a - .4) * 14); c.moveTo(x2, y2); c.lineTo(x2 - Math.cos(a + .4) * 14, y2 - Math.sin(a + .4) * 14); c.stroke(); c.setLineDash([8, 6]); };
    if (cam === 'push') { c.strokeRect(W * .2, H * .2, W * .6, H * .6); arrow(40, 40, W * .2 - 6, H * .2 - 6); arrow(W - 40, H - 40, W * .8 + 6, H * .8 + 6); }
    if (cam === 'pull') { c.strokeRect(W * .2, H * .2, W * .6, H * .6); arrow(W * .2 - 6, H * .2 - 6, 40, 40); arrow(W * .8 + 6, H * .8 + 6, W - 40, H - 40); }
    if (cam === 'panL') arrow(W * .7, 40, W * .3, 40); if (cam === 'panR') arrow(W * .3, 40, W * .7, 40);
    if (cam === 'up') arrow(W - 40, H * .7, W - 40, H * .3); if (cam === 'down') arrow(W - 40, H * .3, W - 40, H * .7);
    c.restore(); };
  G.SKETCH = (c, spec, id) => {
    seed(id + spec); c.save(); c.fillStyle = '#f4efe4'; c.fillRect(0, 0, W, H);
    const toks = spec.split(';').map(s => s.trim()).filter(Boolean), get = k => toks.filter(t => t.startsWith(k + ':')).map(t => t.slice(k.length + 1));
    const bgs = (get('bg')[0] || 'blank').split('|');
    bgs.forEach((b, i) => { const x0 = i * W / bgs.length, w = W / bgs.length; c.save(); c.beginPath(); c.rect(x0, 0, w, H); c.clip(); (BG[b] || BG.blank)(c, x0, w); c.restore(); });
    if (bgs.length > 1) ln(c, [[W / 2, 0], [W / 2, H]], 3);
    for (const p of get('prop')) { const [n, x, y, sz, lab] = p.split(','); icon(c, n, +x * W, +y * H, +(sz || 1), lab); }
    const figs = get('fig').map(f => f.split(',')).sort((a, b) => +a[1] - +b[1]);
    for (const f of figs) person(c, +f[0] * W, +f[1] * H, f[2] || 'stand', f[3], +(f[4] || 1), +(f[5] || 1), f[6]);
    for (const a of get('arr')) { const [x1, y1, x2, y2] = a.split(',').map(Number); c.save(); c.strokeStyle = 'rgba(160,40,30,.7)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x1 * W, y1 * H); c.lineTo(x2 * W, y2 * H); c.stroke(); const an = Math.atan2((y2 - y1) * H, (x2 - x1) * W); c.beginPath(); c.moveTo(x2 * W, y2 * H); c.lineTo(x2 * W - Math.cos(an - .45) * 16, y2 * H - Math.sin(an - .45) * 16); c.moveTo(x2 * W, y2 * H); c.lineTo(x2 * W - Math.cos(an + .45) * 16, y2 * H - Math.sin(an + .45) * 16); c.stroke(); c.restore(); }
    for (const tx of get('txt')) { const i1 = tx.indexOf(','), i2 = tx.indexOf(',', i1 + 1); const x = +tx.slice(0, i1) * W, y = +tx.slice(i1 + 1, i2) * H, s = tx.slice(i2 + 1); c.save(); c.font = '30px Anton, Oswald, sans-serif'; const w = Math.min(W * .9, c.measureText(s).width + 30); c.fillStyle = 'rgba(244,239,228,.85)'; c.fillRect(x - w / 2, y - 24, w, 48); rect(c, x - w / 2, y - 24, w, 48, 2); c.fillStyle = 'rgba(40,36,32,.9)'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y + 2, W * .86); c.restore(); }
    for (const cm of get('cam')) camGuide(c, cm);
    // graphite look: desaturate everything except the red camera marks, then paper tooth
    const img = c.getImageData(0, 0, W, H), d = img.data; for (let i = 0; i < d.length; i += 4) { const r = d[i], g = d[i + 1], b = d[i + 2]; if (r > 120 && r - g > 60 && r - b > 60) continue; const l = r * .3 + g * .59 + b * .11, v = 244 - (244 - l) * .82 + (Math.random() - .5) * 10; d[i] = v; d[i + 1] = v * .985; d[i + 2] = v * .95; } c.putImageData(img, 0, 0);
    c.restore();
  };
  G.SKETCH.W = W; G.SKETCH.H = H;
})(window);
