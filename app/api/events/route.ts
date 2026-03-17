import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, eventType, payload } = body;

  if (!sessionId || !eventType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await db.insert(events).values({
    sessionId,
    eventType,
    payload: payload ? JSON.stringify(payload) : null,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const allEvents = await db.select().from(events).orderBy(desc(events.createdAt));
  return NextResponse.json(allEvents);
}
