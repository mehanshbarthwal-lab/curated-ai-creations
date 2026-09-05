# Integrating Universal Skills with OpenClaw and OpenAI Codex

Learn how to use universal AI skills in OpenClaw and OpenAI Codex environments.

## OpenClaw Setup

OpenClaw supports native skill directories in the `.openclaw/skills/` hierarchy.

### Installation
Copy the target skill directory into your OpenClaw skills folder:

```bash
mkdir -p .openclaw/skills
cp -r skills/ponytail .openclaw/skills/
```

OpenClaw automatically parses YAML frontmatter and registers the available skills.

### Execution
OpenClaw routes user requests through registered skill tools. When a prompt matches declared triggers, OpenClaw activates the corresponding skill workflow.

## OpenAI Codex Environment

In Codex or command execution environments:
1. Load the skill instructions into the system context.
2. Execute accompanying Python or shell scripts through standard terminal commands.
3. Use the full output enforcement skill to avoid code truncation when generating complete application files.
