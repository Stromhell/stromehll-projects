import re,html,sys
src,ref,out=sys.argv[1:4]
s=open(src).read(); r=open(ref).read()
head=r[:r.find('<div class="wrap">')]
head=head.replace('<title>Ironheart Storyboard</title>','<title>Spider-Man: Brand New Day Storyboard</title>')
E=html.escape
secs=re.split(r'\n## ',s)[1:]
CAST=['Peter','MJ','Ned','Frank','Widow','Metzger','Jean','Sara','Banner','Hulk','Scorpion','DeWolff','May']
CAMS=['Wide','Slow push-in','Tracking','Low angle','Crane down','Over-shoulder','Close-up','Dolly out']
PAL=[('#8a4fff','#120626'),('#2fb66a','#04170b'),('#e23a3a','#1a0508'),('#2fc6ff','#04101f'),('#ffd23d','#1a1402'),('#ff6a2b','#1f0a02')]
shots=[];t=0.0;n=0;cards=0;gags=0
def fmt(x): x=int(round(x)); return f"{x//60}:{x%60:02d}"
body=[]
for si,sec in enumerate(secs):
    lines=sec.strip().split('\n'); title=re.sub(r'^\S+\s+','',lines[0]).strip()
    cur=None; panels=[]
    if '🤡' in lines[0]:
        g=' '.join(x.strip() for x in lines[1:] if x.strip() and x.strip()!='---' and not x.startswith('['))
        cur={'vis':title+': '+g,'vo':[],'fx':[],'cards':[],'gag':True}; panels.append(cur); lines=lines[:1]
    for l in lines[1:]:
        l=l.strip()
        if not l or l=='---' or l.startswith('[End screen'):
            if l.startswith('[End screen') and cur: cur['fx'].append(('endscreen','NOTE','End screen: last 5 s clean, music tail only.'))
            continue
        if l.startswith('🎬'):
            cur={'vis':l[1:].strip(),'vo':[],'fx':[],'cards':[],'gag':False}; panels.append(cur)
        elif l.startswith('🤡'):
            g=l[1:].strip(); cur={'vis':g,'vo':[],'fx':[],'cards':[],'gag':True}; panels.append(cur)
        elif cur is None: continue
        elif l.startswith('🎵'): cur['fx'].append(('vfx','MUSIC',l[1:].strip()))
        elif l.startswith('[SFX]'): cur['fx'].append(('sfx','SFX',l[5:].strip()))
        elif l.startswith('[POP]'): cur['fx'].append(('pop','POP',l[5:].strip()))
        elif l.startswith('🃏'): cur['cards'].append(l[1:].strip().replace('CARD: ','')); 
        else: cur['vo'].append(l)
    out_p=[]
    for p in panels:
        n+=1; vo=' '.join(p['vo'])
        d=max(8, len(vo.split())/2.45+ (len(p['cards'])*3)) if not p['gag'] else 20
        if p['gag']: gags+=1
        cards+=len(p['cards'])
        a,b=PAL[si%len(PAL)]
        txt=p['vis']+' '+vo
        who=[c for c in CAST if c.lower() in txt.lower() or (c=='Peter' and 'spider-guy' in txt.lower()) or (c=='Jean' and 'telepath' in txt.lower())]
        if p['gag']: who=[]
        fx=''.join(f'<li><b class="tag {c}">{k}</b> {E(v)}</li>' for c,k,v in p['fx'])
        cd=''.join(f'<span class="card">🃏 {E(c)}</span>' for c in p['cards'])
        cls='shot gag' if p['gag'] else 'shot'
        out_p.append(f'<article class="{cls}" id="s{n}"><div class="frame" style="--a:{a};--b:{b}"><span class="no">{n}</span><span class="tc">{fmt(t)} · {int(round(d))}s</span><span class="camtag">{"Gag cutaway" if p["gag"] else (re.match(r"^([A-Z][A-Z0-9-]+(?:[ ,][A-Z][A-Z-]+)*)",p["vis"]).group(1) if re.match(r"^[A-Z][A-Z]",p["vis"]) else CAMS[n%len(CAMS)])}</span><div class="cast">{"".join(f"<span class=who>{w}</span>" for w in who)}</div></div><div class="meta"><p class="vis">{E(p["vis"])}</p>'+(f'<p class="vo"><span class="lbl">VO</span> {E(vo)}</p>' if vo else '')+(f'<div class="cards">{cd}</div>' if cd else '')+f'<ul class="fx">{fx}</ul></div></article>')
        t+=d
    body.append(f'<section class="ep"><header class="ephead"><h2>{E(title)}</h2><span class="eptime">{len(panels)} panels</span></header><div class="grid">\n'+'\n'.join(out_p)+'\n</div></section>')
top=f'<div class="wrap"><header class="top"><div class="kicker">DumDown · Video 7 · Storyboard v1 · for review</div><h1>Spider-Man: Brand New Day <span>Explained</span></h1><div class="facts"><span><b>{n}</b> panels</span><span><b>{gags}</b> cutaway gags</span><span><b>{cards}</b> trading-card intros</span><span>runtime <b>~{fmt(t)}</b></span><span>16:9 · 24 fps · letterbox</span></div><p class="note">Built from the English subtitles of your movie file. Agatha v2 look: painted backgrounds at real-world scale, director camera pass (push-ins, tracks, cranes, whips), acting, props held in hands. Every panel names its framing (ECU, CU, MCU, OTS, POV, LOW, HIGH, TOP, DUTCH, 2-SHOT, WIDE, EWS) so the cut keeps changing. Most dramatic and funniest DumDown yet, adult jokes on (first 30 s clean for ads, hardest swears bleeped as a gag). Original parody designs, no logos, every film line paraphrased, no subtitles, no intro, last 5 s clean for the end screen.</p></header>'
open(out,'w').write(head+top+'\n'.join(body)+'</div>')
print(n,gags,cards,fmt(t))
