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
OUT = '/mnt/project-files/dumdown/scripts/wakanda-forever/launch/'; T = '/tmp/wfwork/thumb/'
# A: Doom's thank-you scroll (Doom right, text left)
# A: sea king shouting (right), text left
im = band(base(T + 'c_09_70.png', (228, 160, 1328, 779)), 0, 700)
word(im, 'WAKANDA FOREVER', 0, 36, 56, INK, box=(255, 210, 61), rot=3, left=30)
word(im, 'FISH MAN', 0, 200, 112, (122, 255, 154), left=30)
word(im, 'vs', 0, 340, 80, (255, 255, 255), left=40)
word(im, 'WAKANDA', 0, 440, 112, (200, 160, 255), left=30)
im.save(OUT + 'thumb_A_fish_man.jpg', quality=95)
# B: battle in the desert, ankle wings visible (right), text left
im = band(base(T + 'c_13_22.png', (930, 260, 1920, 817)), 600, 1280)
word(im, 'NAMOR', 0, 36, 60, INK, box=(255, 210, 61), rot=-3, left=660)
word(im, 'HE FLIES', 0, 190, 104, (255, 255, 255), left=640)
word(im, 'WITH HIS', 0, 320, 104, (255, 255, 255), left=640)
word(im, 'ANKLES?!', 0, 450, 116, (255, 90, 90), left=640)
im.save(OUT + 'thumb_B_ankles.jpg', quality=95)
# C: kid genius in goggles (right), text left
im = band(base(T + 'c_06_50.png', (168, 160, 1268, 779)), 0, 700)
word(im, 'WAKANDA FOREVER', 0, 36, 56, INK, box=(255, 210, 61), rot=3, left=30)
word(im, 'HOMEWORK', 0, 200, 100, (255, 255, 255), left=30)
word(im, 'STARTED', 0, 320, 100, (255, 255, 255), left=30)
word(im, 'A WAR?!', 0, 450, 120, (255, 90, 90), left=30)
im.save(OUT + 'thumb_C_homework.jpg', quality=95)
s = Image.new('RGB', (1280 * 3 // 2 + 20, 360), 'white')
for i, n in enumerate(['thumb_A_fish_man', 'thumb_B_ankles', 'thumb_C_homework']): s.paste(Image.open(OUT + n + '.jpg').resize((640, 360)), (i * 650, 0))
s.save(OUT + 'thumbs_sheet.jpg', quality=90)
