# /refresh — Refresh Browser After Changes

## Trigger
User runs `/refresh` or after pushing code changes.

## Steps
1. Trigger browser refresh via AppleScript or open localhost URL
2. Confirm page is reloaded

## Notes
- Use after every code change when user has requested auto-refresh
- Command: `osascript -e 'tell application "System Events" to keystroke "r" using command down'`
- Fallback: `open http://localhost:3000`
