# build_jh.py ID : JH reel with bars. Jensen face card + shock hook (<=3 s), then the act clip in a 16:9 band
# (blurred backdrop, kicker on top, word captions below, logo top-right), then the YouTube end card.
# Also writes out/JH_Reel_ID_cover.jpg (the face card).
import sys, json, os, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.io import wavfile
from scipy.signal import resample_poly
RID = int(sys.argv[1]); G = '/home/user/repo/2d-history'; B = f'{G}/jensen-spy/reels'; ACTS = f'{G}/jensen-spy/production/acts'
R = {r['id']: r for r in json.load(open(f'{B}/reels.json'))}[RID]; A = R['act']; t0, t1 = R['t0'], R['t1']
FD = f'{B}/r1/frames' if A == 0 else f'/tmp/claude-0/jhreels/act{A}/frames'
W, H, FPS, SR = 1080, 1920, 30, 48000; FA = f'{G}/shared/fonts/Anton.ttf'; WK = f'/tmp/claude-0/jhreels/w{RID}'; os.makedirs(WK, exist_ok=True); os.makedirs(f'{B}/out', exist_ok=True)
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if np.max(np.abs(x)) > 2: x /= 32768
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.01):
    i = np.where(np.abs(x) > th)[0]; return x[max(0, i[0] - 300): i[-1] + 1800] if len(i) else x
hook = trim(load(f'{B}/voice/hooks/vo-{RID:02d}.wav'))
if len(hook) / SR > 2.75:  # keep the face card at 3 s or less
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{B}/voice/hooks/vo-{RID:02d}.wav', '-af', f'atempo={min(1.35, len(hook) / SR / 2.7):.3f}', f'{WK}/hook.wav'], check=True)
    hook = trim(load(f'{WK}/hook.wav'))
cta = trim(load(f'{B}/voice/cta.wav'))
HD = min(3.0, len(hook) / SR + .25); ED = len(cta) / SR + .9
# ---- audio ----
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(t0), '-t', str(t1 - t0), '-i', f'{ACTS}/act{A}/act{A}.mp4', '-vn', '-ac', '1', '-ar', str(SR), f'{WK}/clip.wav'], check=True)
clip = load(f'{WK}/clip.wav'); nC = int((t1 - t0) * SR); clip = np.pad(clip, (0, max(0, nC - len(clip))))[:nC]
f = int(.12 * SR); clip[:f] *= np.linspace(0, 1, f); f = int(.3 * SR); clip[-f:] *= np.linspace(1, 0, f)
nH, nE = int(HD * SR), int(ED * SR); N = nH + nC + nE; aud = np.zeros(N, np.float32)
aud[int(.05 * SR):int(.05 * SR) + len(hook)] += hook[:nH - int(.05 * SR)]
aud[nH:nH + nC] += clip * .9; aud[nH + nC + int(.3 * SR):nH + nC + int(.3 * SR) + len(cta)] += cta
for p, g in [(f'{G}/shared/sfx/hit.wav', .6), (f'{G}/shared/sfx/riser.wav', .3)]:
    s = load(p)[:nH]; aud[:len(s)] += s * g
