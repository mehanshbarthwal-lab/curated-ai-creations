# EVENT-BUS

Use for cross-domain pub/sub events and typed in-process request/response between Rust domains.

Rules:

- Broadcast events use `publish_global` and `subscribe_global`.
- Typed in-process request/response uses `register_native_global` and `request_native_global`.
- Native request/response is internal only and is not exposed over JSON-RPC.
- Do not construct `EventBus` or `NativeRegistry` directly outside tests.
- For new domain events, add a `DomainEvent` variant, update `domain()`, create `<domain>/bus.rs`, and register subscribers at startup.
- Native handler names use `<domain>.<verb>`.
- JSON-RPC names use `openhuman.<namespace>_<function>`.

Checks:

```powershell
cargo check --manifest-path Cargo.toml
```
