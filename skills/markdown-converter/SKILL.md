---
name: markdown-converter
description: >
  Use this skill whenever the user wants to convert any file (Word, PowerPoint, Excel,
  OpenDocument, RTF, EPUB, PDF, CSV, image, audio, HTML, JSON, XML, ZIP) or URL into clean
  Markdown so Claude can read it natively. Trigger on: "convert this to markdown", "read this
  PDF", "extract text from", "convert for Claude", "clean up this file", "summarise this
  document", "read this file", or any upload of a binary file the user wants Claude to
  process. Also trigger when setting up or configuring the MarkItDown MCP server in Claude
  Desktop. This skill routes each file to the best converter for its format rather than using
  one tool for everything: anydoc (Rust, fast, higher quality) handles office documents, RTF,
  EPUB, CSV, and text-based PDFs; markitdown (Microsoft, Python) handles the formats anydoc
  cannot: scanned/image-only PDFs needing OCR, audio, JSON, XML, ZIP archives, and URLs.
  Always run the dependency check for whichever tool the file needs before converting.
---

# Markdown Converter Skill (anydoc + markitdown, routed)

Converts files and URLs to clean Markdown by routing each one to whichever of the two
underlying tools actually produces the better result for that format, rather than running
everything through a single converter.

**Why routed instead of just picking one:** anydoc (Firecrawl, Rust) is faster and scores
higher on quality across every office format it supports, per anydoc's own published
benchmark against six other converters including markitdown (anydoc 81/100 overall vs
markitdown 64/100, and anydoc wins every directly-compared format). But anydoc only handles
14 formats and does not do OCR, so it fails outright on scanned/image-only PDFs, and it has
no audio, JSON, XML, or ZIP support. markitdown covers those. Using both, routed correctly,
gets the best available output for every file type instead of a compromise.

---

## Phase 0 — Routing table (check this first, always)

Look at the file extension (or ask the user what kind of file it is if ambiguous) and route
accordingly. Do not run both tools on the same file "just to compare" unless the user asks.

| File type | Route to | Why |
|---|---|---|
| `.doc`, `.docx`, `.docm` | **anydoc** | Higher score, ~30x faster |
| `.ppt`, `.pps`, `.pot`, `.pptx`, `.pptm`, `.ppsx`, `.ppsm` | **anydoc** | Higher score, ~30x faster |
| `.xls`, `.xlsx`, `.xlsm`, `.xlsb` | **anydoc** | Higher score, ~30x faster |
| `.odt`, `.ods`, `.odp` | **anydoc** | markitdown doesn't support OpenDocument at all |
| `.rtf` | **anydoc** | markitdown doesn't support RTF at all |
| `.epub` | **anydoc** | Higher score |
| `.csv` | **anydoc** | Higher score |
| `.pdf` — text-based (most PDFs) | **anydoc** | Higher score, no OCR needed for these |
| `.pdf` — scanned / image-only | **markitdown** | anydoc has no OCR and will error `Unsupported`; markitdown can attempt OCR |
| `.jpg`, `.png`, `.gif`, `.webp` (image files) | **markitdown** | anydoc doesn't handle standalone images |
| `.mp3`, `.wav` (audio) | **markitdown** | anydoc has no audio support |
| `.html` | **markitdown** | anydoc doesn't take raw HTML |
| `.json`, `.xml` | **markitdown** | anydoc doesn't support these |
| `.zip` | **markitdown** | anydoc doesn't process archives |
| URL (web page) | **markitdown** | anydoc is a document converter, not a fetcher |

**If a PDF's type is unknown:** try anydoc first since it's near-instant. If it exits with
code 1 and the stderr says `Unsupported` (image-only PDF), fall back to markitdown for OCR.
This fallback logic is worth automating — see Phase 1.

---

## Phase 1 — Dependency check (run once per session, only for the tool(s) you'll actually use)

### anydoc (no install needed, npx handles it)

```bash
node --version   # confirm Node 20+; if missing or older, anydoc CLI won't run
npx -y @firecrawl/anydoc --help 2>&1 | head -5
```

First run downloads the prebuilt binary for the platform automatically. No further setup.
If the user will be converting many files in one session, install it globally once instead
of re-resolving npx each time:

```bash
npm install -g @firecrawl/anydoc && which anydoc
```

### markitdown (only if this session needs it — scanned PDFs, audio, JSON/XML, ZIP, or URLs)

```bash
python3 --version 2>&1 || python --version 2>&1
pip install 'markitdown[all]' markitdown-mcp --break-system-packages 2>&1 \
  || pip3 install 'markitdown[all]' markitdown-mcp --break-system-packages 2>&1 \
  || pip install 'markitdown[all]' markitdown-mcp 2>&1
which markitdown && which markitdown-mcp && echo "INSTALL OK"
```

If `INSTALL OK` doesn't print, tell the user and suggest running that pip command manually.

---

## Phase 2 — Converting with anydoc

### Getting the file path

If the user uploaded a file, it's at `/mnt/user-data/uploads/<filename>`:

```bash
ls /mnt/user-data/uploads/
```

### Running the conversion

