#!/usr/bin/env python3
"""repeat_check.py (v1, 22 Nov 2026, EXPERIMENTAL - not used by qa_lean: missed the GTA 6 ocean reuse because cards change the frame; the narration check (L08) caught it instead) - lesson L20 "same background reused" (Pushpam, GTA 6 v2 5:56 "the ocean looks same").
Free, numpy only. Samples a frame every 2 s, compares each against every frame more than --gap seconds away using a
blurred 32x18 colour thumbnail of the whole frame. Very similar far-apart frames = the same set/background reused.
  python3 /mnt/project-files/system/qa/repeat_check.py VIDEO [--out DIR] [--gap 45] [--thr 6]
Output DIR/repeat_check.md: pairs of time ranges that look like the same scene. Judge: is the reuse on purpose
(callback, same location in the story) or lazy (a new place drawn with an old set)?
"""
import argparse, os, subprocess, sys
import numpy as np
def fmt(t): return f"{int(t//60)}:{t%60:04.1f}"
def main():
    ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--out")
    ap.add_argument("--gap", type=float, default=45); ap.add_argument("--thr", type=float, default=6.0); ap.add_argument("--every", type=float, default=2)
    a = ap.parse_args(); out = a.out or os.path.splitext(os.path.abspath(a.video))[0] + "_qa"; os.makedirs(out, exist_ok=True)
    W, H = 32, 18
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", a.video, "-vf", f"fps=1/{a.every},scale={W}:{H}:flags=area",
                          "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
    F = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3).astype(np.float32)
    F = F[(F.mean(axis=(1, 2, 3)) > 20)] if False else F
    n = len(F); t = np.arange(n) * a.every; bright = F.mean(axis=(1, 2, 3))
    flat = F.reshape(n, -1); hits = []
    for i in range(n):
        if bright[i] < 20: continue                       # skip black / fades
        d = np.abs(flat - flat[i]).mean(axis=1)
        for j in np.where((d < a.thr) & (t > t[i] + a.gap) & (bright > 20))[0]: hits.append((t[i], t[j], float(d[j])))
    groups = []                                              # merge into (rangeA, rangeB)
    for ti, tj, d in sorted(hits):
        for g in groups:
            if ti - g[1] <= 6 and abs((tj - ti) - (g[3] - g[1])) <= 8: g[1] = max(g[1], ti); g[3] = max(g[3], tj); g[4] = min(g[4], d); break
        else: groups.append([ti, ti, tj, tj, d])
    L = [f"# Repeat check: {os.path.basename(a.video)}", f"{n} frames every {a.every}s; pairs more than {a.gap:.0f}s apart that look like the same scene.", "",
         f"## Same scene/background reused ({len(groups)})"]
    L += [f"- {fmt(g[0])}-{fmt(g[1]+a.every)}  looks like  {fmt(g[2])}-{fmt(g[3]+a.every)}  (diff {g[4]:.1f})" for g in groups] or ["- none"]
    p = os.path.join(out, "repeat_check.md"); open(p, "w").write("\n".join(L) + "\n"); print(p)
    import json; json.dump([{"a": fmt(g[0]), "b": fmt(g[2]), "diff": g[4]} for g in groups], open(os.path.join(out, "repeat_check.json"), "w"))
if __name__ == "__main__": main()