s = load(f'{G}/shared/sfx/whoosh.wav'); a0 = max(0, nH - len(s) // 2); aud[a0:a0 + len(s)] += s[:N - a0] * .45
mu = load('/tmp/claude-0/jhfix/m0.wav'); m = np.tile(mu, N // len(mu) + 1)[:N] * .2; gm = np.ones(N); gm[nH:nH + nC] = .3
m *= np.convolve(gm, np.ones(4800) / 4800, 'same'); aud += m
aud = aud / max(1e-6, np.max(np.abs(aud))) * .9; wavfile.write(f'{WK}/aud_raw.wav', SR, (aud * 32767).astype(np.int16))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{WK}/aud_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', f'{WK}/aud.wav'], check=True)
# ---- visuals ----
LOGO = Image.open(f'{G}/shared/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((420, 420 * LOGO.height // LOGO.width), Image.LANCZOS)
FC = {}
def font(sz): return FC.setdefault(sz, ImageFont.truetype(FA, sz))
def wrap(d, txt, fnt, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=fnt) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]
def st(d, xy, txt, fnt, fill, sw=8, anchor='mm'): d.text(xy, txt, font=fnt, fill=fill, stroke_width=sw, stroke_fill=(12, 9, 7), anchor=anchor)
ART = Image.open(f'{G}/jensen-spy/launch/thumb/art_d.jpg').convert('RGB').crop((844, 0, 1276, 768))
# hook text: last ~2 words in red
hw = R['hook'].upper().split(); red_n = 2 if len(hw) > 4 else 1
def face_card(t):
    z = 1.0 + .05 * t / 3; w0, h0 = 432 / z, 768 / z
    im = ART.crop((216 - w0 / 2, 384 - h0 / 2 - 14 * t / 3, 216 + w0 / 2, 384 + h0 / 2 - 14 * t / 3)).resize((W, H), Image.LANCZOS)
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    for y in range(980, H, 4): od.rectangle([0, y, W, y + 4], fill=(0, 0, 0, int(min(220, (y - 980) * .45))))
    im = Image.alpha_composite(im.convert('RGBA'), ov); d = ImageDraw.Draw(im)
    sl = 'JENSEN HUANG'; fs = font(92); sw = d.textlength(sl, font=fs) + 60
    d.rectangle([W / 2 - sw / 2, 1110, W / 2 + sw / 2, 1230], fill=(233, 181, 74)); d.text((W / 2, 1172), sl, font=fs, fill=(20, 16, 12), anchor='mm')
    fh = font(118); lines = wrap(d, ' '.join(hw), fh, 960)
    while len(lines) > 3 and fh.size > 70: fh = font(fh.size - 8); lines = wrap(d, ' '.join(hw), fh, 960)
    y = 1330; red = set(range(len(hw) - red_n, len(hw))); k = 0
    for l in lines:
        ws = l.split(); x = W / 2 - d.textlength(l, font=fh) / 2
        for w in ws:
            d.text((x, y), w, font=fh, fill=(235, 48, 40) if k in red else (255, 255, 255), stroke_width=9, stroke_fill=(12, 9, 7), anchor='lm'); x += d.textlength(w + ' ', font=fh); k += 1
        y += fh.size * 1.18
    im.alpha_composite(LS, (820, 262)); return im.convert('RGB')
face_card(0).save(f'{B}/out/JH_Reel_{RID:02d}_cover.jpg', quality=92)
T = json.load(open(f'{ACTS}/act{A}/timing.json'))
words = [dict(w=w['w'].upper().strip('"\''), s=w['s'] - t0, e=w['e'] - t0) for w in T['words'] if w['s'] >= t0 - .05 and w['e'] <= t1 + .05]
caps, cur = [], []
for w in words:
    cur.append(w)
    if len(cur) >= 3 or w['w'][-1] in '.,?!:': caps.append(cur); cur = []
if cur: caps.append(cur)
def kicker(d):
    fk = font(78); ls = wrap(d, R['kicker'], fk, 640); y = 470 - (len(ls) - 1) * 56; cx = 450
    for l in ls:
        tw = d.textlength(l, font=fk); d.rounded_rectangle([cx - tw / 2 - 30, y - 54, cx + tw / 2 + 30, y + 52], 18, fill=(232, 180, 74), outline=(12, 9, 7), width=6)
        d.text((cx, y), l, font=fk, fill=(18, 13, 10), anchor='mm'); y += 112
def band(img16, t, end=False):
    bg = img16.resize((240, 135)).filter(ImageFilter.GaussianBlur(6)).crop((52, 0, 188, 135)).resize((W, H), Image.BILINEAR)
    cv = Image.blend(bg, Image.new('RGB', (W, H), (0, 0, 0)), .45)
    if end:
        cv = Image.blend(cv, Image.new('RGB', (W, H), (10, 10, 14)), .8).convert('RGBA'); d = ImageDraw.Draw(cv)
        s = min(1, t / .35); L = LB.resize((int(LB.width * (.8 + .2 * s)), int(LB.height * (.8 + .2 * s)))); cv.alpha_composite(L, (W // 2 - L.width // 2, 600 - L.height // 2))
        st(d, (W / 2, 940), 'WATCH THE FULL STORY', font(84), (255, 255, 255)); st(d, (W / 2, 1050), 'ON OUR YOUTUBE', font(84), (255, 214, 64)); st(d, (W / 2, 1170), 'LINK IN BIO', font(64), (255, 255, 255), sw=6)
        return cv.convert('RGB')
    cv.paste(img16.resize((W, 608), Image.LANCZOS), (0, 656)); d = ImageDraw.Draw(cv)
    d.rectangle([0, 650, W, 656], fill=(232, 180, 74)); d.rectangle([0, 1264, W, 1270], fill=(232, 180, 74)); kicker(d)
    for g in caps:
        if g[0]['s'] - .05 <= t < g[-1]['e'] + .2:
            line = ' '.join(w['w'] for w in g); fc = font(96)
            while d.textlength(line, font=fc) > 960 and fc.size > 50: fc = font(fc.size - 4)
            x = W / 2 - d.textlength(line, font=fc) / 2
            for w in g:
                on = w['s'] <= t < w['e'] + .05
                d.text((x, 1450), w['w'], font=fc, fill=(255, 214, 64) if on else (255, 255, 255), stroke_width=8, stroke_fill=(12, 9, 7), anchor='ls'); x += d.textlength(w['w'] + ' ', font=fc)
            break
    cv = cv.convert('RGBA'); cv.alpha_composite(LS, (820, 262)); return cv.convert('RGB')
enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', f'{WK}/aud.wav',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', f'{B}/out/JH_Reel_{RID:02d}.mp4'], stdin=subprocess.PIPE)
nHf, nCf, nEf = round(HD * FPS), round((t1 - t0) * FPS), round(ED * FPS); F0 = round(t0 * FPS)
for k in range(nHf): enc.stdin.write(face_card(k / FPS).tobytes())
def fr(i):
    p = f'{FD}/f{i:05d}.jpg'
    while not os.path.exists(p) and i > 0: i -= 1; p = f'{FD}/f{i:05d}.jpg'
    return Image.open(p).convert('RGB')
for k in range(nCf): enc.stdin.write(band(fr(F0 + k), k / FPS).tobytes())
last = fr(F0 + nCf - 1)
for k in range(nEf): enc.stdin.write(band(last, k / FPS, end=True).tobytes())
enc.stdin.close(); enc.wait(); print('REEL', RID, f'{N / SR:.1f}s', 'hook', f'{HD:.2f}s')
