// CP kit test sheet: shot 0 = cast, shot 1 = cars, shot 2 = dashes + props.
for (const n of ['office', 'rain_street']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '24px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 16; c.fillRect(x - w / 2, y - 15, w, 30); TW.txt(c, s, x, y, 24, '#fff', 'center', 'Oswald'); c.restore(); };
const C1 = [['DAVE', CP.DAVE()], ['SALESMAN', CP.SALESMAN()], ['COP', CP.COP()], ['TESTER', CP.TESTER()], ['TESTER nohelm', CP.TESTER({ helmet: false })], ['DESIGNER_VW', CP.DESIGNER_VW()], ['DESIGNER_IVE', CP.DESIGNER_IVE()], ['ENZO', CP.ENZO()], ['PASSENGER', CP.PASSENGER()]];
const C2 = [...[0, 1, 2].map(k => ['ENG' + k, CP.ENGINEER(k)]), ...[0, 1, 2, 3].map(k => ['EXEC' + k, CP.EXEC(k)]), ...[0, 1, 2, 3].map(k => ['OWNER' + k, CP.OWNER(k)])];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 140 + i * (2280 / (L.length - 1)), y, s, ...l, facing: 1, mood: n.startsWith('OWNER') ? 'angry' : i % 3 ? 'neutral' : 'happy', _n: n }));
const F1 = row(C1, 720, 1.6), F2 = row(C2, 1380, 1.4);
F1[3].hold = { near: CP.clipboardHold }; F1[4].hold = { near: CP.clipboardHold };
window.SHOTS = [
  { plate: 'office', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [...F1, ...F2],
    live: [(c) => { c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 26)); }] },
  { plate: 'rain_street', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [{ x: 2440, y: 1380, s: 1, ...CP.DAVE(), facing: -1 }],
    live: [(c) => { c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c, lt) => { const t = lt + 2; CP.CAR_KINDS.forEach((k, i) => { const x = 560 + (i % 3) * 760, y = i < 3 ? 600 : 1380; CP.car(c, x, y, .7, { kind: k, t, speed: 300 }); lab(c, k, x, y + 30); }); CP.car(c, 1900, 1380, 1, { kind: 'estate2005', t, dir: -1, shadow: true }); }] },
  { plate: 'office', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [],
    live: [(c) => { c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, 2560, 1440); }],
    front: [(c, lt) => { const t = lt + 4;
      CP.dashOld(c, 40, 40, 620, t, { press: Math.floor(t) % 2 }); CP.dashOld(c, 40, 260, 620, t, { press: 0 });
      ['home', 'climate', 'menu', 'ad', 'call', 'popup'].forEach((p, i) => { CP.dashTablet(c, 700 + (i % 3) * 400, 50 + Math.floor(i / 3) * 260, 360, t, { page: p, t0: 4 }); lab(c, p, 880 + (i % 3) * 400, 50 + Math.floor(i / 3) * 260 + 240); });
      CP.dashHyper(c, 40, 560, 1100, t);
      CP.steering(c, 1300, 680, 2, t, { turn: Math.sin(t) * .3 });
      CP.dog(c, 1450, 760, 3, t, 'nod', { t0: 4 }); CP.dog(c, 1550, 760, 3, t, 'shake', { t0: 4 }); CP.dog(c, 1650, 760, 3, t, 'idle');
      CP.eyesMeter(c, 1900, 640, 1, 120); CP.eyesMeter(c, 2260, 640, 1, 450);
      CP.popup(c, 1760, 760, 380, 200, 'HEATED SEATS|£15/MONTH', 4, t);
      CP.priceTag(c, 2300, 860, 1, '£15/mo', Math.sin(t * 2) * .2); CP.padlock(c, 2460, 860, 1.4, false); CP.padlock(c, 2460, 980, 1.4, true);
      CP.seatHeated(c, 160, 1380, 1, t, { warm: 1 }); CP.seatHeated(c, 400, 1380, 1, t, { locked: true });
      CP.mast(c, 640, 1380, .5, t); CP.mast(c, 800, 1380, .5, t, { off: true });
      CP.invoice(c, 1010, 1180, .9, 'HEATED SEATS|£15/month', -.08); CP.ticket(c, 1240, 1180, .9, '£200|6 POINTS', .06);
      CP.phoneHolder(c, 1430, 1300, 1.2, { phone: 'map' }); CP.phoneHolder(c, 1560, 1300, 1.2, {});
      CP.analogDial(c, 1730, 1180, 90, .4 + Math.sin(t) * .2, 'MPH'); CP.analogDial(c, 1940, 1180, 90, .8, 'kW', { screen: true });
      CP.stockBoard(c, 2060, 1060, 440, 260, t, { drop: K.clamp((t - 4) / 1.5) });
      CP.ruleSign(c, 2300, 1420, .5, 'NO SCREENS|WHILE DRIVING');
      DRIVER(c, t); }] },
];
// hands-on-wheel demo helper is not part of the kit; keep the sheet simple.
function DRIVER() {}
SHOTS.push(Object.assign({}, SHOTS[0], { cam: { z: [2.4, 2.4], x: [700, 700], y: [460, 460] } }), Object.assign({}, SHOTS[2], { cam: { z: [2.2, 2.2], x: [1500, 1500], y: [1150, 1150] } }));
