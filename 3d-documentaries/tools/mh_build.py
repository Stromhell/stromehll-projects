#!/usr/bin/env python3
"""Build realistic rigged people (GLB) from MakeHuman CC0 data, without Blender.

Reads the MakeHuman base mesh, macro targets (gender, age, weight, muscle, height, ethnicity),
CC0 skins, eyes, brows, lashes, hair and clothes, fits the clothes to the body (.mhclo),
builds a Mixamo-named skeleton with skin weights, adds face morphs (blink, smile, brows, mouth)
and writes one GLB per person.

Usage: python3 mh_build.py cast.json OUT_DIR
cast.json: [{"id":"pax_m1","gender":1,"age":.5,"weight":.5,"muscle":.5,"height":.5,
             "race":{"caucasian":1},"skin":"young_caucasian_male","eyes":"brown","brows":"eyebrow001",
             "lashes":"eyelashes01","hair":"short02","clothes":["male_casualsuit01","shoes01"],
             "tint":{"male_casualsuit01":[0.4,0.3,0.2]}}]
Data roots: MH_DATA (mpfb/data) and MH_ASSETS (system assets pack), default /home/user/mh/...
"""
import gzip, json, os, struct, sys, io
import numpy as np
from PIL import Image

DATA = os.environ.get('MH_DATA', '/home/user/mh/mpfb/data')
ASSETS = os.environ.get('MH_ASSETS', '/home/user/mh/assets')
TEX = int(os.environ.get('MH_TEX', '1024'))

# ---------------- obj ----------------
_obj_cache = {}
def load_obj(path):
    if path in _obj_cache: return _obj_cache[path]
    V, T, F, G = [], [], [], []
    grp = ''
    for line in open(path, encoding='utf-8', errors='ignore'):
        if line.startswith('v '): V.append([float(x) for x in line.split()[1:4]])
        elif line.startswith('vt '): T.append([float(x) for x in line.split()[1:3]])
        elif line.startswith('g '): grp = line.split()[1] if len(line.split()) > 1 else ''
        elif line.startswith('f '):
            vs, ts = [], []
            for p in line.split()[1:]:
                a = p.split('/'); vs.append(int(a[0]) - 1); ts.append(int(a[1]) - 1 if len(a) > 1 and a[1] else -1)
            F.append((vs, ts)); G.append(grp)
    r = (np.array(V, np.float64), np.array(T, np.float64) if T else np.zeros((0, 2)), F, G)
    _obj_cache[path] = r; return r

def load_target(rel):
    p = os.path.join(DATA, 'targets', rel + '.target.gz')
    if not os.path.exists(p): return None
    idx, d = [], []
    with gzip.open(p, 'rt') as f:
        for line in f:
            if not line.strip() or line[0] == '#': continue
            a = line.split(); idx.append(int(a[0])); d.append([float(a[1]), float(a[2]), float(a[3])])
    if not idx: return None
    return np.array(idx, dtype=np.int64), np.array(d)

# ---------------- macro targets (MakeHuman's own weighting) ----------------
MACRO = json.load(open(os.path.join(DATA, 'targets', 'macrodetails', 'macro.json')))['macrotargets']
def comps(name, v):
    out = []
    for p in MACRO[name]['parts']:
        if p['lowest'] < v < p['highest']:
            pct = (v - p['lowest']) / (p['highest'] - p['lowest'])
            if p['low']: out.append((p['low'], 1 - pct))
            if p['high']: out.append((p['high'], pct))
    return out

