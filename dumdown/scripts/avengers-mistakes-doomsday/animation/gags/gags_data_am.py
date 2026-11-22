# DumDown Avengers Mistakes gags, built INSIDE the acts (Pushpam 22 Nov): 'key' links to the script marker; act/p filled by mk_timing.py.
# Item kinds: [WHO, text] | ['sfx', name, gain_db] | ['wait', s] | ['laugh', kind]. Every voice = narrator voice (Chatterbox + Fenrir) varied.
V = {
  'DOOM': (.35, .8, .9, 'deep'), 'BRUCE': (.7, 1.04, 1.02, ''), 'HOST': (.95, 1.08, 1.06, ''), 'KID': (.9, 1.45, 1.06, ''),
  'FURY': (.5, .84, .95, ''), 'WIZ': (.55, .9, .96, ''), 'PETER': (.9, 1.25, 1.04, ''), 'TONY': (.75, 1.0, 1.04, ''),
  'LOKI': (.7, 1.06, .98, ''), 'ROBO': (.5, .96, .92, 'robot'), 'BOSS': (.8, 1.16, 1.0, ''), 'KEVIN': (.9, 1.22, 1.04, ''),
  'GARY': (.9, 1.04, 1.0, ''), 'SPEAKER': (.4, 1.0, .96, 'radio'), 'MASC': (1.0, 1.3, 1.0, ''),
}
G = [
 dict(id=1, key='GAG 1', title="GRANDMA'S PARCEL", music='sitcom', items=[['sfx', 'shopbell', -4], ['wait', .5], ['DOOM', 'Delivery. Sign here.'], ['sfx', 'paper', -6], ['wait', 1.0], ['sfx', 'footsteps', -10], ['wait', .6], ['DOOM', 'Thank you.'], ['sfx', 'dundun', -6], ['wait', .5]]),
 dict(id=2, key='THANKS 12', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['wait', .4]]),
 dict(id=3, key='THANKS 11', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['sfx', 'ding', -10], ['wait', .4]]),
 dict(id=4, key='GAG A', title='SHOPPING CHANNEL', music='infomercial', items=[['HOST', 'Seven thousand years of NOT helping!'], ['sfx', 'airhorn', -10], ['HOST', 'Only three easy payments! Call now!'], ['sfx', 'cash', -6], ['laugh', 'mid'], ['wait', .6]]),
 dict(id=5, key='GAG 2', title='HIDE AND SEEK', music='sitcom', items=[['DOOM', 'Eight. Nine. Ten. Found you.'], ['sfx', 'ding', -6], ['wait', .4], ['BRUCE', 'Best out of three?'], ['laugh', 'mid'], ['wait', .5]]),
 dict(id=6, key='GAG B', title='THE PHONE CALL', music='none', items=[['sfx', 'phone_ring', -6], ['wait', 1.4], ['sfx', 'phone_ring', -6], ['wait', 1.2], ['sfx', 'crickets', -8], ['wait', 1.2], ['laugh', 'small'], ['wait', .4]]),
 dict(id=7, key='THANKS 9', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['sfx', 'paper', -10], ['wait', .5]]),
 dict(id=8, key='GAG C', title='STILL WAITING', music='none', items=[['sfx', 'engine', -14], ['KID', 'Are we there yet?'], ['FURY', 'Twenty more years.'], ['wait', .3], ['KID', 'You said that twenty years ago.'], ['sfx', 'rimshot', -6], ['laugh', 'big'], ['wait', .4]]),
 dict(id=9, key='GAG 3', title='TERMS AND CONDITIONS', music='harp', items=[['sfx', 'paper_tear', -12], ['wait', 1.6], ['WIZ', 'Hmm. Page four thousand. Do not interrupt.'], ['wait', .3], ['PETER', 'Oops.'], ['sfx', 'sad_trombone', -6], ['wait', .5]]),
 dict(id=10, key='THANKS 7', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['wait', .4]]),
 dict(id=11, key='GAG D', title='INSTRUCTIONS', music='lounge', items=[['WIZ', "Step one. Don't."], ['sfx', 'paper', -6], ['wait', .5], ['sfx', 'crunch', -4], ['WIZ', 'Ow!'], ['sfx', 'ding', -6], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=12, key='GAG 4', title='THE GROUP CHAT', music='lounge', items=[['sfx', 'beep', -12], ['wait', .9], ['sfx', 'beep', -12], ['wait', .7], ['sfx', 'beep', -12], ['wait', .9], ['sfx', 'beep', -12], ['wait', 1.8], ['sfx', 'beep', -12], ['wait', 1.4], ['sfx', 'dundun', -8], ['DOOM', 'Thank you.'], ['laugh', 'small'], ['wait', .4]]),
 dict(id=13, key='THANKS 5', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['sfx', 'boing', -12], ['wait', .4]]),
 dict(id=14, key='GAG E', title='AIRPORT', music='none', items=[['sfx', 'chime', -8], ['SPEAKER', 'Attention passengers. Flight twenty sixteen, to being friends again, has been cancelled.'], ['wait', .5], ['SPEAKER', 'Forever.'], ['sfx', 'sad_trombone', -6], ['wait', .5]]),
 dict(id=15, key='GAG 5', title='WELCOME BACK', music='sitcom', items=[['BOSS', "Oh, hi Gary. You've been gone five years."], ['BOSS', "Your stapler is now Kevin's."], ['KEVIN', 'Hi.'], ['sfx', 'slurp', -6], ['wait', .4], ['GARY', 'Pfffft!'], ['laugh', 'big'], ['wait', .4]]),
 dict(id=16, key='THANKS 3', title='THANKS', music='none', items=[['sfx', 'tick', -2], ['DOOM', 'Thank you.'], ['sfx', 'sad_trombone', -8], ['wait', .4]]),
 dict(id=17, key='GAG F', title='ROBOT READS THE COMMENTS', music='tension', items=[['sfx', 'typing', -12], ['ROBO', 'Humans. Argue about pineapple on pizza. For eleven years.'], ['wait', .5], ['ROBO', 'Yes. Destroy.'], ['sfx', 'alarm', -10], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=18, key='GAG 6', title='LOST AND FOUND', music='none', items=[['TONY', 'Hi. We lost a glowing blue cube?'], ['LOKI', 'This one?'], ['sfx', 'whoosh', -6], ['wait', .8], ['sfx', 'bell', -6], ['wait', .4], ['sfx', 'crickets', -10], ['wait', .9], ['laugh', 'small']]),
 dict(id=19, key='THANKS 1', title='THANKS', music='newsreel', items=[['sfx', 'crowd_cheer', -10], ['wait', .8], ['DOOM', 'Thank you.'], ['wait', .8]]),
 dict(id=20, key='GAG G', title='THE DANCE', music='sitcom', items=[['sfx', 'scratch', -4], ['wait', 3.0], ['laugh', 'big'], ['wait', .6]]),
 dict(id=21, key='GAG 7', title='THE BILL', music='none', items=[['sfx', 'shopbell', -4], ['DOOM', 'Your popcorn.'], ['sfx', 'coins', -6], ['wait', .5], ['DOOM', 'Thank you.'], ['sfx', 'dundun', -6], ['wait', .6]]),
]
