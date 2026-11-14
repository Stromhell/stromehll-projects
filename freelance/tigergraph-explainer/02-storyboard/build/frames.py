"""TigerGraph Script 3 storyboard: styleframe HTML generator.
Each scene -> frames/fNN.html (1920x1080). render.py screenshots them and builds the PDF.
Brand: TG Blue #43a4dc, TG Orange #ec6408, Black. Font: Geist (brand Office font; Urbane needs a licence).
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
BLUE, ORANGE = "#43a4dc", "#ec6408"
GREEN, AMBER = "#3ccf8e", "#f5b83d"   # functional status colours only (tick / gap flag)

CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;700&family=Geist+Mono:wght@400;500&display=block');
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:1920px;height:1080px;overflow:hidden}}
body{{font-family:Geist,sans-serif;color:#eaf4fb;background:#04070d;position:relative}}
.bg{{position:absolute;inset:0;background:
 radial-gradient(900px 600px at 20% 15%,rgba(67,164,220,.28),transparent 70%),
 radial-gradient(800px 700px at 85% 90%,rgba(67,164,220,.18),transparent 70%),
 linear-gradient(180deg,#050a14,#03060b)}}
.bg.warm{{background:
 radial-gradient(900px 600px at 80% 20%,rgba(236,100,8,.22),transparent 70%),
 radial-gradient(900px 700px at 15% 85%,rgba(67,164,220,.22),transparent 70%),
 linear-gradient(180deg,#060912,#03050a)}}
.grid{{position:absolute;inset:0;background-image:
 linear-gradient(rgba(67,164,220,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(67,164,220,.06) 1px,transparent 1px);
 background-size:80px 80px;mask-image:radial-gradient(circle at 50% 50%,#000 30%,transparent 80%)}}
.glass{{position:absolute;border-radius:22px;background:linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,.025));
 border:1px solid rgba(120,195,240,.28);box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 60px rgba(67,164,220,.12) inset;backdrop-filter:blur(14px)}}
.tilt{{transform:perspective(2200px) rotateX(10deg) rotateY(-12deg) rotateZ(1deg)}}
.tiltR{{transform:perspective(2200px) rotateX(8deg) rotateY(12deg) rotateZ(-1deg)}}
.mono{{font-family:'Geist Mono',monospace}}
.super{{position:absolute;left:120px;bottom:96px;font-size:44px;font-weight:500;letter-spacing:-.5px;
 padding:14px 26px;border-left:5px solid {ORANGE};background:linear-gradient(90deg,rgba(4,7,13,.85),rgba(4,7,13,0))}}
.h1{{font-weight:700;letter-spacing:-2px;line-height:1.02}}
.lbl{{font-size:20px;letter-spacing:3px;text-transform:uppercase;color:{BLUE};font-weight:500}}
.btn{{display:inline-block;padding:18px 40px;border-radius:14px;font-size:28px;font-weight:600}}
.btn.o{{background:{ORANGE};color:#fff;box-shadow:0 0 40px rgba(236,100,8,.55)}}
.btn.g{{border:1px solid rgba(255,255,255,.3);color:#cfe3f1}}
.node{{position:absolute;transform:translate(-50%,-50%);padding:18px 26px;border-radius:16px;font-size:26px;font-weight:500;white-space:nowrap;
 background:rgba(10,24,40,.85);border:1.5px solid {BLUE};box-shadow:0 0 30px rgba(67,164,220,.45)}}
.node.dim{{color:rgba(234,244,251,.38);background:#08121e;box-shadow:none;border-color:rgba(120,195,240,.3)}}
.node.dim small{{color:rgba(159,198,223,.35)}}
.node.o{{border-color:{ORANGE};box-shadow:0 0 34px rgba(236,100,8,.55)}}
.node small{{display:block;font-family:'Geist Mono',monospace;font-size:17px;color:#9fc6df;margin-top:6px;font-weight:400}}
.tag{{display:inline-block;font-family:'Geist Mono',monospace;font-size:17px;padding:5px 10px;border-radius:8px;background:rgba(67,164,220,.16);color:#bfe2f7;margin-right:8px}}
.cursor{{position:absolute;width:44px;height:44px}}
.logo{{position:absolute;height:64px}}
.step{{position:absolute;left:120px;top:110px;display:flex;align-items:center;gap:22px}}
.step .n{{width:74px;height:74px;border-radius:50%;display:grid;place-items:center;font-size:38px;font-weight:700;background:{BLUE};color:#04101c;box-shadow:0 0 40px rgba(67,164,220,.7)}}
.step .t{{font-size:40px;font-weight:600}}
.demo{{position:absolute;right:60px;top:50px;font-family:'Geist Mono',monospace;font-size:20px;color:{AMBER};border:1px dashed {AMBER};padding:8px 14px;border-radius:8px}}
"""

