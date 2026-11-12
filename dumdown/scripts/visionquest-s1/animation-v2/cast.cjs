// VisionQuest parody cast for DumDown (original designs in the DumDown anime style; no actor likeness, no logos)
const D = require('./kit.js');
const base = (o) => Object.assign({ scale: 1, wraps: false, gloves: null, belt: null, defaultExpr: 'neutral' }, o);
const C = {
  vision: base({ name: 'Pale Man (Vision)', skin: '#e3cfe3', eyes: '#2fc6ff', hair: { style: 'buzz', color: '#3a2f4f', seed: 12, volume: .95 },
    top: { type: 'jacket', color: '#7a5a3a', shirt: '#f4f1ea', tie: '#8a2a3a', accent: '#c9a46a', cuff: '#5a3d1e', hem: -10, sleeves: 'long' },
    bottom: { color: '#3a2f4f', baggy: false }, shoes: { color: '#2c2b45', sole: '#1d1d24', lace: '#555', type: 'boot' }, defaultExpr: 'deadpan' }),
  whiteVision: base({ name: 'White Vision', skin: '#f2f4fa', eyes: '#9fe6ff', hair: { style: 'buzz', color: '#d8dde8', seed: 12, volume: .9 },
    top: { type: 'jacket', color: '#f4f6fb', shirt: '#dfe6f2', tie: null, accent: '#c8d4e8', cuff: '#c8d4e8', hem: -10, sleeves: 'long' },
    bottom: { color: '#e8ecf4', baggy: false }, shoes: { color: '#e8ecf4', sole: '#b8c4d8', lace: '#fff', type: 'boot' }, scarf: '#e8ecf4', defaultExpr: 'blank' }),
  jarvis: base({ name: 'Butler AI (Jarvis)', skin: '#f0cdb0', eyes: '#3d6fb5', hair: { style: 'messy', color: '#2a2230', seed: 77, volume: .85 },
    top: { type: 'jacket', color: '#1d1d24', shirt: '#f4f1ea', tie: '#1d1d24', accent: '#3a3a44', cuff: '#111', hem: -10, sleeves: 'long' },
    bottom: { color: '#1d1d24' }, shoes: { color: '#111', sole: '#000', lace: '#333', type: 'boot' }, acc: { moustache: '#2a2230' }, defaultExpr: 'smile' }),
  friday: base({ name: 'Redhead AI (Friday)', skin: '#f6d6c0', eyes: '#3f8f5f', scale: .96, hair: { style: 'bob', color: '#c2502a', seed: 21, volume: 1 },
    top: { type: 'jacket', color: '#7a4a2a', shirt: '#f4f1ea', tie: null, accent: '#a86a3a', cuff: '#5a3418', hem: -10, sleeves: 'long' },
    bottom: { color: '#6a3c20' }, shoes: { color: '#3a2214', sole: '#1d1208', lace: '#555', type: 'boot' }, defaultExpr: 'deadpan' }),
  edith: base({ name: 'Pilot AI (Edith)', skin: '#ecc4a4', eyes: '#5a3a2a', scale: .95, hair: { style: 'long', color: '#2c2b45', seed: 5, length: .85 },
    top: { type: 'tee', color: '#2a3990', accent: '#ff6a2b', cuff: '#1b2461', hem: 14, sleeves: 'long' }, scarf: '#ff6a2b',
    bottom: { color: '#3a3a4a' }, shoes: { color: '#5a3a2a', sole: '#2a1a10', lace: '#999', type: 'boot' }, defaultExpr: 'nervous' }),
  dume: base({ name: 'Big Overalls AI (DUM-E)', skin: '#d9a582', eyes: '#5a3a2a', scale: 1.06, body: { shoulder: 33, hip: 17, torso: 104, thigh: 86, shin: 84, upper: 58, fore: 54 },
    hair: { style: 'messy', color: '#5a3a2a', seed: 90, volume: .9 }, acc: { beard: '#5a3a2a' },
    top: { type: 'tee', color: '#7a7f8a', accent: '#5a5f6a', cuff: '#5a5f6a', hem: 14, sleeves: 'short' }, bottom: { color: '#6a6f7a', baggy: true, kneePad: '#4a4f5a' },
    shoes: { color: '#3a3a3a', sole: '#1d1d1d', lace: '#777', type: 'boot' }, defaultExpr: 'happy' }),
  u: base({ name: 'Young Overalls AI (U)', skin: '#f2c8a6', eyes: '#3d6fb5', scale: .97, hair: { style: 'spiky', color: '#c9a46a', seed: 33, volume: .95 },
    top: { type: 'tee', color: '#8a8f9a', accent: '#6a6f7a', cuff: '#6a6f7a', hem: 14, sleeves: 'short' }, bottom: { color: '#6a6f7a', baggy: true },
    shoes: { color: '#f4f1ea', sole: '#2c2b45', lace: '#999', type: 'sneaker' }, defaultExpr: 'blank' }),
  ultron: base({ name: 'Attic Uncle (Ultron)', skin: '#efcdb4', eyes: '#c0392b', hair: { style: 'messy', color: '#2a2024', seed: 61, volume: .9 },
    acc: { beard: '#2a2024', glasses: '#c9a46a', tophat: '#1a1418', band: '#8a1a2a' }, scarf: '#c2302a',
    top: { type: 'jacket', color: '#5a1a2a', shirt: '#1d1d24', tie: null, accent: '#8a2a3a', cuff: '#3a0e18', hem: -10, sleeves: 'long' },
    bottom: { color: '#1d1d24' }, shoes: { color: '#111', sole: '#000', lace: '#333', type: 'boot' }, defaultExpr: 'smug' }),
  tommy: base({ name: 'Street Kid (Tommy)', skin: '#efc6a6', eyes: '#3f8f5f', scale: .97, hair: { style: 'messy', color: '#5a3a2a', seed: 14, volume: 1.05 },
    top: { type: 'jacket', color: '#8aa07a', shirt: '#f4f1ea', tie: null, accent: '#5a6e4a', cuff: '#5a6e4a', hem: -10, sleeves: 'long' },
    bottom: { color: '#3a3f4a' }, shoes: { color: '#f4f1ea', sole: '#d9472b', lace: '#fff', type: 'sneaker' }, defaultExpr: 'nervous' }),
  paladin: base({ name: 'Bounty Hunter (Paladin)', skin: '#e2b190', eyes: '#5a3a2a', scale: 1.04, body: { shoulder: 32, hip: 16, torso: 102, thigh: 86, shin: 84, upper: 58, fore: 54 },
    hair: { style: 'buzz', color: '#8a8a90', seed: 3, volume: .55 }, acc: { stubble: '#6a6a70', sunglasses: true },
    top: { type: 'jacket', color: '#1d1d22', shirt: '#3a3a40', tie: null, accent: '#3a3a40', cuff: '#0e0e10', hem: -10, sleeves: 'long' },
    bottom: { color: '#2a2a30' }, shoes: { color: '#1a1a1a', sole: '#000', lace: '#333', type: 'boot' }, defaultExpr: 'deadpan' }),
  jocasta: base({ name: 'Robot Bride (Jocasta)', skin: '#2a2a33', eyes: '#ff2a2a', scale: .98, hair: { style: 'long', color: '#121218', seed: 8, length: 1 },
    acc: { glowEyes: '#ff3030' }, top: { type: 'hoodie', color: '#141418', accent: '#2a2a33', cuff: '#0a0a0c', hood: '#101014', strings: '#2a2a33', hem: 16 },
    bottom: { color: '#1a1a20' }, shoes: { color: '#1a1a20', sole: '#000', lace: '#333', type: 'boot' }, defaultExpr: 'blank' }),
};
module.exports = { D, C };
if (require.main === module) {
  const W = 2400, H = 820; let s = `<rect width="${W}" height="${H}" fill="#efe9dc"/>`;
  const keys = Object.keys(C); keys.forEach((k, i) => { const x = 110 + i * 214; s += D.drawCharacter(C[k], { x, y: 740, scale: .95, view: i % 3 === 2 ? 'threequarter' : 'front', expr: C[k].defaultExpr });
    s += `<text x="${x}" y="800" text-anchor="middle" font-family="Inter" font-weight="700" font-size="17" fill="#231A24">${C[k].name}</text>`; });
  require('fs').writeFileSync('castsheet.svg', D.svg(W, H, s));
}
