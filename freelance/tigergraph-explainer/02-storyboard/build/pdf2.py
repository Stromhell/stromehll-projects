"""Storyboard v2 PDF (brand cover, white pages, Urbane). Run after frames.py + shoot.js; then shoot_pdf2.js."""
import json, os, html, datetime
H = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(H, "scenes.json")))
e = html.escape
def tc(s): return f"{int(s//60)}:{int(s%60):02d}"
total = S[-1]["start"] + S[-1]["dur"]
DEMO = range(6, 12)
F = "../fonts/"

css = f"""
@font-face{{font-family:Urbane;font-weight:300;src:url({F}Urbane-Light.woff2)}}
@font-face{{font-family:Urbane;font-weight:500;src:url({F}Urbane-Medium.woff2)}}
@font-face{{font-family:Urbane;font-weight:600;src:url({F}Urbane-Demi-Bold.woff2)}}
@font-face{{font-family:Urbane;font-weight:700;src:url({F}Urbane-Bold.woff2)}}
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=block');
@page{{size:1920px 1080px;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:Urbane,sans-serif;color:#0d1620;background:#fff}}
.pg{{width:1920px;height:1080px;position:relative;overflow:hidden;page-break-after:always;background:#fff}}
.hdr{{position:absolute;left:70px;right:70px;top:38px;display:flex;justify-content:space-between;align-items:center}}
.hdr .t{{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:500}}
.hdr .t img{{height:34px}}
.hdr .r{{font-size:20px;color:#6a8396}}
.frame{{position:absolute;left:70px;top:110px;width:1180px;height:664px;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(20,60,100,.18);border:1px solid #e3ecf2}}
.frame img{{width:100%;height:100%;display:block}}
.side{{position:absolute;left:1300px;top:104px;width:550px}}
.num{{font-size:100px;font-weight:700;color:#43a4dc;line-height:1}}
.time{{font-family:'Geist Mono',monospace;font-size:21px;color:#6a8396;margin-top:10px}}
.k{{font-size:15px;letter-spacing:2.5px;text-transform:uppercase;color:#43a4dc;font-weight:600;margin-top:28px}}
.v{{font-size:21px;line-height:1.45;margin-top:8px}}
.vo{{font-size:25px;line-height:1.45;margin-top:8px;font-weight:500}}
.bot{{position:absolute;left:70px;top:806px;width:1780px;display:flex;gap:50px}}
.note{{display:inline-block;margin-top:12px;padding:8px 14px;border-radius:8px;background:#e8f2f9;color:#2f6f97;font-size:18px}}
.foot{{position:absolute;left:70px;right:70px;bottom:28px;font-size:15px;letter-spacing:1px;color:#8a97a3;display:flex;justify-content:space-between;border-top:1px solid #e3ecf2;padding-top:12px}}
table{{border-collapse:collapse;width:100%;font-size:21px}}
td,th{{padding:8px 14px;border-bottom:1px solid #e3ecf2;text-align:left}}
th{{font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#43a4dc}}
.sw{{width:150px;height:110px;border-radius:12px}}
"""
def hdr(title, right): return f'<div class="hdr"><div class="t"><img src="build/icon_color.png">{title}</div><div class="r">{right}</div></div>'
def foot(n): return f'<div class="foot"><span>TIGERGRAPH.COM | AGENTIC AI · SCRIPT 3 · STORYBOARD v2</span><span>{n}</span></div>'

pages = []
# cover: matches the brand guideline cover (TG Blue field, light wordmark-style title, rule + date, white logo)
pages.append(f'''<div class="pg" style="background:#43a4dc;color:#fff">
<div style="position:absolute;left:110px;top:250px"><div style="font-size:150px;font-weight:300;letter-spacing:-2px;line-height:1">TigerGraph</div>
<div style="font-size:78px;font-weight:300;margin-top:26px;line-height:1.1">Agentic AI: Showing the<br>evidence behind a decision</div>
<div style="font-size:34px;font-weight:500;margin-top:40px;opacity:.95">Storyboard · frame by frame</div></div>
<div style="position:absolute;left:110px;top:870px;width:1000px;border-bottom:2px solid rgba(255,255,255,.9);padding-bottom:12px;font-size:26px">
Explainer video · Script 3 · 16:9 1920×1080 · approx. {tc(total)} · {datetime.date.today():%B %Y}</div>
<img src="build/logo_white.png" style="position:absolute;right:90px;bottom:70px;height:64px"></div>''')

