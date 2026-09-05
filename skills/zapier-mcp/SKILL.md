---
name: zapier-mcp
title: "Zapier MCP Natural Language Action Suite"
description: "Model Context Protocol configuration and workflow triggers for Zapier Natural Language Actions across 5000+ apps."
version: 1.0.0
category: "Integrations & APIs"
triggers:
  • connect zapier
  • run zapier action
  • trigger zapier mcp
---

# Zapier MCP Integration Skill

# Zapier MCP Connection Setup

A pure reference of the user's currently authenticated apps on Zapier MCP and the actions scoped for each, so future sessions can skip the discovery step. This is NOT a workflow — it does not pull data, post messages, or run any task. It only documents the connection state.

> Companion to the Zapier-side skill `zapier mcp connection setup` (saved via `create_zapier_skill`). This local file is a snapshot for offline reference.

## Authenticated accounts

All four apps are bound to a single personal account:

- **Email / Drive owner:** `user@example.com`
- **Slack user / workspace:** `@user` in the workspace (connection_id `<id>`)
- **Asana user:** User Name, gid `<user_gid>`
- **Asana workspace:** "Workspace Name", gid `<workspace_gid>`

Default connections are correct for this user. No account mismatch detected.

## Scoped actions per app

### Gmail (GoogleMailV2CLIAPI, connection_id 65285792)
- **gmail_find_email** (read) — query: string, uses standard Gmail search operators
- **gmail_send_email** (write) — params: to (list), subject, body, body_type ("plain" | "html"), optional cc/bcc/from/reply_to/signature
- **gmail_reply_to_email** (write) — params: thread_id (required), body (required), optional to/cc/bcc/subject/signature
- **gmail_new_email** (read, trigger) — label_ids: dynamic enum
- **gmail_new_labeled_email** (read, trigger) — label_ids: dynamic enum
- **gmail_new_starred_email** (read, trigger) — no required params

### Slack (SlackCLIAPI, connection_id 65285855)
- **slack_send_channel_message** (write) — channel: dynamic enum, text: required
- **slack_send_private_channel_message** (write) — channel: dynamic enum, text: required
- **slack_new_message_posted_to_channel** (read, trigger) — channel: dynamic enum
- **slack_new_message_posted_to_private_channel** (read, trigger) — channel: dynamic enum
- **slack_get_conversation**, **slack_get_message**, **slack_user_by_email/name/id/username** (reads)
- **slack_add_reaction_v0**, **slack_set_status**, **slack_set_channel_topic**, **slack_direct_message** (writes)
- **Reactive state (updated 2026-07-26):** the Test space has 3 channels visible: `#social` (`C0BKM6DFQTD`), `#all-test-space` (`C0BKQ52R73P`), and `#new-channel` (`C0BKTDGGPGA`). `slack_send_channel_message` confirmed working against `#new-channel`. Read triggers still depend on whether the bot is a member of the target channel — at last check only the channel creator was a member. Treat Slack reads as low-value unless the user is in the target channel; send actions are reliable.

### Asana (AsanaCLIAPI, connection_id 65285823)
- **asana_create_task_v2** (write) — workspace: 1216898645282208 (locked), plus project/name/notes/etc.
- **asana_create_subtask_v3** (write)
- **asana_find_task_v3** (read) — workspace + project required, name required
- **asana_find_tasks_in_workspace** (read) — workspace: 1216898645282208 (locked), optional projects/text/completed/sort_by/limit
- **asana_find_task_in_workspace_v2** (read) — same workspace
- **asana_find_user_v2** (read) — resolves user → workspace memberships (used to derive the workspace gid above)
- **asana_find_project_v2** (read)
- **asana_update_task_v4** (write)
- **asana_add_tag_to_task**, **asana_create_section**, **asana_story** (writes)
- **Reactive state:** Asana has 1 personal project ("Mehansh's first project", gid `1216899047254226`) with 3 sample tasks (Task 1/2/3) all in "To do" section. The workspace is small and the only project is a personal sandbox. **Update 2026-07-26:** a second project (`1216900845358446`) was auto-created by the first `asana_create_task_v2` call when no project was specified; 11 Meeting Machine action items now live there. Future calls without an explicit project will land in the new auto-project.

### Google Drive (GoogleDriveCLIAPI, connection_id 65285877)
- **google_drive_find_a_file** (read) — title: string, search_type: "exact" | "contains", optional drive/folder/file_types
- **google_drive_file_v2** (read) — fetch a specific file
- **google_drive_file_or_folder_by_id** (read)
- **google_drive_folder_v2** (read)
- Writes: copy_file, delete_file, export_file, file, folder, move_file, newtxtfile, replace_file, share_file, shortcut, update_file_*, shared_drive
- **Reactive state:** last search returned 25 files, most owned by other people (shared into the user's Drive) plus a few of the user's own Colab notebooks. Searches that include the user's full Drive will surface shared-by-others content.

## Connection management

- `list_zapier_connections(selected_api)` is available per app.
- `manage_zapier_connections(selected_api)` returns an auth URL to add a new account or set a default.
- All four apps currently have exactly 1 connection (default). Adding a work/personal split on Gmail or Asana later is supported via the link from `manage_zapier_connections`.

## Constraints

- This file is reference-only. It does not execute any actions.
- Do not assume any project-specific context (no project name, no file names, no task content). The user has not yet given the actual task — that arrives in a separate prompt after they `cd` into a project folder.
- If a future session needs to re-verify any of the above (e.g. the Slack Test space has since gained channels, or a new Asana project exists), call the appropriate read action and update the relevant section. The locked workspace gid and account names are unlikely to change but the per-tool reactive state can drift.

