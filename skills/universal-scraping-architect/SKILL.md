---
name: universal-scraping-architect
description: "Use this skill for any scraping, crawling, extraction, parsing, web research, document processing, dataset preparation, Firecrawl workflow, local file extraction, API extraction, PDF/Excel/CSV/JSON/XML parsing, validation-heavy data pipeline, or repeatable clean-output scraping task. This skill selects the best approach between Firecrawl, traditional/local scraping, or a hybrid workflow; enforces token tracking, Firecrawl quota planning, validation, checkpointing, safe API key handling, and robust error prevention."
---

# Universal Scraping Architect

## Purpose

This skill is a reusable, general-purpose scraping and data extraction framework.

Use it whenever the user asks for:

- scraping
- crawling
- extraction
- parsing
- automation
- data collection
- web research
- document processing
- dataset preparation
- website-to-data workflows
- PDF extraction
- scanned document extraction
- Excel/CSV cleaning
- JSON/XML extraction
- API extraction
- Firecrawl workflows
- local file extraction
- repeatable scraping pipelines
- validation-heavy data preparation
- clean final output generation

This skill is not tied to any fixed website, source, file type, dataset, date, month, country, project, field, industry, variable, or output format.

The framework must remain stable. Only task-specific inputs should change.

The user may later provide:

- URLs
- domains
- search queries
- local file paths
- folder paths
- PDFs
- scanned PDFs
- DOCX files
- Excel files
- CSV files
- JSON files
- XML files
- ZIP files
- APIs
- databases
- screenshots
- dashboards
- reports
- forms
- portals
- required fields
- required columns
- required filters
- required output format
- required file name
- required folder name
- required validation rules
- required cleaning rules
- required merging rules
- token budget
- model context limit
- Firecrawl quota assumption
- preferred libraries
- preferred programming language
- Firecrawl usage preference
- non-Firecrawl usage preference

Use those as configurable task-specific inputs.

Never hardcode project-specific assumptions unless the user explicitly provides them.

---

# Core Principle

Every scraping task must be treated as a complete data pipeline, not as a quick fragile script.

The universal pipeline is:

1. Understand the source.
2. Choose the most appropriate extraction approach.
3. Configure task-specific settings.
4. Extract safely.
5. Handle pagination, layout changes, dynamic content, or file variations.
6. Clean the extracted data.
7. Normalize structure and field names.
8. Validate the result.
9. Track token/data volume if LLM processing is involved.
10. Estimate Firecrawl usage/quota before large Firecrawl jobs.
11. Handle errors clearly.
12. Save clean outputs.
13. Save logs and checkpoints when useful.
14. Print a final summary.
15. Explain what was done and what can be customized.

Never produce fragile one-off scraping code when the user needs a robust, repeatable, copy-paste-ready solution.

---

# Mandatory Approach Selection Rule

Before doing scraping or writing scraping code, decide which approach is more appropriate:

1. Firecrawl
2. Traditional/local scraping
3. Hybrid approach

Use the approach that fits the task best.

## Use Firecrawl when appropriate

Use Firecrawl if the task involves public web data and Firecrawl would make the work more reliable, faster, cleaner, or easier.

Firecrawl is more appropriate when:

- The user needs live web data during the current session.
- The user gives a public URL and wants clean page content.
- The user gives a topic/query and needs discovery first.
- The user needs search-first scraping.
- The source is a public webpage that should be converted into clean markdown or structured content.
- The task requires scraping known URLs.
- The task requires crawling many pages.
- The task requires mapping a website to discover URLs.
- The page has dynamic content.
- The page needs interaction such as clicks, forms, scrolling, or navigation.
- The task needs a repeatable deliverable from web data, such as:
  - research brief
  - SEO audit
  - QA report
  - lead list
  - competitive intelligence digest
  - knowledge base
  - design clone
  - source-backed summary
- The user wants Firecrawl added to an app, backend, script, agent, workflow, or product.
- The user wants a Firecrawl API integration.
- The task is better served by Firecrawl search, scrape, crawl, map, interact, docs-search, or ask/support.

## Use traditional/local scraping when appropriate

Use traditional/local scraping when Firecrawl is unnecessary, unavailable, inappropriate, or less suitable.

Traditional/local scraping is more appropriate when:

- The source is a local file.
- The source is a folder of files.
- The source is a CSV file.
- The source is an Excel file.
- The source is a PDF stored locally.
- The source is a scanned document that requires local OCR.
- The source is JSON/XML already downloaded.
- The source is a database export.
- The source is private or sensitive and should not be sent to an external API.
- The user explicitly asks not to use Firecrawl.
- The data is available through an official API/download and that is cleaner than scraping.
- The task requires custom parsing with pandas, openpyxl, pdfplumber, tabula, camelot, regex, lxml, BeautifulSoup, or database tools.
- The task is simple static HTML and Firecrawl is not needed.
- The task requires exact file transformations, merging, cleaning, or validation more than web extraction.

## Use a hybrid approach when appropriate

Use a hybrid approach when Firecrawl is useful for web extraction but local tools are better for processing.

Examples:

- Firecrawl searches and scrapes public web pages, then Python cleans and validates the extracted data.
- Firecrawl discovers URLs, then local code parses and saves structured datasets.
- Firecrawl extracts markdown, then pandas/openpyxl writes the final Excel.
- Firecrawl gathers evidence, then local code performs token chunking, deduplication, and report generation.
- Firecrawl collects web content, then local code merges it with user-provided files.

## How to communicate the choice

When starting the task, briefly state which approach is being used and why.

Examples:

- “Firecrawl is more appropriate here because the task needs live public web discovery and clean page extraction.”
- “Traditional local parsing is more appropriate here because the source is a local Excel/PDF file.”
- “A hybrid approach is better here: Firecrawl for discovery and scraping, then Python for cleaning, validation, and saving.”

Do not ask unnecessary clarification if the task can proceed with reasonable assumptions.

If a necessary input blocks the work, ask only the minimum required question.

---

# Firecrawl Full Routing Memory

