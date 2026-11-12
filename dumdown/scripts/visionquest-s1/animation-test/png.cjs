const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [dir, ...list] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
 const files = list.length ? list : fs.readdirSync(dir).filter(f => f.endsWith('.svg')).sort();
 for (const f of files) { await p.setContent(`<body style="margin:0">${fs.readFileSync(dir + '/' + f, 'utf8')}</body>`); await p.screenshot({ path: dir + '/' + f.replace('.svg', '.png') }); }
 await b.close(); })();
