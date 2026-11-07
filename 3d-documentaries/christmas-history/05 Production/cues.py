import json,sys
S='/home/user/work/xmas/audio/sfx/'; M='/home/user/work/xmas/audio/music/'
music={0:('Jingle Bells.mp3',.16),1:('Silent Night.mp3',.2),2:('Winter Chimes.mp3',.2),3:('Greensleeves.mp3',.18),4:('Deck the Halls B.mp3',.16),5:('Jingle Bells Calm.mp3',.18),6:('Jingle Bells.mp3',.16)}
C={ # shot: [(at, file, vol, opts)]
'0.1':[(.2,'wind_loop.wav',.25,{'dur':5}),(1.0,'pop.wav',.5,{}),(1.1,'sleigh_2.mp3',.25,{'dur':4})],
'0.2':[(.4,'boing_1.mp3',.35,{}),(1.0,'boing_1.mp3',.3,{}),(1.6,'boing_1.mp3',.3,{}),(3.5,'chime.wav',.4,{})],
'0.3':[(.5,'chime.wav',.3,{}),(2.0,'chime.wav',.25,{}),(3.5,'chime.wav',.25,{})],
'0.4':[(.3,'city_loop.wav',.2,{'dur':6}),(.5,'church_bell_2.mp3',.15,{})],
'0.5':[('mid','paper.wav',.5,{}),('mid+.3','hit.wav',.45,{})],
'0.6':[(.6,'whoosh.wav',.4,{}),(1.8,'whoosh.wav',.4,{}),(3.0,'whoosh.wav',.4,{}),(4.2,'whoosh.wav',.4,{})],
'0.7':[(.2,'whoosh_soft.wav',.5,{}),(.3,'sleigh_1.mp3',.3,{'dur':7}),('end-2.2','hit.wav',.5,{})],
'1.1':[(.2,'night_loop.wav',.25,{'dur':8})],'1.2':[(.4,'paper.wav',.4,{})],'1.3':[(.2,'footsteps.wav',.3,{'dur':9,'loop':True})],
'1.4':[(.2,'fire_loop.wav',.15,{'dur':8})],'1.5':[(.5,'swell.wav',.35,{}),(.3,'sheep_1.mp3',.3,{}),(3.0,'sheep_1.mp3',.25,{})],'1.6':[(.3,'paper.wav',.5,{}),(1.0,'paper.wav',.5,{}),('mid+1','boing_2.mp3',.4,{})],
'2.1':[(.2,'paper.wav',.35,{}),(1.5,'paper.wav',.3,{})],'2.2':[('mid','paper.wav',.5,{}),('mid+.2','chime.wav',.4,{}),('end-1.2','pop.wav',.4,{})],
'2.3':[(.2,'wind_loop.wav',.35,{'dur':6}),(1.2,'breath.wav',.3,{})],'2.4':[(.2,'crowd_loop.wav',.2,{'dur':8}),(.3,'fire_loop.wav',.15,{'dur':8})],
'2.5':[(.3,'crowd_loop.wav',.15,{'dur':10}),('mid','swell.wav',.4,{}),('mid','church_bell_1.mp3',.2,{})],'2.6':[(.4,'paper.wav',.4,{}),(1.2,'swell.wav',.3,{})],
'2.7':[(.3,'swell.wav',.35,{}),('mid','magic_1.mp3',.3,{}),('end-2','boing_1.mp3',.3,{})],
'3.1':[(.2,'fire_loop.wav',.3,{'dur':8}),(.5,'crowd_loop.wav',.15,{'dur':7})],'3.2':[('mid','knap.wav',.4,{}),('end-1.5','laugh_1.mp3',.3,{})],
'3.3':[(.2,'wind_loop.wav',.3,{'dur':6})],'3.4':[(.3,'scrape.wav',.35,{}),('mid','fire_loop.wav',.3,{'dur':5})],'3.5':[(.4,'laugh_2.mp3',.3,{}),('mid','coins.wav',.3,{})],
'3.6':[(.2,'footsteps.wav',.3,{'dur':8,'loop':True}),(.6,'flute.wav',.25,{})],'3.7':[(.3,'crowd_loop.wav',.2,{'dur':9}),('mid','chime.wav',.35,{})],
'3.8':[('mid','crowd_cheer.wav',.35,{}),('end-2','tick.wav',.4,{})],'3.9':[(.3,'church_bell_2.mp3',.2,{}),('mid','chime.wav',.3,{})],
'3.10':[(1.0,'chime.wav',.45,{}),('mid','chime.wav',.45,{}),('end-1.5','chime.wav',.45,{})],'3.11':[(.6,'pop.wav',.4,{}),('mid','cash_register_1.mp3',.4,{})],
'4.1':[(.3,'drum_roll_1.mp3',.4,{'dur':2.5}),('mid','cymbal_1.mp3',.45,{})],'4.2':[(.2,'ocean_loop.wav',.2,{'dur':9}),(.2,'footsteps.wav',.25,{'dur':9,'loop':True})],
'4.3':[(.2,'night_loop.wav',.2,{'dur':10}),('mid-1','coins.wav',.45,{}),('mid+.5','children_1.mp3',.35,{})],'4.4':[(.6,'paper.wav',.45,{}),('end-1','pop.wav',.3,{})],
'4.5':[(.2,'whoosh.wav',.4,{}),('mid+1.5','boing_2.mp3',.4,{}),('end-1.5','magic_2.mp3',.35,{})],'4.6':[(.2,'children_2.mp3',.3,{}),(.4,'church_bell_1.mp3',.15,{})],
'4.7':[(1.0,'magic_1.mp3',.35,{}),('mid-1','magic_1.mp3',.35,{}),('mid+1','magic_2.mp3',.35,{}),('end-2','magic_2.mp3',.4,{})],
'4.8':[(.2,'wind_loop.wav',.3,{'dur':8}),(.5,'sleigh_1.mp3',.3,{'dur':6})],'4.9':[(.4,'chime.wav',.35,{}),('mid','magic_1.mp3',.3,{})],
'4.10':[(.2,'sleigh_2.mp3',.3,{'dur':7}),('mid','goat_1.mp3',.4,{})],'4.11':[(.3,'tension.wav',.3,{}),('mid','pop.wav',.5,{}),('mid+.5','laugh_1.mp3',.35,{})],
'4.12':[(.2,'whoosh.wav',.45,{}),('end-2','whoosh_soft.wav',.4,{}),('end-1.2','laugh_2.mp3',.3,{})],
'5.1':[(.2,'wind_loop.wav',.3,{'dur':8}),(.5,'sleigh_2.mp3',.12,{'dur':6})],'5.2':[(.2,'crowd_cheer.wav',.3,{}),(.4,'children_1.mp3',.3,{})],
'5.3':[(.8,'tick.wav',.3,{}),('mid','tick.wav',.3,{}),('end-1','tick.wav',.3,{})],'5.4':[(.3,'church_bell_2.mp3',.3,{}),('mid-1','swell.wav',.35,{}),('mid+2','crowd_cheer.wav',.3,{})],
'5.5':[(.2,'crowd_loop.wav',.3,{'dur':10}),('end-2','boing_2.mp3',.3,{})],'5.6':[(.3,'footsteps.wav',.3,{'dur':3}),('mid','creak.wav',.35,{}),('end-2','coins.wav',.3,{})],
'5.7':[(.2,'fire_loop.wav',.25,{'dur':8}),('mid','paper.wav',.45,{})],'5.8':[(.4,'hammer_1.mp3',.45,{}),('mid+.6','thud.wav',.5,{}),('mid+.9','laugh_1.mp3',.3,{})],
'5.9':[(.2,'fire_loop.wav',.2,{'dur':9}),('mid','chime.wav',.3,{})],'5.10':[(.3,'swell.wav',.4,{}),('mid','church_bell_1.mp3',.2,{})],
'6.1':[(.2,'crowd_loop.wav',.25,{'dur':6}),(.4,'church_bell_2.mp3',.2,{})],'6.2':[(.6,'tick.wav',.3,{}),('mid','tick.wav',.3,{}),('mid','swell.wav',.25,{})],
'6.3':[(.2,'crowd_loop.wav',.2,{'dur':10}),(.4,'night_loop.wav',.15,{'dur':10})],'6.4':[(.4,'tick.wav',.3,{}),('mid','tick.wav',.3,{}),('end-1','chime.wav',.3,{})],
'6.5':[(.2,'crowd_cheer.wav',.35,{}),(.4,'church_bell_1.mp3',.25,{})],'6.6':[('mid-3','whoosh.wav',.4,{}),('mid-1','whoosh.wav',.4,{}),('mid+1','whoosh.wav',.4,{}),('mid+3','whoosh.wav',.4,{})],
'6.7':[(.4,'whoosh.wav',.35,{}),('mid+1','church_bell_1.mp3',.45,{})],'6.8':[(.3,'sleigh_1.mp3',.3,{'dur':6}),(.6,'fireworks_1.mp3',.4,{}),(2.2,'fireworks_2.mp3',.4,{}),('end-3.4','crowd_cheer.wav',.45,{}),('end-3.4','cymbal_2.mp3',.4,{})],
}
def build(a, extra={}):
    t=json.load(open(f'acts/act{a}.timing.json')); C.update(extra); cues=[]
    for s,lst in C.items():
        if s not in t: continue
        d=t[s]['dur']
        for at,f,v,o in lst:
            if isinstance(at,str):
                base=d/2 if at.startswith('mid') else d; rest=at[3:]
                at=base+(float(rest) if rest else 0)
            cues.append([s,round(max(0,at),2),S+f,v,o])
    m,g=music[a]
    json.dump({'music':{'file':M+m,'gain':g,'fadeOut':3},'cues':cues,'whoosh':[S+'whoosh_soft.wav'],'amb':{}},open(f'acts/act{a}.cues.json','w'),indent=0)
if __name__=='__main__':
    for a in sys.argv[1:]: build(int(a))
