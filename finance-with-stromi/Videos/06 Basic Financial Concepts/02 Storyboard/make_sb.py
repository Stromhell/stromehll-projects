import sys, html; sys.path.insert(0,'/home/user/work/bf'); from shots06 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. Taxes',2:'2. Banks',3:'3. Interest',4:'4. Inflation',5:'5. Recessions',6:'6. Credit Scores',7:'7. What Money Is',8:'8. Investing',9:'9. Value',10:'10. Time',11:'Your Wallet + ending'}
SETN={'nana6':"Nana's kitchen (new)",'town6':'Tabletop model town (new)','bank':'Bank lobby','street':'Night street','vault':'Vault','lender':'Loan desk','tabletop':'Kitchen tabletop','store':'Corner store','stage':'Auction stage','club':'Party club','cork':'Corkboard','desk3':"Landlady's desk",'island6':'Yap island (new)','marble':'Marble hall','orchard6':'Orchard (new)','trading':'Trading floor','desert6':'Desert water stand (new)','clock6':'Clock tower (new)'}
WHO={'N':'Narrator','THEO':'Theo','NANA':'Nana June','DOT':'Dot','PIP':'Pip','WENDELL':'Wendell','GUS':'Gus','MABEL':'Mabel'}
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
tpl=open('/home/user/work/bf/sb/tpl.html').read()
open('/home/user/work/bf/sb/Basic-Financial-Concepts-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
