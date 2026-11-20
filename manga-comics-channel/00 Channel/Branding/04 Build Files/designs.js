// Stormi Explain Everything: brand asset generator (SVG strings).
const INK = '#2B1E16', WHITE = '#FFFFFF', SHADE = '#D8D2CC', PARCH = '#E9D3A8', PARCH2 = '#D9B98A',
  BORDER = '#8A6A4A', YEL = '#FFC93C', BLUE = '#2F6FE0', NAVY = '#13213F', AMBER = '#FFB81C',
  RED = '#E0302E', ORANGE = '#F2830F', GREEN = '#7CC94A', TEAL = '#6CC4B0', PURPLE = '#7B2C8F', CYAN = '#33E6F5';

let uid = 0;
const id = p => `${p}${++uid}`;

// Lightning bolt polygon, unit box ~[-0.5..0.5] x [-0.5..0.5]
function bolt(cx, cy, s, fill, stroke, sw, rot = 0) {
  const pts = [[0.10, -0.50], [-0.28, 0.06], [-0.02, 0.06], [-0.14, 0.50], [0.30, -0.10], [0.04, -0.10], [0.20, -0.50]]
    .map(([x, y]) => `${(x * s).toFixed(1)},${(y * s).toFixed(1)}`).join(' ');
  return `<polygon points="${pts}" transform="translate(${cx} ${cy}) rotate(${rot})" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}

// Storm cloud made of circles, centred at cx,cy, width ~ w
function cloud(cx, cy, w, fill, stroke, sw) {
  const c = [[-0.32, 0.05, 0.20], [-0.12, -0.12, 0.25], [0.15, -0.08, 0.24], [0.34, 0.06, 0.18], [0.02, 0.08, 0.22]];
  const outline = c.map(([x, y, r]) => `<circle cx="${cx + x * w}" cy="${cy + y * w}" r="${r * w + sw / 2}" fill="${stroke}"/>`).join('');
  const body = c.map(([x, y, r]) => `<circle cx="${cx + x * w}" cy="${cy + y * w}" r="${r * w - sw / 2}" fill="${fill}"/>`).join('');
  const hi = `<circle cx="${cx - 0.14 * w}" cy="${cy - 0.2 * w}" r="${0.09 * w}" fill="#FFFFFF" opacity=".28"/>`;
  return outline + body + hi;
}

// Mascot "Stormi": round white head, ^ ^ eyes, big grin, storm-cloud hair with a bolt.
function mascot(cx, cy, r, opts = {}) {
  const sw = r * 0.075, clip = id('hc');
  const cloudSvg = opts.noCloud ? '' : cloud(cx + r * 0.08, cy - r * 0.92, r * 1.25, '#6E7FA6', INK, sw) +
    bolt(cx + r * 0.62, cy - r * 1.02, r * 0.62, YEL, INK, sw * 0.8, 14);
  const eye = (ex) => `<path d="M ${ex - r * 0.17} ${cy - r * 0.06} Q ${ex} ${cy - r * 0.34} ${ex + r * 0.17} ${cy - r * 0.06}" fill="none" stroke="${INK}" stroke-width="${sw * 1.05}" stroke-linecap="round"/>`;
  const mx = cx + r * 0.02, my = cy + r * 0.12;
  const mouth = `M ${mx - r * 0.42} ${my} Q ${mx} ${my + r * 0.06} ${mx + r * 0.42} ${my} Q ${mx + r * 0.36} ${my + r * 0.62} ${mx} ${my + r * 0.62} Q ${mx - r * 0.36} ${my + r * 0.62} ${mx - r * 0.42} ${my} Z`;
  const mclip = id('mc');
  return `<g>
  ${opts.halo ? `<circle cx="${cx}" cy="${cy}" r="${r + opts.halo}" fill="${opts.haloColor || WHITE}"/>` : ''}
  ${cloudSvg}
  <defs><clipPath id="${clip}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
  <clipPath id="${mclip}"><path d="${mouth}"/></clipPath></defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${WHITE}"/>
  <g clip-path="url(#${clip})"><circle cx="${cx - r * 0.22}" cy="${cy - r * 0.2}" r="${r * 1.02}" fill="none" stroke="${SHADE}" stroke-width="${r * 0.3}"/></g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${sw}"/>
  ${eye(cx - r * 0.36)}${eye(cx + r * 0.38)}
  <ellipse cx="${cx - r * 0.58}" cy="${cy + r * 0.14}" rx="${r * 0.13}" ry="${r * 0.07}" fill="#F48FA0" opacity=".55"/>
  <ellipse cx="${cx + r * 0.62}" cy="${cy + r * 0.14}" rx="${r * 0.13}" ry="${r * 0.07}" fill="#F48FA0" opacity=".55"/>
  <path d="${mouth}" fill="#4A1C16"/>
  <g clip-path="url(#${mclip})"><ellipse cx="${mx + r * 0.04}" cy="${my + r * 0.6}" rx="${r * 0.3}" ry="${r * 0.24}" fill="#F07A8A"/>
  <rect x="${mx - r * 0.4}" y="${my - r * 0.02}" width="${r * 0.8}" height="${r * 0.1}" fill="#FFFFFF"/></g>
  <path d="${mouth}" fill="none" stroke="${INK}" stroke-width="${sw * 0.9}" stroke-linejoin="round"/>
</g>`;
}

// Mitten hand (pointing / waving) - simple rounded mitten with a thumb
function mitten(cx, cy, s, rot) {
  const sw = s * 0.12;
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})">
   <ellipse cx="0" cy="0" rx="${s * 0.55}" ry="${s * 0.42}" fill="${WHITE}" stroke="${INK}" stroke-width="${sw}"/>
   <ellipse cx="${-s * 0.12}" cy="${-s * 0.42}" rx="${s * 0.16}" ry="${s * 0.24}" fill="${WHITE}" stroke="${INK}" stroke-width="${sw}" transform="rotate(-25 ${-s * 0.12} ${-s * 0.42})"/>
   <ellipse cx="${-s * 0.1}" cy="${-s * 0.2}" rx="${s * 0.14}" ry="${s * 0.12}" fill="${WHITE}"/>
  </g>`;
}

