import {bundle} from '@remotion/bundler'; import {renderStill, selectComposition} from '@remotion/renderer'; import path from 'path';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.resolve('tb/bundle')});
for (const id of ['SeawaterThumbV', 'SeawaterThumbH']) { const composition = await selectComposition({serveUrl, id}); await renderStill({composition, serveUrl, output: `out/${id}.png`, frame: 0}); }
console.log('ok');
