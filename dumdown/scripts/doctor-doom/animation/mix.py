# Doctor Doom act audio: Kokoro VO + code score (mood per shot) + library/code SFX from shot cues. No AI audio services.
# usage: python3 mix.py act00 [act01 ...] -> /tmp/ddwork/mix/actNN.wav
import sys, os, json, subprocess, numpy as np
from scipy.io import wavfile
from scipy.signal import resample
from scipy.ndimage import uniform_filter1d
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, 'gags'))
import gagaudio as GA
from gagsfx import SR, hp
SCR = '/tmp/ddwork'; os.makedirs(SCR + '/mix', exist_ok=True)
SFXD = [os.path.join(HERE, 'gags', 'sfx'), '/mnt/project-files/2d-dynamic/shared/sfx']
GA.STY.update({
 'mystery': dict(bpm=70, prog=[(57, 'm'), (53, 'M'), (58, 'M'), (52, 'M')], inst=GA.pad, mel=None, drums='', pizz=True),
 'ominous': dict(bpm=58, prog=[(50, 'm'), (50, 'm'), (51, 'M'), (49, 'M')], inst=GA.pad, mel=None, drums=''),
 'action':  dict(bpm=138, prog=[(57, 'm'), (53, 'M'), (55, 'M'), (52, 'M')], inst=GA.brass, mel=None, drums='four', stab=True),
 'sad':     dict(bpm=62, prog=[(57, 'min'), (53, 'maj'), (48, 'maj'), (55, 'M')], inst=GA.pad, mel=None, drums='', arp=True),
 'epic':    dict(bpm=84, prog=[(50, 'm'), (46, 'M'), (48, 'M'), (45, 'M')], inst=GA.brass, mel=None, drums='march', stab=True),
 'wonder':  dict(bpm=66, prog=[(62, 'M'), (67, 'M'), (59, 'm'), (69, 'M')], inst=GA.pad, mel=None, drums='', arp=True),
 'royal':   dict(bpm=104, prog=[(60, 'M'), (65, 'M'), (67, 'dom'), (60, 'M')], inst=GA.brass, mel=None, drums='march', stab=True),
 'folk':    dict(bpm=96, prog=[(62, 'M'), (67, 'M'), (69, 'M'), (62, 'M')], inst=None, mel=None, drums='brush', pizz=True, arp=True),
})
MOOD = {'choir': 'wonder', 'folk': 'folk', 'spooky': 'ominous', 'tense': 'tension', 'flute': 'sad', 'magic': 'mystery', 'sad': 'sad', 'jazz': 'sitcom', 'secret': 'mystery',
  'rise': 'tension', 'drone': 'ominous', 'brass': 'epic', 'march': 'royal', 'robot': 'mystery', 'space': 'wonder', 'hero': 'epic', 'grumpy': 'mystery', 'dreamy': 'wonder',
  'polite': 'lounge', 'villain': 'tension', 'action': 'action', 'gloomy': 'ominous', 'musicbox': 'harp', 'epic': 'epic', 'sneaky': 'mystery', 'triumph': 'royal', 'muzak': 'hold',
  'tense_strings': 'tension', 'gentle': 'harp', 'cosmic': 'wonder', 'uneasy': 'mystery', 'hopeful': 'nature', 'fight': 'action', 'silence': 'none', 'piano': 'sad', 'tender': 'harp', 'finale': 'wonder'}
ALIAS = {'whoosh_low': 'fwoosh', 'metal_creak': 'creak', 'wind': 'wind_loop', 'wind_soft': 'wind_loop', 'shimmer': 'chime', 'tinker': 'wrench', 'brass_hit': 'braam', 'fanfare': 'dingding',
  'party_horn': 'kazoo', 'clank_march': 'whirr', 'bonk': 'punch', 'fizz': 'zap', 'timewarp': 'phase', 'swap': 'phase', 'suction': 'whirr', 'lever': 'wrench', 'sip': 'tick2',
  'glass_ring': 'glass', 'whoosh_up': 'swell', 'boom': 'explode', 'powerup': 'riser', 'sting': 'dundun', 'chalk': 'scrape', 'crowd_angry': 'crowd_loop', 'machine_hum': 'hum_loop',
  'boom_far': 'thud', 'whistle': 'tweet', 'choir_hit': 'chant', 'wave': 'swell', 'sigh': 'breath', 'crash': 'glass', 'demon_chatter': 'teeth', 'stitch': 'swipe', 'land': 'thud',
  'door_hiss': 'fwoosh', 'laugh_soft': 'laugh_small', 'bats': 'whirr', 'sunburst': 'swell', 'dust_blow': 'fwoosh', 'footsteps_metal': 'footsteps', 'gasp': 'gasp1', 'clang': 'clang'}
