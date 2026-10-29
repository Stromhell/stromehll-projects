// Page runtime: builds one shot, renders frame t, composites the 2D overlay
// and hands back a JPEG. Driven by render.js through Playwright.
import * as THREE from 'three';
import * as core from './core.js';
import * as people from './people.js';
import * as props from './props.js';
import * as maps from './maps.js';
import * as ui from './ui.js';
import * as real from './real.js';

const gl = document.getElementById('gl');
const out = document.getElementById('out'); const ox = out.getContext('2d');
const ov = document.createElement('canvas'); ov.width = core.W; ov.height = core.H; const vx = ov.getContext('2d');
gl.width = Math.round(core.W * core.RS); gl.height = Math.round(core.H * core.RS);
const R = core.createRenderer(gl, gl.width, gl.height);
let cur = null;

function projectBoxes(scene, camera) {
  const boxes = []; const v = new THREE.Vector3(); const b = new THREE.Box3();
  scene.traverse(o => {
    if (!o.userData.person || !o.visible) return;
    b.setFromObject(o); if (b.isEmpty()) return;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, front = false;
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z).project(camera);
      if (v.z < 1) front = true;
      const sx = (v.x + 1) / 2 * core.W, sy = (1 - v.y) / 2 * core.H;
      x0 = Math.min(x0, sx); y0 = Math.min(y0, sy); x1 = Math.max(x1, sx); y1 = Math.max(y1, sy);
    }
    if (front) boxes.push([x0, y0, x1, y1]);
  });
  return boxes;
}

window.loadShot = async (modPath, meta, opts = {}) => {
  await document.fonts.ready;
  const mod = await import(modPath + '?v=' + Date.now());
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, core.W / core.H, .1, 3000);
  const kit = { THREE, scene, camera, core, people, props, maps, ui, real, meta, opts, overlay: null, renderer: R.renderer };
  const fn = mod.shots[meta.id];
  if (!fn) throw new Error('no shot ' + meta.id);
  const upd = await fn(kit);
  R.renderer.toneMappingExposure = kit.exposure ?? 1.05;
  if (opts.checkOverlap) kit.hits = real.overlaps(scene);
  const dur = meta.seconds;
  const chunks = opts.subs === false ? [] : ui.chunk(meta.narration, (meta.voA ?? .15), (meta.voB ?? dur - .25));
  R.uni.sketch.value = opts.sketch ? 1 : 0;
  cur = { scene, camera, upd, kit, dur, chunks, meta, opts };
  return { dur, hits: kit.hits };
};

window.frame = (t, fmt = 'jpeg', q = .93) => {
  const { scene, camera, upd, kit, dur, chunks, meta, opts } = cur;
  const u = core.clamp(t / dur);
  vx.clearRect(0, 0, core.W, core.H); ui.used.length = 0;
  kit.overlay = vx;
  // fade in/out at act edges
  R.uni.fade.value = (meta.fadeIn ? core.clamp(t / .6) : 1) * (meta.fadeOut ? core.clamp((dur - t) / .8) : 1) * (meta.black ? 0 : 1);
  scene.traverse(o => { if (o.userData.person && o.userData.auto !== false && !o.userData.driven) o.update(t); });
  upd && upd(t, u);
  R.render(scene, camera, t);
  ox.imageSmoothingQuality = 'high'; ox.drawImage(gl, 0, 0, core.W, core.H);
  if (!opts.sketch || opts.sketchUI) {
    if (meta.dateTag && !meta.noTag) ui.dateTag(vx, meta.dateTag, t);
    // overlay column from the script: callout / chip / tally
    const ovs = (meta.overlay || '').split(';').map(s => s.trim()).filter(Boolean);
    for (const o of ovs) {
      const m = o.match(/^(callout|chip|tally):\s*(.*)$/i); if (!m || kit.noAutoOverlay) continue;
      const [a, b] = m[2].split('/').map(s => s.trim());
      let px = 1480, py = 300;
      if (kit.anchor) { const v = new THREE.Vector3(...kit.anchor).project(camera); px = (v.x + 1) * 960; py = (1 - v.y) * 540; }
      if (m[1] === 'callout') ui.callout(vx, a, b, kit.calloutPos?.[0] ?? px, kit.calloutPos?.[1] ?? py, t, kit.overlayStart ?? .6);
      if (m[1] === 'chip') ui.chip(vx, a.toUpperCase(), kit.chipPos?.[0] ?? 960, kit.chipPos?.[1] ?? 220, t, kit.overlayStart ?? .8);
      if (m[1] === 'tally' && !kit.ownTally) ui.tally(vx, '', a, 960, 120, t, .3);
    }
    if (!opts.sketch && chunks.length) ui.subtitles(vx, chunks, t, [...projectBoxes(scene, camera), ...ui.used.map(b => [b[0] - 20, b[1] - 20, b[2] + 20, b[3] + 20]).flatMap(b => [b, b, b, b, b])]);
  }
  ox.drawImage(ov, 0, 0);
  return out.toDataURL('image/' + fmt, q);
};
