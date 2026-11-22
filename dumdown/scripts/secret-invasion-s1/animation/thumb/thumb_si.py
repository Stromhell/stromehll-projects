# Secret Invasion thumbnails: ElevenLabs seedream-5-lite redraw of our engine still, shifted right, text stacked in the clear left band (never over a character).
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import sys
FB = '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
INK = (35, 26, 36)
def base(src, shift):
    a = Image.open(src).convert('RGB').resize((1280, 720), Image.LANCZOS); a = ImageEnhance.Contrast(ImageEnhance.Color(a).enhance(1.15)).enhance(1.06)
    im = a.crop((0, 0, 1280, 720)).filter(ImageFilter.GaussianBlur(30)); im = ImageEnhance.Brightness(im).enhance(.45)
    im.paste(a.crop((0, 0, 1280 - shift, 720)), (shift, 0))
    m = Image.new('L', (1280, 720)); d = ImageDraw.Draw(m)
    for x in range(shift + 140): d.line([(x, 0), (x, 720)], fill=int(235 * max(0, 1 - x / (shift + 140)) ** 1.2))
    return Image.composite(Image.new('RGB', (1280, 720), (10, 14, 18)), im, m)
def word(im, t, x, y, sz, fill, box=None, rot=0, maxw=None):
    d = ImageDraw.Draw(im); f = ImageFont.truetype(FB, sz)
    while maxw and d.textbbox((0, 0), t, font=f)[2] > maxw: sz -= 4; f = ImageFont.truetype(FB, sz)
    w, h = d.textbbox((0, 0), t, font=f)[2:]
    L = Image.new('RGBA', (w + 60, h + 50), (0, 0, 0, 0)); g = ImageDraw.Draw(L)
    if box: g.rounded_rectangle((6, 6, w + 54, h + 44), 14, fill=box, outline=INK, width=6)
    g.text((30, 14), t, font=f, fill=fill, stroke_width=0 if box else 9, stroke_fill=INK)
    L = L.rotate(rot, expand=True, resample=Image.BICUBIC); im.paste(L, (x, y), L); return L.size
def make(src, shift, lines, out):
    im = base(src, shift); y = 40
    for (t, sz, fill, box, rot) in lines:
        w, h = word(im, t, 22, y, sz, fill, box, rot, maxw=shift + 60); y += h - 14
    im.save(out, quality=95); print(out)
G, Y, W_, R = (122, 255, 140), (255, 210, 61), (255, 255, 255), (235, 50, 60)
make('art96.png', 300, [('SECRET INVASION', 40, INK, Y, 2), ('WHICH', 112, W_, None, 0), ('ONE IS', 112, W_, None, 0), ('FAKE?', 132, G, None, -2)], 'thumb_A_which_one_is_fake.jpg')
make('art97.png', 230, [('SECRET INVASION', 38, INK, Y, 2), ('FAKE', 128, G, None, 0), ('FOR', 104, W_, None, 0), ('YEARS?!', 110, R, None, -2)], 'thumb_B_fake_for_years.jpg')
make('art96.png', 300, [('SECRET INVASION', 40, INK, Y, 2), ('NOBODY', 108, W_, None, 0), ('IS', 104, W_, None, 0), ('REAL', 140, G, None, -3)], 'thumb_C_nobody_is_real.jpg')
