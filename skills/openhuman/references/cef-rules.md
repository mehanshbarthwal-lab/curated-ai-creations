# CEF and webview rules

Provider webviews include services like Telegram, LinkedIn, Slack, Discord, WhatsApp, and Gmail.

Rules:

- Do not add new JavaScript injection into embedded provider CEF webviews.
- Avoid init scripts, CDP `Runtime.evaluate`, and `Page.addScriptToEvaluateOnNewDocument` for new behavior.
- Put new provider behavior in CEF handlers or scanner-side CDP from Rust.
- Audit new Tauri plugins for hidden `js_init_script` behavior.
