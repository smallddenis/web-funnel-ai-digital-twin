"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
  desc: string;
}

interface ChoiceStepProps {
  title: string;
  subtitle: string;
  options: Option[];
  value: string;
  setValue: (v: string) => void;
  onNext: () => void;
}

export function ChoiceStep({ title, subtitle, options, value, setValue, onNext }: ChoiceStepProps) {
  return (
    <div className="animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      <h1 className="text-2xl font-semibold leading-snug tracking-[-0.02em] mb-2 text-foreground">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm mb-7 leading-relaxed">{subtitle}</p>

      <div className="space-y-2 mb-6">
        {options.map((opt) => (
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
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className={cn(
                  "text-sm font-medium",
                  value === opt.value ? "text-foreground" : "text-foreground/80"
                )}>
                  {opt.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {opt.desc}
                </div>
              </div>

              {/* Radio dot */}
              <div className={cn(
                "mt-0.5 w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 transition-all duration-200 flex items-center justify-center",
                value === opt.value
                  ? "border-primary bg-primary"
                  : "border-border"
              )}>
                {value === opt.value && (
                  <div className="w-[7px] h-[7px] rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button className="w-full" onClick={onNext} disabled={!value}>
        Continue
      </Button>
    </div>
  );
}
