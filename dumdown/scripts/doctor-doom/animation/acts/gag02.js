window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'app_bg', gagTitle: 'RATE MY ROOMMATE', cam: { z: [1.42, 1.62], x: 1280, y: 740 },
   props: [{ k: 'phoneBig', x: 1280, y: 740, s: .82, who: 'victor', lines: ['Likes: magic, metal, being alone', 'Dislikes: Reed', 'Looking for: nobody'] }] },
 { t0: LINE(1), set: 'app_bg', cam: { z: [1.62, 1.45], x: 1280, y: 740 }, sfx: [['whoosh', 0]],
   props: [{ k: 'phoneBig', x: [1800, 1280], y: 740, s: .82, rot: [20, 0], who: 'reed', lines: ['Likes: EVERYONE!', 'Dislikes: nothing!', 'Looking for: a roommate! :)'] }] },
 { t0: LINE(3) - .5, set: 'app_bg', cam: { z: 1.5, x: 1280, y: 740, shake: 6 }, flash: .3,
   props: [{ k: 'phoneBig', x: 1280, y: 740, s: .82, who: 'reed', lines: ['Likes: EVERYONE!'], t1: .3 }, { k: 'boom', x: 1280, y: 700, s: 1.6, kk: [.1, 1], kt: [.3, 1.2] }],
   pops: [{ t: '★☆☆☆☆', at: 1.2, dur: 4, x: 960, y: 200 }] },
]};
