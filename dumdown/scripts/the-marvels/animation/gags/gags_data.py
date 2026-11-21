# DumDown The Marvels cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act
# ('at' = seconds into the act video, computed from the VO timing json). Family-friendly (8-16), every line original, parody designs only.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: free local Kokoro voice, length scale, fx (NO ElevenLabs)
import json, os
V = {
  'HOST': ('am_eric', .92, ''), 'HOSTW': ('af_kore', .92, ''), 'ANN': ('am_onyx', 1.2, 'trailer'), 'APP': ('af_sky', 1.0, ''), 'CRIT1': ('bm_george', .95, ''), 'CRIT2': ('bf_emma', .95, ''),
  'WX': ('af_nova', .95, ''), 'KID': ('af_nicole', .9, 'up'), 'ROBO': ('af_sky', 1.0, 'robot'), 'FAST': ('am_liam', .55, ''), 'NARR': ('am_michael', 1.05, ''),
  'OWL': ('am_puck', 1.0, 'up'), 'SING': ('am_adam', 1.0, ''), 'REP': ('am_fenrir', 1.0, ''), 'KAM': ('af_bella', 1.0, ''), 'MON': ('af_heart', 1.0, ''), 'SOFT': ('af_sarah', .9, ''),
}
G = [
 dict(id=1, act=1, p=2, title='FAN ART CRITICS', set='critics', music='lounge', items=[
  ['CRIT1', 'Bold. Brave. A true hero, punching a robot.'], ['CRIT2', 'The hands are potatoes.'], ['sfx', 'rimshot', -6],
  ['CRIT1', 'Ten out of ten. I would hang this on my fridge.'], ['sfx', 'bell', -6], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=2, act=3, p=2, title='SPACE HOLD MUSIC', set='hold', music='hold', items=[
  ['ROBO', 'Thank you for calling Saber. Your call is important to us.'], ['ROBO', 'Estimated wait time: four light years.'], ['sfx', 'crickets', -8],
  ['ROBO', 'Please enjoy this smooth jazz.'], ['laugh', 'mid'], ['wait', 1.4]]),
 dict(id=3, act=4, p=3, title='SWAPSURE INSURANCE', set='swapsure', music='infomercial', items=[
  ['HOST', 'Woke up on the wrong planet? Is your cat now an astronaut?'], ['sfx', 'boing', -6],
  ['HOST', 'Get SwapSure! We cover lost luggage, lost homework, and lost planets!'], ['sfx', 'ding', -4],
  ['FAST', 'SwapSure does not cover space, time, or your mum finding out.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=4, act=6, p=2, title='SPACE WEATHER', set='spaceweather', music='weather', items=[
  ['WX', 'Today on Tarnax: sunny, with a one hundred percent chance of no sky.'], ['sfx', 'whoosh', -6],
  ['WX', 'Tomorrow? Still no sky. Bring a scarf. And a spacesuit.'], ['sfx', 'crickets', -8], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=5, act=9, p=2, title='NAME THAT HERO', set='codename', music='gameshow', items=[
  ['HOST', "Let's find a hero name for Monica! Spin the wheel!"], ['sfx', 'tick', -6], ['HOST', 'Night Light!'], ['sfx', 'buzzer', -6],
  ['HOST', 'Pulsar Light Lady!'], ['sfx', 'buzzer', -6], ['HOST', 'Doctor Bright!'], ['MON', 'No.'], ['sfx', 'buzzer', -6], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=6, act=12, p=1, title='LEARN SONG FAST', set='songapp', music='gameshow', items=[
  ['OWL', 'Want to order pizza on the singing planet? Repeat after me!'], ['SING', 'Laaa, pepperoniii!'], ['sfx', 'sad_trombone', -6],
  ['OWL', 'Close enough!'], ['sfx', 'thud', -6], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=7, act=15, p=2, title='ADOPT A FLERKEN', set='adopt', music='harp', items=[
  ['SOFT', 'This kitten needs a home.'], ['SOFT', 'It also has tentacles. And it might eat your uncle.'], ['sfx', 'aww', -6],
  ['SOFT', 'But look at those eyes.'], ['sfx', 'burp', -2], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=8, act=16, p=2, title='SUN REPAIR CO.', set='sunrepair', music='sitcom', items=[
  ['REP', "Sun gone dark? Don't panic! Call Sun Repair Company."], ['REP', 'We fix stars, fridges, and bad vibes.'], ['sfx', 'clang', -4], ['sfx', 'fwoosh', -6],
  ['REP', 'Good as new.'], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=9, act=18, p=1, title='TEEN HERO JOB FAIR', set='jobfair', music='sitcom', items=[
  ['KAM', 'Join my hero team! Free snacks! Cool name!'], ['KAM', 'Possible cosmic danger!'], ['sfx', 'dingding', -6],
  ['KID', 'I will take ten leaflets!'], ['laugh', 'whoo'], ['wait', 1.2]]),
 dict(id=10, act=19, p=0, title='DUMDOWN SCORES', set='scores', music='gameshow', items=[
  ['ANN', 'Kittens. Ten out of ten.'], ['sfx', 'ding', -4], ['ANN', 'Singing planet. Eleven out of ten.'], ['sfx', 'ding', -4],
  ['ANN', 'Villain plan. Six out of ten.'], ['sfx', 'sad_trombone', -8], ['ANN', 'Hands that are hard to draw. Still hard.'], ['laugh', 'big'], ['wait', 1.2]]),
]
VO = os.environ.get('VO', '/tmp/mvwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
