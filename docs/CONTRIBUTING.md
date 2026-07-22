# PromptOS — Contributing Guide

Rules for evolving the codebase. Non-negotiable unless explicitly overridden
by the product owner.

## Table of Contents

1. [Golden Rules](#golden-rules)
2. [Code Style](#code-style)
3. [Domain Layer](#domain-layer)
4. [UI Layer](#ui-layer)
5. [Routing](#routing)
6. [Testing & Verification](#testing--verification)
7. [Documentation](#documentation)

---

## Golden Rules

1. **Never break existing components.** Extend, don't replace.
2. **Always reuse components.** Search `src/components/*` before creating.
3. **Never duplicate code.** Factor shared logic into hooks, utils, or
   domain services.
4. **Always use the Domain Layer.** UI never talks to storage directly.
5. **Always create reusable components.** No one-off inline JSX blocks.
6. **Always use strongly typed TypeScript.** No `any`, no `@ts-ignore`
   without a written justification.
7. **Never introduce breaking changes** to public domain services without
   updating all call sites in the same change.

## Code Style

- Prettier + ESLint enforced (`.prettierrc`, `eslint.config.js`).
- File names: `kebab-case` for routes, `PascalCase` for components.
- Exports: named exports preferred; default exports only for routes.
- Imports: absolute via `@/` alias when crossing folders.

## Domain Layer

- Every entity lives under `src/domain/<module>/` with `types.ts`,
  `mock.ts`, `service.ts`, `index.ts`.
- Services expose pure functions. No React, no DOM, no side effects
  beyond the mock store.
- Cross-module lookups belong in `src/domain/helpers.ts`.
- Re-export new modules from `src/domain/index.ts`.

## UI Layer

- Screens live in `src/routes/*`; heavy composition lives in components.
- New shared component? Place it in the smallest scope that fits:
  `common/`, `dashboard/`, `prompts/`, `layout/`.
- Use semantic tokens (`bg-card`, `text-foreground`) — never raw colors.
- Every interactive element must expose hover, focus-visible, disabled.

## Routing

- TanStack Start file-based routing under `src/routes/`.
- Do NOT edit `src/routeTree.gen.ts`.
- Every route with a loader must define `errorComponent` and
  `notFoundComponent`.
- Every content route has its own `head()` with a unique title and
  description.

## Testing & Verification

- Run typecheck and build after any structural change.
- Verify visually the affected screens.
- New services: add representative mock data to `mock.ts`.

## Documentation

- Update `docs/CHANGELOG.md` for every user-facing or architectural change.
- Update `docs/ROADMAP.md` when a phase item ships.
- Update `docs/DOMAIN_MODEL.md` when entities or relationships change.
- Keep all docs in technical English, Markdown, with a table of contents.