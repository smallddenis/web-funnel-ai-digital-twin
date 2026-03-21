"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NameStepProps {
  name: string;
  setName: (v: string) => void;
  onNext: () => void;
}

export function NameStep({ name, setName, onNext }: NameStepProps) {
  return (
    <div className="animate-[fade-up_0.45s_cubic-bezier(0.16,1,0.3,1)_both]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-12">
        <div className="w-7 h-7 rounded-[9px] bg-primary flex items-center justify-center shadow-[0_0_16px_rgba(58,124,255,0.5)]">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1.5L11.5 4.2V8.8L6.5 11.5L1.5 8.8V4.2L6.5 1.5Z"
              fill="white" fillOpacity="0.95" />
          </svg>
        </div>
        <span className="text-sm font-medium text-muted-foreground tracking-wide">Copymind</span>
      </div>

      <h1 className="text-[2.1rem] font-semibold leading-[1.2] tracking-[-0.02em] mb-3 text-foreground">
        Meet your<br />AI digital twin
      </h1>
      <p className="text-muted-foreground text-[15px] mb-10 leading-relaxed max-w-xs">
        A personal AI that learns how you think,
        reflects with you, and grows alongside you.
      </p>

      <div className="space-y-2 mb-5">
        <label className="block text-[11px] font-medium text-muted-foreground uppercase tracking-[0.1em]">
          Your name
        </label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext()}
        />
      </div>

      <Button
        className="w-full"
        onClick={onNext}
        disabled={!name.trim()}
      >
        Continue
      </Button>
    </div>
  );
}
