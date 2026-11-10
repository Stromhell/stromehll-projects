# JH reel 1: full-bleed 9:16 (no bands). Hook = Jensen face (thumbnail art) + shock line, then act0 0-56.63 s cropped
# to 9:16 with a keyframed pan, big word captions, logo top-right, CTA end card.
import json, os, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.io import wavfile
from scipy.signal import resample_poly
G = '/home/user/repo/2d-history'; B = f'{G}/jensen-spy/reels'; R = f'{B}/r1'; OUT = f'{R}/out'; os.makedirs(OUT, exist_ok=True)
W, H, FPS, SR = 1080, 1920, 30, 48000; CW = 608; T1 = 56.63
FA = f'{G}/shared/fonts/Anton.ttf'
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if np.max(np.abs(x)) > 2: x /= 32768
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.01):
    i = np.where(np.abs(x) > th)[0]; return x[max(0, i[0] - 400): i[-1] + 2400] if len(i) else x
hook = trim(load(f'{B}/voice/hook.wav')); cta = trim(load(f'{B}/voice/cta.wav'))
HD = max(3.0, len(hook) / SR + .5); ED = max(3.2, len(cta) / SR + .8)
# ---- audio ----
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-t', str(T1), '-i', f'{G}/jensen-spy/production/acts/act0/act0.mp4', '-vn', '-ac', '1', '-ar', str(SR), f'{R}/clip.wav'], check=True)
clip = load(f'{R}/clip.wav'); nC = int(T1 * SR); clip = np.pad(clip, (0, max(0, nC - len(clip))))[:nC]
f = int(.2 * SR); clip[-f:] *= np.linspace(1, 0, f)
nH, nE = int(HD * SR), int(ED * SR); N = nH + nC + nE; aud = np.zeros(N, np.float32)
aud[int(.1 * SR):int(.1 * SR) + len(hook)] += hook * 1.0
aud[nH:nH + nC] += clip * .85
aud[nH + nC + int(.3 * SR):nH + nC + int(.3 * SR) + len(cta)] += cta
for p, g in [(f'{G}/shared/sfx/hit.wav', .7), (f'{G}/shared/sfx/riser.wav', .35)]:
    s = load(p)[:nH]; aud[:len(s)] += s * g
