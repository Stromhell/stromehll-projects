#!/usr/bin/env python3
"""Voice naturalness QA (Pushpam 14 Nov 2026: "make sure all the voices sound natural").
Run on every VO stem / clip BEFORE mixing (narrator + every character/gag voice), any engine
(take P, Kokoro, Piper, ElevenLabs). numpy + ffmpeg only.

usage: python3 voice_qa.py FILE [FILE ...]   (wav/mp3/mp4; use the dry VO, not the music mix)
Prints one table per file; exit 1 if any FAIL. Also importable: check(path) -> list of (level, check, detail, fix).

Checks (thresholds for natural English narration):
 - pace: syllable-rate proxy 2.6-6.0 /s (FAIL <2.2 or >6.8), and pace swings between sentences
 - monotone / robotic: pitch spread over speech < 1.6 semitones (WARN < 2.2)
 - pitch glitches: voiced-frame F0 jumps > 9 semitones inside a word (crack, octave error, warble)
 - clipped words: speech that ends/starts with a hard cut (> 30 dB change in 10 ms)
 - wall of speech: > 22 s without a >= 0.15 s breath pause; unnatural gaps > 1.6 s mid-clip
 - noise floor / hiss in pauses > -58 dBFS, and hissy pauses (high-band share)
 - digital clipping (samples at full scale)
"""
import subprocess, sys
import numpy as np

SR = 16000

def load(path):
    p = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True)
    return np.frombuffer(p.stdout, np.float32).copy()

def fmt(t): return f"{int(t//60)}:{t%60:05.2f}"

def f0_track(x, hop=160, win=640):
    """Autocorrelation F0 per 10 ms; 0 = unvoiced. Range 70-400 Hz."""
    n = (len(x) - win) // hop
    f0 = np.zeros(max(n, 0)); lo, hi = SR // 400, SR // 70
    w = np.hanning(win).astype(np.float32)
    for i in range(n):
        fr = x[i*hop:i*hop+win] * w
        e = float((fr*fr).sum())
        if e < 1e-4: continue
        spec = np.fft.rfft(fr, 2*win)
        ac = np.fft.irfft(np.abs(spec)**2)[:win]
        ac /= ac[0] + 1e-9
        k = lo + int(np.argmax(ac[lo:hi]))
        if ac[k] > 0.45:
            f0[i] = SR / k
    return f0

