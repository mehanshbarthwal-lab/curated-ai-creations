# Architecture notes

OpenHuman is a desktop app with three main layers:

1. React/Vite frontend in `app/src/`
2. Tauri v2 shell in `app/src-tauri/`
3. Rust core sidecar in `src/`

The UI talks to the Rust core through HTTP JSON-RPC. The Rust core owns business logic,
domain state, execution, persistence, CLI/server behavior, MCP routing, and the QuickJS
skills runtime.

Default architecture rule: put durable logic in Rust core. Tauri bridges and hosts.
React renders, navigates, and orchestrates.

For cross-domain Rust communication, use the event bus and native registry patterns
instead of direct global construction.
