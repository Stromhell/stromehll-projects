// Render an act page to JPEG frames with parallel workers, then (optionally) encode.
// Usage: node render.js <act.html> <outFramesDir> [workers=4] [start=0] [end=dur]
// Writes frames as f%05d.jpg and cues.json (every SFX cue the scenes registered).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [html, outDir, nw = '4', st, en] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--disable-web-security'] });
  const open = async () => { const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } }); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.error('[page]', m.text()); }); p.on('pageerror', e => console.error('[pageerror]', e.message)); await p.goto('file://' + path.resolve(html)); await p.waitForFunction(() => window.KIT_READY === true, null, { timeout: 120000 }); return p; };
  const p0 = await open();
  const info = await p0.evaluate(() => ({ dur: KIT.dur, cues: KIT.cues, beds: window.KIT_BEDS || [] }));
  fs.writeFileSync(path.join(outDir, '..', 'cues.json'), JSON.stringify(info, null, 1));
  const FPS = 30, F0 = Math.round((st ? +st : 0) * FPS), F1 = Math.round((en ? +en : info.dur) * FPS);
  const workers = Math.max(1, +nw), pages = [p0]; for (let i = 1; i < workers; i++) pages.push(await open());
  let next = F0, done = 0; const t0 = Date.now();
  await Promise.all(pages.map(async p => { while (true) { const f = next++; if (f >= F1) break;
    const d = await p.evaluate(t => { KIT.frame(t); return document.getElementById('c').toDataURL('image/jpeg', .93); }, f / FPS);
    fs.writeFileSync(path.join(outDir, 'f' + String(f).padStart(5, '0') + '.jpg'), Buffer.from(d.slice(d.indexOf(',') + 1), 'base64'));
    if (++done % 150 === 0) console.log(`frames ${done}/${F1 - F0}  ${((Date.now() - t0) / done).toFixed(0)} ms/frame`); } }));
  console.log('DONE', (F1 - F0), 'frames', info.dur.toFixed(2) + 's');
  await browser.close();
})();
