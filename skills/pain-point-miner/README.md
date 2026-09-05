# Pain Point Miner

A Claude Skill for researchers, PMs, and founders who want to build a **real, source-verified database of customer pain points** — pulled from Reddit, Quora, YouTube comments, app store reviews, or any forum where people actually complain about problems — instead of hand-collecting them one by one or letting an LLM guess at what customers might say.

## The problem this solves

Anyone who's tried to do this manually or with a naive scraper hits the same wall of failures, repeatedly:

- Scrapers get blocked by CAPTCHAs and login walls (Reddit, Quora, Amazon).
- Search snippets look like real posts but turn out to be deleted or edited.
- LLMs asked to "find complaints about X" will happily fabricate plausible-sounding quotes and URLs.
- Spreadsheet IDs get duplicated or renumbered when entries are added across multiple sessions.
- Off-topic content (nostalgia, general opinion, pricing gripes) pollutes what's supposed to be a clean set of genuine problem reports.

This skill encodes a workflow that avoids all of the above by keeping fetching, extraction, validation, and writing as separate stages, always treating the live spreadsheet as ground truth, and never trusting a quote or URL that hasn't been independently opened and read. It also bundles its own general scraping discipline (approach selection, checkpointing, error handling, security/ethics) as `references/scraping-discipline.md`, so it's self-contained for any agent using it without a separate general-purpose scraping skill installed.

## Who it's for

- Market/product researchers building a "voice of customer" database
- Founders doing pain-point discovery before building a product
- Anyone maintaining a growing spreadsheet of verified real-world complaints for a specific niche (any country, any industry, any platform)

## How to use it

This is a [Claude Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills) — drop `SKILL.md` into a Claude project's skills, install the packaged `.skill` file, or hand the raw markdown to any AI agent capable of following instructions and running Python. It works both with a browser-based AI assistant (fetch/verify happens through a browser tool, writes get handed back as a file) and with a local coding agent that has direct filesystem access (it can run the whole pipeline end to end against your actual file).

Nothing in the skill is hardcoded to a specific product category, country, or column layout — Step 0 walks through defining your own ID scheme, columns, platforms, and inclusion criteria before anything is fetched or written.

## License

MIT — adapt freely for your own research workflow.
