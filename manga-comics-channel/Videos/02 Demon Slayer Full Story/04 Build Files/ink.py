import json, numpy as np
from PIL import Image
from multiprocessing import Pool
P = json.load(open('/tmp/claude-0/ds/panels_all.json'))
def one(name):
    im = np.array(Image.open(f'/tmp/claude-0/ds/pages/{name}.jpg').convert('L').resize((300, 450)), dtype=np.float32)
    out = []
    for x, y, w, h in P[name]['panels']:
        c = im[int(y * 450):int((y + h) * 450), int(x * 300):int((x + w) * 300)]
        if c.size < 20: out.append([0, 0]); continue
        dark = float((c < 110).mean()); gy, gx = np.gradient(c); edge = float((np.hypot(gx, gy) > 40).mean())
        out.append([round(dark, 3), round(edge, 3)])
    return name, out
if __name__ == '__main__':
    with Pool(6) as p: r = dict(p.map(one, sorted(P), chunksize=30))
    json.dump(r, open('/tmp/claude-0/ds/ink.json', 'w')); print(len(r))
