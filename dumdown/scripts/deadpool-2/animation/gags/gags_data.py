# DumDown Deadpool 2 cutaway gags. 'act' + 'at' = insertion point (seconds into that act's video; act end = whole act).
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
V = {
  'WADE': ('am_puck', 1.0, ''), 'COL': ('am_onyx', .95, 'deep'), 'CABLE': ('am_fenrir', 1.05, 'deep'), 'DOM': ('af_kore', 1.0, ''),
  'NEGA': ('af_nova', 1.05, ''), 'YUK': ('af_sky', .95, 'up'), 'DOP': ('am_echo', .95, 'up'), 'HOST': ('am_eric', .9, ''),
  'MOD': ('bm_george', 1.0, ''), 'RANGER': ('am_liam', .92, ''), 'AGENT': ('bm_daniel', 1.05, ''), 'CLERK': ('af_nicole', 1.1, ''),
  'GATE': ('af_bella', 1.0, ''), 'READ': ('af_heart', 1.0, ''), 'KID': ('af_sky', 1.0, 'up'), 'ANN': ('am_onyx', 1.25, 'trailer'),
}
G = [
 dict(id=1, act=2, at=35.94, title="DOPINDER'S DRIVING SCHOOL", set='drive', music='infomercial', items=[
  ['DOP', 'Hello! Do you want to drive a taxi? Learn to drive with Dopinder!'], ['sfx', 'honk', -4],
  ['DOP', 'Learn to drive! Learn to drive angry!'], ['wait', .2], ['DOP', 'Learn to drive... through a man!'], ['sfx', 'thud', 0], ['sfx', 'honk', -4],
  ['wait', .3], ['ANN', 'Dopinder. Lessons. Taxi. Murder.'], ['DOP', 'Please call!'], ['sfx', 'cash', -4], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=2, act=4, at=38.46, title='INSURANCE FOR IMMORTALS', set='insure', music='hold', items=[
  ['AGENT', 'So. You exploded.'], ['WADE', 'Yep.'], ['wait', .3], ['AGENT', 'Again.'], ['WADE', 'Yep.'], ['wait', .4],
  ['AGENT', 'Sir, this is your fourteenth claim this month.'], ['WADE', "I'm on a journey."], ['wait', .4], ['sfx', 'stamp', -2], ['slam', 'DENIED', 1.4],
  ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=3, act=5, at=37.39, title='X-MANSION H.O.A. MEETING', set='hoa', music='soap', items=[
  ['COL', 'Okay. Roll call. Professor?'], ['wait', .6], ['COL', 'Storm?'], ['wait', .5], ['COL', '...Anyone with a famous name?'], ['sfx', 'crickets', -4], ['wait', 1.2],
  ['NEGA', 'Nope.'], ['COL', 'Great. Motion to buy a new couch. All in favour?'], ['wait', .4], ['YUK', 'Hi Wade!'], ['wait', .3], ['COL', 'Passed.'], ['sfx', 'gavel', -2],
  ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=4, act=6, at=55.75, title='ICEBOX TRAVEL REVIEWS', set='reviews', music='lounge', items=[
  ['READ', 'One star. Room was cold. Staff were cold. Food was cold.'], ['READ', 'My neighbour was a giant man in the basement. Would not recommend.'], ['sfx', 'swipe', -6], ['wait', .4],
  ['READ', 'Next review. One star.'], ['wait', .2], ['READ', 'Too much foreshadowing.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=5, act=8, at=43.22, title='TIME TRAVEL AIRLINES', set='gate', music='hold', items=[
  ['sfx', 'ding', -6], ['GATE', 'Welcome to Time Air! You have two charges. One to get here, and one to get home.'], ['CABLE', 'What if I need a third?'],
  ['wait', .3], ['GATE', 'No refunds.'], ['wait', .5], ['CABLE', "...That's just lazy writing."], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=6, act=10, at=49.25, title='IS LUCK A SUPERPOWER? THE DEBATE', set='debate', music='newsreel', items=[
  ['MOD', 'Tonight: is luck a superpower?'], ['DOM', 'Yes it is.'], ['WADE', "No it isn't."], ['DOM', 'Yes it is.'], ['WADE', 'No it is...'],
  ['sfx', 'thud', 0], ['sfx', 'boing', -4], ['wait', .6], ['DOM', '...Yes it is.'], ['sfx', 'zap', -6], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=7, act=11, at=38.46, title='THE WEATHER WITH A FOREST RANGER', set='weather', music='weather', items=[
  ['RANGER', 'Good evening! Today: high winds.'], ['RANGER', 'A good day to fly a kite.'], ['wait', .2],
  ['RANGER', 'A bad day to skydive with a superhero team you met yesterday.'], ['sfx', 'whoosh', -4], ['wait', .8], ['RANGER', 'Anyway! Back to you.'],
  ['sfx', 'sad_trombone', -4], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=8, act=13, at=16.18, title='BABY LEGS FITNESS', set='fitness', music='runway', items=[
  ['WADE', 'Okay, people! And kick! And kick!'], ['sfx', 'boing', -6], ['WADE', 'And kick! And...'], ['wait', .4],
  ['WADE', 'Sit down. These legs are four days old.'], ['sfx', 'thud', -2], ['slam', 'TONED IN TEN YEARS', 1.8], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=9, act=13, at=66.46, title='THIRTY SECONDS TO SAVE A SOUL', set='clock', music='gameshow', items=[
  ['HOST', 'Thirty seconds to save a soul! Your time starts... now!'], ['sfx', 'tick', -6], ['WADE', 'Kid! You are special! You matter! You are...'],
  ['sfx', 'buzzer', -2], ['HOST', "Time's up! And our prize is..."], ['wait', .3], ['HOST', 'A bullet!'], ['sfx', 'gunshot', -8], ['laugh', 'whoo'], ['wait', 1.4]]),
 dict(id=10, act=14, at=44.11, title="COLOSSUS' MANNERS CLASS", set='manners', music='harp', items=[
  ['COL', 'Instead of that word, we say: fudge.'], ['COL', 'Instead of that word, we say: son of a biscuit.'], ['wait', .4],
  ['KID', 'What if a giant is punching me?'], ['wait', .7], ['COL', '...Still biscuit.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
 dict(id=11, act=15, at=54.41, title='FOR YOUR CONSIDERATION', set='oscar', music='none', items=[
  ['sfx', 'braam', -2], ['wait', .3], ['ANN', 'For your consideration.'], ['ANN', 'Best Actor in a Very Long Death.'], ['ANN', 'Forty minutes of dying. Four costume changes. One song.'],
  ['sfx', 'whoosh', -4], ['slam', '"PLEASE JUST GO."', 1.8], ['ANN', 'The New Pork Times.'], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=12, act=17, at=25.22, title='TIME MACHINE RETURN DESK', set='returns', music='hold', items=[
  ['sfx', 'shopbell', -6], ['WADE', "Hi! I'd like to return this time machine."], ['CLERK', "What's wrong with it?"], ['WADE', 'Nothing. I fixed everything.'],
  ['CLERK', 'Then why return it?'], ['wait', .4], ['WADE', "Because next movie, I'll need it again."], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.4]]),
]
