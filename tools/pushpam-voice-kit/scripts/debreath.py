# Attenuate breathy lead-ins/tails of each VO line in actN/vo.wav (keeps timing). Backup -> vo.orig.wav
import sys, json, os, shutil, numpy as np
from scipy.io import wavfile
d = sys.argv[1]; src = f'{d}/vo.orig.wav'
if not os.path.exists(src): shutil.copy(f'{d}/vo.wav', src)
sr, a = wavfile.read(src); dt = a.dtype; x = a.astype(np.float32) / 32768; mono = x if x.ndim == 1 else x.mean(1)
t = json.load(open(f'{d}/timing.json')); W = int(.025 * sr); g = np.ones(len(mono), np.float32); log = []
def lvl(i): w = mono[i:i + W]; return 20 * np.log10(np.sqrt((w ** 2).mean()) + 1e-9), (np.mean(np.abs(np.diff(np.sign(w))) > 0) * sr / 2 if len(w) > 2 else 0)
for s in t['shots']:
    st, en = int(s['vo_start'] * sr), int(s['vo_end'] * sr)
    # lead: quiet breathy windows before the first real speech window
    i = st; n = 0
    while i < st + int(.45 * sr):
        L, z = lvl(i)
        if L > -31 or z > 2500: break
        i += W; n += 1
    if n >= 3: f = int(.03 * sr); g[st:i - f] = .03; g[i - f:i] = np.linspace(.03, 1, f); log.append(f'{s["i"]} lead {n * 25}ms')
    j = en; m = 0
    while j > en - int(.45 * sr):
        L, z = lvl(j - W)
        if L > -33 or z > 2500: break
        j -= W; m += 1
    if m >= 3: f = int(.04 * sr); g[j:j + f] = np.linspace(1, .03, f); g[j + f:en + int(.2 * sr)] = .03; log.append(f'{s["i"]} tail {m * 25}ms')
y = x * (g if x.ndim == 1 else g[:, None]); wavfile.write(f'{d}/vo.wav', sr, (np.clip(y, -1, 1) * 32767).astype(np.int16)); print(d, ', '.join(log) or 'none')
