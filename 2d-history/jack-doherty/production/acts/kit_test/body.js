// JD kit test: shot 0 cast, shot 1 props
for (const n of ['chart', 'creator_room']) K.load(n, PL + n + '.jpg');
const lab = (c, s, x, y) => { c.save(); c.font = '22px Oswald'; c.fillStyle = 'rgba(0,0,0,.6)'; const w = c.measureText(s).width + 14; c.fillRect(x - w / 2, y - 14, w, 28); TW.txt(c, s, x, y, 22, '#fff', 'center', 'Oswald'); c.restore(); };
const C1 = [['JACK', JD.JACK()], ['JACK nosun', JD.JACK('nosun')], ['JACK teen', JD.JACK('teen')], ['JACK glove', JD.JACK('glove')], ['RICKY', JD.RICKY()], ['RICKY teen', JD.RICKY('teen')], ['GUARD0', JD.GUARD(0)], ['GUARD1', JD.GUARD(1)], ['STAFF', JD.STAFF()], ['STRANGER', JD.STRANGER()]];
const C2 = [['CEO', JD.CEO()], ['N3ON', JD.N3ON()], ['ARLOVSKI', JD.ARLOVSKI()], ['GOLFER', JD.GOLFER()], ['OFFICIAL', JD.OFFICIAL()], ['POLICE', JD.POLICE()], ['CAMERAMAN', JD.CAMERAMAN()], ['FAN', JD.FAN()], ['ACTOR', JD.ACTOR()], ['OPPONENT', JD.OPPONENT()]];
const row = (L, y, s) => L.map(([n, l], i) => ({ x: 160 + i * (2240 / (L.length - 1)), y, s, ...l, facing: 1, mood: 'neutral', _n: n }));
const F1 = row(C1, 640, 1.0), F2 = row(C2, 1300, 1.0);
const cast = { plate: 'creator_room', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [...F1, ...F2], front: [(c) => { [...F1, ...F2].forEach(f => lab(c, f._n, f.x, f.y + 24)); }] };
const props = { plate: 'chart', cam: { z: [1, 1], x: [1280, 1280], y: [720, 720] }, sub: 'off', figs: [],
  front: [(c, lt) => { JD.stamp(c, 500, 300, 1, 'KICKED OUT', 1); JD.list(c, 900, 100, 1, ['SUPERMARKET', 'KICK', 'KICK (AGAIN)', 'PGA TOUR', 'SHUFFLE (PAID)'], 3.5, lt); JD.post(c, 1300, 120, 1, 'Noah', '@ceo', "Yes, it's real. 6-month term. Money well spent.", 241000);
    JD.mclaren(c, 600, 900, 1, lt, 0, 0); JD.mclaren(c, 1500, 900, 1, lt, .05, 1); JD.briefcase(c, 2200, 900, 1, 1); JD.counter(c, 2200, 400, 90, 15e6, 'm'); JD.bandage(c, 2300, 1200, 60); }] };
window.SHOTS = [cast, props];
const z = (base, x, y, zz = 2.4) => Object.assign({}, base, { cam: { z: [zz, zz], x: [x, x], y: [y, y] } });
SHOTS.push(z(cast, 700, 470), z(cast, 1900, 470), z(cast, 700, 1130), z(cast, 1900, 1130));
