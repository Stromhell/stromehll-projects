import json, os, sys
sys.path.insert(0, '/home/user/work/gt'); from shots07 import SHOTS
tf = '/home/user/work/gt/voice/timing.json'; real = json.load(open(tf)) if os.path.exists(tf) else {}
out = {}
for s in SHOTS:
    if s.get('card') is not None: out[s['id']] = {'dur': s.get('dur', 3.2 if s.get('sub') else 3.0), 'lines': [], 'card': s['card'], 'sub': s.get('sub')}; continue
    if s['id'] in real and not s.get('est'): out[s['id']] = real[s['id']]; continue
    t = 0.45; lines = []
    for who, text in s['lines']:
        d = len(text.split()) / 2.6 + 0.3; lines.append({'who': who, 't0': round(t, 3), 't1': round(t + d, 3), 'text': text}); t += d + 0.25
    out[s['id']] = {'dur': round(max(t + 0.3, s.get('dur', 0)), 3), 'lines': lines, 'est': True}
open('/home/user/work/gt/build/timing07.js', 'w').write('const TIMING=' + json.dumps(out) + ';\n')
print('real', sum(1 for k in out if not out[k].get('est')), 'est', sum(1 for k in out if out[k].get('est')), 'total', round(sum(v['dur'] for v in out.values()), 1))
