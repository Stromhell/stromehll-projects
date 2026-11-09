// The Ides of March · Act 5 · THE IDES — realistic look. No blood, no blades on bodies: dark shapes and cuts to black.
import * as C from './cae3_common.js';
import { shots as A0 } from './cae3_act0.js';
const { THREE, rome, P, real } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;
const CH = [0, .45, -10.6];
const black = (x, a) => { if (a <= 0) return; x.fillStyle = `rgba(0,0,0,${Math.min(1, a)})`; x.fillRect(0, 0, 1920, 1080); };
async function desk(k) { const d = await rome.domus(k, { room: 'none', night: true }); k.exposure = .9; k.scene.add(real.box(2.4, .08, 1.3, d.M.wood, { pos: [0, .9, 0] })); for (const x of [-1.05, 1.05]) for (const z of [-.5, .5]) k.scene.add(real.box(.08, .9, .08, d.M.wood, { pos: [x, .45, z] })); rome.oilLamp(k.scene, [-.95, .97, -.45], { i: 2.2, shadow: true }); return d; }
async function hall(k, o = {}) { const cu = await rome.curia(k, { shaftI: .1, ...o }); return cu; }
const seated = (k, mood = 'calm') => C.person(k, 'cae_caesar', { pos: CH, rot: 0, pose: 'sit', seatH: .6, laurel: true, mood });
function paperTex(lines, prog = 1, o = {}) {
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 720; const c = cv.getContext('2d');
  const draw = p => { c.fillStyle = '#ece0c4'; c.fillRect(0, 0, 1024, 720); for (let i = 0; i < 1500; i++) { c.fillStyle = `rgba(120,90,50,${(i * 7 % 13) / 260})`; c.fillRect((i * 97) % 1024, (i * 61) % 720, 18, 2); }
    c.fillStyle = '#2a1a10'; c.font = o.font ?? 'italic 600 120px "Liberation Serif"'; c.textAlign = 'center';
    const all = lines.join('\n'); const n = Math.floor(all.length * p); let k = 0;
    lines.forEach((l, i) => { const s = l.slice(0, Math.max(0, n - k)); k += l.length + 1; c.fillText(s, 512, 360 - (lines.length - 1) * 70 + i * 140 + 40); }); };
  draw(prog); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.userData = { draw: p => { draw(p); t.needsUpdate = true; } }; return t;
}