CURSOR = f'<svg class="cursor" style="left:{{x}}px;top:{{y}}px" viewBox="0 0 24 24"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="#fff" stroke="#000" stroke-width="1.2"/></svg>'
def cursor(x, y): return CURSOR.replace("{x}", str(x)).replace("{y}", str(y))
LOGO = '<img class="logo" src="../logo_white.png" style="{s}">'

def edges(pairs, color=BLUE, dim=None, w=3, dash=False):
    """pairs: list of ((x1,y1),(x2,y2)). Curved glowing connectors."""
    dim = dim or []
    out = ['<svg style="position:absolute;inset:0" width="1920" height="1080"><defs>'
           f'<filter id="gl" filterUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>']
    for i, ((x1, y1), (x2, y2)) in enumerate(pairs):
        c = color if i not in dim else "rgba(120,195,240,.25)"
        mx = (x1 + x2) / 2
        d = f"M{x1},{y1} C{mx},{y1} {mx},{y2} {x2},{y2}"
        da = ' stroke-dasharray="10 10"' if dash else ""
        out.append(f'<path d="{d}" stroke="{c}" stroke-width="{w}" fill="none" filter="url(#gl)"{da}/>')
        if i not in dim:
            out.append(f'<circle cx="{x2}" cy="{y2}" r="6" fill="{c}" filter="url(#gl)"/>')
    out.append("</svg>")
    return "".join(out)

def node(x, y, text, sub="", cls=""):
    s = f"<small>{sub}</small>" if sub else ""
    return f'<div class="node {cls}" style="left:{x}px;top:{y}px">{text}{s}</div>'

def dashboard(extra=""):
    """Dark operations dashboard, tilted, used in scenes 1-2 and 6."""
    bars = "".join(f'<div style="flex:1;height:{h}%;background:linear-gradient({BLUE},rgba(67,164,220,.2));border-radius:4px"></div>'
                   for h in [30,42,38,55,48,62,58,70,66,92,96,88,94,97])
    return f'''
<div class="glass tilt" style="left:150px;top:120px;width:1560px;height:860px;padding:34px">
 <div style="display:flex;justify-content:space-between;align-items:center">
  <div style="display:flex;gap:14px;align-items:center"><div style="width:14px;height:14px;border-radius:50%;background:{ORANGE};box-shadow:0 0 16px {ORANGE}"></div>
   <span style="font-size:24px;font-weight:600">Ops Console · Production</span></div>
  <span class="mono" style="font-size:30px;color:#fff">02:06 AM</span></div>
 <div style="display:flex;gap:24px;margin-top:30px">
  <div class="glass" style="position:relative;flex:1.4;height:300px;padding:24px">
   <div class="lbl" style="font-size:16px">Payments API · p99 latency</div>
   <div style="display:flex;align-items:flex-end;gap:8px;height:200px;margin-top:20px">{bars}</div></div>
  <div class="glass" style="position:relative;flex:1;height:300px;padding:24px">
   <div class="lbl" style="font-size:16px;color:{ORANGE}">Active alert</div>
   <div style="font-size:30px;font-weight:600;margin-top:18px">Checkout slowdown</div>
   <div class="mono" style="font-size:18px;color:#9fc6df;margin-top:10px">SEV-1 · started 02:04</div>
   <div class="mono" style="font-size:18px;color:#9fc6df;margin-top:6px">region us-east · 3 services</div></div></div>
 <div style="display:flex;gap:24px;margin-top:24px">
  {''.join(f'<div class="glass" style="position:relative;flex:1;height:150px;opacity:.6"></div>' for _ in range(3))}</div>
</div>{extra}'''

