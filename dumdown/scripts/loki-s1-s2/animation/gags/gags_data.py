# DumDown Loki S1+S2 cutaway gags. 'act' + 'at' = insertion point (seconds into that act's video).
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
V = {
  'LOKI': ('bm_lewis', 1.0, ''), 'SYL': ('bf_isabella', 1.0, ''), 'MOB': ('am_eric', 1.0, ''), 'DON': ('am_eric', .92, ''), 'OB': ('am_puck', 1.0, ''),
  'HWR': ('am_liam', 1.05, ''), 'TIM': ('am_liam', 1.0, ''), 'BRAD': ('am_adam', 1.0, ''), 'MM': ('af_bella', .95, 'up'), 'MMD': ('af_bella', 1.15, 'deep'),
  'CLERK': ('af_nicole', 1.2, ''), 'LEAD': ('bm_george', 1.0, ''), 'L2': ('bm_daniel', 1.0, ''), 'L3': ('bm_fable', 1.0, ''), 'KID': ('af_sky', 1.0, 'up'),
  'BOAST': ('am_fenrir', .95, ''), 'CLASSIC': ('bm_george', 1.1, 'deep'), 'HOST': ('am_onyx', .85, ''), 'WAIT': ('bm_daniel', 1.0, ''),
  'ANN': ('am_onyx', 1.25, 'trailer'), 'IVR': ('af_sky', 1.0, 'robot'), 'TECH': ('am_echo', 1.05, 'radio'),
}
G = [
 dict(id=1, act=2, at=37.28, title='MEANWHILE, AT THE T.V.A. D.M.V.', set='dmv', music='hold', items=[
  ['CLERK', 'Next.'], ['wait', .3], ['LOKI', 'Loki. Of Asgard. Rightful king of Jotunheim, god of mischief, burdened with glorious—'],
  ['CLERK', "That's not a form field."], ['wait', .2], ['LOKI', 'Then make it one.'], ['wait', .3], ['sfx', 'stamp', -3], ['CLERK', 'Take a number.'],
  ['LOKI', 'I am a god!'], ['CLERK', 'Now serving... number eight billion.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=2, act=3, at=20.60, title='VARIANT ANONYMOUS', set='circle', music='soap', items=[
  ['LOKI', "Hi. I'm Loki."], ['sfx', 'hi_all', -2], ['wait', .6], ['LOKI', 'And I... keep trying to rule the world.'], ['wait', .3],
  ['LEAD', 'Thank you for sharing.'], ['L2', "Hi, I'm also Loki."], ['L3', 'Same.'], ['wait', .3], ['LEAD', '...Is anyone here NOT Loki?'], ['wait', 1.0],
  ['sfx', 'pop', -4], ['slam', 'IT WAS LOKI', 1.6], ['LEAD', "...Hi. I'm Loki."], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=3, act=4, at=15.88, title='TEMPAD TECH SUPPORT', set='phone', music='hold', items=[
  ['sfx', 'phone_ring', -6], ['wait', .8], ['IVR', 'Thank you for calling TemPad support. Estimated wait time: the end of the universe.'], ['wait', .3],
  ['SYL', "I'm on a moon. That's about to explode."], ['TECH', 'Hi, this is Kevin. Have you tried plugging it into... time?'],
  ['SYL', "There's no socket on a dying moon."], ['wait', .3], ['TECH', 'Okay. So the problem is on your side.'], ['sfx', 'thud', 0], ['sfx', 'sad_trombone', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=4, act=5, at=24.91, title='MEET YOURSELF!', set='dating', music='gameshow', items=[
  ['HOST', 'Welcome back to Meet Yourself! Contestant number one is a god of mischief who betrays everyone!'], ['sfx', 'ooh', -6],
  ['HOST', 'Contestant number two... is a god of mischief who betrays everyone!'], ['wait', .4], ['LOKI', 'Hmm. Tough call.'], ['wait', .6],
  ['LOKI', "I'll take number two."], ['HOST', "That's you, sir."], ['LOKI', 'I know.'], ['sfx', 'airhorn', -6], ['laugh', 'whoo'], ['wait', 1.4]]),
 dict(id=5, act=6, at=25.06, title='LOKI FAMILY REUNION', set='bbq', music='sitcom', items=[
  ['KID', 'Who brought the potato salad?'], ['BOAST', 'I did!'], ['sfx', 'hit', -2], ['wait', .2], ['CLASSIC', 'It was poisoned.'],
  ['BOAST', '...Of course it was.'], ['wait', .3], ['KID', 'Pass the ketchup?'], ['sfx', 'hit', -2], ['LOKI', 'Same time next year?'], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=6, act=7, at=29.92, title='ACTUALLY, I PLANNED THAT', set='diner', music='lounge', items=[
  ['sfx', 'scrape', -6], ['HWR', 'I knew you would do that.'], ['WAIT', 'Sir... you spilled it yourself.'], ['HWR', 'Planned it.'],
  ['sfx', 'thud', 0], ['wait', .3], ['HWR', 'Saw that coming too.'], ['WAIT', "Here's your bill."], ['HWR', "I already know the price. I've seen every timeline."],
  ['wait', .3], ['WAIT', '...Can you leave?'], ['wait', .5], ['HWR', "...Didn't see that one."], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=7, act=8, at=56.99, title="O.B.'S REPAIR SHOP", set='repair', music='lounge', items=[
  ['sfx', 'chime', -6], ['MOB', 'Hi. So... the multiverse is broken.'], ['OB', 'Oh! Did you keep the receipt?'], ['wait', .4],
  ['MOB', "...It's the multiverse."], ['wait', .3], ['OB', "Then I'm afraid it's not under warranty."], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=8, act=9, at=17.46, title='ZANIAC 2', set='trailer', music='none', items=[
  ['sfx', 'braam', -2], ['wait', .4], ['ANN', 'In a world...'], ['ANN', 'where one man...'], ['ANN', 'has really, really great hair.'], ['sfx', 'whoosh', -4],
  ['BRAD', 'This time... it is elevated.'], ['sfx', 'hit', 0], ['slam', 'ZANIAC 2', 2.0], ['ANN', 'Zaniac Two. Rated: please stop.'], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=9, act=10, at=46.80, title="MISS MINUTES' DATING PROFILE", set='profile', music='harp', items=[
  ['MM', "Hi y'all! I'm a clock!"], ['MM', 'I like long walks through time, sunsets, and controlling every system you rely on.'], ['wait', .3],
  ['MM', 'So swipe right!'], ['wait', .8], ['MMD', '...Or else.'], ['sfx', 'braam', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=10, act=11, at=20.51, title='FAN MEETING AT THE TIME LOOP', set='fans', music='lounge', items=[
  ['OB', 'Can I have your autograph?'], ['TIM', 'Only if I can have yours.'], ['wait', .3], ['OB', 'Wait. Did I sign this already?'],
  ['TIM', 'Next year. Or last year.'], ['wait', .4], ['OB', '...My head hurts.'], ['sfx', 'thud', 0], ['sfx', 'thud', -2], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=11, act=12, at=31.24, title="DON'S JET SKI OUTLET", set='ad', music='infomercial', items=[
  ['DON', "Hi, I'm Don! Are you a god of mischief going through a hard time?"], ['DON', 'Ride the wave! Zero percent financing!'],
  ['DON', 'A hundred percent wet!'], ['sfx', 'airhorn', -6], ['DON', "Don's Jet Skis. We're not going anywhere. Unlike your timeline."], ['sfx', 'cash', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=12, act=13, at=19.47, title="LOKI'S STUDY GROUP", set='study', music='hold', items=[
  ['OB', 'So how long have you been studying?'], ['LOKI', 'Centuries.'], ['OB', 'And when is the exam?'], ['LOKI', 'Tomorrow.'],
  ['OB', 'Tomorrow when?'], ['wait', .4], ['LOKI', "It's always tomorrow."], ['sfx', 'sad_trombone', -4], ['laugh', 'mid'], ['wait', 1.4]]),
]
