# act7 (The fightback) round 1
autoq render 85.33 s = timing 79.37 + 6 s endTitle hold. qa_auto FAIL slideshow 0:47.5 (6.2 s frozen cabin close-up); WARN loudness -16.5, cut rhythm. autoq ASR flagged shot 4 ("Horscher" = Porsche, ASR mishearing; VO itself fine). Final 6 s: plain title plate, no text, calm drift - OK for end screen.
| t | issue | sev | cause | fix |
|---|---|---|---|---|
| 46-55 | cabin close-up frozen 6 s | high | screen-space overlay, no camera | wrapped in DRIFT push |
| 67-71 | VO asks "Would you trust a car that works like a phone?" but only heated-seat card shown | med | old CTA | new first card + tablet/wheel visual, heated seat card from 'monthly' |
| 6-14 | Ive figure small at frame edge; car undersized vs people | med | s FS*.9 / car FS*.85 | Ive FS*1.1 at x 2150, car FS*1.0 |
| all | chips/labels small (28/26 px) | med | sizes | chip 36, cabin labels 34, tags 44-48 |

Round-1 re-render (85.33 s): qa_auto PASS (0 fail). Sheet check found: sat-nav chip overlaps REAL BUTTONS label (med) -> label moved above toggles; Ive half cut by right edge after cam pan (med) -> x 2020; YES THE iPHONE MAN card collides with FIRST FULLY ELECTRIC chip (med) -> moved below it. CTA now shows tablet+wheel for the trust question, seat+price tag from 'monthly'. End hold clean.
