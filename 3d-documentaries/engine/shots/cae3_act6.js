// The Ides of March · Act 6 · THE WARNINGS — realistic look
import * as C from './cae3_common.js';
import { calendarTex } from './cae3_act2.js';
const { THREE, rome, P, real } = C;
const seg = C.seg, ease = C.ease, lerp = C.lerp;

function altar(M) { const g = new THREE.Group(); g.add(real.box(1.3, .9, .8, M.marble, { pos: [0, .45, 0] })); g.add(real.box(1.45, .12, .95, M.marble, { pos: [0, .96, 0] })); g.add(real.box(1.45, .12, .95, M.marble, { pos: [0, .06, 0] })); return g; }
function hourglass(M) {
  const g = new THREE.Group(); const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .05, transmission: .9, transparent: true, opacity: .35, thickness: .02 });
  const pts = []; for (let i = 0; i <= 20; i++) { const y = i / 20 * .4 - .2; const r = .012 + Math.pow(Math.abs(y) / .2, 1.6) * .1; pts.push(new THREE.Vector2(r, y)); }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 32), glass));
  for (const s of [-1, 1]) { g.add(real.m(new THREE.CylinderGeometry(.14, .14, .025, 32), M.wood, { pos: [0, s * .215, 0] })); }
  for (let i = 0; i < 3; i++) { const a = i / 3 * P * 2; g.add(real.m(new THREE.CylinderGeometry(.008, .008, .43, 8), M.wood, { pos: [Math.sin(a) * .125, 0, Math.cos(a) * .125] })); }
  const sm = real.std(0xc8a060, { rough: 1 });
  const top = real.m(new THREE.ConeGeometry(.09, .1, 24), sm, { rot: [P, 0, 0] }); const bot = real.m(new THREE.ConeGeometry(.1, .1, 24), sm); g.add(top, bot);
  g.userData.sand = f => { top.scale.set(1 - f * .8 + .01, 1 - f + .01, 1 - f * .8 + .01); top.position.y = .14 - (1 - (1 - f)) * .03; bot.scale.set(f * .9 + .01, f + .01, f * .9 + .01); bot.position.y = -.2 + .05 * f; };
  return g;
}
async function desk(k, o = {}) { const d = await rome.domus(k, { room: 'none', night: o.night ?? true }); k.exposure = .9; k.scene.add(real.box(2.4, .08, 1.3, d.M.wood, { pos: [0, .9, 0] })); for (const x of [-1.05, 1.05]) for (const z of [-.5, .5]) k.scene.add(real.box(.08, .9, .08, d.M.wood, { pos: [x, .45, z] })); rome.oilLamp(k.scene, [-.95, .97, -.45], { i: 2.2, shadow: true }); return d; }
function bubble(x, txt, cx, cy, a) { if (a <= 0) return; x.save(); x.globalAlpha = Math.min(1, a); const s = .6 + .4 * ease(Math.min(1, a)); x.translate(cx, cy); x.scale(s, s); x.font = '600 38px "Oswald", "Liberation Sans"'; const w = x.measureText(txt).width + 60;
  x.fillStyle = 'rgba(250,244,230,.95)'; x.strokeStyle = '#2a1a10'; x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2, -45, w, 90, 40); x.fill(); x.stroke(); x.beginPath(); x.moveTo(-14, 44); x.lineTo(0, 80); x.lineTo(16, 44); x.fill(); x.stroke();
  x.fillStyle = '#2a1a10'; x.textAlign = 'center'; x.fillText(txt, 0, 13); x.restore(); }

