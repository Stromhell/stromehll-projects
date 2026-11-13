// node figtest.cjs out.png 'JS returning svg inner (uses D, C)' [W H]
const { chromium } = require('playwright'); const path = require('path');
(async () => { const [out, code, W = 1600, H = 900] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +W, height: +H } });
  await p.setContent('<body style="margin:0;background:#bbb"><div id=o></div></body>');
  await p.addScriptTag({ path: path.resolve('kit.js') });
  await p.addScriptTag({ content: 'var module={exports:{}};var require=()=>window.DumDown;' });
  await p.addScriptTag({ path: path.resolve('cast.cjs') });
  const svg = await p.evaluate(([code, W, H]) => { const D = window.DumDown, C = module.exports.C; const inner = eval(code); return D.svg(W, H, inner, '#c9c2b4'); }, [code, +W, +H]);
  await p.setContent('<body style="margin:0">' + svg + '</body>'); await p.screenshot({ path: out }); await b.close(); })();
