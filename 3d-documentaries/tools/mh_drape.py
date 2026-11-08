"""Roman clothing for mh_build: tunic, toga (skirt + diagonal sash), stola, clavus stripes, borders.

Built from MakeHuman's own fitting helpers (helper-tights, helper-skirt), so the cloth follows each
body's shape and is skinned with the body's own weights. Base-mesh units: decimetres, +x = left, +z = front.

spec['drape'] = {
  'kind': 'toga' | 'tunic' | 'stola',
  'color': [r,g,b] wool colour (0..1), 'border': [r,g,b] or None (purple edge = toga praetexta),
  'clavus': [r,g,b] or None (tunic stripes), 'sash': True/False, 'hem': 'ankle' | 'knee',
  'sleeve': 0..1 (how far down the upper arm the tunic goes), 'seed': int }
"""
import numpy as np

def _rng(seed):
    return np.random.default_rng(seed)

def wool_tex(color, seed=1, size=512):
    """Wool albedo + normal map (numpy arrays, uint8)."""
    r = _rng(seed)
    n = r.random((size, size)).astype(np.float32)
    # fibre streaks: blur along x, mix with coarse noise
    k = 9
    st = np.zeros_like(n)
    for i in range(k): st += np.roll(n, i - k // 2, axis=1)
    st /= k
    from PIL import Image as _I
    coarse = np.asarray(_I.fromarray((r.random((16, 16)) * 255).astype(np.uint8)).resize((size, size), _I.BICUBIC)).astype(np.float32) / 255
    h = st * .55 + coarse * .45
    weave = (np.sin(np.arange(size) * np.pi / 2.0)[None, :] * np.sin(np.arange(size) * np.pi / 2.0)[:, None]) * .06
    h = h + weave
    lum = .88 + (h - h.mean()) * .28
    alb = np.clip(np.array(color, np.float32)[None, None, :] * lum[..., None] * 255, 0, 255).astype(np.uint8)
    gy, gx = np.gradient(h * 6)
    nz = np.ones_like(gx)
    nv = np.stack([-gx, -gy, nz], -1); nv /= np.linalg.norm(nv, axis=-1, keepdims=True)
    nrm = ((nv * .5 + .5) * 255).astype(np.uint8)
    return alb, nrm

def _faces_of(BF, BG, group):
    return [g == group for g in BG]

def _cyl_uv(pos, zc, scale=1.0):
    th = np.arctan2(pos[:, 0], pos[:, 2] - zc)
    return np.stack([(th / (2 * np.pi) + .5) * 4 * scale, pos[:, 1] / 4 * scale], 1)

def build_drape(spec, BV, BF, BG, bw, split_mesh, smooth_normals, top4, J):
    """Returns list of (name, pos_dm[N,3], uv[N,2], tris, joints, weights, matkey) and deleted body verts.
    J: dict of joint positions in base-mesh units (Hips, LeftArm, LeftForeArm, LeftLeg, Neck...)."""
    d = spec['drape']; kind = d.get('kind', 'toga'); r = _rng(d.get('seed', 7))
    out = []; deleted = set()
    hips_y = J['Hips'][1]; knee_y = J['LeftLeg'][1]; neck_y = J['Neck'][1]
    elbow_x = J['LeftForeArm'][0]; arm_x = J['LeftArm'][0]
    # ---- tunic shell from helper-tights ----
    keep = _faces_of(BF, BG, 'helper-tights')
    vi, uv, tris = split_mesh(BV, np.zeros((0, 2)), BF, keep)
    P = BV[vi].copy()
    nrm = smooth_normals(P, tris)
    sleeve = d.get('sleeve', .45)
    xmax = arm_x + (elbow_x - arm_x) * sleeve
    hem_y = hips_y + .4
    vok = (np.abs(P[:, 0]) < xmax) & (P[:, 1] > hem_y) & (P[:, 1] < neck_y - .05)
    tk = vok[tris].all(1)
    tris_t = tris[tk]
    used = np.unique(tris_t)
    remap = -np.ones(len(P), np.int64); remap[used] = np.arange(len(used))
    zc = float(P[:, 2].mean())
    off = .1 if kind != 'tunic' else .12
    Pt = P[used] + nrm[used] * off
    Tt = remap[tris_t].astype(np.uint32)
    Jt, Wt = top4([bw[v] for v in vi[used]])
    out.append(('tunic', Pt, _cyl_uv(Pt, zc), Tt, Jt, Wt, 'tunic'))
    # body faces hidden by the tunic
    for v in vi[used]: deleted.add(int(v))
    # clavus: two vertical stripes front and back
    if d.get('clavus') is not None:
        sx = .55
        cen = Pt.copy()
        for sgn in (1, -1):
            cm = (np.abs(cen[:, 0] - sgn * sx) < .16) & (cen[:, 1] > hips_y - .3)
            ctk = cm[Tt].all(1)
            if ctk.sum() < 4: continue
            u2 = np.unique(Tt[ctk]); rm = -np.ones(len(Pt), np.int64); rm[u2] = np.arange(len(u2))
            n2 = smooth_normals(Pt, Tt)[u2]
            out.append((f'clavus{sgn}', Pt[u2] + n2 * .025, _cyl_uv(Pt[u2], zc), rm[Tt[ctk]].astype(np.uint32), Jt[u2], Wt[u2], 'clavus'))
    # ---- skirt (toga lower body / stola): a lathe fitted around the helper-skirt ----
    keep = _faces_of(BF, BG, 'helper-skirt')
    hv, _, _ = split_mesh(BV, np.zeros((0, 2)), BF, keep)
    H = BV[hv]
    top, bot = H[:, 1].max(), H[:, 1].min()
    zc2 = float(H[:, 2].mean())
    NR, NS = 44, 120
    hem_bot = bot - (.55 if kind == 'stola' else .1)
    if kind == 'tunic' or d.get('hem') == 'knee': hem_bot = knee_y - .2
    ys = np.linspace(top, hem_bot, NR)
    prof = []
    for y in ys:
        m = np.abs(H[:, 1] - min(max(y, bot), top)) < .35
        Q = H[m] if m.sum() > 3 else H
        prof.append([np.abs(Q[:, 0]).max(), (Q[:, 2] - zc2).max(), (zc2 - Q[:, 2]).max()])
    prof = np.array(prof)
    # below the widest point the cloth falls straight (no gap between the legs)
    w = int(prof[:, 0].argmax())
    for i in range(w + 1, NR): prof[i] = np.maximum(prof[i], prof[i - 1] * .995)
    ph = r.random(4) * 6.28
    nf = d.get('folds', 11)
    pos = np.zeros((NR, NS + 1, 3)); Wt_idx = np.zeros((NR, NS + 1), np.int64)
    for i, y in enumerate(ys):
        f = i / (NR - 1)
        for j in range(NS + 1):
            t = 2 * np.pi * j / NS - np.pi
            rx, rf, rb = prof[i]
            rz = rf if np.cos(t) > 0 else rb
            base = 1 / np.sqrt((np.sin(t) / rx) ** 2 + (np.cos(t) / rz) ** 2)
            rip = np.sin(t * nf + ph[0] + f * 1.5) * .65 + np.sin(t * (nf + 6) + ph[1]) * .35
            if kind == 'tunic': rip *= .5
            rr = base * (1.06 + .14 * f) + .16 + rip * (.03 + .26 * f ** 1.3)
            if kind == 'toga':  # heavy swag across the front, hanging lower on the left
                rr += np.exp(-((t - .5) ** 2) / .6) * np.exp(-((f - .4) ** 2) / .04) * .3
            yy = y
            if i == NR - 1: yy = y + np.sin(t * 2 + ph[2]) * .1 + (np.cos(t) > 0) * .05
            pos[i, j] = [np.sin(t) * rr, yy, zc2 + np.cos(t) * rr]
            q = np.array([np.sin(t) * base * .9, min(max(y, bot), top), zc2 + np.cos(t) * base * .9])
            Wt_idx[i, j] = int(((H - q) ** 2).sum(1).argmin())
    V = pos.reshape(-1, 3); I = Wt_idx.reshape(-1)
    T = []
    for i in range(NR - 1):
        for j in range(NS):
            a0 = i * (NS + 1) + j; b0 = (i + 1) * (NS + 1) + j
            T += [[a0, a0 + 1, b0], [a0 + 1, b0 + 1, b0]]
    T = np.array(T, np.uint32)
    # smooth analytic weights: hips at the waist, sharing out to the legs lower down, blended
    # left/right by angle so the cloth never tears down the middle
    wl = []
    hb = J['_hips_bone']; B = J['_bones']; knee = J['LeftLeg'][1]
    for i, y in enumerate(ys):
        f = i / (NR - 1)
        legs = .95 * min(1, max(0, (f - .04) / .22)) ** 1.5
        for j in range(NS + 1):
            t = 2 * np.pi * j / NS - np.pi
            L = float(np.clip(.5 + np.sin(t) * .9, 0, 1))
            low = float(np.clip((knee + .6 - y) / 1.2, 0, 1))  # below the knee: shin bones
            dct = {hb: 1 - legs}
            for side, sw in (('Left', L), ('Right', 1 - L)):
                if sw <= 0: continue
                dct[B[side + 'UpLeg']] = dct.get(B[side + 'UpLeg'], 0) + legs * sw * (1 - low * .85)
                dct[B[side + 'Leg']] = dct.get(B[side + 'Leg'], 0) + legs * sw * low * .85
            wl.append(dct)
    Js, Ws = top4(wl)
    uvs = np.array([[j / NS * 6, -V[i * (NS + 1) + j, 1] / 3] for i in range(NR) for j in range(NS + 1)])
    out.append(('skirt', V, uvs, T, Js, Ws, 'wool'))
    if d.get('border') is not None:
        r0 = NR - 3
        sub = pos[r0:].copy()
        cen_r = np.hypot(sub[..., 0], sub[..., 2] - zc2)
        sc = (cen_r + .025) / np.maximum(cen_r, 1e-6)
        sub[..., 0] *= sc; sub[..., 2] = zc2 + (sub[..., 2] - zc2) * sc
        Vb = sub.reshape(-1, 3); Ib = Wt_idx[r0:].reshape(-1)
        Tb = []
        for i in range(2):
            for j in range(NS):
                a0 = i * (NS + 1) + j; b0 = (i + 1) * (NS + 1) + j
                Tb += [[a0, a0 + 1, b0], [a0 + 1, b0 + 1, b0]]
        out.append(('hemborder', Vb, np.array([[j / NS * 6, i * .05] for i in range(3) for j in range(NS + 1)]), np.array(Tb, np.uint32), Js[(NR - 3) * (NS + 1):], Ws[(NR - 3) * (NS + 1):], 'border'))
    # ---- sash: diagonal band from the left shoulder to the right hip, all the way round ----
    if d.get('sash', kind == 'toga'):
        shell = out[0][1]; shellW = (out[0][4], out[0][5])
        # radial profile of the tunic shell around a vertical axis
        thS = np.arctan2(shell[:, 0], shell[:, 2] - zc); rS = np.hypot(shell[:, 0], shell[:, 2] - zc)
        NA, NW = 120, 15
        thL = np.pi / 2  # +x = character's left
        ytop = J['LeftShoulder'][1] - .05; ylow = hips_y + .2
        c, a = (ytop + ylow) / 2, (ytop - ylow) / 2
        width = d.get('sashW', 3.6)
        pos = np.zeros((NA + 1, NW, 3)); idx = np.zeros((NA + 1, NW), np.int64)
        for i in range(NA + 1):
            t = 2 * np.pi * i / NA - np.pi
            yc = c + a * np.cos(t - thL)
            for j in range(NW):
                s = (j / (NW - 1) - .5)
                hi_ = (np.cos(t - thL) + 1) / 2
                y = yc + s * width * (1 - .3 * hi_ ** 2)
                # radius: widest shell point near this angle and height
                m = (np.abs(np.angle(np.exp(1j * (thS - t)))) < .2) & (np.abs(shell[:, 1] - y) < .35)
                rr = rS[m].max() if m.any() else rS.mean()
                bunch = (.1 + .14 * np.cos(s * np.pi)) * (1 - .25 * hi_ ** 2) + .07 * np.sin(s * np.pi * 5 + i * .05)
                pos[i, j] = [np.sin(t) * (rr + bunch), y, zc + np.cos(t) * (rr + bunch)]
                # nearest shell vertex for weights
                dd = ((shell - pos[i, j]) ** 2).sum(1); idx[i, j] = int(dd.argmin())
        # smooth radii along the band to avoid spikes
        for _ in range(3):
            pos[1:-1, :, [0, 2]] = (pos[:-2, :, [0, 2]] + pos[1:-1, :, [0, 2]] * 2 + pos[2:, :, [0, 2]]) / 4
        pos[-1] = pos[0]
        V = pos.reshape(-1, 3); I = idx.reshape(-1)
        T = []
        for i in range(NA):
            for j in range(NW - 1):
                a0 = i * NW + j; b0 = (i + 1) * NW + j
                T += [[a0, b0, a0 + 1], [a0 + 1, b0, b0 + 1]]
        T = np.array(T, np.uint32)
        uvs = np.array([[i / NA * 6, j / (NW - 1)] for i in range(NA + 1) for j in range(NW)])
        out.append(('sash', V, uvs, T, shellW[0][I], shellW[1][I], 'wool'))
        if d.get('border') is not None:
            for edge in (0, NW - 1):
                e2 = NW - 2 if edge == NW - 1 else 1
                sub = pos[:, [edge, e2] if edge == 0 else [e2, edge]].copy()
                # thin strip lifted off the sash edge
                cen = sub.mean(1, keepdims=True)
                sub = cen + (sub - cen) * np.array([1, .35, 1])
                sub[..., 0] *= 1.01; sub[..., 2] = zc + (sub[..., 2] - zc) * 1.01
                Vb = sub.reshape(-1, 3); Ib = idx[:, [edge, e2]].reshape(-1)
                Tb = []
                for i in range(NA):
                    a0 = i * 2; b0 = (i + 1) * 2
                    Tb += [[a0, b0, a0 + 1], [a0 + 1, b0, b0 + 1]]
                out.append((f'sashborder{edge}', Vb, np.zeros((len(Vb), 2)), np.array(Tb, np.uint32), shellW[0][Ib], shellW[1][Ib], 'border'))
    return out, deleted, zc
