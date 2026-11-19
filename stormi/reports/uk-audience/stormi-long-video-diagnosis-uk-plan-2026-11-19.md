# Stormi Explain Everything: why long videos get few views, and a UK plan (19 Nov 2026)

Sources: YouTube Studio (Pushpam's Chrome, last 28 days, 22 Oct to 18 Nov 2026) and Zernio analytics. Nothing public was changed.

## 1. The numbers

| Metric (long videos, 28 days) | Value | What it means |
|---|---|---|
| Long-video views | 1.5K across 12 videos | about 125 per video |
| Thumbnail impressions | 11.3K | YouTube showed each video to only ~950 people |
| Thumbnail CTR | 2.0% | weak; history channels that grow sit around 4-7% |
| Avg view duration | 5:33 | fine |
| Traffic | Browse 70.9%, Suggested 20.2%, Search 4.4% | almost no search traffic |
| Subscribers | 29 total, 0.5% of watch time from subs | no returning audience |
| New viewers | 99.7% | nobody comes back |

Per video (Studio, 28 days):

| Video | Views | Impr. | CTR | Avg % viewed |
|---|---|---|---|---|
| How Europe Walked Into the Great War (16:55) | 318 | 2,987 | 1.9% | **47.3%** |
| He Locked the Cockpit Door From the Inside (11:04) | 347 | 2,179 | 2.4% | 21.8% |
| He Owned the World's Silver Mountain... (8:00) | 373 | 1,773 | 1.8% | 17.3% |
| The Secret Chinese Operation to Target Jensen Huang | 243 | | | |
| He Traveled 5,000 km Across 3 Empires... | 185 | | | |
| How Muslims Lost Spain After 781 Years | 78 | | | |
| Before the Monster: 1889 to 1919 (Hitler) | 25 | | | |
| Why America's Biggest Systems Collapsed in 2 Days | 6 | | | |
| History of Rome Explained | 5 | | | |
| The 30-Day Bet That Saved Nvidia From Ruin (3 days old) | 3 | | | |
| Osho on the Ego (today) | 2 | | | |

## 2. What is wrong (in order of impact)

1. **The channel's audience is not a history audience.** The 3 biggest videos on the channel are old Hindi "India's Got Latent" clip shorts (17.6K, 17.2K, 3.5K views = 46% of all channel views). Top country is India 41%, UK 10%, US 5%. YouTube learns "who watches this channel" from these, so it tests our English history videos on the wrong people, gets a 2% CTR, and stops pushing them. These clips are also someone else's show, which is a copyright-strike risk.
2. **Topics jump around.** In 4 weeks: WW1, Spain, Islam, Hitler, a plane hijack, Nvidia, a US IT outage (a Finance video), Osho philosophy, Rome. No two videos share a viewer type, so no long video can feed the next one, and the channel never builds subscribers. The only proven seed is **WW1**: its shorts got 1.3-1.9K each and the long video has 47% retention.
3. **Low CTR (2%).** Titles like "Before the Monster: 1889 to 1919" or "He Traveled 5,000 km Across 3 Empires to Find One Man" hide the subject; people don't know what they're clicking. Search is only 4.4% because titles don't contain words people type.
4. **Shorts don't send viewers to long videos.** Shorts get ~95% of their views from the Shorts feed, and shorts audiences rarely click to long videos unless the short is the same topic as a long video already live and linked.
5. **Weak middle retention on some videos** (Spain 2 at 17%, hijack 22%): viewers leave in the first 1-2 minutes; WW1 shows the long, story-led format works.
6. Small things: every video has an A/B thumbnail test running (fine, keep); upload defaults are English (United States); "Country of residence" is United States.

## 3. UK targeting: what actually works

YouTube has no "show to UK" switch. Country of residence is a legal/tax setting for where the owner lives (it must stay true, it doesn't pick the audience). What steers YouTube towards UK viewers:

1. **Language set to English (United Kingdom)** for video language and title/description language (Studio upload defaults + each upload via Zernio default_language en-GB).
2. **British spelling and units** in titles, descriptions and on-screen text (colour, programme, defence, metres, £).
3. **UK-interest topics**, which also fixes the topic-jumping problem. Proposed lane: "British and European history, told as a story":
   - WW1 (already our best): Somme, Gallipoli, the Christmas Truce, Lusitania, Passchendaele
   - WW2: the Blitz, Dunkirk, Churchill, Bletchley Park and Enigma, D-Day
   - British Empire: East India Company, the Opium Wars, the Partition of India (also strong with our Indian viewers), the fall of Singapore
   - Kings, queens and crime: Henry VIII's wives, the Tudors, the Gunpowder Plot, Jack the Ripper, the Great Train Robbery, the Titanic
   - Keep Rome, Napoleon, Vikings: UK viewers watch these heavily
4. **Posting time for UK evenings.** UK evening peak is 18:00-21:00 UK time. Publishing 2-3 h before is best, so **16:00 UTC** (16:00 GMT in winter, 17:00 BST in summer) for long videos is already right: no change. Shorts should sit in 17:00-21:00 UTC (UK evening) instead of 01:30/03:00/07:30 UTC slots.
5. **A British voice**, as a test on one video: our narrator is American-accented. Optional.

## 4. Proposed changes (need Pushpam's OK)

| # | Change | Who | Reversible |
|---|---|---|---|
| A | Studio upload defaults: video language + title/description language to English (United Kingdom) | Claude via Chrome | yes |
| B | Every future Stormi upload: default_language en-GB, British spelling, UK keyword in first line; update metadata of already-booked Stormi long videos (titles/descriptions/language only, dates untouched) | Claude via Zernio | yes |
| C | Make the old Hindi "India's Got Latent" clip shorts **Private** (not deleted) so YouTube stops matching us with that audience | Claude via Studio | yes |
| D | Stop posting Finance (e.g. the outage video) and philosophy (Osho) long videos on Stormi; put them on Finance with Stromi / leave out. Stormi = history lane above | rule | yes |
| E | Title rule: subject name + hook, searchable (e.g. "Hitler Before Power: The 30 Years That Made Him" instead of "Before the Monster: 1889 to 1919"); re-title the 4 weakest live videos once | Claude via Zernio | yes |
| F | Next 4 long videos from the UK lane, starting with WW1 follow-ups (Somme, Christmas Truce) to ride the one proven seed | script queue | n/a |
| G | Move future-booked Stormi shorts into 17:00-21:00 UTC slots (max 3-4/day rule kept). This moves booked posts, so only with OK | Claude via Zernio | yes |
| H | Channel keywords/description: add "British history", "UK history", "history documentary UK"; playlists "World War 1", "British History", "Empires" | Claude via Studio | yes |

## 5. Steps only Pushpam can do in YouTube Studio

1. Settings > Channel > Basic info > **Country of residence**: make sure it is the country you really live in (it shows United States now). This is for tax/payments, not audience; we won't change it for you.
2. Settings > Permissions: there is a pending Manager invite for your second Google account; accept it from that account if you want it.
3. Check Content > Copyright for any claims on the Latent clips.

## 6. What to watch after changes

In 14 days, Studio > Content > Videos: impressions per long video (target 3K+), CTR (target 4%+), UK share of long-video views (Studio hides small countries until there's more data).
