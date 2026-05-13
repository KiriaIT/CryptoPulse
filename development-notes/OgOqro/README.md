# OgOqro — development notes

Drop your sprint diary entries in this folder. File naming convention from `DEVELOPMENT_DIARY.md`:

```
OgOqro-sprint-1-YYYY-MM-DD.md
OgOqro-sprint-2-YYYY-MM-DD.md
OgOqro-sprint-3-YYYY-MM-DD.md
OgOqro-sprint-4-YYYY-MM-DD.md
```

Use the date you actually commit the entry — the auto-parser cross-references file naming with commit dates, and back-dated entries get caught.

## Quick reminders

- **Write the entries yourself.** They have to be in your own words.
- **At least 1 entry per week.** Sprint 1 = 1 entry total. Sprints 2 / 3 / 4 = 1 entry per sprint (since each is two weeks).
- **Describe ≥2 personal Feature Components.** For each: what concepts you used (DI, CD, Forms, Signals…), what tripped you up, how you resolved it.
- **Commit your entries to `main` via PR, not via squash-merge.** Squashing rewrites commit dates and the parser will flag it.

## Suggested first commits (Sprint 1 + 2 catch-up)

Each item must come from your own GitHub account (commits showing `OgOqro` as the author).

Sprint 1:
- One Feature Component in `main` using `input()` and/or `output()`. Anything in `src/app/shared/ui/` or a small piece inside a feature folder works.
- Your `OgOqro-sprint-1-YYYY-MM-DD.md` diary entry covering what you built + Sprint 2 plan.

Sprint 2:
- Author one of the new lazy routes (`/markets` or `/portfolio` skeleton works well).
- Author one Sprint 2 Angular concept your partner didn't — e.g. `unsavedFormGuard: CanDeactivateFn`.
- Your Sprint 2 diary entry.

The pre-prepared `SPRINT_1_CHECKLIST.md` and `SPRINT_2_CHECKLIST.md` files at the repo root list the exact requirements.

## Diary template

Copy this into your sprint file as a starting point, then replace each section with your real experience.

```markdown
# Sprint N — OgOqro

(short intro paragraph: what you focused on this sprint)

## What I built

(prose + bullet points: services, components, forms, etc.)

## What I struggled with

(real friction points: what cost you the most time and how you got past it)

## Feature Components written personally (≥2)

1. ComponentNameComponent — concepts used, why this implementation.
2. AnotherComponent — same.

## Plan for Sprint N+1

- bullet
- bullet

## Time spent

(approximate hours)
```
