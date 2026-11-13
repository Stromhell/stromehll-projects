# Loki S1+S2 act audio: Kokoro VO (free, local) + code score (styles per scene) + code/library SFX driven by the shot cues. No AI audio services.
# usage: python mixloki.py NN [NN...]  -> SCR/mix/actNN.wav
import sys, os, json, subprocess, numpy as np
from scipy.io import wavfile
from scipy.signal import resample
from scipy.ndimage import uniform_filter1d
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, 'gags'))
import gagaudio as GA
from gagsfx import SR, lp, hp
SCR = '/tmp/claude-0/-home-user/acf60ddd-1269-5955-894d-60b48246689c/scratchpad/loki'; os.makedirs(SCR + '/mix', exist_ok=True)
SFXD = [os.path.join(HERE, 'gags', 'sfx'), '/mnt/project-files/2d-dynamic/shared/sfx']
GA.STY.update({
 'tva':     dict(bpm=100, prog=[(62, 'min'), (55, 'dom'), (60, 'maj'), (57, 'min')], inst=GA.organ, mel=GA.bell, drums='brush', walk=True, mel_oct=12),
 'mystery': dict(bpm=70, prog=[(57, 'm'), (53, 'M'), (58, 'M'), (52, 'M')], inst=GA.pad, mel=None, drums='', pizz=True),
 'ominous': dict(bpm=58, prog=[(50, 'm'), (50, 'm'), (51, 'M'), (49, 'M')], inst=GA.pad, mel=None, drums=''),
 'action':  dict(bpm=138, prog=[(57, 'm'), (53, 'M'), (55, 'M'), (52, 'M')], inst=GA.brass, mel=None, drums='four', stab=True),
 'sad':     dict(bpm=62, prog=[(57, 'min'), (53, 'maj'), (48, 'maj'), (55, 'M')], inst=GA.pad, mel=None, drums='', arp=True),
 'epic':    dict(bpm=84, prog=[(50, 'm'), (46, 'M'), (48, 'M'), (45, 'M')], inst=GA.brass, mel=None, drums='march', stab=True),
 'wonder':  dict(bpm=66, prog=[(62, 'M'), (67, 'M'), (59, 'm'), (69, 'M')], inst=GA.pad, mel=None, drums='', arp=True),
})
PLATE_MOOD = {'tva_office': 'tva', 'tva_lobby': 'tva', 'tva_corridor': 'tva', 'archive': 'tva', 'interrogation': 'tension', 'court': 'tension', 'workshop': 'tva',
  'lamentis': 'mystery', 'void': 'mystery', 'train': 'romance', 'ark': 'action', 'keepers': 'ominous', 'citadel': 'ominous', 'citadel_int': 'ominous',
  'loom': 'tension', 'loom_ctrl': 'tension', 'throne': 'epic', 'gobi': 'mystery', 'ny_lobby': 'tva', 'theatre': 'comedy', 'renfair': 'comedy', 'pompeii': 'action',
  'roxxcart': 'tension', 'london': 'comedy', 'diner': 'lounge', 'alley1868': 'mystery', 'fair1893': 'comedy', 'jetski': 'comedy', 'alcatraz': 'action', 'clinic': 'lounge',
  'bookshop': 'lounge', 'beach': 'wonder', 'tva_ruin': 'sad'}
GA.STY['comedy'] = GA.STY['sitcom']; GA.STY['romance'] = GA.STY['harp']
# per-act overrides: shot index -> mood
OVR = {'00': {0: 'action'}, '04': {7: 'romance', 8: 'romance', 9: 'sad'}, '05': {0: 'romance', 1: 'romance', 3: 'romance', 11: 'action', 12: 'mystery'},
  '07': {7: 'sad', 8: 'tension', 9: 'sad', 10: 'sad', 11: 'sad'}, '09': {7: 'action'}, '11': {5: 'sad', 6: 'epic'}, '12': {7: 'action', 8: 'tension'},
  '13': {7: 'sad', 8: 'sad', 9: 'epic', 10: 'epic', 11: 'epic', 12: 'wonder', 13: 'wonder', 14: 'wonder', 15: 'wonder', 16: 'lounge'}, '14': {0: 'wonder', 1: 'comedy', 2: 'comedy', 3: 'comedy'}}
AMB = {'tva': ('office_loop', .10), 'lamentis': ('fire_loop', .12), 'void': ('wind_loop', .14), 'diner': ('crowd_loop', .07), 'fair1893': ('crowd_loop', .10), 'theatre': ('crowd_loop', .06),
  'london': ('city_loop', .10), 'jetski': ('ocean_loop', .12), 'beach': ('ocean_loop', .14), 'alley1868': ('night_loop', .12), 'loom': ('hum_loop', .12), 'loom_ctrl': ('hum_loop', .12),
  'citadel': ('wind_loop', .12), 'citadel_int': ('hum_loop', .06), 'pompeii': ('fire_loop', .14), 'renfair': ('crowd_loop', .1), 'train': ('hum_loop', .08), 'keepers': ('drone', .08),
  'throne': ('wind_loop', .07), 'gobi': ('wind_loop', .12), 'alcatraz': ('ocean_loop', .08), 'tva_ruin': ('wind_loop', .1), 'roxxcart': ('crowd_loop', .08), 'ark': ('fire_loop', .1)}
