// Bundle once, render stills at given times (s) into one contact sheet folder. Usage: node stills.mjs OUTDIR t1 t2 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path'; import fs from 'fs';
const [out, ...ts] = process.argv.slice(2); fs.mkdirSync(out, {recursive: true});
const serveUrl = fs.existsSync('build/index.html') ? path.resolve('build') : await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.resolve('build')});
const comp = await selectComposition({serveUrl, id: 'Seawater'});
for (const t of ts) {
  const frame = Math.min(comp.durationInFrames - 1, Math.round(parseFloat(t) * comp.fps));
  await renderStill({composition: comp, serveUrl, output: `${out}/f${String(frame).padStart(5, '0')}.png`, frame, scale: 0.4});
}
console.log('done', ts.length);
