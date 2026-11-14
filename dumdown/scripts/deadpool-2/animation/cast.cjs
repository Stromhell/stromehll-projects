// Deadpool 2 parody cast for DumDown (original designs in the DumDown anime style; no actor likeness, no logos)
const D = require('./kit.js');
const base = (o) => Object.assign({ scale: 1, wraps: false, gloves: null, belt: null, defaultExpr: 'neutral' }, o);
const boot = (c = '#1a1a1a') => ({ color: c, sole: '#000', lace: '#333', type: 'boot' });
const suit = (c, shirt = '#f4f1ea', tie = '#3a2a1a') => ({ type: 'jacket', color: c, shirt, tie, accent: D.shade ? c : c, cuff: '#2a2014', hem: -10, sleeves: 'long' });
const tee = (c, acc = shade(c), sl = 'short') => ({ type: 'tee', color: c, accent: acc, cuff: acc, hem: 14, sleeves: sl });
const jk = (c, shirt, acc = '#231a24') => ({ type: 'jacket', color: c, shirt, tie: null, accent: acc, cuff: acc, hem: -10, sleeves: 'long' });
function shade(c) { return D.shade(c); }
const BIG = { shoulder: 44, hip: 22, torso: 118, upper: 66, fore: 62, thigh: 92, shin: 90 };
const C = {
  wade: base({ name: 'The Merc (Wade, suit)', skin: '#c3202c', eyes: '#141416', noMouth: true, hair: { style: 'buzz', color: '#a8161f', seed: 3, volume: .35 }, acc: { mask: '#c3202c' },
    top: { type: 'jacket', color: '#b81c28', shirt: '#1a1418', tie: null, accent: '#1a1418', cuff: '#1a1418', hem: -10, sleeves: 'long' }, gloves: { color: '#1a1418' }, belt: '#2a2024',
    bottom: { color: '#a8161f', kneePad: '#1a1418' }, shoes: boot('#1a1418'), defaultExpr: 'smug' }),
  wadeFace: base({ name: 'Wade (no mask)', skin: '#c98a74', eyes: '#3a2a22', cheekMarks: null, hair: { style: 'buzz', color: '#b07462', seed: 5, volume: .3 },
    top: { type: 'hoodie', color: '#3a3a44', accent: '#2a2a30', cuff: '#2a2a30', hood: '#2a2a30', strings: '#c3202c', hem: 16 }, bottom: { color: '#2a2a40' }, shoes: boot(), defaultExpr: 'smug' }),
  wadeJail: base({ name: 'Wade (prison)', skin: '#c98a74', eyes: '#3a2a22', hair: { style: 'buzz', color: '#b07462', seed: 5, volume: .3 },
    top: tee('#ff7a1a', '#c85a10', 'short'), bottom: { color: '#ff7a1a' }, shoes: boot('#3a3a3a'), defaultExpr: 'deadpan' }),
  vanessa: base({ name: 'Vanessa', skin: '#c8956e', eyes: '#3a2414', scale: .95, hair: { style: 'long', color: '#1e1412', seed: 41, length: .55 },
    top: jk('#7a2a3a', '#e8d4c4', '#5a1a28'), bottom: { color: '#2a2230' }, shoes: boot('#2a1a14'), defaultExpr: 'smile' }),
  dopinder: base({ name: 'Dopinder', skin: '#a8714a', eyes: '#2a1a12', scale: .94, hair: { style: 'buzz', color: '#1a1210', seed: 8, volume: .4 }, acc: { turban: '#e8781e', beard: '#1a1210' },
    top: jk('#5a6a8a', '#e8e0d0', '#3a4a6a'), bottom: { color: '#3a3a44' }, shoes: boot(), defaultExpr: 'excited' }),
  weasel: base({ name: 'Weasel', skin: '#e8c4a6', eyes: '#3a4a5a', scale: .93, hair: { style: 'messy', color: '#6a4a2a', seed: 22, volume: .8 }, acc: { glasses: '#2a2a30' },
    top: tee('#5a6a3a', '#3a4a2a', 'long'), bottom: { color: '#3a3a44' }, shoes: boot('#4a3a2a'), defaultExpr: 'deadpan' }),
  colossus: base({ name: 'Colossus (chrome giant)', skin: '#aeb8c4', eyes: '#2a4a8a', scale: 1.32, body: BIG, hair: { style: 'buzz', color: '#6e7884', seed: 2, volume: .5 }, acc: { chrome: true },
    top: { type: 'jacket', color: '#1d3a8a', shirt: '#c8a020', tie: null, accent: '#c8a020', cuff: '#c8a020', hem: -10, sleeves: 'short' }, gloves: { color: '#aeb8c4' }, belt: '#c8a020',
    bottom: { color: '#1d3a8a', kneePad: '#c8a020' }, shoes: boot('#c8a020'), defaultExpr: 'smile' }),
  nega: base({ name: 'Negasonic Teenage Warhead', skin: '#efd2bc', eyes: '#3a3a3a', scale: .9, hair: { style: 'buzz', color: '#2a2224', seed: 13, volume: .45 },
    top: jk('#1a1a1e', '#e8781e', '#e8781e'), bottom: { color: '#1a1a1e' }, shoes: boot(), defaultExpr: 'deadpan' }),
  yukio: base({ name: 'Yukio', skin: '#f1d6c0', eyes: '#2a1a14', scale: .88, hair: { style: 'bob', color: '#ff5aa8', seed: 14, volume: .95 },
    top: jk('#f4f1ea', '#ff5aa8', '#ff5aa8'), bottom: { color: '#2a2a40' }, shoes: { color: '#ff5aa8', sole: '#fff', lace: '#fff', type: 'sneaker' }, defaultExpr: 'happy' }),
  russell: base({ name: 'Russell (Firefist)', skin: '#f0c8a8', eyes: '#3a2a1a', scale: .86, body: { shoulder: 30, hip: 20, torso: 96, upper: 54, fore: 50, thigh: 80, shin: 76 }, hair: { style: 'messy', color: '#3a2418', seed: 17, volume: .8 }, acc: { beanie: '#2a2a30' },
    top: { type: 'hoodie', color: '#5a3a2a', accent: '#3a2418', cuff: '#3a2418', hood: '#3a2418', strings: '#ff6a2b', hem: 16 }, bottom: { color: '#2a2a40' }, shoes: boot('#3a2a1a'), defaultExpr: 'angry' }),
  russellJail: base({ name: 'Russell (prison)', skin: '#f0c8a8', eyes: '#3a2a1a', scale: .86, body: { shoulder: 30, hip: 20, torso: 96, upper: 54, fore: 50, thigh: 80, shin: 76 }, hair: { style: 'messy', color: '#3a2418', seed: 17, volume: .8 },
    top: tee('#ff7a1a', '#c85a10', 'short'), bottom: { color: '#ff7a1a' }, shoes: boot('#3a3a3a'), defaultExpr: 'sad' }),
  headmaster: base({ name: 'The Headmaster', skin: '#efcfb6', eyes: '#3a4a5a', hair: { style: 'buzz', color: '#9a9088', seed: 23, volume: .5 }, acc: { glasses: '#4a4a52' },
    top: { type: 'jacket', color: '#3a3a40', shirt: '#f4f1ea', tie: '#1a1a20', accent: '#2a2a30', cuff: '#2a2a30', hem: -10, sleeves: 'long' }, bottom: { color: '#3a3a40' }, shoes: boot(), defaultExpr: 'smug' }),
  orderly: base({ name: 'Orderly', skin: '#e0b896', eyes: '#2a1a12', scale: 1.04, hair: { style: 'buzz', color: '#4a3a2a', seed: 26, volume: .45 },
    top: tee('#e8ecf0', '#b8c0c8', 'short'), bottom: { color: '#e8ecf0' }, shoes: boot('#f4f4f4'), defaultExpr: 'angry' }),
  guard: base({ name: 'Prison guard', skin: '#b88a64', eyes: '#2a1a12', scale: 1.06, hair: { style: 'buzz', color: '#1a1210', seed: 27, volume: .4 }, acc: { sunglasses: true },
    top: jk('#2a3440', '#1a2028', '#1a2028'), belt: '#141418', bottom: { color: '#2a3440', kneePad: '#141418' }, shoes: boot(), defaultExpr: 'deadpan' }),
  cable: base({ name: 'Cable (time soldier)', skin: '#d8ae8e', eyes: '#3a4a5a', scale: 1.14, body: { shoulder: 38, hip: 19, torso: 110, upper: 62, fore: 58, thigh: 90, shin: 88 }, hair: { style: 'buzz', color: '#e8e8ea', seed: 31, volume: .5 }, acc: { stubble: '#b8b8bc', cyberEye: '#ffd23d' },
    top: { type: 'jacket', color: '#3a4030', shirt: '#2a2a24', tie: null, accent: '#6a7060', cuff: '#7a828e', hem: -10, sleeves: 'long' }, gloves: { color: '#6a7280' }, belt: '#2a2a24',
    bottom: { color: '#3a4030', kneePad: '#2a2a24' }, shoes: boot('#2a2a24'), defaultExpr: 'deadpan' }),
  domino: base({ name: 'Domino', skin: '#7a4a32', eyes: '#2a1a12', scale: .97, hair: { style: 'cloud', color: '#1a1210', seed: 33, volume: 1.15 }, acc: { eyeRing: '#141416' },
    top: jk('#1a1a1e', '#3a3a40', '#3a3a40'), belt: '#2a2a30', bottom: { color: '#1a1a1e' }, shoes: boot(), defaultExpr: 'smug' }),
  juggernaut: base({ name: 'The Juggernaut', skin: '#d8a888', eyes: '#c81e1e', scale: 1.55, body: { shoulder: 50, hip: 26, torso: 120, upper: 70, fore: 66, thigh: 90, shin: 86 }, hair: { style: 'buzz', color: '#2a1a14', seed: 35, volume: .3 }, acc: { helmet: '#9a2a1e' },
    top: { type: 'jacket', color: '#8a2a1e', shirt: '#5a5a62', tie: null, accent: '#5a5a62', cuff: '#5a5a62', hem: -10, sleeves: 'long' }, gloves: { color: '#5a5a62' }, belt: '#5a5a62',
    bottom: { color: '#6a1e16', kneePad: '#5a5a62' }, shoes: boot('#5a5a62'), defaultExpr: 'angry' }),
  peter: base({ name: 'Peter (no powers)', skin: '#f0cdb0', eyes: '#3a4a5a', scale: .96, hair: { style: 'buzz', color: '#8a6a4a', seed: 37, volume: .35 }, acc: { moustache: '#7a5a3a' },
    top: jk('#3a4030', '#2a2a24', '#6a7060'), bottom: { color: '#3a4030' }, shoes: boot(), defaultExpr: 'happy' }),
  bedlam: base({ name: 'Bedlam', skin: '#e8c4a6', eyes: '#3a5a7a', hair: { style: 'messy', color: '#c8a050', seed: 39, volume: .7 },
    top: jk('#3a4030', '#2a2a24', '#6a7060'), bottom: { color: '#3a4030' }, shoes: boot(), defaultExpr: 'neutral' }),
  shatterstar: base({ name: 'Shatterstar', skin: '#f4e0d0', eyes: '#3a6a8a', scale: 1.02, hair: { style: 'long', color: '#c8302a', seed: 43, length: .7 }, acc: { starEye: '#1a1a1e' },
    top: jk('#3a4030', '#2a2a24', '#6a7060'), bottom: { color: '#3a4030' }, shoes: boot(), defaultExpr: 'smug' }),
  zeitgeist: base({ name: 'Zeitgeist', skin: '#e0b896', eyes: '#3a2a1a', hair: { style: 'buzz', color: '#3a2a1a', seed: 45, volume: .5 }, acc: { stubble: '#3a2a1a' },
    top: jk('#3a4030', '#2a2a24', '#6a7060'), bottom: { color: '#3a4030' }, shoes: boot(), defaultExpr: 'smug' }),
  vanisher: base({ name: 'The Vanisher (one second)', skin: '#e8c4a6', eyes: '#3a6a8a', hair: { style: 'messy', color: '#c8a050', seed: 47, volume: .9 }, acc: { stubble: '#a88040' },
    top: jk('#3a4030', '#2a2a24', '#6a7060'), bottom: { color: '#3a4030' }, shoes: boot(), defaultExpr: 'shock' }),
  hope: base({ name: 'Hope (Cable\'s daughter)', skin: '#e8c4a6', eyes: '#3a4a5a', scale: .62, hair: { style: 'bob', color: '#d8b06a', seed: 49, volume: 1 },
    top: tee('#ffd23d', '#c8a020', 'short'), bottom: { color: '#2a6aa8' }, shoes: { color: '#f4f1ea', sole: '#e23a3a', lace: '#fff', type: 'sneaker' }, defaultExpr: 'happy' }),
  cableWife: base({ name: 'Cable\'s wife', skin: '#d8ae8e', eyes: '#3a2a1a', scale: .95, hair: { style: 'long', color: '#5a3a24', seed: 51, length: .5 },
    top: jk('#4a5a6a', '#e8e0d0', '#3a4a5a'), bottom: { color: '#3a3a44' }, shoes: boot(), defaultExpr: 'smile' }),
  bigInmate: base({ name: 'Inmate', skin: '#9a6a4a', eyes: '#2a1a12', scale: 1.12, body: BIG, hair: { style: 'buzz', color: '#1a1210', seed: 53, volume: .3 }, acc: { beard: '#1a1210' },
    top: tee('#ff7a1a', '#c85a10', 'short'), bottom: { color: '#ff7a1a' }, shoes: boot('#3a3a3a'), defaultExpr: 'angry' }),
  thug: base({ name: 'Gangster', skin: '#e0b896', eyes: '#2a1a12', hair: { style: 'buzz', color: '#1a1210', seed: 55, volume: .5 }, acc: { stubble: '#1a1210' },
    top: jk('#2a2a30', '#8a1a2a', '#1a1a20'), bottom: { color: '#2a2a30' }, shoes: boot(), defaultExpr: 'angry' }),
  boss: base({ name: 'Crime boss (shiny suit)', skin: '#e8c8a8', eyes: '#2a1a12', hair: { style: 'buzz', color: '#1a1210', seed: 57, volume: .55 }, acc: { sunglasses: true },
    top: { type: 'jacket', color: '#c8c0a8', shirt: '#1a1a20', tie: '#c8a020', accent: '#e8e0c8', cuff: '#e8e0c8', hem: -10, sleeves: 'long' }, bottom: { color: '#c8c0a8' }, shoes: boot('#e8e0c8'), defaultExpr: 'smug' }),
  ex1: base({ name: 'Extra (woman)', skin: '#e8c09a', eyes: '#3a5a7a', scale: .95, hair: { style: 'bob', color: '#8a3a22', seed: 61, volume: 1 },
    top: { type: 'jacket', color: '#8a2a3a', shirt: '#e8d8c8', tie: null, accent: '#6a1a2a', cuff: '#6a1a2a', hem: -10, sleeves: 'long' }, bottom: { color: '#3a2a2a' }, shoes: boot(), defaultExpr: 'neutral' }),
  ex2: base({ name: 'Extra (old man)', skin: '#d9a582', eyes: '#2a1a12', scale: .97, hair: { style: 'buzz', color: '#d8d8d8', seed: 62, volume: .6 }, acc: { beard: '#d8d8d8' },
    top: { type: 'jacket', color: '#4a5a3a', shirt: '#d8d0b8', tie: null, accent: '#3a4a2a', cuff: '#3a4a2a', hem: -10, sleeves: 'long' }, bottom: { color: '#3a3a30' }, shoes: boot('#3a2a1a'), defaultExpr: 'deadpan' }),
  ex3: base({ name: 'Extra (local)', skin: '#c8905a', eyes: '#2a1a12', scale: .98, hair: { style: 'messy', color: '#1a1210', seed: 63, volume: .9 },
    top: { type: 'tee', color: '#c87a3a', accent: '#8a4a1a', cuff: '#8a4a1a', hem: 14, sleeves: 'long' }, bottom: { color: '#5a4a3a' }, shoes: boot('#5a3a1a'), defaultExpr: 'blank' }),
  ex4: base({ name: 'Extra (kid)', skin: '#f0cfb2', eyes: '#3a5a7a', scale: .72, hair: { style: 'messy', color: '#c8a050', seed: 64, volume: 1 },
    top: { type: 'tee', color: '#3a8ac8', accent: '#2a5a8a', cuff: '#2a5a8a', hem: 14, sleeves: 'short' }, bottom: { color: '#c8a050' }, shoes: { color: '#f4f1ea', sole: '#d9472b', lace: '#fff', type: 'sneaker' }, defaultExpr: 'happy' }),
};
module.exports = { D, C };
if (require.main === module) {
  const keys = Object.keys(C), W = 120 + keys.length * 190, H = 820; let s = `<rect width="${W}" height="${H}" fill="#efe9dc"/>`;
  keys.forEach((k, i) => { const x = 110 + i * 190; s += D.drawCharacter(C[k], { x, y: 740, scale: .95, view: i % 3 === 2 ? 'threequarter' : 'front', expr: C[k].defaultExpr });
    s += `<text x="${x}" y="800" text-anchor="middle" font-family="Inter" font-weight="700" font-size="15" fill="#231A24">${C[k].name}</text>`; });
  require('fs').writeFileSync('castsheet.svg', D.svg(W, H, s));
}
