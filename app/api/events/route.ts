import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rateLimit";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { desc } from "drizzle-orm";

const eventSchema = z.object({
  sessionId: z.string().uuid("sessionId must be a valid UUID"),
  eventType: z.string().min(1).max(50),
  payload: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  const rl = rateLimit(`events:${ip}`, { limit: 120, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = eventSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const { sessionId, eventType, payload } = result.data;

  try {
    await db.insert(events).values({
      sessionId,
      eventType,
      payload: payload ? JSON.stringify(payload) : null,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[events] Database insert failed:", e);
    return NextResponse.json({ error: "Failed to store event" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allEvents = await db.select().from(events).orderBy(desc(events.createdAt));
    return NextResponse.json(allEvents);
  } catch (e) {
    console.error("[events] Database query failed:", e);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
