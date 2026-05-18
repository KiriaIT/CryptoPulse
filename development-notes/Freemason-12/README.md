# Freemason-12 — development notes

Active second contributor on Crypto Pulse. Drop sprint diary entries in this folder.

## File naming

```
Freemason-12-sprint-1-YYYY-MM-DD.md
Freemason-12-sprint-2-YYYY-MM-DD.md
Freemason-12-sprint-3-YYYY-MM-DD.md
Freemason-12-sprint-4-YYYY-MM-DD.md
```

Use the **date you actually commit** the entry. The auto-parser cross-references filenames with commit dates.

## Rules (do not skip)

- Write entries in **your own words**.
- Commits must show author **Freemason-12** — no `Co-authored-by:` on scoring PRs.
- Merge diary PRs with **merge commit or rebase** — **never squash-merge** diaries.
- Every diary: **≥2 feature components** you built personally (concepts, struggles, fixes).
- PRs to `main` only; link a GitHub issue with a `sprint-N` label.
- Before opening a PR: `yarn lint` and `yarn build --configuration production`.

## Local setup

```bash
git clone git@github.com:KiriaIT/CryptoPulse.git
cd CryptoPulse
nvm use          # Node 22 — see .nvmrc
yarn install
yarn start       # http://localhost:4200
```

## Your checklist (in order)

### Sprint 1 catch-up (individual — 20 pts, binary)

Team items are already done. You still need **your** Sprint 1 credit:

- [ ] One standalone component in `main` using `input()` and/or `output()` (not `@Input` / `@Output`). Good spots: `src/app/shared/ui/` or a small feature widget.
- [ ] Diary: `Freemason-12-sprint-1-YYYY-MM-DD.md` — Sprint 1 summary, **plan for Sprint 2**, ≥2 components described.
- [ ] README already lists you under Team (team lead PR). Confirm your GitHub link works.

Suggested first PR: `feat(shared): add <YourComponent>` + issue labeled `sprint-1`.

### Sprint 2 (individual — pick up second-contributor work)

See [`SPRINT_2_CHECKLIST.md`](../../SPRINT_2_CHECKLIST.md) section **Individual — Freemason-12**.

High priority:

- [ ] Lazy route — `/markets` or `/portfolio` skeleton (`loadComponent`).
- [ ] Functional guard — `unsavedFormGuard: CanDeactivateFn` (KiriaIT owns `walletConnectedGuard`).
- [ ] Signals in ≥2 components you author.
- [ ] ≥2 services you author or substantially extend (`@Injectable()` + `inject()`).
- [ ] Sprint 2 diary when the sprint ends.

KiriaIT owns: `WalletService`, `walletConnectedGuard`, `/connect`, CI/deploy README fixes.

### Sprint 3

- [ ] `CurrencyCompactPipe` (KiriaIT: `PercentChangePipe`).
- [ ] Profile Settings reactive form — ≥3 fields, ≥2 validator types, inline errors.
- [ ] Part of `WALLET_CONFIG` / custom validators split with KiriaIT.
- [ ] Sprint 3 diary.

### Sprint 4

- [ ] `errorInterceptor` (KiriaIT: `loadingInterceptor`).
- [ ] ≥5 Vitest tests on modules you authored.
- [ ] ≥3 substantive PR review comments on KiriaIT's PRs (or code analysis in diary).
- [ ] Sprint 4 diary.

### Team score (ongoing)

- [ ] ≥3 GitHub issues assigned to you (description + label).
- [ ] ≥3 substantive PR reviews.
- [ ] Participate in meeting notes linked from `PROJECT_TRACKER.md`.

## Suggested branch names

```
feat/freemason-sprint-1-<component>
feat/freemason-markets-route
feat/freemason-unsaved-form-guard
docs/freemason-sprint-1-diary
```

## Diary template

```markdown
# Sprint N — Freemason-12

(Short intro: what you focused on this sprint.)

## What I built

(Prose + bullets: components, services, routes, forms.)

## What I struggled with

(Real friction and how you solved it.)

## Feature Components written personally (≥2)

1. YourComponent — signals, OnPush, DI, etc.
2. SecondComponent — same.

## Plan for Sprint N+1

- bullet
- bullet

## Time spent

(Approximate hours.)
```

## Who to ask

- **KiriaIT** — team lead, wallet/routing split, PR reviews, GitHub access.
- Checklists at repo root: `SPRINT_*_CHECKLIST.md`, conventions in `.cursor/rules/rule.mdc`.