def approval(conf=False, left=560, top=330, scale=1.0, hl=False):
    c = (f'<div style="margin-top:26px;display:flex;align-items:center;gap:18px"><span style="font-size:24px;color:#9fc6df">Confidence</span>'
         f'<span class="mono" style="font-size:64px;font-weight:500;color:#fff;{"text-shadow:0 0 30px #43a4dc" if hl else ""}">92%</span></div>') if conf else ""
    return f'''<div class="glass" style="left:{left}px;top:{top}px;width:800px;padding:40px;transform:scale({scale});transform-origin:top left;
 background:linear-gradient(160deg,rgba(20,40,64,.96),rgba(8,16,28,.96));border-color:rgba(67,164,220,.6)">
 <div class="lbl">AI agent · proposed action</div>
 <div style="font-size:46px;font-weight:600;margin-top:16px">Roll back config change</div>{c}
 <div style="margin-top:34px;display:flex;gap:18px"><span class="btn o">Approve</span><span class="btn g">Reject</span></div></div>'''

# ---------------------------------------------------------------- scenes
S = []
def scene(vo, sup, visual, motion, body, warm=False, demo=False, edit=""):
    S.append(dict(vo=vo, sup=sup, visual=visual, motion=motion, body=body, warm=warm, demo=demo, edit=edit))

scene("If you're a developer, I've got a question for you… It's 2 a.m and your AI agent wants to roll back a change in production. Do you click approve?",
 "02:06 · Approve rollback?",
 "Dark operations dashboard (same as video 2), 2:06 a.m. The agent's plan sits in an approval box: \"Roll back config change.\" Cursor hovers over Approve.",
 "Slow push-in on the tilted dashboard; latency bars pulse; clock ticks 02:05 → 02:06; approval box slides up with glass blur; cursor drifts in and hovers (button glow breathes).",
 dashboard(approval(left=560, top=360) + cursor(760, 600)) + '<div class="super">02:06 · Approve rollback?</div>', warm=True)

scene("Most agents give you an answer and a \"confidence score\". But confidence isn't evidence. You can't audit a percentage.",
 "Confidence ≠ evidence",
 "Close-up: the approval box shows only an answer and \"Confidence: 92%\".",
 "Camera dives into the approval box; 92% counts up from 0; on \"isn't evidence\" a ≠ sign stamps between the words and the % flickers / hollows out.",
 approval(conf=True, left=360, top=210, scale=1.5, hl=True) + '<div class="super">Confidence ≠ evidence</div>')

scene("(music sting, no VO)", "Can You Trust Your AI Agent with Multi-hop Decision-making Tasks?",
 "Title card.",
 "Glass panel sweeps in; title builds word by word (kinetic type, Geist Bold); a faint graph texture (brand texture) drifts behind; TigerGraph logo top-left.",
 '<div class="grid"></div>' + edges([((200,860),(520,700)),((520,700),(860,880)),((1350,240),(1700,380)),((1700,380),(1600,620))], dim=[0,1,2,3]) +
 LOGO.replace("{s}", "left:120px;top:90px;height:56px") +
 '<div style="position:absolute;left:120px;top:330px;width:1500px"><div class="lbl">Agentic AI · Part 3</div>'
 '<div class="h1" style="font-size:108px;margin-top:24px">Can You Trust Your AI Agent with <span style="color:#43a4dc">Multi-hop</span> Decision-making Tasks?</div></div>')

bb = f'''<div class="glass" style="left:200px;top:250px;width:640px;height:520px;background:linear-gradient(160deg,#0b0d12,#020305);border-color:rgba(255,255,255,.12)">
 <div class="lbl" style="position:absolute;left:40px;top:36px;color:#8a97a3">Black box</div>
 <div style="position:absolute;left:40px;right:40px;bottom:40px" class="glass"><div style="position:relative;padding:26px;font-size:28px">Roll back config change<br><span class="mono" style="color:#9fc6df">score 0.92</span></div></div>
 <div style="position:absolute;left:220px;top:130px;font-size:150px;color:#2a3138">?</div></div>
<div class="glass" style="left:1080px;top:250px;width:640px;height:520px;border-color:rgba(67,164,220,.7)">
 <div class="lbl" style="position:absolute;left:40px;top:36px">Glass box</div>

 <div style="position:absolute;left:40px;right:40px;bottom:40px" class="glass"><div style="position:relative;padding:26px;font-size:28px">Roll back config change<br><span class="mono" style="color:#9fc6df">+ facts · links · rules · order</span></div></div></div>'''
