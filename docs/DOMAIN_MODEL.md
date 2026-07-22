# PromptOS — Domain Model

All entities live in `src/domain/*` and extend the shared `Entity` type
(`id`, `createdAt`, `updatedAt`) from `src/domain/_shared/types.ts`.

## Table of Contents

1. [Shared Primitives](#shared-primitives)
2. [Entities](#entities)
3. [Relationships](#relationships)
4. [Responsibilities](#responsibilities)
5. [Backend Preparation](#backend-preparation)

---

## Shared Primitives

- `ID` — string identifier (UUID-ready).
- `Timestamps` — `{ createdAt: string; updatedAt: string }`.
- `Entity` — `{ id: ID } & Timestamps`.
- Utilities: `uid()`, `clone()`, `daysAgo()`.

## Entities

### Prompt
Core asset. Fields: `title`, `description`, `objective`, `content`,
`expectedResult`, `notes`, `language`, `status`, `version`, `favorite`,
`categoryId`, `projectId`, `aiModelId`, `frameworkId`, `tagIds[]`.

### Project
Top-level workspace grouping prompts, collections, assets. Fields:
`name`, `description`, `color`, `icon`, `status`.

### Collection
Curated group of prompts within (or across) projects. Fields: `name`,
`description`, `promptIds[]`, `projectId?`.

### Template
Reusable prompt scaffold. Fields: `name`, `description`, `content`,
`categoryId`, `tagIds[]`, `popularity`.

### Character
Persona reused across prompts and assets. Fields: `name`, `role`,
`description`, `avatar`, `traits[]`.

### Asset
Generated or imported media. Fields: `type` (image/video/audio/doc),
`url`, `promptId?`, `projectId?`.

### Category
Taxonomy for prompts and templates. Fields: `name`, `slug`, `color`, `icon`.

### Tag
Free-form label. Fields: `name`, `slug`, `color`.

### AIModel
AI provider metadata. Fields: `name`, `provider`, `contextWindow`,
`capabilities[]`.

### Framework
Prompting framework (CRISPE, RTF, RACE, ...). Fields: `name`, `acronym`,
`description`, `structure[]`.

## Relationships

```text
Project 1───* Prompt *───1 Category
Project 1───* Collection *───* Prompt
Prompt  *───1 AIModel
Prompt  *───1 Framework
Prompt  *───* Tag
Prompt  1───* Asset
Character *───* Prompt   (via future join)
Template *───1 Category
Template *───* Tag
```

## Responsibilities

- `types.ts` — entity shape only. No logic.
- `mock.ts` — deterministic seed data for development.
- `service.ts` — CRUD + business rules (list, get, create, update,
  toggleFavorite, bumpVersion, duplicate, ...). Pure functions over the
  mock store; ready to be swapped for a DB client.
- `index.ts` — public barrel for the module.

## Backend Preparation

When migrating to Lovable Cloud:

1. Each `mock.ts` maps 1:1 to a Supabase table.
2. Each `service.ts` function becomes a query/mutation against Supabase.
3. `Entity` fields map to `id uuid`, `created_at timestamptz`,
   `updated_at timestamptz`.
4. Foreign keys mirror the relationships above.
5. RLS policies apply per project/org once auth is introduced.
6. UI code MUST NOT change during the migration — the service interface
   is the contract.