Firecrawl gives AI agents and apps fast, reliable web context with strong search, scraping, crawling, mapping, interaction, support, and documentation tools.

Firecrawl helps agents:

- search first
- scrape clean content
- interact with live pages when plain extraction is not enough
- crawl or map websites
- diagnose failed jobs
- search Firecrawl documentation
- integrate Firecrawl into application code
- produce finished deliverables from web data

Firecrawl has three major skill segments:

1. CLI skills
2. Build skills
3. Workflow skills

It also includes browser authorization for sign-in or account creation.

---

# Firecrawl Install Command

One command installs everything:

```bash
npx -y firecrawl-cli@latest init --all --browser
```

This installs or enables:

- Firecrawl CLI for live web work
- Build skills for integrating Firecrawl into application code
- Workflow skills for repeatable deliverables
- Browser authentication so the human can sign in or create an account

After installation, verify it before real work.

Recommended install verification:

```bash
mkdir -p .firecrawl
firecrawl --status
firecrawl scrape "https://firecrawl.dev" -o .firecrawl/install-check.md
```

If verification fails:

- Do not guess.
- Check authentication.
- Check whether the CLI is installed.
- Check whether `FIRECRAWL_API_KEY` is available.
- Check network access.
- Use `firecrawl ask` / support if there is a Firecrawl job failure or unexpected result.

---

# What the Firecrawl Installation Gives

## 1. CLI tools

Examples:

- `firecrawl search`
- `firecrawl scrape`
- `firecrawl interact`
- `firecrawl ask`
- `firecrawl docs-search`
- `firecrawl crawl`
- `firecrawl map`

## 2. CLI skills

CLI skills teach the agent how to drive the Firecrawl CLI during its own session.

Use CLI skills when the agent itself needs web data right now.

They answer:

> Which Firecrawl command should I run right now?

They run:

> In the agent’s own terminal session.

Relevant CLI skills:

- `firecrawl/cli`
- `firecrawl-search`
- `firecrawl-scrape`
- `firecrawl-interact`
- `firecrawl-crawl`
- `firecrawl-map`
- `firecrawl-ask`
- `firecrawl-docs-search`

## 3. Build skills

Build skills teach the agent how to add Firecrawl to a product’s codebase.

Use build skills when the agent is shipping code that other people will run later, not just running a command during the current session.

They answer:

> How do I add a Firecrawl API call to this codebase?

They run:

> Inside the user’s product code.

Build skills help with:

- choosing the right API endpoint
- installing the matching SDK
- storing `FIRECRAWL_API_KEY` safely
- writing the call site according to the project’s conventions
- smoke-testing the integration

Relevant build skills:

- `firecrawl-build`
- `firecrawl-build-onboarding`
- `firecrawl-build-scrape`
- `firecrawl-build-search`
- `firecrawl-build-interact`
- `firecrawl-build-parse`

## 4. Workflow skills

Workflow skills turn Firecrawl web data into finished deliverables.

Use workflow skills when the agent’s job is to produce a finished artifact, not just raw extraction or product code.

They answer:

> What is the finished deliverable and how do I produce it?

They run:

> In the agent’s session, producing an artifact.

Workflow skills are useful for:

- research briefs
- SEO audits
- lead lists
- QA reports
- knowledge bases
- competitive intelligence reports
- design clones
- other repeatable web-data deliverables

Relevant workflow entry:

- `firecrawl-workflows`

The full workflow skill list lives in the workflows repository.

---

# Firecrawl Path Selection

All paths use the same install command:

```bash
npx -y firecrawl-cli@latest init --all --browser
```

After that, choose the path:

## Path A

Need web data during this session.

Use live tools.

## Path B

Need to add Firecrawl to app code.

Use app integration/build skills.

## Path C

Need a finished deliverable from web data.

Use workflow skills.

## Path D

Need an account, sign-in, authorization, or API key first.

Use auth only.

## Path E

Do not want to install anything.

Use REST API directly.

If more than one path is needed, do them in sequence.

The same install already covers everything.

---

# Path A: Firecrawl Live Web Tools

Use Path A when the agent needs web data during the current work session.

Use it for:

- searching the web
- scraping known URLs
- interacting with live pages
- crawling websites
- mapping a site
- discovering URLs
- crawling docs
- extracting public page content
- troubleshooting Firecrawl calls

After install, hand off to the correct CLI skill.

## Use `firecrawl/cli`

Use for:

- the overall command workflow
- deciding which Firecrawl command to run
- chaining commands

## Use `firecrawl-search`

Use when:

- discovery is needed first
- the user gives a topic, keyword, entity, company, product, or vague research target
- URLs are not known yet

## Use `firecrawl-scrape`

Use when:

- the user already has a URL
- only one page or a known set of pages needs extraction
- clean markdown/content is needed

## Use `firecrawl-interact`

Use when:

- the page needs clicks
- forms must be filled
- navigation is required
- scrolling is needed
- content appears after interaction
- login-like flow is required and the user is authorized

## Use `firecrawl-crawl`

Use when:

- bulk extraction across a site or section is needed
- many pages under a domain need processing
- a website section must be captured

## Use `firecrawl-map`

Use when:

- URL discovery or site structure is needed
- the agent needs to know what pages exist before scraping
- crawl scope needs planning

## Use `firecrawl-ask`

Use when:

- a Firecrawl call fails
- a job returns unexpected output
- a job ID is available and diagnostics are needed
- a failing `jobId` can be passed

The support agent diagnoses from team job logs and account state.

## Use `firecrawl-docs-search`

Use when:

- asking how Firecrawl handles something
- endpoint parameters are unclear
- current Firecrawl documentation is needed

Answers should be grounded in current docs with citations.

## Default Path A flow

For live web work:

1. Start with search when discovery is needed.
2. Move to scrape when a URL is known.
3. Use map when URL discovery/site structure is needed.
4. Use crawl when bulk extraction is needed.
5. Use interact only when clicks/forms/navigation are necessary.
6. If any step fails or returns unexpected output, run `firecrawl ask` with the failing `jobId` instead of guessing.
7. If the task becomes “wire Firecrawl into product code,” switch to Path B.
8. If the task becomes a deliverable, switch to Path C or combine with Path C.

