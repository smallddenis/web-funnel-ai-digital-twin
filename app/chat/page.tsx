"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/session";
import { trackEvent } from "@/lib/track";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Analysis {
  stressLevel: string;
  mainThemes: string[];
  emotionalPatterns: string;
  copingStrategies: string;
  recommendation: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");

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

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    trackEvent(getSessionId(), "message_sent", { messageNumber: newCount });

    // After 5 user messages, trigger analysis
    if (newCount >= 5) {
      try {
        const analysisRes = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages, analyze: true }),
        });
        const analysisData = await analysisRes.json();
        setAnalysis(analysisData);
        setShowAnalysis(true);
        trackEvent(getSessionId(), "analysis_shown");
      } catch (e) {
        console.error("Analysis failed:", e);
      }
      setLoading(false);
      return;
    }

    // Normal chat response
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

  return (
    <div className="w-full max-w-2xl h-[90vh] flex flex-col">
      {/* Header */}
      <div className="bg-card-bg border border-card-border rounded-t-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold">Your AI Twin</h2>
          <p className="text-xs text-foreground/50">
            {userMsgCount < 5
              ? `${5 - userMsgCount} messages until your analysis`
              : "Analysis ready"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-card-bg/50 border-x border-card-border p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-card-bg border border-card-border rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-card-bg border border-card-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-card-bg border border-card-border rounded-b-2xl p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-input-bg border border-input-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition"
            disabled={loading || showAnalysis}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading || showAnalysis}
            className="px-4 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white rounded-xl transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Analysis Modal */}
      {showAnalysis && analysis && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">Your AI Analysis</h2>
            <p className="text-foreground/60 mb-6">
              Based on our conversation, here&apos;s what your AI twin observed:
            </p>

            <div className="space-y-4">
              {/* Stress Level */}
              <div className="p-4 rounded-xl bg-input-bg border border-input-border">
                <div className="text-sm text-foreground/50 mb-1">Stress Level</div>
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    analysis.stressLevel === "high" ? "bg-red-400" :
                    analysis.stressLevel === "medium" ? "bg-yellow-400" : "bg-green-400"
                  }`} />
                  <span className="font-semibold capitalize">{analysis.stressLevel}</span>
                </div>
              </div>

              {/* Themes */}
              <div className="p-4 rounded-xl bg-input-bg border border-input-border">
                <div className="text-sm text-foreground/50 mb-2">Main Themes</div>
                <div className="flex flex-wrap gap-2">
                  {analysis.mainThemes.map((theme, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Patterns */}
              <div className="p-4 rounded-xl bg-input-bg border border-input-border">
                <div className="text-sm text-foreground/50 mb-1">Emotional Patterns</div>
                <p className="text-sm">{analysis.emotionalPatterns}</p>
              </div>

              {/* Coping */}
              <div className="p-4 rounded-xl bg-input-bg border border-input-border">
                <div className="text-sm text-foreground/50 mb-1">Coping Strategies</div>
                <p className="text-sm">{analysis.copingStrategies}</p>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                <div className="text-sm text-accent mb-1">Key Recommendation</div>
                <p className="text-sm font-medium">{analysis.recommendation}</p>
              </div>
            </div>

            <button
              onClick={() => {
                trackEvent(getSessionId(), "paywall_view");
                router.push("/paywall");
              }}
              className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition"
            >
              Unlock Full Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
