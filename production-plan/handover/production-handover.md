# Production Plan: Full Handover

Written 28 Oct 2026, about 17:30 UTC (23:00 IST), for whoever picks this project up next.

**Sources read for this:** the whole "Track and schedule FlyDubai and history videos" thread, the project chat, project memory, the three paste-ready files in `video-plan/`, the Video release plan dashboard and its data, the live Zernio queue (scheduled, published and failed posts), the two scheduled tasks, the Google Drive production notes (FZ1073 and Great War Part 2), the GW2 Video Style Guide, the history project's Production Control Room, Hitler launch page and Tiger Inside page, and Pushpam's own skills (house animation style, cloned voice, YouTube skills).

**What I could not read:** the history and FlyDubai projects' own chats and their file folders (other projects aren't reachable from here). The `hitler-early-life/` folder isn't in this project's shared files. There are no production notes in Drive for Salman, Osho, El Mencho or LEGO, so what this doc says about those videos comes from the Control Room page and the scheduling thread only. Anything not found in a source is marked **[not in sources]**.

---

## 1. The goal

Pushpam runs a YouTube history channel (**Stromhell**, handle **@latentindiaclips**) plus an Instagram Reels account (**@indiasgotlatentclips_reels**). Two other Claude projects make the videos:

- **"YouTube history video launches"**: The Great War Part 1 and 2, The 30 Years That Made Hitler, Salman the Persian, The Tiger Inside (Osho on the Ego), The Rise and Fall of El Mencho, How LEGO Got So Big, and Secret Service (queued).
- **"FlyDubai Hijacking"**: the FZ1073 documentary.

**This project's job** (the "production plan") is to:

1. Keep a running count of what those projects have made: full combined videos, act videos and reels.
2. Keep a posting plan for every video, following Pushpam's rules.
3. Get every finished video and reel onto **Zernio** at the right time, check what the other projects schedule themselves, and fix anything that breaks the rules.
4. Keep the dashboard current every night.

Pushpam approved this on 27 Oct 2026: *"okay now its ur job is to shedule each video that those projects produce to zerno and post them to youtube and insta just a note full combine video dont go on insta that only for yt"*. That approval covers scheduling and moving posts. It does not cover deleting posts or changing a video's title, thumbnail or copy.

---

## 2. Standing rules (Pushpam's own)

| # | Rule | Since | Source |
|---|---|---|---|
| 1 | Full videos go out **at least 2 days apart**. | 27 Oct | Project chat |
| 2 | **At most 5 reels a day.** It was 3 until Pushpam edited the original message on 28 Oct (17:06 UTC). | 28 Oct | Project chat (edited) |
| 3 | Schedule **everything on Zernio**. | 27 Oct | Project chat |
| 4 | **Reels go to YouTube and Instagram. Full combined videos go to YouTube only, never Instagram.** | 27 Oct | Project chat |
| 5 | **Every post at the ideal US audience time.** | 27 Oct | Project chat ("make sure evry video gets live accoring to the ideal us time") |
| 6 | **A video's reels go out only after its full video is live.** Otherwise the "watch the full video" call to action points at nothing. | 28 Oct | Pushpam's Hitler message ("Post the reels only after the full video is live"), and the GW2 reels notes |
| 7 | **Finished mp4s go in the Drive "Ready to post" folder.** The nightly run picks them up. In practice the other projects schedule on Zernio themselves when given exact times (see section 8). | 27 Oct | Scheduling thread |
| 8 | **Nightly run at 22:11 IST** updates the count and plan and schedules new files. | 27 Oct | Scheduled task "Video plan refresh" |
| 9 | Proposed slots aren't put on Zernio until Pushpam says go. This was superseded on 27 Oct by rule 3 for any video that is finished. | 27 Oct | Memory |

### US time slots in use (US Eastern, America/New_York)

| Post type | Slots |
|---|---|
| Full video | **15:00 on weekdays, 11:00 on Sat and Sun** |
| Reels | **12:00 and 19:00 first**, then 09:00, 16:00 and 21:00 on busy days (up to 5) |

- These are standard US best-practice times. Zernio's own data was too thin to pick from (1 to 3 posts per slot), so they don't come from this channel's analytics.
- **Daylight saving:** the US moves its clocks back on **Sun 1 Nov 2026**. Before then, Eastern is UTC−4 (IST is 9 h 30 m ahead). From 1 Nov, Eastern is UTC−5 (IST is 10 h 30 m ahead). Zernio takes UTC. Example: 15:00 ET on Fri 30 Oct is 19:00 UTC, but 15:00 ET on Mon 2 Nov is 20:00 UTC.
- The dashboard shows Eastern time with IST beside it.

### Rules that come from other places but bind every video
- **Only one video in production at a time.** When a video waits for Pushpam's OK, the next in line starts. (Control Room rule. The page also mentions a "3-thread limit".)
- **Every finished video gets 15 reels** cut from its most viral moments, in Pushpam's voice, ending with "watch the full video". (Control Room rule.)
- When a video is fully done (full video, thumbnail, 15 reels, all scheduled), mark it closed and remove it from the Control Room. (Pushpam, 28 Oct 01:58.)
- "Keep this control room updated forever with all feedback and thread updates." (Pushpam.)

