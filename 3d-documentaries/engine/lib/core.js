// Core of the 3D documentary engine: renderer, toon look, outlines, sky,
// easing, camera moves and the final frame finish (grain, vignette, sketch mode).
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const INK = 0x2b1e16;
export const W = 1920, H = 1080;

// ---------- easing + timing ----------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const easeInOut = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
export const easeIn = t => Math.pow(clamp(t), 3);
// pop with a small overshoot over ~0.24 s
export const pop = (t, start, dur = .24) => {
  const x = clamp((t - start) / dur);
  if (x <= 0) return 0;
  const c1 = 1.9, c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
export const seg = (t, a, b) => clamp((t - a) / (b - a));
// deterministic pseudo random
export function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

// ---------- materials ----------
let _grad;
function gradient() {
  if (_grad) return _grad;
  const d = new Uint8Array([140, 205, 255]);
  _grad = new THREE.DataTexture(d, 3, 1, THREE.RedFormat);
  _grad.minFilter = _grad.magFilter = THREE.NearestFilter; _grad.needsUpdate = true;
  return _grad;
}
const matCache = new Map();
export function toon(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!opts.unique && matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshToonMaterial({ color, gradientMap: gradient(), ...opts.mat });
  if (opts.emissive) { m.emissive = new THREE.Color(opts.emissive); m.emissiveIntensity = opts.ei ?? 1; }
  if (!opts.unique) matCache.set(key, m);
  return m;
}
export const basic = (color, o = {}) => new THREE.MeshBasicMaterial({ color, ...o });
const outlineMat = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });

// inverted-hull outline: a slightly larger back-face copy in ink brown
export function outline(mesh, thick = 0.035) {
  mesh.traverse(o => {
    if (!o.isMesh || o.userData.noOutline || o.userData.isOutline) return;
    const g = o.geometry; g.computeBoundingSphere();
    const r = g.boundingSphere.radius || 1;
    const hull = new THREE.Mesh(g, outlineMat);
    hull.userData.isOutline = true;
    const s = 1 + thick / Math.max(r, .05);
    hull.scale.setScalar(s);
    hull.position.copy(g.boundingSphere.center).multiplyScalar(1 - s);
    hull.castShadow = false; hull.receiveShadow = false;
    o.add(hull);
  });
  return mesh;
}

export function mesh(geo, color, opts = {}) {
  const m = new THREE.Mesh(geo, typeof color === 'object' && color.isMaterial ? color : toon(color, opts));
  m.castShadow = opts.cast ?? true; m.receiveShadow = opts.receive ?? true;
  if (opts.pos) m.position.set(...opts.pos);
  if (opts.rot) m.rotation.set(...opts.rot);
  if (opts.scale) Array.isArray(opts.scale) ? m.scale.set(...opts.scale) : m.scale.setScalar(opts.scale);
  if (opts.noOutline) m.userData.noOutline = true;
  return m;
}
export const box = (w, h, d, c, o) => mesh(new THREE.BoxGeometry(w, h, d), c, o);
export const cyl = (rt, rb, h, c, o = {}) => mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg ?? 20), c, o);
export const sph = (r, c, o = {}) => mesh(new THREE.SphereGeometry(r, o.seg ?? 24, o.seg2 ?? 16), c, o);
export const group = (...kids) => { const g = new THREE.Group(); kids.forEach(k => k && g.add(k)); return g; };

// ---------- text on a canvas texture ----------
export function textCanvas(text, o = {}) {
  const size = o.size ?? 96, font = o.font ?? 'Anton', pad = o.pad ?? 24;
  const c = document.createElement('canvas'); const x = c.getContext('2d');
  x.font = `${o.weight ?? ''} ${size}px "${font}"`;
  const lines = String(text).split('\n');
  const w = Math.ceil(Math.max(...lines.map(l => x.measureText(l).width))) + pad * 2;
  const h = Math.ceil(size * 1.15 * lines.length) + pad * 2;
  c.width = o.w ?? w; c.height = o.h ?? h;
  x.font = `${o.weight ?? ''} ${size}px "${font}"`;
  if (o.bg) { x.fillStyle = o.bg; x.fillRect(0, 0, c.width, c.height); }
  x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((l, i) => {
    const y = pad + size * 1.15 * (i + .5);
    if (o.stroke) { x.lineJoin = 'round'; x.lineWidth = o.strokeW ?? size * .14; x.strokeStyle = o.stroke; x.strokeText(l, c.width / 2, y); }
    x.fillStyle = o.color ?? '#fff'; x.fillText(l, c.width / 2, y);
  });
  return c;
}
export function textPlane(text, height, o = {}) {
  const c = textCanvas(text, o);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(height * c.width / c.height, height),
    new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: o.depthWrite ?? false, side: THREE.DoubleSide, toneMapped: false }));
  m.userData.noOutline = true; m.castShadow = false;
  return m;
}

