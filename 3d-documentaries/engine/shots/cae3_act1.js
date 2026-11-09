// The Ides of March · Act 1 · TOO POWERFUL — realistic look
import * as C from './cae3_common.js';
import * as ui from '../lib/ui.js';
const { THREE, rome, P, REG } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;
const PL = rome.PLACES;

export const shots = {
  // 1.1 the golden chair dissolves to a young Caesar in a plain toga (Forum, morning)
  '1.1': async k => {
    await rome.forum(k, { sun: [-25, 14, 20], sunI: 3.8 });
    const cz = await C.person(k, 'cae_caesar_y', { pos: [0, 0, 4], rot: .2 });
    const crowd = []; for (let i = 0; i < 6; i++) crowd.push(await C.person(k, C.CIT[i], { pos: [-7 + i * 2.6, 0, -6 - (i % 2) * 2.5], rot: (i % 2 ? .5 : -.5), seed: 60 + i }));
    rome.key(k.scene, [-3, 4, 9], [0, 1.5, 4], { i: 160 });
    const cam = C.dolly(k.camera, { pos: [1.2, 1.7, 9.5], look: [0, 1.5, 4], fov: 34 }, { pos: [.8, 1.65, 7.4], look: [0, 1.55, 4], fov: 32 });
    return (t, u) => { cam(u); cz.update(t, { mood: 'calm', look: Math.sin(t * .5) * .15 }); crowd.forEach((p, i) => p.update(t)); const x = k.overlay; const a = 1 - seg(t, 0, 1.2); if (a > 0) { x.fillStyle = `rgba(255,236,200,${a * .85})`; x.fillRect(0, 0, 1920, 1080); } };
  },
  // 1.2 Caesar climbs a staircase of offices, CONSUL at the top; crane up
  '1.2': async k => {
    const { scene } = k; const M = await rome.mats();
    await C.real.env(k, 'kloofendal_48d_partly_cloudy_puresky', { sun: [-20, 30, 25], sunI: 4.2, sunColor: 0xffe2b8, shadowSize: 20, envI: .5, fog: [0xd8cbb4, 30, 160] });
    scene.userData.fx = { ao: 1.2, aoRadius: .6, bloom: .3 };
    scene.add(C.real.m(new THREE.PlaneGeometry(200, 200), M.cobble, { rot: [-P / 2, 0, 0], cast: false }));
    const titles = ['QUAESTOR', 'AEDILE', 'PONTIFEX MAXIMUS', 'PRAETOR', 'CONSUL'];
    const stepH = .9, stepD = 2.4;
    titles.forEach((tt, i) => {
      scene.add(C.real.box(9, stepH * (i + 1), stepD, M.marble, { pos: [0, stepH * (i + 1) / 2, -i * stepD] }));
      const ins = rome.inscription(tt, 6, .7, { bg: '#e8e0d2', px: 120 }); ins.position.set(0, stepH * (i + .5), -i * stepD + stepD / 2 + .005); scene.add(ins);
    });
    scene.add(C.rome.temple(M, { pos: [0, stepH * 5, -5 * stepD - 2], cols: 6, h: 9, podium: .1 }));
    const cz = await C.person(k, 'cae_caesar_y', { pos: [0, 0, 3], rot: P });
    const cam = C.dolly(k.camera, { pos: [3.5, 1.2, 9], look: [0, 1.5, 0], fov: 44 }, { pos: [3.8, 7.5, 2], look: [0, 4.6, -10], fov: 44 });
    return (t, u) => {
      cam(u); const D = k.meta.seconds; const p = ease(seg(t, .3, D - .4)); const zf = lerp(3, -4 * stepD + 1, p);
      // y: climbs each step as he crosses its front edge (short hop with knees bent)
      // lift starts just before each front edge and is finished just after it, so the feet never sink into a step
      let y = 0; for (let i = 0; i < 5; i++) { const e = stepD / 2 - i * stepD; y += stepH * Math.min(1, Math.max(0, (e - zf + .5) / .6)); }
      cz.position.set(0, y, zf); cz.update(t, { pose: 'walk', dist: (3 - zf) * .9, mood: 'calm' });
    };
  },
  // 1.3 MAP: Gaul floods Roman red, modern names in small labels; tally GAUL CONQUERED
  '1.3': async k => C.mapShot(k, { center: [6, 46], span: [26, 14], size: 3.4, cam: [{ pos: [0, 3.2, 1.5], look: [-.3, .9, -.2], fov: 40 }, { pos: [-.3, 2.4, .9], look: [-.4, .9, -.25], fov: 38 }] }, (m, t) => {
    const a = ease(seg(t, .6, 4.5)); m.region(REG.gaul, '#8a1a12', a);
    m.label('GALLIA', 1.8, 47.2, 150, seg(t, .4, 1.2), { italic: true }); m.label('ITALIA', 12.5, 42.6, 90, 1, { italic: true });
    const mod = [['FRANCE', 2.2, 46.0], ['BELGIUM', 4.6, 50.7], ['SWITZERLAND', 8.2, 46.8], ['GERMANY', 9.6, 49.7], ['NETHERLANDS', 5.6, 52.3]];
    mod.forEach(([n, lo, la], i) => m.label('today: ' + n, lo, la, 44, seg(t, 4.2 + i * .5, 4.8 + i * .5), { weight: 500, color: '#5a2a1a' }));
    m.dot(PL.ROME[0], PL.ROME[1]); m.label('ROMA', 12.5, 41.3, 56);
  }),
  // 1.4 rows of legionaries turn and salute Caesar, not the Senate's standard; lateral dolly down the ranks
  '1.4': async k => {
    await rome.field(k, { sun: [-35, 18, 10], ground: 'gravel_floor_02' });
    await rome.mats();
    const ranks = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const p = await C.person(k, C.LEG[(r + c) % 3], { pos: [-8 + c * 1.6, 0, -r * 1.7], rot: 0, seed: 80 + r * 9 + c }); rome.legionary(p, { crest: r === 0 && c === 4 }); ranks.push(p); }
    const st = rome.aquila(); st.position.set(-9.5, 0, .6); k.scene.add(st);
    const cz = await C.person(k, 'cae_caesar_y', { pos: [0, 0, 6.5], rot: P, laurel: false });
    rome.legionary(cz, { shield: false, crest: true });
    const cam = C.dolly(k.camera, { pos: [-9, 1.6, 3.6], look: [-7, 1.5, 0], fov: 42 }, { pos: [2.6, 1.7, 3.8], look: [3.6, 1.5, 0], fov: 42 });
    return (t, u) => { cam(u); ranks.forEach((p, i) => { const sal = t > 1.2 + (i % 9) * .25; p.rotation.y = lerp(0, .25, seg(t, .9 + (i % 9) * .25, 1.4 + (i % 9) * .25)); p.update(t, { arm: sal ? 'raise' : null, mood: 'stern' }); }); cz.update(t, { mood: 'calm' }); };
  },
  // 1.5 coins pour into a chest; the crowd in the Forum cheers
  '1.5': async k => {
    await rome.forum(k, { sun: [-25, 22, 18] });
    const ch = await C.real.prop('treasure_chest'); ch.position.set(0, 0, 6); ch.scale.setScalar(1.2); k.scene.add(ch);
    const lid = ch.getObjectByName('treasure_chest_lid'); if (lid) lid.rotation.x = -1.95; const lk = ch.getObjectByName('treasure_chest_lock'); if (lk) lk.visible = false; // lid open so the coins fall inside
    const cs = rome.coinStream(k.scene, [0, 2.4, 5.9], [0, .45, 6], 220);
    const crowd = []; for (let i = 0; i < 16; i++) crowd.push(await C.person(k, C.CIT[i % 8], { pos: [-7 + (i % 8) * 2, 0, -2 - Math.floor(i / 8) * 2.4 + (i % 3) * .4], rot: (i % 2 ? .2 : -.2), seed: 100 + i }));
    const cam = C.dolly(k.camera, { pos: [.8, 1.3, 8.6], look: [0, .7, 6], fov: 38 }, { pos: [.4, 1.7, 3.8], look: [0, 1.6, -3], fov: 44 });
    const D5 = k.meta.seconds;
    return (t, u) => { cam(u); const fo = seg(t, D5 - .35, D5); if (fo > 0) { k.overlay.fillStyle = `rgba(0,0,0,${fo * .85})`; k.overlay.fillRect(0, 0, 1920, 1080); } cs.userData.tick(t); crowd.forEach((p, i) => p.update(t, { arm: Math.sin(t * 3 + i) > .2 ? (i % 3 ? 'raise' : 'raiseBoth') : null, mood: 'happy', talk: true })); };
  },
  // 1.6 the cheering crowd seen from above; a stern senator watches; push on his frown
  '1.6': async k => {
    await rome.forum(k, { sun: [-25, 20, 18] });
    const M = await rome.mats();
    k.scene.add(C.real.box(8, 4, 4, M.ochre, { pos: [-14, 2, 10] })); // building the senator stands on
    const sn = await C.person(k, 'cae_sen5', { pos: [-12.6, 4, 9.4], rot: P * .78 });
    const crowd = []; for (let i = 0; i < 18; i++) crowd.push(await C.person(k, C.CIT[i % 8], { pos: [-4 + (i % 6) * 1.8, 0, -1 - Math.floor(i / 6) * 2], rot: (i % 2 ? .3 : -.3) - .4, seed: 140 + i }));
    rome.key(k.scene, [-9, 8, 13], [-12.6, 5.5, 9.4], { i: 160 });
    const cam = C.dolly(k.camera, { pos: [-11.5, 7.5, 13.5], look: [-4, 0, -2], fov: 46 }, { pos: [-11.6, 5.7, 7.4], look: [-12.6, 5.55, 9.4], fov: 30 });
    return (t, u) => { cam(u); const fi = 1 - seg(t, 0, .45); if (fi > 0) { k.overlay.fillStyle = `rgba(0,0,0,${fi * .85})`; k.overlay.fillRect(0, 0, 1920, 1080); } sn.update(t, { mood: 'stern', look: .1 }); crowd.forEach((p, i) => p.update(t, { arm: Math.sin(t * 3 + i) > .3 ? 'raise' : null, mood: 'happy' })); };
  },
  // 1.7 MAP 49 BC: a sealed order flies from Rome to Caesar in Gaul; Pompey callout
  '1.7': async k => {
    k.calloutPos = [1460, 360];
    const M = await rome.mats();
    let sc = null;
    const f = await C.mapShot(k, { center: [9, 45], span: [20, 11], size: 3.4 }, (m, t, u, mt) => {
      m.region(REG.gaul, '#8a1a12', .8); m.label('GALLIA', 2.5, 47.4, 110, 1, { italic: true }); m.dot(PL.ROME[0], PL.ROME[1]); m.label('ROMA', 12.5, 41.3, 60);
      m.route([PL.ROME, [9.5, 44.0], [5.0, 46.8]], ease(seg(t, .6, k.meta.seconds - 1.5)), '#2a1a10', 7, true);
      if (!sc) { sc = rome.scroll({ seal: true, w: .16 }); mt.map.group.add(sc); }
      const e = ease(seg(t, .6, k.meta.seconds - 1.5)); const a = mt.map.to3(...PL.ROME, .06), b = mt.map.to3(5.0, 46.8, .06); sc.position.lerpVectors(a, b, e); sc.position.y = .06 + Math.sin(e * P) * .25; sc.rotation.y = -.6;
    });
    return f;
  },
  // 1.8 courtroom: empty defendant's bench, prosecutors waiting
  '1.8': async k => {
    const cu = await rome.curia(k, { statue: false, shaftI: .09 });
    const M = cu.M; k.scene.add(C.real.box(2.6, .45, .6, M.wood, { pos: [0, .225, -2] })); k.scene.add(C.real.box(2.6, .5, .08, M.wood, { pos: [0, .7, -2.3] }));
    const pros = []; for (const [i, x] of [[0, -2.6], [1, -1.6], [2, 2.0]]) { const p = await C.person(k, ['cae_sen3', 'cae_sen8', 'cae_cassius'][i], { pos: [x, 0, -4.6 + i * .3], rot: -.1 + i * .1, seed: 160 + i }); C.attach(p, rome.scroll({ w: .22 }), 'RightHand', [0, -.08, .04], [0, 0, P / 2]); pros.push(p); }
    const mag = await C.person(k, 'cae_sen9', { pos: [0, .45, -10.6], pose: 'sit', seatH: .5 });
    rome.key(k.scene, [3, 6, 2], [0, .6, -2], { i: 160 });
    const cam = C.dolly(k.camera, { pos: [0, 1.6, 5], look: [0, .8, -2], fov: 40 }, { pos: [0, 1.25, 1.6], look: [0, .6, -2], fov: 36 });
    return (t, u) => { cam(u); pros.forEach((p, i) => p.update(t, { arm: 'hold', mood: 'stern', look: Math.sin(t * .5 + i) * .2 })); mag.update(t, { pose: 'sit', seatH: .5, mood: 'stern' }); };
  },
  // 1.9 MAP northern Italy: the Rubicon; a legion token steps across
  '1.9': async k => {
    const M = await rome.mats(); let tok = null;
    return C.mapShot(k, { center: [12, 44.2], span: [8, 4.4], size: 3.4, cam: [{ pos: [0, 2.8, 1.3], look: [0, .9, -.1], fov: 40 }, { pos: [.1, 1.9, .55], look: [.05, .9, -.1], fov: 38 }] }, (m, t, u, mt) => {
      m.label('ITALIA', 13.2, 43.2, 110, 1, { italic: true }); m.label('GALLIA CISALPINA', 10.5, 45.2, 80, 1, { italic: true });
      m.route([[11.9, 43.86], [12.15, 43.98], [12.4, 44.08], [12.45, 44.15]], 1, '#3a6a8a', 12);
      m.label('RUBICON', 11.75, 44.25, 64, 1, { color: '#2a4a6a' });
      m.dot(12.2, 44.42, 14); m.label('Ravenna', 12.2, 44.55, 44, 1, { weight: 500 }); m.dot(12.57, 44.06, 14); m.label('Ariminum', 12.9, 43.95, 44, 1, { weight: 500 });
      if (!tok) { tok = rome.legionToken(M, { s: .45 }); tok.traverse(o => o.castShadow = false); mt.map.group.add(tok); }
      const e = ease(seg(t, 1.5, k.meta.seconds - 1)); const a = mt.map.to3(12.1, 44.32, 0), b = mt.map.to3(12.5, 43.95, 0); tok.position.lerpVectors(a, b, e); tok.position.y = Math.abs(Math.sin(e * P * 6)) * .015;
    });
  },
  // 1.10 the legion wades across the shallow river in the mist; Caesar steps into the water first; low angle from the water
  '1.10': async k => {
    await rome.field(k, { sun: [-25, 8, -30], sunI: 3.2, sunColor: 0xffc890, fog: 0xb8b4a8, fogNear: 6, fogFar: 70, ground: 'coast_sand_rocks_02' });
    await rome.mats(); const w = await rome.river(k, { w: 14, l: 200, pos: [0, .3, 0], rot: P / 2 });
    const cz = await C.person(k, 'cae_caesar_y', { pos: [-6, 0, 0], rot: P / 2 }); rome.legionary(cz, { shield: false, crest: true });
    const sol = []; for (let i = 0; i < 12; i++) { const o = [-9 - Math.floor(i / 4) * 1.8, (i % 4 - 1.5) * 1.3]; const p = await C.person(k, C.LEG[i % 3], { pos: [o[0], 0, o[1]], rot: P / 2, seed: 200 + i }); rome.legionary(p, {}); p.userData.o = o; sol.push(p); }
    const aq = rome.aquila(); k.scene.add(aq);
    const cam = C.dolly(k.camera, { pos: [3, .45, 4.5], look: [-4, 1.2, 0], fov: 40 }, { pos: [2.5, .5, 3.6], look: [-1, 1.4, 0], fov: 38 });
    return (t, u) => { cam(u); w.userData.flow(t); const d = t * .9; cz.position.set(-6 + d, 0, 0); cz.update(t, { pose: 'walk', dist: d, mood: 'stern' });
      sol.forEach((p, i) => { const [x0, z0] = p.userData.o; p.position.set(x0 + d, 0, z0); p.rotation.y = P / 2; p.update(t, { pose: 'walk', dist: d + i * .3, mood: 'stern' }); });
      aq.position.set(-8.2 + d, 0, 1.0); };
  },
  // 1.11 MAP civil war: Pharsalus 48 BC, Pompey's ship to Egypt, a dark X
  '1.11': async k => {
    let ship = null;
    return C.mapShot(k, { center: [24, 37], span: [26, 14], size: 3.4 }, (m, t, u, mt) => {
      m.label('GRAECIA', 21.6, 38.0, 80, 1, { italic: true }); m.label('AEGYPTUS', 29.8, 28.8, 80, 1, { italic: true });
      const s = k.meta.seconds;
      m.dot(...PL.PHARSALUS, 18, '#7a1a12', seg(t, .5, 1)); m.label('PHARSALUS', 22.4, 39.9, 54, seg(t, .5, 1));
      if (t > .8) { const fl = .5 + .5 * Math.sin(t * 10); m.cross(...PL.PHARSALUS, 30, fl * seg(t, .8, 1.2), '#8a1a12'); }
      m.route([PL.PHARSALUS, [23.5, 37.4], [26.5, 34.5], [29.9, 31.6], [32.3, 31.2]], ease(seg(t, s * .3, s * .75)), '#2a1a10', 7, true);
      if (!ship) { ship = rome.shipToken({ s: 1.2 }); mt.map.group.add(ship); }
      const e = ease(seg(t, s * .3, s * .75)); const pts = [PL.PHARSALUS, [23.5, 37.4], [26.5, 34.5], [29.9, 31.6], [32.3, 31.2]];
      const f = e * (pts.length - 1), i0 = Math.min(pts.length - 2, Math.floor(f)), fr = f - i0; const a = mt.map.to3(...pts[i0], .02), b = mt.map.to3(...pts[i0 + 1], .02); ship.position.lerpVectors(a, b, fr); ship.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      m.cross(32.3, 31.2, 40, seg(t, s * .8, s * .9)); m.label('Pompey killed', 32.3, 32.4, 50, seg(t, s * .8, s * .9), { color: '#7a1a12' });
    });
  },
  // 1.12 MAP: Munda in Spain flashes; the whole Republic turns Caesar red; crane back
  '1.12': async k => C.mapShot(k, { center: [12, 39], span: [56, 30], size: 3.6, cam: [{ pos: [-1.0, 1.9, .4], look: [-1.3, .9, -.1], fov: 40 }, { pos: [0, 3.6, 1.8], look: [0, .9, -.2], fov: 42 }] }, (m, t) => {
    m.dot(...PL.MUNDA, 22, '#7a1a12'); m.label('MUNDA · 45 BC', -4.9, 38.6, 70, 1);
    const fl = seg(t, .3, .6) * (1 - seg(t, 1.5, 2)); if (fl > 0) m.cross(...PL.MUNDA, 46, fl, '#8a1a12');
    const keys = ['hispania', 'gaul', 'italy', 'illyria', 'greece', 'asia', 'syria', 'egypt', 'africa'];
    keys.forEach((r, i) => m.region(REG[r], '#8a1a12', ease(seg(t, 1.6 + i * .35, 2.6 + i * .35)), false));
    m.dot(...PL.ROME); m.label('ROMA', 12.5, 41.0, 64);
  }),
  // 1.13 senators raise their hands; a scroll unrolls: DICTATOR PERPETUO
  '1.13': async k => {
    const cu = await rome.curia(k, { shaftI: .1 });
    const ppl = await C.fillBenches(k, cu, { zMin: -4, zMax: 6 });
    const sc = rome.openScroll(['DICTATOR', 'PERPETUO'], { font: 'bold 110px "Liberation Serif"' }); sc.position.set(0, 1.9, 2); sc.rotation.y = 0; k.scene.add(sc);
    rome.key(k.scene, [0, 4, 6], [0, 1.9, 2], { i: 120, angle: .4 });
    const cam = C.dolly(k.camera, { pos: [0, 2.6, 9.5], look: [0, 1.9, 0], fov: 46 }, { pos: [0, 2.3, 5.6], look: [0, 1.7, 1], fov: 50 });
    return (t, u) => { cam(u); const o = ease(seg(t, .4, 2.2)); sc.scale.set(Math.max(.02, o), 1, 1);
      ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .5, arm: t > .6 + (i % 7) * .15 ? 'raise' : 'lap', mood: 'calm', look: Math.sin(i) * .2 })); };
  },
};
