"""Script 5 v8: ONE page for the whole film (film.html) + plan.json.
Each scene script runs inside its own scope between beginScene()/endScene(); document.body/querySelector calls are pointed at the
scene's own wrappers. usage: python3 gen_film.py"""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(H, "..", "vo", "beats_v4.json")))
sc = {}
for b in B: sc.setdefault(b["scene"], []).append(b)
XF, last = .6, max(sc)
PREV = {2: 'push', 3: 'tilt', 4: 'push', 5: 'portal', 6: 'pull', 7: 'pull', 8: 'push', 9: 'orbit', 10: 'pull', 11: 'rise', 12: 'push', 13: 'portal', 14: 'pull'}
plan, tg, parts = [], 0.0, []
for n, bs in sc.items():
    W, t0, beats = [], 0.0, []
    for b in bs:
        ws = []
        for w, t in b["words"]:
            if w == "-s" and ws and ws[-1][0] == "ray": ws[-1][0] = "reyes"; continue
            if w == "hidesactivity": ws += [["hides", t], ["activity", round(t + .75, 3)]]; continue
            ws.append([{"el": "l"}.get(w, w), t])
        b["words"] = ws
        beats.append(round(t0, 3)); W += [dict(w=w, t=round(t0 + t, 3)) for w, t in b["words"]]; t0 += b["dur"]
    T = round(t0, 3)
    if n == last: T = 5.2
    p = dict(n=n, dur=T, tail=XF if n != last else 0, start=round(tg, 3), beats=beats, words=W, prev=PREV.get(n, ''))
    src = open(os.path.join(H, "scenes", f"sc{n:02d}.js")).read()
    src = src.replace("document.body.insertBefore", "SC.fg.insertBefore").replace("document.body", "SC.fg")
    src = src.replace("document.querySelectorAll(", "QA(").replace("document.querySelector(", "Q(")
    src = src.replace("finish();", "finish(); SC.tl = tl;")
    parts.append(f"<script>beginScene({json.dumps(p)});\n(function(){{\n{src}\n}})();\nendScene();</script>")
    plan.append(dict(n=n, file="film.html", dur=T, tail=p["tail"], start=p["start"])); tg += T
html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../style.css">'
        '<style>#BG,#NET,#FG,.scn{position:absolute;inset:0}#NET{pointer-events:none}#CARRY{position:absolute;inset:0;z-index:45;pointer-events:none}</style>'
        '<script src="../gsap.min.js"></script><script src="../lib.js"></script><script src="../film.js"></script></head><body>'
        '<div id="BG"></div><div id="NET"></div><div id="FG"></div><div id="CARRY"></div>'
        + "\n".join(parts) + '<script>finalizeFilm();</script></body></html>')
open(os.path.join(H, "pages", "film.html"), "w").write(html)
json.dump(plan, open(os.path.join(H, "plan.json"), "w"), indent=1)
print(len(plan), "scenes", round(tg, 2), "s")