## Path A strict rules

Do not:

- use interact when scrape is enough
- use crawl when scrape is enough
- use browser interaction unnecessarily
- guess after a Firecrawl failure if `firecrawl ask` can diagnose it
- forget to save or cite source evidence when claims need traceability
- paste huge scraped content into an LLM prompt without token tracking

---

# Path B: Integrate Firecrawl Into an App

Use Path B when building an application, agent, workflow, backend service, script, or product that calls the Firecrawl API from code.

This means the Firecrawl integration will run inside the user’s product after the agent stops.

This is different from Path A.

Path A:

- Runs Firecrawl commands during the current session to fetch data for the agent.

Path B:

- Writes code that will keep running later inside the user’s app/product, using `FIRECRAWL_API_KEY` from the project environment or runtime secret manager.

## Path B setup

The build skills are installed from the same command:

```bash
npx -y firecrawl-cli@latest init --all --browser
```

No separate install is needed for build skills.

Before writing code, choose project mode.

### Fresh project

If it is a fresh project:

- pick the stack
- install the SDK
- add environment variable handling
- add `FIRECRAWL_API_KEY` safely
- write the Firecrawl call
- run a real smoke test

### Existing project

If it is an existing project:

- inspect the repository first
- identify how it handles APIs
- identify how it handles environment variables
- identify how it handles secrets
- identify its logging style
- identify its error handling style
- identify its testing style
- integrate Firecrawl in the same style
- avoid creating conflicting patterns

## API key handling in Path B

If the user already has a key, save it to the environment.

Example `.env` entry:

```dotenv
FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE
```

Never hardcode the API key in source code.

Never store the real key in memory.

Never print the real key in logs.

Never include the real key in final answers.

If the user pasted a real key:

- redact it
- advise storing it in `.env` or a secret manager
- advise rotating it if exposure is possible

## Path B required question

The required question for app integration is:

> What should Firecrawl do in the product?

Use the answer to route to:

- `/search`
- `/scrape`
- `/interact`
- `/parse`
- `/crawl`
- `/map`

Then run one real Firecrawl request as a smoke test when possible.

## Path B build skills

Use `firecrawl-build`:

- for the overall build workflow
- for endpoint routing
- when deciding how Firecrawl fits the product

Use `firecrawl-build-onboarding`:

- for auth
- for project setup
- for API key setup
- for SDK install
- for smoke testing

Use `firecrawl-build-scrape`:

- when the product feature scrapes a known URL

Use `firecrawl-build-search`:

- when the product feature starts with a query and discovers pages

Use `firecrawl-build-interact`:

- when the product feature needs clicks, forms, or navigation after a scrape

Use `firecrawl-build-parse`:

- when the product feature parses local or non-public document files such as:
  - PDF
  - DOCX
  - XLSX
  - other documents

## Path B coding rules

When integrating Firecrawl into product code:

- inspect project structure first
- follow existing conventions
- use the matching SDK if appropriate
- use REST API if SDK is unavailable or not desired
- store `FIRECRAWL_API_KEY` in environment variables
- add timeout handling
- add retry handling when appropriate
- add clear errors
- avoid exposing secrets
- add logging without secrets
- add a smoke test
- document required environment variables
- keep implementation modular
- do not mix app code with one-off scraping logic unless requested

---

# Path C: Repeatable Firecrawl Deliverables

Use Path C when the goal is a finished artifact powered by Firecrawl web data.

Use this path when the user wants:

- research brief
- SEO audit
- QA report
- lead list
- knowledge base
- competitive intelligence digest
- market research
- source-backed summary
- design clone
- content audit
- website analysis
- documentation extraction
- repeatable report
- finished artifact rather than raw scraped data

Path C is not mainly for:

- raw extraction only
- app-code integration only

It is for producing something useful from web data.

## Workflow skills behavior

Workflow skills:

- infer from context first
- ask only short clarifying questions when an input would block the work
- identify independently parallelizable units
- allow work to fan out across competitors, pages, topics, or sources
- collect evidence
- synthesize results
- produce the requested artifact

Start with:

- `firecrawl-workflows`

The umbrella workflow skill inspects the user’s request and routes to the right workflow.

If the correct workflow is already obvious, hand off to that workflow directly.

## Default Path C flow

For workflow deliverables:

1. Confirm or infer the workflow and final artifact.
2. Collect web evidence with Firecrawl through CLI or an equivalent tool surface.
3. Save or cite source evidence so claims are traceable.
4. Run independent research units in parallel when possible.
5. Synthesize findings into the requested deliverable.
6. Include a short rerun inputs block when the workflow could be automated.
7. If the web work fails, switch to Path A troubleshooting.
8. If the request shifts to app integration, switch to Path B.

## Path C deliverable quality rules

For deliverables:

- do not dump raw scraped content unless requested
- produce a clean artifact
- cite or preserve sources when claims matter
- separate facts from interpretation
- summarize large web data
- track tokens
- use chunking if content is too large
- report coverage and limitations
- include repeatable inputs if automation may be useful

---

# Path D: Firecrawl Account Authorization Or API Key

Use Path D when the human still needs to:

- sign up
- sign in
- authorize access
- obtain an API key
- make `FIRECRAWL_API_KEY` available

If the install command was run with `--browser`, the human should already have been prompted to sign in.

Before running this flow:

- check if `FIRECRAWL_API_KEY` is already available
- if a valid key exists, skip Path D
- if no key exists, use Path D

## Human sign-in URL

If the human is reading in a browser, they can create an account or sign in at:

```text
https://www.firecrawl.dev/signin?view=signup&source=agent-suggested
```

## Agent authorization flow

If an agent needs the human to authorize an API key, use this flow.

### Step 1: Generate auth parameters

