# Claude Code Rules

## Armenian Text

Armenian characters get corrupted when typed directly in the LLM context. Always use Python scripts via Bash:

- **Moving existing text** between files: use Python to read the source file, extract the string (regex or JSON parse), and write it to the target file.
- **Writing new Armenian text**: use Unicode escape sequences (`\u0531`, `\u0561`, etc.) in Python string literals, then write to the file via `json.dump(ensure_ascii=False)` or `f.write()`. The file will contain readable Armenian characters.

## Images

Always convert images to WebP before using them. Use Python/Pillow: `img.save(path, 'WEBP', quality=80)`. Delete the original after conversion.