bb += edges([((1180,420),(1320,360)),((1320,360),(1460,450)),((1460,450),(1600,380)),((1320,360),(1430,560))])
for x, y in [(1180,420),(1320,360),(1460,450),(1600,380),(1430,560)]:
    bb += f'<div style="position:absolute;left:{x-14}px;top:{y-14}px;width:28px;height:28px;border-radius:50%;background:{BLUE};box-shadow:0 0 24px {BLUE}"></div>'
scene("So what does it take for an agent to show its evidence? A black box gives you an answer, but a glass box gives you the answer AND the path behind it: which facts it used, how they connect, which rules it checked, and in what order.",
 "Black box: answer + score · Glass box: answer + path",
 "Split screen. Left: a black box with an answer and a score. Right: a glass box with the answer plus a visible path of linked facts.",
 "Two cubes/panels rise from the floor; left stays opaque; right turns to glass and the path lights node by node in sync with \"facts… connect… rules… order\".",
 bb + '<div class="super">Black box: answer + score · Glass box: answer + path</div>')

scene("The model predicts. And the graph proves.", "The model predicts. The graph proves.",
 "The line resolves on screen.",
 "Kinetic type: \"The model predicts.\" types on in white; \"The graph proves.\" assembles from graph nodes snapping into letterforms, orange underline swipe.",
 '<div class="grid"></div><div style="position:absolute;left:0;right:0;top:360px;text-align:center">'
 '<div class="h1" style="font-size:120px;color:#cfe3f1;font-weight:400">The model predicts.</div>'
 f'<div class="h1" style="font-size:132px;margin-top:20px">The <span style="color:{BLUE}">graph</span> proves.</div>'
 f'<div style="width:560px;height:6px;background:{ORANGE};margin:34px auto 0;border-radius:3px;box-shadow:0 0 24px {ORANGE}"></div></div>')

trail_head = f'<div class="lbl" style="position:absolute;left:120px;top:60px">Evidence trail · Roll back config change</div>'
scene("Let's open the trail behind that rollback with this readiness checklist:", "Evidence trail",
 "The approval box expands into an evidence trail. [DEMO: needs recording]",
 "Approval box splits open like a drawer; the dashboard falls back into depth of field; an empty node canvas unfolds with a scanning light line.",
 dashboard() .replace('class="glass tilt"', 'class="glass tilt" style="filter:blur(6px);opacity:.35"', 1) +
 approval(left=560, top=150) +
 f'<div class="glass" style="left:560px;top:560px;width:800px;height:380px;border-color:{BLUE}">'
 '<div style="position:absolute;left:40px;top:34px" class="lbl">Evidence trail ▾</div>'
 + "".join(f'<div style="position:absolute;left:40px;right:40px;top:{100+i*52}px;height:34px;border-radius:8px;background:rgba(67,164,220,{.18-i*.03})"></div>' for i in range(5)) +
 '</div><div class="super">Evidence trail</div>', demo=True)

P = {"alert": (330, 470), "api": (760, 470), "db": (1200, 470), "chg": (1200, 220), "chk": (1620, 330), "ref": (1620, 520), "prem": (1620, 720)}
def trail(level):
    """Progressive evidence graph for steps 1-5."""
    e = [(P["alert"], P["api"]), (P["api"], P["db"])]
    if level >= 2: e.append((P["chg"], P["db"]))
    if level >= 3: e += [(P["db"], P["chk"]), (P["db"], P["ref"]), (P["db"], P["prem"])]
    h = edges(e, dim=[] if level == 1 else list(range(0, {2:2,3:3}.get(level, 0))))
    h += node(*P["alert"], "⚠ Alert", "checkout slow · 02:04", "o")
    h += node(*P["api"], "Payments API", "", "" if level == 1 else "dim")
    h += node(*P["db"], "DB cluster", "pg-pay-03", "" if level in (1,2,3) else "dim")
    if level >= 2:
        h += node(*P["chg"], "Config change #4471", "", "" if level == 2 else "dim")
        h += ('<div style="position:absolute;left:1420px;top:190px">' if level == 2 else '<div style="display:none">') + \
             '<span class="tag">01:44 AM</span><span class="tag">source: deploy-log</span></div>'
    if level >= 3:
        cl = "" if level == 3 else "dim"
        h += node(*P["chk"], "Checkout", "", cl) + node(*P["ref"], "Refunds", "", cl) + node(*P["prem"], "12 premium accounts", "SLA at risk", "o" if level == 3 else "dim")
    return h