// ---------- environment presets ----------
export const SKIES = {
  night:  { top: '#0d1a3c', mid: '#24386a', bot: '#3d4f80', fog: 0x26345e, amb: 0x8a9ad0, ambI: 2.4, sun: 0xb8c8ff, sunI: 2.7, sunPos: [-30, 60, 20], stars: true },
  dawn:   { top: '#304a7a', mid: '#d98e6c', bot: '#f3c48e', fog: 0xd9a483, amb: 0xffd6b8, ambI: .7, sun: 0xffc48a, sunI: 1.4, sunPos: [80, 18, -40] },
  day:    { top: '#4f8fd0', mid: '#9cc6e8', bot: '#e8dcc0', fog: 0xd8d2bd, amb: 0xfff2dc, ambI: .75, sun: 0xfff1d2, sunI: 1.8, sunPos: [40, 70, 30] },
  dusk:   { top: '#24305e', mid: '#b5546a', bot: '#f0a35e', fog: 0xb07060, amb: 0xffb69a, ambI: .65, sun: 0xff9a5c, sunI: 1.3, sunPos: [-80, 14, -30] },
  interior: { top: '#3a2c22', mid: '#3a2c22', bot: '#3a2c22', fog: 0x3a2c22, amb: 0xffe6c4, ambI: .8, sun: 0xffe2b5, sunI: 1.2, sunPos: [10, 30, 15] },
  dark:   { top: '#070a14', mid: '#0e1424', bot: '#182034', fog: 0x0e1424, amb: 0x6a78a8, ambI: 1.0, sun: 0x9aaad8, sunI: 1.0, sunPos: [-20, 40, 20] },
};

function skyTexture(p) {
  const c = document.createElement('canvas'); c.width = 16; c.height = 512;
  const x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, p.top); g.addColorStop(.55, p.mid); g.addColorStop(1, p.bot);
  x.fillStyle = g; x.fillRect(0, 0, 16, 512);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function setEnv(ctx, name, o = {}) {
  const p = { ...SKIES[name], ...o };
  const { scene } = ctx;
  scene.background = skyTexture(p);
  scene.fog = o.noFog ? null : new THREE.Fog(p.fog, o.fogNear ?? 60, o.fogFar ?? 420);
  const amb = new THREE.HemisphereLight(p.amb, 0x5a4a3a, p.ambI * 2.2); scene.add(amb);
  const sun = new THREE.DirectionalLight(p.sun, p.sunI * 2.2);
  sun.position.set(...p.sunPos); sun.castShadow = true;
  const s = o.shadowSize ?? 40;
  Object.assign(sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 400 });
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006; sun.shadow.normalBias = .03;
  sun.target.position.set(...(o.target ?? [0, 0, 0]));
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(p.amb, p.sunI * (o.fill ?? .9)); fill.position.set(-p.sunPos[0], Math.abs(p.sunPos[1]) * .6, -p.sunPos[2] + 40); scene.add(fill);
  if (p.stars && !o.noStars) {
    const r = rng(7), pts = [];
    for (let i = 0; i < 1500; i++) {
      const th = r() * Math.PI * 2, ph = r() * Math.PI * .45;
      pts.push(Math.cos(th) * Math.cos(ph) * 900, Math.sin(ph) * 900 + 20, Math.sin(th) * Math.cos(ph) * 900);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, fog: false })));
  }
  return { amb, sun, p };
}

// ---------- camera moves ----------
// cam({from:[x,y,z], to:[x,y,z], look:[x,y,z], lookTo:[...], fov, fovTo, e:easing}) -> fn(u)
export function camMove(camera, c) {
  const f = new THREE.Vector3(...c.from), t = new THREE.Vector3(...(c.to ?? c.from));
  const l0 = new THREE.Vector3(...(c.look ?? [0, 0, 0])), l1 = new THREE.Vector3(...(c.lookTo ?? c.look ?? [0, 0, 0]));
  const e = c.e ?? easeInOut;
  return (u, time = 0) => {
    const k = e(u);
    camera.position.lerpVectors(f, t, k);
    // tiny handheld drift so the camera never stops
    const d = c.drift ?? .04;
    camera.position.x += Math.sin(time * .7) * d; camera.position.y += Math.sin(time * .53 + 1) * d * .6;
    camera.lookAt(new THREE.Vector3().lerpVectors(l0, l1, k));
    const fov = lerp(c.fov ?? 40, c.fovTo ?? c.fov ?? 40, k);
    if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
  };
}