def macro_stack(m, cutoff=.01):
    c = {k: comps(k, m.get(k, .5)) for k in ['gender', 'age', 'muscle', 'weight', 'proportions', 'height', 'cupsize', 'firmness']}
    t = []
    for race, rw in m['race'].items():
        for ag, aw in c['age']:
            for g, gw in c['gender']:
                if rw * gw * aw > cutoff: t.append((f'macrodetails/{race}-{g}-{ag}', rw * gw * aw))
    for g, gw in c['gender']:
        for ag, aw in c['age']:
            for mu, mw in c['muscle']:
                for we, ww in c['weight']:
                    w = gw * aw * mw * ww
                    if w > cutoff: t.append((f'macrodetails/universal-{g}-{ag}-{mu}-{we}', w))
                    for h, hw in c['height']:
                        if w * hw > cutoff: t.append((f'macrodetails/height/{g}-{ag}-{mu}-{we}-{h}', w * hw))
                    for pr, pw in c['proportions']:
                        if w * pw > cutoff and ag != 'baby': t.append((f'macrodetails/proportions/{g}-{ag}-{mu}-{we}-{pr}', w * pw))
                    if g == 'female':
                        for cu, cw in c['cupsize']:
                            for fi, fw in c['firmness']:
                                ww2 = aw * mw * ww * cw * fw * gw
                                n = f'breast/female-{ag}-{mu}-{we}-{cu}-{fi}'
                                if ww2 > cutoff and 'averagecup-averagefirmness' not in n and ag != 'baby': t.append((n, ww2))
    return t

# ---------------- mhclo fitting ----------------
def parse_mhclo(path):
    hdr, refs, delete, mode = {}, [], [], None
    for line in open(path, encoding='utf-8', errors='ignore'):
        s = line.strip()
        if not s or s[0] == '#': continue
        if s.startswith('verts'): mode = 'v'; continue
        if s.startswith('delete_verts'): mode = 'd'; continue
        if mode == 'v':
            a = s.split()
            if not a[0].lstrip('-').isdigit(): hdr[a[0]] = a[1:]; continue  # header keys may sit between 'verts' and the data
            elif len(a) >= 9: refs.append(([int(a[0]), int(a[1]), int(a[2])], [float(a[3]), float(a[4]), float(a[5])], [float(a[6]), float(a[7]), float(a[8])]))
            elif len(a) == 1: refs.append(([int(a[0]), int(a[0]), int(a[0])], [1, 0, 0], [0, 0, 0])); continue
            else: mode = None
            if mode == 'v': continue
        if mode == 'd':
            a = s.split(); i = 0
            if not a[0].isdigit(): mode = None
            else:
                while i < len(a):
                    if i + 2 < len(a) and a[i + 1] == '-': delete.extend(range(int(a[i]), int(a[i + 2]) + 1)); i += 3
                    else: delete.append(int(a[i])); i += 1
                continue
        k = s.split()
        hdr[k[0]] = k[1:]
    return hdr, refs, delete

def fit(hdr, refs, BV):
    sc = []
    for ax, key in enumerate(['x_scale', 'y_scale', 'z_scale']):
        if key in hdr:
            a, b, s = int(hdr[key][0]), int(hdr[key][1]), float(hdr[key][2]); sc.append(abs(BV[a][ax] - BV[b][ax]) / s)
        else: sc.append(1.0)
    sc = np.array(sc)
    idx = np.array([r[0] for r in refs]); w = np.array([r[1] for r in refs]); off = np.array([r[2] for r in refs])
    return (BV[idx] * w[:, :, None]).sum(1) + off * sc, idx, w

# ---------------- materials ----------------
def read_mhmat(path):
    d = {}
    for line in open(path, encoding='utf-8', errors='ignore'):
        s = line.strip()
        if not s or s[0] == '#': continue
        k = s.split(None, 1); d[k[0]] = k[1] if len(k) > 1 else ''
    return d

