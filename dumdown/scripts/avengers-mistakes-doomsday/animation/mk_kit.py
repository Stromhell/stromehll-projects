# Build launch kit v1 for Avengers Mistakes from metadata.md + thumbs; chapter times from trimmed act lengths.
import re, base64, html, subprocess, sys, soundfile as sf, numpy as np
L = '/mnt/project-files/dumdown/scripts/avengers-mistakes-doomsday/launch/'; SCR = '/tmp/amwork'
LINK, LEN = sys.argv[1], sys.argv[2]
def dur(f): return float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
starts, t = [], 0
for n in range(14):
    v, a = f'{SCR}/acts/act{n:02d}.mp4', f'{SCR}/mix/act{n:02d}.wav'; tot = round(min(dur(v), dur(a)) * 24)
    x, sr = sf.read(a); m = np.abs(x).max(1) if x.ndim > 1 else np.abs(x); i = np.where(m > 10 ** (-45 / 20))[0]
    tot = min(tot, round((i[-1] / sr + .45) * 24)); starts.append(t); t += tot / 24
md = open(L + 'metadata.md').read()
lines = md.split('\n'); ci = [k for k, l in enumerate(lines) if l.startswith('⏱️ CHAPTERS')][0]
for j in range(14): lines[ci + 1 + j] = '%d:%02d' % (int(starts[j]) // 60, int(starts[j]) % 60) + ' ' + lines[ci + 1 + j].split(' ', 1)[1]
md = '\n'.join(lines).replace('**Length:** 12:14', f'**Length:** {LEN}'); open(L + 'metadata.md', 'w').write(md)
desc = md.split('## Description\n', 1)[1].split('\n## Tags')[0].strip()
tags = md.split('## Tags (constant DumDown set + this video\'s own)\n', 1)[1].split('\n## ')[0].strip()
pin = md.split('## Pinned first comment\n', 1)[1].strip()
opts = [('A', 'Every Avengers Mistake That Built Doomsday (Funny Countdown)', 'thumb_A_thank_you_avengers.jpg'),
        ('B', 'The Avengers Basically BUILT Doctor Doom', 'thumb_B_they_built_doom.jpg'),
        ('C', '12 Avengers Mistakes That Made Doomsday Happen', 'thumb_C_12_mistakes.jpg')]
tpl = open('/mnt/project-files/dumdown/scripts/secret-invasion-s1/launch/secret-invasion-launch-kit-v3.html').read()
head = tpl.split('<main>')[0].replace('<title>Secret Invasion Launch Kit</title>', '<title>Avengers Mistakes Launch Kit</title>')
e = html.escape
def copy(title, body): return f'<section><div class="row"><h2>{title}</h2><button data-c="{e(body)}">Copy</button></div><pre>{e(body)}</pre></section>'
cards = ''.join(f'<section><div class="row"><span class="eyebrow">Option {o}{" · recommended" if o == "A" else ""}</span><button data-c="{e(ti)}">Copy title</button></div><img src="data:image/jpeg;base64,{base64.b64encode(open(L + f, "rb").read()).decode()}" alt="Thumbnail option {o}"><p class="t">{e(ti)}</p></section>' for o, ti, f in opts)
qa = open('/tmp/am/kit/qa.html').read()
body = f'''<main>
<header><div class="eyebrow">DumDown · video 12 · launch kit</div><h1>Every Avengers mistake that built Doomsday</h1></header>
<div class="facts"><span class="chip">Length <b>{LEN}</b></span><span class="chip">Slot <b>Mon 7 Dec, 16:00 UTC</b> (9:30 PM IST)</span><span class="chip">Status <b>not booked, waiting for your OK</b></span><span class="chip">Public · Entertainment · not for kids</span></div>
<section class="ask"><h2>Your call</h2><p>Watch the full video: <a href="{LINK}">DumDown_AvengersMistakes_FULL on Drive</a>. Reply "ok" and say which option (A, B or C), and I'll book it for the slot above, 11 days before Doomsday hits cinemas. A is my pick: the thank-you list is the video's running joke, and the thumbnail reads clearly at phone size.</p></section>
{cards}
{copy("Description (chapters included)", desc)}{copy("Tags", tags)}{copy("Pinned first comment", pin)}
{qa}
<p class="eyebrow">Fan-made parody. Our own cartoon cast; no Marvel artwork.</p>
</main>'''
script = '<script>' + tpl.split('<script>')[1]
open(L + 'avengers-mistakes-launch-kit-v1.html', 'w').write(head + body + '\n' + script); print('kit ok', [round(s) for s in starts])
