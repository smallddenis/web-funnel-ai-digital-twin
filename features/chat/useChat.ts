"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/shared/lib/session";
import { trackEvent } from "@/shared/lib/track";
import type { ChatMessage, AnalysisResult } from "@/types";

const ANALYSIS_TRIGGER = 5;

export function useChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [name, setName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("quiz_data");
    const userName = data ? JSON.parse(data).name : "";
    setName(userName);
    trackEvent(getSessionId(), "chat_opened");
    setMessages([
      {
        role: "assistant",
        content: `Hi${userName ? ` ${userName}` : ""}! I'm your AI twin. I'd love to help you reflect on your experiences. Think about the last time you felt stressed — what was happening? Take your time, there's no rush.`,
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    trackEvent(getSessionId(), "message_sent", { messageNumber: newCount });

    if (newCount >= ANALYSIS_TRIGGER) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages, analyze: true }),
        });
        const data = await res.json();
        setAnalysis(data);
        setShowAnalysis(true);
        trackEvent(getSessionId(), "analysis_shown");
      } catch (e) {
        console.error("Analysis failed:", e);
      }
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "I'm having trouble connecting. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const goToPaywall = () => {
    trackEvent(getSessionId(), "paywall_view");
    router.push("/paywall");
  };

  return {
    messages,
    input,
    setInput,
    loading,
    userMsgCount,
    analysis,
    showAnalysis,
    name,
    messagesEndRef,
    sendMessage,
    goToPaywall,
    analysisThreshold: ANALYSIS_TRIGGER,
  };
}
