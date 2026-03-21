"use client";

import { useEffect, useRef, useState } from "react";
import { getSessionId } from "@/shared/lib/session";
import { trackEvent } from "@/shared/lib/track";
import { cn } from "@/lib/utils";
import { useQuiz } from "./useQuiz";
import { NameStep } from "./steps/NameStep";
import { ChoiceStep } from "./steps/ChoiceStep";
import { FrequencyStep } from "./steps/FrequencyStep";
import { PreviewStep } from "./steps/PreviewStep";
import { PERSONALITY_OPTIONS, THERAPY_OPTIONS, GOAL_OPTIONS } from "./constants";

export function QuizFeature() {
  const { step, data, setField, next, submit, totalSteps } = useQuiz();
  const [animKey, setAnimKey] = useState(0);
  const prevStep = useRef(step);
  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    trackEvent(getSessionId(), "quiz_start");
    const leaveTimer = setTimeout(() => setIntroLeaving(true), 2200);
    const hideTimer  = setTimeout(() => setShowIntro(false), 2900);
    return () => { clearTimeout(leaveTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    if (prevStep.current !== step) {
      setAnimKey((k) => k + 1);
      prevStep.current = step;
    }
  }, [step]);

  const steps = [
    <NameStep
      key="name"
      name={data.name ?? ""}
      setName={(v) => setField("name", v)}
      onNext={next}
    />,
    <PreviewStep
      key="preview"
      name={data.name ?? ""}
      onNext={next}
    />,
    <ChoiceStep
      key="personality"
      title="Choose your twin's personality"
      subtitle="This shapes how your digital twin communicates with you"
      options={PERSONALITY_OPTIONS}
      value={data.personality ?? ""}
      setValue={(v) => setField("personality", v)}
      onNext={next}
    />,
    <ChoiceStep
      key="therapy"
      title="Pick a therapy approach"
      subtitle="Select the style that resonates most with you"
      options={THERAPY_OPTIONS}
      value={data.therapy ?? ""}
      setValue={(v) => setField("therapy", v)}
      onNext={next}
    />,
    <ChoiceStep
      key="goal"
      title="What's your main goal?"
      subtitle="We'll tailor the experience to what matters most to you"
      options={GOAL_OPTIONS}
      value={data.goal ?? ""}
      setValue={(v) => setField("goal", v)}
      onNext={next}
    />,
    <FrequencyStep
      key="frequency"
      value={data.frequency ?? ""}
      setValue={(v) => setField("frequency", v)}
      onSubmit={submit}
    />,
  ];

  if (showIntro) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 text-center"
        style={{ animation: introLeaving ? "intro-exit 0.7s ease forwards" : "intro-enter 1.1s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(58,124,255,0.5) 0%, rgba(58,124,255,0) 70%)",
            animation: "breathe 3.5s ease-in-out infinite",
          }}
        />
        <p className="text-2xl font-light tracking-widest text-foreground/80 uppercase">
          take a deep breath
        </p>
        <p className="text-sm text-muted-foreground tracking-wide">
          your journey starts now
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Segmented progress bar */}
      <div className="flex items-center gap-1.5 mb-10">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 3,
              flex: i <= step ? "1 1 0" : "0.25 1 0",
              background: i < step
                ? "var(--primary)"
                : i === step
                ? "rgba(58,124,255,0.75)"
                : "rgba(255,255,255,0.09)",
              borderRadius: 99,
              transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Step with re-mount animation */}
      <div key={animKey}>
        {steps[step]}
      </div>

      {/* Step counter */}
      <p className={cn(
        "text-center text-[11px] text-muted-foreground mt-8",
        step === 0 && "opacity-0"
      )}>
        {step + 1} / {totalSteps}
      </p>
    </div>
  );
}
