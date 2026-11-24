# Merge narrator VO (vo/actNN.json + p*.wav) with inline gags (gags/out_am/gagNN.wav/json) -> work/timing/actNN.json + vo track + gag track
import re, json, os, sys, numpy as np, soundfile as sf
from scipy.signal import resample
SCRIPT = '/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/01-script/doomsday-trailer-breakdown-script-v2.md'
VO = os.environ.get('VO', '/tmp/ddw/vo'); GO = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gags', 'out_dd'); OUT = '/tmp/ddw/timing'; os.makedirs(OUT, exist_ok=True)
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gags')); from gags_data_dd import G, SPEAKERS
GK = {g['key']: g for g in G}
txt = open(SCRIPT).read().split('\n---\n', 1)[1]
secs = [s for s in re.split(r'\n## ', txt) if s.strip() and '🤡' not in s.split('\n')[0] and not s.startswith('Fact check')]
def plan(i):
    s = secs[i]; head, _, rest = s.strip().partition('\n'); m = re.search(r'#(\d+)', head); num = m.group(1) if m else None
    seq = []
    for p in rest.split('\n\n'):
        p = p.strip()
        if not p or p.startswith('---'): continue
        if p.startswith('🤡'): k = re.match(r'🤡 (GAG \w+)', p).group(1); seq.append(('gag', k))
        elif p.startswith('[THANKS]'): seq.append(('gag', f'THANKS {num}'))
        elif p[0] in '🎬🃏🎵[': continue
        else: seq.append(('vo', None))
    return head, seq
def load(p, sr=48000):
    x, r = sf.read(p); x = x.mean(1) if x.ndim > 1 else x
    return x if r == sr else resample(x, int(len(x) * sr / r))
SR = 48000
for i in range(len(secs)) if len(sys.argv) < 2 else [int(a) for a in sys.argv[1:]]:
    head, seq = plan(i); vj = json.load(open(f'{VO}/act{i:02d}.json')); GAP = vj['gap']
    durs, paras, chunks, kinds, gags = [], [], [], [], []; vtr, gtr = [], []; pi = 0
    for kind, key in seq:
        if kind == 'vo':
            a = load(f'{VO}/act{i:02d}/p{pi:02d}.wav'); durs.append(len(a) / SR); paras.append(vj['paras'][pi]); chunks.append(vj['chunks'][pi]); kinds.append('vo')
            vtr += [a, np.zeros(int(GAP * SR))]; gtr += [np.zeros(len(a) + int(GAP * SR))]; pi += 1
        else:
            g = GK[key]; a = load(f'{GO}/gag{g["id"]:02d}.wav'); m = json.load(open(f'{GO}/gag{g["id"]:02d}.json'))
            durs.append(len(a) / SR); paras.append(f'[{key}] ' + ' '.join(sp.get('txt', '') for sp in m['speech'])); kinds.append('gag')
            ch = []; its = [it for it in g['items'] if it[0] in SPEAKERS]
            for sp, it in zip(m['speech'], its): ch.append([sp['t0'], round(sp['t1'] - sp['t0'], 3), it[1]])
            chunks.append(ch); gags.append({'p': len(durs) - 1, 'key': key, 'id': g['id'], 'dur': durs[-1], 'speech': m['speech'], 'sfx': m['sfx']})
            vtr += [np.zeros(len(a) + int(GAP * SR))]; gtr += [a, np.zeros(int(GAP * SR))]
    assert pi == len(vj['paras']), (i, pi, len(vj['paras']))
    sf.write(f'{OUT}/act{i:02d}_vo.wav', np.concatenate(vtr), SR); sf.write(f'{OUT}/act{i:02d}_gag.wav', np.concatenate(gtr), SR)
    json.dump({'durs': [round(d, 3) for d in durs], 'gap': GAP, 'paras': paras, 'chunks': chunks, 'kinds': kinds, 'gags': gags, 'head': head}, open(f'{OUT}/act{i:02d}.json', 'w'))
    print(i, head, kinds, round(sum(durs) + GAP * len(durs), 1))
