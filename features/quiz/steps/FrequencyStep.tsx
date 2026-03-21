"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FREQUENCY_OPTIONS } from "../constants";

interface FrequencyStepProps {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
}

export function FrequencyStep({ value, setValue, onSubmit }: FrequencyStepProps) {
  return (
    <div className="animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      <h1 className="text-2xl font-semibold leading-snug tracking-[-0.02em] mb-2 text-foreground">
        How often do you self-reflect?
      </h1>
      <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
        This helps us personalise your experience
      </p>

      <div className="space-y-2 mb-6">
        {FREQUENCY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setValue(opt.value)}
            className={cn(
              "w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200",
              value === opt.value
                ? "border-primary/50 bg-accent shadow-[0_0_0_1px_rgba(58,124,255,0.25)]"
                : "border-border bg-input hover:border-[rgba(255,255,255,0.13)] hover:bg-[rgba(255,255,255,0.05)]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={cn(
                "text-sm font-medium",
                value === opt.value ? "text-foreground" : "text-foreground/80"
              )}>
                {opt.label}
              </span>
              <div className={cn(
                "w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 transition-all duration-200 flex items-center justify-center",
                value === opt.value ? "border-primary bg-primary" : "border-border"
              )}>
                {value === opt.value && (
                  <div className="w-[7px] h-[7px] rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button className="w-full" onClick={onSubmit} disabled={!value}>
        Start my journey
      </Button>
    </div>
  );
}
