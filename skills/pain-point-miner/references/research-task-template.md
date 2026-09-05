# Template: Research Task Instruction (generalized from a session that worked)

Your task is to bring the [dataset] to exactly [N] total valid entries, meaning
you need to find approximately [X] genuinely new entries from the current
number in the sheet. However, the number [N] is a target, NOT a reason to
lower the quality standard. If fewer than [X] genuinely valid entries can be
found after proper research, you must report the shortfall honestly rather
than inventing, stretching, paraphrasing, or adding weak entries.

MOST IMPORTANT RULE

DO NOT immediately edit or fill the [dataset].

First, independently research the missing entries and prepare a complete
verification report containing every proposed new entry, so that I can
review and verify them before anything is written into the [dataset].

I want to see all proposed entries in detail first.

Only after I explicitly approve the candidates should you modify the
[dataset].

1. USE THE EXISTING [DATASET] AS THE SOURCE OF TRUTH

Read the entire [dataset] carefully before doing anything. Understand: the
existing columns/fields, the existing entry format, the terminology used,
the categories, the type of [entries] already included, the level of
specificity used in the existing entries, the types of sources being
accepted, the exact wording style, the existing source links, every existing
[subject field], every existing [verbatim/quote field].

You must treat the existing [dataset] as the baseline. Do NOT assume
something is new simply because you found it through a different search
query.

2. STRICT NO-DUPLICATION RULE

There must be zero duplicates. Before accepting ANY candidate, compare it
against the entire existing [dataset]. Perform deduplication at multiple
levels:

A. Source/thread duplication — extract the unique post/thread/page ID
   wherever possible and compare against every existing source link. If the
   same source already exists, do NOT use it again, even if you found a
   different comment/section on that same page.
B. Exact wording duplication — compare the proposed verbatim field against
   every existing verbatim field. Reject exact duplicates.
C. Near-duplicate duplication — do not merely check exact string equality.
   Reject entries describing essentially the same [underlying thing] using
   slightly different wording.
D. Same-experience duplication — if two sources describe the same underlying
   [experience/complaint/data point], prefer the stronger source and reject
   the other. The goal is [X] genuinely distinct observations, not [X]
   different URLs.

3. SEARCH FOR COMPLETELY NEW ENTRIES

Actually research the web and find new sources. Do NOT: reuse entries
already present, rewrite or paraphrase existing entries, split one entry
into multiple, take another sentence from an already-used source, recycle
previously rejected candidates, manufacture entries because of the target,
generate plausible-sounding entries from general knowledge. Every new entry
must correspond to a real piece of content you actually found and verified.
Search broadly for genuinely new material, but remain within the
subject/category framework of the existing [dataset].

4. RELEVANCE IS STRICT

Every candidate must be genuinely relevant to [the exact subject]. Do not
include something merely because it contains [keyword(s)]. The [thing being
tracked] must be the actual subject of the entry, not an incidental mention.
Reject off-topic content per the specific exclusions defined for this
domain (see Step 0 config — this list is domain-specific and must be
filled in for the current project, not assumed from a prior project).

5. REAL SOURCES ONLY, ACTUALLY VERIFIED

Prioritize genuine first-person/primary sources. Do not assume a platform
automatically qualifies — actually inspect the source. Search-engine
snippets are NOT sufficient evidence. Open the actual page/document and read
the relevant content.

6. VERIFY THE ACTUAL SOURCE

For every candidate: find it through search, open the actual source, read
enough surrounding context to understand it, confirm the quoted content
actually appears there, confirm whether it's original/primary or a
reply/derivative, confirm it genuinely represents what's being tracked,
confirm any required context (geographic, domain-specific, ownership, etc.)
per this project's Step 0 config, confirm category fit, confirm it hasn't
already been used. Never invent missing context. Never "clean up" a quote.

7. VERBATIM FIELDS MUST BE VERBATIM

Do not paraphrase, correct grammar, fix spelling, change punctuation,
translate loosely, combine unrelated sentences, silently remove words, or
insert words for clarity. A contiguous excerpt ending at a natural boundary
is fine if it preserves original wording. If a clean, meaningful, verbatim
excerpt can't be extracted, reject the candidate.

8. REQUIRED CONTEXT MUST BE REAL, NOT INFERRED

Where the project requires specific context (geographic, ownership,
domain-specific, etc. — defined per-project in Step 0), verify it from the
source itself. Do not infer it from a platform/community's general
demographic. If the connection is weak or speculative, reject the
candidate.

9. THE SPECIFIC SCOPE BOUNDARY MUST BE VERIFIED, NOT ASSUMED

