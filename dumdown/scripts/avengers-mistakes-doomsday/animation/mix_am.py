# DumDown Secret Invasion act audio: Chatterbox Fenrir VO (local) + code score (styles per scene) + code/library SFX driven by the shot cues. No AI audio services.
# usage: python mixloki.py NN [NN...]  -> SCR/mix/actNN.wav
import sys, os, json, subprocess, numpy as np
from scipy.io import wavfile
from scipy.signal import resample
from scipy.ndimage import uniform_filter1d
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, 'gags'))
import gagaudio_am as GA
from gagsfx import SR, lp, hp
SCR = os.environ.get('SCR', '/tmp/amwork'); os.makedirs(SCR + '/mix', exist_ok=True)
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
GA.STY['comedy'] = GA.STY['sitcom']; GA.STY['romance'] = GA.STY['harp']
PLATE_MOOD = {'sd_doom_throne': 'ominous', 'kam_bedroom': 'comedy', 'station': 'wonder', 'tear_space': 'tension', 'xlab': 'mystery', 'sd_living': 'comedy', 'kate_door': 'comedy',
  'sd_ancient_city': 'wonder', 'nebula': 'epic', 'sd_tv_studio': 'comedy', 'sd_airport': 'action', 'pit': 'action', 'bunker': 'sad', 'desert_mountain': 'lounge', 'sd_dc_office': 'comedy', 'sd_dc_lobby': 'tension',
  'limo_int': 'comedy', 'sd_sanctum': 'mystery', 'sd_basement': 'tension', 'times_dark': 'action', 'void_grey': 'ominous', 'sd_sad_apt': 'sad', 'sd_suburb': 'lounge', 'sd_conf_room': 'tension', 'icebox': 'action',
  'snow_forest': 'sad', 'sd_lake_house': 'sad', 'sd_avenue': 'comedy', 'sd_tony_lab': 'tension', 'sky_drop': 'action', 'sd_time_room': 'mystery', 'times_sq': 'action', 'tva_office': 'tension', 'sd_room_1940s': 'romance', 'sd_living_night': 'comedy'}
OVRP = {'00': {2: 'epic'}, '12': {3: 'epic'}, '13': {0: 'comedy'}}
OVR = {}
AMB = {'bunker': ('hum_loop', .08), 'sd_tony_lab': ('hum_loop', .06), 'sd_dc_office': ('office_loop', .05), 'sd_airport': ('wind_loop', .06), 'snow_forest': ('wind_loop', .1), 'sd_lake_house': ('birds_loop', .06), 'sd_avenue': ('city_loop', .05), 'times_sq': ('city_loop', .05), 'sd_doom_throne': ('fire_loop', .04)}
# action -> (sfx, gain, offset)
ACTS = {'punch': [('punch', .7, 0), ('whoosh_soft', .4, -.12)], 'smash': [('hit', .8, 0), ('crunch', .5, 0)], 'hitBack': [('hit', .6, 0)], 'block': [('thud', .4, 0)],
  'fall': [('thud', .7, .45), ('whoosh_soft', .35, 0)], 'slump': [('whoosh_soft', .2, 0)], 'kneelHold': [('thud', .3, 0)], 'flip': [('whoosh', .5, -.1), ('thud', .4, .35)],
  'dive': [('whoosh', .5, 0), ('thud', .5, .4)], 'duck': [('whoosh_soft', .4, 0)], 'wince': [('creak', .6, 0)], 'powerUp': [('riser', .5, -.6), ('fwoosh', .5, 0)],
  'scream': [('braam', .3, 0)], 'fire': [('fwoosh', .6, 0)], 'morph': [('phase', .5, -.1), ('boing', .15, .1)], 'sip': [('slurp', .45, .1)], 'toss': [('whoosh_soft', .4, 0)],
  'tossFolder': [('paper', .6, 0), ('thud', .3, .4)], 'openCase': [('clang', .4, 0)], 'movePiece': [('tick', .6, 0)], 'grab': [('swipe', .35, 0)], 'hug': [('aww', .25, .2)],
  'freeze': [('scratch', .35, 0)], 'facepalm': [('kick', .3, 0)], 'pat': [('pop', .2, 0)], 'raise': [('swipe', .2, 0)], 'stride': [('footsteps', .3, 0)], 'run': [], 'dance': [],
  'shrug': [], 'point': [], 'pointHold': [('swipe', .2, 0)], 'holdUp1': [], 'holdUp2': [], 'rubEye': [], 'plop': [('thud', .4, 0), ('creak', .3, .05)], 'sit': [], 'limp': [], 'rollBad': [('thud', .5, .3)]}
PROPS = {'morph': [('phase', .4, 0)], 'shatter': [('glass', .6, 0)], 'fireBall': [('fwoosh', .5, 0)], 'iceBurst': [('crunch', .5, 0)], 'vineArm': [('whirr', .4, 0)],
  'glowRing': [('zap', .35, 0), ('phase', .3, 0)], 'folder': [('paper', .4, 0)], 'case': [('clang', .3, 0)]}
_C = {}
def S(n):
    if n not in _C:
        for d in SFXD:
            p = os.path.join(d, n + '.wav')
            if os.path.exists(p): _C[n] = GA.load(p); break
        else: raise SystemExit('missing ' + n)
    return _C[n]
