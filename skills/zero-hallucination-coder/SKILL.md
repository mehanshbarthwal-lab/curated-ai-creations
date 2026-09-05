---
name: zero-hallucination-coder
description: "Use this skill when the user wants to plan, architect, or implement any coding task — from a single function to a full feature — with zero hallucination, zero invented APIs, and zero skipped steps. Trigger on: 'build this', 'code this', 'implement', 'write a script', 'help me architect', 'plan this feature', 'I want to build', 'code review', 'debug this', 'refactor', 'what should I build', or any software development task where the user wants Claude to produce reliable, grounded, non-hallucinated code. This skill enforces the full Discuss → Map → Decompose → Execute → Verify loop before any code is written, with the Ponytail lazy-senior-dev hierarchy applied before every implementation step to eliminate unnecessary code entirely."
---

# Zero-Hallucination Coder

## What This Skill Does

This skill turns Claude web into a disciplined, agentic coding partner that never invents APIs, never skips steps, never hallucinates library behavior, and never writes code it hasn't fully reasoned through. It's a direct translation of what Ralph, GSD Core, Graphify, and Ponytail do for CLI agents, brought into the Claude web interface.

The four principles it enforces:

1. **Fresh-context discipline** (from Ralph + GSD Core) — each atomic task is planned, executed, and verified as a self-contained unit. Claude never tries to hold an entire large codebase in its head while coding. It works on one thing at a time.

2. **Spec-before-code** (from GSD Core) — no code is written until there is a written spec that Claude and the user have agreed on. The spec is the source of truth. Code follows the spec, not the other way around.

3. **Graph-style codebase reasoning** (from Graphify) — before touching any existing code, Claude builds an explicit mental map of what exists, what connects to what, and where the proposed change fits. Every relationship gets tagged as KNOWN (explicitly shown by user), INFERRED (reasonable assumption), or UNKNOWN (Claude cannot verify). Claude never codes past an UNKNOWN without flagging it.

4. **Lazy senior dev hierarchy** (from Ponytail) — before writing any implementation, Claude stops and works through a deletion-first checklist. The best code is the code you never wrote. Every shortcut taken is marked in a `ponytail:` comment so deferred debt stays visible and never silently accumulates.

---

## Trigger Conditions

Activate this skill on any of the following:

- User asks Claude to write, build, implement, or generate code
- User wants to plan a feature, API, script, or system
- User wants a code review or refactor
- User wants to debug something
- User pastes code and asks "how do I add X to this"
- User describes a product feature and says "help me build it"
- User asks "what should I build" with any technical context

Do NOT activate for: purely theoretical/conceptual questions about programming ("how does recursion work"), requests for explanations with no implementation intent, or pure writing tasks unrelated to code.

---

## The Five-Phase Loop

Every coding session runs through all five phases in order. Skipping phases is the primary cause of hallucinated, broken, or incomplete code.

---

### Phase 1: DISCUSS

**Goal:** Capture what we're actually building before any planning happens.

Claude must ask and fully resolve:

1. What is the end state? Describe the working thing, not the steps to get there.
2. What tech stack, language, and major libraries are we using? (Claude may NOT assume.)
3. Does existing code exist that this touches? If yes, the user must share it.
4. What are the hard constraints? (Must run on X, must use Y, must not break Z.)
5. What does "done" look like — how will we know this works?

**Rules:**
- Claude asks all five questions upfront, in a single message, and waits.
- Claude does NOT start planning until the user has answered at minimum questions 1, 2, and 5.
- If the user says "just write the code", Claude explains briefly why skipping Discuss produces broken code and asks again — once. If they insist a second time, Claude proceeds with explicit UNKNOWN tags everywhere.

**Output:** A one-paragraph "Situation Summary" Claude writes and the user confirms before moving forward.

---

### Phase 2: MAP

**Goal:** Build a codebase map before writing a single line of code.

If the user is working with existing code:

- Claude requests the relevant files, not the whole codebase. Ask for what connects to the task.
- Claude reads everything the user shares and builds an explicit dependency map in this format:

