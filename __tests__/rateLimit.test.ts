import { describe, it, expect, vi, beforeEach } from "vitest";
import { rateLimit } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("allows requests within the limit", () => {
    const key = "test-key-1";
    const result = rateLimit(key, { limit: 3, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests exceeding the limit", () => {
    const key = "test-key-2";
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    rateLimit(key, { limit: 2, windowMs: 60_000 });
    const result = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("resets after window expires", () => {
    const key = "test-key-3";
    rateLimit(key, { limit: 1, windowMs: 1_000 });
    rateLimit(key, { limit: 1, windowMs: 1_000 }); // blocked

    vi.advanceTimersByTime(1_100);

    const result = rateLimit(key, { limit: 1, windowMs: 1_000 });
    expect(result.allowed).toBe(true);
  });

  it("tracks different keys independently", () => {
    rateLimit("key-a", { limit: 1, windowMs: 60_000 });
    rateLimit("key-a", { limit: 1, windowMs: 60_000 }); // key-a blocked

    const result = rateLimit("key-b", { limit: 1, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
  });
});
