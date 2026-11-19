/* Video 13 v2: camera "life" layer. Every shot gets a slow breathing push/pull + small truck so no frame sits still.
   Long shots alternate push-in and pull-out every ~6 s (eased, zero speed at the joins). Shots can opt out with noLife. */
function addLife() {
  const LIFE = { lt: 0, d: 1, i: 0, on: false };
  TL.forEach((s, i) => { if (!s.f || s.noLife) return; const f = s.f; s.f = (lt, d, L) => { LIFE.lt = lt; LIFE.d = d; LIFE.i = i; LIFE.on = true; const r = f(lt, d, L); return r; }; });
  const orig = R.render.bind(R);
  R.render = (scene, cam) => {
    if (!LIFE.on || !cam.isPerspectiveCamera) return orig(scene, cam);
    LIFE.on = false;
    const p = cam.position.clone(), fov = cam.fov;
    const { lt, d, i } = LIFE; const n = Math.max(1, Math.round(d / 6)); const sl = d / n; const k = Math.min(n - 1, Math.floor(lt / sl)); const u = (lt - k * sl) / sl; const e = u * u * (3 - 2 * u);
    const inward = (k + i) % 2 === 0; const z = inward ? e : 1 - e;            // 0 = as authored, 1 = pushed in
    cam.fov = fov * (1 - 0.085 * z);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    const side = ((i * 7) % 3 - 1) || 1; cam.position.addScaledVector(right, side * 0.16 * (z - 0.5));
    cam.position.y += 0.035 * Math.sin(lt * 0.9 + i);
    cam.updateProjectionMatrix();
    const out = orig(scene, cam);
    cam.position.copy(p); cam.fov = fov; cam.updateProjectionMatrix();
    return out;
  };
}
