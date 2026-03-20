import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  eventType: text("event_type").notNull(),
  payload: text("payload"), // JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
