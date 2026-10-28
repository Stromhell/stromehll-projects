// Snapshot frames of an act page at given times into one contact sheet. Usage: node snap.js act.html out.jpg t1,t2,...
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs');
(async () => { const [html, out, ts] = process.argv.slice(2); const times = ts.split(',').map(Number);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('[pageerror]', e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('[page]', m.text()); });
  await p.goto('file://' + path.resolve(html)); await p.waitForFunction(() => window.KIT_READY === true, null, { timeout: 120000 });
  const urls = []; for (const t of times) urls.push(await p.evaluate(t => { KIT.frame(t); return document.getElementById('c').toDataURL('image/jpeg', .85); }, t));
  const cols = Math.min(3, times.length), rows = Math.ceil(times.length / cols);
  const sheet = await p.evaluate(async ({ urls, cols, rows, times }) => { const cv = document.createElement('canvas'); cv.width = cols * 960; cv.height = rows * 540; const c = cv.getContext('2d');
    for (let i = 0; i < urls.length; i++) { const im = new Image(); im.src = urls[i]; await im.decode(); c.drawImage(im, (i % cols) * 960, Math.floor(i / cols) * 540, 960, 540); c.fillStyle = '#000'; c.fillRect((i % cols) * 960, Math.floor(i / cols) * 540, 90, 34); c.fillStyle = '#ff0'; c.font = '24px sans-serif'; c.fillText(times[i].toFixed(1), (i % cols) * 960 + 8, Math.floor(i / cols) * 540 + 25); }
    return cv.toDataURL('image/jpeg', .85); }, { urls, cols, rows, times });
  fs.writeFileSync(out, Buffer.from(sheet.split(',')[1], 'base64')); await b.close(); })();
