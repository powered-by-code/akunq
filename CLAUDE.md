# Claude Code Rules

## Armenian Text

When editing Armenian text (translation files, UI strings), use Python scripts via Bash to read/extract/insert the text programmatically. Do not attempt to type or copy Armenian characters directly — they get corrupted in the LLM context.

## Images

Always convert images to WebP before using them. Use Python/Pillow: `img.save(path, 'WEBP', quality=80)`. Delete the original after conversion.