pages.append(f'''<div class="pg">{hdr("Look &amp; feel", "Storyboard v2")}
<div style="position:absolute;left:70px;top:130px;width:860px">
<div class="k" style="margin-top:0">Visual direction</div><div class="v">Clean white stage taken from tigergraph.com: soft TG Blue gradient panels, white product-style cards with line-icon tiles, thin glowing connectors and a subtle dot texture. The graph is the hero and lights up step by step.</div>
<div class="k">Making it dynamic</div><div class="v">Every scene moves in 3D: tilted UI panels, a graph plane the camera dollies and flies along, cards that spring out toward camera, light pulses racing along edges, ripples, stamps and kinetic type. Depth comes from out-of-focus foreground cards and rack-focus. Transitions are match-cuts through UI elements (card flips, zoom-throughs, whip-pans), never plain cuts.</div>
<div class="k">Audio</div><div class="v">AI voiceover (samples shared for approval first), premium licensed tech/ambient music, and UI sound design on every hit: clicks, ticks, whooshes, pulses, stamps.</div>
<div class="k">Product demo</div><div class="v">Scenes 06–11 will use the client's demo recording when it arrives, framed in this UI. The frames here show the intended layout.</div></div>
<div style="position:absolute;left:1010px;top:130px;width:840px">
<div class="k" style="margin-top:0">Brand colours</div>
<div style="margin-top:14px;display:flex;gap:18px">{"".join(f'<div><div class="sw" style="background:{c}"></div><div class="v" style="font-size:19px">{n}<br><span style="font-family:Geist Mono;font-size:16px;color:#6a8396">{c.upper()}</span></div></div>' for c, n in [("#43a4dc","TG Blue"),("#ec6408","TG Orange"),("#000000","Black")])}
<div><div class="sw" style="background:linear-gradient(90deg,#22b573 50%,#f2a516 50%);width:100px"></div><div class="v" style="font-size:17px;color:#6a8396">Status only:<br>tick / gap flag</div></div></div>
<div class="k">Typography · Urbane</div><div class="v"><span style="font-weight:700;font-size:44px">Bold</span> headlines · <span style="font-weight:500;font-size:34px">Medium</span> titles · <span style="font-weight:300;font-size:34px">Light</span> body</div>
<div class="k">Logo &amp; icons</div>
<div style="display:flex;gap:24px;align-items:center;margin-top:14px"><img src="build/logo_color.png" style="height:56px"><div style="background:#000;border-radius:10px;padding:18px 22px"><img src="build/logo_white.png" style="height:40px;display:block"></div></div>
<div class="v" style="font-size:18px;color:#6a8396;margin-top:10px">Full-colour logo on white, white logo on dark, clear space kept. Icons follow the guideline: single-weight line icons in TG Blue + Black.</div></div>
{foot(2)}</div>''')

rows = "".join(f'<tr><td style="font-family:Geist Mono">{s["n"]:02d}</td><td style="font-family:Geist Mono">{tc(s["start"])}</td><td style="font-family:Geist Mono">{s["dur"]:.0f}s</td><td>{e(s["sup"])}</td></tr>' for s in S)
pages.append(f'''<div class="pg">{hdr("Scene list", f"Approx. {tc(total)} · {len(S)} scenes")}
<div style="position:absolute;left:70px;top:110px;width:1780px"><table><tr><th>#</th><th>In</th><th>Length</th><th>Beat</th></tr>{rows}</table></div>
{foot(3)}</div>''')

for i, s in enumerate(S):
    note = '<div class="note">Client demo recording will be placed here, framed in this UI</div>' if s["n"] in DEMO else ""
    pages.append(f'''<div class="pg">{hdr(f"Scene {s['n']:02d}", f"{tc(s['start'])} – {tc(s['start']+s['dur'])}")}
<div class="frame"><img src="build/frames/f{s["n"]:02d}.png"></div>
<div class="side"><div class="num">{s["n"]:02d}</div><div class="time">{tc(s["start"])} – {tc(s["start"]+s["dur"])} · {s["dur"]:.0f}s</div>
<div class="k">Voiceover</div><div class="vo">{e(s["vo"])}</div>
<div class="k">On-screen text</div><div class="v">{e(s["sup"])}</div></div>
<div class="bot"><div style="flex:1"><div class="k" style="margin-top:0">Visual</div><div class="v" style="font-size:20px">{e(s["visual"])}</div>{note}</div>
<div style="flex:1.25"><div class="k" style="margin-top:0">Animation / motion</div><div class="v" style="font-size:20px">{e(s["motion"])}</div></div></div>
{foot(i+4)}</div>''')

open(os.path.join(H, "..", "storyboard_v2.html"), "w").write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(pages)}</body></html>')
print(len(pages), "pages")
