// Thumbnail v9 right half: S2 Loki, god of stories, horns + glowing timeline strands
window.ACT = { timing: window.TIMING, tail: 3, shots: [
 { p: 0, plate: 'throne', cam: { z: 1.0, x: 1280, y: 720 }, noHeadFit: true,
   pre: (lt, cam) => { E.apply(cam); E.grade('#020a08', .55, 'multiply'); E.screen();
     window.PROPS.tree({ x: 960, y: 980, k: 1.0 }, 1.2); E.glowS(960, 560, 600, 'rgba(110,255,150,A)', .5); },
   chars: [{ c: 'lokiKing', x: 1280, y: 1840, s: 2.85, expr: 'neutral' }],
   post: (lt) => { const c = E.ctx; E.screen(); c.lineCap = 'round';
     for (let i = 0; i < 14; i++) { const a = -1.3 + i * .2, sd = i % 2 ? 1 : -1; c.strokeStyle = `rgba(140,255,170,${.55 + (i % 3) * .12})`; c.lineWidth = 4 + (i % 3) * 2;
       c.beginPath(); c.moveTo(960 + sd * 60, 820); c.quadraticCurveTo(960 + sd * 260, 760 + i * 8, 960 + Math.cos(a) * 760 * sd, 520 + Math.sin(a) * 420); c.stroke(); }
     E.glowS(898, 815, 170, 'rgba(160,255,180,A)', .8); E.glowS(1022, 815, 170, 'rgba(160,255,180,A)', .8); } },
]};
