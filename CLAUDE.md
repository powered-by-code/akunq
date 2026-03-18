# Claude Code Rules

> **IMPORTANT**

## Armenian Text

**ALWAYS** use a subagent with `model: "sonnet"` (Claude 3.5 Sonnet) for ANY task that involves reading, writing, or modifying Armenian text strings — including translation.json, UI components, or any other file.

**Never** write, copy, or edit Armenian characters directly in the main context. If the task touches Armenian text at all, delegate the entire edit to the subagent.
