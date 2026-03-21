"use client";

import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { AnalysisModal } from "./AnalysisModal";

export function ChatFeature() {
  const {
    messages,
    input,
    setInput,
    loading,
    userMsgCount,
    analysis,
    showAnalysis,
    messagesEndRef,
    sendMessage,
    goToPaywall,
    analysisThreshold,
  } = useChat();

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
            {userMsgCount < analysisThreshold
              ? `${analysisThreshold - userMsgCount} messages until your analysis`
              : "Analysis ready"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-card-bg/50 border-x border-card-border p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && <TypingIndicator />}
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

      {showAnalysis && analysis && (
        <AnalysisModal analysis={analysis} onContinue={goToPaywall} />
      )}
    </div>
  );
}
