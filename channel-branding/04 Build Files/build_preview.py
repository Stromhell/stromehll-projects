import base64, pathlib
D = pathlib.Path('/tmp/claude-0/brand')
P = D / 'prev'
def uri(name):
    mime = 'image/png' if name.endswith('.png') else 'image/jpeg'
    return f"data:{mime};base64," + base64.b64encode((P / name).read_bytes()).decode()

frame = uri('frame.jpg')
OPTS = [
 ('A', 'Stormi the mascot', 'A character face for the channel, drawn in the same comic style as your 2D history videos. Blue comic burst, a storm-cloud tuft with a lightning bolt, and the title in chunky outlined type with a yellow slanted tag. History, money, tech and mystery props sit at the edges for desktop.', 'Most personality. Faces build recognition fastest in the subscriber feed.'),
 ('B', 'Storm bolt', 'A clean lightning-bolt badge on a dark navy desk with faint map contour lines, in the same mood as the Control Room. The calm option that sits well next to the realistic 3D documentaries.', 'Clearest watermark at tiny sizes. Least playful.'),
 ('C', 'Parchment map', 'An old-map world: parchment, map borders and little country blobs with faces, taken from the map shots in your history videos. The profile picture is a smiling globe with a bolt, so "explain everything" reads as "explain the whole world".', 'Says "history and world explainers" at a glance.'),
]
blocks = []
for k, name, desc, note in OPTS:
    blocks.append(f'''
<section class="opt" aria-labelledby="h{k}">
  <div class="opt-head"><span class="letter">{k}</span><h2 id="h{k}">{name}</h2><p>{desc}</p><p><strong>{note}</strong></p></div>
  <div>
    <p class="label">Banner, 2560 × 1440</p>
    <div class="banner"><img src="{uri(k+'-banner.jpg')}" alt="Option {k} channel banner"><div class="zone desk"><b>DESKTOP SHOWS THIS BAND</b></div><div class="zone safe"><b>SAFE ON EVERY DEVICE</b></div></div>
  </div>
  <div class="row">
    <div>
      <p class="label">Profile picture, 800 × 800</p>
      <div class="avatars">
        <figure><img src="{uri(k+'-profile.jpg')}" width="160" height="160" alt="Option {k} profile picture"><figcaption>channel page</figcaption></figure>
        <figure><img src="{uri(k+'-profile.jpg')}" width="64" height="64" alt=""><figcaption>comments</figcaption></figure>
        <figure><img src="{uri(k+'-profile.jpg')}" width="36" height="36" alt=""><figcaption>feed</figcaption></figure>
      </div>
      <div class="channel"><img src="{uri(k+'-profile.jpg')}" alt=""><div><strong>Stormi Explain Everything</strong><span>History, business and mysteries, explained</span></div></div>
    </div>
    <div>
      <p class="label">Watermark, 150 × 150 PNG</p>
      <div class="player"><img class="f" src="{frame}" alt="Video frame with option {k} watermark in the corner"><img class="wm" src="{uri(k+'-watermark.png')}" alt=""><div class="bar"><i></i></div></div>
      <div class="wm-tiles"><div style="background:#111"><img src="{uri(k+'-watermark.png')}" alt=""></div><div style="background:#eee"><img src="{uri(k+'-watermark.png')}" alt=""></div><div style="background:#E9D3A8"><img src="{uri(k+'-watermark.png')}" alt=""></div></div>
    </div>
  </div>
</section>''')
html = (D / 'preview.tpl.html').read_text().replace('%%OPTIONS%%', '\n'.join(blocks))
(D / 'stormi-brand-kit.html').write_text(html)
print(len(html))
