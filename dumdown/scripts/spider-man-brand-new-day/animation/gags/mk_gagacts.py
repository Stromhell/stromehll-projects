# mk_gagacts.py -> ../acts/act5N.js (N = gag id, 51..62) + $GVO/act5N.json timing + $SCR/mix/act5N.wav
# Gags render with the same Toon Lanky act engine: one shot per speech line, alternating CU / MCU / two-shot.
import json, os, re, shutil, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from gags_data import G
SCR = os.environ.get('SCR', '/tmp/sbwork'); GVO = os.path.join(SCR, 'gagvo'); MIX = os.path.join(SCR, 'mix')
os.makedirs(GVO, exist_ok=True); os.makedirs(MIX, exist_ok=True); LEAD = .6
def expr(t):
    t = t.lower()
    if re.search(r'sorry|lonely|erased|zero', t): return 'sad'
    if '?' in t: return 'skeptical'
    if '!' in t: return 'excited'
    if re.search(r"can't|no\b|never", t): return 'nervous'
    return 'smug'
for g in G:
    n = 50 + g['id']; d = json.load(open(os.path.join(HERE, 'out', 'gag%02d.json' % g['id'])))
    sp = d['speech']; cast = [(k, v) for k, v in g['cast'].items() if v]
    xs = {k: x for (k, _), x in zip(cast, [1000, 1600] if len(cast) > 1 else [1280])}
    starts = [s['t0'] - LEAD for s in sp]; durs = [ (sp[i + 1]['t0'] if i + 1 < len(sp) else sp[i]['t1']) - sp[i]['t0'] for i in range(len(sp))]
    tail = max(.5, d['dur'] - (LEAD + sum(durs)))
    json.dump(dict(durs=durs, gap=0, paras=[s['who'] for s in sp], head=g['title']), open(os.path.join(GVO, 'act%d.json' % n), 'w'))
    lines = [it[1] for it in g['items'] if it[0] in g['cast']]
    shots = []
    for i, s in enumerate(sp):
        who = s['who']; c = g['cast'].get(who); txt = lines[i] if i < len(lines) else ''
        chars = []
        for k, key in cast:
            if k == who: chars.append(dict(c=key, x=xs[k], y=1270, s=1.4, view='threequarter', dir=1 if xs[k] < 1280 else -1, expr=expr(txt), talk=True, pose=['talk', 'point', 'shrug', 'hip'][i % 4]))
            else: chars.append(dict(c=key, x=xs[k], y=1270, s=1.4, view='threequarter', dir=1 if xs[k] < 1280 else -1, expr='deadpan' if i % 2 else 'skeptical'))
        if i == 0: cam = dict(z=[1.0, 1.2], x=1280, y=820)
        elif c is None: cam = dict(z=[1.3, 1.45], x=1280, y=800)
        elif i % 3 == 1: cam = dict(z=[2.7, 2.95], x=xs[who], y=760)
        elif i % 3 == 2: cam = dict(z=[2.0, 2.2], x=xs[who], y=780, rot=[-2, 2])
        else: cam = dict(z=[1.4, 1.52], x=1280, y=800)
        if c is None: chars = [dict(x, talk=False) for x in chars]
        sh = dict(p=i, plate=g['plate'], cam=cam, chars=chars or [])
        if c is None and txt: sh['pops'] = [dict(t=who + ': ' + txt.upper()[:44], at=.2)]
        if i == 0: sh['title'] = ['DUMDOWN ADS' if g['set'] in ('app', 'insurance', 'travel') else 'DUMDOWN TV', g['title']]
        shots.append(sh)
    open(os.path.join(HERE, '..', 'acts', 'act%d.js' % n), 'w').write(f'// Gag {g["id"]}: {g["title"]}\nwindow.ACT = {{ timing: window.TIMING, tail: {tail:.2f}, shots: ' + json.dumps(shots, ensure_ascii=False) + '};\n')
    shutil.copy(os.path.join(HERE, 'out', 'gag%02d.wav' % g['id']), os.path.join(MIX, 'act%d.wav' % n))
    print(n, g['title'], len(shots), round(d['dur'], 1))
