"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PreviewStepProps {
  name: string;
  onNext: () => void;
}

/* ── tiny subcomponents for the app mockups ─────────────────────── */
function TopBar() {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
      {/* logo */}
      <div className="w-4 h-4 rounded-[4px] bg-primary/80 flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M4 1L7 2.5V5.5L4 7L1 5.5V2.5L4 1Z" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] rounded-full px-1.5 py-0.5">
          <span className="text-[7px]">⚡</span>
          <span className="text-[7px] text-white/40">0</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">Z</span>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const tabs = ["Routines", "Growth", "Twin", "Memory", "Readings"];
  return (
    <div className="flex justify-around items-end px-1 pb-2.5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
      {tabs.map((tab) => (
        <div key={tab} className="flex flex-col items-center gap-0.5">
          <div className={cn(
            "w-3.5 h-3 rounded-sm",
            tab === active ? "bg-white/85" : "bg-white/12"
          )} />
          <span className={cn(
            "text-[5.5px]",
            tab === active ? "text-white/85" : "text-white/22"
          )}>
            {tab}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Twin/Chat screen ─────────────────────────────────────────────── */
function TwinScreen() {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] overflow-hidden bg-[#07090e] flex flex-col">
      <TopBar />

      <div className="flex-1 px-3 py-4">
        {/* Heading */}
        <div className="text-center mb-3.5">
          <p className="text-[10px] font-semibold text-white leading-tight">
            What&apos;s circling<br />in your mind?
          </p>
          <p className="text-[7px] text-white/30 mt-0.5">Start with a thought</p>
        </div>

        {/* Input box */}
        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-xl px-2.5 py-2 mb-2">
          <p className="text-[7.5px] text-white/18 mb-2">Ask anything</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="bg-white/10 rounded-full px-1.5 py-0.5">
                <span className="text-[6px] text-white/70 font-medium">Chat</span>
              </div>
              <span className="text-[6px] text-white/25 py-0.5">Quiz</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full border border-white/15 flex items-center justify-center">
                <span className="text-[7px] text-white/30">📞</span>
              </div>
              <div className="w-3.5 h-3.5 rounded-full border border-white/15 flex items-center justify-center">
                <span className="text-[7px] text-white/30">🎤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion card */}
        <div className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] rounded-xl px-2 py-1.5 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[6.5px] text-white/75 font-medium leading-tight">Want to see how it works?</p>
            <p className="text-[6px] text-white/30">Try this one I chose for you</p>
          </div>
          <span className="text-[6.5px] text-primary/80 flex-shrink-0">Try</span>
        </div>
      </div>

      <BottomNav active="Twin" />
    </div>
  );
}

/* ── Routines screen ──────────────────────────────────────────────── */
function RoutinesScreen() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] overflow-hidden bg-[#07090e] flex flex-col">
      <TopBar />

      <div className="flex-1 px-2.5 py-3">
        {/* Week card */}
        <div className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] rounded-xl p-2.5 mb-2.5">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] font-semibold text-white">This week</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded border border-white/10 flex items-center justify-center">
                <span className="text-[6px] text-white/35">‹</span>
              </div>
              <div className="bg-[rgba(255,255,255,0.06)] rounded-full px-1.5 py-0.5">
                <span className="text-[6.5px] text-white/45">Today</span>
              </div>
              <div className="w-3 h-3 rounded border border-white/10 flex items-center justify-center">
                <span className="text-[6px] text-white/35">›</span>
              </div>
            </div>
          </div>

          {/* Days row */}
          <div className="flex justify-between mb-2">
            {days.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-[5.5px] text-white/22">{d}</span>
                <div className={cn(
                  "w-[18px] h-[18px] rounded-full flex items-center justify-center",
                  i === 5
                    ? "bg-primary shadow-[0_0_8px_rgba(58,124,255,0.6)]"
                    : "bg-[rgba(255,255,255,0.05)]"
                )}>
                  <span className={cn(
                    "text-[7px] font-medium",
                    i === 5 ? "text-white" : "text-white/35"
                  )}>
                    {16 + i}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[6.5px] text-white/35">Day progress</span>
              <span className="text-[6.5px] text-white/25">0/0</span>
            </div>
            <div className="h-[2px] bg-[rgba(255,255,255,0.05)] rounded-full" />
          </div>
        </div>

        <span className="text-[7.5px] text-white/22 pl-0.5">No events</span>
      </div>

      <BottomNav active="Routines" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function PreviewStep({ name, onNext }: PreviewStepProps) {
  return (
    <div className="animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      <h1 className="text-2xl font-semibold leading-snug tracking-[-0.02em] mb-2 text-foreground">
        Here&apos;s what&apos;s waiting{name ? `, ${name}` : ""}
      </h1>
      <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
        Your pocket AI twin — always ready to listen, reflect, and guide you.
      </p>

      {/* Side-by-side app mockups */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        <TwinScreen />
        <RoutinesScreen />
      </div>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2 mb-7">
        {["AI Twin Chat", "Routines", "Growth tracking", "Memory", "Readings"].map((f) => (
          <Badge key={f} variant="outline" className="text-[11px]">{f}</Badge>
        ))}
      </div>

      <Button className="w-full" onClick={onNext}>
        Looks great — let&apos;s go
      </Button>
    </div>
  );
}
