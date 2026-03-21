export async function trackEvent(
  sessionId: string,
  eventType: string,
  payload?: Record<string, unknown>
) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, eventType, payload }),
    });
  } catch (e) {
    console.error("Failed to track event:", e);
  }
}
