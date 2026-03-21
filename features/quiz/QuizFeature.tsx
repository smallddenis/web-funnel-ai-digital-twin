"use client";

import { useEffect } from "react";
import { getSessionId } from "@/shared/lib/session";
import { trackEvent } from "@/shared/lib/track";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { useQuiz } from "./useQuiz";
import { NameStep } from "./steps/NameStep";
import { ChoiceStep } from "./steps/ChoiceStep";
import { FrequencyStep } from "./steps/FrequencyStep";
import {
  PERSONALITY_OPTIONS,
  THERAPY_OPTIONS,
  GOAL_OPTIONS,
} from "./constants";

export function QuizFeature() {
  const { step, data, setField, next, submit, progress, totalSteps } = useQuiz();

  useEffect(() => {
    trackEvent(getSessionId(), "quiz_start");
  }, []);

  const steps = [
    <NameStep
      key="name"
      name={data.name ?? ""}
      setName={(v) => setField("name", v)}
      onNext={next}
    />,
    <ChoiceStep
      key="personality"
      title="Choose your AI twin's personality"
      subtitle="This shapes how your digital twin communicates with you"
      options={PERSONALITY_OPTIONS}
      value={data.personality ?? ""}
      setValue={(v) => setField("personality", v)}
      onNext={next}
    />,
    <ChoiceStep
      key="therapy"
      title="Pick a therapy approach"
      subtitle="Select the style that resonates with you"
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

  return (
    <div className="w-full max-w-lg">
      <ProgressBar step={step} total={totalSteps} progress={progress} />
      {steps[step]}
    </div>
  );
}
