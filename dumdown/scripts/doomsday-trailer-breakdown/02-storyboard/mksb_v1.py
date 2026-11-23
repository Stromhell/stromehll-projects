import re,glob,base64,io,html,os
from PIL import Image
B='/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/'
src=open(B+'01-script/doomsday-trailer-breakdown-script-v1.md').read()
frames={float(os.path.basename(f)[1:-4]):f for f in glob.glob(B+'00-source/frames/t*')}
def nearest(t): k=min(frames,key=lambda x:abs(x-t)); return k
sets={}
for m in re.finditer(r'^\| (S\d+) ([^|]+)\| ([^|]+)\| ([^|]+)\|',src,re.M):
    ts=[float(x) for x in re.findall(r't(\d+(?:\.\d+)?)',m.group(3))]
    sets[m.group(1)]=(m.group(2).strip(),ts[0] if ts else None,m.group(4).strip())
OV={'S7':85.5,'S16':160.5}
for k,v in OV.items(): sets[k]=(sets[k][0],v,sets[k][2])
cache={}
def thumb(t):
    k=nearest(t)
    if k not in cache:
        im=Image.open(frames[k]).convert('RGB'); im.thumbnail((360,203)); b=io.BytesIO(); im.save(b,'JPEG',quality=62)
        cache[k]=base64.b64encode(b.getvalue()).decode()
    return k,cache[k]
body=src.split('## 0:00 HOOK')[1].split('## Fact check')[0]
secs=re.split(r'^## ',('0:00 HOOK'+body),flags=re.M)
out=[];n=0
for s in secs:
    if not s.strip(): continue
    head,_,rest=s.partition('\n'); cur=None; cards=[]
    tc=head.split(' ')[0]; title=head[len(tc):].strip()
    for line in rest.split('\n'):
        l=line.strip()
        if l.startswith('🎬') or l.startswith('🤡'):
            gag=l.startswith('🤡')
            ss=re.findall(r'\b(S\d{1,2})\b',l)
            if ss: cur=ss[0]
            elif 'Montage' in l or 'Prediction board' in l or 'End screen' in l: cur=None
            n+=1
            cam=re.search(r'\[([^\]]+)\]',l); cam=cam.group(1) if cam else ''
            txt=re.sub(r'^(🎬|🤡)\s*','',l)
            verbs=sorted(set(re.findall(r'\b([A-Z]{3,}S?)\b',txt))-{'GAG','CUT','HELLO','MY','NAME','IS','MAN','DOOM','THE','TALK','SIX','OF','US','MASK','SHOP','CHARGER','NAME','TAGS','HANDSHAKE','SPANDEX','SPEECH','CONTEST','STRING','BOARD','HOURS','LATER','HE','REF','MVP'})
            st=sets.get(cur) if cur else None
            ref=thumb(st[1]) if st and st[1] is not None else None
            cards.append((n,gag,cam,txt,verbs,cur,st,ref))
    out.append((tc,title,cards))
