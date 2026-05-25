# Coding standards (team + mentor guidelines)

These rules keep the codebase consistent and maintainable. **A working feature comes first;** then align new code with this document.

## Styling — Tailwind only

- Use **Tailwind utility classes** in component templates (`class="..."`).
- Do **not** use:
  - `styles:` or `styleUrls` / `styleUrl` on `@Component`
  - Per-component `.css` / `.scss` files (except global theme — see below)
  - BEM-style custom class names (e.g. `block__element--modifier`)
- **Allowed global CSS:** `src/styles.css` only — design tokens (`:root`, `.dark`), base reset (`body`).
- Shared animations: define keyframes in `tailwind.config.js` (e.g. `animate-toast-in`).
- Long Tailwind class strings for variants live in **`*.constants.ts`** or `core/constants/`, not in `*.component.ts`.

## Component files stay small

- **No large constants, maps, or interfaces** in `*.component.ts`.
- Use `component-name.constants.ts`, `core/constants/`, or `core/models/`.
- Components: `inject()` services, `protected` template API, user actions only.

## No magic values

- Name unexplained numbers in constants (`TOAST_ICON_SIZE = 18`, not bare `18` in templates).
- Prefer theme tokens (`text-sm`, `rounded-lg`) over arbitrary rem values when possible.

## Descriptive names

- Use `currentAmount`, not `v`; `amountChange`, not `t`.

## Comments

- Prefer self-explanatory code; remove obsolete sprint TODO blocks when tasks are done.
- Short `eslint-disable-next-line` with a reason is fine.

## Architecture

- Business logic in `core/services/`.
- `inject()`, signals, `ChangeDetectionStrategy.OnPush` on UI components.

## Git hooks (Husky)

- **pre-commit:** `yarn lint`
- Run `yarn build` before opening a PR.

## Dead code

- Delete unused components and orphan `.css` files; do not keep sprint-only demos in `src/` unless wired into the app.