Where the project requires a specific scope condition (e.g. "the person's
own X" vs. "X in general," "a specific entity" vs. "an adjacent/similar
entity"), explicitly confirm which side of that boundary the source falls
on, using concrete phrasing examples relevant to the current project. Do not
make assumptions either way — if the source doesn't establish the required
condition, reject it.

10. DO NOT RECYCLE REJECTED ENTRIES

Maintain a permanent rejected-candidate list for this task. Record source,
title, URL, and reason for every rejection. Once rejected, an entry must
never silently reappear in a later search round, especially across multiple
agents or research rounds. If new evidence genuinely changes the decision,
explicitly state what changed.

11. DO NOT COUNT MULTIPLE ITEMS FROM ONE SOURCE AS MULTIPLE NEW ENTRIES

Unless this project's methodology explicitly permits it, treat a
source/thread as used once it has been used. Do not pull several separate
"new" entries from the same single source just to increase the count.

12. QUALITY OVER THE TARGET NUMBER

I would rather have fewer excellent entries than the full target filled with
fabricated, weak, repetitive, or nonsensical ones. Never fabricate, never
infer an entry, never manufacture realistic-sounding content, never loosen
relevance criteria because you're short of the target, never add irrelevant
entries just to hit the number. If you can't find the full target, tell me
exactly how many you found and why the rest couldn't be responsibly sourced.

13. SEARCH STRATEGY

Use multiple independent search angles, not the same phrase repeated.
Explore different sub-communities/sources, terminology, synonyms, spelling
variants, and natural ways people actually describe the thing being
researched. Every result still passes the same relevance/verification bar
regardless of how it was found.

14. REQUIRED VERIFICATION REPORT FORMAT (per candidate, no compression)

Candidate [number] / Proposed ID / [Subject field] / [Verbatim field,
quoted] / Category / [any classification fields per this project] /
Platform / Source Title / Source Link / Date Discovered / Source Type
(original/primary vs. reply/derivative), followed by:

1. Title-only sanity check: PASS/FAIL
2. Actual source opened and read: PASS/FAIL
3. First-person/primary-source confirmed: PASS/FAIL, state which
4. [Subject] is the actual core content: PASS/FAIL
5. Required scope/context condition: PASS/FAIL — explain exactly what
   establishes it
6. Explicit on-topic language/evidence: PASS/FAIL — quote it
7. Required context (e.g. geographic): PASS/FAIL — explain the evidence
8. Verbatim field verified against actual source: PASS/FAIL
9. Source/thread deduplication — literal result, e.g. "id_abc123 found:
   false" — never just "dedup clear"
10. Exact/near-duplicate content check: PASS/FAIL, with similarity
    evidence if a close match was found
11. Previously-rejected-candidate check: PASS/FAIL

Final status: PASS / REJECT

15. SHOW REJECTED CANDIDATES TOO

For every meaningful candidate actually investigated but rejected: source,
URL, title, why it looked potentially relevant, exact rejection reason, and
which category of rejection it falls into. This is how I confirm real
research happened rather than generation.

16. SECOND-PASS CROSS-CHECK ON THE WHOLE PROPOSED BATCH

After assembling all proposed candidates, dedup them again against: every
existing dataset entry, every other proposed candidate in this same batch,
every previously rejected candidate, and every source/thread already used
anywhere (existing dataset or elsewhere in this new batch). Remove any
duplicate found before presenting the final list.

17. DO NOT MODIFY THE FILE YET

Research → verify → deduplicate → report is the entire job at this stage.
No writes, no renumbering, no overwrites, no deletions, no saved changes.
Wait for explicit approval.

18. AFTER APPROVAL

Re-open the current file, confirm current state again, re-run dedup against
the current version, add only approved candidates, preserve existing
formatting/structure, assign sequential IDs from the actual next-available
ID (computed fresh, not assumed), never alter existing rows, never silently
substitute a rejected candidate for an approved one, verify final row count,
report exactly what was added.

FINAL OBJECTIVE

Not "hit the target number" — find up to [X] genuinely new, real, relevant,
non-duplicate entries matching the existing dataset's methodology and
quality bar, verify every one against its actual source, and present all of
them for review before any file changes. No abrupt entries, no filler, no
fabrication, no duplicate sources, no duplicate underlying experiences, no
paraphrased verbatim fields, no snippet-only evidence, no recycled rejected
candidates, no lowering the bar to hit the number. If the full target
genuinely exists, find all of it. If less exists, report exactly how much
and why — never invent the remainder.

---

**Note on using this template:** the bracketed fields (`[dataset]`, `[N]`, `[X]`, `[subject field]`, `[verbatim field]`, domain-specific exclusion lists, and the specific scope-boundary examples in section 9) must be filled in from this project's actual Step 0 configuration before use — this template is a structural skeleton, not a ready-to-send prompt on its own. When adapting it, replace every bracketed placeholder with the real values for the current research task; do not send it with brackets still in place.