scene("Step one: The alert traces to the Payments API, which depends on one database cluster.",
 "1 · Alert → Payments API → DB cluster",
 "Step 1 lights up: Alert → Payments API → Database cluster.",
 "Alert node pulses orange; a light pulse travels along the edge to Payments API, then to DB cluster; each node pops with a soft scale-in (0.9 → 1).",
 trail_head + '<div class="step"><div class="n">1</div><div class="t">Trace the alert</div></div>' + trail(1) + '<div class="super">1 · Alert → Payments API → DB cluster</div>', demo=True)

scene("Step two: That cluster had a configuration change at 1:44 am, twenty minutes before the slowdown began. Every fact carries its source and its timestamp.",
 "2 · Config change, 1:44 a.m. · source + time on every fact",
 "Step 2: Config change #4471, applied 1:44 a.m., linked to the cluster. A timestamp and source tag sit beside it.",
 "Config node drops in above the cluster and links down; timestamp + source tags type on beside it; a mini timeline 01:44 → 02:04 ('20 min') draws under the graph.",
 trail_head + '<div class="step"><div class="n">2</div><div class="t">Find the change</div></div>' + trail(2) +
 f'<div style="position:absolute;left:330px;top:780px;width:870px"><div style="height:3px;background:linear-gradient(90deg,{BLUE},{ORANGE})"></div>'
 '<div class="mono" style="display:flex;justify-content:space-between;font-size:20px;margin-top:12px;color:#9fc6df"><span>01:44 change</span><span>+20 min</span><span>02:04 slowdown</span></div></div>'
 '<div class="super">2 · Config change, 1:44 a.m. · source + time on every fact</div>', demo=True)

scene("Step three: The same cluster feeds checkout and refunds, and twelve premium customers are affected. Now that's an impact, not a guess.",
 "3 · Checkout, Refunds · 12 premium accounts",
 "Step 3: the path branches to Checkout, Refunds and 12 premium accounts.",
 "Three branches fan out from the cluster; '12' counter ticks up on the premium node; affected nodes glow orange-rimmed.",
 trail_head + '<div class="step"><div class="n">3</div><div class="t">Measure the impact</div></div>' + trail(3) + '<div class="super">3 · Checkout, Refunds · 12 premium accounts</div>', demo=True)

scene("Step four: Before acting, this agent checked your rollback policy, which lives in the graph alongside the data. The change is under an hour old. Premium customers are at risk. The rule allows it.",
 "4 · Policy checked ✓",
 "Step 4: a policy card attaches to the path: \"Auto-rollback allowed when the change is under 1 hour old and premium SLAs are at risk.\" A green tick.",
 "Policy card slides in and snaps onto the path with a connector; the two conditions tick one by one in sync with VO; final green tick stamps.",
 trail_head + '<div class="step"><div class="n">4</div><div class="t">Check the policy</div></div>' + trail(4) +
 f'<div class="glass" style="left:560px;top:600px;width:820px;padding:30px;border-color:{GREEN};box-shadow:0 0 50px rgba(60,207,142,.25)">'
 '<div class="lbl" style="color:#3ccf8e">Policy · rollback-001</div>'
 '<div style="font-size:28px;margin-top:12px;line-height:1.35">Auto-rollback allowed when the change is under 1 hour old and premium SLAs are at risk.</div>'
 '<div style="margin-top:16px;font-size:24px;color:#bff0d9">✓ change age 22 min &nbsp;&nbsp; ✓ premium SLA at risk</div>'
 f'<div style="position:absolute;right:-30px;top:-30px;width:84px;height:84px;border-radius:50%;background:{GREEN};display:grid;place-items:center;font-size:50px;color:#04101c;box-shadow:0 0 40px {GREEN}">✓</div></div>'
 '<div class="super" style="bottom:60px">4 · Policy checked ✓</div>', demo=True)

scene("And step five: the agent says what it doesn't know. It found no evidence on the refunds data, so it asked a human to check.",
 "5 · Gap flagged → human check",
 "Step 5: an amber flag: \"No evidence on whether the change touched the refunds schema. Human check recommended.\"",
 "Refunds node flickers; a dashed amber ring and empty edge appear; the flag card unfolds; a small human icon fades in.",
 trail_head + '<div class="step"><div class="n">5</div><div class="t">Flag the gap</div></div>' + trail(5) +
 f'<div style="position:absolute;left:1500px;top:440px;width:240px;height:160px;border:3px dashed {AMBER};border-radius:24px"></div>'
 f'<div class="glass" style="left:640px;top:640px;width:800px;padding:30px;border-color:{AMBER};box-shadow:0 0 50px rgba(245,184,61,.25)">'
 f'<div class="lbl" style="color:{AMBER}">⚑ Evidence gap</div>'
 '<div style="font-size:28px;margin-top:12px;line-height:1.35">No evidence on whether the change touched the refunds schema.</div>'
 f'<div style="margin-top:14px;font-size:26px;color:{AMBER};font-weight:600">👤 Human check recommended</div></div>'
 '<div class="super" style="bottom:60px">5 · Gap flagged → human check</div>', demo=True)

