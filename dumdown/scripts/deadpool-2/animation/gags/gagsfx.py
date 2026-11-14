# Comedy SFX made in code (48 kHz mono) + crowd reactions layered from many free local Kokoro voices.
import numpy as np, os, sys, subprocess, hashlib
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, resample
SR = 48000
R = np.random.default_rng(11)
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'sfx'); os.makedirs(OUT, exist_ok=True)
CACHE = os.path.join(HERE, 'tts_cache'); os.makedirs(CACHE, exist_ok=True)
def T(d): return np.arange(int(round(SR * d))) / SR
def N(d): return R.standard_normal(int(round(SR * d)))
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def ex(d, k): return np.exp(-T(d) * k)
def att(x, a=.004):
    n = int(SR * a); x = x.copy(); x[:n] *= np.linspace(0, 1, n); m = int(SR * .02); x[-m:] *= np.linspace(1, 0, m); return x
def norm(x, p=.9): return x / (np.max(np.abs(x)) or 1) * p
def at(dst, x, t):
    i = int(t * SR); n = min(len(x), len(dst) - i)
    if n > 0: dst[i:i + n] += x[:n]
def P(*xs):
    n = max(len(x) for x in xs); return sum(np.pad(x, (0, n - len(x))) for x in xs)
def blank(d): return np.zeros(int(SR * d))
def rev(x, rt=.6, mix=.25):
    ir = N(rt) * ex(rt, 7); ir = lp(ir, 5000); w = np.convolve(x, ir)[:len(x) + len(ir)]; w = w / (np.max(np.abs(w)) or 1) * np.max(np.abs(x))
    y = np.concatenate([x, np.zeros(len(ir))]); w = np.pad(w, (0, max(0, len(y) - len(w))))[:len(y)]; return y * (1 - mix) + w * mix
def saw(f, d):
    ph = np.cumsum(np.broadcast_to(f, T(d).shape) / SR); return 2 * (ph % 1) - 1
def sq(f, d):
    ph = np.cumsum(np.broadcast_to(f, T(d).shape) / SR); return np.sign(np.sin(2 * np.pi * ph))
def sine(f, d):
    ph = np.cumsum(np.broadcast_to(f, T(d).shape) / SR); return np.sin(2 * np.pi * ph)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
def bell(f, d, k=4):
    t = T(d); return sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * k * r ** .5) for r, a in [(1, 1), (2.76, .5), (5.4, .25), (8.93, .12)])
def tom(f, d=.35): return sine(f * (1 + .6 * ex(d, 30)), d) * ex(d, 9) + bp(N(d), 200, 2000) * ex(d, 40) * .4
def snare(d=.25): return bp(N(d), 1200, 7000) * ex(d, 16) + sine(190, d) * ex(d, 25) * .6
def cymbal(d=1.6):
    x = hp(N(d), 5000) * ex(d, 2.2); x += sum(np.sin(2 * np.pi * f * T(d)) for f in [3150, 4720, 5930, 7400]) * .05 * ex(d, 2.5); return x