def place(buf, a, t0, t1=None, g=1., fi=.02, fo=.05, loop=False):
    if t0 < 0: a = a[int(-t0 * SR):]; t0 = 0
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
    cu = json.loads(subprocess.run(['node', 'cues_si.cjs', nn], capture_output=True, text=True, cwd=HERE, check=True, env=dict(os.environ, VO='/tmp/amwork/timing')).stdout); TJ = json.load(open(f'/tmp/amwork/timing/act{nn}.json')); GPS = {g['p'] for g in TJ['gags']}; dur = cu['dur']; N = int(SR * dur)
    sr, vo = wavfile.read(f'{SCR}/timing/act{nn}_vo.wav') if False else (48000, __import__('soundfile').read(f'{SCR}/timing/act{nn}_vo.wav')[0]); vo = vo.astype(float); vo = vo.mean(1) if vo.ndim > 1 else vo; vo /= 32768 if np.abs(vo).max() > 2 else 1
    if sr != SR: vo = resample(vo, int(len(vo) * SR / sr))
    vo = hp(vo, 70); vo = vo / (np.sqrt(np.mean(vo[np.abs(vo) > .02] ** 2)) or 1) * .11
    V = np.zeros(N); place(V, vo, .6, g=1, fi=0, fo=0)
    gt = __import__('soundfile').read(f'{SCR}/timing/act{nn}_gag.wav')[0]; gt = gt.mean(1) if gt.ndim > 1 else gt; Gk = np.zeros(N); place(Gk, gt * 1.1, .6, g=1, fi=0, fo=0)
    # score: merge consecutive shots with the same mood, crossfade 1.2 s
    ov = OVR.get(nn, {}); segs = []
    for i, s in enumerate(cu['shots']):
        m = 'none' if s.get('p') in GPS else OVRP.get(nn, {}).get(s.get('p'), PLATE_MOOD.get(s.get('plate'), 'comedy'))
        if segs and segs[-1][2] == m: segs[-1][1] = s['b']
        else: segs.append([s['a'], s['b'], m])
    M = np.zeros(N + SR * 4)
    for k, (a, b, m) in enumerate(segs):
        d = b - a + 1.2; x = GA.music(m, d, int(nn) * 31 + k) if m != 'none' else np.zeros(int(SR * d)); place(M, x, max(0, a - .6), g=1, fi=.6, fo=.6)
    M = M[:N]; env = uniform_filter1d(np.abs(V), int(.3 * SR)); duck = 1 - .45 * np.clip(env / (env.max() * .25 + 1e-9), 0, 1)
    M = M * .07 * duck; k = int(1.0 * SR); M[:k] *= np.linspace(0, 1, k); k = int(2.0 * SR); M[-k:] *= np.linspace(1, 0, k)
    # sfx from cues
    X = np.zeros(N)
    for i, s in enumerate(cu['shots']):
        a, b = s['a'], s['b']
        if i and s.get('p') not in GPS: place(X, S('whoosh_soft'), a - .15, g=.22)
        if i and (s.get('p') in GPS) != (cu['shots'][i - 1].get('p') in GPS): place(X, S('whoosh'), a - .25, g=.5); place(X, S('swipe'), a - .05, g=.3)  # comic wipe into / out of a gag
        amb = AMB.get(s.get('plate'))
        if amb: place(X, S(amb[0]), a, b, g=amb[1] * 1.6, fi=.25, fo=.25, loop=True)
        if s['title']: place(X, S('swell'), a + .1, g=.35); place(X, S('hit'), a + .45, g=.45)
        for p in s['pops']: place(X, S('pop'), p, g=.5) if s.get('p') in GPS else (place(X, S('pop'), p, g=.5), place(X, S('boing'), p + .05, g=.12))
        for c in s['cards']: place(X, S('whoosh'), c - .1, g=.35); place(X, S('ding'), c + .3, g=.3); place(X, S('swipe'), c + .05, g=.25)
        if s.get('big') is not None: place(X, S('hit'), s['big'], g=.6); place(X, S('braam') if s['grade'] in ('#ff2a2a', '#ff3a1a', '#ff5a3a', '#ff2a00', '#a83a3a') else S('riser'), s['big'] - (0 if s['grade'] else .9), g=.3)
        if s['shake']: place(X, S('drone'), a, b, g=.25, fi=.3, fo=.4, loop=True); place(X, S('thud'), a + .05, g=.4)
        if 'flash' in s['fx']: place(X, S('hit'), a, g=.6); place(X, S('zap'), a, g=.3)
        if 'whiteout' in s['fx']: place(X, S('riser'), max(a, b - 2.2), g=.45)
        if 'rain' in s['fx']: place(X, S('rain_loop'), a, b, g=.3, loop=True, fi=.3, fo=.3)
        for bt in s.get('booms', []): place(X, S('hit'), bt, g=.7); place(X, S('thud'), bt, g=.6); place(X, S('fire_loop'), bt, bt + 1.6, g=.35, fo=.8, loop=True)
        for (n, t) in s.get('acts', []):
            for (f, g, o) in ACTS.get(n, []): place(X, S(f), t + o, g=g)
        for (n, t) in s.get('props', []):
            for (f, g, o) in PROPS.get(n, []): place(X, S(f), t + o, g=g)
        if s.get('run'): place(X, S('run_steps'), a, b, g=.3, loop=True, fi=.2, fo=.3)
        if s['walk'] and not s.get('run'): place(X, S('footsteps'), a, b, g=.25, loop=True, fi=.2, fo=.3)
    for k, tm in enumerate(cu.get('meter', [])): place(X, S('dingding' if k else 'ding'), tm, g=.45); place(X, S('cash'), tm + .05, g=.2)
    X = X * .6
    mix = V + Gk + M + X; mix = mix / (np.abs(mix).max() or 1) * .89
    wavfile.write(f'{SCR}/mix/act{nn}.wav', SR, (mix * 32767).astype(np.int16)); print(nn, round(dur, 2), [s[2] for s in segs], flush=True)
if __name__ == '__main__':
    for nn in sys.argv[1:]: act(nn)
