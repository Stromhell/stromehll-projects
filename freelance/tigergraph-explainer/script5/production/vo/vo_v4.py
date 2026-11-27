"""Script 5 v4 VO (client brief 28 Nov): re-voiced at Kokoro speed 0.87 (about 13% slower) with pronunciation fixes
(Reyes -> 'Ray-ess', Novak -> 'Noh-vak', AML kept as the acronym, deduplicating -> 'dee-duplicating'; each checked with Whisper),
and 0.75-1.5 s rests at the pivots. Step 1 (python3): clips. Step 2 (~/.venvs/hf/bin/python vo_v4.py --time): Whisper word
times -> beats_v4.json + vo_track_v4.wav."""
import json, os, re, sys, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); LEAD = .35; SPEED = .85; OUT = os.path.join(H, "af_heart_v4")
B = json.load(open(os.path.join(H, "beats_af_heart.json")))
FIX = [("Reyes", "Ray-ess"), ("Novakova", "NOVAKOVA"), ("Novak", "Noh-vak"), ("NOVAKOVA", "Novakova"), ("deduplicating", "dee-duplicating"), ("93%", "93 percent"), ("58%", "58 percent")]
def say(t):
    for a, b in FIX: t = t.replace(a, b)
    return t
SILENT = {"f02a": 3.0, "f02b": 3.2, "f04": 7.0, "f13": 7.5, "f14": 7.5}
# rests: pivots get 1.5-2.2 s (after 'Would you merge them?', after 'Different names. Same person.', end of each section)
TAIL = {"f01a": .9, "f01b": 1.3, "f01c": 2.2, "f03a": 1.4, "f05a": 1.0, "f05b": 1.0, "f05c": 1.6, "f06a": 1.0, "f06b": 1.6, "f07": 1.5,
        "f08a": 1.1, "f08b": 2.0, "f09": 1.8, "f10a": 1.5, "f10b": 1.8, "f11": 1.8, "f12a": 1.8, "f12b": 1.8}
if "--time" not in sys.argv:
    from kokoro_onnx import Kokoro
    k = Kokoro("/tmp/kmodel/kokoro-v1.0.onnx", "/tmp/kmodel/voices-v1.0.bin"); os.makedirs(OUT, exist_ok=True)
    for b in B:
        if b["silent"]: continue
        a, sr = k.create(say(b["text"]), voice="af_heart", speed=SPEED, lang="en-us")
        sf.write(os.path.join(OUT, b["file"] + ".wav"), a, sr); print(b["file"], round(len(a) / sr, 2))
    sys.exit()
from transformers import pipeline
asr = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")
out, t = [], 0.0
for b in B:
    f = b["file"]; wav = os.path.join(OUT, f + ".wav")
    if b["silent"]: d, words, vo, txt = SILENT[f], [], 0, ""
    else:
        a, sr = sf.read(wav); vo = len(a) / sr; d = LEAD + vo + TAIL.get(f, 1.0) + .5
        r = asr(wav, return_timestamps="word", chunk_length_s=30)["chunks"]
        words = [[re.sub(r"[^a-z0-9%'-]", "", c["text"].lower()), round(LEAD + (c["timestamp"][0] or 0), 3)] for c in r]
        txt = " ".join(c["text"].strip() for c in r)
    out.append(dict(scene=b["scene"], file=f, text=b["text"], heard=txt, vo=round(vo, 3), wav=wav if vo else None, dur=round(d, 3), start=round(t, 3), words=words))
    t += d
json.dump(out, open(os.path.join(H, "beats_v4.json"), "w"), indent=1)
sr = 24000; track = np.zeros(int(t * sr) + sr, dtype=np.float32)
for b in out:
    if b["wav"]:
        a, _ = sf.read(b["wav"], dtype="float32"); i = int((b["start"] + LEAD) * sr); track[i:i + len(a)] += a
sf.write(os.path.join(H, "vo_track_v4.wav"), track[:int(t * sr)], sr)
for b in out: print(b["file"], b["dur"], "|", b["heard"])
print(len(out), "beats", round(t, 1), "s")
