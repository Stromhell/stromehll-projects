# mk_acts.py -> acts/actNN.js for Spider-Man: Brand New Day (Toon Lanky cast, Agatha v2 cine engine)
# Framing key: WIDE z~1.1, MS z~1.45, MCU z~2.1, CU z~2.8 (cam y on the head), ECU z~3.6, DUTCH = cam.rot, OTS = back-view char in front.
import json, os
Y = 1270
def ch(c, x, s=1.4, **k): d = dict(c=c, x=x, y=k.pop('y', Y), s=s); d.update(k); return d
def cam(z, x=1280, y=800, **k): d = dict(z=z, x=x, y=y); d.update(k); return d
WIDE = lambda x=1280, y=820, **k: cam([1.05, 1.18], x, y, **k)
MS = lambda x=1280, y=800, **k: cam([1.4, 1.52], x, y, **k)
MCU = lambda x=1280, y=780, **k: cam([2.0, 2.2], x, y, **k)
CU = lambda x=1280, y=760, **k: cam([2.7, 2.95], x, y, **k)
ECU = lambda x=1280, y=740, **k: cam([3.5, 3.8], x, y, **k)
def card(name, sub, typ, stat, items, tags, at=.6, side='L'): return dict(name=name, sub=sub, type=typ, stat=stat, items=items, tags=tags, at=at, side=side)
def pop(t, at=.5, **k): d = dict(t=t, at=at); d.update(k); return d
A = {}
# 00 COLD OPEN
A[0] = ('COLD OPEN', [
 dict(p=0, plate='boston_roof', cam=cam([1.0, 1.35], 1280, 760), chars=[ch('spidey', 1300, view='back', expr='sad', pose='idle')], props=[dict(k='orb', x=1580, y=880, s=1, text='CHECKING CALIBRATION')], fx=['rain'], grade=['#20305a', .25]),
 dict(p=0, f=.35, plate='boston_roof', cam=CU(1300), chars=[ch('spidey', 1300, view='threequarter', dir=-1, expr='teary', talk=True)], fx=['rain'], grade=['#20305a', .2]),
 dict(p=0, f=.7, plate='boston_roof', cam=MS(1420), chars=[ch('spidey', 1200, view='threequarter', expr='embarrassed', pose='shrug')], props=[dict(k='orb', x=1600, y=880, s=1)], pops=[pop('THERAPY WAS RIGHT THERE', .4)], fx=['rain']),
 dict(p=1, plate='nyc_roof', title=['DUMDOWN', 'Spider-Man: Brand New Day'], cam=WIDE(), chars=[ch('spidey', 900, expr='determined', pose='hip'), ch('jean', 1650, view='threequarter', dir=-1, expr='smug'), ch('frank', 2050, view='threequarter', dir=-1, expr='angry', pose='cross')]),
 dict(p=1, f=.55, plate='nyc_roof', cam=MS(1100), chars=[ch('hulk', 1500, s=1.0, view='threequarter', dir=-1, expr='furious', pose='fist'), ch('spidey', 950, view='threequarter', expr='scared', pose='shrug')], pops=[pop('LET\'S GET DUMB', 1.2)]),
])
# 01 FORGOTTEN BOYFRIEND
A[1] = ('THE FORGOTTEN BOYFRIEND', [
 dict(p=0, plate='mit_gate', title=['PART 1', 'The Forgotten Boyfriend'], cam=WIDE(), chars=[ch('mj', [700, 1300], view='threequarter', expr='laugh'), ch('ned', [450, 1050], view='threequarter', expr='excited', pose='wave')]),
 dict(p=0, f=.5, plate='nyc_roof', cam=cam([1.8, 2.3], 1280, 780, rot=[-3, -5]), chars=[ch('peter', 1280, view='back', expr='sad', pose='pockets')], pops=[pop('DELETED FROM HUMANITY', .5)]),
 dict(p=1, plate='mit_gate', cam=CU(1100), chars=[ch('mj', 1100, view='threequarter', expr='joy', talk=True), ch('ned', 1500, view='threequarter', dir=-1, expr='laugh')]),
 dict(p=1, f=.45, plate='sad_apt', cam=MCU(1280), chars=[ch('peter', 1280, view='front', expr='teary', pose='idle')], pops=[pop('SIR THIS IS CALLED STALKING', .8)]),
 dict(p=1, f=.75, plate='nyc_roof', cam=MS(), chars=[ch('spidey', 1280, expr='determined', pose='hip')], cards=[card('SPIDER-GUY', 'Move: "Thwip & Cry"', 'BUG', 'WEAKNESS: CLOSURE', ['🕸️', '😢'], ['STICKY', 'SAD'])]),
 dict(p=2, plate='avenue', cam=cam([1.2, 1.6], 1000, 820, rot=[2, -2]), chars=[ch('spidey', 1000, expr='angry', pose='fist'), ch('scorpion', 1500, view='threequarter', dir=-1, expr='scared', pose='armsUp')]),
 dict(p=2, f=.4, plate='nyc_roof', cam=WIDE(), props=[dict(k='tvNews', x=1280, y=1100, s=1.2, title='CRIME AT RECORD LOW', sub='THANKS, SPIDEY')], chars=[ch('spidey', 1850, view='threequarter', dir=-1, expr='happy', pose='wave')]),
 dict(p=2, f=.75, plate='sad_apt', cam=MCU(), chars=[ch('peter', 1280, expr='sad', pose='cross')], pops=[pop('NO FRIENDS. NO FACE. GREAT STATS.', .3)]),
])
# 02 COP AND TANK
A[2] = ('THE COP AND THE TANK', [
 dict(p=0, plate='nyc_roof', title=['PART 2', 'The Cop and the Tank'], cam=MS(), chars=[ch('dewolff', 1550, view='threequarter', dir=-1, expr='skeptical', talk=True, pose='hip'), ch('spidey', 1000, view='threequarter', expr='happy')]),
 dict(p=0, f=.4, plate='nyc_roof', cam=CU(1550), chars=[ch('dewolff', 1550, view='threequarter', dir=-1, expr='deadpan', talk=True)]),
 dict(p=0, f=.7, plate='nyc_roof', cam=MCU(1000), chars=[ch('spidey', 1000, view='threequarter', expr='nervous', talk=True, pose='shrug')], pops=[pop('FRIENDSHIP SPEEDRUN: FAILED', .6)]),
 dict(p=1, plate='avenue', cam=cam([1.0, 1.15], 1280, 860), props=[dict(k='tank', x=[300, 1100], y=1330, s=.9, roll=4)], chars=[ch('spidey', 2000, view='threequarter', dir=-1, expr='shock', pose='armsUp')]),
 dict(p=1, f=.45, plate='avenue', cam=cam([1.5, 1.3], 1500, 800, shake=8), props=[dict(k='truck', x=[2600, 1700], y=1330, s=.8, dir=-1)], chars=[ch('spidey', 1500, expr='shock', pose='armsUp')], pops=[pop('T-BONED BY A VAN', .9)]),
 dict(p=1, f=.75, plate='avenue', cam=MS(1500), chars=[ch('frank', 1500, view='threequarter', dir=-1, expr='angry', pose='cross')], cards=[card('THE VIGILANTE', 'Move: "Shoot First"', 'GUN', 'WEAKNESS: ALSO GUNS', ['🔫', '💣'], ['BRUNCH VEST', 'NO CHILL'], side='L')]),
 dict(p=2, plate='avenue', cam=MS(), chars=[ch('frank', 1600, view='threequarter', dir=-1, expr='furious', talk=True, pose='point'), ch('spidey', 1000, view='threequarter', expr='annoyed', pose='hip')]),
 dict(p=2, f=.5, plate='avenue', cam=CU(1600), chars=[ch('frank', 1600, view='threequarter', dir=-1, expr='angry', talk=True)], pops=[pop('"DUMB-DUMB"', .3)]),
 dict(p=2, f=.78, plate='avenue', cam=MCU(1000), chars=[ch('spidey', 1000, view='threequarter', expr='skeptical')], pops=[pop('HEALTHIEST RELATIONSHIP IN THE MOVIE', .5)]),
])
# 03 TANK HEIST
A[3] = ('THE TANK HEIST', [
 dict(p=0, plate='prison_lobby', title=['PART 3', 'The Tank Heist'], cam=cam([1.0, 1.25], 1280, 820, shake=5), props=[dict(k='tank', x=900, y=1320, s=.85, roll=0)], chars=[ch('spidey', 1800, view='threequarter', dir=-1, expr='shock', pose='armsUp')]),
 dict(p=0, f=.4, plate='prison_lobby', cam=MS(1350), chars=[ch('scorpion', 1350, view='threequarter', expr='smug', pose='wave'), ch('ninja', 1750, view='threequarter', dir=-1, expr='neutral')]),
 dict(p=0, f=.75, plate='prison_lobby', cam=CU(1300), chars=[ch('driver', 1300, view='front', expr='dizzy', talk=True)], pops=[pop('"I DON\'T REMEMBER DRIVING A TANK"', .3)]),
 dict(p=1, plate='prison_lobby', cam=cam([2.8, 3.4], 1280, 760, rot=[4, 6]), chars=[ch('spidey', 1280, view='front', expr='determined')]),
 dict(p=1, f=.5, plate='prison_lobby', cam=MCU(1400), chars=[ch('driver', 1400, view='threequarter', dir=-1, expr='smug')], props=[dict(k='aura', x=1400, y=760, s=.5, col='255,140,40')], pops=[pop('WHAT\'S IN THE TANK?', .6)]),
])
# 04 WIDOW
A[4] = ('THE WIDOW\'S OFFICE', [
 dict(p=0, plate='banya', title=['PART 4', 'The Naked Office'], cam=cam([1.0, 1.3], 1280, 820), chars=[ch('widow', 1650, y=1330, view='threequarter', dir=-1, expr='smug', pose='hip'), ch('spidey', 900, view='threequarter', expr='nervous', pose='pockets')]),
 dict(p=0, f=.45, plate='banya', cam=MCU(900), chars=[ch('spidey', 900, view='threequarter', expr='embarrassed', talk=True, pose='shrug')], pops=[pop('IT IS A LEOTARD', .7)]),
 dict(p=1, plate='banya', cam=CU(1650), chars=[ch('widow', 1650, view='threequarter', dir=-1, expr='deadpan', talk=True)]),
 dict(p=1, f=.45, plate='banya', cam=ECU(900, y=720), chars=[ch('spidey', 900, view='front', expr='horror')], pops=[pop('YOU + 10 MYSTERIOS', .2)]),
 dict(p=2, plate='banya', cam=cam([1.4, 1.55], 1300, 820), chars=[ch('widow', 1700, view='threequarter', dir=-1, expr='skeptical', talk=True, pose='talk'), ch('spidey', 1050, view='back', expr='neutral', pose='cross')], cards=[card('THE WIDOW', 'Move: "Big Potato"', 'SPY', 'WEAKNESS: SMALL POTATOES', ['🥔', '🧖'], ['NEW AVENGERS', 'SAUNA'], side='R', at=1.4)]),
 dict(p=2, f=.55, plate='banya', cam=MS(1300), chars=[ch('widow', 1650, view='threequarter', dir=-1, expr='smug', pose='point'), ch('spidey', 1000, view='threequarter', expr='shock')], pops=[pop('"V-MAX"', .2), pop('SAW HIS BELLY BUTTON = 2ND BASE', 2.2)]),
])
# 05 DAMAGE CONTROL HQ
A[5] = ('DAMAGE CONTROL HQ', [
 dict(p=0, plate='dc_lobby', title=['PART 5', 'Damage Control'], cam=WIDE(), chars=[ch('spidey', 1280, expr='nervous', pose='armsUp')], pops=[pop('ENHANCED HUMAN. ARACHNID.', .5), pop('DEFENSIVE MEASURES', 2.5)]),
 dict(p=0, f=.6, plate='dc_lobby', cam=cam([2.2, 2.6], 1280, 760, shake=3), chars=[ch('spidey', 1280, view='front', expr='scared', talk=True)]),
 dict(p=1, plate='corridor', cam=cam([1.35, 1.5], 1280, 800), chars=[ch('metzger', [800, 1300], view='threequarter', expr='happy', talk=True, pose='talk'), ch('spidey', [500, 1000], view='threequarter', expr='skeptical'), ch('ninja', 2000, view='threequarter', dir=-1, expr='neutral', pose='hold')], cards=[card('THE DIRECTOR', 'Move: "Opportunity!"', 'SUIT', 'WEAKNESS: THE TRUTH', ['👔', '🗝️'], ['BALD', 'LIAR?'], side='R', at=1.2)]),
 dict(p=1, f=.6, plate='corridor', cam=MCU(1800), chars=[ch('ninja', 1800, view='threequarter', dir=-1, expr='smug', pose='hip')], pops=[pop('DEATH CULT. DENTAL PLAN.', .4)]),
 dict(p=2, plate='dc_office', cam=cam([2.4, 2.9], 1350, 760), chars=[ch('metzger', 1350, view='front', expr='happy', talk=True, pose='talk')]),
 dict(p=2, f=.45, plate='dc_office', cam=MS(), chars=[ch('metzger', 1600, view='threequarter', dir=-1, expr='smug', pose='cross'), ch('spidey', 1000, view='threequarter', expr='determined', pose='hip')], props=[dict(k='vault', x=2250, y=1250, s=.7)]),
 dict(p=2, f=.75, plate='dc_office', cam=CU(1600), chars=[ch('metzger', 1600, view='threequarter', dir=-1, expr='skeptical', talk=True)], pops=[pop('TRUST BALD MEN: NEVER', .4)]),
])
# 06 PARTY
A[6] = ('THE PARTY', [
 dict(p=0, plate='party_apt', title=['PART 6', 'Maynard'], cam=WIDE(), props=[dict(k='flowers', on=0, s=.9)], chars=[ch('peter', 1000, view='threequarter', expr='nervous', pose='hold'), ch('ned', 1650, view='threequarter', dir=-1, expr='excited', talk=True, pose='point')]),
 dict(p=0, f=.35, plate='party_apt', cam=MCU(1700), props=[dict(k='board', x=1900, y=900, s=.6)], chars=[ch('ned', 1500, view='threequarter', expr='excited', talk=True, pose='point')], pops=[pop('2 SUSPECTS. NEITHER IS HIM.', 1)]),
 dict(p=0, f=.7, plate='party_apt', cam=CU(1000), props=[dict(k='flowers', on=0, s=.9)], chars=[ch('peter', 1000, view='threequarter', expr='grimace', pose='hold')]),
 dict(p=1, plate='party_apt', cam=MS(), chars=[ch('mj', 1550, view='threequarter', dir=-1, expr='skeptical', talk=True), ch('peter', 1050, view='threequarter', expr='nervous')]),
 dict(p=1, f=.35, plate='party_apt', cam=ECU(1050, y=730), chars=[ch('peter', 1050, view='front', expr='scared', talk=True)], pops=[pop('"MAYNARD."', .6, dur=3)]),
 dict(p=1, f=.7, plate='nyc_roof', cam=cam([1.4, 1.6], 1280, 800), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='happy', talk=True), ch('peter', 1100, view='threequarter', expr='teary')], grade=['#f0c080', .25]),
])
# 07 PUBERTY
A[7] = ('PUBERTY PART TWO', [
 dict(p=0, plate='sad_apt', title=['PART 7', 'Spider Puberty'], cam=MS(), props=[dict(k='orb', x=1700, y=850, s=1.1, text='ARACHNID HORMONES: SURGING')], chars=[ch('peter', 1100, view='threequarter', expr='shock')]),
 dict(p=0, f=.5, plate='sad_apt', cam=CU(1100), chars=[ch('peter', 1100, view='threequarter', expr='disgust', pose='facepalm')], pops=[pop('THE TALK: SPIDER EDITION', .6)]),
 dict(p=1, plate='nyc_roof', cam=cam([1.3, 1.5], 1100, 800, shake=2), props=[dict(k='web', x=1250, y=900, x2=1900, y2=500, splat=True), dict(k='splat', x=1900, y=500, s=1, bird=True)], chars=[ch('spidey', 1100, view='threequarter', expr='horror', pose='point')]),
 dict(p=1, f=.35, plate='nyc_roof', cam=cam([1.6, 1.4], 1300, 800, shake=6), props=[dict(k='splat', x=600, y=600, s=1.2), dict(k='splat', x=2000, y=700, s=1, bird=True), dict(k='splat', x=1500, y=400, s=.8)], chars=[ch('spidey', 1300, view='front', expr='furious', talk=True, pose='armsUp')], pops=[pop('"WEB! STOP! WEB! STOP!"', .2)]),
 dict(p=1, f=.7, plate='nyc_roof', cam=cam([2.6, 3.0], 1280, 760, rot=[-6, 6]), chars=[ch('spidey', 1280, view='front', expr='dizzy')], pops=[pop('PREMATURE WEBULATION', .4)]),
])
# 08 SCORPION AND THE GIRL
A[8] = ('SCORPION AND THE GIRL', [
 dict(p=0, plate='data_center', title=['PART 8', 'The Girl in Your Head'], cam=cam([1.1, 1.4], 1280, 820, shake=3), chars=[ch('scorpion', 1600, view='threequarter', dir=-1, expr='smug', pose='point'), ch('spidey', [600, 1000], view='threequarter', expr='determined', pose='fist')], grade=['#a02020', .15]),
 dict(p=0, f=.4, plate='data_center', cam=MS(1300), chars=[ch('dewolff', 1700, view='threequarter', dir=-1, expr='furious', talk=True, pose='point'), ch('spidey', 1100, view='threequarter', expr='sad', pose='shrug')], pops=[pop('"YOU ALMOST KILLED A COP"', .4)]),
 dict(p=1, plate='data_center', cam=cam([3.0, 3.5], 1280, 740), chars=[ch('jean', 1280, view='front', expr='smug')], props=[dict(k='aura', x=1280, y=760, s=.5, col='255,140,40')]),
 dict(p=1, f=.4, plate='data_center', cam=MS(), chars=[ch('jean', 1400, view='threequarter', dir=-1, expr='smug', pose='hip')], cards=[card('THE TELEPATH', 'Move: "Body Hop"', 'BRAIN', 'WEAKNESS: 33-FOOT RANGE', ['🧠', '🔥'], ['TEEN', 'RENT-FREE'])]),
])
# 09 PROFESSOR
A[9] = ('THE PROFESSOR', [
 dict(p=0, plate='lecture_hall', title=['PART 9', 'The Professor'], cam=WIDE(), chars=[ch('banner', 1280, expr='happy', talk=True, pose='talk'), ch('ned', 2000, view='threequarter', dir=-1, expr='excited', pose='wave')]),
 dict(p=0, f=.5, plate='lecture_hall', cam=CU(1280), props=[dict(k='inhibitor', onHead=0, dy=120, s=.6)], chars=[ch('banner', 1280, view='threequarter', expr='nervous', talk=True)], pops=[pop('PARENTAL CONTROLS: ON HIMSELF', .6)]),
 dict(p=1, plate='lecture_hall', cam=cam([1.6, 1.75], 1300, 800), chars=[ch('peter', 1000, view='back', expr='nervous'), ch('banner', 1550, view='threequarter', dir=-1, expr='skeptical', talk=True)]),
 dict(p=1, f=.4, plate='lecture_hall', cam=MCU(1050), chars=[ch('peter', 1050, view='threequarter', expr='grimace', talk=True, pose='shrug')], pops=[pop('FAKE NAME: "NED LEEDS"', .4)]),
 dict(p=1, f=.75, plate='lecture_hall', cam=MS(), chars=[ch('peter', [1100, 600], view='threequarter', dir=-1, expr='embarrassed')], pops=[pop('LIBRARY IS THE OTHER WAY', .4)]),
])
# 10 RACE
A[10] = ('THE RACE FOR MJ', [
 dict(p=0, plate='sad_apt', title=['PART 10', 'The Race'], cam=MS(), chars=[ch('driver', 1500, view='threequarter', dir=-1, expr='smug', talk=True, pose='cross'), ch('spidey', 1000, view='threequarter', expr='angry')]),
 dict(p=0, f=.4, plate='sad_apt', cam=CU(1500), props=[dict(k='letter', on=0, s=.9)], chars=[ch('driver', 1500, view='threequarter', dir=-1, expr='smug', talk=True, pose='hold')], pops=[pop('"A PARODY OF A SAD SINGLE GUY"', .3)]),
 dict(p=1, plate='nyc_roof', cam=cam([1.0, 1.3], 900, 820), props=[dict(k='web', x=900, y=500, x2=1300, y2=-200)], chars=[ch('spidey', [600, 1500], y=[1270, 1000], view='side', expr='determined', pose='swing')]),
 dict(p=1, f=.35, plate='avenue', cam=cam([1.3, 1.6], 1280, 800), chars=[ch('driver', 900, view='threequarter', expr='smug', pose='wave'), ch('mj', 1700, view='threequarter', dir=-1, expr='neutral')], pops=[pop('RANGE: 33 FT', .5), pop('JUST LIKE MY EX', 2)]),
 dict(p=1, f=.7, plate='mj_apt', cam=MS(), chars=[ch('mj', 1650, view='threequarter', dir=-1, expr='scared', talk=True, pose='armsUp'), ch('spidey', 1000, view='threequarter', expr='determined', pose='point')]),
])
# 11 ROOFTOP
A[11] = ('THE ROOFTOP', [
 dict(p=0, plate='tower_roof', title=['PART 11', 'The Worst Kiss in Marvel'], cam=WIDE(), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='sad', talk=True), ch('spidey', 1100, view='threequarter', expr='nervous')]),
 dict(p=0, f=.45, plate='tower_roof', cam=CU(1450), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='teary', talk=True)]),
 dict(p=0, f=.75, plate='tower_roof', cam=cam([2.0, 2.4], 1270, 780), chars=[ch('peter', 1150, view='threequarter', expr='teary'), ch('mj', 1400, view='threequarter', dir=-1, expr='love')], pops=[pop('♥', .8)]),
 dict(p=1, plate='tower_roof', cam=ECU(1400, y=720), chars=[ch('mj', 1400, view='threequarter', dir=-1, expr='smug')], props=[dict(k='aura', x=1400, y=740, s=.4, col='255,140,40')], pops=[pop('PLOT TWIST', .3)]),
 dict(p=1, f=.5, plate='tower_roof', cam=MS(), chars=[ch('peter', 1100, view='threequarter', expr='horror'), ch('mj', 1500, view='threequarter', dir=-1, expr='smug', pose='hip')], pops=[pop('CONSENT: BUFFERING', .5)]),
 dict(p=2, plate='tower_roof', cam=cam([1.3, 1.6], 1700, 820, rot=[-5, -8]), chars=[ch('mj', [1700, 2150], view='threequarter', expr='smug', pose='walk')]),
 dict(p=2, f=.4, plate='tower_roof', cam=cam([1.5, 1.3], 1500, 800, shake=4), chars=[ch('peter', 1500, view='front', expr='crying', talk=True, pose='armsUp')], pops=[pop('"YOU WIN. I QUIT."', .4)]),
])
# 12 FRANK'S HOUSE
A[12] = ('FRANK\'S HOUSE', [
 dict(p=0, plate='frank_ext', title=['PART 12', 'Frank\'s House'], cam=WIDE(), chars=[ch('frank', 1400, view='front', expr='furious', pose='cross'), ch('spidey', 900, view='threequarter', expr='nervous', talk=True, pose='point')]),
 dict(p=0, f=.5, plate='frank_ext', cam=CU(1400), chars=[ch('frank', 1400, view='threequarter', dir=-1, expr='annoyed', talk=True)], pops=[pop('"STILL ON STATEN ISLAND?"', .4)]),
 dict(p=1, plate='frank_kitchen', cam=MS(), props=[dict(k='chili', x=1850, y=1080, s=1)], chars=[ch('frank', 1500, view='threequarter', dir=-1, expr='deadpan', talk=True, pose='talk'), ch('mj', 950, view='threequarter', expr='disgust')], pops=[pop('THAT\'S THREE RULES, FRANK', 2)]),
 dict(p=1, f=.55, plate='frank_kitchen', cam=ECU(1850, y=1000), props=[dict(k='chili', x=1850, y=1080, s=1.3)], pops=[pop('DO NOT EAT THE CHILI', .3)]),
 dict(p=2, plate='frank_kitchen', cam=MCU(1250), props=[dict(k='inhibitor', x=1250, y=1050, s=1, hot=True)], chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='determined', talk=True, pose='point'), ch('spidey', 1050, view='threequarter', expr='shock')]),
 dict(p=2, f=.6, plate='frank_kitchen', cam=cam([2.5, 2.9], 1450, 760), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='happy', talk=True)], grade=['#f0b070', .18]),
])
# 13 COFFEE
A[13] = ('COFFEE WITH FRANK', [
 dict(p=0, plate='frank_porch', title=['PART 13', 'Coffee With Frank'], cam=MS(), props=[dict(k='coffee', on=1, s=.9)], chars=[ch('frank', 1550, view='threequarter', dir=-1, expr='skeptical', talk=True), ch('spidey', 1050, view='threequarter', expr='happy', pose='hold')], grade=['#f0a0a0', .15]),
 dict(p=0, f=.5, plate='frank_porch', cam=CU(1550), chars=[ch('frank', 1550, view='threequarter', dir=-1, expr='annoyed', talk=True)], pops=[pop('"GOOFIEST THING I EVER SAW"', .3)]),
 dict(p=1, plate='frank_porch', cam=cam([3.0, 3.6], 1550, 740), chars=[ch('frank', 1550, view='front', expr='sad', talk=True)], grade=['#3050a0', .1]),
 dict(p=1, f=.55, plate='frank_porch', cam=MCU(1050), chars=[ch('spidey', 1050, view='threequarter', expr='teary')]),
 dict(p=1, f=.85, plate='frank_porch', cam=MS(), props=[dict(k='phone', on=0, s=.9)], chars=[ch('spidey', 1050, view='threequarter', expr='shock', pose='hold'), ch('frank', 1550, view='threequarter', dir=-1, expr='annoyed')], pops=[pop('RUDE TIMING, PHONE', .3)]),
])
# 14 HULK
A[14] = ('THE HULK FIGHT', [
 dict(p=0, plate='atrium', title=['PART 14', 'Hulk Smash'], cam=WIDE(), chars=[ch('jean', 1500, view='threequarter', dir=-1, expr='smug', pose='point'), ch('banner', 1000, view='threequarter', expr='scared')]),
 dict(p=0, f=.4, plate='atrium', cam=cam([1.0, 0.95], 1280, 760, shake=10), chars=[ch('hulk', 1280, s=1.15, view='front', expr='furious', pose='armsUp')], props=[dict(k='smoke', x=1280, y=1250, s=1.6)]),
 dict(p=0, f=.75, plate='atrium', cam=cam([1.05, 1.0], 1280, 780), chars=[ch('hulk', 1500, s=1.15, view='threequarter', dir=-1, expr='angry', pose='fist'), ch('spidey', 800, view='threequarter', expr='scared', pose='shrug')], cards=[card('BIG GREEN GUY', 'Move: "Yes"', 'ANGER', 'WEAKNESS: LULLABIES', ['💚', '👖'], ['PURPLE SHORTS', 'NO NAP'], side='L')]),
 dict(p=1, plate='atrium', cam=MS(1100, shake=4), props=[dict(k='gunBig', on=0, s=1.2)], chars=[ch('frank', 1100, view='threequarter', expr='furious', talk=True, pose='hold'), ch('spidey', 1550, view='threequarter', dir=-1, expr='shock', talk=True, pose='armsUp')]),
 dict(p=1, f=.55, plate='atrium', cam=CU(1100), chars=[ch('frank', 1100, view='threequarter', expr='smug', talk=True)], pops=[pop('"DAFFODIL"', .4)]),
 dict(p=2, plate='atrium', cam=cam([1.1, 1.3], 1300, 800, shake=6), props=[dict(k='inhibitor', x=[900, 1500], y=[1000, 800], s=1, hot=True)], chars=[ch('hulk', 1650, s=1.15, view='threequarter', dir=-1, expr='furious', pose='fist'), ch('spidey', 900, view='side', expr='determined', pose='point')], pops=[pop('INHIBITOR CANNOT ATTACH', .8), pop('(SAME)', 2.4)]),
 dict(p=3, plate='atrium', cam=cam([2.2, 2.6], 1380, 720), chars=[ch('hulk', 1550, s=1.15, view='threequarter', dir=-1, expr='teary'), ch('spidey', 1200, view='threequarter', expr='sad', talk=True, pose='talk')], grade=['#5080c0', .12]),
 dict(p=3, f=.6, plate='atrium', cam=MS(), chars=[ch('jean', 1280, view='front', expr='dizzy', pose='crouch'), ch('frank', 1800, view='threequarter', dir=-1, expr='smug', pose='cross')], pops=[pop('"...SARA."', .8)]),
])
# 15 MASK OFF
A[15] = ('THE MASK COMES OFF', [
 dict(p=0, plate='frank_kitchen', title=['PART 15', 'The Mask Comes Off'], cam=MS(), props=[dict(k='letter', on=0, s=.9)], chars=[ch('mj', 1550, view='threequarter', dir=-1, expr='angry', talk=True, pose='hold'), ch('spidey', 1050, view='threequarter', expr='scared')]),
 dict(p=0, f=.45, plate='frank_kitchen', cam=CU(1050), chars=[ch('peter', 1050, view='threequarter', expr='teary', talk=True)]),
 dict(p=0, f=.75, plate='frank_kitchen', cam=CU(1550), chars=[ch('mj', 1550, view='threequarter', dir=-1, expr='annoyed', talk=True, pose='cross')]),
 dict(p=1, plate='frank_kitchen', cam=cam([2.6, 3.2], 1550, 740), chars=[ch('mj', 1550, view='front', expr='sad', talk=True)], grade=['#3050a0', .15]),
 dict(p=1, f=.55, plate='frank_kitchen', cam=ECU(1050, y=720), chars=[ch('peter', 1050, view='front', expr='crying')], pops=[pop('EMOTIONAL DAMAGE', .6)], grade=['#3050a0', .15]),
])
# 16 NED
A[16] = ('NED MEETS SPIDER-MAN', [
 dict(p=0, plate='mj_apt', title=['PART 16', 'Ned Meets Spider-Man'], cam=WIDE(), props=[dict(k='phone', on=0, s=.9)], chars=[ch('ned', 1550, view='threequarter', dir=-1, expr='excited', pose='hold'), ch('spidey', 1050, view='threequarter', expr='nervous', pose='wave'), ch('mj', 700, view='threequarter', expr='deadpan')], pops=[pop('"HEY, I\'M NEARBY!" x 40', .5)]),
 dict(p=1, plate='mj_apt', cam=CU(1550), chars=[ch('ned', 1550, view='threequarter', dir=-1, expr='starstruck' if False else 'excited', talk=True, pose='talk')], pops=[pop('"HOW DO YOU PEE MID-SWING?"', .4)]),
 dict(p=1, f=.6, plate='mj_apt', cam=MCU(1050), chars=[ch('spidey', 1050, view='threequarter', expr='grimace')]),
 dict(p=2, plate='mj_apt', cam=MS(), chars=[ch('ned', 1550, view='threequarter', dir=-1, expr='happy', talk=True, pose='point'), ch('spidey', 1050, view='threequarter', expr='shock')], pops=[pop('5 BANH MI. SPIDEY WILL BE FED.', 2.5)]),
 dict(p=3, plate='mj_apt', cam=cam([2.0, 2.4], 1300, 780), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='neutral', talk=True), ch('spidey', 1150, view='threequarter', expr='skeptical')]),
 dict(p=3, f=.55, plate='mj_apt', cam=ECU(1150, y=730), chars=[ch('spidey', 1150, view='front', expr='determined')], pops=[pop('METZGER LIED', .5)]),
])
# 17 SARA
A[17] = ('SARA', [
 dict(p=0, plate='park', title=['PART 17', 'Sara'], cam=WIDE(), chars=[ch('sara', 1100, view='threequarter', expr='happy', talk=True, pose='talk'), ch('jeanKid' if False else 'jean', 1550, s=1.15, view='threequarter', dir=-1, expr='joy')], grade=['#f0c080', .2]),
 dict(p=0, f=.3, plate='park', cam=CU(1300), chars=[ch('sara', 1150, view='threequarter', expr='laugh'), ch('jean', 1450, s=1.15, view='threequarter', dir=-1, expr='laugh')], grade=['#f0c080', .2]),
 dict(p=0, f=.5, plate='park', cam=cam([1.2, 1.0], 1280, 800, shake=8), chars=[ch('ninja', 800, view='threequarter', expr='angry', pose='point'), ch('sara', 1250, view='front', expr='horror', pose='armsUp'), ch('metzger', 1900, view='threequarter', dir=-1, expr='smug', pose='cross')], fx=['flash']),
 dict(p=0, f=.75, plate='white_cell', cam=cam([1.6, 1.9], 1280, 780), chars=[ch('jean', 1100, view='front', expr='furious'), ch('metzger', 1600, view='threequarter', dir=-1, expr='happy', talk=True, pose='talk')], pops=[pop('"YOU\'RE GOING TO CHANGE THE WORLD"', .3)]),
])
# 18 V-MAX
A[18] = ('V-MAX', [
 dict(p=0, plate='corridor', title=['PART 18', 'V-Max'], cam=MS(), chars=[ch('spidey', 1050, view='threequarter', expr='happy', talk=True, pose='armsUp'), ch('ninja', 1550, view='threequarter', dir=-1, expr='angry', pose='fist'), ch('ninja', 1850, view='threequarter', dir=-1, expr='angry', pose='hip', ph=1.3)], pops=[pop('"YOU A BIG STRETCHER?"', .6)]),
 dict(p=0, f=.5, plate='lab', cam=cam([1.4, 1.6], 1280, 800), chars=[ch('metzger', 1700, view='threequarter', dir=-1, expr='smug', talk=True, pose='talk'), ch('jean', 1000, view='front', expr='angry')], props=[dict(k='aura', x=1000, y=900, s=.8, col='255,140,40')]),
 dict(p=1, plate='lab', cam=cam([1.2, 1.35], 1280, 800, rot=[3, 7], shake=3), props=[dict(k='aura', x=1280, y=900, s=1.4, col='255,120,40')], chars=[ch('jeanGlow' if False else 'jean', 1280, y=[1270, 1150], view='front', expr='furious', pose='armsUp')]),
 dict(p=1, f=.45, plate='lab', cam=ECU(1280, y=700), chars=[ch('jean', 1280, view='front', expr='furious', talk=True)], pops=[pop('"THE LAST THING MY SISTER SAW"', .3)]),
 dict(p=1, f=.75, plate='hospital_ext', cam=cam([1.0, 1.25], 1280, 820), chars=[ch('driver', 600, view='front', expr='smug'), ch('dewolff', 1000, view='front', expr='smug', ph=.7), ch('ned', 1500, view='front', expr='smug', ph=1.4), ch('driver', 1950, view='front', expr='smug', ph=2.1)], pops=[pop('33 FT? MORE LIKE 3,300', .5)], grade=['#ff8040', .15]),
])
# 19 PETER OR SPIDEY
A[19] = ('PETER OR SPIDER-MAN', [
 dict(p=0, plate='lab', title=['PART 19', 'Peter or Spider-Man'], cam=MS(), chars=[ch('jean', 1600, y=1200, view='threequarter', dir=-1, expr='angry', talk=True, pose='point'), ch('spidey', 1000, view='threequarter', expr='determined')], props=[dict(k='aura', x=1600, y=850, s=.9, col='255,120,40')]),
 dict(p=0, f=.5, plate='lab', cam=ECU(1000, y=720), chars=[ch('spidey', 1000, view='front', expr='determined', talk=True)], pops=[pop('"BOTH."', .3)]),
 dict(p=1, plate='nyc_roof', cam=cam([1.6, 2.0], 1280, 780), chars=[ch('may', 1450, view='threequarter', dir=-1, expr='happy', talk=True, pose='talk'), ch('peter', 1050, s=1.2, view='threequarter', expr='teary')], grade=['#ffe0a0', .3]),
 dict(p=1, f=.5, plate='lab', cam=CU(1550), chars=[ch('jean', 1550, view='threequarter', dir=-1, expr='teary', pose='idle')]),
 dict(p=1, f=.75, plate='lab', cam=cam([1.8, 2.0], 1300, 800), chars=[ch('peter', 1100, view='threequarter', expr='sad', talk=True, pose='talk'), ch('jean', 1500, view='threequarter', dir=-1, expr='crying')]),
 dict(p=2, plate='lab', cam=cam([1.0, 1.15], 1280, 820), chars=[ch('peter', 1280, view='front', expr='shock', pose='armsUp')], fx=['flash'], pops=[pop('BANG', .1)]),
])
# 20 BULLET
A[20] = ('THE BULLET', [
 dict(p=0, plate='lab', title=['PART 20', 'The Bullet'], cam=cam([1.5, 1.8], 1280, 860), chars=[ch('peter', 1150, y=1300, view='side', expr='sleepy', pose='lie' if False else 'crouch'), ch('jean', 1450, view='threequarter', dir=-1, expr='crying', pose='hold')], props=[dict(k='aura', x=1300, y=1150, s=.7, col='255,170,80')], grade=['#304080', .2]),
 dict(p=0, f=.5, plate='hospital_ext', cam=cam([1.0, 1.3], 1280, 820), props=[dict(k='candles', x=1280, y=1250, w=2000, n=60)], chars=[ch('ned', 800, view='front', expr='teary'), ch('dewolff', 1700, view='front', expr='sad')], grade=['#304080', .2]),
 dict(p=1, plate='hospital_room', cam=MS(), chars=[ch('frank', 1550, view='threequarter', dir=-1, expr='teary', talk=True, pose='cross'), ch('peter', 1050, view='threequarter', expr='sleepy')]),
 dict(p=1, f=.5, plate='hospital_room', cam=CU(1550), chars=[ch('frank', 1550, view='threequarter', dir=-1, expr='crying', talk=True)], pops=[pop('FRANK HAS FEELINGS', .4), pop('(DO NOT TELL HIM)', 2)]),
 dict(p=1, f=.8, plate='hospital_room', cam=MCU(1050), chars=[ch('peter', 1050, view='threequarter', expr='joy', talk=True)], pops=[pop('"ARE WE FRIENDS NOW?"', .3)]),
])
# 21 ENDING
A[21] = ('THE ENDING', [
 dict(p=0, plate='hospital_ext', title=['PART 21', 'Brand New Day'], cam=cam([1.0, 1.3], 1280, 820), props=[dict(k='web', x=1280, y=700, x2=1700, y2=-200)], chars=[ch('spidey', 1280, y=[1270, 900], view='front', expr='joy', pose='swing'), ch('ned', 600, view='threequarter', expr='excited', pose='armsUp'), ch('dewolff', 2000, view='threequarter', dir=-1, expr='happy', pose='wave')]),
 dict(p=0, f=.5, plate='cemetery', cam=cam([1.6, 1.9], 1280, 800), chars=[ch('peter', 1280, view='threequarter', expr='teary', talk=True, pose='pockets')], grade=['#ffc080', .25]),
 dict(p=1, plate='coffee_shop', cam=MS(), chars=[ch('mj', 1550, view='threequarter', dir=-1, expr='skeptical', talk=True, pose='hold'), ch('peter', 1050, view='threequarter', expr='nervous')], props=[dict(k='coffee', on=0, s=.9)]),
 dict(p=1, f=.45, plate='coffee_shop', cam=CU(1050), chars=[ch('peter', 1050, view='threequarter', expr='happy', talk=True)], pops=[pop('"I\'M PETER."', .5)]),
 dict(p=1, f=.75, plate='coffee_shop', cam=cam([1.5, 1.0], 1280, 820), chars=[ch('mj', 1450, view='threequarter', dir=-1, expr='happy'), ch('peter', 1100, view='threequarter', expr='joy')], pops=[pop('LOCATION FOUND', .4), pop('MAYNARD IS DEAD. LONG LIVE PETER.', 2.4)]),
])
# 22 OUTRO
A[22] = ('OUTRO', [
 dict(p=0, plate='nyc_roof', cam=cam([1.3, 1.5], 1280, 800), chars=[ch('spidey', 900, view='threequarter', expr='laugh', talk=True, pose='wave'), ch('frank', 1650, view='threequarter', dir=-1, expr='annoyed', pose='cross')], pops=[pop('SUBSCRIBE (SOMEONE WILL REMEMBER YOU)', 2.5, dur=4)]),
 dict(p=0, f=.7, plate='nyc_roof', cam=cam([1.1, 1.0], 1280, 820), chars=[ch('spidey', 1280, view='front', expr='joy', pose='wave')], fadeOut=True),
])
os.makedirs('acts', exist_ok=True)
for n, (t, shots) in A.items():
    for s_ in shots:
        if s_.get('plate','').endswith('_roof'): s_['props'] = [dict(k='roof', x=1280, y=1262, layer='back')] + s_.get('props', [])
    open(f'acts/act{n:02d}.js', 'w').write(f'// Act {n:02d}: {t}\nwindow.ACT = {{ timing: window.TIMING, shots: ' + json.dumps(shots, ensure_ascii=False) + '};\n')
print(len(A), 'acts', sum(len(s) for _, s in A.values()), 'shots')
