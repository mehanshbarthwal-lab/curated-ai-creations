# Integrating Universal Skills with Cursor IDE

Learn how to use universal AI skills in Cursor IDE.

## Installation Methods

Cursor uses rule files to direct AI behavior. You can adopt any skill as a project rule or global rule.

### Method 1: Project Cursor Rules Directory
Cursor reads rules from `.cursor/rules/`:

1. In your repository, create the directory: `.cursor/rules/`
2. Copy the desired skill file or convert its content to a `.mdc` file:
   ```bash
   cp skills/humanizer/SKILL.md .cursor/rules/humanizer.mdc
   ```
3. In Cursor settings, confirm that project rules are enabled.

### Method 2: Global Cursor Rules
1. Open Cursor Settings (Settings > Rules for AI).
2. Paste the core instructions from the skill into the global user rules text area.

### Method 3: Direct Workspace Reference
You can maintain the entire `skills/` directory at the root of your workspace and prompt Cursor by typing:
`@skills/taste-skill/skills/design-taste-frontend/SKILL.md Apply this design system to the navbar.`

## Best Practices in Cursor
* Assign specific file globs in the rule header so the rule applies automatically to relevant file extensions.
* Reference skill companion scripts using terminal execution commands when debugging.