def check(path):
    R = []
    add = lambda *a: R.append(a)
    x = load(path)
    if len(x) < SR:
        return [("FAIL", "audio", "empty or < 1 s", "re-generate")]
    dur = len(x) / SR
    # digital clipping
    clip = (np.abs(x) > 0.995).mean()
    if clip > 1e-4:
        add("FAIL", "digital clipping", f"{clip*100:.2f}% samples at full scale", "lower the TTS gain / re-export, then limiter")
    # 10 ms frame energy
    hop = 160
    n = len(x) // hop
    fr = x[:n*hop].reshape(n, hop)
    db = np.maximum(10*np.log10((fr**2).mean(axis=1) + 1e-12), -80)
    peak = np.percentile(db, 95)
    speech = db > peak - 28
    # pauses / wall of speech / long gaps
    gaps, runs, i = [], [], 0
    while i < n:
        j = i
        while j < n and speech[j] == speech[i]: j += 1
        (runs if speech[i] else gaps).append((i, j)); i = j
    longest = 0; cur_start = None
    for a, b in runs:
        pass
    # merge speech runs separated by < 0.15 s
    merged = []
    for a, b in runs:
        if merged and a - merged[-1][1] < 15: merged[-1][1] = b
        else: merged.append([a, b])
    for a, b in merged:
        if (b - a) / 100 > 22:
            add("WARN", "wall of speech", f"{fmt(a/100)}-{fmt(b/100)} {(b-a)/100:.0f}s with no breath pause",
                "add commas/full stops or SSML breaks so the voice pauses every sentence (0.25-0.5 s)")
    for a, b in gaps:
        if a > 0 and b < n and (b - a) / 100 > 1.6:
            add("WARN", "long gap mid-clip", f"{fmt(a/100)}-{fmt(b/100)} ({(b-a)/100:.1f}s)", "tighten to 0.3-0.8 s unless it is a deliberate beat")
    # clipped words: (1) no handle at the file edges, (2) a word that stops dead mid-clip
    hits = 0
    if db[:2].max() > peak - 15:
        add("FAIL", "clipped word", "0:00.00 speech starts on the first frame (no lead-in, first sound likely cut)", "regenerate or pad: keep 50-100 ms of room tone before the first word")
    if db[-2:].max() > peak - 15:
        add("FAIL", "clipped word", f"{fmt(dur)} speech runs into the last frame (last word likely cut)", "keep 100-200 ms tail after the last word; 10 ms fade-out")
    for a2, b2 in merged:
        if b2 - a2 < 20 or b2 + 2 >= n: continue
        before = db[b2-3:b2].max(); after = db[b2+1:b2+3].max()
        if before > peak - 10 and before - after > 35:
            hits += 1
            if hits <= 6:
                add("FAIL", "clipped word", f"~{fmt(b2/100)} word stops dead ({before-after:.0f} dB drop in 10-20 ms at full level)",
                    "re-trim with 30-60 ms handles + 10 ms fades; never cut on a phoneme; re-generate if the TTS truncated the word")
    if hits > 6: add("FAIL", "clipped word", f"{hits-6} more", "same fix")
    # noise floor / hiss in pauses
    quiet = gaps and np.concatenate([np.arange(a, b) for a, b in gaps if b - a >= 15]) if gaps else None
    if quiet is not None and len(quiet) > 20:
        floor = np.median(db[quiet])
        q = fr[quiet].ravel()
        spec = np.abs(np.fft.rfft(q[:len(q)//1024*1024].reshape(-1, 1024), axis=1)).mean(axis=0)
        hi = spec[int(len(spec)*5/8):].sum() / (spec.sum() + 1e-9)  # > 5 kHz share
        lvl = "FAIL" if floor > -50 else ("WARN" if floor > -58 else None)
        if lvl:
            add(lvl, "noise in pauses", f"floor {floor:.0f} dBFS, {hi*100:.0f}% above 5 kHz{' (hiss)' if hi > 0.25 else ''}",
                "arnndn sh.rnnn + afftdn nr=14 (trim 1680-sample delay), then a gate at -55 dBFS")
    # pace: syllable nuclei = peaks of smoothed 300-3000 Hz envelope
    env = np.convolve(10**(db/20), np.ones(5)/5, mode="same")
    pk = (env[1:-1] > env[:-2]) & (env[1:-1] >= env[2:]) & (db[1:-1] > peak - 18)
    idx = np.where(pk)[0] + 1
    # keep peaks >= 80 ms apart and with a dip of >= 3 dB between
    syl = []
    for k in idx:
        if syl and k - syl[-1] < 8: 
            if env[k] > env[syl[-1]]: syl[-1] = k
            continue
        if syl and (20*np.log10(env[k]+1e-9) - 20*np.log10(env[syl[-1]:k].min()+1e-9)) < 3: continue
        syl.append(k)
    talk = sum(b - a for a, b in merged) / 100
    if talk > 3:
        rate = len(syl) / talk
        lvl = "FAIL" if rate < 2.2 or rate > 6.8 else ("WARN" if rate < 2.6 or rate > 6.0 else "PASS")
        add(lvl, "pace", f"~{rate:.1f} syllables/s over {talk:.0f}s of speech (natural 3-5.5)",
            "too fast: speed 0.9-0.95 or add pauses; too slow/dragging: speed 1.05-1.1" if lvl != "PASS" else "")
        # pace swings between merged sentences (sudden speed-ups)
        rates = []
        for a, b in merged:
            if b - a >= 200:
                c = sum(1 for s in syl if a <= s < b); rates.append((a, c / ((b-a)/100)))
        if len(rates) >= 3:
            med = np.median([r for _, r in rates])
            for a, r in rates:
                if r > med * 1.45 or r < med * 0.6:
                    add("WARN", "pace jump", f"{fmt(a/100)} {r:.1f}/s vs clip median {med:.1f}/s", "re-generate that sentence or match speed")
    # pitch: monotone + glitches
    f0 = f0_track(x)
    v = f0 > 0
    if v.sum() > 100:
        from_med = np.array([np.median(f0[max(0,i-5):i+6][f0[max(0,i-5):i+6]>0]) for i in np.where(v)[0]])
        st = 12*np.log2(from_med / np.median(from_med))
        spread = np.percentile(st, 90) - np.percentile(st, 10)
        lvl = "FAIL" if spread < 1.6 else ("WARN" if spread < 2.2 else "PASS")
        add(lvl, "intonation", f"pitch spread {spread:.1f} semitones (natural narration ~3-8)",
            "robotic/monotone: raise expressiveness/temperature, add emphasis words, split long sentences, or switch voice" if lvl != "PASS" else "")
        # glitch = >=3 voiced frames sitting > 7 semitones off the local (150 ms) median contour
        lf = np.where(v, 12*np.log2(np.maximum(f0, 1)/np.median(f0[v])), np.nan)
        jumps, first, run = 0, [], 0
        for i in range(7, len(lf) - 7):
            w = lf[i-7:i+8]; w = w[~np.isnan(w)]
            if np.isnan(lf[i]) or len(w) < 9: run = 0; continue
            if abs(lf[i] - np.median(w)) > 7: run += 1
            else:
                if run >= 3:
                    jumps += 1
                    if len(first) < 5: first.append(fmt(i/100))
                run = 0
        if jumps / talk_safe(talk) > 0.08:
            add("WARN", "pitch glitches", f"{jumps} warble/crack spots, e.g. {', '.join(first)}",
                "listen there: voice crack/warble/octave flip -> re-generate the line (lower speed or different seed)")
    return R

def talk_safe(t): return max(t, 1.0)

def main():
    bad = False
    for f in sys.argv[1:]:
        R = check(f)
        print(f"\n## voice_qa: {f}\n\n| level | check | detail | fix |\n|---|---|---|---|")
        order = {"FAIL": 0, "WARN": 1, "PASS": 2}
        for r in sorted(R, key=lambda r: order.get(r[0], 3)):
            print("| " + " | ".join(str(c) for c in r) + " |")
        bad |= any(r[0] == "FAIL" for r in R)
    print("\nListen too: breaths, mouth clicks, wrong stress, mispronounced names, accent drift, emotion that fits the line.")
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
