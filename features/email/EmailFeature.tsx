"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSessionId } from "@/shared/lib/session";
import { trackEvent } from "@/shared/lib/track";
import { validateEmail } from "./validateEmail";

export function EmailFeature() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("quiz_data");
    if (data) setName(JSON.parse(data).name || "");
  }, []);

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
    <div className="w-full max-w-md animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      {/* Icon */}
      <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(58,124,255,0.15)]">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>

      <h1 className="text-[2.1rem] font-semibold leading-[1.2] tracking-[-0.02em] mb-3 text-foreground">
        {name ? `Almost there, ${name}` : "Almost there"}
      </h1>
      <p className="text-muted-foreground text-[15px] mb-10 leading-relaxed">
        Save your profile and unlock your AI twin.
        No spam — ever.
      </p>

      <div className="space-y-2 mb-5">
        <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-[0.1em]">
          Email address
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="you@example.com"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className={error ? "border-destructive/50 focus-visible:border-destructive/70" : ""}
        />
        {error && (
          <p className="text-destructive/80 text-xs mt-1">{error}</p>
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={!email.trim()}>
        Continue to my twin
      </Button>

      <p className="text-muted-foreground/50 text-xs text-center mt-5">
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
