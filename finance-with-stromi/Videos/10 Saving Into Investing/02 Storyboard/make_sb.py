import sys, html; sys.path.insert(0,'../01 Script'); from shots10 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. The Waiting Room',2:'2. Why We Stay Seated',3:'Planks one and two',4:'Plank three',5:'Plank four',6:'Plank five',7:'Your Wallet + ending'}
SETN={'apartment10':"Wren's apartment (new)",'waitroom10':'Bank waiting room (new)','bridge10':'Canyon rope bridge (new)','street10':'Market Street (new)','sale10':'Market Street storm sale (new)','porch10':"Abe's porch (new)",'breakroom10':'Clinic break room (new)'}
WHO={'N':'Narrator','WREN':'Wren','DIME':'Dime','MORT':'Mort','ABE':'Grandpa Abe','RICO':'Rico','PIP':'Pip','DOT':'Dot','GUS':'Gus'}
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
            out.append(f'<article class="shot card"><div class="top"><span class="id">{s["id"]}</span><span class="tm">{mmss(s["_t"])}</span></div><div class="cardt">{e(s["card"])}</div>{('<p class="note">'+e(s['sub'])+'</p>') if s.get('sub') else ''}<p class="note">Chapter card, 3 s, piano sting + whoosh.</p></article>'); continue
        ls=''.join(f'<p class="ln {"sk" if w!="N" else ""}"><b>{WHO[w]}</b> {e(x)}</p>' for w,x in s['lines'])
        out.append(f'<article class="shot"><div class="top"><span class="id">{s["id"]}</span><span class="set">{e(SETN.get(s["set"],s["set"]))}</span><span class="tm">{mmss(s["_t"])}</span></div><p class="vis">{e(s["vis"])}</p><div class="vo">{ls}</div></article>')
    out.append('</div></section>')
nav=''.join(f'<a href="#a{a}">{e(ACTN[a])}</a>' for a in rows)
tpl=open('tpl.html').read()
open('Waiting-Room-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
