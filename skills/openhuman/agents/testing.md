# TESTING

Use for tests, coverage, CI, QA, Vitest specs, WDIO E2E, and Rust test harness work.

Rules:

- Vitest unit tests live as `*.test.ts` or `*.test.tsx` under `app/src/**`.
- Run unit tests with `pnpm test`, not `pnpm test:unit`.
- E2E specs live in `app/test/e2e/specs/*.spec.ts`.
- Use element helpers from `element-helpers.ts`; avoid raw `XCUIElementType*` selectors.
- Rust tests use `pnpm test:rust` or `scripts/test-rust-with-mock.sh`.
- Prefer debug runners because they tee logs to `target/debug-logs/`.
- PRs need at least 80% coverage on changed lines.

Checks:

```powershell
pnpm debug unit
pnpm debug rust
pnpm debug e2e
pnpm test:coverage
```
