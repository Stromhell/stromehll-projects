import sys, glob
from PIL import Image, ImageDraw
fs = sorted(glob.glob(sys.argv[1] + '/f*.png')); cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5
ims = [Image.open(f).convert('RGB') for f in fs]; w, h = ims[0].size; w2, h2 = w // 2, h // 2
rows = (len(ims) + cols - 1) // cols; s = Image.new('RGB', (cols * w2, rows * h2), 'white')
for i, (f, im) in enumerate(zip(fs, ims)):
    im = im.resize((w2, h2)); d = ImageDraw.Draw(im); d.text((6, 6), f"{int(f[-9:-4]) / 60:.2f}s", fill='red')
    s.paste(im, ((i % cols) * w2, (i // cols) * h2))
s.save(sys.argv[2]); print(s.size)
