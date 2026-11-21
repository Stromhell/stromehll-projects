# plan.py : writes reels.json, cutting each reel on sentence boundaries from timing.json word times
import json
G='/home/user/repo/2d-history/prime/production/acts'
# id, act, first words of first sentence, last words of last sentence, hook (display), kicker
P=[(1,0,"February 2023.","It never quite is.","They said they'd buy Coca-Cola.","\"WE'LL BUY COKE\""),
(2,7,"In September 2026,","hundred million dollars.","A $100 million mistake, he says.","$100M REGRET"),
(3,1,"To understand Prime,","went nuclear.","They fought twice. Then they sold a drink.","RIVALS"),
(4,1,"And in Britain,","way beyond that.","Britain queued at dawn for a drink.","PRIME MANIA"),
(5,1,"Prime Hydration was","banned it outright.","Kids traded it like Pokémon cards.","PLAYGROUND CURRENCY"),
(6,2,"On that Sydney","so expensive.","Zero budget? Official drink of the UFC.","$0 BUDGET"),
(7,2,"Logan said he","actually drinks it.","Every fan video was a free advert.","FREE ADS"),
(8,3,"And the reviews","win in sport.","Read the label. It's mostly water.","MOSTLY WATER"),
(9,4,"In 2023, Prime","legal caffeine limit.","Two coffees of caffeine in one can.","200MG CAFFEINE"),
(10,4,"In July 2023,","a choice.","A US senator called in the FDA.","THE SENATOR"),
(11,5,"In 2024, Lionel","case was dismissed.","Prime versus Lionel Messi.","PRIME v MESSI"),
(12,5,"Boxer Ryan Garcia","was settled.","Prime sued a boxer for defamation.","THE LAWSUITS"),
(13,5,"And the biggest","standing silent.","Prime's own bottler is suing it.","$68M CLAIM"),
(14,6,"Remember those queues","normal Tuesday.","UK sales down 70%.","DOWN 70%"),
(15,7,"He said there","drink itself.","He blamed everyone but the drink.","THE VILLAINS")]
def norm(s): return ''.join(c for c in s.lower() if c.isalnum() or c==' ')
out=[]
for rid,a,fw,lw,hook,kick in P:
    W=json.load(open(f'{G}/act{a}/timing.json'))['words']; ws=[norm(w['w']) for w in W]
    f=norm(fw).split(); l=norm(lw).split()
    i=next(k for k in range(len(ws)) if ws[k:k+len(f)]==f)
    j=next(k for k in range(i,len(ws)) if ws[k:k+len(l)]==l)+len(l)-1
    t0=round(max(0,W[i]['s']-.2),2); t1=round(W[j]['e']+.35,2)
    if j+1<len(W): t1=round(min(t1,W[j+1]['s']-.05),2)
    out.append(dict(id=rid,act=a,t0=t0,t1=t1,hook=hook,kicker=kick)); print(rid,a,t0,t1,round(t1-t0,1),' '.join(w['w'] for w in W[i:j+1])[:90])
json.dump(out,open('reels.json','w'),indent=1,ensure_ascii=False)
