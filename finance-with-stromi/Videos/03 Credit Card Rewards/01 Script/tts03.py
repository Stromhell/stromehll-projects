# Kokoro-82M voices (Apache-2.0), no pitch shift (Pushpam 12 Nov). Usage: kv/bin/python tts03.py OUTDIR [SHOT...]
import sys, json, os, numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shots03 import SHOTS
from kokoro import KPipeline
VOICES = {"N": ("am_michael", 0.98), "JO": ("af_heart", 1.03), "BANKER": ("bm_george", 0.95), "CASHIER": ("am_puck", 1.05),
          "GUS": ("am_onyx", 1.0), "NETWORK": ("af_nicole", 1.0), "RAY": ("am_echo", 0.98), "MABEL": ("af_bella", 1.03)}
SR = 24000; GAP_N, GAP_SKIT, PAD0, PAD1 = 0.32, 0.22, 0.45, 0.55
out = sys.argv[1]; only = set(sys.argv[2:]); os.makedirs(out, exist_ok=True)
tf = os.path.join(out, "timing.json"); timing = json.load(open(tf)) if os.path.exists(tf) else {}
P = {'a': KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M')}
for s in SHOTS:
    if only and s["id"] not in only: continue
    if s.get("card"): timing[s["id"]] = {"dur": 3.2, "lines": [], "card": s["card"], "sub": s.get("sub")}; continue
    buf = [np.zeros(int(SR * PAD0), np.float32)]; t = PAD0; lines = []
    for i, (who, text) in enumerate(s["lines"]):
        v, sp = VOICES[who]; lc = v[0]
        if lc not in P: P[lc] = KPipeline(lang_code=lc, repo_id='hexgrad/Kokoro-82M')
        a = np.concatenate([np.asarray(x[2]) for x in P[lc](text, voice=v, speed=sp)]).astype(np.float32)
        a = a / (np.abs(a).max() + 1e-6) * (0.85 if who == "N" else 0.8)
        nz = np.where(np.abs(a) > 0.01)[0]
        if len(nz): a = a[max(0, nz[0] - 240): nz[-1] + 480]
        d = len(a) / SR; lines.append({"who": who, "t0": round(t, 3), "t1": round(t + d, 3), "text": text}); buf.append(a); t += d
        if i < len(s["lines"]) - 1:
            g = GAP_N if (who == "N" and s["lines"][i + 1][0] == "N") else GAP_SKIT; buf.append(np.zeros(int(SR * g), np.float32)); t += g
    tail = PAD1 + s.get("tail", 0); buf.append(np.zeros(int(SR * tail), np.float32)); t += tail
    sf.write(os.path.join(out, s["id"] + ".wav"), np.concatenate(buf), SR, subtype='PCM_16')
    timing[s["id"]] = {"dur": round(t, 3), "lines": lines}; print(s["id"], round(t, 1), flush=True)
json.dump(timing, open(tf, "w"))