_C = {}
def S(n):
    if n not in _C:
        for d in SFXD:
            p = os.path.join(d, n + '.wav')
            if os.path.exists(p): _C[n] = GA.load(p); break
        else: raise SystemExit('missing ' + n)
    return _C[n]
def place(buf, a, t0, t1=None, g=1., fi=.02, fo=.05, loop=False):
    i0 = int(t0 * SR); L = int((t1 - t0) * SR) if t1 else len(a)
    if loop and L > len(a): a = np.tile(a, L // len(a) + 1)
    a = a[:L].copy(); n = min(len(a), len(buf) - i0)
    if n <= 0: return
    a = a[:n]; k = min(n, int(fi * SR))
    if k: a[:k] *= np.linspace(0, 1, k)
    k = min(n, int(fo * SR))
    if k: a[-k:] *= np.linspace(1, 0, k)
    buf[i0:i0 + n] += a * g
def act(nn):
    cu = json.loads(subprocess.run(['node', 'cues.cjs', nn], capture_output=True, text=True, cwd=HERE, check=True).stdout); dur = cu['dur']; N = int(SR * dur)
    sr, vo = wavfile.read(f'{SCR}/vo/act{nn}.wav'); vo = vo.astype(float); vo = vo.mean(1) if vo.ndim > 1 else vo; vo /= 32768 if np.abs(vo).max() > 2 else 1
    if sr != SR: vo = resample(vo, int(len(vo) * SR / sr))
    vo = hp(vo, 70); vo = vo / (np.sqrt(np.mean(vo[np.abs(vo) > .02] ** 2)) or 1) * .11
    V = np.zeros(N); place(V, vo, .6, g=1, fi=0, fo=0)
    # score: merge consecutive shots with the same mood, crossfade 1.2 s
    ov = OVR.get(nn, {}); segs = []
    for i, s in enumerate(cu['shots']):
        m = ov.get(i, PLATE_MOOD.get(s['plate'], 'tva'))
        if segs and segs[-1][2] == m: segs[-1][1] = s['b']
        else: segs.append([s['a'], s['b'], m])
    M = np.zeros(N + SR * 4)
    for k, (a, b, m) in enumerate(segs):
        d = b - a + 1.2; x = GA.music(m, d, int(nn) * 31 + k); place(M, x, max(0, a - .6), g=1, fi=.6, fo=.6)
    M = M[:N]; env = uniform_filter1d(np.abs(V), int(.3 * SR)); duck = 1 - .45 * np.clip(env / (env.max() * .25 + 1e-9), 0, 1)
    M = M * .05 * duck; k = int(1.0 * SR); M[:k] *= np.linspace(0, 1, k); k = int(2.0 * SR); M[-k:] *= np.linspace(1, 0, k)
    # sfx from cues
    X = np.zeros(N)
    for i, s in enumerate(cu['shots']):
        a, b = s['a'], s['b']
        if i: place(X, S('whoosh_soft'), a - .15, g=.22)
        amb = AMB.get(s['plate']) or (AMB['tva'] if (s['plate'] or '').startswith('tva') else None)
        if amb: place(X, S(amb[0]), a, b, g=amb[1] * 1.6, fi=.25, fo=.25, loop=True)
        if s['title']: place(X, S('swell'), a + .1, g=.35); place(X, S('hit'), a + .45, g=.45)
        for p in s['pops']: place(X, S('pop'), p, g=.5); place(X, S('boing'), p + .05, g=.12)
        for c in s['cards']: place(X, S('whoosh'), c - .1, g=.35); place(X, S('ding'), c + .3, g=.3); place(X, S('swipe'), c + .05, g=.25)
        if s['big'] is not None: place(X, S('hit'), s['big'], g=.6); place(X, S('braam') if s['grade'] in ('#ff2a2a', '#ff3a1a', '#ff5a3a', '#ff2a00', '#a83a3a') else S('riser'), s['big'] - (0 if s['grade'] else .9), g=.3)
        if s['shake']: place(X, S('drone'), a, b, g=.25, fi=.3, fo=.4, loop=True); place(X, S('thud'), a + .05, g=.4)
        if 'flash' in s['fx']: place(X, S('hit'), a, g=.6); place(X, S('zap'), a, g=.3)
        if 'whiteout' in s['fx']: place(X, S('riser'), max(a, b - 2.2), g=.45)
        if 'rain' in s['fx']: place(X, S('rain_loop'), a, b, g=.3, loop=True, fi=.3, fo=.3)
        if s['walk']: place(X, S('footsteps'), a, b, g=.25, loop=True, fi=.2, fo=.3)
    X = X * .6
    mix = V + M + X; mix = mix / (np.abs(mix).max() or 1) * .89
    wavfile.write(f'{SCR}/mix/act{nn}.wav', SR, (mix * 32767).astype(np.int16)); print(nn, round(dur, 2), [s[2] for s in segs], flush=True)
if __name__ == '__main__':
    for nn in sys.argv[1:]: act(nn)
