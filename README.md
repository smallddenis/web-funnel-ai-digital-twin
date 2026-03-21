# AI Digital Twin — Web Funnel

A fullstack conversion funnel for an AI Digital Twin app built with Next.js 16, Neon PostgreSQL, Groq AI, and Tailwind CSS v4.

## Funnel Flow

1. **Intro** — Animated "take a deep breath" screen before the quiz
2. **Quiz** (6 steps) — Name → Twin preview → Personality → Therapy style → Goal → Reflection frequency
3. **Email Capture** — Validated email collection
4. **Chat Interface** — AI-powered conversation with your digital twin
5. **AI Analysis** (after 5 messages) — Popup with stress level, themes, patterns, and recommendations
6. **Paywall** — Subscription plans (demo, no real payments)

## Tech Stack

- **Next.js 16** (App Router) — fullstack React framework
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling with custom CSS variables
- **Radix UI + CVA** — accessible UI primitives and variant components
- **Drizzle ORM + Neon** — serverless PostgreSQL
- **Groq API** (`llama-3.3-70b-versatile`) — AI chat & analysis (falls back to deterministic responses)

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

## Environment Variables

Create `.env.local`:

```bash
# Required — Neon PostgreSQL connection string
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require

# Optional — enables AI-powered chat (falls back to deterministic if missing)
GROQ_API_KEY=your-groq-key-here
```

## AI Chat

The chat works in two modes:

- **With Groq API** — real AI conversations via `llama-3.3-70b-versatile`
- **Without API key** — deterministic context-aware responses (fully functional)

After 5 messages the analysis popup triggers automatically, also with a deterministic fallback (keyword matching on stress/anxiety/worry signals).

## Event Tracking

All funnel events are stored in Neon PostgreSQL and viewable at `/debug/events`:

| Event | Description |
|-------|-------------|
| `quiz_start` | User opens the quiz |
| `quiz_submit` | User completes the quiz (payload: answers) |
| `email_submitted` | User submits their email |
| `chat_opened` | User enters the chat |
| `message_sent` | User sends a chat message (payload: message count) |
| `analysis_shown` | AI analysis popup is displayed |
| `paywall_view` | User reaches the paywall |

## Project Structure

```
app/
├── page.tsx                  # Entry — renders QuizFeature
├── layout.tsx                # Root layout with branding & decorative circles
├── globals.css               # Tailwind v4 config, CSS variables, keyframes
├── email/page.tsx            # Email capture
├── chat/page.tsx             # Chat interface + analysis popup
├── paywall/page.tsx          # Paywall screen
├── debug/events/page.tsx     # Event log viewer
└── api/
    ├── chat/route.ts         # POST: chat messages & analysis (Groq)
    └── events/route.ts       # POST/GET: event tracking (PostgreSQL)

features/
├── quiz/
│   ├── QuizFeature.tsx       # Orchestrator with animated intro + step routing
│   ├── useQuiz.ts            # Quiz state hook
│   ├── constants.ts          # Personality / therapy / goal / frequency options
│   └── steps/
│       ├── NameStep.tsx
│       ├── PreviewStep.tsx   # AI twin preview (after name)
│       ├── ChoiceStep.tsx    # Reusable for personality, therapy, goal
│       └── FrequencyStep.tsx
├── email/
│   ├── EmailFeature.tsx
│   └── validateEmail.ts
├── chat/
│   ├── ChatFeature.tsx
│   ├── AnalysisModal.tsx
│   ├── ChatMessage.tsx
│   └── TypingIndicator.tsx
└── paywall/
    ├── PaywallFeature.tsx
    ├── PricingCard.tsx
    └── constants.ts          # Plan definitions

components/
└── ui/
    ├── button.tsx            # CVA-based button variants
    ├── input.tsx
    └── badge.tsx

shared/
├── lib/
│   ├── session.ts            # UUID session ID (localStorage)
│   └── track.ts              # Client-side event tracking
└── ui/
    └── DecorCircle.tsx       # Decorative breathing background circle

lib/
├── db.ts                     # Drizzle ORM + Neon connection
├── schema.ts                 # Events table schema
└── utils.ts                  # cn() helper (clsx + tailwind-merge)
```
