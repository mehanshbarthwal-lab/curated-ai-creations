# Universal Agent Skills

An open source library of battle tested, production grade agent skills and tool protocols designed to operate seamlessly across Claude Code, Cursor IDE, Google Antigravity, ChatGPT, and Local LLMs.

---

## Overview

Modern AI agents often produce generic prompt completions, unwanted code abstractions, verbose conversational filler, and hallucinated library methods. This repository provides specialized, hardened skill protocols that enforce senior engineering standards, reliable web intelligence, elegant visual design, and epistemic verification.

Every skill in this collection follows the Universal Agent Skill specification, ensuring compatibility across:

* Anthropic Claude Code and Claude Desktop
* Cursor IDE
* Google Antigravity and Gemini CLI
* OpenAI ChatGPT Custom GPTs and Codex
* OpenClaw and Windsurf
* Ollama, LangChain, and Local Models

---

## Authorship and Attribution

This repository values open source credit and technical honesty. Content is transparently cataloged into original engineering by Mehansh Barthwal and credited community upstreams.

### Original Engineering by Mehansh Barthwal
* **Zero Hallucination Coder**: Disciplined Discuss, Map, Decompose, Execute, Verify loop eliminating fabricated APIs. Officially merged into the upstream community repository `alirezarezvani/claude-skills` (Pull Request #870).
* **Universal Scraping Architect**: Multi mode data extraction framework balancing Firecrawl, Python, and hybrid pipelines with token budgeting and state checkpoints.
* **Pain Point Miner**: Consumer problem extraction system mining and verifying real complaints from forums and review threads without synthetic data.
* **ArXivist**: Multi agent pipeline translating scientific research papers into executable codebases.
* **Loop Until Done**: Self correcting rubric loop rewriting drafts until objective criteria are cleared.
* **JD to Job**: Application tailoring engine translating job specifications into targeted qualifications.
* **Resume Unrejectable**: Four stage recruitment pipeline simulating ATS parsers, keyword matrices, and XYZ rephrasing.
* **Locality Delivery Scraper**: End to end scraping playbook for locality delivery ecosystems.
* **IPYNB Editor**: Programmatic Jupyter Notebook cell inspection and patching utility preserving JSON schema integrity.
* **Markdown Converter Router**: Dynamic architectural router directing documents between AnyDoc and MarkItDown.

### Adapted and Community Upstreams
* **Humanizer**: Adapted from Siqi Chen (MIT License). Cleans AI writing patterns using Wikipedia style guidelines.
* **Stop Slop**: Adapted from Hardik Pandya (MIT License). Eliminates predictable filler during the initial generation pass.
* **Ponytail**: Adapted from DietrichGebert (MIT License). Lazy senior developer minimalism suite auditing overengineering.
* **Graphify**: Adapted from Safi Shamsi (Apache 2.0 / MIT). Codebase knowledge graph generator producing relational maps and Obsidian vaults.
* **GSD Core**: Adapted from Open GSD (MIT License). Spec driven autonomous development framework featuring phased execution gates.
* **Agent Reach**: Adapted from Agent Eyes (MIT License). Multi platform research CLI and Model Context Protocol server for fifteen networks.
* **Agent Video**: Adapted from Bradley Bonanno (MIT License). Media intelligence tool combining yt dlp, FFmpeg, and Whisper.
* **Frontend Slides**: Adapted from Zara Zhang (MIT License). Web presentation builder and PowerPoint to HTML slide converter.
* **Ralph**: Adapted from snarktank (MIT License). Autonomous PRD conversion and implementation system.
* **SkillOpt**: Adapted from Microsoft Corporation (MIT License). Agent self optimization and offline memory consolidation loop.
* **MarkItDown**: Upstream utility by Microsoft Corporation (MIT License). Python library for document extraction.

Refer to `ATTRIBUTIONS.md` for full maintainer credits, original repository URLs, and individual license texts.

---

## Core Skill Suites

### 1. Autonomous Coding and Software Engineering
* `zero-hallucination-coder`: Disciplined coding loop enforcing full reasoning before implementation.
* `karpathy-guidelines`: Senior developer posture emphasizing minimal surgical diffs and verified assumptions.
* `ponytail`: Senior developer minimalism prioritizing standard libraries and eliminating premature abstractions.
* `gsd-core`: Complete spec driven development system featuring modular phases for planning, execution, and verification.
* `arxivist`: Multi agent research paper implementation pipeline.
* `ipynb-editor`: Programmatic notebook cell manipulation without JSON schema breakage.

### 2. High End UI and Visual Design
* `taste-skill`: Anti slop frontend design system enforcing intentional layouts, typography balance, and elevated components.
* `taste-skill/brandkit`: Visual identity guidelines, logo concepting boards, and luxury styling.
* `taste-skill/gpt-taste`: Advanced GSAP motion engineering, scroll pinning, and wide editorial typography.
* `taste-skill/minimalist-ui`: Warm monochrome aesthetics, typographic contrast, and flat bento layouts.
* `frontend-slides`: Interactive web presentation builder converting presentation decks to responsive HTML.

### 3. Web Intelligence and Research
* `agent-reach`: Internet research, multi platform scraping, and social intelligence across fifteen platforms.
* `pain-point-miner`: Voice of customer complaint mining system extracting authentic market friction points.
* `universal-scraping-architect`: Resilient data harvesting pipeline integrating Firecrawl, Playwright, and BeautifulSoup.
* `locality-delivery-scraper`: Structured restaurant data and locality market analysis.

### 4. Writing, Style, and Human Voice
* `humanizer`: Strips predictable tells, promotional adjectives, and formulaic transitions from drafts.
* `stop-slop`: Compact prompt rule set preventing robotic cadence before text lands on the page.
* `ai-watermarks-remover`: Technical zero width character stripping combined with conversational rewriting.

### 5. Media, Orchestration, and Autonomous Loops
* `loop-until-done`: Iterative quality rubric loop refining outputs until passing explicit bars.
* `markdown-converter`: Format aware document extractor routing across office, PDF, and archive formats.
* `agent-video`: Video analysis tool downloading media, extracting keyframes, and synchronizing transcripts.
* `claude-skills-llm-council`: Multi agent debate protocol synthesizing balanced decisions from five advisors.
* `truth-prompt`: Epistemic honesty framework strictly distinguishing verified facts from assumptions.
* `graphify`: Codebase relationship graph constructor for structural intelligence.

---

## Quick Start and Installation

### Anthropic Claude Code
Place skills into your project root or Claude configuration directory:
```bash
# Clone the repository
git clone https://github.com/mehanshbarthwal-lab/universal-agent-skills.git

# Copy desired skills into your project
cp -r universal-agent-skills/skills/zero-hallucination-coder .claude/skills/
```

### Cursor IDE
Add skill instructions to your project rules:
```bash
# Add skill instructions into .cursorrules
cat skills/zero-hallucination-coder/SKILL.md >> .cursorrules
```

### Google Antigravity
Copy skills into your Antigravity skills repository:
```bash
cp -r skills/zero-hallucination-coder "F:/Agent Skills/zero-hallucination-coder"
```

### ChatGPT Custom GPTs
Paste the contents of any `SKILL.md` directly into your Custom GPT Instructions field.

### Local LLMs via Ollama
Include the skill specification as the system prompt in your Modelfile:
```dockerfile
FROM llama3.3:70b
SYSTEM """
$(cat skills/zero-hallucination-coder/SKILL.md)
"""
```

Refer to `adapters/` for detailed setup guides across each supported runtime environment.

---

## Repository Structure

```
├── skills/                     # Curated skill suites and modular instructions
│   ├── zero-hallucination-coder/
│   ├── universal-scraping-architect/
│   ├── pain-point-miner/
│   ├── taste-skill/
│   └── ...
├── adapters/                   # Setup guides for Claude, Cursor, Antigravity, Ollama
│   ├── claude-code.md
│   ├── cursor.md
│   ├── antigravity.md
│   └── local-llms-ollama.md
├── src/                        # Interactive showcase web application
│   ├── routes/
│   ├── components/
│   ├── data/collection.ts      # Catalog registry and metadata
│   └── styles.css
├── ATTRIBUTIONS.md             # Complete upstream credits and licenses
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
└── README.md                   # Project landing page
```

---

## Running the Showcase Website

The interactive web portal allows developers to browse skills, review triggers, copy prompts, and inspect upstream attributions.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```

---

## Contributing

Contributions are warmly welcomed. Please review `CONTRIBUTING.md` for guidelines on structure, trigger declarations, validation tests, and attribution standards.

---

## License

This project is open source under the MIT License. Upstream tools and adapted packages retain their respective licenses as detailed in `ATTRIBUTIONS.md`.

---

## Connected Links

* GitHub Repository: `https://github.com/mehanshbarthwal-lab/universal-agent-skills`
* Portfolio: `https://mehanshlabs.qzz.io/`
