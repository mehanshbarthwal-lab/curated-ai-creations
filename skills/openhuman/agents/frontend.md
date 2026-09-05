# FRONTEND

Use for `app/src/`, React components, Redux slices, routing, `coreRpcClient`,
MCP lib, AI config, and UI work.

Rules:

- Provider order is Redux, PersistGate, UserProvider, SocketProvider, AIProvider,
  SkillProvider, HashRouter, AppRoutes.
- Read and re-export all `VITE_*` env vars from `app/src/utils/config.ts`.
- Do not read `import.meta.env` directly elsewhere.
- Avoid dynamic imports in production `app/src`: no `import()`, `React.lazy`, or `await import()`.
- Keep business rules in Rust core; React presents and orchestrates.
- Use the design language from `gitbooks/resources/design-language.md` when changing UI.

Checks:

```powershell
pnpm typecheck
pnpm lint
pnpm format:check
```