const T = (x, y, txt, size, opts = {}) => `<text x="${x}" y="${y}" font-family="${opts.font || 'Anton'}" font-size="${size}" fill="${opts.fill || WHITE}" ${opts.stroke ? `stroke="${opts.stroke}" stroke-width="${opts.sw}" stroke-linejoin="round" paint-order="stroke"` : ''} text-anchor="${opts.anchor || 'middle'}" letter-spacing="${opts.ls || 0}" ${opts.extra || ''}>${txt}</text>`;

// Slanted "date tag" style label
function tag(x, y, w, h, fill, txt, size, txtFill, opts = {}) {
  const k = h * 0.35;
  return `<g ${opts.rot ? `transform="rotate(${opts.rot} ${x + w / 2} ${y + h / 2})"` : ''}>
  <polygon points="${x + k + 10},${y + 12} ${x + w + 10},${y + 12} ${x + w - k + 10},${y + h + 12} ${x + 10},${y + h + 12}" fill="${INK}" opacity=".35"/>
  <polygon points="${x + k},${y} ${x + w},${y} ${x + w - k},${y + h} ${x},${y + h}" fill="${fill}" stroke="${INK}" stroke-width="${opts.sw || 10}" stroke-linejoin="round"/>
  ${T(x + w / 2, y + h / 2 + size * 0.36, txt, size, { fill: txtFill, ls: opts.ls || 2 })}</g>`;
}

function burst(cx, cy, n, R, c1, c2) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = ((i + 0.5) / n) * Math.PI * 2;
    s += `<polygon points="${cx},${cy} ${cx + Math.cos(a0) * R},${cy + Math.sin(a0) * R} ${cx + Math.cos(a1) * R},${cy + Math.sin(a1) * R}" fill="${c2}"/>`;
  }
  return s;
}

