"use client";

import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          message.role === "user"
            ? "bg-primary text-white rounded-br-md"
            : "bg-card-bg border border-card-border rounded-bl-md"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
