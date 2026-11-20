# Free local voices (Kokoro-82M, Apache-2.0). One voice per character.
# Usage: kv/bin/python tts.py <out_dir> [act ...]
# Writes <out_dir>/<SHOT>.wav (24 kHz mono) and <out_dir>/timing.json {shot: {dur, lines:[{who,t0,t1,text}]}}
import sys, json, os, numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shots15 import SHOTS
from kokoro import KPipeline

VOICES = {  # one clean Kokoro voice per character, no pitch shift (video 15)
    "N": ("am_michael", 0.96, 1.0), "JOHN": ("am_eric", 0.95, 1.0), "BILL": ("am_fenrir", 1.04, 1.0), "ELIZA": ("af_sarah", 0.94, 1.0),
    "CLARK": ("am_adam", 1.06, 1.0), "ANDREWS": ("bm_george", 0.98, 1.0), "RAILMAN": ("am_onyx", 0.94, 1.0), "NED": ("am_puck", 1.0, 1.0),
    "IDA": ("af_heart", 0.98, 1.0), "TEDDY": ("am_onyx", 1.06, 1.0), "DOT": ("af_nicole", 0.95, 1.0), "PIP": ("am_echo", 0.98, 1.0),
    "GUS": ("bm_fable", 0.95, 1.0), "STROMI": ("am_liam", 0.98, 1.0), "FARMER": ("bm_daniel", 0.95, 1.0), "CLERK": ("bm_lewis", 1.0, 1.0),
    "LAWYER": ("bm_daniel", 0.98, 1.0), "REPORTER": ("am_echo", 1.04, 1.0), "WORKER": ("am_puck", 0.98, 1.0), "BUTLER": ("bm_george", 0.92, 1.0),
    "EDITOR": ("am_adam", 0.98, 1.0), "IVY": ("bm_lewis", 1.02, 1.0),
}
SR = 24000
GAP_N, GAP_SKIT, PAD0, PAD1 = 0.32, 0.4, 0.45, 0.55
import random; random.seed(4)

def pitch(a, f):
    if abs(f - 1) < 1e-3: return a
    import librosa
    return librosa.effects.pitch_shift(a, sr=SR, n_steps=12 * np.log2(f))

_IR = None
def room(a):
    global _IR
    if _IR is None:
        r = np.random.default_rng(8); n = int(SR * 0.09); t = np.arange(n) / SR
        ir = r.standard_normal(n) * np.exp(-t / 0.025); ir[:int(SR * 0.004)] = 0; ir /= np.sqrt((ir ** 2).sum()); _IR = ir.astype(np.float32)
    w = np.convolve(a, _IR); w = np.pad(w, (0, max(0, len(a) + len(_IR) - len(w))))[:len(a) + len(_IR)]; y = np.concatenate([a, np.zeros(len(_IR), np.float32)]) + 0.14 * w
    f = np.ones(len(y), np.float32); k = len(_IR); f[-k:] = np.linspace(1, 0, k) ** 2; return (y * f).astype(np.float32)

def main():
    out = sys.argv[1]; acts = set(int(x) for x in sys.argv[2:]) or None
    os.makedirs(out, exist_ok=True)
    tf = os.path.join(out, "timing.json")
    timing = json.load(open(tf)) if os.path.exists(tf) else {}
    pa, pb = KPipeline(lang_code='a', repo_id='hexgrad/Kokoro-82M'), None
    for s in SHOTS:
        if acts is not None and s["act"] not in acts: continue
        if os.environ.get("ONLY") and s["id"] not in os.environ["ONLY"].split(","): continue
        if s.get("card") is not None:
            timing[s["id"]] = {"dur": s.get("dur", 3.2 if s.get("sub") else 3.0), "lines": [], "card": s["card"], "sub": s.get("sub")}; continue
        buf = [np.zeros(int(SR * PAD0), np.float32)]; t = PAD0; lines = []
        for i, (who, text) in enumerate(s["lines"]):
            v, sp, pf = VOICES[who]
            if v.startswith("b"):
                if pb is None: pb = KPipeline(lang_code='b', repo_id='hexgrad/Kokoro-82M')
                p = pb
            else: p = pa
            def _fd(c):
                c = np.asarray(c, np.float32).copy(); k = min(240, len(c) // 4); c[:k] *= np.linspace(0, 1, k); k2 = min(1200, len(c) // 4); c[-k2:] *= np.cos(np.linspace(0, np.pi / 2, k2)) ** 2; return c
            ch = [_fd(x[2]) for x in p(text, voice=v, speed=sp)]
            a = np.concatenate(sum([[c, np.zeros(int(SR * 0.14), np.float32)] for c in ch], [])[:-1]).astype(np.float32)  # breath gap between TTS chunks, no hard joins
            a = pitch(a, pf)
            q = np.abs(a) < 2e-4; edges = np.flatnonzero(np.diff(q.astype(np.int8)) == 1) + 1  # soften every stop into an internal silence
            for e in edges:
                if e + 480 <= len(a) and q[e:e + 480].all():
                    k = min(960, e); a[e - k:e] *= (0.5 + 0.5 * np.cos(np.linspace(0, np.pi, k))).astype(np.float32)
            rms = np.sqrt(np.mean(a[np.abs(a) > 0.02] ** 2) + 1e-9); a = a * ((0.16 if who == "N" else 0.135) / rms); a = a / max(1.0, np.abs(a).max() / 0.95)  # even loudness across voices
            # trim leading/trailing near-silence
            nz = np.where(np.abs(a) > 0.004)[0]
            if len(nz): a = a[max(0, nz[0] - 1200): nz[-1] + 3000]  # 50 ms lead-in, 125 ms tail
            f = np.ones(len(a), np.float32); k = min(240, len(a) // 4); f[:k] = np.linspace(0, 1, k); f[-k:] = np.linspace(1, 0, k); a = a * f
            a = room(a)
            d = len(a) / SR
            lines.append({"who": who, "t0": round(t, 3), "t1": round(t + d, 3), "text": text})
            buf.append(a); t += d
            if i < len(s["lines"]) - 1:
                g = (GAP_N if (who == "N" or s["lines"][i + 1][0] == "N") else GAP_SKIT) + random.uniform(-0.06, 0.12)  # human, uneven turn-taking
                buf.append(np.zeros(int(SR * g), np.float32)); t += g
        buf.append(np.zeros(int(SR * PAD1), np.float32)); t += PAD1
        sf.write(os.path.join(out, s["id"] + ".wav"), np.concatenate(buf), SR)
        timing[s["id"]] = {"dur": round(t, 3), "lines": lines}
        print(s["id"], round(t, 1), flush=True)
    json.dump(timing, open(tf, "w"), indent=1)

if __name__ == "__main__":
    main()
