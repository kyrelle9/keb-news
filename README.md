# KEB News

KEB News is a minimal, elegant homepage for the latest AI and tech coverage. It pulls from free public RSS feeds plus the official Hacker News API, then presents the stories in a clean editorial layout with live search and section filters.

## Stack

- Next.js 16 App Router
- TypeScript
- Plain CSS
- `rss-parser`

## Source mix

- OpenAI News
- VentureBeat AI
- WIRED AI
- TechCrunch
- MIT Technology Review
- Ars Technica
- The Verge
- Google Blog
- Hacker News API

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## API

The homepage payload is also available as JSON at:

```text
/api/news
```
