# G6 thumbnail v1: ElevenLabs gemini-3.1-flash-lite-image art (art1.jpg) + PIL text. 1280x720.
from PIL import Image, ImageDraw, ImageFont, ImageFilter
F = '/home/user/repo/2d-history/shared/fonts/'
im = Image.open('art1.jpg').convert('RGB').resize((1280, 714)); base = Image.new('RGB', (1280, 720)); base.paste(im, (0, 3)); im = base
d = ImageDraw.Draw(im)
def txt(xy, s, size, fill, font='Anton.ttf', stroke=8, anchor='mm', rot=0):
    f = ImageFont.truetype(F + font, size)
    layer = Image.new('RGBA', im.size, (0, 0, 0, 0)); ld = ImageDraw.Draw(layer)
    sh = Image.new('RGBA', im.size, (0, 0, 0, 0)); sd = ImageDraw.Draw(sh)
    sd.text((xy[0] + 6, xy[1] + 8), s, font=f, fill=(0, 0, 0, 200), anchor=anchor, stroke_width=stroke, stroke_fill=(0, 0, 0, 200))
    ld.text(xy, s, font=f, fill=fill, anchor=anchor, stroke_width=stroke, stroke_fill=(30, 18, 12, 255))
    if rot: layer = layer.rotate(rot, center=xy, resample=Image.BICUBIC); sh = sh.rotate(rot, center=xy, resample=Image.BICUBIC)
    im.paste(sh.filter(ImageFilter.GaussianBlur(6)), (0, 0), sh.filter(ImageFilter.GaussianBlur(6))); im.paste(layer, (0, 0), layer)
def tag(x, y, s, bg, fg=(255, 255, 255)):
    f = ImageFont.truetype(F + 'Oswald.ttf', 40); w = d.textlength(s, font=f) + 36
    d.rounded_rectangle((x - w / 2, y - 30, x + w / 2, y + 30), 10, fill=bg, outline=(30, 18, 12), width=5)
    d.text((x, y), s, font=f, fill=fg, anchor='mm')
txt((985, 120), 'GTA 6', 170, (255, 214, 0), rot=3)
txt((985, 260), 'THE WHOLE STORY', 78, (255, 255, 255), rot=3)
txt((985, 350), '+ ALL ENDINGS', 56, (255, 70, 90), rot=3, stroke=6)
tag(200, 640, 'JASON', (230, 160, 20)); tag(430, 650, 'LUCIA', (220, 40, 110))
im.save('G6_Thumbnail_v1.jpg', quality=92); print('ok')
