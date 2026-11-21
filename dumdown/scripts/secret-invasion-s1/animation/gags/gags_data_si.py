# DumDown Secret Invasion cutaway gags. 'act' + 'p' = inserted right after narrator paragraph p of that act.
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices (rule 4): EVERY voice is the Spider-Man BND narrator voice (Chatterbox + Fenrir ref, cfg .35), varied by
# exaggeration + pitch/tempo + fx. No Kokoro, no ElevenLabs.  who: (exaggeration, pitch, tempo, fx)
import json, os
V = {
  'ROBO': (.5, .96, .92, 'robot'), 'CAROL': (.8, 1.24, 1.02, ''), 'TALOS': (.6, .9, .94, ''), 'KID': (.9, 1.45, 1.06, ''),
  'HOST': (.95, 1.06, 1.04, ''), 'CONT': (.8, 1.16, 1.0, ''), 'GRAV': (.7, .87, .97, ''), 'FURY': (.5, .84, .95, ''),
  'SONYA': (.6, 1.2, .98, ''), 'PAWN': (.9, 1.32, 1.04, ''), 'AGENT': (.95, 1.04, 1.1, ''), 'OP': (.8, 1.2, 1.04, ''),
  'CALL1': (.8, 1.38, 1.0, 'phone'), 'CALL2': (.7, 1.12, 1.0, 'phone'), 'RHODES': (.5, .8, .94, 'phone'),
  'JIM': (.95, 1.0, 1.08, 'radio'), 'BOB': (.95, 1.14, 1.08, 'radio'), 'NURSE': (.6, 1.22, 1.0, ''), 'RHODEY': (.8, .96, 1.0, ''),
  'MASC': (1.0, 1.3, 1.0, ''), 'NARR': (.75, 1.0, 1.0, ''),
}
G = [
 dict(id=1, act=2, p=4, title="NICK FURY'S VOICEMAIL", set='voicemail', music='hold', items=[
  ['ROBO', 'You have. Nine hundred and ninety-nine messages.'], ['sfx', 'beep', -6],
  ['CAROL', "Hey, it's Carol. Did you find the Skrulls a planet yet?"], ['sfx', 'beep', -6],
  ['TALOS', 'Still waiting, mate.'], ['sfx', 'beep', -6], ['TALOS', 'Still waiting.'], ['sfx', 'beep', -6],
  ['KID', 'Are we there yet?'], ['sfx', 'sad_trombone', -8], ['sfx', 'thud', -4], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=2, act=3, p=3, title='SHELL-B-GONE', set='shellbgone', music='infomercial', items=[
  ['HOST', 'Tired of your human face? Itchy? Too many eyebrows?'], ['sfx', 'boing', -6],
  ['HOST', 'Try Shell-B-Gone! Just one spray, and, ta-da!'], ['sfx', 'whoosh', -6], ['sfx', 'ding', -4],
  ['FAST', "Side effects include being found out, being chased, and your mum asking why you're green."], ['slam', '1-800-NOT-HUMAN', 1.6], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=3, act=5, p=3, title='SKRULL OR NOT SKRULL?', set='skrullshow', music='gameshow', items=[
  ['HOST', 'Welcome back to Skrull or Not Skrull! Contestant one, is this man a Skrull?'], ['sfx', 'whoosh', -6],
  ['CONT', 'Not Skrull!'], ['sfx', 'buzzer', -6], ['laugh', 'mid'],
  ['HOST', 'Contestant two. Is this a Skrull?'], ['CONT', 'Uh. Skrull?'], ['sfx', 'dingding', -4], ['sfx', 'gasp', -4], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=4, act=7, p=0, title='COOKING WITH GRAVIK', set='cooking', music='lounge', items=[
  ['GRAV', "Today we're making a Super Skrull. First, one cup of tree man."], ['sfx', 'boing', -8],
  ['GRAV', 'One spoon of space lady glow.'], ['sfx', 'ding', -6], ['GRAV', 'And a pinch of the fire guy.'], ['sfx', 'explode', -6],
  ['sfx', 'dingding', -4], ['GRAV', 'Perfect. Serve hot. Very hot.'], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=5, act=8, p=2, title='SPY CHESS', set='spychess', music='harp', items=[
  ['FURY', "I'll move here."], ['sfx', 'tick', -6], ['SONYA', "Lovely. I'll move here. And also blow up your safe house."], ['sfx', 'explode', -8],
  ['FURY', "That's not a chess move."], ['SONYA', 'It is in Britain.'], ['laugh', 'mid'],
  ['PAWN', 'Is anyone else a Skrull, or just me?'], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=6, act=9, p=3, title='NEW SKRULLOS REAL ESTATE', set='realestate', music='infomercial', items=[
  ['AGENT', 'Looking for a home? This one glows at night!'], ['sfx', 'ding', -6],
  ['AGENT', 'Free heating! Free lighting! Free extra arm after three weeks!'], ['sfx', 'boing', -6],
  ['AGENT', 'Never pay for a night light again.'], ['slam', 'NOT SUITABLE FOR HUMANS', 1.6], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=7, act=10, p=3, title='IS MY ___ A SKRULL? HOTLINE', set='hotline', music='hold', items=[
  ['OP', 'Is my blank a Skrull hotline, how can I help?'], ['CALL1', "My dad hasn't laughed at my jokes in years."],
  ['OP', "Not a Skrull. That's just your jokes."], ['sfx', 'rimshot', -6], ['CALL2', 'My cat keeps staring at me.'],
  ['OP', "Also not a Skrull. That's a cat."], ['laugh', 'mid'], ['RHODES', 'My name is Colonel Rhodes, and I would like to cancel this call.'],
  ['wait', .6], ['OP', "We'll get back to you."], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=8, act=11, p=2, title='SUPER SKRULL SPORTS', set='sports', music='sports', items=[
  ['JIM', 'And Gravik goes for the tree arm!'], ['BOB', 'Oh, and she blocks with ice! What a move!'], ['sfx', 'crowd_cheer', -6],
  ['JIM', "She's using his own powers against him. That's got to hurt."], ['BOB', "That's got to hurt his feelings, Jim."], ['laugh', 'mid'],
  ['sfx', 'whoosh', -6], ['JIM', 'And that, folks, is the end of the match.'], ['sfx', 'airhorn', -10], ['wait', 1.0]]),
 dict(id=9, act=12, p=2, title='RHODEY CATCHES UP', set='catchup', music='sitcom', items=[
  ['NURSE', 'While you were asleep, you fired Nick Fury.'], ['RHODEY', 'I did?'], ['NURSE', 'You started a war.'], ['RHODEY', 'I did?!'],
  ['NURSE', 'You also bought a really ugly jacket.'], ['wait', .4], ['RHODEY', 'Okay. That one sounds like me.'], ['laugh', 'big'], ['wait', 1.0]]),
 dict(id=10, act=14, p=0, title='', set='popcorn', music='', items=[
  ['wait', .8], ['sfx', 'boing', -6], ['wait', .7], ['MASC', 'Ahh! No!'], ['sfx', 'whoosh', -4], ['wait', .7], ['sfx', 'thud', -6], ['wait', .5], ['sfx', 'boing', -8], ['laugh', 'big'], ['wait', 1.2]]),
]
V['FAST'] = (.6, 1.08, 1.45, '')
VO = os.environ.get('VO', '/tmp/siwork/vo')
for g in G:
    f = f'{VO}/act{g["act"]:02d}.json'
    if not os.path.exists(f): continue
    j = json.load(open(f)); g['at'] = round(.6 + sum(d + j['gap'] for d in j['durs'][:g['p'] + 1]) - j['gap'] / 2, 2)
