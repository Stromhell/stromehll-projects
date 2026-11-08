// The Ides of March · Act 0 · COLD OPEN — realistic look (v3 engine + rome.js)
import * as C from './cae3_common.js';
import * as ui from '../lib/ui.js';
const { THREE, rome, P } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;

// Caesar's walk up the Curia steps: y follows the stair profile (8 steps, 0.2 m rise, 0.45 m run from z=-16)
const stairY = z => Math.max(0, Math.min(1.6, (-16 - z) / .45 * .2));

export const shots = {
  // 0.1 Caesar walks up the marble steps into the Curia, low angle tracking behind him
  '0.1': async k => {
    const cy = await rome.courtyard(k, { sun: [-30, 18, 26] });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, -4], rot: P, laurel: true });
    const att = []; for (const [i, x] of [[0, -1.3], [1, 1.3]]) att.push(await C.person(k, ['cae_sen2', 'cae_sen6'][i], { pos: [x, 0, -2.4], rot: P, seed: 5 + i }));
    const crowd = []; for (let i = 0; i < 7; i++) crowd.push(await C.person(k, C.CIT[i], { pos: [(i % 2 ? 1 : -1) * (7.5 + (i % 3)), 0, -3 - i * 1.6], rot: (i % 2 ? -1 : 1) * 1.2, seed: 20 + i }));
    const cam = { from: [0.6, .55, 1.5], to: [0.5, 2.2, -11.5] };
    return (t, u) => {
      const d = t * 1.25; const z = -4 - d;
      cz.position.set(0, stairY(z), z); cz.update(t, { pose: 'walk', dist: d, mood: 'calm' });
      att.forEach((p, i) => { const zz = -2.4 - d; p.position.set(i ? 1.3 : -1.3, stairY(zz), zz); p.update(t, { pose: 'walk', dist: d + i * .4 }); });
      crowd.forEach((p, i) => p.update(t, { look: Math.sin(t * .5 + i) * .2 }));
      const e = ease(u); k.camera.position.set(lerp(cam.from[0], cam.to[0], e), lerp(cam.from[1], cam.to[1], e), z + 5.2 - e * .8);
      k.camera.lookAt(0, stairY(z) + 1.4 + e * .6, z - 6); k.camera.fov = 48; k.camera.updateProjectionMatrix();
      cy.doors.set(.85);
    };
  },
  // 0.2 Caesar's face, laurel; slow push in; name callout
  '0.2': async k => {
    await rome.courtyard(k, { sun: [-30, 14, 20], sunI: 3.4 });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 1.6, -21], rot: P * .92, laurel: true });
    rome.key(k.scene, [-3.5, 5, -24.5], [0, 3.2, -21], { i: 220 });
    rome.key(k.scene, [2.5, 3.6, -24], [0, 3.2, -21], { i: 60, color: 0xa8bcff, shadow: false });
    const cam = C.dolly(k.camera, { pos: [.45, 3.2, -23.4], look: [0, 3.15, -21], fov: 30 }, { pos: [.3, 3.2, -22.7], look: [0, 3.2, -21], fov: 27 });
    k.calloutPos = [1340, 360];
    return (t, u) => { cam(u); cz.update(t, { mood: 'calm', look: -.1 + Math.sin(t * .4) * .05 }); };
  },
  // 0.3 gladiators loitering along the colonnade, helmets under their arms; lateral dolly
  '0.3': async k => {
    await rome.courtyard(k, { sun: [-30, 20, 26], trees: false });
    const gl = [];
    const spots = [[-10.2, 6, 1.9, 'hold'], [-10.4, 9.6, 1.2, null], [-10.0, 13.2, 2.2, 'hold'], [-10.3, 2.4, 1.0, null], [-10.1, 17, 1.6, 'hold']];
    for (let i = 0; i < spots.length; i++) {
      const [x, z, r, arm] = spots[i]; const p = await C.person(k, C.GLAD[i % 4], { pos: [x, 0, z], rot: r, seed: 40 + i, arm });
      if (arm) C.attach(p, rome.helmet(), 'RightHand', [0, -.08, .12], [P / 2, 0, 0]); gl.push(p);
    }
    rome.key(k.scene, [-4, 6, 10], [-10.3, 1.2, 9], { i: 260, angle: .6 });
    const cam = C.dolly(k.camera, { pos: [-5.6, 1.65, 2], look: [-10.4, 1.3, 4.5], fov: 40 }, { pos: [-5.6, 1.7, 15], look: [-10.4, 1.3, 17.5], fov: 40 });
    return (t, u) => { cam(u); gl.forEach((p, i) => p.update(t, { arm: spots[i][3], mood: 'stern', look: Math.sin(t * .6 + i * 2) * .35 })); };
  },
  // 0.4 Antony held in conversation outside by Trebonius, looking away from the door; seen from inside the doorway
  '0.4': async k => {
    const cy = await rome.courtyard(k, { sun: [-30, 22, 26], interior: true });
    cy.doors.set(1);
    const an = await C.person(k, 'cae_antony', { pos: [-.9, 1.6, -18.6], rot: .9 });
    const tr = await C.person(k, 'cae_trebonius', { pos: [.1, 1.6, -18.2], rot: -2.0 });
    rome.key(k.scene, [3, 6, -14], [-.4, 3, -18.4], { i: 90 });
    // camera just inside the door (dark frame around the bright courtyard)
    const cam = C.dolly(k.camera, { pos: [.6, 3.3, -26.6], look: [-.4, 2.9, -18.4], fov: 38 }, { pos: [.5, 3.25, -25.6], look: [-.4, 2.95, -18.4], fov: 36 });
    k.scene.add(C.real.box(30, 30, .3, C.real.std(0x0b0806, { rough: 1 }), { pos: [0, 10, -28.2] }));
    return (t, u) => { cam(u); an.update(t, { mood: 'happy', look: Math.sin(t * .7) * .2, talk: Math.sin(t * 2.2) > .2 }); tr.update(t, { mood: 'happy', arm: t > 1.5 && t < 4 ? 'shrug' : null, talk: Math.sin(t * 2.2) <= .2 }); };
  },
  // 0.5 Caesar takes his seat on the golden chair; the doors behind close; crane down to the chair
  '0.5': async k => {
    const cu = await rome.curia(k, { shaftI: .1 });
    const ppl = await C.fillBenches(k, cu, {});
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .5, laurel: true });
    rome.key(k.scene, [3, 5, -6], [0, 1.4, -10.6], { i: 160 });
    const cam = C.dolly(k.camera, { pos: [3.6, 7.5, -15.5], look: [0, 1, -4], fov: 46 }, { pos: [2.3, 2.4, -13.2], look: [-.4, 1.3, -6], fov: 40 });
    return (t, u) => { cam(u); C.idleBench(ppl, t, { look: 0 }); cz.update(t, { pose: 'sit', seatH: .5, mood: 'calm', look: Math.sin(t * .4) * .1 }); cu.doors.set(1 - ease(seg(t, .4, 3.4))); };
  },
  // 0.6 across the room one senator stands up and walks toward him; dozens of eyes follow
  '0.6': async k => {
    const cu = await rome.curia(k, {});
    const ppl = await C.fillBenches(k, cu, { skip: (s, i) => (s.side < 0 && s.tier === 0 && Math.abs(s.z - 1.5) < .6) || ((Math.round(s.z * 3) + s.tier * 2 + (s.side > 0 ? 1 : 0)) % 3 === 0) });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .5, laurel: true });
    const sn = await C.person(k, 'cae_cimber', { pos: [-4.0, 0, 1.5], rot: P * .8 });
    rome.key(k.scene, [-1, 6, 4], [-3, 1.4, 0], { i: 120 });
    const cam = C.dolly(k.camera, { pos: [-1.8, 1.9, 6.5], look: [-3.6, 1.5, 0], fov: 40 }, { pos: [-1.9, 1.85, 3.2], look: [-2.2, 1.5, -3.5], fov: 40 });
    return (t, u) => {
      cam(u);
      const d = Math.max(0, t - .6) * 1.1; const a = P * .86;
      sn.position.set(-4.0 + Math.sin(a) * d, 0, 1.5 + Math.cos(a) * d); sn.rotation.y = a; sn.update(t, { pose: d > 0 ? 'walk' : 'idle', dist: d, mood: 'stern' });
      // senators turn their heads to follow him
      ppl.forEach(p => { const dx = sn.position.x - p.position.x, dz = sn.position.z - p.position.z; const ang = Math.atan2(dx, dz) - p.rotation.y; const lk = Math.max(-.9, Math.min(.9, Math.atan2(Math.sin(ang), Math.cos(ang)))) * seg(t, .3, 1.6); p.update(t, { pose: 'sit', seatH: .5, arm: 'lap', look: lk }); });
      cz.update(t, { pose: 'sit', seatH: .5 });
    };
  },
  // 0.7 the ring of togas closing round the chair, top-down slow rotation; tally 60+
  '0.7': async k => {
    const cu = await rome.curia(k, { shafts: false, sunI: 6 });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.6], rot: 0, pose: 'sit', seatH: .5, laurel: true });
    const ring = [];
    const rings = [[14, 2.0, 5.2], [12, 3.0, 6.6]];
    let n = 0;
    for (const [cnt, r1, r0] of rings) for (let i = 0; i < cnt; i++) {
      const a = (i / cnt) * P * 2 + (r1 > 2.5 ? .2 : 0);
      if (Math.abs(Math.atan2(Math.sin(a - P), Math.cos(a - P))) < .5 && r1 < 2.5) continue; // gap behind the chair (statue side)
      const p = await C.person(k, C.SEN[n % C.SEN.length], { seed: 500 + n }); p.userData.ring = { a, r0, r1 }; p.position.set(Math.sin(a) * r0, 0, -10.6 + Math.cos(a) * r0); ring.push(p); n++;
    }
    const c = [0, 0, -10.6];
    return (t, u) => {
      const e = ease(seg(t, 0, k.meta.seconds * .85));
      ring.forEach((p, i) => { const { a, r0, r1 } = p.userData.ring; const r = lerp(r0, r1, e); const px = c[0] + Math.sin(a) * r, pz = c[2] + Math.cos(a) * r; p.position.set(px, (Math.abs(px) < 2.5 && Math.abs(pz + 10.8) < 1.6) ? .45 : 0, pz); p.rotation.y = a + P; p.update(t, { pose: e < .98 ? 'walk' : 'idle', dist: (r0 - r) , mood: 'stern' }); });
      cz.update(t, { pose: 'sit', seatH: .5, mood: 'worried' });
      const ang = .3 + u * .5; k.camera.position.set(c[0] + Math.sin(ang) * 1.2, 13 - u * 1.5, c[2] + Math.cos(ang) * 1.2); k.camera.up.set(Math.sin(ang + P), 0, Math.cos(ang + P)); k.camera.lookAt(...c); k.camera.fov = 42; k.camera.updateProjectionMatrix();
    };
  },
  // 0.8 title slam over the Senate hall, laurel emblem, thunder flash
  '0.8': async k => {
    k.noAutoOverlay = true;
    const cu = await rome.curia(k, { sunI: 4 });
    const cam = C.dolly(k.camera, { pos: [0, 4, 13], look: [0, 4, -12], fov: 46 }, { pos: [0, 3.8, 9], look: [0, 4.2, -12], fov: 44 });
    return (t, u) => { cam(u); const x = k.overlay;
      x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, 0, 1920, 1080);
      const fl = t < .3 ? 0 : t < .4 ? (t - .3) / .1 : t < .6 ? 1 - (t - .4) / .2 : 0; if (fl > 0) { x.fillStyle = `rgba(255,240,220,${fl * .5})`; x.fillRect(0, 0, 1920, 1080); }
      rome.laurelEmblem(x, 960, 520, 3.2, Math.min(1, Math.max(0, (t - .5) / .4)) * .9);
      ui.slam(x, 'THE IDES OF MARCH', t, .35, { size: 150, y: 540, sub: '15 MARCH · 44 BC' }); };
  },
};
