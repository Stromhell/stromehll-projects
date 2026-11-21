# Code-made SFX for Thunderbolts* (no AI audio): punch, kick, clang, glass, engine, screech, sonic boom, beep, alarm, explosion, phase, flicker, metal whirr, crowd gasp-free
import numpy as np, os
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000; D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sfx'); R = np.random.default_rng(7)
def t(d): return np.arange(int(d * SR)) / SR
def bp(a, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), a)
def lp(a, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), a)
def hp(a, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), a)
def env(x, a=.003, dec=8): return np.minimum(1, x / a) * np.exp(-x * dec)
def save(n, a): a = a / (np.abs(a).max() + 1e-9) * .9; wavfile.write(f'{D}/{n}.wav', SR, (a * 32767).astype(np.int16))
x = t(.35); save('punch', lp(R.standard_normal(len(x)), 1800) * env(x, .002, 22) + np.sin(2 * np.pi * (90 - 40 * x) * x) * env(x, .004, 14) * 1.4)
x = t(.4); save('kick', lp(R.standard_normal(len(x)), 1200) * env(x, .002, 16) + np.sin(2 * np.pi * (70 - 30 * x) * x) * env(x, .006, 10) * 1.6 + hp(R.standard_normal(len(x)), 3000) * env(x, .001, 60) * .5)
x = t(1.6); save('clang', sum(np.sin(2 * np.pi * f * x) * env(x, .001, d) * g for f, d, g in [(420, 3, 1), (1130, 4, .7), (1870, 6, .5), (2950, 8, .35), (3710, 10, .25)]) + hp(R.standard_normal(len(x)), 2000) * env(x, .001, 40) * .4)
x = t(1.4); g = hp(R.standard_normal(len(x)), 2500) * env(x, .001, 6)
for k in range(30): i0 = int(R.uniform(0, 1.1) * SR); f = R.uniform(2500, 7000); y = np.sin(2 * np.pi * f * x[:int(.08 * SR)]) * np.exp(-x[:int(.08 * SR)] * 50); g[i0:i0 + len(y)] += y[:len(g) - i0] * .4
save('glass', g)
x = t(3.0); ph = np.cumsum(2 * np.pi * (52 + 6 * np.sin(2 * np.pi * 7 * x)) / SR); eng = (2 * ((ph / (2 * np.pi)) % 1) - 1); save('engine', lp(eng, 900) * .8 + lp(R.standard_normal(len(x)), 300) * .3)
x = t(1.2); save('screech', bp(R.standard_normal(len(x)), 2200, 3400) * np.minimum(1, x / .05) * np.exp(-x * 1.5) + np.sin(2 * np.pi * (2800 - 600 * x) * x) * .25 * np.exp(-x * 2))
x = t(2.2); save('sonic', lp(R.standard_normal(len(x)), 220) * env(x, .01, 2.2) * 2 + lp(R.standard_normal(len(x)), 2000) * env(x, .002, 12))
x = t(.25); save('beep', np.sin(2 * np.pi * 1760 * x) * (x < .2) * .6)
x = t(2.0); save('alarm', np.sign(np.sin(2 * np.pi * (700 + 300 * (np.sin(2 * np.pi * 1.5 * x) > 0)) * x)) * .3)
x = t(2.5); save('explode', lp(R.standard_normal(len(x)), 500) * env(x, .005, 1.8) * 2 + lp(R.standard_normal(len(x)), 3000) * env(x, .002, 8))
x = t(.9); save('phase', np.sin(2 * np.pi * (300 + 900 * x) * x) * np.sin(np.pi * x / .9) * .5 + bp(R.standard_normal(len(x)), 800, 4000) * np.sin(np.pi * x / .9) * .2)
x = t(.6); save('whirr', np.sin(2 * np.pi * (180 + 500 * x) * x) * np.sin(np.pi * x / .6) * .5 + np.sign(np.sin(2 * np.pi * 60 * x)) * .08 * np.sin(np.pi * x / .6))
x = t(4.0); save('void_drone', lp(sum(np.sin(2 * np.pi * f * x + R.uniform(0, 6)) for f in (41, 43.5, 55, 82)) + R.standard_normal(len(x)) * .3, 400) * np.minimum(1, x / .8))
x = t(1.5); save('fwoosh', bp(R.standard_normal(len(x)), 200, 2500) * np.sin(np.pi * np.minimum(1, x / 1.5)) ** 2)
x = t(.5); save('tick2', sum(np.sin(2 * np.pi * 3200 * x) * (np.abs(x - k * .12) < .004) for k in range(4)))
print('ok')
