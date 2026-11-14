"""Builds storyboard.html (one 16:9 page per scene + cover, style and notes pages). shoot_pdf.js prints it to PDF."""
import json, os, html
H = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(H, "scenes.json")))
e = html.escape
def tc(s): return f"{int(s//60)}:{int(s%60):02d}"
total = S[-1]["start"] + S[-1]["dur"]

css = """
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;700&family=Geist+Mono:wght@400;500&display=block');
@page{size:1920px 1080px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Geist,sans-serif;color:#0d1620;background:#fff}
.pg{width:1920px;height:1080px;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.dark{background:#04070d;color:#eaf4fb}
.hdr{position:absolute;left:70px;right:70px;top:40px;display:flex;justify-content:space-between;align-items:center;font-size:20px;color:#5b6b78}
.hdr b{color:#ec6408;font-weight:600}
.frame{position:absolute;left:70px;top:100px;width:1180px;height:664px;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.25)}
.frame img{width:100%;height:100%;display:block}
.side{position:absolute;left:1300px;top:100px;width:550px}
.num{font-size:96px;font-weight:700;color:#43a4dc;line-height:1}
.time{font-family:'Geist Mono',monospace;font-size:22px;color:#5b6b78;margin-top:10px}
.k{font-size:15px;letter-spacing:2.5px;text-transform:uppercase;color:#43a4dc;font-weight:600;margin-top:30px}
.v{font-size:22px;line-height:1.42;margin-top:8px}
.vo{font-size:25px;line-height:1.45;margin-top:8px;font-weight:500}
.bot{position:absolute;left:70px;top:800px;width:1180px}
.flag{display:inline-block;margin-top:14px;padding:8px 14px;border-radius:8px;background:#fff4dd;color:#8a5a00;font-size:18px;font-family:'Geist Mono',monospace}
.foot{position:absolute;left:70px;right:70px;bottom:30px;font-size:16px;color:#8a97a3;display:flex;justify-content:space-between}
table{border-collapse:collapse;width:100%;font-size:19px}
td,th{padding:7px 12px;border-bottom:1px solid #e3e9ee;text-align:left;vertical-align:top}
th{font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#43a4dc}
.sw{display:inline-block;width:150px;height:110px;border-radius:12px;margin-right:16px}
"""
pages = []
pages.append(f'''<div class="pg dark"><img src="frames/f09.png" style="position:absolute;inset:0;width:100%;opacity:.45;filter:blur(3px)"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(4,7,13,.95) 35%,rgba(4,7,13,.3))"></div>
<img src="logo_white.png" style="position:absolute;left:120px;top:100px;height:70px">
<div style="position:absolute;left:120px;top:380px"><div style="font-size:24px;letter-spacing:4px;color:#43a4dc;font-weight:600">STORYBOARD · FRAME BY FRAME · v1</div>
<div style="font-size:96px;font-weight:700;margin-top:20px;letter-spacing:-2px;line-height:1.05">Agentic AI: Showing the<br>evidence behind a decision</div>
<div style="font-size:32px;margin-top:30px;color:#bcd3e3">Explainer video · Script 3 · 16:9, 1920×1080 · approx. {tc(total)} · {len(S)} scenes</div></div>
<div style="position:absolute;left:120px;bottom:80px;font-size:20px;color:#7d93a3">Draft for client review · {__import__("datetime").date.today():%d %b %Y}</div></div>''')

pages.append(f'''<div class="pg"><div class="hdr"><span><b>TigerGraph</b> · Storyboard v1</span><span>Look &amp; feel</span></div>
<div style="position:absolute;left:70px;top:110px;width:860px">
<div style="font-size:54px;font-weight:700;letter-spacing:-1px">Look &amp; feel</div>
<div class="k">Visual direction</div><div class="v">Dark, premium SaaS look in the style of the benchmark: deep navy/black stage, soft TG Blue light blooms, frosted-glass UI panels tilted in 3D space, product-style screens instead of characters. The graph itself is the hero: glowing nodes and connectors that light up step by step.</div>
<div class="k">Motion language</div><div class="v">Smooth eased camera moves (push-ins, parallax tilts, dolly along the graph), glass panels sliding/expanding, light pulses travelling along edges, kinetic typography for key lines, crisp UI micro-interactions (hover, click ripple, ticks). Transitions are match-cuts through UI elements rather than hard cuts.</div>
<div class="k">Supers (on-screen text)</div><div class="v">Lower-left lower-third with TG Orange accent bar, Geist Medium. Every super from the script is placed as written.</div>
<div class="k">Audio</div><div class="v">AI voiceover (samples sent for approval before final), premium licensed background music (modern tech / ambient pulse), UI SFX for clicks, ticks, whooshes, data pulses.</div></div>
<div style="position:absolute;left:1010px;top:130px;width:840px">
<div class="k" style="margin-top:0">Brand colours (from guideline)</div>
<div style="margin-top:14px;display:flex"><div><div class="sw" style="background:#43a4dc"></div><div class="v">TG Blue<br><span style="font-family:Geist Mono;font-size:17px">#43A4DC</span></div></div>
<div><div class="sw" style="background:#ec6408"></div><div class="v">TG Orange<br><span style="font-family:Geist Mono;font-size:17px">#EC6408</span></div></div>
<div><div class="sw" style="background:#000"></div><div class="v">Black<br><span style="font-family:Geist Mono;font-size:17px">#000000</span></div></div>
<div><div class="sw" style="background:linear-gradient(90deg,#3ccf8e 50%,#f5b83d 50%);width:110px"></div><div class="v" style="font-size:18px">Status only<br>tick / gap flag</div></div></div>
<div class="k">Typography</div><div class="v"><span style="font-weight:700;font-size:40px">Geist Bold</span> headlines · <span style="font-weight:500;font-size:30px">Medium</span> supers · <span style="font-weight:300;font-size:30px">Light</span> body<br><span style="font-size:18px;color:#5b6b78">Brand print font is Urbane. Geist (the brand's listed Office font) is used in these frames; we'll switch to Urbane in animation if a licence/font file is provided.</span></div>
<div class="k">Logo</div><div style="margin-top:12px;background:#04070d;border-radius:12px;padding:30px;display:inline-block"><img src="logo_white.png" style="height:60px;display:block"></div>
<div class="v" style="font-size:18px;color:#5b6b78;margin-top:10px">Alternate White logo on dark backgrounds, clear space = height of "e", never recoloured or distorted.</div></div>
<div class="foot"><span>TigerGraph · Script 3 storyboard</span><span>2</span></div></div>''')