function halftone(x0, y0, w, h, step, color, fromX, toX) {
  let s = '';
  for (let y = y0; y < y0 + h; y += step) for (let x = x0; x < x0 + w; x += step) {
    const t = Math.max(0, Math.min(1, (x - fromX) / (toX - fromX)));
    const r = step * 0.42 * t;
    if (r > 0.6) s += `<circle cx="${x + ((y / step) % 2 ? step / 2 : 0)}" cy="${y}" r="${r.toFixed(1)}" fill="${color}"/>`;
  }
  return s;
}

// little doodle props for banner side zones
const props = {
  crown: (x, y, s) => `<g transform="translate(${x} ${y}) rotate(-10)"><polygon points="${-s},${s * .45} ${-s},${-s * .35} ${-s * .5},${s * .05} 0,${-s * .6} ${s * .5},${s * .05} ${s},${-s * .35} ${s},${s * .45}" fill="${YEL}" stroke="${INK}" stroke-width="${s * .14}" stroke-linejoin="round"/><circle cx="0" cy="${s * .2}" r="${s * .14}" fill="${RED}" stroke="${INK}" stroke-width="${s * .08}"/></g>`,
  coin: (x, y, s) => `<g transform="translate(${x} ${y}) rotate(12)"><circle r="${s * .8}" fill="${YEL}" stroke="${INK}" stroke-width="${s * .14}"/><circle r="${s * .55}" fill="none" stroke="#D99A12" stroke-width="${s * .1}"/>${T(0, s * .32, '$', s * .95, { fill: INK })}</g>`,
  chip: (x, y, s) => `<g transform="translate(${x} ${y}) rotate(-8)">${[-1, -.33, .33, 1].map(k => `<line x1="${k * s * .5}" y1="${-s}" x2="${k * s * .5}" y2="${s}" stroke="${INK}" stroke-width="${s * .12}" stroke-linecap="round"/><line y1="${k * s * .5}" x1="${-s}" y2="${k * s * .5}" x2="${s}" stroke="${INK}" stroke-width="${s * .12}" stroke-linecap="round"/>`).join('')}<rect x="${-s * .7}" y="${-s * .7}" width="${s * 1.4}" height="${s * 1.4}" rx="${s * .15}" fill="${GREEN}" stroke="${INK}" stroke-width="${s * .14}"/><rect x="${-s * .35}" y="${-s * .35}" width="${s * .7}" height="${s * .7}" rx="${s * .08}" fill="#4E9A2A"/></g>`,
  pyramid: (x, y, s) => `<g transform="translate(${x} ${y})"><polygon points="${-s},${s * .6} 0,${-s * .7} ${s},${s * .6}" fill="${PARCH2}" stroke="${INK}" stroke-width="${s * .14}" stroke-linejoin="round"/><polygon points="0,${-s * .7} ${s},${s * .6} ${s * .25},${s * .6}" fill="#B98F5C"/><polygon points="${-s},${s * .6} 0,${-s * .7} ${s},${s * .6}" fill="none" stroke="${INK}" stroke-width="${s * .14}" stroke-linejoin="round"/></g>`,
  rocket: (x, y, s) => `<g transform="translate(${x} ${y}) rotate(35)"><path d="M0,${-s} Q${s * .45},${-s * .4} ${s * .32},${s * .5} L${-s * .32},${s * .5} Q${-s * .45},${-s * .4} 0,${-s}Z" fill="${WHITE}" stroke="${INK}" stroke-width="${s * .13}"/><circle cy="${-s * .2}" r="${s * .16}" fill="${CYAN}" stroke="${INK}" stroke-width="${s * .09}"/><polygon points="${-s * .2},${s * .55} ${s * .2},${s * .55} 0,${s * 1.05}" fill="${ORANGE}" stroke="${INK}" stroke-width="${s * .1}" stroke-linejoin="round"/></g>`,
  question: (x, y, s) => `<g transform="translate(${x} ${y}) rotate(10)">${T(0, s * .55, '?', s * 1.7, { fill: PURPLE, stroke: INK, sw: s * .16 })}</g>`,
  globe: (x, y, s) => globe(x, y, s, false),
};

