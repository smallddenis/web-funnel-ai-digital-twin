"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "@/shared/lib/session";
import { trackEvent } from "@/shared/lib/track";
import type { QuizData } from "@/types";

export function useQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>({});

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const setField = (field: keyof QuizData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => s + 1);

  const submit = () => {
    localStorage.setItem("quiz_data", JSON.stringify(data));
    trackEvent(getSessionId(), "quiz_submit", data as Record<string, unknown>);
    router.push("/email");
  };

  return { step, data, setField, next, submit, progress, totalSteps };
}