mini = edges([((300,420),(480,420)),((480,420),(660,420)),((660,300),(660,420)),((660,420),(840,340)),((660,420),(840,500))])
for x, y in [(300,420),(480,420),(660,420),(660,300),(840,340),(840,500)]:
    mini += f'<div style="position:absolute;left:{x-12}px;top:{y-12}px;width:24px;height:24px;border-radius:50%;background:{BLUE};box-shadow:0 0 20px {BLUE}"></div>'
scene("Now you're not trusting a score. You're approving a decision you can read. And six months from now, when someone asks why, the same trail is still there to replay.",
 "Approve with evidence · Replay it later",
 "The full trail on screen; the cursor clicks Approve. Cut to a calendar flipping forward six months; an auditor opens the same trail, unchanged.",
 "Click: button ripple + confirm chime, trail locks with a 'Signed 02:07' stamp. Whip to calendar pages flipping NOV → MAY; auditor window opens the same trail and a play ▶ scrubber replays it.",
 f'<div class="glass" style="left:120px;top:200px;width:820px;height:620px">{""}</div>' + mini +
 '<div style="position:absolute;left:180px;top:620px"><span class="btn o">Approve ✓</span><span class="mono" style="margin-left:24px;font-size:22px;color:#9fc6df">signed 02:07 · J. Dev</span></div>' + cursor(300, 660) +
 f'<div class="glass tiltR" style="left:1060px;top:180px;width:720px;height:660px;padding:40px">'
 f'<div style="display:flex;gap:16px"><div class="glass" style="position:relative;width:200px;padding:20px;text-align:center"><div class="lbl" style="color:{ORANGE}">May</div><div style="font-size:80px;font-weight:700">14</div></div>'
 '<div style="flex:1"><div class="lbl">Audit · replay</div><div style="font-size:30px;margin-top:10px">Why did we roll back #4471?</div></div></div>'
 '<div style="margin-top:40px;height:280px;border-radius:14px;background:rgba(67,164,220,.08);border:1px solid rgba(67,164,220,.3);position:relative">'
 f'<div style="position:absolute;left:30px;right:30px;bottom:30px;height:6px;background:rgba(255,255,255,.15);border-radius:3px"><div style="width:62%;height:100%;background:{BLUE};border-radius:3px"></div></div>'
 '<div style="position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);font-size:70px;color:#fff">▶</div></div>'
 '<div class="mono" style="margin-top:20px;font-size:20px;color:#9fc6df">trail unchanged · 5 steps · 7 facts · 1 policy</div></div>'
 '<div class="super">Approve with evidence · Replay it later</div>')

vec = "".join(f'<div class="glass" style="position:relative;margin-top:18px;padding:22px;font-size:22px;color:#b9cfdd">"{t}"<span class="mono" style="float:right;color:{BLUE}">{s}</span></div>'
              for t, s in [("…rollback procedures for payment…", "0.87"), ("…configuration changes may cause…", "0.84"), ("…premium customer SLA terms…", "0.81")])
scene("You might ask, \"why does this need a graph?\" Because vector search can only tell you which passages looked similar to the question. It can't tell you why they matter to the decision.",
 "Similar ≠ explained",
 "Split: a vector search result shows three text chunks and similarity scores. A graph result shows the connected path.",
 "Left: chunks drop in as loose cards, scores count up, then drift apart (no links). Right: the demo path draws itself as one connected line. '≠' stamps in the centre.",
 f'<div style="position:absolute;left:120px;top:150px;width:760px"><div class="lbl" style="color:#8a97a3">Vector search</div>{vec}</div>'
 f'<div style="position:absolute;left:1040px;top:150px" class="lbl">Graph search</div>' +
 edges([((1100,420),(1300,420)),((1300,420),(1500,420)),((1500,280),(1500,420)),((1500,420),(1720,560))]) +
 node(1100, 420, "Alert") + node(1300, 420, "API") + node(1500, 420, "DB") + node(1500, 280, "Change") + node(1720, 560, "12 accts", "", "o") +
 '<div style="position:absolute;left:930px;top:360px;font-size:90px;color:#ec6408">≠</div><div class="super">Similar ≠ explained</div>')

