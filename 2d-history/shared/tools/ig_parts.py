# ig_parts.py VIDEO FRAMEROOT OUTDIR PREFIX PARTS.json NEXTVOICE_DIR
# Cuts a finished 2D video into Instagram parts (9:16, each under 3 min) from subtitle-free act frames.
# FRAMEROOT/actN holds f%05d.jpg rendered from act_nosub.html. PARTS.json: [{"n":1,"acts":[0,1,2]}, ...]
# NEXTVOICE_DIR holds next-N.wav ("watch part N on this page") and youtube.wav (last part's end card).
# Layout matches build_reel.py: blurred backdrop, 16:9 picture band, kicker "PART n OF m", word captions, logo top-right.
import sys, json, subprocess, os, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy.io import wavfile
from scipy.signal import resample_poly
VID, FR, OUT, PRE, PJ, NV = sys.argv[1:7]; PARTS = json.load(open(PJ)); M = int(os.environ.get("NPARTS", len(PARTS)))
G = '/home/user/stromehll-projects/2d-history'; FONT = f'{G}/shared/fonts/Anton.ttf'; SR = 48000; FPS = 30; W, H = 1080, 1920
TITLE = sys.argv[7] if len(sys.argv) > 7 else VID.upper()
os.makedirs(OUT, exist_ok=True); TMP = f'{OUT}/tmp'; os.makedirs(TMP, exist_ok=True)
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32)
    if np.max(np.abs(x)) > 2: x /= 32768
    if x.ndim > 1: x = x.mean(1)
    if sr != SR: g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.01):
    i = np.where(np.abs(x) > th)[0]; return x[max(0, i[0] - 400): i[-1] + 2400] if len(i) else x
LOGO = Image.open(f'{G}/shared/brand/stormi-watermark.png').convert('RGBA'); LOGO = LOGO.crop(LOGO.getbbox())
LS = LOGO.resize((150, 150 * LOGO.height // LOGO.width), Image.LANCZOS); LB = LOGO.resize((440, 440 * LOGO.height // LOGO.width), Image.LANCZOS)
fK = ImageFont.truetype(FONT, 70); fT = ImageFont.truetype(FONT, 54); fC = ImageFont.truetype(FONT, 92); fE = ImageFont.truetype(FONT, 76)
def outlined(d, xy, txt, font, fill, sw=8): d.text(xy, txt, font=font, fill=fill, anchor='mm', stroke_width=sw, stroke_fill=(18, 13, 10))
def wrap(d, txt, font, maxw):
    lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=font) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    return lines + [cur]
small = lambda im: im.resize((240, 135)).filter(ImageFilter.GaussianBlur(6)).crop((50, 0, 190, 135))
def nframes(a):
    f = f'{G}/{VID}/production/acts/act{a}/act{a}.mp4'
    return int(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-count_packets', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())
for P in PARTS:
    n = P['n']; last = n == M
    end = trim(load(f'{NV}/youtube.wav' if last else f'{NV}/next-{n + 1}.wav')); ed = len(end) / SR + 1.2
    # picture frames, audio and caption words for every act in the part
    frames, words, auds, off = [], [], [], 0.0
    for a in P['acts']:
        nf = nframes(a); fs = sorted(os.listdir(f'{FR}/act{a}'))[:nf]; fs = fs + [fs[-1]] * (nf - len(fs)); frames += [f'{FR}/act{a}/{x}' for x in fs]
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{G}/{VID}/production/acts/act{a}/act{a}.mp4', '-vn', '-ac', '1', '-ar', str(SR), f'{TMP}/a{a}.wav'], check=True)
        x = load(f'{TMP}/a{a}.wav'); k = int(nf / FPS * SR); x = np.pad(x, (0, max(0, k - len(x))))[:k]
        fd = int(.06 * SR); x[:fd] *= np.linspace(0, 1, fd); fd = int(.2 * SR); x[-fd:] *= np.linspace(1, 0, fd); auds.append(x)
        T = json.load(open(f'{G}/{VID}/production/acts/act{a}/timing.json'))
        words += [dict(w=w['w'], s=w['s'] + off, e=w['e'] + off) for w in T['words']]; off += nf / FPS
    body = np.concatenate(auds); nE = int(ed * SR); aud = np.concatenate([body, np.zeros(nE)])
    p0 = len(body) + int(.4 * SR); aud[p0:p0 + len(end)] += end * .9
    wavfile.write(f'{TMP}/p{n}_raw.wav', SR, (np.clip(aud, -1, 1) * 32767).astype(np.int16))
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{TMP}/p{n}_raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', f'{TMP}/p{n}.wav'], check=True)
    def frame(img16, t, mode):
        canvas = small(img16).resize((W, H), Image.BILINEAR); canvas.paste((0, 0, 0), (0, 0, W, H), Image.new('L', (W, H), 110))
        canvas.paste(img16.resize((W, 608), Image.BILINEAR), (0, 640)); d = ImageDraw.Draw(canvas)
        d.rectangle([0, 636, W, 640], fill=(232, 180, 74)); d.rectangle([0, 1248, W, 1252], fill=(232, 180, 74))
        if mode == 'end':
            canvas.paste((10, 10, 14), (0, 0, W, H), Image.new('L', (W, H), 236)); d = ImageDraw.Draw(canvas); canvas.paste(LB, ((W - LB.width) // 2, 560), LB)
            ls = ['WATCH THE FULL VIDEO', 'ON OUR YOUTUBE CHANNEL'] if last else [f'WATCH PART {n + 1}', 'ON THIS PAGE']
            for k, l in enumerate(ls): outlined(d, (540, 1110 + k * 100), l, fE, (255, 255, 255) if k else (118, 210, 74))
            return canvas
        outlined(d, (420, 300), TITLE, fT, (255, 255, 255), 6)
        lab = f'PART {n} OF {M}'; tw = d.textlength(lab, font=fK)
        d.rounded_rectangle([420 - tw / 2 - 30, 360, 420 + tw / 2 + 30, 462], 18, fill=(232, 180, 74), outline=(18, 13, 10), width=6); d.text((420, 411), lab, font=fK, fill=(18, 13, 10), anchor='mm')
        cur = [i for i, w in enumerate(words) if w['s'] <= t < words[min(i + 1, len(words) - 1)]['s'] or w['s'] <= t <= w['e']]
        if cur:
            i = cur[-1]; g0 = i // 3 * 3; grp = words[g0:g0 + 3]
            if t <= grp[-1]['e'] + .6:
                ls = wrap(d, ' '.join(w['w'].upper() for w in grp), fC, 980); y = 1440 - (len(ls) - 1) * 52
                for l in ls:
                    x = 540 - d.textlength(l, font=fC) / 2
                    for w in l.split():
                        d.text((x, y), w, font=fC, fill=(255, 214, 64) if words[i]['w'].upper() == w else (255, 255, 255), anchor='lm', stroke_width=8, stroke_fill=(18, 13, 10)); x += d.textlength(w + ' ', font=fC)
                    y += 108
        canvas.paste(LS, (820, 262), LS); return canvas
    out = f'{OUT}/{PRE}_Part_{n:02d}.mp4'
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', f'{TMP}/p{n}.wav',
           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for k, fn in enumerate(frames): pr.stdin.write(frame(Image.open(fn).convert('RGB'), k / FPS, 'clip').tobytes())
    lastim = Image.open(frames[-1]).convert('RGB')
    for k in range(int(ed * FPS)): pr.stdin.write(frame(lastim, 0, 'end').tobytes())
    pr.stdin.close(); pr.wait(); print('PART', n, f'{len(aud) / SR:.1f}s', out, flush=True)
