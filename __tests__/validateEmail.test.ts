import { describe, it, expect } from "vitest";
import { validateEmail } from "@/features/email/validateEmail";

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("user.name+tag@sub.domain.org")).toBe(true);
    expect(validateEmail("user@example.co.uk")).toBe(true);
  });

  it("rejects missing @ symbol", () => {
    expect(validateEmail("notanemail")).toBe(false);
  });

  it("rejects missing domain", () => {
    expect(validateEmail("user@")).toBe(false);
  });

  it("rejects missing TLD", () => {
    expect(validateEmail("user@domain")).toBe(false);
  });

  it("rejects emails over 254 characters", () => {
    const longLocal = "a".repeat(244);
    expect(validateEmail(`${longLocal}@example.com`)).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateEmail("")).toBe(false);
  });

  it("rejects email with spaces", () => {
    expect(validateEmail("user @example.com")).toBe(false);
  });

  it("trims surrounding whitespace before validating", () => {
    expect(validateEmail("  user@example.com  ")).toBe(true);
  });
});