lab = [((280,520),(640,520),"DEPENDS_ON"),((640,520),(1000,520),"RUNS_ON"),((1000,260),(1000,520),"CHANGED"),((1000,520),(1400,380),"FEEDS"),((1000,520),(1400,680),"SERVES")]
lbls = "".join(f'<div class="mono" style="position:absolute;left:{(a[0]+b[0])/2-70}px;top:{(a[1]+b[1])/2-44}px;font-size:18px;color:#bfe2f7;background:rgba(4,7,13,.85);padding:4px 10px;border-radius:6px;border:1px solid rgba(67,164,220,.4)">{t}</div>' for a, b, t in lab)
scene("In a graph search, the customers, systems, changes and rules are connected explicitly. So the path the agent followed is pretty clear. Nothing has to be reconstructed after the fact.",
 "The path is the explanation",
 "The path from the demo, with each connection labelled.",
 "Camera tracks along the path left → right; each relationship label pops as the light pulse passes it; legend chips (customers · systems · changes · rules) fade in.",
 edges([(a, b) for a, b, _ in lab]) + node(280, 520, "Alert") + node(640, 520, "Payments API") + node(1000, 520, "DB cluster") +
 node(1000, 260, "Change #4471") + node(1400, 380, "Checkout") + node(1400, 680, "Premium customer", "", "o") +
 node(1720, 520, "Policy rollback-001", "", "") + edges([((1400,380),(1720,520))], color=GREEN) + lbls + '<div class="super">The path is the explanation</div>')

scene("Your policies sit in the graph too, as guardrails. So when an agent refuses to act, it can explain that as well.",
 "Guardrails with reasons",
 "Policy cards slot into the graph as guardrails; one blocks an action with a visible reason.",
 "Policy cards fly in and lock onto graph edges like rails; an action arrow hits one and bounces back; a red-orange 'Blocked' badge expands with its reason.",
 edges([((300,540),(700,540)),((700,540),(1100,540))]) + node(300, 540, "Agent action", "delete customer data") + node(700, 540, "Guardrail", "") +
 f'<div class="glass" style="left:900px;top:300px;width:820px;padding:34px;border-color:{ORANGE};box-shadow:0 0 50px rgba(236,100,8,.3)">'
 f'<div class="lbl" style="color:{ORANGE}">⛔ Blocked by policy · retention-007</div>'
 '<div style="font-size:30px;margin-top:14px;line-height:1.35">Customer records under legal hold cannot be deleted. 3 of 40 records are on hold.</div></div>' +
 "".join(f'<div class="glass" style="left:{x}px;top:{y}px;width:300px;height:110px;opacity:.7"><div class="lbl" style="position:absolute;left:24px;top:22px;font-size:15px">Policy</div><div style="position:absolute;left:24px;top:54px;font-size:22px">{t}</div></div>'
         for x, y, t in [(180,760,"rollback-001"),(540,760,"access-012"),(900,760,"pii-003")]) +
 '<div class="super" style="bottom:40px">Guardrails with reasons</div>')

icons = [("🏦", "Banking"), ("🏥", "Healthcare"), ("🏛", "Government")]
scene("And in regulated industries, explaining automated decisions is becoming a requirement, not a nice-to-have.",
 "Explainability: from best practice to requirement",
 "Short regulatory montage: a bank, a hospital, a government building. [VERIFY: client to approve any regulation named on screen.]",
 "Three line-art buildings (brand icon style, TG Blue + black) draw on in sequence, each with a small evidence trail card above; no specific regulation named until the client approves.",
 "".join(f'<div class="glass" style="left:{180+i*560}px;top:250px;width:480px;height:480px"><div style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:160px;filter:grayscale(1) brightness(1.4) sepia(1) hue-rotate(160deg) saturate(3)">{e}</div>'
         f'<div style="position:absolute;left:0;right:0;bottom:60px;text-align:center;font-size:34px;font-weight:600">{n}</div></div>' for i, (e, n) in enumerate(icons)) +
 '<div class="super">Explainability: from best practice to requirement</div><div class="demo" style="color:#f5b83d">VERIFY regulation copy</div>')

