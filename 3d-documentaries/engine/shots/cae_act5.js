// Caesar · Act 5 · THE IDES OF MARCH (violence implied only: silhouettes, ring of togas, cuts to black; no blades, no blood)
import { core, props, people, ui, THREE, place, curia, caesar, senator, brutus, cimber, casca, statue, popIn } from './cae_common.js';
const P = Math.PI;
const black = (k, a) => { if (a <= 0) return; const x = k.overlay; x.fillStyle = `rgba(0,0,0,${Math.min(1, a)})`; x.fillRect(0, 0, 1920, 1080); };
function seated(k, cu, o = {}) { return place(k.scene, caesar(o), { pos: [cu.chairPos.x, cu.chairPos.y + .96, cu.chairPos.z + .1], rot: 0, pose: 'sit' }); }
function ringShot(k, n, r0, r1) {
  const cu = curia(k, { senators: false }); const cp = cu.chairPos; seated(k, cu);
  const ring = []; for (let i = 0; i < n; i++) ring.push(place(k.scene, senator(1200 + i), { pos: [0, 0, 0] }));
  return { cu, cp, ring, place: (t, R) => ring.forEach((p, i) => { const b = i / n * P * 2; p.position.set(cp.x + Math.cos(b) * R, 0, cp.z + 1.6 + Math.sin(b) * R * .8); p.lookAt(cp.x, 0, cp.z + 1.6); p.update(t + i, { pose: 'walk', dist: t * .3 }); }) };
}
const topCam = (k, cp, u, h = 34, fov = 17) => { const a = u * .6; k.camera.position.set(cp.x + Math.sin(a) * 1.5, h, cp.z + Math.cos(a) * 1.5 + 1.6); k.camera.up.set(Math.sin(a + P), 0, Math.cos(a + P)); k.camera.lookAt(cp.x, 0, cp.z + 1.6); k.camera.fov = fov; k.camera.updateProjectionMatrix(); };
export const shots = {
  '5.1': async k => {
    const cu = curia(k, { n: 20 }); const cp = cu.chairPos; seated(k, cu);
    const c = place(k.scene, cimber(), { pos: [cp.x, 0, cp.z + 2.2], rot: P, arm: 'raise' });
    c.state.pose = 'sit'; c.userData.seatY = -.25;
    k.anchor = [cp.x, 1.8, cp.z + 2.2];
    const cam = core.camMove(k.camera, { from: [.8, 1.6, cp.z + 6], to: [.5, 1.5, cp.z + 4], look: [0, 1.4, cp.z + .5], fov: 40 });
    return (t, u) => cam(u, t);
  },
  '5.2': async k => { const s = ringShot(k, 20); return (t, u) => { topCam(k, s.cp, u); s.place(t, 6.5 - core.ease(core.seg(t, .2, k.meta.seconds)) * 4); }; },
  '5.3': async k => {
    const cu = curia(k, { n: 10 }); const cp = cu.chairPos; const c = seated(k, cu, { mood: 'surprised' });
    const ci = place(k.scene, cimber(), { pos: [cp.x + .5, 0, cp.z + 1.1], rot: P - .3, arm: 'raise' });
    const cam = core.camMove(k.camera, { from: [1.5, 1.8, cp.z + 3.2], to: [1.1, 1.75, cp.z + 2.4], look: [0, 1.7, cp.z + .2], fov: 38 });
    return (t, u) => cam(u, t);
  },
  '5.4': async k => {
    const cu = curia(k, { n: 10 }); const cp = cu.chairPos; const c = seated(k, cu, { mood: 'surprised' });
    const cam = core.camMove(k.camera, { from: [0, cp.y + 2.4, cp.z + 4.6], to: [0, cp.y + 2.35, cp.z + 3], look: [0, cp.y + 2.1, cp.z + .2], fov: 38, e: core.easeOut });
    return (t, u) => { cam(u, t); const r = core.ease(core.seg(t, .2, 1)); c.position.y = cp.y + .96 + r * .3; c.update(t, { pose: r > .5 ? 'stand' : 'sit' }); };
  },
  '5.5': async k => {
    const cu = curia(k, { n: 0, senators: false }); const cp = cu.chairPos; const c = seated(k, cu, { silhouette: true });
    const ca = place(k.scene, casca(), { pos: [cp.x - .9, .4, cp.z - .6], rot: .8, arm: 'raise' });
    k.scene.traverse(o => { if (o.isPointLight) o.intensity *= .3; });
    const back = new THREE.PointLight(0xffd8a0, 30, 12); back.position.set(0, 3, cp.z - 1.5); k.scene.add(back);
    k.anchor = [cp.x - .9, 2.6, cp.z - .6];
    const cam = core.camMove(k.camera, { from: [1.6, 1.6, cp.z + 4], to: [1.2, 1.6, cp.z + 3.2], look: [-.4, 1.6, cp.z - .2], fov: 40 });
    return (t, u) => { cam(u, t); black(k, core.clamp((t - k.meta.seconds * .7) / .15)); };
  },
  '5.6': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 6 }); k.scene.background = new THREE.Color(0x15100e);
    const hand = core.sph(.16, 0xffffff, { scale: [1, 1.1, .9] }); k.scene.add(hand);
    const sty = core.cyl(.015, .008, .5, 0x8a7a5a, { pos: [.05, .05, .02], rot: [0, 0, -.6] }); k.scene.add(sty);
    const cam = core.camMove(k.camera, { from: [0, .1, 1.4], to: [0, .1, .9], look: [0, 0, 0], fov: 36 });
    return (t, u) => { cam(u, t); hand.position.x = Math.sin(t * 6) * .01 * core.clamp(t - 1); };
  },
  '5.7': async k => { const s = ringShot(k, 22); return (t, u) => { topCam(k, s.cp, 0, 34 - core.ease(u) * 14); s.place(t, 2.2 - core.ease(core.seg(t, 0, 2)) * .8); }; },
  '5.8': async k => {
    const s = ringShot(k, 16);
    const out = [0, 1].map(i => place(k.scene, senator(1240 + i, { mood: 'surprised' }), { pos: [0, 0, 0] }));
    const cam = core.camMove(k.camera, { from: [-5, 1.7, s.cp.z + 6], to: [3, 1.7, s.cp.z + 6], look: [-2, 1.2, s.cp.z + 1.6], lookTo: [2, 1.2, s.cp.z + 1.6], fov: 42 });
    return (t, u) => { cam(u, t); s.place(t, 1.6); out.forEach((p, i) => { const r = core.easeOut(core.seg(t, .4 + i * .5, 1.4 + i * .5)); p.position.set(-1.6 + i * 3.2, 0, s.cp.z + 3.4 + r * 1.3); p.rotation.y = P; }); };
  },
  '5.9': async k => {
    const s = ringShot(k, 16);
    const b = place(k.scene, brutus({ mood: 'sad' }), { pos: [.4, 0, s.cp.z + 3.2], rot: P + .2 });
    const cam = core.camMove(k.camera, { from: [2.8, 1.8, s.cp.z + 5.6], to: [2.2, 1.75, s.cp.z + 4.8], look: [.4, 1.6, s.cp.z + 3.2], fov: 38 });
    return (t, u) => { cam(u, t); s.place(t, 1.6); b.position.set(.4, 0, s.cp.z + 3.2); black(k, core.clamp((t - k.meta.seconds * .65) / .2)); };
  },
  '5.10': async k => {
    core.setEnv(k, 'dark', { noFog: true, noStars: true }); k.scene.background = new THREE.Color(0x050505);
    const note = props.card('PHYSICIAN ANTISTIUS', { h: 1.2, cw: 900, ch: 500, size: 70, sub: 'only one of the wounds was fatal', bg: '#e8dcbc' }); note.position.set(0, -.6, 0); k.scene.add(note);
    k.ownTally = true;
    const cam = core.camMove(k.camera, { from: [0, 0, 5], to: [0, 0, 4.6], look: [0, 0, 0], fov: 40 });
    return (t, u) => { cam(u, t); popIn(note, t, k.meta.seconds * .55); ui.tally(k.overlay, 'WOUNDS', Math.round(23 * core.ease(core.seg(t, .3, k.meta.seconds * .5))), 960, 300, t, .2); };
  },
  '5.11': async k => {
    core.setEnv(k, 'interior', { noFog: true, shadowSize: 6 }); k.scene.background = new THREE.Color(0x2a2018);
    const paper = props.card('', { h: 2, cw: 1000, ch: 700, bg: '#efe2c0', draw: x => { x.fillStyle = '#2b1e16'; x.font = 'italic 110px Georgia'; x.textAlign = 'center'; x.fillText('Et tu, Brute?', 500, 330); x.strokeStyle = '#b8321f'; x.lineWidth = 8; x.strokeRect(560, 500, 380, 120); x.fillStyle = '#b8321f'; x.font = '54px Anton'; x.fillText('SHAKESPEARE, 1599', 750, 580); } });
    paper.rotation.x = -.9; k.scene.add(paper);
    const quill = core.cyl(.02, .005, 1.2, 0xf0ece4, { rot: [0, 0, -.7] }); k.scene.add(quill);
    const cam = core.camMove(k.camera, { from: [0, 1.4, 2.6], to: [0, 1.1, 1.8], look: [0, 0, 0], fov: 40 });
    return (t, u) => { cam(u, t); quill.position.set(-.3 + core.clamp(t / 3) * .6, .55, .3); };
  },
  '5.12': async k => {
    core.setEnv(k, 'interior', { noFog: true }); k.scene.background = new THREE.Color(0x2a2018);
    const a = props.card('SILENCE', { h: 1.5, cw: 800, ch: 560, size: 120 }), b = props.card('KAI SU, TEKNON?', { h: 1.5, cw: 800, ch: 560, size: 80, sub: 'Greek: "you too, child?"' });
    a.position.x = -1.3; b.position.x = 1.3; k.scene.add(a, b);
    const cam = core.camMove(k.camera, { from: [0, 0, 5.4], to: [0, 0, 5], look: [0, 0, 0], fov: 40 });
    return (t, u) => { cam(u, t); a.rotation.y = (1 - core.ease(core.seg(t, .3, 1))) * P / 2; b.rotation.y = (1 - core.ease(core.seg(t, 1.6, 2.3))) * P / 2; };
  },
  '5.13': async k => {
    const cu = curia(k, { senators: false }); const cp = cu.chairPos;
    const tg = core.box(1.2, .08, .7, 0xf1ece0, { pos: [-2.6, .05, cp.z - .6], rot: [0, .4, 0] }); k.scene.add(tg);
    k.scene.traverse(o => { if (o.isPointLight) o.intensity *= .6; });
    const cam = core.camMove(k.camera, { from: [-1, .8, cp.z + 3], to: [-1.4, 4.6, cp.z + 3.6], look: [-2.6, .6, cp.z - .6], lookTo: [-3.2, 3.4, cp.z - 1.6], fov: 42 });
    return (t, u) => cam(u, t);
  },
};
