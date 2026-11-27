"""Script 5 v3: one HTML page per scene with Whisper word times (vo/beats_v3.json, tight VO gaps).
usage: python3 gen.py -> pages/scNN.html + plan.json"""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(H, "..", "vo", "beats_v3.json")))
os.makedirs(os.path.join(H, "pages"), exist_ok=True)
sc = {}
for b in B: sc.setdefault(b["scene"], []).append(b)
plan, tg = [], 0.0
for n, bs in sc.items():
    W, t0, beats = [], 0.0, []
    for b in bs:
        beats.append(round(t0, 3)); W += [dict(w=w, t=round(t0 + t, 3)) for w, t in b["words"]]; t0 += b["dur"]
    T = round(t0, 3)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../style.css">'
            f'<script src="../gsap.min.js"></script><script src="../lib.js"></script></head><body>'
            f'<script>window.TOTAL={T};window.BEATS={json.dumps(beats)};window.W={json.dumps(W)};window.T0={round(tg,3)};</script>'
            f'<script src="../scenes/sc{n:02d}.js"></script></body></html>')
    open(os.path.join(H, "pages", f"sc{n:02d}.html"), "w").write(html)
    plan.append(dict(n=n, file=f"sc{n:02d}.html", dur=T, start=round(tg, 3))); tg += T
json.dump(plan, open(os.path.join(H, "plan.json"), "w"), indent=1)
print(len(plan), "scenes", round(tg, 2), "s")
