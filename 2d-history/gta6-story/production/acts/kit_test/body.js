// G6 kit test sheet: shot 0/1 = cast line-ups, shot 2 = walks, poses and hand props, shot 3 = small props, shot 4 = big props + vehicles.
const lab = (c, s, x, y) => { c.save(); c.font = '24px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 16; c.fillRect(x - w / 2, y - 15, w, 30); TW.txt(c, s, x, y, 24, '#fff', 'center', 'Oswald'); c.restore(); };
// plain painted backdrop (screen space): warm wall with soft brush strokes, floor bands under each row
const paint = (rows) => (c) => { const g = c.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#e9dcc2'); g.addColorStop(1, '#cdb994'); c.fillStyle = g; c.fillRect(0, 0, SW, SH);
  c.globalAlpha = .07; for (let k = 0; k < 90; k++) { c.fillStyle = k % 2 ? '#fff' : '#8a6a44'; c.beginPath(); c.ellipse((k * 211) % SW, (k * 137) % SH, 180 + k % 5 * 30, 22, (k % 7 - 3) * .05, 0, 7); c.fill(); } c.globalAlpha = 1;
  for (const ry of rows) { const y = ry * .75; c.fillStyle = 'rgba(120,90,60,.22)'; c.fillRect(0, y - 6, SW, 26); c.fillStyle = 'rgba(80,60,40,.25)'; c.fillRect(0, y - 6, SW, 3); } };
const G = n => G6[n]();
const C1 = [...['JASON', 'JASON_SHOT', 'JASON_PRISON', 'LUCIA', 'LUCIA_PRISON', 'LUCIA_GYM', 'LUCIA_WIG', 'TOMMY', 'BRIAN', 'CAL', 'DONNY'].map(n => [n, G(n)])];
const C2 = [['CAT', G6.CAT()], ['MATTIA', G6.MATTIA()], ['PAROLE', G6.PAROLE()], ...[0, 1, 2, 3].map(k => ['COP' + k, G6.COP(k)]), ['SERGEANT', G6.SERGEANT()], ['MENDEZ', G6.MENDEZ()], ['DREQUAN', G6.DREQUAN()], ['IKE', G6.IKE()]];
const C3 = ['RAUL', 'VALENTINA', 'KARIM', 'NICOLE', 'ABE', 'KG', 'NATE', 'GALLO', 'NIKO', 'PROSECUTOR', 'COUNSELLOR'].map(n => [n, G(n)]);
const C4 = [['DEALER', G6.DEALER()], ['VICKY', G6.VICKY()], ['GUARD', G6.GUARD()], ...[0, 1, 2].map(k => ['GUNMAN' + k, G6.GUNMAN(k)]), ...[0, 1, 2, 3].map(k => ['CREW' + k, G6.CREW(k)])];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 130 + i * (2300 / Math.max(1, L.length - 1)), y, s, ...l, facing: 1, mood: ['neutral', 'happy', 'neutral', 'smug', 'worried'][i % 5], _n: n }));
const R1 = row(C1, 660, 1.15), R2 = row(C2, 1340, 1.15), R3 = row(C3, 660, 1.15), R4 = row(C4, 1340, 1.15);
const labels = (F) => (c) => F.forEach(f => lab(c, f._n, f.x, f.y + 30));
// shot 2: walks + poses with hand props (hold.near = R arm / forward arm, hold.far = L arm / front arm)
const P1 = [
  { x: 0, y: 660, s: 1.3, ...G6.JASON(), walk: { x0: -200, x1: 800, t0: 0, dur: 8 }, mood: 'neutral', _n: 'JASON walk' },
  { x: 0, y: 660, s: 1.3, ...G6.LUCIA(), walk: { x0: 200, x1: 1200, t0: 0, dur: 8 }, mood: 'happy', _n: 'LUCIA walk' },
  { x: 0, y: 660, s: 1.3, ...G6.KG(), walk: { x0: 2300, x1: 1500, t0: 0, dur: 8 }, mood: 'neutral', _n: 'KG walk' },
  { x: 0, y: 660, s: 1.3, ...G6.TOMMY(), walk: { x0: 1000, x1: 1500, t0: 0, dur: 8 }, mood: 'happy', _n: 'TOMMY walk' },
  { x: 0, y: 660, s: 1.3, ...G6.BRIAN(), walk: { x0: 2900, x1: 2100, t0: 0, dur: 8 }, mood: 'happy', _n: 'BRIAN walk' },
  { x: 160, y: 1340, s: 1.3, ...G6.JASON(), pose: 'point', mood: 'angry', hold: {}, _n: 'point' },
  { x: 420, y: 1340, s: 1.3, ...G6.LUCIA(), pose: 'present', mood: 'worried', hold: { near: (c) => G6.phone(c, 0, 20, 1.25, 7) }, _n: 'phone (near)' },
  { x: 680, y: 1340, s: 1.3, ...G6.CAL(), arms: () => ({ shR: 50, elR: -60, handR: 'open' }), hold: { near: (c) => G6.drive(c, 0, 16, 1.25) }, mood: 'focus', _n: 'drive' },
  { x: 940, y: 1340, s: 1.3, ...G6.RAUL(), hold: { far: (c) => G6.mask(c, 0, 34, .9) }, mood: 'smug', _n: 'mask (far)' },
  { x: 1200, y: 1340, s: 1.3, ...G6.JASON_SHOT(), hold: { far: (c) => G6.duffel(c, 0, 92, 1, { cash: true }) }, mood: 'worried', _n: 'duffel' },
  { x: 1460, y: 1340, s: 1.3, ...G6.BRIAN(), pose: 'carry', hold: { near: (c) => G6.cashBundle(c, 0, 30, 1.25, 2) }, mood: 'happy', _n: 'carry cash' },
  { x: 1700, y: 1340, s: 1.3, ...G6.LUCIA_PRISON(), pose: 'sit', seat: 'stone', mood: 'sad', _n: 'sit' },
  { x: 1940, y: 1340, s: 1.3, ...G6.MENDEZ(), pose: 'shrug', mood: 'worried', _n: 'shrug' },
  { x: 2180, y: 1340, s: 1.3, ...G6.LUCIA_GYM(), pose: 'cheer', mood: 'happy', _n: 'cheer' },
  { x: 2420, y: 1340, s: 1.3, ...G6.KG(), facing: -1, pose: 'wave', mood: 'happy', _n: 'wave (facing -1)' },
];
const BG2 = paint([660, 1340]);
window.SHOTS = [
  { draw: BG2, cam: { z: [1, 1] }, sub: 'off', figs: [...R1, ...R2], front: [labels([...R1, ...R2])] },
  { draw: BG2, cam: { z: [1, 1] }, sub: 'off', figs: [...R3, ...R4], front: [labels([...R3, ...R4])] },
  { draw: BG2, cam: { z: [1, 1] }, sub: 'off', figs: P1, front: [(c, lt) => P1.forEach(f => { const x = f.walk ? f.walk.x0 + (f.walk.x1 - f.walk.x0) * K.clamp((lt + 3) / f.walk.dur) : f.x; lab(c, f._n, x, f.y + 30); })], init: (S) => { P1.forEach(f => { if (f.walk) f.walk.t0 = -3; }); } },
  { draw: paint([620, 1340]), cam: { z: [1, 1] }, sub: 'off', front: [(c, lt) => { const t = lt;
    G6.jar(c, 120, 620, 2.2, 0); G6.jar(c, 240, 620, 2.2, .55); G6.jar(c, 360, 620, 2.2, 1, { crack: true });
    G6.trust(c, 720, 360, .9, ['Brian', 'Cal', 'Raul', 'Mendez', 'Abe'], 2 + K.clamp((t - .6) / .8) * 1.2, t);
    G6.walkAway(c, 1240, 200, .8, 3, .4, t); G6.walkAway(c, 1240, 470, .8, 7, 0, t, { crack: true });
    G6.statue(c, 1600, 620, 2.2, { glow: .6 }); G6.drive(c, 1760, 560, 2.2, t); G6.ankleTag(c, 1960, 570, 2.2, .1); G6.phone(c, 2150, 540, 2.2, 12); G6.mask(c, 2350, 540, 1.8);
    G6.shootPrompt(c, 1650, 180, 1, t); G6.choice(c, 2150, 140, .8, 'TAKE THE DEAL', '#2e9a4a', .7); G6.choice(c, 2150, 300, .8, 'WALK AWAY', '#c8382e', 0);
    G6.cashBundle(c, 130, 1340, 2.2, 3); G6.duffel(c, 360, 1340, 1.8, { cash: true }); G6.duffel(c, 600, 1340, 1.5); G6.payphone(c, 820, 1340, 1.5);
    G6.monitorPadlock(c, 1080, 1340, 1.5, t); G6.ticket(c, 1080, 860, 1.6); G6.laptopProgress(c, 1380, 1340, 1.5, .62); G6.wantedTV(c, 1700, 1340, 1.3, t);
    G6.pardonDoc(c, 1380, 920, 1.3, { sign: .7 }); G6.confessionScroll(c, 2050, 760, 1, .9); G6.packages(c, 2050, 1340, 1.5, 6); G6.net(c, 2380, 1340, 1.3);
    G6.bubble(c, 1720, 860, .8, 'ONE LAST|JOB?'); G6.tag(c, 400, 860, 1, 'claim', 0, t); G6.counter(c, 640, 1000, .8, 0, 120, 0, 1, 1.5, { pre: '$', suf: 'M' }); }] },
  { draw: paint([700, 1380]), cam: { z: [1, 1] }, sub: 'off', front: [(c, lt) => { const t = lt;
    G6.helicopter(c, 520, 300, 1, t); G6.plane(c, 1400, 260, 1, { gear: true }); G6.boat(c, 2250, 420, 1, t, { wake: true });
    G6.car(c, 420, 700, 1, '#c8382e', t, { wheelsTurning: true }); G6.policeCar(c, 1100, 700, 1, t); G6.pickup(c, 1760, 700, 1, '#3a6a8a', t, { load: (cc) => G6.packages(cc, 0, 0, 1.4, 5) });
    G6.ambulance(c, 420, 1380, 1, t); G6.motorbike(c, 1050, 1380, 1, '#d8382e', t); G6.car(c, 1600, 1380, .8, '#2a8a9a', t, { facing: -1 }); G6.car(c, 2200, 1380, .8, '#e8b43a', t);
    G6.cashBundle(c, 1350, 1380, 1.2, 1); }],
    figs: [{ x: 1380, y: 1380, s: 1.1, ...G6.JASON(), facing: -1, mood: 'neutral' }] },
];
// zoomed check shots: left/right of cast A, left/right of cast B, poses row
SHOTS.push(Object.assign({}, SHOTS[0], { cam: { z: [2.2, 2.2], x: [640, 640], y: [460, 460] } }), Object.assign({}, SHOTS[0], { cam: { z: [2.2, 2.2], x: [1920, 1920], y: [460, 460] } }),
  Object.assign({}, SHOTS[0], { cam: { z: [2.2, 2.2], x: [640, 640], y: [1140, 1140] } }), Object.assign({}, SHOTS[0], { cam: { z: [2.2, 2.2], x: [1920, 1920], y: [1140, 1140] } }),
  Object.assign({}, SHOTS[1], { cam: { z: [2.2, 2.2], x: [640, 640], y: [460, 460] } }), Object.assign({}, SHOTS[1], { cam: { z: [2.2, 2.2], x: [1920, 1920], y: [460, 460] } }),
  Object.assign({}, SHOTS[1], { cam: { z: [2.2, 2.2], x: [640, 640], y: [1140, 1140] } }), Object.assign({}, SHOTS[1], { cam: { z: [2.2, 2.2], x: [1920, 1920], y: [1140, 1140] } }),
  Object.assign({}, SHOTS[2], { cam: { z: [2.2, 2.2], x: [700, 700], y: [1140, 1140] } }), Object.assign({}, SHOTS[2], { cam: { z: [2.2, 2.2], x: [1900, 1900], y: [1140, 1140] } }));
