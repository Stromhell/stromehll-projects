# CP long thumbnail: ElevenLabs art (gemini-3.1-flash-lite-image, no text) + text layer in code. usage: python3 mk_thumb.py ART OUT
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
art, out = sys.argv[1:3]; W, H = 1280, 720
im = Image.open(art).convert('RGB').resize((W, int(768 * W / 1376))); im = im.crop((0, 0, W, H))
F = '/home/user/repo/2d-history/shared/fonts/Anton.ttf'
# darken top-left for text
sh = Image.new('L', (W, H), 0); ds = ImageDraw.Draw(sh); ds.rectangle([0, 0, 640, 400], fill=150); sh = sh.filter(ImageFilter.GaussianBlur(70))
im.paste(Image.new('RGB', (W, H), (6, 8, 18)), (0, 0), sh)
d = ImageDraw.Draw(im)
def text(t, xy, px, fill, stroke=10):
    f = ImageFont.truetype(F, px); d.text(xy, t, font=f, fill=fill, stroke_width=stroke, stroke_fill=(10, 8, 14)); return d.textlength(t, font=f)
text('PHONE ON', (34, 14), 150, (255, 255, 255))
text('WHEELS?', (34, 178), 150, (238, 44, 48), 12)
f = ImageFont.truetype(F, 64); tw = d.textlength('TESLA', font=f)
d.polygon([(38, 372), (38 + tw + 50, 362), (38 + tw + 50, 452), (38, 462)], fill=(245, 196, 66)); d.text((62, 374), 'TESLA', font=f, fill=(14, 10, 8))
logo = Image.open('/home/user/repo/2d-history/shared/brand/stormi-watermark.png').convert('RGBA').resize((84, 84)); im.paste(logo, (W - 104, H - 104), logo)
im.save(out, quality=92); print(out)
