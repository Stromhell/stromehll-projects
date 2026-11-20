// Cast for "Doctor Doom's Entire Life" (DumDown). Original parody designs; names live in VO and labels only.
(function () {
const S = FLAT.SK;
const metal = '#b9c0c6';
const DOOM = { mask: true, maskC: '#c7ccd1', eyeGlow: '#ffd56a', hood: '#23803d', cloak: '#25843f', top: '#2a8f47', topType: 'tunic', sleeve: metal, gloves: '#a9b0b6', legs: '#a9b0b6', shoes: '#6f777e', belt: '#c99a2e', buckle: '#e6c25a', armor: true, armorC: metal, bodyW: 1.08, magic: '120,255,160', expr: 'neutral' };
window.CAST = {
  doom: DOOM,
  doomNoHood: Object.assign({}, DOOM, { hood: null }),
  doomHot: Object.assign({}, DOOM, { maskHot: .55, hood: null, cloak: '#25843f' }),
  doomGold: Object.assign({}, DOOM, { glowAura: 'rgba(255,214,90,A)', eyeGlow: '#fff2b0' }),
  doomSilver: Object.assign({}, DOOM, { glowAura: 'rgba(210,230,255,A)', eyeGlow: '#ffffff' }),
  doomIron: Object.assign({}, DOOM, { top: '#c23a3a', topType: 'suit', badge: '', suitTrim: '#e6c25a', cloak: null, hood: null, sleeve: '#c23a3a', legs: '#b9c0c6', chestGlow: 'rgba(160,230,255,.9)' }),
  doomMini: Object.assign({}, DOOM, { kid: true, scale: .82 }),
  doomBack: Object.assign({}, DOOM), // the man without the mask, always seen from behind
  victorKid: { kid: true, skin: S.a, hair: 'messy', hairC: '#2b2230', top: '#8a6a4a', topType: 'robe', robe: true, cloak: '#7a5a3a', expr: 'sad' },
  victorTeen: { skin: S.a, hair: 'messy', hairC: '#2b2230', top: '#7b5a3c', topType: 'coat', collar: '#e9e4da', legs: '#3a3a46', expr: 'determined', scale: .95 },
  victor: { skin: S.a, hair: 'messy', hairC: '#2b2230', top: '#4f7a52', topType: 'coat', collar: '#e9e4da', legs: '#3a3a46', expr: 'determined' },
  victorBand: { skin: S.a, hair: 'none', top: '#4f7a52', topType: 'coat', legs: '#3a3a46', mask: true, maskC: '#efe9dc', expr: 'sad' },
  werner: { skin: S.c, hair: 'bald', hairC: '#9a9a9a', beard: '#b7b2aa', top: '#eae0c8', topType: 'shirt', apron: '#6f9a5c', legs: '#6a5a4a', expr: 'happy' },
  cynthia: { skin: S.a, hair: 'long', hairC: '#3a2433', top: '#6b3f8a', topType: 'robe', robe: true, scarf: null, magic: '255,90,90', expr: 'smile' },
  valeria: { skin: S.b, hair: 'braid', hairC: '#6b3a22', scarf: '#d4423a', top: '#eadbbd', topType: 'shirt', apron: null, legs: '#6f5a8a', robe: true, expr: 'smile', scale: .95 },
  reed: { skin: S.b, hair: 'side', hairC: '#6b4329', top: '#4f86d6', topType: 'jumper', legs: '#5b5a63', expr: 'happy', armL: 1.08 },
  reedOld: { skin: S.b, hair: 'side', hairC: '#6b4329', temples: '#d8d8d8', top: '#2f5fae', topType: 'suit', badge: '4', legs: '#2f5fae', shoes: '#1d2b44', expr: 'smile', armL: 1.08 },
  reedSuit: { skin: S.b, hair: 'side', hairC: '#6b4329', top: '#2f5fae', topType: 'suit', badge: '4', legs: '#2f5fae', shoes: '#1d2b44', expr: 'happy', armL: 1.08 },
  rock: { skin: '#e08a3a', hair: 'none', top: '#e08a3a', topType: 'shirt', collar: '#e08a3a', rock: true, legs: '#2f5fae', shoes: '#c97a32', bodyW: 1.35, headS: 1.05, armW: 1.4, expr: 'smug', noEars: true },
  sue: { skin: S.b, hair: 'bob', hairC: '#f0c75a', top: '#2f5fae', topType: 'suit', badge: '4', legs: '#2f5fae', shoes: '#1d2b44', expr: 'smile' },
  torch: { skin: S.b, hair: 'spiky', hairC: '#f2a22c', top: '#2f5fae', topType: 'suit', badge: '4', legs: '#2f5fae', shoes: '#1d2b44', expr: 'happy', glowAura: 'rgba(255,140,40,A)' },
  surfer: { skin: '#dfe6ee', hair: 'none', top: '#cfd8e2', topType: 'shirt', collar: '#cfd8e2', legs: '#c3ccd6', shoes: '#c3ccd6', expr: 'neutral', eyeC: '#3a4a6a', noEars: true },
  beyonder: { skin: '#fff3d6', hair: 'stars', top: '#fff8e8', topType: 'suit', badge: '', suitTrim: 'rgba(0,0,0,0)', legs: '#fff3d6', shoes: '#fff3d6', glowAura: 'rgba(255,240,200,A)', expr: 'smile', eyeC: '#d8a64a' },
  mephisto: { skin: '#c8323a', hair: 'none', horns: '#3a1418', top: '#8a1b22', topType: 'shirt', collar: '#2a0a0e', tie: '#ffd23d', legs: '#5a1016', shoes: '#2a0a0e', eyeC: '#ffd23d', expr: 'happy', noEars: true, goatee: '#3a1418' },
  strange: { skin: S.a, hair: 'slick', hairC: '#2b2230', temples: '#e0e0e0', goatee: '#2b2230', top: '#2f4a8a', topType: 'robe', robe: true, cloak: '#b0282e', belt: '#c99a2e', buckle: '#ffd23d', expr: 'neutral', magic: '255,180,80' },
  baron: { skin: S.c, hair: 'side', hairC: '#3a2a1a', moustache: '#3a2a1a', curly: true, top: '#2a3a6a', topType: 'shirt', collar: '#d9c27a', medals: 8, belt: '#1a1a1a', buckle: '#e6c25a', legs: '#1f2a4a', bodyW: 1.4, headS: 1.02, expr: 'angry', hat: 'cap', hatC: '#2a3a6a', scale: .92 },
  soldier: { skin: S.c, hair: 'none', top: '#7a2a3a', topType: 'tunic', belt: '#3a2a1a', legs: '#2a2a32', hat: 'helmet', hatC: '#9aa3ab', expr: 'angry' },
  soldier2: { skin: S.d, hair: 'none', top: '#7a2a3a', topType: 'tunic', belt: '#3a2a1a', legs: '#2a2a32', hat: 'helmet', hatC: '#9aa3ab', expr: 'smug' },
  zorba: { skin: S.a, hair: 'side', hairC: '#1a1a1a', moustache: '#1a1a1a', curly: true, top: '#efe8d8', topType: 'shirt', collar: '#c99a2e', belt: '#8a1b22', buckle: '#e6c25a', legs: '#2a2a32', hat: 'crown', expr: 'smug' },
  kristoff: { kid: true, skin: S.b, hair: 'curly', hairC: '#6b4329', top: '#4a7ab0', topType: 'jumper', legs: '#3a3a46', expr: 'sad', scale: .8 },
  purple: { skin: '#9a6fd0', hair: 'slick', hairC: '#3a2060', top: '#5a2f8a', topType: 'shirt', collar: '#c9a8f0', tie: '#2a1040', legs: '#3a2060', expr: 'smug' },
  monk: { skin: S.d, hair: 'bald', hairC: S.d, top: '#e2852f', topType: 'robe', robe: true, expr: 'smile', scale: .95 },
  monk2: { skin: S.c, hair: 'bald', hairC: S.c, top: '#d0742a', topType: 'robe', robe: true, expr: 'shock', scale: .9 },
  keeper: { skin: S.d, hair: 'bald', hairC: '#3a2a1a', top: '#1f3a2a', topType: 'suit', badge: '', suitTrim: '#6fc08a', legs: '#1f3a2a', expr: 'neutral', glasses: '#222' },
  valeriaR: { skin: S.b, hair: 'braid', hairC: '#f0c75a', top: '#f4f4f4', topType: 'coat', collar: '#2f5fae', legs: '#2f5fae', expr: 'determined', scale: .88 },
  vill1: { skin: S.a, hair: 'side', hairC: '#5a3a2a', top: '#7a5a8a', topType: 'shirt', legs: '#4a3a2a', expr: 'worried' },
  vill2: { skin: S.d, hair: 'bob', hairC: '#2a1a1a', top: '#c25a3a', topType: 'robe', robe: true, scarf: '#3a6ab0', expr: 'smile' },
  vill3: { skin: S.c, hair: 'bald', hairC: '#bbbbbb', beard: '#dddddd', top: '#7a6a4a', topType: 'shirt', legs: '#4a3a2a', expr: 'worried' },
  vill4: { kid: true, skin: S.b, hair: 'curly', hairC: '#3a2a1a', top: '#3a8ab0', topType: 'jumper', legs: '#3a3a46', expr: 'shock', scale: .78 },
  leader1: { skin: S.c, hair: 'side', hairC: '#9a9a9a', top: '#2a2a3a', topType: 'shirt', tie: '#c23a3a', legs: '#2a2a3a', expr: 'smile' },
  leader2: { skin: S.d, hair: 'bob', hairC: '#1a1a1a', top: '#5a2a4a', topType: 'shirt', tie: null, legs: '#2a2a3a', expr: 'smile' },
  leader3: { skin: S.b, hair: 'bald', hairC: '#c8a878', moustache: '#c8a878', top: '#3a4a2a', topType: 'shirt', tie: '#e6c25a', legs: '#2a2a3a', medals: 4, expr: 'smile' },
  // gag show people
  host: { skin: S.b, hair: 'slick', hairC: '#c89a4a', top: '#e23a8a', topType: 'shirt', tie: '#ffd23d', legs: '#2a2a3a', expr: 'happy' },
  anchor: { skin: S.c, hair: 'bob', hairC: '#3a2433', top: '#2a3a6a', topType: 'shirt', legs: '#2a2a3a', expr: 'smile', glasses: '#333' },
  therapist: { skin: S.d, hair: 'curly', hairC: '#ccc', top: '#8a7a5a', topType: 'jumper', collar: '#efe', legs: '#4a4a4a', glasses: '#4a3a2a', expr: 'neutral' },
  caller: { skin: S.a, hair: 'side', hairC: '#c89a4a', top: '#4a9a6a', topType: 'jumper', legs: '#3a3a46', expr: 'worried' },
  teacherNum: { skin: '#ffd23d', hair: 'none', top: '#ffd23d', topType: 'shirt', collar: '#ffd23d', legs: '#ffd23d', expr: 'worried', noEars: true },
  attendant: Object.assign({}, DOOM, { hood: null, cloak: null, top: '#2a5aa0', topType: 'shirt', tie: '#ffd23d', hat: 'cap', hatC: '#2a5aa0' }),
  planetEater: { skin: '#7a3aa0', hair: 'none', top: '#6a2a8a', topType: 'tunic', legs: '#4a1a6a', hat: 'tall', hatC: '#8a3ab0', expr: 'sad', noEars: true }
};
})();
