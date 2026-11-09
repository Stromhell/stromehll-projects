// The Ides of March · Act 4 · SETTING THE TRAP — realistic look
import * as C from './cae3_common.js';
const { THREE, rome, P, real } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;
// courtyard: Curia steps rise from z=-16 (y 0) to z=-19.6 (y 1.6); doors at z=-24.85
const stairY = z => z > -16 ? 0 : Math.min(1.6, Math.ceil((-16 - z) / .45) * .2);

function balance(M) {
  const g = new THREE.Group(); const br = M.bronze;
  g.add(real.m(new THREE.CylinderGeometry(.12, .16, .04, 24), br, { pos: [0, .02, 0] }));
  g.add(real.m(new THREE.CylinderGeometry(.015, .02, .7, 12), br, { pos: [0, .37, 0] }));
  const beam = new THREE.Group(); beam.position.y = .72; g.add(beam); beam.add(real.box(1.0, .025, .025, br));
  const pans = [-.48, .48].map(x => { const p = new THREE.Group(); p.position.set(x, 0, 0); beam.add(p);
    for (const a of [0, 2.1, 4.2]) p.add(real.m(new THREE.CylinderGeometry(.002, .002, .34, 4), br, { pos: [Math.sin(a) * .07, -.17, Math.cos(a) * .07], rot: [Math.cos(a) * .2, 0, -Math.sin(a) * .2] }));
    const pan = real.m(new THREE.SphereGeometry(.14, 24, 8, 0, P * 2, P * .7, P * .3), br, { pos: [0, -.22, 0] }); pan.material = br.clone(); pan.material.side = THREE.DoubleSide; p.add(pan); return p; });
  g.userData.beam = beam; g.userData.pans = pans; return g;
}
function figurine(color) { const g = new THREE.Group(); const m = real.std(color, { rough: .6 }); g.add(real.m(new THREE.CylinderGeometry(.022, .03, .1, 12), m, { pos: [0, .05, 0] })); g.add(real.m(new THREE.SphereGeometry(.02, 12, 8), m, { pos: [0, .118, 0] })); return g; }

