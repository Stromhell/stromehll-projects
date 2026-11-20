const CIRCLE = [['planetEater', 'PLANET EATER'], ['purple', 'PURPLE'], ['mephisto', 'MEPH'], ['surfer', 'SURFER'], ['attendant', 'DOOMBOT']];
window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'support', gagTitle: "DOOM'S SUPPORT GROUP", cam: { z: [1.25, 1.5], x: 1280, y: 900 },
   chars: [{ c: 'leader1', x: 450, y: 1250, s: .55, pose: 'clasp', expr: 'smile', talk: SAY('LEAD'), view: 'tq' }, ...CIRCLE.map(([c], i) => ({ c, x: 850 + i * 330, y: 1250, s: c === 'planetEater' ? .6 : .52, pose: t => (t > 4.5 ? 'raise' : 'sit'), expr: 'sad', ph: i * .3 }))],
   props: CIRCLE.map(([c, n], i) => ({ k: 'nametag', on: i + 1, side: -1, dx: 60, dy: -120, s: .7, text: n })) },
 { t0: LINE(2) - .2, set: 'support', cam: { z: [2.3, 2.7], x: 2170, y: 900 },
   chars: [{ c: 'attendant', x: 2170, y: 1250, s: .52, pose: 'raise', expr: 'neutral', talk: SAY('BOT', LINE(2) - .2) }] },
]};
