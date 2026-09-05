---
name: knowledge-base
title: "Historical Solutions & Deployment Playbook"
description: "Historical solutions, deployment patterns, and debugging playbook to prevent repeating past errors."
version: 1.0.0
category: "Knowledge Base & Troubleshooting"
triggers:
  • persistent bug
  • deployment failure
  • environment issue
  • check knowledge base
---

# Historical Knowledge Base & Troubleshooting Playbook

# Global AI Knowledge Base

## Vercel Deployment Prebuilt Cache Issue
**Issue**: Vercel returns 500 SSR error and ignores all new code pushes.
**Cause**: A bot (e.g. Lovable) accidentally committed the .vercel/output directory to Git. Vercel sees this directory, assumes the project is prebuilt, and skips pm run build, blindly serving the stale, broken artifacts.
**Resolution**: Run git rm -r --cached .vercel, add .vercel to .gitignore, and push. This forces Vercel to resume building from source.

## Google Colab / Jupyter Path Resolution
**Issue**: Running `Path("..")` in a Jupyter notebook cell fails to resolve the project root if the notebook is run in Google Colab (`/content`) or if Jupyter is launched from a different working directory.
**Cause**: `Path("..")` is relative to the current working directory, not the notebook file location.
**Resolution**: 
1. Use `os.path.abspath("")` and traverse upwards until a marker file (like `setup.py`) is found.
2. In Colab, the user must upload the project manually via `google.colab.files.upload()`, unzip it, and set the path explicitly to the extracted folder. Never assume local paths exist in Colab.

## ArXivist Generated Code Consistency
**Issue**: `TypeError: __init__() got an unexpected keyword argument` when running generated notebooks against generated code.
**Cause**: The Code Generator sub-agent and Notebook Generator sub-agent sometimes use different parameter names (e.g. `hidden_size` vs `hidden_dim`, or `raw_cuts` vs `raw_params`) because they operate independently.
**Resolution**: When executing generated notebooks or scripts, ALWAYS verify the actual generated constructor signatures (via `view_file` or `grep_search`) before running the code. Do not assume the notebook code perfectly aligns with the generated model code.

## Node.js Fetch & FormData Stream Errors
**Issue**: TypeError: source.on is not a function when uploading a File/Blob using native global etch and FormData in older Node.js environments.
**Cause**: The native etch API on some Node versions incorrectly handles streaming Blob objects appended to native FormData.
**Resolution**: Import and use the 
ode-fetch and orm-data NPM packages instead of relying on the global native implementations when dealing with file uploads/buffers.

## AI API Fallback Resilience
**Issue**: An agent pipeline crashes abruptly when an LLM provider returns a non-200 status (e.g. 402 Out of Credits, 429 Rate Limit, 502 Bad Gateway).
**Cause**: The fetch request throws an error without attempting alternative models.
**Resolution**: Wrap external LLM API calls in a robust 	ry/catch block and implement recursive fallback logic. If the primary model fails, the system should catch the error and automatically retry the prompt against a cheaper/free fallback model (e.g. LLaMA 3.1) instead of surfacing a 500 error to the client.

## Regex-Based Code Editing (Dangling Syntax)
**Issue**: Uncaught SyntaxError: await is only valid in async functions appearing globally on page load after using regex to replace event listener blocks.
**Cause**: Using non-greedy regex (like /[^\s\S]*?\}/) to replace a block of Javascript often stops at the *first* closing brace (e.g. inside a try/catch), leaving the rest of the original code dangling in the global scope.
**Resolution**: When replacing large Javascript blocks (like event listeners) in HTML, always match exactly to the end of the script tag or use DOM parsing. Verify syntax with 
ode -c (on JS files) or careful manual inspection afterwards.

## LaTeX Compilation via external APIs
**Issue**: Markdown-to-LaTeX strings fail to compile when sent to 	exlive.net or similar APIs, causing PDF generation to abort.
**Cause**: Markdown text often contains LaTeX reserved characters (�, $, %, &, _, {, }) that corrupt the compiler if not properly escaped. Furthermore, the API expects a specific payload structure.
**Resolution**: 
1. Heavily sanitize and escape all LaTeX reserved characters via regex before injecting markdown into the .tex template.
2. Ensure the payload is sent as multipart/form-data with the .tex string passed as a Buffer (Buffer.from(latexString, 'utf-8')) appended to the ilecontents[] field.

