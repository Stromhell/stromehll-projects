import sys, html; sys.path.insert(0,'../01 Script'); from shots08 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. The Number Nobody Watches',2:'2. Nobody Decided This',3:'3. The Loop',4:'4. The Herd',5:'5. Borrowed Chips',6:'6. The Dominoes',7:'Your Wallet + ending'}
SETN={'diner8':"Rosa's Diner (new)",'pie8':'Giant pie plate (new)','porch8':"Hank's porch (new)",'factory8':'Payday factory (new)','loop8':'Hamster-wheel machine room (new)','townhall8':'Millbrook town hall (new)','office8':"Pell's glass office (new)",'domino8':'Domino table across town (new)'}
WHO={'N':'Narrator','ROSA':'Rosa','HANK':'Hank','JULES':'Jules','BEA':'Mayor Bea','PELL':'Pell','BOSS':"Pell's boss",'ANNIKA':'Annika','BROKER':'Broker','PIP':'Pip','DOT':'Dot','GUS':'Gus'}
t=0; rows={}
for s in SHOTS:
    d=3.2 if s.get('card') else sum(len(x.split()) for _,x in s['lines'])/2.7+1.2+s.get('tail',0)
    s['_t']=t; t+=d; rows.setdefault(s['act'],[]).append(s)
def mmss(x): return f"{int(x//60)}:{int(x%60):02d}"
out=[]
for a,ss in rows.items():
    out.append(f'<section id="a{a}"><h2>{e(ACTN[a])}</h2><div class="ct">starts ~{mmss(ss[0]["_t"])}</div><div class="grid">')
    for s in ss:
        if s.get('card'):
            out.append(f'<article class="shot card"><div class="top"><span class="id">{s["id"]}</span><span class="tm">{mmss(s["_t"])}</span></div><div class="cardt">{e(s["card"])}</div><p class="note">Chapter card, 3 s, piano sting + whoosh.</p></article>'); continue
        ls=''.join(f'<p class="ln {"sk" if w!="N" else ""}"><b>{WHO[w]}</b> {e(x)}</p>' for w,x in s['lines'])
        out.append(f'<article class="shot"><div class="top"><span class="id">{s["id"]}</span><span class="set">{e(SETN.get(s["set"],s["set"]))}</span><span class="tm">{mmss(s["_t"])}</span></div><p class="vis">{e(s["vis"])}</p><div class="vo">{ls}</div></article>')
    out.append('</div></section>')
nav=''.join(f'<a href="#a{a}">{e(ACTN[a])}</a>' for a in rows)
tpl=open('tpl.html').read()
open('Everybodys-All-In-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
