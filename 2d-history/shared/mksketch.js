// Render storyboard sketches. Usage: node mksketch.js <specs.json> <outdir>   specs.json = [[id, spec], ...]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const [specFile, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const specs = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const lib = ['rig.js', 'sketch.js'].map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n');
  const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.error('[pageerror]', e.message));
  await p.setContent(`<canvas id=c width=960 height=540></canvas><script>${lib}</script>`);
  await p.evaluate(async () => { await document.fonts.load('30px Anton'); await document.fonts.load('20px Caveat'); await document.fonts.load('30px Oswald'); });
  for (const [id, spec] of specs) { const d = await p.evaluate(([id, spec]) => { const c = document.getElementById('c').getContext('2d', { willReadFrequently: true }); SKETCH(c, spec, id); return document.getElementById('c').toDataURL('image/jpeg', .72); }, [id, spec]);
    fs.writeFileSync(path.join(out, id + '.jpg'), Buffer.from(d.split(',')[1], 'base64')); }
  console.log('sketched', specs.length); await b.close(); })();
