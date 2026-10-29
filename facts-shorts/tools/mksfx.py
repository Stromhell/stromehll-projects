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
# --- extra cartoon sounds (batch 1)
t = T(0.09); save('knock', (np.sin(2 * np.pi * 900 * t) + 0.6 * lp(rng.normal(0, 1, len(t)), 0.5)) * np.exp(-t * 70))
t = T(0.6); n = rng.normal(0, 1, len(t)); save('crack', np.concatenate([lp(n[:2400], 0.7) * np.exp(-T(0.05) * 60), np.zeros(800), lp(n[3200:], 0.6) * np.exp(-T(0.6)[3200:] * 9) * (rng.random(len(t) - 3200) < 0.15)]))
t = T(0.8); save('creak', np.sign(np.sin(2 * np.pi * (60 + 25 * np.sin(2 * np.pi * 1.5 * t)) * t)) * 0.3 * lp(np.abs(rng.normal(0, 1, len(t))), 0.3) * np.sin(np.pi * t / 0.8))
t = T(1.5); save('sizzle', lp(rng.normal(0, 1, len(t)), 0.9) * (0.6 + 0.4 * rng.random(len(t))) * np.minimum(1, t / 0.1) * np.minimum(1, (1.5 - t) / 0.3) * 0.4)
t = T(0.08); tk = np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 90); tock = np.sin(2 * np.pi * 1500 * t) * np.exp(-t * 90)
save('ticktock', np.concatenate([tk, np.zeros(int(0.42 * SR)), tock, np.zeros(int(0.42 * SR))] * 2))
t = T(1.0); save('ding', (np.sin(2 * np.pi * 1320 * t) + 0.5 * np.sin(2 * np.pi * 2640 * t) + 0.25 * np.sin(2 * np.pi * 3960 * t)) * np.exp(-t * 4))
t = T(0.5); save('clink', (np.sin(2 * np.pi * 2900 * t) + 0.7 * np.sin(2 * np.pi * 4100 * t)) * np.exp(-t * 14))
t = T(0.8); save('rise', np.sin(2 * np.pi * (200 * 2 ** (t / 0.8 * 2)) * t) * np.sin(np.pi * t / 0.8) ** 2 * 0.6 + 0.3 * lp(rng.normal(0, 1, len(t)), 0.2) * (t / 0.8))
t = T(1.6); save('rumble', lp(rng.normal(0, 1, len(t)), 0.015) * np.sin(np.pi * t / 1.6))
t = T(0.35); save('wobble', np.sin(2 * np.pi * (300 + 120 * np.sin(2 * np.pi * 14 * t)) * t) * np.exp(-t * 4))
t = T(0.3); save('zap', np.sin(2 * np.pi * (1800 - 1500 * t / 0.3) * t) * np.exp(-t * 9) * np.sign(np.sin(2 * np.pi * 60 * t)))
t = T(2.0); save('snore', lp(rng.normal(0, 1, len(t)), 0.06) * np.maximum(0, np.sin(2 * np.pi * t / 2.0)) ** 2)
t = T(0.25); save('step', lp(rng.normal(0, 1, len(t)), 0.1) * np.exp(-t * 30))