## Asana `workspace` Parameter Requires Numeric GID, Not Name
**Issue**: Calling `asana_create_task_v2` (or any Asana write action) with the workspace name or owner email returns `workspace: Not a Long: <value>`.
**Cause**: The `workspace` parameter is a numeric Long type, not a string. The Asana API does not auto-resolve friendly names. The Zapier action's dynamic-enum dropdown will only show valid GIDs if you have previously listed workspaces in the Zap.
**Resolution**:
1. Use the raw API action `asana_make_api_get_request` against `https://app.asana.com/api/1.0/workspaces` to enumerate workspaces.
2. Parse the response body (it's an array of `{gid, name, resource_type: "workspace"}`).
3. Pass the numeric `gid` as the `workspace` parameter. Verified gid for `mehanshbarthwal@gmail.com`: `1216898645282208` ("My workspace").

## Gmail `to` Parameter Is a String, Not an Array (Zapier)
**Issue**: Calling `gmail_send_email` with `to` as a JSON array of recipient strings returns `Recipient address required`, even when the array has one element.
**Cause**: The Zapier Gmail action's `to` field is declared as `list: true` in its schema, but the underlying Gmail API requires a plain comma-separated string. The schema lies about the wire format.
**Resolution**: For a single recipient, pass `to: "user@example.com"` as a plain string. For multiple recipients, pass `to: "a@x.com,b@y.com"` as a single comma-separated string. Do not pass a JSON array, regardless of the schema's `list` annotation.

## Asana `create_task_v2` Auto-Creates a Project If None Specified
**Issue**: Calling `asana_create_task_v2` without setting an explicit `projects` (or parent project) silently creates a new project inside the workspace, and the task lands there.
**Cause**: Asana requires every task to belong to at least one project. When the API call omits a project, the server auto-provisions a project rather than rejecting the request. This is not surfaced in Zapier's documentation.
**Resolution**:
1. If you intend to attach tasks to a specific project, pass its gid explicitly via the dynamic `projects` parameter.
2. If you only need a quick task dump (e.g. a one-off demo or a meeting action-item burst), letting the auto-project happen is fine; just record the new project gid in your session notes for later cleanup.
3. Verified auto-project gid from the 2026-07-26 Meeting Machine run: `1216900845358446`. Eleven tasks landed there.

## Slack Channel Parameter Requires the C-ID, Not the Channel Name
**Issue**: Calling `slack_send_channel_message` (or any Slack write action) with `channel: "#new-channel"` or `channel: "new-channel"` returns `channel_not_found`.
**Cause**: Slack's API requires the channel's `C`-prefixed id (e.g. `C0BKTDGGPGA`), not its human-readable name. The `channel` dynamic enum in the Zapier action only resolves names that the authenticated user is a member of, and a trigger setup call (`slack_new_message_posted_to_channel`) does not return channel metadata you can reuse.
**Resolution**:
1. Use the raw API action `slack_make_api_get_request` against `https://slack.com/api/conversations.list?limit=200&types=public_channel,private_channel`.
2. Parse the response body's `channels[]` array and find the `id` field for the channel name you want.
3. Pass the `C…` id (not the name) as the `channel` parameter. For the Meeting Machine target workspace (Test space, team `T0BKM6D4Z7V`), `#new-channel` is `C0BKTDGGPGA`.

## Keyword-Matching Hallucinations in Data Extraction
**Issue**: Extracting irrelevant posts (e.g. relationship advice, COVID symptoms) and misclassifying them just because a search keyword (like "smell" or "odor") appeared in the text.
**Cause**: Relying on simple keyword presence (often surfaced by search tools) rather than genuinely evaluating the post's actual subject against the inclusion criteria. This bypasses anti-hallucination measures because the AI incorrectly assumes the keyword's presence makes the text topically relevant.
**Resolution**:
1. Never accept a candidate based purely on a keyword match. Always read the live post and evaluate its *actual subject* before including it.
2. If the post happens to contain a keyword but the primary topic is completely unrelated (e.g., pest control, relationship, general city infrastructure) to the specific problem domain being researched, reject it immediately.
3. Dedup cross-posted threads (same title/body on different URLs) as a single entity rather than separate valid entries.

## Consumer Problem Bank — Classification Rules (standing, do not re-derive)

### Residential vs Commercial
- Default: Residential. A complaint about someone's own home, own apartment, own flat, own appliance, own tap water — regardless of building type (apartment, independent house, high-rise) — is Residential.
- Commercial applies ONLY to:
  - PG (paying guest) accommodations
  - Managed/shared water supply contexts explicitly tied to a commercial operator or shared building management acting as a service provider (not just "the building has a water tank" — the complaint has to be about the managed-supply relationship itself)
- Do NOT mark something Commercial just because:
  - It's in an apartment/flat/high-rise building (still Residential — building type is not the test)
  - A utility board (BWSSB, DJB, BMC, etc.) supplies the water (still Residential — public utility supply to a private home is still a residential complaint)
  - The post mentions a landlord (a landlord-tenant residential complaint is still Residential unless it's specifically a PG)

## Consumer Problem Bank — Classification Rules (standing, do not re-derive)

### Residential vs Commercial
- Default: Residential. A complaint about someone's own home, own apartment, own flat, own appliance, own tap water — regardless of building type (apartment, independent house, high-rise) — is Residential.
- Commercial applies ONLY to:
  - PG (paying guest) accommodations
  - Managed/shared water supply contexts explicitly tied to a commercial operator or shared building management acting as a service provider (not just "the building has a water tank" — the complaint has to be about the managed-supply relationship itself)
- Do NOT mark something Commercial just because:
  - It's in an apartment/flat/high-rise building (still Residential — building type is not the test)
  - A utility board (BWSSB, DJB, BMC, etc.) supplies the water (still Residential — public utility supply to a private home is still a residential complaint)
  - The post mentions a landlord (a landlord-tenant residential complaint is still Residential unless it's specifically a PG)

### Relevance — what counts as a valid entry at all
A valid entry is a genuine, specific complaint about a domestic KITCHEN or WASHROOM/BATHROOM odor problem. Before logging anything, confirm:
- The post's actual subject is a kitchen/washroom odor issue — not a post where "smell"/"odor" appears once, incidentally, in an unrelated context (relationship posts, roommate-etiquette posts where smell is a side detail, metaphorical use like "smelled blood in the water," general city/street complaints, etc.)
- If you have to explain why an off-topic-sounding post "actually counts," it almost certainly doesn't. When in doubt, exclude and flag it as borderline for the user rather than including it.

### Known past mistakes — do not repeat
- PH-003, PH-014, PH-015, PH-018 were wrongly marked Commercial for ordinary residential complaints (own toilet, own washing machine, own tap water, own flat) — corrected 2026-08-06. This is the exact category of mistake to check against every future entry, not something to file away as one-time noise.
- PH-022 (roommate candle-smell side detail) and PH-027 ("smelled blood in the water" metaphor) were logged as valid entries despite having no real connection to kitchen/washroom odor — removed 2026-08-06. This was a keyword-match failure, the same failure class as the original PH-044–049 incident.
- **Stale Base / False Live-File Appends (2026-08-06):** Claimed to have appended new entries to the "live file" (e.g. `consumer_problem_bank_updated.xlsx`) and run "live dedup" when actually operating on a stale local snapshot. Because the file read from disk was silently diverged from the user's actual active document (the user had a 47-row verified base they hadn't overwritten on disk, or the Python script read an out-of-sync version), the dedup missed multiple duplicates (PH-072, PH-073) that were already in the user's true base. This was only caught because the user independently verified the data. **Permanent Rule:** Never claim "live file" access or successful append unless you can prove you are reading/writing the exact file at the exact path the user actively opens. If the file access model relies on local mounted copies that the user must manually transfer, state "I do not have live access" prominently before every file operation and never claim to be appending to the live file. Always re-verify the row count and ID range of the base file before appending anything to ensure it matches expectations.

