import sys, html; sys.path.insert(0,'../01 Script'); from shots15 import SHOTS
e=html.escape
ACTN={0:'Cold open: the porch, 1916',1:'1. The Man Who Wouldn\'t Catch Him',2:'2. Ledger A',3:'3. The Auction',4:'4. Nothing Wasted',5:'5. The Secret Deal',6:'6. Ninety Percent',7:'7. The Thirty Ninth Drop',8:'8. The Journalist',9:'9. The Break-Up That Made Him Richer',10:'10. Dimes and Time',11:'Your Wallet + ending'}
SETN={'porch15':'1916 porch (new)','ledger15':'Ledger A desk (new)','farm15':'1840s farmhouse (new)','office15':'Cleveland trading office (new)','oilfield15':'Titusville oilfield (new)','auction15':'Auction room (new)','refinery15':'Riverside refinery (new)','railoffice15':'Railroad office (new)','smallref15':'Small family refinery (new)','mapwar15':'War-room map (new)','pipeline15':'Tidewater pipeline hills (new)','hq15':'26 Broadway boardroom (new)','canworks15':'Tin-can works (new)','lamps15':'Lamp montage (new)','newsroom15':"McClure's newsroom (new)",'court15':'Supreme Court 1911 (new)','exchange15':'1910s exchange floor (new)','lab15':'Lab, university, hospital (new)','wallet15':'Stromi desk'}
WHO={'N':'Narrator','JOHN':'John D.','BILL':'Devil Bill','ELIZA':'Eliza','CLARK':'Clark','ANDREWS':'Andrews','RAILMAN':'Railman','NED':'Ned','IDA':'Ida Tarbell','TEDDY':'Teddy Roosevelt','DOT':'Dot','PIP':'Pip','GUS':'Gus','STROMI':'Stromi','FARMER':'Farmer','CLERK':'Clerk','LAWYER':'Lawyer','REPORTER':'Reporter','WORKER':'Worker','BUTLER':'Butler','EDITOR':'Editor','IVY':'Ivy Lee'}
t=0; rows={}; words=0
for s in SHOTS:
    if s.get('card'): d=3.2
    else:
        w=sum(len(x.split()) for _,x in s['lines']); words+=w; d=w/2.7+1.2
    s['_t']=t; t+=d; rows.setdefault(s['act'],[]).append(s)
def mmss(x): return f"{int(x//60)}:{int(x%60):02d}"
out=[]
for a,ss in rows.items():
    out.append(f'<section id="a{a}"><h2>{e(ACTN[a])}</h2><div class="ct">starts ~{mmss(ss[0]["_t"])}</div><div class="grid">')
    for s in ss:
        if s.get('card'):
            sub=("<p class=\"note\">"+e(s["sub"])+"</p>") if s.get("sub") else ""
            out.append(f'<article class="shot card"><div class="top"><span class="id">{s["id"]}</span><span class="tm">{mmss(s["_t"])}</span></div><div class="cardt">{e(s["card"])}</div>{sub}<p class="note">Card, 3 s, piano sting + whoosh.</p></article>'); continue
        ls=''.join(f'<p class="ln {"sk" if w!="N" else ""}"><b>{WHO[w]}</b> {e(x)}</p>' for w,x in s['lines'])
        out.append(f'<article class="shot"><div class="top"><span class="id">{s["id"]}</span><span class="set">{e(SETN.get(s["set"],s["set"]))}</span><span class="tm">{mmss(s["_t"])}</span></div><p class="vis">{e(s["vis"])}</p><div class="vo">{ls}</div></article>')
    out.append('</div></section>')
nav=''.join(f'<a href="#a{a}">{e(ACTN[a])}</a>' for a in rows)
tpl=open('tpl.html').read()
open('Rockefeller-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t), words, 'words', len(SHOTS),'shots')
