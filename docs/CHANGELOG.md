# PromptOS — Changelog

All notable changes to this project are documented here.
Format inspired by [Keep a Changelog](https://keepachangelog.com/).

## Table of Contents

1. [Epic 5A — Product Blueprint](#epic-5a--product-blueprint)
2. [Epic 5 — Create Prompt Experience](#epic-5--create-prompt-experience)
3. [Epic 4 — Domain Layer](#epic-4--domain-layer)
4. [Epic 3 — Prompt Engine v1](#epic-3--prompt-engine-v1)
5. [Sprint 2 — Premium Dashboard](#sprint-2--premium-dashboard)
6. [Sprint 1 — Workspace Shell](#sprint-1--workspace-shell)
7. [Sprint 0 — Foundation](#sprint-0--foundation)

---

## Epic 5A — Product Blueprint

- Added `/docs` with `MASTER_SPEC`, `ARCHITECTURE`, `ROADMAP`,
  `DOMAIN_MODEL`, `DESIGN_SYSTEM`, `CONTRIBUTING`, `CHANGELOG`.
- No functional or UI changes.

## Epic 5 — Create Prompt Experience

- New dedicated route `/prompts/new` with three-column workspace.
- Title/content validation, live word/char counters.
- Wired all "Novo Prompt" actions to the new route.
- Integrated with `PromptService.create` from the Domain Layer.

## Epic 4 — Domain Layer

- Introduced `src/domain/` with 10 modules: `projects`, `prompts`,
  `templates`, `characters`, `collections`, `assets`, `categories`,
  `tags`, `ai-models`, `frameworks`.
- Each module ships `types.ts`, `mock.ts`, `service.ts`, `index.ts`.
- Added `_shared/` primitives (`Entity`, `Timestamps`, `uid`, `clone`,
  `daysAgo`), cross-module `helpers.ts`, and root barrel `index.ts`.

## Epic 3 — Prompt Engine v1

- Two-column Prompt Generator: searchable list + full editor.
- Metadata: AI model, framework, status, version, tags, language.
- Tabs (Editor / Outputs / History) and collapsible properties panel.
- Actions: save, duplicate, delete, favorite, export, new version.
- Mock service `promptsService` prepared for future Supabase swap.

## Sprint 2 — Premium Dashboard

- Reworked navigation registry with Workspace / Studios / Organize.
- Dashboard v2: Hero, KPIs, Quick Actions, Recent Projects, Recent
  Prompts, Popular Templates, Activity Timeline.
- Reusable components: `SectionTitle`, `DashboardCard`, `QuickAction`,
  `RecentItem`, `TemplateCard`, `TimelineItem`.
- Header: global search, "Novo Projeto" / "Novo Prompt", user menu.

## Sprint 1 — Workspace Shell

- New routes: `/veo3`, `/image-studio`, `/tiktok-shop`, `/characters`,
  `/favorites`.
- Dashboard v1 with stats, quick actions, recents, popular templates.
- Header: "New Prompt" action.

## Sprint 0 — Foundation

- Dark-first design system in `src/styles.css` (OKLCH tokens).
- Root route metadata + forced `dark` class.
- Navigation registry `src/config/navigation.ts`.
- Layout shell: `AppSidebar`, `AppHeader`, `AppLayout`.
- Global components: `PageHeader`, `EmptyState`, `PlaceholderPage`.
- Initial routes: `/`, `/prompts`, `/library`, `/projects`,
  `/analytics`, `/settings`, `/help`.