# TAURI-SHELL

Use for `app/src-tauri/`, window management, IPC commands, core sidecar lifecycle,
CEF webviews, and Tauri plugins.

Rules:

- Tauri shell is delivery infrastructure: windowing, process lifecycle, and IPC relay.
- Do not put product or business logic here.
- Do not add JS injection into embedded provider webviews.
- New webview behavior goes in CEF handlers or CDP from the Rust scanner side.
- Use `isTauri()` wrappers; never check `window.__TAURI__` directly.
- Audit new Tauri plugins for `js_init_script`; opt out if present.
- Prefer the vendored CEF-aware Tauri CLI via `pnpm --filter openhuman-app dev:app`.

Checks:

```powershell
cargo check --manifest-path app/src-tauri/Cargo.toml
```
