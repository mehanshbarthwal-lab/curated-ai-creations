# Scraping Discipline Reference

This reference folds in the general-purpose scraping/extraction discipline (approach selection, validation, checkpointing, error handling, security) so that any agent using **pain-point-miner** in isolation — without also having a separate general scraping skill loaded — still gets this protection. It's adapted from a broader universal scraping framework down to what's relevant for sourcing and verifying real user complaints.

Read this after Step 0 of SKILL.md, before starting Step 2 (Fetch), on any job that involves more than a handful of candidate URLs — small ad-hoc lookups don't need the full ceremony below, but anything approaching a "batch" (10+ candidates, or a recurring/scheduled job) does.

---

## Choosing an extraction approach

Before fetching anything, decide which approach fits:

1. **Browser-based live fetch** (an MCP browser tool, Playwright, or similar) — the default for this skill's use case, since the target platforms (Reddit, Quora, YouTube comments, Amazon/app-store reviews) actively block plain HTTP requests and login-wall or CAPTCHA anything that looks automated. Reads what's already rendered on screen, which sidesteps most anti-bot defenses without needing to defeat them.
2. **Firecrawl or a similar managed scraping API**, if the user has one configured and prefers it — useful for bulk crawling/mapping a site's structure, or converting a page to clean markdown at scale. Treat it as an alternative front-end to the same "fetch" stage, not a replacement for Steps 3-5.
3. **Official APIs where they exist** (e.g. a platform's own search/read API) — prefer this over scraping *anything* when available and sufficient, since it's more stable and doesn't carry anti-bot risk at all.

Don't reach for heavier tooling than the job needs — a single known URL just needs one fetch call, not a crawl job. State which approach you're using and why, briefly, rather than silently picking one.

## Checkpointing for larger batches

For any batch large enough that losing progress mid-run would be painful (roughly: more than ~15-20 candidates, or anything running unattended):

- Write a checkpoint (a simple JSON or CSV of "already processed" candidate URLs, with status: accepted / rejected / pending) after each candidate, not just at the end.
- On restart, load the checkpoint and skip anything already processed rather than re-fetching or re-judging it.
- Never let a checkpoint silently grow stale — if the live spreadsheet (Step 1 of SKILL.md) shows different content than the checkpoint expects, the spreadsheet wins and the checkpoint should be treated as suspect.

## Validation rigor before writing anything

Beyond the dedup and quote-verification already required in Step 4 of SKILL.md, apply these general checks to the batch as a whole before appending:

- Row count sanity: does the number of new entries look plausible given the search effort, or does a huge or tiny yield suggest something went wrong upstream (e.g. a broad query pulling in noise, or a too-narrow query missing real matches)?
- No duplicate Source Links *within the new batch itself*, not just against the existing file — it's easy to independently find the same post twice via different search queries.
- Every required column (per the user's Step 0 spec) is actually populated — no silently blank fields passed through as "just leave it empty for now."
- Spot-check a sample of the batch's exact-wording fields against the actually-fetched page text one more time before the final write, as a last safety net.

If anything looks off, say so plainly rather than smoothing it over. Don't claim a clean batch if validation found issues — report what passed, what didn't, and why.

## Error handling

Handle these without failing silently or guessing past them:

- Dead/deleted/[removed] post — reject the candidate, log why, move to the next one.
- CAPTCHA or login wall on a given platform — don't try to defeat it; flag that platform as blocked for this session and continue with other approved platforms, then tell the user which platform got skipped and why.
- Rate limiting — slow down and retry with backoff rather than hammering the source.
- `PermissionError` / file-locked on the spreadsheet — stop, ask the user to close the file, don't attempt a workaround write.
- Unexpected page layout (platform redesigned their page) — don't guess at where the content moved; re-read the rendered text fresh rather than relying on a previously-known DOM structure or assumed text position.
- Any tool call that fails outright — log it as a failure for that candidate, don't silently drop it from the count without mentioning it.

## Security and ethics

- Respect robots.txt and platform terms of service; don't bypass paywalls, CAPTCHAs, or authentication.
- Don't scrape private or authenticated content.
- Use polite pacing — don't hammer a source with rapid-fire requests.
- Never hardcode or print API keys (Firecrawl or otherwise) in code, logs, or final output — use environment variables, and redact any key the user pastes into the conversation.
- If the user asks for something that crosses one of these lines (e.g. "just get past the CAPTCHA somehow"), decline that specific part and offer the compliant alternative (a different approved platform, an official API, asking the user to fetch it manually) rather than refusing the whole task.

## Extended "mistakes to avoid" list

In addition to the mistakes already listed at the end of SKILL.md, these general scraping mistakes apply:

- Assuming one fixed page layout for a platform — layouts change and vary by post type; re-read rendered text rather than relying on cached assumptions about structure.
- Ignoring pagination when a search or listing has more results than the first page shows.
- Silently dropping a candidate instead of logging why it was rejected.
- Silently converting a messy/ambiguous field to blank instead of flagging it.
- Scraping aggressively — no need to fetch faster than a human clicking through pages would.
- Using browser automation when a simple direct fetch would already work (adds unnecessary fragility/slowness).
- Providing partial code or a partial batch when the user asked for the full thing — say plainly if something is incomplete rather than presenting it as done.
- Averaging or blending conflicting details about the same real-world post from two different sources — if two fetches of related content disagree, trust the one you fetched most recently/directly, and note the discrepancy rather than splitting the difference.
