"use client";

interface ProgressBarProps {
  step: number;
  total: number;
  progress: number;
}

export function ProgressBar({ step, total, progress }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-foreground/50 mb-2">
        <span>Step {step + 1} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-card-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
