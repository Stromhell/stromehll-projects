# DumDown Thunderbolts* cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act
# ('at' = seconds into the act video, computed from the VO timing json). Family-friendly (8-16), every line original, parody designs only.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
import json, os
V = {
  'YEL': ('af_bella', 1.0, ''), 'ALEX': ('am_fenrir', 1.0, 'deep'), 'BUCKY': ('am_onyx', 1.05, ''), 'JOHN': ('am_adam', .95, ''), 'BOB': ('am_echo', 1.02, ''),
  'HOST': ('am_eric', .92, ''), 'HOSTW': ('af_kore', .92, ''), 'ANN': ('am_onyx', 1.2, 'trailer'), 'APP': ('af_sky', 1.0, ''), 'DOC': ('bm_george', .95, ''),
  'WX': ('af_nova', .95, ''), 'KID': ('af_nicole', .9, 'up'), 'ANCHOR': ('bm_lewis', 1.0, ''), 'FAST': ('am_liam', .55, ''), 'NARR': ('am_michael', 1.05, ''),
}
G = [
 dict(id=1, act=1, p=1, title='THERAPY FOR ASSASSINS', set='therapy', music='lounge', items=[
  ['HOSTW', 'Feeling empty? Talking to your targets like they are your therapist?'], ['HOSTW', 'Call one eight hundred, sad spy!'], ['sfx', 'phone_ring', -6],
  ['HOSTW', 'Our counsellors are trained, armed, and have nowhere else to be.'], ['sfx', 'whoosh', -4], ['sfx', 'clang', -4], ['HOSTW', 'Ducking is included.'],
  ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=2, act=3, p=2, title='RUSSIAN LIMO SERVICE', set='limo', music='infomercial', items=[
  ['ALEX', 'You want luxury? You want security?'], ['ALEX', 'You want driver who was once super soldier? Call Alexei!'], ['sfx', 'honk', -4],
  ['ALEX', 'Seat belts optional. Feelings guaranteed.'], ['sfx', 'screech', -6], ['sfx', 'crunch', -2], ['FAST', 'Alexei is not responsible for mailboxes.'],
  ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=3, act=5, p=2, title='ASSASSINDER', set='app', music='hold', items=[
  ['APP', 'Ghost. Thirties. Walks through walls. Will not walk through your door.'], ['sfx', 'swipe', -4],
  ['APP', 'John. Captain America, formerly. Loves his shield more than you.'], ['sfx', 'swipe', -4],
  ['APP', "It's a match!"], ['sfx', 'dingding', -4], ['APP', 'Now fight to the end.'], ['sfx', 'clang', -4], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=4, act=7, p=1, title="BOB'S MEDICAL STUDY", set='study', music='infomercial', items=[
  ['DOC', 'Join our exciting study! Free snacks! Free pyjamas!'], ['sfx', 'ding', -4],
  ['FAST', 'Side effects may include waking up in a secret vault, flying, and becoming a god.'], ['BOB', 'Ten out of ten. Would wake up again.'],
  ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=5, act=9, p=1, title='WEATHER WITH BOB', set='weather', music='weather', items=[
  ['WX', 'Clear skies over the desert today.'], ['WX', 'With a one hundred percent chance of a man in pyjamas shooting into space.'], ['sfx', 'sonic', -6],
  ['WX', 'Back to you, Tom.'], ['sfx', 'crickets', -8], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=6, act=11, p=0, title="CONGRESSMAN BUCKY'S MAILBAG", set='mailbag', music='sitcom', items=[
  ['BUCKY', 'Dear Congressman. My pothole is too big.'], ['sfx', 'whirr', -6], ['sfx', 'punch', -2], ['BUCKY', 'Fixed.'], ['laugh', 'mid'],
  ['BUCKY', 'Dear Congressman. Why is your arm metal?'], ['wait', 1.4], ['BUCKY', 'Next letter.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=7, act=12, p=1, title='SENTRY SCREEN', set='sunscreen', music='gameshow', items=[
  ['HOST', 'Is your friend as bright as a thousand suns?'], ['HOSTW', 'Oh no!'], ['sfx', 'gasp', -6],
  ['HOST', 'Try Sentry Screen! S P F one million!'], ['HOSTW', 'Spray it on before every hug!'], ['sfx', 'fwoosh', -6], ['sfx', 'sad_trombone', -6],
  ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=8, act=15, p=1, title="DR. HUG'S CLINIC", set='hugclinic', music='harp', items=[
  ['DOC', "Is your friend's sadness swallowing New York? Try the Doctor Hug method!"], ['DOC', 'Step one. Show up.'], ['DOC', 'Step two. Hug.'],
  ['DOC', "Step three. No, really. That's it."], ['sfx', 'aww', -4], ['laugh', 'whoo'], ['wait', 1.2]]),
 dict(id=9, act=16, p=2, title='NEW AVENGERS MERCH', set='toys', music='infomercial', items=[
  ['KID', "It's the New Avengers! With real feelings action!"], ['sfx', 'ding', -4], ['ANN', 'Bob comes with, or without, the Void!'], ['sfx', 'boing', -6],
  ['FAST', 'Batteries and therapy not included.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=10, act=17, p=0, title='STINGER NEWS', set='stinger', music='tension', items=[
  ['ANCHOR', 'Breaking news. We go live to space, where a very fancy spaceship has just appeared.'], ['ANCHOR', "Experts say it's probably fine."],
  ['wait', .6], ['sfx', 'braam', -4], ['ANCHOR', "That's probably fine."], ['laugh', 'mid'], ['wait', 1.2]]),
]
VO = os.environ.get('VO', '/tmp/tbwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
