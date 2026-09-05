# Integrating Universal Skills with Ollama, LangChain, and Local Models

Learn how to use universal AI skills with local language models, Ollama, LangChain, and CrewAI.

## Using with Ollama and Modelfiles

You can bake any universal skill directly into a custom Ollama model.

### Step 1: Create a Modelfile
Create a file named `Modelfile`:

```dockerfile
FROM qwen2.5-coder:14b

SYSTEM """
You are an expert AI software engineer equipped with specialized skills.
Follow these operational guidelines strictly:

[Insert contents of SKILL.md here]
"""
```

### Step 2: Build the Custom Model
Run the Ollama create command:

```bash
ollama create my-custom-agent -f ./Modelfile
```

### Step 3: Run Your Agent
Start chatting with your custom skilled model:

```bash
ollama run my-custom-agent
```

## Using with LangChain and LlamaIndex

In Python workflows:

```python
from pathlib import Path
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama

skill_text = Path("skills/karpathy-guidelines/SKILL.md").read_text(encoding="utf-8")

prompt = ChatPromptTemplate.from_messages([
    ("system", f"You must adhere to this skill specification:\n\n{skill_text}"),
    ("human", "{input}")
])

llm = ChatOllama(model="qwen2.5-coder:14b")
chain = prompt | llm

response = chain.invoke({"input": "Review this implementation"})
print(response.content)
```

## Using with CrewAI
Pass the skill instructions as the `backstory` or `goal` parameter when defining a CrewAI Agent to enforce disciplined execution.
