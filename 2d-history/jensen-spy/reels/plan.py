# 15 reels: act, first words, last words (cut on sentence ends), hook line (spoken + on the face card), kicker (top band)
import json
G='/home/user/repo/2d-history/jensen-spy/production/acts'
P=[
 (0,'Just after midnight','nobody warned him.',"US intel says she was a Chinese spy.","THE BET"),
 (1,'This is Alice','comes from is unknown.',"Two employees. Two billion dollars of chips.","WHO IS ALICE HUANG?"),
 (2,'A US senator','China want him?',"Look who's standing right behind him.","COMPUTEX 2025"),
 (3,'Kentucky, 1973.','teaches him to bench press.',"Nvidia's CEO cleaned toilets at a reform school.","JENSEN AT 9"),
 (3,'In Oregon, from','payroll left.',"He started Nvidia in a Denny's booth.","200 DOLLARS EACH"),
 (4,'But to draw','allowed to buy them.',"Five trillion dollars. China can't buy it.","5 TRILLION"),
 (5,'August 2022.','fifteen percent of the sales.',"Washington took fifteen percent of his China sales.","THE CHIP WAR"),
 (5,"But there's a gap",'no evidence of wrongdoing.',"There's a hole in America's chip wall.","THE LOOPHOLE"),
 (6,'Beijing, 1983.','American prison.',"This is how China's spies recruit you.","CHINA'S MSS"),
 (6,"And sometimes it's romance.",'is never charged.',"Code name: Parlor Maid.","SPY ROMANCES"),
 (7,'According to the Times, the ministry','It\'s him.',"They hid his name. Then they looked.","THE BLACK BAR"),
 (7,'A government memo','isn\'t known.',"Now nobody knows where she is.","WHAT DID SHE WANT?"),
 (8,'Autumn 2025.','ever told him.',"Trump was told. He did nothing.","NOBODY WARNED HIM"),
 (9,'Thursday, the twenty-ninth','to brief them in person.',"The story that wiped four percent off Nvidia.","THE STORY BREAKS"),
 (10,'On Sunday, Nvidia','Trump is going.',"I was unfaithful to my wife.","THE APOLOGY"),
]
def norm(s): return [w.lower().strip('.,?!:\'"') for w in s.split()]
out=[]
for i,(a,first,last,hook,kick) in enumerate(P,1):
    T=json.load(open(f'{G}/act{a}/timing.json')); ws=T['words']; nw=[w['w'].lower().strip('.,?!:\'"') for w in ws]
    f=norm(first); l=norm(last)
    s=next(k for k in range(len(nw)) if nw[k:k+len(f)]==f)
    e=next(k for k in range(s,len(nw)) if nw[k:k+len(l)]==l)+len(l)-1
    t0=max(0,ws[s]['s']-.2); t1=min(ws[e]['e']+.45, ws[e+1]['s']-.1 if e+1<len(ws) else ws[e]['e']+.45)
    out.append(dict(id=i,act=a,t0=round(t0,2),t1=round(t1,2),hook=hook,kicker=kick))
    print(i,a,round(t0,1),round(t1,1),round(t1-t0,1))
json.dump(out,open('reels.json','w'),indent=1)
