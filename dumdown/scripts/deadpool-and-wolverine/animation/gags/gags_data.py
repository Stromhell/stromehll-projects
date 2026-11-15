# DumDown Deadpool & Wolverine cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act
# ('at' = seconds into the act video, computed from the VO timing json). Adult jokes OK (Pushpam 15 Nov), every line original.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
import json, os
V = {
  'WADE': ('am_puck', .95, ''), 'LOGAN': ('am_fenrir', 1.08, 'deep'), 'CASS': ('bf_emma', 1.05, ''), 'NOVA': ('bf_isabella', 1.0, ''),
  'HOST': ('am_eric', .9, ''), 'HOSTW': ('af_kore', .92, ''), 'ANN': ('am_onyx', 1.2, 'trailer'), 'GRIM': ('am_fenrir', 1.15, 'deep'), 'SLEAZE': ('am_liam', .92, ''),
  'OP': ('af_river', 1.08, ''), 'JUDGE': ('am_onyx', 1.05, ''), 'BRO': ('am_adam', .9, ''), 'SCI': ('bm_george', 1.0, ''), 'GUY': ('am_echo', 1.0, ''),
  'GAMBIT': ('bm_lewis', .82, ''), 'FAST': ('am_liam', .55, ''), 'NARR': ('am_michael', 1.05, ''), 'APP': ('af_sky', 1.0, ''), 'KID': ('af_nicole', .9, 'up'),
}
G = [
 dict(id=1, act=1, p=1, title='TALES FROM THE CRYPT-O', set='crypto', music='infomercial', items=[
  ['SLEAZE', 'Tired of gold? Tired of crypto? Dig up a legend!'], ['sfx', 'cash', -4], ['SLEAZE', 'Bones are an appreciating asset.'], ['sfx', 'boing', -6],
  ['FAST', 'Past heroes do not guarantee future returns. Grave robbing is a felony in fifty states.'], ['wait', .2],
  ['NARR', 'The skeleton did not consent to this ad.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=2, act=2, p=2, title='LINKEDIN FOR MERCENARIES', set='profile', music='hold', items=[
  ['APP', 'Wade, your profile is zero percent complete.'], ['WADE', 'Skills. Stabbing. Talking. More talking.'], ['sfx', 'ding', -4],
  ['APP', 'Endorsements. None.'], ['APP', 'Your X-Force team members are no longer with the company.'], ['sfx', 'sad_trombone', -6],
  ['WADE', 'Open to work. And by work I mean anything.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=3, act=4, p=1, title='RENT-A-COP STRIPPERS INC.', set='hotline', music='lounge', items=[
  ['HOSTW', 'Need a party? Our dancers come in uniform.'], ['sfx', 'shopbell', -6], ['HOSTW', 'And leave with your suspect!'], ['sfx', 'gavel', -4],
  ['GUY', 'One star. They arrested my uncle. Great abs though.'], ['laugh', 'whoo'],
  ['NARR', 'Tips go straight into the evidence locker.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=4, act=6, p=1, title='ANCHOR BEING DATING APP', set='anchorapp', music='lounge', items=[
  ['APP', 'Looking for someone so important the universe collapses without them?'], ['APP', 'Swipe right!'], ['sfx', 'swipe', -4],
  ['APP', 'Logan. Dead. Still hot.'], ['sfx', 'dingding', -4], ['WADE', "It's a match! He's a little stiff, but so am I."], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=5, act=7, p=0, title='CLAWS R US', set='store', music='infomercial', items=[
  ['ANN', 'Claw guys! Now in Short, Tall, Hot, and Divorced!'], ['sfx', 'cash', -4], ['ANN', 'Free shipping on three or more claws!'],
  ['sfx', 'buzzer', -6], ['APP', 'Sorry. Out of stock. Alive ones.'], ['laugh', 'mid'],
  ['NARR', 'The returns policy is just a shovel.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=6, act=9, p=1, title='THE VOID: TRAVEL REVIEWS', set='reviews', music='hold', items=[
  ['GUY', 'One star. Got eaten by a cloud.'], ['sfx', 'crunch', -4], ['HOSTW', 'Two stars. Great sunsets. Terrible bald lady.'],
  ['GRIM', "Five stars. I'm an old movie studio logo, and I'm finally at peace."], ['sfx', 'aww', -6],
  ['NARR', 'No wifi. No exit. Would not die here again.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=7, act=10, p=1, title='DEAD CAMEO COMPLAINT LINE', set='callcenter', music='hold', items=[
  ['OP', "You've reached the Cameo Complaints Line."], ['OP', 'If you were killed in under five minutes, press one.'], ['sfx', 'dtmf', -8],
  ['OP', 'If you came back from 2005 just for this, press two.'], ['sfx', 'dtmf', -8], ['sfx', 'kazoo', -8],
  ['NARR', 'Current wait time: one reboot.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=8, act=11, p=1, title='MINIVAN CRASH TEST', set='crashtest', music='newsreel', items=[
  ['ANN', 'The family minivan. Five stars in safety.'], ['sfx', 'gunshot', -10], ['sfx', 'honk', -6], ['ANN', 'Even while your passenger stabs you.'],
  ['FAST', 'Do not stab your passenger. Passenger may regenerate and stab back.'], ['laugh', 'whoo'],
  ['NARR', 'Lane assist: still working. Marriage: not.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=9, act=12, p=1, title='CANCELLED HEROES ANONYMOUS', set='support', music='harp', items=[
  ['HOSTW', "Let's go around. Share your story."], ['GUY', 'I had a whole trilogy planned.'], ['sfx', 'aww', -6],
  ['GAMBIT', "Mah name's Remy an' ah got me a whole lotta feelin's bout dat, chère."], ['wait', .3], ['HOSTW', 'Thank you for sharing. Nobody understood that.'],
  ['laugh', 'big'], ['NARR', 'They all nodded anyway.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=10, act=14, p=1, title='SIBLING RIVALRY COURT', set='court', music='court', items=[
  ['NOVA', 'Your Honour, she tried to strangle me in the womb.'], ['CASS', 'I was a baby!'], ['NOVA', 'You were a fetus!'], ['sfx', 'gasp', -6],
  ['JUDGE', 'Both of you need therapy.'], ['sfx', 'gavel3', -4], ['laugh', 'big'],
  ['NARR', 'Custody of the mansion goes to the bald one. Wait.'], ['laugh', 'mid'], ['wait', 1.3]]),
 dict(id=11, act=15, p=1, title='THE MERC CORPS WANTS YOU', set='recruit', music='newsreel', items=[
  ['ANN', 'Do you talk too much? Do you have no boundaries?'], ['ANN', 'Do you regenerate?'], ['sfx', 'airhorn', -8], ['ANN', 'Join the Corps!'],
  ['KID', 'Uniform comes in red, red, and freaking red!'], ['laugh', 'whoo'],
  ['NARR', 'Dental not included. Neither are faces.'], ['laugh', 'big'], ['wait', 1.3]]),
 dict(id=12, act=17, p=1, title='FRIENDSHIP ENERGY DRINK', set='drink', music='infomercial', items=[
  ['BRO', 'Survive anything with the power of friendship!'], ['sfx', 'zap', -6], ['BRO', 'Hold hands. Listen to pop music. Become immortal.'],
  ['SCI', 'This makes no sense.'], ['wait', .4], ['SCI', 'Hold my hand, Kevin.'], ['laugh', 'whoo'],
  ['NARR', 'Side effects include a sequel.'], ['laugh', 'big'], ['wait', 1.3]]),
]
VO = os.environ.get('VO', '/tmp/dwwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
