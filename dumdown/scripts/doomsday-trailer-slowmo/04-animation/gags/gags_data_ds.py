# DumDown Doomsday trailer at 0.25x: gags built INSIDE the acts ('key' = script marker 🤡 GAG n).
# Item kinds: [WHO, text] | ['sfx', name, gain_db] | ['wait', s] | ['laugh', kind].
# Voices: Chatterbox cloning from natural reference clips (voice_ref/dd), one distinct ref per character, no pitch shift.
V = {
  'DOOM': (.4, 1, 1, '', 'm_deep'), 'MAG': (.55, 1, 1, '', 'm_old'), 'BEN': (.55, 1, 1, '', 'm_rock'), 'CAP': (.45, 1, 1, '', 'm_warm'),
  'BOT': (.4, 1, 1, '', 'm_mbaku'), 'STRETCH': (.5, 1, 1, '', 'm_laser'), 'PEG': (.5, 1, 1, '', 'f_brit'), 'PUFF': (.7, 1, 1, '', 'm_south'),
  'ANT': (.7, 1, 1, '', 'm_young'), 'BUCKY': (.4, 1, 1, '', 'm_rock'), 'REDG': (.65, 1, 1, '', 'm_big'), 'FLAME': (.45, 1, 1, '', 'm_young'),
  'DUM': (.35, 1, 1, '', 'fenrir'),
}
SPEAKERS = list(V)
G = [
 dict(id=1, key='GAG 1', title='THE JAR', music='none', items=[['sfx', 'screech', -12], ['wait', 1.0], ['DOOM', "It's a jar lid. Righty tighty."], ['wait', .8], ['sfx', 'wrench', -10], ['wait', .6], ['MAG', '...Can you start it for me?'], ['wait', .3], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=2, key='GAG 2', title='THE BALLOON', music='none', items=[['BEN', "Anyone seen Steve's legs?"], ['wait', .5], ['CAP', "I'm fine. I'm fine."], ['wait', .4], ['sfx', 'fwoosh', -10], ['wait', .8], ['sfx', 'boing', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=3, key='GAG 3', title='THE DEPOSIT', music='none', items=[['sfx', 'glass', -12], ['wait', 1.4], ['sfx', 'ding', -10], ['wait', 1.6], ['CAP', '...He started it.'], ['wait', .3], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=4, key='GAG 4', title='THE FINGER', music='none', items=[['sfx', 'whirr', -10], ['wait', 1.3], ['sfx', 'boing', -12], ['wait', .8], ['BOT', "Lost it in Cleveland. Don't ask."], ['wait', .4], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=5, key='GAG 5', title='MOVING DAY', music='none', items=[['sfx', 'whirr', -14], ['wait', 1.2], ['sfx', 'splash', -12], ['wait', .7], ['CAP', 'Yoga.'], ['wait', .4], ['sfx', 'rimshot', -10], ['laugh', 'big'], ['wait', 1.7]]),
 dict(id=6, key='GAG 6', title='THE MANNEQUIN', music='none', items=[['sfx', 'tick2', -10], ['wait', 1.0], ['sfx', 'tick2', -10], ['wait', 1.0], ['sfx', 'boing', -12], ['wait', .7], ['STRETCH', "I'm being mysterious. For the trailer."], ['wait', .4], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=7, key='GAG 7', title='THE GUESTS', music='none', items=[['sfx', 'crickets', -12], ['wait', 1.4], ['PEG', 'I was told... four.'], ['wait', .5], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=8, key='GAG 8', title='THE TAXI', music='none', items=[['sfx', 'phase', -8], ['wait', .5], ['sfx', 'phase', -8], ['wait', .5], ['sfx', 'phase', -8], ['wait', .6], ['PUFF', "That's... that's five stars. I want five stars."], ['wait', .5], ['sfx', 'phase', -8], ['wait', .4], ['laugh', 'big'], ['wait', 1.7]]),
 dict(id=9, key='GAG 9', title='THE AUTOGRAPH', music='none', items=[['ANT', 'Big fan. Huge. Could you sign it... to Scott, my best friend?'], ['wait', .8], ['BUCKY', 'Best friend.'], ['wait', .4], ['sfx', 'swipe', -8], ['wait', .4], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=10, key='GAG 10', title='THE THRONE ROOM', music='none', items=[['sfx', 'tick2', -12], ['wait', 1.6], ['sfx', 'tick2', -12], ['wait', 1.2], ['DOOM', '...I should have had a smaller room.'], ['wait', .4], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=11, key='GAG 11', title='THE GROWN-UP', music='none', items=[['sfx', 'scratch', -12], ['wait', 1.0], ['REDG', 'Who let the child be in charge?'], ['wait', .5], ['FLAME', 'You did. Both of you. Ten minutes ago.'], ['wait', .4], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=12, key='GAG 12', title='THE STAIRS', music='none', items=[['sfx', 'beep', -10], ['wait', .9], ['sfx', 'buzzer', -14], ['wait', 1.0], ['DOOM', 'Patch coming Tuesday.'], ['wait', .4], ['sfx', 'rimshot', -10], ['laugh', 'mid'], ['wait', 1.7]]),
 dict(id=13, key='GAG 13', title='THE KNOT', music='none', items=[['sfx', 'string', -10], ['wait', .6], ['sfx', 'fwoosh', -10], ['wait', 1.0], ['DUM', 'Case closed.'], ['wait', .4], ['laugh', 'mid'], ['wait', 1.7]]),
]
