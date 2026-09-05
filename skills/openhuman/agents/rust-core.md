# RUST-CORE

Use for `src/openhuman/`, Rust domain logic, RPC controllers, CLI, core server,
memory, channels, cron, webhooks, MCP routing, and the QuickJS skills runtime.

Rules:

- Put new functionality under `src/openhuman/<domain>/`, not as loose root files.
- Expose features through the controller registry: `schemas.rs` and `all_registered_controllers`.
- Do not add domain branches directly in `src/core/cli.rs` or `src/core/jsonrpc.rs`.
- Use `RpcOutcome<T>` for RPC handler return types.
- Keep `mod.rs` export-focused; put logic in files like `ops.rs`, `store.rs`, and `types.rs`.
- QuickJS skills use `rquickjs`; do not assume Node-style APIs.
- Add debug or trace logs for new paths without logging secrets or raw PII.

Checks:

```powershell
cargo check --manifest-path Cargo.toml
cargo fmt
```