rows = "".join(f'<tr><td style="font-family:Geist Mono">{s["n"]:02d}</td><td style="font-family:Geist Mono">{tc(s["start"])}</td><td style="font-family:Geist Mono">{s["dur"]:.0f}s</td><td>{e(s["sup"])}</td><td>{"DEMO" if s["demo"] else ""}</td></tr>' for s in S)
pages.append(f'''<div class="pg"><div class="hdr"><span><b>TigerGraph</b> · Storyboard v1</span><span>Scene list</span></div>
<div style="position:absolute;left:70px;top:100px;width:1780px"><div style="font-size:44px;font-weight:700;margin-bottom:14px">Scene list · approx. {tc(total)}</div>
<table><tr><th>#</th><th>In</th><th>Len</th><th>Super / beat</th><th>Note</th></tr>{rows}</table></div>
<div class="foot"><span>Timings are estimates from the script word count (~147 wpm) and will lock to the approved VO.</span><span>3</span></div></div>''')

for i, s in enumerate(S):
    flags = ""
    if s["demo"]: flags += '<div class="flag">DEMO: frame shows our animated mock-up; swap/blend with real product recording if supplied</div>'
    if "VERIFY" in s["visual"]: flags += '<div class="flag">VERIFY: client to approve any regulation named on screen</div>'
    vis = e(s["visual"].replace(" [DEMO: needs recording]", "").replace(" [VERIFY: client to approve any regulation named on screen.]", ""))
    pages.append(f'''<div class="pg"><div class="hdr"><span><b>TigerGraph</b> · Storyboard v1</span><span>Scene {s["n"]:02d} / {len(S)}</span></div>
<div class="frame"><img src="frames/f{s["n"]:02d}.png"></div>
<div class="side"><div class="num">{s["n"]:02d}</div><div class="time">{tc(s["start"])} – {tc(s["start"]+s["dur"])} · {s["dur"]:.0f}s</div>
<div class="k">Voiceover</div><div class="vo">{e(s["vo"])}</div>
<div class="k">Super</div><div class="v">{e(s["sup"])}</div></div>
<div class="bot"><div style="display:flex;gap:50px"><div style="flex:1"><div class="k" style="margin-top:0">Visual</div><div class="v" style="font-size:20px">{vis}</div></div>
<div style="flex:1.3"><div class="k" style="margin-top:0">Animation / motion</div><div class="v" style="font-size:20px">{e(s["motion"])}</div></div></div>{flags}</div>
<div class="foot"><span>TigerGraph · Script 3 storyboard</span><span>{i+4}</span></div></div>''')

pages.append(f'''<div class="pg"><div class="hdr"><span><b>TigerGraph</b> · Storyboard v1</span><span>Open points</span></div>
<div style="position:absolute;left:70px;top:110px;width:1400px"><div style="font-size:54px;font-weight:700">Open points for the client</div>
<ol style="font-size:28px;line-height:1.6;margin:30px 0 0 36px">
<li>Demo footage (scenes 06–11): is there a product screen recording of the evidence trail? If not, we animate the trail as shown here.</li>
<li>Scene 01 continuity: please share video 2's dashboard design (or footage) so the 2 a.m. dashboard matches.</li>
<li>Scene 17: confirm whether any regulation is named on screen (currently none).</li>
<li>The script notes say no proof number was found; no statistic is used on screen.</li>
<li>Font: Urbane font files/licence, or approve Geist for the animation.</li>
<li>End card: confirm final line (VO "AI predicts but Graph reveals the evidence." vs super "Regular models predict. TigerGraph proves.") and CTA links.</li>
</ol></div><div class="foot"><span>TigerGraph · Script 3 storyboard</span><span>{len(S)+4}</span></div></div>''')

open(os.path.join(H, "storyboard.html"), "w").write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(pages)}</body></html>')
print(len(pages), "pages")
