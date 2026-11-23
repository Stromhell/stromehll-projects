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
OUT = '/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/06-launch/'; T = '/tmp/ddw/thumb/'
# A: old Cap lifts the hammer (centre-right), text left
im = band(base(T + 'c_00_1_.7.png', (760, 240, 1560, 690)), 1280 - 600, 1280)
word(im, 'DOOMSDAY FINAL TRAILER', 0, 30, 46, INK, box=(255, 210, 61), rot=2, left=590)
word(im, 'OLD CAP', 0, 170, 118, (255, 210, 61), left=700)
word(im, 'IS BACK?!', 0, 320, 104, (255, 255, 255), left=700)
im.save(OUT + 'thumb_A_old_cap_v2.jpg', quality=95)
# B: Doom + masked choir, text right
im = band(base(T + 'c_04_0_.75.png', (300, 150, 1620, 892)), 1280 - 620, 1280)
word(im, 'WHO IS UNDER', 0, 60, 80, (255, 255, 255), left=600)
word(im, 'THE MASKS?', 0, 175, 96, (122, 255, 154), left=600)
word(im, 'DOOMSDAY', 0, 560, 56, INK, box=(255, 210, 61), rot=-2, left=760)
im.save(OUT + 'thumb_B_masks_v2.jpg', quality=95)
# C: two Captain Americas
im = band(base(T + 'c_09_15_.5.png', (480, 160, 1600, 790)), 0, 1280)
word(im, '2 CAPTAIN AMERICAS', 640, 30, 76, (255, 255, 255))
word(im, 'DOOMSDAY TRAILER BREAKDOWN', 640, 600, 46, INK, box=(255, 210, 61))
im.save(OUT + 'thumb_C_two_caps_v1.jpg', quality=95)
