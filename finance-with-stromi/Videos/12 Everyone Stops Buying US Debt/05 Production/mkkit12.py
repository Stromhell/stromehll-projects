import json, html, sys
link = sys.argv[1]; LEN = sys.argv[2]; VER = sys.argv[3]; LUFS = sys.argv[4]
src = open('base-kit.html').read().replace('<title>Saving Into Investing Kit','<title>US Debt Kit')
head = src[:src.index('<body>')]; tail = src[src.index('</main><script>'):]
desc = open('youtube-description_v1.txt').read(); tags = json.load(open('youtube-tags_v1.json'))
chap = [l for l in desc.split('\n') if len(l) > 4 and l[0].isdigit() and ':' in l[:6]]
T = "What Happens If Everyone Stops Buying US Debt?"
E = html.escape
b = f"<body><main>\n<h1>{E(T)}</h1>\n<p class=\"sub\">Finance with Stromi · video 12 · launch kit {VER}. Waiting for Pushpam's OK. Nothing is booked yet.</p>\n"
b += f'<section><h2>Full video ({VER})</h2><div class="meta"><div><b>Length</b>{LEN}</div><div><b>Format</b>1920×1080, 24 fps CFR, {LUFS}</div><div><b>End screen</b>clean last 5 s (disclaimer card)</div><div><b>Watch</b><a href="{link}">Open on Drive</a></div></div></section>\n'
b += '<section><h2>Thumbnail</h2><p style="margin:0">Pending. It will be made with ElevenLabs (cheapest image model) once the connector is signed in again. Planned text: <b>WHO WILL LEND?</b> with Tab at the empty IOU Auction podium.</p></section>\n'
b += f'<section><h2>Title</h2><ol class="titles"><li><span class="n">1</span><span class="t">{E(T)}</span><span class="c">{len(T)} chars</span><span class=pill>Pushpam\'s title (used as given)</span></li></ol></section>\n'
b += f'<section><h2>Description <button data-copy="desc">Copy</button></h2><pre id="desc">{E(desc)}</pre></section>\n'
b += '<section><h2>Chapters</h2><ul class="chap">' + ''.join(f'<li><code>{c.split(" ",1)[0]}</code> {E(c.split(" ",1)[1])}</li>' for c in chap) + '</ul></section>\n'
b += '<section><h2>Tags <button data-copy="tagtxt">Copy</button></h2><div class="tags">' + ''.join(f'<span class="tag{" const" if i < 10 else ""}">{E(t)}</span>' for i, t in enumerate(tags)) + '</div><p class="sub" style="margin:10px 0 0;font-size:12px">Dashed = constant Finance channel tags (always kept). Others are this video\'s own.</p><span id="tagtxt" hidden>' + E(', '.join(tags)) + '</span></section>\n'
b += '<section><h2>Pinned first comment <button data-copy="fc">Copy</button></h2><p id="fc" style="margin:0">If nobody showed up to the IOU Auction tomorrow, what would you notice first: your mortgage, your groceries or your savings? Tell us below.</p></section>\n'
b += '<section><h2>Posting plan</h2><div class="meta"><div><b>Channel</b>Finance with Stromi (YouTube)</div><div><b>Proposed slot</b>Sat 5 Dec 2026, 16:00 UTC (9:30 PM IST)</div><div><b>Status</b>Not booked. Books after Pushpam\'s OK</div></div></section>\n'
open('launch-kit_v1.html', 'w').write(head + b + tail)
