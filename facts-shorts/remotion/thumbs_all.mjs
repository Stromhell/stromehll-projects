import {bundle} from '@remotion/bundler'; import {renderStill, selectComposition, getCompositions} from '@remotion/renderer'; import path from 'path'; import fs from 'fs';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.resolve('tb/thumbs')});
fs.mkdirSync('out/thumbs', {recursive: true});
const only = process.argv.slice(2);
for (const c of await getCompositions(serveUrl)) {
  if (!/^Th\d/.test(c.id) || (only.length && !only.includes(c.id))) continue;
  await renderStill({composition: c, serveUrl, output: `out/thumbs/${c.id}.png`, frame: 0}); console.log(c.id);
}
