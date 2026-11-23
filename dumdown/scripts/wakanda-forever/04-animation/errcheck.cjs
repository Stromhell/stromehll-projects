const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage();
 p.on('pageerror', e => console.log('ERR', e.message, (e.stack||'').split('\n')[1])); p.on('console', m => { if (m.type() === 'error') console.log('CON', m.text()); });
 await p.goto('file://' + path.resolve('page_act' + process.argv[2] + '.html')); await p.waitForTimeout(3000); await b.close(); })();
