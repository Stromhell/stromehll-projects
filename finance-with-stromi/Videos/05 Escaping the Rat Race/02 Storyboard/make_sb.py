import sys, html; sys.path.insert(0,'/home/user/work/rr'); from shots05 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. The Six-Figure Broke',2:'2. What Money Really Is',3:'3. Money In, Money Out',4:'4. The Leak',5:'5. The Real Rat Race',6:'6. The Ostrich',7:'7. The Plan School Skipped + ending'}
SETN={'ring':'Empty boxing arena (new)','street':'Night street','apartment':"Jimmy's apartment",'kitchen3':"Carla's kitchen",'vault3':'Card vault','office3':'Survey wall','breakroom':'Break room','market':'Old market','cork':'Corkboard','diner':'Diner','tabletop':'Bathtub tabletop','carlot':'Car lot','hall':"Guru's stage",'garage3':'Garage','living3':'Living room','study':"Researcher's desk",'classroom':'Classroom (new)','bank':'Bank office','wallet':'Wallet'}
WHO={'N':'Narrator','JIMMY':'Jimmy','CARLA':'Carla','DOT':'Dot','PIP':'Pip','WENDELL':'Wendell','GUS':'Gus','MABEL':'Mabel','RAY':'Ray'}
t=0; rows={}
for s in SHOTS:
    if s.get('card'):
        d=3.2
    else:
        d=sum(len(x.split()) for _,x in s['lines'])/2.5+1.2+s.get('tail',0)
    s['_t']=t; t+=d; rows.setdefault(s['act'],[]).append(s)
def mmss(x): return f"{int(x//60)}:{int(x%60):02d}"
out=[]
for a,ss in rows.items():
    out.append(f'<section id="a{a}"><h2>{e(ACTN[a])}</h2><div class="ct">starts ~{mmss(ss[0]["_t"])}</div><div class="grid">')
    for s in ss:
        if s.get('card'):
            out.append(f'<article class="shot card"><div class="top"><span class="id">{s["id"]}</span><span class="tm">{mmss(s["_t"])}</span></div><div class="cardt">{e(s["card"])}</div><p class="note">Chapter card, 3 s, rising piano sting + whoosh.</p></article>'); continue
        ls=''.join(f'<p class="ln {"sk" if w!="N" else ""}"><b>{WHO[w]}</b> {e(x)}</p>' for w,x in s['lines'])
        out.append(f'<article class="shot"><div class="top"><span class="id">{s["id"]}</span><span class="set">{e(SETN.get(s["set"],s["set"]))}</span><span class="tm">{mmss(s["_t"])}</span></div><p class="vis">{e(s["vis"])}</p><div class="vo">{ls}</div></article>')
    out.append('</div></section>')
nav=''.join(f'<a href="#a{a}">{e(ACTN[a])}</a>' for a in rows)
tpl=open('/home/user/work/rr/sb/tpl.html').read()
open('/home/user/work/rr/sb/storyboard.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