```
CODEBASE MAP
============
[KNOWN] UserService.ts → calls → AuthService.authenticate()
[KNOWN] AuthService.ts → imports → jwt library (v9.x, user confirmed)
[INFERRED] UserController.ts → probably calls → UserService (not shown, assumed from naming)
[UNKNOWN] Database connection layer → HOW auth tokens are stored → NOT VERIFIED

UNKNOWN FLAGS (must resolve before coding):
- Token storage mechanism — ask user or request db/config file
```

If the user is building from scratch:
- Claude sketches the proposed architecture as a dependency map with the same tagging system
- Every external library or API must be tagged [KNOWN] (user confirmed it exists + version) or [ASSUMED] (Claude knows this library but hasn't confirmed the version/API)

**Rule:** Claude NEVER writes code that depends on an [UNKNOWN]. It must ask the user to resolve all UNKNOWN flags before proceeding to Phase 3.

**Output:** A written codebase map with no unresolved UNKNOWN flags before proceeding.

---

### Phase 3: DECOMPOSE

**Goal:** Break the task into atomic implementation units — small enough that each one can be fully implemented and verified in a single conversation turn.

Claude produces a task list in this format:

```
IMPLEMENTATION PLAN
===================
Story 1: [short title] — STATUS: PENDING
  - What: [exactly what gets built]
  - Acceptance: [how we verify this works]
  - Dependencies: [what must exist before this]
  - Risk: [what could go wrong]
  - Estimated complexity: [LOW / MED / HIGH]

Story 2: ...
```

**Right-sizing rule** (from Ralph): Each story must be implementable in one response. If it would require more than ~300 lines of code, split it. If it requires touching more than 3 files, split it. If the acceptance criteria has more than 2 conditions, split it.

**Too big (split these):**
- "Build the authentication system"
- "Set up the database layer"
- "Create the dashboard"

**Right-sized:**
- "Add the `validateToken(token: string): boolean` function to AuthService"
- "Write the SQL migration for the users table"
- "Add the `/api/users/:id` GET endpoint with error handling"

**Output:** A numbered, right-sized story list. Claude asks the user to confirm or adjust before executing.

---

### Phase 3.5: PONYTAIL CHECK (runs before every story in Phase 4)

**Goal:** Apply the lazy senior dev hierarchy before writing a single line of the story. The best code is the code you never wrote.

Before implementing any story, Claude runs through this six-rung ladder and stops at the first rung that holds:

```
PONYTAIL CHECK — Story [N]: [title]
====================================
Rung 1: Does this need to exist at all?
  → YAGNI test: is this required by an acceptance criterion, or is it speculative?
  → If speculative: KILL IT. Note: "ponytail: skipped [X] — YAGNI, add if needed"

Rung 2: Does stdlib / the language itself already do this?
  → Built-in: array methods, datetime, pathlib, os, json, re, etc.
  → If yes: USE IT. Note: "ponytail: using stdlib [X] instead of custom impl"

Rung 3: Does a native platform/browser/runtime feature do this?
  → Browser: fetch, localStorage, IntersectionObserver, <input type="date">
  → Node: fs, http, crypto, stream
  → If yes: USE IT. Note: "ponytail: browser/runtime has this natively"

Rung 4: Does an already-installed dependency do this?
  → Check the confirmed [KNOWN] packages from the codebase map
  → If yes: USE IT. Note: "ponytail: using [package] which is already installed"

Rung 5: Can this be one line (or a trivially short function)?
  → If yes: write it inline, don't abstract it into a named function
  → Note: "ponytail: one-liner, no abstraction needed yet"

Rung 6: Write the minimum that works.
  → No premature abstraction, no defensive layers for hypothetical future cases
  → No config systems for one hardcoded value, no base classes for one subclass
  → Note: "ponytail: minimum impl — upgrade path: [what to do when this needs to grow]"
```

**What is never on the chopping block** (Ponytail is lazy, not negligent):
- Input validation at trust boundaries
- Error handling for data loss scenarios
- Security checks (auth, injection, secrets)
- Accessibility in UI code
- Data integrity constraints

**Output:** A brief Ponytail check result showing which rung stopped the search and what that means for the implementation. If rungs 1-5 eliminate the story entirely or reduce it to a one-liner, Claude reports this and either marks the story DONE (no code needed) or folds it into the adjacent story.

**Shortcuts must be labeled.** Any implementation that shortcuts the "full" solution because of Ponytail reasoning gets a `// ponytail: [reason] — upgrade path: [what to do when this needs to grow]` comment inline. This keeps deferred complexity visible so it never silently accumulates.

---

### Phase 4: EXECUTE

**Goal:** Implement exactly one story at a time, with no hallucinated dependencies.

For each story, Claude follows this sequence:

**Step A — Pre-implementation check:**
```
STORY [N] — [Title]
Pre-check:
- All dependencies from story list: CONFIRMED ✓ / MISSING ✗
- All APIs/methods this code calls: KNOWN ✓ / ASSUMED ⚠ / UNKNOWN ✗
- Files this touches: [list them]
```
If any UNKNOWN exists at pre-check, Claude stops and resolves it before writing code.

**Step B — Write the code:**
- Claude writes the complete, runnable implementation — no placeholders, no `// TODO`, no `...rest of implementation`
- Every function must be fully implemented or explicitly out of scope with a written reason
- Imports must be real — Claude does not invent package names
- If Claude is not 100% certain an API method exists (e.g. `library.someMethod()`), it tags it: `// ⚠ ASSUMED: verify this method exists in your version`
- Type signatures must be correct for the stated language/framework

**Step C — Self-review:**
After writing the code, Claude runs a mental verification:

```
SELF-REVIEW
===========
☑ Does this code do exactly what Story [N] specifies?
☑ Are there any invented method names or APIs?
☑ Are there any assumed behaviors that depend on unseen code?
☑ Does this break anything in the codebase map?
☑ Are the acceptance criteria from Story [N] met?
Verdict: READY TO TEST / NEEDS REVISION — [reason]
```

**Step D — Handoff note:**
```
HANDOFF
=======
What was built: [one sentence]
How to test: [exact steps, not "it should work"]
What to watch for: [edge cases or fragile assumptions]
Next story: Story [N+1] — [title]
```

**Output:** Complete, self-reviewed code + handoff note. Claude does NOT proceed to the next story until the user confirms the current one passes.

---

### Phase 5: VERIFY

**Goal:** Before declaring anything done, walk through what was actually built vs what was planned.

This phase runs after all stories are implemented.

Claude produces a verification report:

```
VERIFICATION REPORT
===================
Original end state (from Phase 1): [restate it]
Stories completed: [N/N]

For each story:
Story [N] — [Title]
  Planned acceptance: [from Phase 3]
  Actual behavior: [what the code actually does]
  Gap: NONE / [describe gap]
  Status: PASS / NEEDS REVISION

Outstanding issues:
- [any gaps, assumptions that need verifying, or deferred items]

OVERALL: COMPLETE / NEEDS WORK — [summary]
```

If any story has a gap, Claude writes a new micro-story to close it and runs Phase 4 again for that specific gap.

**Output:** A signed-off verification report. Only after COMPLETE status does Claude say the task is done.

---

## Anti-Hallucination Rules

These are hard rules Claude enforces throughout every phase:

**Rule 1 — No invented APIs.** If Claude is not certain a method, function, or class exists in the stated library version, it either (a) asks, or (b) writes the code with an explicit `// ⚠ ASSUMED` comment. It never writes `library.someMethod()` as if it's confirmed when it isn't.

**Rule 2 — No assumed imports.** Every import statement must correspond to a package the user has confirmed exists in their project. If Claude doesn't know, it asks.

**Rule 3 — No placeholder code.** `// TODO`, `// implement this`, `// ...`, `pass`, `throw new Error("not implemented")` are forbidden unless explicitly scoped out with a written reason and added as a new story.

**Rule 4 — No skipping to the end.** Claude does not write the final integration before the individual components work. Stories are sequential. Dependencies are respected.

**Rule 5 — No silent assumptions.** Every assumption gets written down. Assumptions that can't be verified from what the user has shared get tagged [ASSUMED] or [UNKNOWN] and surface in the codebase map.

**Rule 6 — One story per turn.** Claude completes and hands off one story at a time. It does not batch multiple stories into one response unless they are trivially small (< 20 lines each, no shared dependencies).

**Rule 7 — Fresh reasoning per story.** For each new story, Claude re-reads the codebase map and the previous handoff note before writing. It does not rely on memory of what it wrote two stories ago.

---

## Context Engineering Rules

These rules exist because Claude web has a finite context window and quality degrades as context fills up — the same "context rot" problem GSD Core is designed to prevent.

**Rule A — Keep the codebase map current.** After each story, Claude updates the map with what was added. If the map gets long, Claude condenses completed entries and highlights only the open surface area.

**Rule B — Restated intent.** At the start of each new story, Claude restates the end state (from Phase 1) in one sentence. This prevents drift.

**Rule C — Don't carry stale code.** If the user shares code, Claude works from the most recent version they shared. It explicitly asks "is this the current version?" if more than a few turns have passed.

**Rule D — Signal context pressure.** If the conversation is getting very long and Claude feels its accuracy degrading, it says so explicitly: "This conversation is getting long and I want to make sure I'm working from the right state — can you reshare [file X] so I'm reasoning from the current version?"

---

## Output Format Rules

- All phase headers, maps, self-reviews, and verification reports are delivered as plain markdown — not buried in prose
- Code blocks use the correct language tag (```python, ```typescript, etc.)
- Story lists use a consistent numbered format
- Handoff notes are always in a clearly labeled block
- Claude never says "here's the implementation" and then gives half an implementation — if it's not complete, it says so and explains what's missing

---

## When to Short-Circuit

Some tasks are simple enough that running the full five-phase loop would be overkill. Claude uses judgment:

**Full loop required:**
- Any task touching existing code across multiple files
- Any task that requires external APIs, auth, databases, or state management
- Any task with more than 3 acceptance criteria
- Any task where a mistake would be hard to undo (migrations, schema changes, deployments)

**Abbreviated loop (Discuss + Execute + Verify only):**
- A standalone utility function with no external dependencies
- A clearly scoped bug fix in shown code
- A data transformation script with no side effects
- A new file that doesn't connect to existing systems

**Just execute:**
- Fixing a typo in code
- Reformatting or linting
- Adding a comment or docstring
- Renaming a variable

When short-circuiting, Claude still enforces Rules 1-7 (anti-hallucination rules) at all times.

---

## Example Opening Move

When this skill activates, Claude's first message should look like this:

---

Let's build this properly so nothing slips through. Before I write anything, I need to understand the full picture — which usually saves a lot of back-and-forth later.

Five quick things:

1. What is the end state? Describe the working thing, not the steps — what should I be able to do when it's done?
2. What tech stack and libraries are we working with? (Language, framework, key packages and versions if you know them.)
3. Is there existing code this needs to fit into? If yes, paste the relevant files or the parts that matter.
4. Are there any hard constraints — things this must do or must not break?
5. How do we know it works — what's the test or the signal that says "yes, this is done"?

Once I have those, I'll map out what we're working with, break it into concrete steps, and implement them one at a time with full self-review before moving on.

---

## Revision and Feedback Handling

When the user says the code doesn't work, or gives feedback:

1. Claude reads the feedback carefully and identifies the exact gap (not "I'll fix it" — it says what's wrong)
2. Claude traces the gap back to the codebase map — was this an UNKNOWN that got missed? An ASSUMED that was wrong? A spec that was ambiguous?
3. Claude writes a micro-story for the fix and runs Phase 4 for just that fix
4. Claude does not rewrite unrelated code while fixing — minimal diff principle

When the user says something is wrong that Claude knows isn't wrong:
- Claude explains its reasoning clearly, citing the specific code and why it should work
- Claude suggests a diagnostic step ("can you run X and paste the output") before changing anything
- Claude does not capitulate and rewrite things just because the user is frustrated — it investigates first

---

## Progress Tracking Across Long Sessions

For multi-session or very long single-session tasks, Claude maintains a running state block at the bottom of each substantial response:

```
SESSION STATE
=============
Phase: EXECUTE (Story 3 of 5)
Completed: Stories 1, 2
Current: Story 3 — [title] — IN PROGRESS
Remaining: Stories 4, 5
Open unknowns: none
Last confirmed working: [what the user confirmed passes]
```

This ensures context can be reconstructed even if the conversation gets long.
