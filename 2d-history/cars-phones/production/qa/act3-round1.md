# act3 QA round 1 (real timing after vo-02 re-voice, prep_act.sh 3)
qa_auto: PASS (0 fail); WARN loudness -16.1 LUFS (remix target, house -16 OK), WARN cut rhythm (median shot 11.8 s, one shot per VO paragraph).
| time | issue | sev | cause | fix |
|---|---|---|---|---|
| all | tags/cards/counters too small (cap < 34 px) | high | NAME 40, SRC 26, cards 30-40, counters .75-.9 | NAME 60/36, SRC 46, cards 50-66, counters 1.3-1.4, stamp 1.4 |
| 0:28-0:41 | update bubbles unreadable | med | bubble scale 1 / 26px | scale 1.6, 34px, warnings moved up |
| 0:42-0:56 | sign remover small | med | s 1.5 | s 2.0 |
| 0:56-1:09 | car small | med | s .7 | s .9 |
| all | weak camera motion | med | small cam ranges | larger push/pan |
| 0:45 | ruling text tiny | med | 24px | 34px |
