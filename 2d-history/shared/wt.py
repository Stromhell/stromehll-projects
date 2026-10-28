# Assemble an act's VO from per-shot clips and time every word.
# Usage: python3 wt.py VIDEO_DIR ACT_INDEX [--gap 0.55] [--check]
# Reads  production/voice/actN.txt (original text, one paragraph per shot) and production/voice/actN/vo-NN.wav
# Writes production/acts/actN/vo.wav, timing.json {shots:[{i,start,end,vo_start,vo_end,text}], words:[{w,s,e}], dur}
# --check: Whisper transcript vs the spoken text per shot; prints shots whose word error rate is high (regenerate those).
import sys, os, json, re, glob, argparse, subprocess
import numpy as np
from scipy.io import wavfile
SR = 48000
ap = argparse.ArgumentParser(); ap.add_argument('vdir'); ap.add_argument('act', type=int); ap.add_argument('--gap', type=float, default=.55)
ap.add_argument('--lead', type=float, default=.6); ap.add_argument('--check', action='store_true'); a = ap.parse_args()
vd = a.vdir; src = f'{vd}/production/voice/act{a.act}.txt'; clipdir = f'{vd}/production/voice/act{a.act}'
paras = [p.strip() for p in open(src).read().split('\n\n') if p.strip()]
says = [p.strip() for p in open(src[:-4] + '.say.txt').read().split('\n\n') if p.strip()] if os.path.exists(src[:-4] + '.say.txt') else paras
clips = sorted(glob.glob(f'{clipdir}/vo-*.wav'))
assert len(clips) == len(paras), (len(clips), len(paras))
def load(p):
    sr, x = wavfile.read(p); x = x.astype(np.float32); x = x.mean(1) if x.ndim > 1 else x
    if np.max(np.abs(x)) > 2: x /= 32768
    if sr != SR:
        from scipy.signal import resample_poly; g = np.gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    return x
def trim(x, th=.012):
    idx = np.where(np.abs(x) > th)[0]
    if not len(idx): return x
    return x[max(0, idx[0] - int(.03 * SR)): idx[-1] + int(.12 * SR)]
from faster_whisper import WhisperModel
model = WhisperModel('small.en', device='cpu', compute_type='int8')
norm = lambda s: re.sub(r"[^a-z0-9' ]", ' ', s.lower()).split()
def wer(ref, hyp):
    r, h = norm(ref), norm(hyp); d = list(range(len(h) + 1))
    for i in range(1, len(r) + 1):
        p, d[0] = d[0], i
        for j in range(1, len(h) + 1): p, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, p + (r[i - 1] != h[j - 1]))
    return d[len(h)] / max(1, len(r))
out = [np.zeros(int(a.lead * SR))]; t = a.lead; shots = []; words = []; bad = []
for i, (cp, para, say) in enumerate(zip(clips, paras, says)):
    x = trim(load(cp)); dur = len(x) / SR
    from scipy.signal import resample_poly
    a16 = resample_poly(load(cp), 1, 3).astype(np.float32)
    segs, _ = model.transcribe(a16, word_timestamps=True, language='en', beam_size=1)
    ww = [w for s in segs for w in (s.words or [])]
    hyp = ' '.join(w.word for w in ww)
    e = wer(say, hyp)
    if e > .25: bad.append((i + 1, round(e, 2), hyp))
    # offset whisper times by the trim start
    raw = load(cp); idx = np.where(np.abs(raw) > .012)[0]; off = max(0, idx[0] - int(.03 * SR)) / SR if len(idx) else 0
    toks = para.split()
    if ww:
        ws, we = max(0, ww[0].start - off), min(dur, ww[-1].end - off)
        # map original words onto the whisper timeline by cumulative character position
        hc = np.cumsum([len(w.word.strip()) + 1 for w in ww]); hc = hc / hc[-1]
        oc = np.cumsum([len(w) + 1 for w in toks]); oc = oc / oc[-1]
        starts = [max(0, w.start - off) for w in ww]; ends = [max(0, w.end - off) for w in ww]
        prev = 0
        for k, tok in enumerate(toks):
            j0 = int(np.searchsorted(hc, (oc[k - 1] if k else 0) + 1e-9)); j1 = int(np.searchsorted(hc, oc[k] - 1e-9))
            j0, j1 = min(j0, len(ww) - 1), min(max(j1, j0), len(ww) - 1)
            s, e2 = max(prev, starts[j0]), max(starts[j0] + .05, ends[j1]); prev = s
            words.append(dict(w=tok, s=round(t + s, 3), e=round(t + e2, 3)))
    else:
        for k, tok in enumerate(toks): words.append(dict(w=tok, s=round(t + dur * k / len(toks), 3), e=round(t + dur * (k + 1) / len(toks), 3)))
    shots.append(dict(i=i + 1, start=round(t - (a.gap / 2 if i else a.lead), 3), vo_start=round(t, 3), vo_end=round(t + dur, 3), text=para))
    out += [x, np.zeros(int(a.gap * SR))]; t += dur + a.gap
for k, s in enumerate(shots): s['end'] = round(shots[k + 1]['start'], 3) if k + 1 < len(shots) else round(t + .4, 3)
y = np.concatenate(out + [np.zeros(int(.4 * SR))])
od = f'{vd}/production/acts/act{a.act}'; os.makedirs(od, exist_ok=True)
wavfile.write(f'{od}/vo.wav', SR, (np.clip(y, -1, 1) * 32767).astype(np.int16))
json.dump(dict(dur=round(len(y) / SR, 3), shots=shots, words=words), open(f'{od}/timing.json', 'w'), indent=0)
print(f'act{a.act}: {len(shots)} shots, {len(y) / SR:.1f}s', 'BAD:' if bad else 'all lines clean', *bad, sep='\n  ')
