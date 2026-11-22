#!/usr/bin/env python3
"""vo_check.py (v1, 22 Nov 2026) - lesson L30 "VO cut before the sentence ends" (Pushpam, GTA 6 v2 9:25).
Transcribes the video's audio with Whisper (free, local) and aligns it to the script's VO text. Any script words missing
from the audio (a cut sentence, a dropped line) are reported with the timestamp where they should have been.
  ~/.venvs/hf/bin/python /mnt/project-files/system/qa/vo_check.py VIDEO --script SCRIPT.md|.txt [--out DIR] [--model openai/whisper-small.en]
SCRIPT: a production script with markdown shot tables (VO = the column headed 'VO') or plain VO text files (several allowed).
"""
import argparse, difflib, json, os, re, subprocess, sys, tempfile

def script_words(paths):
    txt = []
    for p in paths:
        lines = open(p, encoding="utf-8").read().splitlines(); col = None
        for ln in lines:
            if ln.startswith("|"):
                cells = [c.strip() for c in ln.strip().strip("|").split("|")]
                if "VO" in cells: col = cells.index("VO"); continue
                if col is not None and len(cells) > col and not set(cells[0]) <= set("-: "): txt.append(cells[col])
            elif not any(l.startswith("|") for l in lines): txt.append(ln)
    return norm(" ".join(txt))

def norm(s): return re.findall(r"[a-z0-9']+", s.lower().replace("’", "'"))
def fmt(t): return f"{int(t//60)}:{t%60:04.1f}"

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--script", nargs="+", required=True)
    ap.add_argument("--out"); ap.add_argument("--model", default="openai/whisper-small.en"); ap.add_argument("--min", type=int, default=3)
    a = ap.parse_args(); out = a.out or os.path.splitext(os.path.abspath(a.video))[0] + "_qa"; os.makedirs(out, exist_ok=True)
    tmp = tempfile.mkdtemp(); wav = os.path.join(tmp, "a.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", a.video, "-vn", "-ac", "1", "-ar", "16000", wav], check=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-f", "segment", "-segment_time", "60", "-c", "copy",
                    os.path.join(tmp, "s%04d.wav")], check=True)   # 60 s pieces keep memory low
    from transformers import pipeline
    asr = pipeline("automatic-speech-recognition", model=a.model)
    heard, times = [], []
    for k, seg in enumerate(sorted(f for f in os.listdir(tmp) if f.startswith("s"))):
        for c in asr(os.path.join(tmp, seg), return_timestamps="word", chunk_length_s=30)["chunks"]:
            for w in norm(c["text"]): heard.append(w); times.append(k * 60 + (c["timestamp"][0] or 0))
        print(f"[vo] {k+1} min", file=sys.stderr)
    json.dump([[w, round(t, 2)] for w, t in zip(heard, times)], open(os.path.join(out, "vo_words.json"), "w"))   # qwen_qa uses it for "does the picture match the narration?"
    want = script_words(a.script)
    sm = difflib.SequenceMatcher(None, want, heard, autojunk=False); miss = []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op in ("delete", "replace") and (i2 - i1) >= a.min and (i2 - i1) > 2 * (j2 - j1):
            t = times[min(j1, len(times) - 1)] if times else 0
            miss.append({"t": fmt(t), "missing": " ".join(want[i1:i2]), "heard_instead": " ".join(heard[j1:j2])})
    cover = sum(b.size for b in sm.get_matching_blocks()) / max(len(want), 1)
    L = [f"# VO check: {os.path.basename(a.video)}", f"Script words {len(want)}, heard {len(heard)}, matched {cover:.0%}.", "",
         f"## Script lines missing from the audio ({len(miss)}) - cut VO, dropped or re-worded lines"]
    L += [f"- **{m['t']}** missing: \"{m['missing']}\"" + (f" (heard: \"{m['heard_instead']}\")" if m['heard_instead'] else "") for m in miss] or ["- none"]
    p = os.path.join(out, "vo_check.md"); open(p, "w").write("\n".join(L) + "\n")
    json.dump(miss, open(os.path.join(out, "vo_check.json"), "w"), indent=1); print(p)

if __name__ == "__main__": main()
