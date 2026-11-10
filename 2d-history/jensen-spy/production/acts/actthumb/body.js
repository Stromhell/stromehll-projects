// Long-video thumbnail (in-house draft). Stylised Jensen (grey swept hair, glasses, black leather jacket) + Alice (long black hair, white coat).
K.load('taipei_bar', PL + 'taipei_bar.jpg');
KIT.drawSubs = () => {};
const slab = (c, t, x, y, px, bg, fg) => { c.font = `${px}px Anton`; const w = c.measureText(t).width + 50; c.save(); c.translate(x, y); c.rotate(-.03); c.fillStyle = 'rgba(0,0,0,.5)'; c.fillRect(10, 12, w, px * 1.2); c.fillStyle = bg; c.fillRect(0, 0, w, px * 1.2); c.fillStyle = fg; c.textBaseline = 'middle'; c.fillText(t, 25, px * .62); c.restore(); };
const big = (c, t, x, y, px, col) => { c.save(); c.font = `${px}px Anton`; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = px * .16; c.strokeStyle = '#120c08'; c.strokeText(t, x, y); c.fillStyle = col; c.fillText(t, x, y); c.restore(); };
window.SHOTS = [{ plate: 'taipei_bar', cam: { z: [2.6, 2.6], x: [1480, 1480], y: [700, 700] }, light: { dir: -1, key: 'rgba(255,200,160,.25)' },
  init: S => {
    S.D.figs = [{ x: 1430, y: 1270, s: 2.15, ...JH.ALICE(), facing: 1, mood: 'neutral', pose: 'think' },
                { x: 1700, y: 1330, s: 2.5, ...JH.JENSEN(), facing: -1, mood: 'happy' }];
    S.D.over = [(c) => { // grade: dark left for text, red rim on the right
        const g = c.createLinearGradient(0, 0, 1920, 0); g.addColorStop(0, 'rgba(8,6,12,.92)'); g.addColorStop(.42, 'rgba(8,6,12,.55)'); g.addColorStop(.6, 'rgba(8,6,12,0)'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080);
        const r = c.createRadialGradient(1900, 200, 0, 1900, 200, 900); r.addColorStop(0, 'rgba(220,30,40,.35)'); r.addColorStop(1, 'rgba(220,30,40,0)'); c.fillStyle = r; c.fillRect(0, 0, 1920, 1080);
        slab(c, 'JENSEN HUANG', 60, 90, 110, '#e8b44a', '#120c08');
        big(c, 'US INTEL:', 70, 420, 150, '#ffffff');
        big(c, 'SHE WAS', 70, 590, 190, '#ffffff');
        big(c, 'A SPY', 70, 790, 230, '#e8282e');
        c.save(); c.translate(1080, 930); c.rotate(-.16); c.strokeStyle = '#d8202a'; c.lineWidth = 14; c.strokeRect(-150, -62, 300, 124); c.font = '100px Anton'; c.fillStyle = '#d8202a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('MSS', 0, 4); c.restore();
        if (K.imgs.logo) c.drawImage(K.imgs.logo, 1760, 920, 130, 130); }];
  } }];
K.load('logo', '../../../../shared/brand/stormi-watermark.png');
