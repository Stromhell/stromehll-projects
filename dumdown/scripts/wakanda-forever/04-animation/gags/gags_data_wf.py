# DumDown Wakanda Forever gags, built INSIDE the acts (Pushpam 22 Nov): 'key' links to the script marker (🤡 GAG n).
# Item kinds: [WHO, text] | ['sfx', name, gain_db] | ['wait', s] | ['laugh', kind]. Every voice = narrator voice (Chatterbox + Fenrir) varied.
V = {
  'OKOYE': (.5, .93, .97, ''), 'SAILOR': (.35, .9, .92, ''), 'SHURI': (.8, 1.2, 1.04, ''), 'GRIOT': (.35, 1.0, .95, 'robot'),
  'NAMOR': (.4, .9, .95, ''), 'MBAKU': (.85, .82, .97, 'deep'), 'RIRI': (.9, 1.25, 1.06, ''), 'EAGLE': (.55, 1.06, 1.0, ''),
  'ROSS': (.75, 1.12, 1.06, ''), 'HOST': (.95, 1.04, 1.06, ''), 'VAL': (.6, 1.16, 1.0, ''), 'JABARI': (.7, .9, 1.0, ''),
}
SPEAKERS = list(V)
G = [
 dict(id=1, key='GAG 1', title='OKOYE REVIEWS', music='gameshow', items=[['wait', .6], ['sfx', 'buzzer', -8], ['wait', .9], ['sfx', 'buzzer', -8], ['wait', .9], ['sfx', 'buzzer', -8], ['wait', .7], ['sfx', 'honk', -6], ['sfx', 'buzzer', -8], ['wait', 1.0], ['sfx', 'dingding', -4], ['wait', .5], ['OKOYE', 'Precise. Elegant. It stays.'], ['laugh', 'small'], ['wait', .5]]),
 dict(id=2, key='GAG 2', title='SIREN SINGERS', music='none', items=[['sfx', 'robosing', -8], ['wait', 1.2], ['sfx', 'thud', -4], ['wait', .4], ['sfx', 'thud', -4], ['wait', .7], ['SAILOR', 'Nope.'], ['wait', .3], ['SAILOR', 'Pitchy.'], ['sfx', 'rimshot', -8], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=3, key='GAG 3', title='OBEDIENT AI', music='none', items=[['SHURI', 'GRIOT, clean my room.'], ['wait', .4], ['GRIOT', 'As you wish, Princess.'], ['wait', 1.6], ['sfx', 'crickets', -10], ['wait', .8], ['sfx', 'sad_trombone', -8], ['laugh', 'small'], ['wait', .4]]),
 dict(id=4, key='GAG 4', title='ANKLE WING FLIGHT SCHOOL', music='harp', items=[['NAMOR', "Today, we fly. With our feet."], ['wait', .5], ['sfx', 'boing', -6], ['wait', .35], ['sfx', 'boing', -6], ['wait', .35], ['sfx', 'boing', -6], ['wait', .5], ['NAMOR', "It's all in the ankles."], ['sfx', 'slurp', -8], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=5, key='GAG 5', title='ROAST BATTLE', music='none', items=[['sfx', 'mic', -10], ['MBAKU', 'Your head is so shiny, planes land on it.'], ['sfx', 'ooh', -6], ['wait', .5], ['OKOYE', 'Your cape smells like a wet goat.'], ['sfx', 'ooh', -6], ['wait', .8], ['sfx', 'scratch', -8], ['wait', .4], ['laugh', 'big'], ['wait', .4]]),
 dict(id=6, key='GAG 6', title='HOMEWORK SHOP', music='lounge', items=[['sfx', 'shopbell', -6], ['RIRI', 'Welcome to Homework R Us.'], ['wait', .6], ['sfx', 'whoosh', -8], ['wait', .4], ['sfx', 'cash', -4], ['RIRI', 'Government pricing.'], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=7, key='GAG 7', title='FREE FALL HOMEWORK', music='none', items=[['sfx', 'wind_loop', -12], ['EAGLE', 'Question four is wrong. Show your working.'], ['wait', .3], ['RIRI', "I'm literally falling!"], ['EAGLE', 'Still wrong.'], ['sfx', 'rimshot', -8], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=8, key='GAG 8', title='EIGHT HOUR RIDE', music='hold', items=[['sfx', 'crunch', -6], ['wait', 1.0], ['sfx', 'crunch', -6], ['wait', 1.0], ['sfx', 'chime', -8], ['wait', 1.0], ['sfx', 'chime', -8], ['wait', .6], ['ROSS', 'This is my car.'], ['laugh', 'small'], ['wait', .4]]),
 dict(id=9, key='GAG 9', title='KIDNAP DRESS CODE', music='runway', items=[['HOST', 'Captive Fashion Week!'], ['sfx', 'camera_burst', -8], ['wait', 1.4], ['HOST', 'And here she is, wearing: being kidnapped.'], ['wait', .3], ['sfx', 'boing', -6], ['laugh', 'big'], ['wait', .4]]),
 dict(id=10, key='GAG 10', title='TALOKAN TOURS', music='harp', items=[['NAMOR', 'Welcome to Talokan. Gift shop on the left.'], ['wait', .4], ['sfx', 'camera_shutter', -4], ['wait', .3], ['NAMOR', 'No flash photography, please. It scares the whales.'], ['laugh', 'small'], ['wait', .4]]),
 dict(id=11, key='GAG 11', title='CIA KITCHEN RAID', music='tension', items=[['sfx', 'door_slam', -8], ['wait', .5], ['VAL', 'Expired.'], ['sfx', 'stamp', -2], ['wait', .5], ['ROSS', 'That oil was a gift!'], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=12, key='GAG 12', title='THE PLAN', music='newsreel', items=[['SHURI', 'Step one: science.'], ['wait', .3], ['sfx', 'swipe', -6], ['SHURI', 'Step two: giant hair dryer.'], ['sfx', 'engine', -10], ['wait', .5], ['MBAKU', 'Can it also do my cape?'], ['laugh', 'big'], ['wait', .4]]),
 dict(id=13, key='GAG 13', title='MOUNTAIN LIBRARY', music='none', items=[['sfx', 'paper', -6], ['wait', .8], ['sfx', 'paper_tear', -2], ['wait', .4], ['JABARI', 'Shhhh!'], ['MBAKU', 'Shh. Chapter seven.'], ['laugh', 'small'], ['wait', .4]]),
 dict(id=14, key='GAG 14', title='GLASS OF WATER', music='none', items=[['NAMOR', 'Water. Please.'], ['wait', .5], ['SHURI', 'Thirsty?'], ['wait', .3], ['sfx', 'gulp', -2], ['wait', .4], ['sfx', 'sad_trombone', -10], ['laugh', 'mid'], ['wait', .4]]),
 dict(id=15, key='GAG 15', title='COLONIZER IN CHAINS', music='none', items=[['sfx', 'camera_shutter', -4], ['wait', .4], ['ROSS', 'Hi.'], ['wait', .6], ['OKOYE', 'Now I have seen everything.'], ['laugh', 'mid'], ['wait', .4]]),
]
