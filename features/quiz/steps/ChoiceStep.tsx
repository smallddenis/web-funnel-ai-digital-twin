"use client";

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
    <div className="bg-card-bg border border-card-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-foreground/60 mb-6">{subtitle}</p>

      <div className="space-y-3">
        {options.map((opt) => (
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
            <div className="text-sm text-foreground/50 mt-1">{opt.desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
      >
        Continue
      </button>
    </div>
  );
}
