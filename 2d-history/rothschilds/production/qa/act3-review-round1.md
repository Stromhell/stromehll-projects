# Act 3 (Waterloo and the real money): review round 1, after Pushpam's 31 Oct notes

Checked: production/acts/act3/act3.mp4 (1920x1080, 30 fps, 49.5 s), the /watch run (qa.sh rs3, 3 sheets), 1 fps sheets
(2 sheets, 50 frames), step sheets at 5 fps for the Waterloo shot (9.6-15.2 s) and the ledger stack (35-38.2 s), and full-res frames at 2, 11,
12.2, 12.8, 13.2, 14.2, 14.9, 22, 25, 36 and 44 s. Every item in shared/qa_rules.md was checked.

## Pushpam's note: Waterloo (3.02, act 10.4-15.2 s), "looks low, make it a war site"

**Fixed as a war scene.** It now reads as a battlefield:
- a stormy smoke sky with birds, Hougoumont burning on the ridge, and a second farm;
- a long British line with its colours, and three French columns with tricolours;
- craters, mud, wheel ruts, scattered debris, cannonballs, and a burning wagon with a broken wheel;
- two bronze field guns with spoked wheels and trails, crewed by gunners with a linstock and a rammer, firing with flash and smoke, and shot landing among the French;
- the tricolour and eagle toppling at 14.4-15.0 s.

Rule 11 is met. Grounding:
- the left gunner's feet are on the field;
- the rear gunner (scale 1.0) stands behind gun B, and at his scale his feet fall level with the wheel bottom, so he is behind the gun, not riding it;
- the red-coated officer's legs run down behind the subtitle and off the bottom of the frame;
- the flagpole is planted in the ground, and the troops stand on the plain.

Nothing floats. The remaining problems are below (issues 1-3).

Other fixes in this act:
- **3.03** (15.6-24 s): **fixed.** The traders run, point and gesture through the whole shot, and Nathan breathes. Every walker has his feet on the paving.
- **3.04** (24.4-35 s): **fixed.** The pamphlet and the history book lie flat on the desk top, seen from above. See issue 5 for a small point about the quill.
- **3.05** (35-41.5 s): **fixed.** The ledgers drop onto the desk and settle into a tight stack, each landing within about 0.3 s. The chart board stands on the desk on its bottom edge.
- **3.06** (41.5-49.5 s): **fixed.** The five brothers have varied poses (bearded, gesturing, one cheering with both arms up) and stand on the floor with clear gaps.
  The coat of arms is small and hangs over the door.

## Issues

1. **10.6, 12.2 and 13.2 s (each gun-B shot), MEDIUM (overlap): gun B fires out of the officer's body.** The red-coated officer stands right in front of gun B's
   muzzle. The muzzle sits hidden behind him, and the flash and star burst are drawn over his chest and face, so it looks as if the shot
   comes out of him.
   Fix: move gun B and its rear gunner about 250 px left, or the officer about 200 px right, so the muzzle, flash and smoke are clear of his body.

2. **10.4-15.2 s, MEDIUM (rule 11, "looks low"): the cavalry horses are crude.** The three horses at the left (two brown, one dark grey) have stick legs,
   long necks, tiny heads and no saddle or bridle, so they read as llamas. The rest of the battlefield is detailed, and these stand out.
   Fix: draw proper horses (a deep chest, jointed legs with hooves, mane, tail, saddle cloth and bridle), with riders seated in the saddle. Keep the horses apart from each other (rule 10). They do not overlap now.

3. **0-10.4 s, MEDIUM (rule 12): the dock ships have little detail.** The ship in the middle distance (and the fainter one on the right) is a flat black hull with
   stick masts and a few lines. It has no sails or furled canvas, no gunports or wales, and no shading. The ships are in fog, but the main one is a clear midground object.
   Fix: add a shaded hull with a wale stripe and gunports, furled sails on the yards, rigging lines and a stern lantern. Mist can stay over the far one.

4. **14.4-15.2 s, LOW: the eagle falls just before the cut.** The standard only finishes falling as the dissolve to 3.03 begins, so the beat is easy to miss.
   Optional fix: start the fall about 0.3 s earlier, or hold the shot 0.3 s longer.

5. **24.4-35 s, LOW: the quill stands on its nib.** On the top-down desk the quill is drawn standing upright, so it looks like it is balanced on its nib.
   Optional fix: lay it flat on the desk at an angle, with a soft shadow, like the coins.

6. **0-5 s, LOW (matches the script loosely): there is no gangway.** The code comment says the porters carry chests "up the gangway", but they walk along the quay
   away from the ships, holding small chests. The chests are held, so this is not a rule hit.

## Rules with no hits
- 1-3 (grounding): the porters and Nathan on the quay, the gunners and the officer, the 3.03 traders and Nathan, and the five brothers and the emperor all have their feet on the ground or floor. Nobody stands on furniture, and nobody is seated.
- 4-5 (props): the porters' chests, the gunners' linstock and rammer, and the 3.04 papers on the desk are all held or resting. The ledgers land on the stack.
- 6-7 (books): the history book lies open on the desk, and no prop crosses a body.
- 8 (no still frames): every shot moves. The quietest stretch is 8.5-9.5 s on the dock, where Nathan still idles: 3,400-9,700 pixels change in his region against the first frame. The 3.04 desk has a slow drift and light flicker.
- 9 (vehicles): none cross any architecture. The burning wagon is wreckage in the foreground.
- 10 (animals): the three horses do not overlap (their detail is issue 2).
- 11 (war-zone detail): met (see above).
- 13 (period detail): shakos, bicornes, top hats, 1815 colours and 1822 court dress.
- Labels: none cover the subtitles or a face.

## Audio
- Integrated -16.1 LUFS (target about -16), LRA 3.3 LU, true peak -1.5 dBFS.
- Effects and beds against narration: I took the narration out of the mix (narration gain 1.6). The loudest leftover is -23.2 dB RMS (0.8 s), against narration at -14.3 dB.
  The battle thuds and hits stay at least 8 dB under the narration, and the hit at 14.8 s falls in a narration pause (-25.4 dB). No effect is louder than the narration.
- No sample jumps, so no pops.

## Content
- Nathan, the brothers and Emperor Francis are stylised cartoons. Napoleon is not drawn: there is only a tricolour and a card.
- 3.04: the antisemitic pamphlet's image is fully blurred and stamped with a red MYTH stamp. The script line 3.04 asks for MYTH here (FALSE is used in 6.02).
  It is also captioned "SOME OPENLY ANTISEMITIC" and followed by the real account. No swastikas, no Hitler.

## Decode
- `ffmpeg -v error -i act3.mp4 -f null -` gives no errors.

Totals: 0 high, 3 medium, 3 low.

RESULT: FIXING
