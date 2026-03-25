# /preview — Start Dev Server & Open Browser

## Trigger
User runs `/preview` or asks to preview the project.

## Steps
1. Check if port 3000 is already in use
2. If not running, start `node server.js` in background
3. Wait for server to respond (curl health check)
4. Open http://localhost:3000 in browser
5. Confirm server is live

## Notes
- Server runs on port 3000
- Static site served via Express (server.js)
- No build step required