def img_bytes(path, alpha=False, tint=None, size=TEX):
    im = Image.open(path)
    im = im.convert('RGBA' if alpha else 'RGB')
    if max(im.size) > size: im = im.resize((size, size * im.size[1] // im.size[0]), Image.LANCZOS)
    if tint is not None:
        a = np.asarray(im).astype(np.float32)
        lum = (a[..., :3] @ np.array([.299, .587, .114]))[..., None] / 255.
        m = a[..., 3] > 128 if a.shape[-1] == 4 else np.ones(lum.shape[:2], bool)
        mean = max(float(lum[..., 0][m].mean()) if m.any() else .5, .02)
        # recolour so the texture's average matches the tint, keeping its light/dark detail
        a[..., :3] = np.clip((lum / mean) ** .8 * np.array(tint) * 255, 0, 255)
        im = Image.fromarray(a.astype(np.uint8), im.mode)
    b = io.BytesIO()
    if alpha: im.save(b, 'PNG', optimize=True); return b.getvalue(), 'image/png'
    im.save(b, 'JPEG', quality=88); return b.getvalue(), 'image/jpeg'

# ---------------- glb writer ----------------
class GLB:
    def __init__(s):
        s.j = {'asset': {'version': '2.0', 'generator': 'mh_build (MakeHuman CC0 data)'}, 'scene': 0, 'scenes': [{'nodes': []}], 'nodes': [], 'meshes': [],
               'materials': [], 'textures': [], 'images': [], 'samplers': [{'magFilter': 9729, 'minFilter': 9987}], 'accessors': [], 'bufferViews': [], 'buffers': [], 'skins': []}
        s.bin = bytearray()
    def view(s, data, target=None):
        while len(s.bin) % 4: s.bin.append(0)
        v = {'buffer': 0, 'byteOffset': len(s.bin), 'byteLength': len(data)}
        if target: v['target'] = target
        s.bin += data; s.j['bufferViews'].append(v); return len(s.j['bufferViews']) - 1
    def acc(s, arr, ctype, typ, target=None, minmax=False, normalized=False):
        arr = np.ascontiguousarray(arr)
        a = {'bufferView': s.view(arr.tobytes(), target), 'componentType': ctype, 'count': int(arr.shape[0]), 'type': typ}
        if normalized: a['normalized'] = True
        if minmax: a['min'] = arr.min(0).tolist(); a['max'] = arr.max(0).tolist()
        s.j['accessors'].append(a); return len(s.j['accessors']) - 1
    def image(s, data, mime):
        s.j['images'].append({'bufferView': s.view(data), 'mimeType': mime}); s.j['textures'].append({'source': len(s.j['images']) - 1, 'sampler': 0}); return len(s.j['textures']) - 1
    def write(s, path):
        s.j['buffers'] = [{'byteLength': len(s.bin)}]
        for k in ['textures', 'images', 'skins']:
            if not s.j[k]: del s.j[k]
        js = json.dumps(s.j, separators=(',', ':')).encode()
        while len(js) % 4: js += b' '
        while len(s.bin) % 4: s.bin.append(0)
        with open(path, 'wb') as f:
            f.write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(s.bin)))
            f.write(struct.pack('<II', len(js), 0x4E4F534A)); f.write(js)
            f.write(struct.pack('<II', len(s.bin), 0x004E4942)); f.write(s.bin)

def smooth_normals(P, tris):
    n = np.zeros_like(P)
    a, b, c = P[tris[:, 0]], P[tris[:, 1]], P[tris[:, 2]]
    fn = np.cross(b - a, c - a)
    for k in range(3): np.add.at(n, tris[:, k], fn)
    l = np.linalg.norm(n, axis=1, keepdims=True); l[l == 0] = 1
    return n / l

def split_mesh(V, T, faces, keep):
    """faces: list of (vs, ts). Returns unique-vertex arrays: pos index map, uv, triangles."""
    key, vi, ti, tris = {}, [], [], []
    for f, k in zip(faces, keep):
        if not k: continue
        vs, ts = f; ids = []
        for v, t in zip(vs, ts):
            kk = (v, t)
            if kk not in key: key[kk] = len(vi); vi.append(v); ti.append(t)
            ids.append(key[kk])
        for q in range(1, len(ids) - 1): tris.append([ids[0], ids[q], ids[q + 1]])
    vi = np.array(vi); ti = np.array(ti)
    uv = T[ti] if len(T) else np.zeros((len(vi), 2))
    return vi, uv, np.array(tris, np.uint32)

