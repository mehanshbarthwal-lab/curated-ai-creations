# Integrating Universal Skills with OpenAI ChatGPT and Claude Projects

Learn how to use universal AI skills in ChatGPT Custom GPTs and Claude Projects.

## Using Skills with Custom GPTs

Custom GPTs allow you to define instructions and upload reference knowledge files.

### Step 1: Prepare Instructions
1. Open the target `SKILL.md` file.
2. Copy the body text below the YAML frontmatter.
3. In ChatGPT, navigate to **My GPTs** > **Create a GPT** > **Configure**.
4. Paste the instructions into the **Instructions** box.

### Step 2: Knowledge File Upload
If the skill includes reference files, templates, or helper documentation:
1. In the GPT configuration screen, navigate to **Knowledge**.
2. Upload the markdown files or JSON schemas as reference files.
3. Instruct the GPT to consult these reference files when triggered.

## Using Skills with Claude Projects

Claude Projects allow shared artifacts, persistent project knowledge, and custom instructions.

### Step 1: Project Knowledge
1. Create a new Claude Project.
2. In the **Project Knowledge** pane, upload the desired `SKILL.md` files.

### Step 2: Custom Instructions
In the **Set Project Instructions** area, add:
`Always follow the instructions defined in the attached skill files when handling matching tasks.`

## Web Interface Prompting (Standard Chat)
You can also use any skill in a standard chat window without setup:
1. Copy the skill markdown.
2. Paste it at the beginning of your conversation with the prompt:
   `Act as an expert adhering strictly to these guidelines: [paste skill here]`