export const shots = {
  // 5.1 Tillius Cimber begs at the chair, hands raised; slow push from behind him
  '5.1': async k => {
    k.calloutPos = [1420, 330];
    const cu = await hall(k); const ppl = await C.fillBenches(k, cu, { zMin: -8 });
    const cz = await seated(k);
    const cm = await C.person(k, 'cae_cimber', { pos: [.1, 0, -8.6], rot: P });
    rome.key(k.scene, [2.5, 5, -6], [0, 1.4, -10], { i: 55 });
    const cam = C.dolly(k.camera, { pos: [.9, 1.8, -4.8], look: [0, 1.3, -10.3], fov: 38 }, { pos: [.6, 1.7, -6.6], look: [0, 1.35, -10.4], fov: 34 });
    return (t, u) => { cam(u); C.idleBench(ppl, t, { look: 0 }); cm.update(t, { arm: Math.floor(t / 2.2) % 3 === 1 ? 'shrug' : 'plead', mood: 'worried', talk: true, nod: Math.sin(t * 1.6) * .25 }); /* begging: palms up, small bows */ cz.update(t, { pose: 'sit', seatH: .6, mood: 'stern', look: Math.sin(t * .5) * .1 }); };
  },
  // 5.2 togas rise from the benches and close in like a tide (reuses the Act 0 ring shot)
  '5.2': k => A0['0.7'](k),
  // 5.3 Cimber grabs the toga; Caesar's surprised brows; close push
  '5.3': async k => {
    const cu = await hall(k); const cz = await seated(k);
    const cm = await C.person(k, 'cae_cimber', { pos: [.55, .45, -9.85], rot: P - .6 });
    rome.key(k.scene, [-2, 3.5, -7], [0, 1.4, -10.6], { i: 55 });
    const cam = C.dolly(k.camera, { pos: [-.9, 1.45, -8.1], look: [0, 1.4, -10.5], fov: 34 }, { pos: [-.55, 1.42, -8.9], look: [0, 1.42, -10.55], fov: 30 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); const g = t > D * .35; cm.update(t, { arm: g ? 'hold' : 'raiseBoth', mood: 'stern' }); cz.update(t, { pose: 'sit', seatH: .6, mood: g ? 'surprised' : 'stern', look: g ? .4 : 0 }); };
  },
  // 5.4 Caesar half-standing, mouth open; quick push in
  '5.4': async k => {
    const cu = await hall(k);
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.0], rot: 0, laurel: true });
    rome.key(k.scene, [1.5, 3, -7], [0, 1.9, -10], { i: 55 });
    const cam = C.dolly(k.camera, { pos: [.2, 1.75, -7.4], look: [0, 1.95, -10], fov: 36 }, { pos: [.1, 1.95, -8.7], look: [0, 2.05, -10], fov: 30 });
    return (t, u) => { cam(u); cz.update(t, { mood: 'surprised', talk: true, arm: 'shrug', look: .2 }); };
  },
  // 5.5 Casca behind the chair, a dark shape raised; cut to black on the strike
  '5.5': async k => {
    k.calloutPos = [1440, 300];
    const cu = await hall(k, { shaftI: .06, sunI: 1.2 }); k.exposure = .7;
    const cz = await seated(k, 'surprised');
    const ca = await C.person(k, 'cae_casca', { pos: [-.7, .45, -11.4], rot: .5 });
    C.attach(ca, rome.daggerShape(), 'RightHand', [0, -.08, .02], [P, 0, 0]);
    rome.key(k.scene, [0, 4, -14], [-.6, 1.8, -11.4], { i: 110, color: 0xffd0a0, angle: .4 });
    const cam = C.dolly(k.camera, { pos: [1.4, 1.5, -7.6], look: [-.4, 1.7, -11], fov: 36 }, { pos: [1.0, 1.55, -8.4], look: [-.5, 1.8, -11.2], fov: 32 });
    const D = k.meta.seconds; k.overlayEnd = D * .72; // name tag goes with the picture when the screen cuts to black
    return (t, u) => { cam(u); ca.update(t, { arm: 'raise', mood: 'stern' }); cz.update(t, { pose: 'sit', seatH: .6, mood: 'surprised' }); black(k.overlay, seg(t, D * .72, D * .74)); };
  },
  // 5.6 the stylus in Caesar's hand; a small comic "OUCH"
  '5.6': async k => {
    const cu = await hall(k);
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, -10.0], rot: .4, laurel: true });
    const st = rome.stylus(); st.scale.setScalar(1.6); C.attach(cz, st, 'RightHand', [0, -.07, .03], [0, 0, P]);
    rome.key(k.scene, [2, 3, -7], [0, 1.2, -10], { i: 55 });
    const cam = C.dolly(k.camera, { pos: [1.3, 2.0, -7.6], look: [0, 2.0, -10], fov: 38 }, { pos: [1.0, 2.05, -8.3], look: [0, 2.05, -10], fov: 34 });
    const D = k.meta.seconds;
    // guard, wind up, then a jab forward with the stylus as OUCH lands
    return (t, u) => { cam(u); cz.update(t, { arm: t < D * .54 ? 'hold' : 'stab', mood: t < D * .4 ? 'surprised' : 'angry', look: .3 });
      const a = seg(t, D * .6, D * .65) * (1 - seg(t, D * .85, D * .9)); if (a > 0) { const x = k.overlay; x.save(); x.globalAlpha = a; x.translate(1380, 520); x.rotate(-.15); x.font = '900 64px "Comic Sans MS", "Liberation Sans"'; x.lineWidth = 10; x.strokeStyle = '#000'; x.strokeText('OUCH!', 0, 0); x.fillStyle = '#ffd23a'; x.fillText('OUCH!', 0, 0); x.restore(); } };
  },
  // 5.7 the ring of togas closes over the chair from above (Act 0 ring shot again)
  '5.7': k => A0['0.7'](k),
  // 5.8 two loyal senators shoved back at the edge of the crowd; lateral dolly
  '5.8': async k => {
    const cu = await hall(k);
    const crowd = []; for (let i = 0; i < 12; i++) { const a = i / 12 * P * 2; crowd.push(await C.person(k, C.SEN[i % C.SEN.length], { pos: [Math.sin(a) * 1.6, 0, -8.4 + Math.cos(a) * 1.3], rot: a + P, seed: 1000 + i })); }
    const lo = []; for (const [i, x] of [[0, -.9], [1, .9]]) lo.push(await C.person(k, ['cae_sen9', 'cae_sen2'][i], { pos: [x, 0, -5.6], rot: P, seed: 1020 + i }));
    const cam = C.dolly(k.camera, { pos: [-3.5, 1.7, -2.5], look: [0, 1.4, -6.5], fov: 40 }, { pos: [3.5, 1.7, -2.5], look: [0, 1.4, -6.5], fov: 40 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); crowd.forEach((p, i) => p.update(t, { mood: 'stern', arm: i % 3 === 0 ? 'raise' : null })); const b = ease(seg(t, D * .35, D * .6)); lo.forEach((p, i) => { p.position.z = -5.6 + b * 1.4; p.update(t, { pose: b > 0 && b < 1 ? 'walk' : 'idle', dist: -b * 1.4, arm: 'handsUp', mood: 'worried' }); }); };
  },
  // 5.9 Brutus's face among the togas; cut to black
  '5.9': async k => {
    const cu = await hall(k, { sunI: 1.6 }); k.exposure = .8;
    const br = await C.person(k, 'cae_brutus', { pos: [0, 0, -8.6], rot: P });
    const sides = []; for (const [x, z] of [[-.7, -8.9], [.7, -8.8], [-.4, -8.0], [.5, -7.9]]) sides.push(await C.person(k, C.SEN[sides.length + 4], { pos: [x, 0, z], rot: P, seed: 1040 + sides.length }));
    rome.key(k.scene, [0, 3.5, -12], [0, 1.7, -8.6], { i: 90, color: 0xffd0a0 });
    const cam = C.dolly(k.camera, { pos: [0, 1.72, -11.2], look: [0, 1.7, -8.6], fov: 34 }, { pos: [0, 1.72, -10.0], look: [0, 1.7, -8.6], fov: 30 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); br.update(t, { mood: 'sad', look: 0 }); sides.forEach(p => p.update(t, { mood: 'stern' })); black(k.overlay, seg(t, D * .8, D * .82)); };
  },
  // 5.10 black screen: tally to 23 and the doctor's note
  '5.10': async k => {
    // forensic graphic: a dark torso silhouette, 23 wound marks count up, 22 fade, the one fatal mark (chest) glows crimson
    k.scene.background = new THREE.Color(0); k.noAutoOverlay = true;
    k.camera.position.set(0, 0, 5); k.camera.lookAt(0, 0, 0);
    const D = k.meta.seconds, R = (s => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296))(23);
    const cx = 640, cy = 500;
    const marks = []; while (marks.length < 22) { const x = cx + (R() - .5) * 300, y = cy - 120 + R() * 360; if (Math.abs(x - cx - 25) < 40 && Math.abs(y - cy + 40) < 40) continue; marks.push([x, y]); }
    marks.splice(1, 0, [cx + 30, cy - 40]); // the second blow: the chest
    const torso = x => { x.beginPath(); x.arc(cx, cy - 300, 62, 0, Math.PI * 2); x.moveTo(cx - 40, cy - 238); x.quadraticCurveTo(cx - 190, cy - 230, cx - 200, cy - 150); x.lineTo(cx - 175, cy + 260); x.lineTo(cx + 175, cy + 260); x.lineTo(cx + 200, cy - 150); x.quadraticCurveTo(cx + 190, cy - 230, cx + 40, cy - 238); x.closePath(); };
    return (t, u) => {
      const x = k.overlay; x.save(); x.fillStyle = '#000'; x.fillRect(0, 0, 1920, 1080);
      const g = x.createRadialGradient(cx, cy, 40, cx, cy, 520); g.addColorStop(0, 'rgba(70,52,36,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 1920, 1080);
      x.globalAlpha = C.ease(seg(t, 0, .6)); torso(x); x.fillStyle = '#16110d'; x.fill(); x.lineWidth = 3; x.strokeStyle = '#8a6a3a'; x.stroke();
      const n = Math.floor(23 * C.ease(seg(t, .5, D * .45))), dim = seg(t, D * .5, D * .6);
      for (let i = 0; i < n; i++) { const [mx, my] = marks[i], fatal = i === 1; const a = fatal ? 1 : 1 - dim * .8; x.globalAlpha = a;
        x.beginPath(); x.arc(mx, my, fatal ? 10 + dim * 8 + Math.sin(t * 6) * 2 * dim : 7, 0, Math.PI * 2); x.fillStyle = fatal && dim > 0 ? '#d42a1e' : '#efe4d2'; x.fill();
        if (fatal && dim > 0) { x.globalAlpha = dim * .45; x.beginPath(); x.arc(mx, my, 30 + Math.sin(t * 6) * 4, 0, Math.PI * 2); x.strokeStyle = '#d42a1e'; x.lineWidth = 3; x.stroke(); } }
      x.globalAlpha = 1; x.textAlign = 'left'; x.fillStyle = '#efe4d2'; x.font = '120px "Anton"'; x.fillText(String(n), 1060, 330);
      x.font = '600 44px "Oswald"'; x.fillStyle = '#c8b28a'; x.fillText('WOUNDS', 1060 + x.measureText(String(n)).width * 0 + 150, 320);
      const f = C.ease(seg(t, D * .55, D * .65)); if (f > 0) { x.globalAlpha = f; x.strokeStyle = '#d42a1e'; x.lineWidth = 3; x.beginPath(); x.moveTo(marks[1][0] + 20, marks[1][1]); x.lineTo(1040, 430); x.lineTo(1060, 430); x.stroke();
        x.fillStyle = '#d42a1e'; x.font = '600 46px "Oswald"'; x.fillText('ONLY ONE WAS FATAL', 1075, 445); x.fillStyle = '#c8b28a'; x.font = '34px "Oswald"'; x.fillText('the second blow, to the chest', 1075, 495); }
      const p = C.ease(seg(t, D * .7, D * .8)); if (p > 0) { x.globalAlpha = p; x.fillStyle = '#e8dcc0'; x.save(); x.translate(1360, 640); x.rotate(-.025); x.fillRect(-300, -60, 600, 120); x.fillStyle = '#2a1a10'; x.textAlign = 'center'; x.font = '600 32px "Liberation Serif"'; x.fillText('The physician Antistius:', 0, -12); x.font = 'italic 32px "Liberation Serif"'; x.fillText('only one wound, to the chest, was fatal.', 0, 34); x.restore(); }
      x.restore();
    };
  },
  // 5.11 a quill writes ET TU, BRUTE? ; SHAKESPEARE 1599 stamp
  '5.11': async k => {
    const d = await desk(k);
    const tx = paperTex(['Et tu, Brute?'], 0);
    const pp = real.m(new THREE.PlaneGeometry(.6, .42), new THREE.MeshStandardMaterial({ map: tx, roughness: .9 }), { rot: [-P / 2, 0, 0], pos: [0, .945, .15], cast: false }); k.scene.add(pp);
    const q = new THREE.Group(); q.add(real.m(new THREE.CylinderGeometry(.003, .001, .26, 6), real.std(0xe8e0d0, { rough: .6 }), { pos: [0, .13, 0] }));
    const fe = real.m(new THREE.PlaneGeometry(.05, .2), new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: .9, side: THREE.DoubleSide }), { pos: [.012, .17, 0] }); q.add(fe); q.rotation.set(.5, 0, -.5); k.scene.add(q);
    rome.key(k.scene, [.5, 2.4, 1.2], [0, .95, .15], { i: 14, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.75, .9], look: [0, .95, .12], fov: 38 }, { pos: [0, 1.45, .55], look: [0, .95, .14], fov: 36 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); const p = ease(seg(t, .4, D * .6)); tx.userData.draw(p);
      q.position.set(-.22 + p * .44, .95 + Math.abs(Math.sin(t * 14)) * .01 * (p < 1), .15 + Math.sin(t * 9) * .01);
      C.stamp(k.overlay, t, D * .7, { text: 'SHAKESPEARE, 1599', x: 1280, y: 300 }); };
  },
  // 5.12 two cards flip: SILENCE and KAI SU, TEKNON?
  '5.12': async k => {
    const d = await desk(k);
    const mk = (lines, x) => { const back = paperTex(['?'], 1, { font: '700 260px "Liberation Serif"' }); const front = paperTex(lines, 1, { font: 'italic 600 96px "Liberation Serif"' });
      const g = new THREE.Group(); g.position.set(x, .95, .1);
      g.add(real.m(new THREE.PlaneGeometry(.42, .3), new THREE.MeshStandardMaterial({ map: back, roughness: .9 }), { rot: [-P / 2, 0, 0], pos: [0, .003, 0], cast: false }));
      g.add(real.m(new THREE.PlaneGeometry(.42, .3), new THREE.MeshStandardMaterial({ map: front, roughness: .9 }), { rot: [P / 2, 0, P], pos: [0, .001, 0], cast: false }));
      k.scene.add(g); return g; };
    const c1 = mk(['SILENCE'], -.26), c2 = mk(['Kai su, teknon?', '"You too, child?"'], .26);
    rome.key(k.scene, [.5, 2.4, 1.2], [0, .95, .1], { i: 14, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [0, 1.75, .9], look: [0, .95, .08], fov: 38 }, { pos: [0, 1.6, .7], look: [0, .95, .1], fov: 36 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t);
      for (const [g, t0] of [[c1, D * .15], [c2, D * .5]]) { const f = ease(seg(t, t0, t0 + .6)); g.rotation.z = f * P; g.position.y = .95 + Math.sin(f * P) * .12; } };
  },
  // 5.13 Pompey's statue looks down at the empty golden chair; a fallen toga at its base; slow crane up
  '5.13': async k => {
    const cu = await hall(k, { shaftI: .12 });
    const cl = real.m(new THREE.SphereGeometry(.5, 24, 12), real.std(0xe8e0d0, { rough: .95 }), { pos: [.3, .12, -12.1] }); cl.scale.set(1.3, .22, .8);
    const pa = cl.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), z = pa.getZ(i); pa.setY(i, pa.getY(i) + Math.sin(x * 9) * .05 + Math.cos(z * 7) * .04); } cl.geometry.computeVertexNormals(); k.scene.add(cl);
    rome.key(k.scene, [2, 6, -8], [0, 2.5, -13], { i: 180, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [1.6, .8, -8.2], look: [0, .6, -12], fov: 40 }, { pos: [1.4, 3.6, -7.6], look: [0, 3.2, -13.2], fov: 40 });
    return (t, u) => { cam(u); };
  },
};
