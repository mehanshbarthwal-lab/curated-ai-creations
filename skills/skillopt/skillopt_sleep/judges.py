"""SkillOpt-Sleep — rule-based judges (gbrain-evals compatible).

Implements the programmatic check operators used by gbrain-evals'
skillopt-v1 benchmark so we can score skill outputs locally, with NO judge
API call:

  * section_present <name>   — a markdown heading containing <name> exists
  * regex <pattern>          — the pattern matches the response
  * max_chars <n>            — response length <= n
  * min_chars <n>            — response length >= n
  * contains <text>          — substring present (case-insensitive)
  * tool_called <name>       — a tool with <name> was invoked (needs a tool loop;
                               in single-shot replay we approximate via an
                               explicit "TOOL_CALL: <name>" marker the agent emits)

A task whose judge is {"kind": "rule", "checks": [...]} passes (hard=1.0) iff
ALL checks pass; soft = fraction of checks passed. This mirrors gbrain's
all-checks-must-pass rule scoring and gives the gate a smooth signal.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Tuple


def _section_present(response: str, name: str) -> bool:
    # a markdown heading line (#, ##, ...) or bold line that contains `name`
    pat = re.compile(
        r"(?im)^\s{0,3}(#{1,6}\s*.*%s|\*\*.*%s.*\*\*\s*:?)\s*$" % (re.escape(name), re.escape(name))
    )
    if pat.search(response or ""):
        return True
    # also accept "Name:" style label at line start
    label = re.compile(r"(?im)^\s*%s\s*:" % re.escape(name))
    return bool(label.search(response or ""))


def _check(op: str, arg: Any, response: str,
           tools_called: List[str]) -> Tuple[bool, str]:
    """Evaluate one check.

    Returns ``(passed, problem)``. ``problem`` is non-empty only when the check
    itself is malformed (e.g. an unparseable regex) rather than simply unmet —
    the two need opposite fixes, so they must not look alike in the rationale.
    """
    r = response or ""
    if op == "section_present":
        return _section_present(r, str(arg)), ""
    if op == "regex":
        try:
            return bool(re.search(str(arg), r)), ""
        except re.error as exc:
            # A malformed pattern can never match, so it would fail every
            # rollout forever and read exactly like a model that never
            # complies. Surface it instead of hiding it behind a False.
            return False, f"invalid regex ({exc})"
    if op == "max_chars":
        return len(r) <= int(arg), ""
    if op == "min_chars":
        return len(r) >= int(arg), ""
    if op == "contains":
        return str(arg).lower() in r.lower(), ""
    if op == "tool_called":
        name = str(arg).lower()
        if any(name == t.lower() for t in tools_called):
            return True, ""
        # single-shot approximation: the agent emits an explicit marker
        return bool(re.search(r"(?i)\btool_call\s*:\s*%s\b" % re.escape(name), r)), ""
    # unknown op: do not block
    return True, ""


KNOWN_OPS = frozenset({
    "section_present", "regex", "max_chars", "min_chars", "contains", "tool_called",
})


def validate_checks(judge: Any) -> Tuple[List[str], List[str]]:
    """Return ``(errors, warnings)`` for a rule judge's checks.

    An *error* means the check can never behave as written — a regex that does
    not compile always scores 0.0, which is indistinguishable from a model that
    never complies. A *warning* means the check is accepted but toothless, e.g.
    an unknown op, which :func:`_check` deliberately lets pass.
    """
    errors: List[str] = []
    warnings: List[str] = []
    if judge is not None and not isinstance(judge, dict):
        return [f"judge must be an object, got {type(judge).__name__}"], warnings
    checks = (judge or {}).get("checks", []) or []
    if not isinstance(checks, list):
        return [f"judge 'checks' must be an array, got {type(checks).__name__}"], warnings
    for i, c in enumerate(checks):
        if not isinstance(c, dict):
            errors.append(f"check #{i} is not an object")
            continue
        op = c.get("op", "")
        arg = c.get("arg")
        if not isinstance(op, str):
            errors.append(
                f"check #{i} op must be a string, got {type(op).__name__}"
            )
            continue
        if op in {"regex", "section_present", "contains", "tool_called"} and (
            arg is None or not str(arg).strip()
        ):
            errors.append(f"check #{i} {op} needs a non-empty arg")
            continue
        if op == "regex":
            try:
                re.compile(str(arg))
            except re.error as exc:
                errors.append(f"check #{i} regex does not compile ({exc}): {arg!r}")
        elif op in {"max_chars", "min_chars"}:
            try:
                if isinstance(arg, bool):
                    raise ValueError
                if isinstance(arg, int):
                    bound = arg
                elif isinstance(arg, float):
                    if not arg.is_integer():
                        raise ValueError
                    bound = int(arg)
                elif isinstance(arg, str) and re.fullmatch(
                    r"[+-]?\d+", arg.strip()
                ):
                    bound = int(arg.strip())
                else:
                    raise ValueError
            except (OverflowError, TypeError, ValueError):
                errors.append(f"check #{i} {op} needs an integer arg, got {arg!r}")
            else:
                if bound < 0:
                    errors.append(f"check #{i} {op} cannot be negative, got {bound}")
                elif op == "min_chars" and bound == 0:
                    warnings.append(f"check #{i} min_chars=0 always passes")
        elif op not in KNOWN_OPS:
            warnings.append(f"check #{i} has unknown op {op!r} — it always passes")
    return errors, warnings


def score_rule_judge(
    judge: Dict[str, Any],
    response: str,
    tools_called: List[str] | None = None,
) -> Tuple[float, float, str]:
    """Return (hard, soft, rationale) for a gbrain-style rule judge."""
    checks = (judge or {}).get("checks", []) or []
    if not checks:
        return 0.0, 0.0, "no checks"
    tools_called = tools_called or []
    passed = 0
    failed_desc: List[str] = []
    for c in checks:
        ok, problem = _check(c.get("op", ""), c.get("arg"), response, tools_called)
        if ok:
            passed += 1
        else:
            desc = f"{c.get('op')}={c.get('arg')}"
            if problem:
                desc += f" [{problem}]"
            failed_desc.append(desc)
    soft = passed / len(checks)
    hard = 1.0 if passed == len(checks) else 0.0
    rationale = "all checks passed" if hard else "failed: " + ", ".join(failed_desc)
    return hard, soft, rationale
