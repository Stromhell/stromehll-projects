# Shared mixer for DumDown acts: VO (ElevenLabs) + code SFX (mksfx.py library) + code score (score.py). No other AI audio.
import numpy as np, subprocess
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000
SFXDIR = '/tmp/claude-0/-home-user/eca28a6f-197e-5823-8545-e6c017ffb7cd/scratchpad/cold2/ep1/sfx/'
rng = np.random.default_rng(4)
def lp(a, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), a)
def hp(a, f): return sosfilt(butter(2, f, 'high', fs=SR, output='sos'), a)
class Mix:
    def __init__(s, dur): s.N = int(SR * dur); s.out = np.zeros(s.N); s.dur = dur
    def load(s, n):
        sr, a = wavfile.read(SFXDIR + n + '.wav'); a = a.astype(np.float32) / 32768
        return a.mean(1) if a.ndim > 1 else a
    def place(s, a, t0, t1=None, g=1.0, fi=.2, fo=.3, loop=False):
        if isinstance(a, str): a = s.load(a)
        i0 = int(t0 * SR); L = int((t1 - t0) * SR) if t1 else len(a)
        if loop and L > len(a): a = np.tile(a, int(L / len(a)) + 1)
        a = a[:L].copy(); n = len(a)
        if n == 0 or i0 >= s.N: return
        if fi: k = min(n, int(fi * SR)); a[:k] *= np.linspace(0, 1, k)
        if fo: k = min(n, int(fo * SR)); a[-k:] *= np.linspace(1, 0, k)
        n = min(n, s.N - i0); s.out[i0:i0 + n] += a[:n] * g
    def tone(s, f, d, decay=4, kind='sine'):
        x = np.arange(int(d * SR)) / SR; w = np.sin(2 * np.pi * f * x) if kind == 'sine' else np.sign(np.sin(2 * np.pi * f * x)) * .5
        return w * np.exp(-x * decay) * np.minimum(1, x * 200)
    def bells(s, t0, notes, step=.3, g=.35):  # tiny sleigh-bell style melody (public-domain tune), synthesized
        for i, n in enumerate(notes):
            if n is None: continue
            f = 440 * 2 ** ((n - 9) / 12) * 2
            s.place(s.tone(f, .5, 6) + .4 * np.pad(s.tone(f * 2.76, .3, 12), (0, int(.5 * SR) - int(.3 * SR))), t0 + i * step, None, g, 0, .05)
    def render(s, vo_mp3, score_wav, out_wav, lead=.6, mus_g=.38, sfx_g=.5):
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', vo_mp3, '-ar', str(SR), '-ac', '1', '/tmp/claude-0/-home-user/eca28a6f-197e-5823-8545-e6c017ffb7cd/scratchpad/_vo48.wav'])
        sr, vo = wavfile.read('/tmp/claude-0/-home-user/eca28a6f-197e-5823-8545-e6c017ffb7cd/scratchpad/_vo48.wav'); vo = vo.astype(np.float32) / 32768
        v = np.zeros(s.N); i0 = int(lead * SR); n = min(len(vo), s.N - i0); v[i0:i0 + n] = vo[:n]
        sr, mu = wavfile.read(score_wav); mu = mu.astype(np.float32) / 32768
        if mu.ndim > 1: mu = mu.mean(1)
        mu = mu[:s.N] if len(mu) >= s.N else np.pad(mu, (0, s.N - len(mu)))
        from scipy.ndimage import uniform_filter1d; env = uniform_filter1d(np.abs(v), int(.3 * SR)); duck = 1 - .40 * np.clip(env / (env.max() * .25 + 1e-9), 0, 1)
        mus = mu * mus_g * duck; k = int(1.0 * SR); mus[:k] *= np.linspace(0, 1, k); k = int(2.5 * SR); mus[-k:] *= np.linspace(1, 0, k)
        mix = v + mus + s.out * sfx_g; mix /= max(1e-9, np.abs(mix).max()) / .89
        wavfile.write(out_wav, SR, (mix * 32767).astype(np.int16)); print('mix ok', s.dur)