// ---------- renderer + finish pass ----------
const finishFrag = `
uniform sampler2D tDiffuse; uniform vec2 res; uniform float time; uniform float grain; uniform float sketch; uniform float vig; uniform float fade;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)) + time*13.17) * 43758.5453); }
float lum(vec3 c){ return dot(c, vec3(.299,.587,.114)); }
void main(){
  vec3 col = texture2D(tDiffuse, vUv).rgb;
  if (sketch > .5) {
    vec2 px = 1.5/res; float tl=lum(texture2D(tDiffuse,vUv+px*vec2(-1,1)).rgb), t=lum(texture2D(tDiffuse,vUv+px*vec2(0,1)).rgb), tr=lum(texture2D(tDiffuse,vUv+px*vec2(1,1)).rgb);
    float l=lum(texture2D(tDiffuse,vUv+px*vec2(-1,0)).rgb), r=lum(texture2D(tDiffuse,vUv+px*vec2(1,0)).rgb);
    float bl=lum(texture2D(tDiffuse,vUv+px*vec2(-1,-1)).rgb), b=lum(texture2D(tDiffuse,vUv+px*vec2(0,-1)).rgb), br=lum(texture2D(tDiffuse,vUv+px*vec2(1,-1)).rgb);
    float gx = -tl-2.*l-bl+tr+2.*r+br, gy = -tl-2.*t-tr+bl+2.*b+br;
    float edge = smoothstep(.08,.35,sqrt(gx*gx+gy*gy));
    float L = lum(col);
    float tone = floor(L*4.)/4.;
    vec3 paper = vec3(.96,.93,.86);
    // diagonal pencil hatching in the darker tones
    float hatch = step(.5, fract((gl_FragCoord.x + gl_FragCoord.y)/6.)) * step(tone, .26) * .35
                + step(.5, fract((gl_FragCoord.x - gl_FragCoord.y)/7.)) * step(tone, .51) * .18;
    vec3 c = paper * (.62 + .38*tone) - hatch*.25;
    c = mix(c, vec3(.18,.14,.11), edge);
    c += (hash(vUv*res)-.5)*.05;
    gl_FragColor = vec4(c,1.); return;
  }
  // warm grade
  col = mix(col, col*vec3(1.04,1.0,.93), .6);
  vec2 q = vUv-.5; float v = 1. - dot(q,q)*vig; col *= v;
  col += (hash(vUv*res)-.5)*grain;
  col *= fade;
  gl_FragColor = vec4(col,1.);
}`;

// render speed (set from the page URL, e.g. page.html?q=fast): fewer AA samples, lighter AO, smaller sun shadow map
export const Q = (() => { try { const m = /[?&]q=(\w+)/.exec(location.search); return m ? m[1] : 'full'; } catch (e) { return 'full'; } })();
// 3D render scale (page.html?s=0.75): the 3D image is drawn smaller and upscaled; text overlays stay full 1920x1080
export const RS = (() => { try { const m = /[?&]s=([\d.]+)/.exec(location.search); return m ? +m[1] : 1; } catch (e) { return 1; } })();
export function createRenderer(canvas, w = W, h = H) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(w, h, false);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4, colorSpace: THREE.SRGBColorSpace });
  const fsScene = new THREE.Scene(), fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uni = { tDiffuse: { value: rt.texture }, res: { value: new THREE.Vector2(w, h) }, time: { value: 0 }, grain: { value: .02 }, sketch: { value: 0 }, vig: { value: .9 }, fade: { value: 1 } };
  const fsMat = new THREE.ShaderMaterial({ uniforms: uni, vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }', fragmentShader: finishFrag, depthTest: false });
  fsScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fsMat));
  return {
    renderer, uni,
    render(scene, camera, time) {
      uni.time.value = time;
      // realistic look: ambient occlusion (contact shadows in corners and under people) + soft glow on bright lights
      const fx = scene.userData.fx;
      if (fx) {
        if (!this.comp) {
          const comp = new EffectComposer(renderer, new THREE.WebGLRenderTarget(w, h, { samples: Q === 'fast' ? 2 : 4, type: THREE.HalfFloatType }));
          comp.renderToScreen = false;
          const rp = new RenderPass(scene, camera); comp.addPass(rp);
          const ao = Q === 'fast' ? new GTAOPass(scene, camera, w / 2, h / 2) : new GTAOPass(scene, camera, w, h); ao.output = GTAOPass.OUTPUT.Default; comp.addPass(ao);
          const bl = new UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), .22, .5, .92); comp.addPass(bl);
          comp.addPass(new OutputPass());
          this.comp = { comp, rp, ao, bl };
        }
        const { comp, rp, ao, bl } = this.comp;
        rp.scene = ao.scene = scene; rp.camera = ao.camera = camera;
        ao.updateGtaoMaterial({ radius: fx.aoRadius ?? .5, distanceExponent: 1.5, thickness: 1, scale: fx.ao ?? 1, samples: Q === 'fast' ? 8 : 12 });
        bl.strength = fx.bloom ?? .22; bl.threshold = fx.bloomThreshold ?? .92;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // the finish pass does the sRGB encode
        comp.render();
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        uni.tDiffuse.value = comp.readBuffer.texture; uni.srgbIn = true;
        renderer.setRenderTarget(null); renderer.toneMapping = THREE.NoToneMapping; renderer.render(fsScene, fsCam);
        uni.tDiffuse.value = rt.texture;
        return;
      }
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.setRenderTarget(rt); renderer.render(scene, camera);
      renderer.setRenderTarget(null); renderer.toneMapping = THREE.NoToneMapping; renderer.render(fsScene, fsCam);
    }
  };
}
export { THREE };
