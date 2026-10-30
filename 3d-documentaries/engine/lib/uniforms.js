// Airline crew uniforms layered on MakeHuman people: peaked cap with gold band and badge,
// gold-striped shoulder boards (captain 4, first officer 3, flight engineer 2) and pilot wings on the chest.
import * as THREE from 'three';
const P = Math.PI;
export const CREW_STRIPES = { tb_bacos: 4, tb_copilot: 3, tb_engineer: 2 };
const navy = () => new THREE.MeshStandardMaterial({ color: 0x141b33, roughness: .7 });
const gold = () => new THREE.MeshStandardMaterial({ color: 0xd8a83a, roughness: .3, metalness: 1 });
const black = () => new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: .25, metalness: .2 });
function put(p, obj, bone, off, rot = [0, 0, 0]) {
  const b = p.parts.bones[bone]; if (!b) return null;
  const s = 1 / p.parts.obj.scale.x; obj.scale.multiplyScalar(s);
  obj.position.set(off[0] * s, off[1] * s, off[2] * s); obj.rotation.set(...rot); b.add(obj);
  obj.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; c.userData.solid = false; } });
  return obj;
}
export function pilotCap() {
  // flat-topped airline cap: wide crown, gold band hugging the head, black peak
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(.138, .114, .062, 36), navy()));
  const top = new THREE.Mesh(new THREE.CylinderGeometry(.14, .138, .012, 36), navy()); top.position.y = .035; g.add(top);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(.117, .116, .03, 36, 1, true), gold()); band.position.y = -.03; band.material.side = THREE.DoubleSide; g.add(band);
  const visor = new THREE.Mesh(new THREE.CylinderGeometry(.118, .118, .008, 32, 1, false, -P / 2.6, P / 1.3), black()); visor.scale.set(1, 1, 1.35); visor.position.set(0, -.042, .025); visor.rotation.x = -.12; g.add(visor);
  const badge = new THREE.Mesh(new THREE.CircleGeometry(.018, 16), gold()); badge.position.set(0, .0, .128); g.add(badge);
  const w = new THREE.Mesh(new THREE.BoxGeometry(.07, .008, .002), gold()); w.position.set(0, .0, .128); g.add(w);
  g.traverse(c => { if (c.isMesh && c !== band) c.material.side = THREE.DoubleSide; });
  return g;
}
export function dressCrew(p, id) {
  const n = CREW_STRIPES[id]; if (!n || !p?.parts?.bones) return;
  const s = p.parts.obj.scale.x;
  const cap = pilotCap(); cap.scale.setScalar(.93); put(p, cap, 'Head', [0, .178, -.005]);
  // shoulder boards with gold rank stripes (captain 4, first officer 3, engineer 2), riding the upper chest bone
  for (const sx of [-1, 1]) {
    const bd = new THREE.Group(); bd.add(new THREE.Mesh(new THREE.BoxGeometry(.05, .006, .12), navy()));
    for (let i = 0; i < n; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(.052, .008, .007), gold()); st.position.set(0, .001, .045 - i * .016); bd.add(st); }
    put(p, bd, 'Spine2', [sx * .15, .19, .0], [0, sx * .12, -sx * .32]);
  }
  const wings = new THREE.Group(); wings.add(new THREE.Mesh(new THREE.BoxGeometry(.075, .012, .004), gold())); const c = new THREE.Mesh(new THREE.CircleGeometry(.01, 12), gold()); c.position.z = .003; wings.add(c);
  put(p, wings, 'Spine2', [-.09, .08, .155]);
}