```bash
SESSION_ID=$(openssl rand -hex 32)
CODE_VERIFIER=$(openssl rand -base64 32 | tr '+/' '-_' | tr -d '=\n' | head -c 43)
CODE_CHALLENGE=$(printf '%s' "$CODE_VERIFIER" | openssl dgst -sha256 -binary | openssl base64 -A | tr '+/' '-_' | tr -d '=')
```

### Step 2: Ask the human to open this URL

```text
https://www.firecrawl.dev/cli-auth?code_challenge=$CODE_CHALLENGE&source=coding-agent#session_id=$SESSION_ID
```

If the human already has a Firecrawl account:

- they sign in
- they authorize

If they do not have a Firecrawl account:

- they create one first
- then authorize

The API key comes back automatically after they click “Authorize.”

### Step 3: Poll for the API key

Request:

```http
POST https://www.firecrawl.dev/api/auth/cli/status
Content-Type: application/json

{"session_id": "$SESSION_ID", "code_verifier": "$CODE_VERIFIER"}
```

Poll every 3 seconds.

Possible response:

```json
{"status": "pending"}
```

Meaning:

- keep polling

Possible response:

```json
{"status": "complete", "apiKey": "fc-...", "teamName": "..."}
```

Meaning:

- authorization complete
- API key received

### Step 4: Save the key and continue

```bash
echo "FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE" >> .env
```

Never paste the real key into prompts or memory.

## Path D security rules

Do not:

- expose the real key
- store the real key in memory
- print the real key
- commit `.env` files
- include keys in code snippets except as placeholders
- send keys to logs
- include keys in screenshots

If a key is exposed:

- redact it immediately
- advise the user to rotate the key
- replace it with `FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE`

---

# Firecrawl API Key Quota / Token Exhaustion Rule

The Firecrawl workflow must use only one active API key at a time.

Do not store or manage multiple Firecrawl API keys inside this skill memory.

Do not create a multi-key rotation system unless the user explicitly asks for it later.

## Default key handling

Use one environment variable only:

```dotenv
FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE
```

The real API key must never be written inside:

- prompts
- memory
- code comments
- public code
- logs
- screenshots
- final answers

If the user provides a real key, treat it as sensitive.

Redact it in responses and recommend storing it in `.env` or a secure secret manager.

## Firecrawl usage estimation before large jobs

Before running a large Firecrawl scraping, crawling, mapping, interaction, or search job, estimate expected Firecrawl usage.

Estimate:

- number of websites/domains
- number of URLs/pages
- number of crawl pages
- number of search results
- number of scrape requests
- number of interact requests
- number of retry requests
- expected total Firecrawl credits/tokens/usage units if known

Use a safe planning assumption:

> One Firecrawl API key may be treated as able to scrape approximately 1000 websites/pages/requests/credits in total, unless the user provides a different quota or Firecrawl account limit.

If the task may use more than approximately 1000 websites/pages/requests/credits on one key:

- Do not start the full job blindly.
- Tell the user that the job may exceed the current Firecrawl key’s available quota.
- Ask the user to choose one of these options:
  1. Provide a new valid Firecrawl API key through a secure method.
  2. Increase the Firecrawl account quota.
  3. Reduce the scraping scope.
  4. Split the job into smaller batches.
  5. Confirm that the current key has enough quota.

Do not ask for more keys unnecessarily.

Only ask when:

- the estimated usage may exceed the safe 1000-item/key limit
- or the current key becomes exhausted, expired, invalid, or rate-limited

## When the current Firecrawl key is exhausted

If Firecrawl returns an error showing quota exhaustion, token exhaustion, credit exhaustion, account limit, rate limit, expired key, invalid key, or blocked access:

1. Stop or pause the large scraping job.
2. Show the error clearly without exposing the API key.
3. Tell the user that the current Firecrawl key appears exhausted, invalid, expired, or rate-limited.
4. Ask the user to replace the current `FIRECRAWL_API_KEY` with a new valid key through a secure method.
5. Do not store multiple keys.
6. Do not print the new key.
7. After the user updates the key, run a small smoke test.
8. Resume from the last successful source if checkpointing exists.
9. Do not restart from zero unless necessary.

Smoke test after replacing the key:

```bash
firecrawl --status
firecrawl scrape "https://firecrawl.dev" -o .firecrawl/key-check.md
```

If using REST API directly, run one small `/scrape` or `/search` request before continuing the full workflow.

## Checkpointing rule for large Firecrawl jobs

For large jobs, save progress after each successful URL, page, batch, or domain.

The script should save:

- completed sources
- failed sources
- pending sources
- output so far
- Firecrawl job IDs where available
- last successful checkpoint

This allows the workflow to resume safely if:

- the API key quota is exhausted
- the request fails
- the internet connection drops
- the script crashes
- the user changes the API key

The framework must never waste quota by repeatedly scraping already completed pages unless the user explicitly asks to refresh them.

## Final API key rule

Use one active Firecrawl key at a time.

Do not include multiple API keys in memory.

Do not rotate keys automatically.

Ask the user for a new key only if the current key is exhausted or if the estimated job size may exceed around 1000 websites/pages/requests/credits for one key.

---

# Path E: Use Firecrawl Without Installing Anything

Use Path E when the user does not want to install a CLI or skills package.

This works for:

- live web work
- app integration
- direct API calls
- scripts
- backend services
- agent workflows

A Firecrawl API key is still required.

There are two ways to get one:

## 1. Human pastes it in

If the user already has a key:

- set `FIRECRAWL_API_KEY` in the environment
- or pass it securely through a secret manager
- never hardcode it

## 2. Automated auth flow

Use Path D to walk the human through browser auth and receive the key automatically.

## Firecrawl REST API details

Base URL:

```text
https://api.firecrawl.dev/v2
```

Auth header:

```http
Authorization: Bearer fc-YOUR_API_KEY
```

Use placeholder only.

Never include a real key.

## Available REST endpoints

### POST `/search`

Purpose:

- discover pages by query
- search first before scraping
- can return results with optional full-page content

Use when:

- the user gives a topic, query, company, product, category, keyword, or research goal
- URLs are unknown
- discovery is needed

