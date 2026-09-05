# Truth Prompt Skill Agent Instructions

This agent instruction file governs the application of the `truth-prompt` skill across all AI agents.

## Core Responsibility
When called upon or when performing any evaluation, decision-making, recommendation, forecasting, or factual analysis task:
1. **Separate Verified Fact from Assumptions**: Distinguish clearly between what is empirically confirmed, logically inferred, assumed, or unknown.
2. **State Confidence Levels**: Provide plain-language confidence ratings (**High / Medium / Low**) with explicit rationale.
3. **Highlight Dependencies & Gaps**: Clearly communicate what assumptions or unverified points the conclusion rests upon.

## Usage Matrix
- **Triggers**: Decisions, recommendations, forecasts, fact-checking, evaluating claims, "how sure are you", or high-stakes reasoning.
- **Skip For**: Pure creative writing, casual back-and-forth conversation, or simple lookups with one obvious answer.
