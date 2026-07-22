# PromptOS — Design System

Dark-first, minimal, premium. Inspired by Linear, Notion, OpenAI, Cursor.

## Table of Contents

1. [Principles](#principles)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Grid & Layout](#grid--layout)
6. [Components](#components)
7. [Icons](#icons)
8. [Responsiveness](#responsiveness)
9. [Motion](#motion)
10. [Best Practices](#best-practices)

---

## Principles

- Dark theme is the default and the reference.
- Content first — chrome is minimal and never competes with content.
- Semantic tokens only; never hardcode hex or Tailwind color literals.
- Rounded corners, soft shadows, generous whitespace.

## Colors

All color tokens live in `src/styles.css` (Tailwind v4 `@theme`), expressed
in OKLCH. Consume them through semantic classes: `bg-background`,
`text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`,
`bg-primary`, `text-primary-foreground`, `bg-accent`, `bg-destructive`.

Never write `bg-white`, `text-black`, or `bg-[#...]` in components — it
bypasses theming.

## Typography

- Sans: system UI stack tuned for latin scripts.
- Mono: used for prompt editors and code (`PromptTextArea`).
- Scale: `text-xs` · `text-sm` · `text-base` · `text-lg` · `text-xl` ·
  `text-2xl` · `text-3xl`.
- Weights: 400 body, 500 UI, 600 headings, 700 hero only.
- Line-height: relaxed for content, tight for headings.

## Spacing

4px base grid. Prefer Tailwind steps: `1, 2, 3, 4, 6, 8, 12, 16, 24`.
Sections use `py-8`+ vertical rhythm. Cards use `p-6` by default.

## Grid & Layout

- Application shell: fixed sidebar + sticky header + scrollable content.
- Content max width: `max-w-7xl` for dashboards, `max-w-5xl` for reading.
- Multi-column workspaces: 3-column pattern (info · editor · properties)
  with responsive collapse on narrow viewports.

## Components

- Primitives: shadcn (`src/components/ui/*`).
- Layout: `AppLayout`, `AppSidebar`, `AppHeader`.
- Common: `PageHeader`, `SectionTitle`, `EmptyState`, `PlaceholderPage`.
- Dashboard: `DashboardCard`, `QuickAction`, `RecentItem`,
  `TemplateCard`, `TimelineItem`.
- Prompts: `PromptCard`, `PromptEditor`, `PromptHeader`, `PromptList`,
  `PromptSidebar`, `PromptTabs`, `PromptTextArea`, `PromptToolbar`,
  `TagSelector`, `StatusSelector`, `AIModelSelector`, `FrameworkSelector`,
  `VersionBadge`.

Rule: **compose over duplicate**. Before adding a component, check if an
existing one can be extended.

## Icons

Use `lucide-react`. Icon size defaults: `h-4 w-4` inline, `h-5 w-5` in
buttons, `h-6 w-6` in section headers.

## Responsiveness

Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
- Sidebar collapses below `lg`.
- 3-column workspaces stack below `xl`.
- Cards flow into single column below `md`.

## Motion

- Durations: `150ms` micro, `200ms` UI, `300ms` layout.
- Easing: `ease-out` for entry, `ease-in` for exit.
- Use `transition-colors`, `transition-transform`, `transition-opacity`.
- Avoid parallax, bouncing, or decorative animation.

## Best Practices

- Semantic tokens only.
- Never break existing components — extend them.
- Keep components small, focused, and typed.
- Every interactive element has hover, focus-visible, and disabled states.
- Accessibility: labels on inputs, `aria-*` on custom widgets, keyboard
  navigation across all workspaces.