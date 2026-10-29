// Operation Thunderbolt · Act 4 · THE SELECTION
import { core, props, people, maps, ui, THREE, place, interior, hijacker, ugSoldier, bacos, popIn, cardRow, airstrip, hall, hostages, silhouetteDraw } from './tb_common.js';
const P = Math.PI;
export const shots = {
  // a hijacker at a table with a stack of passports, reading aloud
  '4.1': async k => {
    hall(k, { mattresses: false, lampI: 20 });
    const tb = props.table(2, 1); tb.position.set(0, 0, 0); k.scene.add(tb);
    const pp = props.passports(10); pp.position.set(-.4, .82, 0); k.scene.add(pp);
    const open = core.box(.32, .02, .22, 0x2a3a6a, { pos: [.2, .83, .15] }); k.scene.add(open);
    const ch = props.chair(); ch.position.set(0, 0, -.8); k.scene.add(ch);
    const h = place(k.scene, hijacker(80, { silhouette: false }), { pos: [0, .02, -.75], rot: 0, pose: 'sitDesk' });
    const cam = core.camMove(k.camera, { from: [1.6, 1.4, 2.4], to: [1.1, 1.35, 1.8], look: [0, 1.1, -.2], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // passengers led through a doorway into a second room
  '4.2': async k => {
    interior(k, { w: 16, d: 10, h: 4.5, wall: 0xcfc2a0, floor: 0x8a7a60, lampI: 24 });
    // dividing wall with doorway
    k.scene.add(core.box(.3, 4.5, 4, 0xbfb290, { pos: [0, 2.25, -3] }), core.box(.3, 4.5, 4, 0xbfb290, { pos: [0, 2.25, 3] }), core.box(.3, 2, 2, 0xbfb290, { pos: [0, 3.5, 0] }));
    const line = []; for (let i = 0; i < 9; i++) { const p = people.person({ outfit: ['civil1', 'civil2', 'dress1', 'suit', 'civil3', 'dress2'][i % 6], seed: 600 + i, mood: 'worried', hair: [0x2b1e16, 0x9a9a9a, 0x5a3a22][i % 3], hat: i % 4 === 0 ? 'kippah' : undefined }); p.state.pose = 'walk'; k.scene.add(p); line.push(p); }
    const g = place(k.scene, hijacker(81), { pos: [-.9, 0, 1.3], rot: -P / 2, arm: 'point' });
    const cam = core.camMove(k.camera, { from: [-5, 2.2, 8], to: [-3.5, 2, 7], look: [0, 1.3, 0], fov: 44 });
    return (t, u) => { cam(u, t); line.forEach((p, i) => { const x = -7 + t * 1.0 - i * 1.1 + 4; p.position.set(x, 0, Math.sin(i) * .2); p.rotation.y = P / 2; p.update(t + i, { pose: 'walk', dist: t }); }); };
  },
  // an elderly man looks down at his sleeve; soft sepia vignette
  '4.3': async k => {
    hall(k, { mattresses: false, lampI: 14 });
    const m = place(k.scene, people.person({ outfit: 'grey', hair: 0xc8c8c8, seed: 610, mood: 'sad', glasses: true }), { pos: [0, 0, 0], rot: .3 });
    m.state.arm = 'hold';
    const cam = core.camMove(k.camera, { from: [.8, 1.9, 2.4], to: [.6, 1.85, 1.9], look: [0, 1.5, 0], fov: 36 });
    return (t, u) => { cam(u, t); m.update(t, { arm: 'hold' }); m.parts.head.rotation.x = .45; const x = k.overlay; const g = x.createRadialGradient(960, 540, 300, 960, 540, 1100); g.addColorStop(0, 'rgba(120,80,40,0)'); g.addColorStop(1, 'rgba(90,60,30,.55)'); x.fillStyle = g; x.fillRect(0, 0, 1920, 1080); };
  },
  // an elderly woman helped into a Ugandan ambulance
  '4.4': async k => {
    const set = airstrip(k, { env: 'day', terminal: true });
    const amb = props.truck({ color: 0xe8e8e0, back: 0xe8e8e0, cross: true }); amb.position.set(-70, 0, -60); amb.rotation.y = .3; k.scene.add(amb);
    const dora = place(k.scene, people.person({ outfit: 'dress2', hair: 0xd8d8d8, seed: 620, mood: 'worried', glasses: true }), { pos: [-72.5, 0, -56.6], rot: -1.4 });
    const helper = place(k.scene, ugSoldier(621, { hat: null }), { pos: [-72, 0, -55.6], rot: -1.8, arm: 'hold' });
    k.anchor = [-72.5, 2.6, -56.6];
    const cam = core.camMove(k.camera, { from: [-64, 2, -48], to: [-66, 1.9, -50], look: [-72, 1.3, -57], fov: 40 });
    return (t, u) => cam(u, t);
  },
  // the ambulance drives off into the dark
  '4.5': async k => {
    const set = airstrip(k, { env: 'dusk', terminal: true });
    const amb = props.truck({ color: 0xe8e8e0, back: 0xe8e8e0, cross: true }); k.scene.add(amb);
    const tl = new THREE.PointLight(0xff4a3a, 8, 8); tl.position.set(-3, 1.5, 0); amb.add(tl);
    const cam = core.camMove(k.camera, { from: [-62, 2, -48], to: [-60, 2.2, -46], look: [-70, 1.5, -60], lookTo: [-80, 2, -90], fov: 40 });
    return (t, u) => { cam(u, t); const d = core.easeIn(core.seg(t, .2, k.meta.seconds)) * 40; amb.position.set(-70 - d * .4, 0, -60 - d); amb.rotation.y = P / 2 - .38; amb.roll(d); tl.intensity = 6 + 4 * Math.sin(t * 6); };
  },
  // groups of hostages walk to a waiting jet; counter of released
  '4.6': async k => {
    const set = airstrip(k, { env: 'day', terminal: true });
    const jet = props.airliner({ engines: 2, stripe: 0x6a6a6a }); jet.position.set(-30, 0, -40); jet.rotation.y = P / 2; k.scene.add(jet);
    const grp = []; for (let i = 0; i < 16; i++) { const p = people.person({ outfit: ['civil1', 'civil2', 'civil3', 'civil4', 'dress1', 'dress2'][i % 6], seed: 640 + i, mood: 'calm', hair: [0x2b1e16, 0x5a3a22, 0x8a6a3a][i % 3] }); k.scene.add(p); grp.push(p); }
    k.ownTally = true;
    const cam = core.camMove(k.camera, { from: [-50, 5, -18], to: [-46, 4, -22], look: [-34, 1.5, -36], fov: 42 });
    return (t, u) => { cam(u, t); grp.forEach((p, i) => { const d = t * 1.2 + (i % 4) * 1.4; p.position.set(-58 + d * .7 + Math.floor(i / 4) * 1.2, 0, -26 - d * .45 + (i % 4) * .9); p.rotation.y = 2.14; p.update(t + i, { pose: 'walk', dist: t * 1.2 }); });
      ui.tally(k.overlay, 'RELEASED', Math.round(148 * core.ease(core.seg(t, .8, k.meta.seconds - 1))), 960, 120, t, .3); };
  },
  // Bacos stands in front of his twelve crew, arms folded
  '4.7': async k => {
    hall(k, { mattresses: false, lampI: 24 });
    const b = place(k.scene, people.person({ outfit: 'pilot', hat: 'pilot', mood: 'stern', seed: 31, moustache: true, hair: 0x9a9a9a }), { pos: [0, 0, 3], rot: 0, arm: 'folded' });
    for (let i = 0; i < 12; i++) place(k.scene, people.person({ outfit: i % 3 ? 'pilot' : 'dress2', top: i % 3 ? 0xf2f2ee : 0x2a3a5a, seed: 650 + i, mood: 'calm', hat: i % 3 === 1 ? 'pilot' : undefined, hair: [0x2b1e16, 0x5a3a22, 0x8a6a3a][i % 3] }), { pos: [-3.3 + (i % 6) * 1.3, 0, 1 - Math.floor(i / 6) * 1.2], rot: 0 });
    const cam = core.camMove(k.camera, { from: [0, 1.2, 9.5], to: [0, 1.4, 8], look: [0, 1.4, 1.5], fov: 42 });
    return (t, u) => cam(u, t);
  },
  // hall with the remaining hostages; tally card changes
  '4.8': async k => {
    const h = hall(k, { nMat: 18 }); hostages(k, h.mats, { seed: 8, mixed: true, skip: .35 });
    const cam = core.camMove(k.camera, { from: [-6, 6, 12], to: [-3, 5, 10], look: [0, .5, 2], fov: 46 });
    return (t, u) => cam(u, t);
  },
  // the plane to Paris climbs away; the hijackers' card dims (no gag X)
  '4.9': async k => {
    core.setEnv(k, 'day', { fogNear: 200, fogFar: 1200 }); k.scene.add(props.clouds(40, { y: -40, w: 800, d: 800, color: 0xe8ecf2 }));
    const jet = props.airliner({ engines: 2, stripe: 0x6a6a6a }); k.scene.add(jet);
    const cam = core.camMove(k.camera, { from: [-30, -4, 50], to: [-40, -6, 46], look: [0, 0, 0], lookTo: [0, 10, -40], fov: 40 });
    return (t, u) => { cam(u, t); jet.position.set(0, t * 2.5, -t * 9); jet.rotation.x = -.15; };
  },
};
