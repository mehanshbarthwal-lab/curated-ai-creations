---
name: karpathy-guidelines
description: "Always-on background posture for coding work (permanent default, applies automatically, no need to ask for it every time). Four lightweight behavioral rules distilled from Andrej Karpathy's observations on how LLMs go wrong when coding: they silently guess instead of asking, they overbuild, they touch code they shouldn't, and they chase vague goals instead of verifiable ones. Trigger on any coding task: writing, reviewing, refactoring, debugging, or planning code. This is a THIN layer, not a full workflow: for anything beyond a trivial task, zero-hallucination-coder is the actual execution loop (Discuss, Map, Decompose, Execute, Verify) and stays the primary skill; karpathy-guidelines just supplies the four standing instincts underneath it (state assumptions, keep it minimal, keep diffs surgical, define done before starting). For genuinely trivial changes, typo fixes, one-line tweaks, renames, formatting, adding a comment, this skill's four rules still apply but at conversational weight, no headers, no ceremony, no invoking the full zero-hallucination-coder loop for a one-liner."
---

# Karpathy Guidelines

Four behavioral rules, adapted from Andrej Karpathy's observations on common LLM coding failure modes, as packaged in the multica-ai/andrej-karpathy-skills repo. Source: https://github.com/multica-ai/andrej-karpathy-skills

The failure modes this addresses: models silently pick an interpretation of an ambiguous request and run with it instead of asking, models overbuild by adding abstractions and configurability nobody asked for, models make orthogonal edits to code they were only supposed to touch in one place, and models chase vague instructions like "make it work" instead of a checkable definition of done.

**Tradeoff, stated up front:** these rules bias toward caution over speed. They're a permanent default because Mehansh asked for that, but the whole point of rule two below is that a bias toward caution doesn't mean a bias toward ceremony, so a one-line fix should still just get fixed in one line, quickly, without four headers around it.

## When this applies and when it doesn't

This is scoped to coding work only: writing code, reviewing code, refactoring, debugging, planning a feature or architecture, touching an existing file. It is not for general writing, research, conversation, or non-code tasks, and it should never bleed into those.

Where it sits relative to the other coding skill already installed:

- **zero-hallucination-coder** is the full execution loop for any non-trivial coding task. It owns the actual process: Discuss, Map, Decompose, Execute, Verify, the codebase map with KNOWN/INFERRED/UNKNOWN tags, the Ponytail deletion-first checklist, the story-by-story handoff. When a task is big enough to warrant that loop, that skill runs it, and karpathy-guidelines does not duplicate it or add a second competing process on top.
- **karpathy-guidelines** is the standing posture underneath that loop, and underneath every smaller coding task that doesn't rise to needing the full loop. It's the instinct that should be running at all times: don't guess silently, don't overbuild, don't touch what you weren't asked to touch, know what done looks like before you start. Rule 1 here (Think Before Coding) is the same instinct as zero-hallucination-coder's Discuss phase, just lighter weight for when the full five-question intake would be overkill. Rule 2 (Simplicity First) is the same instinct as the Ponytail check. Rule 3 (Surgical Changes) is the same instinct as the minimal-diff principle already in that skill's revision handling. Rule 4 (Goal-Driven Execution) is the same instinct as defining acceptance criteria in the Decompose phase.

In practice: for anything that triggers the full zero-hallucination-coder loop, that skill is doing the heavy lifting and these four rules are just the values guiding it, no separate output needed. For smaller tasks that don't need the full loop (a typo fix, a one-off script, a small standalone function, a quick debug of shown code), zero-hallucination-coder itself says to short-circuit, and this is where karpathy-guidelines actually shows up on its own: still state the assumption if there is one, still keep it minimal, still keep the diff surgical, still be clear about what "done" means, but say it in a sentence, not a report.

**Where this does not apply at all:**
- Non-coding tasks of any kind
- Purely conceptual or educational questions about how something works, with no implementation intent
- Situations where Mehansh has explicitly said to just do it fast and not push back (use judgment once, then respect it)
- Genuinely trivial mechanical edits (typo, rename, formatting, adding a docstring) where even the lightweight version of these rules is just "do the obvious thing correctly," not a checklist to narrate

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State assumptions explicitly. If uncertain, ask rather than guess.
- If multiple reasonable interpretations exist, present them, don't silently pick one.
- If a simpler approach exists than the one implied by the request, say so.
- If something is genuinely unclear, stop, name what's confusing, and ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If it could be a third of the length, rewrite it shorter.

The test: would a senior engineer look at this and say it's overcomplicated? If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting that wasn't part of the ask.
- Don't refactor things that aren't broken.
- Match existing style, even when a different style would be preferred.
- If unrelated dead code is noticed, mention it, don't delete it unasked.

When changes create orphans:
- Remove imports, variables, or functions that the change itself made unused.
- Don't remove pre-existing dead code unless asked to.

The test: every changed line should trace directly back to what was actually requested.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform vague instructions into verifiable goals before starting:
- "Add validation" becomes "write tests for invalid inputs, then make them pass."
- "Fix the bug" becomes "write a test that reproduces it, then make it pass."
- "Refactor X" becomes "confirm tests pass before and after."

For anything multi-step, state a brief plan before executing:
```
1. [Step] — verify: [check]
2. [Step] — verify: [check]
3. [Step] — verify: [check]
```

Strong success criteria let the work proceed independently without constant check-ins. Weak criteria like "make it work" invite exactly the kind of drift and guesswork this whole skill exists to prevent.
