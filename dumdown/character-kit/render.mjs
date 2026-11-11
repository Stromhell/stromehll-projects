#!/usr/bin/env node
// DumDown frame renderer.
// Writes one SVG per frame (and optionally PNG via Playwright) for any cast member + animation.
//
//   node render.mjs --char dum --anim talk --bg room --seconds 2 --out frames/
//   node render.mjs --char down --anim walk --view side --bg street --png
//   node render.mjs --seed popcorn-villain --anim shock --bg reaction --png
//
// Then: ffmpeg -framerate 24 -i frames/f%04d.png -pix_fmt yuv420p out.mp4
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const D = require(path.join(here, 'dumdown-kit.js'));

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
  return acc;
}, []));

const spec = args.seed ? D.generateCharacter(String(args.seed)) : D.CAST[args.char || 'dum'];
if (!spec) { console.error('Unknown --char. Use one of: ' + Object.keys(D.CAST).join(', ') + ' or pass --seed'); process.exit(1); }
const anim = args.anim || 'idle';
if (!D.ANIMS[anim]) { console.error('Unknown --anim. Use one of: ' + Object.keys(D.ANIMS).join(', ')); process.exit(1); }
const fps = +(args.fps || 24), seconds = +(args.seconds || 2);
const W = +(args.w || 1280), H = +(args.h || 720);
const out = args.out || 'frames';
const view = args.view || (anim === 'walk' ? 'side' : 'front');
fs.mkdirSync(out, { recursive: true });

const bg = args.bg ? D.drawBackground(args.bg, W, H, +(args.bgseed || 7)) : '';
const n = Math.round(fps * seconds);
const files = [];
for (let i = 0; i < n; i++) {
  const t = i / fps;
  const tt = args.smooth ? t : D.onTwos(t);           // anime timing on twos by default
  const a = D.ANIMS[anim](tt);
  const ch = D.drawCharacter(spec, {
    view, dir: +(args.dir || 1), x: +(args.x || W / 2), y: +(args.y || H * 0.96), scale: +(args.scale || 1.3),
    pose: a.pose, expr: a.expr || args.expr || spec.defaultExpr || 'neutral'
  });
  const file = path.join(out, `f${String(i + 1).padStart(4, '0')}.svg`);
  fs.writeFileSync(file, D.svg(W, H, bg + ch, args.bg ? null : (args.paper || '#f7f6f2')));
  files.push(file);
}
console.log(`Wrote ${n} SVG frames to ${out}/`);

if (args.png) {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch { console.error('PNG export needs Playwright: npm i -D playwright && npx playwright install chromium'); process.exit(1); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  for (const f of files) {
    await page.setContent(`<body style="margin:0">${fs.readFileSync(f, 'utf8')}</body>`);
    await page.screenshot({ path: f.replace(/\.svg$/, '.png'), clip: { x: 0, y: 0, width: W, height: H } });
  }
  await browser.close();
  console.log(`Converted to PNG. Next: ffmpeg -framerate ${fps} -i ${out}/f%04d.png -pix_fmt yuv420p ${anim}.mp4`);
}
