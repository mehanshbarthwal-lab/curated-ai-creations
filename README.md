# Skills Collection — portfolio subsection

A curated showcase of AI agent skills, agentic tools and writeups. Built as a
self-contained section that can be dropped into a personal portfolio repo.

## Stack

- React 19 + TanStack Start (file-based routing, SSR-capable)
- Vite 7
- Tailwind CSS v4 (CSS-first config in `src/styles.css`, no `tailwind.config.js`)
- `@phosphor-icons/react` for iconography

No hosting-provider SDKs, no backend, no environment variables. Everything renders
from local data.

## Where things live

```
src/data/collection.ts        all entries (skills / tools / writeups) — edit this
src/routes/index.tsx          the index page: masthead, filters, search, list
src/routes/entry.$slug.tsx    per-entry detail page
src/components/entry-list.tsx the row component used by the index
src/components/site-chrome.tsx header + footer
src/styles.css                design tokens (colors, type, rules) — edit this
```

## Editing content

`src/data/collection.ts` is the single source of truth. Each entry:

```ts
{
  slug: "agent-reach",
  name: "Agent Reach",
  kind: "skill" | "tool" | "writeup",
  tagline: "One line, plain voice.",
  what: "What it does.",
  why: "Why it exists.",
  link: { href: "https://github.com/...", label: "user/repo" } | null, // null renders as "Private / internal"
  tags: ["python", "cli"],
  files: 108, // optional size signal
}
```

Adding an entry adds a row to the index and a detail page at `/entry/<slug>`
automatically. Repo links are currently `null` for most items — swap in the real
GitHub URLs as they go public.

## Design

Warm paper background, near-black warm ink, single oxide accent. Geist + Geist Mono.
Layout is a rule-separated index rather than a card grid, so a one-line skill and a
full project can sit in the same list without being forced into the same box.
Dark mode follows the system preference; there is no toggle.

Tokens are defined once in `src/styles.css` (`:root` and the
`prefers-color-scheme: dark` block). Components use semantic classes
(`text-foreground`, `border-rule`, `text-ink-faint`, `text-accent`) — no hardcoded
colors.

Fonts load from Google Fonts via a `<link>` in `src/routes/__root.tsx`. If your
portfolio self-hosts fonts, replace that link and update `--font-sans` /
`--font-mono` in `src/styles.css`.

## Running it

```bash
bun install     # or npm install
bun run dev     # http://localhost:8080
bun run build
```

## Porting into an existing portfolio

If your portfolio is already a React app, the parts you need are `src/data/`,
`src/components/`, the two route files and the token block from `src/styles.css`.
The only external dependency is `@phosphor-icons/react`. Routing uses TanStack
Router's `Link` — swap for your own router's link component if it differs.
