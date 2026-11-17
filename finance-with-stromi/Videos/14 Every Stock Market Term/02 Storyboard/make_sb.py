import sys, html; sys.path.insert(0,'../01 Script'); from shots14 import SHOTS
e=html.escape
ACTN={0:'Cold open',1:'January: Owning a Slice',2:'February: The Order Window',3:'March: Market Weather',4:'April: Reading the Label',5:'June: Baskets',6:'July + August: The Zoo and the Storm',7:'September: The Dangerous Toolbox',8:'October: Watch Your Pockets',9:'November: How People Play',10:'December: The Boring Superpowers',11:'Your Wallet + ending'}
SETN={'depot14':'Courier depot (new)','border14':'Marketland border booth (new)','bakery14':'Ploppy Pancake Co. bakery (new)','exchange14':'1930s exchange hall (new)','bank14':'Broker window (new)','auction14':'Share market stall (new)','weather14':'Market weather studio (new)','street14':'Shop street by size (new)','market14':'Grocery market of baskets (new)','zoo14':'Marketland Zoo (new)','lake14':'Swan lake (new)','workshop14':'Dangerous toolbox workshop (new)','alley14':'Dark alley (new)','apartment14':"Milo's flat, winter (new)",'wallet14':'Stromi desk'}
WHO={'N':'Narrator','MILO':'Milo','LEXI':'Lexi','BENNY':'Benny','MARGE':'Marge','BRUNO':'Bruno (bull)','URSULA':'Ursula (bear)','PIP':'Pip','DOT':'Dot','GUS':'Gus'}
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
open('Stock-Terms-storyboard-v1.html','w').write(tpl.replace('%NAV%',nav).replace('%BODY%','\n'.join(out)).replace('%LEN%',mmss(t)).replace('%N%',str(len(SHOTS))))
print(mmss(t), words, 'words', len(SHOTS),'shots')
