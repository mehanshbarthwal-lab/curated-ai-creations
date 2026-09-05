# Integrating Universal Skills with Google Antigravity

Learn how to configure universal AI skills in Google Antigravity and Gemini CLI.

## How Antigravity Discovers Skills

Antigravity natively discovers skills defined in markdown files with frontmatter containing `name` and `description`.

### Workspace Discovery
Place the skill inside your workspace under a `skills/` directory:

```
your-workspace/
├── skills/
│   ├── humanizer/
│   │   └── SKILL.md
│   └── taste-skill/
│       └── SKILL.md
```

Antigravity automatically detects all valid `SKILL.md` files during initialization and exposes them to the model.

### Global Agent Skills Directory
You can also place skills in the shared global directory:
* Default Path: `F:\Agent Skills\`

Antigravity scans this folder and activates available skills based on trigger terms present in user prompts.

## Activating Skills
Antigravity automatically loads the relevant skill when prompt keywords match the skill triggers. You can also explicitly instruct the agent:
`Use the humanizer skill on this article.`
