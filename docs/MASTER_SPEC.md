# PromptOS — Master Specification

> Official product specification. All future work MUST comply with this document.

## Table of Contents

1. [Product Vision](#product-vision)
2. [Mission](#mission)
3. [Target Audience](#target-audience)
4. [Objectives](#objectives)
5. [Principles](#principles)
6. [Current Features](#current-features)
7. [Future Features](#future-features)
8. [Pillars](#pillars)

---

## Product Vision

PromptOS is a professional operating system for prompt engineering. It provides
a unified workspace to design, organize, version, and evolve prompts across
multiple AI models and frameworks — with the same rigor a modern IDE brings to
source code.

The long-term vision is to become the **default cockpit for AI creators,
prompt engineers, agencies, and SaaS products** that rely on structured LLM
interactions.

## Mission

Empower creators and teams to treat prompts as **first-class assets**:
structured, reusable, versioned, and measurable.

## Target Audience

- Prompt engineers and AI power users.
- Content creators automating workflows with LLMs.
- Agencies producing AI-driven media (video, images, copy).
- Product teams shipping features on top of LLMs.
- Future SaaS customers requiring multi-tenant prompt operations.

## Objectives

- Centralize prompt creation, storage, and iteration.
- Support multiple AI models, frameworks, and languages.
- Provide a clean, IDE-grade authoring experience.
- Enable reuse via templates, blocks, variables, and collections.
- Prepare a scalable foundation for a future multi-tenant SaaS.

## Principles

1. **Prompts are assets** — versioned, categorized, measurable.
2. **Domain-first architecture** — UI is disposable, domain is durable.
3. **Dark-first, minimal UI** — inspired by Linear, Notion, OpenAI, Cursor.
4. **Composable components** — never duplicate, always reuse.
5. **Strong typing** — TypeScript is mandatory across all layers.
6. **Mock-before-backend** — every feature runs on mocks before wiring a DB.
7. **No breaking changes without migration** — stability is a feature.

## Current Features

- Application shell (sidebar, header, responsive layout).
- Dashboard with KPIs, quick actions, recent items, timeline.
- Prompt Engine v1 (list + editor, tabs, properties panel).
- Create Prompt page (three-column workspace with validation).
- Domain Layer (10 modules with types, mocks, services).
- Reusable components for dashboard, prompts, layout, common UI.

## Future Features

- Projects & Collections management screens.
- Template library with cloning and forking.
- AI Context Engine (system prompts, personas, context injection).
- Prompt Blocks & Variables (composable authoring).
- AI Generation (execution and comparison across models).
- Asset Studio (image, video, TikTok Shop).
- Automation & Workflows.
- Knowledge Base and semantic search.
- Multi-tenant SaaS (auth, billing, org roles, quotas).

## Pillars

- **Clarity** — every screen answers "what can I do here?" in one glance.
- **Speed** — keyboard-first, minimal latency, no unnecessary chrome.
- **Reusability** — templates, blocks, variables, collections.
- **Scalability** — architecture ready to grow into a SaaS.
- **Craft** — premium visual quality; no generic AI aesthetics.