def esc(x): return html.escape(x)
H=['''<title>Doomsday Trailer Storyboard</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;600&family=JetBrains+Mono:wght@500&display=swap">
<style>
/* Layout: DumDown control room: navy ground, one band per script section, shot cards pair our shot with the trailer frame its set must match */
:root{--bg:#0d1233;--panel:#151c48;--line:#2a3990;--fg:#eef1ff;--muted:#a9b2e0;--blue:#2fc6ff;--yellow:#ffd23d;--red:#e23a3a;--orange:#ff6a2b;--green:#5fd38a;--ink:#231A24;
--display:"Bangers","Impact",system-ui,sans-serif;--body:"Inter",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font-family:var(--body);line-height:1.5}
.wrap{max-width:1280px;margin:0 auto;padding-block:28px 64px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:34px}
.kicker{font-family:var(--mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--blue)}
h1{font-family:var(--display);font-weight:400;font-size:clamp(40px,7vw,72px);line-height:.95;margin:0;color:var(--yellow);letter-spacing:.02em;text-wrap:balance}
h1 span{color:var(--fg)}
.note{max-width:72ch;color:var(--muted);margin:0}
.rules{display:flex;flex-wrap:wrap;gap:8px}
.rules span{font-size:12px;border:1px solid var(--line);border-radius:999px;padding:3px 10px;color:var(--fg)}
.top{display:grid;gap:12px}
.sec{display:grid;gap:14px}
.sechead{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;border-bottom:2px solid var(--line);padding-bottom:6px}
.sechead h2{font-family:var(--display);font-weight:400;font-size:30px;letter-spacing:.03em;margin:0}
.sechead .tc{font-family:var(--mono);font-size:13px;color:var(--blue)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px}
.shot{background:var(--panel);border:1px solid var(--line);border-radius:10px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.shot.gag{border-color:var(--orange)}
.ref{position:relative;aspect-ratio:16/9;max-width:100%;background:#000}
.ref img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.85)}
.ref .none{position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);font-family:var(--mono);font-size:12px;text-align:center;padding:10px}
.no{position:absolute;left:8px;top:4px;font-family:var(--display);font-size:32px;line-height:1;color:var(--yellow);text-shadow:2px 2px 0 var(--ink)}
.tag{position:absolute;right:8px;top:8px;font-family:var(--mono);font-size:10.5px;background:rgba(13,18,51,.85);padding:2px 6px;border-radius:4px}
.gagtag{position:absolute;left:8px;bottom:8px;font-family:var(--display);font-size:18px;background:var(--orange);color:var(--ink);padding:0 8px;border-radius:3px;letter-spacing:.04em}
.cam{position:absolute;right:8px;bottom:8px;font-family:var(--mono);font-size:10.5px;background:var(--yellow);color:var(--ink);padding:2px 6px;border-radius:3px;max-width:70%;text-align:right}
.txt{padding:12px 14px 14px;display:grid;gap:8px;min-width:0}
.txt p{margin:0;font-size:14px}
.set{font-family:var(--mono);font-size:11.5px;color:var(--muted)}
.set b{color:var(--green);font-weight:500}
.verbs{display:flex;flex-wrap:wrap;gap:6px}
.verbs span{font-family:var(--mono);font-size:10.5px;background:rgba(47,198,255,.15);color:var(--blue);border-radius:3px;padding:1px 6px}
.sets{display:grid;gap:6px}
.sets table{border-collapse:collapse;font-size:13px;min-width:640px}
.sets td,.sets th{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}
.sets th{font-family:var(--mono);font-size:11px;color:var(--blue);text-transform:uppercase;letter-spacing:.08em}
.scroll{overflow-x:auto}
</style>
<div class="wrap">
<header class="top">
<div class="kicker">DumDown · Trailer breakdown · Storyboard v1 · 23 Nov 2026</div>
<h1>Avengers: Doomsday <span>Final Trailer, Broken Down</span></h1>
<p class="note">Each card is one shot from script v1. The picture on the card is the trailer frame its set has to match (research reference only, never shown in the video). We rebuild every set in DumDown's painted cel style with original parody designs. Blue tags are the actions the character must really perform on the word. Orange cards are gags, with a clean cut in and out and a 1.7 s hold after the laugh.</p>
<div class="rules"><span>Real-world scale on every plate</span><span>Feet on the floor line</span><span>Sitting on the seat, not above it</span><span>Props gripped in the hand</span><span>Entrance transition + recap card</span><span>Names said per the pronunciation table</span><span>Natural human voices</span><span>No graphics over characters</span></div>
</header>''']
for tc,title,cards in out:
    H.append(f'<section class="sec"><div class="sechead"><span class="tc">{esc(tc)}</span><h2>{esc(title)}</h2></div><div class="grid">')
    for n,gag,cam,txt,verbs,cur,st,ref in cards:
        img=f'<img alt="Trailer reference frame at {ref[0]:.1f} seconds" src="data:image/jpeg;base64,{ref[1]}">' if ref else '<div class="none">No trailer set. Own DumDown set.</div>'
        tag=f'<span class="tag">REF {ref[0]:.1f}s</span>' if ref else ''
        H.append(f'<article class="shot{" gag" if gag else ""}"><div class="ref">{img}<span class="no">{n}</span>{tag}'+('<span class="gagtag">GAG</span>' if gag else '')+(f'<span class="cam">{esc(cam[:60])}</span>' if cam and not gag else '')+'</div><div class="txt">'
          +(f'<div class="set"><b>{cur}</b> {esc(st[0])} · {esc(st[2])}</div>' if st else '')
          +f'<p>{esc(re.sub(r"^\[[^\]]+\]\s*","",txt))}</p>'
          +('<div class="verbs">'+''.join(f'<span>{esc(v)}</span>' for v in verbs)+'</div>' if verbs else '')+'</div></article>')
    H.append('</div></section>')
H.append('<section class="sets"><div class="sechead"><span class="tc">Sets</span><h2>Set list and what to match</h2></div><div class="scroll"><table><tr><th>Set</th><th>Location</th><th>Ref</th><th>Match notes</th></tr>')
for k,(name,t,notes) in sets.items():
    H.append(f'<tr><td>{k}</td><td>{esc(name)}</td><td>{"" if t is None else f"{t:.1f}s"}</td><td>{esc(notes)}</td></tr>')
H.append('</table></div></section></div>')
open(B+'02-storyboard/doomsday-trailer-storyboard-v1.html','w').write('\n'.join(H))
print(n, len(cache), os.path.getsize(B+'02-storyboard/doomsday-trailer-storyboard-v1.html'))
