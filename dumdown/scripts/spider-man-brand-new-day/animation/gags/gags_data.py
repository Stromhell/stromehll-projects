# DumDown Agatha All Along S1 cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act
# ('at' = seconds into the act video, computed from the VO timing json). PG-13, every line original.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
import json, os
V = {
  'AGATHA': ('af_bella', 1.0, ''), 'RIO': ('af_nicole', 1.05, ''), 'JEN': ('af_heart', .95, ''), 'BILLY': ('am_echo', .95, 'up'), 'MOM': ('bf_isabella', 1.05, 'old'),
  'HOST': ('am_eric', .9, ''), 'HOSTW': ('af_kore', .92, ''), 'ANN': ('am_onyx', 1.2, 'trailer'), 'GRIM': ('am_fenrir', 1.15, 'deep'), 'J1': ('bm_george', 1.0, ''),
  'J2': ('af_sarah', 1.0, ''), 'J3': ('am_adam', 1.0, ''), 'SOMM': ('bm_lewis', 1.05, ''), 'AGENT': ('af_river', 1.05, ''), 'GUIDE': ('am_puck', .88, ''),
  'FAST': ('am_liam', .55, ''), 'NARR': ('am_michael', 1.05, ''), 'APP': ('af_sky', 1.0, ''), 'SING': ('af_aoede', 1.0, ''),
}
G = [
 dict(id=1, act=1, p=2, title='LAW & ORDER: WITCH VICTIMS UNIT', set='lawwitch', music='none', items=[
  ['sfx', 'dundun', -2], ['wait', .3], ['GRIM', 'In the world of magic, crimes are investigated by two separate groups.'],
  ['GRIM', 'The witches who did it.'], ['wait', .2], ['GRIM', 'And the witches who forgot they did it.'], ['sfx', 'dundun', -2], ['wait', .3],
  ['NARR', 'This is a real genre now.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=2, act=3, p=2, title="IT'S COMPLICATED", set='dating', music='gameshow', items=[
  ['HOST', "Welcome back to It's Complicated!"], ['sfx', 'ding', -4], ['HOST', 'Bachelorette number one, you once tried to kill her.'], ['AGATHA', 'Allegedly.'],
  ['HOST', 'Bachelorette number two, you are literally the end of all life.'], ['RIO', 'Hi.'], ['HOST', "Let's see if there's a spark!"], ['sfx', 'zap', -4], ['laugh', 'whoo'],
  ['NARR', 'This is the healthiest relationship in the show.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=3, act=5, p=2, title='KALE KARE', set='kalekare', music='infomercial', items=[
  ['JEN', 'Introducing the new Kale Kare probiotic candle.'], ['sfx', 'ding', -4], ['JEN', 'Light it. Eat it. Glow.'], ['sfx', 'crunch', -2],
  ['FAST', 'Do not eat while lit. Side effects include skin grafts and eight hundred lawsuits.'], ['wait', .2],
  ['NARR', 'Ah, the goop extended universe.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=4, act=7, p=1, title='THE RIGHT KEY', set='judges', music='none', items=[
  ['SING', 'Down, down, down the road!'], ['sfx', 'sad_trombone', -6], ['J1', 'Pitchy.'], ['J2', 'Flat as a pancake.'], ['wait', .3],
  ['J3', 'But you opened a portal to the underworld, so, yes.'], ['sfx', 'gavel', -4], ['laugh', 'whoo'], ['NARR', 'Talent is relative.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=5, act=8, p=3, title='WITCHY WINE CO.', set='wine', music='lounge', items=[
  ['SOMM', 'Mmm. Notes of oak, blackberry, and an ancient curse.'], ['sfx', 'ding', -6], ['SOMM', 'Pairs beautifully with betrayal.'], ['wait', .3],
  ['NARR', 'Ninety nine points from the critics. One from the coroner.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=6, act=10, p=2, title='BAND OF WITCHES: LIVE!', set='concert', music='none', items=[
  ['ANN', 'One night only!'], ['sfx', 'airhorn', -6], ['ANN', 'Five witches. One curse. Zero rehearsals.'], ['ANN', 'Tickets include free fire!'], ['sfx', 'braam', -6],
  ['laugh', 'whoo'], ['NARR', 'Better than most reunion tours.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=7, act=11, p=1, title='DR. WITCH', set='talkshow', music='soap', items=[
  ['HOSTW', 'So. You tried to execute your own daughter. Back in Salem.'], ['MOM', 'She was evil.'], ['sfx', 'ooh', -2],
  ['AGATHA', 'Love you too, Mom.'], ['laugh', 'mid'], ['NARR', 'Somebody get these women a therapist. Or an exorcist.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=8, act=12, p=2, title='THE RESULTS SHOW: SOUL EDITION', set='maury', music='court', items=[
  ['HOST', 'When it comes to sixteen year old William Kaplan.'], ['sfx', 'string', -6], ['wait', .4], ['HOST', 'You are NOT just William!'], ['sfx', 'airhorn', -6],
  ['BILLY', 'I knew it!'], ['laugh', 'whoo'], ['NARR', 'The DNA test was very confused.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=9, act=13, p=2, title="DEATH'S DATING PROFILE", set='app', music='lounge', items=[
  ['APP', 'New match nearby!'], ['sfx', 'ding', -4], ['RIO', 'Into long walks in the forest, the cycle of life, and decay.'], ['RIO', 'Looking for someone who will never leave me. Literally.'],
  ['sfx', 'swipe', -2], ['AGATHA', 'Swipe right.'], ['sfx', 'dingding', -4], ['NARR', 'Red flags. All of them. Every flag.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=10, act=15, p=1, title='WITCH LIFE INSURANCE', set='insurance', music='harp', items=[
  ['AGENT', 'Do you date Death? Do you kiss Death?'], ['AGENT', "Get Witch Life. Because when you finally die, you'll want something to leave behind."],
  ['FAST', 'Coverage void if you date Death.'], ['wait', .2], ['NARR', 'Read the fine print, ladies.'], ['sfx', 'rimshot', -3], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=11, act=16, p=3, title="WITCHES' ROAD TOURS", set='travel', music='infomercial', items=[
  ['GUIDE', 'Five fantastic trials! Free poison! Optional death!'], ['sfx', 'honk', -6], ['GUIDE', 'Full refund if you do not survive!'], ['wait', .3],
  ['NARR', 'One star. Would not walk again.'], ['sfx', 'sad_trombone', -6], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=12, act=17, p=0, title='GHOST ROOMMATES', set='sitcom', music='sitcom', items=[
  ['ANN', "He's a teen with a missing twin."], ['ANN', "She's a dead witch with no chill."], ['AGATHA', 'Boo.'], ['BILLY', 'Please knock.'], ['ANN', "They're... roommates!"],
  ['laugh', 'whoo'], ['NARR', 'Coming this fall. Never.'], ['laugh', 'big'], ['wait', 1.3]]),
]
VO = os.environ.get('VO', '/tmp/sbwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
