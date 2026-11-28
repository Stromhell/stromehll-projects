"""Script 5 v7: one HTML page per scene with Whisper word times (vo/beats_v3.json, tight VO gaps).
usage: python3 gen.py -> pages/scNN.html + plan.json"""
import json, os
H = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(H, "..", "vo", "beats_v4.json")))
os.makedirs(os.path.join(H, "pages"), exist_ok=True)
sc = {}
for b in B: sc.setdefault(b["scene"], []).append(b)
plan, tg = [], 0.0
PREV = {2: 'push', 3: 'tilt', 4: 'push', 5: 'portal', 6: 'pull', 7: 'pull', 8: 'push', 9: 'orbit', 10: 'pull', 11: 'rise', 12: 'push', 13: 'portal', 14: 'pull'}   # how scene n-1 leaves
XF = .6   # v4: each scene renders XF s past its end; the mixer cross-dissolves it under the next scene's head (no blank frames between scenes)
last = max(sc)
for n, bs in sc.items():
    W, t0, beats = [], 0.0, []
    for b in bs:
        ws = []
        for w, t in b["words"]:   # Whisper hears the phonetic spellings as 'ray -s' / 'el': map back to the script words
            if w == "-s" and ws and ws[-1][0] == "ray": ws[-1][0] = "reyes"; continue
            if w == "hidesactivity": ws += [["hides", t], ["activity", round(t + .75, 3)]]; continue
            ws.append([{"el": "l"}.get(w, w), t])
        b["words"] = ws
        beats.append(round(t0, 3)); W += [dict(w=w, t=round(t0 + t, 3)) for w, t in b["words"]]; t0 += b["dur"]
    T = round(t0, 3)
    if n == last: T = 5.2   # v7: end slate settles by ~2.4 s, sweep ends 4.5 s; short resolved hold, no 3 s freeze
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../style.css">'
            f'<script src="../gsap.min.js"></script><script src="../lib.js"></script></head><body>'
            f'<script>window.TOTAL={T};window.BEATS={json.dumps(beats)};window.W={json.dumps(W)};window.T0={round(tg,3)};window.TAIL={XF if n != last else 0};window.XF=1;window.PREV={json.dumps(PREV.get(n, ''))};</script>'
            f'<script src="../scenes/sc{n:02d}.js"></script></body></html>')
    open(os.path.join(H, "pages", f"sc{n:02d}.html"), "w").write(html)
    plan.append(dict(n=n, file=f"sc{n:02d}.html", dur=T, tail=XF if n != last else 0, start=round(tg, 3))); tg += T
json.dump(plan, open(os.path.join(H, "plan.json"), "w"), indent=1)
print(len(plan), "scenes", round(tg, 2), "s")
