const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const D = require('./designs.js');
const f = n => fs.readFileSync(path.join(__dirname, 'fonts', n)).toString('base64');
const css = `@font-face{font-family:Anton;src:url(data:font/woff2;base64,${f('anton.woff2')})}
@font-face{font-family:'Patrick Hand';src:url(data:font/woff2;base64,${f('patrick.woff2')})}
html,body{margin:0;padding:0;background:transparent}svg{display:block}`;
(async () => {
  const b = await chromium.launch(); const out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
  const sizes = { profile: [800, 800], banner: [2560, 1440], watermark: [150, 150] };
  for (const k of Object.keys(D)) for (const a of Object.keys(sizes)) {
    const [w, h] = sizes[a];
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const s = D[k][a]();
    fs.writeFileSync(path.join(out, `${k}-${a}.svg`), s);
    await p.setContent(`<style>${css}</style>${s}`); await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(out, `${k}-${a}.png`), omitBackground: a === 'watermark', clip: { x: 0, y: 0, width: w, height: h } });
    await p.close();
  }
  await b.close();
})();