### POST `/scrape`

Purpose:

- extract clean markdown from a single URL

Use when:

- a known URL is provided
- one page needs clean extraction
- page content should be converted into markdown or structured clean text

### POST `/interact`

Purpose:

- browser actions on live pages
- clicks
- forms
- navigation
- dynamic page interaction

Use when:

- content requires interaction
- plain scrape is not enough
- authorized form/navigation interaction is needed

### POST `/support/ask`

Purpose:

- diagnose a failing Firecrawl call

Payload:

- `question`
- optional `jobId`

Returns:

- prose answer
- machine-readable `fixParameters` to retry with

Important:

- auto-scoped to the team via bearer key
- pass `jobId` when available

### POST `/support/docs-search`

Purpose:

- answer “how do I…” questions from Firecrawl’s official docs

Payload:

- `question`

Returns:

- answer
- citations to the documentation pages used

Use when:

- exact Firecrawl behavior is unclear
- endpoint parameters are unclear
- current Firecrawl docs are needed

## Documentation and references

The API docs are the source of truth for:

- request schemas
- response schemas
- endpoint parameters
- SDKs
- current supported features

API reference:

```text
https://docs.firecrawl.dev
```

Skills repo:

```text
https://github.com/firecrawl/skills
```

When exact Firecrawl endpoint parameters matter, check current docs or use `firecrawl-docs-search` / support docs-search instead of guessing.

## Session-specific API key rule

If the source text or user message includes a session-specific Firecrawl API key, do not save it into memory.

Use this placeholder instead:

```dotenv
FIRECRAWL_API_KEY=fc-YOUR_API_KEY_HERE
```

If a real key was pasted in the conversation:

- treat it as exposed
- redact it
- advise rotating it if there is any chance it was shared publicly
- never repeat the key

---

# Traditional / Local Scraping Framework

Use this when Firecrawl is not the best approach.

Traditional scraping means using local code and libraries such as:

- requests
- httpx
- BeautifulSoup
- lxml
- pandas
- openpyxl
- pdfplumber
- pypdf
- tabula
- camelot
- pytesseract
- Playwright
- Selenium
- json
- xml.etree
- sqlite3
- sqlalchemy
- regex
- pathlib

## General traditional source detection

Before extraction, identify the source type:

- static HTML page
- JavaScript-rendered website
- public API
- private API
- HTML table
- PDF with selectable text
- scanned PDF
- Excel workbook
- CSV file
- JSON file
- XML file
- ZIP archive
- folder of files
- database export
- screenshot/image
- mixed source

Then choose the lightest reliable method.

## For static websites

Use:

- requests or httpx
- BeautifulSoup or lxml

Rules:

- set user-agent
- set timeout
- add retry logic
- handle non-200 responses
- handle redirects
- detect pagination
- handle relative URLs
- normalize links
- avoid excessive requests
- respect robots.txt and terms
- save raw HTML if debugging is useful
- parse tables carefully
- validate extracted fields

## For dynamic websites

First inspect whether the data comes from:

- embedded JSON
- network API calls
- script tags
- XHR/fetch endpoints

Prefer hidden API extraction when lawful and appropriate.

Use Playwright/Selenium only when:

- JavaScript rendering is required
- content appears after interaction
- content needs scrolling
- buttons must be clicked
- forms must be filled
- no usable API is available

Do not use browser automation unnecessarily.

