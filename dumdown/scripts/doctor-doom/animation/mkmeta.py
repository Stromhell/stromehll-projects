# Writes launch/metadata.md for Doctor Doom with chapters from /tmp/ddwork/full/act_starts.json
import json
st = json.load(open('/tmp/ddwork/full/act_starts.json'))
heads = ["Doom's throne of everything", "A tent, not a castle", "The cold mountain", "Mum's secret box", "The roommate problem", "The maths mistake", "The hot mask", "King of Latveria", "The Fantastic problem", "The Surfer's power", "Two Dooms, one throne", "The big game", "Emperor of paperwork", "The secret rescue", "Doom becomes a god (again)", "The one true sentence", "The Iron Man era and beyond", "So why the mask?"]
def ts(s): s = int(s); return f"{s//60}:{s%60:02d}"
ch = "\n".join(f"{ts(st[str(i)])} {h}" for i, h in enumerate(heads))
import subprocess
L = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','/tmp/ddwork/full/DumDown_DoctorDoom_FULL_v1.mp4'],capture_output=True,text=True).stdout)
md = f"""# DumDown: Doctor Doom launch metadata

**Title:** Doctor Doom's Entire Life Explained (Funny Recap)  (49 chars, name first, plan v4 formula)

**Thumbnail:** DumDown_DoctorDoom_thumbnail_v1.jpg (1280x720). Free engine still of our own cast (Doom casting green magic in his throne hall, little Victor shocked beside him). Text on the left, never over characters: name slab [DOCTOR DOOM] + "HIS ENTIRE" + "LIFE" + "DUMBED DOWN".

**Length:** {ts(L)}. Last 5 s clean fade for the end screen.

**Schedule:** NOT BOOKED. Waiting for Pushpam's OK. Earliest slot: Tue 1 Dec 2026 16:00 UTC (>=48 h after Thunderbolts* on 29 Nov). Timed before Avengers: Doomsday (18 Dec). Public, category 24 (Entertainment), not made for kids.

**Playlists:** Marvel Movie Recaps + Start Here: Marvel for Beginners.

## Description
He grew up in a tent. He lost his mum to a deal with a demon. He blew up a machine at university, put on a mask, and decided to run the whole world. 😅

This is Doctor Doom's entire life, DUMBED DOWN: a funny cartoon recap for Marvel fans of all ages, just in time for Avengers: Doomsday. The camp, the mountain monks, the roommate problem with Reed Richards, Latveria, the Silver Surfer's power, the Beyonder, God Emperor Doom, and why that mask never comes off.

⚠️ Spoilers for decades of Marvel comics.

⏱️ CHAPTERS
{ch}

💬 Hero, villain or just a very dramatic neighbour? Tell us what Doom really is 👇
🔔 Subscribe to DumDown for more Marvel movies, shows and characters, dumbed down so anyone can get them.
▶️ Watch next: Marvel Movie Recaps playlist

Fan-made parody and commentary. Not affiliated with Marvel or Disney. All characters are our own cartoon versions.

#Marvel #MCU #DoctorDoom

## Tags (constant DumDown set + this video's own)
DumDown, Marvel explained, MCU explained, Marvel recap, funny Marvel, Marvel for beginners, Marvel for teens, MCU recap, superhero explained, Marvel cartoon, Marvel funny, Marvel series explained, Doctor Doom, Doctor Doom explained, Doctor Doom origin, Victor Von Doom, Avengers Doomsday, Doom history, Latveria, Fantastic Four villain, Doctor Doom funny recap, Doctor Doom for beginners, Doom cartoon

## Pinned first comment
Be honest: if Doom ran your country and the trains were always on time... would you complain? 🚂👑👇
"""
open('/mnt/project-files/dumdown/scripts/doctor-doom/launch/metadata.md','w').write(md); print(md[:400]); print(ch)
