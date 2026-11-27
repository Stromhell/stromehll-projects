// Doomsday trailer at 0.25x parody cast additions (DumDown). Original designs, no actor likeness, no film costumes or logos.
(function () { const C = window.CAST;
const base = o => Object.assign({ scale: 1, wraps: false, gloves: null, belt: null, defaultExpr: 'neutral' }, o);
const boot = (c = '#1a1a1a') => ({ color: c, sole: '#000', lace: '#333', type: 'boot' });
const SNK = (c = '#f4f1ea', sole = '#e23a3a') => ({ color: c, sole, lace: '#fff', type: 'sneaker' });
const jk = (c, shirt, acc = '#231a24', hem = -10) => ({ type: 'jacket', color: c, shirt, tie: null, accent: acc, cuff: acc, hem, sleeves: 'long' });
Object.assign(C, {
  magneto: base({ name: 'Magnet Grandpa', skin: '#ecc8aa', eyes: '#3a5a7a', scale: 1.02, hair: { style: 'wavy', color: '#e8e8ee', seed: 5101, volume: .5 }, top: jk('#6a1420', '#4a1018', '#3a0a10', 90), cape: '#8a1a24', gloves: { color: '#6a1420' }, bottom: { color: '#4a1018' }, shoes: boot('#3a0a10'), defaultExpr: 'angry' }),
  witchO: Object.assign({}, C.maskMonk, { name: 'Orange witch', top: Object.assign({}, C.maskMonk.top, { color: '#c8641e', accent: '#e8c060' }), bottom: { color: '#a04a14' }, hoodBack: '#8a3a10', acc: Object.assign({}, C.maskMonk.acc, { slitGlow: '#7aff8a' }), scale: .94 }),
  witchP: Object.assign({}, C.maskMonk, { name: 'Purple witch', top: Object.assign({}, C.maskMonk.top, { color: '#5a2a8a', accent: '#e8c060' }), bottom: { color: '#3a1a5a' }, hoodBack: '#2a1040', acc: Object.assign({}, C.maskMonk.acc, { slitGlow: '#7aff8a' }), scale: .94 }),
  witchG: Object.assign({}, C.maskMonk, { name: 'Green witch', top: Object.assign({}, C.maskMonk.top, { color: '#1e6a32', accent: '#ffd23d' }), belt: '#ffd23d', bottom: { color: '#14481e' }, hoodBack: '#0e3014', acc: Object.assign({}, C.maskMonk.acc, { slitGlow: '#7aff8a' }), scale: .97 }),
  dum: base({ name: 'Dum', skin: '#f0cca8', eyes: '#3a2a1a', scale: .92, hair: { style: 'messy', color: '#3a2618', seed: 5111, volume: .6 }, top: { type: 'hoodie', color: '#ff6a2b', accent: '#231a24', cuff: '#c84a14', hood: '#c84a14', strings: '#f4f1ea', hem: 16 }, bottom: { color: '#2a2a3a' }, shoes: SNK('#f4f1ea', '#ff6a2b'), defaultExpr: 'deadpan' }),
  down: base({ name: 'Down', skin: '#f4d6bc', eyes: '#2a6a8a', scale: .9, hair: { style: 'long', color: '#f0d890', seed: 5113, length: .45 }, top: jk('#2fb6a7', '#f4f1ea', '#1a7a6e'), bottom: { color: '#1b2470' }, shoes: SNK('#f4f1ea', '#2fb6a7'), defaultExpr: 'happy' }),
  stormiDet: Object.assign({}, C.mascot, { name: 'Stormi (detective)', top: { type: 'jacket', color: '#b8986a', shirt: '#2a3990', tie: null, accent: '#7a5a32', cuff: '#7a5a32', hem: 80, sleeves: 'long' } }),
  youngCap: Object.assign({}, C.oldCap, { name: 'Young Cap', hair: { style: 'buzz', color: '#a8803a', seed: 5121, volume: .6 }, acc: {}, top: jk('#5a4430', '#efe4c8', '#3a2a1a') }),
  pegRed: Object.assign({}, C.agentPeg, { name: 'Peggy 1949', top: { type: 'jacket', color: '#b01e2a', shirt: '#b01e2a', tie: null, accent: '#7a1018', cuff: '#7a1018', hem: 70, sleeves: 'long' }, bottom: { color: '#b01e2a' } }),
  pegOld: Object.assign({}, C.agentPeg, { name: 'Peggy (later)', hair: Object.assign({}, C.agentPeg.hair, { color: '#7a6a62' }) }),
  neighbor: Object.assign({}, C.shopkeep, { name: 'Neighbour', acc: { moustache: '#5a3a22' }, top: jk('#6a7a4a', '#f4ecd8', '#3a4a2a') }),
  tinyGiant: Object.assign({}, C.kate, { name: 'Tiny Giant', hair: { style: 'long', color: '#c89a5a', seed: 5131, length: .5 }, top: jk('#6a4a9a', '#c8ccd4', '#c8ccd4') }),
  redG: Object.assign({}, C.alexei, { name: 'Red Grandpa' }),
  robot: Object.assign({}, C.doombot, { name: 'Giant robot', skin: '#8a7a9a', top: Object.assign({}, C.doombot.top, { color: '#5a4a6a' }), acc: { faceplate: '#9a8aaa', glowEyes: '#5aff6a' }, scale: 2.2 }),
});
})();
