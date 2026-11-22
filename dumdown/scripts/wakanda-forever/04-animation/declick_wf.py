# soften dead word stops (same detector as voice_qa): fade 60 ms into each hard stop; 20 ms edge fades
import sys, numpy as np, soundfile as sf, shutil, os
for p in sys.argv[1:]:
    raw = '/tmp/wfwork/raw/' + os.path.basename(p)
    if not os.path.exists(raw): shutil.copy(p, raw)
    x, sr = sf.read(raw); m = x.mean(1) if x.ndim > 1 else x; hop = sr // 100; n = len(m) // hop
    db = np.maximum(10 * np.log10((m[:n*hop].reshape(n, hop) ** 2).mean(1) + 1e-12), -80); peak = np.percentile(db, 95); sp = db > peak - 28
    runs, i = [], 0
    while i < n:
        j = i
        while j < n and sp[j] == sp[i]: j += 1
        if sp[i]: runs.append([i, j])
        i = j
    mg = []
    for a, b in runs:
        if mg and a - mg[-1][1] < 15: mg[-1][1] = b
        else: mg.append([a, b])
    y = x.copy(); k = 0
    for a, b in mg:
        if b - a < 20 or b + 2 >= n: continue
        if db[b-3:b].max() > peak - 10 and db[b-3:b].max() - db[b+1:b+3].max() > 30:
            e = (b + 1) * hop; L = int(sr * .15); s = e - L; y[s:e] = (y[s:e].T * 10 ** (np.linspace(0, -45, L) ** 1 / 20) * np.linspace(1, 1, L)).T; k += 1
    f = int(sr * .02); y[:f] = (y[:f].T * np.linspace(0, 1, f)).T; y[-f:] = (y[-f:].T * np.linspace(1, 0, f)).T
    sf.write(p, y, sr); print(os.path.basename(p), k, end='  ')
