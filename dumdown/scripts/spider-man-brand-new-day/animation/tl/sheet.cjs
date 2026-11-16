// node sheet.cjs out.png [pose] [expr] -> contact sheet of every TL cast member
const { chromium } = require('playwright'); const http = require('http'), fs = require('fs'), path = require('path');
const C = JSON.parse(fs.readFileSync(__dirname + '/cast_tl.json'));
const srv = http.createServer((q, r) => { const f = path.join(__dirname, decodeURIComponent(q.url.split('?')[0].split('#')[0])); fs.readFile(f, (e, d) => { r.writeHead(e ? 404 : 200); r.end(d); }); }).listen(8765);
(async () => { const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await b.newPage({ viewport: { width: 700, height: 1100 } });
  const out = [], pose = process.argv[3] || 'hip', expr = process.argv[4] || 'smug';
  for (const [k, c] of Object.entries(C)) { await p.goto(`http://localhost:8765/tl_${c.base}.html?n=${k}#` + encodeURIComponent(JSON.stringify(c)));
    await p.waitForFunction('window.TLREADY'); for (const az of [0, .6]) { const r = await p.evaluate(o => { SNAP(o); return document.getElementById('c').toDataURL(); }, { pose, expr, az, w: 360, h: 600 }); out.push([k + (az ? ' 3/4' : ''), r]); } process.stderr.write(k + ' '); }
  const html = `<body style="margin:0;background:#e8e2d4;display:flex;flex-wrap:wrap;width:2880px">${out.map(([n, d]) => `<div style="width:360px;text-align:center;font:700 22px sans-serif"><img src="${d}" width=360 height=600><br>${n}</div>`).join('')}</body>`;
  const q = await b.newPage({ viewport: { width: 2880, height: 600 } }); await q.setContent(html); await q.screenshot({ path: process.argv[2], fullPage: true }); await b.close(); srv.close(); })();
