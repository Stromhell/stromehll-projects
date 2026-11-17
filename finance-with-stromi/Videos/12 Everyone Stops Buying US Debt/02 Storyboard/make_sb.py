import sys, html; sys.path.insert(0,'../01 Script'); from shots12 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'1. America Runs a Tab',2:'2. The Easy Lenders Walk Out',3:'3. Domino One: The Auction',4:'4. Domino Two: The Interest Bill',5:'5. Domino Three: Your Mortgage',6:'6. Domino Four: When Things Break',7:'7. So, Will Everyone Stop?',8:'Your Wallet + ending'}
SETN={'openhouse12':'Open-house street (new)','auction12':'IOU auction hall + dominoes (new)','tabhome12':"Mister Tab's mansion of boxes (new)",'vault12':'Frozen vault, 2022, sepia (new)','bank12':'Small-town bank, rate staircase (new)','grocery12':'Grocery store (new)','wallet12':'Stromi desk'}
WHO={'N':'Narrator','ROSA':'Rosa','TEO':'Teo','TAB':'Mister Tab','RESERVE':'Madame Reserve','FERDIE':'Ferdie','FLASH':'Flash','DEL':'Del','AUCTIONEER':'Auctioneer','NEIGHBOUR':'Neighbour','PIP':'Pip','DOT':'Dot'}
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
            out.append(f'<article class="shot card"><div class="top"><span class="id">{s["id"]}</span><span class="tm">{mmss(s["_t"])}</span></div><div class="cardt">{e(s["card"])}</div>{("<p class=\"note\">"+e(s["sub"])+"</p>") if s.get("sub") else ""}<p class="note">Card, 3 s, piano sting + whoosh.</p></article>'); continue
        ls=''.join(f'<p class="ln {"sk" if w!="N" else ""}"><b>{WHO[w]}</b> {e(x)}</p>' for w,x in s['lines'])
        out.append(f'<article class="shot"><div class="top"><span class="id">{s["id"]}</span><span class="set">{e(SETN.get(s["set"],s["set"]))}</span><span class="tm">{mmss(s["_t"])}</span></div><p class="vis">{e(s["vis"])}</p><div class="vo">{ls}</div></article>')
    out.append('</div></section>')
nav=''.join(f'<a href="#a{a}">{e(ACTN[a])}</a>' for a in rows)
tpl=open('tpl.html').read()
open('IOU-Auction-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t))
