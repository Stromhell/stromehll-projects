// Thumbnail v8 "GOD OF STORIES" (code-drawn, our own cast; no AI art)
window.ACT = { timing: window.TIMING, tail: 3, shots: [
 { p: 0, plate: 'throne', cam: { z: 1.0, x: 1280, y: 720 }, noHeadFit: true,
   pre: (lt, cam) => { E.apply(cam); E.grade('#020a08', .55, 'multiply'); E.screen();
     window.PROPS.tree({ x: 960, y: 1000, k: 1.05 }, 1.2);
     E.glowS(960, 560, 560, 'rgba(110,255,150,A)', .45);
     E.glowS(1690, 480, 330, 'rgba(255,120,30,A)', .55);
     window.PROPS.missMinutes({ x: 1700, y: 640, s: 1.15, mood: 'mad' }, 1.1); },
   chars: [{ c: 'mobius', x: 470, y: 2060, s: 3.4, view: 'threequarter', expr: 'deadpan' }, { c: 'lokiKing', x: 1280, y: 2100, s: 3.4, expr: 'neutral', pose: 'arms_out' }],
   post: (lt) => { const c = E.ctx; E.screen(); E.glowS(960, 690, 260, 'rgba(140,255,170,A)', .35);
     c.textAlign = 'center'; c.lineJoin = 'round'; const sz = 168; c.font = `900 ${sz}px "Inter Display"`;
     c.shadowColor = 'rgba(80,255,140,.9)'; c.shadowBlur = 40; c.lineWidth = sz * .16; c.strokeStyle = '#04130a'; c.strokeText('GOD OF STORIES', 960, 190); c.shadowBlur = 0; c.fillStyle = '#ffffff'; c.fillText('GOD OF STORIES', 960, 190);
     c.font = '900 46px "Inter Display"'; const t = 'LOKI  ·  SEASON 1 + 2 EXPLAINED', w = c.measureText(t).width + 56; c.fillStyle = '#ffd23d'; c.strokeStyle = '#050505'; c.lineWidth = 6; c.beginPath(); c.roundRect(960 - w / 2, 965, w, 74, 16); c.fill(); c.stroke(); c.fillStyle = '#050505'; c.fillText(t, 960, 1018); } },
]};
