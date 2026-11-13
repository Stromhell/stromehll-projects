// Thumbnail (code-drawn, our own cast; no AI art)
window.ACT = { timing: window.TIMING, tail: 3, shots: [
 { p: 0, plate: 'tva_office', blur: 3, cam: { z: 1.05, x: 1280, y: 720 },
   pre: (lt, cam) => { E.apply(cam); window.PROPS.branches({ y: 300, k: 1 }, 2); E.grade('#1a0a2a', .45, 'multiply'); E.glowS(560, 560, 500, 'rgba(120,255,160,A)', .45); },
   chars: [{ c: 'sylvie', x: 330, y: 1700, s: 2.7, view: 'threequarter', expr: 'smug' }, { c: 'loki', x: 900, y: 1950, s: 3.6, view: 'threequarter', dir: -1, expr: 'shock' }],
   post: (lt) => { const c = E.ctx; E.apply({ z: 1.05, x: 1280, y: 720 }); window.PROPS.gator({ x: 1900, y: 1420, s: 1.7 }, 1); c.font = '200px "Noto Color Emoji"'; c.textAlign = 'center'; c.fillText('👑', 2085, 1190); window.PROPS.missMinutes({ x: 2380, y: 1080, s: .7, mood: 'happy' }, 1);
     E.screen(); c.textAlign = 'left'; c.lineJoin = 'round';
     const T = (s, x, y, sz, col, rot = -.05) => { c.save(); c.translate(x, y); c.rotate(rot); c.font = `900 ${sz}px "Inter Display"`; c.lineWidth = sz * .17; c.strokeStyle = '#120a14'; c.strokeText(s, 0, 0); c.fillStyle = col; c.fillText(s, 0, 0); c.restore(); };
     T('LOKI', 1020, 300, 250, '#7dff9a'); T('EXPLAINED', 1010, 450, 128, '#ffd23d'); c.save(); c.translate(1040, 575); c.rotate(-.05); c.fillStyle = '#e23a3a'; c.fillRect(-10, -78, 470, 104); c.strokeStyle = '#120a14'; c.lineWidth = 9; c.strokeRect(-10, -78, 470, 104); c.font = '900 74px "Inter Display"'; c.fillStyle = '#fff'; c.fillText('(DUMBLY)', 14, 0); c.restore(); } },
]};
