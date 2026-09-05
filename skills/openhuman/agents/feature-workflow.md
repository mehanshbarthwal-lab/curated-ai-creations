# FEATURE

Use for new features that span Rust core, JSON-RPC, frontend, Tauri, and tests.

Order:

1. Start with Rust core behavior and domain model.
2. Expose the smallest needed RPC surface.
3. Update frontend orchestration and UI.
4. Add tests at the changed layer.
5. Run focused checks first, then the repo-level checks that fit the change.

Rules:

- Do not duplicate Rust business logic in React or Tauri.
- Use existing controller, config, event, and testing patterns.
- Add diagnosis logging to new flows.
- Keep changes narrow; avoid speculative framework work.

Minimum checks depend on touched paths:

```powershell
cargo check --manifest-path Cargo.toml
pnpm typecheck
pnpm lint
pnpm test
```