CHECK = ["Shows the path", "Current context", "Policies built in", "Knows when to hand off", "Replayable"]
def checklist(done, logo=False):
    rows = ""
    for i, t in enumerate(CHECK):
        on = i < done
        bc = GREEN if logo else (BLUE if on else "rgba(255,255,255,.25)")
        rows += (f'<div style="display:flex;align-items:center;gap:28px;margin-top:30px;opacity:{1 if on or logo else .35}">'
                 f'<div style="width:62px;height:62px;border-radius:14px;border:3px solid {bc};display:grid;place-items:center;font-size:40px;color:{bc}">{"✓" if on or logo else ""}</div>'
                 f'<div style="font-size:46px;font-weight:500"><span class="mono" style="color:#9fc6df;font-size:30px;margin-right:16px">0{i+1}</span>{t}</div></div>')
    return rows
scene("So before you trust an agent with multi-step decisions, run this checklist.",
 "Readiness checklist",
 "A five-item checklist builds, one line at a time.",
 "Glass card; each line slides in with a tick-box drawing itself; ticks fill TG Blue as each is named (lines 1-5 timed to edit).",
 f'<div class="glass" style="left:460px;top:120px;width:1000px;height:840px;padding:60px"><div class="lbl">Readiness checklist</div>{checklist(3)}</div>')

scene("If you can't tick all five, the agent isn't ready for production. But TigerGraph is built to tick them all.",
 "Ready for production?",
 "All five ticks turn green over the TigerGraph logo.",
 "All five ticks flip to green in a quick cascade; the card shrinks left and the TigerGraph logo resolves on the right with a soft blue bloom.",
 f'<div class="glass" style="left:140px;top:120px;width:960px;height:840px;padding:60px"><div class="lbl" style="color:{GREEN}">Ready for production?</div>{checklist(5, True)}</div>'
 + LOGO.replace("{s}", "left:1200px;top:470px;height:120px") +
 '<div style="position:absolute;left:1200px;top:380px;width:600px;height:330px;background:radial-gradient(closest-side,rgba(67,164,220,.35),transparent);z-index:-0"></div>')

scene("AI predicts but Graph reveals the evidence.", "Regular models predict. TigerGraph proves.",
 "End card. CTAs: Request a demo · Start free.",
 "Logo holds centre; tagline fades up; two CTA buttons rise; subtle node texture drifts behind. Hold 4-5 s clean for end.",
 '<div class="grid"></div>' + LOGO.replace("{s}", "left:50%;top:260px;height:130px;transform:translateX(-50%)") +
 '<div style="position:absolute;left:0;right:0;top:470px;text-align:center"><div class="h1" style="font-size:76px;font-weight:500">Regular models predict. <span style="color:#43a4dc;font-weight:700">TigerGraph proves.</span></div>'
 f'<div style="margin-top:70px;display:flex;gap:30px;justify-content:center"><span class="btn o" style="font-size:34px">Request a demo</span><span class="btn g" style="font-size:34px;border-color:{BLUE};color:#fff">Start free</span></div>'
 '<div class="mono" style="margin-top:60px;font-size:24px;color:#9fc6df">tigergraph.com</div></div>', warm=True)

# ---------------------------------------------------------------- timing + write
def dur(vo):
    w = len(vo.replace("(music sting, no VO)", "").split())
    return max(3.5, round(w / 2.45 + 0.6, 1))  # ~147 wpm + 1 s breathing room

t = 0.0
meta = []
for i, s in enumerate(S, 1):
    d = dur(s["vo"]) if i != 3 else 4.0
    if i == len(S): d += 4.0  # clean end hold
    s.update(n=i, start=t, dur=d)
    t += d
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="bg{" warm" if s["warm"] else ""}"></div>{s["body"]}'
            + ('<div class="demo">DEMO · needs recording</div>' if s["demo"] else "") + "</body></html>")
    open(os.path.join(HERE, "frames", f"f{i:02d}.html"), "w").write(html)
    meta.append({k: s[k] for k in ("n", "start", "dur", "vo", "sup", "visual", "motion", "demo")})
json.dump(meta, open(os.path.join(HERE, "scenes.json"), "w"), indent=1, ensure_ascii=False)
print(len(S), "scenes, total", round(t, 1), "s")
