---
name: pipeline-task-notes
description: Keep a 3-file plan on disk for long video jobs (renders, fix loops, reels) so work survives context compaction and a new thread can resume. Use for any job over ~5 steps.
---

# Pipeline task notes

Adapted from planning-with-files (OthmanAdi), trimmed: no hooks, no ledgers.

Long jobs lose detail when context is compacted or a thread ends. Keep the state on disk,
not in the conversation.

## Where

`<video folder>/05 Production/notes/` in `/mnt/project-files/` (shared, outlives threads).
Create it if missing. Also commit it with the video's other files (file storage rule).

## The three files

- `task_plan.md`: goal, phases as a checklist (`- [ ]` / `- [x]`), current phase, open decisions.
- `findings.md`: facts learned that cost effort to find (which file builds act 3, a render flag
  that works, a /watch issue and its cause). One line each, newest last.
- `progress.md`: dated log, one line per step: what ran, result, next step. Include output paths
  and preview links.

## Rules

1. Before starting: read `task_plan.md` and the last 20 lines of `progress.md` if they exist.
   Do not redo finished phases.
2. After each phase, or before any long render: tick the box and append to `progress.md`.
3. Keep lines short. No pasted logs, frames or code. Point to files instead.
4. When the job is done, mark it done at the top of `task_plan.md`. Do not delete the notes.
