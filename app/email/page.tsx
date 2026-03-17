"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/session";
import { trackEvent } from "@/lib/track";

export default function EmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("quiz_data");
    if (data) {
      setName(JSON.parse(data).name || "");
    }
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    localStorage.setItem("user_email", email);
    trackEvent(getSessionId(), "email_submitted", { email });
    router.push("/chat");
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-card-bg border border-card-border rounded-2xl p-8">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">
          {name ? `Great choices, ${name}!` : "Almost there!"}
        </h1>
        <p className="text-foreground/60 mb-6 text-center">
          Enter your email to save your progress and start chatting with your AI twin.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={!email.trim()}
          className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
        >
          Continue to Chat
        </button>

        <p className="text-foreground/30 text-xs text-center mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
}
