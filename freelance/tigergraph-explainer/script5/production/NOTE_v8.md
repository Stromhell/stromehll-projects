# TigerGraph Script 5, v8 (28 Nov 2026)

Built from Pushpam's timestamped notes on v7 (28 Nov, 11:42 UTC). File: renders/TigerGraph_Script5_v8.mp4, 2:43.3, same VO and sound system.

## One continuous film (the big change)
- v1-v7 rendered each scene on its own page and joined them with dissolves. v8 is ONE page and ONE timeline for the whole film (anim_v8/pages/film.html, gen_film.py, film.js, render_film.js).
- One background world: each scene's ground fades in over the last as a lighting change; the frame never dissolves as a whole.
- One network for the whole film: about 90 points; their links draw in one by one, slowly, from the first second to the last; each point keeps breathing; the whole network drifts slowly in depth.
- Carried objects are now single objects: a card leaving one scene travels in ONE smooth Easy Ease move straight onto the real element it becomes in the next scene (no more "stop on a spot, swap, start again"), and its look changes into the next one on the way. 23 hand-offs work this way.

## Notes fixed
- 0:09, 0:33, 0:54, 1:11: camera zoom cut to about a fifth (slow drift only); scene exits are small, slow moves instead of big pushes.
- 0:21: the two people fold straight into the record cards on the moving orbit ring (the ring is already turning as they land).
- 0:36: after the dive into the lens, the schema keeps the same slow forward drift from the same place (no jump to a new start point); its exit is a gentle push, not a big zoom.
- 1:06 and 1:52: the cards carry straight on into the next scene (one move, no visible change).
- 1:18: the copies of the shared nodes meet more slowly (0.95 s, smooth ease).
- 1:28: the orange nodes travel into the transaction cards in one slower move.
- 2:27: the move into the dashboard is much less close (1.6x instead of 8x) and slower.
- 2:33: no more flipping dashboard, no side panes flying past; slower, softer zoom and a gentler panel entrance.
- 2:39: the 90 % ring settles into the horizon in 1.8 s with a smooth ease (was 1.0 s), and fades slowly.