export const shots = {
  // 6.1 an hourglass turning back; sand flowing upward
  '6.1': async k => {
    const d = await desk(k);
    const hg = hourglass(d.M); hg.position.set(0, 1.165, 0); k.scene.add(hg);
    rome.key(k.scene, [.6, 2.4, 1.4], [0, 1.15, 0], { i: 14, angle: .45 });
    const cam = C.dolly(k.camera, { pos: [0, 1.3, 1.6], look: [0, 1.15, 0], fov: 34 }, { pos: [0, 1.22, 1.05], look: [0, 1.15, 0], fov: 30 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); hg.userData.sand(1 - ease(seg(t, .3, D - .3)) * .85); hg.rotation.y = t * .1; };
  },
  // 6.2 Spurinna at the smoking altar reading the omens; red question mark
  '6.2': async k => {
    k.calloutPos = [1400, 320];
    const cy = await rome.courtyard(k, { trees: true, sun: [-25, 9, 30], sunI: 3 });
    const al = altar(cy.M); al.position.set(0, 0, -8); k.scene.add(al); rome.brazier(k.scene, [1.3, 0, -8.4], { i: 6 }); rome.oilLamp(k.scene, [0, 1.04, -8], { i: 1.2 });
    const sp = await C.person(k, 'cae_spurinna', { pos: [0, 0, -9.1], rot: 0 });
    const cz = await C.person(k, 'cae_caesar', { pos: [1.7, 0, -7.3], rot: -P / 2 - .3, laurel: true });
    const cam = C.dolly(k.camera, { pos: [-1.0, 1.7, -4.6], look: [0, 1.4, -8.6], fov: 38 }, { pos: [-.4, 1.65, -6.4], look: [0, 1.55, -9.1], fov: 32 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); sp.update(t, { arm: 'raiseBoth', mood: 'worried', talk: true, look: Math.sin(t * .7) * .2 }); cz.update(t, { mood: 'calm' });
      const a = seg(t, D * .55, D * .62); if (a > 0) { const x = k.overlay; x.save(); x.globalAlpha = a; x.font = '700 220px "Liberation Serif"'; x.fillStyle = '#b3140e'; x.textAlign = 'center'; x.fillText('?', 560, 520); x.restore(); } };
  },
  // 6.3 Spurinna points at the calendar: the 15th circled
  '6.3': async k => {
    const d = await rome.domus(k, { room: 'study' }); k.exposure = .8;
    const pg = new THREE.Mesh(new THREE.PlaneGeometry(.64, .8), new THREE.MeshStandardMaterial({ map: calendarTex('MARTIUS', 'beware the Ides', { circle: 15 }), roughness: .8 }));
    pg.position.set(0, 1.8, -4.42); k.scene.add(pg); k.scene.add(real.box(.74, .9, .03, d.M.wood, { pos: [0, 1.8, -4.45] }));
    const sp = await C.person(k, 'cae_spurinna', { pos: [-.8, 0, -3.5], rot: P * .8 });
    rome.key(k.scene, [.6, 2.8, -2.0], [0, 1.8, -4.4], { i: 20, angle: .5 });
    const cam = C.dolly(k.camera, { pos: [.6, 1.7, -1.0], look: [-.2, 1.7, -4.2], fov: 40 }, { pos: [.2, 1.78, -2.8], look: [0, 1.75, -4.4], fov: 36 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); sp.update(t, { arm: 'point', mood: 'worried', talk: true }); };
  },
  // 6.4 dinner: goblets, Caesar raises a hand ("a sudden one"); slow orbit
  '6.4': async k => {
    const d = await rome.domus(k, { room: 'dining' }); k.exposure = .7;
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .55, -2.4], rot: 0, pose: 'sit', seatH: .1, laurel: true });
    const ppl = []; for (const [id, x, z, r] of [['cae_lepidus', -2.4, -.3, P / 2], ['cae_sen4', -2.4, .6, P / 2], ['cae_decimus', 2.4, -.3, -P / 2], ['cae_sen7', 2.4, .6, -P / 2]]) ppl.push(await C.person(k, id, { pos: [x, .55, z], rot: r, pose: 'sit', seatH: .1, seed: 1100 + ppl.length }));
    const orb = C.orbit(k.camera, [0, 1.2, -.6], 3.6, 2.2, -.5, .45, 44, [0, 1.0, -.8]);
    const D = k.meta.seconds;
    return (t, u) => { orb(u); rome.flickerAll(k.scene, t); cz.update(t, { pose: 'sit', seatH: .1, arm: t > D * .5 ? 'raise' : 'lap', mood: 'calm', talk: t > D * .5 }); ppl.forEach((p, i) => p.update(t, { pose: 'sit', seatH: .1, mood: 'happy', look: i < 2 ? .4 : -.4, talk: t < D * .5 && Math.floor(t / 1.5) % 4 === i })); };
  },
  // 6.5 bedroom at night: the shutters bang open, the curtain blows in; quick push
  '6.5': async k => {
    const d = await rome.domus(k, { room: 'bed', night: true, shutters: 0 }); k.exposure = 1;
    const cz = await C.person(k, 'cae_caesar', { pos: [-1.4, .72, -2.6], rot: -P / 2, pose: 'sit', seatH: .05 });
    rome.key(k.scene, [4.4, 2.4, 0], [0, 1.6, 0], { i: 30, color: 0x8aa0e0, angle: .7 });
    const cam = C.dolly(k.camera, { pos: [-.8, 1.8, 4.2], look: [1.2, 1.3, -1.4], fov: 60 }, { pos: [-.3, 1.8, 3.4], look: [1.6, 1.4, -1.2], fov: 56 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); const o = ease(seg(t, D * .25, D * .3)); d.group.userData.shutters(o); d.group.userData.wind && d.group.userData.wind(t, o * .8); cz.update(t, { pose: 'sit', seatH: .05, mood: o > .5 ? 'surprised' : 'calm', look: o > .5 ? .6 : 0 }); };
  },
  // 6.6 Calpurnia clutches Caesar's arm at dawn; over her shoulder
  '6.6': async k => {
    k.calloutPos = [1400, 320];
    const d = await rome.domus(k, { room: 'bed', sun: [20, 6, 10], sunI: 3 }); k.exposure = .85;
    const cz = await C.person(k, 'cae_caesar', { pos: [.8, 0, .2], rot: -P / 2 - .3 });
    const ca = await C.person(k, 'cae_calpurnia', { pos: [-.05, 0, .55], rot: P / 2 - .3 });
    rome.key(k.scene, [3, 3, 3], [.4, 1.6, .3], { i: 140, color: 0xffd8b0 });
    const cam = C.dolly(k.camera, { pos: [-1.7, 1.7, 1.9], look: [.6, 1.55, .2], fov: 40 }, { pos: [-1.4, 1.68, 1.6], look: [.6, 1.6, .2], fov: 36 });
    return (t, u) => { cam(u); ca.update(t, { arm: 'hold', mood: 'worried', talk: true, look: .1 }); cz.update(t, { mood: 'stern', look: -.15 }); };
  },
  // 6.7 priests shake their heads over the altar; lateral dolly
  '6.7': async k => {
    const cy = await rome.courtyard(k, { trees: true, sun: [-25, 14, 30] });
    const al = altar(cy.M); al.position.set(0, 0, -8); k.scene.add(al); rome.brazier(k.scene, [-2.2, 0, -8.6], { i: 5 }); rome.oilLamp(k.scene, [0, 1.04, -8], { i: 1.2 });
    const pr = []; for (const [i, x] of [[0, -1.1], [1, 0], [2, 1.1]]) pr.push(await C.person(k, ['cae_sen1', 'cae_sen6', 'cae_sen10'][i], { pos: [x, 0, -9.1], rot: 0, seed: 1150 + i }));
    const cam = C.dolly(k.camera, { pos: [-2.4, 1.7, -4.6], look: [-.5, 1.4, -8.6], fov: 40 }, { pos: [2.4, 1.7, -4.6], look: [.5, 1.4, -8.6], fov: 40 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); pr.forEach((p, i) => p.update(t, { mood: 'worried', look: Math.sin(t * 5 + i) * .35 })); };
  },
  // 6.8 Caesar sits back down and takes off his laurel
  '6.8': async k => {
    const d = await rome.domus(k, { room: 'study' }); k.exposure = .8;
    const cz = await C.person(k, 'cae_caesar', { pos: [0, .45, 1.6], rot: P, pose: 'sit', seatH: .5 });
    k.scene.add(real.box(.6, .45, .5, d.M.wood, { pos: [0, .225, 1.65] }));
    const lr = rome.laurel(cz);
    rome.key(k.scene, [-1.2, 2.6, -1], [0, 1.4, 1.6], { i: 14 }); k.exposure = .6;
    const cam = C.dolly(k.camera, { pos: [-.4, 1.5, -.9], look: [0, 1.25, 1.6], fov: 38 }, { pos: [-.25, 1.45, -.2], look: [0, 1.3, 1.6], fov: 34 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); const off = t > D * .55; lr.visible = !off; cz.update(t, { pose: 'sit', seatH: .5, arm: t > D * .42 && t < D * .58 ? 'raiseBoth' : 'lap', mood: 'sad', look: 0 }); };
  },
  // 6.9 Decimus at the doorway, persuasive hands; push in
  '6.9': async k => {
    const d = await rome.domus(k, { room: 'study' }); k.exposure = .8;
    const dc = await C.person(k, 'cae_decimus', { pos: [0, 0, -2.6], rot: 0 });
    const cz = await C.person(k, 'cae_caesar', { pos: [-1.3, 0, .9], rot: P - .5 });
    rome.key(k.scene, [1.5, 2.6, 1], [0, 1.6, -2.6], { i: 40 });
    const cam = C.dolly(k.camera, { pos: [2.2, 1.65, 3.2], look: [0, 1.6, -2.6], fov: 38 }, { pos: [1.9, 1.65, 2.2], look: [0, 1.62, -2.6], fov: 32 });
    return (t, u) => { cam(u); rome.flickerAll(k.scene, t); dc.update(t, { arm: Math.floor(t / 2) % 2 ? 'shrug' : 'point', mood: 'happy', talk: true }); cz.update(t, { mood: 'stern', look: 0 }); };
  },
  // 6.10 imaginary gossip over Roman heads
  '6.10': async k => {
    await rome.forum(k, { trees: false });
    const ppl = []; for (let i = 0; i < 10; i++) ppl.push(await C.person(k, [...C.CIT, ...C.SEN][i * 2 % 18], { pos: [-4 + (i % 5) * 2, 0, 2 - Math.floor(i / 5) * 2.4], rot: (i % 2 ? .5 : -.5), seed: 1200 + i }));
    const cam = C.dolly(k.camera, { pos: [0, 1.8, 9], look: [0, 1.6, 1], fov: 42 }, { pos: [0, 1.8, 8], look: [0, 1.65, 1], fov: 40 });
    const D = k.meta.seconds; const bs = [['Afraid of his wife?', 640, 360], ['He listens to dreams now?', 1300, 300], ['Some dictator...', 980, 470]];
    return (t, u) => { cam(u); ppl.forEach((p, i) => p.update(t, { mood: 'smug', talk: true, look: Math.sin(i + t * .5) * .4 })); bs.forEach(([s, x, y], i) => bubble(k.overlay, s, x, y, seg(t, .6 + i * D * .25, 1 + i * D * .25))); };
  },
  // 6.11 Caesar puts the laurel back on and walks out; tracking behind him
  '6.11': async k => {
    await rome.forum(k, { trees: false });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, 8], rot: P, laurel: true });
    const cam = C.dolly(k.camera, { pos: [.6, 1.8, 11], look: [0, 1.5, 4], fov: 40 }, { pos: [.6, 1.8, 9.2], look: [0, 1.5, 2], fov: 40 });
    return (t, u) => { cam(u); const z = 8 - t * 1.0; cz.position.z = z; cz.update(t, { pose: 'walk', dist: t, mood: 'calm' }); };
  },
  // 6.12 Artemidorus pushes through the crowd and presses a scroll into Caesar's hand
  '6.12': async k => {
    k.calloutPos = [1420, 330];
    await rome.forum(k, { trees: false });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, 4], rot: P / 2 - .4, laurel: true });
    const ar = await C.person(k, 'cae_artemidorus', { pos: [.9, 0, 4.4], rot: -P / 2 - .2 });
    const sc = rome.scroll({ seal: true }); C.attach(ar, sc, 'RightHand', [0, -.08, .04], [0, 0, P / 2]);
    const crowd = []; for (let i = 0; i < 12; i++) crowd.push(await C.person(k, C.CIT[i % 8], { pos: [-4 + (i % 6) * 1.6 + (i % 6 > 2 ? 1.5 : 0), 0, 2.2 - Math.floor(i / 6) * 2.5], rot: .2, seed: 1250 + i }));
    const cam = C.dolly(k.camera, { pos: [.6, 1.7, 8.2], look: [.4, 1.4, 4.2], fov: 38 }, { pos: [.5, 1.45, 5.9], look: [.45, 1.2, 4.2], fov: 32 });
    return (t, u) => { cam(u); cz.update(t, { mood: 'calm', arm: t > 3 ? 'hold' : null }); ar.update(t, { arm: 'hold', mood: 'worried', talk: true }); crowd.forEach((p, i) => p.update(t, { mood: 'happy', arm: i % 4 === 0 ? 'raise' : null })); };
  },
  // 6.13 the scroll in Caesar's hand, unopened, as the Curia doors close; slow push to the doors
  '6.13': async k => {
    const cy = await rome.courtyard(k, { trees: true });
    const cz = await C.person(k, 'cae_caesar', { pos: [0, 0, -15], rot: P, laurel: true });
    const sc = rome.scroll({ seal: true }); C.attach(cz, sc, 'LeftHand', [0, -.08, .04], [0, 0, P / 2]);
    const stairY = z => z > -16 ? 0 : Math.min(1.6, Math.ceil((-16 - z) / .45) * .2);
    const cam = C.dolly(k.camera, { pos: [.9, 1.6, -11.5], look: [0, 1.6, -18], fov: 40 }, { pos: [.6, 2.6, -15.5], look: [0, 2.8, -24.8], fov: 40 });
    const D = k.meta.seconds;
    return (t, u) => { cam(u); const z = -15 - t * 1.0; cz.position.set(0, stairY(z), z); cz.visible = z > -25.4; cz.update(t, { pose: 'walk', dist: t, arm: 'hold', mood: 'calm' }); cy.doors.set(1 - ease(seg(t, D * .82, D))); };
  },
};
