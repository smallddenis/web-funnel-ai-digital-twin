"use client";

import { FREQUENCY_OPTIONS } from "../constants";

interface FrequencyStepProps {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
}

export function FrequencyStep({ value, setValue, onSubmit }: FrequencyStepProps) {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-2">How often do you self-reflect?</h1>
      <p className="text-foreground/60 mb-6">This helps us personalize your experience</p>

      <div className="space-y-3">
        {FREQUENCY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setValue(opt.value)}
            className={`w-full text-left p-4 rounded-xl border transition ${
              value === opt.value
                ? "border-primary bg-primary/10"
                : "border-input-border hover:border-foreground/30"
            }`}
          >
            <div className="font-medium">{opt.label}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={!value}
        className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
      >
        Start My Journey
      </button>
    </div>
  );
}
