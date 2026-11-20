# DumDown Doctor Doom cutaway gags (all lines original, family-friendly). act/p = cut in after narrator paragraph p of that act (p = last para -> end of act).
import json, os
V = {
  'MEPH': ('am_puck', .95, ''), 'FAST': ('am_liam', .55, ''), 'APP': ('af_sky', 1.0, ''), 'REED': ('am_adam', .95, ''),
  'DOOM': ('bm_george', 1.05, 'doom'), 'BOT': ('bm_george', 1.0, 'robot'), 'KID': ('af_nicole', .9, 'up'), 'CALLER': ('am_echo', 1.0, ''),
  'ATT': ('af_nova', 1.0, 'robot'), 'THER': ('bf_emma', 1.05, ''), 'ANCHOR': ('bm_lewis', 1.0, ''), 'HOSTW': ('af_kore', .92, ''), 'LEAD': ('am_eric', 1.0, ''),
}
G = [
 dict(id=1, act=1, p=2, title="MEPHISTO'S DEAL OF THE DAY", set='shop_studio', music='infomercial', items=[
  ['MEPH', 'Unlimited power! Unlimited magic! Unlimited glow!'], ['sfx', 'dingding', -4], ['MEPH', 'All yours, for three easy payments of...'], ['wait', .4], ['MEPH', 'your soul!'], ['sfx', 'cash', -4],
  ['MEPH', 'Operators are standing by. Forever!'], ['FAST', 'Terms apply. All of them. Souls are non refundable. Mephisto is not your friend.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=2, act=4, p=2, title='RATE MY ROOMMATE', set='app_bg', music='hold', items=[
  ['APP', 'Victor, nineteen. Likes: magic, metal, being alone. Dislikes: Reed. Looking for: nobody.'], ['sfx', 'whoosh', -4],
  ['APP', 'Reed, nineteen. Likes: everyone!'], ['REED', 'Hi! Want to be roommates?'], ['sfx', 'whoosh', -2], ['sfx', 'explode', -4],
  ['APP', 'Your phone has been rated one star.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=3, act=5, p=5, title='MATHS CLASS WITH DOCTOR DOOM', set='kids_set', music='gameshow', items=[
  ['DOOM', 'Good morning, children. Today, Doom teaches numbers.'], ['DOOM', 'Two plus two equals five.'], ['KID', 'Um, is it not four?'], ['sfx', 'gasp', -4],
  ['DOOM', 'Anyone who disagrees may explain it to my robots.'], ['sfx', 'sad_trombone', -6], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=4, act=6, p=4, title='IS HE A REAL DOCTOR?', set='call_centre', music='hold', items=[
  ['sfx', 'phone_ring', -6], ['CALLER', 'Hi. My arm hurts. Can Doctor Doom help?'], ['DOOM', 'Doom can replace it with a robot arm.'], ['wait', .5],
  ['CALLER', 'I think I will see my regular doctor.'], ['DOOM', 'THERE IS NO OTHER DOCTOR.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=5, act=7, p=2, title='DOOMBOT CUSTOMER SERVICE', set='call_centre', music='hold', items=[
  ['BOT', 'You have reached Doom. Doom is not here.'], ['BOT', 'This is also Doom.'], ['sfx', 'beep', -6],
  ['BOT', 'Press one if you are Reed Richards, so that Doom may laugh at you.'], ['sfx', 'beep', -6], ['BOT', 'Ha. Ha. Ha.'], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=6, act=9, p=6, title="DOOM'S FLIGHT SCHOOL", set='plane', music='hold', items=[
  ['sfx', 'ding', -6], ['ATT', 'Welcome aboard Doom Air.'], ['ATT', 'In case of an invisible planet wall, please...'], ['wait', .8], ['ATT', 'no. There is nothing you can do.'],
  ['sfx', 'punch', -4], ['ATT', 'Enjoy your flight.'], ['sfx', 'screech', -10], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=7, act=11, p=5, title='THERAPY WITH DOCTOR DOOM', set='therapy', music='lounge', items=[
  ['THER', 'And how did that make you feel?'], ['DOOM', 'Reed.'], ['wait', .4], ['THER', "That's not a feeling."], ['DOOM', 'It is now.'], ['laugh', 'big'], ['wait', 1.2]]),
 dict(id=8, act=12, p=3, title='THE DAILY DOOM', set='news', music='newsreel', items=[
  ['ANCHOR', "Good morning. Today's top story: Emperor Doom has approved form twenty seven B."], ['sfx', 'stamp', -4], ['ANCHOR', 'Form twenty seven C is under review.'],
  ['ANCHOR', 'In sport: there is no sport. Sport has been replaced by forms.'], ['sfx', 'stamp', -4], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=9, act=14, p=2, title='GOD-EMPEROR HOME MAKEOVER', set='makeover', music='gameshow', items=[
  ['HOSTW', "Today we're redecorating all of reality!"], ['sfx', 'dingding', -4], ['HOSTW', 'New planets! New oceans! A brand new sky!'],
  ['HOSTW', "And here, we've kept one old, scratched, ugly item, for sentimental reasons."], ['DOOM', "Don't touch it."], ['laugh', 'mid'], ['wait', 1.2]]),
 dict(id=10, act=16, p=1, title="DOOM'S SUPPORT GROUP", set='support', music='lounge', items=[
  ['LEAD', 'Welcome back, everyone. Who here has been personally ruined by Doom?'], ['sfx', 'whoosh', -8], ['wait', .8], ['LEAD', 'Everyone. Again.'],
  ['BOT', 'Doom has also been ruined by Doom.'], ['laugh', 'big'], ['wait', 1.2]]),
]
