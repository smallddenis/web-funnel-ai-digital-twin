"use client";

import { useState, useEffect } from "react";

interface EventRow {
  id: number;
  sessionId: string;
  eventType: string;
  payload: string | null;
  createdAt: string;
}

export default function DebugEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      console.error("Failed to fetch events:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Event Log</h1>
          <p className="text-foreground/50 text-sm">{events.length} events recorded</p>
        </div>
        <button
          onClick={fetchEvents}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading events...</p>
          </div>
        </div>
      )}

      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-foreground/50 text-left">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Session ID</th>
                <th className="px-4 py-3 font-medium">Event Type</th>
                <th className="px-4 py-3 font-medium">Payload</th>
                <th className="px-4 py-3 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-foreground/50">
                    No events recorded yet. Complete the funnel to see events here.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="border-b border-card-border/50 hover:bg-input-bg/50">
                    <td className="px-4 py-3 text-foreground/50">{event.id}</td>
                    <td className="px-4 py-3 font-mono text-xs">{event.sessionId.slice(0, 8)}...</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-foreground/60 max-w-xs truncate">
                      {event.payload || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground/50 text-xs">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