AMB = {'camp_dusk': ('fire_loop', .06), 'camp_day': ('wind_loop', .05), 'tent_in': ('fire_loop', .05), 'snow_night': ('wind_loop', .12), 'snow_red': ('wind_loop', .10),
  'mountain_path': ('wind_loop', .13), 'university': ('birds_loop', .06), 'lab': ('hum_loop', .06), 'lab_burnt': ('hum_loop', .04), 'tibet': ('wind_loop', .11), 'forge': ('fire_loop', .10),
  'latveria': ('crowd_loop', .05), 'bot_hall': ('hum_loop', .08), 'castle_tv': ('fire_loop', .07), 'city_roof': ('city_loop', .06), 'parlor': ('fire_loop', .03), 'rubble': ('wind_loop', .07),
  'doom_office': ('office_loop', .05), 'un_hall': ('crowd_loop', .04), 'underworld': ('fire_loop', .09), 'cave_glow': ('hum_loop', .07), 'field_dawn': ('birds_loop', .07),
  'bedroom': ('birds_loop', .04), 'vamp_city': ('night_loop', .08), 'sky_clouds': ('wind_loop', .12), 'throne_hall': ('drone', .04), 'patch_world': ('drone', .04), 'space': ('drone', .04),
  'cosmic': ('drone', .05), 'crystal_planet': ('wind_loop', .06), 'earth_space': ('drone', .04)}
_C = {}
def S(n):
    n = ALIAS.get(n, n)
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
    cu = json.loads(subprocess.run(['node', 'cues.cjs', nn], capture_output=True, text=True, cwd=HERE, check=True).stdout); dur = cu['dur']; N = int(SR * dur)
    sr, vo = wavfile.read(f'{SCR}/vo/{nn}.wav'); vo = vo.astype(float); vo = vo.mean(1) if vo.ndim > 1 else vo; vo /= 32768 if np.abs(vo).max() > 2 else 1
    if sr != SR: vo = resample(vo, int(len(vo) * SR / sr))
    vo = hp(vo, 70); vo = vo / (np.sqrt(np.mean(vo[np.abs(vo) > .02] ** 2)) or 1) * .11
    V = np.zeros(N); place(V, vo, .6, g=1, fi=0, fo=0)
    segs = []
    for s in cu['shots']:
        m = MOOD.get(s['mood'] or 'jazz', 'sitcom')
        if segs and segs[-1][2] == m: segs[-1][1] = s['b']
        else: segs.append([s['a'], s['b'], m])
    M = np.zeros(N + SR * 4)
    for k, (a, b, m) in enumerate(segs):
        d = b - a + 1.2; x = GA.music(m, d, int(nn[-2:]) * 31 + k); place(M, x, max(0, a - .6), g=1, fi=.6, fo=.6)
    M = M[:N]; env = uniform_filter1d(np.abs(V), int(.3 * SR)); duck = 1 - .4 * np.clip(env / (env.max() * .25 + 1e-9), 0, 1)
    M = M * .06 * duck; k = int(1.0 * SR); M[:k] *= np.linspace(0, 1, k); k = int(2.0 * SR); M[-k:] *= np.linspace(1, 0, k)
    X = np.zeros(N)
    for i, s in enumerate(cu['shots']):
        a, b = s['a'], s['b']
        if i and s['set'] != cu['shots'][i - 1]['set']: place(X, S('whoosh_soft'), a - .15, g=.25)
        amb = AMB.get(s['set'])
        if amb: place(X, S(amb[0]), a, b, g=amb[1] * 1.6, fi=.25, fo=.25, loop=True)
        for p in s['pops']: place(X, S('pop'), p, g=.5); place(X, S('boing'), p + .05, g=.12)
        for l in s['labels']: place(X, S('swipe'), l, g=.18); place(X, S('pop'), l + .15, g=.2)
        for c in s['cards']: place(X, S('whoosh'), c - .1, g=.35); place(X, S('ding'), c + .3, g=.3); place(X, S('swipe'), c + .05, g=.25)
        if s['big'] is not None: place(X, S('hit'), s['big'], g=.5)
        if s['shake']: place(X, S('drone'), a, b, g=.2, fi=.3, fo=.4, loop=True)
        for f in s['flash']: place(X, S('hit'), f, g=.5)
        for f in s['shakeAt']: place(X, S('thud'), f, g=.4)
        if 'rain' in s['fx']: place(X, S('rain_loop'), a, b, g=.3, loop=True, fi=.3, fo=.3)
        if 'fireflies' in s['fx'] or 'magic' in s['fx']: place(X, S('chime'), a + .3, g=.08)
        for bt in s['booms']: place(X, S('thud'), bt, g=.6); place(X, S('fire_loop'), bt, bt + 1.6, g=.35, fo=.8, loop=True)
        for (n, t, g) in s['sfx']: place(X, S(n), t, b if n in ('wind', 'wind_soft', 'machine_hum', 'crowd_angry', 'demon_chatter', 'clank_march') else None, g=g, loop=n in ('wind', 'wind_soft', 'machine_hum', 'crowd_angry'))
        if s['walk']: place(X, S('footsteps'), a, b, g=.22, loop=True, fi=.2, fo=.3)
    X = X * .6
    mix = V + M + X; mix = mix / (np.abs(mix).max() or 1) * .89
    wavfile.write(f'{SCR}/mix/{nn}.wav', SR, (mix * 32767).astype(np.int16)); print(nn, round(dur, 2), [s[2] for s in segs], flush=True)
if __name__ == '__main__':
    for nn in sys.argv[1:]: act(nn)