function wob(cx, cy, rx, ry, seed, n = 22) {
  const P = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    const k = 1 + 0.16 * Math.sin(a * 3 + seed) + 0.09 * Math.sin(a * 5 + seed * 2.3) + 0.05 * Math.sin(a * 9 + seed * 4.1);
    P.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  let d = '';
  for (let i = 0; i < n; i++) {
    const p = P[i], q = P[(i + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    d += i === 0 ? `M ${((P[n - 1][0] + p[0]) / 2).toFixed(1)} ${((P[n - 1][1] + p[1]) / 2).toFixed(1)} ` : '';
    d += `Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)} `;
  }
  return d + 'Z';
}

// Personified world globe (parchment sea, coloured "states" with tiny faces)
function globe(cx, cy, r, face = true) {
  const c = id('gc'), sw = r * 0.07;
  const land = (x, y, rx, ry, seed, col) => `<path d="${wob(cx + x * r, cy + y * r, rx * r, ry * r, seed)}" fill="${col}" stroke="${INK}" stroke-width="${sw * 0.45}" stroke-linejoin="round"/>`;
  return `<g><defs><clipPath id="${c}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#8FC3D4"/>
  <g clip-path="url(#${c})">
   ${land(-0.62, -0.5, 0.36, 0.26, 1, RED)}${land(-0.72, 0.42, 0.24, 0.36, 2, ORANGE)}
   ${land(0.42, -0.62, 0.42, 0.24, 3, GREEN)}${land(0.74, 0.3, 0.24, 0.32, 4, TEAL)}${land(0.05, 0.86, 0.34, 0.16, 5, PURPLE)}
   <circle cx="${cx + r * 0.3}" cy="${cy + r * 0.3}" r="${r * 1.08}" fill="none" stroke="#0B2340" stroke-opacity=".2" stroke-width="${r * 0.4}"/>
   <ellipse cx="${cx - r * 0.45}" cy="${cy - r * 0.55}" rx="${r * 0.18}" ry="${r * 0.09}" transform="rotate(-35 ${cx - r * 0.45} ${cy - r * 0.55})" fill="#FFFFFF" opacity=".45"/>
  </g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${sw}"/>
  ${face ? (() => {
    const e = (ex) => `<path d="M ${ex - r * 0.13} ${cy - r * 0.02} Q ${ex} ${cy - r * 0.24} ${ex + r * 0.13} ${cy - r * 0.02}" fill="none" stroke="${INK}" stroke-width="${sw * 0.95}" stroke-linecap="round"/>`;
    const mc = id('gm'), m = `M ${cx - r * 0.3} ${cy + r * 0.12} Q ${cx} ${cy + r * 0.17} ${cx + r * 0.3} ${cy + r * 0.12} Q ${cx + r * 0.26} ${cy + r * 0.56} ${cx} ${cy + r * 0.56} Q ${cx - r * 0.26} ${cy + r * 0.56} ${cx - r * 0.3} ${cy + r * 0.12} Z`;
    return `${e(cx - r * 0.28)}${e(cx + r * 0.28)}<defs><clipPath id="${mc}"><path d="${m}"/></clipPath></defs><path d="${m}" fill="#4A1C16"/><g clip-path="url(#${mc})"><ellipse cx="${cx}" cy="${cy + r * 0.56}" rx="${r * 0.2}" ry="${r * 0.16}" fill="#F07A8A"/></g><path d="${m}" fill="none" stroke="${INK}" stroke-width="${sw * 0.8}" stroke-linejoin="round"/>`;
  })() : ''}
 </g>`;
}

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

// ================= A: Mascot (comic burst) =================
function A_profile() {
  const W = 800;
  return svg(W, W, `
  <defs><radialGradient id="ga" cx="50%" cy="55%" r="60%"><stop offset="0" stop-color="#4C8BFF"/><stop offset="1" stop-color="#1A3C9E"/></radialGradient></defs>
  <rect width="800" height="800" fill="url(#ga)"/>
  <g opacity=".22">${burst(400, 470, 28, 900, '', '#FFFFFF')}</g>
  ${mascot(400, 480, 235)}`);
}
function A_watermark() {
  return svg(150, 150, `${mascot(75, 88, 46, { halo: 6 })}`);
}
function A_banner() {
  return svg(2560, 1440, `
  <defs><radialGradient id="gb" cx="40%" cy="50%" r="75%"><stop offset="0" stop-color="#4C8BFF"/><stop offset="1" stop-color="#132E7E"/></radialGradient></defs>
  <rect width="2560" height="1440" fill="url(#gb)"/>
  <g opacity=".16">${burst(860, 730, 44, 2600, '', '#FFFFFF')}</g>
  <g opacity=".18">${halftone(1500, 0, 1080, 1440, 26, '#0B1E5A', 1700, 2560)}</g>
  <g opacity=".18" transform="translate(2560 0) scale(-1 1)">${halftone(1500, 0, 1080, 1440, 26, '#0B1E5A', 2200, 2560)}</g>
  ${mascot(760, 770, 165)}
  <g stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" opacity=".9"><line x1="950" y1="600" x2="1000" y2="560"/><line x1="965" y1="680" x2="1030" y2="670"/><line x1="540" y1="600" x2="500" y2="560"/></g>
  ${T(1520, 760, 'STORMI', 250, { stroke: INK, sw: 30, ls: 6 })}
  ${tag(1040, 800, 960, 120, YEL, 'EXPLAIN EVERYTHING', 92, INK, { ls: 3 })}
  ${props.crown(220, 600, 70)}${props.coin(380, 820, 60)}${props.pyramid(150, 860, 70)}
  ${props.chip(2200, 610, 60)}${props.rocket(2400, 780, 72)}${props.question(2180, 900, 60)}
  `);
}

// ================= B: Bolt monogram (dark desk) =================
function topo(w, h, n, color, seed) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const y0 = (i + 0.5) * h / n; let d = `M -20 ${y0}`;
    for (let x = 0; x <= w + 40; x += 40) d += ` L ${x} ${(y0 + Math.sin(x / 210 + i * 0.7 + seed) * 38 + Math.sin(x / 90 + i) * 10).toFixed(1)}`;
    s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="3"/>`;
  }
  return s;
}
function boltBadge(cx, cy, r, ring = true) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${NAVY}"/>
  ${ring ? `<circle cx="${cx}" cy="${cy}" r="${r * 0.86}" fill="none" stroke="${AMBER}" stroke-width="${r * 0.035}" stroke-dasharray="${r * 0.09} ${r * 0.05}" opacity=".7"/>` : ''}
  ${bolt(cx + r * 0.03, cy + r * 0.04, r * 1.32, INK, INK, r * 0.06, 8)}
  ${bolt(cx, cy, r * 1.32, AMBER, WHITE, r * 0.05, 8)}`;
}
function B_profile() {
  return svg(800, 800, `<rect width="800" height="800" fill="#0B1428"/><g opacity=".5">${topo(800, 800, 14, '#1D2D52', 1)}</g>${boltBadge(400, 400, 330)}`);
}
function B_watermark() {
  return svg(150, 150, `<circle cx="75" cy="75" r="72" fill="${WHITE}"/>${boltBadge(75, 75, 66, false)}`);
}
function B_banner() {
  return svg(2560, 1440, `<rect width="2560" height="1440" fill="#0B1428"/>
  <g opacity=".6">${topo(2560, 1440, 26, '#1D2D52', 2)}</g>
  <defs><radialGradient id="gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${AMBER}" stop-opacity=".22"/><stop offset="1" stop-color="${AMBER}" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="760" cy="720" rx="520" ry="420" fill="url(#gl)"/>
  ${boltBadge(760, 720, 180)}
  ${T(1010, 770, 'STORMI', 200, { anchor: 'start', ls: 14 })}
  ${T(1016, 872, 'EXPLAIN EVERYTHING', 84, { anchor: 'start', fill: AMBER, ls: 18 })}
  <line x1="1016" y1="566" x2="1960" y2="566" stroke="${AMBER}" stroke-width="4" opacity=".5"/>
  ${T(1016, 548, 'HISTORY  ·  BUSINESS  ·  MYSTERIES  ·  WAR STORIES', 40, { anchor: 'start', fill: '#9FB0D6', ls: 6 })}
  `);
}

// ================= C: Map badge (parchment) =================
function parchment(w, h) {
  return `<defs><radialGradient id="pv" cx="50%" cy="50%" r="70%"><stop offset=".55" stop-color="${PARCH}"/><stop offset="1" stop-color="#C79E68"/></radialGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.12  0 0 0 .22 0"/></filter></defs>
  <rect width="${w}" height="${h}" fill="url(#pv)"/><rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}
function C_profile() {
  return svg(800, 800, `${parchment(800, 800)}
  ${globe(400, 430, 250)}
  ${bolt(600, 190, 230, YEL, INK, 16, 18)}`);
}
function C_watermark() {
  return svg(150, 150, `<circle cx="72" cy="80" r="62" fill="${WHITE}"/>${globe(72, 80, 54)}${bolt(118, 36, 62, YEL, INK, 5.5, 18)}`);
}
function C_banner() {
  const states = [
    [220, 600, 150, 95, -12, RED], [390, 830, 120, 80, 10, ORANGE], [170, 870, 85, 65, 0, TEAL],
    [2330, 610, 160, 95, 8, GREEN], [2410, 860, 110, 85, -10, PURPLE], [2180, 850, 80, 60, 5, BLUE]];
  const st = states.map(([x, y, rx, ry, rot, c]) => `<g transform="rotate(${rot} ${x} ${y})"><path d="${wob(x, y, rx, ry, x % 7)}" fill="${c}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
   <path d="M ${x - 26} ${y - 6} q 9 -12 18 0 M ${x + 8} ${y - 6} q 9 -12 18 0 M ${x - 12} ${y + 14} q 12 10 24 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>`).join('');
  return svg(2560, 1440, `${parchment(2560, 1440)}
  <rect x="40" y="40" width="2480" height="1360" fill="none" stroke="${BORDER}" stroke-width="16" rx="8"/>
  <g opacity=".25" stroke="${BORDER}" stroke-width="3">${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 213}" y1="0" x2="${i * 213}" y2="1440"/>`).join('')}${Array.from({ length: 8 }, (_, i) => `<line y1="${i * 206}" x1="0" y2="${i * 206}" x2="2560"/>`).join('')}</g>
  ${st}
  ${mascot(700, 780, 150)}
  <rect x="930" y="555" width="1080" height="240" rx="10" fill="#3A2416" stroke="${INK}" stroke-width="10"/>
  <rect x="946" y="571" width="1048" height="208" rx="6" fill="none" stroke="${YEL}" stroke-width="4" opacity=".6"/>
  ${T(1470, 742, 'STORMI', 190, { ls: 14 })}
  ${tag(1060, 815, 900, 108, WHITE, 'EXPLAIN EVERYTHING', 84, INK, { ls: 3 })}
  `);
}

module.exports = {
  A: { name: 'Stormi the mascot', profile: A_profile, banner: A_banner, watermark: A_watermark },
  B: { name: 'Storm bolt', profile: B_profile, banner: B_banner, watermark: B_watermark },
  C: { name: 'Parchment map', profile: C_profile, banner: C_banner, watermark: C_watermark },
};
