# shottile.py NN -> /tmp/wfwork/shotrev/tile_NN.jpg (2 frames per shot, labelled)
import sys, glob, re
from PIL import Image, ImageDraw
n = sys.argv[1]; fs = sorted(glob.glob(f'/tmp/wfwork/shotrev/a{n}_s*_*.jpg')); W, H = 640, 360
rows = (len(fs) + 3) // 4; T = Image.new('RGB', (W * 4, H * rows), 'black'); d = ImageDraw.Draw(T)
for i, f in enumerate(fs):
    im = Image.open(f).resize((W, H)); x, y = (i % 4) * W, (i // 4) * H; T.paste(im, (x, y))
    lab = re.search(r'_s(\d+)_(\d)', f); d.rectangle([x, y, x + 120, y + 30], fill='red'); d.text((x + 6, y + 6), f's{lab.group(1)}.{lab.group(2)}', fill='white', font_size=22)
T.save(f'/tmp/wfwork/shotrev/tile_{n}.jpg', quality=80)
