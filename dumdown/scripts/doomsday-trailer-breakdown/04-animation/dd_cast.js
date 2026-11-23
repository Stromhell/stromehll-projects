// Doomsday trailer breakdown parody cast (DumDown). Original designs, no actor likeness, no film costumes or logos.
(function () { const C = window.CAST;
const base = o => Object.assign({ scale: 1, wraps: false, gloves: null, belt: null, defaultExpr: 'neutral' }, o);
const boot = (c = '#1a1a1a') => ({ color: c, sole: '#000', lace: '#333', type: 'boot' });
const SNK = (c = '#f4f1ea', sole = '#e23a3a') => ({ color: c, sole, lace: '#fff', type: 'sneaker' });
const jk = (c, shirt, acc = '#231a24', hem = -10) => ({ type: 'jacket', color: c, shirt, tie: null, accent: acc, cuff: acc, hem, sleeves: 'long' });
const tee = (c, acc, sl = 'short') => ({ type: 'tee', color: c, accent: acc, cuff: acc, hem: 14, sleeves: sl });
const BIG = { shoulder: 44, hip: 22, torso: 118, upper: 66, fore: 62, thigh: 92, shin: 90 };
const HUGE = { shoulder: 58, hip: 30, torso: 124, upper: 70, fore: 70, thigh: 92, shin: 86 };
const F4 = (skin, hair, o = {}) => base(Object.assign({ skin, eyes: '#2a4a6a', top: jk('#f4f6f8', '#2a9aa8', '#2a9aa8'), belt: '#c8ccd4', bottom: { color: '#2a9aa8' }, shoes: boot('#f4f6f8'), gloves: { color: '#f4f6f8' }, hair }, o));
const LIGHT = '#ecc4a2', TAN = '#d8a882', DK = '#5a3420';
Object.assign(C, {
  // Steve + family (farm timeline)
  oldCap:  base({ name: 'Old Cap', skin: LIGHT, eyes: '#2a5a9a', scale: 1.06, body: BIG, hair: { style: 'long', color: '#8a6a3a', seed: 4101, length: .3 }, acc: { beard: '#7a5a32' }, top: tee('#1e1e22', '#2a2a30', 'short'), belt: '#3a2a1a', bottom: { color: '#5a4430' }, shoes: boot('#3a2a1a'), defaultExpr: 'neutral' }),
  agentPeg:base({ name: 'Agent Peg', skin: '#f0d0b4', eyes: '#5a3a22', scale: .95, hair: { style: 'bob', color: '#3a1e12', seed: 4103, volume: 1.15 }, top: jk('#1e2a4a', '#f4ecd8', '#3a4a7a', 60), bottom: { color: '#1e2a4a' }, shoes: boot('#2a1a14'), defaultExpr: 'neutral' }),
  kid:     base({ name: 'The Kid', skin: '#f0d0b4', eyes: '#2a5a9a', scale: .86, hair: { style: 'messy', color: '#5a3a22', seed: 4105, volume: .7 }, top: jk('#7a2a2a', '#efe4c8', '#3a1414'), bottom: { color: '#3a4a6a' }, shoes: SNK('#e8e0d0', '#7a2a2a'), defaultExpr: 'happy' }),
  // Fantastic Four (other universe)
  stretch: F4(TAN, { style: 'wavy', color: '#2a1a12', seed: 4111, volume: .6 }, { name: 'Stretch', acc: { moustache: '#2a1a12' }, scale: 1.02, defaultExpr: 'nervous' }),
  glowSue: F4('#f2d6c0', { style: 'long', color: '#f0d890', seed: 4113, length: .5 }, { name: 'Glow Sue', scale: .95, defaultExpr: 'neutral' }),
  flameKid:F4('#f0d0b0', { style: 'spiky', color: '#e8c070', seed: 4115, volume: .7 }, { name: 'Flame Kid', scale: 1.0, defaultExpr: 'smug' }),
  rockBen: base({ name: 'Rock Ben', skin: '#d8743a', eyes: '#3a6a9a', scale: 1.08, body: HUGE, hair: { style: 'buzz', color: '#b8582a', seed: 4117, volume: .1 }, top: tee('#2a9aa8', '#1a6a78', 'long'), bottom: { color: '#2a9aa8' }, shoes: boot('#b8582a'), gloves: { color: '#d8743a' }, defaultExpr: 'deadpan' }),
  // Doom side
  doomH:   Object.assign({}, C.doom, { name: 'Doom' }),
  maskMonk:base({ name: 'Masked choir', skin: '#c8a04a', eyes: '#1a1a14', scale: 1.0, hair: { style: 'buzz', color: '#1a1a14', seed: 4121, volume: .1 }, acc: { faceplate: '#c8a04a', hoodRim: '#14201a', slitGlow: '#e8d080' }, top: { type: 'jacket', color: '#1a221c', shirt: '#2a3228', tie: null, accent: '#c8a04a', cuff: '#2a3228', hem: 110, sleeves: 'long' }, bottom: { color: '#1a221c' }, shoes: boot('#1a1a14'), hoodBack: '#141c16', defaultExpr: 'deadpan' }),
  // Thor + Love
  thunderBro: base({ name: 'Thunder Bro', skin: LIGHT, eyes: '#2a6ab8', scale: 1.12, body: BIG, hair: { style: 'buzz', color: '#a87a3a', seed: 4131, volume: .55 }, acc: { beard: '#9a6a2e' }, top: jk('#1e2228', '#3a424c', '#8a929e'), gloves: { color: '#1e2228' }, belt: '#8a929e', bottom: { color: '#1e2228' }, shoes: boot('#1e2228'), cape: '#b81c24', defaultExpr: 'neutral' }),
  thunderTee: base({ name: 'Thunder Bro (tank top)', skin: LIGHT, eyes: '#2a6ab8', scale: 1.12, body: BIG, hair: { style: 'buzz', color: '#a87a3a', seed: 4131, volume: .55 }, acc: { beard: '#9a6a2e' }, top: tee('#6a9aa8', '#4a7a88', 'short'), bottom: { color: '#3a3a44' }, shoes: boot('#2a2a2e'), defaultExpr: 'sad' }),
  love:    base({ name: 'Little Love', skin: '#c89a74', eyes: '#2a1a12', scale: .62, hair: { style: 'long', color: '#2a1a12', seed: 4133, length: .55 }, top: tee('#e8eef4', '#9ab8d8', 'short'), bottom: { color: '#4a5a7a' }, shoes: SNK('#f4f1ea', '#9ab8d8'), defaultExpr: 'sad' }),
  // New Avengers
  newCap:  base({ name: 'New Cap', skin: '#5a3a26', eyes: '#2a1a12', scale: 1.06, body: BIG, hair: { style: 'buzz', color: '#141010', seed: 4141, volume: .3 }, top: jk('#1a2a5a', '#f4f1ea', '#c3202c'), gloves: { color: '#1a1a22' }, belt: '#c3202c', bottom: { color: '#1a2a5a' }, shoes: boot('#1a1a22'), defaultExpr: 'neutral' }),
  yelenaD: Object.assign({}, C.yelena, { name: 'Yelena' }),
  ringGuy: base({ name: 'Ring Guy', skin: '#ecc8a0', eyes: '#2a1a12', scale: 1.0, hair: { style: 'messy', color: '#141010', seed: 4145, volume: .55 }, top: jk('#7a1e1e', '#1a1a1a', '#e8a82a'), gloves: { color: '#e8a82a' }, bottom: { color: '#1a1a1e' }, shoes: boot('#1a1a1e'), defaultExpr: 'neutral' }),
  antGuy:  Object.assign({}, C.scott, { name: 'Ant-Man' }),
  // X-Men (comic-accurate colours, original shapes)
  laserEyes: base({ name: 'Laser Eyes', skin: LIGHT, eyes: '#e23a3a', scale: 1.02, hair: { style: 'messy', color: '#4a2e1a', seed: 4151, volume: .6 }, acc: { sunglasses: '#e23a3a' }, top: jk('#1e2a6a', '#e8c030', '#e8c030'), gloves: { color: '#1e2a6a' }, belt: '#e8c030', bottom: { color: '#1e2a6a' }, shoes: boot('#1e2a6a'), defaultExpr: 'neutral' }),
  bigBlue: Object.assign({}, C.beast, { name: 'Big Blue' }),
  blueLady:base({ name: 'Blue Lady', skin: '#3a6ad8', eyes: '#ffd23d', scale: .96, hair: { style: 'bob', color: '#d8402a', seed: 4155, volume: .9 }, top: jk('#f4f1ea', '#e8e0d0', '#c8c0b0', 50), bottom: { color: '#f4f1ea' }, shoes: boot('#f4f1ea'), defaultExpr: 'smug' }),
  cardGuy: base({ name: 'Card Guy', skin: '#e8c09a', eyes: '#c81e5a', scale: 1.0, hair: { style: 'long', color: '#7a4a2a', seed: 4157, length: .4 }, acc: { stubble: '#5a3a1a', band: '#2a2a2e' }, top: { type: 'jacket', color: '#8a5a32', shirt: '#c83a8a', tie: null, accent: '#5a3a1a', cuff: '#5a3a1a', hem: 70, sleeves: 'long' }, bottom: { color: '#2a3a6a' }, shoes: boot('#3a2a2a'), defaultExpr: 'smug' }),
  puff:    base({ name: 'Puff', skin: '#2a3a8a', eyes: '#ffd23d', scale: .9, hair: { style: 'spiky', color: '#141a3a', seed: 4159, volume: .6 }, top: jk('#c3202c', '#1a1a22', '#1a1a22'), bottom: { color: '#1a1a22' }, shoes: boot('#1a1a22'), defaultExpr: 'happy' }),
  profX:   base({ name: 'Professor', skin: '#ecc4a2', eyes: '#3a5a7a', scale: 1.0, hair: { style: 'buzz', color: '#ecc4a2', seed: 4161, volume: 0 }, top: jk('#2a2a34', '#f4f1ea', '#1a1a22'), bottom: { color: '#2a2a34' }, shoes: boot('#1a1a1a'), defaultExpr: 'neutral' }),
  // Wakanda / Talokan (reuse DumDown Wakanda designs)
  princess: Object.assign({}, C.panther || C.shuri, { name: 'The Princess' }),
  mountain: Object.assign({}, C.mbaku, { name: 'Mountain Man' }),
  ankles:   Object.assign({}, C.namor, { name: 'Feather Ankles' }),
  dora:     Object.assign({}, C.okoye, { name: 'Red guard' }),
  // hosts + gag extras
  stormi:  Object.assign({}, C.mascot, { name: 'Stormi' }),
  shopkeep:base({ name: 'Shopkeeper', skin: '#e0b894', eyes: '#2a1a12', scale: .92, hair: { style: 'messy', color: '#8a8a8a', seed: 4171, volume: .5 }, acc: { moustache: '#8a8a8a', glasses: '#2a2a2a' }, top: jk('#4a3a2a', '#e8e0d0', '#2a2018'), bottom: { color: '#2a2a2a' }, shoes: boot('#2a2018'), defaultExpr: 'nervous' }),
});
})();
(function () { const C = window.CAST; const b = C.maskMonk;
  C.doombot = Object.assign({}, b, { hoodBack: null, name: 'Doombot', skin: '#a8b0ba', eyes: '#5aff6a', scale: 1.5, body: { shoulder: 54, hip: 28, torso: 126, upper: 70, fore: 68, thigh: 96, shin: 92 }, hair: { style: 'buzz', color: '#a8b0ba', seed: 4181, volume: 0 },
    acc: { faceplate: '#b8c0ca', glowEyes: '#5aff6a' }, top: { type: 'jacket', color: '#2a5a32', shirt: '#9aa2ac', tie: null, accent: '#9aa2ac', cuff: '#9aa2ac', hem: 40, sleeves: 'long' }, gloves: { color: '#a8b0ba' }, belt: '#5a6068', bottom: { color: '#8a929c' }, shoes: { color: '#8a929c', sole: '#3a3e44', lace: '#8a929c', type: 'boot' }, defaultExpr: 'deadpan' });
})();
// some reused designs have no hair spec, which crashes side/threequarter views: give them an invisible buzz
(function () { const C = window.CAST; for (const k in C) if (C[k] && typeof C[k] === 'object' && C[k].skin && !C[k].hair) C[k].hair = { style: 'buzz', color: C[k].skin, seed: 4199, volume: 0 }; })();
