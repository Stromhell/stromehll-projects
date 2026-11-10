#!/usr/bin/env python3
"""Narrate a script in Pushpam's DEFAULT voice (from 10 Nov 2026): his own cloned voice
with a mixed accent (55% Indian, 35% American, 10% British), as approved on take P.

Usage (run with the Chatterbox venv python, see SKILL.md):
  $PY scripts/speak_mixed.py --file act0.txt --out vo.wav            # one file
  $PY scripts/speak_mixed.py --file act0.txt --out vo.wav --scenes   # vo-01.wav, vo-02.wav ... one per paragraph

How it works:
- Reference voice: voice/pushpam_mixed.wav (Chatterbox zero-shot prompt). Free and local. Never ElevenLabs.
- Each paragraph is cut into chunks of up to ~28 words (whole sentences kept together, so there are fewer joins).
- Each chunk is generated 3 times; faster-whisper picks the take with no wrong words, no long gaps inside,
  highest word confidence, then the widest pitch range (most expressive).
- Energy: 0.6 normally, 0.7 for lines ending in ? or !, 0.45 for lines ending in "..." (quiet tension).
  cfg_weight 0.35, temperature 0.9 (looser = less robotic).
- Soft trim keeps breaths and a short tail; gap between chunks 0.22 s. No time-stretching (it makes the voice warble).
- Master: light denoise, small warmth boost, gentle compression, -16 LUFS, faint pink room tone (no dead silence).
Writing tips: use an em-dash to hold a thought, "..." for a dramatic beat, "thee" before vowels, write numbers as words.
"""
import argparse, os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf, librosa

HERE = os.path.dirname(os.path.abspath(__file__))
VOICE = os.path.join(HERE, "..", "voice", "pushpam_mixed.wav")

def chunks(par, maxw=28):
    sents = re.split(r'(?<=[.?!])\s+', par.strip()); out, cur = [], ""
    for s in sents:
        if cur and len((cur + " " + s).split()) > maxw: out.append(cur); cur = s
        else: cur = (cur + " " + s).strip()
    if cur: out.append(cur)
    return out

def settings(t):
    t = t.rstrip()
    if t.endswith("..."): return 0.45
    if t.endswith("?") or t.endswith("!"): return 0.7
    return 0.6

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--file"); ap.add_argument("--text"); ap.add_argument("--out", required=True)
    ap.add_argument("--scenes", action="store_true"); ap.add_argument("--takes", type=int, default=3); a = ap.parse_args()
    text = open(a.file).read() if a.file else a.text
    from chatterbox.tts import ChatterboxTTS
    from faster_whisper import WhisperModel
    dev = "cuda" if __import__("torch").cuda.is_available() else ("mps" if __import__("torch").backends.mps.is_available() else "cpu")
    tts = ChatterboxTTS.from_pretrained(dev); sr = tts.sr
    wm = WhisperModel("small.en", device="cpu", compute_type="int8")
    norm = lambda s: re.sub(r"[^a-z ]", "", s.lower()).split()

    def soft_trim(y):
        i = np.where(np.abs(y) > 0.01)[0]
        if not len(i): return y
        y = y[max(0, i[0] - int(.05 * sr)):min(len(y), i[-1] + int(.12 * sr))].copy()
        n = int(.04 * sr); y[-n:] *= np.linspace(1, 0, n); return y

    def score(y, ref):
        seg, _ = wm.transcribe(librosa.resample(y, orig_sr=sr, target_sr=16000), word_timestamps=True)
        ws = [w for s in seg for w in s.words]; hyp = norm(" ".join(w.word for w in ws))
        err = sum(x != z for x, z in zip(hyp, ref)) + abs(len(hyp) - len(ref))
        gap = max([ws[j + 1].start - ws[j].end for j in range(len(ws) - 1)] or [0])
        p = float(np.mean([w.probability for w in ws])) if ws else 0
        f0, _, _ = librosa.pyin(librosa.resample(y, orig_sr=sr, target_sr=16000), fmin=60, fmax=300, sr=16000); f0 = f0[~np.isnan(f0)]
        rng = float(np.percentile(f0, 90) - np.percentile(f0, 10)) if len(f0) else 0
        return (min(err, 3), int(gap > 0.5), -round(p, 1), -rng)

    def say(chunk):
        ref = norm(re.sub(r"\d+", "", chunk.replace("—", " "))); best = None
        for _ in range(a.takes):
            y = soft_trim(tts.generate(chunk, audio_prompt_path=VOICE, exaggeration=settings(chunk), cfg_weight=0.35, temperature=0.9).squeeze(0).numpy())
            sc = score(y, ref)
            if best is None or sc < best[0]: best = (sc, y)
        return best[1]

    def master(raw, out):
        d = len(raw) / sr; tmp = tempfile.mktemp(suffix=".wav"); pre = tempfile.mktemp(suffix=".wav"); sf.write(tmp, raw, sr)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", tmp, "-af", "aresample=48000,highpass=f=70,afftdn=nr=8:nf=-45,equalizer=f=120:t=q:w=1:g=1.5,acompressor=threshold=-20dB:ratio=2:attack=15:release=200:makeup=2", "-ac", "1", pre], check=True)
        r = subprocess.run(["ffmpeg", "-hide_banner", "-i", pre, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
        I = float([l for l in r.splitlines() if l.strip().startswith("I:")][-1].split()[1]); g = -16 - I
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", pre, "-f", "lavfi", "-t", f"{d:.3f}", "-i", "anoisesrc=color=pink:amplitude=0.0016:sample_rate=48000",
                        "-filter_complex", f"[0]volume={g}dB,alimiter=limit=0.84[v];[1]lowpass=f=3000[n];[v][n]amix=inputs=2:normalize=0[o]", "-map", "[o]", "-ac", "1", "-ar", "48000", out], check=True)
        # never use loudnorm together with amix: it faded the end of a take on 10 Nov

    pars = [p for p in re.split(r"\n\s*\n", text) if p.strip()]
    gap = np.zeros(int(0.22 * sr))
    def voice_par(p):
        parts = []
        for c in chunks(p): parts += [say(c), gap]
        return np.concatenate(parts[:-1])
    if a.scenes:
        base, ext = os.path.splitext(a.out); d = os.path.dirname(a.out) or "."
        for i, p in enumerate(pars, 1):
            o = os.path.join(d, f"vo-{i:02d}{ext or '.wav'}")
            if os.path.exists(o): continue
            master(voice_par(p), o); print("wrote", o, flush=True)
    else:
        allp = []
        for p in pars: allp += [voice_par(p), np.zeros(int(0.4 * sr))]
        master(np.concatenate(allp[:-1]), a.out); print("wrote", a.out)

if __name__ == "__main__":
    main()
