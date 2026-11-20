import sys, glob, json, os
sys.path.insert(0, '/mnt/project-files/manga-comics-channel/Tools/mangacut')
from panels import xycut
import numpy as np
from PIL import Image
from multiprocessing import Pool
def one(p):
    try:
        im = Image.open(p).convert('L'); W, H = im.size
        a = np.array(im) < 225
        bx = [b for b in xycut(a, 0, 0, rtl=True) if b[2] * b[3] > W * H * 0.02]
        return os.path.basename(p)[:-4], [W, H], [[round(x / W, 4), round(y / H, 4), round(w / W, 4), round(h / H, 4)] for x, y, w, h in bx]
    except Exception as e:
        return os.path.basename(p)[:-4], None, []
if __name__ == '__main__':
    fs = sorted(glob.glob('/tmp/claude-0/ds/pages/*.jpg'))
    with Pool(6) as pool: res = pool.map(one, fs, chunksize=20)
    json.dump({k: {'size': s, 'panels': b} for k, s, b in res}, open('/tmp/claude-0/ds/panels_all.json', 'w'))
    print(len(res), sum(len(b) for _, _, b in res))