s = load(f'{G}/shared/sfx/whoosh.wav'); aud[nH - len(s) // 2: nH - len(s) // 2 + len(s)] += s * .5
mu = load('/tmp/claude-0/jhfix/m0.wav'); m = np.tile(mu, N // len(mu) + 1)[:N] * .22; m[nH:nH + nC] *= 0; aud += m
aud = aud / max(1e-6, np.max(np.abs(aud))) * .9; wavfile.write(f'{R}/aud_raw.wav', SR, (aud * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{R}/aud_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', f'{R}/aud.wav'], check=True)
# ---- assets ----
LOGO = Image.open(f'{G}/shared/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((420, 420 * LOGO.height // LOGO.width), Image.LANCZOS)
fCap = ImageFont.truetype(FA, 96); fH1 = ImageFont.truetype(FA, 112); fH2 = ImageFont.truetype(FA, 150); fSlab = ImageFont.truetype(FA, 92); fE = ImageFont.truetype(FA, 84); fTitle = ImageFont.truetype(FA, 150)
ART = Image.open(f'{G}/jensen-spy/launch/thumb/art_d.jpg').convert('RGB').crop((844, 0, 1276, 768))
T = json.load(open(f'{G}/jensen-spy/production/acts/act0/timing.json'))
words = [w for w in T['words'] if w['s'] < T1]
caps, cur = [], []
for w in words:
    cur.append(w)
    if len(cur) >= 3 or w['w'][-1] in '.,?!:' : caps.append(cur); cur = []
if cur: caps.append(cur)
FC = {}
def fit(d, txt, sz, mw):
    while sz > 40:
        f = FC.setdefault(sz, ImageFont.truetype(FA, sz))
        if d.textlength(txt, font=f) <= mw: return f
        sz -= 4
    return FC.setdefault(sz, ImageFont.truetype(FA, sz))
def stroke_text(d, xy, txt, font, fill, sw=8, anchor='mm'):
    d.text(xy, txt, font=font, fill=fill, stroke_width=sw, stroke_fill=(10, 8, 6), anchor=anchor)
# pan keyframes (time s, crop centre x in 1920 px)
KF = [(0, 1200), (5, 1300), (7.5, 1150), (9, 800), (11.0, 700), (11.5, 870), (14.5, 1050), (16.5, 1250), (18.4, 1250), (19.0, 750), (21, 650), (22.4, 1000), (23.6, 1300), (24.6, 1616), (28.4, 1600),
      (29.2, 960), (31.5, 850), (35.2, 850), (36.6, 1340), (38.3, 1340), (39.0, 470), (42.8, 470), (44.2, 1330), (45.3, 900), (50.3, 900), (50.9, 1110), (60, 1110)]
def cx_at(t):
    for (a, xa), (b, xb) in zip(KF, KF[1:]):
        if a <= t <= b:
            u = (t - a) / (b - a); u = u * u * (3 - 2 * u); x = xa + (xb - xa) * u; break
    else: x = KF[-1][1]
    return int(min(1920 - CW / 2, max(CW / 2, x)))
def caption(d, t):
    for g in caps:
        if g[0]['s'] - .05 <= t < g[-1]['e'] + .15:
            txt = [w['w'].upper().strip('"\'') for w in g]; line = ' '.join(txt); fC = fit(d, line, 96, 940)
            x0 = W / 2 - d.textlength(line, font=fC) / 2; x = x0
            for w, tw in zip(g, txt):
                col = (255, 214, 64) if w['s'] <= t < w['e'] + .05 else (255, 255, 255)
                d.text((x, 1440), tw, font=fC, fill=col, stroke_width=8, stroke_fill=(10, 8, 6), anchor='ls'); x += d.textlength(tw + ' ', font=fC)
            return
nHf, nCf, nEf = round(HD * FPS), round(T1 * FPS), round(ED * FPS)
enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', f'{R}/aud.wav',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', f'{OUT}/JH_Reel_01.mp4'], stdin=subprocess.PIPE)
# hook frames
for k in range(nHf):
    t = k / FPS; z = 1.0 + .06 * t / HD; w0, h0 = 432 / z, 768 / z
    im = ART.crop((216 - w0 / 2, 384 - h0 / 2 - 20 * t / HD, 216 + w0 / 2, 384 + h0 / 2 - 20 * t / HD)).resize((W, H), Image.LANCZOS)
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    for y in range(1000, H): od.line([(0, y), (W, y)], fill=(0, 0, 0, int(min(215, (y - 1000) * .45))))
    im = Image.alpha_composite(im.convert('RGBA'), ov); d = ImageDraw.Draw(im)
    a = min(1, t / .15)
    sl = 'JENSEN HUANG'; sw = d.textlength(sl, font=fSlab) + 60
    d.rectangle([W / 2 - sw / 2, 1110, W / 2 + sw / 2, 1230], fill=(233, 181, 74)); d.text((W / 2, 1172), sl, font=fSlab, fill=(20, 16, 12), anchor='mm')
    for (y, txt, sz, col) in [(1330, 'US INTEL SAYS', 104, (255, 255, 255)), (1470, 'THE WOMAN NEXT TO HIM', 104, (255, 255, 255)), (1630, 'WAS A CHINESE SPY', 130, (235, 48, 40))]:
        stroke_text(d, (W / 2, y), txt, fit(d, txt, sz, 980), col, sw=9)
    im.alpha_composite(LS, (820, 262)); enc.stdin.write(im.convert('RGB').tobytes())
# story frames
for k in range(nCf):
    t = k / FPS; fr = Image.open(f'{R}/frames/f{k:05d}.jpg').convert('RGB'); cx = cx_at(t)
    if t >= 51.7: fr.paste(fr.crop((0, 260, 1920, 470)), (0, 40))  # hide the wide act title; redrawn in 2 lines below
    im = fr.crop((cx - CW // 2, 0, cx + CW // 2, 1080)).resize((W, H), Image.LANCZOS).convert('RGBA')
    d = ImageDraw.Draw(im); caption(d, t)
    if t >= 51.9:
        a = min(1, (t - 51.9) / .5); col = (int(250 * a + 20 * (1 - a)),) * 2 + (int(238 * a + 20 * (1 - a)),)
        stroke_text(d, (W / 2, 560), 'THE SPY WHO', fTitle, col, sw=int(9 * a)); stroke_text(d, (W / 2, 710), 'BET ON JENSEN', fTitle, col, sw=int(9 * a))
    im.alpha_composite(LS, (820, 262)); enc.stdin.write(im.convert('RGB').tobytes())
# end card
last = Image.open(f'{R}/frames/f{nCf - 1:05d}.jpg').convert('RGB'); cx = cx_at(T1)
last.paste(last.crop((0, 260, 1920, 470)), (0, 40))
bg = last.crop((cx - CW // 2, 0, cx + CW // 2, 1080)).resize((W, H)).filter(ImageFilter.GaussianBlur(18))
bg = Image.blend(bg, Image.new('RGB', (W, H), (12, 10, 14)), .55).convert('RGBA')
for k in range(nEf):
    t = k / FPS; im = bg.copy(); d = ImageDraw.Draw(im); s = min(1, t / .35)
    L = LB.resize((int(LB.width * (.8 + .2 * s)), int(LB.height * (.8 + .2 * s)))); im.alpha_composite(L, (W // 2 - L.width // 2, 560 - L.height // 2))
    stroke_text(d, (W / 2, 900), 'WATCH THE FULL STORY', fE, (255, 255, 255)); stroke_text(d, (W / 2, 1010), 'ON OUR YOUTUBE', fE, (255, 214, 64))
    stroke_text(d, (W / 2, 1140), 'LINK IN BIO', ImageFont.truetype(FA, 64), (255, 255, 255), sw=6)
    enc.stdin.write(im.convert('RGB').tobytes())
enc.stdin.close(); enc.wait(); print('WROTE', f'{OUT}/JH_Reel_01.mp4', HD, ED)
