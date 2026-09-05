# OpenHuman shared agent usage

This folder is for all local AI agents, not only Codex or Claude.

Start with `SKILL.md`, then read the matching file under `agents/`.

Auto-select rules:

- Rust core work: `agents/rust-core.md`
- Frontend work: `agents/frontend.md`
- Tauri shell work: `agents/tauri-shell.md`
- Testing or CI work: `agents/testing.md`
- Event bus work: `agents/event-bus.md`
- Cross-stack feature work: `agents/feature-workflow.md`
- Setup or PR workflow: `agents/contributing.md`

Do not ask the user which sub-agent to use. Pick from the touched paths and task type.

If an agent supports subagents, spawn the selected subagent with the relevant file as its instruction context.
If it does not support subagents, read the selected file into the current agent context and continue.

Keep OpenHuman project outputs in the OpenHuman repo, not in `F:\Agent Skills\openhuman`.
