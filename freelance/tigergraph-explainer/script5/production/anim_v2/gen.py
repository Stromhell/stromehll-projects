"""Script 5 v2: build one HTML page per scene (style.css + lib.js + scenes/scNN.js) with the VO word times baked in.
Word times: each beat's VO clip starts 0.35 s into the beat (vo_full.py); words are placed by character share of the clip.
usage: python3 gen.py   -> pages/scNN.html + plan.json"""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(H, "..", "vo", "beats_af_heart.json")))
os.makedirs(os.path.join(H, "pages"), exist_ok=True)
sc = {}
for b in B: sc.setdefault(b["scene"], []).append(b)
plan, t_glob = [], 0.0
for n, bs in sc.items():
    W, t0, beats = [], 0.0, []
    for b in bs:
        txt = b["text"]; beats.append(round(t0, 3))
        if txt:
            tot = len(txt); pos = 0
            for m in re.finditer(r"\S+", txt):
                W.append(dict(w=m.group(0), t=round(t0 + .35 + b["vo"] * m.start() / tot, 3)))
        t0 += b["dur"]
    T = round(t0, 3)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../style.css">'
            f'<script src="../gsap.min.js"></script><script src="../lib.js"></script></head><body>'
            f'<script>window.TOTAL={T};window.BEATS={json.dumps(beats)};window.W={json.dumps(W)};window.T0={round(t_glob,3)};</script>'
            f'<script src="../scenes/sc{n:02d}.js"></script></body></html>')
    open(os.path.join(H, "pages", f"sc{n:02d}.html"), "w").write(html)
    plan.append(dict(n=n, file=f"sc{n:02d}.html", dur=T, start=round(t_glob, 3)))
    t_glob += T
json.dump(plan, open(os.path.join(H, "plan.json"), "w"), indent=1)
print(len(plan), "scenes", round(t_glob, 2), "s")
