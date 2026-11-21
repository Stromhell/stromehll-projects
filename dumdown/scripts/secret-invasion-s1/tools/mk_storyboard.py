import re,html,sys
src,ref,out=sys.argv[1:4]
s=open(src).read(); r=open(ref).read()
head=r[:r.find('<div class="wrap">')]
head=head.replace('<title>Ironheart Storyboard</title>','<title>Secret Invasion Storyboard</title>')
E=html.escape
secs=re.split(r'\n## ',s)[1:]
CAST=['Fury','Talos','G\'iah','Gravik','Hill','Sonya','Rhodes','President','Varra','Ross','Prescod','Mascot']
ALIAS={'Fury':['eyepatch'],'Talos':[],'G\'iah':[],'Gravik':['super skrull'],'Hill':['maria'],'Sonya':['spymaster'],'Rhodes':['rhodey','colonel'],'President':['ritson'],'Varra':['priscilla'],'Ross':[],'Prescod':[],'Mascot':['dumdown mascot']}
CAMS=['Wide','Slow push-in','Tracking','Low angle','Crane down','Over-shoulder','Close-up','Dolly out']
PAL=[('#8a4fff','#120626'),('#2fb66a','#04170b'),('#e23a3a','#1a0508'),('#2fc6ff','#04101f'),('#ffd23d','#1a1402'),('#ff6a2b','#1f0a02')]
shots=[];t=0.0;n=0;cards=0;gags=0
def fmt(x): x=int(round(x)); return f"{x//60}:{x%60:02d}"
body=[]
for si,sec in enumerate(secs):
    lines=sec.strip().split('\n'); title=re.sub(r'^\S+\s+','',lines[0]).strip()
    cur=None; panels=[]
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
        elif l.startswith('[METER'): cur['fx'].append(('pop','METER','Skrull-o-meter ticks to '+l[6:].strip(' ]')))
        elif l.startswith('[POP]'): cur['fx'].append(('pop','POP',l[5:].strip()))
        elif l.startswith('🃏'): cur['cards'].append(l[1:].strip().replace('CARD: ','')); 
        else:
            if '[CUT]' in l: l=l.replace('[CUT]','').strip(); cur['fx'].append(('endscreen','CUT','Clean cut: shot and line finish, then the gag'))
            cur['vo'].append(l)
    out_p=[]
    for p in panels:
        n+=1; vo=' '.join(p['vo'])
        d=max(8, len(vo.split())/2.45+ (len(p['cards'])*3)) if not p['gag'] else 20
        if p['gag']: gags+=1
        cards+=len(p['cards'])
        a,b=PAL[si%len(PAL)]
        txt=p['vis']+' '+vo
        who=[c for c in CAST if c.lower() in txt.lower() or any(a in txt.lower() for a in ALIAS[c])]
        if p['gag']: who=[]
        fx=''.join(f'<li><b class="tag {c}">{k}</b> {E(v)}</li>' for c,k,v in p['fx'])
        cd=''.join(f'<span class="card">🃏 {E(c)}</span>' for c in p['cards'])
        cls='shot gag' if p['gag'] else 'shot'
        out_p.append(f'<article class="{cls}" id="s{n}"><div class="frame" style="--a:{a};--b:{b}"><span class="no">{n}</span><span class="tc">{fmt(t)} · {int(round(d))}s</span><span class="camtag">{"Gag cutaway" if p["gag"] else (re.match(r'\[([^\]]+)\]',p['vis']).group(1) if re.match(r'\[',p['vis']) else CAMS[n%len(CAMS)])}</span><div class="cast">{"".join(f"<span class=who>{w}</span>" for w in who)}</div></div><div class="meta"><p class="vis">{E(p["vis"])}</p>'+(f'<p class="vo"><span class="lbl">VO</span> {E(vo)}</p>' if vo else '')+(f'<div class="cards">{cd}</div>' if cd else '')+f'<ul class="fx">{fx}</ul></div></article>')
        t+=d
    body.append(f'<section class="ep"><header class="ephead"><h2>{E(title)}</h2><span class="eptime">{len(panels)} panels</span></header><div class="grid">\n'+'\n'.join(out_p)+'\n</div></section>')
top=f'<div class="wrap"><header class="top"><div class="kicker">DumDown · Storyboard v1 · for review</div><h1>Secret Invasion <span>Explained</span></h1><div class="facts"><span><b>{n}</b> panels</span><span><b>{gags}</b> cutaway gags</span><span><b>{cards}</b> trading-card intros</span><span>runtime <b>~{fmt(t)}</b></span><span>Spider-Man BND voice (Chatterbox + Fenrir) · 16:9 · 24 fps</span></div><p class="note">All 6 episodes, built from the English subtitles of the file you shared (research only, every line paraphrased). New for this video (your 21 Nov notes): characters act every verb in CAPS (real punches, runs, dives with wind-up and follow-through); framing keeps every caption on the empty side of the shot, never over a character, inside the safe frame; every gag starts after a clean CUT and returns on a fresh shot; one voice for everything (the Spider-Man video voice), gag characters are variations of it; jokes built on setup/punchline, rule of three, callbacks and a running SKRULL-O-METER that ticks up with every reveal. Original parody designs, no footage or logos. Family-friendly. Last 5 s clean. Target slot Sat 5 Dec 16:00 UTC (9:30 PM IST).</p></header>'
open(out,'w').write(head+top+'\n'.join(body)+'</div>')
print(n,gags,cards,fmt(t))
