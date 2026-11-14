"""Dark-theme variant of v2 frames: post-processes frames/fNN.html -> frames_dark/fNN.html."""
import os,sys,glob
H=os.path.dirname(os.path.abspath(__file__))
OV="""
body{color:#eaf4fb!important;background:#04070d!important}
.bg{background:radial-gradient(1000px 700px at 85% 10%,rgba(67,164,220,.30),transparent 70%),radial-gradient(900px 700px at 5% 100%,rgba(67,164,220,.18),transparent 70%),linear-gradient(180deg,#060b15,#03060b)!important}
.dots{background-image:radial-gradient(rgba(67,164,220,.28) 1.4px,transparent 1.6px)!important}
.panel{background:linear-gradient(135deg,#0b1726 0%,#0f2a44 50%,#1b5a86 100%)!important;box-shadow:0 40px 90px rgba(0,0,0,.6),0 0 80px rgba(67,164,220,.15)!important}
.card{background:linear-gradient(160deg,rgba(22,38,58,.96),rgba(10,18,30,.96))!important;border-color:rgba(120,195,240,.28)!important;box-shadow:0 30px 70px rgba(0,0,0,.6)!important}
.node{background:#0d1928!important;border-color:rgba(120,195,240,.35)!important;box-shadow:0 16px 40px rgba(0,0,0,.5)!important}
.node.on{border-color:#43a4dc!important;box-shadow:0 0 0 6px rgba(67,164,220,.18),0 0 40px rgba(67,164,220,.55)!important}
.node.o{border-color:#ec6408!important;box-shadow:0 0 0 6px rgba(236,100,8,.15),0 0 40px rgba(236,100,8,.5)!important}
.node .ic{background:rgba(67,164,220,.15)!important}.node.o .ic{background:rgba(236,100,8,.15)!important}
.node small{color:#8fb3cb!important}
.btn.g{background:transparent!important;color:#eaf4fb!important;border-color:rgba(255,255,255,.35)!important}
.pill,.tag{background:rgba(67,164,220,.16)!important;color:#a9d6f2!important}
svg[stroke="#0d1620"]{stroke:#eaf4fb}
.blurfg{opacity:.35!important}
"""
REP=[("#fff8f3","rgba(236,100,8,.10)"),("background:#eaf3fa","background:rgba(67,164,220,.15)"),("background:#e8f2f9","background:rgba(67,164,220,.15)"),
("color:#6a8396","color:#8fb3cb"),("color:#0d1620","color:#eaf4fb"),("color:#4d6577","color:#9fbcd0"),("color:#9db0bf","color:#5d7385"),
("background:#fff;","background:#0d1928;"),("../logo_color.png","../logo_white.png"),
("linear-gradient(135deg,#eef6fc,#b9dbf0)","linear-gradient(135deg,#0f2a44,#1b5a86)"),
("rgba(255,255,255,.75),rgba(207,229,244,.55)","rgba(67,164,220,.12),rgba(67,164,220,.04)"),("rgba(255,255,255,.6)","rgba(255,255,255,.03)"),
("background:#e3f6ec;color:#178a57","background:rgba(34,181,115,.18);color:#5fe0a4"),("fill=\"#fff\" stroke=","fill=\"#0d1928\" stroke=")]
for f in sorted(glob.glob(os.path.join(H,"frames","f*.html"))):
    s=open(f).read()
    for a,b in REP: s=s.replace(a,b)
    s=s.replace("</style>",OV+"</style>",1)
    open(os.path.join(H,"frames_dark",os.path.basename(f)),"w").write(s)
