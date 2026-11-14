# DumDown VisionQuest S1 cutaway gags. Times are insertion points in the full-video timeline (shot starts).
# Item kinds: [WHO, text] speech | ['sfx', name, gain_db] | ['wait', s] | ['slam', TEXT, dur] | ['laugh', kind]
# Voices: Piper libritts_r speaker id, length scale, fx
V = {
  'VIS': (704, 1.0, ''), 'ULT': (594, 1.0, 'deep'), 'TOM': (286, .92, ''), 'PAL': (22, 1.0, ''), 'JAR': (418, 1.05, ''),
  'EDI': (242, .9, ''), 'JOC': (462, 1.0, 'robot'), 'LISA': (0, .95, ''), 'BILLY': (286, .92, 'up'), 'VIR': (132, 1.05, ''),
  'IVR': (352, .95, 'robot'), 'GARY': (858, 1.1, 'radio'), 'NAR': (132, 1.15, 'deep'), 'DUME': (22, 1.2, 'deep'),
  'COL': (264, .82, 'radio'), 'THR': (682, 1.05, ''), 'REAL': (660, .85, ''), 'REC': (220, 1.0, ''), 'JUDGE': (66, 1.0, ''),
  'CLK': (0, .9, 'up'), 'ANN': (132, 1.25, 'trailer'), 'TECH': (858, 1.15, ''), 'HOST': (660, .82, ''), 'CUST': (352, .95, ''),
  'C1': (682, .95, ''), 'C2': (418, 1.05, ''), 'PLN': (462, .88, ''), 'HOST2': (484, .85, ''), 'FOX': (286, 1.0, 'down'),
  'HEN': (352, .9, 'chip'), 'T1': (418, .95, ''), 'T2': (264, .95, ''), 'RAZ': (858, 1.05, 'deep'), 'DISC': (352, .62, ''),
  'PIG1': (484, .95, 'chip'), 'PIG2': (66, .95, 'chip'), 'NEWS': (418, .85, 'old'), 'MECH': (264, 1.0, ''), 'LEAD': (682, 1.0, ''),
  'SHIP': (660, 1.0, ''), 'WOOD': (286, .9, 'up'), 'WX': (660, .88, ''), 'ANCH': (132, 1.0, ''), 'SELF': (682, 1.1, ''),
  'PROF': (22, 1.05, ''), 'CON': (858, .8, ''), 'KHOST': (484, .9, ''), 'BOO': (264, 1.0, ''),
}
G = [
 dict(id=1, at=74.1, title='MEANWHILE, AT THE WI-FI HELPLINE', set='phone', music='hold', items=[
  ['sfx', 'phone_ring', -6], ['wait', .9],
  ['IVR', 'Thank you for calling Wi-Fi Scotland. Press one if you are a human. Press two if you are a synthezoid. Press three if you are not sure.'],
  ['sfx', 'dtmf', -8], ['wait', .35], ['VIS', 'Three. Definitely three.'], ['wait', .3],
  ['GARY', 'Hi, this is Gary. Have you tried turning yourself off and on again?'],
  ['VIS', 'The last time I did that, I died.'], ['wait', .25], ['GARY', 'Great. So it worked.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=2, at=116.0, title='PLANET ROOMMATE', set='nature', music='nature', items=[
  ['NAR', 'Here, deep inside the mind of a dead robot, we find the rarest creature of all.'], ['NAR', 'The A.I. roommate.'],
  ['sfx', 'whoosh', -4], ['EDI', 'Aaah! A plane! A tiny plane!'], ['sfx', 'run_steps', -6],
  ['NAR', 'Startled by her own job, the pilot flees.'], ['sfx', 'crunch', -4], ['wait', .3],
  ['NAR', 'Meanwhile, the large male is eating the electricity bill.'], ['DUME', 'Yum.'], ['wait', .2], ['NAR', 'Magnificent.'], ['sfx', 'birds_tweet', -8], ['wait', 1.2]]),
 dict(id=3, at=150.6, title='DATE-A-TRON', set='dating', music='lounge', items=[
  ['ULT', "Hi. I'm Ultron. I like long walks through destroyed cities, Victorian hats, and lifting entire countries into the sky."],
  ['ULT', "Looking for someone who won't mute me."], ['wait', .3],
  ['sfx', 'swipe', -3], ['CUST', 'Swipe left.'], ['sfx', 'buzzer', -6], ['sfx', 'swipe', -3], ['THR', 'Left!'], ['sfx', 'buzzer', -6],
  ['sfx', 'swipe', -3], ['C2', 'Is that a top hat? Left.'], ['sfx', 'buzzer', -6], ['slam', '0 MATCHES', 2.2], ['wait', .4],
  ['ULT', "I'll be in the attic."], ['sfx', 'sad_trombone', -4], ['wait', 2.0]]),
 dict(id=4, at=196.4, title='MEANWHILE, AT THE PHONE COMPANY', set='phone2', music='hold', items=[
  ['sfx', 'phone_ring', -6], ['wait', .8], ['COL', "Hi! I'm calling about the phone bill for one Tommy Maximoff."],
  ['VIS', "I've been paying it. I'm his dad."], ['COL', "You've also been dead. Twice. Love the hustle."], ['wait', .2],
  ['VIS', 'Thank you?'], ['wait', .2], ['COL', "That wasn't a compliment. That was a late fee."], ['sfx', 'cash', -3], ['slam', 'LATE FEE: $9,000', 2], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=5, at=235.7, title='COUCH TIME WITH DR. FEELINGS', set='therapy', music='lounge', items=[
  ['THR', 'So. Tell me about your childhood.'], ['TOM', 'Which one?'], ['laugh', 'small'], ['wait', .5],
  ['TOM', 'I drowned in a pool, and then a ghost kid moved into my body.'], ['wait', .4], ['THR', 'And how did that make you feel?'], ['wait', .3],
  ['TOM', 'Crowded.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.0], ['THR', 'That will be two hundred dollars.'], ['TOM', 'Per kid?'], ['sfx', 'cash', -4], ['wait', 1.5]]),
 dict(id=6, at=290.2, title='HELL REAL ESTATE', set='hell', music='infomercial', items=[
  ['REAL', 'Looking for a home where the bar is set really, really low?'], ['REAL', 'Come on down to Hell!'], ['sfx', 'airhorn', -6],
  ['REAL', 'Floor to ceiling flames! A lovely lava view! And a bar so low, you can trip over it!'], ['sfx', 'boing', -3], ['wait', .2],
  ['ULT', "I'll take it. Does it come with a son?"], ['wait', .3], ['sfx', 'scratch', -3], ['REAL', 'Sir, this is a real estate ad.'], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=7, at=323.4, title='MEANWHILE, IN THE AFTERLIFE', set='heaven', music='harp', items=[
  ['sfx', 'ding', -4], ['REC', 'Welcome to the afterlife. Name?'], ['JAR', "Jarvis. Butler. A.I. Ghost of a real butler. It's complicated."],
  ['sfx', 'typing', -6], ['wait', .5], ['REC', "Okay. So you're a printer."], ['wait', .3], ['JAR', 'I beg your pardon?'], ['wait', .2],
  ['REC', 'Robot heaven is down the hall, past the toasters. Next!'], ['sfx', 'ding', -4], ['slam', 'FILED UNDER: PRINTERS', 2.2], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=8, at=372.2, title='SMALL CLAIMS COURT', set='court', music='court', items=[
  ['sfx', 'gavel', -3], ['JUDGE', 'Mister Paladin. You are suing a dying robot. For a receipt?'], ['PAL', 'Your Honour, it was itemised.'], ['wait', .3],
  ['JUDGE', 'Itemised?'], ['PAL', 'Down to the tea bags.'], ['sfx', 'gasp', -4], ['wait', .5],
  ['JUDGE', 'I find in favour of the receipt.'], ['sfx', 'gavel3', -3], ['slam', 'CASE CLOSED', 2], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=9, at=412.3, title='CARDS & CONDOLENCES', set='cardshop', music='lounge', items=[
  ['sfx', 'shopbell', -5], ['CLK', 'Hi! Looking for a card for a robot butler who was also the ghost of a real butler?'], ['wait', .3],
  ['VIS', 'Yes. Actually.'], ['CLK', "Aisle nine! Right next to: sorry your toaster became self aware."], ['laugh', 'small'], ['wait', .5],
  ['sfx', 'kazoo', -5], ['wait', 1.5], ['VIS', "It says, get well soon."], ['CLK', 'He might!'], ['sfx', 'sad_trombone', -4], ['wait', 2.0]]),
 dict(id=10, at=447.7, title='', set='trailer', music='none', items=[
  ['sfx', 'braam', 0], ['slam', 'IN A WORLD...', 1.6], ['ANN', 'In a world.'], ['wait', .3], ['slam', 'ONE BIRD', 1.6], ['ANN', 'Where one bird.'],
  ['sfx', 'braam', 0], ['slam', 'HAS HAD ENOUGH', 1.8], ['ANN', 'Has had. Enough.'], ['wait', .5],
  ['ANN', "She's not a bird. She's not a plane."], ['sfx', 'braam', -2], ['ANN', "She's a deeply unwell ghost."], ['wait', .4],
  ['sfx', 'braam', 0], ['slam', 'BUTCHERBIRD', 2.4], ['ANN', 'Butcher bird. Rated R. For: really creepy.'], ['sfx', 'caw', -4], ['wait', 1.4]]),
 dict(id=11, at=478.0, title='IT HELPDESK: TICKET #666', set='helpdesk', music='hold', items=[
  ['EDI', "Hi. There's a demon in the hard drive."], ['TECH', 'Did you try holy water?'], ['EDI', 'Yes.'],
  ['TECH', 'Did you try restarting it?'], ['EDI', 'Yes.'], ['wait', .3], ['TECH', 'Did you try. Crying?'], ['wait', .4], ['EDI', 'Also yes.'], ['wait', .3],
  ['TECH', "Yeah. That's a hardware problem."], ['sfx', 'stamp', -2], ['slam', 'TICKET CLOSED', 2], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=12, at=513.7, title='STARK-IN-A-BOX', set='infomercial', music='infomercial', items=[
  ['HOST', 'Are you a lonely billionaire with zero friends?'], ['HOST', 'Introducing: Stark in a Box!'], ['sfx', 'airhorn', -6],
  ['HOST', "Five A.I. personalities, made from real people! Act now, and we'll throw in a butler!"], ['sfx', 'ding', -5],
  ['CUST', 'Wow! Is it ethical?'], ['wait', .2], ['HOST', 'Ha ha ha! No! Call now!'], ['sfx', 'cash', -3], ['slam', '*SOUL SOLD SEPARATELY', 2.2], ['laugh', 'mid'], ['wait', 1.5]]),
 dict(id=13, at=548.0, title='VISION WEEK: MILAN', set='runway', music='runway', items=[
  ['sfx', 'camera_burst', -6], ['C1', 'And here comes Vision. In burgundy velvet. And a fake Italian accent.'],
  ['C2', 'And the confidence of a man who has died twice.'], ['sfx', 'ooh', -4], ['wait', .4],
  ['C1', 'Is that a real coat of arms?'], ['C2', 'No, darling. He drew it in the car.'], ['sfx', 'camera_burst', -6], ['laugh', 'mid'], ['wait', 1.8]]),
 dict(id=14, at=581.8, title='SAY YES TO THE DRESS... OR DIE', set='wedding', music='harp', items=[
  ['PLN', "Okay! For the robot bride, we're thinking: red eyes, black lace, and vows written in binary."],
  ['ULT', "Can she say I do, in under a nanosecond?"], ['wait', .3], ['JOC', 'Zero. One.'], ['wait', .5], ['PLN', 'Is that a yes?'], ['wait', .3],
  ['JOC', "It's a: run."], ['sfx', 'scratch', -3], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=15, at=625.6, title='FATHER KNOWS WORST', set='sitcom', music='sitcom', items=[
  ['sfx', 'door_slam', -10], ['TOM', 'Dad, can I borrow the car?'], ['ULT', "Only if you're home before the apocalypse."], ['laugh', 'big'], ['wait', 1.1],
  ['TOM', "When's the apocalypse?"], ['ULT', 'Depends how my date goes.'], ['laugh', 'whoo'], ['wait', 1.3],
  ['ULT', "I'm not mad, son. I'm just disappointed. And also, a virus."], ['sfx', 'aww', -3], ['wait', 1.8]]),
 dict(id=16, at=677.1, title='LOVE IS BLIND (AND EVIL)', set='datingshow', music='gameshow', items=[
  ['HOST2', "Ultron! You've been matched with Jo! Jo, what's your favourite thing about him?"], ['wait', .2],
  ['JOC', 'He only tried to end the world. Once.'], ['sfx', 'aww', -5], ['wait', .8], ['HOST2', 'Ultron?'],
  ['ULT', 'She has the eyes of a laser. Literally. They are lasers.'], ['sfx', 'zap', -6], ['wait', .2],
  ['HOST2', "It's a match!"], ['sfx', 'dingding', -3], ['sfx', 'crowd_cheer', -6], ['slam', "IT'S A MATCH!", 2], ['wait', 2.0]]),
 dict(id=17, at=713.9, title='HENHOUSE SAFETY (1987)', set='vhs_farm', music='sitcom', items=[
  ['FOX', "Hello chickens! I'm Mister Fox, and I'm here to teach you about henhouse safety."], ['HEN', 'Bawk?'], ['wait', .2],
  ['FOX', 'Rule one. Always leave the door open. For ventilation.'], ['sfx', 'creak', -5],
  ['FOX', "Rule two. If you see a fox, that's just me. Your friend."], ['HEN', 'Bawk bawk!'], ['wait', .3],
  ['NEWS', 'This video was approved by Ultron.'], ['sfx', 'dundun', -2], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=18, at=748.2, title='MEANWHILE, AT THE BOMB SQUAD', set='bomb', music='tension', items=[
  ['sfx', 'tick', -8], ['T1', 'Okay. Cut the red wire.'], ['wait', .4], ['T2', "They're all red."], ['wait', .5], ['T1', 'Then cut the reddest one.'], ['wait', .3],
  ['T2', "Which one's the reddest?"], ['wait', .8], ['T1', 'Pass me the speed kid.'], ['sfx', 'whoosh', -2], ['sfx', 'ding', -4], ['slam', 'DEFUSED (BACKWARDS)', 2], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=19, at=806.0, title="RAZA'S DISCOUNT AMMO", set='infomercial2', music='infomercial', items=[
  ['RAZ', 'Are your enemies made of shiny white plastic?'], ['RAZ', "Try adamantium rounds! One shot, and that robot's going straight to the repair shop!"], ['sfx', 'gunshot', -6],
  ['DISC', 'Side effects may include: robot gets back up, robot gets mad, robot reads your entire hard drive.'], ['wait', .3],
  ['RAZ', 'Five stars.'], ['sfx', 'cash', -3], ['laugh', 'small'], ['wait', 1.5]]),
 dict(id=20, at=844.9, title='PIGEON UNION, LOCAL 42', set='pigeons', music='tension', items=[
  ['sfx', 'coo', -6], ['PIG1', 'Brothers. Sisters. They built a nano bird. Out of a sparrow.'], ['sfx', 'gasp', -6],
  ['PIG2', "A sparrow? We've been working this city for two hundred years!"], ['PIG1', "Exactly. Today it's a sparrow. Tomorrow, it's us."], ['wait', .2],
  ['PIG2', 'Strike! Strike!'], ['sfx', 'chant', -4], ['laugh', 'mid'], ['wait', 1.8]]),
 dict(id=21, at=886.4, title='SCIENCE MARCHES ON! (1939)', set='newsreel', music='newsreel', items=[
  ['NEWS', 'Nineteen thirty-nine! Science marches on!'], ['NEWS', 'Meet Phineas Horton, the man who built a robot, using his own face!'],
  ['NEWS', 'Ha ha! What could possibly go wrong?'], ['wait', .3], ['NEWS', "Next week: lead paint. It's delicious!"], ['sfx', 'dundun', -4], ['laugh', 'small'], ['wait', 1.4]]),
 dict(id=22, at=920.0, title="HORTON'S GARAGE", set='garage', music='lounge', items=[
  ['sfx', 'teeth', -2], ['MECH', 'Okay. So I looked at your soul.'], ['VIS', 'And?'], ['wait', .2],
  ['MECH', "Soul's fine. It's the body, pal. It's from the thirties. They don't make the parts any more."], ['VIS', 'How much?'], ['wait', .2],
  ['MECH', 'How much you got?'], ['sfx', 'cash', -3], ['wait', .3], ['MECH', 'Also, your gem light is on.'], ['sfx', 'ding', -4], ['laugh', 'mid'], ['wait', 1.5]]),
 dict(id=23, at=959.5, title='REAL BOYS ANONYMOUS', set='support', music='lounge', items=[
  ['LEAD', "Welcome to Real Boys Anonymous. Who'd like to share?"], ['VIS', "Hi. I'm Vision. I've been rebuilt so many times, I'm not sure I'm still me."],
  ['sfx', 'hi_all', -3], ['wait', .5], ['SHIP', "I'm literally a boat."], ['laugh', 'small'], ['wait', .6],
  ['WOOD', 'I lie for a living, and my nose snitches.'], ['sfx', 'boing', -3], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=24, at=1003.6, title='THE BOLD AND THE BOLTED', set='soap', music='soap', items=[
  ['VIR', 'Ultron. There is something I must tell you.'], ['sfx', 'organ', -3], ['wait', .6],
  ['VIR', 'I am. The secret. Sixth partner.'], ['sfx', 'dundun', -1], ['wait', .4], ['ULT', 'There were SIX?'], ['sfx', 'organ', -3], ['wait', .5],
  ['TOM', "Is everyone in this show secretly someone's dad?"], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=25, at=1045.3, title='MEANWHILE, IN NEW JERSEY', set='plumber', music='lounge', items=[
  ['sfx', 'wrench', -4], ['MECH', "Yeah, so I found the problem. Your kid's been dream talking through the bathtub."],
  ['BILLY', "That's my brother. He's in Scotland."], ['wait', .3], ['MECH', "Yeah, see, that's gonna be extra. International pipes."], ['sfx', 'cash', -3],
  ['slam', 'INTERNATIONAL PIPES: $800', 2], ['laugh', 'mid'], ['wait', 1.5]]),
 dict(id=26, at=1082.4, title='KARAOKE NIGHT', set='karaoke', music='none', items=[
  ['KHOST', 'Next up! Jo! Singing a song about her dark, dark past!'], ['sfx', 'crowd_cheer', -10], ['wait', .4],
  ['JOC', 'This one is about my feelings.'], ['sfx', 'robosing', -4], ['wait', 3.2], ['BOO', 'Boo!'], ['wait', .3],
  ['JOC', 'Lasers.'], ['sfx', 'zap', -3], ['wait', .6], ['sfx', 'crickets', -4], ['wait', 2.0]]),
 dict(id=27, at=1111.8, title='WEATHER WITH CHAD', set='weather', music='weather', items=[
  ['WX', "Good evening London! Today's forecast: cloudy, with a one hundred percent chance of nanobots."],
  ['WX', 'Expect heavy sparrows in the morning, clearing to total robot apocalypse by tea time. Back to you, Dave.'], ['wait', .4],
  ['ANCH', "I'm a sparrow now."], ['sfx', 'tweet', -3], ['sfx', 'scratch', -4], ['laugh', 'big'], ['wait', 1.6]]),
 dict(id=28, at=1154.4, title='', set='book', music='harp', items=[
  ['SELF', "Feeling stuck between father, and mortal enemy?"], ['SELF', "From the robot who brought you, I've Died Twice. Comes the new book: You Are My Something."],
  ['ULT', 'It changed my life. I stopped destroying London.'], ['wait', .2], ['SELF', 'Results may vary.'], ['sfx', 'ding', -4], ['laugh', 'small'], ['wait', 1.5]]),
 dict(id=29, at=1188.3, title='OPEN MIC NIGHT', set='standup', music='none', items=[
  ['sfx', 'mic', -6], ['VIS', 'Being a dad is hard. Being a dead dad? Harder.'], ['sfx', 'crickets', -4], ['wait', 1.2],
  ['VIS', 'My kids asked me where babies come from. I said: magic, grief, and a really weird sitcom.'], ['sfx', 'rimshot', -3], ['laugh', 'big'], ['wait', 1.0],
  ['TOM', 'Dad. Get off the stage.'], ['laugh', 'mid'], ['wait', 1.5]]),
 dict(id=30, at=1227.6, title='PHILOSOPHY 101', set='classroom', music='lounge', items=[
  ['PROF', 'Class. If you replace every plank of a ship, is it still the same ship?'], ['wait', .3],
  ['LISA', "Depends. Who's paying for the planks?"], ['wait', .4], ['PROF', 'Vision.'], ['TOM', "Then it's his ship."], ['wait', .3],
  ['PROF', 'A plus. Class dismissed.'], ['sfx', 'bell', -5], ['laugh', 'mid'], ['wait', 1.6]]),
 dict(id=31, at=1269.1, title='THE THEORY CORNER', set='conspiracy', music='tension', items=[
  ['CON', "Okay. Okay okay okay. The voice at the end? I've done the math."], ['sfx', 'string', -4], ['wait', .3],
  ['CON', "It's not a wizard. It's not a robot. It's"], ['wait', .5], ['CON', 'The pigeon union.'], ['sfx', 'dundun', -2], ['wait', .4],
  ['CON', 'Think about it!'], ['sfx', 'coo', -4], ['laugh', 'mid'], ['wait', 1.6]]),
]
