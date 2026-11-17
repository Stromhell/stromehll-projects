import sys, html; sys.path.insert(0,'../01 Script'); from shots11 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:"1. What Does 'Retired' Cost?",2:'2. The Twenty-Five Times Rule',3:'3. Why the First Years Feel Like Nothing',4:'4. The Three Crows',5:'5. Three Kinds of Soil',6:'6. The Number',7:'7. Set the Sprinkler',8:'Your Wallet + ending'}
SETN={'gameshow11':'THE NUMBER game show (new)','diner11':'Diner kitchen (new)','apartment11':"Nadia's apartment (new)",'orchard11':'The orchard (new)','office94':'1994 planner office (new)','nursery11':"Barb's greenhouse (new)"}
WHO={'N':'Narrator','NADIA':'Nadia','OSCAR':'Oscar','BARB':'Barb','CHET':'Chet','CROW_I':'Crow (Inflation)','CROW_T':'Crow (Taxes)','CROW_F':'Crow (Fees)','PIP':'Pip','DOT':'Dot','NEWCOOK':'New cook'}
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
open('Ten-Year-Orchard-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
