# DumDown Ironheart S1 cutaway gags. 'act' + 'at' = insertion point (seconds into that act's video; act end = whole act).
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
V = {
  'RIRI': ('af_nova', 1.0, ''), 'NAT': ('af_jessica', 1.0, 'up'), 'PARKER': ('am_fenrir', 1.0, ''), 'JOE': ('am_echo', 1.0, ''),
  'ZEKE': ('am_onyx', .95, 'robot'), 'MEPH': ('bm_fable', 1.0, ''), 'HR': ('af_bella', 1.0, ''), 'HOST': ('am_eric', .9, ''),
  'HOST2': ('am_puck', .88, ''), 'WEATHER': ('af_heart', 1.0, ''), 'OP': ('af_river', 1.12, ''), 'ANN': ('am_onyx', 1.2, 'trailer'),
  'FAST': ('am_liam', .55, ''), 'KID': ('af_sky', 1.0, 'up'), 'GRP': ('am_adam', 1.0, ''), 'GUY2': ('am_santa', 1.0, 'deep'),
  'GUY3': ('bm_lewis', 1.0, ''), 'NARR': ('am_michael', 1.05, ''), 'SMOOTH': ('bm_george', 1.05, ''), 'JING': ('af_kore', .9, 'up'),
}
G = [
 dict(id=1, act=2, at=34.6, title='HOMEWORK BY RIRI', set='homework', music='infomercial', items=[
  ['RIRI', 'Failing calculus? Hate your professor?'], ['sfx', 'ding', -4], ['RIRI', 'Homework by Riri. A plus, or your money back.'], ['sfx', 'cash', -4],
  ['wait', .3], ['NARR', 'Side effects include being expelled.'], ['sfx', 'sad_trombone', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=2, act=5, at=57.45, title='INTERVIEW TIPS WITH A VILLAIN', set='hr', music='hold', items=[
  ['HR', 'Welcome to your new job! Step one: lock the applicant in a box.'], ['sfx', 'gate_slam', -4],
  ['HR', 'Step two: remove the oxygen.'], ['sfx', 'gasp', -4], ['HR', 'Step three: watch, with snacks.'], ['sfx', 'crunch', -2],
  ['wait', .3], ['HR', 'Join us! We have dental.'], ['wait', .4], ['HR', 'Probably.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=3, act=7, at=36.05, title='GHOST OR GLITCH?', set='ghost', music='gameshow', items=[
  ['HOST', 'Contestant! Your dead best friend is now a hologram that roasts your outfits.'], ['NAT', 'Girl, those shoes.'], ['HOST', 'Ghost... or glitch?'],
  ['sfx', 'tick', -6], ['RIRI', '...Glitch?'], ['sfx', 'buzzer', -2], ['HOST', "Wrong! It's both. And she lives in your chest."], ['sfx', 'dundun', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=4, act=9, at=41.55, title='BESTIE GPS', set='gps', music='lounge', items=[
  ['SMOOTH', 'Introducing the new Bestie GPS.'], ['NAT', 'Turn left.'], ['wait', .3], ['NAT', 'No, your OTHER left.'],
  ['NAT', 'Why are you driving like my grandma? Recalculating your life choices.'], ['sfx', 'honk', -4], ['sfx', 'thud', 0], ['wait', .4],
  ['SMOOTH', 'Bestie GPS. She has notes.'], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=5, act=11, at=43.1, title='VILLAIN DADS ANONYMOUS', set='dads', music='soap', items=[
  ['JOE', 'Hi. I\'m Joe. And my dad was a giant metal man who tried to kill his boss.'], ['GRP', 'Hi, Joe.'], ['wait', .4],
  ['GUY2', 'Mine was a purple space titan.'], ['wait', .3], ['GUY3', 'Mine was a planet.'], ['wait', .5], ['sfx', 'coo', -6], ['JOE', '...Okay, you win.'],
  ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=6, act=13, at=55.25, title='DUMDOWN WEATHER REPORT', set='weather', music='weather', items=[
  ['WEATHER', 'Tonight in Chicago, a one hundred percent chance of greenhouse gas.'], ['WEATHER', 'Locally. Inside one building. Very specifically.'],
  ['sfx', 'boing', -6], ['wait', .3], ['WEATHER', 'And watch out for a cold front of guilt, moving in on our girl genius.'], ['sfx', 'sad_trombone', -4], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=7, act=15, at=35.4, title='MAGIC CUSTOMER SERVICE', set='callcentre', music='none', items=[
  ['sfx', 'dtmf', -6], ['OP', 'Thank you for calling the Dark Dimension.'], ['OP', 'For possession, press one. For curses, press two.'],
  ['OP', 'For refunds, please hold. Forever.'], ['sfx', 'organ', -2], ['wait', 1.6], ['OP', 'Your soul is important to us.'], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=8, act=17, at=36.8, title='PIMP MY CYBORG', set='pimp', music='runway', items=[
  ['HOST2', 'Yo! We heard you like robot parts.'], ['HOST2', 'So we put robot parts in your robot parts!'], ['sfx', 'wrench', -4], ['sfx', 'zap', -6],
  ['wait', .4], ['ZEKE', 'Is it good?'], ['HOST2', "It's giving store-brand action hero."], ['sfx', 'airhorn', -4], ['laugh', 'whoo'], ['wait', 1.4]]),
 dict(id=9, act=19, at=43.0, title='TERMS AND CONDITIONS', set='terms', music='infomercial', items=[
  ['FAST', 'By wearing this hood you agree to scars, visions, bad decisions, the loss of your soul, and a mandatory subscription to Dark Dimension Plus. Cancel anytime. You cannot cancel.'],
  ['wait', .3], ['JING', 'Hood! It\'s to die for!'], ['sfx', 'dingding', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=10, act=21, at=35.9, title='HOOD-BE-GONE', set='rehab', music='harp', items=[
  ['ANN', 'Are you addicted to an evil cloak?'], ['PARKER', 'It whispers to me.'], ['ANN', 'Do you shiver without a demon in your ear?'],
  ['wait', .3], ['ANN', 'Call Hood-Be-Gone. Our blankets are completely un-cursed.'], ['wait', .4], ['ANN', 'Mostly.'], ['sfx', 'dundun', -3], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=11, act=22, at=52.1, title='SHARK TANK: HELL EDITION', set='hellTank', music='court', items=[
  ['MEPH', "I'll invest in your dead best friend. For one hundred percent of your soul."], ['RIRI', 'Counter offer. Fifty percent.'], ['wait', .3],
  ['MEPH', 'Done!'], ['sfx', 'gavel3', -2], ['wait', .4], ['NARR', "That's not how negotiation works."], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=12, act=23, at=13.55, title='DUMDOWN DEAL CHECKER', set='quiz', music='gameshow', items=[
  ['HOST', 'Quick, kids! The devil offers you free pizza. Do you, A, eat it? Or B, run?'], ['sfx', 'tick', -6], ['KID', 'Eat it?'], ['sfx', 'buzzer', -2],
  ['HOST', "Wrong! That's how you lose your soul. And your crust."], ['laugh', 'big'], ['wait', 1.4]]),
]
