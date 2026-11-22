# Avengers Mistakes thumbnails: engine still -> 1280x720, dark band behind text, text never over faces, subject name highlighted.
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
FB = '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'; INK = (35, 26, 36)
def base(src, box):
    im = Image.open(src).convert('RGB').crop(box).resize((1280, 720), Image.LANCZOS)
    return ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.1)
def band(im, x0, x1):
    sc = Image.new('L', (1280, 720)); d = ImageDraw.Draw(sc); w = x1 - x0; c = (x0 + x1) / 2
    for x in range(x0, x1): d.line([(x, 0), (x, 720)], fill=int(190 * (1 - abs(x - c) / (w / 2)) ** .8))
    return Image.composite(Image.new('RGB', (1280, 720), (12, 10, 24)), im, sc)
def word(im, t, cx, y, sz, fill, box=None, rot=0, left=None):
    d = ImageDraw.Draw(im); f = ImageFont.truetype(FB, sz); w, h = d.textbbox((0, 0), t, font=f)[2:]
    L = Image.new('RGBA', (w + 60, h + 50), (0, 0, 0, 0)); g = ImageDraw.Draw(L)
    if box: g.rounded_rectangle((6, 6, w + 54, h + 44), 14, fill=box, outline=INK, width=6)
    g.text((30, 14), t, font=f, fill=fill, stroke_width=0 if box else 10, stroke_fill=INK)
    L = L.rotate(rot, expand=True, resample=Image.BICUBIC); x = left if left is not None else int(cx - L.size[0] / 2); im.paste(L, (x, y), L)
OUT = '/mnt/project-files/dumdown/scripts/avengers-mistakes-doomsday/launch/'; T = '/tmp/amwork/thumb/'
# A: Doom's thank-you scroll (Doom right, text left)
im = band(base(T + 'st_9.png', (0, 138, 1429, 942)), 0, 1100)
word(im, 'DOOMSDAY', 0, 40, 64, INK, box=(255, 210, 61), rot=3, left=34)
word(im, 'THANK YOU,', 0, 210, 96, (255, 255, 255), left=34)
word(im, 'AVENGERS', 0, 360, 108, (122, 255, 154), left=34)
im.save(OUT + 'thumb_A_thank_you_avengers.jpg', quality=95)
# B: Tony + Steve back to back, text in the gap
im = band(base(T + 'st_air.jpg', (300, 138, 1700, 926)), 560, 900)
word(im, 'THEY', 730, 150, 110, (255, 255, 255)); word(im, 'BUILT', 730, 290, 110, (255, 255, 255)); word(im, 'DOOM?!', 730, 440, 120, (122, 255, 154), box=None)
word(im, 'AVENGERS', 0, 30, 58, INK, box=(255, 210, 61), rot=-3, left=30)
im.save(OUT + 'thumb_B_they_built_doom.jpg', quality=95)
# C: Doom cheering, 12 mistakes
im = band(base(T + 'st_doomup.png', (0, 138, 1429, 942)), 0, 1100)
word(im, 'DOOMSDAY', 0, 40, 64, INK, box=(255, 210, 61), rot=3, left=34)
word(im, '12', 0, 160, 220, (255, 80, 80), left=34)
word(im, 'MISTAKES', 0, 430, 86, (255, 255, 255), left=34)
im.save(OUT + 'thumb_C_12_mistakes.jpg', quality=95)
s = Image.new('RGB', (1280 * 3 // 2 + 20, 360), 'white')
for i, n in enumerate(['thumb_A_thank_you_avengers', 'thumb_B_they_built_doom', 'thumb_C_12_mistakes']): s.paste(Image.open(OUT + n + '.jpg').resize((640, 360)), (i * 650, 0))
s.save(OUT + 'thumbs_sheet.jpg', quality=90)