export const shots = {
  // 4.1 morning at the Curia: servants carry wooden boxes up the steps; crane down to the doorway
  '4.1': async k => {
    const cy = await rome.courtyard(k, { trees: false, sun: [-25, 10, 30], sunI: 3.6 });
    const sv = []; for (let i = 0; i < 4; i++) { const p = await C.person(k, C.CIT[i], { pos: [-1.6 + i * 1.1, 0, -11 + (i % 2) * 1.2], rot: P, seed: 900 + i }); const b = rome.tabletBox(cy.M); b.scale.setScalar(.8); C.attach(p, b, 'RightHand', [0, -.02, .12], [0, 0, P / 2]); sv.push(p); }
    const cam = C.dolly(k.camera, { pos: [3, 8, -6], look: [0, 1, -16], fov: 44 }, { pos: [2.4, 2.4, -9], look: [0, 1.8, -20], fov: 42 });
    return (t, u) => { cam(u); cy.doors.set(1); sv.forEach((p, i) => { const z = -11 + (i % 2) * 1.2 - t * .75; p.position.z = z; p.position.y = stairY(z); p.update(t, { pose: 'walk', dist: t * .75 + i, arm: 'hold', mood: 'neutral' }); }); };
  },
  // 4.2 a box lid opens a crack, a glint inside, then closes; close push
  '4.2': async k => {
    const d = await rome.domus(k, { room: 'none', night: true }); k.exposure = .9;
    const b = rome.tabletBox(d.M); b.position.set(0, 0, 0); k.scene.add(b);
    const dg = rome.daggerShape(); dg.rotation.set(-P / 2, 0, .3); dg.position.set(0, .2, 0); dg.traverse(c => { if (c.isMesh) { c.material = real.std(0x8a8a90, { metal: 1, rough: .2 }); } }); k.scene.add(dg);
    rome.oilLamp(k.scene, [.5, .02, .35], { i: 1, shadow: true });
    const gl = new THREE.PointLight(0xfff0d0, 0, 1.2); gl.position.set(0, .27, .1); k.scene.add(gl);
    rome.key(k.scene, [.4, 1.6, 1.4], [0, .2, 0], { i: 16, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [.2, .8, 1.5], look: [0, .22, 0], fov: 36 }, { pos: [.1, .55, .85], look: [0, .25, 0], fov: 32 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); const o = seg(t, D * .2, D * .4) * (1 - seg(t, D * .72, D * .88)); b.userData.lid.rotation.x = -.18 * ease(o); gl.intensity = o * (.6 + Math.sin(t * 9) * .4); };
  },
  // 4.3 a senator adjusts his toga; a dark shape slides beneath the fold
  '4.3': async k => {
    await rome.courtyard(k, { trees: false, sun: [-25, 12, 30] });
    const sn = await C.person(k, 'cae_casca', { pos: [0, 0, -12], rot: .2 });
    const dg = rome.daggerShape(); const h = C.attach(sn, dg, 'RightHand', [0, -.08, .03], [0, 0, P]);
    rome.key(k.scene, [2, 3, -8], [0, 1.4, -12], { i: 120 });
    const cam = C.dolly(k.camera, { pos: [.6, 1.5, -9.4], look: [0, 1.25, -12], fov: 34 }, { pos: [.35, 1.4, -10.6], look: [0, 1.2, -12], fov: 30 });
    const D = k.meta.seconds;
    // holds the dagger low, glances round, then slides it inside the toga at the chest (hidden once the hand is under the fold)
    return (t, u) => { cam(u); const tuck = t > D * .5; dg.visible = t < D * .62; sn.update(t, { arm: tuck ? 'tuck' : 'hold', mood: 'stern', look: tuck ? 0 : Math.sin(t * 1.2) * .4 }); };
  },
  // 4.4 top-down: gladiators spread to the courtyard exits
  '4.4': async k => {
    await rome.courtyard(k, { trees: false });
    const g = []; const tg = [[-12, -6], [12, -6], [-12, 8], [12, 8], [-5, 14], [5, 14], [-8, -14], [8, -14]];
    for (let i = 0; i < 8; i++) { const p = await C.person(k, C.GLAD[i % 4], { pos: [(i - 3.5) * .7, 0, 2], seed: 950 + i }); p.add(rome.helmet()); p.userData.tg = tg[i]; g.push(p); }
    const cam = C.dolly(k.camera, { pos: [0, 16, 9], look: [0, 0, 0], fov: 62 }, { pos: [0, 14, 7], look: [0, 0, 0], fov: 62 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); g.forEach((p, i) => { const [tx, tz] = p.userData.tg; const x0 = (i - 3.5) * .7, e = ease(seg(t, .4, D - 1)); const x = lerp(x0, tx, e), z = lerp(2, tz, e); p.rotation.y = Math.atan2(tx - x0, tz - 2); p.position.set(x, 0, z); p.update(t, { pose: e < .98 ? 'run' : 'idle', dist: e * 14, mood: 'stern' }); }); };
  },
  // 4.5 Decimus Brutus with Caesar's will; push in on the scroll
  '4.5': async k => {
    k.calloutPos = [1380, 320];
    const d = await rome.domus(k, { room: 'study' }); k.exposure = .75;
    const dc = await C.person(k, 'cae_decimus', { pos: [0, 0, 1.4], rot: 0 });
    const sc = rome.openScroll(['TESTAMENTUM', 'C. IULIUS CAESAR'], { font: 'bold 70px "Liberation Serif"' }); sc.scale.setScalar(.4); const hs = C.holdBoth(k, dc, sc, { fwd: .07, up: .03, tilt: -.35 });
    rome.key(k.scene, [1.4, 2.8, 3.6], [0, 1.4, 1.4], { i: 60 });
    const cam = C.dolly(k.camera, { pos: [.4, 1.6, 4.6], look: [0, 1.45, 1.4], fov: 38 }, { pos: [.25, 1.5, 3.1], look: [0, 1.35, 1.5], fov: 34 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); dc.update(t, { arm: 'hold', mood: 'calm', look: -.2 }); hs(); };
  },
  // 4.6 Caesar and Decimus laughing together; slow orbit
  '4.6': async k => {
    await rome.courtyard(k, { trees: true, sun: [-25, 18, 30] });
    const cz = await C.person(k, 'cae_caesar', { pos: [-.45, 0, -8], rot: P / 2 - .3, laurel: true });
    const dc = await C.person(k, 'cae_decimus', { pos: [.45, 0, -8], rot: -P / 2 + .3 });
    rome.key(k.scene, [3, 4, -3], [0, 1.6, -8], { i: 120 });
    const orb = C.orbit(k.camera, [0, 1.6, -8], 3.4, 1.7, -.5, .4, 34, [0, 1.6, -8]);
    return (t, u) => { orb(u); cz.update(t, { mood: 'happy', talk: Math.floor(t / 1.6) % 2 === 0, look: .1 }); dc.update(t, { mood: 'happy', talk: Math.floor(t / 1.6) % 2 === 1, look: -.1 }); };
  },
  // 4.7 Trebonius steers Antony away from the door; tracking
  '4.7': async k => {
    k.calloutPos = [1420, 330];
    const cy = await rome.courtyard(k, { trees: true, sun: [-25, 16, 30] });
    const an = await C.person(k, 'cae_antony', { pos: [-.4, 0, -12], rot: P / 2 });
    const tr = await C.person(k, 'cae_trebonius', { pos: [.4, 0, -12], rot: P / 2 });
    const cam = C.dolly(k.camera, { pos: [-2.5, 1.7, -7.4], look: [.2, 1.5, -11.6], fov: 38 }, { pos: [5.2, 1.7, -7.6], look: [5.0, 1.5, -11.6], fov: 38 });
    return (t, u) => { cam(u); const x = t * .8; an.position.set(-.4 + x, 0, -12); tr.position.set(.1 + x, 0, -11.1); an.rotation.y = P / 2 + .15; tr.rotation.y = P / 2 - .15;
      an.update(t, { pose: 'walk', dist: x, mood: 'happy', look: .4 }); tr.update(t, { pose: 'walk', dist: x + .3, mood: 'happy', talk: true, look: -.5 }); };
  },
  // 4.8 Antony's broad shoulders in frame as the Curia doors close
  '4.8': async k => {
    const cy = await rome.courtyard(k, { trees: true, sun: [-25, 16, 30] });
    const an = await C.person(k, 'cae_antony', { pos: [.6, 0, -13.5], rot: P + .1 });
    const cam = C.dolly(k.camera, { pos: [.95, 2.0, -11.6], look: [0, 2.2, -24.8], fov: 40 }, { pos: [.85, 1.95, -12.4], look: [0, 2.6, -24.8], fov: 34 });
    return (t, u) => { cam(u); cy.doors.set(1 - ease(seg(t, 1.2, 4.5))); an.update(t, { mood: 'neutral', look: Math.sin(t * .3) * .1 }); };
  },
  // 4.9 a balance: one figure vs two; the single one stays on the scale
  '4.9': async k => {
    const d = await rome.domus(k, { room: 'none', night: true }); k.exposure = .9;
    k.scene.add(real.box(2, .08, 1.2, d.M.wood, { pos: [0, .9, 0] })); for (const x of [-.9, .9]) for (const z of [-.5, .5]) k.scene.add(real.box(.08, .9, .08, d.M.wood, { pos: [x, .45, z] }));
    const bl = balance(d.M); bl.position.set(0, .94, 0); k.scene.add(bl);
    const cz = figurine(0xeae2d2), an = figurine(0x8a2a2a), cz2 = figurine(0xeae2d2);
    const [pL, pR] = bl.userData.pans; pL.add(cz); cz.position.set(0, -.3, 0); pR.add(cz2); cz2.position.set(-.04, -.3, 0); pR.add(an); an.position.set(.045, -.3, 0);
    rome.oilLamp(k.scene, [-.7, .97, .35], { i: .8, shadow: true }); rome.key(k.scene, [.4, 2.8, 1.8], [0, 1.4, 0], { i: 14, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.5, 2.2], look: [0, 1.35, 0], fov: 38 }, { pos: [0, 1.45, 1.7], look: [0, 1.35, 0], fov: 36 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t);
      const lift = seg(t, D * .5, D * .7); an.position.y = -.3 + ease(lift) * .5; an.visible = lift < .99;
      const tilt = lerp(-.22, 0, ease(lift)); bl.userData.beam.rotation.z = tilt; bl.userData.pans.forEach(p => p.rotation.z = -tilt); };
  },
  // 4.10 wide: Caesar on his chair, sixty togas still; slow crane up
  '4.10': async k => {
    const cu = await rome.curia(k, { shaftI: .12 });
    const ppl = await C.fillBenches(k, cu, {});
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .6, laurel: true });
    const cam = C.dolly(k.camera, { pos: [0, 2.2, 12], look: [0, 1.4, -8], fov: 44 }, { pos: [0, 8.5, 13], look: [0, .8, -6], fov: 48 });
    return (t, u) => { cam(u); C.idleBench(ppl, t, { look: 0 }); cz.update(t, { pose: 'sit', seatH: .6, mood: 'calm' }); };
  },
};
