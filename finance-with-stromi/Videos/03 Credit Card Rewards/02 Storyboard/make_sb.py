import sys, html; sys.path.insert(0,'/home/user/work/cc'); from shots03 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. The Toll at the Register',2:'2. The Person Behind You',3:'3. Two Businesses, One Card',4:'4. The Line Nobody Reads',5:'5. The Line Moves',6:'6. When the Toll Shrinks + ending'}
SETN={'kitchen':'Kitchen table','vault':'Bank vault','study':'Research desk','bank':'Banker\'s office','market':'Supermarket','road':'Payment road','hall':'Marble hall','harbour':'Harbour (EU/AU)','diner':'Corner café','maptable':'Map table','lender':'Fed archive','tabletop':'Tabletop props','club':'Reward racetrack','living':'Living room'}
WHO={'N':'Narrator','BANKER':'Banker','CASHIER':'Cashier','GUS':'Gus','NETWORK':'Network','RAY':'Ray','MABEL':'Mabel','JO':'Jo'}
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
tpl=open('/home/user/work/cc/sb/tpl.html').read()
open('/home/user/work/cc/sb/storyboard.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
