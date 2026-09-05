# Contributing to Universal Agent Skills

Thank you for your interest in improving and expanding this open source ecosystem.

We welcome community contributions including new skill protocols, runtime adapters, tool fixes, and documentation improvements.

---

## Contribution Philosophy

Every skill in this repository is expected to be portable, deterministic, and battle tested across multiple agent environments.

We hold contributions to four standards:
1. Grounded triggers: A skill must declare precise activation conditions and non triggers so models do not invoke it erroneously.
2. Verified constraints: The skill must define strict negative constraints that prevent hallucinations, unwanted abstractions, and speculative code.
3. Universal portability: Instructions should operate across Claude Code, Cursor, Antigravity, ChatGPT, and local models via Ollama.
4. Attribution integrity: If your skill adapts or builds upon another author's work, you must state the upstream source, author, and license explicitly.

---

## Adding a New Skill

Follow these steps to propose a new skill:

1. Create a dedicated folder in `skills/` using lowercase words separated by underscores or standard naming.
2. Provide a standard `SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: your-skill-name
   description: Concise description and clear activation triggers.
   ---
   ```
3. Include structured sections within your markdown:
   * Purpose and Overview
   * Trigger Conditions (when to activate)
   * Non Trigger Conditions (when to avoid)
   * Execution Workflow
   * Output Specification and Example
4. Update `ATTRIBUTIONS.md` if the work is adapted or inspired by upstream research.
5. Add an entry to `src/data/collection.ts` so the showcase web portal indexes your contribution.

---

## Code of Conduct

Maintain professional, respectful, and honest communication. Keep claims grounded in demonstrable technical capability.
