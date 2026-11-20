# Doctor Doom thumbnail: free engine still (acts/thumb.js) cropped to 16:9 + stacked text on the left (subject name highlighted).
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import sys
src, out = sys.argv[1], sys.argv[2]
FB = '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
im = Image.open(src).convert('RGB'); im = (im.crop((491, 138, 1920, 942)) if im.size == (1920, 1080) else im).resize((1280, 720), Image.LANCZOS)
im = ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.2)).enhance(1.08)
sc = Image.new('L', (1280, 720)); d = ImageDraw.Draw(sc)
for x in range(520): d.line([(x, 0), (x, 720)], fill=int(200 * (1 - x / 520) ** 1.4))
im = Image.composite(Image.new('RGB', (1280, 720), (16, 8, 30)), im, sc)
d = ImageDraw.Draw(im)
def word(t, y, sz, fill, box=None, rot=0):
    f = ImageFont.truetype(FB, sz); w, h = d.textbbox((0, 0), t, font=f)[2:]
    L = Image.new('RGBA', (w + 60, h + 50), (0, 0, 0, 0)); g = ImageDraw.Draw(L)
    if box: g.rounded_rectangle((6, 6, w + 54, h + 44), 14, fill=box, outline=(35, 26, 36), width=6)
    g.text((30, 14), t, font=f, fill=fill, stroke_width=0 if box else 10, stroke_fill=(35, 26, 36))
    L = L.rotate(rot, expand=True, resample=Image.BICUBIC); im.paste(L, (34, y), L)
word('DOCTOR DOOM', 80, 66, (35, 26, 36), box=(255, 210, 61), rot=3)
word('HIS ENTIRE', 245, 88, (255, 255, 255))
word('LIFE', 375, 170, (122, 255, 154))
d.text((52, 640), 'DUMBED DOWN', font=ImageFont.truetype(FB, 34), fill=(230, 220, 255), stroke_width=5, stroke_fill=(35, 26, 36))
im.save(out, quality=95); print(out, im.size)
