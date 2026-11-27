"""Script 5 v3 timing: tight VO (Pushpam 27 Nov: too much gap between lines). Reuses the af_heart clips.
Each beat = 0.3 s lead + clip + tail (0.7 s default, longer only where the picture needs it). Silent beats get fixed lengths.
Word times come from Whisper on each clip. usage: ~/.venvs/hf/bin/python vo_v3.py -> beats_v3.json, vo_track_v3.wav"""
import json, os, re, numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); LEAD = .3
B = json.load(open(os.path.join(H, "beats_af_heart.json")))
SILENT = {"f02a": 2.3, "f02b": 2.5, "f04": 5.2, "f13": 6.6, "f14": 6.6}
TAIL = {"f01b": 1.2, "f01c": 1.0, "f05c": 1.1, "f06b": 1.2, "f08b": 1.0, "f09": 1.4, "f10a": 1.8, "f10b": 1.5, "f11": 1.6, "f12a": 2.2, "f12b": 1.8}
from transformers import pipeline
asr = pipeline("automatic-speech-recognition", model="openai/whisper-small.en")
out, t = [], 0.0
for b in B:
    f = b["file"]; wav = os.path.join(H, "af_heart", f + ".wav")
    if b["silent"]: d, words = SILENT[f], []
    else:
        d = LEAD + b["vo"] + TAIL.get(f, .7)
        r = asr(wav, return_timestamps="word", chunk_length_s=30)["chunks"]
        words = [[re.sub(r"[^a-z0-9%'-]", "", c["text"].lower()), round(LEAD + (c["timestamp"][0] or 0), 3)] for c in r]
    out.append(dict(scene=b["scene"], file=f, text=b["text"], vo=b["vo"], wav=wav if not b["silent"] else None, dur=round(d, 3), start=round(t, 3), words=words))
    t += d
json.dump(out, open(os.path.join(H, "beats_v3.json"), "w"), indent=1)
sr = 24000; track = np.zeros(int(t * sr) + sr, dtype=np.float32)
for b in out:
    if b["wav"]:
        a, _ = sf.read(b["wav"], dtype="float32"); i = int((b["start"] + LEAD) * sr); track[i:i + len(a)] += a
sf.write(os.path.join(H, "vo_track_v3.wav"), track[:int(t * sr)], sr)
print(len(out), "beats", round(t, 1), "s")
