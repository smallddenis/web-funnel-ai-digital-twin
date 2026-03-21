"use client";

interface NameStepProps {
  name: string;
  setName: (v: string) => void;
  onNext: () => void;
}

export function NameStep({ name, setName, onNext }: NameStepProps) {
  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-2">Welcome to your AI Twin</h1>
      <p className="text-foreground/60 mb-6">Let&apos;s start by getting to know you.</p>

      <label className="block text-sm font-medium mb-2">What&apos;s your name?</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition"
        autoFocus
        onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext()}
      />

      <button
        onClick={onNext}
        disabled={!name.trim()}
        className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition"
      >
        Continue
      </button>
    </div>
  );
}
