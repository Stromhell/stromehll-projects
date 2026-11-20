// Stormi Knows Anime: Spanish banner v2 (Spanish tagline, Pushpam 20 Nov). Generator v2 (logo + profile with no name text, Pushpam 20 Nov) (logo, profile, banner, watermark).
// Reuses the Stormi mascot from the main channel (channel-branding/04 Build Files/designs.js) and gives it an
// anime look: original ninja-style headband with a bolt plate, manga speed lines, red/black/white palette.
// Usage: node ska_brand.js OUTDIR   (needs designs.js copied next to this file + fonts/anton.woff2)
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'designs.js'), 'utf8') + '\nmodule.exports.__m = { mascot, bolt };';
const m = new module.constructor(); m.paths = module.paths; m._compile(src, path.join(__dirname, 'designs_ext.js'));
const { mascot, bolt } = m.exports.__m;
const { chromium } = require('playwright');
const INK = '#141014', RED = '#E3262E', RED2 = '#9E0F1A', YEL = '#FFC93C', WHITE = '#FFFFFF';
const font = fs.readFileSync(path.join(__dirname, 'fonts', 'anton.woff2')).toString('base64');
const CSS = `@font-face{font-family:Anton;src:url(data:font/woff2;base64,${font})}`;

function speed(cx, cy, n, r0, r1, color, seed = 3, op = 1) {
  let s = seed, out = '';
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * 0.05, w = 0.004 + rnd() * 0.014, ri = r0 * (0.8 + rnd() * 0.5);
    const p = (ang, r) => `${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`;
    out += `<polygon points="${p(a, ri)} ${p(a - w, r1)} ${p(a + w, r1)}" fill="${color}" opacity="${op}"/>`;
  }
  return out;
}
function halftone(w, h, step, color, op) {
  let o = '';
  for (let y = 0; y < h; y += step) for (let x = (y / step % 2) * step / 2; x < w; x += step) {
    const r = step * 0.18 * (0.4 + 0.8 * (x / w)); o += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="${color}"/>`;
  }
  return `<g opacity="${op}">${o}</g>`;
}
// Original headband: cloth band across the forehead with a metal plate carrying the channel bolt.
function headband(cx, cy, r) {
  const sw = r * 0.06, y = cy - r * 0.42, h = r * 0.24;
  const band = `<path d="M ${cx - r * 0.98} ${y + h * 0.35} Q ${cx} ${y - h * 0.35} ${cx + r * 0.98} ${y + h * 0.35} L ${cx + r * 0.95} ${y + h * 1.15} Q ${cx} ${y + h * 0.45} ${cx - r * 0.95} ${y + h * 1.15} Z" fill="${RED}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const tails = `<path d="M ${cx + r * 0.9} ${y + h * 0.6} C ${cx + r * 1.35} ${y + h * 0.2} ${cx + r * 1.5} ${y + h * 1.4} ${cx + r * 1.85} ${y + h * 0.9} L ${cx + r * 1.8} ${y + h * 1.5} C ${cx + r * 1.45} ${y + h * 2.0} ${cx + r * 1.3} ${y + h * 1.1} ${cx + r * 0.92} ${y + h * 1.2} Z" fill="${RED}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>
    <path d="M ${cx + r * 0.92} ${y + h * 0.9} C ${cx + r * 1.25} ${y + h * 1.6} ${cx + r * 1.35} ${y + h * 2.4} ${cx + r * 1.65} ${y + h * 2.6} L ${cx + r * 1.5} ${y + h * 3.0} C ${cx + r * 1.2} ${y + h * 2.7} ${cx + r * 1.05} ${y + h * 1.9} ${cx + r * 0.88} ${y + h * 1.25} Z" fill="${RED2}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const pw = r * 0.62, ph = h * 1.15, px = cx - pw / 2, py = y - ph * 0.12;
  const plate = `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="${r * 0.06}" fill="#C9CED6" stroke="${INK}" stroke-width="${sw}"/>
    <rect x="${px + sw}" y="${py + sw}" width="${pw - 2 * sw}" height="${ph * 0.28}" rx="${r * 0.03}" fill="#FFFFFF" opacity=".55"/>
    ${[0.12, 0.88].map(f => `<circle cx="${px + pw * f}" cy="${py + ph * 0.5}" r="${r * 0.025}" fill="${INK}"/>`).join('')}
    ${bolt(cx, py + ph * 0.52, ph * 0.85, YEL, INK, sw * 0.6, 14)}`;
  return tails + band + plate;
}
function stormiAnime(cx, cy, r, opts = {}) {
  // sparkle in the eyes area is not added: the ^ ^ eyes are part of the Stormi brand
  return `<g>${mascot(cx, cy, r, opts)}${headband(cx, cy, r)}</g>`;
}
function title(x, y, size, anchor = 'middle') {
  return `<g font-family="Anton" text-anchor="${anchor}">
    <text x="${x + size * 0.04}" y="${y + size * 0.05}" font-size="${size}" fill="${INK}" letter-spacing="${size * 0.04}">STORMI</text>
    <text x="${x}" y="${y}" font-size="${size}" fill="${WHITE}" stroke="${INK}" stroke-width="${size * 0.07}" paint-order="stroke" letter-spacing="${size * 0.04}">STORMI</text>
  </g>`;
}
function tag(x, y, w, h, text) {
  return `<g transform="translate(${x} ${y}) skewX(-12)">
    <rect x="${h * 0.12}" y="${h * 0.12}" width="${w}" height="${h}" fill="${INK}"/>
    <rect width="${w}" height="${h}" fill="${RED}" stroke="${INK}" stroke-width="${h * 0.07}"/>
    <text x="${w / 2}" y="${h * 0.78}" font-family="Anton" font-size="${h * 0.72}" text-anchor="middle" fill="${WHITE}" letter-spacing="${h * 0.06}">${text}</text></g>`;
}
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

const D = {
  logo_1024: () => svg(1024, 1024, `
    ${speed(512, 512, 80, 330, 620, RED, 5, .9)}
    ${stormiAnime(470, 540, 300)}`),
  profile_800: () => svg(800, 800, `
    <rect width="800" height="800" fill="${RED}"/>
    <radialGradient id="g" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#FF5A4A"/><stop offset="1" stop-color="${RED2}"/></radialGradient>
    <rect width="800" height="800" fill="url(#g)"/>
    ${speed(400, 400, 90, 260, 700, WHITE, 7, .85)}
    ${stormiAnime(370, 430, 245, { halo: 14 })}`),
  watermark_150: () => svg(150, 150, `${stormiAnime(66, 86, 44, { halo: 6 })}`),
  watermark_600: () => svg(600, 600, `${stormiAnime(264, 344, 176, { halo: 22 })}`),
  banner_2560x1440: () => svg(2560, 1440, `
    <rect width="2560" height="1440" fill="#F4F1EA"/>
    ${halftone(2560, 1440, 28, INK, .16)}
    ${speed(1280, 720, 160, 520, 1600, INK, 11, .9)}
    <rect x="0" y="508" width="2560" height="424" fill="${RED}" stroke="${INK}" stroke-width="12"/>
    ${speed(1280, 720, 60, 700, 1600, RED2, 4, .5)}
    ${stormiAnime(830, 700, 150, { halo: 12 })}
    ${title(1450, 738, 210)}
    ${tag(1110, 772, 700, 118, 'KNOWS ANIME')}
    <text x="1280" y="1010" font-family="Anton" font-size="66" letter-spacing="4" text-anchor="middle" fill="${WHITE}" stroke="${INK}" stroke-width="8" paint-order="stroke">TODO EL MANGA Y EL ANIME, EXPLICADO</text>`),
};

(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [name, fn] of Object.entries(D).filter(([n]) => /banner/.test(n))) {
    const [w, h] = (name.match(/(\d+)x(\d+)/) || [0, name.split('_')[1], name.split('_')[1]]).slice(1).map(Number);
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<html><head><style>${CSS} html,body{margin:0;background:transparent}</style></head><body>${fn()}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, `ska_${name}.png`), omitBackground: true });
    console.log('wrote', name);
  }
  await b.close();
})();