- **Async/Sync Conflict:** When using browser automation (like Playwright `sync_playwright` or Selenium) within modern asynchronous programming environments (e.g., Python's `asyncio`), never run synchronous blocking APIs directly inside an active async event loop. Spawn a separate daemon thread or use native async equivalents to prevent complete execution lockups.

## For APIs

Use requests/httpx.

Handle:

- authentication
- headers
- tokens
- pagination
- cursor-based pagination
- offset-based pagination
- rate limits
- retries
- backoff
- response status codes
- schema variations
- missing keys
- nested data
- empty responses

Validate JSON structure before parsing.

Save sample raw responses when debugging.

- **Domain/Endpoint Migrations:** If a previously known or hardcoded URL returns a 404 Not Found, do not immediately mark the extraction as failed. Implement dynamic mutation fallbacks (e.g., swapping old top-level domains for new ones, or updating API version paths like `/v1/` to `/v2/`) to account for silent server-side migrations before giving up.

## For PDFs

PDF extraction should follow this order:

1. Try direct text extraction.
2. Try table extraction.
3. Try layout-aware extraction.
4. Try coordinate/bounding-box extraction.
5. Use OCR only if the PDF is image-based or text extraction fails.

Rules:

- do not assume all PDFs have the same layout
- detect old vs new layouts if needed
- create separate extraction functions for different layouts
- print sample extracted text during debugging
- log page numbers
- log failed pages
- validate values against visible source samples
- avoid OCR unless necessary
- if OCR is used, mention accuracy limitations
- **Header Detection Trap:** When dynamically detecting table headers, rely strictly on *structural* or *layout* keywords (e.g., "Index", "S.No.", "Period", "Date", "Particulars"). Do NOT use domain-specific data/metric keywords (e.g., "Revenue", "Users", "Price") to identify headers, or the parser will mistakenly identify valid data rows as headers and drop the actual data entirely.
- **Right-most Column Trap:** Do not blindly assume the right-most numeric column in a parsed table represents the target absolute value. It is frequently a derivative metric, such as a Year-over-Year (YoY) growth percentage, a delta, or a ratio.

## For scanned PDFs or images

Use OCR only when necessary.

Rules:

- preprocess image if needed
- handle rotation
- handle low resolution
- handle tables carefully
- validate OCR output more strictly
- never assume OCR is fully accurate
- save OCR text separately if useful
- keep confidence warnings where possible

## For Excel files

Use pandas/openpyxl.

Handle:

- multiple sheets
- hidden sheets if relevant
- merged cells
- blank rows
- title rows
- notes
- footers
- repeated headers
- inconsistent headers
- formulas
- formatted numbers
- date serials
- multiple tables in one sheet

Rules:

- inspect sheet names
- detect header row when needed
- clean columns
- preserve useful data
- remove empty rows/columns
- convert types carefully
- never assume the first row is always the header

## For CSV files

Handle:

- encoding issues
- delimiter detection
- quote characters
- bad lines
- missing headers
- extra columns
- malformed rows
- BOM characters
- line endings

Encoding fallback order:

1. utf-8
2. utf-8-sig
3. cp1252
4. latin1

Rules:

- inspect first rows
- validate column count
- clean columns
- clean text
- convert numeric values carefully

## For JSON files

Handle:

- nested objects
- arrays
- missing keys
- null values
- inconsistent structures
- deeply nested records

Rules:

- inspect schema
- flatten carefully
- preserve important hierarchy when needed
- validate required keys
- avoid losing nested context

## For XML files

Handle:

- namespaces
- repeated tags
- nested elements
- attributes
- missing nodes

Rules:

- parse safely
- preserve useful attributes
- normalize into structured rows when needed
- validate required fields

## For ZIP / folder scraping

Rules:

- list files first
- filter by extension/pattern
- sort files deterministically
- skip unsupported files with logs
- process each file independently
- catch errors per file
- save failed file log
- combine only validated outputs

---

# Configuration Rules

Every reusable scraping script must have a clear `CONFIG` section at the top.

The `CONFIG` should include relevant settings such as:

- `INPUT_URLS`
- `INPUT_FILE`
- `INPUT_FOLDER`
- `OUTPUT_FOLDER`
- `OUTPUT_FILE`
- `RAW_OUTPUT_FILE`
- `CLEAN_OUTPUT_FILE`
- `FAILED_LOG_FILE`
- `VALIDATION_REPORT_FILE`
- `CHECKPOINT_FILE`
- `REQUIRED_FIELDS`
- `OPTIONAL_FIELDS`
- `SELECTORS`
- `EXTRACTION_PATTERNS`
- `API_ENDPOINTS`
- `HEADERS`
- `USER_AGENT`
- `TIMEOUT_SECONDS`
- `MAX_RETRIES`
- `RETRY_BACKOFF_SECONDS`
- `REQUEST_DELAY_SECONDS`
- `RATE_LIMIT`
- `SAVE_RAW`
- `SAVE_INTERMEDIATE`
- `MERGE_REQUIRED`
- `MERGE_KEY`
- `VALIDATION_RULES`
- `TOKEN_CONTEXT_LIMIT`
- `RESERVED_OUTPUT_TOKENS`
- `TOKEN_ESTIMATION_METHOD`
- `USE_FIRECRAWL`
- `FIRECRAWL_MODE`
- `FIRECRAWL_ENDPOINT`
- `FIRECRAWL_API_KEY_ENV_NAME`
- `FIRECRAWL_SAFE_USAGE_LIMIT`
- `FIRECRAWL_USAGE_ESTIMATE`
- `RESUME_FROM_CHECKPOINT`

Do not hide configurable values deep inside code.

---

# Recommended Script Structure

For Python scripts, use this structure:

1. Header/title
2. Imports
3. `CONFIG` section
4. Logging setup
5. Helper functions
6. Token counting functions
7. Firecrawl usage/quota estimation functions
8. Checkpoint functions
9. Source detection functions
10. Extraction functions
11. Cleaning functions
12. Normalization functions
13. Validation functions
14. Merge functions, if needed
15. Saving functions
16. Final summary function
17. `main()`
18. `if __name__ == "__main__": main()`

Recommended helper functions:

- `create_output_folder()`
- `normalize_unicode()`
- `clean_text()`
- `clean_column_names()`
- `clean_numeric()`
- `parse_date_if_needed()`
- `safe_get()`
- `detect_column()`
- `validate_required_fields()`
- `validate_row_count()`
- `validate_missing_values()`
- `validate_duplicates()`
- `validate_data_types()`
- `validate_ranges_if_given()`
- `estimate_tokens()`
- `check_token_budget()`
- `estimate_firecrawl_usage()`
- `check_firecrawl_quota_plan()`
- `chunk_text()`
- `load_checkpoint()`
- `save_checkpoint()`
- `save_raw_output()`
- `save_clean_output()`
- `save_validation_report()`
- `log_failure()`
- `print_summary()`

---

# Data Cleaning Rules

Always clean extracted data before final saving.

General cleaning:

- strip leading/trailing whitespace
- remove hidden characters
- normalize Unicode
- standardize column names
- remove empty rows
- remove empty columns
- remove repeated headers
- clean numeric values
- clean text fields
- remove HTML artifacts
- remove footnote markers when they are not part of data
- remove annotations only if they are noise
- preserve original text when important
- keep raw value columns only if useful for debugging/audit
- avoid destructive cleaning unless requested

Column naming:

- use lowercase snake_case by default
- remove extra spaces
- replace special characters with underscores
- avoid duplicate column names
- keep names meaningful
- do not create confusing names

Numeric cleaning:

- remove commas
- remove currency symbols if needed
- remove percentage signs only after deciding whether to store as percentage or decimal
- remove footnote markers
- handle parentheses for negative numbers if applicable
- handle missing values
- convert safely
- log failed conversions

Date/time cleaning:

- parse dates only if needed
- support multiple formats
- handle timezone if relevant
- do not force date parsing when the field is not a date
- log unparseable dates
- preserve original date string if useful

Text cleaning:

- preserve important capitalization when needed
- remove only unwanted artifacts
- do not destroy names, addresses, IDs, or product titles
- normalize whitespace
- handle newline-heavy web/PDF text
- **Regex Alias Mapping False Positives:** When mapping raw extracted labels to canonical data metrics using regex, ensure patterns are strictly bounded. Avoid overly broad partial-word matches that could conflate distinct categories (e.g., mistaking a "Net" metric for a "Gross" metric because a shared generic keyword is present). Require explicit, exact boundaries.
- **Global Deduplication Trap:** Do not use global URL deduplication across multiple distinct scraping loops if the target source renders sitewide/global navigation links on every paginated route. Scope your deduplication appropriately (e.g., per-category, per-report, or per-time-period) so valid, repeated links relevant to subsequent loops are not accidentally skipped.

---

# Validation Rules

Never save the final output as complete without validation.

Validation should include where relevant:

- number of records
- number of columns/fields
- required fields present
- missing values
- duplicate rows
- duplicate keys
- data type checks
- numeric conversion failures
- date/time parsing failures
- range checks if limits are known
- format checks
- source coverage check
- failed URL/file/page count
- sample head
- sample tail
- final preview
- output path check
- token budget status if LLM processing is involved
- Firecrawl usage estimate if Firecrawl is used
- checkpoint status for large jobs

- **Absolute Numeric Sanity Bounds:** Apply hard upper and lower limits to extracted numeric values based on the expected reality of the domain. This prevents garbled OCR artifacts from being parsed as astronomical values, and prevents decimal ratios (e.g., `8.4%`) from passing as massive absolute totals.
- **Reporting Period Offsets:** Do not map reporting periods (like Fiscal Years, Quarters, or Academic terms) blindly based on the calendar year of publication. Always account for specific monthly or domain-specific offsets (e.g., an annual report released in Q2 often belongs to the *previous* reporting year) to avoid systemic off-by-one errors.

If something looks suspicious:

- print a warning
- show examples
- do not hide it
- do not claim perfect success

---

# Token and Volume Tracking Rules

Every scraping workflow must track token/data size when content may be sent to an LLM, stored in a prompt, summarized, embedded, or used in an agent workflow.

Track:

- number of sources
- raw character count
- raw estimated token count
- cleaned character count
- cleaned estimated token count
- average tokens per source
- maximum tokens in one source
- total tokens prepared for LLM input
- system/developer/user instruction tokens if estimate is possible
- reserved output tokens
- context window if known
- status: `WITHIN TOKEN BUDGET` or `OVER TOKEN BUDGET`

Token estimation rules:

- Use the tokenizer for the target model if available.
- If no tokenizer is available, estimate tokens as characters / 4 for English-like text.
- For mixed-language text or code-heavy content, warn that token estimate is approximate.
- If exact model limit is unknown, report token estimate but say the limit cannot be confirmed.

Default calculation:

```text
context_limit = known model context window
reserved_output_tokens = user-specified or safe default
available_input_tokens = context_limit - reserved_output_tokens
total_input_tokens = instructions + scraped content + examples + code context
```

If `total_input_tokens <= available_input_tokens`:

```text
Status = WITHIN TOKEN BUDGET
```

If `total_input_tokens > available_input_tokens`:

```text
Status = OVER TOKEN BUDGET
```

If over budget:

- do not paste all content blindly
- chunk content
- filter content
- deduplicate content
- extract only required fields
- summarize in stages
- use map-reduce summarization
- save raw content to files
- use retrieval instead of stuffing full content
- preserve citations or source IDs when traceability matters

Always report token status in the final summary for large scraping jobs.

---

# Error Handling Rules

The script must not fail silently.

Handle these errors clearly:

- missing input file
- missing folder
- bad path
- invalid URL
- failed request
- timeout
- connection error
- HTTP error
- API error
- invalid JSON
- empty response
- missing expected fields
- missing expected table
- missing expected columns
- layout change
- encoding error
- permission error
- file locked
- invalid numeric conversion
- invalid date parsing
- duplicate output file
- failed save
- token budget overflow
- Firecrawl API key missing
- Firecrawl auth failure
- Firecrawl quota exhaustion
- Firecrawl token/credit exhaustion
- Firecrawl account limit
- Firecrawl rate limit
- Firecrawl job failure
- Firecrawl unexpected output

For every failed item, log:

- source identifier
- error type
- error message
- whether skipped/retried/stopped
- suggested fix if known

Do not claim success if failures occurred.

Report partial success honestly.

---

# Logging Rules

Print useful progress logs.

Logs should include:

- script started
- selected approach: Firecrawl, traditional/local, or hybrid
- reason for selected approach
- input source count
- current source being processed
- extraction status
- rows/items extracted
- Firecrawl usage estimate if Firecrawl is used
- Firecrawl quota warning if relevant
- cleaning status
- validation status
- token budget status
- checkpoint status
- output saved path
- final summary

Avoid excessive noisy logs.

But include enough to debug the full process.

---

# Output Rules

Never overwrite raw/source data.

Always save outputs clearly.

Possible output files:

- raw extraction output
- cleaned output
- intermediate output
- final output
- failed items log
- validation report
- token report
- Firecrawl usage report
- checkpoint file

Use the user’s requested format:

- CSV
- Excel
- JSON
- Markdown
- TXT
- SQLite
- database
- Parquet
- HTML
- PDF
- any requested format

If the user does not specify:

- choose CSV for simple structured data
- choose Excel for user-friendly tabular deliverables
- choose JSON for nested structured data
- choose Markdown for clean web/page text
- choose SQLite/Parquet for larger datasets

Always print the final output path.

---

# Merging Rules

Only merge when requested or clearly necessary.

Before merging:

- inspect both datasets
- identify the correct merge key
- clean merge keys on both sides
- check duplicates in merge keys
- check unmatched records
- check row counts
- avoid accidental row multiplication
- decide what to do with conflicting columns
- preserve the main dataset row count unless instructed otherwise

After merging:

- print match rate
- print unmatched count
- print final row count
- remove unnecessary helper columns
- save as a new output file
- never overwrite the original unless explicitly requested

- **Source Priority Over Averaging:** When aggregating data from multiple scraped sources for the exact same entity and time period (e.g., an official audited report vs. a summary presentation deck), **do not average (`mean()`) the values**. Averaging conflicting numbers generates fabricated, artificial data. Instead, establish a strict source-priority hierarchy and select the single most authoritative value.

---

# Strict Mistakes To Avoid

Never do the following:

1. Do not hardcode project-specific values unless the user provides them.
2. Do not assume one fixed website layout.
3. Do not assume one fixed PDF layout.
4. Do not assume one fixed column name.
5. Do not assume one fixed field name.
6. Do not assume one fixed date/time format.
7. Do not assume one fixed unit.
8. Do not assume all pages/files are identical.
9. Do not ignore pagination.
10. Do not ignore failed files.
11. Do not ignore failed URLs.
12. Do not ignore failed pages.
13. Do not silently convert bad values to blank.
14. Do not silently drop rows.
15. Do not silently drop columns.
16. Do not overwrite original data.
17. Do not save unvalidated final output.
18. Do not accidentally create duplicate rows.
19. Do not include useless helper/debug columns in final output unless requested.
20. Do not scrape aggressively.
21. Do not ignore robots.txt, terms, rate limits, or legal/ethical restrictions.
22. Do not use browser automation when simple requests/API/Firecrawl scrape is enough.
23. Do not use OCR unless necessary.
24. Do not paste or hardcode API keys.
25. Do not put exposed secrets into memory.
26. Do not send private files to external services without user approval.
27. Do not exceed token limits without warning.
28. Do not provide partial code when the user requested full code.
29. Do not hide assumptions.
30. Do not claim perfect success unless validation confirms it.
31. Do not use Firecrawl only because it exists; use it when appropriate.
32. Do not avoid Firecrawl when it is clearly the better option.
33. Do not use traditional scraping when Firecrawl would handle public dynamic pages more reliably.
34. Do not use Firecrawl for private/local files unless the user approves and it is appropriate.
35. Do not expose real `FIRECRAWL_API_KEY` values in final output.
36. Do not build a multi-key Firecrawl rotation system unless the user explicitly asks for it.
37. Do not use multiple Firecrawl API keys by default.
38. Use one active `FIRECRAWL_API_KEY` at a time.
39. Estimate Firecrawl usage before large jobs.
40. Ask the user for a new key only if the job may exceed around 1000 websites/pages/requests/credits or the current key becomes exhausted.
41. Do not waste quota by re-scraping already completed pages when a checkpoint exists.
42. Do not average conflicting numeric values from different sources; use strict source-priority sorting.
43. Do not use broad domain-specific data keywords for table header detection; use purely structural keywords to avoid dropping valid data rows.
44. Do not blindly assume the right-most column in a table is the absolute value (it could be a derivative metric like a growth percentage).
45. Do not run synchronous browser automation directly inside an active asynchronous event loop.
46. Do not use overly broad regex aliases that cause false-positive matches across distinct data categories.
47. Do not use global URL deduplication across distinct scraping loops if the site repeats navigation links on every page.
48. Do not allow astronomical/impossible values to pass into the final dataset; always implement domain-specific absolute minimum and maximum bounds.
49. Do not map dates or reporting periods blindly based on calendar years; always account for domain-specific offsets (e.g., fiscal year publication lag).

---

# When The User Reports An Error

If the user provides an error message:

1. Identify the exact cause.
2. Explain the cause briefly and clearly.
3. Preserve the existing framework.
4. Fix the code.
5. Add validation or fallback to prevent the same error.
6. Rewrite the full corrected code unless the user asks for a patch only.
7. Do not remove important previous functionality.
8. Preserve user-provided paths, names, outputs, and constraints.
9. Print what changed.
10. Add checkpointing if the error happened during a large scrape.
11. If the error is Firecrawl quota/auth-related, follow the one-key replacement rule.

---

# When The User Provides Sample Data Or Screenshots

Use the sample to infer:

- correct structure
- correct fields
- correct values
- correct output format
- wrong previous extraction
- needed cleaning rules
- edge cases
- source layout
- validation expectations

If the sample contradicts the script output:

- trust the sample
- fix the extraction/cleaning logic
- add validation to catch the mismatch in the future

---

# Security and Ethical Scraping Rules

Always follow safe scraping practices.

Rules:

- respect robots.txt where applicable
- respect website terms of service
- respect rate limits
- do not bypass paywalls
- do not bypass CAPTCHAs
- do not bypass authentication
- do not scrape private data without authorization
- do not scrape sensitive personal data without permission
- prefer official APIs/downloads when available
- use polite delays
- use retries with backoff
- identify the script responsibly if appropriate
- protect API keys
- redact secrets
- do not commit `.env` files
- do not store secrets in memory
- do not print secrets
- use one active Firecrawl key at a time unless the user explicitly requests otherwise

If the user asks for something unsafe:

- refuse the unsafe part
- offer a safe alternative

---

# Final Response Style To The User

When responding:

- be direct
- be practical
- provide full code when code is requested
- provide the complete reusable framework when framework is requested
- state the selected approach and why
- mention what can be customized
- mention where output will be saved
- mention token estimate and whether it is over budget when relevant
- mention Firecrawl usage estimate and quota status when Firecrawl is used
- mention important warnings
- avoid vague instructions
- avoid unnecessary theory
- do not overcomplicate unless the task requires detail

When giving code:

- make it copy-paste-ready
- include imports
- include config
- include helper functions
- include validation
- include error handling
- include saving
- include checkpointing for large jobs
- include token tracking when LLM processing is involved
- include Firecrawl usage estimation when Firecrawl is used
- include final summary

When giving a Firecrawl solution:

- choose Path A, B, C, D, or E
- explain the path briefly
- use placeholders for secrets
- use one active `FIRECRAWL_API_KEY` at a time
- estimate usage before large jobs
- ask for a new key only when the current key is exhausted or the expected job may exceed around 1000 websites/pages/requests/credits
- check docs when exact parameters matter
- use Firecrawl support/docs-search when needed

---

# Final Master Rule

The scraping framework must always remain:

- customizable
- approach-aware
- Firecrawl-ready when appropriate
- traditional/local-ready when appropriate
- one-key-at-a-time for Firecrawl by default
- Firecrawl-quota-aware
- token-aware
- validated
- checkpointed for large jobs
- error-safe
- repeatable
- clean-output focused
- secure
- ethical
- fully documented enough for reuse

Only project-specific inputs should change.

The framework itself must not be weakened.