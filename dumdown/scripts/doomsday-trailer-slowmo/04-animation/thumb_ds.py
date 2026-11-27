# Doomsday 0.25x thumbs A/B/C from engine stills (/tmp/dsw/shotrev). Text never over faces; subject name highlighted.
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
exec(open('/tmp/eng/thumb_dd.py').read().split("OUT = ")[0])
OUT = '/mnt/project-files/dumdown/scripts/doomsday-trailer-slowmo/06-launch/'; S = '/tmp/dsw/shotrev/a%02d_s%02d_%d.jpg'
def crop(a, i, k, box, size=(1280, 720)): im = Image.open(S % (a, i, k)).convert('RGB').crop(box).resize(size, Image.LANCZOS); return ImageEnhance.Contrast(ImageEnhance.Color(im).enhance(1.25)).enhance(1.1)
# A: detective + 0.25x remote (text top-right, clear of the hair)
im = crop(0, 3, 0, (480, 138, 1910, 942))
word(im, 'WHAT MARVEL', 0, 24, 62, (255, 255, 255), left=700); word(im, 'HID', 0, 108, 110, (255, 210, 61), left=700)
word(im, 'DOOMSDAY TRAILER', 0, 18, 34, INK, box=(255, 210, 61), rot=-2, left=10)
im.save(OUT + 'thumb_A_slowmo_remote_v2.jpg', quality=95)
# B: Doom flying through the window
im = crop(3, 12, 0, (160, 138, 1590, 942))
word(im, 'WHO THREW', 0, 24, 70, (255, 255, 255), left=16); word(im, 'DOOM?!', 0, 104, 100, (122, 255, 154), left=16)
word(im, 'DOOMSDAY AT 0.25x', 0, 620, 40, INK, box=(255, 210, 61), rot=-2, left=800)
im.save(OUT + 'thumb_B_doom_thrown_v2.jpg', quality=95)
# C: the ERASED box, picture under a dark title band
pic = crop(0, 7, 0, (0, 138, 1920, 942), (1280, 536)); im = Image.new('RGB', (1280, 720), (16, 12, 18)); im.paste(pic, (0, 184))
word(im, 'MARVEL ERASED THIS?', 640, 40, 84, (255, 255, 255))
word(im, 'AVENGERS: DOOMSDAY', 0, 640, 36, INK, box=(255, 210, 61), rot=-2, left=20)
im.save(OUT + 'thumb_C_erased_v1.jpg', quality=95)
print('ok')
