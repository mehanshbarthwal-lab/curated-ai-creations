# CONTRIBUTING

Use for setup, environment, git workflow, PR process, and repo onboarding.

Setup notes:

- Use `pnpm`.
- Initialize submodules when vendor folders are missing:

```powershell
git submodule update --init --recursive
```

- Use the preferred desktop dev path:

```powershell
pnpm --filter openhuman-app dev:app
```

Environment:

- Root `.env.example` covers Rust core, Tauri shell, backend URL, logging, proxy, storage, and AI binary overrides.
- `app/.env.example` covers `VITE_*` values. Copy to `app/.env.local`.
- Frontend config must flow through `app/src/utils/config.ts`.
- Local data lives in `~/.openhuman/`; staging data lives in `~/.openhuman-staging/`.
- Staging backend is `https://staging-api.tinyhumans.ai`; do not start a local backend for it.

Before PR:

```powershell
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
cargo check --manifest-path Cargo.toml
```
