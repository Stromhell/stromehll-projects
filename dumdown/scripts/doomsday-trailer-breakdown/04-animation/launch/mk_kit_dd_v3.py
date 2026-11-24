# Doomsday trailer breakdown launch kit: metadata.md + self-contained HTML (thumbs embedded). usage: mk_kit_dd.py LEN DRIVE_URL "t0,t1,..."(13 act starts in s)
import sys, base64, html, io
from PIL import Image
L = '/mnt/project-files/dumdown/scripts/doomsday-trailer-breakdown/06-launch/'
LEN, URL, TS = sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3].split(',')]
names = ["Old Cap is back?!", "The farmhouse (Steve, Peggy and the kid)", "The Fantastic Four knock on the door", "Endgame ghosts", "Doom's church of green", "The sky is wrong", "Thor vs Doom", "The New Avengers (who are these people?)", "Wakanda meets the Fantastic Four under the sea", "Doomsday: the battle", "The after-title joke", "What every character will do", "The full story prediction"]
mmss = lambda s: f"{int(s)//60}:{int(s)%60:02d}"
ch = "\n".join(f"{mmss(t)} {n}" for t, n in zip(TS, names))
OPTS = [("A", "Avengers: Doomsday Final Trailer Breakdown: Every Reference You Missed", "thumb_A_old_cap_v2.jpg", "Old Cap lifting the hammer, text on the right: OLD CAP IS BACK?!"),
        ("B", "Doomsday Final Trailer: Who Is Under the Masks? (Every Character Spotted)", "thumb_B_masks_v2.jpg", "Doom in green with the masked choir: WHO IS UNDER THE MASKS?"),
        ("C", "2 Captain Americas?! Avengers: Doomsday Trailer Breakdown + Story Prediction", "thumb_C_two_caps_v1.jpg", "Old Cap and New Cap side by side: 2 CAPTAIN AMERICAS")]
DESC = f"""The final Avengers: Doomsday trailer is out, and it hid a LOT. 👀

We went through it frame by frame: every character we could spot, every reference to Endgame, the Fantastic Four, the X-Men and Wakanda, what each hero is probably doing, and our full guess at the story. Plus a few cartoon gags, because Thor brought slides.

This is DumDown: Marvel, dumbed down, so anyone can get it. A funny cartoon trailer breakdown, ready before Doomsday hits cinemas on 18 December.

⚠️ Trailer spoilers + theories. Nothing from the actual film.

⏱️ CHAPTERS
{ch}

💬 Who did YOU spot that we missed? Drop the timestamp 👇
🔔 Subscribe to DumDown for more Marvel movies and shows, dumbed down so anyone can get them.
▶️ Watch next: Every Avengers Mistake That Built Doomsday

Fan-made parody and commentary. Not affiliated with Marvel or Disney. All characters are our own cartoon versions.

#AvengersDoomsday #Marvel #MCU"""
TAGS = "DumDown, Marvel explained, MCU explained, Marvel recap, funny Marvel, Marvel for beginners, Marvel for teens, MCU recap, superhero explained, Marvel cartoon, Marvel funny, Marvel movie explained, Avengers Doomsday trailer, Doomsday trailer breakdown, Avengers Doomsday final trailer, Doomsday easter eggs, Doctor Doom, Fantastic Four Avengers, X-Men MCU, Avengers Doomsday theory, Doomsday trailer reaction"
PIN = "Old Cap with the hammer again, or Thor's slides? What was the best moment of the trailer? 👇"
open(L + 'metadata_v3.md', 'w').write(f"# DumDown: Avengers: Doomsday Final Trailer Breakdown, launch metadata (v3)\n\n## Title + thumbnail options\n| # | Title | Thumbnail |\n|---|---|---|\n" + "\n".join(f"| {o}{' (recommended)' if o=='A' else ''} | {t} | {f}: {d} |" for o, t, f, d in OPTS) + f"\n\n**Length:** {LEN} (last 7 s clean end screen).\n\n**Schedule (proposed, not booked):** Wed 25 Nov 2026 16:00 UTC (9:30 PM IST), the earliest DumDown slot 48 h after Agatha (23 Nov). Every later DumDown booking moves +48 h (Deadpool & Wolverine 27 Nov ... Avengers Mistakes 9 Dec). Public, category 24, not made for kids.\n\n## Description\n{DESC}\n\n## Tags\n{TAGS}\n\n## Pinned first comment\n{PIN}\n")
def b64(f):
    im = Image.open(L + f).convert('RGB'); bio = io.BytesIO(); im.resize((960, 540)).save(bio, 'JPEG', quality=82); return 'data:image/jpeg;base64,' + base64.b64encode(bio.getvalue()).decode()
e = html.escape
cards = "".join(f'<section><div class="row"><span class="eyebrow">Option {o}{" · recommended" if o=="A" else ""}</span><button data-c="{e(t)}">Copy title</button></div><img src="{b64(f)}" alt="Thumbnail option {o}"><p class="t">{e(t)}</p></section>' for o, t, f, d in OPTS)
blk = lambda h, s: f'<section><div class="row"><h2>{h}</h2><button data-c="{e(s)}">Copy</button></div><pre>{e(s)}</pre></section>'
CSS = open('/tmp/eng/launch/kit.css').read()
page = f"""<title>Doomsday Trailer Launch Kit</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;600&display=swap">
<style>{CSS}</style>
<main>
<header><div class="eyebrow">DumDown · Doomsday final trailer breakdown · launch kit</div><h1>Avengers: Doomsday final trailer, broken down</h1></header>
<div class="facts"><span class="chip">Length <b>{LEN}</b></span><span class="chip">Proposed slot <b>Wed 25 Nov, 16:00 UTC</b> (9:30 PM IST)</span><span class="chip">Status <b>not booked, waiting for your OK</b></span><span class="chip">Public · Entertainment · not for kids</span></div>
<section class="ask"><h2>Your call</h2><p>Watch the full video: <a href="{URL}">DumDown_DoomsdayTrailer_FULL_v3 on Drive</a>. Reply "ok" with A, B or C and I'll book it for the earliest slot above and move the later DumDown videos back 48 h each so the spacing stays. A is my pick: Old Cap with the hammer is the trailer's big moment and reads at phone size.</p></section>
{cards}
{blk('Description (chapters included)', DESC)}{blk('Tags', TAGS)}{blk('Pinned first comment', PIN)}
<section><h2>What's in it</h2><ul>
<li>Every set matched to a trailer frame: farmhouse, Baxter-style hangar, Doom's green hall, burnt battlefield, the sea floor with the water wall, the plaza beam.</li>
<li>Every character we could spot, with who they probably are and what they will do, plus a full story prediction at the end.</li>
<li>9 gags inside the acts (the talk with the kid, the Doom mask shop, Thor's charger, name tags, the underwater handshake, yellow spandex, the speech contest, the string board), each with its own voice and a 1.7 s laugh hold.</li>
<li>Names said properly (M'Baku, Namor, Latveria, Yelena Belova, Shang-Chi, Mjolnir...).</li>
</ul></section>
<p class="eyebrow">Fan-made parody. Our own cartoon cast; no Marvel artwork.</p>
</main>
<script>document.querySelectorAll('button[data-c]').forEach(b=>b.onclick=()=>{{navigator.clipboard.writeText(b.dataset.c).then(()=>{{const o=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=o,1200)}}).catch(()=>{{}})}})</script>"""
open(L + 'doomsday-trailer-launch-kit-v3.html', 'w').write(page); print('ok')
