// In-house stylised cover for a vertical reel (1080x1920). No paid generators.
// A render frame, cropped to 9:16 around a focus point and graded hard, one big 2–4 word line,
// a small kicker, one accent colour and the Stormi logo in the top-right safe zone.
// Usage: node reel_thumb.js <frame.jpg> <out.png> --text "WRONG CAR" [--kicker "ENTEBBE 1976"]
//          [--accent "#d2232a"] [--focus 0.5] [--pos top|middle|bottom] [--zoom 1.0] [--mark x|ring|none] [--mx 0.5 --my 0.5]
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const a = process.argv.slice(2); const [src, out] = a;
const opt = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : d; };
const text = opt('text', 'TITLE'), kicker = opt('kicker', ''), accent = opt('accent', '#e8b321');
const focus = +opt('focus', .5), pos = opt('pos', 'top'), zoom = +opt('zoom', 1), mark = opt('mark', 'none'), mx = +opt('mx', .5), my = +opt('my', .5);
const root = path.resolve(__dirname, '..');
const b64 = f => fs.readFileSync(f).toString('base64');
const img = `data:image/jpeg;base64,${b64(src)}`;
const logo = `data:image/png;base64,${b64(path.join(root, 'branding/stormi-watermark-600x600.png'))}`;
const anton = `data:font/ttf;base64,${b64(path.join(root, 'engine/fonts/Anton-Regular.ttf'))}`;
const oswald = `data:font/ttf;base64,${b64(path.join(root, 'engine/fonts/Oswald.ttf'))}`;
const words = text.split(' '); let lines = [text];
if (words.length > 2 || text.length > 9) { let best = 1e9; for (let i = 1; i < words.length; i++) { const l = [words.slice(0, i).join(' '), words.slice(i).join(' ')]; const m = Math.max(l[0].length, l[1].length); if (m < best) { best = m; lines = l; } } }
const size = Math.min(260, Math.floor(1700 / Math.max(...lines.map(l => l.length)) * 1.05));
const top = pos === 'top' ? 380 : pos === 'middle' ? 760 : 1250;
const html = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(${anton})}@font-face{font-family:O;src:url(${oswald})}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#000}
.bg{position:absolute;inset:0;background:url(${img}) ${focus * 100}% 50%/auto ${100 * zoom}% no-repeat;filter:contrast(1.25) saturate(1.25) brightness(1.08)}
.grade{position:absolute;inset:0;background:radial-gradient(ellipse at ${mx * 100}% ${my * 100}%,rgba(0,0,0,0) 30%,rgba(0,0,0,.75) 100%),linear-gradient(${pos === 'bottom' ? '0deg' : '180deg'},rgba(0,0,0,.85) 0%,rgba(0,0,0,0) 45%)}
.glow{position:absolute;inset:0;background:radial-gradient(circle at ${mx * 100}% ${my * 100}%,${accent}55 0%,transparent 35%);mix-blend-mode:screen}
.t{position:absolute;left:60px;right:60px;top:${top}px;text-align:center;transform:rotate(-2deg)}
.k{display:inline-block;font:600 54px O;letter-spacing:6px;color:#111;background:${accent};padding:6px 26px;margin-bottom:22px}
.l{font:${size}px/0.98 A;color:#fff;text-transform:uppercase;-webkit-text-stroke:10px #000;paint-order:stroke fill;text-shadow:0 14px 0 rgba(0,0,0,.6),0 0 60px rgba(0,0,0,.7)}
.l span{color:${accent}}
.logo{position:absolute;right:70px;top:250px;width:190px;opacity:.95}
.mark{position:absolute;left:${mx * 1080 - 220}px;top:${my * 1920 - 220}px;width:440px;height:440px}
.bar{position:absolute;left:0;right:0;bottom:0;height:22px;background:${accent}}
</style></head><body>
<div class="bg"></div><div class="glow"></div><div class="grade"></div>
${mark === 'x' ? `<svg class="mark" viewBox="0 0 100 100"><path d="M12 12L88 88M88 12L12 88" stroke="${accent}" stroke-width="13" stroke-linecap="round"/></svg>` : ''}
${mark === 'ring' ? `<svg class="mark" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="${accent}" stroke-width="6"/></svg>` : ''}
<div class="t">${kicker ? `<div class="k">${kicker}</div>` : ''}${lines.map((l, i) => `<div class="l">${i === lines.length - 1 && lines.length > 1 ? `<span>${l}</span>` : l}</div>`).join('')}</div>
<img class="logo" src="${logo}"><div class="bar"></div></body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
  await p.screenshot({ path: out }); await b.close(); console.log('thumb', out);
})();
