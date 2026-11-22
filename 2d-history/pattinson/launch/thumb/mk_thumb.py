# RP long thumbnail: ElevenLabs art (gemini-3.1-flash-lite, no text) + text layer in code. usage: python3 mk_thumb.py ART OUT
import sys
from PIL import Image, ImageDraw, ImageFont
art, out = sys.argv[1:3]; W, H = 1280, 720
im = Image.open(art).convert('RGB').resize((W, H)); d = ImageDraw.Draw(im)
SH = '/home/user/stromehll-projects/2d-history/shared'; F = SH + '/fonts/Anton.ttf'
def text(t, xy, px, fill, stroke=9):
    f = ImageFont.truetype(F, px); d.text(xy, t, font=f, fill=fill, stroke_width=stroke, stroke_fill=(10, 10, 16)); return d.textlength(t, font=f)
text("NOW HE'S", (34, 24), 128, (255, 255, 255)); text('BOND?', (34, 166), 170, (242, 196, 70), 11)
f = ImageFont.truetype(F, 48); tw = d.textlength('ROBERT PATTINSON', font=f)
d.polygon([(30, 404), (30 + tw + 44, 396), (30 + tw + 44, 470), (30, 478)], fill=(242, 196, 70)); d.text((52, 404), 'ROBERT PATTINSON', font=f, fill=(12, 10, 8))
logo = Image.open(SH + '/brand/stormi-watermark.png').convert('RGBA').resize((84, 84)); im.paste(logo, (W - 104, H - 104), logo)
im.save(out, quality=92); print(out)
