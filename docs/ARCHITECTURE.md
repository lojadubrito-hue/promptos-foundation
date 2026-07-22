# PromptOS — Architecture

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Layers](#layers)
4. [Layer Responsibilities](#layer-responsibilities)
5. [Data Flow](#data-flow)
6. [Future Layers](#future-layers)

---

## Overview

PromptOS is a React + TypeScript application built on **TanStack Start**
(Vite 7, React 19) with **TailwindCSS v4** and shadcn-style primitives.
The codebase follows a strict layered architecture: the UI depends on the
Domain Layer, the Domain Layer depends on nothing but its own primitives.

## Folder Structure

```text
src/
  components/
    common/        Reusable UI primitives (PageHeader, EmptyState, ...)
    dashboard/    Dashboard-specific composables
    layout/        Application shell (Sidebar, Header, Layout)
    prompts/       Prompt Engine composables
    ui/            shadcn primitives
  config/
    navigation.ts  Single source of truth for menu structure
  domain/
    _shared/       Base types + utils (Entity, Timestamps, uid, clone)
    ai-models/    AI provider metadata
    assets/        Generated/imported media
    categories/   Prompt taxonomy
    characters/   Reusable personas
    collections/  Grouped prompts
    frameworks/    Prompting frameworks (CRISPE, RTF, ...)
    projects/     Top-level workspaces
    prompts/      Core prompt entity
    tags/          Free-form labels
    templates/    Reusable prompt scaffolds
    helpers.ts    Cross-domain lookups
    index.ts      Barrel export
  hooks/           React hooks
  lib/             Framework-agnostic utilities
  routes/          TanStack Start file-based routes
  services/        UI-facing service wrappers (thin)
  styles.css       Tailwind v4 theme
  types/           Cross-cutting TypeScript types
docs/              Product & engineering documentation
```

## Layers

```text
┌──────────────────────────────────────────┐
│ UI Layer            (routes, components) │
├──────────────────────────────────────────┤
│ Services Layer      (thin adapters)      │
├──────────────────────────────────────────┤
│ Domain Layer        (types + services)   │
├──────────────────────────────────────────┤
│ Mock Layer          (in-memory data)     │
├──────────────────────────────────────────┤
│ Future Data Layer   (Supabase / API)     │
├──────────────────────────────────────────┤
│ Future AI Layer     (LLM providers)      │
└──────────────────────────────────────────┘
```

## Layer Responsibilities

### UI Layer
- Renders screens and composes components.
- Owns routing (TanStack Router), navigation, and visual state.
- Never talks to storage or network directly.

### Services Layer
- Thin adapters that expose domain operations to the UI.
- Handles UI concerns like debouncing, optimistic updates.
- No business rules — those live in the Domain Layer.

### Domain Layer
- Pure TypeScript. No React, no Tailwind, no framework code.
- Defines entities (`types.ts`), business logic (`service.ts`), and seeds
  (`mock.ts`).
- Public API is exposed via each module's `index.ts` and the root
  `src/domain/index.ts` barrel.

### Mock Layer
- Lives inside each domain module as `mock.ts`.
- Provides deterministic, richly populated data for development.
- Will be replaced transparently when the Data Layer is wired.

### Future Data Layer
- Lovable Cloud (Supabase) will implement the same service interfaces.
- Swap happens inside `service.ts` — UI stays untouched.

### Future AI Layer
- Wraps Lovable AI Gateway / provider SDKs.
- Exposes typed generation, embedding, and evaluation APIs.
- Consumed only through Domain services.

## Data Flow

```text
Route → Component → Service (thin) → Domain Service → Mock/DB
                                          ↓
                                        Types
```

All entities extend `Entity` from `_shared/types.ts` (id + timestamps),
guaranteeing consistent shape across modules.

## Future Layers

- **Auth** — user, org, roles, permissions.
- **Billing** — plans, quotas, usage metering.
- **Realtime** — collaborative editing on prompts.
- **Search** — full-text + semantic search across the workspace.