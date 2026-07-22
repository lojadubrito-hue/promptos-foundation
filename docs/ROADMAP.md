# PromptOS — Roadmap

Legend: `[x]` shipped · `[~]` in progress · `[ ]` planned

## Table of Contents

1. [Phase 1 — Foundation](#phase-1--foundation)
2. [Phase 2 — Core Workspace](#phase-2--core-workspace)
3. [Phase 3 — Composition](#phase-3--composition)
4. [Phase 4 — Intelligence](#phase-4--intelligence)
5. [Phase 5 — Studios & Automation](#phase-5--studios--automation)
6. [Phase 6 — Knowledge & SaaS](#phase-6--knowledge--saas)

---

## Phase 1 — Foundation

- [x] Project bootstrap (TanStack Start, Tailwind v4, TypeScript strict).
- [x] Dark-first design system.
- [x] Application shell: Sidebar, Header, AppLayout.
- [x] Navigation registry (`src/config/navigation.ts`).
- [x] Global components (`PageHeader`, `EmptyState`, `PlaceholderPage`).
- [x] Routes scaffolding.

## Phase 2 — Core Workspace

- [x] Dashboard v1 (Hero, KPIs, Quick Actions, Recents, Templates, Timeline).
- [x] Prompt Engine v1 (list + editor + tabs + properties panel).
- [x] Create Prompt page (3-column workspace with validation).
- [x] Domain Layer (10 modules, mocks, services, helpers).
- [ ] Projects screen (list, detail, CRUD).
- [ ] Collections screen (group prompts, share settings).
- [ ] Library screen (browse prompts, filters, saved views).

## Phase 3 — Composition

- [ ] Templates module (browse, clone, fork, publish).
- [ ] Prompt Blocks (composable snippets, mixins).
- [ ] Variables (typed inputs, defaults, validation).
- [ ] Prompt Versioning (diff, restore, branch).

## Phase 4 — Intelligence

- [ ] AI Context Engine (system prompts, personas, memory).
- [ ] AI Generation (execute prompts, compare models).
- [ ] Evaluations (scoring, regression tests on prompts).
- [ ] Cost & latency metrics.

## Phase 5 — Studios & Automation

- [ ] Asset Studio (Veo 3, Image Studio, TikTok Shop).
- [ ] Characters module (personas linked to prompts/assets).
- [ ] Automation & Workflows (chained prompts, triggers).

## Phase 6 — Knowledge & SaaS

- [ ] Knowledge Base (documents, embeddings, semantic search).
- [ ] Authentication & multi-tenant orgs.
- [ ] Roles, permissions, quotas.
- [ ] Billing (plans, usage metering).
- [ ] Public API & webhooks.