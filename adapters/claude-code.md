# Integrating Universal Skills with Claude Code

Learn how to install and activate universal AI skills in Anthropic Claude Code.

## Quick Installation

You can install any skill into your project or globally for Claude Code.

### Option 1: Project Level Installation
Place the skill directory inside your project folder under `.claude/skills/`:

```bash
mkdir -p .claude/skills
cp -r path/to/skill .claude/skills/
```

Claude Code automatically discovers `SKILL.md` files located in `.claude/skills/` during workspace initialization.

### Option 2: Global Configuration
To make a skill available across all your projects in Claude Code, place the skill inside your global configuration directory:

* Windows: `%USERPROFILE%\.claude\skills\`
* macOS and Linux: `~/.claude/skills/`

### Option 3: Direct Reference in CLAUDE.md
You can link any skill directly inside your project `CLAUDE.md` file:

```markdown
# Project Guidelines

When performing code reviews, refer to the guidelines in:
./skills/karpathy-guidelines/SKILL.md
```

## How Claude Code Executes Skills
1. When you prompt Claude Code with a trigger phrase, it consults the skill instructions.
2. If the skill contains executable scripts or references, Claude Code invokes them directly in terminal.
3. Instructions defined in the skill override generic default model behaviors.
