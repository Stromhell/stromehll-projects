# covers_v2.py : reel covers with the Jensen cutout from the long thumbnail art (rembg cut, sticker outline)
# over the reel's own scene. Text on top (gold name slab + punch line, red last words), cutout below, logo top-right.
import json, os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
G = '/home/user/repo/2d-history'; B = f'{G}/jensen-spy/reels'; FA = f'{G}/shared/fonts/Anton.ttf'; W, H = 1080, 1920
CUT = Image.open('/tmp/claude-0/jhcov/cut_all.png').convert('RGBA')
R = json.load(open(f'{B}/reels.json'))
# per reel: cover line (short, punchy), style (duo/solo), glow colour, key frame position in the clip (0-1)
SPEC = {1: ("SHE WAS A|CHINESE SPY?", 'duo', 'red', .55), 2: ("2 STAFF.|$2 BILLION|OF CHIPS", 'duo', 'gold', .45), 3: ("LOOK WHO'S|BEHIND HIM", 'duo', 'red', .6),
        4: ("HE CLEANED|TOILETS", 'solo', 'gold', .45), 5: ("NVIDIA BEGAN|AT DENNY'S", 'solo', 'gold', .7), 6: ("$5 TRILLION.|CHINA CAN'T|BUY IT", 'solo', 'gold', .45),
        7: ("WASHINGTON|TAKES 15%", 'solo', 'red', .8), 8: ("THE HOLE IN|THE CHIP WALL", 'solo', 'red', .5), 9: ("HOW CHINA'S|SPIES|RECRUIT", 'solo', 'red', .35),
        10: ("CODE NAME:|PARLOR MAID", 'duo', 'red', .3), 11: ("THE NAME|UNDER THE|BLACK BAR", 'duo', 'red', .92), 12: ("WHERE IS|SHE NOW?", 'duo', 'red', .85),
        13: ("TRUMP KNEW.|NOBODY|WARNED HIM", 'solo', 'red', .3), 14: ("NVIDIA|LOSES 4%", 'solo', 'red', .4), 15: ("'I WAS|UNFAITHFUL'", 'solo', 'red', .2)}
GLOW = {'red': (235, 48, 40), 'gold': (240, 186, 70)}
LOGO = Image.open(f'{G}/shared/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox()); LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS)
def font(sz): return ImageFont.truetype(FA, sz)
def sticker(im, ow=12, glow=(235, 48, 40)):
    a = im.split()[3]; a = a.point(lambda v: 255 if v > 110 else 0)
    big = a.filter(ImageFilter.MaxFilter(ow * 2 + 1)); out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    g = big.filter(ImageFilter.GaussianBlur(28)).point(lambda v: int(v * .9)); out.paste(Image.new('RGBA', im.size, glow + (255,)), (0, 0), g)
    out.paste(Image.new('RGBA', im.size, (255, 255, 255, 255)), (0, 0), big); out.alpha_composite(im); return out
def scene(r, pos):
    a = r['act']; fd = f'{B}/r1/frames' if a == 0 else f'/tmp/claude-0/jhreels/act{a}/frames'
    i = round((r['t0'] + pos * (r['t1'] - r['t0'])) * 30)
    while not os.path.exists(f'{fd}/f{i:05d}.jpg'): i -= 1
    return Image.open(f'{fd}/f{i:05d}.jpg').convert('RGB')
def cover(r):
    rid = r['id']; line, style, gl, pos = SPEC[rid]; glow = GLOW[gl]
    fr = scene(r, pos)  # 1920x1080: show it as a wide band in the middle, with a blurred fill behind
    bg = fr.resize((W * 1920 // 1080 * 1, H)).crop(((W * 1920 // 1080 - W) // 2, 0, (W * 1920 // 1080 - W) // 2 + W, H)).filter(ImageFilter.GaussianBlur(14))
    cv = Image.blend(bg, Image.new('RGB', (W, H), (8, 6, 8)), .55).convert('RGBA')
    n_l = len(line.split('|')); by = 700 if n_l <= 2 else 790
    band = fr.resize((W + 300, (W + 300) * 9 // 16)).crop((150, 0, 150 + W, (W + 300) * 9 // 16))
    cv.paste(band, (0, by)); d = ImageDraw.Draw(cv); d.rectangle([0, by - 6, W, by], fill=glow); d.rectangle([0, by + band.height, W, by + band.height + 6], fill=glow)
    # vignette bottom so the cutout sits on dark
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    for y in range(1100, H, 4): od.rectangle([0, y, W, y + 4], fill=(0, 0, 0, int(min(200, (y - 1100) * .3))))
    cv.alpha_composite(ov)
    if style == 'duo':
        c = CUT.crop((600, 30, 1376, 768)); s = W / c.width; c = c.resize((W, int(c.height * s)), Image.LANCZOS)
        c = sticker(c, glow=glow); cv.alpha_composite(c, (0, H - c.height + 10))
    else:
        c = CUT.crop((950, 20, 1376, 768)); s = 1000 / c.height; c = c.resize((int(c.width * s), 1000), Image.LANCZOS)
        c = sticker(c, glow=glow); a = np.asarray(c.split()[3]).astype(float); hh, ww = a.shape
        fwy = np.interp(np.arange(hh), [0, hh * .5, hh], [30, 60, 230]); xx = np.arange(ww)[None, :]
        a *= np.clip(xx / fwy[:, None], 0, 1) ** 1.3; c.putalpha(Image.fromarray(a.astype(np.uint8)))
        left = rid % 2 == 0
        if left: c = c.transpose(Image.FLIP_LEFT_RIGHT)
        cv.alpha_composite(c, (0 if left else W - c.width, H - c.height + 10))
        # punch line sits beside the face, over the dark lower half
    d = ImageDraw.Draw(cv)
    # top: name slab + punch line (kept above the band, clear of the logo)
    sl = 'JENSEN HUANG'; fs = font(84); sw = d.textlength(sl, font=fs) + 56
    d.rounded_rectangle([60, 270, 60 + sw, 382], 14, fill=(233, 181, 74), outline=(12, 9, 7), width=5); d.text((60 + sw / 2, 326), sl, font=fs, fill=(20, 16, 12), anchor='mm')
    lines = line.split('|'); n = len(lines); sz = 132 if n <= 2 else 110; f = font(sz)
    while max(d.textlength(l, font=f) for l in lines) > 960 and sz > 70: sz -= 6; f = font(sz)
    y = 420 + sz * .5
    for k, l in enumerate(lines):
        col = (235, 48, 40) if k == n - 1 else (255, 255, 255)
        d.text((60, y), l, font=f, fill=col, anchor='lm', stroke_width=10, stroke_fill=(12, 9, 7)); y += sz * 1.02
    cv.alpha_composite(LS, (870, 262))
    return cv.convert('RGB')
if __name__ == '__main__':
    os.makedirs(f'{B}/out/covers_v2', exist_ok=True)
    for r in R:
        cover(r).save(f'{B}/out/covers_v2/JH_Reel_{r["id"]:02d}_cover.jpg', quality=92); print('cover', r['id'])
