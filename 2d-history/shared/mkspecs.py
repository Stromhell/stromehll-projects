# Write storyboard/sketches/specs.json from build/data.py SK, ids like AH_0.01
import importlib.util, json, sys, os
v = sys.argv[1]
spec = importlib.util.spec_from_file_location('d', os.path.join(v, 'build/data.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
out = []
for ai, (act, sk) in enumerate(zip(m.ACTS, m.SK)):
    assert len(act[2]) == len(sk), (act[0], len(act[2]), len(sk))
    for si, (s, note) in enumerate(sk):
        out.append([f"{m.META['prefix']}_{ai}.{si+1:02d}", s])
d = os.path.join(v, 'storyboard/sketches'); os.makedirs(d, exist_ok=True)
json.dump(out, open(os.path.join(d, 'specs.json'), 'w'))
print(v, len(out))