---

## 3. Accounts, tools and automation

| Thing | Detail |
|---|---|
| Zernio YouTube account | `latentindiaclips`, id `6add4e45e997d795ad6dfc72` (channel name Stromhell) |
| Zernio Instagram account | `indiasgotlatentclips_reels`, id `6add4e3335057a25ed050012` |
| Scheduled task: **Video plan refresh** | `trig_01Ri7tjorPxkAgWMdvKgCDnW`, daily at 22:11 IST, wakes the scheduling thread. Last run 28 Oct, 16:42 UTC, succeeded. Its prompt already holds the 5-reel rule and the slot order. |
| Scheduled task: **Daily video performance check** | `trig_01P6H23DxR1V9PTxrr1MW7Wr`, daily at 09:00 IST, belongs to another project. It reports views for the last 7 days and suggests a stronger thumbnail or title for weak videos, but changes nothing without approval. |
| Dashboard | [Video release plan](https://claude.ai/artifact/15UYjBvxYa64mAFd7nd5xv). It holds two datasets, `plan` (113 rows, one per post) and `tally` (one row per video). Both are uploaded JSON files that the nightly run rebuilds. |
| Drive parent folder | `16PuMG7uDxzLKm5h_FuoP3oyKSGrVt6TS` |
| Drive "Ready to post" | [folder](https://drive.google.com/drive/folders/1zrPc83f3r656UamPAiyEGUhiTEjkqN95), id `1zrPc83f3r656UamPAiyEGUhiTEjkqN95`. Empty so far. |

**Reach limits:** this project can't message the other two projects or open their files. It can read Pushpam's Google Drive and the artifacts he owns (Control Room, launch pages), and it can read and write Zernio. When files can't be reached, the working method is a **paste-ready message** with exact UTC times, which Pushpam pastes into the producing project. That project then schedules the posts itself. It has worked every time (Hitler, Salman, Osho, LEGO).

---

## 4. Current status per video (28 Oct 2026, evening)

| Video | Project | Full video | Acts | Reels | On Zernio |
|---|---|---|---|---|---|
| **The Great War, Part 1** | History | Published | n/a | 10 | Full video and 5 reels published. The last 5 reels go out 28 to 30 Oct. |
| **The 30 Years That Made Hitler** (13:46) | History | Done | n/a | 15 | **All 16 posts.** Full video Fri 30 Oct, 15:00 ET. Reels 31 Oct to 7 Nov. |
| **FZ1073: The Co-Pilot of Flight 1073** (11:04) | FlyDubai | Done | 8 | 15 | **Full video plus reels 1, 4, 6, 7, 9, 11.** Full video Mon 2 Nov, 15:00 ET. **Reels 2, 3, 5, 8, 10, 12, 13, 14, 15 are not scheduled yet.** |
| **Salman the Persian** (11:54) | History | Done | 10 | 15 | **All 16 posts.** Full video Mon 9 Nov, 15:00 ET. Reels 10 to 17 Nov. |
| **The Tiger Inside: Osho on the Ego** (12:09) | History | Done | 10 | 15 | **All 16 posts** (checked in Zernio). Full video Thu 12 Nov, 15:00 ET. Reels 14 to 22 Nov. ⚠ The dashboard rows still say "Ready, waiting to be scheduled". |
| **The Rise and Fall of El Mencho** | History | Done | 9 | 15 | **All 16 posts, moved by us to fit the rules.** Full video Tue 17 Nov, 15:00 ET. Reels 18 to 27 Nov. |
| **The Great War, Part 2: "Who Broke First in World War 1?"** | History | Done | 14 | 10 | **All 11 posts.** Full video Sat 28 Nov, 11:00 ET (21:30 IST). Reels 28 Nov to 3 Dec. |
| **How LEGO Got So Big, and Why Fans Are Turning on It** (13:40) | History | Done | 12 | 15 | **All 16 posts.** Full video Mon 30 Nov, 15:00 ET. Reels 1 to 9 Dec. |
| **Secret Service** | History | Not started | 0 | 0 | Queued. Its script will be written from Pushpam's transcript. **[No other details in sources]** |

**Zernio queue check (28 Oct):** at least 100 scheduled posts (the list tool caps at 100), 7 published, 0 failed. One published post isn't tracked anywhere: a YouTube-only video that opens "Rome lasted 2,200 years. Its last emperor in the West was a…". It is probably an older video. **[Not in sources]**

### Posting calendar at a glance (US Eastern)

| Dates | Full video | Reels running |
|---|---|---|
| 28 to 30 Oct | Hitler on 30 Oct | Great War Part 1 (last 5) |
| 31 Oct to 7 Nov | FZ1073 on 2 Nov | Hitler R1 to R15 at 12:00 and 19:00. FZ reels 1, 4, 6, 11, 9, 7 at 09:00, 3 to 8 Nov. |
| 7 to 13 Nov | Salman on 9 Nov, Osho on 12 Nov | **FZ reels 2, 3, 5, 8, 10, 12 to 15 (planned, not on Zernio)**. Salman R01 to R08. |
| 14 to 22 Nov | El Mencho on 17 Nov | Salman R09 to R15, Osho 1 to 15 |
| 18 to 27 Nov | | El Mencho 1 to 15 |
| 28 Nov to 3 Dec | Great War Part 2 on 28 Nov, LEGO on 30 Nov | GW2 reels 1 to 10 |
| 1 to 9 Dec | | LEGO R01 to R15 |

Full-video dates: 30 Oct, 2 Nov, 9 Nov, 12 Nov, 17 Nov, 28 Nov, 30 Nov. The gaps are 3, 7, 3, 5, 11 and 2 days, so every one meets the 2-day rule. No day goes over 3 reels, which is inside the 5-a-day limit.

**Free room for new videos:** full-video days are open 19 to 26 Nov and from 3 Dec on. Reel days from 10 Dec on are empty. Since the limit went to 5, every day before that also has 2 to 3 spare reel slots (09:00, 16:00, 21:00).

---

## 5. Open tasks

1. **Schedule the 9 remaining FlyDubai reels.** This needs Pushpam: he has to paste section 2 of [schedule-salman-and-flydubai.md](/mnt/project-files/video-plan/schedule-salman-and-flydubai.md) into the FlyDubai project. The planned slots are Reel 2 on 7 Nov 19:00, Reel 3 on 8 Nov 12:00, Reel 5 on 8 Nov 19:00, Reel 8 on 9 Nov 12:00, Reel 10 on 9 Nov 19:00, then Reels 12 to 15 at 09:00 on 10 to 13 Nov. Every nightly report has flagged it.
2. **Fix the dashboard's Osho rows.** All 16 Osho posts are on Zernio, but the dashboard still shows them as waiting. The nightly run should rebuild `plan.json` from Zernio.
3. **Thumbnail and title checks after launch:**
   - **Great War Part 2:** on **30 Nov 2026** (48 h after launch), if it has under 70% of Part 1's first-48-hour views, swap to backup thumbnail B: "HOW A 19-YEAR-OLD MADE 4 EMPIRES DISAPPEAR" plus the PART 2 badge and WORLD WAR 1 line. (From GW2 Thumbnails v2.)
   - **Hitler:** about 48 h after the 30 Oct launch (around 1 Nov), if click-through is weak, switch to the backup title "How Hitler Became Hitler (1889-1919)".
   - Both are suggestions for Pushpam to approve. They aren't covered by the scheduling approval.
4. **Waiting on Pushpam:** whether to pull the El Mencho or LEGO reels earlier now that 5 reels a day is allowed. It was offered on 28 Oct with no answer yet.
5. **Every nightly run:** look for new Zernio posts the producing projects made themselves, and check each one's time with `posts_get`. If one breaks the rules, move it with `posts_update`, as was done for El Mencho.
6. **Secret Service:** when the history project finishes it, give it the next free full-video day (19 to 26 Nov is open) and 15 reels after that.
7. **Possibly open, FlyDubai Act 7:** the "He confessed with his lawyer present" chip doesn't repeat the Attorney General attribution. The notes offered to change it to "The Attorney General said he confessed with his lawyer present". **[No record of Pushpam's answer.]** The full film is already scheduled, so this only matters if it gets re-rendered.
8. **Update the Control Room:** its snapshot is from early 28 Oct and still shows Salman as rendering and Osho, El Mencho and LEGO as paused. All four are now finished and scheduled. Under Pushpam's rule they should be marked closed and removed. That page belongs to the history project, so this is that project's job.
9. **Stale wording in memory:** the GW2 Launch Package still says 28 Nov 06:00 IST. The live time is 11:00 ET (21:30 IST). Trust Zernio.

---

## 6. Key files and links

### This project
| What | Where |
|---|---|
| This handover | `/mnt/project-files/handover/production-handover.md` |
| Dashboard (plan and count) | https://claude.ai/artifact/15UYjBvxYa64mAFd7nd5xv |
| Paste-ready messages: Salman and the 9 FZ reels | `/mnt/project-files/video-plan/schedule-salman-and-flydubai.md` |
| Paste-ready message: Osho | `/mnt/project-files/video-plan/schedule-osho-tiger-inside.md` |
| Paste-ready message: LEGO | `/mnt/project-files/video-plan/schedule-lego.md` |
| Scheduling thread | "Track and schedule FlyDubai and history videos" |
| Project memory | `MEMORY.md`, `video-projects-drive-records.md` |

### History project pages (Pushpam owns them)
| What | Link |
|---|---|
| Production Control Room (queue, feedback log, previews) | https://claude.ai/artifact/EbHs3wuQ4PB1FS5Y1BvvxN |
| Hitler launch package and 15 reels | https://claude.ai/artifact/UFureepAEiAeTuxVK2YvGj |
| Tiger Inside full video preview | https://claude.ai/artifact/SMDYd2cESmbhwKMmvcsYQV |
| GW2 reels preview (all 10) | https://claude.ai/artifact/PoUWRCD3QA9YoAZejvXyXK |
| Salman storyboard and act previews | Storyboard https://claude.ai/artifact/PAmYGjuovqfafa4jLqV5SV (act links are on the Control Room) |
| Osho, El Mencho, LEGO storyboards | https://claude.ai/artifact/SArgpsve9AdwYBm6Rt94MB · https://claude.ai/artifact/TkvrHobQv14Y46P6b71U2R · https://claude.ai/artifact/ViWGEwSgWhXJLfTJgcZCLr |

### Google Drive
| What | File |
|---|---|
| **GW2 Video Style Guide v1** (the main style reference) | https://docs.google.com/document/d/14rU2IlawF2yk_UTczLuMRL1418fvFXtvN0QBUE-vJWk |
| GW2 Launch Package v1 | https://docs.google.com/document/d/1gQPVrwMElYXZ9hq-tXOyA7yiOawuGCKaLDIDzPUIvBM |
| GW2 Thumbnails v2 (main plus 48 h backup) | https://docs.google.com/document/d/1gzdM0gyoeV9Gi7Kl0meMUpWAdg6XFDd4J4M9ZfZghhs |
| GW2 Reels v1 and Reels 6-10 (captions) | https://docs.google.com/document/d/1YDH_-_vb9wEhS_YGGI_FouwVq5IE0TYALFQ6AVQU534 · https://docs.google.com/document/d/1R8BKBXb94vsRTyIbnhfy7J8X3TMfGFwMLzu8nJQgCTE |
| GW2 act notes 0 to 13 | "The Great War - Part 2 / 05 Production" |
| FZ1073 Packaging v1 (titles, thumbnail brief, retention, description, tags) | https://docs.google.com/document/d/17cceUqOev1m87S_JD6NJR013wI9EL0yjJZ9YDN-BOdE |
| FZ1073 Social v1 (Shorts, hooks, pinned comment, reel script, release week) | https://docs.google.com/document/d/1QY6dI9PGWboPPyw5fOFXdUjDxKdIFf391eS-IXyhFMg |
| FZ1073 Fact Check v1 | https://docs.google.com/document/d/12eI7T6q6CMaG1JzczXBT6ZppQDwKWx5zbJpx_rSrHx4 |
| FZ1073 Painted Plates v1 | https://docs.google.com/document/d/1wsHrVU0mSUmeULTgOSophJs7QlKCKx_ESBNCDcMabQA |
| FZ1073 act notes 0 to 7 | "FZ1073 - Flydubai Flight 1073 / 05 Production" |
| Hitler script and storyboard | "The 30 Years That Made Hitler (1889-1919)" folder (HEL - Production Script v1) |

---

## 7. How Pushpam gives feedback

From his own messages in this project and the feedback recorded in the style guide and Control Room.

### Style of his messages
- **Short, fast and casual.** Lowercase, typos, run-on sentences, often dictated or typed on a phone ("get he record of how many new videos they are creating main comcine all act video and the reels", "shedule each video … to zerno"). Read for intent. Don't ask him to rephrase.
- **Gives the goal, then hands it over.** "its ur job is to…", "make sure evry video gets live accoring to the ideal us time". He expects the details to be worked out and done without check-ins.
- **Adds rules one at a time as they come up**, and sometimes changes a rule by **editing his earlier message** (3 reels became 5 on 28 Oct). Watch for edits.
- **Approvals are one word:** "Okay", "Script approved: cool, go ahead". Take them as go.
- **Pastes text between projects.** He passes messages along, sometimes ending with "Do this". He may paste a link to a message in another project ("ready with cmsg_… in this thread"), which can't be opened from here. Say plainly what can't be seen and what he can paste instead.
- **"X video and reels are ready"** ("Make Salman al-Farsi story video and reels are ready") means: find the files and schedule them under the rules.
- **Wants things kept current with no end date.** "Keep this control room updated forever", a nightly plan refresh.
- **Wants thoroughness when he asks for a write-up.** "put everything dont slack off make it highly detailed".

### What his feedback is about
- **Visual and physical detail.** Exact, concrete notes on what looks wrong: hands swinging on the same side, figures frozen, people floating or walking on air, a general cut off by a table so he looks like he's flying, a moustache over the eyes, ugly eyebrows, snapping blinks, a seated figure hovering over a throne, plain blocky frames. He asked for more **detail and shadowing** on characters. The full list is in section 9.
- **Accuracy and tone.** "Fact-check everything, keep the earlier tone, don't combine acts until you check" (Salman). He wants jokes from source transcripts removed and replaced with facts.
- **Process control.** One act at a time, combine only at the end, joins only after he says go, one video in production at a time.
- **Tool preferences.** Canva first for painted plates. ElevenLabs for audio only, never images. Later videos use **his own cloned voice**.
- **Posting.** Rules about spacing, caps, platforms and US timing, plus reels never before their full video.

### What works with him
- Lead with the result. Give exact dates and times in US Eastern with IST beside them.
- When another project has to act, give a **paste-ready message** with exact UTC times, account ids and "full video YouTube only".
- Fix rule breaks yourself and tell him afterwards (El Mencho). He approved this.
- Never post a full video to Instagram. Never post reels before their full video.

---

## 8. Timing lessons and things that went wrong

| What happened | Lesson |
|---|---|
| **Time-zone slip (27 Oct).** The GW2 Part 2 reels were on Zernio at 08:00 and 01:00 IST instead of the usual 12:00 and 19:00, and the full video was at 06:00 IST. Times had been set in the wrong time zone. | Always work in US Eastern and convert to UTC for Zernio, with IST next to it for Pushpam. All 17 posts on Zernio were moved to US prime time on 27 Oct. |
| **US daylight saving on 1 Nov.** | The UTC offset changes from −4 to −5. A slot at the same ET clock time has a different UTC value before and after 1 Nov. Check the conversion for every date. |
| **El Mencho broke the rules (28 Oct).** The history project put all 16 El Mencho posts on Zernio at its own times. Its full video was one day before Osho's (breaking the 2-day rule), and some days had 5 reels when the limit was 3. | All 16 were moved: full video Tue 17 Nov, reels 18 to 27 Nov. Since then, every nightly run checks new posts and moves any that break the rules. The LEGO message also asks the history project to get slots from the planner first. |
| **"Videos are ready" with a link to another project's message.** | That message can't be opened from here. Check Zernio and Drive, then say exactly what's missing and give a paste-ready alternative. |
| **The Ready to post folder never got used.** The producing projects keep their files in their own folders, and big mp4s can't go through the Drive connector. | Paste-ready messages with exact times work best. The producing project schedules the posts and replies with post ids, and the nightly run checks them. |
| **First plan was over-cautious.** The first plan used 13-day gaps and 2 reels a day. | Use the rules as given (2 days, up to 5 reels), and slot videos as early as the rules allow. |
| **Osho reel count was a guess.** No reels page was found, so 15 was assumed. | It turned out right, but say when a number is assumed. |
| **Reels must follow their full video.** The GW2 reels notes flagged it, and Pushpam made it a rule for Hitler. | The first reel goes the day after the full video at the earliest. The Hitler full video went at 15:00 ET on 30 Oct and R1 at 12:00 ET on 31 Oct. |
| **GW2 combined video.** The Act 13 notes say the full join was waiting for Pushpam's go-ahead, but the launch package already had a schedule. | Don't count a full video as made until its file or post exists. It does now. |

---

## 9. What makes the videos great

There are three related looks:
- **Stromhell base style.** Pushpam's skill `yt-longform-videostyle-stromhell-animation`: comedic 2D cutout history explainers.
- **Serious documentary version** (Great War Part 2 and after). The GW2 Video Style Guide changes the base style in four ways: serious tone, fully animated characters, richer painted backgrounds, and every figure grounded in the painting.
- **3D version** (FZ1073). Real-time Three.js scenes in the same house look.

### 9.1 Story and script
- **Voice:** a calm documentary narrator. Short plain sentences, exact dates, exact numbers, named people, about **150 words a minute**.
- **No comedy in the documentary series.** Replace a joke with the fact that makes the same point. For example, "decided to be jerks" becomes "In 1915, Germany broke them." (The base Stromhell style is comedic, with a gag every 10 to 20 s, but the serious series drops that.)
- **No AI writing patterns:** no colon reveals ("The result: …"), no questions the script answers itself, no strings of fragments, no dashes, no "delve" or "tapestry". Run `no-ai-slop` and `humanizer` on every script.
- **Structure:**
  - A hook in the first 10 s.
  - A short recap of the last part, finished by 0:45.
  - One line promising the payoff.
  - The title slam at about 0:48 to 0:53.
  - Then the acts. Every act opens with a signpost line ("Meanwhile, Austria-Hungary still had not beaten Serbia").
  - Restate the hook's question about two thirds of the way in.
  - **One ask only (subscribe), at the very end.** No channel intro.
- **Hook formula that scored best (75, "The Question"):** open with "you", name the stakes in one number, list what the video will show, then ask one question. Example: "You know the war froze in 1914. But it cost nine million soldiers, gas, submarines and a revolution to unfreeze it. Which side broke first?"
- **Write five hooks and score them** with `yt-script`'s `hookscore.py`. The FZ1073 winner scored 86 (STRONG).
- **Script format:** acts with timecodes and an era badge. One row per shot: id, time, seconds, shot type, narration, on-screen text, build notes, motion and SFX, date tag, title, overlay. The average shot is about **8.8 s**, with a cut every 3 to 10 s.
- **Shot mix:** about **55% maps**. The rest are character scenes on painted backgrounds, object close-ups and title cards.
- **Planted details that pay off.** FZ1073 plants the cockpit door handle at 5:18, pays it off at 6:36, and returns to it in the last line ("An injured captain turned a door handle, and people came through that door").
- **Fact-check against sources, not the source transcript.** The FZ1073 fact check fixed the flight number, the date, the dive figures and the landing time. It dropped about 10 unverifiable claims and labelled conflicts on screen. Ad segments in a transcript are cut.
- **Videos are cut into acts:** cold open plus 8 to 13 acts, each 46 s to about 1:50. Full videos run **11 to 14 minutes** (11:04, 11:54, 12:09, 13:40, 13:46).

### 9.2 Editorial and ethics rules
- **FZ1073 (an unresolved crime):**
  - The suspect has not been tried. Every claim is attributed on screen ("HIS CLAIM / NOT VERIFIED", "UAE PROSECUTORS SAY", "THE ATTORNEY GENERAL SAID, not yet tested in court").
  - No blood or injury on screen, and violence is only implied.
  - **9/11 appears as text only**, never as images.
  - No airline logos or livery, and no real faces.
  - Where accounts disagree (the plumber versus the captain), show both.
- **Hitler:** mark his own later account on screen as **HIS VERSION**. Say plainly that the racial ideas were unscientific and the stab-in-the-back story was false. **No Nazi symbols.** Facts follow Kershaw, Hamann and Weber.
- **Salman:** **the Prophet is never shown.** Only the companions' hands appear. Each act is checked against these depiction rules.
- **GW2:** where estimates vary widely (Sarıkamış, the Armenian genocide, total dead), give a range or a round number. The Armenian genocide section uses a map with no faces or figures, and the music drops 80%.
- **Pinned comment (FZ1073):** a serious note, not a joke. It corrects the versions of the story going around and invites sources: "If you have a source that changes any of this, post it below and we will pin the correction."

### 9.3 Visual style
- **Characters:**
  - A big, perfectly round white head with no nose or ears, a thick dark-brown outline (`#2b1e16`, never pure black), a small body and white mitten hands.
  - Costumes and hats carry all the detail. Limbs on the near side are lighter and in front of the body. Limbs on the far side are darker and behind it.
- **Faces:**
  - Two small ink-oval eyes.
  - Tapered, lens-shaped brows set by mood: calm, stern, worried or smug.
  - The mouth is a single stroke.
  - **Features never overlap.** Moustaches sit below the eyes.
- **Maps:**
  - Drawn in code from real borders: 1914 borders from aourednik historical-basemaps, 1920 borders for the finale, Natural Earth coastlines.
  - Beige parchment, thick wobbly brown borders, flat faction colours, each nation with a small ink face that changes mood.
  - Inked ribbon arrows. Slow, eased push-ins.
- **Faction colours:** fixed across the series. Germany `#5E6A73`, France `#2F6FE0`, Britain `#D3302E`, Russia `#4E9A3A`, Austria-Hungary `#E8B321`, Ottomans `#B5651D`, USA `#22407A`, and so on (full table in the style guide).
- **Painted backgrounds:**
  - 16:9 painterly illustrations, not photoreal, in muted warm sepia.
  - **No people, no text, no logos.** Leave clear flat ground in the lower third so characters can stand there.
  - Template prompts are in the style guide and in FZ1073 Painted Plates (P01 to P17).
- **Finish on every frame:** warm film grain at about 13%, a vignette, and backgrounds graded so the characters stand out.
- **Type and overlays:**
  - Anton for titles, labels, badges and tags. Oswald Bold for secondary text.
  - White titles with a thick dark stroke.
  - **Era badge** top left: dark box, gold year.
  - **Slanted date tag** bottom right: white box rotated −3°, pops in with overshoot.
  - Off-white **callout card** with a red second line.
  - **Slam titles** scale from 1.9× to 1× in 0.22 s.
  - **Running tally sign**, e.g. "ALLIES 8 / CENTRAL 2", or Part 1's "DECLARATIONS OF WAR: N".
  - No meme cards or red-X gag cards in the documentary series.
- **Hero objects** (tank, dreadnought, U-boat, Zeppelin, armistice carriage, crowns) are detailed 3D or SVG models. **Detail floor:** every frame reads as one clear picture at full size and still shows real parts at 4× zoom. If a frame looks blocky, add shadows and detail.

### 9.4 Motion
- **Every character on screen moves.** Walking, breathing, swaying or blinking. Nobody stands frozen.
- **Walk cycle:** legs swing ±26°, knees bend only during the swing, and **each arm swings opposite the leg on its own side**. Two bobs per stride and a 3° lean. Speed matches the steps so the feet don't slide.
- **Blinks ease shut and open over 0.28 s,** with the eye squashing to a line. Each figure blinks on its own timer.
- **No snapping between poses.** Every move is eased. Props pop in with a small overshoot over about 0.24 s.
- **Grounding:**
  - Feet always touch a surface. Every figure has a soft contact shadow that matches the painting's light.
  - Scale matches the doors, carts and thrones around the figure.
  - Figures behind a table are clipped at its far edge. Seated figures sit on the seat.
  - Crowds follow the ground line of the terrain.
- **The camera never stops.** Slow eased push-ins on almost every shot.
- **Check before rendering:** stills of every scene, a contact sheet of consecutive frames for motion, and a taste and impeccable review of each still.

### 9.5 Sound and voice
- **Narrator:**
  - GW2 used ElevenLabs **"Matt - Deep Authoritative Narrator"** (`0aXOy31Cjamp6gJcyqYu`, eleven_v4), two takes per act, starting 0.4 s into each act.
  - **The later videos (FZ1073 from Act 0 v3 on, Hitler reels, El Mencho, LEGO, Salman) use Pushpam's own cloned voice** from the `pushpam-voice` skill (Chatterbox, run locally, watermark kept). The ElevenLabs cuts were kept and renamed "(old)".
- **Delivery:** deep, calm and measured, with slight weight on dates and numbers. No dramatic acting.
- **Word timings** come from transcription (ElevenLabs Scribe, or the local Vosk aligner, median error 0.05 s). Every cut and pop lands on a word. Cut in the middle of pauses.
- **SFX on every action:** whoosh, stamp, pop, boom, naval guns, camel bells, wind and so on. FZ1073 makes its SFX and music in code to save credits.
- **Music bed:** a low synthesized pad plus a drone at 30%, with 2 s fade in and 2.5 s fade out. Later videos add calm background music **ducked under the voice** and an ambience bed for each act.
- **Mix:** −15 LUFS (true peak −1.5 dB) for full videos and −14 LUFS for reels. Salman and LEGO note the SFX bus lowered to −10 dB with stronger ducking under the voice.

### 9.6 Reels format (the house template)
- **1080×1920, 30 fps, 26 to 58 s.**
- The full 16:9 frame is centred on a blurred copy of itself.
- A kicker on top (e.g. "THE GREAT WAR · PART 2") and the reel's title.
- **Word-by-word captions with the current word in gold.** The video's own subtitles are switched off so nothing appears twice.
- A small line under the captions: "Full video on our YouTube channel".
- A **3-second end card**, "WATCH THE FULL VIDEO ON OUR YOUTUBE CHANNEL", spoken in the narrator's voice.
- **Hook:**
  - A new spoken first line over the most striking shot, with big on-screen hook text in the first second. The on-screen words differ from the spoken line.
  - Hooks lead with "you" and an open question, scored with hookscore (44 to 59 for the GW2 reels).
  - Never open with "I". Two points at most. The story ends on a line, and the reel doesn't state its conclusion.
- **Picking moments** (yt-shorts): a 20 to 55 s span that opens on a complete thought, has a turn, and ends on a line. Each needs a loop point and a note on the vertical crop.
- **Loops and chains:** reel 3 ends on "about ten kilometres", which answers "wait for the last number". GW2 reel 8 ends on "1916 was about to become the bloodiest year yet", which leads straight into reel 3.
- **When voice credits run out** (GW2 reels 6 to 10): open cold on the reel's strongest narrated line, pulled forward from later in the reel, and reuse the spoken end card.
- **Captions:** 2 or 3 factual sentences, then "Watch the full video on our YouTube channel.", then 5 hashtags (e.g. `#ww1 #history #zimmermanntelegram #worldwar1 #greatwar`). **YouTube Shorts titles end with `#shorts`.**
- **Count:** 15 reels per video (GW2 had 10).

### 9.7 Packaging: titles, thumbnails, descriptions, tags
- **Titles** (yt-package):
  - Write ten, score them with `title.py`, keep the top three.
  - Under 60 characters (desktop) and readable when cut at 40 (mobile).
  - A number, a name or a date beats any adjective. At most two words in capitals.
  - Examples: "Who Broke First in World War 1?", "Flydubai 1073: The Attack Inside the Cockpit" (98), "The 30 Years That Made Hitler".
- **Thumbnails:**
  - **Three words at most, and they must not repeat the title.**
  - Examples: "4 EMPIRES GONE" plus the PART 2 badge; "THE CO-PILOT"; "FAILED PAINTER" over a 1907 academy result stamped REJECTED.
  - House cartoon style. No creator face, because the channel uses animated characters.
  - One red accent (`#b8322a`) and strong dark-versus-bright contrast, with the text on the dark half.
  - Check it at 320 px wide.
  - Never show weapons, blood, logos or real faces.
- **Backup packaging:** keep a backup thumbnail or title, and swap it in after 48 h if the video is weak. Rule for GW2: under 70% of Part 1's first-48-hour views means swap.
- **Description pattern:**
  1. A question-led opening paragraph full of searchable terms.
  2. What the video covers.
  3. A link to the previous part.
  4. A subscribe link (`https://www.youtube.com/@latentindiaclips?sub_confirmation=1`).
  5. **CHAPTERS** taken from act boundaries and re-timed to the recorded voice.
  6. An "In this video:" bullet list.
  7. A sources or accuracy note.
  8. Three hashtags.
  9. For news topics, a full source list with links.
- **Tags:** 15 to 20, mixing broad terms (world war 1, ww1), "how did" questions, people, places and years. Check that the title, first line and tags match 2 or 3 target searches ("how did world war 1 end", "flydubai flight 1073").
- **Release week** (yt-plan, FZ1073): Day 1 the full video, then Shorts on days 2, 4 and 6, plus a community poll. This has since been replaced by the 15-reel schedule.

### 9.8 Production workflow
1. Script, then run the YouTube skills, then Pushpam approves, then a storyboard page.
2. **One act at a time:** build, render, review, save notes to Drive. **Join the acts only at the end, and only after Pushpam's go-ahead.**
3. Record the voice first, transcribe it for word timings, and time the scenes to the words.
4. Check stills and contact sheets, then fix grounding, overlaps and blocky areas.
5. Render with Playwright at 1920×1080, 30 fps (JPEG q93, 3 workers). Fix a frame range with a partial re-render.
6. The mixer builds the audio from a cue list, then ffmpeg joins it to the frames: `GW2_ActN_vX.mp4`.
7. A live render-progress page for any job over about 2 minutes.
8. **Keep old versions renamed "(old)". Never delete them.**
9. **Drive layout:** one folder per video with `01 Script`, `02 Storyboard`, `03 Frames`, `04 Build Files`, `05 Production`. Naming: `GW2 - <Thing> vN`, `GW2_S<act>.<shot>_<Type>_<Subject>.png`.
10. Then 15 reels, a thumbnail, the launch package and scheduling.

### 9.9 Tools
| Job | Tool |
|---|---|
| Narration | Pushpam's cloned voice (`pushpam-voice`). Earlier, ElevenLabs Matt. |
| Transcription and SFX | ElevenLabs (**audio only, never images**), or a local aligner |
| Painted backgrounds | **Canva first** (Pushpam's preference), then Mage, ImagineArt, Gemini or Nano Banana, or painted in code. The cloud network blocks downloads from Canva, Mage, ImagineArt and Artlist unless those hosts are allowed in a custom environment. Some GW2 backgrounds were made with ElevenLabs image generation before the "audio only" rule. |
| Characters, maps, overlays, animation | Code: SVG scenes rendered with Playwright, or Three.js for FZ1073 |
| 3D props | anatomy skill (3D mode) |
| Frame review | design-taste-frontend and impeccable |
| Script and packaging | yt-script, hook-generator, yt-retention, no-ai-slop, humanizer, yt-package, yt-chapters, yt-seo, yt-shorts, youtube-thumbnail, pinned-comment, reels-scripting, yt-plan. yt-viral needs YouTube access, which the cloud can't reach. |

### 9.10 Full list of Pushpam's visual corrections and the rule each became
| What went wrong | Rule now |
|---|---|
| Both hands swung on the same side, and legs snapped between poses | Arms swing opposite the leg on their own side. All motion eased. Check contact sheets. |
| Some figures stood frozen | Every character on screen breathes, sways, blinks or walks. |
| Generals cut off by a table looked like they were flying | Put figures behind the far edge of furniture and clip them there. |
| Face lines snapped when blinking | Blinks ease over 0.28 s. |
| Eyebrows looked bad | Ink-oval eyes and tapered, lens-shaped brows set by mood. |
| Characters looked pasted on, floating or walking on air | Feet on a surface, a contact shadow, matched scale and grade. |
| Moustache overlapped the eyes (Enver Pasha) | Face features never overlap. Moustache below the eyes. |
| Seated figure hovered over the throne (the emir) | Thighs on the cushion, shins to the floor, scale matched to the seat. |
| Plain, blocky frames | Add shadows and detail. Taste and impeccable review on every frame. Form shading added to every figure (Act 13). |
| A stray line (steamer rigging) crossed a shot | Review stills of every scene before delivering. |
| Jokes from the source transcript | Serious documentary tone. Facts instead of jokes. |
| Images made with ElevenLabs | ElevenLabs is for audio only. |
| Whole video built at once | One act at a time, joined at the end. |
| Act 3 v2 fixes | Enver's moustache moved below the eyes. Ministers behind the table edge with shadows. The blizzard column walks the painted snow path. The floating walker at Anzac Cove replaced by a sentry behind sandbags. The emir smaller and sitting cross-legged. |
| FZ1073 Act 0 review | The co-pilot turns his head back so his face reads. The doorway shot reframed so the fallen captain is visible. Labels re-anchored. Fringing reduced. |
| Salman acts | Subtitles overlapping book pages fixed. Vision labels set on a plate. The AL-KHANDAQ title timed to the word. Salman placed by the door in the secret-message shot. |
| FZ1073 voice | ElevenLabs narration replaced with Pushpam's own cloned voice in every act. |

---

## 10. Skills behind the work
- `yt-longform-videostyle-stromhell-animation`: the house art style, shot types, motion, palette and prompt templates.
- `pushpam-voice`: Pushpam's cloned voice. Only for his own content. The watermark stays on. Never ask him for a voice sample.
- YouTube skills: `yt-script`, `yt-retention`, `yt-package`, `yt-chapters`, `yt-seo`, `yt-shorts`, `yt-plan`, `yt-viral`, `youtube-thumbnail`, `hook-generator`, `pinned-comment`, `reels-scripting`.
- Quality: `no-ai-slop`, `humanizer`, `design-taste-frontend`, `impeccable`.
- Production: `render-progress-monitor`, anatomy (3D), Remotion as an option.

## 11. Gaps (not in the sources)
- Performance numbers (views, CTR, retention) for any video. The 09:00 IST performance check runs in another project, and its results aren't here.
- Production notes for Salman, Osho, El Mencho and LEGO. The final FZ1073 YouTube title (the plan lists "The Co-Pilot of Flight 1073"; the packaging doc recommended "Flydubai 1073: The Attack Inside the Cockpit").
- Thumbnails and descriptions for Salman, Osho, El Mencho and LEGO.
- Anything about the Secret Service video beyond its place in the queue.
- What the published "Rome lasted 2,200 years" video is.
- Whether Pushpam answered the FZ1073 Act 7 attribution question or the reel repack offer.
