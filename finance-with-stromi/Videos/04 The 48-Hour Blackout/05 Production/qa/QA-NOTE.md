# QA note: Finance with Stromi 04, The 48-Hour Blackout (14 Nov 2026)

Checks run: `qa_auto.py --kind act` on all 7 acts, every 1 fps contact sheet read (49 sheets), overlap.js, frame crops at every flagged range, voice_qa.py pass 2 on all dry VO.

## Fixed (acts 1, 2, 5 re-rendered)
- S44 bar chart (5 airlines): bars spilled outside the card on both sides. Card now widens for 5 bars and sits lower (BB position) so it covers less of the ticker.
- S23 ground-stop bars appeared only in the last second of the shot and overlapped the Nov 13 card. Now triggers at "about an hour" and sits bottom right (BRL).
- S10 "70+ countries" counter reached 70 only ~0.3 s before the cut. Now triggers at "More than seventy".

## Machine flags reviewed and accepted
- No audio stream on acts: expected, the mix is added at combine.
- Dark scene at 0:00-0:03 of each act: chapter title cards (black by design).
- Act 6 3:23-3:28 black/frozen: the clean 5.5 s end screen (required).
- Z-fighting act 1 1:49-2:04: the fast-spinning clock hands (time-lapse, S14). Act 3 0:35-0:44: blinking rack LEDs + lip sync (S27). Both intentional motion, no coplanar surfaces.
- Dark scenes act 3 (S29/S30 coin pile), act 5 (trading floor S43/S47/S48), act 6 (gate S62): night/low-key sets, subjects and all text read clearly on the sheets.

## Voice
- voice_qa pass 2: clipped-word FAILs fixed; S41 ~19.42 s and S61 ~14.26 s are plosive closures (false positives).
- WARN spots S29 0:00.59, S58 0:03.91 / 0:13.89, S43 0:16.63 checked on spectrograms: continuous harmonics, no dropouts or breaks.
