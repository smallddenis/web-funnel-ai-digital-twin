"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/session";
import { trackEvent } from "@/lib/track";

const PERSONALITY_OPTIONS = [
  { value: "empathetic", label: "Empathetic Listener", desc: "Warm, understanding, and emotionally supportive" },
  { value: "analytical", label: "Analytical Thinker", desc: "Logical, structured, and insight-driven" },
  { value: "motivational", label: "Motivational Coach", desc: "Energizing, positive, and action-oriented" },
  { value: "mindful", label: "Mindful Guide", desc: "Calm, present-focused, and meditative" },
];

const THERAPY_OPTIONS = [
  { value: "cbt", label: "Cognitive Behavioral (CBT)", desc: "Focus on changing thought patterns" },
  { value: "mindfulness", label: "Mindfulness-Based", desc: "Present-moment awareness and acceptance" },
  { value: "solution", label: "Solution-Focused", desc: "Goal-oriented, building on strengths" },
  { value: "narrative", label: "Narrative Therapy", desc: "Understanding your story and rewriting it" },
];

const GOAL_OPTIONS = [
  { value: "stress", label: "Manage Stress", desc: "Learn to cope with daily pressures" },
  { value: "clarity", label: "Gain Clarity", desc: "Understand your thoughts and emotions better" },
  { value: "confidence", label: "Build Confidence", desc: "Strengthen self-belief and resilience" },
  { value: "relationships", label: "Improve Relationships", desc: "Better connect with people around you" },
];

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "A few times a week" },
  { value: "occasional", label: "Occasionally" },
  { value: "first_time", label: "This is my first time" },
];

interface StepProps {
  onNext: () => void;
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [therapy, setTherapy] = useState("");
  const [goal, setGoal] = useState("");
  const [frequency, setFrequency] = useState("");

  useEffect(() => {
    trackEvent(getSessionId(), "quiz_start");
  }, []);

  const steps = [
    <NameStep key="name" name={name} setName={setName} onNext={() => setStep(1)} />,
    <ChoiceStep
      key="personality"
      title="Choose your AI twin's personality"
      subtitle="This shapes how your digital twin communicates with you"
      options={PERSONALITY_OPTIONS}
      value={personality}
      setValue={setPersonality}
      onNext={() => setStep(2)}
    />,
    <ChoiceStep
      key="therapy"
      title="Pick a therapy approach"
      subtitle="Select the style that resonates with you"
      options={THERAPY_OPTIONS}
      value={therapy}
      setValue={setTherapy}
      onNext={() => setStep(3)}
    />,
    <ChoiceStep
      key="goal"
      title="What's your main goal?"
      subtitle="We'll tailor the experience to what matters most to you"
      options={GOAL_OPTIONS}
      value={goal}
      setValue={setGoal}
      onNext={() => setStep(4)}
    />,
    <FrequencyStep
      key="frequency"
      value={frequency}
      setValue={setFrequency}
      onSubmit={() => {
        const quizData = { name, personality, therapy, goal, frequency };
        localStorage.setItem("quiz_data", JSON.stringify(quizData));
        trackEvent(getSessionId(), "quiz_submit", quizData);
        router.push("/email");
      }}
    />,
  ];

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-foreground/50 mb-2">
          <span>Step {step + 1} of {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-card-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {steps[step]}
    </div>
  );
}

function NameStep({
  name,
  setName,
  onNext,
}: {
  name: string;
  setName: (v: string) => void;
} & StepProps) {
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

function ChoiceStep({
  title,
  subtitle,
  options,
  value,
  setValue,
  onNext,
}: {
  title: string;
  subtitle: string;
  options: { value: string; label: string; desc: string }[];
  value: string;
  setValue: (v: string) => void;
} & StepProps) {
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

function FrequencyStep({
  value,
  setValue,
  onSubmit,
}: {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
}) {
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
