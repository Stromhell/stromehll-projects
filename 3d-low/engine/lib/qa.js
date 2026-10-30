// Strict overlap checker for the 3D low (cartoon) line.
// Finds: people inside other people, people inside props/furniture/walls,
// feet below the floor, and props inside each other. Runs on the first frame of
// every shot in `stills` mode and on a few sample frames in `video` mode.
// A hit = { kind, a, b, depth } ; shots must come back clean ("QA CLEAN") before render.
import * as THREE from 'three';

const _b = new THREE.Box3(), _c = new THREE.Box3();
// solid parts of a person: head + torso + hips (hands and feet swing, so they get a looser test)
function personBoxes(p) {
  const out = [];
  const { head, torso } = p.parts;
  for (const o of [head, torso]) { const b = new THREE.Box3().setFromObject(o); if (!b.isEmpty()) out.push(b); }
  return out;
}
function label(o) { return o.userData.qaName || o.name || (o.userData.person ? 'person' : o.type); }
function depth(a, b) {
  const x = Math.min(a.max.x, b.max.x) - Math.max(a.min.x, b.min.x);
  const y = Math.min(a.max.y, b.max.y) - Math.max(a.min.y, b.min.y);
  const z = Math.min(a.max.z, b.max.z) - Math.max(a.min.z, b.min.z);
  return Math.min(x, y, z);
}
export function overlaps(scene, opts = {}) {
  scene.updateMatrixWorld(true);
  const people = [], props = [];
  scene.traverse(o => {
    if (!o.visible) return;
    if (o.userData.person) { people.push(o); return; }
    if (o.userData.qaSolid) props.push(o);
  });
  const hits = [];
  const tol = opts.tol ?? .03;
  // person vs person (solid core boxes)
  for (let i = 0; i < people.length; i++) for (let j = i + 1; j < people.length; j++) {
    const A = personBoxes(people[i]), B = personBoxes(people[j]);
    for (const a of A) for (const b of B) { if (a.intersectsBox(b)) { const d = depth(a, b); if (d > tol) hits.push({ kind: 'person-person', a: label(people[i]), b: label(people[j]), depth: +d.toFixed(3) }); } }
  }
  // person vs solid prop
  for (const p of people) {
    const A = personBoxes(p);
    for (const q of props) {
      if (q === p || isAncestor(q, p) || p.userData.allow?.includes(q.userData.qaName)) continue;
      _c.setFromObject(q); if (_c.isEmpty()) continue;
      for (const a of A) if (a.intersectsBox(_c)) { const d = depth(a, _c); if (d > tol) hits.push({ kind: 'person-prop', a: label(p), b: label(q), depth: +d.toFixed(3) }); }
    }
    // feet below the floor the person stands on (userData.floorY, default 0)
    const floor = p.userData.floorY ?? 0;
    const feet = [p.parts.legL.end, p.parts.legR.end];
    for (const f of feet) { _b.setFromObject(f); if (!_b.isEmpty() && _b.min.y < floor - .06 && p.state.pose !== 'lie') { hits.push({ kind: 'feet-in-floor', a: label(p), b: 'floor', depth: +(floor - _b.min.y).toFixed(3) }); break; } }
  }
  // prop vs prop (only props marked qaSolid)
  for (let i = 0; i < props.length; i++) for (let j = i + 1; j < props.length; j++) {
    if (isAncestor(props[i], props[j]) || isAncestor(props[j], props[i])) continue;
    _b.setFromObject(props[i]); _c.setFromObject(props[j]);
    if (!_b.isEmpty() && !_c.isEmpty() && _b.intersectsBox(_c)) { const d = depth(_b, _c); if (d > (opts.propTol ?? .08)) hits.push({ kind: 'prop-prop', a: label(props[i]), b: label(props[j]), depth: +d.toFixed(3) }); }
  }
  return hits;
}
function isAncestor(a, o) { for (let p = o.parent; p; p = p.parent) if (p === a) return true; return false; }
// mark a prop as solid for the checker and give it a name for the report
export function solid(o, name) { o.userData.qaSolid = true; if (name) o.userData.qaName = name; return o; }
