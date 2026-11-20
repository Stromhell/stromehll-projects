window.ACT = { timing: window.TIMING, tail: 0, shots: [
 { t0: 0, set: 'shop_studio', gagTitle: "MEPHISTO'S DEAL OF THE DAY", bug: 'DOOM SHOPPING NETWORK', cam: { z: [1.3, 1.45], x: 1150, y: 860 }, fx: [['confetti', .3]],
   chars: [{ c: 'mephisto', x: 1000, y: 1250, s: .62, pose: t => (t < 3.7 ? 'armsOut' : t < 6.2 ? 'point' : 'cheer'), expr: 'happy', talk: SAY('MEPH') }], props: [{ k: 'headset', on: 0, side: 1, s: 0, t1: 0 }, { k: 'potions', x: 1850, y: 860, s: 1 }, { k: 'chest', x: 1600, y: 870, s: .5, kk: 1 }] },
 { t0: LINE(2), set: 'shop_studio', bug: 'DOOM SHOPPING NETWORK', still: true, cam: { z: [2.6, 2.8], x: 1000, y: 850 }, fx: [['confetti', .6]],
   chars: [{ c: 'mephisto', x: 1000, y: 1250, s: .62, pose: 'point', expr: 'happy', talk: SAY('MEPH', LINE(2)) }] },
 { t0: LINE(4), set: 'shop_studio', bug: 'DOOM SHOPPING NETWORK', cam: { z: [1.3, 1.35], x: 1150, y: 860 }, ease: 'lin',
   chars: [{ c: 'mephisto', x: 1000, y: 1250, s: .62, pose: 'cheer', expr: 'happy' }],
   post: (x, lt) => { E.screen(); x.fillStyle = 'rgba(0,0,0,.65)'; x.fillRect(0, 960, 1920, 70); x.fillStyle = '#fff'; x.font = '600 34px Nunito'; x.textAlign = 'left'; x.fillText('*TERMS APPLY. ALL OF THEM. SOULS ARE NON-REFUNDABLE. NO RETURNS. NOT EVEN ONE. MEPHISTO IS NOT YOUR FRIEND. OFFER ENDS NEVER.', 1920 - lt * 900, 1008); for (let i = 0; i < 6; i++) { x.fillStyle = `rgba(200,200,200,${.3 - i * .04})`; x.beginPath(); x.arc(1920 - lt * 900 - 40 - i * 40, 990 - i * 18, 16 + i * 6, 0, 7); x.fill(); } } },
]};
