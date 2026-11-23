# DumDown Doomsday trailer breakdown gags, built INSIDE the acts: 'key' links to the script marker (🤡 GAG n).
# Item kinds: [WHO, text] | ['sfx', name, gain_db] | ['wait', s] | ['laugh', kind].
# Voices (Pushpam 23 Nov: no robotic gag voices): Chatterbox cloning from natural reference clips, one distinct ref per character, no pitch shifting.
# V[who] = (exaggeration, speed, pitch, fx, ref)
V = {
  'CAP': (.45, 1, 1, '', 'm_warm'), 'KID': (.6, 1, 1, '', 'kid'), 'PEG': (.5, 1, 1, '', 'f_brit'),
  'SHOP': (.6, 1, 1, '', 'm_old'), 'DOOM': (.4, 1, 1, '', 'm_deep'), 'THOR': (.6, 1, 1, '', 'm_big'),
  'ANT': (.7, 1, 1, '', 'm_young'), 'SUE': (.5, 1, 1, '', 'f_us'), 'BEN': (.55, 1, 1, '', 'm_rock'),
  'MBAKU': (.6, 1, 1, '', 'm_mbaku'), 'LASER': (.45, 1, 1, '', 'm_laser'), 'BLUE': (.5, 1, 1, '', 'm_old'),
  'CARD': (.6, 1, 1, '', 'm_south'), 'STORMI': (.6, 1, 1, '', 'fenrir'),
}
SPEAKERS = list(V)
G = [
 dict(id=1, key='GAG 1', title='THE TALK', music='none', items=[['CAP', 'Son. There is something I need to tell you.'], ['wait', .5], ['KID', 'You were Captain America.'], ['wait', .7], ['CAP', '...How?'], ['wait', .4], ['sfx', 'boing', -10], ['wait', 1.2], ['sfx', 'slurp', -8], ['wait', .8], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=2, key='GAG 2', title='SIX OF US', music='none', items=[['CAP', 'There was me, Tony, Thor, Bruce, Natasha, Clint.'], ['wait', .4], ['KID', 'Where are they now?'], ['wait', 1.6], ['CAP', '...Eat your cereal.'], ['wait', .5], ['sfx', 'crunch', -6], ['wait', .8], ['laugh', 'small'], ['wait', 1.7]]),
 dict(id=3, key='GAG 3', title='MASK SHOP', music='none', items=[['SHOP', 'We have the Doom. The Doom Deluxe. And the Doom with a smile!'], ['wait', .6], ['sfx', 'shopbell', -8], ['wait', .5], ['DOOM', 'There is no Doom with a smile.'], ['wait', .9], ['sfx', 'clang', -6], ['wait', .4], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=4, key='GAG 4', title='CHARGER', music='none', items=[['sfx', 'zap', -6], ['wait', .3], ['sfx', 'pop', -4], ['wait', .6], ['THOR', 'Ninety-eight percent.'], ['wait', 1.2], ['THOR', '...Was ninety-eight percent.'], ['sfx', 'sad_trombone', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=5, key='GAG 5', title='NAME TAGS', music='none', items=[['THOR', 'Ring Guy. Yelena. Ghost. Red... Guardian.'], ['wait', .8], ['THOR', '...Ant.'], ['wait', .3], ['ANT', 'Man! Ant-MAN!'], ['wait', .3], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=6, key='GAG 6', title='HANDSHAKE', music='none', items=[['sfx', 'tick', -10], ['wait', 1.4], ['SUE', 'Guys. The ocean.'], ['wait', .4], ['BEN', 'He should let go.'], ['MBAKU', 'He should let go.'], ['wait', .5], ['sfx', 'splash', -2], ['wait', 1.0], ['laugh', 'big'], ['wait', 1.7]]),
 dict(id=7, key='GAG 7', title='SPANDEX', music='none', items=[['LASER', 'Remember when we used to wear black leather?'], ['wait', .3], ['BLUE', 'We said yellow spandex was silly.'], ['wait', .6], ['CARD', 'I look amazing.'], ['wait', 1.4], ['CARD', '...We look amazing.'], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=8, key='GAG 8', title='SPEECH CONTEST', music='none', items=[['THOR', 'Friends! Heroes! People whose names I do not know!'], ['wait', .4], ['sfx', 'crickets', -10], ['wait', 1.3], ['CAP', "Let's go."], ['sfx', 'crowd_cheer', -6], ['wait', 1.4], ['THOR', 'I had slides.'], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=9, key='GAG 9', title='STRING BOARD', music='none', items=[['sfx', 'stamp', -8], ['wait', .5], ['sfx', 'thud', -6], ['wait', .9], ['STORMI', '...Nailed it.'], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
]
