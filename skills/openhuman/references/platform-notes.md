# Platform notes

- Runs on Windows, macOS, and Linux.
- Tauri submodules under `app/src-tauri/vendor/` must be initialized.
- Use the vendored CEF-aware Tauri CLI, not the stock Tauri CLI, when running the app.
- `pnpm --filter openhuman-app dev:app` is the preferred desktop dev command.
- Core server standalone runs on port `7788`.
- Authenticated local RPC uses a token from `~/.openhuman-staging/core.token` or `~/.openhuman/core.token`.
- Public endpoints include `GET /health`, `GET /schema`, and `GET /events`.
