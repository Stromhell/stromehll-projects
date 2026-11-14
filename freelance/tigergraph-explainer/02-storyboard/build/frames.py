"""TigerGraph Script 3 storyboard v2: light (white) styleframes, Urbane font, brand line icons.
Each scene -> frames/fNN.html (1920x1080); shoot.js screenshots; pdf.py builds the PDF.
Brand: TG Blue #43a4dc, TG Orange #ec6408, Black. Look taken from tigergraph.com light sections
(white stage, soft blue gradient panels, white node cards with icon tiles, thin connectors).
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
BLUE, ORANGE, INK = "#43a4dc", "#ec6408", "#0d1620"
GREEN, AMBER = "#22b573", "#f2a516"   # functional status only (tick / gap flag)
F = "../../../fonts/"

CSS = f"""
@font-face{{font-family:Urbane;font-weight:200;src:url({F}Urbane-Extra-Light.woff2)}}
@font-face{{font-family:Urbane;font-weight:300;src:url({F}Urbane-Light.woff2)}}
@font-face{{font-family:Urbane;font-weight:500;src:url({F}Urbane-Medium.woff2)}}
@font-face{{font-family:Urbane;font-weight:600;src:url({F}Urbane-Demi-Bold.woff2)}}
@font-face{{font-family:Urbane;font-weight:700;src:url({F}Urbane-Bold.woff2)}}
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=block');
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:1920px;height:1080px;overflow:hidden}}
body{{font-family:Urbane,sans-serif;color:{INK};background:#fff;position:relative}}
.bg{{position:absolute;inset:0;background:
 radial-gradient(1000px 700px at 85% 10%,rgba(67,164,220,.20),transparent 70%),
 radial-gradient(900px 700px at 5% 100%,rgba(67,164,220,.14),transparent 70%),#fff}}
.dots{{position:absolute;inset:0;background-image:radial-gradient(rgba(67,164,220,.35) 1.4px,transparent 1.6px);background-size:36px 36px;
 mask-image:radial-gradient(circle at 70% 40%,#000 0%,transparent 65%)}}
.panel{{position:absolute;border-radius:32px;background:linear-gradient(135deg,#eef6fc 0%,#cfe5f4 45%,#93c6e8 100%);box-shadow:0 40px 90px rgba(30,90,140,.18)}}
.card{{position:absolute;border-radius:20px;background:#fff;border:1px solid #dce8f1;box-shadow:0 24px 60px rgba(20,60,100,.14)}}
.tilt{{transform:perspective(2400px) rotateX(14deg) rotateY(-16deg) rotateZ(2deg)}}
.tiltR{{transform:perspective(2400px) rotateX(10deg) rotateY(16deg) rotateZ(-2deg)}}
.plane{{transform:perspective(2600px) rotateX(16deg) rotateZ(-4deg) scale(1.06);transform-origin:50% 60%}}
.blurfg{{filter:blur(7px);opacity:.75}}
.mono{{font-family:'Geist Mono',monospace}}
.h1{{font-weight:700;letter-spacing:-1.5px;line-height:1.04}}
.pill{{display:inline-block;font-family:'Geist Mono',monospace;font-size:19px;letter-spacing:2px;text-transform:uppercase;
 padding:8px 16px;border-radius:8px;background:#e8f2f9;color:#3d7fa8}}
.lbl{{font-size:18px;letter-spacing:3px;text-transform:uppercase;color:{BLUE};font-weight:600}}
.btn{{display:inline-block;padding:18px 40px;border-radius:12px;font-size:28px;font-weight:600}}
.btn.o{{background:{ORANGE};color:#fff;box-shadow:0 14px 34px rgba(236,100,8,.35)}}
.btn.g{{border:1.5px solid #c7d6e1;color:{INK};background:#fff}}
.node{{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:16px;padding:14px 24px 14px 14px;border-radius:16px;
 font-size:27px;font-weight:600;white-space:nowrap;background:#fff;border:1.5px solid #d6e4ee;box-shadow:0 16px 40px rgba(20,60,100,.16)}}
.node .ic{{width:52px;height:52px;border-radius:12px;background:#eaf3fa;display:grid;place-items:center}}
.node small{{display:block;font-family:'Geist Mono',monospace;font-size:16px;color:#6a8396;margin-top:3px;font-weight:400}}
.node.on{{border-color:{BLUE};box-shadow:0 0 0 6px rgba(67,164,220,.15),0 18px 44px rgba(67,164,220,.35)}}
.node.o{{border-color:{ORANGE};box-shadow:0 0 0 6px rgba(236,100,8,.12),0 18px 44px rgba(236,100,8,.28)}}
.node.o .ic{{background:#fdeee3}}
.node.dim{{opacity:.45;box-shadow:0 8px 20px rgba(20,60,100,.06)}}
.tag{{display:inline-block;font-family:'Geist Mono',monospace;font-size:17px;padding:6px 12px;border-radius:8px;background:#e8f2f9;color:#2f6f97;margin-right:8px}}
.cursor{{position:absolute;width:46px;height:46px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.25))}}
.step{{position:absolute;left:110px;top:96px;display:flex;align-items:center;gap:22px}}
.step .n{{width:78px;height:78px;border-radius:50%;display:grid;place-items:center;font-size:40px;font-weight:700;background:{BLUE};color:#fff;box-shadow:0 14px 34px rgba(67,164,220,.5)}}
.step .t{{font-size:44px;font-weight:700}}
.ring{{position:absolute;border-radius:50%;border:2px solid rgba(67,164,220,.35);transform:translate(-50%,-50%)}}
.streak{{position:absolute;height:5px;border-radius:3px;background:linear-gradient(90deg,rgba(67,164,220,0),{BLUE});box-shadow:0 0 18px {BLUE}}}
"""

# ---- brand-style line icons (24x24, 2px round strokes, black + TG Blue accent) ----
P = {
 "alert": f'<path d="M12 3l9.5 17h-19z" stroke="{ORANGE}"/><path d="M12 10v4M12 17.5v.5"/>',
 "api": f'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5" stroke="{BLUE}"/>',
 "db": f'<ellipse cx="12" cy="5.5" rx="8" ry="2.8"/><path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13"/><path d="M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" stroke="{BLUE}"/>',
 "gear": f'<circle cx="12" cy="12" r="3.2" stroke="{BLUE}"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
 "cart": f'<path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9" cy="19" r="1.5" stroke="{BLUE}"/><circle cx="17" cy="19" r="1.5" stroke="{BLUE}"/>',
 "refund": f'<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M12 8v8M9.8 10.2c0-1 1-1.7 2.2-1.7s2.2.7 2.2 1.7-1 1.4-2.2 1.6-2.2.7-2.2 1.7 1 1.7 2.2 1.7 2.2-.7 2.2-1.7" stroke="{BLUE}"/>',
 "users": f'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2" stroke="{BLUE}"/>',
 "shield": f'<path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke="{BLUE}"/>',
 "flag": f'<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5" stroke="{AMBER}"/>',
 "person": f'<circle cx="12" cy="7.5" r="4"/><path d="M4 21c.8-4.4 4-7 8-7s7.2 2.6 8 7" stroke="{BLUE}"/>',
 "doc": f'<path d="M6 2.5h8l4 4v15H6z"/><path d="M14 2.5v4h4M9 12h6M9 16h6" stroke="{BLUE}"/>',
 "search": f'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5" stroke="{BLUE}"/>',
 "bank": f'<path d="M3 9.5L12 4l9 5.5z"/><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8" stroke="{BLUE}"/><path d="M3 21h18M4 18.5h16"/>',
 "hospital": f'<path d="M4 21V7h16v14"/><path d="M12 9.5v5M9.5 12h5" stroke="{BLUE}"/><path d="M2.5 21h19M10 21v-3.5h4V21M8 3.5h8V7H8z"/>',
 "gov": f'<path d="M4 21h16M5 18.5h14M6.5 18.5v-7M10 18.5v-7M14 18.5v-7M17.5 18.5v-7M4.5 11.5h15"/><path d="M6 11.5a6 6 0 0 1 12 0M12 5.5V2.5M12 2.5h3v1.6h-3" stroke="{BLUE}"/>',
 "calendar": f'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="{BLUE}"/>',
 "check": f'<path d="M5 12.5l4.5 4.5L19 7.5" stroke="{GREEN}"/>',
 "lock": f'<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="{BLUE}"/>',
 "ban": f'<circle cx="12" cy="12" r="9" stroke="{ORANGE}"/><path d="M5.6 5.6l12.8 12.8" stroke="{ORANGE}"/>',
 "bolt": f'<path d="M13 2.5L4.5 13.5H12L11 21.5l8.5-11H12z" stroke="{BLUE}"/>',
}
def icon(name, size=30, sw=2):
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{INK}" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round">{P[name]}</svg>')

def cursor(x, y):
    return (f'<svg class="cursor" style="left:{x}px;top:{y}px" viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.4L20 11z" '
            f'fill="{INK}" stroke="#fff" stroke-width="1.4"/></svg>')
def logo(style, kind="color"):
    return f'<img src="../logo_{kind}.png" style="position:absolute;{style}">'

def edges(pairs, hot=None, dim=None, w=3.5, pulse=True):
    """pairs of ((x1,y1),(x2,y2)); hot = indices drawn orange; dim = faint."""
    hot, dim = hot or [], dim or []
    out = ['<svg style="position:absolute;inset:0;overflow:visible" width="1920" height="1080"><defs>'
           '<filter id="gl" filterUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><feGaussianBlur stdDeviation="4" result="b"/>'
           '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>']
    for i, ((x1, y1), (x2, y2)) in enumerate(pairs):
        mx = (x1 + x2) / 2
        d = f"M{x1},{y1} C{mx},{y1} {mx},{y2} {x2},{y2}"
        if i in dim:
            out.append(f'<path d="{d}" stroke="#c9d8e3" stroke-width="2.5" fill="none" stroke-dasharray="2 8" stroke-linecap="round"/>')
            continue
        c = ORANGE if i in hot else BLUE
        out.append(f'<path d="{d}" stroke="{c}" stroke-width="{w}" fill="none" filter="url(#gl)"/>')
        if pulse:  # travelling light pulse ~65% along the edge
            t = .65; px = (1-t)**3*x1 + 3*(1-t)**2*t*mx + 3*(1-t)*t*t*mx + t**3*x2
            py = (1-t)**3*y1 + 3*(1-t)**2*t*y1 + 3*(1-t)*t*t*y2 + t**3*y2
            out.append(f'<circle cx="{px:.0f}" cy="{py:.0f}" r="7" fill="#fff" stroke="{c}" stroke-width="3" filter="url(#gl)"/>')
    out.append("</svg>")
    return "".join(out)

def node(x, y, text, ic, sub="", cls=""):
    s = f"<small>{sub}</small>" if sub else ""
    return f'<div class="node {cls}" style="left:{x}px;top:{y}px"><div class="ic">{icon(ic, 30)}</div><div>{text}{s}</div></div>'

def bokeh(items):
    """Out-of-focus foreground/background cards for depth."""
    return "".join(f'<div class="card blurfg" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({r}deg)"></div>' for x, y, w, h, r in items)

def dashboard(blur=False):
    bars = "".join(f'<div style="flex:1;height:{h}%;border-radius:5px;background:{ORANGE if h > 85 else BLUE};opacity:{1 if h > 85 else .8}"></div>'
                   for h in [28,36,33,44,40,52,47,58,55,90,96,92,97,99])
    st = "filter:blur(5px);opacity:.5;" if blur else ""
    tiles = "".join(f'<div class="card" style="position:relative;flex:1;height:150px;padding:22px;box-shadow:none"><div class="lbl" style="font-size:14px;color:#6a8396">{a}</div>'
                    f'<div style="font-size:44px;font-weight:700;margin-top:14px;color:{c}">{b}</div></div>'
                    for a, b, c in [("Error rate", "4.8%", ORANGE), ("Requests / s", "12.4k", INK), ("Services hit", "3", INK)])
    return f'''<div class="panel tilt" style="left:150px;top:110px;width:1500px;height:860px;padding:36px;{st}">
 <div class="card" style="position:relative;height:100%;padding:34px;box-shadow:none">
 <div style="display:flex;justify-content:space-between;align-items:center">
  <div style="display:flex;gap:16px;align-items:center"><img src="../icon_color.png" style="height:38px"><span style="font-size:28px;font-weight:600">Ops Console · Production</span></div>
  <span class="mono" style="font-size:34px;font-weight:500">02:06 AM</span></div>
 <div style="display:flex;gap:24px;margin-top:28px">
  <div class="card" style="position:relative;flex:1.5;height:330px;padding:24px;box-shadow:none"><div class="lbl" style="font-size:15px">Payments API · p99 latency</div>
   <div style="display:flex;align-items:flex-end;gap:9px;height:230px;margin-top:22px">{bars}</div></div>
  <div class="card" style="position:relative;flex:1;height:330px;padding:26px;box-shadow:none;border-color:#f6c9a8;background:#fff8f3">
   <div style="display:flex;gap:12px;align-items:center">{icon("alert", 34)}<span class="lbl" style="color:{ORANGE};font-size:16px">Active alert · SEV-1</span></div>
   <div style="font-size:36px;font-weight:700;margin-top:22px">Checkout slowdown</div>
   <div class="mono" style="font-size:19px;color:#6a8396;margin-top:14px">started 02:04 · us-east</div></div></div>
 <div style="display:flex;gap:24px;margin-top:24px">{tiles}</div></div></div>'''

def approval(left, top, conf=False, scale=1.0, rot=""):
    c = (f'<div style="margin-top:26px;display:flex;align-items:baseline;gap:18px"><span style="font-size:26px;color:#6a8396">Confidence</span>'
         f'<span style="font-size:96px;font-weight:700;color:{BLUE}">92%</span></div>') if conf else ""
    return f'''<div class="card" style="left:{left}px;top:{top}px;width:780px;padding:40px;transform:scale({scale}) {rot};transform-origin:top left;
 border-color:{BLUE};box-shadow:0 0 0 8px rgba(67,164,220,.12),0 40px 90px rgba(20,60,100,.28)">
 <div style="display:flex;gap:12px;align-items:center">{icon("bolt", 30)}<span class="lbl">AI agent · proposed action</span></div>
 <div style="font-size:48px;font-weight:700;margin-top:16px">Roll back config change</div>{c}
 <div style="margin-top:34px;display:flex;gap:18px"><span class="btn o">Approve</span><span class="btn g">Reject</span></div></div>'''

# ---------------------------------------------------------------- scenes
S = []
def scene(vo, sup, visual, motion, body, demo=False):
    S.append(dict(vo=vo, sup=sup, visual=visual, motion=motion, body=body, demo=demo))

# 01 hook
scene("If you're a developer, I've got a question for you… It's 2 a.m and your AI agent wants to roll back a change in production. Do you click approve?",
 "02:06 · Approve rollback?",
 "Ops console in TigerGraph's product style (white UI on a blue gradient panel), 2:06 a.m. Latency spikes orange. The agent's plan pops up in an approval box: \"Roll back config change.\" Cursor hovers over Approve.",
 "Open on an extreme close-up of the clock flipping 02:05 → 02:06, whip-pull back to reveal the tilted console swinging into place; latency bars shoot up and turn orange; the approval card springs forward out of the screen toward camera (overshoot + soft shadow); cursor glides in and hovers, Approve button breathes.",
 '<div class="dots"></div>' + dashboard() + approval(820, 420, rot="rotate(-3deg)") + cursor(1060, 690) +
 bokeh([(1580, 760, 360, 220, 8), (60, 40, 260, 160, -6)]))

# 02 confidence
scene("Most agents give you an answer and a \"confidence score\". But confidence isn't evidence. You can't audit a percentage.",
 "Confidence ≠ evidence",
 "Close-up: the approval box shows only an answer and \"Confidence: 92%\". The 92% is hollow: nothing behind it.",
 "Camera crashes into the card; 92% counts up 0 → 92 with a ticking SFX; on \"isn't evidence\" a magnifier sweeps over the number and finds nothing (empty dashed box), the % cracks and drops out of frame.",
 '<div class="dots"></div>' + approval(170, 170, conf=True, scale=1.3, rot="rotate(-2deg)") +
 f'<div class="card tiltR" style="left:1240px;top:300px;width:520px;height:440px;border:3px dashed #c9d8e3;background:rgba(255,255,255,.6);box-shadow:none">'
 f'<div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);text-align:center">{icon("search", 120, 1.6)}'
 '<div class="mono" style="font-size:22px;color:#6a8396;margin-top:16px">evidence: none found</div></div></div>' +
 f'<div style="position:absolute;left:1085px;top:420px;font-size:150px;font-weight:300;color:{ORANGE}">≠</div>')

# 03 title
scene("(music sting, no VO)", "Can You Trust Your AI Agent with Multi-hop Decision-making Tasks?",
 "Title card on white with the brand node texture.",
 "Nodes fly in from depth and lock into a network behind the text; the title builds word by word with a slight 3D rotate-in; \"Multi-hop\" lights TG Blue as a light pulse hops across three nodes.",
 '<div class="dots"></div>' + edges([((1250,200),(1480,330)),((1480,330),(1700,220)),((1480,330),(1620,520)),((1620,520),(1820,640))], dim=[3]) +
 "".join(f'<div style="position:absolute;left:{x-16}px;top:{y-16}px;width:32px;height:32px;border-radius:50%;background:#fff;border:4px solid {c};box-shadow:0 0 22px {c}"></div>'
         for x, y, c in [(1250,200,BLUE),(1480,330,BLUE),(1700,220,BLUE),(1620,520,ORANGE),(1820,640,"#c9d8e3")]) +
 logo("left:110px;top:90px;height:64px") +
 f'<div style="position:absolute;left:110px;top:360px;width:1480px"><span class="pill">Agentic AI · Part 3</span>'
 f'<div class="h1" style="font-size:112px;margin-top:30px">Can You Trust Your AI Agent with <span style="color:{BLUE}">Multi-hop</span> Decision-making Tasks?</div></div>')

# 04 black box vs glass box
gb = edges([((1210,470),(1350,400)),((1350,400),(1490,490)),((1490,490),(1620,410)),((1350,400),(1460,600))])
for x, y in [(1210,470),(1350,400),(1490,490),(1620,410),(1460,600)]:
    gb += f'<div style="position:absolute;left:{x-15}px;top:{y-15}px;width:30px;height:30px;border-radius:50%;background:#fff;border:4px solid {BLUE};box-shadow:0 0 20px {BLUE}"></div>'
scene("So what does it take for an agent to show its evidence? A black box gives you an answer, but a glass box gives you the answer AND the path behind it: which facts it used, how they connect, which rules it checked, and in what order.",
 "Black box: answer + score · Glass box: answer + path",
 "Two cubes face off in 3D. Left: a solid black box that only outputs an answer and a score. Right: a clear glass box with the same answer plus a visible path of linked facts inside.",
 "Both cubes drop in and slowly rotate; the black box stays opaque and spits out a score tag; the glass box turns transparent and the path inside lights node by node on \"facts… connect… rules… order\", each with a soft click SFX. Camera orbits slightly between them.",
 '<div class="dots"></div>' +
 f'<div style="position:absolute;left:200px;top:230px;width:600px;height:520px;border-radius:28px;background:linear-gradient(145deg,#2a333c,#000);transform:perspective(2000px) rotateY(18deg) rotateX(6deg);box-shadow:0 50px 90px rgba(0,0,0,.35)">'
 '<div style="position:absolute;inset:0;display:grid;place-items:center;font-size:200px;font-weight:300;color:#3a4651">?</div></div>'
 f'<div class="card" style="left:300px;top:700px;width:480px;padding:24px 28px;transform:rotate(-3deg)"><div style="font-size:28px;font-weight:600">Roll back config change</div><div class="mono" style="font-size:20px;color:#6a8396;margin-top:6px">score 0.92</div></div>'
 f'<div style="position:absolute;left:1100px;top:230px;width:640px;height:520px;border-radius:28px;background:linear-gradient(145deg,rgba(255,255,255,.75),rgba(207,229,244,.55));border:2px solid {BLUE};transform:perspective(2000px) rotateY(-18deg) rotateX(6deg);box-shadow:0 50px 90px rgba(30,90,140,.25)"></div>'
 + gb + f'<div class="card" style="left:1180px;top:700px;width:560px;padding:24px 28px;transform:rotate(2deg);border-color:{BLUE}"><div style="font-size:28px;font-weight:600">Roll back config change</div>'
 '<div style="margin-top:10px"><span class="tag">facts</span><span class="tag">links</span><span class="tag">rules</span><span class="tag">order</span></div></div>'
 '<div style="position:absolute;left:300px;top:150px" class="lbl">Black box</div><div style="position:absolute;left:1180px;top:150px" class="lbl">Glass box</div>')

# 05 predicts / proves
scene("The model predicts. And the graph proves.", "The model predicts. The graph proves.",
 "Kinetic typography: the line resolves on screen.",
 "\"The model predicts.\" types on in grey, slightly out of focus; camera racks focus down to \"The graph proves.\" whose letters assemble from flying graph nodes; an orange underline whips across; a brief light flare passes over \"graph\".",
 '<div class="dots"></div>' + edges([((240,860),(560,760)),((560,760),(900,880)),((1300,190),(1650,300))], pulse=False) +
 '<div style="position:absolute;left:0;right:0;top:330px;text-align:center">'
 '<div class="h1" style="font-size:110px;color:#9db0bf;font-weight:300;filter:blur(1.5px)">The model predicts.</div>'
 f'<div class="h1" style="font-size:150px;margin-top:22px">The <span style="color:{BLUE}">graph</span> proves.</div>'
 f'<div style="width:620px;height:10px;background:{ORANGE};margin:30px auto 0;border-radius:5px;transform:skewX(-20deg)"></div></div>')

# 06 open the trail
rows = "".join(f'<div style="display:flex;align-items:center;gap:16px;margin-top:18px;opacity:{1-i*.12}"><div style="width:40px;height:40px;border-radius:50%;background:{BLUE if i==0 else "#e8f2f9"};color:{"#fff" if i==0 else "#3d7fa8"};display:grid;place-items:center;font-size:20px;font-weight:700">{i+1}</div>'
               f'<div style="flex:1;height:14px;border-radius:7px;background:#e8f2f9"></div></div>' for i in range(5))
scene("Let's open the trail behind that rollback with this readiness checklist:", "Evidence trail",
 "The approval box unfolds into an evidence trail panel (animated product UI).",
 "The approval card flips 180° in 3D; its back unfolds downward like an accordion into the evidence trail; the console behind falls away into blur; a scan line sweeps the panel and step 1 starts glowing.",
 '<div class="dots"></div>' + dashboard(blur=True) +
 approval(560, 90, rot="perspective(2000px) rotateX(-18deg)") +
 f'<div class="card" style="left:560px;top:520px;width:780px;height:470px;padding:36px;border-color:{BLUE};transform:perspective(2000px) rotateX(16deg);transform-origin:top">'
 f'<div style="display:flex;gap:12px;align-items:center">{icon("doc", 30)}<span class="lbl">Evidence trail</span></div>{rows}</div>'
 f'<div class="streak" style="left:540px;top:520px;width:820px"></div>', demo=True)

PT = {"alert": (330, 520), "api": (790, 520), "db": (1250, 520), "chg": (1250, 270), "chk": (1590, 330), "ref": (1590, 530), "prem": (1560, 740)}
def trail(level, extra_cls=None):
    extra_cls = extra_cls or {}
    e = [(PT["alert"], PT["api"]), (PT["api"], PT["db"])]
    if level >= 2: e.append((PT["chg"], PT["db"]))
    if level >= 3: e += [(PT["db"], PT["chk"]), (PT["db"], PT["ref"]), (PT["db"], PT["prem"])]
    dim = {1: [], 2: [0, 1], 3: [0, 1, 2]}.get(level, [0, 1, 2, 3, 5])
    hot = [5] if level == 3 else []
    h = edges(e, dim=dim, hot=hot)
    on = lambda k, lv: "on" if level == lv else ("dim" if level > lv else "")
    h += node(*PT["alert"], "Alert", "alert", "checkout slow · 02:04", "o" if level == 1 else "dim")
    h += node(*PT["api"], "Payments API", "api", "", on("api", 1))
    h += node(*PT["db"], "DB cluster", "db", "pg-pay-03", "on" if level in (1, 2, 3) else "dim")
    if level >= 2:
        h += node(*PT["chg"], "Config change #4471", "gear", "", on("chg", 2))
    if level >= 3:
        h += node(*PT["chk"], "Checkout", "cart", "", on("chk", 3)) + node(*PT["ref"], "Refunds", "refund", "", extra_cls.get("ref", on("ref", 3)))
        h += node(*PT["prem"], "12 premium accounts", "users", "SLA at risk", "o" if level == 3 else "dim")
    return h
def step(n, t): return f'<div class="step"><div class="n">{n}</div><div class="t">{t}</div></div>'
def stage(inner): return f'<div class="dots"></div><div class="panel plane" style="left:120px;top:210px;width:1700px;height:760px;opacity:.55"></div><div class="plane" style="position:absolute;inset:0">{inner}</div>'

scene("Step one: The alert traces to the Payments API, which depends on one database cluster.",
 "1 · Alert → Payments API → DB cluster",
 "Step 1 lights up: Alert → Payments API → Database cluster, on a tilted graph plane.",
 "Camera dolly-tracks left → right along the plane; the alert node pulses orange, a light pulse shoots along the edge to Payments API (whoosh), then on to the DB cluster; each node pops up out of the plane (scale 0.8 → 1 with overshoot).",
 stage(trail(1)) + step(1, "Trace the alert") + bokeh([(1600, 820, 340, 200, 6)]), demo=True)

scene("Step two: That cluster had a configuration change at 1:44 am, twenty minutes before the slowdown began. Every fact carries its source and its timestamp.",
 "2 · Config change, 1:44 a.m. · source + time on every fact",
 "Step 2: Config change #4471, applied 1:44 a.m., drops onto the cluster. A timestamp and source tag sit beside it; a timeline shows the 20-minute gap.",
 "Config node slams down from above with a dust-ring ripple; source + timestamp tags flip open like labels; a timeline scrubber races 01:44 → 02:04 under the graph and stamps \"+20 min\".",
 stage(trail(2) + '<div style="position:absolute;left:1430px;top:250px"><span class="tag">⏱ 01:44 AM</span><span class="tag">source: deploy-log</span></div>') +
 step(2, "Find the change") +
 f'<div class="card" style="left:300px;top:880px;width:1000px;padding:22px 30px"><div style="position:relative;height:6px;border-radius:3px;background:linear-gradient(90deg,{BLUE},{ORANGE})">'
 f'<div style="position:absolute;left:-8px;top:-9px;width:24px;height:24px;border-radius:50%;background:{BLUE}"></div><div style="position:absolute;right:-8px;top:-9px;width:24px;height:24px;border-radius:50%;background:{ORANGE}"></div></div>'
 '<div class="mono" style="display:flex;justify-content:space-between;font-size:20px;margin-top:16px;color:#4d6577"><span>01:44 change</span><span style="font-weight:500;color:#0d1620">+20 min</span><span>02:04 slowdown</span></div></div>', demo=True)

scene("Step three: The same cluster feeds checkout and refunds, and twelve premium customers are affected. Now that's an impact, not a guess.",
 "3 · Checkout, Refunds · 12 premium accounts",
 "Step 3: the path branches out to Checkout, Refunds and 12 premium accounts.",
 "Three branches burst out of the cluster like a shockwave (ring ripples); the camera pulls up to a top-down angle; the '12' counter rolls up on the premium node, which flares orange.",
 stage(trail(3)) + step(3, "Measure the impact") +
 "".join(f'<div class="ring" style="left:1250px;top:560px;width:{r}px;height:{r*.55:.0f}px;opacity:{o}"></div>' for r, o in [(260, .7), (420, .45), (600, .25)]), demo=True)

scene("Step four: Before acting, this agent checked your rollback policy, which lives in the graph alongside the data. The change is under an hour old. Premium customers are at risk. The rule allows it.",
 "4 · Policy checked ✓",
 "Step 4: a policy card plugs into the path: \"Auto-rollback allowed when the change is under 1 hour old and premium SLAs are at risk.\" A green tick.",
 "The policy card spins in from screen right and docks onto the graph like a puzzle piece; the two conditions tick one by one on the VO; a big green tick stamps with a satisfying click and a soft glow wave washes over the path.",
 stage(trail(4)) + step(4, "Check the policy") +
 f'<div class="card" style="left:580px;top:560px;width:860px;padding:34px;border-color:{GREEN};box-shadow:0 0 0 8px rgba(34,181,115,.12),0 40px 80px rgba(20,60,100,.25);transform:rotate(-2deg)">'
 f'<div style="display:flex;gap:12px;align-items:center">{icon("shield", 34)}<span class="lbl" style="color:{GREEN}">Policy · rollback-001</span></div>'
 '<div style="font-size:30px;font-weight:500;margin-top:14px;line-height:1.35">Auto-rollback allowed when the change is under 1 hour old and premium SLAs are at risk.</div>'
 f'<div style="margin-top:18px;display:flex;gap:30px;font-size:24px;font-weight:600"><span style="color:{GREEN}">✓ change age 22 min</span><span style="color:{GREEN}">✓ premium SLA at risk</span></div>'
 f'<div style="position:absolute;right:-36px;top:-36px;width:100px;height:100px;border-radius:50%;background:{GREEN};display:grid;place-items:center;box-shadow:0 14px 34px rgba(34,181,115,.5)">'
 '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div></div>', demo=True)

scene("And step five: the agent says what it doesn't know. It found no evidence on the refunds data, so it asked a human to check.",
 "5 · Gap flagged → human check",
 "Step 5: an amber flag on Refunds: \"No evidence on whether the change touched the refunds schema. Human check recommended.\"",
 "The Refunds node glitches/flickers; a dashed amber ring scans around it; the flag card unfolds from the node; a human avatar slides in and the handoff arrow draws from agent to human.",
 stage(trail(5, {"ref": ""}) + f'<div style="position:absolute;left:1430px;top:460px;width:330px;height:140px;border:3px dashed {AMBER};border-radius:26px"></div>') +
 step(5, "Flag the gap") +
 f'<div class="card" style="left:560px;top:640px;width:860px;padding:34px;border-color:{AMBER};box-shadow:0 0 0 8px rgba(242,165,22,.14),0 40px 80px rgba(20,60,100,.25);transform:rotate(1.5deg)">'
 f'<div style="display:flex;gap:12px;align-items:center">{icon("flag", 34)}<span class="lbl" style="color:#c27f00">Evidence gap</span></div>'
 '<div style="font-size:30px;font-weight:500;margin-top:14px;line-height:1.35">No evidence on whether the change touched the refunds schema.</div>'
 f'<div style="margin-top:18px;display:flex;gap:14px;align-items:center;font-size:26px;font-weight:700;color:#c27f00">{icon("person", 34)} Human check recommended</div></div>', demo=True)

# 12 approve + replay
mini = edges([((260,470),(450,470)),((450,470),(640,470)),((640,330),(640,470)),((640,470),(830,390)),((640,470),(830,560))], pulse=False)
for x, y in [(260,470),(450,470),(640,470),(640,330),(830,390),(830,560)]:
    mini += f'<div style="position:absolute;left:{x-14}px;top:{y-14}px;width:28px;height:28px;border-radius:50%;background:#fff;border:4px solid {BLUE}"></div>'
scene("Now you're not trusting a score. You're approving a decision you can read. And six months from now, when someone asks why, the same trail is still there to replay.",
 "Approve with evidence · Replay it later",
 "The full trail on one card; cursor clicks Approve and it locks as \"signed\". Then a calendar flips forward six months and an auditor replays the same trail, unchanged.",
 "Click: ripple burst + confirm chime, a lock icon snaps shut on the trail. Whip-pan right as calendar pages tear off in a flurry (NOV → MAY); the auditor's window swings in from depth and a play scrubber replays the trail, nodes re-lighting in order.",
 '<div class="dots"></div>' +
 f'<div class="card tilt" style="left:120px;top:220px;width:860px;height:640px"></div>' + mini +
 f'<div style="position:absolute;left:200px;top:690px;display:flex;align-items:center;gap:20px"><span class="btn o">Approve</span>{icon("lock", 40)}<span class="mono" style="font-size:20px;color:#4d6577">signed 02:07</span></div>' + cursor(320, 730) +
 f'<div class="ring" style="left:300px;top:720px;width:160px;height:160px;border-color:rgba(236,100,8,.5)"></div>' +
 "".join(f'<div class="card" style="left:{1000+i*26}px;top:{200-i*20}px;width:260px;height:300px;transform:rotate({-14+i*7}deg);opacity:{.35+i*.2}"><div style="position:absolute;inset:0;display:grid;place-items:center;font-size:90px;font-weight:700;color:#c9d8e3">{m}</div></div>' for i, m in enumerate(["NOV", "JAN", "MAR"])) +
 f'<div class="card tiltR" style="left:1120px;top:330px;width:700px;height:620px;padding:40px">'
 f'<div style="display:flex;gap:18px;align-items:center"><div class="card" style="position:relative;width:150px;padding:16px;text-align:center;box-shadow:none"><div class="lbl" style="color:{ORANGE}">May</div><div style="font-size:64px;font-weight:700">14</div></div>'
 '<div><span class="pill">Audit · replay</span><div style="font-size:32px;font-weight:600;margin-top:10px">Why did we roll back #4471?</div></div></div>'
 '<div style="margin-top:34px;height:260px;border-radius:16px;background:linear-gradient(135deg,#eef6fc,#b9dbf0);position:relative">'
 f'<div style="position:absolute;left:30px;right:30px;bottom:28px;height:8px;background:rgba(255,255,255,.8);border-radius:4px"><div style="width:62%;height:100%;background:{BLUE};border-radius:4px"></div></div>'
 f'<div style="position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:96px;height:96px;border-radius:50%;background:#fff;display:grid;place-items:center;box-shadow:0 10px 30px rgba(20,60,100,.25)"><svg width="40" height="40" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="{BLUE}"/></svg></div></div>'
 '<div class="mono" style="margin-top:20px;font-size:20px;color:#4d6577">trail unchanged · 5 steps · 7 facts · 1 policy</div></div>')

# 13 vector vs graph
vec = "".join(f'<div class="card" style="left:{x}px;top:{y}px;width:600px;padding:24px 28px;transform:rotate({r}deg)">{icon("doc", 28)}<span style="font-size:23px;color:#4d6577;margin-left:12px">"{t}"</span>'
              f'<span class="mono" style="float:right;font-size:22px;color:{BLUE};font-weight:500">{s}</span></div>'
              for x, y, r, t, s in [(110, 300, -4, "…rollback procedures for payment…", "0.87"), (190, 470, 3, "…configuration changes may cause…", "0.84"), (90, 640, -2, "…premium customer SLA terms…", "0.81")])
scene("You might ask, \"why does this need a graph?\" Because vector search can only tell you which passages looked similar to the question. It can't tell you why they matter to the decision.",
 "Similar ≠ explained",
 "Split: vector search shows three loose text chunks with similarity scores. Graph search shows the connected path.",
 "Left: chunks drop in, scores count up, then drift apart with no links (floaty, unanchored). Right: the demo path draws itself in one continuous stroke and settles firmly. A big '≠' slams in between with a bass hit.",
 '<div class="dots"></div><div style="position:absolute;left:110px;top:200px" class="lbl" ><span style="color:#6a8396">Vector search</span></div>' + vec +
 '<div style="position:absolute;left:1090px;top:200px" class="lbl">Graph search</div>' +
 '<div class="panel" style="left:1040px;top:260px;width:820px;height:600px;opacity:.6"></div>' +
 edges([((1150,560),(1330,460)),((1330,460),(1520,560)),((1520,360),(1520,560)),((1520,560),(1720,700))]) +
 node(1150, 560, "Alert", "alert") + node(1330, 460, "API", "api") + node(1520, 560, "DB", "db") + node(1520, 360, "Change", "gear") + node(1720, 700, "12 accts", "users", "", "o") +
 f'<div style="position:absolute;left:870px;top:420px;font-size:180px;font-weight:300;color:{ORANGE}">≠</div>')

# 14 labelled path
lab = [((250,560),(610,560),"DEPENDS_ON"),((610,560),(980,560),"RUNS_ON"),((980,290),(980,560),"CHANGED"),((980,560),(1380,400),"FEEDS"),((980,560),(1380,730),"SERVES"),((1380,400),(1720,560),"GOVERNED_BY")]
lbls = "".join(f'<div class="mono" style="position:absolute;left:{(a[0]+b[0])/2-75}px;top:{(a[1]+b[1])/2-46}px;font-size:18px;color:#2f6f97;background:#fff;padding:5px 12px;border-radius:8px;border:1.5px solid #bcd8ea">{t}</div>' for a, b, t in lab)
scene("In a graph search, the customers, systems, changes and rules are connected explicitly. So the path the agent followed is pretty clear. Nothing has to be reconstructed after the fact.",
 "The path is the explanation",
 "The path from the demo, now with every connection labelled (customers, systems, changes, rules).",
 "Low-angle camera glides along the tilted path like a fly-through; each relationship label flips up as the light pulse passes it; legend chips pop in at the end and the whole graph settles into a hero composition.",
 '<div class="dots"></div><div class="plane" style="position:absolute;inset:0;left:-120px;right:120px;top:-20px">' + edges([(a, b) for a, b, _ in lab], hot=[4]) +
 node(250, 560, "Alert", "alert") + node(610, 560, "Payments API", "api") + node(980, 560, "DB cluster", "db") + node(980, 290, "Change #4471", "gear") +
 node(1380, 400, "Checkout", "cart") + node(1380, 730, "Premium customer", "users", "", "o") + node(1720, 560, "Policy rollback-001", "shield", "", "on") + lbls + '</div>' +
 '<div style="position:absolute;left:110px;top:110px;display:flex;gap:14px">' + "".join(f'<span class="pill">{t}</span>' for t in ["customers", "systems", "changes", "rules"]) + '</div>')

# 15 guardrails
scene("Your policies sit in the graph too, as guardrails. So when an agent refuses to act, it can explain that as well.",
 "Guardrails with reasons",
 "Policy cards slot into the graph as guardrails; one blocks an agent action and shows the reason.",
 "Policy cards fly in and lock onto the graph rails with a magnetic snap; the agent's action arrow races toward the guardrail, hits it and bounces back with a shake; the 'Blocked' card expands and the reason types on.",
 '<div class="dots"></div>' + edges([((330,560),(760,560))], hot=[0]) +
 node(330, 560, "Agent action", "bolt", "delete customer data", "o") +
 f'<div style="position:absolute;left:760px;top:330px;width:16px;height:460px;border-radius:8px;background:linear-gradient({BLUE},#9fd0ee);box-shadow:0 0 30px {BLUE}"></div>' +
 node(768, 300, "Guardrail", "shield", "", "on") +
 f'<div class="card" style="left:900px;top:380px;width:860px;padding:36px;border-color:{ORANGE};box-shadow:0 0 0 8px rgba(236,100,8,.12),0 40px 80px rgba(20,60,100,.25);transform:rotate(-1.5deg)">'
 f'<div style="display:flex;gap:12px;align-items:center">{icon("ban", 34)}<span class="lbl" style="color:{ORANGE}">Blocked by policy · retention-007</span></div>'
 '<div style="font-size:32px;font-weight:500;margin-top:16px;line-height:1.35">Customer records under legal hold cannot be deleted. 3 of 40 records are on hold.</div></div>' +
 "".join(f'<div class="card" style="left:{x}px;top:{y}px;width:320px;padding:20px 24px;transform:rotate({r}deg);display:flex;gap:14px;align-items:center">{icon("shield", 30)}<div><div class="lbl" style="font-size:13px">Policy</div><div style="font-size:24px;font-weight:600">{t}</div></div></div>'
         for x, y, r, t in [(180, 800, -4, "rollback-001"), (560, 860, 3, "access-012"), (960, 820, -2, "pii-003")]) +
 '')

# 16 regulated industries (brand-style icons, no regulation named)
scene("And in regulated industries, explaining automated decisions is becoming a requirement, not a nice-to-have.",
 "Explainability: from best practice to requirement",
 "Montage of three regulated sectors drawn as TigerGraph-style line icons (black + TG Blue): a bank, a hospital, a government building. Each carries a small evidence-trail badge. No specific regulation is named.",
 "Icons draw on stroke by stroke (line-reveal) in quick succession with a camera slide across; small trail badges pop under each; the cards slide into a tilted row and a blue light sweep runs across all three.",
 '<div class="dots"></div>' +
 "".join(f'<div class="card" style="left:{170+i*540}px;top:{250+[0,-40,0][i]}px;width:480px;height:520px;transform:perspective(2000px) rotateY({[16,0,-16][i]}deg)">'
         f'<div style="position:absolute;left:0;right:0;top:80px;display:grid;place-items:center"><div style="width:240px;height:240px;border-radius:40px;background:#eaf3fa;display:grid;place-items:center">{icon(ic, 150, 1.5)}</div></div>'
         f'<div style="position:absolute;left:0;right:0;top:370px;text-align:center;font-size:40px;font-weight:700">{n}</div>'
         f'<div style="position:absolute;left:0;right:0;top:432px;text-align:center"><span class="tag">✓ decision explained</span></div></div>'
         for i, (ic, n) in enumerate([("bank", "Banking"), ("hospital", "Healthcare"), ("gov", "Government")])) +
 f'<div class="streak" style="left:170px;top:800px;width:1560px;opacity:.6"></div>')

CHECK = ["Shows the path", "Current context", "Policies built in", "Knows when to hand off", "Replayable"]
def checklist(done, allgreen=False):
    rows = ""
    for i, t in enumerate(CHECK):
        on = i < done or allgreen
        c = GREEN if allgreen else BLUE
        box = (f'<div style="width:66px;height:66px;border-radius:16px;background:{c if on else "#fff"};border:3px solid {c if on else "#c9d8e3"};display:grid;place-items:center">'
               + ('<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' if on else "") + '</div>')
        rows += (f'<div style="display:flex;align-items:center;gap:28px;margin-top:30px;opacity:{1 if on else .4};transform:translateX({0 if on else 40}px)">{box}'
                 f'<div style="font-size:48px;font-weight:600"><span class="mono" style="color:{BLUE};font-size:28px;margin-right:18px">0{i+1}</span>{t}</div></div>')
    return rows
scene("So before you trust an agent with multi-step decisions, run this checklist.",
 "Readiness checklist",
 "A five-item readiness checklist builds one line at a time.",
 "The card swings in from a 3D angle and flattens; each line slides in from the right with a stagger, its tick-box drawing itself and filling TG Blue as it's named; the camera slowly pushes in.",
 '<div class="dots"></div><div class="panel" style="left:380px;top:80px;width:1160px;height:920px;transform:rotate(-2deg)"></div>'
 f'<div class="card" style="left:440px;top:120px;width:1040px;height:840px;padding:60px"><span class="pill">Readiness checklist</span>{checklist(3)}</div>')

scene("If you can't tick all five, the agent isn't ready for production. But TigerGraph is built to tick them all.",
 "Ready for production?",
 "All five ticks turn green next to the TigerGraph logo.",
 "Ticks flip to green in a fast domino cascade with rising pitch SFX; the card slides left and tilts away; the TigerGraph logo builds on the right (tiger head draws on, wordmark wipes in) with a soft blue bloom.",
 '<div class="dots"></div>'
 f'<div class="card tilt" style="left:120px;top:110px;width:980px;height:860px;padding:60px"><span class="pill" style="background:#e3f6ec;color:#178a57">Ready for production?</span>{checklist(5, True)}</div>'
 '<div style="position:absolute;left:1180px;top:340px;width:680px;height:400px;background:radial-gradient(closest-side,rgba(67,164,220,.30),transparent)"></div>'
 + logo("left:1230px;top:490px;width:580px"))

scene("Regular models predict. TigerGraph proves.", "Regular models predict. TigerGraph proves.",
 "End card on white: logo, tagline, CTAs \"Request a demo\" and \"Start free\", tigergraph.com.",
 "Network texture drifts slowly behind; logo holds centre; tagline fades up word by word; CTA buttons rise with a soft bounce. Hold clean for the last 4-5 s.",
 '<div class="dots"></div>' + edges([((120,900),(420,800)),((420,800),(700,960)),((1300,140),(1580,260)),((1580,260),(1820,150))], dim=[0, 1, 2, 3]) +
 logo("left:50%;top:250px;width:620px;transform:translateX(-50%)") +
 '<div style="position:absolute;left:0;right:0;top:470px;text-align:center"><div class="h1" style="font-size:78px;font-weight:500">Regular models predict. <span style="color:#43a4dc;font-weight:700">TigerGraph proves.</span></div>'
 '<div style="margin-top:70px;display:flex;gap:30px;justify-content:center"><span class="btn o" style="font-size:34px">Request a demo</span><span class="btn g" style="font-size:34px">Start free</span></div>'
 '<div class="mono" style="margin-top:56px;font-size:24px;color:#4d6577">tigergraph.com</div></div>')

# ---------------------------------------------------------------- timing + write
def dur(vo):
    w = len(vo.replace("(music sting, no VO)", "").split())
    return max(3.5, round(w / 2.45 + 0.6, 1))  # ~147 wpm + breathing room

t = 0.0
meta = []
for i, s in enumerate(S, 1):
    d = dur(s["vo"]) if i != 3 else 4.0
    if i == len(S): d += 4.0  # clean end hold
    s.update(n=i, start=t, dur=d)
    t += d
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="bg"></div>{s["body"]}</body></html>')
    open(os.path.join(HERE, "frames", f"f{i:02d}.html"), "w").write(html)
    meta.append({k: s[k] for k in ("n", "start", "dur", "vo", "sup", "visual", "motion")})
json.dump(meta, open(os.path.join(HERE, "scenes.json"), "w"), indent=1, ensure_ascii=False)
print(len(S), "scenes, total", round(t, 1), "s")
