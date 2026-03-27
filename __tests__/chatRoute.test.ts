import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/rateLimit", () => ({
  rateLimit: () => ({ allowed: true, remaining: 29, resetAt: Date.now() + 60_000 }),
}));

vi.stubEnv("GROQ_API_KEY", "");

async function makeRequest(body: unknown) {
  const { POST } = await import("@/app/api/chat/route");
  const req = new NextRequest("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return POST(req);
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns 400 for invalid JSON body", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when messages array is missing", async () => {
    const res = await makeRequest({ analyze: false });
    expect(res.status).toBe(400);
  });

  it("returns 400 when messages is empty", async () => {
    const res = await makeRequest({ messages: [] });
    expect(res.status).toBe(400);
  });

  it("returns 400 when message content exceeds 2000 chars", async () => {
    const res = await makeRequest({
      messages: [{ role: "user", content: "x".repeat(2001) }],
    });
    expect(res.status).toBe(400);
  });

  it("returns deterministic response when no GROQ_API_KEY", async () => {
    const res = await makeRequest({
      messages: [{ role: "user", content: "I feel stressed at work." }],
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("content");
    expect(typeof data.content).toBe("string");
  });

  it("returns deterministic analysis when no GROQ_API_KEY and analyze=true", async () => {
    const res = await makeRequest({
      messages: [{ role: "user", content: "I am so stressed and anxious." }],
      analyze: true,
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("stressLevel");
    expect(["low", "medium", "high"]).toContain(data.stressLevel);
    expect(data).toHaveProperty("mainThemes");
    expect(data).toHaveProperty("recommendation");
  });
});
