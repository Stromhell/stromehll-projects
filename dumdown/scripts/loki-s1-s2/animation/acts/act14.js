// Act 14: Outro
window.ACT = { timing: window.TIMING, tail: 5.6, shots: [
 { p: 0, plate: 'throne', cam: { z: [1.2, 1.5], x: 1280, y: 850 }, grade: ['#0a1a10', .3, 'multiply'], chars: [{ c: 'lokiKing', x: 1280, y: 1150, s: 1.45, expr: 'smug' }], post: (lt) => E.glowS(960, 390, 300, 'rgba(120,255,160,A)', .25) },
 { p: 1, plate: 'void', cam: { z: [1.6, 1.8], x: 1280, y: 1050 }, props: [{ k: 'gator', x: 1280, y: 1250, s: 1.3, layer: 'front' }], post: (lt) => { E.apply({ z: 1.7, x: 1280, y: 1050 }); const c = E.ctx; c.font = '120px "Noto Color Emoji"'; c.textAlign = 'center'; c.fillText('👑', 1250, 1020 + Math.sin(lt * 3) * 8); }, big: ['#1 VARIANT', .6, 4, '#9fffb0'] },
 { p: 2, plate: 'tva_lobby', cam: { z: [1.2, 1.25], x: 1280, y: 900 }, chars: [{ c: 'loki', x: 900, y: 1280, s: 1.5, pose: 'wave', expr: 'happy' }, { c: 'mobius', x: 1180, y: 1280, s: 1.5, pose: 'wave', expr: 'happy' }, { c: 'sylvie', x: 1440, y: 1280, s: 1.45, expr: 'smile' }], props: [{ k: 'gator', x: 1700, y: 1290, s: .7, layer: 'front' }, { k: 'missMinutes', x: 1950, y: 1000, s: .55, layer: 'front' }] },
 { p: 2, f: 1, plate: 'tva_lobby', cam: { z: [1.25, 1.18], x: 1280, y: 900 }, grade: ['#000', .45, 'multiply'] },
]};
