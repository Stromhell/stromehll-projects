# Synthesise cartoon sound effects in code. Usage: python3 mksfx.py OUTDIR
import sys, os, numpy as np, wave
SR = 48000; out = sys.argv[1]; os.makedirs(out, exist_ok=True); rng = np.random.default_rng(3)
def save(name, y):
    y = y / (np.abs(y).max() + 1e-9) * 0.89
    w = wave.open(f'{out}/{name}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype('<i2').tobytes()); w.close()
def T(d): return np.arange(int(d * SR)) / SR
def lp(x, a):  # one-pole low-pass, a in (0,1)
    a = np.broadcast_to(np.asarray(a, float), x.shape); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s += a[i] * (x[i] - s); y[i] = s
    return y
t = T(0.18); save('pop', np.sin(2 * np.pi * (300 + 900 * t / 0.18) * t) * np.exp(-t * 28))
t = T(0.5); n = rng.normal(0, 1, len(t)); save('whoosh', lp(n, 0.05 + 0.25 * np.sin(np.pi * t / 0.5)) * np.sin(np.pi * t / 0.5) ** 2)
t = T(0.45); n = rng.normal(0, 1, len(t)); save('splash', lp(n, 0.35) * np.exp(-t * 9) + 0.6 * np.sin(2 * np.pi * (500 - 300 * t) * t) * np.exp(-t * 20))
t = T(0.25); save('plop', np.sin(2 * np.pi * (180 + 700 * (t / 0.25) ** 2) * t) * np.exp(-t * 18))
t = T(0.6); save('boing', np.sin(2 * np.pi * (220 + 60 * np.sin(2 * np.pi * 9 * t)) * t) * np.exp(-t * 5))
t = T(0.4); n = rng.normal(0, 1, len(t)); save('slurp', lp(n, 0.08) * (0.5 + 0.5 * np.sin(2 * np.pi * 18 * t)) * np.sin(np.pi * t / 0.4))
t = T(0.5); save('blegh', (np.sign(np.sin(2 * np.pi * (140 - 50 * t) * t)) * 0.4 + lp(rng.normal(0, 1, len(t)), 0.2)) * np.sin(np.pi * t / 0.5) ** 0.5)
t = T(0.3); save('squeeze', np.sin(2 * np.pi * (900 - 600 * t / 0.3) * t) * (0.6 + 0.4 * np.sin(2 * np.pi * 30 * t)) * np.sin(np.pi * t / 0.3))
t = T(0.12); save('tick', np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 60))
t = T(1.2); save('pour', lp(rng.normal(0, 1, len(t)), 0.3) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * t)) * np.minimum(1, t / 0.05) * np.minimum(1, (1.2 - t) / 0.2))
t = T(0.7); save('sad', np.sin(2 * np.pi * (330 * 2 ** (-t / 0.7)) * t) * np.exp(-t * 2.5))
# ocean bed: 30 s of swelling low noise
t = T(30); n = rng.normal(0, 1, len(t)); sw = 0.55 + 0.45 * np.sin(2 * np.pi * t / 5.5) ** 2
save('ocean', lp(n, 0.04) * sw)
print('sfx done')