def top4(wlist):
    """wlist: list of dict bone->w per vertex -> (joints[N,4] u16, weights[N,4] f32)"""
    J = np.zeros((len(wlist), 4), np.uint16); W = np.zeros((len(wlist), 4), np.float32)
    for i, d in enumerate(wlist):
        it = sorted(d.items(), key=lambda x: -x[1])[:4]
        s = sum(w for _, w in it) or 1
        for k, (b, w) in enumerate(it): J[i, k] = b; W[i, k] = w / s
        if not it: W[i, 0] = 1
    return J, W

# ---------------- build ----------------
def build(spec, out):
    BV0, BT, BF, BG = load_obj(os.path.join(DATA, '3dobjs', 'base.obj'))
    BV = BV0.copy()
    race = spec.get('race', {'caucasian': 1.0})
    m = {k: spec.get(k, .5) for k in ['gender', 'age', 'muscle', 'weight', 'proportions', 'height', 'cupsize', 'firmness']}; m['race'] = race
    for name, w in macro_stack(m):
        t = load_target(name)
        if t is not None: BV[t[0]] += t[1] * w
    for name, w in spec.get('targets', {}).items():
        t = load_target(name)
        if t is not None: BV[t[0]] += t[1] * w
    # face morphs (deltas on the shaped body)
    dom = max(race, key=race.get)
    FACE = {'blink': ['eye-left-closure', 'eye-right-closure'], 'browsUp': ['eyebrows-left-inner-up', 'eyebrows-right-inner-up'],
            'browsDown': ['eyebrows-left-down', 'eyebrows-right-down'], 'smile': ['mouth-corner-puller'], 'frown': ['mouth-depression'], 'mouthOpen': ['mouth-open']}
    morphs = {}
    for k, names in FACE.items():
        d = np.zeros_like(BV)
        for n in names:
            t = load_target(f'expression/units/{dom}/{n}')
            if t is not None: d[t[0]] += t[1]
        morphs[k] = d
    # units: decimetres y-up -> metres, feet on the ground
    S = .1
    groups = {}
    for (vs, ts), g in zip(BF, BG): groups.setdefault(g, set()).update(vs)
    body_faces = [g == 'body' for g in BG]
    body_vids = sorted(groups['body'])
    ground = BV[body_vids][:, 1].min()
    def P(x): return (x - np.array([0, ground, 0])) * S
    # skeleton
    rig = json.load(open(os.path.join(DATA, 'rigs', 'standard', 'rig.mixamo.json')))['bones']
    def jpos(spec_):
        if spec_['strategy'] == 'CUBE': return BV[sorted(groups[spec_['cube_name']])].mean(0)
        return BV[spec_['vertex_indices']].mean(0)
    names = list(rig.keys())
    order = []
    def visit(n):
        if n in order: return
        p = rig[n]['parent']
        if p: visit(p)
        order.append(n)
    for n in names: visit(n)
    head = {n: P(jpos(rig[n]['head'])) for n in order}
    tail = {n: P(jpos(rig[n]['tail'])) for n in order}
    order.append('mixamorig:HeadTop_End'); rig['mixamorig:HeadTop_End'] = {'parent': 'mixamorig:Head'}; head['mixamorig:HeadTop_End'] = tail['mixamorig:Head']
    bidx = {n: i for i, n in enumerate(order)}
    # skin weights on base verts
    wj = json.load(open(os.path.join(DATA, 'rigs', 'standard', 'weights.mixamo.json')))['weights']
    bw = [dict() for _ in range(len(BV))]
    for b, lst in wj.items():
        if b not in bidx: continue
        for v, w in lst: bw[v][bidx[b]] = bw[v].get(bidx[b], 0) + w
    g = GLB()
    # nodes: armature root + bones
    root = {'name': spec['id'], 'children': []}
    g.j['nodes'].append(root)
    bone_node = {}
    for n in order:
        bone_node[n] = len(g.j['nodes'])
        p = rig[n].get('parent')
        t = head[n] - (head[p] if p else np.zeros(3))
        g.j['nodes'].append({'name': n, 'translation': t.tolist()})
    for n in order:
        p = rig[n].get('parent')
        if p: g.j['nodes'][bone_node[p]].setdefault('children', []).append(bone_node[n])
        else: root['children'].append(bone_node[n])
    ibm = np.zeros((len(order), 16), np.float32)
    for i, n in enumerate(order):
        mtx = np.eye(4); mtx[:3, 3] = -head[n]; ibm[i] = mtx.T.reshape(-1)
    g.j['skins'].append({'joints': [bone_node[n] for n in order], 'inverseBindMatrices': g.acc(ibm, 5126, 'MAT4'), 'skeleton': bone_node[order[0]]})
    # deleted body verts (hidden under clothes)
    deleted = set()
    parts = []
    def material(mhmat_path, base_dir, *, alpha=False, rough=.8, tint=None, double=False, color=None):
        mm = read_mhmat(mhmat_path) if mhmat_path and os.path.exists(mhmat_path) else {}
        mat = {'name': os.path.basename(mhmat_path or 'mat'), 'pbrMetallicRoughness': {'metallicFactor': 0, 'roughnessFactor': rough}}
        if color: mat['pbrMetallicRoughness']['baseColorFactor'] = color
        dt = mm.get('diffuseTexture')
        if dt:
            p = os.path.join(base_dir, os.path.basename(dt))
            if os.path.exists(p):
                data, mime = img_bytes(p, alpha=alpha, tint=tint); mat['pbrMetallicRoughness']['baseColorTexture'] = {'index': g.image(data, mime)}
        nt = mm.get('normalmapTexture')
        if nt and os.path.exists(os.path.join(base_dir, os.path.basename(nt))):
            data, mime = img_bytes(os.path.join(base_dir, os.path.basename(nt))); mat['normalTexture'] = {'index': g.image(data, mime), 'scale': .8}
        at = mm.get('aomapTexture')
        if at and os.path.exists(os.path.join(base_dir, os.path.basename(at))):
            data, mime = img_bytes(os.path.join(base_dir, os.path.basename(at))); mat['occlusionTexture'] = {'index': g.image(data, mime), 'strength': .8}
        if alpha: mat['alphaMode'] = 'MASK'; mat['alphaCutoff'] = .4; mat['doubleSided'] = True
        if double: mat['doubleSided'] = True
        g.j['materials'].append(mat); return len(g.j['materials']) - 1
    def add_mesh(name, pos, uv, tris, joints, weights, mat, morph=None):
        nrm = smooth_normals(pos, tris)
        uvf = uv.copy(); uvf[:, 1] = 1 - uvf[:, 1]
        prim = {'attributes': {'POSITION': g.acc(pos.astype(np.float32), 5126, 'VEC3', 34962, True), 'NORMAL': g.acc(nrm.astype(np.float32), 5126, 'VEC3', 34962),
                               'TEXCOORD_0': g.acc(uvf.astype(np.float32), 5126, 'VEC2', 34962), 'JOINTS_0': g.acc(joints, 5123, 'VEC4', 34962), 'WEIGHTS_0': g.acc(weights, 5126, 'VEC4', 34962)},
                'indices': g.acc(tris.reshape(-1).astype(np.uint32), 5125, 'SCALAR', 34963), 'material': mat}
        meshd = {'name': name, 'primitives': [prim]}
        if morph:
            prim['targets'] = [{'POSITION': g.acc(d.astype(np.float32), 5126, 'VEC3', 34962, True)} for d in morph.values()]
            meshd['weights'] = [0] * len(morph); meshd['extras'] = {'targetNames': list(morph.keys())}
        g.j['meshes'].append(meshd)
        g.j['nodes'].append({'name': name, 'mesh': len(g.j['meshes']) - 1, 'skin': 0})
        g.j['scenes'][0]['nodes'].append(len(g.j['nodes']) - 1)
    # proxies: eyes, brows, lashes, hair, clothes
    proxies = []
    def proxy(kind, name, alpha=False, rough=.8, tint=None, mat_override=None, double=False):
        d = os.path.join(ASSETS, kind, name)
        mh = [f for f in os.listdir(d) if f.endswith('.mhclo')][0]
        hdr, refs, dele = parse_mhclo(os.path.join(d, mh))
        deleted.update(dele)
        obj = os.path.join(d, hdr['obj_file'][0])
        CV, CT, CF, _ = load_obj(obj)
        pos, idx, w = fit(hdr, refs, BV)
        # morph deltas carried over from the body
        mo = {k: (dd[idx] * w[:, :, None]).sum(1) * S for k, dd in morphs.items()}
        vi, uv, tris = split_mesh(CV, CT, CF, [True] * len(CF))
        wl = []
        for i in vi:
            dct = {}
            for v, ww in zip(idx[i], w[i]):
                for b, bwv in bw[v].items(): dct[b] = dct.get(b, 0) + bwv * ww
            wl.append({k: v for k, v in dct.items() if v > 0})
        J, W = top4(wl)
        mmp = mat_override or os.path.join(d, hdr['material'][0] if 'material' in hdr else name + '.mhmat')
        mat = material(mmp, d if not mat_override else os.path.dirname(mat_override), alpha=alpha, rough=rough, tint=tint, double=double)
        keep_morph = {k: v[vi] for k, v in mo.items()} if kind in ('eyebrows', 'eyelashes', 'eyes') else None
        proxies.append((f'{kind}_{name}', P(pos[vi]), uv, tris, J, W, mat, keep_morph))
    eyes_mat = os.path.join(ASSETS, 'eyes', 'materials', spec.get('eyes', 'brown') + '.mhmat')
    proxy('eyes', 'high-poly', rough=.15, mat_override=eyes_mat, alpha=True)
    if spec.get('brows'): proxy('eyebrows', spec['brows'], alpha=True)
    if spec.get('lashes'): proxy('eyelashes', spec['lashes'], alpha=True)
    if spec.get('hair'): proxy('hair', spec['hair'], alpha=True, rough=.55, tint=spec.get('hairTint'), double=True)
    for c in spec.get('clothes', []):
        proxy('clothes', c, rough=.85, tint=spec.get('tint', {}).get(c), alpha=c.startswith('fedora') is False and False)
    # body (skin), with clothes-covered faces removed
    keep = []
    for (vs, ts), gname in zip(BF, BG):
        keep.append(gname == 'body' and not any(v in deleted for v in vs))
    vi, uv, tris = split_mesh(BV, BT, BF, keep)
    J, W = top4([bw[v] for v in vi])
    sk = spec.get('skin', 'young_caucasian_male')
    sd = os.path.join(ASSETS, 'skins', sk)
    skin_mat = material(os.path.join(sd, sk + '.mhmat'), sd, rough=.55)
    add_mesh('body', P(BV[vi]), uv, tris, J, W, skin_mat, {k: v[vi] * S for k, v in morphs.items()})
    for pr in proxies: add_mesh(*pr)
    g.j['scenes'][0]['nodes'].insert(0, 0)
    g.write(os.path.join(out, spec['id'] + '.glb'))
    return os.path.getsize(os.path.join(out, spec['id'] + '.glb'))

if __name__ == '__main__':
    cast = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
    only = set(sys.argv[3:])
    for s in cast:
        if only and s['id'] not in only: continue
        print(s['id'], build(s, out) // 1024, 'KB', flush=True)
