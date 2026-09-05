---
name: loop-until-done
description: "Runs a self-correcting AI loop that plans, produces, grades, and rewrites output iteratively until it clears a strict quality bar — instead of handing you a single draft and stopping. Use this skill whenever the user wants output that is actually finished rather than just generated, especially for tasks that repeat often or where quality criteria can be made objective. Trigger on phrases like: \"keep improving until it's good\", \"loop until done\", \"don't stop until it meets the bar\", \"auto-refine this\", \"iterate on this until it's right\", \"make it keep going\", or any time the user signals they want the AI to self-correct rather than hand off a draft. Also trigger when a user asks for a high-quality output and the task is one where strict criteria are clearly possible — even if they don't explicitly say \"loop\". Do NOT trigger for one-off requests that are genuinely subjective (brand voice checks, design feel, \"does this resonate\") or for quick factual questions where no iteration is needed."
---

# Loop-Until-Done Skill

A self-correcting loop that makes AI finish the job rather than hand you a draft. The model plans, produces, grades its own output against strict criteria, fixes the weakest part, and repeats — until every criterion clears the bar. Only then does it show you the result.


## When this is worth using

Run the loop only when **all four** of these are true. If even one fails, a regular prompt will serve better.

**1. The task repeats** (at least weekly). A one-off is better handled with a single well-crafted prompt. Loops have overhead; use them where that overhead pays off over time.

**2. Failure is detectable without a human.** The quality bar has to be objective enough that the model can genuinely fail a draft, not just approve it. "Be good" is not a criterion. "Hook lands in the first 7 words, one concrete number, under 150 words, zero clichés" is.

**3. The AI can do it end to end.** If the model needs you to go look something up or fill in context mid-loop, it's not a loop — it's a series of prompts. The loop only pays off when it can run uninterrupted.

**4. "Done" is objective, not taste.** If quality is genuinely a judgment call (creative direction, subjective feel, brand voice), a human still wins. The loop can handle measurable parts; you handle the rest.

---

## When NOT to use it

- **One-off tasks.** The loop's planning overhead is wasted when you only need a result once.
- **Subjective outputs.** Brand voice, design resonance, creative feel — these can't be objectively verified, so the loop just rubber-stamps whatever it produced first.
- **Tasks that require mid-loop human input.** If the model has to stop and ask you something to continue, the loop breaks. Use a normal back-and-forth instead.
- **Simple or short tasks.** Asking for a one-sentence summary, a quick definition, or a factual lookup — the loop adds cost and complexity for no reason.
- **When your criteria are vague.** If you cannot write at least three criteria that a bad draft would clearly fail, the loop will spin and print FINAL on mediocre output. Sharpen the criteria first, or skip the loop.

---

## The loop prompt (copy-paste this)

```
You will work in a loop until the task meets the bar.

TASK:
[describe exactly what you want produced]

SUCCESS CRITERIA (be strict — no soft passes):
- [criterion 1]
- [criterion 2]
- [criterion 3]

LOOP — repeat every turn:
1. PLAN   — state the single next step.
2. DO     — produce or improve the work.
3. VERIFY — score the result 1–10 on each criterion.
            Be brutally honest. List exactly what is still weak.
4. DECIDE — if every criterion is 8+, print "FINAL" and stop.
            Otherwise print "ITERATING" and go again,
            fixing the weakest score first.

RULES:
- Never call it done until every criterion is 8 or higher.
- Each pass must fix the weakest score from the last VERIFY.
- Don't ask me questions — make a sensible assumption,
  note it, and keep going.

Begin. Run the loop until FINAL.
```

Fill in TASK with exactly what you want. Replace the three SUCCESS CRITERIA with your real bar. Send. Watch it draft → grade → fix → repeat until it prints FINAL.

**The whole trick lives in the criteria.** Vague criteria mean the model approves its own first draft. Strict, specific criteria give it something it can actually fail against.

---

## Writing the criteria

The criteria are the only part that requires thought from you. Here is what good criteria look like versus bad.

| Bad (too soft) | Good (actually faileable) |
|---|---|
| "Make it engaging" | "First sentence lands in under 10 words with no throat-clearing" |
| "Keep it short" | "Under 150 words total" |
| "No clichés" | "Zero use of: game-changer, leverage, synergy, journey, delve" |
| "Be specific" | "At least one concrete number or named example" |
| "Sound professional" | "No passive voice in the opening paragraph" |

Aim for 3 to 5 criteria. More than 5 and the model spends too many tokens grading; fewer than 3 and the bar is too easy to clear.

---

## Ready-to-use loop templates

### Writing loop (LinkedIn post, email, short copy)

```
TASK: Write a LinkedIn post about [topic].
SUCCESS CRITERIA:
- First line stops the scroll — no throat-clearing intro
- Exactly one concrete example or number
- Under 150 words
- No clichés, buzzwords, or AI filler
- Ends on a question or a sharp one-liner
```

### Decision loop (choosing between options)

```
TASK: Help me choose between [option A] and [option B] for [goal].
SUCCESS CRITERIA:
- Lists the real trade-offs, not generic pros/cons
- Names the single deciding factor
- Gives one clear recommendation
- States what new information would flip the answer
```

### Analysis loop (market, data, competitive)

```
TASK: Analyse [dataset/situation/problem].
SUCCESS CRITERIA:
- Leads with the single most important finding
- Every claim is backed by a specific figure or named source
- Identifies at least one non-obvious implication
- Under [N] words
- No vague hedges like "could potentially" or "may suggest"
```

### Code review loop

```
TASK: Review this code and produce an improved version: [paste code]
SUCCESS CRITERIA:
- All edge cases handled and named explicitly
- No repeated logic — DRY throughout
- Every function has a clear single responsibility
- All variable names are descriptive, no single-letter names except loop counters
- Passes the original test cases without modification
```

---

## Gotchas and limits

**The loop grades its own work.** The model that wrote the draft is a generous self-grader. The only thing that counteracts this is criteria specific enough that a bad draft objectively fails them. If it keeps printing FINAL on mediocre output, your criteria are the problem — add one it is currently failing and tighten the others.

**This is the light version — and that is the point.** This loop runs inside a single chat session while you are there. A loop that runs on a schedule, triggers on webhooks, or chains multiple tools is real engineering requiring connectors and token budgets. For roughly 99% of everyday tasks, this paste-and-run version is all you need. Do not build infrastructure until you have genuinely outgrown this.

**Long loops drift.** As passes accumulate, context fills up and the model can wander from the original intent. Cap the loop explicitly: add a line like "stop after 5 passes and show me the best version so far" rather than letting it run indefinitely.

**Do not loop taste.** Creative direction, design feel, brand voice, emotional resonance — these are not objectively verifiable so the loop cannot truly check them. Use the loop for the measurable parts and judge the rest yourself.

**If the first FINAL is still not good enough,** your criteria were too soft. Tighten them and run again. This is expected — the first pass at criteria is usually underspecified.

---

## Adapting the loop for Claude's tools

When running the loop inside Claude's computer use or agentic tools, you can wire the VERIFY step to external checks rather than self-grading:

- For code: run the test suite in VERIFY and fail if tests don't pass
- For structured output: validate against a schema in VERIFY and fail on schema errors  
- For word count: count tokens in VERIFY and fail if over the limit

This removes the self-grading problem entirely since the check is deterministic. Use this pattern whenever the success criterion is something a script can check, because it is strictly more reliable than model self-evaluation.