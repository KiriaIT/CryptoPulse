# Crypto Pulse

Crypto Pulse is a small cryptocurrency dashboard on Angular 21. It reads public market data from the Binance Spot Testnet, lets you curate a watchlist, and runs entirely on signals with OnPush change detection. Strict TypeScript throughout, no NgModules, layered `core` / `shared` / `features` / `layout` folder structure.

> **Project (locked in Sprint 1):** CryptoTrade — see [PROJECT_CRYPTO.md](./PROJECT_CRYPTO.md).
> **API:** Binance Spot Testnet (`https://testnet.binance.vision`) for public market data. No API key required.

Team submission for the [Rolling Scopes Angular](https://rs.school) 4-sprint course.

[![CI](https://github.com/KiriaIT/CryptoPulse/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/KiriaIT/CryptoPulse/actions/workflows/ci.yml)

## Team

- [KiriaIT](https://github.com/KiriaIT) — team lead
- [Freemason-12](https://github.com/Freemason-12) — second contributor

Early Sprint 1 work in `main` was also authored by [OgOqro](https://github.com/OgOqro) (see diary links below).

## Stack

| Area | Choice |
|------|--------|
| Framework | Angular 21 (standalone, signals, new control flow `@if` / `@for`) |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| UI kit | Angular Material, Lucide Angular |
| Charts | ngx-charts |
| Tooling | ESLint 9 flat config, Prettier, Vitest |
| Package manager | Yarn 1.22 |

## Local setup

```bash
yarn install
yarn start          # ng serve, http://localhost:4200
yarn build          # production build
yarn lint           # ESLint
yarn test           # Vitest (Sprint 4)
```

Node version aligned via NVM (`.nvmrc` — currently Node 22 for CI parity).

## Project Notes

This implementation diverges from [PROJECT_CRYPTO.md](./PROJECT_CRYPTO.md) on two points; the divergences are intentional and bounded.

1. **Auth flow.** We use a mock Web3-style wallet connection (frontend-only) instead of email/password + a custom NestJS backend. Rationale: keep focus on Angular reactive patterns — signals, services, guards, OnPush — rather than backend infrastructure. The Reactive Forms requirement is covered by a price-alert form (and later a mock order form / profile form), not by a registration form.

2. **Beyond-API surface.** Three client-side creative features build on the mock wallet: wallet connect, virtual deposit / withdraw, and price alerts. All persist in `localStorage`.

Public Binance Testnet endpoints (market data) remain the real data source. HMAC-signed trading endpoints are simulated through a `MockApiService` (`of(...).pipe(delay())`), which the Sprint 4 checkpoint FAQ explicitly allows.

## Sprint progress

Per-contributor diary entries: [`development-notes/`](./development-notes).

- **Sprint 1** — Project setup, standalone components, signal-based APIs. Notes: [KiriaIT](./development-notes/KiriaIT/KiriaIT-sprint-1-2026-05-11.md), [OgOqro](./development-notes/OgOqro/OgOqro-sprint-1-2026-05-14.md) (historical). **Freemason-12:** add your Sprint 1 diary under [`development-notes/Freemason-12/`](./development-notes/Freemason-12/) — see onboarding README there.
- **Sprint 2** — Routing, lazy loading, guards, signals, DI. In progress. Notes: [KiriaIT](./development-notes/KiriaIT/KiriaIT-sprint-2-2026-05-13.md). **Freemason-12:** Sprint 2 diary + individual items per [`SPRINT_2_CHECKLIST.md`](./SPRINT_2_CHECKLIST.md).
- **Sprint 3** — Directives, pipes, reactive forms. Upcoming.
- **Sprint 4** — HTTP, RxJS, testing. Upcoming.

Working tracker: [`PROJECT_TRACKER.md`](./PROJECT_TRACKER.md). Per-sprint checklists at [`SPRINT_1_CHECKLIST.md`](./SPRINT_1_CHECKLIST.md), [`SPRINT_2_CHECKLIST.md`](./SPRINT_2_CHECKLIST.md), [`SPRINT_3_CHECKLIST.md`](./SPRINT_3_CHECKLIST.md), [`SPRINT_4_CHECKLIST.md`](./SPRINT_4_CHECKLIST.md).

## Deployment

- **CI:** GitHub Actions runs `yarn install --frozen-lockfile`, `yarn lint`, and `yarn build --configuration production` on every push and pull request to `main` (see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).
- **Hosting:** Production builds deploy from this repo to **Vercel** (install/build/output + SPA rewrites are declared in [`vercel.json`](./vercel.json) at the repo root).

**Production (Vercel):** [Crypto Pulse production](https://crypto-tracker-eta-peach.vercel.app) (HTTPS, HTTP 200 on `/` and deep routes via SPA rewrites in [`vercel.json`](./vercel.json)).
