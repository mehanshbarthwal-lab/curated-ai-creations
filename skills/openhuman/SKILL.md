---
name: openhuman
description: >
  Use this skill whenever working on, debugging, building, reviewing, or asking about
  the OpenHuman repository from tinyhumansai/openhuman. Triggers on "openhuman",
  "tinyhumans", app/src/, app/src-tauri/, src/openhuman/, Rust core, Tauri shell,
  React frontend, event bus, skills runtime, memory, channels, cron, webhooks,
  repo setup, tests, features, bug fixes, or PR work. When triggered, read this
  file fully, then auto-select the relevant sub-agent from agents/. Do not ask
  the user which sub-agent to use.
---

# OpenHuman

Source repo: `https://github.com/tinyhumansai/openhuman`

OpenHuman is a React + Tauri v2 desktop app with a Rust core sidecar, JSON-RPC/CLI,
and a QuickJS skills runtime. It is separate from Graphify: Graphify maps code and
context; OpenHuman is an application codebase.

## Agent routing

Pick the matching agent automatically. If a task spans domains, use them in dependency order.

| Task touches | Read |
|---|---|
| `src/openhuman/`, Rust domain logic, RPC controllers, CLI, memory, channels, cron, webhooks, skills runtime | `agents/rust-core.md` |
| `app/src/`, React components, Redux slices, routing, `coreRpcClient`, MCP lib, AI config | `agents/frontend.md` |
| `app/src-tauri/`, window management, IPC, sidecar lifecycle, CEF webviews, Tauri plugins | `agents/tauri-shell.md` |
| Tests, coverage, CI, QA, Vitest, WDIO E2E, Rust test harness | `agents/testing.md` |
| Cross-domain pub/sub events or typed in-process request/response | `agents/event-bus.md` |
| Feature work spanning Rust + RPC + UI + tests | `agents/feature-workflow.md` |
| Setup, contributing, git workflow, PR process, env config | `agents/contributing.md` |

## Layout

| Path | Role |
|---|---|
| `app/` | `openhuman-app` workspace: Vite + React in `app/src/`, Tauri host in `app/src-tauri/`, Vitest tests |
| `src/` | Rust `openhuman_core` library and `openhuman-core` CLI/sidecar |
| `Cargo.toml` | Core crate; builds the `openhuman-core` sidecar |
| `docs/` | Architecture and module guides |
| `gitbooks/developing/` | Contributor docs |
| `scripts/` | Dev, test, debug, and automation scripts |
| `scripts/debug/` | Preferred agent debug runners |

## Rules

- Business logic lives in Rust core. React and Tauri present, bridge, and orchestrate.
- Keep files near or below 500 lines where practical.
- Use static imports in production `app/src`; avoid `import()`, `React.lazy`, and `await import()`.
- Read all `VITE_*` env vars through `app/src/utils/config.ts`.
- Expose Rust features through the controller registry, not branches in `src/core/cli.rs` or `src/core/jsonrpc.rs`.
- JSON-RPC methods use `openhuman.<namespace>_<function>`.
- Add debug logging for new or changed flows. Never log secrets, tokens, or raw PII.
- PRs need at least 80% changed-line coverage.
- Do not add JS injection to embedded provider CEF webviews. Use CEF handlers or scanner-side CDP.
- Use the `isTauri()` wrapper; do not check `window.__TAURI__` directly.
- Skills runtime is QuickJS via `rquickjs`, not V8/Deno/Node.
- Initialize Tauri submodules if missing: `git submodule update --init --recursive`.
- Prefer `pnpm --filter openhuman-app dev:app`; it handles the vendored CEF-aware Tauri CLI.

## Commands

```powershell
pnpm dev
pnpm --filter openhuman-app dev:app
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
cargo check --manifest-path Cargo.toml
cargo build --manifest-path Cargo.toml --bin openhuman-core
cargo check --manifest-path app/src-tauri/Cargo.toml
pnpm test
pnpm test:coverage
pnpm test:rust
pnpm test:e2e
pnpm debug unit
pnpm debug rust
pnpm debug e2e
```

## References

Read these when needed:

- `references/architecture.md`
- `references/platform-notes.md`
- `references/cef-rules.md`
- `AGENT_USAGE.md`
