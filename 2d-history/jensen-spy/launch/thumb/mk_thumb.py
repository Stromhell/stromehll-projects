# JH long thumbnail: ElevenLabs art (gemini-3.1-flash-lite, no text) + text layer in code. usage: python3 mk_thumb.py ART OUT
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
art, out = sys.argv[1:3]; W, H = 1280, 720
im = Image.open(art).convert('RGB').resize((W, int(W * Image.open(art).height / Image.open(art).width))).crop((0, 0, W, H))
sh = Image.new('L', (W, H), 0); d = ImageDraw.Draw(sh)
for x in range(W): d.line([(x, 0), (x, H)], fill=int(max(0, 215 * (1 - x / (W * .55)))))
im = Image.composite(Image.new('RGB', (W, H), (8, 6, 12)), im, sh)
F = '/home/user/repo/2d-history/shared/fonts/Anton.ttf'; d = ImageDraw.Draw(im)
def text(t, xy, px, fill, stroke=8):
    f = ImageFont.truetype(F, px); d.text(xy, t, font=f, fill=fill, stroke_width=stroke, stroke_fill=(18, 12, 8))
f = ImageFont.truetype(F, 64); tw = d.textlength('JENSEN HUANG', font=f)
d.polygon([(34, 40), (34 + tw + 48, 30), (34 + tw + 48, 118), (34, 128)], fill=(232, 180, 74)); d.text((58, 38), 'JENSEN HUANG', font=f, fill=(18, 12, 8))
text('US INTEL SAYS', (44, 200), 74, (255, 255, 255))
text('SHE WAS', (40, 300), 150, (255, 255, 255), 10)
text('A SPY', (40, 470), 170, (232, 40, 46), 10)
logo = Image.open('/home/user/repo/2d-history/shared/brand/stormi-watermark.png').convert('RGBA').resize((92, 92)); im.paste(logo, (W - 112, H - 112), logo)
im.save(out, quality=92); print(out)
