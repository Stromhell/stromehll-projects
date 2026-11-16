# DumDown Agatha All Along S1 cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act
# ('at' = seconds into the act video, computed from the VO timing json). PG-13, every line original.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
import json, os
V = {
  'PETER': ('am_puck', 1.0, ''), 'MJ': ('af_heart', 1.0, ''), 'NED': ('am_echo', .95, 'up'), 'FRANK': ('am_fenrir', 1.1, 'deep'), 'WIDOW': ('af_nicole', 1.0, ''),
  'JEAN': ('af_bella', 1.0, ''), 'BANNER': ('bm_george', 1.0, ''), 'METZ': ('am_eric', .95, ''), 'HOST': ('am_eric', .9, ''), 'HOSTW': ('af_kore', .92, ''),
  'ANN': ('am_onyx', 1.2, 'trailer'), 'DOC': ('bm_lewis', 1.15, ''), 'FAST': ('am_liam', .55, ''), 'NARR': ('am_fenrir', 1.0, ''), 'APP': ('af_sky', 1.0, ''), 'NINJA': ('am_adam', 1.0, ''),
}
# cast: speaker -> Toon Lanky character key; plate: background; layout handled by mk_gagacts.py
G = [
 dict(id=1, act=1, p=2, title='SINGLE SPIDERS NEAR YOU', set='app', music='infomercial', plate='sad_apt', cast={'APP': None, 'PETER': 'spidey'}, items=[
  ['APP', 'Lonely? Sticky? Erased from everyone you love?'], ['sfx', 'ding', -4], ['APP', 'Try Single Spiders Near You.'], ['PETER', 'Hi. I like long swings on the beach.'],
  ['APP', 'And what do you do for a living?'], ['PETER', "I can't tell you that."], ['sfx', 'swipe', -4], ['APP', 'Match rate: zero percent.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=2, act=4, p=2, title='BIG POTATO, SMALL POTATO', set='kalekare', music='lounge', plate='frank_kitchen', cast={'WIDOW': 'widow', 'PETER': 'spidey'}, items=[
  ['WIDOW', 'Today we sort problems. Avengers problems: big potato.'], ['sfx', 'ding', -4], ['WIDOW', 'Stolen tank. Ghost girl. Your love life.'],
  ['WIDOW', 'Small potato.'], ['sfx', 'crunch', -2], ['PETER', 'Did you just throw my love life in the bin?'], ['WIDOW', 'Next week: emotional potatoes.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=3, act=6, p=1, title="MAYNARD'S INSURANCE", set='insurance', music='infomercial', plate='party_apt', cast={'PETER': 'peter', 'FAST': None}, items=[
  ['PETER', "Hi, I'm Maynard. Is your life a lie?"], ['PETER', "Protect it with Maynard's Anonymous Insurance."], ['sfx', 'ding', -4],
  ['FAST', 'Covers webbing damage and emotional damage only. Maynard does not exist. Maynard has never existed.'], ['laugh', 'whoo'], ['wait', 1.2]]),
 dict(id=4, act=8, p=1, title='BODY HOPPER RENTALS', set='travel', music='lounge', plate='avenue', cast={'JEAN': 'jean', 'ANN': None}, items=[
  ['JEAN', 'The janitor? Two stars. Smelled like mop.'], ['JEAN', 'The prison guard? Three stars. Great biceps.'], ['sfx', 'boing', -6],
  ['JEAN', 'Spider-Man? Zero stars. Would not let me in. Very rude host.'], ['ANN', 'Stay anywhere. Leave no trace. Except trauma.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=5, act=11, p=2, title='DATE SPOILERS WEEKLY', set='talkshow', music='gameshow', plate='studio', cast={'HOST': 'driver', 'HOSTW': 'dewolff'}, items=[
  ['HOSTW', 'So he kissed his ex.'], ['HOST', 'But it was actually a teenage psychic inside his ex?'], ['sfx', 'gasp', -4], ['HOSTW', 'Ugh. So Brooklyn.'],
  ['HOST', 'Who kissed who? Our flow chart has eleven arrows.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=6, act=12, p=1, title="FRANK'S KITCHEN", set='kalekare', music='infomercial', plate='frank_kitchen', cast={'FRANK': 'frank'}, items=[
  ['FRANK', 'Today we make chili. Step one. Beans.'], ['FRANK', 'Step two. More beans.'], ['FRANK', 'Step three. Shoot the beans.'], ['sfx', 'gunshot', -6],
  ['FRANK', 'Serves one. Nobody else is allowed in my house.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=7, act=14, p=3, title='ANGER MANAGEMENT WITH BRUCE', set='sitcom', music='lounge', plate='lecture_hall', cast={'BANNER': 'banner', 'ANN': None}, items=[
  ['BANNER', 'When I feel angry, I count to ten. One.'], ['BANNER', 'Two.'], ['BANNER', 'Three.'], ['sfx', 'scratch', -4], ['sfx', 'crunch', 0],
  ['ANN', 'Results may vary. Purple shorts sold separately.'], ['laugh', 'whoo'], ['wait', 1.2]]),
 dict(id=8, act=16, p=1, title='HOW DOES SPIDER-MAN PEE?', set='app', music='harp', plate='coffee_shop', cast={'DOC': None, 'PETER': 'spidey'}, items=[
  ['DOC', 'Here, the urban spider faces nature\'s greatest challenge.'], ['DOC', 'A coffee shop. Customers only.'], ['PETER', 'Is a small water a purchase?'],
  ['DOC', 'It is not.'], ['sfx', 'sad_trombone', -6], ['DOC', 'We still do not know how he pees.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=9, act=17, p=0, title='DAMAGE CONTROL H.R.', set='insurance', music='hold', plate='dc_office', cast={'METZ': 'metzger', 'NINJA': 'ninja'}, items=[
  ['METZ', 'At Damage Control, we value diversity.'], ['METZ', "That's why we kidnap all kinds of people."], ['sfx', 'ding', -4],
  ['NINJA', 'Do we get dental?'], ['METZ', 'You get a sword.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=10, act=20, p=1, title="FRANK'S APOLOGY HOTLINE", set='insurance', music='hold', plate='frank_kitchen', cast={'FRANK': 'frank'}, items=[
  ['FRANK', 'Did I shoot you? I am sorry.'], ['sfx', 'dtmf', -8], ['FRANK', 'Press one for a casserole.'], ['FRANK', 'Press two if it was me.'],
  ['FRANK', 'Do not press two.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=11, act=21, p=1, title='DUMDOWN RATINGS', set='judges', music='gameshow', plate='studio', cast={'NARR': None}, items=[
  ['NARR', 'Spider puberty. Ten out of ten, gross.'], ['sfx', 'ding', -4], ['NARR', "Frank's chili. Biohazard."], ['sfx', 'buzzer', -6],
  ['NARR', 'Jean. Best villain who was not a villain.'], ['NARR', 'Metzger. Still bald.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=12, act=22, p=0, title='MAYNARD RETURNS', set='sitcom', music='none', plate='coffee_shop', cast={'PETER': 'peter', 'MJ': 'mj'}, items=[
  ['MJ', 'Sorry, what was your name again?'], ['PETER', "I'm May... Peter. Peter."], ['MJ', 'Did you say Maynard?'], ['sfx', 'sad_trombone', -6], ['laugh', 'whoo'], ['wait', 1.2]]),
]
VO = os.environ.get('VO', '/tmp/sbwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    if not os.path.exists(f): g['at'] = 0; continue
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