```bash
npx -y @firecrawl/anydoc /mnt/user-data/uploads/<filename> 2>&1
# or straight to a file:
npx -y @firecrawl/anydoc /mnt/user-data/uploads/<filename> -o /mnt/user-data/outputs/<filename>.md 2>&1
```

For CSV read from stdin (no extension to detect from), name the format explicitly:

```bash
npx -y @firecrawl/anydoc - --format csv < data.csv > out.md
```

Exit codes: `0` success, `1` couldn't convert (check stderr for `Unsupported` — likely a
scanned PDF, fall back to markitdown per Phase 0), `2` usage error.

Display short output inline; for anything over ~300 lines, write to
`/mnt/user-data/outputs/` and use `present_files`.

### Supported formats (anydoc)

| Format | Extensions |
|---|---|
| Word | `.doc`, `.docx`, `.docm` |
| PowerPoint | `.ppt`, `.pps`, `.pot`, `.pptx`, `.pptm`, `.ppsx`, `.ppsm` |
| Excel | `.xls`, `.xlsx`, `.xlsm`, `.xlsb` |
| OpenDocument | `.odt`, `.ods`, `.odp` |
| RTF | `.rtf` |
| EPUB | `.epub` |
| CSV | `.csv` |
| PDF | `.pdf` (text-based only — no OCR) |

---

## Phase 3 — Converting with markitdown

### Running the conversion

```bash
markitdown /mnt/user-data/uploads/<filename> 2>&1
# or
markitdown https://example.com/some-page 2>&1
```

For long output, redirect to a file first:

```bash
markitdown /mnt/user-data/uploads/<filename> > /mnt/user-data/outputs/<filename>.md 2>&1
```

Then `present_files`.

### Supported formats (markitdown, for the cases anydoc doesn't cover)

| Format | Notes |
|---|---|
| Scanned/image PDF | Attempts OCR — anydoc cannot do this at all |
| Images (`.jpg`, `.png`, `.gif`, `.webp`) | Extracts embedded text / alt text |
| Audio (`.mp3`, `.wav`) | Transcribes via SpeechRecognition |
| HTML | Strips tags, keeps structure |
| JSON / XML | Converts to readable Markdown |
| ZIP | Processes contained files recursively |
| URLs | Fetches and converts any web page |

### Caveats to mention if relevant

- Even markitdown's OCR on scanned PDFs is limited — pure image scans with poor quality
  scans still produce thin output. If the user needs reliable OCR at scale, Firecrawl's
  hosted Parse API (which anydoc's own docs point to) is the better option, but that's an
  external paid service, not something to reach for by default.
- The markitdown MCP server (`markitdown-mcp`) is separate from the CLI — see Phase 4.

---

## Phase 4 — Set up the MarkItDown MCP server in Claude Desktop (unchanged from before)

This lets Claude Desktop call `convert_to_markdown` itself automatically. anydoc doesn't
currently ship an MCP server, only a CLI/library, so this step still applies to markitdown
only.

### Step 1: Find the MCP binary path

```bash
which markitdown-mcp
```

### Step 2: Locate and open the config file

- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

In Claude Desktop: **Settings → Developer → Edit Config**. If the title bar says
`config.json` and not `claude_desktop_config.json`, close without saving and try again.

### Step 3: Determine which case applies

**Case A — file is empty or just `{}`:**
```json
{
  "mcpServers": {
    "markitdown": {
      "command": "markitdown-mcp"
    }
  }
}
```

**Case B — file has content but no `mcpServers` key:** insert immediately after the opening
`{`, with a trailing comma:
```json
  "mcpServers": {
    "markitdown": {
      "command": "markitdown-mcp"
    }
  },
```

**Case C — file already has `mcpServers`:** add the `markitdown` entry inside the existing
braces, comma-separated from others:
```json
"mcpServers": {
  "existing-server": { "command": "..." },
  "markitdown": {
    "command": "markitdown-mcp"
  }
}
```

### Step 4: Common mistakes

- Missing comma between server entries, or after `mcpServers` if other keys follow it.
- Wrong command path — if the tool icon doesn't appear after restart, run
  `which markitdown-mcp` and use the full absolute path as `"command"`.

### Step 5: Fully quit and reopen Claude Desktop

Not just close the window, quit the app completely.

### Step 6: Confirm

Look for the tools icon in the message bar. It should list `convert_to_markdown`.

### Docker fallback

```json
{
  "mcpServers": {
    "markitdown": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "markitdown-mcp:latest"]
    }
  }
}
```
Build once: `docker build -t markitdown-mcp:latest .` (needs Docker Desktop).

---

## Quick reference

| Task | Command |
|---|---|
| Convert office doc / PDF / RTF / EPUB / CSV | `npx -y @firecrawl/anydoc file.ext > file.md` |
| Convert scanned PDF / audio / JSON / XML / ZIP / URL | `markitdown file.ext > file.md` |
| Install anydoc globally | `npm install -g @firecrawl/anydoc` |
| Install markitdown | `pip install 'markitdown[all]' markitdown-mcp --break-system-packages` |
| Find MCP binary path | `which markitdown-mcp` |
| Config file (Mac) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Config file (Win) | `%APPDATA%\Claude\claude_desktop_config.json` |

Sources: github.com/firecrawl/anydoc, github.com/microsoft/markitdown
