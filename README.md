# AI Digital Twin — Web Funnel

A fullstack web funnel for an AI Digital Twin application built with Next.js 15, SQLite, and Tailwind CSS.

## Funnel Flow

1. **Quiz** (5 steps) — Name, AI personality, therapy style, personal goal, self-reflection frequency
2. **Email Capture** — Validated email collection
3. **Chat Interface** — AI-powered conversational experience with your digital twin
4. **AI Analysis** (after 5 messages) — Structured popup with stress level, themes, patterns, and recommendations
5. **Paywall** — Subscription plans (demo, no real payments)

## Tech Stack

- **Next.js 15** (App Router) — fullstack React framework
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling
- **Drizzle ORM + SQLite** — lightweight persistent storage
- **Claude API** (optional) — AI chat & analysis (falls back to deterministic responses)

## Getting Started

```bash
# Install dependencies
npm install

# Push database schema
npx drizzle-kit push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start the funnel.

## AI Chat

The chat works in two modes:

- **With Claude API**: Set `ANTHROPIC_API_KEY` in `.env.local` for real AI conversations
- **Without API key**: Uses deterministic responses (fully functional, no API needed)

```bash
# Optional: enable AI-powered chat
echo "ANTHROPIC_API_KEY=your-key-here" > .env.local
```

## Event Tracking

All funnel events are tracked in SQLite and viewable at `/debug/events`:

| Event | Description |
|-------|-------------|
| `quiz_start` | User opens the quiz |
| `quiz_submit` | User completes the quiz |
| `email_submitted` | User submits their email |
| `chat_opened` | User enters the chat |
| `message_sent` | User sends a chat message |
| `analysis_shown` | AI analysis popup is displayed |
| `paywall_view` | User reaches the paywall |

## Project Structure

```
app/
├── page.tsx              # Quiz (5-step funnel)
├── email/page.tsx        # Email capture
├── chat/page.tsx         # Chat interface + analysis popup
├── paywall/page.tsx      # Paywall screen
├── debug/events/page.tsx # Event log viewer
├── api/
│   ├── events/route.ts   # POST/GET events
│   └── chat/route.ts     # Chat + analysis API
lib/
├── db.ts                 # Database connection
├── schema.ts             # Drizzle schema
├── session.ts            # Session ID management
└── track.ts              # Client-side event tracking
```