def wav(name, x): wavfile.write(os.path.join(OUT, name + '.wav'), SR, (norm(x, .9) * 32767).astype(np.int16))
L = {}
def build():
    # ba-dum-tss
    x = blank(2.2); at(x, P(tom(170), snare() * .5), 0); at(x, P(tom(120), snare() * .5), .17); at(x, P(cymbal(1.8) * 1.4, snare() * .4), .42); L['rimshot'] = rev(x, .4, .15)
    # boing
    d = .9; f = 210 * (1 + .35 * np.sin(2 * np.pi * 11 * T(d)) * ex(d, 3.5)) * (1 + .5 * (1 - ex(d, 12))); L['boing'] = (sine(f, d) + .35 * sine(f * 2.01, d)) * ex(d, 3) * np.minimum(1, T(d) * 80)
    # record scratch (two strokes)
    def stroke(d, f0, f1):
        n = int(SR * d); out = np.zeros(n); src = N(d); fs = np.linspace(f0, f1, n)
        for i in range(0, n, 512): out[i:i + 512] = bp(src[max(0, i - 2048):i + 512], fs[i] * .6, fs[i] * 1.5)[-len(src[i:i + 512]):]
        return out * np.sin(np.pi * np.linspace(0, 1, n)) ** .6
    x = blank(.7); at(x, stroke(.18, 400, 2600), 0); at(x, stroke(.22, 2600, 300), .17); at(x, stroke(.12, 600, 1800), .42); L['scratch'] = x
    # air horn: three blasts
    def blast(d):
        f = 466 * (1 + .01 * np.sin(2 * np.pi * 7 * T(d))); s = saw(f, d) + saw(f * 1.006, d) + .6 * saw(f * 1.5, d)
        return np.tanh(bp(s, 300, 4000) * 3) * np.minimum(1, T(d) * 60) * np.minimum(1, (d - T(d)) * 40)
    x = blank(1.6); at(x, blast(.16), 0); at(x, blast(.16), .22); at(x, blast(.7), .45); L['airhorn'] = x
    x = blank(1.0); hk = lambda d: np.tanh(lp(sq(392, d) + sq(494, d) * .8, 3000) * 2) * np.minimum(1, T(d) * 200) * np.minimum(1, (d - T(d)) * 60) * .5; at(x, hk(.18), 0); at(x, hk(.42), .26); L['honk'] = x
    d = .6; L['buzzer'] = np.tanh(lp(sq(110, d) + sq(165, d) * .6, 2500) * 1.5) * np.minimum(1, (d - T(d)) * 30)
    knock = lambda: sine(520 * (1 + .3 * ex(.25, 50)), .25) * ex(.25, 22) + bp(N(.25), 800, 3500) * ex(.25, 60) * .8
    L['gavel'] = rev(knock(), .5, .2); x = blank(1.2); [at(x, knock(), k * .28) for k in range(3)]; L['gavel3'] = rev(x, .5, .2)
    x = blank(1.6); at(x, bp(N(.12), 500, 4000) * ex(.12, 30), 0); at(x, bp(N(.1), 800, 5000) * ex(.1, 30), .1); at(x, P(bell(2350, 1.4, 3) * .9, bell(2960, 1.3, 3) * .6), .22); L['cash'] = x
    # sad trombone: wah wah wah waaah
    def bone(m, d, wob=0):
        f = mtof(m) * (1 + (.03 * np.sin(2 * np.pi * 6 * T(d)) if wob else 0)); s = saw(f, d) + .5 * saw(f * 2, d)
        e = np.minimum(1, T(d) * 25) * np.minimum(1, (d - T(d)) * 12); fc = 600 + 1400 * e; return lp(s, 1600) * e * (.6 + .4 * np.sin(np.pi * np.clip(T(d) / d, 0, 1)))
    x = blank(2.8); at(x, bone(55, .42), 0); at(x, bone(54, .42), .45); at(x, bone(53, .42), .9); at(x, bone(52, 1.5, 1), 1.35); L['sad_trombone'] = rev(x, .5, .2)
    L['ding'] = bell(1568, 1.6, 2.5); x = blank(1.6); at(x, bell(1568, 1.2, 3), 0); at(x, bell(2093, 1.4, 3), .18); L['dingding'] = x
    # dun dun DUNNN brass/organ stabs
    def stab(ms, d):
        s = sum(saw(mtof(m), d) + saw(mtof(m) * 1.004, d) for m in ms); e = np.minimum(1, T(d) * 30) * np.minimum(1, (d - T(d)) * 6); return lp(s, 1800) * e
    x = blank(2.9); at(x, stab([50, 57, 62], .28), 0); at(x, stab([49, 56, 61], .28), .34); at(x, stab([46, 53, 58, 62], 2.0), .7); L['dundun'] = rev(x, 1.0, .3)
    d = 1.8; s = sum(sine(mtof(m) * k, d) / k for m in [45, 52, 57, 60] for k in (1, 2, 3, 4)); L['organ'] = rev(s * (1 + .3 * np.sin(2 * np.pi * 6 * T(d))) * np.minimum(1, T(d) * 8) * np.minimum(1, (d - T(d)) * 3), 1.0, .3)
    # trailer braam
    d = 2.6; f = 43.65; s = sum(saw(f * k * (1 + .003 * i), d) for i, k in enumerate([1, 1.5, 2, 3])) ; s = np.tanh(lp(s, 700) * 2.5) + sine(f / 2, d) * 1.2
    L['braam'] = rev(s * np.minimum(1, T(d) * 30) * ex(d, 1.0), 1.4, .35)
    def caw(d=.32):
        f = 620 * (1 - .25 * T(d) / d); src = saw(f, d) * (1 + .7 * N(d) * .3); return np.tanh(bp(src, 700, 2600) * 4) * np.sin(np.pi * np.linspace(0, 1, int(SR * d))) ** .5
    x = blank(1.3); at(x, caw(), 0); at(x, caw(.4), .45); L['caw'] = rev(x, .9, .35)
    # kazoo jingle (original tune)
    x = blank(1.6); notes = [(72, .15), (76, .15), (79, .15), (76, .15), (84, .45), (79, .45)]; tt = 0
    for m, d in notes:
        f = mtof(m) * (1 + .01 * np.sin(2 * np.pi * 5 * T(d))); s = bp(saw(f, d) * (1 + .25 * N(d)), 400, 3500); at(x, np.tanh(s * 3) * np.minimum(1, T(d) * 50) * np.minimum(1, (d - T(d)) * 30), tt); tt += d
    L['kazoo'] = x
    def dt(a, b, d=.12): return (sine(a, d) + sine(b, d)) * np.minimum(1, (d - T(d)) * 80)
    x = blank(.6); at(x, dt(852, 1477), 0); L['dtmf'] = x
    d = .3; L['swipe'] = hp(N(d), 2000) * np.sin(np.pi * np.linspace(0, 1, int(SR * d))) ** 2
    x = blank(1.4); [at(x, bell(3100 + 400 * (k % 2), .9, 6) * .6, k * .07) for k in range(6)]; L['shopbell'] = x
    shut = wavfile.read('/mnt/project-files/2d-dynamic/shared/sfx/camera_shutter.wav')[1].astype(float); shut = shut if shut.ndim == 1 else shut.mean(1)
    x = blank(1.6); [at(x, shut * (.5 + .5 * R.random()), k * .13 + R.random() * .05) for k in range(9)]; L['camera_burst'] = x
    d = .45; L['zap'] = sine(2400 * ex(d, 6) + 200, d) * (1 + .5 * sine(60, d)) * ex(d, 3)
    x = blank(1.0); [at(x, bp(N(.03), 1500, 6000) * ex(.03, 80) * R.random(), R.random() * .9) for _ in range(60)]; L['crunch'] = x
    def chirp(d=.07): return sine(np.linspace(3800, 5200, int(SR * d)), d) * np.sin(np.pi * np.linspace(0, 1, int(SR * d)))
    x = blank(1.4); [at(x, chirp() * .7, k * .11 + (k // 3) * .25) for k in range(9)]; L['birds_tweet'] = x; x = blank(.8); [at(x, chirp(), k * .1) for k in range(4)]; L['tweet'] = x
    d = 1.1; L['gunshot'] = rev(np.tanh(lp(N(d), 3000) * ex(d, 14) * 3) + sine(60, d) * ex(d, 6), .9, .3)
    def coo(): d = .9; f = 330 + 60 * np.sin(np.pi * T(d) / d); return lp(sine(f, d) + .3 * sine(f * 2, d), 900) * (np.sin(2 * np.pi * 3.3 * T(d)) * .5 + .5) * np.sin(np.pi * np.linspace(0, 1, int(SR * d)))
    x = blank(2.2); at(x, coo(), 0); at(x, coo() * .7, 1.0); L['coo'] = x
    d = .55; L['teeth'] = hp(N(d), 3000) * np.sin(np.pi * np.linspace(0, 1, int(SR * d))) ** 3 * .6
    clank = lambda: P(bell(1900, .5, 9) * .6, bp(N(.08), 2000, 8000) * ex(.08, 40)); x = blank(1.0); at(x, clank(), 0); at(x, clank() * .8, .3); L['wrench'] = x
    # robot singing (original melody): square formant beeps
    x = blank(3.2); tt = 0
    for m, d in [(64, .3), (67, .3), (71, .6), (69, .3), (67, .3), (64, .6), (62, .3), (64, .6)]:
        s = bp(sq(mtof(m), d) * (1 + .3 * sine(7, d)), 300, 2400); at(x, s * np.minimum(1, T(d) * 40) * np.minimum(1, (d - T(d)) * 20), tt); tt += d
    L['robosing'] = rev(x, .5, .25)
    x = blank(2.6)
    for k in range(5):
        for j in range(3): at(x, sine(4600, .03) * np.sin(np.pi * np.linspace(0, 1, int(SR * .03))) * .6, k * .5 + j * .05)
    L['crickets'] = x
    x = blank(1.0); at(x, lp(N(.05), 600) * 2 * ex(.05, 40), 0.0); at(x, sine(2900, .6) * np.minimum(1, T(.6) * 6) * ex(.6, 4) * .25, .15); L['mic'] = x
    d = 1.4; L['bell'] = (np.sin(2 * np.pi * 1180 * T(d)) + .5 * np.sin(2 * np.pi * 1630 * T(d))) * (np.sin(2 * np.pi * 22 * T(d)) > 0) * np.minimum(1, (d - T(d)) * 10)
    d = .8; L['string'] = sine(140 * (1 + .05 * ex(d, 8)), d) * ex(d, 5) + saw(140, d) * ex(d, 12) * .3
    d = .8; L['gasp1'] = bp(N(d), 700, 3200) * np.sin(np.pi * np.clip(np.linspace(0, 1.3, int(SR * d)), 0, 1)) ** 2
    for k, v in L.items(): wav(k, att(v))

# ---------- local voices ----------
KOK = '/tmp/kok'
_K = None
def tts(spk, text, ls=1.0):
    global _K
    h = hashlib.md5(f'k|{spk}|{ls}|{text}'.encode()).hexdigest()[:16]; f = os.path.join(CACHE, h + '.wav')
    if not os.path.exists(f):
        if _K is None:
            from kokoro_onnx import Kokoro; _K = Kokoro(KOK + '/kokoro-v1.0.onnx', KOK + '/voices-v1.0.bin')
        a, sr = _K.create(text, voice=spk, speed=max(.5, min(2.0, 1 / ls)), lang='en-gb' if spk[:1] == 'b' else 'en-us')
        wavfile.write(f, sr, (np.clip(a, -1, 1) * 32767).astype(np.int16))
    sr, x = wavfile.read(f); x = x.astype(float) / 32768; return resample(x, int(len(x) * SR / sr))
FEM = ['af_alloy', 'af_aoede', 'af_bella', 'af_heart', 'af_jessica', 'af_kore', 'af_nicole', 'af_nova', 'af_river', 'af_sarah', 'af_sky', 'bf_alice', 'bf_emma', 'bf_isabella', 'bf_lily']
MAL = ['am_adam', 'am_echo', 'am_eric', 'am_fenrir', 'am_liam', 'am_michael', 'am_onyx', 'am_puck', 'bm_daniel', 'bm_fable', 'bm_george', 'bm_lewis']
def crowd(texts, n, spread, pitch=(0.9, 1.15), ls=(.75, 1.05), seed=1, chip=1.0):
    rr = np.random.default_rng(seed); out = blank(spread + 3)
    for i in range(n):
        spk = str(rr.choice(FEM + MAL)); t = texts[int(rr.integers(len(texts)))]; x = tts(spk, t, round(float(rr.uniform(*ls)), 2))
        k = rr.uniform(*pitch) * chip; x = resample(x, int(len(x) / k)); at(out, x * rr.uniform(.5, 1), rr.uniform(0, spread))
    out = lp(hp(out, 150), 6000); return rev(out, .9, .35)
def build_crowd():
    HA = ['Ha ha ha ha ha!', 'Hahaha!', 'Ha ha ha!', 'Heh heh heh heh.', 'Ho ho ho ho!', 'Ha! Ha ha ha!', 'Hah hah hah!']
    wav('laugh_small', crowd(HA, 6, .4, seed=3)); wav('laugh_mid', crowd(HA, 12, .5, seed=4)); wav('laugh_big', crowd(HA, 22, .6, seed=5))
    a = crowd(HA, 20, .5, seed=6); b = crowd(['Whooo!', 'Woo hoo!', 'Ooooh!'], 8, .6, seed=7); n = max(len(a), len(b)); wav('laugh_whoo', np.pad(a, (0, n - len(a))) + .8 * np.pad(b, (0, n - len(b))))
    wav('aww', crowd(['Awwww.', 'Aww!', 'Awwwww!'], 14, .4, seed=8, ls=(1.1, 1.5))); wav('ooh', crowd(['Ooooh!', 'Oooh.', 'Ohhh!'], 14, .4, seed=9, ls=(1.1, 1.4)))
    g = blank(1.5); [at(g, L.get('gasp1', bp(N(.8), 700, 3200)) * R.uniform(.4, 1), R.uniform(0, .15)) for _ in range(10)]; wav('gasp', rev(g, .6, .3))
    wav('hi_all', crowd(['Hi, Loki.', 'Hi Loki.', 'Hey, Loki.'], 9, .25, seed=10, ls=(.9, 1.1)))
    x = blank(4); c = crowd(['Strike!', 'Strike! Strike!'], 10, .12, seed=11, chip=1.12, ls=(.85, 1.0)); [at(x, c, k * .62) for k in range(4)]; wav('chant', x)
if __name__ == '__main__':
    build(); build_crowd(); print('ok', len(os.listdir(OUT)))
