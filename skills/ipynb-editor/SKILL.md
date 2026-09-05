---
name: ipynb-editor
description: Safely edit, read, and patch Jupyter Notebook (.ipynb) cells without breaking their JSON structure. MUST USE whenever you need to modify a Jupyter notebook file.
---

# Jupyter Notebook Editor (ipynb-editor)

This skill enables you to safely read and edit Jupyter Notebooks (`.ipynb`) without corrupting their underlying JSON structure. Because AI text-replacement tools are explicitly blocked from modifying `.ipynb` files directly, **you MUST use the provided `notebook_editor.py` script via terminal commands** to interact with notebooks.

## Script Location
The editor script is located in the scripts folder:
`<skill-directory>/scripts/notebook_editor.py`

## Commands

Always use the `run_command` tool to execute these actions. 

### 1. List Cells
View the notebook structure, including cell indices, types, and length.
```bash
python "<skill-directory>/scripts/notebook_editor.py" list <notebook.ipynb>
```

### 2. Read a Cell
Read the contents of a specific cell (with line numbers, helpful for patching).
```bash
python "<skill-directory>/scripts/notebook_editor.py" read <notebook.ipynb> <cell_index> --numbered
```

### 3. Update a Cell Completely
Replace the entire contents of a cell. (You must first write the new content to a temporary `.py` file, then update the cell from that file).
```bash
python "<skill-directory>/scripts/notebook_editor.py" update <notebook.ipynb> <cell_index> --from-file <temp_file.py>
```

### 4. Patch Specific Lines in a Cell
Replace only specific lines inside a cell (most efficient for small changes). First write the replacement lines to a temporary file.
```bash
python "<skill-directory>/scripts/notebook_editor.py" patch <notebook.ipynb> <cell_index> --lines <start_line>-<end_line> --from-file <patch.py>
```

### 5. Search Notebook
Find a specific string or function across the entire notebook.
```bash
python "<skill-directory>/scripts/notebook_editor.py" search <notebook.ipynb> "import torch"
```

## Workflow Example
1. Use `search` or `list` to find the target cell index.
2. Use `read <index> --numbered` to see the exact lines you need to change.
3. Use the `write_to_file` tool to write your modified code into a temporary scratch file (e.g., `temp_edit.py`).
4. Use `run_command` to execute the `update` or `patch` command, pointing to your temporary file.
5. Delete the temporary file.
