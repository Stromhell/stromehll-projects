// Paint plates to JPEG. Usage: node paint.js <plates.js> <outdir> name1,name2,...  (or "all")
// plates.js defines window.PLATES = { name: (ctx, r, W, H, P, M) => {...} }
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [platesFile, outDir, list] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const lib = ['engine.js', 'motifs.js', 'envs.js', 'room.js', 'props.js', 'rooms.js', 'world.js', 'world50.js', 'finance.js', 'diner.js', 'maps.js', 'halls.js', 'streets.js', 'school.js'].map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n');
  const extra = fs.existsSync(path.join(__dirname, 'extra.js')) ? fs.readFileSync(path.join(__dirname, 'extra.js'), 'utf8') : '';
  const plates = fs.readFileSync(platesFile, 'utf8');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`<canvas id=c width=2560 height=1440></canvas><script>${lib}\n${extra}\n${plates}</script>`);
  const names = list === 'all' ? await page.evaluate(() => Object.keys(window.PLATES)) : list.split(',');
  for (const n of names) {
    const t0 = Date.now();
    const data = await page.evaluate((n) => { const c = document.getElementById('c'), ctx = c.getContext('2d', { willReadFrequently: true }); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.clearRect(0, 0, 2560, 1440);
      let seed = 0; for (const ch of n) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0; const r = P2.RNG(seed || 7);
      window.PLATES[n](ctx, r, 2560, 1440, P2, M2); return n.startsWith('fg_') ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', .9); }, n);
    fs.writeFileSync(path.join(outDir, n + (n.startsWith('fg_') ? '.png' : '.jpg')), Buffer.from(data.split(',')[1], 'base64'));
    console.log('painted', n, ((Date.now() - t0) / 1000).toFixed(1) + 's');
  }
  await browser.close();
})();
