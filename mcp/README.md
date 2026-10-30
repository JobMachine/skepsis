# Skepsis MCP server

Learn Greek roots, myths and big ideas through your AI agent. Your agent becomes the tutor: it teaches a card, asks one question at a time, grades your reply, and brings missed words back with spaced review. It's the same course, streaks and XP as the [Skepsis web app](https://skepsis-greek.vercel.app).

Needs Node 18 or newer. Nothing to sign up for.

## Install

**Claude Code**
```bash
claude mcp add skepsis -- npx -y github:ionpetro/skepsis
```

**Claude Desktop**: add this to `claude_desktop_config.json` (Settings › Developer › Edit Config):
```json
{
  "mcpServers": {
    "skepsis": { "command": "npx", "args": ["-y", "github:ionpetro/skepsis"] }
  }
}
```

**Cursor**: add the same block to `~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project).

**From a clone**
```bash
git clone https://github.com/ionpetro/skepsis && cd skepsis && npm install
node mcp/server.js        # stdio server; point your client's command at this
```

Then ask your agent: *"Run my daily Skepsis lesson"*, or use the `daily_lesson` prompt.

## Tools

| Tool | What it does | Example |
|---|---|---|
| `list_course` | Units and lessons with done / open / locked status | "What's left in the course?" |
| `start_lesson` | Starts the next lesson (or `lesson_id` like `u3l1`, or a roundup like `u3-review`). Returns cards to teach and the first question | "Start my next lesson" |
| `answer` | Grades a reply (`1`, the option text, `tele phone` for build questions, `1b 2a 3d` for matching) and returns the next question or the summary | "3" |
| `review` | Spaced review of due or weak words (1, 3, 7, 14, 30 days) | "Quiz me on what I've learned" |
| `explain` | Card for a root, idea, myth or word origin | "Explain hubris" |
| `break_down_word` | Spots Greek roots inside any English word | "Break down dermatologist" |
| `root_of_the_day` | Same pick for everyone each day, good for a team standup | "What's today's root?" |
| `progress` | XP, streak, freezes, words learned, due count, badges | "How am I doing?" |

There is also a prompt, `daily_lesson`, and a resource, `skepsis://course` (the whole course as JSON).

## Your progress
Progress is saved in `~/.skepsis/progress.json` on your machine. Set `SKEPSIS_HOME` to keep it somewhere else. Weekends never break a streak. A lesson in progress lives only while the server runs; finished lessons, XP and review schedules are saved after every answer.

## Develop
```bash
npm test     # app checks + end-to-end MCP tests (spawns the server over stdio)
```
